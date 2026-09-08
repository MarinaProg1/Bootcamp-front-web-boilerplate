import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import { toast } from "sonner";

import styles from "../pacientes/FormularioPaciente.module.scss";
import { validarDatos } from "../utils/validaciones";
import clientesAxios from "../../config/axios";

import DatosPersonales from "./components/DatosPersonales";
import TelefonoPaciente from "../pacientes/components/TelefonoPaciente";

const reglasMedico = {
  nombre: (valor) =>
    !valor || valor.trim() === "" ? "El nombre es obligatorio." : null,
  apellido: (valor) =>
    !valor || valor.trim() === "" ? "El apellido es obligatorio." : null,
  dni: (valor) =>
    !valor || valor.length < 8 ? "El DNI debe tener al menos 8 números." : null,
  email: (valor) =>
    !valor || !valor.includes("@") ? "Debe ingresar un email válido." : null,
  matricula: (valor) =>
    !valor || valor.trim() === "" ? "La matrícula es obligatoria." : null,
};

const FormularioMedico = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Obtenemos el ID de la URL si existe
  const esEdicion = Boolean(id); // Si hay ID, estamos editando

  const [cargando, setCargando] = useState(false);
  const [errores, setErrores] = useState({});

  const [medico, setMedico] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    matricula: "",
    especialidad: [],
    email: "",
    telefono: {
      tipo: "CELULAR",
      codigoArea: "",
      numero: "",
    },
  });

  const especialidades = [
    { value: "6a6e57bc0b640089be6b7534", label: "Clínica Médica" },
    { value: "6a6e57c90b640089be6b7535", label: "Cardiología" },
    { value: "6a6e57d70b640089be6b7536", label: "Diagnóstico por Imágenes" },
    { value: "6a6e57e40b640089be6b7537", label: "Kinesiología" },
  ];

  // Cargar datos si estamos en modo edición
  useEffect(() => {
    if (esEdicion) {
      const obtenerMedico = async () => {
        setCargando(true);
        try {
          const res = await clientesAxios.get(`/medicos/${id}`);
          const datos = Array.isArray(res.data)
            ? res.data[0]
            : res.data.datos || res.data;

          // Normalizar especialidad a un array de IDs
          // Normalizar especialidad a un array de Strings para asegurar coincidencia estricta
          let especialidadesIds = [];
          if (Array.isArray(datos.especialidad)) {
            especialidadesIds = datos.especialidad.map((e) =>
              (typeof e === "object" ? e._id : e).toString(),
            );
          } else if (datos.especialidad) {
            const idUnico =
              typeof datos.especialidad === "object"
                ? datos.especialidad._id
                : datos.especialidad;
            especialidadesIds = [idUnico.toString()];
          }

          setMedico({
            nombre: datos.nombre || "",
            apellido: datos.apellido || "",
            dni: datos.dni || "",
            matricula: datos.matricula || "",
            email: datos.email || "",
            especialidad: especialidadesIds, // Garantiza un array de strings
            telefono: {
              tipo: datos.telefono?.tipo || "CELULAR",
              codigoArea: datos.telefono?.codigoArea || "",
              numero: datos.telefono?.numero || "",
            },
          });
        } catch (error) {
          toast.error("Error al obtener los datos del médico");
          console.error(error);
          navigate("/medicos");
        } finally {
          setCargando(false);
        }
      };

      obtenerMedico();
    }
  }, [id, esEdicion, navigate]);

  const handleChange = (evento) => {
    const { name, value, checked } = evento.target;

    if (name === "especialidad") {
      setMedico((prevMedico) => {
        if (checked) {
          return {
            ...prevMedico,
            especialidad: [...prevMedico.especialidad, value],
          };
        }
        return {
          ...prevMedico,
          especialidad: prevMedico.especialidad.filter(
            (item) => item !== value,
          ),
        };
      });
      return;
    }

    if (name.includes(".")) {
      const [seccion, propiedad] = name.split(".");
      setMedico((prevMedico) => ({
        ...prevMedico,
        [seccion]: {
          ...prevMedico[seccion],
          [propiedad]: value,
        },
      }));
      return;
    }

    setMedico((prevMedico) => ({
      ...prevMedico,
      [name]: value,
    }));
  };

  const handleSubmit = async (evento) => {
    evento.preventDefault();

    const nuevosErrores = validarDatos(medico, reglasMedico);
    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) {
      toast.error("Por favor revise los campos requeridos.");
      return;
    }

    try {
      if (esEdicion) {
        await clientesAxios.put(`/medicos/${id}`, medico);
        toast.success("Médico actualizado correctamente");
      } else {
        // Petición POST para crear
        await clientesAxios.post("/medicos", medico);
        toast.success("Médico guardado correctamente");
      }
      navigate("/medicos");
    } catch (error) {
      console.error("Error al guardar:", error);
      toast.error(
        error.response?.data?.mensaje || "Error de conexión con el servidor",
      );
    }
  };

  if (cargando) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Cargando datos del médico...</p>
      </div>
    );
  }

  return (
    <div className={styles.contenedorFormulario}>
      <h3>{esEdicion ? "Modificar Médico" : "Ingreso de Nuevo Médico"}</h3>

      <form onSubmit={handleSubmit}>
        <DatosPersonales
          medico={medico}
          errores={errores}
          onChange={handleChange}
          styles={styles}
          especialidades={especialidades}
        />

        <TelefonoPaciente
          telefono={medico.telefono}
          onChange={handleChange}
          styles={styles}
        />

        <div className="d-flex gap-2 mt-4">
          <Button type="submit" variant={esEdicion ? "warning" : "primary"}>
            {esEdicion ? "Guardar Cambios" : "Guardar Médico"}
          </Button>
          <Button as={Link} to="/medicos" variant="secondary">
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormularioMedico;

import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import { toast } from "sonner";

import styles from "../pacientes/FormularioPaciente.module.scss";
import clientesAxios from "../../config/axios";
import DatosGenerales from "./components/DatosGenerales";
import Antecedentes from "./components/Antecedentes";
import Habitos from "./components/Habitos";
import InformacionConsulta from "./components/InformacionConsulta";

const FormularioHistorial = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [pacientes, setPacientes] = useState([]);
  const [medicos, setMedicos] = useState([]);

  const [cargando, setCargando] = useState(false);
  const [cargandoDatos, setCargandoDatos] = useState(false);

  const [errores, setErrores] = useState({});

  const [historial, setHistorial] = useState({
    paciente: "",
    medico: "",
    fecha: "",

    antecedentes: {
      alergias: [],
      enfermedadesCronicas: [],
      medicamentosHabituales: [],
      cirugiasPrevias: [],
      internacionesPrevias: [],
      antecedentesFamiliares: [],
      vacunas: [],

      habitos: {
        tabaquismo: false,
        alcohol: false,
        actividadFisica: "Ninguna",
      },

      otros: "",
    },

    motivoConsulta: "",
    sintomas: [],
    diagnostico: "",
    tratamiento: "",
    observaciones: "",
  });

  const convertirFechaParaInput = (fecha) => {
    if (!fecha) return "";

    return new Date(fecha).toISOString().slice(0, 16);
  };

  // =========================================================
  // CARGAR PACIENTES Y MÉDICOS
  // =========================================================

  useEffect(() => {
    const cargarDatosIniciales = async () => {
      try {
        setCargandoDatos(true);

        const [respuestaPacientes, respuestaMedicos] = await Promise.all([
          clientesAxios.get("/pacientes"),
          clientesAxios.get("/medicos"),
        ]);

        setPacientes(respuestaPacientes.data.data || []);
        setMedicos(respuestaMedicos.data.data || []);
      } catch (error) {
        console.error(error);

        toast.error("No se pudieron cargar los pacientes y médicos");
      } finally {
        setCargandoDatos(false);
      }
    };

    cargarDatosIniciales();
  }, []);

  // =========================================================
  // CARGAR HISTORIAL SI ESTAMOS EDITANDO
  // =========================================================

  useEffect(() => {
    if (!id) return;

    const cargarHistorial = async () => {
      try {
        setCargandoDatos(true);

        const respuesta = await clientesAxios.get(`/historias-clinicas/${id}`);

        const datos = respuesta.data.data;

        setHistorial({
          paciente:
            typeof datos.paciente === "object"
              ? datos.paciente?.id || datos.paciente?._id || ""
              : datos.paciente || "",

          medico:
            typeof datos.medico === "object"
              ? datos.medico?.id || datos.medico?._id || ""
              : datos.medico || "",

          fecha: convertirFechaParaInput(datos.fecha),

          antecedentes: {
            alergias: datos.antecedentes?.alergias || [],
            enfermedadesCronicas:
              datos.antecedentes?.enfermedadesCronicas || [],
            medicamentosHabituales:
              datos.antecedentes?.medicamentosHabituales || [],
            cirugiasPrevias: datos.antecedentes?.cirugiasPrevias || [],
            internacionesPrevias:
              datos.antecedentes?.internacionesPrevias || [],
            antecedentesFamiliares:
              datos.antecedentes?.antecedentesFamiliares || [],
            vacunas: datos.antecedentes?.vacunas || [],

            habitos: {
              tabaquismo: datos.antecedentes?.habitos?.tabaquismo || false,

              alcohol: datos.antecedentes?.habitos?.alcohol || false,

              actividadFisica:
                datos.antecedentes?.habitos?.actividadFisica || "Ninguna",
            },

            otros: datos.antecedentes?.otros || "",
          },

          motivoConsulta: datos.motivoConsulta || "",
          sintomas: datos.sintomas || [],
          diagnostico: datos.diagnostico || "",
          tratamiento: datos.tratamiento || "",
          observaciones: datos.observaciones || "",
        });
      } catch (error) {
        console.error(error);

        toast.error("No se pudo cargar el historial clínico");
      } finally {
        setCargandoDatos(false);
      }
    };

    cargarHistorial();
  }, [id]);

  // =========================================================
  // CONVERTIR TEXTAREA → ARRAY
  // =========================================================

  const convertirAArray = (texto) => {
    return texto.split("\n");
  };
  // =========================================================
  // CAMBIOS DE CAMPOS NORMALES
  // =========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setHistorial((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================================
  // CAMBIOS DE ANTECEDENTES
  // =========================================================

  const handleAntecedenteChange = (campo, valor) => {
    setHistorial((prev) => ({
      ...prev,
      antecedentes: {
        ...prev.antecedentes,
        [campo]: valor,
      },
    }));
  };

  // =========================================================
  // CAMBIOS DE CAMPOS ARRAY
  // =========================================================

  const handleArrayChange = (campo, valor) => {
    setHistorial((prev) => ({
      ...prev,
      antecedentes: {
        ...prev.antecedentes,
        [campo]: convertirAArray(valor),
      },
    }));
  };

  // =========================================================
  // CAMBIOS DE HÁBITOS
  // =========================================================

  const handleHabitoChange = (campo, valor) => {
    setHistorial((prev) => ({
      ...prev,
      antecedentes: {
        ...prev.antecedentes,
        habitos: {
          ...prev.antecedentes.habitos,
          [campo]: valor,
        },
      },
    }));
  };

  // =========================================================
  // CAMBIOS DE SÍNTOMAS
  // =========================================================

  const handleSintomasChange = (valor) => {
    setHistorial((prev) => ({
      ...prev,
      sintomas: convertirAArray(valor),
    }));
  };

  // =========================================================
  // GUARDAR
  // =========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setCargando(true);
      setErrores({});

      const datosEnviar = {
        ...historial,

        medico: historial.medico || null,

        fecha: new Date(historial.fecha).toISOString(),
      };

      if (id) {
        await clientesAxios.put(`/historias-clinicas/${id}`, datosEnviar);

        toast.success("Historial clínico actualizado correctamente");
      } else {
        await clientesAxios.post("/historias-clinicas", datosEnviar);

        toast.success("Historial clínico creado correctamente");
      }

      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      const respuesta = error.response?.data;

      if (respuesta?.errores) {
        setErrores(respuesta.errores);
      }

      toast.error(
        respuesta?.message ||
          "Ocurrió un error al guardar el historial clínico",
      );
    } finally {
      setCargando(false);
    }
  };

  // =========================================================
  // CARGANDO DATOS
  // =========================================================

  if (cargandoDatos) {
    return (
      <div className={styles.container}>
        <Spinner animation="border" />
        <p>Cargando datos...</p>
      </div>
    );
  }

  // =========================================================
  // FORMULARIO
  // =========================================================

  return (
    <div className={styles.contenedorFormulario}>
      <div className={styles.formulario}>
        <h3>{id ? "Editar Historia Clínica" : "Nueva Historia Clínica"}</h3>

        <form onSubmit={handleSubmit}>
          <DatosGenerales
            historial={historial}
            pacientes={pacientes}
            medicos={medicos}
            onChange={handleChange}
            errores={errores}
          />

          <Antecedentes
            antecedentes={historial.antecedentes}
            onArrayChange={handleArrayChange}
            onAntecedenteChange={handleAntecedenteChange}
            errores={errores}
          />

          <Habitos
            habitos={historial.antecedentes.habitos}
            onChange={handleHabitoChange}
            errores={errores}
          />

          <InformacionConsulta
            historial={historial}
            onChange={handleChange}
            onSintomasChange={handleSintomasChange}
            errores={errores}
          />

          <div>
            <Button type="submit" disabled={cargando}>
              {cargando ? (
                <>
                  <Spinner size="sm" animation="border" /> Guardando...
                </>
              ) : id ? (
                "Actualizar historial"
              ) : (
                "Guardar historial"
              )}
            </Button>

            <Link to="/dashboard">
              <Button variant="secondary" type="button">
                Cancelar
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioHistorial;

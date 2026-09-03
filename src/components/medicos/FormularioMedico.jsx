import { useState } from "react";
import styles from "../pacientes/FormularioPaciente.module.scss";
import JsonDebugger from "../utils/JsonDebugger";
import { Button } from "react-bootstrap";
import { validarDatos } from "../utils/validaciones";
import DatosPersonales from "./components/DatosPersonales";
import ObraSocialPaciente from "../pacientes/components/ObraSocialPaciente";
import TelefonoPaciente from "../pacientes/components/TelefonoPaciente";

const reglasMedico = {
  nombre: (valor) => (valor.trim() === "" ? "El nombre es obligatorio." : null),
  dni: (valor) =>
    valor.length < 8 ? "El DNI debe tener 8 numeros minimo" : null,
  email: (valor) =>
    !valor.includes("@") ? "Debe ser un correo valido. " : null,
};

const FormularioMedico = () => {
  const [medico, setMedico] = useState({
    nombre: "",
    apellido: "",
    matricula: "",
    especialidad: "",
    dni: "",
    correo: "",
    telefono: {
      tipo: "CELULAR",
      codigoArea: "",
      numero: "",
    },
    obraSocial: {
      nombre: "",
      numeroAfiliado: "",
    },
  });

  const [errores, setErrores] = useState({});

  const handleChange = (evento) => {
    const { name, value } = evento.target;

    if (name.includes(".")) {
      const [seccion, propiedad] = name.split(".");

      setMedico({
        ...medico,
        [seccion]: {
          ...medico[seccion],
          [propiedad]: value,
        },
      });
    } else {
      setMedico({
        ...medico,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (evento) => {
    evento.preventDefault();

    const nuevosErrores = validarDatos(medico, reglasMedico);

    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) {
      console.log("Validacion fallida");
      return;
    }

    try {
      const respuesta = await fetch("http://localhost:3000/api/v1/medicos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(medico),
      });

      const data = await respuesta.json();

      if (respuesta.ok) {
        alert("Médico guardado en base de datos");
      } else {
        alert("error del servidor: " + data.message + "errores: " + data.data);
      }
    } catch (error) {
      console.error("Error de conexion", error);
      alert("el servidor esta apagado o no responde");
    }

    console.log(medico);
  };

  return (
    <div className={styles.contenedorFormulario}>
      <h3>Ingreso de Nuevo Médico</h3>
      <form onSubmit={handleSubmit}>
        <DatosPersonales
          medico={medico}
          errores={errores}
          onChange={handleChange}
          styles={styles}
        />
        <TelefonoPaciente
          telefono={medico.telefono}
          onChange={handleChange}
          styles={styles}
        />
        <ObraSocialPaciente
          obraSocial={medico.obraSocial}
          onChange={handleChange}
          styles={styles}
        />
        <Button type="submit">Guardar </Button>
      </form>

      <JsonDebugger data={medico} titulo="ESTADO DEL JSON" />
    </div>
  );
};

export default FormularioMedico;

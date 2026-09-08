import { useState } from "react";
import { useFetch } from "/src/hooks/useFetch.js";
import JsonDebugger from "../utils/JsonDebugger";
import { Button, Container } from "react-bootstrap";
import { validarDatos } from "../utils/validaciones";
import styles from "./components/HistoriaClinica.module.scss";

import Antecedentes from "./components/Antecedentes.jsx";
import Motivos from "./components/Motivos.jsx";
import BuscadorPaciente from "./components/BuscadorPaciente.jsx";
import BuscadorMedico from "./components/BuscadorMedico.jsx";

const reglasHistoriaClinica = {
  // paciente: (valor) => (valor.trim() === "" ? "El paciente es obligatorio." : null),
  // medico: (valor) => (valor.trim() === "" ? "El médico es obligatorio." : null),
  // fecha: (valor) => (valor.trim() === "" ? "La fecha es obligatoria." : null)
};

const FormularioHistoriaClinica = () => {
  const [historiaClinica, setHistoriaClinica] = useState({
    paciente: "",
    medico: "",
    fecha: "",
    antecedentes: {
      alergias: "",
      enfermedadesCronicas: "",
      medicamentosHabituales: "",
      cirugiasPrevias: "",
      internacionesPrevias: "",
      antecedentesFamiliares: "",
      vacunas: "",
      habitos: {
        tabaquismo: false,
        alcohol: false,
        actividadFisica: "Ninguna",
        otros: ""
      }
    },
    motivoConsulta: "",
    sintomas: "",
    diagnostico: "",
    tratamiento: "",
    observaciones: "",
    activo: false
  });

    const [errores, setErrores] = useState({});

  // 🔧 Nuevo handleChange que soporta campos anidados
  const handleChange = (evento) => {
    const { name, value, type, checked } = evento.target;
    const keys = name.split(".");

    const nuevosErrores = validarDatos(historiaClinica, reglasHistoriaClinica);
    setErrores(nuevosErrores);

    setHistoriaClinica((prev) => {
      const nuevoEstado = { ...prev };
      let nivel = nuevoEstado;

      // recorro todas las claves menos la última
      for (let i = 0; i < keys.length - 1; i++) {
        nivel[keys[i]] = { ...nivel[keys[i]] };
        nivel = nivel[keys[i]];
      }

      // asigno el valor en la última clave
      const ultima = keys[keys.length - 1];
      nivel[ultima] = type === "checkbox" ? checked : value;

      return nuevoEstado;
    });
  };

  const handleSubmit = async (evento) => {
    evento.preventDefault();

    const nuevosErrores = validarDatos(historiaClinica, reglasHistoriaClinica);

    if (Object.keys(nuevosErrores).length > 0) {
      console.log("Validación fallida");
      return;
    }
    try {
      const respuesta = await fetch("http://localhost:3000/api/v1/historias-clinicas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(historiaClinica)
      });
      const data = await respuesta.json();

      if (respuesta.ok) {
        alert("Historia clínica guardada en base de datos");
      } else {
        alert("Error del servidor: " + data.message + " errores: " + data.data);
      }
    } catch (error) {
      console.error("Error de conexión", error);
      alert("El servidor está apagado o no responde");
    }

    console.log(historiaClinica);
  };

  // ------------------- PACIENTE -------------------
  const [busquedaPaciente, setBusquedaPaciente] = useState("");
  const { data: pacientes } = useFetch("/pacientes");

  const pacientesFiltrados = pacientes.filter((paciente) =>
    (paciente.nombre ?? "Paciente sin asignar")
      .toLocaleLowerCase()
      .includes(busquedaPaciente.toLocaleLowerCase())
  );

  // ------------------- MÉDICO -------------------
  const [busquedaMedico, setBusquedaMedico] = useState("");
  const { data: medicos } = useFetch("/medicos");

  const medicosFiltrados = medicos.filter((medico) =>
    (medico.nombre ?? "Médico sin asignar")
      .toLocaleLowerCase()
      .includes(busquedaMedico.toLocaleLowerCase())
  );

  return (
    <div className={styles.contenedorFormulario}>
      <h3>Ingreso de Historia Clínica</h3>
      <Container>
        <div style={{ border: "1px solid #6d061c", padding: "10px" }}>
          <BuscadorPaciente
            valor={busquedaPaciente}
            alCambiar={setBusquedaPaciente}
            datos={pacientesFiltrados}
            onSeleccionar={(dato) =>
              setHistoriaClinica((prev) => ({ ...prev, paciente: dato || "" }))
            }
          />
          <p>Paciente ID Seleccionado: {historiaClinica.paciente}</p>

          <BuscadorMedico
            valor={busquedaMedico}
            alCambiar={setBusquedaMedico}
            datos={medicosFiltrados}
            onSeleccionar={(dato) =>
              setHistoriaClinica((prev) => ({ ...prev, medico: dato || "" }))
            }
          />
          <p>Médico ID Seleccionado: {historiaClinica.medico}</p>
        </div>
      </Container>

      <form onSubmit={handleSubmit}>
        <p/>
         <input
            type="date"
            name="fecha"
            value={historiaClinica.fecha}
            className={styles.campoInput}
            placeholder="Fecha"
            onChange={handleChange}
        />
        {errores.fecha && <span className={styles.textoError}>{errores.fecha}</span>}
        <Antecedentes
          antecedentes={historiaClinica.antecedentes}
          onChange={handleChange}
          styles={styles}
        />
        <Motivos
          historiaClinica={historiaClinica}
          onChange={handleChange}
          styles={styles}
        />

        <Button type="submit">Guardar</Button>
      </form>

      <JsonDebugger data={historiaClinica} titulo="ESTADO DEL JSON" />
    </div>
  );
};

export default FormularioHistoriaClinica;

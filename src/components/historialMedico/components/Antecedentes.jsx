import CamposArray from "./CamposArray";
import styles from "../../pacientes/FormularioPaciente.module.scss";

const Antecedentes = ({ antecedentes, onArrayChange, onAntecedenteChange }) => {
  return (
    <section>
      <h3>Antecedentes</h3>

      <CamposArray
        id="alergias"
        label="Alergias"
        value={(antecedentes?.alergias || []).join("\n")}
        placeholder="Una alergia por línea"
        onChange={(valor) => onArrayChange("alergias", valor)}
      />

      <CamposArray
        id="enfermedadesCronicas"
        label="Enfermedades crónicas"
        value={(antecedentes?.enfermedadesCronicas || []).join("\n")}
        placeholder="Una enfermedad por línea"
        onChange={(valor) => onArrayChange("enfermedadesCronicas", valor)}
      />

      <CamposArray
        id="medicamentosHabituales"
        label="Medicamentos habituales"
        value={(antecedentes?.medicamentosHabituales || []).join("\n")}
        placeholder="Un medicamento por línea"
        onChange={(valor) => onArrayChange("medicamentosHabituales", valor)}
      />

      <CamposArray
        id="cirugiasPrevias"
        label="Cirugías previas"
        value={(antecedentes?.cirugiasPrevias || []).join("\n")}
        placeholder="Una cirugía por línea"
        onChange={(valor) => onArrayChange("cirugiasPrevias", valor)}
      />

      <CamposArray
        id="internacionesPrevias"
        label="Internaciones previas"
        value={(antecedentes?.internacionesPrevias || []).join("\n")}
        placeholder="Una internación por línea"
        onChange={(valor) => onArrayChange("internacionesPrevias", valor)}
      />

      <CamposArray
        id="antecedentesFamiliares"
        label="Antecedentes familiares"
        value={(antecedentes?.antecedentesFamiliares || []).join("\n")}
        placeholder="Un antecedente por línea"
        onChange={(valor) => onArrayChange("antecedentesFamiliares", valor)}
      />

      <CamposArray
        id="vacunas"
        label="Vacunas"
        value={(antecedentes?.vacunas || []).join("\n")}
        placeholder="Una vacuna por línea"
        onChange={(valor) => onArrayChange("vacunas", valor)}
      />

      <div>
        <label htmlFor="otros">Otros antecedentes</label>

        <textarea
          className={styles.campoInput}
          id="otros"
          name="otros"
          value={antecedentes?.otros || ""}
          onChange={(e) => onAntecedenteChange("otros", e.target.value)}
          maxLength={500}
          rows={4}
        />
      </div>
    </section>
  );
};

export default Antecedentes;

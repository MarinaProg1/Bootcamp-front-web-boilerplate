import CamposArray from "./CamposArray";
import styles from "../../pacientes/FormularioPaciente.module.scss";

const InformacionConsulta = ({
  historial,
  onChange,
  onSintomasChange,
  errores,
}) => {
  return (
    <section>
      <h3>Información de la consulta</h3>

      {/* Motivo de consulta */}
      <div>
        <label htmlFor="motivoConsulta">Motivo de consulta</label>

        <textarea
          className={styles.campoInput}
          id="motivoConsulta"
          name="motivoConsulta"
          value={historial.motivoConsulta}
          onChange={onChange}
          placeholder="Ingrese el motivo de la consulta"
          rows={3}
        />

        {errores?.motivoConsulta && <span>{errores.motivoConsulta}</span>}
      </div>

      {/* Síntomas */}
      <CamposArray
        id="sintomas"
        label="Síntomas"
        value={historial.sintomas.join("\n")}
        placeholder={
          "Escriba un síntoma por línea\nEjemplo:\nDolor de cabeza\nFiebre\nNáuseas"
        }
        onChange={onSintomasChange}
      />

      {errores?.sintomas && <span>{errores.sintomas}</span>}

      {/* Diagnóstico */}
      <div>
        <label htmlFor="diagnostico">Diagnóstico</label>

        <textarea
          className={styles.campoInput}
          id="diagnostico"
          name="diagnostico"
          value={historial.diagnostico}
          onChange={onChange}
          placeholder="Ingrese el diagnóstico"
          rows={3}
        />

        {errores?.diagnostico && <span>{errores.diagnostico}</span>}
      </div>

      {/* Tratamiento */}
      <div>
        <label htmlFor="tratamiento">Tratamiento</label>

        <textarea
          className={styles.campoInput}
          id="tratamiento"
          name="tratamiento"
          value={historial.tratamiento}
          onChange={onChange}
          placeholder="Ingrese el tratamiento indicado"
          rows={4}
        />

        {errores?.tratamiento && <span>{errores.tratamiento}</span>}
      </div>

      {/* Observaciones */}
      <div>
        <label htmlFor="observaciones">Observaciones</label>

        <textarea
          className={styles.campoInput}
          id="observaciones"
          name="observaciones"
          value={historial.observaciones}
          onChange={onChange}
          placeholder="Ingrese observaciones adicionales"
          rows={4}
          maxLength={500}
        />

        {errores?.observaciones && <span>{errores.observaciones}</span>}
      </div>
    </section>
  );
};

export default InformacionConsulta;

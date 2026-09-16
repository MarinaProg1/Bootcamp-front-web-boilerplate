import styles from "../../pacientes/FormularioPaciente.module.scss";
const DatosGenerales = ({
  historial,
  pacientes,
  medicos,
  errores,
  onChange,
}) => {
  return (
    <section>
      <h3>Datos generales</h3>
      <div className={styles.divGrup}>
        <div>
          <label htmlFor="paciente">Paciente</label>

          <select
            className={styles.campoInput}
            id="paciente"
            name="paciente"
            value={historial.paciente}
            onChange={onChange}
          >
            <option value="">Seleccionar paciente</option>

            {pacientes.map((paciente) => (
              <option key={paciente.id} value={paciente.id}>
                {paciente.nombre} - DNI: {paciente.dni}
              </option>
            ))}
          </select>

          {errores.paciente && <span>{errores.paciente}</span>}
        </div>

        <div>
          <label htmlFor="medico">Médico</label>

          <select
            className={styles.campoInput}
            id="medico"
            name="medico"
            value={historial.medico}
            onChange={onChange}
          >
            <option value="">Seleccionar médico</option>

            {medicos.map((medico) => (
              <option key={medico.id} value={medico.id}>
                {medico.nombre} - Matrícula: {medico.matricula}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="fecha">Fecha</label>

          <input
            className={styles.campoInput}
            type="datetime-local"
            id="fecha"
            name="fecha"
            value={historial.fecha}
            onChange={onChange}
          />

          {errores.fecha && <span>{errores.fecha}</span>}
        </div>
      </div>
    </section>
  );
};

export default DatosGenerales;

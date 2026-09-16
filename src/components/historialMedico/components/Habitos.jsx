import styles from "../../pacientes/FormularioPaciente.module.scss";
const Habitos = ({ habitos, onChange }) => {
  return (
    <section>
      <h3>Hábitos</h3>

      <label>
        <input
          className={styles.campoInput}
          type="checkbox"
          name="tabaquismo"
          checked={habitos.tabaquismo}
          onChange={onChange}
        />
        Tabaquismo
      </label>

      <label>
        <input
          className={styles.campoInput}
          type="checkbox"
          name="alcohol"
          checked={habitos.alcohol}
          onChange={onChange}
        />
        Consumo de alcohol
      </label>

      <label htmlFor="actividadFisica">Actividad física</label>

      <select
        className={styles.campoInput}
        id="actividadFisica"
        name="actividadFisica"
        value={habitos.actividadFisica}
        onChange={onChange}
      >
        <option value="Ninguna">Ninguna</option>
        <option value="Baja">Baja</option>
        <option value="Moderada">Moderada</option>
        <option value="Alta">Alta</option>
      </select>
    </section>
  );
};

export default Habitos;

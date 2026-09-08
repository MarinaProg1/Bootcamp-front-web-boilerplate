const Habitos = ({ habitos, onChange, styles }) => {
  // Loguea lo que llega
  console.log("Habitos props:", habitos);

  return (
    <fieldset>
      <legend>Habitos</legend>
      <label>
        <input
          type="checkbox"
          name="antecedentes.habitos.tabaquismo"
          checked={habitos?.tabaquismo}   // uso checked y optional chaining
          className={styles.campoInput}
          onChange={onChange}
        />
        Tabaquismo
      </label>
      <label>
        <input
          type="checkbox"
          name="antecedentes.habitos.alcohol"
          checked={habitos?.alcohol}
          className={styles.campoInput}
          onChange={onChange}
        />
        Alcohol
      </label>

      <select
        id="opciones"
        name="antecedentes.habitos.actividadFisica"
        value={habitos?.actividadFisica}
        className={styles.campoInput}
        onChange={onChange}
      >
        <option value="Ninguna">Ninguna</option>
        <option value="Baja">Baja</option>
        <option value="Moderada">Moderada</option>
        <option value="Alta">Alta</option>
      </select>

      <input
        type="text"
        name="antecedentes.habitos.otros"
        value={habitos?.otros}
        className={styles.campoInput}
        placeholder="Otros"
        onChange={onChange}
      />
    </fieldset>
  );
};

export default Habitos;
/*
 habitos: {
            tabaquismo:"",
            alcohol:"",
            actividadFisica: "",
            otros: "" 
        },  */
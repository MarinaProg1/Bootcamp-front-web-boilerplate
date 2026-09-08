const Motivos = ({ historiaClinica, onChange, styles }) => (
    <fieldset>
        <legend>Motivos</legend>
        <input
            type="text"
            name="motivoConsulta"
            value={historiaClinica.motivoConsulta}
            className={styles.campoInput}
            placeholder="Motivo de la Consulta"
            onChange={onChange}
        />
       
        <input
            type="text"
            name="sintomas"
            value={historiaClinica.sintomas}
            className={styles.campoInput}
            placeholder="Sintomas"
            onChange={onChange}
        />
       
        <input
            type="text"
            name="diagnostico"
            value={historiaClinica.diagnostico}
            className={styles.campoInput}
            placeholder="Diagnostico"
            onChange={onChange}
        />
       
        <input
            type="text"
            name="tratamiento"
            value={historiaClinica.tratamiento}
            className={styles.campoInput}
            placeholder="Tratamiento"
            onChange={onChange}
        />
        <input
            type="text"
            name="obsevaciones"
            value={historiaClinica.obsevaciones}
            className={styles.campoInput}
            placeholder="Obsevaciones"
            onChange={onChange}
        />
        <label className={styles.filaInput} >
            <input 
                type="checkbox"
                name="activo"
                value={historiaClinica.activo}
                className={styles.campoCheck}
                placeholder="activo"
                onChange={onChange}
            />
            Activo
        </label>
    </fieldset>
);

export default Motivos;
/*motivoConsulta: "",
    sintomas: "",
    diagnostico: "",
    tratamiento: "",
    observaciones: "",
    activo: ""*/
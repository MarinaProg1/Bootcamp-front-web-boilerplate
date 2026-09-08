import Habitos from "./Habitos.jsx";

const Antecedentes = ({ antecedentes, onChange, styles }) => (
    <fieldset>
        <legend>Antecedentes</legend>
        <input
            type="text"
            name="antecedentes.alergias"
            value={antecedentes.alergias}
            className={styles.campoInput}
            placeholder="Alergias"
            onChange={onChange}
        />
       
        <input
            type="text"
            name="antecedentes.enfermedadesCronicas"
            value={antecedentes.enfermedadesCronicas}
            className={styles.campoInput}
            placeholder="enfermedadesCronicas"
            onChange={onChange}
        />
       
        <input
            type="text"
            name="antecedentes.medicamentosHabituales"
            value={antecedentes.medicamentosHabituales}
            className={styles.campoInput}
            placeholder="medicamentosHabituales"
            onChange={onChange}
        />
       
        <input
            type="text"
            name="antecedentes.cirugiasPrevias"
            value={antecedentes.cirugiasPrevias}
            className={styles.campoInput}
            placeholder="Cirugias Previas"
            onChange={onChange}
        />
        <input
            type="text"
            name="antecedentes.antecedentesFamiliares"
            value={antecedentes.antecedentesFamiliares}
            className={styles.campoInput}
            placeholder="Antecedentes Familiares"
            onChange={onChange}
        />
        <input
            type="text"
            name="antecedentes.vacunas"
            value={antecedentes.vacunas}
            className={styles.campoInput}
            placeholder="Vacunas"
            onChange={onChange}
        />
        <Habitos
            habitos={antecedentes.habitos}
            onChange={onChange}
            styles={styles}
                
        />
        
        
    </fieldset>
);
export default Antecedentes;

/*      alergias: "",
        enfermedadesCronicas:"",
        medicamentosHabituales:"",
        cirugiasPrevias: "",
        internacionesPrevias: "",
        antecedentesFamiliares: "",
        vacunas:"",
        habitos: {
            tabaquismo:"",
            alcohol:"",
            actividadFisica: "",
            otros: "" 
        },  */
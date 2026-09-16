import styles from "../../pacientes/FormularioPaciente.module.scss";
const CamposArray = ({ id, label, value, placeholder, onChange }) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>

      <textarea
        className={styles.campoInput}
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
      />
    </div>
  );
};

export default CamposArray;

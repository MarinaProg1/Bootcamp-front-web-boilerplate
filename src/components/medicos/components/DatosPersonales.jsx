const DatosPersonales = ({
  medico,
  errores,
  onChange,
  styles,
  especialidades,
}) => (
  <fieldset>
    <legend>Datos Personales:</legend>

    <input
      type="text"
      name="nombre"
      value={medico.nombre || ""}
      className={styles.campoInput}
      placeholder="Nombre"
      onChange={onChange}
    />
    {errores.nombre && (
      <span className={styles.textoError}>{errores.nombre}</span>
    )}

    <input
      type="text"
      name="apellido"
      value={medico.apellido || ""}
      className={styles.campoInput}
      placeholder="Apellido"
      onChange={onChange}
    />
    {errores.apellido && (
      <span className={styles.textoError}>{errores.apellido}</span>
    )}

    <input
      type="text"
      name="matricula"
      value={medico.matricula || ""}
      className={styles.campoInput}
      placeholder="Matrícula"
      onChange={onChange}
    />
    {errores.matricula && (
      <span className={styles.textoError}>{errores.matricula}</span>
    )}

    <input
      type="text"
      name="dni"
      value={medico.dni || ""}
      className={styles.campoInput}
      placeholder="DNI"
      onChange={onChange}
    />
    {errores.dni && <span className={styles.textoError}>{errores.dni}</span>}

    {/* EMAIL */}
    <input
      type="email"
      name="email"
      value={medico.email || ""}
      className={styles.campoInput}
      placeholder="Email"
      onChange={onChange}
    />
    {errores.email && (
      <span className={styles.textoError}>{errores.email}</span>
    )}

    {/* ESPECIALIDADES */}
    <legend>Especialidades:</legend>
    <div className={styles.checkboxContainer}>
      {especialidades.map((especialidad) => (
        <label key={especialidad.value}>
          <input
            type="checkbox"
            name="especialidad"
            value={especialidad.value}
            checked={
              Array.isArray(medico.especialidad) &&
              medico.especialidad.includes(especialidad.value)
            }
            onChange={onChange}
          />
          {especialidad.label}
        </label>
      ))}
    </div>
  </fieldset>
);

export default DatosPersonales;

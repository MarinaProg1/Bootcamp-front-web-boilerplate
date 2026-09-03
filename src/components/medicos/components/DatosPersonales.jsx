const DatosPersonales = ({ medico, errores, onChange, styles }) => (
  <fieldset>
    <legend>Datos Personales</legend>
    <input
      type="text"
      name="nombre"
      value={medico.nombre}
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
      value={medico.apellido}
      className={styles.campoInput}
      placeholder="Apellido"
      onChange={onChange}
    />
    <input
      type="text"
      name="matricula"
      value={medico.matricula}
      className={styles.campoInput}
      placeholder="Matrícula"
      onChange={onChange}
    />
    <input
      type="text"
      name="especialidad"
      value={medico.especialidad}
      className={styles.campoInput}
      placeholder="Especialidad"
      onChange={onChange}
    />
    <input
      type="text"
      name="dni"
      value={medico.dni}
      className={styles.campoInput}
      placeholder="DNI"
      onChange={onChange}
    />
    {errores.dni && <span className={styles.textoError}>{errores.dni}</span>}
    <input
      type="correo"
      name="correo"
      value={medico.correo}
      className={styles.campoInput}
      placeholder="Email"
      onChange={onChange}
    />
    {errores.email && (
      <span className={styles.textoError}>{errores.email}</span>
    )}
  </fieldset>
);

export default DatosPersonales;

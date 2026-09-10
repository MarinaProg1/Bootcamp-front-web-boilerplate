
import { useState } from 'react';

import styles from './FormularioTurno.module.scss';
import JsonDebugger from '../utils/JsonDebugger';
import { Button } from 'react-bootstrap';
import { validarDatos } from '../utils/validaciones';

const reglasTurno = {
    paciente: (valor) =>
        valor.trim() === ''
            ? 'Debe seleccionar un paciente'
            : null,

    especialidad: (valor) =>
        valor.trim() === ''
            ? 'La especialidad es obligatoria'
            : null,

    fechaTurno: (valor) =>
        valor.trim() === ''
            ? 'La fecha y hora son obligatorias'
            : null,
};

const especialidades = [
    {
        value: 'cardiologia',
        label: 'Cardiología'
    },
    {
        value: 'neurologia',
        label: 'Neurología'
    },
    {
        value: 'pediatria',
        label: 'Pediatría'
    },
    {
        value: 'dermatologia',
        label: 'Dermatología'
    }
];

const FormularioTurno = () => {

    const [turno, setTurno] = useState({
        paciente: '',
        especialidad: '',
        fechaTurno: '',
        observaciones: ''
    });

    const [dni, setDni] = useState('');
    const [pacienteEncontrado, setPacienteEncontrado] = useState(null);
    const [errores, setErrores] = useState({});
    const [mensajePaciente, setMensajePaciente] = useState('');
    const [buscandoPaciente, setBuscandoPaciente] = useState(false);
    const buscarPaciente = async () => {
        if (!/^[0-9]{7,8}$/.test(dni)) {
            setMensajePaciente(
                'El DNI debe tener entre 7 y 8 dígitos'
            );
            setPacienteEncontrado(null);
            setTurno(prev => ({
                ...prev,
                paciente: ''
            }));
            return;
        }

        try {
            setBuscandoPaciente(true);
            setMensajePaciente('');
            const respuesta = await fetch(
                `http://localhost:3000/api/v1/Pacientes?dni=${dni}`
            );
            const data = await respuesta.json();
            if (!respuesta.ok) {
                setPacienteEncontrado(null);
                setTurno(prev => ({
                    ...prev,
                    paciente: ''
                }));
                setMensajePaciente(
                    data.message || 'Error al buscar paciente'
                );
                return;
            }

            // Tu endpoint devuelve un array de pacientes
            if (!data.data || data.data.length === 0) {
                setPacienteEncontrado(null);
                setTurno(prev => ({
                    ...prev,
                    paciente: ''
                }));
                setMensajePaciente(
                    'No existe un paciente registrado con ese DNI'
                );
                return;
            }
            const paciente = data.data[0];
            setPacienteEncontrado(paciente);
            setTurno(prev => ({
                ...prev,
                paciente: paciente.id
            }));
            setMensajePaciente('');
        } catch (error) {
            console.error(
                'Error al buscar paciente:',
                error
            );
            setPacienteEncontrado(null);
            setTurno(prev => ({
                ...prev,
                paciente: ''
            }));
            setMensajePaciente(
                'No se pudo conectar con el servidor'
            );

        } finally {
            setBuscandoPaciente(false);
        }
    };


    const handleChange = (evento) => {
        const { name, value } = evento.target;
        setTurno(prev => ({
            ...prev,
            [name]: value
        }));

        // Si cambia un campo, quitamos su error
        setErrores(prev => ({
            ...prev,
            [name]: null
        }));
    };

    const handleSubmit = async (evento) => {
        evento.preventDefault();
        const nuevosErrores = validarDatos(
            turno,
            reglasTurno
        );
        setErrores(nuevosErrores);
        if (Object.keys(nuevosErrores).length > 0) {
            console.log(
                'Validación fallida:',
                nuevosErrores
            );
            return;
        }
        try {

            const respuesta = await fetch(
                'http://localhost:3000/api/v1/Turnos',
                {
                    method: 'POST',

                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'token123',
                        'x-origen': 'frontend'
                    },

                    body: JSON.stringify(turno)
                }
            );
            const data = await respuesta.json();
            if (!respuesta.ok) {
                console.error(
                    'Error del servidor:',
                    data
                );
                alert(
                    data.message ||
                    'No se pudo crear el turno'
                );
                return;
            }
            alert('Turno guardado correctamente');
            // Limpiar formulario
            setTurno({
                paciente: '',
                especialidad: '',
                fechaTurno: '',
                observaciones: ''
            });

            setDni('');
            setPacienteEncontrado(null);
            setMensajePaciente('');
            setErrores({});
        } catch (error) {
            console.error(
                'Error de conexión:',
                error
            );
            alert(
                'El servidor está apagado o no responde'
            );
        }
    };

    return (

        <div className={styles.contenedorFormulario}>
            <h3>Ingreso de Nuevo Turno</h3>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Paciente</legend>
                    <div className={styles.campoGrande}>
                        <label
                            className={styles.label}
                            htmlFor="dni"
                        >
                            DNI del paciente
                        </label>
                        <div className={styles.buscarPaciente}>
                            <input
                                id="dni"
                                type="text"
                                value={dni}
                                maxLength={8}
                                className={styles.campoInput}
                                placeholder="Ej: 12345678"
                                onChange={(e) =>
                                    setDni(e.target.value)
                                }
                            />
                            <Button type="button" onClick={buscarPaciente} disabled={buscandoPaciente}
                            >
                                {buscandoPaciente
                                    ? 'Buscando...'
                                    : 'Buscar'
                                }
                            </Button>

                        </div>
                        {mensajePaciente && (
                            <span className={styles.textError}>
                                {mensajePaciente}
                            </span>
                        )}
                    </div>

                    {/* PACIENTE ENCONTRADO */}
                    {pacienteEncontrado && (
                        <div className={styles.pacienteEncontrado}>
                            <strong>
                                Paciente encontrado
                            </strong>
                            <p>
                                Nombre:
                                {' '}
                                {pacienteEncontrado.nombre}
                            </p>
                            <p>
                                DNI:
                                {' '}
                                {pacienteEncontrado.dni}
                            </p>

                        </div>

                    )}
                </fieldset>
                <div className={styles.campoGrande}>
                    <label
                        className={styles.label}
                        htmlFor="especialidad"
                    >
                        Especialidad
                    </label>
                    {errores.especialidad && (

                        <span className={styles.textError}>
                            {errores.especialidad}
                        </span>

                    )}
                    <select
                        id="especialidad"
                        name="especialidad"
                        value={turno.especialidad}
                        className={styles.campoInput}
                        onChange={handleChange}
                    >
                        <option value="">
                            Seleccione una especialidad
                        </option>
                        {especialidades.map(
                            especialidad => (

                                <option
                                    key={especialidad.value}
                                    value={especialidad.value}
                                >
                                    {especialidad.label}
                                </option>

                            )
                        )}

                    </select>

                </div>
                <div className={styles.campoGrande}>
                    <label className={styles.label} htmlFor="fechaTurno">
                        Fecha y hora del turno
                    </label>
                    {errores.fechaTurno && (

                        <span className={styles.textError}>
                            {errores.fechaTurno}
                        </span>

                    )}
                    <input
                        id="fechaTurno"
                        type="datetime-local"
                        name="fechaTurno"
                        value={turno.fechaTurno}
                        className={styles.campoInput}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.campoGrande}>

                    <label className={styles.label} htmlFor="observaciones">
                        Observaciones
                    </label>
                    <textarea
                        id="observaciones"
                        name="observaciones"
                        value={turno.observaciones}
                        className={styles.campoInput}
                        maxLength={500}
                        rows={4}
                        placeholder="Observaciones opcionales..."
                        onChange={handleChange}
                    />
                    <small>
                        {turno.observaciones.length}/500
                    </small>
                </div>
                <div className={styles.estado}>
                    <strong>
                        Estado:
                    </strong>
                    <span>
                        Pendiente
                    </span>

                </div>
                <Button type="submit" disabled={!pacienteEncontrado}>
                    Guardar Turno
                </Button>
            </form>
            <JsonDebugger
                data={turno}
                titulo="ESTADO DEL JSON"
            />

        </div>
    );
};

export default FormularioTurno;


import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Para obtener el ID de la URL
import styles from './FormularioTurno.module.scss';
import JsonDebugger from '../utils/JsonDebugger';
import { Button } from 'react-bootstrap';
import { validarDatos } from '../utils/validaciones';

const reglasTurno = {
    paciente: (valor) => valor.trim() === '' ? 'Debe seleccionar un paciente' : null,
    especialidad: (valor) => valor.trim() === '' ? 'La especialidad es obligatoria' : null,
    fechaTurno: (valor) => valor.trim() === '' ? 'La fecha y hora son obligatorias' : null,
};

const especialidades = [
    { value: 'cardiologia', label: 'Cardiología' },
    { value: 'neurologia', label: 'Neurología' },
    { value: 'pediatria', label: 'Pediatría' },
    { value: 'dermatologia', label: 'Dermatología' }
];

const EditarTurno = () => {
    const { id } = useParams(); // Obtiene el ID del turno desde la ruta (ej: /turnos/editar/:id)

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
    const [cargandoTurno, setCargandoTurno] = useState(true);

    // 1. CARGAR LOS DATOS DEL TURNO AL MONTAR EL COMPONENTE
    useEffect(() => {
        const obtenerTurno = async () => {
            try {
                const respuesta = await fetch(`http://localhost:3000/api/v1/turnos/?id=${id}`, {
                    // headers: {
                    //     'Authorization': 'token123',
                    //     'x-origen': 'frontend'
                    // }
                });
                const data = await respuesta.json();

                if (!respuesta.ok) {
                    alert(data.message || 'Error al obtener el turno');
                    return;
                }

                const turnoData = Array.isArray(data.data) ? data.data[0] : data.data;

                if (!turnoData) {
                    alert('No se encontró información para el turno especificado.');
                    return;
                }
                
                // Formatear la fecha para input type="datetime-local" (YYYY-MM-DDTHH:mm)
                const fechaFormateada = turnoData.fechaTurno
                    ? new Date(turnoData.fechaTurno).toISOString().slice(0, 16)
                    : '';
                

                // Limpiamos o normalizamos la especialidad para que coincida con los <option> del select (ej: "cardiología" -> "cardiologia")
                const especialidadNormalizada = turnoData.especialidad
                ? turnoData.especialidad.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                : '';
                
                // Cargar datos en el estado del formulario
                setTurno({
                    paciente: turnoData.paciente.id || turnoData.paciente,
                    especialidad: especialidadNormalizada,
                    fechaTurno: fechaFormateada,
                    observaciones: turnoData.observaciones || ''
                });

                // Si el backend incluye la información del paciente en la respuesta:
                if (turnoData.pacienteObjeto || typeof turnoData.paciente === 'object') {
                    const pac = turnoData.pacienteObjeto || turnoData.paciente;
                    setPacienteEncontrado(pac);
                    setDni(pac.dni || '');
                }
            } catch (error) {
                console.error('Error al cargar turno:', error);
                alert('Error de conexión al cargar los datos del turno');
            } finally {
                setCargandoTurno(false);
            }
        };

        if (id) {
            obtenerTurno();
        }
    }, [id]);

    const buscarPaciente = async () => {
        if (!/^[0-9]{7,8}$/.test(dni)) {
            setMensajePaciente('El DNI debe tener entre 7 y 8 dígitos');
            setPacienteEncontrado(null);
            setTurno(prev => ({ ...prev, paciente: '' }));
            return;
        }

        try {
            setBuscandoPaciente(true);
            setMensajePaciente('');
            const respuesta = await fetch(`http://localhost:3000/api/v1/Pacientes?dni=${dni}`);
            const data = await respuesta.json();

            if (!respuesta.ok || !data.data || data.data.length === 0) {
                setPacienteEncontrado(null);
                setTurno(prev => ({ ...prev, paciente: '' }));
                setMensajePaciente(data.message || 'No existe un paciente registrado con ese DNI');
                return;
            }

            const paciente = data.data[0];
            setPacienteEncontrado(paciente);
            setTurno(prev => ({ ...prev, paciente: paciente.id }));
            setMensajePaciente('');
        } catch (error) {
            console.error('Error al buscar paciente:', error);
            setPacienteEncontrado(null);
            setTurno(prev => ({ ...prev, paciente: '' }));
            setMensajePaciente('No se pudo conectar con el servidor');
        } finally {
            setBuscandoPaciente(false);
        }
    };

    const handleChange = (evento) => {
        const { name, value } = evento.target;
        setTurno(prev => ({ ...prev, [name]: value }));
        setErrores(prev => ({ ...prev, [name]: null }));
    };

    // 2. ACTUALIZAR EL TURNO (MÉTODO PUT)
    const handleSubmit = async (evento) => {
        evento.preventDefault();
        const nuevosErrores = validarDatos(turno, reglasTurno);
        setErrores(nuevosErrores);

        if (Object.keys(nuevosErrores).length > 0) return;

        try {
            const respuesta = await fetch(`http://localhost:3000/api/v1/turnos/${id}`, {
                method: 'PUT', // Se cambia de POST a PUT
                 headers: {
                     'Content-Type': 'application/json',
                     'Authorization': 'token123',
                   'x-origen': 'frontend'
                },
                body: JSON.stringify(turno)
            });

            const data = await respuesta.json();

            if (!respuesta.ok) {
                alert(data.message || 'No se pudo actualizar el turno');
                return;
            }

            alert('Turno actualizado correctamente');
        } catch (error) {
            console.error('Error de conexión:', error);
            alert('El servidor está apagado o no responde');
        }
    };

    if (cargandoTurno) {
        return <div className={styles.contenedorFormulario}><p>Cargando turno...</p></div>;
    }

    return (
        <div className={styles.contenedorFormulario}>
            <h3>Editar Turno</h3>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Paciente</legend>
                    <div className={styles.campoGrande}>
                        <label className={styles.label} htmlFor="dni">DNI del paciente</label>
                        <div className={styles.buscarPaciente}>
                            <input
                                id="dni"
                                type="text"
                                value={dni}
                                maxLength={8}
                                className={styles.campoInput}
                                placeholder="Ej: 12345678"
                                onChange={(e) => setDni(e.target.value)}
                                disabled={buscandoPaciente}
                            />
                            <Button type="button" onClick={buscarPaciente}  disabled={buscandoPaciente}>
                                {buscandoPaciente ? 'Buscando...' : 'Buscar'}
                            </Button>
                        </div>
                        {mensajePaciente && <span className={styles.textError}>{mensajePaciente}</span>}
                    </div>

                    {pacienteEncontrado && (
                        <div className={styles.pacienteEncontrado}>
                            <strong>Paciente encontrado</strong>
                            <p>Nombre: {pacienteEncontrado.nombre}</p>
                            <p>DNI: {pacienteEncontrado.dni}</p>
                        </div>
                    )}
                </fieldset>

                <div className={styles.campoGrande}>
                    <label className={styles.label} htmlFor="especialidad">Especialidad</label>
                    {errores.especialidad && <span className={styles.textError}>{errores.especialidad}</span>}
                    <select
                        id="especialidad"
                        name="especialidad"
                        value={turno.especialidad}
                        className={styles.campoInput}
                        onChange={handleChange}
                    >
                        <option value="">Seleccione una especialidad</option>
                        {especialidades.map(esp => (
                            <option key={esp.value} value={esp.value}>{esp.label}</option>
                        ))}
                    </select>
                </div>

                <div className={styles.campoGrande}>
                    <label className={styles.label} htmlFor="fechaTurno">Fecha y hora del turno</label>
                    {errores.fechaTurno && <span className={styles.textError}>{errores.fechaTurno}</span>}
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
                    <label className={styles.label} htmlFor="observaciones">Observaciones</label>
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
                    <small>{turno.observaciones.length}/500</small>
                </div>

                <div className={styles.estado}>
                    <strong>Estado:</strong>
                    <span>Pendiente</span>
                </div>

                <Button type="submit" disabled={!pacienteEncontrado}>
                    Actualizar Turno
                </Button>
            </form>

            <JsonDebugger data={turno} titulo="ESTADO DEL JSON" />
        </div>
    );
};

export default EditarTurno;

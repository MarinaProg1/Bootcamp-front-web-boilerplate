import { useEffect, useState } from "react";
import { Container, Row, Spinner, Alert } from "react-bootstrap";
import axios from "axios";
import PacienteCard from "../PacienteCard";
import BusquedaPaciente from "../../BusquedaPaciente";

const Pacientes = () => {
    const [pacientes, setPacientes] = useState([]);
    const [resultadosBusqueda, setResultadosBusqueda] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelado = false;

        axios
            .get("http://localhost:3000/api/v1/pacientes")
            .then((respuesta) => {
                if (!cancelado) {
                    setPacientes(respuesta.data.data);
                }

                console.log(
                    "Pacientes recibidos:",
                    respuesta.data.data
                );
            })
            .catch((error) => {
                if (!cancelado) {
                    console.error(
                        "Error al obtener los pacientes:",
                        error
                    );

                    setError(
                        "No se pudieron cargar los pacientes."
                    );
                }
            })
            .finally(() => {
                if (!cancelado) {
                    setCargando(false);
                }
            });

        return () => {
            cancelado = true;
        };
    }, []);

    const eliminarPaciente = async (id) => {
        const confirmar = window.confirm(
            "¿Está seguro de que desea eliminar este paciente?"
        );

        if (!confirmar) {
            return;
        }

        try {
            await axios.delete(
                `http://localhost:3000/api/v1/pacientes/${id}`
            );

            setPacientes((pacientesActuales) =>
                pacientesActuales.filter(
                    (paciente) => paciente.id !== id
                )
            );

            setResultadosBusqueda((resultadosActuales) => {
                if (resultadosActuales === null) {
                    return null;
                }

                return resultadosActuales.filter(
                    (paciente) => paciente.id !== id
                );
            });

        } catch (error) {
            console.error(
                "Error al eliminar el paciente:",
                error
            );

            alert("No se pudo eliminar el paciente.");
        }
    };

    if (cargando) {
        return (
            <Container className="py-4 text-center">
                <Spinner animation="border" />
                <p className="mt-2">
                    Cargando pacientes...
                </p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="py-4">
                <Alert variant="danger">
                    {error}
                </Alert>
            </Container>
        );
    }

    const pacientesAMostrar =
        resultadosBusqueda !== null
            ? resultadosBusqueda
            : pacientes;

    return (
        <Container className="py-4">

            <div className="mb-4">
                <h2 className="mb-1">
                    Pacientes
                </h2>

                <p className="text-body-secondary mb-0">
                    Listado de pacientes registrados en el sistema
                </p>
            </div>

            {/* BUSCADOR */}
            <BusquedaPaciente
                onResultados={setResultadosBusqueda}
            />

            {/* LISTADO */}
            {pacientesAMostrar.length === 0 ? (

                <Alert variant="info">
                    No se encontraron pacientes.
                </Alert>

            ) : (

                <Row>
                    {pacientesAMostrar.map((paciente) => (
                        <PacienteCard
                            key={paciente.id}
                            paciente={paciente}
                            onEliminar={eliminarPaciente}
                        />
                    ))}
                </Row>

            )}

        </Container>
    );
};

export default Pacientes;
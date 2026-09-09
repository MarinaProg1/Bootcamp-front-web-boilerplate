import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Spinner, Alert } from "react-bootstrap";
import axios from "axios";

const DetallePaciente = () => {
    const { id } = useParams();

    const [paciente, setPaciente] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelado = false;

        const cargarPaciente = async () => {
            try {
                setCargando(true);
                setError(null);

                const respuesta = await axios.get(
                    `http://localhost:3000/api/v1/pacientes/${id}`
                );

                if (!cancelado) {
                    setPaciente(respuesta.data.data);
                }
            } catch (error) {
                console.error("Error al obtener el paciente:", error);

                if (!cancelado) {
                    setError("No se pudo cargar el paciente.");
                }
            } finally {
                if (!cancelado) {
                    setCargando(false);
                }
            }
        };

        cargarPaciente();

        return () => {
            cancelado = true;
        };
    }, [id]);

    if (cargando) {
        return (
            <Container className="py-4 text-center">
                <Spinner animation="border" />
                <p className="mt-2">Cargando paciente...</p>
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

    return (
        <Container className="py-4">

            <h2 className="mb-4">Detalle del paciente</h2>

            <Card className="border-0 shadow-sm">
                <Card.Body>

                    <h3 className="h4 mb-4">
                        {paciente.nombre}
                    </h3>

                    <p>
                        <strong>DNI:</strong>{" "}
                        {paciente.dni}
                    </p>

                    <p>
                        <strong>Email:</strong>{" "}
                        {paciente.email}
                    </p>

                    <p>
                        <strong>Teléfono:</strong>{" "}
                        {paciente.telefono?.codigoArea}-
                        {paciente.telefono?.numero}
                    </p>

                    <p>
                        <strong>Tipo de teléfono:</strong>{" "}
                        {paciente.telefono?.tipo}
                    </p>

                    <p>
                        <strong>Obra social:</strong>{" "}
                        {paciente.obraSocial?.nombre ?? "Sin obra social"}
                    </p>

                    <p>
                        <strong>N.º de afiliado:</strong>{" "}
                        {paciente.obraSocial?.numeroAfiliado ?? "No informado"}
                    </p>

                    <p>
                        <strong>Dirección:</strong>{" "}
                        {paciente.direccion?.calle}{" "}
                        {paciente.direccion?.numero}
                    </p>

                    {paciente.direccion?.piso && (
                        <p>
                            <strong>Piso:</strong>{" "}
                            {paciente.direccion.piso}
                        </p>
                    )}

                    {paciente.direccion?.departamento && (
                        <p>
                            <strong>Departamento:</strong>{" "}
                            {paciente.direccion.departamento}
                        </p>
                    )}

                    {paciente.direccion?.barrio && (
                        <p>
                            <strong>Barrio:</strong>{" "}
                            {paciente.direccion.barrio}
                        </p>
                    )}

                </Card.Body>
            </Card>

        </Container>
    );
};

export default DetallePaciente;
import { useParams, Link } from "react-router-dom";
import { Alert, Badge, Button, Card, Col, Container, ListGroup, Row, Spinner, Stack } from "react-bootstrap";
import { useEffect, useState } from "react";
import clientesAxios from "../../config/axios";

const DetallePaciente = () => {
    const { id } = useParams();

    const [paciente, setPaciente] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargarPaciente = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const respuesta = await clientesAxios.get(
                    `/pacientes/${id}`
                );

                setPaciente(respuesta.data.data);

            } catch (error) {
                console.error(
                    "Error al obtener el paciente:",
                    error
                );

                setError(
                    "No se pudo cargar la información del paciente."
                );
            } finally {
                setIsLoading(false);
            }
        };

        cargarPaciente();
    }, [id]);

    if (isLoading) {
        return (
            <Container className="py-5 text-center">
                <Spinner
                    animation="border"
                    variant="primary"
                    role="status"
                />

                <p className="text-body-secondary mt-3">
                    Cargando detalle del paciente...
                </p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="py-5">
                <Alert variant="warning">
                    {error}
                </Alert>

                <Button
                    as={Link}
                    to="/listado-pacientes"
                    variant="outline-primary"
                >
                    Volver a pacientes
                </Button>
            </Container>
        );
    }

    if (!paciente) {
        return (
            <Container className="py-5">
                <Alert variant="warning">
                    No se encontró el paciente solicitado.
                </Alert>

                <Button
                    as={Link}
                    to="/listado-pacientes"
                    variant="outline-primary"
                >
                    Volver a pacientes
                </Button>
            </Container>
        );
    }

        const telefono = paciente.telefono;
        const direccion = paciente.direccion;
        const obraSocial = paciente.obraSocial;

        const fechaNacimiento = paciente.fechaNacimiento
            ? new Date(paciente.fechaNacimiento).toLocaleDateString("es-AR")
            : "No registrada";

    return (
        <Container className="pb-5">

            <Stack
                direction="horizontal"
                className="justify-content-between align-items-start mb-4"
            >
                <div>
                    <p className="text-body-secondary mb-1">
                        Detalle del paciente
                    </p>

                    <h1 className="h2 mb-0">
                        {paciente.nombre}
                    </h1>
                </div>

                <Badge
                    bg="success"
                    className="fs-6"
                >
                    Paciente registrado
                </Badge>
            </Stack>

            {/* INFORMACIÓN PERSONAL */}
            <Card className="border-0 shadow-sm mb-4">
                <Card.Header className="bg-white fw-semibold">
                    Información personal
                </Card.Header>

                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <span className="text-body-secondary">
                            DNI
                        </span>
                        <br />
                        {paciente.dni ?? "No registrado"}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <span className="text-body-secondary">
                            Fecha de nacimiento
                        </span>
                        <br />
                        {fechaNacimiento}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <span className="text-body-secondary">
                            Sexo
                        </span>
                        <br />
                        {paciente.sexo ?? "No registrado"}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <span className="text-body-secondary">
                            Identificador
                        </span>
                        <br />
                        <span className="text-break">
                            {paciente.id}
                        </span>
                    </ListGroup.Item>
                </ListGroup>
            </Card>

            {/* CONTACTO Y DIRECCIÓN */}
            <Row className="g-4 mb-4">

                <Col xs={12} lg={6}>
                    <Card className="h-100 border-0 shadow-sm">
                        <Card.Header className="bg-white fw-semibold">
                            Datos de contacto
                        </Card.Header>

                        <ListGroup variant="flush">

                            <ListGroup.Item>
                                <span className="text-body-secondary">
                                    Email
                                </span>
                                <br />
                                {paciente.email ?? "No registrado"}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <span className="text-body-secondary">
                                    Teléfono
                                </span>
                                <br />

                                {telefono
                                    ? `(${telefono.codigoArea}) ${telefono.numero}`
                                    : "No registrado"}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <span className="text-body-secondary">
                                    Tipo de teléfono
                                </span>
                                <br />

                                {telefono?.tipo ?? "No registrado"}
                            </ListGroup.Item>

                        </ListGroup>
                    </Card>
                </Col>

                <Col xs={12} lg={6}>
                    <Card className="h-100 border-0 shadow-sm">
                        <Card.Header className="bg-white fw-semibold">
                            Dirección
                        </Card.Header>

                        <ListGroup variant="flush">

                            <ListGroup.Item>
                                <span className="text-body-secondary">
                                    Calle
                                </span>
                                <br />

                                {direccion?.calle
                                    ? `${direccion.calle} ${direccion.numero ?? ""}`
                                    : "No registrada"}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <span className="text-body-secondary">
                                    Barrio
                                </span>
                                <br />

                                {direccion?.barrio ?? "No registrado"}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <span className="text-body-secondary">
                                    Piso
                                </span>
                                <br />

                                {direccion?.piso ?? "No registrado"}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <span className="text-body-secondary">
                                    Departamento
                                </span>
                                <br />

                                {direccion?.departamento ?? "No registrado"}
                            </ListGroup.Item>

                        </ListGroup>
                    </Card>
                </Col>

            </Row>

            {/* OBRA SOCIAL */}
            <Card className="border-0 shadow-sm mb-4">
                <Card.Header className="bg-white fw-semibold">
                    Obra social
                </Card.Header>

                <ListGroup variant="flush">

                    <ListGroup.Item>
                        <span className="text-body-secondary">
                            Obra social
                        </span>
                        <br />

                        {obraSocial?.nombre ?? "Sin obra social"}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <span className="text-body-secondary">
                            Número de afiliado
                        </span>
                        <br />

                        {obraSocial?.numeroAfiliado ??
                            "No informado"}
                    </ListGroup.Item>

                </ListGroup>
            </Card>

            <Button
                as={Link}
                to="/listado-pacientes"
                variant="outline-secondary"
            >
                Volver a pacientes
            </Button>

        </Container>
    );
};

export default DetallePaciente;
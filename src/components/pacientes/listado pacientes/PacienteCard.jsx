import { Link } from "react-router-dom";
import { Col, Card, Badge, Button, Stack } from "react-bootstrap";

const PacienteCard = ({ paciente, onEliminar }) => {
    const telefono = paciente.telefono
        ? `${paciente.telefono.codigoArea}-${paciente.telefono.numero}`
        : "Sin teléfono";

    return (
        <Col xs={12} md={6} lg={4} className="mb-4">
            <Card className="h-100 border-0 shadow-sm">

                <Card.Header className="bg-white border-0 pt-3 px-3">
                    <Stack
                        direction="horizontal"
                        className="justify-content-between align-items-start"
                    >
                        <Card.Title className="h5 mb-0">
                            {paciente.nombre ?? "Paciente sin nombre"}
                        </Card.Title>

                        <Badge bg="success">
                            Activo
                        </Badge>
                    </Stack>
                </Card.Header>

                <Card.Body className="px-3 pt-2">

                    <div className="mb-2">
                        <span className="fw-semibold">DNI:</span>{" "}
                        <span className="text-body-secondary">
                            {paciente.dni}
                        </span>
                    </div>

                    <div className="mb-2">
                        <span className="fw-semibold">Teléfono:</span>{" "}
                        <span className="text-body-secondary">
                            {telefono}
                        </span>
                    </div>

                    <div className="mb-2">
                        <span className="fw-semibold">Email:</span>{" "}
                        <span className="text-body-secondary">
                            {paciente.email}
                        </span>
                    </div>

                    <div className="small text-body-secondary">
                        <strong className="text-dark">
                            Obra social:
                        </strong>{" "}
                        {paciente.obraSocial?.nombre ?? "Sin obra social"}
                    </div>

                </Card.Body>

                <Card.Footer className="bg-white border-0 px-3 pb-3">
                    <Stack direction="horizontal" gap={2}>

                        <Button
                            as={Link}
                            to={`/paciente-detalle/${paciente.id}`}
                            variant="outline-secondary"
                            className="flex-grow-1"
                        >
                            Ver detalle
                        </Button>

                        <Button
                            variant="danger"
                            onClick={() => onEliminar(paciente.id)}
                        >
                            Eliminar
                        </Button>

                    </Stack>
                </Card.Footer>

            </Card>
        </Col>
    );
};

export default PacienteCard;
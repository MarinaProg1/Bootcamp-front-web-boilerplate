import { useParams, Link } from "react-router-dom";
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  Row,
  Spinner,
  Stack,
} from "react-bootstrap";
import { useFetch } from "../../hooks/useFetch";

const DetalleMedico = () => {
  const { id } = useParams();

  // Consumimos el endpoint del médico según el ID
  const { data: medicos, isLoading } = useFetch(`/medicos/?id=${id}`);

  // Si la API devuelve un array, tomamos el primero; si devuelve directamente el objeto, usamos 'medicos'
  const medico = Array.isArray(medicos) ? medicos[0] : medicos;

  if (isLoading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" role="status" />
        <p className="text-body-secondary mt-3">
          Cargando detalle del médico...
        </p>
      </Container>
    );
  }

  if (!medico) {
    return (
      <Container className="py-5">
        <Alert variant="warning">No se encontró el médico solicitado.</Alert>
        <Button as={Link} to="/medicos" variant="outline-primary">
          Volver a la lista de médicos
        </Button>
      </Container>
    );
  }

  return (
    <Container className="pb-5">
      {/* Encabezado Principal */}
      <Stack
        direction="horizontal"
        className="justify-content-between align-items-start mb-4"
      >
        <div>
          <p className="text-body-secondary mb-1">Detalle del profesional</p>
          <h1 className="h2 mb-0">
            Dr/a. {medico.nombre} {medico.apellido}
          </h1>
        </div>
        <Badge
          bg={medico.activo !== false ? "success" : "danger"}
          className="fs-6"
        >
          {medico.activo !== false ? "Activo" : "Inactivo"}
        </Badge>
      </Stack>

      {/* Tarjeta Resumen Principal */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body>
          <Row className="g-4">
            <Col xs={12} md={4}>
              <div className="small text-body-secondary">
                Matrícula Profesional
              </div>
              <div className="fw-semibold">
                {medico.matricula || "Sin matrícula"}
              </div>
            </Col>
            <Col xs={12} md={4}>
              <div className="small text-body-secondary">Especialidad</div>
              <div className="fw-semibold text-capitalize">
                {medico.especialidad?.nombre ||
                  medico.especialidad ||
                  "Sin especificar"}
              </div>
            </Col>
            <Col xs={12} md={4}>
              <div className="small text-body-secondary">
                Identificador (ID)
              </div>
              <div className="fw-semibold text-break">
                {medico._id || medico.id}
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Tarjetas de Detalle */}
      <Row className="g-4">
        {/* Información Personal y Contacto */}
        <Col xs={12} lg={6}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Header className="bg-white fw-semibold">
              Datos Personales y Contacto
            </Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <span className="text-body-secondary">DNI</span>
                <br />
                {medico.dni || "No registrado"}
              </ListGroup.Item>
              <ListGroup.Item>
                <span className="text-body-secondary">Email</span>
                <br />
                {medico.email || "No registrado"}
              </ListGroup.Item>
              <ListGroup.Item>
                <span className="text-body-secondary">Teléfono</span>
                <br />
                {medico.telefono
                  ? `(${medico.telefono.codigoArea || ""}) ${medico.telefono.numero || ""}`
                  : "No registrado"}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>

        {/* Información Profesional / Adicional */}
        <Col xs={12} lg={6}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Header className="bg-white fw-semibold">
              Información Profesional
            </Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <span className="text-body-secondary">Tipo de Teléfono</span>
                <br />
                {medico.telefono?.tipo || "No registrado"}
              </ListGroup.Item>
              <ListGroup.Item>
                <span className="text-body-secondary">Estado en Sistema</span>
                <br />
                {medico.activo !== false
                  ? "Habilitado para atender"
                  : "Deshabilitado"}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>

      {/* Botón Volver */}
      <Button
        as={Link}
        to="/medicos"
        variant="outline-secondary"
        className="mt-4"
      >
        Volver a la lista de médicos
      </Button>
    </Container>
  );
};

export default DetalleMedico;

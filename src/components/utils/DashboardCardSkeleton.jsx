import { Col, Card, Placeholder } from "react-bootstrap";

const DashboardCardSkeleton = () => {
  return (
    <Col md={6}>
      <Card
        className="h-100 shadow-sm border-0"
        style={{
          borderLeft: "5px solid #dee2e6",
          background: "#c9c9c9",
        }}
      >
        <Card.Body className="d-flex flex-column justify-content-between">
          <div>
            {/* Skeleton para el Ícono + Título */}
            <div className="d-flex align-items-center gap-2 mb-2">
              {/* Círculo simulando el icono */}
              <Placeholder
                animation="glow"
                style={{ width: "28px", height: "28px" }}
              >
                <Placeholder xs={12} className="h-100 rounded-circle" />
              </Placeholder>
              {/* Texto simulando el título */}
              <Placeholder animation="glow" className="flex-grow-1">
                <Placeholder xs={7} className="py-2 rounded" />
              </Placeholder>
            </div>

            {/* Skeleton para la Descripción (2 líneas) */}
            <Placeholder animation="glow" className="mb-3">
              <Placeholder xs={12} className="mb-1 rounded" />
              <Placeholder xs={9} className="rounded" />
            </Placeholder>
          </div>

          {/* Skeleton para el Botón */}
          <div>
            <Placeholder animation="glow">
              <Placeholder xs={4} className="py-3 rounded" />
            </Placeholder>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default DashboardCardSkeleton;

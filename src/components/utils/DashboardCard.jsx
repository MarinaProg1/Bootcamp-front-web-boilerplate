import { Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Eye } from "react-bootstrap-icons";

const DashboardCard = ({
  title,
  description,
  to,
  buttonText,
  borderColor = "#0d6efd",
  icon, // 1. Agregamos la prop 'icon'
}) => {
  return (
    <Col md={6}>
      <Card
        className="h-100 shadow-sm"
        style={{
          border: "none",
          borderLeft: `5px solid ${borderColor}`,
          background: "#c9c9c9",
        }}
      >
        <Card.Body className="d-flex flex-column justify-content-between">
          <div>
            {/* 2. Alineamos el icono y el título en la misma línea */}
            <div className="d-flex align-items-center gap-2 mb-2">
              {icon && <span>{icon}</span>}
              <Card.Title className="h5 fw-bold mb-0">{title}</Card.Title>
            </div>

            <Card.Subtitle className="mb-3 text-muted">
              {description}
            </Card.Subtitle>
          </div>
          <div>
            <Button
              as={Link}
              to={to}
              variant="primary"
              className="flex-grow-1"
              size="sm"
            >
              <Eye size={16} /> {buttonText}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default DashboardCard;

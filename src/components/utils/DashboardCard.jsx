import { Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const DashboardCard = ({
  title,
  description,
  to,
  buttonText,
  borderColor = "#0d6efd",
}) => {
  return (
    <Col md={6}>
      <Card
        className="h-100 shadow-sm bg-secondary-subtle"
        style={{
          border: "none",
          borderLeft: `5px solid ${borderColor}`,
        }}
      >
        <Card.Body className="d-flex flex-column justify-content-between">
          <div>
            <Card.Title className="h5 fw-bold">{title}</Card.Title>
            <Card.Subtitle className="mb-3 text-muted">
              {description}
            </Card.Subtitle>
          </div>
          <div>
            <Button as={Link} to={to} variant="primary" size="sm">
              {buttonText}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default DashboardCard;

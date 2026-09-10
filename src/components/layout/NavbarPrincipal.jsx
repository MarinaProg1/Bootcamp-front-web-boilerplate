import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { BoxArrowRight, PersonBadge } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const NavbarPrincipal = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Sesión cerrada correctamente");
    navigate("/login");
  };
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Salita Municipal
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/nuevo-paciente">
              Registrar Paciente
            </Nav.Link>
            <Nav.Link as={Link} to="/medicos/lista">
              <PersonBadge size={16} /> Médicos
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Button
              variant="outline-light"
              size="sm"
              className="d-flex align-items-center gap-2"
              onClick={handleLogout}
            >
              <BoxArrowRight size={18} />
              Cerrar Sesión
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarPrincipal;

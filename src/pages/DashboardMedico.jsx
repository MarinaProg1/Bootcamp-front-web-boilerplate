import { Container, Row } from "react-bootstrap";
import DashboardCard from "../components/utils/DashboardCard";

const DashboardMedico = () => {
  return (
    <Container className="py-4">
      <h2 className="mb-4">Panel de Control</h2>
      <Row className="g-4">
        {/* Gestión de Médicos */}
        <DashboardCard
          title="Gestión de Médicos"
          description="Administra el personal médico registrado, da de alta nuevos profesionales o edita sus datos."
          to="/medicos/lista"
          buttonText="Ver Médicos"
          borderColor="#0d6efd"
        />

        {/* Gestión de Pacientes */}
        <DashboardCard
          title="Gestión de Pacientes"
          description="Revisa las historias clínicas y administra la lista de pacientes de la salita."
          to="#"
          buttonText="Ver Pacientes"
          borderColor="#198754"
        />

        {/* Gestión de Obras Sociales */}
        <DashboardCard
          title="Gestión de Obras Sociales"
          description="Administra las obras sociales y prepagas aceptadas, planes y convenios activos."
          to="#"
          buttonText="Ver Obras Sociales"
          borderColor="#ffc107"
        />

        {/* Historial Médico */}
        <DashboardCard
          title="Historial Médico"
          description="Consulta diagnósticos, antecedentes, tratamientos y registros clínicos de los pacientes."
          to="#"
          buttonText="Ver Historiales"
          borderColor="#0dcaf0"
        />
      </Row>
    </Container>
  );
};

export default DashboardMedico;

import { Container, Row } from "react-bootstrap";
import {
  Speedometer2,
  PersonBadge,
  People,
  Building,
  JournalMedical,
} from "react-bootstrap-icons";
import DashboardCard from "../components/utils/DashboardCard";
import DashboardCardSkeleton from "../components/utils/DashboardCardSkeleton";

const DashboardMedico = ({ isLoading = false }) => {
  if (isLoading) {
    return (
      <Container className="py-4">
        <h2 className="mb-4 d-flex align-items-center gap-2">
          <Speedometer2 size={40} className="text-primary" />
          Panel de Control
        </h2>
        <Row className="g-4">
          {[...Array(4)].map((_, index) => (
            <DashboardCardSkeleton key={index} />
          ))}
        </Row>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h2 className="mb-4 d-flex align-items-center gap-2">
        <Speedometer2 size={40} className="text-primary" />
        Panel de Control
      </h2>

      <Row className="g-4">
        <DashboardCard
          title="Gestión de Médicos"
          description="Administra el personal médico registrado, da de alta nuevos profesionales o edita sus datos."
          to="/medicos/lista"
          buttonText="Ver Médicos"
          borderColor="#0d6efd"
          icon={<PersonBadge size={28} className="text-primary" />}
        />
        <DashboardCard
          title="Gestión de Pacientes"
          description="Revisa las historias clínicas y administra la lista de pacientes de la salita."
          to="#"
          buttonText="Ver Pacientes"
          borderColor="#198754"
          icon={<People size={28} className="text-success" />}
        />
        <DashboardCard
          title="Gestión de Obras Sociales"
          description="Administra las obras sociales y prepagas aceptadas, planes y convenios activos."
          to="#"
          buttonText="Ver Obras Sociales"
          borderColor="#ffc107"
          icon={<Building size={28} className="text-warning" />}
        />
        <DashboardCard
          title="Historial Médico"
          description="Consulta diagnósticos, antecedentes, tratamientos y registros clínicos de los pacientes."
          to="#"
          buttonText="Ver Historiales"
          borderColor="#0dcaf0"
          icon={<JournalMedical size={28} className="text-info" />}
        />
      </Row>
    </Container>
  );
};

export default DashboardMedico;

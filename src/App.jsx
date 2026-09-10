import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import DashboardRecepcion from "./pages/DashboardRecepcion";
import FormularioPaciente from "./components/pacientes/FormularioPaciente";
import LayoutPrincipal from "./components/layout/LayoutPrincipal";
import DetalleTurno from "./components/turnos/DetalleTurno";
import MedicosList from "./components/medicos/MedicosList";
import DashboardMedico from "./pages/DashboardMedico";
import DetalleMedico from "./components/medicos/DetalleMedico";
import FormularioMedico from "./components/medicos/FormularioMedico";

import NotFound from "./components/utils/NotFound";
import { Login } from "./components/login/Login";

const RutaProtegida = () => {
  const token = localStorage.getItem("token");

  return token ? <LayoutPrincipal /> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <>
      <Toaster position="top-right" richColors />

      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/medicos/nuevo" element={<FormularioMedico />} />
        <Route element={<RutaProtegida />}>
          <Route path="/dashboard" element={<DashboardRecepcion />} />
          <Route path="nuevo-paciente" element={<FormularioPaciente />} />
          <Route path="turno-detalle/:id" element={<DetalleTurno />} />
          <Route path="medicos" element={<DashboardMedico />} />
          <Route path="medicos/lista" element={<MedicosList />} />
          <Route path="medicos/:id" element={<DetalleMedico />} />
          <Route path="/medicos/nuevo" element={<FormularioMedico />} />
          <Route path="/medicos/editar/:id" element={<FormularioMedico />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import DashboardRecepcion from "./pages/DashboardRecepcion";
import FormularioPaciente from "./components/pacientes/FormularioPaciente";
import LayoutPrincipal from "./components/layout/LayoutPrincipal";
import DetalleTurno from "./components/turnos/DetalleTurno";
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
        <Route element={<RutaProtegida />}>
          <Route path="/dashboard" element={<DashboardRecepcion />} />
          <Route path="nuevo-paciente" element={<FormularioPaciente />} />
          <Route path="turno-detalle/:id" element={<DetalleTurno />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

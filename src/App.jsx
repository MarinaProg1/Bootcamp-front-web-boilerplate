import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { Navigate } from "react-router-dom";
import DashboardRecepcion from "./pages/DashboardRecepcion";
import FormularioPaciente from "./components/pacientes/FormularioPaciente";
import LayoutPrincipal from "./components/layout/LayoutPrincipal";
import DetalleTurno from "./components/turnos/DetalleTurno";
import NotFound from "./components/utils/NotFound";
import { Login } from "./components/login/Login";

function App() {
  return (
    <>
      <Toaster position="top-right" richColors />

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route element={<LayoutPrincipal />}>
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

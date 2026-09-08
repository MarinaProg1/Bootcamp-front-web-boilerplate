import { Link } from "react-router-dom";
import { Container, Table, Button } from "react-bootstrap";
import { useFetch } from "../../hooks/useFetch";
import clientesAxios from "../../config/axios";
import { toast } from "sonner";

import ListSkeleton from "../utils/ListSkeleton";

const MedicosList = () => {
  const {
    data: medicos,
    setData: setMedicos,
    isLoading,
  } = useFetch("/medicos");

  // Borrado lógico
  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de desactivar este médico?")) {
      try {
        const res = await clientesAxios.delete(`/medicos/${id}`);
        if (res.data.exito) {
          toast.success("Médico eliminado correctamente");
          setMedicos(
            medicos.filter((medico) => (medico._id || medico.id) !== id),
          );
        }
      } catch (error) {
        toast.error("Error al eliminar el médico");
        console.error(error);
      }
    }
  };

  if (isLoading) {
    return <ListSkeleton rows={5} />;
  }

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Listado de Médicos</h2>
        <Button
          as={Link}
          to="/medicos/nuevo"
          variant="primary"
          style={{ border: "1px solid #c9c9c9" }}
        >
          + Registrar Médico
        </Button>
      </div>

      {/* Tabla con separación entre filas */}
      <Table
        responsive
        className="align-middle mb-0"
        style={{
          borderCollapse: "separate",
          borderSpacing: "0 12px",
        }}
      >
        <thead>
          <tr className="text-muted border-0">
            <th className="border-0 ps-4">Nombre y Apellido</th>
            <th className="border-0">Especialidad</th>
            <th className="border-0 text-end pe-4">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {medicos && medicos.length > 0 ? (
            medicos.map((medico) => {
              const medicoId = medico._id || medico.id;
              return (
                <tr
                  key={medicoId}
                  className="shadow-sm bg-white"
                  style={{ borderRadius: "8px" }}
                >
                  {/* Primera celda: bordes redondeados a la izquierda y borde de acento */}
                  <td
                    className="fw-semibold ps-4 py-3 border-0"
                    style={{
                      borderTopLeftRadius: "8px",
                      borderBottomLeftRadius: "8px",
                      borderLeft: "5px solid #0d6efd",
                    }}
                  >
                    {medico.nombre} {medico.apellido}
                  </td>

                  {/* Celda central */}
                  <td className="text-muted py-3 border-0">
                    {Array.isArray(medico.especialidad)
                      ? medico.especialidad.map((e) => e.nombre || e).join(", ")
                      : medico.especialidad?.nombre ||
                        medico.especialidad ||
                        "Sin especialidad"}
                  </td>

                  {/* Última celda: bordes redondeados a la derecha */}
                  <td
                    className="text-end pe-4 py-3 border-0"
                    style={{
                      borderTopRightRadius: "8px",
                      borderBottomRightRadius: "8px",
                    }}
                  >
                    <div className="d-inline-flex gap-2">
                      <Button
                        as={Link}
                        to={`/medicos/${medicoId}`}
                        variant="primary"
                        size="sm"
                        style={{ border: "1px solid #c9c9c9" }}
                      >
                        Ver Detalle
                      </Button>
                      <Button
                        as={Link}
                        to={`/medicos/editar/${medicoId}`}
                        variant="success"
                        size="sm"
                        style={{ border: "1px solid #c9c9c9" }}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(medicoId)}
                      >
                        Eliminar
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td
                colSpan="3"
                className="text-center py-4 text-muted bg-white shadow-sm"
                style={{ borderRadius: "8px" }}
              >
                No hay médicos registrados o activos.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default MedicosList;

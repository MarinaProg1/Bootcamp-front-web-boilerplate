import { useState } from "react";
import { Link } from "react-router-dom";
import {
  PersonBadge,
  PlusLg,
  Eye,
  PencilSquare,
  Trash,
} from "react-bootstrap-icons";
import { Container, Table, Button, Modal } from "react-bootstrap";
import { useFetch } from "../../hooks/useFetch";
import clientesAxios from "../../config/axios";
import { toast } from "sonner";
import BuscadorTurnos from "../../components/turnos/BuscadorTurnos";

import ListSkeleton from "../utils/ListSkeleton";

const MedicosList = () => {
  const {
    data: medicos,
    setData: setMedicos,
    isLoading,
  } = useFetch("/medicos");
  const [busqueda, setBusqueda] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [medicoAEliminar, setMedicoAEliminar] = useState(null);

  const medicosFiltrados = (medicos || []).filter((medico) => {
    const termino = busqueda.toLowerCase().trim();
    const nombreCompleto =
      `${medico.nombre || ""} ${medico.apellido || ""}`.toLowerCase();

    const especialidades = Array.isArray(medico.especialidad)
      ? medico.especialidad
          .map((e) => e.nombre || e)
          .join(" ")
          .toLowerCase()
      : (
          medico.especialidad?.nombre ||
          medico.especialidad ||
          ""
        ).toLowerCase();

    return nombreCompleto.includes(termino) || especialidades.includes(termino);
  });

  const handleOpenModal = (id) => {
    setMedicoAEliminar(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setMedicoAEliminar(null);
  };

  const handleConfirmDelete = async () => {
    if (!medicoAEliminar) return;

    try {
      const res = await clientesAxios.delete(`/medicos/${medicoAEliminar}`);
      if (res.data.exito) {
        toast.success("Médico desactivado correctamente");
        setMedicos(
          medicos.filter(
            (medico) => (medico._id || medico.id) !== medicoAEliminar,
          ),
        );
      }
    } catch (error) {
      toast.error("Error al eliminar el médico");
      console.error(error);
    } finally {
      handleCloseModal();
    }
  };

  if (isLoading) {
    return <ListSkeleton rows={5} />;
  }

  return (
    <Container className="py-4">
      <BuscadorTurnos valor={busqueda} alCambiar={setBusqueda} />
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="d-flex align-items-center gap-2">
          <PersonBadge size={32} />
          Listado de Médicos
        </h3>
        <Button
          as={Link}
          to="/medicos/nuevo"
          variant="primary"
          className="d-inline-flex align-items-center gap-2"
          style={{ border: "1px solid #c9c9c9" }}
        >
          <PlusLg size={18} /> Registrar Médico
        </Button>
      </div>

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
          {/* 2. Cambiamos 'medicos' por 'medicosFiltrados' */}
          {medicosFiltrados && medicosFiltrados.length > 0 ? (
            medicosFiltrados.map((medico) => {
              const medicoId = medico._id || medico.id;
              return (
                <tr
                  key={medicoId}
                  className="shadow-sm bg-white"
                  style={{ borderRadius: "8px" }}
                >
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

                  <td className="text-muted py-3 border-0">
                    {Array.isArray(medico.especialidad)
                      ? medico.especialidad.map((e) => e.nombre || e).join(", ")
                      : medico.especialidad?.nombre ||
                        medico.especialidad ||
                        "Sin especialidad"}
                  </td>

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
                        variant="outline-info"
                        className="d-inline-flex align-items-center gap-1"
                        size="sm"
                      >
                        <Eye size={16} /> Ver Detalle
                      </Button>
                      <Button
                        as={Link}
                        to={`/medicos/editar/${medicoId}`}
                        variant="outline-success"
                        className="d-inline-flex align-items-center gap-1"
                        size="sm"
                        style={{ border: "1px solid #c9c9c9" }}
                      >
                        <PencilSquare size={16} /> Editar
                      </Button>
                      <Button
                        variant="outline-danger"
                        className="d-inline-flex align-items-center gap-1"
                        size="sm"
                        onClick={() => handleOpenModal(medicoId)}
                      >
                        <Trash size={16} /> Eliminar
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
                No se encontraron médicos que coincidan con la búsqueda.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Modal de confirmación */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title className="h5">Confirmar desactivación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas desactivar a este médico del sistema?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Sí, desactivar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default MedicosList;

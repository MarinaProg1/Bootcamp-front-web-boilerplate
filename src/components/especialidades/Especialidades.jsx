// src/components/especialidades/Especialidades.jsx
import { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form, Card, Stack } from 'react-bootstrap';
import { toast } from 'sonner'; 

const Especialidades = () => {
    const [especialidades, setEspecialidades] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Estados para los modales (Crear/Editar y Ver Detalle)
    const [showModal, setShowModal] = useState(false);
    const [showDetalle, setShowDetalle] = useState(false);
    const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    // Estado del formulario
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');

    //(GET)
    const cargarEspecialidades = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/v1/especialidades');
            const data = await response.json();
            if (data.success) {
                setEspecialidades(data.data || data);
            }
        } catch (error) {
            toast.error('Error al cargar las especialidades');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarEspecialidades();
    }, []);

    //(POST / PUT)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = isEditing 
                ? `http://localhost:3000/api/v1/especialidades/${especialidadSeleccionada.id || especialidadSeleccionada._id}`
                : 'http://localhost:3000/api/v1/especialidades';
            
            const method = isEditing ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre, descripcion })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Error en la operación');

            toast.success(isEditing ? '¡Especialidad actualizada!' : '¡Especialidad creada con éxito!');
            setShowModal(false);
            limpiarFormulario();
            cargarEspecialidades();
        } catch (error) {
            toast.error(error.message);
        }
    };

    //(DELETE)
    const handleEliminar = async (id) => {
        if (!window.confirm('¿Estás seguro de eliminar esta especialidad?')) return;

        try {
            const response = await fetch(`http://localhost:3000/api/v1/especialidades/${id}`, {
                method: 'DELETE'
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'No se pudo eliminar');

            toast.success('Especialidad eliminada');
            cargarEspecialidades();
        } catch (error) {
            toast.error(error.message);
        }
    };

    // Preparar modal para Editar
    const abrirModalEditar = (esp) => {
        setIsEditing(true);
        setEspecialidadSeleccionada(esp);
        setNombre(esp.nombre || '');
        setDescripcion(esp.descripcion || '');
        setShowModal(true);
    };

    // Preparar modal para Ver Detalle
    const abrirModalDetalle = (esp) => {
        setEspecialidadSeleccionada(esp);
        setShowDetalle(true);
    };

    const limpiarFormulario = () => {
        setIsEditing(false);
        setEspecialidadSeleccionada(null);
        setNombre('');
        setDescripcion('');
    };

    return (
        <Container className="py-4">
            <Stack direction="horizontal" className="justify-content-between align-items-center mb-4">
                <h2>Gestión de Especialidades</h2>
                <Button variant="primary" onClick={() => { limpiarFormulario(); setShowModal(true); }}>
                    ➕ Nueva Especialidad
                </Button>
            </Stack>

            {loading ? (
                <p>Cargando especialidades...</p>
            ) : (
                <Table striped bordered hover responsive className="shadow-sm">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th className="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {especialidades.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="text-center text-muted">No hay especialidades registradas.</td>
                            </tr>
                        ) : (
                            especialidades.map((esp) => (
                                <tr key={esp.id || esp._id}>
                                    <td className="fw-semibold">{esp.nombre}</td>
                                    <td>{esp.descripcion || 'Sin descripción'}</td>
                                    <td className="text-center">
                                        <Button variant="info" size="sm" className="me-2 text-white" onClick={() => abrirModalDetalle(esp)}>
                                            Ver
                                        </Button>
                                        <Button variant="warning" size="sm" className="me-2 text-white" onClick={() => abrirModalEditar(esp)}>
                                            Editar
                                        </Button>
                                        <Button variant="danger" size="sm" onClick={() => handleEliminar(esp.id || esp._id)}>
                                            Eliminar
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            )}

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditing ? 'Editar Especialidad' : 'Nueva Especialidad'}</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre de la Especialidad *</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={nombre} 
                                onChange={(e) => setNombre(e.target.value)} 
                                required 
                                placeholder="Ej: Cardiología" 
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={3} 
                                value={descripcion} 
                                onChange={(e) => setDescripcion(e.target.value)} 
                                placeholder="Breve detalle..." 
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
                        <Button variant="success" type="submit">{isEditing ? 'Guardar Cambios' : 'Crear'}</Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            <Modal show={showDetalle} onHide={() => setShowDetalle(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Detalle de Especialidad</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {especialidadSeleccionada && (
                        <Card className="border-0">
                            <Card.Body>
                                <p><strong>ID:</strong> {especialidadSeleccionada.id || especialidadSeleccionada._id}</p>
                                <p><strong>Nombre:</strong> {especialidadSeleccionada.nombre}</p>
                                <p><strong>Descripción:</strong> {especialidadSeleccionada.descripcion || 'Sin descripción'}</p>
                            </Card.Body>
                        </Card>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDetalle(false)}>Cerrar</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Especialidades;
import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { Container, Row } from "react-bootstrap";
import { toast } from 'sonner';
import clientesAxios from "../config/axios";

import BuscadorTurnos from "../components/turnos/BuscadorTurnos";
import TurnoCard from "../components/turnos/TurnoCard";
import TurnoCardSkeleton from "../components/turnos/TurnoCardSkeleton";

const DashboardRecepcion = () => {
    const [busqueda, setBusqueda] = useState("");
    const { response: response, data: turnos, setData: setTurnos, isLoading } = useFetch('/turnos');

    const turnosFiltrados = turnos.filter(turno =>
        (turno.paciente?.nombre ?? "Paciente sin asignar").toLocaleLowerCase().includes(busqueda.toLocaleLowerCase())
    );

    const marcarComoAtendido = async (idTurno) => {
        try {
            await clientesAxios.patch(`/turnos/${idTurno}`);

            const turnosActualizados = turnos.map(turno => {
                if (turno.id === idTurno) return { ...turno, estado: "atendido"};
                return turno;
            });
            setTurnos(turnosActualizados);

        } catch (error) {
            console.error(error);
            toast.error("Error de red.");
        }
    };

    const eliminarTurno = async (idTurno) => {
    const confirmar = window.confirm(
        "¿Está seguro de que desea eliminar este turno?"
    );

    if (!confirmar) {
        return;
    }

    try {
        await clientesAxios.delete(`/turnos/${idTurno}`);

        setTurnos((turnosActuales) =>
            turnosActuales.filter(
                (turno) => turno.id !== idTurno
            )
        );

        toast.success("Turno eliminado correctamente.");

    } catch (error) {
        console.error("Error al eliminar el turno:", error);
        toast.error("No se pudo eliminar el turno.");
    }
};

    return (
        <Container className="mt-4">
            <h2 className="mb-4">Turnos del Día total: {response.total} </h2>

            <BuscadorTurnos valor={busqueda} alCambiar={setBusqueda} />

            <Row>
                {isLoading ? (
                    [1, 2, 3].map(item => <TurnoCardSkeleton key={item} />) 
                 ) : turnos.length === 0 ? (
                    <p>No se encontraron turnos pendientes.</p>
                ) : 
                turnosFiltrados.map((turno) => (
                    <TurnoCard
                        key={turno.id}
                        turno={turno}
                        onAtender={marcarComoAtendido}
                        onEliminar={eliminarTurno}
                    />
                ))}
            </Row>
        </Container>
    );
};

export default DashboardRecepcion;
import { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import axios from "axios";

const BusquedaPaciente = ({ onResultados }) => {
    const [busqueda, setBusqueda] = useState("");
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);

    const buscarPaciente = async (e) => {
        e.preventDefault();

        const valor = busqueda.trim();

        if (!valor) {
            setError("Ingrese un DNI o un ID.");
            return;
        }

        try {
            setCargando(true);
            setError(null);

            const esDni = /^[0-9]{7,8}$/.test(valor);

            const parametro = esDni
                ? `dni=${valor}`
                : `id=${encodeURIComponent(valor)}`;

            const respuesta = await axios.get(
                `http://localhost:3000/api/v1/pacientes?${parametro}`
            );

            onResultados(respuesta.data.data);

        } catch (error) {
            console.error("Error al buscar paciente:", error);
            setError("No se pudo realizar la búsqueda.");
        } finally {
            setCargando(false);
        }
    };

    const limpiarBusqueda = () => {
        setBusqueda("");
        setError(null);
        onResultados(null);
    };

    return (
        <div className="mb-4">

            <Form onSubmit={buscarPaciente}>

                <InputGroup>

                    <Form.Control
                        type="text"
                        placeholder="Buscar paciente por DNI o ID..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />

                    <Button
                        type="submit"
                        variant="primary"
                        disabled={cargando}
                    >
                        {cargando ? "Buscando..." : "Buscar"}
                    </Button>

                    <Button
                        type="button"
                        variant="outline-secondary"
                        onClick={limpiarBusqueda}
                    >
                        Limpiar
                    </Button>

                </InputGroup>

            </Form>

            {error && (
                <div className="text-danger small mt-2">
                    {error}
                </div>
            )}

        </div>
    );
};

export default BusquedaPaciente;
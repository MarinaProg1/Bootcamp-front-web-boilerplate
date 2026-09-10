import { useState, useEffect} from "react";

export default function VerConsultorios() {
    const [consultorios, setConsultorios] = useState([]);

    useEffect(() => {
        setConsultorios([
            {id: 1, nombre: "consultorio1", ubicacion: "piso1", estado: "disponible"},
            {id: 2, nombre: "consultorio2", ubicacion: "piso2", estado: "ocupado"}
        ]);
    }, []);

    return (
        <div className="p-6">
                    <h1 className="text-2xl font-bold mb-4">Consultorios</h1>
            <table className="w-full bg-white shadow rounded">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-3">Nombre</th><th className="p-3">Ubicacion</th><th className="p-3">Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {consultorios.map((consultorio) => (
                        <tr key={consultorio.id}>
                            <td className="p-3 border-b">{consultorio.nombre}</td>
                            <td className="p-3 border-b">{consultorio.ubicacion}</td>
                            <td className="p-3 border-b">{consultorio.estado}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
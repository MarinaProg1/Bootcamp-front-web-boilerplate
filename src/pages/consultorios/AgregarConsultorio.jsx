import { useState } from "react";

export default function AgregarConsultorio() {
    const [form, setForm] = useState ({nombre: "", ubicacion: "", estado: "disponible"});

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Guardado:", form);
        alert("Consultorio agregado: " + from.nombre);
    };
    return (
        <div className="p-6 max-w-md">
            <h1 className="text-2xl font-bold mb-4">Agregar Consultorio</h1>
            <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded flex flex-col gap-3">
                    <input className="border p-2 rounded"  placeholder="Nombre" value={form.nombre} onChange={(e) => setForm({...form, nombre: e.target.value})} required />
                    <input className="border p-2 rounded"  placeholder="Ubicación / piso" value={form.ubicacion} onChange={(e) => setForm({...form, ubicacion: e.target.value})} required />

                    <select className="border p-2 rounded" value={form.estado} onChange={(e) => setForm({...form, estado: e.target.value})}>
                        <option value="disponible">Disponible</option>
                        <option value="ocupado">Ocupado</option>
                        <option value="mantenimiento">Mantenimiento</option>
                    </select>

                    <button className="bg-blue-600 text-white p-2 rounded">Guardar</button>
            </form>
        </div>
    );
} 
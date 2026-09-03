import { useState } from "react";
import { useNavigate } from "react-router-dom";
import clientesAxios from "../../config/axios";
import { validarDatos } from "../utils/validaciones";
import style from "./login.module.scss";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const reglasLogin = {
    email: (valor) => (valor.trim() === "" ? "El email es obligatorio." : null),
    password: (valor) =>
      valor.trim() === "" ? "La contraseña es obligatoria." : null,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevosErrores = validarDatos({ email, password }, reglasLogin);
    setError(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) {
      setError("Por favor, complete todos los campos requeridos.");
      return;
    }

    try {
      const respuesta = await clientesAxios.post("/auth/login", {
        email: email,
        password: password,
      });

      if (respuesta.data.data) {
        const token = respuesta.data.data?.token;

        localStorage.setItem("token", token);
        navigate("/dashboard");
      } else {
        setError(respuesta.data.mensaje || "Credenciales incorrectas");
      }
    } catch (error) {
      console.log(error);

      setError(error.response?.data?.mensaje || "Error al iniciar sesión");
    }
  };

  return (
    <div className={style.pantallaLogin}>
      <div className={style.contenedorFormulario}>
        <h2>Iniciar Sesión</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input
            className={style.campoInput}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Contraseña:</label>
          <input
            className={style.campoInput}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Ingresar</button>
        </form>
      </div>
    </div>
  );
};

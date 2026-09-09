import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { PersonSquare } from "react-bootstrap-icons";
import { toast } from "sonner";
import Logo from "../../assets/logo1.svg";

import clientesAxios from "../../config/axios";
import { validarDatos } from "../utils/validaciones";
import style from "./login.module.scss";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const reglasLogin = {
    email: (valor) => (valor.trim() === "" ? "El email es obligatorio." : null),
    password: (valor) =>
      valor.trim() === "" ? "La contraseña es obligatoria." : null,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevosErrores = validarDatos({ email, password }, reglasLogin);

    if (Object.keys(nuevosErrores).length > 0) {
      toast.error("Por favor, complete todos los campos requeridos.");
      return;
    }

    try {
      const respuesta = await clientesAxios.post("/auth/login", {
        email,
        password,
      });

      const token = respuesta.data?.token || respuesta.data?.data?.token;

      if (token) {
        localStorage.setItem("token", token);
        toast.success("¡Inicio de sesión exitoso!");
        navigate("/dashboard");
      } else {
        toast.error(respuesta.data?.message || respuesta.data?.mensaje || "Credenciales incorrectas");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.response?.data?.mensaje || "Error al iniciar sesión");
    }
  };

  return (
    <div className={style.bodyLogin}>
      <div className={style.cardLogin}>
        <div className={style.contenedorFormulario}>
          <PersonSquare color="#1d58ee" size={40} />
          <h2>Iniciar Sesión</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              className={style.campoInput}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="password">Contraseña:</label>
            <input
              id="password"
              className={style.campoInput}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Ingresar</button>
          </form>
        </div>
        <div className={style.welcome}>
          <img src={Logo} alt="Logo" />
          <h4>Bienvenido !!!</h4>
          <p>
            ¿No tienes una cuenta? <Link to="/nuevo-paciente">Regístrate</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

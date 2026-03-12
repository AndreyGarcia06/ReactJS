import "./Login.css";
import { useState } from "react";
import api from "./Services/api";
import { useAuth } from "./AuthContext";


function Login({cambiarVista}) {
    const {login} = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const crearTokenSimulado = () => {
        return btoa(`${username || "usuario"}:${Date.now()}`);
    };

    const manejarAcceso = async (e) => {
        e.preventDefault();

        try {
            const usuariosResponse = await api.get("/users");
            const usuarioValido = usuariosResponse.data.some(
                (usuario) => usuario.username === username && usuario.password === password
            );

            if (!usuarioValido) {
                alert("Credenciales inválidas");
                return;
            }
        } catch (error) {
            console.error("Error al validar usuarios:", error);
            alert("No se pudo validar el usuario");
            return;
        }

        try {
            const response = await api.post("/auth/login", {
                username,
                password,
            });

            const token = response?.data?.token || crearTokenSimulado();
            console.log("Token generado:", token);
            login(token);
            alert("Bienvenido");
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            const token = crearTokenSimulado();
            console.log("Token generado:", token);
            login(token);
            alert("Bienvenido");
        }
    };

    return (
        <div className="loginDiv">
            <h2>Login</h2>
            <form className="loginFormulario" onSubmit={manejarAcceso}>
                <div className="campoFormulario">
                    <label>Usuario:</label>
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Ingresa tu usuario"
                        required
                    />
                </div>

                <div className="campoFormulario">
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Ingresa tu contraseña"
                        required
                    />
                </div>

                <button type="submit" className="btnRegistro">Registrar</button>

                <div className="loginAcciones">
                    <button type="button" className="btnLoginSecundario" onClick={() => cambiarVista && cambiarVista("RegistrarUsuario")}>Crear cuenta</button>
                    <button type="button" className="btnLoginSecundario">Recuperar contraseña</button>
                </div>
            </form>
        </div>
    );
}

export default Login;
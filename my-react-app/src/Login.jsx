import "./Login.css";
import { useState } from "react";
import api from "./Services/api";
import { useAuth } from "./AuthContext";


function Login({cambiarVista}) {
    const {login} = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const crearTokenSimulado = () => {
        return btoa(`${email || "usuario"}:${Date.now()}`);
    };

    const manejarAcceso = async (e) => {
        e.preventDefault();

        let usuarios = [];

        try {
            let usuariosResponse;
            try {
                usuariosResponse = await api.get("/usuarios");
            } catch {
                usuariosResponse = await api.get("/users");
            }

            usuarios = Array.isArray(usuariosResponse.data) ? usuariosResponse.data : [];

            const usuarioValido = usuarios.some(
                (usuario) => usuario.email === email && usuario.password === password
            );

            if (!usuarioValido) {
                alert("Credenciales inválidas");
                return;
            }
        } catch (error) {
            console.error("Error al validar usuarios:", error);
            alert("No se pudo conectar con la API. Revisa que el backend esté corriendo.");
            return;
        }

        try {
            const response = await api.post("/usuarios/login", {
                email,
                password,
            });

            const token = response?.data?.token || crearTokenSimulado();
            console.log("Token generado:", token);
            login(token);
            alert("Bienvenido");
        } catch (error) {
            try {
                const response = await api.post("/auth/login", {
                    email,
                    password,
                });
                const token = response?.data?.token || crearTokenSimulado();
                console.log("Token generado:", token);
                login(token);
                alert("Bienvenido");
                return;
            } catch {
                console.error("Error al iniciar sesión:", error);
            }

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
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Ingresa tu email"
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

                <button type="submit" className="btnRegistro">Iniciar sesión</button>

                <div className="loginAcciones">
                    <button type="button" className="btnLoginSecundario" onClick={() => cambiarVista && cambiarVista("RegistrarUsuario")}>Crear cuenta</button>
                    <button type="button" className="btnLoginSecundario">Recuperar contraseña</button>
                </div>
            </form>
        </div>
    );
}

export default Login;
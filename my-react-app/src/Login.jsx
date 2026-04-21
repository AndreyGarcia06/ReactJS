import "./Login.css";
import { useState } from "react";
import api from "./Services/api";
import { useAuth } from "./AuthContext";

const decodeToken = (token) => {
    if (!token) return null;
    try {
        const payload = token.split('.')[1];
        if (!payload) return null;
        const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
        const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=');
        return JSON.parse(atob(padded));
    } catch {
        return null;
    }
};

function Login({cambiarVista}) {
    const {login} = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [modo, setModo] = useState('login');
    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [registroEmail, setRegistroEmail] = useState('');
    const [registroPassword, setRegistroPassword] = useState('');

    const manejarAcceso = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/usuarios/login", {
                email,
                password,
            });

            const token = response?.data?.token;
            if (!token) {
                alert("No se pudo iniciar sesión");
                return;
            }

            login(token);
            alert("Bienvenido");
            const payload = decodeToken(token);
            if (cambiarVista) {
                cambiarVista(payload?.rol === 'admin' ? "Productos" : "Carrito");
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            alert("Credenciales inválidas o backend no disponible");
        }
    };

    const manejarRegistro = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('/usuarios/registro', {
                nombre,
                direccion,
                telefono,
                email: registroEmail,
                password: registroPassword,
                fecha_registro: new Date().toISOString(),
            });

            const token = response?.data?.token;
            if (token) {
                login(token);
            }

            alert('Cuenta creada. Ya puedes iniciar sesión.');
            setModo('login');
            setNombre('');
            setDireccion('');
            setTelefono('');
            setRegistroEmail('');
            setRegistroPassword('');
            if (cambiarVista) {
                cambiarVista('Carrito');
            }
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            alert(error?.response?.data?.mensaje || 'No se pudo crear la cuenta');
        }
    };

    return (
        <div className="loginDiv">
            <h2>{modo === 'login' ? 'Login' : 'Crear cuenta'}</h2>
            {modo === 'login' ? (
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
                        <button type="button" className="btnLoginSecundario" onClick={() => setModo('registro')}>Crear cuenta cliente</button>
                        <button type="button" className="btnLoginSecundario">Recuperar contraseña</button>
                    </div>
                </form>
            ) : (
                <form className="loginFormulario" onSubmit={manejarRegistro}>
                    <div className="campoFormulario">
                        <label>Nombre:</label>
                        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                    </div>
                    <div className="campoFormulario">
                        <label>Dirección:</label>
                        <input type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} required />
                    </div>
                    <div className="campoFormulario">
                        <label>Teléfono:</label>
                        <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
                    </div>
                    <div className="campoFormulario">
                        <label>Email:</label>
                        <input type="email" value={registroEmail} onChange={(e) => setRegistroEmail(e.target.value)} required />
                    </div>
                    <div className="campoFormulario">
                        <label>Contraseña:</label>
                        <input type="password" value={registroPassword} onChange={(e) => setRegistroPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="btnRegistro">Registrar cliente</button>
                    <div className="loginAcciones">
                        <button type="button" className="btnLoginSecundario" onClick={() => setModo('login')}>Volver al login</button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default Login;
import { useEffect, useState } from 'react';
import './RegistrarUsuario.css';
import api from './Services/api'
import { useAuth } from './AuthContext';

function RegistrarUsuario({usuarioEditado, limpiarSeleccion, onActualizacionExitosa}) {
    const { isAdmin } = useAuth();

    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rol, setRol] = useState('cliente');

    useEffect(() => {
        if (usuarioEditado) {
            const nombreDesdeName = `${usuarioEditado?.name?.firstname || ''} ${usuarioEditado?.name?.lastname || ''}`.trim();
            const direccionDesdeAddress = [
                usuarioEditado?.address?.street,
                usuarioEditado?.address?.number,
                usuarioEditado?.address?.city,
            ].filter(Boolean).join(', ');

            setNombre(usuarioEditado.nombre || nombreDesdeName || usuarioEditado.username || '');
            setDireccion(usuarioEditado.direccion || direccionDesdeAddress || '');
            setTelefono(usuarioEditado.telefono || usuarioEditado.phone || '');
            setEmail(usuarioEditado.email || '');
            setPassword(usuarioEditado.password || '');
            setRol(usuarioEditado.rol || usuarioEditado.role || 'cliente');
        } else {
            resetForm();
        }
    }, [usuarioEditado]);
    
    const resetForm = () => {
        setNombre('');
        setDireccion('');
        setTelefono('');
        setEmail('');
        setPassword('');
        setRol('cliente');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const nuevoUsuario = {
            nombre,
            direccion,
            telefono,
            email,
            password,
            rol,
            fecha_registro: usuarioEditado?.fecha_registro || usuarioEditado?.fechaRegistro || new Date().toISOString(),
        };

        try {
            if (usuarioEditado) {
                let response;
                try {
                    response = await api.put(`/usuarios/${usuarioEditado.id}`, nuevoUsuario);
                } catch {
                    response = await api.put(`/users/${usuarioEditado.id}`, nuevoUsuario);
                }
                console.log('Usuario actualizado:', response.data);
                alert('Usuario actualizado exitosamente');
                limpiarSeleccion();
            } else {
                let response;
                try {
                    response = await api.post('/usuarios', nuevoUsuario);
                } catch {
                    response = await api.post('/users', nuevoUsuario);
                }
                console.log('Usuario registrado:', response.data);
                alert('Usuario registrado exitosamente');
                limpiarSeleccion();
            }
            resetForm();
            if (onActualizacionExitosa) {
                onActualizacionExitosa();
            } 
        }catch (error) {
            console.error('Error al registrar el usuario:', error);
            alert('Error al procesar la solicitud');
        }
    };

    if (!isAdmin) {
        return <div className="registroDiv"><h2>Acceso restringido</h2><p>Solo un administrador puede registrar o editar usuarios.</p></div>;
    }

    return (
        <div className="registroDiv">
            <h2>{usuarioEditado ? 'Editar Usuario' : 'Registrar Usuario'}</h2>
            <form onSubmit = {handleSubmit} className="formularioRegistro">
                <div className="campoFormulario">
                    <label> Nombre:</label>
                    <input type="text" name="nombre" value = {nombre} onChange={(e) => setNombre(e.target.value)} required />
                </div>
                <div className="campoFormulario">
                    <label> Dirección:</label>
                    <input type="text" name="direccion" value = {direccion} onChange={(e) => setDireccion(e.target.value)} />
                </div>
                <div className="campoFormulario">
                    <label> Teléfono:</label>
                    <input type="text" name="telefono" value = {telefono} onChange={(e) => setTelefono(e.target.value)} />
                </div>
                <div className="campoFormulario">
                    <label> Email:</label>
                    <input type="email" name="email" value = {email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="campoFormulario">
                    <label> Contraseña:</label>
                    <input type="password" name="password" value = {password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="campoFormulario">
                    <label> Rol:</label>
                    <select name="rol" value={rol} onChange={(e) => setRol(e.target.value)}>
                        <option value="cliente">Cliente</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button type="submit" className="btnRegistro">{usuarioEditado ? 'Actualizar' : 'Registrar'}</button>
            </form>
        </div>
    );
}

export default RegistrarUsuario

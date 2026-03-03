import { useEffect, useState } from 'react';
import './RegistrarUsuario.css';
import api from './Services/api'

function RegistrarUsuario({usuarioEditado, limpiarSeleccion, onActualizacionExitosa}) {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (usuarioEditado) {
            setUsername(usuarioEditado.username);
            setEmail(usuarioEditado.email);
            setPassword(usuarioEditado.password);
        } else {
            resetForm();
        }
    }, [usuarioEditado]);
    
    const resetForm = () => {
        setUsername('');
        setEmail('');
        setPassword('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nuevoUsuario = {
            username,
            email,
            password};
        try {
            if (usuarioEditado) {
                const response = await api.put(`/users/${usuarioEditado.id}`, nuevoUsuario);
                console.log('Usuario actualizado:', response.data);
                alert('Usuario actualizado exitosamente');
                limpiarSeleccion();
            } else {
                const response = await api.post('/users', nuevoUsuario);
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

    return (
        <div className="registroDiv">
            <h2>Registrar Usuario</h2>
            <form onSubmit = {handleSubmit} className="formularioRegistro">
                <div className="campoFormulario">
                    <label> Nombre de usuario:</label>
                    <input type="text" name="username" value = {username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="campoFormulario">
                    <label> Email:</label>
                    <input type="email" name="email" value = {email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="campoFormulario">
                    <label> Contraseña:</label>
                    <input type="password" name="password" value = {password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btnRegistro">Registrar</button>
            </form>
        </div>
    );
}

export default RegistrarUsuario

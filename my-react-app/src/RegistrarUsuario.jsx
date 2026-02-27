import './RegistrarUsuario.css';

function RegistrarUsuario() {
        return (
            <div className="registroDiv">
                <h2>Registrar Usuario</h2>
                <form className="formularioRegistro">
                    <div className="campoFormulario">
                        <label> Nombre de usuario:</label>
                        <input type="text" id="username" name="username" required />
                    </div>
                    <div className="campoFormulario">
                        <label> Email:</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div className="campoFormulario">
                        <label> Contraseña:</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                    <button type="submit" className="btnRegistro">Registrar</button>
                </form>
            </div>
        )
}

export default RegistrarUsuario

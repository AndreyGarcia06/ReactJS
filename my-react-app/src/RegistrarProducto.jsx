import './RegistrarProducto.css';

function RegistrarProducto() {
        return (
            <div className="registroDiv">
                <h2>Registrar Producto</h2>
                <form className="formularioRegistro">
                    <div className="campoFormulario">
                        <label> Nombre:</label>
                        <input type="text" id="nombre" name="nombre" required />
                    </div>
                    <div className="campoFormulario">
                        <label> Precio:</label>
                        <input type="number" id="precio" name="precio" required />
                    </div>
                    <div className="campoFormulario">
                        <label> Descripción:</label>
                        <input type="text" id="descripcion" name="descripcion" required />
                    </div>
                    <div className="campoFormulario">
                        <label> Categoría:</label>
                        <input type="text" id="categoria" name="categoria" required />
                    </div>
                    <div className="campoFormulario">
                        <label> Imagen </label>
                        <input type="text" id="imagen" name="imagen" required />
                    </div>
                    <button type="submit" className="btnRegistro">Registrar</button>
                </form>
            </div>
        )
}

export default RegistrarProducto
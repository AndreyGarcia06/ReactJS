import "./Contactos.css";
import { useState } from "react";

function Contactos () {
    const [formulario, setFormulario] = useState({
        nombre: "",
        correo: "",
        telefono: "",
        asunto: ""
    });

    const handleChange = (e) => {
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value
        });
    };

    const handleEnviar = (e) => {
        e.preventDefault();
        alert(`Formulario enviado:\nNombre: ${formulario.nombre}\nCorreo: ${formulario.correo}\nTeléfono: ${formulario.telefono}\nAsunto: ${formulario.asunto}`);
    };

    const handleLimpiar = () => {
        setFormulario({
            nombre: "",
            correo: "",
            telefono: "",
            asunto: ""
        });
    };

    return (
        <div className = "contactosDiv">
            <h2>Contáctanos</h2>
            <form className = "formularioContacto" onSubmit={handleEnviar}>
                <div className = "campoFormulario">
                    <label htmlFor="nombre">Nombre:</label>
                    <input 
                        type="text" 
                        id="nombre" 
                        name="nombre" 
                        value={formulario.nombre}
                        onChange={handleChange}
                        placeholder="Ingresa tu nombre"
                        required
                    />
                </div>

                <div className = "campoFormulario">
                    <label htmlFor="correo">Correo Electrónico:</label>
                    <input 
                        type="email" 
                        id="correo" 
                        name="correo" 
                        value={formulario.correo}
                        onChange={handleChange}
                        placeholder="ejemplo@correo.com"
                        required
                    />
                </div>

                <div className = "campoFormulario">
                    <label htmlFor="telefono">Teléfono:</label>
                    <input 
                        type="tel" 
                        id="telefono" 
                        name="telefono" 
                        value={formulario.telefono}
                        onChange={handleChange}
                        placeholder="10 dígitos"
                        required
                    />
                </div>

                <div className = "campoFormulario">
                    <label htmlFor="asunto">Asunto:</label>
                    <textarea 
                        id="asunto" 
                        name="asunto" 
                        value={formulario.asunto}
                        onChange={handleChange}
                        placeholder="Describe tu mensaje"
                        rows="5"
                        required
                    ></textarea>
                </div>

                <div className = "botonesFormulario">
                    <button type="submit" className="btnEnviar">Enviar</button>
                    <button type="button" className="btnLimpiar" onClick={handleLimpiar}>Limpiar Formulario</button>
                </div>
            </form>
        </div>
    )
}

export default Contactos

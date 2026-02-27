import './RegistrarProducto.css';
import {useState} from 'react';
import api from './Services/api'

function RegistrarProducto() {

    const [productos, setProductos] = useState ({
        title: '',
        price: '',
        description: '',
        category: '',
        image: ''
    });

    const handleChange = (e) => {
        setProductos ({
            ...productos,
            [e.target.name]: e.target.value
        });

        const handleSubmit = (e) => {
            e.preventDefault();
            try {
                const response = await api.post('/productos', productos);
                setProductos(response.data);
                alert ('Producto agregado exitosamente');
                console.log(productos);
                setProductos({
                    title: '',
                    price: '',
                    description: '',
                    category: '',
                    image: ''
                })
            } catch (error) {
                console.error('Error al registrar el producto:', error);
            }
        };

        return (
            <div className="registroDiv">
                <h2>Registrar Producto</h2>
                <form onSubmit={handleSubmit} className="formularioRegistro">
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
}
export default RegistrarProducto
import './RegistrarProducto.css';
import {useState, useEffect} from 'react';
import api from './Services/api'

function RegistrarProducto({productoEditado, limpiarSeleccion, onActualizacionExitosa}) {
    
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    
    useEffect(() => {
        if (productoEditado) {
            setTitle(productoEditado.title);
            setPrice(productoEditado.price);
            setDescription(productoEditado.description);
            setCategory(productoEditado.category);
            setImage(productoEditado.image);
        } else {
            resetForm();
        }
    }, [productoEditado]);
    
    const resetForm = () => {
        setTitle('');
        setPrice('');
        setDescription('');
        setCategory('');
        setImage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nuevoProducto = {
            title,
            price,
            description,
            category,
            image};
        try {
            if (productoEditado) {
                const response = await api.put(`/products/${productoEditado.id}`, nuevoProducto);
                console.log('Producto actualizado:', response.data);
                alert('Producto actualizado exitosamente');
                limpiarSeleccion();
            } else {
                const response = await api.post('/products', nuevoProducto);
                console.log('Producto registrado:', response.data);
                alert('Producto registrado exitosamente');
                limpiarSeleccion();
            }
            resetForm();
            if (onActualizacionExitosa) {
                onActualizacionExitosa();
            } 
        }catch (error) {
            console.error('Error al registrar el producto:', error);
            alert('Error al procesar la solicitud');
        }
    };

        return (
            <div className="registroDiv">
                <h2>Registrar Producto</h2>
                <form onSubmit={handleSubmit} className="formularioRegistro">
                    <div className="campoFormulario">
                        <label> Nombre:</label>
                        <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </div>
                    <div className="campoFormulario">
                        <label> Precio:</label>
                        <input type="number" name="price" value={price} onChange={(e) => setPrice(e.target.value)} required />
                    </div>
                    <div className="campoFormulario">
                        <label> Descripción:</label>
                        <input type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                    </div>
                    <div className="campoFormulario">
                        <label> Categoría:</label>
                        <input type="text" name="category" value={category} onChange={(e) => setCategory(e.target.value)} required />
                    </div>
                    <div className="campoFormulario">
                        <label> Imagen </label>
                        <input type="text" name="image" value={image} onChange={(e) => setImage(e.target.value)} required />
                    </div>
                    <button type="submit" className="btnRegistro">Registrar</button>
                </form>
            </div>
        )
    }

export default RegistrarProducto
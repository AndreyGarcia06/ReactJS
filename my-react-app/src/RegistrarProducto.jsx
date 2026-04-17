import './RegistrarProducto.css';
import {useState, useEffect} from 'react';
import api from './Services/api'

function RegistrarProducto({productoEditado, limpiarSeleccion, onActualizacionExitosa}) {
    
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [categoria, setCategoria] = useState('');
    const [imagen, setImagen] = useState('');
    
    useEffect(() => {
        if (productoEditado) {
            setNombre(productoEditado.nombre || productoEditado.title || '');
            setPrecio(productoEditado.precio ?? productoEditado.price ?? '');
            setDescripcion(productoEditado.descripcion || productoEditado.description || '');
            setCategoria(productoEditado.categoria || productoEditado.category || '');
            setImagen(productoEditado.imagen || productoEditado.image || '');
        } else {
            resetForm();
        }
    }, [productoEditado]);
    
    const resetForm = () => {
        setNombre('');
        setPrecio('');
        setDescripcion('');
        setCategoria('');
        setImagen('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const precioNumerico = Number(precio);
        const nuevoProducto = {
            nombre,
            precio: Number.isNaN(precioNumerico) ? 0 : precioNumerico,
            descripcion,
            categoria,
            imagen,
            title: nombre,
            price: Number.isNaN(precioNumerico) ? 0 : precioNumerico,
            description: descripcion,
            category: categoria,
            image: imagen,
        };
        try {
            if (productoEditado) {
                let response;
                try {
                    response = await api.put(`/productos/${productoEditado.id}`, nuevoProducto);
                } catch {
                    response = await api.put(`/products/${productoEditado.id}`, nuevoProducto);
                }
                console.log('Producto actualizado:', response.data);
                alert('Producto actualizado exitosamente');
                limpiarSeleccion();
            } else {
                let response;
                try {
                    response = await api.post('/productos', nuevoProducto);
                } catch {
                    response = await api.post('/products', nuevoProducto);
                }
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
                <h2>{productoEditado ? 'Editar Producto' : 'Registrar Producto'}</h2>
                <form onSubmit={handleSubmit} className="formularioRegistro">
                    <div className="campoFormulario">
                        <label> Nombre:</label>
                        <input type="text" name="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                    </div>
                    <div className="campoFormulario">
                        <label> Precio:</label>
                        <input type="number" name="precio" value={precio} onChange={(e) => setPrecio(e.target.value)} required />
                    </div>
                    <div className="campoFormulario">
                        <label> Descripción:</label>
                        <input type="text" name="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
                    </div>
                    <div className="campoFormulario">
                        <label> Categoría:</label>
                        <input type="text" name="categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)} required />
                    </div>
                    <div className="campoFormulario">
                        <label> Imagen </label>
                        <input type="text" name="imagen" value={imagen} onChange={(e) => setImagen(e.target.value)} required />
                    </div>
                    <button type="submit" className="btnRegistro">{productoEditado ? 'Actualizar' : 'Registrar'}</button>
                </form>
            </div>
        )
    }

export default RegistrarProducto
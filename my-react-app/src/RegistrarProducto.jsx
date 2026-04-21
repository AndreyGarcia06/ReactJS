import './RegistrarProducto.css';
import {useState, useEffect} from 'react';
import api from './Services/api'
import { useAuth } from './AuthContext';

function RegistrarProducto({productoEditado, limpiarSeleccion, onActualizacionExitosa}) {
    const { isAdmin } = useAuth();
    
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [stock, setStock] = useState('1');
    const [idCategoria, setIdCategoria] = useState('');
    const [imagen, setImagen] = useState('');
    const [categorias, setCategorias] = useState([]);

    const cargarCategorias = async () => {
        if (!isAdmin) return;
        try {
            const response = await api.get('/categorias');
            setCategorias(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error al cargar categorias:', error);
        }
    };
    
    useEffect(() => {
        cargarCategorias();
        if (productoEditado) {
            setNombre(productoEditado.nombre || productoEditado.title || '');
            setPrecio(productoEditado.precio ?? productoEditado.price ?? '');
            setDescripcion(productoEditado.descripcion || productoEditado.description || '');
            setStock(productoEditado.stock ?? 1);
            setIdCategoria(productoEditado.id_categoria ?? productoEditado.categoria ?? '');
            setImagen(productoEditado.imagen || productoEditado.image || '');
        } else {
            resetForm();
        }
    }, [productoEditado]);

    if (!isAdmin) {
        return null;
    }
    
    const resetForm = () => {
        setNombre('');
        setPrecio('');
        setDescripcion('');
        setStock('1');
        setIdCategoria('');
        setImagen('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const precioNumerico = Number(precio);
        const stockNumerico = Number(stock);
        const nuevoProducto = {
            nombre,
            precio: Number.isNaN(precioNumerico) ? 0 : precioNumerico,
            imagen,
            description: descripcion,
            image: imagen,
            stock: Number.isNaN(stockNumerico) ? 1 : stockNumerico,
            id_categoria: Number(idCategoria) || 0,
            descripcion,
            categoria: idCategoria,
        };
        try {
            if (productoEditado) {
                let response;
                try {
                    response = await api.put(`/productos/${productoEditado.id}`, nuevoProducto);
                } catch {
                    response = await api.put(`/productos/${productoEditado.id}`, nuevoProducto);
                }
                console.log('Producto actualizado:', response.data);
                alert('Producto actualizado exitosamente');
                limpiarSeleccion();
            } else {
                let response;
                try {
                    response = await api.post('/productos', nuevoProducto);
                } catch {
                    response = await api.post('/productos', nuevoProducto);
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
                        <label> Stock:</label>
                        <input type="number" name="stock" value={stock} onChange={(e) => setStock(e.target.value)} required min="0" />
                    </div>
                    <div className="campoFormulario">
                        <label> Categoría:</label>
                        <select name="id_categoria" value={idCategoria} onChange={(e) => setIdCategoria(e.target.value)} required>
                            <option value="">Selecciona una categoría</option>
                            {categorias.map((categoria) => (
                                <option key={categoria.id} value={categoria.id}>
                                    {categoria.nombre}
                                </option>
                            ))}
                        </select>
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
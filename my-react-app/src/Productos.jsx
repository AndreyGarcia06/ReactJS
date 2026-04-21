import "./Productos.css";
import {useEffect, useState} from 'react';
import api from './Services/api';
import RegistrarProducto from "./RegistrarProducto";
import { useAuth } from "./AuthContext";

function Productos () {
  const { isAdmin } = useAuth();
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState (true);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [agregandoId, setAgregandoId] = useState(null);

  const normalizarProducto = (producto) => ({
    ...producto,
    nombre: producto.nombre || producto.title || 'Sin nombre',
    precio: producto.precio ?? producto.price ?? 0,
    description: producto.description || producto.descripcion || '',
    id_categoria: producto.id_categoria || producto.categoria || '',
    imagen: producto.image || producto.imagen || '',
  });

  const obtenerProductos = async () => {
    try {
      const [productosResponse, categoriasResponse] = await Promise.all([
        api.get('/productos'),
        api.get('/categorias'),
      ]);
      const lista = Array.isArray(productosResponse.data) ? productosResponse.data : [];
      setProductos(lista.map(normalizarProducto));
      setCategorias(Array.isArray(categoriasResponse.data) ? categoriasResponse.data : []);
    }catch( error) {
      console.error ('Error al obtener productos:', error);
    }finally {
      setCargando(false);
    }
  };

  const obtenerNombreCategoria = (idCategoria) => {
    const categoria = categorias.find((item) => String(item.id) === String(idCategoria));
    return categoria?.nombre || 'Sin categoría';
  };

  const removeProducto = async (id) => {
    if (!window.confirm('¿Seguro que quieres eliminar este producto?')) return;

    try {
      try {
        await api.delete(`/productos/${id}`);
      } catch {
        await api.delete(`/products/${id}`);
      }
      setProductos((prev) => prev.filter((producto) => producto.id !== id));
      if (productoSeleccionado?.id === id) {
        setProductoSeleccionado(null);
      }
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      alert('No se pudo eliminar el producto');
    }
  };

  const agregarAlCarrito = async (producto) => {
    try {
      setAgregandoId(producto.id);
      const response = await api.post('/carritos/mio/agregar', {
        id_producto: producto.id,
        cantidad: 1,
      });
      alert(`Se agregó ${producto.nombre} a tu carrito`);
      window.dispatchEvent(new CustomEvent('carrito-actualizado', { detail: response.data }));
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
      alert(error?.response?.data?.mensaje || 'No se pudo agregar al carrito');
    } finally {
      setAgregandoId(null);
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  if(cargando) return <p> Cargando productos ...</p>

    return (
        <div className = "productosDiv">
          {isAdmin && (
            <RegistrarProducto 
            productoEditado={productoSeleccionado}
            limpiarSeleccion={() => setProductoSeleccionado(null)}
            onActualizacionExitosa={obtenerProductos}/>
          )}
          <h3> Catalogo de productos </h3>
          {productos.map((producto) => (
            <div className = "tarjeta" key={producto.id}>
              <div>
                <div className = "Titulo"> {producto.nombre} </div>
                <div className = "precio"> ${Number(producto.precio || 0).toFixed(2)} </div>
                <div className="categoria"> {obtenerNombreCategoria(producto.id_categoria)} </div>
                <div className="stock"> Stock: {producto.stock ?? 0} </div>
                {producto.imagen && <img src = {producto.imagen} alt={producto.nombre} />}
                <p>{producto.description}</p>
            </div>
            <div className = "Acciones">
                <button className = "aggCar" onClick={() => agregarAlCarrito(producto)} disabled={agregandoId === producto.id}>
                  {agregandoId === producto.id ? 'Agregando...' : 'Agregar al carrito'}
                </button>
                {isAdmin && (
                  <>
                    <button className = "borrarCar" onClick={() => removeProducto(producto.id)}> Eliminar </button>
                    <button className = "editarCar" onClick={() => setProductoSeleccionado(producto)}> Editar </button>
                  </>
                )}
            </div>
            </div>
          ))}
        </div>
    )
}

export default Productos

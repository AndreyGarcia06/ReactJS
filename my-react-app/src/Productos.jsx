import "./Productos.css";
import {useEffect, useState} from 'react';
import api from './Services/api';
import RegistrarProducto from "./RegistrarProducto";
import { useAuth } from "./AuthContext";

function Productos () {
  const { isLoggedIn } = useAuth();
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState (true);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const normalizarProducto = (producto) => ({
    ...producto,
    nombre: producto.nombre || producto.title || 'Sin nombre',
    precio: producto.precio ?? producto.price ?? 0,
    descripcion: producto.descripcion || producto.description || '',
    categoria: producto.categoria || producto.category || '',
    imagen: producto.imagen || producto.image || '',
  });

  const obtenerProductos = async () => {
    try {
      let response;
      try {
        response = await api.get('/productos');
      } catch {
        response = await api.get('/products');
      }
      const lista = Array.isArray(response.data) ? response.data : [];
      setProductos(lista.map(normalizarProducto));
    }catch( error) {
      console.error ('Error al obtener productos:', error);
    }finally {
      setCargando(false);
    }
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

  useEffect(() => {
    obtenerProductos();
  }, []);

  if(cargando) return <p> Cargando productos ...</p>

    return (
        <div className = "productosDiv">
          {isLoggedIn && (
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
                {producto.imagen && <img src = {producto.imagen} alt={producto.nombre} />}
            </div>
            <div className = "Acciones">
                <button className = "aggCar"> Agregar al carrito </button>
                {isLoggedIn && (
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

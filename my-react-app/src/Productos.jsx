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

  const obtenerProductos = async () => {
    try {
      const response = await api.get ('/products');
      setProductos(response.data);
    }catch( error) {
      console.error ('Error al obtener productos:', error);
    }finally {
      setCargando(false);
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
            <div className = "tarjeta">
              <div key = {producto.id} >
                <div className = "Titulo"> {producto.title} </div>
                <div className = "precio"> {producto.price} </div>
                <img src = {producto.image} />
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

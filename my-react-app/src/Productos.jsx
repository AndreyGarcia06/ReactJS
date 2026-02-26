import "./Productos.css";
import {useEffect, useState} from 'react';
import api from './Services/api';
import RegistrarProducto from "./RegistrarProducto";

function Productos () {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState (true);

  useEffect(() => {
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
    obtenerProductos();
  }, []);

  if(cargando) return <p> Cargando productos ...</p>

    return (
        <div className = "productosDiv">
          <RegistrarProducto />
          <h3> Catalogo de coso </h3>
          {productos.map((producto) => (
            <div className = "tarjeta">
              <div key = {producto.id} >
                <div className = "Titulo"> {producto.title} </div>
                <div className = "precio"> {producto.price} </div>
                <img src = {producto.image} />
            </div>
            <div className = "Acciones">
                <button className = "aggCar"> Agregar al carrito </button>
                <button className = "borrarCar"> Eliminar </button>
            </div>
            </div>
          ))}
        </div>
    )
}

export default Productos

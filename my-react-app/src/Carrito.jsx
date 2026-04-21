import {useEffect, useState} from 'react';
import api from './Services/api';
import './Carrito.css';
import { useAuth } from './AuthContext';

function Carrito () {
  const { isAdmin, isLoggedIn } = useAuth();
  const [carritos, setCarritos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [productos, setProductos] = useState([]);
  const [detalles, setDetalles] = useState([]);
  const [carritoPropio, setCarritoPropio] = useState(null);
  const [itemsPropios, setItemsPropios] = useState([]);
  const [cargando, setCargando] = useState (true);

  const formatearFecha = (valor) => {
    if (!valor) return '—';
    const fecha = new Date(valor);
    if (Number.isNaN(fecha.getTime())) return valor;
    return fecha.toLocaleDateString();
  };

  const obtenerDatos = async () => {
    try {
      if (isAdmin) {
        const [carritosResponse, usuariosResponse, productosResponse, detallesResponse] = await Promise.all([
          api.get('/carritos'),
          api.get('/usuarios'),
          api.get('/productos'),
          api.get('/carrito-detalle'),
        ]);

        setCarritos(Array.isArray(carritosResponse.data) ? carritosResponse.data : []);
        setUsuarios(Array.isArray(usuariosResponse.data) ? usuariosResponse.data : []);
        setProductos(Array.isArray(productosResponse.data) ? productosResponse.data : []);
        setDetalles(Array.isArray(detallesResponse.data) ? detallesResponse.data : []);
      } else if (isLoggedIn) {
        const response = await api.get('/carritos/mio');
        setCarritoPropio(response.data?.carrito || null);
        setItemsPropios(Array.isArray(response.data?.items) ? response.data.items : []);
      }
    } catch (error) {
      console.error('Error al obtener el carrito:', error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerDatos();
  }, [isAdmin, isLoggedIn]);

  useEffect(() => {
    const refrescar = () => {
      obtenerDatos();
    };

    window.addEventListener('carrito-actualizado', refrescar);
    return () => window.removeEventListener('carrito-actualizado', refrescar);
  }, [isAdmin, isLoggedIn]);

  const obtenerNombreUsuario = (idUsuario) => {
    const usuario = usuarios.find((item) => String(item.id) === String(idUsuario));
    return usuario?.nombre || usuario?.email || `Usuario ${idUsuario}`;
  };

  const obtenerNombreProducto = (idProducto) => {
    const producto = productos.find((item) => String(item.id) === String(idProducto));
    return producto?.nombre || `Producto ${idProducto}`;
  };

  const obtenerDetallesCarrito = (idCarrito) => detalles.filter((item) => String(item.id_carrito) === String(idCarrito));

  const eliminarItemPropio = async (idDetalle) => {
    try {
      await api.delete(`/carritos/mio/item/${idDetalle}`);
      await obtenerDatos();
      alert('Producto eliminado de tu carrito');
    } catch (error) {
      console.error('Error al eliminar del carrito:', error);
      alert(error?.response?.data?.mensaje || 'No se pudo eliminar el producto del carrito');
    }
  };

  if(cargando) return <p> Cargando carrito ...</p>

  if (!isAdmin) {
    if (!isLoggedIn) {
      return <div className="productosDiv"><h2>Acceso restringido</h2><p>Inicia sesión para ver tu carrito.</p></div>;
    }

    return (
      <div className="productosDiv">
        <h2>Mi carrito</h2>
        {!carritoPropio ? (
          <p>No tienes productos en tu carrito todavía.</p>
        ) : (
          <div className="tarjeta" key={carritoPropio.id}>
            <div>
              <h3>Carrito ID: {carritoPropio.id}</h3>
              <div className="Id de usuario">Usuario: {carritoPropio.id_usuario}</div>
              <div className="Fecha">Fecha: {formatearFecha(carritoPropio.fecha_creacion)}</div>
              <div className="Total">Total: ${Number(carritoPropio.total || 0).toFixed(2)}</div>
              <h3>Productos</h3>
              <ul>
                {itemsPropios.map((item) => (
                  <li key={item.id}>
                    <div className="Id producto">Producto: {item.producto?.nombre || `Producto ${item.id_producto}`}</div>
                    <div className="Cantidad de items">Cantidad de items: {item.cantidad}</div>
                    <div className="Precio unitario">Precio unitario: ${Number(item.precio_unitario || 0).toFixed(2)}</div>
                    <button type="button" onClick={() => eliminarItemPropio(item.id)}>Eliminar</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    );
  }

    return (
        <div className = "productosDiv">
          <h2> Carrito </h2>
          {carritos.map((carro) => (
            <div className = "tarjeta" key={carro.id}>
              <div>
                <h3> Carrito ID: {carro.id} </h3>
                <div className = "Id de usuario"> Usuario: {obtenerNombreUsuario(carro.id_usuario)} </div>
                <div className = "Fecha"> Fecha: {formatearFecha(carro.fecha_creacion)} </div>
                <div className = "Total"> Total: ${Number(carro.total || 0).toFixed(2)} </div>
                <h3> Productos </h3>
                <ul>
                  {obtenerDetallesCarrito(carro.id).map((item) => (
                      <li key = {item.id}>
                      <div className = "Id producto"> Producto: {obtenerNombreProducto(item.id_producto)} </div>
                      <div className = "Cantidad de items"> Cantidad de items: {item.cantidad} </div>
                      <div className = "Precio unitario"> Precio unitario: ${Number(item.precio_unitario || 0).toFixed(2)} </div>
                      </li>
                  ))}
                </ul>
            </div>
              <button> Eliminar todo </button>
            </div>

           
          ))}
        </div>
    )
}

export default Carrito
import {useEffect, useState} from 'react';
import api from './Services/api';
import './Carrito.css';

function Carrito () {
  const [carrito, setCarrito] = useState([]);
  const [cargando, setCargando] = useState (true);

  useEffect(() => {
    const obtenerCarrito = async () => {
      try {
        const response = await api.get ('/carts');
        setCarrito(response.data);
      }catch( error) {
        console.error ('Error al obtener el carrito:', error);
      }finally {
        setCargando(false);
      }
    };
    obtenerCarrito();
  }, []);

  if(cargando) return <p> Cargando carrito ...</p>

    return (
        <div className = "productosDiv">
          <h2> Carrito </h2>
          {carrito.map((carro) => (
            <div className = "tarjeta">
              <div>
                <h3> Carrito ID: {carro.id} </h3>
                <div className = "Id de usuario"> Id usuario: {carro.userId} </div>
                <div className = "Fecha"> Fecha: {carro.date} </div>
                <h3> Productos </h3>
                {carro.products.map((item, index) => (
                    <li key = {index}>
                    <div className = "Id producto"> Id producto: {item.productId} </div>
                    <div className = "Cantidad de items"> Cantidad de items: {item.quantity} </div><button> x </button>
                    </li>
                ))}
            </div>
              <button> Eliminar todo </button>
            </div>

           
          ))}
        </div>
    )
}

export default Carrito
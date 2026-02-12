import "./Productos.css";
import PropTypes from 'prop-types';

/*function Productos () {
    return (
        <div className = "productosDiv">
            <h2 className = "Titulo"> Productos de las criptos</h2>
        </div>
    )
}
*/
const productos = [
  {
    nombre: "Bitcoin",
    descripcion: "La primera criptomoneda",
    imagen: "https://www.criptonoticias.com/wp-content/uploads/2026/02/bitcoin-precio-comprar-caida.jpg",
    link: "https://bitcoin.org/es/"
  },
  {
    nombre: "DogueCoin",
    descripcion: "La criptomoneda de los memes",
    imagen: "https://elceo.com/wp-content/uploads/2024/11/dogecoin_sp500_capitalizacion.jpg",
    link: "https://dogecoin.com"
  },
  {
    nombre: "Ethereum",
    descripcion: "Plataforma para contratos inteligentes",
    imagen: "https://img.decrypt.co/insecure/rs:fit:1920:0:0:0/plain/https://cdn.decrypt.co/wp-content/uploads/2024/07/ethereum-coin-wall-street-price-chart-gID_7.jpeg@webp",
    link: "https://ethereum.org/es/"
  },
  {
    nombre: "XRP",
    descripcion: "Criptomoneda para pagos rápidos",
    imagen: "https://img.capital.com/imgs/articles/1920x1140x0/shutterstock_2236802793_4_0.jpg",
    link: "https://xrpl.org"
  },
  {
    nombre: "Cardano",
    descripcion: "Blockchain sostenible y escalable.",
    imagen: "https://i-invdn-com.investing.com/news/Cardano_800x533_L_1556444760.jpg",
    link: "https://cardano.org"
  },
  {
    nombre: "Solana",
    descripcion: "Ultra rápida y de bajo costo.",
    imagen: "https://www.dlnews.com/resizer/v2/4A45N3VS4JG67MLB4WKNNWNZOY.jpg?auth=63a6e9954b35a0d9cf1c844851ab6749040ef608afa79ab5047bdd7894a90471&width=1200&height=675&focal=825%2C540",
    link: "https://solana.com"
  },
  {
    nombre: "Polkadot",
    descripcion: "Blockchain sostenible y escalable.",
    imagen: "https://statics.forbesargentina.com/2021/12/61c0dd71ea674.png",
    link: "https://polkadot.com"
  },
  {
    nombre: "Bitcoin",
    descripcion: "La primera criptomoneda.",
    imagen: "https://www.criptonoticias.com/wp-content/uploads/2026/02/bitcoin-precio-comprar-caida.jpg",
    link: "https://bitcoin.org/es/"
  }
];

const Productos = () => {
  return (
    <div className="productos-container">
      {productos.map((prod, index) => (
        <div className="tarjeta" key={index}>
          <img src={prod.imagen} alt={prod.nombre} />
          <h3>{prod.nombre}</h3>
          <p>{prod.descripcion}</p>
          <a href={prod.link}>¿Quieres saber más?</a>
        </div>
      ))}
    </div>
  );
};
/*
function Inicio () {
    return (
        <>
            <TarjetaProd titulo = "Bitcoin" descripcion = "La primera criptomoneda" imagen = "https://www.criptonoticias.com/wp-content/uploads/2026/02/bitcoin-precio-comprar-caida.jpg" linkInfo = "https://bitcoin.org/es/"/>
            <TarjetaProd titulo = "DogueCoin" descripcion = "La criptomoneda de los memes" imagen = "https://elceo.com/wp-content/uploads/2024/11/dogecoin_sp500_capitalizacion.jpg" linkInfo = "https://dogecoin.com"/>
            <TarjetaProd titulo = "Ethereum" descripcion = "Plataforma para contratos inteligentes" imagen = "https://img.decrypt.co/insecure/rs:fit:1920:0:0:0/plain/https://cdn.decrypt.co/wp-content/uploads/2024/07/ethereum-coin-wall-street-price-chart-gID_7.jpeg@webp" linInfo = "https://ethereum.org/es/"/>
            <TarjetaProd titulo = "XRP" descripcion = "Criptomoneda para pagos rápidos" imagen = "https://img.capital.com/imgs/articles/1920x1140x0/shutterstock_2236802793_4_0.jpg" linkInfo = "https://xrpl.org"/>
        </>
    )
}

function TarjetaProd (props) {
    return (
        <div className = "tarjeta">
            <img src = {props.imagen} alt = "Coso de bitcoin" />
            <h3> {props.titulo}</h3>
            <p> {props.descripcion}</p>
            <p> {props.linkInfo}</p>
            <a href = "#"> Ver más</a>
        </div>
    )
}
*/

export default Productos

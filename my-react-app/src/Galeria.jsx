import "./Galeria.css";
/*
function Galeria () {
    return (
        <div className = "galeriaDiv">
            <h2> Aqui habrá info de la galería</h2>
        </div>
    )
}
*/
const galeria = [
  {
    nombre: "Bitcoin",
    imagen: "https://www.criptonoticias.com/wp-content/uploads/2026/02/bitcoin-precio-comprar-caida.jpg",
  },
  {
    nombre: "DogueCoin",
    imagen: "https://elceo.com/wp-content/uploads/2024/11/dogecoin_sp500_capitalizacion.jpg",
  },
  {
    nombre: "Ethereum",
    imagen: "https://img.decrypt.co/insecure/rs:fit:1920:0:0:0/plain/https://cdn.decrypt.co/wp-content/uploads/2024/07/ethereum-coin-wall-street-price-chart-gID_7.jpeg@webp",
  },
  {
    nombre: "XRP",
    imagen: "https://img.capital.com/imgs/articles/1920x1140x0/shutterstock_2236802793_4_0.jpg",
  },
  {
    nombre: "Cardano",
    imagen: "https://i-invdn-com.investing.com/news/Cardano_800x533_L_1556444760.jpg",
  },
  {
    nombre: "Solana",
    imagen: "https://www.dlnews.com/resizer/v2/4A45N3VS4JG67MLB4WKNNWNZOY.jpg?auth=63a6e9954b35a0d9cf1c844851ab6749040ef608afa79ab5047bdd7894a90471&width=1200&height=675&focal=825%2C540",
  },
  {
    nombre: "Polkadot",
    imagen: "https://statics.forbesargentina.com/2021/12/61c0dd71ea674.png",
  },
  {
    nombre: "Bitcoin",
    imagen: "https://www.criptonoticias.com/wp-content/uploads/2026/02/bitcoin-precio-comprar-caida.jpg",
  }
];

const Galeria = () => {
  return (
    <div className="galeria-container">
      {galeria.map((prod, index) => (
        <div className="tarjeta" key={index}>
          <img src={prod.imagen} alt={prod.nombre} />
          <h3>{prod.nombre}</h3>
        </div>
      ))}
    </div>
  );
};
export default Galeria

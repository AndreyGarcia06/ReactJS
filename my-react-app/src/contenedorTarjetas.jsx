import byc from "./assets/TBit.jpg";
import PropTypes from 'prop-types';
import './contenedorTarjetas.css';
import AcercaDe from "./AcercaDe";
import Productos from "./Productos";
import Galeria from "./Galeria";
import Contactos from "./Contactos";
import Sucursales from "./Sucursales";

function ContenedorTarjeta ({vista}) {
    const vistas = {
        "Inicio": <Inicio />,
        "AcercaDe": <AcercaDe />,
        "Productos": <Productos />,
        "Galeria": <Galeria />,
        "Contactos": <Contactos />,
        "Sucursales": <Sucursales />,

    }
    return ( 
        <div className = "contenedorTarjetas">
           {vistas[vista] || <Inicio />}
        </div>
    )
}

function Inicio () {
    return (
        <>
            <Tarjeta titulo = "Bitcoin" descripcion = "La primera criptomoneda" imagen = "https://www.criptonoticias.com/wp-content/uploads/2026/02/bitcoin-precio-comprar-caida.jpg"/>
            <Tarjeta titulo = "DogueCoin" descripcion = "La criptomoneda de los memes" imagen = "https://elceo.com/wp-content/uploads/2024/11/dogecoin_sp500_capitalizacion.jpg"/>
            <Tarjeta titulo = "Ethereum" descripcion = "Plataforma para contratos inteligentes" imagen = "https://img.decrypt.co/insecure/rs:fit:1920:0:0:0/plain/https://cdn.decrypt.co/wp-content/uploads/2024/07/ethereum-coin-wall-street-price-chart-gID_7.jpeg@webp"/>
            <Tarjeta titulo = "XRP" descripcion = "Criptomoneda para pagos rápidos" imagen = "https://img.capital.com/imgs/articles/1920x1140x0/shutterstock_2236802793_4_0.jpg"/>
        </>
    )
}

function Tarjeta (props) {
    return (
        <div className = "tarjeta">
            <img src = {props.imagen} alt = "Coso de bitcoin" />
            <h3> {props.titulo}</h3>
            <p> {props.descripcion}</p>
            <a href = "#"> Ver más</a>
        </div>
    )
}

ContenedorTarjeta.propTypes = {
    vista: PropTypes.string.isRequired
};

export default ContenedorTarjeta
import byc from "./assets/TBit.jpg";
import './contenedorTarjetas.css';

function ContenedorTarjeta () {
    return ( 
        <div className = "contenedorTarjetas">
            <Tarjeta titulo = "Bitcoin" descripcion = "La primera criptomoneda" />
            <Tarjeta titulo = "DogueCoin" descripcion = "La criptomoneda de los memes" />
            <Tarjeta titulo = "Ethereum" descripcion = "Plataforma para contratos inteligentes" />
            <Tarjeta titulo = "XRP" descripcion = "Criptomoneda para pagos rápidos" />
        </div>
    )
}

function Tarjeta (props) {
    return (
        <div className = "tarjeta">
            <img src = {byc} alt = "Coso de bitcoin" />
            <h3> {props.titulo}</h3>
            <p> {props.descripcion}</p>
            <a href = "#"> Ver más</a>
        </div>
    )
}
export default ContenedorTarjeta
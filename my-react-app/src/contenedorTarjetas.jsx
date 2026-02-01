import byc from "./assets/TBit.jpg";
import './contenedorTarjetas.css';

function ContenedorTarjeta () {
    return ( 
        <div className = "contenedorTarjetas">
            <Tarjeta />
            <Tarjeta />
            <Tarjeta />
            <Tarjeta />
        </div>
    )
}

function Tarjeta () {
    return (
        <div className = "tarjeta">
            <img src = {byc} alt = "Coso de bitcoin" />
            <h3> El bitcoin y sus primos</h3>
            <p> Son primos desde hace uff</p>
            <a href = "#"> Ver más</a>
        </div>
    )
}
export default ContenedorTarjeta
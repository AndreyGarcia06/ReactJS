import Mapa from "./Mapa.jsx";
import './ContenedorTextImg.css';

function ContenedorTextImg() {
    return (
        <div className = "ContenedorTextImg">
            <Textos />
        </div>
    )
}

function Textos () {
    return (
        <div>
            <h3 className = "TextoTitulo"> Criptomonedas </h3>
            <p className = "TextoNormal">Las criptomonedas son activos digitales descentralizados, ya que no están controladas ni respaldadas por ningún banco central, y sus intercambios no requieren de intermediarios. El control de las transacciones de criptodivisas depende de una base de datos descentralizada, normalmente una blockchain (cadena de bloques).</p>
            <Mapa lat = {19.43317210135107} lng = {-99.1494250757089} nombre_sucursal = {"Sucursal Ciudad de México"}   />
        </div>
    )
}
export default ContenedorTextImg;
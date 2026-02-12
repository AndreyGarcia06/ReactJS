import "./Sucursales.css";
import Mapa from "./Mapa.jsx";

function Sucursales () {
    return (
        <div className = "sucursalesDiv">
            <h2>Nuestras Sucursales</h2>
            <div className = "sucursalesContainer">
                <TarjetaSucursal 
                    ciudad = "Ciudad de México"
                    tienda = "Bodega Aurrera"
                    direccion = "Av. Principal #123, Col. Centro"
                    imagen = "https://files.walmex.mx/upload/images/nosotros/formatos-de-negocio/Bodega_300x190.jpg"
                    lat = {19.4326}
                    lng = {-99.1332}
                />
                <TarjetaSucursal 
                    ciudad = "Puebla"
                    tienda = "Champion"
                    direccion = "Blvd. Atlixco #456, Angelópolis"
                    imagen = "https://media.fashionnetwork.com/cdn-cgi/image/fit=contain,width=1000,height=1000,format=auto/m/ca6c/6281/5c73/a6fb/840f/e342/650a/1133/cf10/c4a5/c4a5.jpeg"
                    lat = {19.0327}
                    lng = {-98.2049}
                />
                <TarjetaSucursal 
                    ciudad = "Monterrey"
                    tienda = "HEB"
                    direccion = "Av. Constitución #789, San Pedro"
                    imagen = "https://i.elhorizonte.mx/img/eh/2690000/2691082_hebok.jpg"
                    lat = {25.6866}
                    lng = {-100.3161}
                />
                <TarjetaSucursal 
                    ciudad = "Querétaro"
                    tienda = "Básicos"
                    direccion = "Blvd. Bernardo Quintana #321, Centro Sur"
                    imagen = "https://www.basicos.mx/images/thumbs/0010335_Fondo.jpeg"
                    lat = {20.5888}
                    lng = {-100.3899}
                />
            </div>
        </div>
    )
}

function TarjetaSucursal (props) {
    return (
        <div className = "tarjetaSucursal">
            <img src = {props.imagen} alt = {`Sucursal ${props.tienda} en ${props.ciudad}`} />
            <h3>{props.tienda}</h3>
            <h4>{props.ciudad}</h4>
            <p>{props.direccion}</p>
            <Mapa lat = {props.lat} lng = {props.lng} nombre_sucursal = {props.tienda} />
        </div>
    )
}

export default Sucursales

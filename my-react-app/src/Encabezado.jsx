import logo from "./assets/BitCoin.webp";
import tiktok from "./assets/Redes/tiktok.png";
import face from "./assets/Redes/facebook.png";
import insta from "./assets/Redes/instagram.png";
import youtube from "./assets/Redes/youtube.png";
import whats from "./assets/Redes/whatsapp.png";
import PropTypes from 'prop-types';
import "./Encabezado.css";

function Encabezado({cambiarVista}) {
    return (
        <div className = "encabezado">
            <Logo />
            <Menu cambiarVista = {cambiarVista}/>
            <Redes />
        </div>
    );
}

function Logo() {
    return (
        <div className = "logoDiv">
            <img src = {logo} alt = "React logo"></img>
        </div>
    )
}

function Menu({cambiarVista}) {
    return (
        <div className = "menuDiv" >
            <ul>
                <li onClick = {() => cambiarVista ("Inicio")}> Inicio </li>
                <li onClick = {() => cambiarVista ("AcercaDe")}> Acerca de </li>
                <li onClick = {() => cambiarVista ("Productos")}> Productos </li>
                <li onClick = {() => cambiarVista ("Galeria")}> Galería </li>
                <li onClick = {() => cambiarVista ("Contactos")}> Contactos </li>
                <li onClick = {() => cambiarVista ("Sucursales")}> Sucursales </li>
            </ul>
        </div>
    )
}

function Redes() {
    return (
        <div className = "redesDiv">
            <ul>
                <li><a href = "#"><img src = {tiktok} alt = "TikTok logo" /></a></li>
                <li><a href = "#"><img src = {face} alt = "Facebook logo" /></a></li>
                <li><a href = "#"><img src = {insta} alt = "Instagram logo" /></a></li>
                <li><a href = "#"><img src = {youtube} alt = "Youtube logo" /></a></li>
                <li><a href = "#"><img src = {whats} alt = "Whatsapp logo" /></a></li>
            </ul>
        </div>
    );
}

Encabezado.propTypes = {
    cambiarVista: PropTypes.func.isRequired
}

Menu.propTypes = {
    cambiarVista: PropTypes.func.isRequired
}
export default Encabezado
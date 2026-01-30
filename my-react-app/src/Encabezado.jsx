import logo from "./assets/BitCoin.webp";
import tiktok from "./assets/Redes/tiktok.png";
import face from "./assets/Redes/facebook.png";
import insta from "./assets/Redes/instagram.png";
import youtube from "./assets/Redes/youtube.png";
import whats from "./assets/Redes/whatsapp.png";
import "./Encabezado.css";

function Encabezado() {
    return (
        <div className = "encabezado">
            <Logo />
            <Menu />
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

function Menu() {
    return (
        <div className = "menuDiv" >
            <ul>
                <li><a href = "#"> Inicio </a></li>
                <li><a href = "#"> Acerca de </a></li>
                <li><a href = "#"> Productos </a></li>
                <li><a href = "#"> Contactos </a></li>
                <li><a href = "#"> Sucursales </a></li>
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
export default Encabezado
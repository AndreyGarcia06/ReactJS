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
            <h2> Bienvenido a mi sitio </h2>
        </div>
    );
}

function Logo() {
    return (
        <div className = "logo">
            <img src = {logo} alt = "React logo"></img>
        </div>
    )
}

function Menu() {
    return (
        <nav>
            <ul>
                <li> Inicio </li>
                <li> Acerca de </li>
                <li> Productos </li>
                <li> Contactos </li>
                <li> Sucursales </li>
            </ul>
        </nav>
    )
}

function Redes() {
    return (
        <div className = "redes">
            <ul>
                <li><img src = {tiktok} alt = "TikTok logo" /></li>
                <li><img src = {face} alt = "Facebook logo" /></li>
                <li><img src = {insta} alt = "Instagram logo" /></li>
                <li><img src = {youtube} alt = "Youtube logo" /></li>
                <li><img src = {whats} alt = "Whatsapp logo" /></li>
            </ul>
        </div>
    );
}
export default Encabezado
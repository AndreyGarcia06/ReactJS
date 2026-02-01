import './PiePagina.css';

function PiePagina() {
    return (
        <footer className = "PiePagina">
            <TextoIzq/>
            <TextoDer/>
        </footer>
    )
}

function TextoIzq() {
    return (
        <div className = "TextoIzq">
            <p>Derechos reservados &copy; 2024</p>
        </div>
    )
}

function TextoDer() {
    return (
        <div className = "TextoDer">
            <p>Andrey García</p>
        </div>
    )
}

export default PiePagina;
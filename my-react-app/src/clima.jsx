//20.237756304890357, -97.95747317213893
import {useEffect, useState} from "react";
import './clima.css';


function Clima () {
    const [clima, setClima] = useState (null);
    const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
    const lat = 20.237756304890357;
    const lng = -97.95747317213893;

    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric&lang=es`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setClima(data);
        })
        .catch((error) => console.error("Error", error));
    },[])

    return (
        <div className = "contenedorClima">
            {
                clima ? (
                    <>
                        <p>{clima.name} Temp: <span className="climaTemp">{clima.main.temp} °C</span> | Hum: <span className="climaHum">{clima.main.humidity}</span></p>
                        <p> Descripción: {clima.weather && clima.weather[0] ? clima.weather[0].description : ''}</p>
                    </>
                ) : (
                    <p> Cargando clima ... </p>
                )
            }
        </div>
    )
}

export default Clima
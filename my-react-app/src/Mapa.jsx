import {GoogleMap, useJsApiLoader, Marker} from '@react-google-maps/api';
import './Mapa.css';

const containerStyle = {
    width: '100%',
    height: '350px'
};

function Mapa({lat, lng, nombre_sucursal}) {
    const { isLoaded, loadError} = useJsApiLoader ({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    })

    if(loadError) return <div>Error al cargar el mapa</div>
    if(!isLoaded) return <div>Cargando mapa...</div>

    const center = {lat, lng}

    return(
        <div className = "mapaContainer">
            <h2 className = "nombreSucursal">{nombre_sucursal}</h2>
            <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom = {16}>
                <Marker position = {center} />
            </GoogleMap>
        </div>
    )
}

export default Mapa
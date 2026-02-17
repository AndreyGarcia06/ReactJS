import { useEffect, useState} from 'react';
import {GoogleMap, useJsApiLoader, Marker} from '@react-google-maps/api';


const containerStyle = {
    width: '100%',
    height: '350px'
};

function MapaGeo() {
    const [ubicacion, setUbicacion] = useState (null);
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    });
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUbicacion({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                })
            },
            (error) => console.error(error),
            {enableHighAccuracy:true}
        )
    },[])
    console.log('MapaGeo isLoaded:', isLoaded, 'ubicacion:', ubicacion);
    if (loadError) return <div>Error al cargar el mapa</div>;
    if (!isLoaded) return <div>Cargando mapa...</div>;
    return(
        <>
            {ubicacion && (
                <GoogleMap 
                    mapContainerStyle={containerStyle}
                    center = {ubicacion}
                    zoom = {14}>
                        <Marker position = {ubicacion} />
                </GoogleMap>
            )}
        </>
    )
}

export default MapaGeo
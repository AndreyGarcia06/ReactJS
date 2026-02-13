import { useEffect, useState} from 'react';
import {GoogleMap, LoadScript, Marker} from '@react-google-maps/api';


const containerStyle = {
    width: '100%',
    height: '350px'
};

function MapaGeo() {
    const [ubicacion, setUbicacion] = useState (null);
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
    return(
        <LoadScript googleMapsApiKey = {import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            {
                ubicacion && (
                    <GoogleMap 
                    mapContainerStyle={containerStyle}
                    center = {ubicacion}
                    zoom = {16}>
                        <Marker position = {ubicacion} />
                    </GoogleMap>
                )
            }
        </LoadScript>
    )
}

export default MapaGeo
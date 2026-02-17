import { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, Polyline } from '@react-google-maps/api';
import './MapaRutas.css';

const containerStyle = {
  width: '100%',
  height: '380px'
};

const sucursales = [
  { lat: 19.4326, lng: -99.1332, name: 'Bodega Aurrera' },
  { lat: 19.0327, lng: -98.2049, name: 'Champion' },
  { lat: 25.6866, lng: -100.3161, name: 'HEB' },
  { lat: 20.5888, lng: -100.3899, name: 'Básicos' }
];

// svgIcon removed — use google.maps.SymbolPath.CIRCLE for colored markers

function MapaRutas() {
  const [ubicacion, setUbicacion] = useState(null);
  
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  });

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUbicacion({ lat: position.coords.latitude, lng: position.coords.longitude });
      },
      (err) => console.error('Geolocalización:', err),
      { enableHighAccuracy: true }
    );
  }, []);

  if (loadError) {
    console.error('Google Maps loadError:', loadError);
    return <div className="mapaRutasContainer">Error al cargar el mapa</div>;
  }
  if (!isLoaded) return <div className="mapaRutasContainer">Cargando mapa...</div>;

  if (typeof window === 'undefined' || !window.google || !window.google.maps || typeof window.google.maps.Map !== 'function') {
    console.error('Google Maps no inicializado correctamente:', window.google);
    return <div className="mapaRutasContainer">La API de Google Maps no se inicializó correctamente. Revisa la consola.</div>;
  }

  const center = ubicacion || { lat: sucursales[0].lat, lng: sucursales[0].lng };
  const colors = ['#2E86DE', '#FF5733', '#33C1FF', '#2ECC71', '#9B59B6'];
  console.log('MapaRutas isLoaded:', isLoaded, 'ubicacion:', ubicacion);

  // Crear iconos de marcador con símbolos de Google (círculos coloreados)
  let userIcon = null;
  let sucursalIcon = (color) => null;
  if (typeof window !== 'undefined' && window.google && window.google.maps) {
    userIcon = {
      path: window.google.maps.SymbolPath.CIRCLE,
      scale: 8,
      fillColor: colors[0],
      fillOpacity: 1,
      strokeWeight: 1,
      strokeColor: '#ffffff'
    };
    // factory for sucursal icons
    const makeSucursalIcon = (color) => ({
      path: window.google.maps.SymbolPath.CIRCLE,
      scale: 7,
      fillColor: color,
      fillOpacity: 1,
      strokeWeight: 1,
      strokeColor: '#ffffff'
    });
    // replace sucursalIcon function to return proper icon
    sucursalIcon = makeSucursalIcon;
  }

  const endpointIcon = (color) => (typeof window !== 'undefined' && window.google && window.google.maps) ? ({
    path: window.google.maps.SymbolPath.CIRCLE,
    scale: 5,
    fillColor: color,
    fillOpacity: 1,
    strokeWeight: 1,
    strokeColor: '#ffffff'
  }) : null;

  return (
    <div className="mapaRutasContainer">
      <h2>Rutas a sucursales desde tu ubicación</h2>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={ubicacion ? 13 : 6}>
        {ubicacion && <Marker position={ubicacion} icon={userIcon} title="Tu ubicación" />}
        {sucursales.map((s, i) => (
          <Marker
            key={i}
            position={{ lat: s.lat, lng: s.lng }}
            icon={typeof sucursalIcon === 'function' ? sucursalIcon(colors[(i+1) % colors.length]) : null}
            title={s.name}
          />
        ))}

        {/* Dibujar línea recta (a vuelo de pájaro) entre ubicacion y cada sucursal */}
        {ubicacion && sucursales.map((s, i) => (
          <Polyline
            key={`route-${i}`}
            path={[{ lat: ubicacion.lat, lng: ubicacion.lng }, { lat: s.lat, lng: s.lng }]}
            options={{ strokeColor: colors[(i+1) % colors.length], strokeWeight: 3, clickable: false }}
          />
        ))}

        {/* Puntos finales de cada ruta (pequeños círculos) */}
        {ubicacion && sucursales.map((s, i) => (
          <Marker
            key={`end-${i}`}
            position={{ lat: s.lat, lng: s.lng }}
            icon={endpointIcon(colors[(i+1) % colors.length])}
            clickable={false}
            zIndex={10}
          />
        ))}
      </GoogleMap>
    </div>
  );
}

export default MapaRutas;

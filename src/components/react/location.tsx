import { useEffect, useState } from 'react';

export default function Ubicacion() {
  const [ciudad, setCiudad] = useState('Detectando...');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;

      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const data = await res.json();
      const lugar =
        data.address.city ||
        data.address.town ||
        data.address.village ||
        'Ubicación desconocida';

      setCiudad(lugar);
    }, () => {
      setCiudad('Permiso denegado o error de geolocalización');
    });
  }, []);
  
    return <span id="ciudad" className="font-normal">{ciudad}</span>
}
  
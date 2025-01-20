import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = 'pk.eyJ1IjoibG92YWJsZSIsImEiOiJjbHJwOWhtYmkwMjF2MnFsYnhjZGNiM3ZtIn0.JpZOQJ3C_xkMxQMsHGqPYg';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-43.3228, -22.7866], // Duque de Caxias coordinates
      zoom: 14
    });

    new mapboxgl.Marker()
      .setLngLat([-43.3228, -22.7866])
      .addTo(map.current);

    return () => {
      map.current?.remove();
    };
  }, []);

  return (
    <section className="relative h-[400px] bg-gray-100">
      <div ref={mapContainer} className="absolute inset-0" />
      <div className="absolute top-8 left-8 bg-white p-6 rounded-lg shadow-lg max-w-md">
        <h2 className="text-2xl font-bold text-primary mb-2">Location</h2>
        <p className="text-gray-600">Duque de Caxias, RJ, Brasil</p>
      </div>
    </section>
  );
};

export default Map;
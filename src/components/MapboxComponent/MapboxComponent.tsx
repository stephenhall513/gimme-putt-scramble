import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYWx0YWJvcyIsImEiOiJjbTZibXN3bnUwYTE4MmtvbmtvOGh1eHQ3In0.Js5ftp3lsn7HVJXz5Z4tGw";

export interface Coordinates {
  lng: number;
  lat: number;
}

interface MapBoxComponentProps {
  point1: Coordinates;
  point2: Coordinates;
}

const MapBoxComponent: React.FC<MapBoxComponentProps> = ({
  point1,
  point2,
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapContainer.current) {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/altabos/cm8p3rnb3009401sd5nue3u0i",
        center: [(point1.lng + point2.lng) / 2, (point1.lat + point2.lat) / 2],
        zoom: 16.5,
      });

      map.addControl(new mapboxgl.NavigationControl());

      //new mapboxgl.Marker().setLngLat([point1.lng, point1.lat]).addTo(map);

      //new mapboxgl.Marker().setLngLat([point2.lng, point2.lat]).addTo(map);

      map.on("load", () => {
        const bounds = new mapboxgl.LngLatBounds();
        bounds.extend([point1.lng, point1.lat]);
        bounds.extend([point2.lng, point2.lat]);
        map.fitBounds(bounds, { padding: 20 });

        const bearing = calculateBearing(point1, point2);
        map.rotateTo(bearing, { duration: 0 });
      });

      console.log("Component rerendered!");
    }
  }, [point1, point2]);

  function calculateBearing(start: Coordinates, end: Coordinates): number {
    const startLat = degreesToRadians(start.lat);
    const startLng = degreesToRadians(start.lng);
    const endLat = degreesToRadians(end.lat);
    const endLng = degreesToRadians(end.lng);
    let dLong = endLng - startLng;

    const dPhi = Math.log(
      Math.tan(endLat / 2.0 + Math.PI / 4.0) /
        Math.tan(startLat / 2.0 + Math.PI / 4.0)
    );
    if (Math.abs(dLong) > Math.PI) {
      if (dLong > 0.0) {
        dLong = -(2.0 * Math.PI - dLong);
      } else {
        dLong = 2.0 * Math.PI + dLong;
      }
    }

    return ((Math.atan2(dLong, dPhi) * 180.0) / Math.PI + 360.0) % 360.0;
  }

  function degreesToRadians(degrees: number) {
    return (degrees * Math.PI) / 180;
  }

  return <div ref={mapContainer} style={{ width: "100%", height: "90%" }} />;
};

export default MapBoxComponent;

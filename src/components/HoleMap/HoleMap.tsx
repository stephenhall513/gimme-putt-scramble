"use client";
import MapBoxComponent, {
  Coordinates,
} from "../MapboxComponent/MapboxComponent";

const HoleMap = () => {
  const point1 = { lng: -84.3173979, lat: 39.0476951 };
  const point2 = { lng: -84.3179987, lat: 39.0506613 };
  return (
    <div>
      <MapBoxComponent point1={point1} point2={point2} />
    </div>
  );
};

export default HoleMap;

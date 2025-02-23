"use client";
import { useEffect } from "react";
import MapBoxComponent, {
  Coordinates,
} from "../MapboxComponent/MapboxComponent";

interface HoleMapProps {
  point1: Coordinates;
  point2: Coordinates;
}

const HoleMap = ({ point1, point2 }: HoleMapProps) => {
  return (
    <div className="mx-auto" style={{ width: "100%", height: "90%" }}>
      <MapBoxComponent point1={point1} point2={point2} />
    </div>
  );
};

export default HoleMap;

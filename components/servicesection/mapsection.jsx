import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import icon from "./constants";

const Map = (props) => {
  const DEFAULT_LATITUDE = 32.313268;
  const DEFAULT_LONGITUDE = 35.022895;

  const [markerPosition, setMarkerPosition] = useState(null);
  console.log(markerPosition)

  const handleMapClick = (e) => {
    setMarkerPosition(e.latlng);
  };

  const latitude = props.coords ? props.coords.latitude : DEFAULT_LATITUDE;
  const longitude = props.coords ? props.coords.longitude : DEFAULT_LONGITUDE;

  return (
    <MapContainer
      className="leaflet-map"
      center={[latitude, longitude]}
      zoom={17}
      scrollWheelZoom={true}
      style={{ height: "100vh" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapClickHandler setMarkerPosition={setMarkerPosition} />
      {markerPosition && (
        <Marker position={markerPosition} icon={icon}>
          <Popup>Clicked position ^_^</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

const MapClickHandler = ({ setMarkerPosition }) => {
  const map = useMapEvents({
    click: (e) => {
      setMarkerPosition(e.latlng);
    },
  });


  return null;
};

export default Map;

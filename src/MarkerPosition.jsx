import { Marker, Popup, useMap } from "react-leaflet";
import { useEffect } from "react";
import iconLocation from "./icon";
import PropTypes from "prop-types";

const MarkerPosition = ({ address }) => {
  const map = useMap();
  const position = [address.location.lat, address.location.lng];
  useEffect(() => {
    map.flyTo(
      position,
      13,
      {
        animate: true,
      },
      [map, position]
    );
  });
  return (
    <Marker icon={iconLocation} position={position}>
      <Popup>{/* Additional info can be added here */}</Popup>
    </Marker>
  );
};
MarkerPosition.propTypes = {
  address: PropTypes.shape({
    location: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};
export default MarkerPosition;

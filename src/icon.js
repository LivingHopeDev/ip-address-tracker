import L from "leaflet";
import iconLocation from "./assets/icon-location.svg";

export default L.icon({
  iconSize: [32, 40],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: iconLocation,
});

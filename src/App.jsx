import { useState, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import bgMobile from "./assets/pattern-bg-mobile.png";
import bgdesktop from "./assets/pattern-bg-desktop.png";
import iconArrow from "./assets/icon-arrow.svg";
import MarkerPosition from "./MarkerPosition";
const { VITE_APP_LOCATION_API_KEY } = import.meta.env;
function App() {
  const [address, setAddress] = useState(null);
  const [ipAddress, setIpAddress] = useState("");

  const IpAddressRegex =
    /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]).){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;

  const ValidDomainName =
    /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]).)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9])$/;
  const IsIpAddress = IpAddressRegex.test(ipAddress);
  const isDomainName = ValidDomainName.test(ipAddress);
  const fetchData = async () => {
    try {
      const res = await fetch(
        `https://geo.ipify.org/api/v2/country,city?apiKey=${VITE_APP_LOCATION_API_KEY}&ipAddress=`
      );
      const data = await res.json();
      setAddress(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const fetchIpAddress = async () => {
    const res = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=${VITE_APP_LOCATION_API_KEY}&${
        IsIpAddress
          ? `ipAddress=${ipAddress}`
          : isDomainName
          ? `domain=${ipAddress}`
          : ""
      }`
    );
    const data = await res.json();
    setAddress(data);
    console.log("here");
  };

  const onsubmit = (e) => {
    e.preventDefault();
    fetchIpAddress();
  };

  return (
    <section className="relative">
      <img
        src={bgMobile}
        className="  w-screen h-[15rem] md:hidden lg:hidden xl:hidden"
        alt=""
      />
      <img
        src={bgdesktop}
        className=" hidden md:block lg:block xl:block w-screen  h-[15rem]"
        alt=""
      />

      <div className="absolute top-8 left-0 right-0 z-[10000]">
        <h1 className="text-white font-rubik font- text-lg text-center">
          IP Address Tracker
        </h1>
        <form className="flex justify-center mt-4" onSubmit={onsubmit}>
          <input
            type="text"
            className="  h-[2rem] w-[50%] md:w-[30%] p-5 outline-none rounded-tl-[0.5rem] rounded-bl-[0.5rem]"
            placeholder="Search for any IP address or domain"
            name="ipAddress"
            value={ipAddress}
            onChange={(e) => {
              setIpAddress(e.target.value);
            }}
          />
          <button
            type="submit"
            className="bg-veryDarkGray h-[2rem] w-[2rem] p-5 rounded-tr-[0.5rem] rounded-br-[0.5rem] hover:opacity-70"
          ></button>
          <img
            src={iconArrow}
            className="font-white -ml-[1.8rem] h-[1rem] mt-3 "
            alt="icon-arrow"
          />
        </form>
        {address && (
          <article className="ipDetails flex justify-center mt-14 ">
            <div className="flex flex-col justify-center gap-4 p-10 bg-white  rounded-[.5rem] ml-4 md:flex-row w-[60%]">
              <div className="text-center md:text-start  md:border-r-2 md:pr-4 ">
                <h2 className="uppercase text-darkGray font-bold text-[0.7rem] tracking-wider ">
                  ip address
                </h2>
                <h3 className="text-veryDarkGray font-bold">{address.ip}</h3>
              </div>

              <div className="text-center md:text-start  md:border-r-2 md:pr-4 ">
                <h2 className="uppercase text-darkGray text-[0.7rem] font-bold tracking-wider ">
                  location
                </h2>
                <h3 className="text-veryDarkGray font-bold">
                  {address.location.city}, {address.location.region}
                </h3>
              </div>
              <div className="text-center md:text-start  md:border-r-2 md:pr-4 ">
                <h2 className="uppercase text-darkGray text-[0.7rem] font-bold tracking-wider ">
                  timezone
                </h2>
                <h3 className="uppercase text-veryDarkGray font-bold">
                  utc{address.location.timezone}
                </h3>
              </div>
              <div className="text-center md:text-start ">
                <h2 className="uppercase text-darkGray text-[0.7rem] font-bold tracking-wider ">
                  isp
                </h2>
                <h3 className="text-veryDarkGray font-bold">{address.isp}</h3>
              </div>
            </div>
          </article>
        )}
      </div>
      {address && (
        <MapContainer
          center={[address.location.lat, address.location.lng]}
          zoom={13}
          scrollWheelZoom={true}
          style={{ height: "500px", width: "100vw" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MarkerPosition address={address} />
        </MapContainer>
      )}
    </section>
  );
}

export default App;

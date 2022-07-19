import { Box, Typography } from "@mui/material";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import React, { useMemo } from "react";
import BreadCumb from "../../../components/breadcumb/BreadCumb";
import Loading from "../../../components/loading/Loading";
import "./map.scss";

const MyMap = () => {
  const pages = [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Map",
      url: "/map",
    },
  ];

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
  });
  const center1 = useMemo(() => ({ lat: 10.853742, lng: 106.628392 }), []);
  const center2 = useMemo(() => ({ lat: 21.021934837783704, lng: 105.83507484472274 }), []);
  return (
    <div>
      {isLoaded ? (
        <Box className="mapWrapper">
          <Box style={{ marginTop: "2rem" }}>
            <BreadCumb pages={pages} color={"#35c0c5"} />
          </Box>
          <Typography variant="h2" mt={2} gutterBottom>
            Map
          </Typography>
          <GoogleMap zoom={5} center={center1} mapContainerClassName="map-container">
            <Marker position={center1} />
            <Marker position={center2} />
          </GoogleMap>
        </Box>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default MyMap;

<<<<<<< HEAD
import React from 'react';

const Map = () => {
  return (
    <div>
      Map
    </div>
  )
=======
import { Box, Typography } from "@mui/material";
import BreadCumb from "../../../components/breadcumb/BreadCumb";
import React from "react";
import "./map.scss";

const Map = () => {
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

  return (
    <Box className="mapWrapper">
      <Box style={{ marginTop: "2rem" }}>
        <BreadCumb pages={pages} color={"#35c0c5"}/>
      </Box>
      <Typography variant="h2" mt={2} gutterBottom>
        Map
      </Typography>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.443661450985!2d106.625639715092!3d10.85382109226903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752bee0b0ef9e5%3A0x5b4da59e47aa97a8!2zQ8O0bmcgVmnDqm4gUGjhuqduIE3hu4FtIFF1YW5nIFRydW5n!5e0!3m2!1svi!2s!4v1657528600277!5m2!1svi!2s"
        className="map"
      ></iframe>
    </Box>
  );
>>>>>>> 8040eb8b4487dbbc436a6102ca87f507661f33f2
};

export default Map;

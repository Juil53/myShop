import React from "react";
import { Route, Routes } from "react-router-dom";
import { renderRouteUser } from "../../routes/UserRoute";


export default function UserContainer(props) {
  return (
    <>
      <Routes>
        {renderRouteUser()}
      </Routes>
    </>
  );
}

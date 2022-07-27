import { Box, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import UserDelete from "./UserDelete";
import { style } from "./logic";

const ColumnActions = ({ setShow, params,setSeverity }) => {
  return (
    <Box sx={{ display: "flex", gap: "5px" }}>
      <Link to={`/admin/users/edit/${params.row.id}`}>
        <Button sx={style.btnView}>View</Button>
      </Link>
      <UserDelete userId={params.row.id} user={params.row} setShow={setShow} setSeverity={setSeverity}/>
    </Box>
  );
};

export default ColumnActions;

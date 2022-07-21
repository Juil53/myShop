import React from "react";
import CustomerDelete from "./CustomerDelete";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { style } from "./logic";

const CustomerActions = ({ setShow, params }) => {
  return (
    <Box sx={{ display: "flex", gap: "5px" }}>
      <Link to={`/admin/customers/${params.row.id}`}>
        <Button sx={style.btnView}>View</Button>
      </Link>
      <CustomerDelete customerId={params.row.id} customer={params.row} setShow={setShow} />
    </Box>
  );
};

export default CustomerActions;

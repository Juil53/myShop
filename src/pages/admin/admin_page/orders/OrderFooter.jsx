import { Button } from "@mui/material";
import { GridFooter, GridFooterContainer } from "@mui/x-data-grid";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import AlertDialog from "../../../../components/admin/AlertDialog";
import { deleteOrderRequest, getOrderRequest } from "../../../../store/orders/orderSlice";
import { style } from "./logic";

const OrderFooter = ({ ids, setShow }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleDelete = (choose) => {
    if (choose) {
      ids.map((id) => dispatch(deleteOrderRequest(id)));
      dispatch(getOrderRequest());
      setShow(true);
    }
    setOpen(false);
  };

  return (
    <GridFooterContainer>
      <Button
        sx={{ display: ids.length > 0 ? "block" : "none", ...style.btnDelete }}
        style={{ marginLeft: "2rem", padding: "5px" }}
        onClick={() => setOpen(true)}
      >
        Delete All Selected
      </Button>
      <AlertDialog open={open} handleDelete={handleDelete} orders={ids} />
      <GridFooter />
    </GridFooterContainer>
  );
};

export default OrderFooter;

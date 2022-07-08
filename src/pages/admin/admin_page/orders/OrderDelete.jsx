import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { selectStatus } from "../../../../store/orders/selector";
import { deleteOrderRequest, getOrderRequest, resetStatus } from "../../../../store/orders/orderSlice";
import AlertDialog from "../../../../components/admin/AlertDialog";
import SimpleSnackbar from "../../../../components/admin/SimpleSnackbar";

const OrderDelete = ({ orderId, order ,style}) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = (choose) => {
    if (choose) {
      dispatch(deleteOrderRequest(orderId));
      dispatch(getOrderRequest());
      setTimeout(()=>{
        dispatch(resetStatus())
      },2000)
    }
    setOpen(false);
  };

  return (
    <>
      <Button sx={style.btnDelete} onClick={() => setOpen(true)}>
        Delete
      </Button>
      <AlertDialog open={open} handleDelete={handleDelete} order={order} />
    </>
  );
};

export default OrderDelete;

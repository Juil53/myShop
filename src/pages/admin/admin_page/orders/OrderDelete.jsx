import { Button } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import AlertDialog from "../../../../components/admin/AlertDialog";
import { deleteOrderRequest, getOrderRequest, resetStatus } from "../../../../store/orders/orderSlice";

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
      <AlertDialog open={open} handleDelete={handleDelete} order={order || "Deleted All"} />
    </>
  );
};

export default OrderDelete;

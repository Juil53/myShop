import React, { useState } from "react";
import AlertDialog from "../../../../components/admin/AlertDialog";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { style } from "./logic";
import { clientActions } from "../../../../store/clients/slice";

const CustomerDelete = ({ customerId, customer, setShow, setSeverity }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleDelete = (choose) => {
    if (choose) {
      dispatch(clientActions.deleteCustomerRequest(customerId));
      dispatch(clientActions.getCustomersRequest());
      setSeverity({
        type: "success",
        message: "Deleted succesful",
      });
      setShow(true);
    }
    setOpen(false);
  };

  return (
    <>
      <Button sx={style.btnDelete} size="small" color="error" onClick={() => setOpen(true)}>
        Delete
      </Button>
      <AlertDialog open={open} handleDelete={handleDelete} customer={customer} />
    </>
  );
};

export default CustomerDelete;

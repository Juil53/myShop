import { Button } from "@mui/material";
import { GridFooter, GridFooterContainer } from "@mui/x-data-grid";
import { deleteDoc, doc } from "firebase/firestore";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import AlertDialog from "../../../../components/admin/AlertDialog";
import { db } from "../../../../service/auth";
import { clientActions } from "../../../../store/clients/slice";
import { style } from "./logic";

const CustomerFooter = ({ ids, setShow }) => {
  console.log(ids);

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleDelete = (choose) => {
    if (choose) {
      ids.map((id) => dispatch(clientActions.deleteCustomerRequest(id)));
      dispatch(clientActions.getCustomersRequest());
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
      <AlertDialog open={open} handleDelete={handleDelete} customers={ids} />
      <GridFooter />
    </GridFooterContainer>
  );
};

export default CustomerFooter;

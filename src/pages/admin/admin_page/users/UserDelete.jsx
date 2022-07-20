import { Button } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import AlertDialog from "../../../../components/admin/AlertDialog";
import { deleteUserRequest, getUsersRequest } from "../../../../store/users/usersSlice";
import { style } from "./logic";

const UserDelete = ({ userId, user, setShow }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleDelete = (choose) => {
    if (choose) {
      dispatch(deleteUserRequest(userId));
      dispatch(getUsersRequest());
      setShow(true)
    }
    setOpen(false);
  };

  return (
    <>
      <Button sx={style.btnDelete} size="small" color="error" onClick={() => setOpen(true)}>
        Delete
      </Button>
      <AlertDialog open={open} handleDelete={handleDelete} user={user} />
    </>
  );
};

export default UserDelete;

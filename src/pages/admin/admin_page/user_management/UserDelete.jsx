import React, { useState } from "react";
import AlertDialog from "../component/AlertDialog";
import SimpleSnackbar from "../component/SimpleSnackbar";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { deleteUserRequest, getUserPaginationRequest } from "../../../../store/users/usersSlice";
import { selectStatus } from "../../../../store/users/selector";
import { useEffect } from "react";

const UserDelete = ({ userId, user, page }) => {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const deleteStatus = useSelector(selectStatus);

  useEffect(() => {
    if (deleteStatus) {
      setShow(true);
    }
  }, [deleteStatus]);

  const handleDelete = (choose) => {
    if (choose) {
      dispatch(deleteUserRequest(userId));
      dispatch(getUserPaginationRequest({ page }));
    }
    setOpen(false);
  };

  return (
    <>
      <IconButton size="small" color="error" onClick={() => setOpen(true)}>
        <DeleteOutlineOutlinedIcon fontSize="inherit" />
      </IconButton>
      <AlertDialog open={open} handleDelete={handleDelete} user={user} />
      <SimpleSnackbar show={show} setShow={setShow} type="delete"/>
    </>
  );
};

export default UserDelete;

import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AlertDialog from "../../../../components/admin/AlertDialog";
import SimpleSnackbar from "../../../../components/admin/SimpleSnackbar";
import { selectStatus } from "../../../../store/users/selector";
import { deleteUserRequest, getUserRequest } from "../../../../store/users/usersSlice";

const style = {
  btnDelete: { color: "crimson", border: "1px dotted rgba(255, 0, 0, 0.596)", padding: 0 },
};

const UserDelete = ({ userId, user, page }) => {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(true);
  const dispatch = useDispatch();
  const deleteStatus = useSelector(selectStatus);

  useEffect(() => {
    if (deleteStatus) {
      setShow(true);
    }
  }, [deleteStatus]);

  const handleDelete = () => {
    dispatch(deleteUserRequest(userId));
    dispatch(getUserRequest());
    setOpen(false);
  };

  return (
    <>
      <Button sx={style.btnDelete} size="small" color="error" onClick={() => setOpen(true)}>
        Delete
      </Button>
      <AlertDialog open={open} handleDelete={handleDelete} user={user} />
      <SimpleSnackbar show={show} setShow={setShow} type="delete" />
    </>
  );
};

export default UserDelete;

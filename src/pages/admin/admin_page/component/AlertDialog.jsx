import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

export default function AlertDialog({ open, user, product, handleDelete }) {

  const handleCase = () => {
    if (user) return <span style={{ fontWeight: 700, color: "#35c0c5" }}>{user.lastname}?</span>;
    if (product) return <span style={{ fontWeight: 700, color: "#35c0c5" }}>{product.name}?</span>
  }

  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure to delete{" "}
          {handleCase()}
        </DialogTitle>

        <DialogActions>
          <Button
            variant="contained"
            size="small"
            color="error"
            onClick={() => handleDelete(false)}
          >
            No
          </Button>
          <Button
            variant="contained"
            size="small"
            color="success"
            onClick={() => handleDelete(true)}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

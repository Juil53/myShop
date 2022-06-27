import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";

export default function AlertDialog({ message, loading, onDialog }) {
  return (
    <div>
      <Dialog
        open={loading}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Delete 
          <Typography component="span" ml={1} color="secondary">
            {message}
          </Typography>
        </DialogTitle>
        <DialogActions>
          <Button color="error" onClick={() => onDialog(false)}>No</Button>
          <Button color="success" onClick={() => onDialog(true)} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

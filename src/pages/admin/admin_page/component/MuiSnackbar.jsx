import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";
import { useEffect } from "react";

export default function SimpleSnackbar({ openSnackbar }) {
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Deleted Successful!
        </Alert>
      </Snackbar>
    </div>
  );
}

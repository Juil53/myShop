import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";

export default function SimpleSnackbar({ type, show, setShow }) {
  let message;

  switch (type) {
    case "add":
      message = "Add Success!";
      break;
    case "edit":
      message = "Edit Success!";
      break;
    case "delete":
      message = "Delete Success!";
      break;
    default:
      break;
  }

  return (
    <div>
      <Snackbar open={show} autoHideDuration={2000} onClose={() => setShow(false)}>
        <Alert severity="success">
          <span style={{ fontWeight: 700 }}>{message}</span>
        </Alert>
      </Snackbar>
    </div>
  );
}

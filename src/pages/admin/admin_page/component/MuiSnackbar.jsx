import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Alert } from "@mui/material";

export default function SimpleSnackbar({ message, notification, onDialog }) {
  const action = (
    <React.Fragment>
      <IconButton size="small" aria-label="close" color="inherit" onClick={() => onDialog(false)}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        open={notification}
        autoHideDuration={2000}
        onClose={() => onDialog(false)}
        action={action}
      >
        <Alert severity="success">User {message} Deleted!</Alert>
      </Snackbar>
    </div>
  );
}

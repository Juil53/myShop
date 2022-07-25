import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";

function SimpleSnackbar({ type, show, setShow, email }) {
  console.log(email);
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
    case "auth":
      message = email;
      break;
    default:
      break;
  }

  return (
    <div>
      <Snackbar open={show} autoHideDuration={3000} onClose={() => setShow(false)}>
        {type === "auth" && email !== null ? (
          <Alert severity="error">
            <span style={{ fontWeight: 700 }}>{message} is already exist</span>
          </Alert>
        ) : (
          <Alert severity="success">
            <span style={{ fontWeight: 700 }}>{message}</span>
          </Alert>
        )}
      </Snackbar>
    </div>
  );
}
export default React.memo(SimpleSnackbar);

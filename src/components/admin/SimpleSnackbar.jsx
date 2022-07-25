import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";

function SimpleSnackbar({ type, show, setShow, severity }) {
  let message;

  switch (severity?.type) {
    case "success":
      message = severity.message;
      break;
    // case "edit":
    //   message = "Edit Success!";
    //   break;
    // case "delete":
    //   message = "Delete Success!";
    //   break;
    case "error":
      message = severity.message;
      break;
    default:
      break;
  }

  return (
    <div>
      <Snackbar open={show} autoHideDuration={3000} onClose={() => setShow(false)}>
        {severity && (
          <Alert severity={severity.type || "success"}>
            <span style={{ fontWeight: 700 }}>{message}</span>
          </Alert>
        )}
      </Snackbar>
    </div>
  );
}
export default React.memo(SimpleSnackbar);

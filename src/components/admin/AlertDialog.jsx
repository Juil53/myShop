import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { memo } from "react";

const AlertDialog = ({ open, order, orders, user, product, handleDelete, customer, customers }) => {
  const handleCase = () => {
    if (user) return <span style={{ fontWeight: 700, color: "#35c0c5" }}>{user.firstname} {user.lastname}?</span>
    if (product) return <span style={{ fontWeight: 700, color: "#35c0c5" }}>{product.name}?</span>;
    if (order) return <span style={{ fontWeight: 700, color: "#35c0c5" }}>{order.id}?</span>;
    if (orders) return orders.map((item,index) => <span key={index} style={{ fontWeight: 700, color: "#35c0c5" }}>{item}? </span>);
    if (customer) return <span style={{ fontWeight: 700, color: "#35c0c5" }}>{customer.displayName}?</span>;
    if (customers) return <span style={{ fontWeight: 700, color: "#35c0c5" }}>Selected rows?</span>;
  };

  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Are you sure to delete {handleCase()}</DialogTitle>

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
};
export default memo(AlertDialog);

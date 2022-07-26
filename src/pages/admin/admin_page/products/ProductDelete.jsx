import { Button } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import AlertDialog from "../../../../components/admin/AlertDialog";
import {
  deleteProductRequest,
  getAllProductRequest,
} from "../../../../store/admin_product/productSlice";

const style = {
  btnDelete: { color: "crimson", border: "1px dotted rgba(255, 0, 0, 0.596)", padding: 0 },
};

const ProductDelete = ({ product, setShow, setSeverity }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = (choose) => {
    if (choose) {
      dispatch(deleteProductRequest(product.id));
      dispatch(getAllProductRequest());
      setShow(true);
      setSeverity({
        type: "success",
        message: `Delete ${product.id} successful!`,
      });
    }
    setOpen(false);
  };

  return (
    <>
      <Button sx={style.btnDelete} size="small" color="error" onClick={() => setOpen(true)}>
        Delete
      </Button>
      <AlertDialog open={open} handleDelete={handleDelete} product={product} />
    </>
  );
};

export default ProductDelete;

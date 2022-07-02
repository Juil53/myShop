import React, { useState,useEffect } from "react";
import AlertDialog from "../component/AlertDialog";
import SimpleSnackbar from "../component/SimpleSnackbar";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { deleteProductRequest, getProductPaginationRequest } from "../../../../store/admin_product/productSlice";
import { selectStatus } from "../../../../store/admin_product/selector";

const ProductDelete = ({ product, page }) => {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const deleteStatus = useSelector(selectStatus);

  useEffect(() => {
    if (deleteStatus) {
      setShow(true);
    }
  }, [deleteStatus]);

  const handleDelete = (choose) => {
    if (choose) {
      dispatch(deleteProductRequest(product.id));
      dispatch(getProductPaginationRequest({ page }));
    }
    setOpen(false);
  };

  return (
    <>
      <IconButton size="small" color="error" onClick={() => setOpen(true)}>
        <DeleteOutlineOutlinedIcon fontSize="inherit" />
      </IconButton>
      <AlertDialog open={open} handleDelete={handleDelete} product={product} />
      <SimpleSnackbar show={show} setShow={setShow} type="delete"/>
    </>
  );
};

export default ProductDelete;

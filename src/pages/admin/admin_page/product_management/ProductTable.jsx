import * as React from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector, useDispatch } from "react-redux";
import { productSelector } from "../../../../store/products/selector";
import { PRODUCT_ACTIONS } from "../../../../constants";
import {
  CustomizedTableHead,
  CustomizeTableRow,
  CustomizeTableCell,
} from "../../../../styles/styled_components/styledComponent";

export default function ProductTable() {
  
  const dispatch = useDispatch();
  const { allProducts } = useSelector(productSelector);

  React.useEffect(() => {
    dispatch({ type: PRODUCT_ACTIONS.GET_ALL_PRODUCTS });
  }, []);

  const renderTableBody = () => {
    return allProducts.data?.map((product, index) => {
      return (
        <CustomizeTableRow
          key={index}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <CustomizeTableCell align="center">{product.id}</CustomizeTableCell>
          <CustomizeTableCell align="center">{product.name}</CustomizeTableCell>
          <CustomizeTableCell align="center">
            <img
              src={product.image}
              alt="product"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                objectFit: "contain",
              }}
            />
          </CustomizeTableCell>
          <CustomizeTableCell align="center">
            {product.quantity}
          </CustomizeTableCell>
          <CustomizeTableCell align="center">
            {product.price_before_discount}đ
          </CustomizeTableCell>
          <CustomizeTableCell align="center">
            <IconButton
              size="small"
              sx={{ color: "error.light" }}
              onClick={() => {
                window.alert("Are you sure?");
                // handleDelete(user.id);
              }}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              size="small"
              sx={{ color: "info.dark" }}
              onClick={() => {
                // handleGetUserInfo(user);
              }}
            >
              <EditIcon fontSize="inherit" />
            </IconButton>
          </CustomizeTableCell>
        </CustomizeTableRow>
      );
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <CustomizedTableHead>
          <TableRow>
            <CustomizeTableCell align="center">ID</CustomizeTableCell>
            <CustomizeTableCell align="center">PRODUCT NAME</CustomizeTableCell>
            <CustomizeTableCell align="center">IMAGE</CustomizeTableCell>
            <CustomizeTableCell align="center">QUANTITY</CustomizeTableCell>
            <CustomizeTableCell align="center">PRICE</CustomizeTableCell>
            <CustomizeTableCell align="center">ACTION</CustomizeTableCell>
          </TableRow>
        </CustomizedTableHead>
        <TableBody>{renderTableBody()}</TableBody>
      </Table>
    </TableContainer>
  );
}

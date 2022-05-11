import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/material/styles";

import { useSelector, useDispatch } from "react-redux";
import { productActions } from "../../../../store/products/actions";

const CustomizeTableRow = styled(TableRow)`
  background-color: #fff;
  transition: all 200ms;
  :hover {
    background-color: #bdcbdb;
  }
`;

export default function ProductTable() {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.products.products.data);

  React.useEffect(() => {
    dispatch(productActions.getAllProduct());
  }, []);

  const renderTableBody = () => {
    return productData?.map((product, index) => {
      return (
        <CustomizeTableRow
          key={index}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <TableCell align="left">{product.id}</TableCell>
          <TableCell align="left">{product.name}</TableCell>
          <TableCell align="left">
            <img
              src={product.image}
              alt="product"
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                objectFit: "contain",
              }}
            />
          </TableCell>
          <TableCell align="center">{product.quantity}</TableCell>
          <TableCell align="center">{product.price_before_discount}$</TableCell>
          <TableCell align="center">
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
          </TableCell>
        </CustomizeTableRow>
      );
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="left">PRODUCT NAME</TableCell>
            <TableCell align="left">IMAGE</TableCell>
            <TableCell align="center">QUANTITY</TableCell>
            <TableCell align="center">PRICE</TableCell>
            <TableCell align="center">ACTION</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{renderTableBody()}</TableBody>
      </Table>
    </TableContainer>
  );
}

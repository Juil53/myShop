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
import {
  fetchHotProduct,
  productActions,
} from "../../../../store/products/actions";

//Styled Component
const CustomizedTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));

const CustomizeTableRow = styled(TableRow)(({ theme }) => ({
  transition: "all 100ms",
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
    "& .MuiTableCell-root": {
      color: "#Fff",
    },
  },

  "&:last-child td, &:last-child th": {
    border: "1px dashed gray !important",
  },
}));

const CustomizeTableCell = styled(TableCell)(({ theme }) => ({
  border: "1px dashed gray",
  padding: 3,
}));

export default function ProductTable() {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.products.product.data);
  console.log(productData);

  React.useEffect(() => {
    dispatch(fetchHotProduct());
  }, []);

  const renderTableBody = () => {
    return productData?.map((product, index) => {
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

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { rows } from "../customer_management/transaction";

const status = {
  "&.Successed": {
    backgroundColor: "rgba(0, 128, 0, 0.2)",
    color: "green",
  },
  "&.Pending": {
    backgroundColor: "rgba(218, 165, 32, 0.2)",
    color: "goldenrod",
  },
  "&.Failed": {
    backgroundColor: "rgba(255, 0, 0, 0.2)",
    color: "crimson",
  },
};

export default function List() {
  return (
    <>
      <Typography color="text.disabled" fontSize="2rem" my={2}>Transactions</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="center">Image</TableCell>
              <TableCell align="center">Product</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Payment Method</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={`row_${index}`}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="center">
                  {row.items.map((item, i) => (
                    <div key={i}>
                      <img
                        src={item.image[0]}
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                          marginRight: "5px",
                        }}
                      />
                    </div>
                  ))}
                </TableCell>
                <TableCell align="center">
                  {row.items.map((item, i) => (
                    <div key={i}>
                      <Typography>{item.name}</Typography>
                    </div>
                  ))}
                </TableCell>
                <TableCell align="center">
                  {row.items.map((item, i) => (
                    <Typography key={i}>{item.quantity}</Typography>
                  ))}
                </TableCell>
                <TableCell align="center">{row.date}</TableCell>
                <TableCell align="center">{row.paymentMethod}</TableCell>
                <TableCell align="center">
                  <Typography className={`${row.status}`} sx={status}>
                    {row.status}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

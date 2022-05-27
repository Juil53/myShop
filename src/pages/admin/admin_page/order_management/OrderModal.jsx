import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import DoneIcon from "@mui/icons-material/Done";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import ErrorIcon from "@mui/icons-material/Error";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../../../store/orders/orderSlice";
import {
  selectModalOpen,
  selectOrderDetail,
} from "../../../../store/orders/selector";
import { Divider, Grid, IconButton, Stack } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "700px",
  height:"500px",
  overflow:'scroll',
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 8,
  p: 2,
};

const statusStyle = (orderDetail) => ({
  color: statusColors[orderDetail.status] ?? "#000",
  fontWeight: 700,
});

const title = {
  fontWeight: 500,
};

// Format currency
const formatter = new Intl.NumberFormat("vn-VN", {
  style: "currency",
  currency: "VND",
});

//STATUS COLOR
const statusColors = {
  Successed: "#689f38",
  Pending: "#0288d1",
  Failed: "#c2185b",
};

//STATUS ICON
const statusIcon = (status) => {
  switch (status) {
    case "Successed":
      return (
        <DoneIcon
          fontSize="small"
          sx={{ verticalAlign: "middle", marginRight: 1 }}
        />
      );
    case "Pending":
      return (
        <AutorenewIcon
          fontSize="small"
          sx={{ verticalAlign: "middle", marginRight: 1 }}
        />
      );
    case "Failed":
      return (
        <ErrorIcon
          fontSize="small"
          sx={{ verticalAlign: "middle", marginRight: 1 }}
        />
      );
    default:
      break;
  }
};

const OrderModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectModalOpen);
  const orderDetail = useSelector(selectOrderDetail);
  const handleClose = () => dispatch(closeModal());

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                Order Detail
              </Typography>
            </Grid>
            <Grid item>
              <IconButton onClick={handleClose}>
                <CloseIcon color="secondary"/>
              </IconButton>
            </Grid>
          </Grid>

          {orderDetail && (
            <>
              <Stack direction="row">
                <Typography sx={statusStyle(orderDetail)}>
                  {statusIcon(orderDetail.status)}
                </Typography>
                <Typography sx={statusStyle(orderDetail)}>
                  {orderDetail.status}
                </Typography>
              </Stack>

              <Grid container spacing={1} mt={1}>
                {/* Key */}
                <Grid item xs={3}>
                  <Divider sx={{ my: 1 }} />
                  <Typography sx={title}>Order Id</Typography>
                  <Typography sx={title}>Email</Typography>
                  <Typography sx={title}>Name</Typography>
                  <Typography sx={title}>Phone</Typography>
                  <Typography sx={title}>Address</Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography sx={title}>Payment Method</Typography>
                  <Typography sx={title}>Shipment Method</Typography>
                  <Typography sx={title}>Shipment Fee</Typography>
                  <Typography sx={title}>Discount</Typography>
                  <Typography sx={title}>Total</Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography sx={title}>Items</Typography>
                </Grid>
                {/* Value */}
                <Grid item xs={9}>
                  <Divider sx={{ my: 1 }} />
                  <Typography>{orderDetail.id}</Typography>
                  <Typography>Email</Typography>
                  <Typography>{orderDetail.address.name}</Typography>
                  <Typography>{orderDetail.address.phone}</Typography>
                  <Typography>
                    <LocationOnIcon
                      fontSize="small"
                      color="secondary"
                      sx={{ verticalAlign: "middle" }}
                    />
                    {orderDetail.address.location}
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography>{orderDetail.paymentMethod}</Typography>
                  <Typography>{orderDetail.shipmentMethod.name}</Typography>
                  <Typography>
                    {formatter.format(orderDetail.shipmentMethod.fee)}
                  </Typography>
                  <Typography sx={title}>
                    {orderDetail.totalBeforeDiscount -
                      orderDetail.totalAfterDiscount}
                  </Typography>
                  <Typography sx={title} color="error" fontWeight={700}>
                    {formatter.format(orderDetail.totalAfterDiscount)}
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  {orderDetail.items.map((item, index) => {
                    return (
                      <React.Fragment key={index}>
                        {item.image.map((img, index) => {
                          return (
                            <React.Fragment key={index}>
                              <Grid container spacing={1}>
                                <Grid item xs={3}>
                                  <img
                                    src={img}
                                    style={{
                                      width: "80%",
                                      marginRight: "1rem",
                                    }}
                                  />
                                </Grid>
                                <Grid item xs={9}>
                                  <Typography>{item.name}</Typography>
                                  <Typography>
                                    Price:{" "}
                                    {formatter.format(item.priceBeforeDiscount)}
                                  </Typography>
                                  <Typography>
                                    Quantity: {item.quantity}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </React.Fragment>
                          );
                        })}
                      </React.Fragment>
                    );
                  })}
                </Grid>
              </Grid>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default OrderModal;

import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SimpleSnackbar from "../../../../../components/admin/SimpleSnackbar";
import {
  closeModal,
  getOrderRequest,
  updateOrderDetail,
} from "../../../../../store/orders/orderSlice";
import { selectModalOpen, selectOrderDetail } from "../../../../../store/orders/selector";
import { CustomBox, CustomSelect } from "../../../../../styles/styled_components/styledComponent";
import { formatter } from "../../../../../utils";
import { statusColors, title } from "./OrderModalStyle";
import StatusIcons from "./StatusIcons";

const OrderModal = () => {
  const dispatch = useDispatch();

  const isOpen = useSelector(selectModalOpen);
  const orderDetail = useSelector(selectOrderDetail);

  const [show, setShow] = useState(false);
  const [order, setOrder] = useState({});
  const [severity, setSeverity] = useState({
    type: "",
    message: "",
  });

  const handleClose = () => dispatch(closeModal());

  const handleChange = (event) => {
    setOrder({ ...order, status: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateOrderDetail(order));
    dispatch(getOrderRequest());
    dispatch(closeModal());
    setSeverity({
      type: "success",
      message: `Edit Order ${orderDetail.id} Successful`,
    });
    setShow(true);
  };

  useEffect(() => {
    setOrder(orderDetail);
  }, [orderDetail]);

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{
          position: "absolute",
        }}
      >
        <CustomBox
          sx={{
            position: "absolute",
            top: "5S0%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            padding: 5,
            height: 700,
            overflowY: "auto",
          }}
        >
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                Order Detail
              </Typography>
            </Grid>
            <Grid item>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>

          {order && (
            <Box sx={{}}>
              <Stack direction="row">
                <FormControl sx={{ mt: 1 }}>
                  <InputLabel
                    id="demo-simple-select-label"
                    sx={{ "&.Mui-focused": { color: "secondary.dark" } }}
                  >
                    Status
                  </InputLabel>
                  <CustomSelect
                    name="status"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    size="small"
                    label="Status"
                    value={order.status}
                    onChange={handleChange}
                    sx={{
                      color: statusColors[order.status] ?? "#000",
                      fontWeight: 700,
                    }}
                  >
                    <MenuItem
                      value="Successful"
                      sx={{
                        color: statusColors.Successful ?? "#000",
                        fontWeight: 700,
                      }}
                    >
                      <StatusIcons status="Successful" />
                    </MenuItem>
                    <MenuItem
                      value="Failed"
                      sx={{
                        color: statusColors.Failed ?? "#000",
                        fontWeight: 700,
                      }}
                    >
                      <StatusIcons status="Failed" />
                    </MenuItem>
                    <MenuItem
                      value="Pending"
                      sx={{
                        color: statusColors.Pending ?? "#000",
                        fontWeight: 700,
                      }}
                    >
                      <StatusIcons status="Pending" />
                    </MenuItem>
                  </CustomSelect>
                </FormControl>
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
                  <Typography sx={title}>Payment Status</Typography>
                  <Typography sx={title}>Shipment Method</Typography>
                  <Typography sx={title}>Shipment Fee</Typography>
                  <Typography sx={title}>Total</Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography sx={title}>Items</Typography>
                </Grid>
                {/* Value */}
                <Grid item xs={9}>
                  <Divider sx={{ my: 1 }} />
                  <Typography>{order.id}</Typography>
                  <Typography>{order.email}</Typography>
                  <Typography>{order.deliveryAddress?.name}</Typography>
                  <Typography>{order.deliveryAddress?.phoneNumber}</Typography>
                  <Typography>
                    <LocationOnIcon fontSize="small" sx={{ verticalAlign: "middle" }} />
                    {order.deliveryAddress?.address.detail}{" "}
                    {order.deliveryAddress?.address.district.name}{" "}
                    {order.deliveryAddress?.address.region.name}{" "}
                    {order.deliveryAddress?.address.ward.name}
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography>{order.payment?.name}</Typography>
                  <Typography>{order.payment?.status}</Typography>
                  <Typography>{order.shippingMethod?.shippingMethod || "Data thiếu nè"}</Typography>
                  <Typography>{formatter.format(order.shippingMethod?.shippingFee)}</Typography>
                  <Typography sx={title} color="error" fontWeight={700}>
                    {formatter.format(order.totalAmount)}
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  {order.items?.map((item, index) => {
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
                                    alt="product"
                                  />
                                </Grid>
                                <Grid item xs={9}>
                                  <Typography>{item.name}</Typography>
                                  <Typography>
                                    Price: {formatter.format(item.priceBeforeDiscount)}
                                  </Typography>
                                  <Typography>Quantity: {item.quantity}</Typography>
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
              <Button variant="contained" size="small" color="success" onClick={handleSubmit}>
                Update
              </Button>
            </Box>
          )}
        </CustomBox>
      </Modal>
      <SimpleSnackbar show={show} setShow={setShow} severity={severity} />
    </div>
  );
};

export default OrderModal;

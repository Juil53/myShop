import { ThemeContext } from "@emotion/react";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, updateOrderDetail } from "../../../../../store/orders/orderSlice";
import { selectModalOpen, selectOrderDetail } from "../../../../../store/orders/selector";
import { CustomBox, CustomSelect } from "../../../../../styles/styled_components/styledComponent";
import { statusColors, statusStyle, title } from "./OrderModalStyle";
import StatusIcons from "./StatusIcons";

const OrderModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectModalOpen);
  const orderDetail = useSelector(selectOrderDetail);
  const [order, setOrder] = useState({ status: "" });
  const handleClose = () => dispatch(closeModal());

  // Format currency
  const formatter = new Intl.NumberFormat("vn-VN", {
    style: "currency",
    currency: "VND",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setOrder({
      ...order,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (orderDetail !== null) return dispatch(updateOrderDetail(order)), dispatch(closeModal());
  };

  useEffect(() => {
    if (orderDetail) {
      setOrder(orderDetail);
    } else {
      setOrder({
        status: "",
      });
    }
  }, [orderDetail]);

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <CustomBox>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                Order Detail
              </Typography>
            </Grid>
            <Grid item>
              <IconButton onClick={handleClose}>
                <CloseIcon color="secondary" />
              </IconButton>
            </Grid>
          </Grid>

          {orderDetail && (
            <>
              <Stack direction="row">
                <Typography sx={statusStyle(orderDetail)}></Typography>

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
                      value="Successed"
                      sx={{
                        color: statusColors.Successed ?? "#000",
                        fontWeight: 700,
                      }}
                    >
                      <StatusIcons status="Successed" />
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
                  <Typography>{formatter.format(orderDetail.shipmentMethod.fee)}</Typography>
                  <Typography sx={title}>
                    {orderDetail.totalBeforeDiscount - orderDetail.totalAfterDiscount}
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
                Submit
              </Button>
            </>
          )}
        </CustomBox>
      </Modal>
    </div>
  );
};

export default OrderModal;

const statusStyle = (orderDetail) => ({
  color: statusColors[orderDetail.status] ?? "#000",
  fontWeight: 700,
});

const title = {
  fontWeight: 500,
};

const statusColors = {
  Successed: "#689f38",
  Pending: "#0288d1",
  Failed: "#c2185b",
};



export { statusStyle, title, statusColors };

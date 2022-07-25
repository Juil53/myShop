const statusStyle = (orderDetail) => ({
  color: statusColors[orderDetail.status] ?? "#000",
  fontWeight: 700,
});

const title = {
  fontWeight: 500,
};

const statusColors = {
  Successful: "#689f38",
  Pending: "#daa520",
  Failed: "#c2185b",
};

export { statusStyle, title, statusColors };

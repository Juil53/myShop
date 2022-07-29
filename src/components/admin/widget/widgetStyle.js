export const style = {
  cardStyle: {
    transform: "translateY(0)",
    transition: "all 300ms",
    "&:hover": {
      cursor: "pointer",
      boxShadow: "4px 6px 30px 1px rgba(0,0,0,0.59)",
      transform: "translateY(-5px)",
    },
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: "2rem",
    fontWeight: "400",
    color: "text.secondary",
  },
  numberText: {
    fontSize: "3.5rem",
    fontWeight: "500",
    color: "text.primary",
  },
  action:{
    justifyContent: "space-between"
  }
};
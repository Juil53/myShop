import {
  Box,
  Drawer,
  ListItemButton,
  Pagination,
  Select,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { NavLink } from "react-router-dom";
const drawerWidth = "25rem";

//Styled Component
const CustomizedTableHead = styled(TableHead)(({ theme }) => ({
  "& .MuiTableCell-root": {
    color: theme.palette.primary.main,
  },
}));

const CustomizeTableRow = styled(TableRow)(({ theme }) => ({
  transition: "all 100ms",
  "& .MuiTableCell-root": {
    padding: 5,
  },
}));

const CustomizedListItemButton = styled(ListItemButton)(({ theme }) => ({
  color: "#e6eaf3",
  transition: "all 200ms ease",
  "&:hover": {
    "&.MuiButtonBase-root": {
      color: theme.palette.primary.dark,
      fontWeight: 900,
      borderLeft: "8px solid",
      backgroundColor: "#e6eaf3",
      borderColor: "#e6eaf3",
      borderRight: "1px solid",
    },
    "& .MuiTypography-root": {
      fontWeight: 900,
    },
    "& .MuiListItemIcon-root": {
      color: theme.palette.primary.dark,
    },
  },
}));

const CustomizeToolbar = styled(Toolbar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
}));

const CustomeNavlink = styled(NavLink)(({ theme }) => ({
  "&.active > div": {
    color: theme.palette.primary.main,
    borderRight: "1px solid",
    borderColor: theme.palette.primary.dark,
    backgroundColor: "#e6eaf3",
    "& .MuiTypography-root": {
      fontSize: "1.8rem",
      fontWeight: 900,
    },
    "& .MuiListItemIcon-root": {
      color: theme.palette.primary.main,
    },
  },
}));

const CustomDrawer = styled(Drawer)(({ theme }) => ({
  display: { xs: "block" },
  "& .MuiDrawer-paper": {
    boxSizing: "border-box",
    width: drawerWidth,
  },
}));

const TextFieldCustom = styled(TextField)(({ theme }) => ({
  "& .MuiFormLabel-root.MuiInputLabel-root.Mui-focused": {
    color: theme.palette.primary.dark,
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.dark,
    },
  },
}));

const CustomPagination = styled(Pagination)(({ theme }) => ({
  "& .MuiButtonBase-root.MuiPaginationItem-root.Mui-selected": {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
  },
}));

const CustomSelect = styled(Select)(({ theme }) => ({
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
  },
}));

const CustomBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "800px",
  overflowY: "scroll",
  backgroundColor: theme.palette.background.paper,
  border: "1px solid lightgray",
  padding: "2rem",
}));

export {
  CustomizedTableHead,
  CustomizeTableRow,
  CustomizedListItemButton,
  CustomizeToolbar,
  CustomeNavlink,
  CustomDrawer,
  TextFieldCustom,
  CustomPagination,
  CustomSelect,
  CustomBox,
};

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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { NavLink } from "react-router-dom";
const drawerWidth = "25rem";

//Styled Component
const CustomizedTableHead = styled(TableHead)(({ theme }) => ({
  "& .MuiTableCell-root": {
    color: theme.palette.secondary.main,
  },
}));

const CustomizeTableRow = styled(TableRow)(({ theme }) => ({
  transition: "all 100ms",
  "& .MuiTableCell-root": {
    padding: 5,
  },
}));

const CustomizedListItemButton = styled(ListItemButton)(({ theme }) => ({
  transition: "all 200ms ease",
  "&:hover": {
    "&.MuiButtonBase-root": {
      color: theme.palette.secondary.dark,
      fontWeight: 900,
      borderLeft: "8px solid",
      borderColor: theme.palette.secondary.dark,
    },
    "& .MuiTypography-root": {
      fontWeight: 900,
    },
    "& .MuiListItemIcon-root": {
      color: theme.palette.secondary.dark,
    },
  },
}));

const CustomizeToolbar = styled(Toolbar)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.dark,
}));

const CustomeNavlink = styled(NavLink)(({ theme }) => ({
  "&.active > div": {
    color: theme.palette.secondary.dark,
    borderLeft: "8px solid",
    borderColor: theme.palette.secondary.dark,
    "& .MuiTypography-root": {
      fontSize: "1.7rem",
      fontWeight: 900,
    },
    "& .MuiListItemIcon-root": {
      color: theme.palette.secondary.dark,
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
    color: theme.palette.secondary.dark,
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.secondary.dark,
    },
  },
}));

const CustomPagination = styled(Pagination)(({ theme }) => ({
  "& .MuiButtonBase-root.MuiPaginationItem-root.Mui-selected": {
    backgroundColor: theme.palette.secondary.dark,
    color: "#fff",
  },
}));

const CustomSelect = styled(Select)(({ theme }) => ({
  "& .MuiInputBase-root.MuiOutlinedInput-root.MuiSelect-root.Mui-focused": {
    borderColor: theme.palette.secondary.dark,
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
  CustomBox
};

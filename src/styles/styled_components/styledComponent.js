import {
  Drawer,
  ListItemButton,
  Pagination,
  TableCell,
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
    // border: "1px solid",
  },
}));

const CustomizeTableRow = styled(TableRow)(({ theme }) => ({
  transition: "all 100ms",
  "& .MuiTableCell-root": {
    padding:5,
  },
  // "&:hover": {
  //   backgroundColor: theme.palette.secondary.main,
  //   "& .MuiTableCell-root": {
  //     color: "#fff",
  //   },
  // },

  // "&:last-child td, &:last-child th": {
  //   border: "1px solid gray !important",
  // },
}));

const CustomizeTableCell = styled(TableCell)(({ theme }) => ({
  // border: "1px solid gray",
  // padding: 5,
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
  "& .MuiToolbar-root": {
    // backgroundColor: theme.palette.secondary.dark,
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

export {
  CustomizedTableHead,
  CustomizeTableRow,
  CustomizeTableCell,
  CustomizedListItemButton,
  CustomizeToolbar,
  CustomeNavlink,
  CustomDrawer,
  TextFieldCustom,
  CustomPagination,
};

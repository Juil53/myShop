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
  backgroundColor: theme.palette.primary.main,
}));

const CustomizeTableRow = styled(TableRow)(({ theme }) => ({
  transition: "all 100ms",
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
    "& .MuiTableCell-root": {
      color: "#Fff",
    },
  },

  "&:last-child td, &:last-child th": {
    border: "1px dashed gray !important",
  },
}));

const CustomizeTableCell = styled(TableCell)(({ theme }) => ({
  border: "1px dashed gray",
  padding: 3,
}));

const CustomizedListItemButton = styled(ListItemButton)(({ theme }) => ({
  "&.MuiButtonBase-root": {
    color: theme.palette.secondary.dark,
  },
  "& .MuiListItemIcon-root": {
    color: theme.palette.secondary.dark,
  },

  "&:hover": {
    "&.MuiButtonBase-root": {
      backgroundColor: theme.palette.secondary.dark,
      color: "#fff",
    },
    "& .MuiListItemIcon-root": {
      color: "#Fff",
    },
  },
}));

const CustomizeToolbar = styled(Toolbar)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.dark,
}));

const CustomeNavlink = styled(NavLink)(({ theme }) => ({
  "&.active > div": {
    backgroundColor: theme.palette.secondary.dark,
    color: "#fff",
    "& .MuiListItemIcon-root": {
      color: "#fff",
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
    backgroundColor: theme.palette.secondary.dark,
  },
}));

const SearchField = styled(TextField)(({ theme }) => ({
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
  SearchField,
  CustomPagination,
};

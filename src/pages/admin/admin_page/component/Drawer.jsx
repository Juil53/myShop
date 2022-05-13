import * as React from "react";
import { Link } from "react-router-dom";
import {
  Drawer,
  List,
  ListItemText,
  ListItemIcon,
  Toolbar,
  AppBar,
  Typography,
  Box,
  ListItemButton,
  Collapse,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

const drawerWidth = "30rem";

//Styled Component
const CustomizedListItemButton = styled(ListItemButton)(({ theme }) => ({
  "&:hover": {
    "&.MuiButtonBase-root": {
      color: theme.palette.primary.light,
    },
    "& .MuiListItemIcon-root": {
      color: theme.palette.primary.light,
    },
  },
}));

function MyDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const container =
    window !== undefined ? () => window().document.body : undefined;
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [open, setOpen] = React.useState(true);
  const handleClick = () => {
    setOpen(!open);
  };

  const itemList = [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      href: "/admin/dashboard",
    },
    {
      text: "User Management",
      icon: <AccountCircleIcon />,
      href: "/admin/user-management",
    },
  ];

  const nestedList = [
    {
      text: "Product List",
      icon: <FormatListBulletedIcon />,
      href: "/admin/product-management",
    },
    {
      text: "Add Product",
      icon: <AddIcon />,
      href: "/admin/add-product",
    },
  ];

  const drawer = (
    <Box>
      <Toolbar className="adminToolbar">
        <Typography variant="h3">Bershka</Typography>
      </Toolbar>
      <List>
        {itemList.map((item, index) => {
          const { text, icon, href } = item;
          return (
            <Link to={href} key={index}>
              <CustomizedListItemButton>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </CustomizedListItemButton>
            </Link>
          );
        })}

        <CustomizedListItemButton onClick={handleClick}>
          <ListItemIcon>
            <LibraryBooksIcon />
          </ListItemIcon>
          <ListItemText primary="Product Management" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </CustomizedListItemButton>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List>
            {nestedList.map((nestedPage, index) => {
              const { text, icon, href } = nestedPage;
              return (
                <Link to={href} key={index}>
                  <CustomizedListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={text} />
                  </CustomizedListItemButton>
                </Link>
              );
            })}
          </List>
        </Collapse>
      </List>
    </Box>
  );

  return (
    <Box>
      {/* Header */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default MyDrawer;

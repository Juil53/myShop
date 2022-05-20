import * as React from "react";
import {
  List,
  ListItemText,
  ListItemIcon,
  Toolbar,
  AppBar,
  Box,
  Collapse,
} from "@mui/material";
import {
  CustomizedListItemButton,
  CustomizeToolbar,
  CustomeNavlink,
  CustomDrawer,
} from "../../../../styles/styled_components/styledComponent";

import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

const drawerWidth = "25rem";

//Sx className Style
const header = {
  width: { sm: `calc(100% - ${drawerWidth}px)` },
  ml: { sm: `${drawerWidth}px` },
};

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
  ];

  const nestedUserList = [
    {
      text: "List User",
      icon: <AccountCircleIcon />,
      href: "/admin/user-management",
    },
    {
      text: "Add User",
      icon: <AddIcon />,
      href: "/admin/add-user",
    },
  ]

  const nestedProductList = [
    {
      text: "List Product",
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
      {/* Drawer Header Txt*/}
      <Toolbar className="adminToolbar">
        <img
          src="/img/logomyShop.png"
          alt="logo"
          style={{ width: "100%", height: "100%" }}
        />
      </Toolbar>

      {/* List Page */}
      <List>
        {itemList.map((item, index) => {
          const { text, icon, href } = item;
          return (
            <CustomeNavlink to={href} key={index}>
              <CustomizedListItemButton>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </CustomizedListItemButton>
            </CustomeNavlink>
          );
        })}
        {/* End List Page */}

        {/* Nested User Button */}
        <CustomizedListItemButton onClick={handleClick}>
          <ListItemIcon>
            <SupervisorAccountIcon />
          </ListItemIcon>
          <ListItemText primary="User" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </CustomizedListItemButton>
        {/* End Nested Button */}

        {/* Nested User Page */}
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List>
            {nestedUserList.map((nestedPage, index) => {
              const { text, icon, href } = nestedPage;
              return (
                <CustomeNavlink to={href} key={index}>
                  <CustomizedListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={text} />
                  </CustomizedListItemButton>
                </CustomeNavlink>
              );
            })}
          </List>
        </Collapse>
        {/* End Nested User Page */}

        {/* Nested Product Button */}
        <CustomizedListItemButton onClick={handleClick}>
          <ListItemIcon>
            <LibraryBooksIcon />
          </ListItemIcon>
          <ListItemText primary="Product" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </CustomizedListItemButton>
        {/* End Nested Button */}

        {/* Nested Product Page */}
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List>
            {nestedProductList.map((nestedPage, index) => {
              const { text, icon, href } = nestedPage;
              return (
                <CustomeNavlink to={href} key={index}>
                  <CustomizedListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={text} />
                  </CustomizedListItemButton>
                </CustomeNavlink>
              );
            })}
          </List>
        </Collapse>
        {/* End Nested Page */}
      </List>
    </Box>
  );

  return (
    <Box>
      {/* Header */}
      <AppBar className="header" position="fixed" sx={header}>
        <CustomizeToolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        </CustomizeToolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <CustomDrawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {drawer}
        </CustomDrawer>
      </Box>
    </Box>
  );
}

export default MyDrawer;

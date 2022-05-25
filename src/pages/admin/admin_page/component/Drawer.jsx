import * as React from "react";
import {
  List,
  ListItemText,
  ListItemIcon,
  Toolbar,
  AppBar,
  Box,
  Divider,
  Avatar,
  Stack,
  Typography,
  Badge,
} from "@mui/material";
import {
  CustomizedListItemButton,
  CustomizeToolbar,
  CustomeNavlink,
  CustomDrawer,
} from "../../../../styles/styled_components/styledComponent";

import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import MailIcon from "@mui/icons-material/Mail";

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
    {
      text: "User",
      icon: <AccountBoxIcon />,
      href: "/admin/user-management",
    },
    {
      text: "Product",
      icon: <FormatListBulletedIcon />,
      href: "/admin/product-management",
    },
    {
      text: "Orders",
      icon: <LocalGroceryStoreIcon />,
      href: "/admin/order-management",
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
      <Divider />
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
              <Divider />
            </CustomeNavlink>
          );
        })}
        {/* End List Page */}
      </List>
    </Box>
  );

  return (
    <Box>
      {/* Header */}
      <AppBar className="header" position="fixed" sx={header}>
        <CustomizeToolbar
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Stack spacing={8} direction="row" alignItems="center">
            <Typography variant="h6" fontWeight={700}>Hello! Tom</Typography>
            <Badge badgeContent={4} color="error">
              <MailIcon color="#fff" />
            </Badge>
            <Avatar alt="Remy Sharp" src="/img/avatar2.jpg" />
          </Stack>
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

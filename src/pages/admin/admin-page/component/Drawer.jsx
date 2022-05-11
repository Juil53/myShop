import * as React from "react";
import { Link } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Toolbar,
  AppBar,
  Typography,
  Box,
  CssBaseline,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

const drawerWidth = "25rem";

function MyDrawer(props) {
  const { history } = props;
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const container =
    window !== undefined ? () => window().document.body : undefined;
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const itemList = [
    {
      text: "Dashboard",
      icon: <DashboardIcon/>,
      onClick: () => history.push("/admin/dashboard"),
      href: "/admin/dashboard",
    },
    {
      text: "User Management",
      icon: <AccountCircleIcon/>,
      onClick: () => history.push("/admin/user-management"),
      href: "/admin/user-management",
    },
    {
      text: "Product Management",
      icon: <LibraryBooksIcon/>,
      onClick: () => history.push("/admin/product-management"),
      href: "/admin/product-management",
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
              <ListItem button>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            </Link>
          );
        })}
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

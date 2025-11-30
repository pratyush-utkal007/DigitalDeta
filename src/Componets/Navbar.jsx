import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Tooltip,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

export default function Navbar() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [scrolled, setScrolled] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  // ✅ Detect scroll to toggle background & text color
  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Listen for Firebase auth state changes
  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const toggleDrawer = (open) => () => setDrawerOpen(open);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    handleMenuClose();
    navigate("/");
  };

  // Navigation pages
  const pages = ["Home", "About", "Services", "Career", "Contact"];

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          background: scrolled ? "#ffffff" : "transparent",
          transition: "background 0.4s ease, box-shadow 0.3s ease",
          boxShadow: scrolled ? "0 2px 10px rgba(0,0,0,0.15)" : "none",
          backdropFilter: scrolled ? "none" : "blur(8px)",
          zIndex: 1200,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, md: 4 } }}>
          {/* ✅ Logo */}
          <Box
            component="img"
            src="images/logo.png"
            alt="Digital Deta Logo"
            onClick={() => navigate("/")}
            sx={{
              height: 60,
              cursor: "pointer",
              transition: "transform 0.3s ease",
              "&:hover": { transform: "scale(1.05)" },
            }}
          />

          {/* ✅ Desktop Navigation */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                component={Link}
                to={page === "Home" ? "/" : `/${page.toLowerCase()}`}
                sx={{
                  color: scrolled ? "#000000" : "#ffffff",
                  textTransform: "capitalize",
                  mx: 1,
                  fontWeight: 500,
                  transition: "color 0.3s ease",
                  "&:hover": { color: "#0d3b66" },
                }}
              >
                {page}
              </Button>
            ))}

            {/* ✅ Avatar or Login Icon */}
            {user ? (
              <>
                <IconButton onClick={handleMenuOpen} sx={{ ml: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: "#0d3b66",
                      width: 40,
                      height: 40,
                      fontSize: 16,
                    }}
                  >
                    {user.email ? user.email[0].toUpperCase() : "U"}
                  </Avatar>
                </IconButton>

                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                >
                  <MenuItem disabled>
                    <Box component="span" sx={{ fontSize: "0.875rem" }}>
                      {user.email}
                    </Box>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
                </Menu>
              </>
            ) : (
              <Tooltip title="Login" arrow>
                <IconButton
                  component={Link}
                  to="/login"
                  sx={{
                    ml: 2,
                    backgroundColor: "#0d3b66",
                    color: "#fff",
                    borderRadius: "50%",
                    p: 1.2,
                    "&:hover": { backgroundColor: "#ff2d2f" },
                  }}
                >
                  <PersonOutlineIcon fontSize="medium" />
                </IconButton>
              </Tooltip>
            )}
          </Box>

          {/* ✅ Mobile Menu Button */}
          <IconButton
            sx={{
              display: { xs: "flex", md: "none" },
              color: scrolled ? "#000000" : "#ffffff",
            }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* ✅ Mobile Drawer Menu */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: { width: 240, backgroundColor: "#f9f9f9" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
          }}
        >
          <Box
            component="img"
            src="images/logo.png"
            alt="Logo"
            sx={{ height: 40, cursor: "pointer" }}
            onClick={() => {
              navigate("/");
              setDrawerOpen(false);
            }}
          />
          <IconButton onClick={toggleDrawer(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider />

        <List>
          {pages.map((page) => (
            <ListItem
              button
              key={page}
              component={Link}
              to={page === "Home" ? "/" : `/${page.toLowerCase()}`}
              onClick={() => setDrawerOpen(false)}
            >
              <ListItemText
                primary={page}
                primaryTypographyProps={{
                  fontWeight: 500,
                  color: "#000000",
                }}
              />
            </ListItem>
          ))}
        </List>

        <Divider />

        <Box sx={{ p: 2, textAlign: "center" }}>
          {user ? (
            <Button
              variant="outlined"
              onClick={() => {
                handleLogout();
                setDrawerOpen(false);
              }}
              sx={{
                borderColor: "#0d3b66",
                color: "#0d3b66",
                "&:hover": { backgroundColor: "#0d3b66", color: "#fff" },
              }}
            >
              Sign Out
            </Button>
          ) : (
            <Button
              variant="contained"
              component={Link}
              to="/login"
              onClick={() => setDrawerOpen(false)}
              sx={{
                backgroundColor: "#0d3b66",
                color: "#fff",
                "&:hover": { backgroundColor: "#ff2d2f" },
              }}
            >
              Login
            </Button>
          )}
        </Box>
      </Drawer>
    </>
  );
}

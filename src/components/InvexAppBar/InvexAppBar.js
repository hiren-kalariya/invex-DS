import * as React from "react";
import "./InvexAppBar.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import CONSTANT from "../../utils/CONSTANT";

const InvexAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [isActive, setIsActive] = React.useState(
    CONSTANT.TOP_NAVIGATION_MANU_ITEMS[0].name
  );
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (e) => {
    setIsActive(e.target.innerText);
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container sx={{ backgroundColor: "#0f062b" }} maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            <img src={logo} alt="Invex Wealth" />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {CONSTANT.TOP_NAVIGATION_MANU_ITEMS.map((manuItem) => {
                return (
                  <Link to={manuItem.path} key={manuItem.id}>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">
                        {manuItem.name}
                      </Typography>
                    </MenuItem>
                  </Link>
                );
              })}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            <img src={logo} alt="Invex Wealth" />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {CONSTANT.TOP_NAVIGATION_MANU_ITEMS.map((manuItem) => {
              return (
                <Link to={manuItem.path} key={manuItem.id}>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      color: "white",
                      display: "block",
                      borderBottom:
                        isActive.toLowerCase() === manuItem.name.toLowerCase()
                          ? "solid 1px #fff"
                          : "0px",
                    }}
                  >
                    {manuItem.name}
                  </Button>
                </Link>
              );
            })}
          </Box>

          <Box
            sx={{
              flexGrow: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <a
              target="_blank"
              rel="noreferrer"
              href="https://cp2.invexwealth.com/upload"
            >
              <Button
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  border: "2px solid white",
                  borderRadius: "5px",
                }}
              >
                Upload
              </Button>
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://cp2.invexwealth.com/download_file"
            >
              <Button
                onClick={handleCloseNavMenu}
                sx={{
                  m: 2,
                  color: "white",
                  display: "block",
                  border: "2px solid white",
                  borderRadius: "5px",
                }}
              >
                Download
              </Button>
            </a>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default InvexAppBar;

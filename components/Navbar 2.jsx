// YourComponent.js
"use client";
import React, { useEffect, useState } from 'react';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { styled, alpha } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import InputBase from "@mui/material/InputBase";
import Logo from "../public/spotsynclogo.png";
import Image from "next/image";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import RegisterOrLogin from "./registerorlogin";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSelector, useDispatch } from "react-redux";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { fetchUser } from '../redux/features/getuser';
import HomeIcon from '@mui/icons-material/Home';
import { Avatar } from "@mui/material";
import { isLogout } from '@/redux/features/auth';

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.primary.light, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: "auto",
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "35%",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "40ch",
    },
  },
}));

function ServiceNavbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isLoggin = useSelector((state) => state.Auth.isloggin);
  const user = useSelector((state) => state.user.user.data);
  const cookie = getCookie("token");
  const dispatch = useDispatch();

  const router = useRouter();

  console.log(user);
  console.log(isLoggin);

  const isMenuOpen = Boolean(anchorEl);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleLogout = () => {
    deleteCookie("token");
    router.push("/");
    handleMenuClose();
    dispatch(isLogout());
  };

  const handleService = () => {
    router.push('/');
  };

  const handleProfile = () => {
   
      router.push("/user/user_profile");
      alert("please Login");
  };

  const menuId = "primary-search-account-menu";

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      sx={{ marginTop: "44px" }}
    >
      <Box sx={{ width: 200, maxHeight: "60vh" }} role="presentation">
        {(!cookie) ? (
          <MenuItem>
            <LoginIcon />
            <RegisterOrLogin />
          </MenuItem>
        ) : (
          <>
            {user?.map((item, index) => (
              <MenuItem key={index}>
                <Avatar alt="Remy Sharp" src={item.avatar} />
                <h4>hi.{item.Username}</h4>
              </MenuItem>
            ))}
            <MenuItem onClick={handleProfile}>
              <AccountCircleIcon /> Profile
            </MenuItem>
            <MenuItem onClick={handleService}>
              <HomeIcon /> home
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <LogoutIcon /> Logout
            </MenuItem>
          </>
        )}
      </Box>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: "white", color: "#040333" }}>
        <Container maxWidth="xl">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Image src={Logo} alt="spot" style={{ width: "80px" }} onClick={() => router.push('/')} />
            </Typography>
            <Search sx={{ marginLeft: "auto" }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <Box sx={{ flexGrow: 1 }} />
            {(isLoggin) ?
              <Button style={{ color: "#040333" }} onClick={handleProfileMenuOpen}>
                <MenuIcon />
              </Button> :
              <Avatar alt="Remy Sharp" src='' onClick={handleProfileMenuOpen} />
            }
            {renderMenu}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

export default ServiceNavbar;

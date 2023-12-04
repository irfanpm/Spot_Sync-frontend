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

import { Autocomplete, Avatar } from "@mui/material";
import { isLogout } from '@/redux/features/auth';
import { searchservice } from '@/redux/features/searchredux';
import { useTheme } from "@mui/system";


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
    width: "50vh", // Adjust the width based on your design
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
// const AutocompleteContainer = styled("div")(({ theme }) => ({
//   width: "100%",
//   [theme.breakpoints.up("sm")]: {
//     width: "300px", // Adjust the width based on your design
//   },
// }));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(2)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const theme = useTheme();


  const isLoggin = useSelector((state) => state.Auth.isloggin);
  const user = useSelector((state) => state.user.user.data);
  const cookie = getCookie("token");
  const dispatch = useDispatch();

  const router = useRouter();

  console.log(user);
  console.log(isLoggin);

  const isMenuOpen = Boolean(anchorEl);

  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchUser());
    }, 50);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = e.target.searchvalue.value;
    const location = selectedLocation ? selectedLocation.label : '';
    const latitude = selectedLocation ? selectedLocation.latin : null;
    const longitude = selectedLocation ? selectedLocation.long : null;
    console.log(searchValue, location, latitude, longitude);
    dispatch(searchservice({ value: searchValue, long: longitude, lat: latitude }));
    router.push('/user/searchresult');
  };


  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setAnchorEl(null);
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
    router.push('/Serviceprovider');
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
        {(!cookie) ?
          <MenuItem>
            <LoginIcon />
            <RegisterOrLogin />
          </MenuItem> :
          <>
            {user?.map((item) => (
              <MenuItem key={item.id}>
                <Avatar alt="Remy Sharp" src={item.avatar} />
                <h4>hi.{item.Username}</h4>
              </MenuItem>
            ))}
            <MenuItem onClick={handleProfile}>
              <AccountCircleIcon /> Profile
            </MenuItem>
            <MenuItem onClick={handleService}>
              <TrendingUpIcon /> Add Business
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <LogoutIcon /> Logout
            </MenuItem>
          </>
        }
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
            <form action="" onSubmit={handleSearch} className='d-flex'>
              <Search sx={{ marginLeft: "auto" }}>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  id='searchvalue'
                />
              </Search>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={top100Films}
                onChange={(event, newValue) => setSelectedLocation(newValue)}
                renderInput={(params) => <TextField {...params} label="Location" id='category' name='place' style={{
                  background: "white",
                  width: "300px", // Full width by default
                  [theme.breakpoints.up("sm")]: {
                    width: "600px", // Adjust the width on larger screens
                  },
                }}
                size='small' 
                 />}
              />
              <Button type='submit' style={{ background: "#0763f5", color: "white" }}>
                <SearchIcon />
              </Button>

            </form>
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

export default Navbar;

const top100Films = [
  {
    label: 'Kondotty',
    latin: 11.1434,
    long: 75.962173
  },
  {
    label: 'kakkenchery',
    latin: 11.1638,
    long: 75.8993
  }
];

import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  IconButton,
  InputBase,
  List,
  ListItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {
  Search,
  AccountCircle,
  Logout,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import { setLogout } from "../features/auth/authSlice";

function SellerNavbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleViewItems = () => {
    setIsDropdownOpen(true);
  };
  const handleHideItems = () => {
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/");
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      bgcolor="#131921"
      justifyContent="space-between"
      px="2rem"
      py="6px">
      <Typography
        variant="h1"
        fontSize={40}
        fontWeight="fontWeightBold"
        color="#fff"
        padding="4px 6px"
        cursor="pointer"
        sx={{
          ":hover": { border: "1px solid white", borderRadius: "2px" },
        }}
        onClick={() => navigate("/")}>
        Prime Cart
      </Typography>
      <Paper
        component="form"
        sx={{
          mx: "1.5rem",
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 640,
        }}
        onSubmit={() => console.log("Searched")}>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search products...."
          inputProps={{ "aria-label": "search products" }}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <Search />
        </IconButton>
      </Paper>
      <Stack
        direction="row"
        spacing={3}
        alignItems="center"
        px={3}
        py={1.6}
        width={450}
        justifyContent="space-between">
        <Button onClick={() => navigate("/createProduct")}>
          <Typography variant="body2" display="block" color="#fff">
            Create New Product
          </Typography>
        </Button>
        <Button onClick={() => navigate("/sellerAuth")}>
          <Typography variant="body2" display="block" color="#fff">
            Show my listed products
          </Typography>
        </Button>
        <Box
          onMouseEnter={handleViewItems}
          onMouseLeave={handleHideItems}
          sx={{ position: "relative", display: "inline-block" }}>
          <Typography
            variant="body2"
            fontSize={16}
            display="flex"
            alignItems="center"
            padding="6px 10px"
            color="#FFF">
            Arghya
            {isDropdownOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </Typography>
          <Paper
            component={List}
            sx={{
              p: 0,
              display: isDropdownOpen ? "block" : "none",
              bgcolor: "#fff",
              position: "absolute",
              minWidth: "184px",
            }}>
            <ListItem
              sx={{
                width: "100%",
                height: "48px",
                padding: "8px 16px",
                ":hover": { bgcolor: "grey.400" },
              }}>
              <Link style={{ textDecoration: "none" }} to="/profile">
                <Box
                  display="flex"
                  alignItems="center"
                  color="grey.1000"
                  sx={{
                    ":hover": { color: "#555" },
                  }}>
                  <AccountCircle />
                  <Typography px={1}>My Profile</Typography>
                </Box>
              </Link>
            </ListItem>
            <ListItem
              sx={{
                width: "100%",
                height: "48px",
                padding: "8px 16px",
                ":hover": { bgcolor: "grey.400" },
              }}>
              <Box
                display="flex"
                alignItems="center"
                color="grey.1000"
                cursor="pointer"
                sx={{
                  ":hover": { color: "#555" },
                }}
                onClick={handleLogout}>
                <Logout />
                <Typography px={1}>Logout</Typography>
              </Box>
            </ListItem>
          </Paper>
        </Box>
      </Stack>
    </Stack>
  );
}

export default SellerNavbar;

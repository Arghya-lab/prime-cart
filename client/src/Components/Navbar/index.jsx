import {
  Box,
  Button,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import {
  Search,
  ShoppingCart,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import DropDownWidget from "./DropDownWidget";

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleViewItems = () => {
    setIsDropdownOpen(true);
  };
  const handleHideItems = () => {
    setIsDropdownOpen(false);
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      bgcolor="#131921"
      justifyContent="space-between"
      px="2rem"
      py="6px">
      <Button onClick={() => navigate("/")}>
        <Typography variant="h4" fontWeight="fontWeightBold" color="#fff">
          Prime Cart
        </Typography>
      </Button>
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
        justifyContent="space-between">
        <Box
          onMouseEnter={handleViewItems}
          onMouseLeave={handleHideItems}
          sx={{ position: "relative", display: "inline-block" }}>
          <Typography
            sx={{
              color: "#fff",
              fontSize: "12px",
              lineHeight: "14px",
              fontWeight: "400",
            }}>
            Hello, sign in
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#fff",
            }}>
            <Typography
              sx={{
                fontSize: "14px",
                lineHeight: "15px",
                fontWeight: "700",
              }}>
              Account & Lists
            </Typography>
            {isDropdownOpen ? <KeyboardArrowUp  /> : <KeyboardArrowDown />}
          </Box>
          <DropDownWidget isDropdownOpen={isDropdownOpen} />
        </Box>
        <Box>
          <Typography
            sx={{
              color: "#fff",
              fontSize: "12px",
              lineHeight: "14px",
              fontWeight: "400",
            }}>
            Returns
          </Typography>
          <Typography
            sx={{
              display: "flex",
              color: "#fff",
              fontSize: "14px",
              lineHeight: "15px",
              fontWeight: "700",
            }}>
            & Orders
          </Typography>
        </Box>
        <Box>
          <Typography
            variant="caption"
            display="block"
            color="#fff"
            sx={{ display: "flex", alignItems: "center" }}>
            <ShoppingCart fontSize="large" />
            <Typography
              sx={{
                display: "flex",
                color: "#fff",
                fontSize: "14px",
                lineHeight: "15px",
                fontWeight: "700",
              }}>
              Cart
            </Typography>
          </Typography>
        </Box>
      </Stack>
    </Stack>
  );
}

export default Navbar;

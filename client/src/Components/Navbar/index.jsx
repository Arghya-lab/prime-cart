import {
  Box,
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
  const [searchValue, setSearchValue] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleViewItems = () => {
    setIsDropdownOpen(true);
  };
  const handleHideItems = () => {
    setIsDropdownOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchValue.trim();
    if (query.length >= 3) {
      navigate(`/search?query=${encodeURIComponent(searchValue)}`);
    } else {
      console.log("query must be at least 3 char length");
    }
    setSearchValue("");
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      bgcolor="#131921"
      justifyContent="space-between"
      px="2rem"
      py="6px"
      height="60px">
      <Typography
        variant="h1"
        fontSize={40}
        fontWeight="fontWeightBold"
        color="#fff"
        padding="4px 6px"
        sx={{
          cursor: "pointer",
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
          width: "640px",
        }}
        onSubmit={handleSearch}>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search products...."
          inputProps={{ "aria-label": "search products" }}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <IconButton
          type="submit"
          sx={{ p: "10px" }}
          aria-label="search"
          onClick={handleSearch}>
          <Search />
        </IconButton>
      </Paper>
      <Stack
        direction="row"
        spacing={3}
        alignItems="center"
        paddingX={3}
        justifyContent="space-between">
        <Box
          padding="4px 6px"
          sx={{
            cursor: "pointer",
            ":hover": { border: "1px solid white", borderRadius: "2px" },
          }}
          onMouseEnter={handleViewItems}
          onMouseLeave={handleHideItems}>
          <Typography variant="caption" color="#fff">
            Hello, sign in
          </Typography>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            color="#fff">
            <Typography variant="subtitle1"fontWeight={600}>
              Account & Lists
            </Typography>
            {isDropdownOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </Box>
          <DropDownWidget isDropdownOpen={isDropdownOpen} />
        </Box>
        <Box
          sx={{
            padding: "4px 6px",
            cursor: "pointer",
            ":hover": { border: "1px solid white", borderRadius: "2px" },
          }}
          onClick={() => navigate("/orders")}>
          <Typography variant="caption" color="#fff">
            Returns
          </Typography>
          <Typography
            variant="subtitle1"
            color="#fff"
            lineHeight="15px"
            fontWeight={600}>
            & Orders
          </Typography>
        </Box>
        <Box
          padding="4px 6px"
          sx={{
            cursor: "pointer",
            ":hover": { border: "1px solid white", borderRadius: "2px" },
          }}
          onClick={() => navigate("/cart")}>
          <Typography
            variant="caption"
            color="#fff"
            display="flex"
            alignItems="flex-end">
            <ShoppingCart fontSize="large" />
            <Typography
              variant="subtitle1"
              color="#fff"
              lineHeight="15px"
              fontWeight={600}>
              Cart
            </Typography>
          </Typography>
        </Box>
      </Stack>
    </Stack>
  );
}

export default Navbar;

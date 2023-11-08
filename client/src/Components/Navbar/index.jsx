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
        variant="h4"
        fontWeight="fontWeightBold"
        color="#fff"
        sx={{
          padding: "4px 6px",
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
          width: 640,
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
        px={3}
        justifyContent="space-between">
        <Box
          onMouseEnter={handleViewItems}
          onMouseLeave={handleHideItems}
          sx={{
            padding: "4px 6px",
            cursor: "pointer",
            ":hover": { border: "1px solid white", borderRadius: "2px" },
          }}>
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
        <Box
          sx={{
            padding: "4px 6px",
            cursor: "pointer",
            ":hover": { border: "1px solid white", borderRadius: "2px" },
          }}
          onClick={() => navigate("/cart")}>
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

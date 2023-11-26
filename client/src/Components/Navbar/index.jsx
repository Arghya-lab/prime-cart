import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import { useState } from "react";
import {
  ShoppingCart,
  KeyboardArrowDown,
  KeyboardArrowUp,
  ShoppingBasket,
  AccountCircle,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import DropDownWidget from "./DropDownWidget";
import SearchBar from "./SearchBar";

function Navbar() {
  const largeScreen = useMediaQuery("(min-width:1024px)");
  const mediumScreen = useMediaQuery("(min-width:768px)");
  const smallScreen = useMediaQuery("(min-width:425px)");

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <Stack bgcolor="#131921" py="6px" alignItems="center">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        width="100%">
        <img
          src="http://localhost:5173/logo/logo-220px.png"
          style={{
            width: largeScreen ? "220px" : "160px",
            margin: "0.7rem 0 0.7rem 1rem",
          }}
          onClick={() => navigate("/")}
        />
        {largeScreen ? <SearchBar /> : null}
        <Stack
          direction="row"
          spacing={mediumScreen ? 3 : 1}
          alignItems="center"
          paddingX={3}
          justifyContent="space-between">
          {mediumScreen ? (
            <Box
              padding={smallScreen ? "4px 2px" : "4px 6px"}
              color="#fff"
              sx={{
                cursor: "pointer",
                ":hover": { border: "1px solid white", borderRadius: "2px" },
              }}
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}>
              <>
                <Typography variant="caption">Hello, sign in</Typography>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Typography variant="subtitle1" fontWeight={600}>
                    Account & Lists
                  </Typography>
                  {isDropdownOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                </Box>
              </>
              <DropDownWidget isDropdownOpen={isDropdownOpen} />
            </Box>
          ) : (
            <>
              <AccountCircle
                fontSize={smallScreen ? "large" : "medium"}
                sx={{ color: "#fff" }}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              />
              <DropDownWidget
                isDropdownOpen={isDropdownOpen}
                setClose={() => setIsDropdownOpen(false)}
              />
            </>
          )}
          <Box
            sx={{
              padding: smallScreen ? "4px 2px" : "4px 6px",
              cursor: "pointer",
              color: "#fff",
              ":hover": { border: "1px solid white", borderRadius: "2px" },
            }}
            onClick={() => navigate("/orders")}>
            {mediumScreen ? (
              <>
                <Typography variant="caption">Returns</Typography>
                <Typography
                  variant="subtitle1"
                  lineHeight="15px"
                  fontWeight={600}>
                  & Orders
                </Typography>
              </>
            ) : (
              <ShoppingBasket
                fontSize={smallScreen ? "large" : "medium"}
                sx={{ color: "#fff" }}
              />
            )}
          </Box>
          <Box
            padding={smallScreen ? "4px 2px" : "4px 6px"}
            sx={{
              cursor: "pointer",
              ":hover": { border: "1px solid white", borderRadius: "2px" },
            }}
            onClick={() => navigate("/cart")}>
            {mediumScreen ? (
              <Box variant="caption" display="flex" alignItems="flex-end">
                <ShoppingCart sx={{ color: "#fff" }} fontSize="large" />
                <Typography
                  variant="subtitle1"
                  lineHeight="15px"
                  color="#fff"
                  fontWeight={600}>
                  Cart
                </Typography>
              </Box>
            ) : (
              <ShoppingCart
                fontSize={smallScreen ? "large" : "medium"}
                sx={{ color: "#fff" }}
              />
            )}
          </Box>
        </Stack>
      </Stack>
      {!largeScreen ? <SearchBar /> : null}
    </Stack>
  );
}

export default Navbar;

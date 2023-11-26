import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Box, List, ListItem, Paper, Stack, Typography } from "@mui/material";
import {
  Logout,
  KeyboardArrowDown,
  KeyboardArrowUp,
  Home,
} from "@mui/icons-material";
import { setLogout } from "../../features/auth/authSlice";

function SellerHeader() {
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
      <Stack
        direction="row"
        spacing={5}
        alignItems="center"
        px={3}
        py={1.6}
        justifyContent="space-between">
        <Box
          sx={{
            padding: "4px 6px",
            cursor: "pointer",
            ":hover": { border: "1px solid white", borderRadius: "2px" },
          }}
          onClick={() => navigate("/createProduct")}>
          <Typography variant="caption" color="#fff">
            list new
          </Typography>
          <Typography
            variant="subtitle1"
            color="#fff"
            lineHeight="15px"
            fontWeight={600}>
            product
          </Typography>
        </Box>
        <Box
          onMouseEnter={handleViewItems}
          onMouseLeave={handleHideItems}
          sx={{ position: "relative", display: "inline-block" }}>
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
              <Typography variant="subtitle1" fontWeight={600}>
                Account & Lists
              </Typography>
              {isDropdownOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </Box>
            <Paper
              component={List}
              sx={{
                p: 0,
                display: isDropdownOpen ? "block" : "none",
                bgcolor: "#fff",
                position: "absolute",
                minWidth: "184px",
                zIndex: "50",
                top: "55px",
              }}>
              <ListItem
                sx={{
                  width: "100%",
                  height: "48px",
                  padding: "8px 16px",
                }}>
                <Link style={{ textDecoration: "none" }} to="/">
                  <Box display="flex" alignItems="center" color="grey.1000">
                    <Home />
                    <Typography
                      px={1}
                      sx={{
                        ":hover": {
                          color: "#e47911",
                          textDecoration: "underline",
                        },
                      }}>
                      Home
                    </Typography>
                  </Box>
                </Link>
              </ListItem>
              <ListItem
                sx={{
                  width: "100%",
                  height: "48px",
                  padding: "8px 16px",
                }}>
                <Box
                  display="flex"
                  alignItems="center"
                  color="grey.1000"
                  cursor="pointer"
                  onClick={handleLogout}>
                  <Logout />
                  <Typography
                    px={1}
                    sx={{
                      ":hover": {
                        color: "#e47911",
                        textDecoration: "underline",
                      },
                    }}>
                    Logout
                  </Typography>
                </Box>
              </ListItem>
            </Paper>
          </Box>
        </Box>
      </Stack>
    </Stack>
  );
}

export default SellerHeader;

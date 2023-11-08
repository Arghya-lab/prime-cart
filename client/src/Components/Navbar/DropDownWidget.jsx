import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Box, List, ListItem, Paper, Typography } from "@mui/material";
import {
  AccountCircle,
  Favorite,
  Logout,
  Storefront,
} from "@mui/icons-material";
import { setLogout } from "../../features/auth/authSlice";

function DropDownWidget({ isDropdownOpen }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isSeller = Boolean(useSelector((state) => state.auth.sellerToken));

  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/");
  };

  return (
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
        <Link style={{ textDecoration: "none" }} to="/profile">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: "#222",
            }}>
            <AccountCircle />
            <Typography
              px={1}
              sx={{
                ":hover": {
                  color: "#e47911",
                  textDecoration: "underline",
                },
              }}>
              My Profile
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
        <Link style={{ textDecoration: "none" }} to="/wishlist">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: "#222",
            }}>
            <Favorite />
            <Typography
              px={1}
              sx={{
                ":hover": {
                  color: "#e47911",
                  textDecoration: "underline",
                },
              }}>
              Wishlist
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
          sx={{
            display: "flex",
            alignItems: "center",
            color: "#222",
            cursor: "pointer",
          }}
          onClick={handleLogout}>
          <Logout />
          <Typography
            px={1}
            sx={{
              ":hover": { color: "#e47911", textDecoration: "underline" },
            }}>
            Logout
          </Typography>
        </Box>
      </ListItem>
      <ListItem
        sx={{
          width: "100%",
          height: "48px",
          padding: "8px 16px",
        }}>
        {isSeller ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: "#222",
              cursor: "pointer",
            }}
            onClick={() => navigate("/seller")}>
            <Storefront />
            <Typography
              px={1}
              sx={{
                ":hover": {
                  color: "#e47911",
                  textDecoration: "underline",
                },
              }}>
              Seller Page
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: "#222",
              cursor: "pointer",
            }}
            onClick={() => navigate("/sellerAuth")}>
            <Storefront />
            <Typography
              px={1}
              sx={{
                ":hover": {
                  color: "#e47911",
                  textDecoration: "underline",
                },
              }}>
              Become a seller
            </Typography>
          </Box>
        )}
      </ListItem>
    </Paper>
  );
}

DropDownWidget.propTypes = {
  isDropdownOpen: PropTypes.bool.isRequired,
};

export default DropDownWidget;

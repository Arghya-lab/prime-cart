import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import {
  Box,
  List,
  ListItem,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  Clear,
  Favorite,
  Home,
  Login,
  Logout,
  Storefront,
} from "@mui/icons-material";
import { setLogout } from "../../features/auth/authSlice";
import { enqueueSnackbar } from "notistack";

function DropDownWidget({ isDropdownOpen, setClose }) {
  const mediumScreen = useMediaQuery("(min-width:768px)");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token, sellerToken } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(setLogout());
    enqueueSnackbar("Successfully logout", { variant: "info" });
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/login");
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
        top: mediumScreen ? "64px" : "55px",
        right: mediumScreen ? "auto" : 0,
      }}>
      {!mediumScreen ? (
        <ListItem
          sx={{
            width: "100%",
            height: "48px",
            padding: "16px 0 0",
          }}
          onClick={setClose}>
          <Clear sx={{ marginLeft: "120px" }} />
        </ListItem>
      ) : null}
      <ListItem
        sx={{
          width: "100%",
          height: "48px",
          padding: "8px 16px",
        }}>
        <Link style={{ textDecoration: "none" }} to="/addresses">
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
              Address
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
          <Box display="flex" alignItems="center" color="grey.1000">
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
      {token ? (
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
                ":hover": { color: "#e47911", textDecoration: "underline" },
              }}>
              Logout
            </Typography>
          </Box>
        </ListItem>
      ) : (
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
            onClick={handleLogin}>
            <Login />
            <Typography
              px={1}
              sx={{
                ":hover": { color: "#e47911", textDecoration: "underline" },
              }}>
              Login
            </Typography>
          </Box>
        </ListItem>
      )}
      <ListItem
        sx={{
          width: "100%",
          height: "48px",
          padding: "8px 16px",
        }}>
        {sellerToken ? (
          <Box
            display="flex"
            alignItems="center"
            color="grey.1000"
            cursor="pointer"
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
            display="flex"
            alignItems="center"
            color="grey.1000"
            cursor="pointer"
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
  setClose: PropTypes.func,
};

export default DropDownWidget;

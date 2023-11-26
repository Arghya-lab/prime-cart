import { Box, Typography, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import {
  changeProductQuantity,
  removeDeletedProduct,
} from "../../features/cart/cartSlice";
import { enqueueSnackbar } from "notistack";

function CartProductUtilityComponent({ id, quantity }) {
  const smallScreen = useMediaQuery("(min-width:425px)");

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const handleQuantityChange = (e) => {
    const value = Number(e.target.value);
    //add loader
    (async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/cart/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ quantity: value }),
        }
      );
      const json = await res.json();
      if (json.success) {
        console.log(json.data);
        dispatch(changeProductQuantity({ productId: id, quantity: value }));
      } else {
        enqueueSnackbar(json.error, { variant: "error" });
      }
    })();
  };

  const handleDeleteProduct = () => {
    (async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/cart/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: token,
          },
        }
      );
      const json = await res.json();
      if (json.success) {
        dispatch(removeDeletedProduct(id));
        enqueueSnackbar("Successfully remove from cart", {
          variant: "success",
        });
      } else {
        enqueueSnackbar(json.error, { variant: "error" });
      }
    })();
  };

  return (
    <Box
      marginTop={smallScreen ? 0 : "0.75rem"}
      display="flex"
      alignItems="center"
      justifyContent="center"
      width={smallScreen ? "fit-content" : "100%"}
      flexDirection={smallScreen ? "row" : "column"}
      borderRadius="1px"
      gap="8px">
      <Box
        component="span"
        border="1px solid"
        borderRadius="8px"
        borderColor="grey.500"
        backgroundColor="grey.100"
        boxShadow="0 2px 5px 0 rgba(213,217,217,.5)"
        padding="3px">
        <span>Qty:</span>
        <select
          style={{
            cursor: "pointer",
            borderColor: "transparent",
            background: "transparent",
            fontSize: "16px",
            lineHeight: "29px",
          }}
          name="quantity"
          id="quantity"
          value={quantity}
          onChange={handleQuantityChange}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
          <option value={10}>10</option>
        </select>
      </Box>
      <Box component="span">
        {smallScreen ? (
          <Box component="span" marginRight="6px" color="grey.600">
            |
          </Box>
        ) : null}
        <Typography
          component="span"
          variant="body2"
          color="success.dark"
          sx={{
            cursor: "pointer",
            ":hover": {
              color: "secondary.main",
              textDecoration: "underline",
            },
          }}
          onClick={handleDeleteProduct}>
          Delete
        </Typography>
        {/* {smallScreen ? (
          <Box component="span" marginRight="6px" color="grey.600">
            |
          </Box>
        ) : null}
            <Typography
              variant="body2"
              color="success.dark"
              cursor="pointer"
              sx={{
                ":hover": {
                  color: "secondary.main",
                  textDecoration: "underline",
                },
              }}>
              Share
            </Typography> */}
      </Box>
    </Box>
  );
}

CartProductUtilityComponent.propTypes = {
  id: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
};

export default CartProductUtilityComponent;

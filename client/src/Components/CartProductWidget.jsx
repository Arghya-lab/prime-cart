import PropTypes from "prop-types";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  changeProductQuantity,
  removeDeletedProduct,
} from "../features/cart/cartSlice";
import { enqueueSnackbar } from "notistack";

function CartProductWidget({ id, name, imgUrl, price, quantity }) {
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
        enqueueSnackbar(json.error, { variant: 'error' })
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
        enqueueSnackbar('Successfully remove from cart', { variant: 'success' })
      } else {
        enqueueSnackbar(json.error, { variant: 'error' })
      }
    })();
  };

  return (
    <Box
      padding="12px 0 12px 12px"
      borderBottom="1px solid"
      borderColor="grey.400"
      color="#0F1111">
      <Stack direction="row">
        <Box>
          <img
            /* img url */
            src={`${
              import.meta.env.VITE_IMG_BASE_URL
            }/assets/productImgs/${imgUrl}`}
            height="180px"
            width="180px"
            style={{ margin: "0 12px" }}
          />
        </Box>
        <Box width="100%">
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h4" paddingRight={2}>
              {/* name */}
              {name}
            </Typography>
            <Box>
              <Typography
                component="span"
                variant="caption"
                sx={{ position: "relative", top: "-0.3em", fontWeight: 600 }}>
                ₹
              </Typography>
              <Typography
                component="span"
                variant="h4"
                sx={{ fontWeight: 600 }}>
                {/* selling price */}
                {price.selling}
              </Typography>
            </Box>
          </Box>
          <Typography variant="body1" color="success.main">
            In stock
          </Typography>
          <Typography variant="subtitle2" color="#CC0C39">
            Deal
          </Typography>
          <Typography
            component="span"
            variant="caption"
            fontWeight={600}
            color="white"
            backgroundColor="#CC0C39"
            padding="4px 6px"
            borderRadius="4px">
            {/* MRP-selling % */}
            {(((price.mrp - price.selling) / price.mrp) * 100).toFixed(0)}
            %&nbsp;off
          </Typography>
          <Typography variant="subtitle2" color="grey.800">
            Eligible for FREE Shipping
          </Typography>
          <Box>
            <Typography component="span" variant="body2" color="grey.800">
              M.R.P.:&nbsp;
            </Typography>
            <Typography
              component="span"
              variant="body2"
              color="grey.800"
              textDecoration="line-through">
              {/* MRP */}
              Rs.{price.mrp}
            </Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            width="fit-content"
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
            <Divider orientation="vertical" variant="middle" flexItem />
            <Typography
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
            {/* <Divider orientation="vertical" variant="middle" flexItem />
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
      </Stack>
    </Box>
  );
}

CartProductWidget.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  price: PropTypes.object.isRequired,
  quantity: PropTypes.number.isRequired,
};

export default CartProductWidget;

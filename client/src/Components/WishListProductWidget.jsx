import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOutline, IosShare } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { setWishList } from "../features/additionalInfo/additionalInfoSlice";
import { setWishListProducts } from "../features/product/productSlice";

function WishListProductWidget({
  id,
  name,
  imgUrl,
  rating,
  ratingCount,
  price,
}) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  let wishListProducts = useSelector((state) => state.product.wishListProducts);

  const handleRemoveFromWishList = () => {
    (async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/wishList/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: token,
          },
        }
      );
      const json = await res.json();
      if (json.success) {
        console.log(json.data);
        dispatch(setWishList(json.data));
      } else {
        console.log(json.error);
      }
    })();
    const updatedWishListProducts = wishListProducts.filter((product) => {
      return product._id !== id;
    });
    dispatch(setWishListProducts(updatedWishListProducts));
  };

  return (
    <Box maxWidth="1024px" margin="auto">
      <Box width="100%" height="1.5px" bgcolor="grey.600" />
      <Stack direction="row">
        <Box width="220px" minHeight="150px" cursor="pointer">
          <img
            /* img url */
            src={`${
              import.meta.env.VITE_IMG_BASE_URL
            }/assets/productImgs/${imgUrl}`}
            height="135px"
            width="135px"
            style={{ margin: "16px" }}
          />
        </Box>
        <Box
          width="100%"
          paddingY="22px"
          textAlign="left"
          display="flex"
          justifyContent="space-between">
          <Box paddingRight="220px" maxWidth="550px">
            <Typography
              component="p"
              variant="h6"
              color="success.dark"
              fontWeight={600}
              sx={{
                ":hover": { cursor: "pointer", color: "secondary.main" },
              }}>
              {/* name */}
              {name}
            </Typography>
            <Typography component="p" variant="body2">
              by boAt (Electronics)
            </Typography>
            <Box display="flex" alignItems="center">
              {/* value = star count */}
              <Rating name="rating" value={rating} precision={0.5} readOnly />
              &nbsp;
              <Typography
                component="p"
                variant="body1"
                color= "success.dark"
                sx={{
                  ":hover": { cursor: "pointer", color: "secondary.main" },
                }}>
                {/* rating count */}
                {ratingCount}
              </Typography>
            </Box>
            <Box marginY="4px">
              <Typography
                component="span"
                variant="caption"
                fontWeight={600}
                color="white"
                backgroundColor="error.light"
                padding="4px 6px 4px 6px"
                borderRadius="4px">
                {/* MRP-selling % */}
                {(((price.mrp - price.selling) / price.mrp) * 100).toFixed(0)}
                %&nbsp; off
              </Typography>
              &nbsp;
              <Typography
                component="span"
                variant="caption"
                color="error.light"
                fontWeight={600}>
                Sale
              </Typography>
            </Box>
            <Box>
              <Typography
                component="span"
                variant="caption"
                sx={{ position: "relative", top: "-0.3em" }}>
                ₹
              </Typography>
              <Typography component="span" fontWeight={600}>
                {/* selling price */}
                {price.selling}
              </Typography>
              &nbsp;
              <Typography component="span" variant="caption">
                <b>FREE Delivery</b> on orders over ₹499.
              </Typography>
            </Box>
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
          </Box>
          <Box>
            <Button
              variant="contained"
              color="warning"
              width="200px"
              sx={{
                marginY: "8px",
                ":hover": { bgcolor: "warning.main" },
              }}>
              Add to Cart
            </Button>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="flex-end"
              gap="6px">
              <IconButton>
                <IosShare />
              </IconButton>
              <IconButton onClick={handleRemoveFromWishList}>
                <DeleteOutline />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}

WishListProductWidget.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  ratingCount: PropTypes.number.isRequired,
  price: PropTypes.object.isRequired,
};

export default WishListProductWidget;

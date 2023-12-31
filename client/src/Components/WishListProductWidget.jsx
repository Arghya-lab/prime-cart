import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  IconButton,
  Rating,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import { setWishList } from "../features/additionalInfo/additionalInfoSlice";
import { setWishListProducts } from "../features/product/productSlice";
import { enqueueSnackbar } from "notistack";

function WishListProductWidget({
  id,
  name,
  imgUrl,
  rating,
  ratingCount,
  price,
}) {
  const largeScreen = useMediaQuery("(min-width:1024px)");
  const mediumScreen = useMediaQuery("(min-width:768px)");

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
        dispatch(setWishList(json.data));
        enqueueSnackbar("Product removed from wishlist", { variant: "info" });
      } else {
        enqueueSnackbar(json.error, { variant: "error" });
      }
    })();
    const updatedWishListProducts = wishListProducts.filter((product) => {
      return product._id !== id;
    });
    dispatch(setWishListProducts(updatedWishListProducts));
  };

  const handleAddToCart = () => {
    (async () => {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ productId: id }),
      });
      const json = await res.json();
      if (json.success) {
        enqueueSnackbar("Product added to cart", { variant: "success" });
      } else {
        enqueueSnackbar(json.error, { variant: "error" });
      }
    })();
  };

  return (
    <Box maxWidth="1024px" margin="auto">
      <Box width="100%" height="1.5px" bgcolor="grey.600" />
      <Stack direction="row">
        <Box
          width={largeScreen ? "220px" : mediumScreen ? "182px" : "96px"}
          minHeight="150px"
          cursor="pointer">
          <img
            /* img url */
            src={`${
              import.meta.env.VITE_IMG_BASE_URL
            }/assets/productImgs/${imgUrl}`}
            height={largeScreen ? "136px" : mediumScreen ? "112px" : "68px"}
            width={largeScreen ? "136px" : mediumScreen ? "112px" : "68px"}
            style={{ margin: "16px" }}
          />
        </Box>
        <Box
          width="100%"
          paddingY="22px"
          textAlign="left"
          display="flex"
          sx={{
            ...(!mediumScreen ? { flexDirection: "column" } : null),
          }}
          justifyContent="space-between">
          <Box
            paddingRight={largeScreen ? "120px" : mediumScreen ? "72px" : 0}
            maxWidth="550px">
            <Typography
              component="p"
              variant={mediumScreen ? "h6" : "body2"}
              color="success.dark"
              fontWeight={mediumScreen ? 600 : 500}
              sx={{
                ":hover": { cursor: "pointer", color: "secondary.main" },
              }}>
              {name}
            </Typography>
            <Typography
              component="p"
              variant={mediumScreen ? "body2" : "caption"}>
              by boAt (Electronics)
            </Typography>
            <Box display="flex" alignItems="center">
              {/* value = star count */}
              <Rating
                name="rating"
                size={mediumScreen ? "medium" : "small"}
                value={rating}
                precision={0.5}
                readOnly
              />
              &nbsp;
              <Typography
                component="p"
                variant={mediumScreen ? "body1" : "caption"}
                color="success.dark"
                sx={{
                  ":hover": { cursor: "pointer", color: "secondary.main" },
                }}>
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
              <Typography
                component="span"
                variant={mediumScreen ? "subtitle1" : "caption"}
                fontWeight={600}>
                {price.selling}
              </Typography>
              {mediumScreen ? (
                <>
                  &nbsp;
                  <Typography component="span" variant="caption">
                    <b>FREE Delivery</b> on orders over ₹499.
                  </Typography>
                </>
              ) : null}
            </Box>
            <Box>
              <Typography
                component="span"
                variant={mediumScreen ? "body2" : "caption"}
                color="grey.800">
                M.R.P.:&nbsp;
              </Typography>
              <Typography
                component="span"
                variant={mediumScreen ? "body2" : "caption"}
                color="grey.800"
                textDecoration="line-through">
                {/* MRP */}
                Rs.{price.mrp}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              ...(!mediumScreen
                ? { display: "flex", alignItems: "center", gap: "16px" }
                : null),
              marginY: "8px",
            }}>
            <Button
              size={mediumScreen ? "medium" : "small"}
              variant="contained"
              color="warning"
              sx={{
                minWidth: "112px",
                ":hover": { bgcolor: "warning.main" },
                textTransform: "capitalize",
              }}
              onClick={handleAddToCart}>
              Add to Cart
            </Button>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="flex-end"
              gap="6px">
              {/* <IconButton>
                <IosShare />
              </IconButton> */}
              <IconButton
                size={mediumScreen ? "medium" : "small"}
                onClick={handleRemoveFromWishList}>
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

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  LinearProgress,
  Stack,
  Typography,
  linearProgressClasses,
} from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import CartProductWidget from "../Components/CartProductWidget";
import { setCartProduct } from "../features/cart/cartSlice";
import { setProducts } from "../features/checkout/checkoutSlice";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 13,
  borderRadius: 8,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 0,
    backgroundColor: theme.palette.mode === "light" ? "success.light" : "#308fe8",
  },
}));

function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const { products, totalPrice, totalCount } = useSelector(
    (state) => state.cart
  );

  useEffect(() => {
    (async () => {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/cart`, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      const json = await res.json();
      if (json.success) {
        console.log(json.data);
        dispatch(setCartProduct(json.data));
      } else {
        console.log(json.error);
      }
    })();
  }, []);

  const freeDeliveryProgressBarValue = () => {
    if (totalPrice >= 499) {
      return 100;
    } else {
      return Math.floor((totalPrice / 499) * 100);
    }
  };

  const handleBuyCartProducts = () => {
    dispatch(setProducts(products));
    navigate("/checkout")
  };

  return (
    <Box sx={{ bgcolor: "grey.200" }}>
      <Navbar />
      {products && products.length !== 0 ? (
        <Box
          margin="20px"
          display="grid"
          gridTemplateColumns="1fr 300px"
          columnGap="20px">
          <Box padding="20px" bgcolor="white">
            <Typography
              variant="h5"
              sx={{
                fontWeight: 400,
                fontSize: "28px",
                lineHeight: "36px",
              }}>
              Shopping Cart
            </Typography>
            <Typography
              component="span"
              variant="subtitle2"
              sx={{
                color: "success.dark",
                cursor: "pointer",
                ":hover": {
                  textDecoration: "underline",
                },
              }}>
              Deselect all items
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "grey.800",
                textAlign: "right",
                borderBottom: "1px solid grey.400",
              }}>
              Price
            </Typography>
            <Box display="grid" gridTemplateColumns="1fr" rowGap="12px">
              {products.map((product) => (
                <CartProductWidget
                  key={product.productId}
                  id={product.productId}
                  name={product.name}
                  imgUrl={product.imgUrls[product.imgUrls.length - 1]}
                  price={product.price}
                  quantity={product.quantity}
                />
              ))}
            </Box>
            <Box textAlign="right" marginBottom="14px">
              <Typography component="span" fontSize="18px" lineHeight="24px">
                Total ({totalCount} items):
              </Typography>
              &nbsp;
              <Typography
                component="span"
                variant="caption"
                sx={{ position: "relative", top: "-0.3em", fontWeight: 600 }}>
                ₹
              </Typography>
              <Typography
                component="span"
                variant="h6"
                sx={{ fontWeight: 600 }}>
                {/* total price */}
                {totalPrice}
              </Typography>
            </Box>
          </Box>
          <Box padding="20px" bgcolor="white">
            <Stack direction="row" gap="4px" alignItems="center">
              <Box width="100%">
                <BorderLinearProgress
                  variant="determinate"
                  value={freeDeliveryProgressBarValue()}
                />
              </Box>
              <Typography variant="subtitle2">₹499</Typography>
            </Stack>
            {totalPrice >= 499 ? (
              <Stack direction="row">
                <CheckCircle sx={{ color: "success.light" }} />
                <Box>
                  <Typography
                    component="span"
                    variant="caption"
                    sx={{
                      color: "success.light",
                      fontWeight: 600,
                    }}>
                    Your order is eligible for FREE Delivery.
                  </Typography>
                  <Typography component="span" variant="caption">
                    Choose
                  </Typography>
                  <Typography
                    component="span"
                    variant="caption"
                    sx={{
                      color: "success.light",
                    }}>
                    FREE Delivery.
                  </Typography>
                  <Typography component="span" variant="caption">
                    option at checkout.
                  </Typography>
                </Box>
              </Stack>
            ) : (
              <Box>
                <Typography component="span" variant="body2">
                  Add items worth
                </Typography>
                &nbsp;
                <Typography
                  component="span"
                  variant="body2"
                  sx={{
                    color: "error.main",
                  }}>
                  ₹365.00
                </Typography>
                &nbsp;
                <Typography component="span" variant="body2">
                  for
                </Typography>
                &nbsp;
                <Typography
                  component="span"
                  variant="body2"
                  sx={{
                    color: "success.dark",
                  }}>
                  FREE Delivery
                </Typography>
                <Typography
                  component="p"
                  variant="body2"
                  sx={{
                    color: "success.dark",
                    cursor: "pointer",
                    ":hover": { color: "error.main", textDecoration: "underLine" },
                  }}>
                  View Products ›
                </Typography>
              </Box>
            )}
            <Box marginY="14px">
              <Typography component="span" fontSize="18px" lineHeight="24px">
                Total ({totalCount} items):
              </Typography>
              &nbsp;
              <Typography
                component="span"
                variant="caption"
                sx={{ position: "relative", top: "-0.3em", fontWeight: 600 }}>
                ₹
              </Typography>
              <Typography
                component="span"
                variant="h6"
                sx={{ fontWeight: 600 }}>
                {/* total price */}
                {totalPrice}
              </Typography>
            </Box>
            <Button
              variant="contained"
              sx={{
                bgcolor: "warning.light",
                color: "#0F1111",
                width: "200px",
                ":hover": { bgcolor: "warning.main" },
              }}
              onClick={handleBuyCartProducts}>
              Proceed to Buy
            </Button>
          </Box>
        </Box>
      ) : (
        <Typography>No product in the cart</Typography>
      )}
      <Footer />
    </Box>
  );
}

export default CartPage;

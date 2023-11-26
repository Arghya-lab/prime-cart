import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, useMediaQuery } from "@mui/material";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import CartProductContainer from "../Components/Cart/CartProductContainer";
import { setCartProduct } from "../features/cart/cartSlice";
import { setLoadingProgress } from "../features/additionalInfo/additionalInfoSlice";
import CartSubtotalSummary from "../Components/Cart/CartSubtotalSummary";

function CartPage() {
  const mediumScreen = useMediaQuery("(min-width:768px)");

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { products } = useSelector((state) => state.cart);

  useEffect(() => {
    (async () => {
      dispatch(setLoadingProgress(5));
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/cart`, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      dispatch(setLoadingProgress(50));
      const json = await res.json();
      dispatch(setLoadingProgress(85));
      if (json.success) {
        console.log(json.data);
        dispatch(setCartProduct(json.data));
      } else {
        console.log(json.error);
      }
      dispatch(setLoadingProgress(100));
    })();
  }, []);

  return (
    <Box sx={{ bgcolor: "grey.200", overflowX: "hidden" }}>
      <Navbar />
      {products && products.length !== 0 ? (
        mediumScreen ? (
          <Box
            margin="16px"
            display="grid"
            gridTemplateColumns="1fr 272px"
            columnGap="16px">
            <CartProductContainer />
            <CartSubtotalSummary />
          </Box>
        ) : (
          <>
            <CartProductContainer />
            <CartSubtotalSummary />
          </>
        )
      ) : (
        <Typography>No product in the cart</Typography>
      )}
      <Footer />
    </Box>
  );
}

export default CartPage;

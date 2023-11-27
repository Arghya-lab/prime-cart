import { useEffect } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import Header from "../Components/Header";
import WishListProductWidget from "../Components/WishListProductWidget";
import { useDispatch, useSelector } from "react-redux";
import { setWishListProducts } from "../features/product/productSlice";
import { setLoadingProgress } from "../features/additionalInfo/additionalInfoSlice";
import Footer from "../Components/Footer";

function WishlistPage() {
  const mediumScreen = useMediaQuery("(min-width:768px)");
  const smallScreen = useMediaQuery("(min-width:425px)");

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const data = useSelector((state) => state.product.wishListProducts);

  useEffect(() => {
    (async () => {
      dispatch(setLoadingProgress(5));
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/wishList/products`,
        {
          method: "GET",
          headers: {
            Authorization: token,
          },
        }
      );
      dispatch(setLoadingProgress(50));
      const json = await res.json();
      dispatch(setLoadingProgress(85));
      if (json.success) {
        console.log(json.data);
        dispatch(setWishListProducts(json.data));
      } else {
        console.log(json.error);
      }
      dispatch(setLoadingProgress(100));
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ overflowX: "hidden" }}>
      <Header />
      <Box maxWidth="920px" padding="16px" margin="auto">
        <Typography
          component="h3"
          variant={mediumScreen ? "h1" : smallScreen ? "h2" : "h3"}
          paddingBottom={smallScreen ? "12px" : 0}>
          Wishlist
        </Typography>
        <Box
          border="1px solid grey.600"
          borderRadius="2px"
          padding={mediumScreen ? "14px 18px" : "14px 0px"}>
          {data &&
            data.map((info) => (
              <WishListProductWidget
                key={info._id}
                id={info._id}
                name={info.name}
                imgUrl={info.imgUrls[info.imgUrls.length - 1]}
                rating={info.rating}
                ratingCount={info.ratingCount}
                price={info.price}
              />
            ))}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default WishlistPage;

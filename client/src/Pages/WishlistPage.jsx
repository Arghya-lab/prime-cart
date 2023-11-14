import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Navbar from "../Components/Navbar";
import WishListProductWidget from "../Components/WishListProductWidget";
import { useDispatch, useSelector } from "react-redux";
import { setWishListProducts } from "../features/product/productSlice";

function WishlistPage() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const data = useSelector((state) => state.product.wishListProducts);

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/wishList/products`,
        {
          method: "GET",
          headers: {
            Authorization: token,
          },
        }
      );
      const json = await res.json();
      if (json.success) {
        dispatch(setWishListProducts(json.data));
      } else {
        console.log(json.error);
      }
    })();
  }, [data]);

  return (
    <Box>
      <Navbar />
      <Box marginY="15px" marginX="30px">
        <Box marginBottom="2rem">
          <Typography
            variant="h2"
            color="success.dark"
              fontWeight= {700}
              padding= "1rem"
              textAlign= "center"
           >
            Wishlist
          </Typography>
          <Box
              width= "10rem"
              height= "4px"
              bgcolor= "success.dark"
              marginX= "auto"
            />
        </Box>
        <Box
          border="1px solid grey.600"
          borderRadius="2px"
            maxWidth= "1366px"
            padding= "14px 18px"
          >
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
    </Box>
  );
}

export default WishlistPage;

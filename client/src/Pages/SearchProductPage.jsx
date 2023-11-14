import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import Navbar from "../Components/Navbar";
import ProductWidget from "../Components/ProductWidget";
import Footer from "../Components/Footer";
import { setSearchProducts } from "../features/product/productSlice";

function SearchProductPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = decodeURIComponent(queryParams.get("query"));

  const dispatch = useDispatch();
  const data = useSelector((state) => state.product.searchProducts);

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/products?query=${query}`
      );
      const json = await res.json();
      if (json.success) {
        console.log(json.data);
        dispatch(setSearchProducts(json.data));
      } else {
        console.log(json.error);
      }
    })();
  }, [query]);

  return (
    <Box>
      <Navbar />
      {data.length !== 0 ? (
        <Box margin="1rem">
          <Box
            border="1px solid"
            borderColor="grey.500"
            borderRadius="8px"
            padding="14px 18px"
            marginY="20px">
            <Typography
              component="span"
              variant="subtitle1"
              sx={{
                paddingLeft: "20px",
              }}>
              1-12 of over 60,000 results for
            </Typography>
            &nbsp;
            <Typography
              component="span"
              variant="subtitle1"
              color="secondary.dark"
              fontWeight={600}>
              Electronics
            </Typography>
          </Box>
          <Box
            display="grid"
            gridTemplateColumns="repeat(auto-fill,minmax(320px,auto))"
            gap="1rem">
            {data.map((info) => (
              <ProductWidget
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
      ) : (
        //  customize this and add styles
        <Typography>No product available</Typography>
      )}
      <Footer />
    </Box>
  );
}

export default SearchProductPage;

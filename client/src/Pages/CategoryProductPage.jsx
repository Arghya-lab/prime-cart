import { Box, Stack, Typography } from "@mui/material";
import FilterWidget from "../Components/FilterWidget";
import ProductWidget from "../Components/ProductWidget";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryProducts } from "../features/product/productSlice";

function CategoryProductPage() {
  const { type } = useParams();

  const dispatch = useDispatch()
  const data = useSelector(state=>state.product.categoryProducts)

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/products/${type}`
      );
      const json = await res.json();
      if (json.success) {
        console.log(json.data);
        dispatch(setCategoryProducts(json.data))
      } else {
        console.log(json.error);
      }
    })();
  }, []);

  return (
    <>
      <Navbar />
      <Stack direction="row">
        <FilterWidget />
        <Box sx={{ width: "100%", color: "#0F1111", margin: "1rem" }}>
          <Typography
            variant="h1"
            sx={{
              fontWeight: "700",
              fontSize: "28px",
              lineHeight: "36px",
              paddingBottom: "4px",
            }}>
            Electronics
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              lineHeight: "20px",
              marginBottom: "34px",
            }}>
            Shop home entertainment, TVs, home audio, headphones, cameras,
            accessories and more
          </Typography>
          <Box
            sx={{
              border: "1px solid #d5d9d9",
              borderRadius: "8px",
              padding: "14px 18px",
              marginY: "20px",
            }}>
            <Typography
              component="span"
              sx={{
                paddingLeft: "20px",
                fontSize: "14px",
                lineHeight: "20px",
              }}>
              1-12 of over 60,000 results for
            </Typography>
            &nbsp;
            <Typography
              component="span"
              sx={{
                fontSize: "14px",
                lineHeight: "20px",
                color: "#c45500",
                fontWeight: "600",
              }}>
              Electronics
            </Typography>
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(320px,auto))",
              gap: "1rem",
            }}>
            {data && data.map((info) => (
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
      </Stack>
      <Footer />
    </>
  );
}

export default CategoryProductPage;

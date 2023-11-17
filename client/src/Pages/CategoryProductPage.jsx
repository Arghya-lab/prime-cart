import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoadingProgress } from "../features/additionalInfo/additionalInfoSlice";
import { Box, Pagination, Stack, Typography } from "@mui/material";
import { SentimentVeryDissatisfied } from "@mui/icons-material";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import FilterWidget from "../Components/FilterWidget";
import ProductWidget from "../Components/ProductWidget";
import { setCategoryProducts } from "../features/product/productSlice";

function CategoryProductPage() {
  const { type } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = decodeURIComponent(searchParams.get("page") || 1);
  const productLimit = decodeURIComponent(searchParams.get("limit") || 2);

  const dispatch = useDispatch();
  const { categoryProducts } = useSelector((state) => state.product);

  const [totalResult, setTotalResult] = useState(0);

  useEffect(() => {
    (async () => {
      dispatch(setLoadingProgress(5));
      try {
        const res = await fetch(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/products/category/${type}?page=${currentPage}&limit=${productLimit}`
        );
        dispatch(setLoadingProgress(50));
        const json = await res.json();
        dispatch(setLoadingProgress(85));
        if (json.success) {
          console.log(json.data);
          dispatch(setCategoryProducts(json.data.products));
          setTotalResult(json.data.totalProducts);
        } else {
          console.log(json.error);
        }
      } catch (error) {
        console.log("clientSide error");
      }
      dispatch(setLoadingProgress(100));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handlePageChange = (event, page) => {
    setSearchParams({ page: page, limit: productLimit });
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Navbar />
      <Stack direction="row">
        <FilterWidget />
        <Box sx={{ width: "100%", color: "#0F1111", margin: "1rem" }}>
          <Typography variant="h1" fontWeight={700} paddingBottom="4px">
            Electronics
          </Typography>
          <Typography variant="subtitle1" marginBottom="34px">
            Shop home entertainment, TVs, home audio, headphones, cameras,
            accessories and more
          </Typography>
          {categoryProducts.length !== 0 ? (
            <>
              <Box
                border="1px solid"
                borderRadius="8px"
                borderColor="grey.500"
                padding="14px 18px"
                marginY="20px">
                <Typography
                  component="span"
                  variant="subtitle1"
                  paddingLeft="20px">
                  Total {totalResult} results for
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
                {categoryProducts.map((info) => (
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
              {totalResult / productLimit > 1 ? (
                <Box display="flex" justifyContent="center" mt={2}>
                  <Pagination
                    count={Math.ceil(totalResult / productLimit)}
                    siblingCount={1}
                    variant="outlined"
                    shape="rounded"
                    onChange={handlePageChange}
                    sx={{
                      margin: "1rem 0",
                    }}
                  />
                </Box>
              ) : null}
            </>
          ) : (
            <Box
              width="100%"
              height="100%"
              paddingTop="5rem"
              display="flex"
              justifyContent="center">
              <Typography variant="h1" gutterBottom>
                Sorry, no product available for your request.
              </Typography>
              <SentimentVeryDissatisfied fontSize="large" />
            </Box>
          )}
        </Box>
      </Stack>
      <Footer />
    </>
  );
}

export default CategoryProductPage;

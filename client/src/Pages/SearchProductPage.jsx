import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Pagination, Typography } from "@mui/material";
import Header from "../Components/Header";
import ProductWidget from "../Components/ProductWidget";
import Footer from "../Components/Footer";
import { setSearchProducts } from "../features/product/productSlice";
import { SentimentVeryDissatisfied } from "@mui/icons-material";
import { setLoadingProgress } from "../features/additionalInfo/additionalInfoSlice";

function SearchProductPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = decodeURIComponent(searchParams.get("query"));
  const currentPage = decodeURIComponent(searchParams.get("page") || 1);
  const productLimit = decodeURIComponent(searchParams.get("limit") || 15);

  const dispatch = useDispatch();
  const data = useSelector((state) => state.product.searchProducts);

  const [totalResult, setTotalResult] = useState(0);

  useEffect(() => {
    (async () => {
      dispatch(setLoadingProgress(5));
      const res = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/products?query=${query}&page=${currentPage}&limit=${productLimit}`
      );
      dispatch(setLoadingProgress(50));
      const json = await res.json();
      dispatch(setLoadingProgress(85));
      if (json.success) {
        console.log(json.data);
        dispatch(setSearchProducts(json.data.products));
        setTotalResult(json.data.totalProducts);
      } else {
        console.log(json.error);
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
    <Box>
      <Header />
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
              Total {totalResult} results for
            </Typography>
            &nbsp;
            <Typography
              component="span"
              variant="subtitle1"
              color="secondary.dark"
              fontWeight={600}>
              {query}
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
        </Box>
      ) : (
        <Box
          width="100%"
          height="100%"
          paddingY="15rem"
          display="flex"
          justifyContent="center">
          <Typography variant="h1" gutterBottom>
            Sorry, no product available for your request.
          </Typography>
          <SentimentVeryDissatisfied fontSize="large" />
        </Box>
      )}
      <Footer />
    </Box>
  );
}

export default SearchProductPage;

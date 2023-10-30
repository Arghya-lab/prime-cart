import { Box, Stack, Typography } from "@mui/material";
import FilterWidget from "../Components/FilterWidget";
import ProductWidget from "../Components/ProductWidget";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function CategoryProductPage() {
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
            <ProductWidget />
            <ProductWidget />
            <ProductWidget />
            <ProductWidget />
            <ProductWidget />
            <ProductWidget />
          </Box>
        </Box>
      </Stack>
      <Footer />
    </>
  );
}

export default CategoryProductPage;

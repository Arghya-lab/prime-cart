import { Box, Button, Stack, useMediaQuery } from "@mui/material";
import Navbar from "../../Components/Navbar";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import CategoryWidget from "../../Components/CategoryWidget";
import {
  slideHeroImages,
  categoryImgs,
  bestSellersInKitchenAndDining,
  bestSellersInBooks,
} from "./imgLinks";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import ShovelerWidget from "../../Components/ShovelerWidget";
import Footer from "../../Components/Footer";

function HomePage() {
  const mediumScreen = useMediaQuery("(min-width:768px)");

  return (
    <Box width="100vw" height="100vh" sx={{ overflowX: "hidden" }}>
      <Navbar />
      <Box position="relative" bgcolor="#fff" height="100%">
        <Slide
          {...{
            prevArrow: (
              <Button
                disableFocusRipple
                disableRipple
                sx={{
                  color: "black",
                  margin: "1rem",
                  height: "15rem",
                  width: "5rem",
                  marginTop: "50px",
                  marginBottom: mediumScreen ? "350px" : "180px",
                  ":hover": {
                    border: "2px solid success.dark",
                    borderRadius: "6px",
                  },
                }}>
                <ArrowBackIos fontSize="large" />
              </Button>
            ),
            nextArrow: (
              <Button
                disableFocusRipple
                disableRipple
                sx={{
                  color: "black",
                  margin: "1rem",
                  height: "15rem",
                  width: "5rem",
                  marginTop: "50px",
                  marginBottom: mediumScreen ? "350px" : "180px",
                  ":hover": {
                    border: "2px solid success.dark",
                    borderRadius: "6px",
                  },
                }}>
                <ArrowForwardIos fontSize="large" />
              </Button>
            ),
          }}>
          {slideHeroImages.map((slideHeroImage, index) => (
            <Box
              key={index}
              sx={{
                height: mediumScreen ? "600px" : "400px",
                width: "100%",
                maxWidth: "1500px",
                margin: "auto",
                backgroundImage: `url(${slideHeroImage.url})`,
                backgroundSize: "cover",
                backgroundPosition: "center center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          ))}
        </Slide>
        <Stack
          spacing={mediumScreen ? "1.75rem" : "0.8rem"}
          position="absolute"
          top={mediumScreen ? "350px" : "220px"}
          width="100%"
          sx={{
            background:
              "linear-gradient(to bottom, rgba(227, 230, 230, 0), rgba(227, 230, 230, 1) 150px)",
          }}>
          <Box
            px={mediumScreen ? "1.75rem" : "0.8rem"}
            display="flex"
            flexWrap="wrap"
            justifyContent="space-around"
            gap={mediumScreen ? "1.25rem" : "0.5rem"}>
            {categoryImgs.map((data) => (
              <CategoryWidget
                key={data.name}
                url={data.url}
                name={data.name}
                value={data.value}
              />
            ))}
          </Box>
          <ShovelerWidget
            title={"Best Sellers in Kitchen & Dining"}
            urls={bestSellersInKitchenAndDining}
          />
          <ShovelerWidget
            title={"Best Sellers in Books"}
            urls={bestSellersInBooks}
          />
          <Footer />
        </Stack>
      </Box>
    </Box>
  );
}

export default HomePage;

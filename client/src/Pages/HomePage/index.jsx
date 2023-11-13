import { Box, Button, Stack } from "@mui/material";
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

const properties = {
  prevArrow: (
    <Button
      disableFocusRipple
      disableRipple
      sx={{
        color: "black",
        m: "1rem",
        height: "15rem",
        width: "5rem",
        marginTop: "50px",
        marginBottom: "350px",
        ":hover": { border: "2px solid success.dark", borderRadius: "6px" },
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
        m: "1rem",
        height: "15rem",
        width: "5rem",
        marginTop: "50px",
        marginBottom: "350px",
        ":hover": { border: "2px solid success.dark", borderRadius: "6px" },
      }}>
      <ArrowForwardIos fontSize="large" />
    </Button>
  ),
};

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "cover",
  height: "600px",
  width: "100%",
  maxWidth: "1500px",
  margin: "auto",
};

function HomePage() {
  return (
    <Box
      position="relative"
      sx={{ bgcolor: "white", width: "100%", height: "100%" }}>
      <Navbar />
      <Slide {...properties}>
        {slideHeroImages.map((slideHeroImage, index) => (
          <Box
            key={index}
            sx={{
              ...divStyle,
              backgroundImage: `url(${slideHeroImage.url})`,
            }}
          />
        ))}
      </Slide>
      <Stack
        spacing="28px"
        position="absolute"
        top={350}
        width="100%"
        sx={{
          background:
            "linear-gradient(to bottom, rgba(227, 230, 230, 0), rgba(227, 230, 230, 1) 25%)",
        }}>
        <Box
        px="28px"
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
          }}>
          {categoryImgs.map((data) => (
            <Box key={data.name}>
              <CategoryWidget url={data.url} name={data.name} value={data.value} />
            </Box>
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
  );
}

export default HomePage;

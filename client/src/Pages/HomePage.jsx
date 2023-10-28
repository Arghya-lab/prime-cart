import { Box, Button } from "@mui/material";
import Navbar from "../Components/Navbar";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ItemCard from "../Components/Card";

const slideHeroImages = [
  {
    url: "http://localhost:5173/heroImgs/beauty_product_hero.jpg",
  },
  {
    url: "http://localhost:5173/heroImgs/kitchen_fav_hero.jpg",
  },
  {
    url: "http://localhost:5173/heroImgs/new_toys_hero.jpg",
  },
  {
    url: "http://localhost:5173/heroImgs/shop_books_hero.jpg",
  },
  {
    url: "http://localhost:5173/heroImgs/shop_gaming_hero.jpg",
  },
  {
    url: "http://localhost:5173/heroImgs/shop_holiday_hero.jpg",
  },
];

const category = [
  {
    url: "http://localhost:5173/categoryImgs/fash.jpg",
    name: "Fashion"
  },
  {
    url: "http://localhost:5173/categoryImgs/xcm_cuttle_home_&_kitchen.jpg",
    name: "Home & kitchen"
  },
  {
    url: "http://localhost:5173/categoryImgs/Fuji_Dash_Electronics.jpg",
    name: "Electronics"
  },
  {
    url: "http://localhost:5173/categoryImgs/Fuji_Dash_Beauty.jpg",
    name: "Beauty picks"
  },
  {
    url: "http://localhost:5173/categoryImgs/mob_&_tab.jpg",
    name: "Mobile & tablets"
  },
  {
    url: "http://localhost:5173/categoryImgs/health_essentials.jpg",
    name: "Health & Personal Care"
  },
  {
    url: "http://localhost:5173/categoryImgs/book_pic.jpg",
    name: "Books"
  },
{
    url: "http://localhost:5173/categoryImgs/tv_appliances.jpg",
    name: "Tv appliances"
  },
]

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
        ":hover": { border: "2px solid #007185", borderRadius: "6px" },
      }}>
      <ArrowBackIosIcon fontSize="large" />
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
        ":hover": { border: "2px solid #007185", borderRadius: "6px" },
      }}>
      <ArrowForwardIosIcon fontSize="large" />
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
    <Box position="relative">
      <Navbar />
      <>
        <Slide {...properties}>
          {slideHeroImages.map((slideHeroImage, index) => (
            <Box
              key={index}
              sx={{
                ...divStyle,
                backgroundImage: `url(${slideHeroImage.url})`,
              }} />
          ))}
        </Slide>
        <Box
          position="absolute"
          top={350}
          sx={{
            background:
              "linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1) 35%)",
          }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "20px",
              margin: "28px",
            }}>
              {category.map((data) => (
            <Box
              key={data.name}
              >
                <ItemCard url={data.url} name={data.name} />
              </Box>
          ))}
          </Box>
        </Box>
      </>
    </Box>
  );
}

export default HomePage;

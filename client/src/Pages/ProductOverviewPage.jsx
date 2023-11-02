import {
  Box,
  Button,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Rating,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import {
  LocalShippingOutlined,
  LocationOnOutlined,
  PaymentOutlined,
  ProductionQuantityLimitsOutlined,
} from "@mui/icons-material";

const fadeImages = [
  {
    url: "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    caption: "First Slide",
  },
  {
    url: "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
    caption: "Second Slide",
  },
  {
    url: "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    caption: "Third Slide",
  },
];

function ProductOverviewPage() {
  return (
    <>
      <Box>
        <Navbar />
        <Box
          sx={{
            margin: "1rem",
            display: "flex",
          }}>
          <div className="slide-container" style={{ width: "820px" }}>
            <Fade>
              {fadeImages.map((fadeImage, index) => (
                <div key={index}>
                  <img style={{ width: "100%" }} src={fadeImage.url} />
                </div>
              ))}
            </Fade>
          </div>
          <Box
            sx={{
              marginX: "1rem",
            }}>
            <Typography variant="h5">
              NOCO XGC4 56-Watt XGC Power Adapter For
              GB70/GB150/GB250+/GB251+/GB500+ NOCO Boost UltraSafe Lithium Jump
              Starters
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#007185",
                ":hover": {
                  cursor: "pointer",
                  color: "#C7511F",
                  textDecoration: "underline",
                },
              }}>
              Visit the NOCO Store
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}>
              <Typography>2.8</Typography>
              &nbsp;
              <Rating
                name="rating"
                size="small"
                defaultValue={2.8}
                precision={0.5}
                readOnly
              />
              <Typography
                variant="body1"
                sx={{
                  marginLeft: "1rem",
                  color: "#007185",
                  ":hover": {
                    cursor: "pointer",
                    color: "#C7511F",
                    textDecoration: "underline",
                  },
                }}>
                5316 rating
              </Typography>
            </Box>
            <Box
              sx={{
                height: "1px",
                width: "100%",
                bgcolor: "#BBBFBF",
                marginTop: "5px",
                marginBottom: "14px",
              }}></Box>
            <Typography
              variant="body2"
              sx={{
                color: "white",
                backgroundColor: "#CC0C39",
                padding: "4px 8px 4px 8px",
                borderRadius: "4px",
                display: "inline-block",
                verticalAlign: "middle",
                marginBottom: "4px",
              }}>
              Deal
            </Typography>
            <Box>
              <Typography
                component="span"
                variant="h5"
                sx={{
                  color: "#CC0C39",
                }}>
                -21%
              </Typography>
              &nbsp;
              <Box component="span">
                <Typography
                  component="span"
                  variant="body2"
                  sx={{
                    position: "relative",
                    top: "-0.5em",
                  }}>
                  ₹
                </Typography>
                <Typography variant="h5" component="span">
                  {/* selling price */}
                  7699
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                color: "#565959",
              }}>
              <Typography component="span" variant="body2">
                M.R.P.:
              </Typography>
              &nbsp;
              <Typography
                component="span"
                variant="body2"
                sx={{ textDecoration: "line-through" }}>
                ₹999
              </Typography>
            </Box>
            <Typography component="span" variant="body1">
              Inclusive of all taxes
            </Typography>
            <Box
              sx={{
                height: "1px",
                width: "100%",
                bgcolor: "#BBBFBF",
                marginTop: "5px",
                marginBottom: "14px",
              }}></Box>
            <Stack
              direction="row"
              spacing={6}
              sx={{
                alignItems: "center",
              }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}>
                <LocalShippingOutlined />
                <Typography
                  variant="body2"
                  sx={{
                    color: "#007185",
                  }}>
                  Free Delivery
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}>
                <PaymentOutlined />
                <Typography
                  variant="body2"
                  sx={{
                    color: "#007185",
                  }}>
                  Pay on Delivery
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}>
                <ProductionQuantityLimitsOutlined />
                <Typography
                  variant="body2"
                  sx={{
                    color: "#007185",
                  }}>
                  Prime Delivered
                </Typography>
              </Box>
            </Stack>
            <Box
              sx={{
                height: "1px",
                width: "100%",
                bgcolor: "#BBBFBF",
                marginTop: "5px",
                marginBottom: "14px",
              }}></Box>
            {/* varient info will be here */}
            {/* <Box
              sx={{
                height: "1px",
                width: "100%",
                bgcolor: "#BBBFBF",
                marginTop: "5px",
                marginBottom: "14px",
              }}></Box> */}
            <Typography
              variant="h6"
              sx={{
                color: "#007185",
              }}>
              Highlights
            </Typography>
            <Box paddingLeft={2}>
              <Typography variant="body2">8 GB RAM | 128 GB ROM</Typography>
              <Typography variant="body2">
                17.02 cm (6.7 inch) Full HD+ Display
              </Typography>
              <Typography variant="body2">
                100MP (OIS) + 2MP | 16MP Front Camera
              </Typography>
              <Typography variant="body2">5000 mAh Battery</Typography>
              <Typography variant="body2">Dimensity 7050 Processor</Typography>
            </Box>
            <Box
              sx={{
                height: "1px",
                width: "100%",
                bgcolor: "#BBBFBF",
                marginTop: "5px",
                marginBottom: "14px",
              }}></Box>
            <Typography
              variant="h6"
              sx={{
                color: "#007185",
              }}>
              Product Description
            </Typography>
            <Typography variant="body2">
              You can enjoy an immersive display on the 120 Hz curved vision
              display of the realme Pro 5G smartphone. Featuring a 100 MP OIS
              ProLight camera, this smartphone allows you to capture memories
              that you can cherish for a lifetime. This smartphone is powered by
              the Dimensity 7050 5G chipset for fast and efficient performance.
              The 67 W SUPERVOOC charge of this smartphone charges your phone
              from 0-50% in about 18 minutes so that you do not have to wait
              long for it to charge. With up to 12 GB + 12 GB of Dynamic RAM,
              this smartphone ensures smooth and fast operations for you to game
              and multitask easily. This smartphone comes with a 5000 mAh
              battery for long-lasting battery life.
            </Typography>
            <Box
              sx={{
                border: "1px solid #d5d9d9",
                borderRadius: "8px",
                padding: "14px 18px",
                marginY: "20px",
              }}>
              <Box>
                <Typography component="span" sx={{ color: "#007185" }}>
                  FREE delivery
                </Typography>
                &nbsp;
                <Typography component="span" sx={{ fontWeight: "600" }}>
                  Saturday, 4 November
                </Typography>
                &nbsp;
                <Typography component="span">
                  on orders dispatched by Amazon over ₹499. Or fastest delivery
                </Typography>
                &nbsp;
                <Typography component="span" sx={{ fontWeight: "600" }}>
                  Tomorrow, 3 November
                </Typography>
                <Typography component="span">. Order within</Typography>&nbsp;
                <Typography component="span" sx={{ color: "#007600" }}>
                  4 hrs 34 mins.
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  paddingY: "4px",
                }}>
                <LocationOnOutlined />
                <Typography
                  variant="body2"
                  sx={{
                    color: "#007185",
                    ":hover": {
                      cursor: "pointer",
                      color: "#C7511F",
                    },
                  }}>
                  Deliver to Arghya - Kalidaha 711314‌
                </Typography>
              </Box>
              <Typography component="p" variant="h6" sx={{ color: "#007600" }}>
                In Stock
              </Typography>
              <Typography variant="body2">
                Sold by&nbsp;
                <Typography
                  component="span"
                  sx={{
                    color: "#007185",
                    ":hover": {
                      cursor: "pointer",
                      color: "#C7511F",
                      textDecoration: "underline",
                    },
                  }}>
                  Appario Retail Private Ltd
                </Typography>&nbsp;
                and&nbsp;
                <Typography
                  component="span"
                  sx={{
                    color: "#007185",
                    ":hover": {
                      cursor: "pointer",
                      color: "#C7511F",
                      textDecoration: "underline",
                    },
                  }}>
                  Fulfilled by Amazon.
                </Typography>
              </Typography>
              <Box  paddingY={2} sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}>
              <Stack direction="row" alignItems="center" gap={2}>
                <Typography variant="body1">Quantity</Typography>
                <FormControl size="small">
                  <Select
                    // value={age}
                    // onChange={handleChange}
                    defaultValue={30}
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={30}>30</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
              <Stack gap={2} alignItems="center">
                <Button variant="contained" sx={{bgcolor: "#FFD814", color: "#0F1111", width: "200px", ":hover": {bgcolor: "#FFD018"}}}>
                  Add to Cart
                </Button>
                <Button variant="contained" sx={{bgcolor: "#FFA41C", color: "#0F1111", width: "200px", ":hover": {bgcolor: "#FFAA1D"}}}>
                  Buy Now
                </Button>
              </Stack>
              </Box>
              <Stack alignItems="center" justifyContent="center">
                <Button variant="outlined">
                  Add to Wish List
                </Button>
              </Stack>
            </Box>
          </Box>
        </Box>
        <Footer />
      </Box>
    </>
  );
}

export default ProductOverviewPage;

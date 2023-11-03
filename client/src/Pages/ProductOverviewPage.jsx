import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Rating,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import {
  LocalShippingOutlined,
  LocationOnOutlined,
  PaymentOutlined,
  ProductionQuantityLimitsOutlined,
} from "@mui/icons-material";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function ProductOverviewPage() {
  const { productId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/products/${productId}`
      );
      const json = await res.json();
      if (json.success) {
        console.log(json.data);
        setData(json.data);
      } else {
        console.log(json.error);
      }
    })();
  }, []);

  return (
    <Box>
      <Navbar />
      {data ? (
        <Box
          sx={{
            margin: "1rem",
            display: "flex",
          }}>
          <div className="slide-container" style={{ width: "800px" }}>
            <Fade>
              {data.imgUrls.map((img, index) => (
                <div
                  key={index}
                  style={{
                    margin: "auto",
                    width: "100%",
                    maxWidth: "600px",
                    maxHeight: "600px",
                    padding: "30px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  <img
                    style={{ objectFit: "contain" }}
                    src={`${
                      import.meta.env.VITE_IMG_BASE_URL
                    }/assets/productImgs/${img}`}
                  />
                </div>
              ))}
            </Fade>
          </div>
          <Box
            sx={{
              marginX: "1rem",
            }}>
            <Typography variant="h5">
              {/* name */}
              {data?.name}
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
              {/* rating = star count */}
              <Typography>{data?.rating}</Typography>
              &nbsp;
              <Rating
                name="rating"
                size="small"
                defaultValue={data?.rating}
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
                {/* rating count */}
                {data?.ratingCount}&nbsp; rating
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
                {/* discount % */}
                {(
                  ((data?.price.selling - data?.price.mrp) / data?.price.mrp) *
                  100
                ).toFixed(0)}
                %
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
                  {data?.price.selling}
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
                ₹{data?.price.mrp}
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
              {data?.highlights.map((highlight, index) => (
                <Typography key={index} variant="body2">
                  {highlight}
                </Typography>
              ))}
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
            <Typography variant="body2">{data?.description}</Typography>
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
                  Deliver to Arghya - Koala 718951‌
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
                </Typography>
                &nbsp; and&nbsp;
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
              <Box
                paddingY={2}
                sx={{
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
                      inputProps={{ "aria-label": "Without label" }}>
                      <MenuItem value={10}>10</MenuItem>
                      <MenuItem value={20}>20</MenuItem>
                      <MenuItem value={30}>30</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
                <Stack gap={2} alignItems="center">
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "#FFD814",
                      color: "#0F1111",
                      width: "200px",
                      ":hover": { bgcolor: "#FFD018" },
                    }}>
                    Add to Cart
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "#FFA41C",
                      color: "#0F1111",
                      width: "200px",
                      ":hover": { bgcolor: "#FFAA1D" },
                    }}>
                    Buy Now
                  </Button>
                </Stack>
              </Box>
              <Stack alignItems="center" justifyContent="center">
                <Button variant="outlined">Add to Wish List</Button>
              </Stack>
            </Box>
          </Box>
        </Box>
      ) : (
        // add loader
        "Hi"
      )}
      <Footer />
    </Box>
  );
}

export default ProductOverviewPage;

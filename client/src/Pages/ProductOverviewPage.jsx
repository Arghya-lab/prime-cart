import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Box, Button, Rating, Stack, Typography } from "@mui/material";
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
import { useDispatch, useSelector } from "react-redux";
import { setWishList } from "../features/additionalInfo/additionalInfoSlice";

function ProductOverviewPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const wishList = useSelector((state) => state.additionalInfo.wishList);

  const [data, setData] = useState(null);
  const [isWishListProduct, setIsWishListProduct] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/products/${productId}`
      );
      const json = await res.json();
      if (json.success) {
        console.log(json.data);
        setData(json.data);
        setIsWishListProduct(wishList.includes(json.data._id));
      } else {
        console.log(json.error);
      }
    })();
  }, []);

  const handleWishList = () => {
    // check if customer is logged in
    if (!token) {
      navigate("/login", { state: { from: location } }, { replace: true });
      return;
    }
    if (!isWishListProduct) {
      (async () => {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/wishList/${productId}`,
          {
            method: "POST",
            headers: {
              Authorization: token,
            },
          }
        );
        const json = await res.json();
        if (json.success) {
          console.log(json.data);
          dispatch(setWishList(json.data));
          setIsWishListProduct(true);
        } else {
          console.log(json.error);
        }
      })();
    } else {
      (async () => {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/wishList/${productId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: token,
            },
          }
        );
        const json = await res.json();
        if (json.success) {
          console.log(json.data);
          dispatch(setWishList(json.data));
          setIsWishListProduct(false);
        } else {
          console.log(json.error);
        }
      })();
    }
  };

  const handleAddToCart = () => {
    // check if customer is logged in
    if (!token) {
      navigate("/login", { state: { from: location } }, { replace: true });
      return;
    }
    (async () => {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ productId }),
      });
      const json = await res.json();
      if (json.success) {
        console.log(json.data);
      } else {
        console.log(json.error);
      }
    })();
  };

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
                color: "success.dark",
                ":hover": {
                  cursor: "pointer",
                  color: "secondary.main",
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
                  color: "success.dark",
                  ":hover": {
                    cursor: "pointer",
                    color: "secondary.main",
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
                bgcolor: "grey.600",
                marginTop: "5px",
                marginBottom: "14px",
              }}></Box>
            <Typography
              variant="body2"
              sx={{
                color: "white",
                backgroundColor: "error.light",
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
                  color: "error.light",
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
                color: "grey.800",
              }}>
              <Typography component="span" variant="body2">
                M.R.P.:
              </Typography>
              &nbsp;
              <Typography
                component="span"
                variant="body2"
                textDecoration="line-through">
                ₹{data?.price.mrp}
              </Typography>
            </Box>
            <Typography component="span" variant="body1">
              Inclusive of all taxes
            </Typography>
            <Box
              height="1px"
              width="100%"
              bgcolor="grey.600"
              marginTop="5px"
              marginBottom="14px"
            />
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
                    color: "success.dark",
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
                    color: "success.dark",
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
                    color: "success.dark",
                  }}>
                  Prime Delivered
                </Typography>
              </Box>
            </Stack>
            <Box
              height="1px"
              width="100%"
              bgcolor="grey.600"
              marginTop="5px"
              marginBottom="14px"
            />
            {/* variant info will be here */}
            {/* <Box
                height= "1px"
                width= "100%"
                bgcolor= "grey.600"
                marginTop= "5px"
                marginBottom= "14px"
              /> */}
            <Typography
              variant="h6"
              sx={{
                color: "success.dark",
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
              height="1px"
              width="100%"
              bgcolor="grey.600"
              marginTop="5px"
              marginBottom="14px"
            />
            <Typography
              variant="h6"
              sx={{
                color: "success.dark",
              }}>
              Product Description
            </Typography>
            <Typography variant="body2">{data?.description}</Typography>
            <Box
              border="1px solid"
              borderColor="grey.500"
              borderRadius="8px"
              padding="14px 18px"
              marginY="20px">
              <Box>
                <Typography component="span" color="success.dark">
                  FREE delivery
                </Typography>
                &nbsp;
                <Typography component="span" fontWeight={600}>
                  Saturday, 4 November
                </Typography>
                &nbsp;
                <Typography component="span">
                  on orders dispatched by Amazon over ₹499. Or fastest delivery
                </Typography>
                &nbsp;
                <Typography component="span" fontWeight={600}>
                  Tomorrow, 3 November
                </Typography>
                <Typography component="span">. Order within</Typography>&nbsp;
                <Typography component="span" color="success.main">
                  4 hrs 34 mins.
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" paddingY="4px">
                <LocationOnOutlined />
                <Typography
                  variant="body2"
                  sx={{
                    color: "success.dark",
                    ":hover": {
                      cursor: "pointer",
                      color: "secondary.main",
                    },
                  }}>
                  Deliver to Arghya - Koala 718951‌
                </Typography>
              </Box>
              <Typography component="p" variant="h6" color="success.main">
                In Stock
              </Typography>
              <Typography variant="body2">
                Sold by&nbsp;
                <Typography
                  component="span"
                  sx={{
                    color: "success.dark",
                    ":hover": {
                      cursor: "pointer",
                      color: "secondary.main",
                      textDecoration: "underline",
                    },
                  }}>
                  Appario Retail Private Ltd
                </Typography>
                &nbsp; and&nbsp;
                <Typography
                  component="span"
                  sx={{
                    color: "success.dark",
                    ":hover": {
                      cursor: "pointer",
                      color: "secondary.main",
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
                <Stack gap={2} alignItems="center">
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "warning.light",
                      color: "#0F1111",
                      width: "200px",
                      ":hover": { bgcolor: "warning.main" },
                    }}
                    onClick={handleAddToCart}>
                    Add to Cart
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "#FFA41C",
                      color: "#0F1111",
                      width: "200px",
                      ":hover": { bgcolor: "secondary.light" },
                    }}>
                    Buy Now
                  </Button>
                </Stack>
              </Box>
              <Stack alignItems="center" justifyContent="center">
                <Button variant="outlined" onClick={handleWishList}>
                  {isWishListProduct
                    ? "Remove from Wish List"
                    : "Add to Wish List"}
                </Button>
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

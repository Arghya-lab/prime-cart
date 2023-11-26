import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { setLoadingProgress } from "../features/additionalInfo/additionalInfoSlice";

function OrderDetailsPage() {
  const mediumScreen = useMediaQuery("(min-width:768px)");
  const smallScreen = useMediaQuery("(min-width:425px)");

  const { orderId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const [data, setData] = useState({});

  const productPrice = isNaN(data?.price?.productPrice)
    ? 0
    : data?.price?.productPrice;
  const deliveryCharge = isNaN(data?.price?.deliveryCharge)
    ? 0
    : data?.price?.deliveryCharge;

  useEffect(() => {
    (async () => {
      dispatch(setLoadingProgress(5));
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/orders/${orderId}`,
        {
          method: "GET",
          headers: {
            Authorization: token,
          },
        }
      );
      dispatch(setLoadingProgress(50));
      const json = await res.json();
      dispatch(setLoadingProgress(85));
      if (json.success) {
        console.log(json.data);
        setData(json.data);
      } else {
        console.log(json.error);
      }
      dispatch(setLoadingProgress(100));
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleShowProduct = () => {
    navigate(`/product/${data?.productId}`);
  };

  return (
    <Box sx={{ overflowX: "hidden" }}>
      <Header />
      <Box maxWidth="920px" padding="16px" margin="auto">
        <Typography component="h4" variant={mediumScreen ? "h1" : "h2"}>
          Order Details
        </Typography>
        <Box paddingY="10px">
          <Typography
            component="p"
            display={mediumScreen ? "inline" : "block"}
            variant="h6">
            Ordered on&nbsp;{data?.orderPlacedTime}
          </Typography>
          {mediumScreen ? (
            <Box component="span" color="grey.700" marginX="10px">
              |
            </Box>
          ) : null}
          <Typography
            component="p"
            display={mediumScreen ? "inline" : "block"}
            variant="h6">
            Order#&nbsp;{data?._id}
          </Typography>
        </Box>
        <Box
          display="flex"
          flexDirection={mediumScreen ? "column" : "column-reverse"}>
          <Box
            border="1px solid"
            borderColor="grey.500"
            borderRadius="8px"
            padding="14px 18px"
            marginBottom="12px"
            display="flex"
            justifyContent="space-between"
            gap="1rem"
            flexDirection={mediumScreen ? "row" : "column"}>
            <Box>
              <Typography
                component="p"
                variant="h6"
                fontWeight={600}
                paddingBottom="5px">
                Shipping Address
              </Typography>
              <Typography component="div" variant="h6">
                {data?.shippingAddress?.fullName}
              </Typography>
              <Typography component="div" variant="h6">
                {data?.shippingAddress?.landmark}
              </Typography>
              <Typography component="div" variant="h6">
                {data?.shippingAddress?.area}
              </Typography>
              <Typography component="div" variant="h6">
                {data?.shippingAddress?.city.toUpperCase()},&nbsp;
                {data?.shippingAddress?.pinCode}
              </Typography>
              <Typography component="div" variant="h6">
                {data?.shippingAddress?.state.toUpperCase()}
              </Typography>
            </Box>
            <Box>
              <Typography component="p" variant="h6" fontWeight={600}>
                Payment Methods
              </Typography>
              <Typography component="div" variant="h6">
                {data?.paymentType === "cod"
                  ? "Pay on delivery"
                  : "Online Payment"}
              </Typography>
            </Box>
            <Box
              width={mediumScreen ? "30%" : "100%"}
              maxWidth={mediumScreen ? "260px" : "220px"}>
              <Typography
                component="p"
                variant="h6"
                fontWeight={600}
                paddingBottom="5px">
                Order Summary
              </Typography>
              <Box display="flex" justifyContent="space-between">
                <Typography component="div" variant="h6">
                  Item(s) Subtotal:
                </Typography>
                <Typography component="div" variant="h6">
                  {productPrice}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography>Shipping:</Typography>
                <Typography component="div" variant="h6">
                  {deliveryCharge}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography component="p" variant="h6" fontWeight={600}>
                  Total:
                </Typography>
                <Typography component="p" variant="h6" fontWeight={600}>
                  {productPrice + deliveryCharge}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box>
            <Box
              border="1px solid"
              borderColor="grey.500"
              borderRadius="8px"
              padding="14px 18px"
              marginBottom="12px">
              <Stack direction="row" paddingY="12px">
                <Box margin="0 20px 0 0">
                  <img
                    // img url
                    src={`${
                      import.meta.env.VITE_IMG_BASE_URL
                    }/assets/productImgs/${data?.imgUrl}`}
                    height={smallScreen ? "100px" : "72px"}
                    width={smallScreen ? "100px" : "72px"}
                  />
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    maxWidth: "448px",
                  }}>
                  <Typography
                    component="p"
                    variant={smallScreen ? "h5" : "h6"}
                    color="success.dark"
                    sx={{
                      cursor: "pointer",
                      ":hover": {
                        color: "secondary.main",
                        textDecoration: "underline",
                      },
                    }}
                    onClick={handleShowProduct}>
                    {/* name */}
                    {data?.name}
                  </Typography>
                  <Typography
                    component="div"
                    variant="h6"
                    color="error"
                    marginTop="8px">
                    Rs.&nbsp;{productPrice}
                  </Typography>
                  <Typography
                    component="p"
                    variant={smallScreen ? "h6" : "body2"}
                    marginTop={smallScreen ? "8px" : 0}>
                    Qty.&nbsp;{data?.quantity}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default OrderDetailsPage;

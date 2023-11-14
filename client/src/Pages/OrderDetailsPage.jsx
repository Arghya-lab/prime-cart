import { Box, Divider, Stack, Typography } from "@mui/material";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function OrderDetailsPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const [data, setData] = useState({});

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/orders/${orderId}`,
        {
          method: "GET",
          headers: {
            Authorization: token,
          },
        }
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

  const handleShowProduct = () => {
    navigate(`/product/${data?.productId}`);
  };

  return (
    <Box>
      <Navbar />
      <Box width="920px" padding="16px" margin="auto">
        <Typography variant="h1">Order Details</Typography>
        <Box paddingY="10px">
          <Typography component="span" variant="h6">
            Ordered on&nbsp;{data?.orderPlacedTime}
          </Typography>
          <Divider
            component="span"
            color="#DDD"
            orientation="vertical"
            variant="middle"
            sx={{ marginX: "16px" }}
          />
          <Typography component="span" variant="h6">
            Order#&nbsp;{data?._id}
          </Typography>
        </Box>
        <Box
          border="1px solid"
          borderColor="grey.500"
          borderRadius="8px"
          padding="14px 18px"
          marginBottom="12px"
          display="flex"
          justifyContent="space-between">
          <Box>
            <Typography
              component="p" variant="h6"
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
              {data?.shippingAddress?.landmark}
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
          <Box width="30%">
            <Typography
              component="p" variant="h6"
              fontWeight={600}
              paddingBottom="5px">
              Order Summary
            </Typography>
            <Box display="flex" justifyContent="space-between">
              <Typography component="div" variant="h6">Item(s) Subtotal:</Typography>
              <Typography component="div" variant="h6">379.00</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography>Shipping:</Typography>
              <Typography component="div" variant="h6">40.00</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography component="p" variant="h6" fontWeight={600}>
                Total:
              </Typography>
              <Typography component="p" variant="h6" fontWeight={600}>
                {data?.price}
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
                  height="100px"
                  width="100px"
                />
              </Box>
              <Box
                sx={{
                  width: "100%",
                  maxWidth: "448px",
                }}>
                <Typography
                  variant="h5"
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
                <Typography component="div" variant="h6" color="error" marginTop="8px">
                  Rs.&nbsp;{data?.price}
                </Typography>
                <Typography component="div" variant="h6" marginTop="8px">
                  Qty.&nbsp;{data?.quantity}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default OrderDetailsPage;

import { Box, Paper, Stack, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setOrdersStatusCount,
  setSalesAndRevenue,
} from "../features/seller/sellerSlice";

function SellerOverview() {
  const dispatch = useDispatch();
  const sellerToken = useSelector((state) => state.auth.sellerToken);
  const { ordersStatusCount, salesAndRevenue } = useSelector(
    (state) => state.seller
  );

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/orders/statistics`,
        {
          method: "GET",
          headers: {
            "Seller-Authorization": sellerToken,
          },
        }
      );
      const json = await res.json();
      if (json.success) {
        console.log(json.data);
        dispatch(setOrdersStatusCount(json.data.ordersStatusCount));
        dispatch(setSalesAndRevenue(json.data.salesAndRevenue));
      } else {
        enqueueSnackbar(json.error, { variant: "error" });
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box margin="1rem">
      <Box>
        <Typography
          component="h6"
          variant="h2"
          margin="36px 18px"
          borderBottom="2px solid #DDD">
          Order status
        </Typography>
        <Box marginX="36px" display="flex" gap="24px" flexWrap="wrap">
          {Object.keys(ordersStatusCount).map((type) => (
            //  Object.keys(ordersStatusCount) returns an array of keys
            <Paper key={type} elevation={3} sx={{ padding: "24px 48px" }}>
              <Typography
                component="h6"
                variant="h3"
                fontWeight={600}
                color={
                  type === "canceled"
                    ? "error"
                    : type === "processing"
                    ? "warning.dark"
                    : type === "confirmed"
                    ? "success.main"
                    : "grey.800"
                }>
                {type}
              </Typography>
              <Typography
                component="p"
                variant="h1"
                textAlign="right"
                color="grey.800">
                {ordersStatusCount[type]}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Box>
      <Box>
        <Typography
          component="h6"
          variant="h2"
          margin="5rem 18px 36px"
          borderBottom="2px solid #DDD">
          Top selling products
        </Typography>
        <Paper
          elevation={3}
          sx={{
            marginX: "36px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}>
          {Object.keys(salesAndRevenue).map((key) => {
            const item = salesAndRevenue[key];
            return (
              <Box key={key}>
                <Stack direction="row">
                  <Box width="220px" minHeight="150px" cursor="pointer">
                    <img
                      /* img url */
                      src={`${
                        import.meta.env.VITE_IMG_BASE_URL
                      }/assets/productImgs/${
                        item.product.imgUrls[item.product.imgUrls.length - 1]
                      }`}
                      height="160px"
                      width="160px"
                      style={{ margin: "16px" }}
                    />
                  </Box>
                  <Box
                    width="100%"
                    paddingY="22px"
                    textAlign="left"
                    display="flex"
                    justifyContent="space-between">
                    <Box paddingRight="220px" maxWidth="550px">
                      <Typography
                        component="p"
                        variant="h4"
                        color="grey.800"
                        fontWeight={600}
                        sx={{
                          ":hover": {
                            cursor: "pointer",
                            color: "secondary.main",
                          },
                        }}>
                        {item.product.name}
                      </Typography>
                      <Box>
                        <Typography component="span" variant="h5">
                          Category :&nbsp;
                        </Typography>
                        <Typography
                          component="span"
                          variant="h5"
                          color="grey.800">
                          {item.product.category
                            .replace(/([A-Z])/g, " $1") // Insert space before capital letters
                            .replace(
                              /^./,
                              (str) => str.toUpperCase() // Capitalize the first letter
                            )}
                        </Typography>
                      </Box>
                      <Box marginY="4px">
                        <Typography component="span" variant="h5">
                          Total sold count :
                        </Typography>
                        &nbsp;
                        <Typography
                          component="span"
                          variant="h6"
                          fontWeight={600}
                          color="success.light">
                          {item.totalSalesNo}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography component="span" variant="h5">
                          Total revenue :
                        </Typography>
                        &nbsp;
                        <Typography
                          component="span"
                          variant="body2"
                          sx={{ position: "relative", top: "-0.3em" }}>
                          ₹
                        </Typography>
                        <Typography
                          component="span"
                          fontWeight={600}
                          color="success.main">
                          {item.totalRevenue}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          component="span"
                          variant="h5"
                          color="error.light">
                          Canceled&nbsp;
                        </Typography>
                        <Typography
                          component="span"
                          variant="h6"
                          color="grey.800"
                          textDecoration="line-through">
                          by : {item.totalCanceled} people
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Stack>
                <Box
                  sx={{
                    height: "2px",
                    bgcolor: "#DDD",
                    marginX: "1rem",
                  }}
                />
              </Box>
            );
          })}
        </Paper>
      </Box>
    </Box>
  );
}

export default SellerOverview;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Paper, Stack, Typography, useMediaQuery } from "@mui/material";
import {
  setOrdersStatusCount,
  setSalesAndRevenue,
} from "../features/seller/sellerSlice";
import { enqueueSnackbar } from "notistack";

function SellerOverview() {
  const mediumScreen = useMediaQuery("(min-width:768px)");
  const smallScreen = useMediaQuery("(min-width:425px)");

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
    <Box
      maxWidth="920px"
      padding={smallScreen ? "16px" : 0}
      margin="auto"
      sx={{ overflowX: "hidden" }}>
      <Box>
        <Typography
          component="h6"
          variant={smallScreen ? "h2" : "h3"}
          margin={mediumScreen ? "36px 18px" : "16px 16px 24px"}
          borderBottom="2px solid #DDD">
          Order status
        </Typography>
        <Box
          marginX={mediumScreen ? "36px" : "24px"}
          display="flex"
          gap="24px"
          flexWrap="wrap">
          {Object.keys(ordersStatusCount).map((type) => (
            //  Object.keys(ordersStatusCount) returns an array of keys
            <Paper
              key={type}
              elevation={3}
              sx={{ padding: mediumScreen ? "24px 48px" : "12px 24px" }}>
              <Typography
                component="h6"
                variant={mediumScreen ? "h3" : "h4"}
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
          margin={smallScreen ? "80px 18px 36px" : "36px 18px 24px"}
          borderBottom="2px solid #DDD">
          Top selling products
        </Typography>
        <Paper
          elevation={3}
          sx={{
            marginX: mediumScreen ? "36px" : "24px",
            marginBottom: "24px",
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
                      height={smallScreen ? "160px" : "120px"}
                      width={smallScreen ? "160px" : "120px"}
                      style={{ margin: "16px" }}
                    />
                  </Box>
                  <Box
                    width="100%"
                    paddingY="20px"
                    textAlign="left"
                    display="flex"
                    justifyContent="space-between">
                    <Box
                      paddingRight={mediumScreen ? "220px" : "12px"}
                      maxWidth="550px">
                      <Typography
                        component="p"
                        variant={
                          mediumScreen ? "h4" : smallScreen ? "h6" : "body2"
                        }
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
                        {smallScreen ? (
                          <Typography component="span" variant="h5">
                            Category :&nbsp;
                          </Typography>
                        ) : null}
                        <Typography
                          component="span"
                          variant={smallScreen ? "h5" : "subtitle2"}
                          color="grey.800">
                          {item.product.category
                            .replace(/([A-Z])/g, " $1") // Insert space before capital letters
                            .replace(
                              /^./,
                              (str) => str.toUpperCase() // Capitalize the first letter
                            )}
                        </Typography>
                      </Box>
                      <Box marginY={smallScreen ? "4px" : 0}>
                        <Typography
                          component="span"
                          variant={smallScreen ? "h5" : "subtitle2"}>
                          Total sold :
                        </Typography>
                        &nbsp;
                        <Typography
                          component="span"
                          variant={smallScreen ? "h6" : "subtitle2"}
                          fontWeight={600}
                          color="success.light">
                          {item.totalSalesNo} items
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          component="span"
                          variant={smallScreen ? "h5" : "subtitle2"}>
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
                          variant={smallScreen ? "h5" : "subtitle2"}
                          color="error.light">
                          Canceled&nbsp;
                        </Typography>
                        <Typography
                          component="span"
                          variant={smallScreen ? "h6" : "subtitle2"}
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

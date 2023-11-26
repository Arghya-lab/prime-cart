import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Box, Paper, Stack, Typography, useMediaQuery } from "@mui/material";

function OrderProductWidget({
  orderId,
  productId,
  name,
  imgUrl,
  quantity,
  price,
  orderPlacedTime,
}) {
  const mediumScreen = useMediaQuery("(min-width:768px)");
  const smallScreen = useMediaQuery("(min-width:425px)");

  const navigate = useNavigate();

  const handleShowOrderDetail = () => {
    navigate(`/orderDetails/${orderId}`);
  };
  const handleShowProduct = () => {
    navigate(`/product/${productId}`);
  };
  return (
    <Paper
      elevation={1}
      sx={{
        borderRadius: "8px",
      }}>
      <Box
        padding="14px 18px"
        display="flex"
        justifyContent="space-between"
        flexDirection={smallScreen ? "row" : "column"}
        borderRadius="8px 8px 0 0"
        borderBottom="1px solid"
        borderColor="grey.500"
        bgcolor="grey.100">
        <Box display="flex" justifyContent="flex-start">
          <Box paddingRight="16px">
            <Typography
              component={smallScreen ? "p" : "span"}
              variant={smallScreen ? "body2" : "caption"}
              color="grey.800"
              noWrap>
              ORDER PLACED&nbsp;
            </Typography>
            <Typography
              component={smallScreen ? "p" : "span"}
              variant={smallScreen ? "subtitle2" : "caption"}
              color="grey.800">
              {orderPlacedTime}
            </Typography>
          </Box>
          {mediumScreen ? (
            <Box>
              <Typography variant="body2" color="grey.800">
                PRICE
              </Typography>
              <Typography variant="subtitle2" color="grey.800">
                ₹{price.productPrice + price.deliveryCharge}
              </Typography>
            </Box>
          ) : null}
        </Box>
        <Box textAlign="right">
          {mediumScreen ? (
            <Typography variant="subtitle2" color="grey.800">
              ORDER #&nbsp;{orderId}
            </Typography>
          ) : smallScreen ? (
            <>
              <Typography component="span" variant="body2" color="grey.800">
                PRICE&nbsp;
              </Typography>
              <Typography component="span" variant="subtitle2" color="grey.800">
                ₹{price.productPrice + price.deliveryCharge}
              </Typography>
            </>
          ) : null}
          <Typography
            variant="subtitle2"
            color="success.dark"
            sx={{
              cursor: "pointer",
              ":hover": {
                color: "secondary.main",
                textDecoration: "underline",
              },
            }}
            onClick={handleShowOrderDetail}>
            View order details
          </Typography>
        </Box>
      </Box>
      <Box padding="14px 18px">
        <Stack direction="row" paddingY="12px">
          <Box margin="0 20px 0 0">
            <img
              /* img url */
              src={`${
                import.meta.env.VITE_IMG_BASE_URL
              }/assets/productImgs/${imgUrl}`}
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
              variant={smallScreen ? "body1" : "subtitle2"}
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
              {name}
            </Typography>
            {!smallScreen ? (
              <Box marginTop="8px">
                <Typography component="span" variant="body1" color="grey.800">
                  Price&nbsp;
                </Typography>
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="grey.800">
                  ₹{price.productPrice + price.deliveryCharge}
                </Typography>
              </Box>
            ) : null}
            <Typography variant="body2" marginTop={smallScreen ? "8px" : 0}>
              Qty.&nbsp;{quantity}
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Paper>
  );
}

OrderProductWidget.propTypes = {
  orderId: PropTypes.string.isRequired,
  productId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  price: PropTypes.object.isRequired,
  orderPlacedTime: PropTypes.string.isRequired,
};

export default OrderProductWidget;

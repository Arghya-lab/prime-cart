import PropTypes from "prop-types"
import { useNavigate } from "react-router-dom";
import { Box, Paper, Stack, Typography } from "@mui/material";

function OrderProductWidget({
  orderId,
  productId,
  name,
  imgUrl,
  quantity,
  totalPrice,
  orderPlacedTime
}) {
  const navigate = useNavigate()

  const handleShowOrderDetail = () => {
    console.log("order detail show");
  }
  const handleShowProduct = () => {
    navigate(`/product/${productId}`)
  }
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
        borderRadius="8px 8px 0 0"
        borderBottom="1px solid #D5D9D9"
        bgcolor="#F0F2F2">
        <Box display="flex" justifyContent="flex-start">
          <Box paddingRight="16px">
            <Typography variant="body2" color="#565959" noWrap>
              ORDER PLACED
            </Typography>
            <Typography variant="subtitle2" color="#565959">
              {orderPlacedTime}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="#565959">
              TOTAL
            </Typography>
            <Typography variant="subtitle2" color="#565959">
              ₹{totalPrice}
            </Typography>
          </Box>
        </Box>
        <Box textAlign="right">
          <Typography variant="subtitle2" color="#565959">
            ORDER #&nbsp;{orderId}
          </Typography>
          <Typography
            variant="subtitle2"
            color="#007185"
            sx={{
              cursor: "pointer",
              ":hover": {
                color: "#C7511F",
                textDecoration: "underline",
              },
            }}
            onClick={handleShowOrderDetail}
            >
            View order details
          </Typography>
        </Box>
      </Box>
      <Box padding="14px 18px">
        <Stack direction="row" paddingY="12px">
          <Box margin="0 20px 0 0">
            <img
              /* img url */
              src={`${import.meta.env.VITE_IMG_BASE_URL}/assets/productImgs/${imgUrl}`}
              height="100px"
              width="100px"
            />
          </Box>
          <Box
            sx={{
              width: "100%",
              maxWidth: "448px",
            }}>
            <Typography variant="body1" color="#007185" sx={{
              cursor: "pointer",
              ":hover": {
                color: "#C7511F",
                textDecoration: "underline",
              },
            }}
            onClick={handleShowProduct}>
              {/* name */}
              {name}
            </Typography>
            <Typography variant="body2" marginTop="8px">
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
  totalPrice: PropTypes.number.isRequired,
  orderPlacedTime: PropTypes.string.isRequired,
}

export default OrderProductWidget;

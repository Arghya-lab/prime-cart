import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  LinearProgress,
  Stack,
  Typography,
  linearProgressClasses,
  useMediaQuery,
} from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { setProducts } from "../../features/checkout/checkoutSlice";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 13,
  borderRadius: 8,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 0,
    backgroundColor: theme.palette.mode === "light" ? "#009674" : "#308fe8",
  },
}));

function CartSubtotalSummary() {
  const mediumScreen = useMediaQuery("(min-width:768px)");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, totalPrice, totalCount } = useSelector(
    (state) => state.cart
  );

  const freeDeliveryProgressBarValue = () => {
    if (totalPrice >= 499) {
      return 100;
    } else {
      return Math.floor((totalPrice / 499) * 100);
    }
  };

  const handleBuyCartProducts = () => {
    dispatch(setProducts(products));
    navigate("/checkout");
  };

  return (
    <Box padding={mediumScreen ? "20px" : "0 16px 16px"} bgcolor="white">
      {mediumScreen ? (
        <Stack direction="row" gap="4px" alignItems="center">
          <Box width="100%">
            <BorderLinearProgress
              variant="determinate"
              value={freeDeliveryProgressBarValue()}
            />
          </Box>
          <Typography variant="subtitle2">₹499</Typography>
        </Stack>
      ) : null}
      {totalPrice >= 500 ? (
        <Stack direction="row">
          <CheckCircle sx={{ color: "success.light" }} />
          <Box>
            <Typography
              component="span"
              variant="caption"
              sx={{
                color: "success.light",
                fontWeight: 600,
              }}>
              Your order is eligible for FREE Delivery.
            </Typography>
            <Typography component="span" variant="caption">
              Choose
            </Typography>
            <Typography
              component="span"
              variant="caption"
              sx={{
                color: "success.light",
              }}>
              FREE Delivery.
            </Typography>
            <Typography component="span" variant="caption">
              option at checkout.
            </Typography>
          </Box>
        </Stack>
      ) : (
        <Box>
          <Typography component="span" variant="body2">
            Add items worth
          </Typography>
          &nbsp;
          <Typography
            component="span"
            variant="body2"
            sx={{
              color: "error.main",
            }}>
            ₹{500 - totalPrice}
          </Typography>
          &nbsp;
          <Typography component="span" variant="body2">
            for
          </Typography>
          &nbsp;
          <Typography
            component="span"
            variant="body2"
            sx={{
              color: "success.dark",
            }}>
            FREE Delivery
          </Typography>
          <Typography
            component="p"
            variant="body2"
            sx={{
              color: "success.dark",
              cursor: "pointer",
              ":hover": {
                color: "error.main",
                textDecoration: "underLine",
              },
            }}>
            View Products ›
          </Typography>
        </Box>
      )}
      <Box marginY="14px">
        <Typography component="span" fontSize="18px" lineHeight="24px">
          Total ({totalCount} items):
        </Typography>
        &nbsp;
        <Typography
          component="span"
          variant="caption"
          sx={{ position: "relative", top: "-0.3em", fontWeight: 600 }}>
          ₹
        </Typography>
        <Typography component="span" variant="h4" sx={{ fontWeight: 600 }}>
          {/* total price */}
          {totalPrice}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" marginY="2rem">
        <Button
          variant="contained"
          color="warning"
          onClick={handleBuyCartProducts}>
          Proceed to Buy
        </Button>
      </Box>
    </Box>
  );
}

export default CartSubtotalSummary;

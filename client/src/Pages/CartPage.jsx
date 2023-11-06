import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  LinearProgress,
  Stack,
  Typography,
  linearProgressClasses,
} from "@mui/material";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import CartProductWidget from "../Components/CartProductWidget";
import { CheckCircle } from "@mui/icons-material";

function CartPage() {
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

  return (
    <Box sx={{ bgcolor: "#eaeded" }}>
      <Navbar />
      <Box
        margin="20px"
        display="grid"
        gridTemplateColumns="1fr 300px"
        columnGap="20px">
        <Box padding="20px" bgcolor="white">
          <Typography
            variant="h5"
            sx={{
              fontWeight: 400,
              fontSize: "28px",
              lineHeight: "36px",
            }}>
            Shopping Cart
          </Typography>
          <Typography
            component="span"
            variant="subtitle2"
            sx={{
              color: "#007185",
              cursor: "pointer",
              ":hover": {
                textDecoration: "underline",
              },
            }}>
            Deselect all items
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#565959",
              textAlign: "right",
              borderBottom: "1px solid #DDD",
            }}>
            Price
          </Typography>
          <Box display="grid" gridTemplateColumns="1fr" rowGap="12px">
            <CartProductWidget />
            <CartProductWidget />
          </Box>
          <Box textAlign="right" marginBottom="14px">
            <Typography component="span" fontSize="18px" lineHeight="24px">
              Subtotal (6 items):{" "}
            </Typography>
            <Typography
              component="span"
              variant="caption"
              sx={{ position: "relative", top: "-0.3em", fontWeight: 600 }}>
              ₹
            </Typography>
            <Typography component="span" variant="h6" sx={{ fontWeight: 600 }}>
              {/* total price */}
              1128.00
            </Typography>
          </Box>
        </Box>
        <Box padding="20px" bgcolor="white">
          <Stack direction="row" gap="4px" alignItems="center">
            <Box width="100%">
              <BorderLinearProgress variant="determinate" value={100} />
            </Box>
            <Typography variant="subtitle2">₹499</Typography>
          </Stack>
          <Stack direction="row">
            <CheckCircle sx={{ color: "#009674" }} />
            <Box>
              <Typography
                component="span"
                variant="caption"
                sx={{
                  color: "#009674",
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
                  color: "#009674",
                }}>
                FREE Delivery.
              </Typography>
              <Typography component="span" variant="caption">
                option at checkout.
              </Typography>
            </Box>
          </Stack>
          <Box marginY="14px">
            <Typography component="span" fontSize="18px" lineHeight="24px">
              Subtotal (6 items):
            </Typography>
            &nbsp;
            <Typography
              component="span"
              variant="caption"
              sx={{ position: "relative", top: "-0.3em", fontWeight: 600 }}>
              ₹
            </Typography>
            <Typography component="span" variant="h6" sx={{ fontWeight: 600 }}>
              {/* total price */}
              1128.00
            </Typography>
          </Box>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#FFD814",
              color: "#0F1111",
              width: "200px",
              ":hover": { bgcolor: "#FFD018" },
            }}
            // onClick={handleAddToCart}
          >
            Proceed to Buy
          </Button>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default CartPage;

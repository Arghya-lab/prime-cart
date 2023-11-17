import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Button, Stack, Typography } from "@mui/material";
import { resetCheckout } from "../features/checkout/checkoutSlice";

function PreviewItemSectionWidget() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, totalProductsPrice } = useSelector(
    (state) => state.checkout
  );

  const handleRedirectToOrderPage = () => {
    dispatch(resetCheckout());
    navigate("/orders");
  };

  return (
    <Box marginLeft="35px">
      <Box
        border="1px solid"
        borderColor="grey.500"
        borderRadius="8px"
        padding="14px 18px">
        <Box>
          {/* use products.map */}
          {products.map((product) => (
            <Box key={product.productId}>
              <Typography variant="h6" fontWeight={600}>
                Delivery date:&nbsp;
                <Typography
                  component="span"
                  variant="h6"
                  fontWeight={600}
                  color="success.main">
                  12 Nov 2023
                </Typography>
              </Typography>
              <Typography variant="body2" color="grey.800">
                If you order in the next 7 hours and 22 minutes
              </Typography>
              <Stack direction="row" paddingY="12px">
                <Box height="120px" width="120px" margin="0 20px">
                  <img
                    /* img url */
                    src={`${
                      import.meta.env.VITE_IMG_BASE_URL
                    }/assets/productImgs/${
                      product.imgUrls[product.imgUrls.length - 1]
                    }`}
                    height="100px"
                    width="100px"
                  />
                </Box>
                <Box
                  sx={{
                    width: "100%",
                  }}>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    paddingRight={2}>
                    {/* name */}
                    {product.name}
                  </Typography>
                  <Box>
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{ textDecoration: "line-through" }}>
                      {/* MRP */}₹{product.price.mrp}
                    </Typography>
                    &nbsp;
                    <Typography
                      component="span"
                      variant="body2"
                      color="error.main"
                      sx={{ fontWeight: 600 }}>
                      {/* selling price */}₹{product.price.selling}
                    </Typography>
                  </Box>
                  <Box
                    component="span"
                    border="1px solid"
                    borderColor="grey.500"
                    borderRadius="6px"
                    boxShadow="0 2px 5px 0 rgba(213,217,217,.5)"
                    padding="2px 5px">
                    <Typography variant="caption">
                      Qty: {product.quantity}
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </Box>
          ))}
        </Box>
      </Box>
      <Box
        marginTop="16px"
        border="1px solid"
        borderColor="grey.500"
        borderRadius="8px"
        padding="14px 18px"
        display="flex">
        <Box width="60%" paddingRight="20px">
          <Button
            variant="contained"
            color="warning"
            onClick={handleRedirectToOrderPage}>
            Go to order page
          </Button>
          <Typography variant="body2" marginTop="8px">
            You&apos;ll be securely redirected to to enter your password and
            complete your purchase.
          </Typography>
        </Box>
        <Box width="40%">
          <Typography variant="h6" fontWeight={600} color="error.main">
            Order Total: ₹{totalProductsPrice}
          </Typography>
          <Typography variant="body2">
            By placing your order, you agree to Prime Cart&apos;s privacy notice
            and conditions of use.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default PreviewItemSectionWidget;

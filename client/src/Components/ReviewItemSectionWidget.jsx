import { useSelector } from "react-redux";
import { Box, Button, Stack, Typography } from "@mui/material";

function ReviewItemSectionWidget() {
  const { products, totalProductsPrice } = useSelector((state) => state.checkout);
  
  const handlePlaceOrder =()=>{
    console.log("placed order");
  }

  return (
    <Box marginLeft="35px">
      <Box border="1px solid #D5D9D9" borderRadius="8px" padding="14px 18px">
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
                  color="#007600">
                  12 Nov 2023
                </Typography>
              </Typography>
              <Typography variant="body2" color="#565959">
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
                      {/* MRP */}
                      ₹{product.price.mrp}
                    </Typography>
                    &nbsp;
                    <Typography
                      component="span"
                      variant="body2"
                      color="#B12704"
                      sx={{ fontWeight: 600 }}>
                      {/* selling price */}
                      ₹{product.price.selling}
                    </Typography>
                  </Box>
                  <Box
                    component="span"
                    border="1px solid #D5D9D9"
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
        border="1px solid #D5D9D9"
        borderRadius="8px"
        padding="14px 18px"
        display="flex">
        <Box width="60%" paddingRight="20px">
          <Button
            sx={{
              color: "#0F1111",
              bgcolor: "#FFD814",
              ":hover": { bgcolor: "#FCD200" },
            }}
            onClick={handlePlaceOrder}>
            Place your order
          </Button>
          <Typography variant="body2" marginTop="8px">
            You&apos;ll be securely redirected to to enter your password and
            complete your purchase.
          </Typography>
        </Box>
        <Box width="40%">
          <Typography variant="h6" fontWeight={600} color="#B12704">
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

export default ReviewItemSectionWidget;

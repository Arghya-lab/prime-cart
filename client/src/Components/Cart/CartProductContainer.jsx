import { useSelector } from "react-redux";
import { Box, Typography, useMediaQuery } from "@mui/material";
import CartProductWidget from "./CartProductWidget";

function CartProductContainer() {
  const mediumScreen = useMediaQuery("(min-width:768px)");
  const smallScreen = useMediaQuery("(min-width:425px)");

  const { products, totalPrice, totalCount } = useSelector(
    (state) => state.cart
  );

  return (
    <Box padding={smallScreen ? "1.25rem" : "1rem"} bgcolor="white">
      <Typography component="h5" variant={smallScreen ? "h1" : "h3"}>
        Shopping Cart
      </Typography>
      {mediumScreen ? (
        <Typography
          variant="body2"
          sx={{
            color: "grey.800",
            textAlign: "right",
            borderBottom: "1px solid grey.400",
          }}>
          Price
        </Typography>
      ) : null}
      <Box display="grid" gridTemplateColumns="1fr" rowGap="12px">
        {products.map((product) => (
          <CartProductWidget
            key={product.productId}
            id={product.productId}
            name={product.name}
            imgUrl={product.imgUrls[product.imgUrls.length - 1]}
            price={product.price}
            quantity={product.quantity}
          />
        ))}
      </Box>
      {mediumScreen ? (
        <Box textAlign="right" marginBottom="14px">
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
            {totalPrice}
          </Typography>
        </Box>
      ) : null}
    </Box>
  );
}

export default CartProductContainer;

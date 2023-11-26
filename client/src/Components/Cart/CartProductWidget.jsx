import PropTypes from "prop-types";
import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import CartProductUtilityComponent from "./CartProductUtilityComponent";

function CartProductWidget({ id, name, imgUrl, price, quantity }) {
  const mediumScreen = useMediaQuery("(min-width:768px)");
  const smallScreen = useMediaQuery("(min-width:425px)");

  return (
    <Box
      paddingY="0.75rem"
      paddingLeft={mediumScreen ? "0.75rem" : 0}
      borderBottom="1px solid"
      borderColor="grey.400">
      <Stack direction="row">
        <Stack margin={smallScreen ? "0 0.75rem" : "0 0.75rem 0 0"}>
          <img
            /* img url */
            src={`${
              import.meta.env.VITE_IMG_BASE_URL
            }/assets/productImgs/${imgUrl}`}
            height={smallScreen ? "171px" : "136px"}
            width={smallScreen ? "162px" : "130px"}
          />
          {!smallScreen ? <CartProductUtilityComponent /> : null}
        </Stack>
        <Box width="100%">
          <Box
            display="flex"
            justifyContent="space-between"
            flexDirection={mediumScreen ? "row" : "column"}>
            <Typography
              component="h3"
              variant={smallScreen ? "h4" : "h6"}
              paddingRight={2}>
              {/* name */}
              {name}
            </Typography>
            <Box>
              <Typography
                component="span"
                variant="caption"
                sx={{ position: "relative", top: "-0.3em", fontWeight: 600 }}>
                ₹
              </Typography>
              <Typography
                component="span"
                variant="h4"
                sx={{ fontWeight: 600 }}>
                {/* selling price */}
                {price.selling}
              </Typography>
            </Box>
          </Box>
          <Typography variant="body1" color="success.main">
            In stock
          </Typography>
          <Typography variant="subtitle2" color="#CC0C39">
            Deal
          </Typography>
          <Typography
            component="span"
            variant="caption"
            fontWeight={600}
            color="white"
            backgroundColor="#CC0C39"
            padding="4px 6px"
            borderRadius="4px">
            {/* MRP-selling % */}
            {(((price.mrp - price.selling) / price.mrp) * 100).toFixed(0)}
            %&nbsp;off
          </Typography>
          <Box>
            <Typography
              component="span"
              variant={smallScreen ? "body2" : "caption"}
              color="grey.800">
              M.R.P.:&nbsp;
            </Typography>
            <Typography
              component="span"
              variant={smallScreen ? "body2" : "caption"}
              color="grey.800"
              textDecoration="line-through">
              {/* MRP */}
              Rs.{price.mrp}
            </Typography>
          </Box>
          <Typography
            variant={smallScreen ? "subtitle2" : "caption"}
            color="grey.800">
            Eligible for Free Shipping
          </Typography>
          {smallScreen ? (
            <CartProductUtilityComponent id={id} quantity={quantity} />
          ) : null}
        </Box>
      </Stack>
    </Box>
  );
}

CartProductWidget.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  price: PropTypes.object.isRequired,
  quantity: PropTypes.number.isRequired,
};

export default CartProductWidget;

import { Lock } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

function CheckoutHeader() {
  return (
    <Box
      borderBottom="1px solid"
      borderColor="grey.500"
      sx={{ backgroundImage: "linear-gradient(to bottom, #fff, #f2f2f2)" }}>
      <Box
        height="60px"
        maxWidth="1150px"
        margin="auto"
        paddingY="14px"
        width="100%"
        textAlign="center"
        display="flex"
        justifyContent="space-between">
        <Typography
          variant="h1"
          fontWeight="fontWeightBold"
          width="17.43%"
          sx={{
            verticalAlign: "middle",
            paddingRight: "14px",
            overflow: "visible",
          }}>
          Prime Cart
        </Typography>
        <Typography variant="h1">Checkout</Typography>
        <Box
          width="17.43%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          color="grey.700"
          paddingLeft="14px"
          overflow="visible"
          sx={{
            cursor: "pointer",
          }}>
          <Lock />
        </Box>
      </Box>
    </Box>
  );
}

export default CheckoutHeader;

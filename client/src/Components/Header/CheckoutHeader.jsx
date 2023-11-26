import { Lock } from "@mui/icons-material";
import { Box, Typography, useMediaQuery } from "@mui/material";

function CheckoutHeader() {
  const largeScreen = useMediaQuery("(min-width:1024px)");
  const smallScreen = useMediaQuery("(min-width:425px)");

  return (
    <Box
      borderBottom="1px solid"
      borderColor="grey.500"
      textAlign="center"
      sx={{ backgroundImage: "linear-gradient(to bottom, #fff, #f2f2f2)" }}>
      <Box
        height="60px"
        maxWidth="1150px"
        margin="auto"
        paddingY="6px"
        width="100%"
        display="flex"
        justifyContent="space-between"
        alignItems="center">
        <img
          src="http://localhost:5173/logo/logo-black-220px.png"
          style={{
            width: largeScreen ? "220px" : "160px",
            margin: "0.7rem 0 0.7rem 1rem",
          }}
        />
        {smallScreen ? <Typography variant="h1">Checkout</Typography> : null}
        <Box
          width="17.43%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          color="grey.700"
          paddingLeft="32px"
          overflow="visible"
          sx={{
            cursor: "pointer",
          }}>
          <Lock />
        </Box>
      </Box>
      {!smallScreen ? (
        <Typography variant="h1" mb="1rem">
          Checkout
        </Typography>
      ) : null}
    </Box>
  );
}

export default CheckoutHeader;

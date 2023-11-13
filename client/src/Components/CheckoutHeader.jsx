import { Lock } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

function CheckoutHeader() {
  return (
    <Box borderBottom="1px solid grey.400" sx={{backgroundImage: "linear-gradient(to bottom, #fff, #f2f2f2)"}}>
      <Box
        height="60px"
        
        sx={{
          maxWidth: "1150px",
          margin: "auto",
          paddingY: "14px",
          width: "100%",
          height: "100%",
          textAlign: "center",
          display: "flex",
          justifyContent: "space-between",
        }}>
        <Typography
          variant="h4"
          fontWeight="fontWeightBold"
          width="17.43%"
          sx={{
            verticalAlign: "middle",
            paddingRight: "14px",
            overflow: "visible",
          }}>
          Prime Cart
        </Typography>
        <Typography variant="h4" color="#0f1111">Checkout</Typography>
        <Box
          width="17.43%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          color="grey.700"
          sx={{
            paddingLeft: "14px",
            overflow: "visible",
            cursor: "pointer",
          }}>
          <Lock />
        </Box>
      </Box>
    </Box>
  );
}

export default CheckoutHeader;

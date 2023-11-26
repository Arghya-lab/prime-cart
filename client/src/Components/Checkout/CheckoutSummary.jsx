import { useSelector } from "react-redux";
import { Box, Typography, useMediaQuery } from "@mui/material";

function CheckoutSummary() {
  const largeScreen = useMediaQuery("(min-width:1024px)");
  const mediumScreen = useMediaQuery("(min-width:768px)");

  const { totalProductsPrice, totalDeliveryCharge } = useSelector(
    (state) => state.checkout
  );
  return (
    <Box
      sx={{
        width: largeScreen
          ? "290px"
          : mediumScreen
          ? "200px"
          : "calc(100% - 20px)",
        ...(mediumScreen ? { float: "right" } : { position: "relative" }),
        overflow: "visible",
        marginRight: largeScreen ? "-290px" : mediumScreen ? "-200px" : 0,
        marginBottom: "1.75rem",
      }}>
      <Box
        sx={{
          ...(mediumScreen ? { position: "fixed", top: "88px" } : null),
        }}
        width="inherit"
        border="1px solid"
        borderColor="grey.500"
        borderRadius="8px"
        padding="14px 18px">
        <Typography variant="h6" fontWeight={600}>
          Order Summary
        </Typography>
        <table style={{ width: "100%" }}>
          <tbody>
            <tr>
              <td>Items:</td>
              <td style={{ textAlign: "right" }}>₹{totalProductsPrice}</td>
            </tr>
            <tr>
              <td>Delivery:</td>
              <td style={{ textAlign: "right" }}>₹{totalDeliveryCharge}</td>
            </tr>
            <tr style={{ padding: "10px" }}>
              <td colSpan="2" style={{ height: "1px", background: "grey.600" }}>
                <hr />
              </td>
            </tr>
            <tr
              style={{
                fontSize: "18px",
                color: "error.main",
                fontWeight: 700,
              }}>
              <td>Order Total:</td>
              <td style={{ textAlign: "right" }}>₹2,160.00</td>
            </tr>
          </tbody>
        </table>
      </Box>
    </Box>
  );
}

export default CheckoutSummary;

import { Box, Typography } from "@mui/material";
import Navbar from "../Components/Navbar";
import WishListProductWidget from "../Components/wishListProductWidget";

function WishlistPage() {
  return (
    <Box>
      <Navbar />
      <Box marginY="15px" marginX="30px">
      <Box marginBottom="2rem">
        <Typography
          variant="h5"
          sx={{
            color: "#007185",
            fontWeight: 700,
            padding: "1rem",
            textAlign: "center",
          }}>
          Wishlist
        </Typography>
        <Box
          sx={{
            width: "10rem",
            height: "4px",
            bgcolor: "#007185",
            marginX: "auto",
          }}></Box>
      </Box>
      <Box border="1px solid #BBBFBF" borderRadius="2px" sx={{
        maxWidth: "1366px",
        padding: "14px 18px",
      }}>
        <WishListProductWidget />
        <WishListProductWidget />
      </Box>
      </Box>
    </Box>
  );
}

export default WishlistPage;

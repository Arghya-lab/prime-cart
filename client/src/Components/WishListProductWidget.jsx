import { DeleteOutline, IosShare } from "@mui/icons-material";
import { Box, Button, IconButton, Rating, Stack, Typography } from "@mui/material";

function WishListProductWidget() {
  return (
    <Box sx={{ maxWidth: "1024px", margin: "auto" }}>
      <Box
        sx={{
          width: "100%",
          height: "1.5px",
          bgcolor: "#BBBFBF",
        }}></Box>
      <Stack direction="row">
        <Box
          sx={{
            width: "220px",
            minHeight: "150px",
            cursor: "pointer",
          }}>
          <img
            src="https://m.media-amazon.com/images/I/51wlAzvx9SS._SX679_.jpg"
            height="135px"
            width="135px"
            style={{margin: "16px"}}
          />
        </Box>
        <Box
          sx={{
            width: "100%",
            padding: "22px 0",
            textAlign: "left",
            display: "flex",
            justifyContent: "space-between",
          }}>
          <Box
            sx={{
              paddingRight: "220px",
              maxWidth: "550px",
            }}>
            <Typography
              component="p"
              variant="subtitle2"
              sx={{
                color: "#007185",
                fontWeight: 600,
                ":hover": { cursor: "pointer", color: "#C7511F" },
              }}>
              boAt bassheads 105 Wired in Ear Earphones with Mic (Green)
            </Typography>
            <Typography component="p" variant="body2">
              by boAt (Electronics)
            </Typography>
            <Box display="flex" alignItems="center">
              <Rating
                name="half-rating-read"
                defaultValue={4.0}
                precision={0.5}
                readOnly
              />
              &nbsp;
              <Typography
                component="p"
                variant="body1"
                sx={{
                  color: "#007185",
                  ":hover": { cursor: "pointer", color: "#C7511F" },
                }}>
                30,944
              </Typography>
            </Box>
            <Box marginY="4px">
              <Typography
                component="span"
                variant="caption"
                sx={{
                  fontWeight: 600,
                  color: "white",
                  backgroundColor: "#CC0C39",
                  padding: "4px 6px 4px 6px",
                  borderRadius: "4px",
                }}>
                65% off
              </Typography>
              &nbsp;
              <Typography
                component="span"
                variant="caption"
                sx={{
                  color: "#CC0C39",
                  fontWeight: 600,
                }}>
                Great Indian Festival
              </Typography>
            </Box>
            <Box>
              <Typography
                component="span"
                variant="caption"
                sx={{ position: "relative", top: "-0.3em" }}>
                ₹
              </Typography>
              <Typography component="span" sx={{ fontWeight: 600 }}>
                349.00
              </Typography>
              &nbsp;
              <Typography component="span" variant="caption" sx={{}}>
                <b>FREE Delivery</b> on orders over ₹499.
              </Typography>
            </Box>
            <Box>
              <Typography
                component="span"
                variant="body2"
                sx={{ color: "#565959" }}>
                M.R.P.:&nbsp;
              </Typography>
              <Typography
                component="span"
                variant="body2"
                sx={{ color: "#565959", textDecoration: "line-through" }}>
                Rs.999.00
              </Typography>
            </Box>
          </Box>
          <Box>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#FFD814",
                color: "#0F1111",
                width: "200px",
                marginY: "8px",
                ":hover": { bgcolor: "#FFD018" },
              }}>
              Add to Cart
            </Button>
            <Box display="flex" alignItems="center" justifyContent="flex-end" gap="6px">
            <IconButton><IosShare /></IconButton>
            <IconButton><DeleteOutline /></IconButton>
            </Box>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}

export default WishListProductWidget;

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";

function ProductWidget() {
  return (
    <Card
      sx={{
        padding: "2px 6px 6px 0",
        width: "350px",
        bgcolor: "#f9f9f9",
        color: "#0F1111",
      }}>
      <Box
        sx={{
          paddingTop: "100%",
          position: "relative",
          cursor: "pointer",
          textAlign: "center",
        }}>
        <CardMedia
          component="img"
          alt="Product Image"
          src="https://m.media-amazon.com/images/I/716Qlc98JFL._AC_UL320_.jpg"
          sx={{
            position: "absolute",
            margin: "auto",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            maxWidth: "100%",
            maxHeight: "100%",
            verticalAlign: "top",
            overflowClipMargin: "content-box",
            overflow: "clip",
          }}
        />
      </Box>
      <CardContent
        sx={{
          paddingX: "8px",
          marginY: "8px",
          fontSize: "14px",
          lineHeight: "20px",
        }}>
        <Typography
          variant="body2"
          sx={{
            fontSize: "15px",
            lineHeight: "24px",
            fontWeight: "600",
          }}>
          SanDisk 512GB Extreme UHS-I Memory Card with Adapter - Up to 190MB/s,
          C10, U3, V30, 4K, 5K, A2, Micro SD Card -512G
        </Typography>
        <Box
          sx={{
            paddingTop: "4px",
            display: "flex",
            alignItems: "end",
            gap: "6px",
          }}>
          <Rating name="read-only" value="3.7" readOnly />
          <Typography
            variant="body1"
            sx={{
              color: "#007185",
            }}>
            23793
          </Typography>
        </Box>
        <Box>
          <Box component="span">
            <Typography
              component="span"
              sx={{
                position: "relative",
                top: "-0.75em",
                fontSize: "13px",
              }}>
              ₹
            </Typography>
            <Typography
              component="span"
              sx={{
                fontSize: "28px",
              }}>
              3456{" "}
            </Typography>
          </Box>
          <Box
            component="span"
            sx={{
              color: "#565959",
            }}>
            <Typography component="span" variant="body1">
              New Price:{" "}
            </Typography>
            <Typography
              component="span"
              sx={{
                fontSize: "13px",
                textDecoration: "line-through",
              }}>
              ₹4567
            </Typography>
            <Typography
              component="span"
              variant="body1"
              sx={{
                fontSize: "15px",
              }}>
              {" "}
              (40% off)
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            paddingTop: "4px",
          }}>
          <Typography component="span">Get it By </Typography>
          <Typography
            component="span"
            sx={{
              fontWeight: "700",
            }}>
            Tuesday, 31 October
          </Typography>
        </Box>
        <Typography variant="body1">FREE Delivery by Amazon</Typography>
      </CardContent>
    </Card>
  );
}

export default ProductWidget;

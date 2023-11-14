import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function ProductWidget({ id, name, imgUrl, rating, ratingCount, price }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <Card
      sx={{
        padding: "2px 6px 6px 0",
        width: "350px",
        bgcolor: "primary.light",
        color: "#0F1111",
      }}>
      <Box
        paddingTop="100%"
        position="relative"
        textAlign="center"
        cursor="pointer"
        onClick={handleCardClick}>
        <CardMedia
          component="img"
          alt="Product Image"
          /* img url */
          src={`${
            import.meta.env.VITE_IMG_BASE_URL
          }/assets/productImgs/${imgUrl}`}
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
          cursor: "pointer",
        }}
        onClick={handleCardClick}>
        <Typography variant="h6" fontWeight={600}>
          {/* name */}
          {name}
        </Typography>
        <Box paddingTop="4px" display="flex" alignItems="end" gap="6px">
          {/* value = star count */}
          <Rating name="read-only" value={rating} readOnly />
          <Typography variant="body1" color="success.dark">
            {/* rating count */}
            {ratingCount}
          </Typography>
        </Box>
        <Box>
          <Box component="span">
            <Typography
              component="span"
              variant="subtitle1"
              sx={{
                position: "relative",
                top: "-0.75em",
              }}>
              ₹
            </Typography>
            <Typography component="span" variant="h1">
              {/* selling price */}
              {price.selling}
            </Typography>
          </Box>
          &nbsp;
          <Box component="span" color="grey.800">
            <Typography component="span" variant="body1">
              New Price:
            </Typography>
            &nbsp;
            <Typography
              component="span"
              variant="subtitle2"
              textDecoration="line-through">
              {/* MRP */}₹{price.mrp}
            </Typography>
            &nbsp;
            <Typography component="span" variant="h6">
              {/* MRP-selling % */}(
              {(((price.mrp - price.selling) / price.mrp) * 100).toFixed(0)}%
              off)
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            paddingTop: "4px",
          }}>
          <Typography component="span">Get it By </Typography>
          <Typography component="span" fontWeight={700}>
            {/* delivery date */}
            Tuesday, 31 October
          </Typography>
        </Box>
        <Typography variant="body1">FREE Delivery by Amazon</Typography>
      </CardContent>
    </Card>
  );
}

ProductWidget.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  ratingCount: PropTypes.number.isRequired,
  price: PropTypes.object.isRequired,
};

export default ProductWidget;

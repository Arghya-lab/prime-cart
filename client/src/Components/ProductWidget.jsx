import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardMedia,
  Rating,
  Typography,
  useMediaQuery,
} from "@mui/material";

function ProductWidget({ id, name, imgUrl, rating, ratingCount, price }) {
  const largeScreen = useMediaQuery("(min-width:1024px)");
  const mediumScreen = useMediaQuery("(min-width:768px)");

  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <Card
      sx={{
        padding: "2px 6px 6px 0",
        width: largeScreen ? "350px" : mediumScreen ? "236px" : "150px",
        bgcolor: "primary.light",
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
      <Box
        sx={{
          paddingX: "8px",
          paddingBottom: mediumScreen ? "1.5rem" : "0.5rem",
          margin: mediumScreen ? "8px 0" : 0,
          fontSize: "14px",
          lineHeight: "20px",
          cursor: "pointer",
        }}
        onClick={handleCardClick}>
        <Typography
          variant={mediumScreen ? "h6" : "subtitle2"}
          fontWeight={600}>
          {name}
        </Typography>
        <Box
          paddingTop="4px"
          display="flex"
          alignItems={mediumScreen ? "end" : "start"}
          gap="6px">
          {/* value = star count */}
          <Rating
            name="read-only"
            value={rating}
            size={mediumScreen ? "medium" : "small"}
            readOnly
          />
          <Typography
            variant={mediumScreen ? "body1" : "body2"}
            color="success.dark">
            {ratingCount}
          </Typography>
        </Box>
        <Box>
          <Box display={mediumScreen ? "inline" : "block"}>
            <Typography
              component="span"
              variant={mediumScreen ? "subtitle1" : "subtitle2"}
              sx={{
                position: "relative",
                top: mediumScreen ? "-0.75em" : "-0.25em",
              }}>
              ₹
            </Typography>
            <Typography component="span" variant={mediumScreen ? "h1" : "h4"}>
              {price.selling}
            </Typography>
          </Box>
          &nbsp;
          <Box component="span" color="grey.800">
            <Typography
              component="span"
              variant={mediumScreen ? "body2" : "caption"}>
              MRP:
            </Typography>
            &nbsp;
            <Typography
              component="span"
              variant={mediumScreen ? "subtitle2" : "caption"}
              textDecoration="line-through">
              ₹{price.mrp}
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
          <Typography
            component="span"
            variant={mediumScreen ? "subtitle1" : "caption"}>
            Get it By{" "}
          </Typography>
          <Typography
            component="span"
            variant={mediumScreen ? "subtitle1" : "caption"}
            fontWeight={700}>
            {/* delivery date */}
            Tuesday, 31 October
          </Typography>
        </Box>
        {mediumScreen ? (
          <Typography variant="body1">FREE Delivery by Amazon</Typography>
        ) : null}
      </Box>
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

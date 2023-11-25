import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Box, Paper, useMediaQuery } from "@mui/material";

function CategoryWidget({ url, name, value }) {
  const mediumScreen = useMediaQuery("(min-width:768px)");

  const navigate = useNavigate();

  const fetchCategoryProducts = async () => {
    navigate(`/category/${value}`);
  };

  return (
    <Paper
      square
      sx={{
        width: mediumScreen ? "310px" : "144px",
        padding: mediumScreen ? "20px" : "8px",
      }}>
      <Box mx="auto">
        <Typography
          component="h4"
          variant={mediumScreen ? "h4" : "h6"}
          fontWeight={600}
          gutterBottom>
          {name}
        </Typography>
        <Box
          color="#007171"
          sx={{
            ":hover": { cursor: "pointer", color: "error.dark" },
          }}
          onClick={fetchCategoryProducts}>
          <img
            height={mediumScreen ? "300px" : "140px"}
            width="100%"
            style={{
              objectFit: "cover",
              background: "#fff",
              position: "relative",
              overflow: "hidden",
            }}
            src={url}
          />
          <Typography variant="body2" pt={mediumScreen ? 2 : 1}>
            shop now
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}

CategoryWidget.propTypes = {
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default CategoryWidget;

import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import { Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

function CategoryWidget({ url, name, value }) {
  const navigate = useNavigate()

  const fetchCategoryProducts = async()=>{
    navigate(`/category/${value}`)
  }
  
  return (
    <Paper square sx={{ width: 350, padding: "16px" }}>
      <Box width={300} mx="auto">
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {name}
        </Typography>
        <Box
          sx={{
            color: "#007171",
            ":hover": { cursor: "pointer", color: "error.dark" },
          }}
          onClick={fetchCategoryProducts}
          >
          <img
            height={310}
            width={300}
            style={{
              objectFit: "cover",
              background: "#fff",
              position: "relative",
              overflow: "hidden",
            }}
            src={url}
          />
          <Typography variant="body2" pt={2}>
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

import PropTypes from "prop-types"
import Typography from "@mui/material/Typography";
import { Box, Paper } from "@mui/material";

function ItemCard({ url, name }) {
  return (
    <Paper square sx={{ width: 350 }}>
      <Box 
          width={300} mx="auto">
        <Typography variant="h6" fontWeight="bold" py="13px" >
          {name}
        </Typography>
        <Box sx={{ ":hover": { cursor: "pointer" }}}>
        <Box
          height={309}
          sx={{ background: "#fff", position: "relative", overflow: "hidden" }}
          >
          <img
            style={{
              width: "300",
              height: "350",
              overflow: "hidden",
              backgroundSize: "cover",
            }}
            src={url}
          />
        </Box>
          <Typography variant="body2" py={2} color="#007171" sx={{":hover": {color: "#710000"}}}>
            shop now
          </Typography>
      </Box></Box>
    </Paper>
  );
}

ItemCard.propTypes = {
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

export default ItemCard;

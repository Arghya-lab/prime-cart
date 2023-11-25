import PropTypes from "prop-types";
import { Box, Paper, Typography, useMediaQuery } from "@mui/material";

function ShovelerWidget({ title, urls }) {
  const mediumScreen = useMediaQuery("(min-width:768px)");

  return (
    <Box px={mediumScreen ? "1.75rem" : "0.8rem"}>
      <Paper square sx={{ padding: "1.25rem" }}>
        <Typography
          component="h4"
          variant={mediumScreen ? "h4" : "h6"}
          fontWeight={600}>
          {title}
        </Typography>
        <Box
          className="no-scrollbar"
          component="div"
          width="100%"
          overflow="auto"
          whiteSpace="nowrap">
          {urls.map((url) => (
            <Box
              component="span"
              key={url}
              textAlign="center"
              minWidth="145px"
              maxWidth="270px"
              maxHeight="200px"
              padding="0 8px"
              overflow="hidden"
              position="relative"
              display="inline-block">
              <img
                style={{
                  width: "auto",
                  height: "auto",
                  maxWidth: "270px",
                  maxHeight: "200px",
                  verticalAlign: "middle",
                  objectFit: "contain",
                }}
                src={url}
              />
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  );
}

ShovelerWidget.propTypes = {
  title: PropTypes.string.isRequired,
  urls: PropTypes.array.isRequired,
};

export default ShovelerWidget;

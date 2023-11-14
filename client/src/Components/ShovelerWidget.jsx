import PropTypes from "prop-types";
import { Box, Paper, Typography } from "@mui/material";

function ShovelerWidget({ title, urls }) {
  return (
    <Box px="28px">
      <Paper square sx={{ padding: "20px" }}>
        <Typography variant="h4" fontWeight={600}>
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

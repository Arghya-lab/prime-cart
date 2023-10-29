import { Box, Rating, Typography } from "@mui/material";
import Slider, { SliderThumb } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";

const AirbnbSlider = styled(Slider)(({ theme }) => ({
  color: "rgb(58, 133, 137)",
  height: 3,
  padding: "13px 0",
  "& .MuiSlider-thumb": {
    height: 27,
    width: 27,
    backgroundColor: "#fff",
    border: "1px solid currentColor",
    "&:hover": {
      boxShadow: "0 0 0 8px rgba(58, 133, 137, 0.16)",
    },
    "& .airbnb-bar": {
      height: 9,
      width: 1,
      backgroundColor: "currentColor",
      marginLeft: 1,
      marginRight: 1,
    },
  },
  "& .MuiSlider-track": {
    height: 3,
  },
  "& .MuiSlider-rail": {
    color: theme.palette.mode === "dark" ? "#bfbfbf" : "#d8d8d8",
    opacity: theme.palette.mode === "dark" ? undefined : 1,
    height: 3,
  },
}));

function AirbnbThumbComponent(props) {
  const { children, ...other } = props;
  return (
    <SliderThumb {...other}>
      {children}
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
    </SliderThumb>
  );
}
AirbnbThumbComponent.propTypes = {
  children: PropTypes.node,
};

function FilterWidget() {
  return (
    <Box
      sx={{
        borderRight: "2px solid #ddd",
        wordBreak: "break-word",
        width: "200px",
        marginLeft: "-200px",
        marginRight: "0",
        paddingRight: "6px",
        color: "#0F1111",
        fontSize: "14px",
        lineHeight: "20px",
      }}>
      <Box sx={{ width: "100%" }}>
        <Box>
          <Typography
            variant="subtitle2"
            sx={{ marginBottom: "8px", fontSize: "14px", lineHeight: "20px" }}>
            Avg. customer review
          </Typography>
          <Box>
            {" "}
            {/* rating container box */}
            <Box sx={{ ":hover": { cursor: "pointer", color: "#710000" } }}>
              {" "}
              {/* single rating box */}
              <Box component="span">
                {" "}
                {/* rating logo box */}
                <Rating name="read-only" value={4} readOnly />
              </Box>
              <Box component="span">& Up</Box>
            </Box>
          </Box>
        </Box>
        <Box>
          <Typography
            variant="subtitle2"
            sx={{ marginBottom: "8px", fontSize: "14px", lineHeight: "20px" }}>
            Price
          </Typography>
          <AirbnbSlider
            slots={{ thumb: AirbnbThumbComponent }}
            getAriaLabel={(index) =>
              index === 0 ? "Minimum price" : "Maximum price"
            }
            defaultValue={[20, 40]}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default FilterWidget;

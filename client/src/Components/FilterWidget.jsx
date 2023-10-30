import {
  Box,
  FormControl,
  Select,
  Rating,
  Typography,
  MenuItem,
} from "@mui/material";
import Slider, { SliderThumb } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";

const CustomSlider = styled(Slider)(({ theme }) => ({
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
    "& .custom-bar": {
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

function CustomThumbComponent(props) {
  const { children, ...other } = props;
  return (
    <SliderThumb {...other}>
      {children}
      <span className="custom-bar" />
      <span className="custom-bar" />
      <span className="custom-bar" />
    </SliderThumb>
  );
}
CustomThumbComponent.propTypes = {
  children: PropTypes.node,
};

function FilterWidget() {
  return (
    <Box
      sx={{
        borderRight: "2px solid #ddd",
        wordBreak: "break-word",
        width: "256px",
        padding: "16px 16px 6px",
        color: "#0F1111",
        fontSize: "14px",
        lineHeight: "20px",
      }}>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            paddingY: "1rem",
          }}>
          <Typography
            variant="subtitle2"
            sx={{
              marginBottom: "8px",
              fontWeight: "700",
            }}>
            Avg. customer review
          </Typography>
          <Box>
            {/* rating container box */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                ":hover": { cursor: "pointer", color: "#710000" },
              }}>
              {/* single rating box */}
              <Box component="span">
                {/* rating logo box */}
                <Rating name="read-only" value={4} readOnly />
              </Box>
              <Box
                component="span"
                sx={{
                  fontSize: "12px",
                  lineHeight: "16px",
                  paddingLeft: "4px",
                }}>
                & Up
              </Box>
            </Box>
            {/* rating container box */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                ":hover": { cursor: "pointer", color: "#710000" },
              }}>
              {/* single rating box */}
              <Box component="span">
                {/* rating logo box */}
                <Rating name="read-only" value={3} readOnly />
              </Box>
              <Box
                component="span"
                sx={{
                  fontSize: "12px",
                  lineHeight: "16px",
                  paddingLeft: "4px",
                }}>
                & Up
              </Box>
            </Box>
            {/* rating container box */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                ":hover": { cursor: "pointer", color: "#710000" },
              }}>
              {/* single rating box */}
              <Box component="span">
                {/* rating logo box */}
                <Rating name="read-only" value={2} readOnly />
              </Box>
              <Box
                component="span"
                sx={{
                  fontSize: "12px",
                  lineHeight: "16px",
                  paddingLeft: "4px",
                }}>
                & Up
              </Box>
            </Box>
            {/* rating container box */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                ":hover": { cursor: "pointer", color: "#710000" },
              }}>
              {/* single rating box */}
              <Box component="span">
                {/* rating logo box */}
                <Rating name="read-only" value={1} readOnly />
              </Box>
              <Box
                component="span"
                sx={{
                  fontSize: "12px",
                  lineHeight: "16px",
                  paddingLeft: "4px",
                }}>
                & Up
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            paddingY: "1rem",
          }}>
          <Typography
            variant="subtitle2"
            sx={{
              marginBottom: "8px",
              fontWeight: "700",
            }}>
            Price
          </Typography>
          <CustomSlider
            slots={{ thumb: CustomThumbComponent }}
            getAriaLabel={(index) =>
              index === 0 ? "Minimum price" : "Maximum price"
            }
            defaultValue={[20, 40]}
          />
          <Box
            width="100%"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
            <FormControl size="small" variant="standard" component="span">
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={10}
                label="Age"
                // onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <Typography component="span" px="4px">
              to
            </Typography>
            <FormControl size="small" variant="standard" component="span">
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={30}
                label="Age"
                // onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default FilterWidget;

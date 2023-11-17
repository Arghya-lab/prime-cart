import { Box, Button, Rating, Typography } from "@mui/material";
import Slider, { SliderThumb } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setCategoryProducts } from "../features/product/productSlice";

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
  const { type } = useParams();
  const dispatch = useDispatch();

  const I = 700;
  const [rating, setRating] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);

  const filter = useMemo(
    () => ({ rating, minPrice, maxPrice }),
    [rating, minPrice, maxPrice]
  );

  useEffect(() => {
    console.log(filter);
  }, [filter]);

  const applyFilter = () => {
    let queryParts = [];
    if (rating) {
      queryParts.push(`rating=${rating}`);
    }
    if (minPrice) {
      queryParts.push(`minPrice=${minPrice}`);
    }
    if (maxPrice) {
      queryParts.push(`maxPrice=${maxPrice}`);
    }
    const query = queryParts.join("&");
    (async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/products/category/${type}?${query}`
      );
      const json = await res.json();
      if (json.success) {
        console.log(json.data);
        dispatch(setCategoryProducts(json.data))
      } else {
        console.log(json.error);
      }
    })();
  };

  return (
    <Box
        borderRight= "2px solid"
        
        borderColor= "grey.500"
        wordBreak= "break-word"
        width= "256px"
        padding= "16px 16px 6px"
        fontSize= "14px"
        lineHeight= "20px"
        >
      <Box sx={{ width: "100%", marginBottom: "1rem" }}>
        <Box
          sx={{
            paddingY: "1rem",
          }}>
          <Typography
            variant="subtitle1"
            fontWeight= {700}
            sx={{
              marginBottom: "8px",
            }}>
            Avg. customer review
          </Typography>
          <Box>
            {/* rating container box */}
            <Box
                display= "flex"
                alignItems= "center"
                padding= "2px"
                border= {rating === 4 ? "solid 2px" : null}
                borderColor={rating === 4 ? "grey.400" : null}
                color= {rating === 4 ? "error.dark" : null}
                sx={{
                ":hover": { cursor: "pointer", color: "error.dark" }}}
              onClick={() => {
                setRating(4);
              }}>
              {/* single rating box */}
              <Box component="span">
                {/* rating logo box */}
                <Rating name="read-only" value={4} readOnly />
              </Box>
              <Typography
                component="span"
                variant="caption"
                sx={{
                  paddingLeft: "4px",
                }}>
                & Up
              </Typography>
            </Box>
            {/* rating container box */}
            <Box
                display= "flex"
                alignItems= "center"
                padding= "2px"
                border= {rating === 3 ? "solid 2px" : null}
                borderColor={rating === 3 ? "grey.400" : null}
                color= {rating === 3 ? "error.dark" : null}
                sx={{
                ":hover": { cursor: "pointer", color: "error.dark" }}}
              onClick={() => setRating(3)}>
              {/* single rating box */}
              <Box component="span">
                {/* rating logo box */}
                <Rating name="read-only" value={3} readOnly />
              </Box>
              <Typography
                component="span"
                variant="caption"
                sx={{
                  paddingLeft: "4px",
                }}>
                & Up
              </Typography>
            </Box>
            {/* rating container box */}
            <Box
                display= "flex"
                alignItems= "center"
                padding= "2px"
                border= {rating === 2 ? "solid 2px" : null}
                borderColor={rating === 2 ? "grey.400" : null}
                color= {rating === 2 ? "error.dark" : null}
                sx={{
                ":hover": { cursor: "pointer", color: "error.dark" }}}
              onClick={() => setRating(2)}>
              {/* single rating box */}
              <Box component="span">
                {/* rating logo box */}
                <Rating name="read-only" value={2} readOnly />
              </Box>
              <Typography
                component="span"
                variant="caption"
                sx={{
                  paddingLeft: "4px",
                }}>
                & Up
              </Typography>
            </Box>
            {/* rating container box */}
            <Box
                display= "flex"
                alignItems= "center"
                padding= "2px"
                border= {rating === 1 ? "solid 2px" : null}
                borderColor={rating === 1 ? "grey.400" : null}
                color= {rating === 1 ? "error.dark" : null}
                sx={{
                ":hover": { cursor: "pointer", color: "error.dark" }}}
              onClick={() => setRating(1)}>
              {/* single rating box */}
              <Box component="span">
                {/* rating logo box */}
                <Rating name="read-only" value={1} readOnly />
              </Box>
              <Typography
                component="span"
                variant="caption"
                sx={{
                  paddingLeft: "4px",
                }}>
                & Up
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            paddingY: "1rem",
          }}>
          <Typography
            variant="subtitle1"
            fontWeight= {700}
            sx={{
              marginBottom: "8px",
            }}>
            Price
          </Typography>
          <Typography width="100%">
            ₹{minPrice || "min"} to ₹{maxPrice || "max"}
          </Typography>
          <CustomSlider
            slots={{ thumb: CustomThumbComponent }}
            getAriaLabel={(index) =>
              index === 0 ? "Minimum price" : "Maximum price"
            }
            onChange={(e) => {
              setMinPrice(e.target.value[0] * I);
              setMaxPrice(e.target.value[1] * I);
            }}
            defaultValue={[0, 100]}
          />
        </Box>
        <Button fullWidth variant="contained" onClick={applyFilter}>
          Apply
        </Button>
      </Box>
    </Box>
  );
}

export default FilterWidget;

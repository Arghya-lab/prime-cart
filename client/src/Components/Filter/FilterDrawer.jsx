import PropTypes from "prop-types";
import { Box, Drawer, Typography } from "@mui/material";
import FilterTools from "./FilterTools";

function FilterDrawer({ isOpen, closeDrawer }) {
  return (
    <Drawer anchor="right" open={isOpen} onClose={closeDrawer}>
      <Box
        sx={{
          paddingX: "2rem",
        }}>
        <Typography
          marginTop="1.25rem"
          variant="h3"
          fontWeight={600}
          color="success.dark">
          &gt;&nbsp;Filters
        </Typography>
        <FilterTools />
      </Box>
    </Drawer>
  );
}

FilterDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeDrawer: PropTypes.func.isRequired,
};

export default FilterDrawer;

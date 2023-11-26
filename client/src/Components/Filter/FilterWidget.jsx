import { Box } from "@mui/material";
import FilterTools from "./FilterTools";

function FilterWidget() {
  return (
    <Box
      borderRight="2px solid"
      borderColor="grey.500"
      wordBreak="break-word"
      width="256px"
      padding="16px 16px 6px"
      fontSize="14px"
      lineHeight="20px">
      <FilterTools />
    </Box>
  );
}

export default FilterWidget;

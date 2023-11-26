import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, InputBase, Paper, useMediaQuery } from "@mui/material";
import { Search } from "@mui/icons-material";

function SearchBar() {
  const largeScreen = useMediaQuery("(min-width:1024px)");
  const smallScreen = useMediaQuery("(min-width:425px)");

  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchValue.trim();
    if (query.length >= 3) {
      navigate(`/search?query=${encodeURIComponent(searchValue)}`);
    } else {
      console.log("query must be at least 3 char length");
    }
    setSearchValue("");
  };

  return (
    <Paper
      component="form"
      sx={{
        mx: "1.5rem",
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: "94%",
        maxWidth: largeScreen ? "680px" : "100%",
        height: smallScreen ? "48px" : "36px",
      }}
      onSubmit={handleSearch}>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search products...."
        inputProps={{ "aria-label": "search products" }}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <IconButton
        type="submit"
        sx={{ p: "10px" }}
        aria-label="search"
        onClick={handleSearch}>
        <Search />
      </IconButton>
    </Paper>
  );
}

export default SearchBar;

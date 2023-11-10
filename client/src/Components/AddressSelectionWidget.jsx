import { Add } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

function AddressSelectionWidget() {
  const [selected, setSelected] = useState("2stOpt");

  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  return (
    <Box marginLeft="35px">
      <Box
        border="1px solid #D5D9D9"
        borderRadius="8px 8px 0 0"
        padding="14px 18px">
        <Typography
          variant="h6"
          fontSize="18px"
          lineHeight="24px"
          fontWeight={600}
          borderBottom="1px solid #D5D9D9"
          marginBottom="19px">
          Your addresses
        </Typography>
        <Box>
          {/* apply address.map func */}
          {
            <Box
              padding="9px"
              border={`1px solid ${selected === "1stOpt" ? "#FBD8B4" : "#FFF"}`}
              borderRadius="5px"
              bgcolor={selected === "1stOpt" ? "#FCF5EE" : "#FFF"}>
              <label
                style={{
                  paddingLeft: "15px",
                  display: "flex",
                }}>
                <Box
                  sx={{
                    height: "16px",
                    width: "16px",
                  }}>
                  <input
                    type="radio"
                    id="huey"
                    name="drone"
                    value="1stOpt"
                    checked={selected === "1stOpt"}
                    onChange={handleChange}
                    style={{
                      verticalAlign: "top",
                      position: "relative",
                      bottom: "-3px",
                    }}
                  />
                </Box>
                <Box paddingLeft="10px">
                  <Typography component="span" variant="body2" fontWeight={600}>
                    Arghya Maity
                  </Typography>
                  &nbsp;
                  <Typography component="span" variant="body2">
                    Shreyosi medical hall ( Drug store ), maity
                  </Typography>
                  &nbsp;
                  <Typography
                    color="#007185"
                    component="span"
                    variant="body2"
                    sx={{
                      cursor: "pointer",
                      ":hover": {
                        color: "#C7511F",
                        textDecoration: "underline",
                      },
                    }}>
                    Edit address
                  </Typography>
                </Box>
              </label>
            </Box>
          }
          <Box display="flex" alignItems="center">
            <Box color="#e4e4e4">
              <Add />
            </Box>
            <Typography
              component="span"
              variant="body1"
              color="#007185"
              sx={{
                cursor: "pointer",
                ":hover": {
                  color: "#C7511F",
                  textDecoration: "underline",
                },
              }}>
              Add new address
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        borderRadius="0 0 8px 8px"
        border="1px #D5D9D9 solid"
        padding="12px 18px 11px"
        bgcolor="#F0F2F2">
        <Button
          sx={{
            color: "#0F1111",
            bgcolor: "#FFD814",
            ":hover": { bgcolor: "#FCD200" },
          }}>
          use this address
        </Button>
      </Box>
    </Box>
  );
}

export default AddressSelectionWidget;

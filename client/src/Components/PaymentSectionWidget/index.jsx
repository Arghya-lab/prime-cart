import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import CardPaymentForm from "./CardPaymentForm";

function PaymentSectionWidget() {
  const [paymentOptionSelected, setPaymentOptionSelected] = useState("1stOpt");
  const [open, setOpen] = useState(false);
  const handleOpenPayWithCards = () => setOpen(true);
  const handleClosePayWithCards = () => setOpen(false);

  const handleChangePaymentOption = (event) => {
    setPaymentOptionSelected(event.target.value);
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
          gutterBottom
          marginBottom="19px">
          Available payment methods
        </Typography>
        <Box>
          <Box
            padding="9px"
            border={`1px solid ${
              paymentOptionSelected === "1stOpt" ? "#FBD8B4" : "#FFF"
            }`}
            borderRadius="5px"
            bgcolor={paymentOptionSelected === "1stOpt" ? "#FCF5EE" : "#FFF"}>
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
                  checked={paymentOptionSelected === "1stOpt"}
                  onChange={handleChangePaymentOption}
                  style={{
                    verticalAlign: "top",
                    position: "relative",
                    bottom: "-3px",
                  }}
                />
              </Box>
              <Box paddingLeft="10px">
                <Typography variant="body1" fontWeight={600} paragraph>
                  Credit or debit card
                </Typography>
                {paymentOptionSelected === "1stOpt" ? (
                  <>
                    <Typography
                      component="span"
                      color="#007185"
                      sx={{
                        cursor: "pointer",
                        ":hover": {
                          color: "#C7511F",
                          textDecoration: "underline",
                        },
                      }}
                      onClick={handleOpenPayWithCards}>
                      Enter card details
                    </Typography>
                    &nbsp;&rsaquo;&nbsp;
                    <Typography component="span">
                      Prime Cart accepts all major credit & cards
                    </Typography>
                    <CardPaymentForm open={open} handleClosePayWithCards={handleClosePayWithCards} />
                  </>
                ) : null}
              </Box>
            </label>
          </Box>
          <Box
            padding="9px"
            border={`1px solid ${
              paymentOptionSelected === "2ndOpt" ? "#FBD8B4" : "#FFF"
            }`}
            borderRadius="5px"
            bgcolor={paymentOptionSelected === "2ndOpt" ? "#FCF5EE" : "#FFF"}>
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
                  value="2ndOpt"
                  checked={paymentOptionSelected === "2ndOpt"}
                  onChange={handleChangePaymentOption}
                  style={{
                    verticalAlign: "top",
                    position: "relative",
                    bottom: "-3px",
                  }}
                />
              </Box>
              <Typography variant="body1" fontWeight={600} paddingLeft="10px">
                Cash on Delivery/Pay on Delivery
              </Typography>
            </label>
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

export default PaymentSectionWidget;

import { useState } from "react";
import { Box, Button, Checkbox, Typography } from "@mui/material";
import CardPaymentForm from "./CardPaymentForm";
import { useDispatch, useSelector } from "react-redux";
import { setExpendedCheckoutAccordion } from "../../features/additionalInfo/additionalInfoSlice";
import { setPayment } from "../../features/checkout/checkoutSlice";

function PaymentSectionWidget() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [paymentOptionSelected, setPaymentOptionSelected] = useState("card");

  const [open, setOpen] = useState(false);
  const handleOpenPayWithCards = () => setOpen(true);
  const handleClosePayWithCards = () => setOpen(false);
  
  const handlePayment = async() => {
    console.log("payment Processing");
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({type: paymentOptionSelected}),
      });
      const json = await res.json();
      if (json.success) {
        console.log(json.data);
        console.log("Payment successful.");
        dispatch(setPayment({ paymentMethod: paymentOptionSelected, paymentId: json.data._id }));
        dispatch(setExpendedCheckoutAccordion("preview"));
      } else {
        console.log(json.error);
      }


  };

  const [cardDetails, setCardDetails] = useState(null);

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
              paymentOptionSelected === "card" ? "#FBD8B4" : "#FFF"
            }`}
            borderRadius="5px"
            bgcolor={paymentOptionSelected === "card" ? "#FCF5EE" : "#FFF"}
            >
            <Box paddingLeft="15px" display="flex" alignItems="center">
              <Checkbox
                size="small"
                disableRipple
                checked={paymentOptionSelected === "card"}
                onClick={() => setPaymentOptionSelected("card")}
              />
              <Box paddingLeft="10px">
                <Typography variant="body1" fontWeight={600}>
                  Credit or debit card
                </Typography>
                {paymentOptionSelected === "card" ? (
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
                    <CardPaymentForm
                      open={open}
                      handleClosePayWithCards={handleClosePayWithCards}
                      setCardDetails={setCardDetails}
                    />
                  </>
                ) : undefined}
              </Box>
            </Box>
          </Box>
          <Box
            padding="9px"
            border={`1px solid ${
              paymentOptionSelected === "cod" ? "#FBD8B4" : "#FFF"
            }`}
            borderRadius="5px"
            bgcolor={paymentOptionSelected === "cod" ? "#FCF5EE" : "#FFF"}
            onClick={() => setPaymentOptionSelected("cod")}>
            <Box paddingLeft="15px" display="flex" alignItems="center">
              <Checkbox
                checked={paymentOptionSelected === "cod"}
                size="small"
              />
              <Typography
                variant="body1"
                fontWeight={600}
                paddingLeft="10px">
                Cash on Delivery/Pay on Delivery
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        borderRadius="0 0 8px 8px"
        border="1px #D5D9D9 solid"
        padding="12px 18px 11px"
        bgcolor="#F0F2F2">
        <Button
          disabled={paymentOptionSelected === "card" && !cardDetails}
          sx={{
            color: "#0F1111",
            bgcolor: "#FFD814",
            ":hover": { bgcolor: "#FCD200" },
          }}
          onClick={handlePayment}>
          use this address
        </Button>
      </Box>
    </Box>
  );
}

export default PaymentSectionWidget;

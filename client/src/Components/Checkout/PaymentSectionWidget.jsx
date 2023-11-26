import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Typography,
  useMediaQuery,
} from "@mui/material";
import CardPaymentForm from "./CardPaymentForm";
import { useDispatch, useSelector } from "react-redux";
import { setExpendedCheckoutAccordion } from "../../features/additionalInfo/additionalInfoSlice";
import { setPayment } from "../../features/checkout/checkoutSlice";
import { enqueueSnackbar } from "notistack";

function PaymentSectionWidget() {
  const mediumScreen = useMediaQuery("(min-width:768px)");

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { products, deliveryAddress, paymentId } = useSelector(
    (state) => state.checkout
  );
  const [paymentOptionSelected, setPaymentOptionSelected] = useState("card");

  const [open, setOpen] = useState(false);
  const handleOpenPayWithCards = () => setOpen(true);
  const handleClosePayWithCards = () => setOpen(false);

  const handlePayment = async () => {
    console.log("payment Processing");
    const paymentRes = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/payment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ type: paymentOptionSelected }),
      }
    );
    const paymentResponse = await paymentRes.json();
    if (!paymentResponse.success) {
      enqueueSnackbar(paymentResponse.error, { variant: "error" });
    } else {
      console.log(paymentResponse.data);
      enqueueSnackbar("Payment successful", { variant: "success" });
      dispatch(
        setPayment({
          paymentMethod: paymentOptionSelected,
          paymentId: paymentResponse.data._id,
        })
      );
      // Place the order
      const values = {
        productsInfo: products.map((product) => {
          return {
            id: product.productId,
            sellingPrice: product.price.selling,
            quantity: product.quantity,
          };
        }),
        addressId: deliveryAddress,
        paymentId,
      };

      const orderRes = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(values),
        }
      );
      const json = await orderRes.json();
      if (json.success) {
        dispatch(setExpendedCheckoutAccordion("preview"));
        enqueueSnackbar("Successfully order placed", { variant: "success" });
      } else {
        enqueueSnackbar(json.error, { variant: "error" });
      }
    }
  };

  const [cardDetails, setCardDetails] = useState(null);

  return (
    <Box marginLeft={mediumScreen ? "35px" : "24px"}>
      <Box
        border="1px solid"
        borderColor="grey.500"
        borderRadius="8px 8px 0 0"
        padding="14px 18px">
        <Typography
          variant="h4"
          fontWeight={600}
          borderBottom="1px solid"
          borderColor="grey.500"
          gutterBottom
          marginBottom="19px">
          Available payment methods
        </Typography>
        <Box>
          <Box
            padding="9px"
            border={`1px solid ${
              paymentOptionSelected === "card" ? "primary.dark" : "#FFF"
            }`}
            borderRadius="5px"
            bgcolor={
              paymentOptionSelected === "card" ? "primary.main" : "#FFF"
            }>
            <Box paddingLeft="15px" display="flex" alignItems="center">
              <Checkbox
                size="small"
                color="success"
                disableRipple
                checked={paymentOptionSelected === "card"}
                onClick={() => setPaymentOptionSelected("card")}
              />
              <Box paddingLeft="10px">
                <Typography variant="subtitle1" fontWeight={600}>
                  Credit or debit card
                </Typography>
                {paymentOptionSelected === "card" ? (
                  <>
                    <Typography
                      component="span"
                      color="success.dark"
                      sx={{
                        cursor: "pointer",
                        ":hover": {
                          color: "secondary.main",
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
              paymentOptionSelected === "cod" ? "primary.dark" : "#FFF"
            }`}
            borderRadius="5px"
            bgcolor={paymentOptionSelected === "cod" ? "primary.main" : "#FFF"}
            onClick={() => setPaymentOptionSelected("cod")}>
            <Box paddingLeft="15px" display="flex" alignItems="center">
              <Checkbox
                checked={paymentOptionSelected === "cod"}
                size="small"
                color="success"
              />
              <Typography
                variant="subtitle1"
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
        border="1px grey.500 solid"
        padding="12px 18px 11px"
        bgcolor="grey.100">
        <Button
          disabled={paymentOptionSelected === "card" && !cardDetails}
          variant="contained"
          color="warning"
          onClick={handlePayment}>
          Confirm Order
        </Button>
      </Box>
    </Box>
  );
}

export default PaymentSectionWidget;

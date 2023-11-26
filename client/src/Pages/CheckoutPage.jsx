import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import CheckoutHeader from "../Components/Header/CheckoutHeader";
import AddressSelectionWidget from "../Components/Checkout/AddressSelectionWidget";
import PaymentSectionWidget from "../Components/Checkout/PaymentSectionWidget";
import PreviewItemSectionWidget from "../Components/Checkout/PreviewItemSectionWidget";
import CheckoutSummary from "../Components/Checkout/CheckoutSummary";

function CheckoutPage() {
  const largeScreen = useMediaQuery("(min-width:1024px)");
  const mediumScreen = useMediaQuery("(min-width:768px)");

  const navigate = useNavigate();

  const expendedCheckoutAccordion = useSelector(
    (state) => state.additionalInfo.expendedCheckoutAccordion
  );
  const { totalProductsPrice } = useSelector((state) => state.checkout);
  useEffect(() => {
    if (totalProductsPrice === 0) {
      navigate("/cart");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <CheckoutHeader />
      <Box padding="16px" maxWidth="1150px" margin="auto" position="relative">
        <Box
          paddingRight={largeScreen ? "326px" : mediumScreen ? "240px" : 0}
          position="relative">
          {!mediumScreen ? <CheckoutSummary /> : null}
          <Box paddingRight={largeScreen ? "3.5%" : mediumScreen ? "1.5%" : 0}>
            <Accordion
              elevation={0}
              disableGutters
              expanded={expendedCheckoutAccordion === "address"}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography
                  variant="h4"
                  fontWeight={600}
                  color={
                    expendedCheckoutAccordion === "address"
                      ? "#C45500"
                      : "grey.800"
                  }>
                  1&nbsp;&nbsp;&nbsp;
                  {expendedCheckoutAccordion === "address"
                    ? "Select a delivery address"
                    : "Delivery address"}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <AddressSelectionWidget />
              </AccordionDetails>
            </Accordion>
            <Accordion
              elevation={0}
              disableGutters
              expanded={expendedCheckoutAccordion === "payment"}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography
                  variant="h4"
                  fontWeight={600}
                  color={
                    expendedCheckoutAccordion === "payment"
                      ? "#C45500"
                      : "grey.800"
                  }>
                  2&nbsp;&nbsp;&nbsp;
                  {expendedCheckoutAccordion === "payment"
                    ? "Select a payment method"
                    : "Payment"}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <PaymentSectionWidget />
              </AccordionDetails>
            </Accordion>
            <Accordion
              elevation={0}
              disableGutters
              expanded={expendedCheckoutAccordion === "preview"}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel3bh-content"
                id="panel3bh-header">
                <Typography
                  variant="h4"
                  fontWeight={600}
                  color={
                    expendedCheckoutAccordion === "preview"
                      ? "#C45500"
                      : "grey.800"
                  }>
                  3&nbsp;&nbsp;&nbsp;Items and delivery
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <PreviewItemSectionWidget />
              </AccordionDetails>
            </Accordion>
            <Box borderTop="2px solid" borderColor="grey.600" marginTop={4}>
              <Typography
                component="p"
                variant="subtitle1"
                paragraph
                marginTop={3}>
                Need help? Check our help pages or contact us
              </Typography>
              <Typography component="p" variant="subtitle1" paragraph>
                When your order is placed, we&apos;ll send you an e-mail message
                acknowledging receipt of your order. If you choose to pay using
                an electronic payment method (credit card, debit card or net
                banking), you will be directed to your bank&apos;s website to
                complete your payment. Your contract to purchase an item will
                not be complete until we receive your electronic payment and
                dispatch your item. If you choose to pay using Pay on Delivery
                (POD), you can pay using cash/card/net banking when you receive
                your item.
              </Typography>
              <Typography component="p" variant="subtitle1" paragraph>
                Need to add more items to your order? Continue shopping on the
                PrimeCart homepage.
              </Typography>
            </Box>
          </Box>
          {mediumScreen ? <CheckoutSummary /> : null}
        </Box>
      </Box>
    </Box>
  );
}

export default CheckoutPage;

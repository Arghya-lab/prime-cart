import { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import CheckoutHeader from "../Components/CheckoutHeader";
import AddressSelectionWidget from "../Components/AddressSelectionWidget";
import PaymentSectionWidget from "../Components/PaymentSectionWidget";
import ReviewItemSectionWidget from "../Components/ReviewItemSectionWidget";

function CheckoutPage() {
  const [expanded, setExpanded] = useState("1");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box>
      <CheckoutHeader />
      <Box padding="16px" maxWidth="1150px" margin="auto" position="relative">
        <Box paddingRight="290px" position="relative">
          <Box paddingRight="3.5%">
            <Accordion
              elevation={0}
              disableGutters
              expanded={expanded === "1"}
              onChange={handleChange("1")}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1bh-content"
                id="panel1bh-header">
                <Typography
                  variant="h6"
                  fontWeight={600}
                  color={expanded === "1" ? "#C45500" : "#565959"}>
                  1&nbsp;&nbsp;&nbsp;
                  {expanded === "1"
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
              expanded={expanded === "2"}
              onChange={handleChange("2")}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel2bh-content"
                id="panel2bh-header">
                <Typography
                  variant="h6"
                  fontWeight={600}
                  color={expanded === "2" ? "#C45500" : "#565959"}>
                  2&nbsp;&nbsp;&nbsp;
                  {expanded === "2"
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
              expanded={expanded === "3"}
              onChange={handleChange("3")}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel3bh-content"
                id="panel3bh-header">
                <Typography
                  variant="h6"
                  fontWeight={600}
                  color={expanded === "3" ? "#C45500" : "#565959"}>
                  3&nbsp;&nbsp;&nbsp;Items and delivery
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ReviewItemSectionWidget />
              </AccordionDetails>
            </Accordion>
            <Box borderTop="2px solid #BBBFBF" marginTop={4}>
              <Typography
                component="p"
                variant="caption"
                paragraph
                marginTop={3}>
                Need help? Check our help pages or contact us
              </Typography>
              <Typography component="p" variant="caption" paragraph>
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
              <Typography component="p" variant="caption" paragraph>
                Need to add more items to your order? Continue shopping on the
                PrimeCart homepage.
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              width: "290px",
              marginRight: "-290px",
              float: "right",
              overflow: "visible",
            }}>
            <Box
              position="fixed"
              width="inherit"
              top="88px"
              border="1px solid #D5D9D9"
              borderRadius="8px"
              padding="14px 18px">
              <Typography variant="h6" fontWeight={600}>
                Order Summary
              </Typography>
              <table style={{ width: "100%"}}>
                <tbody>
                  <tr>
                    <td>Items:</td>
                    <td style={{textAlign: "right"}}>₹2,160.00</td>
                  </tr>
                  <tr>
                    <td>Delivery:</td>
                    <td style={{textAlign: "right"}}>₹200.00</td>
                  </tr>
                  <tr style={{ padding: "10px"}}>
                  <td colSpan="2" style={{height: "1px", background: "#BBBFBF" }} >
                    <hr/>
                  </td>
                  </tr>
                  <tr style={{ fontSize: "18px", color: "#B12704", fontWeight: 700}}>
                    <td>Order Total:</td>
                    <td style={{textAlign: "right"}}>₹2,160.00</td>
                  </tr>
                </tbody>
              </table>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default CheckoutPage;

import PropTypes from "prop-types";
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";

const validationSchema = yup.object({
  number: yup
    .string("Enter your card number.")
    .required("Card number is required."),
  name: yup
    .string("Enter your full name.")
    .min(3, "Must be 3 char.")
    .max(20, "Maximum 20 char is allowed.")
    .required("Full name is required."),
  expiry: yup.string("Enter your exp date.").required("Exp date is required."),
  cvc: yup
    .string("Enter your cvv/cvc number.")
    .min(3, "Must be 3 digit.")
    .max(4, "Maximum 4 digit is allowed.")
    .required("cvv/cvc is required."),
});

function CardPaymentForm({ open, handleClosePayWithCards, setCardDetails }) {
  const [focus, setFocus] = useState(null);
  const handleInputFocus = (event) => {
    setFocus(event.target.name);
  };

  const formik = useFormik({
    initialValues: {
      number: "",
      name: "",
      expiry: "",
      cvc: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      //  start loader
      setTimeout(() => {
        setCardDetails(values);
        handleClosePayWithCards();
        //  end loader
      }, 2500);
    },
  });

  const resetFormData = () => {
    formik.resetForm();
  };

  return (
    <Modal
      open={open}>
      <Box
        position="absolute"
        top="50%"
        left="50%"
        width={700}
        bgcolor="background.paper"
        border="1px solid"
        borderColor="grey.500"
        borderRadius="8px"
        boxShadow={24}
        sx={{transform: "translate(-50%, -50%)"}}>
        <Box
          borderBottom="1px solid"
          borderColor="grey.500"
          borderRadius="8px 8px 0 0"
          backgroundColor="grey.100"
          padding="16px 24px">
          <Typography fontWeight={600} variant="h4">Enter card details</Typography>
        </Box>
        <Box padding="16px 24px" display="flex">
          <Cards
            number={formik.values.number}
            name={formik.values.name}
            expiry={formik.values.expiry}
            cvc={formik.values.cvc}
            focused={focus}
          />
          <form
            style={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
            onSubmit={formik.handleSubmit}>
            <TextField
              label="Card Number"
              variant="standard"
              fullWidth
              type="number"
              name="number"
              onFocus={handleInputFocus}
              value={formik.values.number}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.number && Boolean(formik.errors.number)}
              helperText={formik.touched.number && formik.errors.number}
            />
            <TextField
              label="Name"
              variant="standard"
              fullWidth
              type="text"
              name="name"
              onFocus={handleInputFocus}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              label="Exp date"
              variant="standard"
              fullWidth
              type="number"
              name="expiry"
              onFocus={handleInputFocus}
              value={formik.values.expiry}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.expiry && Boolean(formik.errors.expiry)}
              helperText={formik.touched.expiry && formik.errors.expiry}
            />
            <TextField
              label="cvc"
              variant="standard"
              fullWidth
              type="number"
              name="cvc"
              onFocus={handleInputFocus}
              value={formik.values.cvc}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.cvc && Boolean(formik.errors.cvc)}
              helperText={formik.touched.cvc && formik.errors.cvc}
            />
          </form>
        </Box>
        <Box
          borderTop="1px solid"
          borderColor="grey.500"
          borderRadius="0 0 8px 8px"
          backgroundColor="grey.100"
          padding="10px 16px"
          display="flex"
          justifyContent="flex-end"
          gap="8px">
          <Button
            size="small"
            sx={{
              color: "#0F1111",
              bgcolor: "#FFF",
              border: "1px solid",
              ":hover": { bgcolor: "grey.50" },
            }}
            onClick={() => {
              handleClosePayWithCards();
              resetFormData();
            }}>
            Cancel
          </Button>
          <Button
            size="small"
            type="submit"
            sx={{
              color: "#0F1111",
              bgcolor: "warning.light",
              ":hover": { bgcolor: "warning.dark" },
            }}
            onClick={formik.handleSubmit}>
            Enter card details
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

CardPaymentForm.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClosePayWithCards: PropTypes.func.isRequired,
  setCardDetails: PropTypes.func.isRequired,
};

export default CardPaymentForm;

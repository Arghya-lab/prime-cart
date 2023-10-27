import * as yup from "yup";
import { useState } from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Navbar from "../Components/Navbar";
import { setSellerToken } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const initialValues = {
  customerSupportEmail: "",
  panNo: "",
  location: "",
};

const validationSchema = yup.object({
  customerSupportEmail: yup
    .string("Enter your customer Support Email.")
    .email("Enter a valid customer Support Email.")
    .required("customer Support Email is required."),
  panNo: yup
    .string("Enter your Pan No.")
    .length(10, "Pan No. must be 10 characters length.")
    .required("Pan No. is required."),
  location: yup
    .string("Location is required.")
    .max(50, "Location should not exist 50 characters length.")
    .min(5, "Location have to be at least 5 character length.")
    .required("Location is required."),
});

function SellerAuthPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isCreateSellerPage, setIsCreateSellerPage] = useState(true);

  const Token = useSelector((state) => state.auth.token);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log("create Seller");

      const res = await fetch("http://localhost:8000/api/auth/createSeller", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: Token,
        },
        body: JSON.stringify(values),
      });
      const json = await res.json();
      if (json.success) {
        console.log("Successfully created seller.");
        dispatch(setSellerToken(json.data));
        // Send them back to the page they tried to visit when they were redirected to the login page. Use { replace: true } so we don't create another entry in the history stack for the login page.  This means that when they get to the protected page and click the back button, they won't end up back on the login page, which is also really nice for the user experience.
        navigate("/seller", { replace: true });
      } else {
        console.log(json.error);
      }
    },
  });

  const handleFetchSellerInfo = async () => {
    console.log("fetch Seller");

    const res = await fetch("http://localhost:8000/api/auth/getSellerToken", {
      method: "GET",
      headers: {
        Authorization: Token,
      },
    });
    const json = await res.json();
    if (json.success) {
      console.log("Successfully get seller info.");
      dispatch(setSellerToken(json.data));
      // Send them back to the page they tried to visit when they were redirected to the login page. Use { replace: true } so we don't create another entry in the history stack for the login page.  This means that when they get to the protected page and click the back button, they won't end up back on the login page, which is also really nice for the user experience.
      navigate("/seller", { replace: true });
    } else {
      console.log(json.error);
    }
  };

  return (
    <Box>
      <Navbar />
      <Paper
        elevation={8}
        sx={{
          m: "2rem auto",
          maxWidth: "768px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2rem",
        }}>
        <Typography textAlign="center" p="2rem" variant="h5" gutterBottom>
          {isCreateSellerPage ? "Seller registration form" : undefined}
        </Typography>
        {isCreateSellerPage ? (
          <Stack
            component="form"
            width={600}
            alignItems="center"
            spacing={3}
            paddingX={4}
            onSubmit={formik.handleSubmit}>
            <TextField
              sx={{ m: 1 }}
              variant="outlined"
              fullWidth
              id="customerSupportEmail"
              name="customerSupportEmail"
              label="customer Support Email"
              value={formik.values.customerSupportEmail}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.customerSupportEmail &&
                Boolean(formik.errors.customerSupportEmail)
              }
              helperText={
                formik.touched.customerSupportEmail &&
                formik.errors.customerSupportEmail
              }
            />
            <TextField
              sx={{ m: 1 }}
              variant="outlined"
              fullWidth
              id="panNo"
              name="panNo"
              label="Pan No."
              type="panNo"
              value={formik.values.panNo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.panNo && Boolean(formik.errors.panNo)}
              helperText={formik.touched.panNo && formik.errors.panNo}
            />
            <TextField
              sx={{ m: 1 }}
              variant="outlined"
              fullWidth
              id="location"
              name="location"
              label="Location"
              type="location"
              value={formik.values.location}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.location && Boolean(formik.errors.location)}
              helperText={formik.touched.location && formik.errors.location}
            />
            <Button color="primary" variant="contained" type="submit">
              Submit
            </Button>
          </Stack>
        ) : (
          <Button
            color="primary"
            variant="contained"
            type="button"
            sx={{ width: "300px" }}
            onClick={handleFetchSellerInfo}>
            Get seller info
          </Button>
        )}
        <Button
          color="secondary"
          variant="text"
          type="button"
          sx={{ m: "1rem" }}
          onClick={() => setIsCreateSellerPage(!isCreateSellerPage)}>
          {isCreateSellerPage
            ? "I am already seller"
            : "Go to create seller page"}
        </Button>
      </Paper>
    </Box>
  );
}

export default SellerAuthPage;

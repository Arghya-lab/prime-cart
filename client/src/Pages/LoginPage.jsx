import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Button,
  TextField,
  Stack,
  Typography,
} from "@mui/material";
import { setCustomerLogin } from "../features/auth/authSlice";

const signupValidationSchema = yup.object({
  firstName: yup
    .string("Enter your email")
    .min(3, "firstName should be of minimum 3 characters length")
    .max(20, "Too Long!")
    .required("Name is required"),
  lastName: yup
    .string("Enter your email")
    .min(3, "lastName should be of minimum 3 characters length")
    .max(20, "Too Long!"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});
const loginValidationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const loginInitialValues = {
  email: "",
  password: "",
};
const signupInitialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

function LoginPage() {
  const [isLoginPage, setIsLoginPage] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (values) => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const json = await res.json();
    if (json.success) {
      dispatch(setCustomerLogin(json.data));
      // Send them back to the page they tried to visit when they were redirected to the login page. Use { replace: true } so we don't create another entry in the history stack for the login page.  This means that when they get to the protected page and click the back button, they won't end up back on the login page, which is also really nice for the user experience.
      navigate(from, { replace: true });
    } else {
      console.log(json.error);
    }
  };

  const handleSignup = async (values) => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const json = await res.json();
    if (json.success) {
      dispatch(setCustomerLogin(json.data));
      // Send them back to the page they tried to visit when they were redirected to the login page. Use { replace: true } so we don't create another entry in the history stack for the login page.  This means that when they get to the protected page and click the back button, they won't end up back on the login page, which is also really nice for the user experience.
      navigate(from, { replace: true });
    } else {
      console.log(json.error);
    }
  };

  const formik = useFormik({
    initialValues: isLoginPage ? loginInitialValues : signupInitialValues,
    validationSchema: isLoginPage
      ? loginValidationSchema
      : signupValidationSchema,
    onSubmit: (values) => {
      isLoginPage ? handleLogin(values) : handleSignup(values);
    },
  });

  return (
    <Box>
      <Box bgcolor="#131921">
        <Typography
          textAlign="center"
          p="1rem"
          variant="h4"
          fontSize="2.5rem"
          fontWeight="fontWeightBold"
          gutterBottom
          color="whitesmoke">
          Prime Cart
        </Typography>
      </Box>
      <Paper elevation={8} sx={{ m: "2rem auto", maxWidth: "768px" }}>
        <Typography textAlign="center" p="2rem" variant="h4" gutterBottom>
          {isLoginPage ? "Login" : "Signup"}
        </Typography>
        <Stack
          component="form"
          alignItems="center"
          spacing={3}
          padding={4}
          onSubmit={formik.handleSubmit}>
          {isLoginPage ? null : (
            <Stack
              spacing={3}
              direction="row"
              fullWidth
              sx={{ m: 1, width: "100%" }}>
              <TextField
                variant="outlined"
                fullWidth
                id="firstName"
                name="firstName"
                label="First Name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
              <TextField
                variant="outlined"
                fullWidth
                id="lastName"
                name="lastName"
                label="Last Name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </Stack>
          )}
          <TextField
            sx={{ m: 1 }}
            variant="outlined"
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            sx={{ m: 1 }}
            variant="outlined"
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button color="primary" variant="contained" type="submit">
            Submit
          </Button>
          <Button
            color="secondary"
            variant="text"
            type="button"
            onClick={() => setIsLoginPage(!isLoginPage)}>
            {isLoginPage ? "I don't have account" : "Already have an account !"}
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}

export default LoginPage;

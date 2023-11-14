import PropTypes from "prop-types";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  addNewAddress,
  updateAddress,
} from "../features/additionalInfo/additionalInfoSlice";
import Navbar from "../Components/Navbar";

const indianStates = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli",
  "Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const validationSchema = yup.object({
  fullName: yup
    .string()
    .min(3, "Must be 3 char.")
    .max(20, "Maximum 20 char is allowed.")
    .required("Full Name is required"),
  mobileNumber: yup
    .string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be exactly 10 digits")
    .max(10, "Must be exactly 10 digits")
    .required("Mobile Number is required"),
  pinCode: yup
    .string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(6, "Must be exactly 10 digits")
    .max(6, "Must be exactly 10 digits")
    .required("PIN Code is required"),
  landmark: yup.string(),
  area: yup.string().required("Area is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
});

function CustomerAddressFormPage({ pageType }) {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { addressId } = useParams();

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const initialEditPageFormValues = useSelector(
    (state) => state.additionalInfo.addressToUpdate
  );

  const handleCreateAddress = async (values) => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/address`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(values),
    });
    const json = await res.json();
    if (json.success) {
      dispatch(addNewAddress(json.data));
      console.log(json.data);
      navigate(from, { replace: true });
    } else {
      console.log(json.error);
    }
  };

  const handleEditAddress = async (values) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/address/${addressId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(values),
      }
    );
    const json = await res.json();
    if (json.success) {
      dispatch(updateAddress(json.data));
      console.log(json.data);
      navigate(from, { replace: true });
    } else {
      console.log(json.error);
    }
  };

  const formik = useFormik({
    initialValues:
      pageType === "create"
        ? {
            fullName: "",
            mobileNumber: "",
            pinCode: "",
            landmark: "",
            area: "",
            city: "",
            state: "",
            isDefault: false,
          }
        : initialEditPageFormValues,
    validationSchema: validationSchema,
    onSubmit: pageType === "create" ? handleCreateAddress : handleEditAddress,
  });

  return (
    <>
      <Navbar />
      <Box margin="2rem auto" maxWidth="688px" padding="24px 16px">
        <Paper elevation={6}>
          <Box
            padding="0 24px"
            paddingY="16px"
            display="flex"
            justifyContent="space-between"
            borderBottom="1px solid"
            borderColor="grey.500"
            bgcolor="grey.100"
            borderRadius="8px 8px 0 0">
            <Typography variant="h4" fontWeight={600}>
              Enter a new delivery address
            </Typography>
          </Box>
          <Box padding="16px 24px">
            <form onSubmit={formik.handleSubmit}>
              <Stack gap={2} mt="16px">
                <TextField
                  size="small"
                  fullWidth
                  color="grey"
                  variant="outlined"
                  id="fullName"
                  label="Full name (First and Last name)"
                  name="fullName"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.fullName && Boolean(formik.errors.fullName)
                  }
                  helperText={formik.touched.fullName && formik.errors.fullName}
                />
                <TextField
                  size="small"
                  fullWidth
                  color="grey"
                  variant="outlined"
                  id="mobileNumber"
                  label="Mobile number"
                  name="mobileNumber"
                  value={formik.values.mobileNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.mobileNumber &&
                    Boolean(formik.errors.mobileNumber)
                  }
                  helperText={
                    formik.touched.mobileNumber && formik.errors.mobileNumber
                  }
                />
                <TextField
                  size="small"
                  fullWidth
                  color="grey"
                  variant="outlined"
                  id="pinCode"
                  label="Pincode"
                  name="pinCode"
                  value={formik.values.pinCode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.pinCode && Boolean(formik.errors.pinCode)
                  }
                  helperText={formik.touched.pinCode && formik.errors.pinCode}
                />
                <TextField
                  size="small"
                  fullWidth
                  color="grey"
                  variant="outlined"
                  id="landmark"
                  label="Landmark"
                  name="landmark"
                  value={formik.values.landmark}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.landmark && Boolean(formik.errors.landmark)
                  }
                  helperText={formik.touched.landmark && formik.errors.landmark}
                />
                <TextField
                  size="small"
                  fullWidth
                  color="grey"
                  variant="outlined"
                  id="area"
                  label="Area, Street, Sector, Village"
                  name="area"
                  value={formik.values.area}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.area && Boolean(formik.errors.area)}
                  helperText={formik.touched.area && formik.errors.area}
                />
                <Stack spacing={3} direction="row">
                  <TextField
                    size="small"
                    fullWidth
                    color="grey"
                    variant="outlined"
                    id="city"
                    label="City"
                    name="city"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.city && Boolean(formik.errors.city)}
                    helperText={formik.touched.city && formik.errors.city}
                  />
                  <FormControl
                    fullWidth
                    size="small"
                    error={
                      formik.touched.state && Boolean(formik.errors.state)
                    }>
                    <InputLabel color="grey">State</InputLabel>
                    <Select
                      id="state"
                      name="state"
                      color="grey"
                      label="State"
                      value={formik.values.state}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}>
                      {indianStates.map((state) => (
                        <MenuItem key={state} value={state}>
                          {state}
                        </MenuItem>
                      ))}
                    </Select>
                    {formik.touched.state && Boolean(formik.errors.state) && (
                      <FormHelperText>
                        {formik.touched.state && formik.errors.state}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Stack>
                <FormControlLabel
                  control={
                    <Checkbox
                      id="isDefault"
                      color="success"
                      name="isDefault"
                      checked={formik.values.isDefault}
                      onChange={formik.handleChange}
                    />
                  }
                  label="Make this my default address"
                />
              </Stack>
            </form>
          </Box>
          <Box
            paddingX="24px"
            paddingY="16px"
            display="flex"
            justifyContent="space-between"
            borderTop="1px solid"
            borderColor="grey.500"
            bgcolor="grey.100"
            borderRadius="0 0 8px 8px">
            <Button
              color="warning"
              variant="contained"
              type="submit"
              onClick={formik.handleSubmit}>
              Use this location
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  );
}

CustomerAddressFormPage.propTypes = {
  pageType: PropTypes.string.isRequired,
};

export default CustomerAddressFormPage;

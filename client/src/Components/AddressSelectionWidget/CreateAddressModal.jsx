import PropTypes from "prop-types";
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
  Modal,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { addNewAddress } from "../../features/additionalInfo/additionalInfoSlice";

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

function CreateAddressModal({ open, handleClose }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      mobileNumber: "",
      pinCode: "",
      landmark: "",
      area: "",
      city: "",
      state: "",
      isDefault: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
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
        dispatch(addNewAddress(json.data))
        console.log(json.data);
        formik.resetForm();
        handleClose();
      } else {
        console.log(json.error);
      }
    },
  });

  return (
    <Modal
      open={open}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 672,
          bgcolor: "background.paper",
          borderRadius: "8px",
          boxShadow: 24,
        }}>
        <Box
          padding="0 24px"
          paddingY="16px"
          display="flex"
          justifyContent="space-between"
          borderBottom="1px solid #D5D9D9"
          bgcolor="#F0F2F2"
          borderRadius="8px 8px 0 0">
          <Typography fontWeight={600}>Enter a new delivery address</Typography>
          <Box sx={{ cursor: "pointer" }} onClick={handleClose}>
            <Close />
          </Box>
        </Box>
        <Box padding="16px 24px">
          <Typography variant="h5" fontWeight={700} gutterBottom>
            Add a new address
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Stack gap={2} mt="16px">
              <TextField
                size="small"
                fullWidth
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
                variant="outlined"
                id="pinCode"
                label="Pincode"
                name="pinCode"
                value={formik.values.pinCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.pinCode && Boolean(formik.errors.pinCode)}
                helperText={formik.touched.pinCode && formik.errors.pinCode}
              />
              <TextField
                size="small"
                fullWidth
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
              <Stack
                spacing={3}
                direction="row">
                <TextField
                  size="small"
                  fullWidth
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
                  error={formik.touched.state && Boolean(formik.errors.state)}>
                  <InputLabel>State</InputLabel>
                  <Select
                    id="state"
                    name="state"
                    label="State"
                    value={formik.values.state}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}>
                    {indianStates.map((state) => (
                      <MenuItem
                        key={state}
                        //  algo help to change each state name to camel case
                        value={state
                          .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
                            return index === 0
                              ? word.toLowerCase()
                              : word.toUpperCase();
                          })
                          .replace(/\s+/g, "")}>
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
          padding="0 24px"
          paddingY="16px"
          display="flex"
          justifyContent="space-between"
          borderTop="1px solid #D5D9D9"
          bgcolor="#F0F2F2"
          borderRadius="0 0 8px 8px">
          <Button
            sx={{
              color: "#0F1111",
              bgcolor: "#FFD814",
              ":hover": { bgcolor: "#FCD200" },
            }}
            type="submit"
            onClick={formik.handleSubmit}>
            Use this location
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

CreateAddressModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default CreateAddressModal;

import PropTypes from "prop-types";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";

function CreateAddressModal({ open, handleClose }) {
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
          <Stack gap={2} mt="16px">
            <TextField
              size="small"
              fullWidth
              id="outlined-basic"
              label="Full name (First and Last name)"
              variant="outlined"
            />
            <TextField
              size="small"
              fullWidth
              id="outlined-basic"
              label="Mobile number"
              variant="outlined"
            />
            <TextField
              size="small"
              fullWidth
              id="outlined-basic"
              label="Pincode"
              variant="outlined"
            />
            <TextField
              size="small"
              fullWidth
              id="outlined-basic"
              label="Locality"
              variant="outlined"
            />
            <TextField
              size="small"
              fullWidth
              id="outlined-basic"
              label="Area, Street, Sector, Village"
              variant="outlined"
            />
            <TextField
              size="small"
              fullWidth
              id="outlined-basic"
              label="City"
              variant="outlined"
            />
            <TextField
              size="small"
              fullWidth
              id="outlined-basic"
              label="State"
              variant="outlined"
            />
          </Stack>
          <FormControlLabel
            control={<Checkbox />}
            label="Make this my default address"
          />
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
            }}>
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

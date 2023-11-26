import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Divider, Typography, useMediaQuery } from "@mui/material";
import {
  deleteAddress,
  setAddressToUpdate,
  setToDefaultAddress,
} from "../features/address/addressSlice";
import { enqueueSnackbar } from "notistack";

function AddressWidget({ address }) {
  const mediumScreen = useMediaQuery("(min-width:768px)");
  const smallScreen = useMediaQuery("(min-width:425px)");

  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const handleRemoveAddress = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/address/${address._id} `,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }
    );
    const json = await res.json();
    if (json.success) {
      dispatch(deleteAddress(address._id));
      enqueueSnackbar("Address removed", { variant: "warning" });
    } else {
      enqueueSnackbar(json.error, { variant: "error" });
    }
  };

  const handleSetToDefault = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/address/default/${address._id} `,
      {
        method: "PATCH",
        headers: {
          Authorization: token,
        },
      }
    );
    const json = await res.json();
    if (json.success) {
      enqueueSnackbar("Changed default address", { variant: "info" });
      dispatch(setToDefaultAddress(address._id));
    } else {
      enqueueSnackbar(json.error, { variant: "error" });
    }
  };

  return (
    <Box
      border="2px solid"
      borderRadius="8px"
      borderColor="grey.500"
      sx={{
        minHeight: smallScreen ? "272px" : "208px",
        minWidth: mediumScreen ? "308px" : "272px",
        maxWidth: mediumScreen ? "308px" : "400px",
        marginY: "0.5rem",
      }}>
      {address?.isDefault && (
        <Box height="40px" borderBottom="1px solid" borderColor="grey.500">
          <Typography
            component="p"
            variant="h4"
            fontWeight={600}
            padding="12px 20px"
            textAlign="end"
            color="success.light">
            Default
          </Typography>
        </Box>
      )}
      <Box padding="12px 20px">
        <Box>
          <Typography component="div" variant="h6" fontWeight={600}>
            {address?.fullName}
          </Typography>
          <Typography component="div" variant="h6">
            {address?.landmark}
          </Typography>
          <Typography component="div" variant="h6">
            {address?.city},&nbsp;
            {address?.area}&nbsp;{address?.pinCode}
          </Typography>
          <Typography component="div" variant="h6">
            {address?.state}
          </Typography>
          <Typography component="div" variant="h6">
            Phone number:&nbsp;{address?.mobileNumber}
          </Typography>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          width="fit-content"
          borderRadius="1px"
          gap="8px"
          marginY="8px">
          <Typography
            variant="body2"
            color="success.dark"
            sx={{
              cursor: "pointer",
              ":hover": {
                color: "secondary.main",
                textDecoration: "underline",
              },
            }}
            onClick={() => {
              dispatch(setAddressToUpdate(address._id));
              navigate(`/addresses/edit/${address._id}`, {
                state: { from: location },
              });
            }}>
            Edit
          </Typography>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Typography
            variant="body2"
            color="success.dark"
            sx={{
              cursor: "pointer",
              ":hover": {
                color: "secondary.main",
                textDecoration: "underline",
              },
            }}
            onClick={handleRemoveAddress}>
            Remove
          </Typography>
          {!address?.isDefault && (
            <>
              <Divider orientation="vertical" variant="middle" flexItem />
              <Typography
                variant="body2"
                color="success.dark"
                sx={{
                  cursor: "pointer",
                  ":hover": {
                    color: "secondary.main",
                    textDecoration: "underline",
                  },
                }}
                onClick={handleSetToDefault}>
                Set as Default
              </Typography>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}

AddressWidget.propTypes = {
  address: PropTypes.object.isRequired,
};

export default AddressWidget;

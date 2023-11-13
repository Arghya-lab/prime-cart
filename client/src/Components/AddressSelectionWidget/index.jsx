import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Add } from "@mui/icons-material";
import { Box, Button, Checkbox, Typography } from "@mui/material";
import { setDeliveryAddress } from "../../features/checkout/checkoutSlice";
import {
  setAddressToUpdate,
  setAddresses,
  setExpendedCheckoutAccordion,
} from "../../features/additionalInfo/additionalInfoSlice";

function AddressSelectionWidget() {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const addresses = useSelector((state) => state.additionalInfo.addresses);

  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleChangeDeliveryAddress = (id) => {
    setSelectedAddress(id);
  };

  useEffect(() => {
    (async () => {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/address`, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      const json = await res.json();
      if (json.success) {
        console.log(json.data);
        dispatch(setAddresses(json.data));
      } else {
        console.log(json.error);
      }
    })();
  }, []);

  useEffect(() => {
    addresses.forEach((address) => {
      if (address.isDefault) {
        setSelectedAddress(address._id);
      }
    });
  }, [addresses]);

  const handleAddressSelect = () => {
    if (!selectedAddress) {
      console.log("Select a delivery address.");
    } else {
      dispatch(setDeliveryAddress(selectedAddress));
      dispatch(setExpendedCheckoutAccordion("payment"));
    }
  };

  return (
    <Box marginLeft="35px">
      <Box
        border="1px solid grey.500"
        borderRadius="8px 8px 0 0"
        padding="14px 18px">
        <Typography
          variant="h6"
          fontSize="18px"
          lineHeight="24px"
          fontWeight={600}
          borderBottom="1px solid grey.500"
          marginBottom="19px">
          Your addresses
        </Typography>
        <Box>
          <Box>
            {addresses.map((address) => (
              <Box
                key={address._id}
                padding="9px"
                border={`1px solid ${
                  selectedAddress === address._id ? "primary.dark" : "#FFF"
                }`}
                borderRadius="5px"
                bgcolor={selectedAddress === address._id ? "primary.main" : "#FFF"}>
                <Box paddingLeft="15px" display="flex">
                  <Checkbox
                    size="small"
                    disableRipple
                    checked={selectedAddress === address._id}
                    onClick={() => handleChangeDeliveryAddress(address._id)}
                  />
                  <Box>
                    <Typography
                      component="span"
                      variant="body2"
                      fontWeight={600}>
                      {address.fullName}
                    </Typography>
                    &nbsp;
                    <Typography component="span" variant="body2">
                      {`${address.landmark}, ${address.area}, ${address.city}, ${address.state}, ${address.pinCode}`}
                    </Typography>
                    &nbsp;
                    <Typography
                      color="success.dark"
                      component="span"
                      variant="body2"
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
                      Edit address
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
            <Box display="flex" alignItems="center" marginY="8px">
              <Box color="grey.300">
                <Add />
              </Box>
              <Typography
                component="span"
                variant="body1"
                color="success.dark"
                sx={{
                  cursor: "pointer",
                  ":hover": {
                    color: "secondary.main",
                    textDecoration: "underline",
                  },
                }}
                onClick={() =>
                  navigate("/addresses/create", { state: { from: location } })
                }>
                Add new address
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          borderRadius="0 0 8px 8px"
          border="1px grey.500 solid"
          padding="12px 18px 11px"
          bgcolor="grey.100">
          <Button
            sx={{
              color: "#0F1111",
              bgcolor: "warning.light",
              ":hover": { bgcolor: "warning.dark" },
            }}
            onClick={handleAddressSelect}>
            use this address
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default AddressSelectionWidget;

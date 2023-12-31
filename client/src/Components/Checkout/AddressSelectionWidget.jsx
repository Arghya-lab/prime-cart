import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { setDeliveryAddress } from "../../features/checkout/checkoutSlice";
import { setExpendedCheckoutAccordion } from "../../features/additionalInfo/additionalInfoSlice";
import {
  setAddressToUpdate,
  setAddresses,
} from "../../features/address/addressSlice";

function AddressSelectionWidget() {
  const mediumScreen = useMediaQuery("(min-width:768px)");

  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const addresses = useSelector((state) => state.address.addresses);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <Box marginLeft={mediumScreen ? "35px" : "24px"}>
      <Box
        border="1px solid"
        borderColor="grey.500"
        borderRadius="8px 8px 0 0"
        padding="14px 18px">
        <Typography
          variant="h4"
          fontWeight={600}
          borderBottom="1px solid"
          borderColor="grey.500"
          marginBottom="19px">
          Your addresses
        </Typography>
        <Box>
          <Box>
            {addresses.map((address) => (
              <Box
                key={address._id}
                padding="9px"
                border="1px solid"
                borderColor={
                  selectedAddress === address._id ? "primary.dark" : "#fff"
                }
                borderRadius="5px"
                bgcolor={
                  selectedAddress === address._id ? "primary.main" : "#FFF"
                }>
                <Box paddingLeft="15px" display="flex">
                  <Checkbox
                    size="small"
                    color="success"
                    disableRipple
                    checked={selectedAddress === address._id}
                    onClick={() => handleChangeDeliveryAddress(address._id)}
                  />
                  <Box>
                    <Typography
                      component="span"
                      variant="subtitle1"
                      fontWeight={700}>
                      {address.fullName}
                    </Typography>
                    &nbsp;
                    <Typography component="span">
                      {`${address.landmark}, ${address.area}, ${address.city}, ${address.state}, ${address.pinCode}`}
                    </Typography>
                    &nbsp;
                    <Typography
                      component="span"
                      variant="subtitle1"
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
                variant="subtitle1"
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
          border="1px solid"
          borderColor="grey.500"
          borderRadius="0 0 8px 8px"
          padding="12px 18px 11px"
          bgcolor="grey.100">
          <Button
            color="warning"
            variant="contained"
            onClick={handleAddressSelect}>
            use this address
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default AddressSelectionWidget;

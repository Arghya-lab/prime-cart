import { Add } from "@mui/icons-material";
import { Box, Button, Checkbox, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CreateAddressModal from "./CreateAddressModal";
import { useDispatch, useSelector } from "react-redux";
import { setDeliveryAddress } from "../../features/checkout/checkoutSlice";
import { setAddresses, setExpendedCheckoutAccordion } from "../../features/additionalInfo/additionalInfoSlice";

function AddressSelectionWidget() {
  const token = useSelector((state) => state.auth.token);
  const addresses = useSelector((state) => state.additionalInfo.addresses);
  const dispatch = useDispatch()

  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleChangeDeliveryAddress = (id) => {
    setSelectedAddress(id);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
        dispatch(setAddresses(json.data))
      } else {
        console.log(json.error);
      }
    })();
    console.log(addresses);
  }, []);

  useEffect(()=>{
    addresses.forEach(address=> {
      if (address.isDefault) {
        setSelectedAddress(address._id)
      }
    });
  },[addresses])

  const handleAddressSelect = () => {
    if (!selectedAddress) {
      console.log("Select a delivery address.");
    } else {
      dispatch(setDeliveryAddress(selectedAddress))
      dispatch(setExpendedCheckoutAccordion("payment"))
    }
  }
  return (
    <Box marginLeft="35px">
      <Box
        border="1px solid #D5D9D9"
        borderRadius="8px 8px 0 0"
        padding="14px 18px">
        <Typography
          variant="h6"
          fontSize="18px"
          lineHeight="24px"
          fontWeight={600}
          borderBottom="1px solid #D5D9D9"
          marginBottom="19px">
          Your addresses
        </Typography>
        <Box>
          <Box>
            {addresses.map((address) => (<Box
                key={address._id}
                padding="9px"
                border={`1px solid ${
                  selectedAddress === address._id ? "#FBD8B4" : "#FFF"
                }`}
                borderRadius="5px"
                bgcolor={selectedAddress === address._id ? "#FCF5EE" : "#FFF"}
                onClick={() => handleChangeDeliveryAddress(address._id)}>
                <Box paddingLeft="15px" display="flex">
                  <Checkbox checked={selectedAddress === address._id} size="small" />
                  <Box>
                    <Typography
                      component="span"
                      variant="body2"
                      fontWeight={600}>
                      {address.fullName}
                    </Typography>
                    &nbsp;
                    <Typography component="span" variant="body2">
                      {`${address.landmark} ${address.area} ${address.city} ${address.state} ${address.pinCode}`}
                    </Typography>
                    &nbsp;
                    <Typography
                      color="#007185"
                      component="span"
                      variant="body2"
                      sx={{
                        cursor: "pointer",
                        ":hover": {
                          color: "#C7511F",
                          textDecoration: "underline",
                        },
                      }}>
                      Edit address
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
            <Box display="flex" alignItems="center" marginY="8px">
              <Box color="#e4e4e4">
                <Add />
              </Box>
              <Typography
                component="span"
                variant="body1"
                color="#007185"
                sx={{
                  cursor: "pointer",
                  ":hover": {
                    color: "#C7511F",
                    textDecoration: "underline",
                  },
                }}
                onClick={handleOpen}>
                Add new address
              </Typography>
              <CreateAddressModal open={open} handleClose={handleClose} />
            </Box>
          </Box>
        </Box>
        <Box
          borderRadius="0 0 8px 8px"
          border="1px #D5D9D9 solid"
          padding="12px 18px 11px"
          bgcolor="#F0F2F2">
          <Button
            sx={{
              color: "#0F1111",
              bgcolor: "#FFD814",
              ":hover": { bgcolor: "#FCD200" },
            }}
            onClick={handleAddressSelect}
            >
            use this address
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default AddressSelectionWidget;

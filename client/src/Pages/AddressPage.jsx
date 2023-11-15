import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import AddressWidget from "../Components/AddressWidget";
import { setAddresses } from "../features/address/addressSlice";

function AddressPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const addresses = useSelector((state) => state.address.addresses);

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

  return (
    <Box>
      <Navbar />
      <Box width="980px" padding="16px" margin="2rem auto">
        <Typography variant="h1">Your Addresses</Typography>
        <Box marginY="1rem" display="flex" flexWrap="wrap" gap="1rem">
          <Box
            height="272px"
            width="312px"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            border="2px dashed"
            borderColor="grey.500"
            borderRadius="8px"
            sx={{
              cursor: "pointer",
            }}
            onClick={() =>
              navigate("/addresses/create", { state: { from: location } })
            }>
            <Box color="grey.300">
              <Add
                sx={{
                  width: "64px",
                  height: "64px",
                }}
              />
            </Box>
            <Typography
              component="p"
              variant="h2"
              fontWeight={700}
              color="grey.800">
              Add address
            </Typography>
          </Box>
          {addresses &&
            addresses.map((address) => (
              <AddressWidget key={address._id} address={address} />
            ))}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default AddressPage;

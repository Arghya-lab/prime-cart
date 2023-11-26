import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { Add } from "@mui/icons-material";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import AddressWidget from "../Components/AddressWidget";
import { setAddresses } from "../features/address/addressSlice";
import { setLoadingProgress } from "../features/additionalInfo/additionalInfoSlice";

function AddressPage() {
  const mediumScreen = useMediaQuery("(min-width:768px)");
  const smallScreen = useMediaQuery("(min-width:425px)");

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const addresses = useSelector((state) => state.address.addresses);

  useEffect(() => {
    (async () => {
      dispatch(setLoadingProgress(5));
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/address`, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      dispatch(setLoadingProgress(50));
      const json = await res.json();
      dispatch(setLoadingProgress(85));
      if (json.success) {
        console.log(json.data);
        dispatch(setAddresses(json.data));
      } else {
        console.log(json.error);
      }
      dispatch(setLoadingProgress(100));
    })();
  }, []);

  return (
    <Box sx={{ overflowX: "hidden" }}>
      <Navbar />
      <Box
        maxWidth="980px"
        padding="1rem"
        margin={
          mediumScreen ? "2rem auto" : smallScreen ? "1rem auto" : "0.5rem auto"
        }>
        <Typography component="h3" variant={smallScreen ? "h1" : "h2"}>
          Your Addresses
        </Typography>
        <Box
          marginY="1rem"
          display="grid"
          gridTemplateColumns={
            mediumScreen
              ? "repeat(auto-fill,minmax(320px,auto))"
              : "repeat(auto-fill,minmax(272px,408px))"
          }>
          <Box
            height={smallScreen ? "272px" : "208px"}
            minWidth={mediumScreen ? "308px" : "272px"}
            maxWidth={mediumScreen ? "308px" : "400px"}
            marginY="0.5rem"
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
              variant={smallScreen ? "h2" : "h4"}
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

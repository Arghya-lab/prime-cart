import { Box, Typography } from "@mui/material";
import SellerNavbar from "../Components/SellerNavbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";

function SellerPage() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("overview");

  return (
    <Box minHeight="100vh">
      <SellerNavbar />
      <Box
        maxHeight="56px"
        px="12px"
        color="#fff"
        bgcolor="info.main"
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        gap="4px"
        >
        <Typography
          marginY="6px"
          padding="4px 24px"
          sx={{
            borderRadius: "2px",
            cursor: "pointer",
            ":hover": { border: "1px solid white" },
            ...(selectedTab==="overview" && {
              bgcolor: "grey.800"})
          }}
          onClick={() => {
            setSelectedTab("overview");
            navigate("");
          }}>
          Overview
        </Typography>
        <Typography
          marginY="6px"
          padding="4px 24px"
          sx={{
            borderRadius: "2px",
            cursor: "pointer",
            ":hover": { border: "1px solid white" },
            ...(selectedTab==="listings" && {
              bgcolor: "grey.800"})
          }}
          onClick={() => {
            setSelectedTab("listings");
            navigate("listings");
          }}>
          Listings
        </Typography>
        <Typography
          marginY="6px"
          padding="4px 24px"
          sx={{
            borderRadius: "2px",
            cursor: "pointer",
            ":hover": { border: "1px solid white" },
            ...(selectedTab==="orders" && {
              bgcolor: "grey.800"})
          }}
          onClick={() => {
            setSelectedTab("orders");
            navigate("orders");
          }}>
          Orders
        </Typography>
        <Typography
          marginY="6px"
          padding="4px 24px"
          sx={{
            borderRadius: "2px",
            cursor: "pointer",
            ":hover": { border: "1px solid white" },
            ...(selectedTab==="metrics" && {
              bgcolor: "grey.800"})
          }}
          onClick={() => {
            setSelectedTab("metrics");
            navigate("metrics");
          }}>
          Metrics
        </Typography>
      </Box>
      <Outlet />
    </Box>
  );
}

export default SellerPage;

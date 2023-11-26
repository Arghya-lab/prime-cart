import { Box, Typography } from "@mui/material";
import SellerHeader from "../Components/Header/SellerHeader";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function SellerPage() {
  const navigate = useNavigate();
  const location = useLocation()
  const [selectedTab, setSelectedTab] = useState("overview");

  useEffect(() => {
    const pathArr = location.pathname.split("/")
    const tabs = ["overview", "listings", "orders", "metrics"]
    if (tabs.includes(pathArr[pathArr.length-1])) {
      setSelectedTab(pathArr[pathArr.length-1])
    }
  }, [])
  

  return (
    <Box minHeight="100vh">
      <SellerHeader />
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

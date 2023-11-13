import { Box, Stack, Typography } from "@mui/material";
import Navbar from "../Components/Navbar";
import OrderProductWidget from "../Components/OrderProductWidget";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function OrdersPage() {
  const token = useSelector((state) => state.auth.token);
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/orders`, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      const json = await res.json();
      if (json.success) {
        console.log(json.data);
        setOrders(json.data);
      } else {
        console.log(json.error);
      }
    })();
  }, []);

  return (
    <Box>
      <Navbar />
      <Box width="920px" padding="16px" margin="auto">
        <Typography
          variant="h4"
          paddingBottom="16px"
          borderBottom="1.5px solid grey.400">
          Your Orders
        </Typography>
        <Stack gap="16px" marginY="36px">
          {orders ? (
            orders.map((order) => (
              <OrderProductWidget
              key={order._id}
              orderId={order._id}
              productId={order.productId}
              name={order.name}
              imgUrl={order.imgUrls[order.imgUrls.length-1]}
              quantity={order.quantity}
              totalPrice={order.totalPrice}
              orderPlacedTime={order.orderPlacedTime}
              />
            ))
          ) : (
            <Typography variant="h3">You have not shopping yet.</Typography>
          )}
        </Stack>
      </Box>
    </Box>
  );
}

export default OrdersPage;

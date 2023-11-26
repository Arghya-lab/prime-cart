import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Pagination,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Header from "../Components/Header";
import OrderProductWidget from "../Components/OrderProductWidget";
import Footer from "../Components/Footer";
import { setLoadingProgress } from "../features/additionalInfo/additionalInfoSlice";

function OrdersPage() {
  const smallScreen = useMediaQuery("(min-width:425px)");

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = decodeURIComponent(searchParams.get("page") || 1);
  const productLimit = decodeURIComponent(searchParams.get("limit") || 8);

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [orders, setOrders] = useState(null);
  const [totalResult, setTotalResult] = useState(0);

  useEffect(() => {
    (async () => {
      dispatch(setLoadingProgress(5));
      const res = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/orders?page=${currentPage}&limit=${productLimit}`,
        {
          method: "GET",
          headers: {
            Authorization: token,
          },
        }
      );
      dispatch(setLoadingProgress(50));
      const json = await res.json();
      dispatch(setLoadingProgress(85));
      if (json.success) {
        console.log(json.data);
        setOrders(json.data.products);
        setTotalResult(json.data.totalProducts);
      } else {
        console.log(json.error);
      }
      dispatch(setLoadingProgress(100));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handlePageChange = (event, page) => {
    setSearchParams({ page: page, limit: productLimit });
    window.scrollTo(0, 0);
  };

  return (
    <Box sx={{ overflowX: "hidden" }}>
      <Header />
      <Box maxWidth="920px" padding="16px" margin="auto">
        <Typography
          component="h3"
          variant={smallScreen ? "h1" : "h3"}
          paddingBottom="16px"
          borderBottom="1.5px solid"
          borderColor="grey.400">
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
                imgUrl={order.imgUrls[order.imgUrls.length - 1]}
                quantity={order.quantity}
                price={order.price}
                orderPlacedTime={order.orderPlacedTime}
              />
            ))
          ) : (
            <Typography variant="h3">You have not shopping yet.</Typography>
          )}
        </Stack>
        <Box display="flex" justifyContent="center" mt={2}>
          <Pagination
            count={Math.ceil(totalResult / productLimit)}
            siblingCount={1}
            variant="outlined"
            shape="rounded"
            onChange={handlePageChange}
            sx={{
              margin: "1rem 0",
            }}
          />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default OrdersPage;

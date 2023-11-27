import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  Paper,
  Pagination,
  Modal,
  Button,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import { setLoadingProgress } from "../features/additionalInfo/additionalInfoSlice";
import {
  setSellerOrders,
  setSellerOrderConfirm,
} from "../features/seller/sellerSlice";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey[900],
    color: theme.palette.common.white,
    fontSize: 16,
    border: "1px solid #FFF",
    textWrap: "nowrap",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

function SellerOrders() {
  const mediumScreen = useMediaQuery("(min-width:768px)");

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = decodeURIComponent(searchParams.get("page") || 1);
  const productLimit = decodeURIComponent(searchParams.get("limit") || 5);

  const [confirmOrderId, setConfirmOrderId] = useState("");
  const handleCloseModal = () => {
    setConfirmOrderId("");
  };

  const dispatch = useDispatch();
  const { sellerToken } = useSelector((state) => state.auth);

  const { sellerOrders } = useSelector((state) => state.seller);
  const [totalResult, setTotalResult] = useState(0);

  useEffect(() => {
    (async () => {
      dispatch(setLoadingProgress(5));
      const res = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/orders/seller?page=${currentPage}&limit=${productLimit}`,
        {
          method: "GET",
          headers: {
            "Seller-Authorization": sellerToken,
          },
        }
      );
      dispatch(setLoadingProgress(50));
      const json = await res.json();
      dispatch(setLoadingProgress(85));
      if (json.success) {
        console.log(json.data);
        dispatch(setSellerOrders(json.data.orders));
        setTotalResult(json.data.totalOrders);
      } else {
        console.log(json.error);
      }
      dispatch(setLoadingProgress(100));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleOrderConfirm = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/orders/confirm/${confirmOrderId}`,
      {
        method: "PATCH",
        headers: {
          "Seller-Authorization": sellerToken,
        },
      }
    );
    const json = await res.json();
    if (json.success) {
      console.log(json.data);
      dispatch(setSellerOrderConfirm(confirmOrderId));
      setConfirmOrderId("");
    } else {
      console.log(json.error);
    }
  };

  const handlePageChange = (event, page) => {
    setSearchParams({ page: page, limit: productLimit });
    window.scrollTo(0, 0);
  };

  return (
    <Box maxWidth="1440px" margin="auto">
      <Typography
        component="h6"
        variant="h1"
        marginX="24px"
        marginTop="36px"
        marginBottom={mediumScreen ? "36px" : "20px"}
        borderBottom="2px solid #DDD">
        orders
      </Typography>
      <Box sx={{ overflowX: "scroll", margin: "0 24px" }}>
        <TableContainer component={Paper} sx={{ minWidth: "1344px" }}>
          <Table aria-label="listing table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="right">Img</StyledTableCell>
                <StyledTableCell align="right">Name</StyledTableCell>
                <StyledTableCell align="right">Sold price</StyledTableCell>
                <StyledTableCell align="right">Delivery charge</StyledTableCell>
                <StyledTableCell align="right">
                  Order placed time
                </StyledTableCell>
                <StyledTableCell align="right">Payment type</StyledTableCell>
                <StyledTableCell align="right">Quantity</StyledTableCell>
                <StyledTableCell align="right">Status</StyledTableCell>
                <StyledTableCell align="right">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sellerOrders.map((row) => (
                <TableRow key={row._id}>
                  <StyledTableCell>
                    <img
                      /* img url */
                      src={`${
                        import.meta.env.VITE_IMG_BASE_URL
                      }/assets/productImgs/${
                        row.product.imgUrls[row.product.imgUrls.length - 1]
                      }`}
                      height="70px"
                      width="70px"
                    />
                  </StyledTableCell>
                  <StyledTableCell
                    align="left"
                    sx={{
                      color: "success.light",
                      // fontWeight: 600,
                    }}>
                    {row.product.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.price.productPrice}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.price.deliveryCharge}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.orderPlacedTime}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.paymentType}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.quantity}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.status}</StyledTableCell>
                  {row.status === "processing" ? (
                    <StyledTableCell
                      align="center"
                      sx={{
                        color: "secondary.main",
                        cursor: "pointer",
                        textDecoration: "underline",
                        ":hover": {
                          color: "success.dark",
                        },
                      }}
                      onClick={() => setConfirmOrderId(row._id)}>
                      confirm
                    </StyledTableCell>
                  ) : (
                    <StyledTableCell align="center">-</StyledTableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Modal open={Boolean(confirmOrderId)} onClose={handleCloseModal}>
        <Box
          border="2px solid white"
          position="absolute"
          top="50%"
          left="50%"
          width="400px"
          bgcolor="#fff"
          borderRadius="8px"
          boxShadow={24}
          p="16px 32px 24px"
          sx={{
            transform: "translate(-50%, -50%)",
          }}>
          <Typography variant="h4" component="p" mb="36px">
            If your packaging is done for the product then click on confirm.
          </Typography>
          <Box display="flex" justifyContent="end" gap="8px">
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={handleOrderConfirm}>
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
      {totalResult > sellerOrders.length && (
        <Box
          display="flex"
          justifyContent="center"
          mt="1rem"
          marginBottom="24px">
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
      )}
    </Box>
  );
}

export default SellerOrders;

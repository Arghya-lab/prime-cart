import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Pagination,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import { setLoadingProgress } from "../features/additionalInfo/additionalInfoSlice";
import {
  setProductUpdateValue,
  setSellerListings,
} from "../features/seller/sellerSlice";
import { enqueueSnackbar } from "notistack";

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

function SellerListings() {
  const mediumScreen = useMediaQuery("(min-width:768px)");

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = decodeURIComponent(searchParams.get("page") || 1);
  const productLimit = decodeURIComponent(searchParams.get("limit") || 6);

  const dispatch = useDispatch();
  const { sellerToken } = useSelector((state) => state.auth);

  const { sellerListings } = useSelector((state) => state.seller);
  const [totalResult, setTotalResult] = useState(0);

  useEffect(() => {
    (async () => {
      dispatch(setLoadingProgress(5));
      const res = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/products/seller?page=${currentPage}&limit=${productLimit}`,
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
        dispatch(setSellerListings(json.data.products));
        setTotalResult(json.data.totalProducts);
      } else {
        enqueueSnackbar(json.error, { variant: "error" });
      }
      dispatch(setLoadingProgress(100));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleEdit = async (id) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/products/${id}`
    );
    const json = await res.json();
    if (json.success) {
      console.log(json.data);
      dispatch(setProductUpdateValue(json.data));
      navigate("/editProduct");
    } else {
      enqueueSnackbar(json.error, { variant: "error" });
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
        Listings
      </Typography>
      <Box sx={{ overflowX: "scroll", margin: "0 24px" }}>
        <TableContainer component={Paper} sx={{ minWidth: "1344px" }}>
          <Table aria-label="listing table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="right">Img</StyledTableCell>
                <StyledTableCell align="right">Name</StyledTableCell>
                <StyledTableCell align="right">Category</StyledTableCell>
                <StyledTableCell align="right">Selling</StyledTableCell>
                <StyledTableCell align="right">MRP</StyledTableCell>
                <StyledTableCell align="right">Stock</StyledTableCell>
                <StyledTableCell align="right">Rating</StyledTableCell>
                <StyledTableCell align="right">Rating Count</StyledTableCell>
                <StyledTableCell align="right">Action</StyledTableCell>
                <StyledTableCell align="right">Listing Date</StyledTableCell>
                <StyledTableCell align="right">Last Edited</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sellerListings.map((row) => (
                <TableRow key={row._id}>
                  <StyledTableCell>
                    <img
                      /* img url */
                      src={`${
                        import.meta.env.VITE_IMG_BASE_URL
                      }/assets/productImgs/${
                        row.imgUrls[row.imgUrls.length - 1]
                      }`}
                      height="70px"
                      width="70px"
                    />
                  </StyledTableCell>
                  <StyledTableCell
                    align="left"
                    sx={{
                      color: "success.light",
                      fontWeight: 600,
                    }}>
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.category
                      .replace(/([a-z])([A-Z])/g, "$1 $2")
                      .replace(/^\w/, (c) => c.toUpperCase())}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.price.selling}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.price.mrp}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.stock}</StyledTableCell>
                  <StyledTableCell align="right">{row.rating}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.ratingCount}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{
                      color: "secondary.main",
                      cursor: "pointer",
                      ":hover": {
                        color: "success.dark",
                        textDecoration: "underline",
                      },
                    }}
                    onClick={() => handleEdit(row._id)}>
                    edit listing
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.createdAt}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.updatedAt}
                  </StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {totalResult > sellerListings.length && (
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
      )}
    </Box>
  );
}

export default SellerListings;

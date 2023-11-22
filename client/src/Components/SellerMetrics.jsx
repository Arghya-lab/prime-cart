import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Paper, Typography } from "@mui/material";
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  setOrdersStatusCount,
  setSalesAndRevenue,
} from "../features/seller/sellerSlice";
import { enqueueSnackbar } from "notistack";

function SellerMetrics() {
  const dispatch = useDispatch();
  const sellerToken = useSelector((state) => state.auth.sellerToken);
  const { salesAndRevenue } = useSelector((state) => state.seller);

  ChartJS.register(
    ArcElement,
    Tooltip,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/orders/statistics`,
        {
          method: "GET",
          headers: {
            "Seller-Authorization": sellerToken,
          },
        }
      );
      const json = await res.json();
      if (json.success) {
        console.log(json.data);
        dispatch(setOrdersStatusCount(json.data.ordersStatusCount));
        dispatch(setSalesAndRevenue(json.data.salesAndRevenue));
      } else {
        enqueueSnackbar(json.error, { variant: "error" });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pieData = {
    labels: Object.keys(salesAndRevenue).map((key) => {
      const name = salesAndRevenue[key].product.name;
      if (name.length > 25) {
        return name.substring(0, 24) + "...";
      }
      return name;
    }),
    datasets: [
      {
        label: "Revenue",
        data: Object.keys(salesAndRevenue).map(
          (key) => salesAndRevenue[key].totalRevenue
        ),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
      },
    ],
  };

  const barData = {
    labels: Object.keys(salesAndRevenue).map((key) => {
      const name = salesAndRevenue[key].product.name;
      if (name.length > 25) {
        return name.substring(0, 24) + "...";
      }
      return name;
    }),
    datasets: [
      {
        label: "Total sold",
        data: Object.keys(salesAndRevenue).map(
          (key) => salesAndRevenue[key].totalSalesNo
        ),
        backgroundColor: ["rgba(54, 162, 235, 0.5)"],
      },
      {
        label: "Total cancel",
        data: Object.keys(salesAndRevenue).map(
          (key) => salesAndRevenue[key].totalCanceled
        ),
        backgroundColor: ["rgba(255, 62, 35, 0.5)"],
      },
    ],
  };

  return (
    <Box display="flex" flexWrap="wrap">
      <Box margin="1.5rem">
        <Typography
          component="h6"
          variant="h2"
          margin="5rem 18px 36px"
          borderBottom="2px solid #DDD">
          Total sales
        </Typography>
        <Paper
          sx={{
            maxWidth: "460px",
            padding: "1rem"
          }}>
        <Doughnut data={pieData} />
      </Paper>
      </Box>
      <Box margin="1.5rem">
        <Typography
          component="h6"
          variant="h2"
          margin="5rem 18px 36px"
          borderBottom="2px solid #DDD">
          Total sold & cancel
        </Typography>
        <Paper
          sx={{
            maxWidth: "680px",
            padding: "1rem"
          }}>
          <Bar
            options={{
              indexAxis: "y", // Change if the bars are horizontal
              scales: {
                y: {
                  ticks: {
                    beginAtZero: true,
                    stepSize: 1, // Forces only integer values
                  },
                },
              },
              barThickness: 30, // Adjust the width of the bars
            }}
            data={barData}
          />
        </Paper>
      </Box>
    </Box>
  );
}

export default SellerMetrics;

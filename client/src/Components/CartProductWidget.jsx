import { Box, Divider, Stack, Typography } from "@mui/material";

function CartProductWidget() {
  return (
    <Box
      padding="12px 0 12px 12px"
      sx={{
        borderBottom: "1px solid #DDD",
        color: "#0F1111",
      }}>
      <Stack direction="row">
        <Box>
          <img
            /* img url */
            src="https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            height="180px"
            width="180px"
            style={{ margin: "0 12px" }}
          />
        </Box>
        <Box
          sx={{
            width: "100%",
          }}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6">
              Kraasa Sneakers for Men White UK 8
            </Typography>
            <Box>
            <Typography
                component="span"
                variant="caption"
                sx={{ position: "relative", top: "-0.3em", fontWeight: 600 }}>
                ₹
              </Typography>
              <Typography component="span" variant="h6" sx={{ fontWeight: 600 }}>
                {/* selling price */}
                {/* {price.selling} */}
                349.00
              </Typography>
            </Box>
          </Box>
          <Typography
            variant="caption"
            sx={{
              color: "#007600",
              fontWeight: 600,
            }}>
            In stock
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              color: "#CC0C39",
            }}>
            Deal
          </Typography>
          <Typography
            component="span"
            variant="caption"
            sx={{
              fontWeight: 600,
              color: "white",
              backgroundColor: "#CC0C39",
              padding: "4px 6px 4px 6px",
              borderRadius: "4px",
            }}>
            {/* MRP-selling % */}
            {/* {(((price.mrp - price.selling) / price.mrp) * 100).toFixed(0)} */}
            76%&nbsp;off
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              color: "#565959",
            }}>
            Eligible for FREE Shipping
          </Typography>
          <Box>
            <Typography
              component="span"
              variant="body2"
              sx={{ color: "#565959" }}>
              M.R.P.:&nbsp;
            </Typography>
            <Typography
              component="span"
              variant="body2"
              sx={{ color: "#565959", textDecoration: "line-through" }}>
              {/* MRP */}
              Rs.499.00
              {/* Rs.{price.mrp} */}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "fit-content",
              borderRadius: 1,
              "& svg": {
                m: 1.5,
              },
              "& hr": {
                mx: 0.5,
              },
              gap: "8px",
            }}>
            <span
              style={{
                border: "1px solid #D5D9D9",
                borderRadius: "8px",
                backgroundColor: "#F0F2F2",
                boxShadow: "0 2px 5px 0 rgba(213,217,217,.5)",
                padding: "3px",
              }}>
              <span>Qty:</span>
              <select
                style={{
                  cursor: "pointer",
                  borderColor: "transparent",
                  background: "transparent",
                  fontSize: "16px",
                  lineHeight: "29px",
                }}
                name="quantity"
                id="quantity">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </span>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Typography
              variant="body2"
              sx={{
                color: "#007185",
                cursor: "pointer",
                ":hover": { color: "#C7511F", textDecoration: "underline" },
              }}>
              Delete
            </Typography>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Typography
              variant="body2"
              sx={{
                color: "#007185",
                cursor: "pointer",
                ":hover": { color: "#C7511F", textDecoration: "underline" },
              }}>
              Share
            </Typography>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}

export default CartProductWidget;

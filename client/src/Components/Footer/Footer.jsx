import { Box, Grid, Link, List, ListItem, Typography } from "@mui/material";
import { topNavData, btmNavData } from "./data";

function Footer() {
  return (
    <Box>
      <Box
        sx={{
          background: "#37475a",
          color: "white",
          cursor: "pointer",
          width: "100%",
          height: "50px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={() => {
          window.scrollTo(0, 0);
        }}>
        Back to top
      </Box>
      <Box sx={{ bgcolor: "#232f3e" }}>
        <Box
          sx={{
            width: "100%",
            maxWidth: "1000px",
            display: "flex",
            justifyContent: "space-between",
            padding: "1.25rem",
            gap: "1rem",
            m: "auto",
          }}>
          {btmNavData.map((elem, index) => (
            <Grid
              item
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "0.25rem",
              }}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{
                  fontWeight: "700",
                  color: "#FFF",
                  fontSize: "16px",
                  margin: "6px 0 14px 0",
                  whiteSpace: "nowrap",
                  lineHeight: "120%",
                }}>
                {elem.menu}
              </Typography>
              <List sx={{ listStyleType: "none", padding: 0 }}>
                {elem.subOption.map((e, i) => (
                  <ListItem
                    key={i}
                    sx={{
                      padding: "10px 0 0",
                    }}>
                    <Link
                      href={e.redirect}
                      sx={{
                        color: "#DDD",
                        textDecoration: "none",
                        whiteSpace: "normal",
                        cursor: "pointer",
                        listStyleType: "none",
                        wordWrap: "break-word",
                        lineHeight: "120%",
                        fontSize: "14px",
                        ":hover": { textDecoration: "underline" },
                      }}
                      target="_blank" // Enable this if needed
                      rel="noreferrer" // Enable this if needed
                    >
                      {e.title}
                    </Link>
                  </ListItem>
                ))}
              </List>
            </Grid>
          ))}
        </Box>
        <Box
          sx={{
            borderTop: "1px solid #3a4553",
            marginTop: "40px",
            display: "block",
            height: "1px",
          }}></Box>
        <Box sx={{ height: "68px" }}></Box>
      </Box>
      <Box sx={{ bgcolor: "#131a22" }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            maxWidth: "1000px",
            m: "0 auto",
            p: "1rem",
          }}>
          {topNavData.map((info, index) => (
            <Box
              component="span"
              key={index}
              sx={{ width: "115px", p: "10px" }}>
              <Typography
                sx={{
                  color: "#ddd",
                  textAlign: "left",
                  lineHeight: "115%",
                  fontSize: "12px",
                  fontWeight: "600",
                  ":hover": { textDecoration: "underline" },
                }}>
                {info.title}
              </Typography>
              <Typography
                sx={{
                  fontSize: "13px",
                  color: "#999",
                  ":hover": { textDecoration: "underline" },
                }}>
                {info.description}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            fontSize: "12px",
            padding: "10px 0 30px",
            textAlign: "center",
            color: "#DDD",
            lineHeight: "18px",
            whiteSpace: "nowrap",
            width: "auto",
          }}>
          <List
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              margin: "0 0 0 18px",
              padding: 0, // Reset default padding for ul
              listStyleType: "none", // Remove default bullet points
            }}>
            <ListItem
              sx={{
                width: "auto",
                textDecoration: "none",
                padding: "0 0.6em",
                cursor: "pointer",
                wordWrap: "break-word",
                ":hover": { textDecoration: "underline" },
              }}>
              <Typography variant="body2">Conditions of Use</Typography>
            </ListItem>
            <ListItem
              sx={{
                width: "auto",
                textDecoration: "none",
                padding: "0 0.6em",
                cursor: "pointer",
                wordWrap: "break-word",
                ":hover": { textDecoration: "underline" },
              }}>
              <Typography variant="body2">Privacy Notice</Typography>
            </ListItem>
            <ListItem
              sx={{
                width: "auto",
                textDecoration: "none",
                padding: "0 0.6em",
                cursor: "pointer",
                wordWrap: "break-word",
                ":hover": { textDecoration: "underline" },
              }}>
              <Typography variant="body2">Your Ads Privacy Choices</Typography>
            </ListItem>
          </List>
          <Typography variant="body2">
            © 2023, Prime Cart, Inc. or its affiliates
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;

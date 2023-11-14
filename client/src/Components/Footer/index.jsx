import { Box, Grid, Link, List, ListItem, Typography } from "@mui/material";
import { topNavData, btmNavData } from "./data";

function Footer() {
  return (
    <Box>
      <Box
        bgcolor="info.light"
        sx={{
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
        <Typography variant="subtitle2" color="#fff">
          Back to top
        </Typography>
      </Box>
      <Box bgcolor="info.main">
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
                variant="h5"
                color="#fff"
                fontWeight={700}
                lineHeight="120%"
                margin="6px 0 14px 0"
                whiteSpace="nowrap">
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
                      color="grey.500"
                      sx={{
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
          borderTop="1px solid #3a4553"
          marginTop="40px"
          display="block"
          height="1px"
        />
        <Box height="68px" />
      </Box>
      <Box sx={{ bgcolor: "info.dark" }}>
        <Box
          display="grid"
          gridTemplateColumns="repeat(7, 1fr)"
          maxWidth="1000px"
          margin="0 auto"
          padding="1rem">
          {topNavData.map((info, index) => (
            <Box component="span" key={index} width="115px" padding="10px">
              <Typography
                variant="caption"
                color="grey.500"
                textAlign="left"
                lineHeight="115%"
                fontWeight="600"
                sx={{
                  cursor: "pointer",
                  ":hover": { textDecoration: "underline" },
                }}>
                {info.title}
              </Typography>
              <Typography
                variant="subtitle2"
                color="grey.700"
                sx={{
                  cursor: "pointer",
                  ":hover": { textDecoration: "underline" },
                }}>
                {info.description}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box
          padding="10px 0 30px"
          textAlign="center"
          color="grey.500"
          lineHeight="18px"
          whiteSpace="nowrap"
          width="auto">
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
              <Typography variant="caption" fontWeight={600}>
                Conditions of Use
              </Typography>
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
              <Typography variant="caption" fontWeight={600}>
                Privacy Notice
              </Typography>
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
              <Typography variant="caption" fontWeight={600}>
                Your Ads Privacy Choices
              </Typography>
            </ListItem>
          </List>
          <Typography variant="caption" fontWeight={600}>
            © 2023, Prime Cart, Inc. or its affiliates
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;

import { Link } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";
import { HelpOutline } from "@mui/icons-material";

function NotfoundPage() {
  return (
    <Stack alignItems="center">
      <img
        src="http://localhost:5173/logo/logo-black-220px.png"
        style={{
          width: "160px",
          margin: "0.7rem 0 0.7rem 1rem",
        }}
      />
      <Box display="flex" alignItems="center" gap="0.75rem">
        <HelpOutline
          sx={{
            width: "48px",
            height: "48px",
            color: "secondary.dark",
          }}
        />
        <Box marginTop="1.5rem">
          <Typography
            component="p"
            variant="h3"
            fontWeight={600}
            color="secondary.dark">
            Looking for something?
          </Typography>
          <Typography component="p" variant="h5" paragraph>
            We&apos;re sorry. The Web address you entered is not a functioning
            page on our site.
          </Typography>
          <Typography component="p" variant="h4" fontWeight={600}>
            Go to Prime Cart&apos;s&nbsp;<Link to={"/"}>Home</Link>&nbsp;Page
          </Typography>
        </Box>
      </Box>
    </Stack>
  );
}

export default NotfoundPage;

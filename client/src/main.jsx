import React from "react";
import ReactDOM from "react-dom/client";
import store from "../src/app/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme.js";
import { SnackbarProvider } from "notistack";
import App from "./App.jsx";
import "./index.css";

const theme = createTheme(themeSettings);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <SnackbarProvider
            maxSnack={2.5}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}>
            <App />
          </SnackbarProvider>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

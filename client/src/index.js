import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import "./custom.scss";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { SharedContextProvider } from "./context/sharedContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="917455284169-qf400eiglbct0l92th49d7rfku4qb6q8.apps.googleusercontent.com">
      <BrowserRouter>
        <SharedContextProvider>
          <App />
        </SharedContextProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

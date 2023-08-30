import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.js";
import { BrowserRouter as Router } from "react-router-dom";
import { UserContextProvider } from "./context/userContext.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <UserContextProvider>
        <Router>
            <App />
        </Router>
    </UserContextProvider>
);

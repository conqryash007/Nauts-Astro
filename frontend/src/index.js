import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { chains } from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";

const config = {
  projectId: "6ea112bb251f26bee4cf7a5764cd3c63",
  theme: "light",
  accentColor: "default",

  ethereum: {
    appName: "web3Modal",
    autoConnect: true,
    chains: [chains.polygonMumbai],
  },
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
    {/* <Web3Modal config={config} /> */}
  </BrowserRouter>
);

reportWebVitals();

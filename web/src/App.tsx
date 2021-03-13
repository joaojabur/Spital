import React from "react";
import Router from "./routes/Router";

import DataProvider from "./context/DataProvider";
import "./assets/styles/global.css";

function App() {
  return (
    <DataProvider>
      <Router />
    </DataProvider>
  );
}

export default App;

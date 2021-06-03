import React from "react";
import Router from "./routes/Router";

import AuthProvider from "./context/AuthProvider";
import "./assets/styles/global.css";
import ModalProvider from "./context/ModalProvider";

function App() {
  return (
    <ModalProvider>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </ModalProvider>
  );
}

export default App;

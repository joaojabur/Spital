import React, { useEffect } from "react";
import Router from "./routes/Router";

import AuthProvider from "./context/AuthProvider";
import "./assets/styles/global.css";
import ModalProvider from "./context/ModalProvider";
import Aos from "aos";
import "aos/dist/aos.css";

function App() {
  useEffect(() => {
    Aos.init({
      duration: 1200,
    });
  }, []);

  return (
    <ModalProvider>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </ModalProvider>
  );
}

export default App;

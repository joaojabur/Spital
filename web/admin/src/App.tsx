import React, { useEffect } from "react";
import "./assets/styles/global.css";
import Router from "./routes/Router";
import Aos from "aos";
import "aos/dist/aos.css";

function App() {
  useEffect(() => {
    Aos.init({
      duration: 1200,
    });
  }, []);
  return <Router />;
}

export default App;

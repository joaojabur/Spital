import Router from "./routes/Router";

import AuthProvider from "./context/AuthProvider";
import "./assets/styles/global.css";

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export default App;

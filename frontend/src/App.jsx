import { useContext } from "react";
import { GlobalContext } from "./components/GlobalContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashbord from "./pages/Dashbord";

function App() {
  const { route } = useContext(GlobalContext);

  if (route === "login") {
    return <Login />;
  }

  if (route === "register") {
    return <Register />;
  }

  if (route === "dashboard") {
    return <Dashbord />;
  }

  return <Home />;
}

export default App;

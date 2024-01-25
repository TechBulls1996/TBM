import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ROUTES from "./routes/index";
import "./assets/css/Theme.css";
import "./assets/css/App.css";
import "./assets/css/Font.css";

const router = createBrowserRouter(ROUTES);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

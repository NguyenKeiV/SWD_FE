import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../components/Login/Login";
import RegisterPage from "../components/Register/Register"; // Assuming you have a Register component

const AppRouter = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> }, // Assuming RegisterPage is the same component as LoginPage

]);

export default AppRouter;

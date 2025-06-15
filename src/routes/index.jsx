import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../components/Login/Login";
import RegisterPage from "../components/Register/Register";
import AdmissionForm from "../components/AdmissionForm/AdmissionForm";


const AppRouter = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/admission-form", element: <AdmissionForm /> },

]);

export default AppRouter;

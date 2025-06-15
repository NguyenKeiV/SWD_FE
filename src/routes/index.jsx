import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../components/Login/Login";
import RegisterPage from "../components/Register/Register";
import AdmissionForm from "../components/AdmissionForm/AdmissionForm";
import ProfileResearch from "../components/ProfileResearch/ProfileResearch";

const AppRouter = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/admission-form", element: <AdmissionForm /> },
  { path: "/lookup-profile", element: <ProfileResearch /> },

]);

export default AppRouter;

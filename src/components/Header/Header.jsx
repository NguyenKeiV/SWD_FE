import React from "react";
import { IMAGES } from "../../constants/images";
import text from "../../constants/resources.json";
import searchIcon from "../../assets/search.svg";
import vnFlag from "../../assets/Flag_of_Vietnam.svg.png";
import enFlag from "../../assets/Flag_of_US.png";
import Toolbar from "./Toolbar";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import LoadingPage from "../LoadingPage/LoadingPage";


const Header = () => {


  const [loading, setLoading] = React.useState(false);
  
  const navigate = useNavigate();

  const handleNavigateWithLoading = (path) => {
    setLoading(true);
   
    setTimeout(() => {
      setLoading(false);
      navigate(path);
    }, 1500);
  };


  return (
    <div className="w-full">
      {loading && <LoadingPage />}
      {/* Header top */}
      <div className="flex justify-evenly items-center px-4 py-2">
        {/* Logo */}
        <img src={IMAGES.LOGO} alt="logo" className="w-32 md:w-[12%] h-auto" />
        <div className="hidden md:flex">
          <div className="flex border border-gray-500">
            <input
              type="text"
              placeholder={text.timkiem}
              className="w-64 p-1 border border-gray-300 rounded-md m-1"
            />
            <button className="w-14 bg-orange-600 rounded-md m-1 flex items-center justify-center">
              <img src={searchIcon} alt="" />
            </button>
          </div>
          <button
            className="w-10 h-10 rounded-full ml-2 border border-gray-300 bg-cover bg-center"
            style={{ backgroundImage: `url(${vnFlag})` }}
            aria-label="Vietnamese"
          />
          <button
            className="w-10 h-10 rounded-full ml-2 border border-gray-300 bg-cover bg-center"
            style={{ backgroundImage: `url(${enFlag})` }}
            aria-label="English"
          />
          <div className="flex">
            <Button
              to="/login"
              className="ml-10 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 font-normal"
              onClick={() => handleNavigateWithLoading("/login")}
            >
              {text.Login}
            </Button>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <Toolbar />
    </div>
  );
};

export default Header;

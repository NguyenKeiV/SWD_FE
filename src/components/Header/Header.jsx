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
      <div className="flex justify-between items-center px-4 py-2">
        {/* Logo */}
        <img src= {IMAGES.STAR}
          alt="logo" className="md:w-[12%] h-auto contrast-more:100 saturate-150 brightness-100" />
        <img src={IMAGES.LOGO} alt="logo" 
        className="md:w-[17%] h-auto ml-32 contrast-more:90 saturate-150 brightness-100" />

        <div className="hidden md:flex">
          <div className="flex justify-end ml-20">
            <Button
              className="px-4 py-4 bg-orange-600 text-white rounded-md hover:bg-orange-700 font-mono text-sm "
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

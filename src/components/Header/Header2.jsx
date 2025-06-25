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
import Toolbar2 from "./Toolbar2";

const Header2 = () => {


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
                <img src='https://caohoc.fpt.edu.vn/wp-content/uploads/2023/08/logo-qs-star-2012.png'
                    alt="logo" className="w-20 md:w-[8%] h-auto contrast-more:100 saturate-150 brightness-100" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/FPT_logo_2010.svg/1200px-FPT_logo_2010.svg.png"
                 alt="logo" className="w-24 h-auto ml-72 contrast-more:100 saturate-200 brightness-100" />

                <img src={IMAGES.LOGO} alt="logo" className="w-32 md:w-[15%] h-auto ml-52 contrast-more:90 saturate-150 brightness-100" />
            </div>

            {/* Toolbar */}
            <Toolbar2 />
        </div>
    );
};

export default Header2;

import React from "react";
import banner from "../../assets/Banner.png";
import text from "../../constants/resources.json";
const Banner = () => {
  return (
    <div className="relative">
      <img src={banner} alt="" className="w-full h-auto" />
      <button className="absolute top-[81%] left-[26%] transform -translate-x-1/2 -translate-y-1/2 bg-orange-500 text-white font-bold text-2xl w-[17%] h-[8%] rounded-3xl border border-white hover:bg-orange-700">
        {text.DangKyNgay}
      </button>
    </div>
  );
};

export default Banner;

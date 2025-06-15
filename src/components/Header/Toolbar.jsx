import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // Hoặc dùng react-icons nếu thích
import text from "../../constants/resources.json";
import { Link } from "react-router-dom"
const Toolbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const menuItems = [
    text.TrangChu,
    text.GioiThieu,
    text.TinTuc,
    text.NganhHoc,
    text.TuyenSinh,
    text.LienHe,
    text.DangKyXetTuyen,
    text.TraCuu
  ];

  return (
    <div className="w-full mt-2 bg-orange-600">
      {/* Desktop Toolbar */}
      <div className="hidden md:flex justify-center gap-3 w-full h-auto">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className="h-full text-white font-medium p-4 hover:text-black hover:underline hover:bg-orange-700"
          >
            {item === text.DangKyXetTuyen ? (
              <Link to="/admission-form" className="text-white">
                {item}
              </Link>
            ) : item === text.TraCuuHoSo ? (
              <Link to="/lookup-profile" className="text-white">
                {item}
              </Link>
            ) : (
              item
            )}

          </button>
        ))}
      </div>
    </div>
  );
};

export default Toolbar;

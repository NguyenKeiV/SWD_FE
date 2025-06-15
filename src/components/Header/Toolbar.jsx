import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // Hoặc dùng react-icons nếu thích
import text from "../../constants/resources.json";
import { Link } from "react-router-dom"
const Toolbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const [showRegisterOptions, setShowRegisterOptions] = useState(false); // Quản lý hiển thị menu đăng ký xét tuyển


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
              <div className="relative inline-block">
                <button
                  className="text-white"
                  onClick={() => setShowRegisterOptions((prev) => !prev)} // Hàm xử lý sự kiện click
                  
                >
                  {item}
                </button>
                {showRegisterOptions && (
                  <div className="absolute right-(-1) mt-2 w-42 bg-white rounded-lg shadow-lg z-10">
                    <Link
                      to="/consulting"
                      className="block px-4 py-3 hover:bg-orange-400 text-gray-700 border-b border-gray-100 font-mono whitespace-nowrap"
                      onClick={() => setShowRegisterOptions(false)}
                    >
                      Đăng ký Tư Vấn
                    </Link>
                    <Link
                      to="/admission-form"
                      className="block px-4  py-3 hover:bg-orange-400 text-gray-700 font-mono whitespace-nowrap"
                      onClick={() => setShowRegisterOptions(false)}
                    >
                      Đăng Ký Xét Tuyển
                    </Link>
                  </div>
                )}
              </div>
            ) : item === text.TraCuu ? (
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

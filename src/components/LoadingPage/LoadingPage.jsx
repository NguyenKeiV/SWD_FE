import React from "react";

const LoadingPage = () => (
  <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-blue-50 bg-or">
    {/* Logo FPT Education */}
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/FPT_Education_logo.svg/2560px-FPT_Education_logo.svg.png"
      alt="FPT Education Logo"
      className="h-16 mb-6 animate-pulse"
    />
    {/* Spinner */}
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      <span className="text-xl font-semibold text-orange-600 font-sans animate-pulse">
        Đang chuyển trang...
      </span>
    </div>
    <p className="mt-4 text-gray-500 text-sm">FPT University - Hành trình tri thức</p>
  </div>
);

export default LoadingPage;
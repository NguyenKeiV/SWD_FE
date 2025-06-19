import React, { useState, useEffect } from "react";

const ScrollToTopButton = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 200); // cho hiển thị nút khi cuộn xuống quá 200px
    };
    window.addEventListener("scroll", handleScroll); 
    return () => window.removeEventListener("scroll", handleScroll); 
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return show ? (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 bg-orange-500 text-white px-5 py-3 rounded-full shadow-lg hover:bg-orange-600 transition-all flex items-center font-semibold"
      aria-label="Scroll to top"
    >
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
      ĐẦU TRANG
    </button>
  ) : null;
};

export default ScrollToTopButton;
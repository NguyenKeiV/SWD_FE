import React, { useState } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [showSuccess, setShowSuccess] = useState(false);

    const handleRegister = (e) => {
        e.preventDefault();
        let newErrors = {};
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!username) newErrors.username = "Please fill out this field";
        if (!email) newErrors.email = "Please fill out this field";
        else if (!emailRegex.test(email)) newErrors.email = "Please enter a valid email address";
       
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
        // Gửi API đăng ký tại đây nếu cần
    };

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-orange-50">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-100 contrast-150 saturate-200"
                style={{
                    backgroundImage: `url('https://vinaconex25.com.vn/wp-content/uploads/2020/06/1.jpg')`
                }}
            />

            {showSuccess && (
                <div className="fixed top-6 right-6 z-50">
                    <div className="flex items-center px-6 py-3 bg-green-500 text-white rounded-lg shadow-lg animate-fade-in-down">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        Tạo tài khoản thành công!
                    </div>
                </div>
            )}
            {/* Login Form Container */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-sm bg-opacity-95 w-full max-w-lg mx-auto">
                {/* Logo Section */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                        <div className="flex space-x-1">
                            <div className="w-8 h-8 bg-blue-600 rounded-sm flex items-center justify-center">
                                <span className="text-white font-bold text-sm">F</span>
                            </div>
                            <div className="w-8 h-8 bg-orange-500 rounded-sm flex items-center justify-center">
                                <span className="text-white font-bold text-sm">P</span>
                            </div>
                            <div className="w-8 h-8 bg-green-500 rounded-sm flex items-center justify-center">
                                <span className="text-white font-bold text-sm">T</span>
                            </div>
                        </div>
                        <span className="ml-2 text-blue-600 font-semibold">Education</span>
                    </div>
                    <h1 className="text-2xl font-bold text-orange-500 mb-2">TRƯỜNG ĐẠI HỌC FPT</h1>
                </div>
                <form className="space-y-6" onSubmit={handleRegister}>
                    {/* Username */}
                    <div>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 text-gray-700"
                            placeholder="Username"

                        />
                        {errors.username && (
                            <div className="mt-2 text-red-500 text-sm flex items-center font-serif">
                                <AlertCircle size={16} className="mr-1" />
                                {errors.username}
                            </div>
                        )}
                    </div>
                    {/* Email */}
                    <div>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 text-gray-700"
                            placeholder="Email"

                        />
                        {errors.email && (
                            <div className="mt-2 text-red-500 text-sm flex items-center font-serif">
                                <AlertCircle size={16} className="mr-1" />
                                {errors.email}
                            </div>
                        )}
                    </div>
                    {/* Password */}
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 text-gray-700 pr-12"
                            placeholder="Mật khẩu"

                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors flex items-center justify-center"
                            style={{ pointerEvents: "auto" }} // Đảm bảo nút luôn ở vị trí này
                            tabIndex={-1} // Không bị focus khi tab qua lỗi
                        >
                            {showPassword ? <EyeOff size={20} flex items-center justify-center /> : <Eye size={20} flex items-center justify-center />}
                        </button>
                        {errors.password && (
                            <div className="text-red-500 text-sm flex items-center font-serif absolute left-0 w-full mt-auto">
                                <AlertCircle size={16} className="mr-1" />
                                {errors.password}
                            </div>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 bg-orange-500 hover:bg-orange-600 active:scale-95 shadow-lg hover:shadow-xl"
                    >
                        Create Account
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
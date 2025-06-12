import React, { useState } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import axios from 'axios';
const LoginPage = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [showSuccess, setShowSuccess] = useState(false); // Thêm state cho toast


    // const handleLogin = async (e) => {
    //     e.preventDefault();
    //     let newErrors = {};
    //     // xác thực email hợp lệ
    //     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    //     if (!username && !password) {
    //         newErrors.password = "Please fill out this field";
    //         newErrors.username = "Please fill out this field";
    //     } else if (!username) {
    //         newErrors.username = "Please fill out this field";
    //     } else if (!password) {
    //         newErrors.password = "Please fill out this field";;
    //     } else if (!emailRegex.test(username)) {
    //         newErrors.username = "Please enter a valid email address";
    //     }

    //     setErrors(newErrors);

    //     if (Object.keys(newErrors).length > 0) {
    //         setIsLoading(false);
    //         return;
    //     }

    //     setIsLoading(true);

    //     // Hiển thị toast notification
    //     setTimeout(() => {
    //         setIsLoading(false); // Giả lập quá trình đăng nhập thành công
    //         setShowSuccess(true);
    //         setTimeout(() => setShowSuccess(false), 3000); // 3s tự ẩn
    //     }, 1500);
    // };

    const handleLogin = async (e) => {
        e.preventDefault();
        let newErrors = {};
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!username && !password) {
            newErrors.password = "Please fill out this field";
            newErrors.username = "Please fill out this field";
        } else if (!username) {
            newErrors.username = "Please fill out this field";
        } else if (!password) {
            newErrors.password = "Please fill out this field";
        } else if (!emailRegex.test(username)) {
            newErrors.username = "Please enter a valid email address";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            setIsLoading(false);
            return;
        }

        setIsLoading(true);

        try {
            // Gọi API bằng axios
            const response = await axios.post(
                'https://apigateway-app.wonderfulground-90a44e52.southeastasia.azurecontainerapps.io/user/auth/login',
                {
                    email: username,
                    password: password,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            // Đăng nhập thành công
            // Lưu token nếu có: localStorage.setItem('token', response.data.token);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
            setTimeout(() => {
                window.location.href = "/register";
            }, 2000);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setErrors({ username: error.response.data.message });
            } else {
                setErrors({ username: "Network error. Please try again." });
            }
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 to-orange-50">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url('https://daihoc.fpt.edu.vn/wp-content/uploads/2022/08/dai-hoc-fpt-tp-hcm-1.jpeg')`
                }}
            />

            <div className="overflow-hidden bg-gradient-to-br from-blue-50 to-orange-50">
                {/* Notification Bar */}
                {showSuccess && (
                    <div className="fixed top-6 right-6 z-50">
                        <div className="flex items-center px-6 py-3 bg-green-500 text-white rounded-lg shadow-lg animate-fade-in-down">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            Đăng nhập thành công!
                        </div>
                    </div>
                )}
            </div>


            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>

            {/* Main Content */}
            <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
                <div className="w-full max-w-md">
                    {/* Login Form Container */}
                    <div className="bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-sm bg-opacity-95">
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

                        {/* Login Form */}
                        <div className="space-y-6">
                            {/* Username Field */}
                            <div>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 text-gray-700"
                                    placeholder="Email"
                                    required
                                />
                                {errors.username && (
                                    <div className="mt-2 text-red-500 text-sm flex items-center">
                                        <AlertCircle size={16} className="mr-1" />
                                        {errors.username}
                                    </div>
                                )}
                            </div>

                            {/* Password Field */}
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 text-gray-700 pr-12"
                                    placeholder="Mật khẩu"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors flex items-center justify-center"
                                >
                                    {showPassword ? <EyeOff size={20} flex items-center justify-center /> : <Eye size={20} flex items-center justify-center />}
                                </button>
                                {errors.password && (
                                    <div className="mt-2 text-red-500 text-sm flex items-center">
                                        <AlertCircle size={16} className="mr-1" />
                                        {errors.password}
                                    </div>
                                )}
                            </div>

                            {/* Login Button */}
                            <button
                                onClick={handleLogin}
                                disabled={isLoading} // khi nút đang loading thì không cho người dùng click nữa
                                className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 ${isLoading
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-orange-500 hover:bg-orange-600 active:scale-95'
                                    } shadow-lg hover:shadow-xl`}
                            >
                                {isLoading ? ( // Hiển thị loading khi đang đăng nhập
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                        Đang đăng nhập...
                                    </div>
                                ) : (
                                    'Log in'
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Sign in with Google Option */}
                    <div className="mt-6 text-center">
                        <div className="bg-white rounded-lg shadow-lg p-4 backdrop-blur-sm bg-opacity-95">
                            <p className="text-gray-700 mb-3 font-medium">Sign in with</p>
                            <button className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                <span className="text-gray-700">@fpt.edu.vn (For lecturer only)</span>
                            </button>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default LoginPage;
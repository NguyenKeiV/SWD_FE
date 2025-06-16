import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import axios from 'axios';
import LoadingPage from '../LoadingPage/LoadingPage';
const LoginPage = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [showSuccess, setShowSuccess] = useState(false); // Thêm state cho toast

    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate(); // Hook để điều hướng


    // Microsoft Identity Claims: Backend sử dụng Microsoft Identity framework,
    //  nên role được lưu theo format claim standard của Microsoft

    // Hàm decode JWT token để lấy role
    const decodeJWTToken = (token) => {
        try {
            // JWT có 3 phần: header.payload.signature
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map(function (c) {
                        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                    })
                    .join('')
            );
            return JSON.parse(jsonPayload);
        } catch (error) {
            console.error('Error decoding JWT:', error);
            return null;
        }
    }

    // Hàm lấy role từ JWT payload
    const getRoleFromToken = (decodedToken) => {
        if (!decodedToken) return null;

        // Kiểm tra các trường role có thể có
        const roleClaims = [
            'http://schemas.microsoft.com/ws/2008/06/identity/claims/role', // Microsoft Identity role claim
            'role',
            'userRole',
            'user_role',
            'authority',
            'authorities',
            'scope'
        ];

        for (const claim of roleClaims) {
            if (decodedToken[claim]) {
                return decodedToken[claim];
            }
        }

        return null;
    }


    const handleLogin = async (e) => {
        e.preventDefault(); // Ngăn chặn hành vi mặc định của form (submit, reload trang, v.v.)
        let newErrors = {};
        // email regex để kiểm tra định dạng email
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
            const response = await axios.post(
                'https://apigateway-app.victorioussmoke-6853e8b3.southeastasia.azurecontainerapps.io/user/auth/login',
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

            console.log('Full response:', response);
            console.log('Response data:', response.data);

            if (response.status === 200) {
                const { data } = response;

                // Lấy token từ response
                const token = data.token || data.accessToken || data.access_token;

                if (token) {
                    // Decode JWT token để lấy role
                    const decodedToken = decodeJWTToken(token);
                    console.log('Decoded token payload:', decodedToken);

                    const role = getRoleFromToken(decodedToken);
                    console.log('Extracted role:', role);

                    // Lưu token và role vào localStorage
                    localStorage.setItem('token', token);
                    if (role) {
                        localStorage.setItem('role', role);
                    }

                    setShowSuccess(true);
                    setTimeout(() => setShowSuccess(false), 3000);

                    setTimeout(() => {
                        // Điều hướng dựa trên role (chuyển thành uppercase để đảm bảo)
                        const userRole = role ? role.toUpperCase() : '';

                        if (userRole === "ADMIN" || userRole === "Admin" || userRole === "admin") {
                            navigate("/register");
                        } else if (userRole === "CONSULTANT" || userRole === "Consultant" || userRole === "consultant") {
                            navigate("/consultant");
                        } else {
                            navigate("/");
                        }
                    }, 2500);

                } else {
                    setErrors("Login response missing token");
                    setErrorMessage("Login response missing token");
                    setShowError(true);
                    setTimeout(() => setShowError(false), 3000);
                }
            } else {
                setErrors("Unexpected response status: " + response.status);
                setErrorMessage("Unexpected response status: " + response.status);
                setShowError(true);
                setTimeout(() => setShowError(false), 3000);
            }

        } catch (error) {
            console.error('Login error:', error);

            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message); // Lấy thông báo lỗi từ response
            } else {
                setErrors({ username: "Network error. Please try again." });
                setErrorMessage("Network error. Please try again.");
            }

            setShowError(true);
            setTimeout(() => setShowError(false), 3000);
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
                    backgroundImage: `url('https://vinaconex25.com.vn/wp-content/uploads/2020/06/1.jpg')`
                }}
            />
            <div className="overflow-hidden bg-gradient-to-br from-blue-50 to-orange-50">
                {/* Notification Bar */}
                {showSuccess && (
                    <div className="fixed top-6 right-6 z-50">
                        <div className="flex items-center px-6 py-3 bg-green-500 text-white rounded-lg shadow-lg animate-fade-in-down font-serif">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            Đăng nhập thành công!
                        </div>
                    </div>
                )}

                {showError && (
                    <div className="fixed top-6 right-6 z-50">
                        <div className="flex items-center px-6 py-3 bg-red-500 text-white rounded-lg shadow-2xl transition-transform duration-500 ease-out transform scale-105"
                            style={{
                                transform: showError ? 'translateX(0)' : 'translateX(100%)',
                                boxShadow: '0 8px 32px 0 rgba(239,68,68,0.45), 0 1.5px 8px 0 rgba(0,0,0,0.15)'
                            }}
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span className="font-serif text-lg drop-shadow-lg">{errorMessage}</span>
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
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/FPT_Education_logo.svg/2560px-FPT_Education_logo.svg.png"
                                    alt="FPT Education Logo"
                                    className="h-16 w-auto"
                                    style={{ backgroundColor: 'transparent' }} // Đảm bảo logo có nền trong suốt

                                />
                            </div>
                            <h1 className="text-2xl font-bold text-orange-600 mb-2">TRƯỜNG ĐẠI HỌC FPT</h1>
                        </div>

                        {/* Login Form */}
                        <div className="space-y-6">
                            {/* Username Field */}
                            <div>
                                <input
                                    type="email"
                                    autoComplete="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 text-gray-700 "
                                    placeholder="Email"
                                    required
                                />
                                {errors.username && (
                                    <div className="text-red-500 text-sm flex items-center font-serif mt-auto">
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

                            {/* Login Button */}
                            <button
                                onClick={handleLogin}
                                disabled={isLoading} // khi nút đang loading thì không cho người dùng click nữa
                                className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 mt-10 ${isLoading
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-orange-500 hover:bg-orange-600 active:scale-95'
                                    } shadow-lg hover:shadow-xl cursor-grab`}
                            >
                                {isLoading ? ( // Hiển thị loading khi đang đăng nhập
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                        Đang đăng nhập...
                                    </div>
                                ) : showSuccess ? ( // Hiển thị loading khi đang điều hướng
                                    <div className="flex items-center justify-center opacity-60">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                        Đang điều hướng trang...
                                    </div>
                                ) : (
                                    'Log in' // Hiển thị chữ "Log in" khi không đang loading
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
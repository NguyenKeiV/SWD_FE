import React, { useState } from 'react';

const ProfileResearch = () => {
    const [formData, setFormData] = useState({
        hoTen: '',
        sdt: '',
        email: '',
    });

    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => { // Thêm hàm handleChange để cập nhật formData
        setFormData(prev => ({ // Giữ nguyên các trường đã nhập và chỉ cập nhật trường đang thay đổi    
            ...prev, // giữ nguyên các trường khác
            [e.target.name]: e.target.value // cập nhật trường dữ liệu đang thay đổi
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setResult(null);

        const { hoTen, sdt, email } = formData;

        if (!hoTen || !sdt || !email) {
            setError('Vui lòng nhập đầy đủ thông tin.');
            return;
        }

        try {
            setLoading(true);
            // Gọi API tra cứu (thay URL bên dưới bằng endpoint thật)
            const response = await fetch('https://your-api-url.com/api/tra-cuu', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Không tìm thấy hồ sơ. Vui lòng kiểm tra lại.');
            }

            const data = await response.json();
            setResult(data);
        } catch (err) {
            setError(err.message || 'Đã xảy ra lỗi khi tra cứu.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat py-10 contrast-125 saturate-150 brightness-90"
            style={{ backgroundImage: "url('https://vinaconex25.com.vn/wp-content/uploads/2020/06/phoi-canh.jpg')" }}>

            <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 relative overflow-hidden">
                {/* Logo FPT */}
                <div className="flex justify-center mb-6">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/FPT_Education_logo.svg/2560px-FPT_Education_logo.svg.png"
                        alt="FPT Education Logo"
                        className="h-16"
                    />
                </div>
                <h2 className="text-2xl font-bold text-center text-orange-600 mb-2 drop-shadow">Tra cứu hồ sơ xét tuyển</h2>
                <p className="text-center text-gray-500 mb-6">Vui lòng nhập thông tin để tra cứu trạng thái hồ sơ của bạn</p>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Họ và tên <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            name="hoTen"
                            placeholder="Nhập họ và tên"
                            value={formData.hoTen}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 text-gray-700"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Số điện thoại <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            name="sdt"
                            placeholder="Nhập số điện thoại"
                            value={formData.sdt}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 text-gray-700"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Email <span className="text-red-500">*</span></label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Nhập email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 text-gray-700"
                        />
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm flex items-center font-bold mt-2">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 mt-2
              ${loading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-orange-500 hover:bg-orange-600 active:scale-95'
                            } shadow-lg hover:shadow-xl cursor-grab`}
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                Đang tra cứu...
                            </div>
                        ) : (
                            'Tra cứu hồ sơ'
                        )}
                    </button>
                </form>

                {result && (
                    <div className="mt-8 p-6 border border-green-200 rounded-xl bg-green-50 shadow-inner animate-fade-in-down">
                        <h3 className="text-lg font-semibold text-green-700 mb-2 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            Kết quả tra cứu
                        </h3>
                        <div className="space-y-1 text-gray-700">
                            <p><span className="font-semibold">Họ và tên:</span> {result.hoTen}</p>
                            <p><span className="font-semibold">Ngành đăng ký:</span> {result.nganh}</p>
                            <p><span className="font-semibold">Trạng thái hồ sơ:</span> {result.trangThai}</p>
                            <p><span className="font-semibold">Ngày đăng ký:</span> {result.ngayDangKy}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileResearch;
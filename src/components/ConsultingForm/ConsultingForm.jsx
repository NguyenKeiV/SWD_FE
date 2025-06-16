import React, { useState } from "react";

const provinces = [
    "Hà Nội", "Hải Phòng", "Huế", "Đà Nẵng",
    "Cần Thơ", "TP. Hồ Chí Minh", "Lai Châu", "Điện Biên", "Sơn La", "Lạng Sơn", "Quảng Ninh",
    "Thanh Hóa", "Nghệ An", "Hà Tĩnh", "Cao Bằng", "Tuyên Quang", "Lào Cai", "Thái Nguyên", "Phú Thọ",
    "Bắc Ninh", "Hưng Yên", "Hải Dương", "Ninh Bình", "Quảng Trị", "Gia Lai", "Khánh Hòa", "Lâm Đồng", "Đắk Lắk", "Đồng Nai",
    "Tây Ninh", "Vĩnh Long", "Đồng Tháp", "Cà Mau", "An Giang"
];

const sortedProvinces = [...provinces].sort((a, b) => a.localeCompare(b, 'vi'));

const ConsultingForm = () => {
    const [form, setForm] = useState({
        name: "",
        phonenumber: "",
        email: "",
        province: "",
        notes: ""
    });
    const [error, setError] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.province) {
            setError("Vui lòng nhập đầy đủ thông tin bắt buộc.");
            return;
        }
        // Gửi dữ liệu tới backend tại đây nếu cần
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
        setForm({ name: "", email: "", province: "", notes: "" });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-blue-50 py-10  bg-cover bg-center bg-no-repeat contrast-more:150 saturate-150 brightness-90"
            style={{ backgroundImage: "url('https://vinaconex25.com.vn/wp-content/uploads/2025/02/phoi-canh-01-scaled.jpg')" }}>
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8">
                <div className="flex justify-center mb-6">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/FPT_Education_logo.svg/2560px-FPT_Education_logo.svg.png"
                        alt="FPT Education Logo"
                        className="h-16 w-auto"
                    />
                </div>
                <h2 className="text-2xl font-bold text-center text-orange-600 mb-6">Đăng Ký Tư Vấn</h2>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Họ và tên <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Nhập họ và tên"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none bg-gray-50"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Số điện thoại <span className="text-red-500">*</span></label>
                        <input
                            type="phone"
                            name="email"
                            placeholder="Nhập số điện thoại"
                            value={form.phonenumber}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none bg-gray-50"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Email <span className="text-red-500">*</span></label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Nhập email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none bg-gray-50"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Tỉnh/Thành phố <span className="text-red-500">*</span></label>
                        <select
                            name="province"
                            value={form.province}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none bg-gray-50"
                        >
                            <option value="">-- Chọn tỉnh/thành phố --</option>
                            {sortedProvinces.map((p) => (
                                <option key={p} value={p}>{p}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Ghi chú</label>
                        <textarea
                            name="notes"
                            placeholder="Ghi chú thêm (nếu có)"
                            value={form.notes}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none bg-gray-50"
                            rows={3}
                        />
                    </div>
                    {error && <div className="text-red-500 text-sm">{error}</div>}
                    <button
                        type="submit"
                        className="w-full py-3 px-4 rounded-lg font-semibold text-white bg-orange-500 hover:bg-orange-600 transition-all duration-200 shadow-lg"
                    >
                        Đăng ký tư vấn
                    </button>
                </form>
                {showSuccess && (
                    <div className="fixed top-6 right-6 z-50 flex items-start">
                        <div className="flex bg-white rounded-lg shadow-lg border-l-4 border-green-500 p-4 min-w-[320px] transition-transform duration-500 ease-out transform scale-105"
                            style={{ transform: showSuccess ? 'translateX(0)' : 'translateX(100%)' }}>
                            <div className="flex-shrink-0">
                                <div className="h-8 w-8 rounded-full bg-green-400 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>
                            <div className="ml-4 flex-1">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="font-bold text-lg text-gray-900">Thành công</div>
                                        <div className="text-gray-500 text-base">Bạn đã đăng ký tư vấn thành công!</div>
                                    </div>
                                    <button
                                        onClick={() => setShowSuccess(false)}
                                        className="text-gray-400 hover:text-gray-700 ml-4"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConsultingForm;
import React, { useState } from 'react';
import { Calendar, Phone, Mail, MapPin, User, GraduationCap, FileText, Star, Award, Users, Globe, ChevronDown, Check } from 'lucide-react';

const AdmissionForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
        birthDate: '',
        gender: '',
        address: '',
        province: '',
        school: '',
        major: '',
        campus: '',
        graduationYear: '',
        englishScore: '',
        mathScore: '',
        literatureScore: '',
        priority1: '',
        notes: ''
    });

    const [activeTab, setActiveTab] = useState('personal');
    const [showSuccess, setShowSuccess] = useState(false);


    const majors = [
        'Kỹ thuật phần mềm', 'An toàn thông tin', 'Trí tuệ nhân tạo', 'Vi mạch bán dẫn',
        'Thiết kế mỹ thuật số', 'Truyền thông đa phương tiện', 'Digital Marketing',
        'Luật kinh tế', 'Kinh doanh quốc tế', 'Ngôn ngữ Anh', 'Ngôn ngữ Nhật', 'Ngôn ngữ Hàn', 'Ngôn ngữ Trung Quốc',
    ];

    const campuses = [
        'Hà Nội',
        'TP. Hồ Chí Minh',
        'Đà Nẵng',
        'Quy Nhơn',
        'Cần Thơ'
    ];

    const provinces = [
        "Hà Nội", "Hải Phòng", "Huế", "Đà Nẵng",
        "Cần Thơ", "TP. Hồ Chí Minh", "Lai Châu", "Điện Biên", "Sơn La", "Lạng Sơn", "Quảng Ninh",
        "Thanh Hóa", "Nghệ An", "Hà Tĩnh", "Cao Bằng", "Tuyên Quang", "Lào Cai", "Thái Nguyên", "Phú Thọ",
        "Bắc Ninh", "Hưng Yên", "Hải Dương", "Ninh Bình", "Quảng Trị", "Gia Lai", "Khánh Hòa", "Lâm Đồng", "Đắk Lắk", "Đồng Nai",
        "Tây Ninh", "Vĩnh Long", "Đồng Tháp", "Cà Mau", "An Giang"
    ];


    const sortedProvinces = [...provinces].sort((a, b) => a.localeCompare(b, 'vi'));

    const handleInputChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    return (
        <div className="min-h-screen bg-gray-50"
            style={{ backgroundImage: "url('https://vinaconex25.com.vn/wp-content/uploads/2020/04/phoi-canh-1.jpg')" }}>
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <img
                                src="https://fpteducationgroup.wordpress.com/wp-content/uploads/2015/03/cropped-logo-co-kem-3-sao-012.png"
                                alt="FPT Education Logo"
                                className="h-16 w-auto contrast-more:100 saturate-150 brightness-90"
                            />

                        </div>
                        <div className="text-right flex flex-col items-end">
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-orange-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                                </svg>
                                <p className="text-sm text-orange-600 font-bold">Hotline tư vấn</p>
                            </div>
                            <p className="text-lg font-bold text-dark-500 mt-1">1900 9009</p>
                        </div>
                    </div>
                </div>
            </div>



            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        FPTU<span className="text-yellow-300">wAI</span>
                    </h1>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">VỮNG TƯƠNG LAI</h2>
                    <p className="text-lg md:text-xl max-w-4xl mx-auto mb-8 opacity-90">
                        Tại Trường Đại học FPT, bạn không chỉ học ngành mình thích – bạn học cùng AI, làm chủ công nghệ
                        và sẵn sàng đón đầu tương lai. FPTUwAI = FPTU with AI – nơi AI không chỉ là một môn học,
                        mà là nền tảng cho sự nghiệp tương lai.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
                        <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                            <span className="font-bold">98%</span> sinh viên có việc làm
                        </div>
                        <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                            <span className="font-bold">5</span> cơ sở đào tạo
                        </div>
                        <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                            <span className="font-bold">2.800+</span> học bổng
                        </div>
                        <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                            <span className="font-bold">24</span> chuyên ngành
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Form Section */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-xl p-8">
                            <div className="flex items-center justify-center mb-4">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/FPT_Education_logo.svg/2560px-FPT_Education_logo.svg.png"
                                    alt="FPT Education Logo"
                                    className="h-16 w-auto"
                                    style={{ backgroundColor: 'transparent' }} // Đảm bảo logo có nền trong suốt

                                />
                            </div>
                            <h2 className="text-3xl font-serif font-bold text-orange-600 mb-8 text-center">
                                Đăng ký xét tuyển 2025
                            </h2>

                            {/* Tab Navigation */}
                            <div className="flex border-b mb-8">
                                <button
                                    onClick={() => setActiveTab('personal')}
                                    className={`px-6 py-3 font-medium ${activeTab === 'personal'
                                        ? 'border-b-2 border-orange-500 text-orange-500'
                                        : 'text-gray-600 hover:text-gray-800'
                                        }`}
                                >
                                    Thông tin cá nhân
                                </button>
                                <button
                                    onClick={() => setActiveTab('academic')}
                                    className={`px-6 py-3 font-medium ${activeTab === 'academic'
                                        ? 'border-b-2 border-orange-500 text-orange-500'
                                        : 'text-gray-600 hover:text-gray-800'
                                        }`}
                                >
                                    Thông tin học tập
                                </button>
                            </div>

                            {/* Personal Information Tab */}
                            {activeTab === 'personal' && (
                                <div className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Họ và tên <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                                <input
                                                    type="text"
                                                    value={formData.fullName}
                                                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                                    placeholder="Nhập họ và tên"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Số điện thoại <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                                <input
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={(e) => handleInputChange('phone', e.target.value)}
                                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                                    placeholder="Nhập số điện thoại"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Email <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                                <input
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                                    placeholder="Nhập email"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Ngày sinh <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                                <input
                                                    type="date"
                                                    value={formData.birthDate}
                                                    onChange={(e) => handleInputChange('birthDate', e.target.value)}
                                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Giới tính <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                value={formData.gender}
                                                onChange={(e) => handleInputChange('gender', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                            >
                                                <option value="">Chọn giới tính</option>
                                                <option value="male">Nam</option>
                                                <option value="female">Nữ</option>

                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Tỉnh/Thành phố <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                value={formData.province}
                                                onChange={(e) => handleInputChange('province', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                            >
                                                <option value="">Chọn tỉnh/thành phố</option>
                                                {sortedProvinces.map((province) => (
                                                    <option key={province} value={province}>{province}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Địa chỉ <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                            <textarea
                                                value={formData.address}
                                                onChange={(e) => handleInputChange('address', e.target.value)}
                                                rows={3}
                                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                                placeholder="Nhập địa chỉ chi tiết"
                                            />
                                        </div>
                                    </div>


                                    <div className="flex justify-end">
                                        <button
                                            onClick={() => setActiveTab('academic')}
                                            className="px-8 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
                                        >
                                            Tiếp theo
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Academic Information Tab */}
                            {activeTab === 'academic' && (
                                <div className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Trường THPT <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <GraduationCap className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                                <input
                                                    type="text"
                                                    value={formData.school}
                                                    onChange={(e) => handleInputChange('school', e.target.value)}
                                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                                    placeholder="Nhập tên trường THPT"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Năm tốt nghiệp <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                value={formData.graduationYear}
                                                onChange={(e) => handleInputChange('graduationYear', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                            >
                                                <option value="">Chọn năm tốt nghiệp</option>
                                                <option value="2024">2024</option>
                                                <option value="2023">2023</option>
                                                <option value="2022">2022</option>
                                                <option value="2021">2021</option>
                                                <option value="2020">2020</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Ngành học <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                value={formData.priority1}
                                                onChange={(e) => handleInputChange('priority1', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                            >
                                                <option value="">Chọn ngành học</option>
                                                {majors.map((major) => (
                                                    <option key={major} value={major}>{major}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Cơ sở đào tạo <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                value={formData.campus}
                                                onChange={(e) => handleInputChange('campus', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                            >
                                                <option value="">Chọn cơ sở</option>
                                                {campuses.map((campus) => (
                                                    <option key={campus} value={campus}>{campus}</option>
                                                ))}
                                            </select>
                                        </div>

                                    </div>

                                    <div className="border-t pt-6">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Điểm thi THPT <span className="text-red-500">*</span></h3>
                                        <div className="grid md:grid-cols-3 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Điểm Toán <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="number"
                                                    step="0.1"
                                                    min="0"
                                                    max="10"
                                                    value={formData.mathScore}
                                                    onChange={(e) => handleInputChange('mathScore', e.target.value)}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                                    placeholder="0.0"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Điểm Văn <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="number"
                                                    step="0.1"
                                                    min="0"
                                                    max="10"
                                                    value={formData.literatureScore}
                                                    onChange={(e) => handleInputChange('literatureScore', e.target.value)}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                                    placeholder="0.0"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Điểm Tiếng Anh <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="number"
                                                    step="0.1"
                                                    min="0"
                                                    max="10"
                                                    value={formData.englishScore}
                                                    onChange={(e) => handleInputChange('englishScore', e.target.value)}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                                    placeholder="0.0"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Ghi chú thêm
                                        </label>
                                        <textarea
                                            value={formData.notes}
                                            onChange={(e) => handleInputChange('notes', e.target.value)}
                                            rows={4}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                            placeholder="Nhập thông tin bổ sung (nếu có)"
                                        />
                                    </div>

                                    <div className="flex justify-between">
                                        <button
                                            onClick={() => setActiveTab('personal')}
                                            className="px-8 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
                                        >
                                            Quay lại
                                        </button>
                                        <button
                                            onClick={handleSubmit}
                                            className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105 font-medium shadow-lg"
                                        >
                                            Đăng ký ngay
                                        </button>
                                        {showSuccess && (
                                            <div className="fixed top-6 right-6 z-50 flex items-start">
                                                <div
                                                    className="flex bg-white rounded-lg shadow-lg border-l-4 border-green-500 p-4 min-w-[320px] transition-transform duration-500 ease-out transform"
                                                    style={{
                                                        transform: showSuccess ? 'translateX(0)' : 'translateX(100%)'
                                                    }}
                                                >
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
                                                                <div className="text-gray-500 text-base">Bạn đã đăng ký xét tuyển thành công !</div>
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
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Reasons to Choose FPTU */}
                        <div className="bg-white rounded-2xl shadow-xl p-6">
                            <h3 className="text-2xl  font-serif font-bold text-orange-600 mb-6">5 LÝ DO chọn FPTU</h3>

                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <div className="bg-orange-100 p-2 rounded-lg">
                                        <Award className="h-6 w-6 text-orange-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800">98% Có việc làm</h4>
                                        <p className="text-sm text-gray-600">Sinh viên ra trường có việc, 19% làm việc tại các nước phát triển</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <div className="bg-blue-100 p-2 rounded-lg">
                                        <MapPin className="h-6 w-6 text-blue-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800">5 Cơ sở đào tạo</h4>
                                        <p className="text-sm text-gray-600">Hà Nội, TPHCM, Đà Nẵng, Quy Nhơn, Cần Thơ</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <div className="bg-green-100 p-2 rounded-lg">
                                        <Star className="h-6 w-6 text-green-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800">2.800+ Học bổng</h4>
                                        <p className="text-sm text-gray-600">Giá trị lên đến 100% học phí toàn khóa</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <div className="bg-purple-100 p-2 rounded-lg">
                                        <GraduationCap className="h-6 w-6 text-purple-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800">24 Chuyên ngành</h4>
                                        <p className="text-sm text-gray-600">Đa dạng ngành học với chất lượng cao</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <div className="bg-red-100 p-2 rounded-lg">
                                        <Users className="h-6 w-6 text-red-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800">100% Thực tập</h4>
                                        <p className="text-sm text-gray-600">Sinh viên thực tập tại các tập đoàn lớn</p>
                                    </div>



                                </div>
                            </div>
                        </div>
                        {/* Contact Information */}
                        <div className="bg-white rounded-2xl shadow-xl p-6">
                            <h3 className="text-2xl font-bold text-dark-800 mb-6">Thông tin liên hệ</h3>
                            <p className="text-sm text-gray-600 mb-4">Nếu bạn cần hỗ trợ, vui lòng liên hệ với chúng tôi qua:</p>
                            <ul className="space-y-2">
                                <li className="flex items-center space-x-2">
                                    <Phone className="h-5 w-5 text-gray-500" />
                                    <span className="text-orange-600 font-bold">Hotline: 1900 9789</span>
                                </li>

                            </ul>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default AdmissionForm;

import React, { useEffect, useState } from "react";
import { Search, Trash2, Edit, CheckCircle, Loader2, Briefcase, Delete, View } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ConsultingApplicationForm = () => {
    const PAGE_SIZE = 10;

    const [applicants, setApplicants] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [selectedApplicant, setSelectedApplicant] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [claimedBookings, setClaimedBookings] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("view"); // 'view' hoặc 'process'

    // 1. Add state for modal mode (add/edit), form data, and delete confirmation
    const [modalMode, setModalMode] = useState(null); // 'add' | 'edit' | null
    const [formData, setFormData] = useState({
        userFullName: '',
        userEmail: '',
        userPhoneNumber: '',
        birthDate: '',
        gender: '',
        province: '',
        address: '',
        school: '',
        graduationYear: '',
        campus: '',
        interestedAcademicField: '',
        mathScore: '',
        literatureScore: '',
        englishScore: '',
    });
    const [deleteId, setDeleteId] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    // MÀU SẮC CHO TỪNG TRẠNG THÁI HỒ SƠ
    const StatusBadge = ({ status }) => {
        const base = "px-2 py-1 rounded text-xs font-semibold";
        const color =
            status === 'Waiting'
                ? "bg-yellow-400 text-white"
                : status === 'InProgress'
                    ? "bg-blue-500 text-white"
                    : status === 'Discarded'
                        ? "bg-red-500 text-white"
                        : status === 'Completed'
                            ? "bg-green-600 text-white"
                            : "bg-gray-300 text-black";

        return <span className={`${base} ${color}`}>{status}</span>;
    };


    const fetchApplicationForm = async (page = 1) => {
        setLoading(true);
        setError("");
        try {
            const res = await axios.get("http://localhost:8080/applicationbooking/get-all-applications", {
                params: {
                    status: 'Waiting',
                    pageIndex: page,
                    pageSize: PAGE_SIZE,
                },
            });
            // Lấy đúng mảng items
            const items = res.data?.data?.items || [];
            setApplicants(items);
            setTotalPages(res.data?.data?.totalPages || 1); // hoặc totalCount/pageSize nếu API trả về

        } catch (error) {
            setError("Không thể tải danh sách hồ sơ.");
            setApplicants([]);
        }
        setLoading(false);
    };


    useEffect(() => {
        fetchApplicationForm(currentPage);
    }, [currentPage]);


    const handleShowList = async () => {
        setLoading(true);
        setError("");
        try {
            await fetchApplicationForm(1); // lấy trang đầu tiên
            setSelectedApplicant(true);
        } catch (error) {
            setError("Không thể tải danh sách hồ sơ.");
        }
        setLoading(false);
    };

    const handleViewDetails = (applicant) => {
        setSelectedApplicant(applicant);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);

    };



    const claimApplication = async (applicationId) => {
        const token = localStorage.getItem("token");
        const userRole = localStorage.getItem("role");
        if (userRole != 'Consultant') {
            alert("Bạn không có quyền xử lý hồ sơ này.");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:8080/applicationbooking/claim-application-booking",
                {
                    applicationId: applicationId,

                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    }
                }
            );

            if (response.data?.code === "Success!") {
                // Có thể cập nhật lại danh sách hoặc reload
                fetchApplicationForm(); // gọi lại list
            } else {
                alert("Không thể claim hồ sơ. Vui lòng thử lại.");
            }
        } catch (error) {
            if (error.response) {
                console.log("lỗi từ server:", error.response.status);
                console.log("Thông điệp:", error.response.data);
                alert(error.response.data.message || "Lỗi từ server.");
            } else if (error.request) {
                console.log("⏳ Không có phản hồi:", error.request);
                alert("Không nhận được phản hồi từ server.");
            } else {
                console.log("⚠️ Lỗi khác:", error.message);
                alert("Lỗi không xác định.");
            }
        }
    };

    const getSubFromToken = () => {
        const token = localStorage.getItem('token');
        if (!token) return null;

        try {
            const payload = token.split('.')[1];
            const decodedPayload = JSON.parse(atob(payload));
            return decodedPayload.sub || null;
        } catch (err) {
            console.error("Lỗi khi decode JWT:", err);
            return null;
        }
    };

    const fetchClaimedBookings = async () => {
        const token = localStorage.getItem("token");
        const consultantId = getSubFromToken(); // 👈 Lấy ID riêng của Consultant

        if (!consultantId) {
            console.error("Không thể lấy Consultant ID từ token.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await axios.get("http://localhost:8080/applicationbooking/get-all-applications", {
                params: {
                    status: 'InProgress',
                    claimedByConsultantId: consultantId, // ✅ truyền ID vào query param
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const claimedInProgress = (response.data?.data?.items || []);

            setClaimedBookings(claimedInProgress);
        } catch (error) {
            console.error("Lỗi khi tải danh sách xử lý:", error);
            setError("Không thể tải danh sách hồ sơ đang xử lý.");
        }

        setLoading(false);
    };

    const handleShowProcessTab = () => {
        setActiveTab("process");
        fetchClaimedBookings();
    };

    // 2. Add open/close modal functions for add/edit
    const openAddModal = () => {
        setModalMode('add');
        setFormData({
            userFullName: '',
            userEmail: '',
            userPhoneNumber: '',
            birthDate: '',
            gender: '',
            province: '',
            address: '',
            school: '',
            graduationYear: '',
            campus: '',
            interestedAcademicField: '',
            mathScore: '',
            literatureScore: '',
            englishScore: '',
        });
        setShowModal(true);
    };
    const openEditModal = (applicant) => {
        setModalMode('edit');
        setFormData({ ...applicant });
        setShowModal(true);
    };

    // 3. Add placeholder CRUD functions
    const createApplication = async (data) => {
        // TODO: Replace with API call
        alert('Create application (API to be implemented)');
        setShowModal(false);
        fetchApplicationForm(currentPage);
    };
    const updateApplication = async (data) => {
        // TODO: Replace with API call
        alert('Update application (API to be implemented)');
        setShowModal(false);
        fetchApplicationForm(currentPage);
    };
    const deleteApplication = async (id) => {
        // TODO: Replace with API call
        alert('Delete application (API to be implemented)');
        setShowDeleteConfirm(false);
        fetchApplicationForm(currentPage);
    };

    // 4. Add form submit handler
    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (modalMode === 'add') {
            createApplication(formData);
        } else if (modalMode === 'edit') {
            updateApplication(formData);
        }
    };

    // 5. Add delete confirm handler
    const handleDeleteClick = (id) => {
        setDeleteId(id);
        setShowDeleteConfirm(true);
    };
    const confirmDelete = () => {
        deleteApplication(deleteId);
    };
    const cancelDelete = () => {
        setShowDeleteConfirm(false);
        setDeleteId(null);
    };

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}

            <aside className="w-64 bg-orange-600 text-white flex flex-col py-6 px-10">
                <div className="mb-10">
                    <div className="text-2xl font-bold mb-2 flex items-center gap-2">
                        <Briefcase size={32} className="inline" /> Quản Lý Hồ Sơ Đăng Ký Xét Tuyển
                    </div>
                </div>
                <button
                    className="flex gap-2"
                    onClick={() => {
                        setSelectedApplicant(true);
                        handleShowList();
                        setActiveTab("view");
                    }}
                >
                    <div className="bg-orange-500 rounded px-3 py-2 font-semibold flex items-center gap-2 whitespace-nowrap">
                        <View size={22} />
                        <span>Xem danh sách hồ sơ</span>
                    </div>
                </button>

                <button className="flex flex-col gap-2 mt-2 " onClick={handleShowProcessTab}>
                    <div className="bg-orange-500 rounded px-3 py-2 font-semibold flex items-center gap-2 text-nowrap">
                        <Edit size={20} /> Xử lý hồ sơ
                    </div>
                </button>

                <button className="flex flex-col gap-2 mt-2">
                    <div className="bg-orange-500 rounded px-3 py-2 font-semibold flex items-center gap-2 text-nowrap">
                        <Delete size={20} /> Xóa hồ sơ
                    </div>
                </button>
            </aside>

            {/* Hiển thị hình ảnh khi chưa chọn chức năng nào */}
            {!selectedApplicant && (
                <div className="flex-1 flex items-center justify-center bg-gray-50">
                    <img
                        src=
                        "https://upload.wikimedia.org/wikipedia/commons/6/68/Logo_FPT_Education.png"
                        alt="Consultant illustration"
                        className="max-w-md w-full object-contain"
                    />
                </div>
            )}

            {/* Main Content */}
            {selectedApplicant && activeTab === "view" && (
                <main className="flex-1 bg-gray-50 p-8">
                    <h2 className="text-3xl font-bold mb-6 text-orange-600">Danh Sách Hồ Sơ Đăng Ký Xét Tuyển</h2>

                    {/* Search */}
                    <form className="mb-4 flex items-center gap-2">
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo tên, email, số điện thoại..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-xs"
                        />
                        <button
                            type="submit"
                            className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center gap-1 hover:bg-orange-600"
                        >
                            <Search size={18} /> Tìm kiếm
                        </button>
                    </form>

                    {/* Add New Button */}
                    <div className="mb-4 flex justify-end">
                        <button
                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                            onClick={openAddModal}
                        >
                            + Thêm hồ sơ mới
                        </button>
                    </div>

                    {/* Alerts */}
                    {/* ...table... */}
                    <div className="overflow-x-auto bg-white rounded-xl shadow text-nowrap">
                        <table className="min-w-full text-sm">
                            {/* ...thead... */}
                            <thead>
                                <tr className="bg-orange-100 text-gray-700">
                                    <th className="p-3 text-left">ID</th>
                                    <th className="p-3 text-left">Mã Hồ Sơ</th>
                                    <th className="p-3 text-left">Xem Chi Tiết</th>
                                    <th className="p-3 text-left">Họ và Tên</th>
                                    <th className="p-3 text-left">Email</th>
                                    <th className="p-3 text-left">Số Điện Thoại</th>
                                    <th className="p-3 text-left">Ngày sinh</th>
                                    <th className="p-3 text-left">Giới tính</th>
                                    <th className="p-3 text-left">Tỉnh/Thành Phố</th>
                                    <th className="p-3 text-left">Địa chỉ</th>
                                    <th className="p-3 text-left">Trường</th>
                                    <th className="p-3 text-left">Năm tốt nghiệp</th>
                                    <th className="p-3 text-left">Campus</th>
                                    <th className="p-3 text-left">Ngành học</th>
                                    <th className="p-3 text-left">Điểm Toán</th>
                                    <th className="p-3 text-left">Điểm Văn</th>
                                    <th className="p-3 text-left">Điểm Anh</th>
                                    <th className="p-3 text-left">Trạng Thái Hồ Sơ</th>
                                    <th className="p-3 text-left">Xử Lý Hồ Sơ</th>
                                </tr>
                            </thead>

                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={19} className="text-center py-8">
                                            <Loader2 className="animate-spin inline mr-2" /> Đang tải...
                                        </td>
                                    </tr>
                                ) : applicants.length === 0 ? (
                                    <tr>
                                        <td colSpan={19} className="text-center py-8 text-gray-500">
                                            Không có hồ sơ nào.
                                        </td>
                                    </tr>
                                ) : (
                                    applicants.map((applicant, idx) => (
                                        <tr key={applicant.id} className="border-b hover:bg-orange-50">
                                            <td className="p-3">{(currentPage - 1) * PAGE_SIZE + idx + 1}</td>
                                            <td className="p-3">{applicant.id}</td>
                                            <td className="p-3">
                                                <button
                                                    onClick={() => handleViewDetails(applicant)}
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    Chi tiết hồ sơ
                                                </button>
                                            </td>
                                            <td className="p-3">{applicant.userFullName}</td>
                                            <td className="p-3">{applicant.userEmail}</td>
                                            <td className="p-3">{applicant.userPhoneNumber}</td>
                                            <td className="p-3">{applicant.birthDate}</td>
                                            <td className="p-3">{applicant.gender}</td>
                                            <td className="p-3">{applicant.province}</td>
                                            <td className="p-3">{applicant.address}</td>
                                            <td className="p-3">{applicant.school}</td>
                                            <td className="p-3">{applicant.graduationYear}</td>
                                            <td className="p-3">{applicant.campus}</td>
                                            <td className="p-3">{applicant.interestedAcademicField}</td>
                                            <td className="p-3">{applicant.mathScore}</td>
                                            <td className="p-3">{applicant.literatureScore}</td>
                                            <td className="p-3">{applicant.englishScore}</td>
                                            <td className="p-3"><StatusBadge status={applicant.status} /></td>
                                            <td className="p-3 flex gap-2">
                                                <button
                                                    onClick={() => claimApplication(applicant.id)}
                                                    className="bg-green-500 hover:bg-green-600 transition text-white px-3 py-1 rounded flex items-center gap-1"
                                                >
                                                    <CheckCircle size={16} /> Nhận
                                                </button>
                                                <button
                                                    onClick={() => openEditModal(applicant)}
                                                    className="bg-blue-500 hover:bg-blue-600 transition text-white px-3 py-1 rounded flex items-center gap-1"
                                                >
                                                    <Edit size={16} /> Sửa
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteClick(applicant.id)}
                                                    className="bg-red-500 hover:bg-red-600 transition text-white px-3 py-1 rounded flex items-center gap-1"
                                                >
                                                    <Trash2 size={16} /> Xóa
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination controls */}
                    {totalPages > 1 && (
                        <div className="flex justify-center mt-4 gap-2">
                            <button
                                className="px-3 py-1 rounded bg-orange-200 hover:bg-orange-400 disabled:opacity-50"
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                            >
                                Trang trước
                            </button>
                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-orange-500 text-white" : "bg-orange-200 hover:bg-orange-400"}`}
                                    onClick={() => setCurrentPage(i + 1)}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button
                                className="px-3 py-1 rounded bg-orange-200 hover:bg-orange-400 disabled:opacity-50"
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                            >
                                Trang sau
                            </button>
                        </div>
                    )}
                </main>
            )}

            {activeTab === "process" && (
                <main className="flex-1 bg-gray-50 p-8">
                    <h2 className="text-2xl font-bold mb-6 text-orange-600">Danh Sách Hồ Sơ Đã Xác Nhận</h2>
                    <div className="overflow-x-auto bg-white rounded-xl shadow text-nowrap">
                        <table className="min-w-full text-sm">
                            <thead>
                                <tr className="bg-orange-100 text-gray-700">
                                    <th className="p-3 text-left">STT</th>
                                    <th className="p-3 text-left">Mã Hồ Sơ</th>
                                    <th className="p-3 text-left">Mã Tư vấn</th>
                                    <th className="p-3 text-left">Họ tên</th>
                                    <th className="p-3 text-left">Email</th>
                                    <th className="p-3 text-left">Ngành</th>
                                    <th className="p-3 text-left">Trạng thái</th>
                                    <th className="p-3 text-left">Hành Động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {claimedBookings.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="text-center py-8 text-gray-500">
                                            Không có hồ sơ nào.
                                        </td>
                                    </tr>
                                ) : (
                                    claimedBookings.map((booking, idx) => (
                                        <tr key={booking.id} className="border-b hover:bg-orange-50 transition">
                                            <td className="p-3">{idx + 1}</td>
                                            <td className="p-3">{booking.id}</td>
                                            <td className="p-3">{booking.claimedByConsultantId}</td>
                                            <td className="p-3">{booking.userFullName}</td>
                                            <td className="p-3">{booking.userEmail}</td>
                                            <td className="p-3">{booking.interestedAcademicField}</td>
                                            <td className="p-3">
                                                <StatusBadge status={booking.status} />
                                            </td>
                                            <td className="p-3">
                                                {/* Thêm nút cập nhật hoặc thao tác khác nếu muốn */}
                                                <button
                                                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded transition"
                                                // onClick={() => ...}
                                                >
                                                    Cập nhật
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </main>
            )}


            {/* XEM CHI TIẾT HỒ SƠ */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 border-t-8 border-orange-500 animate-fade-in-up">
                        {modalMode ? (
                            <form onSubmit={handleFormSubmit}>
                                <h2 className="text-2xl font-bold mb-6 text-orange-600 text-center">
                                    {modalMode === 'add' ? 'Thêm Hồ Sơ Mới' : 'Chỉnh Sửa Hồ Sơ'}
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-800">
                                    <div><label className="font-semibold">Họ và Tên:</label><input type="text" className="border rounded w-full px-2 py-1" value={formData.userFullName} onChange={e => setFormData({ ...formData, userFullName: e.target.value })} required /></div>
                                    <div><label className="font-semibold">Email:</label><input type="email" className="border rounded w-full px-2 py-1" value={formData.userEmail} onChange={e => setFormData({ ...formData, userEmail: e.target.value })} required /></div>
                                    <div><label className="font-semibold">Số Điện Thoại:</label><input type="text" className="border rounded w-full px-2 py-1" value={formData.userPhoneNumber} onChange={e => setFormData({ ...formData, userPhoneNumber: e.target.value })} required /></div>
                                    <div><label className="font-semibold">Ngày sinh:</label><input type="date" className="border rounded w-full px-2 py-1" value={formData.birthDate} onChange={e => setFormData({ ...formData, birthDate: e.target.value })} required /></div>
                                    <div><label className="font-semibold">Giới tính:</label><input type="text" className="border rounded w-full px-2 py-1" value={formData.gender} onChange={e => setFormData({ ...formData, gender: e.target.value })} required /></div>
                                    <div><label className="font-semibold">Tỉnh/Thành Phố:</label><input type="text" className="border rounded w-full px-2 py-1" value={formData.province} onChange={e => setFormData({ ...formData, province: e.target.value })} required /></div>
                                    <div className="md:col-span-2"><label className="font-semibold">Địa chỉ:</label><input type="text" className="border rounded w-full px-2 py-1" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} required /></div>
                                    <div><label className="font-semibold">Trường:</label><input type="text" className="border rounded w-full px-2 py-1" value={formData.school} onChange={e => setFormData({ ...formData, school: e.target.value })} required /></div>
                                    <div><label className="font-semibold">Năm tốt nghiệp:</label><input type="text" className="border rounded w-full px-2 py-1" value={formData.graduationYear} onChange={e => setFormData({ ...formData, graduationYear: e.target.value })} required /></div>
                                    <div><label className="font-semibold">Campus:</label><input type="text" className="border rounded w-full px-2 py-1" value={formData.campus} onChange={e => setFormData({ ...formData, campus: e.target.value })} required /></div>
                                    <div><label className="font-semibold">Ngành học:</label><input type="text" className="border rounded w-full px-2 py-1" value={formData.interestedAcademicField} onChange={e => setFormData({ ...formData, interestedAcademicField: e.target.value })} required /></div>
                                    <div><label className="font-semibold">Điểm Toán:</label><input type="number" className="border rounded w-full px-2 py-1" value={formData.mathScore} onChange={e => setFormData({ ...formData, mathScore: e.target.value })} required /></div>
                                    <div><label className="font-semibold">Điểm Văn:</label><input type="number" className="border rounded w-full px-2 py-1" value={formData.literatureScore} onChange={e => setFormData({ ...formData, literatureScore: e.target.value })} required /></div>
                                    <div><label className="font-semibold">Điểm Anh:</label><input type="number" className="border rounded w-full px-2 py-1" value={formData.englishScore} onChange={e => setFormData({ ...formData, englishScore: e.target.value })} required /></div>
                                </div>
                                <div className="mt-8 text-right flex gap-2 justify-end">
                                    <button type="button" onClick={closeModal} className="px-5 py-2 rounded-xl bg-gray-300 text-gray-700 hover:bg-gray-400 transition duration-300">Hủy</button>
                                    <button type="submit" className="px-5 py-2 rounded-xl bg-orange-500 text-white hover:bg-orange-600 transition duration-300">
                                        {modalMode === 'add' ? 'Thêm' : 'Cập nhật'}
                                    </button>
                                </div>
                            </form>
                        ) : (
                            // Show details (view mode)
                            <>
                                <div className="flex items-center justify-center mb-4 ">
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/FPT_Education_logo.svg/2560px-FPT_Education_logo.svg.png"
                                        alt="FPT Education Logo"
                                        className="h-16 w-auto contrast-100 saturate-100"
                                        style={{ backgroundColor: 'transparent' }}
                                    />
                                </div>
                                <h2 className="text-2xl font-bold mb-6 text-orange-600 text-center">CHI TIẾT HỒ SƠ ĐĂNG KÝ XÉT TUYỂN </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-800">
                                    <div><span className="font-semibold font-mono">Họ và Tên:</span> {selectedApplicant.userFullName}</div>
                                    <div><span className="font-semibold font-mono">Email:</span> {selectedApplicant.userEmail}</div>
                                    <div><span className="font-semibold font-mono">Số Điện Thoại:</span> {selectedApplicant.userPhoneNumber}</div>
                                    <div><span className="font-semibold font-mono">Ngày sinh:</span> {selectedApplicant.birthDate}</div>
                                    <div><span className="font-semibold font-mono">Giới tính:</span> {selectedApplicant.gender}</div>
                                    <div><span className="font-semibold font-mono">Tỉnh/Thành Phố:</span> {selectedApplicant.province}</div>
                                    <div><span className="font-semibold font-mono">Địa chỉ:</span> {selectedApplicant.address}</div>
                                    <div><span className="font-semibold font-mono">Trường:</span> {selectedApplicant.school}</div>
                                    <div><span className="font-semibold font-mono">Năm tốt nghiệp:</span> {selectedApplicant.graduationYear}</div>
                                    <div><span className="font-semibold font-mono">Campus:</span> {selectedApplicant.campus}</div>
                                    <div><span className="font-semibold font-mono">Ngành học:</span> {selectedApplicant.interestedAcademicField}</div>
                                    <div><span className="font-semibold font-mono">Điểm Toán:</span> {selectedApplicant.mathScore}</div>
                                    <div><span className="font-semibold font-mono">Điểm Văn:</span> {selectedApplicant.literatureScore}</div>
                                    <div><span className="font-semibold font-mono">Điểm Anh:</span> {selectedApplicant.englishScore}</div>
                                    <div className="md:col-span-2"><span className="font-semibold">Trạng Thái Hồ Sơ:</span> <StatusBadge status={selectedApplicant.status} /></div>
                                </div>
                                <div className="mt-8 text-right">
                                    <button
                                        onClick={closeModal}
                                        className="px-5 py-2 rounded-xl bg-orange-500 text-white hover:bg-orange-600 transition duration-300"
                                    >
                                        Đóng
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 border-t-8 border-red-500 animate-fade-in-up">
                        <h2 className="text-xl font-bold mb-4 text-red-600 text-center">Xác nhận xóa hồ sơ</h2>
                        <p className="mb-6 text-center">Bạn có chắc chắn muốn xóa hồ sơ này không?</p>
                        <div className="flex justify-end gap-2">
                            <button onClick={cancelDelete} className="px-4 py-2 rounded bg-gray-300 text-gray-700 hover:bg-gray-400">Hủy</button>
                            <button onClick={confirmDelete} className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600">Xóa</button>
                        </div>
                    </div>
                </div>
            )}

        </div >
    );
};

export default ConsultingApplicationForm;
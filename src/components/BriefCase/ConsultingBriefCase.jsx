import React, { useEffect, useState } from "react";
import { Search, Trash2, Edit, CheckCircle, Loader2, Briefcase, Delete, View } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ConsultingBriefCase = () => {
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


    const fetchBriefcases = async (page = 1) => {
        setLoading(true);
        setError("");
        try {
            const res = await axios.get("http://localhost:8080/bookings/get-all-bookings?status=Waiting", {
                params: {
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
        fetchBriefcases(currentPage);
    }, [currentPage]);


    const handleShowList = async () => {
        setLoading(true);
        setError("");
        try {
            await fetchBriefcases(1); // lấy trang đầu tiên
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



    const ResolveBriefcase = async (bookingId) => {
        const token = localStorage.getItem("token");
        const userRole = localStorage.getItem("role");
        if (userRole != 'Consultant') {
            alert("Bạn không có quyền xử lý hồ sơ này.");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:8080/bookings/claim-consult-booking",
                {
                    bookingId: bookingId,

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
                fetchBriefcases(); // gọi lại list
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
            const response = await axios.get("http://localhost:8080/bookings/get-all-bookings", {
                params: {
                    claimedByConsultantId: consultantId, // ✅ truyền ID vào query param
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const claimedInProgress = (response.data?.data?.items || []).filter(
                (booking) => booking.status === "InProgress"
            );

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

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}

            <aside className="w-64 bg-orange-600 text-white flex flex-col py-6 px-10">
                <div className="mb-10">
                    <div className="text-2xl font-bold mb-2 flex items-center gap-2">
                        <Briefcase size={32} className="inline" /> Quản Lý Hồ Sơ Đăng Ký Tư Vấn
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
                    <h2 className="text-3xl font-bold mb-6 text-orange-600">Danh Sách Hồ Sơ Đăng Ký Tư Vấn</h2>

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
                                    <th className="p-3 text-left">Tỉnh/Thành Phố</th>
                                    <th className="p-3 text-left">Ngành Học</th>
                                    <th className="p-3 text-left">Campus</th>
                                    <th className="p-3 text-left">Lý Do Đăng Ký</th>
                                    <th className="p-3 text-left">Trạng Thái Hồ Sơ</th>

                                    <th className="p-3 text-left">Xử Lý Hồ Sơ</th>
                                </tr>
                            </thead>

                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={6} className="text-center py-8">
                                            <Loader2 className="animate-spin inline mr-2" /> Đang tải...
                                        </td>
                                    </tr>
                                ) : applicants.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="text-center py-8 text-gray-500">
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
                                            <td className="p-3">{applicant.location}</td>
                                            <td className="p-3">{applicant.interestedSpecialization}</td>
                                            <td className="p-3">{applicant.interestedCampus}</td>
                                            <td className="p-3">{applicant.reason}</td>
                                            <td className="p-3"><StatusBadge status={applicant.status} /></td>

                                            <td className="p-3">
                                                <button
                                                    onClick={() => ResolveBriefcase(applicant.id)}
                                                    className="bg-orange-500 hover:bg-orange-600 transition text-white px-4 py-2 rounded flex items-center gap-2"
                                                >
                                                    <Edit size={18} /> Xử lý hồ sơ
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
                                            <td className="p-3">{booking.interestedSpecialization}</td>
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
            {showModal && selectedApplicant && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 border-t-8 border-orange-500 animate-fade-in-up">
                        <div className="flex items-center justify-center mb-4 ">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/FPT_Education_logo.svg/2560px-FPT_Education_logo.svg.png"
                                alt="FPT Education Logo"
                                className="h-16 w-auto contrast-100 saturate-100"
                                style={{ backgroundColor: 'transparent' }} // Đảm bảo logo có nền trong suốt

                            />
                        </div>
                        <h2 className="text-2xl font-bold mb-6 text-orange-600 text-center">CHI TIẾT HỒ SƠ ĐĂNG KÝ TƯ VẤN</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-800">
                            <div><span className="font-semibold font-mono">Họ và Tên:</span> {selectedApplicant.userFullName}</div>
                            <div><span className="font-semibold font-mono">Email:</span> {selectedApplicant.userEmail}</div>
                            <div><span className="font-semibold font-mono">Số Điện Thoại:</span> {selectedApplicant.userPhoneNumber}</div>
                            <div><span className="font-semibold font-mono">Tỉnh/Thành Phố:</span> {selectedApplicant.location}</div>
                            <div><span className="font-semibold font-mono">Ngành Học Quan Tâm:</span> {selectedApplicant.interestedSpecialization}</div>
                            <div><span className="font-semibold font-mono">Campus Đăng Ký:</span> {selectedApplicant.interestedCampus}</div>
                            <div className="md:col-span-2"><span className="font-semibold">Lý Do Đăng Ký:</span> {selectedApplicant.reason}</div>
                            <div className="md:col-span-2"><span className="font-semibold">
                                Trạng Thái Hồ Sơ:</span> <StatusBadge status={selectedApplicant.status} /></div>

                        </div>

                        <div className="mt-8 text-right">
                            <button
                                onClick={closeModal}
                                className="px-5 py-2 rounded-xl bg-orange-500 text-white hover:bg-orange-600 transition duration-300"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}



        </div >
    );
};

export default ConsultingBriefCase;
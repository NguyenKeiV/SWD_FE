import React, { useEffect, useState } from "react";
import { Search, Trash2, Edit, CheckCircle, Loader2, Briefcase, Delete, View } from "lucide-react";
import axios from "axios";

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


    const STAGES = [
        { value: "pending", label: "Đang chờ" },
        { value: "confirmed", label: "Đã xác nhận tư vấn" },
        { value: "completed", label: "Hoàn thành" },
        { value: "removed", label: "Loại bỏ" },
    ];

    const fetchBriefcases = async (page = 1) => {
        setLoading(true);
        setError("");
        try {
            const res = await axios.get("http://localhost:8080/bookings/get-all-bookings", {
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


    // // Search handler
    // const handleSearch = async (e) => {
    //     e.preventDefault();
    //     fetchBriefcases();
    // };

    // // Delete handler
    // const handleDelete = async (id) => {
    //     if (!window.confirm("Bạn có chắc chắn muốn xóa hồ sơ này?")) return;
    //     setLoading(true);
    //     setError("");
    //     try {
    //         await axios.delete(`/api/consulting-briefcase/${id}`);
    //         setSuccess("Đã xóa hồ sơ thành công.");
    //         fetchBriefcases();
    //     } catch (err) {
    //         setError("Xóa hồ sơ thất bại.");
    //     }
    //     setLoading(false);
    // };

    // // Edit stage handler
    // const handleEditStage = (id, currentStage) => {
    //     setEditId(id);
    //     setEditStage(currentStage);
    // };

    // const handleUpdateStage = async (id) => {
    //     setLoading(true);
    //     setError("");
    //     try {
    //         await axios.put(`/api/consulting-briefcase/${id}/stage`, { stage: editStage });
    //         setSuccess("Cập nhật trạng thái thành công.");
    //         setEditId(null);
    //         fetchBriefcases();
    //     } catch (err) {
    //         setError("Cập nhật trạng thái thất bại.");
    //     }
    //     setLoading(false);
    // };

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}

            <aside className="w-64 bg-orange-600 text-white flex flex-col py-6 px-4">
                <div className="mb-10">
                    <div className="text-2xl font-bold mb-2 flex items-center gap-2">
                        <Briefcase className="inline" /> Quản lý hồ sơ đăng ký tư vấn
                    </div>
                </div>
                <button
                    className="flex flex-col gap-2"
                    onClick={() => {
                        setSelectedApplicant(true);
                        handleShowList();
                    }}
                >
                    <div className="bg-orange-500 rounded px-3 py-2 font-semibold flex items-center gap-2" >
                        <View size={20} /> Xem danh sách hồ sơ
                    </div>
                </button>

                <button className="flex flex-col gap-2 mt-2">
                    <div className="bg-orange-500 rounded px-3 py-2 font-semibold flex items-center gap-2">
                        <Edit size={20} /> Cập nhật hồ sơ
                    </div>
                </button>

                <button className="flex flex-col gap-2 mt-2">
                    <div className="bg-orange-500 rounded px-3 py-2 font-semibold flex items-center gap-2">
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

            {selectedApplicant && (
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
                    <div className="overflow-x-auto bg-white rounded-xl shadow">
                        <table className="min-w-full text-sm">
                            {/* ...thead... */}
                            <thead>
                                <tr className="bg-orange-100 text-gray-700">
                                    <th className="p-3 text-left">ID</th>
                                    <th className="p-3 text-left">Mã hồ sơ</th>
                                    <th className="p-3 text-left">Họ và tên</th>
                                    <th className="p-3 text-left">Email</th>
                                    <th className="p-3 text-left">Số điện thoại</th>
                                    <th className="p-3 text-left">Lý do đăng ký</th>
                                    <th className="p-3 text-left">Trạng thái hồ sơ</th>
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
                                            <td className="p-3">{applicant.userFullName}</td>
                                            <td className="p-3">{applicant.userEmail}</td>
                                            <td className="p-3">{applicant.userPhoneNumber}</td>
                                            <td className="p-3">{applicant.reason}</td>
                                            <td className="p-3">{applicant.status}</td>
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
        </div >
    );
};

export default ConsultingBriefCase;
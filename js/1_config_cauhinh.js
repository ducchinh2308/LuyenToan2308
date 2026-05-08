// =====================================================================
// 📦 KHỐI 1: CẤU HÌNH HỆ THỐNG & BIẾN TOÀN CỤC (CORE CONFIG & STATE)
// =====================================================================

// ---------------------------------------------------------------------
// 1.1. KẾT NỐI MÁY CHỦ SUPABASE (Thay thế hoàn toàn Firebase)
// ---------------------------------------------------------------------
// Sử dụng "Chìa khóa xanh" (Anon Public Key) an toàn tuyệt đối
const SUPABASE_URL = 'https://ffjrjgujzhkjetqyuska.supabase.co';
const SUPABASE_KEY = 'sb_publishable_SB93ie45-i5-iDFiIuOtNQ_jMvMT8Xt';

// Khởi tạo đối tượng supabase toàn cục để 4 file còn lại xài chung
window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// BẪY LỖI TOÀN CỤC CHỐNG MÀN HÌNH TRẮNG (Đã nâng cấp hiện đại hơn)
window.onerror = function (message, source, lineno, colno, error) {
    console.error("❌ LỖI HỆ THỐNG:", message, "tại dòng", lineno);
    // Chỉ hiện thông báo nếu lỗi không phải từ các thư viện bên thứ 3 (như MathJax)
    if (source && source.includes("js/")) {
        alert(`⚠️ HỆ THỐNG PHÁT HIỆN LỖI CODE:\n\nChi tiết: ${message}\nTại file: ${source}\nDòng số: ${lineno}\n\nVui lòng báo lại Thầy Chính hoặc F12 xem chi tiết!`);
    }
    return true;
};

// ---------------------------------------------------------------------
// 1.2. KHAI BÁO BIẾN TRẠNG THÁI HỆ THỐNG (SYSTEM STATE)
// ---------------------------------------------------------------------
// 🌟 Mẹo thông minh cũ: Giả lập SĐT thành Email để Auth dễ dàng
const SYSTEM_DOMAIN = "@thaychinh.edu.vn";
let isLoginMode = true;                   // Trạng thái Form: true = Đăng nhập, false = Đăng ký

// Các biến quản lý dữ liệu Admin/Giáo viên
window.khoCauHoiAdmin = new Map();        // Bộ nhớ tạm chứa toàn bộ câu hỏi (dùng Map để truy xuất siêu tốc)
window.lopHocDangChon = null;             // Lưu ID của lớp học đang được click xem chi tiết ở Admin

// Các biến quản lý dữ liệu Phòng thi của Học sinh
window.toanBoDuLieu = [];                 // (Dự phòng) Mảng chứa dữ liệu thô
window.treeData = {};                     // (Dự phòng) Cây dữ liệu phân cấp
window.duLieuDeHienTai = [];              // Mảng chứa chi tiết các câu hỏi của đề đang làm
window.tongSoCauDeHienTai = 0;            // Tổng số câu trong đề
window.soCauDaLam = 0;                    // Số câu học sinh đã tick chọn
window.baiDaNop = false;                  // Cờ đánh dấu học sinh đã nộp bài chưa
window.thongTinDeHienTai = null;          // Object chứa vỏ cấu hình của đề đang làm (thời gian, id, tên...)
window.idKetQuaDangLam = null;            // Lưu ID của bài thi trên Database để chốt điểm

// Các biến quản lý Thời gian làm bài
window.timerInterval = null;              // Biến chứa bộ đếm ngược (để clearInterval khi nộp)
window.thoiGianConLai = 0;                // Số giây còn lại của bài thi
window.thoiDiemBatDauLamBai = 0;          // Timestamp lúc bấm Bắt đầu (để tính thời gian làm thực tế)

// ---------------------------------------------------------------------
// 1.3. KHAI BÁO CÁC PHẦN TỬ GIAO DIỆN CHÍNH (DOM ELEMENTS)
// ---------------------------------------------------------------------
// Khung bố cục chính
const khungDangNhap = document.getElementById('khung-dang-nhap');
const khungDeThi = document.getElementById('khung-de-thi');

// Menu góc phải trên cùng (Thông tin User & Nút tiện ích)
const statusText = document.getElementById('status');
const btnLogout = document.getElementById('btnLogout');

// ---------------------------------------------------------------------
// 1.4. KHAI BÁO CÁC PHẦN TỬ FORM ĐĂNG NHẬP / ĐĂNG KÝ
// ---------------------------------------------------------------------
const formTitle = document.getElementById('form-title');
const loginError = document.getElementById('login-error');
const linkToggleAuth = document.getElementById('link-toggle-auth');
const btnSubmitAuth = document.getElementById('btnSubmitAuth');

// Các ô Input cơ bản
const txtPhone = document.getElementById('txtPhone');
const txtPassword = document.getElementById('txtPassword');
const btnTogglePassword = document.getElementById('btnTogglePassword');

// Các ô Input dành riêng cho Đăng ký mới
const txtHoTen = document.getElementById('txtHoTen');
const txtRealEmail = document.getElementById('txtRealEmail');
const txtConfirmPassword = document.getElementById('txtConfirmPassword');
const groupConfirmPassword = document.getElementById('group-confirm-password');
const btnToggleConfirmPassword = document.getElementById('btnToggleConfirmPassword');

// Nhóm chọn Vai trò (Giáo viên / Học sinh)
const groupChonVaiTro = document.getElementById('group-chon-vai-tro');
const radVaiTros = document.getElementsByName('radVaiTro');
const msgGvWarning = document.getElementById('msg-gv-warning');

// Nhóm thông tin Học sinh / Lớp học
const groupThongTinTruong = document.getElementById('group-thong-tin-truong');
const txtTruong = document.getElementById('txtTruong');
const txtTinh = document.getElementById('txtTinh');
const txtLop = document.getElementById('txtLop');     // Khối lớp (10, 11, 12)
const txtMaLop = document.getElementById('txtMaLop'); // Mã lớp gia nhập (4 ký tự)

// 🚀 Nâng cấp nhỏ: Báo kết nối thành công trong Console (F12) để dễ theo dõi
console.log("%c✅ HỆ THỐNG ĐÃ KHỞI ĐỘNG VÀ KẾT NỐI SUPABASE THÀNH CÔNG!", "color: #27ae60; font-size: 14px; font-weight: bold;");
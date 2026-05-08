// =====================================================================
// 📦 KHỐI 1: CẤU HÌNH HỆ THỐNG & BIẾN TOÀN CỤC (CORE CONFIG & STATE)
// =====================================================================

// ---------------------------------------------------------------------
// 1.1. KẾT NỐI MÁY CHỦ SUPABASE (Thay thế hoàn toàn Firebase)
// ---------------------------------------------------------------------
const SUPABASE_URL = 'https://ffjrjgujzhkjetqyuska.supabase.co';
const SUPABASE_KEY = 'sb_publishable_SB93ie45-i5-iDFiIuOtNQ_jMvMT8Xt';

// Khởi tạo đối tượng supabase toàn cục để 4 file còn lại xài chung
window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// BẪY LỖI TOÀN CỤC CHỐNG MÀN HÌNH TRẮNG
window.onerror = function (message, source, lineno, colno, error) {
    console.error("❌ LỖI HỆ THỐNG:", message, "tại dòng", lineno);
    if (source && source.includes("js/")) {
        alert(`⚠️ HỆ THỐNG PHÁT HIỆN LỖI CODE:\n\nChi tiết: ${message}\nTại file: ${source}\nDòng số: ${lineno}\n\nVui lòng báo lại Thầy Chính hoặc F12 xem chi tiết!`);
    }
    return true;
};

// ---------------------------------------------------------------------
// 1.2. KHAI BÁO BIẾN TRẠNG THÁI HỆ THỐNG (SYSTEM STATE)
// ---------------------------------------------------------------------
const SYSTEM_DOMAIN = "@thaychinh.edu.vn";
let isLoginMode = true;

// Các biến quản lý dữ liệu Admin/Giáo viên
window.khoCauHoiAdmin = new Map();
window.lopHocDangChon = null;

// Các biến quản lý dữ liệu Phòng thi của Học sinh
window.toanBoDuLieu = [];
window.treeData = {};
window.duLieuDeHienTai = [];
window.tongSoCauDeHienTai = 0;
window.soCauDaLam = 0;
window.baiDaNop = false;
window.thongTinDeHienTai = null;
window.idKetQuaDangLam = null;

// Các biến quản lý Thời gian làm bài
window.timerInterval = null;
window.thoiGianConLai = 0;
window.thoiDiemBatDauLamBai = 0;

// ---------------------------------------------------------------------
// 1.3. KHAI BÁO CÁC PHẦN TỬ GIAO DIỆN CHÍNH (DOM ELEMENTS)
// ---------------------------------------------------------------------
const khungDangNhap = document.getElementById('khung-dang-nhap');
const khungDeThi = document.getElementById('khung-de-thi');
const statusText = document.getElementById('status');
const btnLogout = document.getElementById('btnLogout');

// ---------------------------------------------------------------------
// 1.4. KHAI BÁO CÁC PHẦN TỬ FORM ĐĂNG NHẬP / ĐĂNG KÝ
// ---------------------------------------------------------------------
const formTitle = document.getElementById('form-title');
const loginError = document.getElementById('login-error');
const linkToggleAuth = document.getElementById('link-toggle-auth');
const btnSubmitAuth = document.getElementById('btnSubmitAuth');

const txtPhone = document.getElementById('txtPhone');
const txtPassword = document.getElementById('txtPassword');
const btnTogglePassword = document.getElementById('btnTogglePassword');

const txtHoTen = document.getElementById('txtHoTen');
const txtRealEmail = document.getElementById('txtRealEmail');
const txtConfirmPassword = document.getElementById('txtConfirmPassword');
const groupConfirmPassword = document.getElementById('group-confirm-password');
const btnToggleConfirmPassword = document.getElementById('btnToggleConfirmPassword');

const groupChonVaiTro = document.getElementById('group-chon-vai-tro');
const radVaiTros = document.getElementsByName('radVaiTro');
const msgGvWarning = document.getElementById('msg-gv-warning');

const groupThongTinTruong = document.getElementById('group-thong-tin-truong');
const txtTruong = document.getElementById('txtTruong');
const txtTinh = document.getElementById('txtTinh');
const txtLop = document.getElementById('txtLop');
const txtMaLop = document.getElementById('txtMaLop');

console.log("%c✅ HỆ THỐNG ĐÃ KHỞI ĐỘNG VÀ KẾT NỐI SUPABASE THÀNH CÔNG!", "color: #27ae60; font-size: 14px; font-weight: bold;");

// =====================================================================
// 🚀 BỔ SUNG: GẮN SỰ KIỆN NÚT BẤM ĐĂNG NHẬP / ĐĂNG KÝ (SUPABASE AUTH)
// =====================================================================

// 1. Chuyển đổi giữa Form Đăng nhập và Đăng ký
if (linkToggleAuth) {
    linkToggleAuth.addEventListener('click', (e) => {
        e.preventDefault();
        isLoginMode = !isLoginMode;
        loginError.style.display = "none";

        if (isLoginMode) {
            formTitle.innerText = "ĐĂNG NHẬP";
            if (txtRealEmail) txtRealEmail.style.display = "none";
            if (txtHoTen) txtHoTen.style.display = "none";
            if (groupConfirmPassword) groupConfirmPassword.style.display = "none";
            if (groupChonVaiTro) groupChonVaiTro.style.display = "none";
            if (groupThongTinTruong) groupThongTinTruong.style.display = "none";
            if (txtMaLop && txtMaLop.parentElement) txtMaLop.parentElement.style.display = "none";

            btnSubmitAuth.innerText = "ĐĂNG NHẬP";
            linkToggleAuth.innerText = "Chưa có tài khoản? Đăng ký ngay";
        } else {
            formTitle.innerText = "ĐĂNG KÝ TÀI KHOẢN";
            if (txtRealEmail) txtRealEmail.style.display = "block";
            if (txtHoTen) txtHoTen.style.display = "block";
            if (groupConfirmPassword) groupConfirmPassword.style.display = "block";
            if (groupChonVaiTro) groupChonVaiTro.style.display = "block";

            const currentRole = document.querySelector('input[name="radVaiTro"]:checked')?.value || 'hocsinh';
            if (groupThongTinTruong) groupThongTinTruong.style.display = (currentRole === 'giaovien') ? 'none' : 'flex';
            if (txtMaLop && txtMaLop.parentElement) txtMaLop.parentElement.style.display = (currentRole === 'giaovien') ? 'none' : 'block';

            btnSubmitAuth.innerText = "ĐĂNG KÝ";
            linkToggleAuth.innerText = "Đã có tài khoản? Đăng nhập";
        }
    });
}

// 2. Logic tắt mở thông tin trường lớp khi chọn Giáo Viên
if (radVaiTros) {
    radVaiTros.forEach(rad => {
        rad.addEventListener('change', (e) => {
            const isGiaoVien = (e.target.value === 'giaovien');
            if (msgGvWarning) msgGvWarning.style.display = isGiaoVien ? 'block' : 'none';
            if (groupThongTinTruong) groupThongTinTruong.style.display = isGiaoVien ? 'none' : 'flex';
            if (txtMaLop && txtMaLop.parentElement) txtMaLop.parentElement.style.display = isGiaoVien ? 'none' : 'block';
        });
    });
}

// 3. Ẩn/Hiện mật khẩu
if (btnTogglePassword && txtPassword) {
    btnTogglePassword.addEventListener('click', function () {
        const type = txtPassword.getAttribute('type') === 'password' ? 'text' : 'password';
        txtPassword.setAttribute('type', type);
        this.innerText = type === 'password' ? '👁️' : '🙈';
    });
}
if (btnToggleConfirmPassword && txtConfirmPassword) {
    btnToggleConfirmPassword.addEventListener('click', function () {
        const type = txtConfirmPassword.getAttribute('type') === 'password' ? 'text' : 'password';
        txtConfirmPassword.setAttribute('type', type);
        this.innerText = type === 'password' ? '👁️' : '🙈';
    });
}

// 4. XỬ LÝ NÚT BẤM ĐĂNG NHẬP / ĐĂNG KÝ VỚI SUPABASE (BẢN CHỐNG KẸT)
if (btnSubmitAuth) {
    btnSubmitAuth.addEventListener('click', async () => {
        try {
            const phone = txtPhone.value.replace(/\s+/g, '');
            const pass = txtPassword.value;
            const realEmail = txtRealEmail ? txtRealEmail.value.trim() : "";

            if (!phone || !pass) {
                loginError.innerText = "Vui lòng nhập đủ SĐT và Mật khẩu!";
                loginError.style.display = 'block';
                return;
            }
            if (pass.length < 6) {
                loginError.innerText = "Mật khẩu phải từ 6 ký tự!";
                loginError.style.display = 'block';
                return;
            }

            const supabaseEmail = phone + SYSTEM_DOMAIN;
            btnSubmitAuth.innerText = "⏳ Đang xử lý...";
            btnSubmitAuth.disabled = true;
            loginError.style.display = 'none';

            if (isLoginMode) {
                // === THỰC HIỆN ĐĂNG NHẬP ===
                const { data, error } = await window.supabaseClient.auth.signInWithPassword({
                    email: supabaseEmail, password: pass
                });

                if (error) throw error;

                btnSubmitAuth.innerText = "ĐĂNG NHẬP";
                btnSubmitAuth.disabled = false;
                txtPassword.value = "";

            } else {
                // === THỰC HIỆN ĐĂNG KÝ ===
                const hoTen = txtHoTen ? txtHoTen.value.trim() : "";
                if (!hoTen) throw new Error("Vui lòng nhập Họ tên!");
                if (pass !== (txtConfirmPassword ? txtConfirmPassword.value : "")) throw new Error("Mật khẩu nhập lại không khớp!");

                let roleChon = document.querySelector('input[name="radVaiTro"]:checked')?.value || 'hocsinh';
                const tinh = txtTinh ? txtTinh.value.trim() : "";
                const truong = (txtTruong && roleChon === "hocsinh") ? txtTruong.value.trim() : "";
                const khoiLopHienTai = (txtLop && roleChon === "hocsinh") ? txtLop.value.trim() : "";
                let maLopNhap = (txtMaLop && roleChon === "hocsinh") ? txtMaLop.value.trim().toUpperCase() : "";
                let tenLopXinVao = "";

                if (roleChon === "hocsinh") {
                    if (maLopNhap === "") throw new Error("Bạn bắt buộc phải nhập Mã Lớp!");
                    // Sửa tên bảng LopHoc -> lop_hoc, cột maLop -> ma_lop
                    const { data: docLopRef, error: errLop } = await window.supabaseClient.from("lop_hoc").select("*").eq("ma_lop", maLopNhap).single();
                    if (errLop || !docLopRef) throw new Error(`Mã lớp [${maLopNhap}] không tồn tại!`);
                    tenLopXinVao = docLopRef.ten_lop || maLopNhap;
                }

                const { data: authData, error: authErr } = await window.supabaseClient.auth.signUp({
                    email: supabaseEmail, password: pass
                });

                if (authErr) throw authErr;

                if (authData.user) {
                    let trangThaiBanDau = (roleChon === "giaovien") ? "chopheduyet" : "dapheduyet";

                    // Sửa tên bảng HocSinh -> hoc_sinh và các cột snake_case
                    const { error: errInsert } = await window.supabaseClient.from("hoc_sinh").insert([{
                        uid: authData.user.id,
                        ten: hoTen,
                        sdt: phone,
                        email_lien_he: realEmail,
                        truong: truong,
                        tinh: tinh,
                        khoi_lop: khoiLopHienTai,
                        ngay_dang_ky: new Date().toISOString(),
                        vai_tro: roleChon,
                        trang_thai: trangThaiBanDau,
                        mat_khau: pass,
                        loai_tai_khoan: "CoLop",
                        danh_sach_ma_lop: []
                    }]);

                    if (errInsert) throw errInsert;

                    if (roleChon === "hocsinh" && maLopNhap !== "") {
                        const reqId = `${authData.user.id}_${maLopNhap}_xinvaolop`;
                        // Sửa tên bảng YeuCauHocSinh -> yeu_cau_hoc_sinh và các cột snake_case
                        await window.supabaseClient.from("yeu_cau_hoc_sinh").insert([{
                            id: reqId,
                            uid_hoc_sinh: authData.user.id,
                            ten_hoc_sinh: hoTen,
                            ma_lop: maLopNhap,
                            ten_de: tenLopXinVao,
                            loai_yeu_cau: 'xinvaolop',
                            ly_do: `Học sinh đăng ký tài khoản mới`,
                            trang_thai: 0
                        }]);
                    }

                    if (trangThaiBanDau === "chopheduyet") {
                        alert("✅ Đăng ký thành công!\n⏳ Tài khoản đang chờ Admin phê duyệt.");
                    } else {
                        alert(`🎉 Chào mừng ${hoTen}! Đăng ký thành công.\n⏳ Yêu cầu xin vào lớp [${tenLopXinVao}] đã được gửi.`);
                    }
                    await window.supabaseClient.auth.signOut();
                    isLoginMode = true;
                    if (linkToggleAuth) linkToggleAuth.click();
                    btnSubmitAuth.innerText = "ĐĂNG NHẬP"; btnSubmitAuth.disabled = false;
                }
            }
        } catch (err) {
            btnSubmitAuth.innerText = isLoginMode ? "ĐĂNG NHẬP" : "ĐĂNG KÝ";
            btnSubmitAuth.disabled = false;

            let msg = err.message;
            if (msg.includes("Invalid login")) msg = "Sai Số điện thoại hoặc Mật khẩu!";
            else if (msg.includes("already registered")) msg = "Số điện thoại này đã được sử dụng!";
            else if (msg.includes("rate limit")) msg = "Hệ thống đang bận, vui lòng thử lại sau 1 phút!";

            loginError.innerText = "❌ Lỗi: " + msg;
            loginError.style.display = 'block';
        }
    });
}
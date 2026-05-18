// Đặt dòng này ở DÒNG SỐ 1 của file app.js
const APP_VERSION = "app.js cập nhật lúc 19h18 - Ngày 13/05";

// In ra cửa sổ F12 (Console) với màu nền nổi bật để đập ngay vào mắt
console.log(`%c🚀 ĐANG CHẠY KHỐI 1-7 BẢN: ${APP_VERSION}`, "background: #d35400; color: white; font-size: 14px; padding: 5px; font-weight: bold;");

// Nếu thầy lười mở F12, thầy có thể cho nó in luôn một dòng chữ mờ mờ ở góc dưới màn hình:
window.onload = () => {
    let versionBadge = document.createElement('div');
    versionBadge.innerHTML = `Phiên bản: ${APP_VERSION}`;
    versionBadge.style.cssText = "position: fixed; bottom: 5px; right: 5px; font-size: 11px; color: #aaa; z-index: 9999;";
    document.body.appendChild(versionBadge);
};


// ==============================================================================
// KHỐI 0: CẤU HÌNH & TRẠNG THÁI (CONFIG & STATE)
// ==============================================================================
const AppState = {
    isLoginMode: true, // true = Đang ở màn hình Đăng nhập, false = Đăng ký
    role: 'hocsinh',   // Vai trò mặc định đang chọn
};

// Khởi tạo kết nối Supabase (Thầy thay Key thật của thầy vào đây)
const SUPABASE_URL = 'https://ffjrjgujzhkjetqyuska.supabase.co';
const SUPABASE_KEY = 'sb_publishable_SB93ie45-i5-iDFiIuOtNQ_jMvMT8Xt';
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);


const LINK_GITHUB_GOC = "https://ducchinh2308.github.io/LuyenToan2308/";


// ==============================================================================
// KHỐI 1: DỰNG GIAO DIỆN & CSS (UI BUILDER)
// ==============================================================================

// Hàm 1.1: Bơm toàn bộ CSS vào trang
function ham_1_1_nhung_css() {
    console.log("Đang vào hàm ham_1_1_nhung_css");
    const cssContent = `
        body { font-family: 'Roboto', sans-serif; padding: 10px 20px; line-height: 1.5; background-color: #f0f2f5; color: #2c3e50; margin: 0;}
        .header-section { text-align: center; margin-bottom: 10px; }
        .header-section h1 { color: #0056b3; margin: 0; font-weight: 900; font-size: 28px; letter-spacing: 0.5px; }
        .header-section h3 { color: #d35400; margin: 5px 0 0 0; font-size: 16px; font-weight: 700; }
        .status-bar { text-align: center; margin-bottom: 10px; font-size: 14px; }
        #status { font-weight: bold; color: #28a745; }
        #btnLogout { display: none; margin-left: 10px; padding: 4px 12px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; font-size: 12px; }
        #khung-dang-nhap { max-width: 400px; margin: 10px auto; padding: 20px 25px; background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
        #khung-dang-nhap h2 { color: #000080; text-align: center; margin: 0 0 5px 0; font-size: 22px; font-weight: 900; }
        #khung-dang-nhap p { text-align: center; color: #6c757d; font-size: 13px; margin: 0 0 12px 0; }
        input[type="text"], input[type="email"], input[type="password"] { width: 100%; padding: 10px; margin-bottom: 10px; border: 1px solid #ccc; border-radius: 6px; box-sizing: border-box; font-size: 14px; font-family: 'Roboto', sans-serif; transition: border-color 0.2s; }
        input:focus { outline: none; border-color: #0056b3; }
        #group-chon-vai-tro { display: none; margin-bottom: 10px; text-align: left; background: #ffffff; padding: 10px 12px; border-radius: 6px; border: 1px solid #ddd; }
        .role-label { font-weight: bold; color: #495057; display: block; margin-bottom: 6px; font-size: 13px; }
        .role-options { display: flex; gap: 20px; font-size: 13px; }
        .role-option { cursor: pointer; display: flex; align-items: center; gap: 5px; }
        #btnSubmitAuth { width: 100%; padding: 11px; background: #0056b3; color: white; border: none; border-radius: 6px; font-weight: bold; font-size: 15px; cursor: pointer; transition: background 0.2s, transform 0.1s; }
        #btnSubmitAuth:hover { background: #004494; }
        #btnSubmitAuth:active { transform: scale(0.98); }
        .auth-toggle { text-align: center; margin-top: 15px; font-size: 14px; }
        #link-toggle-auth { color: #d35400; text-decoration: none; font-weight: bold; }
        #link-toggle-auth:hover { text-decoration: underline; }
        .eye-toggle { position: absolute; right: 10px; top: 38%; transform: translateY(-50%); cursor: pointer; font-size: 16px; color: #6c757d; user-select: none; }
    `;
    const styleSheet = document.createElement("style");
    styleSheet.innerText = cssContent;
    document.head.appendChild(styleSheet);
}

// Hàm 1.2: Dựng bộ khung HTML lõi vào thẻ <div id="app">
function ham_1_2_dung_khung_html() {
    console.log("Đang vào hàm 1_2");
    const htmlContent = `
        <div class="header-section">
            <h1>ÔN LUYỆN TOÁN</h1>
            <h3>THẦY CHÍNH - THPT GIA ĐỊNH - 0987979648</h3>
        </div>

        <div class="status-bar">
            <span id="status">Đang kết nối hệ thống...</span>
            <button id="btnLogout" onclick="ham_2_5_xu_ly_dang_xuat()">Đăng xuất</button>
        </div>

        <div id="khung-dang-nhap">
            <h2 id="form-title">ĐĂNG NHẬP</h2>
            <p id="form-subtitle">Chào mừng bạn trở lại phòng thi</p>

            <input type="text" id="txtPhone" placeholder="Số điện thoại của bạn">
            <input type="text" id="txtHoTen" placeholder="Họ và tên" style="display: none;">

            <div id="group-chon-vai-tro">
                <label class="role-label">Bạn đăng ký với vai trò:</label>
                <div class="role-options">
                    <label class="role-option">
                        <input type="radio" name="radVaiTro" value="hocsinh" checked onchange="ham_2_2_thay_doi_vai_tro(this.value)"> 👨‍🎓 Học sinh
                    </label>
                    <label class="role-option">
                        <input type="radio" name="radVaiTro" value="giaovien" onchange="ham_2_2_thay_doi_vai_tro(this.value)"> 👨‍🏫 Giáo viên
                    </label>
                </div>
                <div id="msg-gv-warning" style="display: none; color: #d35400; font-size: 11px; margin-top: 8px; font-style: italic; border-top: 1px dashed #eee; padding-top: 6px;">
                    ⚠️ Tài khoản Giáo viên cần quản trị viên phê duyệt.
                </div>
            </div>

            <div id="group-thong-tin-truong" style="display: none; gap: 10px; margin-bottom: 10px;">
                <input type="text" id="txtLop" placeholder="Khối (VD: 12)" style="flex: 1;">
                <input type="text" id="txtTruong" placeholder="Trường học" style="flex: 2;">
                <input type="text" id="txtTinh" placeholder="Tỉnh/TP" style="flex: 1.5;">
            </div>

            <div id="group-ma-lop" style="display: none; margin-bottom: 15px;">
                <input type="text" id="txtMaLop" placeholder="Nhập Mã Lớp (5 ký tự) do Giáo viên cấp để vào" style="width: 100%; border: 2px solid #28a745; background: #e6f4ea;">
            </div>

            <input type="email" id="txtRealEmail" placeholder="Email nhận kết quả bài thi" style="display: none;">

            <div style="position: relative; width: 100%; margin-bottom: 10px;">
                <input type="password" id="txtPassword" placeholder="Mật khẩu (tối thiểu 6 ký tự)" style="margin-bottom: 0;">
                <span id="btnTogglePassword" class="eye-toggle" onclick="ham_2_3_an_hien_mat_khau('txtPassword')">👁️</span>
            </div>

            <div id="group-confirm-password" style="position: relative; width: 100%; margin-bottom: 12px; display: none;">
                <input type="password" id="txtConfirmPassword" placeholder="Xác nhận lại mật khẩu" style="margin-bottom: 0;">
                <span id="btnToggleConfirmPassword" class="eye-toggle" onclick="ham_2_3_an_hien_mat_khau('txtConfirmPassword')">👁️</span>
            </div>

            <button id="btnSubmitAuth" onclick="ham_2_4_xu_ly_submit()">VÀO PHÒNG THI</button>

            <p id="login-error" style="color: #dc3545; font-size: 13px; text-align: center; display: none; margin-top: 10px; font-weight: bold;"></p>

            <div class="auth-toggle">
                <a href="#" id="link-toggle-auth" onclick="ham_2_1_chuyen_doi_che_do(); return false;">Chưa có tài khoản? Đăng ký ngay</a>
            </div>
        </div>

        <div id="dashboard-container" style="display: none; width: 100%; max-width: 1400px; margin: 20px auto;"></div>
        <div id="khung-de-thi" style="max-width: 900px; margin: 0 auto; display: none;"></div>
    `;

    document.getElementById('app').innerHTML = htmlContent;
}


// ==============================================================================
// KHỐI 2: XỬ LÝ ĐĂNG NHẬP (DÒ TÌM TRONG SUPABASE)
// ==============================================================================


// Hàm 2.1: Chuyển đổi qua lại giữa Form Đăng nhập và Đăng ký
function ham_2_1_chuyen_doi_che_do() {
    //console.log("Đang vào hàm ham_2_1");
    AppState.isLoginMode = !AppState.isLoginMode; // Lật trạng thái

    // Lấy các element cần ẩn/hiện
    const title = document.getElementById('form-title');
    const subtitle = document.getElementById('form-subtitle');
    const btnSubmit = document.getElementById('btnSubmitAuth');
    const linkToggle = document.getElementById('link-toggle-auth');

    const txtHoTen = document.getElementById('txtHoTen');
    const groupVaiTro = document.getElementById('group-chon-vai-tro');
    const groupTruong = document.getElementById('group-thong-tin-truong');
    const groupMaLop = document.getElementById('group-ma-lop');
    const txtEmail = document.getElementById('txtRealEmail');
    const groupConfirmPass = document.getElementById('group-confirm-password');
    const errorMsg = document.getElementById('login-error');

    errorMsg.style.display = 'none'; // Xóa lỗi cũ nếu có

    if (AppState.isLoginMode) {
        // CHẾ ĐỘ ĐĂNG NHẬP
        title.innerText = "ĐĂNG NHẬP";
        subtitle.innerText = "Chào mừng bạn trở lại phòng thi";
        btnSubmit.innerText = "VÀO PHÒNG THI";
        linkToggle.innerText = "Chưa có tài khoản? Đăng ký ngay";

        // Ẩn các trường không cần thiết
        txtHoTen.style.display = 'none';
        groupVaiTro.style.display = 'none';
        groupTruong.style.display = 'none';
        groupMaLop.style.display = 'none';
        txtEmail.style.display = 'none';
        groupConfirmPass.style.display = 'none';
    } else {
        // CHẾ ĐỘ ĐĂNG KÝ
        title.innerText = "ĐĂNG KÝ TÀI KHOẢN";
        subtitle.innerText = "Tạo tài khoản mới để tham gia hệ thống";
        btnSubmit.innerText = "ĐĂNG KÝ NGAY";
        linkToggle.innerText = "Đã có tài khoản? Đăng nhập";

        // Hiện các trường bắt buộc cho đăng ký
        txtHoTen.style.display = 'block';
        groupVaiTro.style.display = 'block';
        groupConfirmPass.style.display = 'block';
        txtEmail.style.display = 'block';


        // Gọi lại hàm kiểm tra vai trò để hiện đúng các trường phụ thuộc
        ham_2_2_thay_doi_vai_tro(AppState.role);
    }
}

// Hàm 2.2: Xử lý thay đổi giao diện khi chọn Radio Vai trò (Học sinh / Giáo viên)
function ham_2_2_thay_doi_vai_tro(vaiTroMoi) {
    //console.log("Đang vào hàm ham_2_2");
    AppState.role = vaiTroMoi;

    const groupTruong = document.getElementById('group-thong-tin-truong');
    const groupMaLop = document.getElementById('group-ma-lop');
    const msgGvWarning = document.getElementById('msg-gv-warning');

    if (AppState.role === 'hocsinh') {
        groupTruong.style.display = 'flex';
        groupMaLop.style.display = 'block';
        msgGvWarning.style.display = 'none';
    } else {
        // Giáo viên không cần nhập Mã Lớp
        groupTruong.style.display = 'flex';
        groupMaLop.style.display = 'none';
        msgGvWarning.style.display = 'block';
    }
}

// Hàm 2.3: Xử lý icon con mắt Ẩn/Hiện mật khẩu
function ham_2_3_an_hien_mat_khau(inputId) {
    //console.log("Đang vào hàm ham_2_3");
    const input = document.getElementById(inputId);
    if (input.type === 'password') {
        input.type = 'text';
    } else {
        input.type = 'password';
    }
}

// Hàm 2.4: Bắt sự kiện bấm nút Đăng nhập / Đăng ký chính
async function ham_2_4_xu_ly_submit(btnElement) {
    const sdt = document.getElementById('txtPhone').value.trim();
    const pass = document.getElementById('txtPassword').value;
    const errorMsg = document.getElementById('login-error');

    errorMsg.style.display = 'none';

    if (!sdt || !pass) {
        errorMsg.innerText = "Vui lòng nhập Số điện thoại và Mật khẩu!";
        errorMsg.style.display = 'block';
        return;
    }

    if (AppState.isLoginMode) {
        // ====================================================
        // LUỒNG 1: ĐĂNG NHẬP
        // ====================================================
        document.getElementById('status').innerText = `Đang xác thực...`;
        try {
            const { data: userFound, error } = await _supabase
                .from('hoc_sinh')
                .select('*')
                .eq('sdt', sdt)
                .eq('mat_khau', pass)
                .maybeSingle();

            if (error) throw error;
            if (!userFound) throw new Error("Số điện thoại hoặc mật khẩu không đúng!");
            if (userFound.trang_thai === 0) throw new Error("Tài khoản đang bị khóa!");

            AppState.user = userFound;
            AppState.role = userFound.vai_tro;

            // ================================================================
            // BƯỚC MỚI: TẠO CHUỖI ĐỊNH DANH ĐỂ HIỂN THỊ TRÊN TIÊU ĐỀ
            // ================================================================
            let tenVaiTro = '';
            if (AppState.role === 'admin') tenVaiTro = 'Admin';
            else if (AppState.role === 'giaovien') tenVaiTro = 'Giáo viên';
            else tenVaiTro = 'Học sinh';

            // Viết hoa toàn bộ Tên (Ví dụ: HUỲNH ĐỨC CHÍNH)
            let tenInHoa = AppState.user.ten ? AppState.user.ten.toUpperCase() : 'CHƯA CẬP NHẬT TÊN';

            // Ghép chuỗi theo đúng format: Vai trò: TÊN (SĐT)
            let chuoiHienThi = `${tenVaiTro}: ${tenInHoa} (${AppState.user.sdt})`;

            // Nạp chuỗi vào thẻ status (Thay thế chữ Đang xác thực...)
            let lblStatus = document.getElementById('status');
            if (lblStatus) {
                lblStatus.innerText = `👤 ${chuoiHienThi}`;
                lblStatus.style.color = '#1a73e8'; // Đổi sang màu xanh dương cho nổi bật
                lblStatus.style.fontWeight = 'bold'; // In đậm lên cho đẹp
            }
            // ================================================================


            // Cập nhật thời gian đăng nhập cuối vào Database
            await _supabase
                .from('hoc_sinh')
                .update({ lan_dang_nhap_cuoi: new Date().toISOString() })
                .eq('uid', userFound.uid);

            if (AppState.role === 'admin' || AppState.role === 'giaovien') {
                ham_3_1_ve_dashboard_admin();
            } else {

                // ====================================================
                // KÍCH HOẠT GIAO DIỆN HỌC SINH (GỌI KHỐI 8)
                // ====================================================
                // 1. Ẩn form đăng nhập, hiện nút đăng xuất
                document.getElementById('khung-dang-nhap').style.display = 'none';
                document.getElementById('btnLogout').style.display = 'inline-block';
                document.getElementById('dashboard-container').style.display = 'block';

                // 2. 🌟 LẤY TOÀN BỘ DANH SÁCH LỚP CỦA HỌC SINH
                let dsMaLopHocSinh = [];
                if (AppState.user.danh_sach_ma_lop && Array.isArray(AppState.user.danh_sach_ma_lop)) {
                    dsMaLopHocSinh = AppState.user.danh_sach_ma_lop;
                }

                // 3. Gọi hàm tải nhiệm vụ, truyền CẢ MẢNG sang
                ham_8_1_tai_nhiem_vu_cua_toi(AppState.user.uid, dsMaLopHocSinh, AppState.user.ten);

            }
        } catch (error) {
            errorMsg.innerText = error.message;
            errorMsg.style.display = 'block';
            document.getElementById('status').innerText = `Lỗi đăng nhập`;
        }

    } else {
        // ====================================================
        // LUỒNG 2: ĐĂNG KÝ TÀI KHOẢN HỌC SINH
        // ====================================================
        console.log("App: Đang xử lý đăng ký tài khoản");

        // Đọc thông tin từ Form
        const hoTen = document.getElementById('txtHoTen').value.trim();
        const passConfirm = document.getElementById('txtConfirmPassword').value;

        const khoi = document.getElementById('txtLop') ? document.getElementById('txtLop').value : '';
        const tinh = document.getElementById('txtTinh') ? document.getElementById('txtTinh').value.trim() : '';
        const truong = document.getElementById('txtTruong') ? document.getElementById('txtTruong').value.trim() : '';
        const maLopVao = document.getElementById('txtMaLop') ? document.getElementById('txtMaLop').value.trim().toUpperCase() : '';
        console.log(maLopVao);



        // 1. Kiểm tra tính hợp lệ
        if (!hoTen || !tinh || !truong) {
            errorMsg.innerText = "Vui lòng nhập đầy đủ Họ tên, Tỉnh/Thành phố và Trường học!";
            errorMsg.style.display = 'block';
            return;
        }
        if (pass !== passConfirm) {
            errorMsg.innerText = "Mật khẩu xác nhận không khớp!";
            errorMsg.style.display = 'block';
            return;
        }
        if (sdt.length < 9) {
            errorMsg.innerText = "Số điện thoại không hợp lệ!";
            errorMsg.style.display = 'block';
            return;
        }

        document.getElementById('status').innerText = `Đang kết nối cơ sở dữ liệu...`;
        if (btnElement) btnElement.disabled = true;

        try {
            // 2. Kiểm tra trùng số điện thoại
            const { data: checkSdt, error: checkError } = await _supabase
                .from('hoc_sinh')
                .select('sdt')
                .eq('sdt', sdt)
                .maybeSingle();

            if (checkSdt) {
                throw new Error("Số điện thoại này đã được đăng ký! Vui lòng chuyển sang Đăng nhập.");
            }


            // =========================================================
            // BƯỚC MỚI: KIỂM TRA MÃ LỚP CÓ TỒN TẠI KHÔNG (NẾU CÓ NHẬP)
            // =========================================================
            if (maLopVao !== '') {
                const { data: checkLop, error: loiCheckLop } = await _supabase
                    .from('lop_hoc')
                    .select('ma_lop')
                    .eq('ma_lop', maLopVao)
                    .maybeSingle(); // maybeSingle() sẽ trả về null nếu không tìm thấy

                if (loiCheckLop) throw loiCheckLop;

                // Nếu checkLop là null -> Mã lớp không có thật trong Database
                if (!checkLop) {
                    throw new Error(`Mã lớp "${maLopVao}" không tồn tại. Học sinh vui lòng kiểm tra lại hoặc để trống nếu chưa có lớp!`);
                }
            }
            // =========================================================




            // 3. Thực hiện lưu vào Database (Khớp 100% với cấu trúc bảng)
            const { error: insertError } = await _supabase
                .from('hoc_sinh')
                .insert([{
                    uid: crypto.randomUUID(),
                    sdt: sdt,
                    mat_khau: pass,
                    ten: hoTen,
                    vai_tro: 'hocsinh',
                    trang_thai: 1,
                    khoi_lop: khoi,
                    tinh: tinh,
                    truong: truong,
                    danh_sach_ma_lop: maLopVao ? [maLopVao] : [], // Sử dụng đúng tên cột mới
                    ngay_tham_gia: new Date().toISOString()
                }]);

            if (insertError) throw insertError;

            // 4. Hoàn tất
            alert(`Đăng ký thành công tài khoản cho: ${hoTen}. Hệ thống sẽ chuyển về trang Đăng nhập!`);

            ham_2_1_chuyen_doi_che_do();
            document.getElementById('txtPassword').value = '';
            document.getElementById('status').innerText = `Vui lòng đăng nhập để vào thi`;

        } catch (error) {
            errorMsg.innerText = error.message;
            errorMsg.style.display = 'block';
            document.getElementById('status').innerText = `Đăng ký thất bại`;
        } finally {
            if (btnElement) btnElement.disabled = false;
        }
    }
}
// Hàm 2.5: Xử lý Đăng xuất (Cập nhật để ẩn Dashboard)
function ham_2_5_xu_ly_dang_xuat() {
    //console.log("Đang vào hàm ham_2_5");
    AppState.user = null;

    // Ẩn nút đăng xuất và Dashboard
    document.getElementById('btnLogout').style.display = 'none';
    document.getElementById('dashboard-container').style.display = 'none';

    // Hiện lại khung đăng nhập
    document.getElementById('khung-dang-nhap').style.display = 'block';

    // Reset form
    document.getElementById('txtPassword').value = '';
    document.getElementById('status').innerText = 'Vui lòng đăng nhập';
}





// ==============================================================================
// KHỐI 3: GIAO DIỆN QUẢN TRỊ VIÊN (ADMIN DASHBOARD)
// ==============================================================================
// Hàm 3.1: Vẽ màn hình làm việc của Giáo viên / Admin
function ham_3_1_ve_dashboard_admin() {
    // 1. Ẩn form đăng nhập
    document.getElementById('khung-dang-nhap').style.display = 'none';

    // 2. Hiện nút Đăng xuất trên thanh trạng thái
    document.getElementById('btnLogout').style.display = 'inline-block';

    // ================================================================
    // 3. XỬ LÝ CHUỖI HIỂN THỊ TÊN TRÊN THANH TRẠNG THÁI (Góc trên cùng)
    // ================================================================
    let tenVaiTro = '';
    if (AppState.role === 'admin') tenVaiTro = 'Admin';
    else if (AppState.role === 'giaovien') tenVaiTro = 'Giáo viên';
    else tenVaiTro = 'Học sinh';

    // Viết hoa toàn bộ Tên (Ví dụ: HUỲNH ĐỨC CHÍNH)
    let tenInHoa = AppState.user.ten ? AppState.user.ten.toUpperCase() : 'CHƯA CẬP NHẬT TÊN';

    // Ghép chuỗi theo đúng format: Vai trò: TÊN (SĐT)
    let chuoiHienThi = `${tenVaiTro}: ${tenInHoa} (${AppState.user.sdt})`;

    // Nạp chuỗi vào thẻ status (Thay thế chữ "Đang xác thực...")
    const lblStatus = document.getElementById('status');
    if (lblStatus) {
        lblStatus.innerText = `👤 ${chuoiHienThi}`;
        lblStatus.style.color = '#1a73e8'; // Màu xanh dương cho nổi bật
        lblStatus.style.fontWeight = 'bold';
    }

    // ================================================================
    // 4. Vẽ cấu trúc HTML của Dashboard
    // ================================================================
    const dashboard = document.getElementById('dashboard-container');
    dashboard.style.display = 'block';

    dashboard.innerHTML = `
        <div style="background: white; padding: 25px; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
            <h2 style="color: #0056b3; margin-top: 0;">BẢNG ĐIỀU KHIỂN QUẢN TRỊ</h2>
            <p style="font-size: 16px; color: #495057;">Chào mừng quay trở lại, hệ thống đã sẵn sàng làm việc!</p>
            
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
            
            <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                <button onclick="ham_6_1_ve_quan_ly_hoc_lieu()" style="padding: 15px 25px; background: #28a745; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 15px; font-weight: bold; box-shadow: 0 2px 5px rgba(40,167,69,0.3);">
                    📚 Kho Học Liệu & Đề Thi
                </button>
                <button onclick="ham_7_1_ve_quan_ly_nhiem_vu()" style="padding: 15px 25px; background: #17a2b8; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 15px; font-weight: bold; box-shadow: 0 2px 5px rgba(23,162,184,0.3);">
                    🚀 Quản Lý Nhiệm Vụ
                </button>
                <button onclick="ham_7_12_tab_duyet_don()" style="padding: 15px 25px; background: #ffc107; color: #000; border: none; border-radius: 8px; cursor: pointer; font-size: 15px; font-weight: bold; box-shadow: 0 2px 5px rgba(255,193,7,0.3); transition: 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                    📩 Duyệt Yêu Cầu Học Sinh
                </button>
                <button onclick="ham_4_1_ve_quan_ly_lop()" style="padding: 15px 25px; background: #6c757d; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 15px; font-weight: bold; box-shadow: 0 2px 5px rgba(108,117,125,0.3);">
                    🏫 Quản Lý Lớp Học
                </button>
                <button onclick="ham_5_1_ve_quan_ly_hoc_sinh()" style="padding: 15px 25px; background: #6f42c1; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 15px; font-weight: bold; box-shadow: 0 2px 5px rgba(111,66,193,0.3);">
                    🎓 Quản Lý Học Sinh
                </button>
            </div>
            
            <div id="vung-lam-viec-chi-tiet" style="margin-top: 30px; padding: 20px; background: #f8f9fa; border-radius: 8px; border: 1px dashed #ccc; min-height: 200px;">
                <p style="color: #6c757d; text-align: center; margin-top: 80px;">Bấm vào các nút chức năng bên trên để bắt đầu làm việc...</p>
            </div>
        </div>
    `;
}


// Đảm bảo mọi thứ được vẽ ra khi trang web load xong
window.onload = function () {
    console.log("Hệ thống bắt đầu khởi chạy...");
    ham_1_1_nhung_css();
    ham_1_2_dung_khung_html();

    // Thêm dòng này để xác nhận code đã chạy đến đây
    document.getElementById('status').innerText = "Hệ thống sẵn sàng";
};


// ==============================================================================
// KHỐI 4: QUẢN LÝ LỚP HỌC (TÍCH HỢP SORT, CHỌN HS, XEM CHI TIẾT)
// ==============================================================================

// Biến lưu trữ tạm thời dữ liệu bảng để phục vụ việc Sắp xếp (Sort) cực nhanh
const BangLopState = {
    duLieu: [],
    cotDangSort: 'ngay_tao',
    tangDan: false // false = Giảm dần (Mới nhất xếp trên)
};
let _dsHocSinhGoc = [];

// Hàm 4.0: Sinh mã lớp ngẫu nhiên 5 ký tự
function ham_4_0_sinh_ma_lop() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// Hàm 4.1: Vẽ giao diện chính
function ham_4_1_ve_quan_ly_lop() {
    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
    vungLamViec.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <h3 style="margin: 0; color: #0056b3;">Danh sách Lớp học & Nhóm ôn luyện</h3>
            <button onclick="ham_4_2_hien_form_them_lop()" style="padding: 10px 15px; background: #28a745; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;">
                + Khởi Tạo Lớp Mới
            </button>
        </div>
        <div id="danh-sach-lop-render"><p style="text-align: center;">Đang tải dữ liệu...</p></div>
    `;
    ham_4_4_tai_danh_sach_lop();
}

// ------------------------------------------------------------------------------
// PHẦN A: TẠO LỚP & CHỌN HỌC SINH
// ------------------------------------------------------------------------------

// Hàm 4.2: Vẽ Form tạo lớp học mới
function ham_4_2_hien_form_them_lop() {
    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
    const maLopTuDong = ham_4_0_sinh_ma_lop();
    const thoiGianHienTai = new Date().toLocaleString('vi-VN');

    vungLamViec.innerHTML = `
        <div style="max-width: 750px; background: #ffffff; padding: 25px; border-radius: 12px; border: 1px solid #e0e0e0; margin: 0 auto;">
            <h3 style="color: #1a73e8; border-bottom: 2px solid #f1f3f4; padding-bottom: 10px;">TẠO LỚP HỌC MỚI</h3>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
                <div>
                    <label style="font-weight: bold; font-size: 14px;">Mã lớp:</label>
                    <input type="text" value="${maLopTuDong}" readonly style="width: 100%; padding: 10px; background: #f1f3f4; border-radius: 6px; color: #d93025; font-weight: bold; box-sizing: border-box; border: 1px solid #ddd;">
                </div>
                
                <div>
                    <label style="font-weight: bold; font-size: 14px;">Trạng thái ban đầu:</label>
                    <select id="selTrangThaiLopMoi" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; cursor: pointer;">
                        <option value="1">1 - Đang mở (Hoạt động ngay)</option>
                        <option value="0">0 - Đóng (Tạm khóa)</option>
                    </select>
                </div>

                <div style="grid-column: span 2;">
                    <label style="font-weight: bold; font-size: 14px; color: #1a73e8;">Tên lớp học (*):</label>
                    <input type="text" id="txtTenLop" placeholder="Ví dụ: TOÁN 12 - NHÓM CHIỀU THỨ 2" style="width: 100%; padding: 10px; border: 2px solid #1a73e8; border-radius: 6px; box-sizing: border-box;">
                </div>
            </div>

            <div style="margin-bottom: 20px; padding: 15px; border: 1px dashed #1a73e8; border-radius: 8px; background: #f8fbff;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <label style="font-weight: bold; font-size: 14px; color: #1a73e8;">Danh sách học sinh thêm vào lớp:</label>
                    <button onclick="ham_4_8_tai_danh_sach_hoc_sinh_de_chon()" style="padding: 6px 12px; background: #1a73e8; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">
                        Tải danh sách Học sinh
                    </button>
                </div>
                <input type="text" oninput="ham_4_16_loc_hs_luc_tao_lop(this.value)" placeholder="🔍 Tìm tên hoặc SĐT..." style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; margin-bottom: 10px; box-sizing: border-box;">
                
                <div id="khung-checkbox-hs" style="max-height: 200px; overflow-y: auto; display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                    <p style="color: #666; font-size: 13px; grid-column: span 2;">Bấm "Tải danh sách" để hiển thị học sinh...</p>
                </div>
            </div>

            <div style="display: flex; gap: 12px;">
                <button onclick="ham_4_3_luu_lop_moi(this, '${maLopTuDong}')" style="flex: 2; padding: 12px; background: #1a73e8; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">
                    XÁC NHẬN LƯU LỚP HỌC
                </button>
                <button onclick="ham_4_1_ve_quan_ly_lop()" style="flex: 1; padding: 12px; background: #f1f3f4; border: 1px solid #dadce0; border-radius: 6px; cursor: pointer;">
                    QUAY LẠI
                </button>
            </div>
        </div>
    `;
}

// Hàm 4.8: Truy vấn bảng 'hoc_sinh' để hiển thị Checkbox
async function ham_4_8_tai_danh_sach_hoc_sinh_de_chon() {
    const khungRender = document.getElementById('khung-checkbox-hs');
    khungRender.innerHTML = `<span style="color: blue;">Đang tải dữ liệu học sinh...</span>`;

    try {
        const { data: dsHocSinh, error } = await _supabase
            .from('hoc_sinh')
            .select('uid, ten, sdt, khoi_lop')
            .eq('vai_tro', 'hocsinh')
            .eq('trang_thai', 1)
            .order('ten', { ascending: true });

        if (error) throw error;
        if (!dsHocSinh || dsHocSinh.length === 0) {
            khungRender.innerHTML = `<span style="color: red;">Chưa có học sinh nào trên hệ thống.</span>`;
            return;
        }

        let htmlCheckbox = '';
        dsHocSinh.forEach(hs => {
            const thongTin = `${hs.ten} - Khối ${hs.khoi_lop || '?'} (${hs.sdt})`;
            htmlCheckbox += `
                <label style="display: flex; align-items: center; gap: 8px; padding: 8px; background: white; border: 1px solid #eee; border-radius: 4px; cursor: pointer;">
                    <input type="checkbox" class="chk-hs-vao-lop" value="${hs.uid}"> 
                    <span style="font-size: 14px;">${thongTin}</span>
                </label>
            `;
        });
        khungRender.innerHTML = htmlCheckbox;

    } catch (err) {
        khungRender.innerHTML = `<span style="color: red;">Lỗi tải HS: ${err.message}</span>`;
    }
}

// ==============================================================
// Hàm 4.3: Lưu lớp mới + Cập nhật hồ sơ Học sinh + Fix lỗi Load danh sách
// ==============================================================
async function ham_4_3_luu_lop_moi(btnElement, maLop) {
    const tenLop = document.getElementById('txtTenLop').value.trim();
    const trangThai = parseInt(document.getElementById('selTrangThaiLopMoi').value);

    if (!tenLop) return alert("Thầy chưa nhập Tên lớp học!");

    // Thu thập danh sách UID học sinh được check
    const dsCheckbox = document.querySelectorAll('.chk-hs-vao-lop:checked');
    const mangUidHocSinh = Array.from(dsCheckbox).map(chk => chk.value);

    btnElement.disabled = true;
    btnElement.innerText = "⏳ ĐANG LƯU...";

    try {
        // BƯỚC 1: LƯU VÀO BẢNG LỚP HỌC
        const { error: errLop } = await _supabase.from('lop_hoc').insert([{
            ma_lop: maLop,
            ten_lop: tenLop,
            uid_gv_tao: AppState.user.uid,
            trang_thai: trangThai,
            hoc_sinh_ids: mangUidHocSinh, // Lưu mảng trực tiếp, không stringify
            ngay_tao: new Date().toISOString()
        }]);

        if (errLop) {
            if (errLop.code === '23505') throw new Error("Mã lớp bị trùng, vui lòng thử lại.");
            throw errLop;
        }

        // BƯỚC 2: CẬP NHẬT 'danh_sach_ma_lop' CHO TỪNG HỌC SINH ĐƯỢC CHỌN
        if (mangUidHocSinh.length > 0) {
            btnElement.innerText = "⏳ ĐANG GHI DANH HS...";

            for (const uid of mangUidHocSinh) {
                // 2.1. Lấy mảng lớp hiện tại của học sinh
                const { data: hsData } = await _supabase
                    .from('hoc_sinh')
                    .select('danh_sach_ma_lop')
                    .eq('uid', uid)
                    .single();

                let dsLopCu = hsData?.danh_sach_ma_lop;
                if (!Array.isArray(dsLopCu)) dsLopCu = [];

                // 2.2. Thêm mã lớp mới nếu chưa có
                if (!dsLopCu.includes(maLop)) {
                    dsLopCu.push(maLop);

                    // 2.3. Cập nhật lại vào Database
                    await _supabase
                        .from('hoc_sinh')
                        .update({ danh_sach_ma_lop: dsLopCu })
                        .eq('uid', uid);
                }
            }
        }

        alert(`✅ Khởi tạo lớp ${maLop} và ghi danh học sinh thành công!`);

        // BƯỚC 3: FIX LỖI LOAD DANH SÁCH (Phải về trang chính trước để có khung render)
        // Thay vì gọi thẳng ham_4_4, ta gọi hàm vẽ khung giao diện chính trước
        ham_4_1_ve_quan_ly_lop();

    } catch (error) {
        alert("Lỗi: " + error.message);
        btnElement.disabled = false;
        btnElement.innerText = "XÁC NHẬN LƯU LỚP HỌC";
    }
}
// ------------------------------------------------------------------------------
// PHẦN B: BẢNG DANH SÁCH (SẮP XẾP) & XEM CHI TIẾT
// ------------------------------------------------------------------------------

// Hàm 4.4: Lấy dữ liệu và gọi hàm Vẽ bảng
//async function ham_4_4_tai_danh_sach_lop() {
//    try {
//        const { data: dsLop, error } = await _supabase.from('lop_hoc').select('*');
//        if (error) throw error;

//        // BƯỚC MỚI: Tra cứu tên Giáo viên tạo từ bảng hoc_sinh
//        const danhSachUidGv = [...new Set((dsLop || []).map(l => l.uid_gv_tao).filter(id => id))];
//        let tuDienTenGv = {};

//        if (danhSachUidGv.length > 0) {
//            const { data: dsGv } = await _supabase.from('hoc_sinh').select('uid, ten').in('uid', danhSachUidGv);
//            if (dsGv) {
//                dsGv.forEach(gv => tuDienTenGv[gv.uid] = gv.ten);
//            }
//        }

//        // Gắn tên giáo viên vào dữ liệu lớp để dùng ở các hàm sau
//        BangLopState.duLieu = (dsLop || []).map(lop => ({
//            ...lop,
//            ten_gv_tao: tuDienTenGv[lop.uid_gv_tao] || 'Hệ thống'
//        }));

//        ham_4_10_ve_bang_du_lieu();

//    } catch (error) {
//        document.getElementById('danh-sach-lop-render').innerHTML = `<p style="color: red;">Lỗi: ${error.message}</p>`;
//    }
//}
// Hàm 4.4: Lấy dữ liệu và gọi hàm Vẽ bảng (Bản FIX lỗi Null)
async function ham_4_4_tai_danh_sach_lop() {
    try {
        const { data: dsLop, error } = await _supabase.from('lop_hoc').select('*');
        if (error) throw error;

        const danhSachUidGv = [...new Set((dsLop || []).map(l => l.uid_gv_tao).filter(id => id))];
        let tuDienTenGv = {};

        if (danhSachUidGv.length > 0) {
            const { data: dsGv } = await _supabase.from('hoc_sinh').select('uid, ten').in('uid', danhSachUidGv);
            if (dsGv) {
                dsGv.forEach(gv => tuDienTenGv[gv.uid] = gv.ten);
            }
        }

        BangLopState.duLieu = (dsLop || []).map(lop => ({
            ...lop,
            ten_gv_tao: tuDienTenGv[lop.uid_gv_tao] || 'Hệ thống'
        }));

        // Gọi hàm vẽ bảng
        ham_4_10_ve_bang_du_lieu();

    } catch (error) {
        console.error("Lỗi tải danh sách lớp:", error.message);

        // 🌟 KIỂM TRA AN TOÀN TRƯỚC KHI GÁN INNERHTML
        const khungRender = document.getElementById('danh-sach-lop-render');
        if (khungRender) {
            khungRender.innerHTML = `<p style="color: red;">Lỗi: ${error.message}</p>`;
        } else {
            // Nếu không tìm thấy khung render, có thể báo qua alert hoặc console
            alert("Lỗi tải danh sách lớp: " + error.message);
        }
    }
}

// Hàm 4.10: Vẽ bảng (Cho phép Sort tất cả các cột)
function ham_4_10_ve_bang_du_lieu() {
    const renderArea = document.getElementById('danh-sach-lop-render');
    let dsLop = [...BangLopState.duLieu];

    // Thuật toán Sắp xếp
    const cot = BangLopState.cotDangSort;
    const heSo = BangLopState.tangDan ? 1 : -1;

    dsLop.sort((a, b) => {
        let valA = a[cot] === null || a[cot] === undefined ? '' : a[cot];
        let valB = b[cot] === null || b[cot] === undefined ? '' : b[cot];

        // Nếu là chuỗi thì đưa về chữ thường để so sánh chuẩn
        if (typeof valA === 'string') valA = valA.toLowerCase();
        if (typeof valB === 'string') valB = valB.toLowerCase();

        if (valA < valB) return -1 * heSo;
        if (valA > valB) return 1 * heSo;
        return 0;
    });

    const iconSort = BangLopState.tangDan ? ' ▲' : ' ▼';
    const getIcon = (tenCot) => (cot === tenCot ? iconSort : ' ↕');

    let htmlTable = `
        <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05); font-size: 14px;">
            <thead>
                <tr style="background: #f8f9fa; text-align: left; border-bottom: 2px solid #dee2e6; cursor: pointer; white-space: nowrap;">
                    <th style="padding: 12px; border: 1px solid #eee; width: 50px; text-align: center;">STT</th>
                    <th style="padding: 12px; border: 1px solid #eee;" onclick="ham_4_11_thay_doi_sort('ma_lop')">Mã Lớp ${getIcon('ma_lop')}</th>
                    <th style="padding: 12px; border: 1px solid #eee;" onclick="ham_4_11_thay_doi_sort('ten_lop')">Tên Lớp ${getIcon('ten_lop')}</th>
                    <th style="padding: 12px; border: 1px solid #eee;" onclick="ham_4_11_thay_doi_sort('ten_gv_tao')">GV Tạo ${getIcon('ten_gv_tao')}</th>
                    <th style="padding: 12px; border: 1px solid #eee;" onclick="ham_4_11_thay_doi_sort('ngay_tao')">Ngày Tạo ${getIcon('ngay_tao')}</th>
                    <th style="padding: 12px; border: 1px solid #eee; text-align: center;" onclick="ham_4_11_thay_doi_sort('hoc_sinh_ids')">Sĩ số ${getIcon('hoc_sinh_ids')}</th>
                    <th style="padding: 12px; border: 1px solid #eee; text-align: center;" onclick="ham_4_11_thay_doi_sort('trang_thai')">Trạng thái ${getIcon('trang_thai')}</th>
                    <th style="padding: 12px; border: 1px solid #eee; text-align: center;">Thao tác</th>
                </tr>
            </thead>
            <tbody>
    `;

    dsLop.forEach((lop, index) => {
        const ngayGio = new Date(lop.ngay_tao).toLocaleString('vi-VN');
        const siSo = lop.hoc_sinh_ids ? lop.hoc_sinh_ids.length : 0;
        const nhãnTrạngThái = lop.trang_thai == 1
            ? `<span style="color: #28a745; font-weight: bold;">● Mở</span>`
            : `<span style="color: #dc3545; font-weight: bold;">● Đóng</span>`;

        htmlTable += `
            <tr style="border-bottom: 1px solid #eee; cursor: pointer;" onmouseover="this.style.background='#f1f8ff'" onmouseout="this.style.background='white'" onclick="ham_4_9_xem_chi_tiet_lop('${lop.ma_lop}')">
                <td style="padding: 10px; border: 1px solid #eee; text-align: center;">${index + 1}</td>
                <td style="padding: 10px; border: 1px solid #eee; font-weight: bold; color: #d35400;">${lop.ma_lop}</td>
                <td style="padding: 10px; border: 1px solid #eee;">${lop.ten_lop}</td>
                <td style="padding: 10px; border: 1px solid #eee;">${lop.ten_gv_tao}</td>
                <td style="padding: 10px; border: 1px solid #eee;">${ngayGio}</td>
                <td style="padding: 10px; border: 1px solid #eee; text-align: center;">${siSo}</td>
                <td style="padding: 10px; border: 1px solid #eee; text-align: center;">${nhãnTrạngThái}</td>
                <td style="padding: 10px; border: 1px solid #eee; text-align: center; white-space: nowrap;" onclick="event.stopPropagation()">
                    <button onclick="ham_4_12_hien_form_sua_lop('${lop.ma_lop}')" style="padding: 6px 12px; background: #f39c12; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; margin-right: 8px; box-shadow: 0 2px 4px rgba(243, 156, 18, 0.2);">
                        Sửa
                    </button>
                    <button onclick="ham_4_14_xoa_lop('${lop.ma_lop}')" style="padding: 6px 12px; background: #dc3545; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; box-shadow: 0 2px 4px rgba(220, 53, 69, 0.2);">
                        Xóa
                    </button>
                </td>
            </tr>
        `;
    });

    htmlTable += `</tbody></table>`;
    renderArea.innerHTML = htmlTable;
}

// Hàm 4.11: Xử lý thay đổi Cột Sort khi bấm vào tiêu đề
function ham_4_11_thay_doi_sort(cotMoi) {
    if (BangLopState.cotDangSort === cotMoi) {
        BangLopState.tangDan = !BangLopState.tangDan; // Đổi chiều
    } else {
        BangLopState.cotDangSort = cotMoi;
        BangLopState.tangDan = true; // Mặc định cột mới sẽ tăng dần
    }
    ham_4_10_ve_bang_du_lieu(); // Vẽ lại tức thì
}

// Hàm 4.9: Bấm vào dòng để xem chi tiết Lớp và Danh sách Học sinh
async function ham_4_9_xem_chi_tiet_lop(maLop) {
    const lop = BangLopState.duLieu.find(l => l.ma_lop === maLop);
    if (!lop) return;

    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
    vungLamViec.innerHTML = `<p style="text-align: center;">Đang tải danh sách học sinh của lớp ${maLop}...</p>`;

    try {
        let htmlHocSinh = `<p style="color: #666; font-style: italic;">Lớp chưa có học sinh nào.</p>`;

        // Truy vấn danh sách học sinh có UID nằm trong mảng hoc_sinh_ids của lớp
        if (lop.hoc_sinh_ids && lop.hoc_sinh_ids.length > 0) {
            const { data: dsHS, error } = await _supabase
                .from('hoc_sinh')
                .select('ten, sdt, truong')
                .in('uid', lop.hoc_sinh_ids);

            if (error) throw error;

            if (dsHS && dsHS.length > 0) {
                htmlHocSinh = `<ul style="line-height: 1.8;">`;
                dsHS.forEach((hs, idx) => {
                    htmlHocSinh += `<li><strong>${idx + 1}. ${hs.ten}</strong> - SĐT: ${hs.sdt} - Trường: ${hs.truong || 'Chưa cập nhật'}</li>`;
                });
                htmlHocSinh += `</ul>`;
            }
        }

        // Định dạng nhãn Trạng thái để hiển thị trong chi tiết
        const nhãnTrạngThái = lop.trang_thai == 1
            ? `<span style="color: #28a745; font-weight: bold;">✅ Đang mở (Hoạt động)</span>`
            : `<span style="color: #dc3545; font-weight: bold;">❌ Đang đóng (Tạm dừng)</span>`;

        vungLamViec.innerHTML = `
            <div style="background: white; padding: 25px; border-radius: 10px; border: 1px solid #1a73e8; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                <h3 style="color: #1a73e8; margin-top: 0; border-bottom: 2px solid #eee; padding-bottom: 10px;">
                    Thông tin chi tiết lớp: ${lop.ten_lop} (${lop.ma_lop})
                </h3>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 15px;">
                    <p style="margin: 5px 0;"><strong>Ngày giờ tạo:</strong> ${new Date(lop.ngay_tao).toLocaleString('vi-VN')}</p>
                    <p style="margin: 5px 0;"><strong>Giáo viên tạo:</strong> ${lop.ten_gv_tao}</p>
                    
                    <p style="margin: 5px 0;"><strong>Trạng thái lớp:</strong> ${nhãnTrạngThái}</p>
                    
                    <p style="margin: 5px 0;"><strong>Sĩ số hiện tại:</strong> ${lop.hoc_sinh_ids ? lop.hoc_sinh_ids.length : 0} học sinh</p>
                </div>

                <hr style="border: 0; border-top: 1px dashed #ccc; margin: 15px 0;">
                <h4 style="color: #d35400; margin-bottom: 10px;">👥 Danh sách Học sinh tham gia:</h4>
                <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; border: 1px solid #f0f0f0;">
                    ${htmlHocSinh}
                </div>

                <div style="margin-top: 25px; display: flex; gap: 10px;">
                    <button onclick="ham_4_1_ve_quan_ly_lop()" style="padding: 10px 20px; background: #6c757d; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;">
                        ⬅ Quay Lại
                    </button>
                    <button onclick="ham_4_12_hien_form_sua_lop('${lop.ma_lop}')" style="padding: 10px 20px; background: #f39c12; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;">
                        ✏️ Chỉnh sửa lớp này
                    </button>
                </div>
            </div>
        `;

    } catch (error) {
        vungLamViec.innerHTML = `<p style="color: red;">Lỗi tải chi tiết: ${error.message}</p>
                                 <button onclick="ham_4_1_ve_quan_ly_lop()" style="padding: 10px 20px; background: #6c757d; color: white; border: none; border-radius: 6px; cursor: pointer;">Quay lại</button>`;
    }
}
// ==============================================================================
// PHẦN C: CHỈNH SỬA VÀ XÓA LỚP HỌC
// ==============================================================================

// Hàm 4.14: Xóa lớp học
async function ham_4_14_xoa_lop(maLop) {
    if (!confirm(`⚠️ CẢNH BÁO: Thầy có chắc chắn muốn xóa toàn bộ lớp "${maLop}" không?\nDữ liệu đã xóa sẽ không thể khôi phục!`)) return;

    try {
        const { error } = await _supabase
            .from('lop_hoc')
            .delete()
            .eq('ma_lop', maLop);

        if (error) throw error;

        alert(`Đã xóa thành công lớp ${maLop}!`);
        ham_4_4_tai_danh_sach_lop(); // Cập nhật lại bảng

    } catch (error) {
        alert("Lỗi khi xóa lớp: " + error.message);
    }
}

// Hàm 4.12: Hiện Form Chỉnh sửa lớp học
async function ham_4_12_hien_form_sua_lop(maLop) {
    const lop = BangLopState.duLieu.find(l => l.ma_lop === maLop);
    if (!lop) return;

    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
    vungLamViec.innerHTML = `<p style="text-align: center;">Đang tải dữ liệu lớp và học sinh...</p>`;

    try {
        // Tải danh sách học sinh mới nhất đổ vào biến _dsHocSinhGoc
        const { data } = await _supabase
            .from('hoc_sinh')
            .select('uid, ten, sdt, truong')
            .eq('vai_tro', 'hocsinh')
            .order('ten', { ascending: true });

        _dsHocSinhGoc = data || []; // Gán vào biến toàn cục đã khai báo ở Bước 1

        // Chuẩn bị mảng ID học sinh cũ để nạp vào hàm Search
        const mảngIdCũ = JSON.stringify(lop.hoc_sinh_ids || []);

        vungLamViec.innerHTML = `
            <div style="max-width: 750px; background: #ffffff; padding: 25px; border-radius: 12px; border: 1px solid #e0e0e0; margin: 0 auto;">
                <h3 style="color: #f39c12; border-bottom: 2px solid #f1f3f4; padding-bottom: 10px;">CHỈNH SỬA LỚP HỌC: ${lop.ten_lop} (${maLop})</h3>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
                    <div>
                        <label style="font-weight: bold; font-size: 14px;">Mã lớp (Cố định):</label>
                        <input type="text" value="${maLop}" readonly style="width: 100%; padding: 10px; background: #f1f3f4; border-radius: 6px; color: #666; font-weight: bold; box-sizing: border-box; border: 1px solid #ddd;">
                    </div>
                    <div>
                        <label style="font-weight: bold; font-size: 14px;">Trạng thái lớp:</label>
                        <select id="selTrangThaiLopSua" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px;">
                            <option value="1" ${lop.trang_thai == 1 ? 'selected' : ''}>1 - Đang mở</option>
                            <option value="0" ${lop.trang_thai == 0 ? 'selected' : ''}>0 - Đóng lớp</option>
                        </select>
                    </div>
                    <div style="grid-column: span 2;">
                        <label style="font-weight: bold; font-size: 14px; color: #1a73e8;">Tên lớp học (*):</label>
                        <input type="text" id="txtTenLopSua" value="${lop.ten_lop}" style="width: 100%; padding: 10px; border: 2px solid #1a73e8; border-radius: 6px; box-sizing: border-box;">
                    </div>
                </div>

                <div style="margin-bottom: 20px; padding: 15px; border: 1px dashed #1a73e8; border-radius: 8px; background: #f8fbff;">
                    <label style="font-weight: bold; font-size: 14px; color: #1a73e8; display: block; margin-bottom: 10px;">Danh sách học sinh (Tích chọn để thay đổi):</label>
                    
                    <input type="text" oninput="ham_4_15_loc_hoc_sinh_sua_lop(this.value, '${mảngIdCũ}')" 
                           placeholder="🔍 Tìm tên hoặc SĐT..." 
                           style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; margin-bottom: 10px; box-sizing: border-box;">

                    <div id="vung-chon-hs-sua" style="max-height: 250px; overflow-y: auto; border: 1px solid #eee; padding: 10px; border-radius: 4px; background: white;">
                        ${ham_4_12_b_tao_list_hs_sua(_dsHocSinhGoc, lop.hoc_sinh_ids || [])}
                    </div>
                </div>

                <div style="display: flex; gap: 12px;">
                    <button onclick="ham_4_13_luu_cap_nhat_lop('${maLop}', this)" style="flex: 2; padding: 12px; background: #f39c12; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">
                        LƯU THAY ĐỔI
                    </button>
                    <button onclick="ham_4_1_ve_quan_ly_lop()" style="flex: 1; padding: 12px; background: #f1f3f4; border: 1px solid #dadce0; border-radius: 6px; cursor: pointer;">
                        HỦY BỎ
                    </button>
                </div>
            </div>
        `;
    } catch (error) {
        vungLamViec.innerHTML = `<p style="color: red;">Lỗi: ${error.message}</p>`;
    }
}

// Hàm 4.15: Lọc tìm kiếm học sinh ngay tại chỗ cho Form Sửa Lớp
function ham_4_15_loc_hoc_sinh_sua_lop(keyword, chuoiIdsDaCo) {
    const idsDaCo = JSON.parse(chuoiIdsDaCo || '[]');
    const key = keyword.toLowerCase().trim();
    const vungList = document.getElementById('vung-chon-hs-sua');

    // Lọc từ biến gốc
    const dsLoc = _dsHocSinhGoc.filter(hs =>
        hs.ten.toLowerCase().includes(key) ||
        (hs.sdt && hs.sdt.includes(key))
    );

    // Vẽ lại danh sách đã lọc (vẫn truyền idsDaCo để giữ dấu tick)
    vungList.innerHTML = ham_4_12_b_tao_list_hs_sua(dsLoc, idsDaCo);
}

// Hàm 4.12.b: Tạo HTML danh sách checkbox
function ham_4_12_b_tao_list_hs_sua(danhSach, idsDaCo) {
    if (danhSach.length === 0) return '<p style="font-size: 12px; color: #999;">Không có dữ liệu...</p>';

    return danhSach.map(hs => {
        // Kiểm tra xem ID của học sinh này có nằm trong mảng của lớp không
        const isChecked = idsDaCo.includes(hs.uid) ? 'checked' : '';
        return `
            <div style="padding: 6px 0; border-bottom: 1px solid #f0f0f0; display: flex; align-items: center;">
                <input type="checkbox" class="chk-hs-sua-lop" value="${hs.uid}" id="sua_hs_${hs.uid}" ${isChecked} style="margin-right: 10px; transform: scale(1.2);">
                <label for="sua_hs_${hs.uid}" style="cursor: pointer; font-size: 14px;">
                    <span style="font-weight: bold;">${hs.ten}</span> 
                    <span style="color: #666; font-size: 12px;"> - SĐT: ${hs.sdt}</span>
                </label>
            </div>
        `;
    }).join('');
}



// ==============================================================
// Hàm 4.13: Lưu cập nhật toàn diện lớp học (CÓ ĐỒNG BỘ HỌC SINH)
// ==============================================================
async function ham_4_13_luu_cap_nhat_lop(maLop, btn) {
    const tenMoi = document.getElementById('txtTenLopSua').value.trim();
    const trangThaiMoi = parseInt(document.getElementById('selTrangThaiLopSua').value);

    // Lấy danh sách UID học sinh mới sau khi thầy tích/bỏ tích
    const nodes = document.querySelectorAll('.chk-hs-sua-lop:checked');
    const mangUidMoi = Array.from(nodes).map(node => node.value);

    if (!tenMoi) return alert("Thầy vui lòng không để trống Tên lớp!");

    btn.disabled = true;
    btn.innerText = "⏳ ĐANG ĐỒNG BỘ...";

    try {
        // BƯỚC 1: LẤY DỮ LIỆU LỚP CŨ ĐỂ TÌM SỰ THAY ĐỔI (AI VÀO, AI RA)
        const { data: lopCu } = await _supabase
            .from('lop_hoc')
            .select('hoc_sinh_ids')
            .eq('ma_lop', maLop)
            .single();

        const mangUidCu = lopCu?.hoc_sinh_ids || [];

        // BƯỚC 2: CẬP NHẬT THÔNG TIN VÀO BẢNG 'lop_hoc'
        const { error: errLop } = await _supabase
            .from('lop_hoc')
            .update({
                ten_lop: tenMoi,
                trang_thai: trangThaiMoi,
                hoc_sinh_ids: mangUidMoi // Truyền mảng trực tiếp
            })
            .eq('ma_lop', maLop);

        if (errLop) throw errLop;

        // BƯỚC 3: ĐỒNG BỘ HỒ SƠ CHO TỪNG HỌC SINH (Tìm ai thêm, ai bị loại)
        const dsThem = mangUidMoi.filter(id => !mangUidCu.includes(id));
        const dsLoai = mangUidCu.filter(id => !mangUidMoi.includes(id));
        const tatCaHsAnhHuong = [...new Set([...dsThem, ...dsLoai])];

        if (tatCaHsAnhHuong.length > 0) {
            for (const uid of tatCaHsAnhHuong) {
                // Lấy mảng mã lớp hiện tại của học sinh
                const { data: hsData } = await _supabase
                    .from('hoc_sinh')
                    .select('danh_sach_ma_lop')
                    .eq('uid', uid)
                    .single();

                let dsLopCuaHS = hsData?.danh_sach_ma_lop || [];
                if (!Array.isArray(dsLopCuaHS)) dsLopCuaHS = [];

                if (dsThem.includes(uid)) {
                    // Nếu là học sinh mới được tích: Ghi danh
                    if (!dsLopCuaHS.includes(maLop)) dsLopCuaHS.push(maLop);
                } else if (dsLoai.includes(uid)) {
                    // Nếu là học sinh bị bỏ tích: Xóa mã lớp này đi
                    dsLopCuaHS = dsLopCuaHS.filter(m => m !== maLop);
                }

                // Cập nhật lại vào Database
                await _supabase
                    .from('hoc_sinh')
                    .update({ danh_sach_ma_lop: dsLopCuaHS })
                    .eq('uid', uid);
            }
        }

        alert(`✅ Đã cập nhật thành công lớp ${maLop} và đồng bộ học sinh!`);

        // BƯỚC 4: VỀ GIAO DIỆN CHÍNH RỒI MỚI TẢI LẠI (Fix dứt điểm lỗi null)
        ham_4_1_ve_quan_ly_lop(); // Dựng lại HTML chứa id 'danh-sach-lop-render'
        ham_4_4_tai_danh_sach_lop(); // Lúc này gọi load dữ liệu là an toàn 100%

    } catch (error) {
        alert("Lỗi cập nhật: " + error.message);
    } finally {
        btn.disabled = false;
        btn.innerText = "LƯU THAY ĐỔI";
    }
}


// ==============================================================================
// KHỐI 5: QUẢN LÝ HỌC SINH (TÍCH HỢP SORT, KHÓA/MỞ TÀI KHOẢN)
// ==============================================================================

// Biến lưu trữ trạng thái bảng Học sinh để Sắp xếp siêu tốc
const BangHocSinhState = {
    duLieu: [],
    cotDangSort: 'ngay_tham_gia',
    tangDan: false // false = Mới nhất xếp trên
};

// Hàm 5.1: Vẽ bộ khung giao diện Quản lý học sinh
function ham_5_1_ve_quan_ly_hoc_sinh() {
    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');

    vungLamViec.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <h3 style="margin: 0; color: #6f42c1;">Danh sách Học sinh trên hệ thống</h3>
            <div style="display: flex; gap: 10px;">
                <button onclick="ham_5_2_tai_danh_sach_hoc_sinh()" style="padding: 10px 15px; background: #f1f3f4; color: #333; border: 1px solid #ccc; border-radius: 6px; cursor: pointer; font-weight: bold;">
                    🔄 Làm mới dữ liệu
                </button>
            </div>
        </div>
        <div id="danh-sach-hs-render">
            <p style="text-align: center; color: #666;">Đang tải dữ liệu học sinh từ máy chủ...</p>
        </div>
    `;

    // Gọi hàm tải dữ liệu
    ham_5_2_tai_danh_sach_hoc_sinh();
}

// Hàm 5.2: Tải dữ liệu từ Supabase và nạp vào Biến State
async function ham_5_2_tai_danh_sach_hoc_sinh() {
    const renderArea = document.getElementById('danh-sach-hs-render');
    try {
        const { data: dsHocSinh, error } = await _supabase
            .from('hoc_sinh')
            .select('*')
            .eq('vai_tro', 'hocsinh');

        if (error) throw error;

        BangHocSinhState.duLieu = dsHocSinh || [];
        ham_5_10_ve_bang_hoc_sinh(); // Gọi hàm vẽ bảng

    } catch (error) {
        renderArea.innerHTML = `<p style="color: red;">Lỗi tải dữ liệu: ${error.message}</p>`;
    }
}

// Hàm 5.10: Vẽ Bảng học sinh (Đầy đủ tất cả các cột theo yêu cầu)
function ham_5_10_ve_bang_hoc_sinh() {
    const renderArea = document.getElementById('danh-sach-hs-render');
    let dsHocSinh = [...BangHocSinhState.duLieu];

    if (dsHocSinh.length === 0) {
        renderArea.innerHTML = `<p style="text-align: center; color: #666; padding: 20px; background: white; border-radius: 8px;">Chưa có học sinh nào.</p>`;
        return;
    }

    // Thuật toán Sort
    const cot = BangHocSinhState.cotDangSort;
    const heSo = BangHocSinhState.tangDan ? 1 : -1;
    dsHocSinh.sort((a, b) => {
        let valA = a[cot] === null ? '' : a[cot];
        let valB = b[cot] === null ? '' : b[cot];
        if (valA < valB) return -1 * heSo;
        if (valA > valB) return 1 * heSo;
        return 0;
    });

    const iconSort = BangHocSinhState.tangDan ? '▲' : '▼';

    let htmlTable = `
        <div style="overflow-x: auto; border: 1px solid #dee2e6; border-radius: 8px;">
            <table style="width: 100%; min-width: 1800px; border-collapse: collapse; background: white; font-size: 13px;">
                <thead>
                    <tr style="background: #f8f9fa; text-align: left; border-bottom: 2px solid #dee2e6; white-space: nowrap; cursor: pointer;">
                        <th style="padding: 10px; border: 1px solid #eee; text-align: center;">STT</th>
                        <th style="padding: 10px; border: 1px solid #eee;">Thao tác</th>
                        <th style="padding: 10px; border: 1px solid #eee;">Trạng thái</th>
                        <th style="padding: 10px; border: 1px solid #eee;" onclick="ham_5_11_thay_doi_sort('ten')">Họ và Tên ${cot === 'ten' ? iconSort : '↕'}</th>
                        <th style="padding: 10px; border: 1px solid #eee;" onclick="ham_5_11_thay_doi_sort('sdt')">SĐT ${cot === 'sdt' ? iconSort : '↕'}</th>
                        <th style="padding: 10px; border: 1px solid #eee;">Mật khẩu</th>
                        <th style="padding: 10px; border: 1px solid #eee;">Trường</th>
                        <th style="padding: 10px; border: 1px solid #eee;">Tỉnh</th>
                        <th style="padding: 10px; border: 1px solid #eee;">Khối</th>
                        <th style="padding: 10px; border: 1px solid #eee;">Mã lớp tham gia</th>
                        <th style="padding: 10px; border: 1px solid #eee;" onclick="ham_5_11_thay_doi_sort('diem_tich_luy')">Điểm TL ${cot === 'diem_tich_luy' ? iconSort : '↕'}</th>
                        <th style="padding: 10px; border: 1px solid #eee;" onclick="ham_5_11_thay_doi_sort('lan_dang_nhap_cuoi')">Đăng nhập cuối ${cot === 'lan_dang_nhap_cuoi' ? iconSort : '↕'}</th>
                        <th style="padding: 10px; border: 1px solid #eee;">Ngày tham gia</th>
                        <th style="padding: 10px; border: 1px solid #eee;">Metadata</th>
                        <th style="padding: 10px; border: 1px solid #eee;">UID (Mã định danh)</th>
                    </tr>
                </thead>
                <tbody>
    `;

    dsHocSinh.forEach((hs, index) => {
        const ngayThamGia = hs.ngay_tham_gia ? new Date(hs.ngay_tham_gia).toLocaleString('vi-VN') : '-';
        const ngayCuoi = hs.lan_dang_nhap_cuoi ? new Date(hs.lan_dang_nhap_cuoi).toLocaleString('vi-VN') : 'Chưa vào';
        const maLop = (hs.danh_sach_ma_lop && hs.danh_sach_ma_lop.length > 0) ? hs.danh_sach_ma_lop.join(', ') : '-';

        // Màu sắc cho trạng thái
        const mauTrangThai = hs.trang_thai == 1 ? '#28a745' : '#dc3545';
        const chuTrangThai = hs.trang_thai == 1 ? 'Mở' : 'Khóa';

        htmlTable += `
            <tr style="border-bottom: 1px solid #eee; white-space: nowrap;">
                <td style="padding: 10px; border: 1px solid #eee; text-align: center;">${index + 1}</td>
                <td style="padding: 10px; border: 1px solid #eee; text-align: center;">
                    <button onclick="ham_5_3_khoa_mo_tai_khoan('${hs.uid}', ${hs.trang_thai == 1 ? 0 : 1}, '${hs.ten}')" 
                            style="padding: 4px 8px; border-radius: 4px; border: 1px solid #ccc; cursor: pointer; background: ${hs.trang_thai == 1 ? '#fff1f0' : '#e6ffed'}; color: ${hs.trang_thai == 1 ? '#dc3545' : '#28a745'}; font-weight: bold;">
                        ${hs.trang_thai == 1 ? 'Khóa' : 'Mở'}
                    </button>
                </td>
                <td style="padding: 10px; border: 1px solid #eee; text-align: center; color: ${mauTrangThai}; font-weight: bold;">${chuTrangThai}</td>
                <td style="padding: 10px; border: 1px solid #eee; font-weight: bold; color: #1a73e8;">${hs.ten}</td>
                <td style="padding: 10px; border: 1px solid #eee; font-weight: bold;">${hs.sdt}</td>
                <td style="padding: 10px; border: 1px solid #eee; color: #666;">${hs.mat_khau}</td>
                <td style="padding: 10px; border: 1px solid #eee;">${hs.truong || '-'}</td>
                <td style="padding: 10px; border: 1px solid #eee;">${hs.tinh || '-'}</td>
                <td style="padding: 10px; border: 1px solid #eee; text-align: center;">${hs.khoi_lop || '-'}</td>
                <td style="padding: 10px; border: 1px solid #eee; color: #d35400; font-weight: bold;">${maLop}</td>
                <td style="padding: 10px; border: 1px solid #eee; text-align: center; font-weight: bold; color: #e67e22;">${hs.diem_tich_luy || 0}</td>                
                <td style="padding: 10px; border: 1px solid #eee;">${ngayCuoi}</td>
                <td style="padding: 10px; border: 1px solid #eee;">${ngayThamGia}</td>
                <td style="padding: 10px; border: 1px solid #eee; font-size: 10px; color: #999; max-width: 150px; overflow: hidden; text-overflow: ellipsis;">${JSON.stringify(hs.metadata)}</td>
                <td style="padding: 10px; border: 1px solid #eee; font-family: monospace; color: #888; font-size: 11px;">${hs.uid}</td>
            </tr>
        `;
    });

    htmlTable += `</tbody></table></div>`;
    renderArea.innerHTML = htmlTable;
}



// Hàm 5.11: Xử lý Click tiêu đề để sắp xếp
function ham_5_11_thay_doi_sort(cotMoi) {
    if (BangHocSinhState.cotDangSort === cotMoi) {
        BangHocSinhState.tangDan = !BangHocSinhState.tangDan;
    } else {
        BangHocSinhState.cotDangSort = cotMoi;
        BangHocSinhState.tangDan = true;
    }
    ham_5_10_ve_bang_hoc_sinh();
}

// Hàm 5.3: Thực hiện Khóa hoặc Mở khóa tài khoản học sinh
async function ham_5_3_khoa_mo_tai_khoan(uid, trangThaiMoi, tenHS) {
    // Chỉ cần gán đúng chữ: Nếu trạng thái muốn đổi thành là 1 -> Hiện "MỞ KHÓA", ngược lại hiện "KHÓA"
    const hanhDong = parseInt(trangThaiMoi) === 1 ? "MỞ KHÓA" : "KHÓA";

    if (!confirm(`Thầy có chắc chắn muốn ${hanhDong} tài khoản của học sinh: ${tenHS}?`)) return;

    document.getElementById('danh-sach-hs-render').innerHTML = `<p style="text-align: center; color: #f39c12;">Đang xử lý...</p>`;

    try {
        const { error } = await _supabase
            .from('hoc_sinh')
            .update({ trang_thai: parseInt(trangThaiMoi) })
            .eq('uid', uid);

        if (error) throw error;

        // Tải lại bảng sau khi cập nhật thành công
        ham_5_2_tai_danh_sach_hoc_sinh();

    } catch (error) {
        alert(`Lỗi khi ${hanhDong}: ` + error.message);
        ham_5_10_ve_bang_hoc_sinh();
    }
}


// ==============================================================================
// KHỐI 6: QUẢN LÝ KHO HỌC LIỆU VÀ ĐỀ THI (BẢNG hoc_lieu)
// ==============================================================================

// Biến lưu trữ trạng thái bảng Học liệu để Sắp xếp
const BangHocLieuState = {
    duLieu: [],
    cotDangSort: 'ngay_tao',
    tangDan: false // Mới nhất xếp trên
};

// Hàm 6.1: Vẽ bộ khung giao diện Quản lý Học Liệu
function ham_6_1_ve_quan_ly_hoc_lieu() {
    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');

    vungLamViec.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <h3 style="margin: 0; color: #28a745;">📚 Quản lý Kho Học Liệu & Đề Thi</h3>
            <div style="display: flex; gap: 10px;">
                <button onclick="ham_6_2_tai_danh_sach_hoc_lieu()" style="padding: 10px 15px; background: #f1f3f4; color: #333; border: 1px solid #ccc; border-radius: 6px; cursor: pointer; font-weight: bold;">
                    🔄 Làm mới dữ liệu
                </button>
                <button onclick="ham_6_3_hien_form_them_hoc_lieu()" style="padding: 10px 15px; background: #28a745; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(40,167,69,0.2);">
                    + Tạo Học Liệu / Đề Thi
                </button>
            </div>
        </div>
        <div id="danh-sach-hl-render">
            <p style="text-align: center; color: #666;">Đang tải dữ liệu học liệu từ máy chủ...</p>
        </div>
    `;

    ham_6_2_tai_danh_sach_hoc_lieu();
}

// Hàm 6.2: Tải dữ liệu từ bảng hoc_lieu và lấy thêm tên Giáo viên tạo
async function ham_6_2_tai_danh_sach_hoc_lieu() {
    const renderArea = document.getElementById('danh-sach-hl-render');
    try {
        const { data: dsHocLieu, error } = await _supabase.from('hoc_lieu').select('*');
        if (error) throw error;

        // Bổ sung: Lấy tên giáo viên tạo (giống phần Lớp học)
        const danhSachUidGv = [...new Set((dsHocLieu || []).map(hl => hl.uid_gv_tao).filter(id => id))];
        let tuDienTenGv = {};

        if (danhSachUidGv.length > 0) {
            const { data: dsGv } = await _supabase.from('hoc_sinh').select('uid, ten').in('uid', danhSachUidGv);
            if (dsGv) {
                dsGv.forEach(gv => tuDienTenGv[gv.uid] = gv.ten);
            }
        }

        // Gắn tên giáo viên vào dữ liệu
        BangHocLieuState.duLieu = (dsHocLieu || []).map(hl => ({
            ...hl,
            ten_gv_tao: tuDienTenGv[hl.uid_gv_tao] || 'Không xác định'
        }));

        ham_6_10_ve_bang_hoc_lieu();

    } catch (error) {
        renderArea.innerHTML = `<p style="color: red;">Lỗi tải dữ liệu: ${error.message}</p>`;
    }
}

// Hàm 6.10: Vẽ Bảng Học Liệu (Cập nhật hiển thị Quy mô & Cấu trúc)
function ham_6_10_ve_bang_hoc_lieu() {
    const renderArea = document.getElementById('danh-sach-hl-render');
    let dsHL = [...BangHocLieuState.duLieu];

    if (dsHL.length === 0) {
        renderArea.innerHTML = `<p style="text-align: center; color: #666; padding: 20px; background: white; border-radius: 8px;">Chưa có học liệu hoặc đề thi nào.</p>`;
        return;
    }

    // Thuật toán Sort
    const cot = BangHocLieuState.cotDangSort;
    const heSo = BangHocLieuState.tangDan ? 1 : -1;
    dsHL.sort((a, b) => {
        let valA = a[cot] === null || a[cot] === undefined ? '' : a[cot];
        let valB = b[cot] === null || b[cot] === undefined ? '' : b[cot];
        if (typeof valA === 'string') valA = valA.toLowerCase();
        if (typeof valB === 'string') valB = valB.toLowerCase();
        if (valA < valB) return -1 * heSo;
        if (valA > valB) return 1 * heSo;
        return 0;
    });

    const iconSort = BangHocLieuState.tangDan ? ' ▲' : ' ▼';
    const getIcon = (tenCot) => (cot === tenCot ? iconSort : ' ↕');

    let htmlTable = `
        <div style="overflow-x: auto; border: 1px solid #dee2e6; border-radius: 8px;">
            <table style="width: 100%; min-width: 1600px; border-collapse: collapse; background: white; font-size: 13px;">
                <thead>
                    <tr style="background: #f8f9fa; text-align: left; border-bottom: 2px solid #dee2e6; white-space: nowrap; cursor: pointer;">
                        <th style="padding: 10px; border: 1px solid #eee; text-align: center; width: 40px;">STT</th>
                        <th style="padding: 10px; border: 1px solid #eee; text-align: center;">Thao tác</th>
                        <th style="padding: 10px; border: 1px solid #eee;" onclick="ham_6_11_thay_doi_sort('ma_hoc_lieu')">Mã HL ${getIcon('ma_hoc_lieu')}</th>
                        <th style="padding: 10px; border: 1px solid #eee;" onclick="ham_6_11_thay_doi_sort('ten_hoc_lieu')">Tên Học Liệu / Đề Thi ${getIcon('ten_hoc_lieu')}</th>
                        <th style="padding: 10px; border: 1px solid #eee;" onclick="ham_6_11_thay_doi_sort('loai_kiem_tra')">Phân loại ${getIcon('loai_kiem_tra')}</th>
                        <th style="padding: 10px; border: 1px solid #eee; text-align: center;" onclick="ham_6_11_thay_doi_sort('khoi_lop')">Khối ${getIcon('khoi_lop')}</th>
                        
                        <th style="padding: 10px; border: 1px solid #eee; text-align: center;" onclick="ham_6_11_thay_doi_sort('quy_mo_cau_hoi')">Quy mô / Cấu trúc ${getIcon('quy_mo_cau_hoi')}</th>
                        
                        <th style="padding: 10px; border: 1px solid #eee; text-align: center;" onclick="ham_6_11_thay_doi_sort('thoi_gian_lam_bai')">Thời gian ${getIcon('thoi_gian_lam_bai')}</th>
                        <th style="padding: 10px; border: 1px solid #eee; text-align: center;" onclick="ham_6_11_thay_doi_sort('trang_thai')">Trạng thái ${getIcon('trang_thai')}</th>
                        <th style="padding: 10px; border: 1px solid #eee;">Giáo viên</th>
                        <th style="padding: 10px; border: 1px solid #eee;">Ngày tạo</th>
                        <th style="padding: 10px; border: 1px solid #eee;">Mã câu hỏi</th>
                    </tr>
                </thead>
                <tbody>
    `;

    dsHL.forEach((hl, index) => {
        const ngayTao = hl.ngay_tao ? new Date(hl.ngay_tao).toLocaleString('vi-VN') : '-';

        // 1. Xử lý quy mô câu hỏi kết hợp cấu trúc từ metadata
        const chuoiCauTruc = (hl.metadata && hl.metadata.cau_truc) ? hl.metadata.cau_truc : '';
        const hienThiQuyMo = chuoiCauTruc
            ? `<div style="font-weight: bold; color: #6f42c1;">${chuoiCauTruc}</div><div style="font-size: 11px; color: #666;">(${hl.quy_mo_cau_hoi} câu)</div>`
            : `<span style="font-weight: bold;">${hl.quy_mo_cau_hoi} câu</span>`;

        // 2. Xử lý thời gian
        const thoiGian = (hl.thoi_gian_lam_bai > 0)
            ? `<span style="color: #dc3545; font-weight: bold;">⏳ ${hl.thoi_gian_lam_bai}p</span>`
            : `<span style="color: #6c757d; font-style: italic;">Tự luyện</span>`;

        // 3. Trạng thái
        const trangThaiText = hl.trang_thai === 'cong_khai'
            ? `<span style="background: #e6ffed; color: #28a745; padding: 4px 8px; border-radius: 12px; font-weight: bold; font-size: 11px;">Công khai</span>`
            : `<span style="background: #f1f3f4; color: #666; padding: 4px 8px; border-radius: 12px; font-weight: bold; font-size: 11px;">Nội bộ</span>`;

        htmlTable += `
            <tr onclick="ham_6_6_mo_form_sua_hoc_lieu('${hl.ma_hoc_lieu}', false)" 
                style="border-bottom: 1px solid #eee; transition: 0.2s; cursor: pointer;" 
                onmouseover="this.style.background='#f1f8ff'" 
                onmouseout="this.style.background='white'">
                
                <td style="padding: 10px; border: 1px solid #eee; text-align: center; font-weight: bold;">${index + 1}</td>
                
                <td style="padding: 10px; border: 1px solid #eee; text-align: center; white-space: nowrap;">
                    <button onclick="event.stopPropagation(); ham_6_6_mo_form_sua_hoc_lieu('${hl.ma_hoc_lieu}', true)" style="padding: 5px 10px; background: #f39c12; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; margin-right: 5px;">Sửa</button>
                    <button onclick="event.stopPropagation(); ham_6_8_xoa_hoc_lieu('${hl.ma_hoc_lieu}', '${hl.ten_hoc_lieu}')" style="padding: 5px 10px; background: #dc3545; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer;">Xóa</button>
                </td>
                
                <td style="padding: 10px; border: 1px solid #eee; font-weight: bold; color: #d35400;">${hl.ma_hoc_lieu}</td>
                <td style="padding: 10px; border: 1px solid #eee; font-weight: bold; color: #1a73e8;">${hl.ten_hoc_lieu}</td>
                <td style="padding: 10px; border: 1px solid #eee;">${hl.loai_kiem_tra}</td>
                <td style="padding: 10px; border: 1px solid #eee; text-align: center; font-weight: bold;">${hl.khoi_lop}</td>
                <td style="padding: 10px; border: 1px solid #eee; text-align: center; line-height: 1.2;">${hienThiQuyMo}</td>
                <td style="padding: 10px; border: 1px solid #eee; text-align: center;">${thoiGian}</td>
                <td style="padding: 10px; border: 1px solid #eee; text-align: center;">${trangThaiText}</td>
                <td style="padding: 10px; border: 1px solid #eee; font-size: 12px;">${hl.ten_gv_tao}</td>
                <td style="padding: 10px; border: 1px solid #eee; font-size: 11px; color: #666;">${ngayTao}</td>
                <td style="padding: 10px; border: 1px solid #eee; color: #999; font-size: 11px; max-width: 100px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                    ${hl.danh_sach_cau_hoi ? hl.danh_sach_cau_hoi.join(', ') : '[]'}
                </td>
            </tr>
        `;
    });

    htmlTable += `</tbody></table></div>`;
    renderArea.innerHTML = htmlTable;
}

// Hàm 6.11: Xử lý thay đổi cột Sắp xếp
function ham_6_11_thay_doi_sort(cotMoi) {
    if (BangHocLieuState.cotDangSort === cotMoi) {
        BangHocLieuState.tangDan = !BangHocLieuState.tangDan;
    } else {
        BangHocLieuState.cotDangSort = cotMoi;
        BangHocLieuState.tangDan = true;
    }
    ham_6_10_ve_bang_hoc_lieu();
}


// Hàm 6.0: Sinh mã học liệu ngẫu nhiên theo loại (Tiền tố + 7 ký tự)
function ham_6_0_sinh_ma_hoc_lieu(loaiPrefix) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomPart = '';
    for (let i = 0; i < 7; i++) {
        randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    // Trả về định dạng: HL_LOAI_RANDOM
    return `HL_${loaiPrefix}_${randomPart}`;
}



// Hàm 6.0: Sinh mã định danh ngẫu nhiên theo loại
function ham_6_0_sinh_ma_hoc_lieu(loaiPrefix) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomPart = '';
    for (let i = 0; i < 7; i++) {
        randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `HL_${loaiPrefix}_${randomPart}`;
}

// Hàm 6.3: Vẽ Form thêm mới Học Liệu / Đề Thi (Bản tích hợp đầy đủ)
function ham_6_3_hien_form_them_hoc_lieu() {
    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');

    // Mặc định ban đầu sinh mã cho Đề thi (DE)
    const maHLBanDau = ham_6_0_sinh_ma_hoc_lieu('DE');

    vungLamViec.innerHTML = `
        <div style="max-width: 950px; background: #ffffff; padding: 25px; border-radius: 12px; border: 1px solid #e0e0e0; margin: 0 auto; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
            <h3 style="color: #28a745; border-bottom: 2px solid #f1f3f4; padding-bottom: 10px; margin-top: 0;">
                TẠO HỌC LIỆU / ĐỀ THI MỚI
            </h3>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; margin-bottom: 20px;">
                <div>
                    <label style="font-weight: bold; font-size: 14px; color: #d35400;">Mã định danh (Tự động):</label>
                    <input type="text" id="txtMaHocLieu" value="${maHLBanDau}" readonly style="width: 100%; padding: 10px; background: #f1f3f4; border: 1px solid #ddd; border-radius: 6px; font-weight: bold; color: #d35400; cursor: not-allowed;">
                </div>

                <div>
                    <label style="font-weight: bold; font-size: 14px; color: #1a73e8;">Phân loại học liệu:</label>
                    <select id="selLoaiKiemTra" onchange="ham_6_3_b_cap_nhat_ma_theo_loai()" style="width: 100%; padding: 10px; border: 2px solid #1a73e8; border-radius: 6px; cursor: pointer; font-weight: bold;">
                        <option value="DE">Đề thi thử / Chính thức</option>
                        <option value="KT">Bài kiểm tra định kỳ</option>
                        <option value="TL">Tài liệu / Bài tập tự luyện</option>
                        <option value="BG">Bài giảng (Slide/PDF)</option>
                        <option value="VD">Video bài giảng</option>
                    </select>
                </div>

                <div>
                    <label style="font-weight: bold; font-size: 14px;">Khối lớp:</label>
                    <select id="selKhoiLopHL" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px;">
                        <option value="12">Khối 12</option>
                        <option value="11">Khối 11</option>
                        <option value="10">Khối 10</option>
                        <option value="Khác">Khác / Luyện thi</option>
                    </select>
                </div>

                <div style="grid-column: span 3;">
                    <label style="font-weight: bold; font-size: 14px;">Tên Học liệu / Đề thi (*):</label>
                    <input type="text" id="txtTenHocLieu" placeholder="Nhập tên mô tả cho học liệu hoặc đề thi..." style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; box-sizing: border-box;">
                </div>

                <div>
                    <label style="font-weight: bold; font-size: 14px;">Thời gian làm bài (Phút):</label>
                    <input type="number" id="numThoiGian" value="0" min="0" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; box-sizing: border-box;">
                </div>

                <div>
                    <label style="font-weight: bold; font-size: 14px;">Trạng thái lưu trữ:</label>
                    <select id="selTrangThaiHL" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px;">
                        <option value="cong_khai">Công khai (Mở)</option>
                        <option value="noi_bo">Nội bộ (Đóng)</option>
                    </select>
                </div>

                <div>
                    <label style="font-weight: bold; font-size: 14px; color: #6f42c1;">Cấu trúc (Tự động):</label>
                    <input type="text" id="txtCauTruc" readonly style="width: 100%; padding: 10px; background: #f8fbff; border: 1px solid #6f42c1; border-radius: 6px; font-weight: bold; color: #6f42c1;">
                </div>
            </div>

            <div style="margin-bottom: 20px; padding: 15px; border: 1px dashed #e67e22; border-radius: 8px; background: #fffaf0;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                    <label style="font-weight: bold; font-size: 14px; color: #d35400;">Mảng Mã Câu Hỏi ID6 (Dán mã vào từng ô tương ứng):</label>
                    <span id="lblTongCauHoi" style="background: #d35400; color: white; padding: 5px 12px; border-radius: 20px; font-weight: bold; font-size: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">Tổng: 0 câu</span>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px;">
                    <div>
                        <label style="font-size: 11px; font-weight: bold; color: #1a73e8; display: block; margin-bottom: 5px;">PHẦN 1: TRẮC NGHIỆM (<span id="demTN">0</span>)</label>
                        <textarea id="txtID_TN" oninput="ham_6_5_tinh_toan_cau_truc()" rows="7" placeholder="Mỗi mã một dòng hoặc cách nhau dấu phẩy..." style="width: 100%; padding: 8px; border: 1px solid #1a73e8; border-radius: 4px; box-sizing: border-box; font-family: monospace; font-size: 11px; resize: none;"></textarea>
                    </div>
                    <div>
                        <label style="font-size: 11px; font-weight: bold; color: #d35400; display: block; margin-bottom: 5px;">PHẦN 2: ĐÚNG / SAI (<span id="demDS">0</span>)</label>
                        <textarea id="txtID_DS" oninput="ham_6_5_tinh_toan_cau_truc()" rows="7" placeholder="Dán mã ID6 câu Đúng Sai..." style="width: 100%; padding: 8px; border: 1px solid #d35400; border-radius: 4px; box-sizing: border-box; font-family: monospace; font-size: 11px; resize: none;"></textarea>
                    </div>
                    <div>
                        <label style="font-size: 11px; font-weight: bold; color: #28a745; display: block; margin-bottom: 5px;">PHẦN 3: TRẢ LỜI NGẮN (<span id="demTLN">0</span>)</label>
                        <textarea id="txtID_TLN" oninput="ham_6_5_tinh_toan_cau_truc()" rows="7" placeholder="Dán mã ID6 câu Trả lời ngắn..." style="width: 100%; padding: 8px; border: 1px solid #28a745; border-radius: 4px; box-sizing: border-box; font-family: monospace; font-size: 11px; resize: none;"></textarea>
                    </div>
                </div>
            </div>

            <div style="display: flex; gap: 12px; margin-top: 20px;">
                <button onclick="ham_6_4_luu_hoc_lieu_moi(this)" style="flex: 2; padding: 12px; background: #28a745; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; font-size: 15px; transition: 0.3s;">
                    💾 LƯU HỌC LIỆU / ĐỀ THI
                </button>
                <button onclick="ham_6_1_ve_quan_ly_hoc_lieu()" style="flex: 1; padding: 12px; background: #6c757d; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 15px;">
                    ❌ HỦY QUAY LẠI
                </button>
            </div>
        </div>
    `;
}

// Hàm 6.3.b: Cập nhật mã định danh tức thì khi đổi Combobox Phân loại
function ham_6_3_b_cap_nhat_ma_theo_loai() {
    const loaiChon = document.getElementById('selLoaiKiemTra').value;
    const maMoi = ham_6_0_sinh_ma_hoc_lieu(loaiChon);
    const txtMa = document.getElementById('txtMaHocLieu');
    txtMa.value = maMoi;

    // Hiệu ứng đổi màu nhẹ để báo hiệu mã đã thay đổi
    txtMa.style.background = '#fff3cd';
    setTimeout(() => { txtMa.style.background = '#f1f3f4'; }, 300);
}

// Hàm 6.5: Tính toán cấu trúc 2025 và đếm số lượng câu hỏi thời gian thực
function ham_6_5_tinh_toan_cau_truc() {
    const bocTach = (chuoi) => [...new Set(chuoi.split(/[\s,;]+/).filter(id => id.trim() !== ''))];

    const arrTN = bocTach(document.getElementById('txtID_TN').value);
    const arrDS = bocTach(document.getElementById('txtID_DS').value);
    const arrTLN = bocTach(document.getElementById('txtID_TLN').value);

    // Cập nhật số lượng hiển thị trên từng ô
    document.getElementById('demTN').innerText = arrTN.length;
    document.getElementById('demDS').innerText = arrDS.length;
    document.getElementById('demTLN').innerText = arrTLN.length;

    const tong = arrTN.length + arrDS.length + arrTLN.length;
    document.getElementById('lblTongCauHoi').innerText = `Tổng: ${tong} câu`;

    // Tự động tạo chuỗi cấu trúc ví dụ: 12TN-4DS-6TLN
    let mangMôTả = [];
    if (arrTN.length > 0) mangMôTả.push(`${arrTN.length}TN`);
    if (arrDS.length > 0) mangMôTả.push(`${arrDS.length}DS`);
    if (arrTLN.length > 0) mangMôTả.push(`${arrTLN.length}TLN`);

    document.getElementById('txtCauTruc').value = mangMôTả.join(' - ');
}



// Hàm 6.4: Lưu dữ liệu (Đã sửa lỗi không đọc Trạng thái)
async function ham_6_4_luu_hoc_lieu_moi(btn) {
    const maHL = document.getElementById('txtMaHocLieu').value;
    const tenHL = document.getElementById('txtTenHocLieu').value.trim();
    const khoiLop = document.getElementById('selKhoiLopHL').value;
    const loaiKT = document.getElementById('selLoaiKiemTra').value;
    const thoiGian = parseInt(document.getElementById('numThoiGian').value) || 0;
    const cauTruc = document.getElementById('txtCauTruc').value.trim();

    // ĐÃ SỬA: Đọc trạng thái từ ComboBox thầy chọn
    const trangThai = document.getElementById('selTrangThaiHL').value;

    const bocTach = (chuoi) => [...new Set(chuoi.split(/[\s,;]+/).filter(id => id.trim() !== ''))];
    const arrTN = bocTach(document.getElementById('txtID_TN').value);
    const arrDS = bocTach(document.getElementById('txtID_DS').value);
    const arrTLN = bocTach(document.getElementById('txtID_TLN').value);

    const mangGopChung = [...arrTN, ...arrDS, ...arrTLN];

    if (!tenHL) return alert("Thầy vui lòng nhập Tên Học Liệu!");

    btn.disabled = true;
    btn.innerText = "ĐANG LƯU...";

    try {
        const { error } = await _supabase.from('hoc_lieu').insert([{
            ma_hoc_lieu: maHL,
            ten_hoc_lieu: tenHL,
            khoi_lop: khoiLop,
            loai_kiem_tra: loaiKT,
            thoi_gian_lam_bai: thoiGian,
            quy_mo_cau_hoi: mangGopChung.length,
            danh_sach_cau_hoi: mangGopChung,
            trang_thai: trangThai, // LẤY ĐÚNG GIÁ TRỊ THẦY CHỌN
            uid_gv_tao: AppState.user.uid,
            metadata: {
                cau_truc: cauTruc,
                so_tn: arrTN.length,
                so_ds: arrDS.length,
                so_tln: arrTLN.length
            },
            ngay_tao: new Date().toISOString()
        }]);

        if (error) throw error;

        alert(`Đã tạo thành công!`);
        ham_6_1_ve_quan_ly_hoc_lieu();

    } catch (error) {
        alert("Lỗi: " + error.message);
        btn.disabled = false;
        btn.innerText = "LƯU DỮ LIỆU";
    }
}



// Hàm 6.5: Lấy ID từ 3 ô, đếm và tự động tạo chuỗi cấu trúc
function ham_6_5_tinh_toan_cau_truc() {
    const bocTach = (chuoi) => [...new Set(chuoi.split(/[\s,;]+/).filter(id => id.trim() !== ''))];

    const arrTN = bocTach(document.getElementById('txtID_TN').value);
    const arrDS = bocTach(document.getElementById('txtID_DS').value);
    const arrTLN = bocTach(document.getElementById('txtID_TLN').value);

    // Cập nhật nhãn đếm từng phần
    document.getElementById('demTN').innerText = arrTN.length;
    document.getElementById('demDS').innerText = arrDS.length;
    document.getElementById('demTLN').innerText = arrTLN.length;

    const tongCau = arrTN.length + arrDS.length + arrTLN.length;
    document.getElementById('lblTongCauHoi').innerText = `Tổng: ${tongCau} câu`;

    // Tự động sinh chuỗi cấu trúc
    let mangCauTruc = [];
    if (arrTN.length > 0) mangCauTruc.push(`${arrTN.length}TN`);
    if (arrDS.length > 0) mangCauTruc.push(`${arrDS.length}DS`);
    if (arrTLN.length > 0) mangCauTruc.push(`${arrTLN.length}TLN`);

    const txtCauTruc = document.getElementById('txtCauTruc');
    txtCauTruc.value = mangCauTruc.join(' - ');
}

// ==============================================================
// Hàm 6.6: Vẽ Form (Hỗ trợ 2 chế độ: XEM và SỬA) - TƯƠNG THÍCH NGƯỢC
// ==============================================================
function ham_6_6_mo_form_sua_hoc_lieu(maHocLieu, choPhepSua = true) {
    const data = BangHocLieuState.duLieu.find(hl => hl.ma_hoc_lieu === maHocLieu);
    if (!data) return alert("Dữ liệu không tồn tại!");

    const tieuDe = choPhepSua ? "✏️ CHỈNH SỬA HỌC LIỆU" : "👁️ XEM CHI TIẾT HỌC LIỆU";
    const mauTieuDe = choPhepSua ? "#f39c12" : "#1a73e8";
    const disabledAttr = choPhepSua ? "" : "disabled";
    const hienThiCotXoa = choPhepSua ? "" : "display: none;";

    const dsCauHoi = data.danh_sach_cau_hoi || [];
    let htmlRows = '';

    dsCauHoi.forEach((item, index) => {
        // Bỏ qua nếu dữ liệu bị rỗng
        if (!item) return;

        let maGoc, maAoDe, maAoGiai, dapAn;
        let chuoiGocDeLuu = "";

        // 🌟 BỘ CHUYỂN ĐỔI THÔNG MINH
        if (typeof item === 'string') {
            const parts = item.split('|');
            if (parts.length >= 4) {
                [maGoc, maAoDe, maAoGiai, dapAn] = parts;
            } else {
                maGoc = "N/A";
                [maAoDe, maAoGiai, dapAn] = parts;
            }
            chuoiGocDeLuu = item;
        } else if (typeof item === 'object') {
            maGoc = item.ma_goc || "N/A";
            maAoDe = item.ma_cau_hoi || item.maCau || "";
            maAoGiai = item.ma_loi_giai || item.maBaoMat || "";
            dapAn = item.dap_an || item.dapAn || "";
            chuoiGocDeLuu = JSON.stringify(item).replace(/"/g, '&quot;');
        }

        htmlRows += `
            <tr class="row-cau-hoi" data-original-string="${chuoiGocDeLuu}" style="border-bottom: 1px solid #eee;">
                <td class="stt-cau" style="padding: 8px; text-align: center; font-weight: bold; color: #666;">${index + 1}</td>
                <td style="padding: 8px; font-weight: bold; color: #1a73e8;">${maGoc}</td>
                <td style="padding: 8px; color: #e67e22; font-size: 11px; font-family: monospace;">${maAoDe}</td>
                <td style="padding: 8px; color: #28a745; font-size: 11px; font-family: monospace;">${maAoGiai}</td>
                <td style="padding: 8px; text-align: center;">
                    <input type="text" class="input-dap-an" value="${dapAn}" ${disabledAttr}
                        style="width: 70px; padding: 5px; border: 2px solid ${choPhepSua ? '#ddd' : 'transparent'}; border-radius: 4px; text-align: center; font-weight: bold; color: #d32f2f; background: transparent;">
                </td>
                <td style="padding: 8px; text-align: center; ${hienThiCotXoa}">
                    <button onclick="ham_6_xoa_cau_truc_tiep(this)" 
                        style="padding: 5px 10px; background: #fff1f0; color: #d32f2f; border: 1px solid #ffa39e; border-radius: 4px; cursor: pointer; font-size: 11px;">🗑️</button>
                </td>
            </tr>
        `;
    });

    let htmlNutBam = '';
    if (choPhepSua) {
        htmlNutBam = `
            <button onclick="ham_6_7_luu_cap_nhat_hoc_lieu('${data.ma_hoc_lieu}', this)" style="flex: 2; padding: 15px; background: #28a745; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; font-size: 16px;">
                💾 XÁC NHẬN LƯU THAY ĐỔI
            </button>
            <button onclick="ham_6_1_ve_quan_ly_hoc_lieu()" style="flex: 1; padding: 15px; background: #f1f3f4; border: 1px solid #ccc; border-radius: 6px; cursor: pointer; font-weight: bold;">
                HỦY
            </button>
        `;
    } else {
        htmlNutBam = `
            <button onclick="ham_6_1_ve_quan_ly_hoc_lieu()" style="width: 100%; padding: 15px; background: #6c757d; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 16px;">
                ⬅️ QUAY LẠI DANH SÁCH
            </button>
        `;
    }

    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
    vungLamViec.innerHTML = `
        <div style="max-width: 1000px; background: #ffffff; padding: 25px; border-radius: 12px; border: 1px solid #e0e0e0; margin: 0 auto; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
            <h3 style="color: ${mauTieuDe}; margin-top: 0; display: flex; justify-content: space-between; align-items: center;">
                <span>${tieuDe}: <small style="color:#666">${data.ma_hoc_lieu}</small></span>
                <span id="lblSoCauHienTai" style="background: ${mauTieuDe}; color: white; padding: 4px 12px; border-radius: 20px; font-size: 14px;">Tổng: ${dsCauHoi.length} câu</span>
            </h3>

            <div style="display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 15px; margin-bottom: 20px;">
                <div>
                    <label style="font-weight: bold; font-size: 13px;">Tên Học Liệu:</label>
                    <input type="text" id="sua_tenHocLieu" value="${data.ten_hoc_lieu}" ${disabledAttr} style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; background: ${choPhepSua ? '#fff' : '#f8f9fa'};">
                </div>
                <div>
                    <label style="font-weight: bold; font-size: 13px;">Trạng thái:</label>
                    <select id="sua_trangThai" ${disabledAttr} style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; background: ${choPhepSua ? '#fff' : '#f8f9fa'};">
                        <option value="noi_bo" ${data.trang_thai === 'noi_bo' ? 'selected' : ''}>🔴 Nội bộ</option>
                        <option value="cong_khai" ${data.trang_thai === 'cong_khai' ? 'selected' : ''}>🟢 Công khai</option>
                    </select>
                </div>
                <div>
                    <label style="font-weight: bold; font-size: 13px;">Thời gian (Phút):</label>
                    <input type="number" id="sua_thoiGian" value="${data.thoi_gian_lam_bai}" ${disabledAttr} style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; background: ${choPhepSua ? '#fff' : '#f8f9fa'};">
                </div>
            </div>

            <div style="background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
                <div style="max-height: 400px; overflow-y: auto; border: 1px solid #ccc; border-radius: 4px;">
                    <table id="tblSuaCauHoi" style="width: 100%; border-collapse: collapse; font-size: 12px; background: white;">
                        <thead style="background: #e9ecef; position: sticky; top: 0; z-index: 1;">
                            <tr>
                                <th style="padding: 10px; border: 1px solid #ccc; width: 40px;">STT</th>
                                <th style="padding: 10px; border: 1px solid #ccc;">Mã Gốc</th>
                                <th style="padding: 10px; border: 1px solid #ccc;">Mã Câu (Ẩn)</th>
                                <th style="padding: 10px; border: 1px solid #ccc;">Mã Giải (Ẩn)</th>
                                <th style="padding: 10px; border: 1px solid #ccc; width: 80px;">Đáp Án</th>
                                <th style="padding: 10px; border: 1px solid #ccc; width: 60px; ${hienThiCotXoa}">Xóa</th>
                            </tr>
                        </thead>
                        <tbody id="tbodySuaCauHoi">
                            ${htmlRows}
                        </tbody>
                    </table>
                </div>
            </div>

            <div style="display: flex; gap: 12px;">
                ${htmlNutBam}
            </div>
        </div>
    `;
}
// Cờ đánh dấu câu bị xóa tạm thời trên giao diện
function ham_6_xoa_cau_hoi_tam_thoi(index) {
    const row = document.getElementById(`row_cau_${index}`);
    const input = document.getElementById(`dapan_${index}`);

    if (row.style.opacity === '0.3') {
        row.style.opacity = '1';
        input.disabled = false;
        row.dataset.deleted = "false";
    } else {
        row.style.opacity = '0.3';
        input.disabled = true;
        row.dataset.deleted = "true"; // Đánh dấu đã xóa
    }
}

// Hàm 6.6.b: Xóa dòng và cập nhật lại toàn bộ STT + Tổng số câu
function ham_6_xoa_cau_truc_tiep(btn) {
    if (!confirm("Thầy có chắc chắn muốn loại bỏ câu hỏi này khỏi đề không?")) return;

    // 1. Tìm dòng tr chứa nút bấm và xóa nó đi
    const row = btn.closest('tr');
    row.remove();

    // 2. Đánh lại số thứ tự (STT) cho các dòng còn lại
    const rows = document.querySelectorAll('#tbodySuaCauHoi .row-cau-hoi');
    rows.forEach((r, index) => {
        r.querySelector('.stt-cau').innerText = index + 1;
    });

    // 3. Cập nhật lại nhãn "Tổng: X câu" trên tiêu đề
    document.getElementById('lblSoCauHienTai').innerText = `Tổng: ${rows.length} câu`;
}


async function ham_6_7_luu_cap_nhat_hoc_lieu(maHocLieu, btnNode) {
    const tenMoi = document.getElementById('sua_tenHocLieu').value.trim();
    const thoiGianMoi = parseInt(document.getElementById('sua_thoiGian').value) || 0;
    const trangThaiMoi = document.getElementById('sua_trangThai').value;

    // 1. Quét bảng thực tế để lấy danh sách câu hỏi còn lại
    const rows = document.querySelectorAll('#tbodySuaCauHoi .row-cau-hoi');
    let banDoMoi = [];

    rows.forEach(row => {
        const originalString = row.getAttribute('data-original-string');
        const dapAnMoi = row.querySelector('.input-dap-an').value.trim().toUpperCase();

        let parts = originalString.split('|');
        // Luôn đè đáp án mới vào khúc cuối cùng
        parts[parts.length - 1] = dapAnMoi;

        banDoMoi.push(parts.join('|'));
    });

    if (banDoMoi.length === 0) return alert("Không thể lưu đề trống!");

    btnNode.disabled = true;
    btnNode.innerText = "ĐANG ĐÓNG GÓI...";

    try {
        const { error } = await _supabase
            .from('hoc_lieu')
            .update({
                ten_hoc_lieu: tenMoi,
                thoi_gian_lam_bai: thoiGianMoi,
                trang_thai: trangThaiMoi,
                danh_sach_cau_hoi: banDoMoi,
                quy_mo_cau_hoi: banDoMoi.length
                // Thầy có thể cập nhật thêm cấu trúc TN-DS-TLN vào metadata ở đây nếu cần
            })
            .eq('ma_hoc_lieu', maHocLieu);

        if (error) throw error;

        alert("✅ Đã cập nhật học liệu thành công!");
        ham_6_1_ve_quan_ly_hoc_lieu();

    } catch (error) {
        alert("Lỗi: " + error.message);
        btnNode.disabled = false;
        btnNode.innerText = "💾 XÁC NHẬN LƯU THAY ĐỔI";
    }
}


// ==============================================================
// Hàm 6.8: Xóa vĩnh viễn Học Liệu khỏi cơ sở dữ liệu
// ==============================================================
async function ham_6_8_xoa_hoc_lieu(maHocLieu, tenHocLieu) {
    // 1. Cảnh báo bảo mật 2 lớp
    const xacNhan = confirm(`⚠️ NGUY HIỂM:\nThầy có chắc chắn muốn XÓA VĨNH VIỄN học liệu:\n[ ${maHocLieu} ] - ${tenHocLieu}\n\nHành động này không thể hoàn tác!`);
    if (!xacNhan) return;

    try {
        // 2. Bắn API Delete lên Supabase
        const { error } = await _supabase
            .from('hoc_lieu')
            .delete()
            .eq('ma_hoc_lieu', maHocLieu);

        if (error) throw error;

        // 3. Thông báo và tải lại bảng
        alert('🗑️ Đã xóa học liệu thành công!');
        ham_6_2_tai_danh_sach_hoc_lieu(); // Fetch lại dữ liệu mới nhất

    } catch (error) {
        alert('Lỗi khi xóa học liệu: ' + error.message);
    }
}



// ==============================================================================
// KHỐI 7: QUẢN LÝ NHIỆM VỤ - GIAO BÀI (BẢNG nhiem_vu)
// ==============================================================================

const BangNhiemVuState = {
    duLieu: [],
    cotDangSort: 'ngay_tao',
    tangDan: false
};

// ==============================================================================
// TỪ ĐIỂN HẰNG SỐ CẤU HÌNH NHIỆM VỤ (Chỉ sửa ở đây nếu muốn thay đổi)
// ==============================================================================
const CFG_NV = {
    DAO_DE: {
        KHONG: "KHONG_DAO",
        CO_BAN: "DAO_CAU_ABCD",     // Đảo Câu + ABCD
        TOAN_DIEN: "DAO_CAU_ABCD_DS" // Đảo Câu + ABCD + Ý Đúng/Sai
    },
    THOI_DIEM: {
        KHOA: "KHOA_HOAN_TOAN",
        SAU_NOP: "SAU_KHI_NOP",
        SAU_HET_HAN: "SAU_KHI_HET_HAN",
        HEN_GIO: "HEN_GIO"
    },
    MUC_DO: {
        KHONG: "NONE",
        DAPAN_DIEM: "CHI_DAPAN",
        FULL_LOIGIAI: "FULL_LOIGIAI"
    },
    FILE_GIAI: {
        CHUA_LENH: "CHUA_CO_LENH",
        DANG_CHO: "DANG_CHO_RAP_FILE",
        DANG_XU_LY: "DANG_XU_LY",
        HOAN_THANH: "DA_HOAN_THANH",
        LOI: "LOI_DONG_GOI"
    },
    // 🌟 THÊM MỚI: Từ điển quy định Tiền tố cho từng loại nhiệm vụ
    PREFIX_LOAI: {
        "Làm đề (Online)": "DE",
        "Tự luận (Nộp ảnh)": "TL",
        "Xem bài giảng": "BG",
        "Khảo sát": "KS"
    }
};

// Hàm 7.1: Vẽ bộ khung giao diện Quản lý Nhiệm Vụ
function ham_7_1_ve_quan_ly_nhiem_vu() {
    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');

    vungLamViec.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <h3 style="margin: 0; color: #6f42c1;">🎯 Quản lý Nhiệm Vụ (Giao Bài)</h3>
            <div style="display: flex; gap: 10px;">
                <button onclick="ham_7_2_tai_danh_sach_nhiem_vu()" style="padding: 10px 15px; background: #f1f3f4; color: #333; border: 1px solid #ccc; border-radius: 6px; cursor: pointer; font-weight: bold;">
                    🔄 Làm mới
                </button>
                <button onclick="ham_7_3_hien_form_them_nhiem_vu()" style="padding: 10px 15px; background: #6f42c1; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(111,66,193,0.2);">
                    + Tạo Nhiệm Vụ Mới
                </button>
            </div>
        </div>
        <div id="danh-sach-nv-render">
            <p style="text-align: center; color: #666;">Đang tải danh sách nhiệm vụ...</p>
        </div>
    `;

    ham_7_2_tai_danh_sach_nhiem_vu();
}


//// ==============================================================
//// Hàm 7.1: MÁY QUÉT DÒ LỖI QUẢN LÝ NHIỆM VỤ (Dành riêng cho điện thoại)
//// ==============================================================
//window.ham_7_1_ve_quan_ly_nhiem_vu = async function () {
//    alert("📍 BƯỚC 1: Đã bấm vào tab Quản lý Nhiệm Vụ!");

//    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
//    if (!vungLamViec) {
//        alert("❌ LỖI: Không tìm thấy vùng làm việc (vung-lam-viec-chi-tiet) trên giao diện!");
//        return;
//    }

//    vungLamViec.innerHTML = `<h3 style="color:blue;">⏳ Đang tải dữ liệu...</h3>`;

//    try {
//        alert("📍 BƯỚC 2: Bắt đầu gửi lệnh lấy dữ liệu từ Supabase...");

//        const { data, error } = await _supabase.from('nhiem_vu').select('*').order('ngay_tao', { ascending: false });

//        if (error) throw error;

//        alert(`📍 BƯỚC 3: Rút dữ liệu thành công! Đã tìm thấy ${data ? data.length : 0} nhiệm vụ.`);

//        // Vẽ một cái bảng siêu thô sơ để loại trừ khả năng vỡ CSS
//        let html = `<table border="1" width="100%" style="margin-top:20px; background:white;">
//                        <tr><th>Tên Nhiệm Vụ</th></tr>`;

//        if (data && data.length > 0) {
//            data.forEach(nv => {
//                html += `<tr><td style="padding:10px;">${nv.ten_nhiem_vu || 'Không tên'}</td></tr>`;
//            });
//        } else {
//            html += `<tr><td style="padding:10px; color:red;">Danh sách trống không</td></tr>`;
//        }
//        html += `</table>`;

//        vungLamViec.innerHTML = html;

//        alert("📍 BƯỚC 4: Đã vẽ xong giao diện lên màn hình điện thoại!");

//    } catch (e) {
//        alert("🚨 BẮT ĐƯỢC LỖI RỒI THẦY ƠI:\n\n" + e.message);
//        vungLamViec.innerHTML = `<div style="color:red; font-weight:bold;">LỖI: ${e.message}</div>`;
//    }
//}



// Hàm 7.2: Tải dữ liệu từ bảng nhiem_vu (Bổ sung lấy tên lớp)
async function ham_7_2_tai_danh_sach_nhiem_vu() {
    const renderArea = document.getElementById('danh-sach-nv-render');
    try {
        const { data: dsNhiemVu, error } = await _supabase.from('nhiem_vu').select('*').order('ngay_tao', { ascending: false });
        if (error) throw error;

        // 1. Lấy tên GV
        const danhSachUidGv = [...new Set((dsNhiemVu || []).map(nv => nv.uid_gv_tao).filter(id => id))];
        let tuDienTenGv = {};
        if (danhSachUidGv.length > 0) {
            const { data: dsGv } = await _supabase.from('hoc_sinh').select('uid, ten').in('uid', danhSachUidGv);
            if (dsGv) dsGv.forEach(gv => tuDienTenGv[gv.uid] = gv.ten);
        }

        // 2. Lấy Tên Lớp làm từ điển (Nếu chưa có)
        if (!window.tempDsLop) {
            const { data: dsLop } = await _supabase.from('lop_hoc').select('*');
            window.tempDsLop = dsLop || [];
        }

        BangNhiemVuState.duLieu = (dsNhiemVu || []).map(nv => ({
            ...nv,
            ten_gv_tao: tuDienTenGv[nv.uid_gv_tao] || 'Không xác định'
        }));

        ham_7_10_ve_bang_nhiem_vu();
    } catch (error) {
        renderArea.innerHTML = `<p style="color: red;">Lỗi tải dữ liệu: ${error.message}</p>`;
    }
}
// ==============================================================
// Hàm 7.10: Vẽ Bảng Danh Sách Nhiệm Vụ (Bản hoàn chỉnh - Có Sắp xếp + Loại NV)
// ==============================================================
function ham_7_10_ve_bang_nhiem_vu() {
    const renderArea = document.getElementById('danh-sach-nv-render');
    let dsNV = [...BangNhiemVuState.duLieu];

    if (dsNV.length === 0) {
        renderArea.innerHTML = `<div style="text-align: center; padding: 30px;"><h4>Chưa có nhiệm vụ nào.</h4></div>`;
        return;
    }

    // 🌟 HÀM PHỤ ĐÚC THẺ <th> CÓ SORT
    const taoThSort = (cotDB, tenHienThi, width = '') => {
        let icon = "<span style='color:#ccc; font-size:10px; margin-left:5px;'>↕️</span>";
        let bgStyle = "";

        if (BangNhiemVuState.cotDangSort === cotDB) {
            icon = BangNhiemVuState.tangDan
                ? "<span style='color:#d35400; font-size:12px; margin-left:5px;'>🔼</span>"
                : "<span style='color:#d35400; font-size:12px; margin-left:5px;'>🔽</span>";
            bgStyle = "background-color: #e6f2ff;";
        }

        return `<th onclick="ham_7_11_sort_nhiem_vu('${cotDB}')" 
                    style="padding: 12px 10px; border: 1px solid #eee; width: ${width}; cursor: pointer; user-select: none; transition: 0.2s; ${bgStyle}"
                    onmouseover="this.style.backgroundColor='#e2e6ea'" 
                    onmouseout="this.style.backgroundColor='${bgStyle ? '#e6f2ff' : 'transparent'}'">
                    ${tenHienThi} ${icon}
                </th>`;
    };

    let htmlTable = `
        <div style="overflow-x: auto; border: 1px solid #dee2e6; border-radius: 8px;">
            <table style="width: 100%; min-width: 1600px; border-collapse: collapse; background: white; font-size: 13px;">
                <thead style="background: #f8f9fa; border-bottom: 2px solid #dee2e6;">
                    <tr>
                        <th style="padding: 12px 10px; border: 1px solid #eee; width: 40px;">STT</th>
                        <th style="padding: 12px 10px; border: 1px solid #eee; width: 120px;">Thao tác</th>
                        
                        ${taoThSort('ma_nhiem_vu', 'Mã NV')}
                        ${taoThSort('ten_nhiem_vu', 'Tên Nhiệm Vụ')}
                        ${taoThSort('loai_nhiem_vu', 'Loại NV', '110px')}
                        ${taoThSort('danh_sach_lop', 'Giao Cho')}
                        ${taoThSort('so_luot_lam_bai', 'Số Lượt', '80px')}
                        ${taoThSort('thoi_gian_mo', 'Mở Lúc')}
                        ${taoThSort('thoi_gian_dong', 'Đóng Lúc')}
                        ${taoThSort('dao_cau_hoi', 'Đảo Đề', '130px')}
                        ${taoThSort('trang_thai', 'Tình Trạng')}
                    </tr>
                </thead>
                <tbody>
    `;

    const now = new Date();

    // Hàm phụ tính khoảng thời gian
    const tinhKhoangThoiGian = (targetDate, isPast) => {
        if (!targetDate) return "";
        const diff = isPast ? (now - targetDate) : (targetDate - now);
        if (diff <= 0) return isPast ? "vừa xong" : "hết hạn";

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diff / (1000 * 60)) % 60);

        let result = [];
        if (d > 0) result.push(`${d}n`);
        if (h > 0) result.push(`${h}g`);
        if (m > 0 && d === 0) result.push(`${m}p`);

        return isPast ? `(đã mở ${result.join(' ')})` : `(còn ${result.join(' ')})`;
    };

    dsNV.forEach((nv, index) => {
        const timeMo = nv.thoi_gian_mo ? new Date(nv.thoi_gian_mo) : null;
        const timeDong = nv.thoi_gian_dong ? new Date(nv.thoi_gian_dong) : null;

        // ==========================================
        // XỬ LÝ BADGE CHO CỘT LOẠI NHIỆM VỤ
        // ==========================================
        let loaiHienThi = "❓ Khác";
        let badgeColor = "#6c757d"; // Màu xám

        if (nv.loai_nhiem_vu === "Làm đề (Online)") {
            loaiHienThi = "📝 Làm đề";
            badgeColor = "#17a2b8"; // Xanh lơ
        } else if (nv.loai_nhiem_vu === "Tự luận (Nộp ảnh)") {
            loaiHienThi = "📷 Tự luận";
            badgeColor = "#6f42c1"; // Tím
        } else if (nv.loai_nhiem_vu === "Xem bài giảng") {
            loaiHienThi = "📺 Video";
            badgeColor = "#e83e8c"; // Hồng
        } else if (nv.loai_nhiem_vu === "Khảo sát") {
            loaiHienThi = "📊 Khảo sát";
            badgeColor = "#fd7e14"; // Cam
        } else if (nv.loai_nhiem_vu) {
            loaiHienThi = nv.loai_nhiem_vu;
        }

        const htmlLoaiNV = `<span style="display:inline-block; padding:5px 8px; background:${badgeColor}15; color:${badgeColor}; border: 1px solid ${badgeColor}40; border-radius:6px; font-weight:bold; font-size:11px; white-space:nowrap;">${loaiHienThi}</span>`;

        // 1. Xử lý Giao Cho (Hiện Tên lớp hoặc Nhãn Tự Do)
        let arrLop = [];
        try { arrLop = typeof nv.danh_sach_lop === 'string' ? JSON.parse(nv.danh_sach_lop) : (nv.danh_sach_lop || []); } catch (e) { }

        let hienThiLop = arrLop.map(ma => {
            // 🌟 NẾU LÀ MÃ TỰ DO THÌ IN TEM MÀU NỔI BẬT
            if (ma === "#LUYEN_TAP_TU_DO#") {
                return `<div style="margin-top: 5px;"><span style="background:#17a2b8; color:white; padding:4px 10px; border-radius:12px; font-weight:bold; font-size:11px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">🌍 LUYỆN TẬP TỰ DO</span></div>`;
            }

            // Nếu là mã lớp bình thường -> Vẽ như cũ
            const lopObj = window.tempDsLop?.find(l => (l.ma_lop || l.ma || l.id) === ma);
            const tenLop = lopObj ? (lopObj.ten_lop || lopObj.ten) : "Lớp ẩn";
            return `<div style="margin-bottom:2px;"><b>${tenLop}</b> <small style="color:#666;">(${ma})</small></div>`;
        }).join('');

        // 2. Xử lý Số lượt
        const soLuot = (nv.so_luot_lam_bai == 0 || !nv.so_luot_lam_bai) ? "♾️ Vô hạn" : `${nv.so_luot_lam_bai} lượt`;

        // 3. Xử lý Đảo đề
        let txtDaoDe = "<span style='color:#999; font-size: 12px;'>❌ Không đảo</span>";
        if (nv.dao_cau_hoi) {
            try {
                const d = typeof nv.dao_cau_hoi === 'string' ? JSON.parse(nv.dao_cau_hoi) : nv.dao_cau_hoi;
                if (d.cau && d.abcd && d.ds) {
                    txtDaoDe = "<div style='color:#d35400; font-weight:bold; font-size:11px; line-height:1.5;' title='Đảo toàn diện'>🌪️ Đảo Câu + ABCD<br>+ Ý Đúng/Sai</div>";
                }
                else if (d.cau && d.abcd) {
                    txtDaoDe = "<div style='color:#28a745; font-weight:bold; font-size:11px;' title='Đảo cơ bản'>🔀 Đảo Câu + ABCD</div>";
                }
            } catch (e) { }
        }

        const fTime = (d) => d ? d.toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }) : "-";

        htmlTable += `
            <tr style="border-bottom: 1px solid #eee; transition: 0.2s;" onmouseover="this.style.background='#f4f8ff'" onmouseout="this.style.background='white'">
                <td style="padding: 10px; text-align: center;">${index + 1}</td>
                <td style="padding: 10px; text-align: center; white-space: nowrap;">
                    <button onclick="ham_7_6_mo_form_nhiem_vu('${nv.ma_nhiem_vu}')" style="padding: 4px 8px; background: #ffc107; border:none; border-radius:4px; font-weight:bold; cursor:pointer;">Sửa</button>
                    <button onclick="ham_7_8_xoa_nhiem_vu('${nv.ma_nhiem_vu}')" style="padding: 4px 8px; background: #dc3545; color:white; border:none; border-radius:4px; font-weight:bold; cursor:pointer; margin-left:5px;">Xóa</button>
                    <button onclick="ham_7_15_thong_ke_nhiem_vu('${nv.ma_nhiem_vu}', '${nv.ten_nhiem_vu.replace(/'/g, "\\'")}')" 
                            style="padding: 6px 12px; background: #6f42c1; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; font-size: 12px; margin-left: 5px;">
                        📊 Thống kê
                    </button>


                </td>
                <td style="padding: 10px; font-weight: bold; color: #6f42c1;">${nv.ma_nhiem_vu}</td>
                <td style="padding: 10px;"><b>${nv.ten_nhiem_vu}</b><br><small style="color:#888;">HL: ${nv.ma_hoc_lieu || 'Không'}</small></td>
                <td style="padding: 10px; text-align: center;">${htmlLoaiNV}</td>
                <td style="padding: 10px; color: #1a73e8;">${hienThiLop}</td>
                <td style="padding: 10px; text-align: center; font-weight: bold;">${soLuot}</td>
                <td style="padding: 10px; text-align: center;">${fTime(timeMo)}<br><small style="color:#28a745;">${nv.trang_thai != 0 && timeMo && now > timeMo ? tinhKhoangThoiGian(timeMo, true) : ""}</small></td>
                <td style="padding: 10px; text-align: center;">${fTime(timeDong)}<br><small style="color:#d35400;">${nv.trang_thai != 0 && timeDong && timeDong > now ? tinhKhoangThoiGian(timeDong, false) : ""}</small></td>
                <td style="padding: 10px; text-align: center;">${txtDaoDe}</td>
                <td style="padding: 10px; text-align: center;">
                    ${nv.trang_thai == 0 ? '<span style="color:#999; font-weight:bold;">⏸️ ĐÃ KHÓA (Thủ công)</span>' : (timeDong && now > timeDong ? '<span style="color:#dc3545; font-weight:bold;">🛑 ĐÃ ĐÓNG (Hết hạn)</span>' : '<span style="color:#28a745; font-weight:bold;">▶️ ĐANG MỞ</span>')}
                </td>
            </tr>
        `;
    });

    htmlTable += `</tbody></table></div>`;
    renderArea.innerHTML = htmlTable;
}



// Hàm 7.3: Vẽ Form Tạo Nhiệm Vụ (Áp dụng Hằng số & Giao diện mới + Bổ sung TÍNH CHẤT)
async function ham_7_3_hien_form_them_nhiem_vu() {
    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
    vungLamViec.innerHTML = `<div style="text-align: center; padding: 40px;"><p>⏳ Đang tải dữ liệu hệ thống (Học liệu, Danh sách lớp)...</p></div>`;

    try {
        const tapKyTu = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let chuoiNgauNhien = '';
        for (let i = 0; i < 6; i++) {
            chuoiNgauNhien += tapKyTu.charAt(Math.floor(Math.random() * tapKyTu.length));
        }
        const maNV_MacDinh = "NV_DE_" + chuoiNgauNhien;

        const { data: dsHocLieu } = await _supabase.from('hoc_lieu').select('*').order('ngay_tao', { ascending: false });
        window.tempDsHocLieu = dsHocLieu || [];

        let htmlOptionsHL = `<option value="KHONG_DUNG" style="font-weight: bold; color: red;">[ --- Không sử dụng học liệu --- ]</option>`;
        window.tempDsHocLieu.forEach(hl => {
            htmlOptionsHL += `<option value="${hl.ma_hoc_lieu}">[${hl.ma_hoc_lieu}] - ${hl.ten_hoc_lieu}</option>`;
        });

        let dsLop = [];
        if (typeof BangLopState !== 'undefined' && BangLopState.duLieu && BangLopState.duLieu.length > 0) dsLop = BangLopState.duLieu;
        else {
            const { data, error } = await _supabase.from('lop_hoc').select('*');
            if (!error && data) dsLop = data;
        }

        let htmlLop = '';
        if (dsLop.length > 0) {
            dsLop.forEach(l => {
                const maLop = l.ma_lop || l.ma || l.id;
                const tenLop = l.ten_lop || l.ten || l.name || maLop;
                htmlLop += `
                    <label style="display: inline-flex; align-items: center; width: 140px; margin-bottom: 10px; cursor: pointer;">
                        <input type="checkbox" class="chk-lop" value="${maLop}" style="transform: scale(1.3); margin-right: 8px;"> 
                        <span style="font-weight: bold; color: #1a73e8; font-size: 14px;">${tenLop}</span>
                    </label>
                `;
            });
        } else {
            htmlLop = `<div style="padding: 10px; background: #fff3cd; border: 1px solid #ffeeba; border-radius: 6px;"><span style="color: #856404; font-weight: bold;">⚠️ Không tìm thấy danh sách lớp!</span></div>`;
        }

        vungLamViec.innerHTML = `
            <div style="max-width: 950px; background: white; padding: 25px; border-radius: 12px; margin: 0 auto; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
                <h3 style="color: #6f42c1; margin-top: 0; border-bottom: 2px solid #f1f3f4; padding-bottom: 10px;">🎯 TẠO NHIỆM VỤ MỚI</h3>
                
                <div style="background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
                    <h4 style="margin-top: 0; color: #495057;">1. Thông tin chung</h4>
                    <div style="display: grid; grid-template-columns: 1fr 2fr 1fr; gap: 15px;">
                        <div>
                            <label style="font-weight:bold; font-size: 13px;">Mã NV (Tự động):</label>
                            <input type="text" id="add_nv_ma" value="${maNV_MacDinh}" data-random="${chuoiNgauNhien}" readonly style="width: 100%; padding: 8px; background: #e9ecef; border: 1px solid #ccc; border-radius: 4px; font-weight:bold; color: #dc3545; cursor: not-allowed;">
                        </div>
                        <div>
                            <label style="font-weight:bold; font-size: 13px;">Tên Nhiệm Vụ (*):</label>
                            <input type="text" id="add_nv_ten" placeholder="Nhập tên nhiệm vụ..." style="width: 100%; padding: 8px; border: 1px solid #1a73e8; border-radius: 4px;">
                        </div>
                        <div>
                            <label style="font-weight:bold; font-size: 13px;">Loại nhiệm vụ:</label>
                            <select id="add_nv_loai" onchange="ham_7_3_d_cap_nhat_ma_nv()" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                                <option value="Làm đề (Online)">📝 Làm đề (Online)</option>
                                <option value="Tự luận (Nộp ảnh)">📷 Làm Tự luận (Chụp ảnh nộp)</option>
                                <option value="Xem bài giảng">📺 Xem Video / Slide</option>
                                <option value="Khảo sát">📊 Khảo sát / Lấy ý kiến</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div style="background: #e6f2ff; border: 1px solid #b8daff; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
                    <h4 style="margin-top: 0; color: #0056b3;">2. Dữ liệu Học Liệu (Đề thi)</h4>
                    <div style="margin-bottom: 15px;">
                        <select id="add_nv_maHL" onchange="ham_7_3_a_xu_ly_chon_hoc_lieu()" style="width: 100%; padding: 10px; border: 2px solid #d35400; border-radius: 4px; font-weight:bold;">
                            <option value="">-- Vui lòng chọn một đề thi --</option>
                            ${htmlOptionsHL}
                        </select>
                    </div>
                    <div id="khu_vuc_thong_tin_hl" style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; opacity: 0.5; pointer-events: none;">
                        <div><label style="font-size: 12px; font-weight:bold;">Khối Lớp:</label><select id="add_nv_khoi" style="width: 100%; padding: 6px; border: 1px solid #ccc; border-radius: 4px;"><option value="12">Khối 12</option><option value="11">Khối 11</option><option value="10">Khối 10</option><option value="Khác">Khác</option></select></div>
                        <div><label style="font-size: 12px; font-weight:bold;">Loại kiểm tra:</label><input type="text" id="add_nv_loaiKT" style="width: 100%; padding: 6px; border: 1px solid #ccc; border-radius: 4px;"></div>
                        <div><label style="font-size: 12px; font-weight:bold; color: #6f42c1;">Quy mô:</label><input type="text" id="add_nv_quymo" readonly style="width: 100%; padding: 6px; background:#f4f4f4; border: 1px dotted #6f42c1; border-radius: 4px; color:#6f42c1; font-weight:bold;"></div>
                    </div>
                </div>

                <div style="background: #fff8e6; border: 1px solid #ffe8a1; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
                    <h4 style="margin-top: 0; color: #d35400;">3. Phân công & Cấu hình Đăng ký</h4>

                    <div style="margin-bottom: 15px; padding: 10px; background: #e8f4fd; border: 1px solid #b8daff; border-radius: 6px;">
                        <label style="font-size: 12px; font-weight:bold; color: #0056b3;">Tính chất bài tập:</label>
                        <div style="display: flex; gap: 20px; margin-top: 5px;">
                            <label style="cursor: pointer; font-weight: bold; font-size: 13px;">
                                <input type="radio" name="add_nv_tinhchat" value="BAT_BUOC" checked onchange="document.getElementById('khung_chon_lop').style.display='block'">
                                🎯 Bắt buộc (Giao cho Lớp)
                            </label>
                            <label style="cursor: pointer; font-weight: bold; font-size: 13px; color: #d35400;">
                                <input type="radio" name="add_nv_tinhchat" value="TU_DO" onchange="document.getElementById('khung_chon_lop').style.display='none'">
                                🌍 Luyện tập tự do (Mở cho tất cả)
                            </label>
                        </div>
                    </div>

                    <div id="khung_chon_lop" style="margin-bottom: 20px; border-bottom: 1px dashed #ccc; padding-bottom: 15px;">
                        <label style="font-weight:bold; font-size: 13px; display:block; margin-bottom: 5px;">Giao cho Lớp (*):</label>
                        <div style="margin-bottom: 10px;">
                            <button onclick="ham_7_3_b_chon_tat_ca_lop(true)" style="padding: 3px 8px; font-size: 11px;">Chọn tất cả</button>
                            <button onclick="ham_7_3_b_chon_tat_ca_lop(false)" style="padding: 3px 8px; font-size: 11px;">Bỏ chọn</button>
                        </div>
                        <div style="background: white; padding: 10px; border: 1px solid #ddd; border-radius: 4px; max-height: 120px; overflow-y: auto;">
                            ${htmlLop}
                        </div>
                    </div>

                    <div style="display: flex; flex-direction: column; gap: 12px;">
                        
                        <div style="display: flex; align-items: center; background: white; padding: 8px 12px; border-radius: 6px; border: 1px solid #eee;">
                            <label style="width: 160px; font-size: 13px; font-weight:bold;">🟢 Trạng thái NV:</label>
                            <select id="add_nv_trangthai" style="flex: 1; padding: 8px; border: 1px solid #28a745; border-radius: 4px; font-weight: bold;">
                                <option value="1" selected>🟢 Mở (Kích hoạt)</option>
                                <option value="0">🔴 Khóa (Tạm dừng)</option>
                            </select>
                        </div>

                        <div style="display: flex; align-items: center; background: white; padding: 8px 12px; border-radius: 6px; border: 1px solid #eee;">
                            <label style="width: 160px; font-size: 13px; font-weight:bold; color: #d35400;">⏱️ Thời gian làm (phút):</label>
                            <input type="number" id="add_nv_thoigian" placeholder="Ví dụ: 45, 90..." min="0" style="flex: 1; padding: 8px; border: 1px solid #d35400; border-radius: 4px; font-weight: bold;">
                        </div>

                        <div style="display: flex; align-items: center; background: white; padding: 8px 12px; border-radius: 6px; border: 1px solid #eee;">
                            <label style="width: 160px; font-size: 13px; font-weight:bold;">🔄 Số lượt làm bài:</label>
                            <input type="number" id="add_nv_soluot" value="0" min="0" style="flex: 1; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                        </div>

                        <div style="display: flex; align-items: center; background: white; padding: 8px 12px; border-radius: 6px; border: 1px solid #eee;">
                            <label style="width: 160px; font-size: 13px; font-weight:bold;">📅 Mở Lúc:</label>
                            <input type="datetime-local" id="add_nv_mo" style="flex: 1; padding: 8px; border: 1px solid #ccc; border-radius: 4px; font-family: 'Roboto', sans-serif;">
                        </div>

                        <div style="display: flex; align-items: center; background: white; padding: 8px 12px; border-radius: 6px; border: 1px solid #eee;">
                            <label style="width: 160px; font-size: 13px; font-weight:bold;">⛔ Đóng Lúc:</label>
                            <input type="datetime-local" id="add_nv_dong" style="flex: 1; padding: 8px; border: 1px solid #ccc; border-radius: 4px; font-family: 'Roboto', sans-serif;">
                        </div>

                    </div>

                    <div style="margin-top: 15px; border-top: 1px dashed #e5c381; padding-top: 15px;">
                        <label style="font-weight:bold; font-size: 13px; color: #d35400;">🔀 Chế độ Đảo đề (Dùng JSON):</label>
                        <select id="add_nv_che_do_dao" style="width: 100%; padding: 10px; border: 2px solid #d35400; border-radius: 6px; font-weight: bold; font-size: 14px;">
                            <option value="${CFG_NV.DAO_DE.KHONG}">❌ Không đảo gì cả</option>
                            <option value="${CFG_NV.DAO_DE.CO_BAN}" selected>🔀 Đảo Câu hỏi + Đảo ABCD (Nhóm TN)</option>
                            <option value="${CFG_NV.DAO_DE.TOAN_DIEN}">🌪️ Đảo Câu hỏi + Đảo ABCD + Đảo ý a,b,c,d (Nhóm ĐS)</option>
                        </select>
                    </div>
                </div>

                <div style="background: #e6ffed; border: 1px solid #c3e6cb; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
                    <h4 style="margin-top: 0; color: #28a745;">4. Cấu hình Công bố & Bảo mật</h4>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        <div>
                            <label style="font-weight:bold; font-size: 13px;">Thời điểm công bố:</label>
                            <select id="add_nv_thoigiano" onchange="ham_7_3_c_xu_ly_cong_bo()" style="width: 100%; padding: 10px; border: 1px solid #28a745; border-radius: 4px; font-weight: bold;">
                                <option value="${CFG_NV.THOI_DIEM.KHOA}">🔒 Khóa hoàn toàn (Không bao giờ xem)</option>
                                <option value="${CFG_NV.THOI_DIEM.SAU_NOP}">✅ Ngay sau khi nộp bài</option>
                                <option value="${CFG_NV.THOI_DIEM.SAU_HET_HAN}">⏳ Sau khi hết hạn Đóng đề</option>
                                <option value="${CFG_NV.THOI_DIEM.HEN_GIO}">⏰ Hẹn một giờ cụ thể...</option>
                            </select>
                            <div id="khu_vuc_hen_gio" style="display: none; margin-top: 10px;">
                                <label style="font-size: 12px; color: #d35400; font-weight:bold;">Giờ kích hoạt:</label>
                                <input type="datetime-local" id="add_nv_giocongbo" style="width: 100%; padding: 8px; border: 1px solid #d35400; border-radius: 4px;">
                            </div>
                        </div>
                        <div id="khu_vuc_muc_do" style="opacity: 0.3; pointer-events: none;">
                            <label style="font-weight:bold; font-size: 13px;">Mức độ công bố:</label>
                            <select id="add_nv_mucdo" style="width: 100%; padding: 10px; border: 1px solid #1a73e8; border-radius: 4px; font-weight: bold; color: #1a73e8;">
                                <option value="${CFG_NV.MUC_DO.DAPAN_DIEM}">📊 Chỉ xem Bảng Đáp án (A,B,C,D) & Điểm</option>
                                <option value="${CFG_NV.MUC_DO.FULL_LOIGIAI}"selected>📚 Xem Đáp án VÀ Tải File Lời giải chi tiết</option>
                            </select>
                            <p style="font-size: 11px; color: #666; margin-top: 8px; font-style: italic;">
                                🛡️ <strong style="color:#d35400;">Bảo mật:</strong> File Lời giải đang được mã hóa ẩn. Hệ thống chỉ bắt đầu tiến hành dịch và ráp file khi có Lệnh hoặc khi đến Thời điểm công bố.
                            </p>
                        </div>
                    </div>
                </div>

                <div style="display: flex; gap: 15px;">
                    <button onclick="ham_7_4_luu_nhiem_vu_moi(this)" style="flex: 2; padding: 15px; background: #28a745; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 16px;">
                        💾 XÁC NHẬN GIAO BÀI
                    </button>

                    <button onclick="ham_7_1_ve_quan_ly_nhiem_vu()" style="flex: 1; padding: 15px; background: #6c757d; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">
                        HỦY
                    </button>
                </div>
            </div>
        `;
    } catch (error) {
        vungLamViec.innerHTML = `<p style="color:red; text-align:center;">Lỗi khởi tạo form: ${error.message}</p>`;
    }
}



// ==============================================================
// CÁC HÀM BỔ TRỢ XỬ LÝ GIAO DIỆN (UI LOGIC)
// ==============================================================

// ==============================================================
// Hàm 7.11: Xử lý Logic Sắp xếp (Sort) cho Bảng Nhiệm Vụ
// ==============================================================
function ham_7_11_sort_nhiem_vu(cotSort) {
    // 1. Đảo chiều nếu bấm lại cột cũ, hoặc mặc định Tăng dần nếu bấm cột mới
    if (BangNhiemVuState.cotDangSort === cotSort) {
        BangNhiemVuState.tangDan = !BangNhiemVuState.tangDan;
    } else {
        BangNhiemVuState.cotDangSort = cotSort;
        BangNhiemVuState.tangDan = true;
    }

    const isAsc = BangNhiemVuState.tangDan;

    // 2. Chạy thuật toán sắp xếp mảng
    BangNhiemVuState.duLieu.sort((a, b) => {
        let valA = a[cotSort];
        let valB = b[cotSort];

        // Xử lý giá trị rỗng (đẩy xuống cuối hoặc lên đầu tùy chiều)
        if (valA === null || valA === undefined) valA = '';
        if (valB === null || valB === undefined) valB = '';

        // Ép kiểu dữ liệu đặc thù để sort chính xác
        if (cotSort === 'thoi_gian_mo' || cotSort === 'thoi_gian_dong') {
            valA = valA ? new Date(valA).getTime() : (isAsc ? Infinity : -Infinity);
            valB = valB ? new Date(valB).getTime() : (isAsc ? Infinity : -Infinity);
        } else if (cotSort === 'so_luot_lam_bai') {
            valA = Number(valA) || 0;
            valB = Number(valB) || 0;
        } else if (typeof valA === 'object' || typeof valB === 'object') {
            // Dành cho cột jsonb như danh_sach_lop, dao_cau_hoi
            valA = JSON.stringify(valA);
            valB = JSON.stringify(valB);
        }

        // So sánh chuỗi
        if (typeof valA === 'string' && typeof valB === 'string') {
            return isAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }

        // So sánh số
        return isAsc ? (valA > valB ? 1 : -1) : (valA < valB ? 1 : -1);
    });

    // 3. Gọi vẽ lại bảng
    ham_7_10_ve_bang_nhiem_vu();
}

// Hàm 7.3: Vẽ Form Tạo Nhiệm Vụ (Áp dụng Hằng số & Giao diện mới)
function ham_7_3_a_xu_ly_chon_hoc_lieu() {
    const maHL = document.getElementById('add_nv_maHL').value;
    const khuVucInfo = document.getElementById('khu_vuc_thong_tin_hl');

    if (maHL === "KHONG_DUNG" || maHL === "") {
        khuVucInfo.style.opacity = "0.3";
        khuVucInfo.style.pointerEvents = "none";
        document.getElementById('add_nv_khoi').value = "Khác";
        document.getElementById('add_nv_loaiKT').value = "";
        document.getElementById('add_nv_quymo').value = "";
    } else {
        khuVucInfo.style.opacity = "1";
        khuVucInfo.style.pointerEvents = "auto";
        const hlData = window.tempDsHocLieu.find(hl => hl.ma_hoc_lieu === maHL);
        if (hlData) {
            document.getElementById('add_nv_khoi').value = hlData.khoi_lop || "Khác";
            document.getElementById('add_nv_loaiKT').value = hlData.loai_kiem_tra || "";
            let chuoiQuyMo = `${hlData.quy_mo_cau_hoi} câu`;
            if (hlData.metadata && hlData.metadata.cau_truc) {
                chuoiQuyMo = `${hlData.metadata.cau_truc} (${chuoiQuyMo})`;
            }
            document.getElementById('add_nv_quymo').value = chuoiQuyMo;
        }
    }
}

function ham_7_3_b_chon_tat_ca_lop(isCheck) {
    const checkboxes = document.querySelectorAll('.chk-lop');
    checkboxes.forEach(chk => chk.checked = isCheck);
}

// Hàm 7.3.c: Ẩn hiện logic Cấu hình Công bố (Sử dụng Hằng số)
function ham_7_3_c_xu_ly_cong_bo() {
    const thoiDiem = document.getElementById('add_nv_thoigiano').value;

    document.getElementById('khu_vuc_hen_gio').style.display = (thoiDiem === CFG_NV.THOI_DIEM.HEN_GIO) ? "block" : "none";
    if (thoiDiem !== CFG_NV.THOI_DIEM.HEN_GIO) document.getElementById('add_nv_giocongbo').value = "";

    const khuVucMucDo = document.getElementById('khu_vuc_muc_do');
    if (thoiDiem === CFG_NV.THOI_DIEM.KHOA) {
        khuVucMucDo.style.opacity = "0.3";
        khuVucMucDo.style.pointerEvents = "none";
    } else {
        khuVucMucDo.style.opacity = "1";
        khuVucMucDo.style.pointerEvents = "auto";
    }
}

// Hàm 7.3.d: Tự động cập nhật Mã NV khi đổi Loại Nhiệm Vụ
function ham_7_3_d_cap_nhat_ma_nv() {
    const loaiNV = document.getElementById('add_nv_loai').value;
    const inputMa = document.getElementById('add_nv_ma');

    // Lấy chuỗi 6 số ngẫu nhiên đã được cất giấu trong thuộc tính data-random
    const randomStr = inputMa.getAttribute('data-random');

    // Tra từ điển lấy Tiền tố (DE, TL, BG...), nếu không có thì mặc định là KH (Khác)
    const prefix = CFG_NV.PREFIX_LOAI[loaiNV] || "KH";

    // Ghép lại và hiển thị ra ô Input
    inputMa.value = `NV_${prefix}_${randomStr}`;
}

// ==============================================================
// Hàm 7.4: Thu thập dữ liệu và TÁCH RIÊNG NHIỆM VỤ THEO LỚP
// (Bổ sung logic phân biệt Bắt buộc / Tự do)
// ==============================================================
async function ham_7_4_luu_nhiem_vu_moi(btnNode) {
    const maNVTrenForm = document.getElementById('add_nv_ma').value;
    const tenNV = document.getElementById('add_nv_ten').value.trim();
    const loaiNV = document.getElementById('add_nv_loai').value;
    const maHL = document.getElementById('add_nv_maHL').value;

    // 🌟 CHÈN CONSOLE.LOG VÀO ĐÂY ĐỂ BẮT QUẢ TANG:
    console.log("🕵️ MÃ HỌC LIỆU TRÊN FORM LÀ:", maHL);

    const trangThai = document.getElementById('add_nv_trangthai').value;



    // Đọc tính chất bài tập từ Radio button
    const tinhChat = document.querySelector('input[name="add_nv_tinhchat"]:checked').value;
    
    let tgLamBai = parseInt(document.getElementById('add_nv_thoigian').value) || 0;
    let soLuot = parseInt(document.getElementById('add_nv_soluot').value) || 0;
    let mo = document.getElementById('add_nv_mo').value;
    let dong = document.getElementById('add_nv_dong').value;
    let dsLopChon = [];

    // 1. KIỂM TRA ĐẦU VÀO VÀ ĐIỀU CHỈNH THEO TÍNH CHẤT
    if (!tenNV) return alert("❌ Thầy vui lòng nhập Tên nhiệm vụ!");
    if (!maHL) return alert("❌ Thầy chưa chọn Học liệu (Đề thi) kìa!");

    if (tinhChat === "TU_DO") {
        // Tự động ép cấu hình "thả ga" cho bài Luyện tập tự do
        dsLopChon = ["#LUYEN_TAP_TU_DO#"];
        soLuot = 0;   // Vô hạn
        dong = null;  // Không hạn chót
    } else {
        // Nếu là bài bắt buộc, bắt buộc phải chọn Lớp
        const classCheckboxes = document.querySelectorAll('.chk-lop:checked');
        dsLopChon = Array.from(classCheckboxes).map(chk => chk.value);
        if (dsLopChon.length === 0) return alert("❌ Thầy phải tick chọn ít nhất 1 Lớp để giao bài chứ!");

        // Kiểm tra logic thời gian đối với bài Bắt buộc
        if (mo && dong && new Date(mo) >= new Date(dong)) {
            return alert("❌ Lỗi thời gian: Kết thúc phải SAU bắt đầu!");
        }
    }

    // 2. Lấy thông tin học liệu chung
    let quyMo = 0;
    let cauTruc = '';
    if (maHL !== "KHONG_DUNG") {
        const hlData = window.tempDsHocLieu.find(hl => hl.ma_hoc_lieu === maHL);
        if (hlData) {
            quyMo = hlData.quy_mo_cau_hoi || 0;
            cauTruc = (hlData.metadata && hlData.metadata.cau_truc) ? hlData.metadata.cau_truc : '';
        }
    }

    // 3. THU THẬP JSON: Cấu hình Đảo đề
    const cheDoDao = document.getElementById('add_nv_che_do_dao').value;
    let configDaoDe = { cau: false, abcd: false, ds: false };
    if (cheDoDao === CFG_NV.DAO_DE.CO_BAN) {
        configDaoDe = { cau: true, abcd: true, ds: false };
    } else if (cheDoDao === CFG_NV.DAO_DE.TOAN_DIEN) {
        configDaoDe = { cau: true, abcd: true, ds: true };
    }

    // 4. THU THẬP JSON: Cấu hình Công bố
    const thoiDiem = document.getElementById('add_nv_thoigiano').value;
    const mucDo = document.getElementById('add_nv_mucdo').value;
    let configCongBo = { thoi_diem: thoiDiem, muc_do: (thoiDiem === CFG_NV.THOI_DIEM.KHOA) ? CFG_NV.MUC_DO.KHONG : mucDo };

    if (thoiDiem === CFG_NV.THOI_DIEM.HEN_GIO) {
        const gioCongBo = document.getElementById('add_nv_giocongbo').value;
        if (!gioCongBo) return alert("❌ Thầy chọn Hẹn giờ thì phải nhập Giờ vào nhé!");
        configCongBo.thoi_diem = `${CFG_NV.THOI_DIEM.HEN_GIO}|${new Date(gioCongBo).toISOString()}`;
    }

    btnNode.disabled = true;
    btnNode.innerText = "⏳ ĐANG KHỞI TẠO CÁC NHIỆM VỤ...";

    try {
        // Chuẩn bị Tiền tố và Bộ ký tự để sinh mã mới nếu giao nhiều lớp
        const tapKyTu = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        const prefix = "NV_" + (CFG_NV.PREFIX_LOAI[loaiNV] || "KH") + "_";

        // 🌟 BƯỚC QUAN TRỌNG: TẠO MẢNG DỮ LIỆU TÁCH RIÊNG THEO TỪNG LỚP
        const insertPayloads = dsLopChon.map((maLop) => {
            let maNV_ChinhThuc = "";

            if (dsLopChon.length === 1) {
                maNV_ChinhThuc = maNVTrenForm;
            } else {
                let randomStr = '';
                for (let i = 0; i < 6; i++) {
                    randomStr += tapKyTu.charAt(Math.floor(Math.random() * tapKyTu.length));
                }
                maNV_ChinhThuc = prefix + randomStr;
            }

            return {
                ma_nhiem_vu: maNV_ChinhThuc,
                ten_nhiem_vu: tenNV,
                loai_nhiem_vu: loaiNV,
                ma_hoc_lieu: maHL === "KHONG_DUNG" ? null : maHL,
                khoi_lop: document.getElementById('add_nv_khoi').value,
                loai_kiem_tra: document.getElementById('add_nv_loaiKT').value,
                quy_mo_cau_hoi: quyMo,
                cau_truc_de: cauTruc,
                danh_sach_lop: [maLop],
                //danh_sach_lop: JSON.stringify([maLop]), // LƯU Ý: Phải parse thành chuỗi JSON để không lỗi định dạng DB
                thoi_gian_mo: mo ? new Date(mo).toISOString() : null,
                thoi_gian_dong: dong ? new Date(dong).toISOString() : null,
                thoi_gian_lam_bai: tgLamBai,
                so_luot_lam_bai: soLuot,
                cau_hinh_dap_an: configCongBo,
                dao_cau_hoi: configDaoDe,
                trang_thai_loi_giai: CFG_NV.FILE_GIAI.CHUA_LENH,
                trang_thai: trangThai,
                uid_gv_tao: (typeof AppState !== 'undefined' && AppState.user && AppState.user.uid) ? AppState.user.uid : null,
                ngay_tao: new Date().toISOString()
            };
        });

        // Bắn 1 lúc toàn bộ mảng lên Supabase (Bulk Insert)
        const { error } = await _supabase.from('nhiem_vu').insert(insertPayloads);

        if (error) throw error;

        if (dsLopChon.length === 1) {
            if (tinhChat === "TU_DO") {
                alert(`✅ Đã mở phòng LUYỆN TẬP TỰ DO thành công!\nMã nhiệm vụ: ${maNVTrenForm}`);
            } else {
                alert(`✅ Đã giao bài thành công!\nMã nhiệm vụ: ${maNVTrenForm}`);
            }
        } else {
            alert(`✅ Đã tách và giao bài thành công ${dsLopChon.length} nhiệm vụ riêng biệt cho từng lớp!`);
        }

        ham_7_1_ve_quan_ly_nhiem_vu();

    } catch (error) {
        alert("Lỗi máy chủ khi tạo nhiệm vụ: " + error.message);
        btnNode.disabled = false;
        btnNode.innerText = "💾 XÁC NHẬN GIAO BÀI";
    }
}

// ==============================================================
// Hàm 7.8: Xóa Nhiệm Vụ (Có cảnh báo an toàn)
// ==============================================================
async function ham_7_8_xoa_nhiem_vu(maNhiemVu) {
    // 1. Cảnh báo nguy hiểm trước khi thực thi
    const loiCanhBao = `⚠️ CẢNH BÁO NGUY HIỂM:\n\nThầy có chắc chắn muốn xóa vĩnh viễn nhiệm vụ [ ${maNhiemVu} ] không?\n\nLưu ý: Hành động này KHÔNG THỂ HOÀN TÁC. Toàn bộ kết quả thi, lịch sử làm bài của học sinh thuộc nhiệm vụ này cũng có thể bị xóa sạch!`;

    if (!confirm(loiCanhBao)) {
        return; // Nếu thầy bấm "Hủy / Cancel" thì dừng lại, không làm gì cả
    }

    try {
        // 2. Gửi lệnh Delete lên Supabase
        const { error } = await _supabase
            .from('nhiem_vu')
            .delete()
            .eq('ma_nhiem_vu', maNhiemVu);

        if (error) throw error;

        // 3. Thông báo thành công và tải lại bảng
        alert('🗑️ Đã xóa nhiệm vụ thành công!');
        ham_7_2_tai_danh_sach_nhiem_vu();

    } catch (error) {
        alert('❌ Lỗi hệ thống khi xóa nhiệm vụ: ' + error.message);
    }
}


// ==============================================================
// Hàm 7.6: Mở form Xem / Sửa Nhiệm Vụ (ĐẦY ĐỦ 100% THÔNG TIN)
// ==============================================================
//async function ham_7_6_mo_form_nhiem_vu(maNhiemVu) {
//    const data = BangNhiemVuState.duLieu.find(nv => nv.ma_nhiem_vu === maNhiemVu);
//    if (!data) return alert("❌ Dữ liệu nhiệm vụ không tồn tại!");

//    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
//    vungLamViec.innerHTML = `<div style="text-align: center; padding: 40px;"><p>⏳ Đang nạp toàn bộ dữ liệu nhiệm vụ...</p></div>`;

//    // 1. FORMAT THỜI GIAN
//    const formatToLocal = (isoStr) => {
//        if (!isoStr) return "";
//        const d = new Date(isoStr);
//        return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
//    };

//    // 2. BÓC TÁCH JSON ĐẢO ĐỀ
//    let dao = { cau: false, abcd: false, ds: false };
//    try { dao = typeof data.dao_cau_hoi === 'string' ? JSON.parse(data.dao_cau_hoi) : (data.dao_cau_hoi || dao); } catch (e) { }
//    let modeDao = CFG_NV.DAO_DE.KHONG;
//    if (dao.cau && dao.abcd && dao.ds) modeDao = CFG_NV.DAO_DE.TOAN_DIEN;
//    else if (dao.cau && dao.abcd) modeDao = CFG_NV.DAO_DE.CO_BAN;

//    // 3. BÓC TÁCH JSON CÔNG BỐ
//    let congBo = { thoi_diem: CFG_NV.THOI_DIEM.KHOA, muc_do: CFG_NV.MUC_DO.KHONG };
//    try { congBo = typeof data.cau_hinh_dap_an === 'string' ? JSON.parse(data.cau_hinh_dap_an) : (data.cau_hinh_dap_an || congBo); } catch (e) { }

//    let thoiDiemVal = congBo.thoi_diem || CFG_NV.THOI_DIEM.KHOA;
//    let thoiDiemSelect = thoiDiemVal;
//    let gioHen = "";
//    if (thoiDiemVal.startsWith("HEN_GIO|")) {
//        thoiDiemSelect = CFG_NV.THOI_DIEM.HEN_GIO;
//        gioHen = formatToLocal(thoiDiemVal.split("|")[1]);
//    }

//    // 4. DANH SÁCH LỚP
//    if (!window.tempDsLop || window.tempDsLop.length === 0) {
//        const { data: dsLop, error } = await _supabase.from('lop_hoc').select('*');
//        if (!error) window.tempDsLop = dsLop;
//    }
//    let lopDaGiao = [];
//    try { lopDaGiao = typeof data.danh_sach_lop === 'string' ? JSON.parse(data.danh_sach_lop) : (data.danh_sach_lop || []); } catch (e) { }

//    let htmlLop = '';
//    if (window.tempDsLop && window.tempDsLop.length > 0) {
//        window.tempDsLop.forEach(l => {
//            const maLop = l.ma_lop || l.ma || l.id;
//            const tenLop = l.ten_lop || l.ten || l.name || maLop;
//            const isChecked = lopDaGiao.includes(maLop) ? "checked" : "";
//            htmlLop += `
//                <label style="display: inline-flex; align-items: center; width: 140px; margin-bottom: 10px; cursor: pointer;">
//                    <input type="checkbox" class="chk-lop-edit" value="${maLop}" ${isChecked} style="transform: scale(1.3); margin-right: 8px;">
//                    <span style="font-weight: bold; color: #1a73e8; font-size: 14px;">${tenLop}</span>
//                </label>
//            `;
//        });
//    }

//    // 5. NÚT LỆNH RÁP FILE GIẢI
//    let btnTaoFileGiai = "";
//    if (data.trang_thai_loi_giai === CFG_NV.FILE_GIAI.CHUA_LENH || data.trang_thai_loi_giai === CFG_NV.FILE_GIAI.LOI) {
//        btnTaoFileGiai = `
//            <button onclick="ham_7_9_kich_hoat_tao_file_giai('${data.ma_nhiem_vu}')" style="padding: 12px; background: #6f42c1; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; margin-bottom: 20px; width: 100%; box-shadow: 0 2px 4px rgba(111,66,193,0.2);">
//                🚀 PHÁT LỆNH: RÁP FILE LỜI GIẢI CHI TIẾT
//            </button>
//        `;
//    } else {
//        btnTaoFileGiai = `
//            <div style="padding: 12px; background: #f8f9fa; border: 1px dashed #6f42c1; border-radius: 6px; text-align: center; margin-bottom: 20px; color: #6f42c1; font-weight: bold;">
//                📢 Trạng thái file giải hiện tại: ${data.trang_thai_loi_giai}
//            </div>
//        `;
//    }

//    // Trước khi vẽ HTML, thầy có thể tạo một biến kiểm tra cho chắc chắn
//    const trangThaiHienTai = String(data.trang_thai); // Ép về chuỗi để so sánh

//    // ================= VẼ GIAO DIỆN CHÍNH =================
//    vungLamViec.innerHTML = `
//        <div style="max-width: 950px; background: white; padding: 25px; border-radius: 12px; margin: 0 auto; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
//            <h3 style="color: #6f42c1; margin-top: 0; border-bottom: 2px solid #f1f3f4; padding-bottom: 10px; display: flex; justify-content: space-between;">
//                <span>✏️ CHỈNH SỬA NHIỆM VỤ</span>
//                <span style="color: #d35400; font-size: 16px;">[ Mã: ${data.ma_nhiem_vu} ]</span>
//            </h3>

//            ${btnTaoFileGiai}

//            <div style="background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
//                <h4 style="margin-top: 0; color: #495057;">1. Thông tin chung & Học Liệu</h4>
//                <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 15px; margin-bottom: 15px;">
//                    <div>
//                        <label style="font-weight:bold; font-size: 13px;">Tên Nhiệm Vụ (*):</label>
//                        <input type="text" id="edit_nv_ten" value="${data.ten_nhiem_vu}" style="width: 100%; padding: 8px; border: 1px solid #1a73e8; border-radius: 4px;">
//                    </div>
//                    <div>
//                        <label style="font-weight:bold; font-size: 13px;">Loại nhiệm vụ (Cố định):</label>
//                        <input type="text" id="edit_nv_loai" value="${data.loai_nhiem_vu || ''}" readonly style="width: 100%; padding: 8px; background: #e9ecef; border: 1px solid #ccc; border-radius: 4px; font-weight:bold; color: #666;">
//                    </div>
//                </div>

//                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px;">
//                    <div>
//                        <label style="font-size: 12px; font-weight:bold;">Mã Học Liệu (Đề gốc):</label>
//                        <input type="text" value="${data.ma_hoc_lieu || 'Không dùng'}" readonly style="width: 100%; padding: 6px; background:#e9ecef; border: 1px solid #ccc; border-radius: 4px; font-weight:bold;">
//                    </div>
//                    <div>
//                        <label style="font-size: 12px; font-weight:bold;">Khối Lớp:</label>
//                        <input type="text" id="edit_nv_khoi" value="${data.khoi_lop || ''}" style="width: 100%; padding: 6px; border: 1px solid #ccc; border-radius: 4px;">
//                    </div>
//                    <div>
//                        <label style="font-size: 12px; font-weight:bold;">Loại kiểm tra:</label>
//                        <input type="text" id="edit_nv_loaiKT" value="${data.loai_kiem_tra || ''}" style="width: 100%; padding: 6px; border: 1px solid #ccc; border-radius: 4px;">
//                    </div>
//                </div>
//            </div>

//            <div style="background: #fff8e6; border: 1px solid #ffe8a1; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
//                <h4 style="margin-top: 0; color: #d35400;">2. Phân công & Cấu hình Đảo đề</h4>

//                <div style="margin-bottom: 15px;">
//                    <label style="font-weight:bold; font-size: 13px; display:block; margin-bottom: 5px;">Danh sách Lớp (Tích chọn để thay đổi):</label>
//                    <div style="background: white; padding: 15px; border: 1px solid #ddd; border-radius: 6px; max-height: 120px; overflow-y: auto;">
//                        ${htmlLop}
//                    </div>
//                </div>

//                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 10px;">
//                    <div>
//                        <label style="font-size: 12px; font-weight:bold;">Trạng thái NV:</label>
//                        <select id="edit_nv_trangthai" style="width: 100%; padding: 6px; border: 1px solid #28a745; border-radius: 4px;">
//                            <option value="1" ${trangThaiHienTai !== '0' ? 'selected' : ''}>🟢 Mở (Kích hoạt)</option>
//                            <option value="0" ${trangThaiHienTai === '0' ? 'selected' : ''}>🔴 Khóa (Tạm dừng)</option>
//                        </select>
//                    </div>
//                    <div>
//                        <label style="font-size: 12px; font-weight:bold;">Số lượt làm bài:</label>
//                        <input type="number" id="edit_nv_soluot" value="${data.so_luot_lam_bai || 0}" style="width: 100%; padding: 6px; border: 1px solid #ccc; border-radius: 4px;">
//                    </div>
//                    <div>
//                        <label style="font-size: 12px; font-weight:bold;">Mở Lúc:</label>
//                        <input type="datetime-local" id="edit_nv_mo" value="${formatToLocal(data.thoi_gian_mo)}" style="width: 100%; padding: 6px; border: 1px solid #ccc; border-radius: 4px;">
//                    </div>
//                    <div>
//                        <label style="font-size: 12px; font-weight:bold;">Đóng Lúc:</label>
//                        <input type="datetime-local" id="edit_nv_dong" value="${formatToLocal(data.thoi_gian_dong)}" style="width: 100%; padding: 6px; border: 1px solid #ccc; border-radius: 4px;">
//                    </div>
//                </div>

//                <div style="margin-top: 15px; border-top: 1px dashed #e5c381; padding-top: 15px;">
//                    <label style="font-weight:bold; font-size: 13px; color: #d35400;">🔀 Chế độ Đảo đề:</label>
//                    <select id="edit_nv_che_do_dao" style="width: 100%; padding: 10px; border: 2px solid #d35400; border-radius: 6px; font-weight: bold;">
//                        <option value="${CFG_NV.DAO_DE.KHONG}" ${modeDao === CFG_NV.DAO_DE.KHONG ? 'selected' : ''}>❌ Không đảo gì cả</option>
//                        <option value="${CFG_NV.DAO_DE.CO_BAN}" ${modeDao === CFG_NV.DAO_DE.CO_BAN ? 'selected' : ''}>🔀 Đảo Câu hỏi + Đảo đáp án ABCD</option>
//                        <option value="${CFG_NV.DAO_DE.TOAN_DIEN}" ${modeDao === CFG_NV.DAO_DE.TOAN_DIEN ? 'selected' : ''}>🌪️ Đảo Toàn Diện (Câu + ABCD + Đ/S)</option>
//                    </select>
//                </div>
//            </div>

//            <div style="background: #e6ffed; border: 1px solid #c3e6cb; border-radius: 8px; padding: 15px; margin-bottom: 25px;">
//                <h4 style="margin-top: 0; color: #28a745;">3. Cấu hình Công bố & Bảo mật</h4>
//                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
//                    <div>
//                        <label style="font-weight:bold; font-size: 13px;">Thời điểm công bố:</label>
//                        <select id="edit_nv_thoigiano" onchange="document.getElementById('khu_vuc_hen_gio_edit').style.display = (this.value === 'HEN_GIO') ? 'block' : 'none'" style="width: 100%; padding: 10px; border: 1px solid #28a745; border-radius: 4px; font-weight: bold;">
//                            <option value="${CFG_NV.THOI_DIEM.KHOA}" ${thoiDiemSelect === CFG_NV.THOI_DIEM.KHOA ? 'selected' : ''}>🔒 Khóa hoàn toàn (Không bao giờ xem)</option>
//                            <option value="${CFG_NV.THOI_DIEM.SAU_NOP}" ${thoiDiemSelect === CFG_NV.THOI_DIEM.SAU_NOP ? 'selected' : ''}>✅ Ngay sau khi nộp bài</option>
//                            <option value="${CFG_NV.THOI_DIEM.SAU_HET_HAN}" ${thoiDiemSelect === CFG_NV.THOI_DIEM.SAU_HET_HAN ? 'selected' : ''}>⏳ Sau khi hết hạn Đóng đề</option>
//                            <option value="${CFG_NV.THOI_DIEM.HEN_GIO}" ${thoiDiemSelect === CFG_NV.THOI_DIEM.HEN_GIO ? 'selected' : ''}>⏰ Hẹn một giờ cụ thể...</option>
//                        </select>
//                        <div id="khu_vuc_hen_gio_edit" style="display: ${thoiDiemSelect === CFG_NV.THOI_DIEM.HEN_GIO ? 'block' : 'none'}; margin-top: 10px;">
//                            <label style="font-size: 12px; color: #d35400; font-weight:bold;">Giờ kích hoạt:</label>
//                            <input type="datetime-local" id="edit_nv_giocongbo" value="${gioHen}" style="width: 100%; padding: 8px; border: 1px solid #d35400; border-radius: 4px;">
//                        </div>
//                    </div>
//                    <div>
//                        <label style="font-weight:bold; font-size: 13px;">Mức độ công bố:</label>
//                        <select id="edit_nv_mucdo" style="width: 100%; padding: 10px; border: 1px solid #1a73e8; border-radius: 4px; font-weight: bold; color: #1a73e8;">
//                            <option value="${CFG_NV.MUC_DO.DAPAN_DIEM}" ${congBo.muc_do === CFG_NV.MUC_DO.DAPAN_DIEM ? 'selected' : ''}>📊 Chỉ xem Bảng Đáp án (A,B,C,D) & Điểm</option>
//                            <option value="${CFG_NV.MUC_DO.FULL_LOIGIAI}" ${congBo.muc_do === CFG_NV.MUC_DO.FULL_LOIGIAI ? 'selected' : ''}>📚 Xem Đáp án VÀ Tải File Lời giải chi tiết</option>
//                        </select>
//                    </div>
//                </div>
//            </div>

//            <div style="display: flex; gap: 15px;">
//                <button onclick="ham_7_7_luu_cap_nhat_nhiem_vu('${data.ma_nhiem_vu}', this)" style="flex: 2; padding: 15px; background: #ffc107; color: #333; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 16px;">
//                    💾 LƯU CẬP NHẬT
//                </button>
//                <button onclick="ham_7_1_ve_quan_ly_nhiem_vu()" style="flex: 1; padding: 15px; background: #6c757d; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">
//                    HỦY QUAY LẠI
//                </button>
//            </div>
//        </div>
//    `;
//}




// ==============================================================
// Hàm 7.6: Mở form Xem / Sửa Nhiệm Vụ (BẢN CẬP NHẬT 1 CỘT & TỰ ĐỘNG NHẬN DIỆN TỰ DO)
// ==============================================================
//async function ham_7_6_mo_form_nhiem_vu(maNhiemVu) {
//    const data = BangNhiemVuState.duLieu.find(nv => nv.ma_nhiem_vu === maNhiemVu);
//    if (!data) return alert("❌ Dữ liệu nhiệm vụ không tồn tại!");

//    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
//    vungLamViec.innerHTML = `<div style="text-align: center; padding: 40px;"><p>⏳ Đang nạp toàn bộ dữ liệu nhiệm vụ...</p></div>`;

//    // 1. FORMAT THỜI GIAN CHO INPUT DATETIME-LOCAL
//    const formatToLocal = (isoStr) => {
//        if (!isoStr) return "";
//        const d = new Date(isoStr);
//        return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
//    };






//    // 2. NHẬN DIỆN TÍNH CHẤT (TỰ DO HAY BẮT BUỘC)
//    let lopDaGiao = [];
//    try {
//        lopDaGiao = typeof data.danh_sach_lop === 'string' ? JSON.parse(data.danh_sach_lop) : (data.danh_sach_lop || []);
//    } catch (e) { lopDaGiao = []; }

//    const laTuDo = lopDaGiao.includes("#LUYEN_TAP_TU_DO#");





//    // 3. DANH SÁCH LỚP (Chỉ lấy nếu cần thiết)
//    if (!laTuDo && (!window.tempDsLop || window.tempDsLop.length === 0)) {
//        const { data: dsLop } = await _supabase.from('lop_hoc').select('*');
//        if (dsLop) window.tempDsLop = dsLop;
//    }

//    let htmlLop = '';
//    if (!laTuDo && window.tempDsLop) {
//        window.tempDsLop.forEach(l => {
//            const maLop = l.ma_lop || l.ma || l.id;
//            const tenLop = l.ten_lop || l.ten || maLop;
//            const isChecked = lopDaGiao.includes(maLop) ? "checked" : "";
//            htmlLop += `
//                <label style="display: inline-flex; align-items: center; width: 140px; margin-bottom: 10px; cursor: pointer;">
//                    <input type="checkbox" class="chk-lop-edit" value="${maLop}" ${isChecked} style="transform: scale(1.3); margin-right: 8px;">
//                    <span style="font-weight: bold; color: #1a73e8; font-size: 14px;">${tenLop}</span>
//                </label>
//            `;
//        });
//    }







//    // 4. BÓC TÁCH JSON ĐẢO ĐỀ & CÔNG BỐ (Để nạp vào các select)
//    let dao = { cau: false, abcd: false, ds: false };
//    try { dao = typeof data.dao_cau_hoi === 'string' ? JSON.parse(data.dao_cau_hoi) : (data.dao_cau_hoi || dao); } catch (e) { }
//    let modeDao = CFG_NV.DAO_DE.KHONG;
//    if (dao.cau && dao.abcd && dao.ds) modeDao = CFG_NV.DAO_DE.TOAN_DIEN;
//    else if (dao.cau && dao.abcd) modeDao = CFG_NV.DAO_DE.CO_BAN;


//        // 5. BÓC TÁCH JSON CÔNG BỐ
//        let congBo = { thoi_diem: CFG_NV.THOI_DIEM.KHOA, muc_do: CFG_NV.MUC_DO.KHONG };
//        try { congBo = typeof data.cau_hinh_dap_an === 'string' ? JSON.parse(data.cau_hinh_dap_an) : (data.cau_hinh_dap_an || congBo); } catch (e) { }

//        let thoiDiemVal = congBo.thoi_diem || CFG_NV.THOI_DIEM.KHOA;
//        let thoiDiemSelect = thoiDiemVal;
//        let gioHen = "";
//        if (thoiDiemVal.startsWith("HEN_GIO|")) {
//            thoiDiemSelect = CFG_NV.THOI_DIEM.HEN_GIO;
//            gioHen = formatToLocal(thoiDiemVal.split("|")[1]);
//        }








//    // ================= VẼ GIAO DIỆN CHÍNH =================
//    vungLamViec.innerHTML = `
//        <div style="max-width: 950px; background: white; padding: 25px; border-radius: 12px; margin: 0 auto; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
//            <h3 style="color: #6f42c1; margin-top: 0; border-bottom: 2px solid #f1f3f4; padding-bottom: 10px; display: flex; justify-content: space-between;">
//                <span>✏️ CHỈNH SỬA NHIỆM VỤ</span>
//                <span style="color: #d35400; font-size: 16px;">[ Mã: ${data.ma_nhiem_vu} ]</span>
//            </h3>

//            <div style="background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
//                <h4 style="margin-top: 0; color: #495057;">1. Thông tin chung</h4>
//                <div style="margin-bottom: 15px;">
//                    <label style="font-weight:bold; font-size: 13px;">Tên Nhiệm Vụ (*):</label>
//                    <input type="text" id="edit_nv_ten" value="${data.ten_nhiem_vu}" style="width: 100%; padding: 10px; border: 1px solid #1a73e8; border-radius: 4px; box-sizing: border-box; font-weight: bold;">
//                </div>
//            </div>

//            <div style="background: #fff8e6; border: 1px solid #ffe8a1; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
//                <h4 style="margin-top: 0; color: #d35400;">2. Phân công & Quy định (Bản 1 Cột)</h4>

//                <div style="margin-bottom: 15px; padding: 10px; background: ${laTuDo ? '#fff3e0' : '#e3f2fd'}; border-radius: 6px; border: 1px solid #ccc;">
//                    <span style="font-weight: bold;">Tính chất: </span>
//                    ${laTuDo ? '<b style="color: #d35400;">🌍 LUYỆN TẬP TỰ DO</b>' : '<b style="color: #0056b3;">🎯 NHIỆM VỤ BẮT BUỘC</b>'}
//                    <input type="hidden" id="edit_nv_tinhchat" value="${laTuDo ? 'TU_DO' : 'BAT_BUOC'}">
//                </div>

//                <div id="khung_chon_lop_edit" style="margin-bottom: 20px; display: ${laTuDo ? 'none' : 'block'};">
//                    <label style="font-weight:bold; font-size: 13px; display:block; margin-bottom: 8px;">Giao cho các Lớp:</label>
//                    <div style="background: white; padding: 15px; border: 1px solid #ddd; border-radius: 6px; max-height: 120px; overflow-y: auto;">
//                        ${htmlLop}
//                    </div>
//                </div>

//                <div style="display: flex; flex-direction: column; gap: 12px;">
//                    <div style="display: flex; align-items: center; background: white; padding: 10px; border-radius: 6px; border: 1px solid #eee;">
//                        <label style="width: 180px; font-size: 13px; font-weight:bold;">🟢 Trạng thái NV:</label>
//                        <select id="edit_nv_trangthai" style="flex: 1; padding: 8px; border: 1px solid #28a745; border-radius: 4px; font-weight: bold;">
//                            <option value="1" ${String(data.trang_thai) !== '0' ? 'selected' : ''}>🟢 Mở (Kích hoạt)</option>
//                            <option value="0" ${String(data.trang_thai) === '0' ? 'selected' : ''}>🔴 Khóa (Tạm dừng)</option>
//                        </select>
//                    </div>

//                    <div style="display: flex; align-items: center; background: white; padding: 10px; border-radius: 6px; border: 1px solid #eee;">
//                        <label style="width: 180px; font-size: 13px; font-weight:bold; color: #d35400;">⏱️ Thời gian làm (phút):</label>
//                        <input type="number" id="edit_nv_thoigian" value="${data.thoi_gian_lam_bai || ''}" placeholder="VD: 45, 90..." style="flex: 1; padding: 8px; border: 1px solid #d35400; border-radius: 4px; font-weight: bold;">
//                    </div>

//                    <div style="display: flex; align-items: center; background: white; padding: 10px; border-radius: 6px; border: 1px solid #eee;">
//                        <label style="width: 180px; font-size: 13px; font-weight:bold;">🔄 Số lượt tối đa:</label>
//                        <input type="number" id="edit_nv_soluot" value="${data.so_luot_lam_bai || 0}" ${laTuDo ? 'disabled' : ''} style="flex: 1; padding: 8px; border: 1px solid #ccc; border-radius: 4px; background: ${laTuDo ? '#f5f5f5' : 'white'};">
//                    </div>

//                    <div style="display: flex; align-items: center; background: white; padding: 10px; border-radius: 6px; border: 1px solid #eee;">
//                        <label style="width: 180px; font-size: 13px; font-weight:bold;">📅 Mở Lúc:</label>
//                        <input type="datetime-local" id="edit_nv_mo" value="${formatToLocal(data.thoi_gian_mo)}" style="flex: 1; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
//                    </div>

//                    <div style="display: flex; align-items: center; background: white; padding: 10px; border-radius: 6px; border: 1px solid #eee;">
//                        <label style="width: 180px; font-size: 13px; font-weight:bold;">⛔ Đóng Lúc:</label>
//                        <input type="datetime-local" id="edit_nv_dong" value="${formatToLocal(data.thoi_gian_dong)}" ${laTuDo ? 'disabled' : ''} style="flex: 1; padding: 8px; border: 1px solid #ccc; border-radius: 4px; background: ${laTuDo ? '#f5f5f5' : 'white'};">
//                    </div>
//                </div>

//                <div style="margin-top: 15px; border-top: 1px dashed #e5c381; padding-top: 15px;">
//                    <label style="font-weight:bold; font-size: 13px; color: #d35400;">🔀 Chế độ Đảo đề:</label>
//                    <select id="edit_nv_che_do_dao" style="width: 100%; padding: 10px; border: 2px solid #d35400; border-radius: 6px; font-weight: bold;">
//                        <option value="${CFG_NV.DAO_DE.KHONG}" ${modeDao === CFG_NV.DAO_DE.KHONG ? 'selected' : ''}>❌ Không đảo gì cả</option>
//                        <option value="${CFG_NV.DAO_DE.CO_BAN}" ${modeDao === CFG_NV.DAO_DE.CO_BAN ? 'selected' : ''}>🔀 Đảo Câu hỏi + Đảo đáp án ABCD</option>
//                        <option value="${CFG_NV.DAO_DE.TOAN_DIEN}" ${modeDao === CFG_NV.DAO_DE.TOAN_DIEN ? 'selected' : ''}>🌪️ Đảo Toàn Diện (Câu + ABCD + Đ/S)</option>
//                    </select>
//                </div>


//                <div style="background: #e6ffed; border: 1px solid #c3e6cb; border-radius: 8px; padding: 15px; margin-bottom: 25px;">
//                <h4 style="margin-top: 0; color: #28a745;">3. Cấu hình Công bố & Bảo mật</h4>
//                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
//                    <div>
//                        <label style="font-weight:bold; font-size: 13px;">Thời điểm công bố:</label>
//                        <select id="edit_nv_thoigiano" onchange="document.getElementById('khu_vuc_hen_gio_edit').style.display = (this.value === 'HEN_GIO') ? 'block' : 'none'" style="width: 100%; padding: 10px; border: 1px solid #28a745; border-radius: 4px; font-weight: bold;">
//                           <option value="${CFG_NV.THOI_DIEM.KHOA}" ${thoiDiemSelect === CFG_NV.THOI_DIEM.KHOA ? 'selected' : ''}>🔒 Khóa hoàn toàn (Không bao giờ xem)</option>
//                            <option value="${CFG_NV.THOI_DIEM.SAU_NOP}" ${thoiDiemSelect === CFG_NV.THOI_DIEM.SAU_NOP ? 'selected' : ''}>✅ Ngay sau khi nộp bài</option>
//                            <option value="${CFG_NV.THOI_DIEM.SAU_HET_HAN}" ${thoiDiemSelect === CFG_NV.THOI_DIEM.SAU_HET_HAN ? 'selected' : ''}>⏳ Sau khi hết hạn Đóng đề</option>
//                            <option value="${CFG_NV.THOI_DIEM.HEN_GIO}" ${thoiDiemSelect === CFG_NV.THOI_DIEM.HEN_GIO ? 'selected' : ''}>⏰ Hẹn một giờ cụ thể...</option>
//                        </select>
//                        <div id="khu_vuc_hen_gio_edit" style="display: ${thoiDiemSelect === CFG_NV.THOI_DIEM.HEN_GIO ? 'block' : 'none'}; margin-top: 10px;">
//                            <label style="font-size: 12px; color: #d35400; font-weight:bold;">Giờ kích hoạt:</label>
//                            <input type="datetime-local" id="edit_nv_giocongbo" value="${gioHen}" style="width: 100%; padding: 8px; border: 1px solid #d35400; border-radius: 4px;">
//                        </div>
//                    </div>
//                    <div>
//                        <label style="font-weight:bold; font-size: 13px;">Mức độ công bố:</label>
//                        <select id="edit_nv_mucdo" style="width: 100%; padding: 10px; border: 1px solid #1a73e8; border-radius: 4px; font-weight: bold; color: #1a73e8;">
//                            <option value="${CFG_NV.MUC_DO.DAPAN_DIEM}" ${congBo.muc_do === CFG_NV.MUC_DO.DAPAN_DIEM ? 'selected' : ''}>📊 Chỉ xem Bảng Đáp án (A,B,C,D) & Điểm</option>
//                            <option value="${CFG_NV.MUC_DO.FULL_LOIGIAI}" ${congBo.muc_do === CFG_NV.MUC_DO.FULL_LOIGIAI ? 'selected' : ''}>📚 Xem Đáp án VÀ Tải File Lời giải chi tiết</option>
//                        </select>
//                    </div>
//                </div>
//            </div>



//            </div>

//            <div style="display: flex; gap: 15px;">
//                <button onclick="ham_7_7_luu_cap_nhat_nhiem_vu('${data.ma_nhiem_vu}', this)" style="flex: 2; padding: 15px; background: #ffc107; color: #333; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
//                    💾 LƯU CẬP NHẬT
//                </button>
//                <button onclick="ham_7_1_ve_quan_ly_nhiem_vu()" style="flex: 1; padding: 15px; background: #6c757d; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">
//                    HỦY QUAY LẠI
//                </button>
//            </div>
//        </div>
//    `;
//}

//// ==============================================================
//// Hàm 7.6: Mở form Xem / Sửa Nhiệm Vụ (ĐÃ BỔ SUNG CHỌN HỌC LIỆU)
//// ==============================================================
//async function ham_7_6_mo_form_nhiem_vu(maNhiemVu) {
//    const data = BangNhiemVuState.duLieu.find(nv => nv.ma_nhiem_vu === maNhiemVu);
//    if (!data) return alert("❌ Dữ liệu nhiệm vụ không tồn tại!");

//    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
//    vungLamViec.innerHTML = `<div style="text-align: center; padding: 40px;"><p>⏳ Đang nạp toàn bộ dữ liệu nhiệm vụ...</p></div>`;

//    // 1. FORMAT THỜI GIAN CHO INPUT DATETIME-LOCAL
//    const formatToLocal = (isoStr) => {
//        if (!isoStr) return "";
//        const d = new Date(isoStr);
//        return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
//    };

//    // 2. NHẬN DIỆN TÍNH CHẤT (TỰ DO HAY BẮT BUỘC)
//    let lopDaGiao = [];
//    try {
//        lopDaGiao = typeof data.danh_sach_lop === 'string' ? JSON.parse(data.danh_sach_lop) : (data.danh_sach_lop || []);
//    } catch (e) { lopDaGiao = []; }

//    const laTuDo = lopDaGiao.includes("#LUYEN_TAP_TU_DO#");

//    // 3. DANH SÁCH LỚP (Chỉ lấy nếu cần thiết)
//    if (!laTuDo && (!window.tempDsLop || window.tempDsLop.length === 0)) {
//        const { data: dsLop } = await _supabase.from('lop_hoc').select('*');
//        if (dsLop) window.tempDsLop = dsLop;
//    }

//    let htmlLop = '';
//    if (!laTuDo && window.tempDsLop) {
//        window.tempDsLop.forEach(l => {
//            const maLop = l.ma_lop || l.ma || l.id;
//            const tenLop = l.ten_lop || l.ten || maLop;
//            const isChecked = lopDaGiao.includes(maLop) ? "checked" : "";
//            htmlLop += `
//                <label style="display: inline-flex; align-items: center; width: 140px; margin-bottom: 10px; cursor: pointer;">
//                    <input type="checkbox" class="chk-lop-edit" value="${maLop}" ${isChecked} style="transform: scale(1.3); margin-right: 8px;">
//                    <span style="font-weight: bold; color: #1a73e8; font-size: 14px;">${tenLop}</span>
//                </label>
//            `;
//        });
//    }

//    // 🌟 3.5 LẤY DANH SÁCH HỌC LIỆU ĐỂ GIÁO VIÊN ĐỔI
//    let dsHocLieu = window.tempDsHocLieu;
//    if (!dsHocLieu || dsHocLieu.length === 0) {
//        const { data: fetchedHL } = await _supabase.from('hoc_lieu').select('*').order('ngay_tao', { ascending: false });
//        dsHocLieu = fetchedHL || [];
//        window.tempDsHocLieu = dsHocLieu;
//    }

//    let htmlOptionsHL = `<option value="KHONG_DUNG" style="font-weight: bold; color: red;">[ --- Không sử dụng học liệu --- ]</option>`;
//    dsHocLieu.forEach(hl => {
//        // Tự động nhận diện và bôi đen học liệu cũ của nhiệm vụ này
//        const isSelected = (hl.ma_hoc_lieu === data.ma_hoc_lieu) ? "selected" : "";
//        htmlOptionsHL += `<option value="${hl.ma_hoc_lieu}" ${isSelected}>[${hl.ma_hoc_lieu}] - ${hl.ten_hoc_lieu}</option>`;
//    });

//    // 4. BÓC TÁCH JSON ĐẢO ĐỀ & CÔNG BỐ (Để nạp vào các select)
//    let dao = { cau: false, abcd: false, ds: false };
//    try { dao = typeof data.dao_cau_hoi === 'string' ? JSON.parse(data.dao_cau_hoi) : (data.dao_cau_hoi || dao); } catch (e) { }
//    let modeDao = CFG_NV.DAO_DE.KHONG;
//    if (dao.cau && dao.abcd && dao.ds) modeDao = CFG_NV.DAO_DE.TOAN_DIEN;
//    else if (dao.cau && dao.abcd) modeDao = CFG_NV.DAO_DE.CO_BAN;

//    // 5. BÓC TÁCH JSON CÔNG BỐ
//    let congBo = { thoi_diem: CFG_NV.THOI_DIEM.KHOA, muc_do: CFG_NV.MUC_DO.KHONG };
//    try { congBo = typeof data.cau_hinh_dap_an === 'string' ? JSON.parse(data.cau_hinh_dap_an) : (data.cau_hinh_dap_an || congBo); } catch (e) { }

//    let thoiDiemVal = congBo.thoi_diem || CFG_NV.THOI_DIEM.KHOA;
//    let thoiDiemSelect = thoiDiemVal;
//    let gioHen = "";
//    if (thoiDiemVal.startsWith("HEN_GIO|")) {
//        thoiDiemSelect = CFG_NV.THOI_DIEM.HEN_GIO;
//        gioHen = formatToLocal(thoiDiemVal.split("|")[1]);
//    }

//    // ================= VẼ GIAO DIỆN CHÍNH =================
//    vungLamViec.innerHTML = `
//        <div style="max-width: 950px; background: white; padding: 25px; border-radius: 12px; margin: 0 auto; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
//            <h3 style="color: #6f42c1; margin-top: 0; border-bottom: 2px solid #f1f3f4; padding-bottom: 10px; display: flex; justify-content: space-between;">
//                <span>✏️ CHỈNH SỬA NHIỆM VỤ</span>
//                <span style="color: #d35400; font-size: 16px;">[ Mã: ${data.ma_nhiem_vu} ]</span>
//            </h3>

//            <div style="background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
//                <h4 style="margin-top: 0; color: #495057;">1. Thông tin chung</h4>
//                <div style="display: grid; grid-template-columns: 1fr 2fr 1fr; gap: 15px;">
//                    <div>
//                        <label style="font-weight:bold; font-size: 13px;">Mã NV (Cố định):</label>
//                        <input type="text" id="edit_nv_ma" value="${data.ma_nhiem_vu}" readonly style="width: 100%; padding: 8px; background: #e9ecef; border: 1px solid #ccc; border-radius: 4px; font-weight:bold; color: #dc3545; cursor: not-allowed;">
//                    </div>
//                    <div>
//                        <label style="font-weight:bold; font-size: 13px;">Tên Nhiệm Vụ (*):</label>
//                        <input type="text" id="edit_nv_ten" value="${data.ten_nhiem_vu}" style="width: 100%; padding: 8px; border: 1px solid #1a73e8; border-radius: 4px; box-sizing: border-box; font-weight: bold;">
//                    </div>
//                    <div>
//                        <label style="font-weight:bold; font-size: 13px;">Loại nhiệm vụ:</label>
//                        <select id="edit_nv_loai" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
//                            <option value="Làm đề (Online)" ${data.loai_nhiem_vu === 'Làm đề (Online)' ? 'selected' : ''}>📝 Làm đề (Online)</option>
//                            <option value="Tự luận (Nộp ảnh)" ${data.loai_nhiem_vu === 'Tự luận (Nộp ảnh)' ? 'selected' : ''}>📷 Làm Tự luận (Chụp ảnh nộp)</option>
//                            <option value="Xem bài giảng" ${data.loai_nhiem_vu === 'Xem bài giảng' ? 'selected' : ''}>📺 Xem Video / Slide</option>
//                            <option value="Khảo sát" ${data.loai_nhiem_vu === 'Khảo sát' ? 'selected' : ''}>📊 Khảo sát / Lấy ý kiến</option>
//                        </select>
//                    </div>
//                </div>
//            </div>

//            <div style="background: #e6f2ff; border: 1px solid #b8daff; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
//                <h4 style="margin-top: 0; color: #0056b3;">2. Dữ liệu Học Liệu (Đề thi)</h4>
//                <div style="margin-bottom: 15px;">
//                    <label style="font-size: 12px; font-weight:bold; color: #d35400;">🔄 Thầy/Cô có thể chọn lại Học liệu khác cho nhiệm vụ này:</label>
//                    <select id="edit_nv_maHL" style="width: 100%; padding: 10px; border: 2px solid #d35400; border-radius: 4px; font-weight:bold; margin-top: 5px;">
//                        ${htmlOptionsHL}
//                    </select>
//                </div>
//            </div>

//            <div style="background: #fff8e6; border: 1px solid #ffe8a1; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
//                <h4 style="margin-top: 0; color: #d35400;">3. Phân công & Quy định</h4>

//                <div style="margin-bottom: 15px; padding: 10px; background: ${laTuDo ? '#fff3e0' : '#e3f2fd'}; border-radius: 6px; border: 1px solid #ccc;">
//                    <span style="font-weight: bold;">Tính chất: </span>
//                    ${laTuDo ? '<b style="color: #d35400;">🌍 LUYỆN TẬP TỰ DO</b>' : '<b style="color: #0056b3;">🎯 NHIỆM VỤ BẮT BUỘC</b>'}
//                    <input type="hidden" id="edit_nv_tinhchat" value="${laTuDo ? 'TU_DO' : 'BAT_BUOC'}">
//                </div>

//                <div id="khung_chon_lop_edit" style="margin-bottom: 20px; display: ${laTuDo ? 'none' : 'block'};">
//                    <label style="font-weight:bold; font-size: 13px; display:block; margin-bottom: 8px;">Giao cho các Lớp:</label>
//                    <div style="background: white; padding: 15px; border: 1px solid #ddd; border-radius: 6px; max-height: 120px; overflow-y: auto;">
//                        ${htmlLop}
//                    </div>
//                </div>

//                <div style="display: flex; flex-direction: column; gap: 12px;">
//                    <div style="display: flex; align-items: center; background: white; padding: 10px; border-radius: 6px; border: 1px solid #eee;">
//                        <label style="width: 180px; font-size: 13px; font-weight:bold;">🟢 Trạng thái NV:</label>
//                        <select id="edit_nv_trangthai" style="flex: 1; padding: 8px; border: 1px solid #28a745; border-radius: 4px; font-weight: bold;">
//                            <option value="1" ${String(data.trang_thai) !== '0' ? 'selected' : ''}>🟢 Mở (Kích hoạt)</option>
//                            <option value="0" ${String(data.trang_thai) === '0' ? 'selected' : ''}>🔴 Khóa (Tạm dừng)</option>
//                        </select>
//                    </div>

//                    <div style="display: flex; align-items: center; background: white; padding: 10px; border-radius: 6px; border: 1px solid #eee;">
//                        <label style="width: 180px; font-size: 13px; font-weight:bold; color: #d35400;">⏱️ Thời gian làm (phút):</label>
//                        <input type="number" id="edit_nv_thoigian" value="${data.thoi_gian_lam_bai || ''}" placeholder="VD: 45, 90..." style="flex: 1; padding: 8px; border: 1px solid #d35400; border-radius: 4px; font-weight: bold;">
//                    </div>

//                    <div style="display: flex; align-items: center; background: white; padding: 10px; border-radius: 6px; border: 1px solid #eee;">
//                        <label style="width: 180px; font-size: 13px; font-weight:bold;">🔄 Số lượt tối đa:</label>
//                        <input type="number" id="edit_nv_soluot" value="${data.so_luot_lam_bai || 0}" ${laTuDo ? 'disabled' : ''} style="flex: 1; padding: 8px; border: 1px solid #ccc; border-radius: 4px; background: ${laTuDo ? '#f5f5f5' : 'white'};">
//                    </div>

//                    <div style="display: flex; align-items: center; background: white; padding: 10px; border-radius: 6px; border: 1px solid #eee;">
//                        <label style="width: 180px; font-size: 13px; font-weight:bold;">📅 Mở Lúc:</label>
//                        <input type="datetime-local" id="edit_nv_mo" value="${formatToLocal(data.thoi_gian_mo)}" style="flex: 1; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
//                    </div>

//                    <div style="display: flex; align-items: center; background: white; padding: 10px; border-radius: 6px; border: 1px solid #eee;">
//                        <label style="width: 180px; font-size: 13px; font-weight:bold;">⛔ Đóng Lúc:</label>
//                        <input type="datetime-local" id="edit_nv_dong" value="${formatToLocal(data.thoi_gian_dong)}" ${laTuDo ? 'disabled' : ''} style="flex: 1; padding: 8px; border: 1px solid #ccc; border-radius: 4px; background: ${laTuDo ? '#f5f5f5' : 'white'};">
//                    </div>
//                </div>

//                <div style="margin-top: 15px; border-top: 1px dashed #e5c381; padding-top: 15px;">
//                    <label style="font-weight:bold; font-size: 13px; color: #d35400;">🔀 Chế độ Đảo đề:</label>
//                    <select id="edit_nv_che_do_dao" style="width: 100%; padding: 10px; border: 2px solid #d35400; border-radius: 6px; font-weight: bold;">
//                        <option value="${CFG_NV.DAO_DE.KHONG}" ${modeDao === CFG_NV.DAO_DE.KHONG ? 'selected' : ''}>❌ Không đảo gì cả</option>
//                        <option value="${CFG_NV.DAO_DE.CO_BAN}" ${modeDao === CFG_NV.DAO_DE.CO_BAN ? 'selected' : ''}>🔀 Đảo Câu hỏi + Đảo đáp án ABCD</option>
//                        <option value="${CFG_NV.DAO_DE.TOAN_DIEN}" ${modeDao === CFG_NV.DAO_DE.TOAN_DIEN ? 'selected' : ''}>🌪️ Đảo Toàn Diện (Câu + ABCD + Đ/S)</option>
//                    </select>
//                </div>
//            </div>

//            <div style="background: #e6ffed; border: 1px solid #c3e6cb; border-radius: 8px; padding: 15px; margin-bottom: 25px;">
//                <h4 style="margin-top: 0; color: #28a745;">4. Cấu hình Công bố & Bảo mật</h4>
//                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
//                    <div>
//                        <label style="font-weight:bold; font-size: 13px;">Thời điểm công bố:</label>
//                        <select id="edit_nv_thoigiano" onchange="document.getElementById('khu_vuc_hen_gio_edit').style.display = (this.value === 'HEN_GIO') ? 'block' : 'none'" style="width: 100%; padding: 10px; border: 1px solid #28a745; border-radius: 4px; font-weight: bold;">
//                           <option value="${CFG_NV.THOI_DIEM.KHOA}" ${thoiDiemSelect === CFG_NV.THOI_DIEM.KHOA ? 'selected' : ''}>🔒 Khóa hoàn toàn (Không bao giờ xem)</option>
//                            <option value="${CFG_NV.THOI_DIEM.SAU_NOP}" ${thoiDiemSelect === CFG_NV.THOI_DIEM.SAU_NOP ? 'selected' : ''}>✅ Ngay sau khi nộp bài</option>
//                            <option value="${CFG_NV.THOI_DIEM.SAU_HET_HAN}" ${thoiDiemSelect === CFG_NV.THOI_DIEM.SAU_HET_HAN ? 'selected' : ''}>⏳ Sau khi hết hạn Đóng đề</option>
//                            <option value="${CFG_NV.THOI_DIEM.HEN_GIO}" ${thoiDiemSelect === CFG_NV.THOI_DIEM.HEN_GIO ? 'selected' : ''}>⏰ Hẹn một giờ cụ thể...</option>
//                        </select>
//                        <div id="khu_vuc_hen_gio_edit" style="display: ${thoiDiemSelect === CFG_NV.THOI_DIEM.HEN_GIO ? 'block' : 'none'}; margin-top: 10px;">
//                            <label style="font-size: 12px; color: #d35400; font-weight:bold;">Giờ kích hoạt:</label>
//                            <input type="datetime-local" id="edit_nv_giocongbo" value="${gioHen}" style="width: 100%; padding: 8px; border: 1px solid #d35400; border-radius: 4px;">
//                        </div>
//                    </div>
//                    <div>
//                        <label style="font-weight:bold; font-size: 13px;">Mức độ công bố:</label>
//                        <select id="edit_nv_mucdo" style="width: 100%; padding: 10px; border: 1px solid #1a73e8; border-radius: 4px; font-weight: bold; color: #1a73e8;">
//                            <option value="${CFG_NV.MUC_DO.DAPAN_DIEM}" ${congBo.muc_do === CFG_NV.MUC_DO.DAPAN_DIEM ? 'selected' : ''}>📊 Chỉ xem Bảng Đáp án (A,B,C,D) & Điểm</option>
//                            <option value="${CFG_NV.MUC_DO.FULL_LOIGIAI}" ${congBo.muc_do === CFG_NV.MUC_DO.FULL_LOIGIAI ? 'selected' : ''}>📚 Xem Đáp án VÀ Tải File Lời giải chi tiết</option>
//                        </select>
//                    </div>
//                </div>
//            </div>

//            <div style="display: flex; gap: 15px;">
//                <button onclick="ham_7_7_luu_cap_nhat_nhiem_vu('${data.ma_nhiem_vu}', this)" style="flex: 2; padding: 15px; background: #ffc107; color: #333; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
//                    💾 LƯU CẬP NHẬT
//                </button>
//                <button onclick="ham_7_1_ve_quan_ly_nhiem_vu()" style="flex: 1; padding: 15px; background: #6c757d; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">
//                    HỦY QUAY LẠI
//                </button>
//            </div>
//        </div>
//    `;
//}


// ==============================================================
// Hàm 7.6: Mở form Xem / Sửa Nhiệm Vụ (CÓ BẢNG ĐIỀU KHIỂN GOM FILE JSON)
// ==============================================================
async function ham_7_6_mo_form_nhiem_vu(maNhiemVu) {
    const data = BangNhiemVuState.duLieu.find(nv => nv.ma_nhiem_vu === maNhiemVu);
    if (!data) return alert("❌ Dữ liệu nhiệm vụ không tồn tại!");

    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
    vungLamViec.innerHTML = `<div style="text-align: center; padding: 40px;"><p>⏳ Đang nạp toàn bộ dữ liệu nhiệm vụ...</p></div>`;

    const formatToLocal = (isoStr) => {
        if (!isoStr) return "";
        const d = new Date(isoStr);
        return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    };

    let lopDaGiao = [];
    try { lopDaGiao = typeof data.danh_sach_lop === 'string' ? JSON.parse(data.danh_sach_lop) : (data.danh_sach_lop || []); } catch (e) { }
    const laTuDo = lopDaGiao.includes("#LUYEN_TAP_TU_DO#");

    if (!laTuDo && (!window.tempDsLop || window.tempDsLop.length === 0)) {
        const { data: dsLop } = await _supabase.from('lop_hoc').select('*');
        if (dsLop) window.tempDsLop = dsLop;
    }

    let htmlLop = '';
    if (!laTuDo && window.tempDsLop) {
        window.tempDsLop.forEach(l => {
            const maLop = l.ma_lop || l.ma || l.id;
            const tenLop = l.ten_lop || l.ten || maLop;
            const isChecked = lopDaGiao.includes(maLop) ? "checked" : "";
            htmlLop += `
                <label style="display: inline-flex; align-items: center; width: 140px; margin-bottom: 10px; cursor: pointer;">
                    <input type="checkbox" class="chk-lop-edit" value="${maLop}" ${isChecked} style="transform: scale(1.3); margin-right: 8px;"> 
                    <span style="font-weight: bold; color: #1a73e8; font-size: 14px;">${tenLop}</span>
                </label>
            `;
        });
    }

    let dsHocLieu = window.tempDsHocLieu;
    if (!dsHocLieu || dsHocLieu.length === 0) {
        const { data: fetchedHL } = await _supabase.from('hoc_lieu').select('*').order('ngay_tao', { ascending: false });
        dsHocLieu = fetchedHL || [];
        window.tempDsHocLieu = dsHocLieu;
    }

    let htmlOptionsHL = `<option value="KHONG_DUNG" style="font-weight: bold; color: red;">[ --- Không sử dụng học liệu --- ]</option>`;
    dsHocLieu.forEach(hl => {
        const isSelected = (hl.ma_hoc_lieu === data.ma_hoc_lieu) ? "selected" : "";
        htmlOptionsHL += `<option value="${hl.ma_hoc_lieu}" ${isSelected}>[${hl.ma_hoc_lieu}] - ${hl.ten_hoc_lieu}</option>`;
    });

    let dao = { cau: false, abcd: false, ds: false };
    try { dao = typeof data.dao_cau_hoi === 'string' ? JSON.parse(data.dao_cau_hoi) : (data.dao_cau_hoi || dao); } catch (e) { }
    let modeDao = CFG_NV.DAO_DE.KHONG;
    if (dao.cau && dao.abcd && dao.ds) modeDao = CFG_NV.DAO_DE.TOAN_DIEN;
    else if (dao.cau && dao.abcd) modeDao = CFG_NV.DAO_DE.CO_BAN;

    let congBo = { thoi_diem: CFG_NV.THOI_DIEM.KHOA, muc_do: CFG_NV.MUC_DO.KHONG };
    try { congBo = typeof data.cau_hinh_dap_an === 'string' ? JSON.parse(data.cau_hinh_dap_an) : (data.cau_hinh_dap_an || congBo); } catch (e) { }

    let thoiDiemVal = congBo.thoi_diem || CFG_NV.THOI_DIEM.KHOA;
    let thoiDiemSelect = thoiDiemVal;
    let gioHen = "";
    if (thoiDiemVal.startsWith("HEN_GIO|")) {
        thoiDiemSelect = CFG_NV.THOI_DIEM.HEN_GIO;
        gioHen = formatToLocal(thoiDiemVal.split("|")[1]);
    }

    // =========================================================
    // 🌟 KHỞI TẠO BẢNG ĐIỀU KHIỂN GOM FILE GIẢI (JSON)
    // =========================================================
    const ttFile = data.trang_thai_loi_giai || CFG_NV.FILE_GIAI.CHUA_LENH;
    const urlFile = data.url_file_giai || "";

    let btnFileHtml = "";
    if (ttFile === CFG_NV.FILE_GIAI.HOAN_THANH && urlFile) {
        btnFileHtml = `
            <button onclick="window.open('${urlFile}', '_blank')" style="padding:8px 15px; background:#28a745; color:white; border:none; border-radius:4px; font-weight:bold; cursor:pointer;">👁️ XEM FILE GỘP (JSON)</button>
            <button onclick="ham_7_10_ra_lenh_tao_file_giai('${data.id}', '${data.ma_hoc_lieu}')" style="padding:8px 15px; background:#f8f9fa; color:#6c757d; border:1px solid #ccc; border-radius:4px; font-weight:bold; cursor:pointer;">🔄 GOM LẠI FILE MỚI</button>
        `;
    } else if (ttFile === CFG_NV.FILE_GIAI.DANG_CHO || ttFile === CFG_NV.FILE_GIAI.DANG_XU_LY) {
        btnFileHtml = `<button disabled style="padding:8px 15px; background:#ffc107; color:#333; border:none; border-radius:4px; font-weight:bold; cursor:wait;">⏳ HỆ THỐNG ĐANG GOM DỮ LIỆU...</button>`;
    } else {
        // Nút ra lệnh lần đầu hoặc khi bị lỗi
        btnFileHtml = `<button onclick="ham_7_10_ra_lenh_tao_file_giai('${data.id}', '${data.ma_hoc_lieu}')" style="padding:8px 15px; background:#6f42c1; color:white; border:none; border-radius:4px; font-weight:bold; cursor:pointer;">🚀 RA LỆNH GOM FILE LỜI GIẢI</button>`;
    }

    vungLamViec.innerHTML = `
        <div style="max-width: 950px; background: white; padding: 25px; border-radius: 12px; margin: 0 auto; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
            <h3 style="color: #6f42c1; margin-top: 0; border-bottom: 2px solid #f1f3f4; padding-bottom: 10px; display: flex; justify-content: space-between;">
                <span>✏️ CHỈNH SỬA NHIỆM VỤ</span>
                <span style="color: #d35400; font-size: 16px;">[ Mã: ${data.ma_nhiem_vu} ]</span>
            </h3>

            <div style="background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
                <h4 style="margin-top: 0; color: #495057;">1. Thông tin chung</h4>
                <div style="display: grid; grid-template-columns: 1fr 2fr 1fr; gap: 15px;">
                    <div>
                        <label style="font-weight:bold; font-size: 13px;">Mã NV (Cố định):</label>
                        <input type="text" id="edit_nv_ma" value="${data.ma_nhiem_vu}" readonly style="width: 100%; padding: 8px; background: #e9ecef; border: 1px solid #ccc; border-radius: 4px; font-weight:bold; color: #dc3545; cursor: not-allowed;">
                    </div>
                    <div>
                        <label style="font-weight:bold; font-size: 13px;">Tên Nhiệm Vụ (*):</label>
                        <input type="text" id="edit_nv_ten" value="${data.ten_nhiem_vu}" style="width: 100%; padding: 8px; border: 1px solid #1a73e8; border-radius: 4px; box-sizing: border-box; font-weight: bold;">
                    </div>
                    <div>
                        <label style="font-weight:bold; font-size: 13px;">Loại nhiệm vụ:</label>
                        <select id="edit_nv_loai" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                            <option value="Làm đề (Online)" ${data.loai_nhiem_vu === 'Làm đề (Online)' ? 'selected' : ''}>📝 Làm đề (Online)</option>
                            <option value="Tự luận (Nộp ảnh)" ${data.loai_nhiem_vu === 'Tự luận (Nộp ảnh)' ? 'selected' : ''}>📷 Làm Tự luận (Chụp ảnh nộp)</option>
                            <option value="Xem bài giảng" ${data.loai_nhiem_vu === 'Xem bài giảng' ? 'selected' : ''}>📺 Xem Video / Slide</option>
                            <option value="Khảo sát" ${data.loai_nhiem_vu === 'Khảo sát' ? 'selected' : ''}>📊 Khảo sát / Lấy ý kiến</option>
                        </select>
                    </div>
                </div>
            </div>

            <div style="background: #e6f2ff; border: 1px solid #b8daff; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
                <h4 style="margin-top: 0; color: #0056b3;">2. Dữ liệu Học Liệu (Đề thi)</h4>
                <div style="margin-bottom: 15px;">
                    <label style="font-size: 12px; font-weight:bold; color: #d35400;">🔄 Thầy/Cô có thể chọn lại Học liệu khác cho nhiệm vụ này:</label>
                    <select id="edit_nv_maHL" style="width: 100%; padding: 10px; border: 2px solid #d35400; border-radius: 4px; font-weight:bold; margin-top: 5px;">
                        ${htmlOptionsHL}
                    </select>
                </div>
            </div>

            <div style="background: #fff8e6; border: 1px solid #ffe8a1; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
                <h4 style="margin-top: 0; color: #d35400;">3. Phân công & Quy định</h4>
                
                <div style="margin-bottom: 15px; padding: 10px; background: ${laTuDo ? '#fff3e0' : '#e3f2fd'}; border-radius: 6px; border: 1px solid #ccc;">
                    <span style="font-weight: bold;">Tính chất: </span> 
                    ${laTuDo ? '<b style="color: #d35400;">🌍 LUYỆN TẬP TỰ DO</b>' : '<b style="color: #0056b3;">🎯 NHIỆM VỤ BẮT BUỘC</b>'}
                    <input type="hidden" id="edit_nv_tinhchat" value="${laTuDo ? 'TU_DO' : 'BAT_BUOC'}">
                </div>

                <div id="khung_chon_lop_edit" style="margin-bottom: 20px; display: ${laTuDo ? 'none' : 'block'};">
                    <label style="font-weight:bold; font-size: 13px; display:block; margin-bottom: 8px;">Giao cho các Lớp:</label>
                    <div style="background: white; padding: 15px; border: 1px solid #ddd; border-radius: 6px; max-height: 120px; overflow-y: auto;">
                        ${htmlLop}
                    </div>
                </div>

                <div style="display: flex; flex-direction: column; gap: 12px;">
                    <div style="display: flex; align-items: center; background: white; padding: 10px; border-radius: 6px; border: 1px solid #eee;">
                        <label style="width: 180px; font-size: 13px; font-weight:bold;">🟢 Trạng thái NV:</label>
                        <select id="edit_nv_trangthai" style="flex: 1; padding: 8px; border: 1px solid #28a745; border-radius: 4px; font-weight: bold;">
                            <option value="1" ${String(data.trang_thai) !== '0' ? 'selected' : ''}>🟢 Mở (Kích hoạt)</option>
                            <option value="0" ${String(data.trang_thai) === '0' ? 'selected' : ''}>🔴 Khóa (Tạm dừng)</option>
                        </select>
                    </div>

                    <div style="display: flex; align-items: center; background: white; padding: 10px; border-radius: 6px; border: 1px solid #eee;">
                        <label style="width: 180px; font-size: 13px; font-weight:bold; color: #d35400;">⏱️ Thời gian làm (phút):</label>
                        <input type="number" id="edit_nv_thoigian" value="${data.thoi_gian_lam_bai || ''}" placeholder="VD: 45, 90..." style="flex: 1; padding: 8px; border: 1px solid #d35400; border-radius: 4px; font-weight: bold;">
                    </div>

                    <div style="display: flex; align-items: center; background: white; padding: 10px; border-radius: 6px; border: 1px solid #eee;">
                        <label style="width: 180px; font-size: 13px; font-weight:bold;">🔄 Số lượt tối đa:</label>
                        <input type="number" id="edit_nv_soluot" value="${data.so_luot_lam_bai || 0}" ${laTuDo ? 'disabled' : ''} style="flex: 1; padding: 8px; border: 1px solid #ccc; border-radius: 4px; background: ${laTuDo ? '#f5f5f5' : 'white'};">
                    </div>

                    <div style="display: flex; align-items: center; background: white; padding: 10px; border-radius: 6px; border: 1px solid #eee;">
                        <label style="width: 180px; font-size: 13px; font-weight:bold;">📅 Mở Lúc:</label>
                        <input type="datetime-local" id="edit_nv_mo" value="${formatToLocal(data.thoi_gian_mo)}" style="flex: 1; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                    </div>

                    <div style="display: flex; align-items: center; background: white; padding: 10px; border-radius: 6px; border: 1px solid #eee;">
                        <label style="width: 180px; font-size: 13px; font-weight:bold;">⛔ Đóng Lúc:</label>
                        <input type="datetime-local" id="edit_nv_dong" value="${formatToLocal(data.thoi_gian_dong)}" ${laTuDo ? 'disabled' : ''} style="flex: 1; padding: 8px; border: 1px solid #ccc; border-radius: 4px; background: ${laTuDo ? '#f5f5f5' : 'white'};">
                    </div>
                </div>

                <div style="margin-top: 15px; border-top: 1px dashed #e5c381; padding-top: 15px;">
                    <label style="font-weight:bold; font-size: 13px; color: #d35400;">🔀 Chế độ Đảo đề:</label>
                    <select id="edit_nv_che_do_dao" style="width: 100%; padding: 10px; border: 2px solid #d35400; border-radius: 6px; font-weight: bold;">
                        <option value="${CFG_NV.DAO_DE.KHONG}" ${modeDao === CFG_NV.DAO_DE.KHONG ? 'selected' : ''}>❌ Không đảo gì cả</option>
                        <option value="${CFG_NV.DAO_DE.CO_BAN}" ${modeDao === CFG_NV.DAO_DE.CO_BAN ? 'selected' : ''}>🔀 Đảo Câu hỏi + Đảo đáp án ABCD</option>
                        <option value="${CFG_NV.DAO_DE.TOAN_DIEN}" ${modeDao === CFG_NV.DAO_DE.TOAN_DIEN ? 'selected' : ''}>🌪️ Đảo Toàn Diện (Câu + ABCD + Đ/S)</option>
                    </select>
                </div>
            </div>

            <div style="background: #e6ffed; border: 1px solid #c3e6cb; border-radius: 8px; padding: 15px; margin-bottom: 25px;">
                <h4 style="margin-top: 0; color: #28a745;">4. Cấu hình Công bố & Bảo mật</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div>
                        <label style="font-weight:bold; font-size: 13px;">Thời điểm công bố:</label>
                        <select id="edit_nv_thoigiano" onchange="document.getElementById('khu_vuc_hen_gio_edit').style.display = (this.value === 'HEN_GIO') ? 'block' : 'none'" style="width: 100%; padding: 10px; border: 1px solid #28a745; border-radius: 4px; font-weight: bold;">
                           <option value="${CFG_NV.THOI_DIEM.KHOA}" ${thoiDiemSelect === CFG_NV.THOI_DIEM.KHOA ? 'selected' : ''}>🔒 Khóa hoàn toàn (Không bao giờ xem)</option>
                            <option value="${CFG_NV.THOI_DIEM.SAU_NOP}" ${thoiDiemSelect === CFG_NV.THOI_DIEM.SAU_NOP ? 'selected' : ''}>✅ Ngay sau khi nộp bài</option>
                            <option value="${CFG_NV.THOI_DIEM.SAU_HET_HAN}" ${thoiDiemSelect === CFG_NV.THOI_DIEM.SAU_HET_HAN ? 'selected' : ''}>⏳ Sau khi hết hạn Đóng đề</option>
                            <option value="${CFG_NV.THOI_DIEM.HEN_GIO}" ${thoiDiemSelect === CFG_NV.THOI_DIEM.HEN_GIO ? 'selected' : ''}>⏰ Hẹn một giờ cụ thể...</option>
                        </select>
                        <div id="khu_vuc_hen_gio_edit" style="display: ${thoiDiemSelect === CFG_NV.THOI_DIEM.HEN_GIO ? 'block' : 'none'}; margin-top: 10px;">
                            <label style="font-size: 12px; color: #d35400; font-weight:bold;">Giờ kích hoạt:</label>
                            <input type="datetime-local" id="edit_nv_giocongbo" value="${gioHen}" style="width: 100%; padding: 8px; border: 1px solid #d35400; border-radius: 4px;">
                        </div>
                    </div>
                    <div>
                        <label style="font-weight:bold; font-size: 13px;">Mức độ công bố:</label>
                        <select id="edit_nv_mucdo" style="width: 100%; padding: 10px; border: 1px solid #1a73e8; border-radius: 4px; font-weight: bold; color: #1a73e8;">
                            <option value="${CFG_NV.MUC_DO.DAPAN_DIEM}" ${congBo.muc_do === CFG_NV.MUC_DO.DAPAN_DIEM ? 'selected' : ''}>📊 Chỉ xem Bảng Đáp án (A,B,C,D) & Điểm</option>
                            <option value="${CFG_NV.MUC_DO.FULL_LOIGIAI}" ${congBo.muc_do === CFG_NV.MUC_DO.FULL_LOIGIAI ? 'selected' : ''}>📚 Xem Đáp án VÀ Tải File Lời giải chi tiết</option>
                        </select>
                    </div>
                </div>

                <div style="margin-top: 15px; border-top: 1px dashed #c3e6cb; padding-top: 15px;">
                    <h4 style="margin: 0 0 10px 0; color: #6f42c1; font-size: 14px;">🛠️ TẠO FILE LỜI GIẢI (JSON GỘP)</h4>
                    <div style="display: flex; gap: 15px; align-items: center; flex-wrap: wrap;">
                        <div>
                            <select id="edit_nv_trang_thai_file" disabled style="padding: 8px; border-radius: 4px; border: 1px solid #ccc; background: #e9ecef; font-weight:bold; color:#495057;">
                                <option value="${CFG_NV.FILE_GIAI.CHUA_LENH}" ${ttFile === CFG_NV.FILE_GIAI.CHUA_LENH ? 'selected' : ''}>⚪ Chưa có lệnh</option>
                                <option value="${CFG_NV.FILE_GIAI.DANG_XU_LY}" ${ttFile === CFG_NV.FILE_GIAI.DANG_XU_LY ? 'selected' : ''}>⚙️ Đang xử lý (Gom data)</option>
                                <option value="${CFG_NV.FILE_GIAI.HOAN_THANH}" ${ttFile === CFG_NV.FILE_GIAI.HOAN_THANH ? 'selected' : ''}>✅ Đã hoàn thành</option>
                                <option value="${CFG_NV.FILE_GIAI.LOI}" ${ttFile === CFG_NV.FILE_GIAI.LOI ? 'selected' : ''}>❌ Lỗi gom file</option>
                            </select>
                        </div>
                        <div id="khu-vuc-nut-file" style="display:flex; gap:10px;">${btnFileHtml}</div>
                    </div>
                    ${urlFile ? `<div style="margin-top:10px; font-size:11px; color:#1a73e8; word-break:break-all;">🔗 Link File Gộp: <a href="${urlFile}" target="_blank">${urlFile}</a></div>` : ''}
                    <p style="font-size: 11px; color: #666; margin-top: 5px; font-style: italic;">* Hệ thống sẽ tự động tải các file lời giải lẻ của từng câu và ghép thành 1 file duy nhất đẩy lên Github.</p>
                </div>
            </div>

            <div style="display: flex; gap: 15px;">
                <button onclick="ham_7_7_luu_cap_nhat_nhiem_vu('${data.ma_nhiem_vu}', this)" style="flex: 2; padding: 15px; background: #ffc107; color: #333; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    💾 LƯU CẬP NHẬT
                </button>
                <button onclick="ham_7_1_ve_quan_ly_nhiem_vu()" style="flex: 1; padding: 15px; background: #6c757d; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">
                    HỦY QUAY LẠI
                </button>
            </div>
        </div>



    `;
    // Thả dòng này vào cuối hàm mở form xem/sửa nhiệm vụ, truyền vào mã học liệu của nhiệm vụ đó
    ham_7_11_ve_nut_loi_giai_dong(data.ma_hoc_lieu);
}

// ==============================================================
// Hàm 7.7: Thu thập và Gửi Cập nhật Nhiệm vụ (FULL JSON & THỜI GIAN LÀM BÀI)
// ==============================================================
//async function ham_7_7_luu_cap_nhat_nhiem_vu(maNhiemVu, btnNode) {
//    const tenNV = document.getElementById('edit_nv_ten').value.trim();
//    const khoi = document.getElementById('edit_nv_khoi').value;
//    const loaiKT = document.getElementById('edit_nv_loaiKT').value;
//    const trangThai = document.getElementById('edit_nv_trangthai').value;

//    // 🌟 LẤY THỜI GIAN LÀM BÀI MỚI
//    const tgLamBai = parseInt(document.getElementById('edit_nv_thoigian').value) || 0;

//    let soLuot = parseInt(document.getElementById('edit_nv_soluot').value) || 0;
//    let mo = document.getElementById('edit_nv_mo').value;
//    let dong = document.getElementById('edit_nv_dong').value;

//    // Danh sách lớp mới
//    const chkLop = document.querySelectorAll('.chk-lop-edit:checked');
//    const dsLopChon = Array.from(chkLop).map(chk => chk.value);

//    // 1. Kiểm tra đầu vào
//    if (!tenNV || dsLopChon.length === 0) return alert("❌ Tên nhiệm vụ và Lớp giao không được để trống!");

//    // 🌟 LOGIC BẢO VỆ TÍNH CHẤT TỰ DO
//    if (dsLopChon.includes("#LUYEN_TAP_TU_DO#")) {
//        soLuot = 0;   // Ép về Vô hạn
//        dong = null;  // Ép về Không hạn chót
//    }

//    // Cấu hình Đảo Đề
//    const cheDoDao = document.getElementById('edit_nv_che_do_dao').value;
//    let configDaoDe = { cau: false, abcd: false, ds: false };
//    if (cheDoDao === CFG_NV.DAO_DE.CO_BAN) configDaoDe = { cau: true, abcd: true, ds: false };
//    else if (cheDoDao === CFG_NV.DAO_DE.TOAN_DIEN) configDaoDe = { cau: true, abcd: true, ds: true };

//    // Cấu hình Công Bố
//    let thoiDiem = document.getElementById('edit_nv_thoigiano').value;
//    const mucDo = document.getElementById('edit_nv_mucdo').value;
//    if (thoiDiem === CFG_NV.THOI_DIEM.HEN_GIO) {
//        const gioHen = document.getElementById('edit_nv_giocongbo').value;
//        if (!gioHen) return alert("❌ Thầy phải nhập Giờ công bố!");
//        thoiDiem = `${CFG_NV.THOI_DIEM.HEN_GIO}|${new Date(gioHen).toISOString()}`;
//    }
//    let configCongBo = { thoi_diem: thoiDiem, muc_do: (thoiDiem === CFG_NV.THOI_DIEM.KHOA) ? CFG_NV.MUC_DO.KHONG : mucDo };

//    btnNode.disabled = true;
//    btnNode.innerText = "⏳ ĐANG LƯU...";

//    try {
//        const { error } = await _supabase
//            .from('nhiem_vu')
//            .update({
//                ten_nhiem_vu: tenNV,
//                khoi_lop: khoi,
//                loai_kiem_tra: loaiKT,
//                danh_sach_lop: JSON.stringify(dsLopChon), // Đảm bảo đúng định dạng jsonb
//                thoi_gian_lam_bai: tgLamBai,              // 🌟 LƯU THỜI GIAN LÀM BÀI VÀO DB
//                thoi_gian_mo: mo ? new Date(mo).toISOString() : null,
//                thoi_gian_dong: dong ? new Date(dong).toISOString() : null,
//                so_luot_lam_bai: soLuot,
//                trang_thai: trangThai,
//                dao_cau_hoi: configDaoDe,
//                cau_hinh_dap_an: configCongBo
//            })
//            .eq('ma_nhiem_vu', maNhiemVu);

//        if (error) throw error;

//        alert("✅ Đã cập nhật Nhiệm Vụ thành công!");
//        ham_7_1_ve_quan_ly_nhiem_vu();

//    } catch (error) {
//        alert("Lỗi: " + error.message);
//        btnNode.disabled = false;
//        btnNode.innerText = "💾 LƯU CẬP NHẬT";
//    }
//}


// ==============================================================
// Hàm 7.7: Thu thập và Gửi Cập nhật Nhiệm vụ (FIX LỖI NULL VALUE)
// ==============================================================
async function ham_7_7_luu_cap_nhat_nhiem_vu(maNhiemVu, btnNode) {
    // 1. Lấy các thông tin cơ bản (Luôn tồn tại)
    const elTen = document.getElementById('edit_nv_ten');
    const elKhoi = document.getElementById('edit_nv_khoi');
    const elLoaiKT = document.getElementById('edit_nv_loaiKT');
    const elTrangThai = document.getElementById('edit_nv_trangthai');
    const elTG = document.getElementById('edit_nv_thoigian');
    const elSoLuot = document.getElementById('edit_nv_soluot');
    const elMo = document.getElementById('edit_nv_mo');
    const elDong = document.getElementById('edit_nv_dong');
    const elTinhChat = document.getElementById('edit_nv_tinhchat');

    const tenNV = elTen ? elTen.value.trim() : "";
    const khoi = elKhoi ? elKhoi.value : "";
    const loaiKT = elLoaiKT ? elLoaiKT.value : "";
    const trangThai = elTrangThai ? elTrangThai.value : "1";
    const tgLamBai = elTG ? (parseInt(elTG.value) || 0) : 0;
    const tinhChat = elTinhChat ? elTinhChat.value : "BAT_BUOC";
    const maHocLieuMoi = document.getElementById('edit_nv_maHL').value;


    let soLuot = elSoLuot ? (parseInt(elSoLuot.value) || 0) : 0;
    let mo = elMo ? elMo.value : null;
    let dong = elDong ? elDong.value : null;

    // 2. Xử lý danh sách lớp (Chỉ lấy nếu không phải bài tự do)
    let dsLopChon = [];
    if (tinhChat === "TU_DO") {
        dsLopChon = ["#LUYEN_TAP_TU_DO#"];
        soLuot = 0;
        dong = null;
    } else {
        const chkLop = document.querySelectorAll('.chk-lop-edit:checked');
        dsLopChon = Array.from(chkLop).map(chk => chk.value);
    }

    if (!tenNV || dsLopChon.length === 0) return alert("❌ Tên nhiệm vụ và Lớp giao không được để trống!");

    // 3. Cấu hình Đảo Đề (Kiểm tra an toàn)
    const elDao = document.getElementById('edit_nv_che_do_dao');
    let configDaoDe = { cau: false, abcd: false, ds: false };
    if (elDao) {
        if (elDao.value === CFG_NV.DAO_DE.CO_BAN) configDaoDe = { cau: true, abcd: true, ds: false };
        else if (elDao.value === CFG_NV.DAO_DE.TOAN_DIEN) configDaoDe = { cau: true, abcd: true, ds: true };
    }

    // 4. Cấu hình Công Bố (Kiểm tra an toàn cho các ô có thể bị ẩn)
    const elThoiDiem = document.getElementById('edit_nv_thoigiano');
    const elMucDo = document.getElementById('edit_nv_mucdo');
    const elGioHen = document.getElementById('edit_nv_giocongbo');

    let thoiDiem = elThoiDiem ? elThoiDiem.value : CFG_NV.THOI_DIEM.KHOA;
    let mucDo = elMucDo ? elMucDo.value : CFG_NV.MUC_DO.KHONG;

    if (thoiDiem === CFG_NV.THOI_DIEM.HEN_GIO && elGioHen) {
        const gioHen = elGioHen.value;
        if (!gioHen) return alert("❌ Thầy phải nhập Giờ công bộ!");
        thoiDiem = `${CFG_NV.THOI_DIEM.HEN_GIO}|${new Date(gioHen).toISOString()}`;
    }
    let configCongBo = { thoi_diem: thoiDiem, muc_do: (thoiDiem === CFG_NV.THOI_DIEM.KHOA) ? CFG_NV.MUC_DO.KHONG : mucDo };

    // 5. Gửi cập nhật
    btnNode.disabled = true;
    btnNode.innerText = "⏳ ĐANG LƯU...";

    try {
        const { error } = await _supabase
            .from('nhiem_vu')
            .update({
                ten_nhiem_vu: tenNV,
                khoi_lop: khoi,
                loai_kiem_tra: loaiKT,
                //danh_sach_lop: JSON.stringify(dsLopChon),
                ma_hoc_lieu: maHocLieuMoi,
                danh_sach_lop: dsLopChon,
                thoi_gian_lam_bai: tgLamBai,
                thoi_gian_mo: mo ? new Date(mo).toISOString() : null,
                thoi_gian_dong: dong ? new Date(dong).toISOString() : null,
                so_luot_lam_bai: soLuot,
                trang_thai: trangThai,
                dao_cau_hoi: configDaoDe,
                cau_hinh_dap_an: configCongBo
            })
            .eq('ma_nhiem_vu', maNhiemVu);

        if (error) throw error;

        alert("✅ Đã cập nhật Nhiệm Vụ thành công!");
        ham_7_1_ve_quan_ly_nhiem_vu();

    } catch (error) {
        alert("Lỗi: " + error.message);
        btnNode.disabled = false;
        btnNode.innerText = "💾 LƯU CẬP NHẬT";
    }
}


// ==============================================================
// Hàm 7.9: Kích hoạt lệnh ráp file lời giải (Issue Command)
// ==============================================================
async function ham_7_9_kich_hoat_tao_file_giai(maNhiemVu) {
    if (!confirm("❓ Thầy muốn phát lệnh ráp file lời giải ngay bây giờ?\n\nHệ thống sẽ thu thập các câu hỏi từ Github và đóng gói thành file PDF/HTML bảo mật.")) return;

    try {
        const { error } = await _supabase
            .from('nhiem_vu')
            .update({
                trang_thai_loi_giai: CFG_NV.FILE_GIAI.DANG_CHO
            })
            .eq('ma_nhiem_vu', maNhiemVu);

        if (error) throw error;

        alert("✅ Đã phát lệnh thành công! Thầy vui lòng đợi vài phút để hệ thống đóng gói file.");

        // Tải lại dữ liệu và mở lại form để thấy trạng thái mới
        await ham_7_2_tai_danh_sach_nhiem_vu();
        ham_7_6_mo_form_nhiem_vu(maNhiemVu);

    } catch (error) {
        alert("❌ Lỗi khi phát lệnh: " + error.message);
    }
}



// BẪY LỖI SỐ 2: BẮT CÁC LỖI NGẦM TRONG HÀM TẢI DỮ LIỆU (ASYNC/AWAIT)
window.onunhandledrejection = function (event) {
    alert(`🚨 LỖI TẢI DỮ LIỆU NGẦM (PROMISE):\n\nChi tiết: ${event.reason}\n\nHãy chụp màn hình này lại!`);
};

// ==============================================================
// Hàm 7.10: Ráp File Lời Giải Gộp (Tuyệt mật bằng mã sol_)
// ==============================================================
window.ham_7_10_ra_lenh_tao_file_giai = async function (idThamChieu, maHocLieu) {
    if (!confirm("🚀 Bắt đầu quá trình gom file lời giải?\n\nHệ thống sẽ dùng mã giải (sol_) thay cho mã câu (q_), băm tên file ngẫu nhiên và cất vào Ngan_Hang_Giai_Gop.")) return;

    if (typeof CFG_HE_THONG === 'undefined') {
        alert("❌ Lỗi: Chưa tìm thấy file cấu hình CFG_HE_THONG.");
        return;
    }

    const GITHUB_TOKEN = CFG_HE_THONG.GITHUB_TOKEN;
    const GITHUB_REPO = CFG_HE_THONG.GITHUB_REPO;
    const BASE_URL_KHO_GIAI_LE = CFG_HE_THONG.KHO_GIAI_LE_URL;

    const divNut = document.getElementById('khu-vuc-nut-file');
    if (divNut) divNut.innerHTML = `<button disabled style="padding:8px 15px; background:#ffc107; color:#333; border:none; border-radius:4px; font-weight:bold; cursor:wait;">⏳ ĐANG TẠO FILE BÓNG MA...</button>`;

    try {
        const { data: dataHL, error: errHL } = await _supabase
            .from('hoc_lieu')
            .select('danh_sach_cau_hoi')
            .eq('ma_hoc_lieu', maHocLieu)
            .single();

        if (errHL || !dataHL) throw new Error("Không tải được dữ liệu Học liệu!");

        let dsCauHoi = dataHL.danh_sach_cau_hoi;
        if (typeof dsCauHoi === 'string') { try { dsCauHoi = JSON.parse(dsCauHoi); } catch (e) { dsCauHoi = []; } }
        if (!Array.isArray(dsCauHoi)) dsCauHoi = [];

        let danhSachLoiGiaiDaGhep = [];

        // 3. VÒNG LẶP TẢI VÀ RÚT RUỘT CÁC FILE LỜI GIẢI LẺ
        for (let item of dsCauHoi) {
            let maCauGoc = item.ma_cau_hoi || item.maCau || "";
            let maLoiGiai = item.ma_loi_giai || item.maBaoMat;
            let dapAnDB = item.dap_an || "";

            if (!maCauGoc || !maLoiGiai) continue;

            let tenFileGiai = maLoiGiai.endsWith('.json') ? maLoiGiai : maLoiGiai + '.json';

            try {
                let res = await fetch(`${BASE_URL_KHO_GIAI_LE}/${tenFileGiai}`);
                if (res.ok) {
                    let dataCau = await res.json();
                    danhSachLoiGiaiDaGhep.push({
                        // 🌟 THAY ĐỔI CỐT LÕI: Chỉ dùng mã sol_, tuyệt đối không lưu mã q_
                        maBaoMat: maLoiGiai,
                        dapAn: dataCau.dapAn || dataCau.dap_an || dapAnDB,
                        loiGiaiHtml: dataCau.loiGiai || dataCau.loiGiaiHtml || ""
                    });
                } else {
                    danhSachLoiGiaiDaGhep.push({
                        maBaoMat: maLoiGiai,
                        dapAn: dapAnDB,
                        loiGiaiHtml: "Chưa có lời giải chi tiết cho câu này."
                    });
                }
            } catch (e) {
                danhSachLoiGiaiDaGhep.push({
                    maBaoMat: maLoiGiai,
                    dapAn: dapAnDB,
                    loiGiaiHtml: "Lỗi đường truyền khi tải giải."
                });
            }
        }

        // 4. ĐÓNG GÓI JSON VÀ TẨY TRẮNG MÃ HỌC LIỆU
        const fileContent = JSON.stringify({
            thoiGianGhep: new Date().toISOString(),
            danhSachLoiGiai: danhSachLoiGiaiDaGhep
        }, null, 2);

        const utf8ToBase64 = (str) => btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (m, p1) => String.fromCharCode('0x' + p1)));
        const encodedContent = utf8ToBase64(fileContent);

        // 5. BĂM TÊN FILE VÀ LƯU VÀO THƯ MỤC GỘP
        const randomHash = Math.random().toString(36).substring(2, 8) + '_' + Date.now().toString(36);
        const tenFileGithub = `Ngan_Hang_Giai_Gop/GiaiGop_${randomHash}.json`;

        const githubApiUrl = `https://api.github.com/repos/${GITHUB_REPO}/contents/${tenFileGithub}`;

        const putRes = await fetch(githubApiUrl, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${GITHUB_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: `Gom file giải gộp bảo mật (Hash ID: ${randomHash})`,
                content: encodedContent
            })
        });

        if (!putRes.ok) {
            let errorText = await putRes.text();
            throw new Error(`Github từ chối lưu file: ${errorText}`);
        }

        const putData = await putRes.json();
        const linkFileGiai = putData.content?.download_url || `https://raw.githubusercontent.com/${GITHUB_REPO}/main/${tenFileGithub}`;

        // Lưu đường dẫn bí mật vào bảng học liệu
        const { error: errUpdate } = await _supabase
            .from('hoc_lieu')
            .update({ url_file_giai: linkFileGiai })
            .eq('ma_hoc_lieu', maHocLieu);

        if (errUpdate) throw errUpdate;

        alert("✅ TẠO FILE GIẢI THÀNH CÔNG!\n\nHệ thống dữ liệu đã được cập nhật.");

        // 🌟 CHỐT CHẶN TỰ ĐỘNG CHẠY LẠI: Vẽ lại giao diện nút bấm theo trạng thái mới cứng
        if (typeof ham_7_11_ve_nut_loi_giai_dong === 'function') {
            await ham_7_11_ve_nut_loi_giai_dong(maHocLieu);
        }


    } catch (error) {
        console.error("Lỗi ráp file giải:", error);
        alert("❌ Lỗi: " + error.message);
        if (divNut) divNut.innerHTML = `<button onclick="ham_7_10_ra_lenh_tao_file_giai('${idThamChieu}', '${maHocLieu}')" style="padding:8px 15px; background:#dc3545; color:white; border:none; border-radius:4px; font-weight:bold; cursor:pointer;">❌ LỖI! THỬ LẠI</button>`;
    }
};

// ==============================================================
// Hàm 7.11: Quét trạng thái Học liệu và vẽ nút Lời giải động
// ==============================================================
window.ham_7_11_ve_nut_loi_giai_dong = async function (maHocLieu) {
    const divNut = document.getElementById('khu-vuc-nut-file');
    if (!divNut) return;

    // Hiển thị trạng thái chờ trong lúc quét DB
    divNut.innerHTML = `<span style="color: #666; font-size: 14px; font-style: italic;">⏳ Đang kiểm tra dữ liệu file giải...</span>`;

    try {
        // Kiểm tra xem Học liệu này đã được tạo file giải gộp chưa
        const { data: hl, error } = await _supabase
            .from('hoc_lieu')
            .select('id, url_file_giai')
            .eq('ma_hoc_lieu', maHocLieu)
            .single();

        if (error || !hl) {
            divNut.innerHTML = `<span style="color:#dc3545; font-weight:bold;">⚠️ Không tìm thấy thông tin Học liệu!</span>`;
            return;
        }

        const idHocLieu = hl.id;
        const urlFileGiai = hl.url_file_giai;

        // 🌟 BIỆN PHÁP ĐIỀU HƯỚNG GIAO DIỆN THEO ĐIỀU KIỆN ĐỀ XUẤT
        if (!urlFileGiai) {
            // NẾU CHƯA CÓ FILE GIẢI: Hiện duy nhất nút ra lệnh gom
            divNut.innerHTML = `
                <button onclick="ham_7_10_ra_lenh_tao_file_giai('${idHocLieu}', '${maHocLieu}')" 
                        style="padding: 8px 16px; background: #007bff; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; transition: 0.2s;"
                        onmouseover="this.style.background='#0056b3'" onmouseout="this.style.background='#007bff'">
                    🚀 Ra lệnh gom file lời giải
                </button>
            `;
        } else {
            // NẾU ĐÃ CÓ FILE GIẢI: Hiện 2 nút xem và làm lại
            divNut.innerHTML = `
                <div style="display: flex; gap: 10px; align-items: center;">
                    <a href="${urlFileGiai}" target="_blank" 
                       style="padding: 8px 16px; background: #28a745; color: white; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block; transition: 0.2s;"
                       onmouseover="this.style.background='#218838'" onmouseout="this.style.background='#28a745'">
                        👁️ Xem lời giải
                    </a>
                    <button onclick="ham_7_10_ra_lenh_tao_file_giai('${idHocLieu}', '${maHocLieu}')" 
                            style="padding: 8px 16px; background: #17a2b8; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; transition: 0.2s;"
                            onmouseover="this.style.background='#138496'" onmouseout="this.style.background='#17a2b8'">
                        🔄 Thực hiện lại gom lời giải
                    </button>
                </div>
            `;
        }
    } catch (err) {
        console.error("Lỗi kiểm tra nút file giải:", err);
        divNut.innerHTML = `<span style="color:#dc3545;">Lỗi tải cấu hình file giải.</span>`;
    }
};



// =====================================================================
// KHỞI TẠO TRẠNG THÁI SẮP XẾP TOÀN CỤC (MẶC ĐỊNH ƯU TIÊN TRẠNG THÁI)
// =====================================================================
if (!window.DuyetDonSortState) {
    window.DuyetDonSortState = { key: 'trang_thai', asc: true };
}

// =====================================================================
// Hàm 7.12: Tab HÒM THƯ DUYỆT ĐƠN CỦA GIÁO VIÊN (TỐI ƯU MẶC ĐỊNH CHỜ DUYỆT LÊN ĐẦU)
// =====================================================================
window.ham_7_12_tab_duyet_don = async function () {
    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
    vungLamViec.innerHTML = `<div style="text-align: center; padding: 40px;"><h3 style="color:#ffc107;">⏳ Đang mở hòm thư và trích xuất cấu trúc nhiệm vụ...</h3></div>`;

    try {
        // 1. Tải toàn bộ đơn yêu cầu từ Database
        const { data: dsDon, error } = await _supabase
            .from('yeu_cau_hoc_sinh')
            .select('*');

        if (error) throw error;

        if (!dsDon || dsDon.length === 0) {
            vungLamViec.innerHTML = `
                <div style="text-align: center; padding: 50px; background: #fff; border-radius: 10px; border: 1px dashed #ccc;">
                    <p style="font-size: 60px; margin:0;">📭</p>
                    <h3 style="color: #6c757d;">Hòm thư trống</h3>
                    <p style="color: #888;">Hiện tại chưa có học sinh nào gửi yêu cầu xin mở khóa bài tập.</p>
                </div>
            `;
            return;
        }

        // ĐẾM SỐ ĐƠN ĐANG CHỜ DUYỆT (Trạng thái = 0)
        const soDonChuaDuyet = dsDon.filter(d => d.trang_thai === 0).length;

        const cssBadge = soDonChuaDuyet > 0
            ? "background: #dc3545; color: white; box-shadow: 0 2px 6px rgba(220,53,69,0.4);"
            : "background: rgba(0,0,0,0.1); color: #333;";

        // 2. TRUY VẤN SONG SONG LẤY CHI TIẾT NHIỆM VỤ GỐC
        const mangMaNV = [...new Set(dsDon.map(d => d.ma_nhiem_vu).filter(Boolean))];
        let tuDienNhiemVuGoc = {};

        if (mangMaNV.length > 0) {
            const { data: dsNVGoc } = await _supabase
                .from('nhiem_vu')
                .select('ma_nhiem_vu, thoi_gian_lam_bai, thoi_gian_mo, thoi_gian_dong, so_luot_lam_bai, cau_truc_de')
                .in('ma_nhiem_vu', mangMaNV);

            if (dsNVGoc) {
                dsNVGoc.forEach(nv => {
                    tuDienNhiemVuGoc[nv.ma_nhiem_vu] = nv;
                });
            }
        }

        // =====================================================================
        // 🌟 3. LOGIC SẮP XẾP ĐA TẦNG (CẢI TIẾN TRẠNG THÁI MẶC ĐỊNH)
        // =====================================================================
        dsDon.sort((a, b) => {
            const sortKey = window.DuyetDonSortState.key;

            // NẾU ĐANG XẾP THEO TRẠNG THÁI (MẶC ĐỊNH LÚC MỞ TAB)
            if (sortKey === 'trang_thai') {
                const trangThaiA = Number(a.trang_thai) || 0;
                const trangThaiB = Number(b.trang_thai) || 0;

                if (trangThaiA !== trangThaiB) {
                    // Trạng thái 0 lên đầu (tăng dần: 0 -> 1 -> -1)
                    return window.DuyetDonSortState.asc ? (trangThaiA - trangThaiB) : (trangThaiB - trangThaiA);
                } else {
                    // 🌟 Nếu cùng trạng thái -> Đơn nào MỚI HƠN (ngay_tao lớn hơn) sẽ nhảy lên trước
                    const thoiGianA = new Date(a.ngay_tao || 0).getTime();
                    const thoiGianB = new Date(b.ngay_tao || 0).getTime();
                    return thoiGianB - thoiGianA;
                }
            }

            // CÁC TRƯỜNG HỢP XẾP THEO CỘT KHÁC KHI CLICK HEADER
            let valA, valB;
            if (sortKey === 'hoc_sinh') {
                valA = (a.ten_hoc_sinh || '').toLowerCase();
                valB = (b.ten_hoc_sinh || '').toLowerCase();
            } else if (sortKey === 'nhiem_vu') {
                valA = (a.ten_nhiem_vu || '').toLowerCase();
                valB = (b.ten_nhiem_vu || '').toLowerCase();
            } else if (sortKey === 'ly_do') {
                valA = (a.ly_do || '').toLowerCase();
                valB = (b.ly_do || '').toLowerCase();
            } else if (sortKey === 'ngay_tao') {
                valA = new Date(a.ngay_tao || 0).getTime();
                valB = new Date(b.ngay_tao || 0).getTime();
            } else {
                valA = a[sortKey];
                valB = b[sortKey];
            }

            if (valA < valB) return window.DuyetDonSortState.asc ? -1 : 1;
            if (valA > valB) return window.DuyetDonSortState.asc ? 1 : -1;
            return 0;
        });

        const veMuiTenSort = (colKey) => {
            if (window.DuyetDonSortState.key !== colKey) return ' <span style="color:#ccc; font-size:10px;">⇅</span>';
            return window.DuyetDonSortState.asc ? ' <span style="color:#28a745;">🔼</span>' : ' <span style="color:#dc3545;">🔽</span>';
        };

        // 4. DUYỆT MẢNG VẼ HÀNG DỮ LIỆU HTML
        let htmlRows = '';
        const opts = { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' };

        dsDon.forEach((don, index) => {
            const ngayGui = don.ngay_tao ? new Date(don.ngay_tao).toLocaleString('vi-VN', opts) : '';

            let loaiBadge = don.loai_yeu_cau === 'QUA_HAN'
                ? `<span style="background: #fff3cd; color: #856404; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; border: 1px solid #ffeeba;">⏰ XIN NỘP MUỘN</span>`
                : `<span style="background: #cce5ff; color: #004085; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; border: 1px solid #b8daff;">🔄 XIN THÊM LƯỢT</span>`;

            let hanhDongHtml = '';
            let trangThaiBadge = '';

            if (don.trang_thai === 0) {
                trangThaiBadge = `<span style="color: #fd7e14; font-weight: bold; font-size: 13px;">⏳ Chờ duyệt</span>`;
                hanhDongHtml = `
                    <div style="display: flex; gap: 5px; justify-content: center;">
                        <button onclick="ham_7_13_xu_ly_duyet_don('${don.id}', '${don.uid_hoc_sinh}', '${don.ma_nhiem_vu}', '${don.loai_yeu_cau}', 'DUYET')" style="padding: 6px 12px; background: #28a745; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; font-size: 12px; transition: 0.2s;" onmouseover="this.style.background='#218838'" onmouseout="this.style.background='#28a745'">✅ DUYỆT</button>
                        <button onclick="ham_7_13_xu_ly_duyet_don('${don.id}', '${don.uid_hoc_sinh}', '${don.ma_nhiem_vu}', '${don.loai_yeu_cau}', 'TU_CHOI')" style="padding: 6px 12px; background: #dc3545; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; font-size: 12px; transition: 0.2s;" onmouseover="this.style.background='#c82333'" onmouseout="this.style.background='#dc3545'">❌ TỪ CHỐI</button>
                    </div>
                `;
            } else if (don.trang_thai === 1) {
                trangThaiBadge = `<span style="color: #28a745; font-weight: bold; font-size: 13px;">✅ Đã duyệt</span>`;
                hanhDongHtml = `<span style="color: #ccc; font-size: 12px; font-weight: bold;">Đã xử lý</span>`;
            } else {
                trangThaiBadge = `<span style="color: #dc3545; font-weight: bold; font-size: 13px;">❌ Từ chối</span>`;
                hanhDongHtml = `<span style="color: #ccc; font-size: 12px; font-weight: bold;">Đã xử lý</span>`;
            }

            const nvGoc = tuDienNhiemVuGoc[don.ma_nhiem_vu] || {};
            const thoiGianLamTxt = nvGoc.thoi_gian_lam_bai > 0 ? `${nvGoc.thoi_gian_lam_bai} phút` : 'Tự do';
            const gioHanLuotTxt = nvGoc.so_luot_lam_bai > 0 ? `${nvGoc.so_luot_lam_bai} lượt` : 'Vô hạn';
            const cauTrucTxt = nvGoc.cau_truc_de || 'Chưa cấu hình';

            const renderTimeFormat = (dStr) => dStr ? new Date(dStr).toLocaleString('vi-VN', opts) : "Không giới hạn";
            const hanMoTxt = renderTimeFormat(nvGoc.thoi_gian_mo);
            const hanDongTxt = renderTimeFormat(nvGoc.thoi_gian_dong);

            htmlRows += `
                <tr style="border-bottom: 1px solid #eee; background: ${don.trang_thai === 0 ? '#fff' : '#f8f9fa'};">
                    <td style="padding: 15px 10px; text-align: center; color: #666; font-weight: bold;">${index + 1}</td>
                    <td style="padding: 15px 10px;">
                        <div style="font-weight: bold; color: #1a73e8; font-size: 15px;">${don.ten_hoc_sinh || 'Học sinh'}</div>
                        <div style="font-size: 11px; color: #666; margin-top: 3px;">Lớp: <b>${don.ma_lop || 'N/A'}</b></div>
                        <div style="font-size: 10px; color: #999; margin-top: 2px; font-family: monospace;">UID: ${don.uid_hoc_sinh}</div>
                    </td>
                    <td style="padding: 15px 10px;">
                        <div style="font-weight: bold; color: #2c3e50; font-size: 14px; margin-bottom: 6px;">${don.ten_nhiem_vu || 'Nhiệm vụ'}</div>
                        
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 5px; font-size: 11px; background: #fdfefe; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px; color: #4a5568; line-height: 1.4; max-width: 320px; box-shadow: inset 0 1px 3px rgba(0,0,0,0.02);">
                            <div>⏱️ Thời gian: <b style="color:#2b6cb0;">${thoiGianLamTxt}</b></div>
                            <div>🔄 Giới hạn: <b style="color:#2b6cb0;">${gioHanLuotTxt}</b></div>
                            <div style="grid-column: span 2; border-bottom: 1px dashed #e2e8f0; padding-bottom: 3px; margin-bottom: 2px;">
                                📦 Cấu trúc: <span style="color:#2e7d32; font-weight:bold;">${cauTrucTxt}</span>
                            </div>
                            <div style="grid-column: span 2; font-size: 10px; color: #718096;">
                                <div style="display:flex; justify-content:space-between;"><span>🟢 Ngày mở:</span> <b>${hanMoTxt}</b></div>
                                <div style="display:flex; justify-content:space-between; margin-top:1px;"><span>🔴 Ngày đóng:</span> <b style="color:#c62828;">${hanDongTxt}</b></div>
                            </div>
                        </div>

                        <div style="margin-top: 8px; display: flex; align-items: center; gap: 6px;">
                            ${loaiBadge} 
                            <span style="font-size: 11px; color: #7f8c8d; font-style: italic;">Gửi lúc: ${ngayGui}</span>
                        </div>
                    </td>
                    
                    <td style="padding: 15px 10px;">
                        <div style="background: #f1f3f4; padding: 10px 12px; border-radius: 6px; font-size: 13px; color: #2c3e50; font-style: italic; border-left: 4px solid #ff9800; line-height: 1.5; min-width: 180px;">
                            "${don.ly_do || 'Không có lý do giải trình.'}"
                        </div>
                    </td>
                    <td style="padding: 15px 10px; text-align: center;">${trangThaiBadge}</td>
                    <td style="padding: 15px 10px; text-align: center;">${hanhDongHtml}</td>
                </tr>
            `;
        });

        // 5. RENDER MAIN GIAO DIỆN
        vungLamViec.innerHTML = `
            <div style="background: white; border: 1px solid #e0e0e0; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); overflow: hidden;">
                <div style="background: linear-gradient(135deg, #ffc107, #ff9800); padding: 20px; color: #000; display: flex; justify-content: space-between; align-items: center;">
                    <h3 style="margin: 0; font-size: 18px; font-weight: 900; display:flex; align-items:center; gap:8px;">📭 HÒM THƯ XÉT DUYỆT YÊU CẦU CỦA HỌC SINH</h3>
                    
                    <span style="${cssBadge} padding: 6px 14px; border-radius: 20px; font-size: 14px; font-weight: bold; transition: 0.3s;">
                        🔔 Cần duyệt: ${soDonChuaDuyet} đơn
                    </span>
                </div>
                
                <div style="background: #fff9e6; padding: 10px 15px; font-size: 12px; color: #b7791f; border-bottom: 1px solid #fbd38d; font-weight: bold;">
                    💡 Mẹo quản lý: Thầy có thể click chuột trực tiếp vào tiêu đề các cột <span style="background:white; padding:2px 4px; border-radius:3px;">Học Sinh</span>, <span style="background:white; padding:2px 4px; border-radius:3px;">Nhiệm Vụ</span>, <span style="background:white; padding:2px 4px; border-radius:3px;">Lý Do</span>, <span style="background:white; padding:2px 4px; border-radius:3px;">Trạng Thái</span> để đảo chiều sắp xếp danh sách tăng/giảm.
                </div>

                <div style="overflow-x: auto; padding: 10px;">
                    <table style="width: 100%; border-collapse: collapse; min-width: 950px; text-align: left;">
                        <thead style="background: #f7fafc; border-bottom: 2px solid #e2e8f0; user-select: none;">
                            <tr>
                                <th style="padding: 12px 10px; text-align: center; color: #4a5568; width: 40px; font-weight: bold;">STT</th>
                                
                                <th onclick="ham_7_12_thay_doi_sap_xep('hoc_sinh')" style="padding: 12px 10px; color: #4a5568; width: 190px; cursor: pointer; font-weight: bold;" onmouseover="this.style.background='#edf2f7'" onmouseout="this.style.background='transparent'">
                                    Học Sinh ${veMuiTenSort('hoc_sinh')}
                                </th>
                                <th onclick="ham_7_12_thay_doi_sap_xep('nhiem_vu')" style="padding: 12px 10px; color: #4a5568; width: 340px; cursor: pointer; font-weight: bold;" onmouseover="this.style.background='#edf2f7'" onmouseout="this.style.background='transparent'">
                                    Nhiệm Vụ Yêu Cầu ${veMuiTenSort('nhiem_vu')}
                                </th>
                                <th onclick="ham_7_12_thay_doi_sap_xep('ly_do')" style="padding: 12px 10px; color: #4a5568; cursor: pointer; font-weight: bold;" onmouseover="this.style.background='#edf2f7'" onmouseout="this.style.background='transparent'">
                                    Lý Do Gửi Thầy ${veMuiTenSort('ly_do')}
                                </th>
                                <th onclick="ham_7_12_thay_doi_sap_xep('trang_thai')" style="padding: 12px 10px; text-align: center; color: #4a5568; width: 110px; cursor: pointer; font-weight: bold;" onmouseover="this.style.background='#edf2f7'" onmouseout="this.style.background='transparent'">
                                    Trạng Thái ${veMuiTenSort('trang_thai')}
                                </th>
                                
                                <th style="padding: 12px 10px; text-align: center; color: #4a5568; width: 150px; font-weight: bold;">Thao Tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${htmlRows}
                        </tbody>
                    </table>
                </div>
            </div>
        `;

    } catch (error) {
        vungLamViec.innerHTML = `<div style="color: #dc3545; text-align: center; padding: 20px; font-weight:bold;">❌ Lỗi truy xuất hòm thư: ${error.message}</div>`;
    }
}

// =====================================================================
// HÀM BỔ TRỢ: ĐẢO CHIỀU HOẶC THAY ĐỔI CỘT SẮP XẾP KHI GIÁO VIÊN CLICK HEADER
// =====================================================================
window.ham_7_12_thay_doi_sap_xep = function (colKey) {
    if (window.DuyetDonSortState.key === colKey) {
        window.DuyetDonSortState.asc = !window.DuyetDonSortState.asc;
    } else {
        window.DuyetDonSortState.key = colKey;
        window.DuyetDonSortState.asc = true;
    }
    ham_7_12_tab_duyet_don();
}


// =====================================================================
// HÀM 7.13: XỬ LÝ LỆNH DUYỆT HOẶC TỪ CHỐI ĐƠN TỪ HỌC SINH 
// (Vá lỗi schema cache thoi_gian_ket_thuc)
// =====================================================================
window.ham_7_13_xu_ly_duyet_don = async function (idDon, uidHocSinh, maNhiemVu, loaiYeuCau, hanhDong) {

    // 1. TRƯỜNG HỢP TỪ CHỐI ĐƠN
    if (hanhDong === 'TU_CHOI') {
        Swal.fire({
            title: 'Từ chối đơn yêu cầu?',
            text: "Học sinh này sẽ không được mở khóa hoặc cấp thêm lượt làm bài.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '❌ Xác nhận Từ Chối',
            cancelButtonText: 'Hủy',
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#6c757d',
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                try {
                    const { error } = await _supabase.from('yeu_cau_hoc_sinh')
                        .update({ trang_thai: -1, uid_gv_duyet: window.GocGiaoVienState?.uid || null })
                        .eq('id', idDon);
                    if (error) throw error;
                    return true;
                } catch (e) {
                    Swal.showValidationMessage(`Lỗi hệ thống: ${e.message}`);
                    return false;
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({ icon: 'success', title: 'Đã từ chối đơn!', timer: 1200, showConfirmButton: false });
                if (typeof ham_7_12_tab_duyet_don === 'function') ham_7_12_tab_duyet_don();
            }
        });
        return;
    }

    // 2. TRƯỜNG HỢP DUYỆT ĐƠN HẾT LƯỢT 
    if (loaiYeuCau === 'HET_LUOT') {
        Swal.fire({
            title: 'Duyệt cấp thêm lượt?',
            text: "Hệ thống sẽ trừ đi 1 lượt đã làm trong hồ sơ của học sinh này (điểm và lịch sử cũ vẫn được giữ nguyên). Xác nhận cấp lượt?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: '✅ Duyệt & Cấp lượt',
            cancelButtonText: 'Hủy',
            confirmButtonColor: '#28a745',
            cancelButtonColor: '#6c757d',
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                try {
                    const tenCotLuotLam = 'tien_do_lam_bai';

                    const { data: hsInfo, error: errHS } = await _supabase
                        .from('hoc_sinh')
                        .select(tenCotLuotLam)
                        .eq('uid', uidHocSinh)
                        .single();

                    if (errHS) throw errHS;

                    let jsonLuotLam = {};
                    try {
                        jsonLuotLam = typeof hsInfo[tenCotLuotLam] === 'string'
                            ? JSON.parse(hsInfo[tenCotLuotLam])
                            : (hsInfo[tenCotLuotLam] || {});
                    } catch (e) { }

                    if (jsonLuotLam[maNhiemVu] && jsonLuotLam[maNhiemVu] > 0) {
                        jsonLuotLam[maNhiemVu] = jsonLuotLam[maNhiemVu] - 1;
                    }

                    const { error: errUpdateHS } = await _supabase
                        .from('hoc_sinh')
                        .update({ [tenCotLuotLam]: jsonLuotLam })
                        .eq('uid', uidHocSinh);

                    if (errUpdateHS) throw errUpdateHS;

                    const { error: errUpdateDon } = await _supabase
                        .from('yeu_cau_hoc_sinh')
                        .update({
                            trang_thai: 1,
                            uid_gv_duyet: window.GocGiaoVienState?.uid || null
                        })
                        .eq('id', idDon);

                    if (errUpdateDon) throw errUpdateDon;
                    return true;

                } catch (e) {
                    Swal.showValidationMessage(`Lỗi xử lý cấp lượt: ${e.message}`);
                    return false;
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({ icon: 'success', title: 'Đã cấp thêm 1 lượt!', timer: 1200, showConfirmButton: false });
                if (typeof ham_7_12_tab_duyet_don === 'function') ham_7_12_tab_duyet_don();
            }
        });
    }

    // 3. TRƯỜNG HỢP DUYỆT ĐƠN QUÁ HẠN (Dời hạn chót của Nhiệm vụ)
    else if (loaiYeuCau === 'QUA_HAN') {
        Swal.fire({
            title: 'Duyệt dời hạn chót?',
            html: "Hệ thống sẽ dời thời gian đóng đề sang <b>23:59 ngày mai</b>. Xác nhận gia hạn?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: '✅ Duyệt & Gia hạn',
            cancelButtonText: 'Hủy',
            confirmButtonColor: '#28a745',
            cancelButtonColor: '#6c757d',
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                try {
                    let ngayMai = new Date();
                    ngayMai.setDate(ngayMai.getDate() + 1);
                    ngayMai.setHours(23, 59, 59, 999);

                    let offset = ngayMai.getTimezoneOffset() * 60000;
                    let thoiGianMoiISO = (new Date(ngayMai - offset)).toISOString().slice(0, 19);

                    // A. Cập nhật dời hạn trong bảng Nhiệm Vụ (Chính xác)
                    const { error: errNhiemVu } = await _supabase
                        .from('nhiem_vu')
                        .update({ thoi_gian_dong: thoiGianMoiISO })
                        .eq('ma_nhiem_vu', maNhiemVu);
                    if (errNhiemVu) throw errNhiemVu;

                    // B. Chốt trạng thái bảng Yêu Cầu thành Đã Duyệt 
                    // (Đã xóa dòng thoi_gian_ket_thuc gây lỗi)
                    const { error: errUpdate } = await _supabase
                        .from('yeu_cau_hoc_sinh')
                        .update({
                            trang_thai: 1,
                            uid_gv_duyet: window.GocGiaoVienState?.uid || null
                        })
                        .eq('id', idDon);

                    if (errUpdate) throw errUpdate;
                    return true;
                } catch (e) {
                    Swal.showValidationMessage(`Lỗi gia hạn đề: ${e.message}`);
                    return false;
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({ icon: 'success', title: 'Đã gia hạn thành công!', timer: 1500, showConfirmButton: false });
                if (typeof ham_7_12_tab_duyet_don === 'function') ham_7_12_tab_duyet_don();
            }
        });
    }
};



// =====================================================================
// HÀM 7.15: KÍCH HOẠT BẢNG THỐNG KÊ CHI TIẾT CỦA MỘT NHIỆM VỤ THI
// =====================================================================
window.ham_7_15_thong_ke_nhiem_vu = async function (maNhiemVu, tenNhiemVu) {
    // 1. Hiện popup loading để quét dữ liệu đa bảng từ Supabase
    Swal.fire({
        title: '📊 Đang tổng hợp dữ liệu...',
        text: 'Hệ thống đang đồng bộ danh sách lớp và két sắt điểm số...',
        allowOutsideClick: false,
        didOpen: () => { Swal.showLoading(); }
    });

    try {
        // BƯỚC A: Lấy thông tin lớp học được giao của Nhiệm vụ này
        const { data: nv, error: errNV } = await _supabase
            .from('nhiem_vu')
            .select('danh_sach_lop')
            .eq('ma_nhiem_vu', maNhiemVu)
            .single();

        if (errNV || !nv) throw new Error("Không tìm thấy thông tin cấu trúc nhiệm vụ.");

        let mangMaLop = [];
        try {
            mangMaLop = typeof nv.danh_sach_lop === 'string' ? JSON.parse(nv.danh_sach_lop) : (nv.danh_sach_lop || []);
        } catch (e) { mangMaLop = []; }

        // BƯỚC B: Tải toàn bộ danh sách học sinh thuộc các lớp được giao bài tập này
        let dsHocSinhLop = [];
        if (mangMaLop.length > 0) {
            const { data: dataHS, error: errHS } = await _supabase
                .from('hoc_sinh')
                .select('uid, ten, sdt, danh_sach_ma_lop'); // Bốc học sinh để so khớp lớp công bằng

            if (errHS) throw errHS;

            // Lọc những em học sinh thực sự nằm trong danh sách mã lớp của nhiệm vụ
            dsHocSinhLop = (dataHS || []).filter(hs => {
                let lopCuaEm = [];
                try {
                    lopCuaEm = typeof hs.danh_sach_ma_lop === 'string' ? JSON.parse(hs.danh_sach_ma_lop) : (hs.danh_sach_ma_lop || []);
                } catch (e) { }
                return lopCuaEm.some(m => mangMaLop.includes(m));
            });
        }

        // BƯỚC C: Tải kết quả thi LẦN CUỐI CÙNG của các học sinh này trong nhiệm vụ này
        // Tận dụng logic sắp xếp để lấy bài nộp mới nhất của từng em học sinh
        const { data: dsKQ, error: errKQ } = await _supabase
            .from('ket_qua_thi')
            .select('id, uid_hoc_sinh, ten_hoc_sinh, tong_diem, thoi_gian_nop, mang_cau_tra_loi')
            .eq('ma_nhiem_vu', maNhivi || maNhiemVu)
            .order('thoi_gian_nop', { ascending: false });

        if (errKQ) throw errKQ;

        // Lọc trùng: Một học sinh làm nhiều lần thì chỉ giữ lại kết quả mới nhất
        let tuDienKQCuoi = {};
        if (dsKQ) {
            dsKQ.forEach(kq => {
                if (!tuDienKQCuoi[kq.uid_hoc_sinh]) {
                    tuDienKQCuoi[kq.uid_hoc_sinh] = kq;
                }
            });
        }

        // BƯỚC D: PHÂN LOẠI HỌC SINH (ĐÃ LÀM VÀ CHƯA LÀM)
        let mangDaLam = [];
        let mangChưaLam = [];
        let tongDiemLop = 0;

        dsHocSinhLop.forEach(hs => {
            const baiLamCuoi = tuDienKQCuoi[hs.uid];
            if (baiLamCuoi) {
                mangDaLam.push({
                    idKQ: baiLamCuoi.id,
                    uid: hs.uid,
                    ten: hs.ten || baiLamCuoi.ten_hoc_sinh,
                    sdt: hs.sdt || 'N/A',
                    diem: baiLamCuoi.tong_diem,
                    ngayNop: baiLamCuoi.thoi_gian_nop,
                    chiTietCau: baiLamCuoi.mang_cau_tra_loi // Mảng lưu đáp án đúng/sai của câu hỏi
                });
                tongDiemLop += Number(baiLamCuoi.tong_diem) || 0;
            } else {
                mangChưaLam.push({
                    uid: hs.uid,
                    ten: hs.ten,
                    sdt: hs.sdt || 'N/A'
                });
            }
        });

        // Tính toán các chỉ số thống kê tổng quan
        const tongSoHS = dsHocSinhLop.length;
        const soLgDaLam = mangDaLam.length;
        const soLgChuaLam = mangChưaLam.length;
        const diemTrungBinh = soLgDaLam > 0 ? (tongDiemLop / soLgDaLam).toFixed(2) : "0.00";

        // Ghi dữ liệu vào bộ nhớ tạm window để các popup con bốc ra xài không cần nạp lại API
        window.DataThongKeHienTai = { mangDaLam, mangChưaLam, tenNhiemVu };

        // BƯỚC E: HIỂN THỊ POPUP TỔNG QUAN (TẦNG 1)
        Swal.fire({
            title: `📊 THỐNG KÊ: ${tenNhiemVu}`,
            html: `
                <div style="text-align: left; background: #fff; border-radius: 8px; font-size: 14px; color: #2c3e50; line-height: 1.6;">
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px;">
                        <div style="background: #e3f2fd; padding: 12px; border-radius: 8px; border-left: 4px solid #1e88e5; text-align: center;">
                            <span style="font-size: 11px; color: #546e7a; font-weight: bold; text-transform: uppercase;">Sĩ số giao bài</span>
                            <div style="font-size: 24px; font-weight: 900; color: #1565c0;">${tongSoHS} <span style="font-size: 12px; font-weight: normal; color: #666;">em</span></div>
                        </div>
                        <div style="background: #e8f5e9; padding: 12px; border-radius: 8px; border-left: 4px solid #43a047; text-align: center;">
                            <span style="font-size: 11px; color: #546e7a; font-weight: bold; text-transform: uppercase;">Điểm trung bình</span>
                            <div style="font-size: 24px; font-weight: 900; color: #2e7d32;">${diemTrungBinh} <span style="font-size: 12px; font-weight: normal; color: #666;">đ</span></div>
                        </div>
                    </div>

                    <div style="display: flex; flex-direction: column; gap: 10px;">
                        <button onclick="ham_7_15_sub_danh_sach_da_lam()" style="width: 100%; padding: 14px; background: #28a745; color: white; border: none; border-radius: 8px; font-weight: bold; font-size: 14px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 4px rgba(40,167,69,0.2);">
                            <span>🟢 Danh sách Học sinh ĐỒ NỘP BÀI</span>
                            <b style="background: rgba(255,255,255,0.2); padding: 2px 10px; border-radius: 12px;">${soLgDaLam} em</b>
                        </button>
                        
                        <button onclick="ham_7_15_sub_danh_sach_chua_lam()" style="width: 100%; padding: 14px; background: #dc3545; color: white; border: none; border-radius: 8px; font-weight: bold; font-size: 14px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 4px rgba(220,53,69,0.2);">
                            <span>🔴 Danh sách Học sinh CHƯA LÀM BÀI</span>
                            <b style="background: rgba(255,255,255,0.2); padding: 2px 10px; border-radius: 12px;">${soLgChuaLam} em</b>
                        </button>
                    </div>
                </div>
            `,
            showConfirmButton: true,
            confirmButtonText: 'Đóng thống kê',
            confirmButtonColor: '#6c757d',
            width: '450px'
        });

    } catch (err) {
        console.error("LỖI THỐNG KÊ:", err);
        Swal.fire({ icon: 'error', title: 'Không thể xuất thống kê', text: err.message });
    }
};

// =====================================================================
// HÀM SUB 1: HIỂN THỊ DANH SÁCH CHI TIẾT HỌC SINH ĐÃ LÀM BÀI (TẦNG 2)
// =====================================================================
window.ham_7_15_sub_danh_sach_da_lam = function () {
    const { mangDaLam, tenNhiemVu } = window.DataThongKeHienTai;
    const opts = { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' };

    let htmlBaoCaoTable = '';
    if (mangDaLam.length === 0) {
        htmlBaoCaoTable = `<tr><td colspan="4" style="text-align:center; color:#999; padding: 20px;">Chưa có học sinh nào nộp bài.</td></tr>`;
    } else {
        mangDaLam.forEach((hs, index) => {
            const gioNop = new Date(hs.ngayNop).toLocaleString('vi-VN', opts);
            htmlBaoCaoTable += `
                <tr style="border-bottom: 1px solid #e2e8f0;">
                    <td style="padding: 10px 6px; text-align: center; font-weight: bold; color: #718096;">${index + 1}</td>
                    <td style="padding: 10px 6px; text-align: left;">
                        <b style="color:#2b6cb0; font-size:14px;">${hs.ten}</b>
                        <div style="font-size:11px; color:#718096; margin-top:2px;">SĐT: ${hs.sdt}</div>
                    </td>
                    <td style="padding: 10px 6px; text-align: center;">
                        <span style="font-size: 16px; font-weight: 900; color: #e53e3e;">${hs.diem}</span>
                        <div style="font-size:10px; color:#a0aec0; margin-top:2px;">${gioNop}</div>
                    </td>
                    <td style="padding: 10px 6px; text-align: center;">
                        <button onclick="ham_7_15_sub_soi_bai_lam(${index})" style="padding: 6px 10px; background: #3182ce; color: white; border: none; border-radius: 4px; font-weight: bold; font-size: 11px; cursor: pointer; transition: 0.2s;">
                            👁️ SOI BÀI
                        </button>
                    </td>
                </tr>
            `;
        });
    }

    Swal.fire({
        title: `🟢 DANH SÁCH ĐÃ NỘP BÀI`,
        html: `
            <div style="max-height: 400px; overflow-y: auto; background: white; text-align: left;">
                <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                    <thead style="background: #f7fafc; position: sticky; top: 0; border-bottom: 2px solid #cbd5e0;">
                        <tr>
                            <th style="padding: 8px 6px; text-align: center; color: #4a5568; width: 35px;">STT</th>
                            <th style="padding: 8px 6px; color: #4a5568; text-align: left;">Học sinh</th>
                            <th style="padding: 8px 6px; text-align: center; color: #4a5568; width: 100px;">Điểm Số</th>
                            <th style="padding: 8px 6px; text-align: center; color: #4a5568; width: 75px;">Bài làm</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${htmlBaoCaoTable}
                    </tbody>
                </table>
            </div>
        `,
        showCancelButton: true,
        confirmButtonText: '⬅️ Quay lại tổng quan',
        cancelButtonText: 'Đóng hẳn',
        confirmButtonColor: '#3182ce',
        cancelButtonColor: '#718096',
        width: '500px'
    }).then((result) => {
        // Nếu chọn quay lại -> Gọi ngược hàm mẹ để hiển thị lại Tầng 1
        if (result.isConfirmed) ham_7_15_thong_ke_nhiem_vu(null, tenNhiemVu);
    });
};

// =====================================================================
// HÀM SUB 2: HIỂN THỊ DANH SÁCH HỌC SINH CHƯA NỘP BÀI (TẦNG 2)
// =====================================================================
window.ham_7_15_sub_danh_sach_chua_lam = function () {
    const { mangChưaLam, tenNhiemVu } = window.DataThongKeHienTai;

    let htmlChuaLamTable = '';
    if (mangChưaLam.length === 0) {
        htmlChuaLamTable = `<tr><td colspan="3" style="text-align:center; color:#2d3748; padding: 20px; font-weight:bold; background:#f0fff4;">🎉 Lớp học tuyệt vời! 100% học sinh đã hoàn thành bài!</td></tr>`;
    } else {
        mangChưaLam.forEach((hs, index) => {
            htmlChuaLamTable += `
                <tr style="border-bottom: 1px solid #edf2f7;">
                    <td style="padding: 10px 8px; text-align: center; font-weight: bold; color: #718096;">${index + 1}</td>
                    <td style="padding: 10px 8px; font-weight: bold; color: #4a5568;">${hs.ten}</td>
                    <td style="padding: 10px 8px; text-align: center; color: #e53e3e; font-weight: bold;">${hs.sdt}</td>
                </tr>
            `;
        });
    }

    Swal.fire({
        title: `🔴 DANH SÁCH CHƯA NỘP BÀI`,
        html: `
            <div style="max-height: 400px; overflow-y: auto; background: white;">
                <table style="width: 100%; border-collapse: collapse; font-size: 13px; text-align: left;">
                    <thead style="background: #fff5f5; position: sticky; top: 0; border-bottom: 2px solid #fed7d7;">
                        <tr>
                            <th style="padding: 8px 8px; text-align: center; color: #9b2c2c; width: 40px;">STT</th>
                            <th style="padding: 8px 8px; color: #9b2c2c;">Tên học sinh</th>
                            <th style="padding: 8px 8px; text-align: center; color: #9b2c2c; width: 130px;">Số điện thoại</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${htmlChuaLamTable}
                    </tbody>
                </table>
            </div>
        `,
        showCancelButton: true,
        confirmButtonText: '⬅️ Quay lại tổng quan',
        cancelButtonText: 'Đóng hẳn',
        confirmButtonColor: '#e53e3e',
        cancelButtonColor: '#718096',
        width: '450px'
    }).then((result) => {
        if (result.isConfirmed) ham_7_15_thong_ke_nhiem_vu(null, tenNhiemVu);
    });
};

// =====================================================================
// HÀM SUB 3: SOI MA TRẬN ĐÚNG/SAI CỦA TỪNG HỌC SINH CỤ THỂ (TẦNG 3)
// =====================================================================
window.ham_7_15_sub_soi_bai_lam = function (indexHọcSinhMảng) {
    const { mangDaLam } = window.DataThongKeHienTai;
    const hs = mangDaLam[indexHọcSinhMảng];

    let mangCauTraLoi = [];
    try {
        mangCauTraLoi = typeof hs.chiTietCau === 'string' ? JSON.parse(hs.chiTietCau) : (hs.chiTietCau || []);
    } catch (e) { }

    let htmlMaTranGrid = '';
    let soCauDung = 0;

    if (mangCauTraLoi.length === 0) {
        htmlMaTranGrid = `<p style="grid-column: span 5; text-align:center; color:#718096; padding:15px;">Hệ thống không tìm thấy log lịch sử tích đáp án của lượt thi này.</p>`;
    } else {
        mangCauTraLoi.forEach((cau, idx) => {
            // Kiểm tra trạng thái đáp án: True/1 là Đúng, False/0 là Sai
            const laCauDung = (cau.is_dung === true || cau.is_dung === 1 || cau.kq === true);

            let bgHộp = "#fff5f5";
            let borderHộp = "#feb2b2";
            let chuHộp = "#c53030";
            let iconKq = "❌";

            if (laCauDung) {
                soCauDung++;
                bgHộp = "#f0fff4";
                borderHộp = "#9ae6b4";
                chuHộp = "#22543d";
                iconKq = "🟢";
            }

            htmlMaTranGrid += `
                <div style="background: ${bgHộp}; border: 1px solid ${borderHộp}; border-radius: 6px; padding: 10px 5px; text-align: center; color: ${chuHộp}; font-family: sans-serif;">
                    <div style="font-size: 11px; font-weight: bold; text-transform: uppercase; color:#718096;">Câu ${idx + 1}</div>
                    <div style="font-size: 16px; font-weight: 900; margin: 4px 0;">${iconKq}</div>
                    <div style="font-size: 10px; color: #4a5568; font-weight:bold;">ĐA: <span style="background:white; padding:1px 3px; border-radius:2px; border:1px solid #cbd5e0;">${cau.da_chon || '-'}</span></div>
                </div>
            `;
        });
    }

    // Tính tỷ lệ phần trăm chính xác
    const tongSoCau = mangCauTraLoi.length;
    const tyLeDung = tongSoCau > 0 ? ((soCauDung / tongSoCau) * 100).toFixed(0) : 0;

    Swal.fire({
        title: `👀 BÀI LÀM: ${hs.ten.toUpperCase()}`,
        html: `
            <div style="text-align: left; background: white;">
                
                <div style="background: #ebf8ff; border: 1px solid #bee3f8; padding: 10px 15px; border-radius: 8px; font-size: 13px; color: #2b6cb0; margin-bottom: 15px; display:flex; justify-content:space-between; font-weight:bold;">
                    <span>🎯 Đúng: ${soCauDung} / ${tongSoCau} câu</span>
                    <span>📈 Tỷ lệ chính xác: ${tyLeDung}%</span>
                </div>

                <div style="font-size: 12px; color: #4a5568; font-weight: bold; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">🧩 Ma trận kết quả chi tiết từng câu:</div>
                
                <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; max-height: 280px; overflow-y: auto; padding: 4px;">
                    ${htmlMaTranGrid}
                </div>
            </div>
        `,
        showCancelButton: false,
        confirmButtonText: '⬅️ Quay lại danh sách lớp',
        confirmButtonColor: '#4a5568',
        width: '450px'
    }).then((result) => {
        // Bấm quay lại thì dắt Giáo viên quay về màn hình Tầng 2 danh sách đã làm
        if (result.isConfirmed) ham_7_15_sub_danh_sach_da_lam();
    });
};



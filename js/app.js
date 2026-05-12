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

            <input type="email" id="txtRealEmail" placeholder="Email nhận kết quả bài thi";">

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
    console.log("Đang vào hàm ham_2_1");
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

        // Gọi lại hàm kiểm tra vai trò để hiện đúng các trường phụ thuộc
        ham_2_2_thay_doi_vai_tro(AppState.role);
    }
}

// Hàm 2.2: Xử lý thay đổi giao diện khi chọn Radio Vai trò (Học sinh / Giáo viên)
function ham_2_2_thay_doi_vai_tro(vaiTroMoi) {
    console.log("Đang vào hàm ham_2_2");
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
    console.log("Đang vào hàm ham_2_3");
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
                alert("Chào học sinh! Hệ thống đang chuyển vào phòng thi.");
                // Sau này sẽ gọi hàm: ham_3_2_ve_dashboard_hocsinh();
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
    console.log("Đang vào hàm ham_2_5");
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
                <button style="padding: 15px 25px; background: #ffc107; color: #000; border: none; border-radius: 8px; cursor: pointer; font-size: 15px; font-weight: bold; box-shadow: 0 2px 5px rgba(255,193,7,0.3);">
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

// Hàm 4.3: Lưu lớp mới kèm theo trạng thái và danh sách học sinh
async function ham_4_3_luu_lop_moi(btnElement, maLop) {
    const tenLop = document.getElementById('txtTenLop').value.trim();

    // ĐỌC TRẠNG THÁI TỪ COMBOBOX (Chuyển sang số Integer)
    const trangThai = parseInt(document.getElementById('selTrangThaiLopMoi').value);

    if (!tenLop) return alert("Thầy chưa nhập Tên lớp học!");

    // Thu thập danh sách UID học sinh được check
    const dsCheckbox = document.querySelectorAll('.chk-hs-vao-lop:checked');
    const mangUidHocSinh = Array.from(dsCheckbox).map(chk => chk.value);

    btnElement.disabled = true;
    btnElement.innerText = "ĐANG LƯU...";

    try {
        const { error } = await _supabase.from('lop_hoc').insert([{
            ma_lop: maLop,
            ten_lop: tenLop,
            uid_gv_tao: AppState.user.uid,
            trang_thai: trangThai,         // NẠP TRẠNG THÁI 0/1 VÀO ĐÂY
            hoc_sinh_ids: mangUidHocSinh,
            ngay_tao: new Date().toISOString()
        }]);

        if (error) {
            if (error.code === '23505') throw new Error("Mã lớp bị trùng, vui lòng thử lại.");
            throw error;
        }

        alert(`Khởi tạo lớp ${maLop} thành công!`);
        ham_4_4_tai_danh_sach_lop(); // Quay lại bảng danh sách lớp

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
async function ham_4_4_tai_danh_sach_lop() {
    try {
        const { data: dsLop, error } = await _supabase.from('lop_hoc').select('*');
        if (error) throw error;

        // BƯỚC MỚI: Tra cứu tên Giáo viên tạo từ bảng hoc_sinh
        const danhSachUidGv = [...new Set((dsLop || []).map(l => l.uid_gv_tao).filter(id => id))];
        let tuDienTenGv = {};

        if (danhSachUidGv.length > 0) {
            const { data: dsGv } = await _supabase.from('hoc_sinh').select('uid, ten').in('uid', danhSachUidGv);
            if (dsGv) {
                dsGv.forEach(gv => tuDienTenGv[gv.uid] = gv.ten);
            }
        }

        // Gắn tên giáo viên vào dữ liệu lớp để dùng ở các hàm sau
        BangLopState.duLieu = (dsLop || []).map(lop => ({
            ...lop,
            ten_gv_tao: tuDienTenGv[lop.uid_gv_tao] || 'Hệ thống'
        }));

        ham_4_10_ve_bang_du_lieu();

    } catch (error) {
        document.getElementById('danh-sach-lop-render').innerHTML = `<p style="color: red;">Lỗi: ${error.message}</p>`;
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



// Hàm 4.13: Lưu cập nhật toàn diện lớp học
async function ham_4_13_luu_cap_nhat_lop(maLop, btn) {
    const tenMoi = document.getElementById('txtTenLopSua').value.trim();
    const trangThaiMoi = parseInt(document.getElementById('selTrangThaiLopSua').value);

    // Lấy danh sách UID học sinh mới sau khi thầy tích/bỏ tích
    const nodes = document.querySelectorAll('.chk-hs-sua-lop:checked');
    const mangUidMoi = Array.from(nodes).map(node => node.value);

    if (!tenMoi) return alert("Thầy vui lòng không để trống Tên lớp!");

    btn.disabled = true;
    btn.innerText = "ĐANG CẬP NHẬT...";

    try {
        const { error } = await _supabase
            .from('lop_hoc')
            .update({
                ten_lop: tenMoi,
                trang_thai: trangThaiMoi,
                hoc_sinh_ids: mangUidMoi
            })
            .eq('ma_lop', maLop);

        if (error) throw error;

        alert(`Đã cập nhật thành công lớp ${maLop}!`);
        ham_4_4_tai_danh_sach_lop(); // Tải lại bảng lớp

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
                        <th style="padding: 10px; border: 1px solid #eee;" onclick="ham_5_11_thay_doi_sort('ten')">Họ và Tên ${cot === 'ten' ? iconSort : '↕'}</th>
                        <th style="padding: 10px; border: 1px solid #eee;" onclick="ham_5_11_thay_doi_sort('sdt')">SĐT ${cot === 'sdt' ? iconSort : '↕'}</th>
                        <th style="padding: 10px; border: 1px solid #eee;">Mật khẩu</th>
                        <th style="padding: 10px; border: 1px solid #eee;">Trường</th>
                        <th style="padding: 10px; border: 1px solid #eee;">Tỉnh</th>
                        <th style="padding: 10px; border: 1px solid #eee;">Khối</th>
                        <th style="padding: 10px; border: 1px solid #eee;">Mã lớp tham gia</th>
                        <th style="padding: 10px; border: 1px solid #eee;" onclick="ham_5_11_thay_doi_sort('diem_tich_luy')">Điểm TL ${cot === 'diem_tich_luy' ? iconSort : '↕'}</th>
                        <th style="padding: 10px; border: 1px solid #eee;">Trạng thái</th>
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
                <td style="padding: 10px; border: 1px solid #eee; font-weight: bold; color: #1a73e8;">${hs.ten}</td>
                <td style="padding: 10px; border: 1px solid #eee; font-weight: bold;">${hs.sdt}</td>
                <td style="padding: 10px; border: 1px solid #eee; color: #666;">${hs.mat_khau}</td>
                <td style="padding: 10px; border: 1px solid #eee;">${hs.truong || '-'}</td>
                <td style="padding: 10px; border: 1px solid #eee;">${hs.tinh || '-'}</td>
                <td style="padding: 10px; border: 1px solid #eee; text-align: center;">${hs.khoi_lop || '-'}</td>
                <td style="padding: 10px; border: 1px solid #eee; color: #d35400; font-weight: bold;">${maLop}</td>
                <td style="padding: 10px; border: 1px solid #eee; text-align: center; font-weight: bold; color: #e67e22;">${hs.diem_tich_luy || 0}</td>
                <td style="padding: 10px; border: 1px solid #eee; text-align: center; color: ${mauTrangThai}; font-weight: bold;">${chuTrangThai}</td>
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
    const hanhDong = trangThaiMoi === 0 ? "KHÓA" : "MỞ KHÓA";
    if (!confirm(`Thầy có chắc chắn muốn ${hanhDong} tài khoản của học sinh: ${tenHS}?`)) return;

    document.getElementById('danh-sach-hs-render').innerHTML = `<p style="text-align: center; color: #f39c12;">Đang xử lý...</p>`;

    try {
        const { error } = await _supabase
            .from('hoc_sinh')
            .update({ trang_thai: trangThaiMoi })
            .eq('uid', uid);

        if (error) throw error;

        // Tải lại bảng sau khi cập nhật thành công
        ham_5_2_tai_danh_sach_hoc_sinh();

    } catch (error) {
        alert(`Lỗi khi ${hanhDong}: ` + error.message);
        ham_5_10_ve_bang_hoc_sinh(); // Lỗi thì vẽ lại bảng như cũ
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
// Hàm 6.6: Vẽ Form (Hỗ trợ 2 chế độ: XEM và SỬA)
// ==============================================================
function ham_6_6_mo_form_sua_hoc_lieu(maHocLieu, choPhepSua = true) {
    const data = BangHocLieuState.duLieu.find(hl => hl.ma_hoc_lieu === maHocLieu);
    if (!data) return alert("Dữ liệu không tồn tại!");

    // Cài đặt giao diện tùy theo chế độ
    const tieuDe = choPhepSua ? "✏️ CHỈNH SỬA HỌC LIỆU" : "👁️ XEM CHI TIẾT HỌC LIỆU";
    const mauTieuDe = choPhepSua ? "#f39c12" : "#1a73e8";
    const disabledAttr = choPhepSua ? "" : "disabled"; // Khóa input/select
    const hienThiCotXoa = choPhepSua ? "" : "display: none;"; // Ẩn cột thao tác xóa câu

    const dsCauHoi = data.danh_sach_cau_hoi || [];
    let htmlRows = '';

    dsCauHoi.forEach((item, index) => {
        const parts = item.split('|');
        let maGoc, maAoDe, maAoGiai, dapAn;

        if (parts.length >= 4) {
            [maGoc, maAoDe, maAoGiai, dapAn] = parts;
        } else {
            maGoc = "N/A";
            [maAoDe, maAoGiai, dapAn] = parts;
        }

        htmlRows += `
            <tr class="row-cau-hoi" data-original-string="${item}" style="border-bottom: 1px solid #eee;">
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

    // Xử lý nút bấm phía dưới (Nếu xem thì chỉ có nút Đóng)
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

// Hàm 7.2: Tải dữ liệu từ bảng nhiem_vu
async function ham_7_2_tai_danh_sach_nhiem_vu() {
    const renderArea = document.getElementById('danh-sach-nv-render');
    try {
        const { data: dsNhiemVu, error } = await _supabase.from('nhiem_vu').select('*').order('ngay_tao', { ascending: false });
        if (error) throw error;

        // Bổ sung lấy tên GV tương tự khối 6
        const danhSachUidGv = [...new Set((dsNhiemVu || []).map(nv => nv.uid_gv_tao).filter(id => id))];
        let tuDienTenGv = {};
        if (danhSachUidGv.length > 0) {
            const { data: dsGv } = await _supabase.from('hoc_sinh').select('uid, ten').in('uid', danhSachUidGv);
            if (dsGv) dsGv.forEach(gv => tuDienTenGv[gv.uid] = gv.ten);
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

// Hàm 7.10: Vẽ Bảng Danh Sách Nhiệm Vụ
function ham_7_10_ve_bang_nhiem_vu() {
    const renderArea = document.getElementById('danh-sach-nv-render');
    let dsNV = [...BangNhiemVuState.duLieu];

    if (dsNV.length === 0) {
        renderArea.innerHTML = `<p style="text-align: center; padding: 20px; background: white; border-radius: 8px;">Chưa có nhiệm vụ nào được giao.</p>`;
        return;
    }

    let htmlTable = `
        <div style="overflow-x: auto; border: 1px solid #dee2e6; border-radius: 8px;">
            <table style="width: 100%; min-width: 1200px; border-collapse: collapse; background: white; font-size: 13px;">
                <thead style="background: #f8f9fa; border-bottom: 2px solid #dee2e6;">
                    <tr>
                        <th style="padding: 10px; border: 1px solid #eee; width: 40px;">STT</th>
                        <th style="padding: 10px; border: 1px solid #eee; width: 100px;">Thao tác</th>
                        <th style="padding: 10px; border: 1px solid #eee;">Mã NV</th>
                        <th style="padding: 10px; border: 1px solid #eee;">Tên Nhiệm Vụ</th>
                        <th style="padding: 10px; border: 1px solid #eee;">Mã Học Liệu Gốc</th>
                        <th style="padding: 10px; border: 1px solid #eee;">Lớp Giao</th>
                        <th style="padding: 10px; border: 1px solid #eee;">Thời Gian Mở</th>
                        <th style="padding: 10px; border: 1px solid #eee;">Thời Gian Đóng</th>
                        <th style="padding: 10px; border: 1px solid #eee;">Đảo Câu</th>
                        <th style="padding: 10px; border: 1px solid #eee;">Tình Trạng</th>
                    </tr>
                </thead>
                <tbody>
    `;

    const now = new Date();

    dsNV.forEach((nv, index) => {
        const timeMo = nv.thoi_gian_mo ? new Date(nv.thoi_gian_mo) : null;
        const timeDong = nv.thoi_gian_dong ? new Date(nv.thoi_gian_dong) : null;

        // Tính toán tình trạng thực tế dựa vào thời gian
        let textTinhTrang = "";
        if (!timeMo || !timeDong) {
            textTinhTrang = `<span style="color: #666; font-weight:bold;">Không giới hạn</span>`;
        } else if (now < timeMo) {
            textTinhTrang = `<span style="color: #f39c12; font-weight:bold;">Chưa bắt đầu</span>`;
        } else if (now >= timeMo && now <= timeDong) {
            textTinhTrang = `<span style="color: #28a745; font-weight:bold;">Đang diễn ra</span>`;
        } else {
            textTinhTrang = `<span style="color: #dc3545; font-weight:bold;">Đã kết thúc</span>`;
        }

        const daoCauText = nv.dao_cau_hoi ? "✅ Có" : "❌ Không";

        htmlTable += `
            <tr onclick="ham_7_6_mo_form_nhiem_vu('${nv.ma_nhiem_vu}', false)" 
                style="border-bottom: 1px solid #eee; cursor: pointer; transition: 0.2s;"
                onmouseover="this.style.background='#f8f0ff'" onmouseout="this.style.background='white'">
                
                <td style="padding: 10px; border: 1px solid #eee; text-align: center; font-weight: bold;">${index + 1}</td>
                <td style="padding: 10px; border: 1px solid #eee; text-align: center; white-space: nowrap;">
                    <button onclick="event.stopPropagation(); ham_7_6_mo_form_nhiem_vu('${nv.ma_nhiem_vu}', true)" style="padding: 4px 8px; background: #f39c12; color: white; border: none; border-radius: 4px; cursor: pointer;">Sửa</button>
                    <button onclick="event.stopPropagation(); ham_7_8_xoa_nhiem_vu('${nv.ma_nhiem_vu}')" style="padding: 4px 8px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer;">Xóa</button>
                </td>
                <td style="padding: 10px; border: 1px solid #eee; font-weight: bold; color: #6f42c1;">${nv.ma_nhiem_vu}</td>
                <td style="padding: 10px; border: 1px solid #eee; font-weight: bold;">${nv.ten_nhiem_vu}</td>
                <td style="padding: 10px; border: 1px solid #eee; color: #d35400; font-family: monospace;">${nv.ma_hoc_lieu}</td>
                <td style="padding: 10px; border: 1px solid #eee; text-align: center; font-weight: bold;">${nv.lop_giao}</td>
                <td style="padding: 10px; border: 1px solid #eee; text-align: center; font-size: 12px;">${timeMo ? timeMo.toLocaleString('vi-VN') : '-'}</td>
                <td style="padding: 10px; border: 1px solid #eee; text-align: center; font-size: 12px;">${timeDong ? timeDong.toLocaleString('vi-VN') : '-'}</td>
                <td style="padding: 10px; border: 1px solid #eee; text-align: center;">${daoCauText}</td>
                <td style="padding: 10px; border: 1px solid #eee; text-align: center;">${textTinhTrang}</td>
            </tr>
        `;
    });

    htmlTable += `</tbody></table></div>`;
    renderArea.innerHTML = htmlTable;
}

// Hàm 7.6: Mở form Xem / Sửa Nhiệm Vụ
function ham_7_6_mo_form_nhiem_vu(maNhiemVu, choPhepSua = true) {
    const data = BangNhiemVuState.duLieu.find(nv => nv.ma_nhiem_vu === maNhiemVu);
    if (!data) return alert("Dữ liệu nhiệm vụ không tồn tại!");

    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
    const tieuDe = choPhepSua ? "✏️ CHỈNH SỬA NHIỆM VỤ" : "👁️ XEM CHI TIẾT NHIỆM VỤ";
    const disabledAttr = choPhepSua ? "" : "disabled";

    // Format thời gian cho thẻ <input type="datetime-local">
    const formatDateTimeLocal = (isoString) => {
        if (!isoString) return "";
        const d = new Date(isoString);
        return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    };

    let htmlNutBam = choPhepSua
        ? `<button onclick="ham_7_7_luu_cap_nhat_nhiem_vu('${data.ma_nhiem_vu}', this)" style="flex: 2; padding: 15px; background: #6f42c1; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">💾 LƯU THAY ĐỔI NHIỆM VỤ</button>
           <button onclick="ham_7_1_ve_quan_ly_nhiem_vu()" style="flex: 1; padding: 15px; background: #6c757d; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">HỦY QUAY LẠI</button>`
        : `<button onclick="ham_7_1_ve_quan_ly_nhiem_vu()" style="width: 100%; padding: 15px; background: #6c757d; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">⬅️ TRỞ VỀ DANH SÁCH</button>`;

    vungLamViec.innerHTML = `
        <div style="max-width: 800px; background: #ffffff; padding: 25px; border-radius: 12px; margin: 0 auto; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
            <h3 style="color: #6f42c1; border-bottom: 2px solid #eee; padding-bottom: 10px;">${tieuDe}: ${data.ma_nhiem_vu}</h3>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
                <div style="grid-column: span 2;">
                    <label style="font-weight: bold;">Tên Nhiệm Vụ:</label>
                    <input type="text" id="nv_ten" value="${data.ten_nhiem_vu}" ${disabledAttr} style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; margin-top: 5px;">
                </div>
                
                <div>
                    <label style="font-weight: bold;">Học Liệu Gốc (Không được sửa):</label>
                    <input type="text" value="${data.ma_hoc_lieu}" disabled style="width: 100%; padding: 10px; background: #f8f9fa; border: 1px solid #ddd; border-radius: 6px; margin-top: 5px; color: #d35400; font-weight:bold;">
                </div>
                
                <div>
                    <label style="font-weight: bold;">Giao cho Lớp/Nhóm:</label>
                    <input type="text" id="nv_lop" value="${data.lop_giao}" ${disabledAttr} style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; margin-top: 5px;">
                </div>

                <div>
                    <label style="font-weight: bold;">Thời Gian Mở:</label>
                    <input type="datetime-local" id="nv_mo" value="${formatDateTimeLocal(data.thoi_gian_mo)}" ${disabledAttr} style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; margin-top: 5px;">
                </div>

                <div>
                    <label style="font-weight: bold;">Thời Gian Đóng:</label>
                    <input type="datetime-local" id="nv_dong" value="${formatDateTimeLocal(data.thoi_gian_dong)}" ${disabledAttr} style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; margin-top: 5px;">
                </div>
                
                <div style="grid-column: span 2; display: flex; align-items: center; gap: 10px;">
                    <input type="checkbox" id="nv_daocau" ${data.dao_cau_hoi ? 'checked' : ''} ${disabledAttr} style="transform: scale(1.5);">
                    <label style="font-weight: bold; color: #28a745;">Cho phép hệ thống tự động đảo vị trí câu hỏi & đáp án khi học sinh làm bài.</label>
                </div>
            </div>

            <div style="display: flex; gap: 12px; margin-top: 30px;">
                ${htmlNutBam}
            </div>
        </div>
    `;
}

// Hàm 7.7: Update Nhiệm Vụ
async function ham_7_7_luu_cap_nhat_nhiem_vu(maNhiemVu, btnNode) {
    const ten = document.getElementById('nv_ten').value.trim();
    const lop = document.getElementById('nv_lop').value.trim();
    const mo = document.getElementById('nv_mo').value;
    const dong = document.getElementById('nv_dong').value;
    const daocau = document.getElementById('nv_daocau').checked;

    if (!ten || !lop) return alert("Vui lòng điền đủ Tên nhiệm vụ và Lớp giao!");

    btnNode.disabled = true;
    btnNode.innerText = "ĐANG LƯU...";

    try {
        const { error } = await _supabase
            .from('nhiem_vu')
            .update({
                ten_nhiem_vu: ten,
                lop_giao: lop,
                thoi_gian_mo: mo ? new Date(mo).toISOString() : null,
                thoi_gian_dong: dong ? new Date(dong).toISOString() : null,
                dao_cau_hoi: daocau
            })
            .eq('ma_nhiem_vu', maNhiemVu);

        if (error) throw error;
        alert("✅ Đã cập nhật Nhiệm Vụ thành công!");
        ham_7_1_ve_quan_ly_nhiem_vu();

    } catch (error) {
        alert("Lỗi: " + error.message);
        btnNode.disabled = false;
        btnNode.innerText = "💾 LƯU THAY ĐỔI NHIỆM VỤ";
    }
}

// Hàm 7.8: Xóa Nhiệm Vụ
async function ham_7_8_xoa_nhiem_vu(maNhiemVu) {
    if (!confirm(`⚠️ XÓA NHIỆM VỤ:\nThầy có chắc muốn xóa vĩnh viễn nhiệm vụ [${maNhiemVu}]? Toàn bộ kết quả thi của học sinh trong nhiệm vụ này cũng sẽ bị ảnh hưởng!`)) return;

    try {
        const { error } = await _supabase.from('nhiem_vu').delete().eq('ma_nhiem_vu', maNhiemVu);
        if (error) throw error;

        alert('🗑️ Đã xóa nhiệm vụ thành công!');
        ham_7_2_tai_danh_sach_nhiem_vu();
    } catch (error) {
        alert('Lỗi khi xóa: ' + error.message);
    }
}

// ==============================================================
// Hàm 7.3: Vẽ Form Tạo Nhiệm Vụ (Phiên bản Full 17 Tiêu chí)
// ==============================================================
async function ham_7_3_hien_form_them_nhiem_vu() {
    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
    vungLamViec.innerHTML = `<div style="text-align: center; padding: 40px;"><p>⏳ Đang tải dữ liệu hệ thống (Học liệu, Danh sách lớp)...</p></div>`;

    try {
        // 1. Sinh mã NV tự động (NV_ + 6 ký tự ngẫu nhiên Chữ & Số)
        const tapKyTu = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let chuoiNgauNhien = '';
        for (let i = 0; i < 6; i++) {
            chuoiNgauNhien += tapKyTu.charAt(Math.floor(Math.random() * tapKyTu.length));
        }
        const maNV = "NV_" + chuoiNgauNhien;

        // 2. Lấy danh sách Học Liệu
        const { data: dsHocLieu } = await _supabase.from('hoc_lieu').select('*').order('ngay_tao', { ascending: false });
        // Lưu tạm vào biến Window (toàn cục) để lát nữa hàm onchange lấy ra dùng điền tự động
        window.tempDsHocLieu = dsHocLieu || [];

        let htmlOptionsHL = `<option value="KHONG_DUNG" style="font-weight: bold; color: red;">[ --- Không sử dụng học liệu --- ]</option>`;
        window.tempDsHocLieu.forEach(hl => {
            htmlOptionsHL += `<option value="${hl.ma_hoc_lieu}">[${hl.ma_hoc_lieu}] - ${hl.ten_hoc_lieu}</option>`;
        });

        // 3. Lấy danh sách Lớp thực tế của hệ thống
        let dsLop = [];

        // ƯU TIÊN 1: Lấy ngay từ biến State của Khối Quản lý Lớp (Nếu thầy đã làm và đặt tên là BangLopState)
        // Việc này giúp Form mở ra ngay lập tức mà không cần đợi load mạng
        if (typeof BangLopState !== 'undefined' && BangLopState.duLieu && BangLopState.duLieu.length > 0) {
            dsLop = BangLopState.duLieu;
        } else {
            // ƯU TIÊN 2: Nếu chưa có State, bắt buộc phải gọi Supabase. 
            // ⚠️ LƯU Ý: Thầy hãy sửa chữ 'lop_hoc' dưới đây thành ĐÚNG TÊN BẢNG danh sách lớp trên Supabase của thầy nhé! (VD: 'lop', 'danh_sach_lop')
            const { data, error } = await _supabase.from('lop_hoc').select('*');
            if (!error && data) {
                dsLop = data;
            }
        }

        let htmlLop = '';
        if (dsLop.length > 0) {
            dsLop.forEach(l => {
                // Thuật toán nhận diện cột: Hệ thống tự rà quét xem bảng của thầy đang dùng tên cột là 'ma_lop' hay 'ma', 'ten_lop' hay 'ten'
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
            htmlLop = `
                <div style="padding: 10px; background: #fff3cd; border: 1px solid #ffeeba; border-radius: 6px;">
                    <span style="color: #856404; font-weight: bold;">⚠️ Không tìm thấy danh sách lớp!</span><br>
                    <span style="font-size: 12px; color: #666;">Thầy vui lòng kiểm tra lại tên bảng trên Supabase (hiện đang query bảng 'lop_hoc').</span>
                </div>
            `;
        }

        // 4. Render HTML
        vungLamViec.innerHTML = `
            <div style="max-width: 950px; background: white; padding: 25px; border-radius: 12px; margin: 0 auto; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
                <h3 style="color: #6f42c1; margin-top: 0; border-bottom: 2px solid #f1f3f4; padding-bottom: 10px; display:flex; justify-content: space-between;">
                    <span>🎯 TẠO NHIỆM VỤ MỚI</span>
                    <span style="color: #666; font-size: 14px;">Giáo viên: ${AppState.user?.ten || 'Admin'}</span>
                </h3>
                
                <div style="background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
                    <h4 style="margin-top: 0; color: #495057;">1. Thông tin chung</h4>
                    <div style="display: grid; grid-template-columns: 1fr 2fr 1fr; gap: 15px;">
                        <div>
                            <label style="font-weight:bold; font-size: 13px;">Mã NV (Tự động):</label>
                            <input type="text" id="add_nv_ma" value="${maNV}" readonly style="width: 100%; padding: 8px; background: #e9ecef; border: 1px solid #ccc; border-radius: 4px; font-weight:bold; color: #dc3545; cursor: not-allowed;">
                        </div>
                        <div>
                            <label style="font-weight:bold; font-size: 13px;">Tên Nhiệm Vụ (*):</label>
                            <input type="text" id="add_nv_ten" placeholder="Nhập tên nhiệm vụ..." style="width: 100%; padding: 8px; border: 1px solid #1a73e8; border-radius: 4px;">
                        </div>
                        <div>
                            <label style="font-weight:bold; font-size: 13px;">Loại nhiệm vụ:</label>
                            <select id="add_nv_loai" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
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
                        <label style="font-weight:bold; font-size: 13px; color: #d35400;">Chọn Đề thi gốc từ Kho Học Liệu (*):</label>
                        <select id="add_nv_maHL" onchange="ham_7_3_a_xu_ly_chon_hoc_lieu()" style="width: 100%; padding: 10px; border: 2px solid #d35400; border-radius: 4px; font-weight:bold; cursor: pointer;">
                            <option value="">-- Vui lòng chọn một đề thi --</option>
                            ${htmlOptionsHL}
                        </select>
                    </div>

                    <div id="khu_vuc_thong_tin_hl" style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; opacity: 0.5; pointer-events: none;">
                        <div>
                            <label style="font-size: 12px; font-weight:bold;">Khối Lớp:</label>
                            <select id="add_nv_khoi" style="width: 100%; padding: 6px; border: 1px solid #ccc; border-radius: 4px;">
                                <option value="12">Khối 12</option><option value="11">Khối 11</option><option value="10">Khối 10</option>
                                <option value="9">Khối 9</option><option value="8">Khối 8</option><option value="7">Khối 7</option>
                                <option value="6">Khối 6</option><option value="5">Khối 5</option><option value="4">Khối 4</option>
                                <option value="3">Khối 3</option><option value="2">Khối 2</option><option value="1">Khối 1</option>
                                <option value="Khác">Khác</option>
                            </select>
                        </div>
                        <div>
                            <label style="font-size: 12px; font-weight:bold;">Loại kiểm tra:</label>
                            <input type="text" id="add_nv_loaiKT" style="width: 100%; padding: 6px; border: 1px solid #ccc; border-radius: 4px;">
                        </div>
                        <div>
                            <label style="font-size: 12px; font-weight:bold; color: #6f42c1;">Quy mô / Cấu trúc:</label>
                            <input type="text" id="add_nv_quymo" readonly placeholder="Hệ thống tự lấy..." style="width: 100%; padding: 6px; background:#f4f4f4; border: 1px dotted #6f42c1; border-radius: 4px; color:#6f42c1; font-weight:bold;">
                        </div>
                    </div>
                </div>

                <div style="background: #fff8e6; border: 1px solid #ffe8a1; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
                    <h4 style="margin-top: 0; color: #d35400;">3. Phân công & Thời gian</h4>
                    
                    <div style="margin-bottom: 15px; border-bottom: 1px dashed #ccc; padding-bottom: 15px;">
                        <label style="font-weight:bold; font-size: 13px; display:block; margin-bottom: 5px;">Giao cho các Lớp (*):</label>
                        <div style="margin-bottom: 10px;">
                            <button onclick="ham_7_3_b_chon_tat_ca_lop(true)" style="padding: 3px 8px; font-size: 11px; cursor: pointer;">Chọn tất cả</button>
                            <button onclick="ham_7_3_b_chon_tat_ca_lop(false)" style="padding: 3px 8px; font-size: 11px; cursor: pointer;">Bỏ chọn</button>
                        </div>
                        <div style="background: white; padding: 10px; border: 1px solid #ddd; border-radius: 4px; max-height: 100px; overflow-y: auto;">
                            ${htmlLop}
                        </div>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 10px;">
                        <div>
                            <label style="font-size: 12px; font-weight:bold;">Trạng thái NV:</label>
                            <select id="add_nv_trangthai" style="width: 100%; padding: 6px; border: 1px solid #28a745; border-radius: 4px;">
                                <option value="1">🟢 Mở (Kích hoạt)</option>
                                <option value="0">🔴 Đóng (Tạm dừng)</option>
                            </select>
                        </div>
                        <div>
                            <label style="font-size: 12px; font-weight:bold;">Số lượt làm bài:</label>
                            <input type="number" id="add_nv_soluot" value="0" min="0" style="width: 100%; padding: 6px; border: 1px solid #ccc; border-radius: 4px;">
                            <small style="font-size: 10px; color:#666;">(0 là vô hạn)</small>
                        </div>
                        <div>
                            <label style="font-size: 12px; font-weight:bold;">Thời gian Bắt đầu:</label>
                            <input type="datetime-local" id="add_nv_mo" style="width: 100%; padding: 6px; border: 1px solid #ccc; border-radius: 4px;">
                        </div>
                        <div>
                            <label style="font-size: 12px; font-weight:bold;">Thời gian Kết thúc:</label>
                            <input type="datetime-local" id="add_nv_dong" style="width: 100%; padding: 6px; border: 1px solid #ccc; border-radius: 4px;">
                        </div>
                    </div>
                </div>

                <div style="background: #e6ffed; border: 1px solid #c3e6cb; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
                    <h4 style="margin-top: 0; color: #28a745;">4. Cấu hình Công bố Đáp án & Lời giải</h4>
                    
                    <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 15px;">
                        <div>
                            <label style="font-weight:bold; font-size: 13px;">Thời điểm công bố (Điểm, Đáp án, Lời giải chi tiết):</label>
                            <select id="add_nv_cauhinh_dapan" onchange="ham_7_3_c_xu_ly_hen_gio_cong_bo()" style="width: 100%; padding: 8px; border: 1px solid #28a745; border-radius: 4px;">
                                <option value="KHOA_HOAN_TOAN">Khóa hoàn toàn (Học sinh không bao giờ thấy)</option>
                                <option value="SAU_KHI_NOP">Cho xem ngay sau khi học sinh Nộp bài</option>
                                <option value="SAU_KHI_HET_HAN">Chỉ cho xem sau khi Hết hạn thời gian Đóng đề</option>
                                <option value="HEN_GIO">⏰ Hẹn một giờ cụ thể...</option>
                            </select>
                        </div>
                        <div id="khu_vuc_hen_gio" style="display: none;">
                            <label style="font-weight:bold; font-size: 13px; color: #d35400;">Giờ công bố:</label>
                            <input type="datetime-local" id="add_nv_giocongbo" style="width: 100%; padding: 8px; border: 1px solid #d35400; border-radius: 4px;">
                        </div>
                    </div>

                    <div style="margin-top: 15px; display: flex; align-items: center; gap: 10px;">
                        <input type="checkbox" id="add_nv_taofilegiai" checked style="transform: scale(1.3);">
                        <label style="font-size: 13px; font-weight:bold;">Đóng gói file Lời Giải ngay sau khi lưu (Khuyên dùng). Nếu bỏ chọn, thầy có thể đóng gói thủ công sau.</label>
                    </div>
                </div>

                <div style="display: flex; gap: 15px;">
                    <button onclick="ham_7_4_luu_nhiem_vu_moi('${maNV}', this)" style="flex: 2; padding: 15px; background: #28a745; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 16px; transition: 0.3s;">
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

// Hàm 7.3.a: Tự động điền dữ liệu khi chọn Học Liệu
function ham_7_3_a_xu_ly_chon_hoc_lieu() {
    const maHL = document.getElementById('add_nv_maHL').value;
    const khuVucInfo = document.getElementById('khu_vuc_thong_tin_hl');

    if (maHL === "KHONG_DUNG" || maHL === "") {
        // Mờ đi và không cho thao tác
        khuVucInfo.style.opacity = "0.3";
        khuVucInfo.style.pointerEvents = "none";
        document.getElementById('add_nv_khoi').value = "Khác";
        document.getElementById('add_nv_loaiKT').value = "";
        document.getElementById('add_nv_quymo').value = "";
    } else {
        // Hiện rõ lên và tự động điền
        khuVucInfo.style.opacity = "1";
        khuVucInfo.style.pointerEvents = "auto";

        // Tìm data trong mảng tạm
        const hlData = window.tempDsHocLieu.find(hl => hl.ma_hoc_lieu === maHL);
        if (hlData) {
            document.getElementById('add_nv_khoi').value = hlData.khoi_lop || "Khác";
            document.getElementById('add_nv_loaiKT').value = hlData.loai_kiem_tra || "";

            // Xử lý chuỗi quy mô
            let chuoiQuyMo = `${hlData.quy_mo_cau_hoi} câu`;
            if (hlData.metadata && hlData.metadata.cau_truc) {
                chuoiQuyMo = `${hlData.metadata.cau_truc} (${chuoiQuyMo})`;
            }
            document.getElementById('add_nv_quymo').value = chuoiQuyMo;
        }
    }
}

// Hàm 7.3.b: Chọn / Bỏ chọn tất cả checkbox Lớp
function ham_7_3_b_chon_tat_ca_lop(isCheck) {
    const checkboxes = document.querySelectorAll('.chk-lop');
    checkboxes.forEach(chk => chk.checked = isCheck);
}

// Hàm 7.3.c: Ẩn hiện ô chọn Ngày Giờ Công bố
function ham_7_3_c_xu_ly_hen_gio_cong_bo() {
    const select = document.getElementById('add_nv_cauhinh_dapan').value;
    const khuVucHenGio = document.getElementById('khu_vuc_hen_gio');

    if (select === "HEN_GIO") {
        khuVucHenGio.style.display = "block";
    } else {
        khuVucHenGio.style.display = "none";
        document.getElementById('add_nv_giocongbo').value = ""; // Xóa trắng
    }
}

// ==============================================================
// Hàm 7.4: Thu thập dữ liệu Form và Lưu Nhiệm vụ mới
// ==============================================================
async function ham_7_4_luu_nhiem_vu_moi(maNV, btnNode) {
    // 1. Thu thập các ô Input Text / Select cơ bản
    const tenNV = document.getElementById('add_nv_ten').value.trim();
    const loaiNV = document.getElementById('add_nv_loai').value;
    const maHL = document.getElementById('add_nv_maHL').value;
    const trangThai = document.getElementById('add_nv_trangthai').value;
    const soLuot = parseInt(document.getElementById('add_nv_soluot').value) || 0;
    const mo = document.getElementById('add_nv_mo').value;
    const dong = document.getElementById('add_nv_dong').value;

    // 2. Thu thập danh sách lớp đã được check
    const classCheckboxes = document.querySelectorAll('.chk-lop:checked');
    const dsLopChon = Array.from(classCheckboxes).map(chk => chk.value);
    
    // Bắt lỗi dữ liệu (Validate)
    if (!tenNV) return alert("❌ Thầy vui lòng nhập Tên nhiệm vụ!");
    if (!maHL) return alert("❌ Thầy chưa chọn Học liệu (Đề thi) kìa!");
    if (dsLopChon.length === 0) return alert("❌ Thầy phải tick chọn ít nhất 1 Lớp để giao bài chứ!");

    // Kiểm tra logic thời gian
    if (mo && dong) {
        if (new Date(mo) >= new Date(dong)) {
            return alert("❌ Lỗi thời gian: Thời gian kết thúc phải nằm SAU thời gian bắt đầu!");
        }
    }

    // 3. Xử lý thông tin ngầm từ Học liệu (Chỉ lấy nếu có dùng Học liệu)
    let quyMo = 0;
    let cauTruc = '';
    if (maHL !== "KHONG_DUNG") {
        const hlData = window.tempDsHocLieu.find(hl => hl.ma_hoc_lieu === maHL);
        if (hlData) {
            quyMo = hlData.quy_mo_cau_hoi || 0;
            cauTruc = (hlData.metadata && hlData.metadata.cau_truc) ? hlData.metadata.cau_truc : '';
        }
    }

    // 4. Xử lý logic cấu hình Đáp án & Lời giải
    let cauHinhDapAn = document.getElementById('add_nv_cauhinh_dapan').value;
    if (cauHinhDapAn === "HEN_GIO") {
        const gioCongBo = document.getElementById('add_nv_giocongbo').value;
        if (!gioCongBo) return alert("❌ Thầy chọn Hẹn giờ công bố thì phải nhập Giờ vào nhé!");
        // Lưu gộp theo chuẩn: KieuCongBo|ThoiGian
        cauHinhDapAn = `HEN_GIO|${new Date(gioCongBo).toISOString()}`;
    }

    // 5. Trạng thái tạo file giải (1: Tạo luôn, 0: Chờ tạo)
    const taoFileGiai = document.getElementById('add_nv_taofilegiai').checked ? 1 : 0;

    // Đổi trạng thái Nút để tránh bấm 2 lần
    btnNode.disabled = true;
    btnNode.innerText = "⏳ ĐANG KHỞI TẠO NHIỆM VỤ...";

    try {
        // 6. Bắn lệnh Insert lên Supabase
        const payload = {
            ma_nhiem_vu: maNV,
            ten_nhiem_vu: tenNV,
            loai_nhiem_vu: loaiNV,
            ma_hoc_lieu: maHL === "KHONG_DUNG" ? null : maHL,
            khoi_lop: document.getElementById('add_nv_khoi').value,
            loai_kiem_tra: document.getElementById('add_nv_loaiKT').value,
            quy_mo_cau_hoi: quyMo,
            cau_truc_de: cauTruc,
            danh_sach_lop: dsLopChon,
            thoi_gian_mo: mo ? new Date(mo).toISOString() : null,
            thoi_gian_dong: dong ? new Date(dong).toISOString() : null,
            so_luot_lam_bai: soLuot,
            cau_hinh_dap_an: cauHinhDapAn,
            trang_thai_loi_giai: taoFileGiai,
            trang_thai: trangThai,
            uid_gv_giao: (typeof AppState !== 'undefined' && AppState.user && AppState.user.uid) ? AppState.user.uid : null,
            ngay_tao: new Date().toISOString()
        };

        const { error } = await _supabase.from('nhiem_vu').insert([payload]);

        if (error) throw error;

        alert(`✅ Phù... Giao bài thành công!\nMã nhiệm vụ: ${maNV}`);

        // Sinh xong thì load lại cái Bảng danh sách Nhiệm Vụ
        ham_7_1_ve_quan_ly_nhiem_vu();

    } catch (error) {
        alert("Lỗi máy chủ khi tạo nhiệm vụ: " + error.message);
        btnNode.disabled = false;
        btnNode.innerText = "💾 XÁC NHẬN GIAO BÀI";
    }
}
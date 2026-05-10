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
                <button style="padding: 15px 25px; background: #28a745; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 15px; font-weight: bold; box-shadow: 0 2px 5px rgba(40,167,69,0.3);">
                    📚 Kho Học Liệu & Đề Thi
                </button>
                <button style="padding: 15px 25px; background: #17a2b8; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 15px; font-weight: bold; box-shadow: 0 2px 5px rgba(23,162,184,0.3);">
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

// Hàm 4.10: Vẽ bảng (Đã thêm cột Trạng thái sau cột Sĩ số)
function ham_4_10_ve_bang_du_lieu() {
    const renderArea = document.getElementById('danh-sach-lop-render');
    let dsLop = [...BangLopState.duLieu];

    const cot = BangLopState.cotDangSort;
    const heSo = BangLopState.tangDan ? 1 : -1;

    dsLop.sort((a, b) => {
        if (a[cot] < b[cot]) return -1 * heSo;
        if (a[cot] > b[cot]) return 1 * heSo;
        return 0;
    });

    const iconSort = BangLopState.tangDan ? '▲' : '▼';

    let htmlTable = `
        <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05); font-size: 14px;">
            <thead>
                <tr style="background: #f8f9fa; text-align: left; border-bottom: 2px solid #dee2e6; cursor: pointer;">
                    <th style="padding: 12px; border: 1px solid #eee; width: 50px; text-align: center;">STT</th>
                    <th style="padding: 12px; border: 1px solid #eee;">Mã Lớp</th>
                    <th style="padding: 12px; border: 1px solid #eee;">Tên Lớp</th>
                    <th style="padding: 12px; border: 1px solid #eee;" onclick="ham_4_11_thay_doi_sort('ten_gv_tao')">GV Tạo ${cot === 'ten_gv_tao' ? iconSort : '↕'}</th>
                    <th style="padding: 12px; border: 1px solid #eee;" onclick="ham_4_11_thay_doi_sort('ngay_tao')">Ngày Giờ Tạo ${cot === 'ngay_tao' ? iconSort : '↕'}</th>
                    <th style="padding: 12px; border: 1px solid #eee; text-align: center;">Sĩ số</th>
                    
                    <th style="padding: 12px; border: 1px solid #eee; text-align: center;">Trạng thái</th>
                    
                    <th style="padding: 12px; border: 1px solid #eee; text-align: center;">Thao tác</th>
                </tr>
            </thead>
            <tbody>
    `;

    dsLop.forEach((lop, index) => {
        const ngayGio = new Date(lop.ngay_tao).toLocaleString('vi-VN');
        const siSo = lop.hoc_sinh_ids ? lop.hoc_sinh_ids.length : 0;

        // Định dạng hiển thị Trạng thái (0: Đóng - Đỏ, 1: Mở - Xanh)
        const nhãnTrạngThái = lop.trang_thai == 1
            ? `<span style="background: #e6ffed; color: #28a745; padding: 4px 10px; border-radius: 12px; font-weight: bold; font-size: 12px; border: 1px solid #c6f6d5;">Đang mở</span>`
            : `<span style="background: #fff1f0; color: #dc3545; padding: 4px 10px; border-radius: 12px; font-weight: bold; font-size: 12px; border: 1px solid #ffa39e;">Đang đóng</span>`;

        htmlTable += `
            <tr style="border-bottom: 1px solid #eee; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#f1f8ff'" onmouseout="this.style.background='white'" onclick="ham_4_9_xem_chi_tiet_lop('${lop.ma_lop}')">
                <td style="padding: 10px; border: 1px solid #eee; text-align: center; font-weight: bold;">${index + 1}</td>
                <td style="padding: 10px; border: 1px solid #eee; font-weight: bold; color: #d35400;">${lop.ma_lop}</td>
                <td style="padding: 10px; border: 1px solid #eee;">${lop.ten_lop}</td>
                <td style="padding: 10px; border: 1px solid #eee; font-weight: bold; color: #1a73e8;">👨‍🏫 ${lop.ten_gv_tao}</td>
                <td style="padding: 10px; border: 1px solid #eee;">${ngayGio}</td>
                <td style="padding: 10px; border: 1px solid #eee; text-align: center; font-weight: bold;">${siSo}</td>
                
                <td style="padding: 10px; border: 1px solid #eee; text-align: center;">${nhãnTrạngThái}</td>
                
                <td style="padding: 10px; border: 1px solid #eee; text-align: center; white-space: nowrap;" onclick="event.stopPropagation()">
                    <button onclick="ham_4_12_hien_form_sua_lop('${lop.ma_lop}')" style="padding: 6px 12px; background: #f39c12; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; margin-right: 5px;">Sửa</button>
                    <button onclick="ham_4_14_xoa_lop('${lop.ma_lop}')" style="padding: 6px 12px; background: #dc3545; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer;">Xóa</button>
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

// Hàm 5.10: Vẽ Bảng học sinh (Đầy đủ thông tin)
function ham_5_10_ve_bang_hoc_sinh() {
    const renderArea = document.getElementById('danh-sach-hs-render');
    let dsHocSinh = [...BangHocSinhState.duLieu];

    if (dsHocSinh.length === 0) {
        renderArea.innerHTML = `<p style="text-align: center; color: #666; padding: 20px; background: white; border-radius: 8px;">Chưa có học sinh nào đăng ký vào hệ thống.</p>`;
        return;
    }

    // Thuật toán Sort
    const cot = BangHocSinhState.cotDangSort;
    const heSo = BangHocSinhState.tangDan ? 1 : -1;
    dsHocSinh.sort((a, b) => {
        let valA = a[cot] || '';
        let valB = b[cot] || '';
        if (typeof valA === 'string') valA = valA.toLowerCase();
        if (typeof valB === 'string') valB = valB.toLowerCase();
        if (valA < valB) return -1 * heSo;
        if (valA > valB) return 1 * heSo;
        return 0;
    });

    const iconSort = BangHocSinhState.tangDan ? '▲' : '▼';

    // Bảng có thanh cuộn ngang (overflow-x: auto) để không bị vỡ bố cục nếu màn hình nhỏ
    let htmlTable = `
        <div style="overflow-x: auto;">
            <table style="width: 100%; min-width: 1000px; border-collapse: collapse; background: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); font-size: 13px;">
                <thead>
                    <tr style="background: #f8f9fa; text-align: left; border-bottom: 2px solid #dee2e6; cursor: pointer; white-space: nowrap;">
                        <th style="padding: 10px; border: 1px solid #eee; text-align: center; width: 40px;">STT</th>
                        <th style="padding: 10px; border: 1px solid #eee;" onclick="ham_5_11_thay_doi_sort('ten')">Họ và Tên ${cot === 'ten' ? iconSort : '↕'}</th>
                        <th style="padding: 10px; border: 1px solid #eee;">SĐT (Tài khoản)</th>
                        <th style="padding: 10px; border: 1px solid #eee;" onclick="ham_5_11_thay_doi_sort('truong')">Trường / Khối / Tỉnh</th>
                        <th style="padding: 10px; border: 1px solid #eee; text-align: center;">Mã Lớp Vào</th>
                        <th style="padding: 10px; border: 1px solid #eee;" onclick="ham_5_11_thay_doi_sort('lan_dang_nhap_cuoi')">Hoạt động cuối ${cot === 'lan_dang_nhap_cuoi' ? iconSort : '↕'}</th>
                        <th style="padding: 10px; border: 1px solid #eee; text-align: right;" onclick="ham_5_11_thay_doi_sort('diem_tich_luy')">Điểm TL ${cot === 'diem_tich_luy' ? iconSort : '↕'}</th>
                        <th style="padding: 10px; border: 1px solid #eee; text-align: center;">Trạng Thái</th>
                        <th style="padding: 10px; border: 1px solid #eee; text-align: center; position: sticky; right: 0; background: #f8f9fa;">Thao tác</th>
                    </tr>
                </thead>
                <tbody>
    `;

    dsHocSinh.forEach((hs, index) => {
        // Xử lý các trường dữ liệu cho gọn
        const truongKhoiTinh = `<strong>${hs.truong || 'N/A'}</strong> ${hs.khoi_lop ? '(Khối ' + hs.khoi_lop + ')' : ''} ${hs.tinh ? '- ' + hs.tinh : ''}`;

        const maLop = (hs.danh_sach_ma_lop && hs.danh_sach_ma_lop.length > 0)
            ? hs.danh_sach_ma_lop.join(', ')
            : '<span style="color: #999;">Chưa có</span>';

        const dangNhapCuoi = hs.lan_dang_nhap_cuoi
            ? new Date(hs.lan_dang_nhap_cuoi).toLocaleString('vi-VN')
            : '<span style="color: #999;">Chưa đăng nhập</span>';

        const ngayDK = new Date(hs.ngay_tham_gia).toLocaleDateString('vi-VN');

        // Nhãn trạng thái
        const nhanTrangThai = hs.trang_thai == 1
            ? `<span style="color: #28a745; font-weight: bold;">● Mở</span>`
            : `<span style="color: #dc3545; font-weight: bold;">● Khóa</span>`;

        const btnKhoaMo = hs.trang_thai == 1
            ? `<button onclick="ham_5_3_khoa_mo_tai_khoan('${hs.uid}', 0, '${hs.ten}')" style="padding: 4px 8px; background: #fff1f0; color: #dc3545; border: 1px solid #ffa39e; border-radius: 4px; font-size: 12px; cursor: pointer;">Khóa</button>`
            : `<button onclick="ham_5_3_khoa_mo_tai_khoan('${hs.uid}', 1, '${hs.ten}')" style="padding: 4px 8px; background: #e6ffed; color: #28a745; border: 1px solid #c6f6d5; border-radius: 4px; font-size: 12px; cursor: pointer;">Mở</button>`;

        htmlTable += `
            <tr style="border-bottom: 1px solid #eee; transition: 0.2s;" onmouseover="this.style.background='#f1f8ff'" onmouseout="this.style.background='white'">
                <td style="padding: 10px; border: 1px solid #eee; text-align: center; font-weight: bold;">${index + 1}</td>
                <td style="padding: 10px; border: 1px solid #eee; font-weight: bold; color: #6f42c1;">${hs.ten}</td>
                <td style="padding: 10px; border: 1px solid #eee; color: #d35400; font-weight: bold;">${hs.sdt}</td>
                <td style="padding: 10px; border: 1px solid #eee;">${truongKhoiTinh}</td>
                <td style="padding: 10px; border: 1px solid #eee; text-align: center; font-weight: bold; color: #1a73e8;">${maLop}</td>
                <td style="padding: 10px; border: 1px solid #eee;">
                    <div style="font-weight: bold; color: #333;">${dangNhapCuoi}</div>
                    <div style="font-size: 11px; color: #666;">ĐK: ${ngayDK}</div>
                </td>
                <td style="padding: 10px; border: 1px solid #eee; text-align: right; font-weight: bold; font-size: 14px; color: #e67e22;">
                    ${hs.diem_tich_luy || 0}
                </td>
                <td style="padding: 10px; border: 1px solid #eee; text-align: center;">${nhanTrangThai}</td>
                <td style="padding: 10px; border: 1px solid #eee; text-align: center; white-space: nowrap; position: sticky; right: 0; background: inherit;">
                    <button style="padding: 4px 8px; background: #fff3cd; color: #856404; border: 1px solid #ffeeba; border-radius: 4px; font-size: 12px; cursor: pointer; margin-right: 5px;">Sửa</button>
                    ${btnKhoaMo}
                </td>
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
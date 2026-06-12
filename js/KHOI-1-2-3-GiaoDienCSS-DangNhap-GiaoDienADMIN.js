
// ==============================================================================
// KHỐI 1: DỰNG GIAO DIỆN & CSS (UI BUILDER)
// ==============================================================================

// Hàm 1.1: Bơm toàn bộ CSS vào trang
function ham_1_1_nhung_css() {
    //console.log("Đang vào hàm ham_1_1_nhung_css");
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
    //console.log("Đang vào hàm 1_2");
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




// =====================================================================
// Hàm 2.4: Bắt sự kiện bấm nút Đăng nhập / Đăng ký chính 
// (BẢN FINAL: ĐÃ KẾT NỐI ĐỒNG BỘ CỘT hoc_sinh_ids CỦA BẢNG LỚP HỌC)
// =====================================================================
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

            let tenVaiTro = '';
            if (AppState.role === 'admin') tenVaiTro = 'Admin';
            else if (AppState.role === 'giaovien') tenVaiTro = 'Giáo viên';
            else tenVaiTro = 'Học sinh';

            let tenInHoa = AppState.user.ten ? AppState.user.ten.toUpperCase() : 'CHƯA CẬP NHẬT TÊN';
            let chuoiHienThi = `${tenVaiTro}: ${tenInHoa} (${AppState.user.sdt})`;

            let lblStatus = document.getElementById('status');
            if (lblStatus) {
                lblStatus.innerText = `👤 ${chuoiHienThi}`;
                lblStatus.style.color = '#1a73e8';
                lblStatus.style.fontWeight = 'bold';
            }

            await _supabase
                .from('hoc_sinh')
                .update({ lan_dang_nhap_cuoi: new Date().toISOString() })
                .eq('uid', userFound.uid);

            if (AppState.role === 'admin' || AppState.role === 'giaovien') {
                ham_3_1_ve_dashboard_admin();
            } else {
                document.getElementById('khung-dang-nhap').style.display = 'none';
                document.getElementById('btnLogout').style.display = 'inline-block';
                document.getElementById('dashboard-container').style.display = 'block';

                let dsMaLopHocSinh = [];
                if (AppState.user.danh_sach_ma_lop && Array.isArray(AppState.user.danh_sach_ma_lop)) {
                    dsMaLopHocSinh = AppState.user.danh_sach_ma_lop;
                }

                ham_8_1_tai_nhiem_vu_cua_toi(AppState.user.uid, dsMaLopHocSinh, AppState.user.ten);
            }
        } catch (error) {
            errorMsg.innerText = error.message;
            errorMsg.style.display = 'block';
            document.getElementById('status').innerText = `Lỗi đăng nhập`;
        }

    } else {
        // ====================================================
        // LUỒNG 2: ĐĂNG KÝ TÀI KHOẢN (ĐỒNG BỘ 2 CHIỀU)
        // ====================================================
        console.log("App: Đang xử lý đăng ký tài khoản");

        const hoTen = document.getElementById('txtHoTen').value.trim();
        const passConfirm = document.getElementById('txtConfirmPassword').value;
        const khoi = document.getElementById('txtLop') ? document.getElementById('txtLop').value : '';
        const tinh = document.getElementById('txtTinh') ? document.getElementById('txtTinh').value.trim() : '';
        const truong = document.getElementById('txtTruong') ? document.getElementById('txtTruong').value.trim() : '';
        const maLopVao = document.getElementById('txtMaLop') ? document.getElementById('txtMaLop').value.trim().toUpperCase() : '';

        let vaiTroDangKy = 'hocsinh';
        const radioHS = document.getElementById('roleHS');
        const radioGV = document.getElementById('roleGV');

        if (radioGV && radioGV.checked) vaiTroDangKy = 'giaovien';
        else if (radioHS && radioHS.checked) vaiTroDangKy = 'hocsinh';

        if (!hoTen || !tinh || !truong) {
            errorMsg.innerText = "Vui lòng nhập đầy đủ Họ tên, Tỉnh/Thành phố và Trường học!";
            errorMsg.style.display = 'block';
            return;
        }

        if (vaiTroDangKy === 'hocsinh' && !maLopVao) {
            errorMsg.innerText = "Học sinh đăng ký bắt buộc phải nhập MÃ LỚP do giáo viên cung cấp!";
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

        document.getElementById('status').innerText = `Đang kết nối hệ thống...`;
        if (btnElement) btnElement.disabled = true;

        try {
            // 2. Kiểm tra trùng số điện thoại
            const { data: checkSdt, error: checkError } = await _supabase
                .from('hoc_sinh')
                .select('sdt')
                .eq('sdt', sdt)
                .maybeSingle();

            if (checkSdt) {
                throw new Error("Số điện thoại này đã được đăng ký! Vui lòng chuyển sang tab Đăng nhập.");
            }

            let checkLop = null;

            // =========================================================
            // 🌟 3. XÁC THỰC MÃ LỚP VÀ KÉO MẢNG hoc_sinh_ids VỀ
            // =========================================================
            if (vaiTroDangKy === 'hocsinh') {
                document.getElementById('status').innerText = `Đang kiểm tra mã lớp...`;

                const { data: dataLop, error: loiCheckLop } = await _supabase
                    .from('lop_hoc')
                    .select('ma_lop, hoc_sinh_ids') // Đã gọi đúng tên cột trong ảnh
                    .eq('ma_lop', maLopVao)
                    .maybeSingle();

                if (loiCheckLop) {
                    throw new Error("Lỗi kết nối khi kiểm tra mã lớp. Vui lòng thử lại!");
                }

                if (!dataLop) {
                    throw new Error(`Mã lớp [ ${maLopVao} ] KHÔNG TỒN TẠI. Em hãy hỏi lại Giáo viên để lấy đúng mã nhé!`);
                }
                checkLop = dataLop; // Lưu lại để tí nữa đút UID mới vào
            }

            // 4. Tạo sẵn 1 mã UID duy nhất
            const taoUidHocSinh = crypto.randomUUID();
            document.getElementById('status').innerText = `Đang khởi tạo tài khoản...`;

            // 5. Lưu vào bảng hoc_sinh
            const { error: insertError } = await _supabase
                .from('hoc_sinh')
                .insert([{
                    uid: taoUidHocSinh,
                    sdt: sdt,
                    mat_khau: pass,
                    ten: hoTen,
                    vai_tro: vaiTroDangKy,
                    trang_thai: 1,
                    khoi_lop: khoi,
                    tinh: tinh,
                    truong: truong,
                    danh_sach_ma_lop: (vaiTroDangKy === 'hocsinh') ? [maLopVao] : [],
                    ngay_tham_gia: new Date().toISOString()
                }]);

            if (insertError) throw insertError;

            // =========================================================
            // 🌟 6. BƠM UID VÀO CỘT hoc_sinh_ids CỦA BẢNG LỚP HỌC
            // =========================================================
            if (vaiTroDangKy === 'hocsinh' && checkLop) {
                // Lấy mảng ID hiện tại (Supabase JS tự động parse mảng Postgres thành mảng JS)
                let dsHsHienTai = Array.isArray(checkLop.hoc_sinh_ids) ? checkLop.hoc_sinh_ids : [];

                // Nếu UID chưa có trong lớp thì bơm vào
                if (!dsHsHienTai.includes(taoUidHocSinh)) {
                    dsHsHienTai.push(taoUidHocSinh);

                    const { error: errUpdateLop } = await _supabase
                        .from('lop_hoc')
                        .update({ hoc_sinh_ids: dsHsHienTai })
                        .eq('ma_lop', maLopVao);

                    if (errUpdateLop) console.error("Lỗi đồng bộ vào lớp học:", errUpdateLop);
                }
            }

            // 7. Hoàn tất
            if (vaiTroDangKy === 'hocsinh') {
                alert(`Đăng ký thành công! Chào mừng ${hoTen} gia nhập lớp ${maLopVao}. Hệ thống chuyển về Đăng nhập.`);
            } else {
                alert(`Đăng ký thành công tài khoản GIÁO VIÊN cho thầy/cô: ${hoTen}.`);
            }

            ham_2_1_chuyen_doi_che_do();
            document.getElementById('txtPassword').value = '';
            document.getElementById('status').innerText = `Vui lòng đăng nhập để tiếp tục`;

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


//// =====================================================================
//// [Nhãn thời gian: 13:05 - Ngày 10/06/2026] - Hàm 3.1: Vẽ màn hình làm việc của Giáo viên / Admin
//// =====================================================================
function ham_3_1_ve_dashboard_admin() {
    document.getElementById('khung-dang-nhap').style.display = 'none';
    document.getElementById('btnLogout').style.display = 'inline-block';

    let tenVaiTro = '';
    if (AppState.role === 'admin') tenVaiTro = 'Admin';
    else if (AppState.role === 'giaovien') tenVaiTro = 'Giáo viên';
    else tenVaiTro = 'Học sinh';

    let tenInHoa = AppState.user.ten ? AppState.user.ten.toUpperCase() : 'CHƯA CẬP NHẬT TÊN';
    let chuoiHienThi = `${tenVaiTro}: ${tenInHoa} (${AppState.user.sdt})`;

    const lblStatus = document.getElementById('status');
    if (lblStatus) {
        lblStatus.innerText = `👤 ${chuoiHienThi}`;
        lblStatus.style.color = '#1a73e8';
        lblStatus.style.fontWeight = 'bold';
    }

    const dashboard = document.getElementById('dashboard-container');
    dashboard.style.display = 'block';
    document.body.style.paddingBottom = '60px';

    dashboard.innerHTML = `
        <div style="background: white; padding: 25px; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
            <h2 style="color: #0056b3; margin-top: 0;">BẢNG ĐIỀU KHIỂN QUẢN TRỊ</h2>
            <p style="font-size: 16px; color: #495057;">Chào mừng quay trở lại, hệ thống đã sẵn sàng làm việc!</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
            <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                <button onclick="ham_6_1_ve_quan_ly_hoc_lieu()" style="padding: 15px 25px; background: #28a745; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 15px; font-weight: bold; box-shadow: 0 2px 5px rgba(40,167,69,0.3);">📚 Kho Học Liệu & Đề Thi</button>
                <button onclick="ham_7_1_ve_quan_ly_nhiem_vu()" style="padding: 15px 25px; background: #17a2b8; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 15px; font-weight: bold; box-shadow: 0 2px 5px rgba(23,162,184,0.3);">🚀 Quản Lý Nhiệm Vụ</button>
                <button onclick="ham_14_1_ve_tab_duyet_don()" style="padding: 15px 25px; background: #ffc107; color: #000; border: none; border-radius: 8px; cursor: pointer; font-size: 15px; font-weight: bold; box-shadow: 0 2px 5px rgba(255,193,7,0.3);">📩 Duyệt Yêu Cầu Học Sinh</button>
                <button onclick="ham_4_1_ve_quan_ly_lop()" style="padding: 15px 25px; background: #6c757d; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 15px; font-weight: bold; box-shadow: 0 2px 5px rgba(108,117,125,0.3);">🏫 Quản Lý Lớp Học</button>
                <button onclick="ham_5_1_ve_quan_ly_hoc_sinh()" style="padding: 15px 25px; background: #6f42c1; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 15px; font-weight: bold; box-shadow: 0 2px 5px rgba(111,66,193,0.3);">🎓 Quản Lý Học Sinh</button>

                <button onclick="ham_11_1_ve_quan_ly_thong_bao()" style="padding: 15px 25px; background: #fd7e14; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 15px; font-weight: bold; box-shadow: 0 2px 5px rgba(253,126,20,0.3);">📢 Quản Lý Thông Báo</button>

                <button onclick="ham_12_1_ve_quan_ly_tin_nhan()" style="padding: 15px 25px; background: #0ea5e9; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 15px; font-weight: bold; box-shadow: 0 2px 5px rgba(14,165,233,0.3);">💬 Hộp Thư Hỗ Trợ</button>

                <button onclick="ham_9_1_tab_live_quiz()" style="padding: 15px 25px; background: #e74c3c; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 15px; font-weight: bold; box-shadow: 0 2px 5px rgba(231,76,60,0.3);">🔴 TỔ CHỨC LIVE QUIZ</button>
            </div>
            <div id="vung-lam-viec-chi-tiet" style="margin-top: 30px; padding: 20px; background: #f8f9fa; border-radius: 8px; border: 1px dashed #ccc; min-height: 200px;">
                <p style="color: #6c757d; text-align: center; margin-top: 80px;">Bấm vào các nút chức năng bên trên để bắt đầu làm việc...</p>
            </div>
        </div>
    `;

    // 🌟 SỬA LỖI SPAM API: Đập bỏ đồng hồ cũ trước khi cài đồng hồ mới
    if (window.dongHoThanhChay) {
        clearInterval(window.dongHoThanhChay);
    }
    ham_3_2_ve_thanh_chay_nop_bai();
    window.dongHoThanhChay = setInterval(ham_3_2_ve_thanh_chay_nop_bai, 60000); // 30 giây lấy API 1 lần
}

//// =====================================================================
//// PHẦN 1: CÁC HÀM THANH CHẠY DÀNH CHO GIAO DIỆN GIÁO VIÊN / ADMIN
//// =====================================================================

//// =====================================================================
//// [Nhãn thời gian: 17:00 - Ngày 10/06/2026] - Hàm 3.2: Vẽ thanh chạy lấy API trực tiếp từ Supabase (Màn hình Admin)
//// =====================================================================
async function ham_3_2_ve_thanh_chay_nop_bai() {
    if (typeof SUPABASE_URL === 'undefined' || !SUPABASE_URL.startsWith('http')) {
        return;
    }

    try {
        const headersAPI = {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json'
        };

        // 1. Lấy bảng Lớp học để tạo bộ Từ điển dịch Mã Lớp -> Tên Lớp
        const resLop = await fetch(`${SUPABASE_URL}/rest/v1/lop_hoc?select=ma_lop,ten_lop`, { method: 'GET', headers: headersAPI });
        const dataLop = await resLop.json();

        const tuDienLop = {};
        if (dataLop && dataLop.length > 0) {
            dataLop.forEach(lop => {
                tuDienLop[lop.ma_lop] = lop.ten_lop;
            });
        }

        // 2. Gọi kết quả thi, JOIN với hoc_sinh (lấy tên) và nhiem_vu (lấy tên nhiệm vụ, danh sách mã lớp)
        const querySelect = "tong_diem,thoi_gian_nop,hoc_sinh!uid_hoc_sinh(ten),nhiem_vu(ten_nhiem_vu,danh_sach_lop)";
        const fullAPI_Link = `${SUPABASE_URL}/rest/v1/ket_qua_thi?select=${querySelect}&order=thoi_gian_nop.desc&limit=10`;

        const response = await fetch(fullAPI_Link, { method: 'GET', headers: headersAPI });

        if (!response.ok) throw new Error("Lỗi fetch bảng Kết quả thi");
        const data = await response.json();

        if (!data || data.length === 0) return;

        // 3. Dịch dữ liệu và nhúng vào HTML
        let chuoiNoiDung = data.map(row => {
            let diemDb = row.tong_diem !== null ? row.tong_diem : 0;
            let diemHienThi = Number(diemDb).toFixed(2).replace(/\.00$/, '');
            let thoiGianHienThi = ham_3_3_tinh_thoi_gian_truoc_day(row.thoi_gian_nop);

            let tenHS = (row.hoc_sinh && row.hoc_sinh.ten) ? row.hoc_sinh.ten : "Ẩn danh";
            let tenNhiemVu = (row.nhiem_vu && row.nhiem_vu.ten_nhiem_vu) ? row.nhiem_vu.ten_nhiem_vu : "(Chưa đặt tên)";

            let lopHienThi = "--";
            if (row.nhiem_vu && Array.isArray(row.nhiem_vu.danh_sach_lop)) {
                let mangTenLop = row.nhiem_vu.danh_sach_lop.map(ma => tuDienLop[ma] || ma);
                lopHienThi = mangTenLop.join(", ");
            }

            return `
                <span style="margin-right: 60px; font-family: Arial, sans-serif; display: inline-block;">
                    <i style="color: #ffd700;">🔥</i> 
                    Học sinh <b>${tenHS}</b> (<span style="color: #38bdf8;">${lopHienThi}</span>) 
                    vừa nộp <b>${tenNhiemVu}</b> - 
                    Điểm: <span style="color: #4ade80; font-weight: bold;">${diemHienThi}</span> 
                    <span style="color: #94a3b8; margin-left: 6px; background: #334155; padding: 1px 4px; border-radius: 3px;">⏱️ ${thoiGianHienThi}</span>
                </span>
            `;
        }).join("");

        ve_khung_html_thanh_chay(chuoiNoiDung);

    } catch (error) {
        console.warn("⚠️ [Thanh chạy Live Admin bị gián đoạn]:", error.message);
    }
}

//// =====================================================================
//// [Nhãn thời gian: 17:00 - Ngày 10/06/2026] - Hàm phụ trợ: Vẽ khung chứa thanh chạy Admin (Dưới đáy - Font 10px)
//// =====================================================================
function ve_khung_html_thanh_chay(chuoiHienThi) {
    if (document.getElementById('thanh-chay-nop-bai-admin')) {
        document.getElementById('thanh-chay-nop-bai-admin').remove();
    }

    document.body.style.paddingBottom = '15px';

    const tickerWrap = document.createElement('div');
    tickerWrap.id = 'thanh-chay-nop-bai-admin';
    tickerWrap.innerHTML = `
        <style>
            #thanh-chay-nop-bai-admin { 
                position: fixed; bottom: 0; left: 0; width: 100%; 
                background-color: #0f172a; color: #ffffff; 
                padding: 2px 0; 
                z-index: 9999; overflow: hidden; box-shadow: 0 -1px 5px rgba(0,0,0,0.3); 
                border-top: 1px solid #2563eb; 
                line-height: 12px;
                height: 13px;
            }
            .ticker-move-admin { display: inline-block; white-space: nowrap; padding-left: 100%; }
            .ticker-move-admin:hover { animation-play-state: paused; cursor: pointer; }
            @keyframes ticker-anim-admin { 0% { transform: translate3d(0, 0, 0); } 100% { transform: translate3d(-100%, 0, 0); } }
            
            #thanh-chay-nop-bai-admin *,
            #thanh-chay-nop-bai-admin span,
            #thanh-chay-nop-bai-admin b {
                font-size: 11px !important;
            }
        </style>
        <div class="ticker-move-admin" id="noi-dung-thanh-chay">${chuoiHienThi}</div>
    `;
    document.body.appendChild(tickerWrap);

    setTimeout(() => {
        const textElement = document.getElementById('noi-dung-thanh-chay');
        if (textElement) {
            const distance = window.innerWidth + textElement.scrollWidth;
            const duration = distance / 100; // Vận tốc cố định 100px/s
            textElement.style.animation = `ticker-anim-admin ${duration}s linear infinite`;
        }
    }, 100);
}

function ve_giao_dien_thanh_chay_ao() {
    let noiDungAo = `
        <span style="margin-right: 70px; font-family: Arial, sans-serif; font-size: 14px; display: inline-block;">
            <i style="color: #ffd700;">🔥</i> 
            Học sinh <b>Dữ liệu Đang lỗi</b> (<span style="color: #38bdf8;">--</span>) vừa nộp <b>--</b> - Điểm: <span style="color: #4ade80; font-weight: bold; font-size: 16px;">0.0</span> <span style="color: #94a3b8; font-size: 12px; margin-left: 6px; background: #334155; padding: 2px 6px; border-radius: 4px;">⏱️ Vừa xong</span>
        </span>`;
    ve_khung_html_thanh_chay(noiDungAo);
}


//// =====================================================================
//// [Nhãn thời gian: 11:47 - Ngày 10/06/2026] - Hàm 3.3: Tiện ích tính thời gian (Time Ago)
//// =====================================================================
function ham_3_3_tinh_thoi_gian_truoc_day(thoiGianISO) {
    if (!thoiGianISO) return "Không rõ";

    const thoiGianNop = new Date(thoiGianISO);
    const hienTai = new Date();
    const giay = Math.floor((hienTai - thoiGianNop) / 1000);

    if (giay < 60) return "Vừa xong";

    const phut = Math.floor(giay / 60);
    if (phut < 60) return `${phut} phút trước`;

    const gio = Math.floor(phut / 60);
    if (gio < 24) return `${gio} giờ trước`;

    const ngay = Math.floor(gio / 24);
    return `${ngay} ngày trước`;
}

// 🌟 THIẾT LẬP AUTO-REFRESH (Tự động cập nhật sau mỗi 30 giây)
// Thầy có thể chèn đoạn này vào cuối hàm ham_3_1_ve_dashboard_admin() để kích hoạt:
// setInterval(ham_3_2_ve_thanh_chay_nop_bai, 30000);


// Đảm bảo mọi thứ được vẽ ra khi trang web load xong
window.onload = function () {
    console.log("Hệ thống bắt đầu khởi chạy...");
    ham_1_1_nhung_css();
    ham_1_2_dung_khung_html();

    // Thêm dòng này để xác nhận code đã chạy đến đây
    document.getElementById('status').innerText = "Hệ thống sẵn sàng";
};


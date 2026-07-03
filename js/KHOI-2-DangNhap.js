


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
                window.ham_3b_1_tai_nhiem_vu_cua_toi(AppState.user.uid, dsMaLopHocSinh, AppState.user.ten);
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




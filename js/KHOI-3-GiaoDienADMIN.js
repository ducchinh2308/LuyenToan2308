

// ==============================================================================
// KHỐI 3: GIAO DIỆN QUẢN TRỊ VIÊN (ADMIN DASHBOARD)
// ==============================================================================


// //// =====================================================================
// //// [Nhãn thời gian: 13:05 - Ngày 10/06/2026] - Hàm 3.1: Vẽ màn hình làm việc của Giáo viên / Admin
// //// =====================================================================

// function ham_3_1_ve_dashboard_admin() {
//     document.getElementById('khung-dang-nhap').style.display = 'none';
//     document.getElementById('btnLogout').style.display = 'inline-block';

//     let tenVaiTro = '';
//     if (AppState.role === 'admin') tenVaiTro = 'Admin';
//     else if (AppState.role === 'giaovien') tenVaiTro = 'Giáo viên';
//     else tenVaiTro = 'Học sinh';

//     let tenInHoa = AppState.user.ten ? AppState.user.ten.toUpperCase() : 'CHƯA CẬP NHẬT TÊN';
//     let chuoiHienThi = `${tenVaiTro}: ${tenInHoa} (${AppState.user.sdt})`;

//     const lblStatus = document.getElementById('status');
//     if (lblStatus) {
//         lblStatus.innerText = `👤 ${chuoiHienThi}`;
//         lblStatus.style.color = '#1a73e8';
//         lblStatus.style.fontWeight = 'bold';
//     }

//     const dashboard = document.getElementById('dashboard-container');
//     dashboard.style.display = 'block';
//     document.body.style.paddingBottom = '60px';

//     // Định nghĩa chung style nút để code gọn hơn
//     const btnStyle = "padding: 15px 25px; border: none; border-radius: 8px; cursor: pointer; font-size: 15px; font-weight: bold; box-shadow: 0 2px 5px rgba(0,0,0,0.2); transition: 0.2s; color: white;";

//     dashboard.innerHTML = `
//         <div style="background: white; padding: 25px; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
//             <h2 style="color: #0056b3; margin-top: 0;">BẢNG ĐIỀU KHIỂN QUẢN TRỊ</h2>
//             <p style="font-size: 16px; color: #495057;">Chào mừng quay trở lại, hệ thống đã sẵn sàng làm việc!</p>
//             <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">

//             <h4 style="color: #555; margin-bottom: 15px;">📚 QUẢN LÝ KHO HỌC LIỆU</h4>
//             <div style="display: flex; gap: 15px; flex-wrap: wrap; margin-bottom: 25px;">
//                 <button onclick="ham_6a_1_ve_quan_ly_hoc_lieu_trac_nghiem()" style="${btnStyle} background: #20c997;">✅ Trắc Nghiệm</button>
//                 <button onclick="ham_6b_1_ve_quan_ly_hoc_lieu_tu_luan()" style="${btnStyle} background: #28a745;">📝 Tự Luận</button>

//                 <button onclick="" style="${btnStyle} background: #0056b3;">📖 Đọc Bài</button>
//                 <button onclick="" style="${btnStyle} background: #6f42c1;">📊 Khảo Sát</button>
//             </div>

//             <h4 style="color: #555; margin-bottom: 15px;">🚀 QUẢN LÝ NHIỆM VỤ</h4>
//             <div style="display: flex; gap: 15px; flex-wrap: wrap; margin-bottom: 25px;">
//                 <button onclick="ham_7a_1_ve_quan_ly_nhiem_vu_trac_nghiem()" style="${btnStyle} background: #ca6f1e;">✅ NV Trắc Nghiệm</button>
//                 <button onclick="ham_7b_1_ve_quan_ly_nhiem_vu_tu_luan()" style="${btnStyle} background: #d68910;">📝 NV Tự Luận</button>
                
//                 <button onclick="ham_7_3_nv_doc_bai()" style="${btnStyle} background: #7f8c8d;">📖 NV Đọc Bài</button>
//                 <button onclick="ham_7_4_nv_khao_sat()" style="${btnStyle} background: #c0392b;">📊 NV Khảo Sát</button>
//             </div>

//             <h4 style="color: #555; margin-bottom: 15px;">⚙️ CHỨC NĂNG KHÁC</h4>
//             <div style="display: flex; gap: 15px; flex-wrap: wrap;">
//                 <button onclick="ham_14_1_ve_tab_duyet_don()" style="padding: 12px 20px; background: #ffc107; color: #000; border: none; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: bold; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">📩 Duyệt Yêu Cầu</button>
//                 <button onclick="ham_4_1_ve_quan_ly_lop()" style="padding: 12px 20px; background: #6c757d; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: bold; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">🏫 Quản Lý Lớp</button>
//                 <button onclick="ham_5_1_ve_quan_ly_hoc_sinh()" style="padding: 12px 20px; background: #6f42c1; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: bold; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">🎓 Quản Lý HS</button>
//                 <button onclick="ham_11_1_ve_quan_ly_thong_bao()" style="padding: 12px 20px; background: #fd7e14; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: bold; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">📢 Thông Báo</button>
//                 <button onclick="ham_12_1_ve_quan_ly_tin_nhan()" style="padding: 12px 20px; background: #0ea5e9; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: bold; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">💬 Hộp Thư</button>
//                 <button onclick="ham_9_1_tab_live_quiz()" style="padding: 12px 20px; background: #e74c3c; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: bold; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">🔴 Live Quiz</button>
//             </div>

//             <div id="vung-lam-viec-chi-tiet" style="margin-top: 30px; padding: 20px; background: #f8f9fa; border-radius: 8px; border: 1px dashed #ccc; min-height: 200px;">
//                 <p style="color: #6c757d; text-align: center; margin-top: 80px;">Bấm vào các nút chức năng bên trên để bắt đầu làm việc...</p>
//             </div>
//         </div>
//     `;

//     if (window.dongHoThanhChay) clearInterval(window.dongHoThanhChay);
//     ham_3_2_ve_thanh_chay_nop_bai();
//     window.dongHoThanhChay = setInterval(ham_3_2_ve_thanh_chay_nop_bai, 60000);
// }


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

    const btnStyle = "padding: 15px 25px; border: none; border-radius: 8px; cursor: pointer; font-size: 15px; font-weight: bold; box-shadow: 0 2px 5px rgba(0,0,0,0.2); transition: 0.2s; color: white;";

    dashboard.innerHTML = `
        <div style="background: white; padding: 25px; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
            <h2 style="color: #0056b3; margin-top: 0;">BẢNG ĐIỀU KHIỂN QUẢN TRỊ</h2>
            <p style="font-size: 16px; color: #495057;">Chào mừng quay trở lại, hệ thống đã sẵn sàng làm việc!</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">

            <h4 style="color: #555; margin-bottom: 15px;">📚 QUẢN LÝ KHO HỌC LIỆU</h4>
            <div style="display: flex; gap: 15px; flex-wrap: wrap; margin-bottom: 25px;">
                <button onclick="ham_6a_1_ve_quan_ly_hoc_lieu_trac_nghiem()" style="${btnStyle} background: #20c997;">✅ Trắc Nghiệm</button>
                <button onclick="ham_6b_1_ve_quan_ly_hoc_lieu_tu_luan()" style="${btnStyle} background: #28a745;">📝 Tự Luận</button>
                <button onclick="" style="${btnStyle} background: #0056b3;">📖 Đọc Bài</button>
                <button onclick="" style="${btnStyle} background: #6f42c1;">📊 Khảo Sát</button>
                
                <button onclick="ham_3_6_xem_muc_luc_sgk()" style="${btnStyle} background: #fd7e14;">📚 SGK</button>

                <button onclick="ham_3_12_xem_kho_cau_hoi()" style="${btnStyle} background: #fd7e14;">📚 Kho câu hỏi</button>
            </div>

            <h4 style="color: #555; margin-bottom: 15px;">🚀 QUẢN LÝ NHIỆM VỤ</h4>
            <div style="display: flex; gap: 15px; flex-wrap: wrap; margin-bottom: 25px;">
                <button onclick="ham_7a_1_ve_quan_ly_nhiem_vu_trac_nghiem()" style="${btnStyle} background: #ca6f1e;">✅ NV Trắc Nghiệm</button>
                <button onclick="ham_7b_1_ve_quan_ly_nhiem_vu_tu_luan()" style="${btnStyle} background: #d68910;">📝 NV Tự Luận</button>
                <button onclick="ham_7_3_nv_doc_bai()" style="${btnStyle} background: #7f8c8d;">📖 NV Đọc Bài</button>
                <button onclick="ham_7_4_nv_khao_sat()" style="${btnStyle} background: #c0392b;">📊 NV Khảo Sát</button>
            </div>

            <h4 style="color: #555; margin-bottom: 15px;">⚙️ CHỨC NĂNG KHÁC</h4>
            <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                <button onclick="ham_14_1_ve_tab_duyet_don()" style="padding: 12px 20px; background: #ffc107; color: #000; border: none; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: bold; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">📩 Duyệt Yêu Cầu</button>
                <button onclick="ham_4_1_ve_quan_ly_lop()" style="padding: 12px 20px; background: #6c757d; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: bold; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">🏫 Quản Lý Lớp</button>
                <button onclick="ham_5_1_ve_quan_ly_hoc_sinh()" style="padding: 12px 20px; background: #6f42c1; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: bold; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">🎓 Quản Lý HS</button>
                <button onclick="ham_11_1_ve_quan_ly_thong_bao()" style="padding: 12px 20px; background: #fd7e14; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: bold; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">📢 Thông Báo</button>
                <button onclick="ham_12_1_ve_quan_ly_tin_nhan()" style="padding: 12px 20px; background: #0ea5e9; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: bold; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">💬 Hộp Thư</button>
                <button onclick="ham_9_1_tab_live_quiz()" style="padding: 12px 20px; background: #e74c3c; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: bold; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">🔴 Live Quiz</button>
                
                <button onclick="ham_3_8_ve_cai_dat_he_thong()" style="padding: 12px 20px; background: #34495e; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: bold; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">⚙️ Cài Đặt Hệ Thống</button>
            </div>

            <div id="vung-lam-viec-chi-tiet" style="margin-top: 30px; padding: 20px; background: #f8f9fa; border-radius: 8px; border: 1px dashed #ccc; min-height: 200px;">
                <p style="color: #6c757d; text-align: center; margin-top: 80px;">Bấm vào các nút chức năng bên trên để bắt đầu làm việc...</p>
            </div>
        </div>
    `;

    if (window.dongHoThanhChay) clearInterval(window.dongHoThanhChay);
    ham_3_2_ve_thanh_chay_nop_bai();
    window.dongHoThanhChay = setInterval(ham_3_2_ve_thanh_chay_nop_bai, 60000);
}




//// =====================================================================
//// [ĐÃ SỬA] - Hàm 3.2: Vẽ thanh chạy lấy API trực tiếp từ Supabase (Lọc bỏ phòng LIVE)
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

        // 2. Gọi kết quả thi, JOIN với hoc_sinh và nhiem_vu
        // 🌟 ĐÃ THÊM BỘ LỌC: &ma_nhiem_vu=not.ilike.LIVE_* (Loại bỏ các mã bắt đầu bằng chữ LIVE)
        const querySelect = "tong_diem,thoi_gian_nop,hoc_sinh!uid_hoc_sinh(ten),nhiem_vu_trac_nghiem(ten_nhiem_vu,danh_sach_lop)";
        const fullAPI_Link = `${SUPABASE_URL}/rest/v1/ket_qua_trac_nghiem?select=${querySelect}&ma_nhiem_vu=not.ilike.LIVE_*&order=thoi_gian_nop.desc&limit=50`;

        const response = await fetch(fullAPI_Link, { method: 'GET', headers: headersAPI });

        if (!response.ok) throw new Error("Lỗi fetch bảng Kết quả thi");
        const data = await response.json();

        if (!data || data.length === 0) return;

        // 3. Dịch dữ liệu và nhúng vào HTML
        let chuoiNoiDung = data.map(row => {
            let diemDb = row.tong_diem !== null ? row.tong_diem : 0;
            let diemHienThi = Number(diemDb).toFixed(2).replace(/\.00$/, '');
            let thoiGianHienThi = ham_3_7_tinh_thoi_gian_truoc_day(row.thoi_gian_nop);

            let tenHS = (row.hoc_sinh && row.hoc_sinh.ten) ? row.hoc_sinh.ten : "Ẩn danh";
            // SỬA CHỖ NÀY: Dùng row.nhiem_vu_trac_nghiem thay vì row.nhiem_vu
            let tenNhiemVu = (row.nhiem_vu_trac_nghiem && row.nhiem_vu_trac_nghiem.ten_nhiem_vu)
                ? row.nhiem_vu_trac_nghiem.ten_nhiem_vu
                : "(Chưa đặt tên)";

            let lopHienThi = "--";
            if (row.nhiem_vu && Array.isArray(row.nhiem_vu.danh_sach_lop)) {
                let mangTenLop = row.nhiem_vu.danh_sach_lop.map(ma => tuDienLop[ma] || ma);
                lopHienThi = mangTenLop.join(", ");
            }

            // return `
            //     <span style="margin-right: 60px; font-family: Arial, sans-serif; display: inline-block;">
            //         <i style="color: #ffd700;">🔥</i> 
            //         Học sinh <b>${tenHS}</b> (<span style="color: #38bdf8;">${lopHienThi}</span>) 
            //         vừa nộp <b>${tenNhiemVu}</b> - 
            //         Điểm: <span style="color: #4ade80; font-weight: bold;">${diemHienThi}</span> 
            //         <span style="color: #94a3b8; margin-left: 6px; background: #334155; padding: 1px 4px; border-radius: 3px;">⏱️ ${thoiGianHienThi}</span>
            //     </span>
            // `;
            return `
                <span style="margin-right: 60px; font-family: Arial, sans-serif; display: inline-block; font-size: 14px;">
                    <i style="color: #ffd700;">🔥</i> 
                    Học sinh <b style="color: #ff9f43; text-shadow: 0 0 5px rgba(255, 159, 67, 0.4);">${tenHS}</b> 
                    (<span style="color: #38bdf8;">${lopHienThi}</span>) 
                    vừa nộp <b style="color: #feca57; text-shadow: 0 0 5px rgba(254, 202, 87, 0.4);">${tenNhiemVu}</b> - 
                    Điểm: <span style="color: #4ade80; font-weight: bold; font-size: 15px;">${diemHienThi}</span> 
                    <span style="color: #94a3b8; margin-left: 6px; background: #334155; padding: 2px 6px; border-radius: 4px; font-size: 12px;">⏱️ ${thoiGianHienThi}</span>
                </span>
            `;
        }).join("");

        ham_3_3_ve_khung_html_thanh_chay(chuoiNoiDung);

    } catch (error) {
        console.warn("⚠️ [Thanh chạy Live Admin bị gián đoạn]:", error.message);
    }
}

//// =====================================================================
//// [Nhãn thời gian: 17:00 - Ngày 10/06/2026] - Hàm phụ trợ: Vẽ khung chứa thanh chạy Admin (Dưới đáy - Font 10px)
//// =====================================================================
function ham_3_3_ve_khung_html_thanh_chay(chuoiHienThi) {
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

function ham_3_4_ve_giao_dien_thanh_chay_ao() {
    let noiDungAo = `
        <span style="margin-right: 70px; font-family: Arial, sans-serif; font-size: 14px; display: inline-block;">
            <i style="color: #ffd700;">🔥</i> 
            Học sinh <b>Dữ liệu Đang lỗi</b> (<span style="color: #38bdf8;">--</span>) vừa nộp <b>--</b> - Điểm: <span style="color: #4ade80; font-weight: bold; font-size: 16px;">0.0</span> <span style="color: #94a3b8; font-size: 12px; margin-left: 6px; background: #334155; padding: 2px 6px; border-radius: 4px;">⏱️ Vừa xong</span>
        </span>`;
    ham_3_3_ve_khung_html_thanh_chay(noiDungAo);
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




// ==============================================================================
// KHỐI 15: QUẢN TRỊ CÀI ĐẶT HỆ THỐNG
// ==============================================================================

window.AppConfig = {}; // Lưu trữ cấu hình toàn cục
window.dsCaiDatGoc = [];



//// =====================================================================
//// Hàm 3.5: Lưu một thông số cài đặt lên Database (Đã bẫy lỗi triệt để)
//// =====================================================================
window.ham_3_5_luu_mot_cai_dat = async function (maCaiDat, btnElement) {
    // 1. Đọc giá trị mới nhất từ ô input/select
    const inputEl = document.getElementById('input_setting_' + maCaiDat);
    const giaTriMoi = inputEl.value.trim();

    if (giaTriMoi === '') {
        inputEl.focus();
        return alert("❌ Giá trị không được để trống!");
    }

    // 2. Khóa nút bấm để chống click đúp
    const oldText = btnElement.innerHTML;
    btnElement.innerHTML = "⏳...";
    btnElement.disabled = true;

    try {
        // 3. Đẩy dữ liệu mới lên Supabase
        const { error } = await _supabase.from('cai_dat_he_thong')
            .update({ gia_tri: giaTriMoi })
            .eq('ma_cai_dat', maCaiDat);

        if (error) throw error;

        // 🌟 4. CẬP NHẬT ĐỒNG BỘ TRÊN BỘ NHỚ TRÌNH DUYỆT
        window.AppConfig[maCaiDat] = giaTriMoi; // Dùng cho hệ thống

        // Tìm và cập nhật cả ở mảng gốc để vẽ lại không bị lỗi
        const itemGoc = window.dsCaiDatGoc.find(x => x.ma_cai_dat === maCaiDat);
        if (itemGoc) {
            itemGoc.gia_tri = giaTriMoi;
        }

        // 5. Hiện thông báo
        const thongBao = document.createElement('div');
        thongBao.innerHTML = `✅ Đã cập nhật tham số <b>${maCaiDat}</b> thành công!`;
        thongBao.style.cssText = "position:fixed; bottom:30px; left:50%; transform:translateX(-50%); background:#28a745; color:white; padding:15px 30px; border-radius:50px; font-weight:bold; box-shadow:0 4px 15px rgba(0,0,0,0.2); z-index:9999; animation: fadeup 0.3s;";
        document.body.appendChild(thongBao);
        setTimeout(() => document.body.removeChild(thongBao), 2500);

    } catch (error) {
        alert("❌ Lỗi khi lưu cài đặt: " + error.message);
    } finally {
        // 6. Trả lại nút bấm như cũ
        btnElement.innerHTML = oldText;
        btnElement.disabled = false;
    }
};

// =====================================================================
// 1. Hàm vẽ giao diện và quét cây thư mục từ Drive (ĐÃ THÊM KÉO THẢ)
// =====================================================================
window.ham_3_6_xem_muc_luc_sgk = async function () {
    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet') || document.getElementById('vung-lam-viec-hoc-sinh');
    if (!vungLamViec) return;

    vungLamViec.innerHTML = `<div style="text-align:center; padding:50px;"><h3 style="color:#fd7e14;">⏳ Đang quét dữ liệu từ Google Drive...</h3></div>`;

    try {
        // ==============================================================
        // 🌟 CHỈNH SỬA ĐOẠN NÀY: GỌI API TỔNG HỢP VÀ KÈM ACTION
        // ==============================================================
        const API_GOC = CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP;
        if (!API_GOC) throw new Error("Chưa cấu hình URL_APPS_SCRIPT_API_TONG_HOP trong CFG_HE_THONG!");

        const URL_GAS = API_GOC + "?action=layCayThuMucHocLieuTuLuan"; // Nối thêm lệnh để Google Script hiểu

        const response = await fetch(URL_GAS);
        const result = await response.json();
        // ==============================================================

        if (result.status === 'error') throw new Error(result.message);
        // Hàm đệ quy đếm TỔNG SỐ FILE
        function demTongSoFile(node) {
            if (node.type === 'file') return 1;
            let count = 0;
            if (node.children) {
                for (let i = 0; i < node.children.length; i++) {
                    count += demTongSoFile(node.children[i]);
                }
            }
            return count;
        }

        // Hàm đệ quy vẽ HTML sơ đồ cây
        function veCayHTML(node) {
            if (node.type === 'file') {
                let icon = '📄';
                let fileMime = node.mimeType || '';
                if (fileMime.includes('image')) icon = '🖼️';
                else if (fileMime.includes('pdf')) icon = '📕';
                else if (fileMime.includes('word') || fileMime.includes('document')) icon = '📝';

                return `<div class="tree-file-item" onclick="ham_3_9_xem_file_drive('${node.id}', '${node.name}', '${fileMime}')">${icon} ${node.name}</div>`;
            }

            let htmlChildren = node.children.map(child => veCayHTML(child)).join('');
            let tongSoFile = demTongSoFile(node);
            let textSoFile = tongSoFile > 0 ? ` <span style="font-size: 11px; color: #888; font-weight: normal;">(${tongSoFile} tệp)</span>` : '';

            return `
                <details>
                    <summary>${node.name}${textSoFile}</summary>
                    <div style="padding-left: 10px; margin-top: 5px;">
                        ${htmlChildren}
                    </div>
                </details>
            `;
        }

        const htmlCayThuMuc = veCayHTML(result.data);

        // THÊM CSS HOVER CHO THANH KÉO (SPLITTER)
        const styleCSS = `
            <style>
                .tree-container details { margin-bottom: 8px; }
                .tree-container summary { font-weight: bold; cursor: pointer; padding: 10px; background: #f1f3f5; border-radius: 6px; list-style: none; font-size: 15px; border: 1px solid #e9ecef;}
                .tree-container summary:hover { background: #e2e6ea; }
                .tree-container summary::before { content: '📁 '; }
                .tree-container details[open] > summary::before { content: '📂 '; }
                .tree-container details[open] > summary { color: #fd7e14; }
                
                .tree-file-item { padding: 8px 10px 8px 25px; cursor: pointer; color: #0056b3; font-size: 14px; border-radius: 4px; margin-top: 3px; border-left: 2px dashed #ced4da; margin-left: 12px; transition: 0.2s;}
                .tree-file-item:hover { background: #e8f0fe; color: #004494; font-weight: 500; border-left-color: #0056b3; }

                /* CSS cho Thanh Kéo 9 chấm */
                #drag-splitter:hover .splitter-icon { background: #ced4da !important; color: #343a40 !important; }
            </style>
        `;

        vungLamViec.innerHTML = `
            ${styleCSS}
            <div style="margin-bottom: 20px; display: flex; align-items: center; gap: 15px;">
                <button onclick="ham_6a_1_ve_quan_ly_hoc_lieu_trac_nghiem()" style="padding: 8px 15px; cursor:pointer; border-radius: 6px; border: 1px solid #ccc; background: white;">⬅️ Quay lại</button>
                <h3 style="color: #fd7e14; margin: 0;">📚 KHO TÀI LIỆU SÁCH GIÁO KHOA (DRIVE)</h3>
            </div>
            
            <div style="display: flex; align-items: stretch; gap: 10px; width: 100%;">
                
                <div id="tree-panel" class="tree-container" style="width: 320px; flex-shrink: 0; border: 1px solid #dee2e6; border-radius: 8px; padding: 15px; background: white; box-shadow: 0 2px 10px rgba(0,0,0,0.05); max-height: 750px; overflow-y: auto;">
                    ${htmlCayThuMuc}
                </div>

                <div id="drag-splitter" style="width: 15px; display: flex; align-items: center; justify-content: center; cursor: col-resize; flex-shrink: 0;" title="Kéo để thay đổi độ rộng">
                    <div class="splitter-icon" style="padding: 15px 4px; background: #e9ecef; border-radius: 4px; color: #6c757d; transition: 0.2s; display: flex; align-items: center;">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                            <circle cx="2" cy="2" r="1.5"/><circle cx="6" cy="2" r="1.5"/><circle cx="10" cy="2" r="1.5"/>
                            <circle cx="2" cy="6" r="1.5"/><circle cx="6" cy="6" r="1.5"/><circle cx="10" cy="6" r="1.5"/>
                            <circle cx="2" cy="10" r="1.5"/><circle cx="6" cy="10" r="1.5"/><circle cx="10" cy="10" r="1.5"/>
                        </svg>
                    </div>
                </div>

                <div id="content-panel" style="flex: 1; min-width: 300px; border: 1px solid #dee2e6; border-radius: 8px; padding: 25px; background: #f8f9fa; min-height: 600px; box-shadow: 0 2px 10px rgba(0,0,0,0.02);">
                    <h4 id="tieu-de-anh-sgk" style="margin-top: 0; color: #495057; border-bottom: 2px dashed #dee2e6; padding-bottom: 15px;">
                        👈 Bấm vào một Tệp tin bên trái để xem nội dung
                    </h4>
                    <div id="khung-hien-thi-anh-sgk" style="text-align: center; margin-top: 20px;"></div>
                </div>
            </div>
        `;

        // ==================================================
        // KÍCH HOẠT SỰ KIỆN KÉO THẢ (DRAG TO RESIZE)
        // ==================================================
        const splitter = document.getElementById('drag-splitter');
        const treePanel = document.getElementById('tree-panel');
        let isResizing = false;

        const startResize = (e) => {
            isResizing = true;
            document.body.style.cursor = 'col-resize';
            document.body.style.userSelect = 'none'; // Ngăn bôi đen chữ khi đang kéo

            document.addEventListener('mousemove', doResize);
            document.addEventListener('mouseup', stopResize);
        };

        const doResize = (e) => {
            if (!isResizing) return;
            // Tính toán chiều rộng mới dựa trên vị trí chuột
            const containerLeft = treePanel.parentElement.getBoundingClientRect().left;
            let newWidth = e.clientX - containerLeft;

            // Giới hạn thu phóng: Cột trái tối thiểu 200px, tối đa 800px
            if (newWidth >= 200 && newWidth <= 800) {
                treePanel.style.width = newWidth + 'px';
            }
        };

        const stopResize = () => {
            isResizing = false;
            document.body.style.cursor = '';
            document.body.style.userSelect = '';

            document.removeEventListener('mousemove', doResize);
            document.removeEventListener('mouseup', stopResize);
        };

        splitter.addEventListener('mousedown', startResize);

    } catch (error) {
        console.error("Lỗi:", error);
        vungLamViec.innerHTML = `<div style="text-align:center; padding:50px;"><h3 style="color:#dc3545;">❌ Lỗi kết nối tới Google Drive! Hãy kiểm tra lại link Apps Script.</h3></div>`;
    }
};



//// =====================================================================
//// [Nhãn thời gian: 11:47 - Ngày 10/06/2026] - Hàm 3.3: Tiện ích tính thời gian (Time Ago)
//// =====================================================================
function ham_3_7_tinh_thoi_gian_truoc_day(thoiGianISO) {
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

//// =====================================================================
//// Hàm 3.4: Vẽ màn hình giao diện Cài đặt hệ thống (Đã sửa lỗi nút Lưu)
//// =====================================================================
// window.ham_3_8_ve_cai_dat_he_thong = async function () {
//     const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
//     vungLamViec.innerHTML = `<h3 style="text-align:center; color:#555; margin-top:50px;">⏳ Đang tải thông số hệ thống...</h3>`;

//     try {
//         const { data, error } = await _supabase.from('cai_dat_he_thong').select('*').order('nhom');
//         if (error) throw error;

//         window.dsCaiDatGoc = data || [];

//         window.dsCaiDatGoc.forEach(item => {
//             window.AppConfig[item.ma_cai_dat] = item.gia_tri;
//         });

//         let htmlDanhSachCaiDat = '';
//         window.dsCaiDatGoc.forEach(item => {
//             let mauNhom = '#6c757d';
//             if (item.nhom === 'THI_CU') mauNhom = '#dc3545';
//             if (item.nhom === 'CHAM_DIEM') mauNhom = '#28a745';
//             if (item.nhom === 'GIAO_DIEN') mauNhom = '#007bff';
//             if (item.nhom === 'TAI_KHOAN') mauNhom = '#6f42c1';

//             let phanNhapLieu = '';

//             if (item.ma_cai_dat === 'DUYET_TAI_KHOAN_MOI') {
//                 phanNhapLieu = `
//                     <select id="input_setting_${item.ma_cai_dat}" style="padding: 10px; border: 2px solid #ced4da; border-radius: 6px; width: 200px; font-weight: bold; font-size: 15px; color: #495057; outline: none; cursor: pointer;">
//                         <option value="CHO_DUYET" ${item.gia_tri === 'CHO_DUYET' ? 'selected' : ''}>⏳ Chờ GV Duyệt</option>
//                         <option value="TU_DONG" ${item.gia_tri === 'TU_DONG' ? 'selected' : ''}>✅ Tự động duyệt</option>
//                     </select>
//                 `;
//             } else {
//                 phanNhapLieu = `
//                     <input type="text" id="input_setting_${item.ma_cai_dat}" value="${item.gia_tri}" style="padding: 10px; border: 2px solid #ced4da; border-radius: 6px; width: 200px; font-weight: bold; font-size: 15px; color: #495057; outline: none; transition: 0.2s;" onfocus="this.style.borderColor='#34495e'" onblur="this.style.borderColor='#ced4da'">
//                 `;
//             }

//             htmlDanhSachCaiDat += `
//                 <div style="display: flex; justify-content: space-between; align-items: center; padding: 20px 15px; border-bottom: 1px dashed #ccc; transition: 0.2s;" onmouseover="this.style.background='#f8f9fa'" onmouseout="this.style.background='transparent'">
//                     <div style="flex: 1;">
//                         <div style="font-weight: bold; color: #333; font-size: 16px; margin-bottom: 4px;">
//                             ${item.mo_ta}
//                         </div>
//                         <div style="display: flex; gap: 10px; align-items: center;">
//                             <span style="font-size: 11px; background: ${mauNhom}; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold;">${item.nhom}</span>
//                             <span style="font-size: 12px; color: #888; font-family: monospace; background: #e9ecef; padding: 2px 6px; border-radius: 4px;">${item.ma_cai_dat}</span>
//                         </div>
//                     </div>

//                     <div style="display: flex; gap: 10px; align-items: center;">
//                         ${phanNhapLieu}

//                         <button onclick="ham_3_5_luu_mot_cai_dat('${item.ma_cai_dat}', this)" style="padding: 10px 20px; background: #34495e; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 14px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: 0.2s;" onmouseover="this.style.background='#2c3e50'" onmouseout="this.style.background='#34495e'">
//                             💾 LƯU
//                         </button>
//                     </div>
//                 </div>
//             `;
//         });

//         vungLamViec.innerHTML = `
//             <div style="max-width: 900px; margin: 0 auto; background: white; border-radius: 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); overflow: hidden; animation: fadein 0.4s;">
//                 <div style="background: #34495e; padding: 20px; text-align: center; border-bottom: 4px solid #2c3e50;">
//                     <h2 style="margin: 0; color: white; font-size: 22px;">⚙️ BẢNG ĐIỀU KHIỂN HỆ THỐNG</h2>
//                     <div style="color: #bdc3c7; font-size: 13px; margin-top: 5px;">Điều chỉnh các tham số cốt lõi (Có tác dụng ngay lập tức trên toàn hệ thống)</div>
//                 </div>

//                 <div style="padding: 10px 20px 30px 20px;">
//                     ${htmlDanhSachCaiDat}
//                 </div>
//             </div>
//         `;

//     } catch (error) {
//         vungLamViec.innerHTML = `<div style="color:red; text-align:center; padding:50px;">❌ Lỗi kết nối CSDL: ${error.message}</div>`;
//     }
// };


//// =====================================================================
//// Hàm 3.4: Vẽ màn hình giao diện Cài đặt hệ thống (Đã làm Responsive Mobile)
//// =====================================================================
window.ham_3_8_ve_cai_dat_he_thong = async function () {
    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
    vungLamViec.innerHTML = `<h3 style="text-align:center; color:#555; margin-top:50px;">⏳ Đang tải thông số hệ thống...</h3>`;

    try {
        const { data, error } = await _supabase.from('cai_dat_he_thong').select('*').order('nhom');
        if (error) throw error;

        window.dsCaiDatGoc = data || [];

        window.dsCaiDatGoc.forEach(item => {
            window.AppConfig[item.ma_cai_dat] = item.gia_tri;
        });

        let htmlDanhSachCaiDat = '';
        window.dsCaiDatGoc.forEach(item => {
            let mauNhom = '#6c757d';
            if (item.nhom === 'THI_CU') mauNhom = '#dc3545';
            if (item.nhom === 'CHAM_DIEM') mauNhom = '#28a745';
            if (item.nhom === 'GIAO_DIEN') mauNhom = '#007bff';
            if (item.nhom === 'TAI_KHOAN') mauNhom = '#6f42c1';

            let phanNhapLieu = '';

            // 🌟 ĐÃ SỬA: Thay width: 200px thành width: 100%; max-width: 200px; min-width: 150px;
            if (item.ma_cai_dat === 'DUYET_TAI_KHOAN_MOI') {
                phanNhapLieu = `
                    <select id="input_setting_${item.ma_cai_dat}" style="padding: 10px; border: 2px solid #ced4da; border-radius: 6px; width: 100%; max-width: 200px; min-width: 150px; font-weight: bold; font-size: 15px; color: #495057; outline: none; cursor: pointer;">
                        <option value="CHO_DUYET" ${item.gia_tri === 'CHO_DUYET' ? 'selected' : ''}>⏳ Chờ GV Duyệt</option>
                        <option value="TU_DONG" ${item.gia_tri === 'TU_DONG' ? 'selected' : ''}>✅ Tự động duyệt</option>
                    </select>
                `;
            } else {
                phanNhapLieu = `
                    <input type="text" id="input_setting_${item.ma_cai_dat}" value="${item.gia_tri}" style="padding: 10px; border: 2px solid #ced4da; border-radius: 6px; width: 100%; max-width: 200px; min-width: 150px; font-weight: bold; font-size: 15px; color: #495057; outline: none; transition: 0.2s;" onfocus="this.style.borderColor='#34495e'" onblur="this.style.borderColor='#ced4da'">
                `;
            }

            // 🌟 ĐÃ SỬA: Thêm flex-wrap: wrap và flex: 1 1 250px để khung chữ và nút tự rớt dòng trên màn hẹp
            htmlDanhSachCaiDat += `
                <div style="display: flex; flex-wrap: wrap; gap: 15px; justify-content: space-between; align-items: center; padding: 20px 15px; border-bottom: 1px dashed #ccc; transition: 0.2s;" onmouseover="this.style.background='#f8f9fa'" onmouseout="this.style.background='transparent'">
                    <div style="flex: 1 1 250px; min-width: 200px;">
                        <div style="font-weight: bold; color: #333; font-size: 16px; margin-bottom: 4px;">
                            ${item.mo_ta}
                        </div>
                        <div style="display: flex; flex-wrap: wrap; gap: 10px; align-items: center;">
                            <span style="font-size: 11px; background: ${mauNhom}; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold;">${item.nhom}</span>
                            <span style="font-size: 12px; color: #888; font-family: monospace; background: #e9ecef; padding: 2px 6px; border-radius: 4px;">${item.ma_cai_dat}</span>
                        </div>
                    </div>
                    
                    <div style="display: flex; flex-wrap: wrap; gap: 10px; align-items: center; flex: 1 1 auto; justify-content: flex-start;">
                        ${phanNhapLieu}
                        
                        <button onclick="ham_3_5_luu_mot_cai_dat('${item.ma_cai_dat}', this)" style="padding: 10px 20px; background: #34495e; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 14px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: 0.2s; white-space: nowrap;" onmouseover="this.style.background='#2c3e50'" onmouseout="this.style.background='#34495e'">
                            💾 LƯU
                        </button>
                    </div>
                </div>
            `;
        });

        vungLamViec.innerHTML = `
            <div style="max-width: 900px; margin: 0 auto; background: white; border-radius: 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); overflow: hidden; animation: fadein 0.4s;">
                <div style="background: #34495e; padding: 20px; text-align: center; border-bottom: 4px solid #2c3e50;">
                    <h2 style="margin: 0; color: white; font-size: 22px;">⚙️ BẢNG ĐIỀU KHIỂN HỆ THỐNG</h2>
                    <div style="color: #bdc3c7; font-size: 13px; margin-top: 5px;">Điều chỉnh các tham số cốt lõi (Có tác dụng ngay lập tức trên toàn hệ thống)</div>
                </div>
                
                <div style="padding: 10px 20px 30px 20px; overflow-x: auto;">
                    ${htmlDanhSachCaiDat}
                </div>
            </div>
        `;

    } catch (error) {
        vungLamViec.innerHTML = `<div style="color:red; text-align:center; padding:50px;">❌ Lỗi kết nối CSDL: ${error.message}</div>`;
    }
};

// =====================================================================
// 2. Hàm nhúng file Drive sang bên phải 
// (ẢNH: Dùng Zoom tuỳ chỉnh | PDF/WORD: Dùng Trình xem mặc định Google Drive)
// =====================================================================
window.ham_3_9_xem_file_drive = function (fileId, fileName, mimeType) {
    document.getElementById('tieu-de-anh-sgk').innerHTML = `<span style="color: #fd7e14;">Đang xem:</span> ${fileName}`;
    const khungAnh = document.getElementById('khung-hien-thi-anh-sgk');

    khungAnh.innerHTML = '<p style="color: #0056b3; font-weight: bold;">⏳ Đang tải tài liệu...</p>';

    setTimeout(() => {
        // TRƯỜNG HỢP 1: NẾU LÀ ẢNH -> DÙNG BỘ CÔNG CỤ ZOOM/PAN THỦ CÔNG
        if (mimeType.includes('image')) {
            khungAnh.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <span style="font-size: 13px; color: #6c757d; font-style: italic;">
                        💡 Lăn chuột để Thu/Phóng - Nhấn giữ chuột để kéo ảnh
                    </span>
                    <div>
                        <button onclick="ham_3_10_zoom_anh(0.2)" style="padding: 4px 10px; cursor: pointer; border-radius: 4px; border: 1px solid #ccc; background: white; margin-right: 5px;">➕ Lớn</button>
                        <button onclick="ham_3_10_zoom_anh(-0.2)" style="padding: 4px 10px; cursor: pointer; border-radius: 4px; border: 1px solid #ccc; background: white; margin-right: 5px;">➖ Nhỏ</button>
                        <button onclick="ham_3_10_zoom_anh(0, true)" style="padding: 4px 10px; cursor: pointer; border-radius: 4px; border: 1px solid #ccc; background: white;">🔄 Đặt lại</button>
                    </div>
                </div>
                
                <div id="khung-chua-anh" style="width: 100%; height: 650px; overflow: hidden; border: 1px solid #dee2e6; border-radius: 8px; background: #e9ecef; position: relative; cursor: grab; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                    <img id="anh-sgk-zoom" src="https://drive.google.com/thumbnail?id=${fileId}&sz=w2000" 
                         alt="${fileName}" 
                         style="max-width: 100%; max-height: 100%; transform: scale(1) translate(0px, 0px); transition: transform 0.1s ease-out; transform-origin: center center; object-fit: contain;"
                         draggable="false">
                </div>
            `;

            // Kích hoạt lại tính năng lăn và kéo chuột cho ảnh
            window.ham_3_11_kichHoatZoomKeoAnh();
        }

        // TRƯỜNG HỢP 2: NẾU LÀ PDF / WORD -> TRỞ VỀ TRÌNH XEM MẶC ĐỊNH CỦA DRIVE
        else {
            khungAnh.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; background: #e8f0fe; padding: 10px 15px; border-radius: 6px; border-left: 4px solid #4285f4;">
                    <span style="font-size: 13px; color: #1a73e8;">
                        💡 Nếu tài liệu không hiển thị, hãy đảm bảo bạn đã cấu hình thư mục Drive ở chế độ "Bất kỳ ai có đường liên kết".
                    </span>
                    <a href="https://drive.google.com/file/d/${fileId}/view" target="_blank" 
                       style="padding: 6px 15px; background: #0056b3; color: white; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 13px; box-shadow: 0 2px 4px rgba(0,0,0,0.15); transition: 0.2s; white-space: nowrap;">
                       🚀 Mở to ở Tab mới
                    </a>
                </div>
                
                <iframe 
                    src="https://drive.google.com/file/d/${fileId}/preview" 
                    width="100%" 
                    height="700px" 
                    allow="fullscreen"
                    style="border: none; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.15); background: #fff;">
                </iframe>
            `;
        }
    }, 100);
};

// =====================================================================
// BỘ HÀM HỖ TRỢ XỬ LÝ ZOOM VÀ KÉO ẢNH (PAN & ZOOM)
// =====================================================================

window.anhScale = 1;
window.anhTranslateX = 0;
window.anhTranslateY = 0;

window.ham_3_10_zoom_anh = function (step, reset = false) {
    const img = document.getElementById('anh-sgk-zoom');
    if (!img) return;

    if (reset) {
        window.anhScale = 1;
        window.anhTranslateX = 0;
        window.anhTranslateY = 0;
        img.style.transition = 'transform 0.3s ease-out'; // Trả về mượt mà
    } else {
        window.anhScale += step;
        if (window.anhScale < 0.2) window.anhScale = 0.2; // Không cho thu nhỏ quá mức
        if (window.anhScale > 6) window.anhScale = 6;     // Không cho phóng to quá mức
        img.style.transition = 'transform 0.1s ease-out';
    }
    img.style.transform = `scale(${window.anhScale}) translate(${window.anhTranslateX}px, ${window.anhTranslateY}px)`;
};

window.ham_3_11_kichHoatZoomKeoAnh = function () {
    const img = document.getElementById('anh-sgk-zoom');
    const container = document.getElementById('khung-chua-anh');
    if (!img || !container) return;

    window.anhScale = 1; window.anhTranslateX = 0; window.anhTranslateY = 0;
    let isDragging = false;
    let startX, startY;

    // 1. Bắt sự kiện LĂN CHUỘT (WHEEL) để Zoom
    container.addEventListener('wheel', (e) => {
        e.preventDefault(); // Ngăn trang web cuộn lên/xuống khi đang lăn ảnh
        const step = e.deltaY > 0 ? -0.15 : 0.15;
        window.ham_3_10_zoom_anh(step);
    }, { passive: false });

    // 2. Bắt sự kiện KÉO THẢ CHUỘT (DRAG) để di chuyển ảnh
    container.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX - window.anhTranslateX * window.anhScale;
        startY = e.clientY - window.anhTranslateY * window.anhScale;
        container.style.cursor = 'grabbing';
        img.style.transition = 'none'; // Tắt hiệu ứng mượt để ảnh bám sát tay lập tức
    });

    container.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        window.anhTranslateX = (e.clientX - startX) / window.anhScale;
        window.anhTranslateY = (e.clientY - startY) / window.anhScale;
        img.style.transform = `scale(${window.anhScale}) translate(${window.anhTranslateX}px, ${window.anhTranslateY}px)`;
    });

    const stopDrag = () => {
        isDragging = false;
        container.style.cursor = 'grab';
        img.style.transition = 'transform 0.1s ease-out';
    };

    container.addEventListener('mouseup', stopDrag);
    container.addEventListener('mouseleave', stopDrag);
};


// // =====================================================================
// // [Khối 3] HÀM 3.7: XEM KHO CÂU HỎI DRIVE (VIEW CODE & RENDER)
// // =====================================================================
// window.ham_3_12_xem_kho_cau_hoi = async function () {
//     const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet') || document.getElementById('vung-lam-viec-hoc-sinh');
//     if (!vungLamViec) return;

//     vungLamViec.innerHTML = `<div style="text-align:center; padding:50px;"><h3 style="color:#fd7e14;">⏳ Đang đồng bộ Cây thư mục Kho câu hỏi...</h3></div>`;

//     try {
//         const API_GOC = CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP;
//         const URL_GAS = API_GOC + "?action=layCayThuMucKhoCauHoi";

//         const response = await fetch(URL_GAS);
//         const result = await response.json();

//         if (result.status === 'error') throw new Error(result.message);

//         // Hàm đệ quy vẽ HTML sơ đồ cây
//         function veCayHTML(node) {
//             if (node.type === 'file') {
//                 if (!node.name.endsWith('.json')) return ''; // Chỉ hiện file câu hỏi JSON
//                 return `<div class="tree-file-item" onclick="ham_3_13_tai_noi_dung_cau_hoi('${node.id}', '${node.name}')">📄 ${node.name}</div>`;
//             }

//             let htmlChildren = node.children.map(child => veCayHTML(child)).join('');
//             if (!htmlChildren.trim()) return ''; // Ẩn thư mục rỗng

//             return `
//                 <details>
//                     <summary>${node.name}</summary>
//                     <div style="padding-left: 10px; margin-top: 5px;">
//                         ${htmlChildren}
//                     </div>
//                 </details>
//             `;
//         }

//         const htmlCayThuMuc = veCayHTML(result.data);

//         // Giao diện: Chia cột Trái (Tree) và Phải (Trên Code - Dưới Render)
//         vungLamViec.innerHTML = `
//             <style>
//                 .tree-container details { margin-bottom: 8px; }
//                 .tree-container summary { font-weight: bold; cursor: pointer; padding: 10px; background: #f1f3f5; border-radius: 6px; list-style: none; font-size: 14px; border: 1px solid #e9ecef;}
//                 .tree-container summary:hover { background: #e2e6ea; }
//                 .tree-container summary::before { content: '📁 '; }
//                 .tree-container details[open] > summary::before { content: '📂 '; }
//                 .tree-container details[open] > summary { color: #fd7e14; }
                
//                 .tree-file-item { padding: 6px 10px 6px 25px; cursor: pointer; color: #0056b3; font-size: 13px; border-radius: 4px; margin-top: 3px; border-left: 2px dashed #ced4da; margin-left: 12px; transition: 0.2s;}
//                 .tree-file-item:hover { background: #e8f0fe; color: #004494; font-weight: bold; border-left-color: #0056b3; }
//             </style>
            
//             <div style="margin-bottom: 20px; display: flex; align-items: center; gap: 15px;">
//                 <button onclick="ham_3_1_ve_dashboard_admin()" style="padding: 8px 15px; cursor:pointer; border-radius: 6px; border: 1px solid #ccc; background: white;">⬅️ Quay lại</button>
//                 <h3 style="color: #fd7e14; margin: 0;">📚 KHÁM PHÁ KHO CÂU HỎI TRÊN MÂY</h3>
//             </div>
            
//             <div style="display: flex; gap: 15px; height: 750px;">
//                 <div id="tree-panel" class="tree-container" style="width: 320px; flex-shrink: 0; border: 1px solid #dee2e6; border-radius: 8px; padding: 15px; background: white; box-shadow: 0 2px 10px rgba(0,0,0,0.05); overflow-y: auto;">
//                     ${htmlCayThuMuc}
//                 </div>

//                 <div style="flex: 1; display: flex; flex-direction: column; gap: 15px;">
                    
//                     <div style="flex: 3; border: 1px solid #dee2e6; border-radius: 8px; background: #282c34; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
//                         <div style="background: #21252b; padding: 10px 15px; color: #abb2bf; font-weight: bold; font-size: 13px; border-bottom: 1px solid #181a1f; display:flex; justify-content:space-between;">
//                             <span id="lbl-ten-file-code">💻 Dữ liệu thô (JSON/LaTeX)</span>
//                         </div>
//                         <textarea id="khung-code-json" readonly style="flex:1; width:100%; background:transparent; color:#98c379; border:none; padding:15px; font-family: Consolas, monospace; font-size: 14px; outline:none; resize:none; overflow-y:auto; line-height: 1.5;"></textarea>
//                     </div>

//                     <div style="flex: 7; border: 1px solid #dee2e6; border-radius: 8px; background: white; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
//                         <div style="background: #f8f9fa; padding: 10px 15px; color: #333; font-weight: bold; font-size: 13px; border-bottom: 1px solid #dee2e6;">
//                             👁️ Hiển thị thực tế
//                         </div>
//                         <div id="khung-render-cau-hoi" style="flex: 1; padding: 20px; overflow-y: auto; font-size: 15px; line-height: 1.6; color: #333;">
//                             <div style="color:#999; text-align:center; margin-top:50px;">👈 Bấm vào một file JSON bên trái để xem nội dung</div>
//                         </div>
//                     </div>

//                 </div>
//             </div>
//         `;
//     } catch (error) {
//         vungLamViec.innerHTML = `<div style="text-align:center; padding:50px;"><h3 style="color:#dc3545;">❌ Lỗi kết nối API: ${error.message}</h3></div>`;
//     }
// };


// =====================================================================
// [Khối 3] HÀM 3.7: XEM KHO CÂU HỎI DRIVE (VIEW CODE & RENDER) - CÓ KÉO THẢ
// =====================================================================
// window.ham_3_12_xem_kho_cau_hoi = async function () {
//     const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet') || document.getElementById('vung-lam-viec-hoc-sinh');
//     if (!vungLamViec) return;

//     vungLamViec.innerHTML = `<div style="text-align:center; padding:50px;"><h3 style="color:#fd7e14;">⏳ Đang đồng bộ Cây thư mục Kho câu hỏi...</h3></div>`;

//     try {
//         const API_GOC = CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP;
//         const URL_GAS = API_GOC + "?action=layCayThuMucKhoCauHoi";

//         const response = await fetch(URL_GAS);
//         const result = await response.json();

//         if (result.status === 'error') throw new Error(result.message);

//         // Hàm đệ quy vẽ HTML sơ đồ cây
//         function veCayHTML(node) {
//             if (node.type === 'file') {
//                 // Hiển thị file JSON
//                 if (node.name.endsWith('.json')) {
//                     return `<div class="tree-file-item" onclick="ham_3_13_tai_noi_dung_cau_hoi('${node.id}', '${node.name}', 'json')">📄 ${node.name}</div>`;
//                 }
//                 // Hiển thị file Ảnh
//                 else if (node.name.toLowerCase().endsWith('.png') || node.name.toLowerCase().endsWith('.jpg') || node.name.toLowerCase().endsWith('.jpeg')) {
//                     // Đổi màu xanh lá cho icon ảnh để dễ phân biệt
//                     return `<div class="tree-file-item" style="color: #28a745; border-left-color: #28a745;" onclick="ham_3_13_tai_noi_dung_cau_hoi('${node.id}', '${node.name}', 'image')">🖼️ ${node.name}</div>`;
//                 }
//                 // Ẩn các định dạng khác không liên quan
//                 return '';
//             }

//             let htmlChildren = node.children.map(child => veCayHTML(child)).join('');
//             if (!htmlChildren.trim()) return ''; // Ẩn thư mục rỗng

//             // Đổi icon thư mục PICTURES cho đẹp mắt
//             let tenThuMuc = node.name === 'PICTURES' ? '🌄 PICTURES (Ảnh gốc)' : node.name;

//             return `
//                 <details>
//                     <summary>${tenThuMuc}</summary>
//                     <div style="padding-left: 10px; margin-top: 5px;">
//                         ${htmlChildren}
//                     </div>
//                 </details>
//             `;
//         }

//         const htmlCayThuMuc = veCayHTML(result.data);

//         // Giao diện: Chia cột Trái (Tree) | Thanh Kéo | Phải (Trên Code - Dưới Render)
//         vungLamViec.innerHTML = `
//             <style>
//                 .tree-container details { margin-bottom: 8px; }
//                 .tree-container summary { font-weight: bold; cursor: pointer; padding: 10px; background: #f1f3f5; border-radius: 6px; list-style: none; font-size: 14px; border: 1px solid #e9ecef;}
//                 .tree-container summary:hover { background: #e2e6ea; }
//                 .tree-container summary::before { content: '📁 '; }
//                 .tree-container details[open] > summary::before { content: '📂 '; }
//                 .tree-container details[open] > summary { color: #fd7e14; }
                
//                 .tree-file-item { padding: 6px 10px 6px 25px; cursor: pointer; color: #0056b3; font-size: 13px; border-radius: 4px; margin-top: 3px; border-left: 2px dashed #ced4da; margin-left: 12px; transition: 0.2s;}
//                 .tree-file-item:hover { background: #e8f0fe; color: #004494; font-weight: bold; border-left-color: #0056b3; }

//                 /* CSS hover cho thanh kéo */
//                 #drag-splitter-cau-hoi:hover .splitter-icon { background: #ced4da !important; color: #343a40 !important; }
//             </style>
            
//             <div style="margin-bottom: 20px; display: flex; align-items: center; gap: 15px;">
//                 <button onclick="ham_3_1_ve_dashboard_admin()" style="padding: 8px 15px; cursor:pointer; border-radius: 6px; border: 1px solid #ccc; background: white;">⬅️ Quay lại</button>
//                 <h3 style="color: #fd7e14; margin: 0;">📚 KHÁM PHÁ KHO CÂU HỎI TRÊN MÂY</h3>
//             </div>
            
//             <div style="display: flex; align-items: stretch; gap: 10px; height: 750px; width: 100%;">
                
//                 <div id="tree-panel-cau-hoi" class="tree-container" style="width: 320px; flex-shrink: 0; border: 1px solid #dee2e6; border-radius: 8px; padding: 15px; background: white; box-shadow: 0 2px 10px rgba(0,0,0,0.05); overflow-y: auto;">
//                     ${htmlCayThuMuc}
//                 </div>

//                 <div id="drag-splitter-cau-hoi" style="width: 15px; display: flex; align-items: center; justify-content: center; cursor: col-resize; flex-shrink: 0;" title="Kéo để thay đổi độ rộng">
//                     <div class="splitter-icon" style="padding: 15px 4px; background: #e9ecef; border-radius: 4px; color: #6c757d; transition: 0.2s; display: flex; align-items: center;">
//                         <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
//                             <circle cx="2" cy="2" r="1.5"/><circle cx="6" cy="2" r="1.5"/><circle cx="10" cy="2" r="1.5"/>
//                             <circle cx="2" cy="6" r="1.5"/><circle cx="6" cy="6" r="1.5"/><circle cx="10" cy="6" r="1.5"/>
//                             <circle cx="2" cy="10" r="1.5"/><circle cx="6" cy="10" r="1.5"/><circle cx="10" cy="10" r="1.5"/>
//                         </svg>
//                     </div>
//                 </div>

//                 <div style="flex: 1; min-width: 300px; display: flex; flex-direction: column; gap: 15px;">
                    
//                     <div id="panel-code-json" style="flex: 3; border: 1px solid #dee2e6; border-radius: 8px; background: #282c34; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
//                         <div style="background: #21252b; padding: 10px 15px; color: #abb2bf; font-weight: bold; font-size: 13px; border-bottom: 1px solid #181a1f; display:flex; justify-content:space-between;">
//                             <span id="lbl-ten-file-code">💻 Dữ liệu thô (JSON/LaTeX)</span>
//                         </div>
//                         <textarea id="khung-code-json" readonly style="flex:1; width:100%; background:transparent; color:#98c379; border:none; padding:15px; font-family: Consolas, monospace; font-size: 14px; outline:none; resize:none; overflow-y:auto; line-height: 1.5;"></textarea>
//                     </div>

//                     <div id="panel-render-ui" style="flex: 7; border: 1px solid #dee2e6; border-radius: 8px; background: white; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
//                         <div style="background: #f8f9fa; padding: 10px 15px; color: #333; font-weight: bold; font-size: 13px; border-bottom: 1px solid #dee2e6;">
//                             👁️ Hiển thị thực tế
//                         </div>
//                         <div id="khung-render-cau-hoi" style="flex: 1; padding: 20px; overflow-y: auto; font-size: 15px; line-height: 1.6; color: #333;">
//                             <div style="color:#999; text-align:center; margin-top:50px;">👈 Bấm vào một file JSON hoặc Ảnh bên trái để xem nội dung</div>
//                         </div>
//                     </div>

//                 </div>
//             </div>
//         `;

//         // ==================================================
//         // KÍCH HOẠT SỰ KIỆN KÉO THẢ (DRAG TO RESIZE)
//         // ==================================================
//         const splitter = document.getElementById('drag-splitter-cau-hoi');
//         const treePanel = document.getElementById('tree-panel-cau-hoi');
//         let isResizing = false;

//         const startResize = (e) => {
//             isResizing = true;
//             document.body.style.cursor = 'col-resize';
//             document.body.style.userSelect = 'none'; // Ngăn bôi đen chữ khi đang kéo

//             document.addEventListener('mousemove', doResize);
//             document.addEventListener('mouseup', stopResize);
//         };

//         const doResize = (e) => {
//             if (!isResizing) return;
//             // Tính toán chiều rộng mới dựa trên vị trí chuột và vị trí gốc của khung bên trái
//             const containerLeft = treePanel.parentElement.getBoundingClientRect().left;
//             let newWidth = e.clientX - containerLeft;

//             // Giới hạn thu phóng: Cột trái tối thiểu 200px, tối đa 800px
//             if (newWidth >= 200 && newWidth <= 800) {
//                 treePanel.style.width = newWidth + 'px';
//             }
//         };

//         const stopResize = () => {
//             isResizing = false;
//             document.body.style.cursor = '';
//             document.body.style.userSelect = '';

//             document.removeEventListener('mousemove', doResize);
//             document.removeEventListener('mouseup', stopResize);
//         };

//         if (splitter) {
//             splitter.addEventListener('mousedown', startResize);
//         }

//     } catch (error) {
//         vungLamViec.innerHTML = `<div style="text-align:center; padding:50px;"><h3 style="color:#dc3545;">❌ Lỗi kết nối API: ${error.message}</h3></div>`;
//     }
// };

window.ham_3_12_xem_kho_cau_hoi = async function () {
    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet') || document.getElementById('vung-lam-viec-hoc-sinh');
    if (!vungLamViec) return;

    vungLamViec.innerHTML = `<div style="text-align:center; padding:50px;"><h3 style="color:#fd7e14;">⏳ Đang đồng bộ Cây thư mục Kho câu hỏi...</h3></div>`;

    try {
        const API_GOC = CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP;
        const URL_GAS = API_GOC + "?action=layCayThuMucKhoCauHoi";

        const response = await fetch(URL_GAS);
        const result = await response.json();

        if (result.status === 'error') throw new Error(result.message);

        // Hàm đệ quy vẽ HTML sơ đồ cây
        function veCayHTML(node) {
            if (node.type === 'file') {
                // Hiển thị file JSON (TRUYỀN THÊM 'this' VÀO ĐẦU)
                if (node.name.endsWith('.json')) {
                    return `<div class="tree-file-item" onclick="ham_3_13_tai_noi_dung_cau_hoi(this, '${node.id}', '${node.name}', 'json')">📄 ${node.name}</div>`;
                }
                // Hiển thị file Ảnh (TRUYỀN THÊM 'this' VÀO ĐẦU)
                else if (node.name.toLowerCase().endsWith('.png') || node.name.toLowerCase().endsWith('.jpg') || node.name.toLowerCase().endsWith('.jpeg')) {
                    return `<div class="tree-file-item" style="color: #28a745; border-left-color: #28a745;" onclick="ham_3_13_tai_noi_dung_cau_hoi(this, '${node.id}', '${node.name}', 'image')">🖼️ ${node.name}</div>`;
                }
                return '';
            }

            let htmlChildren = node.children.map(child => veCayHTML(child)).join('');
            if (!htmlChildren.trim()) return ''; // Ẩn thư mục rỗng

            let tenThuMuc = node.name === 'PICTURES' ? '🌄 PICTURES (Ảnh gốc)' : node.name;

            return `
                <details>
                    <summary>${tenThuMuc}</summary>
                    <div style="padding-left: 10px; margin-top: 5px;">
                        ${htmlChildren}
                    </div>
                </details>
            `;
        }

        const htmlCayThuMuc = veCayHTML(result.data);

        // Giao diện: Chia cột Trái (Tree) | Thanh Kéo | Phải (Trên Code - Dưới Render)
        vungLamViec.innerHTML = `
            <style>
                .tree-container details { margin-bottom: 8px; }
                .tree-container summary { font-weight: bold; cursor: pointer; padding: 10px; background: #f1f3f5; border-radius: 6px; list-style: none; font-size: 14px; border: 1px solid #e9ecef;}
                .tree-container summary:hover { background: #e2e6ea; }
                .tree-container summary::before { content: '📁 '; }
                .tree-container details[open] > summary::before { content: '📂 '; }
                .tree-container details[open] > summary { color: #fd7e14; }
                
                .tree-file-item { padding: 6px 10px 6px 25px; cursor: pointer; color: #0056b3; font-size: 13px; border-radius: 4px; margin-top: 3px; border-left: 2px dashed #ced4da; margin-left: 12px; transition: 0.2s;}
                .tree-file-item:hover { background: #e8f0fe; color: #004494; font-weight: bold; border-left-color: #0056b3; }
                
                /* 🌟 LỚP CSS MỚI CHO ITEM ĐANG ĐƯỢC CHỌN */
                .tree-file-item.active-file { 
                    background: #1a73e8 !important;
                    color: #ffffff !important;
                    font-weight: bold !important;
                    border-left-color: #004494 !important;
                    box-shadow: 0 2px 4px rgba(26, 115, 232, 0.3) !important;
                }

                #drag-splitter-cau-hoi:hover .splitter-icon { background: #ced4da !important; color: #343a40 !important; }
            </style>
            
            <div style="margin-bottom: 20px; display: flex; align-items: center; gap: 15px;">
                <button onclick="ham_3_1_ve_dashboard_admin()" style="padding: 8px 15px; cursor:pointer; border-radius: 6px; border: 1px solid #ccc; background: white;">⬅️ Quay lại</button>
                <h3 style="color: #fd7e14; margin: 0;">📚 KHÁM PHÁ KHO CÂU HỎI TRÊN MÂY</h3>
            </div>
            
            <div style="display: flex; align-items: stretch; gap: 10px; height: 750px; width: 100%;">
                
                <div id="tree-panel-cau-hoi" class="tree-container" style="width: 320px; flex-shrink: 0; border: 1px solid #dee2e6; border-radius: 8px; padding: 15px; background: white; box-shadow: 0 2px 10px rgba(0,0,0,0.05); overflow-y: auto;">
                    ${htmlCayThuMuc}
                </div>

                <div id="drag-splitter-cau-hoi" style="width: 15px; display: flex; align-items: center; justify-content: center; cursor: col-resize; flex-shrink: 0;" title="Kéo để thay đổi độ rộng">
                    <div class="splitter-icon" style="padding: 15px 4px; background: #e9ecef; border-radius: 4px; color: #6c757d; transition: 0.2s; display: flex; align-items: center;">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                            <circle cx="2" cy="2" r="1.5"/><circle cx="6" cy="2" r="1.5"/><circle cx="10" cy="2" r="1.5"/>
                            <circle cx="2" cy="6" r="1.5"/><circle cx="6" cy="6" r="1.5"/><circle cx="10" cy="6" r="1.5"/>
                            <circle cx="2" cy="10" r="1.5"/><circle cx="6" cy="10" r="1.5"/><circle cx="10" cy="10" r="1.5"/>
                        </svg>
                    </div>
                </div>

                <div style="flex: 1; min-width: 300px; display: flex; flex-direction: column; gap: 15px;">
                    
                    <div id="panel-code-json" style="flex: 3; border: 1px solid #dee2e6; border-radius: 8px; background: #282c34; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                        <div style="background: #21252b; padding: 10px 15px; color: #abb2bf; font-weight: bold; font-size: 13px; border-bottom: 1px solid #181a1f; display:flex; justify-content:space-between;">
                            <span id="lbl-ten-file-code">💻 Dữ liệu thô (JSON/LaTeX)</span>
                        </div>
                        <textarea id="khung-code-json" readonly style="flex:1; width:100%; background:transparent; color:#98c379; border:none; padding:15px; font-family: Consolas, monospace; font-size: 14px; outline:none; resize:none; overflow-y:auto; line-height: 1.5;"></textarea>
                    </div>

                    <div id="panel-render-ui" style="flex: 7; border: 1px solid #dee2e6; border-radius: 8px; background: white; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
                        <div style="background: #f8f9fa; padding: 10px 15px; color: #333; font-weight: bold; font-size: 13px; border-bottom: 1px solid #dee2e6;">
                            👁️ Hiển thị thực tế
                        </div>
                        <div id="khung-render-cau-hoi" style="flex: 1; padding: 20px; overflow-y: auto; font-size: 15px; line-height: 1.6; color: #333;">
                            <div style="color:#999; text-align:center; margin-top:50px;">👈 Bấm vào một file JSON hoặc Ảnh bên trái để xem nội dung</div>
                        </div>
                    </div>

                </div>
            </div>
        `;

        // Sự kiện kéo thả...
        const splitter = document.getElementById('drag-splitter-cau-hoi');
        const treePanel = document.getElementById('tree-panel-cau-hoi');
        let isResizing = false;

        const startResize = (e) => {
            isResizing = true;
            document.body.style.cursor = 'col-resize';
            document.body.style.userSelect = 'none';
            document.addEventListener('mousemove', doResize);
            document.addEventListener('mouseup', stopResize);
        };

        const doResize = (e) => {
            if (!isResizing) return;
            const containerLeft = treePanel.parentElement.getBoundingClientRect().left;
            let newWidth = e.clientX - containerLeft;
            if (newWidth >= 200 && newWidth <= 800) {
                treePanel.style.width = newWidth + 'px';
            }
        };

        const stopResize = () => {
            isResizing = false;
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
            document.removeEventListener('mousemove', doResize);
            document.removeEventListener('mouseup', stopResize);
        };

        if (splitter) {
            splitter.addEventListener('mousedown', startResize);
        }

    } catch (error) {
        vungLamViec.innerHTML = `<div style="text-align:center; padding:50px;"><h3 style="color:#dc3545;">❌ Lỗi kết nối API: ${error.message}</h3></div>`;
    }
};



// =====================================================================
// Hàm 3.7.1: Xử lý khi click vào file (JSON hoặc Ảnh)
// =====================================================================
// window.ham_3_13_tai_noi_dung_cau_hoi = async function (fileId, fileName, fileType = 'json') {
//     const txtCode = document.getElementById('khung-code-json');
//     const divRender = document.getElementById('khung-render-cau-hoi');

//     // Lấy 2 khung container để bật tắt
//     const panelCode = document.getElementById('panel-code-json');
//     const panelRender = document.getElementById('panel-render-ui');

//     document.getElementById('lbl-ten-file-code').innerText = `💻 Đang xem: ${fileName}`;

//     // 🌟 TRƯỜNG HỢP 1: NẾU THẦY BẤM VÀO FILE ẢNH
//     if (fileType === 'image') {
//         // Ẩn hoàn toàn khung Code đi
//         if (panelCode) panelCode.style.display = 'none';

//         // Cho khung Render chiếm trọn 100% diện tích
//         if (panelRender) panelRender.style.flex = '1';

//         divRender.innerHTML = `
//             <div style="text-align:center; padding: 20px;">
//                 <div style="margin-bottom:15px; color:#28a745; font-weight:bold; font-size: 16px;">🖼️ ${fileName}</div>
//                 <img src="https://drive.google.com/thumbnail?id=${fileId}&sz=w1000" style="max-width:100%; max-height: 700px; border-radius:8px; box-shadow:0 4px 15px rgba(0,0,0,0.1); border: 1px solid #ddd;" alt="${fileName}" />
//             </div>
//         `;
//         return; // Dừng hàm lại
//     }

//     // 🌟 TRƯỜNG HỢP 2: NẾU THẦY BẤM VÀO FILE JSON
//     // Bật lại khung Code và trả lại tỷ lệ 30-70
//     if (panelCode) {
//         panelCode.style.display = 'flex';
//         panelRender.style.flex = '7';
//     }

//     txtCode.value = "⏳ Đang tải nội dung từ Google Drive...";
//     divRender.innerHTML = "<div style='color:#fd7e14; text-align:center; margin-top:50px;'>⏳ Đang biên dịch hiển thị...</div>";

//     try {
//         const API_GOC = CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP;
//         const res = await fetch(`${API_GOC}?action=readFile&id=${fileId}&t=${Date.now()}`);
//         const result = await res.json();

//         if (result.status !== 'success') throw new Error(result.message);

//         const noiDungGoc = result.content;

//         try {
//             const jsonObj = JSON.parse(noiDungGoc);
//             txtCode.value = JSON.stringify(jsonObj, null, 4);
//             //ham_3_7_render_ui_cau_hoi(jsonObj, divRender);



//             // Ví dụ trong hàm render chung của thầy
//             if (noiDungGoc.includes("\\choiceTF")) {
//                 window.ham_3_20_render_ui_cau_hoi_DS(jsonObj, divRender);
//             } 
//             else 
//                 if (noiDungGoc.includes("\\choice")) {
//                     window.ham_3_19_render_ui_cau_hoi_TN(jsonObj, divRender); // Hàm TN cũ của thầy
//                 }
//                 else
//                     if (noiDungGoc.includes("\\shortans")) {
//                         window.ham_3_21_render_ui_cau_hoi_TLN(jsonObj, divRender); // Hàm TLN của thầy
//                     }






//         } catch (e) {
//             txtCode.value = noiDungGoc;
//             divRender.innerHTML = `<div style="color:red;">Lỗi định dạng JSON: ${e.message}</div><pre>${noiDungGoc}</pre>`;
//         }

//     } catch (error) {
//         txtCode.value = `Lỗi: ${error.message}`;
//         divRender.innerHTML = `<div style="color:red;">❌ Không thể đọc file: ${error.message}</div>`;
//     }
// };

window.ham_3_13_tai_noi_dung_cau_hoi = async function (element, fileId, fileName, fileType = 'json') {

    // 🌟 XỬ LÝ HIGHLIGHT MÀU DÒNG ĐANG CHỌN
    // Tẩy màu tất cả các dòng cũ trước
    document.querySelectorAll('.tree-file-item').forEach(el => el.classList.remove('active-file'));
    // Tô màu dòng vừa click
    if (element) element.classList.add('active-file');

    const txtCode = document.getElementById('khung-code-json');
    const divRender = document.getElementById('khung-render-cau-hoi');
    const panelCode = document.getElementById('panel-code-json');
    const panelRender = document.getElementById('panel-render-ui');

    document.getElementById('lbl-ten-file-code').innerText = `💻 Đang xem: ${fileName}`;

    if (fileType === 'image') {
        if (panelCode) panelCode.style.display = 'none';
        if (panelRender) panelRender.style.flex = '1';

        divRender.innerHTML = `
            <div style="text-align:center; padding: 20px;">
                <div style="margin-bottom:15px; color:#28a745; font-weight:bold; font-size: 16px;">🖼️ ${fileName}</div>
                <img src="https://drive.google.com/thumbnail?id=${fileId}&sz=w1000" style="max-width:100%; max-height: 700px; border-radius:8px; box-shadow:0 4px 15px rgba(0,0,0,0.1); border: 1px solid #ddd;" alt="${fileName}" />
            </div>
        `;
        return;
    }

    if (panelCode) {
        panelCode.style.display = 'flex';
        panelRender.style.flex = '7';
    }

    txtCode.value = "⏳ Đang tải nội dung từ Google Drive...";
    divRender.innerHTML = "<div style='color:#fd7e14; text-align:center; margin-top:50px;'>⏳ Đang biên dịch hiển thị...</div>";

    try {
        const API_GOC = CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP;
        const res = await fetch(`${API_GOC}?action=readFile&id=${fileId}&t=${Date.now()}`);
        const result = await res.json();

        if (result.status !== 'success') throw new Error(result.message);

        const noiDungGoc = result.content;

        try {
            const jsonObj = JSON.parse(noiDungGoc);
            txtCode.value = JSON.stringify(jsonObj, null, 4);

            if (noiDungGoc.includes("\\choiceTF")) {
                window.ham_3_20_render_ui_cau_hoi_DS(jsonObj, divRender);
            }
            else if (noiDungGoc.includes("\\choice")) {
                window.ham_3_19_render_ui_cau_hoi_TN(jsonObj, divRender);
            }
            else if (noiDungGoc.includes("\\shortans")) {
                window.ham_3_21_render_ui_cau_hoi_TLN(jsonObj, divRender);
            }
        } catch (e) {
            txtCode.value = noiDungGoc;
            divRender.innerHTML = `<div style="color:red;">Lỗi định dạng JSON: ${e.message}</div><pre>${noiDungGoc}</pre>`;
        }

    } catch (error) {
        txtCode.value = `Lỗi: ${error.message}`;
        divRender.innerHTML = `<div style="color:red;">❌ Không thể đọc file: ${error.message}</div>`;
    }
};




window.ham_3_14_lay4KhoiNgoacNhon = function (tex, macroName) {
    const regex = new RegExp("\\\\" + macroName + "\\b");
    const match = tex.match(regex);
    if (!match) return null;

    let pos = match.index + match[0].length;
    let blocks = [];

    for (let i = 0; i < 4; i++) {
        while (pos < tex.length && /\s/.test(tex[pos])) pos++; // Bỏ qua khoảng trắng
        if (pos >= tex.length || tex[pos] !== '{') return null;

        let start = pos, depth = 0;
        for (; pos < tex.length; pos++) {
            if (tex[pos] === '{') depth++;
            else if (tex[pos] === '}') {
                depth--;
                if (depth === 0) {
                    blocks.push(tex.substring(start + 1, pos));
                    pos++;
                    break;
                }
            }
        }
    }
    return blocks;
};



// Hàm tiền xử lý (Sửa lỗi Drive chặn ảnh, môi trường center, và itemchoice của MathJax)
window.ham_3_15_tienXuLyLaTeX = function (texContent) {
    if (!texContent) return "";
    let processed = texContent;

    // 1. Khử môi trường center
    processed = processed.replace(/\\begin\{center\}/g, '<div style="text-align: center; margin: 15px 0;">');
    processed = processed.replace(/\\end\{center\}/g, '</div>');

    // 2. Chuyển đổi mã [IMG:id_anh] thành thẻ <img> (Dùng API Thumbnail để Google không chặn)
    processed = processed.replace(/\[IMG:([^\]]+)\]/g, function (match, imageId) {
        const id = imageId.trim();
        return `<img src="https://drive.google.com/thumbnail?id=${id}&sz=w1200" style="max-width: 100%; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin: 10px 0;">`;
    });

    // 3. Khử môi trường itemchoice của phần Lời giải câu Đúng/Sai
    processed = processed.replace(/\\begin\{itemchoice\}([\s\S]*?)\\end\{itemchoice\}/g, function (match, content) {
        let charCode = 97; // Bắt đầu mã ASCII từ chữ 'a'

        let parsedContent = content.replace(/\\itemch/g, function () {
            let label = String.fromCharCode(charCode) + ')'; // Tạo nhãn a), b), c), d)
            charCode++;

            // Đóng thẻ <li> của ý trước đó (nếu không phải là ý đầu tiên)
            let prefix = (charCode > 98) ? '</li>' : '';

            return `${prefix}<li style="margin-bottom: 10px; list-style-type: none; border-bottom: 1px dashed #eee; padding-bottom: 10px;">
                        <b style="color: #d35400; background: #fff3cd; padding: 2px 6px; border-radius: 4px; margin-right: 5px;">${label}</b> `;
        });

        // Đóng thẻ <li> của ý cuối cùng
        if (charCode > 97) parsedContent += '</li>';

        // Bọc toàn bộ trong thẻ danh sách <ul>
        return `<ul style="margin-top: 15px; padding: 15px; background: #fdfdfe; border-left: 4px solid #ffc107; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">${parsedContent}</ul>`;
    });

    return processed;
};




window.ham_3_16_phanTichCauHoiTexTN = function (texContent) {
    let result = { cauDan: "", paA: "", paB: "", paC: "", paD: "", loiGiai: "", dapAnDung: null };
    if (!texContent || texContent.trim() === "") return result;

    // Kích hoạt Tiền xử lý (Xử lý Ảnh và Center)
    texContent = window.ham_3_15_tienXuLyLaTeX(texContent);

    // 1. Tách lời giải
    let idxLoiGiai = texContent.indexOf("\\loigiai");
    if (idxLoiGiai !== -1) {
        let start = texContent.indexOf('{', idxLoiGiai) + 1;
        let end = texContent.lastIndexOf('}', texContent.indexOf("\\end{ex}"));
        result.loiGiai = texContent.substring(start, end).trim();
        texContent = texContent.substring(0, idxLoiGiai);
    }

    // 2. Dọn rác
    texContent = texContent.replace(/\\begin\{(ex|bt|vd|cau)\}[^\r\n]*/g, "").replace(/\\end\{(ex|bt|vd|cau)\}[^\r\n]*/g, "");

    // 3. Tách phương án & Phát hiện đáp án đúng
    let blocks = window.ham_3_14_lay4KhoiNgoacNhon(texContent, "choice");
    if (blocks && blocks.length === 4) {
        const optionLabels = ['A', 'B', 'C', 'D'];
        blocks.forEach((b, i) => {
            if (b.includes('\\True')) result.dapAnDung = optionLabels[i];
            blocks[i] = b.replace(/\\True/g, "").trim();
        });
        result.paA = blocks[0]; result.paB = blocks[1]; result.paC = blocks[2]; result.paD = blocks[3];
        result.cauDan = texContent.substring(0, texContent.indexOf("\\choice")).trim();
    } else {
        result.cauDan = texContent.trim();
    }
    return result;
};


window.ham_3_17_phanTichCauHoiTexDS = function (texContent) {
    let result = { cauDan: "", options: [], loiGiai: "" };
    if (!texContent || texContent.trim() === "") return result;

    // Kích hoạt Tiền xử lý (Xử lý Ảnh và Center)
    texContent = window.ham_3_15_tienXuLyLaTeX(texContent);

    //console.log("Nội dung LaTeX sau khi tiền xử lý:", texContent);
    // 1. Tách lời giải
    let idxLoiGiai = texContent.indexOf("\\loigiai");
    if (idxLoiGiai !== -1) {
        let start = texContent.indexOf('{', idxLoiGiai) + 1;
        let end = texContent.lastIndexOf('}', texContent.indexOf("\\end{ex}"));
        result.loiGiai = texContent.substring(start, end).trim();
        texContent = texContent.substring(0, idxLoiGiai);
    }

    // 2. Dọn rác
    texContent = texContent.replace(/\\begin\{(ex|bt|vd|cau)\}[^\r\n]*/g, "").replace(/\\end\{(ex|bt|vd|cau)\}[^\r\n]*/g, "");

    // 3. Tách phương án (choiceTF)
    let blocks = window.ham_3_14_lay4KhoiNgoacNhon(texContent, "choiceTF");
    if (blocks && blocks.length >= 1) {
        result.options = blocks.map(b => {
            return {
                isTrue: b.includes('\\True'),
                content: b.replace(/\\True/g, "").trim()
            };
        });
        let idxChoice = texContent.indexOf("\\choiceTF");
        result.cauDan = texContent.substring(0, idxChoice).trim();
    } else {
        result.cauDan = texContent.trim();
    }
    return result;
};


window.ham_3_18_phanTichCauHoiTexTLN = function (texContent) {
    let result = { cauDan: "", loiGiai: "", dapAnDung: "" };
    if (!texContent || texContent.trim() === "") return result;

    // Kích hoạt Tiền xử lý (Xử lý Ảnh và Center)
    texContent = window.ham_3_15_tienXuLyLaTeX(texContent);

    // 1. Tách lời giải
    let idxLoiGiai = texContent.indexOf("\\loigiai");
    if (idxLoiGiai !== -1) {
        let start = texContent.indexOf('{', idxLoiGiai) + 1;
        let end = texContent.lastIndexOf('}', texContent.indexOf("\\end{ex}"));
        result.loiGiai = texContent.substring(start, end).trim();
        texContent = texContent.substring(0, idxLoiGiai);
    }

    // 2. Tách đáp án ngắn (\shortans)
    let idxShortans = texContent.indexOf("\\shortans");
    if (idxShortans !== -1) {
        let startAns = texContent.indexOf('{', idxShortans) + 1;
        let endAns = texContent.indexOf('}', startAns);
        if (endAns !== -1) {
            let rawAns = texContent.substring(startAns, endAns).trim();
            // Lọc bỏ dấu $ của đáp án (nếu có)
            result.dapAnDung = rawAns.replace(/\$/g, "");
        }
        // Xóa lệnh \shortans khỏi nội dung câu dẫn
        texContent = texContent.substring(0, idxShortans);
    }

    // 3. Dọn rác
    texContent = texContent.replace(/\\begin\{(ex|bt|vd|cau)\}[^\r\n]*/g, "").replace(/\\end\{(ex|bt|vd|cau)\}[^\r\n]*/g, "");

    result.cauDan = texContent.trim();
    return result;
};







window.ham_3_19_render_ui_cau_hoi_TN = async function (data, containerElement) {
    if (!data || !data.noi_dung) return;

    const parsed = window.ham_3_16_phanTichCauHoiTexTN(data.noi_dung);

    // Tạo 4 thẻ phương án
    const options = [
        { label: 'A', content: parsed.paA },
        { label: 'B', content: parsed.paB },
        { label: 'C', content: parsed.paC },
        { label: 'D', content: parsed.paD }
    ];

    let htmlOptions = "";
    options.forEach(opt => {
        const isCorrect = (parsed.dapAnDung === opt.label);
        // Style thẻ: Màu nổi nếu đúng, màu trung tính nếu sai
        const bgColor = isCorrect ? "#d4edda" : "#f8f9fa";
        const borderColor = isCorrect ? "#28a745" : "#ddd";
        const textColor = isCorrect ? "#155724" : "#495057";
        const fontWeight = isCorrect ? "bold" : "normal";

        htmlOptions += `
            <div style="padding: 12px; border: 2px solid ${borderColor}; border-radius: 8px; background: ${bgColor}; color: ${textColor}; font-weight: ${fontWeight};">
                <b style="margin-right: 5px;">${opt.label}.</b> ${opt.content}
                ${isCorrect ? ' <span style="font-size:12px;">✅</span>' : ''}
            </div>
        `;
    });

    containerElement.innerHTML = `
        <div style="padding: 20px; background: #ffffff; border: 1px solid #dee2e6; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
            <!-- Câu dẫn nổi bật -->
            <div style="background: #fff8e1; padding: 15px; border-radius: 8px; border-left: 5px solid #ffc107; margin-bottom: 20px; font-size: 16px;">
                ${parsed.cauDan}
            </div>

            <!-- 4 Thẻ phương án -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px;">
                ${htmlOptions}
            </div>

            <!-- Lời giải -->
            ${parsed.loiGiai ? `
                <div style="background: #e9ecef; padding: 15px; border-radius: 8px; font-size: 14px;">
                    <b style="color: #495057;">💡 Lời giải:</b><br>
                    ${parsed.loiGiai}
                </div>` : ""}
        </div>
    `;

    if (window.MathJax) await MathJax.typesetPromise([containerElement]);
};

window.ham_3_20_render_ui_cau_hoi_DS = async function (data, containerElement) {
    if (!data || !data.noi_dung) return;

    // Phân tích câu hỏi (dùng hàm ham_3_17_phanTichCauHoiTexDS đã viết ở bước trước)
    const parsed = window.ham_3_17_phanTichCauHoiTexDS(data.noi_dung);

    let htmlOptions = "";
    const nhanY = ['a)', 'b)', 'c)', 'd)'];

    parsed.options.forEach((opt, index) => {
        // Logic màu sắc: Ý Đúng (True) -> Xanh, Ý Sai (False) -> Đỏ
        const bgColor = opt.isTrue ? "#d4edda" : "#f8d7da";
        const borderColor = opt.isTrue ? "#28a745" : "#dc3545";
        const textColor = opt.isTrue ? "#155724" : "#721c24";

        htmlOptions += `
            <div style="padding: 12px; margin-bottom: 8px; border: 2px solid ${borderColor}; border-radius: 8px; background: ${bgColor}; color: ${textColor}; display: flex; align-items: flex-start; font-weight: bold;">
                <div style="width: 30px;">${nhanY[index]}</div>
                <div style="flex: 1; font-weight: normal;">${opt.content}</div>
                <div style="margin-left: 10px; font-weight: 900; font-size: 13px; text-transform: uppercase;">
                    ${opt.isTrue ? "ĐÚNG" : "SAI"}
                </div>
            </div>
        `;
    });

    containerElement.innerHTML = `
        <div style="padding: 20px; background: #ffffff; border: 1px solid #dee2e6; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
            <!-- Câu dẫn (Đồng bộ style với câu TN) -->
            <div style="background: #fff8e1; padding: 15px; border-radius: 8px; border-left: 5px solid #ffc107; margin-bottom: 20px; font-size: 16px;">
                ${parsed.cauDan}
            </div>

            <!-- Các ý Đúng/Sai -->
            <div style="margin-bottom: 20px;">
                ${htmlOptions}
            </div>

            <!-- Lời giải (Đồng bộ style với câu TN) -->
            ${parsed.loiGiai ? `
                <div style="background: #e9ecef; padding: 15px; border-radius: 8px; font-size: 14px;">
                    <b style="color: #495057;">💡 Lời giải:</b><br>
                    ${parsed.loiGiai}
                </div>` : ""}
        </div>
    `;

    if (window.MathJax) await MathJax.typesetPromise([containerElement]);
};



window.ham_3_21_render_ui_cau_hoi_TLN = async function (data, containerElement) {
    if (!data || !data.noi_dung) return;

    // Gọi hàm phân tích vừa viết ở trên
    const parsed = window.ham_3_18_phanTichCauHoiTexTLN(data.noi_dung);

    containerElement.innerHTML = `
        <div style="padding: 20px; background: #ffffff; border: 1px solid #dee2e6; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
            <!-- Câu dẫn và Hình ảnh sẽ hiện trọn vẹn ở đây -->
            <div style="background: #fff8e1; padding: 15px; border-radius: 8px; border-left: 5px solid #ffc107; margin-bottom: 20px; font-size: 16px;">
                ${parsed.cauDan}
            </div>

            <!-- Ô đáp án -->
            <div style="margin-bottom: 20px; padding: 15px; background: #e8f4f8; border: 1px dashed #1a73e8; border-radius: 8px; text-align: center;">
                <b style="color: #1a73e8; font-size: 14px;">🎯 Đáp án chuẩn:</b>
                <div style="font-size: 24px; font-weight: 900; color: #dc3545; margin-top: 5px;">
                    ${parsed.dapAnDung || "Chưa thiết lập"}
                </div>
            </div>

            <!-- Lời giải -->
            ${parsed.loiGiai ? `
                <div style="background: #e9ecef; padding: 15px; border-radius: 8px; font-size: 14px;">
                    <b style="color: #495057;">💡 Lời giải chi tiết:</b><br>
                    ${parsed.loiGiai}
                </div>` : ""}
        </div>
    `;

    // Gọi lại MathJax để render công thức
    if (window.MathJax) await MathJax.typesetPromise([containerElement]);
};
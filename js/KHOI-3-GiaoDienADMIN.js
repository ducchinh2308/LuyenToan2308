

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
                
                <button onclick="ham_3_4_ve_cai_dat_he_thong()" style="padding: 12px 20px; background: #34495e; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: bold; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">⚙️ Cài Đặt HT</button>
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
            let thoiGianHienThi = ham_3_3_tinh_thoi_gian_truoc_day(row.thoi_gian_nop);

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




// ==============================================================================
// KHỐI 15: QUẢN TRỊ CÀI ĐẶT HỆ THỐNG
// ==============================================================================

window.AppConfig = {}; // Lưu trữ cấu hình toàn cục
window.dsCaiDatGoc = [];
//// =====================================================================
//// Hàm 3.4: Vẽ màn hình giao diện Cài đặt hệ thống (Đã sửa lỗi nút Lưu)
//// =====================================================================
window.ham_3_4_ve_cai_dat_he_thong = async function () {
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

            if (item.ma_cai_dat === 'DUYET_TAI_KHOAN_MOI') {
                phanNhapLieu = `
                    <select id="input_setting_${item.ma_cai_dat}" style="padding: 10px; border: 2px solid #ced4da; border-radius: 6px; width: 200px; font-weight: bold; font-size: 15px; color: #495057; outline: none; cursor: pointer;">
                        <option value="CHO_DUYET" ${item.gia_tri === 'CHO_DUYET' ? 'selected' : ''}>⏳ Chờ GV Duyệt</option>
                        <option value="TU_DONG" ${item.gia_tri === 'TU_DONG' ? 'selected' : ''}>✅ Tự động duyệt</option>
                    </select>
                `;
            } else {
                phanNhapLieu = `
                    <input type="text" id="input_setting_${item.ma_cai_dat}" value="${item.gia_tri}" style="padding: 10px; border: 2px solid #ced4da; border-radius: 6px; width: 200px; font-weight: bold; font-size: 15px; color: #495057; outline: none; transition: 0.2s;" onfocus="this.style.borderColor='#34495e'" onblur="this.style.borderColor='#ced4da'">
                `;
            }

            htmlDanhSachCaiDat += `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 20px 15px; border-bottom: 1px dashed #ccc; transition: 0.2s;" onmouseover="this.style.background='#f8f9fa'" onmouseout="this.style.background='transparent'">
                    <div style="flex: 1;">
                        <div style="font-weight: bold; color: #333; font-size: 16px; margin-bottom: 4px;">
                            ${item.mo_ta}
                        </div>
                        <div style="display: flex; gap: 10px; align-items: center;">
                            <span style="font-size: 11px; background: ${mauNhom}; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold;">${item.nhom}</span>
                            <span style="font-size: 12px; color: #888; font-family: monospace; background: #e9ecef; padding: 2px 6px; border-radius: 4px;">${item.ma_cai_dat}</span>
                        </div>
                    </div>
                    
                    <div style="display: flex; gap: 10px; align-items: center;">
                        ${phanNhapLieu}
                        
                        <button onclick="ham_3_5_luu_mot_cai_dat('${item.ma_cai_dat}', this)" style="padding: 10px 20px; background: #34495e; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 14px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: 0.2s;" onmouseover="this.style.background='#2c3e50'" onmouseout="this.style.background='#34495e'">
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
                
                <div style="padding: 10px 20px 30px 20px;">
                    ${htmlDanhSachCaiDat}
                </div>
            </div>
        `;

    } catch (error) {
        vungLamViec.innerHTML = `<div style="color:red; text-align:center; padding:50px;">❌ Lỗi kết nối CSDL: ${error.message}</div>`;
    }
};

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
        const URL_GAS = CFG_HE_THONG.URL_APPS_SCRIPT_LAY_CAY_THU_MUC;
        const response = await fetch(URL_GAS);
        const result = await response.json();

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

                return `<div class="tree-file-item" onclick="ham_xem_file_drive('${node.id}', '${node.name}', '${fileMime}')">${icon} ${node.name}</div>`;
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
// =====================================================================
// 2. Hàm nhúng file Drive sang bên phải 
// (ẢNH: Dùng Zoom tuỳ chỉnh | PDF/WORD: Dùng Trình xem mặc định Google Drive)
// =====================================================================
window.ham_xem_file_drive = function (fileId, fileName, mimeType) {
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
                        <button onclick="ham_zoom_anh(0.2)" style="padding: 4px 10px; cursor: pointer; border-radius: 4px; border: 1px solid #ccc; background: white; margin-right: 5px;">➕ Lớn</button>
                        <button onclick="ham_zoom_anh(-0.2)" style="padding: 4px 10px; cursor: pointer; border-radius: 4px; border: 1px solid #ccc; background: white; margin-right: 5px;">➖ Nhỏ</button>
                        <button onclick="ham_zoom_anh(0, true)" style="padding: 4px 10px; cursor: pointer; border-radius: 4px; border: 1px solid #ccc; background: white;">🔄 Đặt lại</button>
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
            window.kichHoatZoomKeoAnh();
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

window.ham_zoom_anh = function (step, reset = false) {
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

window.kichHoatZoomKeoAnh = function () {
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
        window.ham_zoom_anh(step);
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
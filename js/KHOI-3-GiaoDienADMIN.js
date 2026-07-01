

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

    // Định nghĩa chung style nút để code gọn hơn
    const btnStyle = "padding: 15px 25px; border: none; border-radius: 8px; cursor: pointer; font-size: 15px; font-weight: bold; box-shadow: 0 2px 5px rgba(0,0,0,0.2); transition: 0.2s; color: white;";

    dashboard.innerHTML = `
        <div style="background: white; padding: 25px; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
            <h2 style="color: #0056b3; margin-top: 0;">BẢNG ĐIỀU KHIỂN QUẢN TRỊ</h2>
            <p style="font-size: 16px; color: #495057;">Chào mừng quay trở lại, hệ thống đã sẵn sàng làm việc!</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">

            <h4 style="color: #555; margin-bottom: 15px;">📚 QUẢN LÝ KHO HỌC LIỆU</h4>
            <div style="display: flex; gap: 15px; flex-wrap: wrap; margin-bottom: 25px;">
                <button onclick="ham_6a_1_ve_quan_ly_hoc_lieu_trac_nghiem()" style="${btnStyle} background: #20c997;">✅ Trắc Nghiệm</button>
                <button onclick="" style="${btnStyle} background: #28a745;">📝 Tự Luận</button>

                <button onclick="" style="${btnStyle} background: #0056b3;">📖 Đọc Bài</button>
                <button onclick="" style="${btnStyle} background: #6f42c1;">📊 Khảo Sát</button>
            </div>

            <h4 style="color: #555; margin-bottom: 15px;">🚀 QUẢN LÝ NHIỆM VỤ</h4>
            <div style="display: flex; gap: 15px; flex-wrap: wrap; margin-bottom: 25px;">
                <button onclick="ham_7a_1_ve_quan_ly_nhiem_vu_trac_nghiem()" style="${btnStyle} background: #ca6f1e;">✅ NV Trắc Nghiệm</button>
                <button onclick="ham_7_1_nv_tu_luan()" style="${btnStyle} background: #d68910;">📝 NV Tự Luận</button>
                
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


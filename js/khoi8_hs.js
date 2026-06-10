// ==============================================================
// KHỐI 0: ĐÁNH DẤU PHIÊN BẢN (VERSION CONTROL)
// ==============================================================
const KHOI8_VERSION = "Khối 8: Cập nhật lúc 16h32 - Ngày 16/05";
//console.log(`%c🚀 ĐANG CHẠY: ${KHOI8_VERSION}`, "background: #28a745; color: white; font-size: 14px; padding: 5px; font-weight: bold;");

//window.addEventListener('load', () => {
//    let versionBadge = document.createElement('div');
//    versionBadge.innerHTML = KHOI8_VERSION;
//    versionBadge.style.cssText = "position: fixed; bottom: 20px; right: 5px; font-size: 9px; color: #28a745; z-index: 9999; ";
//    document.body.appendChild(versionBadge);
//});

// ==============================================================
// KHỐI 8: GIAO DIỆN HỌC SINH (STUDENT PORTAL)
// ==============================================================

// Biến toàn cục lưu trữ dữ liệu của Học sinh
const GocHocSinhState = {
    uid: null,
    ma_lop: null,
    ten: null,
    danhSachNhiemVu: [],
    tien_do_lam_bai: {} // 🌟 THÊM DÒNG NÀY ĐỂ TRỮ SỔ CHUYÊN CẦN

};


// ==============================================================
// Hàm 8.1: Dựng Bộ Khung Giao Diện (Bổ sung Ví Kim Cương 💎)
// ==============================================================
async function ham_8_1_tai_nhiem_vu_cua_toi(uidHocSinh, dsMaLopHocSinh, tenHocSinh) {
    // 1. Lưu vào State
    GocHocSinhState.uid = uidHocSinh;
    GocHocSinhState.danh_sach_ma_lop = dsMaLopHocSinh || [];
    GocHocSinhState.ten = tenHocSinh;

    // 🌟 1.5. LẤY SỔ CHUYÊN CẦN VÀ VÍ KIM CƯƠNG TỪ DATABASE VỀ RAM
    try {
        const { data: hsData } = await _supabase
            .from('hoc_sinh')
            .select('tien_do_lam_bai, kim_cuong, chi_tiet_kim_cuong')
            .eq('uid', uidHocSinh)
            .single();

        GocHocSinhState.tien_do_lam_bai = hsData?.tien_do_lam_bai || {};
        // Nạp thêm thông tin Kim Cương vào bộ nhớ tạm
        GocHocSinhState.kim_cuong = hsData?.kim_cuong || 0;
        GocHocSinhState.chi_tiet_kim_cuong = hsData?.chi_tiet_kim_cuong || {};

    } catch (e) {
        GocHocSinhState.tien_do_lam_bai = {};
        GocHocSinhState.kim_cuong = 0;
        GocHocSinhState.chi_tiet_kim_cuong = {};
    }

    const renderArea = document.getElementById('dashboard-container');
    if (!renderArea) return alert("Lỗi: Không tìm thấy khung hiển thị!");

    // 2. Hiện trạng thái chờ
    renderArea.innerHTML = `<div style="text-align:center; padding: 50px; color: #1a73e8; font-weight:bold;">⏳ Đang thiết lập không gian học tập...</div>`;

    // 🌟 3. TRA CỨU TÊN LỚP TỪ DATABASE
    let chuoiHienThiLop = "Chưa cập nhật lớp";

    if (GocHocSinhState.danh_sach_ma_lop.length > 0) {
        try {
            const { data: dsLop, error } = await _supabase
                .from('lop_hoc')
                .select('ten_lop')
                .in('ma_lop', GocHocSinhState.danh_sach_ma_lop);

            if (!error && dsLop && dsLop.length > 0) {
                chuoiHienThiLop = dsLop.map(l => l.ten_lop).join(', ');
            } else {
                chuoiHienThiLop = GocHocSinhState.danh_sach_ma_lop.join(', ');
            }
        } catch (err) {
            chuoiHienThiLop = GocHocSinhState.danh_sach_ma_lop.join(', ');
        }
    }

    // 🌟 Lấy số dư Kim Cương để hiển thị
    const soKimCuong = GocHocSinhState.kim_cuong;

    // 4. RÁP GIAO DIỆN CHÍNH
    renderArea.innerHTML = `
        <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); max-width: 1200px; margin: 0 auto;">
            
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e9ecef; padding-bottom: 10px; margin-bottom: 20px; flex-wrap: wrap; gap: 10px;">
                <h2 style="color: #1a73e8; margin: 0; font-size: 20px;">🎓 GÓC HỌC TẬP</h2>
                <div style="display: flex; align-items: center; gap: 15px; font-weight: bold; color: #495057; font-size: 14px;">
                    <div>Chào em, <span style="color:#d35400;">${tenHocSinh}</span> (Lớp: <span style="color:#1a73e8;">${chuoiHienThiLop}</span>)</div>
                    
                    <div style="display: flex; align-items: center; gap: 5px; background: #e0f7fa; padding: 6px 15px; border-radius: 20px; border: 1px solid #00bcd4; cursor: help; box-shadow: 0 2px 5px rgba(0,188,212,0.2);" title="Số Kim Cương tích lũy được từ việc làm bài tập và thi đấu">
                        <span style="font-size: 18px;">💎</span>
                        <span style="font-weight: 900; color: #00838f; font-size: 16px;">${soKimCuong}</span>
                    </div>
                </div>
            </div>
            
            <div style="display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; margin-bottom: 20px;">
                <button onclick="ham_8_2_tab_nhiem_vu_bat_buoc()" style="flex: 1; min-width: 140px; padding: 12px; background: #28a745; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: bold; box-shadow: 0 2px 4px rgba(40,167,69,0.3);">🚀 NHIỆM VỤ LỚP</button>
                <button onclick="ham_8_3_tab_luyen_tap_tu_do()" style="flex: 1; min-width: 140px; padding: 12px; background: #17a2b8; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: bold; box-shadow: 0 2px 4px rgba(23,162,184,0.3);">🌍 TỰ LUYỆN</button>
                <button onclick="ham_8_4_tab_ket_qua()" style="flex: 1; min-width: 140px; padding: 12px; background: #6f42c1; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: bold; box-shadow: 0 2px 4px rgba(111,66,193,0.3);">📊 KẾT QUẢ</button>
                <button onclick="ham_8_5_tab_ho_so()" style="flex: 1; min-width: 140px; padding: 12px; background: #6c757d; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: bold; box-shadow: 0 2px 4px rgba(108,117,125,0.3);">👤 HỒ SƠ</button>
                <button onclick="ham_8_6_tab_live_quiz()" style="padding: 12px 20px; background: linear-gradient(135deg, #e74c3c, #c0392b); color: white; border: none; border-radius: 8px; font-weight: bold; font-size: 15px; cursor: pointer; box-shadow: 0 4px 10px rgba(231,76,60,0.3); transition: 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                        ⚔️ VÀO PHÒNG LIVE QUIZ
                </button>
            </div>
            
            <div id="vung-lam-viec-hoc-sinh" style="padding: 15px; background: #f8f9fa; border-radius: 8px; border: 1px dashed #ccc; min-height: 300px;"></div>
        </div>
    `;

    // 5. Mặc định mở Tab Nhiệm vụ khi vừa tải xong khung
    ham_8_2_tab_nhiem_vu_bat_buoc();


    // =================================================================
    // 🌟 6. KHỞI CHẠY THANH THI ĐUA CỦA LỚP Ở ĐÁY MÀN HÌNH
    // =================================================================
    if (window.dongHoThanhChayHS) {
        clearInterval(window.dongHoThanhChayHS); // Đập bỏ đồng hồ cũ nếu có
    }
    ham_8_1_1_ve_thanh_chay_lop_minh(); // Vẽ ngay lập tức lần đầu tiên
    window.dongHoThanhChayHS = setInterval(ham_8_1_1_ve_thanh_chay_lop_minh, 60000); // Lặp lại mỗi 60s

}


//// =====================================================================
//// [Nhãn thời gian: 13:40 - Ngày 10/06/2026] - Hàm 8.1.1: Vẽ thanh chạy thi đua nội bộ Lớp (Dành cho Học sinh)
//// =====================================================================
async function ham_8_1_1_ve_thanh_chay_lop_minh() {
    if (typeof SUPABASE_URL === 'undefined' || !SUPABASE_URL.startsWith('http')) {
        return;
    }

    // Lấy danh sách mã lớp của học sinh đang đăng nhập
    // (Đảm bảo lúc login, thầy đã gán AppState.user = data_hoc_sinh_tu_db)
    const lopCuaToi = (AppState.user && AppState.user.danh_sach_ma_lop) ? AppState.user.danh_sach_ma_lop : [];

    if (lopCuaToi.length === 0) {
        // Nếu học sinh chưa được xếp lớp, không cần vẽ thanh chạy
        return;
    }

    try {
        const headersAPI = {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json'
        };

        // BƯỚC 1: Lấy Từ điển Lớp học
        const resLop = await fetch(`${SUPABASE_URL}/rest/v1/lop_hoc?select=ma_lop,ten_lop`, { method: 'GET', headers: headersAPI });
        const dataLop = await resLop.json();
        const tuDienLop = {};
        if (dataLop && dataLop.length > 0) {
            dataLop.forEach(lop => tuDienLop[lop.ma_lop] = lop.ten_lop);
        }

        // BƯỚC 2: Gọi API lấy 50 kết quả nộp bài mới nhất toàn trường để tăng xác suất lọt lưới lớp mình
        const querySelect = "tong_diem,thoi_gian_nop,hoc_sinh!uid_hoc_sinh(ten),nhiem_vu(ten_nhiem_vu,danh_sach_lop)";
        const fullAPI_Link = `${SUPABASE_URL}/rest/v1/ket_qua_thi?select=${querySelect}&order=thoi_gian_nop.desc&limit=50`;
        const response = await fetch(fullAPI_Link, { method: 'GET', headers: headersAPI });

        if (!response.ok) throw new Error("Lỗi fetch bảng Kết quả thi");
        const data = await response.json();

        // BƯỚC 3: BỘ LỌC ĐỘC QUYỀN - Chỉ giữ lại những bài thi mà mã lớp của nhiệm vụ có chứa mã lớp của học sinh này
        const dataLopMinh = data.filter(row => {
            if (!row.nhiem_vu || !row.nhiem_vu.danh_sach_lop) return false;

            // Ép kiểu mảng để đảm bảo hàm .some() hoạt động
            let mangLopNhiemVu = Array.isArray(row.nhiem_vu.danh_sach_lop)
                ? row.nhiem_vu.danh_sach_lop
                : [row.nhiem_vu.danh_sach_lop];

            // Kiểm tra xem 2 mảng (Lớp của Nhiệm vụ và Lớp của Tôi) có điểm chung nào không
            return mangLopNhiemVu.some(maLop => lopCuaToi.includes(maLop));
        });

        // Chỉ lấy 10 bạn mới nhất trong lớp để chạy cho gọn
        const top10LopMinh = dataLopMinh.slice(0, 10);

        let chuoiNoiDung = "";

        if (top10LopMinh.length === 0) {
            // NẾU LỚP CHƯA CÓ AI NỘP -> Hiển thị lời kêu gọi
            chuoiNoiDung = `
                <span style="margin-right: 70px; font-family: Arial, sans-serif; font-size: 15px; color: #fbbf24; font-weight: bold; display: inline-block;">
                    🏆 Bảng vàng đang trống. Hãy là người đầu tiên trong lớp hoàn thành nhiệm vụ để được vinh danh tại đây! 🚀
                </span>
            `;
        } else {
            // NẾU ĐÃ CÓ NGƯỜI NỘP -> Render danh sách bạn bè
            chuoiNoiDung = top10LopMinh.map(row => {
                let diemDb = row.tong_diem !== null ? row.tong_diem : 0;
                let diemHienThi = Number(diemDb).toFixed(2).replace(/\.00$/, '');
                let thoiGianHienThi = ham_3_3_tinh_thoi_gian_truoc_day(row.thoi_gian_nop);

                // Highlight tên bạn bè cùng lớp (hoặc chính mình)
                let tenHS = (row.hoc_sinh && row.hoc_sinh.ten) ? row.hoc_sinh.ten : "Ẩn danh";
                let laChinhMinh = (tenHS.toUpperCase() === AppState.user.ten.toUpperCase()) ? true : false;
                let mauTen = laChinhMinh ? "#f97316" : "#ffffff"; // Nếu là tên mình thì tô cam rực rỡ
                let nhanHienThi = laChinhMinh ? "Bạn" : "Bạn";

                let tenNhiemVu = (row.nhiem_vu && row.nhiem_vu.ten_nhiem_vu) ? row.nhiem_vu.ten_nhiem_vu : "(Chưa đặt tên)";

                let lopHienThi = "--";
                if (row.nhiem_vu && Array.isArray(row.nhiem_vu.danh_sach_lop)) {
                    let mangTenLop = row.nhiem_vu.danh_sach_lop.map(ma => tuDienLop[ma] || ma);
                    lopHienThi = mangTenLop.join(", ");
                }

                return `
                    <span style="margin-right: 70px; font-family: Arial, sans-serif; font-size: 14px; display: inline-block;">
                        <i style="color: #ffd700;">🔥</i> 
                        ${nhanHienThi} <b style="color: ${mauTen}; font-size: 15px;">${tenHS}</b> (<span style="color: #a78bfa;">${lopHienThi}</span>) 
                        vừa nộp <b>${tenNhiemVu}</b> - 
                        Điểm: <span style="color: #4ade80; font-weight: bold; font-size: 16px;">${diemHienThi}</span> 
                        <span style="color: #475569; font-size: 12px; margin-left: 6px; background: #cbd5e1; padding: 2px 6px; border-radius: 4px; color: #0f172a;">⏱️ ${thoiGianHienThi}</span>
                    </span>
                `;
            }).join("");
        }

        ve_khung_html_thanh_chay_hs(chuoiNoiDung);

    } catch (error) {
        console.warn("⚠️ [Thanh chạy Lớp mình bị gián đoạn]:", error.message);
    }
}

//// =====================================================================
//// CÁC HÀM PHỤ TRỢ DÀNH RIÊNG CHO THANH CHẠY CỦA HỌC SINH
//// =====================================================================
function ve_khung_html_thanh_chay_hs(chuoiHienThi) {
    if (document.getElementById('thanh-chay-nop-bai-hs')) {
        document.getElementById('thanh-chay-nop-bai-hs').remove();
    }

    const tickerWrap = document.createElement('div');
    tickerWrap.id = 'thanh-chay-nop-bai-hs';
    tickerWrap.innerHTML = `
        <style>
            #thanh-chay-nop-bai-hs { 
                position: fixed; bottom: 0; left: 0; width: 100%; 
                background-color: #1e1e2f; color: #e2e8f0; padding: 12px 0; 
                z-index: 9999; overflow: hidden; box-shadow: 0 -4px 15px rgba(0,0,0,0.4); 
                border-top: 2px solid #8b5cf6; /* Viền tím mộng mơ hợp với giao diện học sinh */
            }
            .ticker-move-hs { 
                display: inline-block; white-space: nowrap; padding-left: 100%; 
            }
            .ticker-move-hs:hover { animation-play-state: paused; cursor: pointer; }
            @keyframes ticker-anim-hs { 0% { transform: translate3d(0, 0, 0); } 100% { transform: translate3d(-100%, 0, 0); } }
        </style>
        <div class="ticker-move-hs" id="noi-dung-thanh-chay-hs">${chuoiHienThi}</div>
    `;
    document.body.appendChild(tickerWrap);

    // Thuật toán Tốc độ cố định
    setTimeout(() => {
        const textElement = document.getElementById('noi-dung-thanh-chay-hs');
        if (textElement) {
            const textWidth = textElement.scrollWidth;
            const screenWidth = window.innerWidth;
            const distance = screenWidth + textWidth;

            const speed = 100; // 70 pixels / 1 giây

            const duration = distance / speed;
            textElement.style.animation = `ticker-anim-hs ${duration}s linear infinite`;
        }
    }, 100);
}

// =====================================================================
// Hàm 8.2: Xử lý Tab "Nhiệm Vụ Trên Lớp" (ĐÃ SỬA LỖI LỌC LỚP ĐỘNG)
// =====================================================================
async function ham_8_2_tab_nhiem_vu_bat_buoc() {
    const vungLamViec = document.getElementById('vung-lam-viec-hoc-sinh');
    vungLamViec.innerHTML = `<div style="text-align: center; padding: 40px;"><h3 style="color:#28a745;">⏳ Đang sắp xếp sơ đồ nhiệm vụ khoa học...</h3></div>`;

    try {
        let dsLop = GocHocSinhState.danh_sach_ma_lop || [];
        if (dsLop.length === 0) dsLop = ["#KHONG_CO_LOP#"];

        const orQuery = dsLop.map(ma => {
            const giaTriJson = JSON.stringify([ma]);
            const giaTriSafe = giaTriJson.replace(/"/g, '\\"');
            return `danh_sach_lop.cs."${giaTriSafe}"`;
        }).join(',');

        try {
            const { data: dsNV, error: errNV } = await _supabase
                .from('nhiem_vu')
                .select('*')
                .eq('trang_thai', 1)
                .or(orQuery)
                .order('ngay_tao', { ascending: false });

            if (errNV) throw errNV;
            GocHocSinhState.danhSachNhiemVu = dsNV || [];
        } catch (error) { console.error("Lỗi lấy NV:", error); }

        let demSoLuotLam = {};
        let ketQuaGanNhat = {};

        try {
            const { data: hsData } = await _supabase
                .from('hoc_sinh')
                .select('tien_do_lam_bai')
                .eq('uid', GocHocSinhState.uid)
                .single();

            if (hsData && hsData.tien_do_lam_bai) {
                demSoLuotLam = typeof hsData.tien_do_lam_bai === 'string'
                    ? JSON.parse(hsData.tien_do_lam_bai)
                    : hsData.tien_do_lam_bai;
            }

            const { data: dsKQ } = await _supabase
                .from('ket_qua_thi')
                .select('id, ma_nhiem_vu, tong_diem, thoi_gian_nop')
                .eq('uid_hoc_sinh', GocHocSinhState.uid)
                .order('thoi_gian_nop', { ascending: true });

            if (dsKQ) {
                dsKQ.forEach(kq => {
                    ketQuaGanNhat[kq.ma_nhiem_vu] = {
                        id: kq.id,
                        diem: kq.tong_diem,
                        thoi_gian_nop: kq.thoi_gian_nop
                    };
                });
            }
        } catch (e) { console.error("Lỗi lấy điểm:", e); }

        let tuDienLop = {};
        let tuDienGv = {};
        let tapUidGv = new Set();

        const { data: dataLop } = await _supabase.from('lop_hoc').select('ma_lop, ten_lop, uid_gv_tao').in('ma_lop', dsLop);
        if (dataLop) {
            dataLop.forEach(l => {
                tuDienLop[l.ma_lop] = l.ten_lop;
                if (l.uid_gv_tao) tapUidGv.add(l.uid_gv_tao);
            });
        }

        GocHocSinhState.danhSachNhiemVu.forEach(nv => {
            if (nv.uid_gv_tao) tapUidGv.add(nv.uid_gv_tao);
        });

        if (tapUidGv.size > 0) {
            const { data: dataGv } = await _supabase.from('hoc_sinh').select('uid, ten').in('uid', Array.from(tapUidGv));
            if (dataGv) {
                dataGv.forEach(gv => tuDienGv[gv.uid] = gv.ten);
            }
        }

        // PHÂN CHIA CHUẨN ĐÉT 4 NHÓM THEO ĐỀ XUẤT CỦA THẦY
        const now = new Date();
        let dsCanLam = [], dsLamLai = [], dsChuaLamKhoa = [], dsDaLamKhoa = [];

        const anToanThoiGian = (chuoiThoiGian) => chuoiThoiGian ? new Date(chuoiThoiGian) : null;

        GocHocSinhState.danhSachNhiemVu.forEach(nv => {
            const tDong = anToanThoiGian(nv.thoi_gian_dong);
            const soLuotDaLam = demSoLuotLam[nv.ma_nhiem_vu] || 0;
            const gioiHanLuot = nv.so_luot_lam_bai || 0;

            const daQuaHan = (tDong && now.getTime() > tDong.getTime());
            const daHetLuot = (gioiHanLuot > 0 && soLuotDaLam >= gioiHanLuot);

            if (daQuaHan || daHetLuot) {
                if (soLuotDaLam > 0) {
                    dsDaLamKhoa.push(nv);   // Nhóm 4: Đã làm (Đã khóa / Quá hạn)
                } else {
                    dsChuaLamKhoa.push(nv);  // Nhóm 3: Chưa làm (Đã khóa / Quá hạn)
                }
            } else {
                if (soLuotDaLam > 0) {
                    dsLamLai.push(nv);      // Nhóm 2: Đã làm (Có thể làm lại)
                } else {
                    dsCanLam.push(nv);      // Nhóm 1: Cần làm (Chưa làm lượt nào)
                }
            }
        });

        const tinhKhoangCachThoiGian = (targetDate) => {
            if (!targetDate) return "";
            const diff = targetDate.getTime() - now.getTime();
            const absDiff = Math.abs(diff);
            const d = Math.floor(absDiff / (1000 * 60 * 60 * 24));
            const h = Math.floor((absDiff / (1000 * 60 * 60)) % 24);
            const m = Math.floor((absDiff / (1000 * 60)) % 60);
            let str = "";
            if (d > 0) str += `${d} ngày `;
            if (h > 0) str += `${h} giờ `;
            if (m > 0 && d === 0) str += `${m} phút`;
            if (str === "") str = "vài giây";
            return diff > 0 ? `(Còn ${str})` : `(Đã đóng ${str} trước)`;
        };

        const thoiGianTroiQua = (dateStr) => {
            if (!dateStr) return "Không rõ";
            const date = new Date(dateStr);
            const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
            let interval = seconds / 86400;
            if (interval > 1) return Math.floor(interval) + " ngày trước";
            interval = seconds / 3600;
            if (interval > 1) return Math.floor(interval) + " giờ trước";
            interval = seconds / 60;
            if (interval > 1) return Math.floor(interval) + " phút trước";
            return "Vừa xong";
        };

        // HÀM VẼ THẺ CARD NHIỆM VỤ (Đã bọc Class và data-attribute chứa mảng lớp JSON)
        const renderCard = (nv, dinhDangTab) => {
            const tMo = anToanThoiGian(nv.thoi_gian_mo);
            const tDong = anToanThoiGian(nv.thoi_gian_dong);
            const tTao = nv.ngay_tao;
            const opts = { timeZone: 'Asia/Ho_Chi_Minh', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' };
            const fTime = (d) => d ? d.toLocaleString('vi-VN', opts) : "Không quy định";

            let tenLopHienThi = "Không xác định";
            let chuoiMangLopGoc = "[]"; // Dùng để pass mảng lớp sang data-attribute cho JS đọc
            try {
                const mangLopCuaNV = typeof nv.danh_sach_lop === 'string' ? JSON.parse(nv.danh_sach_lop) : (nv.danh_sach_lop || []);
                chuoiMangLopGoc = JSON.stringify(mangLopCuaNV);
                const cacLopKhop = mangLopCuaNV.filter(m => dsLop.includes(m)).map(m => tuDienLop[m] || m);
                if (cacLopKhop.length > 0) tenLopHienThi = cacLopKhop.join(', ');
            } catch (e) { }

            const tenGV = tuDienGv[nv.uid_gv_tao] || "Thầy/Cô";
            const soLuotDaLam = demSoLuotLam[nv.ma_nhiem_vu] || 0;
            const gioiHanLuot = nv.so_luot_lam_bai || 0;
            const textLuotChoPhep = gioiHanLuot === 0 ? "Vô hạn" : gioiHanLuot;

            const daQuaHan = (tDong && now.getTime() > tDong.getTime());
            const daHetLuot = (gioiHanLuot > 0 && soLuotDaLam >= gioiHanLuot);

            let mauVien = "#28a745", textBadgeTrangThai = "";
            if (dinhDangTab === 'CHUA_LAM_KHOA') { mauVien = "#7f8c8d"; textBadgeTrangThai = "⬛ CHƯA LÀM (QUÁ HẠN)"; }
            else if (dinhDangTab === 'DA_LAM_KHOA') { mauVien = "#e74c3c"; textBadgeTrangThai = "🟥 ĐÃ LÀM (ĐÃ KHÓA)"; }
            else if (dinhDangTab === 'LAM_LAI') { mauVien = "#00b4d8"; textBadgeTrangThai = "🟨 ĐÃ LÀM (CÒN LƯỢT)"; }
            else { mauVien = "#28a745"; textBadgeTrangThai = "🟩 CHƯA LÀM (MỚI)"; }

            const kqLatest = ketQuaGanNhat[nv.ma_nhiem_vu];
            let htmlKetQua = "";
            if (soLuotDaLam > 0 && kqLatest) {
                htmlKetQua = `
                    <div style="background: #fffdf5; border: 1px dashed #f39c12; border-radius: 8px; padding: 10px; margin-bottom: 12px;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <div style="font-size: 10px; color: #d35400; font-weight: bold;">⭐ ĐIỂM SỐ ĐÃ ĐẠT:</div>
                                <div style="color: #c0392b; font-size: 20px; font-weight: 900;">${kqLatest.diem} <span style="font-size: 11px; font-weight: normal; color: #666;">điểm</span></div>
                            </div>
                            <button onclick="ham_8_13_xem_lai_ket_qua('${nv.ma_nhiem_vu}', '${kqLatest.id}')" style="padding: 5px 10px; background: white; color: #d35400; border: 1px solid #d35400; border-radius: 4px; font-weight: bold; font-size: 11px; cursor: pointer;">👁️ XEM GIẢI</button>
                        </div>
                    </div>
                `;
            }

            let nutHanhDong = "";
            if (dinhDangTab === 'CHUA_LAM_KHOA') {
                const tenNhiemVuAnToan = (nv.ten_nhiem_vu || "Nhiệm vụ").replace(/'/g, "\\'");
                nutHanhDong = `<button onclick="ham_8_15_xin_luot_lam_bai('${nv.ma_nhiem_vu}', '${tenNhiemVuAnToan}', 'QUA_HAN')" style="width: 100%; padding: 11px; background: #7f8c8d; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">🙋 XIN NỘP QUÁ HẠN</button>`;
            } else if (dinhDangTab === 'DA_LAM_KHOA') {
                const tenNhiemVuAnToan = (nv.ten_nhiem_vu || "Nhiệm vụ").replace(/'/g, "\\'");
                let textNutXin = daHetLuot && !daQuaHan ? "🙋 XIN THÊM LƯỢT LÀM" : "🙋 XIN GỠ ĐIỂM QUÁ HẠN";
                let maLoaiXin = daHetLuot && !daQuaHan ? "HET_LUOT" : "QUA_HAN";
                nutHanhDong = `<button onclick="ham_8_15_xin_luot_lam_bai('${nv.ma_nhiem_vu}', '${tenNhiemVuAnToan}', '${maLoaiXin}')" style="width: 100%; padding: 11px; background: #e74c3c; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">${textNutXin}</button>`;
            } else if (dinhDangTab === 'LAM_LAI') {
                nutHanhDong = `<button onclick="ham_8_7_cua_an_ninh('${nv.ma_nhiem_vu}')" style="width: 100%; padding: 11px; background: #00b4d8; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">🔄 LÀM LẠI LẦN NỮA</button>`;
            } else {
                nutHanhDong = `<button onclick="ham_8_7_cua_an_ninh('${nv.ma_nhiem_vu}')" style="width: 100%; padding: 11px; background: #28a745; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">🚀 VÀO LÀM BÀI</button>`;
            }

            // 🌟 ĐÃ VÁ LỖI: Bổ sung class 'card-nhiem-vu-hs' và ghim mảng lớp vào thuộc tính data-mangs-lop
            return `
                <div class="card-nhiem-vu-hs" data-mangs-lop='${chuoiMangLopGoc}' style="background: white; border: 1px solid #e0e0e0; border-top: 4px solid ${mauVien}; border-radius: 10px; padding: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.02); display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <div style="font-size: 11px; font-weight: bold; color: ${mauVien}; margin-bottom: 6px; text-transform: uppercase;">${textBadgeTrangThai}</div>
                        <h4 style="margin: 0 0 10px 0; color: #2c3e50; font-size: 15px; line-height: 1.4;">${nv.ten_nhiem_vu}</h4>
                        
                        <div style="background: #f8f9fa; border-radius: 6px; padding: 8px; margin-bottom: 10px; font-size: 12px; color: #666;">
                            <div>🏫 <b>Lớp:</b> ${tenLopHienThi}</div>
                            <div>👤 <b>Thầy/Cô:</b> ${tenGV}</div>
                        </div>

                        <div style="display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 10px;">
                            <span style="font-size: 11px; background: #e9ecef; color: #495057; padding: 2px 6px; border-radius:4px;">⏱️ ${nv.thoi_gian_lam_bai > 0 ? nv.thoi_gian_lam_bai + ' ph' : 'Tự do'}</span>
                            <span style="font-size: 11px; background: #e9ecef; color: #495057; padding: 2px 6px; border-radius:4px;">🔄 Lượt: ${soLuotDaLam}/${textLuotChoPhep}</span>
                        </div>
                        
                        <div style="font-size: 11px; color: #7f8c8d; margin-bottom: 12px;">
                            <span style="color:#7f8c8d; font-weight:bold;">Hạn chót:</span> ${fTime(tDong)} <br>
                            <span style="color:#d35400; font-style:italic;">${tDong && !daQuaHan ? tinhKhoangCachThoiGian(tDong) : ""}</span>
                        </div>
                    </div>
                    <div>
                        ${htmlKetQua}
                        ${nutHanhDong}
                    </div>
                </div>
            `;
        };

        // RÁP GIAO DIỆN PHÂN TÁCH BIỆT LẬP 4 TAB NỘI BỘ VÀ THANH LỌC LỚP CHUYÊN NGHIỆP
        vungLamViec.innerHTML = `
            <div id="thanh-loc-lop-goc-hoc-sing" style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 15px; padding: 10px; background: #fff; border-radius: 8px; border: 1px dashed #ced4da; align-items: center;">
                <span style="font-weight: bold; color: #495057; font-size: 13px;">🏫 Lớp đang xem:</span>
                <button class="btn-loc-lop-cua-hs active" onclick="ham_8_x_loc_card_theo_lop('TAT_CA', this)" style="padding: 5px 12px; background: #6f42c1; color: white; border: 1px solid #6f42c1; border-radius: 15px; font-weight: bold; cursor: pointer; font-size: 12px; transition: 0.2s;">🌍 Tất cả các lớp</button>
                <span id="cac-nut-lop-hs-loc" style="display: flex; gap: 8px; flex-wrap: wrap;"></span>
            </div>

            <div style="display: flex; border-bottom: 2px solid #dee2e6; margin-bottom: 20px; gap: 5px; background: #fff; padding: 5px 5px 0 5px; border-radius: 8px 8px 0 0; flex-wrap: wrap;">
                <button id="btn-tab-can-lam" onclick="ham_8_x_switch_sub_tab('CAN_LAM')" style="padding: 10px 16px; border: none; background: #28a745; color: white; font-weight: bold; font-size: 13px; border-radius: 6px 6px 0 0; cursor: pointer; transition: 0.2s;">
                    🎯 CẦN LÀM (${dsCanLam.length})
                </button>
                <button id="btn-tab-lam-lai" onclick="ham_8_x_switch_sub_tab('LAM_LAI')" style="padding: 10px 16px; border: none; background: transparent; color: #495057; font-weight: bold; font-size: 13px; border-radius: 6px 6px 0 0; cursor: pointer; transition: 0.2s;">
                    🔄 ĐÃ LÀM (CÒN LƯỢT) (${dsLamLai.length})
                </button>
                <button id="btn-tab-chua-lam-khoa" onclick="ham_8_x_switch_sub_tab('CHUA_LAM_KHOA')" style="padding: 10px 16px; border: none; background: transparent; color: #495057; font-weight: bold; font-size: 13px; border-radius: 6px 6px 0 0; cursor: pointer; transition: 0.2s;">
                    ⬛ CHƯA LÀM (ĐÃ KHÓA) (${dsChuaLamKhoa.length})
                </button>
                <button id="btn-tab-da-lam-khoa" onclick="ham_8_x_switch_sub_tab('DA_LAM_KHOA')" style="padding: 10px 16px; border: none; background: transparent; color: #495057; font-weight: bold; font-size: 13px; border-radius: 6px 6px 0 0; cursor: pointer; transition: 0.2s;">
                    🟥 ĐÃ LÀM (ĐÃ KHÓA) (${dsDaLamKhoa.length})
                </button>
            </div>

            <div id="vung-chua-cards-nhiem-vu" style="min-height: 200px;"></div>
        `;

        // ĐỔ NÚT LỚP THỰC TẾ VÀO THANH LỌC ĐẦU TRANG
        const khungNutLopCuaHs = document.getElementById('cac-nut-lop-hs-loc');
        if (khungNutLopCuaHs && dataLop) {
            let htmlNutLop = '';
            dataLop.forEach(l => {
                htmlNutLop += `
                    <button class="btn-loc-lop-cua-hs" onclick="ham_8_x_loc_card_theo_lop('${l.ma_lop}', this)" style="padding: 5px 12px; background: white; color: #495057; border: 1px solid #ced4da; border-radius: 15px; font-weight: bold; cursor: pointer; font-size: 12px; transition: 0.2s;" onmouseover="this.style.background='#f1f3f4'" onmouseout="if(!this.classList.contains('active')) this.style.background='white'">
                        🏫 ${l.ten_lop}
                    </button>
                `;
            });
            khungNutLopCuaHs.innerHTML = htmlNutLop;
        }

        // Định danh lớp lưu trữ toàn cục chống trôi trạng thái khi đổi Tab
        window.MaLopDangLocHienTai = 'TAT_CA';

        // CACHED HTML BỐC VẼ THEO KHUNG LƯỚI
        window.CachedCardsCanLamHtml = dsCanLam.length === 0
            ? '<div style="text-align:center; color:#7f8c8d; padding: 40px; font-style:italic; background:white; border-radius:8px; border:1px dashed #ccc;">🥳 Tuyệt vời! Em đã hoàn thành sạch sẽ toàn bộ bài tập!</div>'
            : `<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 15px;">${dsCanLam.map(nv => renderCard(nv, 'CAN_LAM')).join('')}</div>`;

        window.CachedCardsLamLaiHtml = dsLamLai.length === 0
            ? '<div style="text-align:center; color:#7f8c8d; padding: 40px; font-style:italic; background:white; border-radius:8px; border:1px dashed #ccc;">🍃 Không có bài tập nào chờ em cải thiện điểm số.</div>'
            : `<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 15px;">${dsLamLai.map(nv => renderCard(nv, 'LAM_LAI')).join('')}</div>`;

        window.CachedCardsChuaLamKhoaHtml = dsChuaLamKhoa.length === 0
            ? '<div style="text-align:center; color:#28a745; padding: 40px; font-style:italic; background:white; border-radius:8px; font-weight:bold;">✅ Rất tốt! Em không bỏ sót bất kỳ bài tập nào khi hết hạn!</div>'
            : `<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 15px;">${dsChuaLamKhoa.map(nv => renderCard(nv, 'CHUA_LAM_KHOA')).join('')}</div>`;

        window.CachedCardsDaLamKhoaHtml = dsDaLamKhoa.length === 0
            ? '<div style="text-align:center; color:#7f8c8d; padding: 40px; font-style:italic; background:white; border-radius:8px; border:1px dashed #ccc;">Trống.</div>'
            : `<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 15px;">${dsDaLamKhoa.map(nv => renderCard(nv, 'DA_LAM_KHOA')).join('')}</div>`;

        window.ham_8_x_switch_sub_tab('CAN_LAM');

    } catch (error) {
        vungLamViec.innerHTML = `<div style="color: red; text-align: center; padding: 20px;">❌ Lỗi hệ thống: ${error.message}</div>`;
    }
}



// =====================================================================
// Hàm bổ trợ: Chuyển đổi trạng thái Tab nội bộ (Giữ bộ số đếm động)
// =====================================================================
window.ham_8_x_switch_sub_tab = function (loaiTab) {
    const btnCanLam = document.getElementById('btn-tab-can-lam');
    const btnLamLai = document.getElementById('btn-tab-lam-lai');
    const btnChuaKhoa = document.getElementById('btn-tab-chua-lam-khoa');
    const btnDaKhoa = document.getElementById('btn-tab-da-lam-khoa');
    const vungChua = document.getElementById('vung-chua-cards-nhiem-vu');

    if (!vungChua || !btnCanLam || !btnLamLai || !btnChuaKhoa || !btnDaKhoa) return;

    // Reset styles màu tab thụ động
    [btnCanLam, btnLamLai, btnChuaKhoa, btnDaKhoa].forEach(btn => {
        btn.style.background = 'transparent';
        btn.style.color = '#495057';
    });

    // Điền HTML tương ứng từ Cache vào vùng hiển thị
    if (loaiTab === 'CAN_LAM') {
        btnCanLam.style.background = '#28a745'; btnCanLam.style.color = 'white';
        vungChua.innerHTML = window.CachedCardsCanLamHtml;
    } else if (loaiTab === 'LAM_LAI') {
        btnLamLai.style.background = '#00b4d8'; btnLamLai.style.color = 'white';
        vungChua.innerHTML = window.CachedCardsLamLaiHtml;
    } else if (loaiTab === 'CHUA_LAM_KHOA') {
        btnChuaKhoa.style.background = '#7f8c8d'; btnChuaKhoa.style.color = 'white';
        vungChua.innerHTML = window.CachedCardsChuaLamKhoaHtml;
    } else if (loaiTab === 'DA_LAM_KHOA') {
        btnDaKhoa.style.background = '#e74c3c'; btnDaKhoa.style.color = 'white';
        vungChua.innerHTML = window.CachedCardsDaLamKhoaHtml;
    }

    // 🌟 Ép chạy lại bộ lọc lớp để ẩn Card thừa VÀ giữ vững số đếm động trên các nhãn nút
    const nutActive = document.querySelector('.btn-loc-lop-cua-hs.active');
    const lopHienTai = window.MaLopDangLocHienTai || 'TAT_CA';
    if (nutActive) {
        window.ham_8_x_loc_card_theo_lop(lopHienTai, nutActive, true);
    }
};

// =====================================================================
// Hàm bổ trợ: Thực hiện bóc tách mảng JSON để lọc lớp chính xác 100%
// =====================================================================
window.ham_8_x_loc_card_theo_lop = function (maLopChon, nutBam, isGoiNoiBo = false) {
    window.MaLopDangLocHienTai = maLopChon;

    // Chỉ đổi màu nút khi click trực tiếp, không đổi màu nếu là hàm switch_tab gọi ngầm
    if (!isGoiNoiBo) {
        document.querySelectorAll('.btn-loc-lop-cua-hs').forEach(btn => {
            btn.classList.remove('active');
            btn.style.background = 'white'; btn.style.color = '#495057'; btn.style.borderColor = '#ced4da';
        });
        nutBam.classList.add('active');
        nutBam.style.background = '#6f42c1'; nutBam.style.color = 'white'; nutBam.style.borderColor = '#6f42c1';
    }

    // Quét qua toàn bộ thẻ card có class chuẩn 'card-nhiem-vu-hs'
    const cards = document.querySelectorAll('#vung-chua-cards-nhiem-vu .card-nhiem-vu-hs');

    cards.forEach(card => {
        if (maLopChon === 'TAT_CA') {
            card.style.display = ""; // Hiện hết
        } else {
            try {
                // Bốc chuỗi JSON chứa danh sách lớp được gán ở data-attribute ra phân tích
                const mangLopJsonStr = card.getAttribute('data-mangs-lop') || "[]";
                const mangLopCuaCard = JSON.parse(mangLopJsonStr);

                // Kiểm tra xem mã lớp thầy chọn có nằm trong mảng lớp được giao của bài này không
                if (mangLopCuaCard.includes(maLopChon)) {
                    card.style.display = ""; // Khớp mã -> Hiện
                } else {
                    card.style.display = "none"; // Lệch mã -> Ẩn ngầm
                }
            } catch (err) {
                card.style.display = ""; // Bọc lót nếu lỗi chuỗi JSON
            }
        }
    });
    // 2. 🌟 TÍNH NĂNG NÂNG CẤP: ĐẾM ĐỘNG SỐ LƯỢNG THEO LỚP CHO TOÀN BỘ 4 NHÃN TAB
    window.ham_8_x_cap_nhat_so_luong_nhan_tab(maLopChon);

};



// =====================================================================
// Hàm phụ mới: Tính toán và cập nhật con số hiển thị trên 4 nhãn Tab
// =====================================================================
window.ham_8_x_cap_nhat_so_luong_nhan_tab = function (maLopChon) {
    // Tạo một trình giả lập kiểm tra điều kiện lớp nhanh
    const checkHopLeLop = (htmlCardStr) => {
        if (maLopChon === 'TAT_CA') return true;
        // Tìm chuỗi chứa mã lớp trong thuộc tính data-mangs-lop của HTML cache
        return htmlCardStr.includes(`"${maLopChon}"`);
    };

    // Tạo parser tạm thời để đếm số lượng phần tử card thỏa mãn từ bộ nhớ đệm (Cache)
    const demCardThoalMan = (htmlGoc) => {
        if (!htmlGoc || htmlGoc.includes("text-align:center")) return 0;

        // Tạo một Div ảo trên RAM để ép HTML vào đếm cho chính xác
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlGoc;
        const cacCards = tempDiv.querySelectorAll('.card-nhiem-vu-hs');

        let bieuDem = 0;
        cacCards.forEach(c => {
            try {
                const mangLop = JSON.parse(c.getAttribute('data-mangs-lop') || "[]");
                if (maLopChon === 'TAT_CA' || mangLop.includes(maLopChon)) {
                    bieuDem++;
                }
            } catch (e) { }
        });
        return bieuDem;
    };

    // Đếm số lượng thực tế theo bộ lọc lớp hiện tại
    const countCanLam = demCardThoalMan(window.CachedCardsCanLamHtml);
    const countLamLai = demCardThoalMan(window.CachedCardsLamLaiHtml);
    const countChuaKhoa = demCardThoalMan(window.CachedCardsChuaLamKhoaHtml);
    const countDaKhoa = demCardThoalMan(window.CachedCardsDaLamKhoaHtml);

    // Ghi đè con số mới lên giao diện nhãn text của 4 nút Tab
    const btnCanLam = document.getElementById('btn-tab-can-lam');
    const btnLamLai = document.getElementById('btn-tab-lam-lai');
    const btnChuaKhoa = document.getElementById('btn-tab-chua-lam-khoa');
    const btnDaKhoa = document.getElementById('btn-tab-da-lam-khoa');

    if (btnCanLam) btnCanLam.innerText = `🎯 CẦN LÀM (${countCanLam})`;
    if (btnLamLai) btnLamLai.innerText = `🔄 ĐÃ LÀM (CÒN LƯỢT) (${countLamLai})`;
    if (btnChuaKhoa) btnChuaKhoa.innerText = `⬛ CHƯA LÀM (ĐÃ KHÓA) (${countChuaKhoa})`;
    if (btnDaKhoa) btnDaKhoa.innerText = `🟥 ĐÃ LÀM (ĐÃ KHÓA) (${countDaKhoa})`;
};








// =====================================================================
// Hàm 8.15: Sự kiện Học sinh nộp lý do xin giải cứu (XỬ LÝ ĐA LUỒNG)
// =====================================================================
window.ham_8_15_xin_luot_lam_bai = function (maNhiemVu, tenNhiemVu, loaiXin) {
    let tieuDePrompt = 'XIN THÊM LƯỢT LÀM BÀI';
    let placeholderPrompt = 'Ví dụ: Em muốn làm lại để cải thiện điểm số, mong Thầy cấp thêm lượt...';

    if (loaiXin === 'QUA_HAN') {
        tieuDePrompt = 'XIN NỘP BÀI QUÁ HẠN';
        placeholderPrompt = 'Ví dụ: Hôm qua nhà em bị cúp điện, Thầy duyệt cho em xin nộp bù bài này ạ...';
    }

    Swal.fire({
        title: tieuDePrompt,
        text: `Nhiệm vụ "${tenNhiemVu}" đã khóa. Em hãy nhập lý do gửi Thầy để xin xét duyệt:`,
        input: 'textarea',
        inputPlaceholder: placeholderPrompt,
        inputAttributes: { 'aria-label': 'Nhập lý do của em' },
        showCancelButton: true,
        confirmButtonText: '🚀 GỬI YÊU CẦU ĐẾN THẦY',
        cancelButtonText: 'Hủy',
        confirmButtonColor: '#fd7e14',
        cancelButtonColor: '#6c757d',
        showLoaderOnConfirm: true,
        inputValidator: (value) => {
            if (!value.trim()) return 'Em bắt buộc phải nhập lý do rõ ràng thì Thầy mới duyệt được nhé!';
        },
        preConfirm: async (lyDoHS) => {
            try {
                // =========================================================
                // 🌟 BƯỚC A: KIỂM TRA ĐƠN ĐANG CHỜ DUYỆT
                // =========================================================
                const { data: donDangCho, error: errCheck } = await _supabase
                    .from('yeu_cau_hoc_sinh')
                    .select('id')
                    .eq('uid_hoc_sinh', GocHocSinhState.uid)
                    .eq('ma_nhiem_vu', maNhiemVu)
                    .eq('loai_yeu_cau', loaiXin)
                    .eq('trang_thai', 0); // Chỉ quét các đơn đang chờ (Trạng thái = 0)

                if (errCheck) throw errCheck;

                // Nếu có đơn đang chờ -> Dừng lại và báo lỗi ngay trên popup
                if (donDangCho && donDangCho.length > 0) {
                    Swal.showValidationMessage('⏳ Em đã gửi đơn này rồi! Đơn đang nằm trên bàn làm việc của Thầy, em kiên nhẫn đợi Thầy duyệt nhé!');
                    return false;
                }

                // =========================================================
                // 🌟 BƯỚC B: TẠO ĐƠN MỚI (LƯU LẠI LỊCH SỬ)
                // =========================================================
                const chuoiMaLop = (GocHocSinhState.danh_sach_ma_lop || []).join(', ');

                const payload = {
                    uid_hoc_sinh: GocHocSinhState.uid,
                    ten_hoc_sinh: GocHocSinhState.ten,
                    loai_yeu_cau: loaiXin,
                    ma_nhiem_vu: maNhiemVu,
                    ma_lop: chuoiMaLop,
                    ten_nhiem_vu: tenNhiemVu,
                    ly_do: lyDoHS,
                    trang_thai: 0
                };

                const { error: errInsert } = await _supabase.from('yeu_cau_hoc_sinh').insert([payload]);
                if (errInsert) throw errInsert;

                return true;
            } catch (error) {
                console.error("LỖI GỬI ĐƠN:", error);
                Swal.showValidationMessage(`Lỗi hệ thống: ${error.message}`);
                return false;
            }
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                icon: 'success',
                title: 'Đã gửi đơn thành công!',
                text: 'Yêu cầu của em đã được ném vào Hòm thư của Giáo viên. Hãy đợi Thầy duyệt nha!',
                confirmButtonColor: '#28a745'
            });
        }
    });
};





// [Nhãn thời gian: 13:21 - Ngày 28/05/2026] - Hàm 8.3: Tab Luyện tập tự do (ĐÃ CHẶN NHIỆM VỤ ẢO CỦA PHÒNG LIVE)
window.ham_8_3_tab_luyen_tap_tu_do = async function () {
    const vungLamViec = document.getElementById('vung-lam-viec-hoc-sinh');
    vungLamViec.innerHTML = `<div style="text-align: center; padding: 40px;"><h3 style="color:#17a2b8;">⏳ Đang tải danh sách bài tự luyện...</h3></div>`;

    try {
        // 1. Kéo toàn bộ nhiệm vụ mang nhãn TỰ DO từ server
        const { data: dsNV, error: errNV } = await _supabase
            .from('nhiem_vu')
            .select('*')
            .eq('trang_thai', 1)
            .contains('danh_sach_lop', '["#LUYEN_TAP_TU_DO#"]')
            .order('ngay_tao', { ascending: false });

        if (errNV) throw errNV;

        // 🌟 2. MÀNG LỌC BẢO MẬT: CHẶN CÁC NHIỆM VỤ CỦA ĐẤU TRƯỜNG LIVE LỌT VÀO ĐÂY
        // Chỉ giữ lại những nhiệm vụ mà mã KHÔNG bắt đầu bằng chữ "LIVE_"
        const dsTuLuyenThucSu = (dsNV || []).filter(nv => !nv.ma_nhiem_vu.startsWith('LIVE_'));

        if (dsTuLuyenThucSu.length === 0) {
            vungLamViec.innerHTML = `<div style="text-align: center; padding: 40px; color: #666; font-style: italic;">🍃 Hiện tại chưa có bài tập tự luyện nào đang mở.</div>`;
            return;
        }

        // 3. Kéo kết quả điểm số để xem tiến độ (Giống hệt logic hàm 8.2)
        let demSoLuotLam = {};
        const { data: hsData } = await _supabase.from('hoc_sinh').select('tien_do_lam_bai').eq('uid', GocHocSinhState.uid).single();
        if (hsData && hsData.tien_do_lam_bai) {
            demSoLuotLam = typeof hsData.tien_do_lam_bai === 'string' ? JSON.parse(hsData.tien_do_lam_bai) : hsData.tien_do_lam_bai;
        }

        // 4. Render giao diện các Card Tự luyện
        let htmlCards = `<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 15px; padding-top: 10px;">`;

        dsTuLuyenThucSu.forEach(nv => {
            const soLuotDaLam = demSoLuotLam[nv.ma_nhiem_vu] || 0;
            const textLuot = nv.so_luot_lam_bai > 0 ? `${soLuotDaLam}/${nv.so_luot_lam_bai}` : `${soLuotDaLam}/Vô hạn`;

            let btnAction = `<button onclick="ham_8_7_cua_an_ninh('${nv.ma_nhiem_vu}')" style="width: 100%; padding: 10px; background: #17a2b8; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">🚀 VÀO LUYỆN TẬP</button>`;

            if (nv.so_luot_lam_bai > 0 && soLuotDaLam >= nv.so_luot_lam_bai) {
                btnAction = `<button disabled style="width: 100%; padding: 10px; background: #e9ecef; color: #dc3545; border: none; border-radius: 6px; font-weight: bold; cursor: not-allowed;">🛑 ĐÃ HẾT LƯỢT</button>`;
            } else if (soLuotDaLam > 0) {
                btnAction = `<button onclick="ham_8_7_cua_an_ninh('${nv.ma_nhiem_vu}')" style="width: 100%; padding: 10px; background: #00b4d8; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">🔄 LUYỆN TẬP LẠI</button>`;
            }

            htmlCards += `
                <div style="background: white; border: 1px solid #e0e0e0; border-top: 4px solid #17a2b8; border-radius: 10px; padding: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.02); display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <div style="font-size: 11px; font-weight: bold; color: #17a2b8; margin-bottom: 6px;">🌍 KHU TỰ LUYỆN</div>
                        <h4 style="margin: 0 0 10px 0; color: #2c3e50; font-size: 15px; line-height: 1.4;">${nv.ten_nhiem_vu}</h4>
                        <div style="display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 15px;">
                            <span style="font-size: 11px; background: #e9ecef; color: #495057; padding: 2px 6px; border-radius:4px;">⏱️ ${nv.thoi_gian_lam_bai > 0 ? nv.thoi_gian_lam_bai + ' ph' : 'Tự do'}</span>
                            <span style="font-size: 11px; background: #e9ecef; color: #495057; padding: 2px 6px; border-radius:4px;">🔄 Lượt: ${textLuot}</span>
                        </div>
                    </div>
                    <div>${btnAction}</div>
                </div>
            `;
        });

        htmlCards += `</div>`;
        vungLamViec.innerHTML = htmlCards;

    } catch (error) {
        vungLamViec.innerHTML = `<div style="color: red; text-align: center; padding: 20px;">❌ Lỗi hệ thống: ${error.message}</div>`;
    }
};




// =====================================================================
// Hàm 8.4: Tab HỌC BÀ VÀ ĐIỂM SỐ (Bảng điều khiển cá nhân)
// =====================================================================
async function ham_8_4_tab_ket_qua() {
    const vungLamViec = document.getElementById('vung-lam-viec-hoc-sinh');
    vungLamViec.innerHTML = `
        <div style="text-align: center; padding: 60px;">
            <div style="border: 4px solid #f3f3f3; border-top: 4px solid #6f42c1; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 0 auto;"></div>
            <h3 style="color:#6f42c1; margin-top:20px;">📊 Đang trích xuất sổ học bạ...</h3>
        </div>
    `;

    try {
        // 1. TẢI TOÀN BỘ LỊCH SỬ LÀM BÀI CỦA HỌC SINH NÀY TỪ SUPABASE
        const { data: dsKQ, error: errKQ } = await _supabase
            .from('ket_qua_thi')
            .select('*')
            .eq('uid_hoc_sinh', GocHocSinhState.uid)
            .order('thoi_gian_nop', { ascending: false }); // Sắp xếp Mới nhất lên đầu

        if (errKQ) throw errKQ;

        // Xử lý khi chưa có dữ liệu
        if (!dsKQ || dsKQ.length === 0) {
            vungLamViec.innerHTML = `
                <div style="text-align: center; padding: 50px; background: #fff; border-radius: 10px; border: 1px dashed #ccc;">
                    <p style="font-size: 60px; margin:0;">📈</p>
                    <h3 style="color: #6c757d;">Học bạ trống</h3>
                    <p style="color: #888;">Em chưa có kết quả làm bài nào. Hãy vào mục Nhiệm vụ hoặc Tự luyện để bắt đầu chinh phục điểm số nhé!</p>
                </div>
            `;
            return;
        }

        // 2. TẠO TỪ ĐIỂN MAP TÊN NHIỆM VỤ (Vì bảng ket_qua_thi chỉ lưu mã nhiệm vụ)
        // Gom các mã nhiệm vụ duy nhất để lấy tên 1 lần cho nhẹ Server
        const danhSachMaNhiemVu = [...new Set(dsKQ.map(kq => kq.ma_nhiem_vu))];
        let tuDienNhiemVu = {};

        if (danhSachMaNhiemVu.length > 0) {
            const { data: dsNV } = await _supabase
                .from('nhiem_vu')
                .select('ma_nhiem_vu, ten_nhiem_vu, loai_nhiem_vu')
                .in('ma_nhiem_vu', danhSachMaNhiemVu);

            if (dsNV) {
                dsNV.forEach(nv => {
                    tuDienNhiemVu[nv.ma_nhiem_vu] = {
                        ten: nv.ten_nhiem_vu,
                        loai: nv.loai_nhiem_vu || "Luyện tập"
                    };
                });
            }
        }

        // 3. TÍNH TOÁN CÁC CHỈ SỐ THỐNG KÊ (DASHBOARD)
        let tongSoLuot = dsKQ.length;
        let tongDiem = 0;
        let diemCaoNhat = 0;

        dsKQ.forEach(kq => {
            let d = Number(kq.tong_diem) || 0;
            tongDiem += d;
            if (d > diemCaoNhat) diemCaoNhat = d;
        });

        let diemTrungBinh = tongSoLuot > 0 ? (tongDiem / tongSoLuot).toFixed(2) : 0;

        // 4. VẼ GIAO DIỆN BẢNG ĐIỀU KHIỂN
        let htmlDashBoard = `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 25px;">
                <div style="background: linear-gradient(135deg, #6f42c1, #8e44ad); color: white; padding: 20px; border-radius: 10px; box-shadow: 0 4px 10px rgba(111,66,193,0.2); text-align: center;">
                    <div style="font-size: 14px; text-transform: uppercase; font-weight: bold; opacity: 0.9;">Tổng Lượt Nộp Bài</div>
                    <div style="font-size: 36px; font-weight: 900; margin-top: 5px;">${tongSoLuot}</div>
                </div>
                <div style="background: linear-gradient(135deg, #17a2b8, #00b894); color: white; padding: 20px; border-radius: 10px; box-shadow: 0 4px 10px rgba(23,162,184,0.2); text-align: center;">
                    <div style="font-size: 14px; text-transform: uppercase; font-weight: bold; opacity: 0.9;">Điểm Cao Nhất</div>
                    <div style="font-size: 36px; font-weight: 900; margin-top: 5px;">${diemCaoNhat}</div>
                </div>
                <div style="background: linear-gradient(135deg, #fd7e14, #e67e22); color: white; padding: 20px; border-radius: 10px; box-shadow: 0 4px 10px rgba(253,126,20,0.2); text-align: center;">
                    <div style="font-size: 14px; text-transform: uppercase; font-weight: bold; opacity: 0.9;">Điểm Trung Bình</div>
                    <div style="font-size: 36px; font-weight: 900; margin-top: 5px;">${diemTrungBinh}</div>
                </div>
            </div>
        `;

        // 5. VẼ BẢNG LỊCH SỬ LÀM BÀI CHI TIẾT
        const optsTime = { timeZone: 'Asia/Ho_Chi_Minh', day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };

        let htmlTableRows = '';
        dsKQ.forEach((kq, index) => {
            const thongTinNV = tuDienNhiemVu[kq.ma_nhiem_vu] || { ten: "Bài tập đã xóa khỏi hệ thống", loai: "N/A" };
            const ngayNop = kq.thoi_gian_nop ? new Date(kq.thoi_gian_nop).toLocaleString('vi-VN', optsTime) : "Không rõ";

            // Định dạng màu điểm: >= 8 (Xanh lá), >= 5 (Vàng/Cam), < 5 (Đỏ)
            let colorDiem = "#28a745";
            if (kq.tong_diem < 5) colorDiem = "#dc3545";
            else if (kq.tong_diem < 8) colorDiem = "#d35400";

            htmlTableRows += `
                <tr style="border-bottom: 1px solid #f0f0f0; transition: background 0.2s;" onmouseover="this.style.background='#f8f9fa'" onmouseout="this.style.background='white'">
                    <td style="padding: 12px 10px; text-align: center; color: #666; font-weight:bold;">${index + 1}</td>
                    <td style="padding: 12px 10px;">
                        <div style="font-weight: bold; color: #2c3e50; font-size: 15px;">${thongTinNV.ten}</div>
                        <div style="font-size: 11px; color: #888; margin-top: 4px;">
                            <span style="background: #e9ecef; padding: 2px 6px; border-radius: 4px;">${thongTinNV.loai}</span> 
                            • Lần thứ: ${kq.lan_thu || 1}
                        </div>
                    </td>
                    <td style="padding: 12px 10px; text-align: center;">
                        <span style="font-size: 12px; color: #6c757d;">⏱️ ${kq.thoi_gian_lam_bai || "---"}</span>
                    </td>
                    <td style="padding: 12px 10px; text-align: center;">
                        <span style="font-size: 12px; color: #6c757d;">🕒 ${ngayNop}</span>
                    </td>
                    <td style="padding: 12px 10px; text-align: center;">
                        <span style="font-size: 18px; font-weight: 900; color: ${colorDiem}; background: ${colorDiem}15; padding: 4px 10px; border-radius: 6px; border: 1px solid ${colorDiem}40;">
                            ${Number(kq.tong_diem).toFixed(2)}
                        </span>
                    </td>
                    <td style="padding: 12px 10px; text-align: center;">
                        <button onclick="ham_8_13_xem_lai_ket_qua('${kq.ma_nhiem_vu}', '${kq.id}')" 
                                style="padding: 6px 12px; background: #fff; color: #6f42c1; border: 1px solid #6f42c1; border-radius: 4px; font-size: 12px; font-weight: bold; cursor: pointer; transition: 0.2s;"
                                onmouseover="this.style.background='#6f42c1'; this.style.color='#fff'" onmouseout="this.style.background='#fff'; this.style.color='#6f42c1'">
                            👁️ CHI TIẾT
                        </button>
                    </td>
                </tr>
            `;
        });

        let htmlTable = `
            <div style="background: white; border: 1px solid #e0e0e0; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.02); overflow: hidden;">
                <div style="background: #f8f9fa; padding: 15px; border-bottom: 1px solid #e0e0e0; font-weight: bold; color: #333; font-size: 15px;">
                    📝 LỊCH SỬ CHINH CHIẾN
                </div>
                <div style="overflow-x: auto;">
                    <table style="width: 100%; border-collapse: collapse; text-align: left; min-width: 700px;">
                        <thead style="background: #fdfdfe; border-bottom: 2px solid #dee2e6;">
                            <tr>
                                <th style="padding: 12px 10px; text-align: center; color: #495057; width: 50px;">STT</th>
                                <th style="padding: 12px 10px; color: #495057;">Tên Nhiệm Vụ</th>
                                <th style="padding: 12px 10px; text-align: center; color: #495057; width: 120px;">Thời Gian Trôi</th>
                                <th style="padding: 12px 10px; text-align: center; color: #495057; width: 150px;">Ngày Nộp</th>
                                <th style="padding: 12px 10px; text-align: center; color: #495057; width: 100px;">Điểm Số</th>
                                <th style="padding: 12px 10px; text-align: center; color: #495057; width: 100px;">Thao Tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${htmlTableRows}
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        vungLamViec.innerHTML = `<div style="max-width: 1000px; margin: 0 auto;">${htmlDashBoard} ${htmlTable}</div>`;

    } catch (error) {
        console.error("Lỗi tab kết quả:", error);
        vungLamViec.innerHTML = `<div style="color: #dc3545; text-align: center; padding: 20px; font-weight:bold;">❌ Lỗi truy xuất học bạ: ${error.message}</div>`;
    }
}
// =====================================================================
// Hàm 8.5: Xử lý Tab "HỒ SƠ CÁ NHÂN" (ĐÃ CẬP NHẬT NÚT XIN VÀO LỚP)
// =====================================================================
async function ham_8_5_tab_ho_so() {
    const vungLamViec = document.getElementById('vung-lam-viec-hoc-sinh');
    vungLamViec.innerHTML = `
        <div style="text-align: center; padding: 60px;">
            <div style="border: 4px solid #f3f3f3; border-top: 4px solid #6c757d; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 0 auto;"></div>
            <h3 style="color:#6c757d; margin-top:20px;">⏳ Đang tải thông tin cá nhân...</h3>
        </div>
    `;

    try {
        const { data: hs, error } = await _supabase
            .from('hoc_sinh')
            .select('*')
            .eq('uid', GocHocSinhState.uid)
            .single();

        if (error) throw error;

        let mangLop = GocHocSinhState.danh_sach_ma_lop || [];
        if (mangLop.length === 0) {
            try { mangLop = typeof hs.danh_sach_ma_lop === 'string' ? JSON.parse(hs.danh_sach_ma_lop) : (hs.danh_sach_ma_lop || []); } catch (e) { }
        }

        let tenLopHienThi = "Chưa tham gia lớp nào";
        if (mangLop.length > 0) {
            const { data: dsLop } = await _supabase.from('lop_hoc').select('ten_lop').in('ma_lop', mangLop);
            if (dsLop) tenLopHienThi = dsLop.map(l => l.ten_lop).join(', ');
        }

        const mkHienTai = hs.mat_khau || hs.matKhau || "";
        // 🌟 LẤY SỐ KIM CƯƠNG TỪ RAM ĐỂ HIỂN THỊ
        const soKimCuong = GocHocSinhState.kim_cuong || 0;


        vungLamViec.innerHTML = `
            <div style="max-width: 550px; margin: 0 auto; background: white; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); overflow: hidden; border: 1px solid #e0e0e0;">
               <div style="background: linear-gradient(135deg, #1a73e8, #00b4d8); padding: 35px 20px; text-align: center; color: white; position: relative;">
                    <div style="font-size: 65px; margin-bottom: 10px; line-height: 1; text-shadow: 2px 2px 4px rgba(0,0,0,0.15);">🎓</div>
                    <h2 style="margin: 0; font-size: 24px; font-weight: 900;">${hs.ten || "Học sinh"}</h2>
                    <div style="font-size: 14px; opacity: 0.9; margin-top: 5px; background: rgba(255,255,255,0.25); display: inline-block; padding: 4px 12px; border-radius: 20px;">
                        ID Đăng nhập: <b>${hs.uid}</b>
                    </div>
                </div>

                <div style="background: rgba(255,255,255,0.9); border-radius: 12px; padding: 10px 15px; display: inline-flex; align-items: center; justify-content: center; gap: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.2); border: 2px solid #ffc107;">
                        <span style="font-size: 24px; filter: drop-shadow(0 2px 2px rgba(0,0,0,0.2));">💎</span>
                        <div style="text-align: left; color: #333;">
                            <div style="font-size: 11px; font-weight: bold; color: #666; text-transform: uppercase;">Tài sản hiện có</div>
                            <div style="font-size: 20px; font-weight: 900; color: #00838f; line-height: 1;">${soKimCuong} Kim Cương</div>
                        </div>
                    </div>


                <div style="padding: 30px;">
                    <div style="margin-bottom: 20px;">
                        <label style="font-weight: bold; font-size: 13px; color: #495057; display: block; margin-bottom: 8px;">👤 Tên hiển thị của em:</label>
                        <input type="text" id="hs_edit_ten" value="${hs.ten || ''}" style="width: 100%; padding: 12px 15px; border: 1px solid #ced4da; border-radius: 6px; font-size: 15px; background: #fff; box-sizing: border-box; transition: 0.2s;" onfocus="this.style.borderColor='#1a73e8'; this.style.boxShadow='0 0 0 3px rgba(26,115,232,0.1)'" onblur="this.style.borderColor='#ced4da'; this.style.boxShadow='none'">
                    </div>

                    <div style="margin-bottom: 20px;">
                        <label style="font-weight: bold; font-size: 13px; color: #495057; display: block; margin-bottom: 8px;">🏫 Lớp học đang tham gia:</label>
                        <div style="width: 100%; padding: 12px 15px; border: 1px dashed #adb5bd; border-radius: 6px; font-size: 15px; background: #f8f9fa; color: #1a73e8; font-weight: bold; box-sizing: border-box; line-height: 1.4;">
                            ${tenLopHienThi}
                        </div>
                        <button onclick="ham_8_5_2_xin_vao_lop_moi()" style="margin-top: 8px; padding: 6px 12px; background: white; color: #1a73e8; border: 1px solid #1a73e8; border-radius: 4px; font-size: 12px; font-weight: bold; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#1a73e8'; this.style.color='white'" onmouseout="this.style.background='white'; this.style.color='#1a73e8'">
                            ➕ Xin gia nhập lớp mới
                        </button>
                    </div>

                    <div style="margin-bottom: 15px;">
                        <label style="font-weight: bold; font-size: 13px; color: #495057; display: block; margin-bottom: 8px;">🔑 Mật khẩu mới:</label>
                        <input type="password" id="hs_edit_mk" value="${mkHienTai}" style="width: 100%; padding: 12px 15px; border: 1px solid #ced4da; border-radius: 6px; font-size: 15px; background: #fff; box-sizing: border-box; transition: 0.2s;" onfocus="this.style.borderColor='#1a73e8'; this.style.boxShadow='0 0 0 3px rgba(26,115,232,0.1)'" onblur="this.style.borderColor='#ced4da'; this.style.boxShadow='none'">
                    </div>

                    <div style="margin-bottom: 25px;">
                        <label style="font-weight: bold; font-size: 13px; color: #495057; display: block; margin-bottom: 8px;">🔁 Xác nhận lại mật khẩu mới:</label>
                        <input type="password" id="hs_edit_mk_2" value="${mkHienTai}" style="width: 100%; padding: 12px 15px; border: 1px solid #ced4da; border-radius: 6px; font-size: 15px; background: #fff; box-sizing: border-box; transition: 0.2s;" onfocus="this.style.borderColor='#1a73e8'; this.style.boxShadow='0 0 0 3px rgba(26,115,232,0.1)'" onblur="this.style.borderColor='#ced4da'; this.style.boxShadow='none'">
                        <div style="font-size: 11px; color: #dc3545; margin-top: 6px;">* Gõ mật khẩu mới vào cả 2 ô trên để thay đổi. Tuyệt đối không chia sẻ mật khẩu cho người khác.</div>
                    </div>

                    <hr style="border: 0; border-top: 1px solid #e9ecef; margin: 25px 0;">

                    <div style="display: flex; gap: 15px;">
                        <button onclick="ham_8_5_1_luu_ho_so(this)" style="flex: 2; padding: 14px; background: #28a745; color: white; border: none; border-radius: 6px; font-weight: bold; font-size: 15px; cursor: pointer; transition: 0.2s; box-shadow: 0 4px 6px rgba(40,167,69,0.2);" onmouseover="this.style.background='#218838'; this.style.transform='translateY(-2px)'" onmouseout="this.style.background='#28a745'; this.style.transform='translateY(0)'">
                            💾 CẬP NHẬT HỒ SƠ
                        </button>
                        <button onclick="ham_8_dang_xuat()" style="flex: 1; padding: 14px; background: #fff; color: #dc3545; border: 2px solid #dc3545; border-radius: 6px; font-weight: bold; font-size: 15px; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#dc3545'; this.style.color='white'" onmouseout="this.style.background='#fff'; this.style.color='#dc3545'">
                            🚪 THOÁT
                        </button>
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        vungLamViec.innerHTML = `<div style="color: #dc3545; text-align: center; padding: 20px; font-weight: bold;">❌ Lỗi tải hồ sơ: ${error.message}</div>`;
    }
}

// =====================================================================
// Hàm 8.5.1: Xử lý Lưu cập nhật Hồ sơ lên Supabase (Có so dò mật khẩu)
// =====================================================================
window.ham_8_5_1_luu_ho_so = async function (btnLuu) {
    const tenMoi = document.getElementById('hs_edit_ten').value.trim();
    const mkMoi1 = document.getElementById('hs_edit_mk').value.trim();
    const mkMoi2 = document.getElementById('hs_edit_mk_2').value.trim();

    // Kiểm tra dữ liệu rỗng
    if (!tenMoi) return Swal.fire({ icon: 'warning', title: 'Thiếu thông tin', text: 'Tên hiển thị không được để trống!' });
    if (!mkMoi1) return Swal.fire({ icon: 'warning', title: 'Thiếu thông tin', text: 'Mật khẩu không được để trống!' });

    // 🌟 Kiểm tra so dò 2 lần nhập mật khẩu
    if (mkMoi1 !== mkMoi2) {
        document.getElementById('hs_edit_mk_2').style.borderColor = '#dc3545'; // Đổi viền sang đỏ
        return Swal.fire({
            icon: 'error',
            title: 'Mật khẩu không khớp!',
            text: 'Hai lần nhập mật khẩu của em đang khác nhau. Vui lòng gõ lại cho chính xác.',
            confirmButtonColor: '#1a73e8'
        });
    }

    const textCu = btnLuu.innerHTML;
    btnLuu.innerHTML = "⏳ ĐANG LƯU...";
    btnLuu.disabled = true;

    try {
        const { error } = await _supabase
            .from('hoc_sinh')
            .update({ ten: tenMoi, mat_khau: mkMoi1 }) // Cập nhật cột mat_khau
            .eq('uid', GocHocSinhState.uid);

        if (error) throw error;

        // Cập nhật lại RAM
        GocHocSinhState.ten = tenMoi;

        Swal.fire({
            icon: 'success',
            title: 'Thành công!',
            text: 'Hồ sơ của em đã được cập nhật.',
            timer: 1500,
            showConfirmButton: false
        }).then(() => {
            ham_8_1_tai_nhiem_vu_cua_toi(GocHocSinhState.uid, GocHocSinhState.danh_sach_ma_lop, GocHocSinhState.ten);
        });

    } catch (err) {
        Swal.fire({ icon: 'error', title: 'Lỗi máy chủ', text: err.message });
    } finally {
        btnLuu.innerHTML = textCu;
        btnLuu.disabled = false;
    }
};


// =====================================================================
// Hàm 8.5.2: Học sinh gửi mã xin tham gia lớp học mới
// =====================================================================
window.ham_8_5_2_xin_vao_lop_moi = function () {
    Swal.fire({
        title: '🏫 XIN GIA NHẬP LỚP MỚI',
        text: 'Em hãy nhập đúng Mã Lớp do Thầy cung cấp:',
        input: 'text',
        inputPlaceholder: 'Ví dụ: MAT12, TOA11...',
        showCancelButton: true,
        confirmButtonText: '🚀 GỬI YÊU CẦU',
        cancelButtonText: 'Hủy',
        confirmButtonColor: '#1a73e8',
        cancelButtonColor: '#6c757d',
        showLoaderOnConfirm: true,
        inputValidator: (value) => {
            if (!value.trim()) return 'Em bắt buộc phải điền mã lớp!';
        },
        preConfirm: async (maLopInput) => {
            const maLopCheck = maLopInput.trim().toUpperCase();

            try {
                // Chốt 1: Check xem em này đã nằm sẵn trong lớp này chưa
                let cacLopCuaEm = GocHocSinhState.danh_sach_ma_lop || [];
                if (cacLopCuaEm.includes(maLopCheck)) {
                    Swal.showValidationMessage(`✨ Em đã là thành viên của lớp "${maLopCheck}" rồi, không cần xin lại nha!`);
                    return false;
                }

                // Chốt 2: Check xem có đơn xin vào lớp này đang ở trạng thái Chờ Duyệt (trang_thai = 0) hay không
                const { data: donTrung } = await _supabase
                    .from('yeu_cau_hoc_sinh')
                    .select('id')
                    .eq('uid_hoc_sinh', GocHocSinhState.uid)
                    .eq('ma_lop', maLopCheck)
                    .eq('loai_yeu_cau', 'XIN_VAO_LOP')
                    .eq('trang_thai', 0);

                if (donTrung && donTrung.length > 0) {
                    Swal.showValidationMessage(`⏳ Đơn xin vào lớp "${maLopCheck}" cũ của em đang chờ Thầy phê duyệt, em đừng gửi liên tục nhé!`);
                    return false;
                }

                // Chốt 3: So dò xem mã lớp này có thực sự tồn tại trong CSDL không
                const { data: infoLop, error: errLop } = await _supabase
                    .from('lop_hoc')
                    .select('ma_lop, ten_lop')
                    .eq('ma_lop', maLopCheck)
                    .maybeSingle();

                if (errLop) throw errLop;
                if (!infoLop) {
                    Swal.showValidationMessage(`❌ Mã lớp "${maLopCheck}" không tồn tại trên hệ thống. Em hãy kiểm tra kỹ lại từng ký tự nhé!`);
                    return false;
                }

                // BƯỚC BẮN DỮ LIỆU VÀO BẢNG YÊU CẦU CỦA THẦY
                const payload = {
                    uid_hoc_sinh: GocHocSinhState.uid,
                    ten_hoc_sinh: GocHocSinhState.ten,
                    loai_yeu_cau: 'XIN_VAO_LOP',
                    ma_lop: maLopCheck, // Ghi nhận mã lớp cần xin vào
                    ten_nhiem_vu: `Lớp học: ${infoLop.ten_lop}`, // Tận dụng trường này để hiện tên lớp siêu đẹp mắt ở Hòm thư GV
                    ly_do: `Học sinh chủ động gửi đơn xin gia nhập lớp bằng mã phòng.`,
                    trang_thai: 0
                };

                const { error: errInsert } = await _supabase.from('yeu_cau_hoc_sinh').insert([payload]);
                if (errInsert) throw errInsert;

                return maLopCheck;

            } catch (e) {
                Swal.showValidationMessage(`Lỗi hệ thống: ${e.message}`);
                return false;
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                icon: 'success',
                title: 'Đã gửi đơn thành công!',
                text: `Đơn đăng ký vào lớp "${result.value}" đã nằm trong hòm thư chờ Thầy duyệt nha em!`,
                confirmButtonColor: '#28a745'
            });
        }
    });
};

// =====================================================================
// Hàm Bổ trợ Đăng xuất
// =====================================================================
window.ham_8_dang_xuat = function () {
    Swal.fire({
        title: 'Đăng xuất?',
        text: "Em có chắc chắn muốn thoát khỏi phiên làm việc hiện tại?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d',
        confirmButtonText: '🚪 Thoát ngay',
        cancelButtonText: 'Hủy'
    }).then((result) => {
        if (result.isConfirmed) {
            // Xóa rỗng toàn bộ dữ liệu đang lưu tạm trên RAM
            GocHocSinhState.uid = null;
            GocHocSinhState.ma_lop = null;
            GocHocSinhState.ten = null;
            GocHocSinhState.danhSachNhiemVu = [];

            // Xóa session trên trình duyệt (Nếu thầy có set LocalStorage lúc đăng nhập)
            localStorage.removeItem('dang_nhap_tai_khoan');
            localStorage.removeItem('dang_nhap_mat_khau');

            // Tải lại cứng trang web để ép văng ra màn hình đăng nhập
            window.location.reload();
        }
    });
};



// =====================================================================
// Hàm 8.7: Cửa An Ninh - Kiểm tra lượt làm và Xác nhận vào thi (ĐỒNG BỘ TIẾN ĐỘ)
// =====================================================================
async function ham_8_7_cua_an_ninh(maNhiemVu) {
    // 1. Tìm thông tin nhiệm vụ trong danh sách đã tải về ở GocHocSinhState
    const nv = GocHocSinhState.danhSachNhiemVu.find(item => item.ma_nhiem_vu === maNhiemVu);
    if (!nv) return alert("Lỗi: Không tìm thấy dữ liệu bài tập!");

    // Hiện hiệu ứng chờ mạng nhẹ tránh việc học sinh click double spam
    Swal.fire({
        title: '⏳ Đang xác thực phòng thi...',
        allowOutsideClick: false,
        didOpen: () => { Swal.showLoading(); }
    });

    try {
        // =====================================================================
        // 🌟 SỬA ĐỔI CỐT LÕI: Đọc số lượt đã làm từ bộ đếm tiến độ của bảng hoc_sinh
        // =====================================================================
        const { data: hsData, error } = await _supabase
            .from('hoc_sinh')
            .select('tien_do_lam_bai')
            .eq('uid', GocHocSinhState.uid)
            .single();

        if (error) throw error;

        let demSoLuotLam = {};
        if (hsData && hsData.tien_do_lam_bai) {
            demSoLuotLam = typeof hsData.tien_do_lam_bai === 'string'
                ? JSON.parse(hsData.tien_do_lam_bai)
                : hsData.tien_do_lam_bai;
        }

        // Đọc số lượt đã làm thực tế từ object tiến độ JSON của thầy
        const soLuotHienTai = demSoLuotLam[maNhiemVu] || 0;
        const gioiHanLuot = nv.so_luot_lam_bai || 0; // 0 là vô hạn

        // Chặn lại nếu đã làm hết số lượt cho phép
        if (gioiHanLuot > 0 && soLuotHienTai >= gioiHanLuot) {
            return Swal.fire({
                icon: 'error',
                title: 'Hết lượt làm bài!',
                text: `Bài tập này giới hạn ${gioiHanLuot} lượt làm. Em đã hoàn thành đủ số lượt.`,
                confirmButtonColor: '#d33'
            });
        }

        // 🌟 LƯU LẠI LẦN THI ĐỂ DÙNG LÚC NỘP BÀI (Hàm 8.11)
        window.LanThuHienTai = soLuotHienTai + 1;

        // 3. Hiện bảng thông tin xác nhận tâm lý cho học sinh (GIỮ NGUYÊN HOÀN TOÀN CỦA THẦY)
        const thoiGianHienThi = nv.thoi_gian_lam_bai > 0 ? `${nv.thoi_gian_lam_bai} phút` : "Tự do";

        Swal.fire({
            title: 'XÁC NHẬN VÀO LÀM BÀI',
            html: `
                <div style="text-align: left; background: #f8f9fa; padding: 15px; border-radius: 8px; border: 1px solid #ddd; font-size: 14px;">
                    <p>📝 <b>Nhiệm vụ:</b> <span style="color:#1a73e8; font-weight: bold;">${nv.ten_nhiem_vu}</span></p>
                    <p>⏱️ <b>Thời gian:</b> ${thoiGianHienThi}</p>
                    <p>🔄 <b>Lượt làm:</b> Lần thứ ${window.LanThuHienTai} (Tối đa: ${gioiHanLuot == 0 ? "Vô hạn" : gioiHanLuot})</p>
                    <hr>
                    <p style="color: #d32f2f; font-weight: bold; font-style: italic; margin:0;">⚠️ Lưu ý: Kết quả các lần trước sẽ xóa, đồng hồ sẽ bắt đầu đếm ngược ngay khi em bấm nút BẮT ĐẦU.</p>
                </div>
            `,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#28a745',
            cancelButtonColor: '#6c757d',
            confirmButtonText: '🚀 BẮT ĐẦU LÀM BÀI',
            cancelButtonText: 'Để sau'
        }).then((result) => {
            if (result.isConfirmed) {
                // Chuyển sang Hàm 8.8 gốc của thầy: Khởi tạo phòng thi và bốc đề
                ham_8_8_khoi_tao_phong_thi(nv);
            }
        });

    } catch (err) {
        Swal.fire({ icon: 'error', title: 'Lỗi kiểm tra an ninh', text: err.message });
    }
}


// ==============================================================
// Hàm 8.8: Khởi tạo Phòng thi (BẢO MẬT TUYỆT ĐỐI - KHÔNG ĐỤNG ĐẾN ĐÁP ÁN)
// ==============================================================
async function ham_8_8_khoi_tao_phong_thi(nv) {
    const vungLamViec = document.getElementById('dashboard-container');
    vungLamViec.innerHTML = `
        <div style="text-align: center; padding: 100px;">
            <div style="border: 4px solid #f3f3f3; border-top: 4px solid #3498db; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 0 auto;"></div>
            <h3 style="margin-top:20px; color:#1a73e8;">⚡ Đang nạp đề thi bảo mật...</h3>
            <style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>
        </div>
    `;

    try {
        const maHocLieu = nv.ma_hoc_lieu;
        if (!maHocLieu) throw new Error("Nhiệm vụ này chưa được gắn Học liệu!");

        // =========================================================
        // 1. CHỈ LẤY DUY NHẤT LINK GITHUB (CẤM GỌI danh_sach_cau_hoi)
        // =========================================================
        const { data: dataHocLieu, error: errHL } = await _supabase
            .from('hoc_lieu')
            .select('ma_hoc_lieu, url_github') // 🔒 KHOÁ CHẶT: Tuyệt đối không select cột chứa đáp án
            .eq('ma_hoc_lieu', maHocLieu)
            .single();

        if (errHL) throw errHL;

        // =========================================================
        // 2. TÍNH TOÁN ĐƯỜNG LINK GITHUB CHUẨN XÁC
        // =========================================================
        let urlFileGitHub = dataHocLieu.url_github;

        if (!urlFileGitHub) {
            let maDeGoc = maHocLieu;
            if (maHocLieu.startsWith("HL_DE_")) {
                maDeGoc = maHocLieu.replace("HL_DE_", "");
            }
            const LINK_GITHUB_GOC = "https://ducchinh2308.github.io/LuyenToan2308";
            urlFileGitHub = `${LINK_GITHUB_GOC}/Kho_De_Thi/${maDeGoc}/DeThi_${maDeGoc}.json`;
        }

        //console.log("🔍 Đang tải nội dung đề thô từ:", urlFileGitHub);

        // =========================================================
        // 3. TẢI ĐỀ THI SẠCH (KHÔNG ĐÁP ÁN) TỪ GITHUB
        // =========================================================
        const response = await fetch(urlFileGitHub);
        if (!response.ok) {
            throw new Error("Không tải được đề! Thầy hãy kiểm tra xem Github đã đồng bộ chưa.\nLink: " + urlFileGitHub);
        }

        const dataGitHub = await response.json();
        // Lấy danh sách câu hỏi trực tiếp từ file Github (Chỉ có nội dung, không có đáp án)
        const dsNoiDungGH = dataGitHub.danhSachCauHoi || dataGitHub.danh_sach_cau_hoi || [];

        if (dsNoiDungGH.length === 0) throw new Error("File đề trên Github đang bị trống!");

        // =========================================================
        // 4. TRỘN ĐỀ TRỰC TIẾP TỪ DỮ LIỆU GITHUB
        // =========================================================
        // Không cần ráp với Database nữa, vì Database chứa mã bảo mật.
        const deThiDaTron = ham_8_9_tron_de_thi(dsNoiDungGH);

        // Lấy đường dẫn thư mục chứa đề thi để xử lý Hình Ảnh
        const baseUrlHinhAnh = urlFileGitHub.substring(0, urlFileGitHub.lastIndexOf('/')) + "/HinhAnh";

        // =========================================================
        // 5. TÍNH LƯỢT VÀ TẠO BẢN NHÁP (CHỐNG GIAN LẬN THOÁT ĐỀ)
        // =========================================================
        const maNhiemVuThuc = nv.ma_nhiem_vu || nv.maNhiemVu || maHocLieu;

        const { count, error: countErr } = await _supabase
            .from('ket_qua_thi')
            .select('*', { count: 'exact', head: true })
            .eq('uid_hoc_sinh', GocHocSinhState.uid)
            .eq('ma_nhiem_vu', maNhiemVuThuc);

        const lanThuHienTai = (count || 0) + 1;

        // Ghi nhận ngay 1 phiên làm bài trên Database
        const { data: recordNhao, error: errNhao } = await _supabase
            .from('ket_qua_thi')
            .insert([{
                uid_hoc_sinh: GocHocSinhState.uid,
                ma_nhiem_vu: maNhiemVuThuc,
                lan_thu: lanThuHienTai,
                tong_diem: 0,
                chi_tiet_lam_bai: [],
                thoi_gian_lam_bai: "0 phút 0 giây",
                thoi_gian_nop: new Date().toISOString()
            }])
            .select('id')
            .single();

        if (errNhao) throw errNhao;

        //// Lưu toàn bộ vào RAM trình duyệt
        //window.PhienLamBai = {
        //    id_ket_qua_database: recordNhao.id,
        //    ma_nhiem_vu: maNhiemVuThuc,
        //    ten_nhiem_vu: nv.ten_nhiem_vu || nv.tenDe || nv.tenHocLieu || "Bài Luyện Tập",
        //    thoi_gian_con_lai: (nv.thoi_gian_lam_bai || nv.thoi_gian || nv.thoiGian || 90) * 60,
        //    tong_so_cau: deThiDaTron.length,
        //    danh_sach_cau_hoi: deThiDaTron,
        //    dap_an_hoc_sinh: {},
        //    id_timer: null,
        //    base_url_anh: baseUrlHinhAnh
        //};

        //// =========================================================
        //// 6. MỞ GIAO DIỆN THI
        //// =========================================================
        //ham_8_10_ve_giao_dien_lam_bai();
        // Lưu toàn bộ vào RAM trình duyệt
        window.PhienLamBai = {
            id_ket_qua_database: recordNhao.id,
            ma_nhiem_vu: maNhiemVuThuc,
            ten_nhiem_vu: nv.ten_nhiem_vu || nv.tenDe || nv.tenHocLieu || "Bài Luyện Tập",
            thoi_gian_con_lai: (nv.thoi_gian_lam_bai || nv.thoi_gian || nv.thoiGian || 90) * 60,
            tong_so_cau: deThiDaTron.length,
            danh_sach_cau_hoi: deThiDaTron,
            dap_an_hoc_sinh: {},
            id_timer: null,
            base_url_anh: baseUrlHinhAnh
        };

        // 🌟 [CẤY CHIP 1] CẤP THẺ VIP NẾU LÀ TRẬN LIVE QUIZ
        window.PhienLamBai.isLiveQuiz = window.DangKhoiTaoLiveQuiz === true;
        window.PhienLamBai.maPhongLive = window.DangKhoiTaoLiveQuiz ? window.ThongTinLiveHocSinh.maPhong : null;
        window.DangKhoiTaoLiveQuiz = false; // Reset lại trạng thái

        // =========================================================
        // 6. MỞ GIAO DIỆN THI
        // =========================================================
        ham_8_10_ve_giao_dien_lam_bai();


    } catch (err) {
        console.error("LỖI NẠP ĐỀ:", err);
        alert("Lỗi nạp đề thi: " + err.message);
        ham_8_1_tai_nhiem_vu_cua_toi(GocHocSinhState.uid, GocHocSinhState.danh_sach_ma_lop, GocHocSinhState.ten);
    }
}

// ==============================================================
// Hàm 8.9: Trộn thứ tự câu hỏi (Chống gian lận)
// ==============================================================
function ham_8_9_tron_de_thi(mangCauHoi) {
    // 1. Trộn thứ tự các câu hỏi với nhau (Shuffle mảng)
    let dsTron = mangCauHoi.sort(() => Math.random() - 0.5);

    // 2. Định hình lại số thứ tự và chốt Kiểu câu
    return dsTron.map((item, index) => {

        // Cố gắng lấy kiểu câu từ Database (nếu C# có đẩy lên)
        let kieuNhanDien = item.kieuCau || item.kieu_cau || "";

        // LOGIC THÔNG MINH: Nếu Database thiếu kieuCau, ta "bắt mạch" từ đáp án
        if (!kieuNhanDien && item.dap_an) {
            if (item.dap_an.length === 4 && (item.dap_an.includes('T') || item.dap_an.includes('F'))) {
                kieuNhanDien = "DS"; // Đúng sai (TFTF)
            } else if (!['A', 'B', 'C', 'D'].includes(item.dap_an) && item.dap_an.length !== 4) {
                kieuNhanDien = "TLN"; // Trả lời ngắn (số)
            } else {
                kieuNhanDien = "TN"; // Trắc nghiệm mặc định
            }
        }

        return {
            ...item,
            index_stt: index + 1, // Đánh số thứ tự hiển thị (Câu 1, 2, 3...)
            kieuCau: kieuNhanDien // Gắn lại nhãn chuẩn để Hàm 8.10 vẽ giao diện cho đúng
        };
    });
}





// =====================================================================
// HÀM 8.10: GIAO DIỆN PHÒNG THI CUỘN TỪ TRÊN XUỐNG CÙNG (2 CỘT CHUẨN)
// [Nhãn thời gian: 08:45 - Ngày 29/05/2026] - Cố định Đồng hồ & Nút nộp, chỉ cuộn danh sách câu
// =====================================================================
window.ham_8_10_ve_giao_dien_lam_bai = function () {
    const vungLamViec = document.getElementById('dashboard-container');
    if (vungLamViec) vungLamViec.style.display = 'none';

    const phien = window.PhienLamBai;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    phien.thoi_diem_bat_dau = Date.now();

    // 1. PHÂN LOẠI CÂU HỎI THEO NHÓM
    let dsTN = [], dsDS = [], dsTLN = [];
    phien.danh_sach_cau_hoi.forEach(cau => {
        const loai = (cau.kieuCau || cau.loaiCau || "TN").toUpperCase();
        if (loai === "TN") dsTN.push(cau);
        else if (loai === "DS") dsDS.push(cau);
        else if (loai === "TLN") dsTLN.push(cau);
    });

    let htmlContentRight = '';
    if (phien.isLiveQuiz) {
        htmlContentRight = `<div style="background:#e74c3c; color:white; padding:11px; border-radius:5px; margin-bottom:12px; box-shadow:0 2px 3px rgba(0,0,0,0.1);"><h2 style="margin:0; font-size:11px; text-transform: uppercase;">🔥 ĐẤU TRƯỜNG: ${phien.ten_nhiem_vu}</h2></div>`;
    } else {
        htmlContentRight = `<div style="background:#0056b3; color:white; padding:11px; border-radius:5px; margin-bottom:13px; box-shadow:0 4px 6px rgba(0,0,0,0.1);"><h2 style="margin:0; font-size:13px; text-transform: uppercase;">📝 ${phien.ten_nhiem_vu}</h2></div>`;
    }

    let htmlNavLeft = ``;

    const sinhGiaoDienNhom = (tieuDePhan, danhSach, loaiCau) => {
        if (danhSach.length === 0) return;

        htmlContentRight += `<h3 style="color: #c0392b; border-bottom: 2px solid #c0392b; padding-bottom: 5px; margin-top: 40px; margin-bottom: 20px; font-size: 20px; text-transform: uppercase;">${tieuDePhan}</h3>`;

        let tenNav = loaiCau === 'TN' ? 'TN' : (loaiCau === 'DS' ? 'ĐS' : 'TLN');
        htmlNavLeft += `<div style="margin-bottom: 10px; width: 100%;">
                            <h4 style="margin: 0 0 6px 0; color: #c0392b; font-size: 11px; border-bottom: 1px solid #ddd; padding-bottom: 3px; text-align: center;">📍${tenNav}</h4>
                            <div style="display: flex; flex-direction: column; align-items: center; gap: 6px;">`;

        let sttPhan = 1;
        danhSach.forEach(cau => {
            htmlContentRight += ham_8_11_taoGiaoDienCauHoi(cau, sttPhan, loaiCau);
            const maCau = cau.ma_cau_hoi || cau.maCau;
            htmlNavLeft += `
                <div id="btn-nav-${maCau}" onclick="document.getElementById('cau-${maCau}').scrollIntoView({behavior: 'smooth', block: 'center'})" 
                     style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 42px; height: 42px; background: #fff; border: 1px solid #ced4da; border-radius: 6px; cursor: pointer; color: #495057; font-weight: bold; font-size: 14px; transition: 0.2s; box-shadow: 0 1px 2px rgba(0,0,0,0.05);" 
                     onmouseover="if(!this.classList.contains('da-lam')) this.style.background='#e9ecef'" onmouseout="if(!this.classList.contains('da-lam')) this.style.background='#fff'">
                    <span style="line-height: 1;">${sttPhan}</span>
                    <span id="nav-ans-${maCau}" style="font-size: 10px; font-weight: bold; color: #888; margin-top: 2px; min-height: 12px;"></span>
                </div>`;
            sttPhan++;
        });
        htmlNavLeft += `</div></div>`;
    };

    sinhGiaoDienNhom("PHẦN I. Câu trắc nghiệm nhiều phương án lựa chọn", dsTN, "TN");
    sinhGiaoDienNhom("PHẦN II. Câu trắc nghiệm đúng/sai", dsDS, "DS");
    sinhGiaoDienNhom("PHẦN III. Câu trắc nghiệm trả lời ngắn", dsTLN, "TLN");

    let htmlLiveDiem = '';
    if (phien.isLiveQuiz) {
        htmlLiveDiem = `
            <div style="background: linear-gradient(135deg, #1e1e2f, #2a2a3c); border: 1px solid #444; border-radius: 6px; padding: 6px 2px; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
                <div style="font-size: 9px; color: #a0a0b2; font-weight: bold; margin-bottom: 2px;">PIN</div>
                <div style="font-size: 11px; font-weight: 900; color: #e74c3c; font-family: monospace; margin-bottom: 8px; letter-spacing: 0.5px;">
                    ${window.ThongTinLiveHocSinh ? window.ThongTinLiveHocSinh.maPhong : '---'}
                </div>
                
                <div style="font-size: 9px; color: #a0a0b2; font-weight: bold; margin-bottom: 2px;">ĐIỂM</div>
                <div id="diem-hien-tai-hs" style="font-size: 12px; font-weight: 900; color: #f1c40f; font-family: monospace; transition: all 0.3s ease;">
                    0.00
                </div>
            </div>
        `;
    }

    // 🌟 CHÌA KHÓA Ở ĐÂY: Quyết định hàm Nộp Bài tùy theo loại nhiệm vụ
    const lenhNopBai = phien.isLiveQuiz ? "ham_8_6_8_chot_nop_bai_live()" : "ham_8_12_nop_bai_va_cham_diem()";



    // 3. RÁP VÀO BỘ KHUNG
    const rootDiv = document.createElement('div');
    rootDiv.id = 'khong-gian-thi-toan-man-hinh';
    rootDiv.style.cssText = "position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; display: flex; background: #e9ecef; box-sizing: border-box; z-index: 99999;";

    rootDiv.innerHTML = `
        <style>
            /* Ẩn thanh cuộn xấu xí của vùng danh sách câu nhưng vẫn cho phép vuốt */
            #vung-cuon-cau-hoi::-webkit-scrollbar { width: 0px; background: transparent; }
            #vung-cuon-cau-hoi { scrollbar-width: none; -ms-overflow-style: none; }
        </style>

        <div id="cot-trai-nav" style="flex: 0 0 54px; background: #fff; height: 100vh; display: flex; flex-direction: column; border-right: 1px solid #ccc; box-shadow: 2px 0 10px rgba(0,0,0,0.05); z-index: 10;">
            
            <div style="flex-shrink: 0; padding: 6px 4px; display: flex; flex-direction: column; gap: 8px; border-bottom: 1px solid #eee; background: #fdfdfe; z-index: 2;">
                <div id="khung-dong-ho" style="background: #fff3cd; border: 1px solid #ffe69c; color: #856404; font-weight: bold; text-align: center; padding: 6px 0; border-radius: 4px; font-size: 11px;">
                    <span id="dong-ho-dem-nguoc">--:--</span>
                </div>
                
                <div style="background: #e8f4f8; border: 1px solid #b8daff; color: #0056b3; font-weight: bold; text-align: center; padding: 4px 0; border-radius: 4px; font-size: 10px;">
                    <span id="so-cau-da-lam" style="color: #28a745;">0</span>/${phien.tong_so_cau}
                </div>
                
               
                
                <button id="btn-nop-bai" onclick="ham_8_12_nop_bai_va_cham_diem()" style="width: 100%; padding: 10px 0; background: #28a745; color: white; border: none; border-radius: 4px; font-weight: bold; font-size: 11px; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.2);" title="Nộp Bài">NỘP</button>

                 
            </div>

            <div id="vung-cuon-cau-hoi" style="flex: 1; overflow-y: auto; overflow-x: hidden; padding: 6px 4px; padding-top: 10px;">
            ${htmlLiveDiem}    
            <div style="display: flex; flex-direction: column; align-items: center; padding-bottom: 30px;">
                    ${htmlNavLeft}
                </div>
            </div>
        </div>

        <div id="khu-vuc-cuon-de" style="flex: 1; padding: 20px 15px; overflow-y: auto; scroll-behavior: smooth; position: relative;">
            <div style="max-width: 900px; margin: 0 auto; padding-bottom: 100px;">
                ${htmlContentRight}
            </div>
        </div>
    `;

    document.body.appendChild(rootDiv);

    // Kích hoạt toán học & Hình vẽ
    const vungCuon = document.getElementById('khu-vuc-cuon-de');
    if (window.renderMathInElement) {
        window.renderMathInElement(vungCuon, {
            delimiters: [
                { left: "$$", right: "$$", display: true },
                { left: "$", right: "$", display: false }
            ],
            throwOnError: false,
            macros: { "\\heva": "\\left\\{\\begin{array}{l}#1\\end{array}\\right.", "\\hoac": "\\left[\\begin{array}{l}#1\\end{array}\\right." }
        });
    } else if (window.MathJax) {
        MathJax.typesetPromise();
    }

    let oldTikz = document.getElementById('tikz-script-reload');
    if (oldTikz) oldTikz.remove();
    let newTikz = document.createElement('script');
    newTikz.id = 'tikz-script-reload';
    newTikz.src = 'https://tikzjax.com/v1/tikzjax.js';
    document.body.appendChild(newTikz);

    // Bắt đầu đồng hồ đếm ngược
    if (phien.id_timer) clearInterval(phien.id_timer);
    phien.id_timer = setInterval(() => {
        phien.thoi_gian_con_lai--;

        const tongGiayThucTe = Math.floor(phien.thoi_gian_con_lai);
        const mm = String(Math.floor(tongGiayThucTe / 60)).padStart(2, '0');
        const ss = String(tongGiayThucTe % 60).padStart(2, '0');

        document.getElementById('dong-ho-dem-nguoc').innerText = `${mm}:${ss}`;

        if (phien.thoi_gian_con_lai <= 300) {
            const dh = document.getElementById('khung-dong-ho');
            if (dh) { dh.style.background = '#f8d7da'; dh.style.color = '#721c24'; dh.style.borderColor = '#f5c6cb'; }
        }

        if (phien.thoi_gian_con_lai <= 0) {
            clearInterval(phien.id_timer);
            alert("⏳ ĐÃ HẾT THỜI GIAN LÀM BÀI! Hệ thống tự động thu bài.");
            ham_8_12_nop_bai_va_cham_diem(true);
        }
    }, 1000);
}
// =====================================================================
// 8.11 HÀM BỔ TRỢ: VẼ TỪNG CÂU HỎI (Tích hợp Dịch LaTeX & Màng lọc ảnh)
// =====================================================================
function ham_8_11_taoGiaoDienCauHoi(cau, stt, loaiCau) {
    
    // 🌟 Tách rạch ròi 2 mã: Logic (q_) để chấm điểm, và Hiển thị (2605-123) cho học sinh xem
    const maCauLogic = cau.ma_cau_hoi || cau.maCau;
    const maCauHienThi = cau.ma_goc || cau.maGoc || cau.maCauGoc || cau.idGoc || maCauLogic;


    const thuMucAnh = window.PhienLamBai.base_url_anh;

    // Bộ lọc Kép: Dịch LaTeX trước -> Vá đường dẫn ảnh sau
    const xuLyNoiDung = (noiDung) => {
        if (!noiDung) return "";
        let htmlDich = typeof dichLaTeX === 'function' ? dichLaTeX(noiDung) : noiDung;
        return htmlDich.replace(/src=['"]([^'"]+)['"]/g, (match, tenFile) => {
            if (tenFile.startsWith('http') || tenFile.startsWith('data:')) return match;
            const cleanFile = tenFile.split('/').pop();
            return `src="${thuMucAnh}/${cleanFile}"`;
        });
    };

    let cauDan = xuLyNoiDung(cau.cauDan || cau.noiDungHtml || "");

    let htmlBlock = `
        <div id="cau-${maCauLogic}" data-loaicau="${loaiCau}" class="cau-hoi" style="margin-bottom: 30px; padding: 25px; border: 1px solid #ccc; border-radius: 8px; background: #fff; box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
            <p style="color: #0056b3; margin-top: 0; font-size: 18px; display: flex; justify-content: space-between; border-bottom: 1px solid #eee; padding-bottom: 10px;">
                <span style="display: flex; align-items: baseline; gap: 8px;">
                    <strong style="font-weight: 900; color: #000080;">(${loaiCau}) Câu ${stt}:</strong>
                    <span style="font-size: 13px; color: #6c757d; font-weight: normal;">[Mã: ${maCauHienThi}]</span> 
                </span>
            </p>
            <div style="font-size: 17px; line-height: 1.6; margin-bottom: 20px; margin-top: 15px; overflow-x: auto;">${cauDan}</div>
    `;

    if (loaiCau === "TN") {
        htmlBlock += `<div style="display: flex; flex-direction: column; gap: 10px;">`;
        const mangPA = cau.dsTron || [{ idGoc: 'A', text: cau.paA }, { idGoc: 'B', text: cau.paB }, { idGoc: 'C', text: cau.paC }, { idGoc: 'D', text: cau.paD }];
        mangPA.forEach((pa, idx) => {
            const nhan = String.fromCharCode(65 + idx);
            htmlBlock += `
                <label style="display: flex; align-items: flex-start; padding: 12px; border: 1px solid #ddd; border-radius: 6px; cursor: pointer; background: #f8f9fa; transition: 0.2s;" onmouseover="this.style.background='#e8f0fe'" onmouseout="if(!this.querySelector('input').checked) this.style.background='#f8f9fa'">
                    <input type="radio" name="dapan_${maCauLogic}" value="${pa.idGoc}" onchange="luuDapAn('${maCauLogic}', '${pa.idGoc}', this)" style="margin-top: 5px; margin-right: 15px; transform: scale(1.3);">
                    <div style="flex:1; font-size: 17px;"><b>${nhan}.</b> ${xuLyNoiDung(pa.text)}</div>
                </label>`;
        });
        htmlBlock += `</div>`;
    }
    else if (loaiCau === "DS") {
        htmlBlock += `<div style="font-weight: bold; color: #d35400; margin-bottom: 15px; background: #fff8e1; padding: 10px; border-left: 4px solid #ffc107; font-size: 14px;">✅ Yêu cầu: Chọn Đúng hoặc Sai.</div><div class="cau-ds">`;
        const mangY = [{ id: 'A', text: cau.paA }, { id: 'B', text: cau.paB }, { id: 'C', text: cau.paC }, { id: 'D', text: cau.paD }];
        mangY.forEach((y, idx) => {
            const nhanThuong = ['a', 'b', 'c', 'd'][idx];
            htmlBlock += `
                <div class="dong-ds" style="margin-bottom: 12px; padding: 12px 15px; background: #f8f9fa; border: 1px solid #eee; border-radius: 6px; display: flex; justify-content: space-between; align-items: center;">
                    <div style="flex: 1; padding-right: 20px; font-size: 16px;"><strong>${nhanThuong})</strong> ${xuLyNoiDung(y.text)}</div>
                    <div style="display: flex; gap: 20px; flex-shrink: 0; background: #fff; padding: 8px 15px; border-radius: 20px; border: 1px solid #ced4da;">
                        <label style="cursor: pointer; display: flex; align-items: center; gap: 5px; font-weight: bold; color: #28a745;">
                            <input type="radio" name="ds_${maCauLogic}_${y.id}" value="T" onchange="luuDapAnDS('${maCauLogic}', '${y.id}', 'T', this)" style="transform: scale(1.3);"> Đúng
                        </label>
                        <label style="cursor: pointer; display: flex; align-items: center; gap: 5px; font-weight: bold; color: #dc3545;">
                            <input type="radio" name="ds_${maCauLogic}_${y.id}" value="F" onchange="luuDapAnDS('${maCauLogic}', '${y.id}', 'F', this)" style="transform: scale(1.3);"> Sai
                        </label>
                    </div>
                </div>`;
        });
        htmlBlock += `</div>`;
    }
    else if (loaiCau === "TLN") {
        const inputStyle = "width: 55px; height: 60px; text-align: center; font-size: 26px; font-weight: bold; border: 2px solid #1a73e8; border-radius: 8px; color: #000080; outline: none; background: #fff; box-shadow: 0 2px 4px rgba(0,0,0,0.05); text-transform: uppercase;";
        const autoJumpScript = `oninput="if(this.value) this.nextElementSibling?.focus(); let ans=''; this.parentElement.querySelectorAll('input').forEach(i => ans+=i.value); luuDapAn('${maCauLogic}', ans, this);" onkeydown="if(event.key === 'Backspace' && !this.value) this.previousElementSibling?.focus();"`;

        htmlBlock += `
            <div class="cau-tln-container" style="margin-top: 15px; padding: 25px; background: #e8f4f8; border-radius: 8px; border: 1px dashed #b8daff; text-align: center;">
                <label style="font-weight: bold; color: #0056b3; font-size: 16px; margin-bottom: 20px; display: block;">✏️ Điền đáp án của em vào 4 ô trống:</label>
                <div class="tln-inputs" style="display: flex; justify-content: center; gap: 12px;">
                    <input type="text" maxlength="1" style="${inputStyle}" ${autoJumpScript}>
                    <input type="text" maxlength="1" style="${inputStyle}" ${autoJumpScript}>
                    <input type="text" maxlength="1" style="${inputStyle}" ${autoJumpScript}>
                    <input type="text" maxlength="1" style="${inputStyle}" ${autoJumpScript}>
                </div>
                <div style="font-size: 13px; color: #6c757d; margin-top: 15px;">(Mỗi ô điền 1 ký tự, bao gồm cả dấu trừ "-" hoặc dấu phẩy ",")</div>
            </div>`;
    }


    // 🌟 KIỂM TRA: Nếu đang ở chế độ Live Quiz -> Cấy thêm nút NỘP TỪNG CÂU
    if (window.PhienLamBai && window.PhienLamBai.isLiveQuiz) {
        // Xử lý chuỗi đáp án đúng để truyền vào hàm chấm điểm
        let dapAnDungTruyen = (cau.dap_an || cau.dapAn || '');
        // Thay thế dấu nháy đơn để tránh lỗi cú pháp JS khi render HTML
        dapAnDungTruyen = dapAnDungTruyen.replace(/'/g, "\\'");

        htmlBlock += `
            <div style="margin-top: 18px; border-top: 1px dashed #e0e0e0; padding-top: 12px; text-align: right;">
                <button id="btn-live-${maCauLogic}" 
                        onclick="window.ham_8_6_4_nop_tung_cau('${maCauLogic}', '${loaiCau}', '${dapAnDungTruyen}')" 
                        style="padding: 10px 22px; background: #e74c3c; color: white; border: none; border-radius: 6px; font-weight: 900; font-size: 14px; cursor: pointer; box-shadow: 0 3px 6px rgba(231,76,60,0.2); transition: 0.2s;"
                        onmouseover="if(!this.disabled) this.style.background='#c0392b'" 
                        onmouseout="if(!this.disabled) this.style.background='#e74c3c'">
                    🚀 GỬI & KHÓA CÂU NÀY
                </button>
            </div>
        `;
    }


    return htmlBlock + `</div>`;
}
// =====================================================================
// HÀM BỔ TRỢ: XỬ LÝ LƯU ĐÁP ÁN & CẬP NHẬT GIAO DIỆN NAV
// =====================================================================
window.luuDapAn = function (maCauHoi, luaChon, element) {
    if (!luaChon) return; // Nếu TLN xóa trắng thì bỏ qua
    window.PhienLamBai.dap_an_hoc_sinh[maCauHoi] = luaChon;

    // Xử lý đổi màu radio box TN
    if (element && element.type === 'radio') {
        const khoiTN = element.closest('.cau-hoi');
        khoiTN.querySelectorAll('label').forEach(lbl => {
            lbl.style.background = '#f8f9fa'; lbl.style.borderColor = '#ddd';
        });
        const labelChon = element.closest('label');
        labelChon.style.background = '#e8f0fe'; labelChon.style.borderColor = '#b8daff';
    }

    capNhatMauNutLuoi(maCauHoi, luaChon);

    // 🌟 [CẤY CHIP 3] VỪA BẤM VỪA BẮN SÓNG NẾU ĐANG THI LIVE
    //if (window.PhienLamBai && window.PhienLamBai.isLiveQuiz) ham_8_6_4_ban_song_realtime();


};

window.luuDapAnDS = function (maCauHoi, y, giaTri, element) {
    if (!window.PhienLamBai.dap_an_hoc_sinh[maCauHoi]) window.PhienLamBai.dap_an_hoc_sinh[maCauHoi] = {};
    window.PhienLamBai.dap_an_hoc_sinh[maCauHoi][y] = giaTri;

    let chuoiDS = "";
    ['A', 'B', 'C', 'D'].forEach(key => {
        const val = window.PhienLamBai.dap_an_hoc_sinh[maCauHoi][key];
        chuoiDS += val ? (val === 'T' ? 'Đ' : 'S') : '_';
    });
    capNhatMauNutLuoi(maCauHoi, chuoiDS);

    // 🌟 [CẤY CHIP 3] VỪA BẤM VỪA BẮN SÓNG NẾU ĐANG THI LIVE
    //if (window.PhienLamBai && window.PhienLamBai.isLiveQuiz) ham_8_6_4_ban_song_realtime();

};

function capNhatMauNutLuoi(maCauHoi, textHienThi) {
    const nut = document.getElementById(`btn-nav-${maCauHoi}`);
    const ansSpan = document.getElementById(`nav-ans-${maCauHoi}`);

    if (nut && !nut.classList.contains('da-lam')) {
        nut.classList.add('da-lam');
        nut.style.background = '#d4edda';
        nut.style.borderColor = '#c3e6cb';
        nut.style.color = '#155724';

        // Cập nhật số câu đã làm
        document.getElementById('so-cau-da-lam').innerText = Object.keys(window.PhienLamBai.dap_an_hoc_sinh).length;
    }
    if (ansSpan) ansSpan.innerText = textHienThi.substring(0, 4); // Rút gọn chuỗi ĐS
}

window.ham_8_thoat_phong_thi = async () => {
    const daLam = Object.keys(window.PhienLamBai.dap_an_hoc_sinh).length;
    if (daLam > 0) {
        if (!confirm("⚠️ CẢNH BÁO!\nNếu thoát bây giờ, bài của bạn SẼ BỊ HỦY KHÔNG GHI NHẬN ĐIỂM. Bạn có chắc chắn muốn thoát?")) return;
    }
    clearInterval(window.PhienLamBai.id_timer);
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';

    const root = document.getElementById('khong-gian-thi-toan-man-hinh');
    if (root) root.remove();
    document.getElementById('dashboard-container').style.display = 'block';
};



// =====================================================================
// HÀM 8.12: NỘP BÀI TỔNG VÀ GỌI SUPABASE CHẤM ĐIỂM BẢO MẬT (KÈM TÍNH KIM CƯƠNG)
// =====================================================================
async function ham_8_12_nop_bai_va_cham_diem(isForce = false) {
    if (!isForce) {
        if (!confirm("Bạn có chắc chắn muốn nộp bài? Hãy chắc chắn rằng bạn đã soát lại toàn bộ đáp án.")) return;
    }

    const btnNop = document.getElementById('btn-nop-bai');
    if (btnNop) { btnNop.innerText = "⏳ HỆ THỐNG ĐANG CHẤM..."; btnNop.disabled = true; }

    const phien = window.PhienLamBai;
    if (phien.id_timer) clearInterval(phien.id_timer);

    if (phien.isLiveQuiz && window.HocSinhLiveChannel) {
        _supabase.removeChannel(window.HocSinhLiveChannel);
        window.HocSinhLiveChannel = null;
    }

    let payloadBaiLam = {};
    phien.danh_sach_cau_hoi.forEach(cau => {
        const maCauChuan = cau.ma_cau_hoi || cau.maCau;
        const dapanHS = phien.dap_an_hoc_sinh[maCauChuan];
        const kieu = (cau.kieuCau || cau.loaiCau || "TN").toUpperCase();

        if (kieu === 'DS' && typeof dapanHS === 'object') {
            let strDS = "";
            ['A', 'B', 'C', 'D'].forEach(k => { strDS += dapanHS[k] || dapanHS[k.toUpperCase()] || "_"; });
            payloadBaiLam[maCauChuan] = strDS;
        } else {
            payloadBaiLam[maCauChuan] = dapanHS || "";
        }
    });

    const tBatDau = phien.thoi_diem_bat_dau || Date.now();
    const soGiayThucTe = Math.floor((Date.now() - tBatDau) / 1000);
    const thoiGianLamBaiStr = `${Math.floor(soGiayThucTe / 60)} phút ${soGiayThucTe % 60} giây`;

    try {
        const { data: diemSoBiMat, error: errCham } = await _supabase.rpc('cham_diem_bai_thi', {
            p_id_ket_qua: phien.id_ket_qua_database,
            p_ma_nhiem_vu: phien.ma_nhiem_vu,
            p_dap_an_hoc_sinh: payloadBaiLam,
            p_thoi_gian_lam_bai: thoiGianLamBaiStr
        });

        if (errCham) throw errCham;

        const diemTongKet = Number(diemSoBiMat || 0);

        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';
        const khongGianThi = document.getElementById('khong-gian-thi-toan-man-hinh');
        if (khongGianThi) khongGianThi.remove();

        // ==============================================================
        // 4. THUẬT TOÁN KIM CƯƠNG (SỔ CÁI VÀ ĐỘ CHÊNH LỆCH)
        // ==============================================================
        let kcTheoDiem = 1;
        if (diemTongKet === 10) kcTheoDiem = 4;
        else if (diemTongKet >= 8) kcTheoDiem = 3;
        else if (diemTongKet >= 5) kcTheoDiem = 2;

        let soCaiKC = GocHocSinhState.chi_tiet_kim_cuong || {};
        let tongKC = GocHocSinhState.kim_cuong || 0;
        let maNV = phien.ma_nhiem_vu;

        let kcCu = soCaiKC[maNV] || 0;
        let chenhLechKC = kcTheoDiem - kcCu;

        tongKC += chenhLechKC;
        if (tongKC < 0) tongKC = 0;
        soCaiKC[maNV] = kcTheoDiem;

        GocHocSinhState.kim_cuong = tongKC;
        GocHocSinhState.chi_tiet_kim_cuong = soCaiKC;

        let textThongBaoKC = "";
        if (chenhLechKC > 0) {
            textThongBaoKC = `<span style="font-size: 20px; color: #00bcd4; font-weight: bold;">+${chenhLechKC} 💎 Kim Cương</span>`;
        } else if (chenhLechKC < 0) {
            textThongBaoKC = `<span style="font-size: 18px; color: #e74c3c; font-weight: bold;">${chenhLechKC} 💎 Kim Cương (Do điểm thấp hơn)</span>`;
        } else {
            textThongBaoKC = `<span style="font-size: 16px; color: #f39c12; font-weight: bold;">Không thay đổi 💎 Kim Cương</span>`;
        }

        // ==============================================================
        // 5. RẼ NHÁNH GIAO DIỆN SAU KHI TÍNH KIM CƯƠNG
        // ==============================================================
        if (phien.isLiveQuiz) {
            if (window.ThongTinLiveHocSinh && window.ThongTinLiveHocSinh.maPhong) {
                await _supabase.from('tien_do_live_quiz')
                    .update({ da_nop: true, diem_so: diemTongKet })
                    .eq('ma_phong', window.ThongTinLiveHocSinh.maPhong)
                    .eq('uid_hoc_sinh', GocHocSinhState.uid);
            }

            // Lưu Kim Cương lên Server
            await _supabase.from('hoc_sinh')
                .update({ kim_cuong: tongKC, chi_tiet_kim_cuong: soCaiKC })
                .eq('uid', GocHocSinhState.uid);

            const khuVucDashboard = document.getElementById('dashboard-container');
            if (khuVucDashboard) khuVucDashboard.style.display = 'block';

            if (typeof window.ham_8_6_6_man_hinh_ket_qua_cho === 'function') {
                window.ham_8_6_6_man_hinh_ket_qua_cho(diemTongKet);
            }

            Swal.fire({
                title: isForce ? '⏳ HẾT GIỜ LÀM BÀI!' : '📤 NỘP BÀI THÀNH CÔNG!',
                html: `Thành tích đấu trường của em: <b>${diemTongKet.toFixed(2)} điểm</b><br><br>${textThongBaoKC}`,
                icon: 'success',
                timer: 4000,
                showConfirmButton: true
            });

        } else {
            let tienDoHienTai = GocHocSinhState.tien_do_lam_bai || {};
            tienDoHienTai[phien.ma_nhiem_vu] = (tienDoHienTai[phien.ma_nhiem_vu] || 0) + 1;

            // Lưu Tiến độ và Kim Cương lên Server cùng 1 nhịp
            await _supabase.from('hoc_sinh')
                .update({
                    tien_do_lam_bai: tienDoHienTai,
                    kim_cuong: tongKC,
                    chi_tiet_kim_cuong: soCaiKC
                })
                .eq('uid', GocHocSinhState.uid);

            GocHocSinhState.tien_do_lam_bai = tienDoHienTai;

            Swal.fire({
                title: '🏆 NỘP BÀI THÀNH CÔNG!',
                html: `Điểm số của em là: <b>${diemTongKet.toFixed(2)} điểm</b><br><br>${textThongBaoKC}`,
                icon: 'success',
                confirmButtonText: 'Tuyệt vời',
                confirmButtonColor: '#28a745'
            }).then(() => {
                document.getElementById('dashboard-container').style.display = 'block';
                ham_8_1_tai_nhiem_vu_cua_toi(GocHocSinhState.uid, GocHocSinhState.danh_sach_ma_lop, GocHocSinhState.ten);
            });
        }

    } catch (err) {
        alert("❌ Máy chủ quá tải hoặc lỗi khi chấm: " + err.message);
        if (btnNop) { btnNop.innerText = "NỘP LẠI"; btnNop.disabled = false; }
    }
}
// ==============================================================
// Hàm 8.13: Tải dữ liệu Xem lại bài (Tích hợp chốt chặn File Bóng Ma)
// ==============================================================
window.ham_8_13_xem_lai_ket_qua = async function (maNhiemVu, idKetQua) {
    const vungLamViec = document.getElementById('dashboard-container');
    vungLamViec.style.display = 'none';

    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'khong-gian-loading-xem-lai';
    loadingDiv.style.cssText = "position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: #f0f2f5; z-index: 99999; display: flex; flex-direction: column; justify-content: center; align-items: center;";
    loadingDiv.innerHTML = `
        <div style="border: 4px solid #ccc; border-top: 4px solid #d35400; border-radius: 50%; width: 50px; height: 50px; animation: spin 1s linear infinite;"></div>
        <h3 style="margin-top:20px; color:#d35400;">🔍 Đang trích xuất bài làm và đối chiếu bảo mật...</h3>
        <style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>
    `;
    document.body.appendChild(loadingDiv);

    try {
        // 1. TẢI DỮ LIỆU TỪ SUPABASE
        const { data: ketQua, error: errKQ } = await _supabase.from('ket_qua_thi').select('*').eq('id', idKetQua).single();
        if (errKQ || !ketQua) throw new Error("Không tìm thấy dữ liệu bài làm!");

        const { data: nv, error: errNV } = await _supabase.from('nhiem_vu').select('*').eq('ma_nhiem_vu', maNhiemVu).single();
        if (errNV || !nv) throw new Error("Không tìm thấy thông tin nhiệm vụ!");

        // Lấy Học liệu (Gồm: Bản đồ cấu trúc, Link Đề, Link Giải Bóng Ma)
        const { data: dataHocLieu, error: errHL } = await _supabase.from('hoc_lieu').select('danh_sach_cau_hoi, url_github, url_file_giai').eq('ma_hoc_lieu', nv.ma_hoc_lieu).single();
        if (errHL) throw errHL;

        // ==============================================================
        // 🔒 CHỐT CHẶN BẢO MẬT: KIỂM TRA QUYỀN TRUY CẬP TRƯỚC KHI TẢI DỮ LIỆU
        // ==============================================================
        let congBo = { thoi_diem: CFG_NV.THOI_DIEM.KHOA, muc_do: CFG_NV.MUC_DO.KHONG };
        try { congBo = typeof nv.cau_hinh_dap_an === 'string' ? JSON.parse(nv.cau_hinh_dap_an) : (nv.cau_hinh_dap_an || congBo); } catch (e) { }

        const now = new Date();
        const tDongDe = nv.thoi_gian_dong ? new Date(nv.thoi_gian_dong) : null;
        let hopLeThoiDiem = false;

        const td = congBo.thoi_diem;
        if (td === CFG_NV.THOI_DIEM.SAU_NOP) { hopLeThoiDiem = true; }
        else if (td === CFG_NV.THOI_DIEM.SAU_HET_HAN) { if (tDongDe && now > tDongDe) hopLeThoiDiem = true; }
        else if (td && td.startsWith("HEN_GIO|")) { if (now > new Date(td.split("|")[1])) hopLeThoiDiem = true; }

        const choPhepXemDapAn = hopLeThoiDiem && (congBo.muc_do === CFG_NV.MUC_DO.DAPAN_DIEM || congBo.muc_do === CFG_NV.MUC_DO.FULL_LOIGIAI);
        const choPhepXemLoiGiai = hopLeThoiDiem && (congBo.muc_do === CFG_NV.MUC_DO.FULL_LOIGIAI);

        // ==============================================================
        // 2. TẢI FILE ĐỀ THI TỪ GITHUB (Luôn được tải để hiện nội dung câu hỏi)
        // ==============================================================
        let urlFileGitHub = dataHocLieu.url_github;
        if (!urlFileGitHub) {
            let maDeGoc = nv.ma_hoc_lieu;
            if (maDeGoc.startsWith("HL_DE_")) maDeGoc = maDeGoc.replace("HL_DE_", "");
            urlFileGitHub = `https://ducchinh2308.github.io/LuyenToan2308/Kho_De_Thi/${maDeGoc}/DeThi_${maDeGoc}.json`;
        }

        const resDe = await fetch(urlFileGitHub);
        if (!resDe.ok) throw new Error("Không tải được đề gốc từ Github!");
        const dataGitHub = await resDe.json();

        // ==============================================================
        // 3. TẢI FILE GIẢI BÓNG MA (CHỈ TẢI KHI ĐƯỢC PHÉP XEM LỜI GIẢI)
        // ==============================================================
        let dataGiaiGop = null;
        if (choPhepXemLoiGiai && dataHocLieu.url_file_giai) {
            try {
                const resGiai = await fetch(dataHocLieu.url_file_giai);
                if (resGiai.ok) dataGiaiGop = await resGiai.json();
            } catch (e) { console.error("Không tải được file bóng ma", e); }
        }

        // ==============================================================
        // 4. RÁP BẢN ĐỒ VÀ TẨY TRẮNG RAM NẾU KHÔNG CÓ QUYỀN
        // ==============================================================
        const deThiHoanChinh = (dataHocLieu.danh_sach_cau_hoi || []).map(mapItem => {
            const noiDung = (dataGitHub.danhSachCauHoi || dataGitHub.danh_sach_cau_hoi || []).find(c => c.maCau === mapItem.ma_cau_hoi) || {};

            // Tìm lời giải từ File bóng ma thông qua mã bảo mật sol_
            let htmlLoiGiaiChiTiet = null;
            if (choPhepXemLoiGiai && dataGiaiGop) {
                const matchGiai = (dataGiaiGop.danhSachLoiGiai || []).find(g => g.maBaoMat === mapItem.ma_loi_giai);
                if (matchGiai) htmlLoiGiaiChiTiet = matchGiai.loiGiaiHtml;
            }

            return {
                ...mapItem,
                ...noiDung,
                // 🔒 TẨY TRẮNG: Học sinh F12 cũng chỉ thấy giá trị null nếu không được phép xem
                dap_an: choPhepXemDapAn ? mapItem.dap_an : null,
                loiGiaiHtml: htmlLoiGiaiChiTiet
            };
        });

        const baseUrlHinhAnh = urlFileGitHub.substring(0, urlFileGitHub.lastIndexOf('/')) + "/HinhAnh";

        document.getElementById('khong-gian-loading-xem-lai').remove();

        // Truyền thẳng quyền hạn đã chốt xuống Hàm vẽ giao diện
        ham_8_14_ve_giao_dien_xem_lai(ketQua, deThiHoanChinh, nv, baseUrlHinhAnh, choPhepXemDapAn, choPhepXemLoiGiai);

    } catch (err) {
        document.getElementById('khong-gian-loading-xem-lai')?.remove();
        document.getElementById('dashboard-container').style.display = 'block';
        alert("❌ Lỗi mở bài thi: " + err.message);
    }
};

// ==============================================================
// Hàm 8.14: Vẽ Giao diện Xem Lại (Chỉ làm nhiệm vụ hiển thị đơn thuần)
// ==============================================================
function ham_8_14_ve_giao_dien_xem_lai(ketQua, deThi, nv, baseUrlHinhAnh, choPhepXemDapAn, choPhepXemLoiGiai) {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const chiTietHS = {};
    if (ketQua.chi_tiet_lam_bai) {
        ketQua.chi_tiet_lam_bai.forEach(item => { chiTietHS[item.maCau] = item; });
    }

    let dsTN = [], dsDS = [], dsTLN = [];
    deThi.forEach(cau => {
        const loai = (cau.kieuCau || cau.loaiCau || "TN").toUpperCase();
        if (loai === "TN") dsTN.push(cau);
        else if (loai === "DS") dsDS.push(cau);
        else if (loai === "TLN") dsTLN.push(cau);
    });

    let htmlContentRight = `<div style="background:#d35400; color:white; padding:15px; border-radius:8px; margin-bottom:20px; box-shadow:0 4px 6px rgba(0,0,0,0.1);"><h2 style="margin:0; font-size:18px; text-transform: uppercase;">🔍 XEM LẠI BÀI: ${nv.ten_nhiem_vu}</h2></div>`;

    if (!choPhepXemDapAn) {
        htmlContentRight += `
            <div style="background: #fff3cd; border: 1px solid #ffe69c; color: #856404; padding: 12px; border-radius: 6px; margin-bottom: 20px; font-weight: bold; font-size: 14px;">
                🔒 Hệ thống đang khóa đáp án và lời giải chi tiết theo quy định của Thầy/Cô. Em hiện tại chỉ được xem điểm số và lựa chọn của mình.
            </div>`;
    }

    let htmlNavLeft = ``;

    const sinhGiaoDienNhom = (tieuDePhan, danhSach, loaiCau) => {
        if (danhSach.length === 0) return;

        htmlContentRight += `<h3 style="color: #c0392b; border-bottom: 2px solid #c0392b; padding-bottom: 5px; margin-top: 40px; margin-bottom: 20px; font-size: 20px; text-transform: uppercase;">${tieuDePhan}</h3>`;
        let tenNav = loaiCau === 'TN' ? 'TN' : (loaiCau === 'DS' ? 'ĐS' : 'TLN');
        htmlNavLeft += `<div style="margin-bottom: 15px;"><h4 style="margin: 0 0 10px 0; color: #c0392b; font-size: 13px; border-bottom: 1px solid #ddd; padding-bottom: 5px;">📍 PHẦN ${tenNav}</h4><div style="display: flex; flex-wrap: wrap; gap: 8px;">`;

        let sttPhan = 1;

        // Tìm đoạn code duyệt danh sách
        //console.log("DEBUG-LIST:", danhSach); // Thay danh_sach_cau_hoi_goc bằng tên biến thực tế thầy dùng


        danhSach.forEach(cau => {
            const maCauLogic = cau.ma_cau_hoi || cau.maCau;
            //const baiLamCuaHS = chiTietHS[maCauLogic] || { luaChonHS: null, ketQua: "Bỏ trống", diem: 0 };
            const baiLamCuaHS = chiTietHS[maCauLogic] || { luaChonHS: {}, ketQua: "Bỏ trống", diem: 0 };


            //// =================================================================
            //// 🐛 BẪY DEBUG 2: SOI DỮ LIỆU Ở MÀN HÌNH XEM LẠI CHI TIẾT
            //// =================================================================
            //console.log("🔍 [XEM LẠI] ĐANG XỬ LÝ CÂU THỨ " + sttPhan + " 🔍");
            //console.log("1. Dữ liệu CÂU HỎI (Đã gộp Supabase + Github):", cau);
            //console.log("2. Mã Logic chốt để đối chiếu:", maCauLogic);
            //console.log("3. Dữ liệu BÀI LÀM của Học sinh:", baiLamCuaHS);
            //console.log("==============================================");

            // 🌟 THÊM DÒNG NÀY ĐỂ DEBUG
            //console.log("DEBUG-CÂU-HỎI:", cau);

            htmlContentRight += taoGiaoDienCauHoiDaCham(cau, baiLamCuaHS, sttPhan, loaiCau, baseUrlHinhAnh, choPhepXemDapAn, choPhepXemLoiGiai);

            let mauNut = "#e9ecef", vienNut = "#ced4da", mauChu = "#495057";
            if (choPhepXemDapAn) {
                if (baiLamCuaHS.ketQua === "Đúng") { mauNut = "#d4edda"; vienNut = "#c3e6cb"; mauChu = "#155724"; }
                else if (baiLamCuaHS.ketQua === "Sai" || (baiLamCuaHS.diem > 0 && baiLamCuaHS.diem < 1 && loaiCau === 'DS')) { mauNut = "#f8d7da"; vienNut = "#f5c6cb"; mauChu = "#721c24"; }
            } else {
                if (baiLamCuaHS.luaChonHS || (loaiCau === 'DS' && Object.keys(baiLamCuaHS.luaChonHS || {}).length > 0)) {
                    mauNut = "#e8f4f8"; vienNut = "#b8daff"; mauChu = "#0056b3";
                }
            }

            htmlNavLeft += `
                <div onclick="document.getElementById('review-cau-${maCauLogic}').scrollIntoView({behavior: 'smooth', block: 'center'})" 
                     style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 42px; height: 42px; background: ${mauNut}; border: 1px solid ${vienNut}; border-radius: 6px; cursor: pointer; color: ${mauChu}; font-weight: bold; font-size: 14px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                    <span style="line-height: 1;">${sttPhan}</span>
                </div>`;
            sttPhan++;
        });
        htmlNavLeft += `</div></div>`;
    };

    sinhGiaoDienNhom("PHẦN I. Câu trắc nghiệm nhiều phương án lựa chọn", dsTN, "TN");
    sinhGiaoDienNhom("PHẦN II. Câu trắc nghiệm đúng/sai", dsDS, "DS");
    sinhGiaoDienNhom("PHẦN III. Câu trắc nghiệm trả lời ngắn", dsTLN, "TLN");

    const rootDiv = document.createElement('div');
    rootDiv.id = 'khong-gian-xem-lai-toan-man-hinh';
    rootDiv.style.cssText = "position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; display: flex; background: #e9ecef; box-sizing: border-box; z-index: 99999;";

    rootDiv.innerHTML = `
        <div style="flex: 0 0 70px; background: #fff; display: flex; flex-direction: column; border-right: 1px solid #ccc; box-shadow: 2px 0 10px rgba(0,0,0,0.05); z-index: 10;">
            <div style="padding: 15px; background: #fffdf5; border-bottom: 1px solid #eee; text-align:center;">
                <div style="font-size: 12px; color: #d35400; font-weight: bold; text-transform: uppercase;">Điểm số</div>
                <div style="color: #c0392b; font-size: 32px; font-weight: 900; line-height: 1.2;">${ketQua.tong_diem}</div>
            </div>
            <div style="flex: 1; overflow-y: auto; padding: 15px; background: #fcfcfc;">${htmlNavLeft}</div>
            <div style="padding: 15px; border-top: 1px solid #eee; background: #fff;">
                <button onclick="dongGiaoDienXemLai()" style="width: 100%; padding: 15px; background: #6c757d; color: white; border: none; border-radius: 6px; font-weight: bold; font-size: 16px; cursor: pointer; box-shadow: 0 4px 6px rgba(0,0,0,0.2);">⬅️ QUAY LẠI</button>
            </div>
        </div>
        <div id="khu-vuc-cuon-review" style="flex: 1; padding: 30px; overflow-y: auto; scroll-behavior: smooth; position: relative;">
            <div style="max-width: 900px; margin: 0 auto; padding-bottom: 100px;">${htmlContentRight}</div>
        </div>
    `;
    document.body.appendChild(rootDiv);

    if (window.renderMathInElement) {
        window.renderMathInElement(document.getElementById('khu-vuc-cuon-review'), { delimiters: [{ left: "$$", right: "$$", display: true }, { left: "$", right: "$", display: false }], throwOnError: false, macros: { "\\heva": "\\left\\{\\begin{array}{l}#1\\end{array}\\right.", "\\hoac": "\\left[\\begin{array}{l}#1\\end{array}\\right." } });
    } else if (window.MathJax) MathJax.typesetPromise();

    let oldTikz = document.getElementById('tikz-script-reload');
    if (oldTikz) oldTikz.remove();
    let newTikz = document.createElement('script');
    newTikz.id = 'tikz-script-reload';
    newTikz.src = 'https://tikzjax.com/v1/tikzjax.js';
    document.body.appendChild(newTikz);
}


// ==============================================================
// Hàm Bổ trợ: Vẽ từng câu hỏi (Sửa lỗi 404 tách biệt 2 kho Ảnh)
// ==============================================================

function taoGiaoDienCauHoiDaCham(cau, baiLamHS, stt, loaiCau, thuMucAnh, choPhepXemDapAn, choPhepXemLoiGiai) {
    const maCauLogic = cau.ma_cau_hoi || cau.maCau;
    const maCauHienThi = cau.ma_goc || cau.maCauGoc || maCauLogic;

    // 🌟 KHU VỰC CẢI TIẾN: Điều hướng ảnh thông minh
    const thuMucAnhGiai = "https://ducchinh2308.github.io/LuyenToan2308/Ngan_Hang_Loi_Giai/HinhAnh_Chung";

    // Nếu vẫn không tìm thấy ID thì dừng lại để tránh lỗi tiếp theo
    if (!maCauLogic) {
        console.error("LỖI: Không tìm thấy ID cho câu hỏi:", cau);
        return `<div style="color:red">Lỗi tải câu hỏi (Thiếu ID)</div>`;
    }



    const xuLyNoiDung = (noiDung, isLoiGiai = false) => {
        if (!noiDung) return "";
        let htmlDich = typeof dichLaTeX === 'function' ? dichLaTeX(noiDung) : noiDung;
        return htmlDich.replace(/src=['"]([^'"]+)['"]/g, (match, tenFile) => {
            if (tenFile.startsWith('http') || tenFile.startsWith('data:')) return match;
            const cleanFile = tenFile.split('/').pop();

            // Nếu là ảnh của Lời giải -> Trỏ về kho Giải Chung
            if (isLoiGiai) {
                return `src="${thuMucAnhGiai}/${cleanFile}"`;
            }
            // Nếu là ảnh của Đề thi -> Trỏ về kho Đề riêng
            return `src="${thuMucAnh}/${cleanFile}"`;
        });
    };

    let diemBadge = `<span style="background:#e9ecef; color:#495057; padding:2px 8px; border-radius:12px; font-size:12px; font-weight:bold;">Đã ghi nhận</span>`;
    if (choPhepXemDapAn) {
        diemBadge = baiLamHS.diem > 0
            ? `<span style="background:#d4edda; color:#155724; padding:2px 8px; border-radius:12px; font-size:12px; font-weight:bold;">+${baiLamHS.diem} đ</span>`
            : `<span style="background:#f8d7da; color:#721c24; padding:2px 8px; border-radius:12px; font-size:12px; font-weight:bold;">0 đ</span>`;
    }

    let htmlBlock = `
        <div id="review-cau-${maCauLogic}" class="cau-hoi" style="margin-bottom: 30px; padding: 25px; border: 1px solid #ccc; border-radius: 8px; background: #fff; box-shadow: 0 4px 8px rgba(0,0,0,0.05); pointer-events: none;">
            <p style="color: #0056b3; margin-top: 0; font-size: 18px; display: flex; justify-content: space-between; border-bottom: 1px solid #eee; padding-bottom: 10px;">
                <span style="display: flex; align-items: baseline; gap: 8px;">
                    <strong style="font-weight: 900; color: #000080;">(${loaiCau}) Câu ${stt}:</strong>
                    <span style="font-size: 13px; color: #6c757d; font-weight: bold; background: #f8f9fa; padding: 2px 6px; border: 1px solid #ddd; border-radius: 4px;">[ID: ${maCauHienThi}]</span> 
                </span>
                ${diemBadge}
            </p>
            <div style="font-size: 17px; line-height: 1.6; margin-bottom: 20px; margin-top: 15px; overflow-x: auto;">${xuLyNoiDung(cau.cauDan || cau.noiDungHtml)}</div>
    `;

    // 1. DẠNG TRẮC NGHIỆM MULTIPLE CHOICE (TN)
    if (loaiCau === "TN") {
        htmlBlock += `<div style="display: flex; flex-direction: column; gap: 10px;">`;
        const mangPA = cau.dsTron || [{ idGoc: 'A', text: cau.paA }, { idGoc: 'B', text: cau.paB }, { idGoc: 'C', text: cau.paC }, { idGoc: 'D', text: cau.paD }];

        mangPA.forEach((pa, idx) => {
            const nhan = String.fromCharCode(65 + idx);
            const isStudentPicked = (pa.idGoc === baiLamHS.luaChonHS);
            const isCorrect = (pa.idGoc === cau.dap_an);

            let bgLabel = "#f8f9fa", borderLabel = "#ddd", icon = "";

            if (choPhepXemDapAn) {
                if (isStudentPicked && isCorrect) { bgLabel = "#d4edda"; borderLabel = "#28a745"; icon = "✅ Chốt"; }
                else if (isStudentPicked && !isCorrect) { bgLabel = "#f8d7da"; borderLabel = "#dc3545"; icon = "❌ Em chọn"; }
            } else {
                if (isStudentPicked) { bgLabel = "#e8f4f8"; borderLabel = "#b8daff"; icon = "🔷 Lựa chọn của em"; }
            }

            htmlBlock += `
                <label style="display: flex; align-items: flex-start; padding: 12px; border: 2px solid ${borderLabel}; border-radius: 6px; background: ${bgLabel};">
                    <input type="radio" ${isStudentPicked ? 'checked' : ''} style="margin-top: 5px; margin-right: 15px; transform: scale(1.3);">
                    <div style="flex:1; font-size: 17px;"><b>${nhan}.</b> ${xuLyNoiDung(pa.text)} <span style="font-weight:bold; font-size:14px; float:right;">${icon}</span></div>
                </label>`;
        });
        htmlBlock += `</div>`;
    }
    

    // 2. DẠNG ĐÚNG SAI (DS)
    else if (loaiCau === "DS") {
        htmlBlock += `<div class="cau-ds">`;
        const mangY = [{ id: 'a', text: cau.paA }, { id: 'b', text: cau.paB }, { id: 'c', text: cau.paC }, { id: 'd', text: cau.paD }];
        const dapAnChuan = cau.dap_an || ""; // Ví dụ: "TTFT"
        const chuoiBaiLam = baiLamHS.luaChonHS || ""; // Ví dụ: "TFTT" (Lấy từ dữ liệu thầy gửi)

        mangY.forEach((y, idx) => {
            const nhanThuong = ['a', 'b', 'c', 'd'][idx];
            // Lấy ký tự tại vị trí idx: 'T' hoặc 'F'
            const hsChon = chuoiBaiLam[idx] || "";
            const correctVal = dapAnChuan[idx] || "";

            const hsT = (hsChon === 'T');
            const hsF = (hsChon === 'F');

            let bgT = "transparent", borderT = "#ccc", colorT = "#495057";
            let bgF = "transparent", borderF = "#ccc", colorF = "#495057";

            if (choPhepXemDapAn) {
                // Nếu học sinh chọn đúng
                if (hsT && correctVal === 'T') { bgT = "#d4edda"; borderT = "#28a745"; colorT = "#28a745"; }
                else if (hsT && correctVal === 'F') { bgT = "#f8d7da"; borderT = "#dc3545"; colorT = "#dc3545"; }

                if (hsF && correctVal === 'F') { bgF = "#d4edda"; borderF = "#28a745"; colorF = "#28a745"; }
                else if (hsF && correctVal === 'T') { bgF = "#f8d7da"; borderF = "#dc3545"; colorF = "#dc3545"; }
            } else {
                // Chỉ hiển thị lựa chọn của HS
                if (hsT) { bgT = "#e8f4f8"; borderT = "#80bdff"; colorT = "#0056b3"; }
                if (hsF) { bgF = "#e8f4f8"; borderF = "#80bdff"; colorF = "#0056b3"; }
            }

            htmlBlock += `
            <div style="margin-bottom: 12px; padding: 12px 15px; background: #f8f9fa; border: 1px solid #eee; border-radius: 6px; display: flex; justify-content: space-between; align-items: center;">
                <div style="flex: 1; padding-right: 20px; font-size: 16px;"><strong>${nhanThuong})</strong> ${xuLyNoiDung(y.text)}</div>
                <div style="display: flex; gap: 10px; flex-shrink: 0;">
                    <span style="padding: 5px 10px; border-radius: 20px; border: 2px solid ${borderT}; background: ${bgT}; font-weight: bold; color: ${colorT}; display:flex; align-items:center; gap:5px;">
                        <input type="radio" ${hsT ? 'checked' : ''} disabled style="transform: scale(1.2);"> Đúng
                    </span>
                    <span style="padding: 5px 10px; border-radius: 20px; border: 2px solid ${borderF}; background: ${bgF}; font-weight: bold; color: ${colorF}; display:flex; align-items:center; gap:5px;">
                        <input type="radio" ${hsF ? 'checked' : ''} disabled style="transform: scale(1.2);"> Sai
                    </span>
                </div>
            </div>`;
        });
        htmlBlock += `</div>`;
    }
    // 3. DẠNG TRẢ LỜI NGẮN (TLN)
    else if (loaiCau === "TLN") {
        const hsAns = baiLamHS.luaChonHS || "";
        const isCorrect = (baiLamHS.ketQua === "Đúng");

        let borderColor = "#1a73e8", bgInput = "#fff", labelStatus = "Lựa chọn bài làm của em:";
        if (choPhepXemDapAn) {
            borderColor = isCorrect ? "#28a745" : "#dc3545";
            bgInput = isCorrect ? "#d4edda" : "#f8d7da";
            labelStatus = isCorrect ? "✅ CHÍNH XÁC" : "❌ CHƯA CHÍNH XÁC";
        }

        let inputHtml = "";
        for (let i = 0; i < 4; i++) {
            let char = hsAns[i] || "";
            inputHtml += `<input type="text" value="${char}" readonly style="width: 55px; height: 60px; text-align: center; font-size: 26px; font-weight: bold; border: 2px solid ${borderColor}; border-radius: 8px; color: ${borderColor}; outline: none; background: ${bgInput}; text-transform: uppercase;">`;
        }

        htmlBlock += `
            <div style="margin-top: 15px; padding: 25px; background: #f8f9fa; border-radius: 8px; border: 1px dashed #ccc; text-align: center;">
                <div style="font-weight: bold; color: ${borderColor}; font-size: 15px; margin-bottom: 15px;">${labelStatus}</div>
                <div style="display: flex; justify-content: center; gap: 12px;">${inputHtml}</div>
            </div>`;
    }

    const idVungLoiGiai = `loigiai-${maCauLogic}`;

    let textDapAnChuan = "";
    if (loaiCau === "TN") textDapAnChuan = `Đáp án đúng: ${cau.dap_an || "A"}`;
    else if (loaiCau === "DS") {
        let chuoiGợiY = [];
        (cau.dap_an || "TTTT").split("").forEach((k, i) => {
            chuoiGợiY.push(`${['a', 'b', 'c', 'd'][i]}: ${k === 'T' ? 'Đ' : 'S'}`);
        });
        textDapAnChuan = `Đáp án đúng: ${chuoiGợiY.join(" | ")}`;
    } else if (loaiCau === "TLN") {
        textDapAnChuan = `Đáp án đúng: ${cau.dap_an}`;
    }

    let cssNutLoiGiai = "padding: 8px 16px; background: #fff; color: #6f42c1; border: 1.5px solid #6f42c1; border-radius: 6px; font-weight: bold; font-size: 13px; cursor: pointer; transition: 0.2s;";
    let attrNutLoiGiai = `onclick="let v=document.getElementById('${idVungLoiGiai}'); if(v.style.display==='none'){v.style.display='block'; this.innerText='📖 THU GỌN LỜI GIẢI';}else{v.style.display='none'; this.innerText='📖 XEM LỜI GIẢI CHI TIẾT';}"`;

    if (!choPhepXemLoiGiai) {
        cssNutLoiGiai = "padding: 8px 16px; background: #e9ecef; color: #6c757d; border: 1.5px solid #ccc; border-radius: 6px; font-weight: bold; font-size: 13px; cursor: not-allowed; opacity: 0.5;";
        attrNutLoiGiai = `onclick="alert('🔒 Chức năng xem Lời giải chi tiết của câu hỏi này đang khóa!')"`;
    }

    htmlBlock += `
        <div style="margin-top: 20px; border-top: 1px dotted #ccc; padding-top: 15px; display: flex; gap: 12px; flex-wrap: wrap; pointer-events: auto;">
            
            ${choPhepXemDapAn ? `
                <button style="padding: 8px 16px; background: #e8f4f8; color: #1a73e8; border: 1.5px solid #1a73e8; border-radius: 6px; font-weight: bold; font-size: 13px; cursor: default;">
                    🎯 ${textDapAnChuan}
                </button>
            ` : `
                <button onclick="alert('🔒 Đáp án chuẩn đang được bảo mật!')" style="padding: 8px 16px; background: #f8d7da; color: #721c24; border: 1.5px solid #f5c6cb; border-radius: 6px; font-weight: bold; font-size: 13px; cursor: not-allowed; opacity: 0.6;">
                    🔒 ĐÁP ÁN ĐANG KHÓA
                </button>
            `}

            <button ${attrNutLoiGiai} style="${cssNutLoiGiai}" 
                    onmouseover="if(${choPhepXemLoiGiai}){this.style.background='#6f42c1'; this.style.color='white';}" 
                    onmouseout="if(${choPhepXemLoiGiai}){this.style.background='white'; this.style.color='#6f42c1';}">
                📖 XEM LỜI GIẢI CHI TIẾT
            </button>
        </div>

        <div id="${idVungLoiGiai}" style="display: none; margin-top: 15px; padding: 20px; background: #faf8ff; border-left: 4px solid #6f42c1; border-radius: 4px; font-size: 16px; line-height: 1.6; overflow-x: auto; color: #2c3e50; pointer-events: auto;">
            <div style="font-weight: bold; color: #6f42c1; margin-bottom: 8px; font-size:14px; text-transform:uppercase;">💡 Hướng dẫn giải chi tiết:</div>
            
            ${xuLyNoiDung(cau.loiGiaiHtml || "<p style='color:#999; font-style:italic;'>Hệ thống chưa cập nhật lời giải văn bản cho câu hỏi này.</p>", true)}
        </div>
    `;

    return htmlBlock + `</div>`;
}


window.dongGiaoDienXemLai = function () {
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    document.getElementById('khong-gian-xem-lai-toan-man-hinh')?.remove();
    document.getElementById('dashboard-container').style.display = 'block';
};

// =====================================================================
// KHỞI TẠO BIẾN SÓNG REALTIME CHO HỌC SINH
// =====================================================================
window.HocSinhLiveChannel = null;
window.ThongTinLiveHocSinh = { maPhong: '', maNhiemVu: '' };




window.ham_8_6_tab_live_quiz = function () {
    const vungLamViec = document.getElementById('vung-lam-viec-hoc-sinh');
    if (!vungLamViec) return console.error("Lỗi: Không tìm thấy thẻ vung-lam-viec-hoc-sinh!");

    if (window.HocSinhLiveChannel) {
        _supabase.removeChannel(window.HocSinhLiveChannel);
        window.HocSinhLiveChannel = null;
    }

    // 1. Render giao diện KHÔNG CÓ onclick trong HTML
    vungLamViec.innerHTML = `
        <div style="max-width: 450px; margin: 40px auto; background: white; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); overflow: hidden;">
            <div style="background: #1e1e2f; padding: 40px 20px; text-align: center; color: white;">
                <div style="font-size: 50px; margin-bottom: 10px;">🎮</div>
                <h2 style="margin: 0; font-size: 24px; font-weight: 900; letter-spacing: 1px;">ĐẤU TRƯỜNG TRỰC TIẾP</h2>
                <p style="color: #a0a0b2; font-size: 14px; margin-top: 5px;">Nhìn lên màn hình của Thầy để lấy mã PIN</p>
            </div>
            <div style="padding: 30px;">
                <input type="text" id="txtPinLive" placeholder="NHẬP MÃ PIN (VD: 62895)" style="width: 100%; padding: 18px; text-align: center; font-size: 24px; font-weight: 900; letter-spacing: 5px; border: 2px solid #ddd; border-radius: 12px; box-sizing: border-box; transition: 0.3s; margin-bottom: 20px;" maxlength="6" oninput="this.value = this.value.replace(/[^0-9]/g, '')">
                <button id="btn-vao-phong-live" style="width: 100%; padding: 16px; background: #e74c3c; color: white; border: none; border-radius: 12px; font-weight: 900; font-size: 18px; cursor: pointer;">🚀 VÀO PHÒNG</button>
            </div>
        </div>
    `;

    // 2. Gắn sự kiện sau khi HTML đã nằm trong DOM
    document.getElementById('btn-vao-phong-live').addEventListener('click', function () {
        if (typeof window.ham_8_6_1_vao_phong === 'function') {
            window.ham_8_6_1_vao_phong();
        } else {
            console.error("Hàm ham_8_6_1_vao_phong chưa được load!");
        }
    });
};
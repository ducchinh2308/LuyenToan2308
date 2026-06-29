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
                    <div style="display: flex; align-items: center; gap: 5px; background: #e0f7fa; padding: 6px 15px; border-radius: 20px; border: 1px solid #00bcd4;" title="Số Kim Cương">
                        <span style="font-size: 18px;">💎</span>
                        <span style="font-weight: 900; color: #00838f; font-size: 16px;">${soKimCuong}</span>
                    </div>
                </div>
            </div>
            
            
            <div style="display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; margin-bottom: 20px;">
    
            <button onclick="ham_8_2a_tab_nhiem_vu_trac_nghiem()" style="padding: 12px 15px; background: #1a73e8; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">📝 NV TRẮC NGHIỆM</button>
            <button onclick="ham_8_2b_tab_nhiem_vu_tu_luan()" style="padding: 12px 15px; background: #6f42c1; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">📷 NV TỰ LUẬN</button>
            <button onclick="ham_8_2c_tab_nhiem_vu_doc_bai()" style="padding: 12px 15px; background: #28a745; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">📺 NV ĐỌC BÀI</button>
            <button onclick="ham_8_2d_tab_nhiem_vu_khao_sat()" style="padding: 12px 15px; background: #fd7e14; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">📊 NV KHẢO SÁT</button>
            </div>

            <div style="display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; margin-bottom: 20px;">
                <button onclick="ham_8_4_tab_ket_qua()" style="padding: 10px 15px; background: #6c757d; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">📊 KẾT QUẢ</button>
                <button onclick="ham_8_5_tab_ho_so()" style="padding: 10px 15px; background: #6c757d; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">👤 HỒ SƠ</button>
                <button onclick="ham_13_1_ve_hop_thu_hoc_sinh()" style="padding: 10px 15px; background: #0ea5e9; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">💬 HỎI ĐÁP</button>
                <button onclick="ham_8_6_tab_live_quiz()" style="padding: 10px 15px; background: #e74c3c; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">⚔️ LIVE QUIZ</button>
            </div>
            
            <div id="vung-lam-viec-hoc-sinh" style="padding: 15px; background: #f8f9fa; border-radius: 8px; border: 1px dashed #ccc; min-height: 300px;"></div>
        </div>
    `;
    ham_8_2a_tab_nhiem_vu_trac_nghiem(); // Mặc định hiển thị Trắc nghiệm

    // =================================================================
    // 🌟 6. KHỞI CHẠY HỆ THỐNG THANH THI ĐUA, NHẮC NHỞ VÀ THÔNG BÁO
    // =================================================================

    // Đập bỏ đồng hồ cũ (nếu có) để chống lag
    if (window.dongHoThanhChayHS) clearInterval(window.dongHoThanhChayHS);
    if (window.dongHoThanhChayNV) clearInterval(window.dongHoThanhChayNV);
    if (window.dongHoThanhChayTB) clearInterval(window.dongHoThanhChayTB); // 👈 Thêm đập đồng hồ Thông báo

    // Kích hoạt thanh báo điểm (Trôi phía trên)
    ham_8_1_1_ve_thanh_chay_lop_minh();
    window.dongHoThanhChayHS = setInterval(ham_8_1_1_ve_thanh_chay_lop_minh, 60000);

    // Kích hoạt thanh nhắc nợ bài tập (Trôi phía dưới sát đáy)
    ham_8_1_2_ve_thanh_chay_nhiem_vu_chua_lam();
    window.dongHoThanhChayNV = setInterval(ham_8_1_2_ve_thanh_chay_nhiem_vu_chua_lam, 60000);

    // 🌟 Kích hoạt thanh THÔNG BÁO TỪ GIÁO VIÊN (Trôi trên đỉnh cùng)
    ham_8_1_3_ve_thanh_thong_bao_tu_gv();
    window.dongHoThanhChayTB = setInterval(ham_8_1_3_ve_thanh_thong_bao_tu_gv, 60000);
}

// =====================================================================
// Hàm 8.1.1: Vẽ thanh chạy thi đua nội bộ Lớp (Quét cả 4 phân hệ)
// =====================================================================
async function ham_8_1_1_ve_thanh_chay_lop_minh() {
    if (typeof SUPABASE_URL === 'undefined' || !SUPABASE_URL.startsWith('http')) return;

    const lopCuaToi = (AppState.user && AppState.user.danh_sach_ma_lop) ? AppState.user.danh_sach_ma_lop : [];
    if (lopCuaToi.length === 0) return;

    try {
        const headersAPI = { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json' };

        const resLop = await fetch(`${SUPABASE_URL}/rest/v1/lop_hoc?select=ma_lop,ten_lop`, { method: 'GET', headers: headersAPI });
        const dataLop = await resLop.json();
        const tuDienLop = {};
        if (dataLop && dataLop.length > 0) dataLop.forEach(lop => tuDienLop[lop.ma_lop] = lop.ten_lop);

        // 🌟 MỚI: Quét qua 4 bảng kết quả
        const bangList = ['trac_nghiem', 'tu_luan', 'doc_bai', 'khao_sat'];
        let allData = [];

        for (let loai of bangList) {
            const tableKQ = `ket_qua_${loai}`;
            const tableNV = `nhiem_vu_${loai}`;
            const querySelect = `tong_diem,thoi_gian_nop,hoc_sinh!uid_hoc_sinh(ten),${tableNV}(ten_nhiem_vu,danh_sach_lop)`;
            const fullAPI_Link = `${SUPABASE_URL}/rest/v1/${tableKQ}?select=${querySelect}&ma_nhiem_vu=not.ilike.LIVE_*&order=thoi_gian_nop.desc&limit=20`;

            try {
                const response = await fetch(fullAPI_Link, { method: 'GET', headers: headersAPI });
                if (response.ok) {
                    const data = await response.json();
                    // Quy chuẩn tên object join về 1 mối để dễ render
                    const normalizedData = data.map(row => ({
                        ...row,
                        nhiem_vu_chung: row[tableNV] 
                    }));
                    allData = allData.concat(normalizedData);
                }
            } catch (e) { console.warn(`Bỏ qua fetch ${tableKQ} vì chưa có dữ liệu`); }
        }

        // Sắp xếp lại toàn bộ theo thời gian giảm dần
        allData.sort((a, b) => new Date(b.thoi_gian_nop) - new Date(a.thoi_gian_nop));

        const dataLopMinh = allData.filter(row => {
            if (!row.nhiem_vu_chung || !row.nhiem_vu_chung.danh_sach_lop) return false;
            let mangLopNhiemVu = [];
            try {
                mangLopNhiemVu = typeof row.nhiem_vu_chung.danh_sach_lop === 'string' 
                    ? JSON.parse(row.nhiem_vu_chung.danh_sach_lop) 
                    : row.nhiem_vu_chung.danh_sach_lop;
            } catch(e) {}
            if (!Array.isArray(mangLopNhiemVu)) mangLopNhiemVu = [mangLopNhiemVu];
            return mangLopNhiemVu.some(maLop => lopCuaToi.includes(maLop));
        });

        const top10LopMinh = dataLopMinh.slice(0, 10);
        let chuoiNoiDung = "";

        if (top10LopMinh.length === 0) {
            chuoiNoiDung = `<span style="margin-right: 50px; font-family: Arial, sans-serif; color: #fbbf24; font-weight: bold; display: inline-block;">🏆 Bảng vàng trống. Hãy là người đầu tiên trong lớp hoàn thành nhiệm vụ để ghi danh! 🚀</span>`;
        } else {
            chuoiNoiDung = top10LopMinh.map(row => {
                let thoiGianHienThi = ham_3_3_tinh_thoi_gian_truoc_day(row.thoi_gian_nop);
                let tenHS = (row.hoc_sinh && row.hoc_sinh.ten) ? row.hoc_sinh.ten : "Ẩn danh";
                let laChinhMinh = (AppState.user && AppState.user.ten && tenHS.toUpperCase() === AppState.user.ten.toUpperCase());
                let mauTen = laChinhMinh ? "#f97316" : "#ffffff";
                
                let tenNhiemVu = row.nhiem_vu_chung.ten_nhiem_vu || "(Chưa đặt tên)";
                let mangLop = [];
                try {
                    mangLop = typeof row.nhiem_vu_chung.danh_sach_lop === 'string' ? JSON.parse(row.nhiem_vu_chung.danh_sach_lop) : row.nhiem_vu_chung.danh_sach_lop;
                } catch(e){}
                if (!Array.isArray(mangLop)) mangLop = [mangLop];
                let mangTenLop = mangLop.map(ma => tuDienLop[ma] || ma);

                return `<span style="margin-right: 50px; font-family: Arial, sans-serif; display: inline-block;"><i style="color: #ffd700;">🔥</i> Bạn <b style="color: ${mauTen};">${tenHS}</b> (<span style="color: #a78bfa;">${mangTenLop.join(", ")}</span>) vừa nộp <b>${tenNhiemVu}</b><span style="color: #0f172a; margin-left: 4px; background: #cbd5e1; padding: 1px 3px; border-radius: 2px;">⏱️ ${thoiGianHienThi}</span></span>`;
            }).join("");
        }

        ham_8_1_4_ve_khung_html_thanh_chay_hs(chuoiNoiDung);

    } catch (error) {
        console.warn("⚠️ [Thanh chạy Lớp mình bị gián đoạn]:", error.message);
    }
}

// =====================================================================
// Hàm 8.1.2: Chạy nhắc nhở nhiệm vụ chưa làm ở ĐÁY màn hình
// =====================================================================
async function ham_8_1_2_ve_thanh_chay_nhiem_vu_chua_lam() {
    if (typeof SUPABASE_URL === 'undefined' || !SUPABASE_URL.startsWith('http')) return;

    const dsLop = GocHocSinhState.danh_sach_ma_lop || [];
    const uid = GocHocSinhState.uid;
    if (!uid || dsLop.length === 0) return;

    try {
        const headersAPI = { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` };
        const bangList = ['trac_nghiem', 'tu_luan', 'doc_bai', 'khao_sat'];
        
        let setNhiemVuDaLam = new Set();
        let allNhiemVuMo = [];

        // 🌟 MỚI: Quét 4 bảng
        for (let loai of bangList) {
            try {
                const resDaLam = await fetch(`${SUPABASE_URL}/rest/v1/ket_qua_${loai}?uid_hoc_sinh=eq.${uid}&select=ma_nhiem_vu`, { headers: headersAPI });
                if (resDaLam.ok) {
                    const dataDaLam = await resDaLam.json();
                    dataDaLam.forEach(x => setNhiemVuDaLam.add(x.ma_nhiem_vu));
                }
            } catch(e) {}

            try {
                const resNV = await fetch(`${SUPABASE_URL}/rest/v1/nhiem_vu_${loai}?select=ma_nhiem_vu,ten_nhiem_vu,danh_sach_lop,thoi_gian_mo&trang_thai=eq.1`, { headers: headersAPI });
                if (resNV.ok) {
                    const dataNV = await resNV.json();
                    allNhiemVuMo = allNhiemVuMo.concat(dataNV);
                }
            } catch(e) {}
        }

        allNhiemVuMo.sort((a, b) => new Date(b.thoi_gian_mo || 0) - new Date(a.thoi_gian_mo || 0));

        const danhSachChuaLam = allNhiemVuMo.filter(nv => {
            if (setNhiemVuDaLam.has(nv.ma_nhiem_vu)) return false;
            let mangLopNV = [];
            try {
                mangLopNV = typeof nv.danh_sach_lop === 'string' ? JSON.parse(nv.danh_sach_lop) : (nv.danh_sach_lop || []);
            } catch(e) {}
            if (!Array.isArray(mangLopNV)) mangLopNV = [mangLopNV];
            return mangLopNV.some(maLop => dsLop.includes(maLop));
        }).slice(0, 10);

        let chuoiNoiDung = "";

        if (danhSachChuaLam.length === 0) {
            chuoiNoiDung = `<span style="margin-right: 50px; font-family: Arial, sans-serif; color: #4ade80; font-weight: bold; display: inline-block;">🎉 HOÀN THÀNH XUẤT SẮC! Bạn đã làm hết toàn bộ nhiệm vụ được giao. Hãy vào mục Tự Luyện để tích lũy thêm Kim Cương nhé! 💎</span>`;
        } else {
            chuoiNoiDung = `<span style="margin-right: 30px; font-family: Arial, sans-serif; color: #f87171; font-weight: bold; display: inline-block; background: #450a0a; padding: 0 5px; border-radius: 2px;">⚠️ CÒN ${danhSachChuaLam.length} NHIỆM VỤ CHƯA LÀM: </span>`;
            chuoiNoiDung += danhSachChuaLam.map(nv => {
                let thoiGianGiao = ham_3_3_tinh_thoi_gian_truoc_day(nv.thoi_gian_mo);
                return `<span style="margin-right: 50px; font-family: Arial, sans-serif; display: inline-block;">🎯 <b style="color: #60a5fa;">${nv.ten_nhiem_vu}</b> <span style="color: #94a3b8; margin-left: 4px;">(${thoiGianGiao})</span></span>`;
            }).join("");
        }

        ham_8_1_5_ve_khung_html_thanh_chay_nhiem_vu(chuoiNoiDung);

    } catch (error) {
        console.warn("⚠️ [Thanh chạy Nhắc việc]:", error.message);
    }
}




//// =====================================================================
//// [Nhãn thời gian: 19:45 - Ngày 10/06/2026] - Hàm 8.1.3: Quét và hiển thị Thông báo từ GV (Màn hình HS)
//// =====================================================================
//// =====================================================================
//// Hàm 8.1.3: Quét và hiển thị Thông báo (Kiểm tra lịch hẹn giờ)
//// =====================================================================
async function ham_8_1_3_ve_thanh_thong_bao_tu_gv() {
    if (typeof SUPABASE_URL === 'undefined' || !SUPABASE_URL.startsWith('http')) return;
    const dsLopCuaToi = GocHocSinhState.danh_sach_ma_lop || [];

    try {
        const headersAPI = { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` };
        // Lấy tất cả thông báo trạng thái 1
        const res = await fetch(`${SUPABASE_URL}/rest/v1/thong_bao?select=*&trang_thai=eq.1&order=thoi_gian_tao.desc`, { headers: headersAPI });
        const dataThongBao = await res.json();

        if (!dataThongBao || dataThongBao.length === 0) return;

        const currentTime = new Date(); // Thời gian hiện tại lúc học sinh xem

        // BỘ LỌC ĐA TẦNG: Lớp + Thời Gian
        const cacThongBaoHopLe = dataThongBao.filter(tb => {
            // 1. Kiểm tra hẹn giờ MỞ (Nếu thời gian hiện tại < thời gian mở -> Giấu)
            if (tb.thoi_gian_mo) {
                const tgMo = new Date(tb.thoi_gian_mo);
                if (currentTime < tgMo) return false;
            }
            // 2. Kiểm tra hẹn giờ TẮT (Nếu thời gian hiện tại > thời gian tắt -> Giấu)
            if (tb.thoi_gian_tat) {
                const tgTat = new Date(tb.thoi_gian_tat);
                if (currentTime > tgTat) return false;
            }

            // 3. Kiểm tra Lớp (Chung hay Riêng)
            if (tb.kieu_gui === 'CHUNG') return true;
            if (tb.kieu_gui === 'RIENG' && Array.isArray(tb.danh_sach_lop)) {
                return tb.danh_sach_lop.some(maLop => dsLopCuaToi.includes(maLop));
            }
            return false;
        });

        if (cacThongBaoHopLe.length === 0) {
            // Nếu không có tb nào hợp lệ thì xóa khung (phòng khi tb vừa hết hạn)
            if (document.getElementById('thanh-thong-bao-gv')) {
                document.getElementById('thanh-thong-bao-gv').remove();
                document.body.style.paddingTop = '0px';
            }
            return;
        }

        let chuoiHienThi = cacThongBaoHopLe.map(tb => {
            let tag = tb.kieu_gui === 'CHUNG' ? 'THÔNG BÁO CHUNG' : 'THÔNG BÁO LỚP';
            let colorTag = tb.kieu_gui === 'CHUNG' ? '#ef4444' : '#3b82f6';

            // Format thời gian gốc (thoi_gian_tao) hoặc (thoi_gian_mo) để hiển thị
            let timeToFormat = tb.thoi_gian_mo ? tb.thoi_gian_mo : tb.thoi_gian_tao;
            let d = new Date(timeToFormat);
            let gio = d.getHours().toString().padStart(2, '0');
            let phut = d.getMinutes().toString().padStart(2, '0');
            let ngay = d.getDate().toString().padStart(2, '0');
            let thang = (d.getMonth() + 1).toString().padStart(2, '0');
            let thoiGianPhat = `${gio}:${phut} ngày ${ngay}/${thang}`;

            return `
                <span style="margin-right: 80px; font-family: Arial, sans-serif; display: inline-block;">
                    📢 <span style="background: ${colorTag}; color: white; padding: 1px 4px; border-radius: 3px; font-weight: bold; margin-right: 5px;">${tag}</span> 
                    <span style="font-weight: bold; color: #facc15;">${tb.noi_dung}</span>
                    <span style="color: #cbd5e1; font-weight: normal; font-style: italic; margin-left: 6px;">(${thoiGianPhat})</span>
                </span>
            `;
        }).join("");

        ham_8_1_6_ve_khung_html_thanh_thong_bao_top(chuoiHienThi);

    } catch (error) {
        console.warn("⚠️ [Thanh thông báo GV bị gián đoạn]:", error.message);
    }
}



//// =====================================================================
//// [Nhãn thời gian: 17:15 - Ngày 10/06/2026] - Hàm phụ trợ: Vẽ khung chứa điểm học sinh (Giờ đã dời xuống ĐÁY, nằm TRÊN thanh đòi nợ)
//// =====================================================================
function ham_8_1_4_ve_khung_html_thanh_chay_hs(chuoiHienThi) {
    if (document.getElementById('thanh-chay-nop-bai-hs')) {
        document.getElementById('thanh-chay-nop-bai-hs').remove();
    }

    // Xóa padding ở trên đỉnh vì đã dời thanh này xuống đáy
    document.body.style.paddingTop = '16px';
    // Mở rộng padding đáy lên 30px để lấy chỗ chứa cả 2 thanh (15px + 15px)
    document.body.style.paddingBottom = '30px';

    const tickerWrap = document.createElement('div');
    tickerWrap.id = 'thanh-chay-nop-bai-hs';
    tickerWrap.innerHTML = `
        <style>
            #thanh-chay-nop-bai-hs { 
                position: fixed; 
                bottom: 15px; /* 🌟 ĐẶT CÁCH ĐÁY 15PX ĐỂ NHƯỜNG CHỖ CHO THANH ĐÒI NỢ */
                left: 0; width: 100%; 
                background-color: #1e1e2f; color: #e2e8f0; 
                padding: 1px 0; 
                z-index: 9999; overflow: hidden; 
                border-top: 1px solid #8b5cf6; /* Sửa lại thành viền trên cho đẹp */
                line-height: 11px;
                height: 12px;
            }
            .ticker-move-hs { display: inline-block; white-space: nowrap; padding-left: 100%; }
            .ticker-move-hs:hover { animation-play-state: paused; cursor: pointer; }
            @keyframes ticker-anim-hs { 0% { transform: translate3d(0, 0, 0); } 100% { transform: translate3d(-100%, 0, 0); } }
            
            #thanh-chay-nop-bai-hs *, 
            #thanh-chay-nop-bai-hs span, 
            #thanh-chay-nop-bai-hs b { 
                font-size: 10px !important; 
            }
        </style>
        <div class="ticker-move-hs" id="noi-dung-thanh-chay-hs">${chuoiHienThi}</div>
    `;
    document.body.appendChild(tickerWrap);

    setTimeout(() => {
        const textElement = document.getElementById('noi-dung-thanh-chay-hs');
        if (textElement) {
            const distance = window.innerWidth + textElement.scrollWidth;
            const duration = distance / 100;
            textElement.style.animation = `ticker-anim-hs ${duration}s linear infinite`;
        }
    }, 100);
}

//// =====================================================================
//// [Nhãn thời gian: 17:15 - Ngày 10/06/2026] - Hàm phụ trợ: Vẽ khung nhắc việc chưa làm (Nằm SÁT ĐÁY)
//// =====================================================================
function ham_8_1_5_ve_khung_html_thanh_chay_nhiem_vu(chuoiHienThi) {
    if (document.getElementById('thanh-chay-nhiem-vu-hs')) {
        document.getElementById('thanh-chay-nhiem-vu-hs').remove();
    }

    // Đảm bảo body đủ chỗ chứa (phòng hờ hàm này chạy sau)
    document.body.style.paddingBottom = '30px';

    const tickerWrap = document.createElement('div');
    tickerWrap.id = 'thanh-chay-nhiem-vu-hs';
    tickerWrap.innerHTML = `
        <style>
            #thanh-chay-nhiem-vu-hs { 
                position: fixed; 
                bottom: 0; /* 🌟 THANH NÀY NẰM SÁT SÀN NHÀ */
                left: 0; width: 100%; 
                background-color: #0f172a; color: #e2e8f0; 
                padding: 1px 0; 
                z-index: 9999; overflow: hidden; box-shadow: 0 -1px 5px rgba(0,0,0,0.4); 
                border-top: 1px solid #ef4444;
                line-height: 11px;
                height: 12px;
            }
            .ticker-move-nv { display: inline-block; white-space: nowrap; padding-left: 100%; }
            .ticker-move-nv:hover { animation-play-state: paused; cursor: pointer; }
            @keyframes ticker-anim-nv { 0% { transform: translate3d(0, 0, 0); } 100% { transform: translate3d(-100%, 0, 0); } }
            
            #thanh-chay-nhiem-vu-hs *, 
            #thanh-chay-nhiem-vu-hs span, 
            #thanh-chay-nhiem-vu-hs b { 
                font-size: 10px !important; 
            }
        </style>
        <div class="ticker-move-nv" id="noi-dung-thanh-chay-nv">${chuoiHienThi}</div>
    `;
    document.body.appendChild(tickerWrap);

    setTimeout(() => {
        const textElement = document.getElementById('noi-dung-thanh-chay-nv');
        if (textElement) {
            const distance = window.innerWidth + textElement.scrollWidth;
            const duration = distance / 100;
            textElement.style.animation = `ticker-anim-nv ${duration}s linear infinite`;
        }
    }, 100);
}




//// =====================================================================
//// Hàm phụ trợ: Vẽ thanh Thông Báo trên ĐỈNH (TOP: 0) - Ép siêu nhỏ vừa khít Font 12px
//// =====================================================================
function ham_8_1_6_ve_khung_html_thanh_thong_bao_top(chuoiHienThi) {
    if (document.getElementById('thanh-thong-bao-gv')) {
        document.getElementById('thanh-thong-bao-gv').remove();
    }

    // Tiết kiệm không gian: Chỉ đẩy lề trang web xuống 18px (vừa đủ chỗ cho thanh 16px + viền)
    document.body.style.paddingTop = '28px';

    const tickerWrap = document.createElement('div');
    tickerWrap.id = 'thanh-thong-bao-gv';
    tickerWrap.innerHTML = `
        <style>
            #thanh-thong-bao-gv { 
                position: fixed; top: 0; left: 0; width: 100%; 
                background-color: #1e293b; color: #ffffff; 
                padding: 1px 0; /* Thu hẹp padding dọc tối đa */
                z-index: 9999; overflow: hidden; box-shadow: 0 2px 5px rgba(0,0,0,0.5); 
                border-bottom: 1px solid #facc15; 
                line-height: 15px; /* Ép dòng sát với font 12 */
                height: 16px; /* Tổng chiều cao siêu nhỏ */
            }
            .ticker-move-tb { display: inline-block; white-space: nowrap; padding-left: 100%; }
            .ticker-move-tb:hover { animation-play-state: paused; cursor: pointer; }
            @keyframes ticker-anim-tb { 0% { transform: translate3d(0, 0, 0); } 100% { transform: translate3d(-100%, 0, 0); } }
            
            /* Ép cứng font 12px cho toàn bộ chữ trên thanh thông báo */
            #thanh-thong-bao-gv *, 
            #thanh-thong-bao-gv span { 
                font-size: 12px !important; 
            }
        </style>
        <div class="ticker-move-tb" id="noi-dung-thanh-thong-bao">${chuoiHienThi}</div>
    `;
    document.body.appendChild(tickerWrap);

    // Thuật toán tính tốc độ chạy
    setTimeout(() => {
        const textElement = document.getElementById('noi-dung-thanh-thong-bao');
        if (textElement) {
            const distance = window.innerWidth + textElement.scrollWidth;
            const duration = distance / 90; // Vận tốc 90px/s
            textElement.style.animation = `ticker-anim-tb ${duration}s linear infinite`;
        }
    }, 100);
}



// =====================================================================
// Hàm 8.2b: Load Nhiệm vụ TỰ LUẬN
// =====================================================================
window.ham_8_2b_tab_nhiem_vu_tu_luan = async function() {
    const vungLamViec = document.getElementById('vung-lam-viec-hoc-sinh');
    vungLamViec.innerHTML = `<div style="text-align: center; padding: 40px;"><h3 style="color:#6f42c1;">⏳ Đang tải phân hệ Tự Luận...</h3></div>`;

    try {
        let dsLop = GocHocSinhState.danh_sach_ma_lop || [];
        if (dsLop.length === 0) dsLop = ["#KHONG_CO_LOP#"];

        const orQuery = dsLop.map(ma => `danh_sach_lop.cs."${JSON.stringify([ma]).replace(/"/g, '\\"')}"`).join(',');

        // 1. Tải từ bảng nhiệm vụ tự luận
        const { data: dsNV } = await _supabase
            .from('nhiem_vu_tu_luan')
            .select('*')
            .eq('trang_thai', 1)
            .or(orQuery)
            .order('ngay_tao', { ascending: false });

        GocHocSinhState.danhSachNhiemVu = dsNV || [];

        // 2. Tải từ bảng kết quả tự luận
        let ketQuaGanNhat = {};
        const { data: dsKQ } = await _supabase
            .from('ket_qua_tu_luan')
            .select('id, ma_nhiem_vu, tong_diem, nhan_xet_gv, trang_thai_cham')
            .eq('uid_hoc_sinh', GocHocSinhState.uid);

        if (dsKQ) {
                dsKQ.forEach(kq => {
                    ketQuaGanNhat[kq.ma_nhiem_vu] = { id: kq.id, diem: kq.tong_diem, thoi_gian_nop: kq.thoi_gian_nop, nhan_xet_gv: kq.nhan_xet_gv, trang_thai_cham: kq.trang_thai_cham };
                });
            }
    } catch (error) {
        vungLamViec.innerHTML = `<div style="color: red; text-align: center;">❌ Lỗi: ${error.message}</div>`;
    }
};


// =====================================================================
// Hàm 8.2c: Load Nhiệm vụ ĐỌC BÀI
// =====================================================================
window.ham_8_2c_tab_nhiem_vu_doc_bai = async function() {
    const vungLamViec = document.getElementById('vung-lam-viec-hoc-sinh');
    vungLamViec.innerHTML = `<div style="text-align: center; padding: 40px;"><h3 style="color:#28a745;">📺 Đang tải phân hệ Đọc bài...</h3></div>`;

    try {
        let dsLop = GocHocSinhState.danh_sach_ma_lop || [];
        if (dsLop.length === 0) dsLop = ["#KHONG_CO_LOP#"];

        const orQuery = dsLop.map(ma => `danh_sach_lop.cs."${JSON.stringify([ma]).replace(/"/g, '\\"')}"`).join(',');

        // 1. Tải nhiệm vụ Đọc bài
        const { data: dsNV } = await _supabase
            .from('nhiem_vu_doc_bai')
            .select('*')
            .eq('trang_thai', 1)
            .or(orQuery)
            .order('ngay_tao', { ascending: false });

        GocHocSinhState.danhSachNhiemVu = dsNV || [];

        // 2. Tải kết quả Đọc bài
        let ketQuaGanNhat = {};
        const { data: dsKQ } = await _supabase
            .from('ket_qua_doc_bai')
            .select('id, ma_nhiem_vu, tong_diem')
            .eq('uid_hoc_sinh', GocHocSinhState.uid);

        if (dsKQ) {
            dsKQ.forEach(kq => ketQuaGanNhat[kq.ma_nhiem_vu] = kq);
        }

        // ... [Giữ nguyên logic renderCard như các hàm trước]
        // Nút 'VÀO XEM BÀI GIẢNG' sẽ gọi: 
        // ham_8_24_router_vao_lam_bai(nv.ma_nhiem_vu, 'DOC_BAI')
    } catch (error) {
        vungLamViec.innerHTML = `<div style="color: red; text-align: center;">❌ Lỗi: ${error.message}</div>`;
    }
};




// =====================================================================
// Hàm 8.2d: Load Nhiệm vụ KHẢO SÁT
// =====================================================================
window.ham_8_2d_tab_nhiem_vu_khao_sat = async function() {
    const vungLamViec = document.getElementById('vung-lam-viec-hoc-sinh');
    vungLamViec.innerHTML = `<div style="text-align: center; padding: 40px;"><h3 style="color:#fd7e14;">📊 Đang tải phân hệ Khảo sát...</h3></div>`;

    try {
        let dsLop = GocHocSinhState.danh_sach_ma_lop || [];
        if (dsLop.length === 0) dsLop = ["#KHONG_CO_LOP#"];

        const orQuery = dsLop.map(ma => `danh_sach_lop.cs."${JSON.stringify([ma]).replace(/"/g, '\\"')}"`).join(',');

        // 1. Tải nhiệm vụ Khảo sát
        const { data: dsNV } = await _supabase
            .from('nhiem_vu_khao_sat')
            .select('*')
            .eq('trang_thai', 1)
            .or(orQuery)
            .order('ngay_tao', { ascending: false });

        GocHocSinhState.danhSachNhiemVu = dsNV || [];

        // 2. Tải kết quả Khảo sát
        let ketQuaGanNhat = {};
        const { data: dsKQ } = await _supabase
            .from('ket_qua_khao_sat')
            .select('id, ma_nhiem_vu, tong_diem')
            .eq('uid_hoc_sinh', GocHocSinhState.uid);

        if (dsKQ) {
            dsKQ.forEach(kq => ketQuaGanNhat[kq.ma_nhiem_vu] = kq);
        }

        // Logic render tương tự như các tab khác, nút bấm sẽ gọi:
        // ham_8_24_router_vao_lam_bai(nv.ma_nhiem_vu, 'KHAO_SAT')
    } catch (error) {
        vungLamViec.innerHTML = `<div style="color: red; text-align: center;">❌ Lỗi: ${error.message}</div>`;
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
            .from('ket_qua_trac_nghiem')
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
                        <button onclick="ham_8_13_xem_lai_ket_qua_trac_nghiem('${kq.ma_nhiem_vu}', '${kq.id}')" 
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
                        <button onclick="ham_8_18_dang_xuat()" style="flex: 1; padding: 14px; background: #fff; color: #dc3545; border: 2px solid #dc3545; border-radius: 6px; font-weight: bold; font-size: 15px; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#dc3545'; this.style.color='white'" onmouseout="this.style.background='#fff'; this.style.color='#dc3545'">
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





// =====================================================================
// Hàm Bổ trợ Đăng xuất
// =====================================================================
window.ham_8_18_dang_xuat = function () {
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
// KHỞI TẠO BIẾN SÓNG REALTIME CHO HỌC SINH
// =====================================================================
window.HocSinhLiveChannel = null;
window.ThongTinLiveHocSinh = { maPhong: '', maNhiemVu: '' };








// =====================================================================
// Hàm bổ trợ: Chuyển đổi trạng thái Tab nội bộ (Giữ bộ số đếm động)
// =====================================================================
window.ham_8_23_switch_sub_tab = function (loaiTab) {
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
        window.ham_8_16_loc_card_theo_lop_trac_nghiem(lopHienTai, nutActive, true);
    }
};







// =====================================================================
// Bộ Điều Hướng: Xử lý click vào làm bài theo đúng loại nhiệm vụ
// =====================================================================
window.ham_8_24_router_vao_lam_bai = function(maNhiemVu, loai) {
    const nv = GocHocSinhState.danhSachNhiemVu.find(x => x.ma_nhiem_vu === maNhiemVu);
    if (!nv) return alert("Lỗi: Không tìm thấy dữ liệu nhiệm vụ!");
    
    if (loai === 'TRAC_NGHIEM') {
        if (typeof ham_8_7_cua_an_ninh === 'function') ham_8_7_cua_an_ninh(maNhiemVu);
    } else if (loai === 'TU_LUAN') {
        if (typeof ham_16_1_mo_phong_thi_tu_luan === 'function') {
            ham_16_1_mo_phong_thi_tu_luan(nv, GocHocSinhState.uid);
        } else {
            alert("⚠️ Phân hệ Tự luận (Khối 16) chưa được nạp vào hệ thống!");
        }
    } else if (loai === 'DOC_BAI') {
        alert("Phân hệ Đọc bài/Xem Video đang được phát triển.");
    } else if (loai === 'KHAO_SAT') {
        alert("Phân hệ Khảo sát đang được phát triển.");
    }
};


window.ham_8_24b_vao_lam_bai_tu_luan = function(maNhiemVu) {
    const nv = GocHocSinhState.danhSachNhiemVu.find(x => x.ma_nhiem_vu === maNhiemVu);
    if (nv && typeof ham_16_1_mo_phong_thi_tu_luan === 'function') {
        ham_16_1_mo_phong_thi_tu_luan(nv, GocHocSinhState.uid);
    } else {
        alert("⚠️ Phân hệ Tự luận (Khối 16) chưa sẵn sàng!");
    }
};

window.ham_8_24c_vao_lam_bai_doc_bai = function(maNhiemVu) {
    // Thầy điền hàm gọi giao diện Đọc bài vào đây
    alert("Đang chuyển sang giao diện Đọc bài...");
};

window.ham_8_24d_vao_lam_bai_khao_sat = function(maNhiemVu) {
    // Thầy điền hàm gọi giao diện Khảo sát vào đây
    alert("Đang chuyển sang giao diện Khảo sát...");
};






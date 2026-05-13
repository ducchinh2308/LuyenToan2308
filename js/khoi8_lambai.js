// ==============================================================
// KHỐI 0: ĐÁNH DẤU PHIÊN BẢN (VERSION CONTROL)
// ==============================================================
const KHOI8_VERSION = "Khối 8: Cập nhật lúc 10h25 - Ngày 13/05";
console.log(`%c🚀 ĐANG CHẠY: ${KHOI8_VERSION}`, "background: #28a745; color: white; font-size: 14px; padding: 5px; font-weight: bold;");

window.addEventListener('load', () => {
    let versionBadge = document.createElement('div');
    versionBadge.innerHTML = KHOI8_VERSION;
    versionBadge.style.cssText = "position: fixed; bottom: 20px; right: 5px; font-size: 9px; color: #28a745; z-index: 9999; ";
    document.body.appendChild(versionBadge);
});

// ==============================================================
// KHỐI 8: GIAO DIỆN HỌC SINH (STUDENT PORTAL)
// ==============================================================

// Biến toàn cục lưu trữ dữ liệu của Học sinh
const GocHocSinhState = {
    uid: null,
    ma_lop: null,
    ten: null,
    danhSachNhiemVu: []
};

// ==============================================================
// Hàm 8.1: Dựng Bộ Khung Giao Diện (ĐÃ NÂNG CẤP HIỂN THỊ TÊN LỚP)
// ==============================================================
async function ham_8_1_tai_nhiem_vu_cua_toi(uidHocSinh, dsMaLopHocSinh, tenHocSinh) {
    // 1. Lưu vào State
    GocHocSinhState.uid = uidHocSinh;
    GocHocSinhState.danh_sach_ma_lop = dsMaLopHocSinh || [];
    GocHocSinhState.ten = tenHocSinh;

    const renderArea = document.getElementById('dashboard-container');
    if (!renderArea) return alert("Lỗi: Không tìm thấy khung hiển thị!");

    // 2. Hiện trạng thái chờ (Vì cần 1 chút thời gian để tra cứu tên lớp)
    renderArea.innerHTML = `<div style="text-align:center; padding: 50px; color: #1a73e8; font-weight:bold;">⏳ Đang thiết lập không gian học tập...</div>`;

    // 🌟 3. TRA CỨU TÊN LỚP TỪ DATABASE
    let chuoiHienThiLop = "Chưa cập nhật lớp";

    if (GocHocSinhState.danh_sach_ma_lop.length > 0) {
        try {
            // Lấy cột 'ten_lop' của những lớp nằm trong danh sách mã lớp
            const { data: dsLop, error } = await _supabase
                .from('lop_hoc')
                .select('ten_lop')
                .in('ma_lop', GocHocSinhState.danh_sach_ma_lop);

            if (!error && dsLop && dsLop.length > 0) {
                // Rút trích mảng tên lớp và ghép lại bằng dấu phẩy
                chuoiHienThiLop = dsLop.map(l => l.ten_lop).join(', ');
            } else {
                // Nếu không tìm thấy tên, tạm hiện Mã lớp
                chuoiHienThiLop = GocHocSinhState.danh_sach_ma_lop.join(', ');
            }
        } catch (err) {
            // Dự phòng lỗi mạng
            chuoiHienThiLop = GocHocSinhState.danh_sach_ma_lop.join(', ');
        }
    }

    // 4. RÁP GIAO DIỆN CHÍNH
    renderArea.innerHTML = `
        <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); max-width: 1200px; margin: 0 auto;">
            
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e9ecef; padding-bottom: 10px; margin-bottom: 20px; flex-wrap: wrap; gap: 10px;">
                <h2 style="color: #1a73e8; margin: 0; font-size: 20px;">🎓 GÓC HỌC TẬP</h2>
                <div style="font-weight: bold; color: #495057; font-size: 14px;">
                    Chào em, <span style="color:#d35400;">${tenHocSinh}</span> (Lớp: <span style="color:#1a73e8;">${chuoiHienThiLop}</span>)
                </div>
            </div>
            
            <div style="display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; margin-bottom: 20px;">
                <button onclick="ham_8_2_tab_nhiem_vu_bat_buoc()" style="flex: 1; min-width: 140px; padding: 12px; background: #28a745; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: bold; box-shadow: 0 2px 4px rgba(40,167,69,0.3);">🚀 NHIỆM VỤ LỚP</button>
                <button onclick="ham_8_3_tab_luyen_tap_tu_do()" style="flex: 1; min-width: 140px; padding: 12px; background: #17a2b8; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: bold; box-shadow: 0 2px 4px rgba(23,162,184,0.3);">🌍 TỰ LUYỆN</button>
                <button onclick="ham_8_4_tab_ket_qua()" style="flex: 1; min-width: 140px; padding: 12px; background: #6f42c1; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: bold; box-shadow: 0 2px 4px rgba(111,66,193,0.3);">📊 KẾT QUẢ</button>
                <button onclick="ham_8_5_tab_ho_so()" style="flex: 1; min-width: 140px; padding: 12px; background: #6c757d; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: bold; box-shadow: 0 2px 4px rgba(108,117,125,0.3);">👤 HỒ SƠ</button>
                <button onclick="ham_8_6_tab_dau_truong_live()" style="flex: 1; min-width: 140px; padding: 12px; background: #dc3545; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: bold; box-shadow: 0 2px 4px rgba(220,53,69,0.3);">⚔️ LIVE QUIZ</button>
            </div>
            
            <div id="vung-lam-viec-hoc-sinh" style="padding: 15px; background: #f8f9fa; border-radius: 8px; border: 1px dashed #ccc; min-height: 300px;"></div>
        </div>
    `;

    // 5. Mặc định mở Tab Nhiệm vụ khi vừa tải xong khung
    ham_8_2_tab_nhiem_vu_bat_buoc();
}

// ==============================================================
// Hàm 8.2: Xử lý Tab "Nhiệm Vụ Trên Lớp" (NÂNG CẤP ĐA LỚP & CHI TIẾT NHIỆM VỤ)
// ==============================================================
async function ham_8_2_tab_nhiem_vu_bat_buoc() {
    const vungLamViec = document.getElementById('vung-lam-viec-hoc-sinh');
    vungLamViec.innerHTML = `<div style="text-align: center; padding: 40px;"><h3 style="color:#28a745;">⏳ Đang tổng hợp bài tập từ các lớp...</h3></div>`;

    try {
        // ==========================================
        // ĐOẠN CODE SIÊU DEBUG - SOI TẬN GỐC DỮ LIỆU
        // ==========================================

        // 1. TẠO CHUỖI TRUY VẤN
        let dsLop = GocHocSinhState.danh_sach_ma_lop || [];
        if (dsLop.length === 0) dsLop = ["#KHONG_CO_LOP#"];

        const orQuery = dsLop.map(ma => {
            const giaTriJson = JSON.stringify([ma]);
            const giaTriSafe = giaTriJson.replace(/"/g, '\\"');
            return `danh_sach_lop.cs."${giaTriSafe}"`;
        }).join(',');

        //console.log("🔍 [DEBUG 1] Danh sách lớp của HS:", dsLop);
        //console.log("🔍 [DEBUG 2] Chuỗi .or() gửi lên DB:", orQuery);

        try {
            // ==========================================
            // 🌟 TEST 1: BỐC THỬ 2 BÀI BẤT KỲ ĐỂ SOI DỮ LIỆU GỐC
            // ==========================================
            //console.log("🔍 [DEBUG 3] Đang soi dữ liệu gốc trong bảng nhiem_vu...");
            const { data: testDB } = await _supabase
                .from('nhiem_vu')
                .select('ma_nhiem_vu, danh_sach_lop')
                .limit(2);

            if (testDB && testDB.length > 0) {
                testDB.forEach((nv, index) => {
                    //console.log(`\n--- BÀI TEST SỐ ${index + 1} (Mã: ${nv.ma_nhiem_vu}) ---`);
                    //console.log(`Dữ liệu thực tế:`, nv.danh_sach_lop);
                    //console.log(`Kiểu dữ liệu (typeof):`, typeof nv.danh_sach_lop);

                    //if (typeof nv.danh_sach_lop === 'string') {
                    //    console.error(`🚨 PHÁT HIỆN LỖI: DB đang hiểu đây là CHUỖI (String). Lệnh .cs (contains) sẽ TỪ CHỐI TÌM KIẾM dòng này!`);
                    //} else if (Array.isArray(nv.danh_sach_lop)) {
                    //    console.log(`✅ Cấu trúc chuẩn: Mảng JSON.`);
                    //}
                });
                console.log("------------------------------------------\n");
            }

            // ==========================================
            // 🌟 TEST 2: GỌI LỆNH TRUY VẤN NHƯ CŨ
            // ==========================================
            console.log("🔍 [DEBUG 4] Bắt đầu gọi truy vấn .or()...");
            const { data: dsNV, error: errNV } = await _supabase
                .from('nhiem_vu')
                .select('*')
                .eq('trang_thai', 1)
                .or(orQuery)
                .order('ngay_tao', { ascending: false });

            if (errNV) throw errNV;

            GocHocSinhState.danhSachNhiemVu = dsNV || [];
            //console.log(`📦 [DEBUG 5] Kết quả: Đã tìm thấy ${GocHocSinhState.danhSachNhiemVu.length} nhiệm vụ.`);

        } catch (error) {
            //console.error("❌ LỖI TRUY VẤN:", error);
        }

        // 3. XÂY DỰNG TỪ ĐIỂN TRA CỨU TÊN LỚP & GIÁO VIÊN
        let tuDienLop = {};
        let tuDienGv = {};
        let tapUidGv = new Set();

        // 3.1. Lấy Tên lớp và UID Giáo viên tạo lớp
        const { data: dataLop } = await _supabase.from('lop_hoc').select('ma_lop, ten_lop, uid_gv_tao').in('ma_lop', dsLop);
        if (dataLop) {
            dataLop.forEach(l => {
                tuDienLop[l.ma_lop] = l.ten_lop;
                if (l.uid_gv_tao) tapUidGv.add(l.uid_gv_tao);
            });
        }

        // 3.2. Gom thêm UID giáo viên tạo nhiệm vụ (nếu có)
        GocHocSinhState.danhSachNhiemVu.forEach(nv => {
            if (nv.uid_gv_tao) tapUidGv.add(nv.uid_gv_tao);
        });

        // 3.3. Truy vấn lấy Tên giáo viên
        if (tapUidGv.size > 0) {
            const { data: dataGv } = await _supabase.from('hoc_sinh').select('uid, ten').in('uid', Array.from(tapUidGv));
            if (dataGv) {
                dataGv.forEach(gv => tuDienGv[gv.uid] = gv.ten);
            }
        }

        // 4. PHÂN LOẠI NHIỆM VỤ
        const now = new Date();
        let dsChuaMo = [], dsDangMo = [], dsDaDong = [];

        const anToanThoiGian = (chuoiThoiGian) => chuoiThoiGian ? new Date(chuoiThoiGian) : null;

        GocHocSinhState.danhSachNhiemVu.forEach(nv => {
            const tMo = anToanThoiGian(nv.thoi_gian_mo);
            const tDong = anToanThoiGian(nv.thoi_gian_dong);

            if (tMo && now.getTime() < tMo.getTime()) dsChuaMo.push(nv);
            else if (tDong && now.getTime() > tDong.getTime()) dsDaDong.push(nv);
            else dsDangMo.push(nv);
        });

        // 🌟 HÀM PHỤ 1: Đếm ngược thời gian còn lại
        const tinhThoiGian = (targetDate, isPast) => {
            if (!targetDate) return "";
            const diff = isPast ? (now.getTime() - targetDate.getTime()) : (targetDate.getTime() - now.getTime());
            if (diff <= 0) return isPast ? "Vừa xong" : "Đã hết hạn";

            const d = Math.floor(diff / (1000 * 60 * 60 * 24));
            const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const m = Math.floor((diff / (1000 * 60)) % 60);

            let str = "";
            if (d > 0) str += `${d} ngày `;
            if (h > 0) str += `${h} giờ `;
            if (m > 0 && d === 0) str += `${m} phút`;

            return isPast ? `(Mở cách đây ${str})` : `(Còn ${str})`;
        };

        // 🌟 HÀM PHỤ 2: Tính thời gian trôi qua (Cách đây bao lâu)
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

        // 🌟 HÀM PHỤ 3: VẼ GIAO DIỆN THẺ (CARD)
        const renderCard = (nv, loai) => {
            const tMo = anToanThoiGian(nv.thoi_gian_mo);
            const tDong = anToanThoiGian(nv.thoi_gian_dong);
            const tTao = nv.ngay_tao;

            const opts = { timeZone: 'Asia/Ho_Chi_Minh', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' };
            const fTime = (d) => d ? d.toLocaleString('vi-VN', opts) : "Không quy định";

            // Xử lý Cấu trúc đề & Số lượt
            const cauTrucText = nv.cau_truc_de ? (nv.cau_truc_de.length > 30 ? nv.cau_truc_de.substring(0, 30) + '...' : nv.cau_truc_de) : "Chưa có thông tin";
            const quyMoText = (nv.quy_mo_cau_hoi && nv.quy_mo_cau_hoi > 0) ? `Tổng: ${nv.quy_mo_cau_hoi} câu` : "";

            // Tra cứu Lớp học của nhiệm vụ này
            let tenLopHienThi = "Không xác định";
            try {
                const mangLopCuaNV = typeof nv.danh_sach_lop === 'string' ? JSON.parse(nv.danh_sach_lop) : (nv.danh_sach_lop || []);
                // Tìm những mã lớp trùng với danh sách lớp của học sinh, rồi lấy tên
                const cacLopKhop = mangLopCuaNV.filter(m => dsLop.includes(m)).map(m => tuDienLop[m] || m);
                if (cacLopKhop.length > 0) tenLopHienThi = cacLopKhop.join(', ');
            } catch (e) { }

            // Tra cứu Giáo viên
            const tenGV = tuDienGv[nv.uid_gv_tao] || "Thầy/Cô";

            let nutHanhDong = "", mauVien = "", mauNen = "";
            if (loai === 'DANG_MO') {
                mauVien = "#28a745"; mauNen = "#f4fdf6";
                nutHanhDong = `<button onclick="ham_8_7_cua_an_ninh('${nv.ma_nhiem_vu}')" style="width: 100%; padding: 12px; background: #28a745; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; transition: 0.2s; box-shadow: 0 2px 4px rgba(40,167,69,0.3);">🚀 VÀO LÀM BÀI</button>`;
            } else if (loai === 'CHUA_MO') {
                mauVien = "#ffc107"; mauNen = "#fffbf0";
                nutHanhDong = `<button disabled style="width: 100%; padding: 12px; background: #e9ecef; color: #6c757d; border: none; border-radius: 6px; font-weight: bold;">⏳ Đợi đến giờ mở</button>`;
            } else if (loai === 'DA_DONG') {
                mauVien = "#dc3545"; mauNen = "#fff5f6";
                nutHanhDong = `<button onclick="alert('Tính năng xem kết quả')" style="width: 100%; padding: 12px; background: #17a2b8; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">📊 XEM KẾT QUẢ / LỜI GIẢI</button>`;
            }

            return `
                <div style="background: white; border: 1px solid #e0e0e0; border-top: 4px solid ${mauVien}; border-radius: 10px; padding: 16px; margin-bottom: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.04); position: relative; overflow: hidden;">
                    
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                        <h4 style="margin: 0; color: #2c3e50; font-size: 16px; line-height: 1.4; padding-right: 10px;">${nv.ten_nhiem_vu}</h4>
                        <span style="font-size: 10px; padding: 4px 6px; background: ${mauNen}; border: 1px solid ${mauVien}40; border-radius: 4px; color: ${mauVien}; white-space: nowrap; font-weight: bold;">
                            ${nv.loai_nhiem_vu}
                        </span>
                    </div>

                    <div style="background: #f8f9fa; border-radius: 6px; padding: 10px; margin-bottom: 12px; font-size: 12px; color: #555; border: 1px dashed #ddd;">
                        <div style="margin-bottom: 4px;">🎯 <b>Môn/Lớp:</b> <span style="color: #1a73e8; font-weight:bold;">${tenLopHienThi}</span></div>
                        <div style="margin-bottom: 4px;">👤 <b>Giao bởi:</b> <span>${tenGV}</span></div>
                        <div>🕒 <b>Ngày tạo:</b> ${fTime(new Date(tTao))} <span style="color:#d35400; font-style: italic;">(${thoiGianTroiQua(tTao)})</span></div>
                    </div>

                    <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 15px;">
                        <span style="font-size: 12px; background: #e9ecef; color: #495057; padding: 4px 8px; border-radius: 4px;">
                            ⏱️ <b>${nv.thoi_gian_lam_bai > 0 ? nv.thoi_gian_lam_bai + ' phút' : 'Tự do'}</b>
                        </span>
                        <span style="font-size: 12px; background: #e9ecef; color: #495057; padding: 4px 8px; border-radius: 4px;" title="${cauTrucText}">
                            📦 <b>${quyMoText}</b>
                        </span>
                        <span style="font-size: 12px; background: #e9ecef; color: #495057; padding: 4px 8px; border-radius: 4px;">
                            🔄 Lượt: <b>0 / ${nv.so_luot_lam_bai == 0 ? "Vô hạn" : nv.so_luot_lam_bai}</b>
                        </span>
                    </div>

                    <div style="margin-bottom: 15px; font-size: 13px;">
                        <div style="margin-bottom: 5px;">
                            <span style="color: #28a745; font-weight: bold;">🟢 MỞ:</span> ${fTime(tMo)} 
                            <span style="color: #6c757d; font-size: 11px; margin-left: 5px; font-style: italic;">${tMo ? tinhThoiGian(tMo, true) : ""}</span>
                        </div>
                        <div>
                            <span style="color: #dc3545; font-weight: bold;">🔴 ĐÓNG:</span> ${fTime(tDong)}
                            <span style="color: #d35400; font-size: 12px; margin-left: 5px; font-weight: bold; background: #fff3cd; padding: 2px 4px; border-radius: 3px;">
                                ${tDong && now.getTime() < tDong.getTime() ? tinhThoiGian(tDong, false) : ""}
                            </span>
                        </div>
                    </div>

                    ${nutHanhDong}
                </div>
            `;
        };

        vungLamViec.innerHTML = `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px;">
                <div style="background: #f8fff9; padding: 15px; border-radius: 8px; border: 1px solid #c3e6cb;">
                    <h3 style="margin-top: 0; color: #28a745; text-align: center; font-size: 15px;">▶️ ĐANG MỞ (${dsDangMo.length})</h3>
                    ${dsDangMo.length === 0 ? '<p style="text-align:center; color:#999; font-size:13px;">Chưa có bài tập.</p>' : dsDangMo.map(nv => renderCard(nv, 'DANG_MO')).join('')}
                </div>
                <div style="background: #fffdf8; padding: 15px; border-radius: 8px; border: 1px solid #ffeeba;">
                    <h3 style="margin-top: 0; color: #d35400; text-align: center; font-size: 15px;">⏳ SẮP MỞ (${dsChuaMo.length})</h3>
                    ${dsChuaMo.length === 0 ? '<p style="text-align:center; color:#999; font-size:13px;">Trống.</p>' : dsChuaMo.map(nv => renderCard(nv, 'CHUA_MO')).join('')}
                </div>
                <div style="background: #fff8f8; padding: 15px; border-radius: 8px; border: 1px solid #f5c6cb;">
                    <h3 style="margin-top: 0; color: #dc3545; text-align: center; font-size: 15px;">🛑 ĐÃ ĐÓNG (${dsDaDong.length})</h3>
                    ${dsDaDong.length === 0 ? '<p style="text-align:center; color:#999; font-size:13px;">Trống.</p>' : dsDaDong.map(nv => renderCard(nv, 'DA_DONG')).join('')}
                </div>
            </div>
        `;

    } catch (error) {
        vungLamViec.innerHTML = `<div style="color: red; text-align: center;">❌ Lỗi: ${error.message}</div>`;
    }
}


// ==============================================================
// CÁC HÀM XỬ LÝ CHUYỂN TAB CÒN LẠI (Sẽ code tiếp)
// ==============================================================
// ==============================================================
// Hàm 8.3: Xử lý Tab "PHÒNG LUYỆN TẬP TỰ DO"
// ==============================================================
async function ham_8_3_tab_luyen_tap_tu_do() {
    const vungLamViec = document.getElementById('vung-lam-viec-hoc-sinh');
    vungLamViec.innerHTML = `<div style="text-align: center; padding: 40px;"><h3 style="color:#17a2b8;">⏳ Đang mở kho đề luyện tập...</h3></div>`;

    try {
        // Lấy những bài có mã lớp đặc biệt dành cho tự luyện
        const { data: dsTuDo, error } = await _supabase
            .from('nhiem_vu')
            .select('*')
            .eq('trang_thai', 1)
            .contains('danh_sach_lop', `["#LUYEN_TAP_TU_DO#"]`)
            .order('ngay_tao', { ascending: false });

        if (error) throw error;

        if (!dsTuDo || dsTuDo.length === 0) {
            vungLamViec.innerHTML = `
                <div style="text-align: center; padding: 50px; color: #666;">
                    <p style="font-size: 50px;">🍃</p>
                    <p>Kho luyện tập hiện đang trống. Thầy sẽ sớm bổ sung các đề thi hay cho các em!</p>
                </div>
            `;
            return;
        }

        // Vẽ danh sách đề luyện tập (Thiết kế dạng danh sách lướt cho nhẹ nhàng)
        let htmlList = `
            <div style="max-width: 800px; margin: 0 auto;">
                <div style="background: #e3f2fd; padding: 10px 15px; border-radius: 8px; color: #0056b3; font-size: 14px; margin-bottom: 20px; border-left: 5px solid #0056b3;">
                    ✨ <b>Góc tự học:</b> Đây là các đề thi mở tự do, không giới hạn thời gian và số lượt làm. Các em có thể luyện tập bất cứ lúc nào để nâng cao kỹ năng!
                </div>
        `;

        dsTuDo.forEach(nv => {
            htmlList += `
                <div style="background: white; border: 1px solid #dee2e6; border-radius: 10px; padding: 15px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 4px rgba(0,0,0,0.03);">
                    <div style="flex: 1; padding-right: 15px;">
                        <h4 style="margin: 0 0 8px 0; color: #2c3e50; font-size: 15px;">${nv.ten_nhiem_vu}</h4>
                        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                            <span style="font-size: 11px; color: #666;">⏱️ ${nv.thoi_gian_lam_bai || 0} phút</span>
                            <span style="font-size: 11px; color: #666;">📦 ${nv.quy_mo_cau_hoi || 0} câu</span>
                            <span style="font-size: 11px; color: #17a2b8; font-weight: bold;">🌍 Tự do</span>
                        </div>
                    </div>
                    <button onclick="ham_8_7_cua_an_ninh('${nv.ma_nhiem_vu}')" 
                            style="padding: 10px 20px; background: #17a2b8; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; white-space: nowrap;">
                        LUYỆN TẬP
                    </button>
                </div>
            `;
        });

        htmlList += `</div>`;
        vungLamViec.innerHTML = htmlList;

    } catch (error) {
        vungLamViec.innerHTML = `<div style="color: red; text-align: center; padding: 20px;">❌ Lỗi: ${error.message}</div>`;
    }
}

function ham_8_4_tab_ket_qua() {
    document.getElementById('vung-lam-viec-hoc-sinh').innerHTML = `<h3 style="color:#6f42c1; text-align:center;">📊 Học bạ và Điểm số (Sắp ra mắt)</h3>`;
}

function ham_8_5_tab_ho_so() {
    document.getElementById('vung-lam-viec-hoc-sinh').innerHTML = `<h3 style="color:#6c757d; text-align:center;">👤 Cập nhật Thông tin (Sắp ra mắt)</h3>`;
}

function ham_8_6_tab_dau_truong_live() {
    document.getElementById('vung-lam-viec-hoc-sinh').innerHTML = `<h3 style="color:#dc3545; text-align:center;">⚔️ Phòng Đấu Trường (Sắp ra mắt)</h3>`;
}

// ==============================================================
// Hàm 8.7: Cửa An Ninh - Kiểm tra lượt làm và Xác nhận vào thi
// ==============================================================
async function ham_8_7_cua_an_ninh(maNhiemVu) {
    // 1. Tìm thông tin nhiệm vụ trong danh sách đã tải về ở GocHocSinhState
    const nv = GocHocSinhState.danhSachNhiemVu.find(item => item.ma_nhiem_vu === maNhiemVu);
    if (!nv) return alert("Lỗi: Không tìm thấy dữ liệu bài tập!");

    try {
        // 2. Kiểm tra số lượt đã làm thực tế từ Database (DÙNG BẢNG ket_qua_thi CỦA THẦY)
        const { data: cacLuotDaLam, error } = await _supabase
            .from('ket_qua_thi') // <--- Đã sửa thành ket_qua_thi
            .select('id')
            .eq('ma_nhiem_vu', maNhiemVu)
            .eq('uid_hoc_sinh', GocHocSinhState.uid);

        if (error) throw error;

        // Đếm số lượt đã nộp bài
        const soLuotHienTai = cacLuotDaLam ? cacLuotDaLam.length : 0;
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

        // 3. Hiện bảng thông tin xác nhận tâm lý cho học sinh
        const thoiGianHienThi = nv.thoi_gian_lam_bai > 0 ? `${nv.thoi_gian_lam_bai} phút` : "Tự do";

        Swal.fire({
            title: 'XÁC NHẬN VÀO LÀM BÀI',
            html: `
                <div style="text-align: left; background: #f8f9fa; padding: 15px; border-radius: 8px; border: 1px solid #ddd; font-size: 14px;">
                    <p>📝 <b>Nhiệm vụ:</b> <span style="color:#1a73e8; font-weight: bold;">${nv.ten_nhiem_vu}</span></p>
                    <p>⏱️ <b>Thời gian:</b> ${thoiGianHienThi}</p>
                    <p>🔄 <b>Lượt làm:</b> Lần thứ ${window.LanThuHienTai} (Tối đa: ${gioiHanLuot == 0 ? "Vô hạn" : gioiHanLuot})</p>
                    <hr>
                    <p style="color: #d32f2f; font-weight: bold; font-style: italic; margin:0;">⚠️ Lưu ý: Đồng hồ sẽ bắt đầu đếm ngược ngay khi em bấm nút BẮT ĐẦU.</p>
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
                // Chuyển sang Hàm 8.8: Khởi tạo phòng thi và bốc đề
                ham_8_8_khoi_tao_phong_thi(nv);
            }
        });

    } catch (err) {
        alert("Lỗi kiểm tra an ninh: " + err.message);
    }
}

// ==============================================================
// Hàm 8.8: Khởi tạo Phòng thi (Kết hợp Đáp án Supabase + Nội dung GitHub)
// ==============================================================
async function ham_8_8_khoi_tao_phong_thi(nv) {
    const vungLamViec = document.getElementById('dashboard-container');
    vungLamViec.innerHTML = `
        <div style="text-align: center; padding: 100px;">
            <div style="border: 4px solid #f3f3f3; border-top: 4px solid #3498db; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 0 auto;"></div>
            <h3 style="margin-top:20px; color:#1a73e8;">⚡ Đang đồng bộ dữ liệu đề thi...</h3>
            <style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>
        </div>
    `;

    try {
        const maHocLieu = nv.ma_hoc_lieu;
        if (!maHocLieu) throw new Error("Nhiệm vụ này chưa được gắn Học liệu!");

        // =========================================================
        // 1. MỞ KÉT SUPABASE: Lấy mảng Đáp án (chính là chuỗi JSON thầy vừa gửi)
        // =========================================================
        const { data: dataHocLieu, error: errHL } = await _supabase
            .from('hoc_lieu')
            .select('danh_sach_cau_hoi')
            .eq('ma_hoc_lieu', maHocLieu)
            .single();

        if (errHL) throw errHL;

        // dsMapDapAn lúc này chính là: [{"dap_an": "A", "ma_cau_hoi": "q_..."}, ...]
        const dsMapDapAn = dataHocLieu?.danh_sach_cau_hoi || [];
        if (dsMapDapAn.length === 0) throw new Error("Supabase báo Học liệu này trống!");

        // =========================================================
        // 2. LÊN GITHUB: Lấy nội dung text/ảnh của câu hỏi
        // =========================================================
        
        // Đường dẫn file json dựa theo cấu trúc tool C# của thầy: Kho_De_Thi/MaDe/DeThi_MaDe.json
        const urlFileGitHub = `${LINK_GITHUB_GOC}/Kho_De_Thi/${maHocLieu}/DeThi_${maHocLieu}.json`;

        console.log("🔍 Đang tải nội dung từ GitHub:", urlFileGitHub);

        const response = await fetch(urlFileGitHub);
        if (!response.ok) {
            throw new Error("Không tải được đề từ GitHub! Vui lòng kiểm tra lại link: " + urlFileGitHub);
        }

        const dataGitHub = await response.json();

        // dsNoiDungGH chứa mảng: [{maCau: "q_...", cauDan: "...", paA: "..."}, ...]
        const dsNoiDungGH = dataGitHub.danhSachCauHoi || [];

        // =========================================================
        // 3. RÁP ĐỀ: Nối nội dung (GitHub) với đáp án (Supabase)
        // =========================================================
        const deThiHoanChinh = dsMapDapAn.map(mapItem => {
            // So khớp: mã bên Supabase là "ma_cau_hoi", mã bên C# GitHub là "maCau"
            const noiDung = dsNoiDungGH.find(c => c.maCau === mapItem.ma_cau_hoi) || {};

            return {
                ...mapItem,  // Lấy đáp án và mã gốc
                ...noiDung   // Lấy nội dung hiển thị (cauDan, paA, kieuCau...)
            };
        });

        // 4. Trộn thứ tự câu hỏi (Hàm 8.9)
        const deThiDaTron = ham_8_9_tron_de_thi(deThiHoanChinh);

        // 5. Lưu vào Phiên làm bài
        window.PhienLamBai = {
            ma_nhiem_vu: nv.ma_nhiem_vu,
            ten_nhiem_vu: nv.ten_nhiem_vu,
            thoi_gian_con_lai: nv.thoi_gian_lam_bai * 60,
            tong_so_cau: deThiDaTron.length,
            danh_sach_cau_hoi: deThiDaTron,
            dap_an_hoc_sinh: {},
            id_timer: null
        };

        console.log("📦 RÁP ĐỀ THÀNH CÔNG:", window.PhienLamBai);

        // 6. Mở giao diện thi
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

// ==============================================================
// Hàm 8.10: Vẽ Giao Diện Phòng Thi (Code Mới)
// ==============================================================
function ham_8_10_ve_giao_dien_lam_bai() {
    const vungLamViec = document.getElementById('dashboard-container');
    const phien = window.PhienLamBai;

    // Mặc định mở câu đầu tiên
    phien.cau_hien_tai = phien.cau_hien_tai || 0;

    // 1. DỰNG BỘ KHUNG CHÍNH (LAYOUT TÁCH 2 CỘT)
    vungLamViec.innerHTML = `
        <div style="display: flex; flex-wrap: wrap; gap: 20px; background: #f0f2f5; padding: 15px; border-radius: 8px;">
            
            <div style="flex: 1 1 65%; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
                <div style="display: flex; justify-content: space-between; border-bottom: 2px solid #1a73e8; padding-bottom: 10px; margin-bottom: 20px;">
                    <h3 style="margin: 0; color: #1a73e8;">${phien.ten_nhiem_vu}</h3>
                    <div style="font-size: 20px; font-weight: bold; color: #dc3545; background: #fff3cd; padding: 5px 15px; border-radius: 5px; border: 1px solid #ffeeba;">
                        ⏱️ <span id="dong-ho-dem-nguoc">--:--</span>
                    </div>
                </div>
                
                <div id="khu-vuc-cau-hoi" style="min-height: 300px; font-size: 16px; line-height: 1.6;"></div>
                
                <div style="display: flex; justify-content: space-between; margin-top: 30px; border-top: 1px solid #ddd; padding-top: 15px;">
                    <button id="btn-cau-truoc" onclick="chuyenCauHoi(-1)" style="padding: 10px 20px; background: #6c757d; color: white; border: none; border-radius: 5px; cursor: pointer;">⬅️ Câu trước</button>
                    <button id="btn-cau-sau" onclick="chuyenCauHoi(1)" style="padding: 10px 20px; background: #1a73e8; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">Câu tiếp ➡️</button>
                </div>
            </div>

            <div style="flex: 1 1 30%; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); align-self: flex-start;">
                <h4 style="margin-top: 0; text-align: center; color: #495057;">BẢNG ĐIỀU HƯỚNG</h4>
                <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 15px; color: #666;">
                    <span>Tổng số: <b>${phien.tong_so_cau}</b></span>
                    <span>Đã làm: <b id="so-cau-da-lam" style="color: #28a745;">0</b></span>
                </div>
                
                <div id="bang-nut-cau-hoi" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(45px, 1fr)); gap: 8px; margin-bottom: 25px;">
                    </div>
                
                <button onclick="ham_8_11_xac_nhan_nop_bai()" style="width: 100%; padding: 15px; background: #28a745; color: white; border: none; border-radius: 8px; font-size: 16px; font-weight: bold; cursor: pointer; box-shadow: 0 4px 6px rgba(40,167,69,0.3);">
                    ✅ NỘP BÀI
                </button>
            </div>
        </div>
    `;

    // 2. KHỞI ĐỘNG CÁC THÀNH PHẦN
    renderBangDieuHuong();
    renderCauHoiHienTai();
    batDauDemNguoc();
}

// ==============================================================
// CÁC HÀM PHỤ TRỢ CHO PHÒNG THI
// ==============================================================

// 1. Vẽ nội dung câu hỏi dựa trên Phân loại (Trắc nghiệm, Đúng/Sai, Trả lời ngắn)
function renderCauHoiHienTai() {
    const phien = window.PhienLamBai;
    const cau = phien.danh_sach_cau_hoi[phien.cau_hien_tai];
    const khuVuc = document.getElementById('khu-vuc-cau-hoi');

    // Lấy đáp án đã chọn (nếu có)
    const dapAnCu = phien.dap_an_hoc_sinh[cau.ma_cau_hoi] || "";

    let htmlNoiDung = `
        <div style="margin-bottom: 15px;">
            <span style="font-weight: bold; color: #d35400;">Câu ${cau.index_stt}:</span> 
            ${cau.cauDan || cau.noi_dung || "Đang tải nội dung..."} 
        </div>
    `;

    // TÙY BIẾN GIAO DIỆN THEO KIỂU CÂU HỎI
    if (cau.kieuCau === "TN" || !cau.kieuCau) {
        // --- LOẠI 1: TRẮC NGHIỆM A B C D ---
        htmlNoiDung += `<div style="display: flex; flex-direction: column; gap: 10px;">`;
        ['paA', 'paB', 'paC', 'paD'].forEach((key, i) => {
            const nhan = String.fromCharCode(65 + i); // A, B, C, D
            const isChecked = dapAnCu === nhan ? "checked" : "";
            const bg = isChecked ? "#e8f0fe" : "#f8f9fa";

            htmlNoiDung += `
                <label style="display: flex; align-items: flex-start; padding: 12px; border: 1px solid #ced4da; border-radius: 6px; cursor: pointer; background: ${bg}; transition: 0.2s;">
                    <input type="radio" name="dapan_${cau.ma_cau_hoi}" value="${nhan}" ${isChecked} onchange="luuDapAn('${cau.ma_cau_hoi}', '${nhan}')" style="margin-top: 5px; margin-right: 15px; transform: scale(1.3);">
                    <div style="flex:1;"><b>${nhan}.</b> ${cau[key] || "..."}</div>
                </label>
            `;
        });
        htmlNoiDung += `</div>`;

    } else if (cau.kieuCau === "DS") {
        // --- LOẠI 2: ĐÚNG / SAI ---
        htmlNoiDung += `<div style="background: #fff8e1; padding: 10px; border-left: 4px solid #ffc107; margin-bottom: 15px; font-size: 13px;">💡 Yêu cầu: Chọn Đúng (Đ) hoặc Sai (S) cho từng ý A, B, C, D.</div>`;
        htmlNoiDung += `<table style="width: 100%; border-collapse: collapse;">`;

        // dapAnCu của phần này lưu dạng mảng hoặc object, VD: {A: 'T', B: 'F'}
        const chonDS = typeof dapAnCu === 'object' ? dapAnCu : {};

        ['paA', 'paB', 'paC', 'paD'].forEach((key, i) => {
            const nhan = String.fromCharCode(65 + i);
            const chonD = chonDS[nhan] === 'T' ? "checked" : "";
            const chonS = chonDS[nhan] === 'F' ? "checked" : "";

            htmlNoiDung += `
                <tr style="border-bottom: 1px dashed #ddd;">
                    <td style="padding: 10px 5px; width: 50px; text-align:center;"><b>${nhan}</b></td>
                    <td style="padding: 10px 5px;">${cau[key] || "..."}</td>
                    <td style="padding: 10px 5px; width: 100px; text-align: center; white-space: nowrap;">
                        <label style="margin-right: 10px; cursor:pointer;"><input type="radio" name="ds_${cau.ma_cau_hoi}_${nhan}" value="T" ${chonD} onchange="luuDapAnDS('${cau.ma_cau_hoi}', '${nhan}', 'T')"> Đ</label>
                        <label style="cursor:pointer;"><input type="radio" name="ds_${cau.ma_cau_hoi}_${nhan}" value="F" ${chonS} onchange="luuDapAnDS('${cau.ma_cau_hoi}', '${nhan}', 'F')"> S</label>
                    </td>
                </tr>
            `;
        });
        htmlNoiDung += `</table>`;

    } else if (cau.kieuCau === "TLN") {
        // --- LOẠI 3: TRẢ LỜI NGẮN ---
        htmlNoiDung += `
            <div style="background: #e3f2fd; padding: 15px; border-radius: 6px; border: 1px solid #b6d4fe; text-align: center;">
                <label style="font-weight: bold; color: #084298; display: block; margin-bottom: 10px;">✍️ NHẬP ĐÁP ÁN CỦA EM VÀO ĐÂY:</label>
                <input type="text" value="${dapAnCu}" onblur="luuDapAn('${cau.ma_cau_hoi}', this.value)" style="width: 80%; max-width: 300px; padding: 12px; font-size: 18px; text-align: center; border: 2px solid #1a73e8; border-radius: 6px; outline: none;">
                <div style="font-size: 12px; color: #666; margin-top: 8px;">(Lưu ý: Nếu đáp án là phân số, nhập dưới dạng thập phân. Ví dụ: 0,5 hoặc 0.5)</div>
            </div>
        `;
    }

    khuVuc.innerHTML = htmlNoiDung;

    // Cập nhật trạng thái nút (Vô hiệu hóa nút "Trước" nếu ở câu 1...)
    document.getElementById('btn-cau-truoc').disabled = (phien.cau_hien_tai === 0);
    document.getElementById('btn-cau-sau').disabled = (phien.cau_hien_tai === phien.tong_so_cau - 1);

    // Đánh dấu nút đang chọn trên bảng điều hướng
    document.querySelectorAll('.nut-cau-hoi').forEach(btn => btn.style.border = "1px solid #ddd");
    document.getElementById(`nut-cau-${phien.cau_hien_tai}`).style.border = "3px solid #1a73e8";

    // Render lại toán học (MathJax/KaTeX nếu thầy có xài)
    if (window.MathJax) MathJax.typesetPromise();
}

// 2. Lưu đáp án (TN và TLN)
function luuDapAn(maCau, giaTri) {
    window.PhienLamBai.dap_an_hoc_sinh[maCau] = giaTri.trim();
    renderBangDieuHuong(); // Cập nhật màu xanh

    // Nếu là trắc nghiệm, bấm xong tự nhảy câu sau cho lẹ
    if (["A", "B", "C", "D"].includes(giaTri)) {
        setTimeout(() => chuyenCauHoi(1), 300);
    }
}

// 3. Lưu đáp án (Đúng/Sai)
function luuDapAnDS(maCau, y, giaTri) {
    if (!window.PhienLamBai.dap_an_hoc_sinh[maCau]) {
        window.PhienLamBai.dap_an_hoc_sinh[maCau] = {};
    }
    window.PhienLamBai.dap_an_hoc_sinh[maCau][y] = giaTri;
    renderBangDieuHuong(); // Cập nhật màu
}

// 4. Bảng điều hướng
function renderBangDieuHuong() {
    const phien = window.PhienLamBai;
    const bangNut = document.getElementById('bang-nut-cau-hoi');
    let htmlNut = "";
    let cauDaLam = 0;

    phien.danh_sach_cau_hoi.forEach((cau, index) => {
        const daTraLoi = phien.dap_an_hoc_sinh[cau.ma_cau_hoi];

        // Kiểm tra xem đã trả lời chưa (DS cần trả lời đủ 4 ý mới tính là xong)
        let isDone = false;
        if (cau.kieuCau === "DS") {
            if (daTraLoi && Object.keys(daTraLoi).length === 4) isDone = true;
        } else {
            if (daTraLoi && daTraLoi !== "") isDone = true;
        }

        if (isDone) cauDaLam++;

        const bg = isDone ? "#d4edda" : "#f8f9fa";
        const color = isDone ? "#155724" : "#495057";

        htmlNut += `<button id="nut-cau-${index}" class="nut-cau-hoi" onclick="nhayDenCau(${index})" style="padding: 10px 0; background: ${bg}; color: ${color}; border: 1px solid #ddd; border-radius: 4px; font-weight: bold; cursor: pointer;">${cau.index_stt}</button>`;
    });

    bangNut.innerHTML = htmlNut;
    document.getElementById('so-cau-da-lam').innerText = cauDaLam;
}

// 5. Chuyển đổi câu hỏi
function chuyenCauHoi(buoc) {
    const phien = window.PhienLamBai;
    const newIndex = phien.cau_hien_tai + buoc;
    if (newIndex >= 0 && newIndex < phien.tong_so_cau) {
        phien.cau_hien_tai = newIndex;
        renderCauHoiHienTai();
    }
}

function nhayDenCau(index) {
    window.PhienLamBai.cau_hien_tai = index;
    renderCauHoiHienTai();
}

// 6. Đồng hồ đếm ngược
function batDauDemNguoc() {
    const phien = window.PhienLamBai;
    if (phien.thoi_gian_con_lai <= 0) {
        document.getElementById('dong-ho-dem-nguoc').innerText = "Tự do";
        return; // Không giới hạn thời gian
    }

    clearInterval(phien.id_timer); // Xóa timer cũ nếu có

    phien.id_timer = setInterval(() => {
        phien.thoi_gian_con_lai--;

        const phut = Math.floor(phien.thoi_gian_con_lai / 60);
        const giay = phien.thoi_gian_con_lai % 60;

        const textHienThi = `${phut.toString().padStart(2, '0')}:${giay.toString().padStart(2, '0')}`;
        const elmDongHo = document.getElementById('dong-ho-dem-nguoc');
        if (elmDongHo) elmDongHo.innerText = textHienThi;

        // Cảnh báo khi còn 1 phút
        if (phien.thoi_gian_con_lai === 60) {
            Swal.fire({
                title: 'Sắp hết giờ!',
                text: 'Chỉ còn 1 phút, các em nhanh tay kiểm tra lại đáp án nhé!',
                icon: 'warning',
                timer: 3000,
                showConfirmButton: false
            });
        }

        // Hết giờ -> Tự động nộp bài
        if (phien.thoi_gian_con_lai <= 0) {
            clearInterval(phien.id_timer);
            Swal.fire({
                title: 'HẾT GIỜ!',
                text: 'Hệ thống đang tự động thu bài...',
                icon: 'info',
                showConfirmButton: false,
                allowOutsideClick: false
            });
            setTimeout(() => ham_8_11_thuc_thi_nop_bai(), 2000); // Tự động gọi nộp bài
        }
    }, 1000);
}
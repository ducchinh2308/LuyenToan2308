// ==============================================================
// KHỐI 0: ĐÁNH DẤU PHIÊN BẢN (VERSION CONTROL)
// ==============================================================
const KHOI8_VERSION = "Khối 8: Cập nhật lúc 19h00 - Ngày 12/05";
console.log(`%c🚀 ĐANG CHẠY: ${KHOI8_VERSION}`, "background: #28a745; color: white; font-size: 14px; padding: 5px; font-weight: bold;");

window.addEventListener('load', () => {
    let versionBadge = document.createElement('div');
    versionBadge.innerHTML = KHOI8_VERSION;
    versionBadge.style.cssText = "position: fixed; bottom: 20px; right: 5px; font-size: 11px; color: #28a745; z-index: 9999; font-weight: bold;";
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
// Hàm 8.1: Dựng Bộ Khung Giao Diện (App Shell)
// ==============================================================
function ham_8_1_tai_nhiem_vu_cua_toi(uidHocSinh, maLopHocSinh, tenHocSinh) {
    // Lưu thông tin học sinh
    GocHocSinhState.uid = uidHocSinh;
    GocHocSinhState.ma_lop = maLopHocSinh;
    GocHocSinhState.ten = tenHocSinh;

    const renderArea = document.getElementById('dashboard-container');
    if (!renderArea) return alert("Lỗi: Không tìm thấy khung hiển thị!");

    // Thiết kế giống hệt giao diện Giáo Viên: Nút ở trên, Nội dung ở dưới
    renderArea.innerHTML = `
        <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); max-width: 1200px; margin: 0 auto;">
            
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e9ecef; padding-bottom: 10px; margin-bottom: 20px; flex-wrap: wrap; gap: 10px;">
                <h2 style="color: #1a73e8; margin: 0; font-size: 20px;">🎓 GÓC HỌC TẬP</h2>
                <div style="font-weight: bold; color: #495057; font-size: 14px;">
                    Chào em, <span style="color:#d35400;">${tenHocSinh}</span> (Lớp: ${maLopHocSinh || 'Chưa cập nhật'})
                </div>
            </div>
            
            <div style="display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; margin-bottom: 20px;">
                <button onclick="ham_8_2_tab_nhiem_vu_bat_buoc()" style="flex: 1; min-width: 140px; padding: 12px; background: #28a745; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: bold; box-shadow: 0 2px 4px rgba(40,167,69,0.3);">
                    🚀 NHIỆM VỤ LỚP
                </button>
                <button onclick="ham_8_3_tab_luyen_tap_tu_do()" style="flex: 1; min-width: 140px; padding: 12px; background: #17a2b8; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: bold; box-shadow: 0 2px 4px rgba(23,162,184,0.3);">
                    🌍 TỰ LUYỆN
                </button>
                <button onclick="ham_8_4_tab_ket_qua()" style="flex: 1; min-width: 140px; padding: 12px; background: #6f42c1; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: bold; box-shadow: 0 2px 4px rgba(111,66,193,0.3);">
                    📊 KẾT QUẢ
                </button>
                <button onclick="ham_8_5_tab_ho_so()" style="flex: 1; min-width: 140px; padding: 12px; background: #6c757d; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: bold; box-shadow: 0 2px 4px rgba(108,117,125,0.3);">
                    👤 HỒ SƠ
                </button>
                <button onclick="ham_8_6_tab_dau_truong_live()" style="flex: 1; min-width: 140px; padding: 12px; background: #dc3545; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: bold; box-shadow: 0 2px 4px rgba(220,53,69,0.3);">
                    ⚔️ LIVE QUIZ
                </button>
            </div>
            
            <div id="vung-lam-viec-hoc-sinh" style="padding: 15px; background: #f8f9fa; border-radius: 8px; border: 1px dashed #ccc; min-height: 300px;">
                <p style="color: #6c757d; text-align: center; margin-top: 50px;">Đang nạp dữ liệu...</p>
            </div>
            
        </div>
    `;

    // Mặc định vừa vào sẽ load luôn Tab Nhiệm Vụ Bắt Buộc
    ham_8_2_tab_nhiem_vu_bat_buoc();
}

// ==============================================================
// Hàm 8.2: Xử lý Tab "Nhiệm Vụ Trên Lớp"
// ==============================================================
async function ham_8_2_tab_nhiem_vu_bat_buoc() {
    const vungLamViec = document.getElementById('vung-lam-viec-hoc-sinh');
    vungLamViec.innerHTML = `<div style="text-align: center; padding: 40px;"><h3 style="color:#28a745;">⏳ Đang tải bài tập của Lớp...</h3></div>`;

    try {
        // Chỉ lấy những bài đang MỞ và cấu hình JSON có chứa Mã Lớp của học sinh này
        const { data: dsNV, error } = await _supabase
            .from('nhiem_vu')
            .select('*')
            .eq('trang_thai', 1)
            .contains('danh_sach_lop', `["${GocHocSinhState.ma_lop}"]`)
            .order('ngay_tao', { ascending: false });

        if (error) throw error;

        GocHocSinhState.danhSachNhiemVu = dsNV || [];

        // Render 3 trạng thái (Dùng CSS Grid để Mobile tự động rớt xuống thành 1 cột dọc)
        const now = new Date();
        let dsChuaMo = [], dsDangMo = [], dsDaDong = [];

        GocHocSinhState.danhSachNhiemVu.forEach(nv => {
            const tMo = nv.thoi_gian_mo ? new Date(nv.thoi_gian_mo) : null;
            const tDong = nv.thoi_gian_dong ? new Date(nv.thoi_gian_dong) : null;

            if (tMo && now < tMo) dsChuaMo.push(nv);
            else if (tDong && now > tDong) dsDaDong.push(nv);
            else dsDangMo.push(nv);
        });

        // Hàm phụ vẽ Card nhiệm vụ
        const renderCard = (nv, loai) => {
            const tDongStr = nv.thoi_gian_dong ? new Date(nv.thoi_gian_dong).toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }) : "Không giới hạn";
            let nutHanhDong = "", mauVien = "";

            if (loai === 'DANG_MO') {
                mauVien = "border-left: 5px solid #28a745;";
                nutHanhDong = `<button onclick="ham_8_x_cua_an_ninh('${nv.ma_nhiem_vu}')" style="width: 100%; padding: 10px; background: #28a745; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">VÀO LÀM BÀI</button>`;
            } else if (loai === 'CHUA_MO') {
                const tMoStr = new Date(nv.thoi_gian_mo).toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
                mauVien = "border-left: 5px solid #ffc107;";
                nutHanhDong = `<button disabled style="width: 100%; padding: 10px; background: #e9ecef; color: #6c757d; border: none; border-radius: 6px; font-weight: bold;">Mở lúc: ${tMoStr}</button>`;
            } else if (loai === 'DA_DONG') {
                mauVien = "border-left: 5px solid #dc3545;";
                nutHanhDong = `<button onclick="alert('Xem điểm')" style="width: 100%; padding: 10px; background: #17a2b8; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">XEM KẾT QUẢ</button>`;
            }

            return `
                <div style="background: white; border: 1px solid #dee2e6; border-radius: 8px; padding: 15px; margin-bottom: 15px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); ${mauVien}">
                    <h4 style="margin: 0 0 5px 0; color: #333; font-size: 15px;">${nv.ten_nhiem_vu}</h4>
                    <span style="font-size: 10px; padding: 3px 8px; background: #f8f9fa; border: 1px solid #ddd; border-radius: 12px; color: #666;">${nv.loai_nhiem_vu}</span>
                    <div style="font-size: 12px; color: #555; margin: 10px 0; line-height: 1.6;">
                        <div>⏰ Đóng: <strong style="color: #d35400;">${tDongStr}</strong></div>
                        <div>🔄 Lượt: <strong>${nv.so_luot_lam_bai == 0 ? "Vô hạn" : nv.so_luot_lam_bai}</strong></div>
                    </div>
                    ${nutHanhDong}
                </div>
            `;
        };

        // 🌟 Chìa khóa Responsive nằm ở 'grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))'
        // Trên máy tính: Nó dàn thành 3 cột. Trên điện thoại: Tự động xếp dọc từ trên xuống dưới.
        vungLamViec.innerHTML = `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
                <div style="background: #f8fff9; padding: 15px; border-radius: 8px; border: 1px solid #c3e6cb;">
                    <h3 style="margin-top: 0; color: #28a745; text-align: center; font-size: 15px;">▶️ ĐANG MỞ (${dsDangMo.length})</h3>
                    ${dsDangMo.length === 0 ? '<p style="text-align:center; color:#999; font-size:13px;">Không có bài.</p>' : dsDangMo.map(nv => renderCard(nv, 'DANG_MO')).join('')}
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
function ham_8_3_tab_luyen_tap_tu_do() {
    document.getElementById('vung-lam-viec-hoc-sinh').innerHTML = `<h3 style="color:#17a2b8; text-align:center;">🌍 Khu vực Luyện Tập Tự Do (Sắp ra mắt)</h3>`;
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

function ham_8_x_cua_an_ninh(maNhiemVu) {
    alert(`Chuẩn bị vào phòng thi mã: ${maNhiemVu}`);
}
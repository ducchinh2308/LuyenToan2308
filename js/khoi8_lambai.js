// ==============================================================
// KHỐI 0: ĐÁNH DẤU PHIÊN BẢN (VERSION CONTROL)
// ==============================================================
const KHOI8_VERSION = "Khối 8: Cập nhật lúc 19h17 - Ngày 12/05";
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
// Hàm 8.2: Xử lý Tab "Nhiệm Vụ Trên Lớp" (Nâng cấp Giao diện Thẻ)
// ==============================================================
async function ham_8_2_tab_nhiem_vu_bat_buoc() {
    const vungLamViec = document.getElementById('vung-lam-viec-hoc-sinh');
    vungLamViec.innerHTML = `<div style="text-align: center; padding: 40px;"><h3 style="color:#28a745;">⏳ Đang tải bài tập của Lớp...</h3></div>`;

    try {
        const { data: dsNV, error } = await _supabase
            .from('nhiem_vu')
            .select('*')
            .eq('trang_thai', 1)
            .contains('danh_sach_lop', `["${GocHocSinhState.ma_lop}"]`)
            .order('ngay_tao', { ascending: false });

        if (error) throw error;
        GocHocSinhState.danhSachNhiemVu = dsNV || [];

        const now = new Date();
        let dsChuaMo = [], dsDangMo = [], dsDaDong = [];

        GocHocSinhState.danhSachNhiemVu.forEach(nv => {
            const tMo = nv.thoi_gian_mo ? new Date(nv.thoi_gian_mo) : null;
            const tDong = nv.thoi_gian_dong ? new Date(nv.thoi_gian_dong) : null;

            if (tMo && now < tMo) dsChuaMo.push(nv);
            else if (tDong && now > tDong) dsDaDong.push(nv);
            else dsDangMo.push(nv);
        });

        // 🌟 HÀM PHỤ: Tính toán khoảng thời gian sinh động
        const tinhThoiGian = (targetDate, isPast) => {
            if (!targetDate) return "";
            const diff = isPast ? (now - targetDate) : (targetDate - now);
            if (diff <= 0) return isPast ? "Vừa xong" : "Đã hết hạn";

            const d = Math.floor(diff / (1000 * 60 * 60 * 24));
            const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const m = Math.floor((diff / (1000 * 60)) % 60);

            let str = "";
            if (d > 0) str += `${d} ngày `;
            if (h > 0) str += `${h} giờ `;
            if (m > 0 && d === 0) str += `${m} phút`;

            return isPast ? `(Đã mở: ${str})` : `(Còn lại: ${str})`;
        };

        // 🌟 HÀM PHỤ: VẼ GIAO DIỆN THẺ (CARD)
        const renderCard = (nv, loai) => {
            // Xử lý Ngày tháng
            const tMo = nv.thoi_gian_mo ? new Date(nv.thoi_gian_mo) : null;
            const tDong = nv.thoi_gian_dong ? new Date(nv.thoi_gian_dong) : null;
            const fTime = (d) => d ? d.toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }) : "Không quy định";

            // Xử lý Cấu trúc đề & Số câu
            let cauTrucText = "Chưa có thông tin";
            if (nv.cau_truc_de) {
                // Nếu thầy lưu JSON hoặc Text, tạm in text. Hoặc ưu tiên in số lượng câu
                cauTrucText = nv.cau_truc_de.length > 30 ? nv.cau_truc_de.substring(0, 30) + '...' : nv.cau_truc_de;
            }
            const quyMoText = (nv.quy_mo_cau_hoi && nv.quy_mo_cau_hoi > 0) ? `Tổng: ${nv.quy_mo_cau_hoi} câu` : "";

            // Xử lý màu sắc theo Loại Card
            let nutHanhDong = "", mauVien = "", mauNen = "";
            if (loai === 'DANG_MO') {
                mauVien = "#28a745"; mauNen = "#f4fdf6";
                nutHanhDong = `<button onclick="ham_8_x_cua_an_ninh('${nv.ma_nhiem_vu}')" style="width: 100%; padding: 12px; background: #28a745; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; transition: 0.2s;">🚀 VÀO LÀM BÀI</button>`;
            } else if (loai === 'CHUA_MO') {
                mauVien = "#ffc107"; mauNen = "#fffbf0";
                nutHanhDong = `<button disabled style="width: 100%; padding: 12px; background: #e9ecef; color: #6c757d; border: none; border-radius: 6px; font-weight: bold;">⏳ Đợi đến giờ mở</button>`;
            } else if (loai === 'DA_DONG') {
                mauVien = "#dc3545"; mauNen = "#fff5f6";
                nutHanhDong = `<button onclick="alert('Tính năng xem kết quả')" style="width: 100%; padding: 12px; background: #17a2b8; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">📊 XEM KẾT QUẢ / LỜI GIẢI</button>`;
            }

            return `
                <div style="background: white; border: 1px solid #e0e0e0; border-top: 4px solid ${mauVien}; border-radius: 10px; padding: 16px; margin-bottom: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.04); position: relative; overflow: hidden;">
                    
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                        <h4 style="margin: 0; color: #2c3e50; font-size: 16px; line-height: 1.4; padding-right: 10px;">${nv.ten_nhiem_vu}</h4>
                        <span style="font-size: 11px; padding: 4px 8px; background: ${mauNen}; border: 1px solid ${mauVien}40; border-radius: 12px; color: ${mauVien}; white-space: nowrap; font-weight: bold;">
                            ${nv.loai_nhiem_vu}
                        </span>
                    </div>

                    <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 15px;">
                        <span style="font-size: 12px; background: #f1f3f5; color: #495057; padding: 4px 8px; border-radius: 4px; border: 1px solid #dee2e6;">
                            ⏱️ Làm bài: <b>${nv.thoi_gian_lam_bai > 0 ? nv.thoi_gian_lam_bai + ' phút' : 'Tự do'}</b>
                        </span>
                        <span style="font-size: 12px; background: #f1f3f5; color: #495057; padding: 4px 8px; border-radius: 4px; border: 1px solid #dee2e6;" title="${cauTrucText}">
                            📦 <b>${quyMoText}</b> (Cấu trúc: ${cauTrucText})
                        </span>
                        <span style="font-size: 12px; background: #f1f3f5; color: #495057; padding: 4px 8px; border-radius: 4px; border: 1px solid #dee2e6;">
                            🔄 Lượt: <b>0 / ${nv.so_luot_lam_bai == 0 ? "Vô hạn" : nv.so_luot_lam_bai}</b>
                        </span>
                    </div>

                    <div style="background: #f8f9fa; border-radius: 6px; padding: 10px; margin-bottom: 15px; font-size: 13px; border-left: 3px solid #ced4da;">
                        <div style="margin-bottom: 5px;">
                            <span style="color: #28a745; font-weight: bold;">🟢 MỞ:</span> ${fTime(tMo)} 
                            <span style="color: #6c757d; font-size: 11px; margin-left: 5px; font-style: italic;">${tMo ? tinhThoiGian(tMo, true) : ""}</span>
                        </div>
                        <div>
                            <span style="color: #dc3545; font-weight: bold;">🔴 ĐÓNG:</span> ${fTime(tDong)}
                            <span style="color: #d35400; font-size: 12px; margin-left: 5px; font-weight: bold;">${tDong && now < tDong ? tinhThoiGian(tDong, false) : ""}</span>
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
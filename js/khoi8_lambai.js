// ==============================================================
// KHỐI 8: GIAO DIỆN HỌC SINH (STUDENT PORTAL & THI ONLINE)
// File: khoi8_lambai.js
// ==============================================================

// Biến toàn cục lưu trữ dữ liệu của riêng Học sinh đang đăng nhập
const GocHocSinhState = {
    uid: null,
    ma_lop: null,
    ten: null,
    danhSachNhiemVu: []
};

// ==============================================================
// Hàm 8.1: Tải danh sách Nhiệm vụ dành riêng cho Học sinh
// (Hàm này sẽ được gọi khi học sinh đăng nhập thành công)
// ==============================================================
async function ham_8_1_tai_nhiem_vu_cua_toi(uidHocSinh, maLopHocSinh, tenHocSinh) {
    // Lưu thông tin học sinh vào State để dùng cho lúc Nộp bài
    GocHocSinhState.uid = uidHocSinh;
    GocHocSinhState.ma_lop = maLopHocSinh;
    GocHocSinhState.ten = tenHocSinh;

    const renderArea = document.getElementById('dashboard-container');
    if (!renderArea) return;

    renderArea.innerHTML = `<div style="text-align: center; padding: 50px;"><h3 style="color:#1a73e8;">⏳ Đang tải bài tập của bạn...</h3></div>`;

    try {
        // 1. Lấy TOÀN BỘ nhiệm vụ đang MỞ thủ công (trang_thai = 1)
        const { data: dsNV, error } = await _supabase
            .from('nhiem_vu')
            .select('*')
            .eq('trang_thai', 1)
            .order('ngay_tao', { ascending: false });

        if (error) throw error;

        // 2. BỘ LỌC TỰ ĐỘNG: Chỉ giữ lại các nhiệm vụ có giao cho Lớp của học sinh này
        GocHocSinhState.danhSachNhiemVu = (dsNV || []).filter(nv => {
            try {
                const arrLop = typeof nv.danh_sach_lop === 'string' ? JSON.parse(nv.danh_sach_lop) : (nv.danh_sach_lop || []);
                return arrLop.includes(maLopHocSinh);
            } catch (e) { return false; }
        });

        // 3. Tiến hành vẽ giao diện Bảng điều khiển
        ham_8_2_ve_dashboard_hoc_sinh();

    } catch (error) {
        renderArea.innerHTML = `<div style="text-align: center; color: red; padding: 20px;">❌ Lỗi tải dữ liệu: ${error.message}</div>`;
    }
}

// ==============================================================
// Hàm 8.2: Vẽ Bảng điều khiển (Phân loại Bài tập ra 3 cột)
// ==============================================================
function ham_8_2_ve_dashboard_hoc_sinh() {
    const renderArea = document.getElementById('vung-lam-viec-chinh'); // Thầy nhớ đổi ID này cho khớp với thẻ div ngoài HTML nhé
    const now = new Date();

    let dsChuaMo = [];
    let dsDangMo = [];
    let dsDaDong = [];

    // Phân loại nhiệm vụ dựa vào Giờ Mở / Giờ Đóng
    GocHocSinhState.danhSachNhiemVu.forEach(nv => {
        const tMo = nv.thoi_gian_mo ? new Date(nv.thoi_gian_mo) : null;
        const tDong = nv.thoi_gian_dong ? new Date(nv.thoi_gian_dong) : null;

        if (tMo && now < tMo) {
            dsChuaMo.push(nv); // Chưa tới giờ mở
        } else if (tDong && now > tDong) {
            dsDaDong.push(nv); // Quá hạn đóng
        } else {
            dsDangMo.push(nv); // Đang trong khung giờ làm bài
        }
    });

    // 🌟 HÀM PHỤ: Vẽ Giao diện 1 Thẻ Bài Tập (Card)
    const renderCard = (nv, loai) => {
        const tDongStr = nv.thoi_gian_dong ? new Date(nv.thoi_gian_dong).toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }) : "Không giới hạn";

        let nutHanhDong = "";
        let mauVien = "";

        if (loai === 'DANG_MO') {
            mauVien = "border-left: 5px solid #28a745;";
            nutHanhDong = `<button onclick="ham_8_3_cua_an_ninh('${nv.ma_nhiem_vu}')" style="width: 100%; padding: 12px; background: #28a745; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; box-shadow: 0 4px 6px rgba(40,167,69,0.2); transition: 0.2s;">🚀 VÀO LÀM BÀI</button>`;
        } else if (loai === 'CHUA_MO') {
            const tMoStr = new Date(nv.thoi_gian_mo).toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
            mauVien = "border-left: 5px solid #ffc107;";
            nutHanhDong = `<button disabled style="width: 100%; padding: 12px; background: #e9ecef; color: #6c757d; border: none; border-radius: 6px; font-weight: bold;">⏳ Đợi mở lúc: ${tMoStr}</button>`;
        } else if (loai === 'DA_DONG') {
            mauVien = "border-left: 5px solid #dc3545;";
            nutHanhDong = `<button onclick="ham_8_x_xem_ket_qua('${nv.ma_nhiem_vu}')" style="width: 100%; padding: 12px; background: #17a2b8; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">📊 XEM ĐIỂM / LỜI GIẢI</button>`;
        }

        return `
            <div style="background: white; border: 1px solid #dee2e6; border-radius: 8px; padding: 15px; margin-bottom: 15px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); ${mauVien}">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
                    <h4 style="margin: 0; color: #333; font-size: 15px;">${nv.ten_nhiem_vu}</h4>
                    <span style="font-size: 10px; padding: 3px 8px; background: #f8f9fa; border: 1px solid #ddd; border-radius: 12px; color: #666; white-space: nowrap; margin-left: 10px;">${nv.loai_nhiem_vu}</span>
                </div>
                <div style="font-size: 13px; color: #555; margin-bottom: 15px; line-height: 1.6;">
                    <div>⏰ Hạn chót: <strong style="color: #d35400;">${tDongStr}</strong></div>
                    <div>🔄 Số lượt cho phép: <strong>${nv.so_luot_lam_bai == 0 ? "Vô hạn" : nv.so_luot_lam_bai}</strong></div>
                </div>
                ${nutHanhDong}
            </div>
        `;
    };

    // 🌟 Ghép HTML 3 Cột
    let html = `
        <div style="max-width: 1100px; margin: 0 auto; padding: 20px; font-family: sans-serif;">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e9ecef; padding-bottom: 10px; margin-bottom: 20px;">
                <h2 style="color: #1a73e8; margin: 0;">📚 GÓC HỌC TẬP</h2>
                <div style="font-weight: bold; color: #495057;">Chào em, <span style="color:#d35400;">${GocHocSinhState.ten}</span> (Lớp: ${GocHocSinhState.ma_lop})</div>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px;">
                <div style="background: #f8fff9; padding: 15px; border-radius: 8px; border: 1px solid #c3e6cb;">
                    <h3 style="margin-top: 0; color: #28a745; text-align: center; font-size: 16px;">▶️ ĐANG MỞ (${dsDangMo.length})</h3>
                    ${dsDangMo.length === 0 ? '<p style="text-align:center; color:#999; font-size:13px; font-style:italic;">Không có bài nào.</p>' : dsDangMo.map(nv => renderCard(nv, 'DANG_MO')).join('')}
                </div>

                <div style="background: #fffdf8; padding: 15px; border-radius: 8px; border: 1px solid #ffeeba;">
                    <h3 style="margin-top: 0; color: #d35400; text-align: center; font-size: 16px;">⏳ SẮP MỞ (${dsChuaMo.length})</h3>
                    ${dsChuaMo.length === 0 ? '<p style="text-align:center; color:#999; font-size:13px; font-style:italic;">Không có bài nào chờ.</p>' : dsChuaMo.map(nv => renderCard(nv, 'CHUA_MO')).join('')}
                </div>

                <div style="background: #fff8f8; padding: 15px; border-radius: 8px; border: 1px solid #f5c6cb;">
                    <h3 style="margin-top: 0; color: #dc3545; text-align: center; font-size: 16px;">🛑 ĐÃ ĐÓNG (${dsDaDong.length})</h3>
                    ${dsDaDong.length === 0 ? '<p style="text-align:center; color:#999; font-size:13px; font-style:italic;">Trống.</p>' : dsDaDong.map(nv => renderCard(nv, 'DA_DONG')).join('')}
                </div>
            </div>
        </div>
    `;

    renderArea.innerHTML = html;
}

// ==============================================================
// Hàm 8.3: Cửa an ninh (Check điều kiện trước khi tải Đề thi)
// ==============================================================
async function ham_8_3_cua_an_ninh(maNhiemVu) {
    const nv = GocHocSinhState.danhSachNhiemVu.find(n => n.ma_nhiem_vu === maNhiemVu);
    if (!nv) return alert("❌ Không tìm thấy dữ liệu nhiệm vụ!");

    // Tạm thời hiển thị Alert để test luồng
    alert(`Đã qua cửa an ninh!\nChuẩn bị mở phòng thi cho bài: ${nv.ten_nhiem_vu}\nHệ thống sẽ load học liệu ${nv.ma_hoc_lieu || 'Trống'}...`);

    // Todo ở bước tiếp theo: 
    // 1. Fetch bảng 'ket_qua_thi' để đếm số lượt học sinh này đã làm.
    // 2. Nếu (đã làm >= số lượt tối đa) -> Chặn lại.
    // 3. Nếu hợp lệ -> Gọi hàm ham_8_4_mo_phong_thi(nv)
}

function ham_8_x_xem_ket_qua(maNhiemVu) {
    alert("Chức năng xem điểm và lời giải sẽ được mở sau khi làm xong phần Chấm điểm!");
}
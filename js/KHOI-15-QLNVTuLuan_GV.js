// ==============================================================================
// KHỐI 15: CẬP NHẬT - GIÁO VIÊN QUẢN LÝ VÀ GIAO NHIỆM VỤ TỰ LUẬN (BẢN TINH CHỈNH)
// ==============================================================================

// Hàm bổ trợ: Tạo mã ngẫu nhiên 6 ký tự (Chữ in hoa và số, giống mã đề trắc nghiệm)
function ham_15_tao_ma_6_ky_tu() {
    const tapKyTu = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let chuoiNgauNhien = '';
    for (let i = 0; i < 6; i++) {
        chuoiNgauNhien += tapKyTu.charAt(Math.floor(Math.random() * tapKyTu.length));
    }
    return chuoiNgauNhien;
}


// =====================================================================
// Hàm 15.0: Vẽ màn hình Quản lý Kho Học Liệu Tự Luận (Dành cho Dashboard)
// =====================================================================
window.ham_15_0_ve_quan_ly_hoc_lieu_tu_luan = async function () {
    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
    vungLamViec.innerHTML = `<div style="text-align:center; padding: 30px; color: #28a745; font-weight:bold;">⏳ Đang mở kho học liệu tự luận...</div>`;

    try {
        // Gọi hàm 15.3 để lấy chuỗi HTML
        const htmlKhuVucTuLuan = await window.ham_15_3_html_khu_vuc_tao_tu_luan();

        // In chuỗi HTML đó lên màn hình
        vungLamViec.innerHTML = `
            <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); max-width: 900px; margin: 0 auto;">
                <h3 style="color: #28a745; margin-top: 0; margin-bottom: 20px; border-bottom: 2px solid #f8f9fa; padding-bottom: 15px;">
                    📚 KHO HỌC LIỆU TỰ LUẬN
                </h3>
                ${htmlKhuVucTuLuan}
            </div>
        `;
    } catch (error) {
        vungLamViec.innerHTML = `<div style="color:red; text-align:center;">❌ Lỗi: ${error.message}</div>`;
    }
};

// // =====================================================================
// // Hàm 6b.1: Vẽ màn hình Quản lý Kho Học Liệu Tự Luận (Bảng danh sách)
// // =====================================================================
// window.ham_6b_1_ve_quan_ly_hoc_lieu_tu_luan = async function () {
//     const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
//     if (!vungLamViec) return;
//     vungLamViec.innerHTML = `<div style="text-align:center; padding: 40px; color: #28a745; font-weight:bold;">⏳ Đang tải kho học liệu tự luận...</div>`;

//     try {
//         // 1. Tải dữ liệu từ bảng mới
//         const { data: dataHL, error } = await _supabase
//             .from('hoc_lieu_tu_luan')
//             .select('*')
//             .order('ngay_tao', { ascending: false });

//         if (error) throw error;

//         // 2. Dựng các dòng cho Bảng danh sách
//         let chuoiCacDong = "";
//         if (!dataHL || dataHL.length === 0) {
//             chuoiCacDong = `<tr><td colspan="5" style="text-align:center; padding: 25px; color:#6c757d;">Kho học liệu tự luận đang trống. Thầy/cô hãy tạo mới ở phía trên nhé!</td></tr>`;
//         } else {
//             chuoiCacDong = dataHL.map((hl, index) => {
//                 const meta = typeof hl.metadata === 'string' ? JSON.parse(hl.metadata || '{}') : (hl.metadata || {});
//                 const isText = meta.loai_tu_luan === 'text' || meta.kieu_de_tu_luan === 'van_ban';
//                 const loaiHienThi = isText ? '✍️ Văn bản' : '📁 File đính kèm';
//                 const ngayTao = hl.ngay_tao ? new Date(hl.ngay_tao).toLocaleDateString('vi-VN') : '';

//                 return `
//                     <tr style="border-bottom: 1px solid #e2e8f0; hover:background-color: #f8fafc;">
//                         <td style="padding: 12px; text-align: center;">${index + 1}</td>
//                         <td style="padding: 12px; font-weight: bold; color: #2c3e50;">${hl.ten_hoc_lieu}</td>
//                         <td style="padding: 12px; text-align: center;">${loaiHienThi}</td>
//                         <td style="padding: 12px; text-align: center; font-size: 13px; color: #64748b;">${ngayTao}</td>
//                         <td style="padding: 12px; text-align: center;">
//                             <button onclick="alert('Chức năng xem/sửa chi tiết đang được cập nhật!')" style="background:#17a2b8; color:white; border:none; padding:6px 10px; border-radius:4px; cursor:pointer; font-size:12px;">👁️ Xem</button>
//                         </td>
//                     </tr>
//                 `;
//             }).join("");
//         }

//         // 3. Gọi hàm 15.3 để nhúng form Tạo mới vào
//         let htmlFormThemMoi = await window.ham_15_3_html_khu_vuc_tao_tu_luan();

//         // 4. Vẽ toàn bộ giao diện
//         vungLamViec.innerHTML = `
//             <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
//                 <h3 style="color: #28a745; margin: 0 0 20px 0; border-bottom: 2px solid #f8f9fa; padding-bottom: 15px;">
//                     📚 QUẢN LÝ KHO HỌC LIỆU TỰ LUẬN
//                 </h3>
                
//                 <div style="margin-bottom: 30px;">
//                     ${htmlFormThemMoi}
//                 </div>

//                 <h4 style="margin-top:0; color: #0f172a; margin-bottom: 15px;">📋 Danh sách đề bài trong kho:</h4>
//                 <div style="overflow-x: auto; border: 1px solid #e2e8f0; border-radius: 8px;">
//                     <table style="width: 100%; border-collapse: collapse; min-width: 700px;">
//                         <thead>
//                             <tr style="background-color: #f8fafc; color: #334155; font-size: 13px; text-align: center;">
//                                 <th style="padding: 12px; width: 50px; border-bottom: 1px solid #e2e8f0;">STT</th>
//                                 <th style="padding: 12px; text-align: left; border-bottom: 1px solid #e2e8f0;">TÊN HỌC LIỆU (ĐỀ BÀI)</th>
//                                 <th style="padding: 12px; width: 150px; border-bottom: 1px solid #e2e8f0;">DẠNG ĐỀ</th>
//                                 <th style="padding: 12px; width: 120px; border-bottom: 1px solid #e2e8f0;">NGÀY TẠO</th>
//                                 <th style="padding: 12px; width: 100px; border-bottom: 1px solid #e2e8f0;">THAO TÁC</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             ${chuoiCacDong}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         `;
//     } catch (error) {
//         console.error("Lỗi:", error);
//         vungLamViec.innerHTML = `<div style="text-align:center; padding: 30px; color: red;">❌ Lỗi: ${error.message}</div>`;
//     }
// };


// =====================================================================
// Hàm 15.1: Vẽ Form Tạo Mới Nhiệm Vụ Tự Luận (Đã tích hợp 15.3)
// =====================================================================
window.ham_15_1_ve_form_tao_nhiem_vu_tu_luan = async function () {
    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
    vungLamViec.innerHTML = `<div style="text-align:center; padding: 40px; color: #6f42c1; font-weight:bold;">⏳ Đang khởi tạo Form giao bài Tự Luận...</div>`;

    try {
        const headersAPI = { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` };

        // 1. Tải danh sách Lớp học để thầy cô tick chọn
        const resLop = await fetch(`${SUPABASE_URL}/rest/v1/lop_hoc?select=ma_lop,ten_lop&order=ten_lop.asc`, { method: 'GET', headers: headersAPI });
        const dataLop = await resLop.json();

        let chuoiCheckboxLop = "";
        if (dataLop && dataLop.length > 0) {
            chuoiCheckboxLop = dataLop.map(lop => `
                <label style="display: inline-flex; align-items: center; gap: 6px; background: white; padding: 8px 12px; border: 1px solid #ced4da; border-radius: 6px; cursor: pointer; font-size: 13px;">
                    <input type="checkbox" name="chk_lop_tu_luan" value="${lop.ma_lop}" style="width: 16px; height: 16px; margin: 0; accent-color: #6f42c1;"> 
                    <span style="font-weight: bold; color: #334155;">${lop.ten_lop}</span>
                </label>
            `).join("");
        }

        // 2. Gọi hàm 15.3 (đã sửa thành async) để lấy nguyên cái cụm giao diện Tạo/Chọn đề bài
        let htmlKhuVucTaoDe = await window.ham_15_3_html_khu_vuc_tao_tu_luan();

        // 3. Render toàn bộ Form
        vungLamViec.innerHTML = `
            <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); max-width: 900px; margin: 0 auto;">
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #f8f9fa; padding-bottom: 15px; margin-bottom: 20px;">
                    <h3 style="color: #6f42c1; margin: 0; font-size: 18px;">✍️ GIAO NHIỆM VỤ TỰ LUẬN MỚI</h3>
                    <button onclick="ham_7_1_ve_quan_ly_nhiem_vu()" style="padding: 8px 15px; background: #64748b; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight:bold;">
                        ⬅️ Quay Lại
                    </button>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <label style="font-weight: bold; font-size: 13px; color: #495057; display: block; margin-bottom: 5px;">Tên nhiệm vụ (*):</label>
                    <input type="text" id="txt_ten_nhiem_vu_tl" placeholder="Ví dụ: Bài tập về nhà tuần 4 - Tự luận Toán..." style="width: 100%; padding: 12px; border: 1px solid #ced4da; border-radius: 6px; font-weight: bold; font-size: 14px; box-sizing: border-box;">
                </div>

                <div style="margin-bottom: 20px;">
                    <label style="font-weight: bold; font-size: 13px; color: #495057; display: block; margin-bottom: 5px;">Giao cho các lớp (*):</label>
                    <div style="display: flex; gap: 10px; flex-wrap: wrap; background: #f8f9fa; padding: 15px; border-radius: 6px; border: 1px solid #e9ecef;">
                        ${chuoiCheckboxLop || '<span style="color:red; font-size:13px;">Chưa có dữ liệu lớp học. Vui lòng tạo lớp trước!</span>'}
                    </div>
                </div>

                <div style="margin-bottom: 25px; background: #fff3cd; padding: 15px; border-radius: 6px; border: 1px solid #ffe69c;">
                    <label style="font-weight: bold; font-size: 13px; color: #856404; display: block; margin-bottom: 5px;">⏳ Hạn chót nộp bài (Bỏ trống = Không giới hạn):</label>
                    <input type="datetime-local" id="txt_han_chot_tl" style="padding: 10px; border: 1px solid #ced4da; border-radius: 6px; font-weight: bold; width: 250px;">
                </div>

                ${htmlKhuVucTaoDe}

                <div style="text-align: right; border-top: 1px solid #e9ecef; padding-top: 20px;">
                    <button id="btn_luu_nv_tl" onclick="ham_15_2_thuc_thi_luu_nv_tu_luan()" style="padding: 15px 35px; background: #28a745; color: white; border: none; border-radius: 6px; font-weight: 900; font-size: 16px; cursor: pointer; box-shadow: 0 4px 6px rgba(40,167,69,0.3); transition: 0.2s;">
                        🚀 LƯU VÀ GIAO BÀI TỰ LUẬN
                    </button>
                </div>
            </div>
        `;

    } catch (error) {
        console.error("Lỗi:", error);
        vungLamViec.innerHTML = `<div style="text-align:center; padding: 30px; color: red;">❌ Lỗi khởi tạo form: ${error.message}</div>`;
    }
};

// =====================================================================
// Hàm 15.2: Thực thi Lưu Nhiệm vụ Tự Luận vào Database (Bảng Mới)
// =====================================================================
window.ham_15_2_thuc_thi_luu_nv_tu_luan = async function () {
    // 1. Thu thập dữ liệu từ giao diện
    const tenNhiemVu = document.getElementById('txt_ten_nhiem_vu_tl').value.trim();
    const hanChot = document.getElementById('txt_han_chot_tl').value;
    const maHocLieu = document.getElementById('add_nv_maHL_tu_luan').value;

    // Lấy danh sách lớp được tick chọn
    const checkboxesLop = document.querySelectorAll('input[name="chk_lop_tu_luan"]:checked');
    const mangLop = Array.from(checkboxesLop).map(cb => cb.value);

    // 2. Kiểm tra tính hợp lệ
    if (!tenNhiemVu) return alert("❌ Thầy/cô chưa nhập tên nhiệm vụ!");
    if (mangLop.length === 0) return alert("❌ Thầy/cô chưa chọn lớp nào để giao bài!");
    if (!maHocLieu || maHocLieu === "KHONG_DUNG") return alert("❌ Thầy/cô chưa chọn đề bài từ Kho học liệu!");

    // Đổi giao diện nút bấm để tránh click nhiều lần
    const btnLuu = document.getElementById('btn_luu_nv_tl');
    btnLuu.disabled = true;
    btnLuu.innerText = "⏳ ĐANG GIAO BÀI...";

    try {
        // Khởi tạo an toàn cho biến State (Khắc phục triệt để lỗi is not defined)
        window.BangNhiemVuState = window.BangNhiemVuState || [];

        // 3. Đóng gói dữ liệu
        const payload = {
            ma_nhiem_vu: "NV_TL_" + ham_15_tao_ma_6_ky_tu(),
            ten_nhiem_vu: tenNhiemVu,
            ma_hoc_lieu: maHocLieu,
            danh_sach_lop: mangLop, // Supabase sẽ tự lưu mảng này thành JSONB
            thoi_gian_dong: hanChot ? new Date(hanChot).toISOString() : null,
            trang_thai: 1, // 1 = Đang mở
            uid_gv_tao: (typeof AppState !== 'undefined' && AppState.user) ? AppState.user.uid : null
            // Bỏ qua ngay_tao vì DB tự động sinh (created_at)
        };

        // 4. Lưu vào bảng MỚI
        const { error } = await _supabase.from('nhiem_vu_tu_luan').insert([payload]);
        if (error) throw error;

        alert("✅ Giao bài Tự luận thành công!");

        // 5. Quay trở lại màn hình quản lý (Nếu có hàm của Khối 7b thì gọi, nếu không thì tải lại trang)
        if (typeof ham_7b_1_ve_quan_ly_nhiem_vu_tu_luan === 'function') {
            ham_7b_1_ve_quan_ly_nhiem_vu_tu_luan();
        } else if (typeof ham_7_1_ve_quan_ly_nhiem_vu === 'function') {
            ham_7_1_ve_quan_ly_nhiem_vu();
        } else {
            location.reload();
        }

    } catch (error) {
        console.error("Lỗi khi lưu nhiệm vụ:", error);
        alert("❌ Đã xảy ra lỗi: " + error.message);
        btnLuu.disabled = false;
        btnLuu.innerText = "🚀 LƯU VÀ GIAO BÀI TỰ LUẬN";
    }
};

// // --- [ĐÃ SỬA] Hàm 15.3: Giao diện Tự luận (Tự động tải dữ liệu từ bảng mới) ---
// window.ham_15_3_html_khu_vuc_tao_tu_luan = async function () {
//     let htmlOptionsHL = `<option value="KHONG_DUNG">[ --- Chọn Học liệu tự luận (File/Văn bản) --- ]</option>`;
// console.log("DEBUG: Bắt đầu tải danh sách học liệu tự luận từ Supabase...");
//     try {
//         // 1. Tự động gọi API lấy danh sách Học liệu Tự luận từ bảng mới
//         const { data: dataHL, error } = await _supabase
//             .from('hoc_lieu_tu_luan')
//             .select('ma_hoc_lieu, ten_hoc_lieu, metadata')
//             .order('ngay_tao', { ascending: false });

//             console.log("DEBUG: Kết quả tải học liệu tự luận:", { dataHL, error });
//         if (!error && dataHL) {
//             // Lưu tạm vào RAM để các hàm khác (như tạo text mới) có thể dùng chung
//             window.tempDsHocLieuTuLuan = dataHL;

//             dataHL.forEach(hl => {
//                 const meta = typeof hl.metadata === 'string' ? JSON.parse(hl.metadata || '{}') : (hl.metadata || {});
//                 // Biểu tượng icon tùy theo loại (văn bản hay file)
//                 const icon = meta.kieu_de_tu_luan === 'van_ban' ? '✍️' : '📁';
//                 htmlOptionsHL += `<option value="${hl.ma_hoc_lieu}">${icon} [${hl.ma_hoc_lieu}] - ${hl.ten_hoc_lieu}</option>`;
//             });
//         }
//     } catch (err) {
//         console.error("Lỗi khi tải kho học liệu tự luận:", err);
//     }

//     // 2. Trả về khối HTML y như cũ
//     return `
//         <div id="khu_vuc_tu_luan" style="display: block; background: #f8f9fa; padding: 15px; border-radius: 8px; border: 1px dashed #17a2b8; margin-bottom: 15px;">
//             <label style="font-weight: bold; color: #17a2b8; font-size: 13px;">📝 NGUỒN ĐỀ BÀI TỰ LUẬN:</label>
//             <div style="margin-top: 10px; display: flex; gap: 20px; font-size: 14px; font-weight: bold; color: #495057;">
//                 <label style="cursor: pointer;">
//                     <input type="radio" name="loai_de_tu_luan" value="file" checked onchange="ham_15_5_doi_nguon_tu_luan()"> 
//                     📂 Chọn từ Kho (File/Văn bản đã có)
//                 </label>
//                 <label style="cursor: pointer;">
//                     <input type="radio" name="loai_de_tu_luan" value="text" onchange="ham_15_5_doi_nguon_tu_luan()"> 
//                     ✍️ Soạn nội dung mới
//                 </label>
//             </div>
            
//             <div id="khung_tu_luan_file" style="margin-top: 15px; display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
//                 <select id="add_nv_maHL_tu_luan" style="flex: 1; min-width: 200px; padding: 10px; border: 1px solid #ced4da; border-radius: 6px; font-weight: bold;">
//                     ${htmlOptionsHL}
//                 </select>
//                 <button type="button" onclick="ham_7_copy_text_combobox('add_nv_maHL_tu_luan', this)" style="padding: 10px 15px; background: #e9ecef; color: #495057; border: 1px solid #ced4da; border-radius: 6px; font-weight: bold; cursor: pointer;">
//                     📋 Copy Text
//                 </button>
//                 <button type="button" onclick="ham_15_8_mo_popup_upload_tu_luan()" style="padding: 10px 15px; background: #fd7e14; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; box-shadow: 0 2px 4px rgba(253,126,20,0.3);">
//                     ➕ Tải file mới lên
//                 </button>
//             </div>

//             <div id="khung_tu_luan_text" style="display: none; margin-top: 15px; background: white; padding: 15px; border-radius: 6px; border: 1px solid #dee2e6;">
//                 <div style="margin-bottom: 10px;">
//                     <label style="font-weight: bold; font-size: 13px; display: block; margin-bottom: 5px; color: #333;">Tên Học Liệu Văn Bản (*):</label>
//                     <input type="text" id="text_ten_hl_tu_luan" placeholder="Ví dụ: Bài tập tự luận Tuần 24 - Khảo sát hàm số..." style="width: 100%; padding: 10px; border: 1px solid #ced4da; border-radius: 6px; font-weight: bold;">
//                 </div>
//                 <div style="margin-bottom: 15px;">
//                     <label style="font-weight: bold; font-size: 13px; display: block; margin-bottom: 5px; color: #333;">Nội dung chi tiết đề bài (*):</label>
//                     <textarea id="text_de_tu_luan" placeholder="Thầy gõ nội dung đề bài tự luận hoặc yêu cầu tại đây..." style="width: 100%; height: 120px; padding: 10px; border-radius: 6px; border: 1px solid #ced4da; font-family: inherit; font-size: 14px; resize: vertical;"></textarea>
//                 </div>
//                 <button type="button" id="btn_tao_hl_text" onclick="ham_15_10_tao_hoc_lieu_text()" style="padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; display: inline-flex; align-items: center; box-shadow: 0 2px 4px rgba(0,123,255,0.3);">
//                     💾 TẠO HỌC LIỆU VĂN BẢN
//                 </button>
//             </div>
//         </div>
//     `;
// };


// --- [ĐÃ SỬA] Hàm 15.3: Giao diện Tự luận (Tự động tải dữ liệu từ bảng mới) ---
window.ham_15_3_html_khu_vuc_tao_tu_luan = async function () {
    let htmlOptionsHL = `<option value="KHONG_DUNG">[ --- Chọn Học liệu tự luận (File/Văn bản) --- ]</option>`;

    try {
        // Gọi thẳng vào bảng MỚI, sắp xếp theo ngay_tao
        const { data: dataHL, error } = await _supabase
            .from('hoc_lieu_tu_luan')
            .select('ma_hoc_lieu, ten_hoc_lieu, metadata')
            .order('ngay_tao', { ascending: false });

        if (!error && dataHL) {
            window.tempDsHocLieuTuLuan = dataHL;
            dataHL.forEach(hl => {
                const meta = typeof hl.metadata === 'string' ? JSON.parse(hl.metadata || '{}') : (hl.metadata || {});
                const isText = meta.loai_tu_luan === 'text' || meta.kieu_de_tu_luan === 'van_ban';
                const icon = isText ? '✍️' : '📁';
                htmlOptionsHL += `<option value="${hl.ma_hoc_lieu}">${icon} [${hl.ma_hoc_lieu}] - ${hl.ten_hoc_lieu}</option>`;
            });
        }
    } catch (err) {
        console.error("Lỗi khi tải kho học liệu tự luận:", err);
    }

    return `
        <div id="khu_vuc_tu_luan" style="display: block; background: #f8f9fa; padding: 15px; border-radius: 8px; border: 1px dashed #17a2b8; margin-bottom: 15px;">
            <label style="font-weight: bold; color: #17a2b8; font-size: 13px;">📝 NGUỒN ĐỀ BÀI TỰ LUẬN:</label>
            <div style="margin-top: 10px; display: flex; gap: 20px; font-size: 14px; font-weight: bold; color: #495057;">
                <label style="cursor: pointer;">
                    <input type="radio" name="loai_de_tu_luan" value="file" checked onchange="ham_15_5_doi_nguon_tu_luan()"> 
                    📂 Chọn từ Kho (File/Văn bản đã có)
                </label>
                <label style="cursor: pointer;">
                    <input type="radio" name="loai_de_tu_luan" value="text" onchange="ham_15_5_doi_nguon_tu_luan()"> 
                    ✍️ Soạn nội dung mới
                </label>
            </div>
            
            <div id="khung_tu_luan_file" style="margin-top: 15px; display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
                <select id="add_nv_maHL_tu_luan" style="flex: 1; min-width: 200px; padding: 10px; border: 1px solid #ced4da; border-radius: 6px; font-weight: bold;">
                    ${htmlOptionsHL}
                </select>
                <button type="button" onclick="ham_7_copy_text_combobox('add_nv_maHL_tu_luan', this)" style="padding: 10px 15px; background: #e9ecef; color: #495057; border: 1px solid #ced4da; border-radius: 6px; font-weight: bold; cursor: pointer;">
                    📋 Copy Text
                </button>
                <button type="button" onclick="ham_15_8_mo_popup_upload_tu_luan()" style="padding: 10px 15px; background: #fd7e14; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; box-shadow: 0 2px 4px rgba(253,126,20,0.3);">
                    ➕ Tải file mới lên
                </button>
            </div>

            <div id="khung_tu_luan_text" style="display: none; margin-top: 15px; background: white; padding: 15px; border-radius: 6px; border: 1px solid #dee2e6;">
                <div style="margin-bottom: 10px;">
                    <label style="font-weight: bold; font-size: 13px; display: block; margin-bottom: 5px; color: #333;">Tên Học Liệu Văn Bản (*):</label>
                    <input type="text" id="text_ten_hl_tu_luan" placeholder="Ví dụ: Bài tập tự luận Tuần 24..." style="width: 100%; padding: 10px; border: 1px solid #ced4da; border-radius: 6px; font-weight: bold;">
                </div>
                <div style="margin-bottom: 15px;">
                    <label style="font-weight: bold; font-size: 13px; display: block; margin-bottom: 5px; color: #333;">Nội dung chi tiết đề bài (*):</label>
                    <textarea id="text_de_tu_luan" placeholder="Gõ nội dung đề bài tự luận tại đây..." style="width: 100%; height: 120px; padding: 10px; border-radius: 6px; border: 1px solid #ced4da; font-family: inherit; font-size: 14px; resize: vertical;"></textarea>
                </div>
                <button type="button" id="btn_tao_hl_text" onclick="ham_15_10_tao_hoc_lieu_text()" style="padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; display: inline-flex; align-items: center; box-shadow: 0 2px 4px rgba(0,123,255,0.3);">
                    💾 TẠO HỌC LIỆU VĂN BẢN
                </button>
            </div>
        </div>
    `;
};




// --- Hàm 15.4: Bật/Tắt phân hệ tự luận và Ẩn/Hiện cấu hình Trắc nghiệm ---
window.ham_15_4_doi_loai_nhiem_vu = function() {
    const loaiNhiemVu = document.getElementById('add_nv_loai');
    const khuVucTuLuan = document.getElementById('khu_vuc_tu_luan');
    
    // 1. Các thành phần của Học liệu Trắc nghiệm
    const cbTracNghiemContainer = document.getElementById('add_nv_maHL')?.parentElement; 
    const thongTinPhuHL = document.getElementById('khu_vuc_thong_tin_hl'); 
    
    // 2. Các thành phần cấu hình không dùng cho Tự luận (Tìm thẻ div cha chứa nó)
    const boxThoiGian = document.getElementById('add_nv_thoigian')?.parentElement;
    const boxSoLuot = document.getElementById('add_nv_soluot')?.parentElement;
    const boxDaoDe = document.getElementById('add_nv_che_do_dao')?.parentElement;
    
    // 3. Khu vực 4: Công bố & Bảo mật (Bao gồm cả Tạo file lời giải gộp)
    let boxCongBo = null;
    const selectCongBo = document.getElementById('add_nv_thoigiano');
    if (selectCongBo) {
        // Lấy thẻ <div style="background: #e6ffed..."> bao bọc ngoài cùng của phần Công bố
        boxCongBo = selectCongBo.parentElement.parentElement.parentElement;
    }
    
    if (!loaiNhiemVu || !khuVucTuLuan) return;

    if (loaiNhiemVu.value === 'Tự luận (Nộp ảnh)') {
        // HIỆN khu vực cấu hình Tự luận
        khuVucTuLuan.style.display = 'block'; 
        
        // ẨN toàn bộ các cấu hình dư thừa của Trắc nghiệm
        if (cbTracNghiemContainer) cbTracNghiemContainer.style.display = 'none'; 
        if (thongTinPhuHL) thongTinPhuHL.style.display = 'none'; 
        if (boxThoiGian) boxThoiGian.style.display = 'none';
        if (boxSoLuot) boxSoLuot.style.display = 'none';
        if (boxDaoDe) boxDaoDe.style.display = 'none';
        if (boxCongBo) boxCongBo.style.display = 'none';

        // Tự động xóa giá trị thời gian/số lượt cũ để database lưu thông tin sạch sẽ
        if (document.getElementById('add_nv_thoigian')) document.getElementById('add_nv_thoigian').value = "";
        if (document.getElementById('add_nv_soluot')) document.getElementById('add_nv_soluot').value = "";

        ham_15_5_doi_nguon_tu_luan(); // Chạy lại hàm điều khiển file/text
    } else {
        // ẨN khu vực Tự luận
        khuVucTuLuan.style.display = 'none'; 
        
        // HIỆN LẠI các cấu hình Trắc nghiệm để dùng bình thường
        if (cbTracNghiemContainer) cbTracNghiemContainer.style.display = 'flex'; 
        if (thongTinPhuHL) thongTinPhuHL.style.display = 'grid'; 
        if (boxThoiGian) boxThoiGian.style.display = 'flex';
        if (boxSoLuot) boxSoLuot.style.display = 'flex';
        if (boxDaoDe) boxDaoDe.style.display = 'block';
        if (boxCongBo) boxCongBo.style.display = 'block';
    }
};

// --- Hàm 15.5: Điều khiển ẩn/hiện Phân hệ nguồn đề tự luận ---
window.ham_15_5_doi_nguon_tu_luan = function() {
    const nguonChon = document.querySelector('input[name="loai_de_tu_luan"]:checked').value;
    document.getElementById('khung_tu_luan_file').style.display = (nguonChon === 'file' ? 'flex' : 'none');
    document.getElementById('khung_tu_luan_text').style.display = (nguonChon === 'text' ? 'block' : 'none');
};

// --- Hàm 15.6: Thu thập dữ liệu và kiểm tra mã học liệu trước khi lưu nhiệm vụ ---
window.ham_15_6_lay_du_lieu_tu_luan_de_luu = function() {
    const nguonChon = document.querySelector('input[name="loai_de_tu_luan"]:checked').value;
    
    // Trường hợp thầy đang để ở giao diện gõ nội dung mà chưa bấm nút lưu học liệu
    if (nguonChon === 'text') {
        const noiDungText = document.getElementById('text_de_tu_luan').value.trim();
        if (noiDungText) {
            return { error: "Thầy ơi, thầy quên chưa bấm nút 'TẠO HỌC LIỆU VĂN BẢN' ở phía dưới để nạp đề bài vào kho học liệu kìa!" };
        }
        return { error: "Thầy chưa lựa chọn hoặc chưa tạo cấu trúc học liệu tự luận nào!" };
    }

    // Lấy mã học liệu hiện tại đang hiển thị trên Combobox Tự luận
    const maHL = document.getElementById('add_nv_maHL_tu_luan').value;
    if (!maHL || maHL === "KHONG_DUNG") return { error: "Thầy chưa chọn bất kỳ học liệu tài liệu nào từ danh sách kho tự luận!" };
    
    // Tìm kiếm thông tin học liệu trong mảng cục bộ để xác định kiểu hiển thị cho học sinh (Khối 16)
    const hlData = window.tempDsHocLieu.find(hl => hl.ma_hoc_lieu === maHL);
    const metaHL = hlData ? (typeof hlData.metadata === 'string' ? JSON.parse(hlData.metadata) : hlData.metadata || {}) : {};
    
    // Trả về cấu trúc phân hệ tương ứng: 'text' hoặc 'file' dựa trên metadata đã lưu của học liệu
    const kieuDeTuLuan = metaHL.loai_tu_luan === 'text' ? 'text' : 'file';

    return { maHocLieu: maHL, metadata: { kieu_de_tu_luan: kieuDeTuLuan } };
};


// --- Hàm 15.8: Cửa sổ mở Popup tải file mới lên ---
window.ham_15_8_mo_popup_upload_tu_luan = function() {
    const oldPopup = document.getElementById('popup_upload_hl_tu_luan');
    if (oldPopup) oldPopup.remove();

    const overlay = document.createElement('div');
    overlay.id = "popup_upload_hl_tu_luan";
    overlay.style = "position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.6); z-index: 10000; display: flex; align-items: center; justify-content: center;";
    
    overlay.innerHTML = `
        <div style="background: white; width: 400px; padding: 25px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); font-family: Arial, sans-serif;">
            <div style="display: flex; justify-content: space-between; border-bottom: 2px solid #f1f3f4; padding-bottom: 10px; margin-bottom: 15px;">
                <h3 style="margin: 0; color: #fd7e14; font-size: 16px;">📁 Tải học liệu tự luận mới (Dạng File)</h3>
                <button onclick="document.getElementById('popup_upload_hl_tu_luan').remove()" style="background: none; border: none; font-size: 20px; cursor: pointer; color: #999;">✖</button>
            </div>
            
            <div style="margin-bottom: 15px;">
                <label style="font-weight: bold; font-size: 13px; display: block; margin-bottom: 5px;">Tên Học Liệu (*):</label>
                <input type="text" id="ten_hl_moi_popup" placeholder="Ví dụ: Phiếu bài tập hình học số 2..." style="width: 100%; padding: 10px; border: 1px solid #ced4da; border-radius: 6px;">
            </div>

            <div style="margin-bottom: 20px;">
                <label style="font-weight: bold; font-size: 13px; display: block; margin-bottom: 5px;">Chọn File (PDF, Word, Ảnh...):</label>
                <input type="file" id="file_hl_moi_popup" accept=".pdf, .doc, .docx, image/*" style="width: 100%; padding: 8px; border: 1px dashed #6f42c1; border-radius: 6px; background: #f8f9fa;">
            </div>

            <button id="btn_thuc_thi_upload" onclick="ham_15_9_thuc_thi_upload_drive()" style="width: 100%; padding: 12px; background: #28a745; color: white; border: none; border-radius: 6px; font-weight: bold; font-size: 15px; cursor: pointer;">
                🚀 TẢI LÊN GOOGLE DRIVE
            </button>
        </div>
    `;
    document.body.appendChild(overlay);
};

// --- Hàm 15.9: Thực thi đẩy file lên Drive và tạo học liệu ---
window.ham_15_9_thuc_thi_upload_drive = async function() {
    const tenHL = document.getElementById('ten_hl_moi_popup').value.trim();
    const fileInput = document.getElementById('file_hl_moi_popup');
    const btnUpload = document.getElementById('btn_thuc_thi_upload');

    if (!tenHL) return alert("❌ Thầy chưa nhập tên học liệu!");
    if (!fileInput.files || fileInput.files.length === 0) return alert("❌ Thầy chưa chọn file!");

    const file = fileInput.files[0];
    btnUpload.disabled = true;
    btnUpload.innerText = "⏳ Đang chuẩn bị dữ liệu...";

    try {
        // 🌟 BƯỚC 1: XÁC ĐỊNH TAG ĐỊNH DẠNG VÀ TẠO MÃ HỌC LIỆU
        const ext = file.name.split('.').pop().toLowerCase();
        let tagDinhDang = ext.toUpperCase();
        
        // Khởi tạo mã học liệu (Ví dụ: HL_TL_PDF_123456)
        const maHLMoi = `HL_TL_${tagDinhDang}_` + ham_15_tao_ma_6_ky_tu();

        // 🌟 BƯỚC 2: TÊN FILE TRÊN DRIVE ĐÚNG CHUẨN [MÃ HL].[ĐUÔI]
        const tenFileGoiLenDrive = `${maHLMoi}.${ext}`;

        // BƯỚC 3: ĐỌC FILE VÀ BẮN LÊN GOOGLE DRIVE
        btnUpload.innerText = "⏳ Đang đẩy file lên Google Drive...";
        const base64Data = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result.split(',')[1]);
            reader.onerror = (e) => reject("Lỗi đọc file");
            reader.readAsDataURL(file);
        });

        // // Gọi API lên Apps Script
        // const response = await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_TU_LUAN, { 
        //     method: "POST",
        //     body: JSON.stringify({ 
        //         action: "upload_hoc_lieu", 
        //         fileName: tenFileGoiLenDrive, // Tên file đã chuẩn hóa theo Mã HL
        //         mimeType: file.type, 
        //         base64Data: base64Data 
        //     })
        // });
        

        const response = await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_TU_LUAN, {
    method: "POST",
    body: JSON.stringify({ 
        action: "upload_hoc_lieu", 
        // 👇 TRẢ LẠI ĐÚNG CẤU TRÚC: [Mã HL] - [Tên HL Sạch] - [Tên file gốc]
        fileName: `${maHLMoi} - ${tenHL} - ${file.name}`, 
        mimeType: file.type, 
        base64Data: base64Data 
    })
});


        const result = await response.json();
        console.log("DEBUG: Google trả về:", result); // <--- Thêm dòng này
        if (result.status !== "success") throw new Error(result.message);

        // 🌟 BƯỚC 4: LƯU VÀO DATABASE SUPABASE
        btnUpload.innerText = "⏳ Đang lưu vào hệ thống...";
        const hocLieuMoi = {
            ma_hoc_lieu: maHLMoi,
            ten_hoc_lieu: tenHL,
            url_github: result.url, // URL file trên Drive
            metadata: { 
                loai_tu_luan: 'file', 
                kieu_mimetype: file.type, 
                dinh_dang: tagDinhDang,
                ten_file_goc: file.name, // Lưu tên gốc để hiển thị cho thầy biết
                ngay_cap_nhat: new Date().toISOString()
            },
            ngay_tao: new Date().toISOString(),
            // 🌟 Thêm dòng này để lưu UID người tạo
            uid_gv_tao: (typeof AppState !== 'undefined' && AppState.user) ? AppState.user.uid : null
        };

        const { error } = await _supabase.from('hoc_lieu_tu_luan').insert([hocLieuMoi]);
        if (error) throw error;

        // 🌟 BƯỚC 5: CẬP NHẬT GIAO DIỆN
        if (window.tempDsHocLieu) window.tempDsHocLieu.unshift(hocLieuMoi);
        
        const cbTuLuan = document.getElementById('add_nv_maHL_tu_luan');
        if (cbTuLuan) {
            const optionMoi = document.createElement('option');
            optionMoi.value = maHLMoi;
            optionMoi.innerHTML = `📁 [${maHLMoi}] - ${tenHL}`;
            cbTuLuan.insertBefore(optionMoi, cbTuLuan.options[1]); 
            cbTuLuan.value = maHLMoi; 
        }

        alert(`✅ Đã tải file thành công lên hệ thống!\nĐịnh danh trên Drive: ${tenFileGoiLenDrive}`);
        document.getElementById('popup_upload_hl_tu_luan').remove();

    } catch (error) {
        alert("❌ Lỗi upload file: " + error.message);
        btnUpload.disabled = false;
        btnUpload.innerText = "🔄 Thử lại";
    }
};
// --- Hàm 15.10: Xử lý tạo Học liệu Text trực tiếp (Chỉ nạp Database, Không tạo file) ---
window.ham_15_10_tao_hoc_lieu_text = async function() {
    const tenHL = document.getElementById('text_ten_hl_tu_luan').value.trim();
    const noiDungText = document.getElementById('text_de_tu_luan').value.trim();
    const btnTao = document.getElementById('btn_tao_hl_text');

    if (!tenHL) return alert("❌ Thầy chưa nhập Tên Học Liệu Văn Bản kìa!");
    if (!noiDungText) return alert("❌ Thầy chưa nhập Nội dung chi tiết đề bài!");

    btnTao.disabled = true;
    btnTao.innerText = "⏳ Đang nạp thẳng vào Cơ sở dữ liệu...";

    try {
        // 1. Khởi tạo mã
        const maHLText = "HL_TL_TXT_" + ham_15_tao_ma_6_ky_tu();

        // 2. Không gọi API Google Drive nữa, nạp trực tiếp vào Supabase
        const hocLieuTextMoi = {
            ma_hoc_lieu: maHLText,
            ten_hoc_lieu: tenHL,
            url_github: "", // 🌟 Để trống URL
            metadata: { 
                loai_tu_luan: "text", 
                noi_dung_chinh: noiDungText,
                định_dạng: "TXT"
            },
            ngay_tao: new Date().toISOString()
        };

        const { error } = await _supabase.from('hoc_lieu_tu_luan').insert([hocLieuTextMoi]);
        if (error) throw error;

        // 3. Cập nhật lại giao diện ngay tức thì
        if (window.tempDsHocLieu) window.tempDsHocLieu.unshift(hocLieuTextMoi);

        const cbTuLuan = document.getElementById('add_nv_maHL_tu_luan');
        if (cbTuLuan) {
            const optionMoi = document.createElement('option');
            optionMoi.value = maHLText;
            optionMoi.innerHTML = `✍️ [${maHLText}] - ${tenHL}`;
            cbTuLuan.insertBefore(optionMoi, cbTuLuan.options[1]); 
            cbTuLuan.value = maHLText; 
        }

        alert(`🎉 Đã tạo học liệu văn bản và nạp kho thành công!`);
        
        // Dọn dẹp form
        document.getElementById('text_ten_hl_tu_luan').value = "";
        document.getElementById('text_de_tu_luan').value = "";

        // Tự động chuyển qua tab "Chọn từ Kho"
        const radioFile = document.querySelector('input[name="loai_de_tu_luan"][value="file"]');
        if (radioFile) {
            radioFile.checked = true;
            ham_15_5_doi_nguon_tu_luan(); 
        }

    } catch (error) {
        alert("❌ Thao tác thất bại: " + error.message);
    } finally {
        btnTao.disabled = false;
        btnTao.innerText = "💾 TẠO HỌC LIỆU VĂN BẢN";
    }
};



// ==============================================================================
// KHỐI 15: PLUGIN XỬ LÝ FORM HỌC LIỆU NGOÀI TRẮC NGHIỆM (NHÚNG VÀO KHỐI 6)
// ==============================================================================



// =====================================================================
// Hàm 15.11: HTML Form cấu hình nhiệm vụ tự luận (Đề, Giải, Cấu hình)
// =====================================================================
window.ham_15_11_html_form_hoc_lieu_khac = function(loaiChon) {
    const isText = (loaiChon === 'TL_TXT');
    
    return `
        <div style="padding: 20px; border: 2px dashed #6f42c1; border-radius: 8px; background: #fdfbfe; box-sizing: border-box;">
            <h4 style="margin-top: 0; color: #6f42c1; display: flex; align-items: center; gap: 6px; margin-bottom: 20px;">
                📦 CẤU HÌNH ĐỀ & BÀI GIẢI
            </h4>

            <div style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px dashed #ced4da;">
                <h5 style="margin: 0 0 10px 0; color: #495057;">1️⃣ ĐỀ BÀI</h5>
                ${isText ? `
                    <textarea id="txt_noi_dung_khac_k15" rows="4" style="width:100%; padding: 10px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; font-family: inherit;" placeholder="Gõ nội dung đề bài tại đây..."></textarea>
                ` : `
                    <input type="file" id="upload_file_khac_k15" style="width:100%; padding: 10px; border: 1px solid #ced4da; border-radius: 6px; background: white; box-sizing: border-box; cursor: pointer;">
                `}
            </div>

            <div style="margin-bottom: 10px;">
                <label style="display: inline-flex; align-items: center; gap: 8px; cursor: pointer; background: #fffdf5; padding: 8px 12px; border-radius: 6px; border: 1px solid #f39c12;">
                    <input type="checkbox" id="chk_co_dap_an_k15" onchange="document.getElementById('khu_vuc_dap_an_k15').style.display = this.checked ? 'block' : 'none';" style="width: 18px; height: 18px; cursor: pointer; accent-color: #d35400;">
                    <b style="color: #d35400; font-size: 14px;">Kèm theo Bài giải / Đáp án chi tiết</b>
                </label>
            </div>

            <div id="khu_vuc_dap_an_k15" style="display: none; border-left: 3px solid #d35400; padding-left: 15px; margin-bottom: 20px; margin-top: 15px;">
                <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 10px;">
                    <h5 style="margin: 0; color: #d35400;">Nguồn đáp án:</h5>
                    <select id="select_loai_giai_k15" onchange="window.ham_15_17_toggle_loai_giai(this.value)" style="padding: 6px; border-radius: 4px; border: 1px solid #ced4da;">
                        <option value="FILE">📎 Tải file đính kèm (PDF/Ảnh)</option>
                        <option value="TEXT">📝 Nhập văn bản trực tiếp</option>
                    </select>
                </div>

                <div id="vung_giai_file_k15">
                    <input type="file" id="upload_file_giai_k15" onchange="window.ham_15_16_hien_thi_ten_file_giai(this)" multiple accept=".pdf, image/png, image/jpeg" style="width:100%; padding: 10px; border: 1px solid #ced4da; border-radius: 6px; background: white; box-sizing: border-box; margin-bottom: 8px; cursor: pointer;">
                    <div id="hien_thi_ten_file_giai_k15" style="font-size: 13px; color: #1a73e8; font-weight: bold; min-height: 24px; padding: 5px 8px; background: #e9ecef; border-radius: 4px; display: none;"></div>
                </div>

                <div id="vung_giai_text_k15" style="display: none;">
                    <textarea id="txt_noi_dung_giai_k15" rows="4" style="width:100%; padding: 10px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; font-family: inherit;" placeholder="Gõ nội dung bài giải vào đây..."></textarea>
                </div>

                <div style="margin-top: 15px; padding-top: 15px; border-top: 1px dashed #ced4da; display: flex; gap: 15px; flex-wrap: wrap;">
                <div style="flex: 1; min-width: 250px;">
                    <label style="font-weight: bold; color: #495057; font-size: 13px; display: block; margin-bottom: 6px;">👁️ Quyền xem đáp án:</label>
                    <select id="select_muc_do_dapan_k15" style="width: 100%; padding: 9px; border: 1px solid #ced4da; border-radius: 6px; background: white; font-size: 13px; cursor: pointer;">
        <option value="1">🔒 1. Không cho xem</option>
        <option value="2">📤 2. Cho xem sau khi nộp</option>
        <option value="3" selected>📝 3. Cho xem sau khi chấm</option>
    </select>
</div>
                
                
                </div>
            </div>
        </div>
    `;
};

// --- Hàm 15.12: Thực thi đẩy file lên Google Drive và Lưu DB (Gọi từ Khối 6) ---
window.ham_15_12_luu_hoc_lieu_khac = async function(maHL, tenHL, phanLoai, loaiKiemTra, khoiLop, thoiGian, trangThai, btn) {
    btn.disabled = true;
    btn.style.cursor = "wait";
    const uidGiaoVien = (typeof AppState !== 'undefined' && AppState.user && AppState.user.uid) ? AppState.user.uid : null;

    try {
        let urlDrive = "";
        let urlGiaiDrive = null; 
        
        let metadataObj = { 
            loai_tu_luan: phanLoai === 'TL_TXT' ? 'text' : 'file',
            định_dạng: phanLoai.split('_')[1] || "FILE",
            phan_loai_goc: phanLoai
        };

        const tenHLSach = tenHL.replace(/[\\/:*?"<>|]/g, ""); 
        let tenFileDeKhongDuoi = tenHLSach; 
        
        // =====================================================================
        // 🛠️ HÀM PHỤ: Xử lý đọc Base64 và Đẩy lên Google Drive
        // =====================================================================
        const uploadFileLenDrive = async (fileUpload, customFileName) => {
            const base64Data = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target.result.split(',')[1]);
                reader.onerror = (e) => reject("Lỗi đọc tệp");
                reader.readAsDataURL(fileUpload);
            });

            const response = await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_TU_LUAN, {
                method: "POST",
                body: JSON.stringify({ 
                    action: "upload_hoc_lieu", 
                    fileName: customFileName, 
                    mimeType: fileUpload.type, 
                    base64Data: base64Data 
                })
            });
            const result = await response.json();
            if (result.status !== "success") throw new Error(result.message || "Lỗi tải tệp lên Drive");
            if (!result.url) alert(`⚠️ CẢNH BÁO: Tệp đã lên Drive nhưng không có link trả về!`);
            return result.url;
        };

        // =====================================================================
        // 1️⃣ XỬ LÝ ĐỀ BÀI 
        // =====================================================================
        if (phanLoai === 'TL_TXT') {
            const txtElement = document.getElementById('txt_noi_dung_khac_k15');
            if (!txtElement) throw new Error("Lỗi giao diện: Không tìm thấy ô nhập văn bản đề bài!");
            
            const noiDungText = txtElement.value.trim();
            if (!noiDungText) throw new Error("Thầy chưa nhập nội dung đề bài!");
            
            urlDrive = ""; 
            metadataObj.noi_dung_chinh = noiDungText;
        } else {
            const fileInput = document.getElementById('upload_file_khac_k15');
            if (!fileInput) throw new Error("Lỗi giao diện: Không tìm thấy nút chọn file đề bài!");
            if (!fileInput.files || fileInput.files.length === 0) throw new Error("Thầy chưa chọn file Đề bài đính kèm!");
            
            const fileDe = fileInput.files[0];
            const tenFileDeHoanChinh = fileDe.name;
            tenFileDeKhongDuoi = tenFileDeHoanChinh.substring(0, tenFileDeHoanChinh.lastIndexOf('.')) || tenFileDeHoanChinh;
            
            const tenCustomDe = `${maHL} - ${tenHLSach} - ${tenFileDeHoanChinh}`;

            btn.innerText = "⏳ Đang tải file ĐỀ BÀI lên Drive...";
            urlDrive = await uploadFileLenDrive(fileDe, tenCustomDe);
            metadataObj.kieu_mimetype = fileDe.type;
            metadataObj.ten_file_goc = tenFileDeHoanChinh;
        }

        // =====================================================================
        // 2️⃣ XỬ LÝ BÀI GIẢI (Phân nhánh Tùy chọn)
        // =====================================================================
        const chkCoDapAn = document.getElementById('chk_co_dap_an_k15');
        // Lấy giá trị mức độ từ Select (mặc định là 3 nếu thầy đã để selected trong HTML)
        const mucDoDapAn = parseInt(document.getElementById('select_muc_do_dapan_k15').value) || 3;

        console.log("Mức độ đáp án:", mucDoDapAn);

        if (chkCoDapAn && chkCoDapAn.checked) {
            metadataObj.cau_hinh_dap_an = {  muc_do: mucDoDapAn };
            

            const loaiGiai = document.getElementById('select_loai_giai_k15').value;
            
            if (loaiGiai === 'TEXT') {
                const txtGiai = document.getElementById('txt_noi_dung_giai_k15').value.trim();
                if (!txtGiai) throw new Error("Thầy đã chọn nhập văn bản đáp án nhưng lại để trống!");
                metadataObj.noi_dung_giai_text = txtGiai; 
            } else {
                const fileGiaiInput = document.getElementById('upload_file_giai_k15');
                const vungHienThiGiai = document.getElementById('hien_thi_ten_file_giai_k15'); 

                if (!fileGiaiInput || !fileGiaiInput.files || fileGiaiInput.files.length === 0) {
                    throw new Error("Thầy đã chọn đính kèm file đáp án nhưng chưa chọn tệp nào!");
                }

                let fileGiaiChinhThuc = null;
                if (fileGiaiInput.files.length === 1) {
                    fileGiaiChinhThuc = fileGiaiInput.files[0];
                } else {
                    btn.innerText = "⏳ Đang ghép ảnh Bài giải thành PDF...";
                    
                    const oldStatus = document.getElementById('status_ghep_pdf');
                    if (oldStatus) oldStatus.remove();

                    if (vungHienThiGiai) vungHienThiGiai.insertAdjacentHTML('beforeend', `<div id="status_ghep_pdf" style="color: #6f42c1; margin-top: 8px; font-weight: bold; border-top: 1px dashed #ccc; padding-top: 6px;">⏳ Đang tiến hành ghép ${fileGiaiInput.files.length} ảnh thành PDF...</div>`);

                    if (typeof window.ham_15_15_ghep_anh_thanh_pdf_k15 !== 'function') throw new Error("Lỗi hệ thống: Không tìm thấy hàm ghép PDF ngầm!");
                    fileGiaiChinhThuc = await window.ham_15_15_ghep_anh_thanh_pdf_k15(fileGiaiInput.files);

                    if (vungHienThiGiai) {
                        const statusDiv = document.getElementById('status_ghep_pdf');
                        if (statusDiv) {
                            statusDiv.innerHTML = `✅ Đã ghép PDF thành công!<br>🚀 Đang đẩy lên Google Drive...`;
                            statusDiv.style.color = "#28a745";
                        }
                    }
                }
                
                // 🌟 THUẬT TOÁN XỬ LÝ TRÁNH LẶP TÊN HỌC LIỆU
                const extGiai = fileGiaiChinhThuc.name.split('.').pop();
                let tenCustomGiai = "";
                
                if (tenFileDeKhongDuoi === tenHLSach) {
                    // Dành cho dạng văn bản (TL_TXT) -> Tên sẽ là: HL01 - TenHocLieu_giai.pdf
                    tenCustomGiai = `${maHL} - ${tenHLSach}_giai.${extGiai}`;
                } else {
                    // Dành cho dạng File -> Tên sẽ là: HL01 - TenHocLieu - TenFileGoc_giai.pdf
                    tenCustomGiai = `${maHL} - ${tenHLSach} - ${tenFileDeKhongDuoi}_giai.${extGiai}`;
                }

                btn.innerText = "⏳ Đang tải BÀI GIẢI lên Drive...";
                urlGiaiDrive = await uploadFileLenDrive(fileGiaiChinhThuc, tenCustomGiai);
                metadataObj.ten_file_giai_goc = tenCustomGiai;
            }
        } else {
            // 🌟 NẾU KHÔNG KÈM GIẢI: Gán mức độ 1 (Không cho xem) làm mặc định
            metadataObj.cau_hinh_dap_an = { muc_do: 1 };
        }
        
        // =====================================================================
        // 3️⃣ LƯU TOÀN BỘ VÀO SUPABASE
        // =====================================================================
        btn.innerText = "⏳ Đang lưu vào cơ sở dữ liệu...";
        const payload = {
            ma_hoc_lieu: maHL,
            ten_hoc_lieu: tenHL,
            loai_kiem_tra: loaiKiemTra,
            khoi_lop: khoiLop,
            thoi_gian_lam_bai: thoiGian, 
            trang_thai: trangThai,
            quy_mo_cau_hoi: 1, 
            metadata: metadataObj, 
            danh_sach_cau_hoi: [], 
            url_github: urlDrive, 
            url_file_giai: urlGiaiDrive, 
            uid_gv_tao: uidGiaoVien,
            ngay_tao: new Date().toISOString()
        };
        
        const { error } = await _supabase.from('hoc_lieu').insert([payload]);
        if (error) throw error;
        
        Swal.fire('Thành công', `Đã nạp học liệu lên kho thành công!\nMã định danh: ${maHL}`, 'success');
        
        if (typeof ham_6_1_ve_quan_ly_hoc_lieu === 'function') ham_6_1_ve_quan_ly_hoc_lieu();
        
    } catch (err) {
        Swal.fire('Lỗi', err.message, 'error');
        btn.disabled = false;
        btn.style.cursor = "pointer";
        btn.innerText = "💾 TẢI LÊN VÀ LƯU HỌC LIỆU MỚI";
    }
};


// // --- Hàm 15.13: Render giao diện xem/sửa chi tiết học liệu Tự luận (Fix lỗi hiển thị file) ---
// window.ham_15_13_render_xem_hoc_lieu_khac = function(data, choPhepSua = true) {
//     const url = data.url_github || ""; 
//     const meta = typeof data.metadata === 'string' ? JSON.parse(data.metadata) : (data.metadata || {});
//     const isText = (meta && meta.loai_tu_luan === 'text');

//     // 🌟 1. TRÍCH XUẤT ID FILE (HỖ TRỢ CẢ 2 LOẠI LINK DRIVE PHỔ BIẾN)
//     let fileIdDrive = "";
//     if (url) {
//         const match1 = url.match(/\/d\/([a-zA-Z0-9_-]+)/); // Bắt dạng /file/d/ID
//         const match2 = url.match(/id=([a-zA-Z0-9_-]+)/);   // Bắt dạng ?id=ID
//         if (match1) fileIdDrive = match1[1];
//         else if (match2) fileIdDrive = match2[1];
//     }

//     // Tạo ID div duy nhất
//     const containerId = `ten_file_drive_${data.ma_hoc_lieu}`;
//     const duoiFile = (meta && meta.định_dạng) ? meta.định_dạng.toLowerCase() : "pdf";

//     // 🌟 2. TIẾN TRÌNH QUÉT TÊN FILE (Đưa ra ngoài if để đảm bảo luôn chạy)
//     setTimeout(async () => {
//         const elContainer = document.getElementById(containerId);
//         if (!elContainer) return;

//         // HƯỚNG 1: Dùng tên lưu sẵn trong DB (Nếu có)
//         let tenGocTrongMeta = meta?.ten_file_goc || meta?.ten_file || meta?.filename;
//         if (tenGocTrongMeta) {
//             elContainer.innerText = tenGocTrongMeta.includes(data.ma_hoc_lieu) ? tenGocTrongMeta : `${data.ma_hoc_lieu} - ${data.ten_hoc_lieu} - ${tenGocTrongMeta}`;
//             return;
//         }

//         // HƯỚNG 2: Gọi Google Apps Script để bốc tên thật
//         if (fileIdDrive && typeof CFG_HE_THONG !== 'undefined' && CFG_HE_THONG.URL_APPS_SCRIPT_XOA_DRIVE) {
//             try {
//                 const res = await fetch(`${CFG_HE_THONG.URL_APPS_SCRIPT_XOA_DRIVE}?action=get_name&id=${fileIdDrive}`);
//                 if (res.ok) {
//                     const result = await res.json();
//                     if (result && result.status === "success" && result.name) {
//                         elContainer.innerText = result.name; 
//                         return;
//                     }
//                 }
//             } catch (err) {
//                 console.warn("⚠️ API lấy tên file Drive bị lỗi, chuyển sang dự phòng.");
//             }
//         }

//         // HƯỚNG 3: Dự phòng cuối cùng (Luôn luôn hiển thị tên chuẩn)
//         elContainer.innerText = `${data.ma_hoc_lieu} - ${data.ten_hoc_lieu} - file_goc.${duoiFile}`;
//     }, 200); 

//     // 3. DỰNG GIAO DIỆN FORM ĐIỀU KHIỂN
//     let htmlVungNhapText = "";
//     if (choPhepSua) {
//         htmlVungNhapText = `
//             <label style="font-weight: bold; font-size: 13px; color: #28a745; display: block; margin-bottom: 5px;">
//                 ✏️ Nội dung văn bản (Thầy có thể chỉnh sửa trực tiếp tại đây):
//             </label>
//             <textarea id="sua_noi_dung_txt_k15" rows="12" style="width: 100%; padding: 12px; border: 1px solid #ced4da; border-radius: 6px; font-family: monospace; font-size: 13px; line-height: 1.5; resize: vertical; box-sizing: border-box; background: #fffbe6; border-left: 4px solid #28a745; outline: none;">${meta?.noi_dung_chinh || ''}</textarea>
//         `;
//     } else {
//         htmlVungNhapText = `
//             <label style="font-weight: bold; font-size: 13px; color: #666; display: block; margin-bottom: 5px;">
//                 🔒 Nội dung văn bản (Chế độ chỉ xem):
//             </label>
//             <textarea id="sua_noi_dung_txt_k15" rows="12" readonly style="width: 100%; padding: 12px; border: 1px solid #ced4da; border-radius: 6px; font-family: monospace; font-size: 13px; line-height: 1.5; resize: vertical; box-sizing: border-box; background: #f1f3f4; border-left: 4px solid #6c757d; color: #555; cursor: not-allowed;">${meta?.noi_dung_chinh || ''}</textarea>
//         `;
//     }

//     // 🌟 4. XỬ LÝ NÚT MỞ LINK (Chặn click nếu không có file)
//     const htmlNutLink = url 
//         ? `<a href="${url}" target="_blank" style="display: inline-flex; align-items: center; gap: 8px; padding: 10px 24px; background: #6f42c1; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px; box-shadow: 0 2px 4px rgba(111,66,193,0.2); transition: 0.2s;">
//                📂 MỞ LIÊN KẾT ĐỂ KIỂM TRA FILE
//            </a>`
//         : `<button disabled style="display: inline-flex; align-items: center; gap: 8px; padding: 10px 24px; background: #ccc; color: white; border: none; border-radius: 6px; font-weight: bold; font-size: 14px; cursor: not-allowed;">
//                🚫 CHƯA CÓ FILE TRÊN DRIVE
//            </button>`;

//     return `
//         <div style="padding: 20px; border: 1px solid #dee2e6; border-radius: 8px; background: #fff; box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);">
//             <h4 style="color: #6f42c1; margin-top: 0; margin-bottom: 15px; display: flex; align-items: center; gap: 8px;">
//                 📦 THÔNG TIN NỘI DUNG HỌC LIỆU TỰ LUẬN
//             </h4>
//             <div style="margin: 0;">
//                 <p style="margin: 5px 0;"><strong>Tên hiển thị:</strong> ${data.ten_hoc_lieu}</p>
//                 <p style="margin: 5px 0; margin-bottom: 15px;"><strong>Phân loại cụ thể:</strong> <span style="background: #eee; padding: 2px 6px; border-radius: 4px; font-size: 12px; font-weight: bold; color: #555;">${meta?.phan_loai_goc || 'Mặc định'}</span></p>
                
//                 ${isText ? htmlVungNhapText : `
//                     <div style="padding: 15px; border: 1px solid #e2d9f3; border-radius: 8px; background: #fdfbfe; text-align: left;">
//                         <div style="margin-bottom: 15px; border-bottom: 1px dashed #e2d9f3; padding-bottom: 10px;">
//                             <span style="font-weight: bold; color: #555; font-size: 13px;">📁 Tên tệp đính kèm trên Drive:</span>
//                             <div id="${containerId}" style="margin-top: 6px; background: #fff; padding: 8px 12px; border: 1px solid #ced4da; border-radius: 6px; font-family: monospace; font-size: 13px; color: #e83e8c; word-break: break-all; font-weight: bold;">
//                                 ⏳ Đang nạp thông tin tệp tin...
//                             </div>
//                         </div>
//                         <div style="text-align: center;">
//                             ${htmlNutLink}
//                         </div>
//                     </div>
//                 `}
//             </div>
//         </div>
//     `;
// };

// --- Hàm 15.13: Render giao diện xem/sửa chi tiết học liệu Tự luận (Đã phân nhánh UI Sửa Giải) ---
window.ham_15_13_render_xem_hoc_lieu_khac = function(data, choPhepSua = true) {
    const url = data.url_github || ""; 
    const meta = typeof data.metadata === 'string' ? JSON.parse(data.metadata) : (data.metadata || {});
    const isText = (meta && meta.loai_tu_luan === 'text');

    let fileIdDrive = "";
    if (url) {
        const match1 = url.match(/\/d\/([a-zA-Z0-9_-]+)/); 
        const match2 = url.match(/id=([a-zA-Z0-9_-]+)/);   
        if (match1) fileIdDrive = match1[1];
        else if (match2) fileIdDrive = match2[1];
    }

    const containerId = `ten_file_drive_${data.ma_hoc_lieu}`;
    const duoiFile = (meta && meta.định_dạng) ? meta.định_dạng.toLowerCase() : "pdf";

    // Quét tên file Đề bài ngầm
    setTimeout(async () => {
        const elContainer = document.getElementById(containerId);
        if (!elContainer) return;

        let tenGocTrongMeta = meta?.ten_file_goc || meta?.ten_file || meta?.filename;
        if (tenGocTrongMeta) {
            elContainer.innerText = tenGocTrongMeta.includes(data.ma_hoc_lieu) ? tenGocTrongMeta : `${data.ma_hoc_lieu} - ${data.ten_hoc_lieu} - ${tenGocTrongMeta}`;
            return;
        }

        if (fileIdDrive && typeof CFG_HE_THONG !== 'undefined' && CFG_HE_THONG.URL_APPS_SCRIPT_XOA_DRIVE) {
            try {
                const res = await fetch(`${CFG_HE_THONG.URL_APPS_SCRIPT_XOA_DRIVE}?action=get_name&id=${fileIdDrive}`);
                if (res.ok) {
                    const result = await res.json();
                    if (result && result.status === "success" && result.name) {
                        elContainer.innerText = result.name; 
                        return;
                    }
                }
            } catch (err) {}
        }
        elContainer.innerText = `${data.ma_hoc_lieu} - ${data.ten_hoc_lieu} - file_goc.${duoiFile}`;
    }, 200); 

    // =====================================================================
    // KHỐI GIAO DIỆN ĐỀ BÀI
    // =====================================================================
    let htmlVungNhapText = "";
    if (choPhepSua) {
        htmlVungNhapText = `
            <label style="font-weight: bold; font-size: 13px; color: #28a745; display: block; margin-bottom: 5px;">
                ✏️ Nội dung Đề bài (Có thể chỉnh sửa trực tiếp):
            </label>
            <textarea id="sua_noi_dung_txt_k15" rows="8" style="width: 100%; padding: 12px; border: 1px solid #ced4da; border-radius: 6px; font-family: monospace; font-size: 13px; line-height: 1.5; resize: vertical; box-sizing: border-box; background: #fffbe6; border-left: 4px solid #28a745; outline: none;">${meta?.noi_dung_chinh || ''}</textarea>
        `;
    } else {
        htmlVungNhapText = `
            <label style="font-weight: bold; font-size: 13px; color: #666; display: block; margin-bottom: 5px;">
                🔒 Nội dung Đề bài (Chế độ chỉ xem):
            </label>
            <textarea id="sua_noi_dung_txt_k15" rows="8" readonly style="width: 100%; padding: 12px; border: 1px solid #ced4da; border-radius: 6px; font-family: monospace; font-size: 13px; line-height: 1.5; resize: vertical; box-sizing: border-box; background: #f1f3f4; border-left: 4px solid #6c757d; color: #555; cursor: not-allowed;">${meta?.noi_dung_chinh || ''}</textarea>
        `;
    }

    const htmlNutLink = url 
        ? `<a href="${url}" target="_blank" style="display: inline-flex; align-items: center; gap: 8px; padding: 10px 24px; background: #6f42c1; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px; box-shadow: 0 2px 4px rgba(111,66,193,0.2); transition: 0.2s;">📂 MỞ KIỂM TRA FILE ĐỀ BÀI</a>`
        : `<button disabled style="display: inline-flex; align-items: center; gap: 8px; padding: 10px 24px; background: #ccc; color: white; border: none; border-radius: 6px; font-weight: bold; font-size: 14px; cursor: not-allowed;">🚫 CHƯA CÓ FILE TRÊN DRIVE</button>`;

    // =====================================================================
    // KHỐI GIAO DIỆN BÀI GIẢI / ĐÁP ÁN (PHÂN NHÁNH THÔNG MINH)
    // =====================================================================
    const urlGiaiCu = data.url_file_giai || "";
    const textGiaiCu = meta?.noi_dung_giai_text || "";
    const tenFileGiaiGoc = meta?.ten_file_giai_goc || "Tệp giải đính kèm trên Drive";
    const hasDapAn = (urlGiaiCu !== "") || (textGiaiCu !== "");
    const cauHinh = meta?.cau_hinh_dap_an || { muc_do: 'KHONG_XEM', thoi_diem: 'KHI_DONG_NV' };

    // Quét tên bài giải ngầm để làm đẹp
    setTimeout(async () => {
        const elGiai = document.getElementById(`ten_file_giai_hien_tai_${data.ma_hoc_lieu}`);
        if (!elGiai || !urlGiaiCu) return;
        if (elGiai.innerText.includes("Ghep_Tu_Dong") && typeof CFG_HE_THONG !== 'undefined' && CFG_HE_THONG.URL_APPS_SCRIPT_XOA_DRIVE) {
            let idGiai = "";
            const m1 = urlGiaiCu.match(/\/d\/([a-zA-Z0-9_-]+)/);
            const m2 = urlGiaiCu.match(/id=([a-zA-Z0-9_-]+)/);
            if (m1) idGiai = m1[1]; else if (m2) idGiai = m2[1];
            if (idGiai) {
                try {
                    const res = await fetch(`${CFG_HE_THONG.URL_APPS_SCRIPT_XOA_DRIVE}?action=get_name&id=${idGiai}`);
                    if (res.ok) {
                        const result = await res.json();
                        if (result && result.status === "success" && result.name) elGiai.innerText = result.name; 
                    }
                } catch (err) {}
            }
        }
    }, 400);

    let htmlBaiGiai = "";
    if (choPhepSua) {
        if (hasDapAn) {
            // -----------------------------------------------------------------
            // TRƯỜNG HỢP 1: ĐÃ CÓ ĐÁP ÁN -> Bắt buộc hiện thông tin cũ
            // -----------------------------------------------------------------
            htmlBaiGiai = `
                <div style="margin-top: 20px; padding-top: 15px; border-top: 2px dashed #dee2e6;">
                    <h5 style="color: #28a745; margin-top: 0; margin-bottom: 15px; display: flex; align-items: center; gap: 8px;">💡 BÀI GIẢI / ĐÁP ÁN HIỆN TẠI</h5>
                    
                    <div style="margin-bottom: 15px; padding: 12px; background: #e9ecef; border-radius: 6px; border: 1px solid #ced4da;">
                        ${urlGiaiCu ? `<a href="${urlGiaiCu}" target="_blank" style="color: #1a73e8; text-decoration: none; font-weight: bold; font-size: 13px;">📎 <span id="ten_file_giai_hien_tai_${data.ma_hoc_lieu}">${tenFileGiaiGoc}</span></a>` : ''}
                        ${textGiaiCu ? `<div style="font-size: 13px; color: #2c3e50; margin-top: 5px; background: white; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; max-height: 80px; overflow-y: auto; font-family: monospace;">${textGiaiCu}</div>` : ''}
                    </div>

                    <div style="margin-bottom: 15px; display: flex; gap: 15px; flex-wrap: wrap;">
                        
<div style="flex: 1; min-width: 250px;">
    <label style="font-weight: bold; color: #495057; font-size: 13px; display: block; margin-bottom: 6px;">👁️ Quyền xem đáp án:</label>
    <select id="select_muc_do_dapan_k15" style="width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 6px; background: white; font-size: 13px;">
    <option value="1" ${String(cauHinh.muc_do) === '1' ? 'selected' : ''}>🔒 1. Không cho xem</option>
    <option value="2" ${String(cauHinh.muc_do) === '2' ? 'selected' : ''}>📤 2. Cho xem sau khi nộp</option>
    <option value="3" ${String(cauHinh.muc_do) === '3' ? 'selected' : ''}>📝 3. Cho xem sau khi chấm</option>
</select>
</div>
                    </div>

                    <div style="margin-bottom: 15px;">
                        <label style="display: inline-flex; align-items: center; gap: 8px; cursor: pointer; background: #fffdf5; padding: 8px 12px; border-radius: 6px; border: 1px solid #f39c12;">
                            <input type="checkbox" id="chk_cap_nhat_dap_an_moi_k15" onchange="document.getElementById('khu_vuc_cap_nhat_dap_an_k15').style.display = this.checked ? 'block' : 'none';" style="width: 18px; height: 18px; cursor: pointer; accent-color: #d35400;">
                            <b style="color: #d35400; font-size: 13px;">Cập nhật lại file/nội dung đáp án mới (Ghi đè bản cũ)</b>
                        </label>
                    </div>

                    <div id="khu_vuc_cap_nhat_dap_an_k15" style="display: none; border-left: 3px solid #d35400; padding-left: 15px;">
                        <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 10px;">
                            <span style="font-weight: bold; color: #555; font-size: 13px;">Chọn nguồn đáp án mới:</span>
                            <select id="select_loai_giai_k15_sua" onchange="window.ham_15_17_toggle_loai_giai(this.value)" style="padding: 6px; border-radius: 4px; border: 1px solid #ced4da; font-size: 13px;">
                                <option value="FILE">📎 Tải file đính kèm (PDF/Ảnh)</option>
                                <option value="TEXT">📝 Nhập văn bản trực tiếp</option>
                            </select>
                        </div>

                        <div id="vung_giai_file_k15" style="display: block;">
                            <input type="file" id="upload_file_giai_k15_sua" onchange="window.ham_15_16_hien_thi_ten_file_giai(this)" multiple accept=".pdf, image/png, image/jpeg" style="width:100%; padding: 8px; border: 1px solid #ced4da; border-radius: 6px; background: white; box-sizing: border-box; margin-bottom: 5px; cursor: pointer; font-size: 13px;">
                            <div id="hien_thi_ten_file_giai_k15" style="font-size: 13px; color: #1a73e8; font-weight: bold; min-height: 24px; padding: 5px 8px; background: #e9ecef; border-radius: 4px; display: none; margin-bottom: 5px;"></div>
                            <div style="font-size: 11px; color: #6c757d; font-style: italic;">* Chọn nhiều ảnh sẽ tự động ghép thành 1 file PDF mới.</div>
                        </div>

                        <div id="vung_giai_text_k15" style="display: none;">
                            <textarea id="txt_noi_dung_giai_k15_sua" rows="4" style="width:100%; padding: 10px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; font-family: monospace; font-size: 13px;" placeholder="Gõ nội dung bài giải mới vào đây..."></textarea>
                        </div>
                    </div>
                </div>
            `;
        } else {
            // -----------------------------------------------------------------
            // TRƯỜNG HỢP 2: CHƯA CÓ ĐÁP ÁN -> Cho phép bổ sung
            // -----------------------------------------------------------------
            htmlBaiGiai = `
                <div style="margin-top: 20px; padding-top: 15px; border-top: 2px dashed #dee2e6;">
                    <h5 style="color: #d35400; margin-top: 0; margin-bottom: 15px; display: flex; align-items: center; gap: 8px;">💡 BỔ SUNG BÀI GIẢI / ĐÁP ÁN</h5>
                    
                    <div style="margin-bottom: 15px;">
                        <label style="display: inline-flex; align-items: center; gap: 8px; cursor: pointer; background: #fffdf5; padding: 8px 12px; border-radius: 6px; border: 1px solid #f39c12;">
                            <input type="checkbox" id="chk_co_dap_an_k15_sua" onchange="document.getElementById('khu_vuc_dap_an_k15_sua').style.display = this.checked ? 'block' : 'none';" style="width: 18px; height: 18px; cursor: pointer; accent-color: #d35400;">
                            <b style="color: #d35400; font-size: 13px;">Kèm theo Bài giải / Đáp án chi tiết (Bổ sung mới)</b>
                        </label>
                    </div>

                    <div id="khu_vuc_dap_an_k15_sua" style="display: none; border-left: 3px solid #d35400; padding-left: 15px; margin-bottom: 15px;">
                        <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 10px;">
                            <span style="font-weight: bold; color: #555; font-size: 13px;">Chọn nguồn đáp án:</span>
                            <select id="select_loai_giai_k15_sua" onchange="window.ham_15_17_toggle_loai_giai(this.value)" style="padding: 6px; border-radius: 4px; border: 1px solid #ced4da; font-size: 13px;">
                                <option value="FILE">📎 Tải file đính kèm (PDF/Ảnh)</option>
                                <option value="TEXT">📝 Nhập văn bản trực tiếp</option>
                            </select>
                        </div>

                        <div id="vung_giai_file_k15" style="display: block;">
                            <input type="file" id="upload_file_giai_k15_sua" onchange="window.ham_15_16_hien_thi_ten_file_giai(this)" multiple accept=".pdf, image/png, image/jpeg" style="width:100%; padding: 8px; border: 1px solid #ced4da; border-radius: 6px; background: white; box-sizing: border-box; margin-bottom: 5px; cursor: pointer; font-size: 13px;">
                            <div id="hien_thi_ten_file_giai_k15" style="font-size: 13px; color: #1a73e8; font-weight: bold; min-height: 24px; padding: 5px 8px; background: #e9ecef; border-radius: 4px; display: none; margin-bottom: 5px;"></div>
                            <div style="font-size: 11px; color: #6c757d; font-style: italic;">* Chọn nhiều ảnh sẽ tự động ghép thành 1 file PDF mới.</div>
                        </div>

                        <div id="vung_giai_text_k15" style="display: none;">
                            <textarea id="txt_noi_dung_giai_k15_sua" rows="4" style="width:100%; padding: 10px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; font-family: monospace; font-size: 13px;" placeholder="Gõ nội dung bài giải vào đây..."></textarea>
                        </div>

                        <div style="margin-top: 15px; padding-top: 15px; border-top: 1px dashed #ced4da; display: flex; gap: 15px; flex-wrap: wrap;">
                <div style="flex: 1; min-width: 250px;">
                    <label style="font-weight: bold; color: #495057; font-size: 13px; display: block; margin-bottom: 6px;">👁️ Quyền xem đáp án:</label>
                    <select id="select_muc_do_dapan_k15" style="width: 100%; padding: 9px; border: 1px solid #ced4da; border-radius: 6px; background: white; font-size: 13px; cursor: pointer;">
        <option value="1">🔒 1. Không cho xem</option>
        <option value="2">📤 2. Cho xem sau khi nộp</option>
        <option value="3" selected>📝 3. Cho xem sau khi chấm</option>
    </select>
</div>
                
                
                </div>
                    </div>
                </div>
            `;
        }
    } else {
        const lblMucDo = cauHinh.muc_do === 'FULL_LOIGIAI' ? '🔓 Có cho xem' : '🔒 Không cho xem';
        const lblThoiDiem = cauHinh.thoi_diem === 'SAU_KHI_CHAM' ? 'Sau khi chấm xong' : (cauHinh.thoi_diem === 'SAU_KHI_NOP' ? 'Sau khi nộp bài' : 'Khi đóng nhiệm vụ');
        
        htmlBaiGiai = `
            <div style="margin-top: 20px; padding-top: 15px; border-top: 2px dashed #dee2e6;">
                <h5 style="color: #d35400; margin-top: 0; margin-bottom: 10px;">💡 BÀI GIẢI / ĐÁP ÁN (Chế độ xem)</h5>
                ${hasDapAn ? `
                    <div style="margin-bottom: 10px;">
                        ${urlGiaiCu ? `<a href="${urlGiaiCu}" target="_blank" style="display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; background: #d35400; color: white; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 13px;">📂 MỞ KIỂM TRA FILE BÀI GIẢI</a>` : ''}
                        ${textGiaiCu ? `<textarea rows="4" readonly style="width: 100%; padding: 10px; border: 1px solid #ced4da; border-radius: 6px; font-family: monospace; font-size: 13px; background: #f1f3f4; color: #555;">${textGiaiCu}</textarea>` : ''}
                    </div>
                    <div style="font-size: 13px; color: #555; background: #fffbe6; padding: 10px; border-radius: 6px; border: 1px solid #ffeeba; display: inline-block;">
                        <b>Quyền xem:</b> ${lblMucDo} &nbsp;|&nbsp; <b>Mở lúc:</b> ${lblThoiDiem}
                    </div>
                ` : `
                    <div style="color: #6c757d; font-style: italic; font-size: 13px; padding: 10px; background: #f8f9fa; border-radius: 6px;">🚫 Chưa có bài giải đính kèm cho học liệu này.</div>
                `}
            </div>
        `;
    }

    return `
        <div style="padding: 20px; border: 1px solid #dee2e6; border-radius: 8px; background: #fff; box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);">
            <h4 style="color: #6f42c1; margin-top: 0; margin-bottom: 15px; display: flex; align-items: center; gap: 8px;">
                📦 THÔNG TIN NỘI DUNG HỌC LIỆU TỰ LUẬN
            </h4>
            <div style="margin: 0;">
                <p style="margin: 5px 0;"><strong>Tên hiển thị:</strong> ${data.ten_hoc_lieu}</p>
                <p style="margin: 5px 0; margin-bottom: 15px;"><strong>Phân loại cụ thể:</strong> <span style="background: #eee; padding: 2px 6px; border-radius: 4px; font-size: 12px; font-weight: bold; color: #555;">${meta?.phan_loai_goc || 'Mặc định'}</span></p>
                
                ${isText ? htmlVungNhapText : `
                    <div style="padding: 15px; border: 1px solid #e2d9f3; border-radius: 8px; background: #fdfbfe; text-align: left;">
                        <div style="margin-bottom: 15px; border-bottom: 1px dashed #e2d9f3; padding-bottom: 10px;">
                            <span style="font-weight: bold; color: #555; font-size: 13px;">📁 Tên tệp ĐỀ BÀI trên Drive:</span>
                            <div id="${containerId}" style="margin-top: 6px; background: #fff; padding: 8px 12px; border: 1px solid #ced4da; border-radius: 6px; font-family: monospace; font-size: 13px; color: #e83e8c; word-break: break-all; font-weight: bold;">
                                ⏳ Đang nạp thông tin tệp tin...
                            </div>
                        </div>
                        <div style="text-align: center;">
                            ${htmlNutLink}
                        </div>
                    </div>
                `}
                ${htmlBaiGiai}
            </div>
        </div>
    `;
};


window.ham_15_14_xoa_tai_nguyen_tu_luan = async function(dataHocLieu) {
    console.log("🚀 Đang xử lý dọn dẹp file Drive cho:", dataHocLieu.ma_hoc_lieu);
    
    const urlFile = dataHocLieu.url_github;
    if (!urlFile) return true;

    // Bóc tách ID Drive trực tiếp từ URL (hỗ trợ mọi loại link Drive)
    const match = urlFile.match(/[-\w]{25,}/);
    const fileIdDrive = match ? match[0] : null;

    if (!fileIdDrive) {
        console.warn("⚠️ Không tìm thấy ID Drive từ link:", urlFile);
        return false;
    }

    const urlAppScript = CFG_HE_THONG.URL_APPS_SCRIPT_TU_LUAN; // Dùng chung link URL_APPS_SCRIPT_TU_LUAN cho thống nhất
    
    try {
        // Gửi lệnh xóa theo phương thức POST
        const res = await fetch(urlAppScript, {
            method: 'POST',
            body: JSON.stringify({ 
                action: "delete_file", 
                fileId: fileIdDrive 
            })
        });
        
        const result = await res.json();
        if (result.status === "success") {
            console.log(`✅ Đã xóa thành công file Drive (ID: ${fileIdDrive})`);
            return true;
        } else {
            throw new Error(result.message);
        }
    } catch (err) {
        console.error("⚠️ Lỗi khi gọi Apps Script xóa file:", err);
        return false;
    }
};



// =====================================================================
// Hàm 15.15: Thuật toán ghép nhiều ảnh thành 1 file PDF giữ nét (Chạy ngầm)
// =====================================================================
window.ham_15_15_ghep_anh_thanh_pdf_k15 = async function(fileList) {
    try {

        // 🌟 BƯỚC BẢO VỆ: KIỂM TRA VÀ TỰ ĐỘNG TẢI THƯ VIỆN NẾU THIẾU
        if (typeof window.jspdf === 'undefined') {
            await new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
                script.onload = resolve;
                script.onerror = () => reject(new Error("Không thể kết nối Internet để tải thư viện jsPDF"));
                document.head.appendChild(script);
            });
        }


        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = doc.internal.pageSize.getHeight();

        const loadImg = (file) => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => resolve({ data: e.target.result, w: img.width, h: img.height, type: file.type });
                img.onerror = () => reject(new Error("Lỗi đọc ảnh"));
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        });

        for (let i = 0; i < fileList.length; i++) {
            const imgObj = await loadImg(fileList[i]);
            if (i > 0) doc.addPage();

            const ratio = Math.min(pdfWidth / imgObj.w, pdfHeight / imgObj.h);
            const finalWidth = imgObj.w * ratio;
            const finalHeight = imgObj.h * ratio;
            const imgX = (pdfWidth - finalWidth) / 2;
            const imgY = 10; 

            const imgType = imgObj.type === 'image/png' ? 'PNG' : 'JPEG';
            doc.addImage(imgObj.data, imgType, imgX, imgY, finalWidth, finalHeight, undefined, 'FAST');
        }

        const tenFileGhep = `Ghep_Tu_Dong_${new Date().getTime()}.pdf`;
        const pdfBlob = doc.output('blob');
        
        return new File([pdfBlob], tenFileGhep, { type: 'application/pdf' });

    } catch (err) {
        throw new Error("Lỗi khi ghép ảnh thành PDF: " + err.message);
    }
};




// =====================================================================
// Hàm 15: Bắt sự kiện chọn file và hiển thị tên file giải lên Form
// =====================================================================
window.ham_15_16_hien_thi_ten_file_giai = function(inputElement) {
    const vungHienThi = document.getElementById('hien_thi_ten_file_giai_k15');
    const files = inputElement.files;
    
    // Nếu người dùng ấn Hủy (không chọn gì)
    if (!files || files.length === 0) {
        vungHienThi.style.display = 'none';
        vungHienThi.innerHTML = "";
        return;
    }

    vungHienThi.style.display = 'block';

    if (files.length === 1) {
        // Trường hợp 1: Chỉ chọn 1 file (Ảnh hoặc PDF)
        vungHienThi.innerHTML = `📎 Tệp đã chọn: <span style="color: #28a745;">${files[0].name}</span>`;
    } else {
        // Trường hợp 2: Chọn nhiều file (Mặc định hiểu là Ảnh cần gộp)
        let danhSachTen = Array.from(files).map(f => f.name).join(', ');
        
        // Tạo một cái tên file PDF ảo để báo cho GV biết hệ thống sẽ gộp thành tên này
        let tenFileGhep = `Ghep_Tu_Dong_${new Date().getTime()}.pdf`;

        vungHienThi.innerHTML = `
            <div style="color: #d35400; margin-bottom: 4px;">📸 Đã chọn ${files.length} ảnh. Hệ thống sẽ tự động ghép thành 1 file PDF khi lưu học liệu.</div>
            <div style="color: #28a745; margin-bottom: 4px;">➡️ Tệp xuất ra: <b>${tenFileGhep}</b></div>
            <div style="color: #6c757d; font-size: 11px; font-weight: normal; font-style: italic; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                Các file gốc: ${danhSachTen}
            </div>
        `;
    }
};



// Hàm phụ để ẩn/hiện loại nhập liệu đáp án
window.ham_15_17_toggle_loai_giai = function(loai) {
    document.getElementById('vung_giai_file_k15').style.display = loai === 'FILE' ? 'block' : 'none';
    document.getElementById('vung_giai_text_k15').style.display = loai === 'TEXT' ? 'block' : 'none';
};


window.ham_15_18_kiem_tra_quyen_xem_giai = function(nhiemVu, hocSinh) {
    const mucDo = nhiemVu.cau_hinh_dap_an.muc_do; // 1, 2, hoặc 3

    switch(mucDo) {
        case 1: 
            return false; // Không bao giờ cho xem
        case 2: 
            return hocSinh.da_nop_bai === true; // Nộp xong là xem được
        case 3: 
            return hocSinh.da_duoc_cham === true; // Chấm xong mới xem được
        default: 
            return false;
    }
};







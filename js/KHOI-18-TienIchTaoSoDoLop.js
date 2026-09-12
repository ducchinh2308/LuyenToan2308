// =====================================================================
// KHỐI 18: TIỆN ÍCH - TẠO SƠ ĐỒ LỚP HỌC (3 KIỂU NẠP & AUTO STT)
// =====================================================================

// // Tự động tải thư viện SheetJS (Excel) và Mammoth (Word)
// if (typeof XLSX === 'undefined') {
//     let scriptXLSX = document.createElement('script');
//     scriptXLSX.src = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';
//     document.head.appendChild(scriptXLSX);
// }

// Tự động tải thư viện xlsx-js-style (Bản nâng cấp hỗ trợ định dạng Canh giữa, Khung viền) và Mammoth (Word)
if (typeof XLSX === 'undefined') {
    let scriptXLSX = document.createElement('script');
    scriptXLSX.src = 'https://cdn.jsdelivr.net/npm/xlsx-js-style@1.2.0/dist/xlsx.min.js';
    document.head.appendChild(scriptXLSX);
}


if (typeof mammoth === 'undefined') {
    let scriptMammoth = document.createElement('script');
    scriptMammoth.src = 'https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.4.21/mammoth.browser.min.js';
    document.head.appendChild(scriptMammoth);
}

// Biến toàn cục lưu danh sách tạm thời
window.DanhSachHSSoDoTam = [];
// Biến toàn cục lưu trữ danh sách file ảnh đang chọn (Dùng để match tên sau này)
window.DanhSachAnhSoDoTam = [];


// Biến toàn cục lưu danh sách học sinh
window.DanhSachHocSinhTam = [];
window.FileDanhSachTam = null; // Lưu file để upload

// Biến toàn cục lưu trữ file sơ đồ tạm thời
window.FileSoDoTam = null;
window.SoDoDaTaiUrl = ""; // URL hiển thị nền sơ đồ


// =====================================================================
// KHỐI 18: TIỆN ÍCH - TẠO SƠ ĐỒ LỚP HỌC (CHỈ GIAO DIỆN UI)
// =====================================================================

// =======================================================
// HÀM TỔNG HỢP: RÁP NỐI VÀ RENDER ẢNH + TÊN (GIAO DIỆN ẢNH TO)
// =======================================================
window.ham_18_render_preview_tong_hop = function () {
    const vungPreview = document.getElementById('vung-preview-anh-tong');
    const labelSoLuong = document.getElementById('so-luong-anh-da-nap');
    const khuVucHienThi = document.getElementById('khu-vuc-hien-thi-anh-duoi');

    // Tăng max-height để bảng hiển thị được nhiều hàng cao hơn
    vungPreview.style = "max-height: 550px; overflow-y: auto; padding-right: 5px; display: block;";
    vungPreview.innerHTML = '';

    const arrAnh = window.DanhSachAnhSoDoTam || [];
    const arrTen = window.DanhSachHocSinhTam || [];
    const maxLen = Math.max(arrAnh.length, arrTen.length);

    if (maxLen === 0) {
        khuVucHienThi.style.display = 'none';
        return;
    }

    khuVucHienThi.style.display = 'block';
    labelSoLuong.innerText = maxLen;

    let htmlTable = `
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; background: white; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
            <thead style="position: sticky; top: 0; background: #e9ecef; z-index: 10; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <tr>
                    <th style="padding: 12px 8px; border-bottom: 2px solid #dee2e6; width: 50px; text-align: center; color: #495057;">STT</th>
                    
                    <!-- Đã ép chiều rộng cột Họ Tên hẹp lại (khoảng 25%) -->
                    <th style="padding: 12px 8px; border-bottom: 2px solid #dee2e6; width: 25%; color: #0056b3; text-align: left;">👤 HỌ VÀ TÊN</th>
                    
                    <th style="padding: 12px 8px; border-bottom: 2px solid #dee2e6; width: 120px; text-align: center; color: #17a2b8;">📸 ẢNH THẺ</th>
                    
                    <th style="padding: 12px 8px; border-bottom: 2px solid #dee2e6; color: #6c757d; text-align: left;">📄 TÊN FILE ẢNH</th>
                </tr>
            </thead>
            <tbody>
    `;

    for (let i = 0; i < maxLen; i++) {
        // Nếu thiếu ảnh, dùng ảnh xám thay thế tạm
        const anhUrl = arrAnh[i] ? arrAnh[i].url : 'https://placehold.co/120x160/e9ecef/a3a3a3?text=Trong';
        const tenFile = arrAnh[i] ? arrAnh[i].name : '<span style="color:#dc3545; font-weight:bold;">❌ Đang thiếu file ảnh</span>';

        let tenHS = '';
        if (arrTen[i]) {
            tenHS = `<span style="font-size: 16px;">${arrTen[i]}</span>`;
        } else {
            tenHS = `<span style="color:#dc3545; font-weight:bold; font-style: italic;">❌ Thiếu tên</span>`;
        }

        const mauNen = (i % 2 === 0) ? 'background: #ffffff;' : 'background: #f8f9fa;';

        htmlTable += `
            <tr style="${mauNen} border-bottom: 1px solid #ddd; transition: 0.2s;" onmouseover="this.style.background='#e3f2fd'" onmouseout="this.style.background='${i % 2 === 0 ? '#ffffff' : '#f8f9fa'}'">
                
                <!-- CỘT 1: STT -->
                <td style="padding: 10px 8px; text-align: center; font-weight: bold; color: #495057; font-size: 16px;">
                    ${i + 1}
                </td>
                
                <!-- CỘT 2: TÊN HỌC SINH VÀ NÚT CHỨC NĂNG (Đã xếp dọc xuống) -->
                <td style="padding: 10px 8px; font-weight: bold; color: #0056b3; vertical-align: middle;">
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        ${tenHS}
                        <div style="display: flex; gap: 8px;">
                            <button onclick="ham_18_them_ten_hs(${i})" title="Chèn thêm 1 tên vào vị trí này" style="padding: 5px 10px; font-size: 11px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; box-shadow: 0 1px 2px rgba(0,0,0,0.1);">➕ Thêm</button>
                            <button onclick="ham_18_xoa_ten_hs(${i})" title="Xóa tên này đi" style="padding: 5px 10px; font-size: 11px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; box-shadow: 0 1px 2px rgba(0,0,0,0.1); ${!arrTen[i] ? 'opacity: 0.5; pointer-events: none;' : ''}">❌ Xóa</button>
                        </div>
                    </div>
                </td>
                
                <!-- CỘT 3: HÌNH ẢNH (Phóng to gấp đôi) -->
                <td style="padding: 10px 8px; text-align: center; vertical-align: middle;">
                    <img src="${anhUrl}" style="height: 120px; width: 90px; object-fit: cover; border-radius: 6px; border: 2px solid #ccc; box-shadow: 0 2px 5px rgba(0,0,0,0.15); display: block; margin: 0 auto;">
                </td>
                
                <!-- CỘT 4: TÊN FILE ẢNH -->
                <td style="padding: 10px 8px; font-size: 14px; color: #6c757d; vertical-align: middle;">
                    ${tenFile}
                </td>
            </tr>
        `;
    }

    htmlTable += `</tbody></table>`;
    vungPreview.innerHTML = htmlTable;
};

// =======================================================
// HÀM RENDER SƠ ĐỒ LỚP HỌC (TỰ ĐỘNG XÁC ĐỊNH SỐ CỘT ĐỘNG)
// =======================================================
// =======================================================
// HÀM RENDER SƠ ĐỒ LỚP HỌC (HIỂN THỊ ĐÚNG SỐ CỘT THỰC TẾ)
// =======================================================
window.ham_18_render_preview_so_do = function () {
    const dataSoDo = window.DuLieuSoDoTam || [];

    let khuVuc = document.getElementById('khu-vuc-preview-so-do');
    let noiDung = document.getElementById('noi-dung-chi-tiet-so-do');

    if (!khuVuc || !noiDung) return;

    if (dataSoDo.length === 0) {
        khuVuc.style.display = 'none';
        return;
    }

    khuVuc.style.display = 'block';

    // Chuyển đổi dữ liệu thô thành mảng 2 chiều chuẩn xác
    let matrix = [];
    if (Array.isArray(dataSoDo)) {
        matrix = dataSoDo.map(row => {
            if (Array.isArray(row)) return row;
            // Nếu dòng nào đang là chuỗi đơn, thử tách nó ra thành các cột nhỏ
            return String(row).split(/\t|\s{2,}/).map(p => p.trim());
        });
    }

    // 🌟 TÍNH CHÍNH XÁC SỐ CỘT LỚN NHẤT TỪ FILE GỐC (Đảm bảo bắt đủ 8 cột trở lên)
    const maxCols = Math.max(...matrix.map(row => Array.isArray(row) ? row.length : 1), 1);
    const percentWidth = (100 / maxCols).toFixed(2) + '%';

    let htmlOutput = `
        <div style="width: 100%; overflow-x: auto;">
            <table style="width: 100%; table-layout: fixed; border-collapse: collapse; font-size: 11px; background: #ffffff; min-width: ${maxCols * 60}px;">
                <tbody>
    `;

    matrix.forEach((row, rIdx) => {
        htmlOutput += `<tr>`;
        for (let cIdx = 0; cIdx < maxCols; cIdx++) {
            const cell = (Array.isArray(row) && row[cIdx] !== undefined && row[cIdx] !== null) ? row[cIdx] : '';

            const isHeader = (rIdx === 0);
            const bgColor = isHeader ? '#faf5ff' : '#ffffff';
            const textColor = isHeader ? '#6b21a8' : '#1f2937';
            const fontWeight = isHeader ? 'bold' : 'normal';

            htmlOutput += `
                <td style="width: ${percentWidth}; border: 1px solid #d8b4fe; padding: 5px 3px; text-align: center; background: ${bgColor}; color: ${textColor}; font-weight: ${fontWeight}; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${cell}">
                    ${cell}
                </td>
            `;
        }
        htmlOutput += `</tr>`;
    });

    htmlOutput += `
                </tbody>
            </table>
        </div>
    `;

    noiDung.innerHTML = htmlOutput;
};

// =======================================================
// CÁC HÀM XỬ LÝ THÊM/XÓA TÊN HỌC SINH TẠI CHỖ
// =======================================================

// Hàm xóa tên: Xóa phần tử tại vị trí index, kéo các tên phía dưới trồi lên
window.ham_18_xoa_ten_hs = function (index) {
    const tenBiXoa = window.DanhSachHocSinhTam[index];

    // Nếu thích cẩn thận, thầy có thể mở khóa dòng confirm dưới đây:
    // if (!confirm(`Thầy/Cô có chắc muốn xóa tên: ${tenBiXoa}?`)) return;

    window.DanhSachHocSinhTam.splice(index, 1);

    // Render lại bảng ngay lập tức
    window.ham_18_render_preview_tong_hop();
};

// Hàm thêm tên: Hiện popup hỏi tên, chèn vào vị trí index, đẩy các tên phía dưới lùi xuống
window.ham_18_them_ten_hs = async function (index) {
    const { value: tenMoi } = await Swal.fire({
        title: '➕ Chèn thêm học sinh',
        html: `<p style="font-size: 14px; color: #666; margin-bottom: 10px;">Nhập Họ và Tên học sinh bị thiếu.<br>Tên này sẽ được chèn vào <b>Vị trí số ${index + 1}</b>, các tên phía dưới sẽ tự động lùi xuống 1 bậc để khớp với ảnh.</p>`,
        input: 'text',
        inputPlaceholder: 'VD: Nguyễn Văn A...',
        showCancelButton: true,
        confirmButtonColor: '#28a745',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Chèn vào danh sách',
        cancelButtonText: 'Hủy',
        inputValidator: (value) => {
            if (!value || value.trim() === '') {
                return 'Thầy/Cô chưa nhập tên học sinh!';
            }
        }
    });

    if (tenMoi) {
        // Chèn tên mới vào đúng vị trí index (0 phần tử bị xóa)
        window.DanhSachHocSinhTam.splice(index, 0, tenMoi.trim());

        // Render lại bảng
        window.ham_18_render_preview_tong_hop();

        // Thông báo nhẹ
        const Toast = Swal.mixin({
            toast: true, position: 'top-end', showConfirmButton: false, timer: 1500
        });
        Toast.fire({ icon: 'success', title: `Đã chèn: ${tenMoi.trim()}` });
    }
};



// // =====================================================================
// // KHỐI 18.1: MỞ GIAO DIỆN (ĐÃ CẬP NHẬT VỊ TRÍ KHUNG HIỂN THỊ ẢNH)
// // =====================================================================
// window.ham_18_1_mo_giao_dien_so_do_lop = async function () {
//     const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
//     if (!vungLamViec) return;

//     vungLamViec.innerHTML = `
//         <div style="padding: 10px; animation: fadeIn 0.3s ease-in-out;">
//             <h3 style="color: #0056b3; border-bottom: 2px solid #0056b3; padding-bottom: 10px; margin-top: 0; text-transform: uppercase;">
//                 📍 Tiện ích: Tạo sơ đồ lớp học
//             </h3>

//             <!-- BƯỚC 1: NẠP DỮ LIỆU ĐẦU VÀO -->
//             <div style="margin-top: 20px; padding: 20px; background: #fff; border-radius: 8px; border: 1px solid #ddd; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
//                 <h4 style="margin-top: 0; color: #d35400; margin-bottom: 20px;">BƯỚC 1: CUNG CẤP DỮ LIỆU SƠ ĐỒ</h4>
                
//                 <div style="display: flex; gap: 20px; flex-wrap: wrap;">
                    
//                     <!-- 1. Chọn file hình thẻ -->
//                     <div style="flex: 1; min-width: 280px; padding: 20px; background: #f8f9fa; border-radius: 8px; border: 1px dashed #17a2b8; display: flex; flex-direction: column;">
//                         <label style="font-weight: bold; color: #17a2b8; font-size: 15px; margin-bottom: 8px;">
//                             🖼️ 1. Hình thẻ học sinh
//                         </label>
//                         <div style="font-size: 13px; color: #6c757d; margin-bottom: 15px; flex-grow: 1;">
//                             Chọn ảnh từ máy tính hoặc nạp hàng loạt từ thư mục Google Drive. Tên file nên đặt theo mã hoặc tên học sinh.
//                         </div>
                        
//                         <!-- Thanh nút nạp ảnh -->
//                         <div style="display: flex; gap: 10px; margin-bottom: 15px;">
//                             <button onclick="document.getElementById('input-anh-local').click()" style="flex: 1; padding: 8px; background: #fff; border: 2px solid #17a2b8; color: #17a2b8; border-radius: 6px; font-weight: bold; cursor: pointer; transition: 0.2s;">
//                                 💻 Từ máy tính
//                             </button>
//                             <input type="file" id="input-anh-local" accept="image/*" multiple style="display: none;" onchange="ham_18_a1_xu_ly_anh_local(event)">
                            
//                             <button onclick="ham_18_a2_mo_google_picker()" style="flex: 1; padding: 8px; background: #ea4335; border: none; color: white; border-radius: 6px; font-weight: bold; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
//                                 ☁️ Từ G.Drive
//                             </button>
//                         </div>

//                         <!-- Nút lưu lên Drive (Ẩn mặc định, hiện khi chọn ảnh Local) -->
//                         <button id="btn-up-drive" onclick="ham_18_a3_up_anh_len_drive()" style="display: none; width: 100%; padding: 10px; background: #fbbc05; color: #000; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin-top: auto;">
//                             ⬆️ Sao lưu ảnh lên Drive
//                         </button>
//                     </div>

//                     <!-- 2. Chọn file danh sách -->
// <div style="flex: 1; min-width: 280px; padding: 20px; background: #f8f9fa; border-radius: 8px; border: 1px dashed #28a745; display: flex; flex-direction: column;">
//     <label style="font-weight: bold; color: #28a745; font-size: 15px; margin-bottom: 8px;">
//         📋 2. Danh sách học sinh
//     </label>
//     <div style="font-size: 13px; color: #6c757d; margin-bottom: 15px; flex-grow: 1;">
//         Tải lên file Excel (.xlsx) hoặc Word (.docx) chứa cột STT và Họ Tên.
//     </div>

//     <!-- Thanh 2 nút nạp Danh sách (Local & Drive) -->
//     <div style="display: flex; gap: 10px; margin-bottom: 15px;">
//         <button onclick="document.getElementById('input-ds-local').click()" style="flex: 1; padding: 8px; background: #fff; border: 2px solid #28a745; color: #28a745; border-radius: 6px; font-weight: bold; cursor: pointer; transition: 0.2s;">
//             💻 Từ máy tính
//         </button>
//         <!-- Thẻ input ẩn để gọi hộp thoại chọn file ổ cứng -->
//         <input type="file" id="input-ds-local" accept=".xlsx, .xls, .docx" style="display: none;" onchange="ham_18_b1_xu_ly_danh_sach_local(event)">

//         <button onclick="ham_18_b2_mo_google_picker_danh_sach()" style="flex: 1; padding: 8px; background: #ea4335; border: none; color: white; border-radius: 6px; font-weight: bold; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
//             ☁️ Từ G.Drive
//         </button>
//     </div>

//     <!-- Hiển thị tên file đang được chọn -->
//     <div id="ten-file-ds-hien-tai" style="font-size: 13px; font-weight: bold; color: #0056b3; margin-bottom: 10px; text-align: center; word-break: break-all; min-height: 20px;">
//         Chưa có danh sách
//     </div>

//     <!-- Nút lưu lên Drive (Ẩn mặc định, chỉ hiện ra khi giáo viên nạp file từ máy tính) -->
//     <button id="btn-up-drive-ds" onclick="ham_18_b3_up_file_danh_sach_len_drive()" style="display: none; width: 100%; padding: 10px; background: #fbbc05; color: #000; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin-top: auto;">
//         ⬆️ Sao lưu Danh sách lên Drive
//     </button>
// </div>

//                     <!-- 3. Chọn file sơ đồ (Mới: Hỗ trợ máy tính, Drive & Sao lưu) -->
//                     <div style="flex: 1; min-width: 280px; padding: 20px; background: #f8f9fa; border-radius: 8px; border: 1px dashed #6f42c1; display: flex; flex-direction: column;">
//                         <label style="font-weight: bold; color: #6f42c1; font-size: 15px; margin-bottom: 8px;">
//                             🗺️ 3. Chọn file sơ đồ lớp
//                         </label>

//                         <!-- KHU VỰC TẢI FILE MẪU -->
// <div style="margin-bottom: 15px; padding: 12px; background: #e0f7fa; border-radius: 6px; border: 1px dashed #00acc1;">
//     <p style="margin: 0 0 10px 0; font-weight: bold; color: #00838f;">📥 Tải file sơ đồ mẫu (Dành cho GV chưa có file):</p>
//     <div style="display: flex; gap: 10px;">
//         <button type="button" onclick="ham_18_tao_file_mau_word_so_do()" style="padding: 8px 15px; background: #2b579a; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 13px; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
//             📄 Tải mẫu Word
//         </button>
//         <button type="button" onclick="ham_18_tao_file_mau_excel_so_do()" style="padding: 8px 15px; background: #217346; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 13px; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
//             📊 Tải mẫu Excel
//         </button>
//     </div>
//     <p style="margin: 8px 0 0 0; font-size: 12px; color: #555; font-style: italic;">
//         * Thầy cô tải file về, điền các số thứ tự 1, 2, 3... vào vị trí chỗ ngồi mong muốn rồi nạp lên hệ thống.
//     </p>
// </div>


//                         <div style="font-size: 13px; color: #6c757d; margin-bottom: 15px; flex-grow: 1;">
//                             Tải lên file sơ đồ (Excel hoặc Word) để lấy thông tin xếp chỗ.
//                         </div>

//                         <!-- Thanh 2 nút nạp Sơ đồ (Local & Drive) -->
//                         <div style="display: flex; gap: 10px; margin-bottom: 15px;">
//                             <button onclick="document.getElementById('input-so-do-local').click()" style="flex: 1; padding: 8px; background: #fff; border: 2px solid #6f42c1; color: #6f42c1; border-radius: 6px; font-weight: bold; cursor: pointer; transition: 0.2s;">
//                                 💻 Từ máy tính
//                             </button>
//                             <!-- Thẻ input ẩn cho phép chọn cả Ảnh, Excel, Word -->
//                             <input type="file" id="input-so-do-local" accept="image/*, .xlsx, .xls, .docx" style="display: none;" onchange="ham_18_c1_xu_ly_so_do_local(event)">

//                             <button onclick="ham_18_c2_mo_google_picker_so_do()" style="flex: 1; padding: 8px; background: #ea4335; border: none; color: white; border-radius: 6px; font-weight: bold; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
//                                 ☁️ Từ G.Drive
//                             </button>
//                         </div>

//                         <!-- Hiển thị tên file sơ đồ đang chọn -->
//                         <div id="ten-file-so-do-hien-tai" style="font-size: 13px; font-weight: bold; color: #6f42c1; margin-bottom: 10px; text-align: center; word-break: break-all; min-height: 20px;">
//                             Chưa có sơ đồ
//                         </div>

//                         <!-- Nút lưu sơ đồ lên Drive (Ẩn mặc định, chỉ hiện khi chọn từ máy tính) -->
//                         <button id="btn-up-drive-so-do" onclick="ham_18_c3_up_file_so_do_len_drive()" style="display: none; width: 100%; padding: 10px; background: #fbbc05; color: #000; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin-top: auto;">
//                             ⬆️ Sao lưu Sơ đồ lên Drive
//                         </button>
//                     </div>
//                 </div>

//                 <!-- 🌟 KHU VỰC HIỂN THỊ SƠ ĐỒ LỚP HỌC (TO RÕ Ở TRUNG TÂM) -->
//                 <div id="khu-vuc-preview-so-do" style="display: none; margin-top: 25px; padding: 15px; background: #fff5f8; border: 1px solid #f3e8ff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.04);">
//                     <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 2px solid #e9d5ff; padding-bottom: 8px;">
//                         <div style="font-weight: bold; color: #6b21a8; font-size: 15px;">
//                             🗺️ Sơ đồ chỗ ngồi đã nạp (Cấu trúc phòng học)
//                         </div>
//                         <div style="font-size: 12px; color: #7c3aed; font-style: italic;">
//                             Hiển thị trực quan từ file sơ đồ
//                         </div>
//                     </div>

//                     <div id="noi-dung-chi-tiet-so-do" style="max-height: 300px; overflow-y: auto; background: white; border: 1px solid #e9d5ff; border-radius: 6px; padding: 10px;">
//                         <!-- Bảng sơ đồ lớp sẽ tự động bung to ở đây -->
//                     </div>
//                 </div>


//                 <!-- 🌟 KHU VỰC HIỂN THỊ ẢNH THẺ RỘNG RÃI BÊN DƯỚI -->
//                 <div id="khu-vuc-hien-thi-anh-duoi" style="display: none; margin-top: 25px; padding: 15px; background: #f4f6f9; border: 1px solid #dee2e6; border-radius: 8px; box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);">
//                     <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; border-bottom: 1px dashed #ccc; padding-bottom: 8px;">
//                         <div style="font-weight: bold; color: #17a2b8; font-size: 15px;">
//                             📸 Hình thẻ đã nạp (<span id="so-luong-anh-da-nap" style="color: #dc3545; font-size: 16px;">0</span>)
//                         </div>
//                         <div id="nguon-anh-hien-tai" style="font-size: 12px; font-weight: bold; color: #6c757d; font-style: italic;">
//                             Nguồn: -
//                         </div>
//                     </div>
                    
//                     <div id="vung-preview-anh-tong" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(75px, 1fr)); gap: 12px; max-height: 250px; overflow-y: auto; padding-right: 5px;">
//                         <!-- Các ảnh thẻ sẽ được nạp trải dài vào đây -->
//                     </div>
//                 </div>

//                 <!-- NÚT TIẾP TỤC TRÊN CÙNG -->
//                 <div style="margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px; text-align: right;">
//                     <button id="btn-xu-ly-du-lieu-so-do" onclick="ham_18_xuat_so_do_word()" style="padding: 12px 30px; background: #007bff; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; font-size: 15px; box-shadow: 0 3px 6px rgba(0,0,0,0.15); transition: 0.2s;">
//                         🚀 TIẾP TỤC: XUẤT SƠ ĐỒ RA WORD
//                     </button>
//                 </div>



//             </div>

//             <!-- BƯỚC 2: KHU VỰC THAO TÁC XẾP SƠ ĐỒ (Đang ẩn chờ nạp dữ liệu xong) -->
//             <div id="khu-vuc-thao-tac-so-do" style="display: none; margin-top: 30px; padding: 20px; background: #fff; border-radius: 8px; border: 1px solid #ddd; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
//                 <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #f8f9fa; padding-bottom: 15px; margin-bottom: 20px;">
//                     <h4 style="margin: 0; color: #856404;">BƯỚC 2: KÉO THẢ & CHỐT SƠ ĐỒ</h4>
//                     <div>
//                         <button style="padding: 8px 20px; background: #28a745; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; margin-right: 10px;">💾 Lưu sơ đồ</button>
//                         <button style="padding: 8px 20px; background: #6c757d; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">🖨️ Xuất In</button>
//                     </div>
//                 </div>

//                 <div style="display: flex; gap: 20px; min-height: 500px;">
//                     <!-- Cột trái: Danh sách học sinh chưa xếp -->
//                     <div style="width: 250px; background: #f4f6f9; border-radius: 6px; border: 1px solid #ddd; padding: 10px; display: flex; flex-direction: column;">
//                         <h5 style="margin-top: 0; text-align: center; color: #495057;">Học sinh chờ xếp</h5>
//                         <div id="danh-sach-hs-cho" style="flex-grow: 1; overflow-y: auto; background: #fff; border: 1px dashed #ccc; border-radius: 4px; padding: 10px;">
//                         </div>
//                     </div>

//                     <!-- Cột phải: Bản đồ không gian lớp -->
//                     <div style="flex-grow: 1; background: #e9ecef; border-radius: 6px; border: 2px dashed #adb5bd; position: relative; overflow: hidden; display: flex; justify-content: center; align-items: center;">
//                         <span style="color: #6c757d; font-weight: bold;">Ảnh sơ đồ lớp sẽ hiển thị ở đây...</span>
//                         <div id="vung-ban-do-nen" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-size: contain; background-repeat: no-repeat; background-position: center; pointer-events: none;"></div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     `;
// };


// =====================================================================
// KHỐI 18.1: MỞ GIAO DIỆN (ĐÃ BỔ SUNG NÚT ĐẢO NGƯỢC ẢNH)
// =====================================================================
window.ham_18_1_mo_giao_dien_so_do_lop = async function () {
    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
    if (!vungLamViec) return;

    vungLamViec.innerHTML = `
        <div style="padding: 10px; animation: fadeIn 0.3s ease-in-out;">
            <h3 style="color: #0056b3; border-bottom: 2px solid #0056b3; padding-bottom: 10px; margin-top: 0; text-transform: uppercase;">
                📍 Tiện ích: Tạo sơ đồ lớp học
            </h3>

            <!-- BƯỚC 1: NẠP DỮ LIỆU ĐẦU VÀO -->
            <div style="margin-top: 20px; padding: 20px; background: #fff; border-radius: 8px; border: 1px solid #ddd; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                <h4 style="margin-top: 0; color: #d35400; margin-bottom: 20px;">BƯỚC 1: CUNG CẤP DỮ LIỆU SƠ ĐỒ</h4>
                
                <div style="display: flex; gap: 20px; flex-wrap: wrap;">
                    
                    <!-- 1. Chọn file hình thẻ -->
                    <div style="flex: 1; min-width: 280px; padding: 20px; background: #f8f9fa; border-radius: 8px; border: 1px dashed #17a2b8; display: flex; flex-direction: column;">
                        <label style="font-weight: bold; color: #17a2b8; font-size: 15px; margin-bottom: 8px;">
                            🖼️ 1. Hình thẻ học sinh
                        </label>
                        <div style="font-size: 13px; color: #6c757d; margin-bottom: 15px; flex-grow: 1;">
                            Chọn ảnh từ máy tính hoặc nạp hàng loạt từ thư mục Google Drive. Tên file nên đặt theo mã hoặc tên học sinh.
                        </div>
                        
                        <!-- Thanh nút nạp ảnh -->
                        <div style="display: flex; gap: 10px; margin-bottom: 15px;">
                            <button onclick="document.getElementById('input-anh-local').click()" style="flex: 1; padding: 8px; background: #fff; border: 2px solid #17a2b8; color: #17a2b8; border-radius: 6px; font-weight: bold; cursor: pointer; transition: 0.2s;">
                                💻 Từ máy tính
                            </button>
                            <input type="file" id="input-anh-local" accept="image/*" multiple style="display: none;" onchange="ham_18_a1_xu_ly_anh_local(event)">
                            
                            <button onclick="ham_18_a2_mo_google_picker()" style="flex: 1; padding: 8px; background: #ea4335; border: none; color: white; border-radius: 6px; font-weight: bold; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                                ☁️ Từ G.Drive
                            </button>
                        </div>

                        <!-- Nút lưu lên Drive -->
                        <button id="btn-up-drive" onclick="ham_18_a3_up_anh_len_drive()" style="display: none; width: 100%; padding: 10px; background: #fbbc05; color: #000; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin-top: auto;">
                            ⬆️ Sao lưu ảnh lên Drive
                        </button>
                    </div>

                    <!-- 2. Chọn file danh sách -->
                    <div style="flex: 1; min-width: 280px; padding: 20px; background: #f8f9fa; border-radius: 8px; border: 1px dashed #28a745; display: flex; flex-direction: column;">
                        <label style="font-weight: bold; color: #28a745; font-size: 15px; margin-bottom: 8px;">
                            📋 2. Danh sách học sinh
                        </label>
                        <div style="font-size: 13px; color: #6c757d; margin-bottom: 15px; flex-grow: 1;">
                            Tải lên file Excel (.xlsx) hoặc Word (.docx) chứa cột STT và Họ Tên.
                        </div>

                        <!-- Thanh 2 nút nạp Danh sách -->
                        <div style="display: flex; gap: 10px; margin-bottom: 15px;">
                            <button onclick="document.getElementById('input-ds-local').click()" style="flex: 1; padding: 8px; background: #fff; border: 2px solid #28a745; color: #28a745; border-radius: 6px; font-weight: bold; cursor: pointer; transition: 0.2s;">
                                💻 Từ máy tính
                            </button>
                            <input type="file" id="input-ds-local" accept=".xlsx, .xls, .docx" style="display: none;" onchange="ham_18_b1_xu_ly_danh_sach_local(event)">

                            <button onclick="ham_18_b2_mo_google_picker_danh_sach()" style="flex: 1; padding: 8px; background: #ea4335; border: none; color: white; border-radius: 6px; font-weight: bold; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                                ☁️ Từ G.Drive
                            </button>
                        </div>

                        <!-- Hiển thị tên file đang được chọn -->
                        <div id="ten-file-ds-hien-tai" style="font-size: 13px; font-weight: bold; color: #0056b3; margin-bottom: 10px; text-align: center; word-break: break-all; min-height: 20px;">
                            Chưa có danh sách
                        </div>

                        <!-- Nút lưu lên Drive -->
                        <button id="btn-up-drive-ds" onclick="ham_18_b3_up_file_danh_sach_len_drive()" style="display: none; width: 100%; padding: 10px; background: #fbbc05; color: #000; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin-top: auto;">
                            ⬆️ Sao lưu Danh sách lên Drive
                        </button>
                    </div>

                    <!-- 3. Chọn file sơ đồ -->
                    <div style="flex: 1; min-width: 280px; padding: 20px; background: #f8f9fa; border-radius: 8px; border: 1px dashed #6f42c1; display: flex; flex-direction: column;">
                        <label style="font-weight: bold; color: #6f42c1; font-size: 15px; margin-bottom: 8px;">
                            🗺️ 3. Chọn file sơ đồ lớp
                        </label>

                        <!-- KHU VỰC TẢI FILE MẪU -->
                        <div style="margin-bottom: 15px; padding: 12px; background: #e0f7fa; border-radius: 6px; border: 1px dashed #00acc1;">
                            <p style="margin: 0 0 10px 0; font-weight: bold; color: #00838f;">📥 Tải file sơ đồ mẫu (Dành cho GV chưa có file):</p>
                            <div style="display: flex; gap: 10px;">
                                <button type="button" onclick="ham_18_tao_file_mau_word_so_do()" style="padding: 8px 15px; background: #2b579a; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 13px; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                                    📄 Tải mẫu Word
                                </button>
                                <button type="button" onclick="ham_18_tao_file_mau_excel_so_do()" style="padding: 8px 15px; background: #217346; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 13px; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                                    📊 Tải mẫu Excel
                                </button>
                            </div>
                            <p style="margin: 8px 0 0 0; font-size: 12px; color: #555; font-style: italic;">
                                * Thầy cô tải file về, điền các số thứ tự 1, 2, 3... vào vị trí chỗ ngồi mong muốn rồi nạp lên hệ thống.
                            </p>
                        </div>

                        <div style="font-size: 13px; color: #6c757d; margin-bottom: 15px; flex-grow: 1;">
                            Tải lên file sơ đồ (Excel hoặc Word) để lấy thông tin xếp chỗ.
                        </div>

                        <!-- Thanh 2 nút nạp Sơ đồ -->
                        <div style="display: flex; gap: 10px; margin-bottom: 15px;">
                            <button onclick="document.getElementById('input-so-do-local').click()" style="flex: 1; padding: 8px; background: #fff; border: 2px solid #6f42c1; color: #6f42c1; border-radius: 6px; font-weight: bold; cursor: pointer; transition: 0.2s;">
                                💻 Từ máy tính
                            </button>
                            <input type="file" id="input-so-do-local" accept="image/*, .xlsx, .xls, .docx" style="display: none;" onchange="ham_18_c1_xu_ly_so_do_local(event)">

                            <button onclick="ham_18_c2_mo_google_picker_so_do()" style="flex: 1; padding: 8px; background: #ea4335; border: none; color: white; border-radius: 6px; font-weight: bold; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                                ☁️ Từ G.Drive
                            </button>
                        </div>

                        <!-- Hiển thị tên file sơ đồ đang chọn -->
                        <div id="ten-file-so-do-hien-tai" style="font-size: 13px; font-weight: bold; color: #6f42c1; margin-bottom: 10px; text-align: center; word-break: break-all; min-height: 20px;">
                            Chưa có sơ đồ
                        </div>

                        <!-- Nút lưu sơ đồ lên Drive -->
                        <button id="btn-up-drive-so-do" onclick="ham_18_c3_up_file_so_do_len_drive()" style="display: none; width: 100%; padding: 10px; background: #fbbc05; color: #000; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin-top: auto;">
                            ⬆️ Sao lưu Sơ đồ lên Drive
                        </button>
                    </div>
                </div>

                <!-- 🌟 KHU VỰC HIỂN THỊ SƠ ĐỒ LỚP HỌC (TO RÕ Ở TRUNG TÂM) -->
                <div id="khu-vuc-preview-so-do" style="display: none; margin-top: 25px; padding: 15px; background: #fff5f8; border: 1px solid #f3e8ff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.04);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 2px solid #e9d5ff; padding-bottom: 8px;">
                        <div style="font-weight: bold; color: #6b21a8; font-size: 15px;">
                            🗺️ Sơ đồ chỗ ngồi đã nạp (Cấu trúc phòng học)
                        </div>
                        <div style="font-size: 12px; color: #7c3aed; font-style: italic;">
                            Hiển thị trực quan từ file sơ đồ
                        </div>
                    </div>

                    <div id="noi-dung-chi-tiet-so-do" style="max-height: 300px; overflow-y: auto; background: white; border: 1px solid #e9d5ff; border-radius: 6px; padding: 10px;">
                        <!-- Bảng sơ đồ lớp sẽ tự động bung to ở đây -->
                    </div>
                </div>

                <!-- 🌟 KHU VỰC HIỂN THỊ ẢNH THẺ RỘNG RÃI BÊN DƯỚI -->
                <div id="khu-vuc-hien-thi-anh-duoi" style="display: none; margin-top: 25px; padding: 15px; background: #f4f6f9; border: 1px solid #dee2e6; border-radius: 8px; box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);">
                    
                    <!-- TIÊU ĐỀ KHU VỰC VÀ NÚT ĐẢO NGƯỢC -->
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; border-bottom: 1px dashed #ccc; padding-bottom: 8px;">
                        <div style="font-weight: bold; color: #17a2b8; font-size: 15px; display: flex; align-items: center; gap: 15px;">
                            <span>📸 Hình thẻ đã nạp (<span id="so-luong-anh-da-nap" style="color: #dc3545; font-size: 16px;">0</span>)</span>
                            
                            <!-- 🌟 NÚT ĐẢO NGƯỢC NẰM Ở ĐÂY -->
                            <button onclick="ham_dao_nguoc_thu_tu_anh()" style="padding: 4px 12px; background: #ffc107; color: #000; border: 1px solid #d39e00; border-radius: 4px; font-size: 12px; font-weight: bold; cursor: pointer; box-shadow: 0 1px 2px rgba(0,0,0,0.1); transition: 0.2s;" onmouseover="this.style.background='#e0a800'" onmouseout="this.style.background='#ffc107'">
                                🔃 Đảo thứ tự ảnh (Sửa lỗi ĐT)
                            </button>
                        </div>
                        
                        <div id="nguon-anh-hien-tai" style="font-size: 12px; font-weight: bold; color: #6c757d; font-style: italic;">
                            Nguồn: -
                        </div>
                    </div>
                    
                    <div id="vung-preview-anh-tong" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(75px, 1fr)); gap: 12px; max-height: 250px; overflow-y: auto; padding-right: 5px;">
                        <!-- Các ảnh thẻ sẽ được nạp trải dài vào đây -->
                    </div>
                </div>

                <!-- NÚT TIẾP TỤC TRÊN CÙNG -->
                <div style="margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px; text-align: right;">
                    <button id="btn-xu-ly-du-lieu-so-do" onclick="ham_18_xuat_so_do_word()" style="padding: 12px 30px; background: #007bff; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; font-size: 15px; box-shadow: 0 3px 6px rgba(0,0,0,0.15); transition: 0.2s;">
                        🚀 TIẾP TỤC: XUẤT SƠ ĐỒ RA FILE WORD/PDF
                    </button>
                </div>
            </div>
        </div>
    `;
};

// =======================================================
// HÀM 18.A1: XỬ LÝ ẢNH CHỌN TỪ MÁY TÍNH (ĐÃ FIX LỖI GIAO DIỆN)
// =======================================================
window.ham_18_a1_xu_ly_anh_local = function (event) {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const btnUpDrive = document.getElementById('btn-up-drive');

    // 1. Chỉ xóa bộ nhớ mảng ẢNH cũ, tuyệt đối KHÔNG đụng tới mảng TÊN
    window.DanhSachAnhSoDoTam = [];

    // 2. Nạp ảnh mới vào mảng
    Array.from(files).forEach(file => {
        if (!file.type.startsWith('image/')) return;
        const previewUrl = URL.createObjectURL(file);

        window.DanhSachAnhSoDoTam.push({
            name: file.name,
            fileObj: file,
            url: previewUrl,
            source: 'local'
        });
    });

    // 3. Hiện nút sao lưu lên Drive (nếu có ảnh)
    if (btnUpDrive && window.DanhSachAnhSoDoTam.length > 0) {
        btnUpDrive.style.display = 'block';
        btnUpDrive.disabled = false;
        btnUpDrive.innerHTML = '⬆️ Sao lưu ảnh lên Drive';
    }

    // 4. 🌟 GỌI HÀM TỔNG TƯ LỆNH ĐỂ VẼ BẢNG RÁP NỐI (ẢNH + TÊN)
    if (typeof window.ham_18_render_preview_tong_hop === 'function') {
        window.ham_18_render_preview_tong_hop();
    }

    event.target.value = ''; // Reset input để chọn lại không bị đơ
};


// =======================================================
// HÀM 18.A2: CHỌN ẢNH TỪ GOOGLE DRIVE (ĐÃ FIX LỖI GIAO DIỆN)
// =======================================================
window.ham_18_a2_mo_google_picker = async function () {
    const btnUpDrive = document.getElementById('btn-up-drive');

    // 1. TẢI CÂY THƯ MỤC
    Swal.fire({ title: 'Đang kết nối kho ảnh...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

    let dsThuMucHtml = '<option value="">-- Chọn thư mục chứa ảnh của lớp --</option>';
    try {
        const reqTree = await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
            method: "POST", body: JSON.stringify({ action: "lay_cay_thu_muc_anh" })
        });
        const resTree = await reqTree.json();

        if (resTree.status === "success" && resTree.data.length > 0) {
            resTree.data.forEach(folder => {
                let level = (folder.name.match(/--- /g) || []).length;
                let cleanName = folder.name.replace(/--- /g, '').replace('⭐ [THƯ MỤC GỐC] ', '');
                let indent = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'.repeat(level);
                let icon = level === 0 ? '⭐ [GỐC] ' : ' ↳ 📁 ';
                dsThuMucHtml += `<option value="${folder.id}">${indent}${icon}${cleanName}</option>`;
            });
        }
    } catch (error) {
        dsThuMucHtml = `<option value="">❌ Không thể tải danh sách (Vui lòng dán link)</option>`;
    }

    // 2. POPUP CHỌN THƯ MỤC (Thiết kế 2 Tab)
    const { value: folderIdChon } = await Swal.fire({
        title: '☁️ Nạp ảnh từ Drive',
        width: 600,
        html: `
            <div style="text-align: left; font-size: 14px;">
                <div style="margin-bottom: 15px; display: flex; gap: 20px; justify-content: center; background: #e9ecef; padding: 10px; border-radius: 6px;">
                    <label style="cursor:pointer; font-weight:bold; color: #0056b3;">
                        <input type="radio" name="r_chon_anh" id="radio-tree-anh" checked> 📂 Chọn từ danh sách
                    </label>
                    <label style="cursor:pointer; font-weight:bold; color: #d35400;">
                        <input type="radio" name="r_chon_anh" id="radio-link-anh"> 🔗 Dán link trực tiếp
                    </label>
                </div>

                <div id="khu-vuc-tree-anh" style="background: #f4f6f9; padding: 15px; border-radius: 6px; border: 1px solid #ced4da;">
                    <p style="margin: 0 0 5px 0; font-weight: bold; color: #0056b3;">Chọn thư mục chứa hình thẻ:</p>
                    <select id="swal-select-folder-get" style="width: 100%; padding: 10px; border-radius: 4px; border: 2px solid #17a2b8; outline: none; font-weight: bold;">
                        ${dsThuMucHtml}
                    </select>
                </div>

                <div id="khu-vuc-link-anh" style="display: none; background: #fff3cd; padding: 15px; border-radius: 6px; border: 1px solid #ffeeba;">
                    <p style="margin: 0 0 5px 0; font-weight: bold; color: #856404;">Dán link hoặc ID thư mục:</p>
                    <input id="swal-drive-link-get" class="swal2-input" placeholder="Dán link Drive vào đây..." style="width: 100%; box-sizing: border-box; margin: 0; font-size: 14px;">
                </div>
            </div>
        `,
        showCancelButton: true, confirmButtonColor: '#ea4335', confirmButtonText: '📥 Trích xuất ảnh',
        didOpen: () => {
            document.getElementById('radio-tree-anh').onchange = () => {
                document.getElementById('khu-vuc-tree-anh').style.display = 'block';
                document.getElementById('khu-vuc-link-anh').style.display = 'none';
            };
            document.getElementById('radio-link-anh').onchange = () => {
                document.getElementById('khu-vuc-tree-anh').style.display = 'none';
                document.getElementById('khu-vuc-link-anh').style.display = 'block';
            };
        },
        preConfirm: () => {
            const isTabTree = document.getElementById('radio-tree-anh').checked;
            if (isTabTree) {
                const idSelect = document.getElementById('swal-select-folder-get').value;
                if (!idSelect) { Swal.showValidationMessage('Vui lòng chọn thư mục!'); return false; }
                return idSelect;
            } else {
                const idInput = document.getElementById('swal-drive-link-get').value.trim();
                if (!idInput) { Swal.showValidationMessage('Vui lòng dán link!'); return false; }
                let finalId = idInput;
                const matchFolder = idInput.match(/folders\/([a-zA-Z0-9_-]+)/);
                if (matchFolder) finalId = matchFolder[1];
                else if (idInput.includes('id=')) {
                    const matchId = idInput.match(/id=([a-zA-Z0-9_-]+)/);
                    if (matchId) finalId = matchId[1];
                }
                return finalId;
            }
        }
    });

    if (!folderIdChon) return;

    // 3. LẤY FILE ẢNH VÀ CẬP NHẬT GIAO DIỆN
    Swal.fire({ title: 'Đang trích xuất ảnh...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

    try {
        const reqFiles = await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
            method: "POST", body: JSON.stringify({ action: "lay_danh_sach_file_anh", folderId: folderIdChon })
        });
        const resFiles = await reqFiles.json();

        if (resFiles.status !== "success") throw new Error(resFiles.message);

        const dsAnh = resFiles.data;
        if (dsAnh.length === 0) return Swal.fire('Thư mục rỗng', 'Không tìm thấy ảnh!', 'info');

        // CHỈ làm sạch mảng ẢNH, giữ nguyên TÊN
        window.DanhSachAnhSoDoTam = [];
        if (btnUpDrive) btnUpDrive.style.display = 'none'; // File từ Drive rồi thì tắt nút lưu lên Drive

        dsAnh.forEach(img => {
            window.DanhSachAnhSoDoTam.push({
                name: img.name,
                fileObj: null,
                url: img.url,
                source: 'drive'
            });
        });

        // 🌟 GỌI HÀM TỔNG TƯ LỆNH ĐỂ VẼ BẢNG
        if (typeof window.ham_18_render_preview_tong_hop === 'function') {
            window.ham_18_render_preview_tong_hop();
        }

        Swal.fire({ icon: 'success', title: 'Hoàn tất', text: `Đã nạp ${dsAnh.length} ảnh thẻ`, timer: 1500, showConfirmButton: false });

    } catch (error) {
        Swal.fire('Lỗi trích xuất', error.message, 'error');
    }
};

// =======================================================
// HÀM 18.A3: ĐẨY ẢNH LÊN GOOGLE DRIVE (FULL TÍNH NĂNG CÂY THƯ MỤC)
// =======================================================
window.ham_18_a3_up_anh_len_drive = async function () {
    const localFiles = window.DanhSachAnhSoDoTam.filter(img => img.source === 'local');
    if (localFiles.length === 0) return;

    // 1. HIỆN BẢNG LOADING VÀ TẢI CÂY THƯ MỤC
    Swal.fire({
        title: 'Đang tải cây thư mục...',
        text: 'Đang đồng bộ với Google Drive...',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading()
    });

    let dsThuMucHtml = '<option value="">-- Chọn một vị trí thư mục --</option>';
    try {
        const reqTree = await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
            method: "POST",
            body: JSON.stringify({ action: "lay_cay_thu_muc_anh" })
        });
        const resTree = await reqTree.json();

        if (resTree.status === "success" && resTree.data.length > 0) {
            resTree.data.forEach(folder => {
                // Đếm số cấp độ (dựa vào số lượng "---" trả về từ Apps Script)
                let level = (folder.name.match(/--- /g) || []).length;

                // Dọn dẹp tên cho sạch sẽ
                let cleanName = folder.name.replace(/--- /g, '').replace('⭐ [THƯ MỤC GỐC] ', '');

                // Dùng &nbsp; để ép thẻ <option> HTML phải thụt lùi vào trong
                let indent = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'.repeat(level);
                let icon = level === 0 ? '⭐ [GỐC] ' : ' ↳ 📁 ';

                dsThuMucHtml += `<option value="${folder.id}">${indent}${icon}${cleanName}</option>`;
            });
        } else if (resTree.status === "success") {
            dsThuMucHtml = '<option value="">(Kho gốc chưa có thư mục con nào)</option>';
        } else {
            dsThuMucHtml = `<option value="">❌ Lỗi tải danh sách: ${resTree.message}</option>`;
        }
    } catch (error) {
        dsThuMucHtml = `<option value="">❌ Không thể kết nối Drive (Vui lòng dùng ô dán link bên dưới)</option>`;
    }

    // 2. HIỆN POPUP CHÍNH THỨC
    const { value: thongTinDich } = await Swal.fire({
        title: '📁 Tùy chọn nơi lưu trữ ảnh',
        width: 600,
        html: `
            <div style="text-align: left; font-size: 14px; color: #495057;">
                <div style="margin-bottom: 15px; display: flex; gap: 20px; justify-content: center; background: #e9ecef; padding: 10px; border-radius: 6px;">
                    <label style="cursor:pointer; font-weight:bold; color: #0056b3;">
                        <input type="radio" name="r_luu" id="radio-co-san" checked> 📂 Lưu vào thư mục có sẵn
                    </label>
                    <label style="cursor:pointer; font-weight:bold; color:#28a745;">
                        <input type="radio" name="r_luu" id="radio-tao-moi"> ➕ Tạo thư mục mới
                    </label>
                </div>

                <!-- TAB 1: THƯ MỤC CÓ SẴN -->
                <div id="khu-vuc-co-san" style="background: #f4f6f9; padding: 15px; border-radius: 6px; border: 1px solid #ced4da;">
                    <p style="margin: 0 0 5px 0; font-weight: bold; color: #0056b3;">1. Chọn thư mục lưu ảnh:</p>
                    <select id="swal-select-folder" style="width: 100%; padding: 10px; border-radius: 4px; border: 2px solid #17a2b8; font-weight: bold; color: #333; outline: none; cursor: pointer; background: white; margin-bottom: 15px;">
                        ${dsThuMucHtml}
                    </select>
                    
                    <hr style="border:0; border-top: 1px dashed #ccc; margin: 15px 0;">
                    
                    <p style="margin: 0 0 5px 0; font-weight: bold; color: #d35400;">2. HOẶC Dán link/ID (Nếu danh sách bị lỗi):</p>
                    <input id="swal-drive-folder" class="swal2-input" placeholder="Dán link Drive vào đây..." style="width: 100%; font-size: 14px; margin: 0; box-sizing: border-box;">
                </div>

                <!-- TAB 2: TẠO THƯ MỤC MỚI -->
                <div id="khu-vuc-tao-moi" style="display: none; background: #f8fff9; padding: 15px; border-radius: 6px; border: 1px dashed #28a745;">
                    <p style="margin: 0 0 5px 0; font-weight:bold; color: #28a745;">1. Chọn vị trí đặt thư mục mới:</p>
                    <select id="swal-parent-select" style="width: 100%; padding: 10px; border-radius: 4px; border: 1px solid #ced4da; margin-bottom: 15px; font-weight: bold; outline: none; cursor: pointer; background: white;">
                        ${dsThuMucHtml}
                    </select>
                    
                    <p style="margin: 0 0 5px 0; font-weight:bold; color: #28a745;">2. Tên thư mục mới (*):</p>
                    <input id="swal-new-folder-name" class="swal2-input" placeholder="VD: Anh_The_12A1" style="width: 100%; font-size: 14px; margin: 0; box-sizing: border-box;">
                </div>
            </div>
        `,
        showCancelButton: true,
        confirmButtonColor: '#007bff',
        cancelButtonColor: '#6c757d',
        confirmButtonText: '🚀 Bắt đầu tải lên',
        cancelButtonText: 'Hủy',
        didOpen: () => {
            document.getElementById('radio-co-san').onchange = () => {
                document.getElementById('khu-vuc-co-san').style.display = 'block';
                document.getElementById('khu-vuc-tao-moi').style.display = 'none';
            };
            document.getElementById('radio-tao-moi').onchange = () => {
                document.getElementById('khu-vuc-co-san').style.display = 'none';
                document.getElementById('khu-vuc-tao-moi').style.display = 'block';
            };
        },
        preConfirm: () => {
            const extractId = (url) => {
                if (!url) return "";
                let id = url;
                const matchFolder = url.match(/folders\/([a-zA-Z0-9_-]+)/);
                if (matchFolder) id = matchFolder[1];
                else if (url.includes('id=')) {
                    const matchId = url.match(/id=([a-zA-Z0-9_-]+)/);
                    if (matchId) id = matchId[1];
                }
                return id.trim();
            };

            const isTaoMoi = document.getElementById('radio-tao-moi').checked;

            if (isTaoMoi) {
                const tenMoi = document.getElementById('swal-new-folder-name').value.trim();
                const parentId = document.getElementById('swal-parent-select').value;

                if (!parentId) {
                    Swal.showValidationMessage('Thầy chưa chọn vị trí để đặt thư mục mới!');
                    return false;
                }
                if (!tenMoi) {
                    Swal.showValidationMessage('Thầy chưa nhập tên thư mục!');
                    return false;
                }
                return { mode: 'tao_moi', folderName: tenMoi, parentId: parentId };
            } else {
                const idNhapTay = document.getElementById('swal-drive-folder').value.trim();
                const idDropdown = document.getElementById('swal-select-folder').value;

                let finalId = idNhapTay ? extractId(idNhapTay) : idDropdown;

                if (!finalId) {
                    Swal.showValidationMessage('Vui lòng chọn thư mục từ danh sách hoặc dán link!');
                    return false;
                }
                return { mode: 'co_san', id: finalId };
            }
        }
    });

    if (!thongTinDich) return;

    const btn = document.getElementById('btn-up-drive');
    btn.disabled = true;

    const fileToBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = error => reject(error);
    });

    try {
        let folderIdUpload = "";

        Swal.fire({
            title: 'Đang xử lý...',
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading()
        });

        // TẠO THƯ MỤC MỚI THEO VỊ TRÍ ĐÃ CHỌN
        if (thongTinDich.mode === 'tao_moi') {
            Swal.update({ title: 'Đang tạo thư mục mới trên Drive...' });

            const reqTaoFolder = await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
                method: "POST",
                body: JSON.stringify({
                    action: "tao_thu_muc_moi",
                    folderName: thongTinDich.folderName,
                    parentId: thongTinDich.parentId
                })
            });
            const resTaoFolder = await reqTaoFolder.json();

            if (resTaoFolder.status === "success") {
                folderIdUpload = resTaoFolder.folderId;
            } else {
                throw new Error(resTaoFolder.message);
            }
        } else {
            folderIdUpload = thongTinDich.id;
        }

        // TẢI ẢNH VÀO THƯ MỤC ĐÃ CHỐT
        let soLuuThanhCong = 0;
        Swal.update({ title: 'Đang tải lên Drive...', html: `Đã tải: <b>0</b> / ${localFiles.length} ảnh` });

        for (let i = 0; i < localFiles.length; i++) {
            const imgObj = localFiles[i];
            const base64Data = await fileToBase64(imgObj.fileObj);

            const payload = {
                action: "upload_anh_so_do",
                name: imgObj.name,
                mimeType: imgObj.fileObj.type,
                base64: base64Data,
                folderId: folderIdUpload
            };

            const res = await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
                method: "POST",
                body: JSON.stringify(payload)
            });

            const kq = await res.json();

            if (kq.status === "success") {
                imgObj.source = 'drive';
                imgObj.url = kq.fileUrl;
                soLuuThanhCong++;
                Swal.update({ html: `Đã tải: <b>${soLuuThanhCong}</b> / ${localFiles.length} ảnh` });
            } else {
                throw new Error(kq.message);
            }
        }

        Swal.fire({
            icon: 'success',
            title: 'Tải lên hoàn tất!',
            text: `Đã lưu ${soLuuThanhCong} ảnh vào thư mục trên Drive.`,
            confirmButtonColor: '#28a745'
        });

        btn.style.display = 'none';

    } catch (error) {
        Swal.fire('Lỗi Tải Lên', error.message, 'error');
        btn.disabled = false;
        btn.innerHTML = '⬆️ Thử sao lưu lại';
    }
};


// =======================================================
// HÀM 18.B1: XỬ LÝ FILE DANH SÁCH (TỪ Ổ CỨNG)
// =======================================================
window.ham_18_b1_xu_ly_danh_sach_local = async function (event) {
    const file = event.target.files[0];
    if (!file) return;

    window.FileDanhSachTam = file;
    document.getElementById('ten-file-ds-hien-tai').innerText = `📄 ${file.name}`;

    // Kích hoạt nút Upload Drive
    const btnUp = document.getElementById('btn-up-drive-ds');
    btnUp.style.display = 'block';
    btnUp.disabled = false;
    btnUp.innerHTML = '⬆️ Sao lưu Danh sách lên Drive';

    // ĐỌC DỮ LIỆU EXCEL / WORD BẰNG THƯ VIỆN 
    // Yêu cầu thư viện: SheetJS (XLSX) và Mammoth
    try {
        window.DanhSachHocSinhTam = [];
        const arrayBuffer = await file.arrayBuffer();

        if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
            const workbook = XLSX.read(arrayBuffer, { type: 'array' });
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

            // Giả định cột chứa tên là cột dài nhất hoặc cột đầu tiên chứa chữ
            jsonData.forEach(row => {
                const text = row.find(cell => typeof cell === 'string' && cell.trim().length > 3);
                if (text) window.DanhSachHocSinhTam.push(text.trim());
            });
        }
        else if (file.name.endsWith('.docx')) {
            const result = await mammoth.extractRawText({ arrayBuffer: arrayBuffer });
            const lines = result.value.split('\n').filter(line => line.trim().length > 3);
            window.DanhSachHocSinhTam = lines.map(l => l.trim());
        }

        // Gọi hàm Render tổng hợp để ráp tên vào hình ngay lập tức
        ham_18_render_preview_tong_hop();

    } catch (error) {
        Swal.fire('Lỗi đọc file', 'Không thể bóc tách dữ liệu từ file này: ' + error.message, 'error');
    }

    event.target.value = ''; // Reset input
};

// =======================================================
// HÀM 18.B2: LẤY FILE DANH SÁCH TỪ G.DRIVE (FIX LOGIC CHỌN FILE)
// =======================================================
window.ham_18_b2_mo_google_picker_danh_sach = async function () {
    // 1. TẢI CÂY THƯ MỤC TRƯỚC ĐỂ LÀM DANH SÁCH CHỌN
    Swal.fire({ title: 'Đang kết nối kho dữ liệu...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

    let dsThuMucHtml = '<option value="">-- Chọn thư mục chứa file --</option>';
    try {
        const reqTree = await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
            method: "POST", body: JSON.stringify({ action: "lay_cay_thu_muc_anh" }) // Dùng chung API lấy cây thư mục
        });
        const resTree = await reqTree.json();

        if (resTree.status === "success" && resTree.data.length > 0) {
            resTree.data.forEach(folder => {
                let level = (folder.name.match(/--- /g) || []).length;
                let cleanName = folder.name.replace(/--- /g, '').replace('⭐ [THƯ MỤC GỐC] ', '');
                let indent = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'.repeat(level);
                let icon = level === 0 ? '⭐ [GỐC] ' : ' ↳ 📁 ';
                dsThuMucHtml += `<option value="${folder.id}">${indent}${icon}${cleanName}</option>`;
            });
        }
    } catch (error) {
        dsThuMucHtml = `<option value="">❌ Không thể tải danh sách (Vui lòng dán link file)</option>`;
    }

    // 2. HIỂN THỊ POPUP CHỌN FILE (Giao diện mới 100%)
    const { value: fileIdChon } = await Swal.fire({
        title: '📄 Chọn file Danh sách từ Drive',
        width: 650,
        html: `
            <div style="text-align: left; font-size: 14px; color: #495057;">
                
                <!-- Thanh chọn Tab -->
                <div style="margin-bottom: 15px; display: flex; gap: 20px; justify-content: center; background: #e9ecef; padding: 10px; border-radius: 6px;">
                    <label style="cursor:pointer; font-weight:bold; color: #d35400;">
                        <input type="radio" name="r_chon_ds" id="radio-link-ds" checked> 🔗 Dán link File trực tiếp
                    </label>
                    <label style="cursor:pointer; font-weight:bold; color:#0056b3;">
                        <input type="radio" name="r_chon_ds" id="radio-tree-ds"> 📂 Tìm trong thư mục
                    </label>
                </div>

                <!-- TAB 1: DÁN LINK FILE -->
                <div id="khu-vuc-link-ds" style="background: #fff3cd; padding: 15px; border-radius: 6px; border: 1px solid #ffeeba;">
                    <p style="margin: 0 0 5px 0; font-weight: bold; color: #856404;">Dán link hoặc ID của file Excel / Word:</p>
                    <input id="swal-file-link" class="swal2-input" placeholder="VD: https://docs.google.com/spreadsheets/d/1A2B..." style="width: 100%; box-sizing: border-box; margin: 0; font-size: 14px;">
                    <p style="font-size: 12px; color: #6c757d; margin-top: 5px; font-style: italic;">*Hệ thống tự động lọc ID từ link Google Sheets / Docs.</p>
                </div>

                <!-- TAB 2: DUYỆT TÌM TRONG THƯ MỤC -->
                <div id="khu-vuc-tree-ds" style="display: none; background: #f4f6f9; padding: 15px; border-radius: 6px; border: 1px solid #ced4da;">
                    
                    <p style="margin: 0 0 5px 0; font-weight: bold; color: #0056b3;">Bước 1: Chọn thư mục lớp</p>
                    <select id="swal-folder-select" style="width: 100%; padding: 10px; border-radius: 4px; border: 1px solid #adb5bd; outline: none; margin-bottom: 15px;">
                        ${dsThuMucHtml}
                    </select>
                    
                    <p style="margin: 0 0 5px 0; font-weight: bold; color: #28a745;">Bước 2: Bấm chọn file Danh sách</p>
                    <select id="swal-file-select" disabled style="width: 100%; padding: 10px; border-radius: 4px; border: 2px solid #28a745; outline: none; font-weight: bold; background: #e9ecef;">
                        <option value="">-- Vui lòng chọn thư mục ở trên trước --</option>
                    </select>

                </div>
            </div>
        `,
        showCancelButton: true,
        confirmButtonColor: '#28a745',
        cancelButtonColor: '#6c757d',
        confirmButtonText: '📥 Nạp dữ liệu',
        didOpen: () => {
            // Chuyển qua lại giữa 2 Tab
            document.getElementById('radio-link-ds').onchange = () => {
                document.getElementById('khu-vuc-link-ds').style.display = 'block';
                document.getElementById('khu-vuc-tree-ds').style.display = 'none';
            };
            document.getElementById('radio-tree-ds').onchange = () => {
                document.getElementById('khu-vuc-link-ds').style.display = 'none';
                document.getElementById('khu-vuc-tree-ds').style.display = 'block';
            };

            // THUẬT TOÁN ĐỘNG: Khi chọn thư mục -> Gắn mồi load danh sách file
            document.getElementById('swal-folder-select').onchange = async function () {
                const folderId = this.value;
                const fileSelect = document.getElementById('swal-file-select');

                if (!folderId) {
                    fileSelect.innerHTML = '<option value="">-- Vui lòng chọn thư mục ở trên trước --</option>';
                    fileSelect.disabled = true;
                    fileSelect.style.background = '#e9ecef';
                    return;
                }

                fileSelect.disabled = true;
                fileSelect.innerHTML = '<option value="">⏳ Đang tìm file Excel/Word...</option>';
                fileSelect.style.background = '#e9ecef';

                try {
                    const reqFiles = await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
                        method: "POST", body: JSON.stringify({ action: "lay_danh_sach_file_van_ban", folderId: folderId })
                    });
                    const resFiles = await reqFiles.json();

                    if (resFiles.status === "success" && resFiles.data.length > 0) {
                        let fHtml = '<option value="">-- Bấm vào đây để chọn file --</option>';
                        resFiles.data.forEach(f => {
                            fHtml += `<option value="${f.id}">📄 ${f.name}</option>`;
                        });
                        fileSelect.innerHTML = fHtml;
                        fileSelect.disabled = false;
                        fileSelect.style.background = '#fff';
                    } else {
                        fileSelect.innerHTML = '<option value="">❌ Thư mục này không có file Excel hay Word nào</option>';
                    }
                } catch (e) {
                    fileSelect.innerHTML = '<option value="">❌ Lỗi kết nối mạng</option>';
                }
            };
        },
        preConfirm: () => {
            const isTabLink = document.getElementById('radio-link-ds').checked;

            if (isTabLink) {
                const url = document.getElementById('swal-file-link').value.trim();
                if (!url) { Swal.showValidationMessage('Vui lòng dán link file!'); return false; }

                // Thuật toán gắp ID từ link File Google Sheets hoặc Docs
                let fileId = url;
                const matchDoc = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
                if (matchDoc) fileId = matchDoc[1];
                else if (url.includes('id=')) {
                    const matchId = url.match(/id=([a-zA-Z0-9_-]+)/);
                    if (matchId) fileId = matchId[1];
                }
                return fileId;
            } else {
                // Tab duyệt thư mục
                const fileId = document.getElementById('swal-file-select').value;
                if (!fileId) { Swal.showValidationMessage('Thầy chưa bấm chọn file từ danh sách!'); return false; }
                return fileId;
            }
        }
    });

    if (!fileIdChon) return;

    // 3. GỌI APPS SCRIPT ĐỂ KÉO RUỘT FILE ĐÓ VỀ VÀ BÓC TÁCH DỮ LIỆU
    Swal.fire({ title: 'Đang đọc dữ liệu file...', didOpen: () => Swal.showLoading() });

    try {
        const reqContent = await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
            method: "POST", body: JSON.stringify({ action: "doc_file_van_ban_drive", fileId: fileIdChon })
        });
        const resContent = await reqContent.json();

        if (resContent.status !== "success") throw new Error(resContent.message);

        // Lấy tên file do Apps Script trả về
        const selectedFileName = resContent.name;

        // Chuyển Base64 thành Mảng Byte để SheetJS/Mammoth đọc
        const binaryString = window.atob(resContent.base64Data);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
        const arrayBuffer = bytes.buffer;

        window.DanhSachHocSinhTam = [];
        if (selectedFileName.endsWith('.xlsx') || selectedFileName.endsWith('.xls')) {
            const workbook = XLSX.read(arrayBuffer, { type: 'array' });
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
            jsonData.forEach(row => {
                const text = row.find(cell => typeof cell === 'string' && cell.trim().length > 3);
                if (text) window.DanhSachHocSinhTam.push(text.trim());
            });
        } else if (selectedFileName.endsWith('.docx')) {
            const result = await mammoth.extractRawText({ arrayBuffer: arrayBuffer });
            const lines = result.value.split('\n').filter(line => line.trim().length > 3);
            window.DanhSachHocSinhTam = lines.map(l => l.trim());
        }

        // Cập nhật giao diện bên ngoài
        document.getElementById('ten-file-ds-hien-tai').innerText = `📄 ${selectedFileName}`;
        document.getElementById('btn-up-drive-ds').style.display = 'none'; // File từ Drive rồi thì tắt nút lưu lên Drive đi

        // Gọi hàm Render tổng hợp để ráp tên vào hình ngay lập tức
        if (typeof window.ham_18_render_preview_tong_hop === 'function') {
            window.ham_18_render_preview_tong_hop();
        }

        Swal.fire({ icon: 'success', title: 'Thành công', text: 'Đã nạp danh sách học sinh!', timer: 1500, showConfirmButton: false });

    } catch (error) {
        Swal.fire('Lỗi truy cập File', 'Không thể bóc tách dữ liệu. Hãy chắc chắn link file là Excel hoặc Word và đã BẬT QUYỀN CHIA SẺ BẤT KỲ AI CÓ LIÊN KẾT.\n\nChi tiết: ' + error.message, 'error');
    }
};


// =======================================================
// HÀM 18.B3: ĐẨY FILE DANH SÁCH LÊN G.DRIVE (CHỌN THƯ MỤC)
// =======================================================
window.ham_18_b3_up_file_danh_sach_len_drive = async function () {
    if (!window.FileDanhSachTam) return;

    Swal.fire({ title: 'Đang tải cây thư mục...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

    let dsThuMucHtml = '<option value="">-- Chọn vị trí lưu --</option>';
    try {
        const reqTree = await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
            method: "POST", body: JSON.stringify({ action: "lay_cay_thu_muc_anh" })
        });
        const resTree = await reqTree.json();
        if (resTree.status === "success" && resTree.data.length > 0) {
            resTree.data.forEach(folder => {
                let level = (folder.name.match(/--- /g) || []).length;
                let cleanName = folder.name.replace(/--- /g, '').replace('⭐ [THƯ MỤC GỐC] ', '');
                let indent = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'.repeat(level);
                let icon = level === 0 ? '⭐ [GỐC] ' : ' ↳ 📁 ';
                dsThuMucHtml += `<option value="${folder.id}">${indent}${icon}${cleanName}</option>`;
            });
        }
    } catch (error) {
        dsThuMucHtml = `<option value="">❌ Lỗi tải danh sách</option>`;
    }

    const { value: thongTinDich } = await Swal.fire({
        title: '📁 Nơi lưu file Danh Sách',
        width: 600,
        html: `
            <div style="text-align: left; font-size: 14px;">
                <div style="margin-bottom: 15px; display: flex; gap: 20px; justify-content: center; background: #e9ecef; padding: 10px; border-radius: 6px;">
                    <label style="cursor:pointer; font-weight:bold; color: #0056b3;">
                        <input type="radio" name="r_luu_ds" id="radio-co-san-ds" checked> 📂 Thư mục có sẵn
                    </label>
                    <label style="cursor:pointer; font-weight:bold; color:#28a745;">
                        <input type="radio" name="r_luu_ds" id="radio-tao-moi-ds"> ➕ Tạo thư mục mới
                    </label>
                </div>

                <div id="khu-vuc-co-san-ds" style="background: #f4f6f9; padding: 15px; border-radius: 6px; border: 1px solid #ced4da;">
                    <p style="margin: 0 0 5px 0; font-weight: bold; color: #0056b3;">Chọn thư mục lưu file:</p>
                    <select id="swal-select-folder-ds" style="width: 100%; padding: 10px; border-radius: 4px; border: 2px solid #17a2b8; outline: none; margin-bottom: 15px; font-weight: bold;">
                        ${dsThuMucHtml}
                    </select>
                </div>

                <div id="khu-vuc-tao-moi-ds" style="display: none; background: #f8fff9; padding: 15px; border-radius: 6px; border: 1px dashed #28a745;">
                    <p style="margin: 0 0 5px 0; font-weight:bold; color: #28a745;">Chọn vị trí đặt thư mục mới:</p>
                    <select id="swal-parent-select-ds" style="width: 100%; padding: 10px; margin-bottom: 15px; font-weight: bold;">
                        ${dsThuMucHtml}
                    </select>
                    <p style="margin: 0 0 5px 0; font-weight:bold;">Tên thư mục mới (*):</p>
                    <input id="swal-new-folder-name-ds" class="swal2-input" placeholder="VD: Danh_Sach_12A1" style="width: 100%; margin: 0; box-sizing: border-box;">
                </div>
            </div>
        `,
        showCancelButton: true, confirmButtonColor: '#fbbc05', confirmButtonText: '🚀 Lưu lên Drive',
        didOpen: () => {
            document.getElementById('radio-co-san-ds').onchange = () => {
                document.getElementById('khu-vuc-co-san-ds').style.display = 'block';
                document.getElementById('khu-vuc-tao-moi-ds').style.display = 'none';
            };
            document.getElementById('radio-tao-moi-ds').onchange = () => {
                document.getElementById('khu-vuc-co-san-ds').style.display = 'none';
                document.getElementById('khu-vuc-tao-moi-ds').style.display = 'block';
            };
        },
        preConfirm: () => {
            const isTaoMoi = document.getElementById('radio-tao-moi-ds').checked;
            if (isTaoMoi) {
                const tenMoi = document.getElementById('swal-new-folder-name-ds').value.trim();
                const parentId = document.getElementById('swal-parent-select-ds').value;
                if (!parentId || !tenMoi) { Swal.showValidationMessage('Vui lòng nhập đủ thông tin!'); return false; }
                return { mode: 'tao_moi', folderName: tenMoi, parentId: parentId };
            } else {
                const selectedId = document.getElementById('swal-select-folder-ds').value;
                if (!selectedId) { Swal.showValidationMessage('Vui lòng chọn thư mục!'); return false; }
                return { mode: 'co_san', id: selectedId };
            }
        }
    });

    if (!thongTinDich) return;

    const btn = document.getElementById('btn-up-drive-ds');
    btn.disabled = true;
    btn.innerHTML = '⏳ Đang đồng bộ...';

    const fileToBase64 = (file) => new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(',')[1]);
    });

    try {
        let folderIdUpload = "";
        Swal.fire({ title: 'Đang xử lý...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

        if (thongTinDich.mode === 'tao_moi') {
            Swal.update({ title: 'Đang tạo thư mục...' });
            const reqTaoFolder = await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
                method: "POST", body: JSON.stringify({ action: "tao_thu_muc_moi", folderName: thongTinDich.folderName, parentId: thongTinDich.parentId })
            });
            const resTaoFolder = await reqTaoFolder.json();
            if (resTaoFolder.status === "success") folderIdUpload = resTaoFolder.folderId;
            else throw new Error(resTaoFolder.message);
        } else {
            folderIdUpload = thongTinDich.id;
        }

        Swal.update({ title: 'Đang đẩy file lên...' });
        const base64Data = await fileToBase64(window.FileDanhSachTam);
        const reqUp = await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
            method: "POST",
            body: JSON.stringify({
                action: "upload_file_danh_sach", name: window.FileDanhSachTam.name,
                mimeType: window.FileDanhSachTam.type, base64: base64Data, folderId: folderIdUpload
            })
        });

        const kq = await reqUp.json();
        if (kq.status === "success") {
            Swal.fire('Thành công', 'Đã sao lưu danh sách lên Drive!', 'success');
            btn.style.display = 'none';
        } else throw new Error(kq.message);

    } catch (error) {
        Swal.fire('Lỗi', error.message, 'error');
        btn.disabled = false;
        btn.innerHTML = '⬆️ Thử sao lưu lại';
    }
};

// window.ham_18_c1_xu_ly_so_do_local = async function (event) {

//     const file = event.target.files[0];
//     if (!file) return;

//     window.FileSoDoTam = file;
//     document.getElementById('ten-file-so-do-hien-tai').innerText = `🗺️ ${file.name}`;

//     const btnUp = document.getElementById('btn-up-drive-so-do');
//     btnUp.style.display = 'block';
//     btnUp.disabled = false;
//     btnUp.innerHTML = '⬆️ Sao lưu Sơ đồ lên Drive';

//     try {
//         window.DuLieuSoDoTam = [];
//         const arrayBuffer = await file.arrayBuffer();

//         if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
//             const workbook = XLSX.read(arrayBuffer, { type: 'array' });
//             const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
//             const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
//             window.DuLieuSoDoTam = jsonData;
//         }
//         else if (file.name.endsWith('.docx')) {
//             const result = await mammoth.extractRawText({ arrayBuffer: arrayBuffer });
//             const lines = result.value.split('\n').filter(line => line.trim().length > 0);
//             window.DuLieuSoDoTam = lines;
//         }

//         // 🌟 BẮT BUỘC PHẢI GỌI HÀM NÀY ĐỂ NÓ VẼ LÊN TRANG
//         if (typeof window.ham_18_render_preview_so_do === 'function') {
//             window.ham_18_render_preview_so_do();
//         }

//         Swal.fire({
//             icon: 'success',
//             title: 'Nạp sơ đồ thành công',
//             text: `Đã đọc cấu trúc từ file: ${file.name}`,
//             timer: 1500,
//             showConfirmButton: false
//         });

//     } catch (error) {
//         Swal.fire('Lỗi đọc file sơ đồ', error.message, 'error');
//     }

//     event.target.value = '';
// };

// // =======================================================
// // HÀM 18.C2: CHỌN FILE SƠ ĐỒ TỪ GOOGLE DRIVE
// // =======================================================
// window.ham_18_c2_mo_google_picker_so_do = async function () {
//     // 1. TẢI CÂY THƯ MỤC
//     Swal.fire({ title: 'Đang kết nối kho dữ liệu...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

//     let dsThuMucHtml = '<option value="">-- Chọn thư mục --</option>';
//     try {
//         const reqTree = await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
//             method: "POST", body: JSON.stringify({ action: "lay_cay_thu_muc_anh" })
//         });
//         const resTree = await reqTree.json();

//         if (resTree.status === "success" && resTree.data.length > 0) {
//             resTree.data.forEach(folder => {
//                 let level = (folder.name.match(/--- /g) || []).length;
//                 let cleanName = folder.name.replace(/--- /g, '').replace('⭐ [THƯ MỤC GỐC] ', '');
//                 let indent = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'.repeat(level);
//                 let icon = level === 0 ? '⭐ [GỐC] ' : ' ↳ 📁 ';
//                 dsThuMucHtml += `<option value="${folder.id}">${indent}${icon}${cleanName}</option>`;
//             });
//         }
//     } catch (error) {
//         dsThuMucHtml = `<option value="">❌ Không thể tải cây thư mục</option>`;
//     }

//     // 2. POPUP CHỌN FILE (2 TAB: DÁN LINK HOẶC DUYỆT THƯ MỤC)
//     const { value: fileIdChon } = await Swal.fire({
//         title: '🗺️ Chọn file Sơ đồ từ Drive',
//         width: 650,
//         html: `
//             <div style="text-align: left; font-size: 14px; color: #495057;">
//                 <div style="margin-bottom: 15px; display: flex; gap: 20px; justify-content: center; background: #e9ecef; padding: 10px; border-radius: 6px;">
//                     <label style="cursor:pointer; font-weight:bold; color: #6f42c1;">
//                         <input type="radio" name="r_chon_sd" id="radio-link-sd" checked> 🔗 Dán link File trực tiếp
//                     </label>
//                     <label style="cursor:pointer; font-weight:bold; color:#0056b3;">
//                         <input type="radio" name="r_chon_sd" id="radio-tree-sd"> 📂 Tìm trong thư mục
//                     </label>
//                 </div>

//                 <!-- TAB 1: DÁN LINK -->
//                 <div id="khu-vuc-link-sd" style="background: #f3e8ff; padding: 15px; border-radius: 6px; border: 1px solid #e9d5ff;">
//                     <p style="margin: 0 0 5px 0; font-weight: bold; color: #5b21b6;">Dán link hoặc ID file sơ đồ (Excel/Word):</p>
//                     <input id="swal-sodo-link" class="swal2-input" placeholder="Dán link Google Drive vào đây..." style="width: 100%; box-sizing: border-box; margin: 0; font-size: 14px;">
//                 </div>

//                 <!-- TAB 2: DUYỆT THƯ MỤC -->
//                 <div id="khu-vuc-tree-sd" style="display: none; background: #f4f6f9; padding: 15px; border-radius: 6px; border: 1px solid #ced4da;">
//                     <p style="margin: 0 0 5px 0; font-weight: bold; color: #0056b3;">Bước 1: Chọn thư mục lớp</p>
//                     <select id="swal-folder-select-sd" style="width: 100%; padding: 10px; border-radius: 4px; border: 1px solid #adb5bd; outline: none; margin-bottom: 15px;">
//                         ${dsThuMucHtml}
//                     </select>
                    
//                     <p style="margin: 0 0 5px 0; font-weight: bold; color: #6f42c1;">Bước 2: Bấm chọn file Sơ đồ</p>
//                     <select id="swal-file-select-sd" disabled style="width: 100%; padding: 10px; border-radius: 4px; border: 2px solid #6f42c1; outline: none; font-weight: bold; background: #e9ecef;">
//                         <option value="">-- Vui lòng chọn thư mục ở trên trước --</option>
//                     </select>
//                 </div>
//             </div>
//         `,
//         showCancelButton: true,
//         confirmButtonColor: '#6f42c1',
//         cancelButtonColor: '#6c757d',
//         confirmButtonText: '📥 Nạp sơ đồ',
//         didOpen: () => {
//             // Lắng nghe chuyển Tab
//             document.getElementById('radio-link-sd').onchange = () => {
//                 document.getElementById('khu-vuc-link-sd').style.display = 'block';
//                 document.getElementById('khu-vuc-tree-sd').style.display = 'none';
//             };
//             document.getElementById('radio-tree-sd').onchange = () => {
//                 document.getElementById('khu-vuc-link-sd').style.display = 'none';
//                 document.getElementById('khu-vuc-tree-sd').style.display = 'block';
//             };

//             // Tự động load danh sách file khi chọn thư mục
//             document.getElementById('swal-folder-select-sd').onchange = async function () {
//                 const folderId = this.value;
//                 const fileSelect = document.getElementById('swal-file-select-sd');

//                 if (!folderId) {
//                     fileSelect.innerHTML = '<option value="">-- Vui lòng chọn thư mục --</option>';
//                     fileSelect.disabled = true;
//                     fileSelect.style.background = '#e9ecef';
//                     return;
//                 }

//                 fileSelect.disabled = true;
//                 fileSelect.innerHTML = '<option value="">⏳ Đang tìm file văn bản...</option>';
//                 fileSelect.style.background = '#e9ecef';

//                 try {
//                     const reqFiles = await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
//                         method: "POST", body: JSON.stringify({ action: "lay_danh_sach_file_van_ban", folderId: folderId })
//                     });
//                     const resFiles = await reqFiles.json();

//                     if (resFiles.status === "success" && resFiles.data.length > 0) {
//                         let fHtml = '<option value="">-- Bấm để chọn file sơ đồ --</option>';
//                         resFiles.data.forEach(f => {
//                             fHtml += `<option value="${f.id}">📄 ${f.name}</option>`;
//                         });
//                         fileSelect.innerHTML = fHtml;
//                         fileSelect.disabled = false;
//                         fileSelect.style.background = '#fff';
//                     } else {
//                         fileSelect.innerHTML = '<option value="">❌ Không tìm thấy file Excel/Word nào trong thư mục này</option>';
//                     }
//                 } catch (e) {
//                     fileSelect.innerHTML = '<option value="">❌ Lỗi kết nối mạng</option>';
//                 }
//             };
//         },
//         preConfirm: () => {
//             const isTabLink = document.getElementById('radio-link-sd').checked;
//             if (isTabLink) {
//                 const url = document.getElementById('swal-sodo-link').value.trim();
//                 if (!url) { Swal.showValidationMessage('Vui lòng dán link file!'); return false; }
//                 let fileId = url;
//                 const matchDoc = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
//                 if (matchDoc) fileId = matchDoc[1];
//                 else if (url.includes('id=')) {
//                     const matchId = url.match(/id=([a-zA-Z0-9_-]+)/);
//                     if (matchId) fileId = matchId[1];
//                 }
//                 return fileId;
//             } else {
//                 const fileId = document.getElementById('swal-file-select-sd').value;
//                 if (!fileId) { Swal.showValidationMessage('Thầy chưa bấm chọn file sơ đồ!'); return false; }
//                 return fileId;
//             }
//         }
//     });

//     if (!fileIdChon) return;

//     // 3. KÉO RUỘT FILE TỪ DRIVE VỀ VÀ BÓC TÁCH CẤU TRÚC SƠ ĐỒ
//     Swal.fire({ title: 'Đang đọc dữ liệu cấu trúc sơ đồ...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

//     try {
//         const reqContent = await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
//             method: "POST", body: JSON.stringify({ action: "doc_file_van_ban_drive", fileId: fileIdChon })
//         });
//         const resContent = await reqContent.json();

//         if (resContent.status !== "success") throw new Error(resContent.message);

//         const selectedFileName = resContent.name;

//         // Giải mã Base64 sang ArrayBuffer để SheetJS hoặc Mammoth đọc
//         const binaryString = window.atob(resContent.base64Data);
//         const bytes = new Uint8Array(binaryString.length);
//         for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
//         const arrayBuffer = bytes.buffer;

//         window.DuLieuSoDoTam = [];

//         if (selectedFileName.endsWith('.xlsx') || selectedFileName.endsWith('.xls')) {
//             const workbook = XLSX.read(arrayBuffer, { type: 'array' });
//             const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
//             const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
//             window.DuLieuSoDoTam = jsonData; // Lưu ma trận bàn học / vị trí ngồi
//         } else if (selectedFileName.endsWith('.docx')) {
//             const result = await mammoth.extractRawText({ arrayBuffer: arrayBuffer });
//             const lines = result.value.split('\n').filter(line => line.trim().length > 0);
//             window.DuLieuSoDoTam = lines; // Lưu các dòng mô tả vị trí ngồi
//         }

//         // Cập nhật giao diện bên ngoài
//         document.getElementById('ten-file-so-do-hien-tai').innerText = `🗺️ ${selectedFileName}`;
//         document.getElementById('btn-up-drive-so-do').style.display = 'none'; // Đã ở Drive nên ẩn nút lưu


//         // 🌟 THÊM VÀO ĐÂY (Ngay trước đoạn báo thành công)
//         if (typeof window.ham_18_render_preview_so_do === 'function') {
//             window.ham_18_render_preview_so_do();
//         }



//         Swal.fire({
//             icon: 'success',
//             title: 'Nạp sơ đồ thành công',
//             text: `Đã đọc cấu trúc từ file: ${selectedFileName} (Sẵn sàng xếp chỗ)`,
//             timer: 2000,
//             showConfirmButton: false
//         });

//     } catch (error) {
//         Swal.fire('Lỗi truy cập File', 'Không thể bóc tách dữ liệu sơ đồ. Hãy chắc chắn link file là Excel hoặc Word và đã bật quyền chia sẻ công khai.\n\nChi tiết: ' + error.message, 'error');
//     }
// };


// =======================================================
// HÀM 18.C1: XỬ LÝ FILE SƠ ĐỒ CHỌN TỪ MÁY TÍNH (FIX LỖI BẢNG WORD)
// =======================================================
window.ham_18_c1_xu_ly_so_do_local = async function (event) {
    const file = event.target.files[0];
    if (!file) return;

    window.FileSoDoTam = file;
    document.getElementById('ten-file-so-do-hien-tai').innerText = `🗺️ ${file.name}`;

    const btnUp = document.getElementById('btn-up-drive-so-do');
    btnUp.style.display = 'block';
    btnUp.disabled = false;
    btnUp.innerHTML = '⬆️ Sao lưu Sơ đồ lên Drive';

    try {
        window.DuLieuSoDoTam = [];
        const arrayBuffer = await file.arrayBuffer();

        // 1. File Excel
        if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
            const workbook = XLSX.read(arrayBuffer, { type: 'array' });
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
            window.DuLieuSoDoTam = jsonData;
        }
        // 2. File Word (Xử lý đọc BẢNG chuẩn xác)
        else if (file.name.endsWith('.docx')) {
            // Chuyển đổi Word sang HTML để giữ nguyên cấu trúc Bảng
            const result = await mammoth.convertToHtml({ arrayBuffer: arrayBuffer });

            // Dùng một thẻ div ảo để bóc tách cấu trúc
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = result.value;

            const table = tempDiv.querySelector('table');
            let matrix = [];

            if (table) {
                // Nếu Word có vẽ Bảng (Table) -> Đọc chuẩn số cột, số dòng
                const rows = table.querySelectorAll('tr');
                rows.forEach(tr => {
                    const rowData = [];
                    const cells = tr.querySelectorAll('td, th');
                    cells.forEach(cell => {
                        rowData.push(cell.innerText.trim());
                    });
                    matrix.push(rowData);
                });
            } else {
                // Nếu Word không có Bảng, chỉ có chữ -> Tách theo dòng và Tab
                const rawLines = tempDiv.innerText.split('\n').filter(line => line.trim().length > 0);
                matrix = rawLines.map(line => line.split(/\t|\s{4,}/).map(p => p.trim()));
            }

            window.DuLieuSoDoTam = matrix;
        }
        else if (file.type.startsWith('image/')) {
            Swal.fire('Đã nhận ảnh sơ đồ', 'Đã lưu file ảnh cấu trúc sơ đồ.', 'success');
        }

        // Gọi hàm render
        if (typeof window.ham_18_render_preview_so_do === 'function') {
            window.ham_18_render_preview_so_do();
        }

        Swal.fire({
            icon: 'success',
            title: 'Nạp sơ đồ thành công',
            text: `Đã đọc cấu trúc từ file: ${file.name}`,
            timer: 1500,
            showConfirmButton: false
        });

    } catch (error) {
        Swal.fire('Lỗi đọc file sơ đồ', error.message, 'error');
    }

    event.target.value = '';
};


// =======================================================
// HÀM 18.C2: CHỌN FILE SƠ ĐỒ TỪ GOOGLE DRIVE (FIX LỖI BẢNG WORD)
// =======================================================
window.ham_18_c2_mo_google_picker_so_do = async function () {
    Swal.fire({ title: 'Đang kết nối kho dữ liệu...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

    let dsThuMucHtml = '<option value="">-- Chọn thư mục --</option>';
    try {
        const reqTree = await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
            method: "POST", body: JSON.stringify({ action: "lay_cay_thu_muc_anh" })
        });
        const resTree = await reqTree.json();

        if (resTree.status === "success" && resTree.data.length > 0) {
            resTree.data.forEach(folder => {
                let level = (folder.name.match(/--- /g) || []).length;
                let cleanName = folder.name.replace(/--- /g, '').replace('⭐ [THƯ MỤC GỐC] ', '');
                let indent = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'.repeat(level);
                let icon = level === 0 ? '⭐ [GỐC] ' : ' ↳ 📁 ';
                dsThuMucHtml += `<option value="${folder.id}">${indent}${icon}${cleanName}</option>`;
            });
        }
    } catch (error) {
        dsThuMucHtml = `<option value="">❌ Không thể tải cây thư mục</option>`;
    }

    const { value: fileIdChon } = await Swal.fire({
        title: '🗺️ Chọn file Sơ đồ từ Drive',
        width: 650,
        html: `
            <div style="text-align: left; font-size: 14px; color: #495057;">
                <div style="margin-bottom: 15px; display: flex; gap: 20px; justify-content: center; background: #e9ecef; padding: 10px; border-radius: 6px;">
                    <label style="cursor:pointer; font-weight:bold; color: #6f42c1;">
                        <input type="radio" name="r_chon_sd" id="radio-link-sd" checked> 🔗 Dán link File trực tiếp
                    </label>
                    <label style="cursor:pointer; font-weight:bold; color:#0056b3;">
                        <input type="radio" name="r_chon_sd" id="radio-tree-sd"> 📂 Tìm trong thư mục
                    </label>
                </div>

                <div id="khu-vuc-link-sd" style="background: #f3e8ff; padding: 15px; border-radius: 6px; border: 1px solid #e9d5ff;">
                    <p style="margin: 0 0 5px 0; font-weight: bold; color: #5b21b6;">Dán link hoặc ID file sơ đồ (Excel/Word):</p>
                    <input id="swal-sodo-link" class="swal2-input" placeholder="Dán link Google Drive vào đây..." style="width: 100%; box-sizing: border-box; margin: 0; font-size: 14px;">
                </div>

                <div id="khu-vuc-tree-sd" style="display: none; background: #f4f6f9; padding: 15px; border-radius: 6px; border: 1px solid #ced4da;">
                    <p style="margin: 0 0 5px 0; font-weight: bold; color: #0056b3;">Bước 1: Chọn thư mục lớp</p>
                    <select id="swal-folder-select-sd" style="width: 100%; padding: 10px; border-radius: 4px; border: 1px solid #adb5bd; outline: none; margin-bottom: 15px;">
                        ${dsThuMucHtml}
                    </select>
                    
                    <p style="margin: 0 0 5px 0; font-weight: bold; color: #6f42c1;">Bước 2: Bấm chọn file Sơ đồ</p>
                    <select id="swal-file-select-sd" disabled style="width: 100%; padding: 10px; border-radius: 4px; border: 2px solid #6f42c1; outline: none; font-weight: bold; background: #e9ecef;">
                        <option value="">-- Vui lòng chọn thư mục ở trên trước --</option>
                    </select>
                </div>
            </div>
        `,
        showCancelButton: true,
        confirmButtonColor: '#6f42c1',
        cancelButtonColor: '#6c757d',
        confirmButtonText: '📥 Nạp sơ đồ',
        didOpen: () => {
            document.getElementById('radio-link-sd').onchange = () => {
                document.getElementById('khu-vuc-link-sd').style.display = 'block';
                document.getElementById('khu-vuc-tree-sd').style.display = 'none';
            };
            document.getElementById('radio-tree-sd').onchange = () => {
                document.getElementById('khu-vuc-link-sd').style.display = 'none';
                document.getElementById('khu-vuc-tree-sd').style.display = 'block';
            };

            document.getElementById('swal-folder-select-sd').onchange = async function () {
                const folderId = this.value;
                const fileSelect = document.getElementById('swal-file-select-sd');

                if (!folderId) {
                    fileSelect.innerHTML = '<option value="">-- Vui lòng chọn thư mục --</option>';
                    fileSelect.disabled = true;
                    fileSelect.style.background = '#e9ecef';
                    return;
                }

                fileSelect.disabled = true;
                fileSelect.innerHTML = '<option value="">⏳ Đang tìm file văn bản...</option>';
                fileSelect.style.background = '#e9ecef';

                try {
                    const reqFiles = await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
                        method: "POST", body: JSON.stringify({ action: "lay_danh_sach_file_van_ban", folderId: folderId })
                    });
                    const resFiles = await reqFiles.json();

                    if (resFiles.status === "success" && resFiles.data.length > 0) {
                        let fHtml = '<option value="">-- Bấm để chọn file sơ đồ --</option>';
                        resFiles.data.forEach(f => {
                            fHtml += `<option value="${f.id}">📄 ${f.name}</option>`;
                        });
                        fileSelect.innerHTML = fHtml;
                        fileSelect.disabled = false;
                        fileSelect.style.background = '#fff';
                    } else {
                        fileSelect.innerHTML = '<option value="">❌ Không tìm thấy file Excel/Word nào trong thư mục này</option>';
                    }
                } catch (e) {
                    fileSelect.innerHTML = '<option value="">❌ Lỗi kết nối mạng</option>';
                }
            };
        },
        preConfirm: () => {
            const isTabLink = document.getElementById('radio-link-sd').checked;
            if (isTabLink) {
                const url = document.getElementById('swal-sodo-link').value.trim();
                if (!url) { Swal.showValidationMessage('Vui lòng dán link file!'); return false; }
                let fileId = url;
                const matchDoc = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
                if (matchDoc) fileId = matchDoc[1];
                else if (url.includes('id=')) {
                    const matchId = url.match(/id=([a-zA-Z0-9_-]+)/);
                    if (matchId) fileId = matchId[1];
                }
                return fileId;
            } else {
                const fileId = document.getElementById('swal-file-select-sd').value;
                if (!fileId) { Swal.showValidationMessage('Thầy chưa bấm chọn file sơ đồ!'); return false; }
                return fileId;
            }
        }
    });

    if (!fileIdChon) return;

    Swal.fire({ title: 'Đang đọc dữ liệu cấu trúc sơ đồ...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

    try {
        const reqContent = await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
            method: "POST", body: JSON.stringify({ action: "doc_file_van_ban_drive", fileId: fileIdChon })
        });
        const resContent = await reqContent.json();

        if (resContent.status !== "success") throw new Error(resContent.message);

        const selectedFileName = resContent.name;

        const binaryString = window.atob(resContent.base64Data);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
        const arrayBuffer = bytes.buffer;

        window.DuLieuSoDoTam = [];

        if (selectedFileName.endsWith('.xlsx') || selectedFileName.endsWith('.xls')) {
            const workbook = XLSX.read(arrayBuffer, { type: 'array' });
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
            window.DuLieuSoDoTam = jsonData;
        }
        else if (selectedFileName.endsWith('.docx')) {
            // Chuyển Word sang HTML để bắt nguyên thẻ Bảng
            const result = await mammoth.convertToHtml({ arrayBuffer: arrayBuffer });

            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = result.value;

            const table = tempDiv.querySelector('table');
            let matrix = [];

            if (table) {
                const rows = table.querySelectorAll('tr');
                rows.forEach(tr => {
                    const rowData = [];
                    const cells = tr.querySelectorAll('td, th');
                    cells.forEach(cell => {
                        rowData.push(cell.innerText.trim());
                    });
                    matrix.push(rowData);
                });
            } else {
                const rawLines = tempDiv.innerText.split('\n').filter(line => line.trim().length > 0);
                matrix = rawLines.map(line => line.split(/\t|\s{4,}/).map(p => p.trim()));
            }
            window.DuLieuSoDoTam = matrix;
        }

        document.getElementById('ten-file-so-do-hien-tai').innerText = `🗺️ ${selectedFileName}`;
        document.getElementById('btn-up-drive-so-do').style.display = 'none';

        if (typeof window.ham_18_render_preview_so_do === 'function') {
            window.ham_18_render_preview_so_do();
        }

        Swal.fire({
            icon: 'success',
            title: 'Nạp sơ đồ thành công',
            text: `Đã đọc cấu trúc từ file: ${selectedFileName}`,
            timer: 1500,
            showConfirmButton: false
        });

    } catch (error) {
        Swal.fire('Lỗi truy cập File', 'Không thể bóc tách dữ liệu sơ đồ. Hãy chắc chắn link file là Excel hoặc Word và đã bật quyền chia sẻ công khai.\n\nChi tiết: ' + error.message, 'error');
    }
};


// =======================================================
// HÀM 18.C3: ĐẨY FILE SƠ ĐỒ LÊN GOOGLE DRIVE (CHỌN THƯ MỤC)
// =======================================================
window.ham_18_c3_up_file_so_do_len_drive = async function () {
    if (!window.FileSoDoTam) return;

    Swal.fire({ title: 'Đang tải cây thư mục...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

    let dsThuMucHtml = '<option value="">-- Chọn vị trí lưu --</option>';
    try {
        const reqTree = await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
            method: "POST", body: JSON.stringify({ action: "lay_cay_thu_muc_anh" })
        });
        const resTree = await reqTree.json();
        if (resTree.status === "success" && resTree.data.length > 0) {
            resTree.data.forEach(folder => {
                let level = (folder.name.match(/--- /g) || []).length;
                let cleanName = folder.name.replace(/--- /g, '').replace('⭐ [THƯ MỤC GỐC] ', '');
                let indent = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'.repeat(level);
                let icon = level === 0 ? '⭐ [GỐC] ' : ' ↳ 📁 ';
                dsThuMucHtml += `<option value="${folder.id}">${indent}${icon}${cleanName}</option>`;
            });
        }
    } catch (error) {
        dsThuMucHtml = `<option value="">❌ Lỗi tải danh sách</option>`;
    }

    const { value: thongTinDich } = await Swal.fire({
        title: '📁 Nơi lưu file Sơ Đồ',
        width: 600,
        html: `
            <div style="text-align: left; font-size: 14px;">
                <div style="margin-bottom: 15px; display: flex; gap: 20px; justify-content: center; background: #e9ecef; padding: 10px; border-radius: 6px;">
                    <label style="cursor:pointer; font-weight:bold; color: #0056b3;">
                        <input type="radio" name="r_luu_sd" id="radio-co-san-sd" checked> 📂 Thư mục có sẵn
                    </label>
                    <label style="cursor:pointer; font-weight:bold; color:#6f42c1;">
                        <input type="radio" name="r_luu_sd" id="radio-tao-moi-sd"> ➕ Tạo thư mục mới
                    </label>
                </div>

                <div id="khu-vuc-co-san-sd" style="background: #f4f6f9; padding: 15px; border-radius: 6px; border: 1px solid #ced4da;">
                    <p style="margin: 0 0 5px 0; font-weight: bold; color: #0056b3;">Chọn thư mục lưu file:</p>
                    <select id="swal-select-folder-sd" style="width: 100%; padding: 10px; border-radius: 4px; border: 2px solid #17a2b8; outline: none; margin-bottom: 15px; font-weight: bold;">
                        ${dsThuMucHtml}
                    </select>
                </div>

                <div id="khu-vuc-tao-moi-sd" style="display: none; background: #fdf4ff; padding: 15px; border-radius: 6px; border: 1px dashed #6f42c1;">
                    <p style="margin: 0 0 5px 0; font-weight:bold; color: #6f42c1;">Chọn vị trí đặt thư mục mới:</p>
                    <select id="swal-parent-select-sd" style="width: 100%; padding: 10px; margin-bottom: 15px; font-weight: bold;">
                        ${dsThuMucHtml}
                    </select>
                    <p style="margin: 0 0 5px 0; font-weight:bold;">Tên thư mục mới (*):</p>
                    <input id="swal-new-folder-name-sd" class="swal2-input" placeholder="VD: So_Do_12A1" style="width: 100%; margin: 0; box-sizing: border-box;">
                </div>
            </div>
        `,
        showCancelButton: true, confirmButtonColor: '#fbbc05', confirmButtonText: '🚀 Lưu lên Drive',
        didOpen: () => {
            document.getElementById('radio-co-san-sd').onchange = () => {
                document.getElementById('khu-vuc-co-san-sd').style.display = 'block';
                document.getElementById('khu-vuc-tao-moi-sd').style.display = 'none';
            };
            document.getElementById('radio-tao-moi-sd').onchange = () => {
                document.getElementById('khu-vuc-co-san-sd').style.display = 'none';
                document.getElementById('khu-vuc-tao-moi-sd').style.display = 'block';
            };
        },
        preConfirm: () => {
            const isTaoMoi = document.getElementById('radio-tao-moi-sd').checked;
            if (isTaoMoi) {
                const tenMoi = document.getElementById('swal-new-folder-name-sd').value.trim();
                const parentId = document.getElementById('swal-parent-select-sd').value;
                if (!parentId || !tenMoi) { Swal.showValidationMessage('Vui lòng nhập đủ thông tin!'); return false; }
                return { mode: 'tao_moi', folderName: tenMoi, parentId: parentId };
            } else {
                const selectedId = document.getElementById('swal-select-folder-sd').value;
                if (!selectedId) { Swal.showValidationMessage('Vui lòng chọn thư mục!'); return false; }
                return { mode: 'co_san', id: selectedId };
            }
        }
    });

    if (!thongTinDich) return;

    const btn = document.getElementById('btn-up-drive-so-do');
    btn.disabled = true;
    btn.innerHTML = '⏳ Đang đồng bộ...';

    const fileToBase64 = (file) => new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(',')[1]);
    });

    try {
        let folderIdUpload = "";
        Swal.fire({ title: 'Đang xử lý...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

        if (thongTinDich.mode === 'tao_moi') {
            Swal.update({ title: 'Đang tạo thư mục...' });
            const reqTaoFolder = await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
                method: "POST", body: JSON.stringify({ action: "tao_thu_muc_moi", folderName: thongTinDich.folderName, parentId: thongTinDich.parentId })
            });
            const resTaoFolder = await reqTaoFolder.json();
            if (resTaoFolder.status === "success") folderIdUpload = resTaoFolder.folderId;
            else throw new Error(resTaoFolder.message);
        } else {
            folderIdUpload = thongTinDich.id;
        }

        Swal.update({ title: 'Đang đẩy file sơ đồ lên...' });
        const base64Data = await fileToBase64(window.FileSoDoTam);

        // Tận dụng luôn action upload danh sách hoặc upload ảnh có sẵn trong Apps Script để đẩy file
        const reqUp = await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
            method: "POST",
            body: JSON.stringify({
                action: "upload_file_danh_sach", name: window.FileSoDoTam.name,
                mimeType: window.FileSoDoTam.type, base64: base64Data, folderId: folderIdUpload
            })
        });

        const kq = await reqUp.json();
        if (kq.status === "success") {
            Swal.fire('Thành công', 'Đã sao lưu file Sơ đồ lên Google Drive!', 'success');
            btn.style.display = 'none';
        } else throw new Error(kq.message);

    } catch (error) {
        Swal.fire('Lỗi', error.message, 'error');
        btn.disabled = false;
        btn.innerHTML = '⬆️ Thử sao lưu lại';
    }
};
// // =======================================================
// // HÀM 18: RÁP DỮ LIỆU VÀ XUẤT FILE WORD (CĂN LỀ TOP/BOTTOM/HEADER/FOOTER 1CM)
// // =======================================================
// window.ham_18_xuat_so_do_word = async function () {
//     const matrix = window.DuLieuSoDoTam || [];
//     const arrTen = window.DanhSachHocSinhTam || [];
//     const arrAnh = window.DanhSachAnhSoDoTam || [];

//     if (matrix.length === 0) return Swal.fire('Thiếu dữ liệu', 'Thầy chưa nạp file Sơ đồ chỗ ngồi!', 'warning');
//     if (arrTen.length === 0) return Swal.fire('Thiếu dữ liệu', 'Thầy chưa nạp Danh sách học sinh!', 'warning');

//     const { value: config } = await Swal.fire({
//         title: '⚙️ Tùy chỉnh xuất Sơ đồ Word',
//         width: 500,
//         html: `
//             <div style="text-align: left; font-size: 14px;">
//                 <label style="font-weight: bold; color: #0056b3;">1. Tiêu đề sơ đồ (Tên lớp):</label>
//                 <input id="swal-ten-lop" class="swal2-input" placeholder="VD: LỚP 12A1" value="SƠ ĐỒ LỚP HỌC" style="margin-top: 5px; margin-bottom: 15px; width: 100%; box-sizing: border-box;">
                
//                 <label style="font-weight: bold; color: #d35400;">2. Chiều cao ảnh học sinh (cm):</label>
//                 <input id="swal-img-h" type="number" step="0.1" class="swal2-input" value="3" style="margin-top: 5px; width: 100%; box-sizing: border-box;">
//                 <p style="font-size: 12px; color: #666; font-style: italic; margin-top: 5px;">* Chiều rộng sẽ được hệ thống tự động nội suy để giữ đúng tỷ lệ khuôn mặt gốc.</p>
//             </div>
//         `,
//         showCancelButton: true,
//         confirmButtonColor: '#28a745',
//         confirmButtonText: '🚀 Xuất File Word',
//         cancelButtonText: 'Hủy',
//         preConfirm: () => {
//             return {
//                 tenLop: document.getElementById('swal-ten-lop').value.trim() || 'SƠ ĐỒ LỚP HỌC',
//                 h: parseFloat(document.getElementById('swal-img-h').value) || 3
//             }
//         }
//     });

//     if (!config) return;

//     Swal.fire({
//         title: 'Đang tạo file Word...',
//         html: 'Đang thiết lập lề giấy và header/footer 1cm...',
//         allowOutsideClick: false,
//         didOpen: () => Swal.showLoading()
//     });

//     const getImgData = (anh) => new Promise((resolve) => {
//         const defaultSrc = 'https://placehold.co/90x120/e9ecef/a3a3a3?text=Trong';
//         if (!anh) return resolve({ src: defaultSrc, ratio: 0.75 });

//         const img = new Image();
//         img.onload = () => resolve({ src: img.src, ratio: img.width / img.height });
//         img.onerror = () => resolve({ src: anh.url || defaultSrc, ratio: 0.75 });

//         if (anh.source === 'local' && anh.fileObj) {
//             const reader = new FileReader();
//             reader.onload = (e) => img.src = e.target.result;
//             reader.readAsDataURL(anh.fileObj);
//         } else {
//             img.src = anh.url;
//         }
//     });

//     const maxLen = Math.max(arrTen.length, arrAnh.length);
//     const maxCols = Math.max(...matrix.map(row => Array.isArray(row) ? row.length : 1), 1);
//     const maxRows = matrix.length;

//     // ---------------------------------------------------------
//     // BƯỚC 2: QUY ĐỔI KÍCH THƯỚC VÀ XÁC ĐỊNH LỐI ĐI
//     // ---------------------------------------------------------
//     const cmToPt = 28.35; // 1 cm = 28.35 pt
//     const paddingPt = 1.4;
//     const aisleSizePt = 28.35;

//     // Kích thước lề 1cm
//     const margin1cmPt = 28.35;
//     const marginLR = 36.0; // Giữ nguyên lề trái/phải khoảng 0.5 inch (36pt) để dàn ngang thoải mái

//     const imgHeightPt = config.h * cmToPt;
//     const imgHeightPx = Math.round(imgHeightPt * 1.3333);

//     const rowHeightStudentPt = imgHeightPt + 28;

//     const colIsAisle = new Array(maxCols).fill(true);
//     const rowIsAisle = new Array(maxRows).fill(true);

//     for (let r = 0; r < maxRows; r++) {
//         for (let c = 0; c < maxCols; c++) {
//             let cellVal = (Array.isArray(matrix[r]) && matrix[r][c] !== undefined && matrix[r][c] !== null) ? String(matrix[r][c]).trim() : '';
//             if (/^\d+$/.test(cellVal)) {
//                 colIsAisle[c] = false;
//                 rowIsAisle[r] = false;
//             }
//         }
//     }

//     let totalRowHeightPt = 0;
//     for (let r = 0; r < maxRows; r++) {
//         totalRowHeightPt += rowIsAisle[r] ? aisleSizePt : rowHeightStudentPt;
//     }

//     // 🌟 Tính lại tổng chiều cao giấy = Các hàng + (Lề trên 1cm + Lề dưới 1cm) + Tiêu đề + Footer bản quyền
//     const dynamicPageHeightPt = totalRowHeightPt + (margin1cmPt * 2) + 40 + 40;

//     const pageWidthPt = 842.0;
//     const usableWidthPt = pageWidthPt - (marginLR * 2);

//     const numAislesCols = colIsAisle.filter(v => v).length;
//     const numStudentCols = maxCols - numAislesCols;
//     const remainingWidth = usableWidthPt - (numAislesCols * aisleSizePt);
//     const studentColWidthPt = numStudentCols > 0 ? (remainingWidth / numStudentCols) : (usableWidthPt / maxCols);

//     // ---------------------------------------------------------
//     // BƯỚC 3: VẼ BẢNG WORD
//     // ---------------------------------------------------------
//     let htmlTable = `<table style="width: 100%; border-collapse: collapse; text-align: center; table-layout: fixed;">`;

//     for (let r = 0; r < maxRows; r++) {
//         const currentRowHeightPt = rowIsAisle[r] ? aisleSizePt : rowHeightStudentPt;
//         htmlTable += `<tr style="height: ${currentRowHeightPt}pt; mso-height-rule: exactly;">`;

//         const row = matrix[r];

//         for (let c = 0; c < maxCols; c++) {
//             let cellVal = (Array.isArray(row) && row[c] !== undefined && row[c] !== null) ? String(row[c]).trim() : '';
//             const isSTT = /^\d+$/.test(cellVal);
//             let stt = parseInt(cellVal, 10);

//             const currentWidthPt = colIsAisle[c] ? aisleSizePt : studentColWidthPt;
//             const borderStyle = (isSTT || cellVal.length > 0) ? '1px solid black' : 'none';

//             if (isSTT && stt > 0 && stt <= maxLen) {
//                 let idx = stt - 1;
//                 let tenHS = arrTen[idx] || 'Chưa có tên';

//                 let anhData = await getImgData(arrAnh[idx]);
//                 let imgWidthPt = imgHeightPt * anhData.ratio;
//                 let imgWidthPx = Math.round(imgWidthPt * 1.3333);

//                 htmlTable += `
//                     <td style="width: ${currentWidthPt}pt; height: ${currentRowHeightPt}pt; padding: ${paddingPt}pt; vertical-align: top; border: ${borderStyle}; text-align: center;">
//                         <div style="text-align: center; margin-bottom: 2pt;">
//                             <img src="${anhData.src}" width="${imgWidthPx}" height="${imgHeightPx}" style="width: ${imgWidthPt}pt; height: ${imgHeightPt}pt; display: block; margin: 0 auto;">
//                         </div>
//                         <div style="font-size: 11pt; font-family: 'Times New Roman', serif; line-height: 1.2; word-wrap: break-word; color: #000000;">
//                             <b>${stt}. ${tenHS}</b>
//                         </div>
//                     </td>
//                 `;
//             }
//             else {
//                 htmlTable += `
//                     <td style="width: ${currentWidthPt}pt; height: ${currentRowHeightPt}pt; padding: ${paddingPt}pt; vertical-align: middle; border: ${borderStyle}; font-size: 14pt; font-family: 'Times New Roman', serif; color: #000000; word-wrap: break-word; text-align: center;">
//                         <b>${cellVal}</b>
//                     </td>
//                 `;
//             }
//         }
//         htmlTable += `</tr>`;
//     }
//     htmlTable += `</table>`;

//     // ---------------------------------------------------------
//     // BƯỚC 4: ĐÓNG GÓI XUẤT FILE VỚI CSS MỚI
//     // ---------------------------------------------------------
//     const docHTML = `
//         <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
//         <head>
//             <meta charset='utf-8'>
//             <title>Sơ đồ lớp</title>
//             <style>
//                 @page WordSection1 {
//                     size: ${pageWidthPt}pt ${dynamicPageHeightPt}pt; 
//                     mso-page-orientation: landscape;
//                     /* 🌟 Ép Top và Bottom 1cm (28.35pt) */
//                     margin: 28.35pt ${marginLR}pt 28.35pt ${marginLR}pt; 
//                     /* 🌟 Ép Header và Footer 1cm (28.35pt) */
//                     mso-header-margin: 28.35pt;
//                     mso-footer-margin: 28.35pt;
//                 }
//                 div.WordSection1 { page: WordSection1; }
//                 table { border-collapse: collapse; width: 100%; }
//                 p, div { margin: 0; padding: 0; }
//             </style>
//         </head>
//         <body>
//             <div class='WordSection1'>
//                 <h2 style="text-align: center; font-family: 'Times New Roman', serif; margin: 0 0 10px 0; font-size: 16pt; text-transform: uppercase;">
//                     <b>${config.tenLop}</b>
//                 </h2>
//                 ${htmlTable}
                
//                 <p style="margin: 8pt 0 0 0; padding: 0; font-size: 7pt; text-align: right; font-family: 'Times New Roman', serif; color: #555555; font-style: italic;">
//                     © File sơ đồ được xuất tự động từ trang web của Thầy Huỳnh Đức Chính - THPT Gia Định.
//                 </p>

//                 <p style="margin: 0; padding: 0; font-size: 1pt; line-height: 1pt;">&nbsp;</p>
//             </div>
//         </body>
//         </html>
//     `;

//     const blob = new Blob(['\ufeff', docHTML], { type: 'application/msword' });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = `So_Do_${config.tenLop.replace(/\s+/g, '_')}.doc`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     URL.revokeObjectURL(url);

//     Swal.fire({
//         icon: 'success',
//         title: 'Hoàn tất!',
//         text: `Đã thiết lập lề trang giấy (Top/Bottom) và Header/Footer chuẩn xác 1cm theo yêu cầu của thầy.`,
//         timer: 3000,
//         showConfirmButton: false
//     });
// };

// // =======================================================
// // HÀM 18: RÁP DỮ LIỆU VÀ XUẤT FILE WORD (CĂN LỀ 1CM & THỜI GIAN TẠO)
// // =======================================================
// window.ham_18_xuat_so_do_word = async function () {
//     const matrix = window.DuLieuSoDoTam || [];
//     const arrTen = window.DanhSachHocSinhTam || [];
//     const arrAnh = window.DanhSachAnhSoDoTam || [];

//     if (matrix.length === 0) return Swal.fire('Thiếu dữ liệu', 'Thầy chưa nạp file Sơ đồ chỗ ngồi!', 'warning');
//     if (arrTen.length === 0) return Swal.fire('Thiếu dữ liệu', 'Thầy chưa nạp Danh sách học sinh!', 'warning');

//     const { value: config } = await Swal.fire({
//         title: '⚙️ Tùy chỉnh xuất Sơ đồ Word',
//         width: 500,
//         html: `
//             <div style="text-align: left; font-size: 14px;">
//                 <label style="font-weight: bold; color: #0056b3;">1. Tiêu đề sơ đồ (Tên lớp):</label>
//                 <input id="swal-ten-lop" class="swal2-input" placeholder="VD: LỚP 12A1" value="SƠ ĐỒ LỚP HỌC" style="margin-top: 5px; margin-bottom: 15px; width: 100%; box-sizing: border-box;">
                
//                 <label style="font-weight: bold; color: #d35400;">2. Chiều cao ảnh học sinh (cm):</label>
//                 <input id="swal-img-h" type="number" step="0.1" class="swal2-input" value="3" style="margin-top: 5px; width: 100%; box-sizing: border-box;">
//                 <p style="font-size: 12px; color: #666; font-style: italic; margin-top: 5px;">* Chiều rộng sẽ được hệ thống tự động nội suy để giữ đúng tỷ lệ khuôn mặt gốc.</p>
//             </div>
//         `,
//         showCancelButton: true,
//         confirmButtonColor: '#28a745',
//         confirmButtonText: '🚀 Xuất File Word',
//         cancelButtonText: 'Hủy',
//         preConfirm: () => {
//             return {
//                 tenLop: document.getElementById('swal-ten-lop').value.trim() || 'SƠ ĐỒ LỚP HỌC',
//                 h: parseFloat(document.getElementById('swal-img-h').value) || 3
//             }
//         }
//     });

//     if (!config) return;

//     Swal.fire({
//         title: 'Đang tạo file Word...',
//         html: 'Đang thiết lập lề giấy và header/footer 1cm...',
//         allowOutsideClick: false,
//         didOpen: () => Swal.showLoading()
//     });

//     const getImgData = (anh) => new Promise((resolve) => {
//         const defaultSrc = 'https://placehold.co/90x120/e9ecef/a3a3a3?text=Trong';
//         if (!anh) return resolve({ src: defaultSrc, ratio: 0.75 });

//         const img = new Image();
//         img.onload = () => resolve({ src: img.src, ratio: img.width / img.height });
//         img.onerror = () => resolve({ src: anh.url || defaultSrc, ratio: 0.75 });

//         if (anh.source === 'local' && anh.fileObj) {
//             const reader = new FileReader();
//             reader.onload = (e) => img.src = e.target.result;
//             reader.readAsDataURL(anh.fileObj);
//         } else {
//             img.src = anh.url;
//         }
//     });

//     const maxLen = Math.max(arrTen.length, arrAnh.length);
//     const maxCols = Math.max(...matrix.map(row => Array.isArray(row) ? row.length : 1), 1);
//     const maxRows = matrix.length;

//     // ---------------------------------------------------------
//     // BƯỚC 2: QUY ĐỔI KÍCH THƯỚC VÀ XÁC ĐỊNH LỐI ĐI
//     // ---------------------------------------------------------
//     const cmToPt = 28.35; // 1 cm = 28.35 pt
//     const paddingPt = 1.4;
//     const aisleSizePt = 28.35;

//     // Kích thước lề 1cm
//     const margin1cmPt = 28.35;
//     const marginLR = 36.0; // Giữ nguyên lề trái/phải khoảng 0.5 inch (36pt) để dàn ngang thoải mái

//     const imgHeightPt = config.h * cmToPt;
//     const imgHeightPx = Math.round(imgHeightPt * 1.3333);

//     const rowHeightStudentPt = imgHeightPt + 28;

//     const colIsAisle = new Array(maxCols).fill(true);
//     const rowIsAisle = new Array(maxRows).fill(true);

//     for (let r = 0; r < maxRows; r++) {
//         for (let c = 0; c < maxCols; c++) {
//             let cellVal = (Array.isArray(matrix[r]) && matrix[r][c] !== undefined && matrix[r][c] !== null) ? String(matrix[r][c]).trim() : '';
//             if (/^\d+$/.test(cellVal)) {
//                 colIsAisle[c] = false;
//                 rowIsAisle[r] = false;
//             }
//         }
//     }

//     let totalRowHeightPt = 0;
//     for (let r = 0; r < maxRows; r++) {
//         totalRowHeightPt += rowIsAisle[r] ? aisleSizePt : rowHeightStudentPt;
//     }

//     // 🌟 Tính lại tổng chiều cao giấy = Các hàng + (Lề trên 1cm + Lề dưới 1cm) + Tiêu đề + Footer bản quyền
//     const dynamicPageHeightPt = totalRowHeightPt + (margin1cmPt * 2) + 40 + 40;

//     const pageWidthPt = 842.0;
//     const usableWidthPt = pageWidthPt - (marginLR * 2);

//     const numAislesCols = colIsAisle.filter(v => v).length;
//     const numStudentCols = maxCols - numAislesCols;
//     const remainingWidth = usableWidthPt - (numAislesCols * aisleSizePt);
//     const studentColWidthPt = numStudentCols > 0 ? (remainingWidth / numStudentCols) : (usableWidthPt / maxCols);

//     // ---------------------------------------------------------
//     // BƯỚC 3: VẼ BẢNG WORD
//     // ---------------------------------------------------------
//     let htmlTable = `<table style="width: 100%; border-collapse: collapse; text-align: center; table-layout: fixed;">`;

//     for (let r = 0; r < maxRows; r++) {
//         const currentRowHeightPt = rowIsAisle[r] ? aisleSizePt : rowHeightStudentPt;
//         htmlTable += `<tr style="height: ${currentRowHeightPt}pt; mso-height-rule: exactly;">`;

//         const row = matrix[r];

//         for (let c = 0; c < maxCols; c++) {
//             let cellVal = (Array.isArray(row) && row[c] !== undefined && row[c] !== null) ? String(row[c]).trim() : '';
//             const isSTT = /^\d+$/.test(cellVal);
//             let stt = parseInt(cellVal, 10);

//             const currentWidthPt = colIsAisle[c] ? aisleSizePt : studentColWidthPt;
//             const borderStyle = (isSTT || cellVal.length > 0) ? '1px solid black' : 'none';

//             if (isSTT && stt > 0 && stt <= maxLen) {
//                 let idx = stt - 1;
//                 let tenHS = arrTen[idx] || 'Chưa có tên';

//                 let anhData = await getImgData(arrAnh[idx]);
//                 let imgWidthPt = imgHeightPt * anhData.ratio;
//                 let imgWidthPx = Math.round(imgWidthPt * 1.3333);

//                 htmlTable += `
//                     <td style="width: ${currentWidthPt}pt; height: ${currentRowHeightPt}pt; padding: ${paddingPt}pt; vertical-align: top; border: ${borderStyle}; text-align: center;">
//                         <div style="text-align: center; margin-bottom: 2pt;">
//                             <img src="${anhData.src}" width="${imgWidthPx}" height="${imgHeightPx}" style="width: ${imgWidthPt}pt; height: ${imgHeightPt}pt; display: block; margin: 0 auto;">
//                         </div>
//                         <div style="font-size: 11pt; font-family: 'Times New Roman', serif; line-height: 1.2; word-wrap: break-word; color: #000000;">
//                             <b>${stt}. ${tenHS}</b>
//                         </div>
//                     </td>
//                 `;
//             }
//             else {
//                 htmlTable += `
//                     <td style="width: ${currentWidthPt}pt; height: ${currentRowHeightPt}pt; padding: ${paddingPt}pt; vertical-align: middle; border: ${borderStyle}; font-size: 14pt; font-family: 'Times New Roman', serif; color: #000000; word-wrap: break-word; text-align: center;">
//                         <b>${cellVal}</b>
//                     </td>
//                 `;
//             }
//         }
//         htmlTable += `</tr>`;
//     }
//     htmlTable += `</table>`;

//     // ---------------------------------------------------------
//     // BƯỚC 4: LẤY THỜI GIAN THỰC TẾ
//     // ---------------------------------------------------------
//     const now = new Date();
//     const pad = (n) => n.toString().padStart(2, '0');
//     // Định dạng: 14:58 ngày 10/09/2026
//     const thoiGianTao = `${pad(now.getHours())}:${pad(now.getMinutes())} ngày ${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()}`;

//     // ---------------------------------------------------------
//     // BƯỚC 5: ĐÓNG GÓI XUẤT FILE VỚI CSS MỚI
//     // ---------------------------------------------------------
//     const docHTML = `
//         <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
//         <head>
//             <meta charset='utf-8'>
//             <title>Sơ đồ lớp</title>
//             <style>
//                 @page WordSection1 {
//                     size: ${pageWidthPt}pt ${dynamicPageHeightPt}pt; 
//                     mso-page-orientation: landscape;
//                     /* 🌟 Ép Top và Bottom 1cm (28.35pt) */
//                     margin: 28.35pt ${marginLR}pt 28.35pt ${marginLR}pt; 
//                     /* 🌟 Ép Header và Footer 1cm (28.35pt) */
//                     mso-header-margin: 28.35pt;
//                     mso-footer-margin: 28.35pt;
//                 }
//                 div.WordSection1 { page: WordSection1; }
//                 table { border-collapse: collapse; width: 100%; }
//                 p, div { margin: 0; padding: 0; }
//             </style>
//         </head>
//         <body>
//             <div class='WordSection1'>
//                 <h2 style="text-align: center; font-family: 'Times New Roman', serif; margin: 0 0 10px 0; font-size: 16pt; text-transform: uppercase;">
//                     <b>${config.tenLop}</b>
//                 </h2>
//                 ${htmlTable}
                
//                 <p style="margin: 8pt 0 0 0; padding: 0; font-size: 7pt; text-align: right; font-family: 'Times New Roman', serif; color: #555555; font-style: italic;">
//                     © File sơ đồ lớp được xuất tự động từ trang web của Thầy Huỳnh Đức Chính - THPT Gia Định. Thời gian tạo: ${thoiGianTao}
//                 </p>

//                 <p style="margin: 0; padding: 0; font-size: 1pt; line-height: 1pt;">&nbsp;</p>
//             </div>
//         </body>
//         </html>
//     `;

//     const blob = new Blob(['\ufeff', docHTML], { type: 'application/msword' });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = `So_Do_${config.tenLop.replace(/\s+/g, '_')}.doc`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     URL.revokeObjectURL(url);

//     Swal.fire({
//         icon: 'success',
//         title: 'Hoàn tất!',
//         text: `Đã thiết lập lề trang giấy và thêm thông báo bản quyền kèm ngày giờ xuất file!`,
//         timer: 3000,
//         showConfirmButton: false
//     });
// };


// =======================================================
// HÀM 18: RÁP DỮ LIỆU VÀ XUẤT FILE SƠ ĐỒ (WORD & PDF CUSTOM SIZE)
// =======================================================
window.ham_18_xuat_so_do_word = async function () {
    const matrix = window.DuLieuSoDoTam || [];
    const arrTen = window.DanhSachHocSinhTam || [];
    const arrAnh = window.DanhSachAnhSoDoTam || [];

    if (matrix.length === 0) return Swal.fire('Thiếu dữ liệu', 'Thầy chưa nạp file Sơ đồ chỗ ngồi!', 'warning');
    if (arrTen.length === 0) return Swal.fire('Thiếu dữ liệu', 'Thầy chưa nạp Danh sách học sinh!', 'warning');

    const { value: config } = await Swal.fire({
        title: '⚙️ Tùy chỉnh xuất Sơ đồ',
        width: 500,
        html: `
            <div style="text-align: left; font-size: 14px;">
                <label style="font-weight: bold; color: #0056b3;">1. Tiêu đề sơ đồ (Tên lớp):</label>
                <input id="swal-ten-lop" class="swal2-input" placeholder="VD: LỚP 12A1" value="SƠ ĐỒ LỚP HỌC" style="margin-top: 5px; margin-bottom: 15px; width: 100%; box-sizing: border-box;">
                
                <label style="font-weight: bold; color: #d35400;">2. Chiều cao ảnh học sinh (cm):</label>
                <input id="swal-img-h" type="number" step="0.1" class="swal2-input" value="3" style="margin-top: 5px; margin-bottom: 15px; width: 100%; box-sizing: border-box;">
                
                <label style="font-weight: bold; color: #28a745;">3. Định dạng xuất:</label>
                <div style="display: flex; gap: 20px; margin-top: 8px; background: #f8f9fa; padding: 12px; border-radius: 6px; border: 1px solid #dee2e6;">
                    <label style="cursor: pointer; display: flex; align-items: center; gap: 5px; font-weight: bold; color: #0056b3;">
                        <input type="checkbox" id="swal-export-word" checked style="width: 18px; height: 18px; cursor: pointer;"> 📄 File Word (.doc)
                    </label>
                    <label style="cursor: pointer; display: flex; align-items: center; gap: 5px; font-weight: bold; color: #dc3545;">
                        <input type="checkbox" id="swal-export-pdf" style="width: 18px; height: 18px; cursor: pointer;"> 📕 File PDF / Bản In
                    </label>
                </div>
                <p style="font-size: 12px; color: #666; font-style: italic; margin-top: 8px;">* PDF sẽ tự động căn chỉnh khổ giấy linh hoạt theo chiều cao sơ đồ để không bị mất nội dung.</p>
            </div>
        `,
        showCancelButton: true,
        confirmButtonColor: '#007bff',
        confirmButtonText: '🚀 Xuất File',
        cancelButtonText: 'Hủy',
        preConfirm: () => {
            const isWord = document.getElementById('swal-export-word').checked;
            const isPdf = document.getElementById('swal-export-pdf').checked;

            if (!isWord && !isPdf) {
                Swal.showValidationMessage('Vui lòng chọn ít nhất 1 định dạng xuất (Word hoặc PDF)!');
                return false;
            }

            return {
                tenLop: document.getElementById('swal-ten-lop').value.trim() || 'SƠ ĐỒ LỚP HỌC',
                h: parseFloat(document.getElementById('swal-img-h').value) || 3,
                isWord: isWord,
                isPdf: isPdf
            }
        }
    });

    if (!config) return;

    Swal.fire({
        title: 'Đang khởi tạo...',
        html: 'Đang ráp ảnh và định dạng sơ đồ...',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading()
    });

    const getImgData = (anh) => new Promise((resolve) => {
        const defaultSrc = 'https://placehold.co/90x120/e9ecef/a3a3a3?text=Trong';
        if (!anh) return resolve({ src: defaultSrc, ratio: 0.75 });

        const img = new Image();
        img.onload = () => resolve({ src: img.src, ratio: img.width / img.height });
        img.onerror = () => resolve({ src: anh.url || defaultSrc, ratio: 0.75 });

        if (anh.source === 'local' && anh.fileObj) {
            const reader = new FileReader();
            reader.onload = (e) => img.src = e.target.result;
            reader.readAsDataURL(anh.fileObj);
        } else {
            img.src = anh.url;
        }
    });

    const maxLen = Math.max(arrTen.length, arrAnh.length);
    const maxCols = Math.max(...matrix.map(row => Array.isArray(row) ? row.length : 1), 1);
    const maxRows = matrix.length;

    // QUY ĐỔI KÍCH THƯỚC (PT - Điểm ảnh)
    const cmToPt = 28.35;
    const paddingPt = 1.4;
    const aisleSizePt = 28.35;
    const margin1cmPt = 28.35;
    const marginLR = 36.0;

    const imgHeightPt = config.h * cmToPt;
    const imgHeightPx = Math.round(imgHeightPt * 1.3333);
    const rowHeightStudentPt = imgHeightPt + 28;

    const colIsAisle = new Array(maxCols).fill(true);
    const rowIsAisle = new Array(maxRows).fill(true);

    for (let r = 0; r < maxRows; r++) {
        for (let c = 0; c < maxCols; c++) {
            let cellVal = (Array.isArray(matrix[r]) && matrix[r][c] !== undefined && matrix[r][c] !== null) ? String(matrix[r][c]).trim() : '';
            if (/^\d+$/.test(cellVal)) {
                colIsAisle[c] = false;
                rowIsAisle[r] = false;
            }
        }
    }

    let totalRowHeightPt = 0;
    for (let r = 0; r < maxRows; r++) {
        totalRowHeightPt += rowIsAisle[r] ? aisleSizePt : rowHeightStudentPt;
    }

    // TÍNH TOÁN KÍCH THƯỚC KHỔ GIẤY ĐỘNG (Custom Size)
    const dynamicPageHeightPt = totalRowHeightPt + (margin1cmPt * 2) + 40 + 40;
    const pageWidthPt = 842.0;
    const usableWidthPt = pageWidthPt - (marginLR * 2);

    const numAislesCols = colIsAisle.filter(v => v).length;
    const numStudentCols = maxCols - numAislesCols;
    const remainingWidth = usableWidthPt - (numAislesCols * aisleSizePt);
    const studentColWidthPt = numStudentCols > 0 ? (remainingWidth / numStudentCols) : (usableWidthPt / maxCols);

    // VẼ BẢNG HTML DÙNG CHUNG CHO CẢ WORD & PDF
    let htmlTable = `<table style="width: 100%; border-collapse: collapse; text-align: center; table-layout: fixed;">`;

    for (let r = 0; r < maxRows; r++) {
        const currentRowHeightPt = rowIsAisle[r] ? aisleSizePt : rowHeightStudentPt;
        htmlTable += `<tr style="height: ${currentRowHeightPt}pt; mso-height-rule: exactly;">`;

        const row = matrix[r];

        for (let c = 0; c < maxCols; c++) {
            let cellVal = (Array.isArray(row) && row[c] !== undefined && row[c] !== null) ? String(row[c]).trim() : '';
            const isSTT = /^\d+$/.test(cellVal);
            let stt = parseInt(cellVal, 10);

            const currentWidthPt = colIsAisle[c] ? aisleSizePt : studentColWidthPt;
            const borderStyle = (isSTT || cellVal.length > 0) ? '1px solid black' : 'none';

            if (isSTT && stt > 0 && stt <= maxLen) {
                let idx = stt - 1;
                let tenHS = arrTen[idx] || 'Chưa có tên';

                let anhData = await getImgData(arrAnh[idx]);
                let imgWidthPt = imgHeightPt * anhData.ratio;
                let imgWidthPx = Math.round(imgWidthPt * 1.3333);

                htmlTable += `
                    <td style="width: ${currentWidthPt}pt; height: ${currentRowHeightPt}pt; padding: ${paddingPt}pt; vertical-align: top; border: ${borderStyle}; text-align: center;">
                        <div style="text-align: center; margin-bottom: 2pt;">
                            <img src="${anhData.src}" width="${imgWidthPx}" height="${imgHeightPx}" style="width: ${imgWidthPt}pt; height: ${imgHeightPt}pt; display: block; margin: 0 auto;">
                        </div>
                        <div style="font-size: 11pt; font-family: 'Times New Roman', serif; line-height: 1.2; word-wrap: break-word; color: #000000;">
                            <b>${stt}. ${tenHS}</b>
                        </div>
                    </td>
                `;
            }
            else {
                htmlTable += `
                    <td style="width: ${currentWidthPt}pt; height: ${currentRowHeightPt}pt; padding: ${paddingPt}pt; vertical-align: middle; border: ${borderStyle}; font-size: 14pt; font-family: 'Times New Roman', serif; color: #000000; word-wrap: break-word; text-align: center;">
                        <b>${cellVal}</b>
                    </td>
                `;
            }
        }
        htmlTable += `</tr>`;
    }
    htmlTable += `</table>`;

    const now = new Date();
    const pad = (n) => n.toString().padStart(2, '0');
    const thoiGianTao = `${pad(now.getHours())}:${pad(now.getMinutes())} ngày ${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()}`;

    // ==========================================
    // 🌟 LUỒNG 1: XUẤT FILE WORD (.DOC)
    // ==========================================
    if (config.isWord) {
        const docHTML = `
            <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
            <head>
                <meta charset='utf-8'>
                <title>Sơ đồ lớp</title>
                <style>
                    @page WordSection1 {
                        size: ${pageWidthPt}pt ${dynamicPageHeightPt}pt; 
                        mso-page-orientation: landscape;
                        margin: 28.35pt ${marginLR}pt 28.35pt ${marginLR}pt; 
                        mso-header-margin: 28.35pt;
                        mso-footer-margin: 28.35pt;
                    }
                    div.WordSection1 { page: WordSection1; }
                    table { border-collapse: collapse; width: 100%; }
                    p, div { margin: 0; padding: 0; }
                </style>
            </head>
            <body>
                <div class='WordSection1'>
                    <h2 style="text-align: center; font-family: 'Times New Roman', serif; margin: 0 0 10px 0; font-size: 16pt; text-transform: uppercase;">
                        <b>${config.tenLop}</b>
                    </h2>
                    ${htmlTable}
                    <p style="margin: 8pt 0 0 0; padding: 0; font-size: 7pt; text-align: right; font-family: 'Times New Roman', serif; color: #555555; font-style: italic;">
                        © File sơ đồ lớp được xuất tự động từ trang web của Thầy Huỳnh Đức Chính - THPT Gia Định. Thời gian tạo: ${thoiGianTao}
                    </p>
                    <p style="margin: 0; padding: 0; font-size: 1pt; line-height: 1pt;">&nbsp;</p>
                </div>
            </body>
            </html>
        `;

        const blob = new Blob(['\ufeff', docHTML], { type: 'application/msword' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `So_Do_${config.tenLop.replace(/\s+/g, '_')}.doc`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    // ==========================================
    // 🌟 LUỒNG 2: XUẤT FILE PDF / BẢN IN NATIVE (CUSTOM SIZE)
    // ==========================================
    if (config.isPdf) {
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(`
                <!DOCTYPE html>
                <html lang="vi">
                <head>
                    <meta charset="utf-8">
                    <title>Sơ Đồ - ${config.tenLop}</title>
                    <style>
                        /* 🌟 ÉP KÍCH THƯỚC TRANG IN CHUẨN XÁC VỚI KÍCH THƯỚC ĐỘNG CỦA FILE WORD */
                        @page {
                            size: ${pageWidthPt}pt ${dynamicPageHeightPt}pt;
                            margin: 28.35pt ${marginLR}pt; /* Lề trên/dưới 1cm, trái phải giữ nguyên */
                        }
                        body {
                            font-family: 'Times New Roman', serif;
                            margin: 0;
                            padding: 0;
                            -webkit-print-color-adjust: exact;
                            print-color-adjust: exact;
                        }
                        /* Reset lại một số thông số để phù hợp với trình duyệt HTML */
                        table { border-collapse: collapse; width: 100%; table-layout: fixed; }
                        td { border: 1px solid black; }
                        h2 { text-align: center; margin: 0 0 15px 0; font-size: 22pt; text-transform: uppercase; }
                        .footer { margin-top: 15px; font-size: 11pt; text-align: right; color: #555; font-style: italic; }
                    </style>
                </head>
                <body>
                    <h2><b>${config.tenLop}</b></h2>
                    
                    ${htmlTable}
                    
                    <div class="footer">
                        © File sơ đồ lớp được xuất tự động từ trang web của Thầy Huỳnh Đức Chính - THPT Gia Định. Thời gian tạo: ${thoiGianTao}
                    </div>
                    
                    <script>
                        // Đợi ảnh Load xong (500ms) mới gọi lệnh in để đảm bảo ảnh không bị mất
                        window.onload = function() {
                            setTimeout(() => {
                                window.print();
                            }, 500);
                        };
                    </script>
                </body>
                </html>
            `);
            printWindow.document.close();
        } else {
            Swal.fire('Bị chặn Popup!', 'Trình duyệt của thầy đang chặn mở tab mới. Vui lòng cấp quyền mở Popup cho trang web này ở thanh địa chỉ để in PDF!', 'warning');
        }
    }

    Swal.fire({
        icon: 'success',
        title: 'Hoàn tất!',
        text: `Đã xuất dữ liệu theo định dạng đã chọn.`,
        timer: 3000,
        showConfirmButton: false
    });
};


// // =======================================================
// // HÀM TẠO VÀ TẢI FILE MẪU SƠ ĐỒ LỚP (SINH TRỰC TIẾP BẰNG CODE JS)
// // =======================================================
// window.ham_18_tao_file_mau_word_so_do = function () {
//     // Kích thước A4 ngang
//     const pageWidthPt = 842.0;
//     const pageHeightPt = 595.0;
//     const marginPt = 28.35; // Lề 1cm

//     // Chiều rộng các cột
//     const aisleWidthPt = 28.35; // Lối đi 1cm
//     const totalAisleWidth = aisleWidthPt * 3;
//     const usableForDesks = (pageWidthPt - (marginPt * 2)) - totalAisleWidth;
//     const deskColWidthPt = (usableForDesks / 8).toFixed(1); // 8 cột bàn học

//     // Ma trận 11 cột x 7 dòng
//     let matrixData = [];
//     let stt = 1;

//     for (let r = 1; r <= 6; r++) {
//         let row = [];
//         row.push(stt++); row.push(stt++); // Dãy 1 (Cột 1, 2)
//         row.push('');                     // Lối đi 1 (Cột 3)
//         row.push(stt++); row.push(stt++); // Dãy 2 (Cột 4, 5)
//         row.push('');                     // Lối đi 2 (Cột 6)
//         row.push(stt++); row.push(stt++); // Dãy 3 (Cột 7, 8)
//         row.push('');                     // Lối đi 3 (Cột 9)
//         row.push(stt++); row.push(stt++); // Dãy 4 (Cột 10, 11)
//         matrixData.push(row);
//     }

//     // Dòng 7: Bàn GV, Bảng, Cửa...
//     const row7 = [
//         '', 'BÀN GV',
//         '',
//         '', 'BẢNG', '', 'BẢNG', '',
//         '',
//         '', 'CỬA LỚP'
//     ];
//     matrixData.push(row7);

//     // Vẽ Bảng HTML
//     let tableHtml = `<table border="1" style="width: 100%; border-collapse: collapse; text-align: center; table-layout: fixed;">`;

//     matrixData.forEach((row, rIdx) => {
//         const isRowGV = (rIdx === 6);
//         const rowHeight = isRowGV ? '28.35pt' : '50pt';

//         tableHtml += `<tr style="height: ${rowHeight}; mso-height-rule: exactly;">`;
//         row.forEach((cellVal, cIdx) => {
//             const isAisle = (cIdx === 2 || cIdx === 5 || cIdx === 8);
//             const colWidth = isAisle ? `${aisleWidthPt}pt` : `${deskColWidthPt}pt`;
//             const bgColor = isAisle ? '#f9f9f9' : (isRowGV ? '#fff3cd' : '#ffffff');
//             const fontBold = (cellVal !== '' && !isAisle) ? 'bold' : 'normal';
//             const fontSize = isRowGV ? '13pt' : '12pt';

//             tableHtml += `
//                 <td style="width: ${colWidth}; height: ${rowHeight}; padding: 3px; vertical-align: middle; background-color: ${bgColor}; font-size: ${fontSize}; font-family: 'Times New Roman', serif; font-weight: ${fontBold};">
//                     ${cellVal}
//                 </td>
//             `;
//         });
//         tableHtml += `</tr>`;
//     });
//     tableHtml += `</table>`;

//     // 🌟 CHÈN GHI CHÚ MÀU ĐỎ YÊU CẦU LƯU THÀNH .DOCX
//     const docContent = `
//         <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
//         <head>
//             <meta charset='utf-8'>
//             <title>File Mẫu Sơ Đồ Lớp Học</title>
//             <style>
//                 @page WordSection1 {
//                     size: ${pageWidthPt}pt ${pageHeightPt}pt;
//                     mso-page-orientation: landscape;
//                     margin: ${marginPt}pt ${marginPt}pt ${marginPt}pt ${marginPt}pt;
//                 }
//                 div.WordSection1 { page: WordSection1; }
//                 table { border-collapse: collapse; width: 100%; }
//                 td { border: 1px solid black; }
//                 p, h3 { margin: 0; padding: 0; }
//             </style>
//         </head>
//         <body>
//             <div class='WordSection1'>
//                 <h3 style="text-align: center; font-family: 'Times New Roman', serif; margin-bottom: 10px; font-size: 16pt;">
//                     FILE MẪU SƠ ĐỒ LỚP HỌC (11 CỘT x 7 DÒNG)
//                 </h3>
                
//                 <p style="text-align: center; font-family: 'Times New Roman', serif; font-size: 11pt; color: red; font-weight: bold; margin-bottom: 5px;">
//                     LƯU Ý QUAN TRỌNG: SAU KHI CHỈNH SỬA XONG VỊ TRÍ, THẦY/CÔ VUI LÒNG BẤM "FILE" -> "SAVE AS"<br>VÀ CHỌN ĐỊNH DẠNG "Word Document (*.docx)" ĐỂ HỆ THỐNG CÓ THỂ ĐỌC ĐƯỢC!
//                 </p>
                
//                 <p style="text-align: center; font-family: 'Times New Roman', serif; font-size: 10pt; color: #555; margin-bottom: 15px; font-style: italic;">
//                     (Thầy/cô có thể hoán đổi các con số thứ tự bên dưới để thay đổi chỗ ngồi học sinh. Các cột xám là lối đi)
//                 </p>

//                 ${tableHtml}
//             </div>
//         </body>
//         </html>
//     `;

//     // Tạo file và tải về dưới đuôi .doc
//     const blob = new Blob(['\ufeff', docContent], { type: 'application/msword' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'Mau_So_Do_Lop.doc';
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
// };


// =======================================================
// HÀM TẠO VÀ TẢI FILE MẪU SƠ ĐỒ LỚP (.DOCX THẬT BẰNG DOCX.JS)
// =======================================================
window.ham_18_tao_file_mau_word_so_do = async function () {
    // 1. Tự động nạp thư viện docx.js nếu chưa có
    if (typeof window.docx === 'undefined') {
        Swal.fire({
            title: 'Đang chuẩn bị...',
            text: 'Đang nạp bộ công cụ tạo file Word (.docx), vui lòng đợi giây lát...',
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading()
        });

        let script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/docx@7.8.2/build/index.js';
        script.onload = () => {
            Swal.close();
            window.ham_18_tao_file_mau_word_so_do(); // Gọi lại sau khi nạp xong thư viện
        };
        document.head.appendChild(script);
        return;
    }

    const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType, VerticalAlign } = window.docx;

    let stt = 1;
    const tableRows = [];

    // Tạo 6 dòng bàn học
    for (let r = 1; r <= 6; r++) {
        let rowCells = [];
        for (let c = 0; c < 11; c++) {
            let isAisle = (c === 2 || c === 5 || c === 8);
            let text = isAisle ? "" : (stt++).toString();
            let shading = isAisle ? { fill: "F9F9F9" } : { fill: "FFFFFF" };

            rowCells.push(new TableCell({
                children: [
                    new Paragraph({
                        children: [new TextRun({ text: text, bold: !isAisle, size: 24 })], // size 24 = 12pt
                        alignment: AlignmentType.CENTER
                    })
                ],
                width: { size: isAisle ? 3 : 11, type: WidthType.PERCENTAGE },
                verticalAlign: VerticalAlign.CENTER,
                shading: shading
            }));
        }
        tableRows.push(new TableRow({ children: rowCells, height: { value: 1000, rule: "exact" } })); // Chiều cao khoảng 50pt
    }

    // Tạo dòng 7 (Bàn GV, Bảng, Cửa lớp)
    const row7Texts = ["", "BÀN GV", "", "", "BẢNG", "", "BẢNG", "", "", "CỬA LỚP", ""];
    let row7Cells = [];
    for (let c = 0; c < 11; c++) {
        let isAisle = (c === 2 || c === 5 || c === 8);
        let text = row7Texts[c];
        let shading = { fill: isAisle ? "F9F9F9" : "FFF3CD" };

        row7Cells.push(new TableCell({
            children: [
                new Paragraph({
                    children: [new TextRun({ text: text, bold: true, size: 26 })], // size 26 = 13pt
                    alignment: AlignmentType.CENTER
                })
            ],
            width: { size: isAisle ? 3 : 11, type: WidthType.PERCENTAGE },
            verticalAlign: VerticalAlign.CENTER,
            shading: shading
        }));
    }
    tableRows.push(new TableRow({ children: row7Cells, height: { value: 567, rule: "exact" } })); // Chiều cao khoảng 28.35pt (1cm)

    // Đóng gói Document
    const doc = new Document({
        sections: [{
            properties: {
                page: {
                    margin: { top: 567, right: 567, bottom: 567, left: 567 }, // Căn lề 1cm (~567 twips)
                    size: { orientation: "landscape" } // In ngang
                }
            },
            children: [
                new Paragraph({
                    children: [new TextRun({ text: "FILE MẪU SƠ ĐỒ LỚP HỌC (11 CỘT x 7 DÒNG)", bold: true, size: 32 })],
                    alignment: AlignmentType.CENTER,
                    spacing: { after: 200 }
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "(Thầy/cô có thể hoán đổi các con số thứ tự bên dưới để thay đổi chỗ ngồi học sinh. Các cột xám là lối đi)",
                            italics: true, color: "555555", size: 20
                        })
                    ],
                    alignment: AlignmentType.CENTER,
                    spacing: { after: 300 }
                }),
                new Table({
                    rows: tableRows,
                    width: { size: 100, type: WidthType.PERCENTAGE }
                })
            ]
        }]
    });

    // Xuất file chuẩn .docx
    Packer.toBlob(doc).then(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Mau_So_Do_Lop.docx'; // Lưu với đuôi .docx
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
};


// =======================================================
// HÀM TẠO VÀ TẢI FILE MẪU SƠ ĐỒ LỚP (EXCEL - CĂN GIỮA, CÓ KHUNG VIỀN)
// Yêu cầu thư viện: xlsx-js-style
// =======================================================
window.ham_18_tao_file_mau_excel_so_do = function () {
    let matrixData = [];
    let stt = 1;

    for (let r = 1; r <= 6; r++) {
        let row = [];
        row.push(stt++); row.push(stt++); // Dãy 1
        row.push('');                     // Lối đi 1
        row.push(stt++); row.push(stt++); // Dãy 2
        row.push('');                     // Lối đi 2
        row.push(stt++); row.push(stt++); // Dãy 3
        row.push('');                     // Lối đi 3
        row.push(stt++); row.push(stt++); // Dãy 4
        matrixData.push(row);
    }

    const row7 = [
        'BÀN GV', 'BÀN GV',
        '',
        '', 'BẢNG', '', 'BẢNG', '',
        '',
        'CỬA LỚP', ''
    ];
    matrixData.push(row7);

    // Chuyển ma trận thành Worksheet
    const ws = XLSX.utils.aoa_to_sheet(matrixData);

    // Tùy chỉnh STYLE: Căn giữa, Font chữ và Khung viền (Border)
    for (let R = 0; R < matrixData.length; ++R) {
        for (let C = 0; C < matrixData[R].length; ++C) {
            let cellRef = XLSX.utils.encode_cell({ c: C, r: R });
            if (!ws[cellRef]) continue;

            let isLoiDi = (C === 2 || C === 5 || C === 8);

            if (!isLoiDi && matrixData[R][C] !== '') {
                ws[cellRef].s = {
                    alignment: {
                        vertical: "center",   // Canh giữa trên dưới (middle)
                        horizontal: "center"  // Canh giữa trái phải (center)
                    },
                    font: {
                        name: "Times New Roman",
                        sz: (R === 6) ? 13 : 12,
                        bold: true // In đậm toàn bộ các ô có số/chữ
                    },
                    border: { // Kẻ khung viền cho các ô bàn học
                        top: { style: "thin", color: { auto: 1 } },
                        bottom: { style: "thin", color: { auto: 1 } },
                        left: { style: "thin", color: { auto: 1 } },
                        right: { style: "thin", color: { auto: 1 } }
                    }
                };
            }
        }
    }

    // Ép chiều rộng cột
    ws['!cols'] = [
        { wch: 10 }, { wch: 10 },
        { wch: 3 },
        { wch: 10 }, { wch: 10 },
        { wch: 3 },
        { wch: 10 }, { wch: 10 },
        { wch: 3 },
        { wch: 10 }, { wch: 10 }
    ];

    // Ép chiều cao dòng (50pt)
    ws['!rows'] = [];
    for (let i = 0; i < matrixData.length; i++) {
        ws['!rows'].push({ hpt: 50 });
    }

    // Khởi tạo Workbook và xuất file
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SoDoLop");

    try {
        XLSX.writeFile(wb, "Mau_So_Do_Lop_11Cot_7Dong.xlsx");
        Swal.fire({
            icon: 'success',
            title: 'Tải thành công',
            text: 'File mẫu Excel đã được định dạng căn giữa tuyệt đối!',
            timer: 3000,
            showConfirmButton: false
        });
    } catch (error) {
        Swal.fire('Lỗi', 'Không xuất được file. Thầy kiểm tra lại đã nạp đúng thư viện xlsx-js-style chưa nhé.', 'error');
    }
};

// =======================================================
// CÁC HÀM XỬ LÝ ĐẢO NGƯỢC & DI CHUYỂN ẢNH TẠI CHỖ
// =======================================================

// 1. Nút Đảo ngược: Chống lại cơ chế tự đảo file của hệ điều hành di động
window.ham_dao_nguoc_thu_tu_anh = function () {
    if (!window.DanhSachAnhSoDoTam || window.DanhSachAnhSoDoTam.length === 0) {
        return Swal.fire('Thông báo', 'Chưa có ảnh nào để đảo ngược!', 'info');
    }

    // Lật ngược mảng ảnh
    window.DanhSachAnhSoDoTam.reverse();

    // Render lại giao diện
    window.ham_18_render_preview_tong_hop();
};

// 2. Nút Di chuyển LÊN
window.ham_di_chuyen_anh_len = function (index) {
    if (index <= 0) return; // Đã ở trên cùng, không thể lên

    const arr = window.DanhSachAnhSoDoTam;

    // Nếu mảng ảnh ngắn hơn mảng tên, bù tự động các ô rỗng (null) để mảng đủ độ dài
    while (arr.length <= index) arr.push(null);

    // Hoán đổi vị trí với ảnh phía trước
    [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]];

    window.ham_18_render_preview_tong_hop();
};

// 3. Nút Di chuyển XUỐNG
window.ham_di_chuyen_anh_xuong = function (index) {
    const arr = window.DanhSachAnhSoDoTam;
    const maxLen = Math.max(window.DanhSachHocSinhTam.length, arr.length);

    if (index >= maxLen - 1) return; // Đã ở dưới cùng

    // Bù tự động các ô rỗng
    while (arr.length <= index + 1) arr.push(null);

    // Hoán đổi vị trí với ảnh phía sau
    [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]];

    window.ham_18_render_preview_tong_hop();
};


// =======================================================
// HÀM TỔNG HỢP: RÁP NỐI VÀ RENDER ẢNH + TÊN (GIAO DIỆN ẢNH TO)
// =======================================================
window.ham_18_render_preview_tong_hop = function () {
    const vungPreview = document.getElementById('vung-preview-anh-tong');
    const labelSoLuong = document.getElementById('so-luong-anh-da-nap');
    const khuVucHienThi = document.getElementById('khu-vuc-hien-thi-anh-duoi');

    // Tăng max-height để bảng hiển thị được nhiều hàng cao hơn
    vungPreview.style = "max-height: 550px; overflow-y: auto; padding-right: 5px; display: block;";
    vungPreview.innerHTML = '';

    const arrAnh = window.DanhSachAnhSoDoTam || [];
    const arrTen = window.DanhSachHocSinhTam || [];
    const maxLen = Math.max(arrAnh.length, arrTen.length);

    if (maxLen === 0) {
        khuVucHienThi.style.display = 'none';
        return;
    }

    khuVucHienThi.style.display = 'block';
    labelSoLuong.innerText = maxLen;

    let htmlTable = `
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; background: white; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
            <thead style="position: sticky; top: 0; background: #e9ecef; z-index: 10; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <tr>
                    <th style="padding: 12px 8px; border-bottom: 2px solid #dee2e6; width: 50px; text-align: center; color: #495057;">STT</th>
                    
                    <th style="padding: 12px 8px; border-bottom: 2px solid #dee2e6; width: 25%; color: #0056b3; text-align: left;">👤 HỌ VÀ TÊN</th>
                    
                    <th style="padding: 12px 8px; border-bottom: 2px solid #dee2e6; width: 130px; text-align: center; color: #17a2b8;">📸 ẢNH THẺ</th>
                    
                    <th style="padding: 12px 8px; border-bottom: 2px solid #dee2e6; color: #6c757d; text-align: left;">📄 TÊN FILE ẢNH</th>
                </tr>
            </thead>
            <tbody>
    `;

    for (let i = 0; i < maxLen; i++) {
        // Nếu thiếu ảnh, dùng ảnh xám thay thế tạm
        const anhUrl = arrAnh[i] ? arrAnh[i].url : 'https://placehold.co/120x160/e9ecef/a3a3a3?text=Trong';
        const tenFile = arrAnh[i] ? arrAnh[i].name : '<span style="color:#dc3545; font-weight:bold;">❌ Đang thiếu file ảnh</span>';

        let tenHS = '';
        if (arrTen[i]) {
            tenHS = `<span style="font-size: 16px;">${arrTen[i]}</span>`;
        } else {
            tenHS = `<span style="color:#dc3545; font-weight:bold; font-style: italic;">❌ Thiếu tên</span>`;
        }

        const mauNen = (i % 2 === 0) ? 'background: #ffffff;' : 'background: #f8f9fa;';

        htmlTable += `
            <tr style="${mauNen} border-bottom: 1px solid #ddd; transition: 0.2s;" onmouseover="this.style.background='#e3f2fd'" onmouseout="this.style.background='${i % 2 === 0 ? '#ffffff' : '#f8f9fa'}'">
                
                <!-- CỘT 1: STT -->
                <td style="padding: 10px 8px; text-align: center; font-weight: bold; color: #495057; font-size: 16px;">
                    ${i + 1}
                </td>
                
                <!-- CỘT 2: TÊN HỌC SINH VÀ NÚT CHỨC NĂNG -->
                <td style="padding: 10px 8px; font-weight: bold; color: #0056b3; vertical-align: middle;">
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        ${tenHS}
                        <div style="display: flex; gap: 8px;">
                            <button onclick="ham_18_them_ten_hs(${i})" title="Chèn thêm 1 tên vào vị trí này" style="padding: 5px 10px; font-size: 11px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; box-shadow: 0 1px 2px rgba(0,0,0,0.1);">➕ Thêm</button>
                            <button onclick="ham_18_xoa_ten_hs(${i})" title="Xóa tên này đi" style="padding: 5px 10px; font-size: 11px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; box-shadow: 0 1px 2px rgba(0,0,0,0.1); ${!arrTen[i] ? 'opacity: 0.5; pointer-events: none;' : ''}">❌ Xóa</button>
                        </div>
                    </div>
                </td>
                
                <!-- CỘT 3: HÌNH ẢNH & NÚT DI CHUYỂN ẢNH LÊN XUỐNG -->
                <td style="padding: 10px 8px; text-align: center; vertical-align: middle;">
                    <img src="${anhUrl}" style="height: 120px; width: 90px; object-fit: cover; border-radius: 6px; border: 2px solid #ccc; box-shadow: 0 2px 5px rgba(0,0,0,0.15); display: block; margin: 0 auto;">
                    
                    <div style="display: flex; justify-content: center; gap: 5px; margin-top: 8px;">
                        <button onclick="ham_di_chuyen_anh_len(${i})" title="Đẩy ảnh này lên trên" style="padding: 4px 8px; font-size: 11px; background: #e9ecef; color: #495057; border: 1px solid #ced4da; border-radius: 4px; cursor: pointer; box-shadow: 0 1px 2px rgba(0,0,0,0.05); transition: 0.2s;">🔼 Lên</button>
                        <button onclick="ham_di_chuyen_anh_xuong(${i})" title="Kéo ảnh này xuống dưới" style="padding: 4px 8px; font-size: 11px; background: #e9ecef; color: #495057; border: 1px solid #ced4da; border-radius: 4px; cursor: pointer; box-shadow: 0 1px 2px rgba(0,0,0,0.05); transition: 0.2s;">🔽 Xuống</button>
                    </div>
                </td>
                
                <!-- CỘT 4: TÊN FILE ẢNH -->
                <td style="padding: 10px 8px; font-size: 14px; color: #6c757d; vertical-align: middle;">
                    ${tenFile}
                </td>
            </tr>
        `;
    }

    htmlTable += `</tbody></table>`;
    vungPreview.innerHTML = htmlTable;
};



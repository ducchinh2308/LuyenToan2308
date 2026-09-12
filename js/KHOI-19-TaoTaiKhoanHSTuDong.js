// // ==============================================================================
// // KHỐI 19: TIỆN ÍCH - TẠO TÀI KHOẢN HỌC SINH HÀNG LOẠT
// // ==============================================================================

// window.DanhSachTaiKhoanMoiTam = []; // Biến toàn cục lưu danh sách chờ tạo
// window.FileDanhSachTKTam = null;    // 🌟 Biến lưu file danh sách tải từ ổ cứng lên

// // =======================================================
// // HÀM 19.1: MỞ GIAO DIỆN CHÍNH (RÚT GỌN 2 BƯỚC)
// // =======================================================
// // window.ham_19_1_mo_giao_dien_tao_tk_hang_loat = function () {
// //     const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
// //     if (!vungLamViec) return;

// //     vungLamViec.innerHTML = `
// //         <div style="padding: 10px; animation: fadeIn 0.3s ease-in-out;">
            
// //             <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e83e8c; padding-bottom: 10px; margin-bottom: 20px;">
// //                 <h3 style="color: #e83e8c; margin: 0; text-transform: uppercase;">
// //                     📝 Tiện ích: Tạo tài khoản học sinh hàng loạt
// //                 </h3>
// //                 <button onclick="ham_3_1_ve_dashboard_admin()" style="padding: 6px 12px; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">
// //                     ⬅️ Quay lại bảng điều khiển
// //                 </button>
// //             </div>

// //             <!-- BƯỚC 1: NẠP FILE -->
// //             <div style="margin-bottom: 20px; padding: 20px; background: #f8f9fa; border-radius: 8px; border: 1px solid #ced4da; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
// //                 <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
// //                     <h4 style="margin: 0; color: #0056b3;">BƯỚC 1: NẠP FILE DANH SÁCH (EXCEL / WORD)</h4>
// //                     <button onclick="ham_19_3_tai_file_mau_tao_tk()" style="padding: 6px 12px; background: #17a2b8; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 13px; font-weight: bold;">
// //                         📥 Tải file Excel mẫu
// //                     </button>
// //                 </div>
                
// //                 <p style="font-size: 14px; color: #555; margin-top: 0;">Tên tài khoản tự động sinh theo quy tắc: <b>Tên + Chữ cái đầu Họ/Đệm</b>. Mật khẩu mặc định: <b>123456</b>.</p>
                
// //                 <div style="display: flex; gap: 15px; align-items: center; margin-top: 15px;">
// //                     <button onclick="document.getElementById('input-file-tk-hang-loat').click()" style="padding: 10px 20px; background: #28a745; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: 0.2s;">
// //                         💻 Chọn file từ Máy tính
// //                     </button>
// //                     <!-- Input ẩn để duyệt file -->
// //                     <input type="file" id="input-file-tk-hang-loat" accept=".xlsx, .xls, .docx" style="display: none;" onchange="ham_19_4_doc_file_danh_sach(event)">
                    
// //                     <button onclick="ham_19_6_doc_file_tu_drive()" style="padding: 10px 20px; background: #ea4335; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: 0.2s;">
// //                         ☁️ Chọn file từ Google Drive
// //                     </button>
                    
// //                     <span id="ten-file-tk-hien-tai" style="font-size: 14px; font-weight: bold; color: #495057;">Chưa chọn file nào...</span>
// //                 </div>
// //             </div>

// //             <!-- BƯỚC 2: KIỂM TRA DỮ LIỆU -->
// //             <div style="margin-bottom: 20px; padding: 20px; background: #fff; border-radius: 8px; border: 1px solid #dee2e6; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
// //                 <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px dashed #ccc; padding-bottom: 10px; margin-bottom: 15px;">
// //                     <h4 style="margin: 0; color: #6f42c1;">BƯỚC 2: KIỂM TRA TRƯỚC DỮ LIỆU</h4>
// //                     <span style="font-size: 15px; font-weight: bold; color: #dc3545;" id="lbl-tong-so-tk">Tổng số: 0 tài khoản</span>
// //                 </div>
                
// //                 <!-- Bảng Preview dữ liệu (Đã Fix lỗi mất hiển thị top 17 người) -->
// //                 <div id="bang-preview-tk" style="height: 400px; overflow-y: auto; background: #f4f6f9; border: 1px dashed #adb5bd; border-radius: 6px; display: block; padding: 0;">
// //                     <div id="tk-empty-state" style="height: 100%; display: flex; justify-content: center; align-items: center; color: #6c757d; font-style: italic;">
// //                         Bảng dữ liệu sẽ tự động hiển thị ở đây...
// //                     </div>
// //                 </div>
// //             </div>

// //             <!-- NÚT THỰC THI -->
// //             <div style="text-align: right; border-top: 1px solid #eee; padding-top: 20px;">
// //                 <button id="btn-thuc-thi-tao-tk" disabled onclick="ham_19_5_thuc_thi_tao_tai_khoan()" style="padding: 12px 30px; background: #6c757d; color: white; border: none; border-radius: 6px; cursor: not-allowed; font-size: 16px; font-weight: bold; transition: 0.2s;">
// //                     🚀 TIẾN HÀNH TẠO TÀI KHOẢN
// //                 </button>
// //             </div>

// //         </div>
// //     `;
// // };

// // // =======================================================
// // // HÀM 19.1: MỞ GIAO DIỆN CHÍNH (THÊM NÚT TẢI MẪU WORD)
// // // =======================================================
// // window.ham_19_1_mo_giao_dien_tao_tk_hang_loat = function () {
// //     const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
// //     if (!vungLamViec) return;

// //     vungLamViec.innerHTML = `
// //         <div style="padding: 10px; animation: fadeIn 0.3s ease-in-out;">
            
// //             <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e83e8c; padding-bottom: 10px; margin-bottom: 20px;">
// //                 <h3 style="color: #e83e8c; margin: 0; text-transform: uppercase;">
// //                     📝 Tiện ích: Tạo tài khoản học sinh hàng loạt
// //                 </h3>
// //                 <button onclick="ham_3_1_ve_dashboard_admin()" style="padding: 6px 12px; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">
// //                     ⬅️ Quay lại bảng điều khiển
// //                 </button>
// //             </div>

// //             <!-- BƯỚC 1: NẠP FILE -->
// //             <div style="margin-bottom: 20px; padding: 20px; background: #f8f9fa; border-radius: 8px; border: 1px solid #ced4da; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
// //                 <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
// //                     <h4 style="margin: 0; color: #0056b3;">BƯỚC 1: NẠP FILE DANH SÁCH (EXCEL / WORD)</h4>
                    
// //                     <!-- 🌟 2 NÚT TẢI FILE MẪU Ở ĐÂY -->
// //                     <div style="display: flex; gap: 10px;">
// //                         <button onclick="ham_19_9_tai_file_mau_word_tao_tk()" style="padding: 6px 15px; background: #2b579a; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 13px; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
// //                             📄 Tải mẫu Word
// //                         </button>
// //                         <button onclick="ham_19_3_tai_file_mau_tao_tk()" style="padding: 6px 15px; background: #217346; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 13px; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
// //                             📊 Tải mẫu Excel
// //                         </button>
// //                     </div>
// //                 </div>
                
// //                 <p style="font-size: 14px; color: #555; margin-top: 0;">Tên tài khoản tự động sinh theo quy tắc: <b>Tên + Chữ cái đầu Họ/Đệm</b>. Mật khẩu mặc định: <b>123456</b>.</p>
                
// //                 <div style="display: flex; gap: 15px; align-items: center; margin-top: 15px;">
// //                     <button onclick="document.getElementById('input-file-tk-hang-loat').click()" style="padding: 10px 20px; background: #28a745; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: 0.2s;">
// //                         💻 Chọn file từ Máy tính
// //                     </button>
// //                     <!-- Input ẩn để duyệt file -->
// //                     <input type="file" id="input-file-tk-hang-loat" accept=".xlsx, .xls, .docx" style="display: none;" onchange="ham_19_4_doc_file_danh_sach(event)">
                    
// //                     <button onclick="ham_19_6_doc_file_tu_drive()" style="padding: 10px 20px; background: #ea4335; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: 0.2s;">
// //                         ☁️ Chọn file từ Google Drive
// //                     </button>
                    
// //                     <span id="ten-file-tk-hien-tai" style="font-size: 14px; font-weight: bold; color: #495057;">Chưa chọn file nào...</span>
// //                 </div>
// //             </div>

// //             <!-- BƯỚC 2: KIỂM TRA DỮ LIỆU -->
// //             <div style="margin-bottom: 20px; padding: 20px; background: #fff; border-radius: 8px; border: 1px solid #dee2e6; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
// //                 <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px dashed #ccc; padding-bottom: 10px; margin-bottom: 15px;">
// //                     <h4 style="margin: 0; color: #6f42c1;">BƯỚC 2: KIỂM TRA TRƯỚC DỮ LIỆU</h4>
// //                     <span style="font-size: 15px; font-weight: bold; color: #dc3545;" id="lbl-tong-so-tk">Tổng số: 0 tài khoản</span>
// //                 </div>
                
// //                 <!-- Bảng Preview dữ liệu -->
// //                 <div id="bang-preview-tk" style="height: 400px; overflow-y: auto; background: #f4f6f9; border: 1px dashed #adb5bd; border-radius: 6px; display: block; padding: 0;">
// //                     <div id="tk-empty-state" style="height: 100%; display: flex; justify-content: center; align-items: center; color: #6c757d; font-style: italic;">
// //                         Bảng dữ liệu sẽ tự động hiển thị ở đây...
// //                     </div>
// //                 </div>
// //             </div>

// //             <!-- NÚT THỰC THI -->
// //             <div style="text-align: right; border-top: 1px solid #eee; padding-top: 20px;">
// //                 <button id="btn-thuc-thi-tao-tk" disabled onclick="ham_19_5_thuc_thi_tao_tai_khoan()" style="padding: 12px 30px; background: #6c757d; color: white; border: none; border-radius: 6px; cursor: not-allowed; font-size: 16px; font-weight: bold; transition: 0.2s;">
// //                     🚀 TIẾN HÀNH TẠO TÀI KHOẢN
// //                 </button>
// //             </div>

// //         </div>
// //     `;
// // };


// // =======================================================
// // HÀM 19.1: MỞ GIAO DIỆN CHÍNH (THÊM NÚT LƯU DRIVE)
// // =======================================================
// window.ham_19_1_mo_giao_dien_tao_tk_hang_loat = function () {
//     const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
//     if (!vungLamViec) return;

//     vungLamViec.innerHTML = `
//         <div style="padding: 10px; animation: fadeIn 0.3s ease-in-out;">
            
//             <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e83e8c; padding-bottom: 10px; margin-bottom: 20px;">
//                 <h3 style="color: #e83e8c; margin: 0; text-transform: uppercase;">
//                     📝 Tiện ích: Tạo tài khoản học sinh hàng loạt
//                 </h3>
//                 <button onclick="ham_3_1_ve_dashboard_admin()" style="padding: 6px 12px; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">
//                     ⬅️ Quay lại bảng điều khiển
//                 </button>
//             </div>

//             <!-- BƯỚC 1: NẠP FILE -->
//             <div style="margin-bottom: 20px; padding: 20px; background: #f8f9fa; border-radius: 8px; border: 1px solid #ced4da; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
//                 <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
//                     <h4 style="margin: 0; color: #0056b3;">BƯỚC 1: NẠP FILE DANH SÁCH (EXCEL / WORD)</h4>
                    
//                     <div style="display: flex; gap: 10px;">
//                         <button onclick="ham_19_9_tai_file_mau_word_tao_tk()" style="padding: 6px 15px; background: #2b579a; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 13px; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
//                             📄 Tải mẫu Word
//                         </button>
//                         <button onclick="ham_19_3_tai_file_mau_tao_tk()" style="padding: 6px 15px; background: #217346; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 13px; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
//                             📊 Tải mẫu Excel
//                         </button>
//                     </div>
//                 </div>
                
//                 <p style="font-size: 14px; color: #555; margin-top: 0;">Tên tài khoản tự động sinh theo quy tắc: <b>Tên + Chữ cái đầu Họ/Đệm</b>. Mật khẩu mặc định: <b>123456</b>.</p>
                
//                 <div style="display: flex; gap: 15px; align-items: center; margin-top: 15px; flex-wrap: wrap;">
//                     <button onclick="document.getElementById('input-file-tk-hang-loat').click()" style="padding: 10px 20px; background: #28a745; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: 0.2s;">
//                         💻 Chọn file từ Máy tính
//                     </button>
//                     <input type="file" id="input-file-tk-hang-loat" accept=".xlsx, .xls, .docx" style="display: none;" onchange="ham_19_4_doc_file_danh_sach(event)">
                    
//                     <button onclick="ham_19_6_doc_file_tu_drive()" style="padding: 10px 20px; background: #ea4335; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: 0.2s;">
//                         ☁️ Chọn file từ Google Drive
//                     </button>
                    
//                     <span id="ten-file-tk-hien-tai" style="font-size: 14px; font-weight: bold; color: #495057;">Chưa chọn file nào...</span>
//                 </div>
                
//                 <!-- 🌟 NÚT SAO LƯU LÊN DRIVE (BỊ ẨN MẶC ĐỊNH) -->
//                 <button id="btn-up-drive-tk" onclick="ham_19_10_up_file_danh_sach_len_drive()" style="display: none; margin-top: 15px; width: 100%; padding: 10px; background: #fbbc05; color: #000; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
//                     ⬆️ Sao lưu Danh sách này lên Drive
//                 </button>
//             </div>

//             <!-- BƯỚC 2: KIỂM TRA DỮ LIỆU -->
//             <div style="margin-bottom: 20px; padding: 20px; background: #fff; border-radius: 8px; border: 1px solid #dee2e6; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
//                 <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px dashed #ccc; padding-bottom: 10px; margin-bottom: 15px;">
//                     <h4 style="margin: 0; color: #6f42c1;">BƯỚC 2: KIỂM TRA TRƯỚC DỮ LIỆU</h4>
//                     <span style="font-size: 15px; font-weight: bold; color: #dc3545;" id="lbl-tong-so-tk">Tổng số: 0 tài khoản</span>
//                 </div>
                
//                 <div id="bang-preview-tk" style="height: 400px; overflow-y: auto; background: #f4f6f9; border: 1px dashed #adb5bd; border-radius: 6px; display: block; padding: 0;">
//                     <div id="tk-empty-state" style="height: 100%; display: flex; justify-content: center; align-items: center; color: #6c757d; font-style: italic;">
//                         Bảng dữ liệu sẽ tự động hiển thị ở đây...
//                     </div>
//                 </div>
//             </div>

//             <!-- NÚT THỰC THI -->
//             <div style="text-align: right; border-top: 1px solid #eee; padding-top: 20px;">
//                 <button id="btn-thuc-thi-tao-tk" disabled onclick="ham_19_5_thuc_thi_tao_tai_khoan()" style="padding: 12px 30px; background: #6c757d; color: white; border: none; border-radius: 6px; cursor: not-allowed; font-size: 16px; font-weight: bold; transition: 0.2s;">
//                     🚀 TIẾN HÀNH TẠO TÀI KHOẢN
//                 </button>
//             </div>

//         </div>
//     `;
// };





// // =======================================================
// // HÀM 19.2: THUẬT TOÁN TẠO USERNAME TỪ HỌ TÊN (CÓ BẢN DÀI)
// // =======================================================
// window.ham_19_2_tao_cac_phien_ban_username = function (hoTen) {
//     if (!hoTen) return { ngan: "", dai: "" };

//     let str = hoTen.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
//     str = str.replace(/đ/g, "d");
//     str = str.replace(/[^a-z\s]/g, "");

//     let words = str.trim().split(/\s+/);
//     if (words.length === 0) return { ngan: "user", dai: "user" };
//     if (words.length === 1) return { ngan: words[0], dai: words[0] };

//     let tenChinh = words.pop();
//     let cacChuCaiDau = words.map(w => w.charAt(0)).join('');
//     let hoVaDem = words.join('');

//     return {
//         ngan: tenChinh + cacChuCaiDau, // Bản ngắn: annv
//         dai: tenChinh + hoVaDem        // Bản dài: annguyenvan
//     };
// };

// // // =======================================================
// // // HÀM 19.3: TẢI FILE MẪU EXCEL (STT, HỌ VÀ TÊN)
// // // =======================================================
// // window.ham_19_3_tai_file_mau_tao_tk = function () {
// //     const matrixData = [
// //         ['STT', 'HỌ VÀ TÊN'],
// //         [1, 'Nguyễn Văn An'],
// //         [2, 'Trần Thị Bích'],
// //         [3, 'Lê Hoàng Cường']
// //     ];

// //     const ws = XLSX.utils.aoa_to_sheet(matrixData);
// //     ws['A1'].s = { font: { bold: true } };
// //     ws['B1'].s = { font: { bold: true } };
// //     ws['!cols'] = [{ wch: 10 }, { wch: 30 }];

// //     const wb = XLSX.utils.book_new();
// //     XLSX.utils.book_append_sheet(wb, ws, "DanhSach");

// //     XLSX.writeFile(wb, "Mau_Danh_Sach_Tao_Tai_Khoan.xlsx");
// // };

// // // =======================================================
// // // HÀM 19.4: ĐỌC FILE DANH SÁCH TỪ MÁY TÍNH
// // // =======================================================
// // window.ham_19_4_doc_file_danh_sach = async function (event) {
// //     const file = event.target.files[0];
// //     if (!file) return;

// //     document.getElementById('ten-file-tk-hien-tai').innerText = `💻 ${file.name}`;
// //     Swal.fire({ title: 'Đang bóc tách dữ liệu...', didOpen: () => Swal.showLoading() });

// //     try {
// //         const arrayBuffer = await file.arrayBuffer();
// //         let danhSachHoTen = [];

// //         if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
// //             const workbook = XLSX.read(arrayBuffer, { type: 'array' });
// //             const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
// //             const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

// //             jsonData.forEach(row => {
// //                 let text = row.find(cell => typeof cell === 'string' && cell.trim().length > 3);
// //                 if (text && !text.toLowerCase().includes('họ và tên') && !text.toLowerCase().includes('họ tên')) {
// //                     danhSachHoTen.push(text.trim());
// //                 }
// //             });
// //         }
// //         else if (file.name.endsWith('.docx')) {
// //             const result = await mammoth.extractRawText({ arrayBuffer: arrayBuffer });
// //             const lines = result.value.split('\n').filter(line => line.trim().length > 3);
// //             lines.forEach(l => {
// //                 if (!l.toLowerCase().includes('họ và tên') && !l.toLowerCase().includes('họ tên')) {
// //                     danhSachHoTen.push(l.trim());
// //                 }
// //             });
// //         }

// //         ham_19_7_render_bang_preview(danhSachHoTen);
// //         Swal.close();

// //     } catch (error) {
// //         Swal.fire('Lỗi đọc file', error.message, 'error');
// //     }
// //     event.target.value = '';
// // };

// // // =======================================================
// // // HÀM 19.6: LẤY FILE DANH SÁCH TỪ GOOGLE DRIVE
// // // =======================================================
// // window.ham_19_6_doc_file_tu_drive = async function () {
// //     Swal.fire({ title: 'Đang tải cấu trúc Drive...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

// //     let dsThuMucHtml = '<option value="">-- Chọn thư mục chứa file --</option>';
// //     try {
// //         const reqTree = await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
// //             method: "POST", body: JSON.stringify({ action: "lay_cay_thu_muc_anh" })
// //         });
// //         const resTree = await reqTree.json();

// //         if (resTree.status === "success" && resTree.data.length > 0) {
// //             resTree.data.forEach(folder => {
// //                 let level = (folder.name.match(/--- /g) || []).length;
// //                 let cleanName = folder.name.replace(/--- /g, '').replace('⭐ [THƯ MỤC GỐC] ', '');
// //                 let indent = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'.repeat(level);
// //                 let icon = level === 0 ? '⭐ [GỐC] ' : ' ↳ 📁 ';
// //                 dsThuMucHtml += `<option value="${folder.id}">${indent}${icon}${cleanName}</option>`;
// //             });
// //         }
// //     } catch (error) {
// //         dsThuMucHtml = `<option value="">❌ Lỗi tải danh sách (Vui lòng dán link file)</option>`;
// //     }

// //     const { value: fileIdChon } = await Swal.fire({
// //         title: '☁️ Chọn file Danh sách từ Drive',
// //         width: 650,
// //         html: `
// //             <div style="text-align: left; font-size: 14px; color: #495057;">
// //                 <div style="margin-bottom: 15px; display: flex; gap: 20px; justify-content: center; background: #e9ecef; padding: 10px; border-radius: 6px;">
// //                     <label style="cursor:pointer; font-weight:bold; color: #d35400;">
// //                         <input type="radio" name="r_chon_ds2" id="radio-link-ds2" checked> 🔗 Dán link File
// //                     </label>
// //                     <label style="cursor:pointer; font-weight:bold; color:#0056b3;">
// //                         <input type="radio" name="r_chon_ds2" id="radio-tree-ds2"> 📂 Tìm trong thư mục
// //                     </label>
// //                 </div>

// //                 <div id="khu-vuc-link-ds2" style="background: #fff3cd; padding: 15px; border-radius: 6px; border: 1px solid #ffeeba;">
// //                     <p style="margin: 0 0 5px 0; font-weight: bold; color: #856404;">Dán link file Excel / Word:</p>
// //                     <input id="swal-file-link2" class="swal2-input" placeholder="VD: https://docs.google.com/spreadsheets/d/..." style="width: 100%; box-sizing: border-box; margin: 0; font-size: 14px;">
// //                 </div>

// //                 <div id="khu-vuc-tree-ds2" style="display: none; background: #f4f6f9; padding: 15px; border-radius: 6px; border: 1px solid #ced4da;">
// //                     <p style="margin: 0 0 5px 0; font-weight: bold; color: #0056b3;">Bước 1: Chọn thư mục</p>
// //                     <select id="swal-folder-select2" style="width: 100%; padding: 10px; border-radius: 4px; border: 1px solid #adb5bd; outline: none; margin-bottom: 15px;">
// //                         ${dsThuMucHtml}
// //                     </select>
// //                     <p style="margin: 0 0 5px 0; font-weight: bold; color: #28a745;">Bước 2: Bấm chọn file Danh sách</p>
// //                     <select id="swal-file-select2" disabled style="width: 100%; padding: 10px; border-radius: 4px; border: 2px solid #28a745; outline: none; font-weight: bold; background: #e9ecef;">
// //                         <option value="">-- Vui lòng chọn thư mục ở trên trước --</option>
// //                     </select>
// //                 </div>
// //             </div>
// //         `,
// //         showCancelButton: true, confirmButtonColor: '#28a745', confirmButtonText: '📥 Nạp dữ liệu',
// //         didOpen: () => {
// //             document.getElementById('radio-link-ds2').onchange = () => {
// //                 document.getElementById('khu-vuc-link-ds2').style.display = 'block';
// //                 document.getElementById('khu-vuc-tree-ds2').style.display = 'none';
// //             };
// //             document.getElementById('radio-tree-ds2').onchange = () => {
// //                 document.getElementById('khu-vuc-link-ds2').style.display = 'none';
// //                 document.getElementById('khu-vuc-tree-ds2').style.display = 'block';
// //             };

// //             document.getElementById('swal-folder-select2').onchange = async function () {
// //                 const folderId = this.value;
// //                 const fileSelect = document.getElementById('swal-file-select2');

// //                 if (!folderId) {
// //                     fileSelect.innerHTML = '<option value="">-- Vui lòng chọn thư mục ở trên trước --</option>';
// //                     fileSelect.disabled = true; return;
// //                 }

// //                 fileSelect.disabled = true;
// //                 fileSelect.innerHTML = '<option value="">⏳ Đang tìm file Excel/Word...</option>';

// //                 try {
// //                     const reqFiles = await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
// //                         method: "POST", body: JSON.stringify({ action: "lay_danh_sach_file_van_ban", folderId: folderId })
// //                     });
// //                     const resFiles = await reqFiles.json();

// //                     if (resFiles.status === "success" && resFiles.data.length > 0) {
// //                         let fHtml = '<option value="">-- Bấm vào đây để chọn file --</option>';
// //                         resFiles.data.forEach(f => fHtml += `<option value="${f.id}">📄 ${f.name}</option>`);
// //                         fileSelect.innerHTML = fHtml;
// //                         fileSelect.disabled = false;
// //                         fileSelect.style.background = '#fff';
// //                     } else {
// //                         fileSelect.innerHTML = '<option value="">❌ Không có file Excel/Word nào</option>';
// //                     }
// //                 } catch (e) {
// //                     fileSelect.innerHTML = '<option value="">❌ Lỗi kết nối mạng</option>';
// //                 }
// //             };
// //         },
// //         preConfirm: () => {
// //             const isTabLink = document.getElementById('radio-link-ds2').checked;
// //             if (isTabLink) {
// //                 const url = document.getElementById('swal-file-link2').value.trim();
// //                 if (!url) { Swal.showValidationMessage('Vui lòng dán link file!'); return false; }
// //                 let fileId = url;
// //                 const matchDoc = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
// //                 if (matchDoc) fileId = matchDoc[1];
// //                 else if (url.includes('id=')) {
// //                     const matchId = url.match(/id=([a-zA-Z0-9_-]+)/);
// //                     if (matchId) fileId = matchId[1];
// //                 }
// //                 return fileId;
// //             } else {
// //                 const fileId = document.getElementById('swal-file-select2').value;
// //                 if (!fileId) { Swal.showValidationMessage('Thầy chưa bấm chọn file!'); return false; }
// //                 return fileId;
// //             }
// //         }
// //     });

// //     if (!fileIdChon) return;

// //     Swal.fire({ title: 'Đang đọc dữ liệu từ Drive...', didOpen: () => Swal.showLoading() });

// //     try {
// //         const reqContent = await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
// //             method: "POST", body: JSON.stringify({ action: "doc_file_van_ban_drive", fileId: fileIdChon })
// //         });
// //         const resContent = await reqContent.json();

// //         if (resContent.status !== "success") throw new Error(resContent.message);

// //         const selectedFileName = resContent.name;
// //         const binaryString = window.atob(resContent.base64Data);
// //         const bytes = new Uint8Array(binaryString.length);
// //         for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
// //         const arrayBuffer = bytes.buffer;

// //         let danhSachHoTen = [];
// //         if (selectedFileName.endsWith('.xlsx') || selectedFileName.endsWith('.xls')) {
// //             const workbook = XLSX.read(arrayBuffer, { type: 'array' });
// //             const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
// //             const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
// //             jsonData.forEach(row => {
// //                 const text = row.find(cell => typeof cell === 'string' && cell.trim().length > 3);
// //                 if (text && !text.toLowerCase().includes('họ và tên') && !text.toLowerCase().includes('họ tên')) {
// //                     danhSachHoTen.push(text.trim());
// //                 }
// //             });
// //         } else if (selectedFileName.endsWith('.docx')) {
// //             const result = await mammoth.extractRawText({ arrayBuffer: arrayBuffer });
// //             const lines = result.value.split('\n').filter(line => line.trim().length > 3);
// //             lines.forEach(l => {
// //                 if (!l.toLowerCase().includes('họ và tên') && !l.toLowerCase().includes('họ tên')) {
// //                     danhSachHoTen.push(l.trim());
// //                 }
// //             });
// //         }

// //         document.getElementById('ten-file-tk-hien-tai').innerText = `☁️ ${selectedFileName}`;
// //         ham_19_7_render_bang_preview(danhSachHoTen);
// //         Swal.close();

// //     } catch (error) {
// //         Swal.fire('Lỗi truy cập File', 'Không thể đọc file từ Drive. Hãy chắc chắn file được cấp quyền "Bất kỳ ai có liên kết". Chi tiết: ' + error.message, 'error');
// //     }
// // };

// // =======================================================
// // HÀM 19.3: TẢI FILE MẪU EXCEL (STT, HỌ TÊN, MÃ LỚP)
// // =======================================================
// window.ham_19_3_tai_file_mau_tao_tk = function () {
//     const matrixData = [
//         ['STT', 'HỌ VÀ TÊN', 'MÃ LỚP'],
//         [1, 'Nguyễn Văn An', '12A1'],
//         [2, 'Trần Thị Bích', '12A1'],
//         [3, 'Lê Hoàng Cường', '12A2']
//     ];

//     const ws = XLSX.utils.aoa_to_sheet(matrixData);
//     ws['A1'].s = { font: { bold: true } };
//     ws['B1'].s = { font: { bold: true } };
//     ws['C1'].s = { font: { bold: true } };
//     ws['!cols'] = [{ wch: 10 }, { wch: 30 }, { wch: 15 }];

//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "DanhSach");

//     XLSX.writeFile(wb, "Mau_Danh_Sach_Tao_Tai_Khoan.xlsx");
// };
// // =======================================================
// // HÀM 19.4: ĐỌC FILE DANH SÁCH TỪ MÁY TÍNH
// // =======================================================
// window.ham_19_4_doc_file_danh_sach = async function (event) {
//     const file = event.target.files[0];
//     if (!file) return;

//     window.FileDanhSachTKTam = file; // 🌟 Lưu file vào biến tạm để lát upload
//     document.getElementById('ten-file-tk-hien-tai').innerText = `💻 ${file.name}`;

//     // 🌟 Hiện nút sao lưu Drive
//     const btnUp = document.getElementById('btn-up-drive-tk');
//     if (btnUp) {
//         btnUp.style.display = 'block';
//         btnUp.disabled = false;
//         btnUp.innerHTML = '⬆️ Sao lưu Danh sách này lên Drive';
//     }

//     Swal.fire({ title: 'Đang bóc tách dữ liệu...', didOpen: () => Swal.showLoading() });

//     try {
//         const arrayBuffer = await file.arrayBuffer();
//         let danhSachHoTen = [];

//         if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
//             const workbook = XLSX.read(arrayBuffer, { type: 'array' });
//             const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
//             const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

//             jsonData.forEach(row => {
//                 let text = row.find(cell => typeof cell === 'string' && cell.trim().length > 3);
//                 if (text && !text.toLowerCase().includes('họ và tên') && !text.toLowerCase().includes('họ tên')) {
//                     danhSachHoTen.push(text.trim());
//                 }
//             });
//         }
//         else if (file.name.endsWith('.docx')) {
//             const result = await mammoth.extractRawText({ arrayBuffer: arrayBuffer });
//             const lines = result.value.split('\n').filter(line => line.trim().length > 3);
//             lines.forEach(l => {
//                 if (!l.toLowerCase().includes('họ và tên') && !l.toLowerCase().includes('họ tên')) {
//                     danhSachHoTen.push(l.trim());
//                 }
//             });
//         }

//         ham_19_7_render_bang_preview(danhSachHoTen);
//         Swal.close();

//     } catch (error) {
//         Swal.fire('Lỗi đọc file', error.message, 'error');
//     }
//     event.target.value = '';
// };

// // =======================================================
// // HÀM 19.6: LẤY FILE DANH SÁCH TỪ GOOGLE DRIVE
// // =======================================================
// window.ham_19_6_doc_file_tu_drive = async function () {
//     Swal.fire({ title: 'Đang tải cấu trúc Drive...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

//     let dsThuMucHtml = '<option value="">-- Chọn thư mục chứa file --</option>';
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
//         dsThuMucHtml = `<option value="">❌ Lỗi tải danh sách (Vui lòng dán link file)</option>`;
//     }

//     const { value: fileIdChon } = await Swal.fire({
//         title: '☁️ Chọn file Danh sách từ Drive',
//         width: 650,
//         html: `
//             <div style="text-align: left; font-size: 14px; color: #495057;">
//                 <div style="margin-bottom: 15px; display: flex; gap: 20px; justify-content: center; background: #e9ecef; padding: 10px; border-radius: 6px;">
//                     <label style="cursor:pointer; font-weight:bold; color: #d35400;">
//                         <input type="radio" name="r_chon_ds2" id="radio-link-ds2" checked> 🔗 Dán link File
//                     </label>
//                     <label style="cursor:pointer; font-weight:bold; color:#0056b3;">
//                         <input type="radio" name="r_chon_ds2" id="radio-tree-ds2"> 📂 Tìm trong thư mục
//                     </label>
//                 </div>

//                 <div id="khu-vuc-link-ds2" style="background: #fff3cd; padding: 15px; border-radius: 6px; border: 1px solid #ffeeba;">
//                     <p style="margin: 0 0 5px 0; font-weight: bold; color: #856404;">Dán link file Excel / Word:</p>
//                     <input id="swal-file-link2" class="swal2-input" placeholder="VD: https://docs.google.com/spreadsheets/d/..." style="width: 100%; box-sizing: border-box; margin: 0; font-size: 14px;">
//                 </div>

//                 <div id="khu-vuc-tree-ds2" style="display: none; background: #f4f6f9; padding: 15px; border-radius: 6px; border: 1px solid #ced4da;">
//                     <p style="margin: 0 0 5px 0; font-weight: bold; color: #0056b3;">Bước 1: Chọn thư mục</p>
//                     <select id="swal-folder-select2" style="width: 100%; padding: 10px; border-radius: 4px; border: 1px solid #adb5bd; outline: none; margin-bottom: 15px;">
//                         ${dsThuMucHtml}
//                     </select>
//                     <p style="margin: 0 0 5px 0; font-weight: bold; color: #28a745;">Bước 2: Bấm chọn file Danh sách</p>
//                     <select id="swal-file-select2" disabled style="width: 100%; padding: 10px; border-radius: 4px; border: 2px solid #28a745; outline: none; font-weight: bold; background: #e9ecef;">
//                         <option value="">-- Vui lòng chọn thư mục ở trên trước --</option>
//                     </select>
//                 </div>
//             </div>
//         `,
//         showCancelButton: true, confirmButtonColor: '#28a745', confirmButtonText: '📥 Nạp dữ liệu',
//         didOpen: () => {
//             document.getElementById('radio-link-ds2').onchange = () => {
//                 document.getElementById('khu-vuc-link-ds2').style.display = 'block';
//                 document.getElementById('khu-vuc-tree-ds2').style.display = 'none';
//             };
//             document.getElementById('radio-tree-ds2').onchange = () => {
//                 document.getElementById('khu-vuc-link-ds2').style.display = 'none';
//                 document.getElementById('khu-vuc-tree-ds2').style.display = 'block';
//             };

//             document.getElementById('swal-folder-select2').onchange = async function () {
//                 const folderId = this.value;
//                 const fileSelect = document.getElementById('swal-file-select2');

//                 if (!folderId) {
//                     fileSelect.innerHTML = '<option value="">-- Vui lòng chọn thư mục ở trên trước --</option>';
//                     fileSelect.disabled = true; return;
//                 }

//                 fileSelect.disabled = true;
//                 fileSelect.innerHTML = '<option value="">⏳ Đang tìm file Excel/Word...</option>';

//                 try {
//                     const reqFiles = await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
//                         method: "POST", body: JSON.stringify({ action: "lay_danh_sach_file_van_ban", folderId: folderId })
//                     });
//                     const resFiles = await reqFiles.json();

//                     if (resFiles.status === "success" && resFiles.data.length > 0) {
//                         let fHtml = '<option value="">-- Bấm vào đây để chọn file --</option>';
//                         resFiles.data.forEach(f => fHtml += `<option value="${f.id}">📄 ${f.name}</option>`);
//                         fileSelect.innerHTML = fHtml;
//                         fileSelect.disabled = false;
//                         fileSelect.style.background = '#fff';
//                     } else {
//                         fileSelect.innerHTML = '<option value="">❌ Không có file Excel/Word nào</option>';
//                     }
//                 } catch (e) {
//                     fileSelect.innerHTML = '<option value="">❌ Lỗi kết nối mạng</option>';
//                 }
//             };
//         },
//         preConfirm: () => {
//             const isTabLink = document.getElementById('radio-link-ds2').checked;
//             if (isTabLink) {
//                 const url = document.getElementById('swal-file-link2').value.trim();
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
//                 const fileId = document.getElementById('swal-file-select2').value;
//                 if (!fileId) { Swal.showValidationMessage('Thầy chưa bấm chọn file!'); return false; }
//                 return fileId;
//             }
//         }
//     });

//     if (!fileIdChon) return;

//     Swal.fire({ title: 'Đang đọc dữ liệu từ Drive...', didOpen: () => Swal.showLoading() });

//     try {
//         const reqContent = await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
//             method: "POST", body: JSON.stringify({ action: "doc_file_van_ban_drive", fileId: fileIdChon })
//         });
//         const resContent = await reqContent.json();

//         if (resContent.status !== "success") throw new Error(resContent.message);

//         const selectedFileName = resContent.name;
//         const binaryString = window.atob(resContent.base64Data);
//         const bytes = new Uint8Array(binaryString.length);
//         for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
//         const arrayBuffer = bytes.buffer;

//         let danhSachHoTen = [];
//         if (selectedFileName.endsWith('.xlsx') || selectedFileName.endsWith('.xls')) {
//             const workbook = XLSX.read(arrayBuffer, { type: 'array' });
//             const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
//             const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
//             jsonData.forEach(row => {
//                 const text = row.find(cell => typeof cell === 'string' && cell.trim().length > 3);
//                 if (text && !text.toLowerCase().includes('họ và tên') && !text.toLowerCase().includes('họ tên')) {
//                     danhSachHoTen.push(text.trim());
//                 }
//             });
//         } else if (selectedFileName.endsWith('.docx')) {
//             const result = await mammoth.extractRawText({ arrayBuffer: arrayBuffer });
//             const lines = result.value.split('\n').filter(line => line.trim().length > 3);
//             lines.forEach(l => {
//                 if (!l.toLowerCase().includes('họ và tên') && !l.toLowerCase().includes('họ tên')) {
//                     danhSachHoTen.push(l.trim());
//                 }
//             });
//         }

//         document.getElementById('ten-file-tk-hien-tai').innerText = `☁️ ${selectedFileName}`;

//         // 🌟 Ẩn nút sao lưu vì file đã ở trên Drive rồi
//         const btnUp = document.getElementById('btn-up-drive-tk');
//         if (btnUp) btnUp.style.display = 'none';

//         ham_19_7_render_bang_preview(danhSachHoTen);
//         Swal.close();

//     } catch (error) {
//         Swal.fire('Lỗi truy cập File', 'Không thể đọc file từ Drive. Hãy chắc chắn file được cấp quyền "Bất kỳ ai có liên kết". Chi tiết: ' + error.message, 'error');
//     }
// };



// // =======================================================
// // HÀM 19.7: KHỞI TẠO MẢNG DỮ LIỆU TỪ DANH SÁCH FILE NẠP VÀO
// // =======================================================
// window.ham_19_7_render_bang_preview = function (danhSachHoTen) {
//     if (danhSachHoTen.length === 0) throw new Error("Không tìm thấy dữ liệu Họ Tên hợp lệ trong file!");

//     let usernameMap = {};
//     window.DanhSachTaiKhoanMoiTam = [];

//     danhSachHoTen.forEach((hoTen, index) => {
//         let phienBan = ham_19_2_tao_cac_phien_ban_username(hoTen);
//         let finalUsername = phienBan.ngan;

//         if (usernameMap[phienBan.ngan] !== undefined) {
//             finalUsername = phienBan.dai;
//             if (usernameMap[phienBan.dai] !== undefined) {
//                 usernameMap[phienBan.dai]++;
//                 finalUsername = phienBan.dai + usernameMap[phienBan.dai];
//             } else {
//                 usernameMap[phienBan.dai] = 0;
//             }
//         } else {
//             usernameMap[phienBan.ngan] = 0;
//         }

//         // Lưu vào mảng tạm
//         window.DanhSachTaiKhoanMoiTam.push({
//             stt: index + 1,
//             ten: hoTen,
//             taiKhoan: finalUsername,
//             matKhau: "123456"
//         });
//     });

//     // Sau khi nạp mảng xong thì gọi hàm vẽ bảng
//     ham_19_8_ve_lai_bang_preview();
// };


// // =======================================================
// // HÀM 19.8: VẼ LẠI BẢNG GIAO DIỆN (CÓ NÚT THÊM / XÓA)
// // =======================================================
// window.ham_19_8_ve_lai_bang_preview = function () {
//     let htmlTable = `
//         <table style="width: 100%; border-collapse: collapse; font-size: 14px; background: white;">
//             <thead style="position: sticky; top: 0; background: #e9ecef; box-shadow: 0 2px 4px rgba(0,0,0,0.1); z-index: 10;">
//                 <tr>
//                     <th style="padding: 10px; border-bottom: 2px solid #dee2e6; text-align: center; width: 50px;">STT</th>
                    
//                     <!-- Đã bóp hẹp bề ngang cột Họ Tên -->
//                     <th style="padding: 10px; border-bottom: 2px solid #dee2e6; text-align: left; width: 30%;">👤 Họ và Tên</th>
                    
//                     <!-- Cột thao tác Thêm / Xóa -->
//                     <th style="padding: 10px; border-bottom: 2px solid #dee2e6; text-align: center; width: 130px; color: #28a745;">⚙️ Thao Tác</th>
                    
//                     <th style="padding: 10px; border-bottom: 2px solid #dee2e6; text-align: left; color: #d35400;">🔑 Tên Đăng Nhập</th>
//                     <th style="padding: 10px; border-bottom: 2px solid #dee2e6; text-align: left; width: 100px;">🔒 Mật khẩu</th>
//                 </tr>
//             </thead>
//             <tbody>
//     `;

//     window.DanhSachTaiKhoanMoiTam.forEach((tk, index) => {
//         htmlTable += `
//             <tr style="border-bottom: 1px solid #eee; transition: 0.2s;" onmouseover="this.style.background='#f8f9fa'" onmouseout="this.style.background='transparent'">
//                 <td style="padding: 8px 10px; text-align: center; font-weight: bold; color: #6c757d;">${index + 1}</td>
                
//                 <td style="padding: 8px 10px; font-weight: bold; color: #0056b3;">${tk.ten}</td>
                
//                 <!-- Bố trí 2 nút chức năng vào hàng -->
//                 <td style="padding: 8px 10px; text-align: center;">
//                     <div style="display: flex; gap: 5px; justify-content: center;">
//                         <button onclick="ham_19_them_tai_khoan(${index})" title="Chèn thêm học sinh mới vào vị trí này" style="padding: 4px 8px; font-size: 11px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; box-shadow: 0 1px 2px rgba(0,0,0,0.1);">➕ Thêm</button>
//                         <button onclick="ham_19_xoa_tai_khoan(${index})" title="Xóa học sinh này khỏi danh sách tạo" style="padding: 4px 8px; font-size: 11px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; box-shadow: 0 1px 2px rgba(0,0,0,0.1);">❌ Xóa</button>
//                     </div>
//                 </td>
                
//                 <td style="padding: 8px 10px; font-weight: bold; color: #d35400; background: #fff3cd;">${tk.taiKhoan}</td>
//                 <td style="padding: 8px 10px; color: #28a745; font-weight: bold; font-family: monospace;">${tk.matKhau}</td>
//             </tr>
//         `;
//     });

//     htmlTable += `</tbody></table>`;

//     const bangPreview = document.getElementById('bang-preview-tk');
//     if (bangPreview) bangPreview.innerHTML = htmlTable;

//     const lblTongSo = document.getElementById('lbl-tong-so-tk');
//     if (lblTongSo) lblTongSo.innerText = `Tổng số: ${window.DanhSachTaiKhoanMoiTam.length} tài khoản hợp lệ`;

//     // Kiểm tra để bật/tắt nút Thực thi
//     const btnThucThi = document.getElementById('btn-thuc-thi-tao-tk');
//     if (btnThucThi) {
//         if (window.DanhSachTaiKhoanMoiTam.length > 0) {
//             btnThucThi.disabled = false;
//             btnThucThi.style.background = '#007bff';
//             btnThucThi.style.cursor = 'pointer';
//         } else {
//             btnThucThi.disabled = true;
//             btnThucThi.style.background = '#6c757d';
//             btnThucThi.style.cursor = 'not-allowed';
//             if (bangPreview) bangPreview.innerHTML = `<div style="height: 100%; display: flex; justify-content: center; align-items: center; color: #dc3545; font-weight: bold; font-style: italic;">❌ Bảng dữ liệu đã bị xóa trống...</div>`;
//         }
//     }
// };

// // =======================================================
// // CÁC HÀM XỬ LÝ CHÈN / XÓA TÀI KHOẢN TẠI CHỖ
// // =======================================================
// window.ham_19_xoa_tai_khoan = function (index) {
//     // Xóa phần tử tại vị trí index
//     window.DanhSachTaiKhoanMoiTam.splice(index, 1);

//     // Vẽ lại bảng HTML
//     window.ham_19_8_ve_lai_bang_preview();
// };

// window.ham_19_them_tai_khoan = async function (index) {
//     const { value: tenMoi } = await Swal.fire({
//         title: '➕ Chèn thêm tài khoản',
//         html: `<p style="font-size: 14px;">Nhập Họ và Tên học sinh cần thêm vào <b>vị trí số ${index + 1}</b>:</p>`,
//         input: 'text',
//         inputPlaceholder: 'VD: Nguyễn Văn A...',
//         showCancelButton: true,
//         confirmButtonColor: '#28a745',
//         cancelButtonColor: '#6c757d',
//         confirmButtonText: 'Chèn vào danh sách',
//         cancelButtonText: 'Hủy',
//         inputValidator: (value) => {
//             if (!value || value.trim() === '') return 'Thầy/Cô chưa nhập tên học sinh!';
//         }
//     });

//     if (tenMoi) {
//         const hoTen = tenMoi.trim();

//         // Trích xuất danh sách username hiện có để kiểm tra trùng lặp
//         let danhSachUsernames = window.DanhSachTaiKhoanMoiTam.map(tk => tk.taiKhoan);

//         // Gen username cho học sinh mới
//         let phienBan = ham_19_2_tao_cac_phien_ban_username(hoTen);
//         let finalUsername = phienBan.ngan;

//         // Nếu trùng bản ngắn
//         if (danhSachUsernames.includes(finalUsername)) {
//             finalUsername = phienBan.dai; // Lấy bản dài

//             // Nếu vẫn trùng bản dài, thêm số ở đuôi
//             let counter = 1;
//             let tempUsername = finalUsername;
//             while (danhSachUsernames.includes(tempUsername)) {
//                 tempUsername = finalUsername + counter;
//                 counter++;
//             }
//             finalUsername = tempUsername;
//         }

//         // Chèn vào vị trí index (đẩy các người phía dưới xuống)
//         window.DanhSachTaiKhoanMoiTam.splice(index, 0, {
//             stt: 0, // STT sẽ được đánh lại tự động khi vẽ bảng
//             ten: hoTen,
//             taiKhoan: finalUsername,
//             matKhau: "123456"
//         });

//         // Vẽ lại bảng HTML
//         window.ham_19_8_ve_lai_bang_preview();

//         // Thông báo nhẹ
//         const Toast = Swal.mixin({ toast: true, position: 'top-end', showConfirmButton: false, timer: 1500 });
//         Toast.fire({ icon: 'success', title: `Đã chèn: ${hoTen}` });
//     }
// };

// // =======================================================
// // HÀM 19.5: THỰC THI CHÈN TÀI KHOẢN LÊN SUPABASE
// // =======================================================
// window.ham_19_5_thuc_thi_tao_tai_khoan = async function () {
//     const dsTaiKhoan = window.DanhSachTaiKhoanMoiTam;
//     if (!dsTaiKhoan || dsTaiKhoan.length === 0) return;

//     const confirm = await Swal.fire({
//         title: 'Chốt tạo tài khoản?',
//         text: `Hệ thống sẽ tạo tự động ${dsTaiKhoan.length} tài khoản học sinh lên cơ sở dữ liệu.`,
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#007bff',
//         cancelButtonColor: '#6c757d',
//         confirmButtonText: '🚀 Bắt đầu tạo!'
//     });

//     if (!confirm.isConfirmed) return;

//     Swal.fire({
//         title: 'Đang đẩy dữ liệu lên hệ thống...',
//         html: 'Đã tạo: <b>0</b> / ' + dsTaiKhoan.length,
//         allowOutsideClick: false,
//         didOpen: () => Swal.showLoading()
//     });

//     let thanhCong = 0;

//     const payloadInsert = dsTaiKhoan.map(hs => {
//         return {
//             uid: crypto.randomUUID(),
//             ten: hs.ten,
//             sdt: hs.taiKhoan,
//             mat_khau: hs.matKhau,
//             vai_tro: 'hocsinh',
//             trang_thai: 1,
//             khoi_lop: '',
//             tinh: '',
//             truong: '',
//             danh_sach_ma_lop: [],
//             ngay_tham_gia: new Date().toISOString()
//         };
//     });

//     try {
//         const { error } = await _supabase.from('hoc_sinh').insert(payloadInsert);
//         if (error) throw error;
//         thanhCong = dsTaiKhoan.length;
//     } catch (error) {
//         console.error(error);
//     }

//     if (thanhCong > 0) {
//         Swal.fire({
//             icon: 'success',
//             title: 'Hoàn tất!',
//             text: `Đã tạo thành công ${thanhCong} tài khoản học sinh.`,
//             confirmButtonColor: '#28a745'
//         });

//         window.DanhSachTaiKhoanMoiTam = [];
//         window.ham_19_8_ve_lai_bang_preview(); // Vẽ lại bảng trống
//         document.getElementById('ten-file-tk-hien-tai').innerText = `Chưa chọn file nào...`;

//     } else {
//         Swal.fire('Thất bại', `Đã xảy ra lỗi khi đẩy dữ liệu lên cơ sở dữ liệu. Vui lòng kiểm tra lại.`, 'error');
//     }
// };


// // // =======================================================
// // // HÀM 19.9: TẠO VÀ TẢI FILE MẪU WORD (.DOCX THẬT)
// // // =======================================================
// // window.ham_19_9_tai_file_mau_word_tao_tk = async function () {
// //     // 1. Tự động nạp thư viện docx.js nếu chưa có
// //     if (typeof window.docx === 'undefined') {
// //         Swal.fire({
// //             title: 'Đang chuẩn bị...',
// //             text: 'Đang nạp bộ công cụ tạo file Word (.docx), vui lòng đợi giây lát...',
// //             allowOutsideClick: false,
// //             didOpen: () => Swal.showLoading()
// //         });

// //         let script = document.createElement('script');
// //         script.src = 'https://cdn.jsdelivr.net/npm/docx@7.8.2/build/index.js';
// //         script.onload = () => {
// //             Swal.close();
// //             window.ham_19_9_tai_file_mau_word_tao_tk(); // Tự động gọi lại hàm sau khi nạp xong thư viện
// //         };
// //         document.head.appendChild(script);
// //         return;
// //     }

// //     // 2. Lấy các công cụ từ thư viện
// //     const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType } = window.docx;

// //     // Hàm phụ trợ: Tạo 1 dòng trong bảng
// //     const taoDongBang = (stt, ten, isHeader = false) => {
// //         return new TableRow({
// //             children: [
// //                 new TableCell({
// //                     children: [
// //                         new Paragraph({
// //                             children: [new TextRun({ text: stt.toString(), bold: isHeader })],
// //                             alignment: AlignmentType.CENTER
// //                         })
// //                     ],
// //                     width: { size: 15, type: WidthType.PERCENTAGE },
// //                     shading: isHeader ? { fill: "F2F2F2" } : undefined
// //                 }),
// //                 new TableCell({
// //                     children: [
// //                         new Paragraph({
// //                             children: [new TextRun({ text: ten.toString(), bold: isHeader })]
// //                         })
// //                     ],
// //                     width: { size: 85, type: WidthType.PERCENTAGE },
// //                     shading: isHeader ? { fill: "F2F2F2" } : undefined
// //                 })
// //             ]
// //         });
// //     };

// //     // Chuẩn bị dữ liệu các dòng
// //     const tableRows = [
// //         taoDongBang("STT", "HỌ VÀ TÊN", true),
// //         taoDongBang(1, "Nguyễn Văn An"),
// //         taoDongBang(2, "Trần Thị Bích"),
// //         taoDongBang(3, "Lê Hoàng Cường"),
// //         taoDongBang(4, ""),
// //         taoDongBang(5, ""),
// //         taoDongBang(6, ""),
// //         taoDongBang(7, ""),
// //         taoDongBang(8, ""),
// //         taoDongBang(9, ""),
// //         taoDongBang(10, "")
// //     ];

// //     // 3. Khởi tạo cấu trúc file .docx
// //     const doc = new Document({
// //         sections: [{
// //             properties: {},
// //             children: [
// //                 // Tiêu đề
// //                 new Paragraph({
// //                     children: [
// //                         new TextRun({ text: "DANH SÁCH HỌC SINH TẠO TÀI KHOẢN", bold: true, size: 32 })
// //                     ],
// //                     alignment: AlignmentType.CENTER,
// //                     spacing: { after: 200 }
// //                 }),
// //                 // Lời ghi chú
// //                 new Paragraph({
// //                     children: [
// //                         new TextRun({
// //                             text: "(Thầy/Cô nhập trực tiếp hoặc Copy/Paste danh sách học sinh vào bảng bên dưới)",
// //                             italics: true,
// //                             color: "555555"
// //                         })
// //                     ],
// //                     alignment: AlignmentType.CENTER,
// //                     spacing: { after: 300 }
// //                 }),
// //                 // Bảng dữ liệu
// //                 new Table({
// //                     rows: tableRows,
// //                     width: { size: 100, type: WidthType.PERCENTAGE }
// //                 })
// //             ]
// //         }]
// //     });

// //     // 4. Đóng gói và xuất file
// //     Packer.toBlob(doc).then(blob => {
// //         const url = URL.createObjectURL(blob);
// //         const a = document.createElement('a');
// //         a.href = url;
// //         a.download = 'Mau_Danh_Sach_Tao_Tai_Khoan.docx';
// //         document.body.appendChild(a);
// //         a.click();
// //         document.body.removeChild(a);
// //         URL.revokeObjectURL(url);
// //     });
// // };

// // =======================================================
// // HÀM 19.9: TẠO VÀ TẢI FILE MẪU WORD (.DOCX THẬT - CÓ MÃ LỚP)
// // =======================================================
// window.ham_19_9_tai_file_mau_word_tao_tk = async function () {
//     if (typeof window.docx === 'undefined') {
//         Swal.fire({ title: 'Đang chuẩn bị...', text: 'Đang nạp bộ công cụ Word...', didOpen: () => Swal.showLoading() });
//         let script = document.createElement('script');
//         script.src = 'https://cdn.jsdelivr.net/npm/docx@7.8.2/build/index.js';
//         script.onload = () => { Swal.close(); window.ham_19_9_tai_file_mau_word_tao_tk(); };
//         document.head.appendChild(script);
//         return;
//     }

//     const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType } = window.docx;

//     const taoDongBang = (stt, ten, maLop, isHeader = false) => {
//         return new TableRow({
//             children: [
//                 new TableCell({
//                     children: [new Paragraph({ children: [new TextRun({ text: stt.toString(), bold: isHeader })], alignment: AlignmentType.CENTER })],
//                     width: { size: 10, type: WidthType.PERCENTAGE }, shading: isHeader ? { fill: "F2F2F2" } : undefined
//                 }),
//                 new TableCell({
//                     children: [new Paragraph({ children: [new TextRun({ text: ten.toString(), bold: isHeader })] })],
//                     width: { size: 60, type: WidthType.PERCENTAGE }, shading: isHeader ? { fill: "F2F2F2" } : undefined
//                 }),
//                 new TableCell({
//                     children: [new Paragraph({ children: [new TextRun({ text: maLop.toString(), bold: isHeader })], alignment: AlignmentType.CENTER })],
//                     width: { size: 30, type: WidthType.PERCENTAGE }, shading: isHeader ? { fill: "F2F2F2" } : undefined
//                 })
//             ]
//         });
//     };

//     const tableRows = [
//         taoDongBang("STT", "HỌ VÀ TÊN", "MÃ LỚP", true),
//         taoDongBang(1, "Nguyễn Văn An", "12A1"),
//         taoDongBang(2, "Trần Thị Bích", "12A1"),
//         taoDongBang(3, "Lê Hoàng Cường", "12A2"),
//         taoDongBang(4, "", ""), taoDongBang(5, "", ""), taoDongBang(6, "", "")
//     ];

//     const doc = new Document({
//         sections: [{
//             children: [
//                 new Paragraph({ children: [new TextRun({ text: "DANH SÁCH HỌC SINH TẠO TÀI KHOẢN", bold: true, size: 32 })], alignment: AlignmentType.CENTER, spacing: { after: 200 } }),
//                 new Paragraph({ children: [new TextRun({ text: "(Thầy/Cô nhập trực tiếp hoặc Copy/Paste danh sách học sinh vào bảng bên dưới)", italics: true, color: "555555" })], alignment: AlignmentType.CENTER, spacing: { after: 300 } }),
//                 new Table({ rows: tableRows, width: { size: 100, type: WidthType.PERCENTAGE } })
//             ]
//         }]
//     });

//     Packer.toBlob(doc).then(blob => {
//         const url = URL.createObjectURL(blob);
//         const a = document.createElement('a'); a.href = url; a.download = 'Mau_Danh_Sach_Tao_Tai_Khoan.docx';
//         document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
//     });
// };


// // =======================================================
// // HÀM 19.10: SAO LƯU FILE DANH SÁCH LÊN G.DRIVE (CHỌN THƯ MỤC)
// // =======================================================
// window.ham_19_10_up_file_danh_sach_len_drive = async function () {
//     if (!window.FileDanhSachTKTam) return;

//     Swal.fire({ title: 'Đang tải cây thư mục...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

//     let dsThuMucHtml = '<option value="">-- Chọn vị trí lưu --</option>';
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
//         dsThuMucHtml = `<option value="">❌ Lỗi tải danh sách</option>`;
//     }

//     const { value: thongTinDich } = await Swal.fire({
//         title: '📁 Nơi lưu file Danh Sách',
//         width: 600,
//         html: `
//             <div style="text-align: left; font-size: 14px;">
//                 <div style="margin-bottom: 15px; display: flex; gap: 20px; justify-content: center; background: #e9ecef; padding: 10px; border-radius: 6px;">
//                     <label style="cursor:pointer; font-weight:bold; color: #0056b3;">
//                         <input type="radio" name="r_luu_ds_tk" id="radio-co-san-ds-tk" checked> 📂 Thư mục có sẵn
//                     </label>
//                     <label style="cursor:pointer; font-weight:bold; color:#28a745;">
//                         <input type="radio" name="r_luu_ds_tk" id="radio-tao-moi-ds-tk"> ➕ Tạo thư mục mới
//                     </label>
//                 </div>

//                 <div id="khu-vuc-co-san-ds-tk" style="background: #f4f6f9; padding: 15px; border-radius: 6px; border: 1px solid #ced4da;">
//                     <p style="margin: 0 0 5px 0; font-weight: bold; color: #0056b3;">Chọn thư mục lưu file:</p>
//                     <select id="swal-select-folder-ds-tk" style="width: 100%; padding: 10px; border-radius: 4px; border: 2px solid #17a2b8; outline: none; margin-bottom: 15px; font-weight: bold;">
//                         ${dsThuMucHtml}
//                     </select>
//                 </div>

//                 <div id="khu-vuc-tao-moi-ds-tk" style="display: none; background: #f8fff9; padding: 15px; border-radius: 6px; border: 1px dashed #28a745;">
//                     <p style="margin: 0 0 5px 0; font-weight:bold; color: #28a745;">Chọn vị trí đặt thư mục mới:</p>
//                     <select id="swal-parent-select-ds-tk" style="width: 100%; padding: 10px; margin-bottom: 15px; font-weight: bold;">
//                         ${dsThuMucHtml}
//                     </select>
//                     <p style="margin: 0 0 5px 0; font-weight:bold;">Tên thư mục mới (*):</p>
//                     <input id="swal-new-folder-name-ds-tk" class="swal2-input" placeholder="VD: Danh_Sach_12A1" style="width: 100%; margin: 0; box-sizing: border-box;">
//                 </div>
//             </div>
//         `,
//         showCancelButton: true, confirmButtonColor: '#fbbc05', confirmButtonText: '🚀 Lưu lên Drive',
//         didOpen: () => {
//             document.getElementById('radio-co-san-ds-tk').onchange = () => {
//                 document.getElementById('khu-vuc-co-san-ds-tk').style.display = 'block';
//                 document.getElementById('khu-vuc-tao-moi-ds-tk').style.display = 'none';
//             };
//             document.getElementById('radio-tao-moi-ds-tk').onchange = () => {
//                 document.getElementById('khu-vuc-co-san-ds-tk').style.display = 'none';
//                 document.getElementById('khu-vuc-tao-moi-ds-tk').style.display = 'block';
//             };
//         },
//         preConfirm: () => {
//             const isTaoMoi = document.getElementById('radio-tao-moi-ds-tk').checked;
//             if (isTaoMoi) {
//                 const tenMoi = document.getElementById('swal-new-folder-name-ds-tk').value.trim();
//                 const parentId = document.getElementById('swal-parent-select-ds-tk').value;
//                 if (!parentId || !tenMoi) { Swal.showValidationMessage('Vui lòng nhập đủ thông tin!'); return false; }
//                 return { mode: 'tao_moi', folderName: tenMoi, parentId: parentId };
//             } else {
//                 const selectedId = document.getElementById('swal-select-folder-ds-tk').value;
//                 if (!selectedId) { Swal.showValidationMessage('Vui lòng chọn thư mục!'); return false; }
//                 return { mode: 'co_san', id: selectedId };
//             }
//         }
//     });

//     if (!thongTinDich) return;

//     const btn = document.getElementById('btn-up-drive-tk');
//     btn.disabled = true;
//     btn.innerHTML = '⏳ Đang đồng bộ...';

//     const fileToBase64 = (file) => new Promise((resolve) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onload = () => resolve(reader.result.split(',')[1]);
//     });

//     try {
//         let folderIdUpload = "";
//         Swal.fire({ title: 'Đang xử lý...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

//         if (thongTinDich.mode === 'tao_moi') {
//             Swal.update({ title: 'Đang tạo thư mục...' });
//             const reqTaoFolder = await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
//                 method: "POST", body: JSON.stringify({ action: "tao_thu_muc_moi", folderName: thongTinDich.folderName, parentId: thongTinDich.parentId })
//             });
//             const resTaoFolder = await reqTaoFolder.json();
//             if (resTaoFolder.status === "success") folderIdUpload = resTaoFolder.folderId;
//             else throw new Error(resTaoFolder.message);
//         } else {
//             folderIdUpload = thongTinDich.id;
//         }

//         Swal.update({ title: 'Đang đẩy file lên...' });
//         const base64Data = await fileToBase64(window.FileDanhSachTKTam);
//         const reqUp = await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
//             method: "POST",
//             body: JSON.stringify({
//                 action: "upload_file_danh_sach", name: window.FileDanhSachTKTam.name,
//                 mimeType: window.FileDanhSachTKTam.type, base64: base64Data, folderId: folderIdUpload
//             })
//         });

//         const kq = await reqUp.json();
//         if (kq.status === "success") {
//             Swal.fire('Thành công', 'Đã sao lưu danh sách lên Drive!', 'success');
//             btn.style.display = 'none';
//         } else throw new Error(kq.message);

//     } catch (error) {
//         Swal.fire('Lỗi', error.message, 'error');
//         btn.disabled = false;
//         btn.innerHTML = '⬆️ Thử sao lưu lại';
//     }
// };


// ==============================================================================
// KHỐI 19: TIỆN ÍCH - TẠO TÀI KHOẢN HỌC SINH HÀNG LOẠT
// ==============================================================================

window.DanhSachTaiKhoanMoiTam = []; // Biến toàn cục lưu danh sách chờ tạo
window.FileDanhSachTKTam = null;    // Biến lưu file danh sách tải từ ổ cứng lên

// =======================================================
// HÀM 19.1: MỞ GIAO DIỆN CHÍNH
// =======================================================
window.ham_19_1_mo_giao_dien_tao_tk_hang_loat = function () {
    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
    if (!vungLamViec) return;

    vungLamViec.innerHTML = `
        <div style="padding: 10px; animation: fadeIn 0.3s ease-in-out;">
            
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e83e8c; padding-bottom: 10px; margin-bottom: 20px;">
                <h3 style="color: #e83e8c; margin: 0; text-transform: uppercase;">
                    📝 Tiện ích: Tạo tài khoản học sinh hàng loạt
                </h3>
                <button onclick="ham_3_1_ve_dashboard_admin()" style="padding: 6px 12px; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">
                    ⬅️ Quay lại bảng điều khiển
                </button>
            </div>

            <!-- BƯỚC 1: NẠP FILE -->
            <div style="margin-bottom: 20px; padding: 20px; background: #f8f9fa; border-radius: 8px; border: 1px solid #ced4da; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                    <h4 style="margin: 0; color: #0056b3;">BƯỚC 1: NẠP FILE DANH SÁCH (EXCEL / WORD)</h4>
                    
                    <div style="display: flex; gap: 10px;">
                        <button onclick="ham_19_9_tai_file_mau_word_tao_tk()" style="padding: 6px 15px; background: #2b579a; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 13px; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                            📄 Tải mẫu Word
                        </button>
                        <button onclick="ham_19_3_tai_file_mau_tao_tk()" style="padding: 6px 15px; background: #217346; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 13px; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                            📊 Tải mẫu Excel
                        </button>
                    </div>
                </div>
                
                <p style="font-size: 14px; color: #555; margin-top: 0;">Tên tài khoản tự động sinh theo quy tắc: <b>Tên + Chữ cái đầu Họ/Đệm</b>. Mật khẩu mặc định: <b>123456</b>.</p>
                
                <div style="display: flex; gap: 15px; align-items: center; margin-top: 15px; flex-wrap: wrap;">
                    <button onclick="document.getElementById('input-file-tk-hang-loat').click()" style="padding: 10px 20px; background: #28a745; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: 0.2s;">
                        💻 Chọn file từ Máy tính
                    </button>
                    <input type="file" id="input-file-tk-hang-loat" accept=".xlsx, .xls, .docx" style="display: none;" onchange="ham_19_4_doc_file_danh_sach(event)">
                    
                    <button onclick="ham_19_6_doc_file_tu_drive()" style="padding: 10px 20px; background: #ea4335; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: 0.2s;">
                        ☁️ Chọn file từ Google Drive
                    </button>
                    
                    <span id="ten-file-tk-hien-tai" style="font-size: 14px; font-weight: bold; color: #495057;">Chưa chọn file nào...</span>
                </div>
                
                <button id="btn-up-drive-tk" onclick="ham_19_10_up_file_danh_sach_len_drive()" style="display: none; margin-top: 15px; width: 100%; padding: 10px; background: #fbbc05; color: #000; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    ⬆️ Sao lưu Danh sách này lên Drive
                </button>
            </div>

            <!-- BƯỚC 2: KIỂM TRA DỮ LIỆU -->
            <div style="margin-bottom: 20px; padding: 20px; background: #fff; border-radius: 8px; border: 1px solid #dee2e6; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px dashed #ccc; padding-bottom: 10px; margin-bottom: 15px;">
                    <h4 style="margin: 0; color: #6f42c1;">BƯỚC 2: KIỂM TRA TRƯỚC DỮ LIỆU</h4>
                    <span style="font-size: 15px; font-weight: bold; color: #dc3545;" id="lbl-tong-so-tk">Tổng số: 0 tài khoản</span>
                </div>
                
                <div id="bang-preview-tk" style="height: 400px; overflow-y: auto; background: #f4f6f9; border: 1px dashed #adb5bd; border-radius: 6px; display: block; padding: 0;">
                    <div id="tk-empty-state" style="height: 100%; display: flex; justify-content: center; align-items: center; color: #6c757d; font-style: italic;">
                        Bảng dữ liệu sẽ tự động hiển thị ở đây...
                    </div>
                </div>
            </div>

            <!-- NÚT THỰC THI -->
            <div style="text-align: right; border-top: 1px solid #eee; padding-top: 20px;">
                <button id="btn-thuc-thi-tao-tk" disabled onclick="ham_19_5_thuc_thi_tao_tai_khoan()" style="padding: 12px 30px; background: #6c757d; color: white; border: none; border-radius: 6px; cursor: not-allowed; font-size: 16px; font-weight: bold; transition: 0.2s;">
                    🚀 TIẾN HÀNH TẠO TÀI KHOẢN
                </button>
            </div>

        </div>
    `;
};

// =======================================================
// HÀM 19.2: THUẬT TOÁN TẠO USERNAME TỪ HỌ TÊN (CÓ BẢN DÀI)
// =======================================================
window.ham_19_2_tao_cac_phien_ban_username = function (hoTen) {
    if (!hoTen) return { ngan: "", dai: "" };

    let str = hoTen.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    str = str.replace(/đ/g, "d");
    str = str.replace(/[^a-z\s]/g, "");

    let words = str.trim().split(/\s+/);
    if (words.length === 0) return { ngan: "user", dai: "user" };
    if (words.length === 1) return { ngan: words[0], dai: words[0] };

    let tenChinh = words.pop();
    let cacChuCaiDau = words.map(w => w.charAt(0)).join('');
    let hoVaDem = words.join('');

    return {
        ngan: tenChinh + cacChuCaiDau,
        dai: tenChinh + hoVaDem
    };
};

// =======================================================
// HÀM 19.3: TẢI FILE MẪU EXCEL (STT, HỌ TÊN, MÃ LỚP)
// =======================================================
window.ham_19_3_tai_file_mau_tao_tk = function () {
    const matrixData = [
        ['STT', 'HỌ VÀ TÊN', 'MÃ LỚP'],
        [1, 'Nguyễn Văn An', 'AB123'],
        [2, 'Trần Thị Bích', 'AB123'],
        [3, 'Lê Hoàng Cường', 'AB123']
    ];

    const ws = XLSX.utils.aoa_to_sheet(matrixData);
    ws['A1'].s = ws['B1'].s = ws['C1'].s = { font: { bold: true } };
    ws['!cols'] = [{ wch: 10 }, { wch: 30 }, { wch: 15 }];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "DanhSach");

    XLSX.writeFile(wb, "Mau_Danh_Sach_Tao_Tai_Khoan.xlsx");
};

// =======================================================
// HÀM 19.9: TẠO VÀ TẢI FILE MẪU WORD (.DOCX THẬT - CÓ MÃ LỚP)
// =======================================================
window.ham_19_9_tai_file_mau_word_tao_tk = async function () {
    if (typeof window.docx === 'undefined') {
        Swal.fire({ title: 'Đang chuẩn bị...', text: 'Đang nạp bộ công cụ tạo file Word (.docx)...', didOpen: () => Swal.showLoading() });
        let script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/docx@7.8.2/build/index.js';
        script.onload = () => { Swal.close(); window.ham_19_9_tai_file_mau_word_tao_tk(); };
        document.head.appendChild(script);
        return;
    }

    const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType } = window.docx;

    const taoDongBang = (stt, ten, maLop, isHeader = false) => {
        return new TableRow({
            children: [
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: stt.toString(), bold: isHeader })], alignment: AlignmentType.CENTER })], width: { size: 10, type: WidthType.PERCENTAGE }, shading: isHeader ? { fill: "F2F2F2" } : undefined }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: ten.toString(), bold: isHeader })] })], width: { size: 60, type: WidthType.PERCENTAGE }, shading: isHeader ? { fill: "F2F2F2" } : undefined }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: maLop.toString(), bold: isHeader })], alignment: AlignmentType.CENTER })], width: { size: 30, type: WidthType.PERCENTAGE }, shading: isHeader ? { fill: "F2F2F2" } : undefined })
            ]
        });
    };

    const tableRows = [
        taoDongBang("STT", "HỌ VÀ TÊN", "MÃ LỚP", true),
        taoDongBang(1, "Nguyễn Văn An", "AB123"),
        taoDongBang(2, "Trần Thị Bích", "AB123"),
        taoDongBang(3, "Lê Hoàng Cường", "AB123"),
        taoDongBang(4, "", "AB123"), taoDongBang(5, "", "AB123"), taoDongBang(6, "", "AB123")
    ];

    const doc = new Document({
        sections: [{
            children: [
                new Paragraph({ children: [new TextRun({ text: "DANH SÁCH HỌC SINH TẠO TÀI KHOẢN", bold: true, size: 32 })], alignment: AlignmentType.CENTER, spacing: { after: 200 } }),
                new Paragraph({ children: [new TextRun({ text: "(Thầy/Cô nhập trực tiếp hoặc Copy/Paste danh sách học sinh vào bảng bên dưới)", italics: true, color: "555555" })], alignment: AlignmentType.CENTER, spacing: { after: 300 } }),
                new Table({ rows: tableRows, width: { size: 100, type: WidthType.PERCENTAGE } })
            ]
        }]
    });

    Packer.toBlob(doc).then(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = 'Mau_Danh_Sach_Tao_Tai_Khoan.docx';
        document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
    });
};

// =======================================================
// HÀM 19.4: ĐỌC FILE DANH SÁCH TỪ MÁY TÍNH
// =======================================================
window.ham_19_4_doc_file_danh_sach = async function (event) {
    const file = event.target.files[0];
    if (!file) return;

    window.FileDanhSachTKTam = file;
    document.getElementById('ten-file-tk-hien-tai').innerText = `💻 ${file.name}`;

    const btnUp = document.getElementById('btn-up-drive-tk');
    if (btnUp) {
        btnUp.style.display = 'block';
        btnUp.disabled = false;
        btnUp.innerHTML = '⬆️ Sao lưu Danh sách này lên Drive';
    }

    Swal.fire({ title: 'Đang bóc tách dữ liệu...', didOpen: () => Swal.showLoading() });

    try {
        const arrayBuffer = await file.arrayBuffer();
        let danhSachDuLieu = [];

        if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
            const workbook = XLSX.read(arrayBuffer, { type: 'array' });
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

            jsonData.forEach(row => {
                let ten = row[1] ? String(row[1]).trim() : '';
                let maLop = row[2] ? String(row[2]).trim() : '';

                if (!ten && row[0] && typeof row[0] === 'string' && row[0].length > 3 && !row[0].match(/^\d+$/)) {
                    ten = String(row[0]).trim();
                }

                if (ten && !ten.toLowerCase().includes('họ và tên') && !ten.toLowerCase().includes('họ tên')) {
                    danhSachDuLieu.push({ ten: ten, maLop: maLop });
                }
            });
        }
        else if (file.name.endsWith('.docx')) {
            const result = await mammoth.convertToHtml({ arrayBuffer: arrayBuffer });
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = result.value;

            const rows = tempDiv.querySelectorAll('tr');
            if (rows.length > 0) {
                rows.forEach(tr => {
                    const cells = tr.querySelectorAll('td');
                    if (cells.length >= 2) {
                        let ten = cells[1].innerText.trim();
                        let maLop = cells[2] ? cells[2].innerText.trim() : '';
                        if (ten && !ten.toLowerCase().includes('họ và tên') && !ten.toLowerCase().includes('họ tên')) {
                            danhSachDuLieu.push({ ten: ten, maLop: maLop });
                        }
                    }
                });
            } else {
                const lines = tempDiv.innerText.split('\n').filter(line => line.trim().length > 3);
                lines.forEach(l => {
                    if (!l.toLowerCase().includes('họ và tên') && !l.toLowerCase().includes('họ tên')) {
                        danhSachDuLieu.push({ ten: l.trim(), maLop: '' });
                    }
                });
            }
        }

        ham_19_7_render_bang_preview(danhSachDuLieu);
        Swal.close();

    } catch (error) {
        Swal.fire('Lỗi đọc file', error.message, 'error');
    }
    event.target.value = '';
};

// =======================================================
// HÀM 19.6: LẤY FILE DANH SÁCH TỪ GOOGLE DRIVE
// =======================================================
window.ham_19_6_doc_file_tu_drive = async function () {
    Swal.fire({ title: 'Đang tải cấu trúc Drive...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

    let dsThuMucHtml = '<option value="">-- Chọn thư mục chứa file --</option>';
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
        dsThuMucHtml = `<option value="">❌ Lỗi tải danh sách (Vui lòng dán link file)</option>`;
    }

    const { value: fileIdChon } = await Swal.fire({
        title: '☁️ Chọn file Danh sách từ Drive',
        width: 650,
        html: `
            <div style="text-align: left; font-size: 14px; color: #495057;">
                <div style="margin-bottom: 15px; display: flex; gap: 20px; justify-content: center; background: #e9ecef; padding: 10px; border-radius: 6px;">
                    <label style="cursor:pointer; font-weight:bold; color: #d35400;">
                        <input type="radio" name="r_chon_ds2" id="radio-link-ds2" checked> 🔗 Dán link File
                    </label>
                    <label style="cursor:pointer; font-weight:bold; color:#0056b3;">
                        <input type="radio" name="r_chon_ds2" id="radio-tree-ds2"> 📂 Tìm trong thư mục
                    </label>
                </div>

                <div id="khu-vuc-link-ds2" style="background: #fff3cd; padding: 15px; border-radius: 6px; border: 1px solid #ffeeba;">
                    <p style="margin: 0 0 5px 0; font-weight: bold; color: #856404;">Dán link file Excel / Word:</p>
                    <input id="swal-file-link2" class="swal2-input" placeholder="VD: https://docs.google.com/spreadsheets/d/..." style="width: 100%; box-sizing: border-box; margin: 0; font-size: 14px;">
                </div>

                <div id="khu-vuc-tree-ds2" style="display: none; background: #f4f6f9; padding: 15px; border-radius: 6px; border: 1px solid #ced4da;">
                    <p style="margin: 0 0 5px 0; font-weight: bold; color: #0056b3;">Bước 1: Chọn thư mục</p>
                    <select id="swal-folder-select2" style="width: 100%; padding: 10px; border-radius: 4px; border: 1px solid #adb5bd; outline: none; margin-bottom: 15px;">
                        ${dsThuMucHtml}
                    </select>
                    <p style="margin: 0 0 5px 0; font-weight: bold; color: #28a745;">Bước 2: Bấm chọn file Danh sách</p>
                    <select id="swal-file-select2" disabled style="width: 100%; padding: 10px; border-radius: 4px; border: 2px solid #28a745; outline: none; font-weight: bold; background: #e9ecef;">
                        <option value="">-- Vui lòng chọn thư mục ở trên trước --</option>
                    </select>
                </div>
            </div>
        `,
        showCancelButton: true, confirmButtonColor: '#28a745', confirmButtonText: '📥 Nạp dữ liệu',
        didOpen: () => {
            document.getElementById('radio-link-ds2').onchange = () => {
                document.getElementById('khu-vuc-link-ds2').style.display = 'block';
                document.getElementById('khu-vuc-tree-ds2').style.display = 'none';
            };
            document.getElementById('radio-tree-ds2').onchange = () => {
                document.getElementById('khu-vuc-link-ds2').style.display = 'none';
                document.getElementById('khu-vuc-tree-ds2').style.display = 'block';
            };

            document.getElementById('swal-folder-select2').onchange = async function () {
                const folderId = this.value;
                const fileSelect = document.getElementById('swal-file-select2');

                if (!folderId) {
                    fileSelect.innerHTML = '<option value="">-- Vui lòng chọn thư mục ở trên trước --</option>';
                    fileSelect.disabled = true; return;
                }

                fileSelect.disabled = true;
                fileSelect.innerHTML = '<option value="">⏳ Đang tìm file Excel/Word...</option>';

                try {
                    const reqFiles = await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
                        method: "POST", body: JSON.stringify({ action: "lay_danh_sach_file_van_ban", folderId: folderId })
                    });
                    const resFiles = await reqFiles.json();

                    if (resFiles.status === "success" && resFiles.data.length > 0) {
                        let fHtml = '<option value="">-- Bấm vào đây để chọn file --</option>';
                        resFiles.data.forEach(f => fHtml += `<option value="${f.id}">📄 ${f.name}</option>`);
                        fileSelect.innerHTML = fHtml;
                        fileSelect.disabled = false;
                        fileSelect.style.background = '#fff';
                    } else {
                        fileSelect.innerHTML = '<option value="">❌ Không có file Excel/Word nào</option>';
                    }
                } catch (e) {
                    fileSelect.innerHTML = '<option value="">❌ Lỗi kết nối mạng</option>';
                }
            };
        },
        preConfirm: () => {
            const isTabLink = document.getElementById('radio-link-ds2').checked;
            if (isTabLink) {
                const url = document.getElementById('swal-file-link2').value.trim();
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
                const fileId = document.getElementById('swal-file-select2').value;
                if (!fileId) { Swal.showValidationMessage('Thầy chưa bấm chọn file!'); return false; }
                return fileId;
            }
        }
    });

    if (!fileIdChon) return;

    Swal.fire({ title: 'Đang đọc dữ liệu từ Drive...', didOpen: () => Swal.showLoading() });

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

        let danhSachDuLieu = [];
        if (selectedFileName.endsWith('.xlsx') || selectedFileName.endsWith('.xls')) {
            const workbook = XLSX.read(arrayBuffer, { type: 'array' });
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

            jsonData.forEach(row => {
                let ten = row[1] ? String(row[1]).trim() : '';
                let maLop = row[2] ? String(row[2]).trim() : '';

                if (!ten && row[0] && typeof row[0] === 'string' && row[0].length > 3 && !row[0].match(/^\d+$/)) {
                    ten = String(row[0]).trim();
                }

                if (ten && !ten.toLowerCase().includes('họ và tên') && !ten.toLowerCase().includes('họ tên')) {
                    danhSachDuLieu.push({ ten: ten, maLop: maLop });
                }
            });
        }
        else if (selectedFileName.endsWith('.docx')) {
            const result = await mammoth.convertToHtml({ arrayBuffer: arrayBuffer });
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = result.value;

            const rows = tempDiv.querySelectorAll('tr');
            if (rows.length > 0) {
                rows.forEach(tr => {
                    const cells = tr.querySelectorAll('td');
                    if (cells.length >= 2) {
                        let ten = cells[1].innerText.trim();
                        let maLop = cells[2] ? cells[2].innerText.trim() : '';
                        if (ten && !ten.toLowerCase().includes('họ và tên') && !ten.toLowerCase().includes('họ tên')) {
                            danhSachDuLieu.push({ ten: ten, maLop: maLop });
                        }
                    }
                });
            } else {
                const lines = tempDiv.innerText.split('\n').filter(line => line.trim().length > 3);
                lines.forEach(l => {
                    if (!l.toLowerCase().includes('họ và tên') && !l.toLowerCase().includes('họ tên')) {
                        danhSachDuLieu.push({ ten: l.trim(), maLop: '' });
                    }
                });
            }
        }

        document.getElementById('ten-file-tk-hien-tai').innerText = `☁️ ${selectedFileName}`;
        const btnUp = document.getElementById('btn-up-drive-tk');
        if (btnUp) btnUp.style.display = 'none';

        ham_19_7_render_bang_preview(danhSachDuLieu);
        Swal.close();

    } catch (error) {
        Swal.fire('Lỗi truy cập File', 'Không thể đọc file từ Drive. Hãy chắc chắn file được cấp quyền "Bất kỳ ai có liên kết". Chi tiết: ' + error.message, 'error');
    }
};

// =======================================================
// HÀM 19.7: KHỞI TẠO MẢNG DỮ LIỆU TỪ DANH SÁCH FILE NẠP VÀO
// =======================================================
window.ham_19_7_render_bang_preview = function (danhSachDuLieu) {
    if (danhSachDuLieu.length === 0) throw new Error("Không tìm thấy dữ liệu Họ Tên hợp lệ trong file!");

    let usernameMap = {};
    window.DanhSachTaiKhoanMoiTam = [];

    danhSachDuLieu.forEach((item, index) => {
        let phienBan = ham_19_2_tao_cac_phien_ban_username(item.ten);
        let finalUsername = phienBan.ngan;

        if (usernameMap[phienBan.ngan] !== undefined) {
            finalUsername = phienBan.dai;
            if (usernameMap[phienBan.dai] !== undefined) {
                usernameMap[phienBan.dai]++;
                finalUsername = phienBan.dai + usernameMap[phienBan.dai];
            } else {
                usernameMap[phienBan.dai] = 0;
            }
        } else {
            usernameMap[phienBan.ngan] = 0;
        }

        window.DanhSachTaiKhoanMoiTam.push({
            stt: index + 1,
            ten: item.ten,
            maLop: item.maLop,
            taiKhoan: finalUsername,
            matKhau: "123456"
        });
    });

    ham_19_8_ve_lai_bang_preview();
};

// =======================================================
// HÀM 19.8: VẼ LẠI BẢNG GIAO DIỆN (CHUYỂN THÀNH Ô NHẬP LIỆU - INLINE EDIT)
// =======================================================
window.ham_19_8_ve_lai_bang_preview = function () {
    let htmlTable = `
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; background: white;">
            <thead style="position: sticky; top: 0; background: #e9ecef; box-shadow: 0 2px 4px rgba(0,0,0,0.1); z-index: 10;">
                <tr>
                    <th style="padding: 10px; border-bottom: 2px solid #dee2e6; text-align: center; width: 50px;">STT</th>
                    <th style="padding: 10px; border-bottom: 2px solid #dee2e6; text-align: left;">👤 Họ và Tên</th>
                    <th style="padding: 10px; border-bottom: 2px solid #dee2e6; text-align: center; width: 110px; color: #17a2b8;">🏫 Mã Lớp</th>
                    <th style="padding: 10px; border-bottom: 2px solid #dee2e6; text-align: center; width: 130px; color: #28a745;">⚙️ Thao Tác</th>
                    <th style="padding: 10px; border-bottom: 2px solid #dee2e6; text-align: left; width: 160px; color: #d35400;">🔑 Tên Đăng Nhập</th>
                    <th style="padding: 10px; border-bottom: 2px solid #dee2e6; text-align: left; width: 110px;">🔒 Mật khẩu</th>
                </tr>
            </thead>
            <tbody>
    `;

    window.DanhSachTaiKhoanMoiTam.forEach((tk, index) => {
        htmlTable += `
            <tr style="border-bottom: 1px solid #eee; transition: 0.2s;" onmouseover="this.style.background='#f8f9fa'" onmouseout="this.style.background='transparent'">
                <td style="padding: 8px 10px; text-align: center; font-weight: bold; color: #6c757d; vertical-align: middle;">${index + 1}</td>
                
                <!-- 🌟 Ô SỬA TÊN -->
                <td style="padding: 8px 10px;">
                    <input type="text" value="${tk.ten}" onchange="ham_19_cap_nhat_inline(${index}, 'ten', this.value)" style="width: 100%; padding: 6px 8px; border: 1px solid #ced4da; border-radius: 4px; font-weight: bold; color: #0056b3; outline: none; box-sizing: border-box; font-size: 14px; transition: 0.2s;" onfocus="this.style.borderColor='#80bdff'; this.style.boxShadow='0 0 0 0.2rem rgba(0,123,255,.25)'" onblur="this.style.borderColor='#ced4da'; this.style.boxShadow='none'">
                </td>
                
                <!-- 🌟 Ô SỬA MÃ LỚP -->
                <td style="padding: 8px 10px;">
                    <input type="text" value="${tk.maLop || ''}" placeholder="Trống" onchange="ham_19_cap_nhat_inline(${index}, 'maLop', this.value)" style="width: 100%; padding: 6px 8px; border: 1px solid #ced4da; border-radius: 4px; text-align: center; color: #1a73e8; font-weight: bold; outline: none; box-sizing: border-box; background: #e8f0fe; font-size: 14px; transition: 0.2s;" onfocus="this.style.borderColor='#80bdff'; this.style.boxShadow='0 0 0 0.2rem rgba(0,123,255,.25)'" onblur="this.style.borderColor='#ced4da'; this.style.boxShadow='none'">
                </td>
                
                <!-- NÚT THÊM / XÓA -->
                <td style="padding: 8px 10px; text-align: center; vertical-align: middle;">
                    <div style="display: flex; gap: 5px; justify-content: center;">
                        <button onclick="ham_19_them_tai_khoan(${index})" title="Chèn thêm" style="padding: 4px 8px; font-size: 11px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; box-shadow: 0 1px 2px rgba(0,0,0,0.1);">➕ Thêm</button>
                        <button onclick="ham_19_xoa_tai_khoan(${index})" title="Xóa bỏ" style="padding: 4px 8px; font-size: 11px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; box-shadow: 0 1px 2px rgba(0,0,0,0.1);">❌ Xóa</button>
                    </div>
                </td>
                
                <!-- 🌟 Ô SỬA TÊN ĐĂNG NHẬP -->
                <td style="padding: 8px 10px;">
                    <input type="text" value="${tk.taiKhoan}" onchange="ham_19_cap_nhat_inline(${index}, 'taiKhoan', this.value)" style="width: 100%; padding: 6px 8px; border: 1px solid #ced4da; border-radius: 4px; color: #d35400; font-weight: bold; background: #fff3cd; outline: none; box-sizing: border-box; font-size: 14px; transition: 0.2s;" onfocus="this.style.borderColor='#ffc107'; this.style.boxShadow='0 0 0 0.2rem rgba(255,193,7,.25)'" onblur="this.style.borderColor='#ced4da'; this.style.boxShadow='none'">
                </td>
                
                <!-- 🌟 Ô SỬA MẬT KHẨU -->
                <td style="padding: 8px 10px;">
                    <input type="text" value="${tk.matKhau}" onchange="ham_19_cap_nhat_inline(${index}, 'matKhau', this.value)" style="width: 100%; padding: 6px 8px; border: 1px solid #ced4da; border-radius: 4px; color: #28a745; font-weight: bold; font-family: monospace; outline: none; box-sizing: border-box; font-size: 14px; transition: 0.2s;" onfocus="this.style.borderColor='#28a745'; this.style.boxShadow='0 0 0 0.2rem rgba(40,167,69,.25)'" onblur="this.style.borderColor='#ced4da'; this.style.boxShadow='none'">
                </td>
            </tr>
        `;
    });

    htmlTable += `</tbody></table>`;

    const bangPreview = document.getElementById('bang-preview-tk');
    if (bangPreview) bangPreview.innerHTML = htmlTable;

    const lblTongSo = document.getElementById('lbl-tong-so-tk');
    if (lblTongSo) lblTongSo.innerText = `Tổng số: ${window.DanhSachTaiKhoanMoiTam.length} tài khoản hợp lệ`;

    const btnThucThi = document.getElementById('btn-thuc-thi-tao-tk');
    if (btnThucThi) {
        if (window.DanhSachTaiKhoanMoiTam.length > 0) {
            btnThucThi.disabled = false;
            btnThucThi.style.background = '#007bff';
            btnThucThi.style.cursor = 'pointer';
        } else {
            btnThucThi.disabled = true;
            btnThucThi.style.background = '#6c757d';
            btnThucThi.style.cursor = 'not-allowed';
            if (bangPreview) bangPreview.innerHTML = `<div style="height: 100%; display: flex; justify-content: center; align-items: center; color: #dc3545; font-weight: bold; font-style: italic;">❌ Bảng dữ liệu đã bị xóa trống...</div>`;
        }
    }
};

// =======================================================
// HÀM 19.12: LƯU TRỰC TIẾP KHI GÓP PHÍM VÀO Ô (INLINE UPDATE)
// =======================================================
window.ham_19_cap_nhat_inline = function (index, truongDuLieu, giaTriMoi) {
    if (window.DanhSachTaiKhoanMoiTam[index]) {
        // Cập nhật giá trị mới vào mảng dữ liệu gốc
        window.DanhSachTaiKhoanMoiTam[index][truongDuLieu] = giaTriMoi.trim();
    }
};

// =======================================================
// HÀM 19: THÊM / XÓA TÀI KHOẢN
// =======================================================
window.ham_19_xoa_tai_khoan = function (index) {
    window.DanhSachTaiKhoanMoiTam.splice(index, 1);
    window.ham_19_8_ve_lai_bang_preview();
};

window.ham_19_them_tai_khoan = async function (index) {
    const { value: formValues } = await Swal.fire({
        title: '➕ Chèn thêm tài khoản',
        html: `
            <p style="font-size: 14px;">Nhập thông tin học sinh cần thêm vào <b>vị trí số ${index + 1}</b>:</p>
            <input id="swal-input-ten" class="swal2-input" placeholder="Họ và Tên (*)" style="margin-bottom: 10px;">
            <input id="swal-input-malop" class="swal2-input" placeholder="Mã Lớp (Tùy chọn. VD: AB123)">
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonColor: '#28a745',
        confirmButtonText: 'Chèn vào danh sách',
        cancelButtonText: 'Hủy',
        preConfirm: () => {
            const ten = document.getElementById('swal-input-ten').value.trim();
            if (!ten) { Swal.showValidationMessage('Thầy/Cô chưa nhập Tên học sinh!'); return false; }
            return { ten: ten, maLop: document.getElementById('swal-input-malop').value.trim() };
        }
    });

    if (formValues) {
        let danhSachUsernames = window.DanhSachTaiKhoanMoiTam.map(tk => tk.taiKhoan);
        let phienBan = ham_19_2_tao_cac_phien_ban_username(formValues.ten);
        let finalUsername = phienBan.ngan;

        if (danhSachUsernames.includes(finalUsername)) {
            finalUsername = phienBan.dai;
            let counter = 1;
            let tempUsername = finalUsername;
            while (danhSachUsernames.includes(tempUsername)) {
                tempUsername = finalUsername + counter;
                counter++;
            }
            finalUsername = tempUsername;
        }

        window.DanhSachTaiKhoanMoiTam.splice(index, 0, {
            stt: 0,
            ten: formValues.ten,
            maLop: formValues.maLop,
            taiKhoan: finalUsername,
            matKhau: "123456"
        });

        window.ham_19_8_ve_lai_bang_preview();
        const Toast = Swal.mixin({ toast: true, position: 'top-end', showConfirmButton: false, timer: 1500 });
        Toast.fire({ icon: 'success', title: `Đã chèn: ${formValues.ten}` });
    }
};

// =======================================================
// HÀM 19.5: THỰC THI CHÈN LÊN SUPABASE (KIỂM TRA MÃ LỚP + ÉP BẮT LỖI RLS)
// =======================================================
window.ham_19_5_thuc_thi_tao_tai_khoan = async function () {
    const dsTaiKhoan = window.DanhSachTaiKhoanMoiTam;
    if (!dsTaiKhoan || dsTaiKhoan.length === 0) return;

    const confirm = await Swal.fire({
        title: 'Chốt tạo tài khoản?',
        text: `Hệ thống sẽ tạo tự động ${dsTaiKhoan.length} tài khoản lên CSDL.`,
        icon: 'warning', showCancelButton: true, confirmButtonColor: '#007bff', confirmButtonText: '🚀 Bắt đầu tạo!'
    });
    if (!confirm.isConfirmed) return;

    Swal.fire({ title: 'Đang kiểm tra dữ liệu...', text: 'Đang xác thực Mã lớp và Tài khoản...', didOpen: () => Swal.showLoading() });

    try {
        // 🌟 BƯỚC 1: KIỂM TRA MÃ LỚP XEM CÓ TỒN TẠI TRÊN HỆ THỐNG KHÔNG
        // Trích xuất các mã lớp được nhập vào (Bỏ qua các học sinh không nhập mã lớp)
        let danhSachMaLopInput = [...new Set(dsTaiKhoan.map(hs => hs.maLop).filter(ma => ma && ma.trim() !== ''))];

        if (danhSachMaLopInput.length > 0) {
            // Lấy danh sách mã lớp hợp lệ từ DB bảng lop_hoc
            const { data: dbLop, error: errLop } = await _supabase.from('lop_hoc').select('ma_lop').in('ma_lop', danhSachMaLopInput);
            if (errLop) throw errLop;

            let dsMaLopHopLe = dbLop.map(l => l.ma_lop);

            // Tìm ra những mã lớp bị gõ sai hoặc chưa tồn tại
            let dsMaLopKhongTonTai = danhSachMaLopInput.filter(ma => !dsMaLopHopLe.includes(ma));

            if (dsMaLopKhongTonTai.length > 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Mã lớp không tồn tại!',
                    html: `Hệ thống phát hiện các Mã lớp sau chưa được tạo trên phần mềm:<br><br>
                           <b style="color:red; font-size:16px;">${dsMaLopKhongTonTai.join(', ')}</b><br><br>
                           Vui lòng sửa lại mã lớp trên bảng hoặc tạo lớp này trước khi nạp học sinh.`
                });
                return; // Dừng luôn quá trình tạo
            }
        }

        // 🌟 BƯỚC 2: KIỂM TRA CHỐNG TRÙNG TÊN ĐĂNG NHẬP
        const { data: dbUsers, error: errCheck } = await _supabase.from('hoc_sinh').select('sdt');
        if (errCheck) throw errCheck;

        let dsTonTai = dbUsers.map(u => u.sdt);

        dsTaiKhoan.forEach(hs => {
            let tempUsername = hs.taiKhoan;
            let counter = 1;
            while (dsTonTai.includes(tempUsername)) {
                tempUsername = hs.taiKhoan + counter;
                counter++;
            }
            hs.taiKhoan = tempUsername;
            dsTonTai.push(tempUsername); // Đưa vào mảng để bảo vệ cho người tiếp theo
        });

        Swal.update({ title: 'Đang đẩy lên hệ thống...', html: `Đang chèn <b>${dsTaiKhoan.length}</b> tài khoản...` });

        // 🌟 BƯỚC 3: ĐẨY DỮ LIỆU LÊN BẢNG HỌC SINH
        const payloadInsert = dsTaiKhoan.map(hs => {
            let mangLop = (hs.maLop && hs.maLop.trim() !== '') ? [hs.maLop.trim()] : [];
            return {
                uid: crypto.randomUUID(),
                ten: hs.ten,
                sdt: hs.taiKhoan,
                mat_khau: hs.matKhau,
                vai_tro: 'hocsinh',
                trang_thai: 1,
                khoi_lop: '',
                tinh: '',
                truong: '',
                danh_sach_ma_lop: mangLop,
                ngay_tham_gia: new Date().toISOString()
            };
        });

        console.log("📦 Chuẩn bị đẩy dữ liệu:", payloadInsert);

        const { data: insertedData, error: errInsert } = await _supabase.from('hoc_sinh').insert(payloadInsert).select();

        console.log("📥 Phản hồi từ Supabase:", insertedData, errInsert);

        if (errInsert) throw errInsert;

        if (!insertedData || insertedData.length === 0) {
            throw new Error("Bị chặn bởi RLS (Row Level Security)! Hãy cấp quyền Insert cho bảng hoc_sinh.");
        }

        window.ham_19_8_ve_lai_bang_preview();
        Swal.fire({ icon: 'success', title: 'Hoàn tất!', text: `Đã tạo thành công ${dsTaiKhoan.length} tài khoản.`, confirmButtonColor: '#28a745' });

        const btnThucThi = document.getElementById('btn-thuc-thi-tao-tk');
        if (btnThucThi) {
            btnThucThi.style.background = '#28a745';
            btnThucThi.innerHTML = '📥 TẢI DANH SÁCH VỪA TẠO (EXCEL)';
            btnThucThi.onclick = window.ham_19_11_xuat_excel_tai_khoan;
        }

    } catch (error) {
        console.error(error);
        Swal.fire('Thất bại', `Lỗi hệ thống: ${error.message}`, 'error');
    }
};



// =======================================================
// HÀM 19.10: SAO LƯU FILE DANH SÁCH LÊN G.DRIVE (CHỌN THƯ MỤC)
// =======================================================
window.ham_19_10_up_file_danh_sach_len_drive = async function () {
    if (!window.FileDanhSachTKTam) return;

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
                        <input type="radio" name="r_luu_ds_tk" id="radio-co-san-ds-tk" checked> 📂 Thư mục có sẵn
                    </label>
                    <label style="cursor:pointer; font-weight:bold; color:#28a745;">
                        <input type="radio" name="r_luu_ds_tk" id="radio-tao-moi-ds-tk"> ➕ Tạo thư mục mới
                    </label>
                </div>

                <div id="khu-vuc-co-san-ds-tk" style="background: #f4f6f9; padding: 15px; border-radius: 6px; border: 1px solid #ced4da;">
                    <p style="margin: 0 0 5px 0; font-weight: bold; color: #0056b3;">Chọn thư mục lưu file:</p>
                    <select id="swal-select-folder-ds-tk" style="width: 100%; padding: 10px; border-radius: 4px; border: 2px solid #17a2b8; outline: none; margin-bottom: 15px; font-weight: bold;">
                        ${dsThuMucHtml}
                    </select>
                </div>

                <div id="khu-vuc-tao-moi-ds-tk" style="display: none; background: #f8fff9; padding: 15px; border-radius: 6px; border: 1px dashed #28a745;">
                    <p style="margin: 0 0 5px 0; font-weight:bold; color: #28a745;">Chọn vị trí đặt thư mục mới:</p>
                    <select id="swal-parent-select-ds-tk" style="width: 100%; padding: 10px; margin-bottom: 15px; font-weight: bold;">
                        ${dsThuMucHtml}
                    </select>
                    <p style="margin: 0 0 5px 0; font-weight:bold;">Tên thư mục mới (*):</p>
                    <input id="swal-new-folder-name-ds-tk" class="swal2-input" placeholder="VD: Danh_Sach_AB123" style="width: 100%; margin: 0; box-sizing: border-box;">
                </div>
            </div>
        `,
        showCancelButton: true, confirmButtonColor: '#fbbc05', confirmButtonText: '🚀 Lưu lên Drive',
        didOpen: () => {
            document.getElementById('radio-co-san-ds-tk').onchange = () => {
                document.getElementById('khu-vuc-co-san-ds-tk').style.display = 'block';
                document.getElementById('khu-vuc-tao-moi-ds-tk').style.display = 'none';
            };
            document.getElementById('radio-tao-moi-ds-tk').onchange = () => {
                document.getElementById('khu-vuc-co-san-ds-tk').style.display = 'none';
                document.getElementById('khu-vuc-tao-moi-ds-tk').style.display = 'block';
            };
        },
        preConfirm: () => {
            const isTaoMoi = document.getElementById('radio-tao-moi-ds-tk').checked;
            if (isTaoMoi) {
                const tenMoi = document.getElementById('swal-new-folder-name-ds-tk').value.trim();
                const parentId = document.getElementById('swal-parent-select-ds-tk').value;
                if (!parentId || !tenMoi) { Swal.showValidationMessage('Vui lòng nhập đủ thông tin!'); return false; }
                return { mode: 'tao_moi', folderName: tenMoi, parentId: parentId };
            } else {
                const selectedId = document.getElementById('swal-select-folder-ds-tk').value;
                if (!selectedId) { Swal.showValidationMessage('Vui lòng chọn thư mục!'); return false; }
                return { mode: 'co_san', id: selectedId };
            }
        }
    });

    if (!thongTinDich) return;

    const btn = document.getElementById('btn-up-drive-tk');
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
        const base64Data = await fileToBase64(window.FileDanhSachTKTam);
        const reqUp = await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
            method: "POST",
            body: JSON.stringify({
                action: "upload_file_danh_sach", name: window.FileDanhSachTKTam.name,
                mimeType: window.FileDanhSachTKTam.type, base64: base64Data, folderId: folderIdUpload
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

// =======================================================
// HÀM 19.11: XUẤT EXCEL DANH SÁCH (THÊM CỘT MÃ LỚP)
// =======================================================
window.ham_19_11_xuat_excel_tai_khoan = function () {
    const dsTaiKhoan = window.DanhSachTaiKhoanMoiTam;
    if (!dsTaiKhoan || dsTaiKhoan.length === 0) return Swal.fire('Lỗi', 'Không có dữ liệu để xuất!', 'error');

    const matrixData = [
        ['STT', 'HỌ VÀ TÊN', 'MÃ LỚP', 'TÊN ĐĂNG NHẬP', 'MẬT KHẨU', 'GHI CHÚ']
    ];

    dsTaiKhoan.forEach((hs, index) => {
        matrixData.push([index + 1, hs.ten, hs.maLop, hs.taiKhoan, hs.matKhau, 'Truy cập web để đăng nhập']);
    });

    const ws = XLSX.utils.aoa_to_sheet(matrixData);
    ws['A1'].s = { font: { bold: true }, alignment: { horizontal: "center" } };
    ws['B1'].s = ws['C1'].s = ws['D1'].s = ws['E1'].s = ws['F1'].s = { font: { bold: true } };

    ws['!cols'] = [{ wch: 8 }, { wch: 30 }, { wch: 15 }, { wch: 20 }, { wch: 15 }, { wch: 30 }];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "TaiKhoanHocSinh");

    const now = new Date();
    const tg = `${now.getHours()}h${now.getMinutes()}_${now.getDate()}_${now.getMonth() + 1}`;
    XLSX.writeFile(wb, `DS_Tai_Khoan_Hoc_Sinh_${tg}.xlsx`);
};
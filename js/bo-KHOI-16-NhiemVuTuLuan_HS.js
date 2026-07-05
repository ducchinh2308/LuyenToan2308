// // ==============================================================================
// // KHỐI 16: HỌC SINH LÀM BÀI VÀ NỘP BÀI TỰ LUẬN (CHỤP ẢNH)
// // ==============================================================================


// // ==============================================================
// // Hàm 16.5: Giao diện danh sách học sinh và bài nộp Tự luận (Dành cho GV)
// // ==============================================================
// window.ham_16_5_mo_danh_sach_cham_tu_luan = async function(maNhiemVu, tenNhiemVu) {
//     const vungHienThi = document.getElementById('dashboard-container') || document.getElementById('app'); 
//     vungHienThi.innerHTML = `<div style="padding: 50px; text-align: center; font-size: 18px; font-weight: bold; color: #1a73e8;">⏳ Đang tổng hợp danh sách bài nộp...</div>`;

//     try {
//         // 1. Lấy thông tin lớp được giao từ nhiệm vụ
//         const { data: nvData, error: errNV } = await _supabase
//             .from('nhiem_vu')
//             .select('danh_sach_lop')
//             .eq('ma_nhiem_vu', maNhiemVu)
//             .single();
        
//         if (errNV || !nvData) throw new Error("Không tìm thấy dữ liệu nhiệm vụ!");
//         const dsLop = nvData.danh_sach_lop || [];

//         if (dsLop.length === 0) {
//             return vungHienThi.innerHTML = `<div style="text-align:center; padding:20px; color:#6c757d;">Nhiệm vụ này chưa được giao cho lớp nào.</div>`;
//         }

//         // 🌟 XÁC ĐỊNH CHÍNH XÁC 1 MÃ LỚP CỦA NHIỆM VỤ NÀY
//         const maLopCuaNhiemVu = dsLop[0]; 
        
//         // Tìm tên lớp hiển thị cho đẹp (nếu có trong tempDsLop)
//         let tenLopHienThi = maLopCuaNhiemVu;
//         if (window.tempDsLop) {
//             const lopObj = window.tempDsLop.find(l => (l.ma_lop || l.ma || l.id) === maLopCuaNhiemVu);
//             if (lopObj) tenLopHienThi = lopObj.ten_lop || lopObj.ten;
//         }

//         // 2. Lấy toàn bộ học sinh và LỌC RA ĐÚNG HỌC SINH CỦA LỚP ĐÓ
//         const { data: allHocSinh, error: errHS } = await _supabase
//             .from('hoc_sinh')
//             .select('uid, ten, danh_sach_ma_lop'); 
        
//         if (errHS) throw errHS;

//         let dsHocSinh = [];
//         allHocSinh.forEach(hs => {
//             let lopCuaEm = [];
//             try { lopCuaEm = typeof hs.danh_sach_ma_lop === 'string' ? JSON.parse(hs.danh_sach_ma_lop) : (hs.danh_sach_ma_lop || []); } catch (e) { }
            
//             // Chỉ bắt những em có chứa maLopCuaNhiemVu
//             if (lopCuaEm.includes(maLopCuaNhiemVu)) {
//                 dsHocSinh.push({
//                     uid: hs.uid,
//                     ten: hs.ten || 'Chưa cập nhật'
//                 });
//             }
//         });

//         // Sắp xếp danh sách lớp theo tên Alphabet
//         dsHocSinh.sort((a, b) => a.ten.localeCompare(b.ten));

//         // 3. Lấy tất cả các bài đã nộp của nhiệm vụ này
//         const { data: dsBaiNop, error: errKQ } = await _supabase
//             .from('ket_qua_thi')
//             .select('*')
//             .eq('ma_nhiem_vu', maNhiemVu)
//             .order('thoi_gian_nop', { ascending: false }); 
        
//         if (errKQ) throw errKQ;

//         // 4. Khớp dữ liệu học sinh với bài nộp để dựng bảng
//         let htmlTableRows = '';
//         dsHocSinh.forEach((hs, index) => {
//             const baiNop = dsBaiNop.find(b => b.uid_hoc_sinh === hs.uid);
            
//             let trangThai = `<span style="color: #dc3545; font-weight: bold;">❌ Chưa nộp</span>`;
//             let diem = "-";
//             let btnHanhDong = `<button disabled style="padding: 6px 12px; background: #e9ecef; color: #6c757d; border: 1px solid #ced4da; border-radius: 4px; cursor: not-allowed; font-size: 13px;">Chưa có bài</button>`;

//             if (baiNop) {
//                 const danhSachAnh = baiNop.chi_tiet_lam_bai?.danh_sach_link_anh || [];
//                 const soTrang = danhSachAnh.length;
                
//                 if (baiNop.trang_thai_cham === 1 || baiNop.tong_diem !== null) {
//                     trangThai = `<span style="color: #28a745; font-weight: bold;">✅ Đã chấm</span>`;
//                     diem = `<span style="font-weight: 900; color: #d35400; font-size: 16px;">${baiNop.tong_diem}</span>`;
//                     btnHanhDong = `<button onclick="ham_16_6_mo_giao_dien_cham('${baiNop.id}')" style="padding: 6px 12px; background: #17a2b8; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; font-size: 13px;">👁️ Xem lại</button>`;
//                 } else {
//                     trangThai = `<span style="color: #007bff; font-weight: bold;">📸 Đã nộp (${soTrang} ảnh)</span>`;
//                     btnHanhDong = `<button onclick="ham_16_6_mo_giao_dien_cham('${baiNop.id}')" style="padding: 6px 12px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; font-size: 13px;">✍️ Chấm bài</button>`;
//                 }
//             }

//             htmlTableRows += `
//                 <tr style="border-bottom: 1px solid #e9ecef; background: ${baiNop && baiNop.trang_thai_cham === 0 ? '#fff3cd' : 'transparent'};">
//                     <td style="padding: 12px; text-align: center;">${index + 1}</td>
//                     <td style="padding: 12px; font-weight: bold; color: #495057;">${hs.ten}</td>
//                     <td style="padding: 12px; text-align: center;">${trangThai}</td>
//                     <td style="padding: 12px; text-align: center;">${diem}</td>
//                     <td style="padding: 12px; text-align: center;">${btnHanhDong}</td>
//                 </tr>
//             `;
//         });

//         // 5. Đổ giao diện ra màn hình (ĐÃ BỎ CỘT LỚP, ĐƯA TÊN LỚP LÊN HEADER)
//         vungHienThi.innerHTML = `
//             <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); max-width: 900px; margin: 0 auto;">
//                 <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e9ecef; padding-bottom: 15px; margin-bottom: 20px; flex-wrap: wrap; gap: 10px;">
//                     <div>
//                         <h2 style="color: #6f42c1; margin: 0; display: flex; align-items: center; gap: 10px; font-size: 20px;">
//                             📸 CHẤM BÀI TỰ LUẬN
//                         </h2>
//                         <div style="margin-top: 8px; color: #495057; font-size: 14px; line-height: 1.5;">
//                             📝 Nhiệm vụ: <strong style="color: #d35400;">${tenNhiemVu || maNhiemVu}</strong><br>
//                             🏫 Lớp nộp bài: <strong style="color: #1a73e8; font-size: 15px; background: #e6f2ff; padding: 2px 8px; border-radius: 4px;">${tenLopHienThi}</strong>
//                         </div>
//                     </div>
//                     <button onclick="ham_16_8_quay_lai_quan_ly()" style="padding: 10px 20px; background: #6c757d; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; font-size: 14px;">
//                         ⬅️ QUAY LẠI
//                     </button>
//                 </div>
                
//                 <div style="overflow-x: auto; border-radius: 8px; border: 1px solid #dee2e6;">
//                     <table style="width: 100%; border-collapse: collapse; min-width: 600px;">
//                         <thead style="background: #f8f9fa;">
//                             <tr style="border-bottom: 2px solid #dee2e6;">
//                                 <th style="padding: 15px 10px; text-align: center; color: #495057; width: 60px;">STT</th>
//                                 <th style="padding: 15px 10px; text-align: left; color: #495057;">Họ và Tên</th>
//                                 <th style="padding: 15px 10px; text-align: center; color: #495057; width: 180px;">Trạng thái</th>
//                                 <th style="padding: 15px 10px; text-align: center; color: #495057; width: 100px;">Điểm số</th>
//                                 <th style="padding: 15px 10px; text-align: center; color: #495057; width: 140px;">Thao tác</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             ${htmlTableRows.length > 0 ? htmlTableRows : `<tr><td colspan="5" style="text-align:center; padding:30px; color:#6c757d;">Lớp <b>${tenLopHienThi}</b> hiện chưa có học sinh nào.</td></tr>`}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         `;

//     } catch (error) {
//         console.error("Lỗi danh sách chấm:", error);
//         vungHienThi.innerHTML = `
//             <div style="text-align: center; padding: 50px;">
//                 <h3 style="color: #dc3545;">❌ Lỗi hệ thống dữ liệu</h3>
//                 <p style="color: #666;">${error.message}</p>
//                 <button onclick="ham_16_8_quay_lai_quan_ly()" style="padding: 10px 20px; background: #6c757d; color: white; border: none; border-radius: 5px; cursor: pointer;">Quay lại</button>
//             </div>`;
//     }
// };

// // // ==============================================================


// // // Hàm 16.6: Giao diện chi tiết phòng chấm bài (Xem ảnh & Nhập điểm)
// // // ==============================================================
// // window.ham_16_6_mo_giao_dien_cham = async function(idBaiNop) {
// //     const vungHienThi = document.getElementById('dashboard-container') || document.getElementById('app');
// //     vungHienThi.innerHTML = `<div style="text-align: center; padding: 50px; font-size: 18px; color: #1a73e8;">⏳ Đang tải dữ liệu bài làm...</div>`;

// //     try {
// //         // 1. Lấy dữ liệu bài nộp
// //         const { data: baiNop, error: errKQ } = await _supabase
// //             .from('ket_qua_thi')
// //             .select('*')
// //             .eq('id', idBaiNop)
// //             .single();
// //         if (errKQ || !baiNop) throw new Error("Không tìm thấy dữ liệu bài nộp này!");

// //         // 2. Lấy tên học sinh để hiển thị
// //         const { data: hs } = await _supabase.from('hoc_sinh').select('ten').eq('uid', baiNop.uid_hoc_sinh).single();
// //         const tenHocSinh = hs ? hs.ten : "Học sinh không xác định";

// //         // 3. Xử lý danh sách link ảnh (Dùng iframe preview của Google Drive)
// //         const danhSachAnh = baiNop.chi_tiet_lam_bai?.danh_sach_link_anh || [];
// //         let htmlAnh = "";
        
// //         if (danhSachAnh.length === 0) {
// //             htmlAnh = `<div style="padding: 30px; text-align: center; color: #dc3545;">⚠️ Học sinh này nộp bài nhưng không đính kèm ảnh nào!</div>`;
// //         } else {
// //             htmlAnh = danhSachAnh.map((url, idx) => {
// //                 // Chuyển link file/d/.../view thành dạng file/d/.../preview để nhúng iframe
// //                 let iframeSrc = url;
// //                 const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
// //                 if (match && match[1]) {
// //                     iframeSrc = `https://drive.google.com/file/d/${match[1]}/preview`;
// //                 }

// //                 return `
// //                     <div style="margin-bottom: 25px; border: 2px solid #dee2e6; border-radius: 8px; padding: 10px; background: #f8f9fa;">
// //                         <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
// //                             <span style="font-weight: bold; background: #1a73e8; color: white; padding: 4px 10px; border-radius: 12px; font-size: 14px;">Trang ${idx + 1}</span>
// //                             <a href="${url}" target="_blank" style="font-size: 12px; color: #1a73e8; text-decoration: none; font-weight: bold;">Mở tab mới ↗️</a>
// //                         </div>
// //                         <div style="position: relative; width: 100%; height: 600px; overflow: hidden; border-radius: 4px;">
// //                             <iframe src="${iframeSrc}" width="100%" height="100%" style="border: none;" allow="autoplay"></iframe>
// //                         </div>
// //                     </div>
// //                 `;
// //             }).join('');
// //         }

        
// //         // Dữ liệu cũ (nếu chấm lại)
// //         const diemCu = baiNop.tong_diem !== null ? baiNop.tong_diem : '';
// //         const nhanXetCu = baiNop.nhan_xet_gv || ''; // <--- SỬA CHỮ NÀY

// //         // 4. Vẽ giao diện chia 2 cột
// //         vungHienThi.innerHTML = `
// //             <div style="max-width: 1300px; margin: 0 auto; padding: 20px;">
// //                 <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; border-bottom: 2px solid #e9ecef; padding-bottom: 10px;">
// //                     <h2 style="color: #6f42c1; margin: 0;">✍️ CHẤM BÀI TỰ LUẬN</h2>
// //                     <button onclick="ham_16_5_mo_danh_sach_cham_tu_luan('${baiNop.ma_nhiem_vu}', '')" style="padding: 10px 20px; background: #6c757d; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">
// //                         ⬅️ QUAY LẠI DANH SÁCH
// //                     </button>
// //                 </div>

// //                 <div style="display: flex; gap: 20px; flex-wrap: wrap;">
// //                     <div style="flex: 1 1 65%; min-width: 300px; max-height: 80vh; overflow-y: auto; background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); border: 1px solid #dee2e6;">
// //                         <h3 style="margin-top: 0; color: #495057;">📸 Bài làm của: <span style="color:#1a73e8;">${tenHocSinh}</span></h3>
// //                         ${htmlAnh}
// //                     </div>

// //                     <div style="flex: 1 1 30%; min-width: 250px; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); border: 1px solid #dee2e6; height: fit-content; position: sticky; top: 20px;">
// //                         <h3 style="margin-top: 0; color: #d35400; border-bottom: 1px solid #eee; padding-bottom: 10px;">Bảng điểm</h3>
                        
// //                         <div style="margin-bottom: 20px;">
// //                             <label style="font-weight: bold; display: block; margin-bottom: 8px; color: #333;">Điểm số (Hệ số 10):</label>
// //                             <input type="number" id="input_diem_tu_luan" value="${diemCu}" step="0.25" min="0" max="10" placeholder="VD: 8.5" style="width: 100%; padding: 12px; font-size: 24px; font-weight: bold; color: #d35400; border: 2px solid #1a73e8; border-radius: 6px; text-align: center; box-sizing: border-box;">
// //                         </div>

// //                         <div style="margin-bottom: 20px;">
// //                             <label style="font-weight: bold; display: block; margin-bottom: 8px; color: #333;">Lời phê của thầy:</label>
// //                             <textarea id="input_nhan_xet_tu_luan" rows="5" placeholder="Gõ nhận xét vào đây..." style="width: 100%; padding: 10px; font-size: 14px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; resize: vertical; font-family: inherit;">${nhanXetCu}</textarea>
// //                         </div>

// //                         <button onclick="ham_16_7_luu_diem_tu_luan('${baiNop.id}', '${baiNop.ma_nhiem_vu}')" style="width: 100%; padding: 15px; background: #28a745; color: white; border: none; border-radius: 6px; font-weight: 900; font-size: 16px; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#218838'" onmouseout="this.style.background='#28a745'">
// //                             💾 LƯU ĐIỂM
// //                         </button>
// //                     </div>
// //                 </div>
// //             </div>
// //         `;
// //     } catch (error) {
// //         vungHienThi.innerHTML = `<div style="text-align:center; padding: 50px;"><h3 style="color:red;">❌ Lỗi: ${error.message}</h3><button onclick="ham_16_8_quay_lai_quan_ly()" style="padding: 8px 15px;">Quay lại</button></div>`;
// //     }
// // };

// // ==============================================================
// // Hàm 16.6: Giao diện chi tiết phòng chấm bài (Xem ảnh & Nhập điểm)
// // ==============================================================
// window.ham_16_6_mo_giao_dien_cham = async function(idBaiNop) {
//     const vungHienThi = document.getElementById('dashboard-container') || document.getElementById('app');
//     vungHienThi.innerHTML = `<div style="text-align: center; padding: 50px; font-size: 18px; color: #1a73e8;">⏳ Đang tải dữ liệu bài làm...</div>`;

//     try {
//         // 1. Lấy dữ liệu bài nộp
//         const { data: baiNop, error: errKQ } = await _supabase
//             .from('ket_qua_thi')
//             .select('*')
//             .eq('id', idBaiNop)
//             .single();
//         if (errKQ || !baiNop) throw new Error("Không tìm thấy dữ liệu bài nộp này!");

//         // 2. Lấy tên học sinh để hiển thị
//         const { data: hs } = await _supabase.from('hoc_sinh').select('ten').eq('uid', baiNop.uid_hoc_sinh).single();
//         const tenHocSinh = hs ? hs.ten : "Học sinh không xác định";

//         // 3. Xử lý danh sách link ảnh (DÙNG ẢNH THUMBNAIL ĐỂ TRÁNH BỊ GOOGLE CHẶN)
//         const danhSachAnh = baiNop.chi_tiet_lam_bai?.danh_sach_link_anh || [];
//         let htmlAnh = "";
        
//         if (danhSachAnh.length === 0) {
//             htmlAnh = `<div style="padding: 30px; text-align: center; color: #dc3545;">⚠️ Học sinh này nộp bài nhưng không đính kèm ảnh nào!</div>`;
//         } else {
//             htmlAnh = danhSachAnh.map((url, idx) => {
//                 let imgSrc = url;
//                 const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
//                 if (match && match[1]) {
//                     // Dùng API Thumbnail của Drive ép kích thước lớn (w1200)
//                     imgSrc = `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1200`;
//                 }

//                 return `
//                     <div style="margin-bottom: 25px; border: 2px solid #dee2e6; border-radius: 8px; padding: 10px; background: #f8f9fa;">
//                         <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
//                             <span style="font-weight: bold; background: #1a73e8; color: white; padding: 4px 10px; border-radius: 12px; font-size: 14px;">Trang ${idx + 1}</span>
//                             <a href="${url}" target="_blank" style="font-size: 12px; color: #1a73e8; text-decoration: none; font-weight: bold;">Mở tab mới ↗️</a>
//                         </div>
//                         <div style="width: 100%; text-align: center; background: white; border: 1px solid #eee; border-radius: 4px; padding: 5px; min-height: 200px;">
//                             <img src="${imgSrc}" 
//                                  referrerpolicy="no-referrer" 
//                                  style="max-width: 100%; height: auto; display: block; margin: 0 auto; border-radius: 4px;" 
//                                  alt="Trang ${idx + 1}"
//                                  onerror="this.onerror=null; this.src='https://placehold.co/700x400/f8d7da/721c24?text=Loi+hien+thi+-+Vui+long+bam+Mo+tab+moi';">
//                         </div>
//                     </div>
//                 `;
//             }).join('');
//         }

//         // Dữ liệu cũ (nếu chấm lại)
//         const diemCu = baiNop.tong_diem !== null ? baiNop.tong_diem : '';
//         const nhanXetCu = baiNop.nhan_xet_gv || ''; // Lấy đúng tên cột nhận xét

//         // 4. Vẽ giao diện chia 2 cột
//         vungHienThi.innerHTML = `
//             <div style="max-width: 1300px; margin: 0 auto; padding: 20px;">
//                 <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; border-bottom: 2px solid #e9ecef; padding-bottom: 10px;">
//                     <h2 style="color: #6f42c1; margin: 0;">✍️ CHẤM BÀI TỰ LUẬN</h2>
//                     <button onclick="ham_16_5_mo_danh_sach_cham_tu_luan('${baiNop.ma_nhiem_vu}', '')" style="padding: 10px 20px; background: #6c757d; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">
//                         ⬅️ QUAY LẠI DANH SÁCH
//                     </button>
//                 </div>

//                 <div style="display: flex; gap: 20px; flex-wrap: wrap;">
//                     <div style="flex: 1 1 65%; min-width: 300px; max-height: 80vh; overflow-y: auto; background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); border: 1px solid #dee2e6;">
//                         <h3 style="margin-top: 0; color: #495057;">📸 Bài làm của: <span style="color:#1a73e8;">${tenHocSinh}</span></h3>
//                         ${htmlAnh}
//                     </div>

//                     <div style="flex: 1 1 30%; min-width: 250px; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); border: 1px solid #dee2e6; height: fit-content; position: sticky; top: 20px;">
//                         <h3 style="margin-top: 0; color: #d35400; border-bottom: 1px solid #eee; padding-bottom: 10px;">Bảng điểm</h3>
                        
//                         <div style="margin-bottom: 20px;">
//                             <label style="font-weight: bold; display: block; margin-bottom: 8px; color: #333;">Điểm số (Hệ số 10):</label>
//                             <input type="number" id="input_diem_tu_luan" value="${diemCu}" step="0.25" min="0" max="10" placeholder="VD: 8.5" style="width: 100%; padding: 12px; font-size: 24px; font-weight: bold; color: #d35400; border: 2px solid #1a73e8; border-radius: 6px; text-align: center; box-sizing: border-box;">
//                         </div>

//                         <div style="margin-bottom: 20px;">
//                             <label style="font-weight: bold; display: block; margin-bottom: 8px; color: #333;">Lời phê của thầy:</label>
//                             <textarea id="input_nhan_xet_tu_luan" rows="5" placeholder="Gõ nhận xét vào đây..." style="width: 100%; padding: 10px; font-size: 14px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; resize: vertical; font-family: inherit;">${nhanXetCu}</textarea>
//                         </div>

//                         <button onclick="ham_16_7_luu_diem_tu_luan('${baiNop.id}', '${baiNop.ma_nhiem_vu}')" style="width: 100%; padding: 15px; background: #28a745; color: white; border: none; border-radius: 6px; font-weight: 900; font-size: 16px; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#218838'" onmouseout="this.style.background='#28a745'">
//                             💾 LƯU ĐIỂM
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         `;
//     } catch (error) {
//         vungHienThi.innerHTML = `<div style="text-align:center; padding: 50px;"><h3 style="color:red;">❌ Lỗi: ${error.message}</h3><button onclick="ham_16_8_quay_lai_quan_ly()" style="padding: 8px 15px;">Quay lại</button></div>`;
//     }
// };

// // ==============================================================
// // Hàm 16.7: Xử lý Ghi điểm vào Database
// // ==============================================================
// window.ham_16_7_luu_diem_tu_luan = async function(idBaiNop, maNhiemVu) {
//     const diemStr = document.getElementById('input_diem_tu_luan').value;
//     const nhanXet = document.getElementById('input_nhan_xet_tu_luan').value;

//     if (diemStr === '') return alert("⚠️ Thầy chưa nhập điểm kìa!");
    
//     const diemSo = parseFloat(diemStr);
//     if (diemSo < 0 || diemSo > 10) return alert("⚠️ Điểm số phải nằm trong khoảng từ 0 đến 10!");

//     const nutLuu = event.currentTarget;
//     nutLuu.innerText = "⏳ ĐANG LƯU...";
//     nutLuu.disabled = true;

//     try {
//         const { error } = await _supabase
//             .from('ket_qua_thi')
//             .update({
//                 tong_diem: diemSo,
//                 nhan_xet_gv: nhanXet.trim(),
//                 trang_thai_cham: 1 // Chuyển trạng thái sang Đã chấm
//             })
//             .eq('id', idBaiNop);

//         if (error) throw error;

//         // Lưu xong thì quay lại bảng danh sách học sinh của lớp đó
//         ham_16_5_mo_danh_sach_cham_tu_luan(maNhiemVu, '');

//     } catch (error) {
//         alert("❌ Lỗi khi lưu điểm: " + error.message);
//         nutLuu.innerText = "💾 LƯU ĐIỂM";
//         nutLuu.disabled = false;
//     }
// };


// window.ham_16_8_quay_lai_quan_ly = function() {
//     const vungHienThi = document.getElementById('dashboard-container') || document.getElementById('app');
    
//     // 🌟 CHỈ CẦN TẠO LẠI ĐÚNG CÁI THẺ DIV MÀ DÒNG 57 ĐANG TÌM LÀ ĐƯỢC
//     vungHienThi.innerHTML = `
//         <div id="vung-lam-viec-chi-tiet"></div> 
//     `;

//    if (typeof ham_7_1_ve_quan_ly_nhiem_vu === 'function') {
//         ham_7_1_ve_quan_ly_nhiem_vu(); // ✅ ĐÚNG: Phải gọi hàm vẽ của Khối 7
//     }
// };



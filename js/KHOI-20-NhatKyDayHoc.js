

// // =====================================================================
// // KHỐI 20: TIỆN ÍCH - NHẬT KÝ DẠY HỌC (GIAO DIỆN CHÍNH)
// // =====================================================================
// window.ham_20_1_mo_giao_dien_nhat_ky_day_hoc = function () {
//     const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
//     if (!vungLamViec) return;

//     const today = new Date().toISOString().split('T')[0];

//     vungLamViec.innerHTML = `
//         <div style="padding: 10px; animation: fadeIn 0.3s ease-in-out;">
            
//             <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #17a2b8; padding-bottom: 10px; margin-bottom: 20px;">
//                 <h3 style="color: #17a2b8; margin: 0; text-transform: uppercase; display: flex; align-items: center; gap: 10px;">
//                     📔 Nhật Ký Dạy Học
//                 </h3>
                
//                 <div style="display: flex; gap: 10px;">
//                     <button onclick="ham_20_14_giao_dien_tra_cuu()" style="padding: 6px 15px; background: #ffc107; color: #000; border: 1px solid #d39e00; border-radius: 4px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: 0.2s;">
//                         🔍 Tìm lại Nhật ký
//                     </button>
                    
//                     <button onclick="ham_3_1_ve_dashboard_admin()" style="padding: 6px 15px; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
//                         ⬅️ Quay lại
//                     </button>
//                 </div>
//             </div>

//             <!-- THÔNG TIN CHUNG -->
//             <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border: 1px solid #ced4da; box-shadow: 0 2px 4px rgba(0,0,0,0.02); margin-bottom: 20px;">
//                 <h4 style="margin: 0 0 15px 0; color: #495057;">🕒 1. Thông tin chung của tiết học</h4>
//                 <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 15px;">
//                     <div>
//                         <label style="font-weight: bold; font-size: 13px; color: #6c757d;">Ngày dạy:</label>
//                         <input type="date" value="${today}" style="width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; font-weight: bold; color: #0056b3; outline: none;">
//                     </div>
//                     <div>
//                         <label style="font-weight: bold; font-size: 13px; color: #6c757d;">Buổi:</label>
//                         <input id="nk-input-buoi" list="dl-buoi" onfocus="this.dataset.old = this.value; this.value='';" onblur="if(!this.value) this.value = this.dataset.old;" placeholder="Chọn / Gõ..." style="width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; outline: none;">
//                         <datalist id="dl-buoi"><option value="Sáng"></option><option value="Chiều"></option><option value="Tối"></option></datalist>
//                     </div>
//                     <div>
//                         <label style="font-weight: bold; font-size: 13px; color: #6c757d;">Tiết:</label>
//                         <input id="nk-input-tiet" list="dl-tiet" onfocus="this.dataset.old = this.value; this.value='';" onblur="if(!this.value) this.value = this.dataset.old;" placeholder="Chọn / Gõ..." style="width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; outline: none;">
//                         <datalist id="dl-tiet"><option value="Tiết 1"></option><option value="Tiết 2"></option><option value="Tiết 3"></option><option value="Tiết 4"></option><option value="Tiết 5"></option></datalist>
//                     </div>
//                     <div>
//                         <label style="font-weight: bold; font-size: 13px; color: #6c757d;">Lớp:</label>
//                         <input id="nk-input-lop" list="dl-lop" onchange="ham_20_2_tai_danh_sach_hs_theo_lop()" placeholder="VD: 12TN6..." style="width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; font-weight: bold; color: #0056b3; outline: none;">
//                         <datalist id="dl-lop"></datalist>
//                         <datalist id="nk-dl-hs"></datalist>
//                     </div>
//                     <div>
//                         <label style="font-weight: bold; font-size: 13px; color: #6c757d;">Phân môn:</label>
//                         <input id="nk-input-mon" list="dl-mon" onfocus="this.dataset.old = this.value; this.value='';" onblur="if(!this.value) this.value = this.dataset.old;" placeholder="Chọn / Gõ..." style="width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; outline: none;">
//                         <datalist id="dl-mon"><option value="Đại số"></option><option value="Hình học"></option><option value="Thống kê xác suất"></option><option value="Hoạt động trải nghiệm"></option></datalist>
//                     </div>
//                 </div>
//             </div>

//             <div style="display: flex; gap: 20px; flex-wrap: wrap;">
                
//                 <!-- CỘT TRÁI: BÀI GIẢNG -->
//                 <div style="flex: 1.5; min-width: 400px; display: flex; flex-direction: column; gap: 20px; background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #dee2e6; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
//                     <div>
//                         <h4 style="margin: 0 0 15px 0; color: #0056b3;">📝 2. Nội dung bài giảng</h4>
//                         <label style="font-weight: bold; font-size: 13px; color: #495057;">Tên bài / Chủ đề:</label>
//                         <input id="nk-input-ten-bai" type="text" placeholder="Nhập tên bài học / chủ đề..." style="width: 100%; padding: 10px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; margin-bottom: 15px; font-weight: bold; color: #0056b3; outline: none;">

//                         <label style="font-weight: bold; font-size: 13px; color: #495057;">Nội dung chủ đề / Lý thuyết:</label>
//                         <textarea placeholder="Ghi chú nhanh lý thuyết đã dạy..." style="width: 100%; padding: 10px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; margin-bottom: 15px; resize: vertical; min-height: 60px; font-family: inherit; outline: none;"></textarea>

//                         <label style="font-weight: bold; font-size: 13px; color: #495057;">Bài tập đã giải & Bài tập về nhà:</label>
//                         <textarea placeholder="VD: Giải BT 1,2 SGK. BTVN: Trắc nghiệm trang 45." style="width: 100%; padding: 10px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; margin-bottom: 15px; resize: vertical; min-height: 60px; font-family: inherit; outline: none;"></textarea>

//                         <label style="font-weight: bold; font-size: 13px; color: #17a2b8; display: block; margin-bottom: 8px;">📸 Lưu ảnh bảng giảng dạy:</label>
//                         <div style="display: flex; gap: 15px; align-items: flex-start;">
//                             <button type="button" id="btn-tai-anh-bai-giang" onclick="document.getElementById('nk-input-anh-bai-giang').click()" style="padding: 12px 20px; background: #e0f7fa; color: #00838f; border: 1px dashed #00acc1; border-radius: 6px; cursor: pointer; font-weight: bold; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 5px; transition: 0.2s; flex-shrink: 0;">
//                                 <span style="font-size: 24px;">📷</span><span>Tải ảnh lên</span>
//                             </button>
//                             <!-- Đã bỏ thuộc tính capture="environment" để cho phép chọn ảnh từ thư viện -->
//                             <input type="file" id="nk-input-anh-bai-giang" accept="image/*" multiple style="display: none;">
//                             <div id="vung-hien-thi-anh-bang" style="flex: 1; min-height: 70px; border: 1px dashed #ccc; border-radius: 6px; display: flex; align-items: center; justify-content: flex-start; color: #adb5bd; font-size: 13px; font-style: italic; background: #fafafa; padding: 8px; gap: 10px; overflow-x: auto;">
//                                 <span id="text-cho-anh">(Ảnh chụp bảng bài dạy sẽ xuất hiện tại đây...)</span>
//                             </div>
//                         </div>
//                     </div>

//                     <div style="background: #fff3cd; padding: 15px; border-radius: 8px; border: 1px solid #ffeeba;">
//                         <h4 style="margin: 0 0 10px 0; color: #856404;">📌 3. Dặn dò / Nhắc việc tiết sau</h4>
//                         <textarea placeholder="VD: Tiết sau kiểm tra 15 phút..." style="width: 100%; padding: 10px; border: 1px solid #f5c6cb; border-radius: 4px; box-sizing: border-box; resize: vertical; min-height: 60px; font-family: inherit; background: #fffcf8; color: #856404; font-weight: bold; outline: none;"></textarea>
//                     </div>

//                     <div style="margin-top: auto; padding-top: 20px; border-top: 1px dashed #dee2e6; text-align: right;">
//                         <button onclick="ham_20_6a_luu_bai_giang(this)" style="padding: 12px 25px; background: #007bff; color: white; border: none; border-radius: 6px; font-weight: bold; font-size: 14px; cursor: pointer; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: 0.2s;" onmouseover="this.style.background='#0056b3'" onmouseout="this.style.background='#007bff'">
//                             💾 1. LƯU NỘI DUNG BÀI GIẢNG
//                         </button>
//                     </div>
//                 </div>

//                 <!-- CỘT PHẢI: HỌC SINH -->
//                 <div style="flex: 1; min-width: 350px; display: flex; flex-direction: column; gap: 20px; background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #dee2e6; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                    
//                     <div>
//                         <h4 style="margin: 0 0 15px 0; color: #dc3545;">📋 4. Điểm danh (Học sinh vắng)</h4>
//                         <div id="nk-khu-vuc-diem-danh" style="display: flex; flex-direction: column; margin-bottom: 15px;">
//                             <div class="dong-hs-vang" style="display: flex; gap: 8px; align-items: center;">
//                                 <input class="nk-input-hs-vang" list="nk-dl-hs" placeholder="Chọn hoặc gõ tên HS vắng..." style="flex: 1; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; outline: none; font-size: 13px;">
//                                 <button onclick="this.parentElement.remove()" style="padding: 8px 12px; background: #f8d7da; color: #721c24; border: none; border-radius: 4px; cursor: pointer;" title="Xóa dòng này">✖</button>
//                             </div>
//                         </div>
//                         <button onclick="ham_20_12_them_dong_vang()" style="width: 100%; padding: 8px; background: #f8f9fa; border: 1px dashed #dc3545; color: #dc3545; border-radius: 4px; cursor: pointer; font-weight: bold; transition: 0.2s;" onmouseover="this.style.background='#f5c6cb'" onmouseout="this.style.background='#f8f9fa'">
//                             ➕ Thêm học sinh vắng
//                         </button>
//                     </div>

//                     <div style="flex: 1; display: flex; flex-direction: column; padding-top: 15px; border-top: 1px dashed #eee;">
//                         <h4 style="margin: 0 0 15px 0; color: #d35400;">🎯 5. Ghi nhận sự kiện học sinh</h4>
                        
//                         <div style="margin-bottom: 15px;">
//                             <label style="font-weight: bold; font-size: 13px; color: #495057;">Chọn học sinh (Có thể thêm nhóm):</label>
//                             <div id="nk-khu-vuc-hs-su-kien" style="display: flex; flex-direction: column; gap: 8px; margin-top: 5px;">
//                                 <div class="dong-hs-su-kien" style="display: flex; gap: 8px; align-items: center;">
//                                     <input class="nk-input-hs-su-kien" list="nk-dl-hs" placeholder="Gõ tên để tìm nhanh..." style="flex: 1; padding: 10px; border: 2px solid #fd7e14; border-radius: 6px; box-sizing: border-box; font-weight: bold; outline: none;">
//                                     <button onclick="this.parentElement.remove()" style="padding: 10px 12px; background: #f8d7da; color: #721c24; border: none; border-radius: 6px; cursor: pointer;" title="Xóa dòng này">✖</button>
//                                 </div>
//                             </div>
//                             <button onclick="ham_20_13_them_dong_hs_su_kien()" style="margin-top: 8px; width: 100%; padding: 8px; background: #fff; border: 1px dashed #fd7e14; color: #fd7e14; border-radius: 4px; cursor: pointer; font-weight: bold; transition: 0.2s;" onmouseover="this.style.background='#ffe8d6'" onmouseout="this.style.background='#fff'">
//                                 ➕ Thêm học sinh cùng sự kiện
//                             </button>
//                         </div>
                        
//                         <div style="margin-bottom: 15px;">
//                             <label style="font-weight: bold; font-size: 13px; color: #495057;">Ghi chú thêm (hoặc nhập tự do):</label>
//                             <input id="nk-input-ghi-chu" type="text" placeholder="VD: Bấm điện thoại dưới hộc bàn..." onkeydown="if(event.key === 'Enter') ham_20_3_gan_the('Khác', '#000')" style="width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; margin-top: 5px; outline: none;">
                            
//                             <button onclick="ham_20_3_gan_the('Khác', '#000')" style="margin-top: 8px; width: 100%; padding: 8px; font-size: 12px; background: #343a40; border: none; color: #fff; border-radius: 4px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: 0.2s;" onmouseover="this.style.background='#23272b'" onmouseout="this.style.background='#343a40'">
//                                 ➕ Ghi nhận sự kiện từ ô ghi chú này
//                             </button>
//                         </div>

//                         <div style="margin-bottom: 15px;">
//                             <label style="font-weight: bold; font-size: 13px; color: #495057; display: block; margin-bottom: 5px;">Bấm chọn để gắn thẻ nhanh:</label>
//                             <div id="nk-khu-vuc-tags"><span style="font-size: 12px; color: #999;">⏳ Đang tải...</span></div>
//                         </div>

//                         <!-- 🌟 NÚT TẢI ẢNH MINH CHỨNG HS -->
//                         <div style="margin-bottom: 15px;">
//                             <label style="font-weight: bold; font-size: 13px; color: #495057; display: block; margin-bottom: 8px;">📸 Ảnh minh chứng (Nếu có):</label>
//                             <div style="display: flex; gap: 15px; align-items: flex-start;">
//                                 <button type="button" onclick="document.getElementById('nk-input-anh-minh-chung').click()" style="padding: 10px 15px; background: #f8f9fa; color: #495057; border: 1px dashed #adb5bd; border-radius: 6px; cursor: pointer; font-weight: bold; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 5px; transition: 0.2s; flex-shrink: 0;" onmouseover="this.style.background='#e9ecef'" onmouseout="this.style.background='#f8f9fa'">
//                                     <span style="font-size: 20px;">📷</span><span>Tải ảnh lên</span>
//                                 </button>
//                                 <!-- Đã bỏ thuộc tính capture="environment" để cho phép chọn ảnh từ thư viện -->
//                                 <input type="file" id="nk-input-anh-minh-chung" accept="image/*" multiple style="display: none;">
//                                 <div id="vung-preview-anh-minh-chung" style="flex: 1; min-height: 65px; border: 1px dashed #ccc; border-radius: 6px; display: flex; align-items: center; justify-content: flex-start; color: #adb5bd; font-size: 12px; font-style: italic; background: #fafafa; padding: 8px; gap: 8px; overflow-x: auto;">
//                                     <span id="text-cho-anh-mc">(Ảnh minh chứng xuất hiện tại đây...)</span>
//                                 </div>
//                             </div>
//                         </div>

//                         <div style="width: 100%; margin-bottom: 15px; padding: 10px; background: #e8f5e9; border: 1px dashed #28a745; border-radius: 6px; display: flex; gap: 8px; align-items: center; box-shadow: inset 0 1px 3px rgba(0,0,0,0.05); box-sizing: border-box;">
//                             <span style="font-size: 16px;" title="Cho điểm học sinh">💯</span>
//                             <input type="number" id="nk-input-diem-so" placeholder="Nhập điểm..." step="0.25" min="0" max="10" 
//                                 onkeydown="if(event.key === 'Enter') document.getElementById('btn-ghi-diem').click()" 
//                                 style="flex: 1; min-width: 80px; padding: 8px 10px; border: 1px solid #28a745; border-radius: 4px; outline: none; font-weight: bold; color: #155724; font-size: 13px;">
//                             <button id="btn-ghi-diem" 
//                                 onclick="let diem = document.getElementById('nk-input-diem-so').value; if(!diem){alert('Vui lòng nhập điểm!'); return;} ham_20_3_gan_the('Cho điểm: ' + diem + ' đ', '#28a745'); document.getElementById('nk-input-diem-so').value='';" 
//                                 style="padding: 8px 12px; font-size: 12px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; transition: 0.2s; white-space: nowrap;" 
//                                 onmouseover="this.style.background='#218838'" onmouseout="this.style.background='#28a745'">
//                                 Nhập điểm chờ lưu
//                             </button>
//                         </div>

//                         <div style="flex: 1; background: #f8f9fa; border: 1px dashed #ccc; border-radius: 6px; padding: 10px; overflow-y: auto; max-height: 200px;">
//                             <div style="font-size: 12px; font-weight: bold; color: #6c757d; margin-bottom: 10px; border-bottom: 1px solid #eee; padding-bottom: 5px;">Sự kiện chờ lưu (<span id="nk-dem-su-kien">0</span>):</div>
//                             <div id="nk-danh-sach-cho-luu"><i style="color: #adb5bd; font-size: 12px;">Chưa có sự kiện nào...</i></div>
//                         </div>
//                     </div>

//                     <div style="margin-top: auto; padding-top: 20px; border-top: 1px dashed #dee2e6; text-align: right;">
//                         <button onclick="ham_20_6b_luu_su_kien_diem_danh(this)" style="padding: 12px 25px; background: #28a745; color: white; border: none; border-radius: 6px; font-weight: bold; font-size: 14px; cursor: pointer; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: 0.2s;" onmouseover="this.style.background='#218838'" onmouseout="this.style.background='#28a745'">
//                             🎯 2. LƯU ĐIỂM DANH & SỰ KIỆN
//                         </button>
//                     </div>
//                 </div>

//             </div>
//         </div>
//     `;

//     if (typeof ham_20_7_tai_danh_sach_lop === 'function') ham_20_7_tai_danh_sach_lop();
//     if (typeof ham_20_8_tai_danh_sach_the === 'function') ham_20_8_tai_danh_sach_the();
//     if (typeof ham_20_11b_kich_hoat_preview_anh === 'function') ham_20_11b_kich_hoat_preview_anh();
//     if (typeof ham_20_22_kich_hoat_preview_anh_minh_chung === 'function') ham_20_22_kich_hoat_preview_anh_minh_chung();
// };


// // =====================================================================
// // KHỐI 20: TIỆN ÍCH - NHẬT KÝ DẠY HỌC (GIAO DIỆN CHÍNH ĐÃ CẬP NHẬT)
// // =====================================================================
// window.ham_20_1_mo_giao_dien_nhat_ky_day_hoc = function () {
//     const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
//     if (!vungLamViec) return;

//     const today = new Date().toISOString().split('T')[0];

//     vungLamViec.innerHTML = `
//         <div style="padding: 10px; animation: fadeIn 0.3s ease-in-out;">
            
//             <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #17a2b8; padding-bottom: 10px; margin-bottom: 20px;">
//                 <h3 style="color: #17a2b8; margin: 0; text-transform: uppercase; display: flex; align-items: center; gap: 10px;">
//                     📔 Nhật Ký Dạy Học
//                 </h3>
                
//                 <div style="display: flex; gap: 10px;">
//                     <button onclick="ham_20_14_giao_dien_tra_cuu()" style="padding: 6px 15px; background: #ffc107; color: #000; border: 1px solid #d39e00; border-radius: 4px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: 0.2s;">
//                         🔍 Tìm lại Nhật ký
//                     </button>
                    
//                     <button onclick="ham_3_1_ve_dashboard_admin()" style="padding: 6px 15px; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
//                         ⬅️ Quay lại
//                     </button>
//                 </div>
//             </div>

//             <!-- THÔNG TIN CHUNG (Thêm sự kiện Onchange) -->
//             <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border: 1px solid #ced4da; box-shadow: 0 2px 4px rgba(0,0,0,0.02); margin-bottom: 20px;">
//                 <h4 style="margin: 0 0 15px 0; color: #495057;">🕒 1. Thông tin chung của tiết học</h4>
//                 <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 15px;">
//                     <div>
//                         <label style="font-weight: bold; font-size: 13px; color: #6c757d;">Ngày dạy:</label>
//                         <input type="date" value="${today}" onchange="if(typeof ham_20_27_kiem_tra_tiet_da_luu === 'function') ham_20_27_kiem_tra_tiet_da_luu();" style="width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; font-weight: bold; color: #0056b3; outline: none;">
//                     </div>
//                     <div>
//                         <label style="font-weight: bold; font-size: 13px; color: #6c757d;">Buổi:</label>
//                         <input id="nk-input-buoi" list="dl-buoi" onchange="if(typeof ham_20_27_kiem_tra_tiet_da_luu === 'function') ham_20_27_kiem_tra_tiet_da_luu();" onfocus="this.dataset.old = this.value; this.value='';" onblur="if(!this.value) this.value = this.dataset.old;" placeholder="Chọn / Gõ..." style="width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; outline: none;">
//                         <datalist id="dl-buoi"><option value="Sáng"></option><option value="Chiều"></option><option value="Tối"></option></datalist>
//                     </div>
//                     <div>
//                         <label style="font-weight: bold; font-size: 13px; color: #6c757d;">Tiết:</label>
//                         <input id="nk-input-tiet" list="dl-tiet" onchange="if(typeof ham_20_27_kiem_tra_tiet_da_luu === 'function') ham_20_27_kiem_tra_tiet_da_luu();" onfocus="this.dataset.old = this.value; this.value='';" onblur="if(!this.value) this.value = this.dataset.old;" placeholder="Chọn / Gõ..." style="width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; outline: none;">
//                         <datalist id="dl-tiet"><option value="Tiết 1"></option><option value="Tiết 2"></option><option value="Tiết 3"></option><option value="Tiết 4"></option><option value="Tiết 5"></option></datalist>
//                     </div>
//                     <div>
//                         <label style="font-weight: bold; font-size: 13px; color: #6c757d;">Lớp:</label>
//                         <input id="nk-input-lop" list="dl-lop" onchange="ham_20_2_tai_danh_sach_hs_theo_lop(); if(typeof ham_20_27_kiem_tra_tiet_da_luu === 'function') ham_20_27_kiem_tra_tiet_da_luu();" placeholder="VD: 12TN6..." style="width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; font-weight: bold; color: #0056b3; outline: none;">
//                         <datalist id="dl-lop"></datalist>
//                         <datalist id="nk-dl-hs"></datalist>
//                     </div>
//                     <div>
//                         <label style="font-weight: bold; font-size: 13px; color: #6c757d;">Phân môn:</label>
//                         <input id="nk-input-mon" list="dl-mon" onfocus="this.dataset.old = this.value; this.value='';" onblur="if(!this.value) this.value = this.dataset.old;" placeholder="Chọn / Gõ..." style="width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; outline: none;">
//                         <datalist id="dl-mon"><option value="Đại số"></option><option value="Hình học"></option><option value="Thống kê xác suất"></option><option value="Hoạt động trải nghiệm"></option></datalist>
//                     </div>
//                 </div>
//             </div>

//             <div style="display: flex; gap: 20px; flex-wrap: wrap;">
                
//                 <!-- CỘT TRÁI: BÀI GIẢNG -->
//                 <div style="flex: 1.5; min-width: 400px; display: flex; flex-direction: column; gap: 20px; background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #dee2e6; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
//                     <div>
//                         <h4 style="margin: 0 0 15px 0; color: #0056b3;">📝 2. Nội dung bài giảng</h4>
//                         <label style="font-weight: bold; font-size: 13px; color: #495057;">Tên bài / Chủ đề:</label>
//                         <input id="nk-input-ten-bai" type="text" placeholder="Nhập tên bài học / chủ đề..." style="width: 100%; padding: 10px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; margin-bottom: 15px; font-weight: bold; color: #0056b3; outline: none;">

//                         <label style="font-weight: bold; font-size: 13px; color: #495057;">Nội dung chủ đề / Lý thuyết:</label>
//                         <textarea placeholder="Ghi chú nhanh lý thuyết đã dạy..." style="width: 100%; padding: 10px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; margin-bottom: 15px; resize: vertical; min-height: 60px; font-family: inherit; outline: none;"></textarea>

//                         <label style="font-weight: bold; font-size: 13px; color: #495057;">Bài tập đã giải & Bài tập về nhà:</label>
//                         <textarea placeholder="VD: Giải BT 1,2 SGK. BTVN: Trắc nghiệm trang 45." style="width: 100%; padding: 10px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; margin-bottom: 15px; resize: vertical; min-height: 60px; font-family: inherit; outline: none;"></textarea>

//                         <label style="font-weight: bold; font-size: 13px; color: #17a2b8; display: block; margin-bottom: 8px;">📸 Lưu ảnh bảng giảng dạy:</label>
                        
//                         <!-- 🌟 KHU VỰC HIỂN THỊ ẢNH ĐÃ LƯU TRƯỚC ĐÓ -->
//                         <div id="vung-anh-bai-giang-da-luu" style="display: none; padding: 12px; background: #e8f5e9; border: 1px dashed #28a745; border-radius: 6px; margin-bottom: 15px; box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);"></div>

//                         <div style="display: flex; gap: 15px; align-items: flex-start;">
//                             <button type="button" id="btn-tai-anh-bai-giang" onclick="document.getElementById('nk-input-anh-bai-giang').click()" style="padding: 12px 20px; background: #e0f7fa; color: #00838f; border: 1px dashed #00acc1; border-radius: 6px; cursor: pointer; font-weight: bold; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 5px; transition: 0.2s; flex-shrink: 0;">
//                                 <span style="font-size: 24px;">📷</span><span>Tải ảnh lên</span>
//                             </button>
//                             <input type="file" id="nk-input-anh-bai-giang" accept="image/*" multiple style="display: none;">
//                             <div id="vung-hien-thi-anh-bang" style="flex: 1; min-height: 70px; border: 1px dashed #ccc; border-radius: 6px; display: flex; align-items: center; justify-content: flex-start; color: #adb5bd; font-size: 13px; font-style: italic; background: #fafafa; padding: 8px; gap: 10px; overflow-x: auto;">
//                                 <span id="text-cho-anh">(Ảnh bảng bổ sung sẽ xuất hiện tại đây...)</span>
//                             </div>
//                         </div>
//                     </div>

//                     <div style="background: #fff3cd; padding: 15px; border-radius: 8px; border: 1px solid #ffeeba;">
//                         <h4 style="margin: 0 0 10px 0; color: #856404;">📌 3. Dặn dò / Nhắc việc tiết sau</h4>
//                         <textarea placeholder="VD: Tiết sau kiểm tra 15 phút..." style="width: 100%; padding: 10px; border: 1px solid #f5c6cb; border-radius: 4px; box-sizing: border-box; resize: vertical; min-height: 60px; font-family: inherit; background: #fffcf8; color: #856404; font-weight: bold; outline: none;"></textarea>
//                     </div>

//                     <div style="margin-top: auto; padding-top: 20px; border-top: 1px dashed #dee2e6; text-align: right;">
//                         <button onclick="ham_20_6a_luu_bai_giang(this)" style="padding: 12px 25px; background: #007bff; color: white; border: none; border-radius: 6px; font-weight: bold; font-size: 14px; cursor: pointer; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: 0.2s;" onmouseover="this.style.background='#0056b3'" onmouseout="this.style.background='#007bff'">
//                             💾 1. LƯU NỘI DUNG BÀI GIẢNG
//                         </button>
//                     </div>
//                 </div>

//                 <!-- CỘT PHẢI: HỌC SINH -->
//                 <div style="flex: 1; min-width: 350px; display: flex; flex-direction: column; gap: 20px; background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #dee2e6; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                    
//                     <div>
//                         <h4 style="margin: 0 0 15px 0; color: #dc3545;">📋 4. Điểm danh (Học sinh vắng)</h4>
//                         <div id="nk-khu-vuc-diem-danh" style="display: flex; flex-direction: column; margin-bottom: 15px;">
//                             <div class="dong-hs-vang" style="display: flex; gap: 8px; align-items: center;">
//                                 <input class="nk-input-hs-vang" list="nk-dl-hs" placeholder="Chọn hoặc gõ tên HS vắng..." style="flex: 1; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; outline: none; font-size: 13px;">
//                                 <button onclick="this.parentElement.remove()" style="padding: 8px 12px; background: #f8d7da; color: #721c24; border: none; border-radius: 4px; cursor: pointer;" title="Xóa dòng này">✖</button>
//                             </div>
//                         </div>
//                         <button onclick="ham_20_12_them_dong_vang()" style="width: 100%; padding: 8px; background: #f8f9fa; border: 1px dashed #dc3545; color: #dc3545; border-radius: 4px; cursor: pointer; font-weight: bold; transition: 0.2s;" onmouseover="this.style.background='#f5c6cb'" onmouseout="this.style.background='#f8f9fa'">
//                             ➕ Thêm học sinh vắng
//                         </button>
//                     </div>

//                     <div style="flex: 1; display: flex; flex-direction: column; padding-top: 15px; border-top: 1px dashed #eee;">
//                         <h4 style="margin: 0 0 15px 0; color: #d35400;">🎯 5. Ghi nhận sự kiện học sinh</h4>
                        
//                         <div style="margin-bottom: 15px;">
//                             <label style="font-weight: bold; font-size: 13px; color: #495057;">Chọn học sinh (Có thể thêm nhóm):</label>
//                             <div id="nk-khu-vuc-hs-su-kien" style="display: flex; flex-direction: column; gap: 8px; margin-top: 5px;">
//                                 <div class="dong-hs-su-kien" style="display: flex; gap: 8px; align-items: center;">
//                                     <input class="nk-input-hs-su-kien" list="nk-dl-hs" placeholder="Gõ tên để tìm nhanh..." style="flex: 1; padding: 10px; border: 2px solid #fd7e14; border-radius: 6px; box-sizing: border-box; font-weight: bold; outline: none;">
//                                     <button onclick="this.parentElement.remove()" style="padding: 10px 12px; background: #f8d7da; color: #721c24; border: none; border-radius: 6px; cursor: pointer;" title="Xóa dòng này">✖</button>
//                                 </div>
//                             </div>
//                             <button onclick="ham_20_13_them_dong_hs_su_kien()" style="margin-top: 8px; width: 100%; padding: 8px; background: #fff; border: 1px dashed #fd7e14; color: #fd7e14; border-radius: 4px; cursor: pointer; font-weight: bold; transition: 0.2s;" onmouseover="this.style.background='#ffe8d6'" onmouseout="this.style.background='#fff'">
//                                 ➕ Thêm học sinh cùng sự kiện
//                             </button>
//                         </div>
                        
//                         <div style="margin-bottom: 15px;">
//                             <label style="font-weight: bold; font-size: 13px; color: #495057;">Ghi chú thêm (hoặc nhập tự do):</label>
//                             <input id="nk-input-ghi-chu" type="text" placeholder="VD: Bấm điện thoại dưới hộc bàn..." onkeydown="if(event.key === 'Enter') ham_20_3_gan_the('Khác', '#000')" style="width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; margin-top: 5px; outline: none;">
                            
//                             <button onclick="ham_20_3_gan_the('Khác', '#000')" style="margin-top: 8px; width: 100%; padding: 8px; font-size: 12px; background: #343a40; border: none; color: #fff; border-radius: 4px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: 0.2s;" onmouseover="this.style.background='#23272b'" onmouseout="this.style.background='#343a40'">
//                                 ➕ Ghi nhận sự kiện từ ô ghi chú này
//                             </button>
//                         </div>

//                         <div style="margin-bottom: 15px;">
//                             <label style="font-weight: bold; font-size: 13px; color: #495057; display: block; margin-bottom: 5px;">Bấm chọn để gắn thẻ nhanh:</label>
//                             <div id="nk-khu-vuc-tags"><span style="font-size: 12px; color: #999;">⏳ Đang tải...</span></div>
//                         </div>

//                         <div style="margin-bottom: 15px;">
//                             <label style="font-weight: bold; font-size: 13px; color: #495057; display: block; margin-bottom: 8px;">📸 Ảnh minh chứng (Nếu có):</label>
//                             <div style="display: flex; gap: 15px; align-items: flex-start;">
//                                 <button type="button" onclick="document.getElementById('nk-input-anh-minh-chung').click()" style="padding: 10px 15px; background: #f8f9fa; color: #495057; border: 1px dashed #adb5bd; border-radius: 6px; cursor: pointer; font-weight: bold; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 5px; transition: 0.2s; flex-shrink: 0;" onmouseover="this.style.background='#e9ecef'" onmouseout="this.style.background='#f8f9fa'">
//                                     <span style="font-size: 20px;">📷</span><span>Tải ảnh lên</span>
//                                 </button>
//                                 <input type="file" id="nk-input-anh-minh-chung" accept="image/*" multiple style="display: none;">
//                                 <div id="vung-preview-anh-minh-chung" style="flex: 1; min-height: 65px; border: 1px dashed #ccc; border-radius: 6px; display: flex; align-items: center; justify-content: flex-start; color: #adb5bd; font-size: 12px; font-style: italic; background: #fafafa; padding: 8px; gap: 8px; overflow-x: auto;">
//                                     <span id="text-cho-anh-mc">(Ảnh minh chứng xuất hiện tại đây...)</span>
//                                 </div>
//                             </div>
//                         </div>

//                         <div style="width: 100%; margin-bottom: 15px; padding: 10px; background: #e8f5e9; border: 1px dashed #28a745; border-radius: 6px; display: flex; gap: 8px; align-items: center; box-shadow: inset 0 1px 3px rgba(0,0,0,0.05); box-sizing: border-box;">
//                             <span style="font-size: 16px;" title="Cho điểm học sinh">💯</span>
//                             <input type="number" id="nk-input-diem-so" placeholder="Nhập điểm..." step="0.25" min="0" max="10" 
//                                 onkeydown="if(event.key === 'Enter') document.getElementById('btn-ghi-diem').click()" 
//                                 style="flex: 1; min-width: 80px; padding: 8px 10px; border: 1px solid #28a745; border-radius: 4px; outline: none; font-weight: bold; color: #155724; font-size: 13px;">
//                             <button id="btn-ghi-diem" 
//                                 onclick="let diem = document.getElementById('nk-input-diem-so').value; if(!diem){alert('Vui lòng nhập điểm!'); return;} ham_20_3_gan_the('Cho điểm: ' + diem + ' đ', '#28a745'); document.getElementById('nk-input-diem-so').value='';" 
//                                 style="padding: 8px 12px; font-size: 12px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; transition: 0.2s; white-space: nowrap;" 
//                                 onmouseover="this.style.background='#218838'" onmouseout="this.style.background='#28a745'">
//                                 Nhập điểm chờ lưu
//                             </button>
//                         </div>

//                         <div style="flex: 1; background: #f8f9fa; border: 1px dashed #ccc; border-radius: 6px; padding: 10px; overflow-y: auto; max-height: 200px;">
//                             <div style="font-size: 12px; font-weight: bold; color: #6c757d; margin-bottom: 10px; border-bottom: 1px solid #eee; padding-bottom: 5px;">Sự kiện chờ lưu (<span id="nk-dem-su-kien">0</span>):</div>
//                             <div id="nk-danh-sach-cho-luu"><i style="color: #adb5bd; font-size: 12px;">Chưa có sự kiện nào...</i></div>
//                         </div>
//                     </div>

//                     <div style="margin-top: auto; padding-top: 20px; border-top: 1px dashed #dee2e6; text-align: right;">
//                         <button onclick="ham_20_6b_luu_su_kien_diem_danh(this)" style="padding: 12px 25px; background: #28a745; color: white; border: none; border-radius: 6px; font-weight: bold; font-size: 14px; cursor: pointer; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: 0.2s;" onmouseover="this.style.background='#218838'" onmouseout="this.style.background='#28a745'">
//                             🎯 2. LƯU ĐIỂM DANH & SỰ KIỆN
//                         </button>
//                     </div>
//                 </div>

//             </div>
//         </div>
//     `;

//     if (typeof ham_20_7_tai_danh_sach_lop === 'function') ham_20_7_tai_danh_sach_lop();
//     if (typeof ham_20_8_tai_danh_sach_the === 'function') ham_20_8_tai_danh_sach_the();
//     if (typeof ham_20_11_kich_hoat_preview_anh === 'function') ham_20_11_kich_hoat_preview_anh();
//     if (typeof ham_20_22_kich_hoat_preview_anh_minh_chung === 'function') ham_20_22_kich_hoat_preview_anh_minh_chung();
// };


// // =====================================================================
// // KHỐI 20: TIỆN ÍCH - NHẬT KÝ DẠY HỌC (GIAO DIỆN CHÍNH ĐÃ CẬP NHẬT)
// // =====================================================================
// window.ham_20_1_mo_giao_dien_nhat_ky_day_hoc = function () {
//     const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
//     if (!vungLamViec) return;

//     const today = new Date().toISOString().split('T')[0];

//     vungLamViec.innerHTML = `
//         <div style="padding: 10px; animation: fadeIn 0.3s ease-in-out;">
            
//             <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #17a2b8; padding-bottom: 10px; margin-bottom: 20px;">
//                 <h3 style="color: #17a2b8; margin: 0; text-transform: uppercase; display: flex; align-items: center; gap: 10px;">
//                     📔 Nhật Ký Dạy Học
//                 </h3>
                
//                 <div style="display: flex; gap: 10px;">
//                     <button onclick="ham_20_14_giao_dien_tra_cuu()" style="padding: 6px 15px; background: #ffc107; color: #000; border: 1px solid #d39e00; border-radius: 4px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: 0.2s;">
//                         🔍 Tìm lại Nhật ký
//                     </button>
                    
//                     <button onclick="ham_3_1_ve_dashboard_admin()" style="padding: 6px 15px; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
//                         ⬅️ Quay lại
//                     </button>
//                 </div>
//             </div>

//             <!-- THÔNG TIN CHUNG (Thêm sự kiện Onchange) -->
//             <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border: 1px solid #ced4da; box-shadow: 0 2px 4px rgba(0,0,0,0.02); margin-bottom: 20px;">
//                 <h4 style="margin: 0 0 15px 0; color: #495057;">🕒 1. Thông tin chung của tiết học</h4>
//                 <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 15px;">
//                     <div>
//                         <label style="font-weight: bold; font-size: 13px; color: #6c757d;">Ngày dạy:</label>
//                         <input type="date" value="${today}" onchange="if(typeof ham_20_27_kiem_tra_tiet_da_luu === 'function') ham_20_27_kiem_tra_tiet_da_luu();" style="width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; font-weight: bold; color: #0056b3; outline: none;">
//                     </div>
//                     <div>
//                         <label style="font-weight: bold; font-size: 13px; color: #6c757d;">Buổi:</label>
//                         <input id="nk-input-buoi" list="dl-buoi" onchange="if(typeof ham_20_27_kiem_tra_tiet_da_luu === 'function') ham_20_27_kiem_tra_tiet_da_luu();" onfocus="this.dataset.old = this.value; this.value='';" onblur="if(!this.value) this.value = this.dataset.old;" placeholder="Chọn / Gõ..." style="width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; outline: none;">
//                         <datalist id="dl-buoi"><option value="Sáng"></option><option value="Chiều"></option><option value="Tối"></option></datalist>
//                     </div>
//                     <div>
//                         <label style="font-weight: bold; font-size: 13px; color: #6c757d;">Tiết:</label>
//                         <input id="nk-input-tiet" list="dl-tiet" onchange="if(typeof ham_20_27_kiem_tra_tiet_da_luu === 'function') ham_20_27_kiem_tra_tiet_da_luu();" onfocus="this.dataset.old = this.value; this.value='';" onblur="if(!this.value) this.value = this.dataset.old;" placeholder="Chọn / Gõ..." style="width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; outline: none;">
//                         <datalist id="dl-tiet"><option value="Tiết 1"></option><option value="Tiết 2"></option><option value="Tiết 3"></option><option value="Tiết 4"></option><option value="Tiết 5"></option></datalist>
//                     </div>
//                     <div>
//                         <label style="font-weight: bold; font-size: 13px; color: #6c757d;">Lớp:</label>
//                         <input id="nk-input-lop" list="dl-lop" onchange="ham_20_2_tai_danh_sach_hs_theo_lop(); if(typeof ham_20_27_kiem_tra_tiet_da_luu === 'function') ham_20_27_kiem_tra_tiet_da_luu();" placeholder="VD: 12TN6..." style="width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; font-weight: bold; color: #0056b3; outline: none;">
//                         <datalist id="dl-lop"></datalist>
//                         <datalist id="nk-dl-hs"></datalist>
//                     </div>
//                     <div>
//                         <label style="font-weight: bold; font-size: 13px; color: #6c757d;">Phân môn:</label>
//                         <input id="nk-input-mon" list="dl-mon" onfocus="this.dataset.old = this.value; this.value='';" onblur="if(!this.value) this.value = this.dataset.old;" placeholder="Chọn / Gõ..." style="width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; outline: none;">
//                         <datalist id="dl-mon"><option value="Đại số"></option><option value="Hình học"></option><option value="Thống kê xác suất"></option><option value="Hoạt động trải nghiệm"></option></datalist>
//                     </div>
//                 </div>
//             </div>

//             <div style="display: flex; gap: 20px; flex-wrap: wrap;">
                
//                 <!-- CỘT TRÁI: BÀI GIẢNG -->
//                 <div style="flex: 1.5; min-width: 400px; display: flex; flex-direction: column; gap: 20px; background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #dee2e6; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
//                     <div>
//                         <h4 style="margin: 0 0 15px 0; color: #0056b3;">📝 2. Nội dung bài giảng</h4>
//                         <label style="font-weight: bold; font-size: 13px; color: #495057;">Tên bài / Chủ đề:</label>
//                         <input id="nk-input-ten-bai" type="text" placeholder="Nhập tên bài học / chủ đề..." style="width: 100%; padding: 10px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; margin-bottom: 15px; font-weight: bold; color: #0056b3; outline: none;">

//                         <label style="font-weight: bold; font-size: 13px; color: #495057;">Nội dung chủ đề / Lý thuyết:</label>
//                         <textarea placeholder="Ghi chú nhanh lý thuyết đã dạy..." style="width: 100%; padding: 10px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; margin-bottom: 15px; resize: vertical; min-height: 60px; font-family: inherit; outline: none;"></textarea>

//                         <label style="font-weight: bold; font-size: 13px; color: #495057;">Bài tập đã giải & Bài tập về nhà:</label>
//                         <textarea placeholder="VD: Giải BT 1,2 SGK. BTVN: Trắc nghiệm trang 45." style="width: 100%; padding: 10px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; margin-bottom: 15px; resize: vertical; min-height: 60px; font-family: inherit; outline: none;"></textarea>

//                         <label style="font-weight: bold; font-size: 13px; color: #17a2b8; display: block; margin-bottom: 8px;">📸 Lưu ảnh bảng giảng dạy:</label>
                        
//                         <!-- 🌟 KHU VỰC HIỂN THỊ ẢNH ĐÃ LƯU TRƯỚC ĐÓ -->
//                         <div id="vung-anh-bai-giang-da-luu" style="display: none; padding: 12px; background: #e8f5e9; border: 1px dashed #28a745; border-radius: 6px; margin-bottom: 15px; box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);"></div>

//                         <div style="display: flex; gap: 15px; align-items: flex-start;">
//                             <button type="button" id="btn-tai-anh-bai-giang" onclick="document.getElementById('nk-input-anh-bai-giang').click()" style="padding: 12px 20px; background: #e0f7fa; color: #00838f; border: 1px dashed #00acc1; border-radius: 6px; cursor: pointer; font-weight: bold; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 5px; transition: 0.2s; flex-shrink: 0;">
//                                 <span style="font-size: 24px;">📷</span><span>Tải ảnh lên</span>
//                             </button>
//                             <input type="file" id="nk-input-anh-bai-giang" accept="image/*" multiple style="display: none;">
//                             <div id="vung-hien-thi-anh-bang" style="flex: 1; min-height: 70px; border: 1px dashed #ccc; border-radius: 6px; display: flex; align-items: center; justify-content: flex-start; color: #adb5bd; font-size: 13px; font-style: italic; background: #fafafa; padding: 8px; gap: 10px; overflow-x: auto;">
//                                 <span id="text-cho-anh">(Ảnh bảng bổ sung sẽ xuất hiện tại đây...)</span>
//                             </div>
//                         </div>
//                     </div>

//                     <div style="background: #fff3cd; padding: 15px; border-radius: 8px; border: 1px solid #ffeeba;">
//                         <h4 style="margin: 0 0 10px 0; color: #856404;">📌 3. Dặn dò / Nhắc việc tiết sau</h4>
//                         <textarea placeholder="VD: Tiết sau kiểm tra 15 phút..." style="width: 100%; padding: 10px; border: 1px solid #f5c6cb; border-radius: 4px; box-sizing: border-box; resize: vertical; min-height: 60px; font-family: inherit; background: #fffcf8; color: #856404; font-weight: bold; outline: none;"></textarea>
//                     </div>

//                     <div style="margin-top: auto; padding-top: 20px; border-top: 1px dashed #dee2e6; text-align: right;">
//                         <button onclick="ham_20_6a_luu_bai_giang(this)" style="padding: 12px 25px; background: #007bff; color: white; border: none; border-radius: 6px; font-weight: bold; font-size: 14px; cursor: pointer; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: 0.2s;" onmouseover="this.style.background='#0056b3'" onmouseout="this.style.background='#007bff'">
//                             💾 1. LƯU NỘI DUNG BÀI GIẢNG
//                         </button>
//                     </div>
//                 </div>

//                 <!-- CỘT PHẢI: HỌC SINH -->
//                 <div style="flex: 1; min-width: 350px; display: flex; flex-direction: column; gap: 20px; background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #dee2e6; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                    
//                     <!-- 🌟 KHU VỰC HIỂN THỊ SỰ KIỆN & VẮNG MẶT ĐÃ LƯU TRƯỚC ĐÓ -->
//                     <div id="vung-su-kien-da-luu" style="display: none; padding: 15px; background: #fff3cd; border: 1px dashed #856404; border-radius: 6px; margin-bottom: 5px; box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);"></div>

//                     <div>
//                         <h4 style="margin: 0 0 15px 0; color: #dc3545;">📋 4. Điểm danh (Học sinh vắng)</h4>
//                         <div id="nk-khu-vuc-diem-danh" style="display: flex; flex-direction: column; margin-bottom: 15px;">
//                             <div class="dong-hs-vang" style="display: flex; gap: 8px; align-items: center;">
//                                 <input class="nk-input-hs-vang" list="nk-dl-hs" placeholder="Chọn hoặc gõ tên HS vắng..." style="flex: 1; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; outline: none; font-size: 13px;">
//                                 <button onclick="this.parentElement.remove()" style="padding: 8px 12px; background: #f8d7da; color: #721c24; border: none; border-radius: 4px; cursor: pointer;" title="Xóa dòng này">✖</button>
//                             </div>
//                         </div>
//                         <button onclick="ham_20_12_them_dong_vang()" style="width: 100%; padding: 8px; background: #f8f9fa; border: 1px dashed #dc3545; color: #dc3545; border-radius: 4px; cursor: pointer; font-weight: bold; transition: 0.2s;" onmouseover="this.style.background='#f5c6cb'" onmouseout="this.style.background='#f8f9fa'">
//                             ➕ Thêm học sinh vắng
//                         </button>
//                     </div>

//                     <div style="flex: 1; display: flex; flex-direction: column; padding-top: 15px; border-top: 1px dashed #eee;">
//                         <h4 style="margin: 0 0 15px 0; color: #d35400;">🎯 5. Ghi nhận sự kiện học sinh</h4>
                        
//                         <div style="margin-bottom: 15px;">
//                             <label style="font-weight: bold; font-size: 13px; color: #495057;">Chọn học sinh (Có thể thêm nhóm):</label>
//                             <div id="nk-khu-vuc-hs-su-kien" style="display: flex; flex-direction: column; gap: 8px; margin-top: 5px;">
//                                 <div class="dong-hs-su-kien" style="display: flex; gap: 8px; align-items: center;">
//                                     <input class="nk-input-hs-su-kien" list="nk-dl-hs" placeholder="Gõ tên để tìm nhanh..." style="flex: 1; padding: 10px; border: 2px solid #fd7e14; border-radius: 6px; box-sizing: border-box; font-weight: bold; outline: none;">
//                                     <button onclick="this.parentElement.remove()" style="padding: 10px 12px; background: #f8d7da; color: #721c24; border: none; border-radius: 6px; cursor: pointer;" title="Xóa dòng này">✖</button>
//                                 </div>
//                             </div>
//                             <button onclick="ham_20_13_them_dong_hs_su_kien()" style="margin-top: 8px; width: 100%; padding: 8px; background: #fff; border: 1px dashed #fd7e14; color: #fd7e14; border-radius: 4px; cursor: pointer; font-weight: bold; transition: 0.2s;" onmouseover="this.style.background='#ffe8d6'" onmouseout="this.style.background='#fff'">
//                                 ➕ Thêm học sinh cùng sự kiện
//                             </button>
//                         </div>
                        
//                         <div style="margin-bottom: 15px;">
//                             <label style="font-weight: bold; font-size: 13px; color: #495057;">Ghi chú thêm (hoặc nhập tự do):</label>
//                             <input id="nk-input-ghi-chu" type="text" placeholder="VD: Bấm điện thoại dưới hộc bàn..." onkeydown="if(event.key === 'Enter') ham_20_3_gan_the('Khác', '#000')" style="width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; margin-top: 5px; outline: none;">
                            
//                             <button onclick="ham_20_3_gan_the('Khác', '#000')" style="margin-top: 8px; width: 100%; padding: 8px; font-size: 12px; background: #343a40; border: none; color: #fff; border-radius: 4px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: 0.2s;" onmouseover="this.style.background='#23272b'" onmouseout="this.style.background='#343a40'">
//                                 ➕ Ghi nhận sự kiện từ ô ghi chú này
//                             </button>
//                         </div>

//                         <div style="margin-bottom: 15px;">
//                             <label style="font-weight: bold; font-size: 13px; color: #495057; display: block; margin-bottom: 5px;">Bấm chọn để gắn thẻ nhanh:</label>
//                             <div id="nk-khu-vuc-tags"><span style="font-size: 12px; color: #999;">⏳ Đang tải...</span></div>
//                         </div>

//                         <div style="margin-bottom: 15px;">
//                             <label style="font-weight: bold; font-size: 13px; color: #495057; display: block; margin-bottom: 8px;">📸 Ảnh minh chứng (Nếu có):</label>
//                             <div style="display: flex; gap: 15px; align-items: flex-start;">
//                                 <button type="button" onclick="document.getElementById('nk-input-anh-minh-chung').click()" style="padding: 10px 15px; background: #f8f9fa; color: #495057; border: 1px dashed #adb5bd; border-radius: 6px; cursor: pointer; font-weight: bold; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 5px; transition: 0.2s; flex-shrink: 0;" onmouseover="this.style.background='#e9ecef'" onmouseout="this.style.background='#f8f9fa'">
//                                     <span style="font-size: 20px;">📷</span><span>Tải ảnh lên</span>
//                                 </button>
//                                 <input type="file" id="nk-input-anh-minh-chung" accept="image/*" multiple style="display: none;">
//                                 <div id="vung-preview-anh-minh-chung" style="flex: 1; min-height: 65px; border: 1px dashed #ccc; border-radius: 6px; display: flex; align-items: center; justify-content: flex-start; color: #adb5bd; font-size: 12px; font-style: italic; background: #fafafa; padding: 8px; gap: 8px; overflow-x: auto;">
//                                     <span id="text-cho-anh-mc">(Ảnh minh chứng xuất hiện tại đây...)</span>
//                                 </div>
//                             </div>
//                         </div>

//                         <div style="width: 100%; margin-bottom: 15px; padding: 10px; background: #e8f5e9; border: 1px dashed #28a745; border-radius: 6px; display: flex; gap: 8px; align-items: center; box-shadow: inset 0 1px 3px rgba(0,0,0,0.05); box-sizing: border-box;">
//                             <span style="font-size: 16px;" title="Cho điểm học sinh">💯</span>
//                             <input type="number" id="nk-input-diem-so" placeholder="Nhập điểm..." step="0.25" min="0" max="10" 
//                                 onkeydown="if(event.key === 'Enter') document.getElementById('btn-ghi-diem').click()" 
//                                 style="flex: 1; min-width: 80px; padding: 8px 10px; border: 1px solid #28a745; border-radius: 4px; outline: none; font-weight: bold; color: #155724; font-size: 13px;">
//                             <button id="btn-ghi-diem" 
//                                 onclick="let diem = document.getElementById('nk-input-diem-so').value; if(!diem){alert('Vui lòng nhập điểm!'); return;} ham_20_3_gan_the('Cho điểm: ' + diem + ' đ', '#28a745'); document.getElementById('nk-input-diem-so').value='';" 
//                                 style="padding: 8px 12px; font-size: 12px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; transition: 0.2s; white-space: nowrap;" 
//                                 onmouseover="this.style.background='#218838'" onmouseout="this.style.background='#28a745'">
//                                 Nhập điểm chờ lưu
//                             </button>
//                         </div>

//                         <div style="flex: 1; background: #f8f9fa; border: 1px dashed #ccc; border-radius: 6px; padding: 10px; overflow-y: auto; max-height: 200px;">
//                             <div style="font-size: 12px; font-weight: bold; color: #6c757d; margin-bottom: 10px; border-bottom: 1px solid #eee; padding-bottom: 5px;">Sự kiện chờ lưu (<span id="nk-dem-su-kien">0</span>):</div>
//                             <div id="nk-danh-sach-cho-luu"><i style="color: #adb5bd; font-size: 12px;">Chưa có sự kiện nào...</i></div>
//                         </div>
//                     </div>

//                     <div style="margin-top: auto; padding-top: 20px; border-top: 1px dashed #dee2e6; text-align: right;">
//                         <button onclick="ham_20_6b_luu_su_kien_diem_danh(this)" style="padding: 12px 25px; background: #28a745; color: white; border: none; border-radius: 6px; font-weight: bold; font-size: 14px; cursor: pointer; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: 0.2s;" onmouseover="this.style.background='#218838'" onmouseout="this.style.background='#28a745'">
//                             🎯 2. LƯU ĐIỂM DANH & SỰ KIỆN
//                         </button>
//                     </div>
//                 </div>

//             </div>
//         </div>
//     `;

//     if (typeof ham_20_7_tai_danh_sach_lop === 'function') ham_20_7_tai_danh_sach_lop();
//     if (typeof ham_20_8_tai_danh_sach_the === 'function') ham_20_8_tai_danh_sach_the();
//     if (typeof ham_20_11_kich_hoat_preview_anh === 'function') ham_20_11_kich_hoat_preview_anh();
//     if (typeof ham_20_22_kich_hoat_preview_anh_minh_chung === 'function') ham_20_22_kich_hoat_preview_anh_minh_chung();
// };



// // =====================================================================
// // KHỐI 20: TIỆN ÍCH - NHẬT KÝ DẠY HỌC (TỰ ĐỘNG NHỚ TIẾT VỪA NHẬP)
// // =====================================================================
// window.ham_20_1_mo_giao_dien_nhat_ky_day_hoc = function () {
//     const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
//     if (!vungLamViec) return;

//     const today = new Date().toISOString().split('T')[0];

//     // 🌟 LÔI DỮ LIỆU TỪ TRÍ NHỚ (Nếu chưa có thì dùng mặc định)
//     const lastNgayDay = localStorage.getItem('nk_last_ngayDay') || today;
//     const lastBuoi = localStorage.getItem('nk_last_buoi') || '';
//     const lastTiet = localStorage.getItem('nk_last_tiet') || '';
//     const lastLop = localStorage.getItem('nk_last_lop') || '';

//     vungLamViec.innerHTML = `
//         <div style="padding: 10px; animation: fadeIn 0.3s ease-in-out;">
            
//             <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #17a2b8; padding-bottom: 10px; margin-bottom: 20px;">
//                 <h3 style="color: #17a2b8; margin: 0; text-transform: uppercase; display: flex; align-items: center; gap: 10px;">
//                     📔 Nhật Ký Dạy Học
//                 </h3>
                
//                 <div style="display: flex; gap: 10px;">
//                     <button onclick="ham_20_14_giao_dien_tra_cuu()" style="padding: 6px 15px; background: #ffc107; color: #000; border: 1px solid #d39e00; border-radius: 4px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: 0.2s;">
//                         🔍 Tìm lại Nhật ký
//                     </button>
                    
//                     <button onclick="ham_3_1_ve_dashboard_admin()" style="padding: 6px 15px; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
//                         ⬅️ Quay lại
//                     </button>
//                 </div>
//             </div>

//             <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border: 1px solid #ced4da; box-shadow: 0 2px 4px rgba(0,0,0,0.02); margin-bottom: 20px;">
//                 <h4 style="margin: 0 0 15px 0; color: #495057;">🕒 1. Thông tin chung của tiết học</h4>
//                 <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 15px;">
//                     <div>
//                         <label style="font-weight: bold; font-size: 13px; color: #6c757d;">Ngày dạy:</label>
//                         <input type="date" value="${lastNgayDay}" onchange="if(typeof ham_20_27_kiem_tra_tiet_da_luu === 'function') ham_20_27_kiem_tra_tiet_da_luu();" style="width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; font-weight: bold; color: #0056b3; outline: none;">
//                     </div>
//                     <div>
//                         <label style="font-weight: bold; font-size: 13px; color: #6c757d;">Buổi:</label>
//                         <input id="nk-input-buoi" list="dl-buoi" value="${lastBuoi}" onchange="if(typeof ham_20_27_kiem_tra_tiet_da_luu === 'function') ham_20_27_kiem_tra_tiet_da_luu();" onfocus="this.dataset.old = this.value; this.value='';" onblur="if(!this.value) this.value = this.dataset.old;" placeholder="Chọn / Gõ..." style="width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; outline: none;">
//                         <datalist id="dl-buoi"><option value="Sáng"></option><option value="Chiều"></option><option value="Tối"></option></datalist>
//                     </div>
//                     <div>
//                         <label style="font-weight: bold; font-size: 13px; color: #6c757d;">Tiết:</label>
//                         <input id="nk-input-tiet" list="dl-tiet" value="${lastTiet}" onchange="if(typeof ham_20_27_kiem_tra_tiet_da_luu === 'function') ham_20_27_kiem_tra_tiet_da_luu();" onfocus="this.dataset.old = this.value; this.value='';" onblur="if(!this.value) this.value = this.dataset.old;" placeholder="Chọn / Gõ..." style="width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; outline: none;">
//                         <datalist id="dl-tiet"><option value="Tiết 1"></option><option value="Tiết 2"></option><option value="Tiết 3"></option><option value="Tiết 4"></option><option value="Tiết 5"></option></datalist>
//                     </div>
//                     <div>
//                         <label style="font-weight: bold; font-size: 13px; color: #6c757d;">Lớp:</label>
//                         <input id="nk-input-lop" list="dl-lop" value="${lastLop}" onchange="ham_20_2_tai_danh_sach_hs_theo_lop(); if(typeof ham_20_27_kiem_tra_tiet_da_luu === 'function') ham_20_27_kiem_tra_tiet_da_luu();" placeholder="VD: 12TN6..." style="width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; font-weight: bold; color: #0056b3; outline: none;">
//                         <datalist id="dl-lop"></datalist>
//                         <datalist id="nk-dl-hs"></datalist>
//                     </div>
//                     <div>
//                         <label style="font-weight: bold; font-size: 13px; color: #6c757d;">Phân môn:</label>
//                         <input id="nk-input-mon" list="dl-mon" onfocus="this.dataset.old = this.value; this.value='';" onblur="if(!this.value) this.value = this.dataset.old;" placeholder="Chọn / Gõ..." style="width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; outline: none;">
//                         <datalist id="dl-mon"><option value="Đại số"></option><option value="Hình học"></option><option value="Thống kê xác suất"></option><option value="Hoạt động trải nghiệm"></option></datalist>
//                     </div>
//                 </div>
//             </div>

//             <div style="display: flex; gap: 20px; flex-wrap: wrap;">
                
//                 <!-- CỘT TRÁI: BÀI GIẢNG -->
//                 <div style="flex: 1.5; min-width: 400px; display: flex; flex-direction: column; gap: 20px; background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #dee2e6; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
//                     <div>
//                         <h4 style="margin: 0 0 15px 0; color: #0056b3;">📝 2. Nội dung bài giảng</h4>
//                         <label style="font-weight: bold; font-size: 13px; color: #495057;">Tên bài / Chủ đề:</label>
//                         <input id="nk-input-ten-bai" type="text" placeholder="Nhập tên bài học / chủ đề..." style="width: 100%; padding: 10px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; margin-bottom: 15px; font-weight: bold; color: #0056b3; outline: none;">

//                         <label style="font-weight: bold; font-size: 13px; color: #495057;">Nội dung chủ đề / Lý thuyết:</label>
//                         <textarea placeholder="Ghi chú nhanh lý thuyết đã dạy..." style="width: 100%; padding: 10px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; margin-bottom: 15px; resize: vertical; min-height: 60px; font-family: inherit; outline: none;"></textarea>

//                         <label style="font-weight: bold; font-size: 13px; color: #495057;">Bài tập đã giải & Bài tập về nhà:</label>
//                         <textarea placeholder="VD: Giải BT 1,2 SGK. BTVN: Trắc nghiệm trang 45." style="width: 100%; padding: 10px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; margin-bottom: 15px; resize: vertical; min-height: 60px; font-family: inherit; outline: none;"></textarea>

//                         <label style="font-weight: bold; font-size: 13px; color: #17a2b8; display: block; margin-bottom: 8px;">📸 Lưu ảnh bảng giảng dạy:</label>
                        
//                         <div id="vung-anh-bai-giang-da-luu" style="display: none; padding: 12px; background: #e8f5e9; border: 1px dashed #28a745; border-radius: 6px; margin-bottom: 15px; box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);"></div>

//                         <div style="display: flex; gap: 15px; align-items: flex-start;">
//                             <button type="button" id="btn-tai-anh-bai-giang" onclick="document.getElementById('nk-input-anh-bai-giang').click()" style="padding: 12px 20px; background: #e0f7fa; color: #00838f; border: 1px dashed #00acc1; border-radius: 6px; cursor: pointer; font-weight: bold; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 5px; transition: 0.2s; flex-shrink: 0;">
//                                 <span style="font-size: 24px;">📷</span><span>Tải ảnh lên</span>
//                             </button>
//                             <input type="file" id="nk-input-anh-bai-giang" accept="image/*" multiple style="display: none;">
//                             <div id="vung-hien-thi-anh-bang" style="flex: 1; min-height: 70px; border: 1px dashed #ccc; border-radius: 6px; display: flex; align-items: center; justify-content: flex-start; color: #adb5bd; font-size: 13px; font-style: italic; background: #fafafa; padding: 8px; gap: 10px; overflow-x: auto;">
//                                 <span id="text-cho-anh">(Ảnh bảng bổ sung sẽ xuất hiện tại đây...)</span>
//                             </div>
//                         </div>
//                     </div>

//                     <div style="background: #fff3cd; padding: 15px; border-radius: 8px; border: 1px solid #ffeeba;">
//                         <h4 style="margin: 0 0 10px 0; color: #856404;">📌 3. Dặn dò / Nhắc việc tiết sau</h4>
//                         <textarea placeholder="VD: Tiết sau kiểm tra 15 phút..." style="width: 100%; padding: 10px; border: 1px solid #f5c6cb; border-radius: 4px; box-sizing: border-box; resize: vertical; min-height: 60px; font-family: inherit; background: #fffcf8; color: #856404; font-weight: bold; outline: none;"></textarea>
//                     </div>

//                     <div style="margin-top: auto; padding-top: 20px; border-top: 1px dashed #dee2e6; text-align: right;">
//                         <button onclick="ham_20_6a_luu_bai_giang(this)" style="padding: 12px 25px; background: #007bff; color: white; border: none; border-radius: 6px; font-weight: bold; font-size: 14px; cursor: pointer; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: 0.2s;" onmouseover="this.style.background='#0056b3'" onmouseout="this.style.background='#007bff'">
//                             💾 1. LƯU NỘI DUNG BÀI GIẢNG
//                         </button>
//                     </div>
//                 </div>

//                 <!-- CỘT PHẢI: HỌC SINH -->
//                 <div style="flex: 1; min-width: 350px; display: flex; flex-direction: column; gap: 20px; background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #dee2e6; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                    
//                     <div id="vung-su-kien-da-luu" style="display: none; padding: 15px; background: #fff3cd; border: 1px dashed #856404; border-radius: 6px; margin-bottom: 5px; box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);"></div>

//                     <div>
//                         <h4 style="margin: 0 0 15px 0; color: #dc3545;">📋 4. Điểm danh (Học sinh vắng)</h4>
//                         <div id="nk-khu-vuc-diem-danh" style="display: flex; flex-direction: column; margin-bottom: 15px;">
//                             <div class="dong-hs-vang" style="display: flex; gap: 8px; align-items: center;">
//                                 <input class="nk-input-hs-vang" list="nk-dl-hs" placeholder="Chọn hoặc gõ tên HS vắng..." style="flex: 1; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; outline: none; font-size: 13px;">
//                                 <button onclick="this.parentElement.remove()" style="padding: 8px 12px; background: #f8d7da; color: #721c24; border: none; border-radius: 4px; cursor: pointer;" title="Xóa dòng này">✖</button>
//                             </div>
//                         </div>
//                         <button onclick="ham_20_12_them_dong_vang()" style="width: 100%; padding: 8px; background: #f8f9fa; border: 1px dashed #dc3545; color: #dc3545; border-radius: 4px; cursor: pointer; font-weight: bold; transition: 0.2s;" onmouseover="this.style.background='#f5c6cb'" onmouseout="this.style.background='#f8f9fa'">
//                             ➕ Thêm học sinh vắng
//                         </button>
//                     </div>

//                     <div style="flex: 1; display: flex; flex-direction: column; padding-top: 15px; border-top: 1px dashed #eee;">
//                         <h4 style="margin: 0 0 15px 0; color: #d35400;">🎯 5. Ghi nhận sự kiện học sinh</h4>
                        
//                         <div style="margin-bottom: 15px;">
//                             <label style="font-weight: bold; font-size: 13px; color: #495057;">Chọn học sinh (Có thể thêm nhóm):</label>
//                             <div id="nk-khu-vuc-hs-su-kien" style="display: flex; flex-direction: column; gap: 8px; margin-top: 5px;">
//                                 <div class="dong-hs-su-kien" style="display: flex; gap: 8px; align-items: center;">
//                                     <input class="nk-input-hs-su-kien" list="nk-dl-hs" placeholder="Gõ tên để tìm nhanh..." style="flex: 1; padding: 10px; border: 2px solid #fd7e14; border-radius: 6px; box-sizing: border-box; font-weight: bold; outline: none;">
//                                     <button onclick="this.parentElement.remove()" style="padding: 10px 12px; background: #f8d7da; color: #721c24; border: none; border-radius: 6px; cursor: pointer;" title="Xóa dòng này">✖</button>
//                                 </div>
//                             </div>
//                             <button onclick="ham_20_13_them_dong_hs_su_kien()" style="margin-top: 8px; width: 100%; padding: 8px; background: #fff; border: 1px dashed #fd7e14; color: #fd7e14; border-radius: 4px; cursor: pointer; font-weight: bold; transition: 0.2s;" onmouseover="this.style.background='#ffe8d6'" onmouseout="this.style.background='#fff'">
//                                 ➕ Thêm học sinh cùng sự kiện
//                             </button>
//                         </div>
                        
//                         <div style="margin-bottom: 15px;">
//                             <label style="font-weight: bold; font-size: 13px; color: #495057;">Ghi chú thêm (hoặc nhập tự do):</label>
//                             <input id="nk-input-ghi-chu" type="text" placeholder="VD: Bấm điện thoại dưới hộc bàn..." onkeydown="if(event.key === 'Enter') ham_20_3_gan_the('Khác', '#000')" style="width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; margin-top: 5px; outline: none;">
                            
//                             <button onclick="ham_20_3_gan_the('Khác', '#000')" style="margin-top: 8px; width: 100%; padding: 8px; font-size: 12px; background: #343a40; border: none; color: #fff; border-radius: 4px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: 0.2s;" onmouseover="this.style.background='#23272b'" onmouseout="this.style.background='#343a40'">
//                                 ➕ Ghi nhận sự kiện từ ô ghi chú này
//                             </button>
//                         </div>

//                         <div style="margin-bottom: 15px;">
//                             <label style="font-weight: bold; font-size: 13px; color: #495057; display: block; margin-bottom: 5px;">Bấm chọn để gắn thẻ nhanh:</label>
//                             <div id="nk-khu-vuc-tags"><span style="font-size: 12px; color: #999;">⏳ Đang tải...</span></div>
//                         </div>

//                         <div style="margin-bottom: 15px;">
//                             <label style="font-weight: bold; font-size: 13px; color: #495057; display: block; margin-bottom: 8px;">📸 Ảnh minh chứng (Nếu có):</label>
//                             <div style="display: flex; gap: 15px; align-items: flex-start;">
//                                 <button type="button" onclick="document.getElementById('nk-input-anh-minh-chung').click()" style="padding: 10px 15px; background: #f8f9fa; color: #495057; border: 1px dashed #adb5bd; border-radius: 6px; cursor: pointer; font-weight: bold; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 5px; transition: 0.2s; flex-shrink: 0;" onmouseover="this.style.background='#e9ecef'" onmouseout="this.style.background='#f8f9fa'">
//                                     <span style="font-size: 20px;">📷</span><span>Tải ảnh lên</span>
//                                 </button>
//                                 <input type="file" id="nk-input-anh-minh-chung" accept="image/*" multiple style="display: none;">
//                                 <div id="vung-preview-anh-minh-chung" style="flex: 1; min-height: 65px; border: 1px dashed #ccc; border-radius: 6px; display: flex; align-items: center; justify-content: flex-start; color: #adb5bd; font-size: 12px; font-style: italic; background: #fafafa; padding: 8px; gap: 8px; overflow-x: auto;">
//                                     <span id="text-cho-anh-mc">(Ảnh minh chứng xuất hiện tại đây...)</span>
//                                 </div>
//                             </div>
//                         </div>

//                         <div style="width: 100%; margin-bottom: 15px; padding: 10px; background: #e8f5e9; border: 1px dashed #28a745; border-radius: 6px; display: flex; gap: 8px; align-items: center; box-shadow: inset 0 1px 3px rgba(0,0,0,0.05); box-sizing: border-box;">
//                             <span style="font-size: 16px;" title="Cho điểm học sinh">💯</span>
//                             <input type="number" id="nk-input-diem-so" placeholder="Nhập điểm..." step="0.25" min="0" max="10" 
//                                 onkeydown="if(event.key === 'Enter') document.getElementById('btn-ghi-diem').click()" 
//                                 style="flex: 1; min-width: 80px; padding: 8px 10px; border: 1px solid #28a745; border-radius: 4px; outline: none; font-weight: bold; color: #155724; font-size: 13px;">
//                             <button id="btn-ghi-diem" 
//                                 onclick="let diem = document.getElementById('nk-input-diem-so').value; if(!diem){alert('Vui lòng nhập điểm!'); return;} ham_20_3_gan_the('Cho điểm: ' + diem + ' đ', '#28a745'); document.getElementById('nk-input-diem-so').value='';" 
//                                 style="padding: 8px 12px; font-size: 12px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; transition: 0.2s; white-space: nowrap;" 
//                                 onmouseover="this.style.background='#218838'" onmouseout="this.style.background='#28a745'">
//                                 Nhập điểm chờ lưu
//                             </button>
//                         </div>

//                         <div style="flex: 1; background: #f8f9fa; border: 1px dashed #ccc; border-radius: 6px; padding: 10px; overflow-y: auto; max-height: 200px;">
//                             <div style="font-size: 12px; font-weight: bold; color: #6c757d; margin-bottom: 10px; border-bottom: 1px solid #eee; padding-bottom: 5px;">Sự kiện chờ lưu (<span id="nk-dem-su-kien">0</span>):</div>
//                             <div id="nk-danh-sach-cho-luu"><i style="color: #adb5bd; font-size: 12px;">Chưa có sự kiện nào...</i></div>
//                         </div>
//                     </div>

//                     <div style="margin-top: auto; padding-top: 20px; border-top: 1px dashed #dee2e6; text-align: right;">
//                         <button onclick="ham_20_6b_luu_su_kien_diem_danh(this)" style="padding: 12px 25px; background: #28a745; color: white; border: none; border-radius: 6px; font-weight: bold; font-size: 14px; cursor: pointer; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: 0.2s;" onmouseover="this.style.background='#218838'" onmouseout="this.style.background='#28a745'">
//                             🎯 2. LƯU ĐIỂM DANH & SỰ KIỆN
//                         </button>
//                     </div>
//                 </div>

//             </div>
//         </div>
//     `;

//     if (typeof ham_20_7_tai_danh_sach_lop === 'function') ham_20_7_tai_danh_sach_lop();
//     if (typeof ham_20_8_tai_danh_sach_the === 'function') ham_20_8_tai_danh_sach_the();
//     if (typeof ham_20_11_kich_hoat_preview_anh === 'function') ham_20_11_kich_hoat_preview_anh();
//     if (typeof ham_20_22_kich_hoat_preview_anh_minh_chung === 'function') ham_20_22_kich_hoat_preview_anh_minh_chung();

//     // 🌟 KÍCH HOẠT TẢI DỮ LIỆU TỰ ĐỘNG NẾU ĐÃ LƯU TỪ TRƯỚC
//     setTimeout(() => {
//         if (lastLop && typeof ham_20_2_tai_danh_sach_hs_theo_lop === 'function') {
//             ham_20_2_tai_danh_sach_hs_theo_lop();
//         }
//         if (lastNgayDay && lastBuoi && lastTiet && lastLop && typeof ham_20_27_kiem_tra_tiet_da_luu === 'function') {
//             ham_20_27_kiem_tra_tiet_da_luu();
//         }
//     }, 300);
// };



// // =====================================================================
// // KHỐI 20: TIỆN ÍCH - NHẬT KÝ DẠY HỌC (GIAO DIỆN TRỐNG MẶC ĐỊNH)
// // =====================================================================
// window.ham_20_1_mo_giao_dien_nhat_ky_day_hoc = function () {
//     const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
//     if (!vungLamViec) return;

//     // Mặc định chỉ lấy ngày hôm nay, các ô khác để trống
//     const today = new Date().toISOString().split('T')[0];

//     vungLamViec.innerHTML = `
//         <div style="padding: 10px; animation: fadeIn 0.3s ease-in-out;">
            
//             <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #17a2b8; padding-bottom: 10px; margin-bottom: 20px;">
//                 <h3 style="color: #17a2b8; margin: 0; text-transform: uppercase; display: flex; align-items: center; gap: 10px;">
//                     📔 Nhật Ký Dạy Học
//                 </h3>
                
//                 <div style="display: flex; gap: 10px;">
//                     <!-- 🌟 NÚT MỚI: GỌI LẠI TIẾT GẦN NHẤT -->
//                     <button onclick="ham_20_28_tai_tiet_gan_nhat()" style="padding: 6px 15px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: 0.2s;" onmouseover="this.style.background='#218838'" onmouseout="this.style.background='#28a745'">
//                         🔄 Tiết gần nhất
//                     </button>

//                     <button onclick="ham_20_14_giao_dien_tra_cuu()" style="padding: 6px 15px; background: #ffc107; color: #000; border: 1px solid #d39e00; border-radius: 4px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: 0.2s;">
//                         🔍 Tìm lại Nhật ký
//                     </button>
                    
//                     <button onclick="ham_3_1_ve_dashboard_admin()" style="padding: 6px 15px; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
//                         ⬅️ Quay lại
//                     </button>
//                 </div>
//             </div>

//             <!-- THÔNG TIN CHUNG -->
//             <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border: 1px solid #ced4da; box-shadow: 0 2px 4px rgba(0,0,0,0.02); margin-bottom: 20px;">
//                 <h4 style="margin: 0 0 15px 0; color: #495057;">🕒 1. Thông tin chung của tiết học</h4>
//                 <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 15px;">
//                     <div>
//                         <label style="font-weight: bold; font-size: 13px; color: #6c757d;">Ngày dạy:</label>
//                         <input type="date" value="${today}" onchange="if(typeof ham_20_27_kiem_tra_tiet_da_luu === 'function') ham_20_27_kiem_tra_tiet_da_luu();" style="width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; font-weight: bold; color: #0056b3; outline: none;">
//                     </div>
//                     <div>
//                         <label style="font-weight: bold; font-size: 13px; color: #6c757d;">Buổi:</label>
//                         <input id="nk-input-buoi" list="dl-buoi" onchange="if(typeof ham_20_27_kiem_tra_tiet_da_luu === 'function') ham_20_27_kiem_tra_tiet_da_luu();" onfocus="this.dataset.old = this.value; this.value='';" onblur="if(!this.value) this.value = this.dataset.old;" placeholder="Chọn / Gõ..." style="width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; outline: none;">
//                         <datalist id="dl-buoi"><option value="Sáng"></option><option value="Chiều"></option><option value="Tối"></option></datalist>
//                     </div>
//                     <div>
//                         <label style="font-weight: bold; font-size: 13px; color: #6c757d;">Tiết:</label>
//                         <input id="nk-input-tiet" list="dl-tiet" onchange="if(typeof ham_20_27_kiem_tra_tiet_da_luu === 'function') ham_20_27_kiem_tra_tiet_da_luu();" onfocus="this.dataset.old = this.value; this.value='';" onblur="if(!this.value) this.value = this.dataset.old;" placeholder="Chọn / Gõ..." style="width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; outline: none;">
//                         <datalist id="dl-tiet"><option value="Tiết 1"></option><option value="Tiết 2"></option><option value="Tiết 3"></option><option value="Tiết 4"></option><option value="Tiết 5"></option></datalist>
//                     </div>
//                     <div>
//                         <label style="font-weight: bold; font-size: 13px; color: #6c757d;">Lớp:</label>
//                         <input id="nk-input-lop" list="dl-lop" onchange="ham_20_2_tai_danh_sach_hs_theo_lop(); if(typeof ham_20_27_kiem_tra_tiet_da_luu === 'function') ham_20_27_kiem_tra_tiet_da_luu();" placeholder="VD: 12TN6..." style="width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; font-weight: bold; color: #0056b3; outline: none;">
//                         <datalist id="dl-lop"></datalist>
//                         <datalist id="nk-dl-hs"></datalist>
//                     </div>
//                     <div>
//                         <label style="font-weight: bold; font-size: 13px; color: #6c757d;">Phân môn:</label>
//                         <input id="nk-input-mon" list="dl-mon" onfocus="this.dataset.old = this.value; this.value='';" onblur="if(!this.value) this.value = this.dataset.old;" placeholder="Chọn / Gõ..." style="width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; outline: none;">
//                         <datalist id="dl-mon"><option value="Đại số"></option><option value="Hình học"></option><option value="Thống kê xác suất"></option><option value="Hoạt động trải nghiệm"></option></datalist>
//                     </div>
//                 </div>
//             </div>

//             <div style="display: flex; gap: 20px; flex-wrap: wrap;">
                
//                 <!-- CỘT TRÁI: BÀI GIẢNG -->
//                 <div style="flex: 1.5; min-width: 400px; display: flex; flex-direction: column; gap: 20px; background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #dee2e6; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
//                     <div>
//                         <h4 style="margin: 0 0 15px 0; color: #0056b3;">📝 2. Nội dung bài giảng</h4>
//                         <label style="font-weight: bold; font-size: 13px; color: #495057;">Tên bài / Chủ đề:</label>
//                         <input id="nk-input-ten-bai" type="text" placeholder="Nhập tên bài học / chủ đề..." style="width: 100%; padding: 10px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; margin-bottom: 15px; font-weight: bold; color: #0056b3; outline: none;">

//                         <label style="font-weight: bold; font-size: 13px; color: #495057;">Nội dung chủ đề / Lý thuyết:</label>
//                         <textarea placeholder="Ghi chú nhanh lý thuyết đã dạy..." style="width: 100%; padding: 10px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; margin-bottom: 15px; resize: vertical; min-height: 60px; font-family: inherit; outline: none;"></textarea>

//                         <label style="font-weight: bold; font-size: 13px; color: #495057;">Bài tập đã giải & Bài tập về nhà:</label>
//                         <textarea placeholder="VD: Giải BT 1,2 SGK. BTVN: Trắc nghiệm trang 45." style="width: 100%; padding: 10px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; margin-bottom: 15px; resize: vertical; min-height: 60px; font-family: inherit; outline: none;"></textarea>

//                         <label style="font-weight: bold; font-size: 13px; color: #17a2b8; display: block; margin-bottom: 8px;">📸 Lưu ảnh bảng giảng dạy:</label>
                        
//                         <div id="vung-anh-bai-giang-da-luu" style="display: none; padding: 12px; background: #e8f5e9; border: 1px dashed #28a745; border-radius: 6px; margin-bottom: 15px; box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);"></div>

//                         <div style="display: flex; gap: 15px; align-items: flex-start;">
//                             <button type="button" id="btn-tai-anh-bai-giang" onclick="document.getElementById('nk-input-anh-bai-giang').click()" style="padding: 12px 20px; background: #e0f7fa; color: #00838f; border: 1px dashed #00acc1; border-radius: 6px; cursor: pointer; font-weight: bold; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 5px; transition: 0.2s; flex-shrink: 0;">
//                                 <span style="font-size: 24px;">📷</span><span>Tải ảnh lên</span>
//                             </button>
//                             <input type="file" id="nk-input-anh-bai-giang" accept="image/*" multiple style="display: none;">
//                             <div id="vung-hien-thi-anh-bang" style="flex: 1; min-height: 70px; border: 1px dashed #ccc; border-radius: 6px; display: flex; align-items: center; justify-content: flex-start; color: #adb5bd; font-size: 13px; font-style: italic; background: #fafafa; padding: 8px; gap: 10px; overflow-x: auto;">
//                                 <span id="text-cho-anh">(Ảnh bảng bổ sung sẽ xuất hiện tại đây...)</span>
//                             </div>
//                         </div>
//                     </div>

//                     <div style="background: #fff3cd; padding: 15px; border-radius: 8px; border: 1px solid #ffeeba;">
//                         <h4 style="margin: 0 0 10px 0; color: #856404;">📌 3. Dặn dò / Nhắc việc tiết sau</h4>
//                         <textarea placeholder="VD: Tiết sau kiểm tra 15 phút..." style="width: 100%; padding: 10px; border: 1px solid #f5c6cb; border-radius: 4px; box-sizing: border-box; resize: vertical; min-height: 60px; font-family: inherit; background: #fffcf8; color: #856404; font-weight: bold; outline: none;"></textarea>
//                     </div>

//                     <div style="margin-top: auto; padding-top: 20px; border-top: 1px dashed #dee2e6; text-align: right;">
//                         <button onclick="ham_20_6a_luu_bai_giang(this)" style="padding: 12px 25px; background: #007bff; color: white; border: none; border-radius: 6px; font-weight: bold; font-size: 14px; cursor: pointer; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: 0.2s;" onmouseover="this.style.background='#0056b3'" onmouseout="this.style.background='#007bff'">
//                             💾 1. LƯU NỘI DUNG BÀI GIẢNG
//                         </button>
//                     </div>
//                 </div>

//                 <!-- CỘT PHẢI: HỌC SINH -->
//                 <div style="flex: 1; min-width: 350px; display: flex; flex-direction: column; gap: 20px; background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #dee2e6; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                    
//                     <div id="vung-su-kien-da-luu" style="display: none; padding: 15px; background: #fff3cd; border: 1px dashed #856404; border-radius: 6px; margin-bottom: 5px; box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);"></div>

//                     <div>
//                         <h4 style="margin: 0 0 15px 0; color: #dc3545;">📋 4. Điểm danh (Học sinh vắng)</h4>
//                         <div id="nk-khu-vuc-diem-danh" style="display: flex; flex-direction: column; margin-bottom: 15px;">
//                             <div class="dong-hs-vang" style="display: flex; gap: 8px; align-items: center;">
//                                 <input class="nk-input-hs-vang" list="nk-dl-hs" placeholder="Chọn hoặc gõ tên HS vắng..." style="flex: 1; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; outline: none; font-size: 13px;">
//                                 <button onclick="this.parentElement.remove()" style="padding: 8px 12px; background: #f8d7da; color: #721c24; border: none; border-radius: 4px; cursor: pointer;" title="Xóa dòng này">✖</button>
//                             </div>
//                         </div>
//                         <button onclick="ham_20_12_them_dong_vang()" style="width: 100%; padding: 8px; background: #f8f9fa; border: 1px dashed #dc3545; color: #dc3545; border-radius: 4px; cursor: pointer; font-weight: bold; transition: 0.2s;" onmouseover="this.style.background='#f5c6cb'" onmouseout="this.style.background='#f8f9fa'">
//                             ➕ Thêm học sinh vắng
//                         </button>
//                     </div>

//                     <div style="flex: 1; display: flex; flex-direction: column; padding-top: 15px; border-top: 1px dashed #eee;">
//                         <h4 style="margin: 0 0 15px 0; color: #d35400;">🎯 5. Ghi nhận sự kiện học sinh</h4>
                        
//                         <div style="margin-bottom: 15px;">
//                             <label style="font-weight: bold; font-size: 13px; color: #495057;">Chọn học sinh (Có thể thêm nhóm):</label>
//                             <div id="nk-khu-vuc-hs-su-kien" style="display: flex; flex-direction: column; gap: 8px; margin-top: 5px;">
//                                 <div class="dong-hs-su-kien" style="display: flex; gap: 8px; align-items: center;">
//                                     <input class="nk-input-hs-su-kien" list="nk-dl-hs" placeholder="Gõ tên để tìm nhanh..." style="flex: 1; padding: 10px; border: 2px solid #fd7e14; border-radius: 6px; box-sizing: border-box; font-weight: bold; outline: none;">
//                                     <button onclick="this.parentElement.remove()" style="padding: 10px 12px; background: #f8d7da; color: #721c24; border: none; border-radius: 6px; cursor: pointer;" title="Xóa dòng này">✖</button>
//                                 </div>
//                             </div>
//                             <button onclick="ham_20_13_them_dong_hs_su_kien()" style="margin-top: 8px; width: 100%; padding: 8px; background: #fff; border: 1px dashed #fd7e14; color: #fd7e14; border-radius: 4px; cursor: pointer; font-weight: bold; transition: 0.2s;" onmouseover="this.style.background='#ffe8d6'" onmouseout="this.style.background='#fff'">
//                                 ➕ Thêm học sinh cùng sự kiện
//                             </button>
//                         </div>
                        
//                         <div style="margin-bottom: 15px;">
//                             <label style="font-weight: bold; font-size: 13px; color: #495057;">Ghi chú thêm (hoặc nhập tự do):</label>
//                             <input id="nk-input-ghi-chu" type="text" placeholder="VD: Bấm điện thoại dưới hộc bàn..." onkeydown="if(event.key === 'Enter') ham_20_3_gan_the('Khác', '#000')" style="width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; margin-top: 5px; outline: none;">
                            
//                             <button onclick="ham_20_3_gan_the('Khác', '#000')" style="margin-top: 8px; width: 100%; padding: 8px; font-size: 12px; background: #343a40; border: none; color: #fff; border-radius: 4px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: 0.2s;" onmouseover="this.style.background='#23272b'" onmouseout="this.style.background='#343a40'">
//                                 ➕ Ghi nhận sự kiện từ ô ghi chú này
//                             </button>
//                         </div>

//                         <div style="margin-bottom: 15px;">
//                             <label style="font-weight: bold; font-size: 13px; color: #495057; display: block; margin-bottom: 5px;">Bấm chọn để gắn thẻ nhanh:</label>
//                             <div id="nk-khu-vuc-tags"><span style="font-size: 12px; color: #999;">⏳ Đang tải...</span></div>
//                         </div>

//                         <div style="margin-bottom: 15px;">
//                             <label style="font-weight: bold; font-size: 13px; color: #495057; display: block; margin-bottom: 8px;">📸 Ảnh minh chứng (Nếu có):</label>
//                             <div style="display: flex; gap: 15px; align-items: flex-start;">
//                                 <button type="button" onclick="document.getElementById('nk-input-anh-minh-chung').click()" style="padding: 10px 15px; background: #f8f9fa; color: #495057; border: 1px dashed #adb5bd; border-radius: 6px; cursor: pointer; font-weight: bold; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 5px; transition: 0.2s; flex-shrink: 0;" onmouseover="this.style.background='#e9ecef'" onmouseout="this.style.background='#f8f9fa'">
//                                     <span style="font-size: 20px;">📷</span><span>Tải ảnh lên</span>
//                                 </button>
//                                 <input type="file" id="nk-input-anh-minh-chung" accept="image/*" multiple style="display: none;">
//                                 <div id="vung-preview-anh-minh-chung" style="flex: 1; min-height: 65px; border: 1px dashed #ccc; border-radius: 6px; display: flex; align-items: center; justify-content: flex-start; color: #adb5bd; font-size: 12px; font-style: italic; background: #fafafa; padding: 8px; gap: 8px; overflow-x: auto;">
//                                     <span id="text-cho-anh-mc">(Ảnh minh chứng xuất hiện tại đây...)</span>
//                                 </div>
//                             </div>
//                         </div>

//                         <div style="width: 100%; margin-bottom: 15px; padding: 10px; background: #e8f5e9; border: 1px dashed #28a745; border-radius: 6px; display: flex; gap: 8px; align-items: center; box-shadow: inset 0 1px 3px rgba(0,0,0,0.05); box-sizing: border-box;">
//                             <span style="font-size: 16px;" title="Cho điểm học sinh">💯</span>
//                             <input type="number" id="nk-input-diem-so" placeholder="Nhập điểm..." step="0.25" min="0" max="10" 
//                                 onkeydown="if(event.key === 'Enter') document.getElementById('btn-ghi-diem').click()" 
//                                 style="flex: 1; min-width: 80px; padding: 8px 10px; border: 1px solid #28a745; border-radius: 4px; outline: none; font-weight: bold; color: #155724; font-size: 13px;">
//                             <button id="btn-ghi-diem" 
//                                 onclick="let diem = document.getElementById('nk-input-diem-so').value; if(!diem){alert('Vui lòng nhập điểm!'); return;} ham_20_3_gan_the('Cho điểm: ' + diem + ' đ', '#28a745'); document.getElementById('nk-input-diem-so').value='';" 
//                                 style="padding: 8px 12px; font-size: 12px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; transition: 0.2s; white-space: nowrap;" 
//                                 onmouseover="this.style.background='#218838'" onmouseout="this.style.background='#28a745'">
//                                 Nhập điểm chờ lưu
//                             </button>
//                         </div>

//                         <div style="flex: 1; background: #f8f9fa; border: 1px dashed #ccc; border-radius: 6px; padding: 10px; overflow-y: auto; max-height: 200px;">
//                             <div style="font-size: 12px; font-weight: bold; color: #6c757d; margin-bottom: 10px; border-bottom: 1px solid #eee; padding-bottom: 5px;">Sự kiện chờ lưu (<span id="nk-dem-su-kien">0</span>):</div>
//                             <div id="nk-danh-sach-cho-luu"><i style="color: #adb5bd; font-size: 12px;">Chưa có sự kiện nào...</i></div>
//                         </div>
//                     </div>

//                     <div style="margin-top: auto; padding-top: 20px; border-top: 1px dashed #dee2e6; text-align: right;">
//                         <button onclick="ham_20_6b_luu_su_kien_diem_danh(this)" style="padding: 12px 25px; background: #28a745; color: white; border: none; border-radius: 6px; font-weight: bold; font-size: 14px; cursor: pointer; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: 0.2s;" onmouseover="this.style.background='#218838'" onmouseout="this.style.background='#28a745'">
//                             🎯 2. LƯU ĐIỂM DANH & SỰ KIỆN
//                         </button>
//                     </div>
//                 </div>

//             </div>
//         </div>
//     `;

//     if (typeof ham_20_7_tai_danh_sach_lop === 'function') ham_20_7_tai_danh_sach_lop();
//     if (typeof ham_20_8_tai_danh_sach_the === 'function') ham_20_8_tai_danh_sach_the();
//     if (typeof ham_20_11_kich_hoat_preview_anh === 'function') ham_20_11_kich_hoat_preview_anh();
//     if (typeof ham_20_22_kich_hoat_preview_anh_minh_chung === 'function') ham_20_22_kich_hoat_preview_anh_minh_chung();
// };


// =====================================================================
// KHỐI 20: TIỆN ÍCH - NHẬT KÝ DẠY HỌC (GIAO DIỆN TRỐNG MẶC ĐỊNH)
// =====================================================================
window.ham_20_1_mo_giao_dien_nhat_ky_day_hoc = function () {
    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
    if (!vungLamViec) return;

    const today = new Date().toISOString().split('T')[0];

    vungLamViec.innerHTML = `
        <div style="padding: 10px; animation: fadeIn 0.3s ease-in-out;">
            
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #17a2b8; padding-bottom: 10px; margin-bottom: 20px;">
                <h3 style="color: #17a2b8; margin: 0; text-transform: uppercase; display: flex; align-items: center; gap: 10px;">
                    📔 Nhật Ký Dạy Học
                </h3>
                
                <div style="display: flex; gap: 10px;">
                    <!-- 🌟 NÚT MỚI: DỌN DẸP LÀM TIẾT MỚI -->
                    <button onclick="ham_20_29_lam_moi_tiet_hoc()" style="padding: 6px 15px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: 0.2s;" onmouseover="this.style.background='#0056b3'" onmouseout="this.style.background='#007bff'">
                        🆕 Tiết mới
                    </button>

                    <!-- NÚT GỌI LẠI TIẾT GẦN NHẤT -->
                    <button onclick="ham_20_28_tai_tiet_gan_nhat()" style="padding: 6px 15px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: 0.2s;" onmouseover="this.style.background='#218838'" onmouseout="this.style.background='#28a745'">
                        🔄 Tiết gần nhất
                    </button>

                    <button onclick="ham_20_14_giao_dien_tra_cuu()" style="padding: 6px 15px; background: #ffc107; color: #000; border: 1px solid #d39e00; border-radius: 4px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: 0.2s;">
                        🔍 Tìm lại
                    </button>
                    
                    <button onclick="ham_3_1_ve_dashboard_admin()" style="padding: 6px 15px; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        ⬅️ Quay lại
                    </button>
                </div>
            </div>

            <!-- THÔNG TIN CHUNG -->
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border: 1px solid #ced4da; box-shadow: 0 2px 4px rgba(0,0,0,0.02); margin-bottom: 20px;">
                <h4 style="margin: 0 0 15px 0; color: #495057;">🕒 1. Thông tin chung của tiết học</h4>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 15px;">
                    <div>
                        <label style="font-weight: bold; font-size: 13px; color: #6c757d;">Ngày dạy:</label>
                        <input type="date" value="${today}" onchange="if(typeof ham_20_27_kiem_tra_tiet_da_luu === 'function') ham_20_27_kiem_tra_tiet_da_luu();" style="width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; font-weight: bold; color: #0056b3; outline: none;">
                    </div>
                    <div>
                        <label style="font-weight: bold; font-size: 13px; color: #6c757d;">Buổi:</label>
                        <input id="nk-input-buoi" list="dl-buoi" onchange="if(typeof ham_20_27_kiem_tra_tiet_da_luu === 'function') ham_20_27_kiem_tra_tiet_da_luu();" onfocus="this.dataset.old = this.value; this.value='';" onblur="if(!this.value) this.value = this.dataset.old;" placeholder="Chọn / Gõ..." style="width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; outline: none;">
                        <datalist id="dl-buoi"><option value="Sáng"></option><option value="Chiều"></option><option value="Tối"></option></datalist>
                    </div>
                    <div>
                        <label style="font-weight: bold; font-size: 13px; color: #6c757d;">Tiết:</label>
                        <input id="nk-input-tiet" list="dl-tiet" onchange="if(typeof ham_20_27_kiem_tra_tiet_da_luu === 'function') ham_20_27_kiem_tra_tiet_da_luu();" onfocus="this.dataset.old = this.value; this.value='';" onblur="if(!this.value) this.value = this.dataset.old;" placeholder="Chọn / Gõ..." style="width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; outline: none;">
                        <datalist id="dl-tiet"><option value="Tiết 1"></option><option value="Tiết 2"></option><option value="Tiết 3"></option><option value="Tiết 4"></option><option value="Tiết 5"></option></datalist>
                    </div>
                    <div>
                        <label style="font-weight: bold; font-size: 13px; color: #6c757d;">Lớp:</label>
                        <input id="nk-input-lop" list="dl-lop" onchange="ham_20_2_tai_danh_sach_hs_theo_lop(); if(typeof ham_20_27_kiem_tra_tiet_da_luu === 'function') ham_20_27_kiem_tra_tiet_da_luu();" placeholder="VD: 12TN6..." style="width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; font-weight: bold; color: #0056b3; outline: none;">
                        <datalist id="dl-lop"></datalist>
                        <datalist id="nk-dl-hs"></datalist>
                    </div>
                    <div>
                        <label style="font-weight: bold; font-size: 13px; color: #6c757d;">Phân môn:</label>
                        <input id="nk-input-mon" list="dl-mon" onfocus="this.dataset.old = this.value; this.value='';" onblur="if(!this.value) this.value = this.dataset.old;" placeholder="Chọn / Gõ..." style="width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; outline: none;">
                        <datalist id="dl-mon"><option value="Đại số"></option><option value="Hình học"></option><option value="Thống kê xác suất"></option><option value="Hoạt động trải nghiệm"></option></datalist>
                    </div>
                </div>
            </div>

            <div style="display: flex; gap: 20px; flex-wrap: wrap;">
                
                <!-- CỘT TRÁI: BÀI GIẢNG -->
                <div style="flex: 1.5; min-width: 400px; display: flex; flex-direction: column; gap: 20px; background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #dee2e6; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
                    <div>
                        <h4 style="margin: 0 0 15px 0; color: #0056b3;">📝 2. Nội dung bài giảng</h4>
                        <label style="font-weight: bold; font-size: 13px; color: #495057;">Tên bài / Chủ đề:</label>
                        <input id="nk-input-ten-bai" type="text" placeholder="Nhập tên bài học / chủ đề..." style="width: 100%; padding: 10px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; margin-bottom: 15px; font-weight: bold; color: #0056b3; outline: none;">

                        <label style="font-weight: bold; font-size: 13px; color: #495057;">Nội dung chủ đề / Lý thuyết:</label>
                        <textarea placeholder="Ghi chú nhanh lý thuyết đã dạy..." style="width: 100%; padding: 10px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; margin-bottom: 15px; resize: vertical; min-height: 60px; font-family: inherit; outline: none;"></textarea>

                        <label style="font-weight: bold; font-size: 13px; color: #495057;">Bài tập đã giải & Bài tập về nhà:</label>
                        <textarea placeholder="VD: Giải BT 1,2 SGK. BTVN: Trắc nghiệm trang 45." style="width: 100%; padding: 10px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; margin-bottom: 15px; resize: vertical; min-height: 60px; font-family: inherit; outline: none;"></textarea>

                        <label style="font-weight: bold; font-size: 13px; color: #17a2b8; display: block; margin-bottom: 8px;">📸 Lưu ảnh bảng giảng dạy:</label>
                        
                        <div id="vung-anh-bai-giang-da-luu" style="display: none; padding: 12px; background: #e8f5e9; border: 1px dashed #28a745; border-radius: 6px; margin-bottom: 15px; box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);"></div>

                        <div style="display: flex; gap: 15px; align-items: flex-start;">
                            <button type="button" id="btn-tai-anh-bai-giang" onclick="document.getElementById('nk-input-anh-bai-giang').click()" style="padding: 12px 20px; background: #e0f7fa; color: #00838f; border: 1px dashed #00acc1; border-radius: 6px; cursor: pointer; font-weight: bold; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 5px; transition: 0.2s; flex-shrink: 0;">
                                <span style="font-size: 24px;">📷</span><span>Tải ảnh lên</span>
                            </button>
                            <input type="file" id="nk-input-anh-bai-giang" accept="image/*" multiple style="display: none;">
                            <div id="vung-hien-thi-anh-bang" style="flex: 1; min-height: 70px; border: 1px dashed #ccc; border-radius: 6px; display: flex; align-items: center; justify-content: flex-start; color: #adb5bd; font-size: 13px; font-style: italic; background: #fafafa; padding: 8px; gap: 10px; overflow-x: auto;">
                                <span id="text-cho-anh">(Ảnh bảng bổ sung sẽ xuất hiện tại đây...)</span>
                            </div>
                        </div>
                    </div>

                    <div style="background: #fff3cd; padding: 15px; border-radius: 8px; border: 1px solid #ffeeba;">
                        <h4 style="margin: 0 0 10px 0; color: #856404;">📌 3. Dặn dò / Nhắc việc tiết sau</h4>
                        <textarea placeholder="VD: Tiết sau kiểm tra 15 phút..." style="width: 100%; padding: 10px; border: 1px solid #f5c6cb; border-radius: 4px; box-sizing: border-box; resize: vertical; min-height: 60px; font-family: inherit; background: #fffcf8; color: #856404; font-weight: bold; outline: none;"></textarea>
                    </div>

                    <div style="margin-top: auto; padding-top: 20px; border-top: 1px dashed #dee2e6; text-align: right;">
                        <button onclick="ham_20_6a_luu_bai_giang(this)" style="padding: 12px 25px; background: #007bff; color: white; border: none; border-radius: 6px; font-weight: bold; font-size: 14px; cursor: pointer; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: 0.2s;" onmouseover="this.style.background='#0056b3'" onmouseout="this.style.background='#007bff'">
                            💾 1. LƯU NỘI DUNG BÀI GIẢNG
                        </button>
                    </div>
                </div>

                <!-- CỘT PHẢI: HỌC SINH -->
                <div style="flex: 1; min-width: 350px; display: flex; flex-direction: column; gap: 20px; background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #dee2e6; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                    
                    <div id="vung-su-kien-da-luu" style="display: none; padding: 15px; background: #fff3cd; border: 1px dashed #856404; border-radius: 6px; margin-bottom: 5px; box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);"></div>

                    <div>
                        <h4 style="margin: 0 0 15px 0; color: #dc3545;">📋 4. Điểm danh (Học sinh vắng)</h4>
                        <div id="nk-khu-vuc-diem-danh" style="display: flex; flex-direction: column; margin-bottom: 15px;">
                            <div class="dong-hs-vang" style="display: flex; gap: 8px; align-items: center;">
                                <input class="nk-input-hs-vang" list="nk-dl-hs" placeholder="Chọn hoặc gõ tên HS vắng..." style="flex: 1; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; outline: none; font-size: 13px;">
                                <button onclick="this.parentElement.remove()" style="padding: 8px 12px; background: #f8d7da; color: #721c24; border: none; border-radius: 4px; cursor: pointer;" title="Xóa dòng này">✖</button>
                            </div>
                        </div>
                        <button onclick="ham_20_12_them_dong_vang()" style="width: 100%; padding: 8px; background: #f8f9fa; border: 1px dashed #dc3545; color: #dc3545; border-radius: 4px; cursor: pointer; font-weight: bold; transition: 0.2s;" onmouseover="this.style.background='#f5c6cb'" onmouseout="this.style.background='#f8f9fa'">
                            ➕ Thêm học sinh vắng
                        </button>
                    </div>

                    <div style="flex: 1; display: flex; flex-direction: column; padding-top: 15px; border-top: 1px dashed #eee;">
                        <h4 style="margin: 0 0 15px 0; color: #d35400;">🎯 5. Ghi nhận sự kiện học sinh</h4>
                        
                        <div style="margin-bottom: 15px;">
                            <label style="font-weight: bold; font-size: 13px; color: #495057;">Chọn học sinh (Có thể thêm nhóm):</label>
                            <div id="nk-khu-vuc-hs-su-kien" style="display: flex; flex-direction: column; gap: 8px; margin-top: 5px;">
                                <div class="dong-hs-su-kien" style="display: flex; gap: 8px; align-items: center;">
                                    <input class="nk-input-hs-su-kien" list="nk-dl-hs" placeholder="Gõ tên để tìm nhanh..." style="flex: 1; padding: 10px; border: 2px solid #fd7e14; border-radius: 6px; box-sizing: border-box; font-weight: bold; outline: none;">
                                    <button onclick="this.parentElement.remove()" style="padding: 10px 12px; background: #f8d7da; color: #721c24; border: none; border-radius: 6px; cursor: pointer;" title="Xóa dòng này">✖</button>
                                </div>
                            </div>
                            <button onclick="ham_20_13_them_dong_hs_su_kien()" style="margin-top: 8px; width: 100%; padding: 8px; background: #fff; border: 1px dashed #fd7e14; color: #fd7e14; border-radius: 4px; cursor: pointer; font-weight: bold; transition: 0.2s;" onmouseover="this.style.background='#ffe8d6'" onmouseout="this.style.background='#fff'">
                                ➕ Thêm học sinh cùng sự kiện
                            </button>
                        </div>
                        
                        <div style="margin-bottom: 15px;">
                            <label style="font-weight: bold; font-size: 13px; color: #495057;">Ghi chú thêm (hoặc nhập tự do):</label>
                            <input id="nk-input-ghi-chu" type="text" placeholder="VD: Bấm điện thoại dưới hộc bàn..." onkeydown="if(event.key === 'Enter') ham_20_3_gan_the('Khác', '#000')" style="width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; margin-top: 5px; outline: none;">
                            
                            <button onclick="ham_20_3_gan_the('Khác', '#000')" style="margin-top: 8px; width: 100%; padding: 8px; font-size: 12px; background: #343a40; border: none; color: #fff; border-radius: 4px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: 0.2s;" onmouseover="this.style.background='#23272b'" onmouseout="this.style.background='#343a40'">
                                ➕ Ghi nhận sự kiện từ ô ghi chú này
                            </button>
                        </div>

                        <div style="margin-bottom: 15px;">
                            <label style="font-weight: bold; font-size: 13px; color: #495057; display: block; margin-bottom: 5px;">Bấm chọn để gắn thẻ nhanh:</label>
                            <div id="nk-khu-vuc-tags"><span style="font-size: 12px; color: #999;">⏳ Đang tải...</span></div>
                        </div>

                        <div style="margin-bottom: 15px;">
                            <label style="font-weight: bold; font-size: 13px; color: #495057; display: block; margin-bottom: 8px;">📸 Ảnh minh chứng (Nếu có):</label>
                            <div style="display: flex; gap: 15px; align-items: flex-start;">
                                <button type="button" onclick="document.getElementById('nk-input-anh-minh-chung').click()" style="padding: 10px 15px; background: #f8f9fa; color: #495057; border: 1px dashed #adb5bd; border-radius: 6px; cursor: pointer; font-weight: bold; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 5px; transition: 0.2s; flex-shrink: 0;" onmouseover="this.style.background='#e9ecef'" onmouseout="this.style.background='#f8f9fa'">
                                    <span style="font-size: 20px;">📷</span><span>Tải ảnh lên</span>
                                </button>
                                <input type="file" id="nk-input-anh-minh-chung" accept="image/*" multiple style="display: none;">
                                <div id="vung-preview-anh-minh-chung" style="flex: 1; min-height: 65px; border: 1px dashed #ccc; border-radius: 6px; display: flex; align-items: center; justify-content: flex-start; color: #adb5bd; font-size: 12px; font-style: italic; background: #fafafa; padding: 8px; gap: 8px; overflow-x: auto;">
                                    <span id="text-cho-anh-mc">(Ảnh minh chứng xuất hiện tại đây...)</span>
                                </div>
                            </div>
                        </div>

                        <div style="width: 100%; margin-bottom: 15px; padding: 10px; background: #e8f5e9; border: 1px dashed #28a745; border-radius: 6px; display: flex; gap: 8px; align-items: center; box-shadow: inset 0 1px 3px rgba(0,0,0,0.05); box-sizing: border-box;">
                            <span style="font-size: 16px;" title="Cho điểm học sinh">💯</span>
                            <input type="number" id="nk-input-diem-so" placeholder="Nhập điểm..." step="0.25" min="0" max="10" 
                                onkeydown="if(event.key === 'Enter') document.getElementById('btn-ghi-diem').click()" 
                                style="flex: 1; min-width: 80px; padding: 8px 10px; border: 1px solid #28a745; border-radius: 4px; outline: none; font-weight: bold; color: #155724; font-size: 13px;">
                            <button id="btn-ghi-diem" 
                                onclick="let diem = document.getElementById('nk-input-diem-so').value; if(!diem){alert('Vui lòng nhập điểm!'); return;} ham_20_3_gan_the('Cho điểm: ' + diem + ' đ', '#28a745'); document.getElementById('nk-input-diem-so').value='';" 
                                style="padding: 8px 12px; font-size: 12px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; transition: 0.2s; white-space: nowrap;" 
                                onmouseover="this.style.background='#218838'" onmouseout="this.style.background='#28a745'">
                                Nhập điểm chờ lưu
                            </button>
                        </div>

                        <div style="flex: 1; background: #f8f9fa; border: 1px dashed #ccc; border-radius: 6px; padding: 10px; overflow-y: auto; max-height: 200px;">
                            <div style="font-size: 12px; font-weight: bold; color: #6c757d; margin-bottom: 10px; border-bottom: 1px solid #eee; padding-bottom: 5px;">Sự kiện chờ lưu (<span id="nk-dem-su-kien">0</span>):</div>
                            <div id="nk-danh-sach-cho-luu"><i style="color: #adb5bd; font-size: 12px;">Chưa có sự kiện nào...</i></div>
                        </div>
                    </div>

                    <div style="margin-top: auto; padding-top: 20px; border-top: 1px dashed #dee2e6; text-align: right;">
                        <button onclick="ham_20_6b_luu_su_kien_diem_danh(this)" style="padding: 12px 25px; background: #28a745; color: white; border: none; border-radius: 6px; font-weight: bold; font-size: 14px; cursor: pointer; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: 0.2s;" onmouseover="this.style.background='#218838'" onmouseout="this.style.background='#28a745'">
                            🎯 2. LƯU ĐIỂM DANH & SỰ KIỆN
                        </button>
                    </div>
                </div>

            </div>
        </div>
    `;

    if (typeof ham_20_7_tai_danh_sach_lop === 'function') ham_20_7_tai_danh_sach_lop();
    if (typeof ham_20_8_tai_danh_sach_the === 'function') ham_20_8_tai_danh_sach_the();
    if (typeof ham_20_11_kich_hoat_preview_anh === 'function') ham_20_11_kich_hoat_preview_anh();
    if (typeof ham_20_22_kich_hoat_preview_anh_minh_chung === 'function') ham_20_22_kich_hoat_preview_anh_minh_chung();
};











// // // =======================================================
// // // HÀM 20.2: TỰ ĐỘNG TẢI DANH SÁCH HỌC SINH TỪ SUPABASE
// // // =======================================================
// // window.ham_20_2_tai_danh_sach_hs_theo_lop = async function () {
// //     const inputLop = document.getElementById('nk-input-lop');
// //     const datalistHS = document.getElementById('nk-dl-hs');
// //     const inputHS = document.getElementById('nk-input-hs');

// //     if (!inputLop || !datalistHS || !inputHS) return;

// //     let rawLop = inputLop.value.trim();
// //     if (!rawLop) {
// //         datalistHS.innerHTML = '';
// //         inputHS.value = '';
// //         return;
// //     }

// //     let maLop = rawLop;
// //     let match = rawLop.match(/\(([^)]+)\)$/);
// //     if (match) maLop = match[1].trim();

// //     inputHS.value = '';
// //     inputHS.placeholder = "⏳ Đang tải danh sách...";
// //     inputHS.disabled = true;

// //     try {
// //         const { data: hsData, error } = await _supabase
// //             .from('hoc_sinh')
// //             .select('*')
// //             .contains('danh_sach_ma_lop', JSON.stringify([maLop]));

// //         if (error) throw error;

// //         datalistHS.innerHTML = '';

// //         if (hsData && hsData.length > 0) {
// //             hsData.forEach(hs => {
// //                 let uidHS = hs.uid || hs.id || '';
// //                 let tenDangNhap = hs.sdt || hs.ten_dang_nhap || hs.ma_hs || '';
// //                 let tenHienThi = hs.ten || hs.ho_ten || hs.ho_va_ten || 'Chưa có tên';

// //                 let option = document.createElement('option');
// //                 // 🌟 Giao diện hiển thị cực gọn: Tên học sinh - Tên đăng nhập
// //                 option.value = `${tenHienThi} - ${tenDangNhap}`;
// //                 // 🌟 Thủ thuật cất giấu UID ngầm để lát nữa dùng
// //                 option.dataset.uid = uidHS;

// //                 datalistHS.appendChild(option);
// //             });
// //             inputHS.placeholder = `Đã tải ${hsData.length} học sinh. Nhập để chọn...`;
// //         } else {
// //             inputHS.placeholder = `❌ Không tìm thấy HS lớp ${maLop}!`;
// //         }
// //     } catch (err) {
// //         console.error("Lỗi tải học sinh:", err);
// //         inputHS.placeholder = "❌ Lỗi dữ liệu! Bấm F12 xem Console.";
// //     } finally {
// //         inputHS.disabled = false;
// //     }
// // };


// // =======================================================
// // HÀM 20.2: TỰ ĐỘNG TẢI DANH SÁCH HỌC SINH TỪ SUPABASE
// // =======================================================
// window.ham_20_2_tai_danh_sach_hs_theo_lop = async function () {
//     const inputLop = document.getElementById('nk-input-lop');
//     const datalistHS = document.getElementById('nk-dl-hs');

//     // Quét tất cả các ô nhập liệu học sinh (cả điểm danh lẫn sự kiện)
//     const cacOChonHS = document.querySelectorAll('.nk-input-hs-vang, .nk-input-hs-su-kien');

//     if (!inputLop || !datalistHS) return;

//     let rawLop = inputLop.value.trim();
//     if (!rawLop) {
//         datalistHS.innerHTML = '';
//         cacOChonHS.forEach(o => o.value = '');
//         return;
//     }

//     let maLop = rawLop.match(/\(([^)]+)\)$/) ? rawLop.match(/\(([^)]+)\)$/)[1].trim() : rawLop;

//     // Đổi placeholder báo hiệu đang tải
//     cacOChonHS.forEach(o => {
//         o.value = '';
//         o.placeholder = "⏳ Đang tải danh sách...";
//         o.disabled = true;
//     });

//     try {
//         const { data: hsData, error } = await _supabase
//             .from('hoc_sinh')
//             .select('*')
//             .contains('danh_sach_ma_lop', JSON.stringify([maLop]));

//         if (error) throw error;

//         datalistHS.innerHTML = '';

//         if (hsData && hsData.length > 0) {
//             hsData.forEach(hs => {
//                 let uidHS = hs.uid || hs.id || '';
//                 let tenDangNhap = hs.sdt || hs.ten_dang_nhap || hs.ma_hs || '';
//                 let tenHienThi = hs.ten || hs.ho_ten || hs.ho_va_ten || 'Chưa có tên';

//                 let option = document.createElement('option');
//                 option.value = `${tenHienThi} - ${tenDangNhap}`;
//                 option.dataset.uid = uidHS;

//                 datalistHS.appendChild(option);
//             });

//             // Cập nhật lại placeholder khi tải thành công
//             cacOChonHS.forEach(o => o.placeholder = `Đã tải ${hsData.length} học sinh. Nhập để chọn...`);
//         } else {
//             cacOChonHS.forEach(o => o.placeholder = `❌ Không tìm thấy HS lớp ${maLop}!`);
//         }
//     } catch (err) {
//         console.error("Lỗi tải học sinh:", err);
//         cacOChonHS.forEach(o => o.placeholder = "❌ Lỗi dữ liệu! Bấm F12 xem Console.");
//     } finally {
//         cacOChonHS.forEach(o => o.disabled = false);
//     }
// };


// =======================================================
// HÀM 20.2: TỰ ĐỘNG TẢI DANH SÁCH HS TỪ SUPABASE
// =======================================================
window.ham_20_2_tai_danh_sach_hs_theo_lop = async function () {
    // 🌟 Quét tìm ô Lớp ở CẢ 2 màn hình (Tra cứu: tc-input-lop, Ghi sổ: nk-input-lop)
    const inputLop = document.getElementById('tc-input-lop') || document.getElementById('nk-input-lop');
    const datalistHS = document.getElementById('nk-dl-hs');
    const cacOChonHS = document.querySelectorAll('.nk-input-hs-vang, .nk-input-hs-su-kien');

    if (!inputLop || !datalistHS) return;

    let rawLop = inputLop.value.trim();
    if (!rawLop) {
        datalistHS.innerHTML = '';
        cacOChonHS.forEach(o => o.value = '');
        return;
    }

    let maLop = rawLop.match(/\(([^)]+)\)$/) ? rawLop.match(/\(([^)]+)\)$/)[1].trim() : rawLop;

    cacOChonHS.forEach(o => {
        o.value = '';
        o.placeholder = "⏳ Đang tải danh sách...";
        o.disabled = true;
    });

    try {
        const { data: hsData, error } = await _supabase
            .from('hoc_sinh')
            .select('*')
            .contains('danh_sach_ma_lop', JSON.stringify([maLop]));

        if (error) throw error;
        datalistHS.innerHTML = '';

        if (hsData && hsData.length > 0) {
            hsData.forEach(hs => {
                let uidHS = hs.uid || hs.id || '';
                let tenDangNhap = hs.sdt || hs.ten_dang_nhap || hs.ma_hs || '';
                let tenHienThi = hs.ten || hs.ho_ten || hs.ho_va_ten || 'Chưa có tên';

                let option = document.createElement('option');
                option.value = `${tenHienThi} - ${tenDangNhap}`;
                option.dataset.uid = uidHS;
                datalistHS.appendChild(option);
            });
            cacOChonHS.forEach(o => o.placeholder = `Đã tải ${hsData.length} HS. Nhập để chọn...`);
        } else {
            cacOChonHS.forEach(o => o.placeholder = `❌ Không tìm thấy HS lớp ${maLop}!`);
        }
    } catch (err) {
        console.error("Lỗi tải học sinh:", err);
        cacOChonHS.forEach(o => o.placeholder = "❌ Lỗi dữ liệu!");
    } finally {
        cacOChonHS.forEach(o => o.disabled = false);
    }
};


// =======================================================
// HÀM 20.3: XỬ LÝ KHI BẤM NÚT "GẮN THẺ" HOẶC "NHẬP ĐIỂM"
// =======================================================
window.ham_20_3_gan_the = function (tenThe, mauSac = '#000') {
    const cacOChonHS = document.querySelectorAll('.nk-input-hs-su-kien');
    const oGhiChu = document.getElementById('nk-input-ghi-chu');
    let noiDungGhiChu = oGhiChu.value.trim();

    let coHocSinhDuocChon = false;

    // Check xem thẻ Điểm thì lưu riêng điểm số
    let diemSo = null;
    if (tenThe.startsWith('Cho điểm: ')) {
        diemSo = parseFloat(tenThe.split(': ')[1]);
        tenThe = 'Cho điểm';
    }

    // 🌟 Lấy ảnh minh chứng từ mảng tạm thay vì lấy từ input trực tiếp
    let mangFileAnhMC = [];
    if (window.danhSachAnhMinhChungTam && window.danhSachAnhMinhChungTam.length > 0) {
        mangFileAnhMC = [...window.danhSachAnhMinhChungTam];
    }

    cacOChonHS.forEach(oHS => {
        const hSInfo = oHS.value.trim();
        if (hSInfo) {
            coHocSinhDuocChon = true;
            const danhSachOptions = document.querySelectorAll('#nk-dl-hs option');
            let uidHS = null;
            let sdtHS = '';

            danhSachOptions.forEach(opt => {
                if (opt.value === hSInfo) {
                    uidHS = opt.dataset.uid;
                    sdtHS = opt.dataset.sdt;
                }
            });

            if (uidHS) {
                let suKienMoi = {
                    id_tam: 'sk_' + Date.now() + Math.random(),
                    uid_hoc_sinh: uidHS,
                    ten_hoc_sinh: hSInfo.split(' - ')[0].trim(),
                    sdt_hoc_sinh: sdtHS,
                    loai_the: tenThe,
                    ghi_chu: noiDungGhiChu,
                    mau_sac: mauSac,
                    diem_so: diemSo,
                    mang_file_minh_chung: mangFileAnhMC // Gắn toàn bộ mảng file chụp được vào sự kiện
                };
                danhSachSuKienTam.push(suKienMoi);
            }
        }
    });

    if (!coHocSinhDuocChon) {
        alert("⚠️ Thầy chưa nhập tên học sinh nào để gắn thẻ/điểm!");
        return;
    }

    // Xóa trắng mọi thứ để chuẩn bị cho lượt nhập tiếp theo
    cacOChonHS.forEach((o, i) => { if (i > 0) o.parentElement.remove(); else o.value = ''; });
    oGhiChu.value = '';

    // Xóa trắng mảng ảnh minh chứng tạm và giao diện hiển thị
    window.danhSachAnhMinhChungTam = [];
    if (typeof ham_20_22_render_anh_minh_chung === 'function') ham_20_22_render_anh_minh_chung();

    if (typeof ham_20_4_ve_danh_sach_cho === 'function') ham_20_4_ve_danh_sach_cho();
};






// Biến lưu trữ tạm các sự kiện trên RAM trước khi bấm LƯU vào DB
window.danhSachSuKienTam = [];

// =======================================================
// HÀM 20.4: VẼ LẠI DANH SÁCH SỰ KIỆN CHỜ LƯU
// =======================================================
window.ham_20_4_ve_danh_sach_cho = function () {
    const vungHienThi = document.getElementById('nk-danh-sach-cho-luu');
    const boDem = document.getElementById('nk-dem-su-kien');
    if (!vungHienThi) return;

    // Đảm bảo biến toàn cục tồn tại
    if (!window.danhSachSuKienTam) window.danhSachSuKienTam = [];

    if (window.danhSachSuKienTam.length > 0) {
        if (boDem) boDem.innerText = window.danhSachSuKienTam.length;

        let html = '';
        window.danhSachSuKienTam.forEach((sk, index) => {
            // Xử lý hiển thị thông tin phụ an toàn
            let diemStr = sk.diem_so ? ` <span style="background:#28a745; color:white; padding:2px 5px; border-radius:3px; font-size:10px; margin-left:5px;">⭐ ${sk.diem_so}đ</span>` : '';
            let noteStr = sk.ghi_chu ? `<div style="font-size: 11px; color: #666; margin-top: 2px;"><i>📝 ${sk.ghi_chu}</i></div>` : '';
            let anhMCStr = (sk.mang_file_minh_chung && sk.mang_file_minh_chung.length > 0) ? `<span style="font-size: 10px; color: #17a2b8; margin-left: 5px;">📸 ${sk.mang_file_minh_chung.length} ảnh</span>` : '';

            // Truyền cứng biến index (số nguyên) vào onclick, không bao giờ bị lỗi nháy
            html += `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px; border-bottom: 1px dashed #eee; background: #fff; border-radius: 4px; margin-bottom: 5px; box-shadow: 0 1px 2px rgba(0,0,0,0.02);">
                    <div style="flex: 1;">
                        <div style="font-size: 13px;">
                            <b>${sk.ten_hoc_sinh}</b> 
                            <span style="color: ${sk.mau_sac || '#000'}; font-weight: bold; margin-left: 5px;">[${sk.loai_the}]</span>
                            ${diemStr}
                            ${anhMCStr}
                        </div>
                        ${noteStr}
                    </div>
                    <button type="button" onclick="ham_20_5_xoa_su_kien_tam(${index})" style="padding: 5px 10px; background: #f8d7da; color: #721c24; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; font-size: 12px; transition: 0.2s;" onmouseover="this.style.background='#f5c6cb'" onmouseout="this.style.background='#f8d7da'" title="Xóa sự kiện này">✖</button>
                </div>
            `;
        });
        vungHienThi.innerHTML = html;

    } else {
        if (boDem) boDem.innerText = '0';
        vungHienThi.innerHTML = '<i style="color: #adb5bd; font-size: 12px;">Chưa có sự kiện nào...</i>';
    }
};

// =======================================================
// HÀM 20.5: XÓA BỚT 1 SỰ KIỆN TẠM RA KHỎI DANH SÁCH
// =======================================================
window.ham_20_5_xoa_su_kien_tam = function (index) {
    if (window.danhSachSuKienTam && window.danhSachSuKienTam.length > index) {
        // Cắt bỏ 1 phần tử tại vị trí index
        window.danhSachSuKienTam.splice(index, 1);
        // Vẽ lại giao diện
        ham_20_4_ve_danh_sach_cho();
    }
};

// // Hàm nhỏ gọn hỗ trợ xóa nếu thầy lỡ tay bấm nhầm tag
// window.ham_20_5_xoa_su_kien_tam = function (idTam) {
//     danhSachSuKienTam = danhSachSuKienTam.filter(sk => sk.id_tam !== idTam);
//     ham_20_4_ve_danh_sach_cho();
// };


// // =======================================================
// // HÀM 20.6A: LƯU NỘI DUNG BÀI GIẢNG VÀ ẢNH CHỤP LÊN CLOUD (CÓ THANH TIẾN TRÌNH)
// // =======================================================
// window.ham_20_6a_luu_bai_giang = async function (btnLuu) {
//     const ngayDay = document.querySelector('input[type="date"]').value;
//     let rawLop = document.getElementById('nk-input-lop').value.trim();
//     let maLopLuu = rawLop.match(/\(([^)]+)\)$/) ? rawLop.match(/\(([^)]+)\)$/)[1].trim() : rawLop;
//     const buoi = document.getElementById('nk-input-buoi').value.trim();
//     const tiet = document.getElementById('nk-input-tiet').value.trim();
//     const phanMon = document.getElementById('nk-input-mon').value.trim();

//     if (!ngayDay || !buoi || !tiet || !maLopLuu) {
//         alert("⚠️ Vui lòng điền đủ 4 thông tin: Ngày, Buổi, Tiết, Lớp ở phần Thông tin chung!");
//         return;
//     }

//     const tenBai = document.getElementById('nk-input-ten-bai').value.trim();
//     const lyThuyet = document.querySelectorAll('textarea')[0].value.trim();
//     const baiTap = document.querySelectorAll('textarea')[1].value.trim();
//     const danDo = document.querySelectorAll('textarea')[2].value.trim();
//     const danhSachFileAnh = window.danhSachAnhBaiGiangTam || [];

//     if (!tenBai && !lyThuyet && !baiTap && !danDo && danhSachFileAnh.length === 0) {
//         alert("⚠️ Thầy chưa nhập nội dung bài giảng hay chọn ảnh nào!");
//         return;
//     }

//     const textGoc = btnLuu.innerHTML;
//     const bgGoc = btnLuu.style.background; // Lưu lại nền gốc để khôi phục
//     btnLuu.disabled = true;

//     try {
//         let mangLinkAnhDrive = [];

//         // 1. TẢI ẢNH LÊN GOOGLE DRIVE (ĐO TIẾN TRÌNH CHI TIẾT)
//         if (danhSachFileAnh.length > 0) {
//             for (let k = 0; k < danhSachFileAnh.length; k++) {
//                 let file = danhSachFileAnh[k];
//                 let base64String = await ham_ho_tro_doc_anh_base64(file);
//                 let duoiFile = file.name.includes('.') ? file.name.substring(file.name.lastIndexOf('.')) : '.jpg';
//                 let tenFileChuan = `BaiGiang_[${ngayDay}_${layGioPhutGiay()}]_Lop[${maLopLuu}]_Tiet[${tiet}]_Anh[${k + 1}]${duoiFile}`;

//                 btnLuu.innerHTML = `⏳ CHUẨN BỊ ẢNH (${k + 1}/${danhSachFileAnh.length})...`;

//                 let payload = { action: "upload_anh_nhat_ky", base64: base64String, mimeType: file.type, fileName: tenFileChuan, maLop: maLopLuu, loaiAnh: "BAI_GIANG" };

//                 // Đẩy lên qua XHR với thanh tiến trình màu xanh lấp đầy
//                 let result = await window.ham_ho_tro_upload_anh_co_tien_trinh(
//                     CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP,
//                     payload,
//                     function (phanTram, daTai, tongSo) {
//                         let strDaTai = window.ham_dinh_dang_dung_luong(daTai);
//                         let strTongSo = window.ham_dinh_dang_dung_luong(tongSo);

//                         // Hiệu ứng thanh tiến trình chạy trên nền nút
//                         btnLuu.style.background = `linear-gradient(90deg, #17a2b8 ${phanTram}%, #6c757d ${phanTram}%)`;
//                         btnLuu.innerHTML = `🚀 ĐANG TẢI ẢNH (${k + 1}/${danhSachFileAnh.length})<br><span style="font-size: 11px; font-weight: normal;">${strDaTai} / ${strTongSo} (${phanTram}%)</span>`;
//                     }
//                 );

//                 if (result.status === 'success') {
//                     mangLinkAnhDrive.push(result.url);
//                 } else {
//                     throw new Error(result.message || "Lỗi tải ảnh từ Apps Script.");
//                 }
//             }
//         }

//         // Khôi phục lại nền sau khi tải ảnh xong
//         btnLuu.style.background = bgGoc;
//         btnLuu.innerHTML = "⏳ ĐANG LƯU DỮ LIỆU DB...";

//         // 2. KIỂM TRA & LƯU VÀO DB
//         const { data: checkData, error: errCheck } = await _supabase.from('nhat_ky_day_hoc').select('id, danh_sach_anh').eq('ngay_day', ngayDay).eq('ma_lop', maLopLuu).eq('tiet', tiet);
//         if (errCheck) throw errCheck;

//         if (checkData && checkData.length > 0) {
//             let mangAnhCu = [];
//             let dbAnh = checkData[0].danh_sach_anh;
//             if (dbAnh) {
//                 if (Array.isArray(dbAnh)) mangAnhCu = dbAnh;
//                 else if (typeof dbAnh === 'string') {
//                     try { mangAnhCu = JSON.parse(dbAnh); } catch (e) { mangAnhCu = dbAnh.split(',').filter(l => l.trim()); }
//                 }
//             }
//             let mangAnhMoi = mangAnhCu.concat(mangLinkAnhDrive);

//             const { error: errUpdate } = await _supabase.from('nhat_ky_day_hoc').update({
//                 phan_mon: phanMon, ten_bai: tenBai, ly_thuyet: lyThuyet, bai_tap: baiTap, dan_do: danDo, danh_sach_anh: mangAnhMoi
//             }).eq('id', checkData[0].id);
//             if (errUpdate) throw errUpdate;
//         } else {
//             const { error: errInsert } = await _supabase.from('nhat_ky_day_hoc').insert([{
//                 ngay_day: ngayDay, buoi: buoi, tiet: tiet, ma_lop: maLopLuu, phan_mon: phanMon,
//                 ten_bai: tenBai, ly_thuyet: lyThuyet, bai_tap: baiTap, dan_do: danDo, danh_sach_anh: mangLinkAnhDrive
//             }]);
//             if (errInsert) throw errInsert;
//         }

//         alert("✅ Đã lưu NỘI DUNG BÀI GIẢNG thành công!");

//         // 3. RESET FORM
//         document.getElementById('nk-input-ten-bai').value = '';
//         document.querySelectorAll('textarea')[0].value = '';
//         document.querySelectorAll('textarea')[1].value = '';
//         document.querySelectorAll('textarea')[2].value = '';

//         window.danhSachAnhBaiGiangTam = [];
//         if (typeof ham_20_11_render_anh_bai_giang === 'function') ham_20_11_render_anh_bai_giang();

//     } catch (err) {
//         console.error("Lỗi lưu bài giảng:", err);
//         alert("❌ Lỗi: " + err.message);
//     } finally {
//         btnLuu.style.background = bgGoc;
//         btnLuu.innerHTML = textGoc;
//         btnLuu.disabled = false;
//     }
// };


// =======================================================
// HÀM 20.6A: LƯU NỘI DUNG BÀI GIẢNG VÀ ẢNH CHỤP LÊN CLOUD
// =======================================================
window.ham_20_6a_luu_bai_giang = async function (btnLuu) {
    const ngayDay = document.querySelector('input[type="date"]').value;
    let rawLop = document.getElementById('nk-input-lop').value.trim();
    let maLopLuu = rawLop.match(/\(([^)]+)\)$/) ? rawLop.match(/\(([^)]+)\)$/)[1].trim() : rawLop;
    const buoi = document.getElementById('nk-input-buoi').value.trim();
    const tiet = document.getElementById('nk-input-tiet').value.trim();
    const phanMon = document.getElementById('nk-input-mon').value.trim();

    if (!ngayDay || !buoi || !tiet || !maLopLuu) {
        alert("⚠️ Vui lòng điền đủ 4 thông tin: Ngày, Buổi, Tiết, Lớp ở phần Thông tin chung!");
        return;
    }

    const tenBai = document.getElementById('nk-input-ten-bai').value.trim();
    const lyThuyet = document.querySelectorAll('textarea')[0].value.trim();
    const baiTap = document.querySelectorAll('textarea')[1].value.trim();
    const danDo = document.querySelectorAll('textarea')[2].value.trim();
    const danhSachFileAnh = window.danhSachAnhBaiGiangTam || [];

    if (!tenBai && !lyThuyet && !baiTap && !danDo && danhSachFileAnh.length === 0) {
        alert("⚠️ Thầy chưa nhập nội dung bài giảng hay chọn ảnh nào!");
        return;
    }

    const textGoc = btnLuu.innerHTML;
    const bgGoc = btnLuu.style.background;
    btnLuu.disabled = true;

    try {
        let mangLinkAnhDrive = [];

        if (danhSachFileAnh.length > 0) {
            for (let k = 0; k < danhSachFileAnh.length; k++) {
                let file = danhSachFileAnh[k];
                let base64String = await ham_ho_tro_doc_anh_base64(file);
                let duoiFile = file.name.includes('.') ? file.name.substring(file.name.lastIndexOf('.')) : '.jpg';
                let tenFileChuan = `BaiGiang_[${ngayDay}_${layGioPhutGiay()}]_Lop[${maLopLuu}]_Tiet[${tiet}]_Anh[${k + 1}]${duoiFile}`;

                btnLuu.innerHTML = `⏳ CHUẨN BỊ ẢNH (${k + 1}/${danhSachFileAnh.length})...`;

                let payload = { action: "upload_anh_nhat_ky", base64: base64String, mimeType: file.type, fileName: tenFileChuan, maLop: maLopLuu, loaiAnh: "BAI_GIANG" };

                let result = await window.ham_ho_tro_upload_anh_co_tien_trinh(
                    CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP,
                    payload,
                    function (phanTram, daTai, tongSo) {
                        let strDaTai = window.ham_dinh_dang_dung_luong(daTai);
                        let strTongSo = window.ham_dinh_dang_dung_luong(tongSo);
                        btnLuu.style.background = `linear-gradient(90deg, #17a2b8 ${phanTram}%, #6c757d ${phanTram}%)`;
                        btnLuu.innerHTML = `🚀 ĐANG TẢI ẢNH (${k + 1}/${danhSachFileAnh.length})<br><span style="font-size: 11px; font-weight: normal;">${strDaTai} / ${strTongSo} (${phanTram}%)</span>`;
                    }
                );

                if (result.status === 'success') {
                    mangLinkAnhDrive.push(result.url);
                } else {
                    throw new Error(result.message || "Lỗi tải ảnh từ Apps Script.");
                }
            }
        }

        btnLuu.style.background = bgGoc;
        btnLuu.innerHTML = "⏳ ĐANG LƯU DỮ LIỆU DB...";

        const { data: checkData, error: errCheck } = await _supabase.from('nhat_ky_day_hoc').select('id, danh_sach_anh').eq('ngay_day', ngayDay).eq('ma_lop', maLopLuu).eq('tiet', tiet);
        if (errCheck) throw errCheck;

        if (checkData && checkData.length > 0) {
            let mangAnhCu = [];
            let dbAnh = checkData[0].danh_sach_anh;
            if (dbAnh) {
                if (Array.isArray(dbAnh)) mangAnhCu = dbAnh;
                else if (typeof dbAnh === 'string') {
                    try { mangAnhCu = JSON.parse(dbAnh); } catch (e) { mangAnhCu = dbAnh.split(',').filter(l => l.trim()); }
                }
            }
            let mangAnhMoi = mangAnhCu.concat(mangLinkAnhDrive);

            const { error: errUpdate } = await _supabase.from('nhat_ky_day_hoc').update({
                phan_mon: phanMon, ten_bai: tenBai, ly_thuyet: lyThuyet, bai_tap: baiTap, dan_do: danDo, danh_sach_anh: mangAnhMoi
            }).eq('id', checkData[0].id);
            if (errUpdate) throw errUpdate;
        } else {
            const { error: errInsert } = await _supabase.from('nhat_ky_day_hoc').insert([{
                ngay_day: ngayDay, buoi: buoi, tiet: tiet, ma_lop: maLopLuu, phan_mon: phanMon,
                ten_bai: tenBai, ly_thuyet: lyThuyet, bai_tap: baiTap, dan_do: danDo, danh_sach_anh: mangLinkAnhDrive
            }]);
            if (errInsert) throw errInsert;
        }

        // 🌟 GHI NHỚ LẠI LỊCH SỬ ĐỂ TỰ ĐỘNG LOAD KHI MỞ LẠI TAB
        localStorage.setItem('nk_last_ngayDay', ngayDay);
        localStorage.setItem('nk_last_buoi', buoi);
        localStorage.setItem('nk_last_tiet', tiet);
        localStorage.setItem('nk_last_lop', rawLop);

        alert("✅ Đã lưu NỘI DUNG BÀI GIẢNG thành công!");

        document.getElementById('nk-input-ten-bai').value = '';
        document.querySelectorAll('textarea')[0].value = '';
        document.querySelectorAll('textarea')[1].value = '';
        document.querySelectorAll('textarea')[2].value = '';

        window.danhSachAnhBaiGiangTam = [];
        if (typeof ham_20_11_render_anh_bai_giang === 'function') ham_20_11_render_anh_bai_giang();
        if (typeof ham_20_27_kiem_tra_tiet_da_luu === 'function') ham_20_27_kiem_tra_tiet_da_luu(); // Load lại ngay để hiện ảnh vừa chụp xuống dưới

    } catch (err) {
        console.error("Lỗi lưu bài giảng:", err);
        alert("❌ Lỗi: " + err.message);
    } finally {
        btnLuu.style.background = bgGoc;
        btnLuu.innerHTML = textGoc;
        btnLuu.disabled = false;
    }
};




// // =======================================================
// // HÀM 20.6B: LƯU SỰ KIỆN, ĐIỂM DANH & CHO ĐIỂM HỌC SINH (CÓ THANH TIẾN TRÌNH & SỬA LỖI NOT NULL)
// // =======================================================
// window.ham_20_6b_luu_su_kien_diem_danh = async function (btnLuu) {
//     const ngayDay = document.querySelector('input[type="date"]').value;
//     let rawLop = document.getElementById('nk-input-lop').value.trim();
//     let maLopLuu = rawLop.match(/\(([^)]+)\)$/) ? rawLop.match(/\(([^)]+)\)$/)[1].trim() : rawLop;
//     const buoi = document.getElementById('nk-input-buoi').value.trim();
//     const tiet = document.getElementById('nk-input-tiet').value.trim();
//     const phanMon = document.getElementById('nk-input-mon').value.trim();

//     if (!ngayDay || !buoi || !tiet || !maLopLuu) {
//         alert("⚠️ Vui lòng điền đủ 4 thông tin: Ngày, Buổi, Tiết, Lớp trước khi lưu sự kiện!");
//         return;
//     }

//     const cacOVan = document.querySelectorAll('.nk-input-hs-vang');
//     let coDuLieuDiemDanh = Array.from(cacOVan).some(o => o.value.trim() !== '');

//     if ((!danhSachSuKienTam || danhSachSuKienTam.length === 0) && !coDuLieuDiemDanh) {
//         alert("⚠️ Thầy chưa chọn học sinh vắng hoặc nhập sự kiện/cho điểm nào!");
//         return;
//     }

//     const textGoc = btnLuu.innerHTML;
//     const bgGoc = btnLuu.style.background;
//     btnLuu.disabled = true;

//     try {
//         let idNhatKy = null;

//         // 1. KIỂM TRA XEM TIẾT HỌC ĐÃ CÓ TRONG CSDL CHƯA
//         const { data: checkData, error: errCheck } = await _supabase.from('nhat_ky_day_hoc').select('id').eq('ngay_day', ngayDay).eq('ma_lop', maLopLuu).eq('tiet', tiet);
//         if (errCheck) throw errCheck;

//         if (checkData && checkData.length > 0) {
//             idNhatKy = checkData[0].id;
//         } else {
//             // TẠO TIẾT MỚI & LẤY ID TRẢ VỀ
//             const { data: nhatKyData, error: errInsertNK } = await _supabase.from('nhat_ky_day_hoc').insert([{
//                 ngay_day: ngayDay, buoi: buoi, tiet: tiet, ma_lop: maLopLuu, phan_mon: phanMon
//             }]).select();

//             if (errInsertNK) throw errInsertNK;
//             if (!nhatKyData || nhatKyData.length === 0) throw new Error("Không tạo được ID Nhật ký gốc.");
//             idNhatKy = nhatKyData[0].id;
//         }

//         let mangSuKienDB = [];
//         let uidsDaVangDB = new Set();

//         // Lấy danh sách HS đã vắng mặt trước đó để tránh lưu trùng
//         const { data: vangData } = await _supabase.from('nhat_ky_su_kien_hs').select('uid_hoc_sinh').eq('id_nhat_ky', idNhatKy).eq('loai_the', 'Vắng mặt');
//         if (vangData) vangData.forEach(row => uidsDaVangDB.add(row.uid_hoc_sinh));

//         let uidsTrongGiaoDien = new Set();
//         let tenCacHSDaTrung = [];
//         const danhSachOptions = document.querySelectorAll('#nk-dl-hs option');

//         // 2. GOM DỮ LIỆU ĐIỂM DANH (VẮNG MẶT)
//         cacOVan.forEach(oVang => {
//             let thongTinHS = oVang.value.trim();
//             if (thongTinHS) {
//                 let uidTimDuoc = null;
//                 danhSachOptions.forEach(opt => { if (opt.value === thongTinHS) uidTimDuoc = opt.dataset.uid; });
//                 let parts = thongTinHS.split(' - ');
//                 let tenHienThi = parts[0].trim();

//                 // 🌟 FIX LỖI NOT NULL: Luôn đảm bảo có giá trị (không được để null)
//                 let tenDangNhap = parts[1] ? parts[1].trim() : 'Không rõ';

//                 if (uidTimDuoc) {
//                     if (uidsTrongGiaoDien.has(uidTimDuoc) || uidsDaVangDB.has(uidTimDuoc)) {
//                         if (!tenCacHSDaTrung.includes(tenHienThi)) tenCacHSDaTrung.push(tenHienThi);
//                     } else {
//                         uidsTrongGiaoDien.add(uidTimDuoc);
//                         mangSuKienDB.push({
//                             id_nhat_ky: idNhatKy,
//                             uid_hoc_sinh: uidTimDuoc,
//                             ten_dang_nhap_hoc_sinh: tenDangNhap, // Đã khôi phục và bảo vệ
//                             ten_hoc_sinh: tenHienThi,
//                             loai_the: 'Vắng mặt',
//                             ghi_chu: 'Vắng mặt trong tiết học',
//                             thong_tin_mo_rong: { mau_sac: '#dc3545' }
//                         });
//                     }
//                 }
//             }
//         });

//         // 3. GOM DỮ LIỆU SỰ KIỆN & XỬ LÝ ẢNH MINH CHỨNG
//         if (danhSachSuKienTam && danhSachSuKienTam.length > 0) {
//             for (let i = 0; i < danhSachSuKienTam.length; i++) {
//                 let sk = danhSachSuKienTam[i];
//                 let mangLinkAnhDrive = [];

//                 if (sk.mang_file_minh_chung && sk.mang_file_minh_chung.length > 0) {
//                     for (let k = 0; k < sk.mang_file_minh_chung.length; k++) {
//                         let fileMC = sk.mang_file_minh_chung[k];
//                         let base64String = await ham_ho_tro_doc_anh_base64(fileMC);
//                         let duoiFile = fileMC.name.includes('.') ? fileMC.name.substring(fileMC.name.lastIndexOf('.')) : '.jpg';
//                         let tenFileChuan = `Ngay[${ngayDay}_${layGioPhutGiay()}]_Lop[${maLopLuu}]_HS[${taoTenAnToan(sk.ten_hoc_sinh, 25)}]_The[${taoTenAnToan(sk.loai_the, 15)}]_Anh[${k + 1}]${duoiFile}`;

//                         btnLuu.innerHTML = `⏳ CHUẨN BỊ ẢNH MC (${k + 1}/${sk.mang_file_minh_chung.length})...`;

//                         let payload = { action: "upload_anh_nhat_ky", base64: base64String, mimeType: fileMC.type, fileName: tenFileChuan, maLop: maLopLuu, loaiAnh: "MINH_CHUNG_LOI" };

//                         let result = await window.ham_ho_tro_upload_anh_co_tien_trinh(
//                             CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP,
//                             payload,
//                             function (phanTram, daTai, tongSo) {
//                                 let strDaTai = window.ham_dinh_dang_dung_luong(daTai);
//                                 let strTongSo = window.ham_dinh_dang_dung_luong(tongSo);
//                                 btnLuu.style.background = `linear-gradient(90deg, #17a2b8 ${phanTram}%, #6c757d ${phanTram}%)`;
//                                 btnLuu.innerHTML = `🚀 ĐANG TẢI ẢNH MC (${k + 1}/${sk.mang_file_minh_chung.length})<br><span style="font-size: 11px; font-weight: normal;">${strDaTai} / ${strTongSo} (${phanTram}%)</span>`;
//                             }
//                         );

//                         if (result.status === 'success') {
//                             mangLinkAnhDrive.push(result.url);
//                         } else {
//                             throw new Error(result.message || "Lỗi tải ảnh minh chứng từ Apps Script.");
//                         }
//                     }
//                 }

//                 let thongTinMoRong = { mau_sac: sk.mau_sac };
//                 if (sk.diem_so) thongTinMoRong.diem_so = sk.diem_so;
//                 if (mangLinkAnhDrive.length > 0) thongTinMoRong.danh_sach_anh_minh_chung = mangLinkAnhDrive;

//                 mangSuKienDB.push({
//                     id_nhat_ky: idNhatKy,
//                     uid_hoc_sinh: sk.uid_hoc_sinh,
//                     // 🌟 FIX LỖI NOT NULL: Nếu sk.sdt_hoc_sinh bị rỗng thì điền 'Không rõ'
//                     ten_dang_nhap_hoc_sinh: sk.sdt_hoc_sinh || 'Không rõ',
//                     ten_hoc_sinh: sk.ten_hoc_sinh,
//                     loai_the: sk.loai_the,
//                     ghi_chu: sk.ghi_chu,
//                     thong_tin_mo_rong: thongTinMoRong
//                 });
//             }
//         }

//         // Khôi phục lại nền sau khi tải ảnh xong
//         btnLuu.style.background = bgGoc;

//         if (mangSuKienDB.length > 0) {
//             btnLuu.innerHTML = "⏳ ĐANG LƯU VÀO CƠ SỞ DỮ LIỆU...";
//             const { error: errInsertSK } = await _supabase.from('nhat_ky_su_kien_hs').insert(mangSuKienDB);
//             if (errInsertSK) throw errInsertSK;
//         }

//         alert("✅ Đã lưu xong ĐIỂM DANH, CHO ĐIỂM & SỰ KIỆN!");

//         danhSachSuKienTam = [];
//         if (typeof ham_20_4_ve_danh_sach_cho === 'function') ham_20_4_ve_danh_sach_cho();

//         if (document.getElementById('nk-khu-vuc-diem-danh')) document.getElementById('nk-khu-vuc-diem-danh').innerHTML = `
//             <div class="dong-hs-vang" style="display: flex; gap: 8px; align-items: center;">
//                 <input class="nk-input-hs-vang" list="nk-dl-hs" placeholder="Chọn hoặc gõ tên HS vắng..." style="flex: 1; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; outline: none; font-size: 13px;">
//                 <button onclick="this.parentElement.remove()" style="padding: 8px 12px; background: #f8d7da; color: #721c24; border: none; border-radius: 4px; cursor: pointer;">✖</button>
//             </div>`;

//     } catch (err) {
//         console.error("Lỗi:", err);
//         alert("❌ Lỗi: " + (err.message || err.details || "Không xác định"));
//     } finally {
//         btnLuu.style.background = bgGoc;
//         btnLuu.innerHTML = textGoc;
//         btnLuu.disabled = false;
//     }
// };



// =======================================================
// HÀM 20.6B: LƯU SỰ KIỆN, ĐIỂM DANH & CHO ĐIỂM HỌC SINH
// =======================================================
window.ham_20_6b_luu_su_kien_diem_danh = async function (btnLuu) {
    const ngayDay = document.querySelector('input[type="date"]').value;
    let rawLop = document.getElementById('nk-input-lop').value.trim();
    let maLopLuu = rawLop.match(/\(([^)]+)\)$/) ? rawLop.match(/\(([^)]+)\)$/)[1].trim() : rawLop;
    const buoi = document.getElementById('nk-input-buoi').value.trim();
    const tiet = document.getElementById('nk-input-tiet').value.trim();
    const phanMon = document.getElementById('nk-input-mon').value.trim();

    if (!ngayDay || !buoi || !tiet || !maLopLuu) {
        alert("⚠️ Vui lòng điền đủ 4 thông tin: Ngày, Buổi, Tiết, Lớp trước khi lưu sự kiện!");
        return;
    }

    const cacOVan = document.querySelectorAll('.nk-input-hs-vang');
    let coDuLieuDiemDanh = Array.from(cacOVan).some(o => o.value.trim() !== '');

    if ((!danhSachSuKienTam || danhSachSuKienTam.length === 0) && !coDuLieuDiemDanh) {
        alert("⚠️ Thầy chưa chọn học sinh vắng hoặc nhập sự kiện/cho điểm nào!");
        return;
    }

    const textGoc = btnLuu.innerHTML;
    const bgGoc = btnLuu.style.background;
    btnLuu.disabled = true;

    try {
        let idNhatKy = null;
        const { data: checkData, error: errCheck } = await _supabase.from('nhat_ky_day_hoc').select('id').eq('ngay_day', ngayDay).eq('ma_lop', maLopLuu).eq('tiet', tiet);
        if (errCheck) throw errCheck;

        if (checkData && checkData.length > 0) {
            idNhatKy = checkData[0].id;
        } else {
            const { data: nhatKyData, error: errInsertNK } = await _supabase.from('nhat_ky_day_hoc').insert([{
                ngay_day: ngayDay, buoi: buoi, tiet: tiet, ma_lop: maLopLuu, phan_mon: phanMon
            }]).select();
            if (errInsertNK) throw errInsertNK;
            idNhatKy = nhatKyData[0].id;
        }

        let mangSuKienDB = [];
        let uidsDaVangDB = new Set();
        const { data: vangData } = await _supabase.from('nhat_ky_su_kien_hs').select('uid_hoc_sinh').eq('id_nhat_ky', idNhatKy).eq('loai_the', 'Vắng mặt');
        if (vangData) vangData.forEach(row => uidsDaVangDB.add(row.uid_hoc_sinh));

        let uidsTrongGiaoDien = new Set();
        let tenCacHSDaTrung = [];
        const danhSachOptions = document.querySelectorAll('#nk-dl-hs option');

        cacOVan.forEach(oVang => {
            let thongTinHS = oVang.value.trim();
            if (thongTinHS) {
                let uidTimDuoc = null;
                danhSachOptions.forEach(opt => { if (opt.value === thongTinHS) uidTimDuoc = opt.dataset.uid; });
                let parts = thongTinHS.split(' - ');
                let tenHienThi = parts[0].trim();
                let tenDangNhap = parts[1] ? parts[1].trim() : 'Không rõ';

                if (uidTimDuoc) {
                    if (uidsTrongGiaoDien.has(uidTimDuoc) || uidsDaVangDB.has(uidTimDuoc)) {
                        if (!tenCacHSDaTrung.includes(tenHienThi)) tenCacHSDaTrung.push(tenHienThi);
                    } else {
                        uidsTrongGiaoDien.add(uidTimDuoc);
                        mangSuKienDB.push({
                            id_nhat_ky: idNhatKy, uid_hoc_sinh: uidTimDuoc, ten_dang_nhap_hoc_sinh: tenDangNhap,
                            ten_hoc_sinh: tenHienThi, loai_the: 'Vắng mặt', ghi_chu: 'Vắng mặt trong tiết học', thong_tin_mo_rong: { mau_sac: '#dc3545' }
                        });
                    }
                }
            }
        });

        if (danhSachSuKienTam && danhSachSuKienTam.length > 0) {
            for (let i = 0; i < danhSachSuKienTam.length; i++) {
                let sk = danhSachSuKienTam[i];
                let mangLinkAnhDrive = [];

                if (sk.mang_file_minh_chung && sk.mang_file_minh_chung.length > 0) {
                    for (let k = 0; k < sk.mang_file_minh_chung.length; k++) {
                        let fileMC = sk.mang_file_minh_chung[k];
                        let base64String = await ham_ho_tro_doc_anh_base64(fileMC);
                        let duoiFile = fileMC.name.includes('.') ? fileMC.name.substring(fileMC.name.lastIndexOf('.')) : '.jpg';
                        let tenFileChuan = `Ngay[${ngayDay}_${layGioPhutGiay()}]_Lop[${maLopLuu}]_HS[${taoTenAnToan(sk.ten_hoc_sinh, 25)}]_The[${taoTenAnToan(sk.loai_the, 15)}]_Anh[${k + 1}]${duoiFile}`;

                        let payload = { action: "upload_anh_nhat_ky", base64: base64String, mimeType: fileMC.type, fileName: tenFileChuan, maLop: maLopLuu, loaiAnh: "MINH_CHUNG_LOI" };

                        let result = await window.ham_ho_tro_upload_anh_co_tien_trinh(
                            CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP,
                            payload,
                            function (phanTram, daTai, tongSo) {
                                let strDaTai = window.ham_dinh_dang_dung_luong(daTai);
                                let strTongSo = window.ham_dinh_dang_dung_luong(tongSo);
                                btnLuu.style.background = `linear-gradient(90deg, #17a2b8 ${phanTram}%, #6c757d ${phanTram}%)`;
                                btnLuu.innerHTML = `🚀 ĐANG TẢI ẢNH MC (${k + 1}/${sk.mang_file_minh_chung.length})<br><span style="font-size: 11px; font-weight: normal;">${strDaTai} / ${strTongSo} (${phanTram}%)</span>`;
                            }
                        );

                        if (result.status === 'success') {
                            mangLinkAnhDrive.push(result.url);
                        } else {
                            throw new Error(result.message || "Lỗi tải ảnh minh chứng từ Apps Script.");
                        }
                    }
                }

                let thongTinMoRong = { mau_sac: sk.mau_sac };
                if (sk.diem_so) thongTinMoRong.diem_so = sk.diem_so;
                if (mangLinkAnhDrive.length > 0) thongTinMoRong.danh_sach_anh_minh_chung = mangLinkAnhDrive;

                mangSuKienDB.push({
                    id_nhat_ky: idNhatKy, uid_hoc_sinh: sk.uid_hoc_sinh, ten_dang_nhap_hoc_sinh: sk.sdt_hoc_sinh || 'Không rõ',
                    ten_hoc_sinh: sk.ten_hoc_sinh, loai_the: sk.loai_the, ghi_chu: sk.ghi_chu, thong_tin_mo_rong: thongTinMoRong
                });
            }
        }

        btnLuu.style.background = bgGoc;

        if (mangSuKienDB.length > 0) {
            btnLuu.innerHTML = "⏳ ĐANG LƯU VÀO CƠ SỞ DỮ LIỆU...";
            const { error: errInsertSK } = await _supabase.from('nhat_ky_su_kien_hs').insert(mangSuKienDB);
            if (errInsertSK) throw errInsertSK;
        }

        // 🌟 GHI NHỚ LẠI LỊCH SỬ
        localStorage.setItem('nk_last_ngayDay', ngayDay);
        localStorage.setItem('nk_last_buoi', buoi);
        localStorage.setItem('nk_last_tiet', tiet);
        localStorage.setItem('nk_last_lop', rawLop);

        alert("✅ Đã lưu xong ĐIỂM DANH, CHO ĐIỂM & SỰ KIỆN!");

        danhSachSuKienTam = [];
        if (typeof ham_20_4_ve_danh_sach_cho === 'function') ham_20_4_ve_danh_sach_cho();

        if (document.getElementById('nk-khu-vuc-diem-danh')) document.getElementById('nk-khu-vuc-diem-danh').innerHTML = `
            <div class="dong-hs-vang" style="display: flex; gap: 8px; align-items: center;">
                <input class="nk-input-hs-vang" list="nk-dl-hs" placeholder="Chọn hoặc gõ tên HS vắng..." style="flex: 1; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; outline: none; font-size: 13px;">
                <button onclick="this.parentElement.remove()" style="padding: 8px 12px; background: #f8d7da; color: #721c24; border: none; border-radius: 4px; cursor: pointer;">✖</button>
            </div>`;

        if (typeof ham_20_27_kiem_tra_tiet_da_luu === 'function') ham_20_27_kiem_tra_tiet_da_luu();

    } catch (err) {
        console.error("Lỗi:", err);
        alert("❌ Lỗi: " + (err.message || err.details || "Không xác định"));
    } finally {
        btnLuu.style.background = bgGoc;
        btnLuu.innerHTML = textGoc;
        btnLuu.disabled = false;
    }
};



// // =======================================================
// // HÀM 20.4: VẼ LẠI DANH SÁCH CHỜ 
// // =======================================================
// window.ham_20_4_ve_danh_sach_cho = function () {
//     const vungHienThi = document.getElementById('nk-danh-sach-cho-luu');
//     const demSoLuong = document.getElementById('nk-dem-su-kien');

//     demSoLuong.innerText = danhSachSuKienTam.length;

//     if (danhSachSuKienTam.length === 0) {
//         vungHienThi.innerHTML = '<i style="color: #adb5bd; font-size: 12px;">Chưa có sự kiện nào...</i>';
//         return;
//     }

//     let html = '';
//     danhSachSuKienTam.forEach(sk => {
//         let textGhiChu = sk.ghi_chu ? `<br><i style="font-size: 11px; color: #666;">📝 ${sk.ghi_chu}</i>` : '';
//         // 🌟 Cập nhật dòng báo số lượng ảnh
//         let textAnh = (sk.mang_file_minh_chung && sk.mang_file_minh_chung.length > 0)
//             ? `<br><span style="font-size: 11px; color: #fd7e14; font-weight: bold;">📸 Đã đính kèm ${sk.mang_file_minh_chung.length} ảnh</span>`
//             : '';

//         html += `
//             <div style="background: #fff; padding: 8px 10px; border-radius: 4px; border-left: 4px solid ${sk.mau_sac}; box-shadow: 0 1px 2px rgba(0,0,0,0.05); margin-bottom: 8px; display: flex; justify-content: space-between; align-items: flex-start;">
//                 <div>
//                     <b style="font-size: 13px;">${sk.ten_hoc_sinh}</b> 
//                     <span style="color: ${sk.mau_sac}; font-weight: bold; font-size: 12px;">[${sk.loai_the}]</span>
//                     ${textGhiChu}
//                     ${textAnh}
//                 </div>
//                 <button onclick="ham_20_5_xoa_su_kien_tam(${sk.id_tam})" style="background: none; border: none; color: #dc3545; cursor: pointer; font-size: 14px;" title="Xóa">🗑️</button>
//             </div>
//         `;
//     });
//     vungHienThi.innerHTML = html;
// };


// =======================================================
// HÀM HỖ TRỢ: ĐỌC FILE ẢNH SANG BASE64
// =======================================================
window.ham_ho_tro_doc_anh_base64 = function (file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
};


// // =======================================================
// // HÀM 20.7: TỰ ĐỘNG TẢI DANH SÁCH LỚP TỪ BẢNG lop_hoc
// // =======================================================
// window.ham_20_7_tai_danh_sach_lop = async function () {
//     const datalistLop = document.getElementById('dl-lop');
//     const inputLop = document.getElementById('nk-input-lop');
//     if (!datalistLop || !inputLop) return;

//     try {
//         // Truy vấn lấy cả ma_lop và ten_lop
//         const { data: lopData, error } = await _supabase
//             .from('lop_hoc')
//             .select('ma_lop, ten_lop')
//             .order('ten_lop', { ascending: true });

//         if (error) throw error;

//         datalistLop.innerHTML = '';

//         if (lopData && lopData.length > 0) {
//             lopData.forEach(lop => {
//                 let option = document.createElement('option');
//                 // Nếu trường ten_lop trống thì lấy tạm ma_lop hiển thị
//                 let ten = lop.ten_lop ? lop.ten_lop : lop.ma_lop;

//                 // Định dạng chuẩn: Tên lớp (mã lớp) - VD: 12 Toán (12TN6)
//                 option.value = `${ten} (${lop.ma_lop})`;
//                 datalistLop.appendChild(option);
//             });
//         } else {
//             inputLop.placeholder = "Chưa có lớp nào trong hệ thống!";
//         }
//     } catch (err) {
//         console.error("Lỗi tải danh sách lớp:", err);
//     }
// };


// =======================================================
// HÀM 20.7: TỰ ĐỘNG TẢI DANH SÁCH LỚP TỪ BẢNG lop_hoc
// =======================================================
window.ham_20_7_tai_danh_sach_lop = async function () {
    const datalistLop = document.getElementById('dl-lop');

    // 🌟 Quét tìm ô nhập liệu Lớp trên cả màn hình Ghi sổ (nk) và Tra cứu (tc)
    const inputLop = document.getElementById('nk-input-lop') || document.getElementById('tc-input-lop');

    if (!datalistLop) return;

    try {
        // Truy vấn lấy cả ma_lop và ten_lop
        const { data: lopData, error } = await _supabase
            .from('lop_hoc')
            .select('ma_lop, ten_lop')
            .order('ten_lop', { ascending: true });

        if (error) throw error;

        datalistLop.innerHTML = '';

        if (lopData && lopData.length > 0) {
            lopData.forEach(lop => {
                let option = document.createElement('option');
                // Nếu trường ten_lop trống thì lấy tạm ma_lop hiển thị
                let ten = lop.ten_lop ? lop.ten_lop : lop.ma_lop;

                // Định dạng chuẩn: Tên lớp (mã lớp) - VD: 12 Toán (12TN6)
                option.value = `${ten} (${lop.ma_lop})`;
                datalistLop.appendChild(option);
            });
        } else {
            if (inputLop) inputLop.placeholder = "Chưa có lớp nào trong hệ thống!";
        }
    } catch (err) {
        console.error("Lỗi tải danh sách lớp:", err);
    }
};



// =======================================================
// HÀM 20.8: TẢI DANH SÁCH THẺ TỪ DB VÀ VẼ RA GIAO DIỆN
// =======================================================
window.ham_20_8_tai_danh_sach_the = async function () {
    const khuVucTags = document.getElementById('nk-khu-vuc-tags');
    if (!khuVucTags) return;

    try {
        const { data: theData, error } = await _supabase
            .from('cai_dat_the_su_kien')
            .select('*')
            .order('ngay_tao', { ascending: true });

        if (error) throw error;

        const nhomCauHinh = [
            { id: 'bai_ve_nha', ten: '🏠 Bài về nhà', mau: '#fd7e14' },
            { id: 'hoc_bai', ten: '🧠 Học bài ở nhà', mau: '#dc3545' },
            { id: 'tai_lop', ten: '✍️ Làm bài tại lớp', mau: '#007bff' },
            { id: 'thai_do', ten: '🎭 Thái độ học tập', mau: '#6f42c1' }
        ];

        let html = '<div style="display: flex; flex-wrap: wrap; gap: 6px;">';

        nhomCauHinh.forEach(nhom => {
            html += `<div style="width: 100%; font-size: 11px; font-weight: bold; color: ${nhom.mau}; border-bottom: 1px dashed ${nhom.mau}; padding-bottom: 2px; margin-top: 5px; text-transform: uppercase;">${nhom.ten}</div>`;

            let theCuaNhom = theData ? theData.filter(t => t.nhom_the === nhom.id) : [];
            theCuaNhom.forEach(the => {
                let tenTheAnToan = the.ten_the.replace(/'/g, "\\'");

                html += `
                <div style="display: inline-flex; border: 1px solid ${the.mau_sac}; border-radius: 4px; overflow: hidden; background: #fff;">
                    <button onclick="ham_20_3_gan_the('${tenTheAnToan}', '${the.mau_sac}')" style="padding: 5px 8px; font-size: 11px; background: transparent; border: none; color: ${the.mau_sac}; cursor: pointer; font-weight: bold;" title="Bấm để gắn thẻ">${the.ten_the}</button>
                    <button onclick="ham_20_10_quan_ly_tag('${the.id}', '${tenTheAnToan}')" style="padding: 3px 6px; font-size: 10px; background: #f8f9fa; border: none; border-left: 1px dashed ${the.mau_sac}; color: #6c757d; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#e9ecef'" onmouseout="this.style.background='#f8f9fa'" title="Sửa hoặc Xóa thẻ này">✏️</button>
                </div>
                `;
            });

            html += `<button onclick="ham_20_9_them_tag_moi('${nhom.id}', '${nhom.mau}')" style="padding: 5px 10px; font-size: 11px; background: #f8f9fa; border: 1px dashed ${nhom.mau}; color: ${nhom.mau}; border-radius: 4px; cursor: pointer; font-weight: bold; transition: 0.2s;" onmouseover="this.style.background='#e2e6ea'" onmouseout="this.style.background='#f8f9fa'">➕ Thêm tag</button>`;
        });

        html += '</div>';

        khuVucTags.innerHTML = html;

    } catch (err) {
        console.error("Lỗi tải thẻ:", err);
        khuVucTags.innerHTML = '<span style="color:red">❌ Lỗi tải danh sách thẻ!</span>';
    }
};


// =======================================================
// HÀM 20.9: THÊM TAG MỚI VÀO DB
// =======================================================
window.ham_20_9_them_tag_moi = async function (nhomThe, mauSac) {
    let tenTag = prompt("Nhập tên tag lỗi mới (VD: Ăn vặt trong lớp):");
    if (!tenTag || !tenTag.trim()) return;

    tenTag = tenTag.trim();

    try {
        const { error } = await _supabase
            .from('cai_dat_the_su_kien')
            .insert([{ ten_the: tenTag, nhom_the: nhomThe, mau_sac: mauSac }]);

        if (error) {
            if (error.code === '23505') {
                alert(`Thẻ "${tenTag}" đã có trong nhóm này rồi thầy ạ!`);
            } else {
                throw error;
            }
        } else {
            // Thêm thành công -> Load lại danh sách nút bấm
            ham_20_8_tai_danh_sach_the();
        }
    } catch (err) {
        console.error("Lỗi thêm thẻ:", err);
        alert("❌ Lỗi hệ thống khi thêm thẻ mới!");
    }
};



// =======================================================
// HÀM 20.10: SỬA HOẶC XÓA THẺ
// =======================================================
window.ham_20_10_quan_ly_tag = async function (idThe, tenHienTai) {
    // Gọi popup hỏi ý kiến thầy (Giao diện mặc định của trình duyệt)
    let luaChon = prompt(`⚙️ QUẢN LÝ THẺ: [ ${tenHienTai} ]\n\n👉 Để SỬA TÊN: Hãy gõ tên mới vào ô bên dưới.\n👉 Để XÓA THẺ: Hãy xóa hết chữ trong ô và bấm OK.`, tenHienTai);

    // Nếu thầy bấm "Hủy" (Cancel)
    if (luaChon === null) return;

    luaChon = luaChon.trim();

    if (luaChon === "") {
        // TRƯỜNG HỢP: XÓA THẺ
        let xacNhan = confirm(`Thầy có chắc chắn muốn XÓA thẻ "${tenHienTai}" không?`);
        if (xacNhan) {
            try {
                const { error } = await _supabase
                    .from('cai_dat_the_su_kien')
                    .delete()
                    .eq('id', idThe);

                if (error) throw error;
                ham_20_8_tai_danh_sach_the(); // Vẽ lại giao diện
            } catch (err) {
                console.error("Lỗi xóa thẻ:", err);
                alert("❌ Có lỗi xảy ra khi xóa thẻ!");
            }
        }
    } else if (luaChon !== tenHienTai) {
        // TRƯỜNG HỢP: SỬA TÊN THẺ
        try {
            const { error } = await _supabase
                .from('cai_dat_the_su_kien')
                .update({ ten_the: luaChon })
                .eq('id', idThe);

            if (error) {
                if (error.code === '23505') {
                    alert(`❌ Tên thẻ "${luaChon}" đã bị trùng với một thẻ khác!`);
                } else {
                    throw error;
                }
            } else {
                ham_20_8_tai_danh_sach_the(); // Vẽ lại giao diện
            }
        } catch (err) {
            console.error("Lỗi sửa thẻ:", err);
            alert("❌ Có lỗi xảy ra khi cập nhật thẻ!");
        }
    }
};

// Khởi tạo mảng toàn cục chứa ảnh bài giảng
window.danhSachAnhBaiGiangTam = [];

// =======================================================
// HÀM 20.11: XỬ LÝ ẢNH BÀI GIẢNG (CÓ CẮT & NÉN)
// =======================================================
window.ham_20_11b_kich_hoat_preview_anh = function () {
    const inputAnhBG = document.getElementById('nk-input-anh-bai-giang');
    if (inputAnhBG) {
        inputAnhBG.addEventListener('change', async function (e) {
            const files = Array.from(e.target.files);
            if (files.length === 0) return;

            // Xử lý cắt & nén tuần tự
            let processedFiles = await window.ham_20_25_xu_ly_mang_anh_dau_vao(files);

            // Đưa ảnh đã cắt/nén vào mảng tạm
            window.danhSachAnhBaiGiangTam.push(...processedFiles);
            ham_20_11_render_anh_bai_giang();

            // Xóa rỗng input để lần sau chụp tiếp
            e.target.value = '';
        });
    }
};

window.ham_20_11_render_anh_bai_giang = function () {
    const vungHienThiBG = document.getElementById('vung-hien-thi-anh-bang');
    if (!vungHienThiBG) return;

    if (window.danhSachAnhBaiGiangTam.length === 0) {
        vungHienThiBG.innerHTML = '<span id="text-cho-anh">(Ảnh chụp bảng bài dạy sẽ xuất hiện tại đây...)</span>';
        return;
    }

    let html = '';
    window.danhSachAnhBaiGiangTam.forEach((file, index) => {
        let url = URL.createObjectURL(file);
        // Lấy dung lượng sau khi nén để hiển thị
        let sizeKB = (file.size / 1024).toFixed(1);
        html += `
            <div style="position: relative; display: inline-flex; flex-direction: column; align-items: center; animation: fadeIn 0.3s; gap: 3px;">
                <img src="${url}" style="height: 120px; width: 120px; object-fit: cover; border-radius: 4px; border: 2px solid #00acc1; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <span style="font-size: 9px; color: #666; font-weight: bold;">${sizeKB} KB</span>
                <button type="button" onclick="ham_20_11_xoa_anh_tam(${index})" style="position: absolute; top: -5px; right: -5px; background: #dc3545; color: white; border: none; border-radius: 50%; width: 18px; height: 18px; font-size: 10px; font-weight: bold; cursor: pointer; display: flex; justify-content: center; align-items: center; box-shadow: 0 1px 3px rgba(0,0,0,0.3);">×</button>
            </div>
        `;
    });
    vungHienThiBG.innerHTML = html;
};

window.ham_20_11_xoa_anh_tam = function (index) {
    window.danhSachAnhBaiGiangTam.splice(index, 1);
    ham_20_11_render_anh_bai_giang();
};







// =======================================================
// HÀM 20.12: THÊM DÒNG NHẬP HỌC SINH VẮNG (ĐIỂM DANH)
// =======================================================
window.ham_20_12_them_dong_vang = function () {
    const khuVuc = document.getElementById('nk-khu-vuc-diem-danh');
    if (!khuVuc) return;

    const dongMoi = document.createElement('div');
    dongMoi.className = 'dong-hs-vang';
    dongMoi.style.cssText = 'display: flex; gap: 8px; align-items: center; margin-top: 10px; animation: fadeIn 0.3s ease-in-out;';

    dongMoi.innerHTML = `
        <input class="nk-input-hs-vang" list="nk-dl-hs" placeholder="Chọn hoặc gõ tên HS vắng..." style="flex: 1; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; outline: none; font-size: 13px;">
        <button onclick="this.parentElement.remove()" style="padding: 8px 12px; background: #f8d7da; color: #721c24; border: none; border-radius: 4px; cursor: pointer;" title="Xóa dòng này">✖</button>
    `;
    khuVuc.appendChild(dongMoi);
};

// =======================================================
// HÀM 20.13: THÊM DÒNG HỌC SINH CÙNG SỰ KIỆN
// =======================================================
window.ham_20_13_them_dong_hs_su_kien = function () {
    const khuVuc = document.getElementById('nk-khu-vuc-hs-su-kien');
    if (!khuVuc) return;

    const dongMoi = document.createElement('div');
    dongMoi.className = 'dong-hs-su-kien';
    dongMoi.style.cssText = 'display: flex; gap: 8px; align-items: center; animation: fadeIn 0.3s ease-in-out;';

    dongMoi.innerHTML = `
        <input class="nk-input-hs-su-kien" list="nk-dl-hs" placeholder="Gõ tên để tìm nhanh..." style="flex: 1; padding: 10px; border: 2px solid #fd7e14; border-radius: 6px; box-sizing: border-box; font-weight: bold; outline: none;">
        <button onclick="this.parentElement.remove()" style="padding: 10px 12px; background: #f8d7da; color: #721c24; border: none; border-radius: 6px; cursor: pointer;" title="Xóa dòng này">✖</button>
    `;
    khuVuc.appendChild(dongMoi);
};


// =======================================================
// HÀM HỖ TRỢ CHUNG DÙNG CHO CẢ 2 NÚT LƯU
// =======================================================
const taoTenAnToan = (chuoi, maxLen = 30) => {
    if (!chuoi) return "KhongCo";
    let str = chuoi.toString().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
    str = str.replace(/[\s/\\:*?"<>|]+/g, '_');
    if (str.length > maxLen) str = str.substring(0, maxLen);
    return str.replace(/_$/, '');
};

const layGioPhutGiay = () => {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, '0')}h${String(now.getMinutes()).padStart(2, '0')}m${String(now.getSeconds()).padStart(2, '0')}s`;
};


// =======================================================
// HÀM 20.14: GIAO DIỆN TRA CỨU NHẬT KÝ (BỘ LỌC ĐA NĂNG)
// =======================================================
window.ham_20_14_giao_dien_tra_cuu = function () {
    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
    if (!vungLamViec) return;

    // 🌟 THUẬT TOÁN TÍNH "THỨ 2 TUẦN TRƯỚC" VÀ "HÔM NAY"
    const layNgayChuoi = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

    let today = new Date();
    const homNay = layNgayChuoi(today); // Đến ngày = Hôm nay

    // Tính lùi về Thứ 2 của tuần này, rồi lùi thêm 7 ngày
    let day = today.getDay();
    let diffToMonday = today.getDate() - day + (day === 0 ? -6 : 1);
    let lastMondayObj = new Date(today.setDate(diffToMonday - 7));
    const thu2TuanTruoc = layNgayChuoi(lastMondayObj); // Từ ngày = Thứ 2 tuần trước

    vungLamViec.innerHTML = `
        <div style="padding: 10px; animation: fadeIn 0.3s ease-in-out;">
            
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #ffc107; padding-bottom: 10px; margin-bottom: 20px;">
                <h3 style="color: #d39e00; margin: 0; text-transform: uppercase; display: flex; align-items: center; gap: 10px;">
                    🔍 Tra Cứu Nhật Ký (Bài Giảng & Học Sinh)
                </h3>
                <button onclick="ham_20_1_mo_giao_dien_nhat_ky_day_hoc()" style="padding: 6px 15px; background: #17a2b8; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    ✍️ Quay lại Ghi sổ
                </button>
            </div>

            <div style="background: #fff; padding: 15px; border-radius: 8px; border: 1px solid #ced4da; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 20px; display: flex; flex-direction: column; gap: 15px;">
                
                <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                    <div style="width: 150px;">
                        <label style="font-weight: bold; font-size: 13px; color: #495057;">Từ ngày (T2 tuần trước):</label>
                        <!-- 🌟 Gắn mặc định Thứ 2 tuần trước -->
                        <input type="date" id="tc-tu-ngay" value="${thu2TuanTruoc}" style="width: 100%; padding: 10px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; outline: none;">
                    </div>
                    <div style="width: 150px;">
                        <label style="font-weight: bold; font-size: 13px; color: #495057;">Đến ngày (Hôm nay):</label>
                        <!-- 🌟 Gắn mặc định Hôm nay -->
                        <input type="date" id="tc-den-ngay" value="${homNay}" style="width: 100%; padding: 10px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; outline: none;">
                    </div>
                    <div style="flex: 1; min-width: 200px;">
                        <label style="font-weight: bold; font-size: 13px; color: #495057;">Tìm theo Phân môn (Bài giảng):</label>
                        <input id="tc-input-mon" list="dl-mon-tc" placeholder="VD: Đại số (Bỏ trống để tìm tất cả)" style="width: 100%; padding: 10px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; outline: none;">
                        <datalist id="dl-mon-tc">
                            <option value="Đại số"></option><option value="Hình học"></option>
                            <option value="Thống kê xác suất"></option><option value="Hoạt động trải nghiệm"></option>
                        </datalist>
                    </div>
                </div>

                <div style="display: flex; gap: 15px; flex-wrap: wrap; align-items: flex-end;">
                    <div style="flex: 1; min-width: 150px;">
                        <label style="font-weight: bold; font-size: 13px; color: #495057;">Tìm theo Lớp:</label>
                        <input id="tc-input-lop" list="dl-lop" onchange="if(typeof ham_20_2_tai_danh_sach_hs_theo_lop === 'function') ham_20_2_tai_danh_sach_hs_theo_lop()" placeholder="VD: 12TN6..." style="width: 100%; padding: 10px; border: 2px solid #ffc107; border-radius: 4px; box-sizing: border-box; font-weight: bold; outline: none;">
                        <datalist id="dl-lop"></datalist>
                    </div>
                    
                    <div style="flex: 1.5; min-width: 200px;">
                        <label style="font-weight: bold; font-size: 13px; color: #495057;">Tìm Học sinh (Chọn Lớp trước):</label>
                        <input id="tc-input-hs" class="nk-input-hs-su-kien" list="nk-dl-hs" placeholder="Bỏ trống để xem cả lớp..." style="width: 100%; padding: 10px; border: 1px solid #17a2b8; border-radius: 4px; box-sizing: border-box; outline: none;">
                        <datalist id="nk-dl-hs"></datalist>
                    </div>

                    <button onclick="ham_20_15_thuc_hien_tra_cuu(this)" style="padding: 10px 25px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; font-size: 14px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: 0.2s;" onmouseover="this.style.background='#218838'" onmouseout="this.style.background='#28a745'">
                        🚀 LỌC DỮ LIỆU
                    </button>
                </div>
            </div>

            <div id="tc-khu-vuc-ket-qua" style="display: flex; flex-direction: column; gap: 20px;">
                <div style="text-align: center; color: #6c757d; font-style: italic; padding: 30px;">
                    Hãy thiết lập bộ lọc (Môn / Lớp / Học sinh) và bấm "LỌC DỮ LIỆU" để xem kết quả...
                </div>
            </div>
        </div>
    `;

    if (typeof ham_20_7_tai_danh_sach_lop === 'function') ham_20_7_tai_danh_sach_lop();
};



// =======================================================
// HÀM 20.15: TRA CỨU, SỬA BÀI GIẢNG & LẬP BẢNG THỐNG KÊ (CÓ SORT & TIÊU ĐỀ PHÂN KHU)
// =======================================================
window.ham_20_15_thuc_hien_tra_cuu = async function (btnLoc) {
    const vungKetQua = document.getElementById('tc-khu-vuc-ket-qua');

    let tuNgay = document.getElementById('tc-tu-ngay').value;
    let denNgay = document.getElementById('tc-den-ngay').value;

    let rawMon = document.getElementById('tc-input-mon').value.trim();
    let rawLop = document.getElementById('tc-input-lop').value.trim();
    let maLopLuu = rawLop.match(/\(([^)]+)\)$/) ? rawLop.match(/\(([^)]+)\)$/)[1].trim() : rawLop;

    let rawHS = document.getElementById('tc-input-hs').value.trim();
    let tenHsTimKiem = rawHS.split(' - ')[0].trim().toLowerCase();

    let isTimHocSinh = tenHsTimKiem !== '';

    if (!tuNgay || !denNgay) {
        alert("⚠️ Vui lòng chọn đủ mốc thời gian Từ ngày - Đến ngày!");
        return;
    }

    const textGoc = btnLoc.innerHTML;
    btnLoc.innerHTML = "⏳ ĐANG TÌM KIẾM...";
    btnLoc.disabled = true;
    vungKetQua.innerHTML = `<div style="text-align: center; color: #007bff; padding: 20px;"><b>⏳ Đang tải dữ liệu từ máy chủ...</b></div>`;

    try {
        const taoLinkAnhPreview = (url) => {
            if (!url) return '';
            let fileId = '';
            let matchD = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
            let matchId = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
            let matchOpen = url.match(/\/open\?id=([a-zA-Z0-9_-]+)/);
            if (matchD) fileId = matchD[1];
            else if (matchId) fileId = matchId[1];
            else if (matchOpen) fileId = matchOpen[1];
            return fileId ? `https://lh3.googleusercontent.com/d/${fileId}` : url;
        };

        let queryNhatKy = _supabase.from('nhat_ky_day_hoc').select('*').gte('ngay_day', tuNgay).lte('ngay_day', denNgay).order('ngay_day', { ascending: false }).order('tiet', { ascending: true });
        if (maLopLuu) queryNhatKy = queryNhatKy.eq('ma_lop', maLopLuu);
        if (rawMon) queryNhatKy = queryNhatKy.ilike('phan_mon', `%${rawMon}%`);

        let { data: dsNhatKy, error: err1 } = await queryNhatKy;
        if (err1) throw err1;

        if (!dsNhatKy || dsNhatKy.length === 0) {
            vungKetQua.innerHTML = `<div style="text-align: center; color: #dc3545; padding: 20px;"><b>Không tìm thấy tiết dạy nào khớp với bộ lọc!</b></div>`;
            return;
        }

        let mangIdNhatKy = dsNhatKy.map(nk => nk.id);
        let { data: dsSuKien, error: err2 } = await _supabase.from('nhat_ky_su_kien_hs').select('*').in('id_nhat_ky', mangIdNhatKy);
        if (err2) throw err2;

        let htmlRender = '';

        // =========================================================
        // 🌟 BẢNG THỐNG KÊ (GOM NHÓM THEO TIẾT & SẮP XẾP)
        // =========================================================
        if (isTimHocSinh) {
            dsSuKien = dsSuKien ? dsSuKien.filter(sk => sk.ten_hoc_sinh && sk.ten_hoc_sinh.toLowerCase().includes(tenHsTimKiem)) : [];
            if (dsSuKien.length === 0) {
                vungKetQua.innerHTML = `<div style="text-align: center; color: #28a745; padding: 20px; font-size: 16px;"><b>🎉 Tuyệt vời! Học sinh này không có vi phạm hay vắng mặt nào trong thời gian này!</b></div>`;
                return;
            }
            let idNhatKyCoHS = new Set(dsSuKien.map(sk => sk.id_nhat_ky));
            dsNhatKy = dsNhatKy.filter(nk => idNhatKyCoHS.has(nk.id));

            let tongVang = dsSuKien.filter(sk => sk.loai_the === 'Vắng mặt').length;
            let tongViPham = dsSuKien.length - tongVang;
            let tenThat = dsSuKien[0].ten_hoc_sinh;

            const tenCacThuHSHelper = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
            let tableRows = '';

            dsNhatKy.forEach(nk => {
                let dateObj = new Date(nk.ngay_day);
                let strNgay = String(dateObj.getDate()).padStart(2, '0') + '/' + String(dateObj.getMonth() + 1).padStart(2, '0') + '/' + dateObj.getFullYear();
                let thuHienTai = tenCacThuHSHelper[dateObj.getDay()];

                let hienThiTiet = String(nk.tiet || '').trim();
                if (!hienThiTiet.toLowerCase().startsWith('tiết')) hienThiTiet = 'Tiết ' + hienThiTiet;

                let sortTimeStr = `${nk.ngay_day}_${nk.buoi}_${hienThiTiet}`;
                let thoiGianStr = `<b>${hienThiTiet} - ${nk.buoi}</b><br><span style="color: #666; font-size: 11px;">${thuHienTai}, ${strNgay}</span>`;

                let cacSK = dsSuKien.filter(sk => sk.id_nhat_ky === nk.id);

                let htmlGomSuKien = '';
                let htmlGomAnh = '<div style="display: flex; gap: 4px; flex-wrap: wrap;">';
                let coAnh = false;

                cacSK.forEach(sk => {
                    let textGC = sk.ghi_chu ? `<span style="color: #666; font-size: 11px;"> - <i>${sk.ghi_chu}</i></span>` : '';
                    let mauThe = sk.thong_tin_mo_rong?.mau_sac || '#fd7e14';

                    let badgeDiem = '';
                    if (sk.loai_the === 'Cho điểm' && sk.thong_tin_mo_rong?.diem_so) {
                        badgeDiem = `<span style="background: #28a745; color: white; padding: 2px 5px; border-radius: 4px; font-weight: bold; font-size: 11px; margin-right: 5px;">⭐ ${sk.thong_tin_mo_rong.diem_so} đ</span>`;
                    }

                    htmlGomSuKien += `<div style="margin-bottom: 4px; padding-bottom: 4px; border-bottom: 1px dashed #eee;"><span style="color: ${mauThe}; font-weight: bold;">[${sk.loai_the}]</span> ${badgeDiem}${textGC}</div>`;

                    if (sk.thong_tin_mo_rong && sk.thong_tin_mo_rong.danh_sach_anh_minh_chung) {
                        let dsMC = sk.thong_tin_mo_rong.danh_sach_anh_minh_chung;
                        let mangMC = Array.isArray(dsMC) ? dsMC : dsMC.split(',').filter(l => l.trim());
                        if (mangMC.length > 0) {
                            mangMC.forEach((linkMC) => {
                                coAnh = true;
                                htmlGomAnh += `<a href="${linkMC}" target="_blank"><img src="${taoLinkAnhPreview(linkMC)}" loading="lazy" style="height: 35px; width: 35px; object-fit: cover; border-radius: 4px; border: 1px solid #ccc; background: #fff; cursor: zoom-in;" title="Xem ảnh"></a>`;
                            });
                        }
                    }
                });
                htmlGomAnh += `</div>`;
                if (!coAnh) htmlGomAnh = '';

                tableRows += `
                    <tr style="transition: 0.2s;" onmouseover="this.style.background='#f1f8ff'" onmouseout="this.style.background='transparent'">
                        <td data-sort="${sortTimeStr}" style="padding: 8px 10px; border-bottom: 1px solid #dee2e6; vertical-align: top;">${thoiGianStr}</td>
                        <td style="padding: 8px 10px; border-bottom: 1px solid #dee2e6; vertical-align: top; font-weight: bold; color: #17a2b8;">${nk.phan_mon || ''}</td>
                        <td style="padding: 8px 10px; border-bottom: 1px solid #dee2e6; vertical-align: top; font-size: 12px; color: #0056b3;">${nk.ten_bai || ''}</td>
                        <td style="padding: 8px 10px; border-bottom: 1px solid #dee2e6; vertical-align: top;">${htmlGomSuKien}</td>
                        <td style="padding: 8px 10px; border-bottom: 1px solid #dee2e6; vertical-align: top;">${htmlGomAnh}</td>
                    </tr>
                `;
            });

            htmlRender += `
                <div style="background: #e0f3ff; border: 1px solid #b8daff; border-left: 5px solid #007bff; border-radius: 8px; padding: 15px; margin-bottom: 25px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                    <h4 style="margin: 0 0 12px 0; color: #0056b3; font-size: 16px;">📊 BẢNG THEO DÕI HỌC SINH: <span style="text-transform: uppercase;">${tenThat}</span></h4>
                    
                    <div style="display: flex; gap: 15px; flex-wrap: wrap; margin-bottom: 15px;">
                        <span style="background: #fff; border: 1px solid #f5c6cb; color: #721c24; padding: 8px 15px; border-radius: 6px; font-weight: bold; font-size: 14px;">
                            ❌ Tổng vắng mặt: <span style="font-size: 16px; color: red;">${tongVang}</span> tiết
                        </span>
                        <span style="background: #fff; border: 1px solid #ffeeba; color: #d35400; padding: 8px 15px; border-radius: 6px; font-weight: bold; font-size: 14px;">
                            🎯 Tổng sự kiện khác / Điểm: <span style="font-size: 16px; color: #d35400;">${tongViPham}</span> lần
                        </span>
                    </div>

                    <div style="overflow-x: auto; background: #fff; border-radius: 6px; border: 1px solid #b8daff;">
                        <table id="bang-thong-ke-hs" style="width: 100%; border-collapse: collapse; font-size: 13px; min-width: 600px;">
                            <thead>
                                <tr style="background: #007bff; color: white; text-align: left;">
                                    <th onclick="ham_20_21_sap_xep_bang(0, 'bang-thong-ke-hs')" style="padding: 10px; border-bottom: 2px solid #0056b3; min-width: 120px; cursor: pointer;" title="Bấm để sắp xếp">Thời gian ↕️</th>
                                    <th onclick="ham_20_21_sap_xep_bang(1, 'bang-thong-ke-hs')" style="padding: 10px; border-bottom: 2px solid #0056b3; cursor: pointer;" title="Bấm để sắp xếp">Môn ↕️</th>
                                    <th onclick="ham_20_21_sap_xep_bang(2, 'bang-thong-ke-hs')" style="padding: 10px; border-bottom: 2px solid #0056b3; width: 30%; cursor: pointer;" title="Bấm để sắp xếp">Tên bài ↕️</th>
                                    <th style="padding: 10px; border-bottom: 2px solid #0056b3; min-width: 150px;">Sự kiện / Điểm số</th>
                                    <th style="padding: 10px; border-bottom: 2px solid #0056b3;">Ảnh MC</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${tableRows}
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
        }

        // =========================================================
        // 🌟 TIÊU ĐỀ PHÂN KHU: CHI TIẾT TỪNG TIẾT
        // =========================================================
        htmlRender += `
            <div style="margin-top: 35px; margin-bottom: 20px; border-bottom: 2px solid #17a2b8; padding-bottom: 8px; display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 20px;">📝</span>
                <h4 style="margin: 0; color: #17a2b8; text-transform: uppercase;">
                    ${isTimHocSinh ? 'CHI TIẾT NỘI DUNG TỪNG TIẾT HỌC CỦA HỌC SINH' : 'DANH SÁCH CHI TIẾT CÁC TIẾT DẠY'}
                </h4>
            </div>
        `;

        let mapLop = {};
        const cacOptionLop = document.querySelectorAll('#dl-lop option');
        cacOptionLop.forEach(opt => {
            let val = opt.value;
            let match = val.match(/^(.*?)\s*\(([^)]+)\)$/);
            if (match) mapLop[match[2].trim()] = val;
            else mapLop[val] = val;
        });

        const tenCacThu = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];

        // =========================================================
        // HIỂN THỊ DẠNG TIMELINE CHI TIẾT
        // =========================================================
        dsNhatKy.forEach(nk => {
            let dateObj = new Date(nk.ngay_day);
            let strNgay = `${String(dateObj.getDate()).padStart(2, '0')}/${String(dateObj.getMonth() + 1).padStart(2, '0')}/${dateObj.getFullYear()}`;
            let thuHienTai = tenCacThu[dateObj.getDay()];
            let tenLopHienThi = mapLop[nk.ma_lop] || `Lớp ${nk.ma_lop}`;

            let hienThiTiet = String(nk.tiet || '').trim();
            if (!hienThiTiet.toLowerCase().startsWith('tiết')) hienThiTiet = 'Tiết ' + hienThiTiet;

            let mangAnhBG = [];
            if (Array.isArray(nk.danh_sach_anh)) mangAnhBG = nk.danh_sach_anh;
            else if (typeof nk.danh_sach_anh === 'string' && nk.danh_sach_anh.length > 5) {
                try { mangAnhBG = JSON.parse(nk.danh_sach_anh); }
                catch (e) { mangAnhBG = nk.danh_sach_anh.split(',').filter(l => l.trim()); }
            }

            let htmlAnhBG = '';
            if (mangAnhBG.length > 0) {
                htmlAnhBG = `<div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 10px; padding: 10px; background: #e0f7fa; border-radius: 6px;">`;
                mangAnhBG.forEach((link, idx) => {
                    htmlAnhBG += `
                        <div style="position: relative; display: inline-block;">
                            <a href="${link}" target="_blank" title="Bấm để xem ảnh gốc">
                                <img src="${taoLinkAnhPreview(link)}" loading="lazy" style="height: 80px; width: 80px; object-fit: cover; border-radius: 4px; border: 2px solid #00acc1; box-shadow: 0 2px 4px rgba(0,0,0,0.1); background: #fff; display: block;">
                            </a>
                            <button onclick="ham_20_19_xoa_anh_bai_giang('${nk.id}', ${idx})" style="position: absolute; top: -6px; right: -6px; background: #dc3545; color: white; border: none; border-radius: 50%; width: 20px; height: 20px; font-size: 11px; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 1px 3px rgba(0,0,0,0.3);" title="Xóa ảnh này">×</button>
                        </div>`;
                });
                htmlAnhBG += `</div>`;
            }

            let htmlBaiGiang = `
                <div style="margin-bottom: 12px; border-bottom: 1px dashed #eee; padding-bottom: 8px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 16px; font-weight: bold; color: #0056b3;" id="label-tenbai-${nk.id}">📖 Bài học: ${nk.ten_bai || '(Chưa có tên bài)'}</span>
                        <button onclick="document.getElementById('label-tenbai-${nk.id}').style.display='none'; document.getElementById('input-tenbai-${nk.id}').style.display='block'; document.getElementById('btn-luu-card-${nk.id}').style.display='block'; this.style.display='none';" id="btn-sua-tenbai-${nk.id}" style="background: #ffc107; border: none; padding: 2px 8px; border-radius: 4px; font-size: 11px; cursor: pointer; font-weight: bold;">✏️ Sửa</button>
                    </div>
                    <input id="input-tenbai-${nk.id}" type="text" value="${nk.ten_bai || ''}" style="display:none; width:100%; margin-top:5px; padding:8px; border:2px solid #007bff; border-radius:4px; font-weight:bold; font-size: 15px;">
                </div>

                <div style="margin-bottom: 12px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <b style="color: #333;">📘 Nội dung chủ đề / Lý thuyết:</b>
                        <button onclick="document.getElementById('label-lythuyet-${nk.id}').style.display='none'; document.getElementById('input-lythuyet-${nk.id}').style.display='block'; document.getElementById('btn-luu-card-${nk.id}').style.display='block'; this.style.display='none';" id="btn-sua-lythuyet-${nk.id}" style="background: #ffc107; border: none; padding: 2px 8px; border-radius: 4px; font-size: 11px; cursor: pointer; font-weight: bold;">✏️ Sửa</button>
                    </div>
                    <div style="font-size: 14px; color: #212529; line-height: 1.5; white-space: pre-wrap; margin-top: 5px; padding-left: 5px;" id="label-lythuyet-${nk.id}">${nk.ly_thuyet || '<i>(Không ghi chú)</i>'}</div>
                    <textarea id="input-lythuyet-${nk.id}" style="display:none; width:100%; margin-top:5px; padding:8px; border:2px solid #007bff; border-radius:4px; min-height:60px; font-family: inherit;">${nk.ly_thuyet || ''}</textarea>
                </div>

                <div style="margin-bottom: 12px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <b style="color: #333;">✏️ Bài tập đã giải & Bài tập về nhà:</b>
                        <button onclick="document.getElementById('label-baitap-${nk.id}').style.display='none'; document.getElementById('input-baitap-${nk.id}').style.display='block'; document.getElementById('btn-luu-card-${nk.id}').style.display='block'; this.style.display='none';" id="btn-sua-baitap-${nk.id}" style="background: #ffc107; border: none; padding: 2px 8px; border-radius: 4px; font-size: 11px; cursor: pointer; font-weight: bold;">✏️ Sửa</button>
                    </div>
                    <div style="font-size: 14px; color: #212529; line-height: 1.5; white-space: pre-wrap; margin-top: 5px; padding-left: 5px;" id="label-baitap-${nk.id}">${nk.bai_tap || '<i>(Không ghi chú)</i>'}</div>
                    <textarea id="input-baitap-${nk.id}" style="display:none; width:100%; margin-top:5px; padding:8px; border:2px solid #007bff; border-radius:4px; min-height:60px; font-family: inherit;">${nk.bai_tap || ''}</textarea>
                </div>

                <div style="margin-bottom: 10px; background: #fff3cd; padding: 10px; border-radius: 4px; border-left: 4px solid #ffeeba;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <b style="color: #856404;">📌 Dặn dò:</b>
                        <button onclick="document.getElementById('label-dando-${nk.id}').style.display='none'; document.getElementById('input-dando-${nk.id}').style.display='block'; document.getElementById('btn-luu-card-${nk.id}').style.display='block'; this.style.display='none';" id="btn-sua-dando-${nk.id}" style="background: #ffc107; border: none; padding: 2px 8px; border-radius: 4px; font-size: 11px; cursor: pointer; font-weight: bold;">✏️ Sửa</button>
                    </div>
                    <div style="font-size: 14px; color: #856404; line-height: 1.5; white-space: pre-wrap; margin-top: 5px; padding-left: 5px;" id="label-dando-${nk.id}">${nk.dan_do || '<i>(Không có)</i>'}</div>
                    <textarea id="input-dando-${nk.id}" style="display:none; width:100%; margin-top:5px; padding:8px; border:2px solid #007bff; border-radius:4px; min-height:40px; font-family: inherit;">${nk.dan_do || ''}</textarea>
                </div>

                ${htmlAnhBG}

                <div id="btn-luu-card-${nk.id}" style="display: none; margin-top: 15px; text-align: right; border-top: 1px dashed #007bff; padding-top: 12px;">
                    <button onclick="
                        document.getElementById('input-tenbai-${nk.id}').style.display='none'; document.getElementById('label-tenbai-${nk.id}').style.display='block'; document.getElementById('btn-sua-tenbai-${nk.id}').style.display='block';
                        document.getElementById('input-lythuyet-${nk.id}').style.display='none'; document.getElementById('label-lythuyet-${nk.id}').style.display='block'; document.getElementById('btn-sua-lythuyet-${nk.id}').style.display='block';
                        document.getElementById('input-baitap-${nk.id}').style.display='none'; document.getElementById('label-baitap-${nk.id}').style.display='block'; document.getElementById('btn-sua-baitap-${nk.id}').style.display='block';
                        document.getElementById('input-dando-${nk.id}').style.display='none'; document.getElementById('label-dando-${nk.id}').style.display='block'; document.getElementById('btn-sua-dando-${nk.id}').style.display='block';
                        document.getElementById('btn-luu-card-${nk.id}').style.display='none';
                    " style="background: #6c757d; color: white; border: none; padding: 8px 15px; border-radius: 4px; font-weight: bold; cursor: pointer; margin-right: 8px;">❌ Hủy sửa</button>
                    
                    <button class="btn-luu-bai-giang-moi" data-id="${nk.id}" style="background: #28a745; color: white; border: none; padding: 8px 25px; border-radius: 4px; font-weight: bold; cursor: pointer; box-shadow: 0 3px 6px rgba(0,0,0,0.15);">💾 Lưu thay đổi</button>
                </div>
            `;

            let cacSuKienCuaTiet = dsSuKien ? dsSuKien.filter(sk => sk.id_nhat_ky === nk.id) : [];
            let vangMat = cacSuKienCuaTiet.filter(sk => sk.loai_the === 'Vắng mặt');
            let suKienKhac = cacSuKienCuaTiet.filter(sk => sk.loai_the !== 'Vắng mặt');
            let tongSoSuKienTiet = vangMat.length + suKienKhac.length;

            let htmlSuKien = '';
            if (tongSoSuKienTiet > 0) {
                if (vangMat.length > 0) {
                    htmlSuKien += `<div style="margin-top: 10px;">
                                    <strong style="color: #dc3545; font-size: 13px;">❌ Vắng mặt (${vangMat.length}):</strong>
                                    <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 5px;">`;
                    vangMat.forEach(v => {
                        htmlSuKien += `
                            <span style="display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; background: #f8d7da; color: #721c24; border-radius: 20px; font-size: 12px; font-weight: bold; border: 1px solid #f5c6cb;">
                                ${v.ten_hoc_sinh} 
                                <span onclick="ham_20_17_xoa_su_kien_chi_tiet('${v.id}')" style="cursor: pointer; font-size: 11px; color: #dc3545;" title="Xóa học sinh này">✖</span>
                            </span>`;
                    });
                    htmlSuKien += `</div></div>`;
                }

                if (suKienKhac.length > 0) {
                    htmlSuKien += `<div style="margin-top: 15px;">
                                    <strong style="color: #d35400; font-size: 13px;">🎯 Sự kiện ghi nhận (${suKienKhac.length}):</strong>
                                    <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 8px;">`;
                    suKienKhac.forEach(sk => {
                        let textGC = sk.ghi_chu ? ` - <i>${sk.ghi_chu}</i>` : '';
                        let mauThe = sk.thong_tin_mo_rong?.mau_sac || '#fd7e14';

                        let badgeDiem = '';
                        if (sk.loai_the === 'Cho điểm' && sk.thong_tin_mo_rong?.diem_so) {
                            badgeDiem = `<span style="background: #28a745; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold; font-size: 11px; margin-right: 5px;">⭐ ${sk.thong_tin_mo_rong.diem_so} điểm</span>`;
                        }

                        let htmlAnhMC = '';
                        if (sk.thong_tin_mo_rong && sk.thong_tin_mo_rong.danh_sach_anh_minh_chung) {
                            let dsMC = sk.thong_tin_mo_rong.danh_sach_anh_minh_chung;
                            let mangMC = Array.isArray(dsMC) ? dsMC : dsMC.split(',').filter(l => l.trim());
                            if (mangMC.length > 0) {
                                htmlAnhMC = `<div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 5px; padding-left: 10px; border-left: 2px solid ${mauThe};">`;
                                mangMC.forEach((linkMC, idxMC) => {
                                    htmlAnhMC += `
                                        <div style="position: relative; display: inline-block;">
                                            <a href="${linkMC}" target="_blank">
                                                <img src="${taoLinkAnhPreview(linkMC)}" loading="lazy" style="height: 40px; width: 40px; object-fit: cover; border-radius: 4px; border: 1px solid #ccc; background: #fff; display: block;">
                                            </a>
                                            <button onclick="ham_20_20_xoa_anh_minh_chung('${sk.id}', ${idxMC})" style="position: absolute; top: -5px; right: -5px; background: #dc3545; color: white; border: none; border-radius: 50%; width: 16px; height: 16px; font-size: 9px; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center;" title="Xóa ảnh minh chứng này">×</button>
                                        </div>`;
                                });
                                htmlAnhMC += `</div>`;
                            }
                        }

                        htmlSuKien += `
                            <div style="display: flex; justify-content: space-between; align-items: center; background: #fff; border: 1px solid #eee; padding: 8px 12px; border-radius: 6px; box-shadow: 0 1px 2px rgba(0,0,0,0.02); border-left: 4px solid ${mauThe};">
                                <div>
                                    <b style="font-size: 13px;">${sk.ten_hoc_sinh}</b>: 
                                    ${badgeDiem}
                                    <span style="color: ${mauThe}; font-weight: bold; font-size: 12px;">[${sk.loai_the}]</span>
                                    <span style="font-size: 12px; color: #555;">${textGC}</span>
                                    ${htmlAnhMC}
                                </div>
                                <button onclick="ham_20_17_xoa_su_kien_chi_tiet('${sk.id}')" style="background: #f8d7da; color: #721c24; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: bold;" title="Xóa sự kiện này">🗑️ Xóa</button>
                            </div>`;
                    });
                    htmlSuKien += `</div></div>`;
                }
            }

            let styleBaiGiang = isTimHocSinh ? 'display: none;' : 'display: block;';
            let labelBaiGiang = isTimHocSinh ? '👁️ Xem chi tiết bài giảng' : '🔽 Thu gọn bài giảng';
            let styleSuKien = isTimHocSinh ? 'display: block;' : 'display: none;';
            let labelSuKien = isTimHocSinh ? `🔽 Thu gọn sự kiện (${tongSoSuKienTiet})` : `👁️ Xem sự kiện & điểm danh (${tongSoSuKienTiet})`;

            htmlRender += `
                <div style="background: #fff; border: 1px solid #ced4da; border-radius: 8px; box-shadow: 0 3px 6px rgba(0,0,0,0.05); padding: 20px; margin-bottom: 20px; animation: slideUp 0.4s ease-out;">
                    
                    <div style="margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 12px;">
                        <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
                            <span style="background: #007bff; color: white; padding: 5px 12px; border-radius: 4px; font-weight: bold; font-size: 13px;">🏫 ${tenLopHienThi}</span>
                            <span style="background: #17a2b8; color: white; padding: 5px 12px; border-radius: 4px; font-weight: bold; font-size: 13px;">🏷️ ${nk.phan_mon || 'Không rõ môn'}</span>
                            <span style="color: #6c757d; font-size: 13px; font-weight: bold;">🕒 ${hienThiTiet} - ${nk.buoi} - ${thuHienTai}, Ngày ${strNgay}</span>
                            
                            <button onclick="ham_20_18_xoa_nguyen_tiet('${nk.id}')" style="margin-left: auto; background: #dc3545; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-weight: bold; font-size: 12px;" title="Xóa toàn bộ tiết học">🗑️ Xóa tiết</button>
                        </div>
                    </div>

                    <div style="margin-bottom: 15px;">
                        <div style="margin-bottom: 8px;">
                            <div onclick="let c = document.getElementById('bg-${nk.id}'); if(c.style.display === 'none') { c.style.display = 'block'; this.innerHTML = '🔽 Thu gọn bài giảng'; } else { c.style.display = 'none'; this.innerHTML = '👁️ Xem chi tiết bài giảng'; }" style="color: #007bff; font-size: 13px; font-weight: bold; cursor: pointer; display: inline-block; user-select: none;">
                                ${labelBaiGiang}
                            </div>
                        </div>

                        <div id="bg-${nk.id}" style="${styleBaiGiang} padding-left: 10px; border-left: 3px solid #e9ecef;">
                            ${htmlBaiGiang}
                        </div>
                    </div>
                    
                    ${tongSoSuKienTiet > 0 ? `
                        <div style="border-top: 1px dashed #ccc; padding-top: 10px;">
                            <div onclick="let c = document.getElementById('sk-${nk.id}'); if(c.style.display === 'none') { c.style.display = 'block'; this.innerHTML = '🔽 Thu gọn sự kiện (${tongSoSuKienTiet})'; } else { c.style.display = 'none'; this.innerHTML = '👁️ Xem sự kiện & điểm danh (${tongSoSuKienTiet})'; }" style="color: #d35400; font-size: 13px; font-weight: bold; cursor: pointer; display: inline-block; user-select: none; margin-bottom: 8px;">
                                ${labelSuKien}
                            </div>
                            <div id="sk-${nk.id}" style="${styleSuKien} padding-left: 10px; border-left: 3px solid #ffeeba; background: #fafafa; padding: 10px; border-radius: 4px;">
                                ${htmlSuKien}
                            </div>
                        </div>
                    ` : `
                        <div style="border-top: 1px dashed #ccc; padding-top: 10px; font-size: 12px; color: #28a745; font-style: italic;">
                            ✅ Lớp học ngoan, không có học sinh vắng hoặc vi phạm trong tiết này.
                        </div>
                    `}
                </div>
            `;
        });

        vungKetQua.innerHTML = htmlRender;

        document.querySelectorAll('.btn-luu-bai-giang-moi').forEach(btn => {
            btn.addEventListener('click', async function () {
                let id = this.dataset.id;
                let tenBaiMoi = document.getElementById(`input-tenbai-${id}`).value.trim();
                let lyThuyetMoi = document.getElementById(`input-lythuyet-${id}`).value.trim();
                let baiTapMoi = document.getElementById(`input-baitap-${id}`).value.trim();
                let danDoMoi = document.getElementById(`input-dando-${id}`).value.trim();

                this.innerText = "⏳ Đang lưu...";
                this.disabled = true;

                try {
                    const { error } = await _supabase
                        .from('nhat_ky_day_hoc')
                        .update({ ten_bai: tenBaiMoi, ly_thuyet: lyThuyetMoi, bai_tap: baiTapMoi, dan_do: danDoMoi })
                        .eq('id', id);

                    if (error) throw error;

                    document.getElementById(`label-tenbai-${id}`).innerText = `📖 Bài học: ${tenBaiMoi || '(Chưa có tên bài)'}`;
                    document.getElementById(`label-lythuyet-${id}`).innerHTML = lyThuyetMoi || '<i>(Không ghi chú)</i>';
                    document.getElementById(`label-baitap-${id}`).innerHTML = baiTapMoi || '<i>(Không ghi chú)</i>';
                    document.getElementById(`label-dando-${id}`).innerHTML = danDoMoi || '<i>(Không có)</i>';

                    document.getElementById(`input-tenbai-${id}`).style.display = 'none'; document.getElementById(`label-tenbai-${id}`).style.display = 'block'; document.getElementById(`btn-sua-tenbai-${id}`).style.display = 'block';
                    document.getElementById(`input-lythuyet-${id}`).style.display = 'none'; document.getElementById(`label-lythuyet-${id}`).style.display = 'block'; document.getElementById(`btn-sua-lythuyet-${id}`).style.display = 'block';
                    document.getElementById(`input-baitap-${id}`).style.display = 'none'; document.getElementById(`label-baitap-${id}`).style.display = 'block'; document.getElementById(`btn-sua-baitap-${id}`).style.display = 'block';
                    document.getElementById(`input-dando-${id}`).style.display = 'none'; document.getElementById(`label-dando-${id}`).style.display = 'block'; document.getElementById(`btn-sua-dando-${id}`).style.display = 'block';

                    document.getElementById(`btn-luu-card-${id}`).style.display = 'none';

                    alert("✅ Đã cập nhật bài giảng thành công!");
                } catch (err) {
                    console.error("Lỗi cập nhật:", err);
                    alert("❌ Không thể lưu thay đổi!");
                } finally {
                    this.innerText = "💾 Lưu thay đổi";
                    this.disabled = false;
                }
            });
        });

    } catch (err) {
        console.error("Lỗi tra cứu:", err);
        vungKetQua.innerHTML = `<div style="text-align: center; color: red; padding: 20px;"><b>❌ Lỗi khi tải dữ liệu! Vui lòng thử lại.</b></div>`;
    } finally {
        btnLoc.innerHTML = textGoc;
        btnLoc.disabled = false;
    }
};



// =======================================================
// HÀM 20.17: XÓA MỘT SỰ KIỆN / ĐIỂM DANH CÁ NHÂN
// =======================================================
window.ham_20_17_xoa_su_kien_chi_tiet = async function (idSuKien) {
    if (!confirm("⚠️ Thầy có chắc muốn xóa ghi nhận sự kiện/vắng mặt của học sinh này không?")) return;

    try {
        const { error } = await _supabase.from('nhat_ky_su_kien_hs').delete().eq('id', idSuKien);
        if (error) throw error;

        alert("🗑️ Đã xóa thành công!");
        // Tự động bấm lại nút Lọc để làm mới giao diện
        const btnLoc = document.querySelector('button[onclick*="ham_20_15_thuc_hien_tra_cuu"]');
        if (btnLoc) btnLoc.click();
    } catch (err) {
        console.error("Lỗi xóa sự kiện:", err);
        alert("❌ Không thể xóa dữ liệu!");
    }
};

// =======================================================
// HÀM 20.18: XÓA TOÀN BỘ TIẾT HỌC (BAO GỒM CẢ SỰ KIỆN LIÊN QUAN)
// =======================================================
window.ham_20_18_xoa_nguyen_tiet = async function (idNhatKy) {
    if (!confirm("⚠️ CẢNH BÁO: Thầy có chắc muốn xóa TOÀN BỘ tiết học này (gồm cả nội dung bài giảng, danh sách vắng và mọi sự kiện vi phạm của tiết)? Thao tác này không thể hoàn tác!")) return;

    try {
        // Supabase có ràng buộc khóa ngoại nên ta xóa bảng sự kiện trước, bảng nhật ký sau
        await _supabase.from('nhat_ky_su_kien_hs').delete().eq('id_nhat_ky', idNhatKy);
        const { error } = await _supabase.from('nhat_ky_day_hoc').delete().eq('id', idNhatKy);

        if (error) throw error;

        alert("🗑️ Đã xóa tiết học thành công!");
        const btnLoc = document.querySelector('button[onclick*="ham_20_15_thuc_hien_tra_cuu"]');
        if (btnLoc) btnLoc.click();
    } catch (err) {
        console.error("Lỗi xóa tiết học:", err);
        alert("❌ Không thể xóa tiết học này!");
    }
};


// =======================================================
// HÀM 20.19: XÓA ẢNH BÀI GIẢNG TRÊN THẺ TRA CỨU
// =======================================================
window.ham_20_19_xoa_anh_bai_giang = async function (idNhatKy, indexAnh) {
    if (!confirm("⚠️ Thầy có chắc muốn xóa bức ảnh bài giảng này không?")) return;

    try {
        // 1. Kéo mảng ảnh hiện tại của tiết này về
        const { data, error: errGet } = await _supabase.from('nhat_ky_day_hoc').select('danh_sach_anh').eq('id', idNhatKy).single();
        if (errGet) throw errGet;

        let mangAnh = [];
        let rawAnh = data.danh_sach_anh;
        if (Array.isArray(rawAnh)) mangAnh = rawAnh;
        else if (typeof rawAnh === 'string' && rawAnh.length > 5) {
            try { mangAnh = JSON.parse(rawAnh); } catch (e) { mangAnh = rawAnh.split(',').filter(l => l.trim()); }
        }

        // 2. Cắt bỏ bức ảnh tại vị trí indexAnh
        mangAnh.splice(indexAnh, 1);

        // 3. Cập nhật lại Database
        const { error: errUp } = await _supabase.from('nhat_ky_day_hoc').update({ danh_sach_anh: mangAnh }).eq('id', idNhatKy);
        if (errUp) throw errUp;

        alert("🗑️ Đã xóa ảnh bài giảng thành công!");
        // Refresh lại giao diện tìm kiếm
        const btnLoc = document.querySelector('button[onclick*="ham_20_15_thuc_hien_tra_cuu"]');
        if (btnLoc) btnLoc.click();

    } catch (err) {
        console.error("Lỗi xóa ảnh bài giảng:", err);
        alert("❌ Không thể xóa ảnh này!");
    }
};

// =======================================================
// HÀM 20.20: XÓA ẢNH MINH CHỨNG SỰ KIỆN HỌC SINH
// =======================================================
window.ham_20_20_xoa_anh_minh_chung = async function (idSuKien, indexAnhMC) {
    if (!confirm("⚠️ Thầy có chắc muốn xóa ảnh minh chứng này của học sinh không?")) return;

    try {
        // 1. Kéo trường thông tin mở rộng của sự kiện này về
        const { data, error: errGet } = await _supabase.from('nhat_ky_su_kien_hs').select('thong_tin_mo_rong').eq('id', idSuKien).single();
        if (errGet) throw errGet;

        let ttMoRong = data.thong_tin_mo_rong || {};
        let dsAnhMC = ttMoRong.danh_sach_anh_minh_chung || [];
        let mangMC = Array.isArray(dsAnhMC) ? dsAnhMC : dsAnhMC.split(',').filter(l => l.trim());

        // 2. Cắt bỏ ảnh tại vị trí indexAnhMC
        mangMC.splice(indexAnhMC, 1);
        ttMoRong.danh_sach_anh_minh_chung = mangMC;

        // 3. Cập nhật lại Database
        const { error: errUp } = await _supabase.from('nhat_ky_su_kien_hs').update({ thong_tin_mo_rong: ttMoRong }).eq('id', idSuKien);
        if (errUp) throw errUp;

        alert("🗑️ Đã xóa ảnh minh chứng thành công!");
        // Refresh lại giao diện tìm kiếm
        const btnLoc = document.querySelector('button[onclick*="ham_20_15_thuc_hien_tra_cuu"]');
        if (btnLoc) btnLoc.click();

    } catch (err) {
        console.error("Lỗi xóa ảnh minh chứng:", err);
        alert("❌ Không thể xóa ảnh minh chứng!");
    }
};




// =======================================================
// HÀM 20.21: SẮP XẾP BẢNG THỐNG KÊ KHI CLICK VÀO TIÊU ĐỀ
// =======================================================
window.ham_20_21_sap_xep_bang = function (n, tableId) {
    let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById(tableId);
    if (!table) return;

    switching = true;
    dir = "desc"; // Mặc định sắp xếp giảm dần trước

    while (switching) {
        switching = false;
        rows = table.rows;

        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];

            // Lấy giá trị sắp xếp (ưu tiên data-sort nếu có, ngược lại lấy text)
            let valX = x.getAttribute("data-sort") || x.innerText.toLowerCase();
            let valY = y.getAttribute("data-sort") || y.innerText.toLowerCase();

            if (dir === "asc") {
                if (valX > valY) { shouldSwitch = true; break; }
            } else if (dir === "desc") {
                if (valX < valY) { shouldSwitch = true; break; }
            }
        }

        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            // Nếu chưa đổi chỗ lần nào mà chiều đang là desc thì đảo lại thành asc
            if (switchcount === 0 && dir === "desc") {
                dir = "asc";
                switching = true;
            }
        }
    }
};

// Khởi tạo mảng toàn cục chứa ảnh minh chứng đang chuẩn bị gắn
window.danhSachAnhMinhChungTam = [];

// =======================================================
// HÀM 20.22: XỬ LÝ ẢNH MINH CHỨNG (CÓ CẮT & NÉN)
// =======================================================
window.ham_20_22_kich_hoat_preview_anh_minh_chung = function () {
    const inputAnhMC = document.getElementById('nk-input-anh-minh-chung');
    if (inputAnhMC) {
        inputAnhMC.addEventListener('change', async function (e) {
            const files = Array.from(e.target.files);
            if (files.length === 0) return;

            // Xử lý cắt & nén tuần tự
            let processedFiles = await window.ham_20_25_xu_ly_mang_anh_dau_vao(files);

            // Đưa ảnh đã cắt/nén vào mảng tạm
            window.danhSachAnhMinhChungTam.push(...processedFiles);
            ham_20_22_render_anh_minh_chung();

            // Xóa rỗng input
            e.target.value = '';
        });
    }
};

window.ham_20_22_render_anh_minh_chung = function () {
    const vungHienThiMC = document.getElementById('vung-preview-anh-minh-chung');
    if (!vungHienThiMC) return;

    if (window.danhSachAnhMinhChungTam.length === 0) {
        vungHienThiMC.innerHTML = '<span id="text-cho-anh-mc">(Ảnh minh chứng xuất hiện tại đây...)</span>';
        return;
    }

    let html = '';
    window.danhSachAnhMinhChungTam.forEach((file, index) => {
        let url = URL.createObjectURL(file);
        let sizeKB = (file.size / 1024).toFixed(1);
        html += `
            <div style="position: relative; display: inline-flex; flex-direction: column; align-items: center; animation: fadeIn 0.3s; gap: 3px;">
                <img src="${url}" style="height: 120px; width: 120px; object-fit: cover; border-radius: 4px; border: 1px solid #ccc; box-shadow: 0 1px 2px rgba(0,0,0,0.1);">
                <span style="font-size: 9px; color: #666; font-weight: bold;">${sizeKB} KB</span>
                <button type="button" onclick="ham_20_22_xoa_anh_tam(${index})" style="position: absolute; top: -5px; right: -5px; background: #dc3545; color: white; border: none; border-radius: 50%; width: 16px; height: 16px; font-size: 9px; font-weight: bold; cursor: pointer; display: flex; justify-content: center; align-items: center; box-shadow: 0 1px 3px rgba(0,0,0,0.3);">×</button>
            </div>
        `;
    });
    vungHienThiMC.innerHTML = html;
};

window.ham_20_22_xoa_anh_tam = function (index) {
    window.danhSachAnhMinhChungTam.splice(index, 1);
    ham_20_22_render_anh_minh_chung();
};

// =======================================================
// HÀM HỖ TRỢ: ĐỊNH DẠNG DUNG LƯỢNG (BYTES -> KB/MB)
// =======================================================
window.ham_dinh_dang_dung_luong = function (bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const dm = 1;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

// // =======================================================
// // HÀM HỖ TRỢ: ĐẨY ẢNH LÊN SERVER VÀ ĐO TIẾN TRÌNH % CHI TIẾT
// // =======================================================
// window.ham_ho_tro_upload_anh_co_tien_trinh = function (url, payload, callbackTienTrinh) {
//     return new Promise((resolve, reject) => {
//         const xhr = new XMLHttpRequest();
//         xhr.open('POST', url, true);
//         xhr.setRequestHeader('Content-Type', 'text/plain;charset=utf-8');

//         // Lắng nghe sự kiện đẩy dữ liệu lên mạng (Upload progress)
//         xhr.upload.onprogress = function (event) {
//             if (event.lengthComputable) {
//                 const percentComplete = Math.round((event.loaded / event.total) * 100);
//                 // Trả về cả phần trăm, số byte đã tải và tổng byte
//                 if (callbackTienTrinh) callbackTienTrinh(percentComplete, event.loaded, event.total);
//             }
//         };

//         xhr.onload = function () {
//             if (xhr.status >= 200 && xhr.status < 300) {
//                 try {
//                     const response = JSON.parse(xhr.responseText);
//                     resolve(response);
//                 } catch (e) {
//                     console.error("Lỗi parse JSON:", xhr.responseText);
//                     reject(new Error("Lỗi phản hồi từ server (Không phải JSON chuẩn)."));
//                 }
//             } else {
//                 reject(new Error("Lỗi mạng HTTP " + xhr.status));
//             }
//         };

//         xhr.onerror = function () {
//             reject(new Error("Mất kết nối mạng khi đang tải ảnh."));
//         };

//         xhr.send(JSON.stringify(payload));
//     });
// };


// // =======================================================
// // HÀM HỖ TRỢ: ĐẨY ẢNH LÊN SERVER (CHỐNG LỖI CORS + THANH TIẾN TRÌNH THÔNG MINH)
// // =======================================================
// window.ham_ho_tro_upload_anh_co_tien_trinh = async function (url, payload, callbackTienTrinh) {
//     return new Promise(async (resolve, reject) => {

//         // 1. Tính toán dung lượng thực tế của tấm ảnh (Base64 -> Bytes)
//         const dungLuongBytes = Math.round(payload.base64.length * 0.75);
//         let phanTram = 0;

//         // 2. Chạy thanh tiến trình mượt mà lên mức 90% trong lúc chờ Google xử lý
//         const interval = setInterval(() => {
//             if (phanTram < 90) {
//                 // Tốc độ tăng ngẫu nhiên tạo cảm giác chân thực
//                 phanTram += Math.floor(Math.random() * 5) + 2;
//                 if (phanTram > 90) phanTram = 90;

//                 let daTaiBytes = (phanTram / 100) * dungLuongBytes;
//                 if (callbackTienTrinh) callbackTienTrinh(phanTram, daTaiBytes, dungLuongBytes);
//             }
//         }, 200); // Cứ 0.2 giây cập nhật giao diện 1 lần

//         try {
//             // 3. Sử dụng fetch() để xuyên qua lớp chặn CORS của Google
//             let response = await fetch(url, {
//                 method: 'POST',
//                 headers: { "Content-Type": "text/plain;charset=utf-8" },
//                 body: JSON.stringify(payload)
//             });

//             let textRes = await response.text();

//             // Dừng thanh tiến trình chạy tự động
//             clearInterval(interval);

//             // 4. Nếu Google báo lỗi (Sập server 404/500)
//             if (!textRes.trim().startsWith('{')) {
//                 throw new Error("Lỗi kết nối máy chủ Google Apps Script.");
//             }

//             // 5. Nếu thành công -> Bơm tiến trình vọt lên 100% ngay lập tức
//             if (callbackTienTrinh) callbackTienTrinh(100, dungLuongBytes, dungLuongBytes);

//             resolve(JSON.parse(textRes));

//         } catch (err) {
//             clearInterval(interval);
//             console.error("Lỗi Upload Fetch:", err);
//             reject(new Error("Mất kết nối mạng hoặc lỗi CORS server."));
//         }
//     });
// };



// =======================================================
// HÀM HỖ TRỢ 20.23: HIỂN THỊ MÀN HÌNH CẮT ẢNH (NHIỀU ĐỘ PHÂN GIẢI)
// =======================================================
window.ham_20_23_hien_thi_modal_crop = function (file) {
    return new Promise((resolve) => {
        let modal = document.getElementById('modal-crop-anh-global');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'modal-crop-anh-global';
            modal.style.cssText = 'display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.95); z-index:99999; flex-direction:column; align-items:center; justify-content:center; padding: 15px; box-sizing: border-box; font-family: sans-serif;';

            modal.innerHTML = `
                <div style="width: 100%; max-width: 800px; height: 50vh; background: #000; position: relative; display: flex; align-items: center; justify-content: center; border: 1px solid #444; border-radius: 8px 8px 0 0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.5);">
                    <img id="img-crop-target" style="display: block; max-width: 100%; max-height: 100%;">
                </div>
                
                <div style="width: 100%; max-width: 800px; background: #222; padding: 15px; border-radius: 0 0 8px 8px; display: flex; flex-direction: column; gap: 15px; border: 1px solid #444; border-top: none;">
                    
                    <div style="display: flex; justify-content: center; gap: 25px; background: #111; padding: 12px; border-radius: 6px; border: 1px dashed #555;">
                        <div style="text-align: center;">
                            <div style="color: #aaa; font-size: 11px; margin-bottom: 3px; text-transform: uppercase;">📦 Gốc</div>
                            <div style="color: #ffc107; font-size: 16px; font-weight: bold;" id="crop-size-goc">Đang đọc...</div>
                        </div>
                        <div style="width: 1px; background: #444;"></div>
                        <div style="text-align: center;">
                            <div style="color: #aaa; font-size: 11px; margin-bottom: 3px; text-transform: uppercase;">✨ Sau cắt & nén</div>
                            <div style="color: #28a745; font-size: 18px; font-weight: bold;" id="crop-size-du-kien">⏳ Đang tính...</div>
                        </div>
                    </div>

                    <div style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; align-items: center; border-bottom: 1px solid #444; padding-bottom: 15px;">
                        <span style="color: #aaa; font-size: 13px; font-weight: bold; margin-right: 5px;">Cỡ ảnh:</span>
                        
                        <label style="background: #333; color: white; padding: 6px 8px; border-radius: 6px; font-size: 12px; cursor: pointer; border: 1px solid #555; display: flex; align-items: center; gap: 4px; transition: 0.2s;">
                            <input type="radio" name="crop_res" value="original" style="margin:0; accent-color: #007bff;"> 
                            <div><b>🌟 Gốc</b></div>
                        </label>
                        
                        <label style="background: #333; color: white; padding: 6px 8px; border-radius: 6px; font-size: 12px; cursor: pointer; border: 1px solid #555; display: flex; align-items: center; gap: 4px; transition: 0.2s;">
                            <input type="radio" name="crop_res" value="2560" style="margin:0; accent-color: #007bff;"> 
                            <div><b>🎬 2K (2560)</b></div>
                        </label>

                        <label style="background: #333; color: white; padding: 6px 8px; border-radius: 6px; font-size: 12px; cursor: pointer; border: 1px solid #555; display: flex; align-items: center; gap: 4px; transition: 0.2s;">
                            <input type="radio" name="crop_res" value="1920" style="margin:0; accent-color: #007bff;"> 
                            <div><b>📺 FHD (1920)</b></div>
                        </label>
                        
                        <label style="background: #007bff; color: white; padding: 6px 8px; border-radius: 6px; font-size: 12px; cursor: pointer; border: 1px solid #0056b3; display: flex; align-items: center; gap: 4px; transition: 0.2s;">
                            <input type="radio" name="crop_res" value="1280" checked style="margin:0; accent-color: #fff;"> 
                            <div><b>💻 HD (1280)</b></div>
                        </label>
                        
                        <label style="background: #333; color: white; padding: 6px 8px; border-radius: 6px; font-size: 12px; cursor: pointer; border: 1px solid #555; display: flex; align-items: center; gap: 4px; transition: 0.2s;">
                            <input type="radio" name="crop_res" value="800" style="margin:0; accent-color: #007bff;"> 
                            <div><b>⚡ Nhẹ (800)</b></div>
                        </label>
                    </div>

                    <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                        <button id="btn-crop-huy" style="padding: 10px 15px; background: #dc3545; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">❌ Hủy</button>
                        <button id="btn-crop-skip" style="padding: 10px 15px; background: #6c757d; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">⏭️ Chỉ Nén (Không cắt)</button>
                        <button id="btn-crop-ok" style="padding: 10px 25px; background: #28a745; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; font-size: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.3);">✂️ LƯU TẤM NÀY</button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);

            const radios = modal.querySelectorAll('input[name="crop_res"]');
            radios.forEach(radio => {
                radio.addEventListener('change', function () {
                    radios.forEach(r => {
                        r.parentElement.style.background = '#333';
                        r.parentElement.style.borderColor = '#555';
                    });
                    this.parentElement.style.background = '#007bff';
                    this.parentElement.style.borderColor = '#0056b3';
                });
            });
        }

        const imgTarget = document.getElementById('img-crop-target');
        const txtSizeGoc = document.getElementById('crop-size-goc');
        const txtSizeDuKien = document.getElementById('crop-size-du-kien');
        const btnHuy = document.getElementById('btn-crop-huy');
        const btnSkip = document.getElementById('btn-crop-skip');
        const btnOk = document.getElementById('btn-crop-ok');
        let timeoutTinhToan = null;
        let cropper = null;

        const formatSize = (bytes) => {
            if (bytes === 0) return '0 B';
            const k = 1024, i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + ['B', 'KB', 'MB'][i];
        };

        const getSelectedRes = () => {
            const selected = document.querySelector('input[name="crop_res"]:checked');
            return selected ? selected.value : '1280';
        };

        const tinhToanDungLuongDuKien = () => {
            if (!cropper) return;
            txtSizeDuKien.innerHTML = "⏳ Đang tính...";
            txtSizeDuKien.style.color = "#adb5bd";

            clearTimeout(timeoutTinhToan);

            timeoutTinhToan = setTimeout(() => {
                let res = getSelectedRes();
                let quality = res === 'original' ? 0.95 : 0.7;
                let canvasOptions = {};

                if (res !== 'original') {
                    canvasOptions.maxWidth = parseInt(res);
                    canvasOptions.maxHeight = parseInt(res);
                }

                let canvas = cropper.getCroppedCanvas(canvasOptions);

                if (canvas) {
                    canvas.toBlob((blob) => {
                        if (blob) {
                            txtSizeDuKien.innerHTML = formatSize(blob.size);
                            txtSizeDuKien.style.color = "#28a745";
                        }
                    }, 'image/jpeg', quality);
                }
            }, 250);
        };

        document.querySelectorAll('input[name="crop_res"]').forEach(radio => {
            radio.addEventListener('change', tinhToanDungLuongDuKien);
        });

        txtSizeGoc.innerHTML = formatSize(file.size);
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = (e) => {
            imgTarget.src = e.target.result;
            modal.style.display = 'flex';

            imgTarget.onload = () => {
                if (cropper) cropper.destroy();
                cropper = new Cropper(imgTarget, {
                    viewMode: 2,
                    autoCropArea: 0.9,
                    responsive: true,
                    background: false,
                    ready: function () { tinhToanDungLuongDuKien(); },
                    cropend: function () { tinhToanDungLuongDuKien(); }
                });
            };

            const cleanup = () => {
                if (cropper) cropper.destroy();
                modal.style.display = 'none';
                btnHuy.onclick = null;
                btnSkip.onclick = null;
                btnOk.onclick = null;
                clearTimeout(timeoutTinhToan);
            };

            btnHuy.onclick = () => { cleanup(); resolve(null); };

            btnSkip.onclick = () => {
                let res = getSelectedRes();
                let maxWidth = res === 'original' ? 'original' : parseInt(res);
                cleanup();
                window.ham_20_24_nen_anh_canvas(file, 0.7, maxWidth).then(resolve);
            };

            btnOk.onclick = () => {
                let res = getSelectedRes();
                let quality = res === 'original' ? 0.95 : 0.7;
                let canvasOptions = {};
                if (res !== 'original') {
                    canvasOptions.maxWidth = parseInt(res);
                    canvasOptions.maxHeight = parseInt(res);
                }

                btnOk.innerHTML = "⏳ Đang lưu...";
                setTimeout(() => {
                    let canvas = cropper.getCroppedCanvas(canvasOptions);
                    cleanup();
                    btnOk.innerHTML = "✂️ LƯU TẤM NÀY";

                    canvas.toBlob((blob) => {
                        const newFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".jpg", { type: 'image/jpeg', lastModified: Date.now() });
                        resolve(newFile);
                    }, 'image/jpeg', quality);
                }, 50);
            };
        };
    });
};




// // =======================================================
// // HÀM HỖ TRỢ: HIỂN THỊ MÀN HÌNH CẮT ẢNH (TÍNH TOÁN DUNG LƯỢNG THỰC TẾ)
// // =======================================================
// window.ham_20_23_hien_thi_modal_crop = function (file) {
//     return new Promise((resolve) => {
//         let modal = document.getElementById('modal-crop-anh-global');
//         if (!modal) {
//             modal = document.createElement('div');
//             modal.id = 'modal-crop-anh-global';
//             modal.style.cssText = 'display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.95); z-index:99999; flex-direction:column; align-items:center; justify-content:center; padding: 15px; box-sizing: border-box; font-family: sans-serif;';

//             modal.innerHTML = `
//                 <div style="width: 100%; max-width: 800px; height: 50vh; background: #000; position: relative; display: flex; align-items: center; justify-content: center; border: 1px solid #444; border-radius: 8px 8px 0 0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.5);">
//                     <img id="img-crop-target" style="display: block; max-width: 100%; max-height: 100%;">
//                 </div>
                
//                 <div style="width: 100%; max-width: 800px; background: #222; padding: 15px; border-radius: 0 0 8px 8px; display: flex; flex-direction: column; gap: 15px; border: 1px solid #444; border-top: none;">
                    
//                     <!-- 🌟 BẢNG THEO DÕI DUNG LƯỢNG TRỰC TIẾP -->
//                     <div style="display: flex; justify-content: center; gap: 25px; background: #111; padding: 12px; border-radius: 6px; border: 1px dashed #555;">
//                         <div style="text-align: center;">
//                             <div style="color: #aaa; font-size: 11px; margin-bottom: 3px; text-transform: uppercase;">📦 Dung lượng gốc</div>
//                             <div style="color: #ffc107; font-size: 16px; font-weight: bold;" id="crop-size-goc">Đang đọc...</div>
//                         </div>
//                         <div style="width: 1px; background: #444;"></div>
//                         <div style="text-align: center;">
//                             <div style="color: #aaa; font-size: 11px; margin-bottom: 3px; text-transform: uppercase;">✨ Sau khi cắt & nén</div>
//                             <div style="color: #28a745; font-size: 18px; font-weight: bold;" id="crop-size-du-kien">⏳ Đang tính...</div>
//                         </div>
//                     </div>

//                     <!-- KHU VỰC CHỌN ĐỘ PHÂN GIẢI -->
//                     <div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; align-items: center; border-bottom: 1px solid #444; padding-bottom: 15px;">
//                         <span style="color: #aaa; font-size: 13px; font-weight: bold; margin-right: 5px;">Mức nén ảnh:</span>
                        
//                         <label style="background: #333; color: white; padding: 6px 10px; border-radius: 6px; font-size: 12px; cursor: pointer; border: 1px solid #555; display: flex; align-items: center; gap: 5px; transition: 0.2s;">
//                             <input type="radio" name="crop_res" value="1920" style="margin:0; accent-color: #007bff;"> 
//                             <div><b>📸 Nét (1920px)</b></div>
//                         </label>
                        
//                         <label style="background: #007bff; color: white; padding: 6px 10px; border-radius: 6px; font-size: 12px; cursor: pointer; border: 1px solid #0056b3; display: flex; align-items: center; gap: 5px; transition: 0.2s;">
//                             <input type="radio" name="crop_res" value="1280" checked style="margin:0; accent-color: #fff;"> 
//                             <div><b>⚖️ Chuẩn (1280px)</b></div>
//                         </label>
                        
//                         <label style="background: #333; color: white; padding: 6px 10px; border-radius: 6px; font-size: 12px; cursor: pointer; border: 1px solid #555; display: flex; align-items: center; gap: 5px; transition: 0.2s;">
//                             <input type="radio" name="crop_res" value="800" style="margin:0; accent-color: #007bff;"> 
//                             <div><b>⚡ Tốc độ (800px)</b></div>
//                         </label>
//                     </div>

//                     <!-- KHU VỰC NÚT HÀNH ĐỘNG -->
//                     <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
//                         <button id="btn-crop-huy" style="padding: 10px 15px; background: #dc3545; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">❌ Hủy</button>
//                         <button id="btn-crop-skip" style="padding: 10px 15px; background: #6c757d; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">⏭️ Chỉ Nén (Không cắt)</button>
//                         <button id="btn-crop-ok" style="padding: 10px 25px; background: #28a745; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; font-size: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.3);">✂️ LƯU TẤM NÀY</button>
//                     </div>
//                 </div>
//             `;
//             document.body.appendChild(modal);

//             // Hiệu ứng đổi màu radio
//             const radios = modal.querySelectorAll('input[name="crop_res"]');
//             radios.forEach(radio => {
//                 radio.addEventListener('change', function () {
//                     radios.forEach(r => {
//                         r.parentElement.style.background = '#333';
//                         r.parentElement.style.borderColor = '#555';
//                     });
//                     this.parentElement.style.background = '#007bff';
//                     this.parentElement.style.borderColor = '#0056b3';
//                 });
//             });
//         }

//         const imgTarget = document.getElementById('img-crop-target');
//         const txtSizeGoc = document.getElementById('crop-size-goc');
//         const txtSizeDuKien = document.getElementById('crop-size-du-kien');
//         const btnHuy = document.getElementById('btn-crop-huy');
//         const btnSkip = document.getElementById('btn-crop-skip');
//         const btnOk = document.getElementById('btn-crop-ok');
//         let timeoutTinhToan = null;
//         let cropper = null;

//         // Định dạng KB/MB nội bộ cho an toàn
//         const formatSize = (bytes) => {
//             if (bytes === 0) return '0 B';
//             const k = 1024, i = Math.floor(Math.log(bytes) / Math.log(k));
//             return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + ['B', 'KB', 'MB'][i];
//         };

//         const getSelectedRes = () => {
//             const selected = document.querySelector('input[name="crop_res"]:checked');
//             return selected ? parseInt(selected.value) : 1280;
//         };

//         // Thuật toán: Vẽ ngầm hình ảnh thu nhỏ ra một file tạm để cân đo dung lượng
//         const tinhToanDungLuongDuKien = () => {
//             if (!cropper) return;
//             txtSizeDuKien.innerHTML = "⏳ Đang tính...";
//             txtSizeDuKien.style.color = "#adb5bd";

//             clearTimeout(timeoutTinhToan);

//             // Dùng setTimeout 250ms (Debounce) để chống giật khi đang thao tác liên tục
//             timeoutTinhToan = setTimeout(() => {
//                 let maxWidth = getSelectedRes();
//                 let canvas = cropper.getCroppedCanvas({
//                     maxWidth: maxWidth,
//                     maxHeight: maxWidth
//                 });

//                 if (canvas) {
//                     canvas.toBlob((blob) => {
//                         if (blob) {
//                             txtSizeDuKien.innerHTML = formatSize(blob.size);
//                             txtSizeDuKien.style.color = "#28a745";
//                         }
//                     }, 'image/jpeg', 0.7);
//                 }
//             }, 250);
//         };

//         // Gắn sự kiện: Khi đổi độ phân giải thì tự động tính lại dung lượng
//         document.querySelectorAll('input[name="crop_res"]').forEach(radio => {
//             radio.addEventListener('change', tinhToanDungLuongDuKien);
//         });

//         // Đọc ảnh và khởi tạo
//         txtSizeGoc.innerHTML = formatSize(file.size);
//         const reader = new FileReader();
//         reader.readAsDataURL(file);

//         reader.onload = (e) => {
//             imgTarget.src = e.target.result;
//             modal.style.display = 'flex';

//             imgTarget.onload = () => {
//                 if (cropper) cropper.destroy();
//                 cropper = new Cropper(imgTarget, {
//                     viewMode: 2,
//                     autoCropArea: 0.9,
//                     responsive: true,
//                     background: false,
//                     ready: function () {
//                         // Tính toán dung lượng lần đầu khi vừa mở lên
//                         tinhToanDungLuongDuKien();
//                     },
//                     cropend: function () {
//                         // Tính toán lại dung lượng mỗi khi thả ngón tay ra khỏi khung cắt
//                         tinhToanDungLuongDuKien();
//                     }
//                 });
//             };

//             const cleanup = () => {
//                 if (cropper) cropper.destroy();
//                 modal.style.display = 'none';
//                 btnHuy.onclick = null;
//                 btnSkip.onclick = null;
//                 btnOk.onclick = null;
//                 clearTimeout(timeoutTinhToan);
//             };

//             btnHuy.onclick = () => { cleanup(); resolve(null); };

//             btnSkip.onclick = () => {
//                 let maxWidth = getSelectedRes();
//                 cleanup();
//                 window.ham_20_24_nen_anh_canvas(file, 0.7, maxWidth).then(resolve);
//             };

//             btnOk.onclick = () => {
//                 let maxWidth = getSelectedRes();
//                 btnOk.innerHTML = "⏳ Đang lưu...";
//                 setTimeout(() => {
//                     let canvas = cropper.getCroppedCanvas({
//                         maxWidth: maxWidth,
//                         maxHeight: maxWidth
//                     });
//                     cleanup();
//                     btnOk.innerHTML = "✂️ LƯU TẤM NÀY";

//                     canvas.toBlob((blob) => {
//                         const newFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".jpg", { type: 'image/jpeg', lastModified: Date.now() });
//                         resolve(newFile);
//                     }, 'image/jpeg', 0.7);
//                 }, 50);
//             };
//         };
//     });
// };




// =======================================================
// HÀM HỖ TRỢ: ĐẨY ẢNH LÊN SERVER (CHỐNG LỖI CORS + THANH TIẾN TRÌNH THÔNG MINH)
// =======================================================
window.ham_ho_tro_upload_anh_co_tien_trinh = async function (url, payload, callbackTienTrinh) {
    return new Promise(async (resolve, reject) => {

        // 1. Tính toán dung lượng thực tế của tấm ảnh (Base64 -> Bytes)
        const dungLuongBytes = Math.round(payload.base64.length * 0.75);
        let phanTram = 0;

        // 2. Chạy thanh tiến trình mượt mà lên mức 90% trong lúc chờ Google xử lý
        const interval = setInterval(() => {
            if (phanTram < 90) {
                // Tốc độ tăng ngẫu nhiên tạo cảm giác chân thực
                phanTram += Math.floor(Math.random() * 5) + 2;
                if (phanTram > 90) phanTram = 90;

                let daTaiBytes = (phanTram / 100) * dungLuongBytes;
                if (callbackTienTrinh) callbackTienTrinh(phanTram, daTaiBytes, dungLuongBytes);
            }
        }, 200); // Cứ 0.2 giây cập nhật giao diện 1 lần

        try {
            // 3. Sử dụng fetch() để xuyên qua lớp chặn CORS của Google
            let response = await fetch(url, {
                method: 'POST',
                headers: { "Content-Type": "text/plain;charset=utf-8" },
                body: JSON.stringify(payload)
            });

            let textRes = await response.text();

            // Dừng thanh tiến trình chạy tự động
            clearInterval(interval);

            // 4. Nếu Google báo lỗi (Sập server 404/500)
            if (!textRes.trim().startsWith('{')) {
                throw new Error("Lỗi kết nối máy chủ Google Apps Script.");
            }

            // 5. Nếu thành công -> Bơm tiến trình vọt lên 100% ngay lập tức
            if (callbackTienTrinh) callbackTienTrinh(100, dungLuongBytes, dungLuongBytes);

            resolve(JSON.parse(textRes));

        } catch (err) {
            clearInterval(interval);
            console.error("Lỗi Upload Fetch:", err);
            reject(new Error("Mất kết nối mạng hoặc lỗi CORS server."));
        }
    });
};

// // =======================================================
// // HÀM HỖ TRỢ: NÉN ẢNH TỰ ĐỘNG BẰNG CANVAS (NẾU KHÔNG CẮT)
// // =======================================================
// window.ham_20_24_nen_anh_canvas = function (file, quality = 0.7, maxWidth = 1600) {
//     return new Promise((resolve) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onload = function (event) {
//             const img = new Image();
//             img.src = event.target.result;
//             img.onload = function () {
//                 let width = img.width;
//                 let height = img.height;

//                 if (width > maxWidth) {
//                     height = Math.round((height * maxWidth) / width);
//                     width = maxWidth;
//                 }

//                 const canvas = document.createElement('canvas');
//                 canvas.width = width;
//                 canvas.height = height;
//                 const ctx = canvas.getContext('2d');
//                 ctx.drawImage(img, 0, 0, width, height);

//                 canvas.toBlob((blob) => {
//                     const newFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".jpg", {
//                         type: 'image/jpeg',
//                         lastModified: Date.now()
//                     });
//                     resolve(newFile);
//                 }, 'image/jpeg', quality);
//             }
//         }
//     });
// };


// =======================================================
// HÀM HỖ TRỢ 20.24: NÉN ẢNH TỰ ĐỘNG BẰNG CANVAS
// =======================================================
window.ham_20_24_nen_anh_canvas = function (file, quality = 0.7, maxWidth = 1280) {
    return new Promise((resolve) => {
        if (maxWidth === 'original') {
            resolve(file); // Giữ nguyên file gốc không can thiệp
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (event) {
            const img = new Image();
            img.src = event.target.result;
            img.onload = function () {
                let width = img.width;
                let height = img.height;

                if (width > maxWidth) {
                    height = Math.round((height * maxWidth) / width);
                    width = maxWidth;
                }

                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                canvas.toBlob((blob) => {
                    const newFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".jpg", { type: 'image/jpeg', lastModified: Date.now() });
                    resolve(newFile);
                }, 'image/jpeg', quality);
            }
        }
    });
};


// =======================================================
// HÀM HỖ TRỢ: DUYỆT QUA MẢNG ẢNH ĐỂ CẮT/NÉN TỪNG TẤM
// =======================================================
window.ham_20_25_xu_ly_mang_anh_dau_vao = async function (files) {
    await window.ham_20_26_tai_thu_vien_cropper();

    let processedFiles = [];
    for (let i = 0; i < files.length; i++) {
        let processedFile = await window.ham_20_23_hien_thi_modal_crop(files[i]);
        if (processedFile) {
            processedFiles.push(processedFile);
        }
    }
    return processedFiles;
};


// // =======================================================
// // HÀM 20.27: TỰ ĐỘNG TẢI NỘI DUNG TIẾT HỌC NẾU ĐÃ CÓ DỮ LIỆU
// // =======================================================
// window.ham_20_27_kiem_tra_tiet_da_luu = async function () {
//     const ngayDay = document.querySelector('input[type="date"]').value;
//     const buoi = document.getElementById('nk-input-buoi').value.trim();
//     const tiet = document.getElementById('nk-input-tiet').value.trim();
//     const rawLop = document.getElementById('nk-input-lop').value.trim();

//     let maLopLuu = rawLop;
//     if (rawLop.match(/\(([^)]+)\)$/)) {
//         maLopLuu = rawLop.match(/\(([^)]+)\)$/)[1].trim();
//     }

//     const vungAnhDaLuu = document.getElementById('vung-anh-bai-giang-da-luu');
//     const btnLuuBG = document.querySelector('button[onclick="ham_20_6a_luu_bai_giang(this)"]');

//     if (!ngayDay || !buoi || !tiet || !maLopLuu) {
//         if (vungAnhDaLuu) vungAnhDaLuu.style.display = 'none';
//         return;
//     }

//     try {
//         const { data, error } = await _supabase.from('nhat_ky_day_hoc')
//             .select('*')
//             .eq('ngay_day', ngayDay).eq('buoi', buoi).eq('tiet', tiet).eq('ma_lop', maLopLuu);

//         if (error) throw error;

//         if (data && data.length > 0) {
//             const nk = data[0];

//             // 1. Tự động điền Text
//             if (nk.phan_mon) document.getElementById('nk-input-mon').value = nk.phan_mon;
//             if (nk.ten_bai) document.getElementById('nk-input-ten-bai').value = nk.ten_bai;
//             const cacTextArea = document.querySelectorAll('textarea');
//             if (nk.ly_thuyet && cacTextArea[0]) cacTextArea[0].value = nk.ly_thuyet;
//             if (nk.bai_tap && cacTextArea[1]) cacTextArea[1].value = nk.bai_tap;
//             if (nk.dan_do && cacTextArea[2]) cacTextArea[2].value = nk.dan_do;

//             // 2. Hiển thị ảnh đã lưu
//             let mangAnh = [];
//             if (nk.danh_sach_anh) {
//                 if (Array.isArray(nk.danh_sach_anh)) mangAnh = nk.danh_sach_anh;
//                 else if (typeof nk.danh_sach_anh === 'string') {
//                     try { mangAnh = JSON.parse(nk.danh_sach_anh); } catch (e) { mangAnh = nk.danh_sach_anh.split(',').filter(l => l.trim()); }
//                 }
//             }

//             if (mangAnh.length > 0 && vungAnhDaLuu) {
//                 let htmlAnh = '<div style="font-size:13px; font-weight:bold; color:#155724; margin-bottom:8px;">✅ Tiết này đã lưu nội dung và các ảnh sau:</div><div style="display:flex; gap:10px; flex-wrap:wrap;">';
//                 mangAnh.forEach(link => {
//                     let previewLink = link;
//                     let matchD = link.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
//                     if (matchD) previewLink = `https://lh3.googleusercontent.com/d/${matchD[1]}`;
//                     htmlAnh += `<a href="${link}" target="_blank" title="Bấm để xem ảnh gốc"><img src="${previewLink}" style="height: 65px; width: 65px; object-fit: cover; border-radius: 6px; border: 2px solid #28a745; box-shadow: 0 2px 4px rgba(0,0,0,0.15);"></a>`;
//                 });
//                 htmlAnh += '</div>';
//                 vungAnhDaLuu.innerHTML = htmlAnh;
//                 vungAnhDaLuu.style.display = 'block';
//             } else if (vungAnhDaLuu) {
//                 vungAnhDaLuu.style.display = 'none';
//                 vungAnhDaLuu.innerHTML = '';
//             }

//             // Đổi nhãn nút bấm
//             if (btnLuuBG) btnLuuBG.innerHTML = '💾 1. CẬP NHẬT (THÊM ẢNH) BÀI GIẢNG';

//         } else {
//             // Tiết trống hoàn toàn
//             if (vungAnhDaLuu) vungAnhDaLuu.style.display = 'none';
//             if (btnLuuBG) btnLuuBG.innerHTML = '💾 1. LƯU NỘI DUNG BÀI GIẢNG';
//         }
//     } catch (e) {
//         console.error("Lỗi kiểm tra tiết đã lưu:", e);
//     }
// };


// =======================================================
// KHỐI HỖ TRỢ: TỰ ĐỘNG TẢI THƯ VIỆN CẮT ẢNH CROPPER.JS
// =======================================================
window.ham_20_26_tai_thu_vien_cropper = function () {
    return new Promise((resolve) => {
        if (window.Cropper) { resolve(); return; }

        let css = document.createElement('link');
        css.rel = 'stylesheet';
        css.href = 'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.css';
        document.head.appendChild(css);

        let script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.js';
        script.onload = () => resolve();
        document.head.appendChild(script);
    });
};

// =======================================================
// HÀM 20.27: TỰ ĐỘNG TẢI NỘI DUNG & SỰ KIỆN TIẾT HỌC
// =======================================================
window.ham_20_27_kiem_tra_tiet_da_luu = async function () {
    const ngayDay = document.querySelector('input[type="date"]').value;
    const buoi = document.getElementById('nk-input-buoi').value.trim();
    const tiet = document.getElementById('nk-input-tiet').value.trim();
    const rawLop = document.getElementById('nk-input-lop').value.trim();

    let maLopLuu = rawLop;
    if (rawLop.match(/\(([^)]+)\)$/)) {
        maLopLuu = rawLop.match(/\(([^)]+)\)$/)[1].trim();
    }

    const vungAnhDaLuu = document.getElementById('vung-anh-bai-giang-da-luu');
    const vungSuKienDaLuu = document.getElementById('vung-su-kien-da-luu');
    const btnLuuBG = document.querySelector('button[onclick="ham_20_6a_luu_bai_giang(this)"]');

    if (!ngayDay || !buoi || !tiet || !maLopLuu) {
        if (vungAnhDaLuu) vungAnhDaLuu.style.display = 'none';
        if (vungSuKienDaLuu) vungSuKienDaLuu.style.display = 'none';
        return;
    }

    try {
        const { data, error } = await _supabase.from('nhat_ky_day_hoc')
            .select('*')
            .eq('ngay_day', ngayDay).eq('buoi', buoi).eq('tiet', tiet).eq('ma_lop', maLopLuu);

        if (error) throw error;

        if (data && data.length > 0) {
            const nk = data[0];

            // 1. TỰ ĐỘNG ĐIỀN NỘI DUNG BÀI GIẢNG
            if (nk.phan_mon) document.getElementById('nk-input-mon').value = nk.phan_mon;
            if (nk.ten_bai) document.getElementById('nk-input-ten-bai').value = nk.ten_bai;
            const cacTextArea = document.querySelectorAll('textarea');
            if (nk.ly_thuyet && cacTextArea[0]) cacTextArea[0].value = nk.ly_thuyet;
            if (nk.bai_tap && cacTextArea[1]) cacTextArea[1].value = nk.bai_tap;
            if (nk.dan_do && cacTextArea[2]) cacTextArea[2].value = nk.dan_do;

            // 2. HIỂN THỊ ẢNH BÀI GIẢNG (KÍCH THƯỚC X2 = 130px)
            let mangAnh = [];
            if (nk.danh_sach_anh) {
                if (Array.isArray(nk.danh_sach_anh)) mangAnh = nk.danh_sach_anh;
                else if (typeof nk.danh_sach_anh === 'string') {
                    try { mangAnh = JSON.parse(nk.danh_sach_anh); } catch (e) { mangAnh = nk.danh_sach_anh.split(',').filter(l => l.trim()); }
                }
            }

            if (mangAnh.length > 0 && vungAnhDaLuu) {
                let htmlAnh = '<div style="font-size:13px; font-weight:bold; color:#155724; margin-bottom:10px;">✅ Tiết này đã lưu nội dung và các ảnh sau:</div><div style="display:flex; gap:10px; flex-wrap:wrap;">';
                mangAnh.forEach(link => {
                    let previewLink = link;
                    let matchD = link.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
                    if (matchD) previewLink = `https://lh3.googleusercontent.com/d/${matchD[1]}`;

                    // 🌟 Thay đổi kích thước ảnh từ 65px -> 130px 🌟
                    htmlAnh += `<a href="${link}" target="_blank" title="Bấm để xem ảnh gốc"><img src="${previewLink}" style="height: 200px; width: 200px; object-fit: cover; border-radius: 6px; border: 2px solid #28a745; box-shadow: 0 2px 4px rgba(0,0,0,0.15);"></a>`;
                });
                htmlAnh += '</div>';
                vungAnhDaLuu.innerHTML = htmlAnh;
                vungAnhDaLuu.style.display = 'block';
            } else if (vungAnhDaLuu) {
                vungAnhDaLuu.style.display = 'none';
                vungAnhDaLuu.innerHTML = '';
            }

            // 3. TỰ ĐỘNG KIỂM TRA SỰ KIỆN & VẮNG MẶT CỦA TIẾT ĐÓ
            if (vungSuKienDaLuu) {
                const { data: dsSuKien, error: errSK } = await _supabase.from('nhat_ky_su_kien_hs')
                    .select('*')
                    .eq('id_nhat_ky', nk.id);

                if (!errSK && dsSuKien && dsSuKien.length > 0) {
                    let htmlSK = '<div style="font-size:13px; font-weight:bold; color:#856404; margin-bottom:8px;">✅ Tiết này ĐÃ LƯU học sinh sau:</div>';
                    htmlSK += '<div style="display:flex; flex-direction:column; gap:8px;">';

                    let hsVang = dsSuKien.filter(sk => sk.loai_the === 'Vắng mặt');
                    let hsKhac = dsSuKien.filter(sk => sk.loai_the !== 'Vắng mặt');

                    if (hsVang.length > 0) {
                        htmlSK += `<div style="font-size:13px;"><b style="color:#dc3545;">❌ Vắng mặt:</b> ${hsVang.map(v => v.ten_hoc_sinh).join(', ')}</div>`;
                    }

                    if (hsKhac.length > 0) {
                        htmlSK += `<div style="font-size:13px;"><b style="color:#d35400;">🎯 Sự kiện/Điểm:</b></div>`;
                        hsKhac.forEach(sk => {
                            let diemStr = (sk.thong_tin_mo_rong && sk.thong_tin_mo_rong.diem_so) ? ` <span style="background:#28a745; color:white; padding:1px 5px; border-radius:3px; font-size:11px;">⭐ ${sk.thong_tin_mo_rong.diem_so}đ</span>` : '';
                            let noteStr = sk.ghi_chu ? ` - <i style="color:#555;">${sk.ghi_chu}</i>` : '';
                            htmlSK += `
                                <div style="font-size:13px; margin-left: 10px; border-left: 3px solid ${sk.thong_tin_mo_rong?.mau_sac || '#000'}; padding-left: 8px; background:#fff; padding-top:4px; padding-bottom:4px; border-radius:0 4px 4px 0;">
                                    <b>${sk.ten_hoc_sinh}</b>: <span style="color:${sk.thong_tin_mo_rong?.mau_sac || '#000'}; font-weight:bold;">[${sk.loai_the}]</span>${diemStr}${noteStr}
                                </div>
                            `;
                        });
                    }
                    htmlSK += '</div>';
                    vungSuKienDaLuu.innerHTML = htmlSK;
                    vungSuKienDaLuu.style.display = 'block';
                } else {
                    vungSuKienDaLuu.style.display = 'none';
                    vungSuKienDaLuu.innerHTML = '';
                }
            }

            if (btnLuuBG) btnLuuBG.innerHTML = '💾 1. CẬP NHẬT (THÊM ẢNH) BÀI GIẢNG';

        } else {
            // Tiết trống hoàn toàn
            if (vungAnhDaLuu) vungAnhDaLuu.style.display = 'none';
            if (vungSuKienDaLuu) vungSuKienDaLuu.style.display = 'none';
            if (btnLuuBG) btnLuuBG.innerHTML = '💾 1. LƯU NỘI DUNG BÀI GIẢNG';
        }
    } catch (e) {
        console.error("Lỗi kiểm tra tiết đã lưu:", e);
    }
};





// =====================================================================
// HÀM 20.28: TẢI THÔNG TIN CỦA TIẾT HỌC GẦN NHẤT VỪA LƯU
// =====================================================================
window.ham_20_28_tai_tiet_gan_nhat = function () {
    const lastNgayDay = localStorage.getItem('nk_last_ngayDay');
    const lastBuoi = localStorage.getItem('nk_last_buoi');
    const lastTiet = localStorage.getItem('nk_last_tiet');
    const lastLop = localStorage.getItem('nk_last_lop');

    if (!lastNgayDay && !lastBuoi && !lastTiet && !lastLop) {
        alert("⚠️ Hệ thống chưa ghi nhận tiết học nào được lưu gần đây trên trình duyệt này!");
        return;
    }

    // Đổ dữ liệu vào giao diện
    if (lastNgayDay) document.querySelector('input[type="date"]').value = lastNgayDay;
    if (lastBuoi) document.getElementById('nk-input-buoi').value = lastBuoi;
    if (lastTiet) document.getElementById('nk-input-tiet').value = lastTiet;
    if (lastLop) document.getElementById('nk-input-lop').value = lastLop;

    // Kích hoạt nạp danh sách học sinh và kiểm tra dữ liệu tiết học tự động
    if (lastLop && typeof ham_20_2_tai_danh_sach_hs_theo_lop === 'function') {
        ham_20_2_tai_danh_sach_hs_theo_lop();
    }

    if (typeof ham_20_27_kiem_tra_tiet_da_luu === 'function') {
        ham_20_27_kiem_tra_tiet_da_luu();
    }
};


// =====================================================================
// HÀM 20.29: DỌN DẸP LÀM TIẾT MỚI (RESET GIAO DIỆN)
// =====================================================================
window.ham_20_29_lam_moi_tiet_hoc = function () {
    // 1. Reset Thông tin chung
    const today = new Date().toISOString().split('T')[0];
    document.querySelector('input[type="date"]').value = today;
    document.getElementById('nk-input-buoi').value = '';
    document.getElementById('nk-input-tiet').value = '';
    document.getElementById('nk-input-lop').value = '';
    document.getElementById('nk-input-mon').value = '';

    // 2. Reset Nội dung bài giảng
    document.getElementById('nk-input-ten-bai').value = '';
    const cacTextArea = document.querySelectorAll('textarea');
    if (cacTextArea[0]) cacTextArea[0].value = '';
    if (cacTextArea[1]) cacTextArea[1].value = '';
    if (cacTextArea[2]) cacTextArea[2].value = '';

    // 3. Xóa trắng danh sách mảng tạm
    window.danhSachAnhBaiGiangTam = [];
    window.danhSachAnhMinhChungTam = [];
    window.danhSachSuKienTam = [];

    // 4. Render lại giao diện các khu vực (để xóa ảnh/sự kiện đang hiển thị)
    if (typeof ham_20_11_render_anh_bai_giang === 'function') ham_20_11_render_anh_bai_giang();
    if (typeof ham_20_22_render_anh_minh_chung === 'function') ham_20_22_render_anh_minh_chung();
    if (typeof ham_20_4_ve_danh_sach_cho === 'function') ham_20_4_ve_danh_sach_cho();

    // 5. Reset khu vực điểm danh
    const khuVucDiemDanh = document.getElementById('nk-khu-vuc-diem-danh');
    if (khuVucDiemDanh) {
        khuVucDiemDanh.innerHTML = `
            <div class="dong-hs-vang" style="display: flex; gap: 8px; align-items: center;">
                <input class="nk-input-hs-vang" list="nk-dl-hs" placeholder="Chọn hoặc gõ tên HS vắng..." style="flex: 1; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; outline: none; font-size: 13px;">
                <button onclick="this.parentElement.remove()" style="padding: 8px 12px; background: #f8d7da; color: #721c24; border: none; border-radius: 4px; cursor: pointer;" title="Xóa dòng này">✖</button>
            </div>`;
    }

    // 6. Xóa danh sách học sinh cũ và ẩn các khối "Đã lưu"
    const dlHs = document.getElementById('nk-dl-hs');
    if (dlHs) dlHs.innerHTML = '';
    if (typeof ham_20_27_kiem_tra_tiet_da_luu === 'function') ham_20_27_kiem_tra_tiet_da_luu();
};
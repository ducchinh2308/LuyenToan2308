// // =====================================================================
// // KHỐI 20: TIỆN ÍCH - NHẬT KÝ DẠY HỌC (UI HOÀN CHỈNH ĐẦY ĐỦ)
// // =====================================================================

// window.ham_20_1_mo_giao_dien_nhat_ky_day_hoc = function () {
//     const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
//     if (!vungLamViec) return;

//     const today = new Date().toISOString().split('T')[0];

//     vungLamViec.innerHTML = `
//         <div style="padding: 10px; animation: fadeIn 0.3s ease-in-out;">
            
//             <!-- HEADER & THANH CÔNG CỤ -->
//             <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #17a2b8; padding-bottom: 10px; margin-bottom: 20px;">
//                 <h3 style="color: #17a2b8; margin: 0; text-transform: uppercase; display: flex; align-items: center; gap: 10px;">
//                     📔 Nhật Ký Dạy Học
//                 </h3>
                
//                 <div style="display: flex; gap: 10px;">
//                     <button onclick="alert('Giao diện tra cứu và xem lại nhật ký theo Lớp/Ngày đang được xây dựng...')" style="padding: 6px 15px; background: #ffc107; color: #000; border: 1px solid #d39e00; border-radius: 4px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: 0.2s;">
//                         🔍 Tìm lại Nhật ký
//                     </button>
                    
//                     <button onclick="ham_3_1_ve_dashboard_admin()" style="padding: 6px 15px; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
//                         ⬅️ Quay lại
//                     </button>
//                 </div>
//             </div>

//             <div style="display: flex; gap: 20px; flex-wrap: wrap;">
                
//                 <!-- CỘT TRÁI: THÔNG TIN CHUNG & NỘI DUNG BÀI -->
//                 <div style="flex: 1.5; min-width: 400px; display: flex; flex-direction: column; gap: 20px;">
                    
//                     <!-- 1. THÔNG TIN TIẾT HỌC -->
//                     <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border: 1px solid #ced4da; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
//                         <h4 style="margin: 0 0 15px 0; color: #495057;">🕒 1. Thông tin tiết học</h4>
                        
//                         <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 15px;">
//                             <!-- Ngày dạy -->
//                             <div>
//                                 <label style="font-weight: bold; font-size: 13px; color: #6c757d;">Ngày dạy:</label>
//                                 <input type="date" value="${today}" style="width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; font-weight: bold; color: #0056b3; outline: none;">
//                             </div>
                            
//                             <!-- Buổi -->
//                             <div>
//                                 <label style="font-weight: bold; font-size: 13px; color: #6c757d;">Buổi:</label>
//                                 <input id="nk-input-buoi" list="dl-buoi" onfocus="this.dataset.old = this.value; this.value='';" onblur="if(!this.value) this.value = this.dataset.old;" placeholder="Chọn / Gõ..." style="width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; outline: none;">
//                                 <datalist id="dl-buoi">
//                                     <option value="Sáng"></option>
//                                     <option value="Chiều"></option>
//                                     <option value="Tối"></option>
//                                 </datalist>
//                             </div>
                            
//                             <!-- Tiết -->
//                             <div>
//                                 <label style="font-weight: bold; font-size: 13px; color: #6c757d;">Tiết:</label>
//                                 <input id="nk-input-tiet" list="dl-tiet" onfocus="this.dataset.old = this.value; this.value='';" onblur="if(!this.value) this.value = this.dataset.old;" placeholder="Chọn / Gõ..." style="width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; outline: none;">
//                                 <datalist id="dl-tiet">
//                                     <option value="Tiết 1"></option>
//                                     <option value="Tiết 2"></option>
//                                     <option value="Tiết 3"></option>
//                                     <option value="Tiết 4"></option>
//                                     <option value="Tiết 5"></option>
//                                 </datalist>
//                             </div>

//                             <!-- Lớp -->
//                             <div>
//                                 <label style="font-weight: bold; font-size: 13px; color: #6c757d;">Lớp:</label>
//                                 <input id="nk-input-lop" list="dl-lop" onchange="ham_20_2_tai_danh_sach_hs_theo_lop()" placeholder="VD: 12TN6..." style="width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; font-weight: bold; color: #0056b3; outline: none;">
//                                 <datalist id="dl-lop"></datalist>
//                             </div>

//                             <!-- Phân môn -->
//                             <div>
//                                 <label style="font-weight: bold; font-size: 13px; color: #6c757d;">Phân môn:</label>
//                                 <input id="nk-input-mon" list="dl-mon" onfocus="this.dataset.old = this.value; this.value='';" onblur="if(!this.value) this.value = this.dataset.old;" placeholder="Chọn / Gõ..." style="width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; outline: none;">
//                                 <datalist id="dl-mon">
//                                     <option value="Đại số"></option>
//                                     <option value="Hình học"></option>
//                                     <option value="Thống kê xác suất"></option>
//                                     <option value="Vật lý"></option>
//                                     <option value="Hóa học"></option>
//                                     <option value="Hoạt động trải nghiệm"></option>
//                                 </datalist>
//                             </div>
//                         </div>
//                     </div>

//                     <!-- 2. NỘI DUNG & ẢNH BẢNG -->
//                     <div style="background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #dee2e6; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
//                         <h4 style="margin: 0 0 15px 0; color: #0056b3;">📝 2. Nội dung bài giảng</h4>
                        
//                         <label style="font-weight: bold; font-size: 13px; color: #495057;">Chủ đề / Lý thuyết:</label>
//                         <textarea placeholder="Ghi chú nhanh lý thuyết đã dạy..." style="width: 100%; padding: 10px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; margin-bottom: 15px; resize: vertical; min-height: 60px; font-family: inherit; outline: none;"></textarea>

//                         <label style="font-weight: bold; font-size: 13px; color: #495057;">Bài tập đã giải & Bài tập về nhà:</label>
//                         <textarea placeholder="VD: Giải BT 1,2 SGK. BTVN: Trắc nghiệm trang 45." style="width: 100%; padding: 10px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; margin-bottom: 15px; resize: vertical; min-height: 60px; font-family: inherit; outline: none;"></textarea>

//                         <label style="font-weight: bold; font-size: 13px; color: #17a2b8; display: block; margin-bottom: 8px;">📸 Lưu ảnh bảng giảng dạy:</label>
//                         <div style="display: flex; gap: 15px; align-items: flex-start;">
//     <!-- Nút bấm gọi Input -->
//     <button type="button" id="btn-tai-anh-bai-giang" onclick="document.getElementById('nk-input-anh-bai-giang').click()" style="padding: 12px 20px; background: #e0f7fa; color: #00838f; border: 1px dashed #00acc1; border-radius: 6px; cursor: pointer; font-weight: bold; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 5px; transition: 0.2s; flex-shrink: 0;">
//         <span style="font-size: 24px;">📷</span>
//         <span>Tải ảnh lên</span>
//     </button>
    
//     <!-- Input ẨN làm nhiệm vụ bật Camera/Thư viện (ID này khớp với Hàm 20.6) -->
//     <input type="file" id="nk-input-anh-bai-giang" accept="image/*" capture="environment" multiple style="display: none;">

//     <!-- Vùng hiển thị ảnh thu nhỏ -->
//     <div id="vung-hien-thi-anh-bang" style="flex: 1; min-height: 70px; border: 1px dashed #ccc; border-radius: 6px; display: flex; align-items: center; justify-content: flex-start; color: #adb5bd; font-size: 13px; font-style: italic; background: #fafafa; padding: 8px; gap: 10px; overflow-x: auto;">
//         <span id="text-cho-anh">(Ảnh chụp bảng bài dạy sẽ xuất hiện tại đây...)</span>
//     </div>
// </div>
//                     </div>

//                     <!-- 3. GHI CHÚ NHẮC VIỆC TIẾT SAU -->
//                     <div style="background: #fff3cd; padding: 20px; border-radius: 8px; border: 1px solid #ffeeba; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
//                         <h4 style="margin: 0 0 10px 0; color: #856404;">📌 3. Dặn dò / Nhắc việc tiết sau</h4>
//                         <textarea placeholder="VD: Tiết sau kiểm tra 15 phút, nhắc hs mang máy tính..." style="width: 100%; padding: 10px; border: 1px solid #f5c6cb; border-radius: 4px; box-sizing: border-box; resize: vertical; min-height: 60px; font-family: inherit; background: #fffcf8; color: #856404; font-weight: bold; outline: none;"></textarea>
//                     </div>
//                 </div>

//                 <!-- CỘT PHẢI: ĐIỂM DANH & SỰ KIỆN HỌC SINH -->
//                 <div style="flex: 1; min-width: 350px; display: flex; flex-direction: column; gap: 20px;">
                    
//                     <!-- 📋 4. ĐIỂM DANH HỌC SINH VẮNG -->
//                     <div style="background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #dee2e6; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
//                         <h4 style="margin: 0 0 15px 0; color: #dc3545;">📋 4. Điểm danh (Học sinh vắng)</h4>
                        
//                         <div id="nk-khu-vuc-diem-danh" style="display: flex; flex-direction: column; margin-bottom: 15px;">
//                             <!-- Dòng nhập liệu đầu tiên -->
//                             <div class="dong-hs-vang" style="display: flex; gap: 8px; align-items: center;">
//                                 <input class="nk-input-hs-vang" list="nk-dl-hs" placeholder="Chọn hoặc gõ tên HS vắng..." style="flex: 1; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; outline: none; font-size: 13px;">
//                                 <button onclick="this.parentElement.remove()" style="padding: 8px 12px; background: #f8d7da; color: #721c24; border: none; border-radius: 4px; cursor: pointer;" title="Xóa dòng này">✖</button>
//                             </div>
//                         </div>
                        
//                         <button onclick="ham_20_12_them_dong_vang()" style="width: 100%; padding: 8px; background: #f8f9fa; border: 1px dashed #dc3545; color: #dc3545; border-radius: 4px; cursor: pointer; font-weight: bold; transition: 0.2s;" onmouseover="this.style.background='#f5c6cb'" onmouseout="this.style.background='#f8f9fa'">
//                             ➕ Thêm học sinh vắng
//                         </button>
//                     </div>

//                     <!-- 🎯 5. GHI NHẬN SỰ KIỆN HỌC SINH -->
//                     <div style="flex: 1; background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #dee2e6; box-shadow: 0 2px 4px rgba(0,0,0,0.05); display: flex; flex-direction: column;">
//                         <h4 style="margin: 0 0 15px 0; color: #d35400;">🎯 5. Ghi nhận sự kiện học sinh</h4>
                        
//                         <div style="margin-bottom: 15px;">
//                             <label style="font-weight: bold; font-size: 13px; color: #495057;">Chọn học sinh:</label>
//                             <!-- Datalist nk-dl-hs được tái sử dụng cho cả điểm danh và sự kiện -->
//                             <input id="nk-input-hs" list="nk-dl-hs" placeholder="Gõ tên để tìm nhanh..." style="width: 100%; padding: 10px; border: 2px solid #fd7e14; border-radius: 6px; box-sizing: border-box; font-weight: bold; outline: none; margin-top: 5px;">
//                             <datalist id="nk-dl-hs"></datalist>
//                         </div>

//                         <div style="margin-bottom: 10px;">
//                             <label style="font-weight: bold; font-size: 13px; color: #495057;">Ghi chú thêm (hoặc nhập lỗi tự do):</label>
//                             <input id="nk-input-ghi-chu" type="text" placeholder="VD: Bấm điện thoại dưới hộc bàn..." style="width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; margin-top: 5px; outline: none;">
//                         </div>

//                         <!-- 🌟 KHU VỰC ẢNH MINH CHỨNG -->
//                         <div style="margin-bottom: 15px; padding: 8px; background: #e9ecef; border-radius: 4px; border: 1px dashed #adb5bd;">
//                             <label style="font-weight: bold; font-size: 12px; color: #495057; display: block; margin-bottom: 5px;">📸 Ảnh minh chứng (Nếu có):</label>
//                             <input type="file" id="nk-input-anh-minh-chung" accept="image/*" capture="environment" multiple style="font-size: 11px; width: 100%; outline: none; margin-bottom: 8px;">
//                             <div id="vung-preview-anh-minh-chung" style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 5px;"></div>
//                             <i style="font-size: 10px; color: #6c757d;">*Có thể chọn ảnh từ máy hoặc chụp trực tiếp bằng điện thoại</i>
//                         </div>

//                         <label style="font-weight: bold; font-size: 13px; color: #495057; margin-bottom: 8px;">Bấm chọn để gắn thẻ nhanh:</label>
                        
//                         <!-- KHU VỰC TAG ĐỘNG -->
//                         <div id="nk-khu-vuc-tags">
//                             <span style="font-size: 12px; color: #999;">⏳ Đang tải danh sách thẻ...</span>
//                         </div>

//                         <!-- Danh sách sự kiện chờ lưu -->
//                         <div style="flex: 1; margin-top: 10px; background: #f8f9fa; border: 1px dashed #ccc; border-radius: 6px; padding: 10px; overflow-y: auto; max-height: 200px;">
//                             <div style="font-size: 12px; font-weight: bold; color: #6c757d; margin-bottom: 10px; border-bottom: 1px solid #eee; padding-bottom: 5px;">Sự kiện chờ lưu (<span id="nk-dem-su-kien">0</span>):</div>
//                             <div id="nk-danh-sach-cho-luu">
//                                 <i style="color: #adb5bd; font-size: 12px;">Chưa có sự kiện nào...</i>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//             <!-- CỤM 2 NÚT LƯU ĐỘC LẬP -->
//             <div style="margin-top: 25px; display: flex; justify-content: flex-end; gap: 15px; border-top: 1px solid #dee2e6; padding-top: 20px;">
//                 <button onclick="ham_20_6a_luu_bai_giang(this)" style="padding: 12px 25px; background: #007bff; color: white; border: none; border-radius: 6px; font-weight: bold; font-size: 14px; cursor: pointer; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: 0.2s;" onmouseover="this.style.background='#0056b3'" onmouseout="this.style.background='#007bff'">
//                     💾 1. LƯU NỘI DUNG BÀI GIẢNG
//                 </button>

//                 <button onclick="ham_20_6b_luu_su_kien_diem_danh(this)" style="padding: 12px 25px; background: #28a745; color: white; border: none; border-radius: 6px; font-weight: bold; font-size: 14px; cursor: pointer; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: 0.2s;" onmouseover="this.style.background='#218838'" onmouseout="this.style.background='#28a745'">
//                     🎯 2. LƯU ĐIỂM DANH & SỰ KIỆN
//                 </button>
//             </div>

//         </div>
//     `;

//     // Gọi hàm tự động tải danh sách lớp và danh sách thẻ ngay khi vẽ xong giao diện
//     if (typeof ham_20_7_tai_danh_sach_lop === 'function') ham_20_7_tai_danh_sach_lop();
//     if (typeof ham_20_8_tai_danh_sach_the === 'function') ham_20_8_tai_danh_sach_the();
//     // 🌟 GỌI HÀM KÍCH HOẠT PREVIEW ẢNH NGAY SAU KHI VẼ HTML XONG
//     if (typeof ham_20_11_kich_hoat_preview_anh === 'function') ham_20_11_kich_hoat_preview_anh();

// };
// // =====================================================================
// // KHỐI 20: TIỆN ÍCH - NHẬT KÝ DẠY HỌC (UI BỐ CỤC CHUẨN)
// // =====================================================================

// window.ham_20_1_mo_giao_dien_nhat_ky_day_hoc = function () {
//     const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
//     if (!vungLamViec) return;

//     const today = new Date().toISOString().split('T')[0];

//     vungLamViec.innerHTML = `
//         <div style="padding: 10px; animation: fadeIn 0.3s ease-in-out;">
            
//             <!-- HEADER & THANH CÔNG CỤ -->
//             <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #17a2b8; padding-bottom: 10px; margin-bottom: 20px;">
//                 <h3 style="color: #17a2b8; margin: 0; text-transform: uppercase; display: flex; align-items: center; gap: 10px;">
//                     📔 Nhật Ký Dạy Học
//                 </h3>
                
//                 <div style="display: flex; gap: 10px;">
//                     <button onclick="ham_20_14_giao_dien_tra_cuu()" style="padding: 6px 15px; background: #ffc107; color: #000; border: 1px solid #d39e00; border-radius: 4px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: 0.2s;">
//     🔍 Tìm lại Nhật ký
// </button>
                    
//                     <button onclick="ham_3_1_ve_dashboard_admin()" style="padding: 6px 15px; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
//                         ⬅️ Quay lại
//                     </button>
//                 </div>
//             </div>

//             <!-- KHỐI 1: THÔNG TIN CHUNG CỦA TIẾT HỌC (DÙNG CHUNG) -->
//             <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border: 1px solid #ced4da; box-shadow: 0 2px 4px rgba(0,0,0,0.02); margin-bottom: 20px;">
//                 <h4 style="margin: 0 0 15px 0; color: #495057;">🕒 1. Thông tin chung của tiết học</h4>
                
//                 <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 15px;">
//                     <!-- Ngày dạy -->
//                     <div>
//                         <label style="font-weight: bold; font-size: 13px; color: #6c757d;">Ngày dạy:</label>
//                         <input type="date" value="${today}" style="width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; font-weight: bold; color: #0056b3; outline: none;">
//                     </div>
                    
//                     <!-- Buổi -->
//                     <div>
//                         <label style="font-weight: bold; font-size: 13px; color: #6c757d;">Buổi:</label>
//                         <input id="nk-input-buoi" list="dl-buoi" onfocus="this.dataset.old = this.value; this.value='';" onblur="if(!this.value) this.value = this.dataset.old;" placeholder="Chọn / Gõ..." style="width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; outline: none;">
//                         <datalist id="dl-buoi">
//                             <option value="Sáng"></option>
//                             <option value="Chiều"></option>
//                             <option value="Tối"></option>
//                         </datalist>
//                     </div>
                    
//                     <!-- Tiết -->
//                     <div>
//                         <label style="font-weight: bold; font-size: 13px; color: #6c757d;">Tiết:</label>
//                         <input id="nk-input-tiet" list="dl-tiet" onfocus="this.dataset.old = this.value; this.value='';" onblur="if(!this.value) this.value = this.dataset.old;" placeholder="Chọn / Gõ..." style="width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; outline: none;">
//                         <datalist id="dl-tiet">
//                             <option value="Tiết 1"></option><option value="Tiết 2"></option>
//                             <option value="Tiết 3"></option><option value="Tiết 4"></option><option value="Tiết 5"></option>
//                         </datalist>
//                     </div>

//                     <!-- Lớp -->
//                     <div>
//                         <label style="font-weight: bold; font-size: 13px; color: #6c757d;">Lớp:</label>
//                         <input id="nk-input-lop" list="dl-lop" onchange="ham_20_2_tai_danh_sach_hs_theo_lop()" placeholder="VD: 12TN6..." style="width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; font-weight: bold; color: #0056b3; outline: none;">
//                         <datalist id="dl-lop"></datalist>
//                         <!-- 🌟 BỔ SUNG LẠI KHO CHỨA DANH SÁCH HỌC SINH VÀO ĐÂY -->
//                         <datalist id="nk-dl-hs"></datalist>

//                     </div>

//                     <!-- Phân môn -->
//                     <div>
//                         <label style="font-weight: bold; font-size: 13px; color: #6c757d;">Phân môn:</label>
//                         <input id="nk-input-mon" list="dl-mon" onfocus="this.dataset.old = this.value; this.value='';" onblur="if(!this.value) this.value = this.dataset.old;" placeholder="Chọn / Gõ..." style="width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; outline: none;">
//                         <datalist id="dl-mon">
//                             <option value="Đại số"></option><option value="Hình học"></option>
//                             <option value="Thống kê xác suất"></option><option value="Hoạt động trải nghiệm"></option>
//                         </datalist>
//                     </div>
//                 </div>
//             </div>

//             <!-- KHU VỰC CHIA CỘT -->
//             <div style="display: flex; gap: 20px; flex-wrap: wrap;">
                
//                 <!-- ============================================== -->
//                 <!-- CỘT TRÁI: BÀI GIẢNG & NÚT LƯU BÀI GIẢNG -->
//                 <!-- ============================================== -->
//                 <div style="flex: 1.5; min-width: 400px; display: flex; flex-direction: column; gap: 20px; background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #dee2e6; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
                    
//                     <div>
//                         <h4 style="margin: 0 0 15px 0; color: #0056b3;">📝 2. Nội dung bài giảng</h4>
                        
//                         <label style="font-weight: bold; font-size: 13px; color: #495057;">Chủ đề / Lý thuyết:</label>
//                         <textarea placeholder="Ghi chú nhanh lý thuyết đã dạy..." style="width: 100%; padding: 10px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; margin-bottom: 15px; resize: vertical; min-height: 60px; font-family: inherit; outline: none;"></textarea>

//                         <label style="font-weight: bold; font-size: 13px; color: #495057;">Bài tập đã giải & Bài tập về nhà:</label>
//                         <textarea placeholder="VD: Giải BT 1,2 SGK. BTVN: Trắc nghiệm trang 45." style="width: 100%; padding: 10px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; margin-bottom: 15px; resize: vertical; min-height: 60px; font-family: inherit; outline: none;"></textarea>

//                         <label style="font-weight: bold; font-size: 13px; color: #17a2b8; display: block; margin-bottom: 8px;">📸 Lưu ảnh bảng giảng dạy:</label>
//                         <div style="display: flex; gap: 15px; align-items: flex-start;">
//                             <button type="button" id="btn-tai-anh-bai-giang" onclick="document.getElementById('nk-input-anh-bai-giang').click()" style="padding: 12px 20px; background: #e0f7fa; color: #00838f; border: 1px dashed #00acc1; border-radius: 6px; cursor: pointer; font-weight: bold; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 5px; transition: 0.2s; flex-shrink: 0;">
//                                 <span style="font-size: 24px;">📷</span>
//                                 <span>Tải ảnh lên</span>
//                             </button>
//                             <input type="file" id="nk-input-anh-bai-giang" accept="image/*" capture="environment" multiple style="display: none;">
//                             <div id="vung-hien-thi-anh-bang" style="flex: 1; min-height: 70px; border: 1px dashed #ccc; border-radius: 6px; display: flex; align-items: center; justify-content: flex-start; color: #adb5bd; font-size: 13px; font-style: italic; background: #fafafa; padding: 8px; gap: 10px; overflow-x: auto;">
//                                 <span id="text-cho-anh">(Ảnh chụp bảng bài dạy sẽ xuất hiện tại đây...)</span>
//                             </div>
//                         </div>
//                     </div>

//                     <div style="background: #fff3cd; padding: 15px; border-radius: 8px; border: 1px solid #ffeeba;">
//                         <h4 style="margin: 0 0 10px 0; color: #856404;">📌 3. Dặn dò / Nhắc việc tiết sau</h4>
//                         <textarea placeholder="VD: Tiết sau kiểm tra 15 phút..." style="width: 100%; padding: 10px; border: 1px solid #f5c6cb; border-radius: 4px; box-sizing: border-box; resize: vertical; min-height: 60px; font-family: inherit; background: #fffcf8; color: #856404; font-weight: bold; outline: none;"></textarea>
//                     </div>

//                     <!-- NÚT LƯU CỘT TRÁI -->
//                     <div style="margin-top: auto; padding-top: 20px; border-top: 1px dashed #dee2e6; text-align: right;">
//                         <button onclick="ham_20_6a_luu_bai_giang(this)" style="padding: 12px 25px; background: #007bff; color: white; border: none; border-radius: 6px; font-weight: bold; font-size: 14px; cursor: pointer; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: 0.2s;" onmouseover="this.style.background='#0056b3'" onmouseout="this.style.background='#007bff'">
//                             💾 1. LƯU NỘI DUNG BÀI GIẢNG
//                         </button>
//                     </div>
//                 </div>

//                 <!-- ============================================== -->
//                 <!-- CỘT PHẢI: ĐIỂM DANH, SỰ KIỆN & NÚT LƯU HỌC SINH-->
//                 <!-- ============================================== -->
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
                            
//                             <!-- Khu vực chứa các ô nhập liệu động -->
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

//                         <div style="margin-bottom: 10px;">
//                             <label style="font-weight: bold; font-size: 13px; color: #495057;">Ghi chú thêm (hoặc nhập tự do):</label>
//                             <input id="nk-input-ghi-chu" type="text" placeholder="VD: Bấm điện thoại dưới hộc bàn..." style="width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; margin-top: 5px; outline: none;">
//                         </div>

//                         <div style="margin-bottom: 15px; padding: 8px; background: #e9ecef; border-radius: 4px; border: 1px dashed #adb5bd;">
//                             <label style="font-weight: bold; font-size: 12px; color: #495057; display: block; margin-bottom: 5px;">📸 Ảnh minh chứng (Nếu có):</label>
//                             <input type="file" id="nk-input-anh-minh-chung" accept="image/*" capture="environment" multiple style="font-size: 11px; width: 100%; outline: none; margin-bottom: 8px;">
//                             <div id="vung-preview-anh-minh-chung" style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 5px;"></div>
//                         </div>

//                         <label style="font-weight: bold; font-size: 13px; color: #495057; margin-bottom: 8px;">Bấm chọn để gắn thẻ nhanh:</label>
//                         <div id="nk-khu-vuc-tags"><span style="font-size: 12px; color: #999;">⏳ Đang tải danh sách thẻ...</span></div>

//                         <div style="flex: 1; margin-top: 10px; background: #f8f9fa; border: 1px dashed #ccc; border-radius: 6px; padding: 10px; overflow-y: auto; max-height: 200px;">
//                             <div style="font-size: 12px; font-weight: bold; color: #6c757d; margin-bottom: 10px; border-bottom: 1px solid #eee; padding-bottom: 5px;">Sự kiện chờ lưu (<span id="nk-dem-su-kien">0</span>):</div>
//                             <div id="nk-danh-sach-cho-luu"><i style="color: #adb5bd; font-size: 12px;">Chưa có sự kiện nào...</i></div>
//                         </div>
//                     </div>

//                     <!-- NÚT LƯU CỘT PHẢI -->
//                     <div style="margin-top: auto; padding-top: 20px; border-top: 1px dashed #dee2e6; text-align: right;">
//                         <button onclick="ham_20_6b_luu_su_kien_diem_danh(this)" style="padding: 12px 25px; background: #28a745; color: white; border: none; border-radius: 6px; font-weight: bold; font-size: 14px; cursor: pointer; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: 0.2s;" onmouseover="this.style.background='#218838'" onmouseout="this.style.background='#28a745'">
//                             🎯 2. LƯU ĐIỂM DANH & SỰ KIỆN
//                         </button>
//                     </div>
//                 </div>

//             </div>
//         </div>
//     `;

//     // Khởi chạy các hàm đi kèm ngay sau khi vẽ xong
//     if (typeof ham_20_7_tai_danh_sach_lop === 'function') ham_20_7_tai_danh_sach_lop();
//     if (typeof ham_20_8_tai_danh_sach_the === 'function') ham_20_8_tai_danh_sach_the();
//     if (typeof ham_20_11_kich_hoat_preview_anh === 'function') ham_20_11_kich_hoat_preview_anh();
// };


// // =====================================================================
// // KHỐI 20: TIỆN ÍCH - NHẬT KÝ DẠY HỌC (GIAO DIỆN)
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
                
//                 <!-- ============================================== -->
//                 <!-- CỘT TRÁI: BÀI GIẢNG -->
//                 <!-- ============================================== -->
//                 <div style="flex: 1.5; min-width: 400px; display: flex; flex-direction: column; gap: 20px; background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #dee2e6; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
                    
//                     <div>
//                         <h4 style="margin: 0 0 15px 0; color: #0056b3;">📝 2. Nội dung bài giảng</h4>
                        
//                         <!-- 🌟 Ô MỚI: Tên bài / Chủ đề -->
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
//                             <input type="file" id="nk-input-anh-bai-giang" accept="image/*" capture="environment" multiple style="display: none;">
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

//                 <!-- ============================================== -->
//                 <!-- CỘT PHẢI: HỌC SINH -->
//                 <!-- ============================================== -->
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
//                         <div style="margin-bottom: 10px;">
//                             <label style="font-weight: bold; font-size: 13px; color: #495057;">Ghi chú thêm (hoặc nhập tự do):</label>
//                             <input id="nk-input-ghi-chu" type="text" placeholder="VD: Bấm điện thoại dưới hộc bàn..." style="width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; margin-top: 5px; outline: none;">
//                         </div>
//                         <div style="margin-bottom: 15px; padding: 8px; background: #e9ecef; border-radius: 4px; border: 1px dashed #adb5bd;">
//                             <label style="font-weight: bold; font-size: 12px; color: #495057; display: block; margin-bottom: 5px;">📸 Ảnh minh chứng (Nếu có):</label>
//                             <input type="file" id="nk-input-anh-minh-chung" accept="image/*" capture="environment" multiple style="font-size: 11px; width: 100%; outline: none; margin-bottom: 8px;">
//                             <div id="vung-preview-anh-minh-chung" style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 5px;"></div>
//                         </div>
//                         <label style="font-weight: bold; font-size: 13px; color: #495057; margin-bottom: 8px;">Bấm chọn để gắn thẻ nhanh:</label>
//                         <div id="nk-khu-vuc-tags"><span style="font-size: 12px; color: #999;">⏳ Đang tải...</span></div>
//                         <div style="flex: 1; margin-top: 10px; background: #f8f9fa; border: 1px dashed #ccc; border-radius: 6px; padding: 10px; overflow-y: auto; max-height: 200px;">
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
// };


// // =====================================================================
// // KHỐI 20: TIỆN ÍCH - NHẬT KÝ DẠY HỌC (GIAO DIỆN)
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
//                             <input type="file" id="nk-input-anh-bai-giang" accept="image/*" capture="environment" multiple style="display: none;">
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
                        
//                         <div style="margin-bottom: 10px;">
//                             <label style="font-weight: bold; font-size: 13px; color: #495057;">Ghi chú thêm (hoặc nhập tự do):</label>
//                             <input id="nk-input-ghi-chu" type="text" placeholder="VD: Bấm điện thoại dưới hộc bàn..." onkeydown="if(event.key === 'Enter') ham_20_3_gan_the('Khác', '#000')" style="width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; margin-top: 5px; outline: none;">
                            
//                             <!-- 🌟 NÚT ĐƯỢC CHUYỂN LÊN ĐÂY -->
//                             <button onclick="ham_20_3_gan_the('Khác', '#000')" style="margin-top: 8px; width: 100%; padding: 8px; font-size: 12px; background: #343a40; border: none; color: #fff; border-radius: 4px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: 0.2s;" onmouseover="this.style.background='#23272b'" onmouseout="this.style.background='#343a40'">
//                                 ➕ Ghi nhận sự kiện từ ô ghi chú này
//                             </button>
//                         </div>

//                         <div style="margin-bottom: 15px; padding: 8px; background: #e9ecef; border-radius: 4px; border: 1px dashed #adb5bd;">
//                             <label style="font-weight: bold; font-size: 12px; color: #495057; display: block; margin-bottom: 5px;">📸 Ảnh minh chứng (Nếu có):</label>
//                             <input type="file" id="nk-input-anh-minh-chung" accept="image/*" capture="environment" multiple style="font-size: 11px; width: 100%; outline: none; margin-bottom: 8px;">
//                             <div id="vung-preview-anh-minh-chung" style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 5px;"></div>
//                         </div>
//                         <label style="font-weight: bold; font-size: 13px; color: #495057; margin-bottom: 8px;">Bấm chọn để gắn thẻ nhanh:</label>
//                         <div id="nk-khu-vuc-tags"><span style="font-size: 12px; color: #999;">⏳ Đang tải...</span></div>
//                         <div style="flex: 1; margin-top: 10px; background: #f8f9fa; border: 1px dashed #ccc; border-radius: 6px; padding: 10px; overflow-y: auto; max-height: 200px;">
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
// };


// =====================================================================
// KHỐI 20: TIỆN ÍCH - NHẬT KÝ DẠY HỌC (GIAO DIỆN CHÍNH)
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
                    <button onclick="ham_20_14_giao_dien_tra_cuu()" style="padding: 6px 15px; background: #ffc107; color: #000; border: 1px solid #d39e00; border-radius: 4px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: 0.2s;">
                        🔍 Tìm lại Nhật ký
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
                        <input type="date" value="${today}" style="width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; font-weight: bold; color: #0056b3; outline: none;">
                    </div>
                    <div>
                        <label style="font-weight: bold; font-size: 13px; color: #6c757d;">Buổi:</label>
                        <input id="nk-input-buoi" list="dl-buoi" onfocus="this.dataset.old = this.value; this.value='';" onblur="if(!this.value) this.value = this.dataset.old;" placeholder="Chọn / Gõ..." style="width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; outline: none;">
                        <datalist id="dl-buoi"><option value="Sáng"></option><option value="Chiều"></option><option value="Tối"></option></datalist>
                    </div>
                    <div>
                        <label style="font-weight: bold; font-size: 13px; color: #6c757d;">Tiết:</label>
                        <input id="nk-input-tiet" list="dl-tiet" onfocus="this.dataset.old = this.value; this.value='';" onblur="if(!this.value) this.value = this.dataset.old;" placeholder="Chọn / Gõ..." style="width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; outline: none;">
                        <datalist id="dl-tiet"><option value="Tiết 1"></option><option value="Tiết 2"></option><option value="Tiết 3"></option><option value="Tiết 4"></option><option value="Tiết 5"></option></datalist>
                    </div>
                    <div>
                        <label style="font-weight: bold; font-size: 13px; color: #6c757d;">Lớp:</label>
                        <input id="nk-input-lop" list="dl-lop" onchange="ham_20_2_tai_danh_sach_hs_theo_lop()" placeholder="VD: 12TN6..." style="width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; font-weight: bold; color: #0056b3; outline: none;">
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
                
                <!-- ============================================== -->
                <!-- CỘT TRÁI: BÀI GIẢNG -->
                <!-- ============================================== -->
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
                        <div style="display: flex; gap: 15px; align-items: flex-start;">
                            <button type="button" id="btn-tai-anh-bai-giang" onclick="document.getElementById('nk-input-anh-bai-giang').click()" style="padding: 12px 20px; background: #e0f7fa; color: #00838f; border: 1px dashed #00acc1; border-radius: 6px; cursor: pointer; font-weight: bold; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 5px; transition: 0.2s; flex-shrink: 0;">
                                <span style="font-size: 24px;">📷</span><span>Tải ảnh lên</span>
                            </button>
                            <input type="file" id="nk-input-anh-bai-giang" accept="image/*" capture="environment" multiple style="display: none;">
                            <div id="vung-hien-thi-anh-bang" style="flex: 1; min-height: 70px; border: 1px dashed #ccc; border-radius: 6px; display: flex; align-items: center; justify-content: flex-start; color: #adb5bd; font-size: 13px; font-style: italic; background: #fafafa; padding: 8px; gap: 10px; overflow-x: auto;">
                                <span id="text-cho-anh">(Ảnh chụp bảng bài dạy sẽ xuất hiện tại đây...)</span>
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

                <!-- ============================================== -->
                <!-- CỘT PHẢI: HỌC SINH -->
                <!-- ============================================== -->
                <div style="flex: 1; min-width: 350px; display: flex; flex-direction: column; gap: 20px; background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #dee2e6; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                    
                    <!-- Khối Điểm Danh Vắng -->
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

                    <!-- Khối Sự Kiện Học Sinh -->
                    <div style="flex: 1; display: flex; flex-direction: column; padding-top: 15px; border-top: 1px dashed #eee;">
                        <h4 style="margin: 0 0 15px 0; color: #d35400;">🎯 5. Ghi nhận sự kiện học sinh</h4>
                        
                        <!-- 1. Chọn học sinh -->
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
                        
                        <!-- 2. Ghi chú -->
                        <div style="margin-bottom: 15px;">
                            <label style="font-weight: bold; font-size: 13px; color: #495057;">Ghi chú thêm (hoặc nhập tự do):</label>
                            <input id="nk-input-ghi-chu" type="text" placeholder="VD: Bấm điện thoại dưới hộc bàn..." onkeydown="if(event.key === 'Enter') ham_20_3_gan_the('Khác', '#000')" style="width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; margin-top: 5px; outline: none;">
                            
                            <button onclick="ham_20_3_gan_the('Khác', '#000')" style="margin-top: 8px; width: 100%; padding: 8px; font-size: 12px; background: #343a40; border: none; color: #fff; border-radius: 4px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: 0.2s;" onmouseover="this.style.background='#23272b'" onmouseout="this.style.background='#343a40'">
                                ➕ Ghi nhận sự kiện từ ô ghi chú này
                            </button>
                        </div>

                        <!-- 3. Khu vực chọn Thẻ (Tags) -->
                        <div style="margin-bottom: 15px;">
                            <label style="font-weight: bold; font-size: 13px; color: #495057; display: block; margin-bottom: 5px;">Bấm chọn để gắn thẻ nhanh:</label>
                            <div id="nk-khu-vuc-tags"><span style="font-size: 12px; color: #999;">⏳ Đang tải...</span></div>
                        </div>

                        <!-- 4. Ảnh minh chứng -->
                        <div style="margin-bottom: 15px; padding: 10px; background: #e9ecef; border-radius: 6px; border: 1px dashed #adb5bd;">
                            <label style="font-weight: bold; font-size: 12px; color: #495057; display: block; margin-bottom: 5px;">📸 Ảnh minh chứng (Nếu có):</label>
                            <input type="file" id="nk-input-anh-minh-chung" accept="image/*" capture="environment" multiple style="font-size: 11px; width: 100%; outline: none; margin-bottom: 8px;">
                            <div id="vung-preview-anh-minh-chung" style="display: flex; gap: 8px; flex-wrap: wrap;"></div>
                        </div>

                        <!-- 5. Khu vực Nhập điểm -->
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

                        <!-- 6. Danh sách sự kiện chờ lưu -->
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




// Biến lưu trữ tạm các sự kiện trên RAM trước khi bấm LƯU vào DB
window.danhSachSuKienTam = [];



// Hàm nhỏ gọn hỗ trợ xóa nếu thầy lỡ tay bấm nhầm tag
window.ham_20_5_xoa_su_kien_tam = function (idTam) {
    danhSachSuKienTam = danhSachSuKienTam.filter(sk => sk.id_tam !== idTam);
    ham_20_4_ve_danh_sach_cho();
};
// // =======================================================
// // HÀM 20.3: XỬ LÝ GẮN THẺ NHANH (HỖ TRỢ ĐA ẢNH)
// // =======================================================
// window.ham_20_3_gan_the = function (tenTag, mauSac) {
//     const inputHS = document.getElementById('nk-input-hs');
//     const inputGhiChu = document.getElementById('nk-input-ghi-chu');
//     const inputAnh = document.getElementById('nk-input-anh-minh-chung');

//     let thongTinHS = inputHS.value.trim();
//     let ghiChu = inputGhiChu.value.trim();

//     // 🌟 Gom toàn bộ ảnh đã chọn vào một mảng
//     let mangFileMinhChung = (inputAnh && inputAnh.files.length > 0) ? Array.from(inputAnh.files) : [];

//     if (!thongTinHS) {
//         alert("Thầy ơi, chọn học sinh trước đã nhé!");
//         inputHS.focus();
//         return;
//     }

//     if (tenTag === 'Khác' && !ghiChu) {
//         alert("Thầy hãy nhập sự kiện vào ô 'Ghi chú thêm' trước khi bấm Thêm tự do ạ!");
//         inputGhiChu.focus();
//         return;
//     }

//     let uidTimDuoc = null;
//     const danhSachOptions = document.querySelectorAll('#nk-dl-hs option');
//     danhSachOptions.forEach(opt => {
//         if (opt.value === thongTinHS) uidTimDuoc = opt.dataset.uid;
//     });

//     let parts = thongTinHS.split(' - ');
//     let tenHienThi = parts[0].trim();
//     let tenDangNhap = parts.length > 1 ? parts[1].trim() : '';

//     let loaiTheLuu = tenTag;
//     if (tenTag === 'Khác') {
//         loaiTheLuu = ghiChu;
//         ghiChu = '';
//     }

//     danhSachSuKienTam.push({
//         uid_hoc_sinh: uidTimDuoc,
//         sdt_hoc_sinh: tenDangNhap,
//         ten_hoc_sinh: tenHienThi,
//         loai_the: loaiTheLuu,
//         ghi_chu: ghiChu,
//         mau_sac: mauSac || '#dc3545',
//         mang_file_minh_chung: mangFileMinhChung, // Lưu mảng file
//         id_tam: Date.now()
//     });

//     // Reset lại giao diện sau khi gắn
//     inputHS.value = '';
//     inputGhiChu.value = '';
//     if (inputAnh) inputAnh.value = '';

//     // Dọn sạch ảnh preview cũ
//     const vungPreviewMC = document.getElementById('vung-preview-anh-minh-chung');
//     if (vungPreviewMC) vungPreviewMC.innerHTML = '';

//     ham_20_4_ve_danh_sach_cho();
// };

// =======================================================
// HÀM 20.3: XỬ LÝ GẮN THẺ NHANH (HỖ TRỢ NHÓM HỌC SINH)
// =======================================================
window.ham_20_3_gan_the = function (tenTag, mauSac) {
    const cacOHsSuKien = document.querySelectorAll('.nk-input-hs-su-kien');
    const inputGhiChu = document.getElementById('nk-input-ghi-chu');
    const inputAnh = document.getElementById('nk-input-anh-minh-chung');

    let ghiChu = inputGhiChu.value.trim();
    let mangFileMinhChung = (inputAnh && inputAnh.files.length > 0) ? Array.from(inputAnh.files) : [];

    // Gom danh sách tất cả học sinh được nhập vào mảng
    let danhSachHSThem = [];
    cacOHsSuKien.forEach(oHS => {
        if (oHS.value.trim()) danhSachHSThem.push(oHS.value.trim());
    });

    if (danhSachHSThem.length === 0) {
        alert("Thầy ơi, hãy chọn ít nhất 1 học sinh trước nhé!");
        if (cacOHsSuKien.length > 0) cacOHsSuKien[0].focus();
        return;
    }

    if (tenTag === 'Khác' && !ghiChu) {
        alert("Thầy hãy nhập sự kiện vào ô 'Ghi chú thêm' trước khi bấm Thêm tự do ạ!");
        inputGhiChu.focus();
        return;
    }

    const danhSachOptions = document.querySelectorAll('#nk-dl-hs option');
    let loaiTheLuu = tenTag === 'Khác' ? ghiChu : tenTag;
    let ghiChuLuu = tenTag === 'Khác' ? '' : ghiChu;

    // Duyệt qua từng học sinh để đẩy vào Danh sách chờ lưu
    danhSachHSThem.forEach((thongTinHS, index) => {
        let uidTimDuoc = null;
        danhSachOptions.forEach(opt => {
            if (opt.value === thongTinHS) uidTimDuoc = opt.dataset.uid;
        });

        let parts = thongTinHS.split(' - ');
        let tenHienThi = parts[0].trim();
        let tenDangNhap = parts.length > 1 ? parts[1].trim() : '';

        danhSachSuKienTam.push({
            uid_hoc_sinh: uidTimDuoc,
            sdt_hoc_sinh: tenDangNhap,
            ten_hoc_sinh: tenHienThi,
            loai_the: loaiTheLuu,
            ghi_chu: ghiChuLuu,
            mau_sac: mauSac || '#dc3545',
            mang_file_minh_chung: mangFileMinhChung, // Dùng chung mảng ảnh minh chứng
            // Sinh ID tạm duy nhất (Tránh lỗi trùng ID khi xóa trong Danh sách chờ)
            id_tam: Date.now() + index + Math.floor(Math.random() * 1000)
        });
    });

    // 🌟 RESET UI SAU KHI GẮN THẺ THÀNH CÔNG
    inputGhiChu.value = '';
    if (inputAnh) inputAnh.value = '';

    const vungPreviewMC = document.getElementById('vung-preview-anh-minh-chung');
    if (vungPreviewMC) vungPreviewMC.innerHTML = '';

    const khuVucHS = document.getElementById('nk-khu-vuc-hs-su-kien');
    if (khuVucHS) {
        khuVucHS.innerHTML = `
            <div class="dong-hs-su-kien" style="display: flex; gap: 8px; align-items: center;">
                <input class="nk-input-hs-su-kien" list="nk-dl-hs" placeholder="Gõ tên để tìm nhanh..." style="flex: 1; padding: 10px; border: 2px solid #fd7e14; border-radius: 6px; box-sizing: border-box; font-weight: bold; outline: none;">
                <button onclick="this.parentElement.remove()" style="padding: 10px 12px; background: #f8d7da; color: #721c24; border: none; border-radius: 6px; cursor: pointer;" title="Xóa dòng này">✖</button>
            </div>
        `;
    }

    // Vẽ lại danh sách chờ
    ham_20_4_ve_danh_sach_cho();
};

// =======================================================
// HÀM 20.4: VẼ LẠI DANH SÁCH CHỜ 
// =======================================================
window.ham_20_4_ve_danh_sach_cho = function () {
    const vungHienThi = document.getElementById('nk-danh-sach-cho-luu');
    const demSoLuong = document.getElementById('nk-dem-su-kien');

    demSoLuong.innerText = danhSachSuKienTam.length;

    if (danhSachSuKienTam.length === 0) {
        vungHienThi.innerHTML = '<i style="color: #adb5bd; font-size: 12px;">Chưa có sự kiện nào...</i>';
        return;
    }

    let html = '';
    danhSachSuKienTam.forEach(sk => {
        let textGhiChu = sk.ghi_chu ? `<br><i style="font-size: 11px; color: #666;">📝 ${sk.ghi_chu}</i>` : '';
        // 🌟 Cập nhật dòng báo số lượng ảnh
        let textAnh = (sk.mang_file_minh_chung && sk.mang_file_minh_chung.length > 0)
            ? `<br><span style="font-size: 11px; color: #fd7e14; font-weight: bold;">📸 Đã đính kèm ${sk.mang_file_minh_chung.length} ảnh</span>`
            : '';

        html += `
            <div style="background: #fff; padding: 8px 10px; border-radius: 4px; border-left: 4px solid ${sk.mau_sac}; box-shadow: 0 1px 2px rgba(0,0,0,0.05); margin-bottom: 8px; display: flex; justify-content: space-between; align-items: flex-start;">
                <div>
                    <b style="font-size: 13px;">${sk.ten_hoc_sinh}</b> 
                    <span style="color: ${sk.mau_sac}; font-weight: bold; font-size: 12px;">[${sk.loai_the}]</span>
                    ${textGhiChu}
                    ${textAnh}
                </div>
                <button onclick="ham_20_5_xoa_su_kien_tam(${sk.id_tam})" style="background: none; border: none; color: #dc3545; cursor: pointer; font-size: 14px;" title="Xóa">🗑️</button>
            </div>
        `;
    });
    vungHienThi.innerHTML = html;
};


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

// // =======================================================
// // HÀM 20.8: TẢI DANH SÁCH THẺ TỪ DB VÀ VẼ RA GIAO DIỆN
// // =======================================================
// window.ham_20_8_tai_danh_sach_the = async function () {
//     const khuVucTags = document.getElementById('nk-khu-vuc-tags');
//     if (!khuVucTags) return;

//     try {
//         const { data: theData, error } = await _supabase
//             .from('cai_dat_the_su_kien')
//             .select('*')
//             .order('ngay_tao', { ascending: true });

//         if (error) throw error;

//         const nhomCauHinh = [
//             { id: 'bai_ve_nha', ten: '🏠 Bài về nhà', mau: '#fd7e14' },
//             { id: 'hoc_bai', ten: '🧠 Học bài ở nhà', mau: '#dc3545' },
//             { id: 'tai_lop', ten: '✍️ Làm bài tại lớp', mau: '#007bff' },
//             { id: 'thai_do', ten: '🎭 Thái độ học tập', mau: '#6f42c1' }
//         ];

//         let html = '<div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 15px;">';

//         nhomCauHinh.forEach(nhom => {
//             html += `<div style="width: 100%; font-size: 11px; font-weight: bold; color: ${nhom.mau}; border-bottom: 1px dashed ${nhom.mau}; padding-bottom: 2px; margin-top: 5px; text-transform: uppercase;">${nhom.ten}</div>`;

//             let theCuaNhom = theData ? theData.filter(t => t.nhom_the === nhom.id) : [];
//             theCuaNhom.forEach(the => {
//                 // Xử lý an toàn nếu tên thẻ có chứa dấu nháy đơn
//                 let tenTheAnToan = the.ten_the.replace(/'/g, "\\'");

//                 // 🌟 Vẽ 1 cụm gồm: [ Nút Tên Thẻ | Nút ✏️ ]
//                 html += `
//                 <div style="display: inline-flex; border: 1px solid ${the.mau_sac}; border-radius: 4px; overflow: hidden; background: #fff;">
//                     <button onclick="ham_20_3_gan_the('${tenTheAnToan}', '${the.mau_sac}')" style="padding: 5px 8px; font-size: 11px; background: transparent; border: none; color: ${the.mau_sac}; cursor: pointer; font-weight: bold;" title="Bấm để gắn thẻ">${the.ten_the}</button>
//                     <button onclick="ham_20_10_quan_ly_tag('${the.id}', '${tenTheAnToan}')" style="padding: 3px 6px; font-size: 10px; background: #f8f9fa; border: none; border-left: 1px dashed ${the.mau_sac}; color: #6c757d; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#e9ecef'" onmouseout="this.style.background='#f8f9fa'" title="Sửa hoặc Xóa thẻ này">✏️</button>
//                 </div>
//                 `;
//             });

//             html += `<button onclick="ham_20_9_them_tag_moi('${nhom.id}', '${nhom.mau}')" style="padding: 5px 10px; font-size: 11px; background: #f8f9fa; border: 1px dashed ${nhom.mau}; color: ${nhom.mau}; border-radius: 4px; cursor: pointer; font-weight: bold; transition: 0.2s;" onmouseover="this.style.background='#e2e6ea'" onmouseout="this.style.background='#f8f9fa'">➕ Thêm tag</button>`;
//         });

//         // ==========================================================
//         // 🌟 TÍNH NĂNG MỚI: KHU VỰC NHẬP ĐIỂM SỐ TRỰC TIẾP
//         // ==========================================================
//         html += `
//         <div style="width: 100%; margin-top: 15px; padding: 10px; background: #e8f5e9; border: 1px dashed #28a745; border-radius: 6px; display: flex; gap: 8px; align-items: center; box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);">
//             <span style="font-size: 16px;" title="Cho điểm học sinh">💯</span>
//             <input type="number" id="nk-input-diem-so" placeholder="Nhập điểm..." step="0.25" min="0" max="10" 
//                 onkeydown="if(event.key === 'Enter') document.getElementById('btn-ghi-diem').click()" 
//                 style="flex: 1; max-width: 120px; padding: 6px 10px; border: 1px solid #28a745; border-radius: 4px; outline: none; font-weight: bold; color: #155724; font-size: 12px;">
//             <button id="btn-ghi-diem" 
//                 onclick="let diem = document.getElementById('nk-input-diem-so').value; if(!diem){alert('Vui lòng nhập điểm!'); return;} ham_20_3_gan_the('Cho điểm: ' + diem + ' đ', '#28a745'); document.getElementById('nk-input-diem-so').value='';" 
//                 style="padding: 6px 15px; font-size: 12px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; transition: 0.2s;" 
//                 onmouseover="this.style.background='#218838'" onmouseout="this.style.background='#28a745'">
//                 Ghi điểm
//             </button>
//         </div>`;

//         html += `<div style="width: 100%; margin-top: 8px; display: flex; gap: 6px;">
//                     <button onclick="ham_20_3_gan_the('Cộng điểm', '#28a745')" style="padding: 5px 10px; font-size: 11px; background: #fff; border: 1px solid #28a745; color: #28a745; border-radius: 4px; cursor: pointer; font-weight: bold;">🌟 Cộng điểm</button>
//                     <button onclick="ham_20_3_gan_the('Khác', '#000')" style="flex: 1; padding: 5px 10px; font-size: 11px; background: #000; border: 1px solid #000; color: #fff; border-radius: 4px; cursor: pointer; font-weight: bold;">➕ Ghi nhận từ ô ghi chú</button>
//                 </div>`;
//         html += '</div>';

//         khuVucTags.innerHTML = html;

//     } catch (err) {
//         console.error("Lỗi tải thẻ:", err);
//         khuVucTags.innerHTML = '<span style="color:red">❌ Lỗi tải danh sách thẻ!</span>';
//     }
// };


// // =======================================================
// // HÀM 20.8: TẢI DANH SÁCH THẺ TỪ DB VÀ VẼ RA GIAO DIỆN
// // =======================================================
// window.ham_20_8_tai_danh_sach_the = async function () {
//     const khuVucTags = document.getElementById('nk-khu-vuc-tags');
//     if (!khuVucTags) return;

//     try {
//         const { data: theData, error } = await _supabase
//             .from('cai_dat_the_su_kien')
//             .select('*')
//             .order('ngay_tao', { ascending: true });

//         if (error) throw error;

//         const nhomCauHinh = [
//             { id: 'bai_ve_nha', ten: '🏠 Bài về nhà', mau: '#fd7e14' },
//             { id: 'hoc_bai', ten: '🧠 Học bài ở nhà', mau: '#dc3545' },
//             { id: 'tai_lop', ten: '✍️ Làm bài tại lớp', mau: '#007bff' },
//             { id: 'thai_do', ten: '🎭 Thái độ học tập', mau: '#6f42c1' }
//         ];

//         let html = '<div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 15px;">';

//         nhomCauHinh.forEach(nhom => {
//             html += `<div style="width: 100%; font-size: 11px; font-weight: bold; color: ${nhom.mau}; border-bottom: 1px dashed ${nhom.mau}; padding-bottom: 2px; margin-top: 5px; text-transform: uppercase;">${nhom.ten}</div>`;

//             let theCuaNhom = theData ? theData.filter(t => t.nhom_the === nhom.id) : [];
//             theCuaNhom.forEach(the => {
//                 let tenTheAnToan = the.ten_the.replace(/'/g, "\\'");

//                 html += `
//                 <div style="display: inline-flex; border: 1px solid ${the.mau_sac}; border-radius: 4px; overflow: hidden; background: #fff;">
//                     <button onclick="ham_20_3_gan_the('${tenTheAnToan}', '${the.mau_sac}')" style="padding: 5px 8px; font-size: 11px; background: transparent; border: none; color: ${the.mau_sac}; cursor: pointer; font-weight: bold;" title="Bấm để gắn thẻ">${the.ten_the}</button>
//                     <button onclick="ham_20_10_quan_ly_tag('${the.id}', '${tenTheAnToan}')" style="padding: 3px 6px; font-size: 10px; background: #f8f9fa; border: none; border-left: 1px dashed ${the.mau_sac}; color: #6c757d; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#e9ecef'" onmouseout="this.style.background='#f8f9fa'" title="Sửa hoặc Xóa thẻ này">✏️</button>
//                 </div>
//                 `;
//             });

//             html += `<button onclick="ham_20_9_them_tag_moi('${nhom.id}', '${nhom.mau}')" style="padding: 5px 10px; font-size: 11px; background: #f8f9fa; border: 1px dashed ${nhom.mau}; color: ${nhom.mau}; border-radius: 4px; cursor: pointer; font-weight: bold; transition: 0.2s;" onmouseover="this.style.background='#e2e6ea'" onmouseout="this.style.background='#f8f9fa'">➕ Thêm tag</button>`;
//         });

//         // KHU VỰC NHẬP ĐIỂM SỐ TRỰC TIẾP
//         html += `
//         <div style="width: 100%; margin-top: 15px; padding: 10px; background: #e8f5e9; border: 1px dashed #28a745; border-radius: 6px; display: flex; gap: 8px; align-items: center; box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);">
//             <span style="font-size: 16px;" title="Cho điểm học sinh">💯</span>
//             <input type="number" id="nk-input-diem-so" placeholder="Nhập điểm..." step="0.25" min="0" max="10" 
//                 onkeydown="if(event.key === 'Enter') document.getElementById('btn-ghi-diem').click()" 
//                 style="flex: 1; max-width: 120px; padding: 6px 10px; border: 1px solid #28a745; border-radius: 4px; outline: none; font-weight: bold; color: #155724; font-size: 12px;">
//             <button id="btn-ghi-diem" 
//                 onclick="let diem = document.getElementById('nk-input-diem-so').value; if(!diem){alert('Vui lòng nhập điểm!'); return;} ham_20_3_gan_the('Cho điểm: ' + diem + ' đ', '#28a745'); document.getElementById('nk-input-diem-so').value='';" 
//                 style="padding: 6px 15px; font-size: 12px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; transition: 0.2s;" 
//                 onmouseover="this.style.background='#218838'" onmouseout="this.style.background='#28a745'">
//                 Nạp điểm xuống khung và chờ lưu sự kiện
//             </button>
//         </div>`;

//         html += `<div style="width: 100%; margin-top: 8px; display: flex; gap: 6px;">
//                     <button onclick="ham_20_3_gan_the('Cộng điểm', '#28a745')" style="padding: 5px 10px; font-size: 11px; background: #fff; border: 1px solid #28a745; color: #28a745; border-radius: 4px; cursor: pointer; font-weight: bold;">🌟 Cộng điểm</button>
//                     <button onclick="ham_20_3_gan_the('Khác', '#000')" style="flex: 1; padding: 5px 10px; font-size: 11px; background: #000; border: 1px solid #000; color: #fff; border-radius: 4px; cursor: pointer; font-weight: bold;">➕ Ghi nhận từ ô ghi chú</button>
//                 </div>`;
//         html += '</div>';

//         khuVucTags.innerHTML = html;

//     } catch (err) {
//         console.error("Lỗi tải thẻ:", err);
//         khuVucTags.innerHTML = '<span style="color:red">❌ Lỗi tải danh sách thẻ!</span>';
//     }
// };


// // =======================================================
// // HÀM 20.8: TẢI DANH SÁCH THẺ TỪ DB VÀ VẼ RA GIAO DIỆN
// // =======================================================
// window.ham_20_8_tai_danh_sach_the = async function () {
//     const khuVucTags = document.getElementById('nk-khu-vuc-tags');
//     if (!khuVucTags) return;

//     try {
//         const { data: theData, error } = await _supabase
//             .from('cai_dat_the_su_kien')
//             .select('*')
//             .order('ngay_tao', { ascending: true });

//         if (error) throw error;

//         const nhomCauHinh = [
//             { id: 'bai_ve_nha', ten: '🏠 Bài về nhà', mau: '#fd7e14' },
//             { id: 'hoc_bai', ten: '🧠 Học bài ở nhà', mau: '#dc3545' },
//             { id: 'tai_lop', ten: '✍️ Làm bài tại lớp', mau: '#007bff' },
//             { id: 'thai_do', ten: '🎭 Thái độ học tập', mau: '#6f42c1' }
//         ];

//         let html = '<div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 15px;">';

//         nhomCauHinh.forEach(nhom => {
//             html += `<div style="width: 100%; font-size: 11px; font-weight: bold; color: ${nhom.mau}; border-bottom: 1px dashed ${nhom.mau}; padding-bottom: 2px; margin-top: 5px; text-transform: uppercase;">${nhom.ten}</div>`;

//             let theCuaNhom = theData ? theData.filter(t => t.nhom_the === nhom.id) : [];
//             theCuaNhom.forEach(the => {
//                 let tenTheAnToan = the.ten_the.replace(/'/g, "\\'");

//                 html += `
//                 <div style="display: inline-flex; border: 1px solid ${the.mau_sac}; border-radius: 4px; overflow: hidden; background: #fff;">
//                     <button onclick="ham_20_3_gan_the('${tenTheAnToan}', '${the.mau_sac}')" style="padding: 5px 8px; font-size: 11px; background: transparent; border: none; color: ${the.mau_sac}; cursor: pointer; font-weight: bold;" title="Bấm để gắn thẻ">${the.ten_the}</button>
//                     <button onclick="ham_20_10_quan_ly_tag('${the.id}', '${tenTheAnToan}')" style="padding: 3px 6px; font-size: 10px; background: #f8f9fa; border: none; border-left: 1px dashed ${the.mau_sac}; color: #6c757d; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#e9ecef'" onmouseout="this.style.background='#f8f9fa'" title="Sửa hoặc Xóa thẻ này">✏️</button>
//                 </div>
//                 `;
//             });

//             html += `<button onclick="ham_20_9_them_tag_moi('${nhom.id}', '${nhom.mau}')" style="padding: 5px 10px; font-size: 11px; background: #f8f9fa; border: 1px dashed ${nhom.mau}; color: ${nhom.mau}; border-radius: 4px; cursor: pointer; font-weight: bold; transition: 0.2s;" onmouseover="this.style.background='#e2e6ea'" onmouseout="this.style.background='#f8f9fa'">➕ Thêm tag</button>`;
//         });

//         // KHU VỰC NHẬP ĐIỂM SỐ TRỰC TIẾP
//         html += `
//         <div style="width: 100%; margin-top: 15px; padding: 10px; background: #e8f5e9; border: 1px dashed #28a745; border-radius: 6px; display: flex; gap: 8px; align-items: center; box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);">
//             <span style="font-size: 16px;" title="Cho điểm học sinh">💯</span>
//             <input type="number" id="nk-input-diem-so" placeholder="Nhập điểm..." step="0.25" min="0" max="10" 
//                 onkeydown="if(event.key === 'Enter') document.getElementById('btn-ghi-diem').click()" 
//                 style="flex: 1; max-width: 120px; padding: 6px 10px; border: 1px solid #28a745; border-radius: 4px; outline: none; font-weight: bold; color: #155724; font-size: 12px;">
//             <button id="btn-ghi-diem" 
//                 onclick="let diem = document.getElementById('nk-input-diem-so').value; if(!diem){alert('Vui lòng nhập điểm!'); return;} ham_20_3_gan_the('Cho điểm: ' + diem + ' đ', '#28a745'); document.getElementById('nk-input-diem-so').value='';" 
//                 style="padding: 6px 15px; font-size: 12px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; transition: 0.2s;" 
//                 onmouseover="this.style.background='#218838'" onmouseout="this.style.background='#28a745'">
//                 Nhập điểm chờ lưu sự kiện
//             </button>
//         </div>`;

//         html += '</div>';

//         khuVucTags.innerHTML = html;

//     } catch (err) {
//         console.error("Lỗi tải thẻ:", err);
//         khuVucTags.innerHTML = '<span style="color:red">❌ Lỗi tải danh sách thẻ!</span>';
//     }
// };


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

// =======================================================
// HÀM 20.11: HIỂN THỊ ẢNH PREVIEW CẢ BÀI GIẢNG & MINH CHỨNG
// =======================================================
window.ham_20_11_kich_hoat_preview_anh = function () {

    // --- 1. XỬ LÝ PREVIEW: ẢNH BÀI GIẢNG ---
    const inputAnhBaiGiang = document.getElementById('nk-input-anh-bai-giang');
    const vungHienThiBG = document.getElementById('vung-hien-thi-anh-bang');
    const btnTaiAnh = document.getElementById('btn-tai-anh-bai-giang');

    if (inputAnhBaiGiang && vungHienThiBG) {
        const newInputBG = inputAnhBaiGiang.cloneNode(true);
        inputAnhBaiGiang.parentNode.replaceChild(newInputBG, inputAnhBaiGiang);

        newInputBG.addEventListener('change', function (event) {
            const files = event.target.files;
            if (files.length > 0) {
                vungHienThiBG.innerHTML = '';
                if (btnTaiAnh) {
                    btnTaiAnh.innerHTML = `<span style="font-size: 24px;">📸</span><span>Đã chọn ${files.length} ảnh</span>`;
                    btnTaiAnh.style.background = '#e8f5e9';
                    btnTaiAnh.style.color = '#2e7d32';
                    btnTaiAnh.style.borderColor = '#4caf50';
                }

                Array.from(files).forEach(file => {
                    let reader = new FileReader();
                    reader.onload = function (e) {
                        let img = document.createElement('img');
                        img.src = e.target.result;
                        img.style.height = '60px';
                        img.style.width = '60px';
                        img.style.objectFit = 'cover';
                        img.style.borderRadius = '4px';
                        img.style.border = '1px solid #00acc1';
                        vungHienThiBG.appendChild(img);
                    }
                    reader.readAsDataURL(file);
                });
            } else {
                vungHienThiBG.innerHTML = '<span id="text-cho-anh">(Ảnh chụp bảng bài dạy sẽ xuất hiện tại đây...)</span>';
                if (btnTaiAnh) {
                    btnTaiAnh.innerHTML = `<span style="font-size: 24px;">📷</span><span>Tải ảnh lên</span>`;
                    btnTaiAnh.style.background = '#e0f7fa';
                    btnTaiAnh.style.color = '#00838f';
                    btnTaiAnh.style.borderColor = '#00acc1';
                }
            }
        });
    }

    // --- 2. XỬ LÝ PREVIEW: ẢNH MINH CHỨNG ---
    const inputAnhMinhChung = document.getElementById('nk-input-anh-minh-chung');
    const vungHienThiMC = document.getElementById('vung-preview-anh-minh-chung');

    if (inputAnhMinhChung && vungHienThiMC) {
        const newInputMC = inputAnhMinhChung.cloneNode(true);
        inputAnhMinhChung.parentNode.replaceChild(newInputMC, inputAnhMinhChung);

        newInputMC.addEventListener('change', function (event) {
            const files = event.target.files;

            // Xóa ảnh cũ (nếu có) mỗi khi chọn lại
            vungHienThiMC.innerHTML = '';

            if (files.length > 0) {
                Array.from(files).forEach(file => {
                    let reader = new FileReader();
                    reader.onload = function (e) {
                        let img = document.createElement('img');
                        img.src = e.target.result;
                        img.style.height = '50px'; // Làm nhỏ hơn ảnh bài giảng 1 chút
                        img.style.width = '50px';
                        img.style.objectFit = 'cover';
                        img.style.borderRadius = '4px';
                        img.style.border = '1px solid #fd7e14'; // Viền cam đồng bộ với khu vực này
                        vungHienThiMC.appendChild(img);
                    }
                    reader.readAsDataURL(file);
                });
            }
        });
    }
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

// // =======================================================
// // HÀM 20.6: LƯU NHẬT KÝ (UP ẢNH BÀI GIẢNG + ẢNH MINH CHỨNG)
// // =======================================================
// window.ham_20_6_luu_nhat_ky = async function () {
//     // 1. Thu thập dữ liệu thông tin chung
//     const ngayDay = document.querySelector('input[type="date"]').value;

//     let rawLop = document.getElementById('nk-input-lop').value.trim();
//     let maLopLuu = rawLop;
//     let match = rawLop.match(/\(([^)]+)\)$/);
//     if (match) maLopLuu = match[1].trim();

//     const buoi = document.getElementById('nk-input-buoi').value.trim();
//     const tiet = document.getElementById('nk-input-tiet').value.trim();
//     const phanMon = document.getElementById('nk-input-mon').value.trim();

//     // Thu thập nội dung text
//     const textAreas = document.querySelectorAll('#vung-lam-viec-chi-tiet textarea');
//     const lyThuyet = textAreas[0].value.trim();
//     const baiTap = textAreas[1].value.trim();
//     const danDo = textAreas[2].value.trim();

//     // 🌟 THU THẬP FILE ẢNH BÀI GIẢNG (Từ thẻ input)
//     // Chú ý: Cần đảm bảo ID này khớp với HTML thẻ input chọn ảnh bài giảng của thầy
//     const inputAnhBaiGiang = document.getElementById('nk-input-anh-bai-giang');
//     const filesBaiGiang = inputAnhBaiGiang ? inputAnhBaiGiang.files : [];

//     // 🌟 CHỐT CHẶN BẢO VỆ DỮ LIỆU
//     if (!ngayDay || !buoi || !tiet || !maLopLuu || !phanMon) {
//         alert("⚠️ Thầy cần chọn/nhập đầy đủ 5 thông tin: Ngày dạy, Buổi, Tiết, Lớp và Phân môn trước khi lưu nhé!");
//         return;
//     }

//     const btnLuu = event.currentTarget;
//     const textGoc = btnLuu.innerHTML;
//     btnLuu.innerHTML = "⏳ ĐANG XỬ LÝ DỮ LIỆU...";
//     btnLuu.disabled = true;

//     try {
//         // Hàm hỗ trợ lọc tên file dùng chung
//         const taoTenAnToan = (chuoi, maxLen = 30) => {
//             if (!chuoi) return "KhongCo";
//             let str = chuoi.toString().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
//             str = str.replace(/[\s/\\:*?"<>|]+/g, '_');
//             if (str.length > maxLen) str = str.substring(0, maxLen);
//             return str.replace(/_$/, '');
//         };

//         // ==========================================================
//         // BƯỚC 1: UPLOAD ẢNH BÀI GIẢNG LÊN DRIVE (NẾU CÓ)
//         // ==========================================================
//         let mangLinkAnhBaiGiang = [];
//         if (filesBaiGiang.length > 0) {
//             for (let j = 0; j < filesBaiGiang.length; j++) {
//                 btnLuu.innerHTML = `⏳ ĐANG TẢI ẢNH BÀI GIẢNG (${j + 1}/${filesBaiGiang.length})...`;

//                 let fileBg = filesBaiGiang[j];
//                 let base64String = await ham_ho_tro_doc_anh_base64(fileBg);

//                 let tenGoc = fileBg.name;
//                 let duoiFile = tenGoc.includes('.') ? tenGoc.substring(tenGoc.lastIndexOf('.')) : '.jpg';
//                 let monLuu = taoTenAnToan(phanMon, 15);

//                 // Cấu trúc tên ảnh bài giảng: Ngay[2026-09-17]_Lop[12TN6]_Buoi[Sang]_Tiet[1]_Mon[DaiSo]_Anh[1].jpg
//                 let tenFileBg = `Ngay[${ngayDay}]_Lop[${maLopLuu}]_Buoi[${taoTenAnToan(buoi, 10)}]_Tiet[${taoTenAnToan(tiet, 10)}]_Mon[${monLuu}]_Anh[${j + 1}]${duoiFile}`;

//                 let payload = {
//                     action: "upload_anh_nhat_ky",
//                     base64: base64String,
//                     mimeType: fileBg.type,
//                     fileName: tenFileBg,
//                     maLop: maLopLuu,
//                     loaiAnh: "ANH_BAI_GIANG" // Drive sẽ tự sinh thư mục ANH_BAI_GIANG
//                 };

//                 let response = await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
//                     method: 'POST',
//                     body: JSON.stringify(payload)
//                 });
//                 let result = await response.json();

//                 if (result.status === 'success') {
//                     mangLinkAnhBaiGiang.push(result.url);
//                 }
//             }
//         }

//         // ==========================================================
//         // BƯỚC 2: LƯU THÔNG TIN NHẬT KÝ VÀO BẢNG 1 (nhat_ky_day_hoc)
//         // ==========================================================
//         btnLuu.innerHTML = "⏳ ĐANG LƯU NHẬT KÝ...";
//         const { data: nhatKyData, error: err1 } = await _supabase
//             .from('nhat_ky_day_hoc')
//             .insert([{
//                 ngay_day: ngayDay,
//                 buoi: buoi,
//                 tiet: tiet,
//                 ma_lop: maLopLuu,
//                 phan_mon: phanMon,
//                 ly_thuyet: lyThuyet,
//                 bai_tap: baiTap,
//                 dan_do: danDo,
//                 danh_sach_anh: mangLinkAnhBaiGiang // Bơm trực tiếp mảng link ảnh vào Supabase
//             }])
//             .select();

//         if (err1) throw err1;
//         const idNhatKy = nhatKyData[0].id;

//         // ==========================================================
//         // BƯỚC 3: XỬ LÝ ẢNH MINH CHỨNG & SỰ KIỆN HỌC SINH (BẢNG 2)
//         // ==========================================================
//         if (danhSachSuKienTam && danhSachSuKienTam.length > 0) {
//             let mangSuKienDB = [];

//             for (let i = 0; i < danhSachSuKienTam.length; i++) {
//                 let sk = danhSachSuKienTam[i];
//                 let mangLinkAnhDrive = []; // 🌟 Khai báo mảng chứa các link ảnh trả về từ Drive

//                 if (sk.mang_file_minh_chung && sk.mang_file_minh_chung.length > 0) {
//                     for (let k = 0; k < sk.mang_file_minh_chung.length; k++) {
//                         let fileMC = sk.mang_file_minh_chung[k];
//                         btnLuu.innerHTML = `⏳ ĐANG TẢI ẢNH MINH CHỨNG HS ${i + 1} (Ảnh ${k + 1}/${sk.mang_file_minh_chung.length})...`;

//                         try {
//                             let base64String = await ham_ho_tro_doc_anh_base64(fileMC);
//                             let tenGoc = fileMC.name;
//                             let duoiFile = tenGoc.includes('.') ? tenGoc.substring(tenGoc.lastIndexOf('.')) : '.jpg';

//                             let tenHsLuu = taoTenAnToan(sk.ten_hoc_sinh, 25);
//                             let theLuu = taoTenAnToan(sk.loai_the, 15);
//                             let tenLoiLuu = taoTenAnToan(sk.ghi_chu, 40);

//                             // Bổ sung thêm _Anh[k+1] để tránh trùng tên khi 1 sự kiện có nhiều ảnh
//                             let tenFileChuan = `Ngay[${ngayDay}]_Lop[${maLopLuu}]_HS[${tenHsLuu}]_The[${theLuu}]_Loi[${tenLoiLuu}]_Anh[${k + 1}]${duoiFile}`;

//                             let payload = {
//                                 action: "upload_anh_nhat_ky",
//                                 base64: base64String,
//                                 mimeType: fileMC.type,
//                                 fileName: tenFileChuan,
//                                 maLop: maLopLuu,
//                                 loaiAnh: "MINH_CHUNG_LOI"
//                             };

//                             let response = await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
//                                 method: 'POST',
//                                 body: JSON.stringify(payload)
//                             });
//                             let result = await response.json();

//                             if (result.status === 'success') {
//                                 mangLinkAnhDrive.push(result.url);
//                             }
//                         } catch (e) {
//                             console.error("Lỗi upload ảnh minh chứng:", e);
//                         }
//                     }
//                 }

//                 let thongTinMoRong = { mau_sac: sk.mau_sac };

//                 // 🌟 Nhét nguyên mảng link ảnh vào thông tin mở rộng của DB
//                 if (mangLinkAnhDrive.length > 0) {
//                     thongTinMoRong.danh_sach_anh_minh_chung = mangLinkAnhDrive;
//                 }

//                 mangSuKienDB.push({
//                     id_nhat_ky: idNhatKy,
//                     uid_hoc_sinh: sk.uid_hoc_sinh,
//                     ten_dang_nhap_hoc_sinh: sk.sdt_hoc_sinh,
//                     ten_hoc_sinh: sk.ten_hoc_sinh,
//                     loai_the: sk.loai_the,
//                     ghi_chu: sk.ghi_chu,
//                     thong_tin_mo_rong: thongTinMoRong
//                 });
//             }

//             btnLuu.innerHTML = "⏳ ĐANG LƯU DỮ LIỆU SỰ KIỆN...";
//             const { error: err2 } = await _supabase
//                 .from('nhat_ky_su_kien_hs')
//                 .insert(mangSuKienDB);

//             if (err2) throw err2;
//         }

//         // ==========================================================
//         // BƯỚC 4: THÀNH CÔNG -> DỌN DẸP GIAO DIỆN
//         // ==========================================================
//         alert("🎉 Đã lưu Nhật ký tiết dạy và Upload ảnh thành công!");

//         textAreas[0].value = '';
//         textAreas[1].value = '';
//         textAreas[2].value = '';

//         document.getElementById('nk-input-buoi').value = '';
//         document.getElementById('nk-input-tiet').value = '';
//         document.getElementById('nk-input-lop').value = '';
//         document.getElementById('nk-input-mon').value = '';
//         document.getElementById('nk-input-hs').value = '';

//         // Xóa ảnh bài giảng và ảnh minh chứng
//         if (inputAnhBaiGiang) inputAnhBaiGiang.value = '';
//         const inputAnhMinhChung = document.getElementById('nk-input-anh-minh-chung');
//         if (inputAnhMinhChung) inputAnhMinhChung.value = '';

//         danhSachSuKienTam = [];
//         if (typeof ham_20_4_ve_danh_sach_cho === 'function') {
//             ham_20_4_ve_danh_sach_cho();
//         }

//     } catch (err) {
//         console.error("Lỗi khi lưu Nhật ký:", err);
//         alert("❌ Có lỗi xảy ra, vui lòng thử lại!");
//     } finally {
//         btnLuu.innerHTML = textGoc;
//         btnLuu.disabled = false;
//     }
// };
// // =======================================================
// // HÀM 20.6: LƯU NHẬT KÝ (NỐI MẢNG SUPABASE & TIMESTAMP TÊN FILE)
// // =======================================================
// window.ham_20_6_luu_nhat_ky = async function () {
//     const ngayDay = document.querySelector('input[type="date"]').value;

//     let rawLop = document.getElementById('nk-input-lop').value.trim();
//     let maLopLuu = rawLop;
//     let match = rawLop.match(/\(([^)]+)\)$/);
//     if (match) maLopLuu = match[1].trim();

//     const buoi = document.getElementById('nk-input-buoi').value.trim();
//     const tiet = document.getElementById('nk-input-tiet').value.trim();
//     const phanMon = document.getElementById('nk-input-mon').value.trim();

//     const textAreas = document.querySelectorAll('#vung-lam-viec-chi-tiet textarea');
//     const lyThuyet = textAreas[0].value.trim();
//     const baiTap = textAreas[1].value.trim();
//     const danDo = textAreas[2].value.trim();

//     const inputAnhBaiGiang = document.getElementById('nk-input-anh-bai-giang');
//     const filesBaiGiang = inputAnhBaiGiang ? inputAnhBaiGiang.files : [];

//     if (!ngayDay || !buoi || !tiet || !maLopLuu || !phanMon) {
//         alert("⚠️ Thầy cần chọn/nhập đầy đủ 5 thông tin: Ngày dạy, Buổi, Tiết, Lớp và Phân môn trước khi lưu nhé!");
//         return;
//     }

//     const btnLuu = event.currentTarget;
//     const textGoc = btnLuu.innerHTML;
//     btnLuu.innerHTML = "⏳ ĐANG XỬ LÝ DỮ LIỆU...";
//     btnLuu.disabled = true;

//     try {
//         const taoTenAnToan = (chuoi, maxLen = 30) => {
//             if (!chuoi) return "KhongCo";
//             let str = chuoi.toString().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
//             str = str.replace(/[\s/\\:*?"<>|]+/g, '_');
//             if (str.length > maxLen) str = str.substring(0, maxLen);
//             return str.replace(/_$/, '');
//         };

//         // 🌟 TẠO TIMESTAMP GIỜ PHÚT GIÂY ĐỂ CHỐNG TRÙNG FILE
//         const now = new Date();
//         const gio = String(now.getHours()).padStart(2, '0');
//         const phut = String(now.getMinutes()).padStart(2, '0');
//         const giay = String(now.getSeconds()).padStart(2, '0');
//         const thoiGianLuu = `${gio}h${phut}m${giay}s`;

//         // ==========================================================
//         // BƯỚC 0: KIỂM TRA LỊCH SỬ LƯU ĐỂ GỘP MẢNG DỮ LIỆU DB
//         // ==========================================================
//         btnLuu.innerHTML = "⏳ ĐANG KIỂM TRA DỮ LIỆU CŨ...";
//         const { data: checkData, error: checkErr } = await _supabase
//             .from('nhat_ky_day_hoc')
//             .select('id, danh_sach_anh')
//             .eq('ngay_day', ngayDay)
//             .eq('ma_lop', maLopLuu)
//             .eq('tiet', tiet);

//         if (checkErr) throw checkErr;

//         let isUpdate = false;
//         let idNhatKy = null;
//         let mangLinkAnhCu = [];

//         if (checkData && checkData.length > 0) {
//             isUpdate = true;
//             idNhatKy = checkData[0].id;

//             let rawAnh = checkData[0].danh_sach_anh;
//             if (Array.isArray(rawAnh)) {
//                 mangLinkAnhCu = rawAnh;
//             } else if (typeof rawAnh === 'string' && rawAnh.length > 5) {
//                 try {
//                     mangLinkAnhCu = JSON.parse(rawAnh);
//                 } catch (e) {
//                     mangLinkAnhCu = rawAnh.split(',').filter(link => link.trim() !== '');
//                 }
//             }
//         }

//         // ==========================================================
//         // BƯỚC 1: UPLOAD ẢNH BÀI GIẢNG
//         // ==========================================================
//         let mangLinkAnhBaiGiang = [];
//         if (filesBaiGiang.length > 0) {
//             for (let j = 0; j < filesBaiGiang.length; j++) {
//                 btnLuu.innerHTML = `⏳ ĐANG TẢI ẢNH BÀI GIẢNG (${j + 1}/${filesBaiGiang.length})...`;

//                 let fileBg = filesBaiGiang[j];
//                 let base64String = await ham_ho_tro_doc_anh_base64(fileBg);

//                 let tenGoc = fileBg.name;
//                 let duoiFile = tenGoc.includes('.') ? tenGoc.substring(tenGoc.lastIndexOf('.')) : '.jpg';
//                 let monLuu = taoTenAnToan(phanMon, 15);

//                 // 🌟 Tên file chèn thêm giờ phút giây. VD: Ngay[2026-09-17_14h30m15s]_...
//                 let tenFileBg = `Ngay[${ngayDay}_${thoiGianLuu}]_Lop[${maLopLuu}]_Buoi[${taoTenAnToan(buoi, 10)}]_Tiet[${taoTenAnToan(tiet, 10)}]_Mon[${monLuu}]_Anh[${j + 1}]${duoiFile}`;

//                 let payload = {
//                     action: "upload_anh_nhat_ky",
//                     base64: base64String,
//                     mimeType: fileBg.type,
//                     fileName: tenFileBg,
//                     maLop: maLopLuu,
//                     loaiAnh: "ANH_BAI_GIANG"
//                 };

//                 let response = await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
//                     method: 'POST',
//                     body: JSON.stringify(payload)
//                 });
//                 let result = await response.json();

//                 if (result.status === 'success') {
//                     mangLinkAnhBaiGiang.push(result.url);
//                 }
//             }
//         }

//         // ==========================================================
//         // BƯỚC 2: LƯU / CẬP NHẬT BẢNG 1
//         // ==========================================================
//         btnLuu.innerHTML = "⏳ ĐANG LƯU NHẬT KÝ...";
//         // Nối mảng ảnh cũ từ Supabase với mảng ảnh vừa đẩy lên thành công
//         let danhSachAnhLuu = mangLinkAnhCu.concat(mangLinkAnhBaiGiang);

//         let payloadDB = {
//             ngay_day: ngayDay,
//             buoi: buoi,
//             tiet: tiet,
//             ma_lop: maLopLuu,
//             phan_mon: phanMon,
//             ly_thuyet: lyThuyet,
//             bai_tap: baiTap,
//             dan_do: danDo,
//             danh_sach_anh: danhSachAnhLuu
//         };

//         if (isUpdate) {
//             const { error: errUpdate } = await _supabase.from('nhat_ky_day_hoc').update(payloadDB).eq('id', idNhatKy);
//             if (errUpdate) throw errUpdate;
//         } else {
//             const { data: nhatKyData, error: errInsert } = await _supabase.from('nhat_ky_day_hoc').insert([payloadDB]).select();
//             if (errInsert) throw errInsert;
//             idNhatKy = nhatKyData[0].id;
//         }

//         // ==========================================================
//         // BƯỚC 3: XỬ LÝ ẢNH MINH CHỨNG
//         // ==========================================================
//         if (danhSachSuKienTam && danhSachSuKienTam.length > 0) {
//             let mangSuKienDB = [];

//             for (let i = 0; i < danhSachSuKienTam.length; i++) {
//                 let sk = danhSachSuKienTam[i];
//                 let mangLinkAnhDrive = [];

//                 // Trích xuất số lượng/link ảnh cũ của học sinh này để gộp (nếu có update)
//                 let mangAnhMcCu = [];
//                 if (isUpdate) {
//                     const { data: mcData } = await _supabase
//                         .from('nhat_ky_su_kien_hs')
//                         .select('thong_tin_mo_rong')
//                         .eq('id_nhat_ky', idNhatKy)
//                         .eq('uid_hoc_sinh', sk.uid_hoc_sinh)
//                         .eq('loai_the', sk.loai_the); // Kiểm tra chính xác loại lỗi đã mắc

//                     if (mcData && mcData.length > 0) {
//                         let dsAnhMC = mcData[0].thong_tin_mo_rong?.danh_sach_anh_minh_chung;
//                         if (Array.isArray(dsAnhMC)) mangAnhMcCu = dsAnhMC;
//                     }
//                 }

//                 if (sk.mang_file_minh_chung && sk.mang_file_minh_chung.length > 0) {
//                     for (let k = 0; k < sk.mang_file_minh_chung.length; k++) {
//                         let fileMC = sk.mang_file_minh_chung[k];
//                         btnLuu.innerHTML = `⏳ ĐANG TẢI ẢNH MINH CHỨNG HS ${i + 1} (Ảnh ${k + 1}/${sk.mang_file_minh_chung.length})...`;

//                         try {
//                             let base64String = await ham_ho_tro_doc_anh_base64(fileMC);
//                             let tenGoc = fileMC.name;
//                             let duoiFile = tenGoc.includes('.') ? tenGoc.substring(tenGoc.lastIndexOf('.')) : '.jpg';

//                             let tenHsLuu = taoTenAnToan(sk.ten_hoc_sinh, 25);
//                             let theLuu = taoTenAnToan(sk.loai_the, 15);
//                             let tenLoiLuu = taoTenAnToan(sk.ghi_chu, 40);

//                             // 🌟 Chèn Timestamp chống trùng cho ảnh minh chứng
//                             let tenFileChuan = `Ngay[${ngayDay}_${thoiGianLuu}]_Lop[${maLopLuu}]_HS[${tenHsLuu}]_The[${theLuu}]_Loi[${tenLoiLuu}]_Anh[${k + 1}]${duoiFile}`;

//                             let payload = {
//                                 action: "upload_anh_nhat_ky",
//                                 base64: base64String,
//                                 mimeType: fileMC.type,
//                                 fileName: tenFileChuan,
//                                 maLop: maLopLuu,
//                                 loaiAnh: "MINH_CHUNG_LOI"
//                             };

//                             let response = await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
//                                 method: 'POST',
//                                 body: JSON.stringify(payload)
//                             });
//                             let result = await response.json();

//                             if (result.status === 'success') mangLinkAnhDrive.push(result.url);
//                         } catch (e) {
//                             console.error("Lỗi upload ảnh minh chứng:", e);
//                         }
//                     }
//                 }

//                 let thongTinMoRong = { mau_sac: sk.mau_sac };

//                 // Trộn ảnh cũ của học sinh này (nếu có) với ảnh mới
//                 let tongHopAnhMC = mangAnhMcCu.concat(mangLinkAnhDrive);
//                 if (tongHopAnhMC.length > 0) {
//                     thongTinMoRong.danh_sach_anh_minh_chung = tongHopAnhMC;
//                 }

//                 mangSuKienDB.push({
//                     id_nhat_ky: idNhatKy,
//                     uid_hoc_sinh: sk.uid_hoc_sinh,
//                     ten_dang_nhap_hoc_sinh: sk.sdt_hoc_sinh,
//                     ten_hoc_sinh: sk.ten_hoc_sinh,
//                     loai_the: sk.loai_the,
//                     ghi_chu: sk.ghi_chu,
//                     thong_tin_mo_rong: thongTinMoRong
//                 });
//             }

//             btnLuu.innerHTML = "⏳ ĐANG LƯU DỮ LIỆU SỰ KIỆN...";
//             const { error: err2 } = await _supabase.from('nhat_ky_su_kien_hs').insert(mangSuKienDB);
//             if (err2) throw err2;
//         }

//         // ==========================================================
//         // BƯỚC 4: THÀNH CÔNG -> DỌN DẸP GIAO DIỆN
//         // ==========================================================
//         alert("🎉 Đã lưu Nhật ký tiết dạy và Upload ảnh thành công!");

//         textAreas[0].value = '';
//         textAreas[1].value = '';
//         textAreas[2].value = '';

//         if (inputAnhBaiGiang) inputAnhBaiGiang.value = '';
//         const inputAnhMinhChung = document.getElementById('nk-input-anh-minh-chung');
//         if (inputAnhMinhChung) inputAnhMinhChung.value = '';

//         // Reset lại mảng tạm và preview ảnh bài giảng nếu thầy có dùng
//         if (typeof window.mangAnhBaiGiangTam !== 'undefined') window.mangAnhBaiGiangTam = [];
//         if (typeof ham_20_11_kich_hoat_preview_anh === 'function') ham_20_11_kich_hoat_preview_anh();

//         danhSachSuKienTam = [];
//         if (typeof ham_20_4_ve_danh_sach_cho === 'function') ham_20_4_ve_danh_sach_cho();

//     } catch (err) {
//         console.error("Lỗi khi lưu Nhật ký:", err);
//         alert("❌ Có lỗi xảy ra, vui lòng thử lại!");
//     } finally {
//         btnLuu.innerHTML = textGoc;
//         btnLuu.disabled = false;
//     }
// };

// // =======================================================
// // HÀM 20.6: LƯU NHẬT KÝ (NỐI TEXT & TIMESTAMP TỪNG FILE)
// // =======================================================
// window.ham_20_6_luu_nhat_ky = async function () {
//     const ngayDay = document.querySelector('input[type="date"]').value;

//     let rawLop = document.getElementById('nk-input-lop').value.trim();
//     let maLopLuu = rawLop;
//     let match = rawLop.match(/\(([^)]+)\)$/);
//     if (match) maLopLuu = match[1].trim();

//     const buoi = document.getElementById('nk-input-buoi').value.trim();
//     const tiet = document.getElementById('nk-input-tiet').value.trim();
//     const phanMon = document.getElementById('nk-input-mon').value.trim();

//     const textAreas = document.querySelectorAll('#vung-lam-viec-chi-tiet textarea');
//     const lyThuyet = textAreas[0].value.trim();
//     const baiTap = textAreas[1].value.trim();
//     const danDo = textAreas[2].value.trim();

//     const inputAnhBaiGiang = document.getElementById('nk-input-anh-bai-giang');
//     const filesBaiGiang = inputAnhBaiGiang ? inputAnhBaiGiang.files : [];

//     if (!ngayDay || !buoi || !tiet || !maLopLuu || !phanMon) {
//         alert("⚠️ Thầy cần chọn/nhập đầy đủ 5 thông tin: Ngày dạy, Buổi, Tiết, Lớp và Phân môn trước khi lưu nhé!");
//         return;
//     }

//     const btnLuu = event.currentTarget;
//     const textGoc = btnLuu.innerHTML;
//     btnLuu.innerHTML = "⏳ ĐANG XỬ LÝ DỮ LIỆU...";
//     btnLuu.disabled = true;

//     try {
//         const taoTenAnToan = (chuoi, maxLen = 30) => {
//             if (!chuoi) return "KhongCo";
//             let str = chuoi.toString().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
//             str = str.replace(/[\s/\\:*?"<>|]+/g, '_');
//             if (str.length > maxLen) str = str.substring(0, maxLen);
//             return str.replace(/_$/, '');
//         };

//         // 🌟 Hàm tạo Timestamp gọi liên tục để lấy thời gian hiện tại cho từng ảnh
//         const layGioPhutGiay = () => {
//             const now = new Date();
//             return `${String(now.getHours()).padStart(2, '0')}h${String(now.getMinutes()).padStart(2, '0')}m${String(now.getSeconds()).padStart(2, '0')}s`;
//         };

//         // ==========================================================
//         // BƯỚC 0: KIỂM TRA LỊCH SỬ LƯU & LẤY NỘI DUNG CŨ ĐỂ NỐI
//         // ==========================================================
//         btnLuu.innerHTML = "⏳ ĐANG KIỂM TRA DỮ LIỆU CŨ...";
//         const { data: checkData, error: checkErr } = await _supabase
//             .from('nhat_ky_day_hoc')
//             .select('id, danh_sach_anh, ly_thuyet, bai_tap, dan_do') // Lấy thêm các trường Text
//             .eq('ngay_day', ngayDay)
//             .eq('ma_lop', maLopLuu)
//             .eq('tiet', tiet);

//         if (checkErr) throw checkErr;

//         let isUpdate = false;
//         let idNhatKy = null;
//         let mangLinkAnhCu = [];

//         let oldLyThuyet = '';
//         let oldBaiTap = '';
//         let oldDanDo = '';

//         if (checkData && checkData.length > 0) {
//             isUpdate = true;
//             idNhatKy = checkData[0].id;

//             // Lấy Text cũ
//             oldLyThuyet = checkData[0].ly_thuyet || '';
//             oldBaiTap = checkData[0].bai_tap || '';
//             oldDanDo = checkData[0].dan_do || '';

//             let rawAnh = checkData[0].danh_sach_anh;
//             if (Array.isArray(rawAnh)) {
//                 mangLinkAnhCu = rawAnh;
//             } else if (typeof rawAnh === 'string' && rawAnh.length > 5) {
//                 try {
//                     mangLinkAnhCu = JSON.parse(rawAnh);
//                 } catch (e) {
//                     mangLinkAnhCu = rawAnh.split(',').filter(link => link.trim() !== '');
//                 }
//             }
//         }

//         // ==========================================================
//         // BƯỚC 1: UPLOAD ẢNH BÀI GIẢNG (TẠO TIMESTAMP ĐỘNG)
//         // ==========================================================
//         let mangLinkAnhBaiGiang = [];
//         if (filesBaiGiang.length > 0) {
//             for (let j = 0; j < filesBaiGiang.length; j++) {
//                 btnLuu.innerHTML = `⏳ ĐANG TẢI ẢNH BÀI GIẢNG (${j + 1}/${filesBaiGiang.length})...`;

//                 let fileBg = filesBaiGiang[j];
//                 let base64String = await ham_ho_tro_doc_anh_base64(fileBg);

//                 let tenGoc = fileBg.name;
//                 let duoiFile = tenGoc.includes('.') ? tenGoc.substring(tenGoc.lastIndexOf('.')) : '.jpg';
//                 let monLuu = taoTenAnToan(phanMon, 15);

//                 // 🌟 Gọi hàm lấy thời gian cho từng ảnh
//                 let tenFileBg = `Ngay[${ngayDay}_${layGioPhutGiay()}]_Lop[${maLopLuu}]_Buoi[${taoTenAnToan(buoi, 10)}]_Tiet[${taoTenAnToan(tiet, 10)}]_Mon[${monLuu}]_Anh[${j + 1}]${duoiFile}`;

//                 let payload = {
//                     action: "upload_anh_nhat_ky",
//                     base64: base64String,
//                     mimeType: fileBg.type,
//                     fileName: tenFileBg,
//                     maLop: maLopLuu,
//                     loaiAnh: "ANH_BAI_GIANG"
//                 };

//                 let response = await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
//                     method: 'POST',
//                     body: JSON.stringify(payload)
//                 });
//                 let result = await response.json();

//                 if (result.status === 'success') {
//                     mangLinkAnhBaiGiang.push(result.url);
//                 }
//             }
//         }

//         // ==========================================================
//         // BƯỚC 2: LƯU / CẬP NHẬT BẢNG 1 (NỐI VĂN BẢN)
//         // ==========================================================
//         btnLuu.innerHTML = "⏳ ĐANG LƯU NHẬT KÝ...";
//         let danhSachAnhLuu = mangLinkAnhCu.concat(mangLinkAnhBaiGiang);

//         // 🌟 Logic xử lý nối Text: Nếu có bài cũ và có gõ thêm bài mới -> Xuống dòng nối thêm. Nếu không thì giữ nguyên.
//         let lyThuyetLuu = (isUpdate && oldLyThuyet && lyThuyet) ? oldLyThuyet + '\n' + lyThuyet : (lyThuyet || oldLyThuyet);
//         let baiTapLuu = (isUpdate && oldBaiTap && baiTap) ? oldBaiTap + '\n' + baiTap : (baiTap || oldBaiTap);
//         let danDoLuu = (isUpdate && oldDanDo && danDo) ? oldDanDo + '\n' + danDo : (danDo || oldDanDo);

//         let payloadDB = {
//             ngay_day: ngayDay,
//             buoi: buoi,
//             tiet: tiet,
//             ma_lop: maLopLuu,
//             phan_mon: phanMon,
//             ly_thuyet: lyThuyetLuu,
//             bai_tap: baiTapLuu,
//             dan_do: danDoLuu,
//             danh_sach_anh: danhSachAnhLuu
//         };

//         if (isUpdate) {
//             const { error: errUpdate } = await _supabase.from('nhat_ky_day_hoc').update(payloadDB).eq('id', idNhatKy);
//             if (errUpdate) throw errUpdate;
//         } else {
//             const { data: nhatKyData, error: errInsert } = await _supabase.from('nhat_ky_day_hoc').insert([payloadDB]).select();
//             if (errInsert) throw errInsert;
//             idNhatKy = nhatKyData[0].id;
//         }

//         // ==========================================================
//         // BƯỚC 3: XỬ LÝ ẢNH MINH CHỨNG (TẠO TIMESTAMP ĐỘNG)
//         // ==========================================================
//         if (danhSachSuKienTam && danhSachSuKienTam.length > 0) {
//             let mangSuKienDB = [];

//             for (let i = 0; i < danhSachSuKienTam.length; i++) {
//                 let sk = danhSachSuKienTam[i];
//                 let mangLinkAnhDrive = [];

//                 let mangAnhMcCu = [];
//                 if (isUpdate) {
//                     const { data: mcData } = await _supabase
//                         .from('nhat_ky_su_kien_hs')
//                         .select('thong_tin_mo_rong')
//                         .eq('id_nhat_ky', idNhatKy)
//                         .eq('uid_hoc_sinh', sk.uid_hoc_sinh)
//                         .eq('loai_the', sk.loai_the);

//                     if (mcData && mcData.length > 0) {
//                         let dsAnhMC = mcData[0].thong_tin_mo_rong?.danh_sach_anh_minh_chung;
//                         if (Array.isArray(dsAnhMC)) mangAnhMcCu = dsAnhMC;
//                     }
//                 }

//                 if (sk.mang_file_minh_chung && sk.mang_file_minh_chung.length > 0) {
//                     for (let k = 0; k < sk.mang_file_minh_chung.length; k++) {
//                         let fileMC = sk.mang_file_minh_chung[k];
//                         btnLuu.innerHTML = `⏳ ĐANG TẢI ẢNH MINH CHỨNG HS ${i + 1} (Ảnh ${k + 1}/${sk.mang_file_minh_chung.length})...`;

//                         try {
//                             let base64String = await ham_ho_tro_doc_anh_base64(fileMC);
//                             let tenGoc = fileMC.name;
//                             let duoiFile = tenGoc.includes('.') ? tenGoc.substring(tenGoc.lastIndexOf('.')) : '.jpg';

//                             let tenHsLuu = taoTenAnToan(sk.ten_hoc_sinh, 25);
//                             let theLuu = taoTenAnToan(sk.loai_the, 15);
//                             let tenLoiLuu = taoTenAnToan(sk.ghi_chu, 40);

//                             // 🌟 Gọi hàm lấy thời gian cho từng ảnh minh chứng
//                             let tenFileChuan = `Ngay[${ngayDay}_${layGioPhutGiay()}]_Lop[${maLopLuu}]_HS[${tenHsLuu}]_The[${theLuu}]_Loi[${tenLoiLuu}]_Anh[${k + 1}]${duoiFile}`;

//                             let payload = {
//                                 action: "upload_anh_nhat_ky",
//                                 base64: base64String,
//                                 mimeType: fileMC.type,
//                                 fileName: tenFileChuan,
//                                 maLop: maLopLuu,
//                                 loaiAnh: "MINH_CHUNG_LOI"
//                             };

//                             let response = await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
//                                 method: 'POST',
//                                 body: JSON.stringify(payload)
//                             });
//                             let result = await response.json();

//                             if (result.status === 'success') mangLinkAnhDrive.push(result.url);
//                         } catch (e) {
//                             console.error("Lỗi upload ảnh minh chứng:", e);
//                         }
//                     }
//                 }

//                 let thongTinMoRong = { mau_sac: sk.mau_sac };

//                 let tongHopAnhMC = mangAnhMcCu.concat(mangLinkAnhDrive);
//                 if (tongHopAnhMC.length > 0) {
//                     thongTinMoRong.danh_sach_anh_minh_chung = tongHopAnhMC;
//                 }

//                 mangSuKienDB.push({
//                     id_nhat_ky: idNhatKy,
//                     uid_hoc_sinh: sk.uid_hoc_sinh,
//                     ten_dang_nhap_hoc_sinh: sk.sdt_hoc_sinh,
//                     ten_hoc_sinh: sk.ten_hoc_sinh,
//                     loai_the: sk.loai_the,
//                     ghi_chu: sk.ghi_chu,
//                     thong_tin_mo_rong: thongTinMoRong
//                 });
//             }

//             btnLuu.innerHTML = "⏳ ĐANG LƯU DỮ LIỆU SỰ KIỆN...";
//             const { error: err2 } = await _supabase.from('nhat_ky_su_kien_hs').insert(mangSuKienDB);
//             if (err2) throw err2;
//         }

//         // ==========================================================
//         // BƯỚC 4: THÀNH CÔNG -> DỌN DẸP GIAO DIỆN
//         // ==========================================================
//         alert("🎉 Đã lưu Nhật ký tiết dạy và Upload ảnh thành công!");

//         textAreas[0].value = '';
//         textAreas[1].value = '';
//         textAreas[2].value = '';

//         if (inputAnhBaiGiang) inputAnhBaiGiang.value = '';
//         const inputAnhMinhChung = document.getElementById('nk-input-anh-minh-chung');
//         if (inputAnhMinhChung) inputAnhMinhChung.value = '';

//         if (typeof window.mangAnhBaiGiangTam !== 'undefined') window.mangAnhBaiGiangTam = [];
//         if (typeof ham_20_11_kich_hoat_preview_anh === 'function') ham_20_11_kich_hoat_preview_anh();

//         danhSachSuKienTam = [];
//         if (typeof ham_20_4_ve_danh_sach_cho === 'function') ham_20_4_ve_danh_sach_cho();

//     } catch (err) {
//         console.error("Lỗi khi lưu Nhật ký:", err);
//         alert("❌ Có lỗi xảy ra, vui lòng thử lại!");
//     } finally {
//         btnLuu.innerHTML = textGoc;
//         btnLuu.disabled = false;
//     }
// };

// // =======================================================
// // HÀM 20.6: LƯU NHẬT KÝ (KẾT HỢP ĐIỂM DANH & SỰ KIỆN)
// // =======================================================
// window.ham_20_6_luu_nhat_ky = async function () {
//     const ngayDay = document.querySelector('input[type="date"]').value;

//     let rawLop = document.getElementById('nk-input-lop').value.trim();
//     let maLopLuu = rawLop;
//     let match = rawLop.match(/\(([^)]+)\)$/);
//     if (match) maLopLuu = match[1].trim();

//     const buoi = document.getElementById('nk-input-buoi').value.trim();
//     const tiet = document.getElementById('nk-input-tiet').value.trim();
//     const phanMon = document.getElementById('nk-input-mon').value.trim();

//     const textAreas = document.querySelectorAll('#vung-lam-viec-chi-tiet textarea');
//     const lyThuyet = textAreas[0].value.trim();
//     const baiTap = textAreas[1].value.trim();
//     const danDo = textAreas[2].value.trim();

//     const inputAnhBaiGiang = document.getElementById('nk-input-anh-bai-giang');
//     const filesBaiGiang = inputAnhBaiGiang ? inputAnhBaiGiang.files : [];

//     if (!ngayDay || !buoi || !tiet || !maLopLuu || !phanMon) {
//         alert("⚠️ Thầy cần chọn/nhập đầy đủ 5 thông tin: Ngày dạy, Buổi, Tiết, Lớp và Phân môn trước khi lưu nhé!");
//         return;
//     }

//     const btnLuu = event.currentTarget;
//     const textGoc = btnLuu.innerHTML;
//     btnLuu.innerHTML = "⏳ ĐANG XỬ LÝ DỮ LIỆU...";
//     btnLuu.disabled = true;

//     try {
//         const taoTenAnToan = (chuoi, maxLen = 30) => {
//             if (!chuoi) return "KhongCo";
//             let str = chuoi.toString().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
//             str = str.replace(/[\s/\\:*?"<>|]+/g, '_');
//             if (str.length > maxLen) str = str.substring(0, maxLen);
//             return str.replace(/_$/, '');
//         };

//         const layGioPhutGiay = () => {
//             const now = new Date();
//             return `${String(now.getHours()).padStart(2, '0')}h${String(now.getMinutes()).padStart(2, '0')}m${String(now.getSeconds()).padStart(2, '0')}s`;
//         };

//         // ==========================================================
//         // BƯỚC 0: KIỂM TRA LỊCH SỬ LƯU & LẤY NỘI DUNG CŨ ĐỂ NỐI
//         // ==========================================================
//         btnLuu.innerHTML = "⏳ ĐANG KIỂM TRA DỮ LIỆU CŨ...";
//         const { data: checkData, error: checkErr } = await _supabase
//             .from('nhat_ky_day_hoc')
//             .select('id, danh_sach_anh, ly_thuyet, bai_tap, dan_do')
//             .eq('ngay_day', ngayDay)
//             .eq('ma_lop', maLopLuu)
//             .eq('tiet', tiet);

//         if (checkErr) throw checkErr;

//         let isUpdate = false;
//         let idNhatKy = null;
//         let mangLinkAnhCu = [];

//         let oldLyThuyet = '';
//         let oldBaiTap = '';
//         let oldDanDo = '';

//         if (checkData && checkData.length > 0) {
//             isUpdate = true;
//             idNhatKy = checkData[0].id;

//             oldLyThuyet = checkData[0].ly_thuyet || '';
//             oldBaiTap = checkData[0].bai_tap || '';
//             oldDanDo = checkData[0].dan_do || '';

//             let rawAnh = checkData[0].danh_sach_anh;
//             if (Array.isArray(rawAnh)) {
//                 mangLinkAnhCu = rawAnh;
//             } else if (typeof rawAnh === 'string' && rawAnh.length > 5) {
//                 try {
//                     mangLinkAnhCu = JSON.parse(rawAnh);
//                 } catch (e) {
//                     mangLinkAnhCu = rawAnh.split(',').filter(link => link.trim() !== '');
//                 }
//             }
//         }

//         // ==========================================================
//         // BƯỚC 1: UPLOAD ẢNH BÀI GIẢNG 
//         // ==========================================================
//         let mangLinkAnhBaiGiang = [];
//         if (filesBaiGiang.length > 0) {
//             for (let j = 0; j < filesBaiGiang.length; j++) {
//                 btnLuu.innerHTML = `⏳ ĐANG TẢI ẢNH BÀI GIẢNG (${j + 1}/${filesBaiGiang.length})...`;

//                 let fileBg = filesBaiGiang[j];
//                 let base64String = await ham_ho_tro_doc_anh_base64(fileBg);
//                 let tenGoc = fileBg.name;
//                 let duoiFile = tenGoc.includes('.') ? tenGoc.substring(tenGoc.lastIndexOf('.')) : '.jpg';
//                 let monLuu = taoTenAnToan(phanMon, 15);

//                 let tenFileBg = `Ngay[${ngayDay}_${layGioPhutGiay()}]_Lop[${maLopLuu}]_Buoi[${taoTenAnToan(buoi, 10)}]_Tiet[${taoTenAnToan(tiet, 10)}]_Mon[${monLuu}]_Anh[${j + 1}]${duoiFile}`;

//                 let payload = {
//                     action: "upload_anh_nhat_ky",
//                     base64: base64String,
//                     mimeType: fileBg.type,
//                     fileName: tenFileBg,
//                     maLop: maLopLuu,
//                     loaiAnh: "ANH_BAI_GIANG"
//                 };

//                 let response = await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
//                     method: 'POST',
//                     body: JSON.stringify(payload)
//                 });
//                 let result = await response.json();

//                 if (result.status === 'success') {
//                     mangLinkAnhBaiGiang.push(result.url);
//                 }
//             }
//         }

//         // ==========================================================
//         // BƯỚC 2: LƯU / CẬP NHẬT BẢNG 1 (NHẬT KÝ CHUNG)
//         // ==========================================================
//         btnLuu.innerHTML = "⏳ ĐANG LƯU NHẬT KÝ...";
//         let danhSachAnhLuu = mangLinkAnhCu.concat(mangLinkAnhBaiGiang);

//         let lyThuyetLuu = (isUpdate && oldLyThuyet && lyThuyet) ? oldLyThuyet + '\n' + lyThuyet : (lyThuyet || oldLyThuyet);
//         let baiTapLuu = (isUpdate && oldBaiTap && baiTap) ? oldBaiTap + '\n' + baiTap : (baiTap || oldBaiTap);
//         let danDoLuu = (isUpdate && oldDanDo && danDo) ? oldDanDo + '\n' + danDo : (danDo || oldDanDo);

//         let payloadDB = {
//             ngay_day: ngayDay,
//             buoi: buoi,
//             tiet: tiet,
//             ma_lop: maLopLuu,
//             phan_mon: phanMon,
//             ly_thuyet: lyThuyetLuu,
//             bai_tap: baiTapLuu,
//             dan_do: danDoLuu,
//             danh_sach_anh: danhSachAnhLuu
//         };

//         if (isUpdate) {
//             const { error: errUpdate } = await _supabase.from('nhat_ky_day_hoc').update(payloadDB).eq('id', idNhatKy);
//             if (errUpdate) throw errUpdate;
//         } else {
//             const { data: nhatKyData, error: errInsert } = await _supabase.from('nhat_ky_day_hoc').insert([payloadDB]).select();
//             if (errInsert) throw errInsert;
//             idNhatKy = nhatKyData[0].id;
//         }

//         // ==========================================================
//         // BƯỚC 3: XỬ LÝ SỰ KIỆN HỌC SINH & ĐIỂM DANH
//         // ==========================================================
//         let mangSuKienDB = [];

//         // 3.1 GOM SỰ KIỆN TỪ DANH SÁCH LỖI / GHI CHÚ
//         if (danhSachSuKienTam && danhSachSuKienTam.length > 0) {
//             for (let i = 0; i < danhSachSuKienTam.length; i++) {
//                 let sk = danhSachSuKienTam[i];
//                 let mangLinkAnhDrive = [];
//                 let mangAnhMcCu = [];

//                 if (isUpdate) {
//                     const { data: mcData } = await _supabase
//                         .from('nhat_ky_su_kien_hs')
//                         .select('thong_tin_mo_rong')
//                         .eq('id_nhat_ky', idNhatKy)
//                         .eq('uid_hoc_sinh', sk.uid_hoc_sinh)
//                         .eq('loai_the', sk.loai_the);

//                     if (mcData && mcData.length > 0) {
//                         let dsAnhMC = mcData[0].thong_tin_mo_rong?.danh_sach_anh_minh_chung;
//                         if (Array.isArray(dsAnhMC)) mangAnhMcCu = dsAnhMC;
//                     }
//                 }

//                 if (sk.mang_file_minh_chung && sk.mang_file_minh_chung.length > 0) {
//                     for (let k = 0; k < sk.mang_file_minh_chung.length; k++) {
//                         let fileMC = sk.mang_file_minh_chung[k];
//                         btnLuu.innerHTML = `⏳ ĐANG TẢI ẢNH MINH CHỨNG HS ${i + 1} (Ảnh ${k + 1}/${sk.mang_file_minh_chung.length})...`;

//                         try {
//                             let base64String = await ham_ho_tro_doc_anh_base64(fileMC);
//                             let tenGoc = fileMC.name;
//                             let duoiFile = tenGoc.includes('.') ? tenGoc.substring(tenGoc.lastIndexOf('.')) : '.jpg';
//                             let tenHsLuu = taoTenAnToan(sk.ten_hoc_sinh, 25);
//                             let theLuu = taoTenAnToan(sk.loai_the, 15);
//                             let tenLoiLuu = taoTenAnToan(sk.ghi_chu, 40);

//                             let tenFileChuan = `Ngay[${ngayDay}_${layGioPhutGiay()}]_Lop[${maLopLuu}]_HS[${tenHsLuu}]_The[${theLuu}]_Loi[${tenLoiLuu}]_Anh[${k + 1}]${duoiFile}`;

//                             let payload = {
//                                 action: "upload_anh_nhat_ky",
//                                 base64: base64String,
//                                 mimeType: fileMC.type,
//                                 fileName: tenFileChuan,
//                                 maLop: maLopLuu,
//                                 loaiAnh: "MINH_CHUNG_LOI"
//                             };

//                             let response = await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
//                                 method: 'POST',
//                                 body: JSON.stringify(payload)
//                             });
//                             let result = await response.json();

//                             if (result.status === 'success') mangLinkAnhDrive.push(result.url);
//                         } catch (e) {
//                             console.error("Lỗi upload ảnh minh chứng:", e);
//                         }
//                     }
//                 }

//                 let thongTinMoRong = { mau_sac: sk.mau_sac };
//                 let tongHopAnhMC = mangAnhMcCu.concat(mangLinkAnhDrive);
//                 if (tongHopAnhMC.length > 0) {
//                     thongTinMoRong.danh_sach_anh_minh_chung = tongHopAnhMC;
//                 }

//                 mangSuKienDB.push({
//                     id_nhat_ky: idNhatKy,
//                     uid_hoc_sinh: sk.uid_hoc_sinh,
//                     ten_dang_nhap_hoc_sinh: sk.sdt_hoc_sinh,
//                     ten_hoc_sinh: sk.ten_hoc_sinh,
//                     loai_the: sk.loai_the,
//                     ghi_chu: sk.ghi_chu,
//                     thong_tin_mo_rong: thongTinMoRong
//                 });
//             }
//         }

//         // 3.2 🌟 GOM DỮ LIỆU ĐIỂM DANH (HỌC SINH VẮNG)
//         const cacOVan = document.querySelectorAll('.nk-input-hs-vang');
//         const danhSachOptions = document.querySelectorAll('#nk-dl-hs option');

//         cacOVan.forEach(oVang => {
//             let thongTinHS = oVang.value.trim();
//             if (thongTinHS) {
//                 // Dò tìm UID dựa trên danh sách sổ xuống
//                 let uidTimDuoc = null;
//                 danhSachOptions.forEach(opt => {
//                     if (opt.value === thongTinHS) uidTimDuoc = opt.dataset.uid;
//                 });

//                 let parts = thongTinHS.split(' - ');
//                 let tenHienThi = parts[0].trim();
//                 let tenDangNhap = parts.length > 1 ? parts[1].trim() : '';

//                 mangSuKienDB.push({
//                     id_nhat_ky: idNhatKy,
//                     uid_hoc_sinh: uidTimDuoc,
//                     ten_dang_nhap_hoc_sinh: tenDangNhap,
//                     ten_hoc_sinh: tenHienThi,
//                     loai_the: 'Vắng mặt', // Mã định danh cố định cho thẻ điểm danh
//                     ghi_chu: 'Vắng mặt trong tiết học',
//                     thong_tin_mo_rong: { mau_sac: '#343a40' } // Nhãn màu đen/xám tối cho học sinh vắng
//                 });
//             }
//         });

//         // 3.3 ĐẨY TOÀN BỘ LÊN SUPABASE
//         if (mangSuKienDB.length > 0) {
//             btnLuu.innerHTML = "⏳ ĐANG LƯU DỮ LIỆU SỰ KIỆN & ĐIỂM DANH...";
//             const { error: err2 } = await _supabase.from('nhat_ky_su_kien_hs').insert(mangSuKienDB);
//             if (err2) throw err2;
//         }

//         // ==========================================================
//         // BƯỚC 4: THÀNH CÔNG -> DỌN DẸP GIAO DIỆN
//         // ==========================================================
//         alert("🎉 Đã lưu Nhật ký tiết dạy và Upload ảnh thành công!");

//         textAreas[0].value = '';
//         textAreas[1].value = '';
//         textAreas[2].value = '';

//         if (inputAnhBaiGiang) inputAnhBaiGiang.value = '';
//         const inputAnhMinhChung = document.getElementById('nk-input-anh-minh-chung');
//         if (inputAnhMinhChung) inputAnhMinhChung.value = '';

//         if (typeof window.mangAnhBaiGiangTam !== 'undefined') window.mangAnhBaiGiangTam = [];
//         if (typeof ham_20_11_kich_hoat_preview_anh === 'function') ham_20_11_kich_hoat_preview_anh();

//         danhSachSuKienTam = [];
//         if (typeof ham_20_4_ve_danh_sach_cho === 'function') ham_20_4_ve_danh_sach_cho();

//         // 🌟 Dọn dẹp khu vực điểm danh, khôi phục 1 dòng trống
//         const khuVucDiemDanh = document.getElementById('nk-khu-vuc-diem-danh');
//         if (khuVucDiemDanh) {
//             khuVucDiemDanh.innerHTML = `
//                 <div class="dong-hs-vang" style="display: flex; gap: 8px; align-items: center;">
//                     <input class="nk-input-hs-vang" list="nk-dl-hs" placeholder="Chọn hoặc gõ tên HS vắng..." style="flex: 1; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; outline: none; font-size: 13px;">
//                     <button onclick="this.parentElement.remove()" style="padding: 8px 12px; background: #f8d7da; color: #721c24; border: none; border-radius: 4px; cursor: pointer;" title="Xóa dòng này">✖</button>
//                 </div>
//             `;
//         }

//     } catch (err) {
//         console.error("Lỗi khi lưu Nhật ký:", err);
//         alert("❌ Có lỗi xảy ra, vui lòng thử lại!");
//     } finally {
//         btnLuu.innerHTML = textGoc;
//         btnLuu.disabled = false;
//     }
// };


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

// // =======================================================
// // HÀM 20.6A: CHỈ LƯU NỘI DUNG BÀI GIẢNG & ẢNH BẢNG
// // =======================================================
// window.ham_20_6a_luu_bai_giang = async function (btnLuu) {
//     const ngayDay = document.querySelector('input[type="date"]').value;
//     let rawLop = document.getElementById('nk-input-lop').value.trim();
//     let maLopLuu = rawLop.match(/\(([^)]+)\)$/) ? rawLop.match(/\(([^)]+)\)$/)[1].trim() : rawLop;
//     const buoi = document.getElementById('nk-input-buoi').value.trim();
//     const tiet = document.getElementById('nk-input-tiet').value.trim();
//     const phanMon = document.getElementById('nk-input-mon').value.trim();

//     const textAreas = document.querySelectorAll('#vung-lam-viec-chi-tiet textarea');
//     const lyThuyet = textAreas[0].value.trim();
//     const baiTap = textAreas[1].value.trim();
//     const danDo = textAreas[2].value.trim();

//     const filesBaiGiang = window.mangAnhBaiGiangTam || (document.getElementById('nk-input-anh-bai-giang') ? document.getElementById('nk-input-anh-bai-giang').files : []);

//     if (!ngayDay || !buoi || !tiet || !maLopLuu || !phanMon) {
//         alert("⚠️ Vui lòng điền đủ: Ngày, Buổi, Tiết, Lớp, Phân môn!");
//         return;
//     }

//     const textGoc = btnLuu.innerHTML;
//     btnLuu.innerHTML = "⏳ ĐANG XỬ LÝ...";
//     btnLuu.disabled = true;

//     try {
//         // 1. Kiểm tra lịch sử
//         const { data: checkData } = await _supabase.from('nhat_ky_day_hoc').select('id, danh_sach_anh, ly_thuyet, bai_tap, dan_do').eq('ngay_day', ngayDay).eq('ma_lop', maLopLuu).eq('tiet', tiet);

//         let isUpdate = false, idNhatKy = null, mangLinkAnhCu = [], oldLyThuyet = '', oldBaiTap = '', oldDanDo = '';
//         if (checkData && checkData.length > 0) {
//             isUpdate = true;
//             idNhatKy = checkData[0].id;
//             oldLyThuyet = checkData[0].ly_thuyet || '';
//             oldBaiTap = checkData[0].bai_tap || '';
//             oldDanDo = checkData[0].dan_do || '';

//             let rawAnh = checkData[0].danh_sach_anh;
//             if (Array.isArray(rawAnh)) mangLinkAnhCu = rawAnh;
//             else if (typeof rawAnh === 'string' && rawAnh.length > 5) {
//                 try { mangLinkAnhCu = JSON.parse(rawAnh); } catch (e) { mangLinkAnhCu = rawAnh.split(',').filter(l => l.trim()); }
//             }
//         }

//         // 2. Upload ảnh
//         let mangLinkAnhBaiGiang = [];
//         if (filesBaiGiang.length > 0) {
//             for (let j = 0; j < filesBaiGiang.length; j++) {
//                 btnLuu.innerHTML = `⏳ ĐANG TẢI ẢNH (${j + 1}/${filesBaiGiang.length})...`;
//                 let fileBg = filesBaiGiang[j];
//                 let base64String = await ham_ho_tro_doc_anh_base64(fileBg);
//                 let duoiFile = fileBg.name.includes('.') ? fileBg.name.substring(fileBg.name.lastIndexOf('.')) : '.jpg';

//                 let tenFileBg = `Ngay[${ngayDay}_${layGioPhutGiay()}]_Lop[${maLopLuu}]_Buoi[${taoTenAnToan(buoi, 10)}]_Tiet[${taoTenAnToan(tiet, 10)}]_Mon[${taoTenAnToan(phanMon, 15)}]_Anh[${j + 1}]${duoiFile}`;

//                 let result = await (await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
//                     method: 'POST', body: JSON.stringify({ action: "upload_anh_nhat_ky", base64: base64String, mimeType: fileBg.type, fileName: tenFileBg, maLop: maLopLuu, loaiAnh: "ANH_BAI_GIANG" })
//                 })).json();
//                 if (result.status === 'success') mangLinkAnhBaiGiang.push(result.url);
//             }
//         }

//         // 3. Cập nhật Text nối đuôi
//         let danhSachAnhLuu = mangLinkAnhCu.concat(mangLinkAnhBaiGiang);
//         let payloadDB = {
//             ngay_day: ngayDay, buoi: buoi, tiet: tiet, ma_lop: maLopLuu, phan_mon: phanMon,
//             ly_thuyet: (isUpdate && oldLyThuyet && lyThuyet) ? oldLyThuyet + '\n' + lyThuyet : (lyThuyet || oldLyThuyet),
//             bai_tap: (isUpdate && oldBaiTap && baiTap) ? oldBaiTap + '\n' + baiTap : (baiTap || oldBaiTap),
//             dan_do: (isUpdate && oldDanDo && danDo) ? oldDanDo + '\n' + danDo : (danDo || oldDanDo),
//             danh_sach_anh: danhSachAnhLuu
//         };

//         if (isUpdate) await _supabase.from('nhat_ky_day_hoc').update(payloadDB).eq('id', idNhatKy);
//         else await _supabase.from('nhat_ky_day_hoc').insert([payloadDB]);

//         alert("✅ Đã lưu xong NỘI DUNG BÀI GIẢNG!");
//         textAreas[0].value = ''; textAreas[1].value = ''; textAreas[2].value = '';
//         if (document.getElementById('nk-input-anh-bai-giang')) document.getElementById('nk-input-anh-bai-giang').value = '';
//         if (typeof window.mangAnhBaiGiangTam !== 'undefined') window.mangAnhBaiGiangTam = [];
//         if (typeof ham_20_11_kich_hoat_preview_anh === 'function') ham_20_11_kich_hoat_preview_anh();

//     } catch (err) {
//         console.error("Lỗi:", err); alert("❌ Lỗi lưu bài giảng!");
//     } finally {
//         btnLuu.innerHTML = textGoc; btnLuu.disabled = false;
//     }
// };

// =======================================================
// HÀM 20.6A: CHỈ LƯU NỘI DUNG BÀI GIẢNG & ẢNH BẢNG
// =======================================================
window.ham_20_6a_luu_bai_giang = async function (btnLuu) {
    const ngayDay = document.querySelector('input[type="date"]').value;
    let rawLop = document.getElementById('nk-input-lop').value.trim();
    let maLopLuu = rawLop.match(/\(([^)]+)\)$/) ? rawLop.match(/\(([^)]+)\)$/)[1].trim() : rawLop;
    const buoi = document.getElementById('nk-input-buoi').value.trim();
    const tiet = document.getElementById('nk-input-tiet').value.trim();
    const phanMon = document.getElementById('nk-input-mon').value.trim();

    // 🌟 Lấy dữ liệu Tên bài và TextAreas
    const tenBai = document.getElementById('nk-input-ten-bai') ? document.getElementById('nk-input-ten-bai').value.trim() : '';
    const textAreas = document.querySelectorAll('#vung-lam-viec-chi-tiet textarea');
    const lyThuyet = textAreas[0].value.trim();
    const baiTap = textAreas[1].value.trim();
    const danDo = textAreas[2].value.trim();

    const filesBaiGiang = window.mangAnhBaiGiangTam || (document.getElementById('nk-input-anh-bai-giang') ? document.getElementById('nk-input-anh-bai-giang').files : []);

    if (!ngayDay || !buoi || !tiet || !maLopLuu) {
        alert("⚠️ Vui lòng điền đủ 4 thông tin: Ngày, Buổi, Tiết, Lớp!");
        return;
    }

    const textGoc = btnLuu.innerHTML;
    btnLuu.innerHTML = "⏳ ĐANG XỬ LÝ...";
    btnLuu.disabled = true;

    try {
        // 🌟 Kéo thêm trường ten_bai về để kiểm tra nối đuôi (nếu lưu nhiều lần)
        const { data: checkData } = await _supabase.from('nhat_ky_day_hoc').select('id, danh_sach_anh, ten_bai, ly_thuyet, bai_tap, dan_do').eq('ngay_day', ngayDay).eq('ma_lop', maLopLuu).eq('tiet', tiet);

        let isUpdate = false, idNhatKy = null, mangLinkAnhCu = [];
        let oldTenBai = '', oldLyThuyet = '', oldBaiTap = '', oldDanDo = '';

        if (checkData && checkData.length > 0) {
            isUpdate = true;
            idNhatKy = checkData[0].id;
            oldTenBai = checkData[0].ten_bai || '';
            oldLyThuyet = checkData[0].ly_thuyet || '';
            oldBaiTap = checkData[0].bai_tap || '';
            oldDanDo = checkData[0].dan_do || '';

            let rawAnh = checkData[0].danh_sach_anh;
            if (Array.isArray(rawAnh)) mangLinkAnhCu = rawAnh;
            else if (typeof rawAnh === 'string' && rawAnh.length > 5) {
                try { mangLinkAnhCu = JSON.parse(rawAnh); } catch (e) { mangLinkAnhCu = rawAnh.split(',').filter(l => l.trim()); }
            }
        }

        let mangLinkAnhBaiGiang = [];
        if (filesBaiGiang.length > 0) {
            for (let j = 0; j < filesBaiGiang.length; j++) {
                btnLuu.innerHTML = `⏳ ĐANG TẢI ẢNH (${j + 1}/${filesBaiGiang.length})...`;
                let fileBg = filesBaiGiang[j];
                let base64String = await ham_ho_tro_doc_anh_base64(fileBg);
                let duoiFile = fileBg.name.includes('.') ? fileBg.name.substring(fileBg.name.lastIndexOf('.')) : '.jpg';

                let tenFileBg = `Ngay[${ngayDay}_${layGioPhutGiay()}]_Lop[${maLopLuu}]_Buoi[${taoTenAnToan(buoi, 10)}]_Tiet[${taoTenAnToan(tiet, 10)}]_Mon[${taoTenAnToan(phanMon, 15)}]_Anh[${j + 1}]${duoiFile}`;

                let result = await (await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
                    method: 'POST', body: JSON.stringify({ action: "upload_anh_nhat_ky", base64: base64String, mimeType: fileBg.type, fileName: tenFileBg, maLop: maLopLuu, loaiAnh: "ANH_BAI_GIANG" })
                })).json();
                if (result.status === 'success') mangLinkAnhBaiGiang.push(result.url);
            }
        }

        let danhSachAnhLuu = mangLinkAnhCu.concat(mangLinkAnhBaiGiang);

        let payloadDB = {
            ngay_day: ngayDay, buoi: buoi, tiet: tiet, ma_lop: maLopLuu, phan_mon: phanMon,
            ten_bai: (isUpdate && oldTenBai && tenBai) ? oldTenBai + '\n' + tenBai : (tenBai || oldTenBai),
            ly_thuyet: (isUpdate && oldLyThuyet && lyThuyet) ? oldLyThuyet + '\n' + lyThuyet : (lyThuyet || oldLyThuyet),
            bai_tap: (isUpdate && oldBaiTap && baiTap) ? oldBaiTap + '\n' + baiTap : (baiTap || oldBaiTap),
            dan_do: (isUpdate && oldDanDo && danDo) ? oldDanDo + '\n' + danDo : (danDo || oldDanDo),
            danh_sach_anh: danhSachAnhLuu
        };

        if (isUpdate) await _supabase.from('nhat_ky_day_hoc').update(payloadDB).eq('id', idNhatKy);
        else await _supabase.from('nhat_ky_day_hoc').insert([payloadDB]);

        alert("✅ Đã lưu xong NỘI DUNG BÀI GIẢNG!");

        if (document.getElementById('nk-input-ten-bai')) document.getElementById('nk-input-ten-bai').value = '';
        textAreas[0].value = ''; textAreas[1].value = ''; textAreas[2].value = '';
        if (document.getElementById('nk-input-anh-bai-giang')) document.getElementById('nk-input-anh-bai-giang').value = '';
        if (typeof window.mangAnhBaiGiangTam !== 'undefined') window.mangAnhBaiGiangTam = [];
        if (typeof ham_20_11_kich_hoat_preview_anh === 'function') ham_20_11_kich_hoat_preview_anh();

    } catch (err) {
        console.error("Lỗi:", err);
        alert("❌ Lỗi lưu bài giảng! Vui lòng kiểm tra xem cột 'ten_bai' đã được tạo trong bảng nhat_ky_day_hoc chưa.");
    } finally {
        btnLuu.innerHTML = textGoc; btnLuu.disabled = false;
    }
};
// // =======================================================
// // HÀM 20.6B: CHỈ LƯU SỰ KIỆN & ĐIỂM DANH (CÓ CHỐNG TRÙNG)
// // =======================================================
// window.ham_20_6b_luu_su_kien_diem_danh = async function (btnLuu) {
//     const ngayDay = document.querySelector('input[type="date"]').value;
//     let rawLop = document.getElementById('nk-input-lop').value.trim();
//     let maLopLuu = rawLop.match(/\(([^)]+)\)$/) ? rawLop.match(/\(([^)]+)\)$/)[1].trim() : rawLop;
//     const buoi = document.getElementById('nk-input-buoi').value.trim();
//     const tiet = document.getElementById('nk-input-tiet').value.trim();
//     const phanMon = document.getElementById('nk-input-mon').value.trim();

//     if (!ngayDay || !buoi || !tiet || !maLopLuu || !phanMon) {
//         alert("⚠️ Vui lòng điền đủ: Ngày, Buổi, Tiết, Lớp, Phân môn trước khi lưu sự kiện!");
//         return;
//     }

//     // Lấy dữ liệu điểm danh
//     const cacOVan = document.querySelectorAll('.nk-input-hs-vang');
//     let coDuLieuDiemDanh = Array.from(cacOVan).some(o => o.value.trim() !== '');

//     if ((!danhSachSuKienTam || danhSachSuKienTam.length === 0) && !coDuLieuDiemDanh) {
//         alert("⚠️ Thầy chưa chọn học sinh vắng hoặc nhập sự kiện nào!");
//         return;
//     }

//     const textGoc = btnLuu.innerHTML;
//     btnLuu.innerHTML = "⏳ ĐANG XỬ LÝ...";
//     btnLuu.disabled = true;

//     try {
//         // 1. Tạo Gốc Bám (Nếu tiết này chưa từng được lưu bài giảng)
//         let idNhatKy = null;
//         const { data: checkData } = await _supabase.from('nhat_ky_day_hoc').select('id').eq('ngay_day', ngayDay).eq('ma_lop', maLopLuu).eq('tiet', tiet);

//         if (checkData && checkData.length > 0) {
//             idNhatKy = checkData[0].id;
//         } else {
//             const { data: nhatKyData } = await _supabase.from('nhat_ky_day_hoc').insert([{
//                 ngay_day: ngayDay, buoi: buoi, tiet: tiet, ma_lop: maLopLuu, phan_mon: phanMon
//             }]).select();
//             idNhatKy = nhatKyData[0].id;
//         }

//         let mangSuKienDB = [];

//         // 🌟 BỘ LỌC KÉP CHỐNG TRÙNG LẶP HỌC SINH VẮNG
//         // A. Kéo danh sách UID "đã vắng mặt" trên DB của tiết này về
//         let uidsDaVangDB = new Set();
//         const { data: vangData } = await _supabase
//             .from('nhat_ky_su_kien_hs')
//             .select('uid_hoc_sinh')
//             .eq('id_nhat_ky', idNhatKy)
//             .eq('loai_the', 'Vắng mặt');

//         if (vangData) {
//             vangData.forEach(row => uidsDaVangDB.add(row.uid_hoc_sinh));
//         }

//         let uidsTrongGiaoDien = new Set(); // Chống trùng khi thầy gõ 2 ô giống nhau
//         let tenCacHSDaTrung = []; // Danh sách tên để hiển thị cảnh báo cho thầy

//         // 2. Gom sự kiện Điểm Danh
//         const danhSachOptions = document.querySelectorAll('#nk-dl-hs option');
//         cacOVan.forEach(oVang => {
//             let thongTinHS = oVang.value.trim();
//             if (thongTinHS) {
//                 let uidTimDuoc = null;
//                 danhSachOptions.forEach(opt => { if (opt.value === thongTinHS) uidTimDuoc = opt.dataset.uid; });

//                 let parts = thongTinHS.split(' - ');
//                 let tenHienThi = parts[0].trim();

//                 if (uidTimDuoc) {
//                     // Kiểm tra xem em này đã bị điểm danh trùng chưa
//                     if (uidsTrongGiaoDien.has(uidTimDuoc) || uidsDaVangDB.has(uidTimDuoc)) {
//                         if (!tenCacHSDaTrung.includes(tenHienThi)) tenCacHSDaTrung.push(tenHienThi);
//                     } else {
//                         // Nếu chưa trùng thì đưa vào mảng lưu & đánh dấu đã xử lý
//                         uidsTrongGiaoDien.add(uidTimDuoc);
//                         mangSuKienDB.push({
//                             id_nhat_ky: idNhatKy, uid_hoc_sinh: uidTimDuoc,
//                             ten_dang_nhap_hoc_sinh: parts[1] ? parts[1].trim() : '',
//                             ten_hoc_sinh: tenHienThi, loai_the: 'Vắng mặt', ghi_chu: 'Vắng mặt trong tiết học',
//                             thong_tin_mo_rong: { mau_sac: '#343a40' }
//                         });
//                     }
//                 }
//             }
//         });

//         // 3. Gom Sự kiện Lỗi & Upload Ảnh Minh Chứng (Giữ nguyên)
//         if (danhSachSuKienTam && danhSachSuKienTam.length > 0) {
//             for (let i = 0; i < danhSachSuKienTam.length; i++) {
//                 let sk = danhSachSuKienTam[i];
//                 let mangLinkAnhDrive = [];
//                 let mangAnhMcCu = [];

//                 const { data: mcData } = await _supabase.from('nhat_ky_su_kien_hs').select('thong_tin_mo_rong').eq('id_nhat_ky', idNhatKy).eq('uid_hoc_sinh', sk.uid_hoc_sinh).eq('loai_the', sk.loai_the);
//                 if (mcData && mcData.length > 0 && Array.isArray(mcData[0].thong_tin_mo_rong?.danh_sach_anh_minh_chung)) {
//                     mangAnhMcCu = mcData[0].thong_tin_mo_rong.danh_sach_anh_minh_chung;
//                 }

//                 if (sk.mang_file_minh_chung && sk.mang_file_minh_chung.length > 0) {
//                     for (let k = 0; k < sk.mang_file_minh_chung.length; k++) {
//                         btnLuu.innerHTML = `⏳ ĐANG TẢI ẢNH HS (${k + 1}/${sk.mang_file_minh_chung.length})...`;
//                         let fileMC = sk.mang_file_minh_chung[k];
//                         let base64String = await ham_ho_tro_doc_anh_base64(fileMC);
//                         let duoiFile = fileMC.name.includes('.') ? fileMC.name.substring(fileMC.name.lastIndexOf('.')) : '.jpg';

//                         let tenFileChuan = `Ngay[${ngayDay}_${layGioPhutGiay()}]_Lop[${maLopLuu}]_HS[${taoTenAnToan(sk.ten_hoc_sinh, 25)}]_The[${taoTenAnToan(sk.loai_the, 15)}]_Anh[${k + 1}]${duoiFile}`;

//                         let result = await (await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
//                             method: 'POST', body: JSON.stringify({ action: "upload_anh_nhat_ky", base64: base64String, mimeType: fileMC.type, fileName: tenFileChuan, maLop: maLopLuu, loaiAnh: "MINH_CHUNG_LOI" })
//                         })).json();
//                         if (result.status === 'success') mangLinkAnhDrive.push(result.url);
//                     }
//                 }

//                 let thongTinMoRong = { mau_sac: sk.mau_sac };
//                 let tongHopAnhMC = mangAnhMcCu.concat(mangLinkAnhDrive);
//                 if (tongHopAnhMC.length > 0) thongTinMoRong.danh_sach_anh_minh_chung = tongHopAnhMC;

//                 mangSuKienDB.push({
//                     id_nhat_ky: idNhatKy, uid_hoc_sinh: sk.uid_hoc_sinh, ten_dang_nhap_hoc_sinh: sk.sdt_hoc_sinh,
//                     ten_hoc_sinh: sk.ten_hoc_sinh, loai_the: sk.loai_the, ghi_chu: sk.ghi_chu, thong_tin_mo_rong: thongTinMoRong
//                 });
//             }
//         }

//         // 4. Đẩy toàn bộ lên Supabase
//         if (mangSuKienDB.length > 0) {
//             btnLuu.innerHTML = "⏳ ĐANG LƯU SỰ KIỆN...";
//             await _supabase.from('nhat_ky_su_kien_hs').insert(mangSuKienDB);
//         }

//         // 🌟 Tùy biến thông báo thành công
//         let msg = "✅ Đã lưu xong ĐIỂM DANH & SỰ KIỆN!";
//         if (tenCacHSDaTrung.length > 0) {
//             msg += `\n\n⚠️ Hệ thống đã TỰ ĐỘNG BỎ QUA đăng ký trùng cho các em:\n👉 ${tenCacHSDaTrung.join(', ')}\n(Các em này đã được điểm danh vắng từ trước).`;
//         }
//         alert(msg);

//         // Dọn dẹp Cột Phải
//         if (document.getElementById('nk-input-anh-minh-chung')) document.getElementById('nk-input-anh-minh-chung').value = '';
//         danhSachSuKienTam = [];
//         if (typeof ham_20_4_ve_danh_sach_cho === 'function') ham_20_4_ve_danh_sach_cho();
//         if (document.getElementById('nk-khu-vuc-diem-danh')) document.getElementById('nk-khu-vuc-diem-danh').innerHTML = `
//             <div class="dong-hs-vang" style="display: flex; gap: 8px; align-items: center;">
//                 <input class="nk-input-hs-vang" list="nk-dl-hs" placeholder="Chọn hoặc gõ tên HS vắng..." style="flex: 1; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; outline: none; font-size: 13px;">
//                 <button onclick="this.parentElement.remove()" style="padding: 8px 12px; background: #f8d7da; color: #721c24; border: none; border-radius: 4px; cursor: pointer;" title="Xóa dòng này">✖</button>
//             </div>`;

//     } catch (err) {
//         console.error("Lỗi:", err); alert("❌ Lỗi lưu Sự kiện!");
//     } finally {
//         btnLuu.innerHTML = textGoc; btnLuu.disabled = false;
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
    btnLuu.innerHTML = "⏳ ĐANG XỬ LÝ...";
    btnLuu.disabled = true;

    try {
        let idNhatKy = null;
        const { data: checkData } = await _supabase.from('nhat_ky_day_hoc').select('id').eq('ngay_day', ngayDay).eq('ma_lop', maLopLuu).eq('tiet', tiet);

        if (checkData && checkData.length > 0) {
            idNhatKy = checkData[0].id;
        } else {
            const { data: nhatKyData } = await _supabase.from('nhat_ky_day_hoc').insert([{
                ngay_day: ngayDay, buoi: buoi, tiet: tiet, ma_lop: maLopLuu, phan_mon: phanMon
            }]).select();
            idNhatKy = nhatKyData[0].id;
        }

        let mangSuKienDB = [];
        let uidsDaVangDB = new Set();
        const { data: vangData } = await _supabase.from('nhat_ky_su_kien_hs').select('uid_hoc_sinh').eq('id_nhat_ky', idNhatKy).eq('loai_the', 'Vắng mặt');
        if (vangData) vangData.forEach(row => uidsDaVangDB.add(row.uid_hoc_sinh));

        let uidsTrongGiaoDien = new Set();
        let tenCacHSDaTrung = [];

        // Gom Điểm Danh
        const danhSachOptions = document.querySelectorAll('#nk-dl-hs option');
        cacOVan.forEach(oVang => {
            let thongTinHS = oVang.value.trim();
            if (thongTinHS) {
                let uidTimDuoc = null;
                danhSachOptions.forEach(opt => { if (opt.value === thongTinHS) uidTimDuoc = opt.dataset.uid; });

                let parts = thongTinHS.split(' - ');
                let tenHienThi = parts[0].trim();

                if (uidTimDuoc) {
                    if (uidsTrongGiaoDien.has(uidTimDuoc) || uidsDaVangDB.has(uidTimDuoc)) {
                        if (!tenCacHSDaTrung.includes(tenHienThi)) tenCacHSDaTrung.push(tenHienThi);
                    } else {
                        uidsTrongGiaoDien.add(uidTimDuoc);
                        mangSuKienDB.push({
                            id_nhat_ky: idNhatKy, uid_hoc_sinh: uidTimDuoc,
                            ten_dang_nhap_hoc_sinh: parts[1] ? parts[1].trim() : '',
                            ten_hoc_sinh: tenHienThi, loai_the: 'Vắng mặt', ghi_chu: 'Vắng mặt trong tiết học',
                            thong_tin_mo_rong: { mau_sac: '#343a40' }
                        });
                    }
                }
            }
        });

        // Gom Sự kiện & Cho điểm
        if (danhSachSuKienTam && danhSachSuKienTam.length > 0) {
            for (let i = 0; i < danhSachSuKienTam.length; i++) {
                let sk = danhSachSuKienTam[i];
                let mangLinkAnhDrive = [];
                let mangAnhMcCu = [];

                if (sk.mang_file_minh_chung && sk.mang_file_minh_chung.length > 0) {
                    for (let k = 0; k < sk.mang_file_minh_chung.length; k++) {
                        btnLuu.innerHTML = `⏳ ĐANG TẢI ẢNH (${k + 1}/${sk.mang_file_minh_chung.length})...`;
                        let fileMC = sk.mang_file_minh_chung[k];
                        let base64String = await ham_ho_tro_doc_anh_base64(fileMC);
                        let duoiFile = fileMC.name.includes('.') ? fileMC.name.substring(fileMC.name.lastIndexOf('.')) : '.jpg';

                        let tenFileChuan = `Ngay[${ngayDay}_${layGioPhutGiay()}]_Lop[${maLopLuu}]_HS[${taoTenAnToan(sk.ten_hoc_sinh, 25)}]_The[${taoTenAnToan(sk.loai_the, 15)}]_Anh[${k + 1}]${duoiFile}`;

                        let result = await (await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
                            method: 'POST', body: JSON.stringify({ action: "upload_anh_nhat_ky", base64: base64String, mimeType: fileMC.type, fileName: tenFileChuan, maLop: maLopLuu, loaiAnh: "MINH_CHUNG_LOI" })
                        })).json();
                        if (result.status === 'success') mangLinkAnhDrive.push(result.url);
                    }
                }

                let thongTinMoRong = { mau_sac: sk.mau_sac };
                if (sk.diem_so) thongTinMoRong.diem_so = sk.diem_so; // 🌟 Lưu điểm số vào JSON mở rộng

                mangSuKienDB.push({
                    id_nhat_ky: idNhatKy,
                    uid_hoc_sinh: sk.uid_hoc_sinh,
                    ten_dang_nhap_hoc_sinh: sk.sdt_hoc_sinh,
                    ten_hoc_sinh: sk.ten_hoc_sinh,
                    loai_the: sk.loai_the,
                    ghi_chu: sk.ghi_chu,
                    thong_tin_mo_rong: thongTinMoRong
                });
            }
        }

        if (mangSuKienDB.length > 0) {
            btnLuu.innerHTML = "⏳ ĐANG LƯU DỮ LIỆU...";
            await _supabase.from('nhat_ky_su_kien_hs').insert(mangSuKienDB);
        }

        alert("✅ Đã lưu xong ĐIỂM DANH, CHO ĐIỂM & SỰ KIỆN!");

        if (document.getElementById('nk-input-anh-minh-chung')) document.getElementById('nk-input-anh-minh-chung').value = '';
        danhSachSuKienTam = [];
        if (typeof ham_20_4_ve_danh_sach_cho === 'function') ham_20_4_ve_danh_sach_cho();

        // Reset form
        if (document.getElementById('nk-khu-vuc-diem-danh')) document.getElementById('nk-khu-vuc-diem-danh').innerHTML = `
            <div class="dong-hs-vang" style="display: flex; gap: 8px; align-items: center;">
                <input class="nk-input-hs-vang" list="nk-dl-hs" placeholder="Chọn hoặc gõ tên HS vắng..." style="flex: 1; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; outline: none; font-size: 13px;">
                <button onclick="this.parentElement.remove()" style="padding: 8px 12px; background: #f8d7da; color: #721c24; border: none; border-radius: 4px; cursor: pointer;">✖</button>
            </div>`;

    } catch (err) {
        console.error("Lỗi:", err); alert("❌ Lỗi lưu dữ liệu!");
    } finally {
        btnLuu.innerHTML = textGoc; btnLuu.disabled = false;
    }
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


// // =======================================================
// // HÀM 20.15: THỰC HIỆN TRUY VẤN VÀ VẼ TIMELINE NHẬT KÝ
// // =======================================================
// window.ham_20_15_thuc_hien_tra_cuu = async function (btnLoc) {
//     const vungKetQua = document.getElementById('tc-khu-vuc-ket-qua');

//     let tuNgay = document.getElementById('tc-tu-ngay').value;
//     let denNgay = document.getElementById('tc-den-ngay').value;

//     let rawMon = document.getElementById('tc-input-mon').value.trim();
//     let rawLop = document.getElementById('tc-input-lop').value.trim();
//     let maLopLuu = rawLop.match(/\(([^)]+)\)$/) ? rawLop.match(/\(([^)]+)\)$/)[1].trim() : rawLop;

//     let rawHS = document.getElementById('tc-input-hs').value.trim();
//     let tenHsTimKiem = rawHS.split(' - ')[0].trim().toLowerCase();

//     let isTimHocSinh = tenHsTimKiem !== '';

//     if (!tuNgay || !denNgay) {
//         alert("⚠️ Vui lòng chọn đủ mốc thời gian Từ ngày - Đến ngày!");
//         return;
//     }

//     const textGoc = btnLoc.innerHTML;
//     btnLoc.innerHTML = "⏳ ĐANG TÌM KIẾM...";
//     btnLoc.disabled = true;
//     vungKetQua.innerHTML = `<div style="text-align: center; color: #007bff; padding: 20px;"><b>⏳ Đang tải dữ liệu từ máy chủ...</b></div>`;

//     try {
//         const taoLinkAnhPreview = (url) => {
//             if (!url) return '';
//             let fileId = '';
//             let matchD = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
//             let matchId = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
//             let matchOpen = url.match(/\/open\?id=([a-zA-Z0-9_-]+)/);
//             if (matchD) fileId = matchD[1];
//             else if (matchId) fileId = matchId[1];
//             else if (matchOpen) fileId = matchOpen[1];
//             return fileId ? `https://lh3.googleusercontent.com/d/${fileId}` : url;
//         };

//         // 1. KÉO DỮ LIỆU NHẬT KÝ
//         let queryNhatKy = _supabase.from('nhat_ky_day_hoc').select('*').gte('ngay_day', tuNgay).lte('ngay_day', denNgay).order('ngay_day', { ascending: false }).order('tiet', { ascending: true });
//         if (maLopLuu) queryNhatKy = queryNhatKy.eq('ma_lop', maLopLuu);
//         if (rawMon) queryNhatKy = queryNhatKy.ilike('phan_mon', `%${rawMon}%`);

//         let { data: dsNhatKy, error: err1 } = await queryNhatKy;
//         if (err1) throw err1;

//         if (!dsNhatKy || dsNhatKy.length === 0) {
//             vungKetQua.innerHTML = `<div style="text-align: center; color: #dc3545; padding: 20px;"><b>Không tìm thấy tiết dạy nào khớp với bộ lọc!</b></div>`;
//             return;
//         }

//         let mangIdNhatKy = dsNhatKy.map(nk => nk.id);

//         // 2. KÉO DỮ LIỆU SỰ KIỆN
//         let { data: dsSuKien, error: err2 } = await _supabase.from('nhat_ky_su_kien_hs').select('*').in('id_nhat_ky', mangIdNhatKy);
//         if (err2) throw err2;

//         let htmlRender = '';

//         // 3. XỬ LÝ CHẾ ĐỘ TÌM HỌC SINH & VẼ BẢNG TỔNG QUAN
//         if (isTimHocSinh) {
//             dsSuKien = dsSuKien ? dsSuKien.filter(sk => sk.ten_hoc_sinh && sk.ten_hoc_sinh.toLowerCase().includes(tenHsTimKiem)) : [];

//             if (dsSuKien.length === 0) {
//                 vungKetQua.innerHTML = `<div style="text-align: center; color: #28a745; padding: 20px; font-size: 16px;"><b>🎉 Tuyệt vời! Học sinh này không có vi phạm hay vắng mặt nào trong thời gian này!</b></div>`;
//                 return;
//             }

//             let idNhatKyCoHS = new Set(dsSuKien.map(sk => sk.id_nhat_ky));
//             dsNhatKy = dsNhatKy.filter(nk => idNhatKyCoHS.has(nk.id));

//             let tongVang = dsSuKien.filter(sk => sk.loai_the === 'Vắng mặt').length;
//             let tongViPham = dsSuKien.length - tongVang;
//             let tenThat = dsSuKien[0].ten_hoc_sinh;

//             htmlRender += `
//                 <div style="background: #e0f3ff; border: 1px solid #b8daff; border-left: 5px solid #007bff; border-radius: 8px; padding: 15px; margin-bottom: 25px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
//                     <h4 style="margin: 0 0 12px 0; color: #0056b3; font-size: 16px;">📊 TỔNG QUAN HỌC SINH: <span style="text-transform: uppercase;">${tenThat}</span></h4>
//                     <div style="display: flex; gap: 15px; flex-wrap: wrap;">
//                         <span style="background: #fff; border: 1px solid #f5c6cb; color: #721c24; padding: 8px 15px; border-radius: 6px; font-weight: bold; font-size: 14px;">
//                             ❌ Tổng vắng mặt: <span style="font-size: 16px; color: red;">${tongVang}</span> tiết
//                         </span>
//                         <span style="background: #fff; border: 1px solid #ffeeba; color: #d35400; padding: 8px 15px; border-radius: 6px; font-weight: bold; font-size: 14px;">
//                             🎯 Tổng sự kiện khác: <span style="font-size: 16px; color: #d35400;">${tongViPham}</span> lần
//                         </span>
//                     </div>
//                 </div>
//             `;
//         }

//         // 🌟 TẠO TỪ ĐIỂN MAP TÊN LỚP TỪ DATALIST (Để đổi Mã Lớp -> Tên Lớp)
//         let mapLop = {};
//         const cacOptionLop = document.querySelectorAll('#dl-lop option');
//         cacOptionLop.forEach(opt => {
//             let val = opt.value; // Dạng: 12 Toán (12TN6)
//             let match = val.match(/^(.*?)\s*\(([^)]+)\)$/);
//             if (match) {
//                 mapLop[match[2].trim()] = val; // Key là 12TN6, Value là 12 Toán (12TN6)
//             } else {
//                 mapLop[val] = val;
//             }
//         });

//         // 4. VẼ GIAO DIỆN TIMELINE
//         const tenCacThu = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];

//         dsNhatKy.forEach(nk => {
//             let dateObj = new Date(nk.ngay_day);
//             let strNgay = `${String(dateObj.getDate()).padStart(2, '0')}/${String(dateObj.getMonth() + 1).padStart(2, '0')}/${dateObj.getFullYear()}`;
//             let thuHienTai = tenCacThu[dateObj.getDay()];

//             // Lấy tên hiển thị của lớp (Nếu không tìm thấy trong map thì dùng mã lớp)
//             let tenLopHienThi = mapLop[nk.ma_lop] || `Lớp ${nk.ma_lop}`;

//             // --- HTML BÀI GIẢNG ---
//             let mangAnhBG = [];
//             if (Array.isArray(nk.danh_sach_anh)) mangAnhBG = nk.danh_sach_anh;
//             else if (typeof nk.danh_sach_anh === 'string' && nk.danh_sach_anh.length > 5) {
//                 try { mangAnhBG = JSON.parse(nk.danh_sach_anh); }
//                 catch (e) { mangAnhBG = nk.danh_sach_anh.split(',').filter(l => l.trim()); }
//             }

//             let htmlAnhBG = '';
//             if (mangAnhBG.length > 0) {
//                 htmlAnhBG = `<div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 10px; padding: 10px; background: #e0f7fa; border-radius: 6px;">`;
//                 mangAnhBG.forEach(link => {
//                     htmlAnhBG += `<a href="${link}" target="_blank" title="Bấm để xem ảnh gốc"><img src="${taoLinkAnhPreview(link)}" loading="lazy" style="height: 80px; width: 80px; object-fit: cover; border-radius: 4px; border: 2px solid #00acc1; box-shadow: 0 2px 4px rgba(0,0,0,0.1); cursor: zoom-in; background: #fff;"></a>`;
//                 });
//                 htmlAnhBG += `</div>`;
//             }

//             // (Tên bài đã được dời lên Header, nên ở đây chỉ còn Nội dung/Lý thuyết)
//             let htmlBaiGiang = `
//                 <div style="font-size: 14px; color: #212529; line-height: 1.5; white-space: pre-wrap; margin-bottom: 5px;"><b>📘 Nội dung / Lý thuyết:</b><br>${nk.ly_thuyet || '<i>(Không ghi chú)</i>'}</div>
//                 <div style="font-size: 14px; color: #212529; line-height: 1.5; white-space: pre-wrap; margin-bottom: 5px;"><b>✏️ Bài tập:</b><br>${nk.bai_tap || '<i>(Không ghi chú)</i>'}</div>
//                 <div style="font-size: 14px; color: #856404; line-height: 1.5; white-space: pre-wrap; background: #fff3cd; padding: 8px; border-radius: 4px; border-left: 4px solid #ffeeba;"><b>📌 Dặn dò:</b><br>${nk.dan_do || '<i>(Không có)</i>'}</div>
//                 ${htmlAnhBG}
//             `;

//             // --- HTML SỰ KIỆN ---
//             let cacSuKienCuaTiet = dsSuKien ? dsSuKien.filter(sk => sk.id_nhat_ky === nk.id) : [];
//             let vangMat = cacSuKienCuaTiet.filter(sk => sk.loai_the === 'Vắng mặt');
//             let suKienKhac = cacSuKienCuaTiet.filter(sk => sk.loai_the !== 'Vắng mặt');
//             let tongSoSuKienTiet = vangMat.length + suKienKhac.length;

//             let htmlSuKien = '';
//             if (tongSoSuKienTiet > 0) {
//                 if (vangMat.length > 0) {
//                     htmlSuKien += `<div style="margin-top: 10px;">
//                                     <strong style="color: #dc3545; font-size: 13px;">❌ Vắng mặt (${vangMat.length}):</strong>
//                                     <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 5px;">`;
//                     vangMat.forEach(v => {
//                         htmlSuKien += `<span style="padding: 4px 10px; background: #f8d7da; color: #721c24; border-radius: 20px; font-size: 12px; font-weight: bold; border: 1px solid #f5c6cb;">${v.ten_hoc_sinh}</span>`;
//                     });
//                     htmlSuKien += `</div></div>`;
//                 }

//                 if (suKienKhac.length > 0) {
//                     htmlSuKien += `<div style="margin-top: 15px;">
//                                     <strong style="color: #d35400; font-size: 13px;">🎯 Sự kiện ghi nhận (${suKienKhac.length}):</strong>
//                                     <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 8px;">`;
//                     suKienKhac.forEach(sk => {
//                         let textGC = sk.ghi_chu ? ` - <i>${sk.ghi_chu}</i>` : '';
//                         let mauThe = sk.thong_tin_mo_rong?.mau_sac || '#fd7e14';

//                         let htmlAnhMC = '';
//                         if (sk.thong_tin_mo_rong && sk.thong_tin_mo_rong.danh_sach_anh_minh_chung) {
//                             let dsMC = sk.thong_tin_mo_rong.danh_sach_anh_minh_chung;
//                             let mangMC = Array.isArray(dsMC) ? dsMC : dsMC.split(',').filter(l => l.trim());
//                             if (mangMC.length > 0) {
//                                 htmlAnhMC = `<div style="display: flex; gap: 5px; margin-top: 5px; padding-left: 10px; border-left: 2px solid ${mauThe};">`;
//                                 mangMC.forEach(link => {
//                                     htmlAnhMC += `<a href="${link}" target="_blank"><img src="${taoLinkAnhPreview(link)}" loading="lazy" style="height: 40px; width: 40px; object-fit: cover; border-radius: 4px; border: 1px solid #ccc; cursor: zoom-in; background: #fff;"></a>`;
//                                 });
//                                 htmlAnhMC += `</div>`;
//                             }
//                         }

//                         htmlSuKien += `
//                             <div style="background: #fff; border: 1px solid #eee; padding: 8px 12px; border-radius: 6px; box-shadow: 0 1px 2px rgba(0,0,0,0.02); border-left: 4px solid ${mauThe};">
//                                 <b style="font-size: 13px;">${sk.ten_hoc_sinh}</b>: 
//                                 <span style="color: ${mauThe}; font-weight: bold; font-size: 12px;">[${sk.loai_the}]</span>
//                                 <span style="font-size: 12px; color: #555;">${textGC}</span>
//                                 ${htmlAnhMC}
//                             </div>`;
//                     });
//                     htmlSuKien += `</div></div>`;
//                 }
//             }

//             // --- LẮP RÁP THẺ VỚI HEADER MỚI ---
//             let styleBaiGiang = isTimHocSinh ? 'display: none;' : 'display: block;';
//             let labelBaiGiang = isTimHocSinh ? '👁️ Xem chi tiết bài giảng' : '🔽 Thu gọn bài giảng';
//             let styleSuKien = isTimHocSinh ? 'display: block;' : 'display: none;';
//             let labelSuKien = isTimHocSinh ? `🔽 Thu gọn sự kiện (${tongSoSuKienTiet})` : `👁️ Xem sự kiện & điểm danh (${tongSoSuKienTiet})`;

//             htmlRender += `
//                 <div style="background: #fff; border: 1px solid #ced4da; border-radius: 8px; box-shadow: 0 3px 6px rgba(0,0,0,0.05); padding: 20px; animation: slideUp 0.4s ease-out;">
                    
//                     <!-- 🌟 HEADER TIẾT HỌC MỚI (Lớp, Môn, Thời gian, Tên bài) -->
//                     <div style="margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 12px;">
//                         <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-bottom: 8px;">
//                             <span style="background: #007bff; color: white; padding: 5px 12px; border-radius: 4px; font-weight: bold; font-size: 13px;">🏫 ${tenLopHienThi}</span>
//                             <span style="background: #17a2b8; color: white; padding: 5px 12px; border-radius: 4px; font-weight: bold; font-size: 13px;">🏷️ ${nk.phan_mon || 'Không rõ môn'}</span>
//                             <span style="color: #6c757d; font-size: 13px; font-weight: bold; margin-left: auto;">🕒 ${nk.tiet} - ${nk.buoi} - ${thuHienTai}, Ngày ${strNgay}</span>
//                         </div>
//                         ${nk.ten_bai ? `<div style="font-size: 16px; font-weight: bold; color: #0056b3; margin-top: 8px;">📖 Bài học: ${nk.ten_bai}</div>` : ''}
//                     </div>

//                     <!-- Khu vực Bài giảng (Có Toggle) -->
//                     <div style="margin-bottom: 15px;">
//                         <div onclick="let c = document.getElementById('bg-${nk.id}'); if(c.style.display === 'none') { c.style.display = 'block'; this.innerHTML = '🔽 Thu gọn bài giảng'; } else { c.style.display = 'none'; this.innerHTML = '👁️ Xem chi tiết bài giảng'; }" style="color: #007bff; font-size: 13px; font-weight: bold; cursor: pointer; display: inline-block; user-select: none; margin-bottom: 8px;">
//                             ${labelBaiGiang}
//                         </div>
//                         <div id="bg-${nk.id}" style="${styleBaiGiang} padding-left: 10px; border-left: 3px solid #e9ecef;">
//                             ${htmlBaiGiang}
//                         </div>
//                     </div>
                    
//                     <!-- Khu vực Sự kiện (Có Toggle) -->
//                     ${tongSoSuKienTiet > 0 ? `
//                         <div style="border-top: 1px dashed #ccc; padding-top: 10px;">
//                             <div onclick="let c = document.getElementById('sk-${nk.id}'); if(c.style.display === 'none') { c.style.display = 'block'; this.innerHTML = '🔽 Thu gọn sự kiện (${tongSoSuKienTiet})'; } else { c.style.display = 'none'; this.innerHTML = '👁️ Xem sự kiện & điểm danh (${tongSoSuKienTiet})'; }" style="color: #d35400; font-size: 13px; font-weight: bold; cursor: pointer; display: inline-block; user-select: none; margin-bottom: 8px;">
//                                 ${labelSuKien}
//                             </div>
//                             <div id="sk-${nk.id}" style="${styleSuKien} padding-left: 10px; border-left: 3px solid #ffeeba; background: #fafafa; padding: 10px; border-radius: 4px;">
//                                 ${htmlSuKien}
//                             </div>
//                         </div>
//                     ` : `
//                         <div style="border-top: 1px dashed #ccc; padding-top: 10px; font-size: 12px; color: #28a745; font-style: italic;">
//                             ✅ Lớp học ngoan, không có học sinh vắng hoặc vi phạm trong tiết này.
//                         </div>
//                     `}
//                 </div>
//             `;
//         });

//         vungKetQua.innerHTML = htmlRender;

//     } catch (err) {
//         console.error("Lỗi tra cứu:", err);
//         vungKetQua.innerHTML = `<div style="text-align: center; color: red; padding: 20px;"><b>❌ Lỗi khi tải dữ liệu! Vui lòng thử lại.</b></div>`;
//     } finally {
//         btnLoc.innerHTML = textGoc;
//         btnLoc.disabled = false;
//     }
// };


// // =======================================================
// // HÀM 20.15: THỰC HIỆN TRUY VẤN VẼ TIMELINE & SỬA NỘI DUNG TRỰC TIẾP
// // =======================================================
// window.ham_20_15_thuc_hien_tra_cuu = async function (btnLoc) {
//     const vungKetQua = document.getElementById('tc-khu-vuc-ket-qua');

//     let tuNgay = document.getElementById('tc-tu-ngay').value;
//     let denNgay = document.getElementById('tc-den-ngay').value;

//     let rawMon = document.getElementById('tc-input-mon').value.trim();
//     let rawLop = document.getElementById('tc-input-lop').value.trim();
//     let maLopLuu = rawLop.match(/\(([^)]+)\)$/) ? rawLop.match(/\(([^)]+)\)$/)[1].trim() : rawLop;

//     let rawHS = document.getElementById('tc-input-hs').value.trim();
//     let tenHsTimKiem = rawHS.split(' - ')[0].trim().toLowerCase();

//     let isTimHocSinh = tenHsTimKiem !== '';

//     if (!tuNgay || !denNgay) {
//         alert("⚠️ Vui lòng chọn đủ mốc thời gian Từ ngày - Đến ngày!");
//         return;
//     }

//     const textGoc = btnLoc.innerHTML;
//     btnLoc.innerHTML = "⏳ ĐANG TÌM KIẾM...";
//     btnLoc.disabled = true;
//     vungKetQua.innerHTML = `<div style="text-align: center; color: #007bff; padding: 20px;"><b>⏳ Đang tải dữ liệu từ máy chủ...</b></div>`;

//     try {
//         const taoLinkAnhPreview = (url) => {
//             if (!url) return '';
//             let fileId = '';
//             let matchD = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
//             let matchId = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
//             let matchOpen = url.match(/\/open\?id=([a-zA-Z0-9_-]+)/);
//             if (matchD) fileId = matchD[1];
//             else if (matchId) fileId = matchId[1];
//             else if (matchOpen) fileId = matchOpen[1];
//             return fileId ? `https://lh3.googleusercontent.com/d/${fileId}` : url;
//         };

//         let queryNhatKy = _supabase.from('nhat_ky_day_hoc').select('*').gte('ngay_day', tuNgay).lte('ngay_day', denNgay).order('ngay_day', { ascending: false }).order('tiet', { ascending: true });
//         if (maLopLuu) queryNhatKy = queryNhatKy.eq('ma_lop', maLopLuu);
//         if (rawMon) queryNhatKy = queryNhatKy.ilike('phan_mon', `%${rawMon}%`);

//         let { data: dsNhatKy, error: err1 } = await queryNhatKy;
//         if (err1) throw err1;

//         if (!dsNhatKy || dsNhatKy.length === 0) {
//             vungKetQua.innerHTML = `<div style="text-align: center; color: #dc3545; padding: 20px;"><b>Không tìm thấy tiết dạy nào khớp với bộ lọc!</b></div>`;
//             return;
//         }

//         let mangIdNhatKy = dsNhatKy.map(nk => nk.id);
//         let { data: dsSuKien, error: err2 } = await _supabase.from('nhat_ky_su_kien_hs').select('*').in('id_nhat_ky', mangIdNhatKy);
//         if (err2) throw err2;

//         let htmlRender = '';

//         if (isTimHocSinh) {
//             dsSuKien = dsSuKien ? dsSuKien.filter(sk => sk.ten_hoc_sinh && sk.ten_hoc_sinh.toLowerCase().includes(tenHsTimKiem)) : [];
//             if (dsSuKien.length === 0) {
//                 vungKetQua.innerHTML = `<div style="text-align: center; color: #28a745; padding: 20px; font-size: 16px;"><b>🎉 Tuyệt vời! Học sinh này không có vi phạm hay vắng mặt nào trong thời gian này!</b></div>`;
//                 return;
//             }
//             let idNhatKyCoHS = new Set(dsSuKien.map(sk => sk.id_nhat_ky));
//             dsNhatKy = dsNhatKy.filter(nk => idNhatKyCoHS.has(nk.id));

//             let tongVang = dsSuKien.filter(sk => sk.loai_the === 'Vắng mặt').length;
//             let tongViPham = dsSuKien.length - tongVang;
//             let tenThat = dsSuKien[0].ten_hoc_sinh;

//             htmlRender += `
//                 <div style="background: #e0f3ff; border: 1px solid #b8daff; border-left: 5px solid #007bff; border-radius: 8px; padding: 15px; margin-bottom: 25px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
//                     <h4 style="margin: 0 0 12px 0; color: #0056b3; font-size: 16px;">📊 TỔNG QUAN HỌC SINH: <span style="text-transform: uppercase;">${tenThat}</span></h4>
//                     <div style="display: flex; gap: 15px; flex-wrap: wrap;">
//                         <span style="background: #fff; border: 1px solid #f5c6cb; color: #721c24; padding: 8px 15px; border-radius: 6px; font-weight: bold; font-size: 14px;">
//                             ❌ Tổng vắng mặt: <span style="font-size: 16px; color: red;">${tongVang}</span> tiết
//                         </span>
//                         <span style="background: #fff; border: 1px solid #ffeeba; color: #d35400; padding: 8px 15px; border-radius: 6px; font-weight: bold; font-size: 14px;">
//                             🎯 Tổng sự kiện khác: <span style="font-size: 16px; color: #d35400;">${tongViPham}</span> lần
//                         </span>
//                     </div>
//                 </div>
//             `;
//         }

//         let mapLop = {};
//         const cacOptionLop = document.querySelectorAll('#dl-lop option');
//         cacOptionLop.forEach(opt => {
//             let val = opt.value;
//             let match = val.match(/^(.*?)\s*\(([^)]+)\)$/);
//             if (match) mapLop[match[2].trim()] = val;
//             else mapLop[val] = val;
//         });

//         const tenCacThu = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];

//         dsNhatKy.forEach(nk => {
//             let dateObj = new Date(nk.ngay_day);
//             let strNgay = `${String(dateObj.getDate()).padStart(2, '0')}/${String(dateObj.getMonth() + 1).padStart(2, '0')}/${dateObj.getFullYear()}`;
//             let thuHienTai = tenCacThu[dateObj.getDay()];
//             let tenLopHienThi = mapLop[nk.ma_lop] || `Lớp ${nk.ma_lop}`;

//             let mangAnhBG = [];
//             if (Array.isArray(nk.danh_sach_anh)) mangAnhBG = nk.danh_sach_anh;
//             else if (typeof nk.danh_sach_anh === 'string' && nk.danh_sach_anh.length > 5) {
//                 try { mangAnhBG = JSON.parse(nk.danh_sach_anh); }
//                 catch (e) { mangAnhBG = nk.danh_sach_anh.split(',').filter(l => l.trim()); }
//             }

//             let htmlAnhBG = '';
//             if (mangAnhBG.length > 0) {
//                 htmlAnhBG = `<div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 10px; padding: 10px; background: #e0f7fa; border-radius: 6px;">`;
//                 mangAnhBG.forEach(link => {
//                     htmlAnhBG += `<a href="${link}" target="_blank" title="Bấm để xem ảnh gốc"><img src="${taoLinkAnhPreview(link)}" loading="lazy" style="height: 80px; width: 80px; object-fit: cover; border-radius: 4px; border: 2px solid #00acc1; box-shadow: 0 2px 4px rgba(0,0,0,0.1); cursor: zoom-in; background: #fff;"></a>`;
//                 });
//                 htmlAnhBG += `</div>`;
//             }

//             // 🌟 KHU VỰC NỘI DUNG BÀI GIẢNG (CHẾ ĐỘ XEM & CHẾ ĐỘ SỬA TRỰC TIẾP)
//             let htmlBaiGiang = `
//                 <div id="view-mode-${nk.id}">
//                     <div style="font-size: 16px; font-weight: bold; color: #0056b3; margin-bottom: 8px;">📖 Bài học: <span id="txt-tenbai-${nk.id}">${nk.ten_bai || '(Chưa có tên bài)'}</span></div>
//                     <div style="font-size: 14px; color: #212529; line-height: 1.5; white-space: pre-wrap; margin-bottom: 5px;"><b>📘 Lý thuyết:</b><br><span id="txt-lythuyet-${nk.id}">${nk.ly_thuyet || '<i>(Không ghi chú)</i>'}</span></div>
//                     <div style="font-size: 14px; color: #212529; line-height: 1.5; white-space: pre-wrap; margin-bottom: 5px;"><b>✏️ Bài tập:</b><br><span id="txt-baitap-${nk.id}">${nk.bai_tap || '<i>(Không ghi chú)</i>'}</span></div>
//                     <div style="font-size: 14px; color: #856404; line-height: 1.5; white-space: pre-wrap; background: #fff3cd; padding: 8px; border-radius: 4px; border-left: 4px solid #ffeeba; margin-top: 8px;"><b>📌 Dặn dò:</b><br><span id="txt-dando-${nk.id}">${nk.dan_do || '<i>(Không có)</i>'}</span></div>
//                     ${htmlAnhBG}
//                 </div>

//                 <!-- FORM SỬA ẨN (HIỆN KHI BẤM NÚT SỬA) -->
//                 <div id="edit-mode-${nk.id}" style="display: none; background: #fdfefe; padding: 12px; border: 2px dashed #007bff; border-radius: 6px;">
//                     <label style="font-weight: bold; font-size: 12px; color: #0056b3;">Tên bài / Chủ đề:</label>
//                     <input id="input-tenbai-${nk.id}" type="text" value="${nk.ten_bai || ''}" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; margin-bottom: 8px; font-weight: bold;">
                    
//                     <label style="font-weight: bold; font-size: 12px; color: #495057;">Lý thuyết:</label>
//                     <textarea id="input-lythuyet-${nk.id}" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; margin-bottom: 8px; min-height: 50px;">${nk.ly_thuyet || ''}</textarea>
                    
//                     <label style="font-weight: bold; font-size: 12px; color: #495057;">Bài tập:</label>
//                     <textarea id="input-baitap-${nk.id}" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; margin-bottom: 8px; min-height: 50px;">${nk.bai_tap || ''}</textarea>
                    
//                     <label style="font-weight: bold; font-size: 12px; color: #856404;">Dặn dò:</label>
//                     <textarea id="input-dando-${nk.id}" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; margin-bottom: 12px; min-height: 40px;">${nk.dan_do || ''}</textarea>
                    
//                     <div style="display: flex; gap: 8px; justify-content: flex-end;">
//                         <button onclick="document.getElementById('edit-mode-${nk.id}').style.display='none'; document.getElementById('view-mode-${nk.id}').style.display='block';" style="background: #6c757d; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-weight: bold; font-size: 12px;">❌ Hủy</button>
//                         <button class="btn-luu-sua-truc-tiep" data-id="${nk.id}" style="background: #28a745; color: white; border: none; padding: 6px 15px; border-radius: 4px; cursor: pointer; font-weight: bold; font-size: 12px;">💾 Lưu lại</button>
//                     </div>
//                 </div>
//             `;

//             let cacSuKienCuaTiet = dsSuKien ? dsSuKien.filter(sk => sk.id_nhat_ky === nk.id) : [];
//             let vangMat = cacSuKienCuaTiet.filter(sk => sk.loai_the === 'Vắng mặt');
//             let suKienKhac = cacSuKienCuaTiet.filter(sk => sk.loai_the !== 'Vắng mặt');
//             let tongSoSuKienTiet = vangMat.length + suKienKhac.length;

//             let htmlSuKien = '';
//             if (tongSoSuKienTiet > 0) {
//                 if (vangMat.length > 0) {
//                     htmlSuKien += `<div style="margin-top: 10px;">
//                                     <strong style="color: #dc3545; font-size: 13px;">❌ Vắng mặt (${vangMat.length}):</strong>
//                                     <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 5px;">`;
//                     vangMat.forEach(v => {
//                         htmlSuKien += `
//                             <span style="display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; background: #f8d7da; color: #721c24; border-radius: 20px; font-size: 12px; font-weight: bold; border: 1px solid #f5c6cb;">
//                                 ${v.ten_hoc_sinh} 
//                                 <span onclick="ham_20_17_xoa_su_kien_chi_tiet('${v.id}')" style="cursor: pointer; font-size: 11px; color: #dc3545;" title="Xóa học sinh này">✖</span>
//                             </span>`;
//                     });
//                     htmlSuKien += `</div></div>`;
//                 }

//                 if (suKienKhac.length > 0) {
//                     htmlSuKien += `<div style="margin-top: 15px;">
//                                     <strong style="color: #d35400; font-size: 13px;">🎯 Sự kiện ghi nhận (${suKienKhac.length}):</strong>
//                                     <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 8px;">`;
//                     suKienKhac.forEach(sk => {
//                         let textGC = sk.ghi_chu ? ` - <i>${sk.ghi_chu}</i>` : '';
//                         let mauThe = sk.thong_tin_mo_rong?.mau_sac || '#fd7e14';

//                         let htmlAnhMC = '';
//                         if (sk.thong_tin_mo_rong && sk.thong_tin_mo_rong.danh_sach_anh_minh_chung) {
//                             let dsMC = sk.thong_tin_mo_rong.danh_sach_anh_minh_chung;
//                             let mangMC = Array.isArray(dsMC) ? dsMC : dsMC.split(',').filter(l => l.trim());
//                             if (mangMC.length > 0) {
//                                 htmlAnhMC = `<div style="display: flex; gap: 5px; margin-top: 5px; padding-left: 10px; border-left: 2px solid ${mauThe};">`;
//                                 mangMC.forEach(link => {
//                                     htmlAnhMC += `<a href="${link}" target="_blank"><img src="${taoLinkAnhPreview(link)}" loading="lazy" style="height: 40px; width: 40px; object-fit: cover; border-radius: 4px; border: 1px solid #ccc; cursor: zoom-in; background: #fff;"></a>`;
//                                 });
//                                 htmlAnhMC += `</div>`;
//                             }
//                         }

//                         htmlSuKien += `
//                             <div style="display: flex; justify-content: space-between; align-items: center; background: #fff; border: 1px solid #eee; padding: 8px 12px; border-radius: 6px; box-shadow: 0 1px 2px rgba(0,0,0,0.02); border-left: 4px solid ${mauThe};">
//                                 <div>
//                                     <b style="font-size: 13px;">${sk.ten_hoc_sinh}</b>: 
//                                     <span style="color: ${mauThe}; font-weight: bold; font-size: 12px;">[${sk.loai_the}]</span>
//                                     <span style="font-size: 12px; color: #555;">${textGC}</span>
//                                     ${htmlAnhMC}
//                                 </div>
//                                 <button onclick="ham_20_17_xoa_su_kien_chi_tiet('${sk.id}')" style="background: #f8d7da; color: #721c24; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: bold;" title="Xóa sự kiện này">🗑️ Xóa</button>
//                             </div>`;
//                     });
//                     htmlSuKien += `</div></div>`;
//                 }
//             }

//             let styleBaiGiang = isTimHocSinh ? 'display: none;' : 'display: block;';
//             let labelBaiGiang = isTimHocSinh ? '👁️ Xem chi tiết bài giảng' : '🔽 Thu gọn bài giảng';
//             let styleSuKien = isTimHocSinh ? 'display: block;' : 'display: none;';
//             let labelSuKien = isTimHocSinh ? `🔽 Thu gọn sự kiện (${tongSoSuKienTiet})` : `👁️ Xem sự kiện & điểm danh (${tongSoSuKienTiet})`;

//             htmlRender += `
//                 <div style="background: #fff; border: 1px solid #ced4da; border-radius: 8px; box-shadow: 0 3px 6px rgba(0,0,0,0.05); padding: 20px; animation: slideUp 0.4s ease-out;">
                    
//                     <div style="margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 12px;">
//                         <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
//                             <span style="background: #007bff; color: white; padding: 5px 12px; border-radius: 4px; font-weight: bold; font-size: 13px;">🏫 ${tenLopHienThi}</span>
//                             <span style="background: #17a2b8; color: white; padding: 5px 12px; border-radius: 4px; font-weight: bold; font-size: 13px;">🏷️ ${nk.phan_mon || 'Không rõ môn'}</span>
//                             <span style="color: #6c757d; font-size: 13px; font-weight: bold;">🕒 ${nk.tiet} - ${nk.buoi} - ${thuHienTai}, Ngày ${strNgay}</span>
                            
//                             <!-- NÚT XÓA NGUYÊN TIẾT -->
//                             <button onclick="ham_20_18_xoa_nguyen_tiet('${nk.id}')" style="margin-left: auto; background: #dc3545; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-weight: bold; font-size: 12px;" title="Xóa toàn bộ tiết học">🗑️ Xóa tiết</button>
//                         </div>
//                     </div>

//                     <!-- Khung Nội dung Bài giảng (Có nút Sửa ngay bên cạnh) -->
//                     <div style="margin-bottom: 15px;">
//                         <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
//                             <div onclick="let c = document.getElementById('bg-${nk.id}'); if(c.style.display === 'none') { c.style.display = 'block'; this.innerHTML = '🔽 Thu gọn bài giảng'; } else { c.style.display = 'none'; this.innerHTML = '👁️ Xem chi tiết bài giảng'; }" style="color: #007bff; font-size: 13px; font-weight: bold; cursor: pointer; user-select: none;">
//                                 ${labelBaiGiang}
//                             </div>
//                             <button onclick="document.getElementById('view-mode-${nk.id}').style.display='none'; document.getElementById('edit-mode-${nk.id}').style.display='block';" style="background: #ffc107; color: #000; border: none; padding: 4px 10px; border-radius: 4px; cursor: pointer; font-weight: bold; font-size: 12px;" title="Sửa nội dung bài giảng này">✏️ Sửa bài giảng</button>
//                         </div>

//                         <div id="bg-${nk.id}" style="${styleBaiGiang} padding-left: 10px; border-left: 3px solid #e9ecef;">
//                             ${htmlBaiGiang}
//                         </div>
//                     </div>
                    
//                     ${tongSoSuKienTiet > 0 ? `
//                         <div style="border-top: 1px dashed #ccc; padding-top: 10px;">
//                             <div onclick="let c = document.getElementById('sk-${nk.id}'); if(c.style.display === 'none') { c.style.display = 'block'; this.innerHTML = '🔽 Thu gọn sự kiện (${tongSoSuKienTiet})'; } else { c.style.display = 'none'; this.innerHTML = '👁️ Xem sự kiện & điểm danh (${tongSoSuKienTiet})'; }" style="color: #d35400; font-size: 13px; font-weight: bold; cursor: pointer; display: inline-block; user-select: none; margin-bottom: 8px;">
//                                 ${labelSuKien}
//                             </div>
//                             <div id="sk-${nk.id}" style="${styleSuKien} padding-left: 10px; border-left: 3px solid #ffeeba; background: #fafafa; padding: 10px; border-radius: 4px;">
//                                 ${htmlSuKien}
//                             </div>
//                         </div>
//                     ` : `
//                         <div style="border-top: 1px dashed #ccc; padding-top: 10px; font-size: 12px; color: #28a745; font-style: italic;">
//                             ✅ Lớp học ngoan, không có học sinh vắng hoặc vi phạm trong tiết này.
//                         </div>
//                     `}
//                 </div>
//             `;
//         });

//         vungKetQua.innerHTML = htmlRender;

//         // 🌟 LẮNG NGHE SỰ KIỆN LƯU KHI SỬA TRỰC TIẾP TRÊN THẺ
//         document.querySelectorAll('.btn-luu-sua-truc-tiep').forEach(btn => {
//             btn.addEventListener('click', async function () {
//                 let id = this.dataset.id;
//                 let tenBaiMoi = document.getElementById(`input-tenbai-${id}`).value.trim();
//                 let lyThuyetMoi = document.getElementById(`input-lythuyet-${id}`).value.trim();
//                 let baiTapMoi = document.getElementById(`input-baitap-${id}`).value.trim();
//                 let danDoMoi = document.getElementById(`input-dando-${id}`).value.trim();

//                 this.innerText = "⏳ Đang lưu...";
//                 this.disabled = true;

//                 try {
//                     const { error } = await _supabase
//                         .from('nhat_ky_day_hoc')
//                         .update({
//                             ten_bai: tenBaiMoi,
//                             ly_thuyet: lyThuyetMoi,
//                             bai_tap: baiTapMoi,
//                             dan_do: danDoMoi
//                         })
//                         .eq('id', id);

//                     if (error) throw error;

//                     // Cập nhật lại giao diện tĩnh ngay lập tức không cần F5
//                     document.getElementById(`txt-tenbai-${id}`).innerText = tenBaiMoi || '(Chưa có tên bài)';
//                     document.getElementById(`txt-lythuyet-${id}`).innerHTML = lyThuyetMoi || '<i>(Không ghi chú)</i>';
//                     document.getElementById(`txt-baitap-${id}`).innerHTML = baiTapMoi || '<i>(Không ghi chú)</i>';
//                     document.getElementById(`txt-dando-${id}`).innerHTML = danDoMoi || '<i>(Không có)</i>';

//                     document.getElementById(`edit-mode-${id}`).style.display = 'none';
//                     document.getElementById(`view-mode-${id}`).style.display = 'block';

//                     alert("✅ Đã cập nhật nội dung bài giảng thành công!");
//                 } catch (err) {
//                     console.error("Lỗi cập nhật:", err);
//                     alert("❌ Không thể lưu thay đổi!");
//                 } finally {
//                     this.innerText = "💾 Lưu lại";
//                     this.disabled = false;
//                 }
//             });
//         });

//     } catch (err) {
//         console.error("Lỗi tra cứu:", err);
//         vungKetQua.innerHTML = `<div style="text-align: center; color: red; padding: 20px;"><b>❌ Lỗi khi tải dữ liệu! Vui lòng thử lại.</b></div>`;
//     } finally {
//         btnLoc.innerHTML = textGoc;
//         btnLoc.disabled = false;
//     }
// };

// // =======================================================
// // HÀM 20.15: TRA CỨU & SỬA TỪNG PHẦN BÀI GIẢNG (CÓ NÚT LƯU ĐỘNG)
// // =======================================================
// window.ham_20_15_thuc_hien_tra_cuu = async function (btnLoc) {
//     const vungKetQua = document.getElementById('tc-khu-vuc-ket-qua');

//     let tuNgay = document.getElementById('tc-tu-ngay').value;
//     let denNgay = document.getElementById('tc-den-ngay').value;

//     let rawMon = document.getElementById('tc-input-mon').value.trim();
//     let rawLop = document.getElementById('tc-input-lop').value.trim();
//     let maLopLuu = rawLop.match(/\(([^)]+)\)$/) ? rawLop.match(/\(([^)]+)\)$/)[1].trim() : rawLop;

//     let rawHS = document.getElementById('tc-input-hs').value.trim();
//     let tenHsTimKiem = rawHS.split(' - ')[0].trim().toLowerCase();

//     let isTimHocSinh = tenHsTimKiem !== '';

//     if (!tuNgay || !denNgay) {
//         alert("⚠️ Vui lòng chọn đủ mốc thời gian Từ ngày - Đến ngày!");
//         return;
//     }

//     const textGoc = btnLoc.innerHTML;
//     btnLoc.innerHTML = "⏳ ĐANG TÌM KIẾM...";
//     btnLoc.disabled = true;
//     vungKetQua.innerHTML = `<div style="text-align: center; color: #007bff; padding: 20px;"><b>⏳ Đang tải dữ liệu từ máy chủ...</b></div>`;

//     try {
//         const taoLinkAnhPreview = (url) => {
//             if (!url) return '';
//             let fileId = '';
//             let matchD = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
//             let matchId = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
//             let matchOpen = url.match(/\/open\?id=([a-zA-Z0-9_-]+)/);
//             if (matchD) fileId = matchD[1];
//             else if (matchId) fileId = matchId[1];
//             else if (matchOpen) fileId = matchOpen[1];
//             return fileId ? `https://lh3.googleusercontent.com/d/${fileId}` : url;
//         };

//         let queryNhatKy = _supabase.from('nhat_ky_day_hoc').select('*').gte('ngay_day', tuNgay).lte('ngay_day', denNgay).order('ngay_day', { ascending: false }).order('tiet', { ascending: true });
//         if (maLopLuu) queryNhatKy = queryNhatKy.eq('ma_lop', maLopLuu);
//         if (rawMon) queryNhatKy = queryNhatKy.ilike('phan_mon', `%${rawMon}%`);

//         let { data: dsNhatKy, error: err1 } = await queryNhatKy;
//         if (err1) throw err1;

//         if (!dsNhatKy || dsNhatKy.length === 0) {
//             vungKetQua.innerHTML = `<div style="text-align: center; color: #dc3545; padding: 20px;"><b>Không tìm thấy tiết dạy nào khớp với bộ lọc!</b></div>`;
//             return;
//         }

//         let mangIdNhatKy = dsNhatKy.map(nk => nk.id);
//         let { data: dsSuKien, error: err2 } = await _supabase.from('nhat_ky_su_kien_hs').select('*').in('id_nhat_ky', mangIdNhatKy);
//         if (err2) throw err2;

//         let htmlRender = '';

//         if (isTimHocSinh) {
//             dsSuKien = dsSuKien ? dsSuKien.filter(sk => sk.ten_hoc_sinh && sk.ten_hoc_sinh.toLowerCase().includes(tenHsTimKiem)) : [];
//             if (dsSuKien.length === 0) {
//                 vungKetQua.innerHTML = `<div style="text-align: center; color: #28a745; padding: 20px; font-size: 16px;"><b>🎉 Tuyệt vời! Học sinh này không có vi phạm hay vắng mặt nào trong thời gian này!</b></div>`;
//                 return;
//             }
//             let idNhatKyCoHS = new Set(dsSuKien.map(sk => sk.id_nhat_ky));
//             dsNhatKy = dsNhatKy.filter(nk => idNhatKyCoHS.has(nk.id));

//             let tongVang = dsSuKien.filter(sk => sk.loai_the === 'Vắng mặt').length;
//             let tongViPham = dsSuKien.length - tongVang;
//             let tenThat = dsSuKien[0].ten_hoc_sinh;

//             htmlRender += `
//                 <div style="background: #e0f3ff; border: 1px solid #b8daff; border-left: 5px solid #007bff; border-radius: 8px; padding: 15px; margin-bottom: 25px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
//                     <h4 style="margin: 0 0 12px 0; color: #0056b3; font-size: 16px;">📊 TỔNG QUAN HỌC SINH: <span style="text-transform: uppercase;">${tenThat}</span></h4>
//                     <div style="display: flex; gap: 15px; flex-wrap: wrap;">
//                         <span style="background: #fff; border: 1px solid #f5c6cb; color: #721c24; padding: 8px 15px; border-radius: 6px; font-weight: bold; font-size: 14px;">
//                             ❌ Tổng vắng mặt: <span style="font-size: 16px; color: red;">${tongVang}</span> tiết
//                         </span>
//                         <span style="background: #fff; border: 1px solid #ffeeba; color: #d35400; padding: 8px 15px; border-radius: 6px; font-weight: bold; font-size: 14px;">
//                             🎯 Tổng sự kiện khác: <span style="font-size: 16px; color: #d35400;">${tongViPham}</span> lần
//                         </span>
//                     </div>
//                 </div>
//             `;
//         }

//         let mapLop = {};
//         const cacOptionLop = document.querySelectorAll('#dl-lop option');
//         cacOptionLop.forEach(opt => {
//             let val = opt.value;
//             let match = val.match(/^(.*?)\s*\(([^)]+)\)$/);
//             if (match) mapLop[match[2].trim()] = val;
//             else mapLop[val] = val;
//         });

//         const tenCacThu = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];

//         dsNhatKy.forEach(nk => {
//             let dateObj = new Date(nk.ngay_day);
//             let strNgay = `${String(dateObj.getDate()).padStart(2, '0')}/${String(dateObj.getMonth() + 1).padStart(2, '0')}/${dateObj.getFullYear()}`;
//             let thuHienTai = tenCacThu[dateObj.getDay()];
//             let tenLopHienThi = mapLop[nk.ma_lop] || `Lớp ${nk.ma_lop}`;

//             // --- XỬ LÝ ẢNH BÀI GIẢNG (CÓ NÚT XÓA) ---
//             let mangAnhBG = [];
//             if (Array.isArray(nk.danh_sach_anh)) mangAnhBG = nk.danh_sach_anh;
//             else if (typeof nk.danh_sach_anh === 'string' && nk.danh_sach_anh.length > 5) {
//                 try { mangAnhBG = JSON.parse(nk.danh_sach_anh); }
//                 catch (e) { mangAnhBG = nk.danh_sach_anh.split(',').filter(l => l.trim()); }
//             }

//             let htmlAnhBG = '';
//             if (mangAnhBG.length > 0) {
//                 htmlAnhBG = `<div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 10px; padding: 10px; background: #e0f7fa; border-radius: 6px;">`;
//                 mangAnhBG.forEach((link, idx) => {
//                     htmlAnhBG += `
//                         <div style="position: relative; display: inline-block;">
//                             <a href="${link}" target="_blank" title="Bấm để xem ảnh gốc">
//                                 <img src="${taoLinkAnhPreview(link)}" loading="lazy" style="height: 80px; width: 80px; object-fit: cover; border-radius: 4px; border: 2px solid #00acc1; box-shadow: 0 2px 4px rgba(0,0,0,0.1); background: #fff; display: block;">
//                             </a>
//                             <button onclick="ham_20_19_xoa_anh_bai_giang('${nk.id}', ${idx})" style="position: absolute; top: -6px; right: -6px; background: #dc3545; color: white; border: none; border-radius: 50%; width: 20px; height: 20px; font-size: 11px; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 1px 3px rgba(0,0,0,0.3);" title="Xóa ảnh này">×</button>
//                         </div>`;
//                 });
//                 htmlAnhBG += `</div>`;
//             }

//             // --- NỘI DUNG BÀI GIẢNG VỚI NÚT SỬA TỪNG PHẦN & INPUT ẨN ---
//             let htmlBaiGiang = `
//                 <div style="margin-bottom: 10px;">
//                     <div style="display: flex; justify-content: space-between; align-items: center;">
//                         <span style="font-size: 16px; font-weight: bold; color: #0056b3;" id="label-tenbai-${nk.id}">📖 Bài học: ${nk.ten_bai || '(Chưa có tên bài)'}</span>
//                         <button onclick="let v=document.getElementById('input-tenbai-${nk.id}'); v.style.display=v.style.display==='none'?'block':'none'; document.getElementById('btn-luu-card-${nk.id}').style.display='block';" style="background: #ffc107; border: none; padding: 2px 8px; border-radius: 4px; font-size: 11px; cursor: pointer; font-weight: bold;">✏️ Sửa</button>
//                     </div>
//                     <input id="input-tenbai-${nk.id}" type="text" value="${nk.ten_bai || ''}" oninput="document.getElementById('btn-luu-card-${nk.id}').style.display='block'" style="display:none; width:100%; margin-top:5px; padding:6px; border:1px solid #007bff; border-radius:4px; font-weight:bold;">
//                 </div>

//                 <div style="margin-bottom: 10px;">
//                     <div style="display: flex; justify-content: space-between; align-items: center;">
//                         <b style="color: #333;">📘 Nội dung chủ đề / Lý thuyết:</b>
//                         <button onclick="let v=document.getElementById('input-lythuyet-${nk.id}'); v.style.display=v.style.display==='none'?'block':'none'; document.getElementById('btn-luu-card-${nk.id}').style.display='block';" style="background: #ffc107; border: none; padding: 2px 8px; border-radius: 4px; font-size: 11px; cursor: pointer; font-weight: bold;">✏️ Sửa</button>
//                     </div>
//                     <div style="font-size: 14px; color: #212529; line-height: 1.5; white-space: pre-wrap; margin-top: 3px;" id="label-lythuyet-${nk.id}">${nk.ly_thuyet || '<i>(Không ghi chú)</i>'}</div>
//                     <textarea id="input-lythuyet-${nk.id}" oninput="document.getElementById('btn-luu-card-${nk.id}').style.display='block'" style="display:none; width:100%; margin-top:5px; padding:6px; border:1px solid #007bff; border-radius:4px; min-height:50px;">${nk.ly_thuyet || ''}</textarea>
//                 </div>

//                 <div style="margin-bottom: 10px;">
//                     <div style="display: flex; justify-content: space-between; align-items: center;">
//                         <b style="color: #333;">✏️ Bài tập đã giải & Bài tập về nhà:</b>
//                         <button onclick="let v=document.getElementById('input-baitap-${nk.id}'); v.style.display=v.style.display==='none'?'block':'none'; document.getElementById('btn-luu-card-${nk.id}').style.display='block';" style="background: #ffc107; border: none; padding: 2px 8px; border-radius: 4px; font-size: 11px; cursor: pointer; font-weight: bold;">✏️ Sửa</button>
//                     </div>
//                     <div style="font-size: 14px; color: #212529; line-height: 1.5; white-space: pre-wrap; margin-top: 3px;" id="label-baitap-${nk.id}">${nk.bai_tap || '<i>(Không ghi chú)</i>'}</div>
//                     <textarea id="input-baitap-${nk.id}" oninput="document.getElementById('btn-luu-card-${nk.id}').style.display='block'" style="display:none; width:100%; margin-top:5px; padding:6px; border:1px solid #007bff; border-radius:4px; min-height:50px;">${nk.bai_tap || ''}</textarea>
//                 </div>

//                 <div style="margin-bottom: 10px; background: #fff3cd; padding: 8px; border-radius: 4px; border-left: 4px solid #ffeeba;">
//                     <div style="display: flex; justify-content: space-between; align-items: center;">
//                         <b style="color: #856404;">📌 Dặn dò:</b>
//                         <button onclick="let v=document.getElementById('input-dando-${nk.id}'); v.style.display=v.style.display==='none'?'block':'none'; document.getElementById('btn-luu-card-${nk.id}').style.display='block';" style="background: #ffc107; border: none; padding: 2px 8px; border-radius: 4px; font-size: 11px; cursor: pointer; font-weight: bold;">✏️ Sửa</button>
//                     </div>
//                     <div style="font-size: 14px; color: #856404; line-height: 1.5; white-space: pre-wrap; margin-top: 3px;" id="label-dando-${nk.id}">${nk.dan_do || '<i>(Không có)</i>'}</div>
//                     <textarea id="input-dando-${nk.id}" oninput="document.getElementById('btn-luu-card-${nk.id}').style.display='block'" style="display:none; width:100%; margin-top:5px; padding:6px; border:1px solid #007bff; border-radius:4px; min-height:40px;">${nk.dan_do || ''}</textarea>
//                 </div>

//                 ${htmlAnhBG}

//                 <!-- NÚT LƯU BÀI GIẢNG (ẨN MẶC ĐỊNH, CHỈ HIỆN KHI CÓ THAY ĐỔI) -->
//                 <div id="btn-luu-card-${nk.id}" style="display: none; margin-top: 15px; text-align: right; border-top: 1px dashed #007bff; padding-top: 10px;">
//                     <button class="btn-luu-bai-giang-moi" data-id="${nk.id}" style="background: #28a745; color: white; border: none; padding: 8px 20px; border-radius: 4px; font-weight: bold; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">💾 Lưu bài giảng</button>
//                 </div>
//             `;

//             let cacSuKienCuaTiet = dsSuKien ? dsSuKien.filter(sk => sk.id_nhat_ky === nk.id) : [];
//             let vangMat = cacSuKienCuaTiet.filter(sk => sk.loai_the === 'Vắng mặt');
//             let suKienKhac = cacSuKienCuaTiet.filter(sk => sk.loai_the !== 'Vắng mặt');
//             let tongSoSuKienTiet = vangMat.length + suKienKhac.length;

//             let htmlSuKien = '';
//             if (tongSoSuKienTiet > 0) {
//                 if (vangMat.length > 0) {
//                     htmlSuKien += `<div style="margin-top: 10px;">
//                                     <strong style="color: #dc3545; font-size: 13px;">❌ Vắng mặt (${vangMat.length}):</strong>
//                                     <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 5px;">`;
//                     vangMat.forEach(v => {
//                         htmlSuKien += `
//                             <span style="display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; background: #f8d7da; color: #721c24; border-radius: 20px; font-size: 12px; font-weight: bold; border: 1px solid #f5c6cb;">
//                                 ${v.ten_hoc_sinh} 
//                                 <span onclick="ham_20_17_xoa_su_kien_chi_tiet('${v.id}')" style="cursor: pointer; font-size: 11px; color: #dc3545;" title="Xóa học sinh này">✖</span>
//                             </span>`;
//                     });
//                     htmlSuKien += `</div></div>`;
//                 }

//                 if (suKienKhac.length > 0) {
//                     htmlSuKien += `<div style="margin-top: 15px;">
//                                     <strong style="color: #d35400; font-size: 13px;">🎯 Sự kiện ghi nhận (${suKienKhac.length}):</strong>
//                                     <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 8px;">`;
//                     suKienKhac.forEach(sk => {
//                         let textGC = sk.ghi_chu ? ` - <i>${sk.ghi_chu}</i>` : '';
//                         let mauThe = sk.thong_tin_mo_rong?.mau_sac || '#fd7e14';

//                         let htmlAnhMC = '';
//                         if (sk.thong_tin_mo_rong && sk.thong_tin_mo_rong.danh_sach_anh_minh_chung) {
//                             let dsMC = sk.thong_tin_mo_rong.danh_sach_anh_minh_chung;
//                             let mangMC = Array.isArray(dsMC) ? dsMC : dsMC.split(',').filter(l => l.trim());
//                             if (mangMC.length > 0) {
//                                 htmlAnhMC = `<div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 5px; padding-left: 10px; border-left: 2px solid ${mauThe};">`;
//                                 mangMC.forEach((linkMC, idxMC) => {
//                                     htmlAnhMC += `
//                                         <div style="position: relative; display: inline-block;">
//                                             <a href="${linkMC}" target="_blank">
//                                                 <img src="${taoLinkAnhPreview(linkMC)}" loading="lazy" style="height: 40px; width: 40px; object-fit: cover; border-radius: 4px; border: 1px solid #ccc; background: #fff; display: block;">
//                                             </a>
//                                             <button onclick="ham_20_20_xoa_anh_minh_chung('${sk.id}', ${idxMC})" style="position: absolute; top: -5px; right: -5px; background: #dc3545; color: white; border: none; border-radius: 50%; width: 16px; height: 16px; font-size: 9px; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center;" title="Xóa ảnh minh chứng này">×</button>
//                                         </div>`;
//                                 });
//                                 htmlAnhMC += `</div>`;
//                             }
//                         }

//                         htmlSuKien += `
//                             <div style="display: flex; justify-content: space-between; align-items: center; background: #fff; border: 1px solid #eee; padding: 8px 12px; border-radius: 6px; box-shadow: 0 1px 2px rgba(0,0,0,0.02); border-left: 4px solid ${mauThe};">
//                                 <div>
//                                     <b style="font-size: 13px;">${sk.ten_hoc_sinh}</b>: 
//                                     <span style="color: ${mauThe}; font-weight: bold; font-size: 12px;">[${sk.loai_the}]</span>
//                                     <span style="font-size: 12px; color: #555;">${textGC}</span>
//                                     ${htmlAnhMC}
//                                 </div>
//                                 <button onclick="ham_20_17_xoa_su_kien_chi_tiet('${sk.id}')" style="background: #f8d7da; color: #721c24; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: bold;" title="Xóa sự kiện này">🗑️ Xóa</button>
//                             </div>`;
//                     });
//                     htmlSuKien += `</div></div>`;
//                 }
//             }

//             let styleBaiGiang = isTimHocSinh ? 'display: none;' : 'display: block;';
//             let labelBaiGiang = isTimHocSinh ? '👁️ Xem chi tiết bài giảng' : '🔽 Thu gọn bài giảng';
//             let styleSuKien = isTimHocSinh ? 'display: block;' : 'display: none;';
//             let labelSuKien = isTimHocSinh ? `🔽 Thu gọn sự kiện (${tongSoSuKienTiet})` : `👁️ Xem sự kiện & điểm danh (${tongSoSuKienTiet})`;

//             htmlRender += `
//                 <div style="background: #fff; border: 1px solid #ced4da; border-radius: 8px; box-shadow: 0 3px 6px rgba(0,0,0,0.05); padding: 20px; animation: slideUp 0.4s ease-out;">
                    
//                     <div style="margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 12px;">
//                         <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
//                             <span style="background: #007bff; color: white; padding: 5px 12px; border-radius: 4px; font-weight: bold; font-size: 13px;">🏫 ${tenLopHienThi}</span>
//                             <span style="background: #17a2b8; color: white; padding: 5px 12px; border-radius: 4px; font-weight: bold; font-size: 13px;">🏷️ ${nk.phan_mon || 'Không rõ môn'}</span>
//                             <span style="color: #6c757d; font-size: 13px; font-weight: bold;">🕒 ${nk.tiet} - ${nk.buoi} - ${thuHienTai}, Ngày ${strNgay}</span>
                            
//                             <button onclick="ham_20_18_xoa_nguyen_tiet('${nk.id}')" style="margin-left: auto; background: #dc3545; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-weight: bold; font-size: 12px;" title="Xóa toàn bộ tiết học">🗑️ Xóa tiết</button>
//                         </div>
//                     </div>

//                     <div style="margin-bottom: 15px;">
//                         <div style="margin-bottom: 8px;">
//                             <div onclick="let c = document.getElementById('bg-${nk.id}'); if(c.style.display === 'none') { c.style.display = 'block'; this.innerHTML = '🔽 Thu gọn bài giảng'; } else { c.style.display = 'none'; this.innerHTML = '👁️ Xem chi tiết bài giảng'; }" style="color: #007bff; font-size: 13px; font-weight: bold; cursor: pointer; display: inline-block; user-select: none;">
//                                 ${labelBaiGiang}
//                             </div>
//                         </div>

//                         <div id="bg-${nk.id}" style="${styleBaiGiang} padding-left: 10px; border-left: 3px solid #e9ecef;">
//                             ${htmlBaiGiang}
//                         </div>
//                     </div>
                    
//                     ${tongSoSuKienTiet > 0 ? `
//                         <div style="border-top: 1px dashed #ccc; padding-top: 10px;">
//                             <div onclick="let c = document.getElementById('sk-${nk.id}'); if(c.style.display === 'none') { c.style.display = 'block'; this.innerHTML = '🔽 Thu gọn sự kiện (${tongSoSuKienTiet})'; } else { c.style.display = 'none'; this.innerHTML = '👁️ Xem sự kiện & điểm danh (${tongSoSuKienTiet})'; }" style="color: #d35400; font-size: 13px; font-weight: bold; cursor: pointer; display: inline-block; user-select: none; margin-bottom: 8px;">
//                                 ${labelSuKien}
//                             </div>
//                             <div id="sk-${nk.id}" style="${styleSuKien} padding-left: 10px; border-left: 3px solid #ffeeba; background: #fafafa; padding: 10px; border-radius: 4px;">
//                                 ${htmlSuKien}
//                             </div>
//                         </div>
//                     ` : `
//                         <div style="border-top: 1px dashed #ccc; padding-top: 10px; font-size: 12px; color: #28a745; font-style: italic;">
//                             ✅ Lớp học ngoan, không có học sinh vắng hoặc vi phạm trong tiết này.
//                         </div>
//                     `}
//                 </div>
//             `;
//         });

//         vungKetQua.innerHTML = htmlRender;

//         // 🌟 LẮNG NGHE SỰ KIỆN LƯU KHI BẤM NÚT LƯU BÀI GIẢNG XUẤT HIỆN TRÊN THẺ
//         document.querySelectorAll('.btn-luu-bai-giang-moi').forEach(btn => {
//             btn.addEventListener('click', async function () {
//                 let id = this.dataset.id;
//                 let tenBaiMoi = document.getElementById(`input-tenbai-${id}`).value.trim();
//                 let lyThuyetMoi = document.getElementById(`input-lythuyet-${id}`).value.trim();
//                 let baiTapMoi = document.getElementById(`input-baitap-${id}`).value.trim();
//                 let danDoMoi = document.getElementById(`input-dando-${id}`).value.trim();

//                 this.innerText = "⏳ Đang lưu...";
//                 this.disabled = true;

//                 try {
//                     const { error } = await _supabase
//                         .from('nhat_ky_day_hoc')
//                         .update({ ten_bai: tenBaiMoi, ly_thuyet: lyThuyetMoi, bai_tap: baiTapMoi, dan_do: danDoMoi })
//                         .eq('id', id);

//                     if (error) throw error;

//                     // Cập nhật lại giao diện tĩnh ngay lập tức
//                     document.getElementById(`label-tenbai-${id}`).innerText = `📖 Bài học: ${tenBaiMoi || '(Chưa có tên bài)'}`;
//                     document.getElementById(`label-lythuyet-${id}`).innerHTML = lyThuyetMoi || '<i>(Không ghi chú)</i>';
//                     document.getElementById(`label-baitap-${id}`).innerHTML = baiTapMoi || '<i>(Không ghi chú)</i>';
//                     document.getElementById(`label-dando-${id}`).innerHTML = danDoMoi || '<i>(Không có)</i>';

//                     // Ẩn các ô input và ẩn nút Lưu
//                     document.getElementById(`input-tenbai-${id}`).style.display = 'none';
//                     document.getElementById(`input-lythuyet-${id}`).style.display = 'none';
//                     document.getElementById(`input-baitap-${id}`).style.display = 'none';
//                     document.getElementById(`input-dando-${id}`).style.display = 'none';
//                     document.getElementById(`btn-luu-card-${id}`).style.display = 'none';

//                     alert("✅ Đã cập nhật bài giảng thành công!");
//                 } catch (err) {
//                     console.error("Lỗi cập nhật:", err);
//                     alert("❌ Không thể lưu thay đổi!");
//                 } finally {
//                     this.innerText = "💾 Lưu bài giảng";
//                     this.disabled = false;
//                 }
//             });
//         });

//     } catch (err) {
//         console.error("Lỗi tra cứu:", err);
//         vungKetQua.innerHTML = `<div style="text-align: center; color: red; padding: 20px;"><b>❌ Lỗi khi tải dữ liệu! Vui lòng thử lại.</b></div>`;
//     } finally {
//         btnLoc.innerHTML = textGoc;
//         btnLoc.disabled = false;
//     }
// };


// // =======================================================
// // HÀM 20.15: TRA CỨU & SỬA TỪNG PHẦN BÀI GIẢNG (CÓ NÚT LƯU ĐỘNG)
// // =======================================================
// window.ham_20_15_thuc_hien_tra_cuu = async function (btnLoc) {
//     const vungKetQua = document.getElementById('tc-khu-vuc-ket-qua');

//     let tuNgay = document.getElementById('tc-tu-ngay').value;
//     let denNgay = document.getElementById('tc-den-ngay').value;

//     let rawMon = document.getElementById('tc-input-mon').value.trim();
//     let rawLop = document.getElementById('tc-input-lop').value.trim();
//     let maLopLuu = rawLop.match(/\(([^)]+)\)$/) ? rawLop.match(/\(([^)]+)\)$/)[1].trim() : rawLop;

//     let rawHS = document.getElementById('tc-input-hs').value.trim();
//     let tenHsTimKiem = rawHS.split(' - ')[0].trim().toLowerCase();

//     let isTimHocSinh = tenHsTimKiem !== '';

//     if (!tuNgay || !denNgay) {
//         alert("⚠️ Vui lòng chọn đủ mốc thời gian Từ ngày - Đến ngày!");
//         return;
//     }

//     const textGoc = btnLoc.innerHTML;
//     btnLoc.innerHTML = "⏳ ĐANG TÌM KIẾM...";
//     btnLoc.disabled = true;
//     vungKetQua.innerHTML = `<div style="text-align: center; color: #007bff; padding: 20px;"><b>⏳ Đang tải dữ liệu từ máy chủ...</b></div>`;

//     try {
//         const taoLinkAnhPreview = (url) => {
//             if (!url) return '';
//             let fileId = '';
//             let matchD = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
//             let matchId = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
//             let matchOpen = url.match(/\/open\?id=([a-zA-Z0-9_-]+)/);
//             if (matchD) fileId = matchD[1];
//             else if (matchId) fileId = matchId[1];
//             else if (matchOpen) fileId = matchOpen[1];
//             return fileId ? `https://lh3.googleusercontent.com/d/${fileId}` : url;
//         };

//         let queryNhatKy = _supabase.from('nhat_ky_day_hoc').select('*').gte('ngay_day', tuNgay).lte('ngay_day', denNgay).order('ngay_day', { ascending: false }).order('tiet', { ascending: true });
//         if (maLopLuu) queryNhatKy = queryNhatKy.eq('ma_lop', maLopLuu);
//         if (rawMon) queryNhatKy = queryNhatKy.ilike('phan_mon', `%${rawMon}%`);

//         let { data: dsNhatKy, error: err1 } = await queryNhatKy;
//         if (err1) throw err1;

//         if (!dsNhatKy || dsNhatKy.length === 0) {
//             vungKetQua.innerHTML = `<div style="text-align: center; color: #dc3545; padding: 20px;"><b>Không tìm thấy tiết dạy nào khớp với bộ lọc!</b></div>`;
//             return;
//         }

//         let mangIdNhatKy = dsNhatKy.map(nk => nk.id);
//         let { data: dsSuKien, error: err2 } = await _supabase.from('nhat_ky_su_kien_hs').select('*').in('id_nhat_ky', mangIdNhatKy);
//         if (err2) throw err2;

//         let htmlRender = '';

//         if (isTimHocSinh) {
//             dsSuKien = dsSuKien ? dsSuKien.filter(sk => sk.ten_hoc_sinh && sk.ten_hoc_sinh.toLowerCase().includes(tenHsTimKiem)) : [];
//             if (dsSuKien.length === 0) {
//                 vungKetQua.innerHTML = `<div style="text-align: center; color: #28a745; padding: 20px; font-size: 16px;"><b>🎉 Tuyệt vời! Học sinh này không có vi phạm hay vắng mặt nào trong thời gian này!</b></div>`;
//                 return;
//             }
//             let idNhatKyCoHS = new Set(dsSuKien.map(sk => sk.id_nhat_ky));
//             dsNhatKy = dsNhatKy.filter(nk => idNhatKyCoHS.has(nk.id));

//             let tongVang = dsSuKien.filter(sk => sk.loai_the === 'Vắng mặt').length;
//             let tongViPham = dsSuKien.length - tongVang;
//             let tenThat = dsSuKien[0].ten_hoc_sinh;

//             htmlRender += `
//                 <div style="background: #e0f3ff; border: 1px solid #b8daff; border-left: 5px solid #007bff; border-radius: 8px; padding: 15px; margin-bottom: 25px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
//                     <h4 style="margin: 0 0 12px 0; color: #0056b3; font-size: 16px;">📊 TỔNG QUAN HỌC SINH: <span style="text-transform: uppercase;">${tenThat}</span></h4>
//                     <div style="display: flex; gap: 15px; flex-wrap: wrap;">
//                         <span style="background: #fff; border: 1px solid #f5c6cb; color: #721c24; padding: 8px 15px; border-radius: 6px; font-weight: bold; font-size: 14px;">
//                             ❌ Tổng vắng mặt: <span style="font-size: 16px; color: red;">${tongVang}</span> tiết
//                         </span>
//                         <span style="background: #fff; border: 1px solid #ffeeba; color: #d35400; padding: 8px 15px; border-radius: 6px; font-weight: bold; font-size: 14px;">
//                             🎯 Tổng sự kiện khác: <span style="font-size: 16px; color: #d35400;">${tongViPham}</span> lần
//                         </span>
//                     </div>
//                 </div>
//             `;
//         }

//         let mapLop = {};
//         const cacOptionLop = document.querySelectorAll('#dl-lop option');
//         cacOptionLop.forEach(opt => {
//             let val = opt.value;
//             let match = val.match(/^(.*?)\s*\(([^)]+)\)$/);
//             if (match) mapLop[match[2].trim()] = val;
//             else mapLop[val] = val;
//         });

//         const tenCacThu = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];

//         dsNhatKy.forEach(nk => {
//             let dateObj = new Date(nk.ngay_day);
//             let strNgay = `${String(dateObj.getDate()).padStart(2, '0')}/${String(dateObj.getMonth() + 1).padStart(2, '0')}/${dateObj.getFullYear()}`;
//             let thuHienTai = tenCacThu[dateObj.getDay()];
//             let tenLopHienThi = mapLop[nk.ma_lop] || `Lớp ${nk.ma_lop}`;

//             // --- XỬ LÝ ẢNH BÀI GIẢNG (CÓ NÚT XÓA) ---
//             let mangAnhBG = [];
//             if (Array.isArray(nk.danh_sach_anh)) mangAnhBG = nk.danh_sach_anh;
//             else if (typeof nk.danh_sach_anh === 'string' && nk.danh_sach_anh.length > 5) {
//                 try { mangAnhBG = JSON.parse(nk.danh_sach_anh); }
//                 catch (e) { mangAnhBG = nk.danh_sach_anh.split(',').filter(l => l.trim()); }
//             }

//             let htmlAnhBG = '';
//             if (mangAnhBG.length > 0) {
//                 htmlAnhBG = `<div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 10px; padding: 10px; background: #e0f7fa; border-radius: 6px;">`;
//                 mangAnhBG.forEach((link, idx) => {
//                     htmlAnhBG += `
//                         <div style="position: relative; display: inline-block;">
//                             <a href="${link}" target="_blank" title="Bấm để xem ảnh gốc">
//                                 <img src="${taoLinkAnhPreview(link)}" loading="lazy" style="height: 80px; width: 80px; object-fit: cover; border-radius: 4px; border: 2px solid #00acc1; box-shadow: 0 2px 4px rgba(0,0,0,0.1); background: #fff; display: block;">
//                             </a>
//                             <button onclick="ham_20_19_xoa_anh_bai_giang('${nk.id}', ${idx})" style="position: absolute; top: -6px; right: -6px; background: #dc3545; color: white; border: none; border-radius: 50%; width: 20px; height: 20px; font-size: 11px; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 1px 3px rgba(0,0,0,0.3);" title="Xóa ảnh này">×</button>
//                         </div>`;
//                 });
//                 htmlAnhBG += `</div>`;
//             }

//             // --- NỘI DUNG BÀI GIẢNG VỚI NÚT SỬA TỪNG PHẦN & INPUT ẨN HIỆN LOGIC MỚI ---
//             // Quy tắc: Khi bấm nút Sửa -> Ẩn thẻ div chứa text -> Hiện thẻ input/textarea -> Hiện nút Lưu tổng
//             let htmlBaiGiang = `
//                 <!-- KHỐI TÊN BÀI -->
//                 <div style="margin-bottom: 12px; border-bottom: 1px dashed #eee; padding-bottom: 8px;">
//                     <div style="display: flex; justify-content: space-between; align-items: center;">
//                         <span style="font-size: 16px; font-weight: bold; color: #0056b3;" id="label-tenbai-${nk.id}">📖 Bài học: ${nk.ten_bai || '(Chưa có tên bài)'}</span>
//                         <button onclick="document.getElementById('label-tenbai-${nk.id}').style.display='none'; document.getElementById('input-tenbai-${nk.id}').style.display='block'; document.getElementById('btn-luu-card-${nk.id}').style.display='block'; this.style.display='none';" id="btn-sua-tenbai-${nk.id}" style="background: #ffc107; border: none; padding: 2px 8px; border-radius: 4px; font-size: 11px; cursor: pointer; font-weight: bold;">✏️ Sửa</button>
//                     </div>
//                     <input id="input-tenbai-${nk.id}" type="text" value="${nk.ten_bai || ''}" style="display:none; width:100%; margin-top:5px; padding:8px; border:2px solid #007bff; border-radius:4px; font-weight:bold; font-size: 15px;">
//                 </div>

//                 <!-- KHỐI LÝ THUYẾT -->
//                 <div style="margin-bottom: 12px;">
//                     <div style="display: flex; justify-content: space-between; align-items: center;">
//                         <b style="color: #333;">📘 Nội dung chủ đề / Lý thuyết:</b>
//                         <button onclick="document.getElementById('label-lythuyet-${nk.id}').style.display='none'; document.getElementById('input-lythuyet-${nk.id}').style.display='block'; document.getElementById('btn-luu-card-${nk.id}').style.display='block'; this.style.display='none';" id="btn-sua-lythuyet-${nk.id}" style="background: #ffc107; border: none; padding: 2px 8px; border-radius: 4px; font-size: 11px; cursor: pointer; font-weight: bold;">✏️ Sửa</button>
//                     </div>
//                     <div style="font-size: 14px; color: #212529; line-height: 1.5; white-space: pre-wrap; margin-top: 5px; padding-left: 5px;" id="label-lythuyet-${nk.id}">${nk.ly_thuyet || '<i>(Không ghi chú)</i>'}</div>
//                     <textarea id="input-lythuyet-${nk.id}" style="display:none; width:100%; margin-top:5px; padding:8px; border:2px solid #007bff; border-radius:4px; min-height:60px; font-family: inherit;">${nk.ly_thuyet || ''}</textarea>
//                 </div>

//                 <!-- KHỐI BÀI TẬP -->
//                 <div style="margin-bottom: 12px;">
//                     <div style="display: flex; justify-content: space-between; align-items: center;">
//                         <b style="color: #333;">✏️ Bài tập đã giải & Bài tập về nhà:</b>
//                         <button onclick="document.getElementById('label-baitap-${nk.id}').style.display='none'; document.getElementById('input-baitap-${nk.id}').style.display='block'; document.getElementById('btn-luu-card-${nk.id}').style.display='block'; this.style.display='none';" id="btn-sua-baitap-${nk.id}" style="background: #ffc107; border: none; padding: 2px 8px; border-radius: 4px; font-size: 11px; cursor: pointer; font-weight: bold;">✏️ Sửa</button>
//                     </div>
//                     <div style="font-size: 14px; color: #212529; line-height: 1.5; white-space: pre-wrap; margin-top: 5px; padding-left: 5px;" id="label-baitap-${nk.id}">${nk.bai_tap || '<i>(Không ghi chú)</i>'}</div>
//                     <textarea id="input-baitap-${nk.id}" style="display:none; width:100%; margin-top:5px; padding:8px; border:2px solid #007bff; border-radius:4px; min-height:60px; font-family: inherit;">${nk.bai_tap || ''}</textarea>
//                 </div>

//                 <!-- KHỐI DẶN DÒ -->
//                 <div style="margin-bottom: 10px; background: #fff3cd; padding: 10px; border-radius: 4px; border-left: 4px solid #ffeeba;">
//                     <div style="display: flex; justify-content: space-between; align-items: center;">
//                         <b style="color: #856404;">📌 Dặn dò:</b>
//                         <button onclick="document.getElementById('label-dando-${nk.id}').style.display='none'; document.getElementById('input-dando-${nk.id}').style.display='block'; document.getElementById('btn-luu-card-${nk.id}').style.display='block'; this.style.display='none';" id="btn-sua-dando-${nk.id}" style="background: #ffc107; border: none; padding: 2px 8px; border-radius: 4px; font-size: 11px; cursor: pointer; font-weight: bold;">✏️ Sửa</button>
//                     </div>
//                     <div style="font-size: 14px; color: #856404; line-height: 1.5; white-space: pre-wrap; margin-top: 5px; padding-left: 5px;" id="label-dando-${nk.id}">${nk.dan_do || '<i>(Không có)</i>'}</div>
//                     <textarea id="input-dando-${nk.id}" style="display:none; width:100%; margin-top:5px; padding:8px; border:2px solid #007bff; border-radius:4px; min-height:40px; font-family: inherit;">${nk.dan_do || ''}</textarea>
//                 </div>

//                 ${htmlAnhBG}

//                 <!-- NÚT LƯU TỔNG (CHỈ HIỆN KHI BẤM ÍT NHẤT 1 NÚT SỬA) -->
//                 <div id="btn-luu-card-${nk.id}" style="display: none; margin-top: 15px; text-align: right; border-top: 1px dashed #007bff; padding-top: 12px;">
//                     <!-- Nút Hủy để khôi phục lại trạng thái Xem ban đầu -->
//                     <button onclick="
//                         document.getElementById('input-tenbai-${nk.id}').style.display='none'; document.getElementById('label-tenbai-${nk.id}').style.display='block'; document.getElementById('btn-sua-tenbai-${nk.id}').style.display='block';
//                         document.getElementById('input-lythuyet-${nk.id}').style.display='none'; document.getElementById('label-lythuyet-${nk.id}').style.display='block'; document.getElementById('btn-sua-lythuyet-${nk.id}').style.display='block';
//                         document.getElementById('input-baitap-${nk.id}').style.display='none'; document.getElementById('label-baitap-${nk.id}').style.display='block'; document.getElementById('btn-sua-baitap-${nk.id}').style.display='block';
//                         document.getElementById('input-dando-${nk.id}').style.display='none'; document.getElementById('label-dando-${nk.id}').style.display='block'; document.getElementById('btn-sua-dando-${nk.id}').style.display='block';
//                         document.getElementById('btn-luu-card-${nk.id}').style.display='none';
//                     " style="background: #6c757d; color: white; border: none; padding: 8px 15px; border-radius: 4px; font-weight: bold; cursor: pointer; margin-right: 8px;">❌ Hủy sửa</button>
                    
//                     <button class="btn-luu-bai-giang-moi" data-id="${nk.id}" style="background: #28a745; color: white; border: none; padding: 8px 25px; border-radius: 4px; font-weight: bold; cursor: pointer; box-shadow: 0 3px 6px rgba(0,0,0,0.15);">💾 Lưu thay đổi</button>
//                 </div>
//             `;

//             let cacSuKienCuaTiet = dsSuKien ? dsSuKien.filter(sk => sk.id_nhat_ky === nk.id) : [];
//             let vangMat = cacSuKienCuaTiet.filter(sk => sk.loai_the === 'Vắng mặt');
//             let suKienKhac = cacSuKienCuaTiet.filter(sk => sk.loai_the !== 'Vắng mặt');
//             let tongSoSuKienTiet = vangMat.length + suKienKhac.length;

//             let htmlSuKien = '';
//             if (tongSoSuKienTiet > 0) {
//                 if (vangMat.length > 0) {
//                     htmlSuKien += `<div style="margin-top: 10px;">
//                                     <strong style="color: #dc3545; font-size: 13px;">❌ Vắng mặt (${vangMat.length}):</strong>
//                                     <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 5px;">`;
//                     vangMat.forEach(v => {
//                         htmlSuKien += `
//                             <span style="display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; background: #f8d7da; color: #721c24; border-radius: 20px; font-size: 12px; font-weight: bold; border: 1px solid #f5c6cb;">
//                                 ${v.ten_hoc_sinh} 
//                                 <span onclick="ham_20_17_xoa_su_kien_chi_tiet('${v.id}')" style="cursor: pointer; font-size: 11px; color: #dc3545;" title="Xóa học sinh này">✖</span>
//                             </span>`;
//                     });
//                     htmlSuKien += `</div></div>`;
//                 }

//                 if (suKienKhac.length > 0) {
//                     htmlSuKien += `<div style="margin-top: 15px;">
//                                     <strong style="color: #d35400; font-size: 13px;">🎯 Sự kiện ghi nhận (${suKienKhac.length}):</strong>
//                                     <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 8px;">`;
//                     suKienKhac.forEach(sk => {
//                         let textGC = sk.ghi_chu ? ` - <i>${sk.ghi_chu}</i>` : '';
//                         let mauThe = sk.thong_tin_mo_rong?.mau_sac || '#fd7e14';

//                         let badgeDiem = '';
//                         if (sk.loai_the === 'Cho điểm' && sk.thong_tin_mo_rong?.diem_so) {
//                             badgeDiem = `<span style="background: #28a745; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold; font-size: 11px; margin-right: 5px;">⭐ ${sk.thong_tin_mo_rong.diem_so} điểm</span>`;
//                         }

//                         let htmlAnhMC = '';
//                         if (sk.thong_tin_mo_rong && sk.thong_tin_mo_rong.danh_sach_anh_minh_chung) {
//                             let dsMC = sk.thong_tin_mo_rong.danh_sach_anh_minh_chung;
//                             let mangMC = Array.isArray(dsMC) ? dsMC : dsMC.split(',').filter(l => l.trim());
//                             if (mangMC.length > 0) {
//                                 htmlAnhMC = `<div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 5px; padding-left: 10px; border-left: 2px solid ${mauThe};">`;
//                                 mangMC.forEach((linkMC, idxMC) => {
//                                     htmlAnhMC += `
//                                         <div style="position: relative; display: inline-block;">
//                                             <a href="${linkMC}" target="_blank">
//                                                 <img src="${taoLinkAnhPreview(linkMC)}" loading="lazy" style="height: 40px; width: 40px; object-fit: cover; border-radius: 4px; border: 1px solid #ccc; background: #fff; display: block;">
//                                             </a>
//                                             <button onclick="ham_20_20_xoa_anh_minh_chung('${sk.id}', ${idxMC})" style="position: absolute; top: -5px; right: -5px; background: #dc3545; color: white; border: none; border-radius: 50%; width: 16px; height: 16px; font-size: 9px; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center;" title="Xóa ảnh minh chứng này">×</button>
//                                         </div>`;
//                                 });
//                                 htmlAnhMC += `</div>`;
//                             }
//                         }

//                         htmlSuKien += `
//                             <div style="display: flex; justify-content: space-between; align-items: center; background: #fff; border: 1px solid #eee; padding: 8px 12px; border-radius: 6px; box-shadow: 0 1px 2px rgba(0,0,0,0.02); border-left: 4px solid ${mauThe};">
//                                 <div>
//                                     <b style="font-size: 13px;">${sk.ten_hoc_sinh}</b>: 
//                                     ${badgeDiem}
//                                     <span style="color: ${mauThe}; font-weight: bold; font-size: 12px;">[${sk.loai_the}]</span>
//                                     <span style="font-size: 12px; color: #555;">${textGC}</span>
//                                     ${htmlAnhMC}
//                                 </div>
//                                 <button onclick="ham_20_17_xoa_su_kien_chi_tiet('${sk.id}')" style="background: #f8d7da; color: #721c24; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: bold;" title="Xóa sự kiện này">🗑️ Xóa</button>
//                             </div>`;
//                     });
//                     htmlSuKien += `</div></div>`;
//                 }
//             }

//             let styleBaiGiang = isTimHocSinh ? 'display: none;' : 'display: block;';
//             let labelBaiGiang = isTimHocSinh ? '👁️ Xem chi tiết bài giảng' : '🔽 Thu gọn bài giảng';
//             let styleSuKien = isTimHocSinh ? 'display: block;' : 'display: none;';
//             let labelSuKien = isTimHocSinh ? `🔽 Thu gọn sự kiện (${tongSoSuKienTiet})` : `👁️ Xem sự kiện & điểm danh (${tongSoSuKienTiet})`;

//             htmlRender += `
//                 <div style="background: #fff; border: 1px solid #ced4da; border-radius: 8px; box-shadow: 0 3px 6px rgba(0,0,0,0.05); padding: 20px; animation: slideUp 0.4s ease-out;">
                    
//                     <div style="margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 12px;">
//                         <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
//                             <span style="background: #007bff; color: white; padding: 5px 12px; border-radius: 4px; font-weight: bold; font-size: 13px;">🏫 ${tenLopHienThi}</span>
//                             <span style="background: #17a2b8; color: white; padding: 5px 12px; border-radius: 4px; font-weight: bold; font-size: 13px;">🏷️ ${nk.phan_mon || 'Không rõ môn'}</span>
//                             <span style="color: #6c757d; font-size: 13px; font-weight: bold;">🕒 ${nk.tiet} - ${nk.buoi} - ${thuHienTai}, Ngày ${strNgay}</span>
                            
//                             <button onclick="ham_20_18_xoa_nguyen_tiet('${nk.id}')" style="margin-left: auto; background: #dc3545; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-weight: bold; font-size: 12px;" title="Xóa toàn bộ tiết học">🗑️ Xóa tiết</button>
//                         </div>
//                     </div>

//                     <div style="margin-bottom: 15px;">
//                         <div style="margin-bottom: 8px;">
//                             <div onclick="let c = document.getElementById('bg-${nk.id}'); if(c.style.display === 'none') { c.style.display = 'block'; this.innerHTML = '🔽 Thu gọn bài giảng'; } else { c.style.display = 'none'; this.innerHTML = '👁️ Xem chi tiết bài giảng'; }" style="color: #007bff; font-size: 13px; font-weight: bold; cursor: pointer; display: inline-block; user-select: none;">
//                                 ${labelBaiGiang}
//                             </div>
//                         </div>

//                         <div id="bg-${nk.id}" style="${styleBaiGiang} padding-left: 10px; border-left: 3px solid #e9ecef;">
//                             ${htmlBaiGiang}
//                         </div>
//                     </div>
                    
//                     ${tongSoSuKienTiet > 0 ? `
//                         <div style="border-top: 1px dashed #ccc; padding-top: 10px;">
//                             <div onclick="let c = document.getElementById('sk-${nk.id}'); if(c.style.display === 'none') { c.style.display = 'block'; this.innerHTML = '🔽 Thu gọn sự kiện (${tongSoSuKienTiet})'; } else { c.style.display = 'none'; this.innerHTML = '👁️ Xem sự kiện & điểm danh (${tongSoSuKienTiet})'; }" style="color: #d35400; font-size: 13px; font-weight: bold; cursor: pointer; display: inline-block; user-select: none; margin-bottom: 8px;">
//                                 ${labelSuKien}
//                             </div>
//                             <div id="sk-${nk.id}" style="${styleSuKien} padding-left: 10px; border-left: 3px solid #ffeeba; background: #fafafa; padding: 10px; border-radius: 4px;">
//                                 ${htmlSuKien}
//                             </div>
//                         </div>
//                     ` : `
//                         <div style="border-top: 1px dashed #ccc; padding-top: 10px; font-size: 12px; color: #28a745; font-style: italic;">
//                             ✅ Lớp học ngoan, không có học sinh vắng hoặc vi phạm trong tiết này.
//                         </div>
//                     `}
//                 </div>
//             `;
//         });

//         vungKetQua.innerHTML = htmlRender;

//         // 🌟 LẮNG NGHE SỰ KIỆN LƯU KHI BẤM NÚT LƯU BÀI GIẢNG
//         document.querySelectorAll('.btn-luu-bai-giang-moi').forEach(btn => {
//             btn.addEventListener('click', async function () {
//                 let id = this.dataset.id;
//                 let tenBaiMoi = document.getElementById(`input-tenbai-${id}`).value.trim();
//                 let lyThuyetMoi = document.getElementById(`input-lythuyet-${id}`).value.trim();
//                 let baiTapMoi = document.getElementById(`input-baitap-${id}`).value.trim();
//                 let danDoMoi = document.getElementById(`input-dando-${id}`).value.trim();

//                 this.innerText = "⏳ Đang lưu...";
//                 this.disabled = true;

//                 try {
//                     const { error } = await _supabase
//                         .from('nhat_ky_day_hoc')
//                         .update({ ten_bai: tenBaiMoi, ly_thuyet: lyThuyetMoi, bai_tap: baiTapMoi, dan_do: danDoMoi })
//                         .eq('id', id);

//                     if (error) throw error;

//                     // Cập nhật lại Text tĩnh
//                     document.getElementById(`label-tenbai-${id}`).innerText = `📖 Bài học: ${tenBaiMoi || '(Chưa có tên bài)'}`;
//                     document.getElementById(`label-lythuyet-${id}`).innerHTML = lyThuyetMoi || '<i>(Không ghi chú)</i>';
//                     document.getElementById(`label-baitap-${id}`).innerHTML = baiTapMoi || '<i>(Không ghi chú)</i>';
//                     document.getElementById(`label-dando-${id}`).innerHTML = danDoMoi || '<i>(Không có)</i>';

//                     // Ẩn Input, Hiện lại Text
//                     document.getElementById(`input-tenbai-${id}`).style.display = 'none'; document.getElementById(`label-tenbai-${id}`).style.display = 'block'; document.getElementById(`btn-sua-tenbai-${id}`).style.display = 'block';
//                     document.getElementById(`input-lythuyet-${id}`).style.display = 'none'; document.getElementById(`label-lythuyet-${id}`).style.display = 'block'; document.getElementById(`btn-sua-lythuyet-${id}`).style.display = 'block';
//                     document.getElementById(`input-baitap-${id}`).style.display = 'none'; document.getElementById(`label-baitap-${id}`).style.display = 'block'; document.getElementById(`btn-sua-baitap-${id}`).style.display = 'block';
//                     document.getElementById(`input-dando-${id}`).style.display = 'none'; document.getElementById(`label-dando-${id}`).style.display = 'block'; document.getElementById(`btn-sua-dando-${id}`).style.display = 'block';

//                     // Ẩn nút lưu
//                     document.getElementById(`btn-luu-card-${id}`).style.display = 'none';

//                     alert("✅ Đã cập nhật bài giảng thành công!");
//                 } catch (err) {
//                     console.error("Lỗi cập nhật:", err);
//                     alert("❌ Không thể lưu thay đổi!");
//                 } finally {
//                     this.innerText = "💾 Lưu thay đổi";
//                     this.disabled = false;
//                 }
//             });
//         });

//     } catch (err) {
//         console.error("Lỗi tra cứu:", err);
//         vungKetQua.innerHTML = `<div style="text-align: center; color: red; padding: 20px;"><b>❌ Lỗi khi tải dữ liệu! Vui lòng thử lại.</b></div>`;
//     } finally {
//         btnLoc.innerHTML = textGoc;
//         btnLoc.disabled = false;
//     }
// };


// // =======================================================
// // HÀM 20.15: TRA CỨU & SỬA TỪNG PHẦN BÀI GIẢNG (CÓ CHUẨN HÓA CHỮ TIẾT)
// // =======================================================
// window.ham_20_15_thuc_hien_tra_cuu = async function (btnLoc) {
//     const vungKetQua = document.getElementById('tc-khu-vuc-ket-qua');

//     let tuNgay = document.getElementById('tc-tu-ngay').value;
//     let denNgay = document.getElementById('tc-den-ngay').value;

//     let rawMon = document.getElementById('tc-input-mon').value.trim();
//     let rawLop = document.getElementById('tc-input-lop').value.trim();
//     let maLopLuu = rawLop.match(/\(([^)]+)\)$/) ? rawLop.match(/\(([^)]+)\)$/)[1].trim() : rawLop;

//     let rawHS = document.getElementById('tc-input-hs').value.trim();
//     let tenHsTimKiem = rawHS.split(' - ')[0].trim().toLowerCase();

//     let isTimHocSinh = tenHsTimKiem !== '';

//     if (!tuNgay || !denNgay) {
//         alert("⚠️ Vui lòng chọn đủ mốc thời gian Từ ngày - Đến ngày!");
//         return;
//     }

//     const textGoc = btnLoc.innerHTML;
//     btnLoc.innerHTML = "⏳ ĐANG TÌM KIẾM...";
//     btnLoc.disabled = true;
//     vungKetQua.innerHTML = `<div style="text-align: center; color: #007bff; padding: 20px;"><b>⏳ Đang tải dữ liệu từ máy chủ...</b></div>`;

//     try {
//         const taoLinkAnhPreview = (url) => {
//             if (!url) return '';
//             let fileId = '';
//             let matchD = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
//             let matchId = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
//             let matchOpen = url.match(/\/open\?id=([a-zA-Z0-9_-]+)/);
//             if (matchD) fileId = matchD[1];
//             else if (matchId) fileId = matchId[1];
//             else if (matchOpen) fileId = matchOpen[1];
//             return fileId ? `https://lh3.googleusercontent.com/d/${fileId}` : url;
//         };

//         let queryNhatKy = _supabase.from('nhat_ky_day_hoc').select('*').gte('ngay_day', tuNgay).lte('ngay_day', denNgay).order('ngay_day', { ascending: false }).order('tiet', { ascending: true });
//         if (maLopLuu) queryNhatKy = queryNhatKy.eq('ma_lop', maLopLuu);
//         if (rawMon) queryNhatKy = queryNhatKy.ilike('phan_mon', `%${rawMon}%`);

//         let { data: dsNhatKy, error: err1 } = await queryNhatKy;
//         if (err1) throw err1;

//         if (!dsNhatKy || dsNhatKy.length === 0) {
//             vungKetQua.innerHTML = `<div style="text-align: center; color: #dc3545; padding: 20px;"><b>Không tìm thấy tiết dạy nào khớp với bộ lọc!</b></div>`;
//             return;
//         }

//         let mangIdNhatKy = dsNhatKy.map(nk => nk.id);
//         let { data: dsSuKien, error: err2 } = await _supabase.from('nhat_ky_su_kien_hs').select('*').in('id_nhat_ky', mangIdNhatKy);
//         if (err2) throw err2;

//         let htmlRender = '';

//         if (isTimHocSinh) {
//             dsSuKien = dsSuKien ? dsSuKien.filter(sk => sk.ten_hoc_sinh && sk.ten_hoc_sinh.toLowerCase().includes(tenHsTimKiem)) : [];
//             if (dsSuKien.length === 0) {
//                 vungKetQua.innerHTML = `<div style="text-align: center; color: #28a745; padding: 20px; font-size: 16px;"><b>🎉 Tuyệt vời! Học sinh này không có vi phạm hay vắng mặt nào trong thời gian này!</b></div>`;
//                 return;
//             }
//             let idNhatKyCoHS = new Set(dsSuKien.map(sk => sk.id_nhat_ky));
//             dsNhatKy = dsNhatKy.filter(nk => idNhatKyCoHS.has(nk.id));

//             let tongVang = dsSuKien.filter(sk => sk.loai_the === 'Vắng mặt').length;
//             let tongViPham = dsSuKien.length - tongVang;
//             let tenThat = dsSuKien[0].ten_hoc_sinh;

//             htmlRender += `
//                 <div style="background: #e0f3ff; border: 1px solid #b8daff; border-left: 5px solid #007bff; border-radius: 8px; padding: 15px; margin-bottom: 25px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
//                     <h4 style="margin: 0 0 12px 0; color: #0056b3; font-size: 16px;">📊 TỔNG QUAN HỌC SINH: <span style="text-transform: uppercase;">${tenThat}</span></h4>
//                     <div style="display: flex; gap: 15px; flex-wrap: wrap;">
//                         <span style="background: #fff; border: 1px solid #f5c6cb; color: #721c24; padding: 8px 15px; border-radius: 6px; font-weight: bold; font-size: 14px;">
//                             ❌ Tổng vắng mặt: <span style="font-size: 16px; color: red;">${tongVang}</span> tiết
//                         </span>
//                         <span style="background: #fff; border: 1px solid #ffeeba; color: #d35400; padding: 8px 15px; border-radius: 6px; font-weight: bold; font-size: 14px;">
//                             🎯 Tổng sự kiện khác: <span style="font-size: 16px; color: #d35400;">${tongViPham}</span> lần
//                         </span>
//                     </div>
//                 </div>
//             `;
//         }

//         let mapLop = {};
//         const cacOptionLop = document.querySelectorAll('#dl-lop option');
//         cacOptionLop.forEach(opt => {
//             let val = opt.value;
//             let match = val.match(/^(.*?)\s*\(([^)]+)\)$/);
//             if (match) mapLop[match[2].trim()] = val;
//             else mapLop[val] = val;
//         });

//         const tenCacThu = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];

//         dsNhatKy.forEach(nk => {
//             let dateObj = new Date(nk.ngay_day);
//             let strNgay = `${String(dateObj.getDate()).padStart(2, '0')}/${String(dateObj.getMonth() + 1).padStart(2, '0')}/${dateObj.getFullYear()}`;
//             let thuHienTai = tenCacThu[dateObj.getDay()];
//             let tenLopHienThi = mapLop[nk.ma_lop] || `Lớp ${nk.ma_lop}`;

//             // 🌟 CHUẨN HÓA CHỮ "TIẾT" ĐỂ HIỂN THỊ ĐẸP MẮT
//             let hienThiTiet = String(nk.tiet || '').trim();
//             if (!hienThiTiet.toLowerCase().startsWith('tiết')) {
//                 hienThiTiet = 'Tiết ' + hienThiTiet;
//             }

//             // --- XỬ LÝ ẢNH BÀI GIẢNG (CÓ NÚT XÓA) ---
//             let mangAnhBG = [];
//             if (Array.isArray(nk.danh_sach_anh)) mangAnhBG = nk.danh_sach_anh;
//             else if (typeof nk.danh_sach_anh === 'string' && nk.danh_sach_anh.length > 5) {
//                 try { mangAnhBG = JSON.parse(nk.danh_sach_anh); }
//                 catch (e) { mangAnhBG = nk.danh_sach_anh.split(',').filter(l => l.trim()); }
//             }

//             let htmlAnhBG = '';
//             if (mangAnhBG.length > 0) {
//                 htmlAnhBG = `<div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 10px; padding: 10px; background: #e0f7fa; border-radius: 6px;">`;
//                 mangAnhBG.forEach((link, idx) => {
//                     htmlAnhBG += `
//                         <div style="position: relative; display: inline-block;">
//                             <a href="${link}" target="_blank" title="Bấm để xem ảnh gốc">
//                                 <img src="${taoLinkAnhPreview(link)}" loading="lazy" style="height: 80px; width: 80px; object-fit: cover; border-radius: 4px; border: 2px solid #00acc1; box-shadow: 0 2px 4px rgba(0,0,0,0.1); background: #fff; display: block;">
//                             </a>
//                             <button onclick="ham_20_19_xoa_anh_bai_giang('${nk.id}', ${idx})" style="position: absolute; top: -6px; right: -6px; background: #dc3545; color: white; border: none; border-radius: 50%; width: 20px; height: 20px; font-size: 11px; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 1px 3px rgba(0,0,0,0.3);" title="Xóa ảnh này">×</button>
//                         </div>`;
//                 });
//                 htmlAnhBG += `</div>`;
//             }

//             // --- NỘI DUNG BÀI GIẢNG VỚI NÚT SỬA TỪNG PHẦN ---
//             let htmlBaiGiang = `
//                 <!-- KHỐI TÊN BÀI -->
//                 <div style="margin-bottom: 12px; border-bottom: 1px dashed #eee; padding-bottom: 8px;">
//                     <div style="display: flex; justify-content: space-between; align-items: center;">
//                         <span style="font-size: 16px; font-weight: bold; color: #0056b3;" id="label-tenbai-${nk.id}">📖 Bài học: ${nk.ten_bai || '(Chưa có tên bài)'}</span>
//                         <button onclick="document.getElementById('label-tenbai-${nk.id}').style.display='none'; document.getElementById('input-tenbai-${nk.id}').style.display='block'; document.getElementById('btn-luu-card-${nk.id}').style.display='block'; this.style.display='none';" id="btn-sua-tenbai-${nk.id}" style="background: #ffc107; border: none; padding: 2px 8px; border-radius: 4px; font-size: 11px; cursor: pointer; font-weight: bold;">✏️ Sửa</button>
//                     </div>
//                     <input id="input-tenbai-${nk.id}" type="text" value="${nk.ten_bai || ''}" style="display:none; width:100%; margin-top:5px; padding:8px; border:2px solid #007bff; border-radius:4px; font-weight:bold; font-size: 15px;">
//                 </div>

//                 <!-- KHỐI LÝ THUYẾT -->
//                 <div style="margin-bottom: 12px;">
//                     <div style="display: flex; justify-content: space-between; align-items: center;">
//                         <b style="color: #333;">📘 Nội dung chủ đề / Lý thuyết:</b>
//                         <button onclick="document.getElementById('label-lythuyet-${nk.id}').style.display='none'; document.getElementById('input-lythuyet-${nk.id}').style.display='block'; document.getElementById('btn-luu-card-${nk.id}').style.display='block'; this.style.display='none';" id="btn-sua-lythuyet-${nk.id}" style="background: #ffc107; border: none; padding: 2px 8px; border-radius: 4px; font-size: 11px; cursor: pointer; font-weight: bold;">✏️ Sửa</button>
//                     </div>
//                     <div style="font-size: 14px; color: #212529; line-height: 1.5; white-space: pre-wrap; margin-top: 5px; padding-left: 5px;" id="label-lythuyet-${nk.id}">${nk.ly_thuyet || '<i>(Không ghi chú)</i>'}</div>
//                     <textarea id="input-lythuyet-${nk.id}" style="display:none; width:100%; margin-top:5px; padding:8px; border:2px solid #007bff; border-radius:4px; min-height:60px; font-family: inherit;">${nk.ly_thuyet || ''}</textarea>
//                 </div>

//                 <!-- KHỐI BÀI TẬP -->
//                 <div style="margin-bottom: 12px;">
//                     <div style="display: flex; justify-content: space-between; align-items: center;">
//                         <b style="color: #333;">✏️ Bài tập đã giải & Bài tập về nhà:</b>
//                         <button onclick="document.getElementById('label-baitap-${nk.id}').style.display='none'; document.getElementById('input-baitap-${nk.id}').style.display='block'; document.getElementById('btn-luu-card-${nk.id}').style.display='block'; this.style.display='none';" id="btn-sua-baitap-${nk.id}" style="background: #ffc107; border: none; padding: 2px 8px; border-radius: 4px; font-size: 11px; cursor: pointer; font-weight: bold;">✏️ Sửa</button>
//                     </div>
//                     <div style="font-size: 14px; color: #212529; line-height: 1.5; white-space: pre-wrap; margin-top: 5px; padding-left: 5px;" id="label-baitap-${nk.id}">${nk.bai_tap || '<i>(Không ghi chú)</i>'}</div>
//                     <textarea id="input-baitap-${nk.id}" style="display:none; width:100%; margin-top:5px; padding:8px; border:2px solid #007bff; border-radius:4px; min-height:60px; font-family: inherit;">${nk.bai_tap || ''}</textarea>
//                 </div>

//                 <!-- KHỐI DẶN DÒ -->
//                 <div style="margin-bottom: 10px; background: #fff3cd; padding: 10px; border-radius: 4px; border-left: 4px solid #ffeeba;">
//                     <div style="display: flex; justify-content: space-between; align-items: center;">
//                         <b style="color: #856404;">📌 Dặn dò:</b>
//                         <button onclick="document.getElementById('label-dando-${nk.id}').style.display='none'; document.getElementById('input-dando-${nk.id}').style.display='block'; document.getElementById('btn-luu-card-${nk.id}').style.display='block'; this.style.display='none';" id="btn-sua-dando-${nk.id}" style="background: #ffc107; border: none; padding: 2px 8px; border-radius: 4px; font-size: 11px; cursor: pointer; font-weight: bold;">✏️ Sửa</button>
//                     </div>
//                     <div style="font-size: 14px; color: #856404; line-height: 1.5; white-space: pre-wrap; margin-top: 5px; padding-left: 5px;" id="label-dando-${nk.id}">${nk.dan_do || '<i>(Không có)</i>'}</div>
//                     <textarea id="input-dando-${nk.id}" style="display:none; width:100%; margin-top:5px; padding:8px; border:2px solid #007bff; border-radius:4px; min-height:40px; font-family: inherit;">${nk.dan_do || ''}</textarea>
//                 </div>

//                 ${htmlAnhBG}

//                 <!-- NÚT LƯU TỔNG -->
//                 <div id="btn-luu-card-${nk.id}" style="display: none; margin-top: 15px; text-align: right; border-top: 1px dashed #007bff; padding-top: 12px;">
//                     <button onclick="
//                         document.getElementById('input-tenbai-${nk.id}').style.display='none'; document.getElementById('label-tenbai-${nk.id}').style.display='block'; document.getElementById('btn-sua-tenbai-${nk.id}').style.display='block';
//                         document.getElementById('input-lythuyet-${nk.id}').style.display='none'; document.getElementById('label-lythuyet-${nk.id}').style.display='block'; document.getElementById('btn-sua-lythuyet-${nk.id}').style.display='block';
//                         document.getElementById('input-baitap-${nk.id}').style.display='none'; document.getElementById('label-baitap-${nk.id}').style.display='block'; document.getElementById('btn-sua-baitap-${nk.id}').style.display='block';
//                         document.getElementById('input-dando-${nk.id}').style.display='none'; document.getElementById('label-dando-${nk.id}').style.display='block'; document.getElementById('btn-sua-dando-${nk.id}').style.display='block';
//                         document.getElementById('btn-luu-card-${nk.id}').style.display='none';
//                     " style="background: #6c757d; color: white; border: none; padding: 8px 15px; border-radius: 4px; font-weight: bold; cursor: pointer; margin-right: 8px;">❌ Hủy sửa</button>
                    
//                     <button class="btn-luu-bai-giang-moi" data-id="${nk.id}" style="background: #28a745; color: white; border: none; padding: 8px 25px; border-radius: 4px; font-weight: bold; cursor: pointer; box-shadow: 0 3px 6px rgba(0,0,0,0.15);">💾 Lưu thay đổi</button>
//                 </div>
//             `;

//             let cacSuKienCuaTiet = dsSuKien ? dsSuKien.filter(sk => sk.id_nhat_ky === nk.id) : [];
//             let vangMat = cacSuKienCuaTiet.filter(sk => sk.loai_the === 'Vắng mặt');
//             let suKienKhac = cacSuKienCuaTiet.filter(sk => sk.loai_the !== 'Vắng mặt');
//             let tongSoSuKienTiet = vangMat.length + suKienKhac.length;

//             let htmlSuKien = '';
//             if (tongSoSuKienTiet > 0) {
//                 if (vangMat.length > 0) {
//                     htmlSuKien += `<div style="margin-top: 10px;">
//                                     <strong style="color: #dc3545; font-size: 13px;">❌ Vắng mặt (${vangMat.length}):</strong>
//                                     <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 5px;">`;
//                     vangMat.forEach(v => {
//                         htmlSuKien += `
//                             <span style="display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; background: #f8d7da; color: #721c24; border-radius: 20px; font-size: 12px; font-weight: bold; border: 1px solid #f5c6cb;">
//                                 ${v.ten_hoc_sinh} 
//                                 <span onclick="ham_20_17_xoa_su_kien_chi_tiet('${v.id}')" style="cursor: pointer; font-size: 11px; color: #dc3545;" title="Xóa học sinh này">✖</span>
//                             </span>`;
//                     });
//                     htmlSuKien += `</div></div>`;
//                 }

//                 if (suKienKhac.length > 0) {
//                     htmlSuKien += `<div style="margin-top: 15px;">
//                                     <strong style="color: #d35400; font-size: 13px;">🎯 Sự kiện ghi nhận (${suKienKhac.length}):</strong>
//                                     <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 8px;">`;
//                     suKienKhac.forEach(sk => {
//                         let textGC = sk.ghi_chu ? ` - <i>${sk.ghi_chu}</i>` : '';
//                         let mauThe = sk.thong_tin_mo_rong?.mau_sac || '#fd7e14';

//                         let badgeDiem = '';
//                         if (sk.loai_the === 'Cho điểm' && sk.thong_tin_mo_rong?.diem_so) {
//                             badgeDiem = `<span style="background: #28a745; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold; font-size: 11px; margin-right: 5px;">⭐ ${sk.thong_tin_mo_rong.diem_so} điểm</span>`;
//                         }

//                         let htmlAnhMC = '';
//                         if (sk.thong_tin_mo_rong && sk.thong_tin_mo_rong.danh_sach_anh_minh_chung) {
//                             let dsMC = sk.thong_tin_mo_rong.danh_sach_anh_minh_chung;
//                             let mangMC = Array.isArray(dsMC) ? dsMC : dsMC.split(',').filter(l => l.trim());
//                             if (mangMC.length > 0) {
//                                 htmlAnhMC = `<div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 5px; padding-left: 10px; border-left: 2px solid ${mauThe};">`;
//                                 mangMC.forEach((linkMC, idxMC) => {
//                                     htmlAnhMC += `
//                                         <div style="position: relative; display: inline-block;">
//                                             <a href="${linkMC}" target="_blank">
//                                                 <img src="${taoLinkAnhPreview(linkMC)}" loading="lazy" style="height: 40px; width: 40px; object-fit: cover; border-radius: 4px; border: 1px solid #ccc; background: #fff; display: block;">
//                                             </a>
//                                             <button onclick="ham_20_20_xoa_anh_minh_chung('${sk.id}', ${idxMC})" style="position: absolute; top: -5px; right: -5px; background: #dc3545; color: white; border: none; border-radius: 50%; width: 16px; height: 16px; font-size: 9px; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center;" title="Xóa ảnh minh chứng này">×</button>
//                                         </div>`;
//                                 });
//                                 htmlAnhMC += `</div>`;
//                             }
//                         }

//                         htmlSuKien += `
//                             <div style="display: flex; justify-content: space-between; align-items: center; background: #fff; border: 1px solid #eee; padding: 8px 12px; border-radius: 6px; box-shadow: 0 1px 2px rgba(0,0,0,0.02); border-left: 4px solid ${mauThe};">
//                                 <div>
//                                     <b style="font-size: 13px;">${sk.ten_hoc_sinh}</b>: 
//                                     ${badgeDiem}
//                                     <span style="color: ${mauThe}; font-weight: bold; font-size: 12px;">[${sk.loai_the}]</span>
//                                     <span style="font-size: 12px; color: #555;">${textGC}</span>
//                                     ${htmlAnhMC}
//                                 </div>
//                                 <button onclick="ham_20_17_xoa_su_kien_chi_tiet('${sk.id}')" style="background: #f8d7da; color: #721c24; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: bold;" title="Xóa sự kiện này">🗑️ Xóa</button>
//                             </div>`;
//                     });
//                     htmlSuKien += `</div></div>`;
//                 }
//             }

//             let styleBaiGiang = isTimHocSinh ? 'display: none;' : 'display: block;';
//             let labelBaiGiang = isTimHocSinh ? '👁️ Xem chi tiết bài giảng' : '🔽 Thu gọn bài giảng';
//             let styleSuKien = isTimHocSinh ? 'display: block;' : 'display: none;';
//             let labelSuKien = isTimHocSinh ? `🔽 Thu gọn sự kiện (${tongSoSuKienTiet})` : `👁️ Xem sự kiện & điểm danh (${tongSoSuKienTiet})`;

//             htmlRender += `
//                 <div style="background: #fff; border: 1px solid #ced4da; border-radius: 8px; box-shadow: 0 3px 6px rgba(0,0,0,0.05); padding: 20px; animation: slideUp 0.4s ease-out;">
                    
//                     <div style="margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 12px;">
//                         <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
//                             <span style="background: #007bff; color: white; padding: 5px 12px; border-radius: 4px; font-weight: bold; font-size: 13px;">🏫 ${tenLopHienThi}</span>
//                             <span style="background: #17a2b8; color: white; padding: 5px 12px; border-radius: 4px; font-weight: bold; font-size: 13px;">🏷️ ${nk.phan_mon || 'Không rõ môn'}</span>
                            
//                             <!-- BỔ SUNG BIẾN hienThiTiet VÀO ĐÂY ĐỂ HIỂN THỊ CHỮ "TIẾT" -->
//                             <span style="color: #6c757d; font-size: 13px; font-weight: bold;">🕒 ${hienThiTiet} - ${nk.buoi} - ${thuHienTai}, Ngày ${strNgay}</span>
                            
//                             <button onclick="ham_20_18_xoa_nguyen_tiet('${nk.id}')" style="margin-left: auto; background: #dc3545; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-weight: bold; font-size: 12px;" title="Xóa toàn bộ tiết học">🗑️ Xóa tiết</button>
//                         </div>
//                     </div>

//                     <div style="margin-bottom: 15px;">
//                         <div style="margin-bottom: 8px;">
//                             <div onclick="let c = document.getElementById('bg-${nk.id}'); if(c.style.display === 'none') { c.style.display = 'block'; this.innerHTML = '🔽 Thu gọn bài giảng'; } else { c.style.display = 'none'; this.innerHTML = '👁️ Xem chi tiết bài giảng'; }" style="color: #007bff; font-size: 13px; font-weight: bold; cursor: pointer; display: inline-block; user-select: none;">
//                                 ${labelBaiGiang}
//                             </div>
//                         </div>

//                         <div id="bg-${nk.id}" style="${styleBaiGiang} padding-left: 10px; border-left: 3px solid #e9ecef;">
//                             ${htmlBaiGiang}
//                         </div>
//                     </div>
                    
//                     ${tongSoSuKienTiet > 0 ? `
//                         <div style="border-top: 1px dashed #ccc; padding-top: 10px;">
//                             <div onclick="let c = document.getElementById('sk-${nk.id}'); if(c.style.display === 'none') { c.style.display = 'block'; this.innerHTML = '🔽 Thu gọn sự kiện (${tongSoSuKienTiet})'; } else { c.style.display = 'none'; this.innerHTML = '👁️ Xem sự kiện & điểm danh (${tongSoSuKienTiet})'; }" style="color: #d35400; font-size: 13px; font-weight: bold; cursor: pointer; display: inline-block; user-select: none; margin-bottom: 8px;">
//                                 ${labelSuKien}
//                             </div>
//                             <div id="sk-${nk.id}" style="${styleSuKien} padding-left: 10px; border-left: 3px solid #ffeeba; background: #fafafa; padding: 10px; border-radius: 4px;">
//                                 ${htmlSuKien}
//                             </div>
//                         </div>
//                     ` : `
//                         <div style="border-top: 1px dashed #ccc; padding-top: 10px; font-size: 12px; color: #28a745; font-style: italic;">
//                             ✅ Lớp học ngoan, không có học sinh vắng hoặc vi phạm trong tiết này.
//                         </div>
//                     `}
//                 </div>
//             `;
//         });

//         vungKetQua.innerHTML = htmlRender;

//         document.querySelectorAll('.btn-luu-bai-giang-moi').forEach(btn => {
//             btn.addEventListener('click', async function () {
//                 let id = this.dataset.id;
//                 let tenBaiMoi = document.getElementById(`input-tenbai-${id}`).value.trim();
//                 let lyThuyetMoi = document.getElementById(`input-lythuyet-${id}`).value.trim();
//                 let baiTapMoi = document.getElementById(`input-baitap-${id}`).value.trim();
//                 let danDoMoi = document.getElementById(`input-dando-${id}`).value.trim();

//                 this.innerText = "⏳ Đang lưu...";
//                 this.disabled = true;

//                 try {
//                     const { error } = await _supabase
//                         .from('nhat_ky_day_hoc')
//                         .update({ ten_bai: tenBaiMoi, ly_thuyet: lyThuyetMoi, bai_tap: baiTapMoi, dan_do: danDoMoi })
//                         .eq('id', id);

//                     if (error) throw error;

//                     document.getElementById(`label-tenbai-${id}`).innerText = `📖 Bài học: ${tenBaiMoi || '(Chưa có tên bài)'}`;
//                     document.getElementById(`label-lythuyet-${id}`).innerHTML = lyThuyetMoi || '<i>(Không ghi chú)</i>';
//                     document.getElementById(`label-baitap-${id}`).innerHTML = baiTapMoi || '<i>(Không ghi chú)</i>';
//                     document.getElementById(`label-dando-${id}`).innerHTML = danDoMoi || '<i>(Không có)</i>';

//                     document.getElementById(`input-tenbai-${id}`).style.display = 'none'; document.getElementById(`label-tenbai-${id}`).style.display = 'block'; document.getElementById(`btn-sua-tenbai-${id}`).style.display = 'block';
//                     document.getElementById(`input-lythuyet-${id}`).style.display = 'none'; document.getElementById(`label-lythuyet-${id}`).style.display = 'block'; document.getElementById(`btn-sua-lythuyet-${id}`).style.display = 'block';
//                     document.getElementById(`input-baitap-${id}`).style.display = 'none'; document.getElementById(`label-baitap-${id}`).style.display = 'block'; document.getElementById(`btn-sua-baitap-${id}`).style.display = 'block';
//                     document.getElementById(`input-dando-${id}`).style.display = 'none'; document.getElementById(`label-dando-${id}`).style.display = 'block'; document.getElementById(`btn-sua-dando-${id}`).style.display = 'block';

//                     document.getElementById(`btn-luu-card-${id}`).style.display = 'none';

//                     alert("✅ Đã cập nhật bài giảng thành công!");
//                 } catch (err) {
//                     console.error("Lỗi cập nhật:", err);
//                     alert("❌ Không thể lưu thay đổi!");
//                 } finally {
//                     this.innerText = "💾 Lưu thay đổi";
//                     this.disabled = false;
//                 }
//             });
//         });

//     } catch (err) {
//         console.error("Lỗi tra cứu:", err);
//         vungKetQua.innerHTML = `<div style="text-align: center; color: red; padding: 20px;"><b>❌ Lỗi khi tải dữ liệu! Vui lòng thử lại.</b></div>`;
//     } finally {
//         btnLoc.innerHTML = textGoc;
//         btnLoc.disabled = false;
//     }
// };


// // =======================================================
// // HÀM 20.15: TRA CỨU, SỬA BÀI GIẢNG & LẬP BẢNG THỐNG KÊ HỌC SINH
// // =======================================================
// window.ham_20_15_thuc_hien_tra_cuu = async function (btnLoc) {
//     const vungKetQua = document.getElementById('tc-khu-vuc-ket-qua');

//     let tuNgay = document.getElementById('tc-tu-ngay').value;
//     let denNgay = document.getElementById('tc-den-ngay').value;

//     let rawMon = document.getElementById('tc-input-mon').value.trim();
//     let rawLop = document.getElementById('tc-input-lop').value.trim();
//     let maLopLuu = rawLop.match(/\(([^)]+)\)$/) ? rawLop.match(/\(([^)]+)\)$/)[1].trim() : rawLop;

//     let rawHS = document.getElementById('tc-input-hs').value.trim();
//     let tenHsTimKiem = rawHS.split(' - ')[0].trim().toLowerCase();

//     let isTimHocSinh = tenHsTimKiem !== '';

//     if (!tuNgay || !denNgay) {
//         alert("⚠️ Vui lòng chọn đủ mốc thời gian Từ ngày - Đến ngày!");
//         return;
//     }

//     const textGoc = btnLoc.innerHTML;
//     btnLoc.innerHTML = "⏳ ĐANG TÌM KIẾM...";
//     btnLoc.disabled = true;
//     vungKetQua.innerHTML = `<div style="text-align: center; color: #007bff; padding: 20px;"><b>⏳ Đang tải dữ liệu từ máy chủ...</b></div>`;

//     try {
//         const taoLinkAnhPreview = (url) => {
//             if (!url) return '';
//             let fileId = '';
//             let matchD = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
//             let matchId = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
//             let matchOpen = url.match(/\/open\?id=([a-zA-Z0-9_-]+)/);
//             if (matchD) fileId = matchD[1];
//             else if (matchId) fileId = matchId[1];
//             else if (matchOpen) fileId = matchOpen[1];
//             return fileId ? `https://lh3.googleusercontent.com/d/${fileId}` : url;
//         };

//         let queryNhatKy = _supabase.from('nhat_ky_day_hoc').select('*').gte('ngay_day', tuNgay).lte('ngay_day', denNgay).order('ngay_day', { ascending: false }).order('tiet', { ascending: true });
//         if (maLopLuu) queryNhatKy = queryNhatKy.eq('ma_lop', maLopLuu);
//         if (rawMon) queryNhatKy = queryNhatKy.ilike('phan_mon', `%${rawMon}%`);

//         let { data: dsNhatKy, error: err1 } = await queryNhatKy;
//         if (err1) throw err1;

//         if (!dsNhatKy || dsNhatKy.length === 0) {
//             vungKetQua.innerHTML = `<div style="text-align: center; color: #dc3545; padding: 20px;"><b>Không tìm thấy tiết dạy nào khớp với bộ lọc!</b></div>`;
//             return;
//         }

//         let mangIdNhatKy = dsNhatKy.map(nk => nk.id);
//         let { data: dsSuKien, error: err2 } = await _supabase.from('nhat_ky_su_kien_hs').select('*').in('id_nhat_ky', mangIdNhatKy);
//         if (err2) throw err2;

//         let htmlRender = '';

//         // =========================================================
//         // 🌟 TÍNH NĂNG MỚI: BẢNG THỐNG KÊ NHANH CHO 1 HỌC SINH
//         // =========================================================
//         if (isTimHocSinh) {
//             dsSuKien = dsSuKien ? dsSuKien.filter(sk => sk.ten_hoc_sinh && sk.ten_hoc_sinh.toLowerCase().includes(tenHsTimKiem)) : [];
//             if (dsSuKien.length === 0) {
//                 vungKetQua.innerHTML = `<div style="text-align: center; color: #28a745; padding: 20px; font-size: 16px;"><b>🎉 Tuyệt vời! Học sinh này không có vi phạm hay vắng mặt nào trong thời gian này!</b></div>`;
//                 return;
//             }
//             let idNhatKyCoHS = new Set(dsSuKien.map(sk => sk.id_nhat_ky));
//             dsNhatKy = dsNhatKy.filter(nk => idNhatKyCoHS.has(nk.id));

//             let tongVang = dsSuKien.filter(sk => sk.loai_the === 'Vắng mặt').length;
//             let tongViPham = dsSuKien.length - tongVang;
//             let tenThat = dsSuKien[0].ten_hoc_sinh;

//             const tenCacThuHSHelper = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
//             let tableRows = '';

//             // Duyệt qua từng tiết học chứa sự kiện của em đó để lập bảng
//             dsNhatKy.forEach(nk => {
//                 let dateObj = new Date(nk.ngay_day);
//                 let strNgay = String(dateObj.getDate()).padStart(2, '0') + '/' + String(dateObj.getMonth() + 1).padStart(2, '0') + '/' + dateObj.getFullYear();
//                 let thuHienTai = tenCacThuHSHelper[dateObj.getDay()];

//                 let hienThiTiet = String(nk.tiet || '').trim();
//                 if (!hienThiTiet.toLowerCase().startsWith('tiết')) hienThiTiet = 'Tiết ' + hienThiTiet;

//                 let thoiGianStr = `<b>${hienThiTiet} - ${nk.buoi}</b><br><span style="color: #666; font-size: 11px;">${thuHienTai}, ${strNgay}</span>`;

//                 let cacSK = dsSuKien.filter(sk => sk.id_nhat_ky === nk.id);

//                 cacSK.forEach(sk => {
//                     let textGC = sk.ghi_chu ? `<div style="color: #666; font-size: 11px; margin-top: 3px;"><i>${sk.ghi_chu}</i></div>` : '';
//                     let mauThe = sk.thong_tin_mo_rong?.mau_sac || '#fd7e14';

//                     let badgeDiem = '';
//                     if (sk.loai_the === 'Cho điểm' && sk.thong_tin_mo_rong?.diem_so) {
//                         badgeDiem = `<span style="background: #28a745; color: white; padding: 2px 5px; border-radius: 4px; font-weight: bold; font-size: 11px; margin-right: 5px;">⭐ ${sk.thong_tin_mo_rong.diem_so} đ</span>`;
//                     }
//                     let suKienStr = `<span style="color: ${mauThe}; font-weight: bold;">[${sk.loai_the}]</span> ${badgeDiem}${textGC}`;

//                     let htmlAnhMC = '';
//                     if (sk.thong_tin_mo_rong && sk.thong_tin_mo_rong.danh_sach_anh_minh_chung) {
//                         let dsMC = sk.thong_tin_mo_rong.danh_sach_anh_minh_chung;
//                         let mangMC = Array.isArray(dsMC) ? dsMC : dsMC.split(',').filter(l => l.trim());
//                         if (mangMC.length > 0) {
//                             htmlAnhMC = `<div style="display: flex; gap: 4px; flex-wrap: wrap;">`;
//                             mangMC.forEach((linkMC) => {
//                                 htmlAnhMC += `<a href="${linkMC}" target="_blank"><img src="${taoLinkAnhPreview(linkMC)}" loading="lazy" style="height: 35px; width: 35px; object-fit: cover; border-radius: 4px; border: 1px solid #ccc; background: #fff; cursor: zoom-in;" title="Xem ảnh"></a>`;
//                             });
//                             htmlAnhMC += `</div>`;
//                         }
//                     }

//                     tableRows += `
//                         <tr style="transition: 0.2s;" onmouseover="this.style.background='#f1f8ff'" onmouseout="this.style.background='transparent'">
//                             <td style="padding: 8px 10px; border-bottom: 1px solid #dee2e6; vertical-align: top;">${thoiGianStr}</td>
//                             <td style="padding: 8px 10px; border-bottom: 1px solid #dee2e6; vertical-align: top; font-weight: bold; color: #17a2b8;">${nk.phan_mon || ''}</td>
//                             <td style="padding: 8px 10px; border-bottom: 1px solid #dee2e6; vertical-align: top; font-size: 12px; color: #0056b3;">${nk.ten_bai || ''}</td>
//                             <td style="padding: 8px 10px; border-bottom: 1px solid #dee2e6; vertical-align: top;">${suKienStr}</td>
//                             <td style="padding: 8px 10px; border-bottom: 1px solid #dee2e6; vertical-align: top;">${htmlAnhMC}</td>
//                         </tr>
//                     `;
//                 });
//             });

//             htmlRender += `
//                 <div style="background: #e0f3ff; border: 1px solid #b8daff; border-left: 5px solid #007bff; border-radius: 8px; padding: 15px; margin-bottom: 25px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
//                     <h4 style="margin: 0 0 12px 0; color: #0056b3; font-size: 16px;">📊 BẢNG THEO DÕI HỌC SINH: <span style="text-transform: uppercase;">${tenThat}</span></h4>
                    
//                     <div style="display: flex; gap: 15px; flex-wrap: wrap; margin-bottom: 15px;">
//                         <span style="background: #fff; border: 1px solid #f5c6cb; color: #721c24; padding: 8px 15px; border-radius: 6px; font-weight: bold; font-size: 14px;">
//                             ❌ Tổng vắng mặt: <span style="font-size: 16px; color: red;">${tongVang}</span> tiết
//                         </span>
//                         <span style="background: #fff; border: 1px solid #ffeeba; color: #d35400; padding: 8px 15px; border-radius: 6px; font-weight: bold; font-size: 14px;">
//                             🎯 Tổng sự kiện khác / Điểm: <span style="font-size: 16px; color: #d35400;">${tongViPham}</span> lần
//                         </span>
//                     </div>

//                     <div style="overflow-x: auto; background: #fff; border-radius: 6px; border: 1px solid #b8daff;">
//                         <table style="width: 100%; border-collapse: collapse; font-size: 13px; min-width: 600px;">
//                             <thead>
//                                 <tr style="background: #007bff; color: white; text-align: left;">
//                                     <th style="padding: 10px; border-bottom: 2px solid #0056b3; min-width: 120px;">Thời gian</th>
//                                     <th style="padding: 10px; border-bottom: 2px solid #0056b3;">Môn</th>
//                                     <th style="padding: 10px; border-bottom: 2px solid #0056b3; width: 30%;">Tên bài</th>
//                                     <th style="padding: 10px; border-bottom: 2px solid #0056b3; min-width: 150px;">Sự kiện / Điểm số</th>
//                                     <th style="padding: 10px; border-bottom: 2px solid #0056b3;">Ảnh MC</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 ${tableRows}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             `;
//         }

//         let mapLop = {};
//         const cacOptionLop = document.querySelectorAll('#dl-lop option');
//         cacOptionLop.forEach(opt => {
//             let val = opt.value;
//             let match = val.match(/^(.*?)\s*\(([^)]+)\)$/);
//             if (match) mapLop[match[2].trim()] = val;
//             else mapLop[val] = val;
//         });

//         const tenCacThu = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];

//         // =========================================================
//         // HIỂN THỊ DẠNG TIMELINE (NHƯ CŨ)
//         // =========================================================
//         dsNhatKy.forEach(nk => {
//             let dateObj = new Date(nk.ngay_day);
//             let strNgay = `${String(dateObj.getDate()).padStart(2, '0')}/${String(dateObj.getMonth() + 1).padStart(2, '0')}/${dateObj.getFullYear()}`;
//             let thuHienTai = tenCacThu[dateObj.getDay()];
//             let tenLopHienThi = mapLop[nk.ma_lop] || `Lớp ${nk.ma_lop}`;

//             let hienThiTiet = String(nk.tiet || '').trim();
//             if (!hienThiTiet.toLowerCase().startsWith('tiết')) {
//                 hienThiTiet = 'Tiết ' + hienThiTiet;
//             }

//             let mangAnhBG = [];
//             if (Array.isArray(nk.danh_sach_anh)) mangAnhBG = nk.danh_sach_anh;
//             else if (typeof nk.danh_sach_anh === 'string' && nk.danh_sach_anh.length > 5) {
//                 try { mangAnhBG = JSON.parse(nk.danh_sach_anh); }
//                 catch (e) { mangAnhBG = nk.danh_sach_anh.split(',').filter(l => l.trim()); }
//             }

//             let htmlAnhBG = '';
//             if (mangAnhBG.length > 0) {
//                 htmlAnhBG = `<div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 10px; padding: 10px; background: #e0f7fa; border-radius: 6px;">`;
//                 mangAnhBG.forEach((link, idx) => {
//                     htmlAnhBG += `
//                         <div style="position: relative; display: inline-block;">
//                             <a href="${link}" target="_blank" title="Bấm để xem ảnh gốc">
//                                 <img src="${taoLinkAnhPreview(link)}" loading="lazy" style="height: 80px; width: 80px; object-fit: cover; border-radius: 4px; border: 2px solid #00acc1; box-shadow: 0 2px 4px rgba(0,0,0,0.1); background: #fff; display: block;">
//                             </a>
//                             <button onclick="ham_20_19_xoa_anh_bai_giang('${nk.id}', ${idx})" style="position: absolute; top: -6px; right: -6px; background: #dc3545; color: white; border: none; border-radius: 50%; width: 20px; height: 20px; font-size: 11px; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 1px 3px rgba(0,0,0,0.3);" title="Xóa ảnh này">×</button>
//                         </div>`;
//                 });
//                 htmlAnhBG += `</div>`;
//             }

//             let htmlBaiGiang = `
//                 <div style="margin-bottom: 12px; border-bottom: 1px dashed #eee; padding-bottom: 8px;">
//                     <div style="display: flex; justify-content: space-between; align-items: center;">
//                         <span style="font-size: 16px; font-weight: bold; color: #0056b3;" id="label-tenbai-${nk.id}">📖 Bài học: ${nk.ten_bai || '(Chưa có tên bài)'}</span>
//                         <button onclick="document.getElementById('label-tenbai-${nk.id}').style.display='none'; document.getElementById('input-tenbai-${nk.id}').style.display='block'; document.getElementById('btn-luu-card-${nk.id}').style.display='block'; this.style.display='none';" id="btn-sua-tenbai-${nk.id}" style="background: #ffc107; border: none; padding: 2px 8px; border-radius: 4px; font-size: 11px; cursor: pointer; font-weight: bold;">✏️ Sửa</button>
//                     </div>
//                     <input id="input-tenbai-${nk.id}" type="text" value="${nk.ten_bai || ''}" style="display:none; width:100%; margin-top:5px; padding:8px; border:2px solid #007bff; border-radius:4px; font-weight:bold; font-size: 15px;">
//                 </div>

//                 <div style="margin-bottom: 12px;">
//                     <div style="display: flex; justify-content: space-between; align-items: center;">
//                         <b style="color: #333;">📘 Nội dung chủ đề / Lý thuyết:</b>
//                         <button onclick="document.getElementById('label-lythuyet-${nk.id}').style.display='none'; document.getElementById('input-lythuyet-${nk.id}').style.display='block'; document.getElementById('btn-luu-card-${nk.id}').style.display='block'; this.style.display='none';" id="btn-sua-lythuyet-${nk.id}" style="background: #ffc107; border: none; padding: 2px 8px; border-radius: 4px; font-size: 11px; cursor: pointer; font-weight: bold;">✏️ Sửa</button>
//                     </div>
//                     <div style="font-size: 14px; color: #212529; line-height: 1.5; white-space: pre-wrap; margin-top: 5px; padding-left: 5px;" id="label-lythuyet-${nk.id}">${nk.ly_thuyet || '<i>(Không ghi chú)</i>'}</div>
//                     <textarea id="input-lythuyet-${nk.id}" style="display:none; width:100%; margin-top:5px; padding:8px; border:2px solid #007bff; border-radius:4px; min-height:60px; font-family: inherit;">${nk.ly_thuyet || ''}</textarea>
//                 </div>

//                 <div style="margin-bottom: 12px;">
//                     <div style="display: flex; justify-content: space-between; align-items: center;">
//                         <b style="color: #333;">✏️ Bài tập đã giải & Bài tập về nhà:</b>
//                         <button onclick="document.getElementById('label-baitap-${nk.id}').style.display='none'; document.getElementById('input-baitap-${nk.id}').style.display='block'; document.getElementById('btn-luu-card-${nk.id}').style.display='block'; this.style.display='none';" id="btn-sua-baitap-${nk.id}" style="background: #ffc107; border: none; padding: 2px 8px; border-radius: 4px; font-size: 11px; cursor: pointer; font-weight: bold;">✏️ Sửa</button>
//                     </div>
//                     <div style="font-size: 14px; color: #212529; line-height: 1.5; white-space: pre-wrap; margin-top: 5px; padding-left: 5px;" id="label-baitap-${nk.id}">${nk.bai_tap || '<i>(Không ghi chú)</i>'}</div>
//                     <textarea id="input-baitap-${nk.id}" style="display:none; width:100%; margin-top:5px; padding:8px; border:2px solid #007bff; border-radius:4px; min-height:60px; font-family: inherit;">${nk.bai_tap || ''}</textarea>
//                 </div>

//                 <div style="margin-bottom: 10px; background: #fff3cd; padding: 10px; border-radius: 4px; border-left: 4px solid #ffeeba;">
//                     <div style="display: flex; justify-content: space-between; align-items: center;">
//                         <b style="color: #856404;">📌 Dặn dò:</b>
//                         <button onclick="document.getElementById('label-dando-${nk.id}').style.display='none'; document.getElementById('input-dando-${nk.id}').style.display='block'; document.getElementById('btn-luu-card-${nk.id}').style.display='block'; this.style.display='none';" id="btn-sua-dando-${nk.id}" style="background: #ffc107; border: none; padding: 2px 8px; border-radius: 4px; font-size: 11px; cursor: pointer; font-weight: bold;">✏️ Sửa</button>
//                     </div>
//                     <div style="font-size: 14px; color: #856404; line-height: 1.5; white-space: pre-wrap; margin-top: 5px; padding-left: 5px;" id="label-dando-${nk.id}">${nk.dan_do || '<i>(Không có)</i>'}</div>
//                     <textarea id="input-dando-${nk.id}" style="display:none; width:100%; margin-top:5px; padding:8px; border:2px solid #007bff; border-radius:4px; min-height:40px; font-family: inherit;">${nk.dan_do || ''}</textarea>
//                 </div>

//                 ${htmlAnhBG}

//                 <div id="btn-luu-card-${nk.id}" style="display: none; margin-top: 15px; text-align: right; border-top: 1px dashed #007bff; padding-top: 12px;">
//                     <button onclick="
//                         document.getElementById('input-tenbai-${nk.id}').style.display='none'; document.getElementById('label-tenbai-${nk.id}').style.display='block'; document.getElementById('btn-sua-tenbai-${nk.id}').style.display='block';
//                         document.getElementById('input-lythuyet-${nk.id}').style.display='none'; document.getElementById('label-lythuyet-${nk.id}').style.display='block'; document.getElementById('btn-sua-lythuyet-${nk.id}').style.display='block';
//                         document.getElementById('input-baitap-${nk.id}').style.display='none'; document.getElementById('label-baitap-${nk.id}').style.display='block'; document.getElementById('btn-sua-baitap-${nk.id}').style.display='block';
//                         document.getElementById('input-dando-${nk.id}').style.display='none'; document.getElementById('label-dando-${nk.id}').style.display='block'; document.getElementById('btn-sua-dando-${nk.id}').style.display='block';
//                         document.getElementById('btn-luu-card-${nk.id}').style.display='none';
//                     " style="background: #6c757d; color: white; border: none; padding: 8px 15px; border-radius: 4px; font-weight: bold; cursor: pointer; margin-right: 8px;">❌ Hủy sửa</button>
                    
//                     <button class="btn-luu-bai-giang-moi" data-id="${nk.id}" style="background: #28a745; color: white; border: none; padding: 8px 25px; border-radius: 4px; font-weight: bold; cursor: pointer; box-shadow: 0 3px 6px rgba(0,0,0,0.15);">💾 Lưu thay đổi</button>
//                 </div>
//             `;

//             let cacSuKienCuaTiet = dsSuKien ? dsSuKien.filter(sk => sk.id_nhat_ky === nk.id) : [];
//             let vangMat = cacSuKienCuaTiet.filter(sk => sk.loai_the === 'Vắng mặt');
//             let suKienKhac = cacSuKienCuaTiet.filter(sk => sk.loai_the !== 'Vắng mặt');
//             let tongSoSuKienTiet = vangMat.length + suKienKhac.length;

//             let htmlSuKien = '';
//             if (tongSoSuKienTiet > 0) {
//                 if (vangMat.length > 0) {
//                     htmlSuKien += `<div style="margin-top: 10px;">
//                                     <strong style="color: #dc3545; font-size: 13px;">❌ Vắng mặt (${vangMat.length}):</strong>
//                                     <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 5px;">`;
//                     vangMat.forEach(v => {
//                         htmlSuKien += `
//                             <span style="display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; background: #f8d7da; color: #721c24; border-radius: 20px; font-size: 12px; font-weight: bold; border: 1px solid #f5c6cb;">
//                                 ${v.ten_hoc_sinh} 
//                                 <span onclick="ham_20_17_xoa_su_kien_chi_tiet('${v.id}')" style="cursor: pointer; font-size: 11px; color: #dc3545;" title="Xóa học sinh này">✖</span>
//                             </span>`;
//                     });
//                     htmlSuKien += `</div></div>`;
//                 }

//                 if (suKienKhac.length > 0) {
//                     htmlSuKien += `<div style="margin-top: 15px;">
//                                     <strong style="color: #d35400; font-size: 13px;">🎯 Sự kiện ghi nhận (${suKienKhac.length}):</strong>
//                                     <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 8px;">`;
//                     suKienKhac.forEach(sk => {
//                         let textGC = sk.ghi_chu ? ` - <i>${sk.ghi_chu}</i>` : '';
//                         let mauThe = sk.thong_tin_mo_rong?.mau_sac || '#fd7e14';

//                         let badgeDiem = '';
//                         if (sk.loai_the === 'Cho điểm' && sk.thong_tin_mo_rong?.diem_so) {
//                             badgeDiem = `<span style="background: #28a745; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold; font-size: 11px; margin-right: 5px;">⭐ ${sk.thong_tin_mo_rong.diem_so} điểm</span>`;
//                         }

//                         let htmlAnhMC = '';
//                         if (sk.thong_tin_mo_rong && sk.thong_tin_mo_rong.danh_sach_anh_minh_chung) {
//                             let dsMC = sk.thong_tin_mo_rong.danh_sach_anh_minh_chung;
//                             let mangMC = Array.isArray(dsMC) ? dsMC : dsMC.split(',').filter(l => l.trim());
//                             if (mangMC.length > 0) {
//                                 htmlAnhMC = `<div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 5px; padding-left: 10px; border-left: 2px solid ${mauThe};">`;
//                                 mangMC.forEach((linkMC, idxMC) => {
//                                     htmlAnhMC += `
//                                         <div style="position: relative; display: inline-block;">
//                                             <a href="${linkMC}" target="_blank">
//                                                 <img src="${taoLinkAnhPreview(linkMC)}" loading="lazy" style="height: 40px; width: 40px; object-fit: cover; border-radius: 4px; border: 1px solid #ccc; background: #fff; display: block;">
//                                             </a>
//                                             <button onclick="ham_20_20_xoa_anh_minh_chung('${sk.id}', ${idxMC})" style="position: absolute; top: -5px; right: -5px; background: #dc3545; color: white; border: none; border-radius: 50%; width: 16px; height: 16px; font-size: 9px; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center;" title="Xóa ảnh minh chứng này">×</button>
//                                         </div>`;
//                                 });
//                                 htmlAnhMC += `</div>`;
//                             }
//                         }

//                         htmlSuKien += `
//                             <div style="display: flex; justify-content: space-between; align-items: center; background: #fff; border: 1px solid #eee; padding: 8px 12px; border-radius: 6px; box-shadow: 0 1px 2px rgba(0,0,0,0.02); border-left: 4px solid ${mauThe};">
//                                 <div>
//                                     <b style="font-size: 13px;">${sk.ten_hoc_sinh}</b>: 
//                                     ${badgeDiem}
//                                     <span style="color: ${mauThe}; font-weight: bold; font-size: 12px;">[${sk.loai_the}]</span>
//                                     <span style="font-size: 12px; color: #555;">${textGC}</span>
//                                     ${htmlAnhMC}
//                                 </div>
//                                 <button onclick="ham_20_17_xoa_su_kien_chi_tiet('${sk.id}')" style="background: #f8d7da; color: #721c24; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: bold;" title="Xóa sự kiện này">🗑️ Xóa</button>
//                             </div>`;
//                     });
//                     htmlSuKien += `</div></div>`;
//                 }
//             }

//             let styleBaiGiang = isTimHocSinh ? 'display: none;' : 'display: block;';
//             let labelBaiGiang = isTimHocSinh ? '👁️ Xem chi tiết bài giảng' : '🔽 Thu gọn bài giảng';
//             let styleSuKien = isTimHocSinh ? 'display: block;' : 'display: none;';
//             let labelSuKien = isTimHocSinh ? `🔽 Thu gọn sự kiện (${tongSoSuKienTiet})` : `👁️ Xem sự kiện & điểm danh (${tongSoSuKienTiet})`;

//             htmlRender += `
//                 <div style="background: #fff; border: 1px solid #ced4da; border-radius: 8px; box-shadow: 0 3px 6px rgba(0,0,0,0.05); padding: 20px; animation: slideUp 0.4s ease-out;">
                    
//                     <div style="margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 12px;">
//                         <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
//                             <span style="background: #007bff; color: white; padding: 5px 12px; border-radius: 4px; font-weight: bold; font-size: 13px;">🏫 ${tenLopHienThi}</span>
//                             <span style="background: #17a2b8; color: white; padding: 5px 12px; border-radius: 4px; font-weight: bold; font-size: 13px;">🏷️ ${nk.phan_mon || 'Không rõ môn'}</span>
//                             <span style="color: #6c757d; font-size: 13px; font-weight: bold;">🕒 ${hienThiTiet} - ${nk.buoi} - ${thuHienTai}, Ngày ${strNgay}</span>
                            
//                             <button onclick="ham_20_18_xoa_nguyen_tiet('${nk.id}')" style="margin-left: auto; background: #dc3545; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-weight: bold; font-size: 12px;" title="Xóa toàn bộ tiết học">🗑️ Xóa tiết</button>
//                         </div>
//                     </div>

//                     <div style="margin-bottom: 15px;">
//                         <div style="margin-bottom: 8px;">
//                             <div onclick="let c = document.getElementById('bg-${nk.id}'); if(c.style.display === 'none') { c.style.display = 'block'; this.innerHTML = '🔽 Thu gọn bài giảng'; } else { c.style.display = 'none'; this.innerHTML = '👁️ Xem chi tiết bài giảng'; }" style="color: #007bff; font-size: 13px; font-weight: bold; cursor: pointer; display: inline-block; user-select: none;">
//                                 ${labelBaiGiang}
//                             </div>
//                         </div>

//                         <div id="bg-${nk.id}" style="${styleBaiGiang} padding-left: 10px; border-left: 3px solid #e9ecef;">
//                             ${htmlBaiGiang}
//                         </div>
//                     </div>
                    
//                     ${tongSoSuKienTiet > 0 ? `
//                         <div style="border-top: 1px dashed #ccc; padding-top: 10px;">
//                             <div onclick="let c = document.getElementById('sk-${nk.id}'); if(c.style.display === 'none') { c.style.display = 'block'; this.innerHTML = '🔽 Thu gọn sự kiện (${tongSoSuKienTiet})'; } else { c.style.display = 'none'; this.innerHTML = '👁️ Xem sự kiện & điểm danh (${tongSoSuKienTiet})'; }" style="color: #d35400; font-size: 13px; font-weight: bold; cursor: pointer; display: inline-block; user-select: none; margin-bottom: 8px;">
//                                 ${labelSuKien}
//                             </div>
//                             <div id="sk-${nk.id}" style="${styleSuKien} padding-left: 10px; border-left: 3px solid #ffeeba; background: #fafafa; padding: 10px; border-radius: 4px;">
//                                 ${htmlSuKien}
//                             </div>
//                         </div>
//                     ` : `
//                         <div style="border-top: 1px dashed #ccc; padding-top: 10px; font-size: 12px; color: #28a745; font-style: italic;">
//                             ✅ Lớp học ngoan, không có học sinh vắng hoặc vi phạm trong tiết này.
//                         </div>
//                     `}
//                 </div>
//             `;
//         });

//         vungKetQua.innerHTML = htmlRender;

//         document.querySelectorAll('.btn-luu-bai-giang-moi').forEach(btn => {
//             btn.addEventListener('click', async function () {
//                 let id = this.dataset.id;
//                 let tenBaiMoi = document.getElementById(`input-tenbai-${id}`).value.trim();
//                 let lyThuyetMoi = document.getElementById(`input-lythuyet-${id}`).value.trim();
//                 let baiTapMoi = document.getElementById(`input-baitap-${id}`).value.trim();
//                 let danDoMoi = document.getElementById(`input-dando-${id}`).value.trim();

//                 this.innerText = "⏳ Đang lưu...";
//                 this.disabled = true;

//                 try {
//                     const { error } = await _supabase
//                         .from('nhat_ky_day_hoc')
//                         .update({ ten_bai: tenBaiMoi, ly_thuyet: lyThuyetMoi, bai_tap: baiTapMoi, dan_do: danDoMoi })
//                         .eq('id', id);

//                     if (error) throw error;

//                     document.getElementById(`label-tenbai-${id}`).innerText = `📖 Bài học: ${tenBaiMoi || '(Chưa có tên bài)'}`;
//                     document.getElementById(`label-lythuyet-${id}`).innerHTML = lyThuyetMoi || '<i>(Không ghi chú)</i>';
//                     document.getElementById(`label-baitap-${id}`).innerHTML = baiTapMoi || '<i>(Không ghi chú)</i>';
//                     document.getElementById(`label-dando-${id}`).innerHTML = danDoMoi || '<i>(Không có)</i>';

//                     document.getElementById(`input-tenbai-${id}`).style.display = 'none'; document.getElementById(`label-tenbai-${id}`).style.display = 'block'; document.getElementById(`btn-sua-tenbai-${id}`).style.display = 'block';
//                     document.getElementById(`input-lythuyet-${id}`).style.display = 'none'; document.getElementById(`label-lythuyet-${id}`).style.display = 'block'; document.getElementById(`btn-sua-lythuyet-${id}`).style.display = 'block';
//                     document.getElementById(`input-baitap-${id}`).style.display = 'none'; document.getElementById(`label-baitap-${id}`).style.display = 'block'; document.getElementById(`btn-sua-baitap-${id}`).style.display = 'block';
//                     document.getElementById(`input-dando-${id}`).style.display = 'none'; document.getElementById(`label-dando-${id}`).style.display = 'block'; document.getElementById(`btn-sua-dando-${id}`).style.display = 'block';

//                     document.getElementById(`btn-luu-card-${id}`).style.display = 'none';

//                     alert("✅ Đã cập nhật bài giảng thành công!");
//                 } catch (err) {
//                     console.error("Lỗi cập nhật:", err);
//                     alert("❌ Không thể lưu thay đổi!");
//                 } finally {
//                     this.innerText = "💾 Lưu thay đổi";
//                     this.disabled = false;
//                 }
//             });
//         });

//     } catch (err) {
//         console.error("Lỗi tra cứu:", err);
//         vungKetQua.innerHTML = `<div style="text-align: center; color: red; padding: 20px;"><b>❌ Lỗi khi tải dữ liệu! Vui lòng thử lại.</b></div>`;
//     } finally {
//         btnLoc.innerHTML = textGoc;
//         btnLoc.disabled = false;
//     }
// };



// // =======================================================
// // HÀM 20.15: TRA CỨU, SỬA BÀI GIẢNG & LẬP BẢNG THỐNG KÊ (CÓ SORT)
// // =======================================================
// window.ham_20_15_thuc_hien_tra_cuu = async function (btnLoc) {
//     const vungKetQua = document.getElementById('tc-khu-vuc-ket-qua');

//     let tuNgay = document.getElementById('tc-tu-ngay').value;
//     let denNgay = document.getElementById('tc-den-ngay').value;

//     let rawMon = document.getElementById('tc-input-mon').value.trim();
//     let rawLop = document.getElementById('tc-input-lop').value.trim();
//     let maLopLuu = rawLop.match(/\(([^)]+)\)$/) ? rawLop.match(/\(([^)]+)\)$/)[1].trim() : rawLop;

//     let rawHS = document.getElementById('tc-input-hs').value.trim();
//     let tenHsTimKiem = rawHS.split(' - ')[0].trim().toLowerCase();

//     let isTimHocSinh = tenHsTimKiem !== '';

//     if (!tuNgay || !denNgay) {
//         alert("⚠️ Vui lòng chọn đủ mốc thời gian Từ ngày - Đến ngày!");
//         return;
//     }

//     const textGoc = btnLoc.innerHTML;
//     btnLoc.innerHTML = "⏳ ĐANG TÌM KIẾM...";
//     btnLoc.disabled = true;
//     vungKetQua.innerHTML = `<div style="text-align: center; color: #007bff; padding: 20px;"><b>⏳ Đang tải dữ liệu từ máy chủ...</b></div>`;

//     try {
//         const taoLinkAnhPreview = (url) => {
//             if (!url) return '';
//             let fileId = '';
//             let matchD = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
//             let matchId = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
//             let matchOpen = url.match(/\/open\?id=([a-zA-Z0-9_-]+)/);
//             if (matchD) fileId = matchD[1];
//             else if (matchId) fileId = matchId[1];
//             else if (matchOpen) fileId = matchOpen[1];
//             return fileId ? `https://lh3.googleusercontent.com/d/${fileId}` : url;
//         };

//         let queryNhatKy = _supabase.from('nhat_ky_day_hoc').select('*').gte('ngay_day', tuNgay).lte('ngay_day', denNgay).order('ngay_day', { ascending: false }).order('tiet', { ascending: true });
//         if (maLopLuu) queryNhatKy = queryNhatKy.eq('ma_lop', maLopLuu);
//         if (rawMon) queryNhatKy = queryNhatKy.ilike('phan_mon', `%${rawMon}%`);

//         let { data: dsNhatKy, error: err1 } = await queryNhatKy;
//         if (err1) throw err1;

//         if (!dsNhatKy || dsNhatKy.length === 0) {
//             vungKetQua.innerHTML = `<div style="text-align: center; color: #dc3545; padding: 20px;"><b>Không tìm thấy tiết dạy nào khớp với bộ lọc!</b></div>`;
//             return;
//         }

//         let mangIdNhatKy = dsNhatKy.map(nk => nk.id);
//         let { data: dsSuKien, error: err2 } = await _supabase.from('nhat_ky_su_kien_hs').select('*').in('id_nhat_ky', mangIdNhatKy);
//         if (err2) throw err2;

//         let htmlRender = '';

//         // =========================================================
//         // 🌟 BẢNG THỐNG KÊ (GOM NHÓM THEO TIẾT & SẮP XẾP)
//         // =========================================================
//         if (isTimHocSinh) {
//             dsSuKien = dsSuKien ? dsSuKien.filter(sk => sk.ten_hoc_sinh && sk.ten_hoc_sinh.toLowerCase().includes(tenHsTimKiem)) : [];
//             if (dsSuKien.length === 0) {
//                 vungKetQua.innerHTML = `<div style="text-align: center; color: #28a745; padding: 20px; font-size: 16px;"><b>🎉 Tuyệt vời! Học sinh này không có vi phạm hay vắng mặt nào trong thời gian này!</b></div>`;
//                 return;
//             }
//             let idNhatKyCoHS = new Set(dsSuKien.map(sk => sk.id_nhat_ky));
//             dsNhatKy = dsNhatKy.filter(nk => idNhatKyCoHS.has(nk.id));

//             let tongVang = dsSuKien.filter(sk => sk.loai_the === 'Vắng mặt').length;
//             let tongViPham = dsSuKien.length - tongVang;
//             let tenThat = dsSuKien[0].ten_hoc_sinh;

//             const tenCacThuHSHelper = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
//             let tableRows = '';

//             // Lặp theo Tiết Học (để gom các sự kiện vào 1 dòng)
//             dsNhatKy.forEach(nk => {
//                 let dateObj = new Date(nk.ngay_day);
//                 let strNgay = String(dateObj.getDate()).padStart(2, '0') + '/' + String(dateObj.getMonth() + 1).padStart(2, '0') + '/' + dateObj.getFullYear();
//                 let thuHienTai = tenCacThuHSHelper[dateObj.getDay()];

//                 let hienThiTiet = String(nk.tiet || '').trim();
//                 if (!hienThiTiet.toLowerCase().startsWith('tiết')) hienThiTiet = 'Tiết ' + hienThiTiet;

//                 // Chuỗi ẩn để sort chính xác theo Ngày_Buổi_Tiết
//                 let sortTimeStr = `${nk.ngay_day}_${nk.buoi}_${hienThiTiet}`;
//                 let thoiGianStr = `<b>${hienThiTiet} - ${nk.buoi}</b><br><span style="color: #666; font-size: 11px;">${thuHienTai}, ${strNgay}</span>`;

//                 // Lấy tất cả sự kiện của HS trong tiết này
//                 let cacSK = dsSuKien.filter(sk => sk.id_nhat_ky === nk.id);

//                 let htmlGomSuKien = '';
//                 let htmlGomAnh = '<div style="display: flex; gap: 4px; flex-wrap: wrap;">';
//                 let coAnh = false;

//                 cacSK.forEach(sk => {
//                     let textGC = sk.ghi_chu ? `<span style="color: #666; font-size: 11px;"> - <i>${sk.ghi_chu}</i></span>` : '';
//                     let mauThe = sk.thong_tin_mo_rong?.mau_sac || '#fd7e14';

//                     let badgeDiem = '';
//                     if (sk.loai_the === 'Cho điểm' && sk.thong_tin_mo_rong?.diem_so) {
//                         badgeDiem = `<span style="background: #28a745; color: white; padding: 2px 5px; border-radius: 4px; font-weight: bold; font-size: 11px; margin-right: 5px;">⭐ ${sk.thong_tin_mo_rong.diem_so} đ</span>`;
//                     }

//                     // Gom từng sự kiện thành 1 dòng nhỏ
//                     htmlGomSuKien += `<div style="margin-bottom: 4px; padding-bottom: 4px; border-bottom: 1px dashed #eee;"><span style="color: ${mauThe}; font-weight: bold;">[${sk.loai_the}]</span> ${badgeDiem}${textGC}</div>`;

//                     // Gom tất cả ảnh minh chứng của các sự kiện
//                     if (sk.thong_tin_mo_rong && sk.thong_tin_mo_rong.danh_sach_anh_minh_chung) {
//                         let dsMC = sk.thong_tin_mo_rong.danh_sach_anh_minh_chung;
//                         let mangMC = Array.isArray(dsMC) ? dsMC : dsMC.split(',').filter(l => l.trim());
//                         if (mangMC.length > 0) {
//                             mangMC.forEach((linkMC) => {
//                                 coAnh = true;
//                                 htmlGomAnh += `<a href="${linkMC}" target="_blank"><img src="${taoLinkAnhPreview(linkMC)}" loading="lazy" style="height: 35px; width: 35px; object-fit: cover; border-radius: 4px; border: 1px solid #ccc; background: #fff; cursor: zoom-in;" title="Xem ảnh"></a>`;
//                             });
//                         }
//                     }
//                 });
//                 htmlGomAnh += `</div>`;
//                 if (!coAnh) htmlGomAnh = '';

//                 // Vẽ 1 dòng duy nhất cho tiết học đó
//                 tableRows += `
//                     <tr style="transition: 0.2s;" onmouseover="this.style.background='#f1f8ff'" onmouseout="this.style.background='transparent'">
//                         <td data-sort="${sortTimeStr}" style="padding: 8px 10px; border-bottom: 1px solid #dee2e6; vertical-align: top;">${thoiGianStr}</td>
//                         <td style="padding: 8px 10px; border-bottom: 1px solid #dee2e6; vertical-align: top; font-weight: bold; color: #17a2b8;">${nk.phan_mon || ''}</td>
//                         <td style="padding: 8px 10px; border-bottom: 1px solid #dee2e6; vertical-align: top; font-size: 12px; color: #0056b3;">${nk.ten_bai || ''}</td>
//                         <td style="padding: 8px 10px; border-bottom: 1px solid #dee2e6; vertical-align: top;">${htmlGomSuKien}</td>
//                         <td style="padding: 8px 10px; border-bottom: 1px solid #dee2e6; vertical-align: top;">${htmlGomAnh}</td>
//                     </tr>
//                 `;
//             });

//             htmlRender += `
//                 <div style="background: #e0f3ff; border: 1px solid #b8daff; border-left: 5px solid #007bff; border-radius: 8px; padding: 15px; margin-bottom: 25px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
//                     <h4 style="margin: 0 0 12px 0; color: #0056b3; font-size: 16px;">📊 BẢNG THEO DÕI HỌC SINH: <span style="text-transform: uppercase;">${tenThat}</span></h4>
                    
//                     <div style="display: flex; gap: 15px; flex-wrap: wrap; margin-bottom: 15px;">
//                         <span style="background: #fff; border: 1px solid #f5c6cb; color: #721c24; padding: 8px 15px; border-radius: 6px; font-weight: bold; font-size: 14px;">
//                             ❌ Tổng vắng mặt: <span style="font-size: 16px; color: red;">${tongVang}</span> tiết
//                         </span>
//                         <span style="background: #fff; border: 1px solid #ffeeba; color: #d35400; padding: 8px 15px; border-radius: 6px; font-weight: bold; font-size: 14px;">
//                             🎯 Tổng sự kiện khác / Điểm: <span style="font-size: 16px; color: #d35400;">${tongViPham}</span> lần
//                         </span>
//                     </div>

//                     <div style="overflow-x: auto; background: #fff; border-radius: 6px; border: 1px solid #b8daff;">
//                         <table id="bang-thong-ke-hs" style="width: 100%; border-collapse: collapse; font-size: 13px; min-width: 600px;">
//                             <thead>
//                                 <tr style="background: #007bff; color: white; text-align: left;">
//                                     <th onclick="ham_20_21_sap_xep_bang(0, 'bang-thong-ke-hs')" style="padding: 10px; border-bottom: 2px solid #0056b3; min-width: 120px; cursor: pointer;" title="Bấm để sắp xếp">Thời gian ↕️</th>
//                                     <th onclick="ham_20_21_sap_xep_bang(1, 'bang-thong-ke-hs')" style="padding: 10px; border-bottom: 2px solid #0056b3; cursor: pointer;" title="Bấm để sắp xếp">Môn ↕️</th>
//                                     <th onclick="ham_20_21_sap_xep_bang(2, 'bang-thong-ke-hs')" style="padding: 10px; border-bottom: 2px solid #0056b3; width: 30%; cursor: pointer;" title="Bấm để sắp xếp">Tên bài ↕️</th>
//                                     <th style="padding: 10px; border-bottom: 2px solid #0056b3; min-width: 150px;">Sự kiện / Điểm số</th>
//                                     <th style="padding: 10px; border-bottom: 2px solid #0056b3;">Ảnh MC</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 ${tableRows}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             `;
//         }

//         let mapLop = {};
//         const cacOptionLop = document.querySelectorAll('#dl-lop option');
//         cacOptionLop.forEach(opt => {
//             let val = opt.value;
//             let match = val.match(/^(.*?)\s*\(([^)]+)\)$/);
//             if (match) mapLop[match[2].trim()] = val;
//             else mapLop[val] = val;
//         });

//         const tenCacThu = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];

//         // =========================================================
//         // HIỂN THỊ DẠNG TIMELINE
//         // =========================================================
//         dsNhatKy.forEach(nk => {
//             let dateObj = new Date(nk.ngay_day);
//             let strNgay = `${String(dateObj.getDate()).padStart(2, '0')}/${String(dateObj.getMonth() + 1).padStart(2, '0')}/${dateObj.getFullYear()}`;
//             let thuHienTai = tenCacThu[dateObj.getDay()];
//             let tenLopHienThi = mapLop[nk.ma_lop] || `Lớp ${nk.ma_lop}`;

//             let hienThiTiet = String(nk.tiet || '').trim();
//             if (!hienThiTiet.toLowerCase().startsWith('tiết')) hienThiTiet = 'Tiết ' + hienThiTiet;

//             let mangAnhBG = [];
//             if (Array.isArray(nk.danh_sach_anh)) mangAnhBG = nk.danh_sach_anh;
//             else if (typeof nk.danh_sach_anh === 'string' && nk.danh_sach_anh.length > 5) {
//                 try { mangAnhBG = JSON.parse(nk.danh_sach_anh); }
//                 catch (e) { mangAnhBG = nk.danh_sach_anh.split(',').filter(l => l.trim()); }
//             }

//             let htmlAnhBG = '';
//             if (mangAnhBG.length > 0) {
//                 htmlAnhBG = `<div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 10px; padding: 10px; background: #e0f7fa; border-radius: 6px;">`;
//                 mangAnhBG.forEach((link, idx) => {
//                     htmlAnhBG += `
//                         <div style="position: relative; display: inline-block;">
//                             <a href="${link}" target="_blank" title="Bấm để xem ảnh gốc">
//                                 <img src="${taoLinkAnhPreview(link)}" loading="lazy" style="height: 80px; width: 80px; object-fit: cover; border-radius: 4px; border: 2px solid #00acc1; box-shadow: 0 2px 4px rgba(0,0,0,0.1); background: #fff; display: block;">
//                             </a>
//                             <button onclick="ham_20_19_xoa_anh_bai_giang('${nk.id}', ${idx})" style="position: absolute; top: -6px; right: -6px; background: #dc3545; color: white; border: none; border-radius: 50%; width: 20px; height: 20px; font-size: 11px; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 1px 3px rgba(0,0,0,0.3);" title="Xóa ảnh này">×</button>
//                         </div>`;
//                 });
//                 htmlAnhBG += `</div>`;
//             }

//             let htmlBaiGiang = `
//                 <div style="margin-bottom: 12px; border-bottom: 1px dashed #eee; padding-bottom: 8px;">
//                     <div style="display: flex; justify-content: space-between; align-items: center;">
//                         <span style="font-size: 16px; font-weight: bold; color: #0056b3;" id="label-tenbai-${nk.id}">📖 Bài học: ${nk.ten_bai || '(Chưa có tên bài)'}</span>
//                         <button onclick="document.getElementById('label-tenbai-${nk.id}').style.display='none'; document.getElementById('input-tenbai-${nk.id}').style.display='block'; document.getElementById('btn-luu-card-${nk.id}').style.display='block'; this.style.display='none';" id="btn-sua-tenbai-${nk.id}" style="background: #ffc107; border: none; padding: 2px 8px; border-radius: 4px; font-size: 11px; cursor: pointer; font-weight: bold;">✏️ Sửa</button>
//                     </div>
//                     <input id="input-tenbai-${nk.id}" type="text" value="${nk.ten_bai || ''}" style="display:none; width:100%; margin-top:5px; padding:8px; border:2px solid #007bff; border-radius:4px; font-weight:bold; font-size: 15px;">
//                 </div>

//                 <div style="margin-bottom: 12px;">
//                     <div style="display: flex; justify-content: space-between; align-items: center;">
//                         <b style="color: #333;">📘 Nội dung chủ đề / Lý thuyết:</b>
//                         <button onclick="document.getElementById('label-lythuyet-${nk.id}').style.display='none'; document.getElementById('input-lythuyet-${nk.id}').style.display='block'; document.getElementById('btn-luu-card-${nk.id}').style.display='block'; this.style.display='none';" id="btn-sua-lythuyet-${nk.id}" style="background: #ffc107; border: none; padding: 2px 8px; border-radius: 4px; font-size: 11px; cursor: pointer; font-weight: bold;">✏️ Sửa</button>
//                     </div>
//                     <div style="font-size: 14px; color: #212529; line-height: 1.5; white-space: pre-wrap; margin-top: 5px; padding-left: 5px;" id="label-lythuyet-${nk.id}">${nk.ly_thuyet || '<i>(Không ghi chú)</i>'}</div>
//                     <textarea id="input-lythuyet-${nk.id}" style="display:none; width:100%; margin-top:5px; padding:8px; border:2px solid #007bff; border-radius:4px; min-height:60px; font-family: inherit;">${nk.ly_thuyet || ''}</textarea>
//                 </div>

//                 <div style="margin-bottom: 12px;">
//                     <div style="display: flex; justify-content: space-between; align-items: center;">
//                         <b style="color: #333;">✏️ Bài tập đã giải & Bài tập về nhà:</b>
//                         <button onclick="document.getElementById('label-baitap-${nk.id}').style.display='none'; document.getElementById('input-baitap-${nk.id}').style.display='block'; document.getElementById('btn-luu-card-${nk.id}').style.display='block'; this.style.display='none';" id="btn-sua-baitap-${nk.id}" style="background: #ffc107; border: none; padding: 2px 8px; border-radius: 4px; font-size: 11px; cursor: pointer; font-weight: bold;">✏️ Sửa</button>
//                     </div>
//                     <div style="font-size: 14px; color: #212529; line-height: 1.5; white-space: pre-wrap; margin-top: 5px; padding-left: 5px;" id="label-baitap-${nk.id}">${nk.bai_tap || '<i>(Không ghi chú)</i>'}</div>
//                     <textarea id="input-baitap-${nk.id}" style="display:none; width:100%; margin-top:5px; padding:8px; border:2px solid #007bff; border-radius:4px; min-height:60px; font-family: inherit;">${nk.bai_tap || ''}</textarea>
//                 </div>

//                 <div style="margin-bottom: 10px; background: #fff3cd; padding: 10px; border-radius: 4px; border-left: 4px solid #ffeeba;">
//                     <div style="display: flex; justify-content: space-between; align-items: center;">
//                         <b style="color: #856404;">📌 Dặn dò:</b>
//                         <button onclick="document.getElementById('label-dando-${nk.id}').style.display='none'; document.getElementById('input-dando-${nk.id}').style.display='block'; document.getElementById('btn-luu-card-${nk.id}').style.display='block'; this.style.display='none';" id="btn-sua-dando-${nk.id}" style="background: #ffc107; border: none; padding: 2px 8px; border-radius: 4px; font-size: 11px; cursor: pointer; font-weight: bold;">✏️ Sửa</button>
//                     </div>
//                     <div style="font-size: 14px; color: #856404; line-height: 1.5; white-space: pre-wrap; margin-top: 5px; padding-left: 5px;" id="label-dando-${nk.id}">${nk.dan_do || '<i>(Không có)</i>'}</div>
//                     <textarea id="input-dando-${nk.id}" style="display:none; width:100%; margin-top:5px; padding:8px; border:2px solid #007bff; border-radius:4px; min-height:40px; font-family: inherit;">${nk.dan_do || ''}</textarea>
//                 </div>

//                 ${htmlAnhBG}

//                 <div id="btn-luu-card-${nk.id}" style="display: none; margin-top: 15px; text-align: right; border-top: 1px dashed #007bff; padding-top: 12px;">
//                     <button onclick="
//                         document.getElementById('input-tenbai-${nk.id}').style.display='none'; document.getElementById('label-tenbai-${nk.id}').style.display='block'; document.getElementById('btn-sua-tenbai-${nk.id}').style.display='block';
//                         document.getElementById('input-lythuyet-${nk.id}').style.display='none'; document.getElementById('label-lythuyet-${nk.id}').style.display='block'; document.getElementById('btn-sua-lythuyet-${nk.id}').style.display='block';
//                         document.getElementById('input-baitap-${nk.id}').style.display='none'; document.getElementById('label-baitap-${nk.id}').style.display='block'; document.getElementById('btn-sua-baitap-${nk.id}').style.display='block';
//                         document.getElementById('input-dando-${nk.id}').style.display='none'; document.getElementById('label-dando-${nk.id}').style.display='block'; document.getElementById('btn-sua-dando-${nk.id}').style.display='block';
//                         document.getElementById('btn-luu-card-${nk.id}').style.display='none';
//                     " style="background: #6c757d; color: white; border: none; padding: 8px 15px; border-radius: 4px; font-weight: bold; cursor: pointer; margin-right: 8px;">❌ Hủy sửa</button>
                    
//                     <button class="btn-luu-bai-giang-moi" data-id="${nk.id}" style="background: #28a745; color: white; border: none; padding: 8px 25px; border-radius: 4px; font-weight: bold; cursor: pointer; box-shadow: 0 3px 6px rgba(0,0,0,0.15);">💾 Lưu thay đổi</button>
//                 </div>
//             `;

//             let cacSuKienCuaTiet = dsSuKien ? dsSuKien.filter(sk => sk.id_nhat_ky === nk.id) : [];
//             let vangMat = cacSuKienCuaTiet.filter(sk => sk.loai_the === 'Vắng mặt');
//             let suKienKhac = cacSuKienCuaTiet.filter(sk => sk.loai_the !== 'Vắng mặt');
//             let tongSoSuKienTiet = vangMat.length + suKienKhac.length;

//             let htmlSuKien = '';
//             if (tongSoSuKienTiet > 0) {
//                 if (vangMat.length > 0) {
//                     htmlSuKien += `<div style="margin-top: 10px;">
//                                     <strong style="color: #dc3545; font-size: 13px;">❌ Vắng mặt (${vangMat.length}):</strong>
//                                     <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 5px;">`;
//                     vangMat.forEach(v => {
//                         htmlSuKien += `
//                             <span style="display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; background: #f8d7da; color: #721c24; border-radius: 20px; font-size: 12px; font-weight: bold; border: 1px solid #f5c6cb;">
//                                 ${v.ten_hoc_sinh} 
//                                 <span onclick="ham_20_17_xoa_su_kien_chi_tiet('${v.id}')" style="cursor: pointer; font-size: 11px; color: #dc3545;" title="Xóa học sinh này">✖</span>
//                             </span>`;
//                     });
//                     htmlSuKien += `</div></div>`;
//                 }

//                 if (suKienKhac.length > 0) {
//                     htmlSuKien += `<div style="margin-top: 15px;">
//                                     <strong style="color: #d35400; font-size: 13px;">🎯 Sự kiện ghi nhận (${suKienKhac.length}):</strong>
//                                     <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 8px;">`;
//                     suKienKhac.forEach(sk => {
//                         let textGC = sk.ghi_chu ? ` - <i>${sk.ghi_chu}</i>` : '';
//                         let mauThe = sk.thong_tin_mo_rong?.mau_sac || '#fd7e14';

//                         let badgeDiem = '';
//                         if (sk.loai_the === 'Cho điểm' && sk.thong_tin_mo_rong?.diem_so) {
//                             badgeDiem = `<span style="background: #28a745; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold; font-size: 11px; margin-right: 5px;">⭐ ${sk.thong_tin_mo_rong.diem_so} điểm</span>`;
//                         }

//                         let htmlAnhMC = '';
//                         if (sk.thong_tin_mo_rong && sk.thong_tin_mo_rong.danh_sach_anh_minh_chung) {
//                             let dsMC = sk.thong_tin_mo_rong.danh_sach_anh_minh_chung;
//                             let mangMC = Array.isArray(dsMC) ? dsMC : dsMC.split(',').filter(l => l.trim());
//                             if (mangMC.length > 0) {
//                                 htmlAnhMC = `<div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 5px; padding-left: 10px; border-left: 2px solid ${mauThe};">`;
//                                 mangMC.forEach((linkMC, idxMC) => {
//                                     htmlAnhMC += `
//                                         <div style="position: relative; display: inline-block;">
//                                             <a href="${linkMC}" target="_blank">
//                                                 <img src="${taoLinkAnhPreview(linkMC)}" loading="lazy" style="height: 40px; width: 40px; object-fit: cover; border-radius: 4px; border: 1px solid #ccc; background: #fff; display: block;">
//                                             </a>
//                                             <button onclick="ham_20_20_xoa_anh_minh_chung('${sk.id}', ${idxMC})" style="position: absolute; top: -5px; right: -5px; background: #dc3545; color: white; border: none; border-radius: 50%; width: 16px; height: 16px; font-size: 9px; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center;" title="Xóa ảnh minh chứng này">×</button>
//                                         </div>`;
//                                 });
//                                 htmlAnhMC += `</div>`;
//                             }
//                         }

//                         htmlSuKien += `
//                             <div style="display: flex; justify-content: space-between; align-items: center; background: #fff; border: 1px solid #eee; padding: 8px 12px; border-radius: 6px; box-shadow: 0 1px 2px rgba(0,0,0,0.02); border-left: 4px solid ${mauThe};">
//                                 <div>
//                                     <b style="font-size: 13px;">${sk.ten_hoc_sinh}</b>: 
//                                     ${badgeDiem}
//                                     <span style="color: ${mauThe}; font-weight: bold; font-size: 12px;">[${sk.loai_the}]</span>
//                                     <span style="font-size: 12px; color: #555;">${textGC}</span>
//                                     ${htmlAnhMC}
//                                 </div>
//                                 <button onclick="ham_20_17_xoa_su_kien_chi_tiet('${sk.id}')" style="background: #f8d7da; color: #721c24; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: bold;" title="Xóa sự kiện này">🗑️ Xóa</button>
//                             </div>`;
//                     });
//                     htmlSuKien += `</div></div>`;
//                 }
//             }

//             let styleBaiGiang = isTimHocSinh ? 'display: none;' : 'display: block;';
//             let labelBaiGiang = isTimHocSinh ? '👁️ Xem chi tiết bài giảng' : '🔽 Thu gọn bài giảng';
//             let styleSuKien = isTimHocSinh ? 'display: block;' : 'display: none;';
//             let labelSuKien = isTimHocSinh ? `🔽 Thu gọn sự kiện (${tongSoSuKienTiet})` : `👁️ Xem sự kiện & điểm danh (${tongSoSuKienTiet})`;

//             htmlRender += `
//                 <div style="background: #fff; border: 1px solid #ced4da; border-radius: 8px; box-shadow: 0 3px 6px rgba(0,0,0,0.05); padding: 20px; animation: slideUp 0.4s ease-out;">
                    
//                     <div style="margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 12px;">
//                         <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
//                             <span style="background: #007bff; color: white; padding: 5px 12px; border-radius: 4px; font-weight: bold; font-size: 13px;">🏫 ${tenLopHienThi}</span>
//                             <span style="background: #17a2b8; color: white; padding: 5px 12px; border-radius: 4px; font-weight: bold; font-size: 13px;">🏷️ ${nk.phan_mon || 'Không rõ môn'}</span>
//                             <span style="color: #6c757d; font-size: 13px; font-weight: bold;">🕒 ${hienThiTiet} - ${nk.buoi} - ${thuHienTai}, Ngày ${strNgay}</span>
                            
//                             <button onclick="ham_20_18_xoa_nguyen_tiet('${nk.id}')" style="margin-left: auto; background: #dc3545; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-weight: bold; font-size: 12px;" title="Xóa toàn bộ tiết học">🗑️ Xóa tiết</button>
//                         </div>
//                     </div>

//                     <div style="margin-bottom: 15px;">
//                         <div style="margin-bottom: 8px;">
//                             <div onclick="let c = document.getElementById('bg-${nk.id}'); if(c.style.display === 'none') { c.style.display = 'block'; this.innerHTML = '🔽 Thu gọn bài giảng'; } else { c.style.display = 'none'; this.innerHTML = '👁️ Xem chi tiết bài giảng'; }" style="color: #007bff; font-size: 13px; font-weight: bold; cursor: pointer; display: inline-block; user-select: none;">
//                                 ${labelBaiGiang}
//                             </div>
//                         </div>

//                         <div id="bg-${nk.id}" style="${styleBaiGiang} padding-left: 10px; border-left: 3px solid #e9ecef;">
//                             ${htmlBaiGiang}
//                         </div>
//                     </div>
                    
//                     ${tongSoSuKienTiet > 0 ? `
//                         <div style="border-top: 1px dashed #ccc; padding-top: 10px;">
//                             <div onclick="let c = document.getElementById('sk-${nk.id}'); if(c.style.display === 'none') { c.style.display = 'block'; this.innerHTML = '🔽 Thu gọn sự kiện (${tongSoSuKienTiet})'; } else { c.style.display = 'none'; this.innerHTML = '👁️ Xem sự kiện & điểm danh (${tongSoSuKienTiet})'; }" style="color: #d35400; font-size: 13px; font-weight: bold; cursor: pointer; display: inline-block; user-select: none; margin-bottom: 8px;">
//                                 ${labelSuKien}
//                             </div>
//                             <div id="sk-${nk.id}" style="${styleSuKien} padding-left: 10px; border-left: 3px solid #ffeeba; background: #fafafa; padding: 10px; border-radius: 4px;">
//                                 ${htmlSuKien}
//                             </div>
//                         </div>
//                     ` : `
//                         <div style="border-top: 1px dashed #ccc; padding-top: 10px; font-size: 12px; color: #28a745; font-style: italic;">
//                             ✅ Lớp học ngoan, không có học sinh vắng hoặc vi phạm trong tiết này.
//                         </div>
//                     `}
//                 </div>
//             `;
//         });

//         vungKetQua.innerHTML = htmlRender;

//         document.querySelectorAll('.btn-luu-bai-giang-moi').forEach(btn => {
//             btn.addEventListener('click', async function () {
//                 let id = this.dataset.id;
//                 let tenBaiMoi = document.getElementById(`input-tenbai-${id}`).value.trim();
//                 let lyThuyetMoi = document.getElementById(`input-lythuyet-${id}`).value.trim();
//                 let baiTapMoi = document.getElementById(`input-baitap-${id}`).value.trim();
//                 let danDoMoi = document.getElementById(`input-dando-${id}`).value.trim();

//                 this.innerText = "⏳ Đang lưu...";
//                 this.disabled = true;

//                 try {
//                     const { error } = await _supabase
//                         .from('nhat_ky_day_hoc')
//                         .update({ ten_bai: tenBaiMoi, ly_thuyet: lyThuyetMoi, bai_tap: baiTapMoi, dan_do: danDoMoi })
//                         .eq('id', id);

//                     if (error) throw error;

//                     document.getElementById(`label-tenbai-${id}`).innerText = `📖 Bài học: ${tenBaiMoi || '(Chưa có tên bài)'}`;
//                     document.getElementById(`label-lythuyet-${id}`).innerHTML = lyThuyetMoi || '<i>(Không ghi chú)</i>';
//                     document.getElementById(`label-baitap-${id}`).innerHTML = baiTapMoi || '<i>(Không ghi chú)</i>';
//                     document.getElementById(`label-dando-${id}`).innerHTML = danDoMoi || '<i>(Không có)</i>';

//                     document.getElementById(`input-tenbai-${id}`).style.display = 'none'; document.getElementById(`label-tenbai-${id}`).style.display = 'block'; document.getElementById(`btn-sua-tenbai-${id}`).style.display = 'block';
//                     document.getElementById(`input-lythuyet-${id}`).style.display = 'none'; document.getElementById(`label-lythuyet-${id}`).style.display = 'block'; document.getElementById(`btn-sua-lythuyet-${id}`).style.display = 'block';
//                     document.getElementById(`input-baitap-${id}`).style.display = 'none'; document.getElementById(`label-baitap-${id}`).style.display = 'block'; document.getElementById(`btn-sua-baitap-${id}`).style.display = 'block';
//                     document.getElementById(`input-dando-${id}`).style.display = 'none'; document.getElementById(`label-dando-${id}`).style.display = 'block'; document.getElementById(`btn-sua-dando-${id}`).style.display = 'block';

//                     document.getElementById(`btn-luu-card-${id}`).style.display = 'none';

//                     alert("✅ Đã cập nhật bài giảng thành công!");
//                 } catch (err) {
//                     console.error("Lỗi cập nhật:", err);
//                     alert("❌ Không thể lưu thay đổi!");
//                 } finally {
//                     this.innerText = "💾 Lưu thay đổi";
//                     this.disabled = false;
//                 }
//             });
//         });

//     } catch (err) {
//         console.error("Lỗi tra cứu:", err);
//         vungKetQua.innerHTML = `<div style="text-align: center; color: red; padding: 20px;"><b>❌ Lỗi khi tải dữ liệu! Vui lòng thử lại.</b></div>`;
//     } finally {
//         btnLoc.innerHTML = textGoc;
//         btnLoc.disabled = false;
//     }
// };


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
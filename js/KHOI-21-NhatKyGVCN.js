// =====================================================================
// KHỐI 21: SỔ TAY GIÁO VIÊN CHỦ NHIỆM (QUẢN LÝ GIAO VIỆC & SỰ KIỆN TUẦN)
// Thiết kế: Tông màu Tím (#6f42c1) và Hồng (#e83e8c)
// Tính năng: Tự động tính ngày, Tự động UPSERT nội dung vào chung 1 tuần
// =====================================================================

// Mảng toàn cục lưu trữ dữ liệu tạm thời trên RAM
window.gvcn_AnhNoiDungTam = [];
window.gvcn_AnhSuKienTam = [];
window.gvcn_SuKienChoLuu = [];



// // =====================================================================
// // HÀM 21.1: VẼ GIAO DIỆN (ĐÃ KHÔI PHỤC ĐẦY ĐỦ CÁC NÚT HEADER)
// // =====================================================================
// window.ham_21_1_mo_giao_dien_nhat_ky_gvcn = function () {
//     const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
//     if (!vungLamViec) return;

//     const now = new Date();
//     now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
//     const currentDateTime = now.toISOString().slice(0, 16);
//     const currentDate = now.toISOString().split('T')[0];

//     let curr = new Date();
//     let first = curr.getDate() - curr.getDay() + 1;
//     let last = first + 6;
//     let monday = new Date(curr.setDate(first)).toISOString().split('T')[0];
//     let sunday = new Date(curr.setDate(last)).toISOString().split('T')[0];

//     let optionsTuan = '';
//     for (let i = 1; i <= 37; i++) optionsTuan += `<option value="Tuần ${i}"></option>`;

//     vungLamViec.innerHTML = `
//         <div style="padding: 10px; animation: fadeIn 0.4s ease-in-out;">
            
//             <!-- HEADER CÓ ĐẦY ĐỦ 5 NÚT THAO TÁC -->
//             <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #6f42c1; padding-bottom: 12px; margin-bottom: 25px;">
//                 <h3 style="color: #6f42c1; margin: 0; text-transform: uppercase; display: flex; align-items: center; gap: 10px; font-size: 20px;">
//                     🛡️ Sổ Tay Giáo Viên Chủ Nhiệm
//                 </h3>
                
//                 <div style="display: flex; gap: 10px; flex-wrap: wrap;">
//                     <button onclick="if(typeof ham_21_10_lam_moi_so_gvcn === 'function') ham_21_10_lam_moi_so_gvcn();" style="padding: 8px 15px; background: #e83e8c; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.15); transition: 0.2s;" onmouseover="this.style.background='#c63375'" onmouseout="this.style.background='#e83e8c'">
//                         🆕 Tuần mới
//                     </button>
//                     <button onclick="alert('Tính năng Xem tuần cũ đang phát triển...')" style="padding: 8px 15px; background: #17a2b8; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.15); transition: 0.2s;" onmouseover="this.style.background='#138496'" onmouseout="this.style.background='#17a2b8'">
//                         ⏮️ Xem tuần cũ
//                     </button>
//                     <button onclick="if(typeof ham_21_17_tai_tuan_gan_nhat === 'function') ham_21_17_tai_tuan_gan_nhat();" style="padding: 8px 15px; background: #28a745; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.15); transition: 0.2s;" onmouseover="this.style.background='#218838'" onmouseout="this.style.background='#28a745'">
//                         🔄 Tuần gần nhất
//                     </button>
//                     <button onclick="alert('Tính năng Tìm lại đang phát triển...')" style="padding: 8px 15px; background: #ffc107; color: #000; border: 1px solid #d39e00; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.15); transition: 0.2s;" onmouseover="this.style.background='#e0a800'" onmouseout="this.style.background='#ffc107'">
//                         🔍 Tìm lại
//                     </button>
//                     <button onclick="ham_3_1_ve_dashboard_admin()" style="padding: 8px 15px; background: #6c757d; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.15); transition: 0.2s;" onmouseover="this.style.background='#5a6268'" onmouseout="this.style.background='#6c757d'">
//                         ⬅️ Quay lại
//                     </button>
//                 </div>
//             </div>

//             <!-- MỤC 1 -->
//             <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; border: 1px solid #dee2e6; box-shadow: 0 4px 6px rgba(0,0,0,0.03); margin-bottom: 25px;">
//                 <h4 style="margin: 0 0 15px 0; color: #495057; font-size: 16px;">🕒 1. Thông tin Tuần</h4>
//                 <div style="display: flex; flex-wrap: wrap; gap: 20px;">
//                     <div style="flex: 0 0 220px;">
//                         <label style="font-weight: bold; font-size: 14px; color: #495057; margin-bottom: 5px; display: block;">Lớp Chủ Nhiệm:</label>
//                         <input id="gvcn-input-lop" list="dl-lop" onchange="if(typeof window.ham_21_2_tai_danh_sach_hs_chu_nhiem === 'function') window.ham_21_2_tai_danh_sach_hs_chu_nhiem();" placeholder="Chọn lớp..." style="width: 100%; padding: 10px; border: 2px solid #6f42c1; border-radius: 6px; box-sizing: border-box; font-weight: bold; font-size: 15px; color: #6f42c1; outline: none; background: #fdfbfe;">
//                         <datalist id="dl-lop"></datalist>
//                         <datalist id="gvcn-dl-hs"></datalist>
//                     </div>
//                     <div style="flex: 1; min-width: 450px;">
//                         <label style="font-weight: bold; font-size: 14px; color: #495057; margin-bottom: 5px; display: block;">Tuần học (Từ 1 - 37):</label>
//                         <div style="display: flex; gap: 10px; align-items: center;">
//                             <input id="gvcn-input-tuan" list="dl-tuan" onchange="if(typeof ham_21_16_tai_du_lieu_tuan === 'function') ham_21_16_tai_du_lieu_tuan();" placeholder="Tuần..." style="width: 130px; padding: 10px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; font-weight: bold; font-size: 14px; outline: none;">
//                             <datalist id="dl-tuan">${optionsTuan}</datalist>
//                             <span style="font-size:13px; font-weight:bold; color:#6c757d;">Từ:</span>
//                             <input type="date" id="gvcn-tuan-tu" value="${monday}" onchange="if(typeof ham_21_12_tu_dong_tinh_ngay_den === 'function') ham_21_12_tu_dong_tinh_ngay_den();" style="flex: 1; padding: 10px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; font-size: 13px; font-weight: bold; outline: none;">
//                             <span style="font-size:13px; font-weight:bold; color:#6c757d;">Đến:</span>
//                             <input type="date" id="gvcn-tuan-den" value="${sunday}" style="flex: 1; padding: 10px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; font-size: 13px; font-weight: bold; outline: none;">
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div style="display: flex; flex-direction: column; gap: 25px; width: 100%;">
                
//                 <!-- MỤC 2 -->
//                 <div style="background: #fff; padding: 25px; border-radius: 10px; border: 1px solid #dee2e6; box-shadow: 0 4px 10px rgba(0,0,0,0.03); width: 100%; box-sizing: border-box;">
//                     <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px dashed #d1ecf1; padding-bottom: 10px; margin-bottom: 15px;">
//                         <h4 style="margin: 0; color: #17a2b8; font-size: 17px;">📝 2. Nội dung chung của Tuần (Sinh hoạt lớp)</h4>
//                         <button onclick="window.ham_21_22_toggle_muc('body-muc-2', this);" style="background: #f8f9fa; border: 1px solid #ccc; padding: 5px 12px; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: bold;">➖ Thu hẹp</button>
//                     </div>
//                     <div id="body-muc-2">
//                         <textarea id="gvcn-nd-sinh-hoat" placeholder="Nhập các nội dung chính đã sinh hoạt chung..." style="width: 100%; padding: 12px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; resize: vertical; min-height: 90px; font-family: inherit; font-size:14px; outline: none; margin-bottom: 15px;"></textarea>
//                         <label style="font-weight: bold; font-size: 13px; color: #495057; display: block; margin-bottom: 8px;">📸 Ảnh của Tuần (Hình ảnh lớp / Biên bản SHL):</label>
//                         <div id="gvcn-vung-anh-cu-tuan" style="display: flex; gap: 15px; flex-wrap: wrap; margin-bottom: 15px; align-items: flex-start;"></div>
//                         <div style="display: flex; gap: 15px; align-items: stretch; margin-bottom: 15px;">
//                             <button type="button" onclick="document.getElementById('gvcn-input-anh-tuan').click()" style="padding: 10px 15px; background: #f8f9fa; color: #17a2b8; border: 1px dashed #17a2b8; border-radius: 6px; cursor: pointer; font-weight: bold; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 5px; flex-shrink: 0;"><span style="font-size: 20px;">📷</span><span style="font-size: 11px;">Chụp/Thêm ảnh mới</span></button>
//                             <input type="file" id="gvcn-input-anh-tuan" accept="image/*" multiple style="display: none;">
//                             <div id="gvcn-vung-preview-anh-tuan" style="flex: 1; border: 1px dashed #ccc; border-radius: 6px; display: flex; align-items: center; color: #adb5bd; font-size: 12px; font-style: italic; background: #fafafa; padding: 8px; gap: 8px; overflow-x: auto;"><span>(Ảnh thêm mới sẽ hiển thị tại đây...)</span></div>
//                         </div>
//                     </div>
//                 </div>

//                 <!-- MỤC 3 -->
//                 <div style="background: #fff; padding: 25px; border-radius: 10px; border: 1px solid #dee2e6; box-shadow: 0 4px 10px rgba(0,0,0,0.03); width: 100%; box-sizing: border-box;">
//                     <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px dashed #d4edda; padding-bottom: 10px; margin-bottom: 15px;">
//                         <h4 style="margin: 0; color: #28a745; font-size: 17px;">🌟 3. Đánh giá Tuần</h4>
//                         <button onclick="window.ham_21_22_toggle_muc('body-muc-3', this);" style="background: #f8f9fa; border: 1px solid #ccc; padding: 5px 12px; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: bold;">➖ Thu hẹp</button>
//                     </div>
//                     <div id="body-muc-3">
//                         <textarea id="gvcn-danh-gia-tuan" placeholder="Nhập nhận xét tổng quan..." style="width: 100%; padding: 12px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; margin-bottom: 15px; resize: vertical; min-height: 90px; font-family: inherit; font-size:14px; outline: none;"></textarea>
//                         <div style="text-align: right;"><button onclick="if(typeof ham_21_14_luu_thong_tin_tuan === 'function') ham_21_14_luu_thong_tin_tuan(this);" style="padding: 10px 25px; background: #28a745; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; box-shadow:0 2px 4px rgba(0,0,0,0.2); font-size: 13px;">💾 LƯU CHUNG MỤC 2 & MỤC 3</button></div>
//                     </div>
//                 </div>

//                 <!-- 🌟 MỤC 4: TỪNG NỘI DUNG CÓ GIAO VIỆC -->
//                 <div style="background: #fff; padding: 25px; border-radius: 10px; border: 1px solid #dee2e6; box-shadow: 0 4px 10px rgba(0,0,0,0.03); width: 100%; box-sizing: border-box;">
//                     <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px dashed #cce5ff; padding-bottom: 10px; margin-bottom: 15px;">
//                         <h4 style="margin: 0; color: #0056b3; font-size: 17px;">📋 4. Từng nội dung có Giao việc</h4>
//                         <button onclick="window.ham_21_22_toggle_muc('body-muc-4', this);" style="background: #f8f9fa; border: 1px solid #ccc; padding: 5px 12px; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: bold;">➖ Thu hẹp</button>
//                     </div>

//                     <div id="body-muc-4">
//                         <div id="gvcn-bang-noi-dung-cu" style="width: 100%; overflow-x: auto;"></div>

//                         <div style="background: #f0f8ff; padding: 15px; border-radius: 8px; border: 1px solid #b8daff; margin-bottom: 15px;">
//                             <h5 style="margin: 0 0 10px 0; color: #0056b3;">➕ Thêm nội dung / Giao việc mới:</h5>
//                             <div style="display: flex; gap: 15px; margin-bottom: 15px;">
//                                 <div style="flex: 1;">
//                                     <label style="font-weight: bold; font-size: 12px; color: #495057; display:block; margin-bottom:5px;">Ngày giờ nhập:</label>
//                                     <input type="datetime-local" id="gvcn-nd-ngay" value="${currentDateTime}" style="width: 100%; min-width:200px; padding: 10px; border: 1px solid #ced4da; border-radius: 6px; font-size: 13px; outline: none; box-sizing: border-box;">
//                                 </div>
//                             </div>
//                             <label style="font-weight: bold; font-size: 13px; color: #0056b3; display:block; margin-bottom:5px;">Tên Nội dung / Công việc (Bắt buộc):</label>
//                             <input type="text" id="gvcn-nd-ten" placeholder="VD: Phân công trực nhật..." style="width: 100%; padding: 10px; border: 2px solid #0056b3; border-radius: 6px; font-size: 14px; font-weight:bold; color:#0056b3; outline: none; margin-bottom:15px; background:#fff; box-sizing: border-box;">
//                             <label style="font-weight: bold; font-size: 12px; color: #495057; display:block; margin-bottom:5px;">Chi tiết nội dung:</label>
//                             <textarea id="gvcn-nd-chitiet" placeholder="Mô tả chi tiết..." style="width: 100%; padding: 10px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; margin-bottom: 15px; resize: vertical; min-height: 60px; font-family: inherit; font-size:13px; outline: none;"></textarea>

//                             <div style="background: #fff; padding: 15px; border-radius: 8px; border: 1px dashed #ccc; margin-bottom: 15px;">
//                                 <label style="font-weight: bold; font-size: 13px; color: #e83e8c; display:block; margin-bottom:10px;">👤 Danh sách học sinh nhận việc:</label>
//                                 <div id="gvcn-khu-vuc-nguoi-nhan" style="display: flex; flex-direction: column; gap: 10px;">
                                    
//                                     <!-- 🌟 DÒNG HỌC SINH -->
//                                     <div class="dong-nguoi-nhan" style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap; background: #f8f9fa; padding: 6px; border-radius: 6px; border: 1px solid #eee;">
//                                         <div style="display:flex; align-items:center; gap:8px; flex:1.5; min-width:160px; border:1px solid #ced4da; border-radius:4px; padding:4px 8px; background:#fff;">
//                                             <img class="avatar-preview" src="" style="width:24px; height:24px; border-radius:50%; object-fit:cover; display:none; border:1px solid #eee;">
//                                             <input class="gvcn-input-hs" placeholder="Chọn học sinh..." style="border:none; outline:none; flex:1; width:100%; font-size:12px; font-weight:bold; color:#1a73e8;">
//                                         </div>
//                                         <input class="gvcn-input-phan-viec" placeholder="Phần việc..." style="flex: 1.5; min-width: 110px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; font-weight:bold; outline: none;">
                                        
//                                         <select class="gvcn-sel-trangthai" style="flex: 1; min-width: 90px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; background:#fff; cursor:pointer;">
//                                             <option value="Chưa làm">❌ Chưa làm</option>
//                                             <option value="Đang làm">⏳ Đang làm</option>
//                                             <option value="Chưa xong">⚠️ Chưa xong</option>
//                                             <option value="Đã xong">✅ Đã xong</option>
//                                         </select>

//                                         <select class="gvcn-sel-danhgia" style="flex: 1; min-width: 90px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; background:#fff; cursor:pointer;">
//                                             <option value="">Chưa đánh giá</option><option value="Tốt">🌟 Tốt</option><option value="Khá">👍 Khá</option>
//                                             <option value="Trung Bình">😐 TB</option><option value="Chưa đạt">❌ Chưa đạt</option>
//                                         </select>
//                                         <input class="gvcn-input-note" placeholder="Ghi chú..." style="flex: 1; min-width: 90px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none;">
                                        
//                                         <!-- Vùng tải ảnh cá nhân -->
//                                         <div style="display:flex; align-items:center; gap:5px; background:#fff; padding:3px; border:1px solid #ced4da; border-radius:4px;">
//                                             <button type="button" class="btn-anh-hs" onclick="this.nextElementSibling.click()" style="padding: 4px 8px; background: #e0f7fa; color: #00838f; border: 1px dashed #00acc1; border-radius: 4px; cursor: pointer; font-size:12px; font-weight:bold;" title="Đính kèm ảnh minh chứng riêng">📷 Ảnh</button>
//                                             <input type="file" accept="image/*" class="input-anh-hs" style="display:none;" onchange="if(typeof window.ham_21_23_chon_anh_hs === 'function') window.ham_21_23_chon_anh_hs(this)">
//                                             <img class="preview-anh-hs" src="" style="width:24px; height:24px; object-fit:cover; border-radius:4px; border:1px solid #00acc1; cursor:pointer; display:none;" onclick="this.previousElementSibling.click()" title="Bấm để đổi ảnh">
//                                             <button type="button" class="btn-xoa-anh-hs" onclick="if(typeof window.ham_21_24_xoa_anh_hs === 'function') window.ham_21_24_xoa_anh_hs(this)" style="display:none; background:none; border:none; color:#dc3545; cursor:pointer; font-size:16px; padding:0 3px;" title="Xóa ảnh">✖</button>
//                                         </div>

//                                         <button onclick="this.parentElement.remove()" style="padding: 6px 10px; background: #f8d7da; color: #dc3545; border: none; border-radius: 4px; cursor: pointer;" title="Xóa dòng học sinh">✖</button>
//                                     </div>

//                                 </div>
//                                 <button onclick="if(typeof ham_21_3_them_dong_nguoi_nhan === 'function') ham_21_3_them_dong_nguoi_nhan();" style="margin-top: 10px; padding: 6px 12px; background: #fff; border: 1px dashed #e83e8c; color: #e83e8c; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: bold;">
//                                     ➕ Thêm học sinh nhận việc
//                                 </button>
//                             </div>

//                             <!-- Ảnh chung của nội dung -->
//                             <div style="display: flex; gap: 15px; align-items: stretch;">
//                                 <button type="button" onclick="document.getElementById('gvcn-input-anh-nd').click()" style="padding: 8px 12px; background: #e0f7fa; color: #00838f; border: 1px dashed #00acc1; border-radius: 4px; cursor: pointer; font-weight: bold; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px; flex-shrink: 0;"><span style="font-size: 18px;">📷</span><span style="font-size: 11px;">Tải ảnh chung</span></button>
//                                 <input type="file" id="gvcn-input-anh-nd" accept="image/*" multiple style="display: none;">
//                                 <div id="gvcn-vung-preview-anh-nd" style="flex: 1; border: 1px dashed #ccc; border-radius: 4px; display: flex; align-items: center; color: #adb5bd; font-size: 11px; font-style: italic; background: #fff; padding: 8px; gap: 8px; overflow-x: auto;"><span>(Ảnh đính kèm chung cho công việc...)</span></div>
//                             </div>
//                         </div>

//                         <div style="text-align: right;">
//                             <button onclick="if(typeof ham_21_13_luu_noi_dung_tuan === 'function') ham_21_13_luu_noi_dung_tuan(this);" style="padding: 10px 25px; background: #0056b3; color: white; border: none; border-radius: 6px; font-weight: bold; font-size:13px; cursor: pointer; box-shadow:0 2px 4px rgba(0,0,0,0.2);">💾 THÊM CÔNG VIỆC MỚI VÀO MỤC 4</button>
//                         </div>
//                     </div>
//                 </div>

//                 <!-- MỤC 5 -->
//                 <div style="background: #fff; padding: 25px; border-radius: 10px; border: 1px solid #dee2e6; box-shadow: 0 4px 10px rgba(0,0,0,0.03); width: 100%; box-sizing: border-box;">
//                     <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px dashed #fce4ec; padding-bottom: 10px; margin-bottom: 15px;">
//                         <h4 style="margin: 0; color: #e83e8c; font-size: 17px;">🎯 5. Quản lý Sự kiện (Tuần trước / Vi phạm)</h4>
//                         <button onclick="window.ham_21_22_toggle_muc('body-muc-5', this);" style="background: #f8f9fa; border: 1px solid #ccc; padding: 5px 12px; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: bold;">➖ Thu hẹp</button>
//                     </div>
//                     <div id="body-muc-5">
//                         <label style="font-weight: bold; font-size: 14px; color: #dc3545; display:block; margin-bottom:5px;">B1. Chọn Tuần xảy ra sự kiện:</label>
//                         <select id="gvcn-sk-tuan-chon" style="width: 100%; padding: 12px; border: 2px solid #e83e8c; border-radius: 6px; font-weight: bold; font-size:14px; color: #e83e8c; margin-bottom: 15px; outline: none; background:#fdf5f8; cursor:pointer; box-sizing: border-box;">
//                             <option value="">-- Bấm để Chọn tuần xảy ra sự kiện --</option>
//                             ${optionsTuan}
//                         </select>
//                         <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border: 1px solid #ced4da; margin-bottom: 15px;">
//                             <label style="font-weight: bold; font-size: 13px; color: #495057; display:block; margin-bottom:10px;">B2. Nhập danh sách Sự kiện / Vi phạm:</label>
//                             <div id="gvcn-khu-vuc-su-kien-nhanh" style="display: flex; flex-direction: column; gap: 10px;">
//                                 <div class="dong-nhap-su-kien" style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap; background: #fff; padding: 6px; border-radius: 6px; border: 1px dashed #ccc;">
//                                     <input type="date" class="sk-ngay" value="${currentDate}" style="width: 130px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; font-weight:bold;">
//                                     <select class="sk-buoi" style="width: 80px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; cursor:pointer;">
//                                         <option value="Sáng">Sáng</option><option value="Trưa">Trưa</option><option value="Chiều">Chiều</option><option value="Tối">Tối</option>
//                                     </select>
//                                     <div style="display:flex; align-items:center; gap:8px; flex:1.5; min-width:180px; border:2px solid #e83e8c; border-radius:4px; padding:4px 8px; background:#fdf5f8;">
//                                         <img class="avatar-preview" src="" style="width:24px; height:24px; border-radius:50%; object-fit:cover; display:none; border:1px solid #eee;">
//                                         <input class="sk-hs" placeholder="👤 Chọn học sinh..." style="border:none; outline:none; flex:1; width:100%; font-size:13px; font-weight:bold; background:transparent; color:#e83e8c;">
//                                     </div>
//                                     <input class="sk-loi" list="gvcn-dl-loi" placeholder="🚨 Gõ tìm lỗi/sự kiện..." style="flex: 1.5; min-width: 140px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 13px; font-weight:bold; outline: none;">
//                                     <button onclick="this.parentElement.remove()" style="padding: 8px 12px; background: #fff; color: #dc3545; border: 1px solid #dc3545; border-radius: 4px; cursor: pointer;" title="Xóa">✖</button>
//                                 </div>
//                             </div>
//                             <button onclick="if(typeof ham_21_4_them_dong_su_kien === 'function') ham_21_4_them_dong_su_kien();" style="margin-top: 10px; padding: 8px 15px; background: #fff; border: 1px dashed #e83e8c; color: #e83e8c; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: bold;">➕ Thêm dòng sự kiện mới</button>
//                         </div>
//                         <datalist id="gvcn-dl-loi"></datalist>
//                         <div style="margin-bottom: 15px;">
//                             <label style="font-weight: bold; font-size: 13px; color: #495057; display: block; margin-bottom: 8px;">B3. 📸 Ảnh minh chứng chung (Cho các sự kiện trên):</label>
//                             <div style="display: flex; gap: 15px; align-items: stretch;">
//                                 <button type="button" onclick="document.getElementById('gvcn-input-anh-sk').click()" style="padding: 10px 15px; background: #f8f9fa; color: #495057; border: 1px dashed #adb5bd; border-radius: 6px; cursor: pointer; font-weight: bold; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 5px; flex-shrink: 0;"><span style="font-size: 20px;">📷</span><span style="font-size: 11px;">Tải ảnh lên</span></button>
//                                 <input type="file" id="gvcn-input-anh-sk" accept="image/*" multiple style="display: none;">
//                                 <div id="gvcn-vung-preview-anh-sk" style="flex: 1; border: 1px dashed #ccc; border-radius: 6px; display: flex; align-items: center; color: #adb5bd; font-size: 12px; font-style: italic; background: #fafafa; padding: 8px; gap: 8px; overflow-x: auto;"><span>(Ảnh minh chứng sự kiện...)</span></div>
//                             </div>
//                         </div>
//                         <div style="text-align: center; margin-bottom: 15px;">
//                             <button onclick="if(typeof ham_21_6_dua_vao_danh_sach_cho === 'function') ham_21_6_dua_vao_danh_sach_cho();" style="padding: 12px 20px; background: #fff; color: #e83e8c; border: 2px dashed #e83e8c; border-radius: 6px; font-weight: bold; font-size: 15px; cursor: pointer; width: 100%;">⬇️ ĐƯA XUỐNG DANH SÁCH CHỜ LƯU</button>
//                         </div>
//                         <div style="background: #f8f9fa; border: 1px solid #ced4da; border-radius: 8px; padding: 15px; max-height: 350px; overflow-y: auto; margin-bottom: 15px;">
//                             <div style="font-size: 14px; font-weight: bold; color: #495057; margin-bottom: 12px; border-bottom: 2px solid #dee2e6; padding-bottom: 8px;">Sự kiện đang chờ lưu (<span id="gvcn-dem-su-kien" style="color:#e83e8c;">0</span>):</div>
//                             <div id="gvcn-danh-sach-cho-luu"><i style="color: #adb5bd; font-size: 13px;">Chưa có sự kiện nào...</i></div>
//                         </div>
//                         <div style="text-align: right;">
//                             <button onclick="if(typeof ham_21_15_luu_su_kien_tuan_truoc === 'function') ham_21_15_luu_su_kien_tuan_truoc(this);" style="padding: 12px 30px; background: #e83e8c; color: white; border: none; border-radius: 8px; font-weight: bold; font-size: 15px; cursor: pointer; box-shadow: 0 4px 10px rgba(232,62,140,0.3);">💾 LƯU CÁC SỰ KIỆN MỤC 5</button>
//                         </div>
//                     </div>
//                 </div>

//             </div>
//         </div>
//     `;

//     if (typeof window.ham_20_7_tai_danh_sach_lop === 'function') window.ham_20_7_tai_danh_sach_lop();
//     if (typeof window.ham_21_5_tai_danh_sach_the_datalist === 'function') window.ham_21_5_tai_danh_sach_the_datalist();
//     if (typeof window.ham_21_8_kich_hoat_xu_ly_anh === 'function') window.ham_21_8_kich_hoat_xu_ly_anh();
// };


// // =====================================================================
// // HÀM 21.1: VẼ GIAO DIỆN (DỜI VÙNG TẢI ẢNH CHUNG LÊN TRÊN DANH SÁCH HS)
// // =====================================================================
// window.ham_21_1_mo_giao_dien_nhat_ky_gvcn = function () {
//     const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
//     if (!vungLamViec) return;

//     const now = new Date();
//     now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
//     const currentDateTime = now.toISOString().slice(0, 16);
//     const currentDate = now.toISOString().split('T')[0];

//     let curr = new Date();
//     let first = curr.getDate() - curr.getDay() + 1;
//     let last = first + 6;
//     let monday = new Date(curr.setDate(first)).toISOString().split('T')[0];
//     let sunday = new Date(curr.setDate(last)).toISOString().split('T')[0];

//     let optionsTuan = '';
//     for (let i = 1; i <= 37; i++) optionsTuan += `<option value="Tuần ${i}"></option>`;

//     vungLamViec.innerHTML = `
//         <div style="padding: 10px; animation: fadeIn 0.4s ease-in-out;">
            
//             <!-- HEADER CÓ ĐẦY ĐỦ 5 NÚT THAO TÁC -->
//             <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #6f42c1; padding-bottom: 12px; margin-bottom: 25px;">
//                 <h3 style="color: #6f42c1; margin: 0; text-transform: uppercase; display: flex; align-items: center; gap: 10px; font-size: 20px;">
//                     🛡️ Sổ Tay Giáo Viên Chủ Nhiệm
//                 </h3>
                
//                 <div style="display: flex; gap: 10px; flex-wrap: wrap;">
//                     <button onclick="if(typeof ham_21_10_lam_moi_so_gvcn === 'function') ham_21_10_lam_moi_so_gvcn();" style="padding: 8px 15px; background: #e83e8c; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.15); transition: 0.2s;" onmouseover="this.style.background='#c63375'" onmouseout="this.style.background='#e83e8c'">
//                         🆕 Tuần mới
//                     </button>
//                     <button onclick="alert('Tính năng Xem tuần cũ đang phát triển...')" style="padding: 8px 15px; background: #17a2b8; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.15); transition: 0.2s;" onmouseover="this.style.background='#138496'" onmouseout="this.style.background='#17a2b8'">
//                         ⏮️ Xem tuần cũ
//                     </button>
//                     <button onclick="if(typeof ham_21_17_tai_tuan_gan_nhat === 'function') ham_21_17_tai_tuan_gan_nhat();" style="padding: 8px 15px; background: #28a745; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.15); transition: 0.2s;" onmouseover="this.style.background='#218838'" onmouseout="this.style.background='#28a745'">
//                         🔄 Tuần gần nhất
//                     </button>
//                     <button onclick="alert('Tính năng Tìm lại đang phát triển...')" style="padding: 8px 15px; background: #ffc107; color: #000; border: 1px solid #d39e00; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.15); transition: 0.2s;" onmouseover="this.style.background='#e0a800'" onmouseout="this.style.background='#ffc107'">
//                         🔍 Tìm lại
//                     </button>
//                     <button onclick="ham_3_1_ve_dashboard_admin()" style="padding: 8px 15px; background: #6c757d; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.15); transition: 0.2s;" onmouseover="this.style.background='#5a6268'" onmouseout="this.style.background='#6c757d'">
//                         ⬅️ Quay lại
//                     </button>
//                 </div>
//             </div>

//             <!-- MỤC 1 -->
//             <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; border: 1px solid #dee2e6; box-shadow: 0 4px 6px rgba(0,0,0,0.03); margin-bottom: 25px;">
//                 <h4 style="margin: 0 0 15px 0; color: #495057; font-size: 16px;">🕒 1. Thông tin Tuần</h4>
//                 <div style="display: flex; flex-wrap: wrap; gap: 20px;">
//                     <div style="flex: 0 0 220px;">
//                         <label style="font-weight: bold; font-size: 14px; color: #495057; margin-bottom: 5px; display: block;">Lớp Chủ Nhiệm:</label>
//                         <input id="gvcn-input-lop" list="dl-lop" onchange="if(typeof window.ham_21_2_tai_danh_sach_hs_chu_nhiem === 'function') window.ham_21_2_tai_danh_sach_hs_chu_nhiem();" placeholder="Chọn lớp..." style="width: 100%; padding: 10px; border: 2px solid #6f42c1; border-radius: 6px; box-sizing: border-box; font-weight: bold; font-size: 15px; color: #6f42c1; outline: none; background: #fdfbfe;">
//                         <datalist id="dl-lop"></datalist>
//                         <datalist id="gvcn-dl-hs"></datalist>
//                     </div>
//                     <div style="flex: 1; min-width: 450px;">
//                         <label style="font-weight: bold; font-size: 14px; color: #495057; margin-bottom: 5px; display: block;">Tuần học (Từ 1 - 37):</label>
//                         <div style="display: flex; gap: 10px; align-items: center;">
//                             <input id="gvcn-input-tuan" list="dl-tuan" onchange="if(typeof ham_21_16_tai_du_lieu_tuan === 'function') ham_21_16_tai_du_lieu_tuan();" placeholder="Tuần..." style="width: 130px; padding: 10px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; font-weight: bold; font-size: 14px; outline: none;">
//                             <datalist id="dl-tuan">${optionsTuan}</datalist>
//                             <span style="font-size:13px; font-weight:bold; color:#6c757d;">Từ:</span>
//                             <input type="date" id="gvcn-tuan-tu" value="${monday}" onchange="if(typeof ham_21_12_tu_dong_tinh_ngay_den === 'function') ham_21_12_tu_dong_tinh_ngay_den();" style="flex: 1; padding: 10px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; font-size: 13px; font-weight: bold; outline: none;">
//                             <span style="font-size:13px; font-weight:bold; color:#6c757d;">Đến:</span>
//                             <input type="date" id="gvcn-tuan-den" value="${sunday}" style="flex: 1; padding: 10px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; font-size: 13px; font-weight: bold; outline: none;">
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div style="display: flex; flex-direction: column; gap: 25px; width: 100%;">
                
//                 <!-- MỤC 2 -->
//                 <div style="background: #fff; padding: 25px; border-radius: 10px; border: 1px solid #dee2e6; box-shadow: 0 4px 10px rgba(0,0,0,0.03); width: 100%; box-sizing: border-box;">
//                     <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px dashed #d1ecf1; padding-bottom: 10px; margin-bottom: 15px;">
//                         <h4 style="margin: 0; color: #17a2b8; font-size: 17px;">📝 2. Nội dung chung của Tuần (Sinh hoạt lớp)</h4>
//                         <button onclick="window.ham_21_22_toggle_muc('body-muc-2', this);" style="background: #f8f9fa; border: 1px solid #ccc; padding: 5px 12px; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: bold;">➖ Thu hẹp</button>
//                     </div>
//                     <div id="body-muc-2">
//                         <textarea id="gvcn-nd-sinh-hoat" placeholder="Nhập các nội dung chính đã sinh hoạt chung..." style="width: 100%; padding: 12px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; resize: vertical; min-height: 90px; font-family: inherit; font-size:14px; outline: none; margin-bottom: 15px;"></textarea>
//                         <label style="font-weight: bold; font-size: 13px; color: #495057; display: block; margin-bottom: 8px;">📸 Ảnh của Tuần (Hình ảnh lớp / Biên bản SHL):</label>
//                         <div id="gvcn-vung-anh-cu-tuan" style="display: flex; gap: 15px; flex-wrap: wrap; margin-bottom: 15px; align-items: flex-start;"></div>
//                         <div style="display: flex; gap: 15px; align-items: stretch; margin-bottom: 15px;">
//                             <button type="button" onclick="document.getElementById('gvcn-input-anh-tuan').click()" style="padding: 10px 15px; background: #f8f9fa; color: #17a2b8; border: 1px dashed #17a2b8; border-radius: 6px; cursor: pointer; font-weight: bold; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 5px; flex-shrink: 0;"><span style="font-size: 20px;">📷</span><span style="font-size: 11px;">Chụp/Thêm ảnh mới</span></button>
//                             <input type="file" id="gvcn-input-anh-tuan" accept="image/*" multiple style="display: none;">
//                             <div id="gvcn-vung-preview-anh-tuan" style="flex: 1; border: 1px dashed #ccc; border-radius: 6px; display: flex; align-items: center; color: #adb5bd; font-size: 12px; font-style: italic; background: #fafafa; padding: 8px; gap: 8px; overflow-x: auto;"><span>(Ảnh thêm mới sẽ hiển thị tại đây...)</span></div>
//                         </div>
//                     </div>
//                 </div>

//                 <!-- MỤC 3 -->
//                 <div style="background: #fff; padding: 25px; border-radius: 10px; border: 1px solid #dee2e6; box-shadow: 0 4px 10px rgba(0,0,0,0.03); width: 100%; box-sizing: border-box;">
//                     <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px dashed #d4edda; padding-bottom: 10px; margin-bottom: 15px;">
//                         <h4 style="margin: 0; color: #28a745; font-size: 17px;">🌟 3. Đánh giá Tuần</h4>
//                         <button onclick="window.ham_21_22_toggle_muc('body-muc-3', this);" style="background: #f8f9fa; border: 1px solid #ccc; padding: 5px 12px; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: bold;">➖ Thu hẹp</button>
//                     </div>
//                     <div id="body-muc-3">
//                         <textarea id="gvcn-danh-gia-tuan" placeholder="Nhập nhận xét tổng quan..." style="width: 100%; padding: 12px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; margin-bottom: 15px; resize: vertical; min-height: 90px; font-family: inherit; font-size:14px; outline: none;"></textarea>
//                         <div style="text-align: right;"><button onclick="if(typeof ham_21_14_luu_thong_tin_tuan === 'function') ham_21_14_luu_thong_tin_tuan(this);" style="padding: 10px 25px; background: #28a745; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; box-shadow:0 2px 4px rgba(0,0,0,0.2); font-size: 13px;">💾 LƯU CHUNG MỤC 2 & MỤC 3</button></div>
//                     </div>
//                 </div>

//                 <!-- 🌟 MỤC 4: TỪNG NỘI DUNG CÓ GIAO VIỆC -->
//                 <div style="background: #fff; padding: 25px; border-radius: 10px; border: 1px solid #dee2e6; box-shadow: 0 4px 10px rgba(0,0,0,0.03); width: 100%; box-sizing: border-box;">
//                     <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px dashed #cce5ff; padding-bottom: 10px; margin-bottom: 15px;">
//                         <h4 style="margin: 0; color: #0056b3; font-size: 17px;">📋 4. Từng nội dung có Giao việc</h4>
//                         <button onclick="window.ham_21_22_toggle_muc('body-muc-4', this);" style="background: #f8f9fa; border: 1px solid #ccc; padding: 5px 12px; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: bold;">➖ Thu hẹp</button>
//                     </div>

//                     <div id="body-muc-4">
//                         <div id="gvcn-bang-noi-dung-cu" style="width: 100%; overflow-x: auto;"></div>

//                         <div style="background: #f0f8ff; padding: 15px; border-radius: 8px; border: 1px solid #b8daff; margin-bottom: 15px;">
//                             <h5 style="margin: 0 0 10px 0; color: #0056b3;">➕ Thêm nội dung / Giao việc mới:</h5>
//                             <div style="display: flex; gap: 15px; margin-bottom: 15px;">
//                                 <div style="flex: 1;">
//                                     <label style="font-weight: bold; font-size: 12px; color: #495057; display:block; margin-bottom:5px;">Ngày giờ nhập:</label>
//                                     <input type="datetime-local" id="gvcn-nd-ngay" value="${currentDateTime}" style="width: 100%; min-width:200px; padding: 10px; border: 1px solid #ced4da; border-radius: 6px; font-size: 13px; outline: none; box-sizing: border-box;">
//                                 </div>
//                             </div>
//                             <label style="font-weight: bold; font-size: 13px; color: #0056b3; display:block; margin-bottom:5px;">Tên Nội dung / Công việc (Bắt buộc):</label>
//                             <input type="text" id="gvcn-nd-ten" placeholder="VD: Phân công trực nhật..." style="width: 100%; padding: 10px; border: 2px solid #0056b3; border-radius: 6px; font-size: 14px; font-weight:bold; color:#0056b3; outline: none; margin-bottom:15px; background:#fff; box-sizing: border-box;">
                            
//                             <label style="font-weight: bold; font-size: 12px; color: #495057; display:block; margin-bottom:5px;">Chi tiết nội dung:</label>
//                             <textarea id="gvcn-nd-chitiet" placeholder="Mô tả chi tiết..." style="width: 100%; padding: 10px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; margin-bottom: 15px; resize: vertical; min-height: 60px; font-family: inherit; font-size:13px; outline: none;"></textarea>

//                             <!-- 🌟 VÙNG TẢI ẢNH CHUNG ĐƯỢC DỜI LÊN ĐÂY -->
//                             <label style="font-weight: bold; font-size: 13px; color: #00838f; display:block; margin-bottom:8px;">📸 Ảnh chung của nội dung này:</label>
//                             <div style="display: flex; gap: 15px; align-items: stretch; margin-bottom: 20px;">
//                                 <button type="button" onclick="document.getElementById('gvcn-input-anh-nd').click()" style="padding: 8px 12px; background: #e0f7fa; color: #00838f; border: 1px dashed #00acc1; border-radius: 4px; cursor: pointer; font-weight: bold; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px; flex-shrink: 0;"><span style="font-size: 18px;">📷</span><span style="font-size: 11px;">Tải ảnh chung</span></button>
//                                 <input type="file" id="gvcn-input-anh-nd" accept="image/*" multiple style="display: none;">
//                                 <div id="gvcn-vung-preview-anh-nd" style="flex: 1; border: 1px dashed #ccc; border-radius: 4px; display: flex; align-items: center; color: #adb5bd; font-size: 11px; font-style: italic; background: #fff; padding: 8px; gap: 8px; overflow-x: auto;"><span>(Ảnh đính kèm chung cho công việc...)</span></div>
//                             </div>

//                             <div style="background: #fff; padding: 15px; border-radius: 8px; border: 1px dashed #ccc; margin-bottom: 15px;">
//                                 <label style="font-weight: bold; font-size: 13px; color: #e83e8c; display:block; margin-bottom:10px;">👤 Danh sách học sinh nhận việc:</label>
//                                 <div id="gvcn-khu-vuc-nguoi-nhan" style="display: flex; flex-direction: column; gap: 10px;">
                                    
//                                     <div class="dong-nguoi-nhan" style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap; background: #f8f9fa; padding: 6px; border-radius: 6px; border: 1px solid #eee;">
//                                         <div style="display:flex; align-items:center; gap:8px; flex:1.5; min-width:160px; border:1px solid #ced4da; border-radius:4px; padding:4px 8px; background:#fff;">
//                                             <img class="avatar-preview" src="" style="width:24px; height:24px; border-radius:50%; object-fit:cover; display:none; border:1px solid #eee;">
//                                             <input class="gvcn-input-hs" placeholder="Chọn học sinh..." style="border:none; outline:none; flex:1; width:100%; font-size:12px; font-weight:bold; color:#1a73e8;">
//                                         </div>
//                                         <input class="gvcn-input-phan-viec" placeholder="Phần việc..." style="flex: 1.5; min-width: 110px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; font-weight:bold; outline: none;">
                                        
//                                         <select class="gvcn-sel-trangthai" style="flex: 1; min-width: 90px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; background:#fff; cursor:pointer;">
//                                             <option value="Chưa làm">❌ Chưa làm</option>
//                                             <option value="Đang làm">⏳ Đang làm</option>
//                                             <option value="Chưa xong">⚠️ Chưa xong</option>
//                                             <option value="Đã xong">✅ Đã xong</option>
//                                         </select>

//                                         <select class="gvcn-sel-danhgia" style="flex: 1; min-width: 90px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; background:#fff; cursor:pointer;">
//                                             <option value="">Chưa đánh giá</option><option value="Tốt">🌟 Tốt</option><option value="Khá">👍 Khá</option>
//                                             <option value="Trung Bình">😐 TB</option><option value="Chưa đạt">❌ Chưa đạt</option>
//                                         </select>
//                                         <input class="gvcn-input-note" placeholder="Ghi chú..." style="flex: 1; min-width: 90px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none;">
                                        
//                                         <div style="display:flex; align-items:center; gap:5px; background:#fff; padding:3px; border:1px solid #ced4da; border-radius:4px;">
//                                             <button type="button" class="btn-anh-hs" onclick="this.nextElementSibling.click()" style="padding: 4px 8px; background: #e0f7fa; color: #00838f; border: 1px dashed #00acc1; border-radius: 4px; cursor: pointer; font-size:12px; font-weight:bold;" title="Đính kèm ảnh minh chứng riêng">📷 Ảnh</button>
//                                             <input type="file" accept="image/*" class="input-anh-hs" style="display:none;" onchange="if(typeof window.ham_21_23_chon_anh_hs === 'function') window.ham_21_23_chon_anh_hs(this)">
//                                             <img class="preview-anh-hs" src="" style="width:24px; height:24px; object-fit:cover; border-radius:4px; border:1px solid #00acc1; cursor:pointer; display:none;" onclick="this.previousElementSibling.click()" title="Bấm để đổi ảnh">
//                                             <button type="button" class="btn-xoa-anh-hs" onclick="if(typeof window.ham_21_24_xoa_anh_hs === 'function') window.ham_21_24_xoa_anh_hs(this)" style="display:none; background:none; border:none; color:#dc3545; cursor:pointer; font-size:16px; padding:0 3px;" title="Xóa ảnh">✖</button>
//                                         </div>

//                                         <button onclick="this.parentElement.remove()" style="padding: 6px 10px; background: #f8d7da; color: #dc3545; border: none; border-radius: 4px; cursor: pointer;" title="Xóa dòng học sinh">✖</button>
//                                     </div>

//                                 </div>
//                                 <button onclick="if(typeof ham_21_3_them_dong_nguoi_nhan === 'function') ham_21_3_them_dong_nguoi_nhan();" style="margin-top: 10px; padding: 6px 12px; background: #fff; border: 1px dashed #e83e8c; color: #e83e8c; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: bold;">
//                                     ➕ Thêm học sinh nhận việc
//                                 </button>
//                             </div>
//                         </div>

//                         <div style="text-align: right;">
//                             <button onclick="if(typeof ham_21_13_luu_noi_dung_tuan === 'function') ham_21_13_luu_noi_dung_tuan(this);" style="padding: 10px 25px; background: #0056b3; color: white; border: none; border-radius: 6px; font-weight: bold; font-size:13px; cursor: pointer; box-shadow:0 2px 4px rgba(0,0,0,0.2);">💾 THÊM CÔNG VIỆC MỚI VÀO MỤC 4</button>
//                         </div>
//                     </div>
//                 </div>

//                 <!-- MỤC 5 -->
//                 <div style="background: #fff; padding: 25px; border-radius: 10px; border: 1px solid #dee2e6; box-shadow: 0 4px 10px rgba(0,0,0,0.03); width: 100%; box-sizing: border-box;">
//                     <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px dashed #fce4ec; padding-bottom: 10px; margin-bottom: 15px;">
//                         <h4 style="margin: 0; color: #e83e8c; font-size: 17px;">🎯 5. Quản lý Sự kiện (Tuần trước / Vi phạm)</h4>
//                         <button onclick="window.ham_21_22_toggle_muc('body-muc-5', this);" style="background: #f8f9fa; border: 1px solid #ccc; padding: 5px 12px; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: bold;">➖ Thu hẹp</button>
//                     </div>
//                     <div id="body-muc-5">
//                         <label style="font-weight: bold; font-size: 14px; color: #dc3545; display:block; margin-bottom:5px;">B1. Chọn Tuần xảy ra sự kiện:</label>
//                         <select id="gvcn-sk-tuan-chon" style="width: 100%; padding: 12px; border: 2px solid #e83e8c; border-radius: 6px; font-weight: bold; font-size:14px; color: #e83e8c; margin-bottom: 15px; outline: none; background:#fdf5f8; cursor:pointer; box-sizing: border-box;">
//                             <option value="">-- Bấm để Chọn tuần xảy ra sự kiện --</option>
//                             ${optionsTuan}
//                         </select>
//                         <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border: 1px solid #ced4da; margin-bottom: 15px;">
//                             <label style="font-weight: bold; font-size: 13px; color: #495057; display:block; margin-bottom:10px;">B2. Nhập danh sách Sự kiện / Vi phạm:</label>
//                             <div id="gvcn-khu-vuc-su-kien-nhanh" style="display: flex; flex-direction: column; gap: 10px;">
//                                 <div class="dong-nhap-su-kien" style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap; background: #fff; padding: 6px; border-radius: 6px; border: 1px dashed #ccc;">
//                                     <input type="date" class="sk-ngay" value="${currentDate}" style="width: 130px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; font-weight:bold;">
//                                     <select class="sk-buoi" style="width: 80px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; cursor:pointer;">
//                                         <option value="Sáng">Sáng</option><option value="Trưa">Trưa</option><option value="Chiều">Chiều</option><option value="Tối">Tối</option>
//                                     </select>
//                                     <div style="display:flex; align-items:center; gap:8px; flex:1.5; min-width:180px; border:2px solid #e83e8c; border-radius:4px; padding:4px 8px; background:#fdf5f8;">
//                                         <img class="avatar-preview" src="" style="width:24px; height:24px; border-radius:50%; object-fit:cover; display:none; border:1px solid #eee;">
//                                         <input class="sk-hs" placeholder="👤 Chọn học sinh..." style="border:none; outline:none; flex:1; width:100%; font-size:13px; font-weight:bold; background:transparent; color:#e83e8c;">
//                                     </div>
//                                     <input class="sk-loi" list="gvcn-dl-loi" placeholder="🚨 Gõ tìm lỗi/sự kiện..." style="flex: 1.5; min-width: 140px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 13px; font-weight:bold; outline: none;">
//                                     <button onclick="this.parentElement.remove()" style="padding: 8px 12px; background: #fff; color: #dc3545; border: 1px solid #dc3545; border-radius: 4px; cursor: pointer;" title="Xóa">✖</button>
//                                 </div>
//                             </div>
//                             <button onclick="if(typeof ham_21_4_them_dong_su_kien === 'function') ham_21_4_them_dong_su_kien();" style="margin-top: 10px; padding: 8px 15px; background: #fff; border: 1px dashed #e83e8c; color: #e83e8c; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: bold;">➕ Thêm dòng sự kiện mới</button>
//                         </div>
//                         <datalist id="gvcn-dl-loi"></datalist>
//                         <div style="margin-bottom: 15px;">
//                             <label style="font-weight: bold; font-size: 13px; color: #495057; display: block; margin-bottom: 8px;">B3. 📸 Ảnh minh chứng chung (Cho các sự kiện trên):</label>
//                             <div style="display: flex; gap: 15px; align-items: stretch;">
//                                 <button type="button" onclick="document.getElementById('gvcn-input-anh-sk').click()" style="padding: 10px 15px; background: #f8f9fa; color: #495057; border: 1px dashed #adb5bd; border-radius: 6px; cursor: pointer; font-weight: bold; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 5px; flex-shrink: 0;"><span style="font-size: 20px;">📷</span><span style="font-size: 11px;">Tải ảnh lên</span></button>
//                                 <input type="file" id="gvcn-input-anh-sk" accept="image/*" multiple style="display: none;">
//                                 <div id="gvcn-vung-preview-anh-sk" style="flex: 1; border: 1px dashed #ccc; border-radius: 6px; display: flex; align-items: center; color: #adb5bd; font-size: 12px; font-style: italic; background: #fafafa; padding: 8px; gap: 8px; overflow-x: auto;"><span>(Ảnh minh chứng sự kiện...)</span></div>
//                             </div>
//                         </div>
//                         <div style="text-align: center; margin-bottom: 15px;">
//                             <button onclick="if(typeof ham_21_6_dua_vao_danh_sach_cho === 'function') ham_21_6_dua_vao_danh_sach_cho();" style="padding: 12px 20px; background: #fff; color: #e83e8c; border: 2px dashed #e83e8c; border-radius: 6px; font-weight: bold; font-size: 15px; cursor: pointer; width: 100%;">⬇️ ĐƯA XUỐNG DANH SÁCH CHỜ LƯU</button>
//                         </div>
//                         <div style="background: #f8f9fa; border: 1px solid #ced4da; border-radius: 8px; padding: 15px; max-height: 350px; overflow-y: auto; margin-bottom: 15px;">
//                             <div style="font-size: 14px; font-weight: bold; color: #495057; margin-bottom: 12px; border-bottom: 2px solid #dee2e6; padding-bottom: 8px;">Sự kiện đang chờ lưu (<span id="gvcn-dem-su-kien" style="color:#e83e8c;">0</span>):</div>
//                             <div id="gvcn-danh-sach-cho-luu"><i style="color: #adb5bd; font-size: 13px;">Chưa có sự kiện nào...</i></div>
//                         </div>
//                         <div style="text-align: right;">
//                             <button onclick="if(typeof ham_21_15_luu_su_kien_tuan_truoc === 'function') ham_21_15_luu_su_kien_tuan_truoc(this);" style="padding: 12px 30px; background: #e83e8c; color: white; border: none; border-radius: 8px; font-weight: bold; font-size: 15px; cursor: pointer; box-shadow: 0 4px 10px rgba(232,62,140,0.3);">💾 LƯU CÁC SỰ KIỆN MỤC 5</button>
//                         </div>
//                     </div>
//                 </div>

//             </div>
//         </div>
//     `;

//     if (typeof window.ham_20_7_tai_danh_sach_lop === 'function') window.ham_20_7_tai_danh_sach_lop();
//     if (typeof window.ham_21_5_tai_danh_sach_the_datalist === 'function') window.ham_21_5_tai_danh_sach_the_datalist();
//     if (typeof window.ham_21_8_kich_hoat_xu_ly_anh === 'function') window.ham_21_8_kich_hoat_xu_ly_anh();
// };


// =====================================================================
// KHAI BÁO BIẾN TẠM MỚI (Lưu giữ ảnh của tuần để hỗ trợ xóa)
// =====================================================================
window.gvcn_AnhTuanCuTam = [];

// // =====================================================================
// // HÀM 21.1: VẼ GIAO DIỆN (ĐÃ TÁCH NÚT LƯU RA KHỎI PHẦN THU HẸP MỤC 3)
// // =====================================================================
// window.ham_21_1_mo_giao_dien_nhat_ky_gvcn = function () {
//     const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
//     if (!vungLamViec) return;

//     const now = new Date();
//     now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
//     const currentDateTime = now.toISOString().slice(0, 16);
//     const currentDate = now.toISOString().split('T')[0];

//     let curr = new Date();
//     let first = curr.getDate() - curr.getDay() + 1;
//     let last = first + 6;
//     let monday = new Date(curr.setDate(first)).toISOString().split('T')[0];
//     let sunday = new Date(curr.setDate(last)).toISOString().split('T')[0];

//     let optionsTuan = '';
//     for (let i = 1; i <= 37; i++) optionsTuan += `<option value="Tuần ${i}"></option>`;

//     vungLamViec.innerHTML = `
//         <div style="padding: 10px; animation: fadeIn 0.4s ease-in-out;">
            
//             <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #6f42c1; padding-bottom: 12px; margin-bottom: 25px;">
//                 <h3 style="color: #6f42c1; margin: 0; text-transform: uppercase; display: flex; align-items: center; gap: 10px; font-size: 20px;">
//                     🛡️ Sổ Tay Giáo Viên Chủ Nhiệm
//                 </h3>
                
//                 <div style="display: flex; gap: 10px; flex-wrap: wrap;">
//                     <button onclick="if(typeof ham_21_10_lam_moi_so_gvcn === 'function') ham_21_10_lam_moi_so_gvcn();" style="padding: 8px 15px; background: #e83e8c; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.15); transition: 0.2s;" onmouseover="this.style.background='#c63375'" onmouseout="this.style.background='#e83e8c'">🆕 Tuần mới</button>
//                     <button onclick="alert('Tính năng Xem tuần cũ đang phát triển...')" style="padding: 8px 15px; background: #17a2b8; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.15); transition: 0.2s;" onmouseover="this.style.background='#138496'" onmouseout="this.style.background='#17a2b8'">⏮️ Xem tuần cũ</button>
//                     <button onclick="if(typeof ham_21_17_tai_tuan_gan_nhat === 'function') ham_21_17_tai_tuan_gan_nhat();" style="padding: 8px 15px; background: #28a745; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.15); transition: 0.2s;" onmouseover="this.style.background='#218838'" onmouseout="this.style.background='#28a745'">🔄 Tuần gần nhất</button>
//                     <button onclick="alert('Tính năng Tìm lại đang phát triển...')" style="padding: 8px 15px; background: #ffc107; color: #000; border: 1px solid #d39e00; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.15); transition: 0.2s;" onmouseover="this.style.background='#e0a800'" onmouseout="this.style.background='#ffc107'">🔍 Tìm lại</button>
//                     <button onclick="ham_3_1_ve_dashboard_admin()" style="padding: 8px 15px; background: #6c757d; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.15); transition: 0.2s;" onmouseover="this.style.background='#5a6268'" onmouseout="this.style.background='#6c757d'">⬅️ Quay lại</button>
//                 </div>
//             </div>

//             <!-- MỤC 1 -->
//             <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; border: 1px solid #dee2e6; box-shadow: 0 4px 6px rgba(0,0,0,0.03); margin-bottom: 25px;">
//                 <h4 style="margin: 0 0 15px 0; color: #495057; font-size: 16px;">🕒 1. Thông tin Tuần</h4>
//                 <div style="display: flex; flex-wrap: wrap; gap: 20px;">
//                     <div style="flex: 0 0 220px;">
//                         <label style="font-weight: bold; font-size: 14px; color: #495057; margin-bottom: 5px; display: block;">Lớp Chủ Nhiệm:</label>
//                         <input id="gvcn-input-lop" list="dl-lop" onchange="if(typeof window.ham_21_2_tai_danh_sach_hs_chu_nhiem === 'function') window.ham_21_2_tai_danh_sach_hs_chu_nhiem();" placeholder="Chọn lớp..." style="width: 100%; padding: 10px; border: 2px solid #6f42c1; border-radius: 6px; box-sizing: border-box; font-weight: bold; font-size: 15px; color: #6f42c1; outline: none; background: #fdfbfe;">
//                         <datalist id="dl-lop"></datalist>
//                         <datalist id="gvcn-dl-hs"></datalist>
//                     </div>
//                     <div style="flex: 1; min-width: 450px;">
//                         <label style="font-weight: bold; font-size: 14px; color: #495057; margin-bottom: 5px; display: block;">Tuần học (Từ 1 - 37):</label>
//                         <div style="display: flex; gap: 10px; align-items: center;">
//                             <input id="gvcn-input-tuan" list="dl-tuan" onchange="if(typeof ham_21_16_tai_du_lieu_tuan === 'function') ham_21_16_tai_du_lieu_tuan();" placeholder="Tuần..." style="width: 130px; padding: 10px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; font-weight: bold; font-size: 14px; outline: none;">
//                             <datalist id="dl-tuan">${optionsTuan}</datalist>
//                             <span style="font-size:13px; font-weight:bold; color:#6c757d;">Từ:</span>
//                             <input type="date" id="gvcn-tuan-tu" value="${monday}" onchange="if(typeof ham_21_12_tu_dong_tinh_ngay_den === 'function') ham_21_12_tu_dong_tinh_ngay_den();" style="flex: 1; padding: 10px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; font-size: 13px; font-weight: bold; outline: none;">
//                             <span style="font-size:13px; font-weight:bold; color:#6c757d;">Đến:</span>
//                             <input type="date" id="gvcn-tuan-den" value="${sunday}" style="flex: 1; padding: 10px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; font-size: 13px; font-weight: bold; outline: none;">
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div style="display: flex; flex-direction: column; gap: 25px; width: 100%;">
                
//                 <!-- MỤC 2 -->
//                 <div style="background: #fff; padding: 25px; border-radius: 10px; border: 1px solid #dee2e6; box-shadow: 0 4px 10px rgba(0,0,0,0.03); width: 100%; box-sizing: border-box;">
//                     <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px dashed #d1ecf1; padding-bottom: 10px; margin-bottom: 15px;">
//                         <h4 style="margin: 0; color: #17a2b8; font-size: 17px;">📝 2. Nội dung chung của Tuần (Sinh hoạt lớp)</h4>
//                         <button onclick="window.ham_21_22_toggle_muc('body-muc-2', this);" style="background: #f8f9fa; border: 1px solid #ccc; padding: 5px 12px; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: bold;">➖ Thu hẹp</button>
//                     </div>
//                     <div id="body-muc-2">
//                         <textarea id="gvcn-nd-sinh-hoat" placeholder="Nhập các nội dung chính đã sinh hoạt chung..." style="width: 100%; padding: 12px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; resize: vertical; min-height: 90px; font-family: inherit; font-size:14px; outline: none; margin-bottom: 15px;"></textarea>
//                         <label style="font-weight: bold; font-size: 13px; color: #495057; display: block; margin-bottom: 8px;">📸 Ảnh của Tuần (Hình ảnh lớp / Biên bản SHL):</label>
//                         <div id="gvcn-vung-anh-cu-tuan" style="display: flex; gap: 15px; flex-wrap: wrap; margin-bottom: 15px; align-items: flex-start;"></div>
//                         <div style="display: flex; gap: 15px; align-items: stretch; margin-bottom: 15px;">
//                             <button type="button" onclick="document.getElementById('gvcn-input-anh-tuan').click()" style="padding: 10px 15px; background: #f8f9fa; color: #17a2b8; border: 1px dashed #17a2b8; border-radius: 6px; cursor: pointer; font-weight: bold; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 5px; flex-shrink: 0;"><span style="font-size: 20px;">📷</span><span style="font-size: 11px;">Chụp/Thêm ảnh mới</span></button>
//                             <input type="file" id="gvcn-input-anh-tuan" accept="image/*" multiple style="display: none;">
//                             <div id="gvcn-vung-preview-anh-tuan" style="flex: 1; border: 1px dashed #ccc; border-radius: 6px; display: flex; align-items: center; color: #adb5bd; font-size: 12px; font-style: italic; background: #fafafa; padding: 8px; gap: 8px; overflow-x: auto;"><span>(Ảnh thêm mới sẽ hiển thị tại đây...)</span></div>
//                         </div>
//                     </div>
//                 </div>

//                 <!-- MỤC 3 -->
//                 <div style="background: #fff; padding: 25px; border-radius: 10px; border: 1px solid #dee2e6; box-shadow: 0 4px 10px rgba(0,0,0,0.03); width: 100%; box-sizing: border-box;">
//                     <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px dashed #d4edda; padding-bottom: 10px; margin-bottom: 15px;">
//                         <h4 style="margin: 0; color: #28a745; font-size: 17px;">🌟 3. Đánh giá Tuần</h4>
//                         <button onclick="window.ham_21_22_toggle_muc('body-muc-3', this);" style="background: #f8f9fa; border: 1px solid #ccc; padding: 5px 12px; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: bold;">➖ Thu hẹp</button>
//                     </div>
//                     <div id="body-muc-3">
//                         <textarea id="gvcn-danh-gia-tuan" placeholder="Nhập nhận xét tổng quan..." style="width: 100%; padding: 12px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; margin-bottom: 15px; resize: vertical; min-height: 90px; font-family: inherit; font-size:14px; outline: none;"></textarea>
//                     </div>
                    
//                     <!-- 🌟 NÚT LƯU ĐÃ ĐƯỢC ĐƯA XUỐNG DƯỚI, THOÁT KHỎI body-muc-3 -->
//                     <div style="text-align: right; margin-top: 10px; padding-top: 15px; border-top: 1px dashed #eee;">
//                         <button onclick="if(typeof ham_21_14_luu_thong_tin_tuan === 'function') ham_21_14_luu_thong_tin_tuan(this);" style="padding: 10px 25px; background: #28a745; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; box-shadow:0 2px 4px rgba(0,0,0,0.2); font-size: 13px; transition:0.2s;" onmouseover="this.style.background='#218838'" onmouseout="this.style.background='#28a745'">
//                             💾 LƯU CHUNG MỤC 2 & MỤC 3
//                         </button>
//                     </div>
//                 </div>

//                 <!-- MỤC 4 -->
//                 <div style="background: #fff; padding: 25px; border-radius: 10px; border: 1px solid #dee2e6; box-shadow: 0 4px 10px rgba(0,0,0,0.03); width: 100%; box-sizing: border-box;">
//                     <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px dashed #cce5ff; padding-bottom: 10px; margin-bottom: 15px;">
//                         <h4 style="margin: 0; color: #0056b3; font-size: 17px;">📋 4. Từng nội dung có Giao việc</h4>
//                         <button onclick="window.ham_21_22_toggle_muc('body-muc-4', this);" style="background: #f8f9fa; border: 1px solid #ccc; padding: 5px 12px; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: bold;">➖ Thu hẹp</button>
//                     </div>

//                     <div id="body-muc-4">
//                         <div id="gvcn-bang-noi-dung-cu" style="width: 100%; overflow-x: auto;"></div>

//                         <div style="background: #f0f8ff; padding: 15px; border-radius: 8px; border: 1px solid #b8daff; margin-bottom: 15px;">
//                             <h5 style="margin: 0 0 10px 0; color: #0056b3;">➕ Thêm nội dung / Giao việc mới:</h5>
//                             <div style="display: flex; gap: 15px; margin-bottom: 15px;">
//                                 <div style="flex: 1;">
//                                     <label style="font-weight: bold; font-size: 12px; color: #495057; display:block; margin-bottom:5px;">Ngày giờ nhập:</label>
//                                     <input type="datetime-local" id="gvcn-nd-ngay" value="${currentDateTime}" style="width: 100%; min-width:200px; padding: 10px; border: 1px solid #ced4da; border-radius: 6px; font-size: 13px; outline: none; box-sizing: border-box;">
//                                 </div>
//                             </div>
//                             <label style="font-weight: bold; font-size: 13px; color: #0056b3; display:block; margin-bottom:5px;">Tên Nội dung / Công việc (Bắt buộc):</label>
//                             <input type="text" id="gvcn-nd-ten" placeholder="VD: Phân công trực nhật..." style="width: 100%; padding: 10px; border: 2px solid #0056b3; border-radius: 6px; font-size: 14px; font-weight:bold; color:#0056b3; outline: none; margin-bottom:15px; background:#fff; box-sizing: border-box;">
                            
//                             <label style="font-weight: bold; font-size: 12px; color: #495057; display:block; margin-bottom:5px;">Chi tiết nội dung:</label>
//                             <textarea id="gvcn-nd-chitiet" placeholder="Mô tả chi tiết..." style="width: 100%; padding: 10px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; margin-bottom: 15px; resize: vertical; min-height: 60px; font-family: inherit; font-size:13px; outline: none;"></textarea>

//                             <label style="font-weight: bold; font-size: 13px; color: #00838f; display:block; margin-bottom:8px;">📸 Ảnh chung của nội dung này:</label>
//                             <div style="display: flex; gap: 15px; align-items: stretch; margin-bottom: 20px;">
//                                 <button type="button" onclick="document.getElementById('gvcn-input-anh-nd').click()" style="padding: 8px 12px; background: #e0f7fa; color: #00838f; border: 1px dashed #00acc1; border-radius: 4px; cursor: pointer; font-weight: bold; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px; flex-shrink: 0;"><span style="font-size: 18px;">📷</span><span style="font-size: 11px;">Tải ảnh chung</span></button>
//                                 <input type="file" id="gvcn-input-anh-nd" accept="image/*" multiple style="display: none;">
//                                 <div id="gvcn-vung-preview-anh-nd" style="flex: 1; border: 1px dashed #ccc; border-radius: 4px; display: flex; align-items: center; color: #adb5bd; font-size: 11px; font-style: italic; background: #fff; padding: 8px; gap: 8px; overflow-x: auto;"><span>(Ảnh đính kèm chung cho công việc...)</span></div>
//                             </div>

//                             <div style="background: #fff; padding: 15px; border-radius: 8px; border: 1px dashed #ccc; margin-bottom: 15px;">
//                                 <label style="font-weight: bold; font-size: 13px; color: #e83e8c; display:block; margin-bottom:10px;">👤 Danh sách học sinh nhận việc:</label>
//                                 <div id="gvcn-khu-vuc-nguoi-nhan" style="display: flex; flex-direction: column; gap: 10px;">
//                                     <div class="dong-nguoi-nhan" style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap; background: #f8f9fa; padding: 6px; border-radius: 6px; border: 1px solid #eee;">
//                                         <div style="display:flex; align-items:center; gap:8px; flex:1.5; min-width:160px; border:1px solid #ced4da; border-radius:4px; padding:4px 8px; background:#fff;">
//                                             <img class="avatar-preview" src="" style="width:24px; height:24px; border-radius:50%; object-fit:cover; display:none; border:1px solid #eee;">
//                                             <input class="gvcn-input-hs" placeholder="Chọn học sinh..." style="border:none; outline:none; flex:1; width:100%; font-size:12px; font-weight:bold; color:#1a73e8;">
//                                         </div>
//                                         <input class="gvcn-input-phan-viec" placeholder="Phần việc..." style="flex: 1.5; min-width: 110px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; font-weight:bold; outline: none;">
                                        
//                                         <select class="gvcn-sel-trangthai" style="flex: 1; min-width: 90px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; background:#fff; cursor:pointer;">
//                                             <option value="Chưa làm">❌ Chưa làm</option>
//                                             <option value="Đang làm">⏳ Đang làm</option>
//                                             <option value="Chưa xong">⚠️ Chưa xong</option>
//                                             <option value="Đã xong">✅ Đã xong</option>
//                                         </select>

//                                         <select class="gvcn-sel-danhgia" style="flex: 1; min-width: 90px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; background:#fff; cursor:pointer;">
//                                             <option value="">Chưa đánh giá</option><option value="Tốt">🌟 Tốt</option><option value="Khá">👍 Khá</option>
//                                             <option value="Trung Bình">😐 TB</option><option value="Chưa đạt">❌ Chưa đạt</option>
//                                         </select>
//                                         <input class="gvcn-input-note" placeholder="Ghi chú..." style="flex: 1; min-width: 90px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none;">
                                        
//                                         <div style="display:flex; align-items:center; gap:5px; background:#fff; padding:3px; border:1px solid #ced4da; border-radius:4px;">
//                                             <button type="button" class="btn-anh-hs" onclick="this.nextElementSibling.click()" style="padding: 4px 8px; background: #e0f7fa; color: #00838f; border: 1px dashed #00acc1; border-radius: 4px; cursor: pointer; font-size:12px; font-weight:bold;" title="Đính kèm ảnh minh chứng riêng">📷 Ảnh</button>
//                                             <input type="file" accept="image/*" class="input-anh-hs" style="display:none;" onchange="if(typeof window.ham_21_23_chon_anh_hs === 'function') window.ham_21_23_chon_anh_hs(this)">
//                                             <img class="preview-anh-hs" src="" style="width:24px; height:24px; object-fit:cover; border-radius:4px; border:1px solid #00acc1; cursor:pointer; display:none;" onclick="this.previousElementSibling.click()" title="Bấm để đổi ảnh">
//                                             <button type="button" class="btn-xoa-anh-hs" onclick="if(typeof window.ham_21_24_xoa_anh_hs === 'function') window.ham_21_24_xoa_anh_hs(this)" style="display:none; background:none; border:none; color:#dc3545; cursor:pointer; font-size:16px; padding:0 3px;" title="Xóa ảnh">✖</button>
//                                         </div>

//                                         <button onclick="this.parentElement.remove()" style="padding: 6px 10px; background: #f8d7da; color: #dc3545; border: none; border-radius: 4px; cursor: pointer;" title="Xóa dòng học sinh">✖</button>
//                                     </div>
//                                 </div>
//                                 <button onclick="if(typeof ham_21_3_them_dong_nguoi_nhan === 'function') ham_21_3_them_dong_nguoi_nhan();" style="margin-top: 10px; padding: 6px 12px; background: #fff; border: 1px dashed #e83e8c; color: #e83e8c; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: bold;">
//                                     ➕ Thêm học sinh nhận việc
//                                 </button>
//                             </div>
//                         </div>

//                         <div style="text-align: right;">
//                             <button onclick="if(typeof ham_21_13_luu_noi_dung_tuan === 'function') ham_21_13_luu_noi_dung_tuan(this);" style="padding: 10px 25px; background: #0056b3; color: white; border: none; border-radius: 6px; font-weight: bold; font-size:13px; cursor: pointer; box-shadow:0 2px 4px rgba(0,0,0,0.2);">💾 THÊM CÔNG VIỆC MỚI VÀO MỤC 4</button>
//                         </div>
//                     </div>
//                 </div>

//                 <!-- MỤC 5 -->
//                 <div style="background: #fff; padding: 25px; border-radius: 10px; border: 1px solid #dee2e6; box-shadow: 0 4px 10px rgba(0,0,0,0.03); width: 100%; box-sizing: border-box;">
//                     <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px dashed #fce4ec; padding-bottom: 10px; margin-bottom: 15px;">
//                         <h4 style="margin: 0; color: #e83e8c; font-size: 17px;">🎯 5. Quản lý Sự kiện (Tuần trước / Vi phạm)</h4>
//                         <button onclick="window.ham_21_22_toggle_muc('body-muc-5', this);" style="background: #f8f9fa; border: 1px solid #ccc; padding: 5px 12px; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: bold;">➖ Thu hẹp</button>
//                     </div>
//                     <div id="body-muc-5">
//                         <label style="font-weight: bold; font-size: 14px; color: #dc3545; display:block; margin-bottom:5px;">B1. Chọn Tuần xảy ra sự kiện:</label>
//                         <select id="gvcn-sk-tuan-chon" style="width: 100%; padding: 12px; border: 2px solid #e83e8c; border-radius: 6px; font-weight: bold; font-size:14px; color: #e83e8c; margin-bottom: 15px; outline: none; background:#fdf5f8; cursor:pointer; box-sizing: border-box;">
//                             <option value="">-- Bấm để Chọn tuần xảy ra sự kiện --</option>
//                             ${optionsTuan}
//                         </select>
//                         <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border: 1px solid #ced4da; margin-bottom: 15px;">
//                             <label style="font-weight: bold; font-size: 13px; color: #495057; display:block; margin-bottom:10px;">B2. Nhập danh sách Sự kiện / Vi phạm:</label>
//                             <div id="gvcn-khu-vuc-su-kien-nhanh" style="display: flex; flex-direction: column; gap: 10px;">
//                                 <div class="dong-nhap-su-kien" style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap; background: #fff; padding: 6px; border-radius: 6px; border: 1px dashed #ccc;">
//                                     <input type="date" class="sk-ngay" value="${currentDate}" style="width: 130px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; font-weight:bold;">
//                                     <select class="sk-buoi" style="width: 80px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; cursor:pointer;">
//                                         <option value="Sáng">Sáng</option><option value="Trưa">Trưa</option><option value="Chiều">Chiều</option><option value="Tối">Tối</option>
//                                     </select>
//                                     <div style="display:flex; align-items:center; gap:8px; flex:1.5; min-width:180px; border:2px solid #e83e8c; border-radius:4px; padding:4px 8px; background:#fdf5f8;">
//                                         <img class="avatar-preview" src="" style="width:24px; height:24px; border-radius:50%; object-fit:cover; display:none; border:1px solid #eee;">
//                                         <input class="sk-hs" placeholder="👤 Chọn học sinh..." style="border:none; outline:none; flex:1; width:100%; font-size:13px; font-weight:bold; background:transparent; color:#e83e8c;">
//                                     </div>
//                                     <input class="sk-loi" list="gvcn-dl-loi" placeholder="🚨 Gõ tìm lỗi/sự kiện..." style="flex: 1.5; min-width: 140px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 13px; font-weight:bold; outline: none;">
//                                     <button onclick="this.parentElement.remove()" style="padding: 8px 12px; background: #fff; color: #dc3545; border: 1px solid #dc3545; border-radius: 4px; cursor: pointer;" title="Xóa">✖</button>
//                                 </div>
//                             </div>
//                             <button onclick="if(typeof ham_21_4_them_dong_su_kien === 'function') ham_21_4_them_dong_su_kien();" style="margin-top: 10px; padding: 8px 15px; background: #fff; border: 1px dashed #e83e8c; color: #e83e8c; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: bold;">➕ Thêm dòng sự kiện mới</button>
//                         </div>
//                         <datalist id="gvcn-dl-loi"></datalist>
//                         <div style="margin-bottom: 15px;">
//                             <label style="font-weight: bold; font-size: 13px; color: #495057; display: block; margin-bottom: 8px;">B3. 📸 Ảnh minh chứng chung (Cho các sự kiện trên):</label>
//                             <div style="display: flex; gap: 15px; align-items: stretch;">
//                                 <button type="button" onclick="document.getElementById('gvcn-input-anh-sk').click()" style="padding: 10px 15px; background: #f8f9fa; color: #495057; border: 1px dashed #adb5bd; border-radius: 6px; cursor: pointer; font-weight: bold; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 5px; flex-shrink: 0;"><span style="font-size: 20px;">📷</span><span style="font-size: 11px;">Tải ảnh lên</span></button>
//                                 <input type="file" id="gvcn-input-anh-sk" accept="image/*" multiple style="display: none;">
//                                 <div id="gvcn-vung-preview-anh-sk" style="flex: 1; border: 1px dashed #ccc; border-radius: 6px; display: flex; align-items: center; color: #adb5bd; font-size: 12px; font-style: italic; background: #fafafa; padding: 8px; gap: 8px; overflow-x: auto;"><span>(Ảnh minh chứng sự kiện...)</span></div>
//                             </div>
//                         </div>
//                         <div style="text-align: center; margin-bottom: 15px;">
//                             <button onclick="if(typeof ham_21_6_dua_vao_danh_sach_cho === 'function') ham_21_6_dua_vao_danh_sach_cho();" style="padding: 12px 20px; background: #fff; color: #e83e8c; border: 2px dashed #e83e8c; border-radius: 6px; font-weight: bold; font-size: 15px; cursor: pointer; width: 100%;">⬇️ ĐƯA XUỐNG DANH SÁCH CHỜ LƯU</button>
//                         </div>
//                         <div style="background: #f8f9fa; border: 1px solid #ced4da; border-radius: 8px; padding: 15px; max-height: 350px; overflow-y: auto; margin-bottom: 15px;">
//                             <div style="font-size: 14px; font-weight: bold; color: #495057; margin-bottom: 12px; border-bottom: 2px solid #dee2e6; padding-bottom: 8px;">Sự kiện đang chờ lưu (<span id="gvcn-dem-su-kien" style="color:#e83e8c;">0</span>):</div>
//                             <div id="gvcn-danh-sach-cho-luu"><i style="color: #adb5bd; font-size: 13px;">Chưa có sự kiện nào...</i></div>
//                         </div>
//                         <div style="text-align: right;">
//                             <button onclick="if(typeof ham_21_15_luu_su_kien_tuan_truoc === 'function') ham_21_15_luu_su_kien_tuan_truoc(this);" style="padding: 12px 30px; background: #e83e8c; color: white; border: none; border-radius: 8px; font-weight: bold; font-size: 15px; cursor: pointer; box-shadow: 0 4px 10px rgba(232,62,140,0.3);">💾 LƯU CÁC SỰ KIỆN MỤC 5</button>
//                         </div>
//                     </div>
//                 </div>

//             </div>
//         </div>
//     `;

//     if (typeof window.ham_20_7_tai_danh_sach_lop === 'function') window.ham_20_7_tai_danh_sach_lop();
//     if (typeof window.ham_21_5_tai_danh_sach_the_datalist === 'function') window.ham_21_5_tai_danh_sach_the_datalist();
//     if (typeof window.ham_21_8_kich_hoat_xu_ly_anh === 'function') window.ham_21_8_kich_hoat_xu_ly_anh();
// };


// // =====================================================================
// // HÀM 21.1: VẼ GIAO DIỆN CHÍNH (ĐÃ TÁCH HẲN NÚT LƯU MỤC 2 & 3 THÀNH KHỐI RIÊNG)
// // =====================================================================
// window.ham_21_1_mo_giao_dien_nhat_ky_gvcn = function () {
//     const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
//     if (!vungLamViec) return;

//     const now = new Date();
//     now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
//     const currentDateTime = now.toISOString().slice(0, 16);
//     const currentDate = now.toISOString().split('T')[0];

//     let curr = new Date();
//     let first = curr.getDate() - curr.getDay() + 1;
//     let last = first + 6;
//     let monday = new Date(curr.setDate(first)).toISOString().split('T')[0];
//     let sunday = new Date(curr.setDate(last)).toISOString().split('T')[0];

//     let optionsTuan = '';
//     for (let i = 1; i <= 37; i++) optionsTuan += `<option value="Tuần ${i}"></option>`;

//     vungLamViec.innerHTML = `
//         <div style="padding: 10px; animation: fadeIn 0.4s ease-in-out;">
            
//             <!-- HEADER CÓ ĐẦY ĐỦ 5 NÚT THAO TÁC -->
//             <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #6f42c1; padding-bottom: 12px; margin-bottom: 25px;">
//                 <h3 style="color: #6f42c1; margin: 0; text-transform: uppercase; display: flex; align-items: center; gap: 10px; font-size: 20px;">
//                     🛡️ Sổ Tay Giáo Viên Chủ Nhiệm
//                 </h3>
                
//                 <div style="display: flex; gap: 10px; flex-wrap: wrap;">
//                     <button onclick="if(typeof ham_21_10_lam_moi_so_gvcn === 'function') ham_21_10_lam_moi_so_gvcn();" style="padding: 8px 15px; background: #e83e8c; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.15); transition: 0.2s;" onmouseover="this.style.background='#c63375'" onmouseout="this.style.background='#e83e8c'">
//                         🆕 Tuần mới
//                     </button>
//                     <button onclick="alert('Tính năng Xem tuần cũ đang phát triển...')" style="padding: 8px 15px; background: #17a2b8; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.15); transition: 0.2s;" onmouseover="this.style.background='#138496'" onmouseout="this.style.background='#17a2b8'">
//                         ⏮️ Xem tuần cũ
//                     </button>
//                     <button onclick="if(typeof ham_21_17_tai_tuan_gan_nhat === 'function') ham_21_17_tai_tuan_gan_nhat();" style="padding: 8px 15px; background: #28a745; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.15); transition: 0.2s;" onmouseover="this.style.background='#218838'" onmouseout="this.style.background='#28a745'">
//                         🔄 Tuần gần nhất
//                     </button>
//                     <button onclick="alert('Tính năng Tìm lại đang phát triển...')" style="padding: 8px 15px; background: #ffc107; color: #000; border: 1px solid #d39e00; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.15); transition: 0.2s;" onmouseover="this.style.background='#e0a800'" onmouseout="this.style.background='#ffc107'">
//                         🔍 Tìm lại
//                     </button>
//                     <button onclick="ham_3_1_ve_dashboard_admin()" style="padding: 8px 15px; background: #6c757d; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.15); transition: 0.2s;" onmouseover="this.style.background='#5a6268'" onmouseout="this.style.background='#6c757d'">
//                         ⬅️ Quay lại
//                     </button>
//                 </div>
//             </div>

//             <!-- MỤC 1 -->
//             <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; border: 1px solid #dee2e6; box-shadow: 0 4px 6px rgba(0,0,0,0.03); margin-bottom: 25px;">
//                 <h4 style="margin: 0 0 15px 0; color: #495057; font-size: 16px;">🕒 1. Thông tin Tuần</h4>
//                 <div style="display: flex; flex-wrap: wrap; gap: 20px;">
//                     <div style="flex: 0 0 220px;">
//                         <label style="font-weight: bold; font-size: 14px; color: #495057; margin-bottom: 5px; display: block;">Lớp Chủ Nhiệm:</label>
//                         <input id="gvcn-input-lop" list="dl-lop" onchange="if(typeof window.ham_21_2_tai_danh_sach_hs_chu_nhiem === 'function') window.ham_21_2_tai_danh_sach_hs_chu_nhiem();" placeholder="Chọn lớp..." style="width: 100%; padding: 10px; border: 2px solid #6f42c1; border-radius: 6px; box-sizing: border-box; font-weight: bold; font-size: 15px; color: #6f42c1; outline: none; background: #fdfbfe;">
//                         <datalist id="dl-lop"></datalist>
//                         <datalist id="gvcn-dl-hs"></datalist>
//                     </div>
//                     <div style="flex: 1; min-width: 450px;">
//                         <label style="font-weight: bold; font-size: 14px; color: #495057; margin-bottom: 5px; display: block;">Tuần học (Từ 1 - 37):</label>
//                         <div style="display: flex; gap: 10px; align-items: center;">
//                             <input id="gvcn-input-tuan" list="dl-tuan" onchange="if(typeof ham_21_16_tai_du_lieu_tuan === 'function') ham_21_16_tai_du_lieu_tuan();" placeholder="Tuần..." style="width: 130px; padding: 10px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; font-weight: bold; font-size: 14px; outline: none;">
//                             <datalist id="dl-tuan">${optionsTuan}</datalist>
//                             <span style="font-size:13px; font-weight:bold; color:#6c757d;">Từ:</span>
//                             <input type="date" id="gvcn-tuan-tu" value="${monday}" onchange="if(typeof ham_21_12_tu_dong_tinh_ngay_den === 'function') ham_21_12_tu_dong_tinh_ngay_den();" style="flex: 1; padding: 10px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; font-size: 13px; font-weight: bold; outline: none;">
//                             <span style="font-size:13px; font-weight:bold; color:#6c757d;">Đến:</span>
//                             <input type="date" id="gvcn-tuan-den" value="${sunday}" style="flex: 1; padding: 10px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; font-size: 13px; font-weight: bold; outline: none;">
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div style="display: flex; flex-direction: column; gap: 25px; width: 100%;">
                
//                 <!-- MỤC 2 -->
//                 <div style="background: #fff; padding: 25px; border-radius: 10px; border: 1px solid #dee2e6; box-shadow: 0 4px 10px rgba(0,0,0,0.03); width: 100%; box-sizing: border-box;">
//                     <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px dashed #d1ecf1; padding-bottom: 10px; margin-bottom: 15px;">
//                         <h4 style="margin: 0; color: #17a2b8; font-size: 17px;">📝 2. Nội dung chung của Tuần (Sinh hoạt lớp)</h4>
//                         <button onclick="window.ham_21_22_toggle_muc('body-muc-2', this);" style="background: #f8f9fa; border: 1px solid #ccc; padding: 5px 12px; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: bold;">➖ Thu hẹp</button>
//                     </div>
//                     <div id="body-muc-2">
//                         <textarea id="gvcn-nd-sinh-hoat" placeholder="Nhập các nội dung chính đã sinh hoạt chung..." style="width: 100%; padding: 12px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; resize: vertical; min-height: 90px; font-family: inherit; font-size:14px; outline: none; margin-bottom: 15px;"></textarea>
//                         <label style="font-weight: bold; font-size: 13px; color: #495057; display: block; margin-bottom: 8px;">📸 Ảnh của Tuần (Hình ảnh lớp / Biên bản SHL):</label>
//                         <div id="gvcn-vung-anh-cu-tuan" style="display: flex; gap: 15px; flex-wrap: wrap; margin-bottom: 15px; align-items: flex-start;"></div>
//                         <div style="display: flex; gap: 15px; align-items: stretch; margin-bottom: 15px;">
//                             <button type="button" onclick="document.getElementById('gvcn-input-anh-tuan').click()" style="padding: 10px 15px; background: #f8f9fa; color: #17a2b8; border: 1px dashed #17a2b8; border-radius: 6px; cursor: pointer; font-weight: bold; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 5px; flex-shrink: 0;"><span style="font-size: 20px;">📷</span><span style="font-size: 11px;">Chụp/Thêm ảnh mới</span></button>
//                             <input type="file" id="gvcn-input-anh-tuan" accept="image/*" multiple style="display: none;">
//                             <div id="gvcn-vung-preview-anh-tuan" style="flex: 1; border: 1px dashed #ccc; border-radius: 6px; display: flex; align-items: center; color: #adb5bd; font-size: 12px; font-style: italic; background: #fafafa; padding: 8px; gap: 8px; overflow-x: auto;"><span>(Ảnh thêm mới sẽ hiển thị tại đây...)</span></div>
//                         </div>
//                     </div>
//                 </div>

//                 <!-- MỤC 3 -->
//                 <div style="background: #fff; padding: 25px; border-radius: 10px; border: 1px solid #dee2e6; box-shadow: 0 4px 10px rgba(0,0,0,0.03); width: 100%; box-sizing: border-box; margin-bottom: 5px;">
//                     <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px dashed #d4edda; padding-bottom: 10px; margin-bottom: 15px;">
//                         <h4 style="margin: 0; color: #28a745; font-size: 17px;">🌟 3. Đánh giá Tuần</h4>
//                         <button onclick="window.ham_21_22_toggle_muc('body-muc-3', this);" style="background: #f8f9fa; border: 1px solid #ccc; padding: 5px 12px; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: bold;">➖ Thu hẹp</button>
//                     </div>
//                     <div id="body-muc-3">
//                         <textarea id="gvcn-danh-gia-tuan" placeholder="Nhập nhận xét tổng quan..." style="width: 100%; padding: 12px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; margin-bottom: 5px; resize: vertical; min-height: 90px; font-family: inherit; font-size:14px; outline: none;"></textarea>
//                     </div>
//                 </div>

//                 <!-- 🌟 THANH NÚT LƯU CHUNG ĐƯỢC TÁCH RA THÀNH KHỐI ĐỘC LẬP -->
//                 <div style="background: #e8f5e9; padding: 15px 25px; border-radius: 10px; border: 1px solid #c3e6cb; display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; box-shadow: 0 4px 10px rgba(0,0,0,0.03);">
//                     <div style="color: #155724; font-weight: bold; font-size: 14px; display: flex; align-items: center; gap: 8px;">
//                         💡 <span>Đừng quên <b style="color:#28a745;">LƯU</b> thông tin Sinh hoạt & Đánh giá của tuần (Mục 2 & Mục 3).</span>
//                     </div>
//                     <button onclick="if(typeof ham_21_14_luu_thong_tin_tuan === 'function') ham_21_14_luu_thong_tin_tuan(this);" style="padding: 12px 30px; background: #28a745; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; box-shadow:0 4px 6px rgba(40,167,69,0.3); font-size: 14px; transition:0.2s;" onmouseover="this.style.background='#218838'; this.style.transform='translateY(-2px)';" onmouseout="this.style.background='#28a745'; this.style.transform='translateY(0)';">
//                         💾 LƯU CHUNG MỤC 2 & MỤC 3
//                     </button>
//                 </div>

//                 <!-- MỤC 4: TỪNG NỘI DUNG CÓ GIAO VIỆC -->
//                 <div style="background: #fff; padding: 25px; border-radius: 10px; border: 1px solid #dee2e6; box-shadow: 0 4px 10px rgba(0,0,0,0.03); width: 100%; box-sizing: border-box;">
//                     <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px dashed #cce5ff; padding-bottom: 10px; margin-bottom: 15px;">
//                         <h4 style="margin: 0; color: #0056b3; font-size: 17px;">📋 4. Từng nội dung có Giao việc</h4>
//                         <button onclick="window.ham_21_22_toggle_muc('body-muc-4', this);" style="background: #f8f9fa; border: 1px solid #ccc; padding: 5px 12px; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: bold;">➖ Thu hẹp</button>
//                     </div>

//                     <div id="body-muc-4">
//                         <div id="gvcn-bang-noi-dung-cu" style="width: 100%; overflow-x: auto;"></div>

//                         <div style="background: #f0f8ff; padding: 15px; border-radius: 8px; border: 1px solid #b8daff; margin-bottom: 15px;">
//                             <h5 style="margin: 0 0 10px 0; color: #0056b3;">➕ Thêm nội dung / Giao việc mới:</h5>
//                             <div style="display: flex; gap: 15px; margin-bottom: 15px;">
//                                 <div style="flex: 1;">
//                                     <label style="font-weight: bold; font-size: 12px; color: #495057; display:block; margin-bottom:5px;">Ngày giờ nhập:</label>
//                                     <input type="datetime-local" id="gvcn-nd-ngay" value="${currentDateTime}" style="width: 100%; min-width:200px; padding: 10px; border: 1px solid #ced4da; border-radius: 6px; font-size: 13px; outline: none; box-sizing: border-box;">
//                                 </div>
//                             </div>
//                             <label style="font-weight: bold; font-size: 13px; color: #0056b3; display:block; margin-bottom:5px;">Tên Nội dung / Công việc (Bắt buộc):</label>
//                             <input type="text" id="gvcn-nd-ten" placeholder="VD: Phân công trực nhật..." style="width: 100%; padding: 10px; border: 2px solid #0056b3; border-radius: 6px; font-size: 14px; font-weight:bold; color:#0056b3; outline: none; margin-bottom:15px; background:#fff; box-sizing: border-box;">
                            
//                             <label style="font-weight: bold; font-size: 12px; color: #495057; display:block; margin-bottom:5px;">Chi tiết nội dung:</label>
//                             <textarea id="gvcn-nd-chitiet" placeholder="Mô tả chi tiết..." style="width: 100%; padding: 10px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; margin-bottom: 15px; resize: vertical; min-height: 60px; font-family: inherit; font-size:13px; outline: none;"></textarea>

//                             <label style="font-weight: bold; font-size: 13px; color: #00838f; display:block; margin-bottom:8px;">📸 Ảnh chung của nội dung này:</label>
//                             <div style="display: flex; gap: 15px; align-items: stretch; margin-bottom: 20px;">
//                                 <button type="button" onclick="document.getElementById('gvcn-input-anh-nd').click()" style="padding: 8px 12px; background: #e0f7fa; color: #00838f; border: 1px dashed #00acc1; border-radius: 4px; cursor: pointer; font-weight: bold; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px; flex-shrink: 0;"><span style="font-size: 18px;">📷</span><span style="font-size: 11px;">Tải ảnh chung</span></button>
//                                 <input type="file" id="gvcn-input-anh-nd" accept="image/*" multiple style="display: none;">
//                                 <div id="gvcn-vung-preview-anh-nd" style="flex: 1; border: 1px dashed #ccc; border-radius: 4px; display: flex; align-items: center; color: #adb5bd; font-size: 11px; font-style: italic; background: #fff; padding: 8px; gap: 8px; overflow-x: auto;"><span>(Ảnh đính kèm chung cho công việc...)</span></div>
//                             </div>

//                             <div style="background: #fff; padding: 15px; border-radius: 8px; border: 1px dashed #ccc; margin-bottom: 15px;">
//                                 <label style="font-weight: bold; font-size: 13px; color: #e83e8c; display:block; margin-bottom:10px;">👤 Danh sách học sinh nhận việc:</label>
//                                 <div id="gvcn-khu-vuc-nguoi-nhan" style="display: flex; flex-direction: column; gap: 10px;">
//                                     <div class="dong-nguoi-nhan" style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap; background: #f8f9fa; padding: 6px; border-radius: 6px; border: 1px solid #eee;">
//                                         <div style="display:flex; align-items:center; gap:8px; flex:1.5; min-width:160px; border:1px solid #ced4da; border-radius:4px; padding:4px 8px; background:#fff;">
//                                             <img class="avatar-preview" src="" style="width:24px; height:24px; border-radius:50%; object-fit:cover; display:none; border:1px solid #eee;">
//                                             <input class="gvcn-input-hs" placeholder="Chọn học sinh..." style="border:none; outline:none; flex:1; width:100%; font-size:12px; font-weight:bold; color:#1a73e8;">
//                                         </div>
//                                         <input class="gvcn-input-phan-viec" placeholder="Phần việc..." style="flex: 1.5; min-width: 110px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; font-weight:bold; outline: none;">
                                        
//                                         <select class="gvcn-sel-trangthai" style="flex: 1; min-width: 90px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; background:#fff; cursor:pointer;">
//                                             <option value="Chưa làm">❌ Chưa làm</option>
//                                             <option value="Đang làm">⏳ Đang làm</option>
//                                             <option value="Chưa xong">⚠️ Chưa xong</option>
//                                             <option value="Đã xong">✅ Đã xong</option>
//                                         </select>

//                                         <select class="gvcn-sel-danhgia" style="flex: 1; min-width: 90px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; background:#fff; cursor:pointer;">
//                                             <option value="">Chưa đánh giá</option><option value="Tốt">🌟 Tốt</option><option value="Khá">👍 Khá</option>
//                                             <option value="Trung Bình">😐 TB</option><option value="Chưa đạt">❌ Chưa đạt</option>
//                                         </select>
//                                         <input class="gvcn-input-note" placeholder="Ghi chú..." style="flex: 1; min-width: 90px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none;">
                                        
//                                         <div style="display:flex; align-items:center; gap:5px; background:#fff; padding:3px; border:1px solid #ced4da; border-radius:4px;">
//                                             <button type="button" class="btn-anh-hs" onclick="this.nextElementSibling.click()" style="padding: 4px 8px; background: #e0f7fa; color: #00838f; border: 1px dashed #00acc1; border-radius: 4px; cursor: pointer; font-size:12px; font-weight:bold;" title="Đính kèm ảnh minh chứng riêng">📷 Ảnh</button>
//                                             <input type="file" accept="image/*" class="input-anh-hs" style="display:none;" onchange="if(typeof window.ham_21_23_chon_anh_hs === 'function') window.ham_21_23_chon_anh_hs(this)">
//                                             <img class="preview-anh-hs" src="" style="width:24px; height:24px; object-fit:cover; border-radius:4px; border:1px solid #00acc1; cursor:pointer; display:none;" onclick="this.previousElementSibling.click()" title="Bấm để đổi ảnh">
//                                             <button type="button" class="btn-xoa-anh-hs" onclick="if(typeof window.ham_21_24_xoa_anh_hs === 'function') window.ham_21_24_xoa_anh_hs(this)" style="display:none; background:none; border:none; color:#dc3545; cursor:pointer; font-size:16px; padding:0 3px;" title="Xóa ảnh">✖</button>
//                                         </div>

//                                         <button onclick="this.parentElement.remove()" style="padding: 6px 10px; background: #f8d7da; color: #dc3545; border: none; border-radius: 4px; cursor: pointer;" title="Xóa dòng học sinh">✖</button>
//                                     </div>
//                                 </div>
//                                 <button onclick="if(typeof ham_21_3_them_dong_nguoi_nhan === 'function') ham_21_3_them_dong_nguoi_nhan();" style="margin-top: 10px; padding: 6px 12px; background: #fff; border: 1px dashed #e83e8c; color: #e83e8c; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: bold;">
//                                     ➕ Thêm học sinh nhận việc
//                                 </button>
//                             </div>
//                         </div>

//                         <div style="text-align: right;">
//                             <button onclick="if(typeof ham_21_13_luu_noi_dung_tuan === 'function') ham_21_13_luu_noi_dung_tuan(this);" style="padding: 10px 25px; background: #0056b3; color: white; border: none; border-radius: 6px; font-weight: bold; font-size:13px; cursor: pointer; box-shadow:0 2px 4px rgba(0,0,0,0.2);">💾 THÊM CÔNG VIỆC MỚI VÀO MỤC 4</button>
//                         </div>
//                     </div>
//                 </div>

//                 <!-- MỤC 5 -->
//                 <div style="background: #fff; padding: 25px; border-radius: 10px; border: 1px solid #dee2e6; box-shadow: 0 4px 10px rgba(0,0,0,0.03); width: 100%; box-sizing: border-box;">
//                     <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px dashed #fce4ec; padding-bottom: 10px; margin-bottom: 15px;">
//                         <h4 style="margin: 0; color: #e83e8c; font-size: 17px;">🎯 5. Quản lý Sự kiện (Tuần trước / Vi phạm)</h4>
//                         <button onclick="window.ham_21_22_toggle_muc('body-muc-5', this);" style="background: #f8f9fa; border: 1px solid #ccc; padding: 5px 12px; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: bold;">➖ Thu hẹp</button>
//                     </div>
//                     <div id="body-muc-5">
//                         <label style="font-weight: bold; font-size: 14px; color: #dc3545; display:block; margin-bottom:5px;">B1. Chọn Tuần xảy ra sự kiện:</label>
//                         <select id="gvcn-sk-tuan-chon" style="width: 100%; padding: 12px; border: 2px solid #e83e8c; border-radius: 6px; font-weight: bold; font-size:14px; color: #e83e8c; margin-bottom: 15px; outline: none; background:#fdf5f8; cursor:pointer; box-sizing: border-box;">
//                             <option value="">-- Bấm để Chọn tuần xảy ra sự kiện --</option>
//                             ${optionsTuan}
//                         </select>
//                         <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border: 1px solid #ced4da; margin-bottom: 15px;">
//                             <label style="font-weight: bold; font-size: 13px; color: #495057; display:block; margin-bottom:10px;">B2. Nhập danh sách Sự kiện / Vi phạm:</label>
//                             <div id="gvcn-khu-vuc-su-kien-nhanh" style="display: flex; flex-direction: column; gap: 10px;">
//                                 <div class="dong-nhap-su-kien" style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap; background: #fff; padding: 6px; border-radius: 6px; border: 1px dashed #ccc;">
//                                     <input type="date" class="sk-ngay" value="${currentDate}" style="width: 130px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; font-weight:bold;">
//                                     <select class="sk-buoi" style="width: 80px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; cursor:pointer;">
//                                         <option value="Sáng">Sáng</option><option value="Trưa">Trưa</option><option value="Chiều">Chiều</option><option value="Tối">Tối</option>
//                                     </select>
//                                     <div style="display:flex; align-items:center; gap:8px; flex:1.5; min-width:180px; border:2px solid #e83e8c; border-radius:4px; padding:4px 8px; background:#fdf5f8;">
//                                         <img class="avatar-preview" src="" style="width:24px; height:24px; border-radius:50%; object-fit:cover; display:none; border:1px solid #eee;">
//                                         <input class="sk-hs" placeholder="👤 Chọn học sinh..." style="border:none; outline:none; flex:1; width:100%; font-size:13px; font-weight:bold; background:transparent; color:#e83e8c;">
//                                     </div>
//                                     <input class="sk-loi" list="gvcn-dl-loi" placeholder="🚨 Gõ tìm lỗi/sự kiện..." style="flex: 1.5; min-width: 140px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 13px; font-weight:bold; outline: none;">
//                                     <button onclick="this.parentElement.remove()" style="padding: 8px 12px; background: #fff; color: #dc3545; border: 1px solid #dc3545; border-radius: 4px; cursor: pointer;" title="Xóa">✖</button>
//                                 </div>
//                             </div>
//                             <button onclick="if(typeof ham_21_4_them_dong_su_kien === 'function') ham_21_4_them_dong_su_kien();" style="margin-top: 10px; padding: 8px 15px; background: #fff; border: 1px dashed #e83e8c; color: #e83e8c; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: bold;">➕ Thêm dòng sự kiện mới</button>
//                         </div>
//                         <datalist id="gvcn-dl-loi"></datalist>
//                         <div style="margin-bottom: 15px;">
//                             <label style="font-weight: bold; font-size: 13px; color: #495057; display: block; margin-bottom: 8px;">B3. 📸 Ảnh minh chứng chung (Cho các sự kiện trên):</label>
//                             <div style="display: flex; gap: 15px; align-items: stretch;">
//                                 <button type="button" onclick="document.getElementById('gvcn-input-anh-sk').click()" style="padding: 10px 15px; background: #f8f9fa; color: #495057; border: 1px dashed #adb5bd; border-radius: 6px; cursor: pointer; font-weight: bold; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 5px; flex-shrink: 0;"><span style="font-size: 20px;">📷</span><span style="font-size: 11px;">Tải ảnh lên</span></button>
//                                 <input type="file" id="gvcn-input-anh-sk" accept="image/*" multiple style="display: none;">
//                                 <div id="gvcn-vung-preview-anh-sk" style="flex: 1; border: 1px dashed #ccc; border-radius: 6px; display: flex; align-items: center; color: #adb5bd; font-size: 12px; font-style: italic; background: #fafafa; padding: 8px; gap: 8px; overflow-x: auto;"><span>(Ảnh minh chứng sự kiện...)</span></div>
//                             </div>
//                         </div>
//                         <div style="text-align: center; margin-bottom: 15px;">
//                             <button onclick="if(typeof ham_21_6_dua_vao_danh_sach_cho === 'function') ham_21_6_dua_vao_danh_sach_cho();" style="padding: 12px 20px; background: #fff; color: #e83e8c; border: 2px dashed #e83e8c; border-radius: 6px; font-weight: bold; font-size: 15px; cursor: pointer; width: 100%;">⬇️ ĐƯA XUỐNG DANH SÁCH CHỜ LƯU</button>
//                         </div>
//                         <div style="background: #f8f9fa; border: 1px solid #ced4da; border-radius: 8px; padding: 15px; max-height: 350px; overflow-y: auto; margin-bottom: 15px;">
//                             <div style="font-size: 14px; font-weight: bold; color: #495057; margin-bottom: 12px; border-bottom: 2px solid #dee2e6; padding-bottom: 8px;">Sự kiện đang chờ lưu (<span id="gvcn-dem-su-kien" style="color:#e83e8c;">0</span>):</div>
//                             <div id="gvcn-danh-sach-cho-luu"><i style="color: #adb5bd; font-size: 13px;">Chưa có sự kiện nào...</i></div>
//                         </div>
//                         <div style="text-align: right;">
//                             <button onclick="if(typeof ham_21_15_luu_su_kien_tuan_truoc === 'function') ham_21_15_luu_su_kien_tuan_truoc(this);" style="padding: 12px 30px; background: #e83e8c; color: white; border: none; border-radius: 8px; font-weight: bold; font-size: 15px; cursor: pointer; box-shadow: 0 4px 10px rgba(232,62,140,0.3);">💾 LƯU CÁC SỰ KIỆN MỤC 5</button>
//                         </div>
//                     </div>
//                 </div>

//             </div>
//         </div>
//     `;

//     if (typeof window.ham_20_7_tai_danh_sach_lop === 'function') window.ham_20_7_tai_danh_sach_lop();
//     if (typeof window.ham_21_5_tai_danh_sach_the_datalist === 'function') window.ham_21_5_tai_danh_sach_the_datalist();
//     if (typeof window.ham_21_8_kich_hoat_xu_ly_anh === 'function') window.ham_21_8_kich_hoat_xu_ly_anh();
// };


// // =====================================================================
// // HÀM 21.1: VẼ GIAO DIỆN CHÍNH (MỤC 5 HOÀN TOÀN ĐỘC LẬP, CÓ NÚT LÙI/TIẾN TUẦN)
// // =====================================================================
// window.ham_21_1_mo_giao_dien_nhat_ky_gvcn = function () {
//     const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
//     if (!vungLamViec) return;

//     const now = new Date();
//     now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
//     const currentDateTime = now.toISOString().slice(0, 16);
//     const currentDate = now.toISOString().split('T')[0];

//     let curr = new Date();
//     let first = curr.getDate() - curr.getDay() + 1;
//     let last = first + 6;
//     let monday = new Date(curr.setDate(first)).toISOString().split('T')[0];
//     let sunday = new Date(curr.setDate(last)).toISOString().split('T')[0];

//     let optionsTuan = '';
//     for (let i = 1; i <= 37; i++) optionsTuan += `<option value="Tuần ${i}"></option>`;

//     vungLamViec.innerHTML = `
//         <div style="padding: 10px; animation: fadeIn 0.4s ease-in-out;">
            
//             <!-- HEADER CÓ ĐẦY ĐỦ 5 NÚT THAO TÁC -->
//             <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #6f42c1; padding-bottom: 12px; margin-bottom: 25px;">
//                 <h3 style="color: #6f42c1; margin: 0; text-transform: uppercase; display: flex; align-items: center; gap: 10px; font-size: 20px;">
//                     🛡️ Sổ Tay Giáo Viên Chủ Nhiệm
//                 </h3>
                
//                 <div style="display: flex; gap: 10px; flex-wrap: wrap;">
//                     <button onclick="if(typeof ham_21_10_lam_moi_so_gvcn === 'function') ham_21_10_lam_moi_so_gvcn();" style="padding: 8px 15px; background: #e83e8c; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.15); transition: 0.2s;" onmouseover="this.style.background='#c63375'" onmouseout="this.style.background='#e83e8c'">
//                         🆕 Tuần mới
//                     </button>
//                     <button onclick="alert('Tính năng Xem tuần cũ đang phát triển...')" style="padding: 8px 15px; background: #17a2b8; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.15); transition: 0.2s;" onmouseover="this.style.background='#138496'" onmouseout="this.style.background='#17a2b8'">
//                         ⏮️ Xem tuần cũ
//                     </button>
//                     <button onclick="if(typeof ham_21_17_tai_tuan_gan_nhat === 'function') ham_21_17_tai_tuan_gan_nhat();" style="padding: 8px 15px; background: #28a745; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.15); transition: 0.2s;" onmouseover="this.style.background='#218838'" onmouseout="this.style.background='#28a745'">
//                         🔄 Tuần gần nhất
//                     </button>
//                     <button onclick="alert('Tính năng Tìm lại đang phát triển...')" style="padding: 8px 15px; background: #ffc107; color: #000; border: 1px solid #d39e00; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.15); transition: 0.2s;" onmouseover="this.style.background='#e0a800'" onmouseout="this.style.background='#ffc107'">
//                         🔍 Tìm lại
//                     </button>
//                     <button onclick="ham_3_1_ve_dashboard_admin()" style="padding: 8px 15px; background: #6c757d; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.15); transition: 0.2s;" onmouseover="this.style.background='#5a6268'" onmouseout="this.style.background='#6c757d'">
//                         ⬅️ Quay lại
//                     </button>
//                 </div>
//             </div>

//             <!-- MỤC 1 -->
//             <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; border: 1px solid #dee2e6; box-shadow: 0 4px 6px rgba(0,0,0,0.03); margin-bottom: 25px;">
//                 <h4 style="margin: 0 0 15px 0; color: #495057; font-size: 16px;">🕒 1. Thông tin Tuần</h4>
//                 <div style="display: flex; flex-wrap: wrap; gap: 20px;">
//                     <div style="flex: 0 0 220px;">
//                         <label style="font-weight: bold; font-size: 14px; color: #495057; margin-bottom: 5px; display: block;">Lớp Chủ Nhiệm:</label>
//                         <input id="gvcn-input-lop" list="dl-lop" onchange="if(typeof window.ham_21_2_tai_danh_sach_hs_chu_nhiem === 'function') window.ham_21_2_tai_danh_sach_hs_chu_nhiem();" placeholder="Chọn lớp..." style="width: 100%; padding: 10px; border: 2px solid #6f42c1; border-radius: 6px; box-sizing: border-box; font-weight: bold; font-size: 15px; color: #6f42c1; outline: none; background: #fdfbfe;">
//                         <datalist id="dl-lop"></datalist>
//                         <datalist id="gvcn-dl-hs"></datalist>
//                     </div>
//                     <div style="flex: 1; min-width: 450px;">
//                         <label style="font-weight: bold; font-size: 14px; color: #495057; margin-bottom: 5px; display: block;">Tuần học (Từ 1 - 37):</label>
//                         <div style="display: flex; gap: 10px; align-items: center;">
//                             <input id="gvcn-input-tuan" list="dl-tuan" onchange="if(typeof ham_21_16_tai_du_lieu_tuan === 'function') ham_21_16_tai_du_lieu_tuan();" placeholder="Tuần..." style="width: 130px; padding: 10px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; font-weight: bold; font-size: 14px; outline: none;">
//                             <datalist id="dl-tuan">${optionsTuan}</datalist>
//                             <span style="font-size:13px; font-weight:bold; color:#6c757d;">Từ:</span>
//                             <input type="date" id="gvcn-tuan-tu" value="${monday}" onchange="if(typeof ham_21_12_tu_dong_tinh_ngay_den === 'function') ham_21_12_tu_dong_tinh_ngay_den();" style="flex: 1; padding: 10px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; font-size: 13px; font-weight: bold; outline: none;">
//                             <span style="font-size:13px; font-weight:bold; color:#6c757d;">Đến:</span>
//                             <input type="date" id="gvcn-tuan-den" value="${sunday}" style="flex: 1; padding: 10px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; font-size: 13px; font-weight: bold; outline: none;">
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div style="display: flex; flex-direction: column; gap: 25px; width: 100%;">
                
//                 <!-- MỤC 2 -->
//                 <div style="background: #fff; padding: 25px; border-radius: 10px; border: 1px solid #dee2e6; box-shadow: 0 4px 10px rgba(0,0,0,0.03); width: 100%; box-sizing: border-box;">
//                     <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px dashed #d1ecf1; padding-bottom: 10px; margin-bottom: 15px;">
//                         <h4 style="margin: 0; color: #17a2b8; font-size: 17px;">📝 2. Nội dung chung của Tuần (Sinh hoạt lớp)</h4>
//                         <button onclick="window.ham_21_22_toggle_muc('body-muc-2', this);" style="background: #f8f9fa; border: 1px solid #ccc; padding: 5px 12px; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: bold;">➖ Thu hẹp</button>
//                     </div>
//                     <div id="body-muc-2">
//                         <textarea id="gvcn-nd-sinh-hoat" placeholder="Nhập các nội dung chính đã sinh hoạt chung..." style="width: 100%; padding: 12px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; resize: vertical; min-height: 90px; font-family: inherit; font-size:14px; outline: none; margin-bottom: 15px;"></textarea>
//                         <label style="font-weight: bold; font-size: 13px; color: #495057; display: block; margin-bottom: 8px;">📸 Ảnh của Tuần (Hình ảnh lớp / Biên bản SHL):</label>
//                         <div id="gvcn-vung-anh-cu-tuan" style="display: flex; gap: 15px; flex-wrap: wrap; margin-bottom: 15px; align-items: flex-start;"></div>
//                         <div style="display: flex; gap: 15px; align-items: stretch; margin-bottom: 15px;">
//                             <button type="button" onclick="document.getElementById('gvcn-input-anh-tuan').click()" style="padding: 10px 15px; background: #f8f9fa; color: #17a2b8; border: 1px dashed #17a2b8; border-radius: 6px; cursor: pointer; font-weight: bold; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 5px; flex-shrink: 0;"><span style="font-size: 20px;">📷</span><span style="font-size: 11px;">Chụp/Thêm ảnh mới</span></button>
//                             <input type="file" id="gvcn-input-anh-tuan" accept="image/*" multiple style="display: none;">
//                             <div id="gvcn-vung-preview-anh-tuan" style="flex: 1; border: 1px dashed #ccc; border-radius: 6px; display: flex; align-items: center; color: #adb5bd; font-size: 12px; font-style: italic; background: #fafafa; padding: 8px; gap: 8px; overflow-x: auto;"><span>(Ảnh thêm mới sẽ hiển thị tại đây...)</span></div>
//                         </div>
//                     </div>
//                 </div>

//                 <!-- MỤC 3 -->
//                 <div style="background: #fff; padding: 25px; border-radius: 10px; border: 1px solid #dee2e6; box-shadow: 0 4px 10px rgba(0,0,0,0.03); width: 100%; box-sizing: border-box; margin-bottom: 5px;">
//                     <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px dashed #d4edda; padding-bottom: 10px; margin-bottom: 15px;">
//                         <h4 style="margin: 0; color: #28a745; font-size: 17px;">🌟 3. Đánh giá Tuần</h4>
//                         <button onclick="window.ham_21_22_toggle_muc('body-muc-3', this);" style="background: #f8f9fa; border: 1px solid #ccc; padding: 5px 12px; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: bold;">➖ Thu hẹp</button>
//                     </div>
//                     <div id="body-muc-3">
//                         <textarea id="gvcn-danh-gia-tuan" placeholder="Nhập nhận xét tổng quan..." style="width: 100%; padding: 12px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; margin-bottom: 5px; resize: vertical; min-height: 90px; font-family: inherit; font-size:14px; outline: none;"></textarea>
//                     </div>
//                 </div>

//                 <!-- THANH NÚT LƯU CHUNG MỤC 2 & 3 -->
//                 <div style="background: #e8f5e9; padding: 15px 25px; border-radius: 10px; border: 1px solid #c3e6cb; display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; box-shadow: 0 4px 10px rgba(0,0,0,0.03);">
//                     <div style="color: #155724; font-weight: bold; font-size: 14px; display: flex; align-items: center; gap: 8px;">
//                         💡 <span>Đừng quên <b style="color:#28a745;">LƯU</b> thông tin Sinh hoạt & Đánh giá của tuần (Mục 2 & Mục 3).</span>
//                     </div>
//                     <button onclick="if(typeof ham_21_14_luu_thong_tin_tuan === 'function') ham_21_14_luu_thong_tin_tuan(this);" style="padding: 12px 30px; background: #28a745; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; box-shadow:0 4px 6px rgba(40,167,69,0.3); font-size: 14px; transition:0.2s;" onmouseover="this.style.background='#218838'; this.style.transform='translateY(-2px)';" onmouseout="this.style.background='#28a745'; this.style.transform='translateY(0)';">
//                         💾 LƯU CHUNG MỤC 2 & MỤC 3
//                     </button>
//                 </div>

//                 <!-- MỤC 4: TỪNG NỘI DUNG CÓ GIAO VIỆC -->
//                 <div style="background: #fff; padding: 25px; border-radius: 10px; border: 1px solid #dee2e6; box-shadow: 0 4px 10px rgba(0,0,0,0.03); width: 100%; box-sizing: border-box;">
//                     <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px dashed #cce5ff; padding-bottom: 10px; margin-bottom: 15px;">
//                         <h4 style="margin: 0; color: #0056b3; font-size: 17px;">📋 4. Từng nội dung có Giao việc</h4>
//                         <button onclick="window.ham_21_22_toggle_muc('body-muc-4', this);" style="background: #f8f9fa; border: 1px solid #ccc; padding: 5px 12px; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: bold;">➖ Thu hẹp</button>
//                     </div>

//                     <div id="body-muc-4">
//                         <div id="gvcn-bang-noi-dung-cu" style="width: 100%; overflow-x: auto;"></div>

//                         <div style="background: #f0f8ff; padding: 15px; border-radius: 8px; border: 1px solid #b8daff; margin-bottom: 15px;">
//                             <h5 style="margin: 0 0 10px 0; color: #0056b3;">➕ Thêm nội dung / Giao việc mới:</h5>
//                             <div style="display: flex; gap: 15px; margin-bottom: 15px;">
//                                 <div style="flex: 1;">
//                                     <label style="font-weight: bold; font-size: 12px; color: #495057; display:block; margin-bottom:5px;">Ngày giờ nhập:</label>
//                                     <input type="datetime-local" id="gvcn-nd-ngay" value="${currentDateTime}" style="width: 100%; min-width:200px; padding: 10px; border: 1px solid #ced4da; border-radius: 6px; font-size: 13px; outline: none; box-sizing: border-box;">
//                                 </div>
//                             </div>
//                             <label style="font-weight: bold; font-size: 13px; color: #0056b3; display:block; margin-bottom:5px;">Tên Nội dung / Công việc (Bắt buộc):</label>
//                             <input type="text" id="gvcn-nd-ten" placeholder="VD: Phân công trực nhật..." style="width: 100%; padding: 10px; border: 2px solid #0056b3; border-radius: 6px; font-size: 14px; font-weight:bold; color:#0056b3; outline: none; margin-bottom:15px; background:#fff; box-sizing: border-box;">
                            
//                             <label style="font-weight: bold; font-size: 12px; color: #495057; display:block; margin-bottom:5px;">Chi tiết nội dung:</label>
//                             <textarea id="gvcn-nd-chitiet" placeholder="Mô tả chi tiết..." style="width: 100%; padding: 10px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; margin-bottom: 15px; resize: vertical; min-height: 60px; font-family: inherit; font-size:13px; outline: none;"></textarea>

//                             <label style="font-weight: bold; font-size: 13px; color: #00838f; display:block; margin-bottom:8px;">📸 Ảnh chung của nội dung này:</label>
//                             <div style="display: flex; gap: 15px; align-items: stretch; margin-bottom: 20px;">
//                                 <button type="button" onclick="document.getElementById('gvcn-input-anh-nd').click()" style="padding: 8px 12px; background: #e0f7fa; color: #00838f; border: 1px dashed #00acc1; border-radius: 4px; cursor: pointer; font-weight: bold; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px; flex-shrink: 0;"><span style="font-size: 18px;">📷</span><span style="font-size: 11px;">Tải ảnh chung</span></button>
//                                 <input type="file" id="gvcn-input-anh-nd" accept="image/*" multiple style="display: none;">
//                                 <div id="gvcn-vung-preview-anh-nd" style="flex: 1; border: 1px dashed #ccc; border-radius: 4px; display: flex; align-items: center; color: #adb5bd; font-size: 11px; font-style: italic; background: #fff; padding: 8px; gap: 8px; overflow-x: auto;"><span>(Ảnh đính kèm chung cho công việc...)</span></div>
//                             </div>

//                             <div style="background: #fff; padding: 15px; border-radius: 8px; border: 1px dashed #ccc; margin-bottom: 15px;">
//                                 <label style="font-weight: bold; font-size: 13px; color: #e83e8c; display:block; margin-bottom:10px;">👤 Danh sách học sinh nhận việc:</label>
//                                 <div id="gvcn-khu-vuc-nguoi-nhan" style="display: flex; flex-direction: column; gap: 10px;">
//                                     <div class="dong-nguoi-nhan" style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap; background: #f8f9fa; padding: 6px; border-radius: 6px; border: 1px solid #eee;">
//                                         <div style="display:flex; align-items:center; gap:8px; flex:1.5; min-width:160px; border:1px solid #ced4da; border-radius:4px; padding:4px 8px; background:#fff;">
//                                             <img class="avatar-preview" src="" style="width:24px; height:24px; border-radius:50%; object-fit:cover; display:none; border:1px solid #eee;">
//                                             <input class="gvcn-input-hs" placeholder="Chọn học sinh..." style="border:none; outline:none; flex:1; width:100%; font-size:12px; font-weight:bold; color:#1a73e8;">
//                                         </div>
//                                         <input class="gvcn-input-phan-viec" placeholder="Phần việc..." style="flex: 1.5; min-width: 110px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; font-weight:bold; outline: none;">
                                        
//                                         <select class="gvcn-sel-trangthai" style="flex: 1; min-width: 90px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; background:#fff; cursor:pointer;">
//                                             <option value="Chưa làm">❌ Chưa làm</option>
//                                             <option value="Đang làm">⏳ Đang làm</option>
//                                             <option value="Chưa xong">⚠️ Chưa xong</option>
//                                             <option value="Đã xong">✅ Đã xong</option>
//                                         </select>

//                                         <select class="gvcn-sel-danhgia" style="flex: 1; min-width: 90px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; background:#fff; cursor:pointer;">
//                                             <option value="">Chưa đánh giá</option><option value="Tốt">🌟 Tốt</option><option value="Khá">👍 Khá</option>
//                                             <option value="Trung Bình">😐 TB</option><option value="Chưa đạt">❌ Chưa đạt</option>
//                                         </select>
//                                         <input class="gvcn-input-note" placeholder="Ghi chú..." style="flex: 1; min-width: 90px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none;">
                                        
//                                         <div style="display:flex; align-items:center; gap:5px; background:#fff; padding:3px; border:1px solid #ced4da; border-radius:4px;">
//                                             <button type="button" class="btn-anh-hs" onclick="this.nextElementSibling.click()" style="padding: 4px 8px; background: #e0f7fa; color: #00838f; border: 1px dashed #00acc1; border-radius: 4px; cursor: pointer; font-size:12px; font-weight:bold;" title="Đính kèm ảnh minh chứng riêng">📷 Ảnh</button>
//                                             <input type="file" accept="image/*" class="input-anh-hs" style="display:none;" onchange="if(typeof window.ham_21_23_chon_anh_hs === 'function') window.ham_21_23_chon_anh_hs(this)">
//                                             <img class="preview-anh-hs" src="" style="width:24px; height:24px; object-fit:cover; border-radius:4px; border:1px solid #00acc1; cursor:pointer; display:none;" onclick="this.previousElementSibling.click()" title="Bấm để đổi ảnh">
//                                             <button type="button" class="btn-xoa-anh-hs" onclick="if(typeof window.ham_21_24_xoa_anh_hs === 'function') window.ham_21_24_xoa_anh_hs(this)" style="display:none; background:none; border:none; color:#dc3545; cursor:pointer; font-size:16px; padding:0 3px;" title="Xóa ảnh">✖</button>
//                                         </div>

//                                         <button onclick="this.parentElement.remove()" style="padding: 6px 10px; background: #f8d7da; color: #dc3545; border: none; border-radius: 4px; cursor: pointer;" title="Xóa dòng học sinh">✖</button>
//                                     </div>
//                                 </div>
//                                 <button onclick="if(typeof ham_21_3_them_dong_nguoi_nhan === 'function') ham_21_3_them_dong_nguoi_nhan();" style="margin-top: 10px; padding: 6px 12px; background: #fff; border: 1px dashed #e83e8c; color: #e83e8c; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: bold;">
//                                     ➕ Thêm học sinh nhận việc
//                                 </button>
//                             </div>
//                         </div>

//                         <div style="text-align: right;">
//                             <button onclick="if(typeof ham_21_13_luu_noi_dung_tuan === 'function') ham_21_13_luu_noi_dung_tuan(this);" style="padding: 10px 25px; background: #0056b3; color: white; border: none; border-radius: 6px; font-weight: bold; font-size:13px; cursor: pointer; box-shadow:0 2px 4px rgba(0,0,0,0.2);">💾 THÊM CÔNG VIỆC MỚI VÀO MỤC 4</button>
//                         </div>
//                     </div>
//                 </div>

//                 <!-- 🌟 MỤC 5: QUẢN LÝ SỰ KIỆN (HOÀN TOÀN ĐỘC LẬP, CÓ NÚT LÙI/TIẾN TUẦN) -->
//                 <div style="background: #fff; padding: 25px; border-radius: 10px; border: 1px solid #dee2e6; box-shadow: 0 4px 10px rgba(0,0,0,0.03); width: 100%; box-sizing: border-box;">
//                     <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px dashed #fce4ec; padding-bottom: 10px; margin-bottom: 15px;">
//                         <h4 style="margin: 0; color: #e83e8c; font-size: 17px;">🎯 5. Quản lý Sự kiện (Tuần trước / Vi phạm)</h4>
//                         <button onclick="window.ham_21_22_toggle_muc('body-muc-5', this);" style="background: #f8f9fa; border: 1px solid #ccc; padding: 5px 12px; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: bold;">➖ Thu hẹp</button>
//                     </div>
                    
//                     <div id="body-muc-5">
//                         <!-- THANH ĐIỀU HƯỚNG TUẦN ĐỘC LẬP (CÓ NÚT LÙI/TIẾN VÀ KHOẢNG THỜI GIAN) -->
//                         <div style="background: #fdf5f8; padding: 15px; border-radius: 8px; border: 2px solid #e83e8c; margin-bottom: 20px;">
//                             <label style="font-weight: bold; font-size: 14px; color: #e83e8c; display:block; margin-bottom:8px;">B1. Chọn Tuần xảy ra sự kiện (Độc lập):</label>
                            
//                             <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
//                                 <div style="display: flex; gap: 4px;">
//                                     <button onclick="if(typeof ham_21_29_chuyen_tuan_su_kien === 'function') ham_21_29_chuyen_tuan_su_kien(-1)" style="padding: 8px 12px; background: #e83e8c; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;" title="Tuần trước">◀ Lùi</button>
//                                     <button onclick="if(typeof ham_21_29_chuyen_tuan_su_kien === 'function') ham_21_29_chuyen_tuan_su_kien(1)" style="padding: 8px 12px; background: #e83e8c; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;" title="Tuần sau">Tiến ▶</button>
//                                 </div>

//                                 <input id="gvcn-sk-tuan-chon" list="dl-tuan" onchange="if(typeof ham_21_30_cap_nhat_ngay_tuan_su_kien === 'function') ham_21_30_cap_nhat_ngay_tuan_su_kien();" placeholder="Chọn tuần..." style="width: 140px; padding: 9px; border: 1px solid #ced4da; border-radius: 6px; font-weight: bold; font-size: 14px; outline: none; background:#fff; color:#e83e8c;">
                                
//                                 <span style="font-size:12px; font-weight:bold; color:#6c757d;">Từ:</span>
//                                 <input type="date" id="gvcn-sk-tuan-tu" style="width: 130px; padding: 8px; border: 1px solid #ced4da; border-radius: 6px; font-size: 12px; font-weight: bold; outline: none;">
                                
//                                 <span style="font-size:12px; font-weight:bold; color:#6c757d;">Đến:</span>
//                                 <input type="date" id="gvcn-sk-tuan-den" style="width: 130px; padding: 8px; border: 1px solid #ced4da; border-radius: 6px; font-size: 12px; font-weight: bold; outline: none;">
//                             </div>
//                         </div>

//                         <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border: 1px solid #ced4da; margin-bottom: 15px;">
//                             <label style="font-weight: bold; font-size: 13px; color: #495057; display:block; margin-bottom:10px;">B2. Nhập danh sách Sự kiện / Vi phạm:</label>
//                             <div id="gvcn-khu-vuc-su-kien-nhanh" style="display: flex; flex-direction: column; gap: 10px;">
//                                 <div class="dong-nhap-su-kien" style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap; background: #fff; padding: 6px; border-radius: 6px; border: 1px dashed #ccc;">
//                                     <input type="date" class="sk-ngay" value="${currentDate}" style="width: 130px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; font-weight:bold;">
//                                     <select class="sk-buoi" style="width: 80px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; cursor:pointer;">
//                                         <option value="Sáng">Sáng</option><option value="Trưa">Trưa</option><option value="Chiều">Chiều</option><option value="Tối">Tối</option>
//                                     </select>
//                                     <div style="display:flex; align-items:center; gap:8px; flex:1.5; min-width:180px; border:2px solid #e83e8c; border-radius:4px; padding:4px 8px; background:#fdf5f8;">
//                                         <img class="avatar-preview" src="" style="width:24px; height:24px; border-radius:50%; object-fit:cover; display:none; border:1px solid #eee;">
//                                         <input class="sk-hs" placeholder="👤 Chọn học sinh..." style="border:none; outline:none; flex:1; width:100%; font-size:13px; font-weight:bold; background:transparent; color:#e83e8c;">
//                                     </div>
//                                     <input class="sk-loi" list="gvcn-dl-loi" placeholder="🚨 Gõ tìm lỗi/sự kiện..." style="flex: 1.5; min-width: 140px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 13px; font-weight:bold; outline: none;">
//                                     <button onclick="this.parentElement.remove()" style="padding: 8px 12px; background: #fff; color: #dc3545; border: 1px solid #dc3545; border-radius: 4px; cursor: pointer;" title="Xóa">✖</button>
//                                 </div>
//                             </div>
//                             <button onclick="if(typeof ham_21_4_them_dong_su_kien === 'function') ham_21_4_them_dong_su_kien();" style="margin-top: 10px; padding: 8px 15px; background: #fff; border: 1px dashed #e83e8c; color: #e83e8c; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: bold;">➕ Thêm dòng sự kiện mới</button>
//                         </div>
//                         <datalist id="gvcn-dl-loi"></datalist>
//                         <div style="margin-bottom: 15px;">
//                             <label style="font-weight: bold; font-size: 13px; color: #495057; display: block; margin-bottom: 8px;">B3. 📸 Ảnh minh chứng chung (Cho các sự kiện trên):</label>
//                             <div style="display: flex; gap: 15px; align-items: stretch;">
//                                 <button type="button" onclick="document.getElementById('gvcn-input-anh-sk').click()" style="padding: 10px 15px; background: #f8f9fa; color: #495057; border: 1px dashed #adb5bd; border-radius: 6px; cursor: pointer; font-weight: bold; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 5px; flex-shrink: 0;"><span style="font-size: 20px;">📷</span><span style="font-size: 11px;">Tải ảnh lên</span></button>
//                                 <input type="file" id="gvcn-input-anh-sk" accept="image/*" multiple style="display: none;">
//                                 <div id="gvcn-vung-preview-anh-sk" style="flex: 1; border: 1px dashed #ccc; border-radius: 6px; display: flex; align-items: center; color: #adb5bd; font-size: 12px; font-style: italic; background: #fafafa; padding: 8px; gap: 8px; overflow-x: auto;"><span>(Ảnh minh chứng sự kiện...)</span></div>
//                             </div>
//                         </div>
//                         <div style="text-align: center; margin-bottom: 15px;">
//                             <button onclick="if(typeof ham_21_6_dua_vao_danh_sach_cho === 'function') ham_21_6_dua_vao_danh_sach_cho();" style="padding: 12px 20px; background: #fff; color: #e83e8c; border: 2px dashed #e83e8c; border-radius: 6px; font-weight: bold; font-size: 15px; cursor: pointer; width: 100%;">⬇️ ĐƯA XUỐNG DANH SÁCH CHỜ LƯU</button>
//                         </div>
//                         <div style="background: #f8f9fa; border: 1px solid #ced4da; border-radius: 8px; padding: 15px; max-height: 350px; overflow-y: auto; margin-bottom: 15px;">
//                             <div style="font-size: 14px; font-weight: bold; color: #495057; margin-bottom: 12px; border-bottom: 2px solid #dee2e6; padding-bottom: 8px;">Sự kiện đang chờ lưu (<span id="gvcn-dem-su-kien" style="color:#e83e8c;">0</span>):</div>
//                             <div id="gvcn-danh-sach-cho-luu"><i style="color: #adb5bd; font-size: 13px;">Chưa có sự kiện nào...</i></div>
//                         </div>
//                         <div style="text-align: right;">
//                             <button onclick="if(typeof ham_21_15_luu_su_kien_tuan_truoc === 'function') ham_21_15_luu_su_kien_tuan_truoc(this);" style="padding: 12px 30px; background: #e83e8c; color: white; border: none; border-radius: 8px; font-weight: bold; font-size: 15px; cursor: pointer; box-shadow: 0 4px 10px rgba(232,62,140,0.3);">💾 LƯU CÁC SỰ KIỆN MỤC 5</button>
//                         </div>
//                     </div>
//                 </div>

//             </div>
//         </div>
//     `;

//     if (typeof window.ham_20_7_tai_danh_sach_lop === 'function') window.ham_20_7_tai_danh_sach_lop();
//     if (typeof window.ham_21_5_tai_danh_sach_the_datalist === 'function') window.ham_21_5_tai_danh_sach_the_datalist();
//     if (typeof window.ham_21_8_kich_hoat_xu_ly_anh === 'function') window.ham_21_8_kich_hoat_xu_ly_anh();
// };



// // =====================================================================
// // HÀM 21.1: VẼ GIAO DIỆN CHÍNH (CẬP NHẬT MỤC 5 ĐÚNG CHUẨN NHẬT KÝ DẠY HỌC)
// // =====================================================================
// window.ham_21_1_mo_giao_dien_nhat_ky_gvcn = function () {
//     const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
//     if (!vungLamViec) return;

//     const now = new Date();
//     now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
//     const currentDateTime = now.toISOString().slice(0, 16);
//     const currentDate = now.toISOString().split('T')[0];

//     let curr = new Date();
//     let first = curr.getDate() - curr.getDay() + 1;
//     let last = first + 6;
//     let monday = new Date(curr.setDate(first)).toISOString().split('T')[0];
//     let sunday = new Date(curr.setDate(last)).toISOString().split('T')[0];

//     let optionsTuan = '';
//     for (let i = 1; i <= 37; i++) optionsTuan += `<option value="Tuần ${i}"></option>`;

//     vungLamViec.innerHTML = `
//         <div style="padding: 10px; animation: fadeIn 0.4s ease-in-out;">
            
//             <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #6f42c1; padding-bottom: 12px; margin-bottom: 25px;">
//                 <h3 style="color: #6f42c1; margin: 0; text-transform: uppercase; display: flex; align-items: center; gap: 10px; font-size: 20px;">
//                     🛡️ Sổ Tay Giáo Viên Chủ Nhiệm
//                 </h3>
                
//                 <div style="display: flex; gap: 10px; flex-wrap: wrap;">
//                     <button onclick="if(typeof ham_21_10_lam_moi_so_gvcn === 'function') ham_21_10_lam_moi_so_gvcn();" style="padding: 8px 15px; background: #e83e8c; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.15);">🆕 Tuần mới</button>
//                     <button onclick="alert('Tính năng Xem tuần cũ đang phát triển...')" style="padding: 8px 15px; background: #17a2b8; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.15);">⏮️ Xem tuần cũ</button>
//                     <button onclick="if(typeof ham_21_17_tai_tuan_gan_nhat === 'function') ham_21_17_tai_tuan_gan_nhat();" style="padding: 8px 15px; background: #28a745; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.15);">🔄 Tuần gần nhất</button>
//                     <button onclick="alert('Tính năng Tìm lại đang phát triển...')" style="padding: 8px 15px; background: #ffc107; color: #000; border: 1px solid #d39e00; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.15);">🔍 Tìm lại</button>
//                     <button onclick="ham_3_1_ve_dashboard_admin()" style="padding: 8px 15px; background: #6c757d; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.15);">⬅️ Quay lại</button>
//                 </div>
//             </div>

//             <!-- MỤC 1 -->
//             <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; border: 1px solid #dee2e6; box-shadow: 0 4px 6px rgba(0,0,0,0.03); margin-bottom: 25px;">
//                 <h4 style="margin: 0 0 15px 0; color: #495057; font-size: 16px;">🕒 1. Thông tin Tuần</h4>
//                 <div style="display: flex; flex-wrap: wrap; gap: 20px;">
//                     <div style="flex: 0 0 220px;">
//                         <label style="font-weight: bold; font-size: 14px; color: #495057; margin-bottom: 5px; display: block;">Lớp Chủ Nhiệm:</label>
//                         <input id="gvcn-input-lop" list="dl-lop" onchange="if(typeof window.ham_21_2_tai_danh_sach_hs_chu_nhiem === 'function') window.ham_21_2_tai_danh_sach_hs_chu_nhiem();" placeholder="Chọn lớp..." style="width: 100%; padding: 10px; border: 2px solid #6f42c1; border-radius: 6px; box-sizing: border-box; font-weight: bold; font-size: 15px; color: #6f42c1; outline: none; background: #fdfbfe;">
//                         <datalist id="dl-lop"></datalist>
//                         <datalist id="gvcn-dl-hs"></datalist>
//                     </div>
//                     <div style="flex: 1; min-width: 450px;">
//                         <label style="font-weight: bold; font-size: 14px; color: #495057; margin-bottom: 5px; display: block;">Tuần học (Từ 1 - 37):</label>
//                         <div style="display: flex; gap: 10px; align-items: center;">
//                             <input id="gvcn-input-tuan" list="dl-tuan" onchange="if(typeof ham_21_16_tai_du_lieu_tuan === 'function') ham_21_16_tai_du_lieu_tuan();" placeholder="Tuần..." style="width: 130px; padding: 10px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; font-weight: bold; font-size: 14px; outline: none;">
//                             <datalist id="dl-tuan">${optionsTuan}</datalist>
//                             <span style="font-size:13px; font-weight:bold; color:#6c757d;">Từ:</span>
//                             <input type="date" id="gvcn-tuan-tu" value="${monday}" onchange="if(typeof ham_21_12_tu_dong_tinh_ngay_den === 'function') ham_21_12_tu_dong_tinh_ngay_den();" style="flex: 1; padding: 10px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; font-size: 13px; font-weight: bold; outline: none;">
//                             <span style="font-size:13px; font-weight:bold; color:#6c757d;">Đến:</span>
//                             <input type="date" id="gvcn-tuan-den" value="${sunday}" style="flex: 1; padding: 10px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; font-size: 13px; font-weight: bold; outline: none;">
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div style="display: flex; flex-direction: column; gap: 25px; width: 100%;">
                
//                 <!-- MỤC 2 -->
//                 <div style="background: #fff; padding: 25px; border-radius: 10px; border: 1px solid #dee2e6; box-shadow: 0 4px 10px rgba(0,0,0,0.03); width: 100%; box-sizing: border-box;">
//                     <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px dashed #d1ecf1; padding-bottom: 10px; margin-bottom: 15px;">
//                         <h4 style="margin: 0; color: #17a2b8; font-size: 17px;">📝 2. Nội dung chung của Tuần (Sinh hoạt lớp)</h4>
//                         <button onclick="window.ham_21_22_toggle_muc('body-muc-2', this);" style="background: #f8f9fa; border: 1px solid #ccc; padding: 5px 12px; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: bold;">➖ Thu hẹp</button>
//                     </div>
//                     <div id="body-muc-2">
//                         <textarea id="gvcn-nd-sinh-hoat" placeholder="Nhập các nội dung chính đã sinh hoạt chung..." style="width: 100%; padding: 12px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; resize: vertical; min-height: 90px; font-family: inherit; font-size:14px; outline: none; margin-bottom: 15px;"></textarea>
//                         <label style="font-weight: bold; font-size: 13px; color: #495057; display: block; margin-bottom: 8px;">📸 Ảnh của Tuần (Hình ảnh lớp / Biên bản SHL):</label>
//                         <div id="gvcn-vung-anh-cu-tuan" style="display: flex; gap: 15px; flex-wrap: wrap; margin-bottom: 15px; align-items: flex-start;"></div>
//                         <div style="display: flex; gap: 15px; align-items: stretch; margin-bottom: 15px;">
//                             <button type="button" onclick="document.getElementById('gvcn-input-anh-tuan').click()" style="padding: 10px 15px; background: #f8f9fa; color: #17a2b8; border: 1px dashed #17a2b8; border-radius: 6px; cursor: pointer; font-weight: bold; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 5px; flex-shrink: 0;"><span style="font-size: 20px;">📷</span><span style="font-size: 11px;">Chụp/Thêm ảnh mới</span></button>
//                             <input type="file" id="gvcn-input-anh-tuan" accept="image/*" multiple style="display: none;">
//                             <div id="gvcn-vung-preview-anh-tuan" style="flex: 1; border: 1px dashed #ccc; border-radius: 6px; display: flex; align-items: center; color: #adb5bd; font-size: 12px; font-style: italic; background: #fafafa; padding: 8px; gap: 8px; overflow-x: auto;"><span>(Ảnh thêm mới sẽ hiển thị tại đây...)</span></div>
//                         </div>
//                     </div>
//                 </div>

//                 <!-- MỤC 3 -->
//                 <div style="background: #fff; padding: 25px; border-radius: 10px; border: 1px solid #dee2e6; box-shadow: 0 4px 10px rgba(0,0,0,0.03); width: 100%; box-sizing: border-box; margin-bottom: 5px;">
//                     <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px dashed #d4edda; padding-bottom: 10px; margin-bottom: 15px;">
//                         <h4 style="margin: 0; color: #28a745; font-size: 17px;">🌟 3. Đánh giá Tuần</h4>
//                         <button onclick="window.ham_21_22_toggle_muc('body-muc-3', this);" style="background: #f8f9fa; border: 1px solid #ccc; padding: 5px 12px; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: bold;">➖ Thu hẹp</button>
//                     </div>
//                     <div id="body-muc-3">
//                         <textarea id="gvcn-danh-gia-tuan" placeholder="Nhập nhận xét tổng quan..." style="width: 100%; padding: 12px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; margin-bottom: 5px; resize: vertical; min-height: 90px; font-family: inherit; font-size:14px; outline: none;"></textarea>
//                     </div>
//                 </div>

//                 <!-- THANH NÚT LƯU CHUNG MỤC 2 & 3 -->
//                 <div style="background: #e8f5e9; padding: 15px 25px; border-radius: 10px; border: 1px solid #c3e6cb; display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; box-shadow: 0 4px 10px rgba(0,0,0,0.03);">
//                     <div style="color: #155724; font-weight: bold; font-size: 14px; display: flex; align-items: center; gap: 8px;">
//                         💡 <span>Đừng quên <b style="color:#28a745;">LƯU</b> thông tin Sinh hoạt & Đánh giá của tuần (Mục 2 & Mục 3).</span>
//                     </div>
//                     <button onclick="if(typeof ham_21_14_luu_thong_tin_tuan === 'function') ham_21_14_luu_thong_tin_tuan(this);" style="padding: 12px 30px; background: #28a745; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; box-shadow:0 4px 6px rgba(40,167,69,0.3); font-size: 14px; transition:0.2s;" onmouseover="this.style.background='#218838'" onmouseout="this.style.background='#28a745'">
//                         💾 LƯU CHUNG MỤC 2 & MỤC 3
//                     </button>
//                 </div>

//                 <!-- MỤC 4: TỪNG NỘI DUNG CÓ GIAO VIỆC -->
//                 <div style="background: #fff; padding: 25px; border-radius: 10px; border: 1px solid #dee2e6; box-shadow: 0 4px 10px rgba(0,0,0,0.03); width: 100%; box-sizing: border-box;">
//                     <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px dashed #cce5ff; padding-bottom: 10px; margin-bottom: 15px;">
//                         <h4 style="margin: 0; color: #0056b3; font-size: 17px;">📋 4. Từng nội dung có Giao việc</h4>
//                         <button onclick="window.ham_21_22_toggle_muc('body-muc-4', this);" style="background: #f8f9fa; border: 1px solid #ccc; padding: 5px 12px; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: bold;">➖ Thu hẹp</button>
//                     </div>

//                     <div id="body-muc-4">
//                         <div id="gvcn-bang-noi-dung-cu" style="width: 100%; overflow-x: auto;"></div>

//                         <div style="background: #f0f8ff; padding: 15px; border-radius: 8px; border: 1px solid #b8daff; margin-bottom: 15px;">
//                             <h5 style="margin: 0 0 10px 0; color: #0056b3;">➕ Thêm nội dung / Giao việc mới:</h5>
//                             <div style="display: flex; gap: 15px; margin-bottom: 15px;">
//                                 <div style="flex: 1;">
//                                     <label style="font-weight: bold; font-size: 12px; color: #495057; display:block; margin-bottom:5px;">Ngày giờ nhập:</label>
//                                     <input type="datetime-local" id="gvcn-nd-ngay" value="${currentDateTime}" style="width: 100%; min-width:200px; padding: 10px; border: 1px solid #ced4da; border-radius: 6px; font-size: 13px; outline: none; box-sizing: border-box;">
//                                 </div>
//                             </div>
//                             <label style="font-weight: bold; font-size: 13px; color: #0056b3; display:block; margin-bottom:5px;">Tên Nội dung / Công việc (Bắt buộc):</label>
//                             <input type="text" id="gvcn-nd-ten" placeholder="VD: Phân công trực nhật..." style="width: 100%; padding: 10px; border: 2px solid #0056b3; border-radius: 6px; font-size: 14px; font-weight:bold; color:#0056b3; outline: none; margin-bottom:15px; background:#fff; box-sizing: border-box;">
                            
//                             <label style="font-weight: bold; font-size: 12px; color: #495057; display:block; margin-bottom:5px;">Chi tiết nội dung:</label>
//                             <textarea id="gvcn-nd-chitiet" placeholder="Mô tả chi tiết..." style="width: 100%; padding: 10px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; margin-bottom: 15px; resize: vertical; min-height: 60px; font-family: inherit; font-size:13px; outline: none;"></textarea>

//                             <label style="font-weight: bold; font-size: 13px; color: #00838f; display:block; margin-bottom:8px;">📸 Ảnh chung của nội dung này:</label>
//                             <div style="display: flex; gap: 15px; align-items: stretch; margin-bottom: 20px;">
//                                 <button type="button" onclick="document.getElementById('gvcn-input-anh-nd').click()" style="padding: 8px 12px; background: #e0f7fa; color: #00838f; border: 1px dashed #00acc1; border-radius: 4px; cursor: pointer; font-weight: bold; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px; flex-shrink: 0;"><span style="font-size: 18px;">📷</span><span style="font-size: 11px;">Tải ảnh chung</span></button>
//                                 <input type="file" id="gvcn-input-anh-nd" accept="image/*" multiple style="display: none;">
//                                 <div id="gvcn-vung-preview-anh-nd" style="flex: 1; border: 1px dashed #ccc; border-radius: 4px; display: flex; align-items: center; color: #adb5bd; font-size: 11px; font-style: italic; background: #fff; padding: 8px; gap: 8px; overflow-x: auto;"><span>(Ảnh đính kèm chung cho công việc...)</span></div>
//                             </div>

//                             <div style="background: #fff; padding: 15px; border-radius: 8px; border: 1px dashed #ccc; margin-bottom: 15px;">
//                                 <label style="font-weight: bold; font-size: 13px; color: #e83e8c; display:block; margin-bottom:10px;">👤 Danh sách học sinh nhận việc:</label>
//                                 <div id="gvcn-khu-vuc-nguoi-nhan" style="display: flex; flex-direction: column; gap: 10px;">
//                                     <div class="dong-nguoi-nhan" style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap; background: #f8f9fa; padding: 6px; border-radius: 6px; border: 1px solid #eee;">
//                                         <div style="display:flex; align-items:center; gap:8px; flex:1.5; min-width:160px; border:1px solid #ced4da; border-radius:4px; padding:4px 8px; background:#fff;">
//                                             <img class="avatar-preview" src="" style="width:24px; height:24px; border-radius:50%; object-fit:cover; display:none; border:1px solid #eee;">
//                                             <input class="gvcn-input-hs" placeholder="Chọn học sinh..." style="border:none; outline:none; flex:1; width:100%; font-size:12px; font-weight:bold; color:#1a73e8;">
//                                         </div>
//                                         <input class="gvcn-input-phan-viec" placeholder="Phần việc..." style="flex: 1.5; min-width: 110px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; font-weight:bold; outline: none;">
                                        
//                                         <select class="gvcn-sel-trangthai" style="flex: 1; min-width: 90px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; background:#fff; cursor:pointer;">
//                                             <option value="Chưa làm">❌ Chưa làm</option>
//                                             <option value="Đang làm">⏳ Đang làm</option>
//                                             <option value="Chưa xong">⚠️ Chưa xong</option>
//                                             <option value="Đã xong">✅ Đã xong</option>
//                                         </select>

//                                         <select class="gvcn-sel-danhgia" style="flex: 1; min-width: 90px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; background:#fff; cursor:pointer;">
//                                             <option value="">Chưa đánh giá</option><option value="Tốt">🌟 Tốt</option><option value="Khá">👍 Khá</option>
//                                             <option value="Trung Bình">😐 TB</option><option value="Chưa đạt">❌ Chưa đạt</option>
//                                         </select>
//                                         <input class="gvcn-input-note" placeholder="Ghi chú..." style="flex: 1; min-width: 90px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none;">
                                        
//                                         <div style="display:flex; align-items:center; gap:5px; background:#fff; padding:3px; border:1px solid #ced4da; border-radius:4px;">
//                                             <button type="button" class="btn-anh-hs" onclick="this.nextElementSibling.click()" style="padding: 4px 8px; background: #e0f7fa; color: #00838f; border: 1px dashed #00acc1; border-radius: 4px; cursor: pointer; font-size:12px; font-weight:bold;" title="Đính kèm ảnh minh chứng riêng">📷 Ảnh</button>
//                                             <input type="file" accept="image/*" class="input-anh-hs" style="display:none;" onchange="if(typeof window.ham_21_23_chon_anh_hs === 'function') window.ham_21_23_chon_anh_hs(this)">
//                                             <img class="preview-anh-hs" src="" style="width:24px; height:24px; object-fit:cover; border-radius:4px; border:1px solid #00acc1; cursor:pointer; display:none;" onclick="this.previousElementSibling.click()" title="Bấm để đổi ảnh">
//                                             <button type="button" class="btn-xoa-anh-hs" onclick="if(typeof window.ham_21_24_xoa_anh_hs === 'function') window.ham_21_24_xoa_anh_hs(this)" style="display:none; background:none; border:none; color:#dc3545; cursor:pointer; font-size:16px; padding:0 3px;" title="Xóa ảnh">✖</button>
//                                         </div>

//                                         <button onclick="this.parentElement.remove()" style="padding: 6px 10px; background: #f8d7da; color: #dc3545; border: none; border-radius: 4px; cursor: pointer;" title="Xóa dòng học sinh">✖</button>
//                                     </div>
//                                 </div>
//                                 <button onclick="if(typeof ham_21_3_them_dong_nguoi_nhan === 'function') ham_21_3_them_dong_nguoi_nhan();" style="margin-top: 10px; padding: 6px 12px; background: #fff; border: 1px dashed #e83e8c; color: #e83e8c; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: bold;">
//                                     ➕ Thêm học sinh nhận việc
//                                 </button>
//                             </div>
//                         </div>

//                         <div style="text-align: right;">
//                             <button onclick="if(typeof ham_21_13_luu_noi_dung_tuan === 'function') ham_21_13_luu_noi_dung_tuan(this);" style="padding: 10px 25px; background: #0056b3; color: white; border: none; border-radius: 6px; font-weight: bold; font-size:13px; cursor: pointer; box-shadow:0 2px 4px rgba(0,0,0,0.2);">💾 THÊM CÔNG VIỆC MỚI VÀO MỤC 4</button>
//                         </div>
//                     </div>
//                 </div>

//                 <!-- 🌟 MỤC 5: QUẢN LÝ SỰ KIỆN (ĐỘC LẬP HOÀN TOÀN, CHUẨN GIAO DIỆN NHẬT KÝ DẠY HỌC) -->
//                 <div style="background: #fff; padding: 25px; border-radius: 10px; border: 1px solid #dee2e6; box-shadow: 0 4px 10px rgba(0,0,0,0.03); width: 100%; box-sizing: border-box;">
//                     <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px dashed #fce4ec; padding-bottom: 10px; margin-bottom: 15px;">
//                         <h4 style="margin: 0; color: #e83e8c; font-size: 17px;">🎯 5. Quản lý Sự kiện (Tuần trước / Vi phạm)</h4>
//                         <button onclick="window.ham_21_22_toggle_muc('body-muc-5', this);" style="background: #f8f9fa; border: 1px solid #ccc; padding: 5px 12px; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: bold;">➖ Thu hẹp</button>
//                     </div>
                    
//                     <div id="body-muc-5">
//                         <!-- Thanh điều hướng tuần độc lập -->
//                         <div style="background: #fdf5f8; padding: 15px; border-radius: 8px; border: 2px solid #e83e8c; margin-bottom: 20px;">
//                             <label style="font-weight: bold; font-size: 14px; color: #e83e8c; display:block; margin-bottom:8px;">B1. Chọn Tuần xảy ra sự kiện (Độc lập):</label>
//                             <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
//                                 <div style="display: flex; gap: 4px;">
//                                     <button onclick="if(typeof ham_21_29_chuyen_tuan_su_kien === 'function') ham_21_29_chuyen_tuan_su_kien(-1)" style="padding: 8px 12px; background: #e83e8c; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;" title="Tuần trước">◀ Lùi</button>
//                                     <button onclick="if(typeof ham_21_29_chuyen_tuan_su_kien === 'function') ham_21_29_chuyen_tuan_su_kien(1)" style="padding: 8px 12px; background: #e83e8c; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;" title="Tuần sau">Tiến ▶</button>
//                                 </div>
//                                 <input id="gvcn-sk-tuan-chon" list="dl-tuan" onchange="if(typeof ham_21_30_cap_nhat_ngay_tuan_su_kien === 'function') ham_21_30_cap_nhat_ngay_tuan_su_kien();" placeholder="Chọn tuần..." style="width: 140px; padding: 9px; border: 1px solid #ced4da; border-radius: 6px; font-weight: bold; font-size: 14px; outline: none; background:#fff; color:#e83e8c;">
//                                 <span style="font-size:12px; font-weight:bold; color:#6c757d;">Từ:</span>
//                                 <input type="date" id="gvcn-sk-tuan-tu" style="width: 130px; padding: 8px; border: 1px solid #ced4da; border-radius: 6px; font-size: 12px; font-weight: bold; outline: none;">
//                                 <span style="font-size:12px; font-weight:bold; color:#6c757d;">Đến:</span>
//                                 <input type="date" id="gvcn-sk-tuan-den" style="width: 130px; padding: 8px; border: 1px solid #ced4da; border-radius: 6px; font-size: 12px; font-weight: bold; outline: none;">
//                             </div>
//                         </div>

//                         <!-- B2: NHẬP DANH SÁCH SỰ KIỆN (CHUẨN NHẬT KÝ DẠY HỌC) -->
//                         <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border: 1px solid #ced4da; margin-bottom: 15px;">
//                             <label style="font-weight: bold; font-size: 13px; color: #495057; display:block; margin-bottom:10px;">B2. Nhập danh sách Sự kiện / Vi phạm:</label>
                            
//                             <div id="gvcn-khu-vuc-su-kien-nhanh" style="display: flex; flex-direction: column; gap: 12px;">
//                                 <div class="dong-nhap-su-kien" style="background: #fff; padding: 12px; border-radius: 8px; border: 1px solid #ccc; display: flex; flex-direction: column; gap: 10px;">
                                    
//                                     <!-- Dòng 1: Ngày, Buổi, Danh sách học sinh -->
//                                     <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
//                                         <input type="date" class="sk-ngay" value="${currentDate}" style="width: 130px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; font-weight:bold;">
//                                         <select class="sk-buoi" style="width: 85px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; cursor:pointer;">
//                                             <option value="Sáng">Sáng</option><option value="Trưa">Trưa</option><option value="Chiều">Chiều</option><option value="Tối">Tối</option>
//                                         </select>
                                        
//                                         <!-- Vùng chứa học sinh (Hỗ trợ thêm nhiều học sinh) -->
//                                         <div class="sk-vung-hoc-sinh" style="display: flex; flex-direction: column; gap: 6px; flex: 2; min-width: 250px;">
//                                             <div style="display:flex; align-items:center; gap:6px;">
//                                                 <div style="display:flex; align-items:center; gap:6px; flex:1; border:2px solid #e83e8c; border-radius:4px; padding:4px 8px; background:#fdf5f8;">
//                                                     <img class="avatar-preview" src="" style="width:22px; height:22px; border-radius:50%; object-fit:cover; display:none; border:1px solid #eee;">
//                                                     <input class="sk-hs" placeholder="👤 Chọn học sinh..." style="border:none; outline:none; flex:1; width:100%; font-size:12px; font-weight:bold; background:transparent; color:#e83e8c;">
//                                                 </div>
//                                                 <button type="button" onclick="if(typeof ham_21_31_them_hs_cho_su_kien === 'function') ham_21_31_them_hs_cho_su_kien(this)" style="padding: 6px 10px; background: #fdf5f8; color: #e83e8c; border: 1px dashed #e83e8c; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: bold;" title="Chọn thêm học sinh chung sự kiện">➕ HS</button>
//                                             </div>
//                                         </div>

//                                         <button onclick="this.closest('.dong-nhap-su-kien').remove()" style="padding: 8px 12px; background: #f8d7da; color: #dc3545; border: none; border-radius: 4px; cursor: pointer;" title="Xóa dòng">✖</button>
//                                     </div>

//                                     <!-- Dòng 2: Ghi chú thêm -->
//                                     <div>
//                                         <input class="sk-ghichu" placeholder="📝 Ghi chú thêm cho sự kiện..." style="width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; box-sizing: border-box;">
//                                     </div>

//                                     <!-- Dòng 3: Loại sự kiện (Thẻ bấm phân loại Tốt / Xấu) -->
//                                     <div>
//                                         <label style="font-size: 11px; font-weight: bold; color: #6c757d; display: block; margin-bottom: 4px;">🏷️ Chọn loại sự kiện (Thẻ):</label>
//                                         <div class="sk-vung-chon-the" style="display: flex; gap: 6px; flex-wrap: wrap; align-items: center;">
//                                             <button type="button" onclick="if(typeof ham_21_32_mo_modal_them_the === 'function') ham_21_32_mo_modal_them_the()" style="padding: 4px 8px; background: #fff; border: 1px dashed #e83e8c; color: #e83e8c; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: bold;">➕ Thêm thẻ mới</button>
//                                         </div>
//                                         <input type="hidden" class="sk-loi-hidden" value="">
//                                     </div>

//                                     <!-- Dòng 4: Ảnh minh chứng riêng cho dòng sự kiện -->
//                                     <div style="display: flex; align-items: center; gap: 10px; border-top: 1px dashed #eee; padding-top: 6px;">
//                                         <button type="button" class="btn-anh-sk-dong" onclick="this.nextElementSibling.click()" style="padding: 4px 8px; background: #e0f7fa; color: #00838f; border: 1px dashed #00acc1; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: bold;">📷 Ảnh minh chứng</button>
//                                         <input type="file" accept="image/*" class="input-anh-sk-dong" style="display:none;" onchange="if(typeof window.ham_21_33_chon_anh_sk_dong === 'function') window.ham_21_33_chon_anh_sk_dong(this)">
//                                         <div class="vung-preview-anh-sk-dong" style="display: flex; gap: 6px; align-items: center; overflow-x: auto;"></div>
//                                     </div>

//                                 </div>
//                             </div>

//                             <button onclick="if(typeof ham_21_4_them_dong_su_kien === 'function') ham_21_4_them_dong_su_kien();" style="margin-top: 10px; padding: 8px 15px; background: #fff; border: 1px dashed #e83e8c; color: #e83e8c; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: bold;">
//                                 ➕ Thêm dòng sự kiện mới
//                             </button>
//                         </div>
                        
//                         <!-- B3: ẢNH MINH CHỨNG CHUNG CHO CÁC SỰ KIỆN TRÊN -->
//                         <div style="margin-bottom: 15px;">
//                             <label style="font-weight: bold; font-size: 13px; color: #495057; display: block; margin-bottom: 8px;">B3. 📸 Ảnh minh chứng chung toàn bộ:</label>
//                             <div style="display: flex; gap: 15px; align-items: stretch;">
//                                 <button type="button" onclick="document.getElementById('gvcn-input-anh-sk').click()" style="padding: 10px 15px; background: #f8f9fa; color: #495057; border: 1px dashed #adb5bd; border-radius: 6px; cursor: pointer; font-weight: bold; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 5px; flex-shrink: 0;"><span style="font-size: 20px;">📷</span><span style="font-size: 11px;">Tải ảnh lên</span></button>
//                                 <input type="file" id="gvcn-input-anh-sk" accept="image/*" multiple style="display: none;">
//                                 <div id="gvcn-vung-preview-anh-sk" style="flex: 1; border: 1px dashed #ccc; border-radius: 6px; display: flex; align-items: center; color: #adb5bd; font-size: 12px; font-style: italic; background: #fafafa; padding: 8px; gap: 8px; overflow-x: auto;"><span>(Ảnh minh chứng sự kiện chung...)</span></div>
//                             </div>
//                         </div>

//                         <div style="text-align: center; margin-bottom: 15px;">
//                             <button onclick="if(typeof ham_21_6_dua_vao_danh_sach_cho === 'function') ham_21_6_dua_vao_danh_sach_cho();" style="padding: 12px 20px; background: #fff; color: #e83e8c; border: 2px dashed #e83e8c; border-radius: 6px; font-weight: bold; font-size: 15px; cursor: pointer; width: 100%;">⬇️ ĐƯA XUỐNG DANH SÁCH CHỜ LƯU</button>
//                         </div>

//                         <div style="background: #f8f9fa; border: 1px solid #ced4da; border-radius: 8px; padding: 15px; max-height: 350px; overflow-y: auto; margin-bottom: 15px;">
//                             <div style="font-size: 14px; font-weight: bold; color: #495057; margin-bottom: 12px; border-bottom: 2px solid #dee2e6; padding-bottom: 8px;">Sự kiện đang chờ lưu (<span id="gvcn-dem-su-kien" style="color:#e83e8c;">0</span>):</div>
//                             <div id="gvcn-danh-sach-cho-luu"><i style="color: #adb5bd; font-size: 13px;">Chưa có sự kiện nào...</i></div>
//                         </div>

//                         <div style="text-align: right;">
//                             <button onclick="if(typeof ham_21_15_luu_su_kien_tuan_truoc === 'function') ham_21_15_luu_su_kien_tuan_truoc(this);" style="padding: 12px 30px; background: #e83e8c; color: white; border: none; border-radius: 8px; font-weight: bold; font-size: 15px; cursor: pointer; box-shadow: 0 4px 10px rgba(232,62,140,0.3);">💾 LƯU CÁC SỰ KIỆN MỤC 5</button>
//                         </div>
//                     </div>
//                 </div>

//             </div>
//         </div>
//     `;

//     if (typeof window.ham_20_7_tai_danh_sach_lop === 'function') window.ham_20_7_tai_danh_sach_lop();
//     if (typeof window.ham_21_5_tai_danh_sach_the_datalist === 'function') window.ham_21_5_tai_danh_sach_the_datalist();
//     if (typeof window.ham_21_8_kich_hoat_xu_ly_anh === 'function') window.ham_21_8_kich_hoat_xu_ly_anh();
//     if (typeof window.ham_21_34_render_tat_ca_cac_the_su_kien === 'function') window.ham_21_34_render_tat_ca_cac_the_su_kien();
// };


// // =====================================================================
// // HÀM 21.1: VẼ GIAO DIỆN CHÍNH (TỐI ƯU MỤC 5: THU HẸP Ô HS, ĐỔI TÊN NÚT, BỎ ẢNH CHUNG)
// // =====================================================================
// window.ham_21_1_mo_giao_dien_nhat_ky_gvcn = function () {
//     const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
//     if (!vungLamViec) return;

//     const now = new Date();
//     now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
//     const currentDateTime = now.toISOString().slice(0, 16);
//     const currentDate = now.toISOString().split('T')[0];

//     let curr = new Date();
//     let first = curr.getDate() - curr.getDay() + 1;
//     let last = first + 6;
//     let monday = new Date(curr.setDate(first)).toISOString().split('T')[0];
//     let sunday = new Date(curr.setDate(last)).toISOString().split('T')[0];

//     let optionsTuan = '';
//     for (let i = 1; i <= 37; i++) optionsTuan += `<option value="Tuần ${i}"></option>`;

//     vungLamViec.innerHTML = `
//         <div style="padding: 10px; animation: fadeIn 0.4s ease-in-out;">
            
//             <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #6f42c1; padding-bottom: 12px; margin-bottom: 25px;">
//                 <h3 style="color: #6f42c1; margin: 0; text-transform: uppercase; display: flex; align-items: center; gap: 10px; font-size: 20px;">
//                     🛡️ Sổ Tay Giáo Viên Chủ Nhiệm
//                 </h3>
                
//                 <div style="display: flex; gap: 10px; flex-wrap: wrap;">
//                     <button onclick="if(typeof ham_21_10_lam_moi_so_gvcn === 'function') ham_21_10_lam_moi_so_gvcn();" style="padding: 8px 15px; background: #e83e8c; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.15);">🆕 Tuần mới</button>
//                     <button onclick="alert('Tính năng Xem tuần cũ đang phát triển...')" style="padding: 8px 15px; background: #17a2b8; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.15);">⏮️ Xem tuần cũ</button>
//                     <button onclick="if(typeof ham_21_17_tai_tuan_gan_nhat === 'function') ham_21_17_tai_tuan_gan_nhat();" style="padding: 8px 15px; background: #28a745; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.15);">🔄 Tuần gần nhất</button>
//                     <button onclick="alert('Tính năng Tìm lại đang phát triển...')" style="padding: 8px 15px; background: #ffc107; color: #000; border: 1px solid #d39e00; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.15);">🔍 Tìm lại</button>
//                     <button onclick="ham_3_1_ve_dashboard_admin()" style="padding: 8px 15px; background: #6c757d; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.15);">⬅️ Quay lại</button>
//                 </div>
//             </div>

//             <!-- MỤC 1 -->
//             <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; border: 1px solid #dee2e6; box-shadow: 0 4px 6px rgba(0,0,0,0.03); margin-bottom: 25px;">
//                 <h4 style="margin: 0 0 15px 0; color: #495057; font-size: 16px;">🕒 1. Thông tin Tuần</h4>
//                 <div style="display: flex; flex-wrap: wrap; gap: 20px;">
//                     <div style="flex: 0 0 220px;">
//                         <label style="font-weight: bold; font-size: 14px; color: #495057; margin-bottom: 5px; display: block;">Lớp Chủ Nhiệm:</label>
//                         <input id="gvcn-input-lop" list="dl-lop" onchange="if(typeof window.ham_21_2_tai_danh_sach_hs_chu_nhiem === 'function') window.ham_21_2_tai_danh_sach_hs_chu_nhiem();" placeholder="Chọn lớp..." style="width: 100%; padding: 10px; border: 2px solid #6f42c1; border-radius: 6px; box-sizing: border-box; font-weight: bold; font-size: 15px; color: #6f42c1; outline: none; background: #fdfbfe;">
//                         <datalist id="dl-lop"></datalist>
//                         <datalist id="gvcn-dl-hs"></datalist>
//                     </div>
//                     <div style="flex: 1; min-width: 450px;">
//                         <label style="font-weight: bold; font-size: 14px; color: #495057; margin-bottom: 5px; display: block;">Tuần học (Từ 1 - 37):</label>
//                         <div style="display: flex; gap: 10px; align-items: center;">
//                             <input id="gvcn-input-tuan" list="dl-tuan" onchange="if(typeof ham_21_16_tai_du_lieu_tuan === 'function') ham_21_16_tai_du_lieu_tuan();" placeholder="Tuần..." style="width: 130px; padding: 10px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; font-weight: bold; font-size: 14px; outline: none;">
//                             <datalist id="dl-tuan">${optionsTuan}</datalist>
//                             <span style="font-size:13px; font-weight:bold; color:#6c757d;">Từ:</span>
//                             <input type="date" id="gvcn-tuan-tu" value="${monday}" onchange="if(typeof ham_21_12_tu_dong_tinh_ngay_den === 'function') ham_21_12_tu_dong_tinh_ngay_den();" style="flex: 1; padding: 10px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; font-size: 13px; font-weight: bold; outline: none;">
//                             <span style="font-size:13px; font-weight:bold; color:#6c757d;">Đến:</span>
//                             <input type="date" id="gvcn-tuan-den" value="${sunday}" style="flex: 1; padding: 10px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; font-size: 13px; font-weight: bold; outline: none;">
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div style="display: flex; flex-direction: column; gap: 25px; width: 100%;">
                
//                 <!-- MỤC 2 -->
//                 <div style="background: #fff; padding: 25px; border-radius: 10px; border: 1px solid #dee2e6; box-shadow: 0 4px 10px rgba(0,0,0,0.03); width: 100%; box-sizing: border-box;">
//                     <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px dashed #d1ecf1; padding-bottom: 10px; margin-bottom: 15px;">
//                         <h4 style="margin: 0; color: #17a2b8; font-size: 17px;">📝 2. Nội dung chung của Tuần (Sinh hoạt lớp)</h4>
//                         <button onclick="window.ham_21_22_toggle_muc('body-muc-2', this);" style="background: #f8f9fa; border: 1px solid #ccc; padding: 5px 12px; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: bold;">➖ Thu hẹp</button>
//                     </div>
//                     <div id="body-muc-2">
//                         <textarea id="gvcn-nd-sinh-hoat" placeholder="Nhập các nội dung chính đã sinh hoạt chung..." style="width: 100%; padding: 12px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; resize: vertical; min-height: 90px; font-family: inherit; font-size:14px; outline: none; margin-bottom: 15px;"></textarea>
//                         <label style="font-weight: bold; font-size: 13px; color: #495057; display: block; margin-bottom: 8px;">📸 Ảnh của Tuần (Hình ảnh lớp / Biên bản SHL):</label>
//                         <div id="gvcn-vung-anh-cu-tuan" style="display: flex; gap: 15px; flex-wrap: wrap; margin-bottom: 15px; align-items: flex-start;"></div>
//                         <div style="display: flex; gap: 15px; align-items: stretch; margin-bottom: 15px;">
//                             <button type="button" onclick="document.getElementById('gvcn-input-anh-tuan').click()" style="padding: 10px 15px; background: #f8f9fa; color: #17a2b8; border: 1px dashed #17a2b8; border-radius: 6px; cursor: pointer; font-weight: bold; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 5px; flex-shrink: 0;"><span style="font-size: 20px;">📷</span><span style="font-size: 11px;">Chụp/Thêm ảnh mới</span></button>
//                             <input type="file" id="gvcn-input-anh-tuan" accept="image/*" multiple style="display: none;">
//                             <div id="gvcn-vung-preview-anh-tuan" style="flex: 1; border: 1px dashed #ccc; border-radius: 6px; display: flex; align-items: center; color: #adb5bd; font-size: 12px; font-style: italic; background: #fafafa; padding: 8px; gap: 8px; overflow-x: auto;"><span>(Ảnh thêm mới sẽ hiển thị tại đây...)</span></div>
//                         </div>
//                     </div>
//                 </div>

//                 <!-- MỤC 3 -->
//                 <div style="background: #fff; padding: 25px; border-radius: 10px; border: 1px solid #dee2e6; box-shadow: 0 4px 10px rgba(0,0,0,0.03); width: 100%; box-sizing: border-box; margin-bottom: 5px;">
//                     <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px dashed #d4edda; padding-bottom: 10px; margin-bottom: 15px;">
//                         <h4 style="margin: 0; color: #28a745; font-size: 17px;">🌟 3. Đánh giá Tuần</h4>
//                         <button onclick="window.ham_21_22_toggle_muc('body-muc-3', this);" style="background: #f8f9fa; border: 1px solid #ccc; padding: 5px 12px; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: bold;">➖ Thu hẹp</button>
//                     </div>
//                     <div id="body-muc-3">
//                         <textarea id="gvcn-danh-gia-tuan" placeholder="Nhập nhận xét tổng quan..." style="width: 100%; padding: 12px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; margin-bottom: 5px; resize: vertical; min-height: 90px; font-family: inherit; font-size:14px; outline: none;"></textarea>
//                     </div>
//                 </div>

//                 <!-- THANH NÚT LƯU CHUNG MỤC 2 & 3 -->
//                 <div style="background: #e8f5e9; padding: 15px 25px; border-radius: 10px; border: 1px solid #c3e6cb; display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; box-shadow: 0 4px 10px rgba(0,0,0,0.03);">
//                     <div style="color: #155724; font-weight: bold; font-size: 14px; display: flex; align-items: center; gap: 8px;">
//                         💡 <span>Đừng quên <b style="color:#28a745;">LƯU</b> thông tin Sinh hoạt & Đánh giá của tuần (Mục 2 & Mục 3).</span>
//                     </div>
//                     <button onclick="if(typeof ham_21_14_luu_thong_tin_tuan === 'function') ham_21_14_luu_thong_tin_tuan(this);" style="padding: 12px 30px; background: #28a745; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; box-shadow:0 4px 6px rgba(40,167,69,0.3); font-size: 14px; transition:0.2s;" onmouseover="this.style.background='#218838'" onmouseout="this.style.background='#28a745'">
//                         💾 LƯU CHUNG MỤC 2 & MỤC 3
//                     </button>
//                 </div>

//                 <!-- MỤC 4: TỪNG NỘI DUNG CÓ GIAO VIỆC -->
//                 <div style="background: #fff; padding: 25px; border-radius: 10px; border: 1px solid #dee2e6; box-shadow: 0 4px 10px rgba(0,0,0,0.03); width: 100%; box-sizing: border-box;">
//                     <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px dashed #cce5ff; padding-bottom: 10px; margin-bottom: 15px;">
//                         <h4 style="margin: 0; color: #0056b3; font-size: 17px;">📋 4. Từng nội dung có Giao việc</h4>
//                         <button onclick="window.ham_21_22_toggle_muc('body-muc-4', this);" style="background: #f8f9fa; border: 1px solid #ccc; padding: 5px 12px; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: bold;">➖ Thu hẹp</button>
//                     </div>

//                     <div id="body-muc-4">
//                         <div id="gvcn-bang-noi-dung-cu" style="width: 100%; overflow-x: auto;"></div>

//                         <div style="background: #f0f8ff; padding: 15px; border-radius: 8px; border: 1px solid #b8daff; margin-bottom: 15px;">
//                             <h5 style="margin: 0 0 10px 0; color: #0056b3;">➕ Thêm nội dung / Giao việc mới:</h5>
//                             <div style="display: flex; gap: 15px; margin-bottom: 15px;">
//                                 <div style="flex: 1;">
//                                     <label style="font-weight: bold; font-size: 12px; color: #495057; display:block; margin-bottom:5px;">Ngày giờ nhập:</label>
//                                     <input type="datetime-local" id="gvcn-nd-ngay" value="${currentDateTime}" style="width: 100%; min-width:200px; padding: 10px; border: 1px solid #ced4da; border-radius: 6px; font-size: 13px; outline: none; box-sizing: border-box;">
//                                 </div>
//                             </div>
//                             <label style="font-weight: bold; font-size: 13px; color: #0056b3; display:block; margin-bottom:5px;">Tên Nội dung / Công việc (Bắt buộc):</label>
//                             <input type="text" id="gvcn-nd-ten" placeholder="VD: Phân công trực nhật..." style="width: 100%; padding: 10px; border: 2px solid #0056b3; border-radius: 6px; font-size: 14px; font-weight:bold; color:#0056b3; outline: none; margin-bottom:15px; background:#fff; box-sizing: border-box;">
                            
//                             <label style="font-weight: bold; font-size: 12px; color: #495057; display:block; margin-bottom:5px;">Chi tiết nội dung:</label>
//                             <textarea id="gvcn-nd-chitiet" placeholder="Mô tả chi tiết..." style="width: 100%; padding: 10px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; margin-bottom: 15px; resize: vertical; min-height: 60px; font-family: inherit; font-size:13px; outline: none;"></textarea>

//                             <label style="font-weight: bold; font-size: 13px; color: #00838f; display:block; margin-bottom:8px;">📸 Ảnh chung của nội dung này:</label>
//                             <div style="display: flex; gap: 15px; align-items: stretch; margin-bottom: 20px;">
//                                 <button type="button" onclick="document.getElementById('gvcn-input-anh-nd').click()" style="padding: 8px 12px; background: #e0f7fa; color: #00838f; border: 1px dashed #00acc1; border-radius: 4px; cursor: pointer; font-weight: bold; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px; flex-shrink: 0;"><span style="font-size: 18px;">📷</span><span style="font-size: 11px;">Tải ảnh chung</span></button>
//                                 <input type="file" id="gvcn-input-anh-nd" accept="image/*" multiple style="display: none;">
//                                 <div id="gvcn-vung-preview-anh-nd" style="flex: 1; border: 1px dashed #ccc; border-radius: 4px; display: flex; align-items: center; color: #adb5bd; font-size: 11px; font-style: italic; background: #fff; padding: 8px; gap: 8px; overflow-x: auto;"><span>(Ảnh đính kèm chung cho công việc...)</span></div>
//                             </div>

//                             <div style="background: #fff; padding: 15px; border-radius: 8px; border: 1px dashed #ccc; margin-bottom: 15px;">
//                                 <label style="font-weight: bold; font-size: 13px; color: #e83e8c; display:block; margin-bottom:10px;">👤 Danh sách học sinh nhận việc:</label>
//                                 <div id="gvcn-khu-vuc-nguoi-nhan" style="display: flex; flex-direction: column; gap: 10px;">
//                                     <div class="dong-nguoi-nhan" style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap; background: #f8f9fa; padding: 6px; border-radius: 6px; border: 1px solid #eee;">
//                                         <div style="display:flex; align-items:center; gap:8px; flex:1.2; min-width:140px; border:1px solid #ced4da; border-radius:4px; padding:4px 8px; background:#fff;">
//                                             <img class="avatar-preview" src="" style="width:24px; height:24px; border-radius:50%; object-fit:cover; display:none; border:1px solid #eee;">
//                                             <input class="gvcn-input-hs" placeholder="Chọn học sinh..." style="border:none; outline:none; flex:1; width:100%; font-size:12px; font-weight:bold; color:#1a73e8;">
//                                         </div>
//                                         <input class="gvcn-input-phan-viec" placeholder="Phần việc..." style="flex: 1.5; min-width: 110px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; font-weight:bold; outline: none;">
                                        
//                                         <select class="gvcn-sel-trangthai" style="flex: 1; min-width: 90px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; background:#fff; cursor:pointer;">
//                                             <option value="Chưa làm">❌ Chưa làm</option>
//                                             <option value="Đang làm">⏳ Đang làm</option>
//                                             <option value="Chưa xong">⚠️ Chưa xong</option>
//                                             <option value="Đã xong">✅ Đã xong</option>
//                                         </select>

//                                         <select class="gvcn-sel-danhgia" style="flex: 1; min-width: 90px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; background:#fff; cursor:pointer;">
//                                             <option value="">Chưa đánh giá</option><option value="Tốt">🌟 Tốt</option><option value="Khá">👍 Khá</option>
//                                             <option value="Trung Bình">😐 TB</option><option value="Chưa đạt">❌ Chưa đạt</option>
//                                         </select>
//                                         <input class="gvcn-input-note" placeholder="Ghi chú..." style="flex: 1; min-width: 90px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none;">
                                        
//                                         <div style="display:flex; align-items:center; gap:5px; background:#fff; padding:3px; border:1px solid #ced4da; border-radius:4px;">
//                                             <button type="button" class="btn-anh-hs" onclick="this.nextElementSibling.click()" style="padding: 4px 8px; background: #e0f7fa; color: #00838f; border: 1px dashed #00acc1; border-radius: 4px; cursor: pointer; font-size:12px; font-weight:bold;" title="Đính kèm ảnh minh chứng riêng">📷 Ảnh</button>
//                                             <input type="file" accept="image/*" class="input-anh-hs" style="display:none;" onchange="if(typeof window.ham_21_23_chon_anh_hs === 'function') window.ham_21_23_chon_anh_hs(this)">
//                                             <img class="preview-anh-hs" src="" style="width:24px; height:24px; object-fit:cover; border-radius:4px; border:1px solid #00acc1; cursor:pointer; display:none;" onclick="this.previousElementSibling.click()" title="Bấm để đổi ảnh">
//                                             <button type="button" class="btn-xoa-anh-hs" onclick="if(typeof window.ham_21_24_xoa_anh_hs === 'function') window.ham_21_24_xoa_anh_hs(this)" style="display:none; background:none; border:none; color:#dc3545; cursor:pointer; font-size:16px; padding:0 3px;" title="Xóa ảnh">✖</button>
//                                         </div>

//                                         <button onclick="this.parentElement.remove()" style="padding: 6px 10px; background: #f8d7da; color: #dc3545; border: none; border-radius: 4px; cursor: pointer;" title="Xóa dòng học sinh">✖</button>
//                                     </div>
//                                 </div>
//                                 <button onclick="if(typeof ham_21_3_them_dong_nguoi_nhan === 'function') ham_21_3_them_dong_nguoi_nhan();" style="margin-top: 10px; padding: 6px 12px; background: #fff; border: 1px dashed #e83e8c; color: #e83e8c; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: bold;">
//                                     ➕ Thêm học sinh nhận việc
//                                 </button>
//                             </div>
//                         </div>

//                         <div style="text-align: right;">
//                             <button onclick="if(typeof ham_21_13_luu_noi_dung_tuan === 'function') ham_21_13_luu_noi_dung_tuan(this);" style="padding: 10px 25px; background: #0056b3; color: white; border: none; border-radius: 6px; font-weight: bold; font-size:13px; cursor: pointer; box-shadow:0 2px 4px rgba(0,0,0,0.2);">💾 THÊM CÔNG VIỆC MỚI VÀO MỤC 4</button>
//                         </div>
//                     </div>
//                 </div>

//                 <!-- 🌟 MỤC 5: QUẢN LÝ SỰ KIỆN (CHUẨN HÓA THEO NỘI QUY THI ĐUA) -->
//                 <div style="background: #fff; padding: 25px; border-radius: 10px; border: 1px solid #dee2e6; box-shadow: 0 4px 10px rgba(0,0,0,0.03); width: 100%; box-sizing: border-box;">
//                     <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px dashed #fce4ec; padding-bottom: 10px; margin-bottom: 15px;">
//                         <h4 style="margin: 0; color: #e83e8c; font-size: 17px;">🎯 5. Quản lý Sự kiện (Tuần trước / Vi phạm)</h4>
//                         <button onclick="window.ham_21_22_toggle_muc('body-muc-5', this);" style="background: #f8f9fa; border: 1px solid #ccc; padding: 5px 12px; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: bold;">➖ Thu hẹp</button>
//                     </div>
                    
//                     <div id="body-muc-5">
//                         <!-- Thanh điều hướng tuần độc lập -->
//                         <div style="background: #fdf5f8; padding: 15px; border-radius: 8px; border: 2px solid #e83e8c; margin-bottom: 20px;">
//                             <label style="font-weight: bold; font-size: 14px; color: #e83e8c; display:block; margin-bottom:8px;">B1. Chọn Tuần xảy ra sự kiện (Độc lập):</label>
//                             <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
//                                 <div style="display: flex; gap: 4px;">
//                                     <button onclick="if(typeof ham_21_29_chuyen_tuan_su_kien === 'function') ham_21_29_chuyen_tuan_su_kien(-1)" style="padding: 8px 12px; background: #e83e8c; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;" title="Tuần trước">◀ Lùi</button>
//                                     <button onclick="if(typeof ham_21_29_chuyen_tuan_su_kien === 'function') ham_21_29_chuyen_tuan_su_kien(1)" style="padding: 8px 12px; background: #e83e8c; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;" title="Tuần sau">Tiến ▶</button>
//                                 </div>
//                                 <input id="gvcn-sk-tuan-chon" list="dl-tuan" onchange="if(typeof ham_21_30_cap_nhat_ngay_tuan_su_kien === 'function') ham_21_30_cap_nhat_ngay_tuan_su_kien();" placeholder="Chọn tuần..." style="width: 140px; padding: 9px; border: 1px solid #ced4da; border-radius: 6px; font-weight: bold; font-size: 14px; outline: none; background:#fff; color:#e83e8c;">
//                                 <span style="font-size:12px; font-weight:bold; color:#6c757d;">Từ:</span>
//                                 <input type="date" id="gvcn-sk-tuan-tu" style="width: 130px; padding: 8px; border: 1px solid #ced4da; border-radius: 6px; font-size: 12px; font-weight: bold; outline: none;">
//                                 <span style="font-size:12px; font-weight:bold; color:#6c757d;">Đến:</span>
//                                 <input type="date" id="gvcn-sk-tuan-den" style="width: 130px; padding: 8px; border: 1px solid #ced4da; border-radius: 6px; font-size: 12px; font-weight: bold; outline: none;">
//                             </div>
//                         </div>

//                         <!-- B2: NHẬP DANH SÁCH SỰ KIỆN -->
//                         <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border: 1px solid #ced4da; margin-bottom: 15px;">
//                             <label style="font-weight: bold; font-size: 13px; color: #495057; display:block; margin-bottom:10px;">B2. Nhập danh sách Sự kiện / Vi phạm:</label>
                            
//                             <div id="gvcn-khu-vuc-su-kien-nhanh" style="display: flex; flex-direction: column; gap: 12px;">
//                                 <div class="dong-nhap-su-kien" style="background: #fff; padding: 12px; border-radius: 8px; border: 1px solid #ccc; display: flex; flex-direction: column; gap: 10px;">
                                    
//                                     <!-- Dòng 1: Ngày, Buổi, Chọn HS (Ô hẹp hơn) & Nút Thêm HS -->
//                                     <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
//                                         <input type="date" class="sk-ngay" value="${currentDate}" style="width: 130px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; font-weight:bold;">
//                                         <select class="sk-buoi" style="width: 85px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; cursor:pointer;">
//                                             <option value="Sáng">Sáng</option><option value="Trưa">Trưa</option><option value="Chiều">Chiều</option><option value="Tối">Tối</option>
//                                         </select>
                                        
//                                         <!-- Vùng chứa học sinh (Ô chọn HS đã được thu hẹp vừa phải) -->
//                                         <div class="sk-vung-hoc-sinh" style="display: flex; flex-direction: column; gap: 6px; flex: 1.2; min-width: 200px;">
//                                             <div style="display:flex; align-items:center; gap:6px;">
//                                                 <div style="display:flex; align-items:center; gap:6px; flex:1; border:2px solid #e83e8c; border-radius:4px; padding:4px 8px; background:#fdf5f8;">
//                                                     <img class="avatar-preview" src="" style="width:22px; height:22px; border-radius:50%; object-fit:cover; display:none; border:1px solid #eee;">
//                                                     <input class="sk-hs" placeholder="👤 Chọn học sinh..." style="border:none; outline:none; flex:1; width:100%; font-size:12px; font-weight:bold; background:transparent; color:#e83e8c;">
//                                                 </div>
//                                                 <button type="button" onclick="if(typeof ham_21_31_them_hs_cho_su_kien === 'function') ham_21_31_them_hs_cho_su_kien(this)" style="padding: 6px 10px; background: #fdf5f8; color: #e83e8c; border: 1px dashed #e83e8c; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: bold; white-space:nowrap;" title="Chọn thêm học sinh chung sự kiện">➕ Thêm học sinh cùng sự kiện</button>
//                                             </div>
//                                         </div>

//                                         <button onclick="this.closest('.dong-nhap-su-kien').remove()" style="padding: 8px 12px; background: #f8d7da; color: #dc3545; border: none; border-radius: 4px; cursor: pointer;" title="Xóa dòng">✖</button>
//                                     </div>

//                                     <!-- Dòng 2: Ghi chú thêm -->
//                                     <div>
//                                         <input class="sk-ghichu" placeholder="📝 Ghi chú thêm cho sự kiện..." style="width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; box-sizing: border-box;">
//                                     </div>

//                                     <!-- Dòng 3: Loại sự kiện (Phân nhóm theo nội quy: Thời gian, Sổ đầu bài, Tác phong, Nề nếp, Tập thể...) -->
//                                     <div>
//                                         <label style="font-size: 11px; font-weight: bold; color: #6c757d; display: block; margin-bottom: 4px;">🏷️ Phân loại sự kiện (Theo nội quy thi đua):</label>
//                                         <div class="sk-vung-chon-the" style="display: flex; gap: 6px; flex-wrap: wrap; align-items: center;">
//                                             <button type="button" onclick="if(typeof ham_21_32_mo_modal_them_the === 'function') ham_21_32_mo_modal_them_the()" style="padding: 4px 8px; background: #fff; border: 1px dashed #e83e8c; color: #e83e8c; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: bold;">➕ Thêm thẻ mới</button>
//                                         </div>
//                                         <input type="hidden" class="sk-loi-hidden" value="">
//                                     </div>

//                                     <!-- Dòng 4: Ảnh minh chứng riêng cho từng dòng sự kiện -->
//                                     <div style="display: flex; align-items: center; gap: 10px; border-top: 1px dashed #eee; padding-top: 6px;">
//                                         <button type="button" class="btn-anh-sk-dong" onclick="this.nextElementSibling.click()" style="padding: 4px 8px; background: #e0f7fa; color: #00838f; border: 1px dashed #00acc1; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: bold;">📷 Ảnh minh chứng dòng này</button>
//                                         <input type="file" accept="image/*" class="input-anh-sk-dong" style="display:none;" onchange="if(typeof window.ham_21_33_chon_anh_sk_dong === 'function') window.ham_21_33_chon_anh_sk_dong(this)">
//                                         <div class="vung-preview-anh-sk-dong" style="display: flex; gap: 6px; align-items: center; overflow-x: auto;"></div>
//                                     </div>

//                                 </div>
//                             </div>

//                             <button onclick="if(typeof ham_21_4_them_dong_su_kien === 'function') ham_21_4_them_dong_su_kien();" style="margin-top: 10px; padding: 8px 15px; background: #fff; border: 1px dashed #e83e8c; color: #e83e8c; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: bold;">
//                                 ➕ Thêm dòng sự kiện mới
//                             </button>
//                         </div>
                        
//                         <div style="text-align: center; margin-bottom: 15px;">
//                             <button onclick="if(typeof ham_21_6_dua_vao_danh_sach_cho === 'function') ham_21_6_dua_vao_danh_sach_cho();" style="padding: 12px 20px; background: #fff; color: #e83e8c; border: 2px dashed #e83e8c; border-radius: 6px; font-weight: bold; font-size: 15px; cursor: pointer; width: 100%;">⬇️ ĐƯA XUỐNG DANH SÁCH CHỜ LƯU</button>
//                         </div>

//                         <div style="background: #f8f9fa; border: 1px solid #ced4da; border-radius: 8px; padding: 15px; max-height: 350px; overflow-y: auto; margin-bottom: 15px;">
//                             <div style="font-size: 14px; font-weight: bold; color: #495057; margin-bottom: 12px; border-bottom: 2px solid #dee2e6; padding-bottom: 8px;">Sự kiện đang chờ lưu (<span id="gvcn-dem-su-kien" style="color:#e83e8c;">0</span>):</div>
//                             <div id="gvcn-danh-sach-cho-luu"><i style="color: #adb5bd; font-size: 13px;">Chưa có sự kiện nào...</i></div>
//                         </div>

//                         <div style="text-align: right;">
//                             <button onclick="if(typeof ham_21_15_luu_su_kien_tuan_truoc === 'function') ham_21_15_luu_su_kien_tuan_truoc(this);" style="padding: 12px 30px; background: #e83e8c; color: white; border: none; border-radius: 8px; font-weight: bold; font-size: 15px; cursor: pointer; box-shadow: 0 4px 10px rgba(232,62,140,0.3);">💾 LƯU CÁC SỰ KIỆN MỤC 5</button>
//                         </div>
//                     </div>
//                 </div>

//             </div>
//         </div>
//     `;

//     if (typeof window.ham_20_7_tai_danh_sach_lop === 'function') window.ham_20_7_tai_danh_sach_lop();
//     if (typeof window.ham_21_5_tai_danh_sach_the_datalist === 'function') window.ham_21_5_tai_danh_sach_the_datalist();
//     if (typeof window.ham_21_8_kich_hoat_xu_ly_anh === 'function') window.ham_21_8_kich_hoat_xu_ly_anh();
//     if (typeof window.ham_21_34_render_tat_ca_cac_the_su_kien === 'function') window.ham_21_34_render_tat_ca_cac_the_su_kien();
// };


// =====================================================================
// HÀM 21.1: VẼ GIAO DIỆN CHÍNH (MỤC 1, 2, 3, 4 ỔN ĐỊNH, GỌI MỤC 5 RIÊNG)
// =====================================================================
window.ham_21_1_mo_giao_dien_nhat_ky_gvcn = function () {
    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
    if (!vungLamViec) return;

    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    const currentDateTime = now.toISOString().slice(0, 16);

    let curr = new Date();
    let first = curr.getDate() - curr.getDay() + 1;
    let last = first + 6;
    let monday = new Date(curr.setDate(first)).toISOString().split('T')[0];
    let sunday = new Date(curr.setDate(last)).toISOString().split('T')[0];

    let optionsTuan = '';
    for (let i = 1; i <= 37; i++) optionsTuan += `<option value="Tuần ${i}"></option>`;

    vungLamViec.innerHTML = `
        <div style="padding: 10px; animation: fadeIn 0.4s ease-in-out;">
            
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #6f42c1; padding-bottom: 12px; margin-bottom: 25px;">
                <h3 style="color: #6f42c1; margin: 0; text-transform: uppercase; display: flex; align-items: center; gap: 10px; font-size: 20px;">
                    🛡️ Sổ Tay Giáo Viên Chủ Nhiệm
                </h3>
                
                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                    <button onclick="if(typeof ham_21_10_lam_moi_so_gvcn === 'function') ham_21_10_lam_moi_so_gvcn();" style="padding: 8px 15px; background: #e83e8c; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.15);">🆕 Tuần mới</button>
                    <button onclick="alert('Tính năng Xem tuần cũ đang phát triển...')" style="padding: 8px 15px; background: #17a2b8; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.15);">⏮️ Xem tuần cũ</button>
                    <button onclick="if(typeof ham_21_17_tai_tuan_gan_nhat === 'function') ham_21_17_tai_tuan_gan_nhat();" style="padding: 8px 15px; background: #28a745; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.15);">🔄 Tuần gần nhất</button>
                    <button onclick="alert('Tính năng Tìm lại đang phát triển...')" style="padding: 8px 15px; background: #ffc107; color: #000; border: 1px solid #d39e00; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.15);">🔍 Tìm lại</button>
                    <button onclick="ham_3_1_ve_dashboard_admin()" style="padding: 8px 15px; background: #6c757d; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.15);">⬅️ Quay lại</button>
                </div>
            </div>

            <!-- MỤC 1 -->
            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; border: 1px solid #dee2e6; box-shadow: 0 4px 6px rgba(0,0,0,0.03); margin-bottom: 25px;">
                <h4 style="margin: 0 0 15px 0; color: #495057; font-size: 16px;">🕒 1. Thông tin Tuần</h4>
                <div style="display: flex; flex-wrap: wrap; gap: 20px;">
                    <div style="flex: 0 0 220px;">
                        <label style="font-weight: bold; font-size: 14px; color: #495057; margin-bottom: 5px; display: block;">Lớp Chủ Nhiệm:</label>
                        <input id="gvcn-input-lop" list="dl-lop" onchange="if(typeof window.ham_21_2_tai_danh_sach_hs_chu_nhiem === 'function') window.ham_21_2_tai_danh_sach_hs_chu_nhiem();" placeholder="Chọn lớp..." style="width: 100%; padding: 10px; border: 2px solid #6f42c1; border-radius: 6px; box-sizing: border-box; font-weight: bold; font-size: 15px; color: #6f42c1; outline: none; background: #fdfbfe;">
                        <datalist id="dl-lop"></datalist>
                        <datalist id="gvcn-dl-hs"></datalist>
                    </div>
                    <div style="flex: 1; min-width: 450px;">
                        <label style="font-weight: bold; font-size: 14px; color: #495057; margin-bottom: 5px; display: block;">Tuần học (Từ 1 - 37):</label>
                        <div style="display: flex; gap: 10px; align-items: center;">
                            <input id="gvcn-input-tuan" list="dl-tuan" onchange="if(typeof ham_21_16_tai_du_lieu_tuan === 'function') ham_21_16_tai_du_lieu_tuan();" placeholder="Tuần..." style="width: 130px; padding: 10px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; font-weight: bold; font-size: 14px; outline: none;">
                            <datalist id="dl-tuan">${optionsTuan}</datalist>
                            <span style="font-size:13px; font-weight:bold; color:#6c757d;">Từ:</span>
                            <input type="date" id="gvcn-tuan-tu" value="${monday}" onchange="if(typeof ham_21_12_tu_dong_tinh_ngay_den === 'function') ham_21_12_tu_dong_tinh_ngay_den();" style="flex: 1; padding: 10px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; font-size: 13px; font-weight: bold; outline: none;">
                            <span style="font-size:13px; font-weight:bold; color:#6c757d;">Đến:</span>
                            <input type="date" id="gvcn-tuan-den" value="${sunday}" style="flex: 1; padding: 10px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; font-size: 13px; font-weight: bold; outline: none;">
                        </div>
                    </div>
                </div>
            </div>

            <div style="display: flex; flex-direction: column; gap: 25px; width: 100%;">
                
                <!-- MỤC 2 -->
                <div style="background: #fff; padding: 25px; border-radius: 10px; border: 1px solid #dee2e6; box-shadow: 0 4px 10px rgba(0,0,0,0.03); width: 100%; box-sizing: border-box;">
                    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px dashed #d1ecf1; padding-bottom: 10px; margin-bottom: 15px;">
                        <h4 style="margin: 0; color: #17a2b8; font-size: 17px;">📝 2. Nội dung chung của Tuần (Sinh hoạt lớp)</h4>
                        <button onclick="window.ham_21_22_toggle_muc('body-muc-2', this);" style="background: #f8f9fa; border: 1px solid #ccc; padding: 5px 12px; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: bold;">➖ Thu hẹp</button>
                    </div>
                    <div id="body-muc-2">
                        <textarea id="gvcn-nd-sinh-hoat" placeholder="Nhập các nội dung chính đã sinh hoạt chung..." style="width: 100%; padding: 12px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; resize: vertical; min-height: 90px; font-family: inherit; font-size:14px; outline: none; margin-bottom: 15px;"></textarea>
                        <label style="font-weight: bold; font-size: 13px; color: #495057; display: block; margin-bottom: 8px;">📸 Ảnh của Tuần (Hình ảnh lớp / Biên bản SHL):</label>
                        <div id="gvcn-vung-anh-cu-tuan" style="display: flex; gap: 15px; flex-wrap: wrap; margin-bottom: 15px; align-items: flex-start;"></div>
                        <div style="display: flex; gap: 15px; align-items: stretch; margin-bottom: 15px;">
                            <button type="button" onclick="document.getElementById('gvcn-input-anh-tuan').click()" style="padding: 10px 15px; background: #f8f9fa; color: #17a2b8; border: 1px dashed #17a2b8; border-radius: 6px; cursor: pointer; font-weight: bold; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 5px; flex-shrink: 0;"><span style="font-size: 20px;">📷</span><span style="font-size: 11px;">Chụp/Thêm ảnh mới</span></button>
                            <input type="file" id="gvcn-input-anh-tuan" accept="image/*" multiple style="display: none;">
                            <div id="gvcn-vung-preview-anh-tuan" style="flex: 1; border: 1px dashed #ccc; border-radius: 6px; display: flex; align-items: center; color: #adb5bd; font-size: 12px; font-style: italic; background: #fafafa; padding: 8px; gap: 8px; overflow-x: auto;"><span>(Ảnh thêm mới sẽ hiển thị tại đây...)</span></div>
                        </div>
                    </div>
                </div>

                <!-- MỤC 3 -->
                <div style="background: #fff; padding: 25px; border-radius: 10px; border: 1px solid #dee2e6; box-shadow: 0 4px 10px rgba(0,0,0,0.03); width: 100%; box-sizing: border-box; margin-bottom: 5px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px dashed #d4edda; padding-bottom: 10px; margin-bottom: 15px;">
                        <h4 style="margin: 0; color: #28a745; font-size: 17px;">🌟 3. Đánh giá Tuần</h4>
                        <button onclick="window.ham_21_22_toggle_muc('body-muc-3', this);" style="background: #f8f9fa; border: 1px solid #ccc; padding: 5px 12px; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: bold;">➖ Thu hẹp</button>
                    </div>
                    <div id="body-muc-3">
                        <textarea id="gvcn-danh-gia-tuan" placeholder="Nhập nhận xét tổng quan..." style="width: 100%; padding: 12px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; margin-bottom: 5px; resize: vertical; min-height: 90px; font-family: inherit; font-size:14px; outline: none;"></textarea>
                    </div>
                </div>

                <!-- THANH NÚT LƯU CHUNG MỤC 2 & 3 -->
                <div style="background: #e8f5e9; padding: 15px 25px; border-radius: 10px; border: 1px solid #c3e6cb; display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; box-shadow: 0 4px 10px rgba(0,0,0,0.03);">
                    <div style="color: #155724; font-weight: bold; font-size: 14px; display: flex; align-items: center; gap: 8px;">
                        💡 <span>Đừng quên <b style="color:#28a745;">LƯU</b> thông tin Sinh hoạt & Đánh giá của tuần (Mục 2 & Mục 3).</span>
                    </div>
                    <button onclick="if(typeof ham_21_14_luu_thong_tin_tuan === 'function') ham_21_14_luu_thong_tin_tuan(this);" style="padding: 12px 30px; background: #28a745; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; box-shadow:0 4px 6px rgba(40,167,69,0.3); font-size: 14px; transition:0.2s;" onmouseover="this.style.background='#218838'" onmouseout="this.style.background='#28a745'">
                        💾 LƯU CHUNG MỤC 2 & MỤC 3
                    </button>
                </div>

                <!-- MỤC 4: TỪNG NỘI DUNG CÓ GIAO VIỆC -->
                <div style="background: #fff; padding: 25px; border-radius: 10px; border: 1px solid #dee2e6; box-shadow: 0 4px 10px rgba(0,0,0,0.03); width: 100%; box-sizing: border-box;">
                    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px dashed #cce5ff; padding-bottom: 10px; margin-bottom: 15px;">
                        <h4 style="margin: 0; color: #0056b3; font-size: 17px;">📋 4. Từng nội dung có Giao việc</h4>
                        <button onclick="window.ham_21_22_toggle_muc('body-muc-4', this);" style="background: #f8f9fa; border: 1px solid #ccc; padding: 5px 12px; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: bold;">➖ Thu hẹp</button>
                    </div>

                    <div id="body-muc-4">
                        <div id="gvcn-bang-noi-dung-cu" style="width: 100%; overflow-x: auto;"></div>

                        <div style="background: #f0f8ff; padding: 15px; border-radius: 8px; border: 1px solid #b8daff; margin-bottom: 15px;">
                            <h5 style="margin: 0 0 10px 0; color: #0056b3;">➕ Thêm nội dung / Giao việc mới:</h5>
                            <div style="display: flex; gap: 15px; margin-bottom: 15px;">
                                <div style="flex: 1;">
                                    <label style="font-weight: bold; font-size: 12px; color: #495057; display:block; margin-bottom:5px;">Ngày giờ nhập:</label>
                                    <input type="datetime-local" id="gvcn-nd-ngay" value="${currentDateTime}" style="width: 100%; min-width:200px; padding: 10px; border: 1px solid #ced4da; border-radius: 6px; font-size: 13px; outline: none; box-sizing: border-box;">
                                </div>
                            </div>
                            <label style="font-weight: bold; font-size: 13px; color: #0056b3; display:block; margin-bottom:5px;">Tên Nội dung / Công việc (Bắt buộc):</label>
                            <input type="text" id="gvcn-nd-ten" placeholder="VD: Phân công trực nhật..." style="width: 100%; padding: 10px; border: 2px solid #0056b3; border-radius: 6px; font-size: 14px; font-weight:bold; color:#0056b3; outline: none; margin-bottom:15px; background:#fff; box-sizing: border-box;">
                            
                            <label style="font-weight: bold; font-size: 12px; color: #495057; display:block; margin-bottom:5px;">Chi tiết nội dung:</label>
                            <textarea id="gvcn-nd-chitiet" placeholder="Mô tả chi tiết..." style="width: 100%; padding: 10px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; margin-bottom: 15px; resize: vertical; min-height: 60px; font-family: inherit; font-size:13px; outline: none;"></textarea>

                            <label style="font-weight: bold; font-size: 13px; color: #00838f; display:block; margin-bottom:8px;">📸 Ảnh chung của nội dung này:</label>
                            <div style="display: flex; gap: 15px; align-items: stretch; margin-bottom: 20px;">
                                <button type="button" onclick="document.getElementById('gvcn-input-anh-nd').click()" style="padding: 8px 12px; background: #e0f7fa; color: #00838f; border: 1px dashed #00acc1; border-radius: 4px; cursor: pointer; font-weight: bold; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px; flex-shrink: 0;"><span style="font-size: 18px;">📷</span><span style="font-size: 11px;">Tải ảnh chung</span></button>
                                <input type="file" id="gvcn-input-anh-nd" accept="image/*" multiple style="display: none;">
                                <div id="gvcn-vung-preview-anh-nd" style="flex: 1; border: 1px dashed #ccc; border-radius: 4px; display: flex; align-items: center; color: #adb5bd; font-size: 11px; font-style: italic; background: #fff; padding: 8px; gap: 8px; overflow-x: auto;"><span>(Ảnh đính kèm chung cho công việc...)</span></div>
                            </div>

                            <div style="background: #fff; padding: 15px; border-radius: 8px; border: 1px dashed #ccc; margin-bottom: 15px;">
                                <label style="font-weight: bold; font-size: 13px; color: #e83e8c; display:block; margin-bottom:10px;">👤 Danh sách học sinh nhận việc:</label>
                                <div id="gvcn-khu-vuc-nguoi-nhan" style="display: flex; flex-direction: column; gap: 10px;">
                                    <div class="dong-nguoi-nhan" style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap; background: #f8f9fa; padding: 6px; border-radius: 6px; border: 1px solid #eee;">
                                        <div style="display:flex; align-items:center; gap:8px; flex:1.2; min-width:140px; border:1px solid #ced4da; border-radius:4px; padding:4px 8px; background:#fff;">
                                            <img class="avatar-preview" src="" style="width:24px; height:24px; border-radius:50%; object-fit:cover; display:none; border:1px solid #eee;">
                                            <input class="gvcn-input-hs" placeholder="Chọn học sinh..." style="border:none; outline:none; flex:1; width:100%; font-size:12px; font-weight:bold; color:#1a73e8;">
                                        </div>
                                        <input class="gvcn-input-phan-viec" placeholder="Phần việc..." style="flex: 1.5; min-width: 110px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; font-weight:bold; outline: none;">
                                        
                                        <select class="gvcn-sel-trangthai" style="flex: 1; min-width: 90px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; background:#fff; cursor:pointer;">
                                            <option value="Chưa làm">❌ Chưa làm</option>
                                            <option value="Đang làm">⏳ Đang làm</option>
                                            <option value="Chưa xong">⚠️ Chưa xong</option>
                                            <option value="Đã xong">✅ Đã xong</option>
                                        </select>

                                        <select class="gvcn-sel-danhgia" style="flex: 1; min-width: 90px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; background:#fff; cursor:pointer;">
                                            <option value="">Chưa đánh giá</option><option value="Tốt">🌟 Tốt</option><option value="Khá">👍 Khá</option>
                                            <option value="Trung Bình">😐 TB</option><option value="Chưa đạt">❌ Chưa đạt</option>
                                        </select>
                                        <input class="gvcn-input-note" placeholder="Ghi chú..." style="flex: 1; min-width: 90px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none;">
                                        
                                        <div style="display:flex; align-items:center; gap:5px; background:#fff; padding:3px; border:1px solid #ced4da; border-radius:4px;">
                                            <button type="button" class="btn-anh-hs" onclick="this.nextElementSibling.click()" style="padding: 4px 8px; background: #e0f7fa; color: #00838f; border: 1px dashed #00acc1; border-radius: 4px; cursor: pointer; font-size:12px; font-weight:bold;" title="Đính kèm ảnh minh chứng riêng">📷 Ảnh</button>
                                            <input type="file" accept="image/*" class="input-anh-hs" style="display:none;" onchange="if(typeof window.ham_21_23_chon_anh_hs === 'function') window.ham_21_23_chon_anh_hs(this)">
                                            <img class="preview-anh-hs" src="" style="width:24px; height:24px; object-fit:cover; border-radius:4px; border:1px solid #00acc1; cursor:pointer; display:none;" onclick="this.previousElementSibling.click()" title="Bấm để đổi ảnh">
                                            <button type="button" class="btn-xoa-anh-hs" onclick="if(typeof window.ham_21_24_xoa_anh_hs === 'function') window.ham_21_24_xoa_anh_hs(this)" style="display:none; background:none; border:none; color:#dc3545; cursor:pointer; font-size:16px; padding:0 3px;" title="Xóa ảnh">✖</button>
                                        </div>

                                        <button onclick="this.parentElement.remove()" style="padding: 6px 10px; background: #f8d7da; color: #dc3545; border: none; border-radius: 4px; cursor: pointer;" title="Xóa dòng học sinh">✖</button>
                                    </div>
                                </div>
                                <button onclick="if(typeof ham_21_3_them_dong_nguoi_nhan === 'function') ham_21_3_them_dong_nguoi_nhan();" style="margin-top: 10px; padding: 6px 12px; background: #fff; border: 1px dashed #e83e8c; color: #e83e8c; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: bold;">
                                    ➕ Thêm học sinh nhận việc
                                </button>
                            </div>
                        </div>

                        <div style="text-align: right;">
                            <button onclick="if(typeof ham_21_13_luu_noi_dung_tuan === 'function') ham_21_13_luu_noi_dung_tuan(this);" style="padding: 10px 25px; background: #0056b3; color: white; border: none; border-radius: 6px; font-weight: bold; font-size:13px; cursor: pointer; box-shadow:0 2px 4px rgba(0,0,0,0.2);">💾 THÊM CÔNG VIỆC MỚI VÀO MỤC 4</button>
                        </div>
                    </div>
                </div>

                <!-- 🌟 GỌI HÀM VẼ RIÊNG CHO MỤC 5 -->
                <div id="vung-chua-muc-5"></div>

            </div>
        </div>
    `;

    if (typeof window.ham_20_7_tai_danh_sach_lop === 'function') window.ham_20_7_tai_danh_sach_lop();
    if (typeof window.ham_21_5_tai_danh_sach_the_datalist === 'function') window.ham_21_5_tai_danh_sach_the_datalist();
    if (typeof window.ham_21_8_kich_hoat_xu_ly_anh === 'function') window.ham_21_8_kich_hoat_xu_ly_anh();

    // Tự động kích hoạt vẽ Mục 5 độc lập
    if (typeof window.ham_21_38_ve_giao_dien_muc_5 === 'function') {
        window.ham_21_38_ve_giao_dien_muc_5();
    }
};














// =====================================================================
// HÀM 21.2: TẢI DANH SÁCH HỌC SINH + TỰ ĐỘNG KÍCH HOẠT DÒ TUẦN 
// =====================================================================
window.ham_21_2_tai_danh_sach_hs_chu_nhiem = async function () {
    const inputLop = document.getElementById('gvcn-input-lop');
    const datalistHS = document.getElementById('gvcn-dl-hs');
    const cacOChonHS = document.querySelectorAll('.gvcn-input-hs, .sk-hs');

    if (!inputLop || !datalistHS) return;

    let rawLop = inputLop.value.trim();
    if (!rawLop) return;

    let maLop = rawLop.match(/\(([^)]+)\)$/) ? rawLop.match(/\(([^)]+)\)$/)[1].trim() : rawLop;

    cacOChonHS.forEach(o => { o.value = ''; o.placeholder = "⏳ Đang tải..."; });

    try {
        const { data: hsData, error } = await _supabase.from('hoc_sinh')
            .select('uid, sdt, ten, anh_dai_dien, danh_sach_ma_lop')
            .contains('danh_sach_ma_lop', JSON.stringify([maLop]));

        if (error) throw error;

        datalistHS.innerHTML = '';
        window.DanhSachHocSinhLopHienTai = [];

        if (hsData && hsData.length > 0) {
            // Sắp xếp tên theo bảng chữ cái
            hsData.sort((a, b) => window.ham_ho_tro_so_sanh_ten_vn ? window.ham_ho_tro_so_sanh_ten_vn(a.ten || '', b.ten || '') : (a.ten || '').localeCompare(b.ten || '', 'vi'));

            hsData.forEach(hs => {
                let chuoiGhep = `${hs.ten || 'Chưa có tên'} - ${hs.sdt || 'Không SDT'}`;
                window.DanhSachHocSinhLopHienTai.push({
                    uid: hs.uid, tenHienThi: hs.ten, tenDangNhap: hs.sdt,
                    avatarUrl: hs.anh_dai_dien || `https://ui-avatars.com/api/?name=${encodeURIComponent(hs.ten)}&background=random&color=fff`,
                    chuoiGhep: chuoiGhep
                });
                let option = document.createElement('option'); option.value = chuoiGhep; option.dataset.uid = hs.uid;
                datalistHS.appendChild(option);
            });

            cacOChonHS.forEach(o => {
                o.placeholder = `👤 Chọn học sinh...`;
                o.removeAttribute('list'); o.setAttribute('autocomplete', 'off');
            });
        } else {
            cacOChonHS.forEach(o => { o.placeholder = `❌ Lỗi: Không có HS!`; });
        }

        // 🌟 KÍCH HOẠT DÒ DỮ LIỆU TUẦN SAU KHI ĐÃ TẢI XONG LỚP
        // Nếu ô Tuần đã được chọn từ trước, hàm này sẽ tự động nạp ảnh và đánh giá lên
        if (typeof window.ham_21_16_tai_du_lieu_tuan === 'function') {
            window.ham_21_16_tai_du_lieu_tuan();
        }

    } catch (err) {
        console.error(err);
    }
};

// // =====================================================================
// // HÀM 21.3: THÊM DÒNG HỌC SINH NHẬN VIỆC (ĐẢM BẢO CÓ Ô TRẠNG THÁI)
// // =====================================================================
// window.ham_21_3_them_dong_nguoi_nhan = function () {
//     let khuvuc = document.getElementById('gvcn-khu-vuc-nguoi-nhan');
//     if (!khuvuc) return;
//     let dongCu = khuvuc.querySelector('.dong-nguoi-nhan');
//     if (!dongCu) return;

//     let dongMoi = dongCu.cloneNode(true);

//     dongMoi.querySelector('.gvcn-input-hs').value = '';
//     dongMoi.querySelector('.gvcn-input-phan-viec').value = '';

//     let selTT = dongMoi.querySelector('.gvcn-sel-trangthai');
//     if (selTT) selTT.value = 'Đang làm';

//     let selDG = dongMoi.querySelector('.gvcn-sel-danhgia');
//     if (selDG) selDG.value = '';

//     dongMoi.querySelector('.gvcn-input-note').value = '';

//     let img = dongMoi.querySelector('.avatar-preview');
//     if (img) { img.style.display = 'none'; img.src = ''; }

//     khuvuc.appendChild(dongMoi);
// };


window.ham_21_3_them_dong_nguoi_nhan = function () {
    let khuvuc = document.getElementById('gvcn-khu-vuc-nguoi-nhan');
    if (!khuvuc) return;
    let dongCu = khuvuc.querySelector('.dong-nguoi-nhan');
    if (!dongCu) return;

    let dongMoi = dongCu.cloneNode(true);
    dongMoi.querySelector('.gvcn-input-hs').value = '';
    dongMoi.querySelector('.gvcn-input-phan-viec').value = '';

    let selTT = dongMoi.querySelector('.gvcn-sel-trangthai');
    if (selTT) selTT.value = 'Chưa làm';
    let selDG = dongMoi.querySelector('.gvcn-sel-danhgia');
    if (selDG) selDG.value = '';

    dongMoi.querySelector('.gvcn-input-note').value = '';

    let img = dongMoi.querySelector('.avatar-preview');
    if (img) { img.style.display = 'none'; img.src = ''; }

    // Xóa bộ nhớ ảnh minh chứng riêng ở dòng mới
    dongMoi.removeAttribute('data-anh-b64');
    dongMoi.removeAttribute('data-anh-type');
    dongMoi.querySelector('.preview-anh-hs').style.display = 'none';
    dongMoi.querySelector('.preview-anh-hs').src = '';
    dongMoi.querySelector('.btn-xoa-anh-hs').style.display = 'none';
    dongMoi.querySelector('.btn-anh-hs').style.display = 'block';

    khuvuc.appendChild(dongMoi);
};



// // =====================================================================
// // HÀM 21.4: THÊM DÒNG SỰ KIỆN (VI PHẠM TUẦN TRƯỚC)
// // =====================================================================
// window.ham_21_4_them_dong_su_kien = function () {
//     const khuVuc = document.getElementById('gvcn-khu-vuc-su-kien-nhanh');
//     const currentDate = new Date().toISOString().split('T')[0];
//     const div = document.createElement('div');
//     div.className = 'dong-nhap-su-kien';
//     div.style.cssText = 'display: flex; gap: 8px; align-items: center; flex-wrap: wrap; background: #fff; padding: 6px; border-radius: 6px; border: 1px dashed #ccc; animation: fadeIn 0.2s; margin-top:5px;';
//     div.innerHTML = `
//         <input type="date" class="sk-ngay" value="${currentDate}" style="width: 130px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; font-weight:bold;">
//         <select class="sk-buoi" style="width: 80px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; cursor:pointer;">
//             <option value="Sáng">Sáng</option><option value="Trưa">Trưa</option><option value="Chiều">Chiều</option><option value="Tối">Tối</option>
//         </select>
//         <div style="display:flex; align-items:center; gap:8px; flex:1.5; min-width:180px; border:2px solid #e83e8c; border-radius:4px; padding:4px 8px; background:#fdf5f8;">
//             <img class="avatar-preview" src="" style="width:24px; height:24px; border-radius:50%; object-fit:cover; display:none; border:1px solid #eee;">
//             <input class="sk-hs" placeholder="👤 Chọn học sinh..." style="border:none; outline:none; flex:1; width:100%; font-size:13px; font-weight:bold; background:transparent; color:#e83e8c;">
//         </div>
//         <input class="sk-loi" list="gvcn-dl-loi" placeholder="🚨 Gõ tìm lỗi/sự kiện..." style="flex: 1.5; min-width: 140px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 13px; font-weight:bold; outline: none;">
//         <button onclick="this.parentElement.remove()" style="padding: 8px 12px; background: #fff; color: #dc3545; border: 1px solid #dc3545; border-radius: 4px; cursor: pointer;" title="Xóa">✖</button>
//     `;
//     khuVuc.appendChild(div);
// };



// // =====================================================================
// // HÀM 21.4: THÊM DÒNG SỰ KIỆN MỚI
// // =====================================================================
// window.ham_21_4_them_dong_su_kien = function () {
//     const khuVuc = document.getElementById('gvcn-khu-vuc-su-kien-nhanh');
//     const currentDate = new Date().toISOString().split('T')[0];
//     const div = document.createElement('div');
//     div.className = 'dong-nhap-su-kien';
//     div.style.cssText = 'background: #fff; padding: 12px; border-radius: 8px; border: 1px solid #ccc; display: flex; flex-direction: column; gap: 10px; margin-top: 10px; animation: fadeIn 0.2s;';

//     div.innerHTML = `
//         <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
//             <input type="date" class="sk-ngay" value="${currentDate}" style="width: 130px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; font-weight:bold;">
//             <select class="sk-buoi" style="width: 85px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; cursor:pointer;">
//                 <option value="Sáng">Sáng</option><option value="Trưa">Trưa</option><option value="Chiều">Chiều</option><option value="Tối">Tối</option>
//             </select>
//             <div class="sk-vung-hoc-sinh" style="display: flex; flex-direction: column; gap: 6px; flex: 2; min-width: 250px;">
//                 <div style="display:flex; align-items:center; gap:6px;">
//                     <div style="display:flex; align-items:center; gap:6px; flex:1; border:2px solid #e83e8c; border-radius:4px; padding:4px 8px; background:#fdf5f8;">
//                         <img class="avatar-preview" src="" style="width:22px; height:22px; border-radius:50%; object-fit:cover; display:none; border:1px solid #eee;">
//                         <input class="sk-hs" placeholder="👤 Chọn học sinh..." style="border:none; outline:none; flex:1; width:100%; font-size:12px; font-weight:bold; background:transparent; color:#e83e8c;">
//                     </div>
//                     <button type="button" onclick="if(typeof ham_21_31_them_hs_cho_su_kien === 'function') ham_21_31_them_hs_cho_su_kien(this)" style="padding: 6px 10px; background: #fdf5f8; color: #e83e8c; border: 1px dashed #e83e8c; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: bold;" title="Chọn thêm học sinh chung sự kiện">➕ HS</button>
//                 </div>
//             </div>
//             <button onclick="this.closest('.dong-nhap-su-kien').remove()" style="padding: 8px 12px; background: #f8d7da; color: #dc3545; border: none; border-radius: 4px; cursor: pointer;" title="Xóa dòng">✖</button>
//         </div>
//         <div>
//             <input class="sk-ghichu" placeholder="📝 Ghi chú thêm cho sự kiện..." style="width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; box-sizing: border-box;">
//         </div>
//         <div>
//             <label style="font-size: 11px; font-weight: bold; color: #6c757d; display: block; margin-bottom: 4px;">🏷️ Chọn loại sự kiện (Thẻ):</label>
//             <div class="sk-vung-chon-the" style="display: flex; gap: 6px; flex-wrap: wrap; align-items: center;">
//                 <button type="button" onclick="if(typeof ham_21_32_mo_modal_them_the === 'function') ham_21_32_mo_modal_them_the()" style="padding: 4px 8px; background: #fff; border: 1px dashed #e83e8c; color: #e83e8c; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: bold;">➕ Thêm thẻ mới</button>
//             </div>
//             <input type="hidden" class="sk-loi-hidden" value="">
//         </div>
//         <div style="display: flex; align-items: center; gap: 10px; border-top: 1px dashed #eee; padding-top: 6px;">
//             <button type="button" class="btn-anh-sk-dong" onclick="this.nextElementSibling.click()" style="padding: 4px 8px; background: #e0f7fa; color: #00838f; border: 1px dashed #00acc1; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: bold;">📷 Ảnh minh chứng</button>
//             <input type="file" accept="image/*" class="input-anh-sk-dong" style="display:none;" onchange="if(typeof window.ham_21_33_chon_anh_sk_dong === 'function') window.ham_21_33_chon_anh_sk_dong(this)">
//             <div class="vung-preview-anh-sk-dong" style="display: flex; gap: 6px; align-items: center; overflow-x: auto;"></div>
//         </div>
//     `;
//     khuVuc.appendChild(div);
//     if (typeof window.ham_21_34_render_tat_ca_cac_the_su_kien === 'function') {
//         window.ham_21_34_render_tat_ca_cac_the_su_kien();
//     }
// };


// // =====================================================================
// // HÀM 21.4: THÊM DÒNG SỰ KIỆN MỚI (CẬP NHẬT GIAO DIỆN CHUẨN)
// // =====================================================================
// window.ham_21_4_them_dong_su_kien = function () {
//     const khuVuc = document.getElementById('gvcn-khu-vuc-su-kien-nhanh');
//     const currentDate = new Date().toISOString().split('T')[0];
//     const div = document.createElement('div');
//     div.className = 'dong-nhap-su-kien';
//     div.style.cssText = 'background: #fff; padding: 12px; border-radius: 8px; border: 1px solid #ccc; display: flex; flex-direction: column; gap: 10px; margin-top: 10px; animation: fadeIn 0.2s;';

//     div.innerHTML = `
//         <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
//             <input type="date" class="sk-ngay" value="${currentDate}" style="width: 130px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; font-weight:bold;">
//             <select class="sk-buoi" style="width: 85px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; cursor:pointer;">
//                 <option value="Sáng">Sáng</option><option value="Trưa">Trưa</option><option value="Chiều">Chiều</option><option value="Tối">Tối</option>
//             </select>
//             <div class="sk-vung-hoc-sinh" style="display: flex; flex-direction: column; gap: 6px; flex: 1.2; min-width: 200px;">
//                 <div style="display:flex; align-items:center; gap:6px;">
//                     <div style="display:flex; align-items:center; gap:6px; flex:1; border:2px solid #e83e8c; border-radius:4px; padding:4px 8px; background:#fdf5f8;">
//                         <img class="avatar-preview" src="" style="width:22px; height:22px; border-radius:50%; object-fit:cover; display:none; border:1px solid #eee;">
//                         <input class="sk-hs" placeholder="👤 Chọn học sinh..." style="border:none; outline:none; flex:1; width:100%; font-size:12px; font-weight:bold; background:transparent; color:#e83e8c;">
//                     </div>
//                     <button type="button" onclick="if(typeof ham_21_31_them_hs_cho_su_kien === 'function') ham_21_31_them_hs_cho_su_kien(this)" style="padding: 6px 10px; background: #fdf5f8; color: #e83e8c; border: 1px dashed #e83e8c; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: bold; white-space:nowrap;" title="Chọn thêm học sinh chung sự kiện">➕ Thêm học sinh cùng sự kiện</button>
//                 </div>
//             </div>
//             <button onclick="this.closest('.dong-nhap-su-kien').remove()" style="padding: 8px 12px; background: #f8d7da; color: #dc3545; border: none; border-radius: 4px; cursor: pointer;" title="Xóa dòng">✖</button>
//         </div>
//         <div>
//             <input class="sk-ghichu" placeholder="📝 Ghi chú thêm cho sự kiện..." style="width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; box-sizing: border-box;">
//         </div>
//         <div>
//             <label style="font-size: 11px; font-weight: bold; color: #6c757d; display: block; margin-bottom: 4px;">🏷️ Phân loại sự kiện (Theo nội quy thi đua):</label>
//             <div class="sk-vung-chon-the" style="display: flex; gap: 6px; flex-wrap: wrap; align-items: center;">
//                 <button type="button" onclick="if(typeof ham_21_32_mo_modal_them_the === 'function') ham_21_32_mo_modal_them_the()" style="padding: 4px 8px; background: #fff; border: 1px dashed #e83e8c; color: #e83e8c; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: bold;">➕ Thêm thẻ mới</button>
//             </div>
//             <input type="hidden" class="sk-loi-hidden" value="">
//         </div>
//         <div style="display: flex; align-items: center; gap: 10px; border-top: 1px dashed #eee; padding-top: 6px;">
//             <button type="button" class="btn-anh-sk-dong" onclick="this.nextElementSibling.click()" style="padding: 4px 8px; background: #e0f7fa; color: #00838f; border: 1px dashed #00acc1; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: bold;">📷 Ảnh minh chứng dòng này</button>
//             <input type="file" accept="image/*" class="input-anh-sk-dong" style="display:none;" onchange="if(typeof window.ham_21_33_chon_anh_sk_dong === 'function') window.ham_21_33_chon_anh_sk_dong(this)">
//             <div class="vung-preview-anh-sk-dong" style="display: flex; gap: 6px; align-items: center; overflow-x: auto;"></div>
//         </div>
//     `;
//     khuVuc.appendChild(div);
//     if (typeof window.ham_21_34_render_tat_ca_cac_the_su_kien === 'function') {
//         window.ham_21_34_render_tat_ca_cac_the_su_kien();
//     }
// };

// // =====================================================================
// // HÀM 21.4: THÊM DÒNG SỰ KIỆN MỚI (CÓ Ô ĐIỂM TRỪ TỰ ĐỘNG CẬP NHẬT)
// // =====================================================================
// window.ham_21_4_them_dong_su_kien = function () {
//     const khuVuc = document.getElementById('gvcn-khu-vuc-su-kien-nhanh');
//     const currentDate = new Date().toISOString().split('T')[0];
//     const div = document.createElement('div');
//     div.className = 'dong-nhap-su-kien';
//     div.style.cssText = 'background: #fff; padding: 12px; border-radius: 8px; border: 1px solid #ccc; display: flex; flex-direction: column; gap: 10px; margin-top: 10px; animation: fadeIn 0.2s;';

//     div.innerHTML = `
//         <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
//             <input type="date" class="sk-ngay" value="${currentDate}" style="width: 130px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; font-weight:bold;">
//             <select class="sk-buoi" style="width: 85px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; cursor:pointer;">
//                 <option value="Sáng">Sáng</option><option value="Trưa">Trưa</option><option value="Chiều">Chiều</option><option value="Tối">Tối</option>
//             </select>
//             <div class="sk-vung-hoc-sinh" style="display: flex; flex-direction: column; gap: 6px; flex: 1.2; min-width: 200px;">
//                 <div style="display:flex; align-items:center; gap:6px;">
//                     <div style="display:flex; align-items:center; gap:6px; flex:1; border:2px solid #e83e8c; border-radius:4px; padding:4px 8px; background:#fdf5f8;">
//                         <img class="avatar-preview" src="" style="width:22px; height:22px; border-radius:50%; object-fit:cover; display:none; border:1px solid #eee;">
//                         <input class="sk-hs" placeholder="👤 Chọn học sinh..." style="border:none; outline:none; flex:1; width:100%; font-size:12px; font-weight:bold; background:transparent; color:#e83e8c;">
//                     </div>
//                     <button type="button" onclick="if(typeof ham_21_31_them_hs_cho_su_kien === 'function') ham_21_31_them_hs_cho_su_kien(this)" style="padding: 6px 10px; background: #fdf5f8; color: #e83e8c; border: 1px dashed #e83e8c; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: bold; white-space:nowrap;" title="Chọn thêm học sinh chung sự kiện">➕ Thêm học sinh cùng sự kiện</button>
//                 </div>
//             </div>
//             <button onclick="this.closest('.dong-nhap-su-kien').remove()" style="padding: 8px 12px; background: #f8d7da; color: #dc3545; border: none; border-radius: 4px; cursor: pointer;" title="Xóa dòng">✖</button>
//         </div>

//         <div style="display: flex; gap: 10px; align-items: center;">
//             <input class="sk-ghichu" placeholder="📝 Ghi chú thêm..." style="flex: 3; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; box-sizing: border-box;">
//             <div style="flex: 1; display: flex; align-items: center; gap: 5px; background: #fff3cd; padding: 4px 8px; border: 1px solid #ffeeba; border-radius: 4px;">
//                 <span style="font-size: 11px; font-weight: bold; color: #856404; white-space: nowrap;">Điểm trừ:</span>
//                 <input type="number" step="0.5" class="sk-diem-tru" value="0" style="width: 100%; padding: 4px; border: 1px solid #ccc; border-radius: 4px; font-size: 13px; font-weight: bold; color: #dc3545; text-align: center; outline: none;" title="Có thể chỉnh sửa điểm trừ bằng tay">
//             </div>
//         </div>

//         <div>
//             <label style="font-size: 11px; font-weight: bold; color: #6c757d; display: block; margin-bottom: 4px;">🏷️ Chọn lỗi vi phạm theo nội quy (Bấm để chọn & tự gán điểm):</label>
//             <div class="sk-vung-chon-the" style="display: flex; gap: 6px; flex-wrap: wrap; align-items: center;">
//                 <button type="button" onclick="if(typeof ham_21_32_mo_modal_them_the === 'function') ham_21_32_mo_modal_them_the()" style="padding: 4px 8px; background: #fff; border: 1px dashed #e83e8c; color: #e83e8c; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: bold;">➕ Thêm thẻ mới</button>
//             </div>
//             <input type="hidden" class="sk-loi-hidden" value="">
//         </div>

//         <div style="display: flex; align-items: center; gap: 10px; border-top: 1px dashed #eee; padding-top: 6px;">
//             <button type="button" class="btn-anh-sk-dong" onclick="this.nextElementSibling.click()" style="padding: 4px 8px; background: #e0f7fa; color: #00838f; border: 1px dashed #00acc1; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: bold;">📷 Ảnh minh chứng dòng này</button>
//             <input type="file" accept="image/*" class="input-anh-sk-dong" style="display:none;" onchange="if(typeof window.ham_21_33_chon_anh_sk_dong === 'function') window.ham_21_33_chon_anh_sk_dong(this)">
//             <div class="vung-preview-anh-sk-dong" style="display: flex; gap: 6px; align-items: center; overflow-x: auto;"></div>
//         </div>
//     `;
//     khuVuc.appendChild(div);
//     if (typeof window.ham_21_34_render_tat_ca_cac_the_su_kien === 'function') {
//         window.ham_21_34_render_tat_ca_cac_the_su_kien();
//     }
// };



// // =====================================================================
// // HÀM 21.4: THÊM DÒNG SỰ KIỆN MỚI (MỖI HỌC SINH MỘT DÒNG RIÊNG BIỆT ĐẦY ĐỦ THÔNG TIN)
// // =====================================================================
// window.ham_21_4_them_dong_su_kien = function () {
//     const khuVuc = document.getElementById('gvcn-khu-vuc-su-kien-nhanh');
//     const currentDate = new Date().toISOString().split('T')[0];
//     const thuHienTai = window.ham_21_39_lay_thu_trong_tuần ? window.ham_21_39_lay_thu_trong_tuần(currentDate) : 'Thứ Hai';

//     const div = document.createElement('div');
//     div.className = 'dong-nhap-su-kien';
//     div.style.cssText = 'background: #fff; padding: 15px; border-radius: 8px; border: 1px solid #ccc; display: flex; flex-direction: column; gap: 12px; margin-top: 10px; animation: fadeIn 0.2s; box-shadow: 0 2px 5px rgba(0,0,0,0.03);';

//     div.innerHTML = `
//         <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px dashed #eee; padding-bottom: 8px;">
//             <b style="color: #e83e8c; font-size: 13px;">📌 Nhập sự kiện / vi phạm:</b>
//             <button onclick="this.closest('.dong-nhap-su-kien').remove()" style="padding: 4px 10px; background: #f8d7da; color: #dc3545; border: none; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: bold;" title="Xóa toàn bộ khối sự kiện này">✖ Xóa khối</button>
//         </div>

//         <!-- VÙNG CHỨA DANH SÁCH HỌC SINH (MỖI EM MỘT DÒNG RIÊNG ĐỘC LẬP) -->
//         <div class="sk-vung-danh-sach-hs" style="display: flex; flex-direction: column; gap: 8px;">
//             <div class="dong-chi-tiet-hs" style="background: #fdf5f8; padding: 10px; border-radius: 6px; border: 1px solid #f8bbd0; display: flex; flex-direction: column; gap: 8px;">
//                 <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
//                     <span style="font-size:11px; font-weight:bold; color:#495057;">Ngày:</span>
//                     <input type="date" class="sk-ngay" value="${currentDate}" onchange="let thu = window.ham_21_39_lay_thu_trong_tuần ? window.ham_21_39_lay_thu_trong_tuần(this.value) : ''; this.closest('.dong-chi-tiet-hs').querySelector('.sk-thu').value = thu;" style="width: 125px; padding: 6px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; font-weight:bold;">
                    
//                     <input type="text" class="sk-thu" value="${thuHienTai}" readonly style="width: 70px; padding: 6px; border: 1px solid #e9ecef; border-radius: 4px; font-size: 12px; font-weight: bold; background: #e9ecef; color: #495057; text-align: center;">

//                     <select class="sk-buoi" style="width: 80px; padding: 6px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; cursor:pointer;">
//                         <option value="Sáng">Sáng</option><option value="Trưa">Trưa</option><option value="Chiều">Chiều</option><option value="Tối">Tối</option>
//                     </select>

//                     <div style="display:flex; align-items:center; gap:6px; flex:1.5; min-width:180px; border:2px solid #e83e8c; border-radius:4px; padding:3px 6px; background:#fff;">
//                         <img class="avatar-preview" src="" style="width:20px; height:20px; border-radius:50%; object-fit:cover; display:none; border:1px solid #eee;">
//                         <input class="sk-hs" placeholder="👤 Chọn học sinh..." style="border:none; outline:none; flex:1; width:100%; font-size:12px; font-weight:bold; background:transparent; color:#e83e8c;">
//                     </div>

//                     <div style="display: flex; align-items: center; gap: 4px; background: #fff3cd; padding: 3px 6px; border: 1px solid #ffeeba; border-radius: 4px;">
//                         <span style="font-size: 11px; font-weight: bold; color: #856404;">Trừ:</span>
//                         <input type="number" step="0.5" class="sk-diem-tru" value="0" style="width: 50px; padding: 3px; border: 1px solid #ccc; border-radius: 4px; font-size: 12px; font-weight: bold; color: #dc3545; text-align: center; outline: none;" title="Điểm trừ riêng cho học sinh này">
//                     </div>

//                     <button type="button" onclick="this.closest('.dong-chi-tiet-hs').remove()" style="padding: 6px 8px; background: #f8d7da; color: #dc3545; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;" title="Xóa học sinh này">✖</button>
//                 </div>
//             </div>
//         </div>

//         <button type="button" onclick="if(typeof ham_21_31_them_hs_cho_su_kien === 'function') ham_21_31_them_hs_cho_su_kien(this)" style="align-self: flex-start; padding: 5px 12px; background: #fff; color: #e83e8c; border: 1px dashed #e83e8c; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: bold;">
//             ➕ Thêm học sinh cùng sự kiện
//         </button>

//         <!-- GHI CHÚ VÀ THẺ LỖI CHUNG CHO CẢ KHỐI SỰ KIỆN -->
//         <div>
//             <input class="sk-ghichu" placeholder="📝 Ghi chú thêm cho sự kiện này..." style="width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; box-sizing: border-box;">
//         </div>

//         <div>
//             <label style="font-size: 11px; font-weight: bold; color: #6c757d; display: block; margin-bottom: 4px;">🏷️ Phân loại sự kiện (Theo nội quy thi đua):</label>
//             <div class="sk-vung-chon-the" style="display: flex; gap: 6px; flex-wrap: wrap; align-items: center;">
//                 <button type="button" onclick="if(typeof ham_21_32_mo_modal_them_the === 'function') ham_21_32_mo_modal_them_the()" style="padding: 4px 8px; background: #fff; border: 1px dashed #e83e8c; color: #e83e8c; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: bold;">➕ Thêm tag mới</button>
//             </div>
//             <input type="hidden" class="sk-loi-hidden" value="">
//         </div>

//         <div style="display: flex; align-items: center; gap: 10px; border-top: 1px dashed #eee; padding-top: 6px;">
//             <button type="button" class="btn-anh-sk-dong" onclick="this.nextElementSibling.click()" style="padding: 4px 8px; background: #e0f7fa; color: #00838f; border: 1px dashed #00acc1; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: bold;">📷 Ảnh minh chứng</button>
//             <input type="file" accept="image/*" class="input-anh-sk-dong" style="display:none;" onchange="if(typeof window.ham_21_33_chon_anh_sk_dong === 'function') window.ham_21_33_chon_anh_sk_dong(this)">
//             <div class="vung-preview-anh-sk-dong" style="display: flex; gap: 6px; align-items: center; overflow-x: auto;"></div>
//         </div>
//     `;
//     khuVuc.appendChild(div);
//     if (typeof window.ham_21_34_render_tat_ca_cac_the_su_kien === 'function') {
//         window.ham_21_34_render_tat_ca_cac_the_su_kien();
//     }
//     if (typeof window.ham_21_8_kich_hoat_xu_ly_anh === 'function') {
//         window.ham_21_8_kich_hoat_xu_ly_anh();
//     }
// };


// // =====================================================================
// // HÀM 21.4: THÊM KHỐI SỰ KIỆN (DẠNG BẢNG NGANG ĐẦY ĐỦ CỘT CHO TỪNG HỌC SINH)
// // =====================================================================
// window.ham_21_4_them_dong_su_kien = function () {
//     const khuVuc = document.getElementById('gvcn-khu-vuc-su-kien-nhanh');
//     const currentDate = new Date().toISOString().split('T')[0];
//     const thuHienTai = window.ham_21_39_lay_thu_trong_tuần ? window.ham_21_39_lay_thu_trong_tuần(currentDate) : 'Thứ Hai';

//     const div = document.createElement('div');
//     div.className = 'dong-nhap-su-kien';
//     div.style.cssText = 'background: #fff; padding: 15px; border-radius: 8px; border: 1px solid #ccc; display: flex; flex-direction: column; gap: 12px; margin-top: 10px; animation: fadeIn 0.2s; box-shadow: 0 2px 5px rgba(0,0,0,0.03);';

//     div.innerHTML = `
//         <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px dashed #eee; padding-bottom: 8px;">
//             <b style="color: #e83e8c; font-size: 13px;">📌 Khối Sự kiện / Vi phạm:</b>
//             <button onclick="this.closest('.dong-nhap-su-kien').remove()" style="padding: 4px 10px; background: #f8d7da; color: #dc3545; border: none; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: bold;" title="Xóa toàn bộ khối này">✖ Xóa khối</button>
//         </div>

//         <!-- BẢNG CÁC DÒNG HỌC SINH (Ngày | Thứ | Buổi | Học sinh | Điểm | Ghi chú) -->
//         <div class="sk-vung-danh-sach-hs" style="display: flex; flex-direction: column; gap: 8px;">
//             <div class="dong-chi-tiet-hs" style="background: #fdf5f8; padding: 10px; border-radius: 6px; border: 1px solid #f8bbd0; display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
                
//                 <div style="display: flex; flex-direction: column;">
//                     <span style="font-size: 10px; color: #666; font-weight: bold;">Ngày:</span>
//                     <input type="date" class="sk-ngay" value="${currentDate}" onchange="let thu = window.ham_21_39_lay_thu_trong_tuần ? window.ham_21_39_lay_thu_trong_tuần(this.value) : ''; this.closest('.dong-chi-tiet-hs').querySelector('.sk-thu').value = thu;" style="width: 120px; padding: 6px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; font-weight:bold;">
//                 </div>

//                 <div style="display: flex; flex-direction: column;">
//                     <span style="font-size: 10px; color: #666; font-weight: bold;">Thứ:</span>
//                     <input type="text" class="sk-thu" value="${thuHienTai}" readonly style="width: 70px; padding: 6px; border: 1px solid #e9ecef; border-radius: 4px; font-size: 12px; font-weight: bold; background: #e9ecef; color: #495057; text-align: center;">
//                 </div>

//                 <div style="display: flex; flex-direction: column;">
//                     <span style="font-size: 10px; color: #666; font-weight: bold;">Buổi:</span>
//                     <select class="sk-buoi" style="width: 75px; padding: 6px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; cursor:pointer;">
//                         <option value="Sáng">Sáng</option><option value="Trưa">Trưa</option><option value="Chiều">Chiều</option><option value="Tối">Tối</option>
//                     </select>
//                 </div>

//                 <div style="display: flex; flex-direction: column; flex: 1.5; min-width: 180px;">
//                     <span style="font-size: 10px; color: #666; font-weight: bold;">Học sinh:</span>
//                     <div style="display:flex; align-items:center; gap:6px; border:2px solid #e83e8c; border-radius:4px; padding:3px 6px; background:#fff;">
//                         <img class="avatar-preview" src="" style="width:20px; height:20px; border-radius:50%; object-fit:cover; display:none; border:1px solid #eee;">
//                         <input class="sk-hs" placeholder="👤 Chọn học sinh..." style="border:none; outline:none; flex:1; width:100%; font-size:12px; font-weight:bold; background:transparent; color:#e83e8c;">
//                     </div>
//                 </div>

//                 <div style="display: flex; flex-direction: column;">
//                     <span style="font-size: 10px; color: #666; font-weight: bold;">Điểm trừ:</span>
//                     <input type="number" step="0.5" class="sk-diem-tru" value="0" style="width: 60px; padding: 6px; border: 1px solid #ffeeba; background: #fff3cd; border-radius: 4px; font-size: 12px; font-weight: bold; color: #dc3545; text-align: center; outline: none;">
//                 </div>

//                 <div style="display: flex; flex-direction: column; flex: 1.5; min-width: 150px;">
//                     <span style="font-size: 10px; color: #666; font-weight: bold;">Ghi chú riêng:</span>
//                     <input class="sk-ghichu" placeholder="Ghi chú..." style="width: 100%; padding: 6px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; box-sizing: border-box;">
//                 </div>

//                 <div style="display: flex; align-items: flex-end; height: 100%; padding-top: 15px;">
//                     <button type="button" onclick="this.closest('.dong-chi-tiet-hs').remove()" style="padding: 6px 8px; background: #f8d7da; color: #dc3545; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;" title="Xóa học sinh này">✖</button>
//                 </div>

//             </div>
//         </div>

//         <button type="button" onclick="if(typeof ham_21_31_them_hs_cho_su_kien === 'function') ham_21_31_them_hs_cho_su_kien(this)" style="align-self: flex-start; padding: 5px 12px; background: #fff; color: #e83e8c; border: 1px dashed #e83e8c; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: bold;">
//             ➕ Thêm học sinh cùng sự kiện
//         </button>

//         <!-- PHÂN LOẠI SỰ KIỆN (THẺ LỖI) CHUNG CHO KHỐI -->
//         <div>
//             <label style="font-size: 11px; font-weight: bold; color: #6c757d; display: block; margin-bottom: 4px;">🏷️ Chọn Sự kiện / Lỗi vi phạm (Bấm để gán vào khối):</label>
//             <div class="sk-vung-chon-the" style="display: flex; gap: 6px; flex-wrap: wrap; align-items: center;"></div>
//             <input type="hidden" class="sk-loi-hidden" value="">
//         </div>

//         <!-- ẢNH MINH CHỨNG RIÊNG CHO KHỐI -->
//         <div style="display: flex; align-items: center; gap: 10px; border-top: 1px dashed #eee; padding-top: 6px;">
//             <button type="button" class="btn-anh-sk-dong" onclick="this.nextElementSibling.click()" style="padding: 4px 8px; background: #e0f7fa; color: #00838f; border: 1px dashed #00acc1; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: bold;">📷 Ảnh minh chứng</button>
//             <input type="file" accept="image/*" class="input-anh-sk-dong" style="display:none;" onchange="if(typeof window.ham_21_33_chon_anh_sk_dong === 'function') window.ham_21_33_chon_anh_sk_dong(this)">
//             <div class="vung-preview-anh-sk-dong" style="display: flex; gap: 6px; align-items: center; overflow-x: auto;"></div>
//         </div>
//     `;
//     khuVuc.appendChild(div);
//     if (typeof window.ham_21_34_render_tat_ca_cac_the_su_kien === 'function') {
//         window.ham_21_34_render_tat_ca_cac_the_su_kien();
//     }
//     if (typeof window.ham_21_8_kich_hoat_xu_ly_anh === 'function') {
//         window.ham_21_8_kich_hoat_xu_ly_anh();
//     }
// };


// =====================================================================
// HÀM 21.4: TẠO MỘT KHỐI SỰ KIỆN DUY NHẤT (CHỈ CÓ 1 THẺ LỖI VÀ ẢNH CHUNG CHO KHỐI)
// =====================================================================
window.ham_21_4_them_dong_su_kien = function () {
    const khuVuc = document.getElementById('gvcn-khu-vuc-su-kien-nhanh');
    if (!khuVuc) return;

    const currentDate = new Date().toISOString().split('T')[0];
    const thuHienTai = window.ham_21_39_lay_thu_trong_tuần ? window.ham_21_39_lay_thu_trong_tuần(currentDate) : 'Thứ Hai';

    const div = document.createElement('div');
    div.className = 'dong-nhap-su-kien';
    div.style.cssText = 'background: #fff; padding: 15px; border-radius: 8px; border: 1px solid #ccc; display: flex; flex-direction: column; gap: 12px; margin-top: 10px; animation: fadeIn 0.2s; box-shadow: 0 2px 5px rgba(0,0,0,0.03);';

    div.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px dashed #eee; padding-bottom: 8px;">
            <b style="color: #e83e8c; font-size: 13px;">📌 Khối Sự kiện / Vi phạm chung:</b>
            <button onclick="this.closest('.dong-nhap-su-kien').remove()" style="padding: 4px 10px; background: #f8d7da; color: #dc3545; border: none; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: bold;" title="Xóa khối này">✖ Xóa khối</button>
        </div>

        <!-- VÙNG CHỨA CÁC DÒNG HỌC SINH -->
        <div class="sk-vung-danh-sach-hs" style="display: flex; flex-direction: column; gap: 8px;">
            
            <!-- Dòng học sinh đầu tiên -->
            <div class="dong-chi-tiet-hs" style="background: #fdf5f8; padding: 10px; border-radius: 6px; border: 1px solid #f8bbd0; display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
                <div style="display: flex; flex-direction: column;">
                    <span style="font-size: 10px; color: #666; font-weight: bold;">Ngày:</span>
                    <input type="date" class="sk-ngay" value="${currentDate}" onchange="let thu = window.ham_21_39_lay_thu_trong_tuần ? window.ham_21_39_lay_thu_trong_tuần(this.value) : ''; this.closest('.dong-chi-tiet-hs').querySelector('.sk-thu').value = thu;" style="width: 120px; padding: 6px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; font-weight:bold;">
                </div>

                <div style="display: flex; flex-direction: column;">
                    <span style="font-size: 10px; color: #666; font-weight: bold;">Thứ:</span>
                    <input type="text" class="sk-thu" value="${thuHienTai}" readonly style="width: 70px; padding: 6px; border: 1px solid #e9ecef; border-radius: 4px; font-size: 12px; font-weight: bold; background: #e9ecef; color: #495057; text-align: center;">
                </div>

                <div style="display: flex; flex-direction: column;">
                    <span style="font-size: 10px; color: #666; font-weight: bold;">Buổi:</span>
                    <select class="sk-buoi" style="width: 75px; padding: 6px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; cursor:pointer;">
                        <option value="Sáng">Sáng</option><option value="Trưa">Trưa</option><option value="Chiều">Chiều</option><option value="Tối">Tối</option>
                    </select>
                </div>

                <div style="display: flex; flex-direction: column; flex: 1.5; min-width: 180px;">
                    <span style="font-size: 10px; color: #666; font-weight: bold;">Học sinh:</span>
                    <div style="display:flex; align-items:center; gap:6px; border:2px solid #e83e8c; border-radius:4px; padding:3px 6px; background:#fff;">
                        <img class="avatar-preview" src="" style="width:20px; height:20px; border-radius:50%; object-fit:cover; display:none; border:1px solid #eee;">
                        <input class="sk-hs" placeholder="👤 Chọn học sinh..." style="border:none; outline:none; flex:1; width:100%; font-size:12px; font-weight:bold; background:transparent; color:#e83e8c;">
                    </div>
                </div>

                <div style="display: flex; flex-direction: column;">
                    <span style="font-size: 10px; color: #666; font-weight: bold;">Điểm trừ:</span>
                    <input type="number" step="0.5" class="sk-diem-tru" value="0" style="width: 60px; padding: 6px; border: 1px solid #ffeeba; background: #fff3cd; border-radius: 4px; font-size: 12px; font-weight: bold; color: #dc3545; text-align: center; outline: none;">
                </div>

                <div style="display: flex; flex-direction: column; flex: 1.5; min-width: 150px;">
                    <span style="font-size: 10px; color: #666; font-weight: bold;">Ghi chú riêng:</span>
                    <input class="sk-ghichu" placeholder="Ghi chú..." style="width: 100%; padding: 6px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; box-sizing: border-box;">
                </div>

                <div style="display: flex; align-items: flex-end; height: 100%; padding-top: 15px;">
                    <button type="button" onclick="this.closest('.dong-chi-tiet-hs').remove()" style="padding: 6px 8px; background: #f8d7da; color: #dc3545; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;" title="Xóa dòng này">✖</button>
                </div>
            </div>

        </div>

        <!-- NÚT THÊM HỌC SINH CÙNG SỰ KIỆN (SINH RA DÒNG NGANG MỚI NGAY BÊN DƯỚI) -->
        <button type="button" onclick="if(typeof ham_21_31_them_hs_cho_su_kien === 'function') ham_21_31_them_hs_cho_su_kien(this)" style="align-self: flex-start; padding: 5px 12px; background: #fff; color: #e83e8c; border: 1px dashed #e83e8c; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: bold;">
            ➕ Thêm học sinh cùng sự kiện
        </button>

        <!-- PHÂN LOẠI SỰ KIỆN (THẺ LỖI) CHUNG CHO CẢ KHỐI -->
        <div>
            <label style="font-size: 11px; font-weight: bold; color: #6c757d; display: block; margin-bottom: 4px;">🏷️ Chọn Sự kiện / Lỗi vi phạm (Bấm để gán vào khối):</label>
            <div class="sk-vung-chon-the" style="display: flex; gap: 6px; flex-wrap: wrap; align-items: center;"></div>
            <input type="hidden" class="sk-loi-hidden" value="">
        </div>

        <!-- ẢNH MINH CHỨNG RIÊNG CHO KHỐI -->
        <div style="display: flex; align-items: center; gap: 10px; border-top: 1px dashed #eee; padding-top: 6px;">
            <button type="button" class="btn-anh-sk-dong" onclick="this.nextElementSibling.click()" style="padding: 4px 8px; background: #e0f7fa; color: #00838f; border: 1px dashed #00acc1; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: bold;">📷 Ảnh minh chứng</button>
            <input type="file" accept="image/*" class="input-anh-sk-dong" style="display:none;" onchange="if(typeof window.ham_21_33_chon_anh_sk_dong === 'function') window.ham_21_33_chon_anh_sk_dong(this)">
            <div class="vung-preview-anh-sk-dong" style="display: flex; gap: 6px; align-items: center; overflow-x: auto;"></div>
        </div>
    `;
    khuVuc.appendChild(div);
    if (typeof window.ham_21_34_render_tat_ca_cac_the_su_kien === 'function') {
        window.ham_21_34_render_tat_ca_cac_the_su_kien();
    }
    if (typeof window.ham_21_8_kich_hoat_xu_ly_anh === 'function') {
        window.ham_21_8_kich_hoat_xu_ly_anh();
    }
    if (typeof window.ham_20_7_tai_danh_sach_lop === 'function') {
        window.ham_20_7_tai_danh_sach_lop();
    }
};

// =====================================================================
// HÀM 21.31: THÊM MỘT DÒNG NGANG MỚI NGAY BÊN DƯỚI (ĐẦY ĐỦ CỘT CHO HỌC SINH TIẾP THEO)
// =====================================================================
window.ham_21_31_them_hs_cho_su_kien = function (btn) {
    let dongLon = btn.closest('.dong-nhap-su-kien');
    if (!dongLon) return;
    let vungDS = dongLon.querySelector('.sk-vung-danh-sach-hs');
    if (!vungDS) return;

    let dongDau = vungDS.querySelector('.dong-chi-tiet-hs');
    let ngayVal = dongDau ? dongDau.querySelector('.sk-ngay').value : new Date().toISOString().split('T')[0];
    let thuVal = dongDau ? dongDau.querySelector('.sk-thu').value : '';
    let buoiVal = dongDau ? dongDau.querySelector('.sk-buoi').value : 'Sáng';
    let diemVal = dongDau ? dongDau.querySelector('.sk-diem-tru').value : '0';

    let dongMoi = document.createElement('div');
    dongMoi.className = 'dong-chi-tiet-hs';
    dongMoi.style.cssText = 'background: #fdf5f8; padding: 10px; border-radius: 6px; border: 1px dashed #e83e8c; display: flex; gap: 8px; align-items: center; flex-wrap: wrap; animation: fadeIn 0.2s;';

    dongMoi.innerHTML = `
        <div style="display: flex; flex-direction: column;">
            <span style="font-size: 10px; color: #666; font-weight: bold;">Ngày:</span>
            <input type="date" class="sk-ngay" value="${ngayVal}" onchange="let thu = window.ham_21_39_lay_thu_trong_tuần ? window.ham_21_39_lay_thu_trong_tuần(this.value) : ''; this.closest('.dong-chi-tiet-hs').querySelector('.sk-thu').value = thu;" style="width: 120px; padding: 6px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; font-weight:bold;">
        </div>

        <div style="display: flex; flex-direction: column;">
            <span style="font-size: 10px; color: #666; font-weight: bold;">Thứ:</span>
            <input type="text" class="sk-thu" value="${thuVal}" readonly style="width: 70px; padding: 6px; border: 1px solid #e9ecef; border-radius: 4px; font-size: 12px; font-weight: bold; background: #e9ecef; color: #495057; text-align: center;">
        </div>

        <div style="display: flex; flex-direction: column;">
            <span style="font-size: 10px; color: #666; font-weight: bold;">Buổi:</span>
            <select class="sk-buoi" style="width: 75px; padding: 6px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; cursor:pointer;">
                <option value="Sáng" ${buoiVal === 'Sáng' ? 'selected' : ''}>Sáng</option>
                <option value="Trưa" ${buoiVal === 'Trưa' ? 'selected' : ''}>Trưa</option>
                <option value="Chiều" ${buoiVal === 'Chiều' ? 'selected' : ''}>Chiều</option>
                <option value="Tối" ${buoiVal === 'Tối' ? 'selected' : ''}>Tối</option>
            </select>
        </div>

        <div style="display: flex; flex-direction: column; flex: 1.5; min-width: 180px;">
            <span style="font-size: 10px; color: #666; font-weight: bold;">Học sinh:</span>
            <div style="display:flex; align-items:center; gap:6px; border:2px solid #e83e8c; border-radius:4px; padding:3px 6px; background:#fff;">
                <img class="avatar-preview" src="" style="width:20px; height:20px; border-radius:50%; object-fit:cover; display:none; border:1px solid #eee;">
                <input class="sk-hs" placeholder="👤 Chọn học sinh tiếp theo..." style="border:none; outline:none; flex:1; width:100%; font-size:12px; font-weight:bold; background:transparent; color:#e83e8c;">
            </div>
        </div>

        <div style="display: flex; flex-direction: column;">
            <span style="font-size: 10px; color: #666; font-weight: bold;">Điểm trừ:</span>
            <input type="number" step="0.5" class="sk-diem-tru" value="${diemVal}" style="width: 60px; padding: 6px; border: 1px solid #ffeeba; background: #fff3cd; border-radius: 4px; font-size: 12px; font-weight: bold; color: #dc3545; text-align: center; outline: none;">
        </div>

        <div style="display: flex; flex-direction: column; flex: 1.5; min-width: 150px;">
            <span style="font-size: 10px; color: #666; font-weight: bold;">Ghi chú riêng:</span>
            <input class="sk-ghichu" placeholder="Ghi chú..." style="width: 100%; padding: 6px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; box-sizing: border-box;">
        </div>

        <div style="display: flex; align-items: flex-end; height: 100%; padding-top: 15px;">
            <button type="button" onclick="this.closest('.dong-chi-tiet-hs').remove()" style="padding: 6px 8px; background: #f8d7da; color: #dc3545; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;" title="Xóa dòng này">✖</button>
        </div>
    `;
    vungDS.appendChild(dongMoi);
    if (typeof window.ham_20_7_tai_danh_sach_lop === 'function') {
        window.ham_20_7_tai_danh_sach_lop();
    }
};














// // =====================================================================
// // HÀM 21.5: TẢI DANH SÁCH THẺ LỖI ĐỂ GÕ AUTOCOMPLETE (Datalist)
// // =====================================================================
// window.ham_21_5_tai_danh_sach_the_datalist = async function () {
//     const datalist = document.getElementById('gvcn-dl-loi');
//     if (!datalist) return;
//     try {
//         const { data, error } = await _supabase.from('cai_dat_the_su_kien').select('ten_the').like('nhom_the', 'gvcn_%');
//         if (data) {
//             let html = '';
//             data.forEach(t => html += `<option value="${t.ten_the}"></option>`);
//             datalist.innerHTML = html;
//         }
//     } catch (e) { console.error("Lỗi tải datalist lỗi:", e); }
// };



// =====================================================================
// HÀM 21.5: TẢI DANH SÁCH THẺ ĐỂ GÕ AUTOCOMPLETE (ĐÃ BỎ LỌC NHÓM)
// =====================================================================
window.ham_21_5_tai_danh_sach_the_datalist = async function () {
    const datalist = document.getElementById('gvcn-dl-loi');
    if (!datalist) return;
    try {
        const { data, error } = await _supabase.from('cai_dat_the_su_kien').select('ten_the');
        if (error) throw error;
        if (data) {
            let html = '';
            data.forEach(t => html += `<option value="${t.ten_the}"></option>`);
            datalist.innerHTML = html;
        }
    } catch (e) { console.error("Lỗi tải datalist lỗi:", e); }
};



// // =====================================================================
// // HÀM 21.6: GOM CÁC DÒNG SỰ KIỆN ĐƯA VÀO DANH SÁCH CHỜ LƯU
// // =====================================================================
// window.ham_21_6_dua_vao_danh_sach_cho = function () {
//     const cacDong = document.querySelectorAll('.dong-nhap-su-kien');
//     const tuanXayRa = document.getElementById('gvcn-sk-tuan-chon').value;

//     if (!tuanXayRa) {
//         alert("⚠️ Vui lòng CHỌN TUẦN XẢY RA SỰ KIỆN ở Bước 1 trước khi đưa vào danh sách chờ!");
//         return;
//     }

//     let coLoi = false;
//     let batchId = 'batch_sk_' + Date.now();

//     cacDong.forEach(dong => {
//         let ngay = dong.querySelector('.sk-ngay').value;
//         let buoi = dong.querySelector('.sk-buoi').value;
//         let hsInput = dong.querySelector('.sk-hs').value.trim();
//         let loi = dong.querySelector('.sk-loi').value.trim();

//         if (hsInput && loi) {
//             let uidHS = null;
//             let tenDangNhap = '';
//             if (window.DanhSachHocSinhLopHienTai) {
//                 let hsObj = window.DanhSachHocSinhLopHienTai.find(h => h.chuoiGhep === hsInput);
//                 if (hsObj) {
//                     uidHS = hsObj.uid;
//                     tenDangNhap = hsObj.tenDangNhap;
//                 }
//             }

//             let tenHS = hsInput.split(' - ')[0].trim();
//             if (uidHS || tenHS) {
//                 window.gvcn_SuKienChoLuu.push({
//                     id_tam: Math.random(), batch_id: batchId,
//                     tuan: tuanXayRa, ngay: ngay, buoi: buoi,
//                     uid: uidHS, ten_hs: tenHS, ten_dang_nhap: tenDangNhap, loi: loi,
//                     mang_anh: [...(window.gvcn_AnhSuKienTam || [])]
//                 });
//             }
//         } else if (hsInput || loi) {
//             coLoi = true;
//         }
//     });

//     if (coLoi) alert("⚠️ Có dòng thầy điền thiếu Học Sinh hoặc Sự kiện. Dòng đó đã bị bỏ qua!");

//     // Reset Form Sự kiện
//     const currentDate = new Date().toISOString().split('T')[0];
//     document.getElementById('gvcn-khu-vuc-su-kien-nhanh').innerHTML = `
//         <div class="dong-nhap-su-kien" style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap; background: #fff; padding: 6px; border-radius: 6px; border: 1px dashed #ccc;">
//             <input type="date" class="sk-ngay" value="${currentDate}" style="width: 130px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; font-weight:bold;">
//             <select class="sk-buoi" style="width: 80px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; cursor:pointer;">
//                 <option value="Sáng">Sáng</option><option value="Trưa">Trưa</option><option value="Chiều">Chiều</option><option value="Tối">Tối</option>
//             </select>
//             <div style="display:flex; align-items:center; gap:8px; flex:1.5; min-width:180px; border:2px solid #e83e8c; border-radius:4px; padding:4px 8px; background:#fdf5f8;">
//                 <img class="avatar-preview" src="" style="width:24px; height:24px; border-radius:50%; object-fit:cover; display:none; border:1px solid #eee;">
//                 <input class="sk-hs" placeholder="👤 Chọn học sinh..." style="border:none; outline:none; flex:1; width:100%; font-size:13px; font-weight:bold; background:transparent; color:#e83e8c;">
//             </div>
//             <input class="sk-loi" list="gvcn-dl-loi" placeholder="🚨 Gõ tìm lỗi/sự kiện..." style="flex: 1.5; min-width: 140px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 13px; font-weight:bold; outline: none;">
//             <button onclick="this.parentElement.remove()" style="padding: 8px 12px; background: #fff; color: #dc3545; border: 1px solid #dc3545; border-radius: 4px; cursor: pointer;" title="Xóa">✖</button>
//         </div>
//     `;
//     window.gvcn_AnhSuKienTam = [];
//     ham_21_9_render_anh('gvcn-vung-preview-anh-sk', window.gvcn_AnhSuKienTam, 'sk');
//     ham_21_7_ve_danh_sach_cho();
// };

// // =====================================================================
// // HÀM 21.7: VẼ DANH SÁCH CHỜ SỰ KIỆN LÊN GIAO DIỆN
// // =====================================================================
// window.ham_21_7_ve_danh_sach_cho = function () {
//     const vung = document.getElementById('gvcn-danh-sach-cho-luu');
//     document.getElementById('gvcn-dem-su-kien').innerText = window.gvcn_SuKienChoLuu.length;

//     if (window.gvcn_SuKienChoLuu.length === 0) {
//         vung.innerHTML = '<i style="color: #adb5bd; font-size: 13px;">Chưa có sự kiện nào...</i>'; return;
//     }

//     let html = '';
//     window.gvcn_SuKienChoLuu.forEach((sk, idx) => {
//         let strNgay = sk.ngay.split('-').reverse().join('/');
//         let anhStr = sk.mang_anh.length > 0 ? ` <span style="font-size:11px; color:#e83e8c; font-weight:bold;">(📸 ${sk.mang_anh.length} ảnh)</span>` : '';
//         html += `
//             <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; border-bottom: 1px dashed #eee; background: #fff; border-radius: 6px; margin-bottom: 8px; border-left: 4px solid #e83e8c; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
//                 <div style="font-size: 14px;">
//                     <span style="color:#6c757d; font-weight:bold;">[${sk.tuan} - ${strNgay} - ${sk.buoi}]</span> 
//                     <b style="color:#1a73e8; margin:0 5px;">${sk.ten_hs}</b>: <span style="color:#dc3545; font-weight:bold;">${sk.loi}</span> ${anhStr}
//                 </div>
//                 <button onclick="window.gvcn_SuKienChoLuu.splice(${idx}, 1); ham_21_7_ve_danh_sach_cho();" style="padding: 6px 12px; background: #f8d7da; color: #dc3545; border: none; border-radius: 4px; cursor: pointer; font-weight:bold;">✖</button>
//             </div>
//         `;
//     });
//     vung.innerHTML = html;
// };



// =====================================================================
// HÀM 21.6: GOM CÁC DÒNG SỰ KIỆN ĐƯA VÀO DANH SÁCH CHỜ LƯU (CẬP NHẬT ĐA HS & THẺ)
// =====================================================================
window.ham_21_6_dua_vao_danh_sach_cho = function () {
    const cacDong = document.querySelectorAll('.dong-nhap-su-kien');
    const tuanXayRa = document.getElementById('gvcn-sk-tuan-chon').value;

    if (!tuanXayRa) {
        alert("⚠️ Vui lòng CHỌN TUẦN XẢY RA SỰ KIỆN ở Bước 1 trước khi đưa vào danh sách chờ!");
        return;
    }

    let coLoi = false;
    let batchId = 'batch_sk_' + Date.now();

    cacDong.forEach(dong => {
        let ngay = dong.querySelector('.sk-ngay').value;
        let buoi = dong.querySelector('.sk-buoi').value;
        let loi = dong.querySelector('.sk-loi-hidden').value.trim();
        let ghiChuThem = dong.querySelector('.sk-ghichu').value.trim();

        let mangAnhDong = [];
        try { if (dong.dataset.mangAnhDong) mangAnhDong = JSON.parse(dong.dataset.mangAnhDong); } catch (e) { }

        // Lấy tất cả học sinh trong dòng (có thể có nhiều ô input.sk-hs)
        dong.querySelectorAll('.sk-hs').forEach(inputHS => {
            let hsInput = inputHS.value.trim();
            if (hsInput && loi) {
                let uidHS = null, tenDangNhap = '';
                if (window.DanhSachHocSinhLopHienTai) {
                    let hsObj = window.DanhSachHocSinhLopHienTai.find(h => h.chuoiGhep === hsInput);
                    if (hsObj) { uidHS = hsObj.uid; tenDangNhap = hsObj.tenDangNhap; }
                }
                let tenHS = hsInput.split(' - ')[0].trim();

                window.gvcn_SuKienChoLuu.push({
                    id_tam: Math.random(), batch_id: batchId,
                    tuan: tuanXayRa, ngay: ngay, buoi: buoi,
                    uid: uidHS, ten_hs: tenHS, ten_dang_nhap: tenDangNhap, loi: loi, ghi_chu: ghiChuThem,
                    mang_anh: [...(window.gvcn_AnhSuKienTam || []), ...mangAnhDong]
                });
            } else if (hsInput || loi) {
                coLoi = true;
            }
        });
    });

    if (coLoi) alert("⚠️ Có dòng thầy điền thiếu Học Sinh hoặc chưa chọn Loại Sự Kiện (Thẻ). Dòng đó đã bị bỏ qua!");

    // Reset lại form Mục 5 sau khi đưa xuống chờ lưu
    const currentDate = new Date().toISOString().split('T')[0];
    document.getElementById('gvcn-khu-vuc-su-kien-nhanh').innerHTML = `
        <div class="dong-nhap-su-kien" style="background: #fff; padding: 12px; border-radius: 8px; border: 1px solid #ccc; display: flex; flex-direction: column; gap: 10px;">
            <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
                <input type="date" class="sk-ngay" value="${currentDate}" style="width: 130px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; font-weight:bold;">
                <select class="sk-buoi" style="width: 85px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; cursor:pointer;">
                    <option value="Sáng">Sáng</option><option value="Trưa">Trưa</option><option value="Chiều">Chiều</option><option value="Tối">Tối</option>
                </select>
                <div class="sk-vung-hoc-sinh" style="display: flex; flex-direction: column; gap: 6px; flex: 2; min-width: 250px;">
                    <div style="display:flex; align-items:center; gap:6px;">
                        <div style="display:flex; align-items:center; gap:6px; flex:1; border:2px solid #e83e8c; border-radius:4px; padding:4px 8px; background:#fdf5f8;">
                            <img class="avatar-preview" src="" style="width:22px; height:22px; border-radius:50%; object-fit:cover; display:none; border:1px solid #eee;">
                            <input class="sk-hs" placeholder="👤 Chọn học sinh..." style="border:none; outline:none; flex:1; width:100%; font-size:12px; font-weight:bold; background:transparent; color:#e83e8c;">
                        </div>
                        <button type="button" onclick="if(typeof ham_21_31_them_hs_cho_su_kien === 'function') ham_21_31_them_hs_cho_su_kien(this)" style="padding: 6px 10px; background: #fdf5f8; color: #e83e8c; border: 1px dashed #e83e8c; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: bold;" title="Chọn thêm học sinh chung sự kiện">➕ HS</button>
                    </div>
                </div>
                <button onclick="this.closest('.dong-nhap-su-kien').remove()" style="padding: 8px 12px; background: #f8d7da; color: #dc3545; border: none; border-radius: 4px; cursor: pointer;" title="Xóa dòng">✖</button>
            </div>
            <div>
                <input class="sk-ghichu" placeholder="📝 Ghi chú thêm cho sự kiện..." style="width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; box-sizing: border-box;">
            </div>
            <div>
                <label style="font-size: 11px; font-weight: bold; color: #6c757d; display: block; margin-bottom: 4px;">🏷️ Chọn loại sự kiện (Thẻ):</label>
                <div class="sk-vung-chon-the" style="display: flex; gap: 6px; flex-wrap: wrap; align-items: center;">
                    <button type="button" onclick="if(typeof ham_21_32_mo_modal_them_the === 'function') ham_21_32_mo_modal_them_the()" style="padding: 4px 8px; background: #fff; border: 1px dashed #e83e8c; color: #e83e8c; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: bold;">➕ Thêm thẻ mới</button>
                </div>
                <input type="hidden" class="sk-loi-hidden" value="">
            </div>
            <div style="display: flex; align-items: center; gap: 10px; border-top: 1px dashed #eee; padding-top: 6px;">
                <button type="button" class="btn-anh-sk-dong" onclick="this.nextElementSibling.click()" style="padding: 4px 8px; background: #e0f7fa; color: #00838f; border: 1px dashed #00acc1; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: bold;">📷 Ảnh minh chứng</button>
                <input type="file" accept="image/*" class="input-anh-sk-dong" style="display:none;" onchange="if(typeof window.ham_21_33_chon_anh_sk_dong === 'function') window.ham_21_33_chon_anh_sk_dong(this)">
                <div class="vung-preview-anh-sk-dong" style="display: flex; gap: 6px; align-items: center; overflow-x: auto;"></div>
            </div>
        </div>
    `;
    window.gvcn_AnhSuKienTam = [];
    ham_21_9_render_anh('gvcn-vung-preview-anh-sk', window.gvcn_AnhSuKienTam, 'sk');
    ham_21_7_ve_danh_sach_cho();
    if (typeof window.ham_21_34_render_tat_ca_cac_the_su_kien === 'function') {
        window.ham_21_34_render_tat_ca_cac_the_su_kien();
    }
};

// =====================================================================
// HÀM 21.7: VẼ DANH SÁCH CHỜ SỰ KIỆN
// =====================================================================
window.ham_21_7_ve_danh_sach_cho = function () {
    const vung = document.getElementById('gvcn-danh-sach-cho-luu');
    document.getElementById('gvcn-dem-su-kien').innerText = window.gvcn_SuKienChoLuu.length;

    if (window.gvcn_SuKienChoLuu.length === 0) {
        vung.innerHTML = '<i style="color: #adb5bd; font-size: 13px;">Chưa có sự kiện nào...</i>'; return;
    }

    let html = '';
    window.gvcn_SuKienChoLuu.forEach((sk, idx) => {
        let strNgay = sk.ngay.split('-').reverse().join('/');
        let anhStr = sk.mang_anh.length > 0 ? ` <span style="font-size:11px; color:#e83e8c; font-weight:bold;">(📸 ${sk.mang_anh.length} ảnh)</span>` : '';
        let ghiChuStr = sk.ghi_chu ? ` - <i>${sk.ghi_chu}</i>` : '';
        html += `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; border-bottom: 1px dashed #eee; background: #fff; border-radius: 6px; margin-bottom: 8px; border-left: 4px solid #e83e8c; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                <div style="font-size: 13px;">
                    <span style="color:#6c757d; font-weight:bold;">[${sk.tuan} - ${strNgay} - ${sk.buoi}]</span> 
                    <b style="color:#1a73e8; margin:0 5px;">${sk.ten_hs}</b>: <span style="color:#dc3545; font-weight:bold;">[${sk.loi}]</span>${ghiChuStr} ${anhStr}
                </div>
                <button onclick="window.gvcn_SuKienChoLuu.splice(${idx}, 1); ham_21_7_ve_danh_sach_cho();" style="padding: 6px 12px; background: #f8d7da; color: #dc3545; border: none; border-radius: 4px; cursor: pointer; font-weight:bold;">✖</button>
            </div>
        `;
    });
    vung.innerHTML = html;
};



// // =====================================================================
// // HÀM 21.8: KÍCH HOẠT XỬ LÝ ẢNH (DÙNG CHUNG CROPPER CỦA KHỐI 20)
// // =====================================================================
// window.ham_21_8_kich_hoat_xu_ly_anh = function () {
//     // Ảnh Nội Dung
//     const inputND = document.getElementById('gvcn-input-anh-nd');
//     if (inputND) {
//         let cloneND = inputND.cloneNode(true);
//         inputND.parentNode.replaceChild(cloneND, inputND);
//         cloneND.addEventListener('change', async (e) => {
//             let files = await window.ham_20_25_xu_ly_mang_anh_dau_vao(Array.from(e.target.files));
//             if (!window.gvcn_AnhNoiDungTam) window.gvcn_AnhNoiDungTam = [];
//             if (files && files.length > 0) window.gvcn_AnhNoiDungTam.push(...files);
//             ham_21_9_render_anh('gvcn-vung-preview-anh-nd', window.gvcn_AnhNoiDungTam, 'nd');
//             e.target.value = '';
//         });
//     }

//     // Ảnh Sự Kiện
//     const inputSK = document.getElementById('gvcn-input-anh-sk');
//     if (inputSK) {
//         let cloneSK = inputSK.cloneNode(true);
//         inputSK.parentNode.replaceChild(cloneSK, inputSK);
//         cloneSK.addEventListener('change', async (e) => {
//             let files = await window.ham_20_25_xu_ly_mang_anh_dau_vao(Array.from(e.target.files));
//             if (!window.gvcn_AnhSuKienTam) window.gvcn_AnhSuKienTam = [];
//             if (files && files.length > 0) window.gvcn_AnhSuKienTam.push(...files);
//             ham_21_9_render_anh('gvcn-vung-preview-anh-sk', window.gvcn_AnhSuKienTam, 'sk');
//             e.target.value = '';
//         });
//     }
// };

// // =====================================================================
// // HÀM 21.9: RENDER ẢNH ĐANG CHỜ UPLOAD
// // =====================================================================
// window.ham_21_9_render_anh = function (idVung, mangAnh, loai) {
//     const vung = document.getElementById(idVung);
//     if (!vung) return;
//     if (!mangAnh || mangAnh.length === 0) {
//         vung.innerHTML = '<span>(Chưa có ảnh đính kèm...)</span>'; return;
//     }

//     let html = '';
//     mangAnh.forEach((f, i) => {
//         let sizeKB = (f.size / 1024).toFixed(1);
//         html += `<div style="position:relative; display:flex; flex-direction:column; align-items:center; background:#fff; padding:6px; border-radius:6px; border:1px solid #ced4da; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
//                     <img src="${URL.createObjectURL(f)}" style="height:55px; border-radius:4px; object-fit:contain;">
//                     <span style="font-size:10px; color:#666; margin-top:4px; font-weight:bold;">${sizeKB} KB</span>
//                     <button onclick="window.gvcn_Anh${loai === 'nd' ? 'NoiDung' : 'SuKien'}Tam.splice(${i},1); ham_21_9_render_anh('${idVung}', window.gvcn_Anh${loai === 'nd' ? 'NoiDung' : 'SuKien'}Tam, '${loai}')" style="position:absolute; top:-8px; right:-8px; background:#dc3545; color:white; border:none; border-radius:50%; width:22px; height:22px; font-size:13px; font-weight:bold; cursor:pointer; box-shadow:0 1px 3px rgba(0,0,0,0.3); display:flex; align-items:center; justify-content:center;">×</button>
//                  </div>`;
//     });
//     vung.innerHTML = html;
// };


// =====================================================================
// HÀM 21.8: KÍCH HOẠT XỬ LÝ ẢNH (Cho cả 3 loại: Tuần, Nội Dung, Sự kiện)
// =====================================================================
window.ham_21_8_kich_hoat_xu_ly_anh = function () {
    // 1. Kích hoạt Ảnh Tuần
    const inputTuan = document.getElementById('gvcn-input-anh-tuan');
    if (inputTuan) {
        let cloneTuan = inputTuan.cloneNode(true);
        inputTuan.parentNode.replaceChild(cloneTuan, inputTuan);
        cloneTuan.addEventListener('change', async (e) => {
            try {
                let files = await window.ham_20_25_xu_ly_mang_anh_dau_vao(Array.from(e.target.files));
                if (!window.gvcn_AnhTuanTam) window.gvcn_AnhTuanTam = [];
                if (files && files.length > 0) window.gvcn_AnhTuanTam.push(...files);
                window.ham_21_9_render_anh('gvcn-vung-preview-anh-tuan', window.gvcn_AnhTuanTam, 'tuan');
            } catch (err) { console.error(err); }
            e.target.value = '';
        });
    }

    // 2. Kích hoạt Ảnh Nội Dung
    const inputND = document.getElementById('gvcn-input-anh-nd');
    if (inputND) {
        let cloneND = inputND.cloneNode(true);
        inputND.parentNode.replaceChild(cloneND, inputND);
        cloneND.addEventListener('change', async (e) => {
            try {
                let files = await window.ham_20_25_xu_ly_mang_anh_dau_vao(Array.from(e.target.files));
                if (!window.gvcn_AnhNoiDungTam) window.gvcn_AnhNoiDungTam = [];
                if (files && files.length > 0) window.gvcn_AnhNoiDungTam.push(...files);
                window.ham_21_9_render_anh('gvcn-vung-preview-anh-nd', window.gvcn_AnhNoiDungTam, 'nd');
            } catch (err) { console.error(err); }
            e.target.value = '';
        });
    }

    // 3. Kích hoạt Ảnh Sự Kiện
    const inputSK = document.getElementById('gvcn-input-anh-sk');
    if (inputSK) {
        let cloneSK = inputSK.cloneNode(true);
        inputSK.parentNode.replaceChild(cloneSK, inputSK);
        cloneSK.addEventListener('change', async (e) => {
            try {
                let files = await window.ham_20_25_xu_ly_mang_anh_dau_vao(Array.from(e.target.files));
                if (!window.gvcn_AnhSuKienTam) window.gvcn_AnhSuKienTam = [];
                if (files && files.length > 0) window.gvcn_AnhSuKienTam.push(...files);
                window.ham_21_9_render_anh('gvcn-vung-preview-anh-sk', window.gvcn_AnhSuKienTam, 'sk');
            } catch (err) { console.error(err); }
            e.target.value = '';
        });
    }
};

// // =====================================================================
// // HÀM 21.9: RENDER ẢNH ĐANG CHỜ UPLOAD LÊN MÀN HÌNH
// // =====================================================================
// window.ham_21_9_render_anh = function (idVung, mangAnh, loai) {
//     const vung = document.getElementById(idVung);
//     if (!vung) return;

//     // Bỏ qua việc xóa thông báo "Đã lưu..." nếu đang xem tuần cũ mà RAM trống
//     if ((!mangAnh || mangAnh.length === 0) && loai === 'tuan' && vung.innerHTML.includes('Đã lưu')) return;

//     if (!mangAnh || mangAnh.length === 0) {
//         vung.innerHTML = '<span>(Chưa có ảnh đính kèm...)</span>'; return;
//     }

//     let html = '';
//     // Nếu là Ảnh Tuần mà đã có ảnh cũ trên DB, hiện thêm chữ báo sẽ nối thêm ảnh
//     if (loai === 'tuan' && vung.innerHTML.includes('Đã lưu')) {
//         html += `<span style="font-size:11px; color:#28a745; margin-right:10px;">(Sẽ nối thêm ảnh mới)</span>`;
//     }

//     mangAnh.forEach((f, i) => {
//         let sizeKB = (f.size / 1024).toFixed(1);
//         let mangTarget = loai === 'tuan' ? 'gvcn_AnhTuanTam' : (loai === 'nd' ? 'gvcn_AnhNoiDungTam' : 'gvcn_AnhSuKienTam');
//         html += `<div style="position:relative; display:flex; flex-direction:column; align-items:center; background:#fff; padding:6px; border-radius:6px; border:1px solid #ced4da; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
//                     <img src="${URL.createObjectURL(f)}" style="height:55px; border-radius:4px; object-fit:contain;">
//                     <span style="font-size:10px; color:#666; margin-top:4px; font-weight:bold;">${sizeKB} KB</span>
//                     <button onclick="window.${mangTarget}.splice(${i},1); window.ham_21_9_render_anh('${idVung}', window.${mangTarget}, '${loai}')" style="position:absolute; top:-8px; right:-8px; background:#dc3545; color:white; border:none; border-radius:50%; width:22px; height:22px; font-size:13px; font-weight:bold; cursor:pointer; box-shadow:0 1px 3px rgba(0,0,0,0.3); display:flex; align-items:center; justify-content:center;">×</button>
//                  </div>`;
//     });
//     vung.innerHTML = html;
// };

// =====================================================================
// KHAI BÁO BIẾN TẠM MỚI (Dùng để giữ các ảnh cũ khi Sửa)
// =====================================================================
window.gvcn_AnhNoiDungCuTam = [];

// =====================================================================
// HÀM 21.9: RENDER ẢNH VÀ XỬ LÝ XÓA ẢNH CŨ KHI SỬA
// =====================================================================
window.ham_21_9_render_anh = function (idVung, mangAnh, loai) {
    const vung = document.getElementById(idVung);
    if (!vung) return;

    let htmlCu = '';

    // 🌟 Xử lý hiển thị Ảnh Cũ nếu đang ở chế độ Sửa (loại 'nd')
    if (loai === 'nd' && window.gvcn_IdNoiDungDangSua && window.gvcn_AnhNoiDungCuTam && window.gvcn_AnhNoiDungCuTam.length > 0) {
        vung.style.flexDirection = 'column';
        vung.style.alignItems = 'stretch';
        vung.style.padding = '10px';

        htmlCu = `<div style="display:flex; gap:15px; margin-bottom:10px; padding-bottom:10px; border-bottom:1px dashed #ced4da; width:100%; overflow-x:auto; overflow-y:hidden; align-items:flex-start;">`;
        window.gvcn_AnhNoiDungCuTam.forEach((linkAnh, i) => {
            let fileId = null;
            if (linkAnh.includes('/d/')) { let m = linkAnh.match(/\/d\/([a-zA-Z0-9_-]+)/); if (m) fileId = m[1]; }
            else if (linkAnh.includes('id=')) { let m = linkAnh.match(/id=([a-zA-Z0-9_-]+)/); if (m) fileId = m[1]; }
            let srcTN = fileId ? `https://drive.google.com/thumbnail?id=${fileId}&sz=w800` : linkAnh;

            // Render từng ảnh cũ CÓ NÚT XÓA ✖
            htmlCu += `
                <div style="flex: 0 0 auto; position:relative; display:flex; flex-direction:column; align-items:center; background:#fff; padding:6px; border-radius:8px; border:1px solid #ced4da; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                    <button type="button" onclick="window.gvcn_AnhNoiDungCuTam.splice(${i}, 1); window.ham_21_9_render_anh('${idVung}', window.${loai === 'tuan' ? 'gvcn_AnhTuanTam' : (loai === 'nd' ? 'gvcn_AnhNoiDungTam' : 'gvcn_AnhSuKienTam')}, '${loai}')" style="position:absolute; top:-8px; right:-8px; background:#dc3545; color:white; border:none; border-radius:50%; width:24px; height:24px; font-size:14px; font-weight:bold; cursor:pointer; box-shadow:0 1px 3px rgba(0,0,0,0.3); display:flex; align-items:center; justify-content:center; z-index:10;" title="Xóa ảnh cũ này">✖</button>
                    <a href="${linkAnh}" target="_blank" title="Bấm xem ảnh gốc">
                        <img src="${srcTN}" style="height:150px; width:auto; border-radius:6px; object-fit:contain; transition:0.2s;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
                    </a>
                    <span style="font-size:11px; color:#e83e8c; font-weight:bold; margin-top:6px;">Ảnh cũ ${i + 1}</span>
                </div>`;
        });
        htmlCu += `</div>`;
    } else {
        // Trả lại CSS chuẩn nếu không có ảnh cũ
        vung.style.flexDirection = 'row';
        vung.style.alignItems = 'center';
        vung.style.padding = '8px';
    }

    if ((!mangAnh || mangAnh.length === 0) && loai === 'tuan' && vung.innerHTML.includes('Đã lưu')) return;

    if (!mangAnh || mangAnh.length === 0) {
        if (htmlCu) {
            vung.innerHTML = htmlCu + `<div style="padding: 5px 0;"><span style="color:#00838f; font-style:italic; font-size:12px;">(Bấm nút 📷 Tải ảnh chung bên trái để nối thêm ảnh mới...)</span></div>`;
        } else {
            vung.innerHTML = '<span>(Chưa có ảnh đính kèm...)</span>';
        }
        return;
    }

    // 🌟 Xử lý hiển thị Ảnh Mới thêm vào
    let htmlMoi = `<div style="display:flex; gap:8px; flex-wrap:wrap; padding:5px 0;">`;
    if (loai === 'tuan' && vung.innerHTML.includes('Đã lưu')) htmlMoi += `<span style="font-size:11px; color:#28a745; margin-right:10px;">(Sẽ nối thêm ảnh mới)</span>`;

    mangAnh.forEach((f, i) => {
        let sizeKB = (f.size / 1024).toFixed(1);
        let mangTarget = loai === 'tuan' ? 'gvcn_AnhTuanTam' : (loai === 'nd' ? 'gvcn_AnhNoiDungTam' : 'gvcn_AnhSuKienTam');
        htmlMoi += `<div style="position:relative; display:flex; flex-direction:column; align-items:center; background:#fff; padding:6px; border-radius:6px; border:1px solid #ced4da; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
                    <img src="${URL.createObjectURL(f)}" style="height:55px; border-radius:4px; object-fit:contain;">
                    <span style="font-size:10px; color:#666; margin-top:4px; font-weight:bold;">${sizeKB} KB</span>
                    <button type="button" onclick="window.${mangTarget}.splice(${i},1); window.ham_21_9_render_anh('${idVung}', window.${mangTarget}, '${loai}')" style="position:absolute; top:-8px; right:-8px; background:#dc3545; color:white; border:none; border-radius:50%; width:22px; height:22px; font-size:13px; font-weight:bold; cursor:pointer; box-shadow:0 1px 3px rgba(0,0,0,0.3); display:flex; align-items:center; justify-content:center; z-index:10;">✖</button>
                 </div>`;
    });
    htmlMoi += `</div>`;

    if (htmlCu) {
        vung.innerHTML = htmlCu + htmlMoi;
    } else {
        vung.innerHTML = htmlMoi;
    }
};




// // =====================================================================
// // HÀM 21.10: LÀM MỚI TRANG TRẮNG (CẬP NHẬT CLEAR VÙNG ẢNH CŨ)
// // =====================================================================
// window.ham_21_10_lam_moi_so_gvcn = function () {
//     document.getElementById('gvcn-input-tuan').value = '';
//     document.getElementById('gvcn-nd-ten').value = '';
//     document.getElementById('gvcn-nd-chitiet').value = '';
//     document.getElementById('gvcn-nd-sinh-hoat').value = '';
//     document.getElementById('gvcn-danh-gia-tuan').value = '';

//     document.querySelectorAll('.dong-nguoi-nhan, .dong-nhap-su-kien').forEach((o, i) => {
//         if (i > 0) o.remove();
//         else {
//             let inp = o.querySelectorAll('input');
//             inp.forEach(ip => { if (ip.type !== 'date' && ip.type !== 'datetime-local') ip.value = ''; });
//             let img = o.querySelector('.avatar-preview');
//             if (img) img.style.display = 'none';
//         }
//     });

//     window.gvcn_AnhTuanTam = []; window.ham_21_9_render_anh('gvcn-vung-preview-anh-tuan', window.gvcn_AnhTuanTam, 'tuan');
//     window.gvcn_AnhNoiDungTam = []; window.ham_21_9_render_anh('gvcn-vung-preview-anh-nd', window.gvcn_AnhNoiDungTam, 'nd');
//     window.gvcn_AnhSuKienTam = []; window.ham_21_9_render_anh('gvcn-vung-preview-anh-sk', window.gvcn_AnhSuKienTam, 'sk');
//     window.gvcn_SuKienChoLuu = []; window.ham_21_7_ve_danh_sach_cho();

//     document.getElementById('gvcn-bang-noi-dung-cu').innerHTML = '';
//     document.getElementById('gvcn-vung-anh-cu-tuan').innerHTML = ''; // Làm sạch vùng ảnh cũ
// };


// =====================================================================
// HÀM 21.10: LÀM MỚI TRANG TRẮNG (CẬP NHẬT RESET BIẾN ẢNH CŨ)
// =====================================================================
window.ham_21_10_lam_moi_so_gvcn = function () {
    document.getElementById('gvcn-input-tuan').value = '';
    document.getElementById('gvcn-nd-ten').value = '';
    document.getElementById('gvcn-nd-chitiet').value = '';
    document.getElementById('gvcn-nd-sinh-hoat').value = '';
    document.getElementById('gvcn-danh-gia-tuan').value = '';

    document.querySelectorAll('.dong-nguoi-nhan, .dong-nhap-su-kien').forEach((o, i) => {
        if (i > 0) o.remove();
        else {
            let inp = o.querySelectorAll('input');
            inp.forEach(ip => { if (ip.type !== 'date' && ip.type !== 'datetime-local') ip.value = ''; });
            let img = o.querySelector('.avatar-preview');
            if (img) img.style.display = 'none';
        }
    });

    window.gvcn_AnhTuanCuTam = []; // Reset old images
    window.gvcn_AnhTuanTam = []; window.ham_21_9_render_anh('gvcn-vung-preview-anh-tuan', window.gvcn_AnhTuanTam, 'tuan');
    window.gvcn_AnhNoiDungTam = []; window.ham_21_9_render_anh('gvcn-vung-preview-anh-nd', window.gvcn_AnhNoiDungTam, 'nd');
    window.gvcn_AnhSuKienTam = []; window.ham_21_9_render_anh('gvcn-vung-preview-anh-sk', window.gvcn_AnhSuKienTam, 'sk');
    window.gvcn_SuKienChoLuu = []; window.ham_21_7_ve_danh_sach_cho();

    document.getElementById('gvcn-bang-noi-dung-cu').innerHTML = '';
    document.getElementById('gvcn-vung-anh-cu-tuan').innerHTML = ''; // Làm sạch vùng ảnh cũ
};




// =====================================================================
// HÀM 21.11: TỰ ĐỘNG BUNG DROPDOWN BẮT AVATAR KHI CHỌN HỌC SINH
// =====================================================================
window.ham_21_11_hien_thi_dropdown_hs_gvcn = function (inputElement) {
    document.querySelectorAll('.custom-dropdown-hs').forEach(el => el.remove());
    if (!window.DanhSachHocSinhLopHienTai || window.DanhSachHocSinhLopHienTai.length === 0) return;

    let tuKhoa = inputElement.value.toLowerCase().trim();
    let dsLoc = window.DanhSachHocSinhLopHienTai.filter(hs =>
        hs.tenHienThi.toLowerCase().includes(tuKhoa) ||
        hs.tenDangNhap.toLowerCase().includes(tuKhoa)
    );
    if (dsLoc.length === 0) return;

    let parent = inputElement.parentElement;
    parent.style.position = 'relative';

    let dropdown = document.createElement('div');
    dropdown.className = 'custom-dropdown-hs';
    dropdown.style.cssText = `position:absolute; top:calc(100% + 4px); left:0; width:100%; min-width:220px; max-height:220px; overflow-y:auto; background:#fff; border:1px solid #1a73e8; border-radius:8px; box-shadow:0 8px 20px rgba(0,0,0,0.15); z-index:999999; display:flex; flex-direction:column; animation:fadeIn 0.2s;`;

    dsLoc.forEach(hs => {
        let item = document.createElement('div');
        item.style.cssText = `display:flex; align-items:center; gap:12px; padding:10px 12px; cursor:pointer; border-bottom:1px solid #f1f3f4;`;
        item.onmouseover = () => item.style.background = '#e8f0fe';
        item.onmouseout = () => item.style.background = '#fff';
        item.innerHTML = `
            <img src="${hs.avatarUrl}" style="width:34px; height:34px; border-radius:50%; object-fit:cover; border:1px solid #dee2e6;">
            <div>
                <div style="font-weight:bold; color:#1a73e8; font-size:13px;">${hs.tenHienThi}</div>
                <div style="font-size:11px; color:#6c757d;">${hs.tenDangNhap}</div>
            </div>
        `;
        item.onclick = function (e) {
            e.preventDefault(); e.stopPropagation();
            inputElement.value = hs.chuoiGhep;

            // HIỆN AVATAR NGAY TRÊN DÒNG VỪA CHỌN
            let imgPreview = parent.querySelector('.avatar-preview');
            if (imgPreview) {
                imgPreview.src = hs.avatarUrl;
                imgPreview.style.display = 'block';
            }
            dropdown.remove();
        };
        dropdown.appendChild(item);
    });
    parent.appendChild(dropdown);

    const closeDropdown = (e) => {
        if (e.target !== inputElement && !dropdown.contains(e.target)) {
            dropdown.remove();
            document.removeEventListener('click', closeDropdown);
        }
    };
    setTimeout(() => document.addEventListener('click', closeDropdown), 10);
};

// =====================================================================
// HÀM 21.12: TỰ ĐỘNG TÍNH NGÀY ĐẾN (CHỦ NHẬT) THEO TỪ NGÀY
// =====================================================================
window.ham_21_12_tu_dong_tinh_ngay_den = function () {
    const tuNgayVal = document.getElementById('gvcn-tuan-tu').value;
    if (!tuNgayVal) return;

    let d = new Date(tuNgayVal);
    let day = d.getDay(); // 0 is Sunday
    let diff = day === 0 ? 0 : 7 - day;

    d.setDate(d.getDate() + diff);
    document.getElementById('gvcn-tuan-den').value = d.toISOString().split('T')[0];
};

// // =====================================================================
// // HÀM 21.13: LƯU NỘI DUNG TUẦN & TẠO SỰ KIỆN GIAO VIỆC (THIẾT KẾ TABLE RIÊNG)
// // =====================================================================
// window.ham_21_13_luu_noi_dung_tuan = async function (btn) {
//     const maLop = document.getElementById('gvcn-input-lop').value.match(/\(([^)]+)\)$/)?.[1]?.trim();
//     const tuan = document.getElementById('gvcn-input-tuan').value.trim();
//     const tenNoiDung = document.getElementById('gvcn-nd-ten').value.trim();
//     const ngayNhap = document.getElementById('gvcn-nd-ngay').value;
//     const tuNgay = document.getElementById('gvcn-tuan-tu').value;
//     const chiTiet = document.getElementById('gvcn-nd-chitiet').value.trim();

//     if (!maLop || !tuan) { alert("⚠️ Vui lòng chọn Lớp và nhập Tuần học!"); return; }
//     if (!tenNoiDung) { alert("⚠️ Vui lòng nhập Tên Nội dung / Công việc!"); return; }

//     let oldTxt = btn.innerHTML;
//     let oldBg = btn.style.background || '#6f42c1';
//     btn.innerHTML = "⏳ ĐANG CHUẨN BỊ ẢNH..."; btn.disabled = true;

//     try {
//         // 1. UPLOAD ẢNH CÓ THANH TIẾN TRÌNH TRỰC QUAN
//         let mangLinkAnh = [];
//         if (window.gvcn_AnhNoiDungTam && window.gvcn_AnhNoiDungTam.length > 0) {
//             for (let k = 0; k < window.gvcn_AnhNoiDungTam.length; k++) {
//                 let f = window.gvcn_AnhNoiDungTam[k];
//                 let b64 = await window.ham_ho_tro_doc_anh_base64(f);
//                 let payload = { action: "upload_anh_nhat_ky", base64: b64, mimeType: f.type, fileName: `ND_${Date.now()}.jpg`, maLop: maLop, loaiAnh: "GVCN_ND" };

//                 let res = await window.ham_ho_tro_upload_anh_co_tien_trinh(
//                     CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP,
//                     payload,
//                     function (phanTram, daTai, tongSo) {
//                         let strDaTai = window.ham_dinh_dang_dung_luong(daTai);
//                         let strTongSo = window.ham_dinh_dang_dung_luong(tongSo);
//                         btn.style.background = `linear-gradient(90deg, #17a2b8 ${phanTram}%, #6c757d ${phanTram}%)`;
//                         btn.innerHTML = `🚀 ĐANG TẢI ẢNH (${k + 1}/${window.gvcn_AnhNoiDungTam.length})<br><span style="font-size: 11px; font-weight: normal;">${strDaTai} / ${strTongSo} (${phanTram}%)</span>`;
//                     }
//                 );
//                 if (res.status === 'success') mangLinkAnh.push(res.url);
//             }
//         }

//         btn.style.background = oldBg;
//         btn.innerHTML = "⏳ ĐANG LƯU DỮ LIỆU NỘI DUNG...";

//         // 2. GOM DANH SÁCH NGƯỜI NHẬN
//         let mangNguoiNhan = [];
//         document.querySelectorAll('.dong-nguoi-nhan').forEach(dong => {
//             let hsInput = dong.querySelector('.gvcn-input-hs').value.trim();
//             if (hsInput) {
//                 let uidHS = null;
//                 let tenDangNhap = '';
//                 if (window.DanhSachHocSinhLopHienTai) {
//                     let hsObj = window.DanhSachHocSinhLopHienTai.find(h => h.chuoiGhep === hsInput);
//                     if (hsObj) {
//                         uidHS = hsObj.uid;
//                         tenDangNhap = hsObj.tenDangNhap;
//                     }
//                 }
//                 let tenHS = hsInput.split(' - ')[0].trim();
//                 let phanViec = dong.querySelector('.gvcn-input-phan-viec').value.trim();
//                 let danhGia = dong.querySelector('.gvcn-sel-danhgia').value;
//                 let ghiChu = dong.querySelector('.gvcn-input-note').value.trim();

//                 mangNguoiNhan.push({ uid: uidHS, ten: tenHS, ten_dang_nhap: tenDangNhap, phan_viec: phanViec, danh_gia: danhGia, ghi_chu: ghiChu });
//             }
//         });

//         // 3. TÌM HOẶC TẠO SỔ GỐC CỦA TUẦN (BẢNG nhat_ky_gvcn) ĐỂ LẤY ID
//         let idNhatKyGVCN = null;
//         const { data: oldData } = await _supabase.from('nhat_ky_gvcn')
//             .select('id')
//             .eq('ma_lop', maLop).eq('tuan_hoc', tuan).maybeSingle();

//         if (oldData) {
//             idNhatKyGVCN = oldData.id;
//         } else {
//             let payloadInsert = {
//                 ma_lop: maLop,
//                 tuan_hoc: tuan,
//                 ngay_ghi: tuNgay || new Date().toISOString().split('T')[0],
//                 trang_thai: 1
//             };
//             const { data: newNK, error: errInsert } = await _supabase.from('nhat_ky_gvcn').insert([payloadInsert]).select();
//             if (errInsert) throw errInsert;
//             idNhatKyGVCN = newNK[0].id;
//         }

//         // 🌟 4. LƯU CÔNG VIỆC THÀNH 1 DÒNG ĐỘC LẬP VÀO BẢNG MỚI nhat_ky_gvcn_noi_dung
//         const { error: errND } = await _supabase.from('nhat_ky_gvcn_noi_dung').insert([{
//             id_gvcn_nhat_ky: idNhatKyGVCN,
//             ngay_nhap: ngayNhap,
//             ten_noi_dung: tenNoiDung,
//             chi_tiet: chiTiet,
//             nguoi_nhan: mangNguoiNhan, // Mảng này mỏng, lưu JSONB là đẹp
//             anh_dinh_kem: mangLinkAnh
//         }]);
//         if (errND) throw errND;

//         // 5. ĐẨY GIAO VIỆC VÀO HỒ SƠ TỪNG HỌC SINH (BẢNG nhat_ky_gvcn_su_kien_hs)
//         if (mangNguoiNhan.length > 0 && idNhatKyGVCN) {
//             btn.innerHTML = "⏳ ĐANG GHI SỰ KIỆN CHO TỪNG HỌC SINH...";
//             let mangSuKienGiaoViec = [];

//             mangNguoiNhan.forEach(hs => {
//                 if (hs.uid) {
//                     // Tô màu thẻ theo đánh giá để lúc lọc báo cáo nhìn đẹp hơn
//                     let mauThe = '#007bff'; // Xanh dương
//                     if (hs.danh_gia === 'Tốt') mauThe = '#28a745';
//                     else if (hs.danh_gia === 'Khá') mauThe = '#17a2b8';
//                     else if (hs.danh_gia === 'Trung Bình') mauThe = '#fd7e14';
//                     else if (hs.danh_gia === 'Chưa đạt') mauThe = '#dc3545';

//                     mangSuKienGiaoViec.push({
//                         id_gvcn_nhat_ky: idNhatKyGVCN,
//                         uid_hoc_sinh: hs.uid,
//                         ten_dang_nhap_hoc_sinh: hs.ten_dang_nhap,
//                         ten_hoc_sinh: hs.ten,
//                         nhom_su_kien: `Giao việc: ${tenNoiDung}`,
//                         noi_dung_chi_tiet: `Phần việc: ${hs.phan_viec}` + (hs.ghi_chu ? ` - Ghi chú: ${hs.ghi_chu}` : ''),
//                         hinh_thuc_xu_ly: hs.danh_gia || 'Chưa đánh giá',
//                         ngay_ghi_nhan: ngayNhap.split('T')[0],
//                         muc_do: 0, // Không trừ điểm
//                         thong_tin_mo_rong: { mau_sac: mauThe, phan_loai: 'giao_viec' }
//                     });
//                 }
//             });

//             if (mangSuKienGiaoViec.length > 0) {
//                 const { error: errSK } = await _supabase.from('nhat_ky_gvcn_su_kien_hs').insert(mangSuKienGiaoViec);
//                 if (errSK) throw errSK;
//             }
//         }

//         alert("✅ Đã lưu Nội dung Giao việc và Ghi nhận sự kiện cho Học sinh thành công!");

//         // 6. XÓA SẠCH FORM SAU KHI LƯU
//         document.getElementById('gvcn-nd-ten').value = '';
//         document.getElementById('gvcn-nd-chitiet').value = '';
//         document.querySelectorAll('.dong-nguoi-nhan').forEach((o, i) => {
//             if (i > 0) o.remove();
//             else {
//                 o.querySelector('.gvcn-input-hs').value = '';
//                 o.querySelector('.gvcn-input-phan-viec').value = '';
//                 o.querySelector('.gvcn-sel-danhgia').value = '';
//                 o.querySelector('.gvcn-input-note').value = '';
//                 let img = o.querySelector('.avatar-preview');
//                 if (img) img.style.display = 'none';
//             }
//         });
//         window.gvcn_AnhNoiDungTam = [];
//         window.ham_21_9_render_anh('gvcn-vung-preview-anh-nd', window.gvcn_AnhNoiDungTam, 'nd');

//     } catch (e) {
//         console.error(e);
//         alert("❌ Lỗi: " + e.message);
//     }
//     finally {
//         btn.style.background = oldBg;
//         btn.innerHTML = oldTxt;
//         btn.disabled = false;
//     }
// };


// // =====================================================================
// // HÀM 21.13: LƯU NỘI DUNG TUẦN & TẠO SỰ KIỆN GIAO VIỆC
// // =====================================================================
// window.ham_21_13_luu_noi_dung_tuan = async function (btn) {
//     const maLop = document.getElementById('gvcn-input-lop').value.match(/\(([^)]+)\)$/)?.[1]?.trim();
//     const tuan = document.getElementById('gvcn-input-tuan').value.trim();
//     const tenNoiDung = document.getElementById('gvcn-nd-ten').value.trim();
//     const ngayNhap = document.getElementById('gvcn-nd-ngay').value;
//     const tuNgay = document.getElementById('gvcn-tuan-tu').value;
//     const chiTiet = document.getElementById('gvcn-nd-chitiet').value.trim();

//     if (!maLop || !tuan) { alert("⚠️ Vui lòng chọn Lớp và nhập Tuần học!"); return; }
//     if (!tenNoiDung) { alert("⚠️ Vui lòng nhập Tên Nội dung / Công việc!"); return; }

//     let oldTxt = btn.innerHTML;
//     let oldBg = btn.style.background || '#0056b3';
//     btn.innerHTML = "⏳ ĐANG CHUẨN BỊ ẢNH..."; btn.disabled = true;

//     try {
//         let mangLinkAnh = [];
//         if (window.gvcn_AnhNoiDungTam && window.gvcn_AnhNoiDungTam.length > 0) {
//             for (let k = 0; k < window.gvcn_AnhNoiDungTam.length; k++) {
//                 let f = window.gvcn_AnhNoiDungTam[k];
//                 let b64 = await window.ham_ho_tro_doc_anh_base64(f);
//                 // 🌟 SỬ DỤNG ACTION VÀ LOẠI ẢNH MỚI
//                 let payload = { action: "upload_anh_nhat_ky_gvcn", base64: b64, mimeType: f.type, fileName: `ND_${Date.now()}.jpg`, maLop: maLop, loaiAnh: "GVCN_ND" };

//                 let res = await window.ham_ho_tro_upload_anh_co_tien_trinh(
//                     CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP,
//                     payload,
//                     function (phanTram, daTai, tongSo) {
//                         let strDaTai = window.ham_dinh_dang_dung_luong(daTai);
//                         let strTongSo = window.ham_dinh_dang_dung_luong(tongSo);
//                         btn.style.background = `linear-gradient(90deg, #17a2b8 ${phanTram}%, #6c757d ${phanTram}%)`;
//                         btn.innerHTML = `🚀 ĐANG TẢI ẢNH (${k + 1}/${window.gvcn_AnhNoiDungTam.length})<br><span style="font-size: 11px; font-weight: normal;">${strDaTai} / ${strTongSo} (${phanTram}%)</span>`;
//                     }
//                 );
//                 if (res.status === 'success') mangLinkAnh.push(res.url);
//             }
//         }

//         btn.style.background = oldBg;
//         btn.innerHTML = "⏳ ĐANG LƯU DỮ LIỆU NỘI DUNG...";

//         let mangNguoiNhan = [];
//         document.querySelectorAll('.dong-nguoi-nhan').forEach(dong => {
//             let hsInput = dong.querySelector('.gvcn-input-hs').value.trim();
//             if (hsInput) {
//                 let uidHS = null, tenDangNhap = '';
//                 if (window.DanhSachHocSinhLopHienTai) {
//                     let hsObj = window.DanhSachHocSinhLopHienTai.find(h => h.chuoiGhep === hsInput);
//                     if (hsObj) { uidHS = hsObj.uid; tenDangNhap = hsObj.tenDangNhap; }
//                 }
//                 mangNguoiNhan.push({
//                     uid: uidHS, ten: hsInput.split(' - ')[0].trim(), ten_dang_nhap: tenDangNhap,
//                     phan_viec: dong.querySelector('.gvcn-input-phan-viec').value.trim(),
//                     danh_gia: dong.querySelector('.gvcn-sel-danhgia').value,
//                     ghi_chu: dong.querySelector('.gvcn-input-note').value.trim()
//                 });
//             }
//         });

//         let idNhatKyGVCN = null;
//         const { data: oldData } = await _supabase.from('nhat_ky_gvcn').select('id').eq('ma_lop', maLop).eq('tuan_hoc', tuan).maybeSingle();

//         if (oldData) {
//             idNhatKyGVCN = oldData.id;
//         } else {
//             let payloadInsert = { ma_lop: maLop, tuan_hoc: tuan, tu_ngay: tuNgay || new Date().toISOString().split('T')[0], trang_thai: 1 };
//             const { data: newNK, error: errInsert } = await _supabase.from('nhat_ky_gvcn').insert([payloadInsert]).select();
//             if (errInsert) throw errInsert;
//             idNhatKyGVCN = newNK[0].id;
//         }

//         await _supabase.from('nhat_ky_gvcn_noi_dung').insert([{
//             id_gvcn_nhat_ky: idNhatKyGVCN, ngay_nhap: ngayNhap, ten_noi_dung: tenNoiDung, chi_tiet: chiTiet,
//             nguoi_nhan: mangNguoiNhan, anh_dinh_kem: mangLinkAnh
//         }]);

//         if (mangNguoiNhan.length > 0 && idNhatKyGVCN) {
//             btn.innerHTML = "⏳ ĐANG GHI SỰ KIỆN CHO TỪNG HỌC SINH...";
//             let mangSuKienGiaoViec = [];
//             mangNguoiNhan.forEach(hs => {
//                 if (hs.uid) {
//                     let mauThe = '#007bff';
//                     if (hs.danh_gia === 'Tốt') mauThe = '#28a745'; else if (hs.danh_gia === 'Khá') mauThe = '#17a2b8'; else if (hs.danh_gia === 'Trung Bình') mauThe = '#fd7e14'; else if (hs.danh_gia === 'Chưa đạt') mauThe = '#dc3545';
//                     mangSuKienGiaoViec.push({
//                         id_gvcn_nhat_ky: idNhatKyGVCN, uid_hoc_sinh: hs.uid, ten_dang_nhap_hoc_sinh: hs.ten_dang_nhap, ten_hoc_sinh: hs.ten,
//                         nhom_su_kien: `Giao việc: ${tenNoiDung}`,
//                         noi_dung_chi_tiet: `Phần việc: ${hs.phan_viec}` + (hs.ghi_chu ? ` - Ghi chú: ${hs.ghi_chu}` : ''),
//                         hinh_thuc_xu_ly: hs.danh_gia || 'Chưa đánh giá', ngay_ghi_nhan: ngayNhap.split('T')[0], muc_do: 0,
//                         thong_tin_mo_rong: { mau_sac: mauThe, phan_loai: 'giao_viec' }
//                     });
//                 }
//             });
//             if (mangSuKienGiaoViec.length > 0) await _supabase.from('nhat_ky_gvcn_su_kien_hs').insert(mangSuKienGiaoViec);
//         }

//         alert("✅ Đã lưu Nội dung Giao việc thành công!");
//         document.getElementById('gvcn-nd-ten').value = '';
//         document.getElementById('gvcn-nd-chitiet').value = '';
//         document.querySelectorAll('.dong-nguoi-nhan').forEach((o, i) => {
//             if (i > 0) o.remove();
//             else { o.querySelector('.gvcn-input-hs').value = ''; o.querySelector('.gvcn-input-phan-viec').value = ''; o.querySelector('.gvcn-sel-danhgia').value = ''; o.querySelector('.gvcn-input-note').value = ''; let img = o.querySelector('.avatar-preview'); if (img) img.style.display = 'none'; }
//         });
//         window.gvcn_AnhNoiDungTam = []; window.ham_21_9_render_anh('gvcn-vung-preview-anh-nd', window.gvcn_AnhNoiDungTam, 'nd');

//         if (typeof window.ham_21_16_tai_du_lieu_tuan === 'function') window.ham_21_16_tai_du_lieu_tuan();
//     } catch (e) { console.error(e); alert("❌ Lỗi: " + e.message); }
//     finally { btn.style.background = oldBg; btn.innerHTML = oldTxt; btn.disabled = false; }
// };


// // =====================================================================
// // HÀM 21.13: LƯU NỘI DUNG TUẦN & GIAO VIỆC (LƯU KÈM THUỘC TÍNH TRẠNG THÁI)
// // =====================================================================
// window.ham_21_13_luu_noi_dung_tuan = async function (btn) {
//     const maLop = document.getElementById('gvcn-input-lop').value.match(/\(([^)]+)\)$/)?.[1]?.trim();
//     const tuan = document.getElementById('gvcn-input-tuan').value.trim();
//     const tenNoiDung = document.getElementById('gvcn-nd-ten').value.trim();
//     const ngayNhap = document.getElementById('gvcn-nd-ngay').value;
//     const tuNgay = document.getElementById('gvcn-tuan-tu').value;
//     const chiTiet = document.getElementById('gvcn-nd-chitiet').value.trim();

//     if (!maLop || !tuan) { alert("⚠️ Vui lòng chọn Lớp và nhập Tuần học!"); return; }
//     if (!tenNoiDung) { alert("⚠️ Vui lòng nhập Tên Nội dung / Công việc!"); return; }

//     let oldTxt = btn.innerHTML;
//     let oldBg = btn.style.background || '#0056b3';
//     btn.innerHTML = "⏳ ĐANG CHUẨN BỊ ẢNH..."; btn.disabled = true;

//     const d = new Date();
//     const timeStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}_${String(d.getHours()).padStart(2, '0')}h${String(d.getMinutes()).padStart(2, '0')}m${String(d.getSeconds()).padStart(2, '0')}s`;
//     const cleanStr = (s) => s ? s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").replace(/\s+/g, "_") : "";
//     const tuanClean = cleanStr(tuan);

//     try {
//         let mangLinkAnh = [];
//         if (window.gvcn_AnhNoiDungTam && window.gvcn_AnhNoiDungTam.length > 0) {
//             for (let k = 0; k < window.gvcn_AnhNoiDungTam.length; k++) {
//                 let f = window.gvcn_AnhNoiDungTam[k];
//                 let b64 = await window.ham_ho_tro_doc_anh_base64(f);

//                 let tenFile = `NoiDung_[${timeStr}]_Lop[${maLop}]_Tuan[${tuanClean}]_Anh[${k + 1}].jpg`;
//                 let payload = { action: "upload_anh_nhat_ky_gvcn", base64: b64, mimeType: f.type, fileName: tenFile, maLop: maLop, loaiAnh: "GVCN_ND" };

//                 let res = await window.ham_ho_tro_upload_anh_co_tien_trinh(
//                     CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, payload,
//                     function (phanTram, daTai, tongSo) {
//                         let strDaTai = window.ham_dinh_dang_dung_luong(daTai);
//                         let strTongSo = window.ham_dinh_dang_dung_luong(tongSo);
//                         btn.style.background = `linear-gradient(90deg, #17a2b8 ${phanTram}%, #6c757d ${phanTram}%)`;
//                         btn.innerHTML = `🚀 ĐANG TẢI ẢNH (${k + 1}/${window.gvcn_AnhNoiDungTam.length})<br><span style="font-size: 11px; font-weight: normal;">${strDaTai} / ${strTongSo} (${phanTram}%)</span>`;
//                     }
//                 );
//                 if (res.status === 'success') mangLinkAnh.push(res.url);
//             }
//         }

//         btn.style.background = oldBg;
//         btn.innerHTML = "⏳ ĐANG LƯU DỮ LIỆU NỘI DUNG...";

//         let mangNguoiNhan = [];
//         document.querySelectorAll('.dong-nguoi-nhan').forEach(dong => {
//             let hsInput = dong.querySelector('.gvcn-input-hs').value.trim();
//             if (hsInput) {
//                 let uidHS = null, tenDangNhap = '';
//                 if (window.DanhSachHocSinhLopHienTai) {
//                     let hsObj = window.DanhSachHocSinhLopHienTai.find(h => h.chuoiGhep === hsInput);
//                     if (hsObj) { uidHS = hsObj.uid; tenDangNhap = hsObj.tenDangNhap; }
//                 }
//                 mangNguoiNhan.push({
//                     uid: uidHS, ten: hsInput.split(' - ')[0].trim(), ten_dang_nhap: tenDangNhap,
//                     phan_viec: dong.querySelector('.gvcn-input-phan-viec').value.trim(),
//                     // 🌟 LẤY GIÁ TRỊ TRẠNG THÁI
//                     trang_thai: dong.querySelector('.gvcn-sel-trangthai') ? dong.querySelector('.gvcn-sel-trangthai').value : '',
//                     danh_gia: dong.querySelector('.gvcn-sel-danhgia').value,
//                     ghi_chu: dong.querySelector('.gvcn-input-note').value.trim()
//                 });
//             }
//         });

//         let idNhatKyGVCN = null;
//         const { data: oldData } = await _supabase.from('nhat_ky_gvcn').select('id').eq('ma_lop', maLop).eq('tuan_hoc', tuan).maybeSingle();
//         if (oldData) { idNhatKyGVCN = oldData.id; } else {
//             let payloadInsert = { ma_lop: maLop, tuan_hoc: tuan, tu_ngay: tuNgay || new Date().toISOString().split('T')[0], trang_thai: 1 };
//             const { data: newNK, error: errInsert } = await _supabase.from('nhat_ky_gvcn').insert([payloadInsert]).select();
//             if (errInsert) throw errInsert; idNhatKyGVCN = newNK[0].id;
//         }

//         await _supabase.from('nhat_ky_gvcn_noi_dung').insert([{ id_gvcn_nhat_ky: idNhatKyGVCN, ngay_nhap: ngayNhap, ten_noi_dung: tenNoiDung, chi_tiet: chiTiet, nguoi_nhan: mangNguoiNhan, anh_dinh_kem: mangLinkAnh }]);

//         if (mangNguoiNhan.length > 0 && idNhatKyGVCN) {
//             btn.innerHTML = "⏳ ĐANG GHI SỰ KIỆN CHO TỪNG HỌC SINH...";
//             let mangSuKienGiaoViec = [];
//             mangNguoiNhan.forEach(hs => {
//                 if (hs.uid) {
//                     let mauThe = '#007bff';
//                     if (hs.danh_gia === 'Tốt') mauThe = '#28a745'; else if (hs.danh_gia === 'Khá') mauThe = '#17a2b8'; else if (hs.danh_gia === 'Trung Bình') mauThe = '#fd7e14'; else if (hs.danh_gia === 'Chưa đạt') mauThe = '#dc3545';
//                     mangSuKienGiaoViec.push({
//                         id_gvcn_nhat_ky: idNhatKyGVCN, uid_hoc_sinh: hs.uid, ten_dang_nhap_hoc_sinh: hs.ten_dang_nhap, ten_hoc_sinh: hs.ten,
//                         nhom_su_kien: `Giao việc: ${tenNoiDung} [${hs.trang_thai}]`, noi_dung_chi_tiet: `Phần việc: ${hs.phan_viec}` + (hs.ghi_chu ? ` - Ghi chú: ${hs.ghi_chu}` : ''),
//                         hinh_thuc_xu_ly: hs.danh_gia || 'Chưa đánh giá', ngay_ghi_nhan: ngayNhap.split('T')[0], muc_do: 0,
//                         thong_tin_mo_rong: { mau_sac: mauThe, phan_loai: 'giao_viec' }
//                     });
//                 }
//             });
//             if (mangSuKienGiaoViec.length > 0) await _supabase.from('nhat_ky_gvcn_su_kien_hs').insert(mangSuKienGiaoViec);
//         }

//         alert("✅ Đã lưu Nội dung Giao việc thành công!");
//         document.getElementById('gvcn-nd-ten').value = ''; document.getElementById('gvcn-nd-chitiet').value = '';
//         document.querySelectorAll('.dong-nguoi-nhan').forEach((o, i) => {
//             if (i > 0) o.remove();
//             else {
//                 o.querySelector('.gvcn-input-hs').value = '';
//                 o.querySelector('.gvcn-input-phan-viec').value = '';
//                 let tt = o.querySelector('.gvcn-sel-trangthai'); if (tt) tt.value = 'Đang làm';
//                 o.querySelector('.gvcn-sel-danhgia').value = '';
//                 o.querySelector('.gvcn-input-note').value = '';
//                 let img = o.querySelector('.avatar-preview'); if (img) img.style.display = 'none';
//             }
//         });
//         window.gvcn_AnhNoiDungTam = []; window.ham_21_9_render_anh('gvcn-vung-preview-anh-nd', window.gvcn_AnhNoiDungTam, 'nd');
//         if (typeof window.ham_21_16_tai_du_lieu_tuan === 'function') window.ham_21_16_tai_du_lieu_tuan();
//     } catch (e) { console.error(e); alert("❌ Lỗi: " + e.message); }
//     finally { btn.style.background = oldBg; btn.innerHTML = oldTxt; btn.disabled = false; }
// };

// // =====================================================================
// // HÀM 21.13: LƯU NỘI DUNG TUẦN & GIAO VIỆC
// // =====================================================================
// window.ham_21_13_luu_noi_dung_tuan = async function (btn) {
//     const maLop = document.getElementById('gvcn-input-lop').value.match(/\(([^)]+)\)$/)?.[1]?.trim();
//     const tuan = document.getElementById('gvcn-input-tuan').value.trim();
//     const tenNoiDung = document.getElementById('gvcn-nd-ten').value.trim();
//     const ngayNhap = document.getElementById('gvcn-nd-ngay').value;
//     const tuNgay = document.getElementById('gvcn-tuan-tu').value;
//     const chiTiet = document.getElementById('gvcn-nd-chitiet').value.trim();

//     if (!maLop || !tuan) { alert("⚠️ Vui lòng chọn Lớp và nhập Tuần học!"); return; }
//     if (!tenNoiDung) { alert("⚠️ Vui lòng nhập Tên Nội dung / Công việc!"); return; }

//     let oldTxt = btn.innerHTML;
//     let oldBg = btn.style.background || '#0056b3';
//     btn.innerHTML = "⏳ ĐANG CHUẨN BỊ ẢNH..."; btn.disabled = true;

//     const d = new Date();
//     const timeStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}_${String(d.getHours()).padStart(2, '0')}h${String(d.getMinutes()).padStart(2, '0')}m${String(d.getSeconds()).padStart(2, '0')}s`;
//     const cleanStr = (s) => s ? s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").replace(/\s+/g, "_") : "";
//     const tuanClean = cleanStr(tuan);

//     try {
//         let mangLinkAnh = [];
//         if (window.gvcn_AnhNoiDungTam && window.gvcn_AnhNoiDungTam.length > 0) {
//             for (let k = 0; k < window.gvcn_AnhNoiDungTam.length; k++) {
//                 let f = window.gvcn_AnhNoiDungTam[k];
//                 let b64 = await window.ham_ho_tro_doc_anh_base64(f);

//                 let tenFile = `NoiDung_[${timeStr}]_Lop[${maLop}]_Tuan[${tuanClean}]_Anh[${k + 1}].jpg`;
//                 let payload = { action: "upload_anh_nhat_ky_gvcn", base64: b64, mimeType: f.type, fileName: tenFile, maLop: maLop, loaiAnh: "GVCN_ND" };

//                 let res = await window.ham_ho_tro_upload_anh_co_tien_trinh(
//                     CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, payload,
//                     function (phanTram, daTai, tongSo) {
//                         let strDaTai = window.ham_dinh_dang_dung_luong(daTai);
//                         let strTongSo = window.ham_dinh_dang_dung_luong(tongSo);
//                         btn.style.background = `linear-gradient(90deg, #17a2b8 ${phanTram}%, #6c757d ${phanTram}%)`;
//                         btn.innerHTML = `🚀 ĐANG TẢI ẢNH (${k + 1}/${window.gvcn_AnhNoiDungTam.length})<br><span style="font-size: 11px; font-weight: normal;">${strDaTai} / ${strTongSo} (${phanTram}%)</span>`;
//                     }
//                 );
//                 if (res.status === 'success') mangLinkAnh.push(res.url);
//             }
//         }

//         btn.style.background = oldBg;
//         btn.innerHTML = "⏳ ĐANG LƯU DỮ LIỆU NỘI DUNG...";

//         let mangNguoiNhan = [];
//         document.querySelectorAll('.dong-nguoi-nhan').forEach(dong => {
//             let hsInput = dong.querySelector('.gvcn-input-hs').value.trim();
//             if (hsInput) {
//                 let uidHS = null, tenDangNhap = '';
//                 if (window.DanhSachHocSinhLopHienTai) {
//                     let hsObj = window.DanhSachHocSinhLopHienTai.find(h => h.chuoiGhep === hsInput);
//                     if (hsObj) { uidHS = hsObj.uid; tenDangNhap = hsObj.tenDangNhap; }
//                 }
//                 mangNguoiNhan.push({
//                     uid: uidHS, ten: hsInput.split(' - ')[0].trim(), ten_dang_nhap: tenDangNhap,
//                     phan_viec: dong.querySelector('.gvcn-input-phan-viec').value.trim(),
//                     trang_thai: dong.querySelector('.gvcn-sel-trangthai') ? dong.querySelector('.gvcn-sel-trangthai').value : 'Chưa làm',
//                     danh_gia: dong.querySelector('.gvcn-sel-danhgia').value,
//                     ghi_chu: dong.querySelector('.gvcn-input-note').value.trim()
//                 });
//             }
//         });

//         let idNhatKyGVCN = null;
//         const { data: oldData } = await _supabase.from('nhat_ky_gvcn').select('id').eq('ma_lop', maLop).eq('tuan_hoc', tuan).maybeSingle();
//         if (oldData) { idNhatKyGVCN = oldData.id; } else {
//             let payloadInsert = { ma_lop: maLop, tuan_hoc: tuan, tu_ngay: tuNgay || new Date().toISOString().split('T')[0], trang_thai: 1 };
//             const { data: newNK, error: errInsert } = await _supabase.from('nhat_ky_gvcn').insert([payloadInsert]).select();
//             if (errInsert) throw errInsert; idNhatKyGVCN = newNK[0].id;
//         }

//         await _supabase.from('nhat_ky_gvcn_noi_dung').insert([{ id_gvcn_nhat_ky: idNhatKyGVCN, ngay_nhap: ngayNhap, ten_noi_dung: tenNoiDung, chi_tiet: chiTiet, nguoi_nhan: mangNguoiNhan, anh_dinh_kem: mangLinkAnh }]);

//         if (mangNguoiNhan.length > 0 && idNhatKyGVCN) {
//             btn.innerHTML = "⏳ ĐANG GHI SỰ KIỆN CHO TỪNG HỌC SINH...";
//             let mangSuKienGiaoViec = [];
//             mangNguoiNhan.forEach(hs => {
//                 if (hs.uid) {
//                     let mauThe = '#007bff';
//                     if (hs.danh_gia === 'Tốt') mauThe = '#28a745'; else if (hs.danh_gia === 'Khá') mauThe = '#17a2b8'; else if (hs.danh_gia === 'Trung Bình') mauThe = '#fd7e14'; else if (hs.danh_gia === 'Chưa đạt') mauThe = '#dc3545';
//                     mangSuKienGiaoViec.push({
//                         id_gvcn_nhat_ky: idNhatKyGVCN, uid_hoc_sinh: hs.uid, ten_dang_nhap_hoc_sinh: hs.ten_dang_nhap, ten_hoc_sinh: hs.ten,
//                         nhom_su_kien: `Giao việc: ${tenNoiDung} [${hs.trang_thai}]`, noi_dung_chi_tiet: `Phần việc: ${hs.phan_viec}` + (hs.ghi_chu ? ` - Ghi chú: ${hs.ghi_chu}` : ''),
//                         hinh_thuc_xu_ly: hs.danh_gia || 'Chưa đánh giá', ngay_ghi_nhan: ngayNhap.split('T')[0], muc_do: 0,
//                         thong_tin_mo_rong: { mau_sac: mauThe, phan_loai: 'giao_viec' }
//                     });
//                 }
//             });
//             if (mangSuKienGiaoViec.length > 0) await _supabase.from('nhat_ky_gvcn_su_kien_hs').insert(mangSuKienGiaoViec);
//         }

//         alert("✅ Đã lưu Nội dung Giao việc thành công!");
//         document.getElementById('gvcn-nd-ten').value = ''; document.getElementById('gvcn-nd-chitiet').value = '';
//         document.querySelectorAll('.dong-nguoi-nhan').forEach((o, i) => {
//             if (i > 0) o.remove();
//             else {
//                 o.querySelector('.gvcn-input-hs').value = '';
//                 o.querySelector('.gvcn-input-phan-viec').value = '';
//                 let tt = o.querySelector('.gvcn-sel-trangthai'); if (tt) tt.value = 'Chưa làm';
//                 o.querySelector('.gvcn-sel-danhgia').value = '';
//                 o.querySelector('.gvcn-input-note').value = '';
//                 let img = o.querySelector('.avatar-preview'); if (img) img.style.display = 'none';
//             }
//         });
//         window.gvcn_AnhNoiDungTam = []; window.ham_21_9_render_anh('gvcn-vung-preview-anh-nd', window.gvcn_AnhNoiDungTam, 'nd');
//         if (typeof window.ham_21_16_tai_du_lieu_tuan === 'function') window.ham_21_16_tai_du_lieu_tuan();
//     } catch (e) { console.error(e); alert("❌ Lỗi: " + e.message); }
//     finally { btn.style.background = oldBg; btn.innerHTML = oldTxt; btn.disabled = false; }
// };


// // =====================================================================
// // HÀM 21.13: LƯU NỘI DUNG (CÓ ĐỒNG BỘ UPLOAD ẢNH MINH CHỨNG CỦA TỪNG HS)
// // =====================================================================
// window.ham_21_13_luu_noi_dung_tuan = async function (btn) {
//     const maLop = document.getElementById('gvcn-input-lop').value.match(/\(([^)]+)\)$/)?.[1]?.trim();
//     const tuan = document.getElementById('gvcn-input-tuan').value.trim();
//     const tenNoiDung = document.getElementById('gvcn-nd-ten').value.trim();
//     const ngayNhap = document.getElementById('gvcn-nd-ngay').value;
//     const tuNgay = document.getElementById('gvcn-tuan-tu').value;
//     const chiTiet = document.getElementById('gvcn-nd-chitiet').value.trim();

//     if (!maLop || !tuan) { alert("⚠️ Vui lòng chọn Lớp và nhập Tuần học!"); return; }
//     if (!tenNoiDung) { alert("⚠️ Vui lòng nhập Tên Nội dung / Công việc!"); return; }

//     let oldTxt = btn.innerHTML;
//     let oldBg = btn.style.background || '#0056b3';
//     btn.innerHTML = "⏳ ĐANG CHUẨN BỊ ẢNH CHUNG..."; btn.disabled = true;

//     const d = new Date();
//     const timeStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}_${String(d.getHours()).padStart(2, '0')}h${String(d.getMinutes()).padStart(2, '0')}m${String(d.getSeconds()).padStart(2, '0')}s`;
//     const cleanStr = (s) => s ? s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").replace(/\s+/g, "_") : "";
//     const tuanClean = cleanStr(tuan);

//     try {
//         // Upload ảnh chung
//         let mangLinkAnh = [];
//         if (window.gvcn_AnhNoiDungTam && window.gvcn_AnhNoiDungTam.length > 0) {
//             for (let k = 0; k < window.gvcn_AnhNoiDungTam.length; k++) {
//                 let f = window.gvcn_AnhNoiDungTam[k];
//                 let b64 = await window.ham_ho_tro_doc_anh_base64(f);
//                 let tenFile = `NoiDung_[${timeStr}]_Lop[${maLop}]_Tuan[${tuanClean}]_Anh[${k + 1}].jpg`;
//                 let payload = { action: "upload_anh_nhat_ky_gvcn", base64: b64, mimeType: f.type, fileName: tenFile, maLop: maLop, loaiAnh: "GVCN_ND" };
//                 let res = await window.ham_ho_tro_upload_anh_co_tien_trinh(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, payload, function (phanTram) {
//                     btn.innerHTML = `🚀 ĐANG TẢI ẢNH CHUNG (${k + 1}/${window.gvcn_AnhNoiDungTam.length}) - ${phanTram}%`;
//                 });
//                 if (res.status === 'success') mangLinkAnh.push(res.url);
//             }
//         }

//         btn.style.background = '#e83e8c';
//         let mangNguoiNhan = [];
//         let cacDongHS = document.querySelectorAll('.dong-nguoi-nhan');

//         // Upload ảnh cá nhân (nếu có) và gom dữ liệu
//         for (let i = 0; i < cacDongHS.length; i++) {
//             let dong = cacDongHS[i];
//             let hsInput = dong.querySelector('.gvcn-input-hs').value.trim();
//             if (hsInput) {
//                 let ten = hsInput.split(' - ')[0].trim();
//                 let uidHS = null, tenDangNhap = '';
//                 if (window.DanhSachHocSinhLopHienTai) {
//                     let hsObj = window.DanhSachHocSinhLopHienTai.find(h => h.chuoiGhep === hsInput);
//                     if (hsObj) { uidHS = hsObj.uid; tenDangNhap = hsObj.tenDangNhap; }
//                 }

//                 // Nếu học sinh này có ảnh minh chứng riêng
//                 let linkAnhCaNhan = '';
//                 if (dong.dataset.anhB64) {
//                     btn.innerHTML = `⏳ ĐANG TẢI ẢNH CỦA: ${ten}...`;
//                     let tenFileHS = `NhiemVu_[${timeStr}]_Lop[${maLop}]_HS[${cleanStr(ten)}].jpg`;
//                     let payloadHS = { action: "upload_anh_nhat_ky_gvcn", base64: dong.dataset.anhB64, mimeType: dong.dataset.anhType, fileName: tenFileHS, maLop: maLop, loaiAnh: "GVCN_NV_HS" };
//                     let resHS = await window.ham_ho_tro_upload_anh_co_tien_trinh(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, payloadHS, function (phanTram) {
//                         btn.innerHTML = `🚀 ĐANG TẢI ẢNH CỦA: ${ten} (${phanTram}%)`;
//                     });
//                     if (resHS.status === 'success') linkAnhCaNhan = resHS.url;
//                 }

//                 mangNguoiNhan.push({
//                     uid: uidHS, ten: ten, ten_dang_nhap: tenDangNhap,
//                     phan_viec: dong.querySelector('.gvcn-input-phan-viec').value.trim(),
//                     trang_thai: dong.querySelector('.gvcn-sel-trangthai') ? dong.querySelector('.gvcn-sel-trangthai').value : 'Chưa làm',
//                     danh_gia: dong.querySelector('.gvcn-sel-danhgia').value,
//                     ghi_chu: dong.querySelector('.gvcn-input-note').value.trim(),
//                     anh_minh_chung: linkAnhCaNhan
//                 });
//             }
//         }

//         btn.style.background = '#0056b3';
//         btn.innerHTML = "⏳ ĐANG LƯU DỮ LIỆU CÔNG VIỆC...";

//         let idNhatKyGVCN = null;
//         const { data: oldData } = await _supabase.from('nhat_ky_gvcn').select('id').eq('ma_lop', maLop).eq('tuan_hoc', tuan).maybeSingle();
//         if (oldData) { idNhatKyGVCN = oldData.id; } else {
//             const { data: newNK, error: errInsert } = await _supabase.from('nhat_ky_gvcn').insert([{ ma_lop: maLop, tuan_hoc: tuan, tu_ngay: tuNgay || new Date().toISOString().split('T')[0], trang_thai: 1 }]).select();
//             if (errInsert) throw errInsert; idNhatKyGVCN = newNK[0].id;
//         }

//         await _supabase.from('nhat_ky_gvcn_noi_dung').insert([{ id_gvcn_nhat_ky: idNhatKyGVCN, ngay_nhap: ngayNhap, ten_noi_dung: tenNoiDung, chi_tiet: chiTiet, nguoi_nhan: mangNguoiNhan, anh_dinh_kem: mangLinkAnh }]);

//         alert("✅ Đã lưu Nội dung Giao việc thành công!");
//         document.getElementById('gvcn-nd-ten').value = ''; document.getElementById('gvcn-nd-chitiet').value = '';
//         document.querySelectorAll('.dong-nguoi-nhan').forEach((o, i) => {
//             if (i > 0) o.remove();
//             else {
//                 o.querySelector('.gvcn-input-hs').value = ''; o.querySelector('.gvcn-input-phan-viec').value = '';
//                 let tt = o.querySelector('.gvcn-sel-trangthai'); if (tt) tt.value = 'Chưa làm';
//                 o.querySelector('.gvcn-sel-danhgia').value = ''; o.querySelector('.gvcn-input-note').value = '';
//                 let img = o.querySelector('.avatar-preview'); if (img) img.style.display = 'none';
//                 // Xóa ảnh cũ
//                 o.removeAttribute('data-anh-b64'); o.removeAttribute('data-anh-type');
//                 o.querySelector('.preview-anh-hs').style.display = 'none'; o.querySelector('.preview-anh-hs').src = '';
//                 o.querySelector('.btn-xoa-anh-hs').style.display = 'none'; o.querySelector('.btn-anh-hs').style.display = 'block';
//             }
//         });
//         window.gvcn_AnhNoiDungTam = []; window.ham_21_9_render_anh('gvcn-vung-preview-anh-nd', window.gvcn_AnhNoiDungTam, 'nd');
//         if (typeof window.ham_21_16_tai_du_lieu_tuan === 'function') window.ham_21_16_tai_du_lieu_tuan();
//     } catch (e) { console.error(e); alert("❌ Lỗi: " + e.message); }
//     finally { btn.style.background = oldBg; btn.innerHTML = oldTxt; btn.disabled = false; }
// };



// // =====================================================================
// // HÀM 21.13: LƯU NỘI DUNG (CÓ TIẾN TRÌNH ?KB/TỔNG KB CHO CẢ ẢNH CHUNG & ẢNH HS)
// // =====================================================================
// window.ham_21_13_luu_noi_dung_tuan = async function (btn) {
//     const maLop = document.getElementById('gvcn-input-lop').value.match(/\(([^)]+)\)$/)?.[1]?.trim();
//     const tuan = document.getElementById('gvcn-input-tuan').value.trim();
//     const tenNoiDung = document.getElementById('gvcn-nd-ten').value.trim();
//     const ngayNhap = document.getElementById('gvcn-nd-ngay').value;
//     const tuNgay = document.getElementById('gvcn-tuan-tu').value;
//     const chiTiet = document.getElementById('gvcn-nd-chitiet').value.trim();

//     if (!maLop || !tuan) { alert("⚠️ Vui lòng chọn Lớp và nhập Tuần học!"); return; }
//     if (!tenNoiDung) { alert("⚠️ Vui lòng nhập Tên Nội dung / Công việc!"); return; }

//     let oldTxt = btn.innerHTML;
//     let oldBg = btn.style.background || '#0056b3';
//     btn.innerHTML = "⏳ ĐANG CHUẨN BỊ ẢNH CHUNG..."; btn.disabled = true;

//     const d = new Date();
//     const timeStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}_${String(d.getHours()).padStart(2, '0')}h${String(d.getMinutes()).padStart(2, '0')}m${String(d.getSeconds()).padStart(2, '0')}s`;
//     const cleanStr = (s) => s ? s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").replace(/\s+/g, "_") : "";
//     const tuanClean = cleanStr(tuan);

//     try {
//         // 🌟 1. TẢI ẢNH CHUNG CỦA NỘI DUNG (CÓ ?KB/TỔNG KB)
//         let mangLinkAnh = [];
//         if (window.gvcn_AnhNoiDungTam && window.gvcn_AnhNoiDungTam.length > 0) {
//             for (let k = 0; k < window.gvcn_AnhNoiDungTam.length; k++) {
//                 let f = window.gvcn_AnhNoiDungTam[k];
//                 let b64 = await window.ham_ho_tro_doc_anh_base64(f);
//                 let tenFile = `NoiDung_[${timeStr}]_Lop[${maLop}]_Tuan[${tuanClean}]_Anh[${k + 1}].jpg`;
//                 let payload = { action: "upload_anh_nhat_ky_gvcn", base64: b64, mimeType: f.type, fileName: tenFile, maLop: maLop, loaiAnh: "GVCN_ND" };

//                 let res = await window.ham_ho_tro_upload_anh_co_tien_trinh(
//                     CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP,
//                     payload,
//                     function (phanTram, daTai, tongSo) {
//                         let strDaTai = window.ham_dinh_dang_dung_luong ? window.ham_dinh_dang_dung_luong(daTai) : `${(daTai / 1024).toFixed(1)} KB`;
//                         let strTongSo = window.ham_dinh_dang_dung_luong ? window.ham_dinh_dang_dung_luong(tongSo) : `${(tongSo / 1024).toFixed(1)} KB`;
//                         btn.style.background = `linear-gradient(90deg, #17a2b8 ${phanTram}%, #6c757d ${phanTram}%)`;
//                         btn.innerHTML = `🚀 ĐANG TẢI ẢNH CHUNG (${k + 1}/${window.gvcn_AnhNoiDungTam.length})<br><span style="font-size: 11px; font-weight: normal;">${strDaTai} / ${strTongSo} (${phanTram}%)</span>`;
//                     }
//                 );
//                 if (res.status === 'success') mangLinkAnh.push(res.url);
//             }
//         }

//         btn.style.background = '#e83e8c';
//         let mangNguoiNhan = [];
//         let cacDongHS = document.querySelectorAll('.dong-nguoi-nhan');

//         // 🌟 2. TẢI ẢNH CỦA TỪNG PHẦN VIỆC (CÓ ?KB/TỔNG KB)
//         for (let i = 0; i < cacDongHS.length; i++) {
//             let dong = cacDongHS[i];
//             let hsInput = dong.querySelector('.gvcn-input-hs').value.trim();
//             if (hsInput) {
//                 let ten = hsInput.split(' - ')[0].trim();
//                 let uidHS = null, tenDangNhap = '';
//                 if (window.DanhSachHocSinhLopHienTai) {
//                     let hsObj = window.DanhSachHocSinhLopHienTai.find(h => h.chuoiGhep === hsInput);
//                     if (hsObj) { uidHS = hsObj.uid; tenDangNhap = hsObj.tenDangNhap; }
//                 }

//                 let linkAnhCaNhan = '';
//                 if (dong.dataset.anhB64) {
//                     let tenFileHS = `NhiemVu_[${timeStr}]_Lop[${maLop}]_HS[${cleanStr(ten)}].jpg`;
//                     let payloadHS = { action: "upload_anh_nhat_ky_gvcn", base64: dong.dataset.anhB64, mimeType: dong.dataset.anhType, fileName: tenFileHS, maLop: maLop, loaiAnh: "GVCN_NV_HS" };

//                     let resHS = await window.ham_ho_tro_upload_anh_co_tien_trinh(
//                         CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP,
//                         payloadHS,
//                         function (phanTram, daTai, tongSo) {
//                             let strDaTai = window.ham_dinh_dang_dung_luong ? window.ham_dinh_dang_dung_luong(daTai) : `${(daTai / 1024).toFixed(1)} KB`;
//                             let strTongSo = window.ham_dinh_dang_dung_luong ? window.ham_dinh_dang_dung_luong(tongSo) : `${(tongSo / 1024).toFixed(1)} KB`;
//                             btn.style.background = `linear-gradient(90deg, #e83e8c ${phanTram}%, #6c757d ${phanTram}%)`;
//                             btn.innerHTML = `🚀 ĐANG TẢI ẢNH: ${ten}<br><span style="font-size: 11px; font-weight: normal;">${strDaTai} / ${strTongSo} (${phanTram}%)</span>`;
//                         }
//                     );
//                     if (resHS.status === 'success') linkAnhCaNhan = resHS.url;
//                 }

//                 mangNguoiNhan.push({
//                     uid: uidHS, ten: ten, ten_dang_nhap: tenDangNhap,
//                     phan_viec: dong.querySelector('.gvcn-input-phan-viec').value.trim(),
//                     trang_thai: dong.querySelector('.gvcn-sel-trangthai') ? dong.querySelector('.gvcn-sel-trangthai').value : 'Chưa làm',
//                     danh_gia: dong.querySelector('.gvcn-sel-danhgia').value,
//                     ghi_chu: dong.querySelector('.gvcn-input-note').value.trim(),
//                     anh_minh_chung: linkAnhCaNhan
//                 });
//             }
//         }

//         btn.style.background = '#0056b3';
//         btn.innerHTML = "⏳ ĐANG LƯU DỮ LIỆU CÔNG VIỆC...";

//         let idNhatKyGVCN = null;
//         const { data: oldData } = await _supabase.from('nhat_ky_gvcn').select('id').eq('ma_lop', maLop).eq('tuan_hoc', tuan).maybeSingle();
//         if (oldData) {
//             idNhatKyGVCN = oldData.id;
//         } else {
//             const { data: newNK, error: errInsert } = await _supabase.from('nhat_ky_gvcn').insert([{ ma_lop: maLop, tuan_hoc: tuan, tu_ngay: tuNgay || new Date().toISOString().split('T')[0], trang_thai: 1 }]).select();
//             if (errInsert) throw errInsert;
//             idNhatKyGVCN = newNK[0].id;
//         }

//         await _supabase.from('nhat_ky_gvcn_noi_dung').insert([{
//             id_gvcn_nhat_ky: idNhatKyGVCN,
//             ngay_nhap: ngayNhap,
//             ten_noi_dung: tenNoiDung,
//             chi_tiet: chiTiet,
//             nguoi_nhan: mangNguoiNhan,
//             anh_dinh_kem: mangLinkAnh
//         }]);

//         alert("✅ Đã lưu Nội dung Giao việc thành công!");
//         document.getElementById('gvcn-nd-ten').value = '';
//         document.getElementById('gvcn-nd-chitiet').value = '';

//         document.querySelectorAll('.dong-nguoi-nhan').forEach((o, i) => {
//             if (i > 0) o.remove();
//             else {
//                 o.querySelector('.gvcn-input-hs').value = '';
//                 o.querySelector('.gvcn-input-phan-viec').value = '';
//                 let tt = o.querySelector('.gvcn-sel-trangthai'); if (tt) tt.value = 'Chưa làm';
//                 o.querySelector('.gvcn-sel-danhgia').value = '';
//                 o.querySelector('.gvcn-input-note').value = '';
//                 let img = o.querySelector('.avatar-preview'); if (img) img.style.display = 'none';

//                 o.removeAttribute('data-anh-b64');
//                 o.removeAttribute('data-anh-type');
//                 o.querySelector('.preview-anh-hs').style.display = 'none';
//                 o.querySelector('.preview-anh-hs').src = '';
//                 let lbl = o.querySelector('.label-size-anh-hs'); if (lbl) lbl.remove();
//                 o.querySelector('.btn-xoa-anh-hs').style.display = 'none';
//                 o.querySelector('.btn-anh-hs').style.display = 'block';
//             }
//         });

//         window.gvcn_AnhNoiDungTam = [];
//         window.ham_21_9_render_anh('gvcn-vung-preview-anh-nd', window.gvcn_AnhNoiDungTam, 'nd');
//         if (typeof window.ham_21_16_tai_du_lieu_tuan === 'function') window.ham_21_16_tai_du_lieu_tuan();
//     } catch (e) {
//         console.error(e);
//         alert("❌ Lỗi: " + e.message);
//     }
//     finally {
//         btn.style.background = oldBg;
//         btn.innerHTML = oldTxt;
//         btn.disabled = false;
//     }
// };



// // =====================================================================
// // HÀM 21.13: LƯU NỘI DUNG (HỖ TRỢ THÊM MỚI VÀ CẬP NHẬT)
// // =====================================================================
// window.ham_21_13_luu_noi_dung_tuan = async function (btn) {
//     const maLop = document.getElementById('gvcn-input-lop').value.match(/\(([^)]+)\)$/)?.[1]?.trim();
//     const tuan = document.getElementById('gvcn-input-tuan').value.trim();
//     const tenNoiDung = document.getElementById('gvcn-nd-ten').value.trim();
//     const ngayNhap = document.getElementById('gvcn-nd-ngay').value;
//     const tuNgay = document.getElementById('gvcn-tuan-tu').value;
//     const chiTiet = document.getElementById('gvcn-nd-chitiet').value.trim();

//     if (!maLop || !tuan) { alert("⚠️ Vui lòng chọn Lớp và nhập Tuần học!"); return; }
//     if (!tenNoiDung) { alert("⚠️ Vui lòng nhập Tên Nội dung / Công việc!"); return; }

//     let isEditMode = window.gvcn_IdNoiDungDangSua ? true : false;

//     let oldTxt = btn.innerHTML;
//     let oldBg = btn.style.background || '#0056b3';
//     btn.innerHTML = "⏳ ĐANG XỬ LÝ ẢNH CHUNG..."; btn.disabled = true;

//     const d = new Date();
//     const timeStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}_${String(d.getHours()).padStart(2, '0')}h${String(d.getMinutes()).padStart(2, '0')}m${String(d.getSeconds()).padStart(2, '0')}s`;
//     const cleanStr = (s) => s ? s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").replace(/\s+/g, "_") : "";
//     const tuanClean = cleanStr(tuan);

//     try {
//         // 1. TẢI ẢNH CHUNG MỚI
//         let mangLinkAnhMoi = [];
//         if (window.gvcn_AnhNoiDungTam && window.gvcn_AnhNoiDungTam.length > 0) {
//             for (let k = 0; k < window.gvcn_AnhNoiDungTam.length; k++) {
//                 let f = window.gvcn_AnhNoiDungTam[k];
//                 let b64 = await window.ham_ho_tro_doc_anh_base64(f);
//                 let tenFile = `NoiDung_[${timeStr}]_Lop[${maLop}]_Tuan[${tuanClean}]_Anh[${k + 1}].jpg`;
//                 let payload = { action: "upload_anh_nhat_ky_gvcn", base64: b64, mimeType: f.type, fileName: tenFile, maLop: maLop, loaiAnh: "GVCN_ND" };

//                 let res = await window.ham_ho_tro_upload_anh_co_tien_trinh(
//                     CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, payload,
//                     function (phanTram, daTai, tongSo) {
//                         let strDaTai = window.ham_dinh_dang_dung_luong ? window.ham_dinh_dang_dung_luong(daTai) : `${(daTai / 1024).toFixed(1)} KB`;
//                         let strTongSo = window.ham_dinh_dang_dung_luong ? window.ham_dinh_dang_dung_luong(tongSo) : `${(tongSo / 1024).toFixed(1)} KB`;
//                         btn.style.background = `linear-gradient(90deg, #17a2b8 ${phanTram}%, #6c757d ${phanTram}%)`;
//                         btn.innerHTML = `🚀 ĐANG TẢI ẢNH CHUNG (${k + 1}/${window.gvcn_AnhNoiDungTam.length})<br><span style="font-size: 11px; font-weight: normal;">${strDaTai} / ${strTongSo}</span>`;
//                     }
//                 );
//                 if (res.status === 'success') mangLinkAnhMoi.push(res.url);
//             }
//         }

//         btn.style.background = '#e83e8c';
//         let mangNguoiNhan = [];
//         let cacDongHS = document.querySelectorAll('.dong-nguoi-nhan');

//         // 2. GOM DATA HỌC SINH VÀ ẢNH CÁ NHÂN
//         for (let i = 0; i < cacDongHS.length; i++) {
//             let dong = cacDongHS[i];
//             let hsInput = dong.querySelector('.gvcn-input-hs').value.trim();
//             if (hsInput) {
//                 let ten = hsInput.split(' - ')[0].trim();
//                 let uidHS = null, tenDangNhap = '';
//                 if (window.DanhSachHocSinhLopHienTai) {
//                     let hsObj = window.DanhSachHocSinhLopHienTai.find(h => h.chuoiGhep === hsInput);
//                     if (hsObj) { uidHS = hsObj.uid; tenDangNhap = hsObj.tenDangNhap; }
//                 }

//                 let linkAnhCaNhan = dong.dataset.anhCu || ''; // Mặc định lấy ảnh cũ (nếu đang Sửa)

//                 // Nếu có ảnh mới upload lên
//                 if (dong.dataset.anhB64) {
//                     let tenFileHS = `NhiemVu_[${timeStr}]_Lop[${maLop}]_HS[${cleanStr(ten)}].jpg`;
//                     let payloadHS = { action: "upload_anh_nhat_ky_gvcn", base64: dong.dataset.anhB64, mimeType: dong.dataset.anhType, fileName: tenFileHS, maLop: maLop, loaiAnh: "GVCN_NV_HS" };

//                     let resHS = await window.ham_ho_tro_upload_anh_co_tien_trinh(
//                         CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, payloadHS,
//                         function (phanTram) {
//                             btn.style.background = `linear-gradient(90deg, #e83e8c ${phanTram}%, #6c757d ${phanTram}%)`;
//                             btn.innerHTML = `🚀 ĐANG TẢI ẢNH: ${ten} (${phanTram}%)`;
//                         }
//                     );
//                     if (resHS.status === 'success') linkAnhCaNhan = resHS.url; // Lấy link mới đè link cũ
//                 }

//                 mangNguoiNhan.push({
//                     uid: uidHS, ten: ten, ten_dang_nhap: tenDangNhap,
//                     phan_viec: dong.querySelector('.gvcn-input-phan-viec').value.trim(),
//                     trang_thai: dong.querySelector('.gvcn-sel-trangthai') ? dong.querySelector('.gvcn-sel-trangthai').value : 'Chưa làm',
//                     danh_gia: dong.querySelector('.gvcn-sel-danhgia').value,
//                     ghi_chu: dong.querySelector('.gvcn-input-note').value.trim(),
//                     anh_minh_chung: linkAnhCaNhan
//                 });
//             }
//         }

//         btn.style.background = '#0056b3';
//         btn.innerHTML = "⏳ ĐANG LƯU DỮ LIỆU VÀO HỆ THỐNG...";

//         // 3. TÌM ID CỦA TUẦN (BẢNG CHA)
//         let idNhatKyGVCN = null;
//         const { data: oldData } = await _supabase.from('nhat_ky_gvcn').select('id').eq('ma_lop', maLop).eq('tuan_hoc', tuan).maybeSingle();
//         if (oldData) {
//             idNhatKyGVCN = oldData.id;
//         } else {
//             const { data: newNK, error: errInsert } = await _supabase.from('nhat_ky_gvcn').insert([{ ma_lop: maLop, tuan_hoc: tuan, tu_ngay: tuNgay || new Date().toISOString().split('T')[0], trang_thai: 1 }]).select();
//             if (errInsert) throw errInsert;
//             idNhatKyGVCN = newNK[0].id;
//         }

//         // 4. UPSERT NỘI DUNG
//         let mangLinkAnhFinal = mangLinkAnhMoi;
//         if (isEditMode) {
//             // Lấy lại mảng ảnh cũ từ RAM để gộp chung với mảng mới tải lên
//             let oldItem = window.gvcn_DanhSachNoiDangHienTai.find(x => x.id === window.gvcn_IdNoiDungDangSua);
//             if (oldItem && oldItem.anh_dinh_kem) mangLinkAnhFinal = oldItem.anh_dinh_kem.concat(mangLinkAnhMoi);

//             await _supabase.from('nhat_ky_gvcn_noi_dung').update({
//                 ngay_nhap: ngayNhap, ten_noi_dung: tenNoiDung, chi_tiet: chiTiet,
//                 nguoi_nhan: mangNguoiNhan, anh_dinh_kem: mangLinkAnhFinal
//             }).eq('id', window.gvcn_IdNoiDungDangSua);
//         } else {
//             await _supabase.from('nhat_ky_gvcn_noi_dung').insert([{
//                 id_gvcn_nhat_ky: idNhatKyGVCN, ngay_nhap: ngayNhap, ten_noi_dung: tenNoiDung,
//                 chi_tiet: chiTiet, nguoi_nhan: mangNguoiNhan, anh_dinh_kem: mangLinkAnhFinal
//             }]);
//         }

//         // 5. CẬP NHẬT SỰ KIỆN QUA HỒ SƠ HS
//         if (idNhatKyGVCN) {
//             btn.innerHTML = "⏳ ĐANG ĐỒNG BỘ SỰ KIỆN HỌC SINH...";

//             // Xóa sạch sự kiện đánh giá cũ của Nhiệm vụ này (nếu đang Sửa)
//             if (isEditMode) {
//                 await _supabase.from('nhat_ky_gvcn_su_kien_hs')
//                     .delete()
//                     .eq('id_gvcn_nhat_ky', idNhatKyGVCN)
//                     .eq('nhom_su_kien', `Giao việc: ${window.gvcn_TenNoiDungCu}`);
//             }

//             // Chèn danh sách sự kiện mới (với thông tin mới nhất)
//             if (mangNguoiNhan.length > 0) {
//                 let mangSuKienGiaoViec = [];
//                 mangNguoiNhan.forEach(hs => {
//                     if (hs.uid) {
//                         let mauThe = '#007bff';
//                         if (hs.danh_gia === 'Tốt') mauThe = '#28a745'; else if (hs.danh_gia === 'Khá') mauThe = '#17a2b8'; else if (hs.danh_gia === 'Trung Bình' || hs.danh_gia === 'TB') mauThe = '#fd7e14'; else if (hs.danh_gia === 'Chưa đạt') mauThe = '#dc3545';
//                         mangSuKienGiaoViec.push({
//                             id_gvcn_nhat_ky: idNhatKyGVCN, uid_hoc_sinh: hs.uid, ten_dang_nhap_hoc_sinh: hs.ten_dang_nhap, ten_hoc_sinh: hs.ten,
//                             nhom_su_kien: `Giao việc: ${tenNoiDung}`,
//                             noi_dung_chi_tiet: `Phần việc: ${hs.phan_viec}` + (hs.ghi_chu ? ` - Ghi chú: ${hs.ghi_chu}` : ''),
//                             hinh_thuc_xu_ly: hs.danh_gia || 'Chưa đánh giá', ngay_ghi_nhan: ngayNhap.split('T')[0], muc_do: 0,
//                             thong_tin_mo_rong: { mau_sac: mauThe, phan_loai: 'giao_viec' }
//                         });
//                     }
//                 });
//                 if (mangSuKienGiaoViec.length > 0) await _supabase.from('nhat_ky_gvcn_su_kien_hs').insert(mangSuKienGiaoViec);
//             }
//         }

//         alert(isEditMode ? "✅ Đã Cập nhật nội dung thành công!" : "✅ Đã lưu Nội dung Giao việc thành công!");

//         // Thoát chế độ Sửa, Clean Form và Nạp lại bảng
//         if (typeof window.ham_21_27_huy_sua_noi_dung === 'function') window.ham_21_27_huy_sua_noi_dung();
//         if (typeof window.ham_21_16_tai_du_lieu_tuan === 'function') window.ham_21_16_tai_du_lieu_tuan();

//     } catch (e) {
//         console.error(e);
//         alert("❌ Lỗi: " + e.message);
//     }
//     finally {
//         // Lỡ bị lỗi giữa chừng thì vẫn trả nút về giao diện cũ
//         if (isEditMode) {
//             btn.style.background = '#ffc107'; btn.innerHTML = '🔄 CẬP NHẬT NỘI DUNG ĐANG SỬA'; btn.disabled = false;
//         } else {
//             btn.style.background = oldBg; btn.innerHTML = oldTxt; btn.disabled = false;
//         }
//     }
// };



// =====================================================================
// HÀM 21.13: LƯU NỘI DUNG (CẬP NHẬT GỘP TỪ MẢNG ẢNH CŨ ĐÃ LỌC)
// =====================================================================
window.ham_21_13_luu_noi_dung_tuan = async function (btn) {
    const maLop = document.getElementById('gvcn-input-lop').value.match(/\(([^)]+)\)$/)?.[1]?.trim();
    const tuan = document.getElementById('gvcn-input-tuan').value.trim();
    const tenNoiDung = document.getElementById('gvcn-nd-ten').value.trim();
    const ngayNhap = document.getElementById('gvcn-nd-ngay').value;
    const tuNgay = document.getElementById('gvcn-tuan-tu').value;
    const chiTiet = document.getElementById('gvcn-nd-chitiet').value.trim();

    if (!maLop || !tuan) { alert("⚠️ Vui lòng chọn Lớp và nhập Tuần học!"); return; }
    if (!tenNoiDung) { alert("⚠️ Vui lòng nhập Tên Nội dung / Công việc!"); return; }

    let isEditMode = window.gvcn_IdNoiDungDangSua ? true : false;

    let oldTxt = btn.innerHTML;
    let oldBg = btn.style.background || '#0056b3';
    btn.innerHTML = "⏳ ĐANG XỬ LÝ ẢNH CHUNG..."; btn.disabled = true;

    const d = new Date();
    const timeStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}_${String(d.getHours()).padStart(2, '0')}h${String(d.getMinutes()).padStart(2, '0')}m${String(d.getSeconds()).padStart(2, '0')}s`;
    const cleanStr = (s) => s ? s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").replace(/\s+/g, "_") : "";
    const tuanClean = cleanStr(tuan);

    try {
        let mangLinkAnhMoi = [];
        if (window.gvcn_AnhNoiDungTam && window.gvcn_AnhNoiDungTam.length > 0) {
            for (let k = 0; k < window.gvcn_AnhNoiDungTam.length; k++) {
                let f = window.gvcn_AnhNoiDungTam[k];
                let b64 = await window.ham_ho_tro_doc_anh_base64(f);
                let tenFile = `NoiDung_[${timeStr}]_Lop[${maLop}]_Tuan[${tuanClean}]_Anh[${k + 1}].jpg`;
                let payload = { action: "upload_anh_nhat_ky_gvcn", base64: b64, mimeType: f.type, fileName: tenFile, maLop: maLop, loaiAnh: "GVCN_ND" };

                let res = await window.ham_ho_tro_upload_anh_co_tien_trinh(
                    CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, payload,
                    function (phanTram, daTai, tongSo) {
                        let strDaTai = window.ham_dinh_dang_dung_luong ? window.ham_dinh_dang_dung_luong(daTai) : `${(daTai / 1024).toFixed(1)} KB`;
                        let strTongSo = window.ham_dinh_dang_dung_luong ? window.ham_dinh_dang_dung_luong(tongSo) : `${(tongSo / 1024).toFixed(1)} KB`;
                        btn.style.background = `linear-gradient(90deg, #17a2b8 ${phanTram}%, #6c757d ${phanTram}%)`;
                        btn.innerHTML = `🚀 ĐANG TẢI ẢNH CHUNG (${k + 1}/${window.gvcn_AnhNoiDungTam.length})<br><span style="font-size: 11px; font-weight: normal;">${strDaTai} / ${strTongSo}</span>`;
                    }
                );
                if (res.status === 'success') mangLinkAnhMoi.push(res.url);
            }
        }

        btn.style.background = '#e83e8c';
        let mangNguoiNhan = [];
        let cacDongHS = document.querySelectorAll('.dong-nguoi-nhan');

        for (let i = 0; i < cacDongHS.length; i++) {
            let dong = cacDongHS[i];
            let hsInput = dong.querySelector('.gvcn-input-hs').value.trim();
            if (hsInput) {
                let ten = hsInput.split(' - ')[0].trim();
                let uidHS = null, tenDangNhap = '';
                if (window.DanhSachHocSinhLopHienTai) {
                    let hsObj = window.DanhSachHocSinhLopHienTai.find(h => h.chuoiGhep === hsInput);
                    if (hsObj) { uidHS = hsObj.uid; tenDangNhap = hsObj.tenDangNhap; }
                }

                let linkAnhCaNhan = dong.dataset.anhCu || '';

                if (dong.dataset.anhB64) {
                    let tenFileHS = `NhiemVu_[${timeStr}]_Lop[${maLop}]_HS[${cleanStr(ten)}].jpg`;
                    let payloadHS = { action: "upload_anh_nhat_ky_gvcn", base64: dong.dataset.anhB64, mimeType: dong.dataset.anhType, fileName: tenFileHS, maLop: maLop, loaiAnh: "GVCN_NV_HS" };

                    let resHS = await window.ham_ho_tro_upload_anh_co_tien_trinh(
                        CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, payloadHS,
                        function (phanTram) {
                            btn.style.background = `linear-gradient(90deg, #e83e8c ${phanTram}%, #6c757d ${phanTram}%)`;
                            btn.innerHTML = `🚀 ĐANG TẢI ẢNH: ${ten} (${phanTram}%)`;
                        }
                    );
                    if (resHS.status === 'success') linkAnhCaNhan = resHS.url;
                }

                mangNguoiNhan.push({
                    uid: uidHS, ten: ten, ten_dang_nhap: tenDangNhap,
                    phan_viec: dong.querySelector('.gvcn-input-phan-viec').value.trim(),
                    trang_thai: dong.querySelector('.gvcn-sel-trangthai') ? dong.querySelector('.gvcn-sel-trangthai').value : 'Chưa làm',
                    danh_gia: dong.querySelector('.gvcn-sel-danhgia').value,
                    ghi_chu: dong.querySelector('.gvcn-input-note').value.trim(),
                    anh_minh_chung: linkAnhCaNhan
                });
            }
        }

        btn.style.background = '#0056b3';
        btn.innerHTML = "⏳ ĐANG LƯU DỮ LIỆU VÀO HỆ THỐNG...";

        let idNhatKyGVCN = null;
        const { data: oldData } = await _supabase.from('nhat_ky_gvcn').select('id').eq('ma_lop', maLop).eq('tuan_hoc', tuan).maybeSingle();
        if (oldData) {
            idNhatKyGVCN = oldData.id;
        } else {
            const { data: newNK, error: errInsert } = await _supabase.from('nhat_ky_gvcn').insert([{ ma_lop: maLop, tuan_hoc: tuan, tu_ngay: tuNgay || new Date().toISOString().split('T')[0], trang_thai: 1 }]).select();
            if (errInsert) throw errInsert;
            idNhatKyGVCN = newNK[0].id;
        }

        // 🌟 NỐI MẢNG ẢNH MỚI VỚI MẢNG ẢNH CŨ (ĐÃ BỊ XÓA BỚT NẾU CÓ)
        let mangLinkAnhFinal = mangLinkAnhMoi;
        if (isEditMode) {
            if (window.gvcn_AnhNoiDungCuTam) mangLinkAnhFinal = window.gvcn_AnhNoiDungCuTam.concat(mangLinkAnhMoi);

            await _supabase.from('nhat_ky_gvcn_noi_dung').update({
                ngay_nhap: ngayNhap, ten_noi_dung: tenNoiDung, chi_tiet: chiTiet,
                nguoi_nhan: mangNguoiNhan, anh_dinh_kem: mangLinkAnhFinal
            }).eq('id', window.gvcn_IdNoiDungDangSua);
        } else {
            await _supabase.from('nhat_ky_gvcn_noi_dung').insert([{
                id_gvcn_nhat_ky: idNhatKyGVCN, ngay_nhap: ngayNhap, ten_noi_dung: tenNoiDung,
                chi_tiet: chiTiet, nguoi_nhan: mangNguoiNhan, anh_dinh_kem: mangLinkAnhFinal
            }]);
        }

        if (idNhatKyGVCN) {
            btn.innerHTML = "⏳ ĐANG ĐỒNG BỘ SỰ KIỆN HỌC SINH...";
            if (isEditMode) {
                await _supabase.from('nhat_ky_gvcn_su_kien_hs')
                    .delete()
                    .eq('id_gvcn_nhat_ky', idNhatKyGVCN)
                    .eq('nhom_su_kien', `Giao việc: ${window.gvcn_TenNoiDungCu}`);
            }

            if (mangNguoiNhan.length > 0) {
                let mangSuKienGiaoViec = [];
                mangNguoiNhan.forEach(hs => {
                    if (hs.uid) {
                        let mauThe = '#007bff';
                        if (hs.danh_gia === 'Tốt') mauThe = '#28a745'; else if (hs.danh_gia === 'Khá') mauThe = '#17a2b8'; else if (hs.danh_gia === 'Trung Bình' || hs.danh_gia === 'TB') mauThe = '#fd7e14'; else if (hs.danh_gia === 'Chưa đạt') mauThe = '#dc3545';
                        mangSuKienGiaoViec.push({
                            id_gvcn_nhat_ky: idNhatKyGVCN, uid_hoc_sinh: hs.uid, ten_dang_nhap_hoc_sinh: hs.ten_dang_nhap, ten_hoc_sinh: hs.ten,
                            nhom_su_kien: `Giao việc: ${tenNoiDung}`,
                            noi_dung_chi_tiet: `Phần việc: ${hs.phan_viec}` + (hs.ghi_chu ? ` - Ghi chú: ${hs.ghi_chu}` : ''),
                            hinh_thuc_xu_ly: hs.danh_gia || 'Chưa đánh giá', ngay_ghi_nhan: ngayNhap.split('T')[0], muc_do: 0,
                            thong_tin_mo_rong: { mau_sac: mauThe, phan_loai: 'giao_viec' }
                        });
                    }
                });
                if (mangSuKienGiaoViec.length > 0) await _supabase.from('nhat_ky_gvcn_su_kien_hs').insert(mangSuKienGiaoViec);
            }
        }

        alert(isEditMode ? "✅ Đã Cập nhật nội dung thành công!" : "✅ Đã lưu Nội dung Giao việc thành công!");

        if (typeof window.ham_21_27_huy_sua_noi_dung === 'function') window.ham_21_27_huy_sua_noi_dung();
        if (typeof window.ham_21_16_tai_du_lieu_tuan === 'function') window.ham_21_16_tai_du_lieu_tuan();

    } catch (e) {
        console.error(e);
        alert("❌ Lỗi: " + e.message);
    }
    finally {
        if (isEditMode) {
            btn.style.background = '#ffc107'; btn.innerHTML = '🔄 CẬP NHẬT NỘI DUNG ĐANG SỬA'; btn.disabled = false;
        } else {
            btn.style.background = oldBg; btn.innerHTML = oldTxt; btn.disabled = false;
        }
    }
};











// // =====================================================================
// // HÀM 21.14: LƯU THÔNG TIN TUẦN & ĐÁNH GIÁ CHUNG MỤC 2+4
// // =====================================================================
// window.ham_21_14_luu_thong_tin_tuan = async function (btn) {
//     const maLop = document.getElementById('gvcn-input-lop').value.match(/\(([^)]+)\)$/)?.[1]?.trim();
//     const tuan = document.getElementById('gvcn-input-tuan').value.trim();
//     const ndSinhHoat = document.getElementById('gvcn-nd-sinh-hoat').value.trim();
//     const danhGia = document.getElementById('gvcn-danh-gia-tuan').value.trim();
//     const tuNgay = document.getElementById('gvcn-tuan-tu').value;
//     const denNgay = document.getElementById('gvcn-tuan-den').value;

//     if (!maLop || !tuan) { alert("⚠️ Vui lòng chọn Lớp và nhập Tuần học ở trên cùng!"); return; }

//     let oldTxt = btn.innerHTML;
//     let oldBg = btn.style.background || '#28a745';
//     btn.innerHTML = "⏳ ĐANG CHUẨN BỊ ẢNH..."; btn.disabled = true;

//     try {
//         let mangLinkAnhTuan = [];
//         if (window.gvcn_AnhTuanTam && window.gvcn_AnhTuanTam.length > 0) {
//             for (let k = 0; k < window.gvcn_AnhTuanTam.length; k++) {
//                 let f = window.gvcn_AnhTuanTam[k];
//                 let b64 = await window.ham_ho_tro_doc_anh_base64(f);
//                 // 🌟 SỬ DỤNG ACTION VÀ LOẠI ẢNH MỚI
//                 let payload = { action: "upload_anh_nhat_ky_gvcn", base64: b64, mimeType: f.type, fileName: `TUAN_${Date.now()}.jpg`, maLop: maLop, loaiAnh: "GVCN_TUAN" };

//                 let res = await window.ham_ho_tro_upload_anh_co_tien_trinh(
//                     CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP,
//                     payload,
//                     function (phanTram, daTai, tongSo) {
//                         btn.style.background = `linear-gradient(90deg, #17a2b8 ${phanTram}%, #6c757d ${phanTram}%)`;
//                         btn.innerHTML = `🚀 ĐANG TẢI ẢNH (${k + 1}/${window.gvcn_AnhTuanTam.length}) - ${phanTram}%`;
//                     }
//                 );
//                 if (res.status === 'success') mangLinkAnhTuan.push(res.url);
//             }
//         }

//         btn.style.background = oldBg;
//         btn.innerHTML = "⏳ ĐANG LƯU THÔNG TIN TUẦN...";

//         const { data: oldData } = await _supabase.from('nhat_ky_gvcn')
//             .select('id, thong_tin_mo_rong')
//             .eq('ma_lop', maLop).eq('tuan_hoc', tuan).maybeSingle();

//         let ttMoRong = oldData && oldData.thong_tin_mo_rong ? oldData.thong_tin_mo_rong : {};
//         let oldAnh = ttMoRong.danh_sach_anh || [];
//         ttMoRong.danh_sach_anh = oldAnh.concat(mangLinkAnhTuan);

//         if (oldData) {
//             await _supabase.from('nhat_ky_gvcn').update({
//                 noi_dung_sinh_hoat: ndSinhHoat,
//                 danh_gia_tuan: danhGia,
//                 tu_ngay: tuNgay,
//                 den_ngay: denNgay,
//                 thong_tin_mo_rong: ttMoRong
//             }).eq('id', oldData.id);
//         } else {
//             await _supabase.from('nhat_ky_gvcn').insert([{
//                 ma_lop: maLop, tuan_hoc: tuan,
//                 tu_ngay: tuNgay || new Date().toISOString().split('T')[0],
//                 den_ngay: denNgay,
//                 noi_dung_sinh_hoat: ndSinhHoat, danh_gia_tuan: danhGia,
//                 trang_thai: 1, thong_tin_mo_rong: ttMoRong
//             }]);
//         }
//         alert("✅ Đã lưu Sinh hoạt, Đánh giá và Ảnh của tuần thành công!");

//         window.gvcn_AnhTuanTam = [];
//         if (typeof window.ham_21_16_tai_du_lieu_tuan === 'function') window.ham_21_16_tai_du_lieu_tuan();

//     } catch (e) { alert("❌ Lỗi: " + e.message); }
//     finally { btn.style.background = oldBg; btn.innerHTML = oldTxt; btn.disabled = false; }
// };

// // =====================================================================
// // HÀM 21.14: LƯU THÔNG TIN TUẦN & ĐÁNH GIÁ CHUNG (CÓ HIỆN TIẾN TRÌNH ?KB/TỔNG)
// // =====================================================================
// window.ham_21_14_luu_thong_tin_tuan = async function (btn) {
//     const maLop = document.getElementById('gvcn-input-lop').value.match(/\(([^)]+)\)$/)?.[1]?.trim();
//     const tuan = document.getElementById('gvcn-input-tuan').value.trim();
//     const ndSinhHoat = document.getElementById('gvcn-nd-sinh-hoat').value.trim();
//     const danhGia = document.getElementById('gvcn-danh-gia-tuan').value.trim();
//     const tuNgay = document.getElementById('gvcn-tuan-tu').value;
//     const denNgay = document.getElementById('gvcn-tuan-den').value;

//     if (!maLop || !tuan) { alert("⚠️ Vui lòng chọn Lớp và nhập Tuần học ở trên cùng!"); return; }

//     let oldTxt = btn.innerHTML;
//     let oldBg = btn.style.background || '#28a745';
//     btn.innerHTML = "⏳ ĐANG CHUẨN BỊ ẢNH..."; btn.disabled = true;

//     const d = new Date();
//     const timeStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}_${String(d.getHours()).padStart(2, '0')}h${String(d.getMinutes()).padStart(2, '0')}m${String(d.getSeconds()).padStart(2, '0')}s`;
//     const cleanStr = (s) => s ? s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").replace(/\s+/g, "_") : "";
//     const tuanClean = cleanStr(tuan);

//     try {
//         let mangLinkAnhTuan = [];
//         if (window.gvcn_AnhTuanTam && window.gvcn_AnhTuanTam.length > 0) {
//             for (let k = 0; k < window.gvcn_AnhTuanTam.length; k++) {
//                 let f = window.gvcn_AnhTuanTam[k];
//                 let b64 = await window.ham_ho_tro_doc_anh_base64(f);

//                 let tenFile = `AnhTuan_[${timeStr}]_Lop[${maLop}]_Tuan[${tuanClean}]_Anh[${k + 1}].jpg`;
//                 let payload = { action: "upload_anh_nhat_ky_gvcn", base64: b64, mimeType: f.type, fileName: tenFile, maLop: maLop, loaiAnh: "GVCN_TUAN" };

//                 // 🌟 TÍCH HỢP THANH TIẾN TRÌNH CHI TIẾT ?KB/TỔNG KB Y HỆT KHỐI DẠY HỌC
//                 let res = await window.ham_ho_tro_upload_anh_co_tien_trinh(
//                     CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, payload,
//                     function (phanTram, daTai, tongSo) {
//                         let strDaTai = window.ham_dinh_dang_dung_luong(daTai);
//                         let strTongSo = window.ham_dinh_dang_dung_luong(tongSo);
//                         btn.style.background = `linear-gradient(90deg, #17a2b8 ${phanTram}%, #6c757d ${phanTram}%)`;
//                         btn.innerHTML = `🚀 ĐANG TẢI ẢNH (${k + 1}/${window.gvcn_AnhTuanTam.length})<br><span style="font-size: 11px; font-weight: normal;">${strDaTai} / ${strTongSo} (${phanTram}%)</span>`;
//                     }
//                 );
//                 if (res.status === 'success') mangLinkAnhTuan.push(res.url);
//             }
//         }

//         btn.style.background = oldBg;
//         btn.innerHTML = "⏳ ĐANG LƯU THÔNG TIN TUẦN...";

//         const { data: oldData } = await _supabase.from('nhat_ky_gvcn').select('id, thong_tin_mo_rong').eq('ma_lop', maLop).eq('tuan_hoc', tuan).maybeSingle();
//         let ttMoRong = oldData && oldData.thong_tin_mo_rong ? oldData.thong_tin_mo_rong : {};
//         let oldAnh = ttMoRong.danh_sach_anh || [];
//         ttMoRong.danh_sach_anh = oldAnh.concat(mangLinkAnhTuan);

//         if (oldData) {
//             await _supabase.from('nhat_ky_gvcn').update({ noi_dung_sinh_hoat: ndSinhHoat, danh_gia_tuan: danhGia, tu_ngay: tuNgay, den_ngay: denNgay, thong_tin_mo_rong: ttMoRong }).eq('id', oldData.id);
//         } else {
//             await _supabase.from('nhat_ky_gvcn').insert([{ ma_lop: maLop, tuan_hoc: tuan, tu_ngay: tuNgay || new Date().toISOString().split('T')[0], den_ngay: denNgay, noi_dung_sinh_hoat: ndSinhHoat, danh_gia_tuan: danhGia, trang_thai: 1, thong_tin_mo_rong: ttMoRong }]);
//         }
//         alert("✅ Đã lưu Sinh hoạt, Đánh giá và Ảnh của tuần thành công!");
//         window.gvcn_AnhTuanTam = [];
//         if (typeof window.ham_21_16_tai_du_lieu_tuan === 'function') window.ham_21_16_tai_du_lieu_tuan();
//     } catch (e) { alert("❌ Lỗi: " + e.message); }
//     finally { btn.style.background = oldBg; btn.innerHTML = oldTxt; btn.disabled = false; }
// };



// =====================================================================
// HÀM 21.14: LƯU THÔNG TIN TUẦN (SỬ DỤNG MẢNG ẢNH ĐÃ CẬP NHẬT XÓA)
// =====================================================================
window.ham_21_14_luu_thong_tin_tuan = async function (btn) {
    const maLop = document.getElementById('gvcn-input-lop').value.match(/\(([^)]+)\)$/)?.[1]?.trim();
    const tuan = document.getElementById('gvcn-input-tuan').value.trim();
    const ndSinhHoat = document.getElementById('gvcn-nd-sinh-hoat').value.trim();
    const danhGia = document.getElementById('gvcn-danh-gia-tuan').value.trim();
    const tuNgay = document.getElementById('gvcn-tuan-tu').value;
    const denNgay = document.getElementById('gvcn-tuan-den').value;

    if (!maLop || !tuan) { alert("⚠️ Vui lòng chọn Lớp và nhập Tuần học ở trên cùng!"); return; }

    let oldTxt = btn.innerHTML;
    let oldBg = btn.style.background || '#28a745';
    btn.innerHTML = "⏳ ĐANG CHUẨN BỊ ẢNH..."; btn.disabled = true;

    const d = new Date();
    const timeStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}_${String(d.getHours()).padStart(2, '0')}h${String(d.getMinutes()).padStart(2, '0')}m${String(d.getSeconds()).padStart(2, '0')}s`;
    const cleanStr = (s) => s ? s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").replace(/\s+/g, "_") : "";
    const tuanClean = cleanStr(tuan);

    try {
        let mangLinkAnhTuan = [];
        if (window.gvcn_AnhTuanTam && window.gvcn_AnhTuanTam.length > 0) {
            for (let k = 0; k < window.gvcn_AnhTuanTam.length; k++) {
                let f = window.gvcn_AnhTuanTam[k];
                let b64 = await window.ham_ho_tro_doc_anh_base64(f);

                let tenFile = `AnhTuan_[${timeStr}]_Lop[${maLop}]_Tuan[${tuanClean}]_Anh[${k + 1}].jpg`;
                let payload = { action: "upload_anh_nhat_ky_gvcn", base64: b64, mimeType: f.type, fileName: tenFile, maLop: maLop, loaiAnh: "GVCN_TUAN" };

                let res = await window.ham_ho_tro_upload_anh_co_tien_trinh(
                    CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, payload,
                    function (phanTram, daTai, tongSo) {
                        let strDaTai = window.ham_dinh_dang_dung_luong(daTai);
                        let strTongSo = window.ham_dinh_dang_dung_luong(tongSo);
                        btn.style.background = `linear-gradient(90deg, #17a2b8 ${phanTram}%, #6c757d ${phanTram}%)`;
                        btn.innerHTML = `🚀 ĐANG TẢI ẢNH (${k + 1}/${window.gvcn_AnhTuanTam.length})<br><span style="font-size: 11px; font-weight: normal;">${strDaTai} / ${strTongSo} (${phanTram}%)</span>`;
                    }
                );
                if (res.status === 'success') mangLinkAnhTuan.push(res.url);
            }
        }

        btn.style.background = oldBg;
        btn.innerHTML = "⏳ ĐANG LƯU THÔNG TIN TUẦN...";

        const { data: oldData } = await _supabase.from('nhat_ky_gvcn').select('id, thong_tin_mo_rong').eq('ma_lop', maLop).eq('tuan_hoc', tuan).maybeSingle();
        let ttMoRong = oldData && oldData.thong_tin_mo_rong ? oldData.thong_tin_mo_rong : {};

        // 🌟 NỐI MẢNG ẢNH CŨ VÀ MỚI (Lấy mảng cũ từ Ram vì có thể đã bị xóa bớt)
        let oldAnh = window.gvcn_AnhTuanCuTam || [];
        ttMoRong.danh_sach_anh = oldAnh.concat(mangLinkAnhTuan);

        if (oldData) {
            await _supabase.from('nhat_ky_gvcn').update({ noi_dung_sinh_hoat: ndSinhHoat, danh_gia_tuan: danhGia, tu_ngay: tuNgay, den_ngay: denNgay, thong_tin_mo_rong: ttMoRong }).eq('id', oldData.id);
        } else {
            await _supabase.from('nhat_ky_gvcn').insert([{ ma_lop: maLop, tuan_hoc: tuan, tu_ngay: tuNgay || new Date().toISOString().split('T')[0], den_ngay: denNgay, noi_dung_sinh_hoat: ndSinhHoat, danh_gia_tuan: danhGia, trang_thai: 1, thong_tin_mo_rong: ttMoRong }]);
        }
        alert("✅ Đã lưu Sinh hoạt, Đánh giá và Ảnh của tuần thành công!");
        window.gvcn_AnhTuanTam = [];
        if (typeof window.ham_21_16_tai_du_lieu_tuan === 'function') window.ham_21_16_tai_du_lieu_tuan();
    } catch (e) { alert("❌ Lỗi: " + e.message); }
    finally { btn.style.background = oldBg; btn.innerHTML = oldTxt; btn.disabled = false; }
};





// // =====================================================================
// // HÀM 21.15: LƯU SỰ KIỆN HỌC SINH
// // =====================================================================
// window.ham_21_15_luu_su_kien_tuan_truoc = async function (btnLuu) {
//     if (window.gvcn_SuKienChoLuu.length === 0) { alert("⚠️ Không có sự kiện học sinh nào để lưu!"); return; }
//     const maLop = document.getElementById('gvcn-input-lop').value.match(/\(([^)]+)\)$/)?.[1]?.trim();
//     if (!maLop) { alert("⚠️ Vui lòng chọn Lớp học ở phần 1 trước!"); return; }

//     let oldTxt = btnLuu.innerHTML;
//     let oldBg = btnLuu.style.background || '#e83e8c';
//     btnLuu.innerHTML = "⏳ ĐANG XỬ LÝ ẢNH & DỮ LIỆU..."; btnLuu.disabled = true;

//     try {
//         let mangSuKienDB = [];
//         let cacheUpload = {};
//         let cacheIdNK = {};

//         for (let sk of window.gvcn_SuKienChoLuu) {
//             let tuanHocSuKien = sk.tuan;
//             if (!cacheIdNK[tuanHocSuKien]) {
//                 const { data: nkData } = await _supabase.from('nhat_ky_gvcn').select('id').eq('ma_lop', maLop).eq('tuan_hoc', tuanHocSuKien).maybeSingle();
//                 if (nkData) { cacheIdNK[tuanHocSuKien] = nkData.id; } else {
//                     const { data: newNK } = await _supabase.from('nhat_ky_gvcn').insert([{ ma_lop: maLop, tuan_hoc: tuanHocSuKien, tu_ngay: new Date().toISOString().split('T')[0], trang_thai: 1 }]).select();
//                     cacheIdNK[tuanHocSuKien] = newNK[0].id;
//                 }
//             }
//             let idNK = cacheIdNK[tuanHocSuKien];

//             let mangLink = [];
//             for (let f of sk.mang_anh) {
//                 let key = f.name + f.size;
//                 if (!cacheUpload[key]) {
//                     let b64 = await window.ham_ho_tro_doc_anh_base64(f);
//                     // 🌟 SỬ DỤNG ACTION VÀ LOẠI ẢNH MỚI
//                     let res = await window.ham_ho_tro_upload_anh_co_tien_trinh(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, { action: "upload_anh_nhat_ky_gvcn", base64: b64, mimeType: f.type, fileName: `MC_${Date.now()}.jpg`, maLop: maLop, loaiAnh: "GVCN_MC" });
//                     cacheUpload[key] = res.url;
//                 }
//                 mangLink.push(cacheUpload[key]);
//             }
//             mangSuKienDB.push({
//                 id_gvcn_nhat_ky: idNK, uid_hoc_sinh: sk.uid, ten_dang_nhap_hoc_sinh: sk.ten_dang_nhap, ten_hoc_sinh: sk.ten_hs,
//                 nhom_su_kien: sk.loi, noi_dung_chi_tiet: sk.loi + ` (Xảy ra ngày ${sk.ngay} - Buổi ${sk.buoi})`, hinh_thuc_xu_ly: '',
//                 ngay_ghi_nhan: sk.ngay, muc_do: 1, thong_tin_mo_rong: { mau_sac: '#e83e8c', danh_sach_anh_minh_chung: mangLink }
//             });
//         }
//         await _supabase.from('nhat_ky_gvcn_su_kien_hs').insert(mangSuKienDB);
//         alert("✅ Đã ghi nhận tất cả sự kiện nề nếp vào Hồ sơ lớp thành công!");
//         window.gvcn_SuKienChoLuu = []; window.ham_21_7_ve_danh_sach_cho();
//     } catch (e) { alert("❌ Lỗi: " + e.message); }
//     finally { btnLuu.style.background = oldBg; btnLuu.innerHTML = oldTxt; btnLuu.disabled = false; }
// };


// =====================================================================
// HÀM 21.15: LƯU SỰ KIỆN HỌC SINH (TẠO TÊN ẢNH SỰ KIỆN KÈM TÊN HS/LỖI)
// =====================================================================
window.ham_21_15_luu_su_kien_tuan_truoc = async function (btnLuu) {
    if (window.gvcn_SuKienChoLuu.length === 0) { alert("⚠️ Không có sự kiện học sinh nào để lưu!"); return; }
    const maLop = document.getElementById('gvcn-input-lop').value.match(/\(([^)]+)\)$/)?.[1]?.trim();
    if (!maLop) { alert("⚠️ Vui lòng chọn Lớp học ở phần 1 trước!"); return; }

    let oldTxt = btnLuu.innerHTML;
    let oldBg = btnLuu.style.background || '#e83e8c';
    btnLuu.innerHTML = "⏳ ĐANG XỬ LÝ ẢNH & DỮ LIỆU..."; btnLuu.disabled = true;

    // 🌟 CÔNG CỤ TẠO CHUỖI
    const d = new Date();
    const timeStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}_${String(d.getHours()).padStart(2, '0')}h${String(d.getMinutes()).padStart(2, '0')}m${String(d.getSeconds()).padStart(2, '0')}s`;
    const cleanStr = (s) => s ? s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").replace(/\s+/g, "_") : "";

    try {
        let mangSuKienDB = [];
        let cacheUpload = {};
        let cacheIdNK = {};

        for (let sk of window.gvcn_SuKienChoLuu) {
            let tuanHocSuKien = sk.tuan;
            if (!cacheIdNK[tuanHocSuKien]) {
                const { data: nkData } = await _supabase.from('nhat_ky_gvcn').select('id').eq('ma_lop', maLop).eq('tuan_hoc', tuanHocSuKien).maybeSingle();
                if (nkData) { cacheIdNK[tuanHocSuKien] = nkData.id; } else {
                    const { data: newNK } = await _supabase.from('nhat_ky_gvcn').insert([{ ma_lop: maLop, tuan_hoc: tuanHocSuKien, tu_ngay: new Date().toISOString().split('T')[0], trang_thai: 1 }]).select();
                    cacheIdNK[tuanHocSuKien] = newNK[0].id;
                }
            }
            let idNK = cacheIdNK[tuanHocSuKien];

            let mangLink = [];
            let hsClean = cleanStr(sk.ten_hs);
            let loiClean = cleanStr(sk.loi);
            let tuanClean = cleanStr(sk.tuan);
            let idxAnh = 1;

            for (let f of sk.mang_anh) {
                let key = f.name + f.size;
                if (!cacheUpload[key]) {
                    let b64 = await window.ham_ho_tro_doc_anh_base64(f);

                    // 🌟 TẠO TÊN FILE SỰ KIỆN: SuKien_[Thời_gian]_Lop[12TN6]_Tuan[Tuan_1]_HS[Dinh_Tan_Huy]_Loi[Vang_Hoc]_Anh[1].jpg
                    let tenFile = `SuKien_[${timeStr}]_Lop[${maLop}]_Tuan[${tuanClean}]_HS[${hsClean}]_Loi[${loiClean}]_Anh[${idxAnh}].jpg`;
                    let res = await window.ham_ho_tro_upload_anh_co_tien_trinh(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, { action: "upload_anh_nhat_ky_gvcn", base64: b64, mimeType: f.type, fileName: tenFile, maLop: maLop, loaiAnh: "GVCN_MC" });

                    cacheUpload[key] = res.url;
                }
                mangLink.push(cacheUpload[key]);
                idxAnh++;
            }

            mangSuKienDB.push({
                id_gvcn_nhat_ky: idNK, uid_hoc_sinh: sk.uid, ten_dang_nhap_hoc_sinh: sk.ten_dang_nhap, ten_hoc_sinh: sk.ten_hs,
                nhom_su_kien: sk.loi, noi_dung_chi_tiet: sk.loi + ` (Xảy ra ngày ${sk.ngay} - Buổi ${sk.buoi})`, hinh_thuc_xu_ly: '',
                ngay_ghi_nhan: sk.ngay, muc_do: 1, thong_tin_mo_rong: { mau_sac: '#e83e8c', danh_sach_anh_minh_chung: mangLink }
            });
        }
        await _supabase.from('nhat_ky_gvcn_su_kien_hs').insert(mangSuKienDB);
        alert("✅ Đã ghi nhận tất cả sự kiện nề nếp vào Hồ sơ lớp thành công!");
        window.gvcn_SuKienChoLuu = []; window.ham_21_7_ve_danh_sach_cho();
    } catch (e) { alert("❌ Lỗi: " + e.message); }
    finally { btnLuu.style.background = oldBg; btnLuu.innerHTML = oldTxt; btnLuu.disabled = false; }
};





// // =====================================================================
// // HÀM 21.16: TỰ ĐỘNG DÒ VÀ NẠP DỮ LIỆU TUẦN CŨ (CÓ TIÊU ĐỀ BẢNG NỘI DUNG)
// // =====================================================================
// window.ham_21_16_tai_du_lieu_tuan = async function () {
//     const maLopRaw = document.getElementById('gvcn-input-lop').value;
//     const tuan = document.getElementById('gvcn-input-tuan').value.trim();
//     if (!maLopRaw || !tuan) return;

//     const maLop = maLopRaw.match(/\(([^)]+)\)$/)?.[1]?.trim() || maLopRaw;
//     const bangCu = document.getElementById('gvcn-bang-noi-dung-cu');

//     try {
//         const { data: nkData } = await _supabase.from('nhat_ky_gvcn')
//             .select('*').eq('ma_lop', maLop).eq('tuan_hoc', tuan).maybeSingle();

//         let vungAnhCu = document.getElementById('gvcn-vung-anh-cu-tuan');
//         let vungPreviewMoi = document.getElementById('gvcn-vung-preview-anh-tuan');

//         if (nkData) {
//             let tt = nkData.thong_tin_mo_rong || {};
//             if (nkData.tu_ngay) document.getElementById('gvcn-tuan-tu').value = nkData.tu_ngay;
//             if (nkData.den_ngay) document.getElementById('gvcn-tuan-den').value = nkData.den_ngay;

//             document.getElementById('gvcn-nd-sinh-hoat').value = nkData.noi_dung_sinh_hoat || '';
//             document.getElementById('gvcn-danh-gia-tuan').value = nkData.danh_gia_tuan || '';

//             // Hiển thị ảnh cũ của tuần
//             let danhSachAnh = tt.danh_sach_anh || [];
//             if (typeof danhSachAnh === 'string') {
//                 try { danhSachAnh = JSON.parse(danhSachAnh); } catch (e) { danhSachAnh = []; }
//             }

//             if (danhSachAnh.length > 0) {
//                 let htmlAnhCu = '<div style="width:100%; font-size:12px; color:#28a745; font-weight:bold; margin-bottom:8px;">✅ Ảnh đã lưu trong tuần này (Bấm vào ảnh để xem kích thước gốc):</div>';

//                 danhSachAnh.forEach(linkAnh => {
//                     if (!linkAnh) return;
//                     let fileId = '';
//                     if (linkAnh.includes('/d/')) {
//                         let m = linkAnh.match(/\/d\/([a-zA-Z0-9_-]+)/);
//                         if (m && m[1]) fileId = m[1];
//                     } else if (linkAnh.includes('id=')) {
//                         let m = linkAnh.match(/id=([a-zA-Z0-9_-]+)/);
//                         if (m && m[1]) fileId = m[1];
//                     }

//                     let srcHienThi = fileId ? `https://drive.google.com/thumbnail?id=${fileId}&sz=w1600` : linkAnh;
//                     let linkGoc = linkAnh;

//                     htmlAnhCu += `
//                     <div style="width: 100%; padding: 8px; background: #fff; border: 1px solid #ced4da; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.08); margin-bottom: 12px; box-sizing: border-box;">
//                         <a href="${linkGoc}" target="_blank" title="Mở ảnh gốc chất lượng cao" style="display: block; text-decoration: none;">
//                             <img src="${srcHienThi}" onerror="this.onerror=null; this.src='${linkGoc}';" style="width: 100%; height: auto; max-height: 500px; object-fit: contain; border-radius: 6px; cursor: pointer; transition: 0.3s;" onmouseover="this.style.opacity=0.92" onmouseout="this.style.opacity=1">
//                         </a>
//                     </div>`;
//                 });
//                 vungAnhCu.innerHTML = htmlAnhCu;
//                 vungPreviewMoi.innerHTML = '<span style="color:#28a745; font-weight:bold;">(Có thể tải thêm ảnh mới ở đây...)</span>';
//             } else {
//                 vungAnhCu.innerHTML = '';
//                 vungPreviewMoi.innerHTML = '<span>(Chưa có ảnh mới...)</span>';
//             }

//             // Kéo Bảng Con (Danh sách công việc đã giao)
//             const { data: ndData } = await _supabase.from('nhat_ky_gvcn_noi_dung')
//                 .select('*').eq('id_gvcn_nhat_ky', nkData.id).order('ngay_nhap', { ascending: true });

//             if (ndData && ndData.length > 0) {
//                 // 🌟 BỔ SUNG DÒNG TIÊU ĐỀ PHÍA TRÊN BẢNG
//                 let htmlTable = `<div style="font-weight: bold; font-size: 13px; color: #0056b3; margin-bottom: 8px; display: flex; align-items: center; gap: 5px;">
//                     📌 Danh sách các nội dung đang có của tuần:
//                 </div>`;

//                 htmlTable += `<table style="width:100%; border-collapse: collapse; margin-bottom: 20px; font-size:13px; background:#fff;">
//                     <tr style="background:#e9ecef; border-bottom:2px solid #0056b3; color:#0056b3;">
//                         <th style="padding:8px; text-align:center; border:1px solid #dee2e6;">STT</th>
//                         <th style="padding:8px; text-align:left; border:1px solid #dee2e6;">Ngày nhập</th>
//                         <th style="padding:8px; text-align:left; border:1px solid #dee2e6;">Tên nội dung</th>
//                         <th style="padding:8px; text-align:left; border:1px solid #dee2e6;">Học sinh nhận việc</th>
//                         <th style="padding:8px; text-align:center; border:1px solid #dee2e6;">Ảnh</th>
//                     </tr>`;

//                 ndData.forEach((nd, idx) => {
//                     let dsHS = (nd.nguoi_nhan || []).map(hs => {
//                         let hsObj = window.DanhSachHocSinhLopHienTai ? window.DanhSachHocSinhLopHienTai.find(h => h.uid === hs.uid) : null;
//                         let avatar = hsObj ? hsObj.avatarUrl : `https://ui-avatars.com/api/?name=${encodeURIComponent(hs.ten)}&background=random&color=fff`;
//                         return `<div style="display:flex; align-items:center; gap:5px; margin-bottom:4px;">
//                             <img src="${avatar}" style="width:20px; height:20px; border-radius:50%; border:1px solid #ccc;">
//                             <b>${hs.ten}</b> <span style="font-size:11px; color:#666;">(${hs.ten_dang_nhap || ''})</span>
//                         </div>`;
//                     }).join('');

//                     let strNgay = nd.ngay_nhap ? nd.ngay_nhap.replace('T', ' ') : '';
//                     let soAnhND = (nd.anh_dinh_kem || []).length;

//                     htmlTable += `<tr>
//                         <td style="padding:8px; text-align:center; border:1px solid #dee2e6; font-weight:bold;">${idx + 1}</td>
//                         <td style="padding:8px; border:1px solid #dee2e6;">${strNgay}</td>
//                         <td style="padding:8px; border:1px solid #dee2e6; color:#0056b3; font-weight:bold;">${nd.ten_noi_dung}</td>
//                         <td style="padding:8px; border:1px solid #dee2e6;">${dsHS || '<i>Giao chung</i>'}</td>
//                         <td style="padding:8px; text-align:center; border:1px solid #dee2e6;">
//                             ${soAnhND > 0 ? `<span style="background:#17a2b8; color:white; padding:2px 6px; border-radius:10px; font-size:11px;">${soAnhND} ảnh</span>` : '-'}
//                         </td>
//                     </tr>`;
//                 });
//                 htmlTable += `</table>`;
//                 bangCu.innerHTML = htmlTable;
//             } else {
//                 bangCu.innerHTML = '<i style="color:#666; font-size:13px; display:block; margin-bottom:15px;">Tuần này chưa có công việc giao việc nào được ghi nhận.</i>';
//             }
//         } else {
//             document.getElementById('gvcn-nd-sinh-hoat').value = '';
//             document.getElementById('gvcn-danh-gia-tuan').value = '';
//             vungAnhCu.innerHTML = '';
//             vungPreviewMoi.innerHTML = '<span>(Chưa có ảnh...)</span>';
//             bangCu.innerHTML = '';
//         }
//     } catch (e) { console.error(e); }
// };


// // =====================================================================
// // HÀM 21.16: TỰ ĐỘNG DÒ VÀ NẠP DỮ LIỆU TUẦN CŨ (BẢNG NỘI DUNG NÂNG CẤP)
// // =====================================================================
// window.ham_21_16_tai_du_lieu_tuan = async function () {
//     const maLopRaw = document.getElementById('gvcn-input-lop').value;
//     const tuan = document.getElementById('gvcn-input-tuan').value.trim();
//     if (!maLopRaw || !tuan) return;

//     const maLop = maLopRaw.match(/\(([^)]+)\)$/)?.[1]?.trim() || maLopRaw;
//     const bangCu = document.getElementById('gvcn-bang-noi-dung-cu');

//     try {
//         const { data: nkData } = await _supabase.from('nhat_ky_gvcn')
//             .select('*').eq('ma_lop', maLop).eq('tuan_hoc', tuan).maybeSingle();

//         let vungAnhCu = document.getElementById('gvcn-vung-anh-cu-tuan');
//         let vungPreviewMoi = document.getElementById('gvcn-vung-preview-anh-tuan');

//         if (nkData) {
//             let tt = nkData.thong_tin_mo_rong || {};
//             if (nkData.tu_ngay) document.getElementById('gvcn-tuan-tu').value = nkData.tu_ngay;
//             if (nkData.den_ngay) document.getElementById('gvcn-tuan-den').value = nkData.den_ngay;

//             document.getElementById('gvcn-nd-sinh-hoat').value = nkData.noi_dung_sinh_hoat || '';
//             document.getElementById('gvcn-danh-gia-tuan').value = nkData.danh_gia_tuan || '';

//             // Hiển thị ảnh cũ của tuần
//             let danhSachAnh = tt.danh_sach_anh || [];
//             if (typeof danhSachAnh === 'string') {
//                 try { danhSachAnh = JSON.parse(danhSachAnh); } catch (e) { danhSachAnh = []; }
//             }

//             if (danhSachAnh.length > 0) {
//                 let htmlAnhCu = '<div style="width:100%; font-size:12px; color:#28a745; font-weight:bold; margin-bottom:8px;">✅ Ảnh đã lưu trong tuần này:</div>';
//                 danhSachAnh.forEach(linkAnh => {
//                     if (!linkAnh) return;
//                     let fileId = '';
//                     if (linkAnh.includes('/d/')) {
//                         let m = linkAnh.match(/\/d\/([a-zA-Z0-9_-]+)/);
//                         if (m && m[1]) fileId = m[1];
//                     } else if (linkAnh.includes('id=')) {
//                         let m = linkAnh.match(/id=([a-zA-Z0-9_-]+)/);
//                         if (m && m[1]) fileId = m[1];
//                     }
//                     let srcHienThi = fileId ? `https://drive.google.com/thumbnail?id=${fileId}&sz=w1600` : linkAnh;
//                     htmlAnhCu += `
//                     <div style="width: 100%; padding: 8px; background: #fff; border: 1px solid #ced4da; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.08); margin-bottom: 12px; box-sizing: border-box;">
//                         <a href="${linkAnh}" target="_blank" style="display: block; text-decoration: none;">
//                             <img src="${srcHienThi}" onerror="this.onerror=null; this.src='${linkAnh}';" style="width: 100%; height: auto; max-height: 500px; object-fit: contain; border-radius: 6px;">
//                         </a>
//                     </div>`;
//                 });
//                 vungAnhCu.innerHTML = htmlAnhCu;
//                 vungPreviewMoi.innerHTML = '<span style="color:#28a745; font-weight:bold;">(Có thể tải thêm ảnh mới ở đây...)</span>';
//             } else {
//                 vungAnhCu.innerHTML = '';
//                 vungPreviewMoi.innerHTML = '<span>(Chưa có ảnh mới...)</span>';
//             }

//             // Kéo Bảng Con (Danh sách công việc đã giao)
//             const { data: ndData } = await _supabase.from('nhat_ky_gvcn_noi_dung')
//                 .select('*').eq('id_gvcn_nhat_ky', nkData.id).order('ngay_nhap', { ascending: true });

//             if (ndData && ndData.length > 0) {
//                 window.gvcn_DanhSachNoiDangHienTai = ndData;
//                 if (typeof window.ham_21_18_render_bang_noi_dung === 'function') {
//                     window.ham_21_18_render_bang_noi_dung(ndData);
//                 }
//             } else {
//                 bangCu.innerHTML = '<i style="color:#666; font-size:13px; display:block; margin-bottom:15px;">Tuần này chưa có công việc giao việc nào được ghi nhận.</i>';
//             }
//         } else {
//             document.getElementById('gvcn-nd-sinh-hoat').value = '';
//             document.getElementById('gvcn-danh-gia-tuan').value = '';
//             vungAnhCu.innerHTML = '';
//             vungPreviewMoi.innerHTML = '<span>(Chưa có ảnh...)</span>';
//             bangCu.innerHTML = '';
//         }
//     } catch (e) { console.error(e); }
// };


// // =====================================================================
// // HÀM 21.16: TỰ ĐỘNG DÒ VÀ NẠP DỮ LIỆU TUẦN CŨ 
// // (FIX ẢNH 100% NGANG VÀ CỐ ĐỊNH CỘT BẢNG LỒNG)
// // =====================================================================
// window.ham_21_16_tai_du_lieu_tuan = async function () {
//     const maLopRaw = document.getElementById('gvcn-input-lop').value;
//     const tuan = document.getElementById('gvcn-input-tuan').value.trim();
//     if (!maLopRaw || !tuan) return;

//     const maLop = maLopRaw.match(/\(([^)]+)\)$/)?.[1]?.trim() || maLopRaw;
//     const bangCu = document.getElementById('gvcn-bang-noi-dung-cu');

//     try {
//         const { data: nkData } = await _supabase.from('nhat_ky_gvcn')
//             .select('*').eq('ma_lop', maLop).eq('tuan_hoc', tuan).maybeSingle();

//         let vungAnhCu = document.getElementById('gvcn-vung-anh-cu-tuan');
//         let vungPreviewMoi = document.getElementById('gvcn-vung-preview-anh-tuan');

//         if (nkData) {
//             let tt = nkData.thong_tin_mo_rong || {};
//             if (nkData.tu_ngay) document.getElementById('gvcn-tuan-tu').value = nkData.tu_ngay;
//             if (nkData.den_ngay) document.getElementById('gvcn-tuan-den').value = nkData.den_ngay;

//             document.getElementById('gvcn-nd-sinh-hoat').value = nkData.noi_dung_sinh_hoat || '';
//             document.getElementById('gvcn-danh-gia-tuan').value = nkData.danh_gia_tuan || '';

//             // 🌟 NẠP ẢNH TUẦN (RỘNG FULL 100% KHUNG)
//             let danhSachAnh = tt.danh_sach_anh || [];
//             if (typeof danhSachAnh === 'string') { try { danhSachAnh = JSON.parse(danhSachAnh); } catch (e) { danhSachAnh = []; } }

//             if (danhSachAnh.length > 0) {
//                 let htmlAnhCu = '<div style="width:100%; font-size:12px; color:#28a745; font-weight:bold; margin-bottom:5px;">✅ Ảnh đã lưu trong tuần này:</div>';
//                 danhSachAnh.forEach(linkAnh => {
//                     if (!linkAnh) return;
//                     let srcAnh = linkAnh; let fileId = null;
//                     if (linkAnh.includes('/d/')) { let match = linkAnh.match(/\/d\/([a-zA-Z0-9_-]+)/); if (match && match[1]) fileId = match[1]; }
//                     else if (linkAnh.includes('id=')) { let match = linkAnh.match(/id=([a-zA-Z0-9_-]+)/); if (match && match[1]) fileId = match[1]; }
//                     if (fileId) srcAnh = `https://drive.google.com/thumbnail?id=${fileId}&sz=w1200`; // Chỉnh size lớn cho sắc nét

//                     // Style width 100%, max-height 600px để không bị lố màn hình nếu ảnh quá dài
//                     htmlAnhCu += `<div style="width: 100%; padding: 5px; background: #fff; border: 1px solid #ced4da; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 10px; text-align: center;">
//                         <a href="${linkAnh}" target="_blank" title="Nhấn để xem ảnh gốc" style="text-decoration: none; display: block;">
//                             <img src="${srcAnh}" onerror="this.onerror=null; this.src='https://placehold.co/1200x600?text=Lỗi'; this.style.border='1px dashed #dc3545';" style="width: 100%; max-height: 600px; object-fit: contain; border-radius: 4px; cursor: pointer;">
//                         </a></div>`;
//                 });
//                 vungAnhCu.innerHTML = htmlAnhCu;
//                 vungPreviewMoi.innerHTML = '<span style="color:#28a745; font-weight:bold;">(Có thể tải thêm ảnh mới ở đây...)</span>';
//             } else {
//                 vungAnhCu.innerHTML = '';
//                 vungPreviewMoi.innerHTML = '<span>(Chưa có ảnh mới...)</span>';
//             }

//             // 🌟 NẠP BẢNG CÔNG VIỆC CŨ (THIẾT KẾ TABLE LỒNG NHAU)
//             const { data: ndData } = await _supabase.from('nhat_ky_gvcn_noi_dung')
//                 .select('*').eq('id_gvcn_nhat_ky', nkData.id).order('ngay_nhap', { ascending: true });

//             if (ndData && ndData.length > 0) {
//                 let htmlTable = `<table style="width:100%; border-collapse: collapse; margin-bottom: 20px; font-size:13px; background:#fff; border: 2px solid #dee2e6;">
//                     <tr style="background:#e9ecef; border-bottom:2px solid #0056b3; color:#0056b3;">
//                         <th style="padding:10px; text-align:center; border:1px solid #dee2e6; width: 40px;">STT</th>
//                         <th style="padding:10px; text-align:left; border:1px solid #dee2e6; width: 220px;">Tên nội dung</th>
//                         <th style="padding:10px; text-align:center; border:1px solid #dee2e6; width: 100px;">Ảnh nội dung</th>
//                         <th style="padding:0; text-align:left; border:1px solid #dee2e6;">Chi tiết giao việc và đánh giá</th>
//                         <th style="padding:10px; text-align:center; border:1px solid #dee2e6; width: 70px;">Thao tác</th>
//                     </tr>`;

//                 ndData.forEach((nd, idx) => {
//                     let strNgay = nd.ngay_nhap ? nd.ngay_nhap.replace('T', ' ') : '';
//                     let tenNDHtml = `<div style="color:#0056b3; font-weight:bold; font-size:14px; margin-bottom:5px;">${nd.ten_noi_dung}</div>
//                                      <div style="font-size:11px; color:#666; font-style:italic; margin-bottom:5px;">🕒 ${strNgay}</div>
//                                      <div style="font-size:12px; color:#495057;">${nd.chi_tiet || ''}</div>`;

//                     let dsAnhND = (nd.anh_dinh_kem || []).map(linkAnh => {
//                         if (!linkAnh) return '';
//                         let srcAnh = linkAnh; let fileId = null;
//                         if (linkAnh.includes('/d/')) { let match = linkAnh.match(/\/d\/([a-zA-Z0-9_-]+)/); if (match && match[1]) fileId = match[1]; }
//                         else if (linkAnh.includes('id=')) { let match = linkAnh.match(/id=([a-zA-Z0-9_-]+)/); if (match && match[1]) fileId = match[1]; }
//                         if (fileId) srcAnh = `https://drive.google.com/thumbnail?id=${fileId}&sz=w150`;

//                         return `<a href="${linkAnh}" target="_blank" title="Xem ảnh">
//                             <img src="${srcAnh}" style="width:40px; height:40px; object-fit:cover; border-radius:4px; border:1px solid #ccc; margin:2px;" onerror="this.style.display='none';">
//                         </a>`;
//                     }).join('');

//                     // 🌟 CỘT BẢNG LỒNG: ÉP CỐ ĐỊNH KÍCH THƯỚC % (table-layout: fixed)
//                     let innerTable = '';
//                     if (nd.nguoi_nhan && nd.nguoi_nhan.length > 0) {
//                         innerTable = `<table style="width:100%; table-layout: fixed; border-collapse: collapse; font-size:12px; background:#fafafa; margin:0;">
//                             <tr style="background:#f1f3f5; color:#495057;">
//                                 <th style="padding:6px; text-align:left; border-bottom:1px solid #ced4da; border-right:1px solid #dee2e6; width:22%;">Học sinh</th>
//                                 <th style="padding:6px; text-align:left; border-bottom:1px solid #ced4da; border-right:1px solid #dee2e6; width:25%;">Phần việc</th>
//                                 <th style="padding:6px; text-align:center; border-bottom:1px solid #ced4da; border-right:1px solid #dee2e6; width:10%;">Tiến độ</th>
//                                 <th style="padding:6px; text-align:center; border-bottom:1px solid #ced4da; border-right:1px solid #dee2e6; width:12%;">Đánh giá</th>
//                                 <th style="padding:6px; text-align:center; border-bottom:1px solid #ced4da; border-right:1px solid #dee2e6; width:10%;">Ảnh PV</th>
//                                 <th style="padding:6px; text-align:left; border-bottom:1px solid #ced4da; width:21%;">Nhận xét, ghi chú</th>
//                             </tr>`;

//                         nd.nguoi_nhan.forEach(hs => {
//                             let hsObj = window.DanhSachHocSinhLopHienTai ? window.DanhSachHocSinhLopHienTai.find(h => h.uid === hs.uid) : null;
//                             let avatar = hsObj ? hsObj.avatarUrl : `https://ui-avatars.com/api/?name=${encodeURIComponent(hs.ten)}&background=random&color=fff`;
//                             let hsInfo = `<div style="display:flex; align-items:center; gap:5px;">
//                                             <img src="${avatar}" style="width:20px; height:20px; border-radius:50%; border:1px solid #ccc; flex-shrink:0;">
//                                             <b style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${hs.ten}</b>
//                                           </div>`;

//                             // Xử lý Đánh giá
//                             let mauDG = '#6c757d';
//                             if (hs.danh_gia === 'Tốt') mauDG = '#28a745';
//                             else if (hs.danh_gia === 'Khá') mauDG = '#17a2b8';
//                             else if (hs.danh_gia === 'Trung Bình' || hs.danh_gia === 'TB') mauDG = '#fd7e14';
//                             else if (hs.danh_gia === 'Chưa đạt') mauDG = '#dc3545';
//                             let tagDG = hs.danh_gia ? `<span style="background:${mauDG}; color:white; padding:2px 6px; border-radius:10px; font-weight:bold;">${hs.danh_gia}</span>` : '-';

//                             // Xử lý Tiến độ (nếu có data)
//                             let tagTienDo = hs.tien_do ? `<span style="font-weight:bold; color:#0056b3;">${hs.tien_do}</span>` : `<i style="color:#adb5bd;">-</i>`;

//                             // Xử lý Ảnh phần việc của cá nhân (nếu có data)
//                             let dsAnhCaNhan = '-';
//                             let mangAnhHS = hs.anh_phan_viec || hs.danh_sach_anh || [];
//                             if (mangAnhHS.length > 0) {
//                                 dsAnhCaNhan = mangAnhHS.map(linkAnh => {
//                                     if (!linkAnh) return '';
//                                     let srcAnh = linkAnh; let fileId = null;
//                                     if (linkAnh.includes('/d/')) { let match = linkAnh.match(/\/d\/([a-zA-Z0-9_-]+)/); if (match && match[1]) fileId = match[1]; }
//                                     else if (linkAnh.includes('id=')) { let match = linkAnh.match(/id=([a-zA-Z0-9_-]+)/); if (match && match[1]) fileId = match[1]; }
//                                     if (fileId) srcAnh = `https://drive.google.com/thumbnail?id=${fileId}&sz=w100`;

//                                     return `<a href="${linkAnh}" target="_blank" title="Xem ảnh">
//                                         <img src="${srcAnh}" style="width:25px; height:25px; object-fit:cover; border-radius:4px; border:1px solid #ccc; margin:1px;" onerror="this.style.display='none';">
//                                     </a>`;
//                                 }).join('');
//                             }

//                             innerTable += `<tr>
//                                 <td style="padding:6px; border-bottom:1px solid #eee; border-right:1px solid #dee2e6; overflow:hidden;">${hsInfo}</td>
//                                 <td style="padding:6px; border-bottom:1px solid #eee; border-right:1px solid #dee2e6; color:#0056b3; font-weight:bold; overflow:hidden;">${hs.phan_viec || '-'}</td>
//                                 <td style="padding:6px; border-bottom:1px solid #eee; border-right:1px solid #dee2e6; text-align:center;">${tagTienDo}</td>
//                                 <td style="padding:6px; border-bottom:1px solid #eee; border-right:1px solid #dee2e6; text-align:center;">${tagDG}</td>
//                                 <td style="padding:6px; border-bottom:1px solid #eee; border-right:1px solid #dee2e6; text-align:center;">${dsAnhCaNhan}</td>
//                                 <td style="padding:6px; border-bottom:1px solid #eee; color:#666; overflow:hidden;">${hs.ghi_chu || ''}</td>
//                             </tr>`;
//                         });
//                         innerTable += `</table>`;
//                     } else {
//                         innerTable = `<div style="padding:10px; color:#adb5bd; font-style:italic;">Không chỉ định người nhận (Giao chung cả lớp)</div>`;
//                     }

//                     // Cột Thao tác
//                     let thaoTacBtn = `
//                         <div style="display:flex; flex-direction:column; gap:5px; padding:5px;">
//                             <button onclick="alert('Tính năng Xem chi tiết đang phát triển')" style="padding:4px; background:#17a2b8; color:white; border:none; border-radius:4px; cursor:pointer; font-size:11px; width:100%;">👁️ Xem</button>
//                             <button onclick="alert('Tính năng Sửa đang phát triển')" style="padding:4px; background:#ffc107; color:black; border:none; border-radius:4px; cursor:pointer; font-size:11px; width:100%;">✏️ Sửa</button>
//                             <button onclick="alert('Tính năng Xóa đang phát triển')" style="padding:4px; background:#dc3545; color:white; border:none; border-radius:4px; cursor:pointer; font-size:11px; width:100%;">🗑️ Xóa</button>
//                         </div>
//                     `;

//                     htmlTable += `<tr style="border-bottom: 2px solid #dee2e6;">
//                         <td style="padding:8px; text-align:center; border:1px solid #dee2e6; font-weight:bold;">${idx + 1}</td>
//                         <td style="padding:8px; border:1px solid #dee2e6; vertical-align:top;">${tenNDHtml}</td>
//                         <td style="padding:8px; text-align:center; border:1px solid #dee2e6; vertical-align:top;">${dsAnhND || '<span style="color:#adb5bd;font-size:11px;">Không có ảnh</span>'}</td>
//                         <td style="padding:0; border:1px solid #dee2e6; vertical-align:top;">${innerTable}</td>
//                         <td style="padding:0; text-align:center; border:1px solid #dee2e6; vertical-align:top;">${thaoTacBtn}</td>
//                     </tr>`;
//                 });
//                 htmlTable += `</table>`;
//                 bangCu.innerHTML = htmlTable;
//             } else {
//                 bangCu.innerHTML = '<i style="color:#666; font-size:13px; display:block; margin-bottom:15px;">Tuần này chưa có công việc giao việc nào được ghi nhận.</i>';
//             }
//         } else {
//             document.getElementById('gvcn-nd-sinh-hoat').value = ''; document.getElementById('gvcn-danh-gia-tuan').value = '';
//             vungAnhCu.innerHTML = ''; vungPreviewMoi.innerHTML = '<span>(Chưa có ảnh...)</span>'; bangCu.innerHTML = '';
//         }
//     } catch (e) { console.error(e); }
// };


// // =====================================================================
// // HÀM 21.16: TỰ ĐỘNG DÒ VÀ NẠP DỮ LIỆU TUẦN CŨ 
// // (FIX TRÀN CỘT TIẾN ĐỘ, HIỆN PREVIEW ẢNH CÁ NHÂN VÀ ĐÁNH GIÁ)
// // =====================================================================
// window.ham_21_16_tai_du_lieu_tuan = async function () {
//     const maLopRaw = document.getElementById('gvcn-input-lop').value;
//     const tuan = document.getElementById('gvcn-input-tuan').value.trim();
//     if (!maLopRaw || !tuan) return;

//     const maLop = maLopRaw.match(/\(([^)]+)\)$/)?.[1]?.trim() || maLopRaw;
//     const bangCu = document.getElementById('gvcn-bang-noi-dung-cu');

//     try {
//         const { data: nkData } = await _supabase.from('nhat_ky_gvcn')
//             .select('*').eq('ma_lop', maLop).eq('tuan_hoc', tuan).maybeSingle();

//         let vungAnhCu = document.getElementById('gvcn-vung-anh-cu-tuan');
//         let vungPreviewMoi = document.getElementById('gvcn-vung-preview-anh-tuan');

//         if (nkData) {
//             let tt = nkData.thong_tin_mo_rong || {};
//             if (nkData.tu_ngay) document.getElementById('gvcn-tuan-tu').value = nkData.tu_ngay;
//             if (nkData.den_ngay) document.getElementById('gvcn-tuan-den').value = nkData.den_ngay;

//             document.getElementById('gvcn-nd-sinh-hoat').value = nkData.noi_dung_sinh_hoat || '';
//             document.getElementById('gvcn-danh-gia-tuan').value = nkData.danh_gia_tuan || '';

//             // 🌟 NẠP ẢNH TUẦN
//             let danhSachAnh = tt.danh_sach_anh || [];
//             if (typeof danhSachAnh === 'string') { try { danhSachAnh = JSON.parse(danhSachAnh); } catch (e) { danhSachAnh = []; } }

//             if (danhSachAnh.length > 0) {
//                 let htmlAnhCu = '<div style="width:100%; font-size:12px; color:#28a745; font-weight:bold; margin-bottom:5px;">✅ Ảnh đã lưu trong tuần này:</div>';
//                 danhSachAnh.forEach(linkAnh => {
//                     if (!linkAnh) return;
//                     let srcAnh = linkAnh; let fileId = null;
//                     if (linkAnh.includes('/d/')) { let match = linkAnh.match(/\/d\/([a-zA-Z0-9_-]+)/); if (match && match[1]) fileId = match[1]; }
//                     else if (linkAnh.includes('id=')) { let match = linkAnh.match(/id=([a-zA-Z0-9_-]+)/); if (match && match[1]) fileId = match[1]; }
//                     if (fileId) srcAnh = `https://drive.google.com/thumbnail?id=${fileId}&sz=w1200`;

//                     htmlAnhCu += `<div style="width: 100%; padding: 5px; background: #fff; border: 1px solid #ced4da; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 10px; text-align: center;">
//                         <a href="${linkAnh}" target="_blank" title="Nhấn để xem ảnh gốc" style="text-decoration: none; display: block;">
//                             <img src="${srcAnh}" onerror="this.onerror=null; this.src='https://placehold.co/1200x600?text=Lỗi'; this.style.border='1px dashed #dc3545';" style="width: 100%; max-height: 600px; object-fit: contain; border-radius: 4px; cursor: pointer;">
//                         </a></div>`;
//                 });
//                 vungAnhCu.innerHTML = htmlAnhCu;
//                 vungPreviewMoi.innerHTML = '<span style="color:#28a745; font-weight:bold;">(Có thể tải thêm ảnh mới ở đây...)</span>';
//             } else {
//                 vungAnhCu.innerHTML = '';
//                 vungPreviewMoi.innerHTML = '<span>(Chưa có ảnh mới...)</span>';
//             }

//             // 🌟 NẠP BẢNG CÔNG VIỆC CŨ
//             const { data: ndData } = await _supabase.from('nhat_ky_gvcn_noi_dung')
//                 .select('*').eq('id_gvcn_nhat_ky', nkData.id).order('ngay_nhap', { ascending: true });

//             if (ndData && ndData.length > 0) {
//                 // ĐIỀU CHỈNH TỶ LỆ CỘT: HS(26%), Việc(20%), Tiến độ(14%), ĐG(12%), Ảnh PV(10%), Ghi chú(18%)
//                 let htmlTable = `<table style="width:100%; border-collapse: collapse; margin-bottom: 20px; font-size:13px; background:#fff; border: 2px solid #dee2e6;">
//                     <tr style="background:#e9ecef; border-bottom:2px solid #0056b3; color:#0056b3;">
//                         <th style="padding:10px; text-align:center; border:1px solid #dee2e6; width: 40px;">STT</th>
//                         <th style="padding:10px; text-align:left; border:1px solid #dee2e6; width: 220px;">Tên nội dung</th>
//                         <th style="padding:10px; text-align:center; border:1px solid #dee2e6; width: 90px;">Ảnh chung</th>
//                         <th style="padding:0; text-align:left; border:1px solid #dee2e6;">
//                             <table style="width:100%; table-layout: fixed; border-collapse: collapse; margin:0; background:transparent;">
//                                 <tr>
//                                     <th style="padding:10px 6px; text-align:left; border-right:1px solid #dee2e6; width:26%;">Học sinh</th>
//                                     <th style="padding:10px 6px; text-align:left; border-right:1px solid #dee2e6; width:20%;">Phần việc</th>
//                                     <th style="padding:10px 6px; text-align:center; border-right:1px solid #dee2e6; width:14%;">Tiến độ</th>
//                                     <th style="padding:10px 6px; text-align:center; border-right:1px solid #dee2e6; width:12%;">Đánh giá</th>
//                                     <th style="padding:10px 6px; text-align:center; border-right:1px solid #dee2e6; width:10%;">Ảnh PV</th>
//                                     <th style="padding:10px 6px; text-align:left; width:18%;">Nhận xét, ghi chú</th>
//                                 </tr>
//                             </table>
//                         </th>
//                         <th style="padding:10px; text-align:center; border:1px solid #dee2e6; width: 70px;">Thao tác</th>
//                     </tr>`;

//                 ndData.forEach((nd, idx) => {
//                     let strNgay = nd.ngay_nhap ? nd.ngay_nhap.replace('T', ' ') : '';
//                     let tenNDHtml = `<div style="color:#0056b3; font-weight:bold; font-size:14px; margin-bottom:5px;">${nd.ten_noi_dung}</div>
//                                      <div style="font-size:11px; color:#666; font-style:italic; margin-bottom:5px;">🕒 ${strNgay}</div>
//                                      <div style="font-size:12px; color:#495057;">${nd.chi_tiet || ''}</div>`;

//                     let dsAnhND = (nd.anh_dinh_kem || []).map(linkAnh => {
//                         if (!linkAnh) return '';
//                         let srcAnh = linkAnh; let fileId = null;
//                         if (linkAnh.includes('/d/')) { let match = linkAnh.match(/\/d\/([a-zA-Z0-9_-]+)/); if (match && match[1]) fileId = match[1]; }
//                         else if (linkAnh.includes('id=')) { let match = linkAnh.match(/id=([a-zA-Z0-9_-]+)/); if (match && match[1]) fileId = match[1]; }
//                         if (fileId) srcAnh = `https://drive.google.com/thumbnail?id=${fileId}&sz=w150`;

//                         return `<a href="${linkAnh}" target="_blank" title="Xem ảnh chung">
//                             <img src="${srcAnh}" style="width:40px; height:40px; object-fit:cover; border-radius:4px; border:1px solid #ccc; margin:2px;" onerror="this.style.display='none';">
//                         </a>`;
//                     }).join('');

//                     let innerTable = '';
//                     if (nd.nguoi_nhan && nd.nguoi_nhan.length > 0) {
//                         innerTable = `<table style="width:100%; table-layout: fixed; border-collapse: collapse; font-size:12px; background:#fafafa; margin:0;">`;

//                         nd.nguoi_nhan.forEach((hs, i) => {
//                             let hsObj = window.DanhSachHocSinhLopHienTai ? window.DanhSachHocSinhLopHienTai.find(h => h.uid === hs.uid) : null;
//                             let avatar = hsObj ? hsObj.avatarUrl : `https://ui-avatars.com/api/?name=${encodeURIComponent(hs.ten)}&background=random&color=fff`;
//                             let borderBottom = i < nd.nguoi_nhan.length - 1 ? 'border-bottom: 1px dashed #ced4da;' : '';

//                             // 1. Tiến độ (Đã fix css display inline-block)
//                             let bgTrangThai = '#6c757d';
//                             if (hs.trang_thai === 'Đã xong') bgTrangThai = '#28a745';
//                             else if (hs.trang_thai === 'Chưa làm') bgTrangThai = '#dc3545';
//                             else if (hs.trang_thai === 'Chưa xong') bgTrangThai = '#ffc107';
//                             else if (hs.trang_thai === 'Đang làm') bgTrangThai = '#17a2b8';
//                             let nhanTrangThai = hs.trang_thai ? `<span style="background:${bgTrangThai}; color:${hs.trang_thai === 'Chưa xong' ? '#000' : '#fff'}; padding:4px 8px; border-radius:12px; font-size:11px; font-weight:bold; box-shadow:0 1px 2px rgba(0,0,0,0.15); display:inline-block; text-align:center;">${hs.trang_thai}</span>` : '<span style="color:#999; font-size:11px;">-</span>';

//                             // 2. Đánh giá
//                             let nhanDanhGia = (hs.danh_gia && hs.danh_gia.trim() !== '') ? `<span style="color:#e83e8c; font-weight:bold; font-size:12px;">${hs.danh_gia}</span>` : '<span style="color:#999; font-size:11px; font-style:italic;">Chưa ĐG</span>';

//                             // 3. Ảnh minh chứng riêng (Hiển thị dạng Preview Thumbnail)
//                             let iconAnhHS = '<span style="color:#ccc; font-size:12px;">-</span>';
//                             if (hs.anh_minh_chung) {
//                                 let srcAnhHS = hs.anh_minh_chung;
//                                 let fileIdHS = null;
//                                 if (srcAnhHS.includes('/d/')) { let m = srcAnhHS.match(/\/d\/([a-zA-Z0-9_-]+)/); if (m) fileIdHS = m[1]; }
//                                 else if (srcAnhHS.includes('id=')) { let m = srcAnhHS.match(/id=([a-zA-Z0-9_-]+)/); if (m) fileIdHS = m[1]; }
//                                 if (fileIdHS) srcAnhHS = `https://drive.google.com/thumbnail?id=${fileIdHS}&sz=w150`;

//                                 iconAnhHS = `<a href="${hs.anh_minh_chung}" target="_blank" title="Xem ảnh cá nhân">
//                                     <img src="${srcAnhHS}" style="width:35px; height:35px; object-fit:cover; border-radius:4px; border:1px solid #ccc; margin:2px;" onerror="this.style.display='none';">
//                                 </a>`;
//                             }

//                             innerTable += `<tr>
//                                 <td style="padding:8px 6px; width:26%; ${borderBottom} border-right: 1px dashed #ced4da; vertical-align:middle; word-wrap: break-word;">
//                                     <div style="display:flex; align-items:flex-start; gap:6px;">
//                                         <img src="${avatar}" style="width:24px; height:24px; border-radius:50%; border:1px solid #ccc; flex-shrink:0; margin-top:1px;">
//                                         <b style="line-height:1.4; color:#333; font-size:12px;">${hs.ten}</b>
//                                     </div>
//                                 </td>
//                                 <td style="padding:8px 6px; width:20%; ${borderBottom} border-right: 1px dashed #ced4da; vertical-align:middle; color:#0056b3; font-weight:bold; word-wrap: break-word;">${hs.phan_viec || '-'}</td>
//                                 <td style="padding:8px 6px; width:14%; ${borderBottom} border-right: 1px dashed #ced4da; vertical-align:middle; text-align:center;">${nhanTrangThai}</td>
//                                 <td style="padding:8px 6px; width:12%; ${borderBottom} border-right: 1px dashed #ced4da; vertical-align:middle; text-align:center;">${nhanDanhGia}</td>
//                                 <td style="padding:8px 6px; width:10%; ${borderBottom} border-right: 1px dashed #ced4da; vertical-align:middle; text-align:center;">${iconAnhHS}</td>
//                                 <td style="padding:8px 6px; width:18%; ${borderBottom} color:#666; word-wrap: break-word; vertical-align:middle;">${hs.ghi_chu || ''}</td>
//                             </tr>`;
//                         });
//                         innerTable += `</table>`;
//                     } else {
//                         innerTable = `<div style="padding:15px; color:#adb5bd; font-style:italic;">Không chỉ định người nhận (Giao chung cả lớp)</div>`;
//                     }

//                     let thaoTacBtn = `
//                         <div style="display:flex; flex-direction:column; gap:5px; padding:5px;">
//                             <button onclick="alert('Tính năng Xem chi tiết đang phát triển')" style="padding:4px; background:#17a2b8; color:white; border:none; border-radius:4px; cursor:pointer; font-size:11px; width:100%;">👁️ Xem</button>
//                             <button onclick="alert('Tính năng Sửa đang phát triển')" style="padding:4px; background:#ffc107; color:black; border:none; border-radius:4px; cursor:pointer; font-size:11px; width:100%;">✏️ Sửa</button>
//                             <button onclick="alert('Tính năng Xóa đang phát triển')" style="padding:4px; background:#dc3545; color:white; border:none; border-radius:4px; cursor:pointer; font-size:11px; width:100%;">🗑️ Xóa</button>
//                         </div>
//                     `;

//                     htmlTable += `<tr style="border-bottom: 2px solid #dee2e6;">
//                         <td style="padding:8px; text-align:center; border:1px solid #dee2e6; font-weight:bold; vertical-align:top;">${idx + 1}</td>
//                         <td style="padding:8px; border:1px solid #dee2e6; vertical-align:top;">${tenNDHtml}</td>
//                         <td style="padding:8px; text-align:center; border:1px solid #dee2e6; vertical-align:top;">${dsAnhND || '<span style="color:#adb5bd;font-size:11px;">-</span>'}</td>
//                         <td style="padding:0; border:1px solid #dee2e6; vertical-align:top;">${innerTable}</td>
//                         <td style="padding:0; text-align:center; border:1px solid #dee2e6; vertical-align:top;">${thaoTacBtn}</td>
//                     </tr>`;
//                 });
//                 htmlTable += `</table>`;
//                 bangCu.innerHTML = htmlTable;
//             } else {
//                 bangCu.innerHTML = '<i style="color:#666; font-size:13px; display:block; margin-bottom:15px;">Tuần này chưa có công việc giao việc nào được ghi nhận.</i>';
//             }
//         } else {
//             document.getElementById('gvcn-nd-sinh-hoat').value = ''; document.getElementById('gvcn-danh-gia-tuan').value = '';
//             vungAnhCu.innerHTML = ''; vungPreviewMoi.innerHTML = '<span>(Chưa có ảnh...)</span>'; bangCu.innerHTML = '';
//         }
//     } catch (e) { console.error(e); }
// };


// // =====================================================================
// // HÀM 21.16: TỰ ĐỘNG DÒ VÀ NẠP DỮ LIỆU TUẦN CŨ (FIX SỰ KIỆN CLICK MỞ POPUP)
// // =====================================================================
// window.ham_21_16_tai_du_lieu_tuan = async function () {
//     const maLopRaw = document.getElementById('gvcn-input-lop').value;
//     const tuan = document.getElementById('gvcn-input-tuan').value.trim();
//     if (!maLopRaw || !tuan) return;

//     const maLop = maLopRaw.match(/\(([^)]+)\)$/)?.[1]?.trim() || maLopRaw;
//     const bangCu = document.getElementById('gvcn-bang-noi-dung-cu');

//     try {
//         const { data: nkData } = await _supabase.from('nhat_ky_gvcn')
//             .select('*').eq('ma_lop', maLop).eq('tuan_hoc', tuan).maybeSingle();

//         let vungAnhCu = document.getElementById('gvcn-vung-anh-cu-tuan');
//         let vungPreviewMoi = document.getElementById('gvcn-vung-preview-anh-tuan');

//         if (nkData) {
//             let tt = nkData.thong_tin_mo_rong || {};
//             if (nkData.tu_ngay) document.getElementById('gvcn-tuan-tu').value = nkData.tu_ngay;
//             if (nkData.den_ngay) document.getElementById('gvcn-tuan-den').value = nkData.den_ngay;

//             document.getElementById('gvcn-nd-sinh-hoat').value = nkData.noi_dung_sinh_hoat || '';
//             document.getElementById('gvcn-danh-gia-tuan').value = nkData.danh_gia_tuan || '';

//             // 🌟 NẠP ẢNH TUẦN
//             let danhSachAnh = tt.danh_sach_anh || [];
//             if (typeof danhSachAnh === 'string') { try { danhSachAnh = JSON.parse(danhSachAnh); } catch (e) { danhSachAnh = []; } }

//             if (danhSachAnh.length > 0) {
//                 let htmlAnhCu = '<div style="width:100%; font-size:12px; color:#28a745; font-weight:bold; margin-bottom:5px;">✅ Ảnh đã lưu trong tuần này:</div>';
//                 danhSachAnh.forEach(linkAnh => {
//                     if (!linkAnh) return;
//                     let srcAnh = linkAnh; let fileId = null;
//                     if (linkAnh.includes('/d/')) { let match = linkAnh.match(/\/d\/([a-zA-Z0-9_-]+)/); if (match && match[1]) fileId = match[1]; }
//                     else if (linkAnh.includes('id=')) { let match = linkAnh.match(/id=([a-zA-Z0-9_-]+)/); if (match && match[1]) fileId = match[1]; }
//                     if (fileId) srcAnh = `https://drive.google.com/thumbnail?id=${fileId}&sz=w1200`;

//                     htmlAnhCu += `<div style="width: 100%; padding: 5px; background: #fff; border: 1px solid #ced4da; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 10px; text-align: center;">
//                         <a href="${linkAnh}" target="_blank" title="Nhấn để xem ảnh gốc" style="text-decoration: none; display: block;">
//                             <img src="${srcAnh}" onerror="this.onerror=null; this.src='https://placehold.co/1200x600?text=Lỗi'; this.style.border='1px dashed #dc3545';" style="width: 100%; max-height: 600px; object-fit: contain; border-radius: 4px; cursor: pointer;">
//                         </a></div>`;
//                 });
//                 vungAnhCu.innerHTML = htmlAnhCu;
//                 vungPreviewMoi.innerHTML = '<span style="color:#28a745; font-weight:bold;">(Có thể tải thêm ảnh mới ở đây...)</span>';
//             } else {
//                 vungAnhCu.innerHTML = '';
//                 vungPreviewMoi.innerHTML = '<span>(Chưa có ảnh mới...)</span>';
//             }

//             // 🌟 NẠP BẢNG CÔNG VIỆC CŨ
//             const { data: ndData } = await _supabase.from('nhat_ky_gvcn_noi_dung')
//                 .select('*').eq('id_gvcn_nhat_ky', nkData.id).order('ngay_nhap', { ascending: true });

//             if (ndData && ndData.length > 0) {
//                 // LƯU DATA ĐỂ POPUP CÓ THỂ ĐỌC ĐƯỢC
//                 window.gvcn_DanhSachNoiDangHienTai = ndData;

//                 let htmlTable = `<table style="width:100%; border-collapse: collapse; margin-bottom: 20px; font-size:13px; background:#fff; border: 2px solid #dee2e6;">
//                     <tr style="background:#e9ecef; border-bottom:2px solid #0056b3; color:#0056b3;">
//                         <th style="padding:10px; text-align:center; border:1px solid #dee2e6; width: 40px;">STT</th>
//                         <th style="padding:10px; text-align:left; border:1px solid #dee2e6; width: 220px;">Tên nội dung</th>
//                         <th style="padding:10px; text-align:center; border:1px solid #dee2e6; width: 90px;">Ảnh chung</th>
//                         <th style="padding:0; text-align:left; border:1px solid #dee2e6;">
//                             <table style="width:100%; table-layout: fixed; border-collapse: collapse; margin:0; background:transparent;">
//                                 <tr>
//                                     <th style="padding:10px 6px; text-align:left; border-right:1px solid #dee2e6; width:26%;">Học sinh</th>
//                                     <th style="padding:10px 6px; text-align:left; border-right:1px solid #dee2e6; width:20%;">Phần việc</th>
//                                     <th style="padding:10px 6px; text-align:center; border-right:1px solid #dee2e6; width:14%;">Tiến độ</th>
//                                     <th style="padding:10px 6px; text-align:center; border-right:1px solid #dee2e6; width:12%;">Đánh giá</th>
//                                     <th style="padding:10px 6px; text-align:center; border-right:1px solid #dee2e6; width:10%;">Ảnh PV</th>
//                                     <th style="padding:10px 6px; text-align:left; width:18%;">Nhận xét, ghi chú</th>
//                                 </tr>
//                             </table>
//                         </th>
//                         <th style="padding:10px; text-align:center; border:1px solid #dee2e6; width: 70px;">Thao tác</th>
//                     </tr>`;

//                 ndData.forEach((nd, idx) => {
//                     let strNgay = nd.ngay_nhap ? nd.ngay_nhap.replace('T', ' ') : '';
//                     let tenNDHtml = `<div style="color:#0056b3; font-weight:bold; font-size:14px; margin-bottom:5px;">${nd.ten_noi_dung}</div>
//                                      <div style="font-size:11px; color:#666; font-style:italic; margin-bottom:5px;">🕒 ${strNgay}</div>
//                                      <div style="font-size:12px; color:#495057;">${nd.chi_tiet || ''}</div>`;

//                     let dsAnhND = (nd.anh_dinh_kem || []).map(linkAnh => {
//                         if (!linkAnh) return '';
//                         let srcAnh = linkAnh; let fileId = null;
//                         if (linkAnh.includes('/d/')) { let match = linkAnh.match(/\/d\/([a-zA-Z0-9_-]+)/); if (match && match[1]) fileId = match[1]; }
//                         else if (linkAnh.includes('id=')) { let match = linkAnh.match(/id=([a-zA-Z0-9_-]+)/); if (match && match[1]) fileId = match[1]; }
//                         if (fileId) srcAnh = `https://drive.google.com/thumbnail?id=${fileId}&sz=w150`;

//                         return `<a href="${linkAnh}" target="_blank" onclick="event.stopPropagation()" title="Xem ảnh chung">
//                             <img src="${srcAnh}" style="width:40px; height:40px; object-fit:cover; border-radius:4px; border:1px solid #ccc; margin:2px;" onerror="this.style.display='none';">
//                         </a>`;
//                     }).join('');

//                     let innerTable = '';
//                     if (nd.nguoi_nhan && nd.nguoi_nhan.length > 0) {
//                         innerTable = `<table style="width:100%; table-layout: fixed; border-collapse: collapse; font-size:12px; background:transparent; margin:0;">`;

//                         nd.nguoi_nhan.forEach((hs, i) => {
//                             let hsObj = window.DanhSachHocSinhLopHienTai ? window.DanhSachHocSinhLopHienTai.find(h => h.uid === hs.uid) : null;
//                             let avatar = hsObj ? hsObj.avatarUrl : `https://ui-avatars.com/api/?name=${encodeURIComponent(hs.ten)}&background=random&color=fff`;
//                             let borderBottom = i < nd.nguoi_nhan.length - 1 ? 'border-bottom: 1px dashed #ced4da;' : '';

//                             let bgTrangThai = '#6c757d';
//                             if (hs.trang_thai === 'Đã xong') bgTrangThai = '#28a745';
//                             else if (hs.trang_thai === 'Chưa làm') bgTrangThai = '#dc3545';
//                             else if (hs.trang_thai === 'Chưa xong') bgTrangThai = '#ffc107';
//                             else if (hs.trang_thai === 'Đang làm') bgTrangThai = '#17a2b8';
//                             let nhanTrangThai = hs.trang_thai ? `<span style="background:${bgTrangThai}; color:${hs.trang_thai === 'Chưa xong' ? '#000' : '#fff'}; padding:4px 8px; border-radius:12px; font-size:11px; font-weight:bold; box-shadow:0 1px 2px rgba(0,0,0,0.15); display:inline-block; text-align:center;">${hs.trang_thai}</span>` : '<span style="color:#999; font-size:11px;">-</span>';

//                             let nhanDanhGia = (hs.danh_gia && hs.danh_gia.trim() !== '') ? `<span style="color:#e83e8c; font-weight:bold; font-size:12px;">${hs.danh_gia}</span>` : '<span style="color:#999; font-size:11px; font-style:italic;">Chưa ĐG</span>';

//                             let iconAnhHS = '<span style="color:#ccc; font-size:12px;">-</span>';
//                             if (hs.anh_minh_chung) {
//                                 let srcAnhHS = hs.anh_minh_chung;
//                                 let fileIdHS = null;
//                                 if (srcAnhHS.includes('/d/')) { let m = srcAnhHS.match(/\/d\/([a-zA-Z0-9_-]+)/); if (m) fileIdHS = m[1]; }
//                                 else if (srcAnhHS.includes('id=')) { let m = srcAnhHS.match(/id=([a-zA-Z0-9_-]+)/); if (m) fileIdHS = m[1]; }
//                                 if (fileIdHS) srcAnhHS = `https://drive.google.com/thumbnail?id=${fileIdHS}&sz=w150`;

//                                 iconAnhHS = `<a href="${hs.anh_minh_chung}" target="_blank" onclick="event.stopPropagation()" title="Xem ảnh cá nhân">
//                                     <img src="${srcAnhHS}" style="width:35px; height:35px; object-fit:cover; border-radius:4px; border:1px solid #ccc; margin:2px;" onerror="this.style.display='none';">
//                                 </a>`;
//                             }

//                             innerTable += `<tr>
//                                 <td style="padding:8px 6px; width:26%; ${borderBottom} border-right: 1px dashed #ced4da; vertical-align:middle; word-wrap: break-word;">
//                                     <div style="display:flex; align-items:flex-start; gap:6px;">
//                                         <img src="${avatar}" style="width:24px; height:24px; border-radius:50%; border:1px solid #ccc; flex-shrink:0; margin-top:1px;">
//                                         <b style="line-height:1.4; color:#333; font-size:12px;">${hs.ten}</b>
//                                     </div>
//                                 </td>
//                                 <td style="padding:8px 6px; width:20%; ${borderBottom} border-right: 1px dashed #ced4da; vertical-align:middle; color:#0056b3; font-weight:bold; word-wrap: break-word;">${hs.phan_viec || '-'}</td>
//                                 <td style="padding:8px 6px; width:14%; ${borderBottom} border-right: 1px dashed #ced4da; vertical-align:middle; text-align:center;">${nhanTrangThai}</td>
//                                 <td style="padding:8px 6px; width:12%; ${borderBottom} border-right: 1px dashed #ced4da; vertical-align:middle; text-align:center;">${nhanDanhGia}</td>
//                                 <td style="padding:8px 6px; width:10%; ${borderBottom} border-right: 1px dashed #ced4da; vertical-align:middle; text-align:center;">${iconAnhHS}</td>
//                                 <td style="padding:8px 6px; width:18%; ${borderBottom} color:#666; word-wrap: break-word; vertical-align:middle;">${hs.ghi_chu || ''}</td>
//                             </tr>`;
//                         });
//                         innerTable += `</table>`;
//                     } else {
//                         innerTable = `<div style="padding:15px; color:#adb5bd; font-style:italic;">Không chỉ định người nhận (Giao chung cả lớp)</div>`;
//                     }

//                     let thaoTacBtn = `
//                         <div style="display:flex; flex-direction:column; gap:5px; padding:5px;">
//                             <button onclick="event.stopPropagation(); window.ham_21_20_mo_popup_chi_tiet('${nd.id}')" style="padding:4px; background:#17a2b8; color:white; border:none; border-radius:4px; cursor:pointer; font-size:11px; width:100%;">👁️ Xem</button>
//                             <button onclick="event.stopPropagation(); alert('Tính năng Sửa đang phát triển')" style="padding:4px; background:#ffc107; color:black; border:none; border-radius:4px; cursor:pointer; font-size:11px; width:100%;">✏️ Sửa</button>
//                             <button onclick="event.stopPropagation(); if(typeof ham_21_21_xoa_noi_dung === 'function') ham_21_21_xoa_noi_dung('${nd.id}')" style="padding:4px; background:#dc3545; color:white; border:none; border-radius:4px; cursor:pointer; font-size:11px; width:100%;">🗑️ Xóa</button>
//                         </div>
//                     `;

//                     // 🌟 GÁN SỰ KIỆN ONCLICK ĐỂ MỞ POPUP & HIỆU ỨNG HOVER
//                     htmlTable += `<tr style="border-bottom: 2px solid #dee2e6; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#f1f8ff'" onmouseout="this.style.background='transparent'" onclick="if(typeof window.ham_21_20_mo_popup_chi_tiet === 'function') window.ham_21_20_mo_popup_chi_tiet('${nd.id}')">
//                         <td style="padding:8px; text-align:center; border:1px solid #dee2e6; font-weight:bold; vertical-align:top;">${idx + 1}</td>
//                         <td style="padding:8px; border:1px solid #dee2e6; vertical-align:top;">${tenNDHtml}</td>
//                         <td style="padding:8px; text-align:center; border:1px solid #dee2e6; vertical-align:top;" onclick="event.stopPropagation()">${dsAnhND || '<span style="color:#adb5bd;font-size:11px;">-</span>'}</td>
//                         <td style="padding:0; border:1px solid #dee2e6; vertical-align:top;">${innerTable}</td>
//                         <td style="padding:0; text-align:center; border:1px solid #dee2e6; vertical-align:top;" onclick="event.stopPropagation()">${thaoTacBtn}</td>
//                     </tr>`;
//                 });
//                 htmlTable += `</table>`;
//                 bangCu.innerHTML = htmlTable;
//             } else {
//                 bangCu.innerHTML = '<i style="color:#666; font-size:13px; display:block; margin-bottom:15px;">Tuần này chưa có công việc giao việc nào được ghi nhận.</i>';
//             }
//         } else {
//             document.getElementById('gvcn-nd-sinh-hoat').value = ''; document.getElementById('gvcn-danh-gia-tuan').value = '';
//             vungAnhCu.innerHTML = ''; vungPreviewMoi.innerHTML = '<span>(Chưa có ảnh...)</span>'; bangCu.innerHTML = '';
//         }
//     } catch (e) { console.error(e); }
// };


// // =====================================================================
// // HÀM 21.16: TỰ ĐỘNG DÒ VÀ NẠP DỮ LIỆU TUẦN CŨ (ĐỔ MÀU "CHƯA ĐG")
// // =====================================================================
// window.ham_21_16_tai_du_lieu_tuan = async function () {
//     const maLopRaw = document.getElementById('gvcn-input-lop').value;
//     const tuan = document.getElementById('gvcn-input-tuan').value.trim();
//     if (!maLopRaw || !tuan) return;

//     const maLop = maLopRaw.match(/\(([^)]+)\)$/)?.[1]?.trim() || maLopRaw;
//     const bangCu = document.getElementById('gvcn-bang-noi-dung-cu');

//     try {
//         const { data: nkData } = await _supabase.from('nhat_ky_gvcn')
//             .select('*').eq('ma_lop', maLop).eq('tuan_hoc', tuan).maybeSingle();

//         let vungAnhCu = document.getElementById('gvcn-vung-anh-cu-tuan');
//         let vungPreviewMoi = document.getElementById('gvcn-vung-preview-anh-tuan');

//         if (nkData) {
//             let tt = nkData.thong_tin_mo_rong || {};
//             if (nkData.tu_ngay) document.getElementById('gvcn-tuan-tu').value = nkData.tu_ngay;
//             if (nkData.den_ngay) document.getElementById('gvcn-tuan-den').value = nkData.den_ngay;

//             document.getElementById('gvcn-nd-sinh-hoat').value = nkData.noi_dung_sinh_hoat || '';
//             document.getElementById('gvcn-danh-gia-tuan').value = nkData.danh_gia_tuan || '';

//             // 🌟 NẠP ẢNH TUẦN
//             let danhSachAnh = tt.danh_sach_anh || [];
//             if (typeof danhSachAnh === 'string') { try { danhSachAnh = JSON.parse(danhSachAnh); } catch (e) { danhSachAnh = []; } }

//             if (danhSachAnh.length > 0) {
//                 let htmlAnhCu = '<div style="width:100%; font-size:12px; color:#28a745; font-weight:bold; margin-bottom:5px;">✅ Ảnh đã lưu trong tuần này:</div>';
//                 danhSachAnh.forEach(linkAnh => {
//                     if (!linkAnh) return;
//                     let srcAnh = linkAnh; let fileId = null;
//                     if (linkAnh.includes('/d/')) { let match = linkAnh.match(/\/d\/([a-zA-Z0-9_-]+)/); if (match && match[1]) fileId = match[1]; }
//                     else if (linkAnh.includes('id=')) { let match = linkAnh.match(/id=([a-zA-Z0-9_-]+)/); if (match && match[1]) fileId = match[1]; }
//                     if (fileId) srcAnh = `https://drive.google.com/thumbnail?id=${fileId}&sz=w1200`;

//                     htmlAnhCu += `<div style="width: 100%; padding: 5px; background: #fff; border: 1px solid #ced4da; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 10px; text-align: center;">
//                         <a href="${linkAnh}" target="_blank" title="Nhấn để xem ảnh gốc" style="text-decoration: none; display: block;">
//                             <img src="${srcAnh}" onerror="this.onerror=null; this.src='https://placehold.co/1200x600?text=Lỗi'; this.style.border='1px dashed #dc3545';" style="width: 100%; max-height: 600px; object-fit: contain; border-radius: 4px; cursor: pointer;">
//                         </a></div>`;
//                 });
//                 vungAnhCu.innerHTML = htmlAnhCu;
//                 vungPreviewMoi.innerHTML = '<span style="color:#28a745; font-weight:bold;">(Có thể tải thêm ảnh mới ở đây...)</span>';
//             } else {
//                 vungAnhCu.innerHTML = '';
//                 vungPreviewMoi.innerHTML = '<span>(Chưa có ảnh mới...)</span>';
//             }

//             // 🌟 NẠP BẢNG CÔNG VIỆC CŨ
//             const { data: ndData } = await _supabase.from('nhat_ky_gvcn_noi_dung')
//                 .select('*').eq('id_gvcn_nhat_ky', nkData.id).order('ngay_nhap', { ascending: true });

//             if (ndData && ndData.length > 0) {
//                 window.gvcn_DanhSachNoiDangHienTai = ndData; // Lưu lại để dùng cho Popup

//                 let htmlTable = `<table style="width:100%; border-collapse: collapse; margin-bottom: 20px; font-size:13px; background:#fff; border: 2px solid #dee2e6;">
//                     <tr style="background:#e9ecef; border-bottom:2px solid #0056b3; color:#0056b3;">
//                         <th style="padding:10px; text-align:center; border:1px solid #dee2e6; width: 40px;">STT</th>
//                         <th style="padding:10px; text-align:left; border:1px solid #dee2e6; width: 220px;">Tên nội dung</th>
//                         <th style="padding:10px; text-align:center; border:1px solid #dee2e6; width: 90px;">Ảnh chung</th>
//                         <th style="padding:0; text-align:left; border:1px solid #dee2e6;">
//                             <table style="width:100%; table-layout: fixed; border-collapse: collapse; margin:0; background:transparent;">
//                                 <tr>
//                                     <th style="padding:10px 6px; text-align:left; border-right:1px solid #dee2e6; width:26%;">Học sinh</th>
//                                     <th style="padding:10px 6px; text-align:left; border-right:1px solid #dee2e6; width:20%;">Phần việc</th>
//                                     <th style="padding:10px 6px; text-align:center; border-right:1px solid #dee2e6; width:14%;">Tiến độ</th>
//                                     <th style="padding:10px 6px; text-align:center; border-right:1px solid #dee2e6; width:12%;">Đánh giá</th>
//                                     <th style="padding:10px 6px; text-align:center; border-right:1px solid #dee2e6; width:10%;">Ảnh PV</th>
//                                     <th style="padding:10px 6px; text-align:left; width:18%;">Nhận xét, ghi chú</th>
//                                 </tr>
//                             </table>
//                         </th>
//                         <th style="padding:10px; text-align:center; border:1px solid #dee2e6; width: 70px;">Thao tác</th>
//                     </tr>`;

//                 ndData.forEach((nd, idx) => {
//                     let strNgay = nd.ngay_nhap ? nd.ngay_nhap.replace('T', ' ') : '';
//                     let tenNDHtml = `<div style="color:#0056b3; font-weight:bold; font-size:14px; margin-bottom:5px;">${nd.ten_noi_dung}</div>
//                                      <div style="font-size:11px; color:#666; font-style:italic; margin-bottom:5px;">🕒 ${strNgay}</div>
//                                      <div style="font-size:12px; color:#495057;">${nd.chi_tiet || ''}</div>`;

//                     let dsAnhND = (nd.anh_dinh_kem || []).map(linkAnh => {
//                         if (!linkAnh) return '';
//                         let srcAnh = linkAnh; let fileId = null;
//                         if (linkAnh.includes('/d/')) { let match = linkAnh.match(/\/d\/([a-zA-Z0-9_-]+)/); if (match && match[1]) fileId = match[1]; }
//                         else if (linkAnh.includes('id=')) { let match = linkAnh.match(/id=([a-zA-Z0-9_-]+)/); if (match && match[1]) fileId = match[1]; }
//                         if (fileId) srcAnh = `https://drive.google.com/thumbnail?id=${fileId}&sz=w150`;

//                         return `<a href="${linkAnh}" target="_blank" onclick="event.stopPropagation()" title="Xem ảnh chung">
//                             <img src="${srcAnh}" style="width:40px; height:40px; object-fit:cover; border-radius:4px; border:1px solid #ccc; margin:2px;" onerror="this.style.display='none';">
//                         </a>`;
//                     }).join('');

//                     let innerTable = '';
//                     if (nd.nguoi_nhan && nd.nguoi_nhan.length > 0) {
//                         innerTable = `<table style="width:100%; table-layout: fixed; border-collapse: collapse; font-size:12px; background:transparent; margin:0;">`;

//                         nd.nguoi_nhan.forEach((hs, i) => {
//                             let hsObj = window.DanhSachHocSinhLopHienTai ? window.DanhSachHocSinhLopHienTai.find(h => h.uid === hs.uid) : null;
//                             let avatar = hsObj ? hsObj.avatarUrl : `https://ui-avatars.com/api/?name=${encodeURIComponent(hs.ten)}&background=random&color=fff`;
//                             let borderBottom = i < nd.nguoi_nhan.length - 1 ? 'border-bottom: 1px dashed #ced4da;' : '';

//                             // Xử lý nhãn Tiến độ
//                             let bgTrangThai = '#6c757d';
//                             if (hs.trang_thai === 'Đã xong') bgTrangThai = '#28a745';
//                             else if (hs.trang_thai === 'Chưa làm') bgTrangThai = '#dc3545';
//                             else if (hs.trang_thai === 'Chưa xong') bgTrangThai = '#ffc107';
//                             else if (hs.trang_thai === 'Đang làm') bgTrangThai = '#17a2b8';
//                             let nhanTrangThai = hs.trang_thai ? `<span style="background:${bgTrangThai}; color:${hs.trang_thai === 'Chưa xong' ? '#000' : '#fff'}; padding:4px 8px; border-radius:12px; font-size:11px; font-weight:bold; box-shadow:0 1px 2px rgba(0,0,0,0.15); display:inline-block; text-align:center;">${hs.trang_thai}</span>` : '<span style="color:#999; font-size:11px;">-</span>';

//                             // 🌟 Xử lý nhãn Đánh giá (Tô đỏ rực nếu chưa đánh giá)
//                             let nhanDanhGia = '';
//                             if (hs.danh_gia && hs.danh_gia.trim() !== '') {
//                                 nhanDanhGia = `<span style="color:#e83e8c; font-weight:bold; font-size:12px;">${hs.danh_gia}</span>`;
//                             } else {
//                                 nhanDanhGia = `<span style="background:#dc3545; color:#fff; padding:4px 8px; border-radius:12px; font-size:11px; font-weight:bold; box-shadow:0 1px 2px rgba(0,0,0,0.15); display:inline-block; text-align:center;">Chưa ĐG</span>`;
//                             }

//                             // Ảnh minh chứng riêng
//                             let iconAnhHS = '<span style="color:#ccc; font-size:12px;">-</span>';
//                             if (hs.anh_minh_chung) {
//                                 let srcAnhHS = hs.anh_minh_chung;
//                                 let fileIdHS = null;
//                                 if (srcAnhHS.includes('/d/')) { let m = srcAnhHS.match(/\/d\/([a-zA-Z0-9_-]+)/); if (m) fileIdHS = m[1]; }
//                                 else if (srcAnhHS.includes('id=')) { let m = srcAnhHS.match(/id=([a-zA-Z0-9_-]+)/); if (m) fileIdHS = m[1]; }
//                                 if (fileIdHS) srcAnhHS = `https://drive.google.com/thumbnail?id=${fileIdHS}&sz=w150`;

//                                 iconAnhHS = `<a href="${hs.anh_minh_chung}" target="_blank" onclick="event.stopPropagation()" title="Xem ảnh cá nhân">
//                                     <img src="${srcAnhHS}" style="width:35px; height:35px; object-fit:cover; border-radius:4px; border:1px solid #ccc; margin:2px;" onerror="this.style.display='none';">
//                                 </a>`;
//                             }

//                             innerTable += `<tr>
//                                 <td style="padding:8px 6px; width:26%; ${borderBottom} border-right: 1px dashed #ced4da; vertical-align:middle; word-wrap: break-word;">
//                                     <div style="display:flex; align-items:flex-start; gap:6px;">
//                                         <img src="${avatar}" style="width:24px; height:24px; border-radius:50%; border:1px solid #ccc; flex-shrink:0; margin-top:1px;">
//                                         <b style="line-height:1.4; color:#333; font-size:12px;">${hs.ten}</b>
//                                     </div>
//                                 </td>
//                                 <td style="padding:8px 6px; width:20%; ${borderBottom} border-right: 1px dashed #ced4da; vertical-align:middle; color:#0056b3; font-weight:bold; word-wrap: break-word;">${hs.phan_viec || '-'}</td>
//                                 <td style="padding:8px 6px; width:14%; ${borderBottom} border-right: 1px dashed #ced4da; vertical-align:middle; text-align:center;">${nhanTrangThai}</td>
//                                 <td style="padding:8px 6px; width:12%; ${borderBottom} border-right: 1px dashed #ced4da; vertical-align:middle; text-align:center;">${nhanDanhGia}</td>
//                                 <td style="padding:8px 6px; width:10%; ${borderBottom} border-right: 1px dashed #ced4da; vertical-align:middle; text-align:center;">${iconAnhHS}</td>
//                                 <td style="padding:8px 6px; width:18%; ${borderBottom} color:#666; word-wrap: break-word; vertical-align:middle;">${hs.ghi_chu || ''}</td>
//                             </tr>`;
//                         });
//                         innerTable += `</table>`;
//                     } else {
//                         innerTable = `<div style="padding:15px; color:#adb5bd; font-style:italic;">Không chỉ định người nhận (Giao chung cả lớp)</div>`;
//                     }

//                     let thaoTacBtn = `
//                         <div style="display:flex; flex-direction:column; gap:5px; padding:5px;">
//                             <button onclick="event.stopPropagation(); window.ham_21_20_mo_popup_chi_tiet('${nd.id}')" style="padding:4px; background:#17a2b8; color:white; border:none; border-radius:4px; cursor:pointer; font-size:11px; width:100%;">👁️ Xem</button>
//                             <button onclick="event.stopPropagation(); alert('Tính năng Sửa đang phát triển')" style="padding:4px; background:#ffc107; color:black; border:none; border-radius:4px; cursor:pointer; font-size:11px; width:100%;">✏️ Sửa</button>
//                             <button onclick="event.stopPropagation(); if(typeof ham_21_21_xoa_noi_dung === 'function') ham_21_21_xoa_noi_dung('${nd.id}')" style="padding:4px; background:#dc3545; color:white; border:none; border-radius:4px; cursor:pointer; font-size:11px; width:100%;">🗑️ Xóa</button>
//                         </div>
//                     `;

//                     htmlTable += `<tr style="border-bottom: 2px solid #dee2e6; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#f1f8ff'" onmouseout="this.style.background='transparent'" onclick="if(typeof window.ham_21_20_mo_popup_chi_tiet === 'function') window.ham_21_20_mo_popup_chi_tiet('${nd.id}')">
//                         <td style="padding:8px; text-align:center; border:1px solid #dee2e6; font-weight:bold; vertical-align:top;">${idx + 1}</td>
//                         <td style="padding:8px; border:1px solid #dee2e6; vertical-align:top;">${tenNDHtml}</td>
//                         <td style="padding:8px; text-align:center; border:1px solid #dee2e6; vertical-align:top;" onclick="event.stopPropagation()">${dsAnhND || '<span style="color:#adb5bd;font-size:11px;">-</span>'}</td>
//                         <td style="padding:0; border:1px solid #dee2e6; vertical-align:top;">${innerTable}</td>
//                         <td style="padding:0; text-align:center; border:1px solid #dee2e6; vertical-align:top;" onclick="event.stopPropagation()">${thaoTacBtn}</td>
//                     </tr>`;
//                 });
//                 htmlTable += `</table>`;
//                 bangCu.innerHTML = htmlTable;
//             } else {
//                 bangCu.innerHTML = '<i style="color:#666; font-size:13px; display:block; margin-bottom:15px;">Tuần này chưa có công việc giao việc nào được ghi nhận.</i>';
//             }
//         } else {
//             document.getElementById('gvcn-nd-sinh-hoat').value = ''; document.getElementById('gvcn-danh-gia-tuan').value = '';
//             vungAnhCu.innerHTML = ''; vungPreviewMoi.innerHTML = '<span>(Chưa có ảnh...)</span>'; bangCu.innerHTML = '';
//         }
//     } catch (e) { console.error(e); }
// };


// // =====================================================================
// // HÀM 21.16: TỰ ĐỘNG DÒ VÀ NẠP DỮ LIỆU TUẦN CŨ (ĐỒNG BỘ NHÃN ĐÁNH GIÁ)
// // =====================================================================
// window.ham_21_16_tai_du_lieu_tuan = async function () {
//     const maLopRaw = document.getElementById('gvcn-input-lop').value;
//     const tuan = document.getElementById('gvcn-input-tuan').value.trim();
//     if (!maLopRaw || !tuan) return;

//     const maLop = maLopRaw.match(/\(([^)]+)\)$/)?.[1]?.trim() || maLopRaw;
//     const bangCu = document.getElementById('gvcn-bang-noi-dung-cu');

//     try {
//         const { data: nkData } = await _supabase.from('nhat_ky_gvcn')
//             .select('*').eq('ma_lop', maLop).eq('tuan_hoc', tuan).maybeSingle();

//         let vungAnhCu = document.getElementById('gvcn-vung-anh-cu-tuan');
//         let vungPreviewMoi = document.getElementById('gvcn-vung-preview-anh-tuan');

//         if (nkData) {
//             let tt = nkData.thong_tin_mo_rong || {};
//             if (nkData.tu_ngay) document.getElementById('gvcn-tuan-tu').value = nkData.tu_ngay;
//             if (nkData.den_ngay) document.getElementById('gvcn-tuan-den').value = nkData.den_ngay;

//             document.getElementById('gvcn-nd-sinh-hoat').value = nkData.noi_dung_sinh_hoat || '';
//             document.getElementById('gvcn-danh-gia-tuan').value = nkData.danh_gia_tuan || '';

//             // 🌟 NẠP ẢNH TUẦN
//             let danhSachAnh = tt.danh_sach_anh || [];
//             if (typeof danhSachAnh === 'string') { try { danhSachAnh = JSON.parse(danhSachAnh); } catch (e) { danhSachAnh = []; } }

//             if (danhSachAnh.length > 0) {
//                 let htmlAnhCu = '<div style="width:100%; font-size:12px; color:#28a745; font-weight:bold; margin-bottom:5px;">✅ Ảnh đã lưu trong tuần này:</div>';
//                 danhSachAnh.forEach(linkAnh => {
//                     if (!linkAnh) return;
//                     let srcAnh = linkAnh; let fileId = null;
//                     if (linkAnh.includes('/d/')) { let match = linkAnh.match(/\/d\/([a-zA-Z0-9_-]+)/); if (match && match[1]) fileId = match[1]; }
//                     else if (linkAnh.includes('id=')) { let match = linkAnh.match(/id=([a-zA-Z0-9_-]+)/); if (match && match[1]) fileId = match[1]; }
//                     if (fileId) srcAnh = `https://drive.google.com/thumbnail?id=${fileId}&sz=w1200`;

//                     htmlAnhCu += `<div style="width: 100%; padding: 5px; background: #fff; border: 1px solid #ced4da; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 10px; text-align: center;">
//                         <a href="${linkAnh}" target="_blank" title="Nhấn để xem ảnh gốc" style="text-decoration: none; display: block;">
//                             <img src="${srcAnh}" onerror="this.onerror=null; this.src='https://placehold.co/1200x600?text=Lỗi'; this.style.border='1px dashed #dc3545';" style="width: 100%; max-height: 600px; object-fit: contain; border-radius: 4px; cursor: pointer;">
//                         </a></div>`;
//                 });
//                 vungAnhCu.innerHTML = htmlAnhCu;
//                 vungPreviewMoi.innerHTML = '<span style="color:#28a745; font-weight:bold;">(Có thể tải thêm ảnh mới ở đây...)</span>';
//             } else {
//                 vungAnhCu.innerHTML = '';
//                 vungPreviewMoi.innerHTML = '<span>(Chưa có ảnh mới...)</span>';
//             }

//             // 🌟 NẠP BẢNG CÔNG VIỆC CŨ
//             const { data: ndData } = await _supabase.from('nhat_ky_gvcn_noi_dung')
//                 .select('*').eq('id_gvcn_nhat_ky', nkData.id).order('ngay_nhap', { ascending: true });

//             if (ndData && ndData.length > 0) {
//                 window.gvcn_DanhSachNoiDangHienTai = ndData;

//                 let htmlTable = `<table style="width:100%; border-collapse: collapse; margin-bottom: 20px; font-size:13px; background:#fff; border: 2px solid #dee2e6;">
//                     <tr style="background:#e9ecef; border-bottom:2px solid #0056b3; color:#0056b3;">
//                         <th style="padding:10px; text-align:center; border:1px solid #dee2e6; width: 40px;">STT</th>
//                         <th style="padding:10px; text-align:left; border:1px solid #dee2e6; width: 220px;">Tên nội dung</th>
//                         <th style="padding:10px; text-align:center; border:1px solid #dee2e6; width: 90px;">Ảnh chung</th>
//                         <th style="padding:0; text-align:left; border:1px solid #dee2e6;">
//                             <table style="width:100%; table-layout: fixed; border-collapse: collapse; margin:0; background:transparent;">
//                                 <tr>
//                                     <th style="padding:10px 6px; text-align:left; border-right:1px solid #dee2e6; width:26%;">Học sinh</th>
//                                     <th style="padding:10px 6px; text-align:left; border-right:1px solid #dee2e6; width:20%;">Phần việc</th>
//                                     <th style="padding:10px 6px; text-align:center; border-right:1px solid #dee2e6; width:14%;">Tiến độ</th>
//                                     <th style="padding:10px 6px; text-align:center; border-right:1px solid #dee2e6; width:12%;">Đánh giá</th>
//                                     <th style="padding:10px 6px; text-align:center; border-right:1px solid #dee2e6; width:10%;">Ảnh PV</th>
//                                     <th style="padding:10px 6px; text-align:left; width:18%;">Nhận xét, ghi chú</th>
//                                 </tr>
//                             </table>
//                         </th>
//                         <th style="padding:10px; text-align:center; border:1px solid #dee2e6; width: 70px;">Thao tác</th>
//                     </tr>`;

//                 ndData.forEach((nd, idx) => {
//                     let strNgay = nd.ngay_nhap ? nd.ngay_nhap.replace('T', ' ') : '';
//                     let tenNDHtml = `<div style="color:#0056b3; font-weight:bold; font-size:14px; margin-bottom:5px;">${nd.ten_noi_dung}</div>
//                                      <div style="font-size:11px; color:#666; font-style:italic; margin-bottom:5px;">🕒 ${strNgay}</div>
//                                      <div style="font-size:12px; color:#495057;">${nd.chi_tiet || ''}</div>`;

//                     let dsAnhND = (nd.anh_dinh_kem || []).map(linkAnh => {
//                         if (!linkAnh) return '';
//                         let srcAnh = linkAnh; let fileId = null;
//                         if (linkAnh.includes('/d/')) { let match = linkAnh.match(/\/d\/([a-zA-Z0-9_-]+)/); if (match && match[1]) fileId = match[1]; }
//                         else if (linkAnh.includes('id=')) { let match = linkAnh.match(/id=([a-zA-Z0-9_-]+)/); if (match && match[1]) fileId = match[1]; }
//                         if (fileId) srcAnh = `https://drive.google.com/thumbnail?id=${fileId}&sz=w150`;

//                         return `<a href="${linkAnh}" target="_blank" onclick="event.stopPropagation()" title="Xem ảnh chung">
//                             <img src="${srcAnh}" style="width:40px; height:40px; object-fit:cover; border-radius:4px; border:1px solid #ccc; margin:2px;" onerror="this.style.display='none';">
//                         </a>`;
//                     }).join('');

//                     let innerTable = '';
//                     if (nd.nguoi_nhan && nd.nguoi_nhan.length > 0) {
//                         innerTable = `<table style="width:100%; table-layout: fixed; border-collapse: collapse; font-size:12px; background:transparent; margin:0;">`;

//                         nd.nguoi_nhan.forEach((hs, i) => {
//                             let hsObj = window.DanhSachHocSinhLopHienTai ? window.DanhSachHocSinhLopHienTai.find(h => h.uid === hs.uid) : null;
//                             let avatar = hsObj ? hsObj.avatarUrl : `https://ui-avatars.com/api/?name=${encodeURIComponent(hs.ten)}&background=random&color=fff`;
//                             let borderBottom = i < nd.nguoi_nhan.length - 1 ? 'border-bottom: 1px dashed #ced4da;' : '';

//                             // Xử lý nhãn Tiến độ
//                             let bgTrangThai = '#6c757d';
//                             if (hs.trang_thai === 'Đã xong') bgTrangThai = '#28a745';
//                             else if (hs.trang_thai === 'Chưa làm') bgTrangThai = '#dc3545';
//                             else if (hs.trang_thai === 'Chưa xong') bgTrangThai = '#ffc107';
//                             else if (hs.trang_thai === 'Đang làm') bgTrangThai = '#17a2b8';
//                             let nhanTrangThai = hs.trang_thai ? `<span style="background:${bgTrangThai}; color:${hs.trang_thai === 'Chưa xong' ? '#000' : '#fff'}; padding:4px 8px; border-radius:12px; font-size:11px; font-weight:bold; box-shadow:0 1px 2px rgba(0,0,0,0.15); display:inline-block; text-align:center;">${hs.trang_thai}</span>` : '<span style="color:#999; font-size:11px;">-</span>';

//                             // 🌟 Xử lý nhãn Đánh giá (Tô nền đồng bộ như Tiến độ)
//                             let nhanDanhGia = '';
//                             if (hs.danh_gia && hs.danh_gia.trim() !== '') {
//                                 let bgDG = '#6c757d';
//                                 if (hs.danh_gia === 'Tốt') bgDG = '#28a745';
//                                 else if (hs.danh_gia === 'Khá') bgDG = '#17a2b8';
//                                 else if (hs.danh_gia === 'Trung Bình' || hs.danh_gia === 'TB') bgDG = '#fd7e14';
//                                 else if (hs.danh_gia === 'Chưa đạt') bgDG = '#dc3545';

//                                 nhanDanhGia = `<span style="background:${bgDG}; color:#fff; padding:4px 8px; border-radius:12px; font-size:11px; font-weight:bold; box-shadow:0 1px 2px rgba(0,0,0,0.15); display:inline-block; text-align:center;">${hs.danh_gia}</span>`;
//                             } else {
//                                 nhanDanhGia = `<span style="background:#dc3545; color:#fff; padding:4px 8px; border-radius:12px; font-size:11px; font-weight:bold; box-shadow:0 1px 2px rgba(0,0,0,0.15); display:inline-block; text-align:center;">Chưa ĐG</span>`;
//                             }

//                             // Ảnh minh chứng riêng
//                             let iconAnhHS = '<span style="color:#ccc; font-size:12px;">-</span>';
//                             if (hs.anh_minh_chung) {
//                                 let srcAnhHS = hs.anh_minh_chung;
//                                 let fileIdHS = null;
//                                 if (srcAnhHS.includes('/d/')) { let m = srcAnhHS.match(/\/d\/([a-zA-Z0-9_-]+)/); if (m) fileIdHS = m[1]; }
//                                 else if (srcAnhHS.includes('id=')) { let m = srcAnhHS.match(/id=([a-zA-Z0-9_-]+)/); if (m) fileIdHS = m[1]; }
//                                 if (fileIdHS) srcAnhHS = `https://drive.google.com/thumbnail?id=${fileIdHS}&sz=w150`;

//                                 iconAnhHS = `<a href="${hs.anh_minh_chung}" target="_blank" onclick="event.stopPropagation()" title="Xem ảnh cá nhân">
//                                     <img src="${srcAnhHS}" style="width:35px; height:35px; object-fit:cover; border-radius:4px; border:1px solid #ccc; margin:2px;" onerror="this.style.display='none';">
//                                 </a>`;
//                             }

//                             innerTable += `<tr>
//                                 <td style="padding:8px 6px; width:26%; ${borderBottom} border-right: 1px dashed #ced4da; vertical-align:middle; word-wrap: break-word;">
//                                     <div style="display:flex; align-items:flex-start; gap:6px;">
//                                         <img src="${avatar}" style="width:24px; height:24px; border-radius:50%; border:1px solid #ccc; flex-shrink:0; margin-top:1px;">
//                                         <b style="line-height:1.4; color:#333; font-size:12px;">${hs.ten}</b>
//                                     </div>
//                                 </td>
//                                 <td style="padding:8px 6px; width:20%; ${borderBottom} border-right: 1px dashed #ced4da; vertical-align:middle; color:#0056b3; font-weight:bold; word-wrap: break-word;">${hs.phan_viec || '-'}</td>
//                                 <td style="padding:8px 6px; width:14%; ${borderBottom} border-right: 1px dashed #ced4da; vertical-align:middle; text-align:center;">${nhanTrangThai}</td>
//                                 <td style="padding:8px 6px; width:12%; ${borderBottom} border-right: 1px dashed #ced4da; vertical-align:middle; text-align:center;">${nhanDanhGia}</td>
//                                 <td style="padding:8px 6px; width:10%; ${borderBottom} border-right: 1px dashed #ced4da; vertical-align:middle; text-align:center;">${iconAnhHS}</td>
//                                 <td style="padding:8px 6px; width:18%; ${borderBottom} color:#666; word-wrap: break-word; vertical-align:middle;">${hs.ghi_chu || ''}</td>
//                             </tr>`;
//                         });
//                         innerTable += `</table>`;
//                     } else {
//                         innerTable = `<div style="padding:15px; color:#adb5bd; font-style:italic;">Không chỉ định người nhận (Giao chung cả lớp)</div>`;
//                     }

//                     let thaoTacBtn = `
//                         <div style="display:flex; flex-direction:column; gap:5px; padding:5px;">
//                             <button onclick="event.stopPropagation(); window.ham_21_20_mo_popup_chi_tiet('${nd.id}')" style="padding:4px; background:#17a2b8; color:white; border:none; border-radius:4px; cursor:pointer; font-size:11px; width:100%;">👁️ Xem</button>
//                             <button onclick="event.stopPropagation(); alert('Tính năng Sửa đang phát triển')" style="padding:4px; background:#ffc107; color:black; border:none; border-radius:4px; cursor:pointer; font-size:11px; width:100%;">✏️ Sửa</button>
//                             <button onclick="event.stopPropagation(); if(typeof ham_21_21_xoa_noi_dung === 'function') ham_21_21_xoa_noi_dung('${nd.id}')" style="padding:4px; background:#dc3545; color:white; border:none; border-radius:4px; cursor:pointer; font-size:11px; width:100%;">🗑️ Xóa</button>
//                         </div>
//                     `;

//                     htmlTable += `<tr style="border-bottom: 2px solid #dee2e6; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#f1f8ff'" onmouseout="this.style.background='transparent'" onclick="if(typeof window.ham_21_20_mo_popup_chi_tiet === 'function') window.ham_21_20_mo_popup_chi_tiet('${nd.id}')">
//                         <td style="padding:8px; text-align:center; border:1px solid #dee2e6; font-weight:bold; vertical-align:top;">${idx + 1}</td>
//                         <td style="padding:8px; border:1px solid #dee2e6; vertical-align:top;">${tenNDHtml}</td>
//                         <td style="padding:8px; text-align:center; border:1px solid #dee2e6; vertical-align:top;" onclick="event.stopPropagation()">${dsAnhND || '<span style="color:#adb5bd;font-size:11px;">-</span>'}</td>
//                         <td style="padding:0; border:1px solid #dee2e6; vertical-align:top;">${innerTable}</td>
//                         <td style="padding:0; text-align:center; border:1px solid #dee2e6; vertical-align:top;" onclick="event.stopPropagation()">${thaoTacBtn}</td>
//                     </tr>`;
//                 });
//                 htmlTable += `</table>`;
//                 bangCu.innerHTML = htmlTable;
//             } else {
//                 bangCu.innerHTML = '<i style="color:#666; font-size:13px; display:block; margin-bottom:15px;">Tuần này chưa có công việc giao việc nào được ghi nhận.</i>';
//             }
//         } else {
//             document.getElementById('gvcn-nd-sinh-hoat').value = ''; document.getElementById('gvcn-danh-gia-tuan').value = '';
//             vungAnhCu.innerHTML = ''; vungPreviewMoi.innerHTML = '<span>(Chưa có ảnh...)</span>'; bangCu.innerHTML = '';
//         }
//     } catch (e) { console.error(e); }
// };



// // =====================================================================
// // HÀM 21.16: TỰ ĐỘNG DÒ VÀ NẠP DỮ LIỆU TUẦN CŨ (ĐÃ GẮN NÚT SỬA)
// // =====================================================================
// window.ham_21_16_tai_du_lieu_tuan = async function () {
//     const maLopRaw = document.getElementById('gvcn-input-lop').value;
//     const tuan = document.getElementById('gvcn-input-tuan').value.trim();
//     if (!maLopRaw || !tuan) return;

//     const maLop = maLopRaw.match(/\(([^)]+)\)$/)?.[1]?.trim() || maLopRaw;
//     const bangCu = document.getElementById('gvcn-bang-noi-dung-cu');

//     try {
//         const { data: nkData } = await _supabase.from('nhat_ky_gvcn')
//             .select('*').eq('ma_lop', maLop).eq('tuan_hoc', tuan).maybeSingle();

//         let vungAnhCu = document.getElementById('gvcn-vung-anh-cu-tuan');
//         let vungPreviewMoi = document.getElementById('gvcn-vung-preview-anh-tuan');

//         if (nkData) {
//             let tt = nkData.thong_tin_mo_rong || {};
//             if (nkData.tu_ngay) document.getElementById('gvcn-tuan-tu').value = nkData.tu_ngay;
//             if (nkData.den_ngay) document.getElementById('gvcn-tuan-den').value = nkData.den_ngay;

//             document.getElementById('gvcn-nd-sinh-hoat').value = nkData.noi_dung_sinh_hoat || '';
//             document.getElementById('gvcn-danh-gia-tuan').value = nkData.danh_gia_tuan || '';

//             let danhSachAnh = tt.danh_sach_anh || [];
//             if (typeof danhSachAnh === 'string') { try { danhSachAnh = JSON.parse(danhSachAnh); } catch (e) { danhSachAnh = []; } }

//             if (danhSachAnh.length > 0) {
//                 let htmlAnhCu = '<div style="width:100%; font-size:12px; color:#28a745; font-weight:bold; margin-bottom:5px;">✅ Ảnh đã lưu trong tuần này:</div>';
//                 danhSachAnh.forEach(linkAnh => {
//                     if (!linkAnh) return;
//                     let srcAnh = linkAnh; let fileId = null;
//                     if (linkAnh.includes('/d/')) { let match = linkAnh.match(/\/d\/([a-zA-Z0-9_-]+)/); if (match && match[1]) fileId = match[1]; }
//                     else if (linkAnh.includes('id=')) { let match = linkAnh.match(/id=([a-zA-Z0-9_-]+)/); if (match && match[1]) fileId = match[1]; }
//                     if (fileId) srcAnh = `https://drive.google.com/thumbnail?id=${fileId}&sz=w1200`;

//                     htmlAnhCu += `<div style="width: 100%; padding: 5px; background: #fff; border: 1px solid #ced4da; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 10px; text-align: center;">
//                         <a href="${linkAnh}" target="_blank" title="Nhấn để xem ảnh gốc" style="text-decoration: none; display: block;">
//                             <img src="${srcAnh}" onerror="this.onerror=null; this.src='https://placehold.co/1200x600?text=Lỗi'; this.style.border='1px dashed #dc3545';" style="width: 100%; max-height: 600px; object-fit: contain; border-radius: 4px; cursor: pointer;">
//                         </a></div>`;
//                 });
//                 vungAnhCu.innerHTML = htmlAnhCu;
//                 vungPreviewMoi.innerHTML = '<span style="color:#28a745; font-weight:bold;">(Có thể tải thêm ảnh mới ở đây...)</span>';
//             } else {
//                 vungAnhCu.innerHTML = '';
//                 vungPreviewMoi.innerHTML = '<span>(Chưa có ảnh mới...)</span>';
//             }

//             const { data: ndData } = await _supabase.from('nhat_ky_gvcn_noi_dung')
//                 .select('*').eq('id_gvcn_nhat_ky', nkData.id).order('ngay_nhap', { ascending: true });

//             if (ndData && ndData.length > 0) {
//                 window.gvcn_DanhSachNoiDangHienTai = ndData;

//                 let htmlTable = `<table style="width:100%; border-collapse: collapse; margin-bottom: 20px; font-size:13px; background:#fff; border: 2px solid #dee2e6;">
//                     <tr style="background:#e9ecef; border-bottom:2px solid #0056b3; color:#0056b3;">
//                         <th style="padding:10px; text-align:center; border:1px solid #dee2e6; width: 40px;">STT</th>
//                         <th style="padding:10px; text-align:left; border:1px solid #dee2e6; width: 220px;">Tên nội dung</th>
//                         <th style="padding:10px; text-align:center; border:1px solid #dee2e6; width: 90px;">Ảnh chung</th>
//                         <th style="padding:0; text-align:left; border:1px solid #dee2e6;">
//                             <table style="width:100%; table-layout: fixed; border-collapse: collapse; margin:0; background:transparent;">
//                                 <tr>
//                                     <th style="padding:10px 6px; text-align:left; border-right:1px solid #dee2e6; width:26%;">Học sinh</th>
//                                     <th style="padding:10px 6px; text-align:left; border-right:1px solid #dee2e6; width:20%;">Phần việc</th>
//                                     <th style="padding:10px 6px; text-align:center; border-right:1px solid #dee2e6; width:14%;">Tiến độ</th>
//                                     <th style="padding:10px 6px; text-align:center; border-right:1px solid #dee2e6; width:12%;">Đánh giá</th>
//                                     <th style="padding:10px 6px; text-align:center; border-right:1px solid #dee2e6; width:10%;">Ảnh PV</th>
//                                     <th style="padding:10px 6px; text-align:left; width:18%;">Nhận xét, ghi chú</th>
//                                 </tr>
//                             </table>
//                         </th>
//                         <th style="padding:10px; text-align:center; border:1px solid #dee2e6; width: 70px;">Thao tác</th>
//                     </tr>`;

//                 ndData.forEach((nd, idx) => {
//                     let strNgay = nd.ngay_nhap ? nd.ngay_nhap.replace('T', ' ') : '';
//                     let tenNDHtml = `<div style="color:#0056b3; font-weight:bold; font-size:14px; margin-bottom:5px;">${nd.ten_noi_dung}</div>
//                                      <div style="font-size:11px; color:#666; font-style:italic; margin-bottom:5px;">🕒 ${strNgay}</div>
//                                      <div style="font-size:12px; color:#495057;">${nd.chi_tiet || ''}</div>`;

//                     let dsAnhND = (nd.anh_dinh_kem || []).map(linkAnh => {
//                         if (!linkAnh) return '';
//                         let srcAnh = linkAnh; let fileId = null;
//                         if (linkAnh.includes('/d/')) { let match = linkAnh.match(/\/d\/([a-zA-Z0-9_-]+)/); if (match && match[1]) fileId = match[1]; }
//                         else if (linkAnh.includes('id=')) { let match = linkAnh.match(/id=([a-zA-Z0-9_-]+)/); if (match && match[1]) fileId = match[1]; }
//                         if (fileId) srcAnh = `https://drive.google.com/thumbnail?id=${fileId}&sz=w150`;
//                         return `<a href="${linkAnh}" target="_blank" onclick="event.stopPropagation()" title="Xem ảnh chung"><img src="${srcAnh}" style="width:40px; height:40px; object-fit:cover; border-radius:4px; border:1px solid #ccc; margin:2px;" onerror="this.style.display='none';"></a>`;
//                     }).join('');

//                     let innerTable = '';
//                     if (nd.nguoi_nhan && nd.nguoi_nhan.length > 0) {
//                         innerTable = `<table style="width:100%; table-layout: fixed; border-collapse: collapse; font-size:12px; background:transparent; margin:0;">`;
//                         nd.nguoi_nhan.forEach((hs, i) => {
//                             let hsObj = window.DanhSachHocSinhLopHienTai ? window.DanhSachHocSinhLopHienTai.find(h => h.uid === hs.uid) : null;
//                             let avatar = hsObj ? hsObj.avatarUrl : `https://ui-avatars.com/api/?name=${encodeURIComponent(hs.ten)}&background=random&color=fff`;
//                             let borderBottom = i < nd.nguoi_nhan.length - 1 ? 'border-bottom: 1px dashed #ced4da;' : '';

//                             let bgTrangThai = '#6c757d';
//                             if (hs.trang_thai === 'Đã xong') bgTrangThai = '#28a745';
//                             else if (hs.trang_thai === 'Chưa làm') bgTrangThai = '#dc3545';
//                             else if (hs.trang_thai === 'Chưa xong') bgTrangThai = '#ffc107';
//                             else if (hs.trang_thai === 'Đang làm') bgTrangThai = '#17a2b8';
//                             let nhanTrangThai = hs.trang_thai ? `<span style="background:${bgTrangThai}; color:${hs.trang_thai === 'Chưa xong' ? '#000' : '#fff'}; padding:4px 8px; border-radius:12px; font-size:11px; font-weight:bold; box-shadow:0 1px 2px rgba(0,0,0,0.15); display:inline-block; text-align:center;">${hs.trang_thai}</span>` : '<span style="color:#999; font-size:11px;">-</span>';

//                             let nhanDanhGia = '';
//                             if (hs.danh_gia && hs.danh_gia.trim() !== '') {
//                                 let bgDG = '#6c757d';
//                                 if (hs.danh_gia === 'Tốt') bgDG = '#28a745'; else if (hs.danh_gia === 'Khá') bgDG = '#17a2b8'; else if (hs.danh_gia === 'Trung Bình' || hs.danh_gia === 'TB') bgDG = '#fd7e14'; else if (hs.danh_gia === 'Chưa đạt') bgDG = '#dc3545';
//                                 nhanDanhGia = `<span style="background:${bgDG}; color:#fff; padding:4px 8px; border-radius:12px; font-size:11px; font-weight:bold; box-shadow:0 1px 2px rgba(0,0,0,0.15); display:inline-block; text-align:center;">${hs.danh_gia}</span>`;
//                             } else {
//                                 nhanDanhGia = `<span style="background:#dc3545; color:#fff; padding:4px 8px; border-radius:12px; font-size:11px; font-weight:bold; box-shadow:0 1px 2px rgba(0,0,0,0.15); display:inline-block; text-align:center;">Chưa ĐG</span>`;
//                             }

//                             let iconAnhHS = '<span style="color:#ccc; font-size:12px;">-</span>';
//                             if (hs.anh_minh_chung) {
//                                 let srcAnhHS = hs.anh_minh_chung; let fileIdHS = null;
//                                 if (srcAnhHS.includes('/d/')) { let m = srcAnhHS.match(/\/d\/([a-zA-Z0-9_-]+)/); if (m) fileIdHS = m[1]; } else if (srcAnhHS.includes('id=')) { let m = srcAnhHS.match(/id=([a-zA-Z0-9_-]+)/); if (m) fileIdHS = m[1]; }
//                                 if (fileIdHS) srcAnhHS = `https://drive.google.com/thumbnail?id=${fileIdHS}&sz=w150`;
//                                 iconAnhHS = `<a href="${hs.anh_minh_chung}" target="_blank" onclick="event.stopPropagation()" title="Xem ảnh cá nhân"><img src="${srcAnhHS}" style="width:35px; height:35px; object-fit:cover; border-radius:4px; border:1px solid #ccc; margin:2px;" onerror="this.style.display='none';"></a>`;
//                             }

//                             innerTable += `<tr>
//                                 <td style="padding:8px 6px; width:26%; ${borderBottom} border-right: 1px dashed #ced4da; vertical-align:middle; word-wrap: break-word;"><div style="display:flex; align-items:flex-start; gap:6px;"><img src="${avatar}" style="width:24px; height:24px; border-radius:50%; border:1px solid #ccc; flex-shrink:0; margin-top:1px;"><b style="line-height:1.4; color:#333; font-size:12px;">${hs.ten}</b></div></td>
//                                 <td style="padding:8px 6px; width:20%; ${borderBottom} border-right: 1px dashed #ced4da; vertical-align:middle; color:#0056b3; font-weight:bold; word-wrap: break-word;">${hs.phan_viec || '-'}</td>
//                                 <td style="padding:8px 6px; width:14%; ${borderBottom} border-right: 1px dashed #ced4da; vertical-align:middle; text-align:center;">${nhanTrangThai}</td>
//                                 <td style="padding:8px 6px; width:12%; ${borderBottom} border-right: 1px dashed #ced4da; vertical-align:middle; text-align:center;">${nhanDanhGia}</td>
//                                 <td style="padding:8px 6px; width:10%; ${borderBottom} border-right: 1px dashed #ced4da; vertical-align:middle; text-align:center;">${iconAnhHS}</td>
//                                 <td style="padding:8px 6px; width:18%; ${borderBottom} color:#666; word-wrap: break-word; vertical-align:middle;">${hs.ghi_chu || ''}</td>
//                             </tr>`;
//                         });
//                         innerTable += `</table>`;
//                     } else {
//                         innerTable = `<div style="padding:15px; color:#adb5bd; font-style:italic;">Không chỉ định người nhận (Giao chung cả lớp)</div>`;
//                     }

//                     // 🌟 GẮN HÀM SỬA VÀO ĐÂY
//                     let thaoTacBtn = `
//                         <div style="display:flex; flex-direction:column; gap:5px; padding:5px;">
//                             <button onclick="event.stopPropagation(); window.ham_21_20_mo_popup_chi_tiet('${nd.id}')" style="padding:4px; background:#17a2b8; color:white; border:none; border-radius:4px; cursor:pointer; font-size:11px; width:100%; font-weight:bold;">👁️ Xem</button>
//                             <button onclick="event.stopPropagation(); window.ham_21_26_sua_noi_dung('${nd.id}')" style="padding:4px; background:#ffc107; color:black; border:none; border-radius:4px; cursor:pointer; font-size:11px; width:100%; font-weight:bold;">✏️ Sửa</button>
//                             <button onclick="event.stopPropagation(); if(typeof ham_21_21_xoa_noi_dung === 'function') ham_21_21_xoa_noi_dung('${nd.id}')" style="padding:4px; background:#dc3545; color:white; border:none; border-radius:4px; cursor:pointer; font-size:11px; width:100%; font-weight:bold;">🗑️ Xóa</button>
//                         </div>
//                     `;

//                     htmlTable += `<tr style="border-bottom: 2px solid #dee2e6; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#f1f8ff'" onmouseout="this.style.background='transparent'" onclick="if(typeof window.ham_21_20_mo_popup_chi_tiet === 'function') window.ham_21_20_mo_popup_chi_tiet('${nd.id}')">
//                         <td style="padding:8px; text-align:center; border:1px solid #dee2e6; font-weight:bold; vertical-align:top;">${idx + 1}</td>
//                         <td style="padding:8px; border:1px solid #dee2e6; vertical-align:top;">${tenNDHtml}</td>
//                         <td style="padding:8px; text-align:center; border:1px solid #dee2e6; vertical-align:top;" onclick="event.stopPropagation()">${dsAnhND || '<span style="color:#adb5bd;font-size:11px;">-</span>'}</td>
//                         <td style="padding:0; border:1px solid #dee2e6; vertical-align:top;">${innerTable}</td>
//                         <td style="padding:0; text-align:center; border:1px solid #dee2e6; vertical-align:top;" onclick="event.stopPropagation()">${thaoTacBtn}</td>
//                     </tr>`;
//                 });
//                 htmlTable += `</table>`;
//                 bangCu.innerHTML = htmlTable;
//             } else {
//                 bangCu.innerHTML = '<i style="color:#666; font-size:13px; display:block; margin-bottom:15px;">Tuần này chưa có công việc giao việc nào được ghi nhận.</i>';
//             }
//         } else {
//             document.getElementById('gvcn-nd-sinh-hoat').value = ''; document.getElementById('gvcn-danh-gia-tuan').value = '';
//             vungAnhCu.innerHTML = ''; vungPreviewMoi.innerHTML = '<span>(Chưa có ảnh...)</span>'; bangCu.innerHTML = '';
//         }
//     } catch (e) { console.error(e); }
// };



// =====================================================================
// HÀM 21.16: TỰ ĐỘNG DÒ VÀ NẠP DỮ LIỆU TUẦN CŨ (KẾT NỐI VỚI HÀM RENDER ẢNH CŨ)
// =====================================================================
window.ham_21_16_tai_du_lieu_tuan = async function () {
    const maLopRaw = document.getElementById('gvcn-input-lop').value;
    const tuan = document.getElementById('gvcn-input-tuan').value.trim();
    if (!maLopRaw || !tuan) return;

    const maLop = maLopRaw.match(/\(([^)]+)\)$/)?.[1]?.trim() || maLopRaw;
    const bangCu = document.getElementById('gvcn-bang-noi-dung-cu');

    try {
        const { data: nkData } = await _supabase.from('nhat_ky_gvcn')
            .select('*').eq('ma_lop', maLop).eq('tuan_hoc', tuan).maybeSingle();

        let vungAnhCu = document.getElementById('gvcn-vung-anh-cu-tuan');
        let vungPreviewMoi = document.getElementById('gvcn-vung-preview-anh-tuan');

        if (nkData) {
            let tt = nkData.thong_tin_mo_rong || {};
            if (nkData.tu_ngay) document.getElementById('gvcn-tuan-tu').value = nkData.tu_ngay;
            if (nkData.den_ngay) document.getElementById('gvcn-tuan-den').value = nkData.den_ngay;

            document.getElementById('gvcn-nd-sinh-hoat').value = nkData.noi_dung_sinh_hoat || '';
            document.getElementById('gvcn-danh-gia-tuan').value = nkData.danh_gia_tuan || '';

            // 🌟 ĐÃ THAY ĐỔI: Dùng hàm render và biến tạm để quản lý thao tác xóa
            let danhSachAnh = tt.danh_sach_anh || [];
            if (typeof danhSachAnh === 'string') { try { danhSachAnh = JSON.parse(danhSachAnh); } catch (e) { danhSachAnh = []; } }

            window.gvcn_AnhTuanCuTam = [...danhSachAnh];
            if (typeof window.ham_21_28_render_anh_tuan_cu === 'function') window.ham_21_28_render_anh_tuan_cu();

            vungPreviewMoi.innerHTML = '<span style="color:#28a745; font-weight:bold;">(Có thể tải thêm ảnh mới ở đây...)</span>';

            const { data: ndData } = await _supabase.from('nhat_ky_gvcn_noi_dung')
                .select('*').eq('id_gvcn_nhat_ky', nkData.id).order('ngay_nhap', { ascending: true });

            if (ndData && ndData.length > 0) {
                window.gvcn_DanhSachNoiDangHienTai = ndData;

                let htmlTable = `<table style="width:100%; border-collapse: collapse; margin-bottom: 20px; font-size:13px; background:#fff; border: 2px solid #dee2e6;">
                    <tr style="background:#e9ecef; border-bottom:2px solid #0056b3; color:#0056b3;">
                        <th style="padding:10px; text-align:center; border:1px solid #dee2e6; width: 40px;">STT</th>
                        <th style="padding:10px; text-align:left; border:1px solid #dee2e6; width: 220px;">Tên nội dung</th>
                        <th style="padding:10px; text-align:center; border:1px solid #dee2e6; width: 90px;">Ảnh chung</th>
                        <th style="padding:0; text-align:left; border:1px solid #dee2e6;">
                            <table style="width:100%; table-layout: fixed; border-collapse: collapse; margin:0; background:transparent;">
                                <tr>
                                    <th style="padding:10px 6px; text-align:left; border-right:1px solid #dee2e6; width:26%;">Học sinh</th>
                                    <th style="padding:10px 6px; text-align:left; border-right:1px solid #dee2e6; width:20%;">Phần việc</th>
                                    <th style="padding:10px 6px; text-align:center; border-right:1px solid #dee2e6; width:14%;">Tiến độ</th>
                                    <th style="padding:10px 6px; text-align:center; border-right:1px solid #dee2e6; width:12%;">Đánh giá</th>
                                    <th style="padding:10px 6px; text-align:center; border-right:1px solid #dee2e6; width:10%;">Ảnh PV</th>
                                    <th style="padding:10px 6px; text-align:left; width:18%;">Nhận xét, ghi chú</th>
                                </tr>
                            </table>
                        </th>
                        <th style="padding:10px; text-align:center; border:1px solid #dee2e6; width: 70px;">Thao tác</th>
                    </tr>`;

                ndData.forEach((nd, idx) => {
                    let strNgay = nd.ngay_nhap ? nd.ngay_nhap.replace('T', ' ') : '';
                    let tenNDHtml = `<div style="color:#0056b3; font-weight:bold; font-size:14px; margin-bottom:5px;">${nd.ten_noi_dung}</div>
                                     <div style="font-size:11px; color:#666; font-style:italic; margin-bottom:5px;">🕒 ${strNgay}</div>
                                     <div style="font-size:12px; color:#495057;">${nd.chi_tiet || ''}</div>`;

                    let dsAnhND = (nd.anh_dinh_kem || []).map(linkAnh => {
                        if (!linkAnh) return '';
                        let srcAnh = linkAnh; let fileId = null;
                        if (linkAnh.includes('/d/')) { let match = linkAnh.match(/\/d\/([a-zA-Z0-9_-]+)/); if (match && match[1]) fileId = match[1]; }
                        else if (linkAnh.includes('id=')) { let match = linkAnh.match(/id=([a-zA-Z0-9_-]+)/); if (match && match[1]) fileId = match[1]; }
                        if (fileId) srcAnh = `https://drive.google.com/thumbnail?id=${fileId}&sz=w150`;

                        return `<a href="${linkAnh}" target="_blank" onclick="event.stopPropagation()" title="Xem ảnh chung"><img src="${srcAnh}" style="width:40px; height:40px; object-fit:cover; border-radius:4px; border:1px solid #ccc; margin:2px;" onerror="this.style.display='none';"></a>`;
                    }).join('');

                    let innerTable = '';
                    if (nd.nguoi_nhan && nd.nguoi_nhan.length > 0) {
                        innerTable = `<table style="width:100%; table-layout: fixed; border-collapse: collapse; font-size:12px; background:transparent; margin:0;">`;
                        nd.nguoi_nhan.forEach((hs, i) => {
                            let hsObj = window.DanhSachHocSinhLopHienTai ? window.DanhSachHocSinhLopHienTai.find(h => h.uid === hs.uid) : null;
                            let avatar = hsObj ? hsObj.avatarUrl : `https://ui-avatars.com/api/?name=${encodeURIComponent(hs.ten)}&background=random&color=fff`;
                            let borderBottom = i < nd.nguoi_nhan.length - 1 ? 'border-bottom: 1px dashed #ced4da;' : '';

                            let bgTrangThai = '#6c757d';
                            if (hs.trang_thai === 'Đã xong') bgTrangThai = '#28a745';
                            else if (hs.trang_thai === 'Chưa làm') bgTrangThai = '#dc3545';
                            else if (hs.trang_thai === 'Chưa xong') bgTrangThai = '#ffc107';
                            else if (hs.trang_thai === 'Đang làm') bgTrangThai = '#17a2b8';
                            let nhanTrangThai = hs.trang_thai ? `<span style="background:${bgTrangThai}; color:${hs.trang_thai === 'Chưa xong' ? '#000' : '#fff'}; padding:4px 8px; border-radius:12px; font-size:11px; font-weight:bold; box-shadow:0 1px 2px rgba(0,0,0,0.15); display:inline-block; text-align:center;">${hs.trang_thai}</span>` : '<span style="color:#999; font-size:11px;">-</span>';

                            let nhanDanhGia = '';
                            if (hs.danh_gia && hs.danh_gia.trim() !== '') {
                                let bgDG = '#6c757d';
                                if (hs.danh_gia === 'Tốt') bgDG = '#28a745'; else if (hs.danh_gia === 'Khá') bgDG = '#17a2b8'; else if (hs.danh_gia === 'Trung Bình' || hs.danh_gia === 'TB') bgDG = '#fd7e14'; else if (hs.danh_gia === 'Chưa đạt') bgDG = '#dc3545';
                                nhanDanhGia = `<span style="background:${bgDG}; color:#fff; padding:4px 8px; border-radius:12px; font-size:11px; font-weight:bold; box-shadow:0 1px 2px rgba(0,0,0,0.15); display:inline-block; text-align:center;">${hs.danh_gia}</span>`;
                            } else {
                                nhanDanhGia = `<span style="background:#dc3545; color:#fff; padding:4px 8px; border-radius:12px; font-size:11px; font-weight:bold; box-shadow:0 1px 2px rgba(0,0,0,0.15); display:inline-block; text-align:center;">Chưa ĐG</span>`;
                            }

                            let iconAnhHS = '<span style="color:#ccc; font-size:12px;">-</span>';
                            if (hs.anh_minh_chung) {
                                let srcAnhHS = hs.anh_minh_chung; let fileIdHS = null;
                                if (srcAnhHS.includes('/d/')) { let m = srcAnhHS.match(/\/d\/([a-zA-Z0-9_-]+)/); if (m) fileIdHS = m[1]; } else if (srcAnhHS.includes('id=')) { let m = srcAnhHS.match(/id=([a-zA-Z0-9_-]+)/); if (m) fileIdHS = m[1]; }
                                if (fileIdHS) srcAnhHS = `https://drive.google.com/thumbnail?id=${fileIdHS}&sz=w150`;
                                iconAnhHS = `<a href="${hs.anh_minh_chung}" target="_blank" onclick="event.stopPropagation()" title="Xem ảnh cá nhân"><img src="${srcAnhHS}" style="width:35px; height:35px; object-fit:cover; border-radius:4px; border:1px solid #ccc; margin:2px;" onerror="this.style.display='none';"></a>`;
                            }

                            innerTable += `<tr>
                                <td style="padding:8px 6px; width:26%; ${borderBottom} border-right: 1px dashed #ced4da; vertical-align:middle; word-wrap: break-word;"><div style="display:flex; align-items:flex-start; gap:6px;"><img src="${avatar}" style="width:24px; height:24px; border-radius:50%; border:1px solid #ccc; flex-shrink:0; margin-top:1px;"><b style="line-height:1.4; color:#333; font-size:12px;">${hs.ten}</b></div></td>
                                <td style="padding:8px 6px; width:20%; ${borderBottom} border-right: 1px dashed #ced4da; vertical-align:middle; color:#0056b3; font-weight:bold; word-wrap: break-word;">${hs.phan_viec || '-'}</td>
                                <td style="padding:8px 6px; width:14%; ${borderBottom} border-right: 1px dashed #ced4da; vertical-align:middle; text-align:center;">${nhanTrangThai}</td>
                                <td style="padding:8px 6px; width:12%; ${borderBottom} border-right: 1px dashed #ced4da; vertical-align:middle; text-align:center;">${nhanDanhGia}</td>
                                <td style="padding:8px 6px; width:10%; ${borderBottom} border-right: 1px dashed #ced4da; vertical-align:middle; text-align:center;">${iconAnhHS}</td>
                                <td style="padding:8px 6px; width:18%; ${borderBottom} color:#666; word-wrap: break-word; vertical-align:middle;">${hs.ghi_chu || ''}</td>
                            </tr>`;
                        });
                        innerTable += `</table>`;
                    } else {
                        innerTable = `<div style="padding:15px; color:#adb5bd; font-style:italic;">Không chỉ định người nhận (Giao chung cả lớp)</div>`;
                    }

                    let thaoTacBtn = `
                        <div style="display:flex; flex-direction:column; gap:5px; padding:5px;">
                            <button onclick="event.stopPropagation(); window.ham_21_20_mo_popup_chi_tiet('${nd.id}')" style="padding:4px; background:#17a2b8; color:white; border:none; border-radius:4px; cursor:pointer; font-size:11px; width:100%; font-weight:bold;">👁️ Xem</button>
                            <button onclick="event.stopPropagation(); window.ham_21_26_sua_noi_dung('${nd.id}')" style="padding:4px; background:#ffc107; color:black; border:none; border-radius:4px; cursor:pointer; font-size:11px; width:100%; font-weight:bold;">✏️ Sửa</button>
                            <button onclick="event.stopPropagation(); if(typeof ham_21_21_xoa_noi_dung === 'function') ham_21_21_xoa_noi_dung('${nd.id}')" style="padding:4px; background:#dc3545; color:white; border:none; border-radius:4px; cursor:pointer; font-size:11px; width:100%; font-weight:bold;">🗑️ Xóa</button>
                        </div>
                    `;

                    htmlTable += `<tr style="border-bottom: 2px solid #dee2e6; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#f1f8ff'" onmouseout="this.style.background='transparent'" onclick="if(typeof window.ham_21_20_mo_popup_chi_tiet === 'function') window.ham_21_20_mo_popup_chi_tiet('${nd.id}')">
                        <td style="padding:8px; text-align:center; border:1px solid #dee2e6; font-weight:bold; vertical-align:top;">${idx + 1}</td>
                        <td style="padding:8px; border:1px solid #dee2e6; vertical-align:top;">${tenNDHtml}</td>
                        <td style="padding:8px; text-align:center; border:1px solid #dee2e6; vertical-align:top;" onclick="event.stopPropagation()">${dsAnhND || '<span style="color:#adb5bd;font-size:11px;">-</span>'}</td>
                        <td style="padding:0; border:1px solid #dee2e6; vertical-align:top;">${innerTable}</td>
                        <td style="padding:0; text-align:center; border:1px solid #dee2e6; vertical-align:top;" onclick="event.stopPropagation()">${thaoTacBtn}</td>
                    </tr>`;
                });
                htmlTable += `</table>`;
                bangCu.innerHTML = htmlTable;
            } else {
                bangCu.innerHTML = '<i style="color:#666; font-size:13px; display:block; margin-bottom:15px;">Tuần này chưa có công việc giao việc nào được ghi nhận.</i>';
            }
        } else {
            document.getElementById('gvcn-nd-sinh-hoat').value = ''; document.getElementById('gvcn-danh-gia-tuan').value = '';
            vungAnhCu.innerHTML = ''; vungPreviewMoi.innerHTML = '<span>(Chưa có ảnh...)</span>'; bangCu.innerHTML = '';
        }
    } catch (e) { console.error(e); }
};

















// =====================================================================
// HÀM 21.17: TÌM VÀ NẠP DỮ LIỆU TUẦN GẦN NHẤT (SỬ DỤNG EVENT DISPATCH)
// =====================================================================
window.ham_21_17_tai_tuan_gan_nhat = async function () {
    const inputLop = document.getElementById('gvcn-input-lop');
    let maLopChon = inputLop ? inputLop.value.trim() : '';

    let query = _supabase.from('nhat_ky_gvcn').select('ma_lop, tuan_hoc').order('tu_ngay', { ascending: false }).limit(1);

    // Nếu đã chọn lớp -> Chỉ tìm trong phạm vi lớp đó
    if (maLopChon) {
        let maLop = maLopChon.match(/\(([^)]+)\)$/)?.[1]?.trim() || maLopChon;
        query = query.eq('ma_lop', maLop);
    }

    try {
        const { data, error } = await query.maybeSingle();
        if (error) throw error;

        if (data && data.tuan_hoc) {
            // Nếu chưa chọn lớp, tự động tìm và điền đúng format tên (mã) lớp từ datalist
            if (!maLopChon && data.ma_lop) {
                let datalistLop = document.getElementById('dl-lop');
                let foundOption = null;
                if (datalistLop) {
                    for (let opt of datalistLop.options) {
                        if (opt.value.includes(`(${data.ma_lop})`)) {
                            foundOption = opt.value;
                            break;
                        }
                    }
                }
                inputLop.value = foundOption || data.ma_lop;

                // 🌟 Kích hoạt sự kiện change để hệ thống tự động tải danh sách học sinh của lớp
                inputLop.dispatchEvent(new Event('change'));
            }

            // Điền tên Tuần vào ô
            document.getElementById('gvcn-input-tuan').value = data.tuan_hoc;

            // Đợi một nhịp ngắn để danh sách lớp load xong rồi gọi hàm nạp dữ liệu tuần
            setTimeout(() => {
                if (typeof window.ham_21_16_tai_du_lieu_tuan === 'function') {
                    window.ham_21_16_tai_du_lieu_tuan();
                }
            }, 300);

        } else {
            alert(maLopChon ? "⚠️ Lớp này chưa có dữ liệu Nhật ký tuần nào!" : "⚠️ Hệ thống chưa có dữ liệu Nhật ký nào được lưu!");
        }
    } catch (e) {
        console.error(e);
        alert("❌ Lỗi khi tìm tuần gần nhất: " + e.message);
    }
};


// 🌟 LẮNG NGHE SỰ KIỆN GÕ ĐỂ HIỆN DROPDOWN AVATAR (HỖ TRỢ CLASS MỚI)
document.addEventListener('focusin', function (e) {
    if (e.target.classList.contains('gvcn-input-hs') || e.target.classList.contains('sk-hs')) {
        e.target.removeAttribute('list'); e.target.setAttribute('autocomplete', 'off');
        if (typeof window.ham_21_11_hien_thi_dropdown_hs_gvcn === 'function') window.ham_21_11_hien_thi_dropdown_hs_gvcn(e.target);
    }
});
document.addEventListener('input', function (e) {
    if (e.target.classList.contains('gvcn-input-hs') || e.target.classList.contains('sk-hs')) {
        if (typeof window.ham_21_11_hien_thi_dropdown_hs_gvcn === 'function') window.ham_21_11_hien_thi_dropdown_hs_gvcn(e.target);
    }
});

// // =====================================================================
// // HÀM 21.18: RENDER BẢNG NỘI DUNG (CỘT RỘNG HƠN, ICON XẾP NGANG, HIỆN TRẠNG THÁI)
// // =====================================================================
// window.ham_21_18_render_bang_noi_dung = function (dataList, sortCol = '', sortAsc = true) {
//     const bangCu = document.getElementById('gvcn-bang-noi-dung-cu');
//     if (!bangCu) return;

//     if (sortCol) {
//         dataList.sort((a, b) => {
//             let valA = a[sortCol] || '';
//             let valB = b[sortCol] || '';
//             if (typeof valA === 'string') valA = valA.toLowerCase();
//             if (typeof valB === 'string') valB = valB.toLowerCase();
//             if (valA < valB) return sortAsc ? -1 : 1;
//             if (valA > valB) return sortAsc ? 1 : -1;
//             return 0;
//         });
//     }

//     let getArrow = (col) => sortCol === col ? (sortAsc ? ' 🔼' : ' 🔽') : ' ↕️';

//     let htmlTable = `<div style="font-weight: bold; font-size: 13px; color: #0056b3; margin-bottom: 8px;">
//         📌 Danh sách các nội dung đang có của tuần:
//     </div>`;

//     // 🌟 ĐIỀU CHỈNH ĐỘ RỘNG: HS hẹp đi (19%), Ảnh thêm 20px (80px), Thao tác rộng thêm (100px)
//     htmlTable += `<table style="width:100%; border-collapse: collapse; margin-bottom: 20px; font-size:13px; background:#fff;">
//         <tr style="background:#e9ecef; border-bottom:2px solid #0056b3; color:#0056b3; cursor:pointer;">
//             <th style="padding:8px; text-align:center; border:1px solid #dee2e6; width:40px;" onclick="if(typeof ham_21_19_sort_bang_noi_dung === 'function') ham_21_19_sort_bang_noi_dung('stt')">STT</th>
//             <th style="padding:8px; text-align:center; border:1px solid #dee2e6; width:85px; font-size:11px;" onclick="if(typeof ham_21_19_sort_bang_noi_dung === 'function') ham_21_19_sort_bang_noi_dung('ngay_nhap')">Ngày nhập${getArrow('ngay_nhap')}</th>
//             <th style="padding:8px; text-align:left; border:1px solid #dee2e6; width:18%;" onclick="if(typeof ham_21_19_sort_bang_noi_dung === 'function') ham_21_19_sort_bang_noi_dung('ten_noi_dung')">Tên nội dung${getArrow('ten_noi_dung')}</th>
//             <th style="padding:8px; text-align:left; border:1px solid #dee2e6; width:19%;">Học sinh</th>
//             <th style="padding:8px; text-align:left; border:1px solid #dee2e6; width:37%;">Phần việc</th>
//             <th style="padding:8px; text-align:center; border:1px solid #dee2e6; width:80px;">Ảnh</th>
//             <th style="padding:8px; text-align:center; border:1px solid #dee2e6; width:100px;">Thao tác</th>
//         </tr>`;

//     dataList.forEach((nd, idx) => {
//         let strNgay = nd.ngay_nhap ? nd.ngay_nhap.replace('T', ' ').substring(0, 16) : '';
//         let soAnhND = (nd.anh_dinh_kem || []).length;

//         // BẢNG LỒNG CHO HỌC SINH VÀ PHẦN VIỆC (Có bổ sung Label Trạng Thái)
//         let nestedTable = `<table style="width:100%; border-collapse: collapse; background:transparent;">`;
//         if (nd.nguoi_nhan && nd.nguoi_nhan.length > 0) {
//             nd.nguoi_nhan.forEach((hs, i) => {
//                 let hsObj = window.DanhSachHocSinhLopHienTai ? window.DanhSachHocSinhLopHienTai.find(h => h.uid === hs.uid || h.tenHienThi === hs.ten) : null;
//                 let avatar = hsObj ? hsObj.avatarUrl : `https://ui-avatars.com/api/?name=${encodeURIComponent(hs.ten)}&background=random&color=fff`;

//                 let borderBottom = i < nd.nguoi_nhan.length - 1 ? 'border-bottom: 1px dashed #ced4da;' : '';

//                 // Lên màu cho trạng thái
//                 let bgTrangThai = '#6c757d';
//                 if (hs.trang_thai === 'Đã xong') bgTrangThai = '#28a745';
//                 else if (hs.trang_thai === 'Chưa làm') bgTrangThai = '#dc3545';
//                 else if (hs.trang_thai === 'Chưa xong') bgTrangThai = '#ffc107';

//                 let nhanTrangThai = hs.trang_thai ? `<span style="background:${bgTrangThai}; color:${hs.trang_thai === 'Chưa xong' ? '#000' : '#fff'}; padding:2px 6px; border-radius:10px; font-size:10px; font-weight:bold; margin-left:6px; white-space:nowrap;">${hs.trang_thai}</span>` : '';

//                 nestedTable += `
//                 <tr>
//                     <td style="padding:6px; width:34%; ${borderBottom} border-right: 1px dashed #ced4da; vertical-align:top;">
//                         <div style="display:flex; align-items:flex-start; gap:5px;">
//                             <img src="${avatar}" style="width:18px; height:18px; border-radius:50%; border:1px solid #ccc; object-fit:cover; margin-top:1px;">
//                             <span style="font-weight:bold; color:#333; font-size:12px;">${hs.ten}</span>
//                         </div>
//                     </td>
//                     <td style="padding:6px; width:66%; ${borderBottom} vertical-align:top;">
//                         <div style="font-size:12px; line-height: 1.4; display:flex; align-items:center; flex-wrap:wrap;">
//                             <span style="color:#0056b3; margin-right:5px;">• ${hs.phan_viec || '(Chưa phân rõ)'}</span> 
//                             <span style="color:#e83e8c; font-style:italic; font-size:11px;">(${hs.danh_gia || 'Chưa ĐG'})</span>
//                             ${nhanTrangThai}
//                         </div>
//                     </td>
//                 </tr>`;
//             });
//         } else {
//             nestedTable += `<tr><td colspan="2" style="padding:8px; text-align:center; font-size:12px; font-style:italic; color:#666;">Giao chung toàn lớp</td></tr>`;
//         }
//         nestedTable += `</table>`;

//         htmlTable += `<tr style="cursor:pointer; transition:0.1s;" onmouseover="this.style.background='#f1f8ff'" onmouseout="this.style.background='transparent'" onclick="if(typeof ham_21_20_mo_popup_chi_tiet === 'function') ham_21_20_mo_popup_chi_tiet('${nd.id}')">
//             <td style="padding:8px; text-align:center; border:1px solid #dee2e6; font-weight:bold; vertical-align:top;">${idx + 1}</td>
//             <td style="padding:8px; text-align:center; border:1px solid #dee2e6; font-size:11px; color:#555; vertical-align:top;">${strNgay}</td>
//             <td style="padding:8px; border:1px solid #dee2e6; color:#0056b3; font-weight:bold; vertical-align:top;">${nd.ten_noi_dung}</td>
            
//             <td colspan="2" style="padding:0; border:1px solid #dee2e6; vertical-align:top;">
//                 ${nestedTable}
//             </td>
            
//             <td style="padding:8px; text-align:center; border:1px solid #dee2e6; vertical-align:top;" onclick="event.stopPropagation()">
//                 ${soAnhND > 0 ? `<span style="background:#17a2b8; color:white; padding:4px 8px; border-radius:12px; font-size:11px; font-weight:bold;">${soAnhND} ảnh</span>` : '-'}
//             </td>
            
//             <!-- 🌟 NÚT THAO TÁC XẾP NẰM NGANG CHUNG 1 DÒNG -->
//             <td style="padding:8px; text-align:center; border:1px solid #dee2e6; vertical-align:top;" onclick="event.stopPropagation()">
//                 <div style="display:flex; justify-content:center; align-items:center; gap:8px; margin-top:2px;">
//                     <button onclick="if(typeof ham_21_20_mo_popup_chi_tiet === 'function') ham_21_20_mo_popup_chi_tiet('${nd.id}')" title="Xem chi tiết" style="background:none; border:none; cursor:pointer; font-size:15px;" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'">👁️</button>
//                     <button onclick="alert('Tính năng sửa đang phát triển')" title="Sửa" style="background:none; border:none; cursor:pointer; font-size:15px;" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'">✏️</button>
//                     <button onclick="if(typeof ham_21_21_xoa_noi_dung === 'function') ham_21_21_xoa_noi_dung('${nd.id}')" title="Xóa" style="background:none; border:none; cursor:pointer; font-size:15px;" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'">🗑️</button>
//                 </div>
//             </td>
//         </tr>`;
//     });
//     htmlTable += `</table>`;
//     bangCu.innerHTML = htmlTable;
// };



// // =====================================================================
// // HÀM 21.18: RENDER BẢNG NỘI DUNG (CỘT ẢNH 110px, THAO TÁC 100px)
// // =====================================================================
// window.ham_21_18_render_bang_noi_dung = function (dataList, sortCol = '', sortAsc = true) {
//     const bangCu = document.getElementById('gvcn-bang-noi-dung-cu');
//     if (!bangCu) return;

//     if (sortCol) {
//         dataList.sort((a, b) => {
//             let valA = a[sortCol] || '';
//             let valB = b[sortCol] || '';
//             if (typeof valA === 'string') valA = valA.toLowerCase();
//             if (typeof valB === 'string') valB = valB.toLowerCase();
//             if (valA < valB) return sortAsc ? -1 : 1;
//             if (valA > valB) return sortAsc ? 1 : -1;
//             return 0;
//         });
//     }

//     let getArrow = (col) => sortCol === col ? (sortAsc ? ' 🔼' : ' 🔽') : ' ↕️';

//     let htmlTable = `<div style="font-weight: bold; font-size: 13px; color: #0056b3; margin-bottom: 8px;">
//         📌 Danh sách các nội dung đang có của tuần:
//     </div>`;

//     // 🌟 ĐIỀU CHỈNH: Ảnh lên 110px
//     htmlTable += `<table style="width:100%; border-collapse: collapse; margin-bottom: 20px; font-size:13px; background:#fff;">
//         <tr style="background:#e9ecef; border-bottom:2px solid #0056b3; color:#0056b3; cursor:pointer;">
//             <th style="padding:8px; text-align:center; border:1px solid #dee2e6; width:40px;" onclick="if(typeof ham_21_19_sort_bang_noi_dung === 'function') ham_21_19_sort_bang_noi_dung('stt')">STT</th>
//             <th style="padding:8px; text-align:center; border:1px solid #dee2e6; width:85px; font-size:11px;" onclick="if(typeof ham_21_19_sort_bang_noi_dung === 'function') ham_21_19_sort_bang_noi_dung('ngay_nhap')">Ngày nhập${getArrow('ngay_nhap')}</th>
//             <th style="padding:8px; text-align:left; border:1px solid #dee2e6; width:18%;" onclick="if(typeof ham_21_19_sort_bang_noi_dung === 'function') ham_21_19_sort_bang_noi_dung('ten_noi_dung')">Tên nội dung${getArrow('ten_noi_dung')}</th>
//             <th style="padding:8px; text-align:left; border:1px solid #dee2e6; width:19%;">Học sinh</th>
//             <th style="padding:8px; text-align:left; border:1px solid #dee2e6; width:37%;">Phần việc</th>
//             <th style="padding:8px; text-align:center; border:1px solid #dee2e6; width:110px;">Ảnh</th>
//             <th style="padding:8px; text-align:center; border:1px solid #dee2e6; width:100px;">Thao tác</th>
//         </tr>`;

//     dataList.forEach((nd, idx) => {
//         let strNgay = nd.ngay_nhap ? nd.ngay_nhap.replace('T', ' ').substring(0, 16) : '';
//         let soAnhND = (nd.anh_dinh_kem || []).length;

//         let nestedTable = `<table style="width:100%; border-collapse: collapse; background:transparent;">`;
//         if (nd.nguoi_nhan && nd.nguoi_nhan.length > 0) {
//             nd.nguoi_nhan.forEach((hs, i) => {
//                 let hsObj = window.DanhSachHocSinhLopHienTai ? window.DanhSachHocSinhLopHienTai.find(h => h.uid === hs.uid || h.tenHienThi === hs.ten) : null;
//                 let avatar = hsObj ? hsObj.avatarUrl : `https://ui-avatars.com/api/?name=${encodeURIComponent(hs.ten)}&background=random&color=fff`;

//                 let borderBottom = i < nd.nguoi_nhan.length - 1 ? 'border-bottom: 1px dashed #ced4da;' : '';

//                 let bgTrangThai = '#6c757d';
//                 if (hs.trang_thai === 'Đã xong') bgTrangThai = '#28a745';
//                 else if (hs.trang_thai === 'Chưa làm') bgTrangThai = '#dc3545';
//                 else if (hs.trang_thai === 'Chưa xong') bgTrangThai = '#ffc107';
//                 else if (hs.trang_thai === 'Đang làm') bgTrangThai = '#17a2b8';

//                 let nhanTrangThai = hs.trang_thai ? `<span style="background:${bgTrangThai}; color:${hs.trang_thai === 'Chưa xong' ? '#000' : '#fff'}; padding:2px 6px; border-radius:10px; font-size:10px; font-weight:bold; margin-left:6px; white-space:nowrap;">${hs.trang_thai}</span>` : '';

//                 nestedTable += `
//                 <tr>
//                     <td style="padding:6px; width:34%; ${borderBottom} border-right: 1px dashed #ced4da; vertical-align:top;">
//                         <div style="display:flex; align-items:flex-start; gap:5px;">
//                             <img src="${avatar}" style="width:18px; height:18px; border-radius:50%; border:1px solid #ccc; object-fit:cover; margin-top:1px;">
//                             <span style="font-weight:bold; color:#333; font-size:12px;">${hs.ten}</span>
//                         </div>
//                     </td>
//                     <td style="padding:6px; width:66%; ${borderBottom} vertical-align:top;">
//                         <div style="font-size:12px; line-height: 1.4; display:flex; align-items:center; flex-wrap:wrap;">
//                             <span style="color:#0056b3; margin-right:5px;">• ${hs.phan_viec || '(Chưa phân rõ)'}</span> 
//                             <span style="color:#e83e8c; font-style:italic; font-size:11px;">(${hs.danh_gia || 'Chưa ĐG'})</span>
//                             ${nhanTrangThai}
//                         </div>
//                     </td>
//                 </tr>`;
//             });
//         } else {
//             nestedTable += `<tr><td colspan="2" style="padding:8px; text-align:center; font-size:12px; font-style:italic; color:#666;">Giao chung toàn lớp</td></tr>`;
//         }
//         nestedTable += `</table>`;

//         htmlTable += `<tr style="cursor:pointer; transition:0.1s;" onmouseover="this.style.background='#f1f8ff'" onmouseout="this.style.background='transparent'" onclick="if(typeof ham_21_20_mo_popup_chi_tiet === 'function') ham_21_20_mo_popup_chi_tiet('${nd.id}')">
//             <td style="padding:8px; text-align:center; border:1px solid #dee2e6; font-weight:bold; vertical-align:top;">${idx + 1}</td>
//             <td style="padding:8px; text-align:center; border:1px solid #dee2e6; font-size:11px; color:#555; vertical-align:top;">${strNgay}</td>
//             <td style="padding:8px; border:1px solid #dee2e6; color:#0056b3; font-weight:bold; vertical-align:top;">${nd.ten_noi_dung}</td>
//             <td colspan="2" style="padding:0; border:1px solid #dee2e6; vertical-align:top;">
//                 ${nestedTable}
//             </td>
//             <td style="padding:8px; text-align:center; border:1px solid #dee2e6; vertical-align:top;" onclick="event.stopPropagation()">
//                 ${soAnhND > 0 ? `<span style="background:#17a2b8; color:white; padding:4px 8px; border-radius:12px; font-size:11px; font-weight:bold;">${soAnhND} ảnh</span>` : '-'}
//             </td>
//             <td style="padding:8px; text-align:center; border:1px solid #dee2e6; vertical-align:top;" onclick="event.stopPropagation()">
//                 <div style="display:flex; justify-content:center; align-items:center; gap:8px; margin-top:2px;">
//                     <button onclick="if(typeof ham_21_20_mo_popup_chi_tiet === 'function') ham_21_20_mo_popup_chi_tiet('${nd.id}')" title="Xem chi tiết" style="background:none; border:none; cursor:pointer; font-size:15px;" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'">👁️</button>
//                     <button onclick="alert('Tính năng sửa đang phát triển')" title="Sửa" style="background:none; border:none; cursor:pointer; font-size:15px;" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'">✏️</button>
//                     <button onclick="if(typeof ham_21_21_xoa_noi_dung === 'function') ham_21_21_xoa_noi_dung('${nd.id}')" title="Xóa" style="background:none; border:none; cursor:pointer; font-size:15px;" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'">🗑️</button>
//                 </div>
//             </td>
//         </tr>`;
//     });
//     htmlTable += `</table>`;
//     bangCu.innerHTML = htmlTable;
// };



// // =====================================================================
// // HÀM 21.18: RENDER BẢNG NỘI DUNG (CÓ ICON XEM ẢNH TRỰC TIẾP TRÊN BẢNG)
// // =====================================================================
// window.ham_21_18_render_bang_noi_dung = function (dataList, sortCol = '', sortAsc = true) {
//     const bangCu = document.getElementById('gvcn-bang-noi-dung-cu');
//     if (!bangCu) return;

//     if (sortCol) {
//         dataList.sort((a, b) => {
//             let valA = a[sortCol] || ''; let valB = b[sortCol] || '';
//             if (typeof valA === 'string') valA = valA.toLowerCase();
//             if (typeof valB === 'string') valB = valB.toLowerCase();
//             return (valA < valB) ? (sortAsc ? -1 : 1) : (valA > valB ? (sortAsc ? 1 : -1) : 0);
//         });
//     }

//     let getArrow = (col) => sortCol === col ? (sortAsc ? ' 🔼' : ' 🔽') : ' ↕️';

//     let htmlTable = `<div style="font-weight: bold; font-size: 13px; color: #0056b3; margin-bottom: 8px;">📌 Danh sách các nội dung đang có của tuần:</div>`;

//     htmlTable += `<table style="width:100%; border-collapse: collapse; margin-bottom: 20px; font-size:13px; background:#fff;">
//         <tr style="background:#e9ecef; border-bottom:2px solid #0056b3; color:#0056b3; cursor:pointer;">
//             <th style="padding:8px; text-align:center; border:1px solid #dee2e6; width:40px;" onclick="if(typeof ham_21_19_sort_bang_noi_dung === 'function') ham_21_19_sort_bang_noi_dung('stt')">STT</th>
//             <th style="padding:8px; text-align:center; border:1px solid #dee2e6; width:85px; font-size:11px;" onclick="if(typeof ham_21_19_sort_bang_noi_dung === 'function') ham_21_19_sort_bang_noi_dung('ngay_nhap')">Ngày nhập${getArrow('ngay_nhap')}</th>
//             <th style="padding:8px; text-align:left; border:1px solid #dee2e6; width:18%;" onclick="if(typeof ham_21_19_sort_bang_noi_dung === 'function') ham_21_19_sort_bang_noi_dung('ten_noi_dung')">Tên nội dung${getArrow('ten_noi_dung')}</th>
//             <th style="padding:8px; text-align:left; border:1px solid #dee2e6; width:19%;">Học sinh</th>
//             <th style="padding:8px; text-align:left; border:1px solid #dee2e6; width:37%;">Phần việc</th>
//             <th style="padding:8px; text-align:center; border:1px solid #dee2e6; width:110px;">Ảnh chung</th>
//             <th style="padding:8px; text-align:center; border:1px solid #dee2e6; width:100px;">Thao tác</th>
//         </tr>`;

//     dataList.forEach((nd, idx) => {
//         let strNgay = nd.ngay_nhap ? nd.ngay_nhap.replace('T', ' ').substring(0, 16) : '';
//         let soAnhND = (nd.anh_dinh_kem || []).length;

//         let nestedTable = `<table style="width:100%; border-collapse: collapse; background:transparent;">`;
//         if (nd.nguoi_nhan && nd.nguoi_nhan.length > 0) {
//             nd.nguoi_nhan.forEach((hs, i) => {
//                 let hsObj = window.DanhSachHocSinhLopHienTai ? window.DanhSachHocSinhLopHienTai.find(h => h.uid === hs.uid || h.tenHienThi === hs.ten) : null;
//                 let avatar = hsObj ? hsObj.avatarUrl : `https://ui-avatars.com/api/?name=${encodeURIComponent(hs.ten)}&background=random&color=fff`;
//                 let borderBottom = i < nd.nguoi_nhan.length - 1 ? 'border-bottom: 1px dashed #ced4da;' : '';

//                 let bgTrangThai = '#6c757d';
//                 if (hs.trang_thai === 'Đã xong') bgTrangThai = '#28a745';
//                 else if (hs.trang_thai === 'Chưa làm') bgTrangThai = '#dc3545';
//                 else if (hs.trang_thai === 'Chưa xong') bgTrangThai = '#ffc107';
//                 else if (hs.trang_thai === 'Đang làm') bgTrangThai = '#17a2b8';

//                 let nhanTrangThai = hs.trang_thai ? `<span style="background:${bgTrangThai}; color:${hs.trang_thai === 'Chưa xong' ? '#000' : '#fff'}; padding:2px 6px; border-radius:10px; font-size:10px; font-weight:bold; margin-left:6px; white-space:nowrap;">${hs.trang_thai}</span>` : '';

//                 // Icon ảnh nếu HS có nộp ảnh minh chứng
//                 let iconAnhHS = hs.anh_minh_chung ? `<a href="${hs.anh_minh_chung}" target="_blank" title="Xem ảnh cá nhân" style="text-decoration:none; margin-left:8px; font-size:14px;" onclick="event.stopPropagation()">🖼️</a>` : '';

//                 nestedTable += `
//                 <tr>
//                     <td style="padding:6px; width:34%; ${borderBottom} border-right: 1px dashed #ced4da; vertical-align:top;">
//                         <div style="display:flex; align-items:flex-start; gap:5px;">
//                             <img src="${avatar}" style="width:18px; height:18px; border-radius:50%; border:1px solid #ccc; object-fit:cover; margin-top:1px;">
//                             <span style="font-weight:bold; color:#333; font-size:12px;">${hs.ten}</span>
//                         </div>
//                     </td>
//                     <td style="padding:6px; width:66%; ${borderBottom} vertical-align:top;">
//                         <div style="font-size:12px; line-height: 1.4; display:flex; align-items:center; flex-wrap:wrap;">
//                             <span style="color:#0056b3; margin-right:5px;">• ${hs.phan_viec || '(Chưa phân rõ)'}</span> 
//                             <span style="color:#e83e8c; font-style:italic; font-size:11px;">(${hs.danh_gia || 'Chưa ĐG'})</span>
//                             ${nhanTrangThai} ${iconAnhHS}
//                         </div>
//                     </td>
//                 </tr>`;
//             });
//         } else {
//             nestedTable += `<tr><td colspan="2" style="padding:8px; text-align:center; font-size:12px; font-style:italic; color:#666;">Giao chung toàn lớp</td></tr>`;
//         }
//         nestedTable += `</table>`;

//         htmlTable += `<tr style="cursor:pointer; transition:0.1s;" onmouseover="this.style.background='#f1f8ff'" onmouseout="this.style.background='transparent'" onclick="if(typeof ham_21_20_mo_popup_chi_tiet === 'function') ham_21_20_mo_popup_chi_tiet('${nd.id}')">
//             <td style="padding:8px; text-align:center; border:1px solid #dee2e6; font-weight:bold; vertical-align:top;">${idx + 1}</td>
//             <td style="padding:8px; text-align:center; border:1px solid #dee2e6; font-size:11px; color:#555; vertical-align:top;">${strNgay}</td>
//             <td style="padding:8px; border:1px solid #dee2e6; color:#0056b3; font-weight:bold; vertical-align:top;">${nd.ten_noi_dung}</td>
//             <td colspan="2" style="padding:0; border:1px solid #dee2e6; vertical-align:top;">${nestedTable}</td>
//             <td style="padding:8px; text-align:center; border:1px solid #dee2e6; vertical-align:top;" onclick="event.stopPropagation()">
//                 ${soAnhND > 0 ? `<span style="background:#17a2b8; color:white; padding:4px 8px; border-radius:12px; font-size:11px; font-weight:bold;">${soAnhND} ảnh</span>` : '-'}
//             </td>
//             <td style="padding:8px; text-align:center; border:1px solid #dee2e6; vertical-align:top;" onclick="event.stopPropagation()">
//                 <div style="display:flex; justify-content:center; align-items:center; gap:8px; margin-top:2px;">
//                     <button onclick="if(typeof ham_21_20_mo_popup_chi_tiet === 'function') ham_21_20_mo_popup_chi_tiet('${nd.id}')" title="Xem chi tiết" style="background:none; border:none; cursor:pointer; font-size:15px;" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'">👁️</button>
//                     <button onclick="alert('Tính năng sửa đang phát triển')" title="Sửa" style="background:none; border:none; cursor:pointer; font-size:15px;" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'">✏️</button>
//                     <button onclick="if(typeof ham_21_21_xoa_noi_dung === 'function') ham_21_21_xoa_noi_dung('${nd.id}')" title="Xóa" style="background:none; border:none; cursor:pointer; font-size:15px;" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'">🗑️</button>
//                 </div>
//             </td>
//         </tr>`;
//     });
//     htmlTable += `</table>`;
//     bangCu.innerHTML = htmlTable;
// };


// =====================================================================
// HÀM 21.18: RENDER BẢNG NỘI DUNG (DỜI CỘT ẢNH CHUNG LÊN SAU TÊN NỘI DUNG)
// =====================================================================
window.ham_21_18_render_bang_noi_dung = function (dataList, sortCol = '', sortAsc = true) {
    const bangCu = document.getElementById('gvcn-bang-noi-dung-cu');
    if (!bangCu) return;

    if (sortCol) {
        dataList.sort((a, b) => {
            let valA = a[sortCol] || ''; let valB = b[sortCol] || '';
            if (typeof valA === 'string') valA = valA.toLowerCase();
            if (typeof valB === 'string') valB = valB.toLowerCase();
            return (valA < valB) ? (sortAsc ? -1 : 1) : (valA > valB ? (sortAsc ? 1 : -1) : 0);
        });
    }

    let getArrow = (col) => sortCol === col ? (sortAsc ? ' 🔼' : ' 🔽') : ' ↕️';

    let htmlTable = `<div style="font-weight: bold; font-size: 13px; color: #0056b3; margin-bottom: 8px;">📌 Danh sách các nội dung đang có của tuần:</div>`;

    // 🌟 ĐÃ DỜI CỘT "ẢNH CHUNG" LÊN SAU "TÊN NỘI DUNG"
    htmlTable += `<table style="width:100%; border-collapse: collapse; margin-bottom: 20px; font-size:13px; background:#fff;">
        <tr style="background:#e9ecef; border-bottom:2px solid #0056b3; color:#0056b3; cursor:pointer;">
            <th style="padding:8px; text-align:center; border:1px solid #dee2e6; width:40px;" onclick="if(typeof ham_21_19_sort_bang_noi_dung === 'function') ham_21_19_sort_bang_noi_dung('stt')">STT</th>
            <th style="padding:8px; text-align:center; border:1px solid #dee2e6; width:85px; font-size:11px;" onclick="if(typeof ham_21_19_sort_bang_noi_dung === 'function') ham_21_19_sort_bang_noi_dung('ngay_nhap')">Ngày nhập${getArrow('ngay_nhap')}</th>
            <th style="padding:8px; text-align:left; border:1px solid #dee2e6; width:16%;" onclick="if(typeof ham_21_19_sort_bang_noi_dung === 'function') ham_21_19_sort_bang_noi_dung('ten_noi_dung')">Tên nội dung${getArrow('ten_noi_dung')}</th>
            
            <!-- CỘT ẢNH CHUNG Ở ĐÂY -->
            <th style="padding:8px; text-align:center; border:1px solid #dee2e6; width:150px;">Ảnh chung</th>
            
            <!-- NHÓM 5 CỘT CON CHO PHẦN VIỆC (Tổng = 100% của phần còn lại) -->
            <th style="padding:8px; text-align:left; border:1px solid #dee2e6; width:20%;">Học sinh</th>
            <th style="padding:8px; text-align:left; border:1px solid #dee2e6; width:20%;">Tên phần việc</th>
            <th style="padding:8px; text-align:center; border:1px solid #dee2e6; width:10%;">Tiến độ</th>
            <th style="padding:8px; text-align:center; border:1px solid #dee2e6; width:10%;">Đánh giá</th>
            <th style="padding:8px; text-align:center; border:1px solid #dee2e6; width:6%;">Ảnh riêng</th>
            
            <th style="padding:8px; text-align:center; border:1px solid #dee2e6; width:100px;">Thao tác</th>
        </tr>`;

    dataList.forEach((nd, idx) => {
        let strNgay = nd.ngay_nhap ? nd.ngay_nhap.replace('T', ' ').substring(0, 16) : '';
        let soAnhND = (nd.anh_dinh_kem || []).length;

        // BẢNG LỒNG ĐỂ CHIA 5 CỘT CON CHO MỖI HỌC SINH
        let nestedTable = `<table style="width:100%; border-collapse: collapse; background:transparent; table-layout: fixed;">`;
        if (nd.nguoi_nhan && nd.nguoi_nhan.length > 0) {
            nd.nguoi_nhan.forEach((hs, i) => {
                let hsObj = window.DanhSachHocSinhLopHienTai ? window.DanhSachHocSinhLopHienTai.find(h => h.uid === hs.uid || h.tenHienThi === hs.ten) : null;
                let avatar = hsObj ? hsObj.avatarUrl : `https://ui-avatars.com/api/?name=${encodeURIComponent(hs.ten)}&background=random&color=fff`;
                let borderBottom = i < nd.nguoi_nhan.length - 1 ? 'border-bottom: 1px dashed #ced4da;' : '';

                // Trạng thái (Tiến độ)
                let bgTrangThai = '#6c757d';
                if (hs.trang_thai === 'Đã xong') bgTrangThai = '#28a745';
                else if (hs.trang_thai === 'Chưa làm') bgTrangThai = '#dc3545';
                else if (hs.trang_thai === 'Chưa xong') bgTrangThai = '#ffc107';
                else if (hs.trang_thai === 'Đang làm') bgTrangThai = '#17a2b8';
                let nhanTrangThai = hs.trang_thai ? `<span style="background:${bgTrangThai}; color:${hs.trang_thai === 'Chưa xong' ? '#000' : '#fff'}; padding:3px 8px; border-radius:12px; font-size:11px; font-weight:bold; white-space:nowrap; box-shadow:0 1px 2px rgba(0,0,0,0.1);">${hs.trang_thai}</span>` : '<span style="color:#999; font-size:11px;">-</span>';

                // Đánh giá
                let nhanDanhGia = hs.danh_gia ? `<span style="color:#e83e8c; font-weight:bold; font-size:12px;">${hs.danh_gia}</span>` : '<span style="color:#999; font-size:12px;">-</span>';

                // Ảnh minh chứng riêng
                let iconAnhHS = hs.anh_minh_chung ? `<a href="${hs.anh_minh_chung}" target="_blank" title="Xem ảnh cá nhân" style="text-decoration:none; font-size:18px;" onclick="event.stopPropagation()">🖼️</a>` : '<span style="color:#ccc; font-size:12px;">-</span>';

                nestedTable += `
                <tr>
                    <td style="padding:6px; width:30.3%; ${borderBottom} border-right: 1px dashed #ced4da; vertical-align:middle; overflow: hidden; text-overflow: ellipsis;">
                        <div style="display:flex; align-items:center; gap:5px;">
                            <img src="${avatar}" style="width:20px; height:20px; border-radius:50%; border:1px solid #ccc; object-fit:cover;">
                            <span style="font-weight:bold; color:#333; font-size:12px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${hs.ten}</span>
                        </div>
                    </td>
                    <td style="padding:6px; width:30.3%; ${borderBottom} border-right: 1px dashed #ced4da; vertical-align:middle;">
                        <span style="color:#0056b3; font-size:12px;">• ${hs.phan_viec || '(Chưa phân rõ)'}</span>
                    </td>
                    <td style="padding:6px; width:15.1%; ${borderBottom} border-right: 1px dashed #ced4da; vertical-align:middle; text-align:center;">
                        ${nhanTrangThai}
                    </td>
                    <td style="padding:6px; width:15.1%; ${borderBottom} border-right: 1px dashed #ced4da; vertical-align:middle; text-align:center;">
                        ${nhanDanhGia}
                    </td>
                    <td style="padding:6px; width:9.2%; ${borderBottom} vertical-align:middle; text-align:center;">
                        ${iconAnhHS}
                    </td>
                </tr>`;
            });
        } else {
            nestedTable += `<tr><td colspan="5" style="padding:8px; text-align:center; font-size:12px; font-style:italic; color:#666;">Giao chung toàn lớp</td></tr>`;
        }
        nestedTable += `</table>`;

        htmlTable += `<tr style="cursor:pointer; transition:0.1s;" onmouseover="this.style.background='#f1f8ff'" onmouseout="this.style.background='transparent'" onclick="if(typeof ham_21_20_mo_popup_chi_tiet === 'function') ham_21_20_mo_popup_chi_tiet('${nd.id}')">
            <td style="padding:8px; text-align:center; border:1px solid #dee2e6; font-weight:bold; vertical-align:top;">${idx + 1}</td>
            <td style="padding:8px; text-align:center; border:1px solid #dee2e6; font-size:11px; color:#555; vertical-align:top;">${strNgay}</td>
            <td style="padding:8px; border:1px solid #dee2e6; color:#0056b3; font-weight:bold; vertical-align:top;">${nd.ten_noi_dung}</td>
            
            <!-- 🌟 CỘT ẢNH CHUNG Ở ĐÂY -->
            <td style="padding:8px; text-align:center; border:1px solid #dee2e6; vertical-align:top;" onclick="event.stopPropagation()">
                ${soAnhND > 0 ? `<span style="background:#17a2b8; color:white; padding:4px 8px; border-radius:12px; font-size:11px; font-weight:bold;">${soAnhND} ảnh</span>` : '-'}
            </td>
            
            <!-- 5 CỘT CON -->
            <td colspan="5" style="padding:0; border:1px solid #dee2e6; vertical-align:top;">${nestedTable}</td>
            
            <!-- CỘT THAO TÁC -->
            <td style="padding:8px; text-align:center; border:1px solid #dee2e6; vertical-align:top;" onclick="event.stopPropagation()">
                <div style="display:flex; justify-content:center; align-items:center; gap:8px; margin-top:2px;">
                    <button onclick="if(typeof ham_21_20_mo_popup_chi_tiet === 'function') ham_21_20_mo_popup_chi_tiet('${nd.id}')" title="Xem chi tiết" style="background:none; border:none; cursor:pointer; font-size:15px;" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'">👁️</button>
                    <button onclick="alert('Tính năng sửa đang phát triển')" title="Sửa" style="background:none; border:none; cursor:pointer; font-size:15px;" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'">✏️</button>
                    <button onclick="if(typeof ham_21_21_xoa_noi_dung === 'function') ham_21_21_xoa_noi_dung('${nd.id}')" title="Xóa" style="background:none; border:none; cursor:pointer; font-size:15px;" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'">🗑️</button>
                </div>
            </td>
        </tr>`;
    });
    htmlTable += `</table>`;
    bangCu.innerHTML = htmlTable;
};





// =====================================================================
// HÀM 21.19: SẮP XẾP (SORT) CÁC CỘT TRONG BẢNG NỘI DUNG
// =====================================================================
window.gvcn_SortAsc = true;
window.gvcn_CurrentSortCol = '';
window.ham_21_19_sort_bang_noi_dung = function (col) {
    if (window.gvcn_CurrentSortCol === col) {
        window.gvcn_SortAsc = !window.gvcn_SortAsc;
    } else {
        window.gvcn_CurrentSortCol = col;
        window.gvcn_SortAsc = true;
    }
    if (window.gvcn_DanhSachNoiDangHienTai) {
        if (typeof window.ham_21_18_render_bang_noi_dung === 'function') {
            window.ham_21_18_render_bang_noi_dung(window.gvcn_DanhSachNoiDangHienTai, col, window.gvcn_SortAsc);
        }
    }
};

// // =====================================================================
// // HÀM 21.20: HIỂN THỊ POPUP (FULL AVATAR, STATUS, FIX ẢNH)
// // =====================================================================
// window.ham_21_20_mo_popup_chi_tiet = function (id) {
//     if (!window.gvcn_DanhSachNoiDangHienTai) return;
//     let item = window.gvcn_DanhSachNoiDangHienTai.find(x => x.id === id);
//     if (!item) return;

//     let modal = document.getElementById('gvcn-modal-chitiet');
//     if (!modal) {
//         modal = document.createElement('div');
//         modal.id = 'gvcn-modal-chitiet';
//         modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); display:flex; align-items:center; justify-content:center; z-index:9999;';
//         document.body.appendChild(modal);
//     }

//     let htmlNguoiNhan = (item.nguoi_nhan || []).map(hs => {
//         // Tái tạo màu sắc trạng thái
//         let bgTrangThai = '#6c757d';
//         if (hs.trang_thai === 'Đã xong') bgTrangThai = '#28a745';
//         else if (hs.trang_thai === 'Chưa làm') bgTrangThai = '#dc3545';
//         else if (hs.trang_thai === 'Chưa xong') bgTrangThai = '#ffc107';
//         else if (hs.trang_thai === 'Đang làm') bgTrangThai = '#17a2b8';

//         let nhanTT = hs.trang_thai ? `<span style="background:${bgTrangThai}; color:${hs.trang_thai === 'Chưa xong' ? '#000' : '#fff'}; padding:3px 10px; border-radius:12px; font-size:11px; font-weight:bold; margin-left:10px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">${hs.trang_thai}</span>` : '';

//         // Tải Avatar 
//         let hsObj = window.DanhSachHocSinhLopHienTai ? window.DanhSachHocSinhLopHienTai.find(h => h.uid === hs.uid || h.tenHienThi === hs.ten) : null;
//         let avatar = hsObj ? hsObj.avatarUrl : `https://ui-avatars.com/api/?name=${encodeURIComponent(hs.ten)}&background=random&color=fff`;

//         return `
//         <div style="background:#f8f9fa; padding:12px; border-radius:8px; margin-bottom:10px; border:1px solid #dee2e6; display:flex; gap:12px; align-items:flex-start;">
//             <img src="${avatar}" style="width:40px; height:40px; border-radius:50%; border:2px solid #ccc; object-fit:cover; margin-top:2px;">
//             <div style="flex:1;">
//                 <div style="margin-bottom:6px; font-size: 14px;"><b>👤 ${hs.ten}</b> <span style="color:#666; font-size:12px;">(${hs.ten_dang_nhap || 'Không SDT'})</span></div>
//                 <div style="line-height:1.6; font-size: 13px;">
//                     🛠️ Phần việc: <b style="color:#0056b3;">${hs.phan_viec || 'Không có'}</b><br>
//                     ⭐ Đánh giá: <span style="color:#e83e8c; font-weight:bold;">${hs.danh_gia || 'Chưa đánh giá'}</span> ${nhanTT}
//                     ${hs.ghi_chu ? `<br>📝 Ghi chú: <i style="color:#555;">${hs.ghi_chu}</i>` : ''}
//                 </div>
//             </div>
//         </div>
//         `;
//     }).join('') || '<i>Không có học sinh nhận việc riêng.</i>';

//     // 🌟 SỬ DỤNG DRIVE THUMBNAIL ĐỂ LOAD ẢNH CỦA POPUP (TRÁNH LỖI BIỂU TƯỢNG)
//     let htmlAnh = (item.anh_dinh_kem || []).map(linkAnh => {
//         let fileId = '';
//         if (linkAnh.includes('/d/')) {
//             let m = linkAnh.match(/\/d\/([a-zA-Z0-9_-]+)/);
//             if (m && m[1]) fileId = m[1];
//         } else if (linkAnh.includes('id=')) {
//             let m = linkAnh.match(/id=([a-zA-Z0-9_-]+)/);
//             if (m && m[1]) fileId = m[1];
//         }
//         let srcHienThi = fileId ? `https://drive.google.com/thumbnail?id=${fileId}&sz=w800` : linkAnh;

//         return `
//         <a href="${linkAnh}" target="_blank" title="Bấm để mở to">
//             <img src="${srcHienThi}" onerror="this.onerror=null; this.src='${linkAnh}';" style="max-height:130px; border-radius:8px; border:1px solid #ced4da; object-fit:contain; box-shadow: 0 2px 5px rgba(0,0,0,0.1); cursor:pointer; transition:0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
//         </a>`;
//     }).join('') || '<i>Không có ảnh đính kèm.</i>';

//     modal.innerHTML = `
//         <div style="background:#fff; width:650px; max-width:92%; padding:25px; border-radius:12px; box-shadow:0 10px 25px rgba(0,0,0,0.4); max-height:85vh; overflow-y:auto; position:relative;">
//             <button onclick="document.getElementById('gvcn-modal-chitiet').remove()" style="position:absolute; top:15px; right:15px; background:none; border:none; font-size:22px; font-weight:bold; cursor:pointer; color:#999; transition:0.2s;" onmouseover="this.style.color='#dc3545'" onmouseout="this.style.color='#999'">✖</button>
//             <h3 style="margin-top:0; color:#0056b3; border-bottom:2px solid #cce5ff; padding-bottom:12px; font-size: 18px;">📋 Chi tiết Nội dung / Giao việc</h3>
//             <p style="font-size:13px; margin-bottom:8px;"><b>📅 Ngày nhập:</b> ${item.ngay_nhap ? item.ngay_nhap.replace('T', ' ') : ''}</p>
//             <p style="margin-bottom:8px;"><b>📌 Tên nội dung:</b> <span style="color:#0056b3; font-weight:bold; font-size:15px;">${item.ten_noi_dung}</span></p>
//             <p><b>📝 Mô tả chi tiết:</b><br><div style="background:#fdfdfe; padding:12px; border:1px solid #e9ecef; border-radius:8px; white-space:pre-wrap; font-size:13px; line-height:1.5;">${item.chi_tiet || 'Không có mô tả...'}</div></p>
//             <p><b>👤 Danh sách học sinh nhận việc:</b><br><div style="margin-top:8px;">${htmlNguoiNhan}</div></p>
//             <p><b>📸 Ảnh minh chứng:</b><br><div style="display:flex; gap:12px; flex-wrap:wrap; margin-top:8px; padding:10px; background:#f8f9fa; border-radius:8px; border: 1px dashed #dee2e6;">${htmlAnh}</div></p>
//             <div style="text-align:right; margin-top:25px;">
//                 <button onclick="document.getElementById('gvcn-modal-chitiet').remove()" style="padding:10px 25px; background:#6c757d; color:#white; border:none; border-radius:6px; cursor:pointer; font-weight:bold; box-shadow:0 2px 4px rgba(0,0,0,0.15);">Đóng</button>
//             </div>
//         </div>
//     `;
// };



// // =====================================================================
// // HÀM 21.20: HIỂN THỊ POPUP (CÓ ẢNH VÀ TRẠNG THÁI CÁ NHÂN SẮC NÉT)
// // =====================================================================
// window.ham_21_20_mo_popup_chi_tiet = function (id) {
//     if (!window.gvcn_DanhSachNoiDangHienTai) return;
//     let item = window.gvcn_DanhSachNoiDangHienTai.find(x => x.id === id);
//     if (!item) return;

//     let modal = document.getElementById('gvcn-modal-chitiet');
//     if (!modal) {
//         modal = document.createElement('div');
//         modal.id = 'gvcn-modal-chitiet';
//         modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); display:flex; align-items:center; justify-content:center; z-index:9999;';
//         document.body.appendChild(modal);
//     }

//     let htmlNguoiNhan = (item.nguoi_nhan || []).map(hs => {
//         let bgTrangThai = '#6c757d';
//         if (hs.trang_thai === 'Đã xong') bgTrangThai = '#28a745';
//         else if (hs.trang_thai === 'Chưa làm') bgTrangThai = '#dc3545';
//         else if (hs.trang_thai === 'Chưa xong') bgTrangThai = '#ffc107';
//         else if (hs.trang_thai === 'Đang làm') bgTrangThai = '#17a2b8';

//         let nhanTT = hs.trang_thai ? `<span style="background:${bgTrangThai}; color:${hs.trang_thai === 'Chưa xong' ? '#000' : '#fff'}; padding:3px 10px; border-radius:12px; font-size:11px; font-weight:bold; margin-left:10px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">${hs.trang_thai}</span>` : '';

//         let hsObj = window.DanhSachHocSinhLopHienTai ? window.DanhSachHocSinhLopHienTai.find(h => h.uid === hs.uid || h.tenHienThi === hs.ten) : null;
//         let avatar = hsObj ? hsObj.avatarUrl : `https://ui-avatars.com/api/?name=${encodeURIComponent(hs.ten)}&background=random&color=fff`;

//         // 🌟 CHÈN ẢNH MINH CHỨNG CÁ NHÂN XUỐNG DƯỚI GHI CHÚ
//         let hinhAnhCanhan = hs.anh_minh_chung ? `
//             <div style="margin-top:10px; border-top: 1px dashed #ccc; padding-top: 8px;">
//                 <b style="font-size:12px; color:#555;">📸 Ảnh minh chứng cá nhân:</b><br>
//                 <a href="${hs.anh_minh_chung}" target="_blank" title="Bấm để mở to">
//                     <img src="${window.ham_21_25_get_thumbnail_drive ? window.ham_21_25_get_thumbnail_drive(hs.anh_minh_chung, 'w400') : hs.anh_minh_chung}" onerror="this.onerror=null; this.src='${hs.anh_minh_chung}';" style="max-height:90px; border-radius:6px; border:1px solid #ced4da; margin-top:5px; box-shadow:0 1px 3px rgba(0,0,0,0.1); cursor:pointer;">
//                 </a>
//             </div>` : '';

//         return `
//         <div style="background:#f8f9fa; padding:12px; border-radius:8px; margin-bottom:10px; border:1px solid #dee2e6; display:flex; gap:12px; align-items:flex-start;">
//             <img src="${avatar}" style="width:40px; height:40px; border-radius:50%; border:2px solid #ccc; object-fit:cover; margin-top:2px;">
//             <div style="flex:1;">
//                 <div style="margin-bottom:6px; font-size: 14px;"><b>👤 ${hs.ten}</b> <span style="color:#666; font-size:12px;">(${hs.ten_dang_nhap || 'Không SDT'})</span></div>
//                 <div style="line-height:1.6; font-size: 13px;">
//                     🛠️ Phần việc: <b style="color:#0056b3;">${hs.phan_viec || 'Không có'}</b><br>
//                     ⭐ Đánh giá: <span style="color:#e83e8c; font-weight:bold;">${hs.danh_gia || 'Chưa đánh giá'}</span> ${nhanTT}
//                     ${hs.ghi_chu ? `<br>📝 Ghi chú: <i style="color:#555;">${hs.ghi_chu}</i>` : ''}
//                     ${hinhAnhCanhan}
//                 </div>
//             </div>
//         </div>
//         `;
//     }).join('') || '<i>Không có học sinh nhận việc riêng.</i>';

//     let htmlAnhChung = (item.anh_dinh_kem || []).map(linkAnh => `
//         <a href="${linkAnh}" target="_blank" title="Bấm để mở to">
//             <img src="${window.ham_21_25_get_thumbnail_drive ? window.ham_21_25_get_thumbnail_drive(linkAnh, 'w800') : linkAnh}" onerror="this.onerror=null; this.src='${linkAnh}';" style="max-height:130px; border-radius:8px; border:1px solid #ced4da; object-fit:contain; box-shadow: 0 2px 5px rgba(0,0,0,0.1); cursor:pointer; transition:0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
//         </a>`).join('') || '<i>Không có ảnh chung đính kèm.</i>';

//     modal.innerHTML = `
//         <div style="background:#fff; width:650px; max-width:92%; padding:25px; border-radius:12px; box-shadow:0 10px 25px rgba(0,0,0,0.4); max-height:85vh; overflow-y:auto; position:relative;">
//             <button onclick="document.getElementById('gvcn-modal-chitiet').remove()" style="position:absolute; top:15px; right:15px; background:none; border:none; font-size:22px; font-weight:bold; cursor:pointer; color:#999; transition:0.2s;" onmouseover="this.style.color='#dc3545'" onmouseout="this.style.color='#999'">✖</button>
//             <h3 style="margin-top:0; color:#0056b3; border-bottom:2px solid #cce5ff; padding-bottom:12px; font-size: 18px;">📋 Chi tiết Nội dung / Giao việc</h3>
//             <p style="font-size:13px; margin-bottom:8px;"><b>📅 Ngày nhập:</b> ${item.ngay_nhap ? item.ngay_nhap.replace('T', ' ') : ''}</p>
//             <p style="margin-bottom:8px;"><b>📌 Tên nội dung:</b> <span style="color:#0056b3; font-weight:bold; font-size:15px;">${item.ten_noi_dung}</span></p>
//             <p><b>📝 Mô tả chi tiết:</b><br><div style="background:#fdfdfe; padding:12px; border:1px solid #e9ecef; border-radius:8px; white-space:pre-wrap; font-size:13px; line-height:1.5;">${item.chi_tiet || 'Không có mô tả...'}</div></p>
//             <p><b>👤 Danh sách học sinh nhận việc:</b><br><div style="margin-top:8px;">${htmlNguoiNhan}</div></p>
//             <p><b>📸 Ảnh chung minh chứng:</b><br><div style="display:flex; gap:12px; flex-wrap:wrap; margin-top:8px; padding:10px; background:#f8f9fa; border-radius:8px; border: 1px dashed #dee2e6;">${htmlAnhChung}</div></p>
//             <div style="text-align:right; margin-top:25px;">
//                 <button onclick="document.getElementById('gvcn-modal-chitiet').remove()" style="padding:10px 25px; background:#6c757d; color:#white; border:none; border-radius:6px; cursor:pointer; font-weight:bold; box-shadow:0 2px 4px rgba(0,0,0,0.15);">Đóng</button>
//             </div>
//         </div>
//     `;
// };



// // =====================================================================
// // HÀM 21.20: HIỂN THỊ POPUP CHI TIẾT NỘI DUNG (HOÀN CHỈNH)
// // =====================================================================
// window.ham_21_20_mo_popup_chi_tiet = function (id) {
//     if (!window.gvcn_DanhSachNoiDangHienTai) return;
//     let item = window.gvcn_DanhSachNoiDangHienTai.find(x => x.id === id);
//     if (!item) return;

//     let modal = document.getElementById('gvcn-modal-chitiet');
//     if (!modal) {
//         modal = document.createElement('div');
//         modal.id = 'gvcn-modal-chitiet';
//         modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); display:flex; align-items:center; justify-content:center; z-index:999999; backdrop-filter: blur(3px);';
//         document.body.appendChild(modal);
//     }

//     // 1. Dựng danh sách Học sinh
//     let htmlNguoiNhan = '';
//     if (item.nguoi_nhan && item.nguoi_nhan.length > 0) {
//         htmlNguoiNhan = item.nguoi_nhan.map(hs => {
//             let bgTrangThai = '#6c757d';
//             if (hs.trang_thai === 'Đã xong') bgTrangThai = '#28a745';
//             else if (hs.trang_thai === 'Chưa làm') bgTrangThai = '#dc3545';
//             else if (hs.trang_thai === 'Chưa xong') bgTrangThai = '#ffc107';
//             else if (hs.trang_thai === 'Đang làm') bgTrangThai = '#17a2b8';

//             let nhanTT = hs.trang_thai ? `<span style="background:${bgTrangThai}; color:${hs.trang_thai === 'Chưa xong' ? '#000' : '#fff'}; padding:3px 10px; border-radius:12px; font-size:11px; font-weight:bold; margin-left:10px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">${hs.trang_thai}</span>` : '';
//             let hsObj = window.DanhSachHocSinhLopHienTai ? window.DanhSachHocSinhLopHienTai.find(h => h.uid === hs.uid) : null;
//             let avatar = hsObj ? hsObj.avatarUrl : `https://ui-avatars.com/api/?name=${encodeURIComponent(hs.ten)}&background=random&color=fff`;

//             let hinhAnhCanhan = '';
//             if (hs.anh_minh_chung) {
//                 let fileIdHS = null;
//                 if (hs.anh_minh_chung.includes('/d/')) { let m = hs.anh_minh_chung.match(/\/d\/([a-zA-Z0-9_-]+)/); if (m) fileIdHS = m[1]; }
//                 else if (hs.anh_minh_chung.includes('id=')) { let m = hs.anh_minh_chung.match(/id=([a-zA-Z0-9_-]+)/); if (m) fileIdHS = m[1]; }
//                 let srcTN = fileIdHS ? `https://drive.google.com/thumbnail?id=${fileIdHS}&sz=w400` : hs.anh_minh_chung;

//                 hinhAnhCanhan = `
//                 <div style="margin-top:10px; border-top: 1px dashed #ccc; padding-top: 8px;">
//                     <b style="font-size:12px; color:#555;">📸 Ảnh minh chứng cá nhân:</b><br>
//                     <a href="${hs.anh_minh_chung}" target="_blank" title="Bấm để mở to">
//                         <img src="${srcTN}" onerror="this.onerror=null; this.src='${hs.anh_minh_chung}';" style="max-height:90px; border-radius:6px; border:1px solid #ced4da; margin-top:5px; box-shadow:0 1px 3px rgba(0,0,0,0.1); cursor:pointer;">
//                     </a>
//                 </div>`;
//             }

//             return `
//             <div style="background:#f8f9fa; padding:12px; border-radius:8px; margin-bottom:10px; border:1px solid #dee2e6; display:flex; gap:12px; align-items:flex-start; box-shadow: 0 1px 3px rgba(0,0,0,0.02);">
//                 <img src="${avatar}" style="width:40px; height:40px; border-radius:50%; border:2px solid #ccc; object-fit:cover; margin-top:2px;">
//                 <div style="flex:1;">
//                     <div style="margin-bottom:6px; font-size: 14px;"><b>👤 ${hs.ten}</b> <span style="color:#666; font-size:12px;">(${hs.ten_dang_nhap || 'Chưa có thông tin'})</span></div>
//                     <div style="line-height:1.6; font-size: 13px;">
//                         🛠️ Phần việc: <b style="color:#0056b3;">${hs.phan_viec || 'Chưa rõ nhiệm vụ'}</b><br>
//                         ⭐ Đánh giá: <span style="color:#e83e8c; font-weight:bold;">${hs.danh_gia || 'Chưa đánh giá'}</span> ${nhanTT}
//                         ${hs.ghi_chu ? `<br>📝 Ghi chú: <i style="color:#555;">${hs.ghi_chu}</i>` : ''}
//                         ${hinhAnhCanhan}
//                     </div>
//                 </div>
//             </div>
//             `;
//         }).join('');
//     } else {
//         htmlNguoiNhan = '<i style="color:#6c757d; display:block; padding: 10px 0;">Không phân công học sinh cụ thể (Giao chung toàn lớp).</i>';
//     }

//     // 2. Dựng danh sách Ảnh chung
//     let htmlAnhChung = (item.anh_dinh_kem || []).map(linkAnh => {
//         let fileId = null;
//         if (linkAnh.includes('/d/')) { let m = linkAnh.match(/\/d\/([a-zA-Z0-9_-]+)/); if (m) fileId = m[1]; }
//         else if (linkAnh.includes('id=')) { let m = linkAnh.match(/id=([a-zA-Z0-9_-]+)/); if (m) fileId = m[1]; }
//         let srcTN = fileId ? `https://drive.google.com/thumbnail?id=${fileId}&sz=w800` : linkAnh;

//         return `
//         <a href="${linkAnh}" target="_blank" title="Bấm để mở to">
//             <img src="${srcTN}" onerror="this.onerror=null; this.src='${linkAnh}';" style="max-height:130px; border-radius:8px; border:1px solid #ced4da; object-fit:contain; box-shadow: 0 2px 5px rgba(0,0,0,0.1); cursor:pointer; transition:0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
//         </a>`;
//     }).join('') || '<i style="color:#6c757d; font-size:13px;">Không có ảnh chung đính kèm.</i>';

//     let strNgay = item.ngay_nhap ? item.ngay_nhap.replace('T', ' ') : '';

//     modal.innerHTML = `
//         <div style="background:#fff; width:650px; max-width:92%; padding:25px; border-radius:12px; box-shadow:0 10px 30px rgba(0,0,0,0.5); max-height:88vh; overflow-y:auto; position:relative; animation: fadeIn 0.2s;">
//             <button onclick="document.getElementById('gvcn-modal-chitiet').remove()" style="position:absolute; top:15px; right:15px; background:none; border:none; font-size:22px; font-weight:bold; cursor:pointer; color:#adb5bd; transition:0.2s;" onmouseover="this.style.color='#dc3545'" onmouseout="this.style.color='#adb5bd'">✖</button>
//             <h3 style="margin-top:0; color:#0056b3; border-bottom:2px solid #cce5ff; padding-bottom:12px; font-size: 18px; text-transform: uppercase;">📋 Thông tin Nhiệm vụ</h3>
            
//             <p style="font-size:13px; margin-bottom:8px; color:#6c757d;"><b>📅 Cập nhật lúc:</b> ${strNgay}</p>
//             <p style="margin-bottom:10px;"><b>📌 Tên nội dung:</b> <span style="color:#0056b3; font-weight:bold; font-size:16px;">${item.ten_noi_dung}</span></p>
            
//             <div style="margin-bottom: 15px;">
//                 <b style="font-size:14px; color:#495057;">📝 Mô tả chi tiết:</b>
//                 <div style="background:#fdfdfe; padding:12px; border:1px solid #e9ecef; border-radius:8px; white-space:pre-wrap; font-size:13px; line-height:1.5; margin-top:5px; color:#333;">${item.chi_tiet || '<i style="color:#adb5bd;">Không có mô tả chi tiết...</i>'}</div>
//             </div>

//             <div style="margin-bottom: 15px;">
//                 <b style="font-size:14px; color:#495057;">📸 Ảnh chung của nhiệm vụ:</b>
//                 <div style="display:flex; gap:12px; flex-wrap:wrap; margin-top:5px; padding:10px; background:#f8f9fa; border-radius:8px; border: 1px dashed #dee2e6;">${htmlAnhChung}</div>
//             </div>

//             <div>
//                 <b style="font-size:14px; color:#e83e8c;">👤 Tiến độ & Đánh giá cá nhân:</b>
//                 <div style="margin-top:5px;">${htmlNguoiNhan}</div>
//             </div>

//             <div style="text-align:right; margin-top:25px; border-top:1px solid #eee; padding-top:15px;">
//                 <button onclick="document.getElementById('gvcn-modal-chitiet').remove()" style="padding:10px 30px; background:#6c757d; color:white; border:none; border-radius:6px; cursor:pointer; font-weight:bold; box-shadow:0 2px 4px rgba(0,0,0,0.15); transition:0.2s;" onmouseover="this.style.background='#5a6268'">Đóng</button>
//             </div>
//         </div>
//     `;
// };


// // =====================================================================
// // HÀM 21.20: HIỂN THỊ POPUP CHI TIẾT NỘI DUNG (TÁCH RÕ TIẾN ĐỘ, ĐÁNH GIÁ, GHI CHÚ)
// // =====================================================================
// window.ham_21_20_mo_popup_chi_tiet = function (id) {
//     if (!window.gvcn_DanhSachNoiDangHienTai) return;
//     let item = window.gvcn_DanhSachNoiDangHienTai.find(x => x.id === id);
//     if (!item) return;

//     let modal = document.getElementById('gvcn-modal-chitiet');
//     if (!modal) {
//         modal = document.createElement('div');
//         modal.id = 'gvcn-modal-chitiet';
//         modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); display:flex; align-items:center; justify-content:center; z-index:999999; backdrop-filter: blur(3px);';
//         document.body.appendChild(modal);
//     }

//     // 1. Dựng danh sách Học sinh
//     let htmlNguoiNhan = '';
//     if (item.nguoi_nhan && item.nguoi_nhan.length > 0) {
//         htmlNguoiNhan = item.nguoi_nhan.map(hs => {
//             // Cài đặt màu sắc cho Tiến độ
//             let bgTrangThai = '#6c757d';
//             if (hs.trang_thai === 'Đã xong') bgTrangThai = '#28a745';
//             else if (hs.trang_thai === 'Chưa làm') bgTrangThai = '#dc3545';
//             else if (hs.trang_thai === 'Chưa xong') bgTrangThai = '#ffc107';
//             else if (hs.trang_thai === 'Đang làm') bgTrangThai = '#17a2b8';

//             let nhanTT = hs.trang_thai ? `<span style="background:${bgTrangThai}; color:${hs.trang_thai === 'Chưa xong' ? '#000' : '#fff'}; padding:3px 10px; border-radius:12px; font-size:11px; font-weight:bold; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">${hs.trang_thai}</span>` : '<i style="color:#999; font-size:12px;">Chưa cập nhật</i>';
//             let hsObj = window.DanhSachHocSinhLopHienTai ? window.DanhSachHocSinhLopHienTai.find(h => h.uid === hs.uid) : null;
//             let avatar = hsObj ? hsObj.avatarUrl : `https://ui-avatars.com/api/?name=${encodeURIComponent(hs.ten)}&background=random&color=fff`;

//             let hinhAnhCanhan = '';
//             if (hs.anh_minh_chung) {
//                 let fileIdHS = null;
//                 if (hs.anh_minh_chung.includes('/d/')) { let m = hs.anh_minh_chung.match(/\/d\/([a-zA-Z0-9_-]+)/); if (m) fileIdHS = m[1]; }
//                 else if (hs.anh_minh_chung.includes('id=')) { let m = hs.anh_minh_chung.match(/id=([a-zA-Z0-9_-]+)/); if (m) fileIdHS = m[1]; }
//                 let srcTN = fileIdHS ? `https://drive.google.com/thumbnail?id=${fileIdHS}&sz=w400` : hs.anh_minh_chung;

//                 hinhAnhCanhan = `
//                 <div style="margin-top:10px; border-top: 1px dashed #ccc; padding-top: 8px;">
//                     <b style="font-size:12px; color:#555;">📸 Ảnh phần việc:</b><br>
//                     <a href="${hs.anh_minh_chung}" target="_blank" title="Bấm để mở to">
//                         <img src="${srcTN}" onerror="this.onerror=null; this.src='${hs.anh_minh_chung}';" style="max-height:90px; border-radius:6px; border:1px solid #ced4da; margin-top:5px; box-shadow:0 1px 3px rgba(0,0,0,0.1); cursor:pointer;">
//                     </a>
//                 </div>`;
//             }

//             // 🌟 ĐÃ ĐIỀU CHỈNH: CẤU TRÚC LẠI CÁC THÔNG TIN TRÊN TỪNG DÒNG
//             return `
//             <div style="background:#f8f9fa; padding:15px; border-radius:8px; margin-bottom:10px; border:1px solid #dee2e6; display:flex; gap:12px; align-items:flex-start; box-shadow: 0 1px 3px rgba(0,0,0,0.02);">
//                 <img src="${avatar}" style="width:45px; height:45px; border-radius:50%; border:2px solid #ccc; object-fit:cover; margin-top:2px;">
//                 <div style="flex:1;">
//                     <div style="margin-bottom:8px; font-size: 14px; border-bottom: 1px dashed #e9ecef; padding-bottom: 5px;">
//                         <b>👤 ${hs.ten}</b> <span style="color:#666; font-size:12px;">(${hs.ten_dang_nhap || 'Chưa có thông tin'})</span>
//                     </div>
//                     <div style="line-height:1.7; font-size: 13px;">
//                         <div style="margin-bottom:3px;">🛠️ <b>Phần việc:</b> <span style="color:#0056b3; font-weight:bold;">${hs.phan_viec || 'Chưa rõ nhiệm vụ'}</span></div>
//                         <div style="margin-bottom:3px; display: flex; align-items: center; gap: 6px;">⏳ <b>Tiến độ:</b> ${nhanTT}</div>
//                         <div style="margin-bottom:3px;">⭐ <b>Đánh giá:</b> <span style="color:#e83e8c; font-weight:bold;">${hs.danh_gia || 'Chưa đánh giá'}</span></div>
//                         <div style="margin-bottom:3px;">📝 <b>Ghi chú, nhận xét:</b> <span style="color:#555;">${hs.ghi_chu ? `<i>${hs.ghi_chu}</i>` : '<i style="color:#adb5bd;">Không có</i>'}</span></div>
//                         ${hinhAnhCanhan}
//                     </div>
//                 </div>
//             </div>
//             `;
//         }).join('');
//     } else {
//         htmlNguoiNhan = '<i style="color:#6c757d; display:block; padding: 10px 0;">Không phân công học sinh cụ thể (Giao chung toàn lớp).</i>';
//     }

//     // 2. Dựng danh sách Ảnh chung
//     let htmlAnhChung = (item.anh_dinh_kem || []).map(linkAnh => {
//         let fileId = null;
//         if (linkAnh.includes('/d/')) { let m = linkAnh.match(/\/d\/([a-zA-Z0-9_-]+)/); if (m) fileId = m[1]; }
//         else if (linkAnh.includes('id=')) { let m = linkAnh.match(/id=([a-zA-Z0-9_-]+)/); if (m) fileId = m[1]; }
//         let srcTN = fileId ? `https://drive.google.com/thumbnail?id=${fileId}&sz=w800` : linkAnh;

//         return `
//         <a href="${linkAnh}" target="_blank" title="Bấm để mở to">
//             <img src="${srcTN}" onerror="this.onerror=null; this.src='${linkAnh}';" style="max-height:130px; border-radius:8px; border:1px solid #ced4da; object-fit:contain; box-shadow: 0 2px 5px rgba(0,0,0,0.1); cursor:pointer; transition:0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
//         </a>`;
//     }).join('') || '<i style="color:#6c757d; font-size:13px;">Không có ảnh chung đính kèm.</i>';

//     let strNgay = item.ngay_nhap ? item.ngay_nhap.replace('T', ' ') : '';

//     modal.innerHTML = `
//         <div style="background:#fff; width:650px; max-width:92%; padding:25px; border-radius:12px; box-shadow:0 10px 30px rgba(0,0,0,0.5); max-height:88vh; overflow-y:auto; position:relative; animation: fadeIn 0.2s;">
//             <button onclick="document.getElementById('gvcn-modal-chitiet').remove()" style="position:absolute; top:15px; right:15px; background:none; border:none; font-size:22px; font-weight:bold; cursor:pointer; color:#adb5bd; transition:0.2s;" onmouseover="this.style.color='#dc3545'" onmouseout="this.style.color='#adb5bd'">✖</button>
//             <h3 style="margin-top:0; color:#0056b3; border-bottom:2px solid #cce5ff; padding-bottom:12px; font-size: 18px; text-transform: uppercase;">📋 Thông tin Nhiệm vụ</h3>
            
//             <p style="font-size:13px; margin-bottom:8px; color:#6c757d;"><b>📅 Cập nhật lúc:</b> ${strNgay}</p>
//             <p style="margin-bottom:10px;"><b>📌 Tên nội dung:</b> <span style="color:#0056b3; font-weight:bold; font-size:16px;">${item.ten_noi_dung}</span></p>
            
//             <div style="margin-bottom: 15px;">
//                 <b style="font-size:14px; color:#495057;">📝 Mô tả chi tiết:</b>
//                 <div style="background:#fdfdfe; padding:12px; border:1px solid #e9ecef; border-radius:8px; white-space:pre-wrap; font-size:13px; line-height:1.5; margin-top:5px; color:#333;">${item.chi_tiet || '<i style="color:#adb5bd;">Không có mô tả chi tiết...</i>'}</div>
//             </div>

//             <div style="margin-bottom: 15px;">
//                 <b style="font-size:14px; color:#495057;">📸 Ảnh chung của nhiệm vụ:</b>
//                 <div style="display:flex; gap:12px; flex-wrap:wrap; margin-top:5px; padding:10px; background:#f8f9fa; border-radius:8px; border: 1px dashed #dee2e6;">${htmlAnhChung}</div>
//             </div>

//             <div>
//                 <b style="font-size:14px; color:#e83e8c;">👤 Tiến độ & Đánh giá cá nhân:</b>
//                 <div style="margin-top:5px;">${htmlNguoiNhan}</div>
//             </div>

//             <div style="text-align:right; margin-top:25px; border-top:1px solid #eee; padding-top:15px;">
//                 <button onclick="document.getElementById('gvcn-modal-chitiet').remove()" style="padding:10px 30px; background:#6c757d; color:white; border:none; border-radius:6px; cursor:pointer; font-weight:bold; box-shadow:0 2px 4px rgba(0,0,0,0.15); transition:0.2s;" onmouseover="this.style.background='#5a6268'">Đóng</button>
//             </div>
//         </div>
//     `;
// };


// // =====================================================================
// // HÀM 21.20: HIỂN THỊ POPUP CHI TIẾT NỘI DUNG (ĐỔ MÀU "CHƯA ĐÁNH GIÁ")
// // =====================================================================
// window.ham_21_20_mo_popup_chi_tiet = function (id) {
//     if (!window.gvcn_DanhSachNoiDangHienTai) return;
//     let item = window.gvcn_DanhSachNoiDangHienTai.find(x => x.id === id);
//     if (!item) return;

//     let modal = document.getElementById('gvcn-modal-chitiet');
//     if (!modal) {
//         modal = document.createElement('div');
//         modal.id = 'gvcn-modal-chitiet';
//         modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); display:flex; align-items:center; justify-content:center; z-index:999999; backdrop-filter: blur(3px);';
//         document.body.appendChild(modal);
//     }

//     let htmlNguoiNhan = '';
//     if (item.nguoi_nhan && item.nguoi_nhan.length > 0) {
//         htmlNguoiNhan = item.nguoi_nhan.map(hs => {
//             let bgTrangThai = '#6c757d';
//             if (hs.trang_thai === 'Đã xong') bgTrangThai = '#28a745';
//             else if (hs.trang_thai === 'Chưa làm') bgTrangThai = '#dc3545';
//             else if (hs.trang_thai === 'Chưa xong') bgTrangThai = '#ffc107';
//             else if (hs.trang_thai === 'Đang làm') bgTrangThai = '#17a2b8';

//             let nhanTT = hs.trang_thai ? `<span style="background:${bgTrangThai}; color:${hs.trang_thai === 'Chưa xong' ? '#000' : '#fff'}; padding:3px 10px; border-radius:12px; font-size:11px; font-weight:bold; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">${hs.trang_thai}</span>` : '<i style="color:#999; font-size:12px;">Chưa cập nhật</i>';
//             let hsObj = window.DanhSachHocSinhLopHienTai ? window.DanhSachHocSinhLopHienTai.find(h => h.uid === hs.uid) : null;
//             let avatar = hsObj ? hsObj.avatarUrl : `https://ui-avatars.com/api/?name=${encodeURIComponent(hs.ten)}&background=random&color=fff`;

//             // 🌟 Xử lý nhãn Đánh giá trong Popup
//             let nhanDanhGiaPopup = '';
//             if (hs.danh_gia && hs.danh_gia.trim() !== '') {
//                 nhanDanhGiaPopup = `<span style="color:#e83e8c; font-weight:bold; font-size:13px;">${hs.danh_gia}</span>`;
//             } else {
//                 nhanDanhGiaPopup = `<span style="background:#dc3545; color:#fff; padding:3px 10px; border-radius:12px; font-size:11px; font-weight:bold; box-shadow: 0 1px 3px rgba(0,0,0,0.1); display:inline-block;">Chưa đánh giá</span>`;
//             }

//             let hinhAnhCanhan = '';
//             if (hs.anh_minh_chung) {
//                 let fileIdHS = null;
//                 if (hs.anh_minh_chung.includes('/d/')) { let m = hs.anh_minh_chung.match(/\/d\/([a-zA-Z0-9_-]+)/); if (m) fileIdHS = m[1]; }
//                 else if (hs.anh_minh_chung.includes('id=')) { let m = hs.anh_minh_chung.match(/id=([a-zA-Z0-9_-]+)/); if (m) fileIdHS = m[1]; }
//                 let srcTN = fileIdHS ? `https://drive.google.com/thumbnail?id=${fileIdHS}&sz=w400` : hs.anh_minh_chung;

//                 hinhAnhCanhan = `
//                 <div style="margin-top:10px; border-top: 1px dashed #ccc; padding-top: 8px;">
//                     <b style="font-size:12px; color:#555;">📸 Ảnh phần việc:</b><br>
//                     <a href="${hs.anh_minh_chung}" target="_blank" title="Bấm để mở to">
//                         <img src="${srcTN}" onerror="this.onerror=null; this.src='${hs.anh_minh_chung}';" style="max-height:90px; border-radius:6px; border:1px solid #ced4da; margin-top:5px; box-shadow:0 1px 3px rgba(0,0,0,0.1); cursor:pointer;">
//                     </a>
//                 </div>`;
//             }

//             return `
//             <div style="background:#f8f9fa; padding:15px; border-radius:8px; margin-bottom:10px; border:1px solid #dee2e6; display:flex; gap:12px; align-items:flex-start; box-shadow: 0 1px 3px rgba(0,0,0,0.02);">
//                 <img src="${avatar}" style="width:45px; height:45px; border-radius:50%; border:2px solid #ccc; object-fit:cover; margin-top:2px;">
//                 <div style="flex:1;">
//                     <div style="margin-bottom:8px; font-size: 14px; border-bottom: 1px dashed #e9ecef; padding-bottom: 5px;">
//                         <b>👤 ${hs.ten}</b> <span style="color:#666; font-size:12px;">(${hs.ten_dang_nhap || 'Chưa có thông tin'})</span>
//                     </div>
//                     <div style="line-height:1.7; font-size: 13px;">
//                         <div style="margin-bottom:3px;">🛠️ <b>Phần việc:</b> <span style="color:#0056b3; font-weight:bold;">${hs.phan_viec || 'Chưa rõ nhiệm vụ'}</span></div>
//                         <div style="margin-bottom:3px; display: flex; align-items: center; gap: 6px;">⏳ <b>Tiến độ:</b> ${nhanTT}</div>
//                         <div style="margin-bottom:3px; display: flex; align-items: center; gap: 6px;">⭐ <b>Đánh giá:</b> ${nhanDanhGiaPopup}</div>
//                         <div style="margin-bottom:3px;">📝 <b>Ghi chú, nhận xét:</b> <span style="color:#555;">${hs.ghi_chu ? `<i>${hs.ghi_chu}</i>` : '<i style="color:#adb5bd;">Không có</i>'}</span></div>
//                         ${hinhAnhCanhan}
//                     </div>
//                 </div>
//             </div>
//             `;
//         }).join('');
//     } else {
//         htmlNguoiNhan = '<i style="color:#6c757d; display:block; padding: 10px 0;">Không phân công học sinh cụ thể (Giao chung toàn lớp).</i>';
//     }

//     let htmlAnhChung = (item.anh_dinh_kem || []).map(linkAnh => {
//         let fileId = null;
//         if (linkAnh.includes('/d/')) { let m = linkAnh.match(/\/d\/([a-zA-Z0-9_-]+)/); if (m) fileId = m[1]; }
//         else if (linkAnh.includes('id=')) { let m = linkAnh.match(/id=([a-zA-Z0-9_-]+)/); if (m) fileId = m[1]; }
//         let srcTN = fileId ? `https://drive.google.com/thumbnail?id=${fileId}&sz=w800` : linkAnh;

//         return `
//         <a href="${linkAnh}" target="_blank" title="Bấm để mở to">
//             <img src="${srcTN}" onerror="this.onerror=null; this.src='${linkAnh}';" style="max-height:130px; border-radius:8px; border:1px solid #ced4da; object-fit:contain; box-shadow: 0 2px 5px rgba(0,0,0,0.1); cursor:pointer; transition:0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
//         </a>`;
//     }).join('') || '<i style="color:#6c757d; font-size:13px;">Không có ảnh chung đính kèm.</i>';

//     let strNgay = item.ngay_nhap ? item.ngay_nhap.replace('T', ' ') : '';

//     modal.innerHTML = `
//         <div style="background:#fff; width:650px; max-width:92%; padding:25px; border-radius:12px; box-shadow:0 10px 30px rgba(0,0,0,0.5); max-height:88vh; overflow-y:auto; position:relative; animation: fadeIn 0.2s;">
//             <button onclick="document.getElementById('gvcn-modal-chitiet').remove()" style="position:absolute; top:15px; right:15px; background:none; border:none; font-size:22px; font-weight:bold; cursor:pointer; color:#adb5bd; transition:0.2s;" onmouseover="this.style.color='#dc3545'" onmouseout="this.style.color='#adb5bd'">✖</button>
//             <h3 style="margin-top:0; color:#0056b3; border-bottom:2px solid #cce5ff; padding-bottom:12px; font-size: 18px; text-transform: uppercase;">📋 Thông tin Nhiệm vụ</h3>
            
//             <p style="font-size:13px; margin-bottom:8px; color:#6c757d;"><b>📅 Cập nhật lúc:</b> ${strNgay}</p>
//             <p style="margin-bottom:10px;"><b>📌 Tên nội dung:</b> <span style="color:#0056b3; font-weight:bold; font-size:16px;">${item.ten_noi_dung}</span></p>
            
//             <div style="margin-bottom: 15px;">
//                 <b style="font-size:14px; color:#495057;">📝 Mô tả chi tiết:</b>
//                 <div style="background:#fdfdfe; padding:12px; border:1px solid #e9ecef; border-radius:8px; white-space:pre-wrap; font-size:13px; line-height:1.5; margin-top:5px; color:#333;">${item.chi_tiet || '<i style="color:#adb5bd;">Không có mô tả chi tiết...</i>'}</div>
//             </div>

//             <div style="margin-bottom: 15px;">
//                 <b style="font-size:14px; color:#495057;">📸 Ảnh chung của nhiệm vụ:</b>
//                 <div style="display:flex; gap:12px; flex-wrap:wrap; margin-top:5px; padding:10px; background:#f8f9fa; border-radius:8px; border: 1px dashed #dee2e6;">${htmlAnhChung}</div>
//             </div>

//             <div>
//                 <b style="font-size:14px; color:#e83e8c;">👤 Tiến độ & Đánh giá cá nhân:</b>
//                 <div style="margin-top:5px;">${htmlNguoiNhan}</div>
//             </div>

//             <div style="text-align:right; margin-top:25px; border-top:1px solid #eee; padding-top:15px;">
//                 <button onclick="document.getElementById('gvcn-modal-chitiet').remove()" style="padding:10px 30px; background:#6c757d; color:white; border:none; border-radius:6px; cursor:pointer; font-weight:bold; box-shadow:0 2px 4px rgba(0,0,0,0.15); transition:0.2s;" onmouseover="this.style.background='#5a6268'">Đóng</button>
//             </div>
//         </div>
//     `;
// };



// // =====================================================================
// // HÀM 21.20: HIỂN THỊ POPUP CHI TIẾT NỘI DUNG (ĐỒNG BỘ NHÃN ĐÁNH GIÁ)
// // =====================================================================
// window.ham_21_20_mo_popup_chi_tiet = function (id) {
//     if (!window.gvcn_DanhSachNoiDangHienTai) return;
//     let item = window.gvcn_DanhSachNoiDangHienTai.find(x => x.id === id);
//     if (!item) return;

//     let modal = document.getElementById('gvcn-modal-chitiet');
//     if (!modal) {
//         modal = document.createElement('div');
//         modal.id = 'gvcn-modal-chitiet';
//         modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); display:flex; align-items:center; justify-content:center; z-index:999999; backdrop-filter: blur(3px);';
//         document.body.appendChild(modal);
//     }

//     let htmlNguoiNhan = '';
//     if (item.nguoi_nhan && item.nguoi_nhan.length > 0) {
//         htmlNguoiNhan = item.nguoi_nhan.map(hs => {
//             let bgTrangThai = '#6c757d';
//             if (hs.trang_thai === 'Đã xong') bgTrangThai = '#28a745';
//             else if (hs.trang_thai === 'Chưa làm') bgTrangThai = '#dc3545';
//             else if (hs.trang_thai === 'Chưa xong') bgTrangThai = '#ffc107';
//             else if (hs.trang_thai === 'Đang làm') bgTrangThai = '#17a2b8';

//             let nhanTT = hs.trang_thai ? `<span style="background:${bgTrangThai}; color:${hs.trang_thai === 'Chưa xong' ? '#000' : '#fff'}; padding:3px 10px; border-radius:12px; font-size:11px; font-weight:bold; box-shadow: 0 1px 3px rgba(0,0,0,0.1); display:inline-block;">${hs.trang_thai}</span>` : '<i style="color:#999; font-size:12px;">Chưa cập nhật</i>';
//             let hsObj = window.DanhSachHocSinhLopHienTai ? window.DanhSachHocSinhLopHienTai.find(h => h.uid === hs.uid) : null;
//             let avatar = hsObj ? hsObj.avatarUrl : `https://ui-avatars.com/api/?name=${encodeURIComponent(hs.ten)}&background=random&color=fff`;

//             // 🌟 Xử lý nhãn Đánh giá trong Popup
//             let nhanDanhGiaPopup = '';
//             if (hs.danh_gia && hs.danh_gia.trim() !== '') {
//                 let bgDG = '#6c757d';
//                 if (hs.danh_gia === 'Tốt') bgDG = '#28a745';
//                 else if (hs.danh_gia === 'Khá') bgDG = '#17a2b8';
//                 else if (hs.danh_gia === 'Trung Bình' || hs.danh_gia === 'TB') bgDG = '#fd7e14';
//                 else if (hs.danh_gia === 'Chưa đạt') bgDG = '#dc3545';

//                 nhanDanhGiaPopup = `<span style="background:${bgDG}; color:#fff; padding:3px 10px; border-radius:12px; font-size:11px; font-weight:bold; box-shadow: 0 1px 3px rgba(0,0,0,0.1); display:inline-block;">${hs.danh_gia}</span>`;
//             } else {
//                 nhanDanhGiaPopup = `<span style="background:#dc3545; color:#fff; padding:3px 10px; border-radius:12px; font-size:11px; font-weight:bold; box-shadow: 0 1px 3px rgba(0,0,0,0.1); display:inline-block;">Chưa đánh giá</span>`;
//             }

//             let hinhAnhCanhan = '';
//             if (hs.anh_minh_chung) {
//                 let fileIdHS = null;
//                 if (hs.anh_minh_chung.includes('/d/')) { let m = hs.anh_minh_chung.match(/\/d\/([a-zA-Z0-9_-]+)/); if (m) fileIdHS = m[1]; }
//                 else if (hs.anh_minh_chung.includes('id=')) { let m = hs.anh_minh_chung.match(/id=([a-zA-Z0-9_-]+)/); if (m) fileIdHS = m[1]; }
//                 let srcTN = fileIdHS ? `https://drive.google.com/thumbnail?id=${fileIdHS}&sz=w400` : hs.anh_minh_chung;

//                 hinhAnhCanhan = `
//                 <div style="margin-top:10px; border-top: 1px dashed #ccc; padding-top: 8px;">
//                     <b style="font-size:12px; color:#555;">📸 Ảnh phần việc:</b><br>
//                     <a href="${hs.anh_minh_chung}" target="_blank" title="Bấm để mở to">
//                         <img src="${srcTN}" onerror="this.onerror=null; this.src='${hs.anh_minh_chung}';" style="max-height:90px; border-radius:6px; border:1px solid #ced4da; margin-top:5px; box-shadow:0 1px 3px rgba(0,0,0,0.1); cursor:pointer;">
//                     </a>
//                 </div>`;
//             }

//             return `
//             <div style="background:#f8f9fa; padding:15px; border-radius:8px; margin-bottom:10px; border:1px solid #dee2e6; display:flex; gap:12px; align-items:flex-start; box-shadow: 0 1px 3px rgba(0,0,0,0.02);">
//                 <img src="${avatar}" style="width:45px; height:45px; border-radius:50%; border:2px solid #ccc; object-fit:cover; margin-top:2px;">
//                 <div style="flex:1;">
//                     <div style="margin-bottom:8px; font-size: 14px; border-bottom: 1px dashed #e9ecef; padding-bottom: 5px;">
//                         <b>👤 ${hs.ten}</b> <span style="color:#666; font-size:12px;">(${hs.ten_dang_nhap || 'Chưa có thông tin'})</span>
//                     </div>
//                     <div style="line-height:1.7; font-size: 13px;">
//                         <div style="margin-bottom:3px;">🛠️ <b>Phần việc:</b> <span style="color:#0056b3; font-weight:bold;">${hs.phan_viec || 'Chưa rõ nhiệm vụ'}</span></div>
//                         <div style="margin-bottom:3px; display: flex; align-items: center; gap: 6px;">⏳ <b>Tiến độ:</b> ${nhanTT}</div>
//                         <div style="margin-bottom:3px; display: flex; align-items: center; gap: 6px;">⭐ <b>Đánh giá:</b> ${nhanDanhGiaPopup}</div>
//                         <div style="margin-bottom:3px;">📝 <b>Ghi chú, nhận xét:</b> <span style="color:#555;">${hs.ghi_chu ? `<i>${hs.ghi_chu}</i>` : '<i style="color:#adb5bd;">Không có</i>'}</span></div>
//                         ${hinhAnhCanhan}
//                     </div>
//                 </div>
//             </div>
//             `;
//         }).join('');
//     } else {
//         htmlNguoiNhan = '<i style="color:#6c757d; display:block; padding: 10px 0;">Không phân công học sinh cụ thể (Giao chung toàn lớp).</i>';
//     }

//     let htmlAnhChung = (item.anh_dinh_kem || []).map(linkAnh => {
//         let fileId = null;
//         if (linkAnh.includes('/d/')) { let m = linkAnh.match(/\/d\/([a-zA-Z0-9_-]+)/); if (m) fileId = m[1]; }
//         else if (linkAnh.includes('id=')) { let m = linkAnh.match(/id=([a-zA-Z0-9_-]+)/); if (m) fileId = m[1]; }
//         let srcTN = fileId ? `https://drive.google.com/thumbnail?id=${fileId}&sz=w800` : linkAnh;

//         return `
//         <a href="${linkAnh}" target="_blank" title="Bấm để mở to">
//             <img src="${srcTN}" onerror="this.onerror=null; this.src='${linkAnh}';" style="max-height:130px; border-radius:8px; border:1px solid #ced4da; object-fit:contain; box-shadow: 0 2px 5px rgba(0,0,0,0.1); cursor:pointer; transition:0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
//         </a>`;
//     }).join('') || '<i style="color:#6c757d; font-size:13px;">Không có ảnh chung đính kèm.</i>';

//     let strNgay = item.ngay_nhap ? item.ngay_nhap.replace('T', ' ') : '';

//     modal.innerHTML = `
//         <div style="background:#fff; width:650px; max-width:92%; padding:25px; border-radius:12px; box-shadow:0 10px 30px rgba(0,0,0,0.5); max-height:88vh; overflow-y:auto; position:relative; animation: fadeIn 0.2s;">
//             <button onclick="document.getElementById('gvcn-modal-chitiet').remove()" style="position:absolute; top:15px; right:15px; background:none; border:none; font-size:22px; font-weight:bold; cursor:pointer; color:#adb5bd; transition:0.2s;" onmouseover="this.style.color='#dc3545'" onmouseout="this.style.color='#adb5bd'">✖</button>
//             <h3 style="margin-top:0; color:#0056b3; border-bottom:2px solid #cce5ff; padding-bottom:12px; font-size: 18px; text-transform: uppercase;">📋 Thông tin Nhiệm vụ</h3>
            
//             <p style="font-size:13px; margin-bottom:8px; color:#6c757d;"><b>📅 Cập nhật lúc:</b> ${strNgay}</p>
//             <p style="margin-bottom:10px;"><b>📌 Tên nội dung:</b> <span style="color:#0056b3; font-weight:bold; font-size:16px;">${item.ten_noi_dung}</span></p>
            
//             <div style="margin-bottom: 15px;">
//                 <b style="font-size:14px; color:#495057;">📝 Mô tả chi tiết:</b>
//                 <div style="background:#fdfdfe; padding:12px; border:1px solid #e9ecef; border-radius:8px; white-space:pre-wrap; font-size:13px; line-height:1.5; margin-top:5px; color:#333;">${item.chi_tiet || '<i style="color:#adb5bd;">Không có mô tả chi tiết...</i>'}</div>
//             </div>

//             <div style="margin-bottom: 15px;">
//                 <b style="font-size:14px; color:#495057;">📸 Ảnh chung của nhiệm vụ:</b>
//                 <div style="display:flex; gap:12px; flex-wrap:wrap; margin-top:5px; padding:10px; background:#f8f9fa; border-radius:8px; border: 1px dashed #dee2e6;">${htmlAnhChung}</div>
//             </div>

//             <div>
//                 <b style="font-size:14px; color:#e83e8c;">👤 Tiến độ & Đánh giá cá nhân:</b>
//                 <div style="margin-top:5px;">${htmlNguoiNhan}</div>
//             </div>

//             <div style="text-align:right; margin-top:25px; border-top:1px solid #eee; padding-top:15px;">
//                 <button onclick="document.getElementById('gvcn-modal-chitiet').remove()" style="padding:10px 30px; background:#6c757d; color:white; border:none; border-radius:6px; cursor:pointer; font-weight:bold; box-shadow:0 2px 4px rgba(0,0,0,0.15); transition:0.2s;" onmouseover="this.style.background='#5a6268'">Đóng</button>
//             </div>
//         </div>
//     `;
// };


// // =====================================================================
// // HÀM 21.20: HIỂN THỊ POPUP CHI TIẾT NỘI DUNG (CÓ NÚT CHUYỂN SANG SỬA)
// // =====================================================================
// window.ham_21_20_mo_popup_chi_tiet = function (id) {
//     if (!window.gvcn_DanhSachNoiDangHienTai) return;
//     let item = window.gvcn_DanhSachNoiDangHienTai.find(x => x.id === id);
//     if (!item) return;

//     let modal = document.getElementById('gvcn-modal-chitiet');
//     if (!modal) {
//         modal = document.createElement('div');
//         modal.id = 'gvcn-modal-chitiet';
//         modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); display:flex; align-items:center; justify-content:center; z-index:999999; backdrop-filter: blur(3px);';
//         document.body.appendChild(modal);
//     }

//     let htmlNguoiNhan = '';
//     if (item.nguoi_nhan && item.nguoi_nhan.length > 0) {
//         htmlNguoiNhan = item.nguoi_nhan.map(hs => {
//             let bgTrangThai = '#6c757d';
//             if (hs.trang_thai === 'Đã xong') bgTrangThai = '#28a745';
//             else if (hs.trang_thai === 'Chưa làm') bgTrangThai = '#dc3545';
//             else if (hs.trang_thai === 'Chưa xong') bgTrangThai = '#ffc107';
//             else if (hs.trang_thai === 'Đang làm') bgTrangThai = '#17a2b8';

//             let nhanTT = hs.trang_thai ? `<span style="background:${bgTrangThai}; color:${hs.trang_thai === 'Chưa xong' ? '#000' : '#fff'}; padding:3px 10px; border-radius:12px; font-size:11px; font-weight:bold; box-shadow: 0 1px 3px rgba(0,0,0,0.1); display:inline-block;">${hs.trang_thai}</span>` : '<i style="color:#999; font-size:12px;">Chưa cập nhật</i>';
//             let hsObj = window.DanhSachHocSinhLopHienTai ? window.DanhSachHocSinhLopHienTai.find(h => h.uid === hs.uid) : null;
//             let avatar = hsObj ? hsObj.avatarUrl : `https://ui-avatars.com/api/?name=${encodeURIComponent(hs.ten)}&background=random&color=fff`;

//             // Xử lý nhãn Đánh giá trong Popup
//             let nhanDanhGiaPopup = '';
//             if (hs.danh_gia && hs.danh_gia.trim() !== '') {
//                 let bgDG = '#6c757d';
//                 if (hs.danh_gia === 'Tốt') bgDG = '#28a745';
//                 else if (hs.danh_gia === 'Khá') bgDG = '#17a2b8';
//                 else if (hs.danh_gia === 'Trung Bình' || hs.danh_gia === 'TB') bgDG = '#fd7e14';
//                 else if (hs.danh_gia === 'Chưa đạt') bgDG = '#dc3545';

//                 nhanDanhGiaPopup = `<span style="background:${bgDG}; color:#fff; padding:3px 10px; border-radius:12px; font-size:11px; font-weight:bold; box-shadow: 0 1px 3px rgba(0,0,0,0.1); display:inline-block;">${hs.danh_gia}</span>`;
//             } else {
//                 nhanDanhGiaPopup = `<span style="background:#dc3545; color:#fff; padding:3px 10px; border-radius:12px; font-size:11px; font-weight:bold; box-shadow: 0 1px 3px rgba(0,0,0,0.1); display:inline-block;">Chưa đánh giá</span>`;
//             }

//             let hinhAnhCanhan = '';
//             if (hs.anh_minh_chung) {
//                 let fileIdHS = null;
//                 if (hs.anh_minh_chung.includes('/d/')) { let m = hs.anh_minh_chung.match(/\/d\/([a-zA-Z0-9_-]+)/); if (m) fileIdHS = m[1]; }
//                 else if (hs.anh_minh_chung.includes('id=')) { let m = hs.anh_minh_chung.match(/id=([a-zA-Z0-9_-]+)/); if (m) fileIdHS = m[1]; }
//                 let srcTN = fileIdHS ? `https://drive.google.com/thumbnail?id=${fileIdHS}&sz=w400` : hs.anh_minh_chung;

//                 hinhAnhCanhan = `
//                 <div style="margin-top:10px; border-top: 1px dashed #ccc; padding-top: 8px;">
//                     <b style="font-size:12px; color:#555;">📸 Ảnh phần việc:</b><br>
//                     <a href="${hs.anh_minh_chung}" target="_blank" title="Bấm để mở to">
//                         <img src="${srcTN}" onerror="this.onerror=null; this.src='${hs.anh_minh_chung}';" style="max-height:90px; border-radius:6px; border:1px solid #ced4da; margin-top:5px; box-shadow:0 1px 3px rgba(0,0,0,0.1); cursor:pointer;">
//                     </a>
//                 </div>`;
//             }

//             return `
//             <div style="background:#f8f9fa; padding:15px; border-radius:8px; margin-bottom:10px; border:1px solid #dee2e6; display:flex; gap:12px; align-items:flex-start; box-shadow: 0 1px 3px rgba(0,0,0,0.02);">
//                 <img src="${avatar}" style="width:45px; height:45px; border-radius:50%; border:2px solid #ccc; object-fit:cover; margin-top:2px;">
//                 <div style="flex:1;">
//                     <div style="margin-bottom:8px; font-size: 14px; border-bottom: 1px dashed #e9ecef; padding-bottom: 5px;">
//                         <b>👤 ${hs.ten}</b> <span style="color:#666; font-size:12px;">(${hs.ten_dang_nhap || 'Chưa có thông tin'})</span>
//                     </div>
//                     <div style="line-height:1.7; font-size: 13px;">
//                         <div style="margin-bottom:3px;">🛠️ <b>Phần việc:</b> <span style="color:#0056b3; font-weight:bold;">${hs.phan_viec || 'Chưa rõ nhiệm vụ'}</span></div>
//                         <div style="margin-bottom:3px; display: flex; align-items: center; gap: 6px;">⏳ <b>Tiến độ:</b> ${nhanTT}</div>
//                         <div style="margin-bottom:3px; display: flex; align-items: center; gap: 6px;">⭐ <b>Đánh giá:</b> ${nhanDanhGiaPopup}</div>
//                         <div style="margin-bottom:3px;">📝 <b>Ghi chú, nhận xét:</b> <span style="color:#555;">${hs.ghi_chu ? `<i>${hs.ghi_chu}</i>` : '<i style="color:#adb5bd;">Không có</i>'}</span></div>
//                         ${hinhAnhCanhan}
//                     </div>
//                 </div>
//             </div>
//             `;
//         }).join('');
//     } else {
//         htmlNguoiNhan = '<i style="color:#6c757d; display:block; padding: 10px 0;">Không phân công học sinh cụ thể (Giao chung toàn lớp).</i>';
//     }

//     let htmlAnhChung = (item.anh_dinh_kem || []).map(linkAnh => {
//         let fileId = null;
//         if (linkAnh.includes('/d/')) { let m = linkAnh.match(/\/d\/([a-zA-Z0-9_-]+)/); if (m) fileId = m[1]; }
//         else if (linkAnh.includes('id=')) { let m = linkAnh.match(/id=([a-zA-Z0-9_-]+)/); if (m) fileId = m[1]; }
//         let srcTN = fileId ? `https://drive.google.com/thumbnail?id=${fileId}&sz=w800` : linkAnh;

//         return `
//         <a href="${linkAnh}" target="_blank" title="Bấm để mở to">
//             <img src="${srcTN}" onerror="this.onerror=null; this.src='${linkAnh}';" style="max-height:130px; border-radius:8px; border:1px solid #ced4da; object-fit:contain; box-shadow: 0 2px 5px rgba(0,0,0,0.1); cursor:pointer; transition:0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
//         </a>`;
//     }).join('') || '<i style="color:#6c757d; font-size:13px;">Không có ảnh chung đính kèm.</i>';

//     let strNgay = item.ngay_nhap ? item.ngay_nhap.replace('T', ' ') : '';

//     modal.innerHTML = `
//         <div style="background:#fff; width:650px; max-width:92%; padding:25px; border-radius:12px; box-shadow:0 10px 30px rgba(0,0,0,0.5); max-height:88vh; overflow-y:auto; position:relative; animation: fadeIn 0.2s;">
//             <button onclick="document.getElementById('gvcn-modal-chitiet').remove()" style="position:absolute; top:15px; right:15px; background:none; border:none; font-size:22px; font-weight:bold; cursor:pointer; color:#adb5bd; transition:0.2s;" onmouseover="this.style.color='#dc3545'" onmouseout="this.style.color='#adb5bd'">✖</button>
//             <h3 style="margin-top:0; color:#0056b3; border-bottom:2px solid #cce5ff; padding-bottom:12px; font-size: 18px; text-transform: uppercase;">📋 Thông tin Nhiệm vụ</h3>
            
//             <p style="font-size:13px; margin-bottom:8px; color:#6c757d;"><b>📅 Cập nhật lúc:</b> ${strNgay}</p>
//             <p style="margin-bottom:10px;"><b>📌 Tên nội dung:</b> <span style="color:#0056b3; font-weight:bold; font-size:16px;">${item.ten_noi_dung}</span></p>
            
//             <div style="margin-bottom: 15px;">
//                 <b style="font-size:14px; color:#495057;">📝 Mô tả chi tiết:</b>
//                 <div style="background:#fdfdfe; padding:12px; border:1px solid #e9ecef; border-radius:8px; white-space:pre-wrap; font-size:13px; line-height:1.5; margin-top:5px; color:#333;">${item.chi_tiet || '<i style="color:#adb5bd;">Không có mô tả chi tiết...</i>'}</div>
//             </div>

//             <div style="margin-bottom: 15px;">
//                 <b style="font-size:14px; color:#495057;">📸 Ảnh chung của nhiệm vụ:</b>
//                 <div style="display:flex; gap:12px; flex-wrap:wrap; margin-top:5px; padding:10px; background:#f8f9fa; border-radius:8px; border: 1px dashed #dee2e6;">${htmlAnhChung}</div>
//             </div>

//             <div>
//                 <b style="font-size:14px; color:#e83e8c;">👤 Tiến độ & Đánh giá cá nhân:</b>
//                 <div style="margin-top:5px;">${htmlNguoiNhan}</div>
//             </div>

//             <div style="text-align:right; margin-top:25px; border-top:1px solid #eee; padding-top:15px; display: flex; justify-content: flex-end; gap: 10px;">
//                 <button onclick="document.getElementById('gvcn-modal-chitiet').remove(); if(typeof window.ham_21_26_sua_noi_dung === 'function') window.ham_21_26_sua_noi_dung('${item.id}')" style="padding:10px 25px; background:#ffc107; color:#000; border:none; border-radius:6px; cursor:pointer; font-weight:bold; box-shadow:0 2px 4px rgba(0,0,0,0.15); transition:0.2s;" onmouseover="this.style.background='#e0a800'" onmouseout="this.style.background='#ffc107'">✏️ Sửa nội dung</button>
//                 <button onclick="document.getElementById('gvcn-modal-chitiet').remove()" style="padding:10px 30px; background:#6c757d; color:white; border:none; border-radius:6px; cursor:pointer; font-weight:bold; box-shadow:0 2px 4px rgba(0,0,0,0.15); transition:0.2s;" onmouseover="this.style.background='#5a6268'" onmouseout="this.style.background='#6c757d'">Đóng</button>
//             </div>
//         </div>
//     `;
// };


// =====================================================================
// HÀM 21.20: HIỂN THỊ POPUP CHI TIẾT NỘI DUNG (CÓ ĐỦ NÚT SỬA VÀ XÓA)
// =====================================================================
window.ham_21_20_mo_popup_chi_tiet = function (id) {
    if (!window.gvcn_DanhSachNoiDangHienTai) return;
    let item = window.gvcn_DanhSachNoiDangHienTai.find(x => x.id === id);
    if (!item) return;

    let modal = document.getElementById('gvcn-modal-chitiet');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'gvcn-modal-chitiet';
        modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); display:flex; align-items:center; justify-content:center; z-index:999999; backdrop-filter: blur(3px);';
        document.body.appendChild(modal);
    }

    let htmlNguoiNhan = '';
    if (item.nguoi_nhan && item.nguoi_nhan.length > 0) {
        htmlNguoiNhan = item.nguoi_nhan.map(hs => {
            let bgTrangThai = '#6c757d';
            if (hs.trang_thai === 'Đã xong') bgTrangThai = '#28a745';
            else if (hs.trang_thai === 'Chưa làm') bgTrangThai = '#dc3545';
            else if (hs.trang_thai === 'Chưa xong') bgTrangThai = '#ffc107';
            else if (hs.trang_thai === 'Đang làm') bgTrangThai = '#17a2b8';

            let nhanTT = hs.trang_thai ? `<span style="background:${bgTrangThai}; color:${hs.trang_thai === 'Chưa xong' ? '#000' : '#fff'}; padding:3px 10px; border-radius:12px; font-size:11px; font-weight:bold; box-shadow: 0 1px 3px rgba(0,0,0,0.1); display:inline-block;">${hs.trang_thai}</span>` : '<i style="color:#999; font-size:12px;">Chưa cập nhật</i>';
            let hsObj = window.DanhSachHocSinhLopHienTai ? window.DanhSachHocSinhLopHienTai.find(h => h.uid === hs.uid) : null;
            let avatar = hsObj ? hsObj.avatarUrl : `https://ui-avatars.com/api/?name=${encodeURIComponent(hs.ten)}&background=random&color=fff`;

            let nhanDanhGiaPopup = '';
            if (hs.danh_gia && hs.danh_gia.trim() !== '') {
                let bgDG = '#6c757d';
                if (hs.danh_gia === 'Tốt') bgDG = '#28a745';
                else if (hs.danh_gia === 'Khá') bgDG = '#17a2b8';
                else if (hs.danh_gia === 'Trung Bình' || hs.danh_gia === 'TB') bgDG = '#fd7e14';
                else if (hs.danh_gia === 'Chưa đạt') bgDG = '#dc3545';

                nhanDanhGiaPopup = `<span style="background:${bgDG}; color:#fff; padding:3px 10px; border-radius:12px; font-size:11px; font-weight:bold; box-shadow: 0 1px 3px rgba(0,0,0,0.1); display:inline-block;">${hs.danh_gia}</span>`;
            } else {
                nhanDanhGiaPopup = `<span style="background:#dc3545; color:#fff; padding:3px 10px; border-radius:12px; font-size:11px; font-weight:bold; box-shadow: 0 1px 3px rgba(0,0,0,0.1); display:inline-block;">Chưa đánh giá</span>`;
            }

            let hinhAnhCanhan = '';
            if (hs.anh_minh_chung) {
                let fileIdHS = null;
                if (hs.anh_minh_chung.includes('/d/')) { let m = hs.anh_minh_chung.match(/\/d\/([a-zA-Z0-9_-]+)/); if (m) fileIdHS = m[1]; }
                else if (hs.anh_minh_chung.includes('id=')) { let m = hs.anh_minh_chung.match(/id=([a-zA-Z0-9_-]+)/); if (m) fileIdHS = m[1]; }
                let srcTN = fileIdHS ? `https://drive.google.com/thumbnail?id=${fileIdHS}&sz=w400` : hs.anh_minh_chung;

                hinhAnhCanhan = `
                <div style="margin-top:10px; border-top: 1px dashed #ccc; padding-top: 8px;">
                    <b style="font-size:12px; color:#555;">📸 Ảnh phần việc:</b><br>
                    <a href="${hs.anh_minh_chung}" target="_blank" title="Bấm để mở to">
                        <img src="${srcTN}" onerror="this.onerror=null; this.src='${hs.anh_minh_chung}';" style="max-height:90px; border-radius:6px; border:1px solid #ced4da; margin-top:5px; box-shadow:0 1px 3px rgba(0,0,0,0.1); cursor:pointer;">
                    </a>
                </div>`;
            }

            return `
            <div style="background:#f8f9fa; padding:15px; border-radius:8px; margin-bottom:10px; border:1px solid #dee2e6; display:flex; gap:12px; align-items:flex-start; box-shadow: 0 1px 3px rgba(0,0,0,0.02);">
                <img src="${avatar}" style="width:45px; height:45px; border-radius:50%; border:2px solid #ccc; object-fit:cover; margin-top:2px;">
                <div style="flex:1;">
                    <div style="margin-bottom:8px; font-size: 14px; border-bottom: 1px dashed #e9ecef; padding-bottom: 5px;">
                        <b>👤 ${hs.ten}</b> <span style="color:#666; font-size:12px;">(${hs.ten_dang_nhap || 'Chưa có thông tin'})</span>
                    </div>
                    <div style="line-height:1.7; font-size: 13px;">
                        <div style="margin-bottom:3px;">🛠️ <b>Phần việc:</b> <span style="color:#0056b3; font-weight:bold;">${hs.phan_viec || 'Chưa rõ nhiệm vụ'}</span></div>
                        <div style="margin-bottom:3px; display: flex; align-items: center; gap: 6px;">⏳ <b>Tiến độ:</b> ${nhanTT}</div>
                        <div style="margin-bottom:3px; display: flex; align-items: center; gap: 6px;">⭐ <b>Đánh giá:</b> ${nhanDanhGiaPopup}</div>
                        <div style="margin-bottom:3px;">📝 <b>Ghi chú, nhận xét:</b> <span style="color:#555;">${hs.ghi_chu ? `<i>${hs.ghi_chu}</i>` : '<i style="color:#adb5bd;">Không có</i>'}</span></div>
                        ${hinhAnhCanhan}
                    </div>
                </div>
            </div>
            `;
        }).join('');
    } else {
        htmlNguoiNhan = '<i style="color:#6c757d; display:block; padding: 10px 0;">Không phân công học sinh cụ thể (Giao chung toàn lớp).</i>';
    }

    let htmlAnhChung = (item.anh_dinh_kem || []).map(linkAnh => {
        let fileId = null;
        if (linkAnh.includes('/d/')) { let m = linkAnh.match(/\/d\/([a-zA-Z0-9_-]+)/); if (m) fileId = m[1]; }
        else if (linkAnh.includes('id=')) { let m = linkAnh.match(/id=([a-zA-Z0-9_-]+)/); if (m) fileId = m[1]; }
        let srcTN = fileId ? `https://drive.google.com/thumbnail?id=${fileId}&sz=w800` : linkAnh;

        return `
        <a href="${linkAnh}" target="_blank" title="Bấm để mở to">
            <img src="${srcTN}" onerror="this.onerror=null; this.src='${linkAnh}';" style="max-height:130px; border-radius:8px; border:1px solid #ced4da; object-fit:contain; box-shadow: 0 2px 5px rgba(0,0,0,0.1); cursor:pointer; transition:0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
        </a>`;
    }).join('') || '<i style="color:#6c757d; font-size:13px;">Không có ảnh chung đính kèm.</i>';

    let strNgay = item.ngay_nhap ? item.ngay_nhap.replace('T', ' ') : '';

    modal.innerHTML = `
        <div style="background:#fff; width:650px; max-width:92%; padding:25px; border-radius:12px; box-shadow:0 10px 30px rgba(0,0,0,0.5); max-height:88vh; overflow-y:auto; position:relative; animation: fadeIn 0.2s;">
            <button onclick="document.getElementById('gvcn-modal-chitiet').remove()" style="position:absolute; top:15px; right:15px; background:none; border:none; font-size:22px; font-weight:bold; cursor:pointer; color:#adb5bd; transition:0.2s;" onmouseover="this.style.color='#dc3545'" onmouseout="this.style.color='#adb5bd'">✖</button>
            <h3 style="margin-top:0; color:#0056b3; border-bottom:2px solid #cce5ff; padding-bottom:12px; font-size: 18px; text-transform: uppercase;">📋 Thông tin Nhiệm vụ</h3>
            
            <p style="font-size:13px; margin-bottom:8px; color:#6c757d;"><b>📅 Cập nhật lúc:</b> ${strNgay}</p>
            <p style="margin-bottom:10px;"><b>📌 Tên nội dung:</b> <span style="color:#0056b3; font-weight:bold; font-size:16px;">${item.ten_noi_dung}</span></p>
            
            <div style="margin-bottom: 15px;">
                <b style="font-size:14px; color:#495057;">📝 Mô tả chi tiết:</b>
                <div style="background:#fdfdfe; padding:12px; border:1px solid #e9ecef; border-radius:8px; white-space:pre-wrap; font-size:13px; line-height:1.5; margin-top:5px; color:#333;">${item.chi_tiet || '<i style="color:#adb5bd;">Không có mô tả chi tiết...</i>'}</div>
            </div>

            <div style="margin-bottom: 15px;">
                <b style="font-size:14px; color:#495057;">📸 Ảnh chung của nhiệm vụ:</b>
                <div style="display:flex; gap:12px; flex-wrap:wrap; margin-top:5px; padding:10px; background:#f8f9fa; border-radius:8px; border: 1px dashed #dee2e6;">${htmlAnhChung}</div>
            </div>

            <div>
                <b style="font-size:14px; color:#e83e8c;">👤 Tiến độ & Đánh giá cá nhân:</b>
                <div style="margin-top:5px;">${htmlNguoiNhan}</div>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; margin-top:25px; border-top:1px solid #eee; padding-top:15px;">
                <button onclick="document.getElementById('gvcn-modal-chitiet').remove(); if(typeof window.ham_21_21_xoa_noi_dung === 'function') window.ham_21_21_xoa_noi_dung('${item.id}')" style="padding:10px 20px; background:#dc3545; color:white; border:none; border-radius:6px; cursor:pointer; font-weight:bold; box-shadow:0 2px 4px rgba(0,0,0,0.15); transition:0.2s;" onmouseover="this.style.background='#c82333'" onmouseout="this.style.background='#dc3545'">🗑️ Xóa</button>
                <div style="display: flex; gap: 10px;">
                    <button onclick="document.getElementById('gvcn-modal-chitiet').remove(); if(typeof window.ham_21_26_sua_noi_dung === 'function') window.ham_21_26_sua_noi_dung('${item.id}')" style="padding:10px 25px; background:#ffc107; color:#000; border:none; border-radius:6px; cursor:pointer; font-weight:bold; box-shadow:0 2px 4px rgba(0,0,0,0.15); transition:0.2s;" onmouseover="this.style.background='#e0a800'" onmouseout="this.style.background='#ffc107'">✏️ Sửa</button>
                    <button onclick="document.getElementById('gvcn-modal-chitiet').remove()" style="padding:10px 30px; background:#6c757d; color:white; border:none; border-radius:6px; cursor:pointer; font-weight:bold; box-shadow:0 2px 4px rgba(0,0,0,0.15); transition:0.2s;" onmouseover="this.style.background='#5a6268'" onmouseout="this.style.background='#6c757d'">Đóng</button>
                </div>
            </div>
        </div>
    `;
};







 
// // =====================================================================
// // HÀM 21.21: XÓA NỘI DUNG
// // =====================================================================
// window.ham_21_21_xoa_noi_dung = async function (id) {
//     if (!confirm("⚠️ Thầy có chắc chắn muốn xóa nội dung này không?")) return;
//     try {
//         const { error } = await _supabase.from('nhat_ky_gvcn_noi_dung').delete().eq('id', id);
//         if (error) throw error;
//         alert("✅ Đã xóa thành công!");
//         if (typeof window.ham_21_16_tai_du_lieu_tuan === 'function') {
//             window.ham_21_16_tai_du_lieu_tuan();
//         }
//     } catch (e) {
//         alert("❌ Lỗi khi xóa: " + e.message);
//     }
// };



// =====================================================================
// HÀM 21.21: XÓA NỘI DUNG (KÈM DỌN DẸP SẠCH SỰ KIỆN LIÊN QUAN)
// =====================================================================
window.ham_21_21_xoa_noi_dung = async function (id) {
    if (!window.gvcn_DanhSachNoiDangHienTai) return;
    let item = window.gvcn_DanhSachNoiDangHienTai.find(x => x.id === id);
    if (!item) return;

    // Xác nhận 2 lớp để tránh lỡ tay bấm nhầm
    let xacNhan = confirm(`⚠️ Thầy có chắc chắn muốn xóa nội dung: "${item.ten_noi_dung}" không?\n\n(Lưu ý: Toàn bộ thông tin tiến độ, đánh giá và ảnh của học sinh thuộc nhiệm vụ này cũng sẽ bị xóa vĩnh viễn khỏi hệ thống!)`);
    if (!xacNhan) return;

    try {
        // 1. Dọn dẹp các sự kiện đánh giá nằm trong hồ sơ của học sinh
        if (item.id_gvcn_nhat_ky && item.ten_noi_dung) {
            await _supabase.from('nhat_ky_gvcn_su_kien_hs')
                .delete()
                .eq('id_gvcn_nhat_ky', item.id_gvcn_nhat_ky)
                .eq('nhom_su_kien', `Giao việc: ${item.ten_noi_dung}`);
        }

        // 2. Xóa nội dung công việc gốc
        const { error } = await _supabase.from('nhat_ky_gvcn_noi_dung')
            .delete()
            .eq('id', id);

        if (error) throw error;

        alert("✅ Đã xóa nội dung và làm sạch các dữ liệu liên quan thành công!");

        // 3. Load lại bảng dữ liệu tuần
        if (typeof window.ham_21_16_tai_du_lieu_tuan === 'function') {
            window.ham_21_16_tai_du_lieu_tuan();
        }

        // 4. Nếu thầy đang mở chế độ "Sửa" đúng nội dung vừa xóa -> Hủy sửa luôn để dọn Form
        if (window.gvcn_IdNoiDungDangSua === id && typeof window.ham_21_27_huy_sua_noi_dung === 'function') {
            window.ham_21_27_huy_sua_noi_dung();
        }

    } catch (e) {
        console.error(e);
        alert("❌ Lỗi khi xóa: " + e.message);
    }
};




// =====================================================================
// HÀM 21.22: HÀM PHỤ TRỢ XỬ LÝ NÚT THU HẸP / MỞ RỘNG
// =====================================================================
window.ham_21_22_toggle_muc = function(idBody, btn) {
    let bodyEl = document.getElementById(idBody);
    if (!bodyEl) return;
    if (bodyEl.style.display === 'none') {
        bodyEl.style.display = 'block';
        btn.innerHTML = '➖ Thu hẹp';
        btn.style.background = '#f8f9fa';
        btn.style.color = '#333';
    } else {
        bodyEl.style.display = 'none';
        btn.innerHTML = '➕ Mở rộng';
        btn.style.background = '#e2e6ea';
        btn.style.color = '#0056b3';
    }
};





// // =====================================================================
// // HÀM 21.23 & 21.24 & 21.25: CÁC HÀM XỬ LÝ ẢNH HS VÀ DRIVE THUMBNAIL
// // =====================================================================
// window.ham_21_23_chon_anh_hs = async function (inputElem) {
//     if (inputElem.files && inputElem.files[0]) {
//         let f = inputElem.files[0];
//         try {
//             let b64 = await window.ham_ho_tro_doc_anh_base64(f);
//             let dong = inputElem.closest('.dong-nguoi-nhan');
//             dong.dataset.anhB64 = b64;
//             dong.dataset.anhType = f.type;

//             dong.querySelector('.preview-anh-hs').src = b64;
//             dong.querySelector('.preview-anh-hs').style.display = 'block';
//             dong.querySelector('.btn-xoa-anh-hs').style.display = 'block';
//             dong.querySelector('.btn-anh-hs').style.display = 'none';
//         } catch (e) { console.error("Lỗi đọc ảnh HS", e); }
//     }
// };

// // =====================================================================
// // HÀM 21.23: XỬ LÝ CHỌN ẢNH HỌC SINH (CÓ TÍCH HỢP CẮT/NÉN CROPPER)
// // =====================================================================
// window.ham_21_23_chon_anh_hs = async function (inputElem) {
//     if (inputElem.files && inputElem.files.length > 0) {
//         try {
//             // Kích hoạt giao diện cắt, nén ảnh (Giống các phần upload ảnh khác)
//             let files = await window.ham_20_25_xu_ly_mang_anh_dau_vao(Array.from(inputElem.files));

//             if (files && files.length > 0) {
//                 let f = files[0]; // Chỉ lấy 1 ảnh cho mỗi cá nhân
//                 let b64 = await window.ham_ho_tro_doc_anh_base64(f);

//                 let dong = inputElem.closest('.dong-nguoi-nhan');
//                 dong.dataset.anhB64 = b64;
//                 dong.dataset.anhType = f.type;

//                 // Render preview
//                 dong.querySelector('.preview-anh-hs').src = b64;
//                 dong.querySelector('.preview-anh-hs').style.display = 'block';
//                 dong.querySelector('.btn-xoa-anh-hs').style.display = 'block';
//                 dong.querySelector('.btn-anh-hs').style.display = 'none';
//             }
//         } catch (e) {
//             console.error("Lỗi đọc ảnh HS", e);
//         }
//         // Xóa giá trị input để có thể chọn lại chính ảnh đó nếu cần
//         inputElem.value = '';
//     }
// };

// window.ham_21_24_xoa_anh_hs = function (btnXoa) {
//     let dong = btnXoa.closest('.dong-nguoi-nhan');
//     dong.removeAttribute('data-anh-b64');
//     dong.removeAttribute('data-anh-type');

//     dong.querySelector('.input-anh-hs').value = '';
//     dong.querySelector('.preview-anh-hs').src = '';
//     dong.querySelector('.preview-anh-hs').style.display = 'none';
//     btnXoa.style.display = 'none';
//     dong.querySelector('.btn-anh-hs').style.display = 'block';
// };


// =====================================================================
// HÀM 21.23 & 21.24: CHỌN VÀ XÓA ẢNH HS (HIỆN DUNG LƯỢNG ? KB TẠI DÒNG)
// =====================================================================
window.ham_21_23_chon_anh_hs = async function (inputElem) {
    if (inputElem.files && inputElem.files.length > 0) {
        try {
            let files = await window.ham_20_25_xu_ly_mang_anh_dau_vao(Array.from(inputElem.files));
            if (files && files.length > 0) {
                let f = files[0];
                let b64 = await window.ham_ho_tro_doc_anh_base64(f);
                let dong = inputElem.closest('.dong-nguoi-nhan');
                dong.dataset.anhB64 = b64;
                dong.dataset.anhType = f.type;

                let sizeKB = (f.size / 1024).toFixed(1);
                let previewImg = dong.querySelector('.preview-anh-hs');
                previewImg.src = b64;
                previewImg.style.display = 'block';
                previewImg.title = `${sizeKB} KB (Bấm để đổi ảnh)`;

                let lblSize = dong.querySelector('.label-size-anh-hs');
                if (!lblSize) {
                    lblSize = document.createElement('span');
                    lblSize.className = 'label-size-anh-hs';
                    lblSize.style.cssText = 'font-size:10px; color:#00838f; font-weight:bold; white-space:nowrap; margin-left:3px;';
                    previewImg.insertAdjacentElement('afterend', lblSize);
                }
                lblSize.innerText = `${sizeKB} KB`;
                lblSize.style.display = 'inline-block';

                dong.querySelector('.btn-xoa-anh-hs').style.display = 'block';
                dong.querySelector('.btn-anh-hs').style.display = 'none';
            }
        } catch (e) { console.error("Lỗi đọc ảnh HS", e); }
        inputElem.value = '';
    }
};

// window.ham_21_24_xoa_anh_hs = function (btnXoa) {
//     let dong = btnXoa.closest('.dong-nguoi-nhan');
//     dong.removeAttribute('data-anh-b64');
//     dong.removeAttribute('data-anh-type');

//     dong.querySelector('.input-anh-hs').value = '';
//     dong.querySelector('.preview-anh-hs').src = '';
//     dong.querySelector('.preview-anh-hs').style.display = 'none';
//     let lblSize = dong.querySelector('.label-size-anh-hs');
//     if (lblSize) lblSize.remove();
//     btnXoa.style.display = 'none';
//     dong.querySelector('.btn-anh-hs').style.display = 'block';
// };


// =====================================================================
// HÀM 21.24: XÓA ẢNH HS (BỔ SUNG XÓA LUÔN DATA ẢNH CŨ NẾU CÓ)
// =====================================================================
window.ham_21_24_xoa_anh_hs = function (btnXoa) {
    let dong = btnXoa.closest('.dong-nguoi-nhan');

    // Xóa dấu vết của cả ảnh mới và ảnh cũ
    dong.removeAttribute('data-anh-b64');
    dong.removeAttribute('data-anh-type');
    dong.removeAttribute('data-anh-cu'); // QUAN TRỌNG: Cắt đứt link ảnh cũ

    dong.querySelector('.input-anh-hs').value = '';
    dong.querySelector('.preview-anh-hs').src = '';
    dong.querySelector('.preview-anh-hs').style.display = 'none';

    let lblSize = dong.querySelector('.label-size-anh-hs');
    if (lblSize) lblSize.remove();

    btnXoa.style.display = 'none';
    dong.querySelector('.btn-anh-hs').style.display = 'block';
};




window.ham_21_25_get_thumbnail_drive = function (linkAnh, size = 'w800') {
    if (!linkAnh) return '';
    let fileId = '';
    if (linkAnh.includes('/d/')) {
        let m = linkAnh.match(/\/d\/([a-zA-Z0-9_-]+)/);
        if (m && m[1]) fileId = m[1];
    } else if (linkAnh.includes('id=')) {
        let m = linkAnh.match(/id=([a-zA-Z0-9_-]+)/);
        if (m && m[1]) fileId = m[1];
    }
    return fileId ? `https://drive.google.com/thumbnail?id=${fileId}&sz=${size}` : linkAnh;
};


// =====================================================================
// HÀM 21.26 & 21.27: ĐẨY DỮ LIỆU CŨ LÊN FORM ĐỂ SỬA VÀ HỦY SỬA
// =====================================================================
window.gvcn_IdNoiDungDangSua = null; // Biến toàn cục nhận diện trạng thái
window.gvcn_TenNoiDungCu = ''; // Lưu tên cũ để lát dọn dẹp Sự kiện đánh giá

// window.ham_21_26_sua_noi_dung = function (id) {
//     if (!window.gvcn_DanhSachNoiDangHienTai) return;
//     let item = window.gvcn_DanhSachNoiDangHienTai.find(x => x.id === id);
//     if (!item) return;

//     window.gvcn_IdNoiDungDangSua = id;
//     window.gvcn_TenNoiDungCu = item.ten_noi_dung;

//     // 1. Nạp Thông tin chung
//     document.getElementById('gvcn-nd-ngay').value = item.ngay_nhap ? item.ngay_nhap.substring(0, 16) : '';
//     document.getElementById('gvcn-nd-ten').value = item.ten_noi_dung || '';
//     document.getElementById('gvcn-nd-chitiet').value = item.chi_tiet || '';

//     // 2. Clear danh sách học sinh hiện tại trên form và Nạp lại
//     let khuvuc = document.getElementById('gvcn-khu-vuc-nguoi-nhan');
//     khuvuc.innerHTML = '';

//     if (item.nguoi_nhan && item.nguoi_nhan.length > 0) {
//         item.nguoi_nhan.forEach(hs => {
//             let dongMoi = document.createElement('div');
//             dongMoi.className = 'dong-nguoi-nhan';
//             dongMoi.style.cssText = 'display: flex; gap: 8px; align-items: center; flex-wrap: wrap; background: #fffde7; padding: 6px; border-radius: 6px; border: 1px solid #fbc02d; margin-bottom:10px;';

//             // Tìm lại avatar
//             let hsObj = window.DanhSachHocSinhLopHienTai ? window.DanhSachHocSinhLopHienTai.find(h => h.uid === hs.uid || h.tenHienThi === hs.ten) : null;
//             let avatar = hsObj ? hsObj.avatarUrl : '';
//             let valChonHS = hs.ten + (hs.ten_dang_nhap ? ` - ${hs.ten_dang_nhap}` : '');

//             // Trạng thái nút Ảnh cũ
//             let htmlAnh = `<button type="button" class="btn-anh-hs" onclick="this.nextElementSibling.click()" style="padding: 4px 8px; background: #e0f7fa; color: #00838f; border: 1px dashed #00acc1; border-radius: 4px; cursor: pointer; font-size:12px; font-weight:bold;" title="Đính kèm ảnh mới">📷 Ảnh</button>
//                            <input type="file" accept="image/*" class="input-anh-hs" style="display:none;" onchange="if(typeof window.ham_21_23_chon_anh_hs === 'function') window.ham_21_23_chon_anh_hs(this)">
//                            <img class="preview-anh-hs" src="" style="width:24px; height:24px; object-fit:cover; border-radius:4px; border:1px solid #00acc1; cursor:pointer; display:none;" onclick="this.previousElementSibling.click()" title="Bấm để đổi ảnh">
//                            <button type="button" class="btn-xoa-anh-hs" onclick="if(typeof window.ham_21_24_xoa_anh_hs === 'function') window.ham_21_24_xoa_anh_hs(this)" style="display:none; background:none; border:none; color:#dc3545; cursor:pointer; font-size:16px; padding:0 3px;" title="Xóa ảnh mới chọn">✖</button>`;

//             // Nếu có ảnh cũ, lưu vào dataset
//             if (hs.anh_minh_chung) {
//                 dongMoi.dataset.anhCu = hs.anh_minh_chung;
//                 htmlAnh += `<span class="nhan-anh-cu" style="font-size:10px; color:#e83e8c; font-weight:bold; margin-left:5px;">(Đã có ảnh cũ)</span>`;
//             }

//             dongMoi.innerHTML = `
//                 <div style="display:flex; align-items:center; gap:8px; flex:1.5; min-width:160px; border:1px solid #ced4da; border-radius:4px; padding:4px 8px; background:#fff;">
//                     <img class="avatar-preview" src="${avatar}" style="width:24px; height:24px; border-radius:50%; object-fit:cover; display:${avatar ? 'block' : 'none'}; border:1px solid #eee;">
//                     <input class="gvcn-input-hs" value="${valChonHS}" placeholder="Chọn học sinh..." style="border:none; outline:none; flex:1; width:100%; font-size:12px; font-weight:bold; color:#1a73e8;">
//                 </div>
//                 <input class="gvcn-input-phan-viec" value="${hs.phan_viec || ''}" placeholder="Phần việc..." style="flex: 1.5; min-width: 110px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; font-weight:bold; outline: none;">
                
//                 <select class="gvcn-sel-trangthai" style="flex: 1; min-width: 90px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; background:#fff; cursor:pointer;">
//                     <option value="Chưa làm" ${hs.trang_thai === 'Chưa làm' ? 'selected' : ''}>❌ Chưa làm</option>
//                     <option value="Đang làm" ${hs.trang_thai === 'Đang làm' ? 'selected' : ''}>⏳ Đang làm</option>
//                     <option value="Chưa xong" ${hs.trang_thai === 'Chưa xong' ? 'selected' : ''}>⚠️ Chưa xong</option>
//                     <option value="Đã xong" ${hs.trang_thai === 'Đã xong' ? 'selected' : ''}>✅ Đã xong</option>
//                 </select>

//                 <select class="gvcn-sel-danhgia" style="flex: 1; min-width: 90px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; background:#fff; cursor:pointer;">
//                     <option value="" ${!hs.danh_gia ? 'selected' : ''}>Chưa đánh giá</option>
//                     <option value="Tốt" ${hs.danh_gia === 'Tốt' ? 'selected' : ''}>🌟 Tốt</option>
//                     <option value="Khá" ${hs.danh_gia === 'Khá' ? 'selected' : ''}>👍 Khá</option>
//                     <option value="Trung Bình" ${hs.danh_gia === 'Trung Bình' || hs.danh_gia === 'TB' ? 'selected' : ''}>😐 TB</option>
//                     <option value="Chưa đạt" ${hs.danh_gia === 'Chưa đạt' ? 'selected' : ''}>❌ Chưa đạt</option>
//                 </select>
//                 <input class="gvcn-input-note" value="${hs.ghi_chu || ''}" placeholder="Ghi chú..." style="flex: 1; min-width: 90px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none;">
                
//                 <div style="display:flex; align-items:center; gap:5px; background:#fff; padding:3px; border:1px solid #ced4da; border-radius:4px;">
//                     ${htmlAnh}
//                 </div>

//                 <button onclick="this.parentElement.remove()" style="padding: 6px 10px; background: #f8d7da; color: #dc3545; border: none; border-radius: 4px; cursor: pointer;" title="Xóa dòng học sinh">✖</button>
//             `;
//             khuvuc.appendChild(dongMoi);
//         });
//     } else {
//         // Ít nhất 1 dòng trắng nếu trống
//         if (typeof window.ham_21_3_them_dong_nguoi_nhan === 'function') window.ham_21_3_them_dong_nguoi_nhan();
//     }

//     // 3. Đổi giao diện Nút Lưu thành Nút Cập Nhật
//     let nutLuu = document.querySelector('button[onclick*="ham_21_13_luu_noi_dung_tuan"]');
//     if (nutLuu) {
//         nutLuu.innerHTML = '🔄 CẬP NHẬT NỘI DUNG ĐANG SỬA';
//         nutLuu.style.background = '#ffc107';
//         nutLuu.style.color = '#000';
//         nutLuu.style.boxShadow = '0 0 10px rgba(255, 193, 7, 0.5)';

//         // Thêm nút Hủy nếu chưa có
//         if (!document.getElementById('btn-huy-sua-nd')) {
//             let nutHuy = document.createElement('button');
//             nutHuy.id = 'btn-huy-sua-nd';
//             nutHuy.innerHTML = '❌ Hủy Sửa';
//             nutHuy.style.cssText = 'padding: 10px 20px; background: #6c757d; color: white; border: none; border-radius: 6px; font-weight: bold; font-size:13px; cursor: pointer; margin-right: 10px;';
//             nutHuy.onclick = window.ham_21_27_huy_sua_noi_dung;
//             nutLuu.parentElement.insertBefore(nutHuy, nutLuu);
//         }
//     }

//     // Cuộn trang lên chỗ nhập
//     document.getElementById('gvcn-nd-ten').scrollIntoView({ behavior: 'smooth', block: 'center' });
//     document.getElementById('gvcn-nd-ten').focus();

//     // Đánh dấu ảnh chung cũ
//     window.gvcn_AnhNoiDungTam = [];
//     let vungAnh = document.getElementById('gvcn-vung-preview-anh-nd');
//     vungAnh.innerHTML = `<span style="color:#e83e8c; font-weight:bold;">(Đang sửa nội dung. Đã có ${item.anh_dinh_kem ? item.anh_dinh_kem.length : 0} ảnh chung. Chọn thêm ảnh mới nếu cần...)</span>`;
// };


// =====================================================================
// HÀM 21.26: ĐẨY DỮ LIỆU CŨ LÊN FORM ĐỂ SỬA (HIỂN THỊ RÕ ẢNH CŨ)
// =====================================================================
window.gvcn_IdNoiDungDangSua = null;
window.gvcn_TenNoiDungCu = '';

// window.ham_21_26_sua_noi_dung = function (id) {
//     if (!window.gvcn_DanhSachNoiDangHienTai) return;
//     let item = window.gvcn_DanhSachNoiDangHienTai.find(x => x.id === id);
//     if (!item) return;

//     window.gvcn_IdNoiDungDangSua = id;
//     window.gvcn_TenNoiDungCu = item.ten_noi_dung;

//     // 1. Nạp Thông tin chung
//     document.getElementById('gvcn-nd-ngay').value = item.ngay_nhap ? item.ngay_nhap.substring(0, 16) : '';
//     document.getElementById('gvcn-nd-ten').value = item.ten_noi_dung || '';
//     document.getElementById('gvcn-nd-chitiet').value = item.chi_tiet || '';

//     // 2. Clear danh sách học sinh hiện tại trên form và Nạp lại
//     let khuvuc = document.getElementById('gvcn-khu-vuc-nguoi-nhan');
//     khuvuc.innerHTML = '';

//     if (item.nguoi_nhan && item.nguoi_nhan.length > 0) {
//         item.nguoi_nhan.forEach(hs => {
//             let dongMoi = document.createElement('div');
//             dongMoi.className = 'dong-nguoi-nhan';
//             dongMoi.style.cssText = 'display: flex; gap: 8px; align-items: center; flex-wrap: wrap; background: #fffde7; padding: 6px; border-radius: 6px; border: 1px solid #fbc02d; margin-bottom:10px;';

//             let hsObj = window.DanhSachHocSinhLopHienTai ? window.DanhSachHocSinhLopHienTai.find(h => h.uid === hs.uid || h.tenHienThi === hs.ten) : null;
//             let avatar = hsObj ? hsObj.avatarUrl : '';
//             let valChonHS = hs.ten + (hs.ten_dang_nhap ? ` - ${hs.ten_dang_nhap}` : '');

//             // 🌟 XỬ LÝ KHUNG ẢNH RIÊNG CỦA HỌC SINH TẠI ĐÂY
//             let htmlAnh = '';
//             if (hs.anh_minh_chung) {
//                 dongMoi.dataset.anhCu = hs.anh_minh_chung;
//                 let fileId = null;
//                 if (hs.anh_minh_chung.includes('/d/')) { let m = hs.anh_minh_chung.match(/\/d\/([a-zA-Z0-9_-]+)/); if (m) fileId = m[1]; }
//                 else if (hs.anh_minh_chung.includes('id=')) { let m = hs.anh_minh_chung.match(/id=([a-zA-Z0-9_-]+)/); if (m) fileId = m[1]; }
//                 let srcTN = fileId ? `https://drive.google.com/thumbnail?id=${fileId}&sz=w400` : hs.anh_minh_chung;

//                 htmlAnh = `
//                     <button type="button" class="btn-anh-hs" onclick="this.nextElementSibling.click()" style="display:none; padding: 4px 8px; background: #e0f7fa; color: #00838f; border: 1px dashed #00acc1; border-radius: 4px; cursor: pointer; font-size:12px; font-weight:bold;" title="Đính kèm ảnh mới">📷 Ảnh</button>
//                     <input type="file" accept="image/*" class="input-anh-hs" style="display:none;" onchange="if(typeof window.ham_21_23_chon_anh_hs === 'function') window.ham_21_23_chon_anh_hs(this)">
//                     <img class="preview-anh-hs" src="${srcTN}" style="width:50px; height:50px; object-fit:cover; border-radius:4px; border:1px solid #00acc1; cursor:pointer; display:block; background:#fff; box-shadow:0 1px 3px rgba(0,0,0,0.1);" onclick="window.open('${hs.anh_minh_chung}', '_blank')" title="Bấm để xem ảnh gốc.\nNhấn nút ✖ bên cạnh để Xóa ảnh cũ này.">
//                     <button type="button" class="btn-xoa-anh-hs" onclick="if(typeof window.ham_21_24_xoa_anh_hs === 'function') window.ham_21_24_xoa_anh_hs(this)" style="display:block; background:none; border:none; color:#dc3545; cursor:pointer; font-size:16px; padding:0 3px;" title="Xóa ảnh cũ này">✖</button>
//                 `;
//             } else {
//                 htmlAnh = `
//                     <button type="button" class="btn-anh-hs" onclick="this.nextElementSibling.click()" style="padding: 4px 8px; background: #e0f7fa; color: #00838f; border: 1px dashed #00acc1; border-radius: 4px; cursor: pointer; font-size:12px; font-weight:bold;" title="Đính kèm ảnh minh chứng riêng">📷 Ảnh</button>
//                     <input type="file" accept="image/*" class="input-anh-hs" style="display:none;" onchange="if(typeof window.ham_21_23_chon_anh_hs === 'function') window.ham_21_23_chon_anh_hs(this)">
//                     <img class="preview-anh-hs" src="" style="width:50px; height:50px; object-fit:cover; border-radius:4px; border:1px solid #00acc1; cursor:pointer; display:none;" onclick="this.previousElementSibling.click()" title="Bấm để đổi ảnh">
//                     <button type="button" class="btn-xoa-anh-hs" onclick="if(typeof window.ham_21_24_xoa_anh_hs === 'function') window.ham_21_24_xoa_anh_hs(this)" style="display:none; background:none; border:none; color:#dc3545; cursor:pointer; font-size:16px; padding:0 3px;" title="Xóa ảnh">✖</button>
//                 `;
//             }

//             dongMoi.innerHTML = `
//                 <div style="display:flex; align-items:center; gap:8px; flex:1.5; min-width:160px; border:1px solid #ced4da; border-radius:4px; padding:4px 8px; background:#fff;">
//                     <img class="avatar-preview" src="${avatar}" style="width:24px; height:24px; border-radius:50%; object-fit:cover; display:${avatar ? 'block' : 'none'}; border:1px solid #eee;">
//                     <input class="gvcn-input-hs" value="${valChonHS}" placeholder="Chọn học sinh..." style="border:none; outline:none; flex:1; width:100%; font-size:12px; font-weight:bold; color:#1a73e8;">
//                 </div>
//                 <input class="gvcn-input-phan-viec" value="${hs.phan_viec || ''}" placeholder="Phần việc..." style="flex: 1.5; min-width: 110px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; font-weight:bold; outline: none;">
                
//                 <select class="gvcn-sel-trangthai" style="flex: 1; min-width: 90px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; background:#fff; cursor:pointer;">
//                     <option value="Chưa làm" ${hs.trang_thai === 'Chưa làm' ? 'selected' : ''}>❌ Chưa làm</option>
//                     <option value="Đang làm" ${hs.trang_thai === 'Đang làm' ? 'selected' : ''}>⏳ Đang làm</option>
//                     <option value="Chưa xong" ${hs.trang_thai === 'Chưa xong' ? 'selected' : ''}>⚠️ Chưa xong</option>
//                     <option value="Đã xong" ${hs.trang_thai === 'Đã xong' ? 'selected' : ''}>✅ Đã xong</option>
//                 </select>

//                 <select class="gvcn-sel-danhgia" style="flex: 1; min-width: 90px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; background:#fff; cursor:pointer;">
//                     <option value="" ${!hs.danh_gia ? 'selected' : ''}>Chưa đánh giá</option>
//                     <option value="Tốt" ${hs.danh_gia === 'Tốt' ? 'selected' : ''}>🌟 Tốt</option>
//                     <option value="Khá" ${hs.danh_gia === 'Khá' ? 'selected' : ''}>👍 Khá</option>
//                     <option value="Trung Bình" ${hs.danh_gia === 'Trung Bình' || hs.danh_gia === 'TB' ? 'selected' : ''}>😐 TB</option>
//                     <option value="Chưa đạt" ${hs.danh_gia === 'Chưa đạt' ? 'selected' : ''}>❌ Chưa đạt</option>
//                 </select>
//                 <input class="gvcn-input-note" value="${hs.ghi_chu || ''}" placeholder="Ghi chú..." style="flex: 1; min-width: 90px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none;">
                
//                 <div style="display:flex; align-items:center; gap:5px; background:#fff; padding:3px; border:1px solid #ced4da; border-radius:4px;">
//                     ${htmlAnh}
//                 </div>

//                 <button onclick="this.parentElement.remove()" style="padding: 6px 10px; background: #f8d7da; color: #dc3545; border: none; border-radius: 4px; cursor: pointer;" title="Xóa dòng học sinh">✖</button>
//             `;
//             khuvuc.appendChild(dongMoi);
//         });
//     } else {
//         if (typeof window.ham_21_3_them_dong_nguoi_nhan === 'function') window.ham_21_3_them_dong_nguoi_nhan();
//     }

//     // 3. Đổi giao diện Nút Lưu
//     let nutLuu = document.querySelector('button[onclick*="ham_21_13_luu_noi_dung_tuan"]');
//     if (nutLuu) {
//         nutLuu.innerHTML = '🔄 CẬP NHẬT NỘI DUNG ĐANG SỬA';
//         nutLuu.style.background = '#ffc107';
//         nutLuu.style.color = '#000';
//         nutLuu.style.boxShadow = '0 0 10px rgba(255, 193, 7, 0.5)';

//         if (!document.getElementById('btn-huy-sua-nd')) {
//             let nutHuy = document.createElement('button');
//             nutHuy.id = 'btn-huy-sua-nd';
//             nutHuy.innerHTML = '❌ Hủy Sửa';
//             nutHuy.style.cssText = 'padding: 10px 20px; background: #6c757d; color: white; border: none; border-radius: 6px; font-weight: bold; font-size:13px; cursor: pointer; margin-right: 10px;';
//             nutHuy.onclick = window.ham_21_27_huy_sua_noi_dung;
//             nutLuu.parentElement.insertBefore(nutHuy, nutLuu);
//         }
//     }

//     document.getElementById('gvcn-nd-ten').scrollIntoView({ behavior: 'smooth', block: 'center' });
//     document.getElementById('gvcn-nd-ten').focus();

//     // 🌟 4. XỬ LÝ KHUNG ẢNH CHUNG LỚN
//     window.gvcn_AnhNoiDungTam = [];
//     let vungAnh = document.getElementById('gvcn-vung-preview-anh-nd');
//     vungAnh.style.flexDirection = 'column';
//     vungAnh.style.alignItems = 'flex-start';

//     let htmlAnhChungCu = '';
//     if (item.anh_dinh_kem && item.anh_dinh_kem.length > 0) {
//         htmlAnhChungCu = `<div style="display:flex; gap:10px; margin-bottom:8px; padding-bottom:8px; border-bottom:1px dashed #ccc; width:100%; overflow-x:auto;">`;
//         item.anh_dinh_kem.forEach((linkAnh, i) => {
//             let fileId = null;
//             if (linkAnh.includes('/d/')) { let m = linkAnh.match(/\/d\/([a-zA-Z0-9_-]+)/); if (m) fileId = m[1]; }
//             else if (linkAnh.includes('id=')) { let m = linkAnh.match(/id=([a-zA-Z0-9_-]+)/); if (m) fileId = m[1]; }
//             let srcTN = fileId ? `https://drive.google.com/thumbnail?id=${fileId}&sz=w400` : linkAnh;

//             htmlAnhChungCu += `
//                 <div style="position:relative; display:flex; flex-direction:column; align-items:center; background:#fff; padding:4px; border-radius:6px; border:1px solid #ced4da;">
//                     <a href="${linkAnh}" target="_blank" title="Bấm xem ảnh gốc">
//                         <img src="${srcTN}" style="height:70px; border-radius:4px; object-fit:contain;">
//                     </a>
//                     <span style="font-size:10px; color:#e83e8c; font-weight:bold; margin-top:4px;">Ảnh cũ ${i + 1}</span>
//                 </div>`;
//         });
//         htmlAnhChungCu += `</div>`;
//     }

//     vungAnh.innerHTML = htmlAnhChungCu + `<div style="display:flex; align-items:center; height:100%;"><span style="color:#00838f; font-style:italic;">(Bấm nút 📷 Tải ảnh chung bên trái để nối thêm ảnh mới...)</span></div>`;
// };


// =====================================================================
// HÀM 21.26: ĐẨY DỮ LIỆU CŨ LÊN FORM ĐỂ SỬA (PHÓNG TO ẢNH CHUNG CŨ)
// =====================================================================
window.gvcn_IdNoiDungDangSua = null;
window.gvcn_TenNoiDungCu = '';

// window.ham_21_26_sua_noi_dung = function (id) {
//     if (!window.gvcn_DanhSachNoiDangHienTai) return;
//     let item = window.gvcn_DanhSachNoiDangHienTai.find(x => x.id === id);
//     if (!item) return;

//     window.gvcn_IdNoiDungDangSua = id;
//     window.gvcn_TenNoiDungCu = item.ten_noi_dung;

//     // 1. Nạp Thông tin chung
//     document.getElementById('gvcn-nd-ngay').value = item.ngay_nhap ? item.ngay_nhap.substring(0, 16) : '';
//     document.getElementById('gvcn-nd-ten').value = item.ten_noi_dung || '';
//     document.getElementById('gvcn-nd-chitiet').value = item.chi_tiet || '';

//     // 2. Clear danh sách học sinh hiện tại trên form và Nạp lại
//     let khuvuc = document.getElementById('gvcn-khu-vuc-nguoi-nhan');
//     khuvuc.innerHTML = '';

//     if (item.nguoi_nhan && item.nguoi_nhan.length > 0) {
//         item.nguoi_nhan.forEach(hs => {
//             let dongMoi = document.createElement('div');
//             dongMoi.className = 'dong-nguoi-nhan';
//             dongMoi.style.cssText = 'display: flex; gap: 8px; align-items: center; flex-wrap: wrap; background: #fffde7; padding: 6px; border-radius: 6px; border: 1px solid #fbc02d; margin-bottom:10px;';

//             let hsObj = window.DanhSachHocSinhLopHienTai ? window.DanhSachHocSinhLopHienTai.find(h => h.uid === hs.uid || h.tenHienThi === hs.ten) : null;
//             let avatar = hsObj ? hsObj.avatarUrl : '';
//             let valChonHS = hs.ten + (hs.ten_dang_nhap ? ` - ${hs.ten_dang_nhap}` : '');

//             let htmlAnh = '';
//             if (hs.anh_minh_chung) {
//                 dongMoi.dataset.anhCu = hs.anh_minh_chung;
//                 let fileId = null;
//                 if (hs.anh_minh_chung.includes('/d/')) { let m = hs.anh_minh_chung.match(/\/d\/([a-zA-Z0-9_-]+)/); if (m) fileId = m[1]; }
//                 else if (hs.anh_minh_chung.includes('id=')) { let m = hs.anh_minh_chung.match(/id=([a-zA-Z0-9_-]+)/); if (m) fileId = m[1]; }
//                 let srcTN = fileId ? `https://drive.google.com/thumbnail?id=${fileId}&sz=w400` : hs.anh_minh_chung;

//                 htmlAnh = `
//                     <button type="button" class="btn-anh-hs" onclick="this.nextElementSibling.click()" style="display:none; padding: 4px 8px; background: #e0f7fa; color: #00838f; border: 1px dashed #00acc1; border-radius: 4px; cursor: pointer; font-size:12px; font-weight:bold;" title="Đính kèm ảnh mới">📷 Ảnh</button>
//                     <input type="file" accept="image/*" class="input-anh-hs" style="display:none;" onchange="if(typeof window.ham_21_23_chon_anh_hs === 'function') window.ham_21_23_chon_anh_hs(this)">
//                     <img class="preview-anh-hs" src="${srcTN}" style="width:50px; height:50px; object-fit:cover; border-radius:4px; border:1px solid #00acc1; cursor:pointer; display:block; background:#fff; box-shadow:0 1px 3px rgba(0,0,0,0.1);" onclick="window.open('${hs.anh_minh_chung}', '_blank')" title="Bấm để xem ảnh gốc.\nNhấn nút ✖ bên cạnh để Xóa ảnh cũ này.">
//                     <button type="button" class="btn-xoa-anh-hs" onclick="if(typeof window.ham_21_24_xoa_anh_hs === 'function') window.ham_21_24_xoa_anh_hs(this)" style="display:block; background:none; border:none; color:#dc3545; cursor:pointer; font-size:16px; padding:0 3px;" title="Xóa ảnh cũ này">✖</button>
//                 `;
//             } else {
//                 htmlAnh = `
//                     <button type="button" class="btn-anh-hs" onclick="this.nextElementSibling.click()" style="padding: 4px 8px; background: #e0f7fa; color: #00838f; border: 1px dashed #00acc1; border-radius: 4px; cursor: pointer; font-size:12px; font-weight:bold;" title="Đính kèm ảnh minh chứng riêng">📷 Ảnh</button>
//                     <input type="file" accept="image/*" class="input-anh-hs" style="display:none;" onchange="if(typeof window.ham_21_23_chon_anh_hs === 'function') window.ham_21_23_chon_anh_hs(this)">
//                     <img class="preview-anh-hs" src="" style="width:50px; height:50px; object-fit:cover; border-radius:4px; border:1px solid #00acc1; cursor:pointer; display:none;" onclick="this.previousElementSibling.click()" title="Bấm để đổi ảnh">
//                     <button type="button" class="btn-xoa-anh-hs" onclick="if(typeof window.ham_21_24_xoa_anh_hs === 'function') window.ham_21_24_xoa_anh_hs(this)" style="display:none; background:none; border:none; color:#dc3545; cursor:pointer; font-size:16px; padding:0 3px;" title="Xóa ảnh">✖</button>
//                 `;
//             }

//             dongMoi.innerHTML = `
//                 <div style="display:flex; align-items:center; gap:8px; flex:1.5; min-width:160px; border:1px solid #ced4da; border-radius:4px; padding:4px 8px; background:#fff;">
//                     <img class="avatar-preview" src="${avatar}" style="width:24px; height:24px; border-radius:50%; object-fit:cover; display:${avatar ? 'block' : 'none'}; border:1px solid #eee;">
//                     <input class="gvcn-input-hs" value="${valChonHS}" placeholder="Chọn học sinh..." style="border:none; outline:none; flex:1; width:100%; font-size:12px; font-weight:bold; color:#1a73e8;">
//                 </div>
//                 <input class="gvcn-input-phan-viec" value="${hs.phan_viec || ''}" placeholder="Phần việc..." style="flex: 1.5; min-width: 110px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; font-weight:bold; outline: none;">
                
//                 <select class="gvcn-sel-trangthai" style="flex: 1; min-width: 90px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; background:#fff; cursor:pointer;">
//                     <option value="Chưa làm" ${hs.trang_thai === 'Chưa làm' ? 'selected' : ''}>❌ Chưa làm</option>
//                     <option value="Đang làm" ${hs.trang_thai === 'Đang làm' ? 'selected' : ''}>⏳ Đang làm</option>
//                     <option value="Chưa xong" ${hs.trang_thai === 'Chưa xong' ? 'selected' : ''}>⚠️ Chưa xong</option>
//                     <option value="Đã xong" ${hs.trang_thai === 'Đã xong' ? 'selected' : ''}>✅ Đã xong</option>
//                 </select>

//                 <select class="gvcn-sel-danhgia" style="flex: 1; min-width: 90px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; background:#fff; cursor:pointer;">
//                     <option value="" ${!hs.danh_gia ? 'selected' : ''}>Chưa đánh giá</option>
//                     <option value="Tốt" ${hs.danh_gia === 'Tốt' ? 'selected' : ''}>🌟 Tốt</option>
//                     <option value="Khá" ${hs.danh_gia === 'Khá' ? 'selected' : ''}>👍 Khá</option>
//                     <option value="Trung Bình" ${hs.danh_gia === 'Trung Bình' || hs.danh_gia === 'TB' ? 'selected' : ''}>😐 TB</option>
//                     <option value="Chưa đạt" ${hs.danh_gia === 'Chưa đạt' ? 'selected' : ''}>❌ Chưa đạt</option>
//                 </select>
//                 <input class="gvcn-input-note" value="${hs.ghi_chu || ''}" placeholder="Ghi chú..." style="flex: 1; min-width: 90px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none;">
                
//                 <div style="display:flex; align-items:center; gap:5px; background:#fff; padding:3px; border:1px solid #ced4da; border-radius:4px;">
//                     ${htmlAnh}
//                 </div>

//                 <button onclick="this.parentElement.remove()" style="padding: 6px 10px; background: #f8d7da; color: #dc3545; border: none; border-radius: 4px; cursor: pointer;" title="Xóa dòng học sinh">✖</button>
//             `;
//             khuvuc.appendChild(dongMoi);
//         });
//     } else {
//         if (typeof window.ham_21_3_them_dong_nguoi_nhan === 'function') window.ham_21_3_them_dong_nguoi_nhan();
//     }

//     // 3. Đổi giao diện Nút Lưu
//     let nutLuu = document.querySelector('button[onclick*="ham_21_13_luu_noi_dung_tuan"]');
//     if (nutLuu) {
//         nutLuu.innerHTML = '🔄 CẬP NHẬT NỘI DUNG ĐANG SỬA';
//         nutLuu.style.background = '#ffc107';
//         nutLuu.style.color = '#000';
//         nutLuu.style.boxShadow = '0 0 10px rgba(255, 193, 7, 0.5)';

//         if (!document.getElementById('btn-huy-sua-nd')) {
//             let nutHuy = document.createElement('button');
//             nutHuy.id = 'btn-huy-sua-nd';
//             nutHuy.innerHTML = '❌ Hủy Sửa';
//             nutHuy.style.cssText = 'padding: 10px 20px; background: #6c757d; color: white; border: none; border-radius: 6px; font-weight: bold; font-size:13px; cursor: pointer; margin-right: 10px;';
//             nutHuy.onclick = window.ham_21_27_huy_sua_noi_dung;
//             nutLuu.parentElement.insertBefore(nutHuy, nutLuu);
//         }
//     }

//     document.getElementById('gvcn-nd-ten').scrollIntoView({ behavior: 'smooth', block: 'center' });
//     document.getElementById('gvcn-nd-ten').focus();

//     // 🌟 4. XỬ LÝ KHUNG ẢNH CHUNG LỚN (ĐÃ TĂNG CHIỀU CAO LÊN 140PX)
//     window.gvcn_AnhNoiDungTam = [];
//     let vungAnh = document.getElementById('gvcn-vung-preview-anh-nd');
//     vungAnh.style.flexDirection = 'column';
//     vungAnh.style.alignItems = 'flex-start';

//     let htmlAnhChungCu = '';
//     if (item.anh_dinh_kem && item.anh_dinh_kem.length > 0) {
//         htmlAnhChungCu = `<div style="display:flex; gap:15px; margin-bottom:12px; padding-bottom:12px; border-bottom:1px dashed #ccc; width:100%; overflow-x:auto;">`;
//         item.anh_dinh_kem.forEach((linkAnh, i) => {
//             let fileId = null;
//             if (linkAnh.includes('/d/')) { let m = linkAnh.match(/\/d\/([a-zA-Z0-9_-]+)/); if (m) fileId = m[1]; }
//             else if (linkAnh.includes('id=')) { let m = linkAnh.match(/id=([a-zA-Z0-9_-]+)/); if (m) fileId = m[1]; }
//             // Tăng độ phân giải lên w800 để ảnh to không bị mờ
//             let srcTN = fileId ? `https://drive.google.com/thumbnail?id=${fileId}&sz=w800` : linkAnh;

//             htmlAnhChungCu += `
//                 <div style="position:relative; display:flex; flex-direction:column; align-items:center; background:#fff; padding:6px; border-radius:8px; border:1px solid #ced4da; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
//                     <a href="${linkAnh}" target="_blank" title="Bấm xem ảnh gốc">
//                         <img src="${srcTN}" style="height:140px; border-radius:6px; object-fit:contain; transition:0.2s;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
//                     </a>
//                     <span style="font-size:11px; color:#e83e8c; font-weight:bold; margin-top:6px;">Ảnh cũ ${i + 1}</span>
//                 </div>`;
//         });
//         htmlAnhChungCu += `</div>`;
//     }

//     vungAnh.innerHTML = htmlAnhChungCu + `<div style="display:flex; align-items:center; height:100%;"><span style="color:#00838f; font-style:italic;">(Bấm nút 📷 Tải ảnh chung bên trái để nối thêm ảnh mới...)</span></div>`;
// };



// window.ham_21_27_huy_sua_noi_dung = function () {
//     window.gvcn_IdNoiDungDangSua = null;
//     window.gvcn_TenNoiDungCu = '';

//     // Clear form
//     document.getElementById('gvcn-nd-ten').value = '';
//     document.getElementById('gvcn-nd-chitiet').value = '';
//     let khuvuc = document.getElementById('gvcn-khu-vuc-nguoi-nhan');
//     khuvuc.innerHTML = '';
//     if (typeof window.ham_21_3_them_dong_nguoi_nhan === 'function') window.ham_21_3_them_dong_nguoi_nhan();

//     window.gvcn_AnhNoiDungTam = [];
//     window.ham_21_9_render_anh('gvcn-vung-preview-anh-nd', window.gvcn_AnhNoiDungTam, 'nd');

//     // Phục hồi nút
//     let nutLuu = document.querySelector('button[onclick*="ham_21_13_luu_noi_dung_tuan"]');
//     if (nutLuu) {
//         nutLuu.innerHTML = '💾 THÊM CÔNG VIỆC MỚI VÀO MỤC 4';
//         nutLuu.style.background = '#0056b3';
//         nutLuu.style.color = '#fff';
//         nutLuu.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
//     }
//     let nutHuy = document.getElementById('btn-huy-sua-nd');
//     if (nutHuy) nutHuy.remove();
// };


// =====================================================================
// HÀM 21.26: ĐẨY DỮ LIỆU CŨ LÊN FORM ĐỂ SỬA (FIX LỖI CẮT ẢNH & KHOẢNG TRẮNG)
// =====================================================================
window.gvcn_IdNoiDungDangSua = null;
window.gvcn_TenNoiDungCu = '';

// window.ham_21_26_sua_noi_dung = function (id) {
//     if (!window.gvcn_DanhSachNoiDangHienTai) return;
//     let item = window.gvcn_DanhSachNoiDangHienTai.find(x => x.id === id);
//     if (!item) return;

//     window.gvcn_IdNoiDungDangSua = id;
//     window.gvcn_TenNoiDungCu = item.ten_noi_dung;

//     // 1. Nạp Thông tin chung
//     document.getElementById('gvcn-nd-ngay').value = item.ngay_nhap ? item.ngay_nhap.substring(0, 16) : '';
//     document.getElementById('gvcn-nd-ten').value = item.ten_noi_dung || '';
//     document.getElementById('gvcn-nd-chitiet').value = item.chi_tiet || '';

//     // 2. Clear danh sách học sinh hiện tại trên form và Nạp lại
//     let khuvuc = document.getElementById('gvcn-khu-vuc-nguoi-nhan');
//     khuvuc.innerHTML = '';

//     if (item.nguoi_nhan && item.nguoi_nhan.length > 0) {
//         item.nguoi_nhan.forEach(hs => {
//             let dongMoi = document.createElement('div');
//             dongMoi.className = 'dong-nguoi-nhan';
//             dongMoi.style.cssText = 'display: flex; gap: 8px; align-items: center; flex-wrap: wrap; background: #fffde7; padding: 6px; border-radius: 6px; border: 1px solid #fbc02d; margin-bottom:10px;';

//             let hsObj = window.DanhSachHocSinhLopHienTai ? window.DanhSachHocSinhLopHienTai.find(h => h.uid === hs.uid || h.tenHienThi === hs.ten) : null;
//             let avatar = hsObj ? hsObj.avatarUrl : '';
//             let valChonHS = hs.ten + (hs.ten_dang_nhap ? ` - ${hs.ten_dang_nhap}` : '');

//             let htmlAnh = '';
//             if (hs.anh_minh_chung) {
//                 dongMoi.dataset.anhCu = hs.anh_minh_chung;
//                 let fileId = null;
//                 if (hs.anh_minh_chung.includes('/d/')) { let m = hs.anh_minh_chung.match(/\/d\/([a-zA-Z0-9_-]+)/); if (m) fileId = m[1]; }
//                 else if (hs.anh_minh_chung.includes('id=')) { let m = hs.anh_minh_chung.match(/id=([a-zA-Z0-9_-]+)/); if (m) fileId = m[1]; }
//                 let srcTN = fileId ? `https://drive.google.com/thumbnail?id=${fileId}&sz=w400` : hs.anh_minh_chung;

//                 htmlAnh = `
//                     <button type="button" class="btn-anh-hs" onclick="this.nextElementSibling.click()" style="display:none; padding: 4px 8px; background: #e0f7fa; color: #00838f; border: 1px dashed #00acc1; border-radius: 4px; cursor: pointer; font-size:12px; font-weight:bold;" title="Đính kèm ảnh mới">📷 Ảnh</button>
//                     <input type="file" accept="image/*" class="input-anh-hs" style="display:none;" onchange="if(typeof window.ham_21_23_chon_anh_hs === 'function') window.ham_21_23_chon_anh_hs(this)">
//                     <img class="preview-anh-hs" src="${srcTN}" style="width:50px; height:50px; object-fit:cover; border-radius:4px; border:1px solid #00acc1; cursor:pointer; display:block; background:#fff; box-shadow:0 1px 3px rgba(0,0,0,0.1);" onclick="window.open('${hs.anh_minh_chung}', '_blank')" title="Bấm để xem ảnh gốc.\nNhấn nút ✖ bên cạnh để Xóa ảnh cũ này.">
//                     <button type="button" class="btn-xoa-anh-hs" onclick="if(typeof window.ham_21_24_xoa_anh_hs === 'function') window.ham_21_24_xoa_anh_hs(this)" style="display:block; background:none; border:none; color:#dc3545; cursor:pointer; font-size:16px; padding:0 3px;" title="Xóa ảnh cũ này">✖</button>
//                 `;
//             } else {
//                 htmlAnh = `
//                     <button type="button" class="btn-anh-hs" onclick="this.nextElementSibling.click()" style="padding: 4px 8px; background: #e0f7fa; color: #00838f; border: 1px dashed #00acc1; border-radius: 4px; cursor: pointer; font-size:12px; font-weight:bold;" title="Đính kèm ảnh minh chứng riêng">📷 Ảnh</button>
//                     <input type="file" accept="image/*" class="input-anh-hs" style="display:none;" onchange="if(typeof window.ham_21_23_chon_anh_hs === 'function') window.ham_21_23_chon_anh_hs(this)">
//                     <img class="preview-anh-hs" src="" style="width:50px; height:50px; object-fit:cover; border-radius:4px; border:1px solid #00acc1; cursor:pointer; display:none;" onclick="this.previousElementSibling.click()" title="Bấm để đổi ảnh">
//                     <button type="button" class="btn-xoa-anh-hs" onclick="if(typeof window.ham_21_24_xoa_anh_hs === 'function') window.ham_21_24_xoa_anh_hs(this)" style="display:none; background:none; border:none; color:#dc3545; cursor:pointer; font-size:16px; padding:0 3px;" title="Xóa ảnh">✖</button>
//                 `;
//             }

//             dongMoi.innerHTML = `
//                 <div style="display:flex; align-items:center; gap:8px; flex:1.5; min-width:160px; border:1px solid #ced4da; border-radius:4px; padding:4px 8px; background:#fff;">
//                     <img class="avatar-preview" src="${avatar}" style="width:24px; height:24px; border-radius:50%; object-fit:cover; display:${avatar ? 'block' : 'none'}; border:1px solid #eee;">
//                     <input class="gvcn-input-hs" value="${valChonHS}" placeholder="Chọn học sinh..." style="border:none; outline:none; flex:1; width:100%; font-size:12px; font-weight:bold; color:#1a73e8;">
//                 </div>
//                 <input class="gvcn-input-phan-viec" value="${hs.phan_viec || ''}" placeholder="Phần việc..." style="flex: 1.5; min-width: 110px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; font-weight:bold; outline: none;">
                
//                 <select class="gvcn-sel-trangthai" style="flex: 1; min-width: 90px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; background:#fff; cursor:pointer;">
//                     <option value="Chưa làm" ${hs.trang_thai === 'Chưa làm' ? 'selected' : ''}>❌ Chưa làm</option>
//                     <option value="Đang làm" ${hs.trang_thai === 'Đang làm' ? 'selected' : ''}>⏳ Đang làm</option>
//                     <option value="Chưa xong" ${hs.trang_thai === 'Chưa xong' ? 'selected' : ''}>⚠️ Chưa xong</option>
//                     <option value="Đã xong" ${hs.trang_thai === 'Đã xong' ? 'selected' : ''}>✅ Đã xong</option>
//                 </select>

//                 <select class="gvcn-sel-danhgia" style="flex: 1; min-width: 90px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; background:#fff; cursor:pointer;">
//                     <option value="" ${!hs.danh_gia ? 'selected' : ''}>Chưa đánh giá</option>
//                     <option value="Tốt" ${hs.danh_gia === 'Tốt' ? 'selected' : ''}>🌟 Tốt</option>
//                     <option value="Khá" ${hs.danh_gia === 'Khá' ? 'selected' : ''}>👍 Khá</option>
//                     <option value="Trung Bình" ${hs.danh_gia === 'Trung Bình' || hs.danh_gia === 'TB' ? 'selected' : ''}>😐 TB</option>
//                     <option value="Chưa đạt" ${hs.danh_gia === 'Chưa đạt' ? 'selected' : ''}>❌ Chưa đạt</option>
//                 </select>
//                 <input class="gvcn-input-note" value="${hs.ghi_chu || ''}" placeholder="Ghi chú..." style="flex: 1; min-width: 90px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none;">
                
//                 <div style="display:flex; align-items:center; gap:5px; background:#fff; padding:3px; border:1px solid #ced4da; border-radius:4px;">
//                     ${htmlAnh}
//                 </div>

//                 <button onclick="this.parentElement.remove()" style="padding: 6px 10px; background: #f8d7da; color: #dc3545; border: none; border-radius: 4px; cursor: pointer;" title="Xóa dòng học sinh">✖</button>
//             `;
//             khuvuc.appendChild(dongMoi);
//         });
//     } else {
//         if (typeof window.ham_21_3_them_dong_nguoi_nhan === 'function') window.ham_21_3_them_dong_nguoi_nhan();
//     }

//     // 3. Đổi giao diện Nút Lưu
//     let nutLuu = document.querySelector('button[onclick*="ham_21_13_luu_noi_dung_tuan"]');
//     if (nutLuu) {
//         nutLuu.innerHTML = '🔄 CẬP NHẬT NỘI DUNG ĐANG SỬA';
//         nutLuu.style.background = '#ffc107';
//         nutLuu.style.color = '#000';
//         nutLuu.style.boxShadow = '0 0 10px rgba(255, 193, 7, 0.5)';

//         if (!document.getElementById('btn-huy-sua-nd')) {
//             let nutHuy = document.createElement('button');
//             nutHuy.id = 'btn-huy-sua-nd';
//             nutHuy.innerHTML = '❌ Hủy Sửa';
//             nutHuy.style.cssText = 'padding: 10px 20px; background: #6c757d; color: white; border: none; border-radius: 6px; font-weight: bold; font-size:13px; cursor: pointer; margin-right: 10px;';
//             nutHuy.onclick = window.ham_21_27_huy_sua_noi_dung;
//             nutLuu.parentElement.insertBefore(nutHuy, nutLuu);
//         }
//     }

//     document.getElementById('gvcn-nd-ten').scrollIntoView({ behavior: 'smooth', block: 'center' });
//     document.getElementById('gvcn-nd-ten').focus();

//     // 🌟 4. XỬ LÝ KHUNG ẢNH CHUNG LỚN 
//     window.gvcn_AnhNoiDungTam = [];
//     let vungAnh = document.getElementById('gvcn-vung-preview-anh-nd');

//     // Reset css để không bị bóp nghẹt
//     vungAnh.style.flexDirection = 'column';
//     vungAnh.style.alignItems = 'stretch';
//     vungAnh.style.padding = '10px';

//     let htmlAnhChungCu = '';
//     if (item.anh_dinh_kem && item.anh_dinh_kem.length > 0) {
//         htmlAnhChungCu = `<div style="display:flex; gap:15px; margin-bottom:10px; padding-bottom:10px; border-bottom:1px dashed #ced4da; width:100%; overflow-x:auto; overflow-y:hidden; align-items:flex-start;">`;
//         item.anh_dinh_kem.forEach((linkAnh, i) => {
//             let fileId = null;
//             if (linkAnh.includes('/d/')) { let m = linkAnh.match(/\/d\/([a-zA-Z0-9_-]+)/); if (m) fileId = m[1]; }
//             else if (linkAnh.includes('id=')) { let m = linkAnh.match(/id=([a-zA-Z0-9_-]+)/); if (m) fileId = m[1]; }
//             let srcTN = fileId ? `https://drive.google.com/thumbnail?id=${fileId}&sz=w800` : linkAnh;

//             // Dùng flex: 0 0 auto để ảnh không bị bóp nhỏ
//             htmlAnhChungCu += `
//                 <div style="flex: 0 0 auto; position:relative; display:flex; flex-direction:column; align-items:center; background:#fff; padding:6px; border-radius:8px; border:1px solid #ced4da; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
//                     <a href="${linkAnh}" target="_blank" title="Bấm xem ảnh gốc">
//                         <img src="${srcTN}" style="height:150px; width:auto; border-radius:6px; object-fit:contain; transition:0.2s;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
//                     </a>
//                     <span style="font-size:11px; color:#e83e8c; font-weight:bold; margin-top:6px;">Ảnh cũ ${i + 1}</span>
//                 </div>`;
//         });
//         htmlAnhChungCu += `</div>`;
//     }

//     vungAnh.innerHTML = htmlAnhChungCu + `<div style="padding: 5px 0;"><span style="color:#00838f; font-style:italic; font-size:12px;">(Bấm nút 📷 Tải ảnh chung bên trái để nối thêm ảnh mới...)</span></div>`;
// };

// // =====================================================================
// // HÀM 21.27: HỦY SỬA (TRẢ VỀ GIAO DIỆN BÌNH THƯỜNG CỦA KHUNG ẢNH)
// // =====================================================================
// window.ham_21_27_huy_sua_noi_dung = function () {
//     window.gvcn_IdNoiDungDangSua = null;
//     window.gvcn_TenNoiDungCu = '';

//     // Clear form
//     document.getElementById('gvcn-nd-ten').value = '';
//     document.getElementById('gvcn-nd-chitiet').value = '';
//     let khuvuc = document.getElementById('gvcn-khu-vuc-nguoi-nhan');
//     khuvuc.innerHTML = '';
//     if (typeof window.ham_21_3_them_dong_nguoi_nhan === 'function') window.ham_21_3_them_dong_nguoi_nhan();

//     // Trả css của khung ảnh về như ban đầu
//     window.gvcn_AnhNoiDungTam = [];
//     let vungAnh = document.getElementById('gvcn-vung-preview-anh-nd');
//     vungAnh.style.flexDirection = 'row';
//     vungAnh.style.alignItems = 'center';
//     vungAnh.style.padding = '8px';
//     window.ham_21_9_render_anh('gvcn-vung-preview-anh-nd', window.gvcn_AnhNoiDungTam, 'nd');

//     // Phục hồi nút
//     let nutLuu = document.querySelector('button[onclick*="ham_21_13_luu_noi_dung_tuan"]');
//     if (nutLuu) {
//         nutLuu.innerHTML = '💾 THÊM CÔNG VIỆC MỚI VÀO MỤC 4';
//         nutLuu.style.background = '#0056b3';
//         nutLuu.style.color = '#fff';
//         nutLuu.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
//     }
//     let nutHuy = document.getElementById('btn-huy-sua-nd');
//     if (nutHuy) nutHuy.remove();
// };


// =====================================================================
// HÀM 21.26: ĐẨY DỮ LIỆU CŨ LÊN FORM ĐỂ SỬA
// =====================================================================
window.gvcn_IdNoiDungDangSua = null;
window.gvcn_TenNoiDungCu = '';

window.ham_21_26_sua_noi_dung = function (id) {
    if (!window.gvcn_DanhSachNoiDangHienTai) return;
    let item = window.gvcn_DanhSachNoiDangHienTai.find(x => x.id === id);
    if (!item) return;

    window.gvcn_IdNoiDungDangSua = id;
    window.gvcn_TenNoiDungCu = item.ten_noi_dung;

    document.getElementById('gvcn-nd-ngay').value = item.ngay_nhap ? item.ngay_nhap.substring(0, 16) : '';
    document.getElementById('gvcn-nd-ten').value = item.ten_noi_dung || '';
    document.getElementById('gvcn-nd-chitiet').value = item.chi_tiet || '';

    let khuvuc = document.getElementById('gvcn-khu-vuc-nguoi-nhan');
    khuvuc.innerHTML = '';

    if (item.nguoi_nhan && item.nguoi_nhan.length > 0) {
        item.nguoi_nhan.forEach(hs => {
            let dongMoi = document.createElement('div');
            dongMoi.className = 'dong-nguoi-nhan';
            dongMoi.style.cssText = 'display: flex; gap: 8px; align-items: center; flex-wrap: wrap; background: #fffde7; padding: 6px; border-radius: 6px; border: 1px solid #fbc02d; margin-bottom:10px;';

            let hsObj = window.DanhSachHocSinhLopHienTai ? window.DanhSachHocSinhLopHienTai.find(h => h.uid === hs.uid || h.tenHienThi === hs.ten) : null;
            let avatar = hsObj ? hsObj.avatarUrl : '';
            let valChonHS = hs.ten + (hs.ten_dang_nhap ? ` - ${hs.ten_dang_nhap}` : '');

            let htmlAnh = '';
            if (hs.anh_minh_chung) {
                dongMoi.dataset.anhCu = hs.anh_minh_chung;
                let fileId = null;
                if (hs.anh_minh_chung.includes('/d/')) { let m = hs.anh_minh_chung.match(/\/d\/([a-zA-Z0-9_-]+)/); if (m) fileId = m[1]; }
                else if (hs.anh_minh_chung.includes('id=')) { let m = hs.anh_minh_chung.match(/id=([a-zA-Z0-9_-]+)/); if (m) fileId = m[1]; }
                let srcTN = fileId ? `https://drive.google.com/thumbnail?id=${fileId}&sz=w400` : hs.anh_minh_chung;

                htmlAnh = `
                    <button type="button" class="btn-anh-hs" onclick="this.nextElementSibling.click()" style="display:none; padding: 4px 8px; background: #e0f7fa; color: #00838f; border: 1px dashed #00acc1; border-radius: 4px; cursor: pointer; font-size:12px; font-weight:bold;" title="Đính kèm ảnh mới">📷 Ảnh</button>
                    <input type="file" accept="image/*" class="input-anh-hs" style="display:none;" onchange="if(typeof window.ham_21_23_chon_anh_hs === 'function') window.ham_21_23_chon_anh_hs(this)">
                    <img class="preview-anh-hs" src="${srcTN}" style="width:50px; height:50px; object-fit:cover; border-radius:4px; border:1px solid #00acc1; cursor:pointer; display:block; background:#fff; box-shadow:0 1px 3px rgba(0,0,0,0.1);" onclick="window.open('${hs.anh_minh_chung}', '_blank')" title="Bấm để xem ảnh gốc.\nNhấn nút ✖ bên cạnh để Xóa ảnh cũ này.">
                    <button type="button" class="btn-xoa-anh-hs" onclick="if(typeof window.ham_21_24_xoa_anh_hs === 'function') window.ham_21_24_xoa_anh_hs(this)" style="display:block; background:none; border:none; color:#dc3545; cursor:pointer; font-size:16px; padding:0 3px;" title="Xóa ảnh cũ này">✖</button>
                `;
            } else {
                htmlAnh = `
                    <button type="button" class="btn-anh-hs" onclick="this.nextElementSibling.click()" style="padding: 4px 8px; background: #e0f7fa; color: #00838f; border: 1px dashed #00acc1; border-radius: 4px; cursor: pointer; font-size:12px; font-weight:bold;" title="Đính kèm ảnh minh chứng riêng">📷 Ảnh</button>
                    <input type="file" accept="image/*" class="input-anh-hs" style="display:none;" onchange="if(typeof window.ham_21_23_chon_anh_hs === 'function') window.ham_21_23_chon_anh_hs(this)">
                    <img class="preview-anh-hs" src="" style="width:50px; height:50px; object-fit:cover; border-radius:4px; border:1px solid #00acc1; cursor:pointer; display:none;" onclick="this.previousElementSibling.click()" title="Bấm để đổi ảnh">
                    <button type="button" class="btn-xoa-anh-hs" onclick="if(typeof window.ham_21_24_xoa_anh_hs === 'function') window.ham_21_24_xoa_anh_hs(this)" style="display:none; background:none; border:none; color:#dc3545; cursor:pointer; font-size:16px; padding:0 3px;" title="Xóa ảnh">✖</button>
                `;
            }

            dongMoi.innerHTML = `
                <div style="display:flex; align-items:center; gap:8px; flex:1.5; min-width:160px; border:1px solid #ced4da; border-radius:4px; padding:4px 8px; background:#fff;">
                    <img class="avatar-preview" src="${avatar}" style="width:24px; height:24px; border-radius:50%; object-fit:cover; display:${avatar ? 'block' : 'none'}; border:1px solid #eee;">
                    <input class="gvcn-input-hs" value="${valChonHS}" placeholder="Chọn học sinh..." style="border:none; outline:none; flex:1; width:100%; font-size:12px; font-weight:bold; color:#1a73e8;">
                </div>
                <input class="gvcn-input-phan-viec" value="${hs.phan_viec || ''}" placeholder="Phần việc..." style="flex: 1.5; min-width: 110px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; font-weight:bold; outline: none;">
                
                <select class="gvcn-sel-trangthai" style="flex: 1; min-width: 90px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; background:#fff; cursor:pointer;">
                    <option value="Chưa làm" ${hs.trang_thai === 'Chưa làm' ? 'selected' : ''}>❌ Chưa làm</option>
                    <option value="Đang làm" ${hs.trang_thai === 'Đang làm' ? 'selected' : ''}>⏳ Đang làm</option>
                    <option value="Chưa xong" ${hs.trang_thai === 'Chưa xong' ? 'selected' : ''}>⚠️ Chưa xong</option>
                    <option value="Đã xong" ${hs.trang_thai === 'Đã xong' ? 'selected' : ''}>✅ Đã xong</option>
                </select>

                <select class="gvcn-sel-danhgia" style="flex: 1; min-width: 90px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; background:#fff; cursor:pointer;">
                    <option value="" ${!hs.danh_gia ? 'selected' : ''}>Chưa đánh giá</option>
                    <option value="Tốt" ${hs.danh_gia === 'Tốt' ? 'selected' : ''}>🌟 Tốt</option>
                    <option value="Khá" ${hs.danh_gia === 'Khá' ? 'selected' : ''}>👍 Khá</option>
                    <option value="Trung Bình" ${hs.danh_gia === 'Trung Bình' || hs.danh_gia === 'TB' ? 'selected' : ''}>😐 TB</option>
                    <option value="Chưa đạt" ${hs.danh_gia === 'Chưa đạt' ? 'selected' : ''}>❌ Chưa đạt</option>
                </select>
                <input class="gvcn-input-note" value="${hs.ghi_chu || ''}" placeholder="Ghi chú..." style="flex: 1; min-width: 90px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none;">
                
                <div style="display:flex; align-items:center; gap:5px; background:#fff; padding:3px; border:1px solid #ced4da; border-radius:4px;">
                    ${htmlAnh}
                </div>

                <button type="button" onclick="this.parentElement.remove()" style="padding: 6px 10px; background: #f8d7da; color: #dc3545; border: none; border-radius: 4px; cursor: pointer;" title="Xóa dòng học sinh">✖</button>
            `;
            khuvuc.appendChild(dongMoi);
        });
    } else {
        if (typeof window.ham_21_3_them_dong_nguoi_nhan === 'function') window.ham_21_3_them_dong_nguoi_nhan();
    }

    let nutLuu = document.querySelector('button[onclick*="ham_21_13_luu_noi_dung_tuan"]');
    if (nutLuu) {
        nutLuu.innerHTML = '🔄 CẬP NHẬT NỘI DUNG ĐANG SỬA';
        nutLuu.style.background = '#ffc107';
        nutLuu.style.color = '#000';
        nutLuu.style.boxShadow = '0 0 10px rgba(255, 193, 7, 0.5)';

        if (!document.getElementById('btn-huy-sua-nd')) {
            let nutHuy = document.createElement('button');
            nutHuy.id = 'btn-huy-sua-nd';
            nutHuy.innerHTML = '❌ Hủy Sửa';
            nutHuy.style.cssText = 'padding: 10px 20px; background: #6c757d; color: white; border: none; border-radius: 6px; font-weight: bold; font-size:13px; cursor: pointer; margin-right: 10px;';
            nutHuy.onclick = window.ham_21_27_huy_sua_noi_dung;
            nutLuu.parentElement.insertBefore(nutHuy, nutLuu);
        }
    }

    document.getElementById('gvcn-nd-ten').scrollIntoView({ behavior: 'smooth', block: 'center' });
    document.getElementById('gvcn-nd-ten').focus();

    // 🌟 GÁN MẢNG ẢNH CŨ VÀ KÍCH HOẠT HÀM RENDER
    window.gvcn_AnhNoiDungCuTam = item.anh_dinh_kem ? [...item.anh_dinh_kem] : [];
    window.gvcn_AnhNoiDungTam = [];
    window.ham_21_9_render_anh('gvcn-vung-preview-anh-nd', window.gvcn_AnhNoiDungTam, 'nd');
};

// =====================================================================
// HÀM 21.27: HỦY SỬA (LÀM SẠCH BIẾN LƯU TẠM VÀ TRẢ LẠI UI)
// =====================================================================
window.ham_21_27_huy_sua_noi_dung = function () {
    window.gvcn_IdNoiDungDangSua = null;
    window.gvcn_TenNoiDungCu = '';

    document.getElementById('gvcn-nd-ten').value = '';
    document.getElementById('gvcn-nd-chitiet').value = '';
    let khuvuc = document.getElementById('gvcn-khu-vuc-nguoi-nhan');
    khuvuc.innerHTML = '';
    if (typeof window.ham_21_3_them_dong_nguoi_nhan === 'function') window.ham_21_3_them_dong_nguoi_nhan();

    // Xóa biến ảnh cũ và render lại
    window.gvcn_AnhNoiDungCuTam = [];
    window.gvcn_AnhNoiDungTam = [];
    window.ham_21_9_render_anh('gvcn-vung-preview-anh-nd', window.gvcn_AnhNoiDungTam, 'nd');

    let nutLuu = document.querySelector('button[onclick*="ham_21_13_luu_noi_dung_tuan"]');
    if (nutLuu) {
        nutLuu.innerHTML = '💾 THÊM CÔNG VIỆC MỚI VÀO MỤC 4';
        nutLuu.style.background = '#0056b3';
        nutLuu.style.color = '#fff';
        nutLuu.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
    }
    let nutHuy = document.getElementById('btn-huy-sua-nd');
    if (nutHuy) nutHuy.remove();
};




// =====================================================================
// HÀM 21.28: RENDER DANH SÁCH ẢNH TUẦN CŨ (CÓ NÚT XÓA)
// =====================================================================
window.ham_21_28_render_anh_tuan_cu = function () {
    let vungAnhCu = document.getElementById('gvcn-vung-anh-cu-tuan');
    if (!vungAnhCu) return;

    if (window.gvcn_AnhTuanCuTam && window.gvcn_AnhTuanCuTam.length > 0) {
        vungAnhCu.style.flexDirection = 'column';
        vungAnhCu.style.alignItems = 'stretch';

        let htmlAnhCu = '<div style="width:100%; font-size:12px; color:#28a745; font-weight:bold; margin-bottom:10px;">✅ Ảnh đã lưu (Nhấn ✖ để xóa bớt, thay đổi áp dụng khi bấm LƯU):</div>';
        let danhSachHtml = '<div style="display:flex; gap:15px; margin-bottom:5px; padding-bottom:12px; border-bottom:1px dashed #ccc; width:100%; overflow-x:auto;">';

        window.gvcn_AnhTuanCuTam.forEach((linkAnh, i) => {
            let fileId = null;
            if (linkAnh.includes('/d/')) { let m = linkAnh.match(/\/d\/([a-zA-Z0-9_-]+)/); if (m) fileId = m[1]; }
            else if (linkAnh.includes('id=')) { let m = linkAnh.match(/id=([a-zA-Z0-9_-]+)/); if (m) fileId = m[1]; }
            let srcTN = fileId ? `https://drive.google.com/thumbnail?id=${fileId}&sz=w800` : linkAnh;

            danhSachHtml += `
            <div style="flex: 0 0 auto; position:relative; display:flex; flex-direction:column; align-items:center; background:#fff; padding:6px; border-radius:8px; border:1px solid #ced4da; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                <button type="button" onclick="window.gvcn_AnhTuanCuTam.splice(${i}, 1); window.ham_21_28_render_anh_tuan_cu(); document.getElementById('gvcn-nhac-nho-luu-anh-tuan').style.display='block';" style="position:absolute; top:-8px; right:-8px; background:#dc3545; color:white; border:none; border-radius:50%; width:24px; height:24px; font-size:14px; font-weight:bold; cursor:pointer; box-shadow:0 1px 3px rgba(0,0,0,0.3); display:flex; align-items:center; justify-content:center; z-index:10;" title="Xóa ảnh cũ này">✖</button>
                <a href="${linkAnh}" target="_blank" title="Bấm xem ảnh gốc">
                    <img src="${srcTN}" onerror="this.onerror=null; this.src='${linkAnh}';" style="height:150px; width:auto; border-radius:6px; object-fit:contain; transition:0.2s;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
                </a>
                <span style="font-size:11px; color:#e83e8c; font-weight:bold; margin-top:6px;">Ảnh cũ ${i + 1}</span>
            </div>`;
        });
        danhSachHtml += `</div>`;
        danhSachHtml += `<div id="gvcn-nhac-nho-luu-anh-tuan" style="display:none; color:#dc3545; font-size:12px; font-style:italic; font-weight:bold; width:100%; margin-bottom: 10px;">⚠️ Đã có ảnh cũ bị xóa. Hãy bấm "LƯU CHUNG MỤC 2 & MỤC 3" để cập nhật thay đổi!</div>`;

        vungAnhCu.innerHTML = htmlAnhCu + danhSachHtml;
    } else {
        vungAnhCu.innerHTML = '';
    }
};





// =====================================================================
// HÀM 21.29 & 21.30: ĐIỀU HƯỚNG LÙI/TIẾN VÀ TÍNH NGÀY CHO MỤC 5
// =====================================================================
window.ham_21_29_chuyen_tuan_su_kien = function (buocNnhay) {
    let inputTuan = document.getElementById('gvcn-sk-tuan-chon');
    if (!inputTuan) return;
    let val = inputTuan.value.trim();
    let soTuan = 1;
    if (val.toLowerCase().includes('tuần')) {
        let num = parseInt(val.replace(/\D/g, ''));
        if (!isNaN(num)) soTuan = num;
    }
    soTuan += buocNnhay;
    if (soTuan < 1) soTuan = 1;
    if (soTuan > 37) soTuan = 37;

    inputTuan.value = `Tuần ${soTuan}`;
    if (typeof window.ham_21_30_cap_nhat_ngay_tuan_su_kien === 'function') {
        window.ham_21_30_cap_nhat_ngay_tuan_su_kien();
    }
};

window.ham_21_30_cap_nhat_ngay_tuan_su_kien = function () {
    let inputTuan = document.getElementById('gvcn-sk-tuan-chon');
    let tuNgayInput = document.getElementById('gvcn-sk-tuan-tu');
    let denNgayInput = document.getElementById('gvcn-sk-tuan-den');
    if (!inputTuan || !tuNgayInput || !denNgayInput) return;

    let val = inputTuan.value.trim();
    let soTuan = parseInt(val.replace(/\D/g, ''));
    if (isNaN(soTuan)) return;

    // Lấy ngày bắt đầu của tuần 1 từ Mục 1 (hoặc mặc định lấy ngày hiện tại)
    let tuan1Tu = document.getElementById('gvcn-tuan-tu').value;
    let d = tuan1Tu ? new Date(tuan1Tu) : new Date();

    // Cộng dồn 7 ngày cho mỗi tuần tiếp theo
    d.setDate(d.getDate() + (soTuan - 1) * 7);
    let monday = d.toISOString().split('T')[0];

    let d2 = new Date(d);
    d2.setDate(d2.getDate() + 6);
    let sunday = d2.toISOString().split('T')[0];

    tuNgayInput.value = monday;
    denNgayInput.value = sunday;
};


// window.ham_21_31_them_hs_cho_su_kien = function (btn) {
//     let vungHS = btn.closest('.sk-vung-hoc-sinh');
//     if (!vungHS) return;
//     let dongMoi = document.createElement('div');
//     dongMoi.style.cssText = 'display:flex; align-items:center; gap:6px; margin-top:4px;';
//     dongMoi.innerHTML = `
//         <div style="display:flex; align-items:center; gap:6px; flex:1; border:2px solid #e83e8c; border-radius:4px; padding:4px 8px; background:#fdf5f8;">
//             <img class="avatar-preview" src="" style="width:22px; height:22px; border-radius:50%; object-fit:cover; display:none; border:1px solid #eee;">
//             <input class="sk-hs" placeholder="👤 Chọn học sinh tiếp theo..." style="border:none; outline:none; flex:1; width:100%; font-size:12px; font-weight:bold; background:transparent; color:#e83e8c;">
//         </div>
//         <button type="button" onclick="this.parentElement.remove()" style="padding: 4px 8px; background: #f8d7da; color: #dc3545; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;">✖</button>
//     `;
//     vungHS.appendChild(dongMoi);
// };



// // =====================================================================
// // HÀM 21.31: THÊM DÒNG HỌC SINH CÙNG SỰ KIỆN (COPY DỮ LIỆU CỦA DÒNG TRÊN)
// // =====================================================================
// window.ham_21_31_them_hs_cho_su_kien = function (btn) {
//     let dongLon = btn.closest('.dong-nhap-su-kien');
//     if (!dongLon) return;
//     let vungDS = dongLon.querySelector('.sk-vung-danh-sach-hs');
//     if (!vungDS) return;

//     // Lấy thông tin từ dòng đầu tiên làm mẫu
//     let dongDau = vungDS.querySelector('.dong-chi-tiet-hs');
//     let ngayVal = dongDau ? dongDau.querySelector('.sk-ngay').value : new Date().toISOString().split('T')[0];
//     let thuVal = dongDau ? dongDau.querySelector('.sk-thu').value : '';
//     let buoiVal = dongDau ? dongDau.querySelector('.sk-buoi').value : 'Sáng';
//     let diemVal = dongDau ? dongDau.querySelector('.sk-diem-tru').value : '0';

//     let dongMoi = document.createElement('div');
//     dongMoi.className = 'dong-chi-tiet-hs';
//     dongMoi.style.cssText = 'background: #fdf5f8; padding: 10px; border-radius: 6px; border: 1px dashed #e83e8c; display: flex; flex-direction: column; gap: 8px; animation: fadeIn 0.2s;';

//     dongMoi.innerHTML = `
//         <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
//             <span style="font-size:11px; font-weight:bold; color:#495057;">Ngày:</span>
//             <input type="date" class="sk-ngay" value="${ngayVal}" onchange="let thu = window.ham_21_39_lay_thu_trong_tuần ? window.ham_21_39_lay_thu_trong_tuần(this.value) : ''; this.closest('.dong-chi-tiet-hs').querySelector('.sk-thu').value = thu;" style="width: 125px; padding: 6px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; font-weight:bold;">
            
//             <input type="text" class="sk-thu" value="${thuVal}" readonly style="width: 70px; padding: 6px; border: 1px solid #e9ecef; border-radius: 4px; font-size: 12px; font-weight: bold; background: #e9ecef; color: #495057; text-align: center;">

//             <select class="sk-buoi" style="width: 80px; padding: 6px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; cursor:pointer;">
//                 <option value="Sáng" ${buoiVal === 'Sáng' ? 'selected' : ''}>Sáng</option>
//                 <option value="Trưa" ${buoiVal === 'Trưa' ? 'selected' : ''}>Trưa</option>
//                 <option value="Chiều" ${buoiVal === 'Chiều' ? 'selected' : ''}>Chiều</option>
//                 <option value="Tối" ${buoiVal === 'Tối' ? 'selected' : ''}>Tối</option>
//             </select>

//             <div style="display:flex; align-items:center; gap:6px; flex:1.5; min-width:180px; border:2px solid #e83e8c; border-radius:4px; padding:3px 6px; background:#fff;">
//                 <img class="avatar-preview" src="" style="width:20px; height:20px; border-radius:50%; object-fit:cover; display:none; border:1px solid #eee;">
//                 <input class="sk-hs" placeholder="👤 Chọn học sinh tiếp theo..." style="border:none; outline:none; flex:1; width:100%; font-size:12px; font-weight:bold; background:transparent; color:#e83e8c;">
//             </div>

//             <div style="display: flex; align-items: center; gap: 4px; background: #fff3cd; padding: 3px 6px; border: 1px solid #ffeeba; border-radius: 4px;">
//                 <span style="font-size: 11px; font-weight: bold; color: #856404;">Trừ:</span>
//                 <input type="number" step="0.5" class="sk-diem-tru" value="${diemVal}" style="width: 50px; padding: 3px; border: 1px solid #ccc; border-radius: 4px; font-size: 12px; font-weight: bold; color: #dc3545; text-align: center; outline: none;" title="Điểm trừ riêng cho học sinh này">
//             </div>

//             <button type="button" onclick="this.closest('.dong-chi-tiet-hs').remove()" style="padding: 6px 8px; background: #f8d7da; color: #dc3545; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;" title="Xóa học sinh này">✖</button>
//         </div>
//     `;
//     vungDS.appendChild(dongMoi);
//     if (typeof window.ham_20_7_tai_danh_sach_lop === 'function') {
//         window.ham_20_7_tai_danh_sach_lop();
//     }
// };


// // =====================================================================
// // HÀM 21.31: THÊM DÒNG HỌC SINH MỚI CÙNG SỰ KIỆN (ĐẦY ĐỦ CÁC CỘT NGÀY, THỨ, BUỔI, ĐIỂM)
// // =====================================================================
// window.ham_21_31_them_hs_cho_su_kien = function (btn) {
//     let dongLon = btn.closest('.dong-nhap-su-kien');
//     if (!dongLon) return;
//     let vungDS = dongLon.querySelector('.sk-vung-danh-sach-hs');
//     if (!vungDS) return;

//     let dongDau = vungDS.querySelector('.dong-chi-tiet-hs');
//     let ngayVal = dongDau ? dongDau.querySelector('.sk-ngay').value : new Date().toISOString().split('T')[0];
//     let thuVal = dongDau ? dongDau.querySelector('.sk-thu').value : '';
//     let buoiVal = dongDau ? dongDau.querySelector('.sk-buoi').value : 'Sáng';
//     let diemVal = dongDau ? dongDau.querySelector('.sk-diem-tru').value : '0';

//     let dongMoi = document.createElement('div');
//     dongMoi.className = 'dong-chi-tiet-hs';
//     dongMoi.style.cssText = 'background: #fdf5f8; padding: 10px; border-radius: 6px; border: 1px dashed #e83e8c; display: flex; gap: 8px; align-items: center; flex-wrap: wrap; animation: fadeIn 0.2s;';

//     dongMoi.innerHTML = `
//         <div style="display: flex; flex-direction: column;">
//             <span style="font-size: 10px; color: #666; font-weight: bold;">Ngày:</span>
//             <input type="date" class="sk-ngay" value="${ngayVal}" onchange="let thu = window.ham_21_39_lay_thu_trong_tuần ? window.ham_21_39_lay_thu_trong_tuần(this.value) : ''; this.closest('.dong-chi-tiet-hs').querySelector('.sk-thu').value = thu;" style="width: 120px; padding: 6px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; font-weight:bold;">
//         </div>

//         <div style="display: flex; flex-direction: column;">
//             <span style="font-size: 10px; color: #666; font-weight: bold;">Thứ:</span>
//             <input type="text" class="sk-thu" value="${thuVal}" readonly style="width: 70px; padding: 6px; border: 1px solid #e9ecef; border-radius: 4px; font-size: 12px; font-weight: bold; background: #e9ecef; color: #495057; text-align: center;">
//         </div>

//         <div style="display: flex; flex-direction: column;">
//             <span style="font-size: 10px; color: #666; font-weight: bold;">Buổi:</span>
//             <select class="sk-buoi" style="width: 75px; padding: 6px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; cursor:pointer;">
//                 <option value="Sáng" ${buoiVal === 'Sáng' ? 'selected' : ''}>Sáng</option>
//                 <option value="Trưa" ${buoiVal === 'Trưa' ? 'selected' : ''}>Trưa</option>
//                 <option value="Chiều" ${buoiVal === 'Chiều' ? 'selected' : ''}>Chiều</option>
//                 <option value="Tối" ${buoiVal === 'Tối' ? 'selected' : ''}>Tối</option>
//             </select>
//         </div>

//         <div style="display: flex; flex-direction: column; flex: 1.5; min-width: 180px;">
//             <span style="font-size: 10px; color: #666; font-weight: bold;">Học sinh:</span>
//             <div style="display:flex; align-items:center; gap:6px; border:2px solid #e83e8c; border-radius:4px; padding:3px 6px; background:#fff;">
//                 <img class="avatar-preview" src="" style="width:20px; height:20px; border-radius:50%; object-fit:cover; display:none; border:1px solid #eee;">
//                 <input class="sk-hs" placeholder="👤 Chọn học sinh tiếp theo..." style="border:none; outline:none; flex:1; width:100%; font-size:12px; font-weight:bold; background:transparent; color:#e83e8c;">
//             </div>
//         </div>

//         <div style="display: flex; flex-direction: column;">
//             <span style="font-size: 10px; color: #666; font-weight: bold;">Điểm trừ:</span>
//             <input type="number" step="0.5" class="sk-diem-tru" value="${diemVal}" style="width: 60px; padding: 6px; border: 1px solid #ffeeba; background: #fff3cd; border-radius: 4px; font-size: 12px; font-weight: bold; color: #dc3545; text-align: center; outline: none;">
//         </div>

//         <div style="display: flex; flex-direction: column; flex: 1.5; min-width: 150px;">
//             <span style="font-size: 10px; color: #666; font-weight: bold;">Ghi chú riêng:</span>
//             <input class="sk-ghichu" placeholder="Ghi chú..." style="width: 100%; padding: 6px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; box-sizing: border-box;">
//         </div>

//         <div style="display: flex; align-items: flex-end; height: 100%; padding-top: 15px;">
//             <button type="button" onclick="this.closest('.dong-chi-tiet-hs').remove()" style="padding: 6px 8px; background: #f8d7da; color: #dc3545; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;" title="Xóa học sinh này">✖</button>
//         </div>
//     `;
//     vungDS.appendChild(dongMoi);
//     if (typeof window.ham_20_7_tai_danh_sach_lop === 'function') {
//         window.ham_20_7_tai_danh_sach_lop();
//     }
// };

// =====================================================================
// HÀM 21.31: THÊM MỘT DÒNG NGANG MỚI NGAY BÊN DƯỚI (ĐẦY ĐỦ CỘT CHO HỌC SINH TIẾP THEO)
// =====================================================================
window.ham_21_31_them_hs_cho_su_kien = function (btn) {
    let dongLon = btn.closest('.dong-nhap-su-kien');
    if (!dongLon) return;
    let vungDS = dongLon.querySelector('.sk-vung-danh-sach-hs');
    if (!vungDS) return;

    let dongDau = vungDS.querySelector('.dong-chi-tiet-hs');
    let ngayVal = dongDau ? dongDau.querySelector('.sk-ngay').value : new Date().toISOString().split('T')[0];
    let thuVal = dongDau ? dongDau.querySelector('.sk-thu').value : '';
    let buoiVal = dongDau ? dongDau.querySelector('.sk-buoi').value : 'Sáng';
    let diemVal = dongDau ? dongDau.querySelector('.sk-diem-tru').value : '0';

    let dongMoi = document.createElement('div');
    dongMoi.className = 'dong-chi-tiet-hs';
    dongMoi.style.cssText = 'background: #fdf5f8; padding: 10px; border-radius: 6px; border: 1px dashed #e83e8c; display: flex; gap: 8px; align-items: center; flex-wrap: wrap; animation: fadeIn 0.2s;';

    dongMoi.innerHTML = `
        <div style="display: flex; flex-direction: column;">
            <span style="font-size: 10px; color: #666; font-weight: bold;">Ngày:</span>
            <input type="date" class="sk-ngay" value="${ngayVal}" onchange="let thu = window.ham_21_39_lay_thu_trong_tuần ? window.ham_21_39_lay_thu_trong_tuần(this.value) : ''; this.closest('.dong-chi-tiet-hs').querySelector('.sk-thu').value = thu;" style="width: 120px; padding: 6px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; font-weight:bold;">
        </div>

        <div style="display: flex; flex-direction: column;">
            <span style="font-size: 10px; color: #666; font-weight: bold;">Thứ:</span>
            <input type="text" class="sk-thu" value="${thuVal}" readonly style="width: 70px; padding: 6px; border: 1px solid #e9ecef; border-radius: 4px; font-size: 12px; font-weight: bold; background: #e9ecef; color: #495057; text-align: center;">
        </div>

        <div style="display: flex; flex-direction: column;">
            <span style="font-size: 10px; color: #666; font-weight: bold;">Buổi:</span>
            <select class="sk-buoi" style="width: 75px; padding: 6px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; cursor:pointer;">
                <option value="Sáng" ${buoiVal === 'Sáng' ? 'selected' : ''}>Sáng</option>
                <option value="Trưa" ${buoiVal === 'Trưa' ? 'selected' : ''}>Trưa</option>
                <option value="Chiều" ${buoiVal === 'Chiều' ? 'selected' : ''}>Chiều</option>
                <option value="Tối" ${buoiVal === 'Tối' ? 'selected' : ''}>Tối</option>
            </select>
        </div>

        <div style="display: flex; flex-direction: column; flex: 1.5; min-width: 180px;">
            <span style="font-size: 10px; color: #666; font-weight: bold;">Học sinh:</span>
            <div style="display:flex; align-items:center; gap:6px; border:2px solid #e83e8c; border-radius:4px; padding:3px 6px; background:#fff;">
                <img class="avatar-preview" src="" style="width:20px; height:20px; border-radius:50%; object-fit:cover; display:none; border:1px solid #eee;">
                <input class="sk-hs" placeholder="👤 Chọn học sinh tiếp theo..." style="border:none; outline:none; flex:1; width:100%; font-size:12px; font-weight:bold; background:transparent; color:#e83e8c;">
            </div>
        </div>

        <div style="display: flex; flex-direction: column;">
            <span style="font-size: 10px; color: #666; font-weight: bold;">Điểm trừ:</span>
            <input type="number" step="0.5" class="sk-diem-tru" value="${diemVal}" style="width: 60px; padding: 6px; border: 1px solid #ffeeba; background: #fff3cd; border-radius: 4px; font-size: 12px; font-weight: bold; color: #dc3545; text-align: center; outline: none;">
        </div>

        <div style="display: flex; flex-direction: column; flex: 1.5; min-width: 150px;">
            <span style="font-size: 10px; color: #666; font-weight: bold;">Ghi chú riêng:</span>
            <input class="sk-ghichu" placeholder="Ghi chú..." style="width: 100%; padding: 6px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; box-sizing: border-box;">
        </div>

        <div style="display: flex; align-items: flex-end; height: 100%; padding-top: 15px;">
            <button type="button" onclick="this.closest('.dong-chi-tiet-hs').remove()" style="padding: 6px 8px; background: #f8d7da; color: #dc3545; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;" title="Xóa dòng này">✖</button>
        </div>
    `;
    vungDS.appendChild(dongMoi);
    if (typeof window.ham_20_7_tai_danh_sach_lop === 'function') {
        window.ham_20_7_tai_danh_sach_lop();
    }
};



// window.ham_21_34_render_tat_ca_cac_the_su_kien = async function () {
//     try {
//         const { data, error } = await _supabase.from('cai_dat_the_su_kien').select('*').like('nhom_su_kien', 'gvcn_%');
//         if (error) throw error;

//         window.gvcn_DanhSachTheSuKien = data || [];
//         document.querySelectorAll('.sk-vung-chon-the').forEach(vung => {
//             let btnThem = vung.querySelector('button');
//             let htmlThe = '';
//             window.gvcn_DanhSachTheSuKien.forEach(t => {
//                 let isGood = t.nhom_su_kien === 'gvcn_tot';
//                 let bg = isGood ? '#d4edda' : '#f8d7da';
//                 let color = isGood ? '#155724' : '#721c24';
//                 let border = isGood ? '#c3e6cb' : '#f5c6cb';

//                 htmlThe += `<button type="button" onclick="window.ham_21_35_chon_the_su_kien(this, '${t.ten_the}')" style="padding: 4px 8px; background: ${bg}; color: ${color}; border: 1px solid ${border}; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: bold; transition:0.2s;">${t.ten_the}</button>`;
//             });
//             vung.innerHTML = htmlThe + (btnThem ? btnThem.outerHTML : `<button type="button" onclick="window.ham_21_32_mo_modal_them_the()" style="padding: 4px 8px; background: #fff; border: 1px dashed #e83e8c; color: #e83e8c; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: bold;">➕ Thêm thẻ mới</button>`);
//         });
//     } catch (e) { console.error(e); }
// };


// // =====================================================================
// // HÀM 21.34: RENDER TẤT CẢ CÁC THẺ SỰ KIỆN LÊN MỤC 5 (ĐÃ BỎ LỌC NHÓM)
// // =====================================================================
// window.ham_21_34_render_tat_ca_cac_the_su_kien = async function () {
//     try {
//         const { data, error } = await _supabase.from('cai_dat_the_su_kien').select('*');
//         if (error) throw error;

//         window.gvcn_DanhSachTheSuKien = data || [];
//         document.querySelectorAll('.sk-vung-chon-the').forEach(vung => {
//             let btnThem = vung.querySelector('button');
//             let htmlThe = '';
//             window.gvcn_DanhSachTheSuKien.forEach(t => {
//                 // Nếu tên thẻ có chứa từ khóa tốt/khen thì hiện màu xanh, còn lại màu đỏ vi phạm
//                 let textLower = (t.ten_the || '').toLowerCase();
//                 let isGood = textLower.includes('tốt') || textLower.includes('khen') || textLower.includes('chăm') || textLower.includes('giỏi');

//                 let bg = isGood ? '#d4edda' : '#f8d7da';
//                 let color = isGood ? '#155724' : '#721c24';
//                 let border = isGood ? '#c3e6cb' : '#f5c6cb';

//                 htmlThe += `<button type="button" onclick="window.ham_21_35_chon_the_su_kien(this, '${t.ten_the}')" style="padding: 4px 8px; background: ${bg}; color: ${color}; border: 1px solid ${border}; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: bold; transition:0.2s;">${t.ten_the}</button>`;
//             });
//             vung.innerHTML = htmlThe + (btnThem ? btnThem.outerHTML : `<button type="button" onclick="window.ham_21_32_mo_modal_them_the()" style="padding: 4px 8px; background: #fff; border: 1px dashed #e83e8c; color: #e83e8c; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: bold;">➕ Thêm thẻ mới</button>`);
//         });
//     } catch (e) { console.error("Lỗi render thẻ sự kiện:", e); }
// };


// // =====================================================================
// // HÀM 21.34: RENDER CÁC THẺ SỰ KIỆN PHÂN THEO NHÓM NỘI QUY THI ĐUA
// // =====================================================================
// window.ham_21_34_render_tat_ca_cac_the_su_kien = async function () {
//     try {
//         const { data, error } = await _supabase.from('cai_dat_the_su_kien').select('*');
//         if (error) throw error;

//         window.gvcn_DanhSachTheSuKien = data || [];

//         // Định nghĩa các nhóm theo nội quy thi đua
//         let nhomMap = {
//             'THỜI GIAN': [],
//             'SỔ ĐẦU BÀI': [],
//             'TÁC PHONG': [],
//             'NỀ NẾP': [],
//             'TẬP THỂ': [],
//             'KHÁC / TUYÊN DƯƠNG': []
//         };

//         window.gvcn_DanhSachTheSuKien.forEach(t => {
//             let ten = (t.ten_the || '').toUpperCase();
//             if (ten.includes('TRỄ') || ten.includes('NGHỈ') || ten.includes('TRỐN') || ten.includes('TIẾT') || ten.includes('THỜI GIAN')) {
//                 nhomMap['THỜI GIAN'].push(t);
//             } else if (ten.includes('SỔ') || ten.includes('BÀI') || ten.includes(' TẬP') || ten.includes('NÓI CHUYỆN') || ten.includes('ĂN TRONG LỚP')) {
//                 nhomMap['SỔ ĐẦU BÀI'].push(t);
//             } else if (ten.includes('TÓC') || ten.includes('TRANG ĐIỂM') || ten.includes('MẶC') || ten.includes('GIÀY') || ten.includes('TÁC PHONG') || ten.includes('XĂM')) {
//                 nhomMap['TÁC PHONG'].push(t);
//             } else if (ten.includes('BÁN TRÚ') || ten.includes('NỀ NẾP') || ten.includes('VẮNG ĂN')) {
//                 nhomMap['NỀ NẾP'].push(t);
//             } else if (ten.includes('LỚP') || ten.includes('BÀN GHẾ') || ten.includes('VỆ SINH') || ten.includes('ĐÈN') || ten.includes('TẬP THỂ') || ten.includes('HÀNG')) {
//                 nhomMap['TẬP THỂ'].push(t);
//             } else {
//                 nhomMap['KHÁC / TUYÊN DƯƠNG'].push(t);
//             }
//         });

//         document.querySelectorAll('.sk-vung-chon-the').forEach(vung => {
//             let btnThem = vung.querySelector('button');
//             let htmlGroup = '';

//             for (let [tenNhom, danhSachThe] of Object.entries(nhomMap)) {
//                 if (danhSachThe.length === 0 && tenNhom !== 'KHÁC / TUYÊN DƯƠNG') continue;

//                 htmlGroup += `<div style="width:100%; margin-bottom:6px; border-left:3px solid #e83e8c; padding-left:6px;">
//                     <span style="font-size:10px; font-weight:bold; color:#6f42c1; text-transform:uppercase;">${tenNhom}</span>
//                     <div style="display:flex; gap:5px; flex-wrap:wrap; margin-top:3px;">`;

//                 danhSachThe.forEach(t => {
//                     let textLower = (t.ten_the || '').toLowerCase();
//                     let isGood = textLower.includes('tốt') || textLower.includes('khen') || textLower.includes('chăm') || textLower.includes('giỏi');
//                     let bg = isGood ? '#d4edda' : '#f8d7da';
//                     let color = isGood ? '#155724' : '#721c24';
//                     let border = isGood ? '#c3e6cb' : '#f5c6cb';

//                     htmlGroup += `<button type="button" onclick="window.ham_21_35_chon_the_su_kien(this, '${t.ten_the}')" style="padding: 3px 7px; background: ${bg}; color: ${color}; border: 1px solid ${border}; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: bold; transition:0.2s;">${t.ten_the}</button>`;
//                 });
//                 htmlGroup += `</div></div>`;
//             }

//             vung.innerHTML = htmlGroup + (btnThem ? btnThem.outerHTML : `<button type="button" onclick="window.ham_21_32_mo_modal_them_the()" style="padding: 4px 8px; background: #fff; border: 1px dashed #e83e8c; color: #e83e8c; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: bold; margin-top:5px;">➕ Thêm thẻ mới</button>`);
//         });
//     } catch (e) { console.error("Lỗi render các nhóm thẻ:", e); }
// };


// // =====================================================================
// // HÀM 21.34: NẠP TOÀN BỘ 57 LỖI THI ĐUA CHUẨN VÀO GIAO DIỆN MỤC 5
// // =====================================================================
// window.ham_21_34_render_tat_ca_cac_the_su_kien = async function () {
//     // 57 Lỗi chuẩn theo 2 hình ảnh nội quy thi đua
//     const danhSachNoiQuyChuan = [
//         // I. THỜI GIAN
//         { ten: "Đi học trễ (sáng/chiều)", diem: 1, nhom: "I. THỜI GIAN" },
//         { ten: "Nghỉ học phép (không quá 05 buổi/hk)", diem: 0, nhom: "I. THỜI GIAN" },
//         { ten: "Nghỉ học phép từ lần 6 (trừ bệnh/tang gia)", diem: 0.5, nhom: "I. THỜI GIAN" },
//         { ten: "Xin phép trễ", diem: 2, nhom: "I. THỜI GIAN" },
//         { ten: "Nghỉ học không phép", diem: 4, nhom: "I. THỜI GIAN" },
//         { ten: "Nghỉ học tiết 1, tiết 5", diem: 2, nhom: "I. THỜI GIAN" },
//         { ten: "Nghỉ học tiết 1 và tiết 2", diem: 3, nhom: "I. THỜI GIAN" },
//         { ten: "Trống đánh vào tiết mà chưa vào lớp", diem: 1, nhom: "I. THỜI GIAN" },
//         { ten: "Trốn tiết giờ chào cờ", diem: 5, nhom: "I. THỜI GIAN" },
//         { ten: "Trốn trong lớp giờ Bán trú", diem: 2, nhom: "I. THỜI GIAN" },
//         { ten: "Trốn tiết", diem: 5, nhom: "I. THỜI GIAN" },
//         { ten: "Không quét thẻ hoặc khuôn mặt đúng quy định", diem: 1, nhom: "I. THỜI GIAN" },
//         { ten: "Làm ồn trong giờ bán trú", diem: 1, nhom: "I. THỜI GIAN" },
//         { ten: "Ngồi sai lớp giờ chào cờ/SH dưới sân", diem: 2, nhom: "I. THỜI GIAN" },
//         { ten: "Nói chuyện riêng, dùng ĐTDH giờ chào cờ/SH", diem: 2, nhom: "I. THỜI GIAN" },
//         { ten: "Sử dụng điện thoại trong giờ học", diem: 4, nhom: "I. THỜI GIAN" },
//         { ten: "Sử dụng/cắm sạc thiết bị điện từ trong phòng học", diem: 2, nhom: "I. THỜI GIAN" },
//         { ten: "Xuống Căn tin trong giờ học", diem: 2, nhom: "I. THỜI GIAN" },
//         { ten: "Rượt đuổi nhau, chơi bóng, đá cầu hành lang/lớp học", diem: 2, nhom: "I. THỜI GIAN" },
//         { ten: "Nói tục, chửi thề", diem: 5, nhom: "I. THỜI GIAN" },
//         { ten: "Tự tập làm mất trật tự nhà trường (Bán trú)", diem: 5, nhom: "I. THỜI GIAN" },
//         { ten: "Ứng xử không phù hợp trên mạng xã hội", diem: 5, nhom: "I. THỜI GIAN" },
//         { ten: "Có hành động không phù hợp với bạn học", diem: 5, nhom: "I. THỜI GIAN" },
//         { ten: "Kêu gọi, lôi kéo bạn làm mất trật tự nhà trường", diem: 10, nhom: "I. THỜI GIAN" },
//         { ten: "Mang, hút thuốc lá/thuốc lá điện tử trong trường", diem: 10, nhom: "I. THỜI GIAN" },

//         // II. SỔ ĐẦU BÀI
//         { ten: "Không mang tập sách", diem: 1, nhom: "II. SỔ ĐẦU BÀI" },
//         { ten: "Nói chuyện riêng trong giờ học", diem: 1, nhom: "II. SỔ ĐẦU BÀI" },
//         { ten: "Xả rác trong hộc bàn, lớp học", diem: 1, nhom: "II. SỔ ĐẦU BÀI" },
//         { ten: "Ăn trong lớp học và giờ chào cờ, sinh hoạt", diem: 2, nhom: "II. SỔ ĐẦU BÀI" },
//         { ten: "Không thuộc bài", diem: 2, nhom: "II. SỔ ĐẦU BÀI" },
//         { ten: "Không chép bài và làm bài đầy đủ", diem: 2, nhom: "II. SỔ ĐẦU BÀI" },
//         { ten: "Đánh bài (bài tây 52 lá), cá cược trong trường", diem: 10, nhom: "II. SỔ ĐẦU BÀI" },
//         { ten: "Leo rào trốn tiết", diem: 10, nhom: "II. SỔ ĐẦU BÀI" },
//         { ten: "Mang & sử dụng rượu, bia, chất kích thích, chất gây nghiện", diem: 15, nhom: "II. SỔ ĐẦU BÀI" },
//         { ten: "Gây gỗ, đánh nhau", diem: 15, nhom: "II. SỔ ĐẦU BÀI" },
//         { ten: "Trộm cắp tài sản", diem: 15, nhom: "II. SỔ ĐẦU BÀI" },
//         { ten: "Vô lễ với giáo viên, nhân viên nhà trường", diem: 20, nhom: "II. SỔ ĐẦU BÀI" },

//         // III. TÁC PHONG
//         { ten: "Trang điểm, sơn móng tay, tóc xịt keo", diem: 1, nhom: "III. TÁC PHONG" },
//         { ten: "Nam sinh đeo bông tai, nữ sinh đeo >2 bông tai", diem: 2, nhom: "III. TÁC PHONG" },
//         { ten: "Tóc nhuộm màu", diem: 4, nhom: "III. TÁC PHONG" },
//         { ten: "Nam sinh để tóc dài, cắt tóc kiểu, đầu đinh", diem: 2, nhom: "III. TÁC PHONG" },
//         { ten: "Mặc trang phục sai quy định (thiếu phù hiệu, áo bỏ ngoài quần)", diem: 2, nhom: "III. TÁC PHONG" },
//         { ten: "Mang giày không đúng quy định", diem: 2, nhom: "III. TÁC PHONG" },
//         { ten: "Cố ý mở cửa vào phòng học khi lớp đã ra về", diem: 5, nhom: "III. TÁC PHONG" },
//         { ten: "Vẽ hình xăm, xăm mình hoặc không khắc phục", diem: 5, nhom: "III. TÁC PHONG" },

//         // IV. NỀ NẾP
//         { ten: "Vắng ăn, ngủ bán trú có phép (không quá 2 lần/hk)", diem: 0, nhom: "IV. NỀ NẾP" },
//         { ten: "Vắng ăn, ngủ bán trú không phép", diem: 2, nhom: "IV. NỀ NẾP" },

//         // V. TẬP THỂ
//         { ten: "Lớp không lấy sổ Đầu bài hoặc không nộp", diem: 5, nhom: "V. TẬP THỂ" },
//         { ten: "Lớp ồn trong giờ vắng giáo viên", diem: 5, nhom: "V. TẬP THỂ" },
//         { ten: "Lớp không khóa cửa, trả chìa khóa sau giờ học", diem: 5, nhom: "V. TẬP THỂ" },
//         { ten: "Bàn ghế xếp không ngay ngắn", diem: 5, nhom: "V. TẬP THỂ" },
//         { ten: "Lớp không ghi sổ đầu giờ", diem: 2, nhom: "V. TẬP THỂ" },
//         { ten: "Xếp hàng muộn, không thẳng, không dọn vệ sinh", diem: 10, nhom: "V. TẬP THỂ" },
//         { ten: "Lớp ra về không tắt đèn, quạt, máy lạnh", diem: 10, nhom: "V. TẬP THỂ" },
//         { ten: "Lớp vệ sinh không sạch", diem: 10, nhom: "V. TẬP THỂ" },
//         { ten: "Lớp ồn trong giờ học", diem: 10, nhom: "V. TẬP THỂ" },
//         { ten: "Lớp làm mất sổ Đầu bài", diem: 20, nhom: "V. TẬP THỂ" }
//     ];

//     try {
//         // Lấy thêm các thẻ custom từ CSDL (nếu thầy có thêm mới)
//         let { data: customData } = await _supabase.from('cai_dat_the_su_kien').select('*');
//         let allThe = [...danhSachNoiQuyChuan];
//         if (customData) {
//             customData.forEach(cd => {
//                 if (!allThe.some(x => x.ten === cd.ten_the)) {
//                     allThe.push({ ten: cd.ten_the, diem: 1, nhom: "KHÁC / TÙY CHỈNH" });
//                 }
//             });
//         }

//         let nhomMap = {
//             'I. THỜI GIAN': [],
//             'II. SỔ ĐẦU BÀI': [],
//             'III. TÁC PHONG': [],
//             'IV. NỀ NẾP': [],
//             'V. TẬP THỂ': [],
//             'KHÁC / TÙY CHỈNH': []
//         };

//         allThe.forEach(t => {
//             if (nhomMap[t.nhom]) nhomMap[t.nhom].push(t);
//             else nhomMap['KHÁC / TÙY CHỈNH'].push(t);
//         });

//         document.querySelectorAll('.sk-vung-chon-the').forEach(vung => {
//             let btnThem = vung.querySelector('button');
//             let htmlGroup = '';

//             for (let [tenNhom, danhSachThe] of Object.entries(nhomMap)) {
//                 if (danhSachThe.length === 0) continue;

//                 htmlGroup += `<div style="width:100%; margin-bottom:6px; border-left:3px solid #e83e8c; padding-left:6px;">
//                     <span style="font-size:10px; font-weight:bold; color:#6f42c1; text-transform:uppercase;">${tenNhom}</span>
//                     <div style="display:flex; gap:5px; flex-wrap:wrap; margin-top:3px;">`;

//                 danhSachThe.forEach(t => {
//                     let diemStr = t.diem > 0 ? ` (-${t.diem})` : '';
//                     let bg = '#f8d7da'; let color = '#721c24'; let border = '#f5c6cb';
//                     if (t.diem === 0) { bg = '#d4edda'; color = '#155724'; border = '#c3e6cb'; }

//                     htmlGroup += `<button type="button" onclick="window.ham_21_35_chon_the_su_kien(this, '${t.ten}', ${t.diem})" style="padding: 3px 7px; background: ${bg}; color: ${color}; border: 1px solid ${border}; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: bold; transition:0.2s;" title="Trừ ${t.diem} điểm">${t.ten}${diemStr}</button>`;
//                 });
//                 htmlGroup += `</div></div>`;
//             }

//             vung.innerHTML = htmlGroup + (btnThem ? btnThem.outerHTML : `<button type="button" onclick="window.ham_21_32_mo_modal_them_the()" style="padding: 4px 8px; background: #fff; border: 1px dashed #e83e8c; color: #e83e8c; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: bold; margin-top:5px;">➕ Thêm thẻ mới</button>`);
//         });
//     } catch (e) { console.error("Lỗi render thẻ nội quy:", e); }
// };


// =====================================================================
// HÀM 21.34: NẠP TOÀN BỘ 57 LỖI THI ĐUA CHUẨN VÀ PHÂN NHÓM LÊN MỤC 5
// =====================================================================
window.ham_21_34_render_tat_ca_cac_the_su_kien = async function () {
    const danhSachNoiQuyChuan = [
        // I. THỜI GIAN
        { ten: "Đi học trễ (sáng/chiều)", diem: 1, nhom: "I. THỜI GIAN" },
        { ten: "Nghỉ học phép (không quá 05 buổi/hk)", diem: 0, nhom: "I. THỜI GIAN" },
        { ten: "Nghỉ học phép từ lần 6 (trừ bệnh/tang gia)", diem: 0.5, nhom: "I. THỜI GIAN" },
        { ten: "Xin phép trễ", diem: 2, nhom: "I. THỜI GIAN" },
        { ten: "Nghỉ học không phép", diem: 4, nhom: "I. THỜI GIAN" },
        { ten: "Nghỉ học tiết 1, tiết 5", diem: 2, nhom: "I. THỜI GIAN" },
        { ten: "Nghỉ học tiết 1 và tiết 2", diem: 3, nhom: "I. THỜI GIAN" },
        { ten: "Trống đánh vào tiết mà chưa vào lớp", diem: 1, nhom: "I. THỜI GIAN" },
        { ten: "Trốn tiết giờ chào cờ", diem: 5, nhom: "I. THỜI GIAN" },
        { ten: "Trốn trong lớp giờ Bán trú", diem: 2, nhom: "I. THỜI GIAN" },
        { ten: "Trốn tiết", diem: 5, nhom: "I. THỜI GIAN" },
        { ten: "Không quét thẻ hoặc khuôn mặt đúng quy định", diem: 1, nhom: "I. THỜI GIAN" },
        { ten: "Làm ồn trong giờ bán trú", diem: 1, nhom: "I. THỜI GIAN" },
        { ten: "Ngồi sai lớp giờ chào cờ/SH dưới sân", diem: 2, nhom: "I. THỜI GIAN" },
        { ten: "Nói chuyện riêng, dùng ĐTDH giờ chào cờ/SH", diem: 2, nhom: "I. THỜI GIAN" },
        { ten: "Sử dụng điện thoại trong giờ học", diem: 4, nhom: "I. THỜI GIAN" },
        { ten: "Sử dụng/cắm sạc thiết bị điện từ trong phòng học", diem: 2, nhom: "I. THỜI GIAN" },
        { ten: "Xuống Căn tin trong giờ học", diem: 2, nhom: "I. THỜI GIAN" },
        { ten: "Rượt đuổi nhau, chơi bóng, đá cầu hành lang/lớp học", diem: 2, nhom: "I. THỜI GIAN" },
        { ten: "Nói tục, chửi thề", diem: 5, nhom: "I. THỜI GIAN" },
        { ten: "Tự tập làm mất trật tự nhà trường (Bán trú)", diem: 5, nhom: "I. THỜI GIAN" },
        { ten: "Ứng xử không phù hợp trên mạng xã hội", diem: 5, nhom: "I. THỜI GIAN" },
        { ten: "Có hành động không phù hợp với bạn học", diem: 5, nhom: "I. THỜI GIAN" },
        { ten: "Kêu gọi, lôi kéo bạn làm mất trật tự nhà trường", diem: 10, nhom: "I. THỜI GIAN" },
        { ten: "Mang, hút thuốc lá/thuốc lá điện tử trong trường", diem: 10, nhom: "I. THỜI GIAN" },

        // II. SỔ ĐẦU BÀI
        { ten: "Không mang tập sách", diem: 1, nhom: "II. SỔ ĐẦU BÀI" },
        { ten: "Nói chuyện riêng trong giờ học", diem: 1, nhom: "II. SỔ ĐẦU BÀI" },
        { ten: "Xả rác trong hộc bàn, lớp học", diem: 1, nhom: "II. SỔ ĐẦU BÀI" },
        { ten: "Ăn trong lớp học và giờ chào cờ, sinh hoạt", diem: 2, nhom: "II. SỔ ĐẦU BÀI" },
        { ten: "Không thuộc bài", diem: 2, nhom: "II. SỔ ĐẦU BÀI" },
        { ten: "Không chép bài và làm bài đầy đủ", diem: 2, nhom: "II. SỔ ĐẦU BÀI" },
        { ten: "Đánh bài (bài tây 52 lá), cá cược trong trường", diem: 10, nhom: "II. SỔ ĐẦU BÀI" },
        { ten: "Leo rào trốn tiết", diem: 10, nhom: "II. SỔ ĐẦU BÀI" },
        { ten: "Mang & sử dụng rượu, bia, chất kích thích, chất gây nghiện", diem: 15, nhom: "II. SỔ ĐẦU BÀI" },
        { ten: "Gây gỗ, đánh nhau", diem: 15, nhom: "II. SỔ ĐẦU BÀI" },
        { ten: "Trộm cắp tài sản", diem: 15, nhom: "II. SỔ ĐẦU BÀI" },
        { ten: "Vô lễ với giáo viên, nhân viên nhà trường", diem: 20, nhom: "II. SỔ ĐẦU BÀI" },

        // III. TÁC PHONG
        { ten: "Trang điểm, sơn móng tay, tóc xịt keo", diem: 1, nhom: "III. TÁC PHONG" },
        { ten: "Nam sinh đeo bông tai, nữ sinh đeo >2 bông tai", diem: 2, nhom: "III. TÁC PHONG" },
        { ten: "Tóc nhuộm màu", diem: 4, nhom: "III. TÁC PHONG" },
        { ten: "Nam sinh để tóc dài, cắt tóc kiểu, đầu đinh", diem: 2, nhom: "III. TÁC PHONG" },
        { ten: "Mặc trang phục sai quy định (thiếu phù hiệu, áo bỏ ngoài quần)", diem: 2, nhom: "III. TÁC PHONG" },
        { ten: "Mang giày không đúng quy định", diem: 2, nhom: "III. TÁC PHONG" },
        { ten: "Cố ý mở cửa vào phòng học khi lớp đã ra về", diem: 5, nhom: "III. TÁC PHONG" },
        { ten: "Vẽ hình xăm, xăm mình hoặc không khắc phục", diem: 5, nhom: "III. TÁC PHONG" },

        // IV. NỀ NẾP
        { ten: "Vắng ăn, ngủ bán trú có phép (không quá 2 lần/hk)", diem: 0, nhom: "IV. NỀ NẾP" },
        { ten: "Vắng ăn, ngủ bán trú không phép", diem: 2, nhom: "IV. NỀ NẾP" },

        // V. TẬP THỂ
        { ten: "Lớp không lấy sổ Đầu bài hoặc không nộp", diem: 5, nhom: "V. TẬP THỂ" },
        { ten: "Lớp ồn trong giờ vắng giáo viên", diem: 5, nhom: "V. TẬP THỂ" },
        { ten: "Lớp không khóa cửa, trả chìa khóa sau giờ học", diem: 5, nhom: "V. TẬP THỂ" },
        { ten: "Bàn ghế xếp không ngay ngắn", diem: 5, nhom: "V. TẬP THỂ" },
        { ten: "Lớp không ghi sổ đầu giờ", diem: 2, nhom: "V. TẬP THỂ" },
        { ten: "Xếp hàng muộn, không thẳng, không dọn vệ sinh", diem: 10, nhom: "V. TẬP THỂ" },
        { ten: "Lớp ra về không tắt đèn, quạt, máy lạnh", diem: 10, nhom: "V. TẬP THỂ" },
        { ten: "Lớp vệ sinh không sạch", diem: 10, nhom: "V. TẬP THỂ" },
        { ten: "Lớp ồn trong giờ học", diem: 10, nhom: "V. TẬP THỂ" },
        { ten: "Lớp làm mất sổ Đầu bài", diem: 20, nhom: "V. TẬP THỂ" }
    ];

    try {
        let { data: customData } = await _supabase.from('cai_dat_the_su_kien').select('*');
        let allThe = [...danhSachNoiQuyChuan];
        if (customData) {
            customData.forEach(cd => {
                if (!allThe.some(x => x.ten === cd.ten_the)) {
                    allThe.push({ ten: cd.ten_the, diem: 1, nhom: "KHÁC / TÙY CHỈNH" });
                }
            });
        }

        let nhomMap = {
            'I. THỜI GIAN': [],
            'II. SỔ ĐẦU BÀI': [],
            'III. TÁC PHONG': [],
            'IV. NỀ NẾP': [],
            'V. TẬP THỂ': [],
            'KHÁC / TÙY CHỈNH': []
        };

        allThe.forEach(t => {
            if (nhomMap[t.nhom]) nhomMap[t.nhom].push(t);
            else nhomMap['KHÁC / TÙY CHỈNH'].push(t);
        });

        document.querySelectorAll('.sk-vung-chon-the').forEach(vung => {
            let htmlGroup = '';

            for (let [tenNhom, danhSachThe] of Object.entries(nhomMap)) {
                if (danhSachThe.length === 0) continue;

                htmlGroup += `<div style="width:100%; margin-bottom:6px; border-left:3px solid #e83e8c; padding-left:6px;">
                    <span style="font-size:10px; font-weight:bold; color:#6f42c1; text-transform:uppercase;">${tenNhom}</span>
                    <div style="display:flex; gap:5px; flex-wrap:wrap; margin-top:3px;">`;

                danhSachThe.forEach(t => {
                    let diemStr = t.diem > 0 ? ` (-${t.diem})` : '';
                    let bg = '#f8d7da'; let color = '#721c24'; let border = '#f5c6cb';
                    if (t.diem === 0) { bg = '#d4edda'; color = '#155724'; border = '#c3e6cb'; }

                    htmlGroup += `<button type="button" onclick="window.ham_21_35_chon_the_su_kien(this, '${t.ten}', ${t.diem})" style="padding: 3px 7px; background: ${bg}; color: ${color}; border: 1px solid ${border}; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: bold; transition:0.2s;" title="Trừ ${t.diem} điểm">${t.ten}${diemStr}</button>`;
                });
                htmlGroup += `</div></div>`;
            }

            vung.innerHTML = htmlGroup;
        });
    } catch (e) { console.error("Lỗi render thẻ nội quy:", e); }
};





// window.ham_21_35_chon_the_su_kien = function (btnElem, tenThe) {
//     let vung = btnElem.closest('div');
//     vung.querySelectorAll('button').forEach(b => {
//         if (!b.innerText.includes('Thêm thẻ')) b.style.opacity = '0.5';
//     });
//     btnElem.style.opacity = '1';
//     btnElem.style.boxShadow = '0 0 5px rgba(0,0,0,0.3)';

//     let hiddenInput = vung.parentElement.querySelector('.sk-loi-hidden');
//     if (hiddenInput) hiddenInput.value = tenThe;
// };

// =====================================================================
// HÀM 21.35: CHỌN THẺ VÀ TỰ ĐỘNG NẠP ĐIỂM TRỪ LÊN Ô TƯƠNG ỨNG
// =====================================================================
window.ham_21_35_chon_the_su_kien = function (btnElem, tenThe, soDiemTru) {
    let dong = btnElem.closest('.dong-nhap-su-kien');
    if (!dong) return;

    dong.querySelectorAll('.sk-vung-chon-the button').forEach(b => {
        if (!b.innerText.includes('Thêm thẻ')) b.style.opacity = '0.5';
    });
    btnElem.style.opacity = '1';
    btnElem.style.boxShadow = '0 0 5px rgba(0,0,0,0.3)';

    // Gán tên lỗi vào input hidden
    let hiddenInput = dong.querySelector('.sk-loi-hidden');
    if (hiddenInput) hiddenInput.value = tenThe;

    // 🌟 Tự động nạp điểm trừ lên ô điểm trừ (Và vẫn cho phép thầy sửa tay)
    let inputDiem = dong.querySelector('.sk-diem-tru');
    if (inputDiem) inputDiem.value = soDiemTru;
};



window.ham_21_32_mo_modal_them_the = function () {
    let modal = document.getElementById('gvcn-modal-them-the');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'gvcn-modal-them-the';
        modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); display:flex; align-items:center; justify-content:center; z-index:999999;';
        document.body.appendChild(modal);
    }
    modal.innerHTML = `
        <div style="background:#fff; width:400px; padding:20px; border-radius:8px; box-shadow:0 5px 15px rgba(0,0,0,0.3);">
            <h4 style="margin-top:0; color:#e83e8c;">➕ Thêm Thẻ Sự Kiện Mới</h4>
            <label style="font-size:12px; font-weight:bold;">Tên thẻ / lỗi:</label>
            <input type="text" id="gvcn-nhap-ten-the" placeholder="VD: Đi học trễ..." style="width:100%; padding:8px; border:1px solid #ccc; border-radius:4px; margin-top:5px; margin-bottom:15px; box-sizing:border-box;">
            
            <label style="font-size:12px; font-weight:bold;">Phân loại:</label>
            <select id="gvcn-chon-nhom-the" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:4px; margin-top:5px; margin-bottom:20px;">
                <option value="gvcn_vi_pham">🚨 Vi phạm (Xấu)</option>
                <option value="gvcn_tot">🌟 Tốt (Khen thưởng)</option>
            </select>

            <div style="text-align:right; display:flex; gap:10px; justify-content:flex-end;">
                <button onclick="document.getElementById('gvcn-modal-them-the').remove()" style="padding:8px 15px; background:#6c757d; color:#fff; border:none; border-radius:4px; cursor:pointer;">Hủy</button>
                <button onclick="window.ham_21_36_luu_the_moi()" style="padding:8px 20px; background:#e83e8c; color:#fff; border:none; border-radius:4px; cursor:pointer; font-weight:bold;">Lưu thẻ</button>
            </div>
        </div>
    `;
};

window.ham_21_36_luu_the_moi = async function () {
    let tenThe = document.getElementById('gvcn-nhap-ten-the').value.trim();
    let nhomThe = document.getElementById('gvcn-chon-nhom-the').value;
    if (!tenThe) { alert("⚠️ Vui lòng nhập tên thẻ!"); return; }

    try {
        const { error } = await _supabase.from('cai_dat_the_su_kien').insert([{ ten_the: tenThe, nhom_su_kien: nhomThe }]);
        if (error) throw error;
        alert("✅ Thêm thẻ mới thành công!");
        document.getElementById('gvcn-modal-them-the').remove();
        if (typeof window.ham_21_34_render_tat_ca_cac_the_su_kien === 'function') {
            window.ham_21_34_render_tat_ca_cac_the_su_kien();
        }
    } catch (e) { alert("❌ Lỗi: " + e.message); }
};

window.ham_21_33_chon_anh_sk_dong = async function (inputElem) {
    if (inputElem.files && inputElem.files[0]) {
        try {
            let files = await window.ham_20_25_xu_ly_mang_anh_dau_vao(Array.from(inputElem.files));
            if (files && files.length > 0) {
                let f = files[0];
                let b64 = await window.ham_ho_tro_doc_anh_base64(f);
                let dong = inputElem.closest('.dong-nhap-su-kien');
                if (!dong.dataset.mangAnhDong) dong.dataset.mangAnhDong = JSON.stringify([]);
                let arr = JSON.parse(dong.dataset.mangAnhDong);
                arr.push({ b64: b64, type: f.type, size: f.size });
                dong.dataset.mangAnhDong = JSON.stringify(arr);

                let vungPreview = dong.querySelector('.vung-preview-anh-sk-dong');
                let html = '';
                arr.forEach((imgObj, idx) => {
                    html += `<div style="position:relative;"><img src="${imgObj.b64}" style="width:35px; height:35px; object-fit:cover; border-radius:4px; border:1px solid #ccc;"><button type="button" onclick="let d=this.closest('.dong-nhap-su-kien'); let a=JSON.parse(d.dataset.mangAnhDong); a.splice(${idx},1); d.dataset.mangAnhDong=JSON.stringify(a); this.closest('div').remove();" style="position:absolute; top:-6px; right:-6px; background:#dc3545; color:#fff; border:none; border-radius:50%; width:16px; height:16px; font-size:10px; cursor:pointer; display:flex; align-items:center; justify-content:center;">×</button></div>`;
                });
                vungPreview.innerHTML = html;
            }
        } catch (e) { console.error(e); }
        inputElem.value = '';
    }
};





// // =====================================================================
// // HÀM 21.38: GIAO DIỆN ĐỘC LẬP CHO MỤC 5 (QUẢN LÝ SỰ KIỆN)
// // =====================================================================
// window.ham_21_38_ve_giao_dien_muc_5 = function () {
//     const vungMuc5 = document.getElementById('vung-chua-muc-5');
//     if (!vungMuc5) return;

//     const currentDate = new Date().toISOString().split('T')[0];
//     let optionsTuan = '';
//     for (let i = 1; i <= 37; i++) optionsTuan += `<option value="Tuần ${i}"></option>`;

//     vungMuc5.innerHTML = `
//         <div style="background: #fff; padding: 25px; border-radius: 10px; border: 1px solid #dee2e6; box-shadow: 0 4px 10px rgba(0,0,0,0.03); width: 100%; box-sizing: border-box;">
//             <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px dashed #fce4ec; padding-bottom: 10px; margin-bottom: 15px;">
//                 <h4 style="margin: 0; color: #e83e8c; font-size: 17px;">🎯 5. Quản lý Sự kiện (Tuần trước / Vi phạm)</h4>
//                 <button onclick="window.ham_21_22_toggle_muc('body-muc-5', this);" style="background: #f8f9fa; border: 1px solid #ccc; padding: 5px 12px; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: bold;">➖ Thu hẹp</button>
//             </div>
            
//             <div id="body-muc-5">
//                 <!-- Thanh điều hướng tuần độc lập -->
//                 <div style="background: #fdf5f8; padding: 15px; border-radius: 8px; border: 2px solid #e83e8c; margin-bottom: 20px;">
//                     <label style="font-weight: bold; font-size: 14px; color: #e83e8c; display:block; margin-bottom:8px;">B1. Chọn Tuần xảy ra sự kiện (Độc lập):</label>
//                     <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
//                         <div style="display: flex; gap: 4px;">
//                             <button onclick="if(typeof ham_21_29_chuyen_tuan_su_kien === 'function') ham_21_29_chuyen_tuan_su_kien(-1)" style="padding: 8px 12px; background: #e83e8c; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;" title="Tuần trước">◀ Lùi</button>
//                             <button onclick="if(typeof ham_21_29_chuyen_tuan_su_kien === 'function') ham_21_29_chuyen_tuan_su_kien(1)" style="padding: 8px 12px; background: #e83e8c; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;" title="Tuần sau">Tiến ▶</button>
//                         </div>
//                         <input id="gvcn-sk-tuan-chon" list="dl-tuan" onchange="if(typeof ham_21_30_cap_nhat_ngay_tuan_su_kien === 'function') ham_21_30_cap_nhat_ngay_tuan_su_kien();" placeholder="Chọn tuần..." style="width: 140px; padding: 9px; border: 1px solid #ced4da; border-radius: 6px; font-weight: bold; font-size: 14px; outline: none; background:#fff; color:#e83e8c;">
//                         <span style="font-size:12px; font-weight:bold; color:#6c757d;">Từ:</span>
//                         <input type="date" id="gvcn-sk-tuan-tu" style="width: 130px; padding: 8px; border: 1px solid #ced4da; border-radius: 6px; font-size: 12px; font-weight: bold; outline: none;">
//                         <span style="font-size:12px; font-weight:bold; color:#6c757d;">Đến:</span>
//                         <input type="date" id="gvcn-sk-tuan-den" style="width: 130px; padding: 8px; border: 1px solid #ced4da; border-radius: 6px; font-size: 12px; font-weight: bold; outline: none;">
//                     </div>
//                 </div>

//                 <!-- B2: NHẬP DANH SÁCH SỰ KIỆN -->
//                 <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border: 1px solid #ced4da; margin-bottom: 15px;">
//                     <label style="font-weight: bold; font-size: 13px; color: #495057; display:block; margin-bottom:10px;">B2. Nhập danh sách Sự kiện / Vi phạm:</label>
                    
//                     <div id="gvcn-khu-vuc-su-kien-nhanh" style="display: flex; flex-direction: column; gap: 12px;">
//                         <div class="dong-nhap-su-kien" style="background: #fff; padding: 12px; border-radius: 8px; border: 1px solid #ccc; display: flex; flex-direction: column; gap: 10px;">
                            
//                             <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
//                                 <input type="date" class="sk-ngay" value="${currentDate}" style="width: 130px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; font-weight:bold;">
//                                 <select class="sk-buoi" style="width: 85px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; cursor:pointer;">
//                                     <option value="Sáng">Sáng</option><option value="Trưa">Trưa</option><option value="Chiều">Chiều</option><option value="Tối">Tối</option>
//                                 </select>
                                
//                                 <div class="sk-vung-hoc-sinh" style="display: flex; flex-direction: column; gap: 6px; flex: 1.2; min-width: 200px;">
//                                     <div style="display:flex; align-items:center; gap:6px;">
//                                         <div style="display:flex; align-items:center; gap:6px; flex:1; border:2px solid #e83e8c; border-radius:4px; padding:4px 8px; background:#fdf5f8;">
//                                             <img class="avatar-preview" src="" style="width:22px; height:22px; border-radius:50%; object-fit:cover; display:none; border:1px solid #eee;">
//                                             <input class="sk-hs" placeholder="👤 Chọn học sinh..." style="border:none; outline:none; flex:1; width:100%; font-size:12px; font-weight:bold; background:transparent; color:#e83e8c;">
//                                         </div>
//                                         <button type="button" onclick="if(typeof ham_21_31_them_hs_cho_su_kien === 'function') ham_21_31_them_hs_cho_su_kien(this)" style="padding: 6px 10px; background: #fdf5f8; color: #e83e8c; border: 1px dashed #e83e8c; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: bold; white-space:nowrap;" title="Chọn thêm học sinh chung sự kiện">➕ Thêm học sinh cùng sự kiện</button>
//                                     </div>
//                                 </div>

//                                 <button onclick="this.closest('.dong-nhap-su-kien').remove()" style="padding: 8px 12px; background: #f8d7da; color: #dc3545; border: none; border-radius: 4px; cursor: pointer;" title="Xóa dòng">✖</button>
//                             </div>

//                             <div style="display: flex; gap: 10px; align-items: center;">
//                                 <input class="sk-ghichu" placeholder="📝 Ghi chú thêm..." style="flex: 3; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; box-sizing: border-box;">
//                                 <div style="flex: 1; display: flex; align-items: center; gap: 5px; background: #fff3cd; padding: 4px 8px; border: 1px solid #ffeeba; border-radius: 4px;">
//                                     <span style="font-size: 11px; font-weight: bold; color: #856404; white-space: nowrap;">Điểm trừ:</span>
//                                     <input type="number" step="0.5" class="sk-diem-tru" value="0" style="width: 100%; padding: 4px; border: 1px solid #ccc; border-radius: 4px; font-size: 13px; font-weight: bold; color: #dc3545; text-align: center; outline: none;" title="Có thể chỉnh sửa điểm trừ bằng tay">
//                                 </div>
//                             </div>

//                             <div>
//                                 <label style="font-size: 11px; font-weight: bold; color: #6c757d; display: block; margin-bottom: 4px;">🏷️ Phân loại sự kiện (Theo nội quy thi đua):</label>
//                                 <div class="sk-vung-chon-the" style="display: flex; gap: 6px; flex-wrap: wrap; align-items: center;">
//                                     <button type="button" onclick="if(typeof ham_21_32_mo_modal_them_the === 'function') ham_21_32_mo_modal_them_the()" style="padding: 4px 8px; background: #fff; border: 1px dashed #e83e8c; color: #e83e8c; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: bold;">➕ Thêm thẻ mới</button>
//                                 </div>
//                                 <input type="hidden" class="sk-loi-hidden" value="">
//                             </div>

//                             <div style="display: flex; align-items: center; gap: 10px; border-top: 1px dashed #eee; padding-top: 6px;">
//                                 <button type="button" class="btn-anh-sk-dong" onclick="this.nextElementSibling.click()" style="padding: 4px 8px; background: #e0f7fa; color: #00838f; border: 1px dashed #00acc1; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: bold;">📷 Ảnh minh chứng dòng này</button>
//                                 <input type="file" accept="image/*" class="input-anh-sk-dong" style="display:none;" onchange="if(typeof window.ham_21_33_chon_anh_sk_dong === 'function') window.ham_21_33_chon_anh_sk_dong(this)">
//                                 <div class="vung-preview-anh-sk-dong" style="display: flex; gap: 6px; align-items: center; overflow-x: auto;"></div>
//                             </div>

//                         </div>
//                     </div>

//                     <button onclick="if(typeof ham_21_4_them_dong_su_kien === 'function') ham_21_4_them_dong_su_kien();" style="margin-top: 10px; padding: 8px 15px; background: #fff; border: 1px dashed #e83e8c; color: #e83e8c; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: bold;">
//                         ➕ Thêm dòng sự kiện mới
//                     </button>
//                 </div>
                
//                 <div style="text-align: center; margin-bottom: 15px;">
//                     <button onclick="if(typeof ham_21_6_dua_vao_danh_sach_cho === 'function') ham_21_6_dua_vao_danh_sach_cho();" style="padding: 12px 20px; background: #fff; color: #e83e8c; border: 2px dashed #e83e8c; border-radius: 6px; font-weight: bold; font-size: 15px; cursor: pointer; width: 100%;">⬇️ ĐƯA XUỐNG DANH SÁCH CHỜ LƯU</button>
//                 </div>

//                 <div style="background: #f8f9fa; border: 1px solid #ced4da; border-radius: 8px; padding: 15px; max-height: 350px; overflow-y: auto; margin-bottom: 15px;">
//                     <div style="font-size: 14px; font-weight: bold; color: #495057; margin-bottom: 12px; border-bottom: 2px solid #dee2e6; padding-bottom: 8px;">Sự kiện đang chờ lưu (<span id="gvcn-dem-su-kien" style="color:#e83e8c;">0</span>):</div>
//                     <div id="gvcn-danh-sach-cho-luu"><i style="color: #adb5bd; font-size: 13px;">Chưa có sự kiện nào...</i></div>
//                 </div>

//                 <div style="text-align: right;">
//                     <button onclick="if(typeof ham_21_15_luu_su_kien_tuan_truoc === 'function') ham_21_15_luu_su_kien_tuan_truoc(this);" style="padding: 12px 30px; background: #e83e8c; color: white; border: none; border-radius: 8px; font-weight: bold; font-size: 15px; cursor: pointer; box-shadow: 0 4px 10px rgba(232,62,140,0.3);">💾 LƯU CÁC SỰ KIỆN MỤC 5</button>
//                 </div>
//             </div>
//         </div>
//     `;

//     if (typeof window.ham_21_34_render_tat_ca_cac_the_su_kien === 'function') {
//         window.ham_21_34_render_tat_ca_cac_the_su_kien();
//     }
// };



// // =====================================================================
// // HÀM 21.38: GIAO DIỆN ĐỘC LẬP CHO MỤC 5 (CÓ THÊM Ô THỨ, ĐIỂM TRỪ CẠNH HS, TAG)
// // =====================================================================
// window.ham_21_38_ve_giao_dien_muc_5 = function () {
//     const vungMuc5 = document.getElementById('vung-chua-muc-5');
//     if (!vungMuc5) return;

//     const currentDate = new Date().toISOString().split('T')[0];
//     const thuHienTai = window.ham_21_39_lay_thu_trong_tuần(currentDate);

//     vungMuc5.innerHTML = `
//         <div style="background: #fff; padding: 25px; border-radius: 10px; border: 1px solid #dee2e6; box-shadow: 0 4px 10px rgba(0,0,0,0.03); width: 100%; box-sizing: border-box;">
//             <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px dashed #fce4ec; padding-bottom: 10px; margin-bottom: 15px;">
//                 <h4 style="margin: 0; color: #e83e8c; font-size: 17px;">🎯 5. Quản lý Sự kiện (Tuần trước / Vi phạm)</h4>
//                 <button onclick="window.ham_21_22_toggle_muc('body-muc-5', this);" style="background: #f8f9fa; border: 1px solid #ccc; padding: 5px 12px; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: bold;">➖ Thu hẹp</button>
//             </div>
            
//             <div id="body-muc-5">
//                 <!-- Thanh điều hướng tuần độc lập -->
//                 <div style="background: #fdf5f8; padding: 15px; border-radius: 8px; border: 2px solid #e83e8c; margin-bottom: 20px;">
//                     <label style="font-weight: bold; font-size: 14px; color: #e83e8c; display:block; margin-bottom:8px;">B1. Chọn Tuần xảy ra sự kiện (Độc lập):</label>
//                     <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
//                         <div style="display: flex; gap: 4px;">
//                             <button onclick="if(typeof ham_21_29_chuyen_tuan_su_kien === 'function') ham_21_29_chuyen_tuan_su_kien(-1)" style="padding: 8px 12px; background: #e83e8c; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;" title="Tuần trước">◀ Lùi</button>
//                             <button onclick="if(typeof ham_21_29_chuyen_tuan_su_kien === 'function') ham_21_29_chuyen_tuan_su_kien(1)" style="padding: 8px 12px; background: #e83e8c; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;" title="Tuần sau">Tiến ▶</button>
//                         </div>
//                         <input id="gvcn-sk-tuan-chon" list="dl-tuan" onchange="if(typeof ham_21_30_cap_nhat_ngay_tuan_su_kien === 'function') ham_21_30_cap_nhat_ngay_tuan_su_kien();" placeholder="Chọn tuần..." style="width: 140px; padding: 9px; border: 1px solid #ced4da; border-radius: 6px; font-weight: bold; font-size: 14px; outline: none; background:#fff; color:#e83e8c;">
//                         <span style="font-size:12px; font-weight:bold; color:#6c757d;">Từ:</span>
//                         <input type="date" id="gvcn-sk-tuan-tu" style="width: 130px; padding: 8px; border: 1px solid #ced4da; border-radius: 6px; font-size: 12px; font-weight: bold; outline: none;">
//                         <span style="font-size:12px; font-weight:bold; color:#6c757d;">Đến:</span>
//                         <input type="date" id="gvcn-sk-tuan-den" style="width: 130px; padding: 8px; border: 1px solid #ced4da; border-radius: 6px; font-size: 12px; font-weight: bold; outline: none;">
//                     </div>
//                 </div>

//                 <!-- B2: NHẬP DANH SÁCH SỰ KIỆN -->
//                 <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border: 1px solid #ced4da; margin-bottom: 15px;">
//                     <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
//                         <label style="font-weight: bold; font-size: 13px; color: #495057;">B2. Nhập danh sách Sự kiện / Vi phạm:</label>
//                         <button type="button" onclick="if(typeof ham_21_32_mo_modal_them_the === 'function') ham_21_32_mo_modal_them_the()" style="padding: 5px 12px; background: #e83e8c; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: bold;">➕ Thêm tag mới</button>
//                     </div>
                    
//                     <div id="gvcn-khu-vuc-su-kien-nhanh" style="display: flex; flex-direction: column; gap: 12px;">
//                         <div class="dong-nhap-su-kien" style="background: #fff; padding: 12px; border-radius: 8px; border: 1px solid #ccc; display: flex; flex-direction: column; gap: 10px;">
                            
//                             <!-- Hàng 1: Ngày, Thứ, Buổi -->
//                             <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
//                                 <span style="font-size:12px; font-weight:bold; color:#495057;">Ngày:</span>
//                                 <input type="date" class="sk-ngay" value="${currentDate}" onchange="let thu = window.ham_21_39_lay_thu_trong_tuần(this.value); this.closest('.dong-nhap-su-kien').querySelector('.sk-thu').value = thu;" style="width: 135px; padding: 7px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; font-weight:bold;">
                                
//                                 <input type="text" class="sk-thu" value="${thuHienTai}" readonly style="width: 75px; padding: 7px; border: 1px solid #e9ecef; border-radius: 4px; font-size: 12px; font-weight: bold; background: #e9ecef; color: #495057; text-align: center;">

//                                 <select class="sk-buoi" style="width: 85px; padding: 7px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; cursor:pointer;">
//                                     <option value="Sáng">Sáng</option><option value="Trưa">Trưa</option><option value="Chiều">Chiều</option><option value="Tối">Tối</option>
//                                 </select>
                                
//                                 <button onclick="this.closest('.dong-nhap-su-kien').remove()" style="padding: 7px 10px; background: #f8d7da; color: #dc3545; border: none; border-radius: 4px; cursor: pointer; margin-left: auto;" title="Xóa dòng">✖ Xóa dòng</button>
//                             </div>

//                             <!-- Hàng 2: Chọn Học sinh + Điểm trừ ngay bên cạnh -->
//                             <div class="sk-vung-hoc-sinh" style="display: flex; flex-direction: column; gap: 8px;">
//                                 <div class="dong-chi-tiet-hs" style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap; background: #fdf5f8; padding: 8px; border-radius: 6px; border: 1px dashed #e83e8c;">
//                                     <div style="display:flex; align-items:center; gap:6px; flex:2; min-width:220px; border:2px solid #e83e8c; border-radius:4px; padding:4px 8px; background:#fff;">
//                                         <img class="avatar-preview" src="" style="width:22px; height:22px; border-radius:50%; object-fit:cover; display:none; border:1px solid #eee;">
//                                         <input class="sk-hs" placeholder="👤 Chọn học sinh..." style="border:none; outline:none; flex:1; width:100%; font-size:12px; font-weight:bold; background:transparent; color:#e83e8c;">
//                                     </div>
                                    
//                                     <div style="display: flex; align-items: center; gap: 4px; background: #fff3cd; padding: 4px 8px; border: 1px solid #ffeeba; border-radius: 4px;">
//                                         <span style="font-size: 11px; font-weight: bold; color: #856404;">Điểm trừ:</span>
//                                         <input type="number" step="0.5" class="sk-diem-tru" value="0" style="width: 55px; padding: 4px; border: 1px solid #ccc; border-radius: 4px; font-size: 12px; font-weight: bold; color: #dc3545; text-align: center; outline: none;" title="Điểm trừ cho học sinh này">
//                                     </div>

//                                     <button type="button" onclick="if(typeof ham_21_31_them_hs_cho_su_kien === 'function') ham_21_31_them_hs_cho_su_kien(this)" style="padding: 6px 10px; background: #fff; color: #e83e8c; border: 1px dashed #e83e8c; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: bold; white-space:nowrap;" title="Chọn thêm học sinh cùng sự kiện">➕ Thêm học sinh cùng sự kiện</button>
//                                 </div>
//                             </div>

//                             <!-- Hàng 3: Ghi chú thêm -->
//                             <div>
//                                 <input class="sk-ghichu" placeholder="📝 Ghi chú thêm cho sự kiện..." style="width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; box-sizing: border-box;">
//                             </div>

//                             <!-- Hàng 4: Phân loại sự kiện (Thẻ Tag) -->
//                             <div>
//                                 <label style="font-size: 11px; font-weight: bold; color: #6c757d; display: block; margin-bottom: 4px;">🏷️ Phân loại sự kiện (Theo nội quy thi đua):</label>
//                                 <div class="sk-vung-chon-the" style="display: flex; gap: 6px; flex-wrap: wrap; align-items: center;"></div>
//                                 <input type="hidden" class="sk-loi-hidden" value="">
//                             </div>

//                             <!-- Hàng 5: Ảnh minh chứng riêng -->
//                             <div style="display: flex; align-items: center; gap: 10px; border-top: 1px dashed #eee; padding-top: 6px;">
//                                 <button type="button" class="btn-anh-sk-dong" onclick="this.nextElementSibling.click()" style="padding: 4px 8px; background: #e0f7fa; color: #00838f; border: 1px dashed #00acc1; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: bold;">📷 Ảnh minh chứng dòng này</button>
//                                 <input type="file" accept="image/*" class="input-anh-sk-dong" style="display:none;" onchange="if(typeof window.ham_21_33_chon_anh_sk_dong === 'function') window.ham_21_33_chon_anh_sk_dong(this)">
//                                 <div class="vung-preview-anh-sk-dong" style="display: flex; gap: 6px; align-items: center; overflow-x: auto;"></div>
//                             </div>

//                         </div>
//                     </div>

//                     <button onclick="if(typeof ham_21_4_them_dong_su_kien === 'function') ham_21_4_them_dong_su_kien();" style="margin-top: 10px; padding: 8px 15px; background: #fff; border: 1px dashed #e83e8c; color: #e83e8c; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: bold;">
//                         ➕ Thêm dòng sự kiện mới
//                     </button>
//                 </div>
                
//                 <div style="text-align: center; margin-bottom: 15px;">
//                     <button onclick="if(typeof ham_21_6_dua_vao_danh_sach_cho === 'function') ham_21_6_dua_vao_danh_sach_cho();" style="padding: 12px 20px; background: #fff; color: #e83e8c; border: 2px dashed #e83e8c; border-radius: 6px; font-weight: bold; font-size: 15px; cursor: pointer; width: 100%;">⬇️ ĐƯA XUỐNG DANH SÁCH CHỜ LƯU</button>
//                 </div>

//                 <div style="background: #f8f9fa; border: 1px solid #ced4da; border-radius: 8px; padding: 15px; max-height: 350px; overflow-y: auto; margin-bottom: 15px;">
//                     <div style="font-size: 14px; font-weight: bold; color: #495057; margin-bottom: 12px; border-bottom: 2px solid #dee2e6; padding-bottom: 8px;">Sự kiện đang chờ lưu (<span id="gvcn-dem-su-kien" style="color:#e83e8c;">0</span>):</div>
//                     <div id="gvcn-danh-sach-cho-luu"><i style="color: #adb5bd; font-size: 13px;">Chưa có sự kiện nào...</i></div>
//                 </div>

//                 <div style="text-align: right;">
//                     <button onclick="if(typeof ham_21_15_luu_su_kien_tuan_truoc === 'function') ham_21_15_luu_su_kien_tuan_truoc(this);" style="padding: 12px 30px; background: #e83e8c; color: white; border: none; border-radius: 8px; font-weight: bold; font-size: 15px; cursor: pointer; box-shadow: 0 4px 10px rgba(232,62,140,0.3);">💾 LƯU CÁC SỰ KIỆN MỤC 5</button>
//                 </div>
//             </div>
//         </div>
//     `;

//     if (typeof window.ham_21_34_render_tat_ca_cac_the_su_kien === 'function') {
//         window.ham_21_34_render_tat_ca_cac_the_su_kien();
//     }
// };

// =====================================================================
// HÀM 21.38: GIAO DIỆN ĐỘC LẬP CHO MỤC 5 (BẤM THÊM LÀ TẠO KHỐI SỰ KIỆN MỚI)
// =====================================================================
window.ham_21_38_ve_giao_dien_muc_5 = function () {
    const vungMuc5 = document.getElementById('vung-chua-muc-5');
    if (!vungMuc5) return;

    vungMuc5.innerHTML = `
        <div style="background: #fff; padding: 25px; border-radius: 10px; border: 1px solid #dee2e6; box-shadow: 0 4px 10px rgba(0,0,0,0.03); width: 100%; box-sizing: border-box;">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px dashed #fce4ec; padding-bottom: 10px; margin-bottom: 15px;">
                <h4 style="margin: 0; color: #e83e8c; font-size: 17px;">🎯 5. Quản lý Sự kiện (Tuần trước / Vi phạm)</h4>
                <button onclick="window.ham_21_22_toggle_muc('body-muc-5', this);" style="background: #f8f9fa; border: 1px solid #ccc; padding: 5px 12px; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: bold;">➖ Thu hẹp</button>
            </div>
            
            <div id="body-muc-5">
                <!-- Thanh điều hướng tuần độc lập -->
                <div style="background: #fdf5f8; padding: 15px; border-radius: 8px; border: 2px solid #e83e8c; margin-bottom: 20px;">
                    <label style="font-weight: bold; font-size: 14px; color: #e83e8c; display:block; margin-bottom:8px;">B1. Chọn Tuần xảy ra sự kiện (Độc lập):</label>
                    <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
                        <div style="display: flex; gap: 4px;">
                            <button onclick="if(typeof ham_21_29_chuyen_tuan_su_kien === 'function') ham_21_29_chuyen_tuan_su_kien(-1)" style="padding: 8px 12px; background: #e83e8c; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;" title="Tuần trước">◀ Lùi</button>
                            <button onclick="if(typeof ham_21_29_chuyen_tuan_su_kien === 'function') ham_21_29_chuyen_tuan_su_kien(1)" style="padding: 8px 12px; background: #e83e8c; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;" title="Tuần sau">Tiến ▶</button>
                        </div>
                        <input id="gvcn-sk-tuan-chon" list="dl-tuan" onchange="if(typeof ham_21_30_cap_nhat_ngay_tuan_su_kien === 'function') ham_21_30_cap_nhat_ngay_tuan_su_kien();" placeholder="Chọn tuần..." style="width: 140px; padding: 9px; border: 1px solid #ced4da; border-radius: 6px; font-weight: bold; font-size: 14px; outline: none; background:#fff; color:#e83e8c;">
                        <span style="font-size:12px; font-weight:bold; color:#6c757d;">Từ:</span>
                        <input type="date" id="gvcn-sk-tuan-tu" style="width: 130px; padding: 8px; border: 1px solid #ced4da; border-radius: 6px; font-size: 12px; font-weight: bold; outline: none;">
                        <span style="font-size:12px; font-weight:bold; color:#6c757d;">Đến:</span>
                        <input type="date" id="gvcn-sk-tuan-den" style="width: 130px; padding: 8px; border: 1px solid #ced4da; border-radius: 6px; font-size: 12px; font-weight: bold; outline: none;">
                    </div>
                </div>

                <!-- B2: NHẬP DANH SÁCH SỰ KIỆN (CÓ NÚT THÊM KHỐI MỚI Ở TRÊN) -->
                <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border: 1px solid #ced4da; margin-bottom: 15px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid #ddd; padding-bottom: 8px;">
                        <label style="font-weight: bold; font-size: 13px; color: #495057;">B2. Nhập danh sách Sự kiện / Vi phạm:</label>
                        <div style="display: flex; gap: 8px;">
                            <button type="button" onclick="if(typeof ham_21_4_them_dong_su_kien === 'function') ham_21_4_them_dong_su_kien();" style="padding: 7px 15px; background: #28a745; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: bold;">➕ Thêm dòng sự kiện mới</button>
                            <button type="button" onclick="if(typeof ham_21_32_mo_modal_them_the === 'function') ham_21_32_mo_modal_them_the()" style="padding: 7px 12px; background: #e83e8c; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: bold;">➕ Thêm tag mới</button>
                        </div>
                    </div>
                    
                    <!-- VÙNG CHỨA CÁC KHỐI SỰ KIỆN ĐƯỢC THÊM VÀO -->
                    <div id="gvcn-khu-vuc-su-kien-nhanh" style="display: flex; flex-direction: column; gap: 12px;"></div>
                </div>
                
                <div style="text-align: center; margin-bottom: 15px;">
                    <button onclick="if(typeof ham_21_6_dua_vao_danh_sach_cho === 'function') ham_21_6_dua_vao_danh_sach_cho();" style="padding: 12px 20px; background: #fff; color: #e83e8c; border: 2px dashed #e83e8c; border-radius: 6px; font-weight: bold; font-size: 15px; cursor: pointer; width: 100%;">⬇️ ĐƯA XUỐNG DANH SÁCH CHỜ LƯU</button>
                </div>

                <div style="background: #f8f9fa; border: 1px solid #ced4da; border-radius: 8px; padding: 15px; max-height: 350px; overflow-y: auto; margin-bottom: 15px;">
                    <div style="font-size: 14px; font-weight: bold; color: #495057; margin-bottom: 12px; border-bottom: 2px solid #dee2e6; padding-bottom: 8px;">Sự kiện đang chờ lưu (<span id="gvcn-dem-su-kien" style="color:#e83e8c;">0</span>):</div>
                    <div id="gvcn-danh-sach-cho-luu"><i style="color: #adb5bd; font-size: 13px;">Chưa có sự kiện nào...</i></div>
                </div>

                <div style="text-align: right;">
                    <button onclick="if(typeof ham_21_15_luu_su_kien_tuan_truoc === 'function') ham_21_15_luu_su_kien_tuan_truoc(this);" style="padding: 12px 30px; background: #e83e8c; color: white; border: none; border-radius: 8px; font-weight: bold; font-size: 15px; cursor: pointer; box-shadow: 0 4px 10px rgba(232,62,140,0.3);">💾 LƯU CÁC SỰ KIỆN MỤC 5</button>
                </div>
            </div>
        </div>
    `;

    // Tự động tạo sẵn 1 khối sự kiện đầu tiên khi mở trang
    if (typeof window.ham_21_4_them_dong_su_kien === 'function') {
        window.ham_21_4_them_dong_su_kien();
    }
};
// =====================================================================
// HÀM 21.39: HỖ TRỢ TÍNH THỨ TRONG TUẦN TỪ YYYY-MM-DD
// =====================================================================
window.ham_21_39_lay_thu_trong_tuần = function (ngayStr) {
    if (!ngayStr) return '';
    let d = new Date(ngayStr);
    let thuNum = d.getDay();
    if (thuNum === 0) return 'Chủ Nhật';
    return `Thứ ${thuNum + 1}`;
};



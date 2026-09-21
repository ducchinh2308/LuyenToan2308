

// =====================================================================
// KHỐI 20: TIỆN ÍCH - NHẬT KÝ DẠY HỌC (ẢNH MINH CHỨNG DÙNG CHUNG)
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
                    <button onclick="ham_20_29_lam_moi_tiet_hoc()" style="padding: 6px 15px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: 0.2s;" onmouseover="this.style.background='#0056b3'" onmouseout="this.style.background='#007bff'">
                        🆕 Tiết mới
                    </button>

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
                        
                        <!-- BƯỚC 1: CHỌN HỌC SINH -->
                        <div style="margin-bottom: 15px;">
                            <label style="font-weight: bold; font-size: 13px; color: #495057;">B1. Chọn học sinh (Có thể thêm nhóm):</label>
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
                        
                        <!-- BƯỚC 2: GHI CHÚ -->
                        <div style="margin-bottom: 15px;">
                            <label style="font-weight: bold; font-size: 13px; color: #495057;">B2. Ghi chú thêm (Nếu cần):</label>
                            <input id="nk-input-ghi-chu" type="text" placeholder="VD: Bấm điện thoại dưới hộc bàn..." onkeydown="if(event.key === 'Enter') ham_20_3_gan_the('Khác', '#000')" style="width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; margin-top: 5px; outline: none;">
                        </div>

                        <!-- BƯỚC 3: ẢNH MINH CHỨNG (DÙNG CHUNG) -->
                        <div style="margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px dashed #ccc;">
                            <label style="font-weight: bold; font-size: 13px; color: #495057; display: block; margin-bottom: 8px;">B3. 📸 Ảnh minh chứng (Dùng chung cho cả Thẻ & Điểm):</label>
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

                        <!-- BƯỚC 4: CHỐT SỰ KIỆN -->
                        <div style="margin-bottom: 5px;">
                            <label style="font-weight: bold; font-size: 13px; color: #0056b3; display: block; margin-bottom: 8px;">B4. BẤM CHỌN LOẠI SỰ KIỆN ĐỂ GHI NHẬN:</label>
                        </div>

                        <!-- 🌟 KHU VỰC THẺ VI PHẠM CŨ (TRÊN) -->
                        <div style="margin-bottom: 15px; background: #fffcf8; padding: 10px; border-radius: 6px; border: 1px dashed #ffc107;">
                            <label style="font-weight: bold; font-size: 12px; color: #dc3545; display: block; margin-bottom: 5px;">⚠️ Vi phạm / Nhắc nhở:</label>
                            <div id="nk-khu-vuc-tags"><span style="font-size: 12px; color: #999;">⏳ Đang tải...</span></div>
                        </div>

                        <!-- 🌟 KHU VỰC THẺ TÍCH CỰC (ĐẶT TRÊN Ô NHẬP ĐIỂM) -->
                        <div style="margin-bottom: 15px; background: #f0fdf4; padding: 10px; border-radius: 6px; border: 1px dashed #28a745;">
                            <label style="font-weight: bold; font-size: 12px; color: #28a745; display: block; margin-bottom: 5px;">🌟 Ghi nhận Tích cực (Khen thưởng):</label>
                            <div id="nk-khu-vuc-tags-tich-cuc"><span style="font-size: 12px; color: #999;">⏳ Đang tải...</span></div>
                        </div>

                        <!-- 🌟 Ô NHẬP ĐIỂM -->
                        <div style="width: 100%; margin-bottom: 15px; padding: 10px; background: #e8f5e9; border: 1px dashed #28a745; border-radius: 6px; display: flex; gap: 8px; align-items: center; box-shadow: inset 0 1px 3px rgba(0,0,0,0.05); box-sizing: border-box;">
                            <span style="font-size: 16px;" title="Cho điểm học sinh">💯</span>
                            <input type="number" id="nk-input-diem-so" placeholder="Nhập điểm..." step="0.25" min="0" max="10" 
                                onkeydown="if(event.key === 'Enter') document.getElementById('btn-ghi-diem').click()" 
                                style="flex: 1; min-width: 80px; padding: 8px 10px; border: 1px solid #28a745; border-radius: 4px; outline: none; font-weight: bold; color: #155724; font-size: 13px;">
                            <button id="btn-ghi-diem" 
                                onclick="let diem = document.getElementById('nk-input-diem-so').value; if(!diem){alert('Vui lòng nhập điểm!'); return;} ham_20_3_gan_the('Cho điểm: ' + diem + ' đ', '#28a745'); document.getElementById('nk-input-diem-so').value='';" 
                                style="padding: 8px 12px; font-size: 12px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; transition: 0.2s; white-space: nowrap;" 
                                onmouseover="this.style.background='#218838'" onmouseout="this.style.background='#28a745'">
                                Ghi nhận Điểm
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


// // =======================================================
// // HÀM 20.3: XỬ LÝ KHI BẤM NÚT "GẮN THẺ" HOẶC "NHẬP ĐIỂM"
// // =======================================================
// window.ham_20_3_gan_the = function (tenThe, mauSac = '#000') {
//     const cacOChonHS = document.querySelectorAll('.nk-input-hs-su-kien');
//     const oGhiChu = document.getElementById('nk-input-ghi-chu');
//     let noiDungGhiChu = oGhiChu.value.trim();

//     let coHocSinhDuocChon = false;

//     // Check xem thẻ Điểm thì lưu riêng điểm số
//     let diemSo = null;
//     if (tenThe.startsWith('Cho điểm: ')) {
//         diemSo = parseFloat(tenThe.split(': ')[1]);
//         tenThe = 'Cho điểm';
//     }

//     // 🌟 Lấy ảnh minh chứng từ mảng tạm thay vì lấy từ input trực tiếp
//     let mangFileAnhMC = [];
//     if (window.danhSachAnhMinhChungTam && window.danhSachAnhMinhChungTam.length > 0) {
//         mangFileAnhMC = [...window.danhSachAnhMinhChungTam];
//     }

//     cacOChonHS.forEach(oHS => {
//         const hSInfo = oHS.value.trim();
//         if (hSInfo) {
//             coHocSinhDuocChon = true;
//             const danhSachOptions = document.querySelectorAll('#nk-dl-hs option');
//             let uidHS = null;
//             let sdtHS = '';

//             danhSachOptions.forEach(opt => {
//                 if (opt.value === hSInfo) {
//                     uidHS = opt.dataset.uid;
//                     sdtHS = opt.dataset.sdt;
//                 }
//             });

//             if (uidHS) {
//                 let suKienMoi = {
//                     id_tam: 'sk_' + Date.now() + Math.random(),
//                     uid_hoc_sinh: uidHS,
//                     ten_hoc_sinh: hSInfo.split(' - ')[0].trim(),
//                     sdt_hoc_sinh: sdtHS,
//                     loai_the: tenThe,
//                     ghi_chu: noiDungGhiChu,
//                     mau_sac: mauSac,
//                     diem_so: diemSo,
//                     mang_file_minh_chung: mangFileAnhMC // Gắn toàn bộ mảng file chụp được vào sự kiện
//                 };
//                 danhSachSuKienTam.push(suKienMoi);
//             }
//         }
//     });

//     if (!coHocSinhDuocChon) {
//         alert("⚠️ Thầy chưa nhập tên học sinh nào để gắn thẻ/điểm!");
//         return;
//     }

//     // Xóa trắng mọi thứ để chuẩn bị cho lượt nhập tiếp theo
//     cacOChonHS.forEach((o, i) => { if (i > 0) o.parentElement.remove(); else o.value = ''; });
//     oGhiChu.value = '';

//     // Xóa trắng mảng ảnh minh chứng tạm và giao diện hiển thị
//     window.danhSachAnhMinhChungTam = [];
//     if (typeof ham_20_22_render_anh_minh_chung === 'function') ham_20_22_render_anh_minh_chung();

//     if (typeof ham_20_4_ve_danh_sach_cho === 'function') ham_20_4_ve_danh_sach_cho();
// };


// =======================================================
// HÀM 20.3: XỬ LÝ KHI BẤM NÚT "GẮN THẺ" HOẶC "NHẬP ĐIỂM"
// =======================================================
window.ham_20_3_gan_the = function (tenThe, mauSac = '#000') {
    const cacOChonHS = document.querySelectorAll('.nk-input-hs-su-kien');
    const oGhiChu = document.getElementById('nk-input-ghi-chu');
    let noiDungGhiChu = oGhiChu.value.trim();

    // 1. KIỂM TRA QUY TẮC: KHÔNG CHO PHÉP NẠP THẺ NẾU CHƯA CHỌN HS
    let coHocSinhDuocChon = false;
    cacOChonHS.forEach(o => { if (o.value.trim() !== '') coHocSinhDuocChon = true; });

    if (!coHocSinhDuocChon) {
        alert("⚠️ Yêu cầu: Vui lòng nhập/chọn Tên học sinh trước khi bấm gắn Thẻ lỗi hoặc Sự kiện!");
        return;
    }

    // Lọc điểm số nếu là thẻ Cho điểm
    let diemSo = null;
    if (tenThe.startsWith('Cho điểm: ')) {
        diemSo = parseFloat(tenThe.split(': ')[1]);
        tenThe = 'Cho điểm';
    }

    // Lấy toàn bộ ảnh đang nạp sẵn ở khung chờ
    let mangFileAnhMC = [];
    if (window.danhSachAnhMinhChungTam && window.danhSachAnhMinhChungTam.length > 0) {
        mangFileAnhMC = [...window.danhSachAnhMinhChungTam];
    }

    // 2. GỘP (HỌC SINH + THẺ + ẢNH) THÀNH SỰ KIỆN MỚI
    cacOChonHS.forEach(oHS => {
        const hSInfo = oHS.value.trim();
        if (hSInfo) {
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
                    // Copy mảng ảnh để dùng chung cho nhiều học sinh nếu thầy chọn 1 nhóm
                    mang_file_minh_chung: [...mangFileAnhMC]
                };
                window.danhSachSuKienTam.push(suKienMoi);
            }
        }
    });

    // 3. DỌN DẸP SẠCH SẼ ĐỂ CHUẨN BỊ CHO LƯỢT NHẬP TIẾP THEO
    cacOChonHS.forEach((o, i) => { if (i > 0) o.parentElement.remove(); else o.value = ''; });
    oGhiChu.value = '';

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

//         let html = '<div style="display: flex; flex-wrap: wrap; gap: 6px;">';

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

//         html += '</div>';

//         khuVucTags.innerHTML = html;

//     } catch (err) {
//         console.error("Lỗi tải thẻ:", err);
//         khuVucTags.innerHTML = '<span style="color:red">❌ Lỗi tải danh sách thẻ!</span>';
//     }
// };



// =======================================================
// HÀM 20.8: TẢI DANH SÁCH THẺ VÀ TÁCH RA LÀM 2 KHU VỰC
// =======================================================
window.ham_20_8_tai_danh_sach_the = async function () {
    const khuVucTagsViPham = document.getElementById('nk-khu-vuc-tags');
    const khuVucTagsTichCuc = document.getElementById('nk-khu-vuc-tags-tich-cuc');

    if (!khuVucTagsViPham) return;

    try {
        const { data: theData, error } = await _supabase
            .from('cai_dat_the_su_kien')
            .select('*')
            .order('ngay_tao', { ascending: true });

        if (error) throw error;

        // Tách rõ ràng 2 luồng Cấu hình
        const nhomCauHinhViPham = [
            { id: 'bai_ve_nha', ten: '🏠 Bài về nhà', mau: '#fd7e14' },
            { id: 'hoc_bai', ten: '🧠 Học bài ở nhà', mau: '#dc3545' },
            { id: 'tai_lop', ten: '✍️ Làm bài tại lớp', mau: '#007bff' },
            { id: 'thai_do', ten: '🎭 Thái độ học tập', mau: '#6f42c1' }
        ];

        const nhomCauHinhTichCuc = [
            { id: 'tich_cuc', ten: '🌟 Thẻ tích cực', mau: '#28a745' } // Tách riêng 1 mình 1 cõi
        ];

        // Thuật toán vẽ giao diện chung cho mọi thẻ
        const renderHTMLThe = (mangCauHinh) => {
            let html = '<div style="display: flex; flex-wrap: wrap; gap: 6px;">';
            mangCauHinh.forEach(nhom => {
                html += `<div style="width: 100%; font-size: 11px; font-weight: bold; color: ${nhom.mau}; border-bottom: 1px dashed ${nhom.mau}; padding-bottom: 2px; margin-top: 5px; text-transform: uppercase;">${nhom.ten}</div>`;

                let theCuaNhom = theData ? theData.filter(t => t.nhom_the === nhom.id) : [];
                theCuaNhom.forEach(the => {
                    let tenTheAnToan = the.ten_the.replace(/'/g, "\\'");
                    html += `
                    <div style="display: inline-flex; border: 1px solid ${the.mau_sac}; border-radius: 4px; overflow: hidden; background: #fff;">
                        <button type="button" onclick="ham_20_3_gan_the('${tenTheAnToan}', '${the.mau_sac}')" style="padding: 5px 8px; font-size: 11px; background: transparent; border: none; color: ${the.mau_sac}; cursor: pointer; font-weight: bold;" title="Bấm để gắn thẻ">${the.ten_the}</button>
                        <button type="button" onclick="ham_20_10_quan_ly_tag('${the.id}', '${tenTheAnToan}')" style="padding: 3px 6px; font-size: 10px; background: #f8f9fa; border: none; border-left: 1px dashed ${the.mau_sac}; color: #6c757d; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#e9ecef'" onmouseout="this.style.background='#f8f9fa'" title="Sửa hoặc Xóa thẻ này">✏️</button>
                    </div>
                    `;
                });

                html += `<button type="button" onclick="ham_20_9_them_tag_moi('${nhom.id}', '${nhom.mau}')" style="padding: 5px 10px; font-size: 11px; background: #f8f9fa; border: 1px dashed ${nhom.mau}; color: ${nhom.mau}; border-radius: 4px; cursor: pointer; font-weight: bold; transition: 0.2s;" onmouseover="this.style.background='#e2e6ea'" onmouseout="this.style.background='#f8f9fa'">➕ Thêm tag</button>`;
            });
            html += '</div>';
            return html;
        };

        // Gắn vào 2 div tương ứng trên giao diện
        khuVucTagsViPham.innerHTML = renderHTMLThe(nhomCauHinhViPham);

        if (khuVucTagsTichCuc) {
            khuVucTagsTichCuc.innerHTML = renderHTMLThe(nhomCauHinhTichCuc);
        }

    } catch (err) {
        console.error("Lỗi tải thẻ:", err);
        khuVucTagsViPham.innerHTML = '<span style="color:red">❌ Lỗi tải danh sách thẻ!</span>';
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

// // =======================================================
// // HÀM 20.11: XỬ LÝ ẢNH BÀI GIẢNG (CÓ CẮT & NÉN)
// // =======================================================
// window.ham_20_11b_kich_hoat_preview_anh = function () {
//     const inputAnhBG = document.getElementById('nk-input-anh-bai-giang');
//     if (inputAnhBG) {
//         inputAnhBG.addEventListener('change', async function (e) {
//             const files = Array.from(e.target.files);
//             if (files.length === 0) return;

//             // Xử lý cắt & nén tuần tự
//             let processedFiles = await window.ham_20_25_xu_ly_mang_anh_dau_vao(files);

//             // Đưa ảnh đã cắt/nén vào mảng tạm
//             window.danhSachAnhBaiGiangTam.push(...processedFiles);
//             ham_20_11_render_anh_bai_giang();

//             // Xóa rỗng input để lần sau chụp tiếp
//             e.target.value = '';
//         });
//     }
// };



// =======================================================
// HÀM 20.11: XỬ LÝ ẢNH BÀI GIẢNG (FIX LỖI KẸT ẢNH)
// =======================================================
window.ham_20_11_kich_hoat_preview_anh = function () {
    const inputAnhBG = document.getElementById('nk-input-anh-bai-giang');
    if (inputAnhBG) {
        // Tái tạo nút input để xóa sạch các sự kiện cũ chống kẹt
        const new_input = inputAnhBG.cloneNode(true);
        inputAnhBG.parentNode.replaceChild(new_input, inputAnhBG);

        new_input.addEventListener('change', async function (e) {
            const files = Array.from(e.target.files);
            if (files.length === 0) return;

            let processedFiles = await window.ham_20_25_xu_ly_mang_anh_dau_vao(files);

            // Đảm bảo mảng luôn tồn tại trước khi đẩy dữ liệu
            if (!window.danhSachAnhBaiGiangTam) window.danhSachAnhBaiGiangTam = [];
            window.danhSachAnhBaiGiangTam.push(...processedFiles);

            ham_20_11_render_anh_bai_giang();
            e.target.value = ''; // Reset input để chọn lại đúng tấm đó vẫn được
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
// HÀM 20.14: GIAO DIỆN TRA CỨU NHẬT KÝ (GIỮ NGUYÊN GIAO DIỆN ĐA NĂNG)
// =======================================================
window.ham_20_14_giao_dien_tra_cuu = function () {
    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
    if (!vungLamViec) return;

    // THUẬT TOÁN TÍNH "THỨ 2 TUẦN TRƯỚC" VÀ "HÔM NAY"
    const layNgayChuoi = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

    let today = new Date();
    const homNay = layNgayChuoi(today);

    let day = today.getDay();
    let diffToMonday = today.getDate() - day + (day === 0 ? -6 : 1);
    let lastMondayObj = new Date(today.setDate(diffToMonday - 7));
    const thu2TuanTruoc = layNgayChuoi(lastMondayObj);

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
                        <input type="date" id="tc-tu-ngay" value="${thu2TuanTruoc}" style="width: 100%; padding: 10px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; outline: none;">
                    </div>
                    <div style="width: 150px;">
                        <label style="font-weight: bold; font-size: 13px; color: #495057;">Đến ngày (Hôm nay):</label>
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
                        <label style="font-weight: bold; font-size: 13px; color: #dc3545;">* BẮT BUỘC CHỌN LỚP:</label>
                        <input id="tc-input-lop" list="dl-lop" onchange="if(typeof ham_20_2_tai_danh_sach_hs_theo_lop === 'function') ham_20_2_tai_danh_sach_hs_theo_lop()" placeholder="VD: 12TN6..." style="width: 100%; padding: 10px; border: 2px solid #ffc107; border-radius: 4px; box-sizing: border-box; font-weight: bold; outline: none;">
                        <datalist id="dl-lop"></datalist>
                    </div>
                    
                    <div style="flex: 1.5; min-width: 200px;">
                        <label style="font-weight: bold; font-size: 13px; color: #007bff;">Tìm Học sinh (Tùy chọn):</label>
                        <input id="tc-input-hs" class="nk-input-hs-su-kien" list="nk-dl-hs" placeholder="Bỏ trống để xem Dashboard Cả Lớp..." style="width: 100%; padding: 10px; border: 1px solid #17a2b8; border-radius: 4px; box-sizing: border-box; outline: none;">
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
// HÀM 20.15: THỰC HIỆN TRA CỨU - RENDER DASHBOARD 3 KHU VỰC (ĐỒNG BỘ TÊN HÀM POPUP)
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

    if (!tuNgay || !denNgay || !maLopLuu) {
        alert("⚠️ Vui lòng chọn đủ: Từ ngày, Đến ngày và BẮT BUỘC phải chọn Lớp!");
        return;
    }

    const textGoc = btnLoc.innerHTML;
    btnLoc.innerHTML = "⏳ ĐANG LẤY VÀ PHÂN TÍCH DỮ LIỆU...";
    btnLoc.disabled = true;
    vungKetQua.innerHTML = `<div style="text-align: center; color: #007bff; padding: 30px; font-size: 16px;"><b>⏳ Đang tải và phân tích dữ liệu...</b></div>`;

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

        // 1. LẤY DỮ LIỆU BÀI GIẢNG & SỰ KIỆN
        let queryNhatKy = _supabase.from('nhat_ky_day_hoc').select('*').eq('ma_lop', maLopLuu).gte('ngay_day', tuNgay).lte('ngay_day', denNgay).order('ngay_day', { ascending: false }).order('tiet', { ascending: true });
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
        if (!dsSuKien) dsSuKien = [];

        // Lấy danh sách gốc của Lớp
        let { data: dsHocSinhLop, error: err3 } = await _supabase.from('hoc_sinh').select('*').contains('danh_sach_ma_lop', JSON.stringify([maLopLuu]));
        if (err3) throw err3;

        let mapHocSinh = {};
        if (dsHocSinhLop) {
            dsHocSinhLop.forEach(hs => {
                let tenHienThi = hs.ten || hs.ho_ten || hs.ho_va_ten || 'Chưa có tên';
                let uid = hs.uid || hs.id;
                mapHocSinh[uid] = { ten: tenHienThi, vang: 0, tot: 0, xau: 0, diem: [], suKien: [] };
            });
        }

        dsSuKien.forEach(sk => {
            if (!mapHocSinh[sk.uid_hoc_sinh]) mapHocSinh[sk.uid_hoc_sinh] = { ten: sk.ten_hoc_sinh, vang: 0, tot: 0, xau: 0, diem: [], suKien: [] };
        });

        const tenCacThu = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];

        // =========================================================
        // VẼ KHU 1: BẢNG TIẾN ĐỘ BÀI GIẢNG CỦA LỚP
        // =========================================================
        let rowsKhu1 = '';
        dsNhatKy.forEach(nk => {
            let dateObj = new Date(nk.ngay_day);
            let strNgay = String(dateObj.getDate()).padStart(2, '0') + '/' + String(dateObj.getMonth() + 1).padStart(2, '0') + '/' + dateObj.getFullYear();
            let thuHienTai = tenCacThu[dateObj.getDay()];
            let tietHienThi = `Tiết ${nk.tiet} - ${nk.buoi}`;
            let sortTimeStr = `${nk.ngay_day}_${nk.buoi}_${nk.tiet}`;

            let mangAnhBG = [];
            if (Array.isArray(nk.danh_sach_anh)) mangAnhBG = nk.danh_sach_anh;
            else if (typeof nk.danh_sach_anh === 'string' && nk.danh_sach_anh.length > 5) {
                try { mangAnhBG = JSON.parse(nk.danh_sach_anh); } catch (e) { mangAnhBG = nk.danh_sach_anh.split(',').filter(l => l.trim()); }
            }
            let soAnhBG = mangAnhBG.length;

            let skCuaTiet = dsSuKien.filter(s => s.id_nhat_ky === nk.id);
            let soVang = skCuaTiet.filter(s => s.loai_the === 'Vắng mặt').length;
            let soKienKhac = skCuaTiet.length - soVang;

            rowsKhu1 += `
                <tr style="background: #fff; transition: 0.2s;" onmouseover="this.style.background='#f1f8ff'" onmouseout="this.style.background='#fff'">
                    <td data-sort="${sortTimeStr}" style="padding: 10px; border-bottom: 1px solid #eee;"><b>${strNgay}</b><br><span style="font-size:11px; color:#666;">${thuHienTai}</span></td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee; color: #17a2b8; font-weight:bold;">${tietHienThi}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">${nk.phan_mon || '-'}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight:bold; color:#0056b3;">${nk.ten_bai || '(Chưa nhập tên bài)'}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee; text-align:center;">${soAnhBG > 0 ? `<b style="color:#28a745;">${soAnhBG} 📸</b>` : '-'}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee; text-align:center;">${soVang > 0 ? `<b style="color:red;">${soVang}</b>` : '-'}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee; text-align:center;">${soKienKhac > 0 ? `<b style="color:#d35400;">${soKienKhac}</b>` : '-'}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee; text-align:center;">
                        <button onclick="ham_20_33_xem_chi_tiet_tiet('${nk.id}')" style="background: #007bff; color: white; border: none; padding: 4px 10px; border-radius: 4px; font-size: 11px; cursor: pointer; font-weight: bold;">👁️ Chi tiết</button>
                    </td>
                </tr>
            `;
        });

        // =========================================================
        // VẼ KHU 2: BẢNG THỐNG KÊ HÀNH VI CỦA TẤT CẢ HỌC SINH
        // =========================================================
        dsSuKien.forEach(sk => {
            let uid = sk.uid_hoc_sinh;
            let hs = mapHocSinh[uid];

            let nkTuongUng = dsNhatKy.find(n => n.id === sk.id_nhat_ky);
            let ngaySK = nkTuongUng ? new Date(nkTuongUng.ngay_day) : new Date();
            let strNgaySK = `${String(ngaySK.getDate()).padStart(2, '0')}/${String(ngaySK.getMonth() + 1).padStart(2, '0')}`;

            let laMauXanhLa = (sk.thong_tin_mo_rong?.mau_sac === '#28a745');
            let dsAnh = sk.thong_tin_mo_rong?.danh_sach_anh_minh_chung || [];
            if (typeof dsAnh === 'string') dsAnh = dsAnh.split(',').filter(l => l.trim());

            let coAnh = dsAnh.length > 0;
            let iconAnh = coAnh ? ' 📸' : '';

            // 🌟 ĐỒNG BỘ: MÃ HÓA THÔNG TIN VÀ GỌI ĐÚNG TÊN HÀM ham_20_34_xem_chi_tiet_su_kien_popup
            let encGhiChu = encodeURIComponent(sk.ghi_chu || '');
            let encLoaiThe = encodeURIComponent(sk.loai_the || '');
            let encLinks = encodeURIComponent(dsAnh.join(','));
            let diemSo = sk.thong_tin_mo_rong?.diem_so || '';

            let actionStr = `onclick="ham_20_34_xem_chi_tiet_su_kien_popup('${sk.id}', '${encLoaiThe}', '${encGhiChu}', '${diemSo}', '${strNgaySK}', '${encLinks}')" style="cursor: pointer; box-shadow: 0 1px 3px rgba(0,0,0,0.15); transition: 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'"`;

            let cssChung = "padding: 3px 6px; border-radius: 4px; font-size: 11px; font-weight: bold; white-space: nowrap; display: inline-block;";

            if (sk.loai_the === 'Vắng mặt') {
                hs.vang++;
                hs.suKien.push(`<span ${actionStr} class="tag-sk" style="${cssChung} background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;" title="Bấm để xem & xóa">[${strNgaySK}] Vắng${iconAnh}</span>`);
            }
            else if (sk.loai_the === 'Cho điểm') {
                hs.diem.push(`<b>${diemSo}đ</b>`);
                hs.suKien.push(`<span ${actionStr} class="tag-sk" style="${cssChung} background: #e8f5e9; color: #155724; border: 1px solid #c3e6cb;" title="Bấm để xem & xóa">${iconAnh}[${strNgaySK}] Điểm ${diemSo}</span>`);
            }
            else if (laMauXanhLa) {
                hs.tot++;
                hs.suKien.push(`<span ${actionStr} class="tag-sk" style="${cssChung} background: #d4edda; color: #155724; border: 1px solid #c3e6cb;" title="Bấm để xem & xóa">${iconAnh}[${strNgaySK}] ${sk.loai_the}</span>`);
            }
            else {
                hs.xau++;
                hs.suKien.push(`<span ${actionStr} class="tag-sk" style="${cssChung} background: #fff3cd; color: #856404; border: 1px solid #ffeeba;" title="Bấm để xem & xóa">${iconAnh}[${strNgaySK}] ${sk.loai_the}</span>`);
            }
        });

        let mangHocSinh = Object.values(mapHocSinh).sort((a, b) => a.ten.localeCompare(b.ten, 'vi'));
        if (isTimHocSinh) mangHocSinh = mangHocSinh.filter(hs => hs.ten.toLowerCase().includes(tenHsTimKiem));

        let rowsKhu2 = '';
        mangHocSinh.forEach((hs, idx) => {
            let hasEvent = (hs.vang > 0 || hs.tot > 0 || hs.xau > 0 || hs.diem.length > 0);
            if (hasEvent) {
                rowsKhu2 += `
                    <tr style="background: #fff; transition: 0.2s;" onmouseover="this.style.background='#fdfdfd'" onmouseout="this.style.background='#fff'">
                        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center; color: #999;">${idx + 1}</td>
                        <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">${hs.ten}</td>
                        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center; color: #28a745;">${hs.diem.join(', ') || '-'}</td>
                        <td style="padding: 8px; border-bottom: 1px solid #eee; font-size: 11px;">
                            <span style="color:#28a745; font-weight:bold;">🟢 ${hs.tot} Tốt</span> | 
                            <span style="color:#dc3545; font-weight:bold;">🔴 ${hs.xau} Xấu</span> | 
                            <span style="color:#6c757d; font-weight:bold;">⚫ ${hs.vang} Vắng</span>
                        </td>
                        <td style="padding: 8px; border-bottom: 1px solid #eee;">
                            <div style="display: flex; flex-wrap: wrap; gap: 6px;">${hs.suKien.join('')}</div>
                        </td>
                    </tr>
                `;
            } else {
                rowsKhu2 += `
                    <tr style="background: #f8fbff; transition: 0.2s;" onmouseover="this.style.background='#eef6ff'" onmouseout="this.style.background='#f8fbff'">
                        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center; color: #999;">${idx + 1}</td>
                        <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">${hs.ten}</td>
                        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center; color: #ccc;">-</td>
                        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center; font-size: 11px; font-weight: bold; color: #007bff;">✅ Ổn định</td>
                        <td style="padding: 8px; border-bottom: 1px solid #eee; font-size: 11px; color: #adb5bd; font-style: italic;">Không có vi phạm hay vắng mặt</td>
                    </tr>
                `;
            }
        });

        // =========================================================
        // VẼ KHU 3: CHI TIẾT TỪNG TIẾT CÓ SỰ KIỆN
        // =========================================================
        let dsNhatKyHienThi = isTimHocSinh ? dsNhatKy.filter(nk => dsSuKien.some(sk => sk.id_nhat_ky === nk.id && mapHocSinh[sk.uid_hoc_sinh].ten.toLowerCase().includes(tenHsTimKiem))) : dsNhatKy;

        let htmlKhu3 = '';
        dsNhatKyHienThi.forEach(nk => {
            let dateObj = new Date(nk.ngay_day);
            let strNgay = `${String(dateObj.getDate()).padStart(2, '0')}/${String(dateObj.getMonth() + 1).padStart(2, '0')}/${dateObj.getFullYear()}`;
            let thuHienTai = tenCacThu[dateObj.getDay()];
            let hienThiTiet = `Tiết ${nk.tiet}`;

            let mangAnhBG = [];
            if (Array.isArray(nk.danh_sach_anh)) mangAnhBG = nk.danh_sach_anh;
            else if (typeof nk.danh_sach_anh === 'string' && nk.danh_sach_anh.length > 5) {
                try { mangAnhBG = JSON.parse(nk.danh_sach_anh); } catch (e) { mangAnhBG = nk.danh_sach_anh.split(',').filter(l => l.trim()); }
            }
            let htmlAnhBG = '';
            if (mangAnhBG.length > 0) {
                htmlAnhBG = `<div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 10px; padding: 10px; background: #e0f7fa; border-radius: 6px;">`;
                mangAnhBG.forEach((link) => {
                    htmlAnhBG += `<a href="${link}" target="_blank"><img src="${taoLinkAnhPreview(link)}" loading="lazy" style="height: 8cm; width: 8cm; object-fit: cover; border-radius: 6px; border: 2px solid #00acc1; box-shadow: 0 2px 4px rgba(0,0,0,0.15); background: #fff;"></a>`;
                });
                htmlAnhBG += `</div>`;
            }

            let skCuaTiet = dsSuKien.filter(sk => sk.id_nhat_ky === nk.id);
            if (isTimHocSinh) skCuaTiet = skCuaTiet.filter(sk => mapHocSinh[sk.uid_hoc_sinh].ten.toLowerCase().includes(tenHsTimKiem));

            let vangMat = skCuaTiet.filter(sk => sk.loai_the === 'Vắng mặt');
            let suKienKhac = skCuaTiet.filter(sk => sk.loai_the !== 'Vắng mặt');

            let htmlSuKien = '';
            if (vangMat.length > 0) {
                htmlSuKien += `<strong style="color: #dc3545; font-size: 13px;">❌ Vắng mặt:</strong> <span style="font-size:13px; font-weight:bold;">${vangMat.map(v => v.ten_hoc_sinh).join(', ')}</span><br>`;
            }
            if (suKienKhac.length > 0) {
                htmlSuKien += `<strong style="color: #d35400; font-size: 13px; display:inline-block; margin-top:8px;">🎯 Sự kiện / Điểm:</strong><div style="margin-top: 5px;">`;
                suKienKhac.forEach(sk => {
                    let textGC = sk.ghi_chu ? ` - <i>${sk.ghi_chu}</i>` : '';
                    let mauThe = sk.thong_tin_mo_rong?.mau_sac || '#fd7e14';
                    let badgeDiem = (sk.loai_the === 'Cho điểm' && sk.thong_tin_mo_rong?.diem_so) ? `<span style="background:#28a745; color:white; padding:1px 5px; border-radius:3px; font-size:11px; margin-right:4px;">⭐ ${sk.thong_tin_mo_rong.diem_so}đ</span>` : '';

                    let dsMC = sk.thong_tin_mo_rong?.danh_sach_anh_minh_chung || [];
                    if (typeof dsMC === 'string') dsMC = dsMC.split(',').filter(l => l.trim());
                    let htmlMC = dsMC.length > 0 ? `<div style="display:flex; gap:10px; flex-wrap: wrap; margin-top:8px;">${dsMC.map(l => `<a href="${l}" target="_blank"><img src="${taoLinkAnhPreview(l)}" style="height: 8cm; width: 8cm; object-fit:cover; border-radius:6px; border:2px solid #ccc; box-shadow: 0 2px 4px rgba(0,0,0,0.1);"></a>`).join('')}</div>` : '';

                    htmlSuKien += `<div style="margin-bottom:8px; border-left:3px solid ${mauThe}; padding-left:10px; background:#fff; padding-top:6px; padding-bottom:6px; font-size:13px; box-shadow: 0 1px 2px rgba(0,0,0,0.05); border-radius: 0 6px 6px 0;">
                        <b>${sk.ten_hoc_sinh}</b>: ${badgeDiem}<span style="color:${mauThe}; font-weight:bold;">[${sk.loai_the}]</span><span style="color:#555;">${textGC}</span>${htmlMC}
                    </div>`;
                });
                htmlSuKien += `</div>`;
            }
            if (skCuaTiet.length === 0) htmlSuKien = `<i style="color:#28a745; font-size:12px;">✅ Không có sự kiện nào.</i>`;

            htmlKhu3 += `
                <div id="card-tiet-${nk.id}" style="background: #fff; border: 1px solid #ced4da; border-radius: 8px; box-shadow: 0 3px 6px rgba(0,0,0,0.05); padding: 15px; margin-bottom: 20px;">
                    <div style="border-bottom: 1px solid #eee; padding-bottom: 10px; margin-bottom: 10px; display: flex; align-items: center; gap: 10px;">
                        <span style="background: #17a2b8; color: white; padding: 4px 10px; border-radius: 4px; font-weight: bold; font-size: 13px;">${nk.phan_mon || 'Không rõ môn'}</span>
                        <span style="color: #6c757d; font-size: 13px; font-weight: bold;">🕒 ${hienThiTiet} - ${nk.buoi} - ${thuHienTai}, Ngày ${strNgay}</span>
                    </div>
                    <div style="display: flex; flex-wrap: wrap; gap: 20px;">
                        <div style="flex: 1.5; min-width: 300px; border-right: 1px dashed #ccc; padding-right: 15px;">
                            <div style="font-size: 15px; font-weight: bold; color: #0056b3; margin-bottom: 5px;">📖 Tên bài: ${nk.ten_bai || '---'}</div>
                            <div style="font-size: 13px; color: #333; margin-bottom: 5px;"><b>Lý thuyết:</b> <span style="white-space:pre-wrap;">${nk.ly_thuyet || '---'}</span></div>
                            <div style="font-size: 13px; color: #333; margin-bottom: 5px;"><b>Bài tập:</b> <span style="white-space:pre-wrap;">${nk.bai_tap || '---'}</span></div>
                            <div style="font-size: 13px; color: #856404; background:#fffcf8; padding:5px; border-radius:4px;"><b>Dặn dò:</b> <span style="white-space:pre-wrap;">${nk.dan_do || '---'}</span></div>
                            ${htmlAnhBG}
                        </div>
                        <div style="flex: 1; min-width: 250px; background: #fafafa; padding: 10px; border-radius: 6px;">
                            ${htmlSuKien}
                        </div>
                    </div>
                </div>
            `;
        });

        // TỔNG HỢP GIAO DIỆN
        vungKetQua.innerHTML = `
            <!-- KHU VỰC 1 -->
            <div style="${isTimHocSinh ? 'display:none;' : ''} background: #fff; border: 1px solid #b8daff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); overflow: hidden; margin-bottom: 15px;">
                <div style="background: #e0f3ff; padding: 12px 15px; border-bottom: 1px solid #b8daff; display: flex; justify-content: space-between; align-items: center;">
                    <h4 style="margin: 0; color: #0056b3; font-size: 15px;">🏫 1. TIẾN ĐỘ BÀI GIẢNG CỦA LỚP (${dsNhatKy.length} tiết)</h4>
                    <button onclick="let c = document.getElementById('khu-vuc-1-content'); if(c.style.display==='none'){c.style.display='block'; this.innerHTML='🔽 Thu gọn';}else{c.style.display='none'; this.innerHTML='👁️ Mở rộng';}" style="background: transparent; border: 1px solid #0056b3; color: #0056b3; border-radius: 4px; padding: 3px 8px; font-size: 11px; cursor: pointer; font-weight: bold;">🔽 Thu gọn</button>
                </div>
                <div id="khu-vuc-1-content" style="padding: 15px; overflow-x: auto; display: block;">
                    <table id="bang-tien-do-lop" style="width: 100%; border-collapse: collapse; font-size: 13px; min-width: 600px;">
                        <thead>
                            <tr style="background: #007bff; color: white; text-align: left;">
                                <th onclick="ham_20_21_sap_xep_bang(0, 'bang-tien-do-lop')" style="padding: 10px; cursor: pointer; border-bottom: 2px solid #0056b3;">Thời gian ↕️</th>
                                <th onclick="ham_20_21_sap_xep_bang(1, 'bang-tien-do-lop')" style="padding: 10px; cursor: pointer; border-bottom: 2px solid #0056b3;">Tiết ↕️</th>
                                <th onclick="ham_20_21_sap_xep_bang(2, 'bang-tien-do-lop')" style="padding: 10px; cursor: pointer; border-bottom: 2px solid #0056b3;">Môn ↕️</th>
                                <th onclick="ham_20_21_sap_xep_bang(3, 'bang-tien-do-lop')" style="padding: 10px; cursor: pointer; border-bottom: 2px solid #0056b3; width: 30%;">Tên bài ↕️</th>
                                <th style="padding: 10px; border-bottom: 2px solid #0056b3; text-align:center;">Ảnh BG</th>
                                <th style="padding: 10px; border-bottom: 2px solid #0056b3; text-align:center;">Vắng</th>
                                <th style="padding: 10px; border-bottom: 2px solid #0056b3; text-align:center;">Vi phạm</th>
                                <th style="padding: 10px; border-bottom: 2px solid #0056b3; text-align:center;">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>${rowsKhu1}</tbody>
                    </table>
                </div>
            </div>

            <!-- KHU VỰC 2 -->
            <div style="background: #fff; border: 1px solid #c3e6cb; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); overflow: hidden; margin-bottom: 15px;">
                <div style="background: #d4edda; padding: 12px 15px; border-bottom: 1px solid #c3e6cb; display: flex; justify-content: space-between; align-items: center;">
                    <h4 style="margin: 0; color: #155724; font-size: 15px;">${isTimHocSinh ? '🧑‍🎓 BÁO CÁO CÁ NHÂN: <span style="text-transform:uppercase;">' + tenHsTimKiem + '</span>' : '🧑‍🎓 2. BẢNG THỐNG KÊ HÀNH VI TOÀN LỚP'}</h4>
                    <button onclick="let c = document.getElementById('khu-vuc-2-content'); if(c.style.display==='none'){c.style.display='block'; this.innerHTML='🔽 Thu gọn';}else{c.style.display='none'; this.innerHTML='👁️ Mở rộng';}" style="background: transparent; border: 1px solid #155724; color: #155724; border-radius: 4px; padding: 3px 8px; font-size: 11px; cursor: pointer; font-weight: bold;">🔽 Thu gọn</button>
                </div>
                <div id="khu-vuc-2-content" style="padding: 15px; overflow-x: auto; display: block;">
                    <table id="bang-thong-ke-lop" style="width: 100%; border-collapse: collapse; font-size: 13px; min-width: 600px;">
                        <thead>
                            <tr style="background: #28a745; color: white; text-align: left;">
                                <th style="padding: 10px; border-bottom: 2px solid #1e7e34; text-align: center; width: 40px;">STT</th>
                                <th onclick="ham_20_21_sap_xep_bang(1, 'bang-thong-ke-lop')" style="padding: 10px; cursor: pointer; border-bottom: 2px solid #1e7e34; width: 150px;">Tên Học sinh ↕️</th>
                                <th style="padding: 10px; border-bottom: 2px solid #1e7e34; text-align: center; width: 100px;">💯 Điểm số</th>
                                <th style="padding: 10px; border-bottom: 2px solid #1e7e34; width: 150px;">📊 Đánh giá Nề nếp</th>
                                <th style="padding: 10px; border-bottom: 2px solid #1e7e34;">⏱️ Lịch sử Sự kiện (Bấm vào Thẻ để xem Chi tiết & Xóa)</th>
                            </tr>
                        </thead>
                        <tbody>${rowsKhu2}</tbody>
                    </table>
                </div>
            </div>

            <!-- KHU VỰC 3 -->
            <div style="background: #fff; border: 1px solid #ffeeba; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); overflow: hidden;">
                <div style="background: #fff3cd; padding: 12px 15px; border-bottom: 1px solid #ffeeba; display: flex; justify-content: space-between; align-items: center;">
                    <h4 style="margin: 0; color: #856404; font-size: 15px;">📝 ${isTimHocSinh ? 'CHI TIẾT NỘI DUNG CÁC TIẾT CÓ SỰ KIỆN' : '3. CHI TIẾT NỘI DUNG TỪNG TIẾT'}</h4>
                    <button id="btn-toggle-khu-3" onclick="let c = document.getElementById('khu-vuc-3-content'); if(c.style.display==='none'){c.style.display='block'; this.innerHTML='🔽 Thu gọn';}else{c.style.display='none'; this.innerHTML='👁️ Xem chi tiết';}" style="background: #ffc107; border: 1px solid #d39e00; color: #000; border-radius: 4px; padding: 4px 10px; font-size: 12px; cursor: pointer; font-weight: bold;">${isTimHocSinh ? '🔽 Thu gọn' : '👁️ Xem chi tiết'}</button>
                </div>
                <div id="khu-vuc-3-content" style="padding: 15px; display: ${isTimHocSinh ? 'block' : 'none'}; background: #fafafa;">
                    ${htmlKhu3}
                </div>
            </div>
        `;

    } catch (err) {
        console.error("Lỗi tra cứu:", err);
        vungKetQua.innerHTML = `<div style="text-align: center; color: red; padding: 20px;"><b>❌ Lỗi khi phân tích dữ liệu! ${err.message || ''}</b></div>`;
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
// HÀM 20.22: XỬ LÝ ẢNH MINH CHỨNG (TỰ ĐỘNG GẮN NGƯỢC HOẶC LƯU TẠM)
// =======================================================
window.ham_20_22_kich_hoat_preview_anh_minh_chung = function () {
    const inputAnhMC = document.getElementById('nk-input-anh-minh-chung');
    if (inputAnhMC) {
        const new_input = inputAnhMC.cloneNode(true);
        inputAnhMC.parentNode.replaceChild(new_input, inputAnhMC);

        new_input.addEventListener('change', async function (e) {
            const files = Array.from(e.target.files);
            if (files.length === 0) return;

            // Xử lý nén/cắt ảnh
            let processedFiles = await window.ham_20_25_xu_ly_mang_anh_dau_vao(files);

            // 🌟 KIỂM TRA XEM THẦY ĐANG ĐỊNH LÀM GÌ?
            let coHocSinhDuocChon = false;
            document.querySelectorAll('.nk-input-hs-su-kien').forEach(o => {
                if (o.value.trim() !== '') coHocSinhDuocChon = true;
            });

            // QUY TẮC: Nếu ô nhập tên đang TRỐNG + Đã có sự kiện ở dưới -> Tự nạp vào sự kiện cuối
            if (!coHocSinhDuocChon && window.danhSachSuKienTam && window.danhSachSuKienTam.length > 0) {
                let indexCuoi = window.danhSachSuKienTam.length - 1;
                let lastEvent = window.danhSachSuKienTam[indexCuoi];

                if (!lastEvent.mang_file_minh_chung) lastEvent.mang_file_minh_chung = [];
                lastEvent.mang_file_minh_chung.push(...processedFiles);

                // Vẽ lại danh sách chờ ngay lập tức để thầy thấy ảnh đã được nhét vào
                if (typeof ham_20_4_ve_danh_sach_cho === 'function') ham_20_4_ve_danh_sach_cho();
            }
            // QUY TẮC: Nếu đã nhập tên (chuẩn bị gắn thẻ) HOẶC chưa có sự kiện nào -> Để ở khung chờ
            else {
                if (!window.danhSachAnhMinhChungTam) window.danhSachAnhMinhChungTam = [];
                window.danhSachAnhMinhChungTam.push(...processedFiles);
                ham_20_22_render_anh_minh_chung();
            }

            e.target.value = '';
        });
    }
};




// =======================================================
// HÀM 20.22B: RENDER ẢNH MINH CHỨNG Ở KHUNG CHỜ GẮN THẺ
// =======================================================
window.ham_20_22_render_anh_minh_chung = function () {
    const vungHienThiMC = document.getElementById('vung-preview-anh-minh-chung');
    if (!vungHienThiMC) return;

    if (!window.danhSachAnhMinhChungTam || window.danhSachAnhMinhChungTam.length === 0) {
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


// =======================================================
// HÀM 20.23: HIỂN THỊ MÀN HÌNH CẮT ẢNH (MẶC ĐỊNH: KHÔNG CẮT & GIỮ GỐC)
// =======================================================
window.ham_20_23_hien_thi_modal_crop = function (file) {
    return new Promise((resolve) => {
        let modal = document.getElementById('modal-crop-anh-global');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'modal-crop-anh-global';
            modal.style.cssText = 'display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.95); z-index:99999; flex-direction:column; align-items:center; justify-content:center; padding: 15px; box-sizing: border-box; font-family: sans-serif;';

            modal.innerHTML = `
                <div style="width: 100%; max-width: 800px; height: 48vh; background: #000; position: relative; display: flex; align-items: center; justify-content: center; border: 1px solid #444; border-radius: 8px 8px 0 0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.5);">
                    <img id="img-crop-target" style="display: block; max-width: 100%; max-height: 100%;">
                </div>
                
                <div style="width: 100%; max-width: 800px; background: #222; padding: 15px; border-radius: 0 0 8px 8px; display: flex; flex-direction: column; gap: 15px; border: 1px solid #444; border-top: none;">
                    
                    <div style="display: flex; justify-content: center; gap: 25px; background: #111; padding: 10px; border-radius: 6px; border: 1px dashed #555;">
                        <div style="text-align: center;">
                            <div style="color: #aaa; font-size: 11px; margin-bottom: 3px; text-transform: uppercase;">📦 Gốc</div>
                            <div style="color: #ffc107; font-size: 15px; font-weight: bold;" id="crop-size-goc">Đang đọc...</div>
                        </div>
                        <div style="width: 1px; background: #444;"></div>
                        <div style="text-align: center;">
                            <div style="color: #aaa; font-size: 11px; margin-bottom: 3px; text-transform: uppercase;">✨ Sau khi xử lý</div>
                            <div style="color: #28a745; font-size: 17px; font-weight: bold;" id="crop-size-du-kien">⏳ Đang tính...</div>
                        </div>
                    </div>

                    <!-- 🌟 HÀNG 1: CHỌN THAO TÁC (Mặc định: Không cắt) -->
                    <div style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; align-items: center;">
                        <span style="color: #aaa; font-size: 13px; font-weight: bold; margin-right: 5px;">Thao tác:</span>
                        
                        <label style="background: #333; color: white; padding: 8px 15px; border-radius: 6px; font-size: 13px; cursor: pointer; border: 1px solid #555; display: flex; align-items: center; gap: 4px; transition: 0.2s;">
                            <input type="radio" name="crop_mode" value="crop" style="margin:0; accent-color: #007bff;"> 
                            <div><b>✂️ Cắt theo khung</b></div>
                        </label>
                        
                        <label style="background: #007bff; color: white; padding: 8px 15px; border-radius: 6px; font-size: 13px; cursor: pointer; border: 1px solid #0056b3; display: flex; align-items: center; gap: 4px; transition: 0.2s;">
                            <input type="radio" name="crop_mode" value="skip" checked style="margin:0; accent-color: #fff;"> 
                            <div><b>🖼️ Không cắt (Giữ nguyên)</b></div>
                        </label>
                    </div>

                    <!-- 🌟 HÀNG 2: CHỌN CỠ ẢNH (Mặc định: Gốc) -->
                    <div style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; align-items: center; border-bottom: 1px solid #444; padding-bottom: 15px;">
                        <span style="color: #aaa; font-size: 13px; font-weight: bold; margin-right: 5px;">Cỡ ảnh:</span>
                        
                        <label style="background: #007bff; color: white; padding: 6px 12px; border-radius: 6px; font-size: 12px; cursor: pointer; border: 1px solid #0056b3; display: flex; align-items: center; gap: 6px; transition: 0.2s;">
                            <input type="radio" name="crop_res" value="original" checked style="margin:0; accent-color: #fff;"> 
                            <div id="lbl-goc-size" style="text-align: center; line-height: 1.3;"><b>🌟 Gốc</b><br><span style="font-size:10px; color:#e0e0e0;">Đang tải...</span></div>
                        </label>
                        
                        <label style="background: #333; color: white; padding: 6px 12px; border-radius: 6px; font-size: 12px; cursor: pointer; border: 1px solid #555; display: flex; align-items: center; gap: 6px; transition: 0.2s;">
                            <input type="radio" name="crop_res" value="2560" style="margin:0; accent-color: #007bff;"> 
                            <div id="lbl-2k-size" style="text-align: center; line-height: 1.3;"><b>🎬 2K</b><br><span style="font-size:10px; color:#ccc;">Đang tải...</span></div>
                        </label>

                        <label style="background: #333; color: white; padding: 6px 12px; border-radius: 6px; font-size: 12px; cursor: pointer; border: 1px solid #555; display: flex; align-items: center; gap: 6px; transition: 0.2s;">
                            <input type="radio" name="crop_res" value="1920" style="margin:0; accent-color: #007bff;"> 
                            <div id="lbl-fhd-size" style="text-align: center; line-height: 1.3;"><b>📺 FHD</b><br><span style="font-size:10px; color:#ccc;">Đang tải...</span></div>
                        </label>
                        
                        <label style="background: #333; color: white; padding: 6px 12px; border-radius: 6px; font-size: 12px; cursor: pointer; border: 1px solid #555; display: flex; align-items: center; gap: 6px; transition: 0.2s;">
                            <input type="radio" name="crop_res" value="1280" style="margin:0; accent-color: #007bff;"> 
                            <div id="lbl-hd-size" style="text-align: center; line-height: 1.3;"><b>💻 HD</b><br><span style="font-size:10px; color:#ccc;">Đang tải...</span></div>
                        </label>
                        
                        <label style="background: #333; color: white; padding: 6px 12px; border-radius: 6px; font-size: 12px; cursor: pointer; border: 1px solid #555; display: flex; align-items: center; gap: 6px; transition: 0.2s;">
                            <input type="radio" name="crop_res" value="800" style="margin:0; accent-color: #007bff;"> 
                            <div id="lbl-nhe-size" style="text-align: center; line-height: 1.3;"><b>⚡ Nhẹ</b><br><span style="font-size:10px; color:#ccc;">Đang tải...</span></div>
                        </label>
                    </div>

                    <!-- 🌟 HÀNG 3: NÚT LƯU VÀ HỦY -->
                    <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                        <button id="btn-crop-huy" style="padding: 12px 25px; background: #dc3545; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; font-size: 15px; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">❌ HỦY</button>
                        <button id="btn-crop-ok" style="padding: 12px 45px; background: #28a745; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; font-size: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.3);">💾 LƯU TẤM NÀY</button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);

            const setupRadios = (name) => {
                const radios = modal.querySelectorAll(`input[name="${name}"]`);
                radios.forEach(radio => {
                    radio.addEventListener('change', function () {
                        radios.forEach(r => {
                            r.parentElement.style.background = '#333';
                            r.parentElement.style.borderColor = '#555';
                            r.style.accentColor = '#007bff';

                            let span = r.parentElement.querySelector('span');
                            if (span) span.style.color = '#ccc';
                        });

                        this.parentElement.style.background = '#007bff';
                        this.parentElement.style.borderColor = '#0056b3';
                        this.style.accentColor = '#fff';

                        let activeSpan = this.parentElement.querySelector('span');
                        if (activeSpan) activeSpan.style.color = '#e0e0e0';
                    });
                });
            };
            setupRadios('crop_res');
            setupRadios('crop_mode');
        }

        const imgTarget = document.getElementById('img-crop-target');
        const txtSizeGoc = document.getElementById('crop-size-goc');
        const txtSizeDuKien = document.getElementById('crop-size-du-kien');
        const btnHuy = document.getElementById('btn-crop-huy');
        const btnOk = document.getElementById('btn-crop-ok');

        let timeoutTinhToan = null;
        let cropper = null;

        const formatSize = (bytes) => {
            if (bytes === 0) return '0 B';
            const k = 1024, i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + ['B', 'KB', 'MB'][i];
        };

        const getSelectedRes = () => document.querySelector('input[name="crop_res"]:checked').value;
        const getSelectedMode = () => document.querySelector('input[name="crop_mode"]:checked').value;

        const tinhToanDungLuongDuKien = () => {
            if (!cropper) return;
            txtSizeDuKien.innerHTML = "⏳ Đang tính...";
            txtSizeDuKien.style.color = "#adb5bd";

            clearTimeout(timeoutTinhToan);

            timeoutTinhToan = setTimeout(async () => {
                let res = getSelectedRes();
                let mode = getSelectedMode();
                let quality = res === 'original' ? 0.95 : 0.7;

                if (mode === 'skip') {
                    let cropBox = document.querySelector('.cropper-crop-box');
                    if (cropBox) cropBox.style.opacity = '0.2'; // Làm mờ khung cắt để nhận biết

                    let maxWidth = res === 'original' ? 'original' : parseInt(res);
                    let tmpFile = await window.ham_20_24_nen_anh_canvas(file, quality, maxWidth);
                    txtSizeDuKien.innerHTML = formatSize(tmpFile.size);
                    txtSizeDuKien.style.color = "#28a745";
                } else {
                    let cropBox = document.querySelector('.cropper-crop-box');
                    if (cropBox) cropBox.style.opacity = '1'; // Hiện rõ khung cắt

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
                }
            }, 250);
        };

        document.querySelectorAll('input[name="crop_res"], input[name="crop_mode"]').forEach(radio => {
            radio.addEventListener('change', tinhToanDungLuongDuKien);
        });

        txtSizeGoc.innerHTML = formatSize(file.size);
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = (e) => {
            imgTarget.src = e.target.result;
            modal.style.display = 'flex';

            imgTarget.onload = () => {
                let w = imgTarget.naturalWidth;
                let h = imgTarget.naturalHeight;

                const calcDim = (max) => {
                    if (w <= max && h <= max) return `${w}x${h}`;
                    if (w > h) return `${max}x${Math.round(h * max / w)}`;
                    return `${Math.round(w * max / h)}x${max}`;
                };

                const lblGocSize = document.getElementById('lbl-goc-size');
                if (lblGocSize) lblGocSize.innerHTML = `<b>🌟 Gốc</b><br><span style="font-size:10px; font-weight:normal; color:#e0e0e0;">${w}x${h}</span>`;

                const lbl2K = document.getElementById('lbl-2k-size');
                if (lbl2K) lbl2K.innerHTML = `<b>🎬 2K</b><br><span style="font-size:10px; font-weight:normal;">${calcDim(2560)}</span>`;

                const lblFHD = document.getElementById('lbl-fhd-size');
                if (lblFHD) lblFHD.innerHTML = `<b>📺 FHD</b><br><span style="font-size:10px; font-weight:normal;">${calcDim(1920)}</span>`;

                const lblHD = document.getElementById('lbl-hd-size');
                if (lblHD) lblHD.innerHTML = `<b>💻 HD</b><br><span style="font-size:10px; font-weight:normal;">${calcDim(1280)}</span>`;

                const lblNhe = document.getElementById('lbl-nhe-size');
                if (lblNhe) lblNhe.innerHTML = `<b>⚡ Nhẹ</b><br><span style="font-size:10px; font-weight:normal;">${calcDim(800)}</span>`;

                if (cropper) cropper.destroy();
                cropper = new Cropper(imgTarget, {
                    viewMode: 2,
                    autoCropArea: 1,
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
                btnOk.onclick = null;
                clearTimeout(timeoutTinhToan);
            };

            btnHuy.onclick = () => { cleanup(); resolve(null); };

            btnOk.onclick = async () => {
                let res = getSelectedRes();
                let mode = getSelectedMode();
                let quality = res === 'original' ? 0.95 : 0.7;

                btnOk.innerHTML = "⏳ Đang lưu...";

                if (mode === 'skip') {
                    let maxWidth = res === 'original' ? 'original' : parseInt(res);
                    let finalFile = await window.ham_20_24_nen_anh_canvas(file, quality, maxWidth);
                    cleanup();
                    btnOk.innerHTML = "💾 LƯU TẤM NÀY";
                    resolve(finalFile);
                } else {
                    let canvasOptions = {};
                    if (res !== 'original') {
                        canvasOptions.maxWidth = parseInt(res);
                        canvasOptions.maxHeight = parseInt(res);
                    }
                    setTimeout(() => {
                        let canvas = cropper.getCroppedCanvas(canvasOptions);
                        cleanup();
                        btnOk.innerHTML = "💾 LƯU TẤM NÀY";

                        canvas.toBlob((blob) => {
                            const newFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".jpg", { type: 'image/jpeg', lastModified: Date.now() });
                            resolve(newFile);
                        }, 'image/jpeg', quality);
                    }, 50);
                }
            };
        };
    });
};


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
// HÀM 20.27: TỰ ĐỘNG TẢI NỘI DUNG & SỰ KIỆN TIẾT HỌC (BỔ SUNG ẢNH MINH CHỨNG SỰ KIỆN)
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

            // 2. HIỂN THỊ ẢNH BÀI GIẢNG
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
                    htmlAnh += `<a href="${link}" target="_blank" title="Bấm để xem ảnh gốc"><img src="${previewLink}" style="height: 8cm; width: 8cm; object-fit: cover; border-radius: 6px; border: 2px solid #28a745; box-shadow: 0 2px 4px rgba(0,0,0,0.15);"></a>`;
                });
                htmlAnh += '</div>';
                vungAnhDaLuu.innerHTML = htmlAnh;
                vungAnhDaLuu.style.display = 'block';
            } else if (vungAnhDaLuu) {
                vungAnhDaLuu.style.display = 'none';
                vungAnhDaLuu.innerHTML = '';
            }

            // 3. TỰ ĐỘNG KIỂM TRA SỰ KIỆN & VẮNG MẶT
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

                            // 🌟 XỬ LÝ ẢNH MINH CHỨNG (Hiện kích thước 5cm x 5cm)
                            let anhMCStr = '';
                            if (sk.thong_tin_mo_rong && sk.thong_tin_mo_rong.danh_sach_anh_minh_chung && sk.thong_tin_mo_rong.danh_sach_anh_minh_chung.length > 0) {
                                anhMCStr += '<div style="display: flex; gap: 10px; margin-top: 8px; flex-wrap: wrap;">';
                                sk.thong_tin_mo_rong.danh_sach_anh_minh_chung.forEach(link => {
                                    let previewLink = link;
                                    let matchD = link.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
                                    if (matchD) previewLink = `https://lh3.googleusercontent.com/d/${matchD[1]}`;
                                    // Set cứng width: 5cm và height: 5cm
                                    anhMCStr += `<a href="${link}" target="_blank" title="Bấm để xem ảnh gốc"><img src="${previewLink}" style="width: 8cm; height: 8cm; object-fit: cover; border-radius: 6px; border: 1px solid #adb5bd; box-shadow: 0 2px 4px rgba(0,0,0,0.1);"></a>`;
                                });
                                anhMCStr += '</div>';
                            }

                            htmlSK += `
                                <div style="font-size:13px; margin-bottom: 5px; margin-left: 10px; border-left: 3px solid ${sk.thong_tin_mo_rong?.mau_sac || '#000'}; padding-left: 8px; background:#fff; padding-top:6px; padding-bottom:6px; border-radius:0 4px 4px 0;">
                                    <div><b>${sk.ten_hoc_sinh}</b>: <span style="color:${sk.thong_tin_mo_rong?.mau_sac || '#000'}; font-weight:bold;">[${sk.loai_the}]</span>${diemStr}${noteStr}</div>
                                    ${anhMCStr}
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


// =======================================================
// HÀM 20.33: MỞ BUNG KHU VỰC 3 VÀ CUỘN ĐẾN ĐÚNG TIẾT CẦN XEM
// =======================================================
window.ham_20_33_xem_chi_tiet_tiet = function (idNhatKy) {
    // Mở bung Khu vực 3 nếu nó đang bị Đóng
    const khu3 = document.getElementById('khu-vuc-3-content');
    const btnToggleKhu3 = document.getElementById('btn-toggle-khu-3');
    if (khu3 && khu3.style.display === 'none') {
        khu3.style.display = 'block';
        if (btnToggleKhu3) btnToggleKhu3.innerHTML = '🔽 Thu gọn';
    }

    // Tìm Card chứa tiết học tương ứng
    const card = document.getElementById('card-tiet-' + idNhatKy);
    if (card) {
        // Cuộn mượt mà đến Card đó
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Hiệu ứng Highlight (Nháy đèn) để thu hút ánh nhìn
        let bgGoc = card.style.background;
        let borderGoc = card.style.border;
        let shadowGoc = card.style.boxShadow;

        card.style.background = '#e0f3ff';
        card.style.border = '2px solid #007bff';
        card.style.boxShadow = '0 0 15px rgba(0, 123, 255, 0.4)';

        // Tự tắt đèn sau 2 giây
        setTimeout(() => {
            card.style.background = bgGoc;
            card.style.border = borderGoc;
            card.style.boxShadow = shadowGoc;
        }, 2000);
    }
};




// =======================================================
// HÀM 20.34: POPUP XEM CHI TIẾT, XÓA, HOẶC SỬA SỰ KIỆN (KHU 2)
// =======================================================
window.ham_20_34_xem_chi_tiet_su_kien_popup = function (idSuKien, encLoaiThe, encGhiChu, diemSo, ngaySK, encLinks) {
    let loaiThe = decodeURIComponent(encLoaiThe);
    let ghiChu = decodeURIComponent(encGhiChu);
    let linkChuoi = decodeURIComponent(encLinks);

    let modal = document.createElement('div');
    modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); z-index:99999; display:flex; flex-direction:column; justify-content:center; align-items:center; padding:20px; animation: fadeIn 0.2s; box-sizing: border-box;';

    let box = document.createElement('div');
    box.style.cssText = 'background:#fff; width:100%; max-width:600px; border-radius:8px; padding:20px; box-shadow: 0 10px 25px rgba(0,0,0,0.5); display:flex; flex-direction:column; gap:15px; position:relative; max-height:90vh; overflow-y:auto;';

    // ----------------------------------------------------
    // PANEL 1: CHẾ ĐỘ XEM & XÓA (MẶC ĐỊNH)
    // ----------------------------------------------------
    let viewPanel = document.createElement('div');
    viewPanel.id = 'view-panel-sk';
    viewPanel.style.cssText = 'display:flex; flex-direction:column; gap:15px;';

    let diemStr = diemSo ? `<span style="background:#28a745; color:white; padding:2px 8px; border-radius:4px; margin-left:10px; font-size:14px; vertical-align:middle;">⭐ ${diemSo}đ</span>` : '';
    let title = `<h3 style="margin:0; color:#0056b3; border-bottom:2px solid #eee; padding-bottom:10px; display:flex; align-items:center;">📅 [${ngaySK}] ${loaiThe} ${diemStr}</h3>`;
    let note = ghiChu ? `<div style="font-size:14px; color:#333; background:#f8f9fa; padding:12px; border-left:4px solid #ffc107; border-radius:4px;"><b>📝 Ghi chú:</b> <span style="white-space:pre-wrap;">${ghiChu}</span></div>` : '';

    let imgHtml = '';
    if (linkChuoi) {
        let links = linkChuoi.split(',');
        imgHtml = `<div style="display:flex; gap:10px; flex-wrap:wrap; overflow-y:auto; max-height: 45vh; justify-content:center; background:#f1f1f1; padding:10px; border-radius:6px; border: 1px dashed #ccc;">`;
        links.forEach(link => {
            let fileId = '';
            let matchD = link.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
            let matchId = link.match(/[?&]id=([a-zA-Z0-9_-]+)/);
            let matchOpen = link.match(/\/open\?id=([a-zA-Z0-9_-]+)/);
            if (matchD) fileId = matchD[1]; else if (matchId) fileId = matchId[1]; else if (matchOpen) fileId = matchOpen[1];
            let src = fileId ? `https://lh3.googleusercontent.com/d/${fileId}` : link;
            imgHtml += `<a href="${link}" target="_blank" title="Bấm để mở ảnh gốc"><img src="${src}" style="max-width:100%; max-height:300px; object-fit:contain; border:1px solid #adb5bd; border-radius:4px; box-shadow:0 2px 5px rgba(0,0,0,0.2); background:#fff;"></a>`;
        });
        imgHtml += `</div>`;
    }

    let btnHtml = `
        <div style="display:flex; justify-content:space-between; margin-top:10px; border-top:1px solid #eee; padding-top:15px; flex-wrap:wrap; gap:10px;">
            <div style="display:flex; gap:10px;">
                <button id="btn-sua-sk-popup" style="padding:10px 15px; background:#ffc107; color:#000; border:1px solid #d39e00; border-radius:4px; cursor:pointer; font-weight:bold; font-size:13px; box-shadow:0 2px 4px rgba(0,0,0,0.1); transition: 0.2s;" onmouseover="this.style.background='#e0a800'" onmouseout="this.style.background='#ffc107'">✏️ Sửa thẻ</button>
                <button id="btn-xoa-sk-popup" style="padding:10px 15px; background:#dc3545; color:white; border:none; border-radius:4px; cursor:pointer; font-weight:bold; font-size:13px; box-shadow:0 2px 4px rgba(0,0,0,0.2); transition: 0.2s;" onmouseover="this.style.background='#c82333'" onmouseout="this.style.background='#dc3545'">🗑️ Xóa sự kiện</button>
            </div>
            <button id="btn-dong-sk-popup" style="padding:10px 25px; background:#6c757d; color:white; border:none; border-radius:4px; cursor:pointer; font-weight:bold; font-size:13px; box-shadow:0 2px 4px rgba(0,0,0,0.2); transition: 0.2s;" onmouseover="this.style.background='#5a6268'" onmouseout="this.style.background='#6c757d'">❌ Đóng</button>
        </div>
    `;

    viewPanel.innerHTML = title + note + imgHtml + btnHtml;

    // ----------------------------------------------------
    // PANEL 2: CHẾ ĐỘ SỬA THẺ (TẠM ẨN)
    // ----------------------------------------------------
    let editPanel = document.createElement('div');
    editPanel.id = 'edit-panel-sk';
    editPanel.style.display = 'none';

    box.appendChild(viewPanel);
    box.appendChild(editPanel);
    modal.appendChild(box);
    document.body.appendChild(modal);

    // BẮT SỰ KIỆN NÚT CHẾ ĐỘ XEM
    document.getElementById('btn-dong-sk-popup').onclick = () => document.body.removeChild(modal);
    modal.onclick = (e) => { if (e.target === modal) document.body.removeChild(modal); };

    document.getElementById('btn-xoa-sk-popup').onclick = async () => {
        if (!confirm("⚠️ Thầy có chắc chắn muốn xóa vĩnh viễn sự kiện này khỏi hệ thống không?")) return;
        let btnXoa = document.getElementById('btn-xoa-sk-popup');
        btnXoa.innerHTML = "⏳ Đang xóa..."; btnXoa.disabled = true;
        try {
            const { error } = await _supabase.from('nhat_ky_su_kien_hs').delete().eq('id', idSuKien);
            if (error) throw error;
            document.body.removeChild(modal);
            const btnLoc = document.querySelector('button[onclick*="ham_20_15_thuc_hien_tra_cuu"]');
            if (btnLoc) btnLoc.click();
        } catch (err) {
            console.error("Lỗi xóa:", err); alert("❌ Lỗi không thể xóa sự kiện!");
            btnXoa.innerHTML = "🗑️ Xóa sự kiện"; btnXoa.disabled = false;
        }
    };

    // BẮT SỰ KIỆN NÚT ĐỔI SANG CHẾ ĐỘ SỬA
    document.getElementById('btn-sua-sk-popup').onclick = async () => {
        viewPanel.style.display = 'none';
        editPanel.style.display = 'flex';
        editPanel.style.flexDirection = 'column';
        editPanel.style.gap = '10px';

        editPanel.innerHTML = `<div style="text-align:center; padding:30px; font-size:15px; color:#007bff;"><b>⏳ Đang tải danh sách thẻ mới nhất...</b></div>`;

        try {
            const { data: theData, error: errThe } = await _supabase.from('cai_dat_the_su_kien').select('*').order('ngay_tao', { ascending: true });
            if (errThe) throw errThe;

            const nhomCauHinh = [
                { id: 'tich_cuc', ten: '🌟 Thẻ tích cực', mau: '#28a745' },
                { id: 'bai_ve_nha', ten: '🏠 Bài về nhà', mau: '#fd7e14' },
                { id: 'hoc_bai', ten: '🧠 Học bài ở nhà', mau: '#dc3545' },
                { id: 'tai_lop', ten: '✍️ Làm bài tại lớp', mau: '#007bff' },
                { id: 'thai_do', ten: '🎭 Thái độ học tập', mau: '#6f42c1' }
            ];

            let htmlTags = `<h3 style="margin:0 0 10px 0; color:#0056b3; border-bottom:2px solid #eee; padding-bottom:10px;">✏️ CHỌN LOẠI THẺ ĐỂ THAY THẾ</h3>`;
            htmlTags += '<div style="display:flex; flex-direction:column; gap:10px; max-height:55vh; overflow-y:auto; padding-right:5px;">';

            nhomCauHinh.forEach(nhom => {
                let theCuaNhom = theData.filter(t => t.nhom_the === nhom.id);
                if (theCuaNhom.length > 0) {
                    htmlTags += `<div style="font-size:12px; font-weight:bold; color:${nhom.mau}; border-bottom:1px dashed ${nhom.mau}; padding-bottom:3px;">${nhom.ten}</div>`;
                    htmlTags += `<div style="display:flex; flex-wrap:wrap; gap:6px;">`;
                    theCuaNhom.forEach(the => {
                        let theSafe = the.ten_the.replace(/'/g, "\\'");
                        // Gọi hàm 20.35 xử lý cập nhật trực tiếp DB
                        htmlTags += `<button onclick="window.ham_20_35_luu_thay_doi_the('${idSuKien}', '${theSafe}', '${the.mau_sac}', null)" style="padding:6px 12px; font-size:12px; border:1px solid ${the.mau_sac}; color:${the.mau_sac}; background:#fff; border-radius:4px; cursor:pointer; font-weight:bold; transition:0.2s;" onmouseover="this.style.background='${the.mau_sac}'; this.style.color='#fff';" onmouseout="this.style.background='#fff'; this.style.color='${the.mau_sac}';">${the.ten_the}</button>`;
                    });
                    htmlTags += `</div>`;
                }
            });

            // Khu vực nếu muốn đổi hẳn sang Cho Điểm
            htmlTags += `
                <div style="font-size:12px; font-weight:bold; color:#28a745; border-bottom:1px dashed #28a745; padding-bottom:3px; margin-top:5px;">💯 ĐỔI SANG CHO ĐIỂM SỐ</div>
                <div style="display:flex; gap:8px; align-items:center;">
                    <input type="number" id="input-diem-sua" placeholder="Nhập điểm..." step="0.25" min="0" max="10" style="padding:8px; border:1px solid #28a745; border-radius:4px; width:100px; outline:none; font-weight:bold; color:#155724;">
                    <button onclick="let d=document.getElementById('input-diem-sua').value; if(!d){alert('Vui lòng nhập điểm!'); return;} window.ham_20_35_luu_thay_doi_the('${idSuKien}', 'Cho điểm', '#28a745', d);" style="padding:8px 15px; background:#28a745; color:#fff; border:none; border-radius:4px; cursor:pointer; font-weight:bold; transition:0.2s;" onmouseover="this.style.background='#218838'" onmouseout="this.style.background='#28a745'">💾 Lưu Điểm mới</button>
                </div>
            `;
            htmlTags += '</div>';

            htmlTags += `
                <div style="display:flex; justify-content:flex-end; margin-top:15px; border-top:1px solid #eee; padding-top:15px;">
                    <button id="btn-huy-sua" style="padding:8px 20px; background:#6c757d; color:white; border:none; border-radius:4px; cursor:pointer; font-weight:bold; transition:0.2s;" onmouseover="this.style.background='#5a6268'" onmouseout="this.style.background='#6c757d'">🔙 Hủy, quay lại</button>
                </div>
            `;

            editPanel.innerHTML = htmlTags;

            document.getElementById('btn-huy-sua').onclick = () => {
                editPanel.style.display = 'none';
                viewPanel.style.display = 'flex';
            };

        } catch (err) {
            console.error(err);
            editPanel.innerHTML = `<div style="text-align:center; padding:20px; color:red;"><b>❌ Lỗi tải danh sách thẻ!</b><br><br><button id="btn-huy-sua-loi" style="padding:5px 10px; cursor:pointer; margin-top:10px;">Quay lại</button></div>`;
            document.getElementById('btn-huy-sua-loi').onclick = () => {
                editPanel.style.display = 'none';
                viewPanel.style.display = 'flex';
            };
        }
    };
};

// =======================================================
// HÀM 20.35: API CẬP NHẬT TRỰC TIẾP THẺ MỚI VÀO DB
// =======================================================
window.ham_20_35_luu_thay_doi_the = async function (idSuKien, tenThe, mauSac, diemSo = null) {
    let editPanel = document.getElementById('edit-panel-sk');
    if (!editPanel) return;

    editPanel.innerHTML = `<div style="text-align:center; padding:30px; font-size:15px; color:#28a745;"><b>⏳ Đang lưu dữ liệu mới vào hệ thống...</b></div>`;

    try {
        // Tải thong_tin_mo_rong hiện tại để không làm mất ảnh
        const { data: currentEvt, error: errEvt } = await _supabase.from('nhat_ky_su_kien_hs').select('thong_tin_mo_rong').eq('id', idSuKien).single();
        if (errEvt) throw errEvt;

        let ttMoRong = currentEvt.thong_tin_mo_rong || {};
        ttMoRong.mau_sac = mauSac;

        if (diemSo !== null) {
            ttMoRong.diem_so = diemSo;
        } else {
            delete ttMoRong.diem_so; // Nếu đổi từ Điểm sang Thẻ thì phải xóa điểm cũ đi
        }

        let updateData = {
            loai_the: (diemSo !== null) ? 'Cho điểm' : tenThe,
            thong_tin_mo_rong: ttMoRong
        };

        const { error: errUpdate } = await _supabase.from('nhat_ky_su_kien_hs').update(updateData).eq('id', idSuKien);
        if (errUpdate) throw errUpdate;

        // Đóng Popup và Load lại Bảng Tra Cứu
        let modal = editPanel.closest('div[style*="z-index: 99999"]');
        if (modal) document.body.removeChild(modal);

        const btnLoc = document.querySelector('button[onclick*="ham_20_15_thuc_hien_tra_cuu"]');
        if (btnLoc) btnLoc.click();

    } catch (e) {
        console.error("Lỗi cập nhật:", e);
        alert('❌ Lỗi cập nhật: ' + (e.message || ""));
        editPanel.style.display = 'none';
        document.getElementById('view-panel-sk').style.display = 'flex';
    }
};
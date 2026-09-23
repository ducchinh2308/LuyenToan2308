

// =====================================================================
// KHỐI 20: TIỆN ÍCH - NHẬT KÝ DẠY HỌC (THÊM NÚT XEM BÀI CŨ LỚP NÀY)
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
                
                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                    <button onclick="ham_20_29_lam_moi_tiet_hoc()" style="padding: 6px 15px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: 0.2s;" onmouseover="this.style.background='#0056b3'" onmouseout="this.style.background='#007bff'">
                        🆕 Tiết mới
                    </button>

                    <!-- 🌟 NÚT XEM BÀI CŨ Ở ĐÂY -->
                    <button onclick="ham_20_37_xem_bai_cu_lop_nay()" style="padding: 6px 15px; background: #6f42c1; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: 0.2s;" onmouseover="this.style.background='#5a32a3'" onmouseout="this.style.background='#6f42c1'" title="Xem lại hôm trước dừng ở đâu">
                        ⏮️ Xem bài cũ lớp này
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
                        
                        <div style="margin-bottom: 15px;">
                            <label style="font-weight: bold; font-size: 13px; color: #495057;">B2. Ghi chú thêm (Nếu cần):</label>
                            <input id="nk-input-ghi-chu" type="text" placeholder="VD: Bấm điện thoại dưới hộc bàn..." onkeydown="if(event.key === 'Enter') ham_20_3_gan_the('Khác', '#000')" style="width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; margin-top: 5px; outline: none;">
                        </div>

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

                        <div style="margin-bottom: 5px;">
                            <label style="font-weight: bold; font-size: 13px; color: #0056b3; display: block; margin-bottom: 8px;">B4. BẤM CHỌN LOẠI SỰ KIỆN ĐỂ GHI NHẬN:</label>
                        </div>

                        <div style="margin-bottom: 15px; background: #fffcf8; padding: 10px; border-radius: 6px; border: 1px dashed #ffc107;">
                            <label style="font-weight: bold; font-size: 12px; color: #dc3545; display: block; margin-bottom: 5px;">⚠️ Vi phạm / Nhắc nhở:</label>
                            <div id="nk-khu-vuc-tags"><span style="font-size: 12px; color: #999;">⏳ Đang tải...</span></div>
                        </div>

                        <div style="margin-bottom: 15px; background: #f0fdf4; padding: 10px; border-radius: 6px; border: 1px dashed #28a745;">
                            <label style="font-weight: bold; font-size: 12px; color: #28a745; display: block; margin-bottom: 5px;">🌟 Ghi nhận Tích cực (Khen thưởng):</label>
                            <div id="nk-khu-vuc-tags-tich-cuc"><span style="font-size: 12px; color: #999;">⏳ Đang tải...</span></div>
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

    if (typeof window.ham_20_7_tai_danh_sach_lop === 'function') window.ham_20_7_tai_danh_sach_lop();
    if (typeof window.ham_20_8_tai_danh_sach_the === 'function') window.ham_20_8_tai_danh_sach_the();
    if (typeof window.ham_20_11_kich_hoat_preview_anh === 'function') window.ham_20_11_kich_hoat_preview_anh();
    if (typeof window.ham_20_22_kich_hoat_preview_anh_minh_chung === 'function') window.ham_20_22_kich_hoat_preview_anh_minh_chung();
};











// // =======================================================
// // HÀM 20.2: TỰ ĐỘNG TẢI DANH SÁCH HS (CHỈ LẤY CỘT SDT LÀM TÊN ĐĂNG NHẬP)
// // =======================================================
// window.ham_20_2_tai_danh_sach_hs_theo_lop = async function () {
//     const inputLop = document.getElementById('tc-input-lop') || document.getElementById('nk-input-lop');
//     const datalistHS = document.getElementById('nk-dl-hs');
//     const cacOChonHS = document.querySelectorAll('.nk-input-hs-vang, .nk-input-hs-su-kien');

//     if (!inputLop || !datalistHS) return;

//     let rawLop = inputLop.value.trim();
//     if (!rawLop) {
//         datalistHS.innerHTML = '';
//         cacOChonHS.forEach(o => o.value = '');
//         window.DanhSachHocSinhLopHienTai = [];
//         return;
//     }

//     let maLop = rawLop.match(/\(([^)]+)\)$/) ? rawLop.match(/\(([^)]+)\)$/)[1].trim() : rawLop;

//     cacOChonHS.forEach(o => {
//         o.value = '';
//         o.placeholder = "⏳ Đang tải danh sách...";
//         o.disabled = true;
//     });

//     try {
//         // 🌟 Lấy đúng 5 cột thiết yếu có thật trong CSDL
//         const { data: hsData, error } = await _supabase
//             .from('hoc_sinh')
//             .select('uid, sdt, ten, anh_dai_dien, danh_sach_ma_lop')
//             .contains('danh_sach_ma_lop', JSON.stringify([maLop]));

//         if (error) throw error;

//         datalistHS.innerHTML = '';
//         window.DanhSachHocSinhLopHienTai = [];

//         if (hsData && hsData.length > 0) {
//             hsData.forEach(hs => {
//                 let uidHS = hs.uid || '';
//                 let tenHienThi = hs.ten || 'Chưa có tên';
//                 let tenDangNhap = hs.sdt || 'Chưa có SĐT'; // 🌟 Dùng trực tiếp SĐT làm tên đăng nhập

//                 let avatarUrl = hs.anh_dai_dien || `https://ui-avatars.com/api/?name=${encodeURIComponent(tenHienThi)}&background=random&color=fff&size=100`;

//                 let chuoiGhep = `${tenHienThi} - ${tenDangNhap}`;

//                 window.DanhSachHocSinhLopHienTai.push({
//                     uid: uidHS,
//                     tenHienThi: tenHienThi,
//                     tenDangNhap: tenDangNhap,
//                     avatarUrl: avatarUrl,
//                     chuoiGhep: chuoiGhep
//                 });

//                 let option = document.createElement('option');
//                 option.value = chuoiGhep;
//                 option.dataset.uid = uidHS;
//                 datalistHS.appendChild(option);
//             });

//             cacOChonHS.forEach(o => {
//                 o.placeholder = `Đã tải ${hsData.length} HS. Nhấn hoặc gõ tên để chọn...`;
//                 o.removeAttribute('list');
//                 o.setAttribute('autocomplete', 'off');
//             });

//         } else {
//             cacOChonHS.forEach(o => o.placeholder = `❌ Không tìm thấy HS lớp ${maLop}!`);
//         }
//     } catch (err) {
//         console.error("Lỗi tải học sinh:", err);
//         cacOChonHS.forEach(o => o.placeholder = "❌ Lỗi dữ liệu!");
//     } finally {
//         cacOChonHS.forEach(o => o.disabled = false);
//     }
// };


// =======================================================
// HÀM 20.2: TỰ ĐỘNG TẢI DANH SÁCH HS (CÓ SORT CHUẨN VIỆT NAM TÊN-HỌ)
// =======================================================
window.ham_20_2_tai_danh_sach_hs_theo_lop = async function () {
    const inputLop = document.getElementById('tc-input-lop') || document.getElementById('nk-input-lop');
    const datalistHS = document.getElementById('nk-dl-hs');
    const cacOChonHS = document.querySelectorAll('.nk-input-hs-vang, .nk-input-hs-su-kien');

    if (!inputLop || !datalistHS) return;

    let rawLop = inputLop.value.trim();
    if (!rawLop) {
        datalistHS.innerHTML = '';
        cacOChonHS.forEach(o => o.value = '');
        window.DanhSachHocSinhLopHienTai = [];
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
            .select('uid, sdt, ten, anh_dai_dien, danh_sach_ma_lop')
            .contains('danh_sach_ma_lop', JSON.stringify([maLop]));

        if (error) throw error;

        datalistHS.innerHTML = '';
        window.DanhSachHocSinhLopHienTai = [];

        if (hsData && hsData.length > 0) {

            // 🌟 CHÈN THUẬT TOÁN SẮP XẾP TÊN CHUẨN VIỆT NAM TRƯỚC KHI VẼ
            hsData.sort((a, b) => {
                let tenA = a.ten || '';
                let tenB = b.ten || '';
                // Gọi hàm hỗ trợ đã viết ở KHOI-4, nếu chưa có thì dùng sort mặc định
                if (typeof window.ham_ho_tro_so_sanh_ten_vn === 'function') {
                    return window.ham_ho_tro_so_sanh_ten_vn(tenA, tenB);
                }
                return tenA.localeCompare(tenB, 'vi');
            });

            hsData.forEach(hs => {
                let uidHS = hs.uid || '';
                let tenHienThi = hs.ten || 'Chưa có tên';
                let tenDangNhap = hs.sdt || 'Chưa có SĐT';

                let avatarUrl = hs.anh_dai_dien || `https://ui-avatars.com/api/?name=${encodeURIComponent(tenHienThi)}&background=random&color=fff&size=100`;

                let chuoiGhep = `${tenHienThi} - ${tenDangNhap}`;

                window.DanhSachHocSinhLopHienTai.push({
                    uid: uidHS,
                    tenHienThi: tenHienThi,
                    tenDangNhap: tenDangNhap,
                    avatarUrl: avatarUrl,
                    chuoiGhep: chuoiGhep
                });

                let option = document.createElement('option');
                option.value = chuoiGhep;
                option.dataset.uid = uidHS;
                datalistHS.appendChild(option);
            });

            cacOChonHS.forEach(o => {
                o.placeholder = `Đã tải ${hsData.length} HS. Nhấn hoặc gõ tên để chọn...`;
                o.removeAttribute('list');
                o.setAttribute('autocomplete', 'off');
            });

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
// HÀM 20.3: XỬ LÝ KHI BẤM NÚT "GẮN THẺ" HOẶC "NHẬP ĐIỂM" (FIX LỖI NHÓM)
// =======================================================
window.ham_20_3_gan_the = function (tenThe, mauSac = '#000') {
    const cacOChonHS = document.querySelectorAll('.nk-input-hs-su-kien');
    const oGhiChu = document.getElementById('nk-input-ghi-chu');
    let noiDungGhiChu = oGhiChu.value.trim();

    // 1. KIỂM TRA QUY TẮC
    let coHocSinhDuocChon = false;
    cacOChonHS.forEach(o => { if (o.value.trim() !== '') coHocSinhDuocChon = true; });

    if (!coHocSinhDuocChon) {
        alert("⚠️ Yêu cầu: Vui lòng nhập/chọn Tên học sinh trước khi bấm gắn Thẻ lỗi hoặc Sự kiện!");
        return;
    }

    let diemSo = null;
    if (tenThe.startsWith('Cho điểm: ')) {
        diemSo = parseFloat(tenThe.split(': ')[1]);
        tenThe = 'Cho điểm';
    }

    let mangFileAnhMC = [];
    if (window.danhSachAnhMinhChungTam && window.danhSachAnhMinhChungTam.length > 0) {
        mangFileAnhMC = [...window.danhSachAnhMinhChungTam];
    }

    // 🌟 TẠO MÃ LÔ (BATCH ID) ĐỂ ĐÁNH DẤU NHỮNG HS ĐƯỢC CHỌN CÙNG 1 LÚC
    let currentBatchId = 'batch_' + Date.now();

    // 2. GỘP SỰ KIỆN VÀ ĐẨY XUỐNG BẢNG CHỜ
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
                    batch_id: currentBatchId, // 🌟 Gắn mã lô chung vào đây
                    uid_hoc_sinh: uidHS,
                    ten_hoc_sinh: hSInfo.split(' - ')[0].trim(),
                    sdt_hoc_sinh: sdtHS,
                    loai_the: tenThe,
                    ghi_chu: noiDungGhiChu,
                    mau_sac: mauSac,
                    diem_so: diemSo,
                    mang_file_minh_chung: [...mangFileAnhMC]
                };
                if (!window.danhSachSuKienTam) window.danhSachSuKienTam = [];
                window.danhSachSuKienTam.push(suKienMoi);
            }
        }
    });

    // 3. DỌN DẸP SẠCH SẼ KHUNG NHẬP LIỆU
    cacOChonHS.forEach((o, i) => { if (i > 0) o.parentElement.remove(); else o.value = ''; });
    oGhiChu.value = '';

    window.danhSachAnhMinhChungTam = [];
    if (typeof window.ham_20_22_render_anh_minh_chung === 'function') window.ham_20_22_render_anh_minh_chung();
    if (typeof window.ham_20_4_ve_danh_sach_cho === 'function') window.ham_20_4_ve_danh_sach_cho();
};










// Biến lưu trữ tạm các sự kiện trên RAM trước khi bấm LƯU vào DB
window.danhSachSuKienTam = [];


// =======================================================
// HÀM 20.4: VẼ LẠI DANH SÁCH CHỜ (HIỂN THỊ CẢ ẢNH THU NHỎ)
// =======================================================
window.ham_20_4_ve_danh_sach_cho = function () {
    const vungHienThi = document.getElementById('nk-danh-sach-cho-luu');
    const boDem = document.getElementById('nk-dem-su-kien');
    if (!vungHienThi) return;

    if (!window.danhSachSuKienTam) window.danhSachSuKienTam = [];

    if (window.danhSachSuKienTam.length > 0) {
        if (boDem) boDem.innerText = window.danhSachSuKienTam.length;

        let html = '';
        window.danhSachSuKienTam.forEach((sk, index) => {
            let diemStr = sk.diem_so ? ` <span style="background:#28a745; color:white; padding:2px 5px; border-radius:3px; font-size:10px; margin-left:5px;">⭐ ${sk.diem_so}đ</span>` : '';
            let noteStr = sk.ghi_chu ? `<div style="font-size: 11px; color: #666; margin-top: 2px;"><i>📝 ${sk.ghi_chu}</i></div>` : '';

            // 🌟 TẠO RA ẢNH MINI (THUMBNAIL) NGAY TRONG DÒNG SỰ KIỆN
            let htmlThum = '';
            if (sk.mang_file_minh_chung && sk.mang_file_minh_chung.length > 0) {
                htmlThum = `<div style="display:flex; gap:5px; margin-top:5px; overflow-x:auto; padding-bottom:5px;">`;
                sk.mang_file_minh_chung.forEach(f => {
                    let url = URL.createObjectURL(f);
                    htmlThum += `<img src="${url}" style="height:40px; width:40px; object-fit:cover; border-radius:4px; border:1px solid #17a2b8; box-shadow:0 1px 2px rgba(0,0,0,0.1);" title="Ảnh minh chứng đính kèm">`;
                });
                htmlThum += `</div>`;
            }

            html += `
                <div style="display: flex; justify-content: space-between; align-items: flex-start; padding: 8px; border-bottom: 1px dashed #eee; background: #fff; border-radius: 4px; margin-bottom: 5px; box-shadow: 0 1px 2px rgba(0,0,0,0.02); border-left: 3px solid ${sk.mau_sac || '#000'};">
                    <div style="flex: 1;">
                        <div style="font-size: 13px;">
                            <b>${sk.ten_hoc_sinh}</b> 
                            <span style="color: ${sk.mau_sac || '#000'}; font-weight: bold; margin-left: 5px;">[${sk.loai_the}]</span>
                            ${diemStr}
                        </div>
                        ${noteStr}
                        ${htmlThum}
                    </div>
                    <button type="button" onclick="window.ham_20_5_xoa_su_kien_tam(${index})" style="padding: 5px 10px; background: #f8d7da; color: #721c24; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; font-size: 12px; transition: 0.2s;" onmouseover="this.style.background='#f5c6cb'" onmouseout="this.style.background='#f8d7da'" title="Xóa sự kiện này">✖</button>
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
// HÀM 20.6B: LƯU SỰ KIỆN, ĐIỂM DANH (ĐÃ FIX LỖI TẢI ẢNH HÀNG LOẠT)
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

    if ((!window.danhSachSuKienTam || window.danhSachSuKienTam.length === 0) && !coDuLieuDiemDanh) {
        alert("⚠️ Thầy chưa chọn học sinh vắng hoặc nhập sự kiện/cho điểm nào!");
        return;
    }

    const textGoc = btnLuu.innerHTML;
    const bgGoc = btnLuu.style.background;
    btnLuu.disabled = true;

    try {
        btnLuu.innerHTML = "⏳ ĐANG KIỂM TRA MÃ LỚP...";
        const { data: checkLop, error: errLop } = await _supabase.from('lop_hoc').select('ma_lop').eq('ma_lop', maLopLuu);
        if (errLop) throw errLop;
        if (!checkLop || checkLop.length === 0) {
            alert(`⚠️ TỪ CHỐI LƯU: Mã lớp [ ${maLopLuu} ] không tồn tại trong hệ thống!\n\n👉 Vui lòng nhấp vào ô chọn Lớp, xóa trắng và CHỌN TỪ DANH SÁCH XỔ XUỐNG để hệ thống nhận diện đúng mã lớp.`);
            btnLuu.style.background = bgGoc;
            btnLuu.innerHTML = textGoc;
            btnLuu.disabled = false;
            return;
        }

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

        // 🌟 TỐI ƯU HÓA UPLOAD ẢNH (BỘ NHỚ ĐỆM URL CHỐNG TRÙNG LẶP)
        let fileUploadCache = {};
        // ----------------------------------------------------

        if (window.danhSachSuKienTam && window.danhSachSuKienTam.length > 0) {
            for (let i = 0; i < window.danhSachSuKienTam.length; i++) {
                let sk = window.danhSachSuKienTam[i];
                let mangLinkAnhDrive = [];

                if (sk.mang_file_minh_chung && sk.mang_file_minh_chung.length > 0) {
                    for (let k = 0; k < sk.mang_file_minh_chung.length; k++) {
                        let fileMC = sk.mang_file_minh_chung[k];
                        // Tạo khóa duy nhất cho file này dựa vào tên và dung lượng
                        let fileKey = fileMC.name + '_' + fileMC.size;

                        // Kiểm tra xem file này đã được upload trong lượt này chưa?
                        if (fileUploadCache[fileKey]) {
                            // NẾU CÓ RỒI -> Copy link lấy từ RAM xài luôn, không cần up lại
                            mangLinkAnhDrive.push(fileUploadCache[fileKey]);
                        } else {
                            // NẾU CHƯA CÓ -> Tiến hành up lên Google Drive 1 lần duy nhất
                            let base64String = await window.ham_ho_tro_doc_anh_base64(fileMC);
                            let duoiFile = fileMC.name.includes('.') ? fileMC.name.substring(fileMC.name.lastIndexOf('.')) : '.jpg';
                            let tenFileChuan = `Ngay[${ngayDay}_${window.layGioPhutGiay()}]_Lop[${maLopLuu}]_HS[${window.taoTenAnToan(sk.ten_hoc_sinh, 25)}]_The[${window.taoTenAnToan(sk.loai_the, 15)}]_Anh[${k + 1}]${duoiFile}`;

                            let payload = { action: "upload_anh_nhat_ky", base64: base64String, mimeType: fileMC.type, fileName: tenFileChuan, maLop: maLopLuu, loaiAnh: "MINH_CHUNG_LOI" };

                            let result = await window.ham_ho_tro_upload_anh_co_tien_trinh(
                                CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP,
                                payload,
                                function (phanTram, daTai, tongSo) {
                                    let strDaTai = window.ham_dinh_dang_dung_luong(daTai);
                                    let strTongSo = window.ham_dinh_dang_dung_luong(tongSo);
                                    btnLuu.style.background = `linear-gradient(90deg, #17a2b8 ${phanTram}%, #6c757d ${phanTram}%)`;
                                    btnLuu.innerHTML = `🚀 ĐANG TẢI ẢNH (${i + 1}/${window.danhSachSuKienTam.length} HS)<br><span style="font-size: 11px; font-weight: normal;">${strDaTai} / ${strTongSo} (${phanTram}%)</span>`;
                                }
                            );

                            if (result.status === 'success') {
                                mangLinkAnhDrive.push(result.url);
                                fileUploadCache[fileKey] = result.url; // Lưu vào cache để các HS tiếp theo dùng lại
                            } else {
                                throw new Error(result.message || "Lỗi tải ảnh minh chứng từ Apps Script.");
                            }
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

        localStorage.setItem('nk_last_ngayDay', ngayDay);
        localStorage.setItem('nk_last_buoi', buoi);
        localStorage.setItem('nk_last_tiet', tiet);
        localStorage.setItem('nk_last_lop', rawLop);

        alert("✅ Đã lưu xong ĐIỂM DANH, CHO ĐIỂM & SỰ KIỆN!");

        window.danhSachSuKienTam = [];
        if (typeof window.ham_20_4_ve_danh_sach_cho === 'function') window.ham_20_4_ve_danh_sach_cho();

        if (document.getElementById('nk-khu-vuc-diem-danh')) document.getElementById('nk-khu-vuc-diem-danh').innerHTML = `
            <div class="dong-hs-vang" style="display: flex; gap: 8px; align-items: center;">
                <input class="nk-input-hs-vang" list="nk-dl-hs" placeholder="Chọn hoặc gõ tên HS vắng..." style="flex: 1; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; outline: none; font-size: 13px;">
                <button onclick="this.parentElement.remove()" style="padding: 8px 12px; background: #f8d7da; color: #721c24; border: none; border-radius: 4px; cursor: pointer;">✖</button>
            </div>`;

        if (typeof window.ham_20_27_kiem_tra_tiet_da_luu === 'function') window.ham_20_27_kiem_tra_tiet_da_luu();

    } catch (err) {
        console.error("Lỗi:", err);
        alert("❌ Lỗi: " + (err.message || err.details || "Không xác định"));
    } finally {
        btnLuu.style.background = bgGoc;
        btnLuu.innerHTML = textGoc;
        btnLuu.disabled = false;
    }
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




// =======================================================
// HÀM 20.11: RENDER ẢNH BÀI GIẢNG (HIỂN THỊ 100% CHIỀU NGANG)
// =======================================================
window.ham_20_11_render_anh_bai_giang = function () {
    const vungHienThiBG = document.getElementById('vung-hien-thi-anh-bang');
    if (!vungHienThiBG) return;

    if (window.danhSachAnhBaiGiangTam.length === 0) {
        vungHienThiBG.style.flexDirection = 'row'; // Trả lại giao diện ngang lúc trống
        vungHienThiBG.innerHTML = '<span id="text-cho-anh">(Ảnh chụp bảng bài dạy sẽ xuất hiện tại đây...)</span>';
        return;
    }

    // 🌟 Ép khung chứa thành dạng Cột để ảnh giãn hết cỡ ngang
    vungHienThiBG.style.flexDirection = 'column';
    vungHienThiBG.style.overflowX = 'hidden';

    let html = '';
    window.danhSachAnhBaiGiangTam.forEach((file, index) => {
        let url = URL.createObjectURL(file);
        let sizeKB = (file.size / 1024).toFixed(1);
        html += `
            <div style="position: relative; width: 100%; display: flex; flex-direction: column; align-items: center; animation: fadeIn 0.3s; background: #fff; padding: 10px; border-radius: 6px; box-sizing: border-box; border: 1px dashed #00acc1; margin-bottom: 5px;">
                <!-- 🌟 width: 100%, height: auto để ảnh tự động zoom full chiều ngang -->
                <img src="${url}" style="width: 100%; height: auto; max-height: 80vh; object-fit: contain; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <span style="font-size: 11px; color: #666; font-weight: bold; margin-top: 5px;">${sizeKB} KB</span>
                <button type="button" onclick="ham_20_11_xoa_anh_tam(${index})" style="position: absolute; top: -8px; right: -8px; background: #dc3545; color: white; border: none; border-radius: 50%; width: 24px; height: 24px; font-size: 12px; font-weight: bold; cursor: pointer; display: flex; justify-content: center; align-items: center; box-shadow: 0 2px 5px rgba(0,0,0,0.3); z-index: 10;">×</button>
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
window.taoTenAnToan = function (chuoi, maxLen = 30) {
    if (!chuoi) return "KhongCo";
    let str = chuoi.toString().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
    str = str.replace(/[\s/\\:*?"<>|]+/g, '_');
    if (str.length > maxLen) str = str.substring(0, maxLen);
    return str.replace(/_$/, '');
};

window.layGioPhutGiay = function () {
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


// // =======================================================
// // HÀM 20.15: THỰC HIỆN TRA CỨU - RENDER DASHBOARD (BẤM VÀO DÒNG ĐỂ XEM)
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

//     if (!tuNgay || !denNgay || !maLopLuu) {
//         alert("⚠️ Vui lòng chọn đủ: Từ ngày, Đến ngày và BẮT BUỘC phải chọn Lớp!");
//         return;
//     }

//     const textGoc = btnLoc.innerHTML;
//     btnLoc.innerHTML = "⏳ ĐANG LẤY VÀ PHÂN TÍCH DỮ LIỆU...";
//     btnLoc.disabled = true;
//     vungKetQua.innerHTML = `<div style="text-align: center; color: #007bff; padding: 30px; font-size: 16px;"><b>⏳ Đang tải và phân tích dữ liệu...</b></div>`;

//     try {
//         const taoLinkAnhPreview = (url) => {
//             if (!url) return '';
//             let fileId = '';
//             let matchD = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
//             let matchId = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
//             let matchOpen = url.match(/\/open\?id=([a-zA-Z0-9_-]+)/);
//             if (matchD) fileId = matchD[1]; else if (matchId) fileId = matchId[1]; else if (matchOpen) fileId = matchOpen[1];
//             return fileId ? `https://lh3.googleusercontent.com/d/${fileId}` : url;
//         };

//         let queryNhatKy = _supabase.from('nhat_ky_day_hoc').select('*').eq('ma_lop', maLopLuu).gte('ngay_day', tuNgay).lte('ngay_day', denNgay).order('ngay_day', { ascending: false }).order('tiet', { ascending: true });
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
//         if (!dsSuKien) dsSuKien = [];

//         let { data: dsHocSinhLop, error: err3 } = await _supabase.from('hoc_sinh').select('*').contains('danh_sach_ma_lop', JSON.stringify([maLopLuu]));
//         if (err3) throw err3;

//         let mapHocSinh = {};
//         if (dsHocSinhLop) {
//             dsHocSinhLop.forEach(hs => {
//                 let tenHienThi = hs.ten || hs.ho_ten || hs.ho_va_ten || 'Chưa có tên';
//                 let uid = hs.uid || hs.id;
//                 let avatarUrl = hs.anh_dai_dien || `https://ui-avatars.com/api/?name=${encodeURIComponent(tenHienThi)}&background=random&color=fff&size=100`;
//                 mapHocSinh[uid] = { ten: tenHienThi, vang: 0, tot: 0, xau: 0, diem: [], suKien: [], avatar: avatarUrl };
//             });
//         }

//         dsSuKien.forEach(sk => {
//             if (!mapHocSinh[sk.uid_hoc_sinh]) {
//                 let avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(sk.ten_hoc_sinh)}&background=random&color=fff&size=100`;
//                 mapHocSinh[sk.uid_hoc_sinh] = { ten: sk.ten_hoc_sinh, vang: 0, tot: 0, xau: 0, diem: [], suKien: [], avatar: avatarUrl };
//             }
//         });

//         const tenCacThu = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];

//         // KHU 1: BẢNG TIẾN ĐỘ BÀI GIẢNG (Đã gán sự kiện onclick vào dòng tr)
//         let rowsKhu1 = '';
//         dsNhatKy.forEach(nk => {
//             let dateObj = new Date(nk.ngay_day);
//             let strNgay = String(dateObj.getDate()).padStart(2, '0') + '/' + String(dateObj.getMonth() + 1).padStart(2, '0') + '/' + dateObj.getFullYear();
//             let thuHienTai = tenCacThu[dateObj.getDay()];
//             let sortTimeStr = `${nk.ngay_day}_${nk.buoi}_${nk.tiet}`;

//             let mangAnhBG = [];
//             if (Array.isArray(nk.danh_sach_anh)) mangAnhBG = nk.danh_sach_anh;
//             else if (typeof nk.danh_sach_anh === 'string' && nk.danh_sach_anh.length > 5) {
//                 try { mangAnhBG = JSON.parse(nk.danh_sach_anh); } catch (e) { mangAnhBG = nk.danh_sach_anh.split(',').filter(l => l.trim()); }
//             }
//             let soAnhBG = mangAnhBG.length;

//             let skCuaTiet = dsSuKien.filter(s => s.id_nhat_ky === nk.id);
//             let soVang = skCuaTiet.filter(s => s.loai_the === 'Vắng mặt').length;
//             let soKienKhac = skCuaTiet.length - soVang;

//             let soAnhMC = 0;
//             skCuaTiet.forEach(sk => {
//                 let dsMC = sk.thong_tin_mo_rong?.danh_sach_anh_minh_chung || [];
//                 if (typeof dsMC === 'string') dsMC = dsMC.split(',').filter(l => l.trim());
//                 soAnhMC += dsMC.length;
//             });

//             let hienThiTiet = nk.tiet.toLowerCase().includes('tiết') ? `${nk.tiet} - ${nk.buoi}` : `Tiết ${nk.tiet} - ${nk.buoi}`;

//             // 🌟 Gắn onclick vào <tr>, dùng event.stopPropagation() ở các nút con để chặn xung đột
//             rowsKhu1 += `
//                 <tr onclick="window.ham_20_33_xem_chi_tiet_tiet('${nk.id}')" style="background: #fff; transition: 0.2s; cursor: pointer;" onmouseover="this.style.background='#f1f8ff'" onmouseout="this.style.background='#fff'" title="Bấm để xem chi tiết tiết dạy">
//                     <td data-sort="${sortTimeStr}" style="padding: 10px; border-bottom: 1px solid #eee;"><b>${strNgay}</b><br><span style="font-size:11px; color:#666;">${thuHienTai}</span></td>
//                     <td style="padding: 10px; border-bottom: 1px solid #eee; color: #17a2b8; font-weight:bold;">${hienThiTiet}</td>
//                     <td style="padding: 10px; border-bottom: 1px solid #eee;">${nk.phan_mon || '-'}</td>
//                     <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight:bold; color:#0056b3;">${nk.ten_bai || '(Chưa nhập tên bài)'}</td>
//                     <td style="padding: 10px; border-bottom: 1px solid #eee; text-align:center;">${soAnhBG > 0 ? `<b style="color:#28a745;">${soAnhBG} 📸</b>` : '-'}</td>
//                     <td style="padding: 10px; border-bottom: 1px solid #eee; text-align:center;">${soVang > 0 ? `<b style="color:red;">${soVang}</b>` : '-'}</td>
//                     <td style="padding: 10px; border-bottom: 1px solid #eee; text-align:center;">${soKienKhac > 0 ? `<b style="color:#d35400;">${soKienKhac}</b>` : '-'}</td>
//                     <td style="padding: 10px; border-bottom: 1px solid #eee; text-align:center;">${soAnhMC > 0 ? `<b style="color:#6f42c1;">${soAnhMC} 🖼️</b>` : '-'}</td>
//                     <td style="padding: 10px; border-bottom: 1px solid #eee; text-align:center; white-space:nowrap;">
//                         <button onclick="event.stopPropagation(); window.ham_20_33_xem_chi_tiet_tiet('${nk.id}')" style="background: #007bff; color: white; border: none; padding: 4px 8px; border-radius: 4px; font-size: 11px; cursor: pointer; font-weight: bold; margin-right:3px;" title="Xem chi tiết">👁️</button>
//                         <button onclick="event.stopPropagation(); window.ham_20_39_sua_tiet_hoc_popup('${nk.id}')" style="background: #ffc107; color: #000; border: none; padding: 4px 8px; border-radius: 4px; font-size: 11px; cursor: pointer; font-weight: bold; margin-right:3px;" title="Sửa nội dung tiết">✏️</button>
//                         <button onclick="event.stopPropagation(); window.ham_20_18_xoa_nguyen_tiet('${nk.id}')" style="background: #dc3545; color: white; border: none; padding: 4px 8px; border-radius: 4px; font-size: 11px; cursor: pointer; font-weight: bold;" title="Xóa tiết này">🗑️</button>
//                     </td>
//                 </tr>
//             `;
//         });

//         // KHU 2: BẢNG THỐNG KÊ HÀNH VI
//         dsSuKien.forEach(sk => {
//             let uid = sk.uid_hoc_sinh;
//             let hs = mapHocSinh[uid];

//             let nkTuongUng = dsNhatKy.find(n => n.id === sk.id_nhat_ky);
//             let ngaySK = nkTuongUng ? new Date(nkTuongUng.ngay_day) : new Date();
//             let strNgaySK = `${String(ngaySK.getDate()).padStart(2, '0')}/${String(ngaySK.getMonth() + 1).padStart(2, '0')}`;

//             let dsAnh = sk.thong_tin_mo_rong?.danh_sach_anh_minh_chung || [];
//             if (typeof dsAnh === 'string') dsAnh = dsAnh.split(',').filter(l => l.trim());
//             let iconAnh = (dsAnh.length > 0) ? ' 📸' : '';

//             let encGhiChu = encodeURIComponent(sk.ghi_chu || '');
//             let encLoaiThe = encodeURIComponent(sk.loai_the || '');
//             let encLinks = encodeURIComponent(dsAnh.join(','));
//             let diemSo = sk.thong_tin_mo_rong?.diem_so || '';

//             let actionStr = `onclick="window.ham_20_34_xem_chi_tiet_su_kien_popup('${sk.id}', '${encLoaiThe}', '${encGhiChu}', '${diemSo}', '${strNgaySK}', '${encLinks}')" style="cursor: pointer; box-shadow: 0 1px 3px rgba(0,0,0,0.15); transition: 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'"`;
//             let cssChung = "padding: 3px 6px; border-radius: 4px; font-size: 11px; font-weight: bold; white-space: nowrap; display: inline-block;";

//             if (sk.loai_the === 'Vắng mặt') {
//                 hs.vang++;
//                 hs.suKien.push(`<span ${actionStr} class="tag-sk" style="${cssChung} background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;" title="Bấm để xem & xóa">[${strNgaySK}] Vắng${iconAnh}</span>`);
//             } else if (sk.loai_the === 'Cho điểm') {
//                 hs.diem.push(`<b>${diemSo}đ</b>`);
//                 hs.suKien.push(`<span ${actionStr} class="tag-sk" style="${cssChung} background: #e8f5e9; color: #155724; border: 1px solid #c3e6cb;" title="Bấm để xem & xóa">${iconAnh}[${strNgaySK}] Điểm ${diemSo}</span>`);
//             } else if (sk.thong_tin_mo_rong?.mau_sac === '#28a745') {
//                 hs.tot++;
//                 hs.suKien.push(`<span ${actionStr} class="tag-sk" style="${cssChung} background: #d4edda; color: #155724; border: 1px solid #c3e6cb;" title="Bấm để xem & xóa">${iconAnh}[${strNgaySK}] ${sk.loai_the}</span>`);
//             } else {
//                 hs.xau++;
//                 hs.suKien.push(`<span ${actionStr} class="tag-sk" style="${cssChung} background: #fff3cd; color: #856404; border: 1px solid #ffeeba;" title="Bấm để xem & xóa">${iconAnh}[${strNgaySK}] ${sk.loai_the}</span>`);
//             }
//         });

//         let mangHocSinh = Object.values(mapHocSinh).sort((a, b) => window.ham_ho_tro_so_sanh_ten_vn ? window.ham_ho_tro_so_sanh_ten_vn(a.ten, b.ten) : a.ten.localeCompare(b.ten, 'vi'));
//         if (isTimHocSinh) mangHocSinh = mangHocSinh.filter(hs => hs.ten.toLowerCase().includes(tenHsTimKiem));

//         let rowsKhu2 = '';
//         mangHocSinh.forEach((hs, idx) => {
//             let hasEvent = (hs.vang > 0 || hs.tot > 0 || hs.xau > 0 || hs.diem.length > 0);
//             if (hasEvent) {
//                 rowsKhu2 += `
//                     <tr style="background: #fff; transition: 0.2s;" onmouseover="this.style.background='#fdfdfd'" onmouseout="this.style.background='#fff'">
//                         <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center; color: #999;">${idx + 1}</td>
//                         <td style="padding: 8px; border-bottom: 1px solid #eee;">
//                             <div style="display: flex; align-items: center; gap: 8px;">
//                                 <img src="${hs.avatar}" style="width: 32px; height: 32px; object-fit: cover; border-radius: 50%; border: 1px solid #dee2e6; box-shadow: 0 1px 2px rgba(0,0,0,0.1);">
//                                 <span style="font-weight: bold; color: #333;">${hs.ten}</span>
//                             </div>
//                         </td>
//                         <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center; color: #28a745;">${hs.diem.join(', ') || '-'}</td>
//                         <td style="padding: 8px; border-bottom: 1px solid #eee; font-size: 11px;">
//                             <span style="color:#28a745; font-weight:bold;">🟢 ${hs.tot} Tốt</span> | 
//                             <span style="color:#dc3545; font-weight:bold;">🔴 ${hs.xau} Xấu</span> | 
//                             <span style="color:#6c757d; font-weight:bold;">⚫ ${hs.vang} Vắng</span>
//                         </td>
//                         <td style="padding: 8px; border-bottom: 1px solid #eee;">
//                             <div style="display: flex; flex-wrap: wrap; gap: 6px;">${hs.suKien.join('')}</div>
//                         </td>
//                     </tr>
//                 `;
//             } else {
//                 rowsKhu2 += `
//                     <tr style="background: #f8fbff; transition: 0.2s;" onmouseover="this.style.background='#eef6ff'" onmouseout="this.style.background='#f8fbff'">
//                         <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center; color: #999;">${idx + 1}</td>
//                         <td style="padding: 8px; border-bottom: 1px solid #eee;">
//                             <div style="display: flex; align-items: center; gap: 8px;">
//                                 <img src="${hs.avatar}" style="width: 32px; height: 32px; object-fit: cover; border-radius: 50%; border: 1px solid #dee2e6; box-shadow: 0 1px 2px rgba(0,0,0,0.1);">
//                                 <span style="font-weight: bold; color: #333;">${hs.ten}</span>
//                             </div>
//                         </td>
//                         <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center; color: #ccc;">-</td>
//                         <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center; font-size: 11px; font-weight: bold; color: #007bff;">✅ Ổn định</td>
//                         <td style="padding: 8px; border-bottom: 1px solid #eee; font-size: 11px; color: #adb5bd; font-style: italic;">Không có vi phạm hay vắng mặt</td>
//                     </tr>
//                 `;
//             }
//         });

//         // KHU 3: CHI TIẾT TỪNG TIẾT
//         let dsNhatKyHienThi = isTimHocSinh ? dsNhatKy.filter(nk => dsSuKien.some(sk => sk.id_nhat_ky === nk.id && mapHocSinh[sk.uid_hoc_sinh].ten.toLowerCase().includes(tenHsTimKiem))) : dsNhatKy;

//         let htmlKhu3 = '';
//         dsNhatKyHienThi.forEach(nk => {
//             let dateObj = new Date(nk.ngay_day);
//             let strNgay = `${String(dateObj.getDate()).padStart(2, '0')}/${String(dateObj.getMonth() + 1).padStart(2, '0')}/${dateObj.getFullYear()}`;
//             let hienThiTiet = nk.tiet.toLowerCase().includes('tiết') ? nk.tiet : `Tiết ${nk.tiet}`;

//             let mangAnhBG = [];
//             if (Array.isArray(nk.danh_sach_anh)) mangAnhBG = nk.danh_sach_anh;
//             else if (typeof nk.danh_sach_anh === 'string' && nk.danh_sach_anh.length > 5) {
//                 try { mangAnhBG = JSON.parse(nk.danh_sach_anh); } catch (e) { mangAnhBG = nk.danh_sach_anh.split(',').filter(l => l.trim()); }
//             }
//             let htmlAnhBG = '';
//             if (mangAnhBG.length > 0) {
//                 htmlAnhBG = `<div style="display: flex; flex-direction: column; gap: 10px; margin-top: 10px; padding: 10px; background: #e0f7fa; border-radius: 6px;">`;
//                 mangAnhBG.forEach((link) => {
//                     htmlAnhBG += `<img onclick="window.ham_20_36_xem_anh_toan_man_hinh('${link}')" src="${taoLinkAnhPreview(link)}" loading="lazy" style="width: 100%; height: auto; max-height: 80vh; object-fit: contain; background: #fff; border-radius: 6px; border: 2px solid #00acc1; box-shadow: 0 2px 4px rgba(0,0,0,0.15); cursor: zoom-in;" title="Bấm để phóng to">`;
//                 });
//                 htmlAnhBG += `</div>`;
//             }

//             let skCuaTiet = dsSuKien.filter(sk => sk.id_nhat_ky === nk.id);
//             if (isTimHocSinh) skCuaTiet = skCuaTiet.filter(sk => mapHocSinh[sk.uid_hoc_sinh].ten.toLowerCase().includes(tenHsTimKiem));

//             let vangMat = skCuaTiet.filter(sk => sk.loai_the === 'Vắng mặt');
//             let suKienKhac = skCuaTiet.filter(sk => sk.loai_the !== 'Vắng mặt');

//             let htmlSuKien = '';

//             if (vangMat.length > 0) {
//                 let htmlVang = vangMat.map(v => {
//                     let hsAvatar = mapHocSinh[v.uid_hoc_sinh]?.avatar;
//                     return `<span style="display:inline-flex; align-items:center; gap:6px; background:#f8d7da; color:#721c24; padding:4px 8px; border-radius:20px; font-size:12px; font-weight:bold; border:1px solid #f5c6cb; box-shadow: 0 1px 2px rgba(0,0,0,0.05);"><img src="${hsAvatar}" style="width:20px; height:20px; border-radius:50%; object-fit: cover; border: 1px solid #fff;"> ${v.ten_hoc_sinh}</span>`;
//                 }).join(' ');

//                 htmlSuKien += `<div style="margin-bottom:12px;"><strong style="color: #dc3545; font-size: 13px; display:block; margin-bottom:5px;">❌ Vắng mặt:</strong> <div style="display:flex; flex-wrap:wrap; gap:8px;">${htmlVang}</div></div>`;
//             }

//             if (suKienKhac.length > 0) {
//                 htmlSuKien += `<strong style="color: #d35400; font-size: 13px; display:inline-block; margin-top:8px;">🎯 Sự kiện / Điểm:</strong><div style="margin-top: 5px;">`;
//                 suKienKhac.forEach(sk => {
//                     let textGC = sk.ghi_chu ? ` - <i>${sk.ghi_chu}</i>` : '';
//                     let mauThe = sk.thong_tin_mo_rong?.mau_sac || '#fd7e14';
//                     let badgeDiem = (sk.loai_the === 'Cho điểm' && sk.thong_tin_mo_rong?.diem_so) ? `<span style="background:#28a745; color:white; padding:1px 5px; border-radius:3px; font-size:11px; margin-right:4px;">⭐ ${sk.thong_tin_mo_rong.diem_so}đ</span>` : '';

//                     let dsMC = sk.thong_tin_mo_rong?.danh_sach_anh_minh_chung || [];
//                     if (typeof dsMC === 'string') dsMC = dsMC.split(',').filter(l => l.trim());
//                     let htmlMC = dsMC.length > 0 ? `<div style="display:flex; flex-direction:column; gap:10px; margin-top:8px;">${dsMC.map(l => `<img onclick="window.ham_20_36_xem_anh_toan_man_hinh('${l}')" src="${taoLinkAnhPreview(l)}" style="width: 100%; height: auto; max-height: 80vh; object-fit: contain; background: #fff; border-radius: 6px; border: 1px solid #ccc; box-shadow: 0 2px 4px rgba(0,0,0,0.1); cursor: zoom-in;" title="Bấm để phóng to">`).join('')}</div>` : '';

//                     let hsAvatar = mapHocSinh[sk.uid_hoc_sinh]?.avatar;

//                     htmlSuKien += `<div style="margin-bottom:8px; border-left:3px solid ${mauThe}; padding-left:10px; background:#fff; padding-top:8px; padding-bottom:8px; font-size:13px; box-shadow: 0 1px 2px rgba(0,0,0,0.05); border-radius: 0 6px 6px 0;">
//                         <div style="display:flex; align-items:center; gap:8px;">
//                             <img src="${hsAvatar}" style="width: 28px; height: 28px; border-radius: 50%; object-fit: cover; border: 1px solid #dee2e6;">
//                             <div style="line-height: 1.4;"><b>${sk.ten_hoc_sinh}</b>: ${badgeDiem}<span style="color:${mauThe}; font-weight:bold;">[${sk.loai_the}]</span><span style="color:#555;">${textGC}</span></div>
//                         </div>
//                         ${htmlMC}
//                     </div>`;
//                 });
//                 htmlSuKien += `</div>`;
//             }
//             if (skCuaTiet.length === 0) htmlSuKien = `<i style="color:#28a745; font-size:12px;">✅ Không có sự kiện nào.</i>`;

//             htmlKhu3 += `
//                 <div id="card-tiet-${nk.id}" style="background: #fff; border: 1px solid #ced4da; border-radius: 8px; box-shadow: 0 3px 6px rgba(0,0,0,0.05); padding: 15px; margin-bottom: 20px;">
                    
//                     <div style="border-bottom: 1px solid #eee; padding-bottom: 10px; margin-bottom: 10px; display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap;">
//                         <div style="display: flex; align-items: center; gap: 10px;">
//                             <span style="background: #17a2b8; color: white; padding: 4px 10px; border-radius: 4px; font-weight: bold; font-size: 13px;">${nk.phan_mon || 'Không rõ môn'}</span>
//                             <span style="color: #6c757d; font-size: 13px; font-weight: bold;">🕒 ${hienThiTiet} - ${nk.buoi} - ${tenCacThu[new Date(nk.ngay_day).getDay()]}, Ngày ${strNgay}</span>
//                         </div>
//                         <div style="display: flex; gap: 5px;">
//                             <button onclick="window.ham_20_39_sua_tiet_hoc_popup('${nk.id}')" style="background: #ffc107; color: #000; border: none; padding: 5px 12px; border-radius: 4px; font-size: 12px; cursor: pointer; font-weight: bold; box-shadow: 0 1px 2px rgba(0,0,0,0.1);">✏️ Sửa chi tiết</button>
//                             <button onclick="window.ham_20_18_xoa_nguyen_tiet('${nk.id}')" style="background: #dc3545; color: white; border: none; padding: 5px 12px; border-radius: 4px; font-size: 12px; cursor: pointer; font-weight: bold; box-shadow: 0 1px 2px rgba(0,0,0,0.1);">🗑️ Xóa tiết này</button>
//                         </div>
//                     </div>

//                     <div style="display: flex; flex-wrap: wrap; gap: 20px;">
//                         <div style="flex: 1.5; min-width: 300px; border-right: 1px dashed #ccc; padding-right: 15px;">
//                             <div style="font-size: 15px; font-weight: bold; color: #0056b3; margin-bottom: 5px;">📖 Tên bài: ${nk.ten_bai || '---'}</div>
//                             <div style="font-size: 13px; color: #333; margin-bottom: 5px;"><b>Lý thuyết:</b> <span style="white-space:pre-wrap;">${nk.ly_thuyet || '---'}</span></div>
//                             <div style="font-size: 13px; color: #333; margin-bottom: 5px;"><b>Bài tập:</b> <span style="white-space:pre-wrap;">${nk.bai_tap || '---'}</span></div>
//                             <div style="font-size: 13px; color: #856404; background:#fffcf8; padding:5px; border-radius:4px;"><b>Dặn dò:</b> <span style="white-space:pre-wrap;">${nk.dan_do || '---'}</span></div>
//                             ${htmlAnhBG}
//                         </div>
//                         <div style="flex: 1; min-width: 250px; background: #fafafa; padding: 10px; border-radius: 6px;">
//                             ${htmlSuKien}
//                         </div>
//                     </div>
//                 </div>
//             `;
//         });

//         vungKetQua.innerHTML = `
//             <div style="${isTimHocSinh ? 'display:none;' : ''} background: #fff; border: 1px solid #b8daff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); overflow: hidden; margin-bottom: 15px;">
//                 <div style="background: #e0f3ff; padding: 12px 15px; border-bottom: 1px solid #b8daff; display: flex; justify-content: space-between; align-items: center;">
//                     <h4 style="margin: 0; color: #0056b3; font-size: 15px;">🏫 1. TIẾN ĐỘ BÀI GIẢNG CỦA LỚP (${dsNhatKy.length} tiết)</h4>
//                     <button onclick="let c = document.getElementById('khu-vuc-1-content'); if(c.style.display==='none'){c.style.display='block'; this.innerHTML='🔽 Thu gọn';}else{c.style.display='none'; this.innerHTML='👁️ Mở rộng';}" style="background: transparent; border: 1px solid #0056b3; color: #0056b3; border-radius: 4px; padding: 3px 8px; font-size: 11px; cursor: pointer; font-weight: bold;">🔽 Thu gọn</button>
//                 </div>
//                 <div id="khu-vuc-1-content" style="padding: 15px; overflow-x: auto; display: block;">
//                     <table id="bang-tien-do-lop" style="width: 100%; border-collapse: collapse; font-size: 13px; min-width: 600px;">
//                         <thead>
//                             <tr style="background: #007bff; color: white; text-align: left;">
//                                 <th onclick="ham_20_21_sap_xep_bang(0, 'bang-tien-do-lop')" style="padding: 10px; cursor: pointer; border-bottom: 2px solid #0056b3;">Thời gian ↕️</th>
//                                 <th onclick="ham_20_21_sap_xep_bang(1, 'bang-tien-do-lop')" style="padding: 10px; cursor: pointer; border-bottom: 2px solid #0056b3;">Tiết ↕️</th>
//                                 <th onclick="ham_20_21_sap_xep_bang(2, 'bang-tien-do-lop')" style="padding: 10px; cursor: pointer; border-bottom: 2px solid #0056b3;">Môn ↕️</th>
//                                 <th onclick="ham_20_21_sap_xep_bang(3, 'bang-tien-do-lop')" style="padding: 10px; cursor: pointer; border-bottom: 2px solid #0056b3; width: 30%;">Tên bài ↕️</th>
//                                 <th style="padding: 10px; border-bottom: 2px solid #0056b3; text-align:center;">Ảnh BG</th>
//                                 <th style="padding: 10px; border-bottom: 2px solid #0056b3; text-align:center;">Vắng</th>
//                                 <th style="padding: 10px; border-bottom: 2px solid #0056b3; text-align:center;">Sự kiện</th>
//                                 <th style="padding: 10px; border-bottom: 2px solid #0056b3; text-align:center;">Ảnh MC</th>
//                                 <th style="padding: 10px; border-bottom: 2px solid #0056b3; text-align:center;">Thao tác</th>
//                             </tr>
//                         </thead>
//                         <tbody>${rowsKhu1}</tbody>
//                     </table>
//                 </div>
//             </div>

//             <div style="background: #fff; border: 1px solid #c3e6cb; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); overflow: hidden; margin-bottom: 15px;">
//                 <div style="background: #d4edda; padding: 12px 15px; border-bottom: 1px solid #c3e6cb; display: flex; justify-content: space-between; align-items: center;">
//                     <h4 style="margin: 0; color: #155724; font-size: 15px;">${isTimHocSinh ? '🧑‍🎓 BÁO CÁO CÁ NHÂN: <span style="text-transform:uppercase;">' + tenHsTimKiem + '</span>' : '🧑‍🎓 2. BẢNG THỐNG KÊ HÀNH VI TOÀN LỚP'}</h4>
//                     <button onclick="let c = document.getElementById('khu-vuc-2-content'); if(c.style.display==='none'){c.style.display='block'; this.innerHTML='🔽 Thu gọn';}else{c.style.display='none'; this.innerHTML='👁️ Mở rộng';}" style="background: transparent; border: 1px solid #155724; color: #155724; border-radius: 4px; padding: 3px 8px; font-size: 11px; cursor: pointer; font-weight: bold;">🔽 Thu gọn</button>
//                 </div>
//                 <div id="khu-vuc-2-content" style="padding: 15px; overflow-x: auto; display: block;">
//                     <table id="bang-thong-ke-lop" style="width: 100%; border-collapse: collapse; font-size: 13px; min-width: 600px;">
//                         <thead>
//                             <tr style="background: #28a745; color: white; text-align: left;">
//                                 <th style="padding: 10px; border-bottom: 2px solid #1e7e34; text-align: center; width: 40px;">STT</th>
//                                 <th onclick="ham_20_21_sap_xep_bang(1, 'bang-thong-ke-lop')" style="padding: 10px; cursor: pointer; border-bottom: 2px solid #1e7e34; width: 150px;">Tên Học sinh ↕️</th>
//                                 <th style="padding: 10px; border-bottom: 2px solid #1e7e34; text-align: center; width: 100px;">💯 Điểm số</th>
//                                 <th style="padding: 10px; border-bottom: 2px solid #1e7e34; width: 160px;">📊 Đánh giá Nề nếp</th>
//                                 <th style="padding: 10px; border-bottom: 2px solid #1e7e34;">⏱️ Lịch sử Sự kiện (Bấm vào Thẻ để xem Chi tiết & Xóa)</th>
//                             </tr>
//                         </thead>
//                         <tbody>${rowsKhu2}</tbody>
//                     </table>
//                 </div>
//             </div>

//             <div style="background: #fff; border: 1px solid #ffeeba; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); overflow: hidden;">
//                 <div style="background: #fff3cd; padding: 12px 15px; border-bottom: 1px solid #ffeeba; display: flex; justify-content: space-between; align-items: center;">
//                     <h4 style="margin: 0; color: #856404; font-size: 15px;">📝 ${isTimHocSinh ? 'CHI TIẾT NỘI DUNG CÁC TIẾT CÓ SỰ KIỆN' : '3. CHI TIẾT NỘI DUNG TỪNG TIẾT'}</h4>
//                     <button id="btn-toggle-khu-3" onclick="let c = document.getElementById('khu-vuc-3-content'); if(c.style.display==='none'){c.style.display='block'; this.innerHTML='🔽 Thu gọn';}else{c.style.display='none'; this.innerHTML='👁️ Xem chi tiết';}" style="background: #ffc107; border: 1px solid #d39e00; color: #000; border-radius: 4px; padding: 4px 10px; font-size: 12px; cursor: pointer; font-weight: bold;">${isTimHocSinh ? '🔽 Thu gọn' : '👁️ Xem chi tiết'}</button>
//                 </div>
//                 <div id="khu-vuc-3-content" style="padding: 15px; display: ${isTimHocSinh ? 'block' : 'none'}; background: #fafafa;">
//                     ${htmlKhu3}
//                 </div>
//             </div>
//         `;

//     } catch (err) {
//         console.error("Lỗi tra cứu:", err);
//         vungKetQua.innerHTML = `<div style="text-align: center; color: red; padding: 20px;"><b>❌ Lỗi khi phân tích dữ liệu! ${err.message || ''}</b></div>`;
//     } finally {
//         btnLoc.innerHTML = textGoc;
//         btnLoc.disabled = false;
//     }
// };

// =======================================================
// HÀM 20.15: THỰC HIỆN TRA CỨU - RENDER DASHBOARD (THÊM NÚT TRỞ VỀ ĐẦU TRANG Ở KHU 3)
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
            if (matchD) fileId = matchD[1]; else if (matchId) fileId = matchId[1]; else if (matchOpen) fileId = matchOpen[1];
            return fileId ? `https://lh3.googleusercontent.com/d/${fileId}` : url;
        };

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

        let { data: dsHocSinhLop, error: err3 } = await _supabase.from('hoc_sinh').select('*').contains('danh_sach_ma_lop', JSON.stringify([maLopLuu]));
        if (err3) throw err3;

        let mapHocSinh = {};
        if (dsHocSinhLop) {
            dsHocSinhLop.forEach(hs => {
                let tenHienThi = hs.ten || hs.ho_ten || hs.ho_va_ten || 'Chưa có tên';
                let uid = hs.uid || hs.id;
                let avatarUrl = hs.anh_dai_dien || `https://ui-avatars.com/api/?name=${encodeURIComponent(tenHienThi)}&background=random&color=fff&size=100`;
                mapHocSinh[uid] = { ten: tenHienThi, vang: 0, tot: 0, xau: 0, diem: [], suKien: [], avatar: avatarUrl };
            });
        }

        dsSuKien.forEach(sk => {
            if (!mapHocSinh[sk.uid_hoc_sinh]) {
                let avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(sk.ten_hoc_sinh)}&background=random&color=fff&size=100`;
                mapHocSinh[sk.uid_hoc_sinh] = { ten: sk.ten_hoc_sinh, vang: 0, tot: 0, xau: 0, diem: [], suKien: [], avatar: avatarUrl };
            }
        });

        const tenCacThu = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];

        // KHU 1: BẢNG TIẾN ĐỘ BÀI GIẢNG 
        let rowsKhu1 = '';
        dsNhatKy.forEach(nk => {
            let dateObj = new Date(nk.ngay_day);
            let strNgay = String(dateObj.getDate()).padStart(2, '0') + '/' + String(dateObj.getMonth() + 1).padStart(2, '0') + '/' + dateObj.getFullYear();
            let thuHienTai = tenCacThu[dateObj.getDay()];
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

            let soAnhMC = 0;
            skCuaTiet.forEach(sk => {
                let dsMC = sk.thong_tin_mo_rong?.danh_sach_anh_minh_chung || [];
                if (typeof dsMC === 'string') dsMC = dsMC.split(',').filter(l => l.trim());
                soAnhMC += dsMC.length;
            });

            let hienThiTiet = nk.tiet.toLowerCase().includes('tiết') ? `${nk.tiet} - ${nk.buoi}` : `Tiết ${nk.tiet} - ${nk.buoi}`;

            rowsKhu1 += `
                <tr onclick="window.ham_20_33_xem_chi_tiet_tiet('${nk.id}')" style="background: #fff; transition: 0.2s; cursor: pointer;" onmouseover="this.style.background='#f1f8ff'" onmouseout="this.style.background='#fff'" title="Bấm để xem chi tiết tiết dạy">
                    <td data-sort="${sortTimeStr}" style="padding: 10px; border-bottom: 1px solid #eee;"><b>${strNgay}</b><br><span style="font-size:11px; color:#666;">${thuHienTai}</span></td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee; color: #17a2b8; font-weight:bold;">${hienThiTiet}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">${nk.phan_mon || '-'}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight:bold; color:#0056b3;">${nk.ten_bai || '(Chưa nhập tên bài)'}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee; text-align:center;">${soAnhBG > 0 ? `<b style="color:#28a745;">${soAnhBG} 📸</b>` : '-'}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee; text-align:center;">${soVang > 0 ? `<b style="color:red;">${soVang}</b>` : '-'}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee; text-align:center;">${soKienKhac > 0 ? `<b style="color:#d35400;">${soKienKhac}</b>` : '-'}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee; text-align:center;">${soAnhMC > 0 ? `<b style="color:#6f42c1;">${soAnhMC} 🖼️</b>` : '-'}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee; text-align:center; white-space:nowrap;">
                        <button onclick="event.stopPropagation(); window.ham_20_33_xem_chi_tiet_tiet('${nk.id}')" style="background: #007bff; color: white; border: none; padding: 4px 8px; border-radius: 4px; font-size: 11px; cursor: pointer; font-weight: bold; margin-right:3px;" title="Xem chi tiết">👁️</button>
                        <button onclick="event.stopPropagation(); window.ham_20_39_sua_tiet_hoc_popup('${nk.id}')" style="background: #ffc107; color: #000; border: none; padding: 4px 8px; border-radius: 4px; font-size: 11px; cursor: pointer; font-weight: bold; margin-right:3px;" title="Sửa nội dung tiết">✏️</button>
                        <button onclick="event.stopPropagation(); window.ham_20_18_xoa_nguyen_tiet('${nk.id}')" style="background: #dc3545; color: white; border: none; padding: 4px 8px; border-radius: 4px; font-size: 11px; cursor: pointer; font-weight: bold;" title="Xóa tiết này">🗑️</button>
                    </td>
                </tr>
            `;
        });

        // KHU 2: BẢNG THỐNG KÊ HÀNH VI
        dsSuKien.forEach(sk => {
            let uid = sk.uid_hoc_sinh;
            let hs = mapHocSinh[uid];

            let nkTuongUng = dsNhatKy.find(n => n.id === sk.id_nhat_ky);
            let ngaySK = nkTuongUng ? new Date(nkTuongUng.ngay_day) : new Date();
            let strNgaySK = `${String(ngaySK.getDate()).padStart(2, '0')}/${String(ngaySK.getMonth() + 1).padStart(2, '0')}`;

            let dsAnh = sk.thong_tin_mo_rong?.danh_sach_anh_minh_chung || [];
            if (typeof dsAnh === 'string') dsAnh = dsAnh.split(',').filter(l => l.trim());
            let iconAnh = (dsAnh.length > 0) ? ' 📸' : '';

            let encGhiChu = encodeURIComponent(sk.ghi_chu || '');
            let encLoaiThe = encodeURIComponent(sk.loai_the || '');
            let encLinks = encodeURIComponent(dsAnh.join(','));
            let diemSo = sk.thong_tin_mo_rong?.diem_so || '';

            let actionStr = `onclick="window.ham_20_34_xem_chi_tiet_su_kien_popup('${sk.id}', '${encLoaiThe}', '${encGhiChu}', '${diemSo}', '${strNgaySK}', '${encLinks}')" style="cursor: pointer; box-shadow: 0 1px 3px rgba(0,0,0,0.15); transition: 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'"`;
            let cssChung = "padding: 3px 6px; border-radius: 4px; font-size: 11px; font-weight: bold; white-space: nowrap; display: inline-block;";

            if (sk.loai_the === 'Vắng mặt') {
                hs.vang++;
                hs.suKien.push(`<span ${actionStr} class="tag-sk" style="${cssChung} background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;" title="Bấm để xem & xóa">[${strNgaySK}] Vắng${iconAnh}</span>`);
            } else if (sk.loai_the === 'Cho điểm') {
                hs.diem.push(`<b>${diemSo}đ</b>`);
                hs.suKien.push(`<span ${actionStr} class="tag-sk" style="${cssChung} background: #e8f5e9; color: #155724; border: 1px solid #c3e6cb;" title="Bấm để xem & xóa">${iconAnh}[${strNgaySK}] Điểm ${diemSo}</span>`);
            } else if (sk.thong_tin_mo_rong?.mau_sac === '#28a745') {
                hs.tot++;
                hs.suKien.push(`<span ${actionStr} class="tag-sk" style="${cssChung} background: #d4edda; color: #155724; border: 1px solid #c3e6cb;" title="Bấm để xem & xóa">${iconAnh}[${strNgaySK}] ${sk.loai_the}</span>`);
            } else {
                hs.xau++;
                hs.suKien.push(`<span ${actionStr} class="tag-sk" style="${cssChung} background: #fff3cd; color: #856404; border: 1px solid #ffeeba;" title="Bấm để xem & xóa">${iconAnh}[${strNgaySK}] ${sk.loai_the}</span>`);
            }
        });

        let mangHocSinh = Object.values(mapHocSinh).sort((a, b) => window.ham_ho_tro_so_sanh_ten_vn ? window.ham_ho_tro_so_sanh_ten_vn(a.ten, b.ten) : a.ten.localeCompare(b.ten, 'vi'));
        if (isTimHocSinh) mangHocSinh = mangHocSinh.filter(hs => hs.ten.toLowerCase().includes(tenHsTimKiem));

        let rowsKhu2 = '';
        mangHocSinh.forEach((hs, idx) => {
            let hasEvent = (hs.vang > 0 || hs.tot > 0 || hs.xau > 0 || hs.diem.length > 0);
            if (hasEvent) {
                rowsKhu2 += `
                    <tr style="background: #fff; transition: 0.2s;" onmouseover="this.style.background='#fdfdfd'" onmouseout="this.style.background='#fff'">
                        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center; color: #999;">${idx + 1}</td>
                        <td style="padding: 8px; border-bottom: 1px solid #eee;">
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <img src="${hs.avatar}" style="width: 32px; height: 32px; object-fit: cover; border-radius: 50%; border: 1px solid #dee2e6; box-shadow: 0 1px 2px rgba(0,0,0,0.1);">
                                <span style="font-weight: bold; color: #333;">${hs.ten}</span>
                            </div>
                        </td>
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
                        <td style="padding: 8px; border-bottom: 1px solid #eee;">
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <img src="${hs.avatar}" style="width: 32px; height: 32px; object-fit: cover; border-radius: 50%; border: 1px solid #dee2e6; box-shadow: 0 1px 2px rgba(0,0,0,0.1);">
                                <span style="font-weight: bold; color: #333;">${hs.ten}</span>
                            </div>
                        </td>
                        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center; color: #ccc;">-</td>
                        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center; font-size: 11px; font-weight: bold; color: #007bff;">✅ Ổn định</td>
                        <td style="padding: 8px; border-bottom: 1px solid #eee; font-size: 11px; color: #adb5bd; font-style: italic;">Không có vi phạm hay vắng mặt</td>
                    </tr>
                `;
            }
        });

        // KHU 3: CHI TIẾT TỪNG TIẾT
        let dsNhatKyHienThi = isTimHocSinh ? dsNhatKy.filter(nk => dsSuKien.some(sk => sk.id_nhat_ky === nk.id && mapHocSinh[sk.uid_hoc_sinh].ten.toLowerCase().includes(tenHsTimKiem))) : dsNhatKy;

        let htmlKhu3 = '';
        dsNhatKyHienThi.forEach(nk => {
            let dateObj = new Date(nk.ngay_day);
            let strNgay = `${String(dateObj.getDate()).padStart(2, '0')}/${String(dateObj.getMonth() + 1).padStart(2, '0')}/${dateObj.getFullYear()}`;
            let hienThiTiet = nk.tiet.toLowerCase().includes('tiết') ? nk.tiet : `Tiết ${nk.tiet}`;

            let mangAnhBG = [];
            if (Array.isArray(nk.danh_sach_anh)) mangAnhBG = nk.danh_sach_anh;
            else if (typeof nk.danh_sach_anh === 'string' && nk.danh_sach_anh.length > 5) {
                try { mangAnhBG = JSON.parse(nk.danh_sach_anh); } catch (e) { mangAnhBG = nk.danh_sach_anh.split(',').filter(l => l.trim()); }
            }
            let htmlAnhBG = '';
            if (mangAnhBG.length > 0) {
                htmlAnhBG = `<div style="display: flex; flex-direction: column; gap: 10px; margin-top: 10px; padding: 10px; background: #e0f7fa; border-radius: 6px;">`;
                mangAnhBG.forEach((link) => {
                    htmlAnhBG += `<img onclick="window.ham_20_36_xem_anh_toan_man_hinh('${link}')" src="${taoLinkAnhPreview(link)}" loading="lazy" style="width: 100%; height: auto; max-height: 80vh; object-fit: contain; background: #fff; border-radius: 6px; border: 2px solid #00acc1; box-shadow: 0 2px 4px rgba(0,0,0,0.15); cursor: zoom-in;" title="Bấm để phóng to">`;
                });
                htmlAnhBG += `</div>`;
            }

            let skCuaTiet = dsSuKien.filter(sk => sk.id_nhat_ky === nk.id);
            if (isTimHocSinh) skCuaTiet = skCuaTiet.filter(sk => mapHocSinh[sk.uid_hoc_sinh].ten.toLowerCase().includes(tenHsTimKiem));

            let vangMat = skCuaTiet.filter(sk => sk.loai_the === 'Vắng mặt');
            let suKienKhac = skCuaTiet.filter(sk => sk.loai_the !== 'Vắng mặt');

            let htmlSuKien = '';
            
            if (vangMat.length > 0) {
                let htmlVang = vangMat.map(v => {
                    let hsAvatar = mapHocSinh[v.uid_hoc_sinh]?.avatar;
                    return `<span style="display:inline-flex; align-items:center; gap:6px; background:#f8d7da; color:#721c24; padding:4px 8px; border-radius:20px; font-size:12px; font-weight:bold; border:1px solid #f5c6cb; box-shadow: 0 1px 2px rgba(0,0,0,0.05);"><img src="${hsAvatar}" style="width:20px; height:20px; border-radius:50%; object-fit: cover; border: 1px solid #fff;"> ${v.ten_hoc_sinh}</span>`;
                }).join(' ');
                
                htmlSuKien += `<div style="margin-bottom:12px;"><strong style="color: #dc3545; font-size: 13px; display:block; margin-bottom:5px;">❌ Vắng mặt:</strong> <div style="display:flex; flex-wrap:wrap; gap:8px;">${htmlVang}</div></div>`;
            }

            if (suKienKhac.length > 0) {
                htmlSuKien += `<strong style="color: #d35400; font-size: 13px; display:inline-block; margin-top:8px;">🎯 Sự kiện / Điểm:</strong><div style="margin-top: 5px;">`;
                suKienKhac.forEach(sk => {
                    let textGC = sk.ghi_chu ? ` - <i>${sk.ghi_chu}</i>` : '';
                    let mauThe = sk.thong_tin_mo_rong?.mau_sac || '#fd7e14';
                    let badgeDiem = (sk.loai_the === 'Cho điểm' && sk.thong_tin_mo_rong?.diem_so) ? `<span style="background:#28a745; color:white; padding:1px 5px; border-radius:3px; font-size:11px; margin-right:4px;">⭐ ${sk.thong_tin_mo_rong.diem_so}đ</span>` : '';

                    let dsMC = sk.thong_tin_mo_rong?.danh_sach_anh_minh_chung || [];
                    if (typeof dsMC === 'string') dsMC = dsMC.split(',').filter(l => l.trim());
                    let htmlMC = dsMC.length > 0 ? `<div style="display:flex; flex-direction:column; gap:10px; margin-top:8px;">${dsMC.map(l => `<img onclick="window.ham_20_36_xem_anh_toan_man_hinh('${l}')" src="${taoLinkAnhPreview(l)}" style="width: 100%; height: auto; max-height: 80vh; object-fit: contain; background: #fff; border-radius: 6px; border: 1px solid #ccc; box-shadow: 0 2px 4px rgba(0,0,0,0.1); cursor: zoom-in;" title="Bấm để phóng to">`).join('')}</div>` : '';

                    let hsAvatar = mapHocSinh[sk.uid_hoc_sinh]?.avatar;

                    htmlSuKien += `<div style="margin-bottom:8px; border-left:3px solid ${mauThe}; padding-left:10px; background:#fff; padding-top:8px; padding-bottom:8px; font-size:13px; box-shadow: 0 1px 2px rgba(0,0,0,0.05); border-radius: 0 6px 6px 0;">
                        <div style="display:flex; align-items:center; gap:8px;">
                            <img src="${hsAvatar}" style="width: 28px; height: 28px; border-radius: 50%; object-fit: cover; border: 1px solid #dee2e6;">
                            <div style="line-height: 1.4;"><b>${sk.ten_hoc_sinh}</b>: ${badgeDiem}<span style="color:${mauThe}; font-weight:bold;">[${sk.loai_the}]</span><span style="color:#555;">${textGC}</span></div>
                        </div>
                        ${htmlMC}
                    </div>`;
                });
                htmlSuKien += `</div>`;
            }
            if (skCuaTiet.length === 0) htmlSuKien = `<i style="color:#28a745; font-size:12px;">✅ Không có sự kiện nào.</i>`;

            htmlKhu3 += `
                <div id="card-tiet-${nk.id}" style="background: #fff; border: 1px solid #ced4da; border-radius: 8px; box-shadow: 0 3px 6px rgba(0,0,0,0.05); padding: 15px; margin-bottom: 20px;">
                    
                    <!-- 🌟 Header Khu 3: Có thêm nút Trở về đầu trang -->
                    <div style="border-bottom: 1px solid #eee; padding-bottom: 10px; margin-bottom: 10px; display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <span style="background: #17a2b8; color: white; padding: 4px 10px; border-radius: 4px; font-weight: bold; font-size: 13px;">${nk.phan_mon || 'Không rõ môn'}</span>
                            <span style="color: #6c757d; font-size: 13px; font-weight: bold;">🕒 ${hienThiTiet} - ${nk.buoi} - ${tenCacThu[new Date(nk.ngay_day).getDay()]}, Ngày ${strNgay}</span>
                        </div>
                        <div style="display: flex; gap: 5px;">
                            <button onclick="window.ham_20_39_sua_tiet_hoc_popup('${nk.id}')" style="background: #ffc107; color: #000; border: none; padding: 5px 12px; border-radius: 4px; font-size: 12px; cursor: pointer; font-weight: bold; box-shadow: 0 1px 2px rgba(0,0,0,0.1);">✏️ Sửa chi tiết</button>
                            <button onclick="window.ham_20_18_xoa_nguyen_tiet('${nk.id}')" style="background: #dc3545; color: white; border: none; padding: 5px 12px; border-radius: 4px; font-size: 12px; cursor: pointer; font-weight: bold; box-shadow: 0 1px 2px rgba(0,0,0,0.1);">🗑️ Xóa tiết này</button>
                            <button onclick="window.scrollTo({top: 0, behavior: 'smooth'});" style="background: #6c757d; color: white; border: none; padding: 5px 12px; border-radius: 4px; font-size: 12px; cursor: pointer; font-weight: bold; box-shadow: 0 1px 2px rgba(0,0,0,0.1);">⬆️ Lên đầu trang</button>
                        </div>
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

        vungKetQua.innerHTML = `
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
                                <th style="padding: 10px; border-bottom: 2px solid #0056b3; text-align:center;">Sự kiện</th>
                                <th style="padding: 10px; border-bottom: 2px solid #0056b3; text-align:center;">Ảnh MC</th>
                                <th style="padding: 10px; border-bottom: 2px solid #0056b3; text-align:center;">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>${rowsKhu1}</tbody>
                    </table>
                </div>
            </div>

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
                                <th style="padding: 10px; border-bottom: 2px solid #1e7e34; width: 160px;">📊 Đánh giá Nề nếp</th>
                                <th style="padding: 10px; border-bottom: 2px solid #1e7e34;">⏱️ Lịch sử Sự kiện (Bấm vào Thẻ để xem Chi tiết & Xóa)</th>
                            </tr>
                        </thead>
                        <tbody>${rowsKhu2}</tbody>
                    </table>
                </div>
            </div>

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

// // =======================================================
// // HÀM 20.18: XÓA TOÀN BỘ TIẾT HỌC (BAO GỒM CẢ SỰ KIỆN LIÊN QUAN)
// // =======================================================
// window.ham_20_18_xoa_nguyen_tiet = async function (idNhatKy) {
//     if (!confirm("⚠️ CẢNH BÁO: Thầy có chắc muốn xóa TOÀN BỘ tiết học này (gồm cả nội dung bài giảng, danh sách vắng và mọi sự kiện vi phạm của tiết)? Thao tác này không thể hoàn tác!")) return;

//     try {
//         // Supabase có ràng buộc khóa ngoại nên ta xóa bảng sự kiện trước, bảng nhật ký sau
//         await _supabase.from('nhat_ky_su_kien_hs').delete().eq('id_nhat_ky', idNhatKy);
//         const { error } = await _supabase.from('nhat_ky_day_hoc').delete().eq('id', idNhatKy);

//         if (error) throw error;

//         alert("🗑️ Đã xóa tiết học thành công!");
//         const btnLoc = document.querySelector('button[onclick*="ham_20_15_thuc_hien_tra_cuu"]');
//         if (btnLoc) btnLoc.click();
//     } catch (err) {
//         console.error("Lỗi xóa tiết học:", err);
//         alert("❌ Không thể xóa tiết học này!");
//     }
// };

// // =======================================================
// // HÀM 20.18: XÓA TOÀN BỘ TIẾT HỌC VÀ CÁC SỰ KIỆN LIÊN QUAN
// // =======================================================
// window.ham_20_18_xoa_nguyen_tiet = async function (idNhatKy) {
//     if (!confirm("⚠️ CẢNH BÁO: Thầy có chắc muốn xóa TOÀN BỘ tiết học này (gồm cả nội dung bài giảng, danh sách vắng và mọi sự kiện vi phạm của tiết)? Thao tác này không thể hoàn tác!")) return;

//     try {
//         // Xóa bảng sự kiện trước để không bị lỗi khóa ngoại (Foreign key constraint)
//         await _supabase.from('nhat_ky_su_kien_hs').delete().eq('id_nhat_ky', idNhatKy);
//         // Sau đó xóa nhật ký bài giảng
//         const { error } = await _supabase.from('nhat_ky_day_hoc').delete().eq('id', idNhatKy);

//         if (error) throw error;

//         alert("🗑️ Đã xóa nguyên tiết học thành công!");

//         // Load lại giao diện tra cứu tự động
//         const btnLoc = document.querySelector('button[onclick*="ham_20_15_thuc_hien_tra_cuu"]');
//         if (btnLoc) btnLoc.click();
//     } catch (err) {
//         console.error("Lỗi xóa tiết học:", err);
//         alert("❌ Không thể xóa tiết học này!");
//     }
// };


// =======================================================
// HÀM 20.18: XÓA TOÀN BỘ TIẾT HỌC VÀ SỰ KIỆN LIÊN QUAN
// =======================================================
window.ham_20_18_xoa_nguyen_tiet = async function (idNhatKy) {
    if (!confirm("⚠️ CẢNH BÁO: Thầy có chắc muốn xóa TOÀN BỘ tiết học này (gồm cả nội dung bài giảng, danh sách vắng và mọi sự kiện vi phạm của tiết)? Thao tác này không thể hoàn tác!")) return;

    try {
        await _supabase.from('nhat_ky_su_kien_hs').delete().eq('id_nhat_ky', idNhatKy);
        const { error } = await _supabase.from('nhat_ky_day_hoc').delete().eq('id', idNhatKy);

        if (error) throw error;

        alert("🗑️ Đã xóa nguyên tiết học thành công!");
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
// HÀM 20.22: XỬ LÝ ẢNH MINH CHỨNG (FIX GẮN ẢNH THEO LÔ / NHÓM HS)
// =======================================================
window.ham_20_22_kich_hoat_preview_anh_minh_chung = function () {
    const inputAnhMC = document.getElementById('nk-input-anh-minh-chung');
    if (inputAnhMC) {
        const new_input = inputAnhMC.cloneNode(true);
        inputAnhMC.parentNode.replaceChild(new_input, inputAnhMC);

        new_input.addEventListener('change', async function (e) {
            const files = Array.from(e.target.files);
            if (files.length === 0) return;

            let processedFiles = await window.ham_20_25_xu_ly_mang_anh_dau_vao(files);
            processedFiles = processedFiles.filter(f => f !== null);
            if (processedFiles.length === 0) return;

            let coHocSinhDuocChon = false;
            document.querySelectorAll('.nk-input-hs-su-kien').forEach(o => {
                if (o.value.trim() !== '') coHocSinhDuocChon = true;
            });

            // 🌟 LUỒNG THẦY LÀM NGƯỢC: CHIA ĐỀU ẢNH CHO CẢ NHÓM BẰNG BATCH_ID
            if (!coHocSinhDuocChon && window.danhSachSuKienTam && window.danhSachSuKienTam.length > 0) {
                let indexCuoi = window.danhSachSuKienTam.length - 1;
                let lastEvent = window.danhSachSuKienTam[indexCuoi];
                let currentBatchId = lastEvent.batch_id; // Lấy mã lô của sự kiện cuối cùng

                let dsHocSinhCungLo = [];

                // Lặp qua toàn bộ bảng chờ, ai chung mã lô thì bắn ảnh vào người đó
                window.danhSachSuKienTam.forEach(sk => {
                    if ((currentBatchId && sk.batch_id === currentBatchId) || (!currentBatchId && sk === lastEvent)) {
                        if (!sk.mang_file_minh_chung) sk.mang_file_minh_chung = [];
                        sk.mang_file_minh_chung.push(...processedFiles);
                        dsHocSinhCungLo.push(sk.ten_hoc_sinh);
                    }
                });

                // Thông báo popup thông minh
                if (dsHocSinhCungLo.length > 1) {
                    alert(`✅ Đã tự động đính kèm ảnh vào sự kiện [${lastEvent.loai_the}] cho nhóm ${dsHocSinhCungLo.length} học sinh:\n${dsHocSinhCungLo.join(', ')}`);
                } else {
                    alert(`✅ Đã tự động đính kèm ảnh vào sự kiện [${lastEvent.loai_the}] của học sinh ${lastEvent.ten_hoc_sinh}!`);
                }

                if (typeof window.ham_20_4_ve_danh_sach_cho === 'function') window.ham_20_4_ve_danh_sach_cho();
            }
            // 🌟 LUỒNG CHUẨN: LƯU TẠM VÀO KHUNG PREVIEW
            else {
                if (!window.danhSachAnhMinhChungTam) window.danhSachAnhMinhChungTam = [];
                window.danhSachAnhMinhChungTam.push(...processedFiles);
                if (typeof window.ham_20_22_render_anh_minh_chung === 'function') window.ham_20_22_render_anh_minh_chung();
            }

            e.target.value = '';
        });
    }
};










// =======================================================
// HÀM 20.22: RENDER ẢNH MINH CHỨNG (HIỂN THỊ 100% CHIỀU NGANG)
// =======================================================
window.ham_20_22_render_anh_minh_chung = function () {
    const vungHienThiMC = document.getElementById('vung-preview-anh-minh-chung');
    if (!vungHienThiMC) return;

    if (!window.danhSachAnhMinhChungTam || window.danhSachAnhMinhChungTam.length === 0) {
        vungHienThiMC.style.flexDirection = 'row'; // Trả lại giao diện ngang lúc trống
        vungHienThiMC.innerHTML = '<span id="text-cho-anh-mc">(Ảnh minh chứng xuất hiện tại đây...)</span>';
        return;
    }

    // 🌟 Ép khung chứa thành dạng Cột để ảnh giãn hết cỡ ngang
    vungHienThiMC.style.flexDirection = 'column';
    vungHienThiMC.style.overflowX = 'hidden';

    let html = '';
    window.danhSachAnhMinhChungTam.forEach((file, index) => {
        let url = URL.createObjectURL(file);
        let sizeKB = (file.size / 1024).toFixed(1);
        html += `
            <div style="position: relative; width: 100%; display: flex; flex-direction: column; align-items: center; animation: fadeIn 0.3s; background: #fff; padding: 10px; border-radius: 6px; box-sizing: border-box; border: 1px dashed #adb5bd; margin-bottom: 5px;">
                <!-- 🌟 width: 100%, height: auto để ảnh tự động zoom full chiều ngang -->
                <img src="${url}" style="width: 100%; height: auto; max-height: 80vh; object-fit: contain; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <span style="font-size: 11px; color: #666; font-weight: bold; margin-top: 5px;">${sizeKB} KB</span>
                <button type="button" onclick="ham_20_22_xoa_anh_tam(${index})" style="position: absolute; top: -8px; right: -8px; background: #dc3545; color: white; border: none; border-radius: 50%; width: 24px; height: 24px; font-size: 12px; font-weight: bold; cursor: pointer; display: flex; justify-content: center; align-items: center; box-shadow: 0 2px 5px rgba(0,0,0,0.3); z-index: 10;">×</button>
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
// HÀM 20.27: TỰ ĐỘNG TẢI NỘI DUNG & SỰ KIỆN TIẾT HỌC (BỔ SUNG AVATAR HỌC SINH ĐÃ LƯU)
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
        const { data, error } = await _supabase.from('nhat_ky_day_hoc').select('*').eq('ngay_day', ngayDay).eq('buoi', buoi).eq('tiet', tiet).eq('ma_lop', maLopLuu);
        if (error) throw error;

        if (data && data.length > 0) {
            const nk = data[0];

            if (nk.phan_mon) document.getElementById('nk-input-mon').value = nk.phan_mon;
            if (nk.ten_bai) document.getElementById('nk-input-ten-bai').value = nk.ten_bai;
            const cacTextArea = document.querySelectorAll('textarea');
            if (nk.ly_thuyet && cacTextArea[0]) cacTextArea[0].value = nk.ly_thuyet;
            if (nk.bai_tap && cacTextArea[1]) cacTextArea[1].value = nk.bai_tap;
            if (nk.dan_do && cacTextArea[2]) cacTextArea[2].value = nk.dan_do;

            let mangAnh = [];
            if (nk.danh_sach_anh) {
                if (Array.isArray(nk.danh_sach_anh)) mangAnh = nk.danh_sach_anh;
                else if (typeof nk.danh_sach_anh === 'string') {
                    try { mangAnh = JSON.parse(nk.danh_sach_anh); } catch (e) { mangAnh = nk.danh_sach_anh.split(',').filter(l => l.trim()); }
                }
            }

            // 🌟 ẢNH BÀI GIẢNG ĐÃ LƯU (Hiển thị 100% chiều ngang)
            if (mangAnh.length > 0 && vungAnhDaLuu) {
                let htmlAnh = '<div style="font-size:13px; font-weight:bold; color:#155724; margin-bottom:10px;">✅ Tiết này đã lưu nội dung và các ảnh sau:</div><div style="display:flex; flex-direction:column; gap:10px;">';
                mangAnh.forEach(link => {
                    let previewLink = link;
                    let matchD = link.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
                    if (matchD) previewLink = `https://lh3.googleusercontent.com/d/${matchD[1]}`;
                    htmlAnh += `<img onclick="window.ham_20_36_xem_anh_toan_man_hinh('${link}')" src="${previewLink}" style="width: 100%; height: auto; max-height: 80vh; object-fit: contain; background: #fff; border-radius: 6px; border: 2px solid #28a745; box-shadow: 0 2px 4px rgba(0,0,0,0.15); cursor: zoom-in;" title="Bấm để phóng to">`;
                });
                htmlAnh += '</div>';
                vungAnhDaLuu.innerHTML = htmlAnh;
                vungAnhDaLuu.style.display = 'block';
            } else if (vungAnhDaLuu) {
                vungAnhDaLuu.style.display = 'none';
                vungAnhDaLuu.innerHTML = '';
            }

            if (vungSuKienDaLuu) {
                const { data: dsSuKien, error: errSK } = await _supabase.from('nhat_ky_su_kien_hs').select('*').eq('id_nhat_ky', nk.id);

                if (!errSK && dsSuKien && dsSuKien.length > 0) {

                    // 🌟 TRUY VẤN LẤY AVATAR CỦA CÁC HỌC SINH CÓ SỰ KIỆN TRONG TIẾT NÀY
                    let mangUid = [...new Set(dsSuKien.map(sk => sk.uid_hoc_sinh))];
                    let tuDienAvatar = {};
                    if (mangUid.length > 0) {
                        const { data: hsData } = await _supabase.from('hoc_sinh').select('uid, anh_dai_dien').in('uid', mangUid);
                        if (hsData) hsData.forEach(h => tuDienAvatar[h.uid] = h.anh_dai_dien);
                    }

                    let htmlSK = '<div style="font-size:13px; font-weight:bold; color:#856404; margin-bottom:8px;">✅ Tiết này ĐÃ LƯU học sinh sau:</div><div style="display:flex; flex-direction:column; gap:8px;">';
                    let hsVang = dsSuKien.filter(sk => sk.loai_the === 'Vắng mặt');
                    let hsKhac = dsSuKien.filter(sk => sk.loai_the !== 'Vắng mặt');

                    // 1. HIỂN THỊ HỌC SINH VẮNG MẶT (CÓ AVATAR)
                    if (hsVang.length > 0) {
                        let htmlVang = hsVang.map(v => {
                            let hsAvatar = tuDienAvatar[v.uid_hoc_sinh] || `https://ui-avatars.com/api/?name=${encodeURIComponent(v.ten_hoc_sinh)}&background=random&color=fff&size=100`;
                            return `<span style="display:inline-flex; align-items:center; gap:6px; background:#f8d7da; color:#721c24; padding:4px 8px; border-radius:20px; font-size:12px; font-weight:bold; border:1px solid #f5c6cb; box-shadow: 0 1px 2px rgba(0,0,0,0.05);"><img src="${hsAvatar}" style="width:20px; height:20px; border-radius:50%; object-fit: cover; border: 1px solid #fff;"> ${v.ten_hoc_sinh}</span>`;
                        }).join(' ');

                        htmlSK += `<div style="margin-bottom:5px;"><strong style="color: #dc3545; font-size: 13px; display:block; margin-bottom:5px;">❌ Vắng mặt:</strong> <div style="display:flex; flex-wrap:wrap; gap:8px;">${htmlVang}</div></div>`;
                    }

                    // 2. HIỂN THỊ SỰ KIỆN / ĐIỂM SỐ (CÓ AVATAR)
                    if (hsKhac.length > 0) {
                        htmlSK += `<div style="font-size:13px; margin-top: 8px;"><b style="color:#d35400;">🎯 Sự kiện/Điểm:</b></div>`;
                        hsKhac.forEach(sk => {
                            let diemStr = (sk.thong_tin_mo_rong && sk.thong_tin_mo_rong.diem_so) ? ` <span style="background:#28a745; color:white; padding:1px 5px; border-radius:3px; font-size:11px; margin-right:4px;">⭐ ${sk.thong_tin_mo_rong.diem_so}đ</span>` : '';
                            let noteStr = sk.ghi_chu ? ` - <i style="color:#555;">${sk.ghi_chu}</i>` : '';

                            // ẢNH MINH CHỨNG
                            let anhMCStr = '';
                            if (sk.thong_tin_mo_rong && sk.thong_tin_mo_rong.danh_sach_anh_minh_chung && sk.thong_tin_mo_rong.danh_sach_anh_minh_chung.length > 0) {
                                anhMCStr += '<div style="display: flex; flex-direction: column; gap: 10px; margin-top: 8px;">';
                                sk.thong_tin_mo_rong.danh_sach_anh_minh_chung.forEach(link => {
                                    let previewLink = link;
                                    let matchD = link.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
                                    if (matchD) previewLink = `https://lh3.googleusercontent.com/d/${matchD[1]}`;
                                    anhMCStr += `<img onclick="window.ham_20_36_xem_anh_toan_man_hinh('${link}')" src="${previewLink}" style="width: 100%; height: auto; max-height: 80vh; object-fit: contain; background: #fff; border-radius: 6px; border: 1px solid #adb5bd; box-shadow: 0 2px 4px rgba(0,0,0,0.1); cursor: zoom-in;" title="Bấm để phóng to">`;
                                });
                                anhMCStr += '</div>';
                            }

                            let hsAvatar = tuDienAvatar[sk.uid_hoc_sinh] || `https://ui-avatars.com/api/?name=${encodeURIComponent(sk.ten_hoc_sinh)}&background=random&color=fff&size=100`;
                            let mauThe = sk.thong_tin_mo_rong?.mau_sac || '#000';

                            htmlSK += `
                                <div style="margin-bottom: 5px; border-left: 3px solid ${mauThe}; padding-left: 10px; background:#fff; padding-top:8px; padding-bottom:8px; font-size:13px; box-shadow: 0 1px 2px rgba(0,0,0,0.05); border-radius: 0 6px 6px 0;">
                                    <div style="display:flex; align-items:center; gap:8px;">
                                        <img src="${hsAvatar}" style="width: 28px; height: 28px; border-radius: 50%; object-fit: cover; border: 1px solid #dee2e6;">
                                        <div style="line-height: 1.4;"><b>${sk.ten_hoc_sinh}</b>: ${diemStr}<span style="color:${mauThe}; font-weight:bold;">[${sk.loai_the}]</span><span style="color:#555;">${noteStr}</span></div>
                                    </div>
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


// =======================================================
// HÀM 20.36: POPUP PHÓNG TO ẢNH TRÀN MÀN HÌNH (LIGHTBOX)
// =======================================================
window.ham_20_36_xem_anh_toan_man_hinh = function (linkGoc) {
    if (!linkGoc) return;

    // Tự động bóc tách link Google Drive để hiển thị trực tiếp
    let fileId = '';
    let matchD = linkGoc.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    let matchId = linkGoc.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    let matchOpen = linkGoc.match(/\/open\?id=([a-zA-Z0-9_-]+)/);
    if (matchD) fileId = matchD[1]; else if (matchId) fileId = matchId[1]; else if (matchOpen) fileId = matchOpen[1];

    let srcAnh = fileId ? `https://lh3.googleusercontent.com/d/${fileId}` : linkGoc;

    let modal = document.createElement('div');
    modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.9); z-index:999999; display:flex; justify-content:center; align-items:center; cursor:zoom-out; animation: fadeIn 0.2s;';

    // Click vào bất kỳ đâu để đóng
    modal.onclick = () => document.body.removeChild(modal);

    let img = document.createElement('img');
    img.src = srcAnh;
    img.style.cssText = 'max-width:95vw; max-height:95vh; object-fit:contain; border-radius:8px; box-shadow:0 0 20px rgba(0,0,0,0.5); background:#fff;';

    let closeBtn = document.createElement('div');
    closeBtn.innerHTML = '❌ Đóng';
    closeBtn.style.cssText = 'position:absolute; top:20px; right:20px; font-size:14px; font-weight:bold; color:white; cursor:pointer; background:#dc3545; padding:8px 15px; border-radius:6px; box-shadow:0 2px 5px rgba(0,0,0,0.3); transition:0.2s;';

    modal.appendChild(img);
    modal.appendChild(closeBtn);
    document.body.appendChild(modal);
};




// =====================================================================
// HÀM 20.37: TÌM VÀ HIỂN THỊ BÀI HỌC CŨ CỦA LỚP (BỔ SUNG AVATAR HỌC SINH)
// =====================================================================
window.ham_20_37_xem_bai_cu_lop_nay = async function (offset = 0) {
    let rawLop = document.getElementById('nk-input-lop').value.trim();
    let maLopLuu = rawLop.match(/\(([^)]+)\)$/) ? rawLop.match(/\(([^)]+)\)$/)[1].trim() : rawLop;
    let phanMon = document.getElementById('nk-input-mon').value.trim();

    if (!maLopLuu) {
        alert("⚠️ Thầy chưa chọn Lớp. Vui lòng chọn lớp để hệ thống tìm lại bài dạy trước đó!");
        return;
    }

    let modal = document.getElementById('modal-xem-bai-cu');
    if (modal) document.body.removeChild(modal);

    modal = document.createElement('div');
    modal.id = 'modal-xem-bai-cu';
    modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); z-index:99999; display:flex; justify-content:center; align-items:center; padding:20px; animation: fadeIn 0.2s; box-sizing: border-box;';
    modal.innerHTML = `<div style="background:#fff; padding:30px; border-radius:8px; text-align:center; font-weight:bold; color:#6f42c1; box-shadow: 0 5px 15px rgba(0,0,0,0.3);">⏳ Đang lục tìm hồ sơ tiết học cũ...</div>`;
    document.body.appendChild(modal);

    try {
        // 1. TRUY VẤN LẤY TIẾT HỌC BẰNG OFFSET (0 = Mới nhất, 1 = Trước đó, 2 = Trước nữa...)
        let query = _supabase.from('nhat_ky_day_hoc').select('*')
            .eq('ma_lop', maLopLuu)
            .order('ngay_day', { ascending: false })
            .order('id', { ascending: false })
            .range(offset, offset);

        if (phanMon) query = query.ilike('phan_mon', `%${phanMon}%`);

        const { data, error } = await query;
        if (error) throw error;

        let baiCu = (data && data.length > 0) ? data[0] : null;

        if (!baiCu) {
            if (offset > 0) {
                alert("⚠️ Đã đến tiết học cũ nhất của lớp này, không còn tiết nào cũ hơn nữa!");
                window.ham_20_37_xem_bai_cu_lop_nay(offset - 1);
                return;
            }

            let strMon = phanMon ? `<br>(Phân môn: ${phanMon})` : '';
            modal.innerHTML = `
                <div style="background:#fff; width:100%; max-width:450px; padding:30px; border-radius:8px; box-shadow:0 10px 25px rgba(0,0,0,0.3); text-align:center;">
                    <h3 style="color:#dc3545; margin-top:0;">Trống Dữ Liệu!</h3>
                    <p style="color:#555; line-height: 1.5;">Hệ thống không tìm thấy bài dạy nào của lớp <b>${rawLop}</b> ${strMon}.<br>Đây có thể là tiết đầu tiên thầy dạy lớp này!</p>
                    <button onclick="document.body.removeChild(document.getElementById('modal-xem-bai-cu'))" style="margin-top:20px; padding:10px 30px; background:#6c757d; color:white; border:none; border-radius:4px; cursor:pointer; font-weight:bold; transition: 0.2s;" onmouseover="this.style.background='#5a6268'" onmouseout="this.style.background='#6c757d'">Đã hiểu & Đóng</button>
                </div>
            `;
            return;
        }

        // 2. TRUY VẤN LẤY SỰ KIỆN CỦA TIẾT ĐÓ
        const { data: dsSuKien, error: errSK } = await _supabase.from('nhat_ky_su_kien_hs').select('*').eq('id_nhat_ky', baiCu.id);
        if (errSK) throw errSK;

        // 3. XỬ LÝ ẢNH BÀI GIẢNG
        let mangAnhBG = [];
        if (Array.isArray(baiCu.danh_sach_anh)) mangAnhBG = baiCu.danh_sach_anh;
        else if (typeof baiCu.danh_sach_anh === 'string' && baiCu.danh_sach_anh.length > 5) {
            try { mangAnhBG = JSON.parse(baiCu.danh_sach_anh); } catch (e) { mangAnhBG = baiCu.danh_sach_anh.split(',').filter(l => l.trim()); }
        }

        let htmlAnhBG = '';
        if (mangAnhBG.length > 0) {
            htmlAnhBG = `<div style="display: flex; flex-direction: column; gap: 10px; margin-top: 10px; padding: 10px; background: #e0f7fa; border-radius: 6px;">`;
            mangAnhBG.forEach((link) => {
                let previewLink = link;
                let matchD = link.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
                if (matchD) previewLink = `https://lh3.googleusercontent.com/d/${matchD[1]}`;
                htmlAnhBG += `<img onclick="window.ham_20_36_xem_anh_toan_man_hinh('${link}')" src="${previewLink}" loading="lazy" style="width: 100%; height: auto; max-height: 50vh; object-fit: contain; background: #fff; border-radius: 6px; border: 2px solid #00acc1; box-shadow: 0 2px 4px rgba(0,0,0,0.15); cursor: zoom-in;" title="Bấm để phóng to">`;
            });
            htmlAnhBG += `</div>`;
        }

        // 🌟 4. XỬ LÝ SỰ KIỆN HỌC SINH VÀ LẤY AVATAR
        let htmlSuKien = '';
        if (dsSuKien && dsSuKien.length > 0) {

            // TRUY VẤN LẤY AVATAR TỪ BẢNG HỌC SINH
            let mangUid = [...new Set(dsSuKien.map(sk => sk.uid_hoc_sinh))];
            let tuDienAvatar = {};
            if (mangUid.length > 0) {
                const { data: hsData } = await _supabase.from('hoc_sinh').select('uid, anh_dai_dien').in('uid', mangUid);
                if (hsData) hsData.forEach(h => tuDienAvatar[h.uid] = h.anh_dai_dien);
            }

            let vangMat = dsSuKien.filter(sk => sk.loai_the === 'Vắng mặt');
            let suKienKhac = dsSuKien.filter(sk => sk.loai_the !== 'Vắng mặt');

            if (vangMat.length > 0) {
                let htmlVang = vangMat.map(v => {
                    let hsAvatar = tuDienAvatar[v.uid_hoc_sinh] || `https://ui-avatars.com/api/?name=${encodeURIComponent(v.ten_hoc_sinh)}&background=random&color=fff&size=100`;
                    return `<span style="display:inline-flex; align-items:center; gap:6px; background:#f8d7da; color:#721c24; padding:4px 8px; border-radius:20px; font-size:12px; font-weight:bold; border:1px solid #f5c6cb; box-shadow: 0 1px 2px rgba(0,0,0,0.05);"><img src="${hsAvatar}" style="width:20px; height:20px; border-radius:50%; object-fit: cover; border: 1px solid #fff;"> ${v.ten_hoc_sinh}</span>`;
                }).join(' ');

                htmlSuKien += `<div style="margin-bottom:12px;"><strong style="color: #dc3545; font-size: 13px; display:block; margin-bottom:5px;">❌ Vắng mặt:</strong> <div style="display:flex; flex-wrap:wrap; gap:8px;">${htmlVang}</div></div>`;
            }

            if (suKienKhac.length > 0) {
                htmlSuKien += `<strong style="color: #d35400; font-size: 13px; display:inline-block; margin-top:8px;">🎯 Sự kiện / Điểm:</strong><div style="margin-top: 5px;">`;
                suKienKhac.forEach(sk => {
                    let textGC = sk.ghi_chu ? ` - <i>${sk.ghi_chu}</i>` : '';
                    let mauThe = sk.thong_tin_mo_rong?.mau_sac || '#fd7e14';
                    let badgeDiem = (sk.loai_the === 'Cho điểm' && sk.thong_tin_mo_rong?.diem_so) ? `<span style="background:#28a745; color:white; padding:1px 5px; border-radius:3px; font-size:11px; margin-right:4px;">⭐ ${sk.thong_tin_mo_rong.diem_so}đ</span>` : '';

                    let dsMC = sk.thong_tin_mo_rong?.danh_sach_anh_minh_chung || [];
                    if (typeof dsMC === 'string') dsMC = dsMC.split(',').filter(l => l.trim());
                    let htmlMC = '';
                    if (dsMC.length > 0) {
                        htmlMC = `<div style="display:flex; flex-direction:column; gap:10px; margin-top:8px;">`;
                        dsMC.forEach(l => {
                            let pLink = l;
                            let mD = l.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
                            if (mD) pLink = `https://lh3.googleusercontent.com/d/${mD[1]}`;
                            htmlMC += `<img onclick="window.ham_20_36_xem_anh_toan_man_hinh('${l}')" src="${pLink}" style="width: 100%; height: auto; max-height: 40vh; object-fit: contain; background: #fff; border-radius: 6px; border: 1px solid #ccc; box-shadow: 0 2px 4px rgba(0,0,0,0.1); cursor: zoom-in;" title="Bấm để phóng to">`;
                        });
                        htmlMC += `</div>`;
                    }

                    let hsAvatar = tuDienAvatar[sk.uid_hoc_sinh] || `https://ui-avatars.com/api/?name=${encodeURIComponent(sk.ten_hoc_sinh)}&background=random&color=fff&size=100`;

                    htmlSuKien += `<div style="margin-bottom:8px; border-left:3px solid ${mauThe}; padding-left:10px; background:#fff; padding-top:8px; padding-bottom:8px; font-size:13px; box-shadow: 0 1px 2px rgba(0,0,0,0.05); border-radius: 0 6px 6px 0;">
                        <div style="display:flex; align-items:center; gap:8px;">
                            <img src="${hsAvatar}" style="width: 28px; height: 28px; border-radius: 50%; object-fit: cover; border: 1px solid #dee2e6;">
                            <div style="line-height: 1.4;"><b>${sk.ten_hoc_sinh}</b>: ${badgeDiem}<span style="color:${mauThe}; font-weight:bold;">[${sk.loai_the}]</span><span style="color:#555;">${textGC}</span></div>
                        </div>
                        ${htmlMC}
                    </div>`;
                });
                htmlSuKien += `</div>`;
            }
        } else {
            htmlSuKien = `<i style="color:#28a745; font-size:12px;">✅ Tiết trước lớp ngoan, không có sự kiện.</i>`;
        }

        // 5. THIẾT LẬP THÔNG TIN CƠ BẢN
        let dateObj = new Date(baiCu.ngay_day);
        let strNgay = String(dateObj.getDate()).padStart(2, '0') + '/' + String(dateObj.getMonth() + 1).padStart(2, '0') + '/' + dateObj.getFullYear();
        const tenCacThu = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
        let thuHienTai = tenCacThu[dateObj.getDay()];
        let theTrangThai = offset > 0 ? `<span style="background:#dc3545; color:#fff; padding:2px 8px; border-radius:4px; font-size:12px;">Lịch sử cách đây ${offset} tiết</span>` : `<span style="background:#28a745; color:#fff; padding:2px 8px; border-radius:4px; font-size:12px;">Tiết mới nhất</span>`;

        // 6. VẼ GIAO DIỆN HIỂN THỊ
        modal.innerHTML = `
            <div style="background:#fff; width:100%; max-width:850px; max-height:90vh; padding:20px; border-radius:8px; box-shadow:0 10px 30px rgba(0,0,0,0.4); display:flex; flex-direction:column; gap:15px; position:relative;">
                
                <h3 style="margin:0; color:#6f42c1; border-bottom:2px solid #eee; padding-bottom:10px; display:flex; justify-content:space-between; align-items:center; gap:8px; flex-shrink:0;">
                    <span><span style="font-size:20px;">⏮️</span> NHẮC LẠI BÀI DẠY TRƯỚC ĐÓ</span>
                    ${theTrangThai}
                </h3>
                
                <div style="display:flex; flex-wrap:wrap; gap:10px; font-size:13px; color:#333; flex-shrink:0;">
                    <span style="background:#e0e0e0; padding:6px 12px; border-radius:20px; font-weight:bold;">🏫 Lớp: <span style="color:#0056b3;">${rawLop}</span></span>
                    <span style="background:#e0e0e0; padding:6px 12px; border-radius:20px; font-weight:bold;">🕒 ${thuHienTai}, ${strNgay} (Tiết ${baiCu.tiet} - ${baiCu.buoi})</span>
                    <span style="background:#e0e0e0; padding:6px 12px; border-radius:20px; font-weight:bold;">📚 Môn: <span style="color:#d35400;">${baiCu.phan_mon || 'Không rõ'}</span></span>
                </div>

                <div style="display: flex; flex-wrap: wrap; gap: 20px; overflow-y: auto; padding-right: 5px; flex: 1;">
                    
                    <div style="flex: 1.5; min-width: 300px; display: flex; flex-direction: column; gap: 10px;">
                        <div style="background:#f8f9fa; border:1px solid #ced4da; border-radius:6px; padding:15px; font-size:14px; display:flex; flex-direction:column; gap:10px;">
                            <div><b style="color:#0056b3;">📖 Tên bài:</b> <span style="font-weight:bold; color:#333;">${baiCu.ten_bai || '<i style="color:#999; font-weight:normal;">Chưa nhập tên bài</i>'}</span></div>
                            <div><b style="color:#495057;">Lý thuyết:</b> <span style="white-space:pre-wrap; color:#333;">${baiCu.ly_thuyet || '<i style="color:#999;">Không có</i>'}</span></div>
                            <div><b style="color:#495057;">Bài tập:</b> <span style="white-space:pre-wrap; color:#333;">${baiCu.bai_tap || '<i style="color:#999;">Không có</i>'}</span></div>
                            <div style="color:#856404; background:#fffcf8; padding:10px; border-radius:4px; border-left:4px solid #ffc107; margin-top:5px; box-shadow:0 1px 2px rgba(0,0,0,0.05);">
                                <b style="font-size:13px; text-transform:uppercase;">📌 Dặn dò / BTVN:</b><br>
                                <span style="white-space:pre-wrap; font-weight:bold; font-size:14px;">${baiCu.dan_do || '<i style="color:#ccc; font-weight:normal;">Không có dặn dò!</i>'}</span>
                            </div>
                        </div>
                        ${htmlAnhBG}
                    </div>

                    <div style="flex: 1; min-width: 250px; background: #fafafa; padding: 15px; border-radius: 6px; border: 1px solid #eee;">
                        ${htmlSuKien}
                    </div>
                </div>

                <!-- 🌟 NÚT ĐIỀU HƯỚNG VÀ THAO TÁC -->
                <div style="display:flex; justify-content:space-between; margin-top:5px; border-top:1px solid #eee; padding-top:15px; flex-wrap:wrap; gap:10px; flex-shrink:0;">
                    
                    <div style="display:flex; gap:10px;">
                        <button onclick="window.ham_20_37_xem_bai_cu_lop_nay(${offset + 1})" style="padding:10px 15px; background:#17a2b8; color:white; border:none; border-radius:4px; cursor:pointer; font-weight:bold; box-shadow:0 2px 4px rgba(0,0,0,0.15); transition:0.2s; display:flex; align-items:center;" onmouseover="this.style.background='#138496'" onmouseout="this.style.background='#17a2b8'" title="Quay lại tiết cũ hơn nữa">
                            ⏪ Tiết trước nữa
                        </button>
                        
                        ${offset > 0 ? `
                        <button onclick="window.ham_20_37_xem_bai_cu_lop_nay(${offset - 1})" style="padding:10px 15px; background:#17a2b8; color:white; border:none; border-radius:4px; cursor:pointer; font-weight:bold; box-shadow:0 2px 4px rgba(0,0,0,0.15); transition:0.2s; display:flex; align-items:center;" onmouseover="this.style.background='#138496'" onmouseout="this.style.background='#17a2b8'" title="Tiến lên tiết mới hơn">
                            Tiết liền sau ⏩
                        </button>` : ''}
                    </div>

                    <div style="display:flex; gap:10px;">
                        <button onclick="document.body.removeChild(document.getElementById('modal-xem-bai-cu'))" style="padding:10px 30px; background:#6c757d; color:white; border:none; border-radius:4px; cursor:pointer; font-weight:bold; box-shadow:0 2px 4px rgba(0,0,0,0.15); transition:0.2s;" onmouseover="this.style.background='#5a6268'" onmouseout="this.style.background='#6c757d'">
                            ❌ Đóng
                        </button>
                    </div>
                </div>
            </div>
        `;

        modal.onclick = (e) => { if (e.target === modal) document.body.removeChild(modal); };

    } catch (err) {
        console.error("Lỗi lấy bài cũ:", err);
        modal.innerHTML = `
            <div style="background:#fff; padding:25px; border-radius:8px; color:#dc3545; text-align:center; box-shadow:0 5px 15px rgba(0,0,0,0.2);">
                <b>❌ Lỗi truy xuất dữ liệu Database!</b><br><span style="font-size:12px; color:#666;">Vui lòng kiểm tra lại kết nối mạng.</span><br><br>
                <button onclick="document.body.removeChild(document.getElementById('modal-xem-bai-cu'))" style="padding:8px 25px; background:#6c757d; color:#fff; border:none; border-radius:4px; cursor:pointer;">Đóng</button>
            </div>
        `;
    }
};



// =======================================================
// HÀM 20.38: TẠO CUSTOM DROPDOWN HIỂN THỊ AVATAR HỌC SINH
// =======================================================
window.ham_20_38_hien_thi_dropdown_hs = function(inputElement) {
    // Đóng ngay các dropdown đang mở để tránh trùng lặp
    document.querySelectorAll('.custom-dropdown-hs').forEach(el => el.remove());

    if (!window.DanhSachHocSinhLopHienTai || window.DanhSachHocSinhLopHienTai.length === 0) return;

    let tuKhoa = inputElement.value.toLowerCase().trim();
    
    // Lọc danh sách theo từ khóa thầy đang gõ
    let dsLoc = window.DanhSachHocSinhLopHienTai.filter(hs => 
        hs.tenHienThi.toLowerCase().includes(tuKhoa) || 
        hs.tenDangNhap.toLowerCase().includes(tuKhoa)
    );

    if (dsLoc.length === 0) return;

    let parent = inputElement.parentElement;
    parent.style.position = 'relative'; // Bắt buộc để Dropdown neo vị trí chính xác

    // Khởi tạo khung nổi
    let dropdown = document.createElement('div');
    dropdown.className = 'custom-dropdown-hs';
    
    dropdown.style.cssText = `
        position: absolute;
        top: calc(100% + 4px);
        left: 0;
        width: 100%;
        max-height: 250px;
        overflow-y: auto;
        background: #fff;
        border: 1px solid #1a73e8;
        border-radius: 8px;
        box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        z-index: 999999;
        display: flex;
        flex-direction: column;
        animation: fadeIn 0.2s ease-in-out;
    `;

    // Vẽ từng dòng học sinh
    dsLoc.forEach(hs => {
        let item = document.createElement('div');
        item.style.cssText = `
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 10px 12px;
            cursor: pointer;
            border-bottom: 1px solid #f1f3f4;
            transition: background 0.2s;
        `;
        
        // Hiệu ứng Hover mượt mà
        item.onmouseover = () => item.style.background = '#e8f0fe';
        item.onmouseout = () => item.style.background = '#fff';
        
        item.innerHTML = `
            <img src="${hs.avatarUrl}" style="width: 36px; height: 36px; border-radius: 50%; object-fit: cover; border: 1px solid #dee2e6; box-shadow: 0 1px 2px rgba(0,0,0,0.1);">
            <div style="flex: 1;">
                <div style="font-weight: bold; color: #1a73e8; font-size: 14px;">${hs.tenHienThi}</div>
                <div style="font-size: 11px; color: #6c757d;">Tài khoản: ${hs.tenDangNhap}</div>
            </div>
        `;

        // Khi click chọn -> Điền văn bản vào ô input và Tự hủy Dropdown
        item.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            inputElement.value = hs.chuoiGhep;
            dropdown.remove();
        };

        dropdown.appendChild(item);
    });

    parent.appendChild(dropdown);

    // Thuật toán: Bấm ra ngoài khoảng không thì tự tắt Dropdown
    const closeDropdown = function(e) {
        if (e.target !== inputElement && !dropdown.contains(e.target)) {
            dropdown.remove();
            document.removeEventListener('click', closeDropdown);
        }
    };
    
    setTimeout(() => document.addEventListener('click', closeDropdown), 10);
};



// // =======================================================
// // HÀM 20.39: POPUP CẬP NHẬT TRỰC TIẾP NỘI DUNG TIẾT HỌC
// // =======================================================
// window.ham_20_39_sua_tiet_hoc_popup = async function (idNhatKy) {
//     let modal = document.createElement('div');
//     modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); z-index:99999; display:flex; justify-content:center; align-items:center; padding:15px; animation: fadeIn 0.2s; box-sizing: border-box;';

//     modal.innerHTML = `<div style="background:#fff; padding:20px; border-radius:8px; font-weight:bold; color:#007bff; text-align:center;">⏳ Đang tải dữ liệu tiết học...</div>`;
//     document.body.appendChild(modal);

//     try {
//         // Lấy thông tin tiết học hiện tại
//         const { data, error } = await _supabase.from('nhat_ky_day_hoc').select('ten_bai, ly_thuyet, bai_tap, dan_do').eq('id', idNhatKy).single();
//         if (error || !data) throw error || new Error('Không có dữ liệu');

//         modal.innerHTML = `
//             <div style="background:#fff; width:100%; max-width:600px; max-height:90vh; border-radius:8px; display:flex; flex-direction:column; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,0.5);">
//                 <div style="background:#ffc107; color:#000; padding:15px 20px; display:flex; justify-content:space-between; align-items:center;">
//                     <h3 style="margin:0; font-size:16px;">✏️ CẬP NHẬT NỘI DUNG TIẾT HỌC</h3>
//                 </div>
//                 <div style="padding: 20px; overflow-y:auto; display:flex; flex-direction:column; gap:15px; font-size: 14px;">
//                     <div>
//                         <label style="font-weight:bold; color:#495057; display:block; margin-bottom:5px;">📖 Tên bài:</label>
//                         <input type="text" id="edit-tenbai" value="${(data.ten_bai || '').replace(/"/g, '&quot;')}" style="width:100%; padding:10px; border:1px solid #ced4da; border-radius:4px; box-sizing:border-box; outline:none; font-weight:bold; color:#0056b3;">
//                     </div>
//                     <div>
//                         <label style="font-weight:bold; color:#495057; display:block; margin-bottom:5px;">Lý thuyết:</label>
//                         <textarea id="edit-lythuyet" style="width:100%; padding:10px; border:1px solid #ced4da; border-radius:4px; box-sizing:border-box; min-height:80px; resize:vertical; font-family:inherit; outline:none;">${data.ly_thuyet || ''}</textarea>
//                     </div>
//                     <div>
//                         <label style="font-weight:bold; color:#495057; display:block; margin-bottom:5px;">Bài tập:</label>
//                         <textarea id="edit-baitap" style="width:100%; padding:10px; border:1px solid #ced4da; border-radius:4px; box-sizing:border-box; min-height:80px; resize:vertical; font-family:inherit; outline:none;">${data.bai_tap || ''}</textarea>
//                     </div>
//                     <div>
//                         <label style="font-weight:bold; color:#856404; display:block; margin-bottom:5px;">📌 Dặn dò:</label>
//                         <textarea id="edit-dando" style="width:100%; padding:10px; border:1px solid #f5c6cb; border-radius:4px; box-sizing:border-box; min-height:80px; resize:vertical; background:#fffcf8; color:#856404; font-family:inherit; outline:none; font-weight:bold;">${data.dan_do || ''}</textarea>
//                     </div>
//                 </div>
//                 <div style="padding:15px 20px; background:#f8f9fa; border-top:1px solid #dee2e6; display:flex; justify-content:flex-end; gap:10px;">
//                     <button id="btn-huy-edit-tiet" style="padding:10px 20px; background:#6c757d; color:white; border:none; border-radius:4px; cursor:pointer; font-weight:bold;">❌ Hủy</button>
//                     <button id="btn-luu-edit-tiet" style="padding:10px 20px; background:#28a745; color:white; border:none; border-radius:4px; cursor:pointer; font-weight:bold;">💾 Lưu thay đổi</button>
//                 </div>
//             </div>
//         `;

//         document.getElementById('btn-huy-edit-tiet').onclick = () => document.body.removeChild(modal);

//         document.getElementById('btn-luu-edit-tiet').onclick = async function () {
//             let btn = this;
//             btn.innerHTML = '⏳ Đang lưu...';
//             btn.disabled = true;

//             let payload = {
//                 ten_bai: document.getElementById('edit-tenbai').value.trim(),
//                 ly_thuyet: document.getElementById('edit-lythuyet').value.trim(),
//                 bai_tap: document.getElementById('edit-baitap').value.trim(),
//                 dan_do: document.getElementById('edit-dando').value.trim()
//             };

//             const { error: errUp } = await _supabase.from('nhat_ky_day_hoc').update(payload).eq('id', idNhatKy);

//             if (errUp) {
//                 alert('❌ Lỗi cập nhật: ' + errUp.message);
//                 btn.innerHTML = '💾 Lưu thay đổi';
//                 btn.disabled = false;
//             } else {
//                 document.body.removeChild(modal);
//                 alert('✅ Đã cập nhật thành công!');

//                 // Refresh lại trang dữ liệu
//                 const btnLoc = document.querySelector('button[onclick*="ham_20_15_thuc_hien_tra_cuu"]');
//                 if (btnLoc) btnLoc.click();
//             }
//         };

//     } catch (e) {
//         modal.innerHTML = `<div style="background:#fff; padding:20px; border-radius:8px; font-weight:bold; color:red; text-align:center;">❌ Lỗi: ${e.message}<br><button onclick="document.body.removeChild(this.closest('div[style*=\\'position:fixed\\']'))" style="margin-top:15px; padding:5px 15px; cursor:pointer;">Đóng</button></div>`;
//     }
// };


// =======================================================
// HÀM 20.39: POPUP SỬA CHI TIẾT TẤT CẢ THÔNG TIN TIẾT HỌC (ĐÃ MỞ RỘNG TÍNH NĂNG XÓA ẢNH/SỰ KIỆN TRỰC TIẾP)
// =======================================================
window.ham_20_39_sua_tiet_hoc_popup = async function (idNhatKy) {
    // Lưu lại Text đang sửa dở (nếu có) trước khi tải lại Modal để không làm mất công gõ của thầy
    let tempTenBai = document.getElementById('edit-tenbai') ? document.getElementById('edit-tenbai').value : null;
    let tempLyThuyet = document.getElementById('edit-lythuyet') ? document.getElementById('edit-lythuyet').value : null;
    let tempBaiTap = document.getElementById('edit-baitap') ? document.getElementById('edit-baitap').value : null;
    let tempDanDo = document.getElementById('edit-dando') ? document.getElementById('edit-dando').value : null;

    let modalId = 'modal-edit-tiet-' + idNhatKy;
    let modal = document.getElementById(modalId);
    if (!modal) {
        modal = document.createElement('div');
        modal.id = modalId;
        modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); z-index:99999; display:flex; justify-content:center; align-items:center; padding:15px; animation: fadeIn 0.2s; box-sizing: border-box;';
        document.body.appendChild(modal);
    }

    modal.innerHTML = `<div style="background:#fff; padding:20px; border-radius:8px; font-weight:bold; color:#007bff; text-align:center;">⏳ Đang tải dữ liệu tiết học...</div>`;

    try {
        const taoLinkAnhPreview = (url) => {
            if (!url) return '';
            let fileId = '';
            let matchD = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
            if (matchD) fileId = matchD[1];
            return fileId ? `https://lh3.googleusercontent.com/d/${fileId}` : url;
        };

        // Lấy dữ liệu tiết học
        const { data: nk, error: errNk } = await _supabase.from('nhat_ky_day_hoc').select('*').eq('id', idNhatKy).single();
        if (errNk || !nk) throw errNk || new Error('Không tìm thấy tiết học');

        // Lấy sự kiện
        const { data: dsSuKien, error: errSK } = await _supabase.from('nhat_ky_su_kien_hs').select('*').eq('id_nhat_ky', idNhatKy);
        if (errSK) throw errSK;

        // Lấy Avatar học sinh
        let mangUid = [...new Set((dsSuKien || []).map(sk => sk.uid_hoc_sinh))];
        let tuDienAvatar = {};
        if (mangUid.length > 0) {
            const { data: hsData } = await _supabase.from('hoc_sinh').select('uid, anh_dai_dien').in('uid', mangUid);
            if (hsData) hsData.forEach(h => tuDienAvatar[h.uid] = h.anh_dai_dien);
        }

        // --- CỘT TRÁI: ẢNH BÀI GIẢNG ---
        let mangAnhBG = [];
        if (Array.isArray(nk.danh_sach_anh)) mangAnhBG = nk.danh_sach_anh;
        else if (typeof nk.danh_sach_anh === 'string' && nk.danh_sach_anh.length > 5) {
            try { mangAnhBG = JSON.parse(nk.danh_sach_anh); } catch (e) { mangAnhBG = nk.danh_sach_anh.split(',').filter(l => l.trim()); }
        }

        let htmlAnhBG = '';
        if (mangAnhBG.length > 0) {
            htmlAnhBG = `<div style="display: flex; flex-direction: column; gap: 10px; margin-top: 10px; padding: 15px; background: #e0f7fa; border-radius: 6px; border: 1px dashed #00acc1;">`;
            mangAnhBG.forEach((link, idx) => {
                htmlAnhBG += `
                <div style="position: relative; display: inline-block;">
                    <img src="${taoLinkAnhPreview(link)}" style="width: 100%; height: auto; max-height: 40vh; object-fit: contain; background: #fff; border-radius: 6px; border: 2px solid #00acc1;">
                    <button type="button" onclick="window.ham_20_39a_xoa_anh_bg('${nk.id}', ${idx})" style="position: absolute; top: -10px; right: -10px; background: #dc3545; color: white; border: 2px solid #fff; border-radius: 50%; width: 28px; height: 28px; font-size: 14px; font-weight: bold; cursor: pointer; box-shadow: 0 2px 5px rgba(0,0,0,0.3); z-index: 10; display:flex; align-items:center; justify-content:center;" title="Xóa ảnh bảng này">✖</button>
                </div>`;
            });
            htmlAnhBG += `</div>`;
        }

        // --- CỘT PHẢI: SỰ KIỆN & VẮNG MẶT ---
        let vangMat = (dsSuKien || []).filter(sk => sk.loai_the === 'Vắng mặt');
        let suKienKhac = (dsSuKien || []).filter(sk => sk.loai_the !== 'Vắng mặt');
        let htmlSuKien = '';

        if (vangMat.length > 0) {
            let htmlVang = vangMat.map(v => {
                let hsAvatar = tuDienAvatar[v.uid_hoc_sinh] || `https://ui-avatars.com/api/?name=${encodeURIComponent(v.ten_hoc_sinh)}&background=random&color=fff&size=100`;
                return `
                <div style="display:inline-flex; align-items:center; gap:6px; background:#f8d7da; color:#721c24; padding:4px 8px; border-radius:20px; font-size:12px; font-weight:bold; border:1px solid #f5c6cb; box-shadow: 0 1px 2px rgba(0,0,0,0.05); margin-bottom: 5px;">
                    <img src="${hsAvatar}" style="width:20px; height:20px; border-radius:50%; object-fit: cover; border: 1px solid #fff;"> 
                    ${v.ten_hoc_sinh}
                    <button type="button" onclick="window.ham_20_39b_xoa_su_kien('${v.id}', '${nk.id}')" style="background:none; border:none; color:#dc3545; cursor:pointer; font-size:14px; margin-left:3px; padding:0;" title="Xóa học sinh vắng">✖</button>
                </div>`;
            }).join(' ');
            htmlSuKien += `<div style="margin-bottom:12px; padding:10px; background:#fff; border:1px solid #f5c6cb; border-radius:6px;"><strong style="color: #dc3545; font-size: 13px; display:block; margin-bottom:5px;">❌ Vắng mặt:</strong> <div style="display:flex; flex-wrap:wrap; gap:8px;">${htmlVang}</div></div>`;
        }

        if (suKienKhac.length > 0) {
            htmlSuKien += `<strong style="color: #d35400; font-size: 13px; display:inline-block; margin-top:8px;">🎯 Sự kiện / Điểm:</strong><div style="margin-top: 5px;">`;
            suKienKhac.forEach(sk => {
                let textGC = sk.ghi_chu ? ` - <i>${sk.ghi_chu}</i>` : '';
                let mauThe = sk.thong_tin_mo_rong?.mau_sac || '#fd7e14';
                let badgeDiem = (sk.loai_the === 'Cho điểm' && sk.thong_tin_mo_rong?.diem_so) ? `<span style="background:#28a745; color:white; padding:1px 5px; border-radius:3px; font-size:11px; margin-right:4px;">⭐ ${sk.thong_tin_mo_rong.diem_so}đ</span>` : '';

                let dsMC = sk.thong_tin_mo_rong?.danh_sach_anh_minh_chung || [];
                if (typeof dsMC === 'string') dsMC = dsMC.split(',').filter(l => l.trim());
                let htmlMC = '';
                if (dsMC.length > 0) {
                    htmlMC += `<div style="display:flex; flex-direction:column; gap:15px; margin-top:10px; padding:10px; background:#f8f9fa; border-radius:6px; border:1px dashed #ccc;">`;
                    dsMC.forEach((l, idx) => {
                        htmlMC += `
                        <div style="position: relative; display: inline-block;">
                            <img src="${taoLinkAnhPreview(l)}" style="width: 100%; height: auto; max-height: 40vh; object-fit: contain; background: #fff; border-radius: 6px; border: 1px solid #ccc;">
                            <button type="button" onclick="window.ham_20_39c_xoa_anh_mc('${sk.id}', ${idx}, '${nk.id}')" style="position: absolute; top: -10px; right: -10px; background: #dc3545; color: white; border: 2px solid #fff; border-radius: 50%; width: 28px; height: 28px; font-size: 14px; font-weight: bold; cursor: pointer; box-shadow: 0 2px 5px rgba(0,0,0,0.3); z-index: 10; display:flex; align-items:center; justify-content:center;" title="Xóa ảnh minh chứng này">✖</button>
                        </div>`;
                    });
                    htmlMC += `</div>`;
                }

                let hsAvatar = tuDienAvatar[sk.uid_hoc_sinh] || `https://ui-avatars.com/api/?name=${encodeURIComponent(sk.ten_hoc_sinh)}&background=random&color=fff&size=100`;

                htmlSuKien += `
                <div style="position: relative; margin-bottom:12px; border-left:4px solid ${mauThe}; padding-left:10px; background:#fff; padding:12px; font-size:13px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); border-radius: 0 6px 6px 0; border-top:1px solid #eee; border-right:1px solid #eee; border-bottom:1px solid #eee;">
                    <button type="button" onclick="window.ham_20_39b_xoa_su_kien('${sk.id}', '${nk.id}')" style="position: absolute; top: 8px; right: 8px; background: #f8d7da; color: #dc3545; border: 1px solid #f5c6cb; border-radius: 4px; padding: 4px 8px; font-size: 11px; cursor: pointer; font-weight: bold; transition:0.2s;" onmouseover="this.style.background='#dc3545'; this.style.color='#fff';" onmouseout="this.style.background='#f8d7da'; this.style.color='#dc3545';" title="Xóa toàn bộ sự kiện này">🗑️ Xóa sự kiện</button>
                    
                    <div style="display:flex; align-items:center; gap:8px; padding-right: 80px;">
                        <img src="${hsAvatar}" style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover; border: 1px solid #dee2e6;">
                        <div style="line-height: 1.4;"><b>${sk.ten_hoc_sinh}</b>: ${badgeDiem}<span style="color:${mauThe}; font-weight:bold;">[${sk.loai_the}]</span><span style="color:#555;">${textGC}</span></div>
                    </div>
                    ${htmlMC}
                </div>`;
            });
            htmlSuKien += `</div>`;
        }

        // Nếu thầy đang gõ dở thì lấy lại text đang gõ, nếu không thì lấy gốc từ DB
        let valTenBai = tempTenBai !== null ? tempTenBai : (nk.ten_bai || '');
        let valLyThuyet = tempLyThuyet !== null ? tempLyThuyet : (nk.ly_thuyet || '');
        let valBaiTap = tempBaiTap !== null ? tempBaiTap : (nk.bai_tap || '');
        let valDanDo = tempDanDo !== null ? tempDanDo : (nk.dan_do || '');

        let tenCacThu = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
        let dateObj = new Date(nk.ngay_day);
        let strNgay = `${String(dateObj.getDate()).padStart(2, '0')}/${String(dateObj.getMonth() + 1).padStart(2, '0')}/${dateObj.getFullYear()}`;
        let hienThiTiet = nk.tiet.toLowerCase().includes('tiết') ? nk.tiet : `Tiết ${nk.tiet}`;

        // --- RENDER MODAL ---
        modal.innerHTML = `
            <div style="background:#fff; width:100%; max-width:1000px; height:90vh; border-radius:8px; display:flex; flex-direction:column; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,0.5);">
                <div style="background:#ffc107; color:#000; padding:15px 20px; display:flex; justify-content:space-between; align-items:center; border-bottom: 2px solid #d39e00;">
                    <h3 style="margin:0; font-size:18px; display:flex; align-items:center; gap:8px;">✏️ CẬP NHẬT CHI TIẾT TIẾT HỌC</h3>
                    <div style="font-size: 14px; font-weight: bold; background:rgba(255,255,255,0.5); padding:4px 10px; border-radius:20px;">🕒 ${hienThiTiet} - ${nk.buoi} - ${tenCacThu[dateObj.getDay()]}, Ngày ${strNgay}</div>
                </div>
                
                <div style="flex:1; overflow-y:auto; padding:20px; display:flex; flex-wrap:wrap; gap:20px; background:#f4f6f9;">
                    
                    <!-- CỘT TRÁI -->
                    <div style="flex:1.5; min-width:350px; display:flex; flex-direction:column; gap:15px;">
                        <div style="background:#fff; padding:20px; border-radius:8px; border:1px solid #ced4da; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
                            <label style="font-weight:bold; color:#0056b3; display:block; margin-bottom:5px;">📖 Tên bài:</label>
                            <input type="text" id="edit-tenbai" value="${valTenBai.replace(/"/g, '&quot;')}" style="width:100%; padding:10px; border:2px solid #80bdff; border-radius:4px; box-sizing:border-box; outline:none; font-weight:bold; color:#0056b3; margin-bottom:15px; font-size:15px;">
                            
                            <label style="font-weight:bold; color:#495057; display:block; margin-bottom:5px;">Lý thuyết:</label>
                            <textarea id="edit-lythuyet" style="width:100%; padding:10px; border:1px solid #ced4da; border-radius:4px; box-sizing:border-box; min-height:80px; resize:vertical; font-family:inherit; outline:none; margin-bottom:15px;">${valLyThuyet}</textarea>
                            
                            <label style="font-weight:bold; color:#495057; display:block; margin-bottom:5px;">Bài tập:</label>
                            <textarea id="edit-baitap" style="width:100%; padding:10px; border:1px solid #ced4da; border-radius:4px; box-sizing:border-box; min-height:80px; resize:vertical; font-family:inherit; outline:none; margin-bottom:15px;">${valBaiTap}</textarea>
                            
                            <label style="font-weight:bold; color:#856404; display:block; margin-bottom:5px;">📌 Dặn dò:</label>
                            <textarea id="edit-dando" style="width:100%; padding:10px; border:1px solid #f5c6cb; border-radius:4px; box-sizing:border-box; min-height:80px; resize:vertical; background:#fffcf8; color:#856404; font-family:inherit; outline:none; font-weight:bold;">${valDanDo}</textarea>
                        </div>
                        
                        ${htmlAnhBG ? `<div style="background:#fff; padding:20px; border-radius:8px; border:1px solid #ced4da; box-shadow:0 2px 4px rgba(0,0,0,0.05);"><h4 style="margin:0 0 10px 0; color:#17a2b8;">📸 Ảnh bài giảng (${mangAnhBG.length} ảnh)</h4>${htmlAnhBG}</div>` : ''}
                    </div>
                    
                    <!-- CỘT PHẢI -->
                    <div style="flex:1; min-width:300px; display:flex; flex-direction:column; gap:15px;">
                        <div style="background:#fff; padding:20px; border-radius:8px; border:1px solid #ced4da; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
                            <h4 style="margin:0 0 15px 0; color:#dc3545; border-bottom:2px dashed #ccc; padding-bottom:8px;">📋 Quản lý Sự kiện / Điểm danh</h4>
                            ${htmlSuKien}
                        </div>
                    </div>
                </div>
                
                <div style="padding:15px 20px; background:#fff; border-top:1px solid #dee2e6; display:flex; justify-content:flex-end; gap:15px;">
                    <button id="btn-huy-edit-tiet" style="padding:12px 25px; background:#6c757d; color:white; border:none; border-radius:6px; cursor:pointer; font-weight:bold; font-size:15px; transition:0.2s;" onmouseover="this.style.background='#5a6268'" onmouseout="this.style.background='#6c757d'">❌ Đóng</button>
                    <button id="btn-luu-edit-tiet" style="padding:12px 35px; background:#28a745; color:white; border:none; border-radius:6px; cursor:pointer; font-weight:bold; font-size:15px; box-shadow:0 4px 6px rgba(0,0,0,0.2); transition:0.2s;" onmouseover="this.style.background='#218838'" onmouseout="this.style.background='#28a745'">💾 Lưu nội dung Text</button>
                </div>
            </div>
        `;

        document.getElementById('btn-huy-edit-tiet').onclick = () => {
            document.body.removeChild(modal);
            const btnLoc = document.querySelector('button[onclick*="ham_20_15_thuc_hien_tra_cuu"]');
            if (btnLoc) btnLoc.click(); // Làm mới lại bảng tra cứu ở ngoài
        };

        document.getElementById('btn-luu-edit-tiet').onclick = async function () {
            let btn = this;
            let oldText = btn.innerHTML;
            btn.innerHTML = '⏳ Đang lưu...';
            btn.disabled = true;

            let payload = {
                ten_bai: document.getElementById('edit-tenbai').value.trim(),
                ly_thuyet: document.getElementById('edit-lythuyet').value.trim(),
                bai_tap: document.getElementById('edit-baitap').value.trim(),
                dan_do: document.getElementById('edit-dando').value.trim()
            };

            const { error: errUp } = await _supabase.from('nhat_ky_day_hoc').update(payload).eq('id', idNhatKy);

            if (errUp) {
                alert('❌ Lỗi cập nhật: ' + errUp.message);
                btn.innerHTML = oldText;
                btn.disabled = false;
            } else {
                alert('✅ Đã cập nhật thành công!');
                btn.innerHTML = oldText;
                btn.disabled = false;
            }
        };

    } catch (e) {
        modal.innerHTML = `<div style="background:#fff; padding:20px; border-radius:8px; font-weight:bold; color:red; text-align:center;">❌ Lỗi: ${e.message}<br><button onclick="document.body.removeChild(this.closest('div[style*=\\'position:fixed\\']'))" style="margin-top:15px; padding:5px 15px; cursor:pointer;">Đóng</button></div>`;
    }
};

// =======================================================
// CÁC HÀM XÓA PHỤ TRỢ (NẰM BÊN TRONG POPUP SỬA)
// =======================================================

// 1. Xóa ảnh Bài giảng
window.ham_20_39a_xoa_anh_bg = async function (idNhatKy, indexAnh) {
    if (!confirm("⚠️ Thầy có chắc muốn xóa bức ảnh bài giảng này không?")) return;
    try {
        const { data, error: errGet } = await _supabase.from('nhat_ky_day_hoc').select('danh_sach_anh').eq('id', idNhatKy).single();
        if (errGet) throw errGet;

        let mangAnh = [];
        let rawAnh = data.danh_sach_anh;
        if (Array.isArray(rawAnh)) mangAnh = rawAnh;
        else if (typeof rawAnh === 'string' && rawAnh.length > 5) {
            try { mangAnh = JSON.parse(rawAnh); } catch (e) { mangAnh = rawAnh.split(',').filter(l => l.trim()); }
        }

        mangAnh.splice(indexAnh, 1);
        const { error: errUp } = await _supabase.from('nhat_ky_day_hoc').update({ danh_sach_anh: mangAnh }).eq('id', idNhatKy);
        if (errUp) throw errUp;

        window.ham_20_39_sua_tiet_hoc_popup(idNhatKy); // Load lại popup ngay lập tức
    } catch (e) { alert("❌ Lỗi: " + e.message); }
};

// 2. Xóa Sự kiện hoặc Xóa Vắng
window.ham_20_39b_xoa_su_kien = async function (idSuKien, idNhatKy) {
    if (!confirm("⚠️ Thầy có chắc muốn xóa ghi nhận sự kiện/vắng mặt này khỏi hệ thống không?")) return;
    try {
        const { error } = await _supabase.from('nhat_ky_su_kien_hs').delete().eq('id', idSuKien);
        if (error) throw error;

        window.ham_20_39_sua_tiet_hoc_popup(idNhatKy); // Load lại popup ngay lập tức
    } catch (e) { alert("❌ Lỗi: " + e.message); }
};

// 3. Xóa Ảnh Minh Chứng của một sự kiện
window.ham_20_39c_xoa_anh_mc = async function (idSuKien, indexAnhMC, idNhatKy) {
    if (!confirm("⚠️ Thầy có chắc muốn xóa ảnh minh chứng sự kiện này không?")) return;
    try {
        const { data, error: errGet } = await _supabase.from('nhat_ky_su_kien_hs').select('thong_tin_mo_rong').eq('id', idSuKien).single();
        if (errGet) throw errGet;

        let ttMoRong = data.thong_tin_mo_rong || {};
        let dsAnhMC = ttMoRong.danh_sach_anh_minh_chung || [];
        let mangMC = Array.isArray(dsAnhMC) ? dsAnhMC : dsAnhMC.split(',').filter(l => l.trim());

        mangMC.splice(indexAnhMC, 1);
        ttMoRong.danh_sach_anh_minh_chung = mangMC;

        const { error: errUp } = await _supabase.from('nhat_ky_su_kien_hs').update({ thong_tin_mo_rong: ttMoRong }).eq('id', idSuKien);
        if (errUp) throw errUp;

        window.ham_20_39_sua_tiet_hoc_popup(idNhatKy); // Load lại popup ngay lập tức
    } catch (e) { alert("❌ Lỗi: " + e.message); }
};




// 🌟 BỘ LẮNG NGHE TOÀN CỤC: Bắt mọi sự kiện Nhấn vào / Gõ phím trên các ô chọn học sinh
document.addEventListener('focusin', function(e) {
    if (e.target.classList.contains('nk-input-hs-vang') || e.target.classList.contains('nk-input-hs-su-kien')) {
        e.target.removeAttribute('list');
        e.target.setAttribute('autocomplete', 'off');
        window.ham_20_38_hien_thi_dropdown_hs(e.target);
    }
});

document.addEventListener('input', function(e) {
    if (e.target.classList.contains('nk-input-hs-vang') || e.target.classList.contains('nk-input-hs-su-kien')) {
        window.ham_20_38_hien_thi_dropdown_hs(e.target);
    }
});



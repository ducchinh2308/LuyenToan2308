// =====================================================================
// KHỐI 21: SỔ TAY GIÁO VIÊN CHỦ NHIỆM (ĐÃ ĐÁNH SỐ LẠI LIÊN TIẾP TỪ 21.1 -> 21.15)
// =====================================================================

// Mảng toàn cục lưu trữ dữ liệu tạm thời trên RAM
window.danhSachAnhSHLTam = [];
window.danhSachAnhMinhChungGVCNTam = [];
window.danhSachSuKienGVCNTam = [];

// =====================================================================
// HÀM 21.1: VẼ GIAO DIỆN CHÍNH CỦA SỔ TAY GVCN
// =====================================================================
window.ham_21_1_mo_giao_dien_nhat_ky_gvcn = function () {
    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
    if (!vungLamViec) return;

    const today = new Date().toISOString().split('T')[0];

    vungLamViec.innerHTML = `
        <div style="padding: 10px; animation: fadeIn 0.4s ease-in-out;">
            
            <!-- HEADER -->
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #6f42c1; padding-bottom: 12px; margin-bottom: 25px;">
                <h3 style="color: #6f42c1; margin: 0; text-transform: uppercase; display: flex; align-items: center; gap: 10px; font-size: 20px;">
                    🛡️ Sổ Tay Giáo Viên Chủ Nhiệm
                </h3>
                
                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                    <button onclick="ham_21_15_lam_moi_so_gvcn()" style="padding: 8px 18px; background: #e83e8c; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.15); transition: 0.2s;" onmouseover="this.style.background='#c63375'" onmouseout="this.style.background='#e83e8c'">
                        🆕 Tuần mới / Trống trang
                    </button>

                    <button onclick="alert('Tính năng tra cứu hồ sơ GVCN đang được nâng cấp...')" style="padding: 8px 18px; background: #ffc107; color: #000; border: 1px solid #d39e00; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.15); transition: 0.2s;" onmouseover="this.style.background='#e0a800'" onmouseout="this.style.background='#ffc107'">
                        🔍 Lịch sử Chủ nhiệm
                    </button>
                    
                    <button onclick="ham_3_1_ve_dashboard_admin()" style="padding: 8px 18px; background: #6c757d; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.15); transition: 0.2s;" onmouseover="this.style.background='#5a6268'" onmouseout="this.style.background='#6c757d'">
                        ⬅️ Bảng điều khiển
                    </button>
                </div>
            </div>

            <!-- PHẦN 1: THÔNG TIN LỚP CHỦ NHIỆM -->
            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; border: 1px solid #dee2e6; box-shadow: 0 4px 6px rgba(0,0,0,0.03); margin-bottom: 25px;">
                <h4 style="margin: 0 0 15px 0; color: #495057; font-size: 16px;">🕒 1. Thông tin Sinh hoạt lớp chung</h4>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
                    <div>
                        <label style="font-weight: bold; font-size: 14px; color: #495057; margin-bottom: 5px; display: block;">Lớp Chủ Nhiệm:</label>
                        <input id="gvcn-input-lop" list="dl-lop" onchange="ham_21_2_tai_danh_sach_hs_chu_nhiem();" placeholder="VD: 12TN6..." style="width: 100%; padding: 10px; border: 2px solid #6f42c1; border-radius: 6px; box-sizing: border-box; font-weight: bold; font-size: 15px; color: #6f42c1; outline: none; background: #fdfbfe; box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);">
                        <datalist id="dl-lop"></datalist>
                        <datalist id="gvcn-dl-hs"></datalist>
                    </div>
                    <div>
                        <label style="font-weight: bold; font-size: 14px; color: #495057; margin-bottom: 5px; display: block;">Ngày ghi sổ:</label>
                        <input type="date" id="gvcn-input-ngay" value="${today}" style="width: 100%; padding: 10px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; font-weight: bold; font-size: 15px; outline: none; box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);">
                    </div>
                    <div>
                        <label style="font-weight: bold; font-size: 14px; color: #495057; margin-bottom: 5px; display: block;">Tuần học (Bắt buộc):</label>
                        <input id="gvcn-input-tuan" type="text" placeholder="VD: Tuần 12..." style="width: 100%; padding: 10px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; font-size: 15px; outline: none; box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);">
                    </div>
                </div>
            </div>

            <div style="display: flex; gap: 25px; flex-wrap: wrap;">
                
                <!-- CỘT TRÁI: NHẬT KÝ LỚP CHUNG -->
                <div style="flex: 1.5; min-width: 400px; display: flex; flex-direction: column; gap: 20px; background: #fff; padding: 25px; border-radius: 10px; border: 1px solid #dee2e6; box-shadow: 0 4px 10px rgba(0,0,0,0.03);">
                    <div>
                        <h4 style="margin: 0 0 20px 0; color: #6f42c1; font-size: 17px; border-bottom: 2px dashed #f3e5f5; padding-bottom: 10px;">📝 2. Đánh giá & Kế hoạch tuần</h4>
                        
                        <label style="font-weight: bold; font-size: 14px; color: #495057; display:block; margin-bottom:8px;">Tình hình chung / Ưu điểm / Tồn tại:</label>
                        <textarea id="gvcn-danh-gia" placeholder="Ghi nhận tổng quan về nề nếp, học tập, phong trào của lớp trong tuần..." style="width: 100%; padding: 12px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; margin-bottom: 20px; resize: vertical; min-height: 100px; font-family: inherit; font-size:14px; outline: none; transition: 0.2s;" onfocus="this.style.borderColor='#6f42c1'"></textarea>

                        <label style="font-weight: bold; font-size: 14px; color: #495057; display:block; margin-bottom:8px;">Kế hoạch / Việc cần làm tuần tới:</label>
                        <textarea id="gvcn-ke-hoach" placeholder="Phổ biến kế hoạch nhà trường, phân công trực nhật, đóng quỹ..." style="width: 100%; padding: 12px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; margin-bottom: 20px; resize: vertical; min-height: 100px; font-family: inherit; font-size:14px; outline: none; transition: 0.2s;" onfocus="this.style.borderColor='#6f42c1'"></textarea>

                        <label style="font-weight: bold; font-size: 14px; color: #dc3545; display:block; margin-bottom:8px;">Lưu ý đặc biệt (Cần theo dõi):</label>
                        <textarea id="gvcn-luu-y" placeholder="Học sinh cá biệt, học sinh ốm đau, hoàn cảnh khó khăn cần hỗ trợ..." style="width: 100%; padding: 12px; border: 1px solid #f5c6cb; background: #fdf5f6; color: #dc3545; border-radius: 6px; box-sizing: border-box; margin-bottom: 20px; resize: vertical; min-height: 80px; font-family: inherit; font-size:14px; font-weight: bold; outline: none; transition: 0.2s;" onfocus="this.style.borderColor='#dc3545'"></textarea>

                        <label style="font-weight: bold; font-size: 14px; color: #17a2b8; display: block; margin-bottom: 10px;">📸 Ảnh Biên bản SHL / Hình ảnh lớp:</label>
                        
                        <div style="display: flex; gap: 15px; align-items: stretch;">
                            <button type="button" id="btn-tai-anh-shl" onclick="document.getElementById('gvcn-input-anh-shl').click()" style="padding: 15px 20px; background: #f3e5f5; color: #6f42c1; border: 2px dashed #6f42c1; border-radius: 8px; cursor: pointer; font-weight: bold; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; transition: 0.2s; flex-shrink: 0;" onmouseover="this.style.background='#e2d1e6'">
                                <span style="font-size: 28px;">📷</span><span style="font-size: 13px;">Tải ảnh lên</span>
                            </button>
                            <input type="file" id="gvcn-input-anh-shl" accept="image/*" multiple style="display: none;">
                            <div id="gvcn-vung-preview-anh-shl" style="flex: 1; border: 1px dashed #ced4da; border-radius: 8px; display: flex; align-items: center; justify-content: flex-start; color: #adb5bd; font-size: 13px; font-style: italic; background: #f8f9fa; padding: 12px; gap: 12px; overflow-x: auto; box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);">
                                <span id="gvcn-text-cho-anh">(Ảnh biên bản SHL sẽ xuất hiện tại đây...)</span>
                            </div>
                        </div>
                    </div>

                    <div style="margin-top: auto; padding-top: 25px; border-top: 1px dashed #dee2e6; text-align: right;">
                        <button onclick="ham_21_8_luu_so_chu_nhiem(this)" style="padding: 14px 30px; background: #6f42c1; color: white; border: none; border-radius: 8px; font-weight: bold; font-size: 15px; cursor: pointer; box-shadow: 0 4px 10px rgba(111,66,193,0.3); transition: 0.2s;" onmouseover="this.style.background='#5a32a3'; this.style.transform='translateY(-2px)'" onmouseout="this.style.background='#6f42c1'; this.style.transform='translateY(0)'">
                            💾 1. LƯU SỔ CHỦ NHIỆM (THÔNG TIN LỚP)
                        </button>
                    </div>
                </div>

                <!-- CỘT PHẢI: KỶ LUẬT & NỀ NẾP CÁ NHÂN -->
                <div style="flex: 1; min-width: 350px; display: flex; flex-direction: column; gap: 20px; background: #fff; padding: 25px; border-radius: 10px; border: 1px solid #dee2e6; box-shadow: 0 4px 10px rgba(0,0,0,0.03);">
                    
                    <div style="flex: 1; display: flex; flex-direction: column;">
                        <h4 style="margin: 0 0 20px 0; color: #e83e8c; font-size: 17px; border-bottom: 2px dashed #fce4ec; padding-bottom: 10px;">🎯 3. Quản lý Sự kiện / Nề nếp Cá nhân</h4>
                        
                        <div style="margin-bottom: 18px;">
                            <label style="font-weight: bold; font-size: 14px; color: #495057; display:block; margin-bottom:8px;">B1. Chọn học sinh (Thêm nhiều dòng nếu vi phạm nhóm):</label>
                            <div id="gvcn-khu-vuc-hs-su-kien" style="display: flex; flex-direction: column; gap: 10px;">
                                <div class="dong-hs-su-kien" style="display: flex; gap: 10px; align-items: center;">
                                    <input class="gvcn-input-hs-su-kien" list="gvcn-dl-hs" placeholder="Gõ tên học sinh lớp chủ nhiệm..." style="flex: 1; padding: 12px; border: 2px solid #e83e8c; border-radius: 6px; box-sizing: border-box; font-weight: bold; font-size: 14px; outline: none; background: #fdf5f8;">
                                    <button onclick="this.parentElement.remove()" style="padding: 12px 15px; background: #f8d7da; color: #dc3545; border: none; border-radius: 6px; cursor: pointer; font-size: 14px;" title="Xóa dòng này">✖</button>
                                </div>
                            </div>
                            <button onclick="ham_21_14_them_dong_hs_su_kien()" style="margin-top: 10px; width: 100%; padding: 10px; background: #fff; border: 1px dashed #e83e8c; color: #e83e8c; border-radius: 6px; cursor: pointer; font-weight: bold; transition: 0.2s;" onmouseover="this.style.background='#fdf5f8'">
                                ➕ Thêm học sinh cùng sự kiện
                            </button>
                        </div>
                        
                        <div style="margin-bottom: 18px;">
                            <label style="font-weight: bold; font-size: 14px; color: #495057; display:block; margin-bottom:8px;">B2. Thời gian & Ghi chú (Hình thức xử lý / Lời hứa):</label>
                            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                                <input type="date" id="gvcn-input-ngay-su-kien" value="${today}" style="width: 150px; padding: 12px; border: 2px solid #e83e8c; border-radius: 6px; box-sizing: border-box; font-size: 14px; outline: none; font-weight: bold; color: #e83e8c; background: #fdf5f8;" title="Ngày xảy ra sự kiện">
                                <input id="gvcn-input-ghi-chu" type="text" placeholder="VD: Đã thu điện thoại, làm bản kiểm điểm..." style="flex: 1; min-width: 200px; padding: 12px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; font-size: 14px; outline: none;">
                            </div>
                        </div>

                        <div style="margin-bottom: 18px; padding-bottom: 18px; border-bottom: 1px dashed #ccc;">
                            <label style="font-weight: bold; font-size: 14px; color: #495057; display: block; margin-bottom: 10px;">B3. 📸 Ảnh minh chứng (Bản kiểm điểm / Nhắn tin PH):</label>
                            <div style="display: flex; gap: 15px; align-items: stretch;">
                                <button type="button" onclick="document.getElementById('gvcn-input-anh-mc').click()" style="padding: 12px 15px; background: #f8f9fa; color: #495057; border: 1px dashed #adb5bd; border-radius: 8px; cursor: pointer; font-weight: bold; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 5px; transition: 0.2s; flex-shrink: 0;" onmouseover="this.style.background='#e9ecef'">
                                    <span style="font-size: 24px;">📷</span><span style="font-size: 12px;">Tải ảnh lên</span>
                                </button>
                                <input type="file" id="gvcn-input-anh-mc" accept="image/*" multiple style="display: none;">
                                <div id="gvcn-vung-preview-anh-mc" style="flex: 1; border: 1px dashed #ced4da; border-radius: 8px; display: flex; align-items: center; justify-content: flex-start; color: #adb5bd; font-size: 12px; font-style: italic; background: #fafafa; padding: 10px; gap: 10px; overflow-x: auto; box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);">
                                    <span id="gvcn-text-cho-anh-mc">(Ảnh minh chứng cá nhân...)</span>
                                </div>
                            </div>
                        </div>

                        <div style="margin-bottom: 8px;">
                            <label style="font-weight: bold; font-size: 14px; color: #6f42c1; display: block;">B4. BẤM CHỌN THẺ NỀ NẾP ĐỂ GHI NHẬN:</label>
                        </div>

                        <div id="gvcn-khu-vuc-tags" style="margin-bottom: 20px; background: #f8f9fa; padding: 15px; border-radius: 8px; border: 1px dashed #6f42c1; box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);">
                            <span style="font-size: 13px; color: #999;">⏳ Đang tải bộ thẻ GVCN...</span>
                        </div>

                        <div style="width: 100%; margin-bottom: 20px; padding: 12px; background: #fffcf8; border: 2px dashed #ffc107; border-radius: 8px; display: flex; gap: 10px; align-items: center; box-shadow: inset 0 2px 4px rgba(0,0,0,0.02); box-sizing: border-box;">
                            <span style="font-size: 18px;" title="Điểm trừ thi đua">📉</span>
                            <input type="number" id="gvcn-input-diem-tru" placeholder="Nhập điểm trừ..." step="1" style="flex: 1; min-width: 80px; padding: 10px; border: 1px solid #ffc107; border-radius: 4px; outline: none; font-weight: bold; color: #dc3545; font-size: 14px;">
                            <button onclick="let d = document.getElementById('gvcn-input-diem-tru').value; if(!d){alert('Nhập điểm trừ!'); return;} ham_21_6_gan_the_gvcn('Trừ điểm thi đua', '#dc3545', d); document.getElementById('gvcn-input-diem-tru').value='';" 
                                style="padding: 10px 15px; font-size: 13px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; transition: 0.2s; white-space: nowrap;" 
                                onmouseover="this.style.background='#c82333'">
                                Ghi nhận Trừ điểm
                            </button>
                        </div>

                        <div style="flex: 1; background: #f8f9fa; border: 1px solid #ced4da; border-radius: 8px; padding: 15px; overflow-y: auto; max-height: 250px; box-shadow: inset 0 2px 5px rgba(0,0,0,0.03);">
                            <div style="font-size: 13px; font-weight: bold; color: #495057; margin-bottom: 12px; border-bottom: 2px solid #dee2e6; padding-bottom: 8px;">Sự kiện đang chờ lưu (<span id="gvcn-dem-su-kien" style="color:#e83e8c;">0</span>):</div>
                            <div id="gvcn-danh-sach-cho-luu"><i style="color: #adb5bd; font-size: 13px;">Chưa có sự kiện nào...</i></div>
                        </div>
                    </div>

                    <div style="margin-top: auto; padding-top: 25px; border-top: 1px dashed #dee2e6; text-align: right;">
                        <button onclick="ham_21_9_luu_su_kien_gvcn(this)" style="padding: 14px 30px; background: #e83e8c; color: white; border: none; border-radius: 8px; font-weight: bold; font-size: 15px; cursor: pointer; box-shadow: 0 4px 10px rgba(232,62,140,0.3); transition: 0.2s;" onmouseover="this.style.background='#c63375'; this.style.transform='translateY(-2px)'" onmouseout="this.style.background='#e83e8c'; this.style.transform='translateY(0)'">
                            🎯 2. LƯU SỰ KIỆN VÀO HỒ SƠ LỚP
                        </button>
                    </div>
                </div>

            </div>
        </div>
    `;

    // Khởi tạo các hàm phụ trợ sau khi vẽ xong HTML
    if (typeof window.ham_20_7_tai_danh_sach_lop === 'function') window.ham_20_7_tai_danh_sach_lop();
    window.ham_21_3_tai_danh_sach_the_gvcn();
    window.ham_21_10_kich_hoat_preview_anh_shl();
    window.ham_21_12_kich_hoat_preview_anh_mc_gvcn();
};


// =====================================================================
// HÀM 21.2: TẢI DANH SÁCH HỌC SINH LỚP CHỦ NHIỆM
// =====================================================================
window.ham_21_2_tai_danh_sach_hs_chu_nhiem = async function () {
    const inputLop = document.getElementById('gvcn-input-lop');
    const datalistHS = document.getElementById('gvcn-dl-hs');
    const cacOChonHS = document.querySelectorAll('.gvcn-input-hs-su-kien');

    if (!inputLop || !datalistHS) return;

    let rawLop = inputLop.value.trim();
    if (!rawLop) return;

    let maLop = rawLop.match(/\(([^)]+)\)$/) ? rawLop.match(/\(([^)]+)\)$/)[1].trim() : rawLop;

    cacOChonHS.forEach(o => { o.value = ''; o.placeholder = "⏳ Đang tải danh sách..."; o.disabled = true; });

    try {
        const { data: hsData, error } = await _supabase.from('hoc_sinh').select('uid, sdt, ten, anh_dai_dien, danh_sach_ma_lop').contains('danh_sach_ma_lop', JSON.stringify([maLop]));
        if (error) throw error;

        datalistHS.innerHTML = '';
        window.DanhSachHocSinhLopHienTai = []; // Dùng chung biến với Khối 20 để xài hàm dropdown popup

        if (hsData && hsData.length > 0) {
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
                o.placeholder = `Đã tải ${hsData.length} HS. Nhấn để tìm...`;
                o.removeAttribute('list'); o.setAttribute('autocomplete', 'off'); o.disabled = false;
            });
        } else {
            cacOChonHS.forEach(o => { o.placeholder = `❌ Không tìm thấy HS!`; o.disabled = false; });
        }
    } catch (err) { console.error("Lỗi:", err); cacOChonHS.forEach(o => { o.placeholder = `❌ Lỗi tải!`; o.disabled = false; }); }
};


// =====================================================================
// HÀM 21.3: TẢI DANH SÁCH THẺ ĐỘNG CHO GVCN
// =====================================================================
window.ham_21_3_tai_danh_sach_the_gvcn = async function () {
    const khuVuc = document.getElementById('gvcn-khu-vuc-tags');
    if (!khuVuc) return;

    try {
        const { data: checkTags } = await _supabase.from('cai_dat_the_su_kien').select('id').like('nhom_the', 'gvcn_%').limit(1);
        if (!checkTags || checkTags.length === 0) {
            const defaultTags = [
                { ten_the: "Vắng không phép", nhom_the: "gvcn_vi_pham", mau_sac: "#dc3545" },
                { ten_the: "Vắng phép", nhom_the: "gvcn_vi_pham", mau_sac: "#dc3545" },
                { ten_the: "Đi học trễ", nhom_the: "gvcn_vi_pham", mau_sac: "#dc3545" },
                { ten_the: "Sai đồng phục", nhom_the: "gvcn_vi_pham", mau_sac: "#dc3545" },
                { ten_the: "Sử dụng điện thoại", nhom_the: "gvcn_vi_pham", mau_sac: "#dc3545" },
                { ten_the: "Mất trật tự", nhom_the: "gvcn_vi_pham", mau_sac: "#dc3545" },
                { ten_the: "Không thuộc bài", nhom_the: "gvcn_hoc_tap", mau_sac: "#fd7e14" },
                { ten_the: "Không làm BTVN", nhom_the: "gvcn_hoc_tap", mau_sac: "#fd7e14" },
                { ten_the: "Thiếu dụng cụ học tập", nhom_the: "gvcn_hoc_tap", mau_sac: "#fd7e14" },
                { ten_the: "Tuyên dương tuần", nhom_the: "gvcn_tich_cuc", mau_sac: "#28a745" },
                { ten_the: "Nhiệt tình lao động", nhom_the: "gvcn_tich_cuc", mau_sac: "#28a745" },
                { ten_the: "Giúp đỡ bạn", nhom_the: "gvcn_tich_cuc", mau_sac: "#28a745" },
                { ten_the: "Đã gọi điện PH", nhom_the: "gvcn_phu_huynh", mau_sac: "#6f42c1" },
                { ten_the: "Mời PH lên trường", nhom_the: "gvcn_phu_huynh", mau_sac: "#6f42c1" }
            ];
            await _supabase.from('cai_dat_the_su_kien').insert(defaultTags);
        }

        const { data: theData, error } = await _supabase.from('cai_dat_the_su_kien').select('*').like('nhom_the', 'gvcn_%').order('ngay_tao', { ascending: true });
        if (error) throw error;

        const nhomCauHinhGVCN = [
            { id: 'gvcn_vi_pham', ten: '🚨 Vi phạm nề nếp', mau: '#dc3545' },
            { id: 'gvcn_hoc_tap', ten: '📚 Vấn đề Học tập', mau: '#fd7e14' },
            { id: 'gvcn_tich_cuc', ten: '🌟 Điểm sáng / Tích cực', mau: '#28a745' },
            { id: 'gvcn_phu_huynh', ten: '📞 Liên hệ Phụ huynh', mau: '#6f42c1' }
        ];

        let html = '<div style="display: flex; flex-wrap: wrap; gap: 8px;">';
        nhomCauHinhGVCN.forEach(nhom => {
            html += `<div style="width: 100%; font-size: 12px; font-weight: bold; color: ${nhom.mau}; border-bottom: 2px solid ${nhom.mau}; padding-bottom: 4px; margin-top: 10px; text-transform: uppercase;">${nhom.ten}</div>`;

            let theCuaNhom = theData ? theData.filter(t => t.nhom_the === nhom.id) : [];
            theCuaNhom.forEach(the => {
                let tenTheAnToan = the.ten_the.replace(/'/g, "\\'");
                html += `
                <div style="display: inline-flex; border: 1px solid ${the.mau_sac}; border-radius: 4px; overflow: hidden; background: #fff;">
                    <button type="button" onclick="ham_21_6_gan_the_gvcn('${tenTheAnToan}', '${the.mau_sac}')" style="padding: 6px 10px; font-size: 12px; background: transparent; border: none; color: ${the.mau_sac}; cursor: pointer; font-weight: bold;" title="Bấm để gắn thẻ này">${the.ten_the}</button>
                    <button type="button" onclick="ham_21_5_quan_ly_tag_gvcn('${the.id}', '${tenTheAnToan}')" style="padding: 4px 6px; font-size: 11px; background: #f8f9fa; border: none; border-left: 1px dashed ${the.mau_sac}; color: #6c757d; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#e9ecef'" onmouseout="this.style.background='#f8f9fa'" title="Sửa hoặc Xóa thẻ này">✏️</button>
                </div>
                `;
            });

            html += `<button type="button" onclick="ham_21_4_them_tag_moi_gvcn('${nhom.id}', '${nhom.mau}')" style="padding: 6px 10px; font-size: 12px; background: #f8f9fa; border: 1px dashed ${nhom.mau}; color: ${nhom.mau}; border-radius: 4px; cursor: pointer; font-weight: bold; transition: 0.2s;" onmouseover="this.style.background='#e2e6ea'" onmouseout="this.style.background='#f8f9fa'">➕ Thêm tag</button>`;
        });
        html += '</div>';
        khuVuc.innerHTML = html;

    } catch (err) {
        console.error("Lỗi tải thẻ GVCN:", err);
        khuVuc.innerHTML = '<span style="color:red">❌ Lỗi tải danh sách thẻ!</span>';
    }
};

// =======================================================
// HÀM 21.4: THÊM TAG GVCN MỚI VÀO DB
// =======================================================
window.ham_21_4_them_tag_moi_gvcn = async function (nhomThe, mauSac) {
    let tenTag = prompt("Nhập tên sự kiện mới (VD: Ngủ gật trong lớp):");
    if (!tenTag || !tenTag.trim()) return;

    try {
        const { error } = await _supabase.from('cai_dat_the_su_kien').insert([{ ten_the: tenTag.trim(), nhom_the: nhomThe, mau_sac: mauSac }]);
        if (error) {
            if (error.code === '23505') alert(`Thẻ "${tenTag}" đã có trong nhóm này rồi thầy ạ!`);
            else throw error;
        } else {
            ham_21_3_tai_danh_sach_the_gvcn();
        }
    } catch (err) { alert("❌ Lỗi hệ thống khi thêm thẻ mới!"); }
};

// =======================================================
// HÀM 21.5: SỬA HOẶC XÓA THẺ GVCN
// =======================================================
window.ham_21_5_quan_ly_tag_gvcn = async function (idThe, tenHienTai) {
    let luaChon = prompt(`⚙️ QUẢN LÝ THẺ: [ ${tenHienTai} ]\n\n👉 Để SỬA TÊN: Hãy gõ tên mới vào ô bên dưới.\n👉 Để XÓA THẺ: Hãy xóa hết chữ trong ô và bấm OK.`, tenHienTai);
    if (luaChon === null) return;

    luaChon = luaChon.trim();

    if (luaChon === "") {
        if (confirm(`Thầy có chắc chắn muốn XÓA thẻ "${tenHienTai}" không?`)) {
            try {
                await _supabase.from('cai_dat_the_su_kien').delete().eq('id', idThe);
                ham_21_3_tai_danh_sach_the_gvcn();
            } catch (err) { alert("❌ Có lỗi xảy ra khi xóa thẻ!"); }
        }
    } else if (luaChon !== tenHienTai) {
        try {
            const { error } = await _supabase.from('cai_dat_the_su_kien').update({ ten_the: luaChon }).eq('id', idThe);
            if (error && error.code === '23505') alert(`❌ Tên thẻ "${luaChon}" đã bị trùng!`);
            else if (error) throw error;
            else ham_21_3_tai_danh_sach_the_gvcn();
        } catch (err) { alert("❌ Có lỗi xảy ra khi cập nhật thẻ!"); }
    }
};

// =====================================================================
// HÀM 21.6: GẮN THẺ VÀO DANH SÁCH CHỜ LƯU
// =====================================================================
window.ham_21_6_gan_the_gvcn = function (tenThe, mauSac, diemTru = null) {
    const cacOChonHS = document.querySelectorAll('.gvcn-input-hs-su-kien');
    const oGhiChu = document.getElementById('gvcn-input-ghi-chu');
    let noiDungGhiChu = oGhiChu.value.trim();

    const ngaySuKien = document.getElementById('gvcn-input-ngay-su-kien').value;
    if (!ngaySuKien) { alert("⚠️ Vui lòng chọn Ngày vi phạm / Ngày xảy ra sự kiện!"); return; }

    let coHS = Array.from(cacOChonHS).some(o => o.value.trim() !== '');
    if (!coHS) { alert("⚠️ Yêu cầu: Vui lòng nhập Tên học sinh trước khi bấm gắn Thẻ/Điểm trừ!"); return; }

    let batchId = 'batch_gvcn_' + Date.now();

    if (!window.danhSachSuKienGVCNTam) window.danhSachSuKienGVCNTam = [];
    if (!window.danhSachAnhMinhChungGVCNTam) window.danhSachAnhMinhChungGVCNTam = [];

    cacOChonHS.forEach(oHS => {
        const hSInfo = oHS.value.trim();
        if (hSInfo) {
            let uidHS = document.querySelector(`#gvcn-dl-hs option[value="${hSInfo}"]`)?.dataset?.uid;
            let tenDangNhap = hSInfo.split(' - ')[1] ? hSInfo.split(' - ')[1].trim() : '';
            if (uidHS) {
                window.danhSachSuKienGVCNTam.push({
                    id_tam: 'sk_gvcn_' + Math.random(), batch_id: batchId,
                    uid_hoc_sinh: uidHS, ten_hoc_sinh: hSInfo.split(' - ')[0].trim(), ten_dang_nhap: tenDangNhap,
                    loai_the: tenThe, ghi_chu: noiDungGhiChu, mau_sac: mauSac, diem_tru: diemTru,
                    ngay_su_kien: ngaySuKien,
                    mang_file_minh_chung: [...window.danhSachAnhMinhChungGVCNTam]
                });
            }
        }
    });

    cacOChonHS.forEach((o, i) => { if (i > 0) o.parentElement.remove(); else o.value = ''; });
    oGhiChu.value = '';
    window.danhSachAnhMinhChungGVCNTam = [];
    ham_21_13_render_anh_mc_gvcn();
    ham_21_7_ve_danh_sach_cho_gvcn();
};

// =====================================================================
// HÀM 21.7: VẼ DANH SÁCH SỰ KIỆN ĐANG CHỜ LƯU
// =====================================================================
window.ham_21_7_ve_danh_sach_cho_gvcn = function () {
    const vungHienThi = document.getElementById('gvcn-danh-sach-cho-luu');
    document.getElementById('gvcn-dem-su-kien').innerText = window.danhSachSuKienGVCNTam.length;

    if (window.danhSachSuKienGVCNTam.length === 0) {
        vungHienThi.innerHTML = '<i style="color: #adb5bd; font-size: 13px;">Chưa có sự kiện nào...</i>'; return;
    }

    let html = '';
    window.danhSachSuKienGVCNTam.forEach((sk, idx) => {
        let diemStr = sk.diem_tru ? ` <span style="background:#dc3545; color:white; padding:2px 6px; border-radius:3px; font-size:11px; margin-left:5px;">📉 -${sk.diem_tru}đ</span>` : '';
        let anhStr = (sk.mang_file_minh_chung && sk.mang_file_minh_chung.length > 0) ? ` <span style="font-size:10px;">(📸 ${sk.mang_file_minh_chung.length} ảnh)</span>` : '';

        let strNgaySK = sk.ngay_su_kien ? sk.ngay_su_kien.split('-').reverse().slice(0, 2).join('/') : '';

        html += `
            <div style="display: flex; justify-content: space-between; align-items: flex-start; padding: 10px; border-bottom: 1px dashed #eee; background: #fff; border-radius: 6px; margin-bottom: 8px; border-left: 4px solid ${sk.mau_sac}; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                <div>
                    <div style="font-size: 14px;"><b>${sk.ten_hoc_sinh}</b> <span style="color: ${sk.mau_sac}; font-weight:bold;"> [Ngày ${strNgaySK} - ${sk.loai_the}]</span>${diemStr}${anhStr}</div>
                    ${sk.ghi_chu ? `<div style="font-size: 12px; color: #555; margin-top: 3px;"><i>📝 ${sk.ghi_chu}</i></div>` : ''}
                </div>
                <button onclick="window.danhSachSuKienGVCNTam.splice(${idx}, 1); ham_21_7_ve_danh_sach_cho_gvcn();" style="padding: 4px 10px; background: #f8d7da; color: #dc3545; border: none; border-radius: 4px; cursor: pointer; font-weight:bold;" title="Xóa khỏi hàng đợi">✖</button>
            </div>
        `;
    });
    vungHienThi.innerHTML = html;
};

// =====================================================================
// HÀM 21.8: LƯU SỔ CHỦ NHIỆM (VÀO BẢNG nhat_ky_gvcn)
// =====================================================================
window.ham_21_8_luu_so_chu_nhiem = async function (btnLuu) {
    const maLop = document.getElementById('gvcn-input-lop').value.match(/\(([^)]+)\)$/)?.[1]?.trim();
    const ngay = document.getElementById('gvcn-input-ngay').value;
    const tuan = document.getElementById('gvcn-input-tuan').value.trim();

    if (!maLop || !ngay || !tuan) { alert("⚠️ Vui lòng điền đủ Lớp, Ngày ghi sổ và Tuần học!"); return; }

    let oldTxt = btnLuu.innerHTML;
    btnLuu.innerHTML = "⏳ ĐANG XỬ LÝ ẢNH..."; btnLuu.disabled = true;
    try {
        let mangLinkAnh = [];
        for (let k = 0; k < window.danhSachAnhSHLTam.length; k++) {
            let file = window.danhSachAnhSHLTam[k];
            let base64String = await window.ham_ho_tro_doc_anh_base64(file);
            let payload = { action: "upload_anh_nhat_ky", base64: base64String, mimeType: file.type, fileName: `SHL_${tuan}_${Date.now()}.jpg`, maLop: maLop, loaiAnh: "GVCN" };
            let result = await window.ham_ho_tro_upload_anh_co_tien_trinh(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, payload);
            if (result.status === 'success') mangLinkAnh.push(result.url);
        }

        btnLuu.innerHTML = "⏳ ĐANG LƯU VÀO CƠ SỞ DỮ LIỆU...";

        let viecCanLamArr = [];
        let keHoach = document.getElementById('gvcn-ke-hoach').value.trim();
        if (keHoach) viecCanLamArr.push(keHoach);

        let luuY = document.getElementById('gvcn-luu-y').value.trim();

        const { data: oldData } = await _supabase.from('nhat_ky_gvcn').select('id, thong_tin_mo_rong').eq('ma_lop', maLop).eq('tuan_hoc', tuan).maybeSingle();

        let thongTinMoRong = { luu_y: luuY, ngay_ghi_nhan: ngay, danh_sach_anh: mangLinkAnh };

        if (oldData) {
            let oldAnh = (oldData.thong_tin_mo_rong || {}).danh_sach_anh || [];
            thongTinMoRong.danh_sach_anh = oldAnh.concat(mangLinkAnh);

            let payloadUpdate = {
                noi_dung_sinh_hoat: document.getElementById('gvcn-danh-gia').value.trim(),
                viec_can_lam: viecCanLamArr,
                thong_tin_mo_rong: thongTinMoRong
            };
            await _supabase.from('nhat_ky_gvcn').update(payloadUpdate).eq('id', oldData.id);
        } else {
            await _supabase.from('nhat_ky_gvcn').insert([{
                ma_lop: maLop, tuan_hoc: tuan,
                noi_dung_sinh_hoat: document.getElementById('gvcn-danh-gia').value.trim(),
                viec_can_lam: viecCanLamArr,
                thong_tin_mo_rong: thongTinMoRong, trang_thai: 1
            }]);
        }

        alert("✅ Đã lưu thông tin Sinh hoạt lớp thành công!");
        window.danhSachAnhSHLTam = []; window.ham_21_11_render_anh_shl();
    } catch (e) { alert("❌ Lỗi: " + e.message); }
    finally { btnLuu.innerHTML = oldTxt; btnLuu.disabled = false; }
};

// =====================================================================
// HÀM 21.9: LƯU SỰ KIỆN HỌC SINH (VÀO BẢNG nhat_ky_gvcn_su_kien_hs)
// =====================================================================
window.ham_21_9_luu_su_kien_gvcn = async function (btnLuu) {
    if (window.danhSachSuKienGVCNTam.length === 0) { alert("⚠️ Không có sự kiện học sinh nào để lưu!"); return; }

    const maLop = document.getElementById('gvcn-input-lop').value.match(/\(([^)]+)\)$/)?.[1]?.trim();
    const tuan = document.getElementById('gvcn-input-tuan').value.trim();
    const ngay = document.getElementById('gvcn-input-ngay').value;

    if (!maLop || !tuan) { alert("⚠️ Vui lòng điền đủ Lớp và Tuần học ở phần 1 trước!"); return; }

    let oldTxt = btnLuu.innerHTML;
    btnLuu.innerHTML = "⏳ ĐANG XỬ LÝ ẢNH & DỮ LIỆU..."; btnLuu.disabled = true;

    try {
        let idNhatKyGVCN = null;
        const { data: nkData } = await _supabase.from('nhat_ky_gvcn').select('id').eq('ma_lop', maLop).eq('tuan_hoc', tuan).maybeSingle();

        if (nkData) {
            idNhatKyGVCN = nkData.id;
        } else {
            const { data: newNK, error: errInsert } = await _supabase.from('nhat_ky_gvcn').insert([{
                ma_lop: maLop, tuan_hoc: tuan, thong_tin_mo_rong: { ngay_ghi_nhan: ngay }
            }]).select();
            if (errInsert) throw errInsert;
            idNhatKyGVCN = newNK[0].id;
        }

        let mangSuKienDB = [];
        let cacheUpload = {};

        for (let sk of window.danhSachSuKienGVCNTam) {
            let mangLink = [];
            for (let f of sk.mang_file_minh_chung) {
                let key = f.name + f.size;
                if (!cacheUpload[key]) {
                    let b64 = await window.ham_ho_tro_doc_anh_base64(f);
                    let res = await window.ham_ho_tro_upload_anh_co_tien_trinh(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, { action: "upload_anh_nhat_ky", base64: b64, mimeType: f.type, fileName: `MC_${Date.now()}.jpg`, maLop: maLop, loaiAnh: "GVCN_MC" });
                    cacheUpload[key] = res.url;
                }
                mangLink.push(cacheUpload[key]);
            }

            let diemTruNum = sk.diem_tru ? parseInt(sk.diem_tru) : 1;

            mangSuKienDB.push({
                id_gvcn_nhat_ky: idNhatKyGVCN,
                uid_hoc_sinh: sk.uid_hoc_sinh,
                ten_dang_nhap_hoc_sinh: sk.ten_dang_nhap,
                ten_hoc_sinh: sk.ten_hoc_sinh,
                nhom_su_kien: sk.loai_the,
                noi_dung_chi_tiet: sk.ghi_chu,
                hinh_thuc_xu_ly: '',
                ngay_ghi_nhan: sk.ngay_su_kien,
                muc_do: diemTruNum,
                thong_tin_mo_rong: { mau_sac: sk.mau_sac, danh_sach_anh_minh_chung: mangLink }
            });
        }

        const { error: errSK } = await _supabase.from('nhat_ky_gvcn_su_kien_hs').insert(mangSuKienDB);
        if (errSK) throw errSK;

        alert("✅ Đã ghi nhận tất cả sự kiện nề nếp vào Hồ sơ lớp thành công!");
        window.danhSachSuKienGVCNTam = []; window.ham_21_7_ve_danh_sach_cho_gvcn();
    } catch (e) { alert("❌ Lỗi: " + e.message); }
    finally { btnLuu.innerHTML = oldTxt; btnLuu.disabled = false; }
};


// =====================================================================
// BỘ HÀM PHỤ TRỢ: XỬ LÝ ẢNH (21.10 -> 21.13)
// =====================================================================
window.ham_21_10_kich_hoat_preview_anh_shl = function () {
    const input = document.getElementById('gvcn-input-anh-shl');
    if (input) {
        const new_input = input.cloneNode(true);
        input.parentNode.replaceChild(new_input, input);
        new_input.addEventListener('change', async (e) => {
            let files = await window.ham_20_25_xu_ly_mang_anh_dau_vao(Array.from(e.target.files));
            if (!window.danhSachAnhSHLTam) window.danhSachAnhSHLTam = [];
            if (files && files.length > 0) window.danhSachAnhSHLTam.push(...files);
            ham_21_11_render_anh_shl(); e.target.value = '';
        });
    }
};

window.ham_21_11_render_anh_shl = function () {
    const vung = document.getElementById('gvcn-vung-preview-anh-shl');
    if (!vung) return;

    if (!window.danhSachAnhSHLTam || window.danhSachAnhSHLTam.length === 0) {
        vung.innerHTML = '<span id="gvcn-text-cho-anh">(Ảnh biên bản SHL sẽ xuất hiện tại đây...)</span>'; return;
    }

    let html = '';
    window.danhSachAnhSHLTam.forEach((f, i) => {
        let sizeKB = (f.size / 1024).toFixed(1);
        html += `<div style="position:relative; display:flex; flex-direction:column; align-items:center; background:#fff; padding:5px; border-radius:6px; border:1px solid #ced4da; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
                    <img src="${URL.createObjectURL(f)}" style="height:60px; border-radius:4px; object-fit:contain;">
                    <span style="font-size:10px; color:#666; margin-top:3px; font-weight:bold;">${sizeKB} KB</span>
                    <button onclick="window.danhSachAnhSHLTam.splice(${i},1); ham_21_11_render_anh_shl()" style="position:absolute; top:-6px; right:-6px; background:#dc3545; color:white; border:none; border-radius:50%; width:20px; height:20px; font-size:12px; font-weight:bold; cursor:pointer; box-shadow:0 1px 3px rgba(0,0,0,0.3);">×</button>
                 </div>`;
    });
    vung.innerHTML = html;
};

window.ham_21_12_kich_hoat_preview_anh_mc_gvcn = function () {
    const input = document.getElementById('gvcn-input-anh-mc');
    if (input) {
        const new_input = input.cloneNode(true);
        input.parentNode.replaceChild(new_input, input);
        new_input.addEventListener('change', async (e) => {
            let files = await window.ham_20_25_xu_ly_mang_anh_dau_vao(Array.from(e.target.files));
            if (!window.danhSachAnhMinhChungGVCNTam) window.danhSachAnhMinhChungGVCNTam = [];
            if (files && files.length > 0) window.danhSachAnhMinhChungGVCNTam.push(...files);
            ham_21_13_render_anh_mc_gvcn(); e.target.value = '';
        });
    }
};

window.ham_21_13_render_anh_mc_gvcn = function () {
    const vung = document.getElementById('gvcn-vung-preview-anh-mc');
    if (!vung) return;

    if (!window.danhSachAnhMinhChungGVCNTam || window.danhSachAnhMinhChungGVCNTam.length === 0) {
        vung.innerHTML = '<span id="gvcn-text-cho-anh-mc">(Ảnh minh chứng cá nhân...)</span>'; return;
    }

    let html = '';
    window.danhSachAnhMinhChungGVCNTam.forEach((f, i) => {
        let sizeKB = (f.size / 1024).toFixed(1);
        html += `<div style="position:relative; display:flex; flex-direction:column; align-items:center; background:#fff; padding:5px; border-radius:6px; border:1px solid #ced4da; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
                    <img src="${URL.createObjectURL(f)}" style="height:60px; border-radius:4px; object-fit:contain;">
                    <span style="font-size:10px; color:#666; margin-top:3px; font-weight:bold;">${sizeKB} KB</span>
                    <button onclick="window.danhSachAnhMinhChungGVCNTam.splice(${i},1); ham_21_13_render_anh_mc_gvcn()" style="position:absolute; top:-6px; right:-6px; background:#dc3545; color:white; border:none; border-radius:50%; width:20px; height:20px; font-size:12px; font-weight:bold; cursor:pointer; box-shadow:0 1px 3px rgba(0,0,0,0.3);">×</button>
                 </div>`;
    });
    vung.innerHTML = html;
};

// =====================================================================
// HÀM 21.14: THÊM DÒNG NHẬP HỌC SINH SỰ KIỆN NỀ NẾP
// =====================================================================
window.ham_21_14_them_dong_hs_su_kien = function () {
    const khuVuc = document.getElementById('gvcn-khu-vuc-hs-su-kien');
    const div = document.createElement('div');
    div.className = 'dong-hs-su-kien';
    div.style.cssText = 'display: flex; gap: 10px; align-items: center; animation: fadeIn 0.3s ease-in-out; margin-top:8px;';
    div.innerHTML = `
        <input class="gvcn-input-hs-su-kien" list="gvcn-dl-hs" placeholder="Gõ tên học sinh lớp chủ nhiệm..." style="flex: 1; padding: 12px; border: 2px solid #e83e8c; border-radius: 6px; box-sizing: border-box; font-weight: bold; font-size: 14px; outline: none; background: #fdf5f8;">
        <button onclick="this.parentElement.remove()" style="padding: 12px 15px; background: #f8d7da; color: #dc3545; border: none; border-radius: 6px; cursor: pointer; font-size: 14px;" title="Xóa dòng này">✖</button>
    `;
    khuVuc.appendChild(div);
};

// =====================================================================
// HÀM 21.15: LÀM MỚI TRANG TRẮNG
// =====================================================================
window.ham_21_15_lam_moi_so_gvcn = function () {
    document.getElementById('gvcn-input-tuan').value = '';
    document.getElementById('gvcn-danh-gia').value = '';
    document.getElementById('gvcn-ke-hoach').value = '';
    document.getElementById('gvcn-luu-y').value = '';
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('gvcn-input-ngay-su-kien').value = today;

    document.querySelectorAll('.gvcn-input-hs-su-kien').forEach((o, i) => { if (i > 0) o.parentElement.remove(); else o.value = ''; });

    window.danhSachAnhSHLTam = []; ham_21_11_render_anh_shl();
    window.danhSachAnhMinhChungGVCNTam = []; ham_21_13_render_anh_mc_gvcn();
    window.danhSachSuKienGVCNTam = []; ham_21_7_ve_danh_sach_cho_gvcn();
};

// 🌟 LẮNG NGHE SỰ KIỆN GÕ ĐỂ HIỆN DROPDOWN AVATAR
document.addEventListener('focusin', function (e) {
    if (e.target.classList.contains('gvcn-input-hs-su-kien')) {
        e.target.removeAttribute('list'); e.target.setAttribute('autocomplete', 'off');
        if (typeof window.ham_20_38_hien_thi_dropdown_hs === 'function') window.ham_20_38_hien_thi_dropdown_hs(e.target);
    }
});
document.addEventListener('input', function (e) {
    if (e.target.classList.contains('gvcn-input-hs-su-kien')) {
        if (typeof window.ham_20_38_hien_thi_dropdown_hs === 'function') window.ham_20_38_hien_thi_dropdown_hs(e.target);
    }
});
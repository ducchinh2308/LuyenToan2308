// =====================================================================
// KHỐI 21: SỔ TAY GIÁO VIÊN CHỦ NHIỆM (QUẢN LÝ GIAO VIỆC & SỰ KIỆN TUẦN)
// Thiết kế: Tông màu Tím (#6f42c1) và Hồng (#e83e8c)
// Tính năng: Tự động tính ngày, Tự động UPSERT nội dung vào chung 1 tuần
// =====================================================================

// Mảng toàn cục lưu trữ dữ liệu tạm thời trên RAM
window.gvcn_AnhNoiDungTam = [];
window.gvcn_AnhSuKienTam = [];
window.gvcn_SuKienChoLuu = [];


// =====================================================================
// KHAI BÁO BIẾN TẠM MỚI (Lưu giữ ảnh của tuần để hỗ trợ xóa)
// =====================================================================
window.gvcn_AnhTuanCuTam = [];


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
                    <button onclick="if(typeof ham_21_45_xem_tuan_cu === 'function') ham_21_45_xem_tuan_cu();" style="padding: 8px 15px; background: #17a2b8; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.15);">⏮️ Xem tuần cũ</button>
                    <button onclick="if(typeof ham_21_17_tai_tuan_gan_nhat === 'function') ham_21_17_tai_tuan_gan_nhat();" style="padding: 8px 15px; background: #28a745; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.15);">🔄 Tuần gần nhất</button>
                    <button onclick="if(typeof ham_21_46_mo_giao_dien_tim_lai === 'function') ham_21_46_mo_giao_dien_tim_lai();" style="padding: 8px 15px; background: #ffc107; color: #000; border: 1px solid #d39e00; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.15);">🔍 Tìm lại</button>
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


// // =====================================================================
// // HÀM 21.4: TẠO MỘT KHỐI SỰ KIỆN DUY NHẤT (CHỈ CÓ 1 THẺ LỖI VÀ ẢNH CHUNG CHO KHỐI)
// // =====================================================================
// window.ham_21_4_them_dong_su_kien = function () {
//     const khuVuc = document.getElementById('gvcn-khu-vuc-su-kien-nhanh');
//     if (!khuVuc) return;

//     const currentDate = new Date().toISOString().split('T')[0];
//     const thuHienTai = window.ham_21_39_lay_thu_trong_tuần ? window.ham_21_39_lay_thu_trong_tuần(currentDate) : 'Thứ Hai';

//     const div = document.createElement('div');
//     div.className = 'dong-nhap-su-kien';
//     div.style.cssText = 'background: #fff; padding: 15px; border-radius: 8px; border: 1px solid #ccc; display: flex; flex-direction: column; gap: 12px; margin-top: 10px; animation: fadeIn 0.2s; box-shadow: 0 2px 5px rgba(0,0,0,0.03);';

//     div.innerHTML = `
//         <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px dashed #eee; padding-bottom: 8px;">
//             <b style="color: #e83e8c; font-size: 13px;">📌 Khối Sự kiện / Vi phạm chung:</b>
//             <button onclick="this.closest('.dong-nhap-su-kien').remove()" style="padding: 4px 10px; background: #f8d7da; color: #dc3545; border: none; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: bold;" title="Xóa khối này">✖ Xóa khối</button>
//         </div>

//         <!-- VÙNG CHỨA CÁC DÒNG HỌC SINH -->
//         <div class="sk-vung-danh-sach-hs" style="display: flex; flex-direction: column; gap: 8px;">
            
//             <!-- Dòng học sinh đầu tiên -->
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
//                     <button type="button" onclick="this.closest('.dong-chi-tiet-hs').remove()" style="padding: 6px 8px; background: #f8d7da; color: #dc3545; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;" title="Xóa dòng này">✖</button>
//                 </div>
//             </div>

//         </div>

//         <!-- NÚT THÊM HỌC SINH CÙNG SỰ KIỆN (SINH RA DÒNG NGANG MỚI NGAY BÊN DƯỚI) -->
//         <button type="button" onclick="if(typeof ham_21_31_them_hs_cho_su_kien === 'function') ham_21_31_them_hs_cho_su_kien(this)" style="align-self: flex-start; padding: 5px 12px; background: #fff; color: #e83e8c; border: 1px dashed #e83e8c; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: bold;">
//             ➕ Thêm học sinh cùng sự kiện
//         </button>

//         <!-- PHÂN LOẠI SỰ KIỆN (THẺ LỖI) CHUNG CHO CẢ KHỐI -->
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
//     if (typeof window.ham_20_7_tai_danh_sach_lop === 'function') {
//         window.ham_20_7_tai_danh_sach_lop();
//     }
// };


// // =====================================================================
// // HÀM 21.4: TẠO MỘT DÒNG NGANG MỚI VÀO BẢNG SỰ KIỆN
// // =====================================================================
// window.ham_21_4_them_dong_su_kien = function () {
//     const khuVuc = document.getElementById('gvcn-khu-vuc-su-kien-nhanh');
//     if (!khuVuc) return;

//     // Kế thừa dữ liệu Ngày/Buổi từ dòng cuối cùng (nếu có)
//     let ngayHienTai = new Date().toISOString().split('T')[0];
//     let buoiHienTai = 'Sáng';

//     let dongCuoi = khuVuc.lastElementChild;
//     if (dongCuoi) {
//         ngayHienTai = dongCuoi.querySelector('.sk-ngay').value || ngayHienTai;
//         buoiHienTai = dongCuoi.querySelector('.sk-buoi').value || buoiHienTai;
//     }

//     const thuHienTai = window.ham_21_39_lay_thu_trong_tuần ? window.ham_21_39_lay_thu_trong_tuần(ngayHienTai) : 'Thứ Hai';

//     const div = document.createElement('div');
//     div.className = 'dong-nhap-su-kien';
//     div.style.cssText = 'display: flex; gap: 5px; align-items: center; background: #fff; padding: 6px; border-radius: 6px; border: 1px solid #ced4da; animation: fadeIn 0.2s;';

//     div.innerHTML = `
//         <div style="width: 120px;">
//             <input type="date" class="sk-ngay" value="${ngayHienTai}" onchange="let thu = window.ham_21_39_lay_thu_trong_tuần ? window.ham_21_39_lay_thu_trong_tuần(this.value) : ''; this.closest('.dong-nhap-su-kien').querySelector('.sk-thu').value = thu;" style="width: 100%; padding: 6px; border: 1px solid #ccc; border-radius: 4px; font-size: 11px; outline: none; font-weight:bold; box-sizing: border-box;">
//         </div>
        
//         <div style="width: 70px;">
//             <input type="text" class="sk-thu" value="${thuHienTai}" readonly style="width: 100%; padding: 6px; border: 1px solid #e9ecef; border-radius: 4px; font-size: 11px; font-weight: bold; background: #e9ecef; color: #495057; text-align: center; box-sizing: border-box;">
//         </div>
        
//         <div style="width: 75px;">
//             <select class="sk-buoi" style="width: 100%; padding: 6px; border: 1px solid #ccc; border-radius: 4px; font-size: 11px; outline: none; cursor:pointer; box-sizing: border-box;">
//                 <option value="Sáng" ${buoiHienTai === 'Sáng' ? 'selected' : ''}>Sáng</option>
//                 <option value="Trưa" ${buoiHienTai === 'Trưa' ? 'selected' : ''}>Trưa</option>
//                 <option value="Chiều" ${buoiHienTai === 'Chiều' ? 'selected' : ''}>Chiều</option>
//                 <option value="Tối" ${buoiHienTai === 'Tối' ? 'selected' : ''}>Tối</option>
//             </select>
//         </div>
        
//         <div style="flex: 1.5; min-width: 180px;">
//             <div style="display:flex; align-items:center; gap:4px; border:1px solid #e83e8c; border-radius:4px; padding:2px 4px; background:#fdf5f8;">
//                 <img class="avatar-preview" src="" style="width:16px; height:16px; border-radius:50%; object-fit:cover; display:none; border:1px solid #eee;">
//                 <input class="sk-hs" placeholder="👤 Gõ tìm học sinh..." style="border:none; outline:none; width:100%; font-size:11px; font-weight:bold; background:transparent; color:#e83e8c;">
//             </div>
//         </div>

//         <div style="flex: 1.5; min-width: 180px;">
//             <input class="sk-loi" list="gvcn-dl-loi" placeholder="🚨 Chọn hoặc Gõ lỗi..." onchange="window.ham_21_40_tu_dong_dien_diem(this)" style="width: 100%; padding: 6px; border: 1px solid #ccc; border-radius: 4px; font-size: 11px; font-weight:bold; outline: none; box-sizing: border-box;">
//         </div>

//         <div style="width: 60px;">
//             <input type="number" step="0.5" class="sk-diem-tru" value="0" style="width: 100%; padding: 6px; border: 1px solid #ffeeba; background: #fff3cd; border-radius: 4px; font-size: 12px; font-weight: bold; color: #dc3545; text-align: center; outline: none; box-sizing: border-box;">
//         </div>

//         <div style="flex: 1; min-width: 120px;">
//             <input class="sk-ghichu" placeholder="Ghi chú..." style="width: 100%; padding: 6px; border: 1px solid #ccc; border-radius: 4px; font-size: 11px; outline: none; box-sizing: border-box;">
//         </div>

//         <!-- Ảnh dòng này -->
//         <div style="width: 70px; display:flex; justify-content:center; align-items:center;">
//             <button type="button" class="btn-anh-sk-dong" onclick="this.nextElementSibling.click()" style="padding: 4px; background: #e0f7fa; color: #00838f; border: 1px dashed #00acc1; border-radius: 4px; cursor: pointer; font-size: 14px;" title="Thêm ảnh">📷</button>
//             <input type="file" accept="image/*" class="input-anh-sk-dong" style="display:none;" onchange="if(typeof window.ham_21_33_chon_anh_sk_dong === 'function') window.ham_21_33_chon_anh_sk_dong(this)">
//             <div class="vung-preview-anh-sk-dong" style="display: flex; gap: 2px; align-items: center; overflow-x: auto; max-width: 50px;"></div>
//         </div>

//         <!-- Xóa dòng này -->
//         <div style="width: 40px; display:flex; justify-content:center;">
//             <button type="button" onclick="this.closest('.dong-nhap-su-kien').remove()" style="padding: 4px; background: #f8d7da; color: #dc3545; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;" title="Xóa dòng">✖</button>
//         </div>
//     `;
//     khuVuc.appendChild(div);

//     if (typeof window.ham_21_8_kich_hoat_xu_ly_anh === 'function') {
//         window.ham_21_8_kich_hoat_xu_ly_anh();
//     }
//     if (typeof window.ham_20_7_tai_danh_sach_lop === 'function') {
//         window.ham_20_7_tai_danh_sach_lop();
//     }
// };



// // =====================================================================
// // HÀM 21.4: TẠO DÒNG SỰ KIỆN VÀ GẮN LẮNG NGHE "DÒNG HIỆN HÀNH"
// // =====================================================================
// window.ham_21_4_them_dong_su_kien = function () {
//     const khuVuc = document.getElementById('gvcn-khu-vuc-su-kien-nhanh');
//     if (!khuVuc) return;

//     let ngayHienTai = new Date().toISOString().split('T')[0];
//     let buoiHienTai = 'Sáng';

//     let dongCuoi = khuVuc.lastElementChild;
//     if (dongCuoi) {
//         ngayHienTai = dongCuoi.querySelector('.sk-ngay').value || ngayHienTai;
//         buoiHienTai = dongCuoi.querySelector('.sk-buoi').value || buoiHienTai;
//     }

//     const thuHienTai = window.ham_21_39_lay_thu_trong_tuần ? window.ham_21_39_lay_thu_trong_tuần(ngayHienTai) : 'Thứ Hai';

//     const div = document.createElement('div');
//     // Gắn sẵn class dong-dang-chon cho dòng vừa tạo
//     div.className = 'dong-nhap-su-kien dong-dang-chon';
//     div.style.cssText = 'display: flex; gap: 5px; align-items: center; background: #fff; padding: 6px; border-radius: 6px; border: 1px solid #e83e8c; box-shadow: 0 0 5px rgba(232, 62, 140, 0.3); animation: fadeIn 0.2s; cursor: pointer;';

//     // Gắn sự kiện click để đánh dấu dòng này
//     div.onclick = function () { window.ham_21_41_danh_dau_dong(this); };

//     div.innerHTML = `
//         <div style="width: 120px;">
//             <input type="date" class="sk-ngay" value="${ngayHienTai}" onchange="let thu = window.ham_21_39_lay_thu_trong_tuần ? window.ham_21_39_lay_thu_trong_tuần(this.value) : ''; this.closest('.dong-nhap-su-kien').querySelector('.sk-thu').value = thu;" style="width: 100%; padding: 6px; border: 1px solid #ccc; border-radius: 4px; font-size: 11px; outline: none; font-weight:bold; box-sizing: border-box;">
//         </div>
        
//         <div style="width: 70px;">
//             <input type="text" class="sk-thu" value="${thuHienTai}" readonly style="width: 100%; padding: 6px; border: 1px solid #e9ecef; border-radius: 4px; font-size: 11px; font-weight: bold; background: #e9ecef; color: #495057; text-align: center; box-sizing: border-box;">
//         </div>
        
//         <div style="width: 75px;">
//             <select class="sk-buoi" style="width: 100%; padding: 6px; border: 1px solid #ccc; border-radius: 4px; font-size: 11px; outline: none; cursor:pointer; box-sizing: border-box;">
//                 <option value="Sáng" ${buoiHienTai === 'Sáng' ? 'selected' : ''}>Sáng</option>
//                 <option value="Trưa" ${buoiHienTai === 'Trưa' ? 'selected' : ''}>Trưa</option>
//                 <option value="Chiều" ${buoiHienTai === 'Chiều' ? 'selected' : ''}>Chiều</option>
//                 <option value="Tối" ${buoiHienTai === 'Tối' ? 'selected' : ''}>Tối</option>
//             </select>
//         </div>
        
//         <div style="flex: 1.5; min-width: 180px;">
//             <div style="display:flex; align-items:center; gap:4px; border:1px solid #e83e8c; border-radius:4px; padding:2px 4px; background:#fdf5f8;">
//                 <img class="avatar-preview" src="" style="width:16px; height:16px; border-radius:50%; object-fit:cover; display:none; border:1px solid #eee;">
//                 <input class="sk-hs" placeholder="👤 Gõ tìm học sinh..." style="border:none; outline:none; width:100%; font-size:11px; font-weight:bold; background:transparent; color:#e83e8c;">
//             </div>
//         </div>

//         <div style="flex: 1.5; min-width: 180px;">
//             <input class="sk-loi" list="gvcn-dl-loi" placeholder="🚨 Chọn lỗi bảng dưới hoặc Gõ..." onchange="window.ham_21_40_tu_dong_dien_diem(this)" style="width: 100%; padding: 6px; border: 1px dashed #e83e8c; border-radius: 4px; font-size: 11px; font-weight:bold; color: #e83e8c; outline: none; box-sizing: border-box;">
//         </div>

//         <div style="width: 60px;">
//             <input type="number" step="0.5" class="sk-diem-tru" value="0" style="width: 100%; padding: 6px; border: 1px solid #ffeeba; background: #fff3cd; border-radius: 4px; font-size: 12px; font-weight: bold; color: #dc3545; text-align: center; outline: none; box-sizing: border-box;">
//         </div>

//         <div style="flex: 1; min-width: 120px;">
//             <input class="sk-ghichu" placeholder="Ghi chú..." style="width: 100%; padding: 6px; border: 1px solid #ccc; border-radius: 4px; font-size: 11px; outline: none; box-sizing: border-box;">
//         </div>

//         <div style="width: 70px; display:flex; justify-content:center; align-items:center;">
//             <button type="button" class="btn-anh-sk-dong" onclick="event.stopPropagation(); this.nextElementSibling.click()" style="padding: 4px; background: #e0f7fa; color: #00838f; border: 1px dashed #00acc1; border-radius: 4px; cursor: pointer; font-size: 14px;" title="Thêm ảnh">📷</button>
//             <input type="file" accept="image/*" class="input-anh-sk-dong" style="display:none;" onchange="if(typeof window.ham_21_33_chon_anh_sk_dong === 'function') window.ham_21_33_chon_anh_sk_dong(this)">
//             <div class="vung-preview-anh-sk-dong" style="display: flex; gap: 2px; align-items: center; overflow-x: auto; max-width: 50px;"></div>
//         </div>

//         <div style="width: 40px; display:flex; justify-content:center;">
//             <button type="button" onclick="event.stopPropagation(); this.closest('.dong-nhap-su-kien').remove()" style="padding: 4px; background: #f8d7da; color: #dc3545; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;" title="Xóa dòng">✖</button>
//         </div>
//     `;

//     // Tự động tắt viền đỏ của các dòng cũ trước khi thêm dòng mới
//     window.ham_21_41_danh_dau_dong(div);
//     khuVuc.appendChild(div);

//     if (typeof window.ham_21_8_kich_hoat_xu_ly_anh === 'function') window.ham_21_8_kich_hoat_xu_ly_anh();
//     if (typeof window.ham_20_7_tai_danh_sach_lop === 'function') window.ham_20_7_tai_danh_sach_lop();
// };


// // =====================================================================
// // HÀM 21.4: TẠO DÒNG SỰ KIỆN (AUTO-RESIZE XUỐNG DÒNG, TỐI ĐA 5 DÒNG, ẢNH TO X3)
// // =====================================================================
// window.ham_21_4_them_dong_su_kien = function () {
//     const khuVuc = document.getElementById('gvcn-khu-vuc-su-kien-nhanh');
//     if (!khuVuc) return;

//     let ngayHienTai = new Date().toISOString().split('T')[0];
//     let buoiHienTai = 'Sáng';

//     let dongCuoi = khuVuc.lastElementChild;
//     if (dongCuoi) {
//         ngayHienTai = dongCuoi.querySelector('.sk-ngay').value || ngayHienTai;
//         buoiHienTai = dongCuoi.querySelector('.sk-buoi').value || buoiHienTai;
//     }

//     const thuHienTai = window.ham_21_39_lay_thu_trong_tuần ? window.ham_21_39_lay_thu_trong_tuần(ngayHienTai) : 'Thứ Hai';

//     const div = document.createElement('div');
//     div.className = 'dong-nhap-su-kien dong-dang-chon';

//     // 🌟 Đổi align-items thành flex-start để khi ô chữ phình xuống, các ô khác vẫn bám lề trên
//     div.style.cssText = 'display: flex; gap: 5px; align-items: flex-start; background: #fff; padding: 6px; border-radius: 6px; border: 1px solid #e83e8c; box-shadow: 0 0 5px rgba(232, 62, 140, 0.3); animation: fadeIn 0.2s; cursor: pointer;';

//     div.onclick = function () { window.ham_21_41_danh_dau_dong(this); };

//     // CSS cố định cho các ô Ngắn (Ngày, Thứ, Buổi, Điểm)
//     const cssInput = "width: 100%; height: 28px; padding: 0 6px; margin: 0; border: 1px solid #ccc; border-radius: 4px; font-size: 11px; outline: none; box-sizing: border-box;";

//     // 🌟 CSS THÔNG MINH CHO CÁC Ô CHỮ (Tự động xuống dòng, Max 5 dòng ~ 85px)
//     const cssTA = "width: 100%; min-height: 28px; height: 28px; padding: 6px; margin: 0; border: 1px solid #ccc; border-radius: 4px; font-size: 11px; outline: none; box-sizing: border-box; resize: none; overflow-y: auto; max-height: 85px; line-height: 1.4; font-family: inherit;";

//     // Đoạn Script nội tuyến giúp Textarea tự phình to khi gõ
//     const autoResizeJS = "this.style.height='28px'; this.style.height=(this.scrollHeight)+'px';";

//     div.innerHTML = `
//         <div style="width: 120px;">
//             <input type="date" class="sk-ngay" value="${ngayHienTai}" onchange="let thu = window.ham_21_39_lay_thu_trong_tuần ? window.ham_21_39_lay_thu_trong_tuần(this.value) : ''; this.closest('.dong-nhap-su-kien').querySelector('.sk-thu').value = thu;" style="${cssInput} font-weight:bold;">
//         </div>
        
//         <div style="width: 70px;">
//             <input type="text" class="sk-thu" value="${thuHienTai}" readonly style="${cssInput} font-weight: bold; background: #e9ecef; border-color: #e9ecef; color: #495057; text-align: center;">
//         </div>
        
//         <div style="width: 75px;">
//             <select class="sk-buoi" style="${cssInput} cursor:pointer;">
//                 <option value="Sáng" ${buoiHienTai === 'Sáng' ? 'selected' : ''}>Sáng</option>
//                 <option value="Trưa" ${buoiHienTai === 'Trưa' ? 'selected' : ''}>Trưa</option>
//                 <option value="Chiều" ${buoiHienTai === 'Chiều' ? 'selected' : ''}>Chiều</option>
//                 <option value="Tối" ${buoiHienTai === 'Tối' ? 'selected' : ''}>Tối</option>
//             </select>
//         </div>
        
//         <!-- Ô Học sinh: Cấu trúc Textarea tự giãn -->
//         <div style="flex: 1.5; min-width: 180px;">
//             <div style="display:flex; align-items:flex-start; gap:4px; border:1px solid #e83e8c; border-radius:4px; padding:0 4px; background:#fdf5f8; min-height: 28px; box-sizing: border-box;">
//                 <img class="avatar-preview" src="" style="width:16px; height:16px; border-radius:50%; object-fit:cover; display:none; margin-top: 5px;">
//                 <textarea class="sk-hs" placeholder="👤 Gõ tìm học sinh..." style="${cssTA} border:none; background:transparent; color:#e83e8c; font-weight:bold; padding: 6px 2px;" oninput="${autoResizeJS}"></textarea>
//             </div>
//         </div>

//         <!-- Ô Sự Kiện: Textarea tự giãn -->
//         <div style="flex: 1.5; min-width: 180px;">
//             <textarea class="sk-loi" placeholder="🚨 Chọn lỗi dưới hoặc Gõ..." onchange="window.ham_21_40_tu_dong_dien_diem(this)" oninput="${autoResizeJS} window.ham_21_40_tu_dong_dien_diem(this)" style="${cssTA} border: 1px dashed #e83e8c; color: #e83e8c; font-weight:bold;"></textarea>
//         </div>

//         <div style="width: 60px;">
//             <input type="number" step="0.5" class="sk-diem-tru" value="0" style="${cssInput} border: 1px solid #ffeeba; background: #fff3cd; font-weight: bold; color: #dc3545; text-align: center;">
//         </div>

//         <!-- Ô Ghi chú: Textarea tự giãn -->
//         <div style="flex: 1; min-width: 120px;">
//             <textarea class="sk-ghichu" placeholder="Ghi chú..." style="${cssTA}" oninput="${autoResizeJS}"></textarea>
//         </div>

//         <!-- Khu vực Ảnh: Cho phép mở rộng bề ngang để chứa ảnh to -->
//         <div style="width: 130px; display:flex; justify-content:center; align-items:flex-start; min-height: 28px;">
//             <button type="button" class="btn-anh-sk-dong" onclick="event.stopPropagation(); this.nextElementSibling.click()" style="height: 28px; padding: 0 8px; background: #e0f7fa; color: #00838f; border: 1px dashed #00acc1; border-radius: 4px; cursor: pointer; font-size: 14px; display:flex; align-items:center;" title="Thêm ảnh">📷</button>
//             <input type="file" accept="image/*" class="input-anh-sk-dong" style="display:none;" onchange="if(typeof window.ham_21_33_chon_anh_sk_dong === 'function') window.ham_21_33_chon_anh_sk_dong(this)">
//             <div class="vung-preview-anh-sk-dong" style="display: flex; gap: 4px; align-items: flex-start; overflow-x: auto; max-width: 105px; margin-left:6px;"></div>
//         </div>

//         <div style="width: 40px; display:flex; justify-content:center; align-items:flex-start; min-height: 28px;">
//             <button type="button" onclick="event.stopPropagation(); this.closest('.dong-nhap-su-kien').remove()" style="height: 28px; width: 28px; background: #f8d7da; color: #dc3545; border: none; border-radius: 4px; cursor: pointer; font-size: 12px; display:flex; align-items:center; justify-content:center;" title="Xóa dòng">✖</button>
//         </div>
//     `;

//     window.ham_21_41_danh_dau_dong(div);
//     khuVuc.appendChild(div);

//     if (typeof window.ham_21_8_kich_hoat_xu_ly_anh === 'function') window.ham_21_8_kich_hoat_xu_ly_anh();
//     if (typeof window.ham_20_7_tai_danh_sach_lop === 'function') window.ham_20_7_tai_danh_sach_lop();
// };



// // =====================================================================
// // HÀM 21.4: TẠO DÒNG SỰ KIỆN (MẶC ĐỊNH LẤY NGÀY CỦA TUẦN & NỚI CỘT ĐIỂM)
// // =====================================================================
// window.ham_21_4_them_dong_su_kien = function () {
//     const khuVuc = document.getElementById('gvcn-khu-vuc-su-kien-nhanh');
//     if (!khuVuc) return;

//     // 🌟 Lấy ngày mặc định là Thứ 2 của Tuần đang chọn (nếu có), nếu không mới lấy ngày hôm nay
//     let tuNgayInput = document.getElementById('gvcn-sk-tuan-tu');
//     let ngayHienTai = (tuNgayInput && tuNgayInput.value) ? tuNgayInput.value : new Date().toISOString().split('T')[0];
//     let buoiHienTai = 'Sáng';

//     // Nếu có dòng cuối thì ưu tiên lấy theo dòng cuối để nhập liệu liên tục được đồng nhất
//     let dongCuoi = khuVuc.lastElementChild;
//     if (dongCuoi) {
//         ngayHienTai = dongCuoi.querySelector('.sk-ngay').value || ngayHienTai;
//         buoiHienTai = dongCuoi.querySelector('.sk-buoi').value || buoiHienTai;
//     }

//     const thuHienTai = window.ham_21_39_lay_thu_trong_tuần ? window.ham_21_39_lay_thu_trong_tuần(ngayHienTai) : 'Thứ Hai';

//     const div = document.createElement('div');
//     div.className = 'dong-nhap-su-kien dong-dang-chon';
//     div.style.cssText = 'display: flex; gap: 5px; align-items: flex-start; background: #fff; padding: 6px; border-radius: 6px; border: 1px solid #e83e8c; box-shadow: 0 0 5px rgba(232, 62, 140, 0.3); animation: fadeIn 0.2s; cursor: pointer;';

//     div.onclick = function () { window.ham_21_41_danh_dau_dong(this); };

//     const cssInput = "width: 100%; height: 28px; padding: 0 6px; margin: 0; border: 1px solid #ccc; border-radius: 4px; font-size: 11px; outline: none; box-sizing: border-box;";
//     const cssTA = "width: 100%; min-height: 28px; height: 28px; padding: 6px; margin: 0; border: 1px solid #ccc; border-radius: 4px; font-size: 11px; outline: none; box-sizing: border-box; resize: none; overflow-y: auto; max-height: 85px; line-height: 1.4; font-family: inherit;";
//     const autoResizeJS = "this.style.height='28px'; this.style.height=(this.scrollHeight)+'px';";

//     div.innerHTML = `
//         <div style="width: 120px;">
//             <input type="date" class="sk-ngay" value="${ngayHienTai}" onchange="let thu = window.ham_21_39_lay_thu_trong_tuần ? window.ham_21_39_lay_thu_trong_tuần(this.value) : ''; this.closest('.dong-nhap-su-kien').querySelector('.sk-thu').value = thu;" style="${cssInput} font-weight:bold;">
//         </div>
        
//         <div style="width: 70px;">
//             <input type="text" class="sk-thu" value="${thuHienTai}" readonly style="${cssInput} font-weight: bold; background: #e9ecef; border-color: #e9ecef; color: #495057; text-align: center;">
//         </div>
        
//         <div style="width: 75px;">
//             <select class="sk-buoi" style="${cssInput} cursor:pointer;">
//                 <option value="Sáng" ${buoiHienTai === 'Sáng' ? 'selected' : ''}>Sáng</option>
//                 <option value="Trưa" ${buoiHienTai === 'Trưa' ? 'selected' : ''}>Trưa</option>
//                 <option value="Chiều" ${buoiHienTai === 'Chiều' ? 'selected' : ''}>Chiều</option>
//                 <option value="Tối" ${buoiHienTai === 'Tối' ? 'selected' : ''}>Tối</option>
//             </select>
//         </div>
        
//         <div style="flex: 1.5; min-width: 180px;">
//             <div style="display:flex; align-items:flex-start; gap:4px; border:1px solid #e83e8c; border-radius:4px; padding:0 4px; background:#fdf5f8; min-height: 28px; box-sizing: border-box;">
//                 <img class="avatar-preview" src="" style="width:16px; height:16px; border-radius:50%; object-fit:cover; display:none; margin-top: 5px;">
//                 <textarea class="sk-hs" placeholder="👤 Gõ tìm học sinh..." style="${cssTA} border:none; background:transparent; color:#e83e8c; font-weight:bold; padding: 6px 2px;" oninput="${autoResizeJS}"></textarea>
//             </div>
//         </div>

//         <div style="flex: 1.5; min-width: 180px;">
//             <textarea class="sk-loi" placeholder="🚨 Chọn lỗi dưới hoặc Gõ..." onchange="window.ham_21_40_tu_dong_dien_diem(this)" oninput="${autoResizeJS} window.ham_21_40_tu_dong_dien_diem(this)" style="${cssTA} border: 1px dashed #e83e8c; color: #e83e8c; font-weight:bold;"></textarea>
//         </div>

//         <!-- 🌟 Nới rộng khu vực Điểm lên 80px để chứa dấu trừ (-1.5) thoải mái -->
//         <div style="width: 80px;">
//             <input type="number" step="0.5" class="sk-diem-tru" value="0" style="${cssInput} border: 1px solid #ffeeba; background: #fff3cd; font-weight: bold; color: #dc3545; text-align: center;">
//         </div>

//         <div style="flex: 1; min-width: 120px;">
//             <textarea class="sk-ghichu" placeholder="Ghi chú..." style="${cssTA}" oninput="${autoResizeJS}"></textarea>
//         </div>

//         <div style="width: 130px; display:flex; justify-content:center; align-items:flex-start; min-height: 28px;">
//             <button type="button" class="btn-anh-sk-dong" onclick="event.stopPropagation(); this.nextElementSibling.click()" style="height: 28px; padding: 0 8px; background: #e0f7fa; color: #00838f; border: 1px dashed #00acc1; border-radius: 4px; cursor: pointer; font-size: 14px; display:flex; align-items:center;" title="Thêm ảnh">📷</button>
//             <input type="file" accept="image/*" class="input-anh-sk-dong" style="display:none;" onchange="if(typeof window.ham_21_33_chon_anh_sk_dong === 'function') window.ham_21_33_chon_anh_sk_dong(this)">
//             <div class="vung-preview-anh-sk-dong" style="display: flex; gap: 4px; align-items: flex-start; overflow-x: auto; max-width: 105px; margin-left:6px;"></div>
//         </div>

//         <div style="width: 40px; display:flex; justify-content:center; align-items:flex-start; min-height: 28px;">
//             <button type="button" onclick="event.stopPropagation(); this.closest('.dong-nhap-su-kien').remove()" style="height: 28px; width: 28px; background: #f8d7da; color: #dc3545; border: none; border-radius: 4px; cursor: pointer; font-size: 12px; display:flex; align-items:center; justify-content:center;" title="Xóa dòng">✖</button>
//         </div>
//     `;

//     window.ham_21_41_danh_dau_dong(div);
//     khuVuc.appendChild(div);

//     if (typeof window.ham_21_8_kich_hoat_xu_ly_anh === 'function') window.ham_21_8_kich_hoat_xu_ly_anh();
//     if (typeof window.ham_20_7_tai_danh_sach_lop === 'function') window.ham_20_7_tai_danh_sach_lop();
// };


// // =====================================================================
// // HÀM 21.4: TẠO DÒNG SỰ KIỆN (BỔ SUNG TÍNH NĂNG LOAD DATA TỪ CSDL NẾU CÓ)
// // =====================================================================
// window.ham_21_4_them_dong_su_kien = function (skData = null) {
//     const khuVuc = document.getElementById('gvcn-khu-vuc-su-kien-nhanh');
//     if (!khuVuc) return;

//     let ngayHienTai = new Date().toISOString().split('T')[0];
//     let buoiHienTai = 'Sáng';

//     let tuNgayInput = document.getElementById('gvcn-sk-tuan-tu');
//     if (tuNgayInput && tuNgayInput.value) ngayHienTai = tuNgayInput.value;

//     let dongCuoi = khuVuc.lastElementChild;
//     if (dongCuoi && !skData) {
//         ngayHienTai = dongCuoi.querySelector('.sk-ngay').value || ngayHienTai;
//         buoiHienTai = dongCuoi.querySelector('.sk-buoi').value || buoiHienTai;
//     }

//     // 🌟 KHỞI TẠO BIẾN CHO TRƯỜNG HỢP CÓ DỮ LIỆU CŨ ĐỂ LOAD LÊN
//     let idSuKien = '';
//     let hsGhep = '';
//     let hsAvatar = '';
//     let loiVal = '';
//     let diemTruVal = 0;
//     let ghiChuVal = '';
//     let mangAnhArr = [];

//     if (skData) {
//         idSuKien = skData.id;
//         ngayHienTai = skData.ngay_ghi_nhan || ngayHienTai;

//         let m = skData.noi_dung_chi_tiet.match(/Buổi (Sáng|Trưa|Chiều|Tối)/);
//         if (m) buoiHienTai = m[1];

//         hsGhep = skData.ten_hoc_sinh + (skData.ten_dang_nhap_hoc_sinh ? ` - ${skData.ten_dang_nhap_hoc_sinh}` : '');
//         if (window.DanhSachHocSinhLopHienTai) {
//             let hsObj = window.DanhSachHocSinhLopHienTai.find(h => h.uid === skData.uid_hoc_sinh);
//             if (hsObj) hsAvatar = hsObj.avatarUrl;
//         }

//         loiVal = skData.nhom_su_kien || '';

//         if (skData.thong_tin_mo_rong) {
//             diemTruVal = skData.thong_tin_mo_rong.diem_tru || 0;
//             let dsAnh = skData.thong_tin_mo_rong.danh_sach_anh_minh_chung || [];
//             dsAnh.forEach(link => {
//                 mangAnhArr.push({ b64: link, type: 'url', size: 0 }); // Lưu dạng URL để giữ lại link Drive
//             });
//         }

//         let idxGC = skData.noi_dung_chi_tiet.indexOf('- Ghi chú: ');
//         if (idxGC > -1) {
//             let part = skData.noi_dung_chi_tiet.substring(idxGC + 11);
//             let idxDiem = part.indexOf(' - Điểm:');
//             if (idxDiem > -1) part = part.substring(0, idxDiem);
//             ghiChuVal = part.trim();
//         }
//     }

//     const thuHienTai = window.ham_21_39_lay_thu_trong_tuần ? window.ham_21_39_lay_thu_trong_tuần(ngayHienTai) : 'Thứ Hai';

//     const div = document.createElement('div');
//     if (idSuKien) div.dataset.id = idSuKien; // 🌟 Lưu ID ẩn để LƯU bằng chế độ UPSERT
//     if (mangAnhArr.length > 0) div.dataset.mangAnhDong = JSON.stringify(mangAnhArr);

//     // Nếu là dòng nạp từ CSDL thì tắt viền đỏ đi
//     div.className = 'dong-nhap-su-kien ' + (!skData ? 'dong-dang-chon' : '');
//     let bgClass = skData ? '#fff' : '#fdf5f8';
//     let borderClass = skData ? '#ced4da' : '#e83e8c';
//     let shadowClass = skData ? 'none' : '0 0 5px rgba(232, 62, 140, 0.3)';

//     div.style.cssText = `display: flex; gap: 5px; align-items: flex-start; background: ${bgClass}; padding: 6px; border-radius: 6px; border: 1px solid ${borderClass}; box-shadow: ${shadowClass}; animation: fadeIn 0.2s; cursor: pointer;`;

//     div.onclick = function () { window.ham_21_41_danh_dau_dong(this); };

//     const cssInput = "width: 100%; height: 28px; padding: 0 6px; margin: 0; border: 1px solid #ccc; border-radius: 4px; font-size: 11px; outline: none; box-sizing: border-box;";
//     const cssTA = "width: 100%; min-height: 28px; height: 28px; padding: 6px; margin: 0; border: 1px solid #ccc; border-radius: 4px; font-size: 11px; outline: none; box-sizing: border-box; resize: none; overflow-y: auto; max-height: 85px; line-height: 1.4; font-family: inherit;";
//     const autoResizeJS = "this.style.height='28px'; this.style.height=(this.scrollHeight)+'px';";

//     // Xử lý hiển thị Thumbnail ảnh Drive cũ
//     let htmlAnh = '';
//     mangAnhArr.forEach((imgObj, idx) => {
//         let srcImg = imgObj.b64;
//         if (imgObj.type === 'url') {
//             let m = srcImg.match(/\/d\/([a-zA-Z0-9_-]+)/);
//             if (m) srcImg = `https://drive.google.com/thumbnail?id=${m[1]}&sz=w150`;
//         }
//         htmlAnh += `
//         <div style="position:relative; margin-bottom: 2px;">
//             <img src="${srcImg}" onclick="window.open('${imgObj.b64}', '_blank')" style="width:105px; height:105px; object-fit:cover; border-radius:6px; border:1px solid #ccc; box-shadow:0 1px 3px rgba(0,0,0,0.2); cursor:pointer;" title="Bấm xem ảnh gốc">
//             <button type="button" onclick="let d=this.closest('.dong-nhap-su-kien'); let a=JSON.parse(d.dataset.mangAnhDong); a.splice(${idx},1); d.dataset.mangAnhDong=JSON.stringify(a); this.closest('div').remove();" style="position:absolute; top:-6px; right:-6px; background:#dc3545; color:#fff; border:none; border-radius:50%; width:20px; height:20px; font-size:12px; cursor:pointer; display:flex; align-items:center; justify-content:center; box-shadow:0 1px 3px rgba(0,0,0,0.3);" title="Xóa ảnh này">✖</button>
//         </div>`;
//     });

//     div.innerHTML = `
//         <div style="width: 120px;">
//             <input type="date" class="sk-ngay" value="${ngayHienTai}" onchange="let thu = window.ham_21_39_lay_thu_trong_tuần ? window.ham_21_39_lay_thu_trong_tuần(this.value) : ''; this.closest('.dong-nhap-su-kien').querySelector('.sk-thu').value = thu;" style="${cssInput} font-weight:bold;">
//         </div>
        
//         <div style="width: 70px;">
//             <input type="text" class="sk-thu" value="${thuHienTai}" readonly style="${cssInput} font-weight: bold; background: #e9ecef; border-color: #e9ecef; color: #495057; text-align: center;">
//         </div>
        
//         <div style="width: 75px;">
//             <select class="sk-buoi" style="${cssInput} cursor:pointer;">
//                 <option value="Sáng" ${buoiHienTai === 'Sáng' ? 'selected' : ''}>Sáng</option>
//                 <option value="Trưa" ${buoiHienTai === 'Trưa' ? 'selected' : ''}>Trưa</option>
//                 <option value="Chiều" ${buoiHienTai === 'Chiều' ? 'selected' : ''}>Chiều</option>
//                 <option value="Tối" ${buoiHienTai === 'Tối' ? 'selected' : ''}>Tối</option>
//             </select>
//         </div>
        
//         <div style="flex: 1.5; min-width: 180px;">
//             <div style="display:flex; align-items:flex-start; gap:4px; border:1px solid #e83e8c; border-radius:4px; padding:0 4px; background:#fdf5f8; min-height: 28px; box-sizing: border-box;">
//                 <img class="avatar-preview" src="${hsAvatar}" style="width:16px; height:16px; border-radius:50%; object-fit:cover; display:${hsAvatar ? 'block' : 'none'}; margin-top: 5px;">
//                 <textarea class="sk-hs" placeholder="👤 Gõ tìm học sinh..." style="${cssTA} border:none; background:transparent; color:#e83e8c; font-weight:bold; padding: 6px 2px;" oninput="${autoResizeJS}">${hsGhep}</textarea>
//             </div>
//         </div>

//         <div style="flex: 1.5; min-width: 180px;">
//             <textarea class="sk-loi" placeholder="🚨 Chọn lỗi dưới hoặc Gõ..." onchange="window.ham_21_40_tu_dong_dien_diem(this)" oninput="${autoResizeJS} window.ham_21_40_tu_dong_dien_diem(this)" style="${cssTA} border: 1px dashed #e83e8c; color: #e83e8c; font-weight:bold;">${loiVal}</textarea>
//         </div>

//         <div style="width: 80px;">
//             <input type="number" step="0.5" class="sk-diem-tru" value="${diemTruVal}" style="${cssInput} border: 1px solid #ffeeba; background: #fff3cd; font-weight: bold; color: #dc3545; text-align: center;">
//         </div>

//         <div style="flex: 1; min-width: 120px;">
//             <textarea class="sk-ghichu" placeholder="Ghi chú..." style="${cssTA}" oninput="${autoResizeJS}">${ghiChuVal}</textarea>
//         </div>

//         <div style="width: 130px; display:flex; justify-content:center; align-items:flex-start; min-height: 28px;">
//             <button type="button" class="btn-anh-sk-dong" onclick="event.stopPropagation(); this.nextElementSibling.click()" style="height: 28px; padding: 0 8px; background: #e0f7fa; color: #00838f; border: 1px dashed #00acc1; border-radius: 4px; cursor: pointer; font-size: 14px; display:flex; align-items:center;" title="Thêm ảnh">📷</button>
//             <input type="file" accept="image/*" class="input-anh-sk-dong" style="display:none;" onchange="if(typeof window.ham_21_33_chon_anh_sk_dong === 'function') window.ham_21_33_chon_anh_sk_dong(this)">
//             <div class="vung-preview-anh-sk-dong" style="display: flex; gap: 4px; align-items: flex-start; overflow-x: auto; max-width: 105px; margin-left:6px;">${htmlAnh}</div>
//         </div>

//         <div style="width: 40px; display:flex; justify-content:center; align-items:flex-start; min-height: 28px;">
//             <button type="button" onclick="event.stopPropagation(); this.closest('.dong-nhap-su-kien').remove()" style="height: 28px; width: 28px; background: #f8d7da; color: #dc3545; border: none; border-radius: 4px; cursor: pointer; font-size: 12px; display:flex; align-items:center; justify-content:center;" title="Xóa dòng">✖</button>
//         </div>
//     `;

//     if (!skData) window.ham_21_41_danh_dau_dong(div);
//     khuVuc.appendChild(div);

//     // Kích hoạt Textarea tự động giãn ngay lúc load
//     setTimeout(() => {
//         div.querySelectorAll('textarea').forEach(ta => {
//             if (ta.value) {
//                 ta.style.height = '28px';
//                 ta.style.height = ta.scrollHeight + 'px';
//             }
//         });
//     }, 100);

//     if (typeof window.ham_21_8_kich_hoat_xu_ly_anh === 'function') window.ham_21_8_kich_hoat_xu_ly_anh();
//     if (typeof window.ham_20_7_tai_danh_sach_lop === 'function') window.ham_20_7_tai_danh_sach_lop();
// };

// =====================================================================
// HÀM 21.4: TẠO DÒNG SỰ KIỆN (GỘP THỜI GIAN VÀO 2 DÒNG)
// =====================================================================
window.ham_21_4_them_dong_su_kien = function (skData = null) {
    const khuVuc = document.getElementById('gvcn-khu-vuc-su-kien-nhanh');
    if (!khuVuc) return;

    let ngayHienTai = new Date().toISOString().split('T')[0];
    let buoiHienTai = 'Sáng';

    let tuNgayInput = document.getElementById('gvcn-sk-tuan-tu');
    if (tuNgayInput && tuNgayInput.value) ngayHienTai = tuNgayInput.value;

    let dongCuoi = khuVuc.lastElementChild;
    if (dongCuoi && !skData) {
        ngayHienTai = dongCuoi.querySelector('.sk-ngay').value || ngayHienTai;
        buoiHienTai = dongCuoi.querySelector('.sk-buoi').value || buoiHienTai;
    }

    let idSuKien = ''; let hsGhep = ''; let hsAvatar = '';
    let loiVal = ''; let diemTruVal = 0; let ghiChuVal = '';
    let mangAnhArr = [];

    let xlHtml = '<span style="color:#adb5bd; font-size:10px; font-style:italic;">(Chờ lưu)</span>';
    let statusHtml = '<span style="color:#adb5bd; font-size:11px;">-</span>';

    if (skData) {
        idSuKien = skData.id;
        ngayHienTai = skData.ngay_ghi_nhan || ngayHienTai;

        let m = skData.noi_dung_chi_tiet.match(/Buổi (Sáng|Trưa|Chiều|Tối)/);
        if (m) buoiHienTai = m[1];

        hsGhep = skData.ten_hoc_sinh + (skData.ten_dang_nhap_hoc_sinh ? ` - ${skData.ten_dang_nhap_hoc_sinh}` : '');
        if (window.DanhSachHocSinhLopHienTai) {
            let hsObj = window.DanhSachHocSinhLopHienTai.find(h => h.uid === skData.uid_hoc_sinh);
            if (hsObj) hsAvatar = hsObj.avatarUrl;
        }

        loiVal = skData.nhom_su_kien || '';

        if (skData.thong_tin_mo_rong) {
            diemTruVal = skData.thong_tin_mo_rong.diem_tru || 0;
            let dsAnh = skData.thong_tin_mo_rong.danh_sach_anh_minh_chung || [];
            dsAnh.forEach(link => { mangAnhArr.push({ b64: link, type: 'url', size: 0 }); });

            if (skData.thong_tin_mo_rong.xu_ly) {
                let xlObj = skData.thong_tin_mo_rong.xu_ly;
                let isDone = xlObj.trang_thai === 'Đã hoàn thành';
                let isPartial = xlObj.trang_thai === 'Đã nộp 1 phần';

                let bgXl = isDone ? '#d4edda' : (isPartial ? '#cce5ff' : '#fff3cd');
                let colXl = isDone ? '#155724' : (isPartial ? '#004085' : '#856404');
                let icnXl = isDone ? '✅' : (isPartial ? '🔄' : '⏳');
                let textXl = isDone ? 'Đã xong' : (isPartial ? '1 phần' : 'Chưa xong');
                let bdrXl = isDone ? '#c3e6cb' : (isPartial ? '#b8daff' : '#ffeeba');

                xlHtml = `<div style="font-size:11px; color:#d35400; font-weight:bold; line-height:1.2;">${xlObj.hinh_thuc || ''}</div><div style="font-size:10px; color:#555; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; margin-top:2px;" title="${xlObj.noi_dung || ''}">${xlObj.noi_dung || ''}</div>`;
                statusHtml = `<div onclick="event.stopPropagation(); window.ham_21_51_mo_popup_cap_nhat_xu_ly('${skData.id}')" style="background:${bgXl}; color:${colXl}; padding:4px; border-radius:4px; font-size:10px; font-weight:bold; cursor:pointer; border:1px solid ${bdrXl}; text-align:center; transition:0.2s; box-shadow:0 1px 2px rgba(0,0,0,0.05);" onmouseover="this.style.filter='brightness(0.95)'" onmouseout="this.style.filter='brightness(1)'" title="Bấm cập nhật tiến độ">${icnXl} ${textXl}</div>`;
            } else {
                xlHtml = '<span style="color:#adb5bd; font-size:10px; font-style:italic;">Không</span>';
            }
        }

        let idxGC = skData.noi_dung_chi_tiet.indexOf('- Ghi chú: ');
        if (idxGC > -1) {
            let part = skData.noi_dung_chi_tiet.substring(idxGC + 11);
            let idxDiem = part.indexOf(' - Điểm:');
            if (idxDiem > -1) part = part.substring(0, idxDiem);
            ghiChuVal = part.trim();
        }
    }

    const thuHienTai = window.ham_21_39_lay_thu_trong_tuần ? window.ham_21_39_lay_thu_trong_tuần(ngayHienTai) : 'Thứ Hai';

    const div = document.createElement('div');
    if (idSuKien) div.dataset.id = idSuKien;
    if (mangAnhArr.length > 0) div.dataset.mangAnhDong = JSON.stringify(mangAnhArr);

    div.className = 'dong-nhap-su-kien ' + (!skData ? 'dong-dang-chon' : '');
    let bgClass = skData ? '#fff' : '#fdf5f8';
    let borderClass = skData ? '#ced4da' : '#e83e8c';
    let shadowClass = skData ? 'none' : '0 0 5px rgba(232, 62, 140, 0.3)';

    div.style.cssText = `display: flex; gap: 5px; align-items: flex-start; background: ${bgClass}; padding: 6px; border-radius: 6px; border: 1px solid ${borderClass}; box-shadow: ${shadowClass}; animation: fadeIn 0.2s; cursor: pointer;`;
    div.onclick = function () { window.ham_21_41_danh_dau_dong(this); };

    const cssInput = "width: 100%; height: 26px; padding: 0 4px; margin: 0; border: 1px solid #ccc; border-radius: 4px; font-size: 11px; outline: none; box-sizing: border-box;";
    const cssTA = "width: 100%; min-height: 28px; height: 28px; padding: 6px 4px; margin: 0; border: 1px solid #ccc; border-radius: 4px; font-size: 11px; outline: none; box-sizing: border-box; resize: none; overflow-y: auto; max-height: 86px; line-height: 1.4; font-family: inherit;";
    const autoResizeJS = "this.style.height='28px'; this.style.height=(this.scrollHeight)+'px';";

    let htmlAnh = '';
    mangAnhArr.forEach((imgObj, idx) => {
        let srcImg = imgObj.b64;
        if (imgObj.type === 'url') {
            let m = srcImg.match(/\/d\/([a-zA-Z0-9_-]+)/);
            if (m) srcImg = `https://drive.google.com/thumbnail?id=${m[1]}&sz=w150`;
        }
        htmlAnh += `
        <div style="position:relative; margin-bottom: 2px;">
            <img src="${srcImg}" onclick="window.open('${imgObj.b64}', '_blank')" style="width:105px; height:105px; object-fit:cover; border-radius:6px; border:1px solid #ccc; box-shadow:0 1px 3px rgba(0,0,0,0.2); cursor:pointer;" title="Bấm xem ảnh gốc">
            <button type="button" onclick="let d=this.closest('.dong-nhap-su-kien'); let a=JSON.parse(d.dataset.mangAnhDong); a.splice(${idx},1); d.dataset.mangAnhDong=JSON.stringify(a); this.closest('div').remove();" style="position:absolute; top:-6px; right:-6px; background:#dc3545; color:#fff; border:none; border-radius:50%; width:20px; height:20px; font-size:12px; cursor:pointer; display:flex; align-items:center; justify-content:center; box-shadow:0 1px 3px rgba(0,0,0,0.3);" title="Xóa ảnh này">✖</button>
        </div>`;
    });

    // 🌟 GỘP CỘT THỜI GIAN XUỐNG CÒN 2 DÒNG (NỚI RỘNG KHUNG RA 125PX)
    div.innerHTML = `
        <div style="width: 125px; display: flex; flex-direction: column; gap: 4px;">
            <input type="date" class="sk-ngay" value="${ngayHienTai}" onchange="let thu = window.ham_21_39_lay_thu_trong_tuần ? window.ham_21_39_lay_thu_trong_tuần(this.value) : ''; this.closest('.dong-nhap-su-kien').querySelector('.sk-thu').value = thu;" style="${cssInput} font-weight:bold;">
            <div style="display: flex; gap: 4px;">
                <input type="text" class="sk-thu" value="${thuHienTai}" readonly style="${cssInput} flex: 1; min-width: 0; padding: 0 2px; font-weight: bold; background: #e9ecef; border-color: #e9ecef; color: #495057; text-align: center;">
                <select class="sk-buoi" style="${cssInput} flex: 1; min-width: 0; padding: 0 2px; cursor:pointer;">
                    <option value="Sáng" ${buoiHienTai === 'Sáng' ? 'selected' : ''}>Sáng</option>
                    <option value="Trưa" ${buoiHienTai === 'Trưa' ? 'selected' : ''}>Trưa</option>
                    <option value="Chiều" ${buoiHienTai === 'Chiều' ? 'selected' : ''}>Chiều</option>
                    <option value="Tối" ${buoiHienTai === 'Tối' ? 'selected' : ''}>Tối</option>
                </select>
            </div>
        </div>
        
        <div style="flex: 1.5; min-width: 140px;">
            <div style="display:flex; align-items:flex-start; gap:4px; border:1px solid #e83e8c; border-radius:4px; padding:0 4px; background:#fdf5f8; min-height: 28px; box-sizing: border-box;">
                <img class="avatar-preview" src="${hsAvatar}" style="width:16px; height:16px; border-radius:50%; object-fit:cover; display:${hsAvatar ? 'block' : 'none'}; margin-top: 5px;">
                <textarea class="sk-hs" placeholder="👤 Tên HS..." style="${cssTA} border:none; background:transparent; color:#e83e8c; font-weight:bold; padding: 6px 2px;" oninput="${autoResizeJS}">${hsGhep}</textarea>
            </div>
        </div>

        <div style="flex: 1.5; min-width: 150px;">
            <textarea class="sk-loi" placeholder="🚨 Chọn / Gõ lỗi..." onchange="window.ham_21_40_tu_dong_dien_diem(this)" oninput="${autoResizeJS} window.ham_21_40_tu_dong_dien_diem(this)" style="${cssTA} border: 1px dashed #e83e8c; color: #e83e8c; font-weight:bold;">${loiVal}</textarea>
        </div>

        <div style="width: 50px;">
            <input type="number" step="0.5" class="sk-diem-tru" value="${diemTruVal}" style="${cssInput} border: 1px solid #ffeeba; background: #fff3cd; font-weight: bold; color: #dc3545; text-align: center; height: 28px;">
        </div>

        <div style="width: 80px; display:flex; justify-content:center; align-items:flex-start; min-height: 28px;">
            <button type="button" class="btn-anh-sk-dong" onclick="event.stopPropagation(); this.nextElementSibling.click()" style="height: 28px; padding: 0 8px; background: #e0f7fa; color: #00838f; border: 1px dashed #00acc1; border-radius: 4px; cursor: pointer; font-size: 14px; display:flex; align-items:center;" title="Thêm ảnh">📷</button>
            <input type="file" accept="image/*" class="input-anh-sk-dong" style="display:none;" onchange="if(typeof window.ham_21_33_chon_anh_sk_dong === 'function') window.ham_21_33_chon_anh_sk_dong(this)">
            <div class="vung-preview-anh-sk-dong" style="display: flex; gap: 4px; align-items: flex-start; overflow-x: auto; max-width: 105px; margin-left:6px;">${htmlAnh}</div>
        </div>

        <div style="flex: 1.2; min-width: 120px; display:flex; flex-direction:column; justify-content:center; overflow:hidden; padding: 0 4px;">
            ${xlHtml}
        </div>
        
        <div style="width: 75px; display:flex; flex-direction:column; justify-content:center;">
            ${statusHtml}
        </div>

        <div style="flex: 1; min-width: 120px;">
            <textarea class="sk-ghichu" placeholder="Ghi chú..." style="${cssTA}" oninput="${autoResizeJS}">${ghiChuVal}</textarea>
        </div>

        <div style="width: 35px; display:flex; justify-content:center; align-items:flex-start; min-height: 28px;">
            <button type="button" onclick="event.stopPropagation(); this.closest('.dong-nhap-su-kien').remove()" style="height: 28px; width: 28px; background: #f8d7da; color: #dc3545; border: none; border-radius: 4px; cursor: pointer; font-size: 12px; display:flex; align-items:center; justify-content:center;" title="Xóa dòng">✖</button>
        </div>
    `;

    if (!skData) window.ham_21_41_danh_dau_dong(div);
    khuVuc.appendChild(div);

    setTimeout(() => {
        div.querySelectorAll('textarea').forEach(ta => {
            if (ta.value) { ta.style.height = '28px'; ta.style.height = ta.scrollHeight + 'px'; }
        });
    }, 100);

    if (typeof window.ham_21_8_kich_hoat_xu_ly_anh === 'function') window.ham_21_8_kich_hoat_xu_ly_anh();
    if (typeof window.ham_20_7_tai_danh_sach_lop === 'function') window.ham_20_7_tai_danh_sach_lop();
};






















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
// // HÀM 21.6: GOM CÁC DÒNG SỰ KIỆN ĐƯA VÀO DANH SÁCH CHỜ LƯU (CẬP NHẬT ĐA HS & THẺ)
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
//         let loi = dong.querySelector('.sk-loi-hidden').value.trim();
//         let ghiChuThem = dong.querySelector('.sk-ghichu').value.trim();

//         let mangAnhDong = [];
//         try { if (dong.dataset.mangAnhDong) mangAnhDong = JSON.parse(dong.dataset.mangAnhDong); } catch (e) { }

//         // Lấy tất cả học sinh trong dòng (có thể có nhiều ô input.sk-hs)
//         dong.querySelectorAll('.sk-hs').forEach(inputHS => {
//             let hsInput = inputHS.value.trim();
//             if (hsInput && loi) {
//                 let uidHS = null, tenDangNhap = '';
//                 if (window.DanhSachHocSinhLopHienTai) {
//                     let hsObj = window.DanhSachHocSinhLopHienTai.find(h => h.chuoiGhep === hsInput);
//                     if (hsObj) { uidHS = hsObj.uid; tenDangNhap = hsObj.tenDangNhap; }
//                 }
//                 let tenHS = hsInput.split(' - ')[0].trim();

//                 window.gvcn_SuKienChoLuu.push({
//                     id_tam: Math.random(), batch_id: batchId,
//                     tuan: tuanXayRa, ngay: ngay, buoi: buoi,
//                     uid: uidHS, ten_hs: tenHS, ten_dang_nhap: tenDangNhap, loi: loi, ghi_chu: ghiChuThem,
//                     mang_anh: [...(window.gvcn_AnhSuKienTam || []), ...mangAnhDong]
//                 });
//             } else if (hsInput || loi) {
//                 coLoi = true;
//             }
//         });
//     });

//     if (coLoi) alert("⚠️ Có dòng thầy điền thiếu Học Sinh hoặc chưa chọn Loại Sự Kiện (Thẻ). Dòng đó đã bị bỏ qua!");

//     // Reset lại form Mục 5 sau khi đưa xuống chờ lưu
//     const currentDate = new Date().toISOString().split('T')[0];
//     document.getElementById('gvcn-khu-vuc-su-kien-nhanh').innerHTML = `
//         <div class="dong-nhap-su-kien" style="background: #fff; padding: 12px; border-radius: 8px; border: 1px solid #ccc; display: flex; flex-direction: column; gap: 10px;">
//             <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
//                 <input type="date" class="sk-ngay" value="${currentDate}" style="width: 130px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; font-weight:bold;">
//                 <select class="sk-buoi" style="width: 85px; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; cursor:pointer;">
//                     <option value="Sáng">Sáng</option><option value="Trưa">Trưa</option><option value="Chiều">Chiều</option><option value="Tối">Tối</option>
//                 </select>
//                 <div class="sk-vung-hoc-sinh" style="display: flex; flex-direction: column; gap: 6px; flex: 2; min-width: 250px;">
//                     <div style="display:flex; align-items:center; gap:6px;">
//                         <div style="display:flex; align-items:center; gap:6px; flex:1; border:2px solid #e83e8c; border-radius:4px; padding:4px 8px; background:#fdf5f8;">
//                             <img class="avatar-preview" src="" style="width:22px; height:22px; border-radius:50%; object-fit:cover; display:none; border:1px solid #eee;">
//                             <input class="sk-hs" placeholder="👤 Chọn học sinh..." style="border:none; outline:none; flex:1; width:100%; font-size:12px; font-weight:bold; background:transparent; color:#e83e8c;">
//                         </div>
//                         <button type="button" onclick="if(typeof ham_21_31_them_hs_cho_su_kien === 'function') ham_21_31_them_hs_cho_su_kien(this)" style="padding: 6px 10px; background: #fdf5f8; color: #e83e8c; border: 1px dashed #e83e8c; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: bold;" title="Chọn thêm học sinh chung sự kiện">➕ HS</button>
//                     </div>
//                 </div>
//                 <button onclick="this.closest('.dong-nhap-su-kien').remove()" style="padding: 8px 12px; background: #f8d7da; color: #dc3545; border: none; border-radius: 4px; cursor: pointer;" title="Xóa dòng">✖</button>
//             </div>
//             <div>
//                 <input class="sk-ghichu" placeholder="📝 Ghi chú thêm cho sự kiện..." style="width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; box-sizing: border-box;">
//             </div>
//             <div>
//                 <label style="font-size: 11px; font-weight: bold; color: #6c757d; display: block; margin-bottom: 4px;">🏷️ Chọn loại sự kiện (Thẻ):</label>
//                 <div class="sk-vung-chon-the" style="display: flex; gap: 6px; flex-wrap: wrap; align-items: center;">
//                     <button type="button" onclick="if(typeof ham_21_32_mo_modal_them_the === 'function') ham_21_32_mo_modal_them_the()" style="padding: 4px 8px; background: #fff; border: 1px dashed #e83e8c; color: #e83e8c; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: bold;">➕ Thêm thẻ mới</button>
//                 </div>
//                 <input type="hidden" class="sk-loi-hidden" value="">
//             </div>
//             <div style="display: flex; align-items: center; gap: 10px; border-top: 1px dashed #eee; padding-top: 6px;">
//                 <button type="button" class="btn-anh-sk-dong" onclick="this.nextElementSibling.click()" style="padding: 4px 8px; background: #e0f7fa; color: #00838f; border: 1px dashed #00acc1; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: bold;">📷 Ảnh minh chứng</button>
//                 <input type="file" accept="image/*" class="input-anh-sk-dong" style="display:none;" onchange="if(typeof window.ham_21_33_chon_anh_sk_dong === 'function') window.ham_21_33_chon_anh_sk_dong(this)">
//                 <div class="vung-preview-anh-sk-dong" style="display: flex; gap: 6px; align-items: center; overflow-x: auto;"></div>
//             </div>
//         </div>
//     `;
//     window.gvcn_AnhSuKienTam = [];
//     ham_21_9_render_anh('gvcn-vung-preview-anh-sk', window.gvcn_AnhSuKienTam, 'sk');
//     ham_21_7_ve_danh_sach_cho();
//     if (typeof window.ham_21_34_render_tat_ca_cac_the_su_kien === 'function') {
//         window.ham_21_34_render_tat_ca_cac_the_su_kien();
//     }
// };


// =====================================================================
// HÀM 21.6: ĐƯA DANH SÁCH SỰ KIỆN TỪ BẢNG XUỐNG CHỜ LƯU
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
        let hsInput = dong.querySelector('.sk-hs').value.trim();
        let loi = dong.querySelector('.sk-loi').value.trim();
        let diemTru = dong.querySelector('.sk-diem-tru').value;
        let ghiChuThem = dong.querySelector('.sk-ghichu').value.trim();

        let mangAnhDong = [];
        try { if (dong.dataset.mangAnhDong) mangAnhDong = JSON.parse(dong.dataset.mangAnhDong); } catch (e) { }

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
                uid: uidHS, ten_hs: tenHS, ten_dang_nhap: tenDangNhap, loi: loi, diem_tru: diemTru, ghi_chu: ghiChuThem,
                mang_anh: mangAnhDong
            });
        } else if (hsInput || loi) {
            coLoi = true;
        }
    });

    if (coLoi) alert("⚠️ Có dòng điền thiếu Học Sinh hoặc Sự kiện. Dòng đó đã bị bỏ qua!");

    // Dọn bảng, chừa lại 1 dòng trống
    const khuVuc = document.getElementById('gvcn-khu-vuc-su-kien-nhanh');
    if (khuVuc) {
        khuVuc.innerHTML = '';
        window.ham_21_4_them_dong_su_kien();
    }

    ham_21_7_ve_danh_sach_cho();
};



// // =====================================================================
// // HÀM 21.7: VẼ DANH SÁCH CHỜ SỰ KIỆN
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
//         let ghiChuStr = sk.ghi_chu ? ` - <i>${sk.ghi_chu}</i>` : '';
//         html += `
//             <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; border-bottom: 1px dashed #eee; background: #fff; border-radius: 6px; margin-bottom: 8px; border-left: 4px solid #e83e8c; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
//                 <div style="font-size: 13px;">
//                     <span style="color:#6c757d; font-weight:bold;">[${sk.tuan} - ${strNgay} - ${sk.buoi}]</span> 
//                     <b style="color:#1a73e8; margin:0 5px;">${sk.ten_hs}</b>: <span style="color:#dc3545; font-weight:bold;">[${sk.loi}]</span>${ghiChuStr} ${anhStr}
//                 </div>
//                 <button onclick="window.gvcn_SuKienChoLuu.splice(${idx}, 1); ham_21_7_ve_danh_sach_cho();" style="padding: 6px 12px; background: #f8d7da; color: #dc3545; border: none; border-radius: 4px; cursor: pointer; font-weight:bold;">✖</button>
//             </div>
//         `;
//     });
//     vung.innerHTML = html;
// };



// =====================================================================
// HÀM 21.7: CẬP NHẬT GIAO DIỆN (ĐÃ FIX LỖI DO BỎ DANH SÁCH CHỜ)
// =====================================================================
window.ham_21_7_ve_danh_sach_cho = function () {
    // 1. Kiểm tra an toàn: Nếu UI danh sách chờ cũ vẫn còn thì mới update (tránh lỗi null)
    const spanDem = document.getElementById('gvcn-dem-su-kien');
    if (spanDem) {
        spanDem.innerText = window.gvcn_DanhSachCho ? window.gvcn_DanhSachCho.length : 0;
    }

    const vungDanhSach = document.getElementById('gvcn-danh-sach-cho-luu');
    if (vungDanhSach) {
        vungDanhSach.innerHTML = '';
    }

    // 2. TÍNH NĂNG MỚI: Vì đã bỏ danh sách chờ, khi bấm "Tuần mới" hệ thống sẽ tự động làm sạch BẢNG NHẬP LIỆU TRỰC TIẾP
    const khuVucBang = document.getElementById('gvcn-khu-vuc-su-kien-nhanh');
    if (khuVucBang) {
        khuVucBang.innerHTML = '';
        // Mồi lại 1 dòng trống để thầy sẵn sàng nhập liệu cho tuần mới
        if (typeof window.ham_21_4_them_dong_su_kien === 'function') {
            window.ham_21_4_them_dong_su_kien();
        }
    }
};


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




// // =====================================================================
// // HÀM 21.11: TỰ ĐỘNG BUNG DROPDOWN BẮT AVATAR KHI CHỌN HỌC SINH
// // =====================================================================
// window.ham_21_11_hien_thi_dropdown_hs_gvcn = function (inputElement) {
//     document.querySelectorAll('.custom-dropdown-hs').forEach(el => el.remove());
//     if (!window.DanhSachHocSinhLopHienTai || window.DanhSachHocSinhLopHienTai.length === 0) return;

//     let tuKhoa = inputElement.value.toLowerCase().trim();
//     let dsLoc = window.DanhSachHocSinhLopHienTai.filter(hs =>
//         hs.tenHienThi.toLowerCase().includes(tuKhoa) ||
//         hs.tenDangNhap.toLowerCase().includes(tuKhoa)
//     );
//     if (dsLoc.length === 0) return;

//     let parent = inputElement.parentElement;
//     parent.style.position = 'relative';

//     let dropdown = document.createElement('div');
//     dropdown.className = 'custom-dropdown-hs';
//     dropdown.style.cssText = `position:absolute; top:calc(100% + 4px); left:0; width:100%; min-width:220px; max-height:220px; overflow-y:auto; background:#fff; border:1px solid #1a73e8; border-radius:8px; box-shadow:0 8px 20px rgba(0,0,0,0.15); z-index:999999; display:flex; flex-direction:column; animation:fadeIn 0.2s;`;

//     dsLoc.forEach(hs => {
//         let item = document.createElement('div');
//         item.style.cssText = `display:flex; align-items:center; gap:12px; padding:10px 12px; cursor:pointer; border-bottom:1px solid #f1f3f4;`;
//         item.onmouseover = () => item.style.background = '#e8f0fe';
//         item.onmouseout = () => item.style.background = '#fff';
//         item.innerHTML = `
//             <img src="${hs.avatarUrl}" style="width:34px; height:34px; border-radius:50%; object-fit:cover; border:1px solid #dee2e6;">
//             <div>
//                 <div style="font-weight:bold; color:#1a73e8; font-size:13px;">${hs.tenHienThi}</div>
//                 <div style="font-size:11px; color:#6c757d;">${hs.tenDangNhap}</div>
//             </div>
//         `;
//         item.onclick = function (e) {
//             e.preventDefault(); e.stopPropagation();
//             inputElement.value = hs.chuoiGhep;

//             // HIỆN AVATAR NGAY TRÊN DÒNG VỪA CHỌN
//             let imgPreview = parent.querySelector('.avatar-preview');
//             if (imgPreview) {
//                 imgPreview.src = hs.avatarUrl;
//                 imgPreview.style.display = 'block';
//             }
//             dropdown.remove();
//         };
//         dropdown.appendChild(item);
//     });
//     parent.appendChild(dropdown);

//     const closeDropdown = (e) => {
//         if (e.target !== inputElement && !dropdown.contains(e.target)) {
//             dropdown.remove();
//             document.removeEventListener('click', closeDropdown);
//         }
//     };
//     setTimeout(() => document.addEventListener('click', closeDropdown), 10);
// };
// // =====================================================================
// // HÀM 21.11: TỰ ĐỘNG BUNG DROPDOWN BẮT AVATAR KHI CHỌN HỌC SINH (FIX BỊ CHE KHUẤT & LỖI CUỘN)
// // =====================================================================
// window.ham_21_11_hien_thi_dropdown_hs_gvcn = function (inputElement) {
//     // 1. Dọn dẹp các dropdown cũ đang mở
//     document.querySelectorAll('.custom-dropdown-hs').forEach(el => el.remove());
//     if (!window.DanhSachHocSinhLopHienTai || window.DanhSachHocSinhLopHienTai.length === 0) return;

//     let tuKhoa = inputElement.value.toLowerCase().trim();
//     let dsLoc = window.DanhSachHocSinhLopHienTai.filter(hs =>
//         hs.tenHienThi.toLowerCase().includes(tuKhoa) ||
//         hs.tenDangNhap.toLowerCase().includes(tuKhoa)
//     );
//     if (dsLoc.length === 0) return;

//     // 2. TÍNH TOÁN TỌA ĐỘ TUYỆT ĐỐI CỦA Ô INPUT TRÊN MÀN HÌNH
//     let rect = inputElement.getBoundingClientRect();
//     let topPos = rect.bottom + window.scrollY;
//     let leftPos = rect.left + window.scrollX;
//     let inputWidth = rect.width < 250 ? 250 : rect.width;

//     // 3. Tạo khung dropdown đính vào thẻ Body
//     let dropdown = document.createElement('div');
//     dropdown.className = 'custom-dropdown-hs';
//     dropdown.style.cssText = `position:absolute; top:${topPos + 4}px; left:${leftPos}px; width:${inputWidth}px; max-height:250px; overflow-y:auto; background:#fff; border:1px solid #1a73e8; border-radius:8px; box-shadow:0 8px 25px rgba(0,0,0,0.3); z-index:9999999; display:flex; flex-direction:column; animation:fadeIn 0.1s;`;

//     // 4. Đổ dữ liệu học sinh vào
//     dsLoc.forEach(hs => {
//         let item = document.createElement('div');
//         item.style.cssText = `display:flex; align-items:center; gap:12px; padding:8px 12px; cursor:pointer; border-bottom:1px solid #f1f3f4; transition: 0.2s;`;
//         item.onmouseover = () => item.style.background = '#e8f0fe';
//         item.onmouseout = () => item.style.background = '#fff';
//         item.innerHTML = `
//             <img src="${hs.avatarUrl}" style="width:32px; height:32px; border-radius:50%; object-fit:cover; border:1px solid #dee2e6;">
//             <div>
//                 <div style="font-weight:bold; color:#1a73e8; font-size:13px;">${hs.tenHienThi}</div>
//                 <div style="font-size:11px; color:#6c757d;">Tài khoản: ${hs.tenDangNhap}</div>
//             </div>
//         `;

//         // 🌟 Xử lý khi click chọn học sinh (Dùng mousedown để tốc độ bắt sự kiện nhanh hơn click)
//         item.onmousedown = function (e) {
//             e.preventDefault(); e.stopPropagation();
//             inputElement.value = hs.chuoiGhep;

//             // Hiển thị Avatar thu nhỏ ngay trên ô Input
//             let parentBox = inputElement.closest('div');
//             if (parentBox) {
//                 let imgPreview = parentBox.querySelector('.avatar-preview');
//                 if (imgPreview) {
//                     imgPreview.src = hs.avatarUrl;
//                     imgPreview.style.display = 'block';
//                 }
//             }
//             removeDropdown();
//         };
//         dropdown.appendChild(item);
//     });

//     document.body.appendChild(dropdown);

//     // 5. CÁC HÀM XÓA MENU THÔNG MINH
//     const removeDropdown = () => {
//         if (dropdown && dropdown.parentNode) dropdown.remove();
//         document.removeEventListener('mousedown', closeDropdown);
//         document.removeEventListener('scroll', onScroll, true);
//     };

//     const closeDropdown = (e) => {
//         // Nếu bấm ra ngoài dropdown và ngoài ô input thì mới tắt
//         if (e.target !== inputElement && !dropdown.contains(e.target)) {
//             removeDropdown();
//         }
//     };

//     const onScroll = (e) => {
//         // 🌟 NẾU ĐANG CUỘN CHUỘT BÊN TRONG DANH SÁCH -> KHÔNG LÀM GÌ CẢ
//         if (e.target === dropdown || dropdown.contains(e.target)) return;

//         // NẾU CUỘN Ở NGOÀI -> XÓA MENU ĐỂ KHÔNG BỊ TRÔI LƠ LỬNG
//         removeDropdown();
//     };

//     // Gắn listener với timeout nhỏ để tránh trigger ngay lúc click mở
//     setTimeout(() => {
//         document.addEventListener('mousedown', closeDropdown);
//         document.addEventListener('scroll', onScroll, true);
//     }, 10);
// };



// =====================================================================
// HÀM 21.11: BUNG DROPDOWN BẮT AVATAR VÀ TỰ ĐỘNG GIÃN DÒNG CHỮ
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

    let rect = inputElement.getBoundingClientRect();
    let topPos = rect.bottom + window.scrollY;
    let leftPos = rect.left + window.scrollX;
    let inputWidth = rect.width < 250 ? 250 : rect.width;

    let dropdown = document.createElement('div');
    dropdown.className = 'custom-dropdown-hs';
    dropdown.style.cssText = `position:absolute; top:${topPos + 4}px; left:${leftPos}px; width:${inputWidth}px; max-height:250px; overflow-y:auto; background:#fff; border:1px solid #1a73e8; border-radius:8px; box-shadow:0 8px 25px rgba(0,0,0,0.3); z-index:9999999; display:flex; flex-direction:column; animation:fadeIn 0.1s;`;

    dsLoc.forEach(hs => {
        let item = document.createElement('div');
        item.style.cssText = `display:flex; align-items:center; gap:12px; padding:8px 12px; cursor:pointer; border-bottom:1px solid #f1f3f4; transition: 0.2s;`;
        item.onmouseover = () => item.style.background = '#e8f0fe';
        item.onmouseout = () => item.style.background = '#fff';
        item.innerHTML = `
            <img src="${hs.avatarUrl}" style="width:32px; height:32px; border-radius:50%; object-fit:cover; border:1px solid #dee2e6;">
            <div>
                <div style="font-weight:bold; color:#1a73e8; font-size:13px;">${hs.tenHienThi}</div>
                <div style="font-size:11px; color:#6c757d;">Tài khoản: ${hs.tenDangNhap}</div>
            </div>
        `;

        item.onmousedown = function (e) {
            e.preventDefault(); e.stopPropagation();
            inputElement.value = hs.chuoiGhep;

            // Kích hoạt phình to Textarea nếu tên học sinh bị dài
            inputElement.style.height = '28px';
            inputElement.style.height = inputElement.scrollHeight + 'px';

            let parentBox = inputElement.closest('div');
            if (parentBox) {
                let imgPreview = parentBox.querySelector('.avatar-preview');
                if (imgPreview) {
                    imgPreview.src = hs.avatarUrl;
                    imgPreview.style.display = 'block';
                }
            }
            removeDropdown();
        };
        dropdown.appendChild(item);
    });

    document.body.appendChild(dropdown);

    const removeDropdown = () => {
        if (dropdown && dropdown.parentNode) dropdown.remove();
        document.removeEventListener('mousedown', closeDropdown);
        document.removeEventListener('scroll', onScroll, true);
    };

    const closeDropdown = (e) => {
        if (e.target !== inputElement && !dropdown.contains(e.target)) {
            removeDropdown();
        }
    };

    const onScroll = (e) => {
        if (e.target === dropdown || dropdown.contains(e.target)) return;
        removeDropdown();
    };

    setTimeout(() => {
        document.addEventListener('mousedown', closeDropdown);
        document.addEventListener('scroll', onScroll, true);
    }, 10);
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
// // HÀM 21.15: LƯU TRỰC TIẾP TỪ BẢNG NHẬP LIỆU
// // =====================================================================
// window.ham_21_15_luu_su_kien_tuan_truoc = async function (btnLuu) {
//     const cacDong = document.querySelectorAll('.dong-nhap-su-kien');
//     const tuanXayRa = document.getElementById('gvcn-sk-tuan-chon').value;
//     const maLop = document.getElementById('gvcn-input-lop').value.match(/\(([^)]+)\)$/)?.[1]?.trim();

//     if (!maLop) { alert("⚠️ Vui lòng chọn Lớp học ở phần 1 trước!"); return; }
//     if (!tuanXayRa) { alert("⚠️ Vui lòng CHỌN TUẦN xảy ra sự kiện ở Bước 1!"); return; }

//     let danhSachChoLuu = [];
//     let coLoi = false;
//     let batchId = 'batch_sk_' + Date.now();

//     // 1. Quét toàn bộ bảng để lấy dữ liệu
//     cacDong.forEach(dong => {
//         let ngay = dong.querySelector('.sk-ngay').value;
//         let buoi = dong.querySelector('.sk-buoi').value;
//         let hsInput = dong.querySelector('.sk-hs').value.trim();
//         let loi = dong.querySelector('.sk-loi').value.trim();
//         let diemTru = dong.querySelector('.sk-diem-tru').value;
//         let ghiChuThem = dong.querySelector('.sk-ghichu').value.trim();

//         let mangAnhDong = [];
//         try { if (dong.dataset.mangAnhDong) mangAnhDong = JSON.parse(dong.dataset.mangAnhDong); } catch (e) { }

//         if (hsInput && loi) {
//             let uidHS = null, tenDangNhap = '';
//             if (window.DanhSachHocSinhLopHienTai) {
//                 let hsObj = window.DanhSachHocSinhLopHienTai.find(h => h.chuoiGhep === hsInput);
//                 if (hsObj) { uidHS = hsObj.uid; tenDangNhap = hsObj.tenDangNhap; }
//             }
//             let tenHS = hsInput.split(' - ')[0].trim();

//             danhSachChoLuu.push({
//                 batch_id: batchId,
//                 tuan: tuanXayRa, ngay: ngay, buoi: buoi,
//                 uid: uidHS, ten_hs: tenHS, ten_dang_nhap: tenDangNhap, loi: loi, diem_tru: diemTru, ghi_chu: ghiChuThem,
//                 mang_anh: mangAnhDong
//             });
//         } else if (hsInput || loi) {
//             coLoi = true; // Có dòng điền nửa vời (có tên nhưng thiếu lỗi hoặc ngược lại)
//         }
//     });

//     if (danhSachChoLuu.length === 0) {
//         alert("⚠️ Không có sự kiện học sinh nào hợp lệ để lưu! (Cần điền đầy đủ Tên học sinh và Tên lỗi)");
//         return;
//     }

//     if (coLoi) {
//         let xacNhan = confirm("⚠️ Bảng đang có dòng nhập thiếu Học Sinh hoặc Sự kiện. Dòng đó sẽ bị bỏ qua.\nThầy có muốn tiếp tục lưu các dòng hợp lệ không?");
//         if (!xacNhan) return;
//     }

//     let oldTxt = btnLuu.innerHTML;
//     let oldBg = btnLuu.style.background || '#e83e8c';
//     btnLuu.innerHTML = "⏳ ĐANG XỬ LÝ ẢNH & DỮ LIỆU..."; btnLuu.disabled = true;

//     const d = new Date();
//     const timeStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}_${String(d.getHours()).padStart(2, '0')}h${String(d.getMinutes()).padStart(2, '0')}m${String(d.getSeconds()).padStart(2, '0')}s`;
//     const cleanStr = (s) => s ? s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").replace(/\s+/g, "_") : "";

//     try {
//         let mangSuKienDB = [];
//         let cacheUpload = {};
//         let cacheIdNK = {};

//         // 2. Xử lý lưu từng dòng sự kiện
//         for (let sk of danhSachChoLuu) {
//             let tuanHocSuKien = sk.tuan;

//             // Tìm id_nhat_ky_gvcn tương ứng với Tuần này
//             if (!cacheIdNK[tuanHocSuKien]) {
//                 const { data: nkData } = await _supabase.from('nhat_ky_gvcn').select('id').eq('ma_lop', maLop).eq('tuan_hoc', tuanHocSuKien).maybeSingle();
//                 if (nkData) { cacheIdNK[tuanHocSuKien] = nkData.id; } else {
//                     const { data: newNK } = await _supabase.from('nhat_ky_gvcn').insert([{ ma_lop: maLop, tuan_hoc: tuanHocSuKien, tu_ngay: new Date().toISOString().split('T')[0], trang_thai: 1 }]).select();
//                     cacheIdNK[tuanHocSuKien] = newNK[0].id;
//                 }
//             }
//             let idNK = cacheIdNK[tuanHocSuKien];

//             let mangLink = [];
//             let hsClean = cleanStr(sk.ten_hs);
//             let loiClean = cleanStr(sk.loi);
//             let tuanClean = cleanStr(sk.tuan);
//             let idxAnh = 1;

//             // Xử lý upload ảnh minh chứng (chỉ upload những ảnh base64 mới)
//             for (let imgObj of sk.mang_anh) {
//                 // Tạo key độc nhất để tránh up trùng lặp nếu thầy có copy ảnh
//                 let key = imgObj.size + '_' + idxAnh;
//                 if (!cacheUpload[key]) {
//                     let tenFile = `SuKien_[${timeStr}]_Lop[${maLop}]_Tuan[${tuanClean}]_HS[${hsClean}]_Loi[${loiClean}]_Anh[${idxAnh}].jpg`;
//                     let res = await window.ham_ho_tro_upload_anh_co_tien_trinh(
//                         CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP,
//                         { action: "upload_anh_nhat_ky_gvcn", base64: imgObj.b64, mimeType: imgObj.type || 'image/jpeg', fileName: tenFile, maLop: maLop, loaiAnh: "GVCN_MC" }
//                     );
//                     cacheUpload[key] = res.url;
//                 }
//                 mangLink.push(cacheUpload[key]);
//                 idxAnh++;
//             }

//             let ghiChuChiTiet = sk.loi + ` (Xảy ra ngày ${sk.ngay} - Buổi ${sk.buoi})`;
//             if (sk.ghi_chu) ghiChuChiTiet += ` - Ghi chú: ${sk.ghi_chu}`;
//             if (sk.diem_tru && parseFloat(sk.diem_tru) !== 0) ghiChuChiTiet += ` - Điểm trừ: ${sk.diem_tru}`;

//             mangSuKienDB.push({
//                 id_gvcn_nhat_ky: idNK, uid_hoc_sinh: sk.uid, ten_dang_nhap_hoc_sinh: sk.ten_dang_nhap, ten_hoc_sinh: sk.ten_hs,
//                 nhom_su_kien: sk.loi, noi_dung_chi_tiet: ghiChuChiTiet, hinh_thuc_xu_ly: '',
//                 ngay_ghi_nhan: sk.ngay, muc_do: 1,
//                 thong_tin_mo_rong: { mau_sac: '#e83e8c', danh_sach_anh_minh_chung: mangLink, diem_tru: sk.diem_tru }
//             });
//         }

//         // 3. Đẩy lên Supabase
//         if (mangSuKienDB.length > 0) {
//             const { error } = await _supabase.from('nhat_ky_gvcn_su_kien_hs').insert(mangSuKienDB);
//             if (error) throw error;

//             alert("✅ Đã ghi nhận tất cả sự kiện vào Hồ sơ lớp thành công!");

//             // Xóa sạch bảng, chừa lại 1 dòng trống
//             const khuVuc = document.getElementById('gvcn-khu-vuc-su-kien-nhanh');
//             if (khuVuc) {
//                 khuVuc.innerHTML = '';
//                 if (typeof window.ham_21_4_them_dong_su_kien === 'function') {
//                     window.ham_21_4_them_dong_su_kien();
//                 }
//             }
//         }
//     } catch (e) {
//         alert("❌ Lỗi: " + e.message);
//     }
//     finally {
//         btnLuu.style.background = oldBg;
//         btnLuu.innerHTML = oldTxt;
//         btnLuu.disabled = false;
//     }
// };


// // =====================================================================
// // HÀM 21.15: LƯU TRỰC TIẾP TỪ BẢNG NHẬP LIỆU (CÓ KIỂM TRA DỮ LIỆU BẮT BUỘC)
// // =====================================================================
// window.ham_21_15_luu_su_kien_tuan_truoc = async function (btnLuu) {
//     const cacDong = document.querySelectorAll('.dong-nhap-su-kien');
//     const tuanXayRa = document.getElementById('gvcn-sk-tuan-chon').value;
//     const maLop = document.getElementById('gvcn-input-lop').value.match(/\(([^)]+)\)$/)?.[1]?.trim();

//     if (!maLop) { alert("⚠️ Vui lòng chọn Lớp học ở phần 1 trước!"); return; }
//     if (!tuanXayRa) { alert("⚠️ Vui lòng CHỌN TUẦN xảy ra sự kiện ở Bước 1!"); return; }

//     let danhSachChoLuu = [];
//     let coLoiThiếuDuLieu = false;
//     let batchId = 'batch_sk_' + Date.now();

//     // 1. Quét toàn bộ bảng để lấy dữ liệu và KIỂM TRA ĐIỀU KIỆN BẮT BUỘC
//     cacDong.forEach(dong => {
//         let ngay = dong.querySelector('.sk-ngay').value;
//         let thu = dong.querySelector('.sk-thu').value;
//         let buoi = dong.querySelector('.sk-buoi').value;
//         let hsInput = dong.querySelector('.sk-hs').value.trim();
//         let loi = dong.querySelector('.sk-loi').value.trim();
//         let diemTru = dong.querySelector('.sk-diem-tru').value;
//         let ghiChuThem = dong.querySelector('.sk-ghichu').value.trim();

//         let mangAnhDong = [];
//         try { if (dong.dataset.mangAnhDong) mangAnhDong = JSON.parse(dong.dataset.mangAnhDong); } catch (e) { }

//         // Nhận diện xem dòng này có đang được nhập liệu hay không
//         let coNhapLieu = (hsInput !== '') || (loi !== '');

//         if (coNhapLieu) {
//             // NẾU CÓ NHẬP LIỆU -> BẮT BUỘC PHẢI ĐỦ CÁC TRƯỜNG CƠ BẢN
//             if (!ngay || !thu || !buoi || !hsInput || !loi || diemTru === '') {
//                 coLoiThiếuDuLieu = true;
//                 // Bôi đỏ viền của dòng bị thiếu dữ liệu để cảnh báo
//                 dong.style.border = '2px solid #dc3545';
//                 dong.style.boxShadow = '0 0 8px rgba(220, 53, 69, 0.4)';
//                 // Nếu là dòng đang chọn, phải gỡ bỏ class đang chọn để hiện rõ viền đỏ
//                 dong.classList.remove('dong-dang-chon');
//             } else {
//                 // Dữ liệu hợp lệ -> Reset viền về bình thường
//                 dong.style.border = '1px solid #ced4da';
//                 dong.style.boxShadow = 'none';

//                 let uidHS = null, tenDangNhap = '';
//                 if (window.DanhSachHocSinhLopHienTai) {
//                     let hsObj = window.DanhSachHocSinhLopHienTai.find(h => h.chuoiGhep === hsInput);
//                     if (hsObj) { uidHS = hsObj.uid; tenDangNhap = hsObj.tenDangNhap; }
//                 }
//                 let tenHS = hsInput.split(' - ')[0].trim();

//                 danhSachChoLuu.push({
//                     batch_id: batchId,
//                     tuan: tuanXayRa, ngay: ngay, buoi: buoi,
//                     uid: uidHS, ten_hs: tenHS, ten_dang_nhap: tenDangNhap, loi: loi, diem_tru: diemTru, ghi_chu: ghiChuThem,
//                     mang_anh: mangAnhDong
//                 });
//             }
//         } else {
//             // Dòng trống -> Bỏ qua và reset viền (nếu trước đó bị đỏ)
//             dong.style.border = dong.classList.contains('dong-dang-chon') ? '1px solid #e83e8c' : '1px solid #ced4da';
//             dong.style.boxShadow = dong.classList.contains('dong-dang-chon') ? '0 0 5px rgba(232, 62, 140, 0.3)' : 'none';
//         }
//     });

//     // CHẶN QUÁ TRÌNH LƯU NẾU CÓ LỖI THIẾU DỮ LIỆU
//     if (coLoiThiếuDuLieu) {
//         alert("⚠️ CÓ LỖI: Phát hiện dòng chưa điền đủ dữ liệu bắt buộc (Ngày, Thứ, Buổi, Học sinh, Lỗi, Điểm).\n👉 Các dòng bị thiếu đã được bôi viền ĐỎ, thầy vui lòng bổ sung đầy đủ trước khi lưu!");
//         return;
//     }

//     if (danhSachChoLuu.length === 0) {
//         alert("⚠️ Bảng đang trống, không có sự kiện học sinh nào để lưu!");
//         return;
//     }

//     let oldTxt = btnLuu.innerHTML;
//     let oldBg = btnLuu.style.background || '#e83e8c';
//     btnLuu.innerHTML = "⏳ ĐANG XỬ LÝ ẢNH & DỮ LIỆU..."; btnLuu.disabled = true;

//     const d = new Date();
//     const timeStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}_${String(d.getHours()).padStart(2, '0')}h${String(d.getMinutes()).padStart(2, '0')}m${String(d.getSeconds()).padStart(2, '0')}s`;
//     const cleanStr = (s) => s ? s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").replace(/\s+/g, "_") : "";

//     try {
//         let mangSuKienDB = [];
//         let cacheUpload = {};
//         let cacheIdNK = {};

//         // 2. Xử lý lưu từng dòng sự kiện
//         for (let sk of danhSachChoLuu) {
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
//             let hsClean = cleanStr(sk.ten_hs);
//             let loiClean = cleanStr(sk.loi);
//             let tuanClean = cleanStr(sk.tuan);
//             let idxAnh = 1;

//             for (let imgObj of sk.mang_anh) {
//                 let key = imgObj.size + '_' + idxAnh;
//                 if (!cacheUpload[key]) {
//                     let tenFile = `SuKien_[${timeStr}]_Lop[${maLop}]_Tuan[${tuanClean}]_HS[${hsClean}]_Loi[${loiClean}]_Anh[${idxAnh}].jpg`;
//                     let res = await window.ham_ho_tro_upload_anh_co_tien_trinh(
//                         CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP,
//                         { action: "upload_anh_nhat_ky_gvcn", base64: imgObj.b64, mimeType: imgObj.type || 'image/jpeg', fileName: tenFile, maLop: maLop, loaiAnh: "GVCN_MC" }
//                     );
//                     cacheUpload[key] = res.url;
//                 }
//                 mangLink.push(cacheUpload[key]);
//                 idxAnh++;
//             }

//             let ghiChuChiTiet = sk.loi + ` (Xảy ra ngày ${sk.ngay} - Buổi ${sk.buoi})`;
//             if (sk.ghi_chu) ghiChuChiTiet += ` - Ghi chú: ${sk.ghi_chu}`;
//             if (sk.diem_tru && parseFloat(sk.diem_tru) !== 0) ghiChuChiTiet += ` - Điểm: ${sk.diem_tru}`;

//             mangSuKienDB.push({
//                 id_gvcn_nhat_ky: idNK, uid_hoc_sinh: sk.uid, ten_dang_nhap_hoc_sinh: sk.ten_dang_nhap, ten_hoc_sinh: sk.ten_hs,
//                 nhom_su_kien: sk.loi, noi_dung_chi_tiet: ghiChuChiTiet, hinh_thuc_xu_ly: '',
//                 ngay_ghi_nhan: sk.ngay, muc_do: 1,
//                 thong_tin_mo_rong: { mau_sac: '#e83e8c', danh_sach_anh_minh_chung: mangLink, diem_tru: sk.diem_tru }
//             });
//         }

//         // 3. Đẩy lên Supabase
//         if (mangSuKienDB.length > 0) {
//             const { error } = await _supabase.from('nhat_ky_gvcn_su_kien_hs').insert(mangSuKienDB);
//             if (error) throw error;

//             alert("✅ Đã lưu tất cả sự kiện vào Hồ sơ lớp thành công!");

//             // Xóa sạch bảng, chừa lại 1 dòng trống cho lần nhập liệu tiếp theo
//             const khuVuc = document.getElementById('gvcn-khu-vuc-su-kien-nhanh');
//             if (khuVuc) {
//                 khuVuc.innerHTML = '';
//                 if (typeof window.ham_21_4_them_dong_su_kien === 'function') {
//                     window.ham_21_4_them_dong_su_kien();
//                 }
//             }
//         }
//     } catch (e) {
//         alert("❌ Lỗi: " + e.message);
//     }
//     finally {
//         btnLuu.style.background = oldBg;
//         btnLuu.innerHTML = oldTxt;
//         btnLuu.disabled = false;
//     }
// };


// // =====================================================================
// // HÀM 21.15: LƯU SỰ KIỆN (UPSERT THÔNG MINH KẾT HỢP XÓA RÁC)
// // =====================================================================
// window.ham_21_15_luu_su_kien_tuan_truoc = async function (btnLuu) {
//     const cacDong = document.querySelectorAll('.dong-nhap-su-kien');
//     const tuanXayRa = document.getElementById('gvcn-sk-tuan-chon').value;
//     const maLop = document.getElementById('gvcn-input-lop').value.match(/\(([^)]+)\)$/)?.[1]?.trim();

//     if (!maLop) { alert("⚠️ Vui lòng chọn Lớp học ở phần 1 trước!"); return; }
//     if (!tuanXayRa) { alert("⚠️ Vui lòng CHỌN TUẦN xảy ra sự kiện ở Bước 1!"); return; }

//     let danhSachChoLuu = [];
//     let coLoiThiếuDuLieu = false;
//     let currentIds = []; // 🌟 Mảng ghi nhớ các ID hợp lệ đang có trên bảng

//     cacDong.forEach(dong => {
//         let ngay = dong.querySelector('.sk-ngay').value;
//         let thu = dong.querySelector('.sk-thu').value;
//         let buoi = dong.querySelector('.sk-buoi').value;
//         let hsInput = dong.querySelector('.sk-hs').value.trim();
//         let loi = dong.querySelector('.sk-loi').value.trim();
//         let diemTru = dong.querySelector('.sk-diem-tru').value;
//         let ghiChuThem = dong.querySelector('.sk-ghichu').value.trim();
//         let idSuKien = dong.dataset.id || null;

//         let mangAnhDong = [];
//         try { if (dong.dataset.mangAnhDong) mangAnhDong = JSON.parse(dong.dataset.mangAnhDong); } catch (e) { }

//         let coNhapLieu = (hsInput !== '') || (loi !== '');

//         if (coNhapLieu) {
//             if (!ngay || !thu || !buoi || !hsInput || !loi || diemTru === '') {
//                 coLoiThiếuDuLieu = true;
//                 dong.style.border = '2px solid #dc3545';
//                 dong.style.boxShadow = '0 0 8px rgba(220, 53, 69, 0.4)';
//                 dong.classList.remove('dong-dang-chon');
//             } else {
//                 dong.style.border = '1px solid #ced4da';
//                 dong.style.boxShadow = 'none';

//                 let uidHS = null, tenDangNhap = '';
//                 if (window.DanhSachHocSinhLopHienTai) {
//                     let hsObj = window.DanhSachHocSinhLopHienTai.find(h => h.chuoiGhep === hsInput);
//                     if (hsObj) { uidHS = hsObj.uid; tenDangNhap = hsObj.tenDangNhap; }
//                 }
//                 let tenHS = hsInput.split(' - ')[0].trim();

//                 if (idSuKien) currentIds.push(idSuKien); // Thêm ID vào danh sách giữ lại

//                 danhSachChoLuu.push({
//                     id: idSuKien,
//                     tuan: tuanXayRa, ngay: ngay, buoi: buoi,
//                     uid: uidHS, ten_hs: tenHS, ten_dang_nhap: tenDangNhap, loi: loi, diem_tru: diemTru, ghi_chu: ghiChuThem,
//                     mang_anh: mangAnhDong
//                 });
//             }
//         } else {
//             dong.style.border = dong.classList.contains('dong-dang-chon') ? '1px solid #e83e8c' : '1px solid #ced4da';
//             dong.style.boxShadow = dong.classList.contains('dong-dang-chon') ? '0 0 5px rgba(232, 62, 140, 0.3)' : 'none';
//         }
//     });

//     if (coLoiThiếuDuLieu) {
//         alert("⚠️ CÓ LỖI: Phát hiện dòng chưa điền đủ dữ liệu bắt buộc (Ngày, Thứ, Buổi, Học sinh, Lỗi, Điểm).\n👉 Các dòng bị thiếu đã được bôi viền ĐỎ, thầy vui lòng bổ sung đầy đủ trước khi lưu!");
//         return;
//     }

//     let oldTxt = btnLuu.innerHTML;
//     let oldBg = btnLuu.style.background || '#e83e8c';
//     btnLuu.innerHTML = "⏳ ĐANG XỬ LÝ ẢNH & ĐỒNG BỘ CSDL..."; btnLuu.disabled = true;

//     const d = new Date();
//     const timeStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}_${String(d.getHours()).padStart(2, '0')}h${String(d.getMinutes()).padStart(2, '0')}m${String(d.getSeconds()).padStart(2, '0')}s`;
//     const cleanStr = (s) => s ? s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").replace(/\s+/g, "_") : "";

//     try {
//         let mangSuKienDB = [];
//         let cacheUpload = {};

//         let idNK = null;
//         const { data: nkData } = await _supabase.from('nhat_ky_gvcn').select('id').eq('ma_lop', maLop).eq('tuan_hoc', tuanXayRa).maybeSingle();
//         if (nkData) { idNK = nkData.id; } else {
//             const { data: newNK } = await _supabase.from('nhat_ky_gvcn').insert([{ ma_lop: maLop, tuan_hoc: tuanXayRa, tu_ngay: document.getElementById('gvcn-sk-tuan-tu').value || new Date().toISOString().split('T')[0], trang_thai: 1 }]).select();
//             idNK = newNK[0].id;
//         }

//         // 🌟 KIỂM TRA BẢNG CŨ VÀ XÓA RÁC (Dòng nào thầy đã bấm nút ✖ xóa trên giao diện thì xóa vĩnh viễn trong CSDL)
//         const { data: dbEvents } = await _supabase.from('nhat_ky_gvcn_su_kien_hs')
//             .select('id').eq('id_gvcn_nhat_ky', idNK).not('nhom_su_kien', 'ilike', 'Giao việc:%');

//         if (dbEvents) {
//             let idsToDelete = dbEvents.map(e => e.id).filter(id => !currentIds.includes(id));
//             if (idsToDelete.length > 0) {
//                 await _supabase.from('nhat_ky_gvcn_su_kien_hs').delete().in('id', idsToDelete);
//             }
//         }

//         if (danhSachChoLuu.length === 0) {
//             alert("✅ Đã đồng bộ bảng sự kiện thành công! (Bảng đã được làm sạch)");
//             if (typeof window.ham_21_30_cap_nhat_ngay_tuan_su_kien === 'function') window.ham_21_30_cap_nhat_ngay_tuan_su_kien();
//             btnLuu.style.background = oldBg; btnLuu.innerHTML = oldTxt; btnLuu.disabled = false;
//             return;
//         }

//         for (let sk of danhSachChoLuu) {
//             let mangLink = [];
//             let hsClean = cleanStr(sk.ten_hs);
//             let loiClean = cleanStr(sk.loi);
//             let tuanClean = cleanStr(sk.tuan);
//             let idxAnh = 1;

//             for (let imgObj of sk.mang_anh) {
//                 if (imgObj.type === 'url') {
//                     mangLink.push(imgObj.b64); // Ảnh cũ giữ nguyên
//                 } else {
//                     let key = imgObj.size + '_' + idxAnh;
//                     if (!cacheUpload[key]) {
//                         let tenFile = `SuKien_[${timeStr}]_Lop[${maLop}]_Tuan[${tuanClean}]_HS[${hsClean}]_Loi[${loiClean}]_Anh[${idxAnh}].jpg`;
//                         let res = await window.ham_ho_tro_upload_anh_co_tien_trinh(
//                             CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP,
//                             { action: "upload_anh_nhat_ky_gvcn", base64: imgObj.b64, mimeType: imgObj.type || 'image/jpeg', fileName: tenFile, maLop: maLop, loaiAnh: "GVCN_MC" }
//                         );
//                         cacheUpload[key] = res.url;
//                     }
//                     mangLink.push(cacheUpload[key]);
//                 }
//                 idxAnh++;
//             }

//             let ghiChuChiTiet = sk.loi + ` (Xảy ra ngày ${sk.ngay} - Buổi ${sk.buoi})`;
//             if (sk.ghi_chu) ghiChuChiTiet += ` - Ghi chú: ${sk.ghi_chu}`;
//             if (sk.diem_tru && parseFloat(sk.diem_tru) !== 0) ghiChuChiTiet += ` - Điểm: ${sk.diem_tru}`;

//             let obj = {
//                 id_gvcn_nhat_ky: idNK, uid_hoc_sinh: sk.uid, ten_dang_nhap_hoc_sinh: sk.ten_dang_nhap, ten_hoc_sinh: sk.ten_hs,
//                 nhom_su_kien: sk.loi, noi_dung_chi_tiet: ghiChuChiTiet, hinh_thuc_xu_ly: '',
//                 ngay_ghi_nhan: sk.ngay, muc_do: 1,
//                 thong_tin_mo_rong: { mau_sac: '#e83e8c', danh_sach_anh_minh_chung: mangLink, diem_tru: sk.diem_tru }
//             };

//             if (sk.id) obj.id = sk.id; // Nếu có ID -> Lệnh upsert sẽ tự hiểu là Update
//             mangSuKienDB.push(obj);
//         }

//         if (mangSuKienDB.length > 0) {
//             const { error } = await _supabase.from('nhat_ky_gvcn_su_kien_hs').upsert(mangSuKienDB);
//             if (error) throw error;

//             alert("✅ Đã cập nhật tất cả sự kiện vào Hồ sơ lớp thành công!");

//             // Reload lại bảng từ CSDL để chuẩn hóa Data (lấy ID mới sinh ra)
//             if (typeof window.ham_21_30_cap_nhat_ngay_tuan_su_kien === 'function') {
//                 window.ham_21_30_cap_nhat_ngay_tuan_su_kien();
//             }
//         }
//     } catch (e) {
//         alert("❌ Lỗi: " + e.message);
//     }
//     finally {
//         btnLuu.style.background = oldBg;
//         btnLuu.innerHTML = oldTxt;
//         btnLuu.disabled = false;
//     }
// };



// =====================================================================
// HÀM 21.15: LƯU SỰ KIỆN TỪ BẢNG (UPSERT THÔNG MINH + GHI NHẬN JSON XỬ LÝ PHẠT)
// =====================================================================
window.ham_21_15_luu_su_kien_tuan_truoc = async function (btnLuu) {
    const cacDong = document.querySelectorAll('.dong-nhap-su-kien');
    const tuanXayRa = document.getElementById('gvcn-sk-tuan-chon').value;
    const maLop = document.getElementById('gvcn-input-lop').value.match(/\(([^)]+)\)$/)?.[1]?.trim();

    if (!maLop) { alert("⚠️ Vui lòng chọn Lớp học ở phần 1 trước!"); return; }
    if (!tuanXayRa) { alert("⚠️ Vui lòng CHỌN TUẦN xảy ra sự kiện ở Bước 1!"); return; }

    let danhSachChoLuu = [];
    let coLoiThiếuDuLieu = false;
    let currentIds = [];

    // 🌟 Bắt trạng thái khu vực Yêu cầu xử lý (B4)
    let checkXuLy = document.getElementById('gvcn-check-xu-ly').checked;
    let hinhThucXL = document.getElementById('gvcn-hinh-thuc-xu-ly').value;
    let noiDungXL = document.getElementById('gvcn-noi-dung-xu-ly').value.trim();

    if (checkXuLy) {
        if (!hinhThucXL) { alert("⚠️ Yêu cầu xử lý đang BẬT: Vui lòng chọn ít nhất 1 Hình thức (bấm vào các nút tag màu cam)!"); return; }
        if (!noiDungXL) { alert("⚠️ Yêu cầu xử lý đang BẬT: Vui lòng ghi rõ Nội dung yêu cầu khắc phục (VD: Viết bản kiểm điểm có chữ ký PH...)!"); return; }
    }

    cacDong.forEach(dong => {
        let ngay = dong.querySelector('.sk-ngay').value;
        let thu = dong.querySelector('.sk-thu').value;
        let buoi = dong.querySelector('.sk-buoi').value;
        let hsInput = dong.querySelector('.sk-hs').value.trim();
        let loi = dong.querySelector('.sk-loi').value.trim();
        let diemTru = dong.querySelector('.sk-diem-tru').value;
        let ghiChuThem = dong.querySelector('.sk-ghichu').value.trim();
        let idSuKien = dong.dataset.id || null;

        let mangAnhDong = [];
        try { if (dong.dataset.mangAnhDong) mangAnhDong = JSON.parse(dong.dataset.mangAnhDong); } catch (e) { }

        let coNhapLieu = (hsInput !== '') || (loi !== '');

        if (coNhapLieu) {
            if (!ngay || !thu || !buoi || !hsInput || !loi || diemTru === '') {
                coLoiThiếuDuLieu = true;
                dong.style.border = '2px solid #dc3545'; dong.style.boxShadow = '0 0 8px rgba(220, 53, 69, 0.4)'; dong.classList.remove('dong-dang-chon');
            } else {
                dong.style.border = '1px solid #ced4da'; dong.style.boxShadow = 'none';

                let uidHS = null, tenDangNhap = '';
                if (window.DanhSachHocSinhLopHienTai) {
                    let hsObj = window.DanhSachHocSinhLopHienTai.find(h => h.chuoiGhep === hsInput);
                    if (hsObj) { uidHS = hsObj.uid; tenDangNhap = hsObj.tenDangNhap; }
                }
                let tenHS = hsInput.split(' - ')[0].trim();

                if (idSuKien) currentIds.push(idSuKien);

                // Tạo đối tượng JSON xử lý (nếu có bật checkbox)
                let goiXuLy = null;
                if (checkXuLy) {
                    goiXuLy = {
                        hinh_thuc: hinhThucXL,
                        noi_dung: noiDungXL,
                        trang_thai: 'Chưa hoàn thành',
                        anh_minh_chung: []
                    };
                }

                danhSachChoLuu.push({
                    id: idSuKien,
                    tuan: tuanXayRa, ngay: ngay, buoi: buoi,
                    uid: uidHS, ten_hs: tenHS, ten_dang_nhap: tenDangNhap, loi: loi, diem_tru: diemTru, ghi_chu: ghiChuThem,
                    mang_anh: mangAnhDong,
                    goi_xu_ly: goiXuLy
                });
            }
        } else {
            dong.style.border = dong.classList.contains('dong-dang-chon') ? '1px solid #e83e8c' : '1px solid #ced4da';
            dong.style.boxShadow = dong.classList.contains('dong-dang-chon') ? '0 0 5px rgba(232, 62, 140, 0.3)' : 'none';
        }
    });

    if (coLoiThiếuDuLieu) { alert("⚠️ CÓ LỖI: Phát hiện dòng chưa điền đủ dữ liệu bắt buộc (Ngày, Thứ, Buổi, Học sinh, Lỗi, Điểm).\n👉 Các dòng bị thiếu đã được bôi viền ĐỎ, thầy vui lòng bổ sung đầy đủ trước khi lưu!"); return; }

    let oldTxt = btnLuu.innerHTML; let oldBg = btnLuu.style.background || '#e83e8c';
    btnLuu.innerHTML = "⏳ ĐANG XỬ LÝ ẢNH & ĐỒNG BỘ CSDL..."; btnLuu.disabled = true;

    const d = new Date();
    const timeStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}_${String(d.getHours()).padStart(2, '0')}h${String(d.getMinutes()).padStart(2, '0')}m${String(d.getSeconds()).padStart(2, '0')}s`;
    const cleanStr = (s) => s ? s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").replace(/\s+/g, "_") : "";

    try {
        let mangSuKienDB = [];
        let cacheUpload = {};

        let idNK = null;
        const { data: nkData } = await _supabase.from('nhat_ky_gvcn').select('id').eq('ma_lop', maLop).eq('tuan_hoc', tuanXayRa).maybeSingle();
        if (nkData) { idNK = nkData.id; } else {
            const { data: newNK } = await _supabase.from('nhat_ky_gvcn').insert([{ ma_lop: maLop, tuan_hoc: tuanXayRa, tu_ngay: document.getElementById('gvcn-sk-tuan-tu').value || new Date().toISOString().split('T')[0], trang_thai: 1 }]).select();
            idNK = newNK[0].id;
        }

        const { data: dbEvents } = await _supabase.from('nhat_ky_gvcn_su_kien_hs').select('id').eq('id_gvcn_nhat_ky', idNK).not('nhom_su_kien', 'ilike', 'Giao việc:%');
        if (dbEvents) {
            let idsToDelete = dbEvents.map(e => e.id).filter(id => !currentIds.includes(id));
            if (idsToDelete.length > 0) await _supabase.from('nhat_ky_gvcn_su_kien_hs').delete().in('id', idsToDelete);
        }

        if (danhSachChoLuu.length === 0) {
            alert("✅ Đã đồng bộ bảng sự kiện thành công! (Bảng đã được làm sạch)");
            if (typeof window.ham_21_30_cap_nhat_ngay_tuan_su_kien === 'function') window.ham_21_30_cap_nhat_ngay_tuan_su_kien();
            btnLuu.style.background = oldBg; btnLuu.innerHTML = oldTxt; btnLuu.disabled = false; return;
        }

        for (let sk of danhSachChoLuu) {
            let mangLink = [];
            let hsClean = cleanStr(sk.ten_hs); let loiClean = cleanStr(sk.loi); let tuanClean = cleanStr(sk.tuan); let idxAnh = 1;

            for (let imgObj of sk.mang_anh) {
                if (imgObj.type === 'url') { mangLink.push(imgObj.b64); } else {
                    let key = imgObj.size + '_' + idxAnh;
                    if (!cacheUpload[key]) {
                        let tenFile = `SuKien_[${timeStr}]_Lop[${maLop}]_Tuan[${tuanClean}]_HS[${hsClean}]_Loi[${loiClean}]_Anh[${idxAnh}].jpg`;
                        let res = await window.ham_ho_tro_upload_anh_co_tien_trinh(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, { action: "upload_anh_nhat_ky_gvcn", base64: imgObj.b64, mimeType: imgObj.type || 'image/jpeg', fileName: tenFile, maLop: maLop, loaiAnh: "GVCN_MC" });
                        cacheUpload[key] = res.url;
                    }
                    mangLink.push(cacheUpload[key]);
                }
                idxAnh++;
            }

            let ghiChuChiTiet = sk.loi + ` (Xảy ra ngày ${sk.ngay} - Buổi ${sk.buoi})`;
            if (sk.ghi_chu) ghiChuChiTiet += ` - Ghi chú: ${sk.ghi_chu}`;
            if (sk.diem_tru && parseFloat(sk.diem_tru) !== 0) ghiChuChiTiet += ` - Điểm: ${sk.diem_tru}`;

            // Ghép gói JSON mở rộng
            let thongTinMoRong = { mau_sac: '#e83e8c', danh_sach_anh_minh_chung: mangLink, diem_tru: sk.diem_tru };
            if (sk.goi_xu_ly) thongTinMoRong.xu_ly = sk.goi_xu_ly;

            let obj = {
                id_gvcn_nhat_ky: idNK, uid_hoc_sinh: sk.uid, ten_dang_nhap_hoc_sinh: sk.ten_dang_nhap, ten_hoc_sinh: sk.ten_hs,
                nhom_su_kien: sk.loi, noi_dung_chi_tiet: ghiChuChiTiet, hinh_thuc_xu_ly: '',
                ngay_ghi_nhan: sk.ngay, muc_do: 1, thong_tin_mo_rong: thongTinMoRong
            };

            if (sk.id) obj.id = sk.id;
            mangSuKienDB.push(obj);
        }

        if (mangSuKienDB.length > 0) {
            const { error } = await _supabase.from('nhat_ky_gvcn_su_kien_hs').upsert(mangSuKienDB);
            if (error) throw error;

            // Xóa form khắc phục
            document.getElementById('gvcn-check-xu-ly').checked = false;
            document.getElementById('gvcn-vung-xu-ly').style.display = 'none';
            document.getElementById('gvcn-hinh-thuc-xu-ly').value = '';
            document.getElementById('gvcn-noi-dung-xu-ly').value = '';
            document.querySelectorAll('.tag-xu-ly-btn').forEach(b => { b.style.background = 'transparent'; b.style.color = b.dataset.color; });

            alert("✅ Đã cập nhật tất cả sự kiện vào Hồ sơ lớp thành công!");
            if (typeof window.ham_21_30_cap_nhat_ngay_tuan_su_kien === 'function') window.ham_21_30_cap_nhat_ngay_tuan_su_kien();
        }
    } catch (e) { alert("❌ Lỗi: " + e.message); }
    finally { btnLuu.style.background = oldBg; btnLuu.innerHTML = oldTxt; btnLuu.disabled = false; }
};



// =====================================================================
// HÀM MỚI: CHỌN TAG HÌNH THỨC XỬ LÝ (CHỌN NHIỀU MỤC CÙNG LÚC)
// =====================================================================
window.ham_21_chon_hinh_thuc_xu_ly = function (btnElem, tenHinhThuc) {
    let hiddenInput = document.getElementById('gvcn-hinh-thuc-xu-ly');
    if (!hiddenInput) return;

    let currentValues = hiddenInput.value ? hiddenInput.value.split(', ') : [];

    if (currentValues.includes(tenHinhThuc)) {
        currentValues = currentValues.filter(v => v !== tenHinhThuc);
        btnElem.style.background = 'transparent';
        btnElem.style.color = btnElem.dataset.color;
    } else {
        currentValues.push(tenHinhThuc);
        btnElem.style.background = btnElem.dataset.color;
        btnElem.style.color = '#fff';
    }
    hiddenInput.value = currentValues.join(', ');
};









// // =====================================================================
// // HÀM 21.16: TỰ ĐỘNG DÒ VÀ NẠP DỮ LIỆU TUẦN CŨ (KẾT NỐI VỚI HÀM RENDER ẢNH CŨ)
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

//             // 🌟 ĐÃ THAY ĐỔI: Dùng hàm render và biến tạm để quản lý thao tác xóa
//             let danhSachAnh = tt.danh_sach_anh || [];
//             if (typeof danhSachAnh === 'string') { try { danhSachAnh = JSON.parse(danhSachAnh); } catch (e) { danhSachAnh = []; } }

//             window.gvcn_AnhTuanCuTam = [...danhSachAnh];
//             if (typeof window.ham_21_28_render_anh_tuan_cu === 'function') window.ham_21_28_render_anh_tuan_cu();

//             vungPreviewMoi.innerHTML = '<span style="color:#28a745; font-weight:bold;">(Có thể tải thêm ảnh mới ở đây...)</span>';

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



// // =====================================================================
// // HÀM 21.16: TỰ ĐỘNG DÒ VÀ NẠP DỮ LIỆU TUẦN CŨ CHO MỤC 1 (ĐÃ GỠ BỎ MỐC CỐ ĐỊNH)
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

//             window.gvcn_AnhTuanCuTam = [...danhSachAnh];
//             if (typeof window.ham_21_28_render_anh_tuan_cu === 'function') window.ham_21_28_render_anh_tuan_cu();

//             vungPreviewMoi.innerHTML = '<span style="color:#28a745; font-weight:bold;">(Có thể tải thêm ảnh mới ở đây...)</span>';

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
//                         innerTable = `<div style="padding:15px; color:#adb5bd; font-style:italic;">Không chỉ định người nhận (Giao chung toàn lớp)</div>`;
//                     }

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
//             // Nếu chưa có DB, làm sạch form (GỠ BỎ CODE CỐ ĐỊNH MỐC TẠI ĐÂY)
//             document.getElementById('gvcn-nd-sinh-hoat').value = ''; document.getElementById('gvcn-danh-gia-tuan').value = '';
//             vungAnhCu.innerHTML = ''; vungPreviewMoi.innerHTML = '<span>(Chưa có ảnh...)</span>'; bangCu.innerHTML = '';
//         }
//     } catch (e) { console.error(e); }
// };



// =====================================================================
// HÀM 21.16: TỰ ĐỘNG DÒ, TÍNH NGÀY VÀ NẠP DỮ LIỆU TUẦN CŨ CHO MỤC 1
// =====================================================================
window.ham_21_16_tai_du_lieu_tuan = async function () {
    const maLopRaw = document.getElementById('gvcn-input-lop').value;
    const tuan = document.getElementById('gvcn-input-tuan').value.trim();
    if (!maLopRaw || !tuan) return;

    const maLop = maLopRaw.match(/\(([^)]+)\)$/)?.[1]?.trim() || maLopRaw;
    const bangCu = document.getElementById('gvcn-bang-noi-dung-cu');

    // 🌟 THUẬT TOÁN TỰ ĐỘNG TÍNH KHOẢNG NGÀY THEO TUẦN (Mốc 07/09/2026)
    let mondayStr = '';
    let sundayStr = '';
    let soTuan = parseInt(tuan.replace(/\D/g, ''));
    if (!isNaN(soTuan)) {
        let d = new Date('2026-09-07T00:00:00');
        d.setDate(d.getDate() + (soTuan - 1) * 7);
        mondayStr = d.toISOString().split('T')[0];

        let d2 = new Date(d);
        d2.setDate(d2.getDate() + 6);
        sundayStr = d2.toISOString().split('T')[0];
    }

    try {
        const { data: nkData } = await _supabase.from('nhat_ky_gvcn')
            .select('*').eq('ma_lop', maLop).eq('tuan_hoc', tuan).maybeSingle();

        let vungAnhCu = document.getElementById('gvcn-vung-anh-cu-tuan');
        let vungPreviewMoi = document.getElementById('gvcn-vung-preview-anh-tuan');

        if (nkData) {
            let tt = nkData.thong_tin_mo_rong || {};

            // Nếu DB có ngày thì lấy DB, nếu rỗng thì lấy ngày vừa tự tính
            document.getElementById('gvcn-tuan-tu').value = nkData.tu_ngay || mondayStr;
            document.getElementById('gvcn-tuan-den').value = nkData.den_ngay || sundayStr;

            document.getElementById('gvcn-nd-sinh-hoat').value = nkData.noi_dung_sinh_hoat || '';
            document.getElementById('gvcn-danh-gia-tuan').value = nkData.danh_gia_tuan || '';

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
                        innerTable = `<div style="padding:15px; color:#adb5bd; font-style:italic;">Không chỉ định người nhận (Giao chung toàn lớp)</div>`;
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
            // 🌟 NẾU CHƯA CÓ TRONG HỆ THỐNG: CHỈ NẠP NGÀY VÀ LÀM TRỐNG DỮ LIỆU
            if (mondayStr) document.getElementById('gvcn-tuan-tu').value = mondayStr;
            if (sundayStr) document.getElementById('gvcn-tuan-den').value = sundayStr;

            document.getElementById('gvcn-nd-sinh-hoat').value = '';
            document.getElementById('gvcn-danh-gia-tuan').value = '';
            vungAnhCu.innerHTML = '';
            vungPreviewMoi.innerHTML = '<span>(Chưa có ảnh...)</span>';
            bangCu.innerHTML = '';
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

// window.ham_21_30_cap_nhat_ngay_tuan_su_kien = function () {
//     let inputTuan = document.getElementById('gvcn-sk-tuan-chon');
//     let tuNgayInput = document.getElementById('gvcn-sk-tuan-tu');
//     let denNgayInput = document.getElementById('gvcn-sk-tuan-den');
//     if (!inputTuan || !tuNgayInput || !denNgayInput) return;

//     let val = inputTuan.value.trim();
//     let soTuan = parseInt(val.replace(/\D/g, ''));
//     if (isNaN(soTuan)) return;

//     // Lấy ngày bắt đầu của tuần 1 từ Mục 1 (hoặc mặc định lấy ngày hiện tại)
//     let tuan1Tu = document.getElementById('gvcn-tuan-tu').value;
//     let d = tuan1Tu ? new Date(tuan1Tu) : new Date();

//     // Cộng dồn 7 ngày cho mỗi tuần tiếp theo
//     d.setDate(d.getDate() + (soTuan - 1) * 7);
//     let monday = d.toISOString().split('T')[0];

//     let d2 = new Date(d);
//     d2.setDate(d2.getDate() + 6);
//     let sunday = d2.toISOString().split('T')[0];

//     tuNgayInput.value = monday;
//     denNgayInput.value = sunday;
// };


// // =====================================================================
// // HÀM 21.30: TỰ ĐỘNG ĐẨY NGÀY CỦA TUẦN VÀO CÁC DÒNG ĐANG TRỐNG
// // =====================================================================
// window.ham_21_30_cap_nhat_ngay_tuan_su_kien = function () {
//     let inputTuan = document.getElementById('gvcn-sk-tuan-chon');
//     let tuNgayInput = document.getElementById('gvcn-sk-tuan-tu');
//     let denNgayInput = document.getElementById('gvcn-sk-tuan-den');
//     if (!inputTuan || !tuNgayInput || !denNgayInput) return;

//     let val = inputTuan.value.trim();
//     let soTuan = parseInt(val.replace(/\D/g, ''));
//     if (isNaN(soTuan)) return;

//     // Lấy ngày bắt đầu của tuần 1 từ Mục 1 (hoặc mặc định lấy ngày hiện tại)
//     let tuan1Tu = document.getElementById('gvcn-tuan-tu').value;
//     let d = tuan1Tu ? new Date(tuan1Tu) : new Date();

//     // Cộng dồn 7 ngày cho mỗi tuần tiếp theo
//     d.setDate(d.getDate() + (soTuan - 1) * 7);
//     let monday = d.toISOString().split('T')[0];

//     let d2 = new Date(d);
//     d2.setDate(d2.getDate() + 6);
//     let sunday = d2.toISOString().split('T')[0];

//     tuNgayInput.value = monday;
//     denNgayInput.value = sunday;

//     // 🌟 Tự động cập nhật Ngày của các dòng đang nhập dở (nếu chưa gõ tên Học sinh)
//     let cacDong = document.querySelectorAll('.dong-nhap-su-kien');
//     cacDong.forEach(dong => {
//         let hsInput = dong.querySelector('.sk-hs');
//         // Nếu ô học sinh vẫn trống thì cho phép đồng bộ ngày theo tuần vừa đổi
//         if (hsInput && hsInput.value.trim() === '') {
//             let ngayInput = dong.querySelector('.sk-ngay');
//             let thuInput = dong.querySelector('.sk-thu');
//             if (ngayInput) ngayInput.value = monday;
//             if (thuInput && typeof window.ham_21_39_lay_thu_trong_tuần === 'function') {
//                 thuInput.value = window.ham_21_39_lay_thu_trong_tuần(monday);
//             }
//         }
//     });
// };

// // =====================================================================
// // HÀM 21.30: LẤY ĐÚNG NGÀY ĐÃ LƯU TRONG HỆ THỐNG KHI CHỌN TUẦN SỰ KIỆN
// // =====================================================================
// window.ham_21_30_cap_nhat_ngay_tuan_su_kien = async function () {
//     let inputTuan = document.getElementById('gvcn-sk-tuan-chon');
//     let tuNgayInput = document.getElementById('gvcn-sk-tuan-tu');
//     let denNgayInput = document.getElementById('gvcn-sk-tuan-den');
//     let inputLop = document.getElementById('gvcn-input-lop');

//     if (!inputTuan || !tuNgayInput || !denNgayInput || !inputLop) return;

//     let tuan = inputTuan.value.trim();
//     if (!tuan) return;

//     let maLopRaw = inputLop.value.trim();
//     let maLop = maLopRaw.match(/\(([^)]+)\)$/)?.[1]?.trim() || maLopRaw;

//     let monday = '';
//     let sunday = '';

//     try {
//         // 🌟 TRUY VẤN VÀO HỆ THỐNG ĐỂ LẤY NGÀY ĐÃ LƯU CỦA TUẦN ĐÓ
//         const { data, error } = await _supabase.from('nhat_ky_gvcn')
//             .select('tu_ngay, den_ngay')
//             .eq('ma_lop', maLop)
//             .eq('tuan_hoc', tuan)
//             .maybeSingle();

//         if (data && data.tu_ngay) {
//             monday = data.tu_ngay;
//             sunday = data.den_ngay || '';
//         } else {
//             // Nếu tuần này chưa từng được lưu trong DB, lấy tạm ngày ở Mục 1 làm gốc
//             let tuan1Tu = document.getElementById('gvcn-tuan-tu').value;
//             let d = tuan1Tu ? new Date(tuan1Tu) : new Date();
//             monday = d.toISOString().split('T')[0];
//             let d2 = new Date(d);
//             d2.setDate(d2.getDate() + 6);
//             sunday = d2.toISOString().split('T')[0];
//         }

//         tuNgayInput.value = monday;
//         if (sunday) denNgayInput.value = sunday;

//         // 🌟 Tự động cập nhật Ngày của các dòng đang nhập dở (Nếu chưa gõ tên HS)
//         let cacDong = document.querySelectorAll('.dong-nhap-su-kien');
//         cacDong.forEach(dong => {
//             let hsInput = dong.querySelector('.sk-hs');
//             if (hsInput && hsInput.value.trim() === '') {
//                 let ngayInput = dong.querySelector('.sk-ngay');
//                 let thuInput = dong.querySelector('.sk-thu');
//                 if (ngayInput) ngayInput.value = monday;
//                 if (thuInput && typeof window.ham_21_39_lay_thu_trong_tuần === 'function') {
//                     thuInput.value = window.ham_21_39_lay_thu_trong_tuần(monday);
//                 }
//             }
//         });
//     } catch (e) {
//         console.error("Lỗi lấy ngày tuần từ hệ thống:", e);
//     }
// };



// // =====================================================================
// // HÀM 21.30: KHI CHỌN TUẦN SẼ TỰ ĐỘNG NẠP LẠI SỰ KIỆN ĐÃ LƯU TRƯỚC ĐÓ VÀO BẢNG
// // =====================================================================
// window.ham_21_30_cap_nhat_ngay_tuan_su_kien = async function () {
//     let inputTuan = document.getElementById('gvcn-sk-tuan-chon');
//     let tuNgayInput = document.getElementById('gvcn-sk-tuan-tu');
//     let denNgayInput = document.getElementById('gvcn-sk-tuan-den');
//     let inputLop = document.getElementById('gvcn-input-lop');

//     if (!inputTuan || !tuNgayInput || !denNgayInput || !inputLop) return;

//     let tuan = inputTuan.value.trim();
//     if (!tuan) return;

//     let maLopRaw = inputLop.value.trim();
//     let maLop = maLopRaw.match(/\(([^)]+)\)$/)?.[1]?.trim() || maLopRaw;

//     let monday = '';
//     let sunday = '';
//     let idNhatKyGvcn = null;

//     try {
//         // Lấy ngày của tuần
//         const { data: nkData } = await _supabase.from('nhat_ky_gvcn')
//             .select('id, tu_ngay, den_ngay')
//             .eq('ma_lop', maLop)
//             .eq('tuan_hoc', tuan)
//             .maybeSingle();

//         if (nkData && nkData.tu_ngay) {
//             monday = nkData.tu_ngay;
//             sunday = nkData.den_ngay || '';
//             idNhatKyGvcn = nkData.id;
//         } else {
//             let soTuan = parseInt(tuan.replace(/\D/g, ''));
//             if (!isNaN(soTuan)) {
//                 let d = new Date('2026-09-07T00:00:00');
//                 d.setDate(d.getDate() + (soTuan - 1) * 7);
//                 monday = d.toISOString().split('T')[0];
//                 let d2 = new Date(d);
//                 d2.setDate(d2.getDate() + 6);
//                 sunday = d2.toISOString().split('T')[0];
//             }
//         }

//         tuNgayInput.value = monday;
//         if (sunday) denNgayInput.value = sunday;

//         // 🌟 XÓA BẢNG VÀ NẠP LẠI TOÀN BỘ SỰ KIỆN CỦA TUẦN NÀY (NẾU CÓ)
//         const khuVuc = document.getElementById('gvcn-khu-vuc-su-kien-nhanh');
//         if (khuVuc) khuVuc.innerHTML = '';

//         if (idNhatKyGvcn) {
//             // Chỉ lấy các sự kiện vi phạm/khen thưởng (Bỏ qua Giao việc)
//             const { data: dsSuKien } = await _supabase.from('nhat_ky_gvcn_su_kien_hs')
//                 .select('*')
//                 .eq('id_gvcn_nhat_ky', idNhatKyGvcn)
//                 .not('nhom_su_kien', 'ilike', 'Giao việc:%')
//                 .order('ngay_ghi_nhan', { ascending: true })
//                 .order('id', { ascending: true });

//             if (dsSuKien && dsSuKien.length > 0) {
//                 dsSuKien.forEach(sk => {
//                     window.ham_21_4_them_dong_su_kien(sk);
//                 });
//             }
//         }

//         // Luôn đính kèm thêm 1 dòng trống ở cuối cùng để sẵn sàng nhập liệu mới
//         window.ham_21_4_them_dong_su_kien();

//     } catch (e) {
//         console.error("Lỗi nạp sự kiện cũ:", e);
//     }
// };



// // =====================================================================
// // HÀM 21.30: NẠP LẠI SỰ KIỆN CŨ VÀ KHÔNG TỰ THÊM DÒNG TRỐNG NẾU ĐÃ CÓ DATA
// // =====================================================================
// window.ham_21_30_cap_nhat_ngay_tuan_su_kien = async function () {
//     let inputTuan = document.getElementById('gvcn-sk-tuan-chon');
//     let tuNgayInput = document.getElementById('gvcn-sk-tuan-tu');
//     let denNgayInput = document.getElementById('gvcn-sk-tuan-den');
//     let inputLop = document.getElementById('gvcn-input-lop');

//     if (!inputTuan || !tuNgayInput || !denNgayInput || !inputLop) return;

//     let tuan = inputTuan.value.trim();
//     if (!tuan) return;

//     let maLopRaw = inputLop.value.trim();
//     let maLop = maLopRaw.match(/\(([^)]+)\)$/)?.[1]?.trim() || maLopRaw;

//     let monday = '';
//     let sunday = '';
//     let idNhatKyGvcn = null;

//     try {
//         // Lấy ngày của tuần từ Database
//         const { data: nkData, error } = await _supabase.from('nhat_ky_gvcn')
//             .select('id, tu_ngay, den_ngay')
//             .eq('ma_lop', maLop)
//             .eq('tuan_hoc', tuan)
//             .maybeSingle();

//         if (nkData && nkData.tu_ngay) {
//             monday = nkData.tu_ngay;
//             sunday = nkData.den_ngay || '';
//             idNhatKyGvcn = nkData.id;
//         } else {
//             // Nếu chưa có trong DB, tự tính dựa vào mốc 07/09/2026
//             let soTuan = parseInt(tuan.replace(/\D/g, ''));
//             if (!isNaN(soTuan)) {
//                 let d = new Date('2026-09-07T00:00:00');
//                 d.setDate(d.getDate() + (soTuan - 1) * 7);
//                 monday = d.toISOString().split('T')[0];
//                 let d2 = new Date(d);
//                 d2.setDate(d2.getDate() + 6);
//                 sunday = d2.toISOString().split('T')[0];
//             }
//         }

//         tuNgayInput.value = monday;
//         if (sunday) denNgayInput.value = sunday;

//         // XÓA BẢNG VÀ NẠP LẠI TOÀN BỘ SỰ KIỆN CỦA TUẦN NÀY (NẾU CÓ)
//         const khuVuc = document.getElementById('gvcn-khu-vuc-su-kien-nhanh');
//         if (khuVuc) khuVuc.innerHTML = '';

//         let daCoSuKien = false;

//         if (idNhatKyGvcn) {
//             // Chỉ lấy các sự kiện vi phạm/khen thưởng (Bỏ qua Giao việc)
//             const { data: dsSuKien } = await _supabase.from('nhat_ky_gvcn_su_kien_hs')
//                 .select('*')
//                 .eq('id_gvcn_nhat_ky', idNhatKyGvcn)
//                 .not('nhom_su_kien', 'ilike', 'Giao việc:%')
//                 .order('ngay_ghi_nhan', { ascending: true })
//                 .order('id', { ascending: true });

//             if (dsSuKien && dsSuKien.length > 0) {
//                 daCoSuKien = true; // Bật cờ đã có dữ liệu
//                 dsSuKien.forEach(sk => {
//                     window.ham_21_4_them_dong_su_kien(sk);
//                 });
//             }
//         }

//         // 🌟 CHỈ đính kèm thêm 1 dòng trống nếu tuần này HOÀN TOÀN CHƯA CÓ sự kiện nào
//         if (!daCoSuKien) {
//             window.ham_21_4_them_dong_su_kien();
//         } else {
//             // Cập nhật lại ngày cho các dòng lỡ thêm nhưng chưa nhập liệu (nếu có)
//             let cacDong = document.querySelectorAll('.dong-nhap-su-kien');
//             cacDong.forEach(dong => {
//                 let hsInput = dong.querySelector('.sk-hs');
//                 if (hsInput && hsInput.value.trim() === '') {
//                     let ngayInput = dong.querySelector('.sk-ngay');
//                     let thuInput = dong.querySelector('.sk-thu');
//                     if (ngayInput) ngayInput.value = monday;
//                     if (thuInput && typeof window.ham_21_39_lay_thu_trong_tuần === 'function') {
//                         thuInput.value = window.ham_21_39_lay_thu_trong_tuần(monday);
//                     }
//                 }
//             });
//         }

//     } catch (e) {
//         console.error("Lỗi nạp sự kiện cũ:", e);
//     }
// };



// =====================================================================
// HÀM 21.30: NẠP LẠI SỰ KIỆN CŨ VÀ KHÔNG TỰ THÊM DÒNG TRỐNG NẾU TRỐNG
// =====================================================================
window.ham_21_30_cap_nhat_ngay_tuan_su_kien = async function () {
    let inputTuan = document.getElementById('gvcn-sk-tuan-chon');
    let tuNgayInput = document.getElementById('gvcn-sk-tuan-tu');
    let denNgayInput = document.getElementById('gvcn-sk-tuan-den');
    let inputLop = document.getElementById('gvcn-input-lop');

    if (!inputTuan || !tuNgayInput || !denNgayInput || !inputLop) return;

    let tuan = inputTuan.value.trim();
    if (!tuan) return;

    let maLopRaw = inputLop.value.trim();
    let maLop = maLopRaw.match(/\(([^)]+)\)$/)?.[1]?.trim() || maLopRaw;

    let monday = '';
    let sunday = '';
    let idNhatKyGvcn = null;

    try {
        const { data: nkData, error } = await _supabase.from('nhat_ky_gvcn')
            .select('id, tu_ngay, den_ngay')
            .eq('ma_lop', maLop)
            .eq('tuan_hoc', tuan)
            .maybeSingle();

        if (nkData && nkData.tu_ngay) {
            monday = nkData.tu_ngay;
            sunday = nkData.den_ngay || '';
            idNhatKyGvcn = nkData.id;
        } else {
            let soTuan = parseInt(tuan.replace(/\D/g, ''));
            if (!isNaN(soTuan)) {
                let d = new Date('2026-09-07T00:00:00');
                d.setDate(d.getDate() + (soTuan - 1) * 7);
                monday = d.toISOString().split('T')[0];
                let d2 = new Date(d);
                d2.setDate(d2.getDate() + 6);
                sunday = d2.toISOString().split('T')[0];
            }
        }

        tuNgayInput.value = monday;
        if (sunday) denNgayInput.value = sunday;

        const khuVuc = document.getElementById('gvcn-khu-vuc-su-kien-nhanh');
        if (khuVuc) khuVuc.innerHTML = '';

        if (idNhatKyGvcn) {
            const { data: dsSuKien } = await _supabase.from('nhat_ky_gvcn_su_kien_hs')
                .select('*')
                .eq('id_gvcn_nhat_ky', idNhatKyGvcn)
                .not('nhom_su_kien', 'ilike', 'Giao việc:%')
                .order('ngay_ghi_nhan', { ascending: true })
                .order('id', { ascending: true });

            if (dsSuKien && dsSuKien.length > 0) {
                dsSuKien.forEach(sk => {
                    window.ham_21_4_them_dong_su_kien(sk);
                });
            }
        }

        // Cập nhật lại ngày cho các dòng lỡ bấm thêm nhưng chưa nhập liệu (nếu có)
        let cacDong = document.querySelectorAll('.dong-nhap-su-kien');
        cacDong.forEach(dong => {
            let hsInput = dong.querySelector('.sk-hs');
            if (hsInput && hsInput.value.trim() === '') {
                let ngayInput = dong.querySelector('.sk-ngay');
                let thuInput = dong.querySelector('.sk-thu');
                if (ngayInput) ngayInput.value = monday;
                if (thuInput && typeof window.ham_21_39_lay_thu_trong_tuần === 'function') {
                    thuInput.value = window.ham_21_39_lay_thu_trong_tuần(monday);
                }
            }
        });

    } catch (e) {
        console.error("Lỗi nạp sự kiện cũ:", e);
    }
};












// // =====================================================================
// // HÀM 21.31: THÊM MỘT DÒNG NGANG MỚI NGAY BÊN DƯỚI (ĐẦY ĐỦ CỘT CHO HỌC SINH TIẾP THEO)
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
//             <button type="button" onclick="this.closest('.dong-chi-tiet-hs').remove()" style="padding: 6px 8px; background: #f8d7da; color: #dc3545; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;" title="Xóa dòng này">✖</button>
//         </div>
//     `;
//     vungDS.appendChild(dongMoi);
//     if (typeof window.ham_20_7_tai_danh_sach_lop === 'function') {
//         window.ham_20_7_tai_danh_sach_lop();
//     }
// };



// // =====================================================================
// // HÀM 21.31: THÊM MỘT DÒNG NGANG MỚI NGAY BÊN DƯỚI (ĐẦY ĐỦ CỘT CHO HỌC SINH TIẾP THEO)
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
//             <button type="button" onclick="this.closest('.dong-chi-tiet-hs').remove()" style="padding: 6px 8px; background: #f8d7da; color: #dc3545; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;" title="Xóa dòng này">✖</button>
//         </div>
//     `;
//     vungDS.appendChild(dongMoi);
//     if (typeof window.ham_20_7_tai_danh_sach_lop === 'function') {
//         window.ham_20_7_tai_danh_sach_lop();
//     }
// };


// =====================================================================
// HÀM 21.31: THÊM DÒNG HS CÙNG SỰ KIỆN (COPY DATA TỪ DÒNG ĐANG CHỌN)
// =====================================================================
window.ham_21_31_them_hs_cho_su_kien = function (btn) {
    let dongMau = btn.closest('.dong-nhap-su-kien');
    if (!dongMau) return;

    let ngayVal = dongMau.querySelector('.sk-ngay').value;
    let thuVal = dongMau.querySelector('.sk-thu').value;
    let buoiVal = dongMau.querySelector('.sk-buoi').value;
    let loiVal = dongMau.querySelector('.sk-loi').value;
    let diemVal = dongMau.querySelector('.sk-diem-tru').value;

    window.ham_21_4_them_dong_su_kien(); // Tạo dòng mới

    // Lấy dòng vừa tạo (nằm cuối cùng) để nhét data mẫu vào
    let khuVuc = document.getElementById('gvcn-khu-vuc-su-kien-nhanh');
    let dongMoi = khuVuc.lastElementChild;

    if (dongMoi) {
        dongMoi.querySelector('.sk-ngay').value = ngayVal;
        dongMoi.querySelector('.sk-thu').value = thuVal;
        dongMoi.querySelector('.sk-buoi').value = buoiVal;
        dongMoi.querySelector('.sk-loi').value = loiVal;
        dongMoi.querySelector('.sk-diem-tru').value = diemVal;
    }
};











// // =====================================================================
// // HÀM 21.34: NẠP TOÀN BỘ 57 LỖI THI ĐUA CHUẨN VÀ PHÂN NHÓM LÊN MỤC 5
// // =====================================================================
// window.ham_21_34_render_tat_ca_cac_the_su_kien = async function () {
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

//             vung.innerHTML = htmlGroup;
//         });
//     } catch (e) { console.error("Lỗi render thẻ nội quy:", e); }
// };



// // =====================================================================
// // SỬA LẠI HÀM 21.34: TRẢ DANH SÁCH LỖI VÀO BIẾN TOÀN CỤC VÀ ĐỔ VÀO DATALIST
// // =====================================================================
// window.ham_21_34_render_tat_ca_cac_the_su_kien = async function () {
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
//         let { data: customData } = await _supabase.from('cai_dat_the_su_kien').select('*');
//         window.gvcn_DanhSachTheSuKien = [...danhSachNoiQuyChuan];

//         if (customData) {
//             customData.forEach(cd => {
//                 if (!window.gvcn_DanhSachTheSuKien.some(x => x.ten === cd.ten_the)) {
//                     window.gvcn_DanhSachTheSuKien.push({ ten: cd.ten_the, diem: 1, nhom: "KHÁC / TÙY CHỈNH" });
//                 }
//             });
//         }

//         // Đổ vào Datalist
//         const datalistLoi = document.getElementById('gvcn-dl-loi');
//         if (datalistLoi) {
//             let htmlOptions = '';
//             window.gvcn_DanhSachTheSuKien.forEach(t => {
//                 htmlOptions += `<option value="${t.ten}"></option>`;
//             });
//             datalistLoi.innerHTML = htmlOptions;
//         }
//     } catch (e) { console.error("Lỗi render thẻ nội quy:", e); }
// };



// // =====================================================================
// // HÀM 21.34: RENDER BẢNG CHỌN NHANH LỖI (CÓ NÚT SỬA ✏️ VÀ NÚT THÊM ➕ Ở TỪNG NHÓM)
// // =====================================================================
// window.ham_21_34_render_tat_ca_cac_the_su_kien = async function () {
//     const danhSachNoiQuyChuan = [
//         { ten: "Đi học trễ (sáng/chiều)", diem: -1, nhom: "I. THỜI GIAN" },
//         { ten: "Nghỉ học phép (không quá 05 buổi/hk)", diem: 0, nhom: "I. THỜI GIAN" },
//         { ten: "Nghỉ học phép từ lần 6 (trừ bệnh/tang gia)", diem: -0.5, nhom: "I. THỜI GIAN" },
//         { ten: "Xin phép trễ", diem: -2, nhom: "I. THỜI GIAN" },
//         { ten: "Nghỉ học không phép", diem: -4, nhom: "I. THỜI GIAN" },
//         { ten: "Nghỉ học tiết 1, tiết 5", diem: -2, nhom: "I. THỜI GIAN" },
//         { ten: "Nghỉ học tiết 1 và tiết 2", diem: -3, nhom: "I. THỜI GIAN" },
//         { ten: "Trống đánh vào tiết mà chưa vào lớp", diem: -1, nhom: "I. THỜI GIAN" },
//         { ten: "Trốn tiết giờ chào cờ", diem: -5, nhom: "I. THỜI GIAN" },
//         { ten: "Trốn trong lớp giờ Bán trú", diem: -2, nhom: "I. THỜI GIAN" },
//         { ten: "Trốn tiết", diem: -5, nhom: "I. THỜI GIAN" },
//         { ten: "Không quét thẻ hoặc khuôn mặt đúng quy định", diem: -1, nhom: "I. THỜI GIAN" },
//         { ten: "Làm ồn trong giờ bán trú", diem: -1, nhom: "I. THỜI GIAN" },
//         { ten: "Ngồi sai lớp giờ chào cờ/SH dưới sân", diem: -2, nhom: "I. THỜI GIAN" },
//         { ten: "Nói chuyện riêng, dùng ĐTDH giờ chào cờ/SH", diem: -2, nhom: "I. THỜI GIAN" },
//         { ten: "Sử dụng điện thoại trong giờ học", diem: -4, nhom: "I. THỜI GIAN" },
//         { ten: "Sử dụng/cắm sạc thiết bị điện từ trong phòng học", diem: -2, nhom: "I. THỜI GIAN" },
//         { ten: "Xuống Căn tin trong giờ học", diem: -2, nhom: "I. THỜI GIAN" },
//         { ten: "Rượt đuổi nhau, chơi bóng, đá cầu hành lang/lớp học", diem: -2, nhom: "I. THỜI GIAN" },
//         { ten: "Nói tục, chửi thề", diem: -5, nhom: "I. THỜI GIAN" },
//         { ten: "Tự tập làm mất trật tự nhà trường (Bán trú)", diem: -5, nhom: "I. THỜI GIAN" },
//         { ten: "Ứng xử không phù hợp trên mạng xã hội", diem: -5, nhom: "I. THỜI GIAN" },
//         { ten: "Có hành động không phù hợp với bạn học", diem: -5, nhom: "I. THỜI GIAN" },
//         { ten: "Kêu gọi, lôi kéo bạn làm mất trật tự nhà trường", diem: -10, nhom: "I. THỜI GIAN" },
//         { ten: "Mang, hút thuốc lá/thuốc lá điện tử trong trường", diem: -10, nhom: "I. THỜI GIAN" },
//         { ten: "Không mang tập sách", diem: -1, nhom: "II. SỔ ĐẦU BÀI" },
//         { ten: "Nói chuyện riêng trong giờ học", diem: -1, nhom: "II. SỔ ĐẦU BÀI" },
//         { ten: "Xả rác trong hộc bàn, lớp học", diem: -1, nhom: "II. SỔ ĐẦU BÀI" },
//         { ten: "Ăn trong lớp học và giờ chào cờ, sinh hoạt", diem: -2, nhom: "II. SỔ ĐẦU BÀI" },
//         { ten: "Không thuộc bài", diem: -2, nhom: "II. SỔ ĐẦU BÀI" },
//         { ten: "Không chép bài và làm bài đầy đủ", diem: -2, nhom: "II. SỔ ĐẦU BÀI" },
//         { ten: "Đánh bài (bài tây 52 lá), cá cược trong trường", diem: -10, nhom: "II. SỔ ĐẦU BÀI" },
//         { ten: "Leo rào trốn tiết", diem: -10, nhom: "II. SỔ ĐẦU BÀI" },
//         { ten: "Mang & sử dụng rượu, bia, chất kích thích, chất gây nghiện", diem: -15, nhom: "II. SỔ ĐẦU BÀI" },
//         { ten: "Gây gỗ, đánh nhau", diem: -15, nhom: "II. SỔ ĐẦU BÀI" },
//         { ten: "Trộm cắp tài sản", diem: -15, nhom: "II. SỔ ĐẦU BÀI" },
//         { ten: "Vô lễ với giáo viên, nhân viên nhà trường", diem: -20, nhom: "II. SỔ ĐẦU BÀI" },
//         { ten: "Trang điểm, sơn móng tay, tóc xịt keo", diem: -1, nhom: "III. TÁC PHONG" },
//         { ten: "Nam sinh đeo bông tai, nữ sinh đeo >2 bông tai", diem: -2, nhom: "III. TÁC PHONG" },
//         { ten: "Tóc nhuộm màu", diem: -4, nhom: "III. TÁC PHONG" },
//         { ten: "Nam sinh để tóc dài, cắt tóc kiểu, đầu đinh", diem: -2, nhom: "III. TÁC PHONG" },
//         { ten: "Mặc trang phục sai quy định (thiếu phù hiệu, áo bỏ ngoài quần)", diem: -2, nhom: "III. TÁC PHONG" },
//         { ten: "Mang giày không đúng quy định", diem: -2, nhom: "III. TÁC PHONG" },
//         { ten: "Cố ý mở cửa vào phòng học khi lớp đã ra về", diem: -5, nhom: "III. TÁC PHONG" },
//         { ten: "Vẽ hình xăm, xăm mình hoặc không khắc phục", diem: -5, nhom: "III. TÁC PHONG" },
//         { ten: "Vắng ăn, ngủ bán trú có phép (không quá 2 lần/hk)", diem: 0, nhom: "IV. NỀ NẾP" },
//         { ten: "Vắng ăn, ngủ bán trú không phép", diem: -2, nhom: "IV. NỀ NẾP" },
//         { ten: "Lớp không lấy sổ Đầu bài hoặc không nộp", diem: -5, nhom: "V. TẬP THỂ" },
//         { ten: "Lớp ồn trong giờ vắng giáo viên", diem: -5, nhom: "V. TẬP THỂ" },
//         { ten: "Lớp không khóa cửa, trả chìa khóa sau giờ học", diem: -5, nhom: "V. TẬP THỂ" },
//         { ten: "Bàn ghế xếp không ngay ngắn", diem: -5, nhom: "V. TẬP THỂ" },
//         { ten: "Lớp không ghi sổ đầu giờ", diem: -2, nhom: "V. TẬP THỂ" },
//         { ten: "Xếp hàng muộn, không thẳng, không dọn vệ sinh", diem: -10, nhom: "V. TẬP THỂ" },
//         { ten: "Lớp ra về không tắt đèn, quạt, máy lạnh", diem: -10, nhom: "V. TẬP THỂ" },
//         { ten: "Lớp vệ sinh không sạch", diem: -10, nhom: "V. TẬP THỂ" },
//         { ten: "Lớp ồn trong giờ học", diem: -10, nhom: "V. TẬP THỂ" },
//         { ten: "Lớp làm mất sổ Đầu bài", diem: -20, nhom: "V. TẬP THỂ" }
//     ];

//     try {
//         let { data: customData } = await _supabase.from('cai_dat_the_su_kien').select('*');
//         window.gvcn_DanhSachTheSuKien = [...danhSachNoiQuyChuan];

//         if (customData) {
//             customData.forEach(cd => {
//                 let idx = window.gvcn_DanhSachTheSuKien.findIndex(x => x.ten === cd.ten_the);
//                 if (idx !== -1) {
//                     // Ghi đè dữ liệu nếu thẻ chuẩn đã bị chỉnh sửa
//                     window.gvcn_DanhSachTheSuKien[idx].diem = cd.diem_so !== null ? cd.diem_so : window.gvcn_DanhSachTheSuKien[idx].diem;
//                     if (cd.nhom_su_kien) window.gvcn_DanhSachTheSuKien[idx].nhom = cd.nhom_su_kien;
//                 } else {
//                     // Thêm thẻ mới hoàn toàn
//                     window.gvcn_DanhSachTheSuKien.push({ ten: cd.ten_the, diem: cd.diem_so || 0, nhom: cd.nhom_su_kien || "KHÁC / TÙY CHỈNH" });
//                 }
//             });
//         }

//         let nhomMap = { 'I. THỜI GIAN': [], 'II. SỔ ĐẦU BÀI': [], 'III. TÁC PHONG': [], 'IV. NỀ NẾP': [], 'V. TẬP THỂ': [], 'KHÁC / TÙY CHỈNH': [] };

//         window.gvcn_DanhSachTheSuKien.forEach(t => {
//             if (!nhomMap[t.nhom]) nhomMap[t.nhom] = []; // Hỗ trợ nhóm tùy chỉnh tự sinh
//             nhomMap[t.nhom].push(t);
//         });

//         let vungChonNhanh = document.getElementById('gvcn-khu-vuc-chon-the-duoi-bang');
//         if (vungChonNhanh) {
//             let htmlGroup = '';
//             for (let [tenNhom, danhSachThe] of Object.entries(nhomMap)) {
//                 if (danhSachThe.length === 0) continue;

//                 let tenNhomSafe = tenNhom.replace(/'/g, "\\'");
//                 htmlGroup += `<div style="width:100%; margin-bottom:10px; border-left:3px solid #e83e8c; padding-left:10px;">
//                     <span style="font-size:11px; font-weight:bold; color:#6f42c1; text-transform:uppercase;">${tenNhom}</span>
//                     <div style="display:flex; gap:6px; flex-wrap:wrap; margin-top:5px;">`;

//                 danhSachThe.forEach(t => {
//                     let diemStr = t.diem !== 0 ? ` (${t.diem > 0 ? '+' : ''}${t.diem})` : '';
//                     let bg = '#f8d7da'; let color = '#721c24'; let border = '#f5c6cb';
//                     if (t.diem === 0) { bg = '#e2e3e5'; color = '#383d41'; border = '#d6d8db'; }
//                     if (t.diem > 0) { bg = '#d4edda'; color = '#155724'; border = '#c3e6cb'; }

//                     let tenSafe = t.ten.replace(/'/g, "\\'");

//                     // 🌟 Khối Nút Gộp: Gồm Nút CHỌN và Nút SỬA ✏️
//                     htmlGroup += `
//                     <div style="display:inline-flex; align-items:stretch; border: 1px solid ${border}; border-radius: 4px; overflow: hidden; box-shadow: 0 1px 2px rgba(0,0,0,0.05); margin-bottom:4px;">
//                         <button type="button" onclick="window.ham_21_42_gan_the_vao_dong_hien_hanh('${tenSafe}', ${t.diem})" style="padding: 4px 8px; background: ${bg}; color: ${color}; border: none; cursor: pointer; font-size: 11px; font-weight: bold; transition:0.2s;" title="Điểm: ${t.diem}" onmouseover="this.style.filter='brightness(0.95)'" onmouseout="this.style.filter='brightness(1)'">${t.ten}${diemStr}</button>
//                         <button type="button" onclick="window.ham_21_43_sua_the('${tenSafe}', ${t.diem}, '${tenNhomSafe}')" style="padding: 4px 6px; background: #f8f9fa; color: #6c757d; border: none; border-left: 1px dashed ${border}; cursor: pointer; font-size: 10px; transition:0.2s;" title="Sửa tên/điểm thẻ này" onmouseover="this.style.background='#e9ecef'" onmouseout="this.style.background='#f8f9fa'">✏️</button>
//                     </div>`;
//                 });

//                 // 🌟 Nút thêm sự kiện mới CHOTH TỪNG NHÓM (nằm cuối cùng của vòng lặp)
//                 htmlGroup += `<button type="button" onclick="window.ham_21_32_mo_modal_the('${tenNhomSafe}')" style="padding: 4px 8px; background: #fff; border: 1px dashed #6f42c1; color: #6f42c1; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: bold; margin-bottom:4px; display:inline-flex; align-items:center; box-shadow: 0 1px 2px rgba(0,0,0,0.05); transition:0.2s;" onmouseover="this.style.background='#f8f9fa'" onmouseout="this.style.background='#fff'">➕ Thêm</button>`;

//                 htmlGroup += `</div></div>`;
//             }
//             vungChonNhanh.innerHTML = htmlGroup;
//         }

//         const datalistLoi = document.getElementById('gvcn-dl-loi');
//         if (datalistLoi) {
//             let htmlOptions = '';
//             window.gvcn_DanhSachTheSuKien.forEach(t => { htmlOptions += `<option value="${t.ten}"></option>`; });
//             datalistLoi.innerHTML = htmlOptions;
//         }
//     } catch (e) { console.error("Lỗi render thẻ nội quy:", e); }
// };



// =====================================================================
// HÀM 21.32 & 21.43: HIỂN THỊ MODAL THÊM/SỬA (BỎ CHỌN LOẠI THẺ)
// =====================================================================
window.ham_21_32_mo_modal_the = function (nhomThe) {
    window.ham_21_43_hien_thi_modal_the('', 0, nhomThe, 'them');
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
                    // 🌟 ẢNH PHÓNG TO GẤP 3 LẦN (105x105px)
                    html += `
                    <div style="position:relative; margin-bottom: 2px;">
                        <img src="${imgObj.b64}" style="width:105px; height:105px; object-fit:cover; border-radius:6px; border:1px solid #ccc; box-shadow:0 1px 3px rgba(0,0,0,0.2);">
                        <button type="button" onclick="let d=this.closest('.dong-nhap-su-kien'); let a=JSON.parse(d.dataset.mangAnhDong); a.splice(${idx},1); d.dataset.mangAnhDong=JSON.stringify(a); this.closest('div').remove();" style="position:absolute; top:-6px; right:-6px; background:#dc3545; color:#fff; border:none; border-radius:50%; width:20px; height:20px; font-size:12px; cursor:pointer; display:flex; align-items:center; justify-content:center; box-shadow:0 1px 3px rgba(0,0,0,0.3);">✖</button>
                    </div>`;
                });
                vungPreview.innerHTML = html;
            }
        } catch (e) { console.error(e); }
        inputElem.value = '';
    }
};




// // =====================================================================
// // HÀM 21.34: RENDER BẢNG CHỌN NHANH (100% ĐỌC TỪ DATABASE, KHÔNG CÒN CODE CỨNG)
// // =====================================================================
// window.ham_21_34_render_tat_ca_cac_the_su_kien = async function () {
//     try {
//         // Chỉ đọc từ Database, không còn mảng dữ liệu code cứng
//         let { data: customData } = await _supabase.from('cai_dat_the_su_kien_gvcn').select('*');
//         window.gvcn_DanhSachTheSuKien = [];

//         if (customData) {
//             customData.forEach(cd => {
//                 window.gvcn_DanhSachTheSuKien.push({
//                     ten: cd.ten_the,
//                     diem: cd.diem_so || 0,
//                     nhom: cd.nhom_the || "KHÁC / TÙY CHỈNH"
//                 });
//             });
//         }

//         // Khởi tạo các nhóm cơ bản để giữ thứ tự đẹp, tự động gom nhóm
//         let nhomMapGVCN = { 'I. THỜI GIAN': [], 'II. SỔ ĐẦU BÀI': [], 'III. TÁC PHONG': [], 'IV. NỀ NẾP': [], 'V. TẬP THỂ': [], 'KHÁC / TÙY CHỈNH': [] };

//         window.gvcn_DanhSachTheSuKien.forEach(t => {
//             if (!nhomMapGVCN[t.nhom]) nhomMapGVCN[t.nhom] = [];
//             nhomMapGVCN[t.nhom].push(t);
//         });

//         let htmlGroup = '';
//         for (let [tenNhom, danhSachThe] of Object.entries(nhomMapGVCN)) {
//             if (danhSachThe.length === 0 && tenNhom !== 'KHÁC / TÙY CHỈNH') continue; // Ẩn các nhóm trống

//             let tenNhomSafe = tenNhom.replace(/'/g, "\\'");
//             htmlGroup += `<div style="width:100%; margin-bottom:10px; border-left:3px solid #e83e8c; padding-left:10px;">
//                 <span style="font-size:11px; font-weight:bold; color:#495057; text-transform:uppercase;">${tenNhom}</span>
//                 <div style="display:flex; gap:6px; flex-wrap:wrap; margin-top:5px;">`;

//             danhSachThe.forEach(t => {
//                 let diemStr = t.diem !== 0 ? ` (${t.diem > 0 ? '+' : ''}${t.diem})` : '';
//                 let bg = '#f8d7da'; let color = '#721c24'; let border = '#f5c6cb';
//                 if (t.diem === 0) { bg = '#e2e3e5'; color = '#383d41'; border = '#d6d8db'; }
//                 if (t.diem > 0) { bg = '#d4edda'; color = '#155724'; border = '#c3e6cb'; }

//                 let tenSafe = t.ten.replace(/'/g, "\\'");

//                 htmlGroup += `
//                 <div style="display:inline-flex; align-items:stretch; border: 1px solid ${border}; border-radius: 4px; overflow: hidden; box-shadow: 0 1px 2px rgba(0,0,0,0.05); margin-bottom:4px;">
//                     <button type="button" onclick="window.ham_21_42_gan_the_vao_dong_hien_hanh('${tenSafe}', ${t.diem})" style="padding: 4px 8px; background: ${bg}; color: ${color}; border: none; cursor: pointer; font-size: 11px; font-weight: bold; transition:0.2s;" title="Điểm: ${t.diem}" onmouseover="this.style.filter='brightness(0.95)'" onmouseout="this.style.filter='brightness(1)'">${t.ten}${diemStr}</button>
//                     <button type="button" onclick="window.ham_21_43_sua_the('${tenSafe}', ${t.diem}, '${tenNhomSafe}')" style="padding: 4px 6px; background: #f8f9fa; color: #6c757d; border: none; border-left: 1px dashed ${border}; cursor: pointer; font-size: 10px; transition:0.2s;" title="Sửa thẻ này" onmouseover="this.style.background='#e9ecef'" onmouseout="this.style.background='#f8f9fa'">✏️</button>
//                 </div>`;
//             });

//             htmlGroup += `<button type="button" onclick="window.ham_21_32_mo_modal_the('${tenNhomSafe}')" style="padding: 4px 8px; background: #fff; border: 1px dashed #e83e8c; color: #e83e8c; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: bold; margin-bottom:4px; display:inline-flex; align-items:center; box-shadow: 0 1px 2px rgba(0,0,0,0.05); transition:0.2s;" onmouseover="this.style.background='#f8f9fa'" onmouseout="this.style.background='#fff'">➕ Thêm</button>`;
//             htmlGroup += `</div></div>`;
//         }

//         let vungChonNhanh = document.getElementById('gvcn-khu-vuc-chon-the-duoi-bang');
//         if (vungChonNhanh) {
//             vungChonNhanh.innerHTML = `
//                 <div style="background:#fdf5f8; padding:15px; border-radius:6px; border:1px solid #fce4ec;">
//                     <h5 style="margin-top:0; color:#e83e8c; margin-bottom:10px; font-size:14px; border-bottom:1px solid #fce4ec; padding-bottom:5px;">🛡️ DANH MỤC THẺ SỰ KIỆN / LỖI GVCN</h5>
//                     ${htmlGroup}
//                 </div>
//             `;
//         }

//         const datalistLoi = document.getElementById('gvcn-dl-loi');
//         if (datalistLoi) {
//             let htmlOptions = '';
//             window.gvcn_DanhSachTheSuKien.forEach(t => { htmlOptions += `<option value="${t.ten}"></option>`; });
//             datalistLoi.innerHTML = htmlOptions;
//         }
//     } catch (e) { console.error("Lỗi render thẻ nội quy:", e); }
// };


// =====================================================================
// HÀM 21.34: RENDER BẢNG CHỌN SỰ KIỆN VÀ HÌNH THỨC XỬ LÝ TỪ DATABASE
// =====================================================================
window.ham_21_34_render_tat_ca_cac_the_su_kien = async function () {
    try {
        let { data: customData } = await _supabase.from('cai_dat_the_su_kien_gvcn').select('*');
        window.gvcn_DanhSachTheSuKien = [];
        let theXuLy = [];

        if (customData) {
            customData.forEach(cd => {
                if (cd.nhom_the === 'hinh_thuc_xu_ly') {
                    theXuLy.push({ ten: cd.ten_the, diem: cd.diem_so || 0, nhom: cd.nhom_the });
                } else {
                    window.gvcn_DanhSachTheSuKien.push({
                        ten: cd.ten_the, diem: cd.diem_so || 0, nhom: cd.nhom_the || "KHÁC / TÙY CHỈNH"
                    });
                }
            });
        }

        // Tự động mồi dữ liệu hình thức xử lý mặc định nếu chưa có
        if (theXuLy.length === 0) {
            let mauData = [
                { ten_the: '📝 Chép phạt', nhom_the: 'hinh_thuc_xu_ly', diem_so: 0 },
                { ten_the: '✍️ Viết kiểm điểm', nhom_the: 'hinh_thuc_xu_ly', diem_so: 0 },
                { ten_the: '🧹 Trực nhật', nhom_the: 'hinh_thuc_xu_ly', diem_so: 0 },
                { ten_the: '📌 Khác', nhom_the: 'hinh_thuc_xu_ly', diem_so: 0 }
            ];
            await _supabase.from('cai_dat_the_su_kien_gvcn').insert(mauData);
            mauData.forEach(m => theXuLy.push({ ten: m.ten_the, diem: 0, nhom: m.nhom_the }));
        }

        // --- 1. RENDER NHÓM LỖI SỰ KIỆN CHÍNH ---
        let nhomMapGVCN = { 'I. THỜI GIAN': [], 'II. SỔ ĐẦU BÀI': [], 'III. TÁC PHONG': [], 'IV. NỀ NẾP': [], 'V. TẬP THỂ': [], 'KHÁC / TÙY CHỈNH': [] };
        window.gvcn_DanhSachTheSuKien.forEach(t => {
            if (!nhomMapGVCN[t.nhom]) nhomMapGVCN[t.nhom] = [];
            nhomMapGVCN[t.nhom].push(t);
        });

        let htmlGroup = '';
        for (let [tenNhom, danhSachThe] of Object.entries(nhomMapGVCN)) {
            if (danhSachThe.length === 0 && tenNhom !== 'KHÁC / TÙY CHỈNH') continue;
            let tenNhomSafe = tenNhom.replace(/'/g, "\\'");

            htmlGroup += `<div style="width:100%; margin-bottom:10px; border-left:3px solid #e83e8c; padding-left:10px;">
                <span style="font-size:11px; font-weight:bold; color:#495057; text-transform:uppercase;">${tenNhom}</span>
                <div style="display:flex; gap:6px; flex-wrap:wrap; margin-top:5px;">`;

            danhSachThe.forEach(t => {
                let diemStr = t.diem !== 0 ? ` (${t.diem > 0 ? '+' : ''}${t.diem})` : '';
                let bg = '#f8d7da'; let color = '#721c24'; let border = '#f5c6cb';
                if (t.diem === 0) { bg = '#e2e3e5'; color = '#383d41'; border = '#d6d8db'; }
                if (t.diem > 0) { bg = '#d4edda'; color = '#155724'; border = '#c3e6cb'; }
                let tenSafe = t.ten.replace(/'/g, "\\'");

                htmlGroup += `
                <div style="display:inline-flex; align-items:stretch; border: 1px solid ${border}; border-radius: 4px; overflow: hidden; box-shadow: 0 1px 2px rgba(0,0,0,0.05); margin-bottom:4px;">
                    <button type="button" onclick="window.ham_21_42_gan_the_vao_dong_hien_hanh('${tenSafe}', ${t.diem})" style="padding: 4px 8px; background: ${bg}; color: ${color}; border: none; cursor: pointer; font-size: 11px; font-weight: bold; transition:0.2s;" title="Điểm: ${t.diem}" onmouseover="this.style.filter='brightness(0.95)'" onmouseout="this.style.filter='brightness(1)'">${t.ten}${diemStr}</button>
                    <button type="button" onclick="window.ham_21_43_sua_the('${tenSafe}', ${t.diem}, '${tenNhomSafe}')" style="padding: 4px 6px; background: #f8f9fa; color: #6c757d; border: none; border-left: 1px dashed ${border}; cursor: pointer; font-size: 10px; transition:0.2s;" title="Sửa thẻ này" onmouseover="this.style.background='#e9ecef'" onmouseout="this.style.background='#f8f9fa'">✏️</button>
                </div>`;
            });

            htmlGroup += `<button type="button" onclick="window.ham_21_32_mo_modal_the('${tenNhomSafe}')" style="padding: 4px 8px; background: #fff; border: 1px dashed #e83e8c; color: #e83e8c; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: bold; margin-bottom:4px; display:inline-flex; align-items:center; box-shadow: 0 1px 2px rgba(0,0,0,0.05); transition:0.2s;" onmouseover="this.style.background='#f8f9fa'" onmouseout="this.style.background='#fff'">➕ Thêm mới</button>`;
            htmlGroup += `</div></div>`;
        }

        let vungChonNhanh = document.getElementById('gvcn-khu-vuc-chon-the-duoi-bang');
        if (vungChonNhanh) {
            vungChonNhanh.innerHTML = `
                <div style="background:#fdf5f8; padding:15px; border-radius:6px; border:1px solid #fce4ec;">
                    <h5 style="margin-top:0; color:#e83e8c; margin-bottom:10px; font-size:14px; border-bottom:1px solid #fce4ec; padding-bottom:5px;">🛡️ DANH MỤC THẺ SỰ KIỆN / LỖI GVCN</h5>
                    ${htmlGroup}
                </div>
            `;
        }

        // --- 2. RENDER NHÓM THẺ HÌNH THỨC XỬ LÝ (B4) ---
        let vungTagsXuLy = document.getElementById('gvcn-khu-vuc-tags-xu-ly');
        if (vungTagsXuLy) {
            let htmlXuLy = '';
            theXuLy.forEach(t => {
                let tenSafe = t.ten.replace(/'/g, "\\'");
                htmlXuLy += `
                <div style="display: inline-flex; border: 1px solid #d35400; border-radius: 4px; overflow: hidden; background: #fff;">
                    <button type="button" class="tag-xu-ly-btn" data-color="#d35400" onclick="window.ham_21_chon_hinh_thuc_xu_ly(this, '${tenSafe}')" style="padding: 6px 12px; font-size: 12px; background: transparent; border: none; color: #d35400; cursor: pointer; font-weight: bold; transition: 0.2s;" title="Bấm để chọn hình thức này">${t.ten}</button>
                    <button type="button" onclick="window.ham_21_43_sua_the('${tenSafe}', 0, 'hinh_thuc_xu_ly')" style="padding: 3px 6px; font-size: 10px; background: #f8f9fa; border: none; border-left: 1px dashed #d35400; color: #6c757d; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#e9ecef'" onmouseout="this.style.background='#f8f9fa'" title="Sửa hoặc Xóa">✏️</button>
                </div>`;
            });
            htmlXuLy += `<button type="button" onclick="window.ham_21_32_mo_modal_the('hinh_thuc_xu_ly')" style="padding: 6px 12px; font-size: 12px; background: #f8f9fa; border: 1px dashed #d35400; color: #d35400; border-radius: 4px; cursor: pointer; font-weight: bold; transition: 0.2s;" onmouseover="this.style.background='#e2e6ea'" onmouseout="this.style.background='#f8f9fa'">➕ Thêm hình thức mới</button>`;
            vungTagsXuLy.innerHTML = htmlXuLy;
        }

        const datalistLoi = document.getElementById('gvcn-dl-loi');
        if (datalistLoi) {
            let htmlOptions = '';
            window.gvcn_DanhSachTheSuKien.forEach(t => { htmlOptions += `<option value="${t.ten}"></option>`; });
            datalistLoi.innerHTML = htmlOptions;
        }
    } catch (e) { console.error("Lỗi render thẻ nội quy:", e); }
};












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



// window.ham_21_32_mo_modal_them_the = function () {
//     let modal = document.getElementById('gvcn-modal-them-the');
//     if (!modal) {
//         modal = document.createElement('div');
//         modal.id = 'gvcn-modal-them-the';
//         modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); display:flex; align-items:center; justify-content:center; z-index:999999;';
//         document.body.appendChild(modal);
//     }
//     modal.innerHTML = `
//         <div style="background:#fff; width:400px; padding:20px; border-radius:8px; box-shadow:0 5px 15px rgba(0,0,0,0.3);">
//             <h4 style="margin-top:0; color:#e83e8c;">➕ Thêm Thẻ Sự Kiện Mới</h4>
//             <label style="font-size:12px; font-weight:bold;">Tên thẻ / lỗi:</label>
//             <input type="text" id="gvcn-nhap-ten-the" placeholder="VD: Đi học trễ..." style="width:100%; padding:8px; border:1px solid #ccc; border-radius:4px; margin-top:5px; margin-bottom:15px; box-sizing:border-box;">
            
//             <label style="font-size:12px; font-weight:bold;">Phân loại:</label>
//             <select id="gvcn-chon-nhom-the" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:4px; margin-top:5px; margin-bottom:20px;">
//                 <option value="gvcn_vi_pham">🚨 Vi phạm (Xấu)</option>
//                 <option value="gvcn_tot">🌟 Tốt (Khen thưởng)</option>
//             </select>

//             <div style="text-align:right; display:flex; gap:10px; justify-content:flex-end;">
//                 <button onclick="document.getElementById('gvcn-modal-them-the').remove()" style="padding:8px 15px; background:#6c757d; color:#fff; border:none; border-radius:4px; cursor:pointer;">Hủy</button>
//                 <button onclick="window.ham_21_36_luu_the_moi()" style="padding:8px 20px; background:#e83e8c; color:#fff; border:none; border-radius:4px; cursor:pointer; font-weight:bold;">Lưu thẻ</button>
//             </div>
//         </div>
//     `;
// };



// // window.ham_21_36_luu_the_moi = async function () {
// //     let tenThe = document.getElementById('gvcn-nhap-ten-the').value.trim();
// //     let nhomThe = document.getElementById('gvcn-chon-nhom-the').value;
// //     if (!tenThe) { alert("⚠️ Vui lòng nhập tên thẻ!"); return; }

// //     try {
// //         const { error } = await _supabase.from('cai_dat_the_su_kien').insert([{ ten_the: tenThe, nhom_su_kien: nhomThe }]);
// //         if (error) throw error;
// //         alert("✅ Thêm thẻ mới thành công!");
// //         document.getElementById('gvcn-modal-them-the').remove();
// //         if (typeof window.ham_21_34_render_tat_ca_cac_the_su_kien === 'function') {
// //             window.ham_21_34_render_tat_ca_cac_the_su_kien();
// //         }
// //     } catch (e) { alert("❌ Lỗi: " + e.message); }
// // };

// // window.ham_21_33_chon_anh_sk_dong = async function (inputElem) {
// //     if (inputElem.files && inputElem.files[0]) {
// //         try {
// //             let files = await window.ham_20_25_xu_ly_mang_anh_dau_vao(Array.from(inputElem.files));
// //             if (files && files.length > 0) {
// //                 let f = files[0];
// //                 let b64 = await window.ham_ho_tro_doc_anh_base64(f);
// //                 let dong = inputElem.closest('.dong-nhap-su-kien');
// //                 if (!dong.dataset.mangAnhDong) dong.dataset.mangAnhDong = JSON.stringify([]);
// //                 let arr = JSON.parse(dong.dataset.mangAnhDong);
// //                 arr.push({ b64: b64, type: f.type, size: f.size });
// //                 dong.dataset.mangAnhDong = JSON.stringify(arr);

// //                 let vungPreview = dong.querySelector('.vung-preview-anh-sk-dong');
// //                 let html = '';
// //                 arr.forEach((imgObj, idx) => {
// //                     html += `<div style="position:relative;"><img src="${imgObj.b64}" style="width:35px; height:35px; object-fit:cover; border-radius:4px; border:1px solid #ccc;"><button type="button" onclick="let d=this.closest('.dong-nhap-su-kien'); let a=JSON.parse(d.dataset.mangAnhDong); a.splice(${idx},1); d.dataset.mangAnhDong=JSON.stringify(a); this.closest('div').remove();" style="position:absolute; top:-6px; right:-6px; background:#dc3545; color:#fff; border:none; border-radius:50%; width:16px; height:16px; font-size:10px; cursor:pointer; display:flex; align-items:center; justify-content:center;">×</button></div>`;
// //                 });
// //                 vungPreview.innerHTML = html;
// //             }
// //         } catch (e) { console.error(e); }
// //         inputElem.value = '';
// //     }
// // };


// // =====================================================================
// // HÀM 21.33: HIỂN THỊ ẢNH X3 (SIZE 105x105 PX)
// // =====================================================================

// // =====================================================================
// // HÀM 21.36: XỬ LÝ LƯU (HOẶC GHI ĐÈ) THẺ VÀO DATABASE
// // =====================================================================
// window.ham_21_36_luu_the = async function () {
//     let hanhDong = document.getElementById('gvcn-the-hanh-dong').value;
//     let tenCu = document.getElementById('gvcn-the-ten-cu').value;
//     let tenMoi = document.getElementById('gvcn-the-ten').value.trim();
//     let diemMoi = parseFloat(document.getElementById('gvcn-the-diem').value) || 0;
//     let nhom = document.getElementById('gvcn-the-nhom').value.trim();

//     if (!tenMoi) { alert("⚠️ Vui lòng nhập tên sự kiện / lỗi!"); return; }

//     try {
//         // Nếu là sửa tên -> Xóa cái tên cũ khỏi hệ thống để nhường chỗ cho tên mới
//         if (hanhDong === 'sua' && tenCu && tenCu !== tenMoi) {
//             await _supabase.from('cai_dat_the_su_kien').delete().eq('ten_the', tenCu);
//         }

//         // Luôn xóa tên mới (nếu lỡ tồn tại) để Insert/Upsert đè lên cho an toàn
//         await _supabase.from('cai_dat_the_su_kien').delete().eq('ten_the', tenMoi);

//         const { error } = await _supabase.from('cai_dat_the_su_kien').insert([{
//             ten_the: tenMoi,
//             diem_so: diemMoi,
//             nhom_su_kien: nhom
//         }]);

//         if (error) throw error;

//         document.getElementById('gvcn-modal-the').remove();
//         if (typeof window.ham_21_34_render_tat_ca_cac_the_su_kien === 'function') {
//             window.ham_21_34_render_tat_ca_cac_the_su_kien();
//         }
//     } catch (e) {
//         alert("❌ Lỗi cập nhật: " + e.message);
//     }
// };


// // =====================================================================
// // HÀM 21.36: XỬ LÝ LƯU (THÊM / SỬA / XÓA) VÀO BẢNG cai_dat_the_su_kien_gvcn
// // =====================================================================
// window.ham_21_36_luu_the = async function () {
//     let hanhDong = document.getElementById('gvcn-the-hanh-dong').value;
//     let tenCu = document.getElementById('gvcn-the-ten-cu').value;
//     let tenMoi = document.getElementById('gvcn-the-ten').value.trim();
//     let diemMoi = parseFloat(document.getElementById('gvcn-the-diem').value) || 0;
//     let nhom = document.getElementById('gvcn-the-nhom').value.trim();
//     let loai = document.getElementById('gvcn-the-loai').value;

//     if (!tenMoi) { alert("⚠️ Vui lòng nhập tên sự kiện / lỗi!"); return; }

//     try {
//         // 🌟 Sửa Tên Bảng: cai_dat_the_su_kien_gvcn
//         if (hanhDong === 'sua' && tenCu && tenCu !== tenMoi) {
//             await _supabase.from('cai_dat_the_su_kien_gvcn').delete().eq('ten_the', tenCu);
//         }

//         await _supabase.from('cai_dat_the_su_kien_gvcn').delete().eq('ten_the', tenMoi);

//         const { error } = await _supabase.from('cai_dat_the_su_kien_gvcn').insert([{
//             ten_the: tenMoi,
//             diem_so: diemMoi,
//             nhom_the: nhom,
//             loai_the: loai
//         }]);

//         if (error) throw error;

//         document.getElementById('gvcn-modal-the').remove();
//         if (typeof window.ham_21_34_render_tat_ca_cac_the_su_kien === 'function') {
//             window.ham_21_34_render_tat_ca_cac_the_su_kien();
//         }
//     } catch (e) {
//         alert("❌ Lỗi cập nhật: " + e.message);
//     }
// };


// =====================================================================
// HÀM 21.36: XỬ LÝ LƯU THẺ (KHÔNG CÒN LOẠI THẺ)
// =====================================================================
window.ham_21_36_luu_the = async function () {
    let hanhDong = document.getElementById('gvcn-the-hanh-dong').value;
    let tenCu = document.getElementById('gvcn-the-ten-cu').value;
    let tenMoi = document.getElementById('gvcn-the-ten').value.trim();
    let diemMoi = parseFloat(document.getElementById('gvcn-the-diem').value) || 0;
    let nhom = document.getElementById('gvcn-the-nhom').value.trim();

    if (!tenMoi) { alert("⚠️ Vui lòng nhập tên sự kiện / lỗi!"); return; }

    try {
        if (hanhDong === 'sua' && tenCu && tenCu !== tenMoi) {
            await _supabase.from('cai_dat_the_su_kien_gvcn').delete().eq('ten_the', tenCu);
        }

        await _supabase.from('cai_dat_the_su_kien_gvcn').delete().eq('ten_the', tenMoi);

        const { error } = await _supabase.from('cai_dat_the_su_kien_gvcn').insert([{
            ten_the: tenMoi,
            diem_so: diemMoi,
            nhom_the: nhom
        }]);

        if (error) throw error;

        document.getElementById('gvcn-modal-the').remove();
        if (typeof window.ham_21_34_render_tat_ca_cac_the_su_kien === 'function') {
            window.ham_21_34_render_tat_ca_cac_the_su_kien();
        }
    } catch (e) {
        alert("❌ Lỗi cập nhật: " + e.message);
    }
};



// // =====================================================================
// // HÀM 21.38: GIAO DIỆN MỤC 5 (DẠNG BẢNG NGANG LIÊN TỤC THEO YÊU CẦU)
// // =====================================================================
// window.ham_21_38_ve_giao_dien_muc_5 = function () {
//     const vungMuc5 = document.getElementById('vung-chua-muc-5');
//     if (!vungMuc5) return;

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

//                 <!-- B2: BẢNG NHẬP DANH SÁCH SỰ KIỆN -->
//                 <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border: 1px solid #ced4da; margin-bottom: 15px; overflow-x: auto;">
//                     <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid #ddd; padding-bottom: 8px;">
//                         <label style="font-weight: bold; font-size: 13px; color: #495057;">B2. Nhập danh sách Sự kiện / Vi phạm:</label>
//                         <div style="display: flex; gap: 8px;">
//                             <button type="button" onclick="if(typeof ham_21_4_them_dong_su_kien === 'function') ham_21_4_them_dong_su_kien();" style="padding: 7px 15px; background: #28a745; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: bold;">➕ Thêm dòng sự kiện mới</button>
//                         </div>
//                     </div>
                    
//                     <!-- TIÊU ĐỀ BẢNG DỌC -->
//                     <div style="display: flex; gap: 5px; font-weight: bold; font-size: 11px; color: #6c757d; text-align: center; border-bottom: 2px solid #ccc; padding-bottom: 5px; margin-bottom: 5px;">
//                         <div style="width: 120px;">Ngày</div>
//                         <div style="width: 70px;">Thứ</div>
//                         <div style="width: 75px;">Buổi</div>
//                         <div style="flex: 1.5; min-width: 180px;">Học sinh</div>
//                         <div style="flex: 1.5; min-width: 180px;">Sự kiện / Lỗi</div>
//                         <div style="width: 60px;">Điểm</div>
//                         <div style="flex: 1; min-width: 120px;">Ghi chú riêng</div>
//                         <div style="width: 70px;">Ảnh</div>
//                         <div style="width: 40px;">Xóa</div>
//                     </div>

//                     <!-- VÙNG CHỨA CÁC DÒNG SỰ KIỆN -->
//                     <div id="gvcn-khu-vuc-su-kien-nhanh" style="display: flex; flex-direction: column; gap: 6px;"></div>
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
//         <!-- Thẻ Datalist ẩn chứa danh sách lỗi để chọn -->
//         <datalist id="gvcn-dl-loi"></datalist>
//     `;

//     // Khởi tạo Datalist Lỗi
//     if (typeof window.ham_21_34_render_tat_ca_cac_the_su_kien === 'function') {
//         window.ham_21_34_render_tat_ca_cac_the_su_kien();
//     }

//     // Tự động tạo sẵn 1 dòng đầu tiên
//     if (typeof window.ham_21_4_them_dong_su_kien === 'function') {
//         window.ham_21_4_them_dong_su_kien();
//     }
// };



// // =====================================================================
// // HÀM 21.38: GIAO DIỆN MỤC 5 (THÊM BẢNG CHỌN LỖI BÊN DƯỚI)
// // =====================================================================
// window.ham_21_38_ve_giao_dien_muc_5 = function () {
//     const vungMuc5 = document.getElementById('vung-chua-muc-5');
//     if (!vungMuc5) return;

//     vungMuc5.innerHTML = `
//         <div style="background: #fff; padding: 25px; border-radius: 10px; border: 1px solid #dee2e6; box-shadow: 0 4px 10px rgba(0,0,0,0.03); width: 100%; box-sizing: border-box;">
//             <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px dashed #fce4ec; padding-bottom: 10px; margin-bottom: 15px;">
//                 <h4 style="margin: 0; color: #e83e8c; font-size: 17px;">🎯 5. Quản lý Sự kiện (Tuần trước / Vi phạm)</h4>
//                 <button onclick="window.ham_21_22_toggle_muc('body-muc-5', this);" style="background: #f8f9fa; border: 1px solid #ccc; padding: 5px 12px; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: bold;">➖ Thu hẹp</button>
//             </div>
            
//             <div id="body-muc-5">
//                 <!-- B1: Thanh điều hướng tuần -->
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

//                 <!-- B2: BẢNG NHẬP DANH SÁCH SỰ KIỆN -->
//                 <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border: 1px solid #ced4da; margin-bottom: 15px; overflow-x: auto;">
//                     <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid #ddd; padding-bottom: 8px;">
//                         <label style="font-weight: bold; font-size: 13px; color: #495057;">B2. Nhập danh sách Sự kiện / Vi phạm:</label>
//                         <div style="display: flex; gap: 8px;">
//                             <button type="button" onclick="if(typeof ham_21_4_them_dong_su_kien === 'function') ham_21_4_them_dong_su_kien();" style="padding: 7px 15px; background: #28a745; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: bold;">➕ Thêm dòng sự kiện mới</button>
//                         </div>
//                     </div>
                    
//                     <div style="display: flex; gap: 5px; font-weight: bold; font-size: 11px; color: #6c757d; text-align: center; border-bottom: 2px solid #ccc; padding-bottom: 5px; margin-bottom: 5px;">
//                         <div style="width: 120px;">Ngày</div>
//                         <div style="width: 70px;">Thứ</div>
//                         <div style="width: 75px;">Buổi</div>
//                         <div style="flex: 1.5; min-width: 180px;">Học sinh</div>
//                         <div style="flex: 1.5; min-width: 180px;">Sự kiện / Lỗi (Bấm chọn bảng dưới)</div>
//                         <div style="width: 60px;">Điểm</div>
//                         <div style="flex: 1; min-width: 120px;">Ghi chú riêng</div>
//                         <div style="width: 70px;">Ảnh</div>
//                         <div style="width: 40px;">Xóa</div>
//                     </div>

//                     <div id="gvcn-khu-vuc-su-kien-nhanh" style="display: flex; flex-direction: column; gap: 6px;"></div>
//                 </div>
                
//                 <!-- 🌟 BẢNG GẮN LỖI NHANH (MỚI THÊM) -->
//                 <div style="background: #fff; padding: 15px; border-radius: 8px; border: 1px dashed #e83e8c; margin-bottom: 20px;">
//                     <label style="font-weight: bold; font-size: 13px; color: #e83e8c; display: block; margin-bottom: 10px;">🏷️ Bấm chọn nhanh Sự kiện / Lỗi (Tự động nạp vào dòng đang chọn bên trên):</label>
//                     <div id="gvcn-khu-vuc-chon-the-duoi-bang"></div>
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
//         <datalist id="gvcn-dl-loi"></datalist>
//     `;

//     if (typeof window.ham_21_34_render_tat_ca_cac_the_su_kien === 'function') {
//         window.ham_21_34_render_tat_ca_cac_the_su_kien();
//     }
//     if (typeof window.ham_21_4_them_dong_su_kien === 'function') {
//         window.ham_21_4_them_dong_su_kien();
//     }
// };

// // =====================================================================
// // HÀM 21.38: GIAO DIỆN MỤC 5 (CHUYỂN NÚT THÊM DÒNG XUỐNG CUỐI BẢNG)
// // =====================================================================
// window.ham_21_38_ve_giao_dien_muc_5 = function () {
//     const vungMuc5 = document.getElementById('vung-chua-muc-5');
//     if (!vungMuc5) return;

//     vungMuc5.innerHTML = `
//         <div style="background: #fff; padding: 25px; border-radius: 10px; border: 1px solid #dee2e6; box-shadow: 0 4px 10px rgba(0,0,0,0.03); width: 100%; box-sizing: border-box;">
//             <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px dashed #fce4ec; padding-bottom: 10px; margin-bottom: 15px;">
//                 <h4 style="margin: 0; color: #e83e8c; font-size: 17px;">🎯 5. Quản lý Sự kiện (Tuần trước / Vi phạm)</h4>
//                 <button onclick="window.ham_21_22_toggle_muc('body-muc-5', this);" style="background: #f8f9fa; border: 1px solid #ccc; padding: 5px 12px; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: bold;">➖ Thu hẹp</button>
//             </div>
            
//             <div id="body-muc-5">
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

//                 <!-- B2: BẢNG NHẬP DANH SÁCH SỰ KIỆN -->
//                 <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border: 1px solid #ced4da; margin-bottom: 15px; overflow-x: auto;">
//                     <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid #ddd; padding-bottom: 8px;">
//                         <label style="font-weight: bold; font-size: 13px; color: #495057;">B2. Nhập danh sách Sự kiện / Vi phạm:</label>
//                     </div>
                    
//                     <div style="display: flex; gap: 5px; font-weight: bold; font-size: 11px; color: #6c757d; text-align: center; border-bottom: 2px solid #ccc; padding-bottom: 5px; margin-bottom: 5px;">
//                         <div style="width: 120px;">Ngày</div>
//                         <div style="width: 70px;">Thứ</div>
//                         <div style="width: 75px;">Buổi</div>
//                         <div style="flex: 1.5; min-width: 180px;">Học sinh</div>
//                         <div style="flex: 1.5; min-width: 180px;">Sự kiện / Lỗi (Bấm chọn bảng dưới)</div>
//                         <div style="width: 80px;">Điểm</div>
//                         <div style="flex: 1; min-width: 120px;">Ghi chú riêng</div>
//                         <div style="width: 130px;">Ảnh</div>
//                         <div style="width: 40px;">Xóa</div>
//                     </div>

//                     <div id="gvcn-khu-vuc-su-kien-nhanh" style="display: flex; flex-direction: column; gap: 6px;"></div>

//                     <!-- 🌟 NÚT THÊM DÒNG ĐƯỢC CHUYỂN XUỐNG ĐÂY -->
//                     <div style="margin-top: 12px; text-align: left;">
//                         <button type="button" onclick="if(typeof ham_21_4_them_dong_su_kien === 'function') ham_21_4_them_dong_su_kien();" style="padding: 8px 15px; background: #28a745; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: bold; box-shadow: 0 2px 4px rgba(40,167,69,0.3); transition: 0.2s;" onmouseover="this.style.background='#218838'" onmouseout="this.style.background='#28a745'">➕ Thêm dòng sự kiện mới</button>
//                     </div>
//                 </div>
                
//                 <div style="text-align: right; margin-bottom: 20px;">
//                     <button onclick="if(typeof ham_21_15_luu_su_kien_tuan_truoc === 'function') ham_21_15_luu_su_kien_tuan_truoc(this);" style="padding: 12px 30px; background: #e83e8c; color: white; border: none; border-radius: 8px; font-weight: bold; font-size: 15px; cursor: pointer; box-shadow: 0 4px 10px rgba(232,62,140,0.3); transition:0.2s;" onmouseover="this.style.filter='brightness(0.9)'" onmouseout="this.style.filter='brightness(1)'">💾 LƯU CÁC SỰ KIỆN TRONG BẢNG</button>
//                 </div>

//                 <!-- BẢNG CHỌN SỰ KIỆN -->
//                 <div style="background: #fff; padding: 15px; border-radius: 8px; border: 1px dashed #e83e8c; margin-bottom: 20px;">
//                     <label style="font-weight: bold; font-size: 13px; color: #e83e8c; display: block; margin-bottom: 10px;">🏷️ Bấm chọn nhanh Sự kiện / Lỗi (Tự động nạp vào dòng đang chọn bên trên):</label>
//                     <div id="gvcn-khu-vuc-chon-the-duoi-bang"></div>
//                 </div>

//             </div>
//         </div>
//         <datalist id="gvcn-dl-loi"></datalist>
//     `;

//     if (typeof window.ham_21_34_render_tat_ca_cac_the_su_kien === 'function') window.ham_21_34_render_tat_ca_cac_the_su_kien();
//     if (typeof window.ham_21_4_them_dong_su_kien === 'function') window.ham_21_4_them_dong_su_kien();
// };



// // =====================================================================
// // HÀM 21.38: GIAO DIỆN MỤC 5 (KHÔNG TỰ ĐỘNG THÊM DÒNG TRỐNG KHI MỞ)
// // =====================================================================
// window.ham_21_38_ve_giao_dien_muc_5 = function () {
//     const vungMuc5 = document.getElementById('vung-chua-muc-5');
//     if (!vungMuc5) return;

//     vungMuc5.innerHTML = `
//         <div style="background: #fff; padding: 25px; border-radius: 10px; border: 1px solid #dee2e6; box-shadow: 0 4px 10px rgba(0,0,0,0.03); width: 100%; box-sizing: border-box;">
//             <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px dashed #fce4ec; padding-bottom: 10px; margin-bottom: 15px;">
//                 <h4 style="margin: 0; color: #e83e8c; font-size: 17px;">🎯 5. Quản lý Sự kiện (Tuần trước / Vi phạm)</h4>
//                 <button onclick="window.ham_21_22_toggle_muc('body-muc-5', this);" style="background: #f8f9fa; border: 1px solid #ccc; padding: 5px 12px; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: bold;">➖ Thu hẹp</button>
//             </div>
            
//             <div id="body-muc-5">
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

//                 <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border: 1px solid #ced4da; margin-bottom: 15px; overflow-x: auto;">
//                     <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid #ddd; padding-bottom: 8px;">
//                         <label style="font-weight: bold; font-size: 13px; color: #495057;">B2. Nhập danh sách Sự kiện / Vi phạm:</label>
//                     </div>
                    
//                     <div style="display: flex; gap: 5px; font-weight: bold; font-size: 11px; color: #6c757d; text-align: center; border-bottom: 2px solid #ccc; padding-bottom: 5px; margin-bottom: 5px;">
//                         <div style="width: 120px;">Ngày</div>
//                         <div style="width: 70px;">Thứ</div>
//                         <div style="width: 75px;">Buổi</div>
//                         <div style="flex: 1.5; min-width: 180px;">Học sinh</div>
//                         <div style="flex: 1.5; min-width: 180px;">Sự kiện / Lỗi (Bấm chọn bảng dưới)</div>
//                         <div style="width: 80px;">Điểm</div>
//                         <div style="flex: 1; min-width: 120px;">Ghi chú riêng</div>
//                         <div style="width: 130px;">Ảnh</div>
//                         <div style="width: 40px;">Xóa</div>
//                     </div>

//                     <div id="gvcn-khu-vuc-su-kien-nhanh" style="display: flex; flex-direction: column; gap: 6px;"></div>

//                     <div style="margin-top: 12px; text-align: left;">
//                         <button type="button" onclick="if(typeof ham_21_4_them_dong_su_kien === 'function') ham_21_4_them_dong_su_kien();" style="padding: 8px 15px; background: #28a745; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: bold; box-shadow: 0 2px 4px rgba(40,167,69,0.3); transition: 0.2s;" onmouseover="this.style.background='#218838'" onmouseout="this.style.background='#28a745'">➕ Thêm dòng sự kiện mới</button>
//                     </div>
//                 </div>
                
//                 <div style="text-align: right; margin-bottom: 20px;">
//                     <button onclick="if(typeof ham_21_15_luu_su_kien_tuan_truoc === 'function') ham_21_15_luu_su_kien_tuan_truoc(this);" style="padding: 12px 30px; background: #e83e8c; color: white; border: none; border-radius: 8px; font-weight: bold; font-size: 15px; cursor: pointer; box-shadow: 0 4px 10px rgba(232,62,140,0.3); transition:0.2s;" onmouseover="this.style.filter='brightness(0.9)'" onmouseout="this.style.filter='brightness(1)'">💾 LƯU CÁC SỰ KIỆN TRONG BẢNG</button>
//                 </div>

//                 <div style="background: #fff; padding: 15px; border-radius: 8px; border: 1px dashed #e83e8c; margin-bottom: 20px;">
//                     <label style="font-weight: bold; font-size: 13px; color: #e83e8c; display: block; margin-bottom: 10px;">🏷️ Bấm chọn nhanh Sự kiện / Lỗi (Tự động nạp vào dòng đang chọn bên trên):</label>
//                     <div id="gvcn-khu-vuc-chon-the-duoi-bang"></div>
//                 </div>

//             </div>
//         </div>
//         <datalist id="gvcn-dl-loi"></datalist>
//     `;

//     if (typeof window.ham_21_34_render_tat_ca_cac_the_su_kien === 'function') window.ham_21_34_render_tat_ca_cac_the_su_kien();
// };


// // =====================================================================
// // HÀM 21.38: GIAO DIỆN MỤC 5 (BỔ SUNG KHUNG YÊU CẦU XỬ LÝ)
// // =====================================================================
// window.ham_21_38_ve_giao_dien_muc_5 = function () {
//     const vungMuc5 = document.getElementById('vung-chua-muc-5');
//     if (!vungMuc5) return;

//     vungMuc5.innerHTML = `
//         <div style="background: #fff; padding: 25px; border-radius: 10px; border: 1px solid #dee2e6; box-shadow: 0 4px 10px rgba(0,0,0,0.03); width: 100%; box-sizing: border-box;">
//             <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px dashed #fce4ec; padding-bottom: 10px; margin-bottom: 15px;">
//                 <h4 style="margin: 0; color: #e83e8c; font-size: 17px;">🎯 5. Quản lý Sự kiện (Tuần trước / Vi phạm)</h4>
//                 <button onclick="window.ham_21_22_toggle_muc('body-muc-5', this);" style="background: #f8f9fa; border: 1px solid #ccc; padding: 5px 12px; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: bold;">➖ Thu hẹp</button>
//             </div>
            
//             <div id="body-muc-5">
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

//                 <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border: 1px solid #ced4da; margin-bottom: 15px; overflow-x: auto;">
//                     <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid #ddd; padding-bottom: 8px;">
//                         <label style="font-weight: bold; font-size: 13px; color: #495057;">B2. Danh sách Học sinh & Sự kiện:</label>
//                     </div>
                    
//                     <div style="display: flex; gap: 5px; font-weight: bold; font-size: 11px; color: #6c757d; text-align: center; border-bottom: 2px solid #ccc; padding-bottom: 5px; margin-bottom: 5px;">
//                         <div style="width: 120px;">Ngày</div>
//                         <div style="width: 70px;">Thứ</div>
//                         <div style="width: 75px;">Buổi</div>
//                         <div style="flex: 1.5; min-width: 180px;">Học sinh</div>
//                         <div style="flex: 1.5; min-width: 180px;">Sự kiện / Lỗi (Bấm chọn bảng dưới)</div>
//                         <div style="width: 80px;">Điểm</div>
//                         <div style="flex: 1; min-width: 120px;">Ghi chú riêng</div>
//                         <div style="width: 130px;">Ảnh</div>
//                         <div style="width: 40px;">Xóa</div>
//                     </div>

//                     <div id="gvcn-khu-vuc-su-kien-nhanh" style="display: flex; flex-direction: column; gap: 6px;"></div>

//                     <div style="margin-top: 12px; text-align: left;">
//                         <button type="button" onclick="if(typeof ham_21_4_them_dong_su_kien === 'function') ham_21_4_them_dong_su_kien();" style="padding: 8px 15px; background: #28a745; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: bold; box-shadow: 0 2px 4px rgba(40,167,69,0.3); transition: 0.2s;" onmouseover="this.style.background='#218838'" onmouseout="this.style.background='#28a745'">➕ Thêm dòng sự kiện mới</button>
//                     </div>
//                 </div>
                
//                 <!-- BẢNG CHỌN SỰ KIỆN -->
//                 <div style="background: #fff; padding: 15px; border-radius: 8px; border: 1px dashed #e83e8c; margin-bottom: 15px;">
//                     <label style="font-weight: bold; font-size: 13px; color: #e83e8c; display: block; margin-bottom: 10px;">🏷️ B3. Bấm chọn nhanh Sự kiện / Lỗi (Tự động nạp vào dòng đang chọn bên trên):</label>
//                     <div id="gvcn-khu-vuc-chon-the-duoi-bang"></div>
//                 </div>

//                 <!-- KHU VỰC YÊU CẦU XỬ LÝ (MỚI) -->
//                 <div style="margin-bottom: 15px; padding: 15px; background: #fffcf8; border: 1px dashed #d35400; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
//                     <label style="display:flex; align-items:center; gap:8px; font-weight:bold; font-size:14px; color:#d35400; cursor:pointer;">
//                         <input type="checkbox" id="gvcn-check-xu-ly" onchange="document.getElementById('gvcn-vung-xu-ly').style.display = this.checked ? 'block' : 'none';" style="width:18px; height:18px; cursor:pointer; accent-color:#d35400;">
//                         ☑️ B4. Yêu cầu khắc phục / Xử lý phạt (Tùy chọn)
//                     </label>
                    
//                     <div id="gvcn-vung-xu-ly" style="display:none; margin-top:15px; border-top:1px dashed #ffeeba; padding-top:15px;">
//                         <div style="font-size:13px; font-weight:bold; color:#d35400; margin-bottom:8px;">Chọn hình thức (Có thể chọn nhiều mục):</div>
                        
//                         <!-- Dàn nút Hình thức xử lý -->
//                         <div id="gvcn-khu-vuc-tags-xu-ly" style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:15px;">
//                             <button type="button" class="tag-xu-ly-btn" data-color="#d35400" onclick="window.ham_21_chon_hinh_thuc_xu_ly(this, '📝 Chép phạt')" style="padding: 6px 12px; font-size: 12px; background: transparent; border: 1px solid #d35400; color: #d35400; border-radius: 4px; cursor: pointer; font-weight: bold; transition: 0.2s;">📝 Chép phạt</button>
//                             <button type="button" class="tag-xu-ly-btn" data-color="#d35400" onclick="window.ham_21_chon_hinh_thuc_xu_ly(this, '✍️ Viết bản kiểm điểm')" style="padding: 6px 12px; font-size: 12px; background: transparent; border: 1px solid #d35400; color: #d35400; border-radius: 4px; cursor: pointer; font-weight: bold; transition: 0.2s;">✍️ Viết kiểm điểm</button>
//                             <button type="button" class="tag-xu-ly-btn" data-color="#d35400" onclick="window.ham_21_chon_hinh_thuc_xu_ly(this, '🧹 Trực nhật')" style="padding: 6px 12px; font-size: 12px; background: transparent; border: 1px solid #d35400; color: #d35400; border-radius: 4px; cursor: pointer; font-weight: bold; transition: 0.2s;">🧹 Lao động / Trực nhật</button>
//                             <button type="button" class="tag-xu-ly-btn" data-color="#d35400" onclick="window.ham_21_chon_hinh_thuc_xu_ly(this, '📌 Khác')" style="padding: 6px 12px; font-size: 12px; background: transparent; border: 1px solid #d35400; color: #d35400; border-radius: 4px; cursor: pointer; font-weight: bold; transition: 0.2s;">📌 Khác</button>
//                         </div>
//                         <input type="hidden" id="gvcn-hinh-thuc-xu-ly" value="">
                        
//                         <div style="font-size:13px; font-weight:bold; color:#d35400; margin-bottom:5px;">Ghi rõ nội dung:</div>
//                         <input id="gvcn-noi-dung-xu-ly" type="text" placeholder="VD: Chép phạt 10 lần nội quy điều 5, Trực nhật quét rác cuối giờ..." style="width:100%; padding:10px; border:1px solid #ced4da; border-radius:4px; font-size:13px; outline:none; box-sizing:border-box;">
//                     </div>
//                 </div>

//                 <div style="text-align: right; margin-bottom: 20px;">
//                     <button onclick="if(typeof ham_21_15_luu_su_kien_tuan_truoc === 'function') ham_21_15_luu_su_kien_tuan_truoc(this);" style="padding: 15px 35px; background: #e83e8c; color: white; border: none; border-radius: 8px; font-weight: bold; font-size: 16px; cursor: pointer; box-shadow: 0 4px 10px rgba(232,62,140,0.3); transition:0.2s;" onmouseover="this.style.filter='brightness(0.9)'" onmouseout="this.style.filter='brightness(1)'">💾 B5. LƯU BẢNG SỰ KIỆN VÀO HỒ SƠ</button>
//                 </div>

//             </div>
//         </div>
//         <datalist id="gvcn-dl-loi"></datalist>
//     `;

//     if (typeof window.ham_21_34_render_tat_ca_cac_the_su_kien === 'function') window.ham_21_34_render_tat_ca_cac_the_su_kien();
// };



// // =====================================================================
// // HÀM 21.38: GIAO DIỆN MỤC 5 (BỔ SUNG KHUNG YÊU CẦU XỬ LÝ)
// // =====================================================================
// window.ham_21_38_ve_giao_dien_muc_5 = function () {
//     const vungMuc5 = document.getElementById('vung-chua-muc-5');
//     if (!vungMuc5) return;

//     vungMuc5.innerHTML = `
//         <div style="background: #fff; padding: 25px; border-radius: 10px; border: 1px solid #dee2e6; box-shadow: 0 4px 10px rgba(0,0,0,0.03); width: 100%; box-sizing: border-box;">
//             <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px dashed #fce4ec; padding-bottom: 10px; margin-bottom: 15px;">
//                 <h4 style="margin: 0; color: #e83e8c; font-size: 17px;">🎯 5. Quản lý Sự kiện (Tuần trước / Vi phạm)</h4>
//                 <button onclick="window.ham_21_22_toggle_muc('body-muc-5', this);" style="background: #f8f9fa; border: 1px solid #ccc; padding: 5px 12px; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: bold;">➖ Thu hẹp</button>
//             </div>
            
//             <div id="body-muc-5">
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

//                 <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border: 1px solid #ced4da; margin-bottom: 15px; overflow-x: auto;">
//                     <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid #ddd; padding-bottom: 8px;">
//                         <label style="font-weight: bold; font-size: 13px; color: #495057;">B2. Danh sách Học sinh & Sự kiện:</label>
//                     </div>
                    
//                     <div style="display: flex; gap: 5px; font-weight: bold; font-size: 11px; color: #6c757d; text-align: center; border-bottom: 2px solid #ccc; padding-bottom: 5px; margin-bottom: 5px;">
//                         <div style="width: 120px;">Ngày</div>
//                         <div style="width: 70px;">Thứ</div>
//                         <div style="width: 75px;">Buổi</div>
//                         <div style="flex: 1.5; min-width: 180px;">Học sinh</div>
//                         <div style="flex: 1.5; min-width: 180px;">Sự kiện / Lỗi (Bấm chọn bảng dưới)</div>
//                         <div style="width: 80px;">Điểm</div>
//                         <div style="flex: 1; min-width: 120px;">Ghi chú riêng</div>
//                         <div style="width: 130px;">Ảnh</div>
//                         <div style="width: 40px;">Xóa</div>
//                     </div>

//                     <div id="gvcn-khu-vuc-su-kien-nhanh" style="display: flex; flex-direction: column; gap: 6px;"></div>

//                     <div style="margin-top: 12px; text-align: left;">
//                         <button type="button" onclick="if(typeof ham_21_4_them_dong_su_kien === 'function') ham_21_4_them_dong_su_kien();" style="padding: 8px 15px; background: #28a745; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: bold; box-shadow: 0 2px 4px rgba(40,167,69,0.3); transition: 0.2s;" onmouseover="this.style.background='#218838'" onmouseout="this.style.background='#28a745'">➕ Thêm dòng sự kiện mới</button>
//                     </div>
//                 </div>
                
//                 <!-- BẢNG CHỌN SỰ KIỆN CHÍNH -->
//                 <div style="background: #fff; padding: 15px; border-radius: 8px; border: 1px dashed #e83e8c; margin-bottom: 15px;">
//                     <label style="font-weight: bold; font-size: 13px; color: #e83e8c; display: block; margin-bottom: 10px;">🏷️ B3. Bấm chọn nhanh Sự kiện / Lỗi (Tự động nạp vào dòng đang chọn bên trên):</label>
//                     <div id="gvcn-khu-vuc-chon-the-duoi-bang"></div>
//                 </div>

//                 <!-- KHU VỰC YÊU CẦU XỬ LÝ (MỚI) -->
//                 <div style="margin-bottom: 15px; padding: 15px; background: #fffcf8; border: 1px dashed #d35400; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
//                     <label style="display:flex; align-items:center; gap:8px; font-weight:bold; font-size:14px; color:#d35400; cursor:pointer;">
//                         <input type="checkbox" id="gvcn-check-xu-ly" onchange="document.getElementById('gvcn-vung-xu-ly').style.display = this.checked ? 'block' : 'none';" style="width:18px; height:18px; cursor:pointer; accent-color:#d35400;">
//                         ☑️ B4. Yêu cầu khắc phục / Xử lý phạt (Tùy chọn)
//                     </label>
                    
//                     <div id="gvcn-vung-xu-ly" style="display:none; margin-top:15px; border-top:1px dashed #ffeeba; padding-top:15px;">
//                         <div style="font-size:13px; font-weight:bold; color:#d35400; margin-bottom:8px;">Chọn hình thức (Có thể chọn nhiều mục):</div>
                        
//                         <!-- Dàn nút Hình thức xử lý (Tự động nạp từ DB) -->
//                         <div id="gvcn-khu-vuc-tags-xu-ly" style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:15px;">
//                             <span style="font-size: 12px; color: #999;">⏳ Đang tải thẻ xử lý...</span>
//                         </div>
//                         <input type="hidden" id="gvcn-hinh-thuc-xu-ly" value="">
                        
//                         <div style="font-size:13px; font-weight:bold; color:#d35400; margin-bottom:5px;">Ghi rõ nội dung:</div>
//                         <input id="gvcn-noi-dung-xu-ly" type="text" placeholder="VD: Chép phạt 10 lần nội quy điều 5, Trực nhật quét rác cuối giờ..." style="width:100%; padding:10px; border:1px solid #ced4da; border-radius:4px; font-size:13px; outline:none; box-sizing:border-box;">
//                     </div>
//                 </div>

//                 <div style="text-align: right; margin-bottom: 20px;">
//                     <button onclick="if(typeof ham_21_15_luu_su_kien_tuan_truoc === 'function') ham_21_15_luu_su_kien_tuan_truoc(this);" style="padding: 15px 35px; background: #e83e8c; color: white; border: none; border-radius: 8px; font-weight: bold; font-size: 16px; cursor: pointer; box-shadow: 0 4px 10px rgba(232,62,140,0.3); transition:0.2s;" onmouseover="this.style.filter='brightness(0.9)'" onmouseout="this.style.filter='brightness(1)'">💾 B5. LƯU BẢNG SỰ KIỆN VÀO HỒ SƠ</button>
//                 </div>

//             </div>
//         </div>
//         <datalist id="gvcn-dl-loi"></datalist>
//     `;

//     if (typeof window.ham_21_34_render_tat_ca_cac_the_su_kien === 'function') window.ham_21_34_render_tat_ca_cac_the_su_kien();
// };

// =====================================================================
// HÀM 21.38: GIAO DIỆN MỤC 5 (NỚI ĐỘ RỘNG CỘT THỜI GIAN LÊN 125PX)
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

                <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border: 1px solid #ced4da; margin-bottom: 15px; overflow-x: auto;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid #ddd; padding-bottom: 8px;">
                        <label style="font-weight: bold; font-size: 13px; color: #495057;">B2. Danh sách Học sinh & Sự kiện:</label>
                    </div>
                    
                    <div style="display: flex; gap: 5px; font-weight: bold; font-size: 11px; color: #6c757d; text-align: center; border-bottom: 2px solid #ccc; padding-bottom: 5px; margin-bottom: 5px;">
                        <div style="width: 125px;">Thời gian</div>
                        <div style="flex: 1.5; min-width: 140px;">Học sinh</div>
                        <div style="flex: 1.5; min-width: 150px;">Sự kiện / Lỗi</div>
                        <div style="width: 50px;">Điểm</div>
                        <div style="width: 80px;">Ảnh</div>
                        <div style="flex: 1.2; min-width: 120px; color:#d35400;">Khắc phục</div>
                        <div style="width: 75px; color:#0056b3;">Tiến độ</div>
                        <div style="flex: 1; min-width: 120px;">Ghi chú riêng</div>
                        <div style="width: 35px;">Xóa</div>
                    </div>

                    <div id="gvcn-khu-vuc-su-kien-nhanh" style="display: flex; flex-direction: column; gap: 6px;"></div>

                    <div style="margin-top: 12px; text-align: left;">
                        <button type="button" onclick="if(typeof ham_21_4_them_dong_su_kien === 'function') ham_21_4_them_dong_su_kien();" style="padding: 8px 15px; background: #28a745; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: bold; box-shadow: 0 2px 4px rgba(40,167,69,0.3); transition: 0.2s;" onmouseover="this.style.background='#218838'" onmouseout="this.style.background='#28a745'">➕ Thêm dòng sự kiện mới</button>
                    </div>
                </div>
                
                <div style="background: #fff; padding: 15px; border-radius: 8px; border: 1px dashed #e83e8c; margin-bottom: 15px;">
                    <label style="font-weight: bold; font-size: 13px; color: #e83e8c; display: block; margin-bottom: 10px;">🏷️ B3. Bấm chọn nhanh Sự kiện / Lỗi (Tự động nạp vào dòng đang chọn bên trên):</label>
                    <div id="gvcn-khu-vuc-chon-the-duoi-bang"></div>
                </div>

                <div style="margin-bottom: 15px; padding: 15px; background: #fffcf8; border: 1px dashed #d35400; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                    <label style="display:flex; align-items:center; gap:8px; font-weight:bold; font-size:14px; color:#d35400; cursor:pointer;">
                        <input type="checkbox" id="gvcn-check-xu-ly" onchange="document.getElementById('gvcn-vung-xu-ly').style.display = this.checked ? 'block' : 'none';" style="width:18px; height:18px; cursor:pointer; accent-color:#d35400;">
                        ☑️ B4. Yêu cầu khắc phục / Xử lý phạt (Tùy chọn)
                    </label>
                    
                    <div id="gvcn-vung-xu-ly" style="display:none; margin-top:15px; border-top:1px dashed #ffeeba; padding-top:15px;">
                        <div style="font-size:13px; font-weight:bold; color:#d35400; margin-bottom:8px;">Chọn hình thức (Có thể chọn nhiều mục):</div>
                        <div id="gvcn-khu-vuc-tags-xu-ly" style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:15px;">
                            <span style="font-size: 12px; color: #999;">⏳ Đang tải thẻ xử lý...</span>
                        </div>
                        <input type="hidden" id="gvcn-hinh-thuc-xu-ly" value="">
                        
                        <div style="font-size:13px; font-weight:bold; color:#d35400; margin-bottom:5px;">Ghi rõ nội dung:</div>
                        <input id="gvcn-noi-dung-xu-ly" type="text" placeholder="VD: Chép phạt 10 lần nội quy điều 5, Trực nhật quét rác cuối giờ..." style="width:100%; padding:10px; border:1px solid #ced4da; border-radius:4px; font-size:13px; outline:none; box-sizing:border-box;">
                    </div>
                </div>

                <div style="text-align: right; margin-bottom: 20px;">
                    <button onclick="if(typeof ham_21_15_luu_su_kien_tuan_truoc === 'function') ham_21_15_luu_su_kien_tuan_truoc(this);" style="padding: 15px 35px; background: #e83e8c; color: white; border: none; border-radius: 8px; font-weight: bold; font-size: 16px; cursor: pointer; box-shadow: 0 4px 10px rgba(232,62,140,0.3); transition:0.2s;" onmouseover="this.style.filter='brightness(0.9)'" onmouseout="this.style.filter='brightness(1)'">💾 B5. LƯU BẢNG SỰ KIỆN VÀO HỒ SƠ</button>
                </div>

            </div>
        </div>
        <datalist id="gvcn-dl-loi"></datalist>
    `;

    if (typeof window.ham_21_34_render_tat_ca_cac_the_su_kien === 'function') window.ham_21_34_render_tat_ca_cac_the_su_kien();
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





// =====================================================================
// HÀM 21.40: TỰ ĐỘNG LẤY ĐIỂM TỪ DANH SÁCH LỖI (KHI GÕ TAY)
// =====================================================================
window.ham_21_40_tu_dong_dien_diem = function (inputLoi) {
    let tenLoi = inputLoi.value.trim();
    if (!tenLoi) return;

    let dong = inputLoi.closest('.dong-nhap-su-kien');
    if (!dong) return;

    let inputDiem = dong.querySelector('.sk-diem-tru');

    if (window.gvcn_DanhSachTheSuKien && inputDiem) {
        let theTimThay = window.gvcn_DanhSachTheSuKien.find(t => t.ten === tenLoi);
        if (theTimThay && theTimThay.diem !== undefined) {
            // 🌟 Bơm thẳng điểm số thực tế (Âm, Dương, hoặc 0) vào ô
            inputDiem.value = theTimThay.diem;
        }
    }
};



// =====================================================================
// HÀM 21.41: LÀM NỔI BẬT DÒNG ĐANG CHỌN ĐỂ CHUẨN BỊ BẮN THẺ VÀO
// =====================================================================
window.ham_21_41_danh_dau_dong = function (dongClick) {
    if (!dongClick) return;

    // Tắt viền tất cả các dòng khác
    document.querySelectorAll('.dong-nhap-su-kien').forEach(d => {
        d.classList.remove('dong-dang-chon');
        d.style.border = '1px solid #ced4da';
        d.style.boxShadow = 'none';
        d.style.background = '#fff';
    });

    // Bật viền đỏ rực cho dòng vừa bấm
    dongClick.classList.add('dong-dang-chon');
    dongClick.style.border = '1px solid #e83e8c';
    dongClick.style.boxShadow = '0 0 8px rgba(232, 62, 140, 0.4)';
    dongClick.style.background = '#fdf5f8';
};

// // =====================================================================
// // HÀM 21.42: BẮN TÊN LỖI & ĐIỂM TRỪ VÀO DÒNG ĐANG HIỆN HÀNH
// // =====================================================================
// window.ham_21_42_gan_the_vao_dong_hien_hanh = function (tenThe, diem) {
//     // 1. Tìm cái dòng đang có viền đỏ
//     let dongHienHanh = document.querySelector('.dong-nhap-su-kien.dong-dang-chon');

//     // 2. Nếu lỡ thầy không bấm chọn dòng nào, mặc định lấy dòng cuối cùng của bảng
//     if (!dongHienHanh) {
//         let tatCaDong = document.querySelectorAll('.dong-nhap-su-kien');
//         if (tatCaDong.length > 0) dongHienHanh = tatCaDong[tatCaDong.length - 1];
//     }

//     if (dongHienHanh) {
//         let inputLoi = dongHienHanh.querySelector('.sk-loi');
//         let inputDiem = dongHienHanh.querySelector('.sk-diem-tru');

//         // Bắn dữ liệu vào
//         if (inputLoi) inputLoi.value = tenThe;
//         if (inputDiem) inputDiem.value = diem;

//         // Hiệu ứng nháy xanh lá báo hiệu đã nạp thành công
//         dongHienHanh.style.background = '#d4edda';
//         setTimeout(() => {
//             // Trả lại màu hồng nhạt của dòng đang chọn
//             dongHienHanh.style.background = '#fdf5f8';
//         }, 400);

//         // Đánh dấu lại dòng này luôn (trường hợp nó là dòng cuối nhưng chưa có class)
//         window.ham_21_41_danh_dau_dong(dongHienHanh);

//     } else {
//         alert('⚠️ Bảng đang trống! Vui lòng bấm "➕ Thêm dòng sự kiện mới" trước khi chọn thẻ.');
//     }
// };


// =====================================================================
// HÀM 21.42: BẮN TÊN LỖI & ĐIỂM TRỪ VÀ TỰ ĐỘNG GIÃN Ô CHỮ NẾU DÀI
// =====================================================================
window.ham_21_42_gan_the_vao_dong_hien_hanh = function (tenThe, diem) {
    let dongHienHanh = document.querySelector('.dong-nhap-su-kien.dong-dang-chon');

    if (!dongHienHanh) {
        let tatCaDong = document.querySelectorAll('.dong-nhap-su-kien');
        if (tatCaDong.length > 0) dongHienHanh = tatCaDong[tatCaDong.length - 1];
    }

    if (dongHienHanh) {
        let inputLoi = dongHienHanh.querySelector('.sk-loi');
        let inputDiem = dongHienHanh.querySelector('.sk-diem-tru');

        if (inputLoi) {
            inputLoi.value = tenThe;
            // Kích hoạt phình to Textarea nếu chữ bị dài
            inputLoi.style.height = '28px';
            inputLoi.style.height = inputLoi.scrollHeight + 'px';
        }
        if (inputDiem) inputDiem.value = diem;

        dongHienHanh.style.background = '#d4edda';
        setTimeout(() => { dongHienHanh.style.background = '#fdf5f8'; }, 400);

        window.ham_21_41_danh_dau_dong(dongHienHanh);

    } else {
        alert('⚠️ Bảng đang trống! Vui lòng bấm "➕ Thêm dòng sự kiện mới" trước khi chọn thẻ.');
    }
};





window.ham_21_43_sua_the = function (tenCu, diemCu, nhomThe) {
    window.ham_21_44_hien_thi_modal_the(tenCu, diemCu, nhomThe, 'sua');
};

// window.ham_21_44_hien_thi_modal_the = function (tenCu, diemCu, nhomThe, hanhDong) {
//     let modal = document.getElementById('gvcn-modal-the');
//     if (!modal) {
//         modal = document.createElement('div');
//         modal.id = 'gvcn-modal-the';
//         modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); display:flex; align-items:center; justify-content:center; z-index:999999; backdrop-filter: blur(2px);';
//         document.body.appendChild(modal);
//     }

//     let title = hanhDong === 'sua' ? '✏️ Sửa Sự Kiện / Lỗi' : '➕ Thêm Sự Kiện / Lỗi Mới';
//     let btnText = hanhDong === 'sua' ? 'Cập nhật' : 'Lưu mới';

//     modal.innerHTML = `
//         <div style="background:#fff; width:400px; padding:25px; border-radius:8px; box-shadow:0 10px 25px rgba(0,0,0,0.4); animation: fadeIn 0.2s;">
//             <h3 style="margin-top:0; color:#e83e8c; border-bottom:1px dashed #eee; padding-bottom:10px;">${title}</h3>
            
//             <input type="hidden" id="gvcn-the-hanh-dong" value="${hanhDong}">
//             <input type="hidden" id="gvcn-the-ten-cu" value="${tenCu.replace(/"/g, '&quot;')}">
            
//             <label style="font-size:12px; font-weight:bold; color:#495057;">Nhóm sự kiện:</label>
//             <input type="text" id="gvcn-the-nhom" value="${nhomThe.replace(/"/g, '&quot;')}" placeholder="VD: HỌC TẬP, TÁC PHONG..." style="width:100%; padding:10px; border:1px solid #ccc; color:#495057; border-radius:4px; margin-top:5px; margin-bottom:15px; box-sizing:border-box; font-weight:bold;">

//             <label style="font-size:12px; font-weight:bold; color:#e83e8c;">Tên sự kiện / lỗi:</label>
//             <input type="text" id="gvcn-the-ten" value="${tenCu.replace(/"/g, '&quot;')}" placeholder="VD: Không thuộc bài, Phát biểu tốt..." style="width:100%; padding:10px; border:2px solid #e83e8c; color:#e83e8c; font-weight:bold; outline:none; border-radius:4px; margin-top:5px; margin-bottom:15px; box-sizing:border-box;">
            
//             <label style="font-size:12px; font-weight:bold; color:#dc3545;">Điểm số (Ghi dấu trừ nếu là lỗi, VD: -5, +2):</label>
//             <input type="number" id="gvcn-the-diem" value="${diemCu}" step="0.5" style="width:100%; padding:10px; border:1px solid #ccc; border-radius:4px; margin-top:5px; margin-bottom:20px; box-sizing:border-box; font-weight:bold; color:#dc3545;">

//             <div style="text-align:right; display:flex; gap:10px; justify-content:flex-end; border-top:1px solid #eee; padding-top:15px;">
//                 <button onclick="document.getElementById('gvcn-modal-the').remove()" style="padding:10px 20px; background:#6c757d; color:#fff; border:none; border-radius:4px; cursor:pointer; font-weight:bold;">Hủy</button>
//                 <button onclick="window.ham_21_36_luu_the()" style="padding:10px 25px; background:#e83e8c; color:#fff; border:none; border-radius:4px; cursor:pointer; font-weight:bold; box-shadow:0 2px 4px rgba(232,62,140,0.3);">💾 ${btnText}</button>
//             </div>
//         </div>
//     `;
// };



// =====================================================================
// HÀM 21.44: HIỂN THỊ MODAL THÊM/SỬA THẺ (CÓ BỔ SUNG NÚT XÓA)
// =====================================================================
window.ham_21_44_hien_thi_modal_the = function (tenCu, diemCu, nhomThe, hanhDong) {
    let modal = document.getElementById('gvcn-modal-the');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'gvcn-modal-the';
        modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); display:flex; align-items:center; justify-content:center; z-index:999999; backdrop-filter: blur(2px);';
        document.body.appendChild(modal);
    }

    let title = hanhDong === 'sua' ? '✏️ Sửa Sự Kiện / Lỗi' : '➕ Thêm Sự Kiện / Lỗi Mới';
    let btnText = hanhDong === 'sua' ? 'Cập nhật' : 'Lưu mới';

    // 🌟 Hiển thị nút Xóa nếu đang ở chế độ Sửa
    let btnXoaHtml = hanhDong === 'sua' ? `<button onclick="window.ham_21_44b_xoa_the('${tenCu.replace(/'/g, "\\'")}')" style="padding:10px 15px; background:#dc3545; color:#fff; border:none; border-radius:4px; cursor:pointer; font-weight:bold; margin-right:auto; box-shadow:0 2px 4px rgba(220,53,69,0.3);">🗑️ Xóa</button>` : '';

    // Nếu là nhóm hình thức xử lý thì khóa ô Điểm và Nhóm lại (để không bị sửa nhầm sang thẻ lỗi)
    let thuocTinhKhoaNhom = nhomThe === 'hinh_thuc_xu_ly' ? 'readonly style="background:#e9ecef;"' : '';
    let thuocTinhKhoaDiem = nhomThe === 'hinh_thuc_xu_ly' ? 'disabled' : '';

    modal.innerHTML = `
        <div style="background:#fff; width:400px; padding:25px; border-radius:8px; box-shadow:0 10px 25px rgba(0,0,0,0.4); animation: fadeIn 0.2s;">
            <h3 style="margin-top:0; color:#e83e8c; border-bottom:1px dashed #eee; padding-bottom:10px;">${title}</h3>
            
            <input type="hidden" id="gvcn-the-hanh-dong" value="${hanhDong}">
            <input type="hidden" id="gvcn-the-ten-cu" value="${tenCu.replace(/"/g, '&quot;')}">
            
            <label style="font-size:12px; font-weight:bold; color:#495057;">Nhóm sự kiện:</label>
            <input type="text" id="gvcn-the-nhom" value="${nhomThe.replace(/"/g, '&quot;')}" placeholder="VD: HỌC TẬP, TÁC PHONG..." style="width:100%; padding:10px; border:1px solid #ccc; color:#495057; border-radius:4px; margin-top:5px; margin-bottom:15px; box-sizing:border-box; font-weight:bold;" ${thuocTinhKhoaNhom}>

            <label style="font-size:12px; font-weight:bold; color:#e83e8c;">Tên sự kiện / lỗi / hình thức xử lý:</label>
            <input type="text" id="gvcn-the-ten" value="${tenCu.replace(/"/g, '&quot;')}" placeholder="VD: Không thuộc bài, Chép phạt..." style="width:100%; padding:10px; border:2px solid #e83e8c; color:#e83e8c; font-weight:bold; outline:none; border-radius:4px; margin-top:5px; margin-bottom:15px; box-sizing:border-box;">
            
            <label style="font-size:12px; font-weight:bold; color:#dc3545;">Điểm số (Ghi dấu trừ nếu là lỗi, VD: -5, +2):</label>
            <input type="number" id="gvcn-the-diem" value="${diemCu}" step="0.5" style="width:100%; padding:10px; border:1px solid #ccc; border-radius:4px; margin-top:5px; margin-bottom:20px; box-sizing:border-box; font-weight:bold; color:#dc3545;" ${thuocTinhKhoaDiem}>

            <div style="text-align:right; display:flex; gap:10px; justify-content:flex-end; border-top:1px solid #eee; padding-top:15px;">
                ${btnXoaHtml}
                <button onclick="document.getElementById('gvcn-modal-the').remove()" style="padding:10px 20px; background:#6c757d; color:#fff; border:none; border-radius:4px; cursor:pointer; font-weight:bold;">Hủy</button>
                <button onclick="window.ham_21_36_luu_the()" style="padding:10px 25px; background:#e83e8c; color:#fff; border:none; border-radius:4px; cursor:pointer; font-weight:bold; box-shadow:0 2px 4px rgba(232,62,140,0.3);">💾 ${btnText}</button>
            </div>
        </div>
    `;
};

// =====================================================================
// HÀM 21.44b: XÓA VĨNH VIỄN THẺ (CHO CẢ LỖI VÀ HÌNH THỨC XỬ LÝ)
// =====================================================================
window.ham_21_44b_xoa_the = async function (tenThe) {
    if (!confirm(`⚠️ Thầy có chắc chắn muốn xóa vĩnh viễn thẻ "${tenThe}" ra khỏi cấu hình không?`)) return;
    try {
        const { error } = await _supabase.from('cai_dat_the_su_kien_gvcn').delete().eq('ten_the', tenThe);
        if (error) throw error;

        document.getElementById('gvcn-modal-the').remove();
        if (typeof window.ham_21_34_render_tat_ca_cac_the_su_kien === 'function') {
            window.ham_21_34_render_tat_ca_cac_the_su_kien();
        }
    } catch (e) {
        alert("❌ Lỗi khi xóa: " + e.message);
    }
};






// =====================================================================
// HÀM 21.45: HIỂN THỊ DANH SÁCH CÁC TUẦN CŨ ĐÃ LƯU ĐỂ XEM LẠI
// =====================================================================
window.ham_21_45_xem_tuan_cu = async function () {
    const maLopRaw = document.getElementById('gvcn-input-lop');
    if (!maLopRaw || !maLopRaw.value.trim()) {
        alert("⚠️ Vui lòng chọn Lớp học ở Mục 1 trước khi xem danh sách tuần cũ!");
        return;
    }

    const maLop = maLopRaw.value.match(/\(([^)]+)\)$/)?.[1]?.trim() || maLopRaw.value.trim();

    // 1. Tạo và hiển thị Modal loading
    let modal = document.getElementById('gvcn-modal-xem-tuan');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'gvcn-modal-xem-tuan';
        modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); display:flex; align-items:center; justify-content:center; z-index:999999; backdrop-filter: blur(2px); animation: fadeIn 0.15s;';
        document.body.appendChild(modal);
    }

    modal.innerHTML = `
        <div style="background:#fff; width:450px; max-height: 80vh; display:flex; flex-direction:column; border-radius:10px; box-shadow:0 10px 25px rgba(0,0,0,0.4); overflow:hidden;">
            <div style="background:#e83e8c; color:#fff; padding:15px 20px; display:flex; justify-content:space-between; align-items:center;">
                <h3 style="margin:0; font-size:16px;">📅 Các tuần đã lưu của lớp ${maLop}</h3>
                <button onclick="document.getElementById('gvcn-modal-xem-tuan').remove()" style="background:transparent; color:#fff; border:none; font-size:18px; cursor:pointer; transition:0.2s;" onmouseover="this.style.color='#ffc107'" onmouseout="this.style.color='#fff'">✖</button>
            </div>
            <div id="gvcn-danh-sach-tuan-cu" style="padding:20px; overflow-y:auto; flex:1; background:#f8f9fa;">
                <div style="text-align:center; color:#6c757d; font-style:italic; font-size:14px;">⏳ Đang dò tìm dữ liệu...</div>
            </div>
        </div>
    `;

    try {
        // 2. Truy vấn danh sách các tuần đã lưu của lớp này
        const { data, error } = await _supabase.from('nhat_ky_gvcn')
            .select('id, tuan_hoc, tu_ngay, den_ngay')
            .eq('ma_lop', maLop);

        if (error) throw error;

        const vungDanhSach = document.getElementById('gvcn-danh-sach-tuan-cu');

        if (data && data.length > 0) {
            // Sắp xếp các tuần giảm dần (Tuần mới nhất nằm trên cùng)
            data.sort((a, b) => {
                let numA = parseInt(a.tuan_hoc.replace(/\D/g, '')) || 0;
                let numB = parseInt(b.tuan_hoc.replace(/\D/g, '')) || 0;
                return numB - numA;
            });

            let htmlList = '<div style="display:flex; flex-direction:column; gap:10px;">';

            data.forEach(tuan => {
                let strTu = tuan.tu_ngay ? tuan.tu_ngay.split('-').reverse().join('/') : '...';
                let strDen = tuan.den_ngay ? tuan.den_ngay.split('-').reverse().join('/') : '...';
                let tenTuan = tuan.tuan_hoc.replace(/"/g, '&quot;');

                htmlList += `
                    <div onclick="window.ham_21_45b_chon_tuan_tu_modal('${tenTuan}')" 
                         style="background:#fff; border:1px solid #ced4da; border-radius:8px; padding:12px 15px; display:flex; justify-content:space-between; align-items:center; cursor:pointer; box-shadow:0 2px 4px rgba(0,0,0,0.02); transition:0.2s;"
                         onmouseover="this.style.borderColor='#e83e8c'; this.style.boxShadow='0 4px 8px rgba(232,62,140,0.15)';" 
                         onmouseout="this.style.borderColor='#ced4da'; this.style.boxShadow='0 2px 4px rgba(0,0,0,0.02)';">
                        <div>
                            <div style="font-weight:bold; color:#0056b3; font-size:15px; margin-bottom:4px;">${tuan.tuan_hoc}</div>
                            <div style="font-size:12px; color:#6c757d;">🕒 Từ <b>${strTu}</b> đến <b>${strDen}</b></div>
                        </div>
                        <div style="background:#e8f0fe; color:#1a73e8; padding:6px 12px; border-radius:20px; font-size:12px; font-weight:bold;">
                            Mở xem ▶
                        </div>
                    </div>
                `;
            });
            htmlList += '</div>';
            vungDanhSach.innerHTML = htmlList;
        } else {
            vungDanhSach.innerHTML = `<div style="text-align:center; color:#dc3545; padding:20px; background:#f8d7da; border-radius:8px; border:1px solid #f5c6cb; font-weight:bold;">⚠️ Lớp này chưa lưu Nhật ký cho bất kỳ tuần nào!</div>`;
        }

    } catch (e) {
        console.error(e);
        document.getElementById('gvcn-danh-sach-tuan-cu').innerHTML = `<div style="color:red; text-align:center; font-weight:bold;">❌ Lỗi tải dữ liệu: ${e.message}</div>`;
    }
};

// =====================================================================
// HÀM PHỤ: XỬ LÝ KHI BẤM CHỌN 1 TUẦN BẤT KỲ TRONG MODAL
// =====================================================================
window.ham_21_45b_chon_tuan_tu_modal = function (tenTuan) {
    // 1. Đẩy tên tuần vào Mục 1 và tải nội dung chung
    const inputTuanMuc1 = document.getElementById('gvcn-input-tuan');
    if (inputTuanMuc1) {
        inputTuanMuc1.value = tenTuan;
        if (typeof window.ham_21_16_tai_du_lieu_tuan === 'function') {
            window.ham_21_16_tai_du_lieu_tuan();
        }
    }

    // 2. Đẩy tên tuần vào Mục 5 và tải danh sách sự kiện
    const inputTuanMuc5 = document.getElementById('gvcn-sk-tuan-chon');
    if (inputTuanMuc5) {
        inputTuanMuc5.value = tenTuan;
        if (typeof window.ham_21_30_cap_nhat_ngay_tuan_su_kien === 'function') {
            window.ham_21_30_cap_nhat_ngay_tuan_su_kien();
        }
    }

    // 3. Đóng modal
    const modal = document.getElementById('gvcn-modal-xem-tuan');
    if (modal) modal.remove();
};

// =====================================================================
// HÀM 21.46: GIAO DIỆN MODAL TÌM KIẾM & THỐNG KÊ (ĐÃ KẾT NỐI TÊN LỚP, TUẦN & AVATAR HS)
// =====================================================================
window.ham_21_46_mo_giao_dien_tim_lai = function () {
    const maLopRaw = document.getElementById('gvcn-input-lop');
    if (!maLopRaw || !maLopRaw.value.trim()) {
        alert("⚠️ Vui lòng chọn Lớp học ở Mục 1 trước khi mở bộ lọc thống kê!");
        return;
    }

    // Lấy tên lớp đầy đủ hiển thị theo yêu cầu: Tên lớp (Mã lớp)
    let tenLopDayDu = maLopRaw.value.trim();
    let maLop = tenLopDayDu.match(/\(([^)]+)\)$/)?.[1]?.trim() || tenLopDayDu;

    let modal = document.getElementById('gvcn-modal-thong-ke');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'gvcn-modal-thong-ke';
        modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); display:flex; align-items:center; justify-content:center; z-index:999999; backdrop-filter: blur(2px);';
        document.body.appendChild(modal);
    }

    // Tự động tính toán khoảng ngày cho 37 tuần học dựa trên mốc 07/09/2026
    let optionsTuan = '<option value="">-- Tất cả các tuần --</option>';
    let dGoc = new Date('2026-09-07T00:00:00');
    for (let i = 1; i <= 37; i++) {
        let dBatDau = new Date(dGoc);
        dBatDau.setDate(dBatDau.getDate() + (i - 1) * 7);
        let dKetThuc = new Date(dBatDau);
        dKetThuc.setDate(dKetThuc.getDate() + 6);

        let strTu = dBatDau.toISOString().split('T')[0].split('-').reverse().join('/');
        let strDen = dKetThuc.toISOString().split('T')[0].split('-').reverse().join('/');

        optionsTuan += `<option value="Tuần ${i}">Tuần ${i} (${strTu} -> ${strDen})</option>`;
    }

    modal.innerHTML = `
        <div style="background:#fff; width:850px; max-width:95%; max-height:90vh; display:flex; flex-direction:column; border-radius:10px; box-shadow:0 10px 30px rgba(0,0,0,0.4); overflow:hidden;">
            <div style="background:#6f42c1; color:#fff; padding:15px 20px; display:flex; justify-content:space-between; align-items:center;">
                <h3 style="margin:0; font-size:17px;">📊 Tra cứu & Thống kê Thi đua - Lớp ${tenLopDayDu}</h3>
                <button onclick="document.getElementById('gvcn-modal-thong-ke').remove()" style="background:transparent; color:#fff; border:none; font-size:18px; cursor:pointer;" title="Đóng">✖</button>
            </div>
            
            <!-- THANH BỘ LỌC -->
            <div style="padding:15px 20px; background:#f8f9fa; border-bottom:1px solid #dee2e6; display:flex; gap:12px; flex-wrap:wrap; align-items:flex-end;">
                <div>
                    <label style="font-size:11px; font-weight:bold; color:#495057; display:block; margin-bottom:4px;">Chọn Tuần:</label>
                    <select id="tk-chon-tuan" style="padding:8px; border:1px solid #ced4da; border-radius:6px; font-size:13px; font-weight:bold; background:#fff; width:220px;">
                        ${optionsTuan}
                    </select>
                </div>
                
                <div style="flex:1; min-width:220px; position:relative;" id="tk-vung-chon-hs">
                    <label style="font-size:11px; font-weight:bold; color:#495057; display:block; margin-bottom:4px;">Học sinh (Gõ tên để lọc):</label>
                    <input id="tk-chon-hs" placeholder="Gõ tìm học sinh..." autocomplete="off" oninput="window.ham_21_49_hien_dropdown_hs_thong_ke(this)" style="width:100%; padding:8px; border:1px solid #ced4da; border-radius:6px; font-size:13px; font-weight:bold; background:#fff; box-sizing:border-box;">
                    <input type="hidden" id="tk-chon-hs-uid" value="">
                </div>

                <div>
                    <button onclick="window.ham_21_47_thuc_hien_tim_kiem_thong_ke()" style="padding:9px 20px; background:#28a745; color:white; border:none; border-radius:6px; font-weight:bold; cursor:pointer; font-size:13px; box-shadow:0 2px 4px rgba(40,167,69,0.3);">🔍 Thống kê ngay</button>
                </div>
            </div>

            <!-- VÙNG HIỂN THỊ KẾT QUẢ -->
            <div id="gvcn-vung-ket-qua-tk" style="padding:20px; overflow-y:auto; flex:1; background:#fff;">
                <div style="text-align:center; color:#6c757d; font-style:italic; padding:40px;">💡 Vui lòng chọn bộ lọc phía trên và bấm "Thống kê ngay" để xem dữ liệu.</div>
            </div>

            <!-- THANH TÁC VỤ CUỐI -->
            <div style="padding:12px 20px; background:#f1f3f4; border-top:1px solid #dee2e6; display:flex; justify-content:space-between; align-items:center;">
                <span id="tk-tong-so-dong" style="font-size:12px; font-weight:bold; color:#6c757d;">Tổng số: 0 sự kiện</span>
                <div style="display:flex; gap:10px;">
                    <button onclick="window.ham_21_48_xuat_in_bao_cao()" style="padding:8px 16px; background:#17a2b8; color:white; border:none; border-radius:6px; font-weight:bold; cursor:pointer; font-size:12px;">🖨️ In / Xuất báo cáo</button>
                    <button onclick="document.getElementById('gvcn-modal-thong-ke').remove()" style="padding:8px 16px; background:#6c757d; color:white; border:none; border-radius:6px; font-weight:bold; cursor:pointer; font-size:12px;">Đóng</button>
                </div>
            </div>
        </div>
    `;
};
// =====================================================================
// HÀM 21.49: GỢI Ý HỌC SINH CÓ KÈM AVATAR TRONG BẢNG THỐNG KÊ
// =====================================================================
window.ham_21_49_hien_dropdown_hs_thong_ke = function (inputElem) {
    document.querySelectorAll('.dropdown-hs-tk').forEach(el => el.remove());
    if (!window.DanhSachHocSinhLopHienTai || window.DanhSachHocSinhLopHienTai.length === 0) return;

    let tuKhoa = inputElem.value.toLowerCase().trim();
    if (!tuKhoa) {
        document.getElementById('tk-chon-hs-uid').value = '';
        return;
    }

    let dsLoc = window.DanhSachHocSinhLopHienTai.filter(hs =>
        hs.tenHienThi.toLowerCase().includes(tuKhoa) || hs.tenDangNhap.toLowerCase().includes(tuKhoa)
    );
    if (dsLoc.length === 0) return;

    let rect = inputElem.getBoundingClientRect();
    let parentRect = inputElem.closest('#tk-vung-chon-hs').getBoundingClientRect();

    let dropdown = document.createElement('div');
    dropdown.className = 'dropdown-hs-tk';
    dropdown.style.cssText = `position:absolute; top:calc(100% + 4px); left:0; width:100%; max-height:220px; overflow-y:auto; background:#fff; border:1px solid #6f42c1; border-radius:6px; box-shadow:0 5px 15px rgba(0,0,0,0.2); z-index:999999;`;

    dsLoc.forEach(hs => {
        let item = document.createElement('div');
        item.style.cssText = `display:flex; align-items:center; gap:10px; padding:8px 12px; cursor:pointer; border-bottom:1px solid #f1f3f4;`;
        item.onmouseover = () => item.style.background = '#f3e8ff';
        item.onmouseout = () => item.style.background = '#fff';

        item.innerHTML = `
            <img src="${hs.avatarUrl}" style="width:30px; height:30px; border-radius:50%; object-fit:cover; border:1px solid #ccc;">
            <div>
                <div style="font-weight:bold; color:#6f42c1; font-size:13px;">${hs.tenHienThi}</div>
                <div style="font-size:11px; color:#6c757d;">SĐT/ID: ${hs.tenDangNhap}</div>
            </div>
        `;

        item.onmousedown = function (e) {
            e.preventDefault();
            inputElem.value = hs.tenHienThi;
            document.getElementById('tk-chon-hs-uid').value = hs.uid;
            dropdown.remove();
        };
        dropdown.appendChild(item);
    });

    inputElem.closest('#tk-vung-chon-hs').appendChild(dropdown);

    document.addEventListener('mousedown', function closeDD(e) {
        if (!inputElem.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.remove();
            document.removeEventListener('mousedown', closeDD);
        }
    });
};

// // =====================================================================
// // HÀM 21.47: TRUY VẤN DỮ LIỆU THỐNG KÊ TỪ SUPABASE (CÓ LỌC THEO UID HỌC SINH)
// // =====================================================================
// window.ham_21_47_thuc_hien_tim_kiem_thong_ke = async function () {
//     const maLopRaw = document.getElementById('gvcn-input-lop').value;
//     const maLop = maLopRaw.match(/\(([^)]+)\)$/)?.[1]?.trim() || maLopRaw.trim();
//     const tuanChon = document.getElementById('tk-chon-tuan').value;
//     const uidHS = document.getElementById('tk-chon-hs-uid').value;
//     const tenHSInput = document.getElementById('tk-chon-hs').value.toLowerCase().trim();

//     const vungKQ = document.getElementById('gvcn-vung-ket-qua-tk');
//     vungKQ.innerHTML = '<div style="text-align:center; color:#6f42c1; font-weight:bold; padding:30px;">⏳ Đang tổng hợp dữ liệu thi đua...</div>';

//     try {
//         let queryNK = _supabase.from('nhat_ky_gvcn').select('id, tuan_hoc').eq('ma_lop', maLop);
//         if (tuanChon) queryNK = queryNK.eq('tuan_hoc', tuanChon);

//         const { data: nkList, error: errNK } = await queryNK;
//         if (errNK) throw errNK;

//         if (!nkList || nkList.length === 0) {
//             vungKQ.innerHTML = '<div style="text-align:center; color:#dc3545; font-weight:bold; padding:30px;">⚠️ Không tìm thấy dữ liệu tuần phù hợp cho lớp này!</div>';
//             document.getElementById('tk-tong-so-dong').innerText = 'Tổng số: 0 sự kiện';
//             return;
//         }

//         let idNKS = nkList.map(x => x.id);
//         let mapTuan = {};
//         nkList.forEach(x => mapTuan[x.id] = x.tuan_hoc);

//         let querySK = _supabase.from('nhat_ky_gvcn_su_kien_hs')
//             .select('*')
//             .in('id_gvcn_nhat_ky', idNKS)
//             .not('nhom_su_kien', 'ilike', 'Giao việc:%')
//             .order('ngay_ghi_nhan', { ascending: false });

//         if (uidHS) {
//             querySK = querySK.eq('uid_hoc_sinh', uidHS);
//         }

//         const { data: skList, error: errSK } = await querySK;
//         if (errSK) throw errSK;

//         let ketQuaLoc = skList || [];
//         // Lọc phụ bằng tên nếu người dùng gõ tay nhưng chưa chọn từ danh sách gợi ý
//         if (!uidHS && tenHSInput) {
//             ketQuaLoc = ketQuaLoc.filter(item => (item.ten_hoc_sinh || '').toLowerCase().includes(tenHSInput));
//         }

//         document.getElementById('tk-tong-so-dong').innerText = `Tổng số: ${ketQuaLoc.length} sự kiện / vi phạm`;

//         if (ketQuaLoc.length === 0) {
//             vungKQ.innerHTML = '<div style="text-align:center; color:#6c757d; font-style:italic; padding:30px;">Không có sự kiện hoặc vi phạm nào khớp với điều kiện lọc.</div>';
//             return;
//         }

//         let htmlTable = `
//             <table id="bang-in-thong-ke" style="width:100%; border-collapse:collapse; font-size:13px; background:#fff; border:1px solid #dee2e6;">
//                 <tr style="background:#f3e8ff; color:#6f42c1; border-bottom:2px solid #6f42c1;">
//                     <th style="padding:10px; border:1px solid #dee2e6; text-align:center; width:40px;">STT</th>
//                     <th style="padding:10px; border:1px solid #dee2e6; text-align:center; width:110px;">Tuần</th>
//                     <th style="padding:10px; border:1px solid #dee2e6; text-align:center; width:90px;">Ngày</th>
//                     <th style="padding:10px; border:1px solid #dee2e6; text-align:left; width:180px;">Học sinh</th>
//                     <th style="padding:10px; border:1px solid #dee2e6; text-align:left;">Sự kiện / Lỗi</th>
//                     <th style="padding:10px; border:1px solid #dee2e6; text-align:center; width:70px;">Điểm</th>
//                 </tr>
//         `;

//         ketQuaLoc.forEach((sk, idx) => {
//             let tuanHienThi = mapTuan[sk.id_gvcn_nhat_ky] || '...';
//             let strNgay = sk.ngay_ghi_nhan ? sk.ngay_ghi_nhan.split('-').reverse().join('/') : '';
//             let diemTru = sk.thong_tin_mo_rong?.diem_tru || 0;
//             let mauDiem = diemTru < 0 ? '#dc3545' : (diemTru > 0 ? '#28a745' : '#495057');

//             htmlTable += `
//                 <tr style="border-bottom:1px solid #dee2e6;">
//                     <td style="padding:8px; border:1px solid #dee2e6; text-align:center; font-weight:bold;">${idx + 1}</td>
//                     <td style="padding:8px; border:1px solid #dee2e6; text-align:center; font-weight:bold; color:#6f42c1;">${tuanHienThi}</td>
//                     <td style="padding:8px; border:1px solid #dee2e6; text-align:center;">${strNgay}</td>
//                     <td style="padding:8px; border:1px solid #dee2e6; font-weight:bold; color:#0056b3;">${sk.ten_hoc_sinh || ''}</td>
//                     <td style="padding:8px; border:1px solid #dee2e6;">${sk.nhom_su_kien || ''} <div style="font-size:11px; color:#666;">${sk.noi_dung_chi_tiet || ''}</div></td>
//                     <td style="padding:8px; border:1px solid #dee2e6; text-align:center; font-weight:bold; color:${mauDiem};">${diemTru !== 0 ? diemTru : '-'}</td>
//                 </tr>
//             `;
//         });

//         htmlTable += `</table>`;
//         vungKQ.innerHTML = htmlTable;

//     } catch (e) {
//         console.error(e);
//         vungKQ.innerHTML = `<div style="color:red; text-align:center; font-weight:bold;">❌ Lỗi thống kê: ${e.message}</div>`;
//     }
// };


// Cập nhật lại Hàm ham_21_47_thuc_hien_tim_kiem_thong_ke để vẽ Thẻ Xử lý 3 màu
window.ham_21_47_thuc_hien_tim_kiem_thong_ke = async function () {
    const maLopRaw = document.getElementById('gvcn-input-lop').value;
    const maLop = maLopRaw.match(/\(([^)]+)\)$/)?.[1]?.trim() || maLopRaw.trim();
    const tuanChon = document.getElementById('tk-chon-tuan').value;
    const uidHS = document.getElementById('tk-chon-hs-uid').value;
    const tenHSInput = document.getElementById('tk-chon-hs').value.toLowerCase().trim();

    const vungKQ = document.getElementById('gvcn-vung-ket-qua-tk');
    vungKQ.innerHTML = '<div style="text-align:center; color:#6f42c1; font-weight:bold; padding:30px;">⏳ Đang tổng hợp dữ liệu thi đua...</div>';

    try {
        let queryNK = _supabase.from('nhat_ky_gvcn').select('id, tuan_hoc').eq('ma_lop', maLop);
        if (tuanChon) queryNK = queryNK.eq('tuan_hoc', tuanChon);

        const { data: nkList, error: errNK } = await queryNK;
        if (errNK) throw errNK;

        if (!nkList || nkList.length === 0) {
            vungKQ.innerHTML = '<div style="text-align:center; color:#dc3545; font-weight:bold; padding:30px;">⚠️ Không tìm thấy dữ liệu tuần phù hợp cho lớp này!</div>';
            document.getElementById('tk-tong-so-dong').innerText = 'Tổng số: 0 sự kiện'; return;
        }

        let idNKS = nkList.map(x => x.id);
        let mapTuan = {};
        nkList.forEach(x => mapTuan[x.id] = x.tuan_hoc);

        let querySK = _supabase.from('nhat_ky_gvcn_su_kien_hs').select('*').in('id_gvcn_nhat_ky', idNKS).not('nhom_su_kien', 'ilike', 'Giao việc:%').order('ngay_ghi_nhan', { ascending: false });
        if (uidHS) querySK = querySK.eq('uid_hoc_sinh', uidHS);

        const { data: skList, error: errSK } = await querySK;
        if (errSK) throw errSK;

        let ketQuaLoc = skList || [];
        if (!uidHS && tenHSInput) ketQuaLoc = ketQuaLoc.filter(item => (item.ten_hoc_sinh || '').toLowerCase().includes(tenHSInput));

        document.getElementById('tk-tong-so-dong').innerText = `Tổng số: ${ketQuaLoc.length} sự kiện / vi phạm`;

        if (ketQuaLoc.length === 0) { vungKQ.innerHTML = '<div style="text-align:center; color:#6c757d; font-style:italic; padding:30px;">Không có sự kiện hoặc vi phạm nào khớp với điều kiện lọc.</div>'; return; }

        let htmlTable = `
            <table id="bang-in-thong-ke" style="width:100%; border-collapse:collapse; font-size:13px; background:#fff; border:1px solid #dee2e6;">
                <tr style="background:#f3e8ff; color:#6f42c1; border-bottom:2px solid #6f42c1;">
                    <th style="padding:10px; border:1px solid #dee2e6; text-align:center; width:40px;">STT</th>
                    <th style="padding:10px; border:1px solid #dee2e6; text-align:center; width:110px;">Tuần</th>
                    <th style="padding:10px; border:1px solid #dee2e6; text-align:center; width:90px;">Ngày</th>
                    <th style="padding:10px; border:1px solid #dee2e6; text-align:left; width:180px;">Học sinh</th>
                    <th style="padding:10px; border:1px solid #dee2e6; text-align:left;">Sự kiện / Lỗi</th>
                    <th style="padding:10px; border:1px solid #dee2e6; text-align:center; width:70px;">Điểm</th>
                    <th style="padding:10px; border:1px solid #dee2e6; text-align:center; width:180px;">Tiến độ Khắc phục</th>
                </tr>
        `;

        ketQuaLoc.forEach((sk, idx) => {
            let tuanHienThi = mapTuan[sk.id_gvcn_nhat_ky] || '...';
            let strNgay = sk.ngay_ghi_nhan ? sk.ngay_ghi_nhan.split('-').reverse().join('/') : '';
            let diemTru = sk.thong_tin_mo_rong?.diem_tru || 0;
            let mauDiem = diemTru < 0 ? '#dc3545' : (diemTru > 0 ? '#28a745' : '#495057');

            // 🌟 RENDER NHÃN XỬ LÝ 3 MÀU 🌟
            let xlObj = sk.thong_tin_mo_rong?.xu_ly;
            let xlHtml = '<span style="color:#adb5bd; font-style:italic;">Không yêu cầu</span>';
            if (xlObj) {
                let isDone = xlObj.trang_thai === 'Đã hoàn thành';
                let isPartial = xlObj.trang_thai === 'Đã nộp 1 phần';
                let bgXl = isDone ? '#d4edda' : (isPartial ? '#cce5ff' : '#fff3cd');
                let colXl = isDone ? '#155724' : (isPartial ? '#004085' : '#856404');
                let icnXl = isDone ? '✅' : (isPartial ? '🔄' : '⏳');
                let textXl = isDone ? 'Đã xong' : (isPartial ? '1 phần' : 'Chưa xong');
                let bdrXl = isDone ? '#c3e6cb' : (isPartial ? '#b8daff' : '#ffeeba');

                xlHtml = `<div onclick="window.ham_21_51_mo_popup_cap_nhat_xu_ly('${sk.id}')" style="background:${bgXl}; color:${colXl}; padding:6px; border-radius:6px; font-size:11px; cursor:pointer; border:1px solid ${bdrXl}; box-shadow:0 1px 2px rgba(0,0,0,0.1); transition:0.2s; text-align:center;" onmouseover="this.style.filter='brightness(0.95)'" onmouseout="this.style.filter='brightness(1)'" title="Bấm để Cập nhật tiến độ">
                    <div style="font-weight:bold; margin-bottom:4px;">${icnXl} ${textXl}</div>
                    <div style="font-size:10px; opacity:0.9;">${xlObj.hinh_thuc}</div>
                </div>`;
            }

            htmlTable += `
                <tr style="border-bottom:1px solid #dee2e6;">
                    <td style="padding:8px; border:1px solid #dee2e6; text-align:center; font-weight:bold;">${idx + 1}</td>
                    <td style="padding:8px; border:1px solid #dee2e6; text-align:center; font-weight:bold; color:#6f42c1;">${tuanHienThi}</td>
                    <td style="padding:8px; border:1px solid #dee2e6; text-align:center;">${strNgay}</td>
                    <td style="padding:8px; border:1px solid #dee2e6; font-weight:bold; color:#0056b3;">${sk.ten_hoc_sinh || ''}</td>
                    <td style="padding:8px; border:1px solid #dee2e6;">${sk.nhom_su_kien || ''} <div style="font-size:11px; color:#666;">${sk.noi_dung_chi_tiet || ''}</div></td>
                    <td style="padding:8px; border:1px solid #dee2e6; text-align:center; font-weight:bold; color:${mauDiem};">${diemTru !== 0 ? diemTru : '-'}</td>
                    <td style="padding:8px; border:1px solid #dee2e6; text-align:center;">${xlHtml}</td>
                </tr>
            `;
        });
        htmlTable += `</table>`; vungKQ.innerHTML = htmlTable;

    } catch (e) { vungKQ.innerHTML = `<div style="color:red; text-align:center; font-weight:bold;">❌ Lỗi thống kê: ${e.message}</div>`; }
};




// =====================================================================
// HÀM 21.48: IN HOẶC XUẤT BÁO CÁO THỐNG KÊ
// =====================================================================
window.ham_21_48_xuat_in_bao_cao = function () {
    let bang = document.getElementById('bang-in-thong-ke');
    if (!bang) {
        alert("⚠️ Chưa có dữ liệu thống kê để in!");
        return;
    }
    let win = window.open('', '', 'height=700,width=900');
    win.document.write('<html><head><title>Báo cáo Thống kê Thi đua GVCN</title>');
    win.document.write('<style>body{font-family:Arial;padding:20px;} table{width:100%;border-collapse:collapse;margin-top:15px;} th,td{border:1px solid #333;padding:8px;font-size:12px;} th{background:#f2f2f2;}</style>');
    win.document.write('</head><body>');
    win.document.write('<h2>BÁO CÁO TỔNG HỢP SỰ KIỆN / THI ĐUA CHỦ NHIỆM</h2>');
    win.document.write(bang.outerHTML);
    win.document.write('</body></html>');
    win.document.close();
    win.print();
};



// 2. Định dạng hiển thị Tuần kèm theo khoảng ngày (VD: Tuần 1 (07/09/2026 -> 13/09/2026))
window.ham_21_50_dinh_dang_tuan_hien_thi = function (soTuan, tuNgayStr, denNgayStr) {
    let strTu = tuNgayStr ? tuNgayStr.split('-').reverse().join('/') : '';
    let strDen = denNgayStr ? denNgayStr.split('-').reverse().join('/') : '';
    if (strTu && strDen) {
        return `Tuần ${soTuan} (${strTu} -> ${strDen})`;
    }
    return `Tuần ${soTuan}`;
};



// =====================================================================
// HÀM 21.51: POPUP CẬP NHẬT TRẠNG THÁI "CHÉP PHẠT / LÀM LẠI BÀI" CỦA GVCN
// =====================================================================
window.ham_21_51_mo_popup_cap_nhat_xu_ly = async function (idSuKien) {
    let modalId = 'modal-xu-ly-gvcn-' + idSuKien;
    let modal = document.getElementById(modalId);
    if (!modal) {
        modal = document.createElement('div');
        modal.id = modalId;
        modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); z-index:999999; display:flex; justify-content:center; align-items:center; padding:15px; animation: fadeIn 0.2s; box-sizing: border-box;';
        document.body.appendChild(modal);
    }

    modal.innerHTML = `<div style="background:#fff; padding:20px; border-radius:8px; font-weight:bold; color:#007bff; text-align:center;">⏳ Đang tải dữ liệu yêu cầu xử lý...</div>`;

    try {
        const { data: skData, error } = await _supabase.from('nhat_ky_gvcn_su_kien_hs').select('*').eq('id', idSuKien).single();
        if (error || !skData) throw error || new Error('Không tìm thấy sự kiện');

        let ttMoRong = skData.thong_tin_mo_rong || {};
        let xlObj = ttMoRong.xu_ly;
        if (!xlObj) { alert("⚠️ Sự kiện này không có yêu cầu xử lý đính kèm."); document.body.removeChild(modal); return; }

        window.danhSachAnhPhatGVCN = [];

        let isDone = xlObj.trang_thai === 'Đã hoàn thành';
        let isPartial = xlObj.trang_thai === 'Đã nộp 1 phần';
        let isNotDone = !isDone && !isPartial;

        let htmlAnhDaCo = '';
        if (xlObj.anh_minh_chung && xlObj.anh_minh_chung.length > 0) {
            htmlAnhDaCo = `<div style="margin-top:10px; font-size:12px; font-weight:bold; color:#28a745;">✅ Ảnh minh chứng đã nộp:</div><div style="display:flex; flex-wrap:wrap; gap:10px; margin-top:5px; border:1px dashed #28a745; padding:10px; border-radius:6px; background:#f0fdf4;">`;
            xlObj.anh_minh_chung.forEach(link => {
                let pL = link; let mD = link.match(/\/file\/d\/([a-zA-Z0-9_-]+)/); if (mD) pL = `https://lh3.googleusercontent.com/d/${mD[1]}`;
                htmlAnhDaCo += `<img onclick="window.open('${link}', '_blank')" src="${pL}" style="width: 100px; height: 100px; object-fit: cover; border-radius: 4px; border: 1px solid #28a745; cursor: zoom-in; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">`;
            });
            htmlAnhDaCo += `</div>`;
        }

        modal.innerHTML = `
            <div style="background:#fff; width:100%; max-width:550px; border-radius:8px; display:flex; flex-direction:column; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,0.5);">
                <div style="background:#e83e8c; color:#fff; padding:15px 20px; display:flex; justify-content:space-between; align-items:center;">
                    <h3 style="margin:0; font-size:16px;">🔄 CẬP NHẬT TRẠNG THÁI KHẮC PHỤC VI PHẠM</h3>
                    <button onclick="document.body.removeChild(this.closest('#${modalId}'))" style="background:transparent; color:#fff; border:none; font-size:18px; cursor:pointer;" title="Đóng">✖</button>
                </div>
                
                <div style="padding:20px; background:#f8f9fa;">
                    <div style="background:#fffcf8; border:1px solid #ffeeba; border-radius:6px; padding:15px; margin-bottom:20px; box-shadow:0 1px 3px rgba(0,0,0,0.05);">
                        <div style="font-size:13px; color:#555; margin-bottom:5px;">👤 Học sinh: <b style="color:#0056b3; font-size:14px;">${skData.ten_hoc_sinh}</b></div>
                        <div style="font-size:13px; color:#555; margin-bottom:5px;">🚨 Vi phạm: <b style="color:#dc3545;">[${skData.nhom_su_kien}]</b></div>
                        <div style="border-top:1px dashed #ffeeba; margin:10px 0;"></div>
                        <div style="font-size:13px; color:#d35400;"><b>🛠️ Hình thức xử lý:</b> <span style="font-size:14px; font-weight:bold;">${xlObj.hinh_thuc}</span></div>
                        <div style="font-size:13px; color:#d35400; margin-top:5px;"><b>📝 Nội dung yêu cầu:</b> <i>${xlObj.noi_dung}</i></div>
                    </div>

                    <div style="margin-bottom:20px;">
                        <label style="font-weight:bold; font-size:14px; color:#495057; display:block; margin-bottom:10px;">Thay đổi trạng thái tiến độ:</label>
                        <div style="display:flex; gap:10px;">
                            <label style="flex:1; cursor:pointer; background:#fff; border:2px solid ${isNotDone ? '#dc3545' : '#ced4da'}; border-radius:6px; padding:10px 5px; display:flex; flex-direction:column; align-items:center; gap:5px; transition:0.2s;" onclick="document.getElementById('nhan-vien-box').style.borderColor='#dc3545'; document.getElementById('mot-phan-box').style.borderColor='#ced4da'; document.getElementById('da-xong-box').style.borderColor='#ced4da';" id="nhan-vien-box">
                                <input type="radio" name="trang_thai_phat" value="Chưa hoàn thành" ${isNotDone ? 'checked' : ''} style="width:16px; height:16px; accent-color:#dc3545;">
                                <span style="font-weight:bold; color:#dc3545; font-size:12px;">⏳ Chưa xong</span>
                            </label>
                            <label style="flex:1; cursor:pointer; background:#fff; border:2px solid ${isPartial ? '#007bff' : '#ced4da'}; border-radius:6px; padding:10px 5px; display:flex; flex-direction:column; align-items:center; gap:5px; transition:0.2s;" onclick="document.getElementById('nhan-vien-box').style.borderColor='#ced4da'; document.getElementById('mot-phan-box').style.borderColor='#007bff'; document.getElementById('da-xong-box').style.borderColor='#ced4da';" id="mot-phan-box">
                                <input type="radio" name="trang_thai_phat" value="Đã nộp 1 phần" ${isPartial ? 'checked' : ''} style="width:16px; height:16px; accent-color:#007bff;">
                                <span style="font-weight:bold; color:#007bff; font-size:12px;">🔄 Nộp 1 phần</span>
                            </label>
                            <label style="flex:1; cursor:pointer; background:#fff; border:2px solid ${isDone ? '#28a745' : '#ced4da'}; border-radius:6px; padding:10px 5px; display:flex; flex-direction:column; align-items:center; gap:5px; transition:0.2s;" onclick="document.getElementById('nhan-vien-box').style.borderColor='#ced4da'; document.getElementById('mot-phan-box').style.borderColor='#ced4da'; document.getElementById('da-xong-box').style.borderColor='#28a745';" id="da-xong-box">
                                <input type="radio" name="trang_thai_phat" value="Đã hoàn thành" ${isDone ? 'checked' : ''} style="width:16px; height:16px; accent-color:#28a745;">
                                <span style="font-weight:bold; color:#28a745; font-size:12px;">✅ Xong toàn bộ</span>
                            </label>
                        </div>
                    </div>

                    <div style="margin-bottom:10px;">
                        <label style="font-weight:bold; font-size:13px; color:#495057; display:block; margin-bottom:8px;">📸 Bổ sung ảnh minh chứng (Vở chép phạt, Bảng tường trình...):</label>
                        <div style="display:flex; gap:15px; align-items:flex-start;">
                            <button type="button" onclick="document.getElementById('input-anh-phat-gvcn').click()" style="padding:10px 15px; background:#e0f7fa; color:#00838f; border:1px dashed #00acc1; border-radius:6px; cursor:pointer; font-weight:bold; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:5px; transition:0.2s; flex-shrink:0;">
                                <span style="font-size:20px;">📷</span><span style="font-size:11px;">Chụp ảnh nộp</span>
                            </button>
                            <input type="file" id="input-anh-phat-gvcn" accept="image/*" multiple style="display:none;" onchange="window.ham_21_52_chon_anh_phat_gvcn(this)">
                            <div id="vung-preview-anh-phat-gvcn" style="flex:1; min-height:65px; border:1px dashed #ccc; border-radius:6px; display:flex; align-items:center; justify-content:flex-start; background:#fafafa; padding:8px; gap:8px; overflow-x:auto;">
                                <span style="color:#adb5bd; font-size:11px; font-style:italic;">(Ảnh chụp mới bổ sung sẽ hiện tại đây)</span>
                            </div>
                        </div>
                        ${htmlAnhDaCo}
                    </div>
                </div>
                
                <div style="padding:15px 20px; background:#fff; border-top:1px solid #dee2e6; display:flex; justify-content:flex-end; gap:10px;">
                    <button onclick="document.body.removeChild(this.closest('#${modalId}'))" style="padding:10px 20px; background:#6c757d; color:white; border:none; border-radius:6px; cursor:pointer; font-weight:bold; font-size:14px;">Hủy</button>
                    <button onclick="window.ham_21_53_luu_trang_thai_xu_ly('${idSuKien}', this)" style="padding:10px 30px; background:#e83e8c; color:white; border:none; border-radius:6px; cursor:pointer; font-weight:bold; font-size:14px; box-shadow:0 2px 4px rgba(0,0,0,0.2);">💾 Cập Nhật Tiến Độ</button>
                </div>
            </div>
        `;
    } catch (e) {
        modal.innerHTML = `<div style="background:#fff; padding:20px; border-radius:8px; font-weight:bold; color:red; text-align:center;">❌ Lỗi: ${e.message}<br><button onclick="document.body.removeChild(this.closest('div[style*=\\'position:fixed\\']'))" style="margin-top:15px; padding:5px 15px; cursor:pointer;">Đóng</button></div>`;
    }
};

window.ham_21_52_chon_anh_phat_gvcn = async function (inputElem) {
    if (inputElem.files && inputElem.files.length > 0) {
        let btnNut = inputElem.previousElementSibling;
        let oldHtml = btnNut.innerHTML;
        btnNut.innerHTML = '<span style="font-size:20px;">⏳</span><span style="font-size:11px;">Đang nén...</span>';

        // 🌟 Bơm mượn hàm nén của Khối 20 (vì xài chung logic nén)
        let processedFiles = [];
        for (let f of Array.from(inputElem.files)) {
            let compressed = window.ham_20_24_nen_anh_canvas ? await window.ham_20_24_nen_anh_canvas(f, 0.8, 1280) : f;
            if (compressed) processedFiles.push(compressed);
        }

        if (!window.danhSachAnhPhatGVCN) window.danhSachAnhPhatGVCN = [];
        window.danhSachAnhPhatGVCN.push(...processedFiles);

        const vungPreview = document.getElementById('vung-preview-anh-phat-gvcn');
        if (vungPreview) {
            vungPreview.style.flexDirection = 'column'; vungPreview.style.alignItems = 'flex-start';
            let html = '<div style="display:flex; flex-wrap:wrap; gap:8px;">';
            window.danhSachAnhPhatGVCN.forEach((f, idx) => {
                let url = URL.createObjectURL(f);
                html += `<div style="position:relative; width:60px; display:flex; flex-direction:column; align-items:center; animation: fadeIn 0.2s;"><img src="${url}" style="width:60px; height:60px; object-fit:cover; border-radius:4px; border:1px solid #17a2b8; box-shadow: 0 1px 3px rgba(0,0,0,0.1);"><button type="button" onclick="window.danhSachAnhPhatGVCN.splice(${idx}, 1); this.parentElement.remove();" style="position:absolute; top:-6px; right:-6px; background:#dc3545; color:white; border:none; border-radius:50%; width:18px; height:18px; font-size:10px; cursor:pointer; font-weight:bold; box-shadow:0 1px 2px rgba(0,0,0,0.3);">✖</button></div>`;
            });
            html += '</div>'; vungPreview.innerHTML = html;
        }
        btnNut.innerHTML = oldHtml; inputElem.value = '';
    }
};

// window.ham_21_53_luu_trang_thai_xu_ly = async function (idSuKien, btnLuu) {
//     let trangThaiMoi = document.querySelector('input[name="trang_thai_phat"]:checked').value;
//     const oldText = btnLuu.innerHTML; btnLuu.innerHTML = "⏳ Đang tải ảnh..."; btnLuu.disabled = true;

//     try {
//         const { data: skData, error: errGet } = await _supabase.from('nhat_ky_gvcn_su_kien_hs').select('*').eq('id', idSuKien).single();
//         if (errGet) throw errGet;

//         let ttMoRong = skData.thong_tin_mo_rong || {};
//         let xlObj = ttMoRong.xu_ly;
//         if (!xlObj) throw new Error("Mất dữ liệu yêu cầu xử lý");

//         let mangLinkMoi = [];
//         if (window.danhSachAnhPhatGVCN && window.danhSachAnhPhatGVCN.length > 0) {
//             const ngayThucTe = new Date().toISOString().split('T')[0];
//             const d = new Date(); const timeStr = `${d.getHours()}h${d.getMinutes()}m`;

//             for (let k = 0; k < window.danhSachAnhPhatGVCN.length; k++) {
//                 let f = window.danhSachAnhPhatGVCN[k];
//                 // 🌟 Bơm mượn logic Base64 của Khối 20
//                 let b64 = window.ham_ho_tro_doc_anh_base64 ? await window.ham_ho_tro_doc_anh_base64(f) : '';
//                 let duoiFile = f.name.includes('.') ? f.name.substring(f.name.lastIndexOf('.')) : '.jpg';
//                 let tenFile = `NopPhat_[${ngayThucTe}_${timeStr}]_HS[${skData.ten_hoc_sinh.replace(/\s/g, "")}]_Anh[${k + 1}]${duoiFile}`;

//                 let payload = { action: "upload_anh_nhat_ky_gvcn", base64: b64, mimeType: f.type, fileName: tenFile, maLop: "CHUNG", loaiAnh: "NOP_PHAT" };
//                 let res = window.ham_ho_tro_upload_anh_co_tien_trinh ? await window.ham_ho_tro_upload_anh_co_tien_trinh(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, payload, (p) => { btnLuu.innerHTML = `🚀 Đang tải ảnh (${p}%)`; }) : { status: 'error' };

//                 if (res.status === 'success') mangLinkMoi.push(res.url);
//             }
//         }

//         btnLuu.innerHTML = "⏳ Đang lưu CSDL...";
//         xlObj.trang_thai = trangThaiMoi;
//         if (trangThaiMoi === 'Đã hoàn thành') xlObj.ngay_hoan_thanh = new Date().toISOString().split('T')[0];
//         let mangAnhCu = xlObj.anh_minh_chung || [];
//         xlObj.anh_minh_chung = mangAnhCu.concat(mangLinkMoi);
//         ttMoRong.xu_ly = xlObj;

//         const { error: errUp } = await _supabase.from('nhat_ky_gvcn_su_kien_hs').update({ thong_tin_mo_rong: ttMoRong }).eq('id', idSuKien);
//         if (errUp) throw errUp;

//         alert("✅ Cập nhật tiến độ khắc phục thành công!");
//         let modal = document.getElementById('modal-xu-ly-gvcn-' + idSuKien);
//         if (modal) document.body.removeChild(modal);

//         const btnLoc = document.querySelector('button[onclick*="ham_21_47_thuc_hien_tim_kiem_thong_ke"]');
//         if (btnLoc) btnLoc.click();
//     } catch (e) {
//         console.error("Lỗi:", e); alert("❌ Lỗi: " + e.message);
//     } finally {
//         btnLuu.innerHTML = oldText; btnLuu.disabled = false;
//     }
// };




// =====================================================================
// HÀM 21.53: LƯU TRẠNG THÁI NỘP PHẠT CỦA GVCN (TỰ ĐỘNG TẢI LẠI BẢNG)
// =====================================================================
window.ham_21_53_luu_trang_thai_xu_ly = async function (idSuKien, btnLuu) {
    let trangThaiMoi = document.querySelector('input[name="trang_thai_phat"]:checked').value;
    const oldText = btnLuu.innerHTML; btnLuu.innerHTML = "⏳ Đang tải ảnh..."; btnLuu.disabled = true;

    try {
        const { data: skData, error: errGet } = await _supabase.from('nhat_ky_gvcn_su_kien_hs').select('*').eq('id', idSuKien).single();
        if (errGet) throw errGet;

        let ttMoRong = skData.thong_tin_mo_rong || {};
        let xlObj = ttMoRong.xu_ly;
        if (!xlObj) throw new Error("Mất dữ liệu yêu cầu xử lý");

        let mangLinkMoi = [];
        if (window.danhSachAnhPhatGVCN && window.danhSachAnhPhatGVCN.length > 0) {
            const ngayThucTe = new Date().toISOString().split('T')[0];
            const d = new Date(); const timeStr = `${d.getHours()}h${d.getMinutes()}m`;

            for (let k = 0; k < window.danhSachAnhPhatGVCN.length; k++) {
                let f = window.danhSachAnhPhatGVCN[k];
                let b64 = window.ham_ho_tro_doc_anh_base64 ? await window.ham_ho_tro_doc_anh_base64(f) : '';
                let duoiFile = f.name.includes('.') ? f.name.substring(f.name.lastIndexOf('.')) : '.jpg';
                let tenFile = `NopPhat_[${ngayThucTe}_${timeStr}]_HS[${skData.ten_hoc_sinh.replace(/\s/g, "")}]_Anh[${k + 1}]${duoiFile}`;

                let payload = { action: "upload_anh_nhat_ky_gvcn", base64: b64, mimeType: f.type, fileName: tenFile, maLop: "CHUNG", loaiAnh: "NOP_PHAT" };
                let res = window.ham_ho_tro_upload_anh_co_tien_trinh ? await window.ham_ho_tro_upload_anh_co_tien_trinh(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, payload, (p) => { btnLuu.innerHTML = `🚀 Đang tải ảnh (${p}%)`; }) : { status: 'error' };

                if (res.status === 'success') mangLinkMoi.push(res.url);
            }
        }

        btnLuu.innerHTML = "⏳ Đang lưu CSDL...";
        xlObj.trang_thai = trangThaiMoi;
        if (trangThaiMoi === 'Đã hoàn thành') xlObj.ngay_hoan_thanh = new Date().toISOString().split('T')[0];
        let mangAnhCu = xlObj.anh_minh_chung || [];
        xlObj.anh_minh_chung = mangAnhCu.concat(mangLinkMoi);
        ttMoRong.xu_ly = xlObj;

        const { error: errUp } = await _supabase.from('nhat_ky_gvcn_su_kien_hs').update({ thong_tin_mo_rong: ttMoRong }).eq('id', idSuKien);
        if (errUp) throw errUp;

        alert("✅ Cập nhật tiến độ khắc phục thành công!");
        let modal = document.getElementById('modal-xu-ly-gvcn-' + idSuKien);
        if (modal) document.body.removeChild(modal);

        // 🌟 TỰ ĐỘNG TẢI LẠI BẢNG: Nếu đang mở Bảng Mục 5 hoặc Bảng Tìm Kiếm
        if (typeof window.ham_21_30_cap_nhat_ngay_tuan_su_kien === 'function') {
            window.ham_21_30_cap_nhat_ngay_tuan_su_kien();
        }
        const btnLoc = document.querySelector('button[onclick*="ham_21_47_thuc_hien_tim_kiem_thong_ke"]');
        if (btnLoc) btnLoc.click();

    } catch (e) {
        console.error("Lỗi:", e); alert("❌ Lỗi: " + e.message);
    } finally {
        btnLuu.innerHTML = oldText; btnLuu.disabled = false;
    }
};





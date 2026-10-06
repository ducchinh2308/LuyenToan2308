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
    // KÍCH HOẠT CSS TRÀN VIỀN CHO ĐIỆN THOẠI
    //if (typeof window.ham_21_0_toi_uu_giao_dien_mobile === 'function') window.ham_21_0_toi_uu_giao_dien_mobile();

    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
    if (!vungLamViec) return;


    // const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
    // if (!vungLamViec) return;

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




// =====================================================================
// HÀM 21.4: TẠO KHỐI HỌC SINH (GẮN CỨNG MIN-WIDTH BẢO VỆ GIAO DIỆN)
// =====================================================================
window.ham_21_4_them_dong_su_kien = function (skDataArr = null) {
    const khuVuc = document.getElementById('gvcn-khu-vuc-su-kien-nhanh');
    if (!khuVuc) return;

    if (!Array.isArray(skDataArr)) skDataArr = [null];

    let blockId = 'blk_' + Date.now() + Math.floor(Math.random() * 1000);
    let firstSk = skDataArr[0];

    let hsGhep = ''; let hsAvatar = '';
    let tienDoObj = { trang_thai: 'Chưa hoàn thành', anh_minh_chung: [] };

    if (firstSk) {
        hsGhep = firstSk.ten_hoc_sinh + (firstSk.ten_dang_nhap_hoc_sinh ? ` - ${firstSk.ten_dang_nhap_hoc_sinh}` : '');
        if (window.DanhSachHocSinhLopHienTai) {
            let hsObj = window.DanhSachHocSinhLopHienTai.find(h => h.uid === firstSk.uid_hoc_sinh);
            if (hsObj) hsAvatar = hsObj.avatarUrl;
        }
        for (let sk of skDataArr) {
            if (sk && sk.thong_tin_mo_rong && sk.thong_tin_mo_rong.xu_ly) {
                tienDoObj.trang_thai = sk.thong_tin_mo_rong.xu_ly.trang_thai || 'Chưa hoàn thành';
                tienDoObj.anh_minh_chung = sk.thong_tin_mo_rong.xu_ly.anh_minh_chung || [];
                if (sk.thong_tin_mo_rong.xu_ly.ngay_hoan_thanh) tienDoObj.ngay_hoan_thanh = sk.thong_tin_mo_rong.xu_ly.ngay_hoan_thanh;
                break;
            }
        }
    }

    let htmlSubRows = '';
    skDataArr.forEach(sk => {
        htmlSubRows += window.ham_21_tao_html_sub_loi(sk);
    });

    let htmlTienDo = window.ham_21_tao_html_tien_do_chung(tienDoObj, blockId, skDataArr.length);
    let tienDoStr = JSON.stringify(tienDoObj).replace(/'/g, "&#39;");

    let div = document.createElement('div');
    div.className = 'khoi-su-kien-hs';
    div.dataset.blockId = blockId;
    div.dataset.tienDo = tienDoStr;

    // 🌟 Gắn min-width: 950px để khung không bao giờ bị bóp nhỏ trên mobile
    div.style.cssText = `display: flex; gap: 5px; background: #fff; padding: 6px; border-radius: 6px; border: 1px solid #ced4da; margin-bottom: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.02); transition: 0.2s; min-width: 950px;`;

    div.innerHTML = `
        <div style="width: 170px; display:flex; flex-direction:column; gap:6px;">
            <div style="display:flex; align-items:flex-start; gap:4px; border:1px solid #e83e8c; border-radius:4px; padding:4px; background:#fdf5f8;">
                <img class="avatar-preview" src="${hsAvatar}" style="width:20px; height:20px; border-radius:50%; object-fit:cover; display:${hsAvatar ? 'block' : 'none'}; margin-top:2px;">
                <textarea class="sk-hs" placeholder="👤 Gõ tên HS..." style="width:100%; border:none; background:transparent; font-size:12px; font-weight:bold; color:#e83e8c; resize:none; overflow:hidden;" rows="1" oninput="this.style.height='20px'; this.style.height=this.scrollHeight+'px';">${hsGhep}</textarea>
            </div>
            <button type="button" onclick="window.ham_21_them_sub_loi_vao_khoi('${blockId}')" style="font-size:10px; padding:4px; background:#f8f9fa; border:1px dashed #6c757d; border-radius:4px; cursor:pointer; font-weight:bold; color:#495057; transition:0.2s;" onmouseover="this.style.background='#e9ecef'" onmouseout="this.style.background='#f8f9fa'">➕ Thêm lỗi cho HS này</button>
        </div>
        
        <div class="vung-danh-sach-loi" style="flex: 1; display:flex; flex-direction:column; gap:4px; border-left:1px dashed #eee; border-right:1px dashed #eee; padding:0 4px;">
            ${htmlSubRows}
        </div>

        <div class="vung-tien-do-chung" style="width: 110px; display:flex; flex-direction:column; justify-content:center; align-items:center; background:#f8f9fa; border-radius:4px; padding:4px; border:1px dashed #0056b3;">
            ${htmlTienDo}
        </div>

        <div style="width: 35px; display:flex; justify-content:center; align-items:center;">
            <button type="button" onclick="this.closest('.khoi-su-kien-hs').remove()" style="height:28px; width:28px; background:#f8d7da; color:#dc3545; border:none; border-radius:4px; cursor:pointer; font-size:12px;">✖</button>
        </div>
    `;

    khuVuc.appendChild(div);

    setTimeout(() => {
        div.querySelectorAll('textarea').forEach(ta => {
            if (ta.value) { ta.style.height = '20px'; ta.style.height = ta.scrollHeight + 'px'; }
        });
        if (!skDataArr[0]) {
            let firstSub = div.querySelector('.sub-dong-loi');
            if (firstSub) window.ham_21_41_danh_dau_dong(firstSub);
        }
    }, 50);

    if (typeof window.ham_21_8_kich_hoat_xu_ly_anh === 'function') window.ham_21_8_kich_hoat_xu_ly_anh();
};






// // Helper: Sinh HTML cho 1 dòng lỗi lẻ
// window.ham_21_tao_html_sub_loi = function (skData = null) {
//     let idRow = skData ? skData.id : '';
//     let tuNgayInput = document.getElementById('gvcn-sk-tuan-tu');
//     let ngay = skData ? skData.ngay_ghi_nhan : (tuNgayInput ? tuNgayInput.value : new Date().toISOString().split('T')[0]);
//     let buoi = 'Sáng'; let loi = skData ? skData.nhom_su_kien : ''; let diem = 0; let ghiChu = '';
//     let mangAnhArr = [];

//     if (skData) {
//         let m = skData.noi_dung_chi_tiet.match(/Buổi (Sáng|Trưa|Chiều|Tối)/);
//         if (m) buoi = m[1];
//         if (skData.thong_tin_mo_rong) {
//             diem = skData.thong_tin_mo_rong.diem_tru || 0;
//             let dsAnh = skData.thong_tin_mo_rong.danh_sach_anh_minh_chung || [];
//             dsAnh.forEach(link => { mangAnhArr.push({ b64: link, type: 'url', size: 0 }); });
//         }
//         let idxGC = skData.noi_dung_chi_tiet.indexOf('- Ghi chú: ');
//         if (idxGC > -1) {
//             let part = skData.noi_dung_chi_tiet.substring(idxGC + 11);
//             let idxDiem = part.indexOf(' - Điểm:');
//             if (idxDiem > -1) part = part.substring(0, idxDiem);
//             ghiChu = part.trim();
//         }
//     }

//     let htmlAnh = '';
//     mangAnhArr.forEach((imgObj, idx) => {
//         let srcImg = imgObj.b64;
//         if (imgObj.type === 'url') {
//             let m = srcImg.match(/\/d\/([a-zA-Z0-9_-]+)/);
//             if (m) srcImg = `https://drive.google.com/thumbnail?id=${m[1]}&sz=w150`;
//         }
//         htmlAnh += `
//         <div style="position:relative; margin-bottom: 2px;">
//             <img src="${srcImg}" onclick="window.open('${imgObj.b64}', '_blank')" style="width:40px; height:40px; object-fit:cover; border-radius:4px; border:1px solid #ccc; cursor:pointer;" title="Bấm xem">
//             <button type="button" onclick="event.stopPropagation(); let d=this.closest('.sub-dong-loi'); let a=JSON.parse(d.dataset.mangAnh); a.splice(${idx},1); d.dataset.mangAnh=JSON.stringify(a); this.closest('div').remove();" style="position:absolute; top:-4px; right:-4px; background:#dc3545; color:#fff; border:none; border-radius:50%; width:16px; height:16px; font-size:10px; cursor:pointer; display:flex; align-items:center; justify-content:center;">✖</button>
//         </div>`;
//     });

//     const cssInput = "width: 100%; height: 26px; padding: 0 4px; margin: 0; border: 1px solid #ccc; border-radius: 4px; font-size: 11px; outline: none; box-sizing: border-box;";
//     const cssTA = "width: 100%; min-height: 26px; height: 26px; padding: 6px 4px; margin: 0; border: 1px solid #ccc; border-radius: 4px; font-size: 11px; outline: none; box-sizing: border-box; resize: none; overflow-y: auto; max-height: 80px; line-height: 1.4; font-family: inherit;";
//     const autoResizeJS = "this.style.height='26px'; this.style.height=this.scrollHeight+'px';";

//     let mangAnhStr = mangAnhArr.length > 0 ? JSON.stringify(mangAnhArr).replace(/'/g, "&#39;") : '[]';

//     return `
//     <div class="sub-dong-loi" data-id="${idRow}" data-mang-anh='${mangAnhStr}' style="display:flex; gap:4px; align-items:flex-start; padding: 4px; border-bottom:1px dashed #f1f3f4; cursor:pointer; transition:0.2s;" onclick="window.ham_21_41_danh_dau_dong(this)">
//         <div style="width: 100px; display:flex; flex-direction:column; gap:2px;">
//             <input type="date" class="sk-ngay" value="${ngay}" style="${cssInput} font-weight:bold;">
//             <select class="sk-buoi" style="${cssInput} cursor:pointer;">
//                 <option value="Sáng" ${buoi === 'Sáng' ? 'selected' : ''}>Sáng</option>
//                 <option value="Trưa" ${buoi === 'Trưa' ? 'selected' : ''}>Trưa</option>
//                 <option value="Chiều" ${buoi === 'Chiều' ? 'selected' : ''}>Chiều</option>
//                 <option value="Tối" ${buoi === 'Tối' ? 'selected' : ''}>Tối</option>
//             </select>
//         </div>
//         <div style="flex: 1; min-width: 120px;">
//             <textarea class="sk-loi" placeholder="🚨 Chọn lỗi / Gõ..." onchange="window.ham_21_40_tu_dong_dien_diem(this)" oninput="${autoResizeJS} window.ham_21_40_tu_dong_dien_diem(this)" style="${cssTA} border: 1px dashed #e83e8c; color: #e83e8c; font-weight:bold;">${loi}</textarea>
//         </div>
//         <div style="width: 50px;">
//             <input type="number" step="0.5" class="sk-diem-tru" value="${diem}" style="${cssInput} border: 1px solid #ffeeba; background: #fff3cd; font-weight: bold; color: #dc3545; text-align: center;">
//         </div>
//         <div style="width: 60px; display:flex; flex-direction:column; align-items:center;">
//             <button type="button" class="btn-anh-sk-dong" onclick="event.stopPropagation(); this.nextElementSibling.click()" style="width:100%; height: 26px; background: #e0f7fa; color: #00838f; border: 1px dashed #00acc1; border-radius: 4px; cursor: pointer; font-size: 11px; margin-bottom:2px;">📷 Thêm</button>
//             <input type="file" accept="image/*" class="input-anh-sk-dong" style="display:none;" onchange="if(typeof window.ham_21_33_chon_anh_sk_dong === 'function') window.ham_21_33_chon_anh_sk_dong(this)">
//             <div class="vung-preview-anh-sk-dong" style="display:flex; flex-wrap:wrap; gap:2px; justify-content:center;">${htmlAnh}</div>
//         </div>
//         <div style="width: 100px;">
//             <textarea class="sk-ghichu" placeholder="Ghi chú..." style="${cssTA}" oninput="${autoResizeJS}">${ghiChu}</textarea>
//         </div>
//         <div style="width: 25px; display:flex; justify-content:center; padding-top:2px;">
//             <button type="button" onclick="event.stopPropagation(); this.closest('.sub-dong-loi').remove()" style="height:22px; width:22px; background:#f8d7da; color:#dc3545; border:none; border-radius:4px; cursor:pointer; display:flex; align-items:center; justify-content:center;" title="Xóa lỗi này">✖</button>
//         </div>
//     </div>
//     `;
// };

// Helper: Sinh HTML cho 1 dòng lỗi lẻ (Có thêm cột Khắc Phục)
window.ham_21_tao_html_sub_loi = function (skData = null) {
    let idRow = skData ? skData.id : '';
    let tuNgayInput = document.getElementById('gvcn-sk-tuan-tu');
    let ngay = skData ? skData.ngay_ghi_nhan : (tuNgayInput ? tuNgayInput.value : new Date().toISOString().split('T')[0]);
    let buoi = 'Sáng'; let loi = skData ? skData.nhom_su_kien : ''; let diem = 0; let ghiChu = '';
    let mangAnhArr = [];
    let khacPhucVal = '';

    if (skData) {
        let m = skData.noi_dung_chi_tiet.match(/Buổi (Sáng|Trưa|Chiều|Tối)/);
        if (m) buoi = m[1];
        if (skData.thong_tin_mo_rong) {
            diem = skData.thong_tin_mo_rong.diem_tru || 0;
            let dsAnh = skData.thong_tin_mo_rong.danh_sach_anh_minh_chung || [];
            dsAnh.forEach(link => { mangAnhArr.push({ b64: link, type: 'url', size: 0 }); });

            // 🌟 TRÍCH XUẤT CỘT KHẮC PHỤC
            let xl = skData.thong_tin_mo_rong.xu_ly;
            if (xl) {
                khacPhucVal = xl.noi_dung || '';
                if (xl.hinh_thuc && xl.hinh_thuc !== '') {
                    khacPhucVal = xl.hinh_thuc + (khacPhucVal ? ' - ' + khacPhucVal : '');
                }
            }
        }
        let idxGC = skData.noi_dung_chi_tiet.indexOf('- Ghi chú: ');
        if (idxGC > -1) {
            let part = skData.noi_dung_chi_tiet.substring(idxGC + 11);
            let idxDiem = part.indexOf(' - Điểm:');
            if (idxDiem > -1) part = part.substring(0, idxDiem);
            ghiChu = part.trim();
        }
    }

    let htmlAnh = '';
    mangAnhArr.forEach((imgObj, idx) => {
        let srcImg = imgObj.b64;
        if (imgObj.type === 'url') {
            let m = srcImg.match(/\/d\/([a-zA-Z0-9_-]+)/);
            if (m) srcImg = `https://drive.google.com/thumbnail?id=${m[1]}&sz=w150`;
        }
        htmlAnh += `
        <div style="position:relative; margin-bottom: 2px;">
            <img src="${srcImg}" onclick="window.open('${imgObj.b64}', '_blank')" style="width:40px; height:40px; object-fit:cover; border-radius:4px; border:1px solid #ccc; cursor:pointer;" title="Bấm xem">
            <button type="button" onclick="event.stopPropagation(); let d=this.closest('.sub-dong-loi'); let a=JSON.parse(d.dataset.mangAnh); a.splice(${idx},1); d.dataset.mangAnh=JSON.stringify(a); this.closest('div').remove();" style="position:absolute; top:-4px; right:-4px; background:#dc3545; color:#fff; border:none; border-radius:50%; width:16px; height:16px; font-size:10px; cursor:pointer; display:flex; align-items:center; justify-content:center;">✖</button>
        </div>`;
    });

    const cssInput = "width: 100%; height: 26px; padding: 0 4px; margin: 0; border: 1px solid #ccc; border-radius: 4px; font-size: 11px; outline: none; box-sizing: border-box;";
    const cssTA = "width: 100%; min-height: 26px; height: 26px; padding: 6px 4px; margin: 0; border: 1px solid #ccc; border-radius: 4px; font-size: 11px; outline: none; box-sizing: border-box; resize: none; overflow-y: auto; max-height: 80px; line-height: 1.4; font-family: inherit;";
    const autoResizeJS = "this.style.height='26px'; this.style.height=this.scrollHeight+'px';";

    let mangAnhStr = mangAnhArr.length > 0 ? JSON.stringify(mangAnhArr).replace(/'/g, "&#39;") : '[]';

    return `
    <div class="sub-dong-loi" data-id="${idRow}" data-mang-anh='${mangAnhStr}' style="display:flex; gap:4px; align-items:flex-start; padding: 4px; border-bottom:1px dashed #f1f3f4; cursor:pointer; transition:0.2s;" onclick="window.ham_21_41_danh_dau_dong(this)">
        <div style="width: 90px; display:flex; flex-direction:column; gap:2px;">
            <input type="date" class="sk-ngay" value="${ngay}" style="${cssInput} font-weight:bold;">
            <select class="sk-buoi" style="${cssInput} cursor:pointer;">
                <option value="Sáng" ${buoi === 'Sáng' ? 'selected' : ''}>Sáng</option>
                <option value="Trưa" ${buoi === 'Trưa' ? 'selected' : ''}>Trưa</option>
                <option value="Chiều" ${buoi === 'Chiều' ? 'selected' : ''}>Chiều</option>
                <option value="Tối" ${buoi === 'Tối' ? 'selected' : ''}>Tối</option>
            </select>
        </div>
        <div style="flex: 1.2; min-width: 120px;">
            <textarea class="sk-loi" placeholder="🚨 Chọn lỗi / Gõ..." onchange="window.ham_21_40_tu_dong_dien_diem(this)" oninput="${autoResizeJS} window.ham_21_40_tu_dong_dien_diem(this)" style="${cssTA} border: 1px dashed #e83e8c; color: #e83e8c; font-weight:bold;">${loi}</textarea>
        </div>
        <div style="width: 40px;">
            <input type="number" step="0.5" class="sk-diem-tru" value="${diem}" style="${cssInput} border: 1px solid #ffeeba; background: #fff3cd; font-weight: bold; color: #dc3545; text-align: center;">
        </div>
        <div style="width: 55px; display:flex; flex-direction:column; align-items:center;">
            <button type="button" class="btn-anh-sk-dong" onclick="event.stopPropagation(); this.nextElementSibling.click()" style="width:100%; height: 26px; background: #e0f7fa; color: #00838f; border: 1px dashed #00acc1; border-radius: 4px; cursor: pointer; font-size: 11px; margin-bottom:2px;">📷 Ảnh</button>
            <input type="file" accept="image/*" class="input-anh-sk-dong" style="display:none;" onchange="if(typeof window.ham_21_33_chon_anh_sk_dong === 'function') window.ham_21_33_chon_anh_sk_dong(this)">
            <div class="vung-preview-anh-sk-dong" style="display:flex; flex-wrap:wrap; gap:2px; justify-content:center;">${htmlAnh}</div>
        </div>
        
        <!-- 🌟 CỘT YÊU CẦU PHẠT CHO TỪNG LỖI -->
        <div style="flex: 1.2; min-width: 120px;">
            <textarea class="sk-khac-phuc" placeholder="✍️ Gõ phạt hoặc dùng nút B4..." style="${cssTA} border: 1px dashed #d35400; color: #d35400; font-weight:bold;" oninput="${autoResizeJS}">${khacPhucVal}</textarea>
        </div>

        <div style="width: 80px;">
            <textarea class="sk-ghichu" placeholder="Ghi chú..." style="${cssTA}" oninput="${autoResizeJS}">${ghiChu}</textarea>
        </div>
        <div style="width: 25px; display:flex; justify-content:center; padding-top:2px;">
            <button type="button" onclick="event.stopPropagation(); this.closest('.sub-dong-loi').remove()" style="height:22px; width:22px; background:#f8d7da; color:#dc3545; border:none; border-radius:4px; cursor:pointer; display:flex; align-items:center; justify-content:center;" title="Xóa lỗi này">✖</button>
        </div>
    </div>
    `;
};

// Helper: Tiến độ chung của khối
window.ham_21_tao_html_tien_do_chung = function (tienDoObj, blockId, numRows = 1) {
    let isDone = tienDoObj.trang_thai === 'Đã hoàn thành';
    let isPartial = tienDoObj.trang_thai === 'Đã nộp 1 phần';
    let bgXl = isDone ? '#d4edda' : (isPartial ? '#cce5ff' : '#fff3cd');
    let colXl = isDone ? '#155724' : (isPartial ? '#004085' : '#856404');
    let icnXl = isDone ? '✅' : (isPartial ? '🔄' : '⏳');
    let textXl = isDone ? 'Đã xong' : (isPartial ? '1 phần' : 'Chưa xong');
    let bdrXl = isDone ? '#c3e6cb' : (isPartial ? '#b8daff' : '#ffeeba');

    let html = `
        <div style="font-size:10px; color:#0056b3; font-weight:bold; margin-bottom:4px; text-align:center;">(Áp dụng chung)</div>
        <div onclick="window.ham_21_51_mo_popup_cap_nhat_xu_ly('${blockId}')" style="background:${bgXl}; color:${colXl}; padding:4px 8px; border-radius:4px; font-size:10px; font-weight:bold; cursor:pointer; border:1px solid ${bdrXl}; text-align:center; width:80%; margin:0 auto; box-shadow:0 1px 2px rgba(0,0,0,0.05); transition:0.2s;" onmouseover="this.style.filter='brightness(0.95)'" onmouseout="this.style.filter='brightness(1)'" title="Bấm cập nhật ảnh và tiến độ">${icnXl} ${textXl}</div>`;

    if (tienDoObj.anh_minh_chung && tienDoObj.anh_minh_chung.length > 0) {
        html += `<div style="display:flex; gap:2px; flex-wrap:wrap; justify-content:center; margin-top:6px;">`;
        tienDoObj.anh_minh_chung.forEach(link => {
            let fileId = null;
            if (link.includes('/d/')) { let m = link.match(/\/d\/([a-zA-Z0-9_-]+)/); if (m) fileId = m[1]; }
            else if (link.includes('id=')) { let m = link.match(/id=([a-zA-Z0-9_-]+)/); if (m) fileId = m[1]; }
            let srcTN = fileId ? `https://drive.google.com/thumbnail?id=${fileId}&sz=w50` : link;
            html += `<img src="${srcTN}" onclick="event.stopPropagation(); window.open('${link}', '_blank')" style="width:28px; height:28px; object-fit:cover; border-radius:4px; border:1px solid #ccc; cursor:pointer; box-shadow:0 1px 2px rgba(0,0,0,0.2);" title="Xem ảnh nộp phạt chung">`;
        });
        html += `</div>`;
    }
    return html;
};


// Helper: Thêm sub-lỗi vào khối hiện tại
window.ham_21_them_sub_loi_vao_khoi = function (blockId) {
    let block = document.querySelector(`.khoi-su-kien-hs[data-block-id="${blockId}"]`);
    if (!block) return;
    let vungDS = block.querySelector('.vung-danh-sach-loi');

    let subCuoi = vungDS.lastElementChild;
    let dataMau = null;
    if (subCuoi) {
        dataMau = {
            id: '', ngay_ghi_nhan: subCuoi.querySelector('.sk-ngay').value,
            noi_dung_chi_tiet: `Buổi ${subCuoi.querySelector('.sk-buoi').value}`,
            nhom_su_kien: ''
        };
    }

    let divTemplate = document.createElement('div');
    divTemplate.innerHTML = window.ham_21_tao_html_sub_loi(dataMau);
    let newSub = divTemplate.firstElementChild;
    vungDS.appendChild(newSub);
    window.ham_21_41_danh_dau_dong(newSub);
};

// // Helper: Sinh HTML cho cột Tiến độ chung của Khối
// window.ham_21_tao_html_tien_do_chung = function (xuLyObj, blockId) {
//     if (!xuLyObj || (!xuLyObj.hinh_thuc && !xuLyObj.noi_dung)) {
//         return `
//             <span style="color:#adb5bd; font-size:10px; font-style:italic; margin-bottom:6px;">(Chưa có yêu cầu)</span>
//             <button onclick="window.ham_21_51_mo_popup_cap_nhat_xu_ly('${blockId}')" style="padding:4px 8px; background:#f8f9fa; border:1px dashed #ced4da; border-radius:4px; font-size:10px; font-weight:bold; cursor:pointer; color:#495057; box-shadow:0 1px 2px rgba(0,0,0,0.05);">➕ Cập nhật</button>
//         `;
//     }
//     let isDone = xuLyObj.trang_thai === 'Đã hoàn thành';
//     let isPartial = xuLyObj.trang_thai === 'Đã nộp 1 phần';
//     let bgXl = isDone ? '#d4edda' : (isPartial ? '#cce5ff' : '#fff3cd');
//     let colXl = isDone ? '#155724' : (isPartial ? '#004085' : '#856404');
//     let icnXl = isDone ? '✅' : (isPartial ? '🔄' : '⏳');
//     let textXl = isDone ? 'Đã xong' : (isPartial ? '1 phần' : 'Chưa xong');
//     let bdrXl = isDone ? '#c3e6cb' : (isPartial ? '#b8daff' : '#ffeeba');

//     let html = `<div style="font-size:11px; color:#d35400; font-weight:bold; line-height:1.2; text-align:center;">${xuLyObj.hinh_thuc || ''}</div>
//                 <div style="font-size:10px; color:#555; max-width:140px; margin-top:2px; text-align:center; overflow:hidden; text-overflow:ellipsis; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical;" title="${xuLyObj.noi_dung || ''}">${xuLyObj.noi_dung || ''}</div>
//                 <div onclick="window.ham_21_51_mo_popup_cap_nhat_xu_ly('${blockId}')" style="background:${bgXl}; color:${colXl}; padding:4px 8px; border-radius:4px; font-size:10px; font-weight:bold; cursor:pointer; border:1px solid ${bdrXl}; text-align:center; margin-top:6px; box-shadow:0 1px 2px rgba(0,0,0,0.05); transition:0.2s;" onmouseover="this.style.filter='brightness(0.95)'" onmouseout="this.style.filter='brightness(1)'" title="Bấm cập nhật tiến độ">${icnXl} ${textXl}</div>`;

//     if (xuLyObj.anh_minh_chung && xuLyObj.anh_minh_chung.length > 0) {
//         html += `<div style="display:flex; gap:2px; flex-wrap:wrap; justify-content:center; margin-top:4px;">`;
//         xuLyObj.anh_minh_chung.forEach(link => {
//             let fileId = null;
//             if (link.includes('/d/')) { let m = link.match(/\/d\/([a-zA-Z0-9_-]+)/); if (m) fileId = m[1]; }
//             else if (link.includes('id=')) { let m = link.match(/id=([a-zA-Z0-9_-]+)/); if (m) fileId = m[1]; }
//             let srcTN = fileId ? `https://drive.google.com/thumbnail?id=${fileId}&sz=w50` : link;
//             html += `<img src="${srcTN}" onclick="event.stopPropagation(); window.open('${link}', '_blank')" style="width:24px; height:24px; object-fit:cover; border-radius:3px; border:1px solid #ccc; cursor:pointer; box-shadow:0 1px 2px rgba(0,0,0,0.2);" title="Xem ảnh nộp phạt">`;
//         });
//         html += `</div>`;
//     }
//     return html;
// };


























// =====================================================================
// 3. TÍCH HỢP TÍNH NĂNG CHỌN TAG (B4) VÀO SUB-ROW ĐANG CHỌN
// =====================================================================
window.ham_21_chon_hinh_thuc_xu_ly = function (btnElem, tenHinhThuc) {
    let hiddenInput = document.getElementById('gvcn-hinh-thuc-xu-ly');
    if (!hiddenInput) return;
    let currentValues = hiddenInput.value ? hiddenInput.value.split(', ') : [];
    if (currentValues.includes(tenHinhThuc)) {
        currentValues = currentValues.filter(v => v !== tenHinhThuc);
        btnElem.style.background = 'transparent'; btnElem.style.color = btnElem.dataset.color;
    } else {
        currentValues.push(tenHinhThuc);
        btnElem.style.background = btnElem.dataset.color; btnElem.style.color = '#fff';
    }
    hiddenInput.value = currentValues.join(', ');

    // 🌟 Gán thẳng vào ô Khắc phục của dòng lẻ đang chọn
    let subDangChon = document.querySelector('.sub-dang-chon');
    if (subDangChon) {
        let ta = subDangChon.querySelector('.sk-khac-phuc');
        if (ta) {
            let ndKèm = document.getElementById('gvcn-noi-dung-xu-ly').value.trim();
            let chuoiGhep = currentValues.join(', ');
            if (ndKèm) chuoiGhep += (chuoiGhep ? ' - ' : '') + ndKèm;
            ta.value = chuoiGhep;
            ta.style.height = '26px'; ta.style.height = ta.scrollHeight + 'px';
        }
    } else {
        alert("⚠️ Thầy chưa chọn LỖI LẺ nào!\n👉 Hãy click vào vùng trống của một dòng lỗi (trong bảng bên trên) để xác định Áp dụng Hình thức phạt cho lỗi nào nhé.");
    }
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



// =====================================================================
// 6. LƯU BẢNG: QUÉT KHỐI -> LƯU DÒNG LẺ VÀ HIỂN THỊ TIẾN ĐỘ TẢI ẢNH CHI TIẾT
// =====================================================================
window.ham_21_15_luu_su_kien_tuan_truoc = async function (btnLuu) {
    const inputLop = document.getElementById('gvcn-input-lop');
    const inputTuan = document.getElementById('gvcn-sk-tuan-chon');

    const tuanChon = inputTuan ? inputTuan.value.trim() : '';
    const maLopRaw = inputLop ? inputLop.value.trim() : '';
    const maLop = maLopRaw.match(/\(([^)]+)\)$/) ? maLopRaw.match(/\(([^)]+)\)$/)[1].trim() : maLopRaw;

    if (!maLop || !tuanChon) { alert("⚠️ Vui lòng CHỌN LỚP và CHỌN TUẦN TRƯỚC KHI LƯU!"); return; }

    const textGoc = btnLuu.innerHTML;
    const bgGoc = btnLuu.style.background;
    btnLuu.innerHTML = "⏳ Đang chuẩn bị dữ liệu...";
    btnLuu.disabled = true;

    try {
        let idNhatKy = null;
        const { data: nkData, error: errNK } = await _supabase.from('nhat_ky_gvcn').select('id').eq('ma_lop', maLop).eq('tuan_hoc', tuanChon).maybeSingle();
        if (errNK) throw errNK;
        if (nkData) { idNhatKy = nkData.id; }
        else {
            const { data: nkNew, error: errNew } = await _supabase.from('nhat_ky_gvcn').insert([{ ma_lop: maLop, tuan_hoc: tuanChon, tu_ngay: new Date().toISOString().split('T')[0], trang_thai: 1 }]).select();
            if (errNew) throw errNew; idNhatKy = nkNew[0].id;
        }

        const { data: dsHienCo } = await _supabase.from('nhat_ky_gvcn_su_kien_hs').select('id').eq('id_gvcn_nhat_ky', idNhatKy);
        let currentIdsInDB = dsHienCo ? dsHienCo.map(d => d.id) : [];

        let blocks = document.querySelectorAll('.khoi-su-kien-hs');

        // 🌟 ĐẾM TỔNG SỐ ẢNH CẦN TẢI LÊN DRIVE TRƯỚC KHI XỬ LÝ
        let tongSoAnhCanTai = 0;
        let anhDaTaiThanhCong = 0;
        for (let block of blocks) {
            let subRows = block.querySelectorAll('.sub-dong-loi');
            for (let sr of subRows) {
                if (sr.dataset.mangAnh) {
                    let anhArr = JSON.parse(sr.dataset.mangAnh);
                    for (let imgObj of anhArr) {
                        if (imgObj.type !== 'url') tongSoAnhCanTai++;
                    }
                }
            }
        }

        let mangInsert = []; let mangUpdate = []; let idsToKeep = [];

        for (let block of blocks) {
            let hsGhep = block.querySelector('.sk-hs').value.trim();
            if (!hsGhep) continue;

            let tenHS = hsGhep.split(' - ')[0].trim();
            let usernameHS = hsGhep.split(' - ')[1] ? hsGhep.split(' - ')[1].trim() : '';
            let uidHS = null;
            if (window.DanhSachHocSinhLopHienTai) {
                let hsObj = window.DanhSachHocSinhLopHienTai.find(h => h.chuoiGhep === hsGhep || h.tenHienThi === tenHS);
                if (hsObj) uidHS = hsObj.uid;
            }

            // Lấy Tiến độ Chung của Khối
            let tienDoObj = block.dataset.tienDo ? JSON.parse(block.dataset.tienDo) : { trang_thai: 'Chưa hoàn thành', anh_minh_chung: [] };

            let subRows = block.querySelectorAll('.sub-dong-loi');
            for (let i = 0; i < subRows.length; i++) {
                let sr = subRows[i];
                let loi = sr.querySelector('.sk-loi').value.trim();
                let diemTru = parseFloat(sr.querySelector('.sk-diem-tru').value) || 0;
                let khacPhuc = sr.querySelector('.sk-khac-phuc').value.trim();
                let ghiChu = sr.querySelector('.sk-ghichu').value.trim();
                let ngaySK = sr.querySelector('.sk-ngay').value;
                let buoiSK = sr.querySelector('.sk-buoi') ? sr.querySelector('.sk-buoi').value : 'Sáng';

                let mangLinkAnhDong = [];
                if (sr.dataset.mangAnh) {
                    let anhArr = JSON.parse(sr.dataset.mangAnh);
                    for (let k = 0; k < anhArr.length; k++) {
                        let imgObj = anhArr[k];
                        if (imgObj.type === 'url') {
                            mangLinkAnhDong.push(imgObj.b64);
                        } else {
                            // 🌟 HIỂN THỊ TIẾN ĐỘ TẢI ẢNH CHI TIẾT
                            anhDaTaiThanhCong++;
                            let tenFile = `GVCN_${maLop}_${Date.now()}_${k}.jpg`;

                            let res = await window.ham_ho_tro_upload_anh_co_tien_trinh(
                                CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP,
                                { action: "upload_anh_nhat_ky_gvcn", base64: imgObj.b64, mimeType: imgObj.type || "image/jpeg", fileName: tenFile, maLop: maLop, loaiAnh: "MINH_CHUNG_GVCN" },
                                (phanTram, daTai, tongSo) => {
                                    let strDaTai = window.ham_dinh_dang_dung_luong ? window.ham_dinh_dang_dung_luong(daTai) : (daTai / 1024).toFixed(1) + ' KB';
                                    let strTongSo = window.ham_dinh_dang_dung_luong ? window.ham_dinh_dang_dung_luong(tongSo) : (tongSo / 1024).toFixed(1) + ' KB';

                                    // Hiệu ứng thanh tiến trình mượt mà
                                    btnLuu.style.background = `linear-gradient(90deg, #e83e8c ${phanTram}%, #6c757d ${phanTram}%)`;
                                    btnLuu.innerHTML = `🚀 Đang tải ảnh minh chứng lẻ (${anhDaTaiThanhCong}/${tongSoAnhCanTai})<br><span style="font-size:11px; font-weight:normal;">${strDaTai} / ${strTongSo} (${phanTram}%)</span>`;
                                }
                            );

                            if (res.status === 'success') {
                                mangLinkAnhDong.push(res.url);
                                imgObj.b64 = res.url;
                                imgObj.type = 'url';
                            } else {
                                throw new Error("Lỗi khi tải ảnh lên Google Drive!");
                            }
                        }
                    }
                    sr.dataset.mangAnh = JSON.stringify(anhArr);
                }

                // GHÉP KHẮC PHỤC LẺ VÀ TIẾN ĐỘ CHUNG VÀO 1 OBJECT XỬ LÝ
                let xuLyFinal = {
                    noi_dung: khacPhuc,
                    trang_thai: tienDoObj.trang_thai,
                    anh_minh_chung: tienDoObj.anh_minh_chung
                };
                if (tienDoObj.ngay_hoan_thanh) xuLyFinal.ngay_hoan_thanh = tienDoObj.ngay_hoan_thanh;

                let thongTinMoRong = {
                    diem_tru: diemTru, buoi: buoiSK,
                    danh_sach_anh_minh_chung: mangLinkAnhDong,
                    mau_sac: '#e83e8c',
                    xu_ly: xuLyFinal
                };

                let itemToSave = {
                    id_gvcn_nhat_ky: idNhatKy, uid_hoc_sinh: uidHS, ten_hoc_sinh: tenHS, ten_dang_nhap_hoc_sinh: usernameHS,
                    nhom_su_kien: loi,
                    noi_dung_chi_tiet: `[${ngaySK} - ${buoiSK}] Lỗi: ${loi}` + (ghiChu ? ` - Ghi chú: ${ghiChu}` : ''),
                    ngay_ghi_nhan: ngaySK, hinh_thuc_xu_ly: '', muc_do: 1,
                    thong_tin_mo_rong: thongTinMoRong
                };

                let idRow = sr.dataset.id;
                if (idRow && idRow.trim() !== '' && idRow !== 'undefined' && idRow !== 'null') {
                    itemToSave.id = idRow.trim();
                    mangUpdate.push(itemToSave);
                    idsToKeep.push(idRow.trim());
                } else {
                    mangInsert.push(itemToSave);
                }
            }
        }

        // Xóa vĩnh viễn các dòng DB mà thầy đã bấm ✖ trên giao diện
        let idsToDelete = currentIdsInDB.filter(id => !idsToKeep.includes(id));
        if (idsToDelete.length > 0) {
            btnLuu.style.background = '#ffc107'; btnLuu.style.color = '#000';
            btnLuu.innerHTML = "⏳ Đang dọn dẹp dữ liệu cũ...";
            await _supabase.from('nhat_ky_gvcn_su_kien_hs').delete().in('id', idsToDelete);
        }

        btnLuu.style.background = '#17a2b8'; btnLuu.style.color = '#fff';
        btnLuu.innerHTML = "⏳ Đang đồng bộ vào CSDL...";
        if (mangInsert.length > 0) {
            const { error: errIn } = await _supabase.from('nhat_ky_gvcn_su_kien_hs').insert(mangInsert);
            if (errIn) throw errIn;
        }
        if (mangUpdate.length > 0) {
            const { error: errUp } = await _supabase.from('nhat_ky_gvcn_su_kien_hs').upsert(mangUpdate);
            if (errUp) throw errUp;
        }

        alert("✅ LƯU BẢNG VÀ NHÂN BẢN TIẾN ĐỘ THÀNH CÔNG!");

        let boxB4 = document.getElementById('gvcn-check-xu-ly');
        if (boxB4) boxB4.checked = false;
        let vungB4 = document.getElementById('gvcn-vung-xu-ly');
        if (vungB4) vungB4.style.display = 'none';
        let ndB4 = document.getElementById('gvcn-noi-dung-xu-ly');
        if (ndB4) ndB4.value = '';

        if (typeof window.ham_21_30_cap_nhat_ngay_tuan_su_kien === 'function') window.ham_21_30_cap_nhat_ngay_tuan_su_kien();

    } catch (e) {
        console.error(e);
        alert("❌ Lỗi lưu dữ liệu: " + (e.message || JSON.stringify(e)));
    } finally {
        btnLuu.innerHTML = textGoc;
        btnLuu.style.background = bgGoc;
        btnLuu.style.color = '#fff';
        btnLuu.disabled = false;
    }
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


// =====================================================================
// 2. NẠP DỮ LIỆU DB VÀ TỰ ĐỘNG GOM THEO HỌC SINH
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

    let monday = ''; let sunday = ''; let idNhatKyGvcn = null;

    try {
        const { data: nkData } = await _supabase.from('nhat_ky_gvcn')
            .select('id, tu_ngay, den_ngay').eq('ma_lop', maLop).eq('tuan_hoc', tuan).maybeSingle();

        if (nkData && nkData.tu_ngay) {
            monday = nkData.tu_ngay; sunday = nkData.den_ngay || ''; idNhatKyGvcn = nkData.id;
        } else {
            let soTuan = parseInt(tuan.replace(/\D/g, ''));
            if (!isNaN(soTuan)) {
                let d = new Date('2026-09-07T00:00:00');
                d.setDate(d.getDate() + (soTuan - 1) * 7);
                monday = d.toISOString().split('T')[0];
                let d2 = new Date(d); d2.setDate(d2.getDate() + 6);
                sunday = d2.toISOString().split('T')[0];
            }
        }

        tuNgayInput.value = monday;
        if (sunday) denNgayInput.value = sunday;

        const khuVuc = document.getElementById('gvcn-khu-vuc-su-kien-nhanh');
        if (khuVuc) khuVuc.innerHTML = '';

        if (idNhatKyGvcn) {
            const { data: dsSuKien } = await _supabase.from('nhat_ky_gvcn_su_kien_hs')
                .select('*').eq('id_gvcn_nhat_ky', idNhatKyGvcn).not('nhom_su_kien', 'ilike', 'Giao việc:%')
                .order('ngay_ghi_nhan', { ascending: true });

            if (dsSuKien && dsSuKien.length > 0) {
                // 🌟 TỰ ĐỘNG GOM THEO HỌC SINH NGAY TỪ LÚC LOAD DB
                let mapGop = {};
                dsSuKien.forEach(sk => {
                    let key = sk.uid_hoc_sinh || sk.ten_hoc_sinh;
                    if (!mapGop[key]) mapGop[key] = [];
                    mapGop[key].push(sk);
                });
                for (let k in mapGop) {
                    window.ham_21_4_them_dong_su_kien(mapGop[k]);
                }
            }
        }

    } catch (e) { console.error("Lỗi nạp sự kiện cũ:", e); }
};








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
                let dong = inputElem.closest('.sub-dong-loi');
                if (!dong.dataset.mangAnh) dong.dataset.mangAnh = JSON.stringify([]);
                let arr = JSON.parse(dong.dataset.mangAnh);
                arr.push({ b64: b64, type: f.type, size: f.size });
                dong.dataset.mangAnh = JSON.stringify(arr);

                let vungPreview = dong.querySelector('.vung-preview-anh-sk-dong');
                let html = '';
                arr.forEach((imgObj, idx) => {
                    html += `
                    <div style="position:relative; margin-bottom: 2px;">
                        <img src="${imgObj.b64}" style="width:40px; height:40px; object-fit:cover; border-radius:4px; border:1px solid #ccc;">
                        <button type="button" onclick="event.stopPropagation(); let d=this.closest('.sub-dong-loi'); let a=JSON.parse(d.dataset.mangAnh); a.splice(${idx},1); d.dataset.mangAnh=JSON.stringify(a); this.closest('div').remove();" style="position:absolute; top:-4px; right:-4px; background:#dc3545; color:#fff; border:none; border-radius:50%; width:16px; height:16px; font-size:10px; cursor:pointer;">✖</button>
                    </div>`;
                });
                vungPreview.innerHTML = html;
            }
        } catch (e) { console.error(e); }
        inputElem.value = '';
    }
};







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



// =====================================================================
// HÀM 21.38: GIAO DIỆN MỤC 5 (BỌC BẢNG SỰ KIỆN VÀO KHUNG CUỘN NGANG)
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

                <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border: 1px solid #ced4da; margin-bottom: 15px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid #ddd; padding-bottom: 8px;">
                        <label style="font-weight: bold; font-size: 13px; color: #495057;">B2. Danh sách Học sinh & Sự kiện:</label>
                        <div style="display: flex; gap: 8px;">
                            <button type="button" id="btn-toggle-sua-nhanh" onclick="window.ham_21_57_toggle_che_do_sua(this)" style="padding: 7px 15px; background: #6c757d; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition:0.2s;" title="Bấm để MỞ KHÓA ghi đè dữ liệu">🔒 Đang KHÓA sửa nhanh</button>
                        </div>
                    </div>
                    
                    <!-- 🌟 VÙNG CUỘN NGANG: Ngăn chặn bảng bị ép bóp méo trên điện thoại -->
                    <div class="vung-cuon-ngang-mobile" style="width: 100%; overflow-x: auto; padding-bottom: 10px;">
                        
                        <div class="gvcn-header-bang-su-kien" style="display: flex; gap: 5px; font-weight: bold; font-size: 11px; color: #6c757d; text-align: center; border-bottom: 2px solid #ccc; padding-bottom: 5px; margin-bottom: 5px; min-width: 950px;">
                            <div style="width: 180px;">Học sinh</div>
                            <div style="flex: 1; display:flex; gap:4px; padding:0 4px;">
                                <div style="width: 90px;">Thời gian</div>
                                <div style="flex: 1.2; min-width: 120px;">Lỗi vi phạm</div>
                                <div style="width: 40px;">Điểm</div>
                                <div style="width: 55px;">Ảnh lẻ</div>
                                <div style="flex: 1.2; min-width: 120px; color:#d35400;">Yêu cầu phạt</div>
                                <div style="width: 80px;">Ghi chú</div>
                                <div style="width: 25px;"></div>
                            </div>
                            <div style="width: 110px; color:#0056b3;">Tiến độ chung</div>
                            <div style="width: 40px;">Xóa</div>
                        </div>

                        <!-- Khu vực sinh ra các dòng Khối -->
                        <div id="gvcn-khu-vuc-su-kien-nhanh" style="display: flex; flex-direction: column; gap: 6px; min-width: 950px;"></div>

                    </div>

                    <div style="margin-top: 15px; text-align: left;">
                        <button type="button" onclick="if(typeof ham_21_4_them_dong_su_kien === 'function') ham_21_4_them_dong_su_kien();" style="padding: 8px 15px; background: #28a745; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: bold; box-shadow: 0 2px 4px rgba(40,167,69,0.3); transition: 0.2s;" onmouseover="this.style.background='#218838'" onmouseout="this.style.background='#28a745'">➕ Thêm học sinh vi phạm</button>
                    </div>
                </div>
                
                <div style="background: #fff; padding: 15px; border-radius: 8px; border: 1px dashed #e83e8c; margin-bottom: 15px;">
                    <label style="font-weight: bold; font-size: 13px; color: #e83e8c; display: block; margin-bottom: 10px;">🏷️ B3. Bấm chọn nhanh Sự kiện / Lỗi (Tự động nạp vào dòng LỖI LẺ đang chọn bên trên):</label>
                    <div id="gvcn-khu-vuc-chon-the-duoi-bang"></div>
                </div>

                <div style="margin-bottom: 15px; padding: 15px; background: #fffcf8; border: 1px dashed #d35400; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                    <label style="display:flex; align-items:center; gap:8px; font-weight:bold; font-size:14px; color:#d35400; cursor:pointer;">
                        <input type="checkbox" id="gvcn-check-xu-ly" onchange="document.getElementById('gvcn-vung-xu-ly').style.display = this.checked ? 'block' : 'none';" style="width:18px; height:18px; cursor:pointer; accent-color:#d35400;">
                        ☑️ B4. Mở khung chọn nhanh Yêu cầu phạt (Tự động điền vào LỖI LẺ đang chọn)
                    </label>
                    <div id="gvcn-vung-xu-ly" style="display:none; margin-top:15px; border-top:1px dashed #ffeeba; padding-top:15px;">
                        <div style="font-size:13px; font-weight:bold; color:#d35400; margin-bottom:8px;">Bấm chọn hình thức:</div>
                        <div id="gvcn-khu-vuc-tags-xu-ly" style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:15px;">
                            <span style="font-size: 12px; color: #999;">⏳ Đang tải thẻ...</span>
                        </div>
                        <input type="hidden" id="gvcn-hinh-thuc-xu-ly" value="">
                        <div style="font-size:13px; font-weight:bold; color:#d35400; margin-bottom:5px;">Hoặc tự gõ nội dung phạt:</div>
                        
                        <input id="gvcn-noi-dung-xu-ly" type="text" placeholder="VD: 1 lần / 1 điểm trừ..." style="width:100%; padding:10px; border:1px solid #ced4da; border-radius:4px; font-size:13px; outline:none; box-sizing:border-box;"
                        oninput="let sub=document.querySelector('.sub-dang-chon'); if(sub){ let ta=sub.querySelector('.sk-khac-phuc'); if(ta){ let hf=document.getElementById('gvcn-hinh-thuc-xu-ly').value; ta.value = (hf ? hf + ' - ' : '') + this.value; ta.style.height='26px'; ta.style.height=ta.scrollHeight+'px'; } }">
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
    window.gvcn_ChoPhepSuaNhanh = false;
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





window.ham_21_40_tu_dong_dien_diem = function (inputLoi) {
    let parent = inputLoi.closest('.sub-dong-loi');
    if (!parent) return;
    let inputDiem = parent.querySelector('.sk-diem-tru');
    if (!inputDiem) return;
    let val = inputLoi.value.trim();
    if (window.gvcn_DanhSachTheSuKien) {
        let the = window.gvcn_DanhSachTheSuKien.find(t => t.ten === val);
        if (the) inputDiem.value = the.diem;
    }
};






// =====================================================================
// 4. LẮNG NGHE CHỌN DÒNG VÀ GẮN ẢNH VÀO SUB-DÒNG LỖI
// =====================================================================
window.ham_21_41_danh_dau_dong = function (subElem) {
    if (!window.gvcn_ChoPhepSuaNhanh) return;
    document.querySelectorAll('.sub-dong-loi').forEach(d => {
        d.classList.remove('sub-dang-chon');
        d.style.background = 'transparent';
        d.style.borderLeft = 'none';
    });
    subElem.classList.add('sub-dang-chon');
    subElem.style.background = '#fdf5f8';
    subElem.style.borderLeft = '3px solid #e83e8c';
};

window.ham_21_42_gan_the_vao_dong_hien_hanh = function (tenThe, diemTru) {
    if (!window.gvcn_ChoPhepSuaNhanh) { alert("⚠️ Chế độ sửa nhanh đang bị KHÓA! Hãy MỞ KHÓA ở B2."); return; }
    let subDangChon = document.querySelector('.sub-dang-chon');
    if (!subDangChon) { alert("⚠️ Thầy chưa chọn dòng LỖI LẺ nào!\n👉 Hãy click vào vùng trống của một dòng lỗi (trong khối học sinh) trước khi bấm chọn thẻ."); return; }

    let inputLoi = subDangChon.querySelector('.sk-loi');
    let inputDiem = subDangChon.querySelector('.sk-diem-tru');
    if (inputLoi) { inputLoi.value = tenThe; inputLoi.style.height = '26px'; inputLoi.style.height = inputLoi.scrollHeight + 'px'; }
    if (inputDiem) { inputDiem.value = diemTru; }
};









window.ham_21_43_sua_the = function (tenCu, diemCu, nhomThe) {
    window.ham_21_44_hien_thi_modal_the(tenCu, diemCu, nhomThe, 'sua');
};


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
// HÀM 21.46: GIAO DIỆN MODAL TÌM KIẾM (HIỂN THỊ CHI TIẾT NGÀY THÁNG CỦA TUẦN)
// =====================================================================
window.ham_21_46_mo_giao_dien_tim_lai = function () {
    const maLopRaw = document.getElementById('gvcn-input-lop');
    if (!maLopRaw || !maLopRaw.value.trim()) {
        alert("⚠️ Vui lòng chọn Lớp học ở Mục 1 trước khi mở bộ lọc thống kê!");
        return;
    }

    let tenLopDayDu = maLopRaw.value.trim();

    let modal = document.getElementById('gvcn-modal-thong-ke');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'gvcn-modal-thong-ke';
        modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); display:flex; align-items:center; justify-content:center; z-index:999999; backdrop-filter: blur(2px);';
        document.body.appendChild(modal);
    }

    // Tự động tính toán khoảng ngày cho 37 tuần học dựa trên mốc 07/09/2026
    let optionsTuan = '<option value="">(Tất cả)</option>';
    let dGoc = new Date('2026-09-07T00:00:00');
    for (let i = 1; i <= 37; i++) {
        let dBatDau = new Date(dGoc);
        dBatDau.setDate(dBatDau.getDate() + (i - 1) * 7);
        let dKetThuc = new Date(dBatDau);
        dKetThuc.setDate(dKetThuc.getDate() + 6);

        let strTu = dBatDau.toISOString().split('T')[0].split('-').reverse().join('/');
        let strDen = dKetThuc.toISOString().split('T')[0].split('-').reverse().join('/');

        optionsTuan += `<option value="Tuần ${i}">Tuần ${i} (${strTu} - ${strDen})</option>`;
    }

    modal.innerHTML = `
        <div style="background:#fff; width:1050px; max-width:98%; max-height:92vh; display:flex; flex-direction:column; border-radius:10px; box-shadow:0 10px 30px rgba(0,0,0,0.4); overflow:hidden;">
            <div style="background:#6f42c1; color:#fff; padding:15px 20px; display:flex; justify-content:space-between; align-items:center;">
                <h3 style="margin:0; font-size:17px;">📊 Tra cứu & Thống kê Thi đua - Lớp ${tenLopDayDu}</h3>
                <button onclick="document.getElementById('gvcn-modal-thong-ke').remove()" style="background:transparent; color:#fff; border:none; font-size:18px; cursor:pointer;" title="Đóng">✖</button>
            </div>
            
            <div style="padding:15px 20px; background:#f8f9fa; border-bottom:1px solid #dee2e6; display:flex; gap:12px; flex-wrap:wrap; align-items:flex-end;">
                <div>
                    <label style="font-size:11px; font-weight:bold; color:#495057; display:block; margin-bottom:4px;">Từ Tuần:</label>
                    <select id="tk-chon-tuan-tu" style="padding:8px; border:1px solid #ced4da; border-radius:6px; font-size:13px; font-weight:bold; background:#fff; width:200px;">${optionsTuan}</select>
                </div>
                <div>
                    <label style="font-size:11px; font-weight:bold; color:#495057; display:block; margin-bottom:4px;">Đến Tuần:</label>
                    <select id="tk-chon-tuan-den" style="padding:8px; border:1px solid #ced4da; border-radius:6px; font-size:13px; font-weight:bold; background:#fff; width:200px;">${optionsTuan}</select>
                </div>
                
                <div style="flex:1; min-width:220px; position:relative;" id="tk-vung-chon-hs">
                    <label style="font-size:11px; font-weight:bold; color:#495057; display:block; margin-bottom:4px;">Học sinh (Gõ tên để lọc lẻ):</label>
                    <input id="tk-chon-hs" placeholder="Bỏ trống để xem cả lớp..." autocomplete="off" oninput="window.ham_21_49_hien_dropdown_hs_thong_ke(this)" style="width:100%; padding:8px; border:1px solid #ced4da; border-radius:6px; font-size:13px; font-weight:bold; background:#fff; box-sizing:border-box;">
                    <input type="hidden" id="tk-chon-hs-uid" value="">
                </div>

                <div>
                    <button onclick="window.ham_21_47_thuc_hien_tim_kiem_thong_ke()" style="padding:9px 20px; background:#28a745; color:white; border:none; border-radius:6px; font-weight:bold; cursor:pointer; font-size:13px; box-shadow:0 2px 4px rgba(40,167,69,0.3);">🔍 Lấy dữ liệu</button>
                </div>
            </div>

            <div id="gvcn-vung-ket-qua-tk" style="padding:20px; overflow-y:auto; flex:1; background:#fff;">
                <div style="text-align:center; color:#6c757d; font-style:italic; padding:40px;">💡 Vui lòng bấm "Lấy dữ liệu" để hiển thị báo cáo.</div>
            </div>

            <div style="padding:12px 20px; background:#f1f3f4; border-top:1px solid #dee2e6; display:flex; justify-content:space-between; align-items:center;">
                <span id="tk-tong-so-dong" style="font-size:12px; font-weight:bold; color:#6c757d;">Tổng số: 0 vi phạm</span>
                <div style="display:flex; gap:10px;">
                    <button onclick="window.ham_21_48_xuat_in_bao_cao()" style="padding:8px 16px; background:#17a2b8; color:white; border:none; border-radius:6px; font-weight:bold; cursor:pointer; font-size:12px;">🖨️ In / Xuất PDF</button>
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
// // HÀM 21.47: TRA CỨU & THỐNG KÊ THI ĐUA (CĂN CHỈNH LẠI ĐỘ RỘNG CỘT TỐI ƯU)
// // =====================================================================
// window.ham_21_47_thuc_hien_tim_kiem_thong_ke = async function () {
//     const maLopRaw = document.getElementById('gvcn-input-lop').value;
//     const maLop = maLopRaw.match(/\(([^)]+)\)$/)?.[1]?.trim() || maLopRaw.trim();

//     const tuanTu = document.getElementById('tk-chon-tuan-tu').value;
//     const tuanDen = document.getElementById('tk-chon-tuan-den').value;

//     const uidHS = document.getElementById('tk-chon-hs-uid').value;
//     const tenHSInput = document.getElementById('tk-chon-hs').value.toLowerCase().trim();

//     const vungKQ = document.getElementById('gvcn-vung-ket-qua-tk');
//     vungKQ.innerHTML = '<div style="text-align:center; color:#6f42c1; font-weight:bold; padding:30px;">⏳ Đang tổng hợp dữ liệu thi đua...</div>';

//     try {
//         let queryNK = _supabase.from('nhat_ky_gvcn').select('id, tuan_hoc, tu_ngay, den_ngay').eq('ma_lop', maLop);
//         const { data: nkList, error: errNK } = await queryNK;
//         if (errNK) throw errNK;

//         if (!nkList || nkList.length === 0) {
//             vungKQ.innerHTML = '<div style="text-align:center; color:#dc3545; font-weight:bold; padding:30px;">⚠️ Lớp này chưa có dữ liệu Nhật ký!</div>';
//             document.getElementById('tk-tong-so-dong').innerText = 'Tổng số: 0 sự kiện'; return;
//         }

//         let idNKS = [];
//         let mapTuan = {};

//         let numTu = tuanTu ? parseInt(tuanTu.replace(/\D/g, '')) : 1;
//         let numDen = tuanDen ? parseInt(tuanDen.replace(/\D/g, '')) : 99;

//         nkList.forEach(x => {
//             let numTuan = parseInt(x.tuan_hoc.replace(/\D/g, ''));
//             if (!isNaN(numTuan) && numTuan >= numTu && numTuan <= numDen) {
//                 idNKS.push(x.id);

//                 let strTu = x.tu_ngay ? x.tu_ngay.split('-').reverse().join('/') : '';
//                 let strDen = x.den_ngay ? x.den_ngay.split('-').reverse().join('/') : '';

//                 // Backup tính ngày nếu DB thiếu
//                 if (!strTu || !strDen) {
//                     let dBatDau = new Date('2026-09-07T00:00:00');
//                     dBatDau.setDate(dBatDau.getDate() + (numTuan - 1) * 7);
//                     let dKetThuc = new Date(dBatDau);
//                     dKetThuc.setDate(dKetThuc.getDate() + 6);
//                     strTu = dBatDau.toISOString().split('T')[0].split('-').reverse().join('/');
//                     strDen = dKetThuc.toISOString().split('T')[0].split('-').reverse().join('/');
//                 }

//                 let textTuan = x.tuan_hoc;
//                 if (strTu && strDen) textTuan += `<br><span style="font-size:10px; color:#6c757d; font-weight:normal;">(${strTu} - ${strDen})</span>`;
//                 mapTuan[x.id] = textTuan;
//             }
//         });

//         if (idNKS.length === 0) {
//             vungKQ.innerHTML = '<div style="text-align:center; color:#dc3545; font-weight:bold; padding:30px;">⚠️ Không tìm thấy dữ liệu trong khoảng tuần này!</div>';
//             document.getElementById('tk-tong-so-dong').innerText = 'Tổng số: 0 sự kiện'; return;
//         }

//         let querySK = _supabase.from('nhat_ky_gvcn_su_kien_hs').select('*').in('id_gvcn_nhat_ky', idNKS).not('nhom_su_kien', 'ilike', 'Giao việc:%').order('ngay_ghi_nhan', { ascending: false });
//         if (uidHS) querySK = querySK.eq('uid_hoc_sinh', uidHS);

//         const { data: skList, error: errSK } = await querySK;
//         if (errSK) throw errSK;

//         let ketQuaLoc = skList || [];
//         if (!uidHS && tenHSInput) ketQuaLoc = ketQuaLoc.filter(item => (item.ten_hoc_sinh || '').toLowerCase().includes(tenHSInput));

//         document.getElementById('tk-tong-so-dong').innerText = `Tổng số: ${ketQuaLoc.length} vi phạm`;

//         let hsMap = {};

//         ketQuaLoc.forEach(sk => {
//             let key = sk.uid_hoc_sinh || sk.ten_hoc_sinh;
//             if (!hsMap[key]) {
//                 let hsAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(sk.ten_hoc_sinh)}&background=random&color=fff`;
//                 if (window.DanhSachHocSinhLopHienTai) {
//                     let hsObj = window.DanhSachHocSinhLopHienTai.find(h => h.uid === sk.uid_hoc_sinh || h.tenHienThi === sk.ten_hoc_sinh);
//                     if (hsObj) hsAvatar = hsObj.avatarUrl;
//                 }
//                 hsMap[key] = { ten: sk.ten_hoc_sinh, avatar: hsAvatar, tongDiem: 0, dsLoi: [] };
//             }
//             hsMap[key].dsLoi.push(sk);
//             let d = parseFloat(sk.thong_tin_mo_rong?.diem_tru) || 0;
//             hsMap[key].tongDiem += d;
//         });

//         if (window.DanhSachHocSinhLopHienTai) {
//             window.DanhSachHocSinhLopHienTai.forEach(hs => {
//                 if (uidHS && hs.uid !== uidHS) return;
//                 if (!uidHS && tenHSInput && !hs.tenHienThi.toLowerCase().includes(tenHSInput)) return;

//                 let key = hs.uid;
//                 if (!hsMap[key]) {
//                     hsMap[key] = { ten: hs.tenHienThi, avatar: hs.avatarUrl, tongDiem: 0, dsLoi: [] };
//                 }
//             });
//         }

//         let arrHS = Object.values(hsMap);
//         if (arrHS.length === 0) {
//             vungKQ.innerHTML = '<div style="text-align:center; color:#6c757d; font-style:italic; padding:30px;">Không tìm thấy học sinh nào khớp với điều kiện lọc.</div>';
//             return;
//         }

//         arrHS.sort((a, b) => {
//             let tenA = a.ten.split(' ').pop().toLowerCase();
//             let tenB = b.ten.split(' ').pop().toLowerCase();
//             return tenA.localeCompare(tenB, 'vi');
//         });

//         // 🌟 BÓP NHỎ CÁC CỘT PHỤ, TĂNG RỘNG CỘT SỰ KIỆN 🌟
//         let htmlTable = `
//             <table id="bang-in-thong-ke" style="width:100%; border-collapse:collapse; font-size:12px; background:#fff; border:1px solid #dee2e6;">
//                 <tr style="background:#f3e8ff; color:#6f42c1; border-bottom:2px solid #6f42c1;">
//                     <th style="padding:10px 4px; border:1px solid #dee2e6; text-align:center; width:30px;">STT</th>
//                     <th style="padding:10px 6px; border:1px solid #dee2e6; text-align:left; width:150px;">Học sinh</th>
//                     <th style="padding:10px 2px; border:1px solid #dee2e6; text-align:center; width:80px;">Tuần</th>
//                     <th style="padding:10px 2px; border:1px solid #dee2e6; text-align:center; width:65px;">Ngày</th>
//                     <th style="padding:10px 6px; border:1px solid #dee2e6; text-align:left;">Sự kiện / Lỗi vi phạm</th>
//                     <th style="padding:10px 2px; border:1px solid #dee2e6; text-align:center; width:40px;">Điểm</th>
//                     <th style="padding:10px 2px; border:1px solid #dee2e6; text-align:center; width:65px;">Ảnh Lỗi</th>
//                     <th style="padding:10px 6px; border:1px solid #dee2e6; text-align:left; width:120px;">Khắc phục</th>
//                     <th style="padding:10px 2px; border:1px solid #dee2e6; text-align:center; width:65px;">Tiến độ</th>
//                     <th style="padding:10px 2px; border:1px solid #dee2e6; text-align:center; width:70px;">Ảnh Phạt</th>
//                 </tr>
//         `;

//         let stt = 1;
//         arrHS.forEach(hs => {

//             if (hs.dsLoi.length === 0) {
//                 htmlTable += `
//                     <tr style="background:#e8f5e9; border-bottom:2px solid #28a745;">
//                         <td style="padding:10px 4px; border:1px solid #dee2e6; text-align:center; font-weight:bold; color:#155724;">${stt}</td>
//                         <td style="padding:10px 6px; border:1px solid #dee2e6; vertical-align:middle; background:#e8f5e9;">
//                             <div style="display:flex; align-items:flex-start; gap:8px;">
//                                 <img src="${hs.avatar}" style="width:30px; height:30px; border-radius:50%; object-fit:cover; border:2px solid #28a745;">
//                                 <b style="color:#155724; font-size:13px; line-height:30px;">${hs.ten}</b>
//                             </div>
//                         </td>
//                         <td colspan="8" style="padding:10px; border:1px solid #dee2e6; text-align:center; font-weight:bold; color:#28a745; font-size:13px;">
//                             🌟 TỐT (Không ghi nhận vi phạm nào)
//                         </td>
//                     </tr>
//                 `;
//                 stt++;
//                 return;
//             }

//             let rowSpan = hs.dsLoi.length + 1;
//             hs.dsLoi.sort((a, b) => new Date(a.ngay_ghi_nhan) - new Date(b.ngay_ghi_nhan));

//             hs.dsLoi.forEach((sk, idx) => {
//                 let tuanHienThi = mapTuan[sk.id_gvcn_nhat_ky] || '...';
//                 let strNgay = sk.ngay_ghi_nhan ? sk.ngay_ghi_nhan.split('-').reverse().join('/') : '';
//                 let diemTru = sk.thong_tin_mo_rong?.diem_tru || 0;
//                 let mauDiem = parseFloat(diemTru) < 0 ? '#dc3545' : (parseFloat(diemTru) > 0 ? '#28a745' : '#495057');

//                 let htmlAnhLoi = '';
//                 let mangAnhLoi = sk.thong_tin_mo_rong?.danh_sach_anh_minh_chung || [];
//                 if (mangAnhLoi.length > 0) {
//                     htmlAnhLoi = `<div style="display:flex; gap:2px; flex-wrap:wrap; justify-content:center;">`;
//                     mangAnhLoi.forEach(link => {
//                         let srcTN = window.ham_21_25_get_thumbnail_drive ? window.ham_21_25_get_thumbnail_drive(link, 'w100') : link;
//                         htmlAnhLoi += `<a href="${link}" target="_blank"><img src="${srcTN}" style="width:22px; height:22px; object-fit:cover; border-radius:3px; border:1px solid #ccc;"></a>`;
//                     });
//                     htmlAnhLoi += `</div>`;
//                 }

//                 let xlObj = sk.thong_tin_mo_rong?.xu_ly;
//                 let khacPhucHtml = '<span style="color:#adb5bd; font-size:10px;">-</span>';
//                 let xlHtml = '<span style="color:#adb5bd; font-size:10px;">-</span>';
//                 let htmlAnhPhat = '<span style="color:#adb5bd; font-size:10px;">-</span>';

//                 if (xlObj) {
//                     khacPhucHtml = `<b style="color:#d35400;">${xlObj.hinh_thuc || ''}</b><div style="font-size:10px; color:#555; margin-top:2px;">${xlObj.noi_dung || ''}</div>`;

//                     let isDone = xlObj.trang_thai === 'Đã hoàn thành';
//                     let isPartial = xlObj.trang_thai === 'Đã nộp 1 phần';
//                     let bgXl = isDone ? '#d4edda' : (isPartial ? '#cce5ff' : '#fff3cd');
//                     let colXl = isDone ? '#155724' : (isPartial ? '#004085' : '#856404');
//                     let textXl = isDone ? 'Đã xong' : (isPartial ? '1 phần' : 'Chưa xong');

//                     xlHtml = `<div style="background:${bgXl}; color:${colXl}; padding:4px 2px; border-radius:4px; font-size:10px; font-weight:bold; border:1px solid ${bgXl};">${textXl}</div>`;

//                     if (xlObj.anh_minh_chung && xlObj.anh_minh_chung.length > 0) {
//                         htmlAnhPhat = `<div style="display:flex; gap:2px; flex-wrap:wrap; justify-content:center;">`;
//                         xlObj.anh_minh_chung.forEach(link => {
//                             let srcTN = window.ham_21_25_get_thumbnail_drive ? window.ham_21_25_get_thumbnail_drive(link, 'w100') : link;
//                             htmlAnhPhat += `<a href="${link}" target="_blank"><img src="${srcTN}" style="width:22px; height:22px; object-fit:cover; border-radius:3px; border:1px solid #28a745;"></a>`;
//                         });
//                         htmlAnhPhat += `</div>`;
//                     }
//                 }

//                 let cotHocSinh = '';
//                 if (idx === 0) {
//                     cotHocSinh = `
//                         <td rowspan="${rowSpan}" style="padding:10px 4px; border:1px solid #dee2e6; text-align:center; font-weight:bold; background:#fffafb;">${stt}</td>
//                         <td rowspan="${rowSpan}" style="padding:10px 6px; border:1px solid #dee2e6; background:#fffafb; vertical-align:top;">
//                             <div style="display:flex; align-items:flex-start; gap:6px;">
//                                 <img src="${hs.avatar}" style="width:30px; height:30px; border-radius:50%; object-fit:cover; border:2px solid #e83e8c;">
//                                 <b style="color:#e83e8c; font-size:12px;">${hs.ten}</b>
//                             </div>
//                         </td>
//                     `;
//                 }

//                 htmlTable += `
//                     <tr style="border-bottom:1px dashed #dee2e6;">
//                         ${cotHocSinh}
//                         <td style="padding:6px 2px; border:1px solid #dee2e6; text-align:center; font-weight:bold; color:#6f42c1; line-height:1.3; font-size:11px;">${tuanHienThi}</td>
//                         <td style="padding:6px 2px; border:1px solid #dee2e6; text-align:center; font-size:11px;">${strNgay}</td>
//                         <td style="padding:8px 6px; border:1px solid #dee2e6;"><b>${sk.nhom_su_kien || ''}</b> <div style="font-size:11px; color:#555; margin-top:3px;">${sk.noi_dung_chi_tiet || ''}</div></td>
//                         <td style="padding:6px 2px; border:1px solid #dee2e6; text-align:center; font-weight:bold; color:${mauDiem};">${diemTru !== 0 ? diemTru : '-'}</td>
//                         <td style="padding:6px 2px; border:1px solid #dee2e6; text-align:center;">${htmlAnhLoi}</td>
//                         <td style="padding:6px; border:1px solid #dee2e6; line-height:1.3;">${khacPhucHtml}</td>
//                         <td style="padding:6px 2px; border:1px solid #dee2e6; text-align:center;">${xlHtml}</td>
//                         <td style="padding:6px 2px; border:1px solid #dee2e6; text-align:center;">${htmlAnhPhat}</td>
//                     </tr>
//                 `;
//             });

//             htmlTable += `
//                 <tr style="background:#fdf5f8; border-bottom:2px solid #e83e8c;">
//                     <td colspan="3" style="padding:8px 6px; border:1px solid #dee2e6; text-align:right; font-weight:bold; color:#d35400;">TỔNG ĐIỂM BỊ TRỪ:</td>
//                     <td style="padding:8px 2px; border:1px solid #dee2e6; text-align:center; font-weight:bold; font-size:13px; color:#dc3545;">${hs.tongDiem}</td>
//                     <td colspan="4" style="padding:8px; border:1px solid #dee2e6;"></td>
//                 </tr>
//             `;
//             stt++;
//         });

//         htmlTable += `</table>`; vungKQ.innerHTML = htmlTable;

//     } catch (e) { vungKQ.innerHTML = `<div style="color:red; text-align:center; font-weight:bold;">❌ Lỗi thống kê: ${e.message}</div>`; }
// };

// =====================================================================
// HÀM 21.47: TRA CỨU & THỐNG KÊ THI ĐUA (CÓ CỘT TỔNG ĐIỂM VÀ SORT ĐƯỢC)
// =====================================================================
window.gvcn_ThongKeDataCache = []; // Bộ nhớ tạm để chứa dữ liệu đã gom nhóm
window.gvcn_ThongKeSortState = { col: 'ten', asc: true }; // Trạng thái Sort

window.ham_21_47_thuc_hien_tim_kiem_thong_ke = async function () {
    const maLopRaw = document.getElementById('gvcn-input-lop').value;
    const maLop = maLopRaw.match(/\(([^)]+)\)$/)?.[1]?.trim() || maLopRaw.trim();

    const tuanTu = document.getElementById('tk-chon-tuan-tu').value;
    const tuanDen = document.getElementById('tk-chon-tuan-den').value;

    const uidHS = document.getElementById('tk-chon-hs-uid').value;
    const tenHSInput = document.getElementById('tk-chon-hs').value.toLowerCase().trim();

    const vungKQ = document.getElementById('gvcn-vung-ket-qua-tk');
    vungKQ.innerHTML = '<div style="text-align:center; color:#6f42c1; font-weight:bold; padding:30px;">⏳ Đang tổng hợp dữ liệu thi đua...</div>';

    try {
        let queryNK = _supabase.from('nhat_ky_gvcn').select('id, tuan_hoc, tu_ngay, den_ngay').eq('ma_lop', maLop);
        const { data: nkList, error: errNK } = await queryNK;
        if (errNK) throw errNK;

        if (!nkList || nkList.length === 0) {
            vungKQ.innerHTML = '<div style="text-align:center; color:#dc3545; font-weight:bold; padding:30px;">⚠️ Lớp này chưa có dữ liệu Nhật ký!</div>';
            document.getElementById('tk-tong-so-dong').innerText = 'Tổng số: 0 sự kiện'; return;
        }

        let idNKS = [];
        let mapTuan = {};

        let numTu = tuanTu ? parseInt(tuanTu.replace(/\D/g, '')) : 1;
        let numDen = tuanDen ? parseInt(tuanDen.replace(/\D/g, '')) : 99;

        nkList.forEach(x => {
            let numTuan = parseInt(x.tuan_hoc.replace(/\D/g, ''));
            if (!isNaN(numTuan) && numTuan >= numTu && numTuan <= numDen) {
                idNKS.push(x.id);

                let strTu = x.tu_ngay ? x.tu_ngay.split('-').reverse().join('/') : '';
                let strDen = x.den_ngay ? x.den_ngay.split('-').reverse().join('/') : '';

                if (!strTu || !strDen) {
                    let dBatDau = new Date('2026-09-07T00:00:00');
                    dBatDau.setDate(dBatDau.getDate() + (numTuan - 1) * 7);
                    let dKetThuc = new Date(dBatDau);
                    dKetThuc.setDate(dKetThuc.getDate() + 6);
                    strTu = dBatDau.toISOString().split('T')[0].split('-').reverse().join('/');
                    strDen = dKetThuc.toISOString().split('T')[0].split('-').reverse().join('/');
                }

                let textTuan = x.tuan_hoc;
                if (strTu && strDen) textTuan += `<br><span style="font-size:10px; color:#6c757d; font-weight:normal;">(${strTu} - ${strDen})</span>`;
                mapTuan[x.id] = textTuan;
            }
        });

        if (idNKS.length === 0) {
            vungKQ.innerHTML = '<div style="text-align:center; color:#dc3545; font-weight:bold; padding:30px;">⚠️ Không tìm thấy dữ liệu trong khoảng tuần này!</div>';
            document.getElementById('tk-tong-so-dong').innerText = 'Tổng số: 0 sự kiện'; return;
        }

        let querySK = _supabase.from('nhat_ky_gvcn_su_kien_hs').select('*').in('id_gvcn_nhat_ky', idNKS).not('nhom_su_kien', 'ilike', 'Giao việc:%').order('ngay_ghi_nhan', { ascending: false });
        if (uidHS) querySK = querySK.eq('uid_hoc_sinh', uidHS);

        const { data: skList, error: errSK } = await querySK;
        if (errSK) throw errSK;

        let ketQuaLoc = skList || [];
        if (!uidHS && tenHSInput) ketQuaLoc = ketQuaLoc.filter(item => (item.ten_hoc_sinh || '').toLowerCase().includes(tenHSInput));

        document.getElementById('tk-tong-so-dong').innerText = `Tổng số: ${ketQuaLoc.length} vi phạm`;

        let hsMap = {};

        // Gom nhóm sự kiện vào từng học sinh và tính tổng điểm trừ
        ketQuaLoc.forEach(sk => {
            let key = sk.uid_hoc_sinh || sk.ten_hoc_sinh;
            if (!hsMap[key]) {
                let hsAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(sk.ten_hoc_sinh)}&background=random&color=fff`;
                if (window.DanhSachHocSinhLopHienTai) {
                    let hsObj = window.DanhSachHocSinhLopHienTai.find(h => h.uid === sk.uid_hoc_sinh || h.tenHienThi === sk.ten_hoc_sinh);
                    if (hsObj) hsAvatar = hsObj.avatarUrl;
                }
                hsMap[key] = { ten: sk.ten_hoc_sinh, avatar: hsAvatar, tongDiem: 0, dsLoi: [] };
            }
            hsMap[key].dsLoi.push(sk);
            let d = parseFloat(sk.thong_tin_mo_rong?.diem_tru) || 0;
            hsMap[key].tongDiem += d;
        });

        // Bổ sung những học sinh không có lỗi vào bảng (nếu không lọc tên)
        if (window.DanhSachHocSinhLopHienTai) {
            window.DanhSachHocSinhLopHienTai.forEach(hs => {
                if (uidHS && hs.uid !== uidHS) return;
                if (!uidHS && tenHSInput && !hs.tenHienThi.toLowerCase().includes(tenHSInput)) return;

                let key = hs.uid;
                if (!hsMap[key]) {
                    hsMap[key] = { ten: hs.tenHienThi, avatar: hs.avatarUrl, tongDiem: 0, dsLoi: [] };
                }
            });
        }

        let arrHS = Object.values(hsMap);
        if (arrHS.length === 0) {
            vungKQ.innerHTML = '<div style="text-align:center; color:#6c757d; font-style:italic; padding:30px;">Không tìm thấy học sinh nào khớp với điều kiện lọc.</div>';
            return;
        }

        // Lưu dữ liệu vào cache để sắp xếp
        window.gvcn_ThongKeDataCache = arrHS;
        window.gvcn_MapTuanCache = mapTuan;

        // Gọi hàm vẽ giao diện với điều kiện Sort mặc định (A-Z)
        window.ham_21_47b_sort_bang_thong_ke('ten');

    } catch (e) {
        vungKQ.innerHTML = `<div style="color:red; text-align:center; font-weight:bold;">❌ Lỗi thống kê: ${e.message}</div>`;
    }
};


// =====================================================================
// HÀM 21.47B: HÀM BỔ TRỢ ĐỂ SẮP XẾP VÀ VẼ LẠI BẢNG THỐNG KÊ
// =====================================================================
window.ham_21_47b_sort_bang_thong_ke = function (col) {
    const vungKQ = document.getElementById('gvcn-vung-ket-qua-tk');
    if (!vungKQ || !window.gvcn_ThongKeDataCache || window.gvcn_ThongKeDataCache.length === 0) return;

    let arrHS = [...window.gvcn_ThongKeDataCache];
    let mapTuan = window.gvcn_MapTuanCache || {};

    // 1. Cập nhật trạng thái Sort
    if (window.gvcn_ThongKeSortState.col === col) {
        window.gvcn_ThongKeSortState.asc = !window.gvcn_ThongKeSortState.asc;
    } else {
        window.gvcn_ThongKeSortState.col = col;
        window.gvcn_ThongKeSortState.asc = true;
    }

    let isAsc = window.gvcn_ThongKeSortState.asc;

    // 2. Logic sắp xếp
    arrHS.sort((a, b) => {
        if (col === 'ten') {
            let tenA = a.ten.split(' ').pop().toLowerCase();
            let tenB = b.ten.split(' ').pop().toLowerCase();
            return isAsc ? tenA.localeCompare(tenB, 'vi') : tenB.localeCompare(tenA, 'vi');
        } else if (col === 'diem') {
            return isAsc ? a.tongDiem - b.tongDiem : b.tongDiem - a.tongDiem;
        }
        return 0;
    });

    // Helper tạo mũi tên sắp xếp
    const arrow = (c) => {
        if (window.gvcn_ThongKeSortState.col !== c) return ' ↕️';
        return isAsc ? ' 🔼' : ' 🔽';
    };

    // 3. Vẽ cấu trúc bảng
    let htmlTable = `
        <style>
            #bang-in-thong-ke th { cursor: pointer; transition: background 0.2s; user-select: none; }
            #bang-in-thong-ke th:hover { background: #e9ecef; }
        </style>
        <table id="bang-in-thong-ke" style="width:100%; border-collapse:collapse; font-size:12px; background:#fff; border:1px solid #dee2e6;">
            <tr style="background:#f3e8ff; color:#6f42c1; border-bottom:2px solid #6f42c1;">
                <th style="padding:10px 4px; border:1px solid #dee2e6; text-align:center; width:30px;">STT</th>
                <th onclick="window.ham_21_47b_sort_bang_thong_ke('ten')" style="padding:10px 6px; border:1px solid #dee2e6; text-align:left; width:150px;">Học sinh${arrow('ten')}</th>
                
                <!-- 🌟 THÊM CỘT TỔNG ĐIỂM TRỪ VÀO ĐÂY VÀ GẮN SỰ KIỆN SORT -->
                <th onclick="window.ham_21_47b_sort_bang_thong_ke('diem')" style="padding:10px 6px; border:1px solid #dee2e6; text-align:center; width:65px; color:#dc3545;">Tổng Trừ${arrow('diem')}</th>
                
                <th style="padding:10px 2px; border:1px solid #dee2e6; text-align:center; width:80px;">Tuần</th>
                <th style="padding:10px 2px; border:1px solid #dee2e6; text-align:center; width:65px;">Ngày</th>
                <th style="padding:10px 6px; border:1px solid #dee2e6; text-align:left;">Sự kiện / Lỗi vi phạm</th>
                <th style="padding:10px 2px; border:1px solid #dee2e6; text-align:center; width:40px;">Điểm</th>
                <th style="padding:10px 2px; border:1px solid #dee2e6; text-align:center; width:65px;">Ảnh Lỗi</th>
                <th style="padding:10px 6px; border:1px solid #dee2e6; text-align:left; width:120px;">Khắc phục</th>
                <th style="padding:10px 2px; border:1px solid #dee2e6; text-align:center; width:65px;">Tiến độ</th>
                <th style="padding:10px 2px; border:1px solid #dee2e6; text-align:center; width:70px;">Ảnh Phạt</th>
            </tr>
    `;

    let stt = 1;
    arrHS.forEach(hs => {

        if (hs.dsLoi.length === 0) {
            htmlTable += `
                <tr style="background:#e8f5e9; border-bottom:2px solid #28a745;">
                    <td style="padding:10px 4px; border:1px solid #dee2e6; text-align:center; font-weight:bold; color:#155724;">${stt}</td>
                    <td style="padding:10px 6px; border:1px solid #dee2e6; vertical-align:middle; background:#e8f5e9;">
                        <div style="display:flex; align-items:flex-start; gap:8px;">
                            <img src="${hs.avatar}" style="width:30px; height:30px; border-radius:50%; object-fit:cover; border:2px solid #28a745;">
                            <b style="color:#155724; font-size:13px; line-height:30px;">${hs.ten}</b>
                        </div>
                    </td>
                    <td style="padding:10px 6px; border:1px solid #dee2e6; text-align:center; font-weight:bold; color:#28a745; font-size:14px;">0</td>
                    <td colspan="8" style="padding:10px; border:1px solid #dee2e6; text-align:center; font-weight:bold; color:#28a745; font-size:13px;">
                        🌟 TỐT (Không ghi nhận vi phạm nào)
                    </td>
                </tr>
            `;
            stt++;
            return;
        }

        let rowSpan = hs.dsLoi.length;
        hs.dsLoi.sort((a, b) => new Date(a.ngay_ghi_nhan) - new Date(b.ngay_ghi_nhan));

        hs.dsLoi.forEach((sk, idx) => {
            let tuanHienThi = mapTuan[sk.id_gvcn_nhat_ky] || '...';
            let strNgay = sk.ngay_ghi_nhan ? sk.ngay_ghi_nhan.split('-').reverse().join('/') : '';
            let diemTru = sk.thong_tin_mo_rong?.diem_tru || 0;
            let mauDiem = parseFloat(diemTru) < 0 ? '#dc3545' : (parseFloat(diemTru) > 0 ? '#28a745' : '#495057');

            let htmlAnhLoi = '';
            let mangAnhLoi = sk.thong_tin_mo_rong?.danh_sach_anh_minh_chung || [];
            if (mangAnhLoi.length > 0) {
                htmlAnhLoi = `<div style="display:flex; gap:2px; flex-wrap:wrap; justify-content:center;">`;
                mangAnhLoi.forEach(link => {
                    let srcTN = window.ham_21_25_get_thumbnail_drive ? window.ham_21_25_get_thumbnail_drive(link, 'w100') : link;
                    htmlAnhLoi += `<a href="${link}" target="_blank"><img src="${srcTN}" style="width:22px; height:22px; object-fit:cover; border-radius:3px; border:1px solid #ccc;"></a>`;
                });
                htmlAnhLoi += `</div>`;
            }

            let xlObj = sk.thong_tin_mo_rong?.xu_ly;
            let khacPhucHtml = '<span style="color:#adb5bd; font-size:10px;">-</span>';
            let xlHtml = '<span style="color:#adb5bd; font-size:10px;">-</span>';
            let htmlAnhPhat = '<span style="color:#adb5bd; font-size:10px;">-</span>';

            if (xlObj) {
                khacPhucHtml = `<b style="color:#d35400;">${xlObj.hinh_thuc || ''}</b><div style="font-size:10px; color:#555; margin-top:2px;">${xlObj.noi_dung || ''}</div>`;

                let isDone = xlObj.trang_thai === 'Đã hoàn thành';
                let isPartial = xlObj.trang_thai === 'Đã nộp 1 phần';
                let bgXl = isDone ? '#d4edda' : (isPartial ? '#cce5ff' : '#fff3cd');
                let colXl = isDone ? '#155724' : (isPartial ? '#004085' : '#856404');
                let textXl = isDone ? 'Đã xong' : (isPartial ? '1 phần' : 'Chưa xong');

                xlHtml = `<div style="background:${bgXl}; color:${colXl}; padding:4px 2px; border-radius:4px; font-size:10px; font-weight:bold; border:1px solid ${bgXl};">${textXl}</div>`;

                if (xlObj.anh_minh_chung && xlObj.anh_minh_chung.length > 0) {
                    htmlAnhPhat = `<div style="display:flex; gap:2px; flex-wrap:wrap; justify-content:center;">`;
                    xlObj.anh_minh_chung.forEach(link => {
                        let srcTN = window.ham_21_25_get_thumbnail_drive ? window.ham_21_25_get_thumbnail_drive(link, 'w100') : link;
                        htmlAnhPhat += `<a href="${link}" target="_blank"><img src="${srcTN}" style="width:22px; height:22px; object-fit:cover; border-radius:3px; border:1px solid #28a745;"></a>`;
                    });
                    htmlAnhPhat += `</div>`;
                }
            }

            let cotHocSinh = '';
            // Gộp hàng (rowspan) cho cột Tên và cột Tổng Điểm
            if (idx === 0) {
                cotHocSinh = `
                    <td rowspan="${rowSpan}" style="padding:10px 4px; border:1px solid #dee2e6; text-align:center; font-weight:bold; background:#fffafb;">${stt}</td>
                    <td rowspan="${rowSpan}" style="padding:10px 6px; border:1px solid #dee2e6; background:#fffafb; vertical-align:top;">
                        <div style="display:flex; align-items:flex-start; gap:6px;">
                            <img src="${hs.avatar}" style="width:30px; height:30px; border-radius:50%; object-fit:cover; border:2px solid #e83e8c;">
                            <b style="color:#e83e8c; font-size:12px;">${hs.ten}</b>
                        </div>
                    </td>
                    <td rowspan="${rowSpan}" style="padding:10px 6px; border:1px solid #dee2e6; text-align:center; font-weight:bold; font-size:14px; color:#dc3545; background:#fffafb; vertical-align:middle;">
                        ${hs.tongDiem}
                    </td>
                `;
            }

            // CSS cho border bottom
            let isLastRow = (idx === hs.dsLoi.length - 1);
            let borderStyle = isLastRow ? 'border-bottom: 2px solid #e83e8c;' : 'border-bottom: 1px dashed #dee2e6;';

            htmlTable += `
                <tr style="${borderStyle}">
                    ${cotHocSinh}
                    <td style="padding:6px 2px; border:1px solid #dee2e6; text-align:center; font-weight:bold; color:#6f42c1; line-height:1.3; font-size:11px;">${tuanHienThi}</td>
                    <td style="padding:6px 2px; border:1px solid #dee2e6; text-align:center; font-size:11px;">${strNgay}</td>
                    <td style="padding:8px 6px; border:1px solid #dee2e6;"><b>${sk.nhom_su_kien || ''}</b> <div style="font-size:11px; color:#555; margin-top:3px;">${sk.noi_dung_chi_tiet || ''}</div></td>
                    <td style="padding:6px 2px; border:1px solid #dee2e6; text-align:center; font-weight:bold; color:${mauDiem};">${diemTru !== 0 ? diemTru : '-'}</td>
                    <td style="padding:6px 2px; border:1px solid #dee2e6; text-align:center;">${htmlAnhLoi}</td>
                    <td style="padding:6px; border:1px solid #dee2e6; line-height:1.3;">${khacPhucHtml}</td>
                    <td style="padding:6px 2px; border:1px solid #dee2e6; text-align:center;">${xlHtml}</td>
                    <td style="padding:6px 2px; border:1px solid #dee2e6; text-align:center;">${htmlAnhPhat}</td>
                </tr>
            `;
        });
        stt++;
    });

    htmlTable += `</table>`;
    vungKQ.innerHTML = htmlTable;
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
// HÀM 21.51: MỞ POPUP CẬP NHẬT TIẾN ĐỘ (CÓ NÚT XÓA ẢNH CŨ AN TOÀN)
// =====================================================================
window.ham_21_51_mo_popup_cap_nhat_xu_ly = function (blockId) {
    let block = document.querySelector(`.khoi-su-kien-hs[data-block-id="${blockId}"]`);
    if (!block) return;

    let hsGhep = block.querySelector('.sk-hs').value || 'Học sinh chưa có tên';
    let tenHS = hsGhep.split('-')[0].trim();
    let hsAvatar = block.querySelector('.avatar-preview').src;

    let tienDoObj = block.dataset.tienDo ? JSON.parse(block.dataset.tienDo) : { trang_thai: 'Chưa hoàn thành', anh_minh_chung: [] };
    let ttHienTai = tienDoObj.trang_thai || 'Chưa hoàn thành';

    let subRows = block.querySelectorAll('.sub-dong-loi');
    let htmlListLoi = ''; let tongDiem = 0;
    subRows.forEach(sr => {
        let ngay = sr.querySelector('.sk-ngay').value;
        let buoi = sr.querySelector('.sk-buoi').value;
        let loi = sr.querySelector('.sk-loi').value;
        let diem = parseFloat(sr.querySelector('.sk-diem-tru').value) || 0;
        let khacPhuc = sr.querySelector('.sk-khac-phuc').value.trim();
        tongDiem += diem;

        htmlListLoi += `
        <div style="padding:6px 0; border-bottom:1px dashed #eee;">
            <div style="display:flex; justify-content:space-between; font-size:12px;">
                <span><b style="color:#6c757d;">[${ngay.split('-').reverse().join('/')} - ${buoi}]</b> <span style="color:#d35400; font-weight:bold;">${loi || '(Chưa nhập lỗi)'}</span></span>
                <span style="color:#dc3545; font-weight:bold; min-width:25px; text-align:right;">${diem}</span>
            </div>
            <div style="color:#e83e8c; font-size:11px; margin-top:3px; padding-left:10px; border-left:2px solid #fce4ec;">↳ Yêu cầu phạt: <b>${khacPhuc || '<i style="color:#ccc;">Chưa có yêu cầu phạt</i>'}</b></div>
        </div>`;
    });

    let modal = document.createElement('div');
    modal.id = 'modal-xu-ly-gvcn-block';
    modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); z-index:99999; display:flex; justify-content:center; align-items:center; backdrop-filter:blur(3px); animation:fadeIn 0.2s;';

    window.danhSachAnhPhatGVCN = [];

    modal.innerHTML = `
        <div style="background:#fff; width:90%; max-width:500px; padding:20px; border-radius:8px; box-shadow:0 10px 25px rgba(0,0,0,0.3);">
            <h3 style="margin-top:0; color:#0056b3; border-bottom:1px dashed #eee; padding-bottom:10px; display:flex; align-items:center; gap:8px;">
                <span>🛠️</span> Cập nhật tiến độ khắc phục
            </h3>
            
            <div style="display:flex; gap:15px; background:#f8f9fa; padding:12px; border-radius:8px; border:1px solid #dee2e6; margin-bottom:15px;">
                <img src="${hsAvatar}" style="width:55px; height:55px; border-radius:50%; object-fit:cover; border:2px solid #0056b3;">
                <div style="flex:1; font-size:13px; color:#495057;">
                    <div style="font-weight:bold; font-size:15px; color:#0056b3; margin-bottom:6px;">${tenHS}</div>
                    <div style="background:#fff; padding:6px; border-radius:4px; border:1px solid #ced4da; margin-bottom:6px; max-height:120px; overflow-y:auto;">
                        <b style="font-size:11px; color:#666;">Danh sách lỗi & Hình phạt:</b>
                        ${htmlListLoi}
                        <div style="text-align:right; font-weight:bold; color:#dc3545; font-size:11px; margin-top:4px;">Tổng điểm trừ: ${tongDiem}</div>
                    </div>
                </div>
            </div>

            <div style="margin-bottom:15px;">
                <label style="font-weight:bold; font-size:13px; color:#d35400;">Trạng thái tiến độ chung:</label>
                <div style="display:flex; gap:15px; margin-top:8px;">
                    <label style="font-size:13px; cursor:pointer; display:flex; align-items:center; gap:4px;"><input type="radio" name="trang_thai_phat" value="Chưa hoàn thành" ${ttHienTai === 'Chưa hoàn thành' ? 'checked' : ''}> ⏳ Chưa xong</label>
                    <label style="font-size:13px; cursor:pointer; display:flex; align-items:center; gap:4px;"><input type="radio" name="trang_thai_phat" value="Đã nộp 1 phần" ${ttHienTai === 'Đã nộp 1 phần' ? 'checked' : ''}> 🔄 Nộp 1 phần</label>
                    <label style="font-size:13px; cursor:pointer; display:flex; align-items:center; gap:4px;"><input type="radio" name="trang_thai_phat" value="Đã hoàn thành" ${ttHienTai === 'Đã hoàn thành' ? 'checked' : ''}> ✅ Xong tất cả</label>
                </div>
            </div>

            <div style="margin-bottom:20px;">
                <label style="font-weight:bold; font-size:13px; color:#28a745;">📸 Ảnh nộp phạt / Khắc phục (Thêm ảnh mới):</label>
                <div style="display:flex; gap:10px; margin-top:5px; align-items:flex-start;">
                    <button type="button" onclick="document.getElementById('gvcn-input-anh-phat-chung').click()" style="padding:8px 12px; background:#e0f7fa; border:1px dashed #00acc1; color:#00838f; border-radius:4px; cursor:pointer; font-weight:bold; display:flex; flex-direction:column; align-items:center;">
                        <span style="font-size:20px;">📷</span> Thêm ảnh
                    </button>
                    <input type="file" id="gvcn-input-anh-phat-chung" accept="image/*" multiple style="display:none;" onchange="window.ham_21_52_chon_anh_phat_gvcn(this)">
                    <div id="gvcn-vung-preview-anh-phat" style="flex:1; display:flex; gap:5px; flex-wrap:wrap; min-height:55px; border:1px dashed #ccc; padding:5px; border-radius:4px; align-items:center; background:#f8f9fa;">
                        <span style="color:#adb5bd; font-size:12px; font-style:italic;">(Chưa chọn ảnh mới)</span>
                    </div>
                </div>
            </div>
            
            ${(tienDoObj.anh_minh_chung && tienDoObj.anh_minh_chung.length > 0) ? `
            <div style="margin-bottom:20px; border-top: 1px dashed #eee; padding-top:10px;">
                <label style="font-weight:bold; font-size:12px; color:#6c757d;">🖼️ Ảnh khắc phục đã lưu trước đó:</label>
                <div style="display:flex; gap:6px; margin-top:6px; overflow-x:auto;">
                    ${tienDoObj.anh_minh_chung.map(link => {
        let fileId = null;
        if (link.includes('/d/')) { let m = link.match(/\/d\/([a-zA-Z0-9_-]+)/); if (m) fileId = m[1]; }
        else if (link.includes('id=')) { let m = link.match(/id=([a-zA-Z0-9_-]+)/); if (m) fileId = m[1]; }
        let srcTN = fileId ? `https://drive.google.com/thumbnail?id=${fileId}&sz=w150` : link;

        // Cấu trúc HTML có kèm nút ✖
        return `
                        <div style="position:relative; margin-bottom:2px; display:inline-block;">
                            <a href="${link}" target="_blank" title="Xem ảnh nộp phạt"><img src="${srcTN}" style="width:45px; height:45px; object-fit:cover; border-radius:4px; border:1px solid #ccc; box-shadow:0 1px 2px rgba(0,0,0,0.1);"></a>
                            <button type="button" onclick="event.stopPropagation(); window.ham_21_58_xoa_anh_phat_cu('${blockId}', '${link}', this);" style="position:absolute; top:-6px; right:-6px; background:#dc3545; color:#fff; border:none; border-radius:50%; width:16px; height:16px; font-size:10px; cursor:pointer; display:flex; align-items:center; justify-content:center; box-shadow:0 1px 2px rgba(0,0,0,0.3);" title="Xóa ảnh cũ này">✖</button>
                        </div>`;
    }).join('')}
                </div>
                <div style="font-size:11px; color:#dc3545; margin-top:6px; font-style:italic;">(Lưu ý: Sau khi xóa ảnh cũ, cần bấm [LƯU BẢNG] để gỡ hoàn toàn khỏi CSDL)</div>
            </div>` : ''}

            <div style="display:flex; justify-content:flex-end; gap:10px; border-top:1px solid #eee; padding-top:15px;">
                <button onclick="document.body.removeChild(this.closest('#modal-xu-ly-gvcn-block'))" style="padding:8px 15px; background:#6c757d; color:#fff; border:none; border-radius:4px; font-weight:bold; cursor:pointer;">Đóng</button>
                <button onclick="window.ham_21_53_luu_trang_thai_xu_ly('${blockId}', this)" style="padding:8px 20px; background:#28a745; color:#fff; border:none; border-radius:4px; font-weight:bold; cursor:pointer;">💾 Xác nhận Tiến độ</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
};







// =====================================================================
// HÀM 21.52: XỬ LÝ ẢNH NỘP PHẠT TRONG POPUP (KÍCH HOẠT CẮT / NÉN ẢNH)
// =====================================================================
window.ham_21_52_chon_anh_phat_gvcn = async function (inputElem) {
    const files = Array.from(inputElem.files);
    if (files.length === 0) return;

    // 🌟 CHUYỂN HƯỚNG ẢNH QUA HỆ THỐNG CẮT/NÉN CHUNG TRƯỚC KHI LƯU
    let processedFiles = files;

    // Tìm hàm cắt ảnh đang chạy trong hệ thống của thầy (Khối 21, Khối 20 hoặc Hàm Hỗ trợ)
    if (typeof window.ham_21_25_xu_ly_mang_anh_dau_vao === 'function') {
        processedFiles = await window.ham_21_25_xu_ly_mang_anh_dau_vao(files);
    } else if (typeof window.ham_ho_tro_xu_ly_mang_anh_dau_vao === 'function') {
        processedFiles = await window.ham_ho_tro_xu_ly_mang_anh_dau_vao(files);
    } else if (typeof window.ham_20_25_xu_ly_mang_anh_dau_vao === 'function') {
        processedFiles = await window.ham_20_25_xu_ly_mang_anh_dau_vao(files);
    }

    // Nạp ảnh đã cắt/nén vào mảng RAM
    if (!window.danhSachAnhPhatGVCN) window.danhSachAnhPhatGVCN = [];
    window.danhSachAnhPhatGVCN.push(...processedFiles);

    // Vẽ lại ảnh lên popup
    if (typeof window.ham_21_52b_render_anh_phat_gvcn === 'function') {
        window.ham_21_52b_render_anh_phat_gvcn();
    }

    // Reset input file để chọn lại ảnh đó không bị kẹt
    inputElem.value = '';
};

// =====================================================================
// HÀM 21.52B: VẼ DANH SÁCH ẢNH NỘP PHẠT ĐÃ CHỌN LÊN POPUP
// =====================================================================
window.ham_21_52b_render_anh_phat_gvcn = function () {
    const vungHienThi = document.getElementById('gvcn-vung-preview-anh-phat');
    if (!vungHienThi) return;

    if (!window.danhSachAnhPhatGVCN || window.danhSachAnhPhatGVCN.length === 0) {
        vungHienThi.innerHTML = '<span style="color:#adb5bd; font-size:12px; font-style:italic;">(Chưa có ảnh nộp phạt)</span>';
        return;
    }

    let html = '';
    window.danhSachAnhPhatGVCN.forEach((file, index) => {
        let url = URL.createObjectURL(file);
        html += `
        <div style="position:relative; display:inline-block; margin-right:8px; margin-bottom:8px; animation: fadeIn 0.3s;">
            <img src="${url}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px; border: 1px solid #28a745; box-shadow: 0 1px 3px rgba(0,0,0,0.1);" title="Ảnh minh chứng">
            <button type="button" onclick="window.danhSachAnhPhatGVCN.splice(${index}, 1); window.ham_21_52b_render_anh_phat_gvcn();" style="position:absolute; top:-6px; right:-6px; background:#dc3545; color:#fff; border:none; border-radius:50%; width:20px; height:20px; font-size:12px; cursor:pointer; box-shadow: 0 1px 3px rgba(0,0,0,0.3); display:flex; align-items:center; justify-content:center;" title="Xóa ảnh">✖</button>
        </div>`;
    });
    vungHienThi.innerHTML = html;
};





window.ham_21_53_luu_trang_thai_xu_ly = async function (blockId, btnLuu) {
    let block = document.querySelector(`.khoi-su-kien-hs[data-block-id="${blockId}"]`);
    if (!block) return;

    let trangThaiMoi = document.querySelector('input[name="trang_thai_phat"]:checked').value;
    let tienDoObj = block.dataset.tienDo ? JSON.parse(block.dataset.tienDo) : { anh_minh_chung: [] };

    const oldText = btnLuu.innerHTML; const oldBg = btnLuu.style.background;
    btnLuu.innerHTML = "⏳ Đang tải..."; btnLuu.disabled = true;

    try {
        let mangLinkMoi = [];
        if (window.danhSachAnhPhatGVCN && window.danhSachAnhPhatGVCN.length > 0) {
            const ngayThucTe = new Date().toISOString().split('T')[0];
            const d = new Date(); const timeStr = `${d.getHours()}h${d.getMinutes()}m`;
            let tongSoAnh = window.danhSachAnhPhatGVCN.length;

            for (let k = 0; k < tongSoAnh; k++) {
                let f = window.danhSachAnhPhatGVCN[k];
                let b64 = await window.ham_ho_tro_doc_anh_base64(f);
                let duoiFile = f.name.includes('.') ? f.name.substring(f.name.lastIndexOf('.')) : '.jpg';
                let tenFile = `NopPhat_[${ngayThucTe}_${timeStr}]_Anh[${k + 1}]${duoiFile}`;
                let payload = { action: "upload_anh_nhat_ky_gvcn", base64: b64, mimeType: f.type, fileName: tenFile, maLop: "CHUNG", loaiAnh: "NOP_PHAT" };

                let res = await window.ham_ho_tro_upload_anh_co_tien_trinh(
                    CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, payload,
                    (phanTram) => {
                        btnLuu.style.background = `linear-gradient(90deg, #218838 ${phanTram}%, #6c757d ${phanTram}%)`;
                        btnLuu.innerHTML = `🚀 Đang tải ảnh (${k + 1}/${tongSoAnh}) (${phanTram}%)`;
                    }
                );
                if (res && res.status === 'success') mangLinkMoi.push(res.url);
            }
        }

        tienDoObj.trang_thai = trangThaiMoi;
        if (trangThaiMoi === 'Đã hoàn thành') tienDoObj.ngay_hoan_thanh = new Date().toISOString().split('T')[0];
        tienDoObj.anh_minh_chung = (tienDoObj.anh_minh_chung || []).concat(mangLinkMoi);

        block.dataset.tienDo = JSON.stringify(tienDoObj);

        let subRows = block.querySelectorAll('.sub-dong-loi');
        let vungTienDo = block.querySelector('.vung-tien-do-chung');
        if (vungTienDo) vungTienDo.innerHTML = window.ham_21_tao_html_tien_do_chung(tienDoObj, blockId, subRows.length);

        document.body.removeChild(document.getElementById('modal-xu-ly-gvcn-block'));

        let xnLuuDB = confirm("✅ Đã ghi nhận Tiến độ lên Giao diện Bảng!\n\n👉 Để hệ thống tự động cấy Tiến độ này vào từng lỗi lẻ dưới Cơ sở dữ liệu, thầy CẦN BẤM LƯU BẢNG.\nThầy có muốn Tự động Lưu Bảng ngay bây giờ không?");
        if (xnLuuDB) {
            let nutLuuBang = document.querySelector('button[onclick*="ham_21_15_luu_su_kien_tuan_truoc"]');
            if (nutLuuBang) nutLuuBang.click();
        }
    } catch (e) {
        console.error(e); alert("❌ Lỗi: " + e.message);
        btnLuu.style.background = oldBg; btnLuu.innerHTML = oldText; btnLuu.disabled = false;
    }
};












// =====================================================================
// HÀM 21.54: GOM NHÓM LỖI (ĐÃ BỎ AUTO-SAVE, GIỮ NGUYÊN BẢNG LỒNG ĐỂ THAO TÁC)
// =====================================================================
window.ham_21_54_gom_nhom_loi_hoc_sinh = async function () {
    let khuVuc = document.getElementById('gvcn-khu-vuc-su-kien-nhanh');
    if (!khuVuc) return;

    let rows = Array.from(khuVuc.querySelectorAll('.dong-nhap-su-kien'));
    if (rows.length === 0) {
        alert("⚠️ Bảng đang trống, không có sự kiện nào để gộp!");
        return;
    }

    let mapHS = {};
    rows.forEach(r => {
        let hsTextarea = r.querySelector('.sk-hs');
        if (!hsTextarea) return;
        let hs = hsTextarea.value.trim();
        if (!hs) return;
        if (!mapHS[hs]) mapHS[hs] = [];
        mapHS[hs].push(r);
    });

    let hasGrouped = false;
    let tongSoLoiXoa = 0;

    for (let hs in mapHS) {
        let arr = mapHS[hs];
        if (arr.length > 1) {
            hasGrouped = true;

            arr.sort((a, b) => {
                let d1 = new Date(a.querySelector('.sk-ngay').value).getTime();
                let d2 = new Date(b.querySelector('.sk-ngay').value).getTime();
                return d1 - d2;
            });

            let firstRow = arr[0];
            let combinedLoiText = [];
            let totalDiem = 0;
            let combinedAnhArr = [];
            let danhSachGop = [];

            let htmlColThoiGian = ''; let htmlColLoi = ''; let htmlColDiem = ''; let htmlColAnh = '';

            arr.forEach((r, idx) => {
                let ngay = r.querySelector('.sk-ngay').value;
                let thu = r.querySelector('.sk-thu').value;
                let buoi = r.querySelector('.sk-buoi').value;
                let dObj = new Date(ngay);
                let dateStr = !isNaN(dObj.getTime()) ? dObj.getDate().toString().padStart(2, '0') + '/' + (dObj.getMonth() + 1).toString().padStart(2, '0') : ngay;

                let loi = r.querySelector('.sk-loi').value.trim();
                let diem = parseFloat(r.querySelector('.sk-diem-tru').value) || 0;
                let anhData = r.dataset.mangAnhDong ? JSON.parse(r.dataset.mangAnhDong) : [];

                danhSachGop.push({
                    id: r.dataset.id || null,
                    ngay: ngay, thu: thu, buoi: buoi,
                    loi: loi, diem: diem, anh: anhData
                });

                combinedLoiText.push(`[${dateStr} - ${buoi}]: ${loi}`);
                totalDiem += diem;
                combinedAnhArr = combinedAnhArr.concat(anhData);

                let anhMiniHtml = '';
                anhData.forEach(imgObj => {
                    let srcImg = imgObj.b64;
                    if (imgObj.type === 'url') {
                        let m = srcImg.match(/\/d\/([a-zA-Z0-9_-]+)/);
                        if (m) srcImg = `https://drive.google.com/thumbnail?id=${m[1]}&sz=w50`;
                    }
                    anhMiniHtml += `<img src="${srcImg}" style="width:24px; height:24px; object-fit:cover; border-radius:3px; border:1px solid #adb5bd; cursor:pointer; margin:1px; box-shadow: 0 1px 2px rgba(0,0,0,0.1);" title="Xem ảnh">`;
                });

                const cellStyle = "height: 50px; display: flex; align-items: center; border-bottom: 1px dashed #fce4ec; box-sizing: border-box; overflow-y: auto; padding: 4px;";
                htmlColThoiGian += `<div style="${cellStyle} justify-content: center; flex-direction: column; line-height: 1.3;"><b style="color:#e83e8c; font-size:11px;">${dateStr}</b><span style="font-size:10px; color:#6c757d;">${buoi}</span></div>`;
                htmlColLoi += `<div style="${cellStyle} font-size: 11px; color: #495057;"><span>${loi}</span></div>`;
                htmlColDiem += `<div style="${cellStyle} font-size: 11px; font-weight: bold; color: #dc3545; justify-content: center;">${diem ? diem : '-'}</div>`;
                htmlColAnh += `<div style="${cellStyle} justify-content: center; align-content: center; flex-wrap: wrap;">${anhMiniHtml || '<span style="color:#ccc; font-size:10px;">-</span>'}</div>`;

                if (idx > 0) {
                    r.remove();
                    tongSoLoiXoa++;
                }
            });

            const footerStyle = "height: 30px; display: flex; align-items: center; background: #fffcf8; font-weight: bold; box-sizing: border-box; padding: 4px;";
            htmlColThoiGian += `<div style="${footerStyle} justify-content: center; font-size: 11px; color: #e83e8c;">🗜️ GỘP</div>`;
            htmlColLoi += `<div style="${footerStyle} justify-content: flex-end; font-size: 11px; color: #d35400;">TỔNG ĐIỂM TRỪ:</div>`;
            htmlColDiem += `<div style="${footerStyle} justify-content: center; font-size: 12px; color: #dc3545;">${totalDiem ? totalDiem : ''}</div>`;
            htmlColAnh += `<div style="${footerStyle} justify-content: center; font-size: 11px; color: #666;">${combinedAnhArr.length > 0 ? combinedAnhArr.length + ' 📷' : ''}</div>`;

            let colThoiGian = firstRow.children[1];
            let colLoi = firstRow.children[2];
            let colDiem = firstRow.children[3];
            let colAnh = firstRow.children[4];

            let firstNgay = colThoiGian.querySelector('.sk-ngay').value;
            let firstThu = colThoiGian.querySelector('.sk-thu').value;
            let firstBuoi = colThoiGian.querySelector('.sk-buoi').value;

            colThoiGian.innerHTML = `
                <input type="text" class="sk-ngay" style="display:none;" value="${firstNgay}">
                <input type="text" class="sk-thu" style="display:none;" value="${firstThu}">
                <input type="text" class="sk-buoi" style="display:none;" value="${firstBuoi}">
                <div style="display:flex; flex-direction:column; border: 1px solid #e83e8c; border-radius: 4px; background: #fffafb; width: 100%; box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);">${htmlColThoiGian}</div>
            `;
            colLoi.innerHTML = `
                <textarea class="sk-loi" style="display:none;">${combinedLoiText.join('\n')}</textarea>
                <div style="display:flex; flex-direction:column; border: 1px solid #e83e8c; border-radius: 4px; background: #fffafb; width: 100%; box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);">${htmlColLoi}</div>
            `;
            colDiem.innerHTML = `
                <input type="number" class="sk-diem-tru" style="display:none;" value="${totalDiem}">
                <div style="display:flex; flex-direction:column; border: 1px solid #e83e8c; border-radius: 4px; background: #fffafb; width: 100%; box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);">${htmlColDiem}</div>
            `;

            colAnh.innerHTML = `
                <div style="display:flex; width:100%; margin-bottom:4px; justify-content:center;">
                    <button type="button" class="btn-anh-sk-dong" onclick="event.stopPropagation(); this.nextElementSibling.click()" style="padding: 2px 6px; background: #e0f7fa; color: #00838f; border: 1px dashed #00acc1; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight:bold;">📷</button>
                    <input type="file" accept="image/*" class="input-anh-sk-dong" style="display:none;" onchange="if(typeof window.ham_21_33_chon_anh_sk_dong === 'function') window.ham_21_33_chon_anh_sk_dong(this)">
                </div>
                <div class="vung-preview-anh-sk-dong" style="display:flex; gap:2px; flex-wrap:wrap; margin-bottom:4px; justify-content:center;"></div>
                <div style="display:flex; flex-direction:column; border: 1px solid #e83e8c; border-radius: 4px; background: #fffafb; width: 100%; box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);">${htmlColAnh}</div>
            `;

            firstRow.dataset.mangAnhDong = JSON.stringify(combinedAnhArr);
            firstRow.dataset.danhSachGop = JSON.stringify(danhSachGop);
        }
    }

    if (hasGrouped) {
        alert(`✅ Đã gộp thành công ${tongSoLoiXoa} dòng vi phạm của học sinh lên giao diện!\n\n👉 Thầy hãy kiểm tra, đánh dấu "Yêu cầu khắc phục" chung, rồi bấm [LƯU BẢNG SỰ KIỆN] thủ công để hoàn tất nhé!`);
    } else {
        alert("ℹ️ Mỗi học sinh hiện tại chỉ có 1 dòng vi phạm, không có gì trùng lặp để gộp!");
    }
};






// =====================================================================
// HÀM 21.57: BẬT / TẮT CHẾ ĐỘ SỬA NHANH (MẶC ĐỊNH KHÓA)
// =====================================================================
window.gvcn_ChoPhepSuaNhanh = false; // 🌟 Đã chuyển sang Mặc định KHÓA

window.ham_21_57_toggle_che_do_sua = function (btn) {
    window.gvcn_ChoPhepSuaNhanh = !window.gvcn_ChoPhepSuaNhanh; // Đảo trạng thái

    if (window.gvcn_ChoPhepSuaNhanh) {
        btn.innerHTML = '🔓 Đang MỞ chế độ sửa nhanh';
        btn.style.background = '#ffc107';
        btn.style.color = '#000';
        btn.title = 'Bấm để KHÓA không cho ghi đè dữ liệu';
    } else {
        btn.innerHTML = '🔒 Đang KHÓA sửa nhanh';
        btn.style.background = '#6c757d';
        btn.style.color = '#fff';
        btn.title = 'Bấm để MỞ KHÓA ghi đè dữ liệu';

        // Tự động Gỡ bỏ trạng thái đang chọn của tất cả các dòng
        document.querySelectorAll('.dong-nhap-su-kien').forEach(d => {
            d.classList.remove('dong-dang-chon');
            d.style.boxShadow = 'none';
            d.style.border = '1px solid #ced4da';
        });
    }
};






// =====================================================================
// HÀM 21.58: XỬ LÝ XÓA ẢNH PHẠT CŨ (CẬP NHẬT TRỰC TIẾP LÊN DOM)
// =====================================================================
window.ham_21_58_xoa_anh_phat_cu = function (blockId, linkAnhCanXoa, btnElem) {
    let block = document.querySelector(`.khoi-su-kien-hs[data-block-id="${blockId}"]`);
    if (block && block.dataset.tienDo) {
        let tienDoObj = JSON.parse(block.dataset.tienDo);

        // 1. Lọc bỏ link ảnh khỏi mảng dữ liệu
        if (tienDoObj.anh_minh_chung) {
            tienDoObj.anh_minh_chung = tienDoObj.anh_minh_chung.filter(link => link !== linkAnhCanXoa);

            // 2. Gán lại vào khối dữ liệu
            block.dataset.tienDo = JSON.stringify(tienDoObj);

            // 3. Ẩn ảnh vừa xóa khỏi Popup
            btnElem.closest('div').remove();

            // 4. Vẽ lại ngay lập tức cột Tiến độ trên Bảng gốc (Bên ngoài)
            let subRows = block.querySelectorAll('.sub-dong-loi');
            let vungTienDo = block.querySelector('.vung-tien-do-chung');
            if (vungTienDo && typeof window.ham_21_tao_html_tien_do_chung === 'function') {
                vungTienDo.innerHTML = window.ham_21_tao_html_tien_do_chung(tienDoObj, blockId, subRows.length);
            }
        }
    }
};


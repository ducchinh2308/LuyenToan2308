// =====================================================================
// KHỐI 22: QUẢN LÝ HỒ SƠ LỚP HỌC (CHỦ NHIỆM & BỘ MÔN)
// Thiết kế: Dynamic Tabs (Tạo danh mục động) dựa trên Database
// =====================================================================

window.qlhs_MaLopHienTai = '';
window.qlhs_DanhSachDanhMuc = [];
window.qlhs_TabDangChon = null;

// =====================================================================
// HÀM 22.1: MỞ GIAO DIỆN CHÍNH
// =====================================================================
window.ham_22_1_mo_giao_dien_quan_ly_lop = function () {
    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
    if (!vungLamViec) return;

    vungLamViec.innerHTML = `
        <div style="padding: 10px; animation: fadeIn 0.3s ease-in-out;">
            
            <!-- HEADER -->
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #007bff; padding-bottom: 12px; margin-bottom: 20px;">
                <h3 style="color: #007bff; margin: 0; text-transform: uppercase; display: flex; align-items: center; gap: 10px; font-size: 20px;">
                    👥 QUẢN LÝ HỒ SƠ LỚP HỌC
                </h3>
                <div style="display: flex; gap: 10px;">
                    <button onclick="ham_3_1_ve_dashboard_admin()" style="padding: 8px 15px; background: #6c757d; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.15);">⬅️ Quay lại</button>
                </div>
            </div>

            <!-- CHỌN LỚP -->
            <div style="background: #e6f2ff; padding: 15px 25px; border-radius: 8px; border: 1px solid #b8daff; margin-bottom: 20px; display: flex; align-items: center; gap: 15px; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
                <label style="font-weight: bold; font-size: 15px; color: #0056b3; white-space: nowrap;">🏫 CHỌN LỚP:</label>
                <input id="qlhs-input-lop" list="dl-lop" placeholder="Gõ tên hoặc chọn lớp..." onchange="window.ham_22_2_tai_du_lieu_lop()" style="flex: 1; max-width: 400px; padding: 10px; border: 2px solid #007bff; border-radius: 6px; font-weight: bold; font-size: 15px; outline: none; color: #0056b3;">
                <datalist id="dl-lop"></datalist>
            </div>

            <!-- VÙNG TABS DANH MỤC -->
            <div id="qlhs-vung-tabs" style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px; border-bottom: 2px solid #dee2e6; padding-bottom: 10px;">
                <span style="color:#6c757d; font-style:italic; padding:10px;">Vui lòng chọn lớp để tải danh sách hồ sơ...</span>
            </div>

            <!-- VÙNG NỘI DUNG CỦA TAB ĐƯỢC CHỌN -->
            <div id="qlhs-vung-noi-dung-tab" style="background: #fff; border-radius: 10px; border: 1px solid #dee2e6; box-shadow: 0 4px 10px rgba(0,0,0,0.03); min-height: 400px; padding: 25px;">
                <div style="text-align:center; color:#adb5bd; font-size:15px; padding:50px;">
                    Chưa có dữ liệu hiển thị.
                </div>
            </div>

        </div>
    `;

    // Gọi lại hàm mượn từ Khối 20 để tự động tải danh sách lớp vào datalist
    if (typeof window.ham_20_7_tai_danh_sach_lop === 'function') {
        // Tạm mượn ID nk-input-lop để hàm 20.7 chạy đúng (vì hàm 20.7 có thể đang bám vào ID cứng)
        let oLop = document.getElementById('qlhs-input-lop');
        oLop.id = 'nk-input-lop';
        window.ham_20_7_tai_danh_sach_lop();
        oLop.id = 'qlhs-input-lop'; // Trả lại ID cho khối 22
    }
};

// =====================================================================
// HÀM 22.2: TẢI DANH MỤC (TABS) TỪ DATABASE DỰA THEO MÃ LỚP
// =====================================================================
window.ham_22_2_tai_du_lieu_lop = async function () {
    const inputLop = document.getElementById('qlhs-input-lop');
    if (!inputLop || !inputLop.value) return;

    let rawLop = inputLop.value.trim();
    window.qlhs_MaLopHienTai = rawLop.match(/\(([^)]+)\)$/) ? rawLop.match(/\(([^)]+)\)$/)[1].trim() : rawLop;

    const vungTabs = document.getElementById('qlhs-vung-tabs');
    vungTabs.innerHTML = `<span style="color:#007bff; font-weight:bold; padding:10px;">⏳ Đang tải danh mục hồ sơ...</span>`;
    document.getElementById('qlhs-vung-noi-dung-tab').innerHTML = '';

    try {
        const { data, error } = await _supabase
            .from('ho_so_danh_muc_lop')
            .select('*')
            .eq('ma_lop', window.qlhs_MaLopHienTai)
            .order('thu_tu', { ascending: true });

        if (error) throw error;

        window.qlhs_DanhSachDanhMuc = data || [];
        window.ham_22_3_ve_thanh_tabs();

    } catch (e) {
        console.error("Lỗi tải danh mục lớp:", e);
        vungTabs.innerHTML = `<span style="color:red; font-weight:bold; padding:10px;">❌ Lỗi: ${e.message}</span>`;
    }
};

// =====================================================================
// HÀM 22.3: VẼ THANH TABS NGANG VÀ NÚT THÊM DANH MỤC
// =====================================================================
window.ham_22_3_ve_thanh_tabs = function () {
    const vungTabs = document.getElementById('qlhs-vung-tabs');
    if (!vungTabs) return;

    let html = '';

    // Icon đại diện theo từng kiểu giao diện
    const getIcon = (kieu) => {
        if (kieu === 'IMAGE_FILE') return '🗺️';
        if (kieu === 'FINANCE') return '💰';
        if (kieu === 'STUDENT_LIST') return '🧑‍🎓';
        if (kieu === 'CUSTOM_TABLE') return '📋';
        return '📝'; // TEXT_NOTE
    };

    window.qlhs_DanhSachDanhMuc.forEach(tab => {
        let isSelected = window.qlhs_TabDangChon === tab.id;
        let bg = isSelected ? '#007bff' : '#f8f9fa';
        let color = isSelected ? '#fff' : '#495057';
        let border = isSelected ? '#0056b3' : '#ced4da';

        html += `
            <button onclick="window.ham_22_5_chon_tab('${tab.id}')" 
                style="padding: 10px 20px; background: ${bg}; color: ${color}; border: 1px solid ${border}; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 14px; transition: 0.2s; box-shadow: ${isSelected ? '0 4px 6px rgba(0,123,255,0.3)' : '0 1px 2px rgba(0,0,0,0.05)'};">
                ${getIcon(tab.kieu_giao_dien)} ${tab.ten_danh_muc}
            </button>
        `;
    });

    // Nút Thêm Danh Mục mới
    html += `
        <button onclick="window.ham_22_4_mo_modal_them_danh_muc()" 
            style="padding: 10px 20px; background: #fff; color: #28a745; border: 2px dashed #28a745; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 14px; transition: 0.2s;" 
            onmouseover="this.style.background='#e8f5e9'" onmouseout="this.style.background='#fff'">
            ➕ Thêm Mục Mới
        </button>
    `;

    vungTabs.innerHTML = html;

    // Tự động chọn Tab đầu tiên nếu có mà chưa chọn
    if (window.qlhs_DanhSachDanhMuc.length > 0 && !window.qlhs_TabDangChon) {
        window.ham_22_5_chon_tab(window.qlhs_DanhSachDanhMuc[0].id);
    }
};

// =====================================================================
// HÀM 22.4: MỞ POPUP TẠO DANH MỤC MỚI
// =====================================================================
window.ham_22_4_mo_modal_them_danh_muc = function () {
    let modal = document.getElementById('qlhs-modal-them-dm');
    if (modal) modal.remove();

    modal = document.createElement('div');
    modal.id = 'qlhs-modal-them-dm';
    modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); display:flex; align-items:center; justify-content:center; z-index:999999; backdrop-filter: blur(2px); animation: fadeIn 0.2s;';

    modal.innerHTML = `
        <div style="background:#fff; width:450px; padding:25px; border-radius:12px; box-shadow:0 10px 30px rgba(0,0,0,0.4); position:relative;">
            <h3 style="margin-top:0; color:#28a745; border-bottom:2px solid #c3e6cb; padding-bottom:10px;">➕ TẠO DANH MỤC HỒ SƠ MỚI</h3>
            
            <div style="margin-bottom:15px;">
                <label style="font-weight:bold; font-size:13px; color:#495057;">Tên danh mục (Tab):</label>
                <input type="text" id="qlhs-dm-ten" placeholder="VD: Sơ đồ lớp, Quỹ học kỳ 1, Lý lịch..." style="width:100%; padding:10px; border:2px solid #28a745; border-radius:6px; margin-top:5px; box-sizing:border-box; font-weight:bold; outline:none;">
            </div>

            <div style="margin-bottom:20px;">
                <label style="font-weight:bold; font-size:13px; color:#495057;">Chọn Loại giao diện hiển thị:</label>
                <select id="qlhs-dm-kieu" style="width:100%; padding:10px; border:1px solid #ced4da; border-radius:6px; margin-top:5px; box-sizing:border-box; font-size:14px; outline:none; cursor:pointer;">
                    <option value="IMAGE_FILE">🗺️ Chứa Ảnh / File đính kèm (Dùng cho Sơ đồ, Nội quy...)</option>
                    <option value="FINANCE">💰 Bảng Kế toán Thu / Chi (Dùng cho Quỹ lớp, Quỹ môn...)</option>
                    <option value="STUDENT_LIST">🧑‍🎓 Danh sách Học sinh (Dùng cho Lý lịch, Ghi chú HS...)</option>
                    <option value="CUSTOM_TABLE">📋 Bảng tùy chọn (Dùng cho DS Giáo viên bộ môn, Cán sự...)</option>
                    <option value="TEXT_NOTE">📝 Soạn thảo Văn bản (Dùng cho Kế hoạch năm học...)</option>
                </select>
                <div style="font-size:11px; color:#6c757d; margin-top:6px; font-style:italic;">*Mỗi loại giao diện sẽ có bộ tính năng quản lý mốc thời gian (Giai đoạn) riêng biệt.</div>
            </div>

            <div style="display:flex; justify-content:flex-end; gap:10px; border-top:1px solid #eee; padding-top:15px;">
                <button onclick="document.getElementById('qlhs-modal-them-dm').remove()" style="padding:10px 20px; background:#6c757d; color:white; border:none; border-radius:6px; cursor:pointer; font-weight:bold;">Hủy bỏ</button>
                <button onclick="window.ham_22_5_luu_danh_muc_moi()" style="padding:10px 25px; background:#28a745; color:white; border:none; border-radius:6px; cursor:pointer; font-weight:bold; box-shadow:0 2px 4px rgba(40,167,69,0.3);">💾 Lưu & Tạo mới</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    document.getElementById('qlhs-dm-ten').focus();
};

// =====================================================================
// HÀM 22.5: THỰC THI LƯU DANH MỤC MỚI VÀO CSDL
// =====================================================================
window.ham_22_5_luu_danh_muc_moi = async function () {
    const tenDM = document.getElementById('qlhs-dm-ten').value.trim();
    const kieuDM = document.getElementById('qlhs-dm-kieu').value;

    if (!tenDM) {
        alert("⚠️ Vui lòng nhập Tên danh mục!");
        return;
    }

    try {
        let thuTuMoi = window.qlhs_DanhSachDanhMuc.length + 1;

        const { data, error } = await _supabase.from('ho_so_danh_muc_lop').insert([{
            ma_lop: window.qlhs_MaLopHienTai,
            ten_danh_muc: tenDM,
            kieu_giao_dien: kieuDM,
            thu_tu: thuTuMoi,
            du_lieu_json: [] // Khởi tạo mảng Giai đoạn trống
        }]).select();

        if (error) throw error;

        document.getElementById('qlhs-modal-them-dm').remove();

        // Tự động Focus vào Tab vừa tạo
        if (data && data.length > 0) {
            window.qlhs_TabDangChon = data[0].id;
        }

        // Tải lại danh sách
        window.ham_22_2_tai_du_lieu_lop();

    } catch (e) {
        console.error(e);
        alert("❌ Lỗi tạo danh mục: " + e.message);
    }
};

// =====================================================================
// HÀM 22.6: KHI BẤM CHỌN MỘT TAB, CHUYỂN ĐỔI GIAO DIỆN TƯƠNG ỨNG
// =====================================================================
window.ham_22_5_chon_tab = function (idDanhMuc) {
    window.qlhs_TabDangChon = idDanhMuc;
    window.ham_22_3_ve_thanh_tabs(); // Đổi màu tab

    const tabData = window.qlhs_DanhSachDanhMuc.find(t => t.id === idDanhMuc);
    if (!tabData) return;

    const vungNoiDung = document.getElementById('qlhs-vung-noi-dung-tab');

    // Nơi đây sẽ là Bộ định tuyến (Router) chuyển sang các hàm vẽ UI cụ thể
    // Hiện tại em đặt Placeholder để test luồng
    vungNoiDung.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px dashed #ccc; padding-bottom:15px; margin-bottom:20px;">
            <h3 style="margin:0; color:#0056b3;">${tabData.ten_danh_muc}</h3>
            
            <div style="display:flex; gap:10px; align-items:center; background:#f8f9fa; padding:5px 10px; border-radius:6px; border:1px solid #dee2e6;">
                <span style="font-size:12px; font-weight:bold; color:#495057;">Giai đoạn:</span>
                <select style="padding:6px; border-radius:4px; border:1px solid #ccc; outline:none; font-size:12px; font-weight:bold; cursor:pointer;">
                    <option value="">-- Chưa có giai đoạn nào --</option>
                </select>
                <button style="padding:6px 12px; background:#28a745; color:#fff; border:none; border-radius:4px; font-size:12px; font-weight:bold; cursor:pointer;">➕ Giai đoạn mới</button>
            </div>
        </div>

        <div style="text-align:center; padding:50px;">
            <div style="font-size:40px; margin-bottom:15px;">⏳</div>
            <div style="font-size:18px; color:#6c757d; font-weight:bold;">Giao diện "${tabData.kieu_giao_dien}" đang được chuẩn bị...</div>
            <div style="font-size:13px; color:#adb5bd; margin-top:10px;">ID Danh mục: ${tabData.id}</div>
        </div>
    `;
};
// =====================================================================
// KHỐI 22: QUẢN LÝ HỒ SƠ LỚP HỌC (CHỦ NHIỆM & BỘ MÔN)
// Thiết kế: Dynamic Tabs (Tạo danh mục động) dựa trên Database
// =====================================================================

window.qlhs_MaLopHienTai = '';
window.qlhs_DanhSachDanhMuc = [];
window.qlhs_TabDangChon = null;
window.qlhs_SortGiaiDoan_ImageFile = window.qlhs_SortGiaiDoan_ImageFile || 'desc';

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

    if (typeof window.ham_20_7_tai_danh_sach_lop === 'function') {
        let oLop = document.getElementById('qlhs-input-lop');
        oLop.id = 'nk-input-lop';
        window.ham_20_7_tai_danh_sach_lop();
        oLop.id = 'qlhs-input-lop';
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
    const getIcon = (kieu) => {
        if (kieu === 'IMAGE_FILE') return '🗺️';
        if (kieu === 'FINANCE') return '💰';
        if (kieu === 'STUDENT_LIST') return '🧑‍🎓';
        if (kieu === 'CUSTOM_TABLE') return '📋';
        return '📝';
    };

    window.qlhs_DanhSachDanhMuc.forEach(tab => {
        let isSelected = window.qlhs_TabDangChon === tab.id;
        let bg = isSelected ? '#007bff' : '#f8f9fa';
        let color = isSelected ? '#fff' : '#495057';
        let border = isSelected ? '#0056b3' : '#ced4da';

        html += `
            <button onclick="window.ham_22_6_chon_tab('${tab.id}')" 
                style="padding: 10px 20px; background: ${bg}; color: ${color}; border: 1px solid ${border}; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 14px; transition: 0.2s; box-shadow: ${isSelected ? '0 4px 6px rgba(0,123,255,0.3)' : '0 1px 2px rgba(0,0,0,0.05)'};">
                ${getIcon(tab.kieu_giao_dien)} ${tab.ten_danh_muc}
            </button>
        `;
    });

    html += `
        <button onclick="window.ham_22_4_mo_modal_them_danh_muc()" 
            style="padding: 10px 20px; background: #fff; color: #28a745; border: 2px dashed #28a745; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 14px; transition: 0.2s;" 
            onmouseover="this.style.background='#e8f5e9'" onmouseout="this.style.background='#fff'">
            ➕ Thêm Mục Mới
        </button>
    `;

    vungTabs.innerHTML = html;

    if (window.qlhs_DanhSachDanhMuc.length > 0 && !window.qlhs_TabDangChon) {
        window.ham_22_6_chon_tab(window.qlhs_DanhSachDanhMuc[0].id);
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
            du_lieu_json: []
        }]).select();

        if (error) throw error;

        document.getElementById('qlhs-modal-them-dm').remove();

        if (data && data.length > 0) {
            window.qlhs_TabDangChon = data[0].id;
        }

        window.ham_22_2_tai_du_lieu_lop();

    } catch (e) {
        console.error(e);
        alert("❌ Lỗi tạo danh mục: " + e.message);
    }
};

// =====================================================================
// HÀM 22.6: BỘ ĐỊNH TUYẾN CHUYỂN ĐỔI GIAO DIỆN (RENAMED TỪ 22.5)
// =====================================================================
window.ham_22_6_chon_tab = function (idDanhMuc) {
    window.qlhs_TabDangChon = idDanhMuc;
    window.ham_22_3_ve_thanh_tabs();

    const tabData = window.qlhs_DanhSachDanhMuc.find(t => t.id === idDanhMuc);
    if (!tabData) return;

    const vungNoiDung = document.getElementById('qlhs-vung-noi-dung-tab');

    let mangGiaiDoan = [];
    try {
        if (typeof tabData.du_lieu_json === 'string') {
            mangGiaiDoan = JSON.parse(tabData.du_lieu_json);
        } else if (Array.isArray(tabData.du_lieu_json)) {
            mangGiaiDoan = tabData.du_lieu_json;
        }
    } catch (e) { console.error("Lỗi parse JSON:", e); }

    vungNoiDung.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px dashed #ccc; padding-bottom:15px; margin-bottom:20px; flex-wrap: wrap; gap: 10px;">
            <div style="display:flex; align-items:center; gap: 10px;">
                <h3 style="margin:0; color:#0056b3;">${tabData.ten_danh_muc}</h3>
                <button onclick="alert('Tính năng đổi tên Tab đang hoàn thiện!')" style="background:none; border:none; color:#adb5bd; cursor:pointer; font-size:12px;" title="Đổi tên danh mục">✏️ Sửa</button>
            </div>
            
            <div style="display:flex; gap:10px; align-items:center; background:#f8f9fa; padding:5px 10px; border-radius:6px; border:1px solid #dee2e6;">
                <button onclick="window.ham_22_7_mo_modal_them_giai_doan('${tabData.id}')" style="padding:8px 15px; background:#28a745; color:#fff; border:none; border-radius:4px; font-size:13px; font-weight:bold; cursor:pointer; transition: 0.2s; box-shadow: 0 2px 4px rgba(40,167,69,0.3);" onmouseover="this.style.background='#218838'" onmouseout="this.style.background='#28a745'">➕ Tạo Mốc Giai Đoạn Mới</button>
            </div>
        </div>

        <div id="qlhs-vung-giao-dien-chi-tiet"></div>
    `;

    const vungChiTiet = document.getElementById('qlhs-vung-giao-dien-chi-tiet');

    if (mangGiaiDoan.length === 0) {
        vungChiTiet.innerHTML = `
            <div style="text-align:center; padding:50px;">
                <div style="font-size:40px; margin-bottom:15px;">📂</div>
                <div style="font-size:18px; color:#6c757d; font-weight:bold;">Danh mục này chưa có dữ liệu!</div>
                <div style="font-size:13px; color:#adb5bd; margin-top:10px;">Bấm "➕ Tạo Mốc Giai Đoạn Mới" ở góc trên để bắt đầu nạp hồ sơ.</div>
            </div>
        `;
        return;
    }

    if (tabData.kieu_giao_dien === 'IMAGE_FILE') {
        window.ham_22_10_ve_giao_dien_anh_file(tabData, mangGiaiDoan);
    } else {
        vungChiTiet.innerHTML = `
            <div style="text-align:center; padding:50px;">
                <div style="font-size:40px; margin-bottom:15px;">⏳</div>
                <div style="font-size:18px; color:#6c757d; font-weight:bold;">Giao diện "${tabData.kieu_giao_dien}" đang được chuẩn bị...</div>
            </div>
        `;
    }
};

// =====================================================================
// HÀM 22.7: MỞ POPUP TẠO GIAI ĐOẠN MỚI (CHỌN NGÀY)
// =====================================================================
window.ham_22_7_mo_modal_them_giai_doan = function (idDanhMuc) {
    let modal = document.getElementById('qlhs-modal-them-gd');
    if (modal) modal.remove();

    const today = new Date().toISOString().split('T')[0];
    let idMoi = 'GD_' + new Date().getTime() + '_' + Math.floor(Math.random() * 1000);

    modal = document.createElement('div');
    modal.id = 'qlhs-modal-them-gd';
    modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); display:flex; align-items:center; justify-content:center; z-index:999999; backdrop-filter: blur(2px); animation: fadeIn 0.2s;';

    modal.innerHTML = `
        <div style="background:#fff; width:450px; padding:25px; border-radius:12px; box-shadow:0 10px 30px rgba(0,0,0,0.4); position:relative;">
            <h3 style="margin-top:0; color:#17a2b8; border-bottom:2px solid #b8daff; padding-bottom:10px;">➕ TẠO MỐC GIAI ĐOẠN MỚI</h3>
            
            <div style="margin-bottom:15px; font-size:13px; color:#6c757d; background:#e9ecef; padding:10px; border-radius:6px; line-height:1.5;">
                Việc tạo Giai đoạn giúp Thầy/Cô lưu trữ lại lịch sử thay đổi của dữ liệu theo thời gian (Ví dụ: Sơ đồ lớp Học kỳ 1, Sơ đồ lớp Học kỳ 2).
            </div>

            <div style="margin-bottom:15px;">
                <label style="font-weight:bold; font-size:13px; color:#495057;">Tên mốc giai đoạn (*):</label>
                <input type="text" id="qlhs-gd-ten" placeholder="VD: Áp dụng từ Tháng 10, Học kỳ 2..." style="width:100%; padding:10px; border:2px solid #17a2b8; border-radius:6px; margin-top:5px; box-sizing:border-box; font-weight:bold; outline:none;">
            </div>
            
            <div style="margin-bottom:20px;">
                <label style="font-weight:bold; font-size:13px; color:#495057;">Ngày áp dụng (*):</label>
                <input type="date" id="qlhs-gd-ngay" value="${today}" style="width:100%; padding:10px; border:1px solid #ced4da; border-radius:6px; margin-top:5px; box-sizing:border-box; font-weight:bold; color:#0056b3; outline:none; cursor:pointer;">
            </div>

            <div style="display:flex; justify-content:flex-end; gap:10px; border-top:1px solid #eee; padding-top:15px;">
                <button onclick="document.getElementById('qlhs-modal-them-gd').remove()" style="padding:10px 20px; background:#6c757d; color:white; border:none; border-radius:6px; cursor:pointer; font-weight:bold;">Hủy bỏ</button>
                <button onclick="window.ham_22_8_luu_giai_doan_moi('${idDanhMuc}', '${idMoi}')" style="padding:10px 25px; background:#17a2b8; color:white; border:none; border-radius:6px; cursor:pointer; font-weight:bold; box-shadow:0 2px 4px rgba(23,162,184,0.3);">💾 Lưu Giai Đoạn</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    document.getElementById('qlhs-gd-ten').focus();
};

// =====================================================================
// HÀM 22.8: LƯU GIAI ĐOẠN MỚI VÀO MẢNG JSON CỦA DANH MỤC
// =====================================================================
window.ham_22_8_luu_giai_doan_moi = async function (idDanhMuc, idGiaiDoanMoi) {
    const tenGD = document.getElementById('qlhs-gd-ten').value.trim();
    const ngayGD = document.getElementById('qlhs-gd-ngay').value;

    if (!tenGD) {
        alert("⚠️ Vui lòng nhập Tên mốc giai đoạn!");
        return;
    }
    if (!ngayGD) {
        alert("⚠️ Vui lòng chọn Ngày áp dụng!");
        return;
    }

    try {
        const tabData = window.qlhs_DanhSachDanhMuc.find(t => t.id === idDanhMuc);
        if (!tabData) throw new Error("Không tìm thấy danh mục trong bộ nhớ tạm.");

        let mangGiaiDoan = [];
        if (typeof tabData.du_lieu_json === 'string') {
            mangGiaiDoan = JSON.parse(tabData.du_lieu_json || '[]');
        } else if (Array.isArray(tabData.du_lieu_json)) {
            mangGiaiDoan = [...tabData.du_lieu_json];
        }

        let objMoi = {
            id: idGiaiDoanMoi,
            tenGiaiDoan: tenGD,
            ngayTao: ngayGD,
            duLieu: {}
        };

        mangGiaiDoan.push(objMoi);

        const { error } = await _supabase
            .from('ho_so_danh_muc_lop')
            .update({ du_lieu_json: mangGiaiDoan })
            .eq('id', idDanhMuc);

        if (error) throw error;

        document.getElementById('qlhs-modal-them-gd').remove();
        tabData.du_lieu_json = mangGiaiDoan;

        window.ham_22_6_chon_tab(idDanhMuc);

    } catch (e) {
        console.error(e);
        alert("❌ Lỗi lưu giai đoạn: " + e.message);
    }
};

// =====================================================================
// HÀM 22.13: ĐẢO CHIỀU SẮP XẾP BẢNG GIAI ĐOẠN
// =====================================================================
window.ham_22_13_dao_chieu_sort = function (idDanhMuc) {
    window.qlhs_SortGiaiDoan_ImageFile = window.qlhs_SortGiaiDoan_ImageFile === 'desc' ? 'asc' : 'desc';
    window.ham_22_6_chon_tab(idDanhMuc); // Vẽ lại UI
};

// =====================================================================
// HÀM 22.10: RENDER GIAO DIỆN BẢNG CHỨA ẢNH / FILE (HIỂN THỊ RỘNG TỐI ĐA)
// =====================================================================
window.ham_22_10_ve_giao_dien_anh_file = function (tabData, mangGiaiDoan) {
    const vungChiTiet = document.getElementById('qlhs-vung-giao-dien-chi-tiet');
    if (!vungChiTiet) return;

    let dsRender = [...mangGiaiDoan];
    let heSo = window.qlhs_SortGiaiDoan_ImageFile === 'desc' ? -1 : 1;

    dsRender.sort((a, b) => {
        let dA = new Date(a.ngayTao || 0).getTime();
        let dB = new Date(b.ngayTao || 0).getTime();
        return (dA - dB) * heSo;
    });

    let nhanNutSort = window.qlhs_SortGiaiDoan_ImageFile === 'desc' ? '⬇ Mới nhất xếp trước' : '⬆ Cũ nhất xếp trước';

    let htmlTable = `
        <div style="overflow-x: auto; border: 1px solid #dee2e6; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
            <table style="width: 100%; border-collapse: collapse; background: white; font-size: 14px;">
                <thead style="background: #eef2f7; border-bottom: 2px solid #dee2e6;">
                    <tr>
                        <th style="padding: 12px 15px; border: 1px solid #eee; width: 220px; text-align: left;">
                            <div style="display:flex; flex-direction: column; gap: 8px;">
                                <span style="color:#0056b3;">🕒 Mốc thời gian</span>
                                <button onclick="window.ham_22_13_dao_chieu_sort('${tabData.id}')" style="background:#fff; border:1px solid #adb5bd; border-radius:4px; padding:4px 8px; font-size:11px; cursor:pointer; font-weight:bold; color:#495057; transition:0.2s;" onmouseover="this.style.background='#e9ecef'" onmouseout="this.style.background='#fff'" title="Đảo chiều sắp xếp">
                                    ${nhanNutSort}
                                </button>
                            </div>
                        </th>
                        <th style="padding: 12px 15px; border: 1px solid #eee; text-align: center; color:#0056b3;">🖼️ Ảnh / File Nội dung</th>
                        <th style="padding: 12px 15px; border: 1px solid #eee; width: 140px; text-align:center; color:#0056b3;">⚙️ Thao tác</th>
                    </tr>
                </thead>
                <tbody>
    `;

    dsRender.forEach(gd => {
        let dsFile = gd.duLieu.danhSachFile || [];
        let fileHtml = '';

        if (dsFile.length === 0) {
            fileHtml = `<span style="color:#adb5bd; font-style:italic; font-size: 13px;">Mốc này chưa có tệp đính kèm.</span>`;
        } else {
            // 🌟 Sắp xếp ảnh thành 1 cột thẳng đứng, mỗi ảnh chiếm 100% chiều ngang
            fileHtml = `<div style="display: flex; flex-direction: column; gap: 20px; width: 100%;">`;
            dsFile.forEach((f, idx) => {
                let isImg = f.name.toLowerCase().match(/\.(jpg|jpeg|png|gif|webp)$/i);
                let preview = isImg ? f.url : '📄';

                // 🌟 Đổi size thumbnail lên w2000 để ảnh bung ngang không bị mờ nhòe
                if (isImg && f.url.includes('drive.google.com')) {
                    const idMatch = f.url.match(/\/d\/([a-zA-Z0-9_-]+)/) || f.url.match(/id=([a-zA-Z0-9_-]+)/);
                    if (idMatch) preview = `https://drive.google.com/thumbnail?id=${idMatch[1]}&sz=w2000`;
                }

                // 🌟 width:100% và height:auto giúp ảnh tự động giãn rộng ra đến tối đa cột
                let displayThumb = isImg
                    ? `<img src="${preview}" style="width:100%; height:auto; border-radius: 6px; border: 1px solid #dee2e6; display: block; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">`
                    : `<div style="width:100%; padding: 40px 0; display:flex; flex-direction: column; align-items:center; justify-content:center; background:#f1f3f4; border-radius: 6px; border: 1px solid #dee2e6;"><div style="font-size:50px; margin-bottom:10px;">${preview}</div><div style="font-size:16px; color:#495057; font-weight:bold;">${f.name}</div></div>`;

                fileHtml += `
                    <div style="position: relative; width: 100%; animation: fadeIn 0.3s; background: #fff; padding: 10px; border: 1px solid #e9ecef; border-radius: 8px;">
                        <a href="${f.url}" target="_blank" style="text-decoration:none; color:inherit; display:block; transition:0.2s;" onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='1'" title="Nhấn để mở file gốc trên trình duyệt">
                            ${displayThumb}
                        </a>
                        <button onclick="window.ham_22_12_xoa_file_ho_so('${tabData.id}', '${gd.id}', ${idx})" style="position:absolute; top: 20px; right: 20px; background:#dc3545; color:#fff; border:none; border-radius:50%; width:30px; height:30px; font-size:14px; cursor:pointer; box-shadow:0 2px 4px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; z-index: 10;" title="Xóa file">✖</button>
                        ${isImg ? `<div style="font-size: 14px; color: #495057; text-align: center; margin-top: 10px; font-weight:bold;">${f.name}</div>` : ''}
                    </div>
                `;
            });
            fileHtml += `</div>`;
        }

        let ngayTaoStr = '';
        if (gd.ngayTao) {
            let d = new Date(gd.ngayTao);
            if (!isNaN(d.getTime())) ngayTaoStr = d.toLocaleDateString('vi-VN');
            else ngayTaoStr = gd.ngayTao;
        }

        htmlTable += `
            <tr style="border-bottom: 1px solid #eee; transition: 0.2s;" onmouseover="this.style.background='#fdfdfd'" onmouseout="this.style.background='transparent'">
                <td style="padding: 15px; border: 1px solid #eee; vertical-align: top; background: #fafafa;">
                    <div style="font-weight: bold; color: #28a745; font-size: 15px; margin-bottom: 6px;">${gd.tenGiaiDoan}</div>
                    <div style="font-size: 12px; color: #6c757d; display:flex; align-items:center; gap:5px;">📅 ${ngayTaoStr}</div>
                </td>
                <td style="padding: 15px; border: 1px solid #eee; vertical-align: top; text-align: center;">
                    ${fileHtml}
                </td>
                <td style="padding: 15px; border: 1px solid #eee; vertical-align: top; text-align: center;">
                    <button type="button" onclick="this.nextElementSibling.click()" style="padding:8px 12px; background:#007bff; color:#fff; border:none; border-radius:6px; cursor:pointer; font-weight:bold; font-size: 12px; transition: 0.2s; white-space: nowrap; box-shadow: 0 2px 4px rgba(0,123,255,0.2);" onmouseover="this.style.background='#0056b3'" onmouseout="this.style.background='#007bff'">
                        ☁️ Tải thêm file
                    </button>
                    <!-- File input được ẩn đi, chỉ kích hoạt khi bấm nút trên -->
                    <input type="file" multiple style="display:none;" onchange="window.ham_22_11_upload_file_ho_so(this, '${tabData.id}', '${gd.id}')">
                </td>
            </tr>
        `;
    });

    htmlTable += `</tbody></table></div>`;
    vungChiTiet.innerHTML = htmlTable;
};

// =====================================================================
// HÀM 22.11: XỬ LÝ UPLOAD (ĐỒNG BỘ 100% VỚI API upload_file_ho_so_lop)
// =====================================================================
window.ham_22_11_upload_file_ho_so = async function (inputElem, idDanhMuc, idGiaiDoan) {
    const files = Array.from(inputElem.files);
    if (files.length === 0) return;

    const btn = inputElem.previousElementSibling;
    const oldText = btn.innerHTML;
    btn.innerHTML = "⏳ Đang chuẩn bị...";
    btn.disabled = true;

    try {
        let imgFiles = files.filter(f => f.type.startsWith('image/'));
        let docFiles = files.filter(f => !f.type.startsWith('image/'));

        let processedImages = [];
        if (imgFiles.length > 0) {
            if (typeof window.ham_ho_tro_xu_ly_mang_anh_dau_vao === 'function') {
                processedImages = await window.ham_ho_tro_xu_ly_mang_anh_dau_vao(imgFiles);
            } else if (typeof window.ham_20_25_xu_ly_mang_anh_dau_vao === 'function') {
                processedImages = await window.ham_20_25_xu_ly_mang_anh_dau_vao(imgFiles);
            } else {
                processedImages = imgFiles;
            }
        }

        if (imgFiles.length > 0 && (!processedImages || processedImages.length === 0)) {
            if (docFiles.length === 0) throw new Error("Thao tác bị hủy.");
        }

        let allFinalFiles = [...processedImages, ...docFiles];
        if (allFinalFiles.length === 0) throw new Error("Thao tác bị hủy.");

        const tabData = window.qlhs_DanhSachDanhMuc.find(t => t.id === idDanhMuc);
        let mangGiaiDoan = typeof tabData.du_lieu_json === 'string' ? JSON.parse(tabData.du_lieu_json || '[]') : tabData.du_lieu_json;
        let gdHienTai = mangGiaiDoan.find(gd => gd.id === idGiaiDoan);

        if (!gdHienTai.duLieu.danhSachFile) gdHienTai.duLieu.danhSachFile = [];

        const ngayThucTe = new Date().toISOString().split('T')[0];
        const timeStr = new Date().getTime().toString().slice(-4);

        const tenDanhMucChuẩn = window.taoTenAnToan ? window.taoTenAnToan(tabData.ten_danh_muc, 30) : tabData.ten_danh_muc.replace(/[\\/:*?"<>| ]/g, "_");

        for (let k = 0; k < allFinalFiles.length; k++) {
            let f = allFinalFiles[k];

            let b64 = await new Promise((resolve, reject) => {
                let reader = new FileReader();
                reader.onload = () => {
                    let res = reader.result;
                    resolve(res.includes(',') ? res.split(',')[1] : res);
                };
                reader.onerror = error => reject(error);
                reader.readAsDataURL(f);
            });

            if (!b64) throw new Error("Không thể đọc được dữ liệu file.");

            let duoiFile = f.name.includes('.') ? f.name.substring(f.name.lastIndexOf('.')) : '';
            let tenGoc = f.name.replace(duoiFile, '').replace(/[\\/:*?"<>| ]/g, "_");
            let tenFileMoi = `HoSo_${window.qlhs_MaLopHienTai}_[${ngayThucTe}_${timeStr}]_${tenGoc}${duoiFile}`;

            btn.innerHTML = `🚀 Đang tải (${k + 1}/${allFinalFiles.length})...`;

            let payload = {
                action: "upload_file_ho_so_lop",
                base64: b64,
                base64Data: b64,
                mimeType: f.type,
                fileName: tenFileMoi,
                maLop: window.qlhs_MaLopHienTai,
                tenDanhMuc: tenDanhMucChuẩn
            };

            let uploadResult;
            if (typeof window.ham_ho_tro_upload_anh_co_tien_trinh === 'function') {
                uploadResult = await window.ham_ho_tro_upload_anh_co_tien_trinh(
                    CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, payload,
                    (phanTram) => {
                        btn.style.background = `linear-gradient(90deg, #218838 ${phanTram}%, #007bff ${phanTram}%)`;
                        btn.innerHTML = `🚀 (${k + 1}/${allFinalFiles.length}) ${phanTram}%`;
                    }
                );
            } else {
                const res = await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
                    method: "POST", body: JSON.stringify(payload)
                });
                uploadResult = await res.json();
            }

            if (uploadResult && uploadResult.status === 'success') {
                gdHienTai.duLieu.danhSachFile.push({
                    name: f.name,
                    url: uploadResult.url,
                    size: (f.size / 1024).toFixed(1),
                    type: f.type
                });
            } else {
                let msg = uploadResult ? uploadResult.message : "Máy chủ không phản hồi đúng định dạng.";
                throw new Error(`Lỗi tải lên file [${f.name}]: ${msg}`);
            }
        }

        btn.style.background = '';
        btn.innerHTML = "⏳ Đang đồng bộ Database...";

        const { error: errUp } = await _supabase.from('ho_so_danh_muc_lop')
            .update({ du_lieu_json: mangGiaiDoan })
            .eq('id', idDanhMuc);

        if (errUp) throw errUp;

        tabData.du_lieu_json = mangGiaiDoan;
        window.ham_22_6_chon_tab(idDanhMuc);

    } catch (e) {
        if (e.message !== "Thao tác bị hủy.") {
            console.error("Lỗi Upload:", e);
            alert("❌ " + e.message);
        }
    } finally {
        inputElem.value = '';
        btn.style.background = '';
        btn.innerHTML = oldText;
        btn.disabled = false;
    }
};

// =====================================================================
// HÀM 22.12: XÓA CỨNG MỘT FILE HỒ SƠ (CẢ TRONG DB VÀ TRÊN GOOGLE DRIVE)
// =====================================================================
window.ham_22_12_xoa_file_ho_so = async function (idDanhMuc, idGiaiDoan, fileIndex) {
    if (!confirm("⚠️ Thầy/Cô có chắc chắn muốn xóa vĩnh viễn tệp này khỏi hồ sơ và dọn sạch trên Google Drive không?")) return;

    try {
        const tabData = window.qlhs_DanhSachDanhMuc.find(t => t.id === idDanhMuc);
        let mangGiaiDoan = typeof tabData.du_lieu_json === 'string' ? JSON.parse(tabData.du_lieu_json || '[]') : tabData.du_lieu_json;
        let gdHienTai = mangGiaiDoan.find(gd => gd.id === idGiaiDoan);

        // 1. Xác định File cần xóa
        let fileCanXoa = gdHienTai.duLieu.danhSachFile[fileIndex];

        // 2. Gửi lệnh xóa lên Google Drive (Nếu có URL)
        if (fileCanXoa && fileCanXoa.url) {
            let url = fileCanXoa.url;
            let fileId = '';

            // Trích xuất File ID từ Link Google Drive
            let matchD = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
            let matchId = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
            let matchOpen = url.match(/\/open\?id=([a-zA-Z0-9_-]+)/);
            if (matchD) fileId = matchD[1]; else if (matchId) fileId = matchId[1]; else if (matchOpen) fileId = matchOpen[1];

            if (fileId) {
                // Hiển thị màn hình chờ Mờ để tránh bấm lung tung khi đang gọi API
                let loadingDiv = document.createElement('div');
                loadingDiv.id = 'loading-xoa-file-22';
                loadingDiv.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(255,255,255,0.8); z-index:99999; display:flex; flex-direction:column; justify-content:center; align-items:center; font-weight:bold; color:#dc3545; font-size:18px;';
                loadingDiv.innerHTML = '<span style="font-size:40px; margin-bottom:10px;">🗑️</span>⏳ Đang xóa tệp gốc trên Google Drive...';
                document.body.appendChild(loadingDiv);

                try {
                    await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
                        method: "POST",
                        body: JSON.stringify({ action: "delete_file", fileId: fileId })
                    });
                } catch (errDrive) {
                    console.error("Lỗi xóa file trên Drive:", errDrive);
                    // Dù Drive có lỗi mạng không xóa được thì vẫn đi tiếp để dọn rác giao diện
                } finally {
                    const lDiv = document.getElementById('loading-xoa-file-22');
                    if (lDiv) lDiv.remove();
                }
            }
        }

        // 3. Rút file khỏi mảng JSON
        gdHienTai.duLieu.danhSachFile.splice(fileIndex, 1);

        // 4. Cập nhật lại vào Supabase
        const { error: errUp } = await _supabase.from('ho_so_danh_muc_lop')
            .update({ du_lieu_json: mangGiaiDoan })
            .eq('id', idDanhMuc);

        if (errUp) throw errUp;

        // 5. Cập nhật RAM và Vẽ lại giao diện
        tabData.du_lieu_json = mangGiaiDoan;
        window.ham_22_6_chon_tab(idDanhMuc);

    } catch (e) {
        alert("❌ Lỗi xóa tệp: " + e.message);
    }
};
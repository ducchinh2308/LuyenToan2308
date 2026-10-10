// =====================================================================
// KHỐI 22: QUẢN LÝ HỒ SƠ LỚP HỌC (CHỦ NHIỆM & BỘ MÔN)
// Kiến trúc 4 Lớp: Lớp -> Hồ sơ lớn -> Chuyên mục con -> Thành phần (Đa định dạng)
// Có tích hợp Full Sửa / Xóa ở mọi cấp độ
// =====================================================================

window.qlhs_MaLopHienTai = '';
window.qlhs_DanhSachDanhMuc = [];
window.qlhs_TabDangChon = null;

// // =====================================================================
// // HÀM 22.1: MỞ GIAO DIỆN CHÍNH
// // =====================================================================
// window.ham_22_1_mo_giao_dien_quan_ly_lop = function () {
//     const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
//     if (!vungLamViec) return;

//     vungLamViec.innerHTML = `
//         <div style="padding: 10px; animation: fadeIn 0.3s ease-in-out;">
//             <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #007bff; padding-bottom: 12px; margin-bottom: 20px;">
//                 <h3 style="color: #007bff; margin: 0; text-transform: uppercase; display: flex; align-items: center; gap: 10px; font-size: 20px;">
//                     👥 SIÊU HỒ SƠ LỚP HỌC
//                 </h3>
//                 <div style="display: flex; gap: 10px;">
//                     <button onclick="ham_3_1_ve_dashboard_admin()" style="padding: 8px 15px; background: #6c757d; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.15);">⬅️ Quay lại</button>
//                 </div>
//             </div>

//             <div style="background: #e6f2ff; padding: 15px 25px; border-radius: 8px; border: 1px solid #b8daff; margin-bottom: 20px; display: flex; align-items: center; gap: 15px; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
//                 <label style="font-weight: bold; font-size: 15px; color: #0056b3; white-space: nowrap;">🏫 CHỌN LỚP:</label>
//                 <input id="qlhs-input-lop" list="dl-lop" placeholder="Gõ tên hoặc chọn lớp..." onchange="window.ham_22_2_tai_du_lieu_lop()" style="flex: 1; max-width: 400px; padding: 10px; border: 2px solid #007bff; border-radius: 6px; font-weight: bold; font-size: 15px; outline: none; color: #0056b3;">
//                 <datalist id="dl-lop"></datalist>
//             </div>

//             <div id="qlhs-vung-tabs" style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px; border-bottom: 2px solid #dee2e6; padding-bottom: 10px;">
//                 <span style="color:#6c757d; font-style:italic; padding:10px;">Vui lòng chọn lớp để tải danh sách hồ sơ...</span>
//             </div>

//             <div id="qlhs-vung-noi-dung-tab" style="background: #fff; border-radius: 10px; border: 1px solid #dee2e6; box-shadow: 0 4px 10px rgba(0,0,0,0.03); min-height: 400px; padding: 25px;">
//                 <div style="text-align:center; color:#adb5bd; font-size:15px; padding:50px;">Chưa có dữ liệu hiển thị.</div>
//             </div>
//         </div>
//     `;

//     if (typeof window.ham_20_7_tai_danh_sach_lop === 'function') {
//         let oLop = document.getElementById('qlhs-input-lop'); oLop.id = 'nk-input-lop';
//         window.ham_20_7_tai_danh_sach_lop(); oLop.id = 'qlhs-input-lop';
//     }
// };

// // =====================================================================
// // HÀM 22.2 & 22.3: TẢI & VẼ DANH MỤC LỚN (TABS)
// // =====================================================================
// window.ham_22_2_tai_du_lieu_lop = async function () {
//     const inputLop = document.getElementById('qlhs-input-lop');
//     if (!inputLop || !inputLop.value) return;

//     let rawLop = inputLop.value.trim();
//     window.qlhs_MaLopHienTai = rawLop.match(/\(([^)]+)\)$/) ? rawLop.match(/\(([^)]+)\)$/)[1].trim() : rawLop;

//     const vungTabs = document.getElementById('qlhs-vung-tabs');
//     vungTabs.innerHTML = `<span style="color:#007bff; font-weight:bold; padding:10px;">⏳ Đang tải hồ sơ...</span>`;
//     document.getElementById('qlhs-vung-noi-dung-tab').innerHTML = '';

//     try {
//         const { data, error } = await _supabase.from('ho_so_danh_muc_lop').select('*').eq('ma_lop', window.qlhs_MaLopHienTai).order('thu_tu', { ascending: true });
//         if (error) throw error;
//         window.qlhs_DanhSachDanhMuc = data || [];
//         window.ham_22_3_ve_thanh_tabs();
//     } catch (e) { vungTabs.innerHTML = `<span style="color:red; font-weight:bold; padding:10px;">❌ Lỗi: ${e.message}</span>`; }
// };

// =====================================================================
// HÀM 22.1: MỞ GIAO DIỆN CHÍNH (XỬ LÝ NÚT LỚP GẦN NHẤT ĐỘNG)
// =====================================================================
// window.ham_22_1_mo_giao_dien_quan_ly_lop = function () {
//     const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
//     if (!vungLamViec) return;

//     vungLamViec.innerHTML = `
//         <div style="padding: 10px; animation: fadeIn 0.3s ease-in-out;">
//             <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #007bff; padding-bottom: 12px; margin-bottom: 20px;">
//                 <h3 style="color: #007bff; margin: 0; text-transform: uppercase; display: flex; align-items: center; gap: 10px; font-size: 20px;">
//                     👥 SIÊU HỒ SƠ LỚP HỌC
//                 </h3>
//                 <div style="display: flex; gap: 10px;">
//                     <button onclick="ham_3_1_ve_dashboard_admin()" style="padding: 8px 15px; background: #6c757d; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.15);">⬅️ Quay lại</button>
//                 </div>
//             </div>

//             <div style="background: #e6f2ff; padding: 15px 25px; border-radius: 8px; border: 1px solid #b8daff; margin-bottom: 20px; display: flex; align-items: center; flex-wrap: wrap; gap: 15px; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
//                 <label style="font-weight: bold; font-size: 15px; color: #0056b3; white-space: nowrap;">🏫 CHỌN LỚP:</label>
//                 <div style="display:flex; flex:1; max-width: 650px; gap: 10px;">
//                     <input id="qlhs-input-lop" list="dl-lop" placeholder="Gõ tên hoặc chọn lớp..." onchange="window.ham_22_2_tai_du_lieu_lop()" style="flex: 1; padding: 10px; border: 2px solid #007bff; border-radius: 6px; font-weight: bold; font-size: 15px; outline: none; color: #0056b3;">
//                     <!-- 🌟 Vùng chứa nút Lớp Gần Nhất sẽ hiện ra tại đây -->
//                     <div id="vung-nut-lop-gan-nhat"></div>
//                 </div>
//                 <datalist id="dl-lop"></datalist>
//             </div>

//             <div id="qlhs-vung-tabs" style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px; border-bottom: 2px solid #dee2e6; padding-bottom: 10px;">
//                 <span style="color:#6c757d; font-style:italic; padding:10px;">Vui lòng chọn lớp để tải danh sách hồ sơ...</span>
//             </div>

//             <div id="qlhs-vung-noi-dung-tab" style="background: #fff; border-radius: 10px; border: 1px solid #dee2e6; box-shadow: 0 4px 10px rgba(0,0,0,0.03); min-height: 400px; padding: 25px;">
//                 <div style="text-align:center; color:#adb5bd; font-size:15px; padding:50px;">Chưa có dữ liệu hiển thị.</div>
//             </div>
//         </div>
//     `;

//     if (typeof window.ham_20_7_tai_danh_sach_lop === 'function') {
//         let oLop = document.getElementById('qlhs-input-lop'); oLop.id = 'nk-input-lop';
//         window.ham_20_7_tai_danh_sach_lop(); oLop.id = 'qlhs-input-lop';
//     }

//     // 🌟 HÀM PHỤ: Cập nhật hiển thị nút
//     window.ham_22_cap_nhat_nut_lop_gan_nhat = function (tenLop) {
//         let vungNut = document.getElementById('vung-nut-lop-gan-nhat');
//         if (vungNut && tenLop) {
//             let tenNgan = tenLop.split(' - ')[0] || tenLop;
//             vungNut.innerHTML = `<button onclick="document.getElementById('qlhs-input-lop').value='${tenLop}'; window.ham_22_2_tai_du_lieu_lop();" style="padding: 10px 15px; background: #28a745; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 13px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); white-space: nowrap; transition: 0.2s;" onmouseover="this.style.filter='brightness(1.1)'" onmouseout="this.style.filter='brightness(1)'" title="Tải nhanh lớp vừa xem">🕒 Lớp gần nhất: ${tenNgan}</button>`;
//         }
//     };

//     // 1. Đọc nhanh từ LocalStorage vẽ ra ngay lập tức
//     let lopLocal = localStorage.getItem('qlhs_lastClass_text');
//     if (lopLocal) window.ham_22_cap_nhat_nut_lop_gan_nhat(lopLocal);

//     // 2. Chạy ngầm đọc Database để đồng bộ nếu thầy đang dùng máy khác
//     _supabase.from('ho_so_danh_muc_lop').select('du_lieu_json').eq('ma_lop', 'SYS_CONFIG').eq('ten_danh_muc', 'LAST_CLASS').maybeSingle().then(({ data }) => {
//         if (data && Array.isArray(data.du_lieu_json) && data.du_lieu_json.length > 0) {
//             let lopDB = data.du_lieu_json[0];
//             if (lopDB && lopDB !== lopLocal) {
//                 localStorage.setItem('qlhs_lastClass_text', lopDB);
//                 window.ham_22_cap_nhat_nut_lop_gan_nhat(lopDB);
//             }
//         }
//     }).catch(e => console.log("Lỗi đồng bộ cấu hình"));
// };

window.ham_22_1_mo_giao_dien_quan_ly_lop = function () {
    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
    if (!vungLamViec) return;

    vungLamViec.innerHTML = `
        <div style="padding: 10px; animation: fadeIn 0.3s ease-in-out;">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #007bff; padding-bottom: 12px; margin-bottom: 20px;">
                <h3 style="color: #007bff; margin: 0; text-transform: uppercase; display: flex; align-items: center; gap: 10px; font-size: 20px;">
                    👥 SIÊU HỒ SƠ LỚP HỌC
                </h3>
                <div style="display: flex; gap: 10px;">
                    <button onclick="ham_3_1_ve_dashboard_admin()" style="padding: 8px 15px; background: #6c757d; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.15);">⬅️ Quay lại</button>
                </div>
            </div>

            <div style="background: #e6f2ff; padding: 15px 25px; border-radius: 8px; border: 1px solid #b8daff; margin-bottom: 20px; display: flex; align-items: center; flex-wrap: wrap; gap: 15px; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
                <label style="font-weight: bold; font-size: 15px; color: #0056b3; white-space: nowrap;">🏫 CHỌN LỚP:</label>
                <div style="display:flex; flex:1; max-width: 650px; gap: 10px;">
                    <input id="qlhs-input-lop" list="dl-lop" placeholder="Gõ tên hoặc chọn lớp..." onchange="window.ham_22_2_tai_du_lieu_lop()" style="flex: 1; padding: 10px; border: 2px solid #007bff; border-radius: 6px; font-weight: bold; font-size: 15px; outline: none; color: #0056b3;">
                    <!-- 🌟 Vùng chứa nút Lớp Gần Nhất sẽ hiện ra tại đây -->
                    <div id="vung-nut-lop-gan-nhat"></div>
                </div>
                <datalist id="dl-lop"></datalist>
            </div>

            <div id="qlhs-vung-tabs" style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px; border-bottom: 2px solid #dee2e6; padding-bottom: 10px;">
                <span style="color:#6c757d; font-style:italic; padding:10px;">Vui lòng chọn lớp để tải danh sách hồ sơ...</span>
            </div>

            <div id="qlhs-vung-noi-dung-tab" style="background: #fff; border-radius: 10px; border: 1px solid #dee2e6; box-shadow: 0 4px 10px rgba(0,0,0,0.03); min-height: 400px; padding: 25px;">
                <div style="text-align:center; color:#adb5bd; font-size:15px; padding:50px;">Chưa có dữ liệu hiển thị.</div>
            </div>
        </div>
    `;

    if (typeof window.ham_20_7_tai_danh_sach_lop === 'function') {
        let oLop = document.getElementById('qlhs-input-lop'); oLop.id = 'nk-input-lop';
        window.ham_20_7_tai_danh_sach_lop(); oLop.id = 'qlhs-input-lop';
    }

    // 🌟 HÀM PHỤ: Cập nhật hiển thị nút
    window.ham_22_cap_nhat_nut_lop_gan_nhat = function (tenLop) {
        let vungNut = document.getElementById('vung-nut-lop-gan-nhat');
        if (vungNut && tenLop) {
            let tenNgan = tenLop.split(' - ')[0] || tenLop;
            vungNut.innerHTML = `<button onclick="document.getElementById('qlhs-input-lop').value='${tenLop}'; window.ham_22_2_tai_du_lieu_lop();" style="padding: 10px 15px; background: #28a745; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 13px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); white-space: nowrap; transition: 0.2s;" onmouseover="this.style.filter='brightness(1.1)'" onmouseout="this.style.filter='brightness(1)'" title="Tải nhanh lớp vừa xem">🕒 Lớp gần nhất: ${tenNgan}</button>`;
        }
    };

    // Đọc nhanh từ LocalStorage vẽ ra ngay lập tức
    let lopLocal = localStorage.getItem('qlhs_lastClass_text');
    if (lopLocal) window.ham_22_cap_nhat_nut_lop_gan_nhat(lopLocal);
};

// // =====================================================================
// // HÀM 22.2: TẢI DỮ LIỆU LỚP VÀ GHI NHẬN VÀO CẢ LOCAL LẪN DATABASE
// // =====================================================================
// window.ham_22_2_tai_du_lieu_lop = async function () {
//     const inputLop = document.getElementById('qlhs-input-lop');
//     if (!inputLop || !inputLop.value) return;

//     let rawLop = inputLop.value.trim();
//     window.qlhs_MaLopHienTai = rawLop.match(/\(([^)]+)\)$/) ? rawLop.match(/\(([^)]+)\)$/)[1].trim() : rawLop;

//     // 🌟 1. LƯU VÀO TRÌNH DUYỆT VÀ VẼ LẠI NÚT NGAY LẬP TỨC
//     localStorage.setItem('qlhs_lastClass_text', rawLop);
//     if (typeof window.ham_22_cap_nhat_nut_lop_gan_nhat === 'function') {
//         window.ham_22_cap_nhat_nut_lop_gan_nhat(rawLop);
//     }

//     // 🌟 2. LƯU NGẦM LÊN MÁY CHỦ
//     setTimeout(async () => {
//         try {
//             let { data: checkExist } = await _supabase.from('ho_so_danh_muc_lop').select('id').eq('ma_lop', 'SYS_CONFIG').eq('ten_danh_muc', 'LAST_CLASS');
//             if (checkExist && checkExist.length > 0) {
//                 await _supabase.from('ho_so_danh_muc_lop').update({ du_lieu_json: [rawLop] }).eq('id', checkExist[0].id);
//             } else {
//                 await _supabase.from('ho_so_danh_muc_lop').insert([{ ma_lop: 'SYS_CONFIG', ten_danh_muc: 'LAST_CLASS', kieu_giao_dien: 'CONFIG', thu_tu: 0, du_lieu_json: [rawLop] }]);
//             }
//         } catch (e) { console.log("Lỗi lưu cấu hình: ", e); }
//     }, 100);

//     const vungTabs = document.getElementById('qlhs-vung-tabs');
//     vungTabs.innerHTML = `<span style="color:#007bff; font-weight:bold; padding:10px;">⏳ Đang tải hồ sơ...</span>`;
//     document.getElementById('qlhs-vung-noi-dung-tab').innerHTML = '';





//     try {
//         const { data, error } = await _supabase.from('ho_so_danh_muc_lop').select('*').eq('ma_lop', window.qlhs_MaLopHienTai).order('thu_tu', { ascending: true });
//         if (error) throw error;
//         window.qlhs_DanhSachDanhMuc = data || [];
//         window.ham_22_3_ve_thanh_tabs();
//     } catch (e) { vungTabs.innerHTML = `<span style="color:red; font-weight:bold; padding:10px;">❌ Lỗi: ${e.message}</span>`; }
// };

window.ham_22_2_tai_du_lieu_lop = async function () {
    const inputLop = document.getElementById('qlhs-input-lop');
    if (!inputLop || !inputLop.value) return;

    let rawLop = inputLop.value.trim();
    window.qlhs_MaLopHienTai = rawLop.match(/\(([^)]+)\)$/) ? rawLop.match(/\(([^)]+)\)$/)[1].trim() : rawLop;

    // 🌟 CHỈ LƯU VÀO TRÌNH DUYỆT (LOCALSTORAGE) VÀ VẼ LẠI NÚT NGAY LẬP TỨC
    // Đã xóa phần lưu 'SYS_CONFIG' lên Database để tránh lỗi 409 vi phạm khóa ngoại
    localStorage.setItem('qlhs_lastClass_text', rawLop);
    if (typeof window.ham_22_cap_nhat_nut_lop_gan_nhat === 'function') {
        window.ham_22_cap_nhat_nut_lop_gan_nhat(rawLop);
    }

    const vungTabs = document.getElementById('qlhs-vung-tabs');
    vungTabs.innerHTML = `<span style="color:#007bff; font-weight:bold; padding:10px;">⏳ Đang tải hồ sơ...</span>`;
    document.getElementById('qlhs-vung-noi-dung-tab').innerHTML = '';

    try {
        const { data, error } = await _supabase.from('ho_so_danh_muc_lop')
            .select('*')
            .eq('ma_lop', window.qlhs_MaLopHienTai)
            .order('thu_tu', { ascending: true });

        if (error) throw error;
        window.qlhs_DanhSachDanhMuc = data || [];
        window.ham_22_3_ve_thanh_tabs();
    } catch (e) {
        vungTabs.innerHTML = `<span style="color:red; font-weight:bold; padding:10px;">❌ Lỗi: ${e.message}</span>`;
    }
};

window.ham_22_3_ve_thanh_tabs = function () {
    const vungTabs = document.getElementById('qlhs-vung-tabs');
    if (!vungTabs) return;

    let html = '';
    window.qlhs_DanhSachDanhMuc.forEach(tab => {
        let isSelected = window.qlhs_TabDangChon === tab.id;
        let bg = isSelected ? '#007bff' : '#f8f9fa'; let color = isSelected ? '#fff' : '#495057'; let border = isSelected ? '#0056b3' : '#ced4da';
        html += `<button onclick="window.ham_22_6_chon_tab('${tab.id}')" style="padding: 10px 20px; background: ${bg}; color: ${color}; border: 1px solid ${border}; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 14px; transition: 0.2s; box-shadow: ${isSelected ? '0 4px 6px rgba(0,123,255,0.3)' : '0 1px 2px rgba(0,0,0,0.05)'};">📁 ${tab.ten_danh_muc}</button>`;
    });

    html += `<button onclick="window.ham_22_4_mo_modal_them_danh_muc()" style="padding: 10px 20px; background: #fff; color: #28a745; border: 2px dashed #28a745; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 14px; transition: 0.2s;" onmouseover="this.style.background='#e8f5e9'" onmouseout="this.style.background='#fff'">➕ Thêm Mục Hồ Sơ Lớn</button>`;
    vungTabs.innerHTML = html;

    // Tự động nhảy vào Tab đầu tiên nếu chưa chọn
    if (window.qlhs_DanhSachDanhMuc.length > 0 && !window.qlhs_TabDangChon) {
        window.ham_22_6_chon_tab(window.qlhs_DanhSachDanhMuc[0].id);
    } else if (window.qlhs_DanhSachDanhMuc.length === 0) {
        document.getElementById('qlhs-vung-noi-dung-tab').innerHTML = '<div style="text-align:center; color:#adb5bd; padding:50px;">Chưa có dữ liệu hiển thị.</div>';
    }
};

// =====================================================================
// HÀM 22.4 & 22.5: TẠO MỤC HỒ SƠ LỚN
// =====================================================================
window.ham_22_4_mo_modal_them_danh_muc = function () {
    let modal = document.getElementById('qlhs-modal-them-dm'); if (modal) modal.remove();
    modal = document.createElement('div'); modal.id = 'qlhs-modal-them-dm';
    modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); display:flex; align-items:center; justify-content:center; z-index:999999; backdrop-filter: blur(2px); animation: fadeIn 0.2s;';
    modal.innerHTML = `
        <div style="background:#fff; width:450px; padding:25px; border-radius:12px; box-shadow:0 10px 30px rgba(0,0,0,0.4);">
            <h3 style="margin-top:0; color:#28a745; border-bottom:2px solid #c3e6cb; padding-bottom:10px;">➕ TẠO HỒ SƠ LỚN</h3>
            <div style="margin-bottom:20px;">
                <label style="font-weight:bold; font-size:13px; color:#495057;">Tên hồ sơ (Tab chính):</label>
                <input type="text" id="qlhs-dm-ten" placeholder="VD: Hồ sơ chuyên môn, Sổ chủ nhiệm..." style="width:100%; padding:10px; border:2px solid #28a745; border-radius:6px; margin-top:5px; box-sizing:border-box; font-weight:bold; outline:none;">
            </div>
            <div style="display:flex; justify-content:flex-end; gap:10px; border-top:1px solid #eee; padding-top:15px;">
                <button onclick="document.getElementById('qlhs-modal-them-dm').remove()" style="padding:10px 20px; background:#6c757d; color:white; border:none; border-radius:6px; cursor:pointer; font-weight:bold;">Hủy bỏ</button>
                <button onclick="window.ham_22_5_luu_danh_muc_moi()" style="padding:10px 25px; background:#28a745; color:white; border:none; border-radius:6px; cursor:pointer; font-weight:bold;">💾 Lưu & Tạo mới</button>
            </div>
        </div>`;
    document.body.appendChild(modal); document.getElementById('qlhs-dm-ten').focus();
};

// =====================================================================
// HÀM 22.5: THỰC THI LƯU DANH MỤC LỚN VÀO CSDL VÀ TẠO FOLDER DRIVE
// =====================================================================
// window.ham_22_5_luu_danh_muc_moi = async function () {
//     const tenDM = document.getElementById('qlhs-dm-ten').value.trim();
//     if (!tenDM) return alert("⚠️️ Vui lòng nhập Tên hồ sơ!");

//     try {
//         let thuTuMoi = window.qlhs_DanhSachDanhMuc.length + 1;
//         const { data, error } = await _supabase.from('ho_so_danh_muc_lop').insert([{
//             ma_lop: window.qlhs_MaLopHienTai,
//             ten_danh_muc: tenDM,
//             kieu_giao_dien: 'SUPER_TAB',
//             thu_tu: thuTuMoi,
//             du_lieu_json: []
//         }]).select();

//         if (error) throw error;
//         document.getElementById('qlhs-modal-them-dm').remove();
//         if (data && data.length > 0) window.qlhs_TabDangChon = data[0].id;
//         window.ham_22_2_tai_du_lieu_lop();

//         // 🌟 GỬI TÍN HIỆU TẠO THƯ MỤC RỖNG TRÊN GOOGLE DRIVE
//         let tenDanhMucChuan = window.taoTenAnToan ? window.taoTenAnToan(tenDM, 40) : tenDM.replace(/[\\/:*?"<>| ]/g, "_");
//         fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
//             method: "POST",
//             body: JSON.stringify({ action: "create_folder_ho_so_lop", maLop: window.qlhs_MaLopHienTai, tenDanhMuc: tenDanhMucChuan })
//         }).catch(e => console.log("Lỗi tạo thư mục Drive."));

//     } catch (e) { alert("❌ Lỗi tạo danh mục: " + e.message); }
// };


// window.ham_22_5_luu_danh_muc_moi = async function () {
//     const tenDM = document.getElementById('qlhs-dm-ten').value.trim();
//     if (!tenDM) return alert("⚠ Vui lòng nhập Tên hồ sơ!");

//     try {
//         let thuTuMoi = window.qlhs_DanhSachDanhMuc.length + 1;

//         // 🌟 SỬA TỪ .insert() THÀNH .upsert() VÀ THÊM onConflict ĐỂ CHỐNG LỖI 409 CONFLICT
//         const { data, error } = await _supabase.from('ho_so_danh_muc_lop').upsert([{
//             ma_lop: window.qlhs_MaLopHienTai,
//             ten_danh_muc: tenDM,
//             kieu_giao_dien: 'SUPER_TAB',
//             thu_tu: thuTuMoi,
//             du_lieu_json: []
//         }], {
//             onConflict: 'ma_lop' // Tên cột bị trùng khóa duy nhất trong bảng của thầy
//         }).select();

//         if (error) throw error;
//         document.getElementById('qlhs-modal-them-dm').remove();
//         if (data && data.length > 0) window.qlhs_TabDangChon = data[0].id;
//         window.ham_22_2_tai_du_lieu_lop();

//         // 🌟 GỬI TÍN HIỆU TẠO THƯ MỤC RỖNG TRÊN GOOGLE DRIVE
//         let tenDanhMucChuan = window.taoTenAnToan ? window.taoTenAnToan(tenDM, 40) : tenDM.replace(/[\\/:*?"<>| ]/g, "_");
//         fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
//             method: "POST",
//             body: JSON.stringify({ action: "create_folder_ho_so_lop", maLop: window.qlhs_MaLopHienTai, tenDanhMuc: tenDanhMucChuan })
//         }).catch(e => console.log("Lỗi tạo thư mục Drive."));

//     } catch (e) { alert("❌ Lỗi tạo danh mục: " + e.message); }
// };
window.ham_22_5_luu_danh_muc_moi = async function () {
    const tenDM = document.getElementById('qlhs-dm-ten').value.trim();
    if (!tenDM) return alert("⚠ Vui lòng nhập Tên hồ sơ!");

    try {
        let thuTuMoi = window.qlhs_DanhSachDanhMuc.length + 1;

        // 🌟 SỬ DỤNG .insert() CHUẨN XÁC ĐỂ TẠO MỚI TAB HỒ SƠ LỚN
        const { data, error } = await _supabase.from('ho_so_danh_muc_lop').insert([
            {
                ma_lop: window.qlhs_MaLopHienTai,
                ten_danh_muc: tenDM,
                kieu_giao_dien: 'SUPER_TAB',
                thu_tu: thuTuMoi,
                du_lieu_json: []
            }
        ]).select();

        if (error) throw error;

        // Đóng modal và làm mới giao diện
        let modal = document.getElementById('qlhs-modal-them-dm');
        if (modal) modal.remove();

        if (data && data.length > 0) window.qlhs_TabDangChon = data[0].id;
        window.ham_22_2_tai_du_lieu_lop();

        // 🌟 GỬI TÍN HIỆU TẠO THƯ MỤC RỖNG TRÊN GOOGLE DRIVE
        let tenDanhMucChuan = window.taoTenAnToan ? window.taoTenAnToan(tenDM, 40) : tenDM.replace(/[\\/:*?"<>| ]/g, "_");
        fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
            method: "POST",
            body: JSON.stringify({ action: "create_folder_ho_so_lop", maLop: window.qlhs_MaLopHienTai, tenDanhMuc: tenDanhMucChuan })
        }).catch(e => console.log("Lỗi tạo thư mục Drive."));

    } catch (e) { alert("❌ Lỗi tạo danh mục: " + e.message); }
};


// // =====================================================================
// // HÀM 22.6: CHỌN TAB LỚN -> HIỂN THỊ DANH SÁCH MỤC CON (CÓ ĐÁNH SỐ THỨ TỰ)
// // =====================================================================
// window.ham_22_6_chon_tab = function (idDanhMuc) {
//     window.qlhs_TabDangChon = idDanhMuc; window.ham_22_3_ve_thanh_tabs();
//     const tabData = window.qlhs_DanhSachDanhMuc.find(t => t.id === idDanhMuc);
//     if (!tabData) return;

//     let mangMucCon = [];
//     try {
//         if (typeof tabData.du_lieu_json === 'string') mangMucCon = JSON.parse(tabData.du_lieu_json || '[]');
//         else if (Array.isArray(tabData.du_lieu_json)) mangMucCon = tabData.du_lieu_json;
//     } catch (e) { console.error(e); }

//     let thoiGianTab = tabData.created_at ? new Date(tabData.created_at).toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' }) : '';
//     let htmlThoiGianTab = thoiGianTab ? `<span style="font-size:12px; font-weight:normal; color:#6c757d; margin-left:15px; font-style:italic;">🕒 Khởi tạo: ${thoiGianTab}</span>` : '';

//     const vungNoiDung = document.getElementById('qlhs-vung-noi-dung-tab');

//     let htmlHeader = `
//         <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px dashed #ccc; padding-bottom:15px; margin-bottom:20px;">
//             <div>
//                 <h3 style="margin:0; color:#0056b3; display:flex; align-items:center; gap:10px;">
//                     📁 ${tabData.ten_danh_muc} ${htmlThoiGianTab}
//                     <button onclick="window.ham_22_23_sua_ten_danh_muc('${tabData.id}')" style="background:none; border:none; cursor:pointer; font-size:14px; margin-left:10px;" title="Sửa tên hồ sơ lớn">✏️</button>
//                     <button onclick="window.ham_22_24_xoa_danh_muc('${tabData.id}')" style="background:none; border:none; cursor:pointer; font-size:14px; color:#dc3545;" title="Xóa toàn bộ hồ sơ này">🗑️</button>
//                 </h3>
//                 <div style="font-size:12px; color:#6c757d; margin-top:5px;">Vui lòng chọn hoặc tạo các Chuyên mục con bên dưới.</div>
//             </div>
//             <button onclick="window.ham_22_14_mo_modal_them_muc_con('${tabData.id}')" style="padding:8px 15px; background:#17a2b8; color:#fff; border:none; border-radius:4px; font-size:13px; font-weight:bold; cursor:pointer; box-shadow: 0 2px 4px rgba(23,162,184,0.3);">
//                 ➕ Thêm Chuyên Mục Con
//             </button>
//         </div>
//     `;

//     if (mangMucCon.length === 0) {
//         vungNoiDung.innerHTML = htmlHeader + `<div style="text-align:center; padding:50px;"><div style="font-size:40px; margin-bottom:15px;">📂</div><div style="font-size:16px; color:#6c757d; font-weight:bold;">Chưa có Chuyên mục con nào!</div></div>`;
//         return;
//     }

//     let gridHtml = `<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 15px;">`;
//     mangMucCon.forEach((mc, idx) => {
//         let stt = idx + 1; // 🌟 Tạo Số thứ tự
//         let soThanhPhan = mc.mangThanhPhan ? mc.mangThanhPhan.length : 0;
//         let safeId = mc.idMucCon || 'undefined';
//         let safeName = mc.tenMucCon || mc.tenGiaiDoan || 'Dữ liệu cũ (Bị lỗi)';
//         let isLoi = !mc.idMucCon;

//         let tgTao = mc.thoiGianTao ? new Date(mc.thoiGianTao).toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' }) : '';
//         let htmlTgTao = tgTao ? `<div style="font-size:11px; color:#adb5bd; margin-top:5px; font-style:italic;">🕒 Tạo lúc: ${tgTao}</div>` : '';

//         gridHtml += `
//             <div onclick="${isLoi ? '' : `window.ham_22_16_mo_muc_con('${tabData.id}', '${safeId}')`}" style="background:#fff; border:1px solid ${isLoi ? '#f5c6cb' : '#ced4da'}; border-radius:8px; padding:20px; cursor:${isLoi ? 'default' : 'pointer'}; position:relative; box-shadow:0 2px 4px rgba(0,0,0,0.05); transition:0.2s; display:flex; align-items:flex-start; gap:15px;" ${!isLoi ? `onmouseover="this.style.boxShadow='0 6px 12px rgba(0,0,0,0.1)'; this.style.borderColor='#007bff';" onmouseout="this.style.boxShadow='0 2px 4px rgba(0,0,0,0.05)'; this.style.borderColor='#ced4da';"` : ''}>
//                 <div style="font-size:35px;">${isLoi ? '⚠️' : '📂'}</div>
//                 <div style="flex:1;">
//                     <h4 style="margin:0 0 5px 0; color:${isLoi ? '#dc3545' : '#333'}; font-size:16px; padding-right: 40px;">
//                         <span style="color:#007bff; margin-right:5px; font-weight:900;">${stt}.</span>${safeName}
//                     </h4>
//                     <div style="font-size:12px; color:#6c757d; background:#e9ecef; display:inline-block; padding:3px 8px; border-radius:12px;">Chứa: ${soThanhPhan} Thành phần</div>
//                     ${htmlTgTao}
//                 </div>
                
//                 <div style="position:absolute; top:10px; right:10px; display:flex; gap:5px;">
//                     ${!isLoi ? `<button onclick="event.stopPropagation(); window.ham_22_25_sua_ten_muc_con('${tabData.id}', '${safeId}')" style="background:none; border:none; cursor:pointer; font-size:13px;" title="Sửa tên chuyên mục">✏️</button>` : ''}
//                     <button onclick="event.stopPropagation(); window.ham_22_26_xoa_muc_con('${tabData.id}', '${safeId}')" style="background:none; border:none; cursor:pointer; font-size:13px; color:#dc3545;" title="Xóa chuyên mục này">🗑️</button>
//                 </div>
//             </div>
//         `;
//     });
//     gridHtml += `</div>`;
//     vungNoiDung.innerHTML = htmlHeader + gridHtml;
// };

// // =====================================================================
// // HÀM 22.6: CHỌN TAB LỚN -> HIỂN THỊ DANH SÁCH MỤC CON (SẮP XẾP TRÊN 3 TIÊU ĐỀ CỘT)
// // =====================================================================
// window.ham_22_6_chon_tab = function (idDanhMuc, kieuSortMC = 'STATUS_TIME') {
//     window.qlhs_TabDangChon = idDanhMuc;
//     window.qlhs_KieuSortHienTai = kieuSortMC;
//     window.ham_22_3_ve_thanh_tabs();

//     const tabData = window.qlhs_DanhSachDanhMuc.find(t => t.id === idDanhMuc);
//     if (!tabData) return;

//     let mangMucCon = [];
//     try {
//         if (typeof tabData.du_lieu_json === 'string') mangMucCon = JSON.parse(tabData.du_lieu_json || '[]');
//         else if (Array.isArray(tabData.du_lieu_json)) mangMucCon = tabData.du_lieu_json;
//     } catch (e) { console.error(e); }

//     let thoiGianTab = tabData.created_at ? new Date(tabData.created_at).toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' }) : '';
//     let htmlThoiGianTab = thoiGianTab ? `<span style="font-size:12px; font-weight:normal; color:#6c757d; margin-left:15px; font-style:italic;">🕒 Khởi tạo: ${thoiGianTab}</span>` : '';

//     const vungNoiDung = document.getElementById('qlhs-vung-noi-dung-tab');

//     let htmlHeader = `
//         <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px dashed #ccc; padding-bottom:15px; margin-bottom:20px; flex-wrap:wrap; gap:10px;">
//             <div>
//                 <h3 style="margin:0; color:#0056b3; display:flex; align-items:center; gap:10px;">
//                     📁 ${tabData.ten_danh_muc} ${htmlThoiGianTab}
//                     <button onclick="window.ham_22_23_sua_ten_danh_muc('${tabData.id}')" style="background:none; border:none; cursor:pointer; font-size:14px; margin-left:10px;" title="Sửa tên hồ sơ lớn">✏️</button>
//                     <button onclick="window.ham_22_24_xoa_danh_muc('${tabData.id}')" style="background:none; border:none; cursor:pointer; font-size:14px; color:#dc3545;" title="Xóa toàn bộ hồ sơ này">🗑️</button>
//                 </h3>
//                 <div style="font-size:12px; color:#6c757d; margin-top:5px;">Bấm vào tiêu đề cột "Tên Chuyên Mục", "Thời Gian Tạo" hoặc "Trạng Thái" để sắp xếp.</div>
//             </div>
//             <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
//                 <button onclick="window.ham_22_14_mo_modal_them_muc_con('${tabData.id}')" style="padding:8px 15px; background:#17a2b8; color:#fff; border:none; border-radius:4px; font-size:13px; font-weight:bold; cursor:pointer; box-shadow: 0 2px 4px rgba(23,162,184,0.3);">
//                     ➕ Thêm Chuyên Mục Con
//                 </button>
//             </div>
//         </div>
//     `;

//     if (mangMucCon.length === 0) {
//         vungNoiDung.innerHTML = htmlHeader + `<div style="text-align:center; padding:50px;"><div style="font-size:40px; margin-bottom:15px;">📂</div><div style="font-size:16px; color:#6c757d; font-weight:bold;">Chưa có Chuyên mục con nào!</div></div>`;
//         return;
//     }

//     // 🌟 THUẬT TOÁN LỌC VÀ SẮP XẾP CHUYÊN MỤC
//     let sortedMucCon = [...mangMucCon];
//     sortedMucCon.sort((a, b) => {
//         let timeA = a.thoiGianTao ? new Date(a.thoiGianTao).getTime() : 0;
//         let timeB = b.thoiGianTao ? new Date(b.thoiGianTao).getTime() : 0;
//         let statusA = a.hoanThanh ? 1 : 0;
//         let statusB = b.hoanThanh ? 1 : 0;
//         let nameA = (a.tenMucCon || a.tenGiaiDoan || '').toLowerCase();
//         let nameB = (b.tenMucCon || b.tenGiaiDoan || '').toLowerCase();

//         if (kieuSortMC === 'STATUS_TIME') {
//             if (statusA !== statusB) return statusA - statusB;
//             return timeA - timeB;
//         }
//         if (kieuSortMC === 'STATUS_TIME_REV') {
//             if (statusA !== statusB) return statusB - statusA;
//             return timeA - timeB;
//         }
//         if (kieuSortMC === 'TIME_DESC') return timeB - timeA;
//         if (kieuSortMC === 'TIME_ASC') return timeA - timeB;
//         if (kieuSortMC === 'NAME_ASC') return nameA.localeCompare(nameB, 'vi');
//         if (kieuSortMC === 'NAME_DESC') return nameB.localeCompare(nameA, 'vi');
//         return 0;
//     });

//     let iconThoiGian = kieuSortMC === 'TIME_DESC' ? '🔽' : (kieuSortMC === 'TIME_ASC' ? '🔼' : '↕️');
//     let iconTrangThai = kieuSortMC === 'STATUS_TIME' ? '🔽' : (kieuSortMC === 'STATUS_TIME_REV' ? '🔼' : '↕️');
//     let iconTen = kieuSortMC === 'NAME_ASC' ? '🔽' : (kieuSortMC === 'NAME_DESC' ? '🔼' : '↕️');

//     // 🌟 HIỂN THỊ DẠNG BẢNG - GẮN SỰ KIỆN SORT VÀO TIÊU ĐỀ
//     let tableHtml = `
//         <div style="overflow-x: auto; border-radius: 8px; border: 1px solid #dee2e6; box-shadow: 0 4px 10px rgba(0,0,0,0.03);">
//             <table style="width: 100%; border-collapse: collapse; font-size: 14px; text-align: left; background: #fff;">
//                 <thead>
//                     <tr style="background: #f8f9fa; color: #495057; border-bottom: 2px solid #dee2e6;">
//                         <th style="padding: 12px; width: 50px; text-align: center;">STT</th>
                        
//                         <!-- Cột Tên có thể bấm để sort -->
//                         <th onclick="window.ham_22_6_chon_tab('${tabData.id}', '${kieuSortMC === 'NAME_ASC' ? 'NAME_DESC' : 'NAME_ASC'}')" 
//                             style="padding: 12px; cursor: pointer; transition: 0.2s;" 
//                             onmouseover="this.style.background='#e9ecef'" onmouseout="this.style.background='transparent'" title="Bấm để sắp xếp theo tên (A-Z / Z-A)">
//                             Tên Chuyên Mục <span style="font-size:12px;">${iconTen}</span>
//                         </th>
                        
//                         <th style="padding: 12px; width: 120px; text-align: center;">Thành Phần</th>
                        
//                         <!-- Cột thời gian có thể bấm để sort -->
//                         <th onclick="window.ham_22_6_chon_tab('${tabData.id}', '${kieuSortMC === 'TIME_DESC' ? 'TIME_ASC' : 'TIME_DESC'}')" 
//                             style="padding: 12px; width: 150px; cursor: pointer; transition: 0.2s;" 
//                             onmouseover="this.style.background='#e9ecef'" onmouseout="this.style.background='transparent'" title="Bấm để đảo chiều sắp xếp thời gian">
//                             Thời Gian Tạo <span style="font-size:12px;">${iconThoiGian}</span>
//                         </th>
                        
//                         <!-- Cột trạng thái có thể bấm để sort -->
//                         <th onclick="window.ham_22_6_chon_tab('${tabData.id}', '${kieuSortMC === 'STATUS_TIME' ? 'STATUS_TIME_REV' : 'STATUS_TIME'}')" 
//                             style="padding: 12px; width: 130px; text-align: center; cursor: pointer; transition: 0.2s;" 
//                             onmouseover="this.style.background='#e9ecef'" onmouseout="this.style.background='transparent'" title="Bấm để thay đổi ưu tiên Chưa xong / Hoàn thành">
//                             Trạng Thái <span style="font-size:12px;">${iconTrangThai}</span>
//                         </th>
                        
//                         <th style="padding: 12px; width: 100px; text-align: center;">Thao Tác</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//     `;

//     sortedMucCon.forEach((mc, idx) => {
//         let stt = idx + 1;
//         let soThanhPhan = mc.mangThanhPhan ? mc.mangThanhPhan.length : 0;
//         let safeId = mc.idMucCon || 'undefined';
//         let safeName = mc.tenMucCon || mc.tenGiaiDoan || 'Dữ liệu cũ (Bị lỗi)';
//         let isLoi = !mc.idMucCon;
//         let tgTao = mc.thoiGianTao ? new Date(mc.thoiGianTao).toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' }) : '---';

//         tableHtml += `
//             <tr style="border-bottom: 1px solid #e9ecef; transition: 0.2s; cursor: ${isLoi ? 'default' : 'pointer'}; background: ${mc.hoanThanh ? '#f8fff9' : '#fff'};" 
//                 ${!isLoi ? `onmouseover="this.style.background='#f1f8ff'" onmouseout="this.style.background='${mc.hoanThanh ? '#f8fff9' : '#fff'}'" onclick="window.ham_22_16_mo_muc_con('${tabData.id}', '${safeId}')"` : ''}>
                
//                 <td style="padding: 12px; text-align: center; font-weight: bold; color: #007bff;">${stt}</td>
                
//                 <td style="padding: 12px;">
//                     <div style="display: flex; align-items: center; gap: 10px;">
//                         <span style="font-size: 20px;">${isLoi ? '⚠️' : '📂'}</span>
//                         <span style="font-weight: bold; color: ${isLoi ? '#dc3545' : '#333'}; font-size: 15px;">${safeName}</span>
//                     </div>
//                 </td>
                
//                 <td style="padding: 12px; text-align: center;">
//                     <span style="font-size: 12px; color: #6c757d; background: #e9ecef; padding: 3px 8px; border-radius: 12px; font-weight: bold;">Chứa: ${soThanhPhan}</span>
//                 </td>
                
//                 <td style="padding: 12px; font-size: 12px; color: #6c757d; font-style: italic;">${tgTao}</td>
                
//                 <td style="padding: 12px; text-align: center;" onclick="event.stopPropagation();">
//                     <label style="cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px; padding: 6px; border-radius: 6px; border: 1px solid ${mc.hoanThanh ? '#c3e6cb' : '#f5c6cb'}; background: ${mc.hoanThanh ? '#d4edda' : '#f8d7da'}; transition: 0.2s;">
//                         <input type="checkbox" onchange="window.ham_22_cap_nhat_trang_thai_muc_con('${tabData.id}', '${safeId}', this.checked)" ${mc.hoanThanh ? 'checked' : ''} style="width: 15px; height: 15px; cursor: pointer; accent-color: #28a745; margin: 0;">
//                         <span style="font-size: 11px; font-weight: bold; color: ${mc.hoanThanh ? '#155724' : '#721c24'};">${mc.hoanThanh ? 'Hoàn thành' : 'Chưa xong'}</span>
//                     </label>
//                 </td>
                
//                 <td style="padding: 12px; text-align: center;" onclick="event.stopPropagation();">
//                     ${!isLoi ? `<button onclick="window.ham_22_25_sua_ten_muc_con('${tabData.id}', '${safeId}')" style="background:none; border:none; cursor:pointer; font-size:14px; margin-right: 5px;" title="Sửa tên">✏️</button>` : ''}
//                     <button onclick="window.ham_22_26_xoa_muc_con('${tabData.id}', '${safeId}')" style="background:none; border:none; cursor:pointer; font-size:14px; color:#dc3545;" title="Xóa">🗑️</button>
//                 </td>
//             </tr>
//         `;
//     });
//     tableHtml += `</tbody></table></div>`;
//     vungNoiDung.innerHTML = htmlHeader + tableHtml;
// };

// =====================================================================
// HÀM 22.6: HIỂN THỊ DANH SÁCH "CHUYÊN MỤC" (Cấp độ 2)
// =====================================================================
window.ham_22_6_chon_tab = function (idDanhMuc, kieuSortMC = 'STATUS_TIME') {
    window.qlhs_TabDangChon = idDanhMuc;
    window.qlhs_KieuSortHienTai = kieuSortMC;
    window.ham_22_3_ve_thanh_tabs();

    const tabData = window.qlhs_DanhSachDanhMuc.find(t => t.id === idDanhMuc);
    if (!tabData) return;

    let mangMucCon = [];
    try {
        if (typeof tabData.du_lieu_json === 'string') mangMucCon = JSON.parse(tabData.du_lieu_json || '[]');
        else if (Array.isArray(tabData.du_lieu_json)) mangMucCon = tabData.du_lieu_json;
    } catch (e) { console.error(e); }

    let thoiGianTab = tabData.created_at ? new Date(tabData.created_at).toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' }) : '';
    let htmlThoiGianTab = thoiGianTab ? `<span style="font-size:12px; font-weight:normal; color:#6c757d; margin-left:15px; font-style:italic;">🕒 Khởi tạo: ${thoiGianTab}</span>` : '';

    const vungNoiDung = document.getElementById('qlhs-vung-noi-dung-tab');

    let htmlHeader = `
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px dashed #ccc; padding-bottom:15px; margin-bottom:20px; flex-wrap:wrap; gap:10px;">
            <div>
                <h3 style="margin:0; color:#0056b3; display:flex; align-items:center; gap:10px;">
                    📁 ${tabData.ten_danh_muc} ${htmlThoiGianTab}
                    <button onclick="window.ham_22_23_sua_ten_danh_muc('${tabData.id}')" style="background:none; border:none; cursor:pointer; font-size:14px; margin-left:10px;" title="Sửa tên Mục hồ sơ Lớn">✏️</button>
                    <button onclick="window.ham_22_24_xoa_danh_muc('${tabData.id}')" style="background:none; border:none; cursor:pointer; font-size:14px; color:#dc3545;" title="Xóa toàn bộ hồ sơ này">🗑️</button>
                </h3>
                <div style="font-size:12px; color:#6c757d; margin-top:5px;">Bấm vào tiêu đề cột "Tên Chuyên Mục", "Thời Gian Tạo" hoặc "Trạng Thái" để sắp xếp. Bấm vào 1 dòng để xem Chuyên mục con.</div>
            </div>
            <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
                <button onclick="window.ham_22_14_mo_modal_them_muc_con('${tabData.id}')" style="padding:8px 15px; background:#17a2b8; color:#fff; border:none; border-radius:4px; font-size:13px; font-weight:bold; cursor:pointer; box-shadow: 0 2px 4px rgba(23,162,184,0.3);">
                    ➕ Thêm Chuyên Mục
                </button>
            </div>
        </div>
    `;

    if (mangMucCon.length === 0) {
        vungNoiDung.innerHTML = htmlHeader + `<div style="text-align:center; padding:50px;"><div style="font-size:40px; margin-bottom:15px;">📂</div><div style="font-size:16px; color:#6c757d; font-weight:bold;">Chưa có Chuyên mục nào!</div></div>`;
        return;
    }

    let sortedMucCon = [...mangMucCon];
    sortedMucCon.sort((a, b) => {
        let timeA = a.thoiGianTao ? new Date(a.thoiGianTao).getTime() : 0;
        let timeB = b.thoiGianTao ? new Date(b.thoiGianTao).getTime() : 0;
        let statusA = a.hoanThanh ? 1 : 0;
        let statusB = b.hoanThanh ? 1 : 0;
        let nameA = (a.tenMucCon || a.tenGiaiDoan || '').toLowerCase();
        let nameB = (b.tenMucCon || b.tenGiaiDoan || '').toLowerCase();

        if (kieuSortMC === 'STATUS_TIME') {
            if (statusA !== statusB) return statusA - statusB;
            return timeA - timeB;
        }
        if (kieuSortMC === 'STATUS_TIME_REV') {
            if (statusA !== statusB) return statusB - statusA;
            return timeA - timeB;
        }
        if (kieuSortMC === 'TIME_DESC') return timeB - timeA;
        if (kieuSortMC === 'TIME_ASC') return timeA - timeB;
        if (kieuSortMC === 'NAME_ASC') return nameA.localeCompare(nameB, 'vi');
        if (kieuSortMC === 'NAME_DESC') return nameB.localeCompare(nameA, 'vi');
        return 0;
    });

    let iconThoiGian = kieuSortMC === 'TIME_DESC' ? '🔽' : (kieuSortMC === 'TIME_ASC' ? '🔼' : '↕️');
    let iconTrangThai = kieuSortMC === 'STATUS_TIME' ? '🔽' : (kieuSortMC === 'STATUS_TIME_REV' ? '🔼' : '↕️');
    let iconTen = kieuSortMC === 'NAME_ASC' ? '🔽' : (kieuSortMC === 'NAME_DESC' ? '🔼' : '↕️');

    let tableHtml = `
        <div style="overflow-x: auto; border-radius: 8px; border: 1px solid #dee2e6; box-shadow: 0 4px 10px rgba(0,0,0,0.03);">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; text-align: left; background: #fff;">
                <thead>
                    <tr style="background: #f8f9fa; color: #495057; border-bottom: 2px solid #dee2e6;">
                        <th style="padding: 12px; width: 50px; text-align: center;">STT</th>
                        <th onclick="window.ham_22_6_chon_tab('${tabData.id}', '${kieuSortMC === 'NAME_ASC' ? 'NAME_DESC' : 'NAME_ASC'}')" 
                            style="padding: 12px; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#e9ecef'" onmouseout="this.style.background='transparent'" title="Bấm để sắp xếp theo tên (A-Z / Z-A)">
                            Tên Chuyên Mục <span style="font-size:12px;">${iconTen}</span>
                        </th>
                        <th style="padding: 12px; width: 150px; text-align: center;">Chuyên Mục Con</th>
                        <th onclick="window.ham_22_6_chon_tab('${tabData.id}', '${kieuSortMC === 'TIME_DESC' ? 'TIME_ASC' : 'TIME_DESC'}')" 
                            style="padding: 12px; width: 150px; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#e9ecef'" onmouseout="this.style.background='transparent'">
                            Thời Gian Tạo <span style="font-size:12px;">${iconThoiGian}</span>
                        </th>
                        <th onclick="window.ham_22_6_chon_tab('${tabData.id}', '${kieuSortMC === 'STATUS_TIME' ? 'STATUS_TIME_REV' : 'STATUS_TIME'}')" 
                            style="padding: 12px; width: 130px; text-align: center; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#e9ecef'" onmouseout="this.style.background='transparent'">
                            Trạng Thái <span style="font-size:12px;">${iconTrangThai}</span>
                        </th>
                        <th style="padding: 12px; width: 100px; text-align: center;">Thao Tác</th>
                    </tr>
                </thead>
                <tbody>
    `;

    sortedMucCon.forEach((mc, idx) => {
        let stt = idx + 1;
        let soThanhPhan = mc.mangThanhPhan ? mc.mangThanhPhan.length : 0;
        let safeId = mc.idMucCon || 'undefined';
        let safeName = mc.tenMucCon || mc.tenGiaiDoan || 'Dữ liệu cũ (Bị lỗi)';
        let isLoi = !mc.idMucCon;
        let tgTao = mc.thoiGianTao ? new Date(mc.thoiGianTao).toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' }) : '---';

        tableHtml += `
            <tr style="border-bottom: 1px solid #e9ecef; transition: 0.2s; cursor: ${isLoi ? 'default' : 'pointer'}; background: ${mc.hoanThanh ? '#f8fff9' : '#fff'};" 
                ${!isLoi ? `onmouseover="this.style.background='#f1f8ff'" onmouseout="this.style.background='${mc.hoanThanh ? '#f8fff9' : '#fff'}'" onclick="window.ham_22_16_mo_muc_con('${tabData.id}', '${safeId}')"` : ''}>
                <td style="padding: 12px; text-align: center; font-weight: bold; color: #007bff;">${stt}</td>
                <td style="padding: 12px;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span style="font-size: 20px;">${isLoi ? '⚠️' : '📂'}</span>
                        <span style="font-weight: bold; color: ${isLoi ? '#dc3545' : '#333'}; font-size: 15px;">${safeName}</span>
                    </div>
                </td>
                <td style="padding: 12px; text-align: center;">
                    <span style="font-size: 12px; color: #6c757d; background: #e9ecef; padding: 3px 8px; border-radius: 12px; font-weight: bold;">Chứa: ${soThanhPhan}</span>
                </td>
                <td style="padding: 12px; font-size: 12px; color: #6c757d; font-style: italic;">${tgTao}</td>
                <td style="padding: 12px; text-align: center;" onclick="event.stopPropagation();">
                    <label style="cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px; padding: 6px; border-radius: 6px; border: 1px solid ${mc.hoanThanh ? '#c3e6cb' : '#f5c6cb'}; background: ${mc.hoanThanh ? '#d4edda' : '#f8d7da'}; transition: 0.2s;">
                        <input type="checkbox" onchange="window.ham_22_cap_nhat_trang_thai_muc_con('${tabData.id}', '${safeId}', this.checked)" ${mc.hoanThanh ? 'checked' : ''} style="width: 15px; height: 15px; cursor: pointer; accent-color: #28a745; margin: 0;">
                        <span style="font-size: 11px; font-weight: bold; color: ${mc.hoanThanh ? '#155724' : '#721c24'};">${mc.hoanThanh ? 'Hoàn thành' : 'Chưa xong'}</span>
                    </label>
                </td>
                <td style="padding: 12px; text-align: center;" onclick="event.stopPropagation();">
                    ${!isLoi ? `<button onclick="window.ham_22_25_sua_ten_muc_con('${tabData.id}', '${safeId}')" style="background:none; border:none; cursor:pointer; font-size:14px; margin-right: 5px;" title="Sửa tên">✏️</button>` : ''}
                    <button onclick="window.ham_22_26_xoa_muc_con('${tabData.id}', '${safeId}')" style="background:none; border:none; cursor:pointer; font-size:14px; color:#dc3545;" title="Xóa">🗑️</button>
                </td>
            </tr>
        `;
    });
    tableHtml += `</tbody></table></div>`;
    vungNoiDung.innerHTML = htmlHeader + tableHtml;
};




// =====================================================================
// HÀM MỚI: CẬP NHẬT TRẠNG THÁI HOÀN THÀNH CỦA CHUYÊN MỤC CON
// =====================================================================
window.ham_22_cap_nhat_trang_thai_muc_con = async function (idDanhMuc, idMucCon, isHoanThanh) {
    const tabData = window.qlhs_DanhSachDanhMuc.find(t => t.id === idDanhMuc);
    if (!tabData) return;

    let mangMucCon = typeof tabData.du_lieu_json === 'string' ? JSON.parse(tabData.du_lieu_json || '[]') : tabData.du_lieu_json;
    let mucCon = mangMucCon.find(m => m.idMucCon === idMucCon);
    if (!mucCon) return;

    mucCon.hoanThanh = isHoanThanh;

    try {
        const { error } = await _supabase.from('ho_so_danh_muc_lop').update({ du_lieu_json: mangMucCon }).eq('id', idDanhMuc);
        if (error) throw error;

        tabData.du_lieu_json = mangMucCon;

        // Render lại để áp dụng sắp xếp và màu nền mới nhất dựa trên trạng thái sort được lưu trước đó
        let kieuSortHienTai = window.qlhs_KieuSortHienTai || 'STATUS_TIME';
        window.ham_22_6_chon_tab(idDanhMuc, kieuSortHienTai);

    } catch (e) {
        alert("❌ Lỗi cập nhật trạng thái: " + e.message);
    }
};


// // =====================================================================
// // HÀM 22.14 & 22.15: TẠO MỤC CON MỚI
// // =====================================================================
// window.ham_22_14_mo_modal_them_muc_con = function (idDanhMuc) {
//     let modal = document.getElementById('qlhs-modal-them-mc'); if (modal) modal.remove();
//     let idMoi = 'MC_' + new Date().getTime() + '_' + Math.floor(Math.random() * 1000);

//     modal = document.createElement('div'); modal.id = 'qlhs-modal-them-mc';
//     modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); display:flex; align-items:center; justify-content:center; z-index:999999; backdrop-filter: blur(2px); animation: fadeIn 0.2s;';
//     modal.innerHTML = `
//         <div style="background:#fff; width:450px; padding:25px; border-radius:12px; box-shadow:0 10px 30px rgba(0,0,0,0.4);">
//             <h3 style="margin-top:0; color:#17a2b8; border-bottom:2px solid #b8daff; padding-bottom:10px;">➕ TẠO CHUYÊN MỤC CON</h3>
//             <div style="margin-bottom:20px;">
//                 <label style="font-weight:bold; font-size:13px; color:#495057;">Tên chuyên mục con:</label>
//                 <input type="text" id="qlhs-mc-ten" placeholder="VD: Sơ đồ lớp, Bảng điểm HK1, Hình ảnh sự kiện..." style="width:100%; padding:10px; border:2px solid #17a2b8; border-radius:6px; margin-top:5px; box-sizing:border-box; font-weight:bold; outline:none;">
//             </div>
//             <div style="display:flex; justify-content:flex-end; gap:10px; border-top:1px solid #eee; padding-top:15px;">
//                 <button onclick="document.getElementById('qlhs-modal-them-mc').remove()" style="padding:10px 20px; background:#6c757d; color:white; border:none; border-radius:6px; cursor:pointer; font-weight:bold;">Hủy bỏ</button>
//                 <button onclick="window.ham_22_15_luu_muc_con('${idDanhMuc}', '${idMoi}')" style="padding:10px 25px; background:#17a2b8; color:white; border:none; border-radius:6px; cursor:pointer; font-weight:bold;">💾 Lưu Mục Con</button>
//             </div>
//         </div>
//     `;
//     document.body.appendChild(modal); document.getElementById('qlhs-mc-ten').focus();
// };

// =====================================================================
// HÀM ĐỔI NHÃN MODAL (Đồng bộ Tên gọi mới)
// =====================================================================
window.ham_22_14_mo_modal_them_muc_con = function (idDanhMuc) {
    let modal = document.getElementById('qlhs-modal-them-mc'); if (modal) modal.remove();
    let idMoi = 'MC_' + new Date().getTime() + '_' + Math.floor(Math.random() * 1000);

    modal = document.createElement('div'); modal.id = 'qlhs-modal-them-mc';
    modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); display:flex; align-items:center; justify-content:center; z-index:999999; backdrop-filter: blur(2px); animation: fadeIn 0.2s;';
    modal.innerHTML = `
        <div style="background:#fff; width:450px; padding:25px; border-radius:12px; box-shadow:0 10px 30px rgba(0,0,0,0.4);">
            <h3 style="margin-top:0; color:#17a2b8; border-bottom:2px solid #b8daff; padding-bottom:10px;">➕ TẠO CHUYÊN MỤC</h3>
            <div style="margin-bottom:20px;">
                <label style="font-weight:bold; font-size:13px; color:#495057;">Tên chuyên mục:</label>
                <input type="text" id="qlhs-mc-ten" placeholder="VD: Sơ đồ lớp, Bảng điểm HK1, Hình ảnh sự kiện..." style="width:100%; padding:10px; border:2px solid #17a2b8; border-radius:6px; margin-top:5px; box-sizing:border-box; font-weight:bold; outline:none;">
            </div>
            <div style="display:flex; justify-content:flex-end; gap:10px; border-top:1px solid #eee; padding-top:15px;">
                <button onclick="document.getElementById('qlhs-modal-them-mc').remove()" style="padding:10px 20px; background:#6c757d; color:white; border:none; border-radius:6px; cursor:pointer; font-weight:bold;">Hủy bỏ</button>
                <button onclick="window.ham_22_15_luu_muc_con('${idDanhMuc}', '${idMoi}')" style="padding:10px 25px; background:#17a2b8; color:white; border:none; border-radius:6px; cursor:pointer; font-weight:bold;">💾 Lưu Chuyên Mục</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal); document.getElementById('qlhs-mc-ten').focus();
};



// =====================================================================
// HÀM 22.15: THỰC THI LƯU MỤC CON (CÓ GHI NHẬN THỜI GIAN)
// =====================================================================
window.ham_22_15_luu_muc_con = async function (idDanhMuc, idMucConMoi) {
    const tenMC = document.getElementById('qlhs-mc-ten').value.trim();
    if (!tenMC) return alert("⚠️ Vui lòng nhập Tên chuyên mục!");

    try {
        const tabData = window.qlhs_DanhSachDanhMuc.find(t => t.id === idDanhMuc);
        let mangMucCon = typeof tabData.du_lieu_json === 'string' ? JSON.parse(tabData.du_lieu_json || '[]') : tabData.du_lieu_json;

        // 🌟 THÊM TRƯỜNG thoiGianTao
        let thoiGianHienTai = new Date().toISOString();
        mangMucCon.push({ idMucCon: idMucConMoi, tenMucCon: tenMC, thoiGianTao: thoiGianHienTai, mangThanhPhan: [] });

        const { error } = await _supabase.from('ho_so_danh_muc_lop').update({ du_lieu_json: mangMucCon }).eq('id', idDanhMuc);
        if (error) throw error;

        document.getElementById('qlhs-modal-them-mc').remove();
        tabData.du_lieu_json = mangMucCon;
        window.ham_22_6_chon_tab(idDanhMuc);

        let tenDanhMucChuan = window.taoTenAnToan ? window.taoTenAnToan(tabData.ten_danh_muc, 40) : tabData.ten_danh_muc.replace(/[\\/:*?"<>| ]/g, "_");
        let tenMucConChuan = window.taoTenAnToan ? window.taoTenAnToan(tenMC, 40) : tenMC.replace(/[\\/:*?"<>| ]/g, "_");

        fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
            method: "POST",
            body: JSON.stringify({ action: "create_folder_ho_so_lop", maLop: window.qlhs_MaLopHienTai, tenDanhMuc: tenDanhMucChuan, tenMucCon: tenMucConChuan })
        }).catch(e => console.log("Lỗi tạo thư mục con Drive."));

    } catch (e) { alert("❌ Lỗi: " + e.message); }
};
// // =====================================================================
// // HÀM 22.16: MỞ CHI TIẾT MỘC MỤC CON VÀ RENDER CÁC THÀNH PHẦN (CÓ SẮP XẾP & ĐÁNH SỐ)
// // =====================================================================
// window.ham_22_16_mo_muc_con = function (idDanhMuc, idMucCon, kieuSort = 'TIME_ASC') {
//     const tabData = window.qlhs_DanhSachDanhMuc.find(t => t.id === idDanhMuc);
//     let mangMucCon = typeof tabData.du_lieu_json === 'string' ? JSON.parse(tabData.du_lieu_json || '[]') : tabData.du_lieu_json;
//     const mucCon = mangMucCon.find(m => m.idMucCon === idMucCon);
//     if (!mucCon) return;

//     const vungNoiDung = document.getElementById('qlhs-vung-noi-dung-tab');

//     let htmlHeader = `
//         <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #28a745; padding-bottom:15px; margin-bottom:20px; flex-wrap:wrap; gap:10px;">
//             <div style="display:flex; align-items:center; gap:8px;">
//                 <button onclick="window.ham_22_6_chon_tab('${idDanhMuc}')" style="background:#e9ecef; border:none; border-radius:50%; width:30px; height:30px; cursor:pointer; font-weight:bold; display:flex; align-items:center; justify-content:center;" title="Trở lại">🔙</button>
//                 <h3 style="margin:0; color:#28a745; display:flex; align-items:center; gap:8px;">
//                     <span style="color:#6c757d; font-weight:normal; font-size:18px;">${tabData.ten_danh_muc} /</span> 
//                     ${mucCon.tenMucCon}
//                     <button onclick="window.ham_22_25_sua_ten_muc_con('${idDanhMuc}', '${idMucCon}', true)" style="background:none; border:none; cursor:pointer; font-size:14px; margin-left:5px;" title="Sửa tên chuyên mục">✏️</button>
//                 </h3>
//             </div>
            
//             <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
//                 <select onchange="window.ham_22_16_mo_muc_con('${idDanhMuc}', '${idMucCon}', this.value)" style="padding:7px; border:1px solid #ced4da; border-radius:4px; outline:none; font-size:12px; color:#495057; background:#f8f9fa; cursor:pointer; font-weight:bold; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
//                     <option value="TIME_ASC" ${kieuSort === 'TIME_ASC' ? 'selected' : ''}>🔽 Thời gian: Cũ nhất ➔ Mới nhất</option>
//                     <option value="TIME_DESC" ${kieuSort === 'TIME_DESC' ? 'selected' : ''}>🔼 Thời gian: Mới nhất ➔ Cũ nhất</option>
//                     <option value="TYPE_ASC" ${kieuSort === 'TYPE_ASC' ? 'selected' : ''}>🗂️ Phân loại: Tăng (A ➔ Z)</option>
//                     <option value="TYPE_DESC" ${kieuSort === 'TYPE_DESC' ? 'selected' : ''}>🗂️ Phân loại: Giảm (Z ➔ A)</option>
//                 </select>
//                 <button onclick="window.ham_22_17_mo_modal_them_thanh_phan('${idDanhMuc}', '${idMucCon}')" style="padding:8px 15px; background:#28a745; color:#fff; border:none; border-radius:4px; font-size:13px; font-weight:bold; cursor:pointer; box-shadow: 0 2px 4px rgba(40,167,69,0.3);">
//                     ➕ Thêm Thành Phần
//                 </button>
//             </div>
//         </div>
//         <div id="qlhs-vung-render-thanh-phan" style="display:flex; flex-direction:column; gap:25px;"></div>
//     `;
//     vungNoiDung.innerHTML = htmlHeader;

//     const vungChiTiet = document.getElementById('qlhs-vung-render-thanh-phan');
//     let mangThanhPhan = mucCon.mangThanhPhan || [];

//     if (mangThanhPhan.length === 0) {
//         vungChiTiet.innerHTML = `
//             <div style="text-align:center; padding:50px;">
//                 <div style="font-size:40px; margin-bottom:15px;">🧩</div>
//                 <div style="font-size:16px; color:#6c757d; font-weight:bold;">Chuyên mục này chưa có Thành phần nào.</div>
//                 <div style="font-size:13px; color:#adb5bd; margin-top:5px;">Bấm "Thêm Thành Phần" ở góc trên để chèn Ảnh, File, Word hoặc Bảng Excel.</div>
//             </div>`;
//         return;
//     }

//     let sortedThanhPhan = [...mangThanhPhan];
//     sortedThanhPhan.sort((a, b) => {
//         let timeA = a.thoiGianTao ? new Date(a.thoiGianTao).getTime() : 0;
//         let timeB = b.thoiGianTao ? new Date(b.thoiGianTao).getTime() : 0;
//         let typeA = a.kieuThanhPhan || '';
//         let typeB = b.kieuThanhPhan || '';

//         if (kieuSort === 'TIME_DESC') return timeB - timeA;
//         if (kieuSort === 'TIME_ASC') return timeA - timeB;
//         if (kieuSort === 'TYPE_ASC') return typeA.localeCompare(typeB);
//         if (kieuSort === 'TYPE_DESC') return typeB.localeCompare(typeA);
//         return 0;
//     });

//     let htmlContent = '';
//     sortedThanhPhan.forEach((tp, idx) => {
//         let stt = idx + 1; // 🌟 Tạo Số thứ tự
//         let tpUI = '';

//         // --- 1. THÀNH PHẦN: ẢNH HOẶC FILE ---
//         if (tp.kieuThanhPhan === 'IMAGE' || tp.kieuThanhPhan === 'FILE') {
//             let dsFile = tp.duLieu.danhSachFile || [];
//             let htmlFiles = '';

//             if (dsFile.length === 0) {
//                 htmlFiles = `<div style="font-style:italic; color:#adb5bd; font-size:13px; padding:10px;">Chưa có tệp nào được tải lên.</div>`;
//             } else {
//                 // 🌟 KHUNG CHỨA BỌC NGOÀI ĐƯỢC CHUYỂN WIDTH: 100%
//                 htmlFiles += `<div style="display:flex; gap:20px; flex-wrap:wrap; align-items:flex-start; width:100%;">`;
//                 dsFile.forEach((f, fIdx) => {
//                     let isImg = f.name.toLowerCase().match(/\.(jpg|jpeg|png|gif|webp)$/i);
//                     let preview = isImg ? f.url : '📄';

//                     if (isImg && f.url.includes('drive.google.com')) {
//                         const mD = f.url.match(/\/d\/([a-zA-Z0-9_-]+)/);
//                         if (mD) preview = `https://drive.google.com/thumbnail?id=${mD[1]}&sz=w2500`; // 🌟 Tăng độ nét tối đa (2500px) để xem ảnh lớn
//                     }

//                     let numSize = parseFloat(f.size);
//                     let fileSizeText = isNaN(numSize) ? 'Chưa rõ dung lượng' : (numSize >= 1024 ? (numSize / 1024).toFixed(1) + ' MB' : numSize + ' KB');

//                     let displayContent = '';
//                     let cardWidth = isImg ? 'width: 100%;' : 'width: auto;'; // 🌟 ẢNH THÌ CHIẾM 100% BỀ NGANG, FILE THÌ ĐỨNG CẠNH NHAU

//                     if (isImg) {
//                         // 🌟 GIAO DIỆN ẢNH HIỂN THỊ TO HẾT CỠ TRONG KHUNG
//                         displayContent = `
//                             <div style="display:flex; flex-direction:column; align-items:center; width:100%;">
//                                 <!-- Bấm vào ảnh gọi hàm phóng to toàn màn hình -->
//                                 <img src="${preview}" onclick="window.ham_22_xem_anh_full_screen('${preview}')" style="width:100%; max-height:85vh; object-fit:contain; border-radius:8px; border:1px solid #dee2e6; background:#181818; display:block; cursor:zoom-in; box-shadow:0 4px 10px rgba(0,0,0,0.1);">
//                                 <div style="margin-top:12px; text-align:center; background:#f1f3f4; padding:8px 20px; border-radius:20px; width:fit-content; max-width:90%;">
//                                     <div style="font-size:14px; font-weight:bold; color:#0056b3; word-break:break-word; line-height:1.4;">${f.name}</div>
//                                     <div style="font-size:12px; color:#6c757d; margin-top:4px;">📏 ${fileSizeText} (Bấm vào ảnh để xem toàn màn hình)</div>
//                                 </div>
//                             </div>`;
//                     } else {
//                         // 🌟 GIAO DIỆN HIỂN THỊ FILE TÀI LIỆU
//                         displayContent = `
//                             <a href="${f.url}" target="_blank" style="text-decoration:none; display:flex; flex-direction:column; align-items:center; width: 140px;">
//                                 <div style="width:100%; height:110px; display:flex; align-items:center; justify-content:center; background:#f1f3f4; border-radius:8px; border:1px solid #dee2e6; box-shadow:inset 0 0 10px rgba(0,0,0,0.02);">
//                                     <span style="font-size:50px;">📄</span>
//                                 </div>
//                                 <div style="margin-top:10px; text-align:center; width:100%;">
//                                     <div style="font-size:12px; font-weight:bold; color:#0056b3; word-break:break-word; line-height:1.4; overflow:hidden; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical;" title="${f.name}">${f.name}</div>
//                                     <div style="font-size:11px; color:#6c757d; margin-top:5px;">📏 ${fileSizeText}</div>
//                                 </div>
//                             </a>`;
//                     }

//                     htmlFiles += `
//                         <div style="position:relative; animation:fadeIn 0.3s; ${cardWidth} background:#fff; padding:15px; border-radius:12px; border:1px solid #e9ecef; box-shadow:0 2px 5px rgba(0,0,0,0.04); transition:0.2s;" onmouseover="this.style.boxShadow='0 6px 15px rgba(0,123,255,0.15)'; this.style.borderColor='#b8daff'" onmouseout="this.style.boxShadow='0 2px 5px rgba(0,0,0,0.04)'; this.style.borderColor='#e9ecef'">
//                             ${displayContent}
//                             <button onclick="window.ham_22_20_xoa_file('${idDanhMuc}', '${idMucCon}', '${tp.idThanhPhan}', ${fIdx})" style="position:absolute; top:-8px; right:-8px; background:#dc3545; color:#fff; border:none; border-radius:50%; width:28px; height:28px; display:flex; align-items:center; justify-content:center; font-size:13px; font-weight:bold; cursor:pointer; box-shadow:0 2px 6px rgba(0,0,0,0.3); z-index:2;" title="Xóa tệp này">✖</button>
//                         </div>
//                     `;
//                 });
//                 htmlFiles += `</div>`;
//             }

//             tpUI = `
//                 <div style="margin-top:10px; background:#f8f9fa; padding:15px; border-radius:8px; border:1px dashed #ced4da;">
//                     ${htmlFiles}
//                     <div style="margin-top:20px; border-top:1px dashed #ccc; padding-top:15px;">
//                         <button onclick="this.nextElementSibling.click()" style="padding:8px 16px; background:#007bff; color:#fff; border:none; border-radius:6px; font-size:13px; font-weight:bold; cursor:pointer; box-shadow:0 2px 4px rgba(0,123,255,0.2);">☁️ Tải Tệp Lên (Hỗ trợ Ảnh & File)</button>
//                         <input type="file" accept="image/*, application/pdf, .doc, .docx, .xls, .xlsx, .rar, .zip" multiple style="display:none;" onchange="window.ham_22_19_upload_file_vao_thanh_phan(this, '${idDanhMuc}', '${idMucCon}', '${tp.idThanhPhan}')">
//                     </div>
//                 </div>
//             `;
//         }

//         // --- 2. THÀNH PHẦN: VĂN BẢN WORD ---
//         else if (tp.kieuThanhPhan === 'WORD') {
//             let noiDung = tp.duLieu.htmlContent || '<i>Bấm vào đây để bắt đầu soạn thảo văn bản...</i>';
//             tpUI = `
//                 <div style="margin-top:10px;">
//                     <div id="word-editor-${tp.idThanhPhan}" contenteditable="true" style="min-height:100px; padding:15px; border:1px solid #ced4da; border-radius:6px; background:#fff; outline:none; font-family:inherit; line-height:1.6;" onfocus="if(this.innerHTML.includes('Bấm vào đây')) this.innerHTML='';">${noiDung}</div>
//                     <div style="margin-top:8px; text-align:right;">
//                         <button onclick="window.ham_22_21_luu_noi_dung_thanh_phan('${idDanhMuc}', '${idMucCon}', '${tp.idThanhPhan}', 'WORD')" style="padding:6px 15px; background:#28a745; color:#fff; border:none; border-radius:4px; font-size:12px; font-weight:bold; cursor:pointer;">💾 Lưu Văn Bản</button>
//                     </div>
//                 </div>
//             `;
//         }

//         // --- 3. THÀNH PHẦN: BẢNG EXCEL ---
//         else if (tp.kieuThanhPhan === 'EXCEL') {
//             let noiDung = tp.duLieu.htmlTable || `
//                 <table style="width:100%; border-collapse:collapse; min-width:400px;">
//                     <thead><tr style="background:#e9ecef;"><th style="border:1px solid #ccc; padding:8px;">Cột 1</th><th style="border:1px solid #ccc; padding:8px;">Cột 2</th><th style="border:1px solid #ccc; padding:8px;">Cột 3</th></tr></thead>
//                     <tbody><tr><td style="border:1px solid #ccc; padding:8px;">Dữ liệu</td><td style="border:1px solid #ccc; padding:8px;">Dữ liệu</td><td style="border:1px solid #ccc; padding:8px;">Dữ liệu</td></tr></tbody>
//                 </table>`;

//             tpUI = `
//                 <div style="margin-top:10px;">
//                     <div style="font-size:11px; color:#6c757d; margin-bottom:5px; font-style:italic;">*Mẹo: Thầy/Cô có thể copy bảng từ Word/Excel và Paste thẳng vào khung này.</div>
//                     <div id="excel-editor-${tp.idThanhPhan}" contenteditable="true" style="width:100%; overflow-x:auto; padding:10px; border:1px solid #28a745; border-radius:6px; background:#fdfdfd; outline:none;">
//                         ${noiDung}
//                     </div>
//                     <div style="margin-top:8px; text-align:right;">
//                         <button onclick="window.ham_22_21_luu_noi_dung_thanh_phan('${idDanhMuc}', '${idMucCon}', '${tp.idThanhPhan}', 'EXCEL')" style="padding:6px 15px; background:#28a745; color:#fff; border:none; border-radius:4px; font-size:12px; font-weight:bold; cursor:pointer;">💾 Lưu Bảng Excel</button>
//                     </div>
//                 </div>
//             `;
//         }

//         let tgTaoTP = tp.thoiGianTao ? new Date(tp.thoiGianTao).toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' }) : '';
//         let htmlTgTaoTP = tgTaoTP ? `<span style="font-size:12px; font-weight:normal; color:#adb5bd; margin-left:15px; font-style:italic;">🕒 ${tgTaoTP}</span>` : '';
//         let iconTitle = tp.kieuThanhPhan === 'IMAGE' ? '🖼️' : (tp.kieuThanhPhan === 'FILE' ? '📎' : (tp.kieuThanhPhan === 'WORD' ? '📝' : '📊'));
//         let mainColor = tp.kieuThanhPhan === 'EXCEL' ? '#28a745' : '#007bff'; // Đổi màu viền theo loại dữ liệu

//         htmlContent += `
//             <div style="background:#fff; border:1px solid #dee2e6; border-radius:8px; box-shadow:0 2px 5px rgba(0,0,0,0.02); padding:20px; position:relative;">
//                 <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid ${mainColor}; padding-bottom:8px; flex-wrap:wrap; gap:10px;">
//                     <div style="display:flex; align-items:center; gap:10px;">
//                         <h4 style="margin:0; font-size:15px; color:#333; display:flex; align-items:center; flex-wrap:wrap;">
//                             <!-- 🌟 Vòng tròn chứa STT -->
//                             <span style="background:${mainColor}; color:#fff; border-radius:50%; width:24px; height:24px; display:inline-flex; align-items:center; justify-content:center; font-size:13px; margin-right:8px; font-weight:bold; box-shadow: 0 1px 2px rgba(0,0,0,0.15);">${stt}</span>
//                             ${iconTitle} ${tp.tenThanhPhan}
//                             ${htmlTgTaoTP}
//                         </h4>
//                         <button onclick="window.ham_22_27_sua_ten_thanh_phan('${idDanhMuc}', '${idMucCon}', '${tp.idThanhPhan}')" style="background:none; border:none; cursor:pointer; font-size:13px; margin-left:5px;" title="Sửa tên thành phần">✏️</button>
//                     </div>
//                     <div style="display:flex; align-items:center; gap:8px;">
//                         <button type="button" onclick="let c = document.getElementById('body-tp-${tp.idThanhPhan}'); if(c.style.display==='none'){c.style.display='block'; this.innerHTML='🔽 Thu gọn';}else{c.style.display='none'; this.innerHTML='👁️ Mở rộng';}" style="background: #f8f9fa; border: 1px solid #ccc; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: bold; color: #495057; transition: 0.2s;" onmouseover="this.style.background='#e9ecef'" onmouseout="this.style.background='#f8f9fa'">🔽 Thu gọn</button>
//                         <button onclick="if(confirm('⚠️ Xóa thành phần này?')) window.ham_22_22_xoa_thanh_phan('${idDanhMuc}', '${idMucCon}', '${tp.idThanhPhan}')" style="background:none; border:none; color:#dc3545; cursor:pointer; font-size:14px; font-weight:bold;" title="Xóa thành phần">🗑️ Xóa</button>
//                     </div>
//                 </div>
//                 <div id="body-tp-${tp.idThanhPhan}" style="display:block; animation: fadeIn 0.3s;">
//                     ${tpUI}
//                 </div>
//             </div>
//         `;
//     });

//     vungChiTiet.innerHTML = htmlContent;
// };


// // =====================================================================
// // HÀM 22.16: CHI TIẾT "CHUYÊN MỤC CON" (Cấp độ 3 - MỚI CHUYỂN DẠNG BẢNG)
// // =====================================================================
// window.ham_22_16_mo_muc_con = function (idDanhMuc, idMucCon, kieuSortTP = 'TIME_ASC') {
//     const tabData = window.qlhs_DanhSachDanhMuc.find(t => t.id === idDanhMuc);
//     let mangMucCon = typeof tabData.du_lieu_json === 'string' ? JSON.parse(tabData.du_lieu_json || '[]') : tabData.du_lieu_json;
//     const mucCon = mangMucCon.find(m => m.idMucCon === idMucCon);
//     if (!mucCon) return;

//     const vungNoiDung = document.getElementById('qlhs-vung-noi-dung-tab');

//     let htmlHeader = `
//         <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #28a745; padding-bottom:15px; margin-bottom:20px; flex-wrap:wrap; gap:10px;">
//             <div style="display:flex; align-items:center; gap:8px;">
//                 <button onclick="window.ham_22_6_chon_tab('${idDanhMuc}')" style="background:#e9ecef; border:none; border-radius:50%; width:30px; height:30px; cursor:pointer; font-weight:bold; display:flex; align-items:center; justify-content:center;" title="Trở lại">🔙</button>
//                 <h3 style="margin:0; color:#28a745; display:flex; align-items:center; gap:8px;">
//                     <span style="color:#6c757d; font-weight:normal; font-size:18px;">${tabData.ten_danh_muc} /</span> 
//                     ${mucCon.tenMucCon}
//                     <button onclick="window.ham_22_25_sua_ten_muc_con('${idDanhMuc}', '${idMucCon}', true)" style="background:none; border:none; cursor:pointer; font-size:14px; margin-left:5px;" title="Sửa tên chuyên mục">✏️</button>
//                 </h3>
//             </div>
//             <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
//                 <button onclick="window.ham_22_17_mo_modal_them_thanh_phan('${idDanhMuc}', '${idMucCon}')" style="padding:8px 15px; background:#28a745; color:#fff; border:none; border-radius:4px; font-size:13px; font-weight:bold; cursor:pointer; box-shadow: 0 2px 4px rgba(40,167,69,0.3);">
//                     ➕ Thêm Chuyên Mục Con
//                 </button>
//             </div>
//         </div>
//         <div style="font-size:13px; color:#6c757d; margin-bottom:15px; font-style:italic;">Bấm vào tiêu đề cột để sắp xếp. Bấm vào một dòng bên dưới để Mở/Đóng nội dung (File/Ảnh/Excel...).</div>
//         <div id="qlhs-vung-render-thanh-phan" style="display:flex; flex-direction:column; gap:25px;"></div>
//     `;
//     vungNoiDung.innerHTML = htmlHeader;

//     const vungChiTiet = document.getElementById('qlhs-vung-render-thanh-phan');
//     let mangThanhPhan = mucCon.mangThanhPhan || [];

//     if (mangThanhPhan.length === 0) {
//         vungChiTiet.innerHTML = `
//             <div style="text-align:center; padding:50px;">
//                 <div style="font-size:40px; margin-bottom:15px;">🧩</div>
//                 <div style="font-size:16px; color:#6c757d; font-weight:bold;">Chuyên mục này chưa có Chuyên mục con nào.</div>
//                 <div style="font-size:13px; color:#adb5bd; margin-top:5px;">Bấm "Thêm Chuyên Mục Con" ở góc trên để chèn Ảnh, File, Word hoặc Bảng Excel.</div>
//             </div>`;
//         return;
//     }

//     // 🌟 SẮP XẾP CHUYÊN MỤC CON (CẤP ĐỘ 3)
//     let sortedThanhPhan = [...mangThanhPhan];
//     sortedThanhPhan.sort((a, b) => {
//         let timeA = a.thoiGianTao ? new Date(a.thoiGianTao).getTime() : 0;
//         let timeB = b.thoiGianTao ? new Date(b.thoiGianTao).getTime() : 0;
//         let nameA = (a.tenThanhPhan || '').toLowerCase();
//         let nameB = (b.tenThanhPhan || '').toLowerCase();
//         let typeA = (a.kieuThanhPhan || '').toLowerCase();
//         let typeB = (b.kieuThanhPhan || '').toLowerCase();

//         if (kieuSortTP === 'TIME_DESC') return timeB - timeA;
//         if (kieuSortTP === 'TIME_ASC') return timeA - timeB;
//         if (kieuSortTP === 'NAME_ASC') return nameA.localeCompare(nameB, 'vi');
//         if (kieuSortTP === 'NAME_DESC') return nameB.localeCompare(nameA, 'vi');
//         if (kieuSortTP === 'TYPE_ASC') return typeA.localeCompare(typeB, 'vi');
//         if (kieuSortTP === 'TYPE_DESC') return typeB.localeCompare(typeA, 'vi');
//         return 0;
//     });

//     let iconThoiGian = kieuSortTP === 'TIME_DESC' ? '🔽' : (kieuSortTP === 'TIME_ASC' ? '🔼' : '↕️');
//     let iconTen = kieuSortTP === 'NAME_ASC' ? '🔽' : (kieuSortTP === 'NAME_DESC' ? '🔼' : '↕️');
//     let iconType = kieuSortTP === 'TYPE_ASC' ? '🔽' : (kieuSortTP === 'TYPE_DESC' ? '🔼' : '↕️');

//     // 🌟 HIỂN THỊ CHUYÊN MỤC CON LÊN BẢNG (TABLE) THAY VÌ KHỐI RỜI RẠC
//     let tableHtml = `
//         <div style="overflow-x: auto; border-radius: 8px; border: 1px solid #dee2e6; box-shadow: 0 4px 10px rgba(0,0,0,0.03);">
//             <table style="width: 100%; border-collapse: collapse; font-size: 14px; text-align: left; background: #fff;">
//                 <thead>
//                     <tr style="background: #e9f5e9; color: #155724; border-bottom: 2px solid #c3e6cb;">
//                         <th style="padding: 12px; width: 50px; text-align: center;">STT</th>
                        
//                         <th onclick="window.ham_22_16_mo_muc_con('${idDanhMuc}', '${idMucCon}', '${kieuSortTP === 'NAME_ASC' ? 'NAME_DESC' : 'NAME_ASC'}')" 
//                             style="padding: 12px; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#d4edda'" onmouseout="this.style.background='transparent'" title="Bấm để sắp xếp theo tên">
//                             Tên Chuyên Mục Con <span style="font-size:12px;">${iconTen}</span>
//                         </th>
                        
//                         <th onclick="window.ham_22_16_mo_muc_con('${idDanhMuc}', '${idMucCon}', '${kieuSortTP === 'TYPE_ASC' ? 'TYPE_DESC' : 'TYPE_ASC'}')" 
//                             style="padding: 12px; width: 160px; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#d4edda'" onmouseout="this.style.background='transparent'" title="Bấm để sắp xếp theo định dạng">
//                             Định Dạng <span style="font-size:12px;">${iconType}</span>
//                         </th>
                        
//                         <th onclick="window.ham_22_16_mo_muc_con('${idDanhMuc}', '${idMucCon}', '${kieuSortTP === 'TIME_DESC' ? 'TIME_ASC' : 'TIME_DESC'}')" 
//                             style="padding: 12px; width: 150px; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#d4edda'" onmouseout="this.style.background='transparent'">
//                             Thời Gian Tạo <span style="font-size:12px;">${iconThoiGian}</span>
//                         </th>
                        
//                         <th style="padding: 12px; width: 100px; text-align: center;">Thao Tác</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//     `;

//     sortedThanhPhan.forEach((tp, idx) => {
//         let stt = idx + 1;
//         let tgTaoTP = tp.thoiGianTao ? new Date(tp.thoiGianTao).toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' }) : '---';
//         let typeLabel = tp.kieuThanhPhan === 'IMAGE' ? '🖼️ Cụm Ảnh' : (tp.kieuThanhPhan === 'FILE' ? '📎 Cụm File' : (tp.kieuThanhPhan === 'WORD' ? '📝 Văn bản' : '📊 Bảng Excel'));
//         let mainColor = tp.kieuThanhPhan === 'EXCEL' ? '#28a745' : '#007bff';

//         let tpUI = '';
//         if (tp.kieuThanhPhan === 'IMAGE' || tp.kieuThanhPhan === 'FILE') {
//             let dsFile = tp.duLieu.danhSachFile || [];
//             let htmlFiles = '';

//             if (dsFile.length === 0) {
//                 htmlFiles = `<div style="font-style:italic; color:#adb5bd; font-size:13px; padding:10px;">Chưa có tệp nào được tải lên.</div>`;
//             } else {
//                 htmlFiles += `<div style="display:flex; gap:20px; flex-wrap:wrap; align-items:flex-start; width:100%;">`;
//                 dsFile.forEach((f, fIdx) => {
//                     let isImg = f.name.toLowerCase().match(/\.(jpg|jpeg|png|gif|webp)$/i);
//                     let preview = isImg ? f.url : '📄';
//                     if (isImg && f.url.includes('drive.google.com')) {
//                         const mD = f.url.match(/\/d\/([a-zA-Z0-9_-]+)/);
//                         if (mD) preview = `https://drive.google.com/thumbnail?id=${mD[1]}&sz=w2500`;
//                     }
//                     let numSize = parseFloat(f.size);
//                     let fileSizeText = isNaN(numSize) ? 'Chưa rõ dung lượng' : (numSize >= 1024 ? (numSize / 1024).toFixed(1) + ' MB' : numSize + ' KB');
//                     let cardWidth = isImg ? 'width: 100%;' : 'width: auto;';
//                     let displayContent = '';

//                     if (isImg) {
//                         displayContent = `
//                             <div style="display:flex; flex-direction:column; align-items:center; width:100%;">
//                                 <img src="${preview}" onclick="window.ham_22_xem_anh_full_screen('${preview}')" style="width:100%; max-height:85vh; object-fit:contain; border-radius:8px; border:1px solid #dee2e6; background:#181818; display:block; cursor:zoom-in; box-shadow:0 4px 10px rgba(0,0,0,0.1);">
//                                 <div style="margin-top:12px; text-align:center; background:#f1f3f4; padding:8px 20px; border-radius:20px; width:fit-content; max-width:90%;">
//                                     <div style="font-size:14px; font-weight:bold; color:#0056b3; word-break:break-word; line-height:1.4;">${f.name}</div>
//                                     <div style="font-size:12px; color:#6c757d; margin-top:4px;">📏 ${fileSizeText} (Bấm vào ảnh để xem toàn màn hình)</div>
//                                 </div>
//                             </div>`;
//                     } else {
//                         displayContent = `
//                             <a href="${f.url}" target="_blank" style="text-decoration:none; display:flex; flex-direction:column; align-items:center; width: 140px;">
//                                 <div style="width:100%; height:110px; display:flex; align-items:center; justify-content:center; background:#f1f3f4; border-radius:8px; border:1px solid #dee2e6; box-shadow:inset 0 0 10px rgba(0,0,0,0.02);">
//                                     <span style="font-size:50px;">📄</span>
//                                 </div>
//                                 <div style="margin-top:10px; text-align:center; width:100%;">
//                                     <div style="font-size:12px; font-weight:bold; color:#0056b3; word-break:break-word; line-height:1.4; overflow:hidden; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical;" title="${f.name}">${f.name}</div>
//                                     <div style="font-size:11px; color:#6c757d; margin-top:5px;">📏 ${fileSizeText}</div>
//                                 </div>
//                             </a>`;
//                     }

//                     htmlFiles += `
//                         <div style="position:relative; animation:fadeIn 0.3s; ${cardWidth} background:#fff; padding:15px; border-radius:12px; border:1px solid #e9ecef; box-shadow:0 2px 5px rgba(0,0,0,0.04); transition:0.2s;" onmouseover="this.style.boxShadow='0 6px 15px rgba(0,123,255,0.15)'; this.style.borderColor='#b8daff'" onmouseout="this.style.boxShadow='0 2px 5px rgba(0,0,0,0.04)'; this.style.borderColor='#e9ecef'">
//                             ${displayContent}
//                             <button onclick="window.ham_22_20_xoa_file('${idDanhMuc}', '${idMucCon}', '${tp.idThanhPhan}', ${fIdx})" style="position:absolute; top:-8px; right:-8px; background:#dc3545; color:#fff; border:none; border-radius:50%; width:28px; height:28px; display:flex; align-items:center; justify-content:center; font-size:13px; font-weight:bold; cursor:pointer; box-shadow:0 2px 6px rgba(0,0,0,0.3); z-index:2;" title="Xóa tệp này">✖</button>
//                         </div>
//                     `;
//                 });
//                 htmlFiles += `</div>`;
//             }

//             tpUI = `
//                 <div style="margin-top:5px; background:#f8f9fa; padding:15px; border-radius:8px; border:1px dashed #ced4da;">
//                     ${htmlFiles}
//                     <div style="margin-top:20px; border-top:1px dashed #ccc; padding-top:15px;">
//                         <button onclick="this.nextElementSibling.click()" style="padding:8px 16px; background:#007bff; color:#fff; border:none; border-radius:6px; font-size:13px; font-weight:bold; cursor:pointer; box-shadow:0 2px 4px rgba(0,123,255,0.2);">☁️ Tải Tệp Lên</button>
//                         <input type="file" accept="image/*, application/pdf, .doc, .docx, .xls, .xlsx, .rar, .zip" multiple style="display:none;" onchange="window.ham_22_19_upload_file_vao_thanh_phan(this, '${idDanhMuc}', '${idMucCon}', '${tp.idThanhPhan}')">
//                     </div>
//                 </div>
//             `;
//         }
//         else if (tp.kieuThanhPhan === 'WORD') {
//             let noiDung = tp.duLieu.htmlContent || '<i>Bấm vào đây để bắt đầu soạn thảo văn bản...</i>';
//             tpUI = `
//                 <div style="margin-top:5px;">
//                     <div id="word-editor-${tp.idThanhPhan}" contenteditable="true" style="min-height:100px; padding:15px; border:1px solid #ced4da; border-radius:6px; background:#fff; outline:none; font-family:inherit; line-height:1.6;" onfocus="if(this.innerHTML.includes('Bấm vào đây')) this.innerHTML='';">${noiDung}</div>
//                     <div style="margin-top:8px; text-align:right;">
//                         <button onclick="window.ham_22_21_luu_noi_dung_thanh_phan('${idDanhMuc}', '${idMucCon}', '${tp.idThanhPhan}', 'WORD')" style="padding:6px 15px; background:#28a745; color:#fff; border:none; border-radius:4px; font-size:12px; font-weight:bold; cursor:pointer;">💾 Lưu Văn Bản</button>
//                     </div>
//                 </div>
//             `;
//         }
//         else if (tp.kieuThanhPhan === 'EXCEL') {
//             let noiDung = tp.duLieu.htmlTable || `
//                 <table style="width:100%; border-collapse:collapse; min-width:400px;">
//                     <thead><tr style="background:#e9ecef;"><th style="border:1px solid #ccc; padding:8px;">Cột 1</th><th style="border:1px solid #ccc; padding:8px;">Cột 2</th><th style="border:1px solid #ccc; padding:8px;">Cột 3</th></tr></thead>
//                     <tbody><tr><td style="border:1px solid #ccc; padding:8px;">Dữ liệu</td><td style="border:1px solid #ccc; padding:8px;">Dữ liệu</td><td style="border:1px solid #ccc; padding:8px;">Dữ liệu</td></tr></tbody>
//                 </table>`;

//             tpUI = `
//                 <div style="margin-top:5px;">
//                     <div style="font-size:11px; color:#6c757d; margin-bottom:5px; font-style:italic;">*Mẹo: Có thể copy bảng từ Word/Excel và Paste thẳng vào khung này.</div>
//                     <div id="excel-editor-${tp.idThanhPhan}" contenteditable="true" style="width:100%; overflow-x:auto; padding:10px; border:1px solid #28a745; border-radius:6px; background:#fdfdfd; outline:none;">
//                         ${noiDung}
//                     </div>
//                     <div style="margin-top:8px; text-align:right;">
//                         <button onclick="window.ham_22_21_luu_noi_dung_thanh_phan('${idDanhMuc}', '${idMucCon}', '${tp.idThanhPhan}', 'EXCEL')" style="padding:6px 15px; background:#28a745; color:#fff; border:none; border-radius:4px; font-size:12px; font-weight:bold; cursor:pointer;">💾 Lưu Bảng Excel</button>
//                     </div>
//                 </div>
//             `;
//         }

//         tableHtml += `
//             <tr style="border-bottom: 1px solid #e9ecef; transition: 0.2s; cursor: pointer; background: #fff;" 
//                 onmouseover="this.style.background='#f1f8ff'" onmouseout="this.style.background='#fff'" 
//                 onclick="let c = document.getElementById('body-tp-${tp.idThanhPhan}'); let i = document.getElementById('icon-toggle-${tp.idThanhPhan}'); if(c.style.display==='none'){c.style.display='table-row'; i.innerText='🔽';}else{c.style.display='none'; i.innerText='▶️';}">
                
//                 <td style="padding: 12px; text-align: center; font-weight: bold; color: #28a745;">${stt}</td>
                
//                 <td style="padding: 12px;">
//                     <div style="display: flex; align-items: center; gap: 10px;">
//                         <span id="icon-toggle-${tp.idThanhPhan}" style="font-size: 12px; color: #007bff;">▶️</span>
//                         <span style="font-weight: bold; color: #333; font-size: 15px;">${tp.tenThanhPhan}</span>
//                     </div>
//                 </td>
                
//                 <td style="padding: 12px; font-weight: bold; color: ${mainColor};">${typeLabel}</td>
//                 <td style="padding: 12px; font-size: 12px; color: #6c757d; font-style: italic;">${tgTaoTP}</td>
                
//                 <td style="padding: 12px; text-align: center;" onclick="event.stopPropagation();">
//                     <button onclick="window.ham_22_27_sua_ten_thanh_phan('${idDanhMuc}', '${idMucCon}', '${tp.idThanhPhan}')" style="background:none; border:none; cursor:pointer; font-size:14px; margin-right: 5px;" title="Sửa tên">✏️</button>
//                     <button onclick="if(confirm('⚠️ Xóa Chuyên mục con này? Toàn bộ file đính kèm trên Google Drive sẽ bị xóa theo!')) window.ham_22_22_xoa_thanh_phan('${idDanhMuc}', '${idMucCon}', '${tp.idThanhPhan}')" style="background:none; border:none; cursor:pointer; font-size:14px; color:#dc3545;" title="Xóa">🗑️</button>
//                 </td>
//             </tr>
            
//             <!-- 🌟 Dòng chứa nội dung (File/Ảnh/Word/Excel) ẨN ĐI MẶC ĐỊNH -->
//             <tr id="body-tp-${tp.idThanhPhan}" style="display: none; background: #fafbfc; border-bottom: 2px solid #28a745;">
//                 <td colspan="5" style="padding: 20px;">
//                     ${tpUI}
//                 </td>
//             </tr>
//         `;
//     });

//     tableHtml += `</tbody></table></div>`;
//     vungChiTiet.innerHTML = tableHtml;
// };


// // =====================================================================
// // HÀM 22.16: CHI TIẾT "CHUYÊN MỤC CON" (Cấp độ 3 - HIỂN THỊ MẶC ĐỊNH BUNG NỘI DUNG & SORT)
// // =====================================================================
// window.ham_22_16_mo_muc_con = function (idDanhMuc, idMucCon, kieuSortTP = 'STATUS_TIME') {
//     // Lưu trạng thái sắp xếp hiện tại để dùng cho hàm checkbox
//     window.qlhs_KieuSortTPHienTai = kieuSortTP;

//     const tabData = window.qlhs_DanhSachDanhMuc.find(t => t.id === idDanhMuc);
//     let mangMucCon = typeof tabData.du_lieu_json === 'string' ? JSON.parse(tabData.du_lieu_json || '[]') : tabData.du_lieu_json;
//     const mucCon = mangMucCon.find(m => m.idMucCon === idMucCon);
//     if (!mucCon) return;

//     const vungNoiDung = document.getElementById('qlhs-vung-noi-dung-tab');

//     let htmlHeader = `
//         <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #28a745; padding-bottom:15px; margin-bottom:20px; flex-wrap:wrap; gap:10px;">
//             <div style="display:flex; align-items:center; gap:8px;">
//                 <button onclick="window.ham_22_6_chon_tab('${idDanhMuc}')" style="background:#e9ecef; border:none; border-radius:50%; width:30px; height:30px; cursor:pointer; font-weight:bold; display:flex; align-items:center; justify-content:center;" title="Trở lại">🔙</button>
//                 <h3 style="margin:0; color:#28a745; display:flex; align-items:center; gap:8px;">
//                     <span style="color:#6c757d; font-weight:normal; font-size:18px;">${tabData.ten_danh_muc} /</span> 
//                     ${mucCon.tenMucCon}
//                     <button onclick="window.ham_22_25_sua_ten_muc_con('${idDanhMuc}', '${idMucCon}', true)" style="background:none; border:none; cursor:pointer; font-size:14px; margin-left:5px;" title="Sửa tên chuyên mục">✏️</button>
//                 </h3>
//             </div>
//             <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
//                 <button onclick="window.ham_22_17_mo_modal_them_thanh_phan('${idDanhMuc}', '${idMucCon}')" style="padding:8px 15px; background:#28a745; color:#fff; border:none; border-radius:4px; font-size:13px; font-weight:bold; cursor:pointer; box-shadow: 0 2px 4px rgba(40,167,69,0.3);">
//                     ➕ Thêm Chuyên Mục Con
//                 </button>
//             </div>
//         </div>
//         <div style="font-size:13px; color:#6c757d; margin-bottom:15px; font-style:italic;">Bấm vào tiêu đề cột để sắp xếp. Bấm vào một dòng bên dưới để Thu gọn/Mở rộng nội dung đính kèm.</div>
//         <div id="qlhs-vung-render-thanh-phan" style="display:flex; flex-direction:column; gap:25px;"></div>
//     `;
//     vungNoiDung.innerHTML = htmlHeader;

//     const vungChiTiet = document.getElementById('qlhs-vung-render-thanh-phan');
//     let mangThanhPhan = mucCon.mangThanhPhan || [];

//     if (mangThanhPhan.length === 0) {
//         vungChiTiet.innerHTML = `
//             <div style="text-align:center; padding:50px;">
//                 <div style="font-size:40px; margin-bottom:15px;">🧩</div>
//                 <div style="font-size:16px; color:#6c757d; font-weight:bold;">Chuyên mục này chưa có Chuyên mục con nào.</div>
//                 <div style="font-size:13px; color:#adb5bd; margin-top:5px;">Bấm "Thêm Chuyên Mục Con" ở góc trên để chèn Ảnh, File, Word hoặc Bảng Excel.</div>
//             </div>`;
//         return;
//     }

//     // 🌟 SẮP XẾP CHUYÊN MỤC CON (CẤP ĐỘ 3) - CÓ STATUS HOÀN THÀNH
//     let sortedThanhPhan = [...mangThanhPhan];
//     sortedThanhPhan.sort((a, b) => {
//         let timeA = a.thoiGianTao ? new Date(a.thoiGianTao).getTime() : 0;
//         let timeB = b.thoiGianTao ? new Date(b.thoiGianTao).getTime() : 0;
//         let nameA = (a.tenThanhPhan || '').toLowerCase();
//         let nameB = (b.tenThanhPhan || '').toLowerCase();
//         let typeA = (a.kieuThanhPhan || '').toLowerCase();
//         let typeB = (b.kieuThanhPhan || '').toLowerCase();
//         let statusA = a.hoanThanh ? 1 : 0;
//         let statusB = b.hoanThanh ? 1 : 0;

//         if (kieuSortTP === 'STATUS_TIME') {
//             if (statusA !== statusB) return statusA - statusB;
//             return timeA - timeB;
//         }
//         if (kieuSortTP === 'STATUS_TIME_REV') {
//             if (statusA !== statusB) return statusB - statusA;
//             return timeA - timeB;
//         }
//         if (kieuSortTP === 'TIME_DESC') return timeB - timeA;
//         if (kieuSortTP === 'TIME_ASC') return timeA - timeB;
//         if (kieuSortTP === 'NAME_ASC') return nameA.localeCompare(nameB, 'vi');
//         if (kieuSortTP === 'NAME_DESC') return nameB.localeCompare(nameA, 'vi');
//         if (kieuSortTP === 'TYPE_ASC') return typeA.localeCompare(typeB, 'vi');
//         if (kieuSortTP === 'TYPE_DESC') return typeB.localeCompare(typeA, 'vi');
//         return 0;
//     });

//     let iconThoiGian = kieuSortTP === 'TIME_DESC' ? '🔽' : (kieuSortTP === 'TIME_ASC' ? '🔼' : '↕️');
//     let iconTen = kieuSortTP === 'NAME_ASC' ? '🔽' : (kieuSortTP === 'NAME_DESC' ? '🔼' : '↕️');
//     let iconType = kieuSortTP === 'TYPE_ASC' ? '🔽' : (kieuSortTP === 'TYPE_DESC' ? '🔼' : '↕️');
//     let iconTrangThai = kieuSortTP === 'STATUS_TIME' ? '🔽' : (kieuSortTP === 'STATUS_TIME_REV' ? '🔼' : '↕️');

//     // 🌟 HIỂN THỊ CHUYÊN MỤC CON LÊN BẢNG CÓ CỘT TRẠNG THÁI
//     let tableHtml = `
//         <div style="overflow-x: auto; border-radius: 8px; border: 1px solid #dee2e6; box-shadow: 0 4px 10px rgba(0,0,0,0.03);">
//             <table style="width: 100%; border-collapse: collapse; font-size: 14px; text-align: left; background: #fff;">
//                 <thead>
//                     <tr style="background: #e9f5e9; color: #155724; border-bottom: 2px solid #c3e6cb;">
//                         <th style="padding: 12px; width: 50px; text-align: center;">STT</th>
                        
//                         <th onclick="window.ham_22_16_mo_muc_con('${idDanhMuc}', '${idMucCon}', '${kieuSortTP === 'NAME_ASC' ? 'NAME_DESC' : 'NAME_ASC'}')" 
//                             style="padding: 12px; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#d4edda'" onmouseout="this.style.background='transparent'" title="Bấm để sắp xếp theo tên">
//                             Tên Chuyên Mục Con <span style="font-size:12px;">${iconTen}</span>
//                         </th>
                        
//                         <th onclick="window.ham_22_16_mo_muc_con('${idDanhMuc}', '${idMucCon}', '${kieuSortTP === 'TYPE_ASC' ? 'TYPE_DESC' : 'TYPE_ASC'}')" 
//                             style="padding: 12px; width: 140px; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#d4edda'" onmouseout="this.style.background='transparent'" title="Bấm để sắp xếp theo định dạng">
//                             Định Dạng <span style="font-size:12px;">${iconType}</span>
//                         </th>
                        
//                         <th onclick="window.ham_22_16_mo_muc_con('${idDanhMuc}', '${idMucCon}', '${kieuSortTP === 'TIME_DESC' ? 'TIME_ASC' : 'TIME_DESC'}')" 
//                             style="padding: 12px; width: 140px; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#d4edda'" onmouseout="this.style.background='transparent'">
//                             Thời Gian Tạo <span style="font-size:12px;">${iconThoiGian}</span>
//                         </th>

//                         <!-- CỘT TRẠNG THÁI MỚI -->
//                         <th onclick="window.ham_22_16_mo_muc_con('${idDanhMuc}', '${idMucCon}', '${kieuSortTP === 'STATUS_TIME' ? 'STATUS_TIME_REV' : 'STATUS_TIME'}')" 
//                             style="padding: 12px; width: 130px; text-align: center; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#d4edda'" onmouseout="this.style.background='transparent'" title="Sắp xếp trạng thái">
//                             Trạng Thái <span style="font-size:12px;">${iconTrangThai}</span>
//                         </th>
                        
//                         <th style="padding: 12px; width: 100px; text-align: center;">Thao Tác</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//     `;

//     sortedThanhPhan.forEach((tp, idx) => {
//         let stt = idx + 1;
//         let tgTaoTP = tp.thoiGianTao ? new Date(tp.thoiGianTao).toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' }) : '---';
//         let typeLabel = tp.kieuThanhPhan === 'IMAGE' ? '🖼️ Cụm Ảnh' : (tp.kieuThanhPhan === 'FILE' ? '📎 Cụm File' : (tp.kieuThanhPhan === 'WORD' ? '📝 Văn bản' : '📊 Bảng Excel'));
//         let mainColor = tp.kieuThanhPhan === 'EXCEL' ? '#28a745' : '#007bff';
//         let rowBg = tp.hoanThanh ? '#f8fff9' : '#fff';

//         let tpUI = '';
//         if (tp.kieuThanhPhan === 'IMAGE' || tp.kieuThanhPhan === 'FILE') {
//             let dsFile = tp.duLieu.danhSachFile || [];
//             let htmlFiles = '';

//             if (dsFile.length === 0) {
//                 htmlFiles = `<div style="font-style:italic; color:#adb5bd; font-size:13px; padding:10px;">Chưa có tệp nào được tải lên.</div>`;
//             } else {
//                 htmlFiles += `<div style="display:flex; gap:20px; flex-wrap:wrap; align-items:flex-start; width:100%;">`;
//                 dsFile.forEach((f, fIdx) => {
//                     let isImg = f.name.toLowerCase().match(/\.(jpg|jpeg|png|gif|webp)$/i);
//                     let preview = isImg ? f.url : '📄';
//                     if (isImg && f.url.includes('drive.google.com')) {
//                         const mD = f.url.match(/\/d\/([a-zA-Z0-9_-]+)/);
//                         if (mD) preview = `https://drive.google.com/thumbnail?id=${mD[1]}&sz=w2500`;
//                     }
//                     let numSize = parseFloat(f.size);
//                     let fileSizeText = isNaN(numSize) ? 'Chưa rõ dung lượng' : (numSize >= 1024 ? (numSize / 1024).toFixed(1) + ' MB' : numSize + ' KB');
//                     let cardWidth = isImg ? 'width: 100%;' : 'width: auto;';
//                     let displayContent = '';

//                     if (isImg) {
//                         displayContent = `
//                             <div style="display:flex; flex-direction:column; align-items:center; width:100%;">
//                                 <img src="${preview}" onclick="window.ham_22_xem_anh_full_screen('${preview}')" style="width:100%; max-height:85vh; object-fit:contain; border-radius:8px; border:1px solid #dee2e6; background:#181818; display:block; cursor:zoom-in; box-shadow:0 4px 10px rgba(0,0,0,0.1);">
//                                 <div style="margin-top:12px; text-align:center; background:#f1f3f4; padding:8px 20px; border-radius:20px; width:fit-content; max-width:90%;">
//                                     <div style="font-size:14px; font-weight:bold; color:#0056b3; word-break:break-word; line-height:1.4;">${f.name}</div>
//                                     <div style="font-size:12px; color:#6c757d; margin-top:4px;">📏 ${fileSizeText} (Bấm vào ảnh để xem toàn màn hình)</div>
//                                 </div>
//                             </div>`;
//                     } else {
//                         displayContent = `
//                             <a href="${f.url}" target="_blank" style="text-decoration:none; display:flex; flex-direction:column; align-items:center; width: 140px;">
//                                 <div style="width:100%; height:110px; display:flex; align-items:center; justify-content:center; background:#f1f3f4; border-radius:8px; border:1px solid #dee2e6; box-shadow:inset 0 0 10px rgba(0,0,0,0.02);">
//                                     <span style="font-size:50px;">📄</span>
//                                 </div>
//                                 <div style="margin-top:10px; text-align:center; width:100%;">
//                                     <div style="font-size:12px; font-weight:bold; color:#0056b3; word-break:break-word; line-height:1.4; overflow:hidden; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical;" title="${f.name}">${f.name}</div>
//                                     <div style="font-size:11px; color:#6c757d; margin-top:5px;">📏 ${fileSizeText}</div>
//                                 </div>
//                             </a>`;
//                     }

//                     htmlFiles += `
//                         <div style="position:relative; animation:fadeIn 0.3s; ${cardWidth} background:#fff; padding:15px; border-radius:12px; border:1px solid #e9ecef; box-shadow:0 2px 5px rgba(0,0,0,0.04); transition:0.2s;" onmouseover="this.style.boxShadow='0 6px 15px rgba(0,123,255,0.15)'; this.style.borderColor='#b8daff'" onmouseout="this.style.boxShadow='0 2px 5px rgba(0,0,0,0.04)'; this.style.borderColor='#e9ecef'">
//                             ${displayContent}
//                             <button onclick="window.ham_22_20_xoa_file('${idDanhMuc}', '${idMucCon}', '${tp.idThanhPhan}', ${fIdx})" style="position:absolute; top:-8px; right:-8px; background:#dc3545; color:#fff; border:none; border-radius:50%; width:28px; height:28px; display:flex; align-items:center; justify-content:center; font-size:13px; font-weight:bold; cursor:pointer; box-shadow:0 2px 6px rgba(0,0,0,0.3); z-index:2;" title="Xóa tệp này">✖</button>
//                         </div>
//                     `;
//                 });
//                 htmlFiles += `</div>`;
//             }

//             tpUI = `
//                 <div style="margin-top:5px; background:#f8f9fa; padding:15px; border-radius:8px; border:1px dashed #ced4da;">
//                     ${htmlFiles}
//                     <div style="margin-top:20px; border-top:1px dashed #ccc; padding-top:15px;">
//                         <button onclick="this.nextElementSibling.click()" style="padding:8px 16px; background:#007bff; color:#fff; border:none; border-radius:6px; font-size:13px; font-weight:bold; cursor:pointer; box-shadow:0 2px 4px rgba(0,123,255,0.2);">☁️ Tải Tệp Lên</button>
//                         <input type="file" accept="image/*, application/pdf, .doc, .docx, .xls, .xlsx, .rar, .zip" multiple style="display:none;" onchange="window.ham_22_19_upload_file_vao_thanh_phan(this, '${idDanhMuc}', '${idMucCon}', '${tp.idThanhPhan}')">
//                     </div>
//                 </div>
//             `;
//         }
//         else if (tp.kieuThanhPhan === 'WORD') {
//             let noiDung = tp.duLieu.htmlContent || '<i>Bấm vào đây để bắt đầu soạn thảo văn bản...</i>';
//             tpUI = `
//                 <div style="margin-top:5px;">
//                     <div id="word-editor-${tp.idThanhPhan}" contenteditable="true" style="min-height:100px; padding:15px; border:1px solid #ced4da; border-radius:6px; background:#fff; outline:none; font-family:inherit; line-height:1.6;" onfocus="if(this.innerHTML.includes('Bấm vào đây')) this.innerHTML='';">${noiDung}</div>
//                     <div style="margin-top:8px; text-align:right;">
//                         <button onclick="window.ham_22_21_luu_noi_dung_thanh_phan('${idDanhMuc}', '${idMucCon}', '${tp.idThanhPhan}', 'WORD')" style="padding:6px 15px; background:#28a745; color:#fff; border:none; border-radius:4px; font-size:12px; font-weight:bold; cursor:pointer;">💾 Lưu Văn Bản</button>
//                     </div>
//                 </div>
//             `;
//         }
//         else if (tp.kieuThanhPhan === 'EXCEL') {
//             let noiDung = tp.duLieu.htmlTable || `
//                 <table style="width:100%; border-collapse:collapse; min-width:400px;">
//                     <thead><tr style="background:#e9ecef;"><th style="border:1px solid #ccc; padding:8px;">Cột 1</th><th style="border:1px solid #ccc; padding:8px;">Cột 2</th><th style="border:1px solid #ccc; padding:8px;">Cột 3</th></tr></thead>
//                     <tbody><tr><td style="border:1px solid #ccc; padding:8px;">Dữ liệu</td><td style="border:1px solid #ccc; padding:8px;">Dữ liệu</td><td style="border:1px solid #ccc; padding:8px;">Dữ liệu</td></tr></tbody>
//                 </table>`;

//             tpUI = `
//                 <div style="margin-top:5px;">
//                     <div style="font-size:11px; color:#6c757d; margin-bottom:5px; font-style:italic;">*Mẹo: Có thể copy bảng từ Word/Excel và Paste thẳng vào khung này.</div>
//                     <div id="excel-editor-${tp.idThanhPhan}" contenteditable="true" style="width:100%; overflow-x:auto; padding:10px; border:1px solid #28a745; border-radius:6px; background:#fdfdfd; outline:none;">
//                         ${noiDung}
//                     </div>
//                     <div style="margin-top:8px; text-align:right;">
//                         <button onclick="window.ham_22_21_luu_noi_dung_thanh_phan('${idDanhMuc}', '${idMucCon}', '${tp.idThanhPhan}', 'EXCEL')" style="padding:6px 15px; background:#28a745; color:#fff; border:none; border-radius:4px; font-size:12px; font-weight:bold; cursor:pointer;">💾 Lưu Bảng Excel</button>
//                     </div>
//                 </div>
//             `;
//         }

//         // 🌟 NÚT ĐÓNG MỞ BUNG MẶC ĐỊNH
//         tableHtml += `
//             <tr style="border-bottom: 1px solid #e9ecef; transition: 0.2s; cursor: pointer; background: ${rowBg};" 
//                 onmouseover="this.style.background='#f1f8ff'" onmouseout="this.style.background='${rowBg}'" 
//                 onclick="let c = document.getElementById('body-tp-${tp.idThanhPhan}'); let i = document.getElementById('icon-toggle-${tp.idThanhPhan}'); if(c.style.display==='none'){c.style.display='table-row'; i.innerText='🔽';}else{c.style.display='none'; i.innerText='▶️';}">
                
//                 <td style="padding: 12px; text-align: center; font-weight: bold; color: #28a745;">${stt}</td>
                
//                 <td style="padding: 12px;">
//                     <div style="display: flex; align-items: center; gap: 10px;">
//                         <!-- 🌟 MẶC ĐỊNH LÀ MŨI TÊN CHỈ XUỐNG -->
//                         <span id="icon-toggle-${tp.idThanhPhan}" style="font-size: 12px; color: #007bff;">🔽</span>
//                         <span style="font-weight: bold; color: #333; font-size: 15px;">${tp.tenThanhPhan}</span>
//                     </div>
//                 </td>
                
//                 <td style="padding: 12px; font-weight: bold; color: ${mainColor};">${typeLabel}</td>
//                 <td style="padding: 12px; font-size: 12px; color: #6c757d; font-style: italic;">${tgTaoTP}</td>
                
//                 <!-- CHECKBOX HOÀN THÀNH -->
//                 <td style="padding: 12px; text-align: center;" onclick="event.stopPropagation();">
//                     <label style="cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px; padding: 6px; border-radius: 6px; border: 1px solid ${tp.hoanThanh ? '#c3e6cb' : '#f5c6cb'}; background: ${tp.hoanThanh ? '#d4edda' : '#f8d7da'}; transition: 0.2s;">
//                         <input type="checkbox" onchange="window.ham_22_cap_nhat_trang_thai_thanh_phan('${idDanhMuc}', '${idMucCon}', '${tp.idThanhPhan}', this.checked)" ${tp.hoanThanh ? 'checked' : ''} style="width: 15px; height: 15px; cursor: pointer; accent-color: #28a745; margin: 0;">
//                         <span style="font-size: 11px; font-weight: bold; color: ${tp.hoanThanh ? '#155724' : '#721c24'};">${tp.hoanThanh ? 'Hoàn thành' : 'Chưa xong'}</span>
//                     </label>
//                 </td>
                
//                 <td style="padding: 12px; text-align: center;" onclick="event.stopPropagation();">
//                     <button onclick="window.ham_22_27_sua_ten_thanh_phan('${idDanhMuc}', '${idMucCon}', '${tp.idThanhPhan}')" style="background:none; border:none; cursor:pointer; font-size:14px; margin-right: 5px;" title="Sửa tên">✏️</button>
//                     <button onclick="if(confirm('⚠️ Xóa Chuyên mục con này? Toàn bộ file đính kèm trên Google Drive sẽ bị xóa theo!')) window.ham_22_22_xoa_thanh_phan('${idDanhMuc}', '${idMucCon}', '${tp.idThanhPhan}')" style="background:none; border:none; cursor:pointer; font-size:14px; color:#dc3545;" title="Xóa">🗑️</button>
//                 </td>
//             </tr>
            
//             <!-- 🌟 NỘI DUNG HIỂN THỊ MẶC ĐỊNH (display: table-row) -->
//             <tr id="body-tp-${tp.idThanhPhan}" style="display: table-row; background: #fafbfc; border-bottom: 2px solid #28a745;">
//                 <td colspan="6" style="padding: 20px;">
//                     ${tpUI}
//                 </td>
//             </tr>
//         `;
//     });

//     tableHtml += `</tbody></table></div>`;
//     vungChiTiet.innerHTML = tableHtml;
// };


// // =====================================================================
// // HÀM 22.16: CHI TIẾT "CHUYÊN MỤC CON" (Cấp độ 3 - THÊM NÚT ẨN/HIỆN ĐỒNG LOẠT)
// // =====================================================================
// window.ham_22_16_mo_muc_con = function (idDanhMuc, idMucCon, kieuSortTP = 'STATUS_TIME') {
//     window.qlhs_KieuSortTPHienTai = kieuSortTP;

//     const tabData = window.qlhs_DanhSachDanhMuc.find(t => t.id === idDanhMuc);
//     let mangMucCon = typeof tabData.du_lieu_json === 'string' ? JSON.parse(tabData.du_lieu_json || '[]') : tabData.du_lieu_json;
//     const mucCon = mangMucCon.find(m => m.idMucCon === idMucCon);
//     if (!mucCon) return;

//     const vungNoiDung = document.getElementById('qlhs-vung-noi-dung-tab');

//     let htmlHeader = `
//         <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #28a745; padding-bottom:15px; margin-bottom:20px; flex-wrap:wrap; gap:10px;">
//             <div style="display:flex; align-items:center; gap:8px;">
//                 <button onclick="window.ham_22_6_chon_tab('${idDanhMuc}')" style="background:#e9ecef; border:none; border-radius:50%; width:30px; height:30px; cursor:pointer; font-weight:bold; display:flex; align-items:center; justify-content:center;" title="Trở lại">🔙</button>
//                 <h3 style="margin:0; color:#28a745; display:flex; align-items:center; gap:8px;">
//                     <span style="color:#6c757d; font-weight:normal; font-size:18px;">${tabData.ten_danh_muc} /</span> 
//                     ${mucCon.tenMucCon}
//                     <button onclick="window.ham_22_25_sua_ten_muc_con('${idDanhMuc}', '${idMucCon}', true)" style="background:none; border:none; cursor:pointer; font-size:14px; margin-left:5px;" title="Sửa tên chuyên mục">✏️</button>
//                 </h3>
//             </div>
//             <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
//                 <!-- 🌟 NÚT ẨN/HIỆN ĐỒNG LOẠT -->
//                 <button onclick="window.ham_22_toggle_all_muc_con(this)" data-expanded="true" style="padding:8px 15px; background:#ffc107; color:#000; border:none; border-radius:4px; font-size:13px; font-weight:bold; cursor:pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition:0.2s;">
//                     🙈 Thu Gọn Tất Cả
//                 </button>
                
//                 <button onclick="window.ham_22_17_mo_modal_them_thanh_phan('${idDanhMuc}', '${idMucCon}')" style="padding:8px 15px; background:#28a745; color:#fff; border:none; border-radius:4px; font-size:13px; font-weight:bold; cursor:pointer; box-shadow: 0 2px 4px rgba(40,167,69,0.3);">
//                     ➕ Thêm Chuyên Mục Con
//                 </button>
//             </div>
//         </div>
//         <div style="font-size:13px; color:#6c757d; margin-bottom:15px; font-style:italic;">Bấm vào tiêu đề cột để sắp xếp. Bấm vào một dòng bên dưới để Thu gọn/Mở rộng nội dung đính kèm.</div>
//         <div id="qlhs-vung-render-thanh-phan" style="display:flex; flex-direction:column; gap:25px;"></div>
//     `;
//     vungNoiDung.innerHTML = htmlHeader;

//     const vungChiTiet = document.getElementById('qlhs-vung-render-thanh-phan');
//     let mangThanhPhan = mucCon.mangThanhPhan || [];

//     if (mangThanhPhan.length === 0) {
//         vungChiTiet.innerHTML = `
//             <div style="text-align:center; padding:50px;">
//                 <div style="font-size:40px; margin-bottom:15px;">🧩</div>
//                 <div style="font-size:16px; color:#6c757d; font-weight:bold;">Chuyên mục này chưa có Chuyên mục con nào.</div>
//                 <div style="font-size:13px; color:#adb5bd; margin-top:5px;">Bấm "Thêm Chuyên Mục Con" ở góc trên để chèn Ảnh, File, Word hoặc Bảng Excel.</div>
//             </div>`;
//         return;
//     }

//     let sortedThanhPhan = [...mangThanhPhan];
//     sortedThanhPhan.sort((a, b) => {
//         let timeA = a.thoiGianTao ? new Date(a.thoiGianTao).getTime() : 0;
//         let timeB = b.thoiGianTao ? new Date(b.thoiGianTao).getTime() : 0;
//         let nameA = (a.tenThanhPhan || '').toLowerCase();
//         let nameB = (b.tenThanhPhan || '').toLowerCase();
//         let typeA = (a.kieuThanhPhan || '').toLowerCase();
//         let typeB = (b.kieuThanhPhan || '').toLowerCase();
//         let statusA = a.hoanThanh ? 1 : 0;
//         let statusB = b.hoanThanh ? 1 : 0;

//         if (kieuSortTP === 'STATUS_TIME') {
//             if (statusA !== statusB) return statusA - statusB;
//             return timeA - timeB;
//         }
//         if (kieuSortTP === 'STATUS_TIME_REV') {
//             if (statusA !== statusB) return statusB - statusA;
//             return timeA - timeB;
//         }
//         if (kieuSortTP === 'TIME_DESC') return timeB - timeA;
//         if (kieuSortTP === 'TIME_ASC') return timeA - timeB;
//         if (kieuSortTP === 'NAME_ASC') return nameA.localeCompare(nameB, 'vi');
//         if (kieuSortTP === 'NAME_DESC') return nameB.localeCompare(nameA, 'vi');
//         if (kieuSortTP === 'TYPE_ASC') return typeA.localeCompare(typeB, 'vi');
//         if (kieuSortTP === 'TYPE_DESC') return typeB.localeCompare(typeA, 'vi');
//         return 0;
//     });

//     let iconThoiGian = kieuSortTP === 'TIME_DESC' ? '🔽' : (kieuSortTP === 'TIME_ASC' ? '🔼' : '↕️');
//     let iconTen = kieuSortTP === 'NAME_ASC' ? '🔽' : (kieuSortTP === 'NAME_DESC' ? '🔼' : '↕️');
//     let iconType = kieuSortTP === 'TYPE_ASC' ? '🔽' : (kieuSortTP === 'TYPE_DESC' ? '🔼' : '↕️');
//     let iconTrangThai = kieuSortTP === 'STATUS_TIME' ? '🔽' : (kieuSortTP === 'STATUS_TIME_REV' ? '🔼' : '↕️');

//     let tableHtml = `
//         <div style="overflow-x: auto; border-radius: 8px; border: 1px solid #dee2e6; box-shadow: 0 4px 10px rgba(0,0,0,0.03);">
//             <table style="width: 100%; border-collapse: collapse; font-size: 14px; text-align: left; background: #fff;">
//                 <thead>
//                     <tr style="background: #e9f5e9; color: #155724; border-bottom: 2px solid #c3e6cb;">
//                         <th style="padding: 12px; width: 50px; text-align: center;">STT</th>
                        
//                         <th onclick="window.ham_22_16_mo_muc_con('${idDanhMuc}', '${idMucCon}', '${kieuSortTP === 'NAME_ASC' ? 'NAME_DESC' : 'NAME_ASC'}')" 
//                             style="padding: 12px; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#d4edda'" onmouseout="this.style.background='transparent'" title="Bấm để sắp xếp theo tên">
//                             Tên Chuyên Mục Con <span style="font-size:12px;">${iconTen}</span>
//                         </th>
                        
//                         <th onclick="window.ham_22_16_mo_muc_con('${idDanhMuc}', '${idMucCon}', '${kieuSortTP === 'TYPE_ASC' ? 'TYPE_DESC' : 'TYPE_ASC'}')" 
//                             style="padding: 12px; width: 140px; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#d4edda'" onmouseout="this.style.background='transparent'" title="Bấm để sắp xếp theo định dạng">
//                             Định Dạng <span style="font-size:12px;">${iconType}</span>
//                         </th>
                        
//                         <th onclick="window.ham_22_16_mo_muc_con('${idDanhMuc}', '${idMucCon}', '${kieuSortTP === 'TIME_DESC' ? 'TIME_ASC' : 'TIME_DESC'}')" 
//                             style="padding: 12px; width: 140px; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#d4edda'" onmouseout="this.style.background='transparent'">
//                             Thời Gian Tạo <span style="font-size:12px;">${iconThoiGian}</span>
//                         </th>

//                         <th onclick="window.ham_22_16_mo_muc_con('${idDanhMuc}', '${idMucCon}', '${kieuSortTP === 'STATUS_TIME' ? 'STATUS_TIME_REV' : 'STATUS_TIME'}')" 
//                             style="padding: 12px; width: 130px; text-align: center; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#d4edda'" onmouseout="this.style.background='transparent'" title="Sắp xếp trạng thái">
//                             Trạng Thái <span style="font-size:12px;">${iconTrangThai}</span>
//                         </th>
                        
//                         <th style="padding: 12px; width: 100px; text-align: center;">Thao Tác</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//     `;

//     sortedThanhPhan.forEach((tp, idx) => {
//         let stt = idx + 1;
//         let tgTaoTP = tp.thoiGianTao ? new Date(tp.thoiGianTao).toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' }) : '---';
//         let typeLabel = tp.kieuThanhPhan === 'IMAGE' ? '🖼️ Cụm Ảnh' : (tp.kieuThanhPhan === 'FILE' ? '📎 Cụm File' : (tp.kieuThanhPhan === 'WORD' ? '📝 Văn bản' : '📊 Bảng Excel'));
//         let mainColor = tp.kieuThanhPhan === 'EXCEL' ? '#28a745' : '#007bff';
//         let rowBg = tp.hoanThanh ? '#f8fff9' : '#fff';

//         let tpUI = '';
//         if (tp.kieuThanhPhan === 'IMAGE' || tp.kieuThanhPhan === 'FILE') {
//             let dsFile = tp.duLieu.danhSachFile || [];
//             let htmlFiles = '';

//             if (dsFile.length === 0) {
//                 htmlFiles = `<div style="font-style:italic; color:#adb5bd; font-size:13px; padding:10px;">Chưa có tệp nào được tải lên.</div>`;
//             } else {
//                 htmlFiles += `<div style="display:flex; gap:20px; flex-wrap:wrap; align-items:flex-start; width:100%;">`;
//                 dsFile.forEach((f, fIdx) => {
//                     let isImg = f.name.toLowerCase().match(/\.(jpg|jpeg|png|gif|webp)$/i);
//                     let preview = isImg ? f.url : '📄';
//                     if (isImg && f.url.includes('drive.google.com')) {
//                         const mD = f.url.match(/\/d\/([a-zA-Z0-9_-]+)/);
//                         if (mD) preview = `https://drive.google.com/thumbnail?id=${mD[1]}&sz=w2500`;
//                     }
//                     let numSize = parseFloat(f.size);
//                     let fileSizeText = isNaN(numSize) ? 'Chưa rõ dung lượng' : (numSize >= 1024 ? (numSize / 1024).toFixed(1) + ' MB' : numSize + ' KB');
//                     let cardWidth = isImg ? 'width: 100%;' : 'width: auto;';
//                     let displayContent = '';

//                     if (isImg) {
//                         displayContent = `
//                             <div style="display:flex; flex-direction:column; align-items:center; width:100%;">
//                                 <img src="${preview}" onclick="window.ham_22_xem_anh_full_screen('${preview}')" style="width:100%; max-height:85vh; object-fit:contain; border-radius:8px; border:1px solid #dee2e6; background:#181818; display:block; cursor:zoom-in; box-shadow:0 4px 10px rgba(0,0,0,0.1);">
//                                 <div style="margin-top:12px; text-align:center; background:#f1f3f4; padding:8px 20px; border-radius:20px; width:fit-content; max-width:90%;">
//                                     <div style="font-size:14px; font-weight:bold; color:#0056b3; word-break:break-word; line-height:1.4;">${f.name}</div>
//                                     <div style="font-size:12px; color:#6c757d; margin-top:4px;">📏 ${fileSizeText} (Bấm vào ảnh để xem toàn màn hình)</div>
//                                 </div>
//                             </div>`;
//                     } else {
//                         displayContent = `
//                             <a href="${f.url}" target="_blank" style="text-decoration:none; display:flex; flex-direction:column; align-items:center; width: 140px;">
//                                 <div style="width:100%; height:110px; display:flex; align-items:center; justify-content:center; background:#f1f3f4; border-radius:8px; border:1px solid #dee2e6; box-shadow:inset 0 0 10px rgba(0,0,0,0.02);">
//                                     <span style="font-size:50px;">📄</span>
//                                 </div>
//                                 <div style="margin-top:10px; text-align:center; width:100%;">
//                                     <div style="font-size:12px; font-weight:bold; color:#0056b3; word-break:break-word; line-height:1.4; overflow:hidden; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical;" title="${f.name}">${f.name}</div>
//                                     <div style="font-size:11px; color:#6c757d; margin-top:5px;">📏 ${fileSizeText}</div>
//                                 </div>
//                             </a>`;
//                     }

//                     htmlFiles += `
//                         <div style="position:relative; animation:fadeIn 0.3s; ${cardWidth} background:#fff; padding:15px; border-radius:12px; border:1px solid #e9ecef; box-shadow:0 2px 5px rgba(0,0,0,0.04); transition:0.2s;" onmouseover="this.style.boxShadow='0 6px 15px rgba(0,123,255,0.15)'; this.style.borderColor='#b8daff'" onmouseout="this.style.boxShadow='0 2px 5px rgba(0,0,0,0.04)'; this.style.borderColor='#e9ecef'">
//                             ${displayContent}
//                             <button onclick="window.ham_22_20_xoa_file('${idDanhMuc}', '${idMucCon}', '${tp.idThanhPhan}', ${fIdx})" style="position:absolute; top:-8px; right:-8px; background:#dc3545; color:#fff; border:none; border-radius:50%; width:28px; height:28px; display:flex; align-items:center; justify-content:center; font-size:13px; font-weight:bold; cursor:pointer; box-shadow:0 2px 6px rgba(0,0,0,0.3); z-index:2;" title="Xóa tệp này">✖</button>
//                         </div>
//                     `;
//                 });
//                 htmlFiles += `</div>`;
//             }

//             tpUI = `
//                 <div style="margin-top:5px; background:#f8f9fa; padding:15px; border-radius:8px; border:1px dashed #ced4da;">
//                     ${htmlFiles}
//                     <div style="margin-top:20px; border-top:1px dashed #ccc; padding-top:15px;">
//                         <button onclick="this.nextElementSibling.click()" style="padding:8px 16px; background:#007bff; color:#fff; border:none; border-radius:6px; font-size:13px; font-weight:bold; cursor:pointer; box-shadow:0 2px 4px rgba(0,123,255,0.2);">☁️ Tải Tệp Lên</button>
//                         <input type="file" accept="image/*, application/pdf, .doc, .docx, .xls, .xlsx, .rar, .zip" multiple style="display:none;" onchange="window.ham_22_19_upload_file_vao_thanh_phan(this, '${idDanhMuc}', '${idMucCon}', '${tp.idThanhPhan}')">
//                     </div>
//                 </div>
//             `;
//         }
//         else if (tp.kieuThanhPhan === 'WORD') {
//             let noiDung = tp.duLieu.htmlContent || '<i>Bấm vào đây để bắt đầu soạn thảo văn bản...</i>';
//             tpUI = `
//                 <div style="margin-top:5px;">
//                     <div id="word-editor-${tp.idThanhPhan}" contenteditable="true" style="min-height:100px; padding:15px; border:1px solid #ced4da; border-radius:6px; background:#fff; outline:none; font-family:inherit; line-height:1.6;" onfocus="if(this.innerHTML.includes('Bấm vào đây')) this.innerHTML='';">${noiDung}</div>
//                     <div style="margin-top:8px; text-align:right;">
//                         <button onclick="window.ham_22_21_luu_noi_dung_thanh_phan('${idDanhMuc}', '${idMucCon}', '${tp.idThanhPhan}', 'WORD')" style="padding:6px 15px; background:#28a745; color:#fff; border:none; border-radius:4px; font-size:12px; font-weight:bold; cursor:pointer;">💾 Lưu Văn Bản</button>
//                     </div>
//                 </div>
//             `;
//         }
//         else if (tp.kieuThanhPhan === 'EXCEL') {
//             let noiDung = tp.duLieu.htmlTable || `
//                 <table style="width:100%; border-collapse:collapse; min-width:400px;">
//                     <thead><tr style="background:#e9ecef;"><th style="border:1px solid #ccc; padding:8px;">Cột 1</th><th style="border:1px solid #ccc; padding:8px;">Cột 2</th><th style="border:1px solid #ccc; padding:8px;">Cột 3</th></tr></thead>
//                     <tbody><tr><td style="border:1px solid #ccc; padding:8px;">Dữ liệu</td><td style="border:1px solid #ccc; padding:8px;">Dữ liệu</td><td style="border:1px solid #ccc; padding:8px;">Dữ liệu</td></tr></tbody>
//                 </table>`;

//             tpUI = `
//                 <div style="margin-top:5px;">
//                     <div style="font-size:11px; color:#6c757d; margin-bottom:5px; font-style:italic;">*Mẹo: Có thể copy bảng từ Word/Excel và Paste thẳng vào khung này.</div>
//                     <div id="excel-editor-${tp.idThanhPhan}" contenteditable="true" style="width:100%; overflow-x:auto; padding:10px; border:1px solid #28a745; border-radius:6px; background:#fdfdfd; outline:none;">
//                         ${noiDung}
//                     </div>
//                     <div style="margin-top:8px; text-align:right;">
//                         <button onclick="window.ham_22_21_luu_noi_dung_thanh_phan('${idDanhMuc}', '${idMucCon}', '${tp.idThanhPhan}', 'EXCEL')" style="padding:6px 15px; background:#28a745; color:#fff; border:none; border-radius:4px; font-size:12px; font-weight:bold; cursor:pointer;">💾 Lưu Bảng Excel</button>
//                     </div>
//                 </div>
//             `;
//         }

//         tableHtml += `
//             <tr style="border-bottom: 1px solid #e9ecef; transition: 0.2s; cursor: pointer; background: ${rowBg};" 
//                 onmouseover="this.style.background='#f1f8ff'" onmouseout="this.style.background='${rowBg}'" 
//                 onclick="let c = document.getElementById('body-tp-${tp.idThanhPhan}'); let i = document.getElementById('icon-toggle-${tp.idThanhPhan}'); if(c.style.display==='none'){c.style.display='table-row'; i.innerText='🔽';}else{c.style.display='none'; i.innerText='▶️';}">
                
//                 <td style="padding: 12px; text-align: center; font-weight: bold; color: #28a745;">${stt}</td>
                
//                 <td style="padding: 12px;">
//                     <div style="display: flex; align-items: center; gap: 10px;">
//                         <span id="icon-toggle-${tp.idThanhPhan}" style="font-size: 12px; color: #007bff;">🔽</span>
//                         <span style="font-weight: bold; color: #333; font-size: 15px;">${tp.tenThanhPhan}</span>
//                     </div>
//                 </td>
                
//                 <td style="padding: 12px; font-weight: bold; color: ${mainColor};">${typeLabel}</td>
//                 <td style="padding: 12px; font-size: 12px; color: #6c757d; font-style: italic;">${tgTaoTP}</td>
                
//                 <td style="padding: 12px; text-align: center;" onclick="event.stopPropagation();">
//                     <label style="cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px; padding: 6px; border-radius: 6px; border: 1px solid ${tp.hoanThanh ? '#c3e6cb' : '#f5c6cb'}; background: ${tp.hoanThanh ? '#d4edda' : '#f8d7da'}; transition: 0.2s;">
//                         <input type="checkbox" onchange="window.ham_22_cap_nhat_trang_thai_thanh_phan('${idDanhMuc}', '${idMucCon}', '${tp.idThanhPhan}', this.checked)" ${tp.hoanThanh ? 'checked' : ''} style="width: 15px; height: 15px; cursor: pointer; accent-color: #28a745; margin: 0;">
//                         <span style="font-size: 11px; font-weight: bold; color: ${tp.hoanThanh ? '#155724' : '#721c24'};">${tp.hoanThanh ? 'Hoàn thành' : 'Chưa xong'}</span>
//                     </label>
//                 </td>
                
//                 <td style="padding: 12px; text-align: center;" onclick="event.stopPropagation();">
//                     <button onclick="window.ham_22_27_sua_ten_thanh_phan('${idDanhMuc}', '${idMucCon}', '${tp.idThanhPhan}')" style="background:none; border:none; cursor:pointer; font-size:14px; margin-right: 5px;" title="Sửa tên">✏️</button>
//                     <button onclick="if(confirm('⚠️ Xóa Chuyên mục con này? Toàn bộ file đính kèm trên Google Drive sẽ bị xóa theo!')) window.ham_22_22_xoa_thanh_phan('${idDanhMuc}', '${idMucCon}', '${tp.idThanhPhan}')" style="background:none; border:none; cursor:pointer; font-size:14px; color:#dc3545;" title="Xóa">🗑️</button>
//                 </td>
//             </tr>
            
//             <tr id="body-tp-${tp.idThanhPhan}" style="display: table-row; background: #fafbfc; border-bottom: 2px solid #28a745;">
//                 <td colspan="6" style="padding: 20px;">
//                     ${tpUI}
//                 </td>
//             </tr>
//         `;
//     });

//     tableHtml += `</tbody></table></div>`;
//     vungChiTiet.innerHTML = tableHtml;
// };


// // =====================================================================
// // HÀM 22.16: CHI TIẾT "CHUYÊN MỤC CON" (Cấp độ 3 - BỔ SUNG CỘT ƯU TIÊN VÀ SORT)
// // =====================================================================
// window.ham_22_16_mo_muc_con = function (idDanhMuc, idMucCon, kieuSortTP = 'STATUS_TIME') {
//     window.qlhs_KieuSortTPHienTai = kieuSortTP;

//     const tabData = window.qlhs_DanhSachDanhMuc.find(t => t.id === idDanhMuc);
//     let mangMucCon = typeof tabData.du_lieu_json === 'string' ? JSON.parse(tabData.du_lieu_json || '[]') : tabData.du_lieu_json;
//     const mucCon = mangMucCon.find(m => m.idMucCon === idMucCon);
//     if (!mucCon) return;

//     const vungNoiDung = document.getElementById('qlhs-vung-noi-dung-tab');

//     let htmlHeader = `
//         <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #28a745; padding-bottom:15px; margin-bottom:20px; flex-wrap:wrap; gap:10px;">
//             <div style="display:flex; align-items:center; gap:8px;">
//                 <button onclick="window.ham_22_6_chon_tab('${idDanhMuc}')" style="background:#e9ecef; border:none; border-radius:50%; width:30px; height:30px; cursor:pointer; font-weight:bold; display:flex; align-items:center; justify-content:center;" title="Trở lại">🔙</button>
//                 <h3 style="margin:0; color:#28a745; display:flex; align-items:center; gap:8px;">
//                     <span style="color:#6c757d; font-weight:normal; font-size:18px;">${tabData.ten_danh_muc} /</span> 
//                     ${mucCon.tenMucCon}
//                     <button onclick="window.ham_22_25_sua_ten_muc_con('${idDanhMuc}', '${idMucCon}', true)" style="background:none; border:none; cursor:pointer; font-size:14px; margin-left:5px;" title="Sửa tên chuyên mục">✏️</button>
//                 </h3>
//             </div>
//             <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
//                 <button onclick="window.ham_22_toggle_all_muc_con(this)" data-expanded="true" style="padding:8px 15px; background:#ffc107; color:#000; border:none; border-radius:4px; font-size:13px; font-weight:bold; cursor:pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition:0.2s;">
//                     🙈 Thu Gọn Tất Cả
//                 </button>
//                 <button onclick="window.ham_22_17_mo_modal_them_thanh_phan('${idDanhMuc}', '${idMucCon}')" style="padding:8px 15px; background:#28a745; color:#fff; border:none; border-radius:4px; font-size:13px; font-weight:bold; cursor:pointer; box-shadow: 0 2px 4px rgba(40,167,69,0.3);">
//                     ➕ Thêm Chuyên Mục Con
//                 </button>
//             </div>
//         </div>
//         <div style="font-size:13px; color:#6c757d; margin-bottom:15px; font-style:italic;">Bấm vào tiêu đề cột để sắp xếp. Bấm vào một dòng bên dưới để Thu gọn/Mở rộng nội dung đính kèm.</div>
//         <div id="qlhs-vung-render-thanh-phan" style="display:flex; flex-direction:column; gap:25px;"></div>
//     `;
//     vungNoiDung.innerHTML = htmlHeader;

//     const vungChiTiet = document.getElementById('qlhs-vung-render-thanh-phan');
//     let mangThanhPhan = mucCon.mangThanhPhan || [];

//     if (mangThanhPhan.length === 0) {
//         vungChiTiet.innerHTML = `
//             <div style="text-align:center; padding:50px;">
//                 <div style="font-size:40px; margin-bottom:15px;">🧩</div>
//                 <div style="font-size:16px; color:#6c757d; font-weight:bold;">Chuyên mục này chưa có Chuyên mục con nào.</div>
//                 <div style="font-size:13px; color:#adb5bd; margin-top:5px;">Bấm "Thêm Chuyên Mục Con" ở góc trên để chèn Ảnh, File, Word hoặc Bảng Excel.</div>
//             </div>`;
//         return;
//     }

//     // 🌟 SẮP XẾP CHUYÊN MỤC CON KẾT HỢP ƯU TIÊN
//     let sortedThanhPhan = [...mangThanhPhan];
//     sortedThanhPhan.sort((a, b) => {
//         let timeA = a.thoiGianTao ? new Date(a.thoiGianTao).getTime() : 0;
//         let timeB = b.thoiGianTao ? new Date(b.thoiGianTao).getTime() : 0;
//         let nameA = (a.tenThanhPhan || '').toLowerCase();
//         let nameB = (b.tenThanhPhan || '').toLowerCase();
//         let typeA = (a.kieuThanhPhan || '').toLowerCase();
//         let typeB = (b.kieuThanhPhan || '').toLowerCase();
//         let statusA = a.hoanThanh ? 1 : 0;
//         let statusB = b.hoanThanh ? 1 : 0;
//         let uuTienA = a.uuTien ? parseInt(a.uuTien) : 2; // 1: Cao, 2: Vừa, 3: Thấp
//         let uuTienB = b.uuTien ? parseInt(b.uuTien) : 2;

//         if (kieuSortTP === 'STATUS_TIME') {
//             if (statusA !== statusB) return statusA - statusB; // Chưa HT lên trước
//             if (uuTienA !== uuTienB) return uuTienA - uuTienB; // Ưu tiên Cao (1) lên trước
//             return timeA - timeB; // Cũ nhất lên trước
//         }
//         if (kieuSortTP === 'STATUS_TIME_REV') {
//             if (statusA !== statusB) return statusB - statusA;
//             if (uuTienA !== uuTienB) return uuTienA - uuTienB;
//             return timeA - timeB;
//         }
//         if (kieuSortTP === 'PRIORITY_ASC') return uuTienA - uuTienB;
//         if (kieuSortTP === 'PRIORITY_DESC') return uuTienB - uuTienA;
//         if (kieuSortTP === 'TIME_DESC') return timeB - timeA;
//         if (kieuSortTP === 'TIME_ASC') return timeA - timeB;
//         if (kieuSortTP === 'NAME_ASC') return nameA.localeCompare(nameB, 'vi');
//         if (kieuSortTP === 'NAME_DESC') return nameB.localeCompare(nameA, 'vi');
//         if (kieuSortTP === 'TYPE_ASC') return typeA.localeCompare(typeB, 'vi');
//         if (kieuSortTP === 'TYPE_DESC') return typeB.localeCompare(typeA, 'vi');
//         return 0;
//     });

//     let iconThoiGian = kieuSortTP === 'TIME_DESC' ? '🔽' : (kieuSortTP === 'TIME_ASC' ? '🔼' : '↕️');
//     let iconTen = kieuSortTP === 'NAME_ASC' ? '🔽' : (kieuSortTP === 'NAME_DESC' ? '🔼' : '↕️');
//     let iconType = kieuSortTP === 'TYPE_ASC' ? '🔽' : (kieuSortTP === 'TYPE_DESC' ? '🔼' : '↕️');
//     let iconTrangThai = kieuSortTP === 'STATUS_TIME' ? '🔽' : (kieuSortTP === 'STATUS_TIME_REV' ? '🔼' : '↕️');
//     let iconUuTien = kieuSortTP === 'PRIORITY_ASC' ? '🔽' : (kieuSortTP === 'PRIORITY_DESC' ? '🔼' : '↕️');

//     let tableHtml = `
//         <div style="overflow-x: auto; border-radius: 8px; border: 1px solid #dee2e6; box-shadow: 0 4px 10px rgba(0,0,0,0.03);">
//             <table style="width: 100%; border-collapse: collapse; font-size: 14px; text-align: left; background: #fff;">
//                 <thead>
//                     <tr style="background: #e9f5e9; color: #155724; border-bottom: 2px solid #c3e6cb;">
//                         <th style="padding: 12px; width: 50px; text-align: center;">STT</th>
                        
//                         <th onclick="window.ham_22_16_mo_muc_con('${idDanhMuc}', '${idMucCon}', '${kieuSortTP === 'NAME_ASC' ? 'NAME_DESC' : 'NAME_ASC'}')" 
//                             style="padding: 12px; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#d4edda'" onmouseout="this.style.background='transparent'" title="Bấm để sắp xếp theo tên">
//                             Tên Chuyên Mục Con <span style="font-size:12px;">${iconTen}</span>
//                         </th>
                        
//                         <th onclick="window.ham_22_16_mo_muc_con('${idDanhMuc}', '${idMucCon}', '${kieuSortTP === 'TYPE_ASC' ? 'TYPE_DESC' : 'TYPE_ASC'}')" 
//                             style="padding: 12px; width: 140px; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#d4edda'" onmouseout="this.style.background='transparent'" title="Bấm để sắp xếp theo định dạng">
//                             Định Dạng <span style="font-size:12px;">${iconType}</span>
//                         </th>
                        
//                         <!-- 🌟 CỘT ƯU TIÊN -->
//                         <th onclick="window.ham_22_16_mo_muc_con('${idDanhMuc}', '${idMucCon}', '${kieuSortTP === 'PRIORITY_ASC' ? 'PRIORITY_DESC' : 'PRIORITY_ASC'}')" 
//                             style="padding: 12px; width: 110px; text-align: center; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#d4edda'" onmouseout="this.style.background='transparent'" title="Sắp xếp theo mức độ ưu tiên">
//                             Ưu Tiên <span style="font-size:12px;">${iconUuTien}</span>
//                         </th>
                        
//                         <th onclick="window.ham_22_16_mo_muc_con('${idDanhMuc}', '${idMucCon}', '${kieuSortTP === 'TIME_DESC' ? 'TIME_ASC' : 'TIME_DESC'}')" 
//                             style="padding: 12px; width: 140px; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#d4edda'" onmouseout="this.style.background='transparent'">
//                             Thời Gian Tạo <span style="font-size:12px;">${iconThoiGian}</span>
//                         </th>

//                         <th onclick="window.ham_22_16_mo_muc_con('${idDanhMuc}', '${idMucCon}', '${kieuSortTP === 'STATUS_TIME' ? 'STATUS_TIME_REV' : 'STATUS_TIME'}')" 
//                             style="padding: 12px; width: 120px; text-align: center; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#d4edda'" onmouseout="this.style.background='transparent'" title="Sắp xếp trạng thái">
//                             Trạng Thái <span style="font-size:12px;">${iconTrangThai}</span>
//                         </th>
                        
//                         <th style="padding: 12px; width: 90px; text-align: center;">Thao Tác</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//     `;

//     sortedThanhPhan.forEach((tp, idx) => {
//         let stt = idx + 1;
//         let tgTaoTP = tp.thoiGianTao ? new Date(tp.thoiGianTao).toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' }) : '---';
//         let typeLabel = tp.kieuThanhPhan === 'IMAGE' ? '🖼️ Cụm Ảnh' : (tp.kieuThanhPhan === 'FILE' ? '📎 Cụm File' : (tp.kieuThanhPhan === 'WORD' ? '📝 Văn bản' : '📊 Bảng Excel'));
//         let mainColor = tp.kieuThanhPhan === 'EXCEL' ? '#28a745' : '#007bff';
//         let rowBg = tp.hoanThanh ? '#f8fff9' : '#fff';

//         // Cấu hình hiển thị màu sắc ưu tiên
//         let uuTien = tp.uuTien ? parseInt(tp.uuTien) : 2;
//         let cTextColor = uuTien === 1 ? '#dc3545' : (uuTien === 3 ? '#28a745' : '#fd7e14');
//         let cBgColor = uuTien === 1 ? '#f8d7da' : (uuTien === 3 ? '#d4edda' : '#fff3cd');

//         let tpUI = '';
//         if (tp.kieuThanhPhan === 'IMAGE' || tp.kieuThanhPhan === 'FILE') {
//             let dsFile = tp.duLieu.danhSachFile || [];
//             let htmlFiles = '';

//             if (dsFile.length === 0) {
//                 htmlFiles = `<div style="font-style:italic; color:#adb5bd; font-size:13px; padding:10px;">Chưa có tệp nào được tải lên.</div>`;
//             } else {
//                 htmlFiles += `<div style="display:flex; gap:20px; flex-wrap:wrap; align-items:flex-start; width:100%;">`;
//                 dsFile.forEach((f, fIdx) => {
//                     let isImg = f.name.toLowerCase().match(/\.(jpg|jpeg|png|gif|webp)$/i);
//                     let preview = isImg ? f.url : '📄';
//                     if (isImg && f.url.includes('drive.google.com')) {
//                         const mD = f.url.match(/\/d\/([a-zA-Z0-9_-]+)/);
//                         if (mD) preview = `https://drive.google.com/thumbnail?id=${mD[1]}&sz=w2500`;
//                     }
//                     let numSize = parseFloat(f.size);
//                     let fileSizeText = isNaN(numSize) ? 'Chưa rõ dung lượng' : (numSize >= 1024 ? (numSize / 1024).toFixed(1) + ' MB' : numSize + ' KB');
//                     let cardWidth = isImg ? 'width: 100%;' : 'width: auto;';
//                     let displayContent = '';

//                     if (isImg) {
//                         displayContent = `
//                             <div style="display:flex; flex-direction:column; align-items:center; width:100%;">
//                                 <img src="${preview}" onclick="window.ham_22_xem_anh_full_screen('${preview}')" style="width:100%; max-height:85vh; object-fit:contain; border-radius:8px; border:1px solid #dee2e6; background:#181818; display:block; cursor:zoom-in; box-shadow:0 4px 10px rgba(0,0,0,0.1);">
//                                 <div style="margin-top:12px; text-align:center; background:#f1f3f4; padding:8px 20px; border-radius:20px; width:fit-content; max-width:90%;">
//                                     <div style="font-size:14px; font-weight:bold; color:#0056b3; word-break:break-word; line-height:1.4;">${f.name}</div>
//                                     <div style="font-size:12px; color:#6c757d; margin-top:4px;">📏 ${fileSizeText} (Bấm vào ảnh để xem toàn màn hình)</div>
//                                 </div>
//                             </div>`;
//                     } else {
//                         displayContent = `
//                             <a href="${f.url}" target="_blank" style="text-decoration:none; display:flex; flex-direction:column; align-items:center; width: 140px;">
//                                 <div style="width:100%; height:110px; display:flex; align-items:center; justify-content:center; background:#f1f3f4; border-radius:8px; border:1px solid #dee2e6; box-shadow:inset 0 0 10px rgba(0,0,0,0.02);">
//                                     <span style="font-size:50px;">📄</span>
//                                 </div>
//                                 <div style="margin-top:10px; text-align:center; width:100%;">
//                                     <div style="font-size:12px; font-weight:bold; color:#0056b3; word-break:break-word; line-height:1.4; overflow:hidden; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical;" title="${f.name}">${f.name}</div>
//                                     <div style="font-size:11px; color:#6c757d; margin-top:5px;">📏 ${fileSizeText}</div>
//                                 </div>
//                             </a>`;
//                     }

//                     htmlFiles += `
//                         <div style="position:relative; animation:fadeIn 0.3s; ${cardWidth} background:#fff; padding:15px; border-radius:12px; border:1px solid #e9ecef; box-shadow:0 2px 5px rgba(0,0,0,0.04); transition:0.2s;" onmouseover="this.style.boxShadow='0 6px 15px rgba(0,123,255,0.15)'; this.style.borderColor='#b8daff'" onmouseout="this.style.boxShadow='0 2px 5px rgba(0,0,0,0.04)'; this.style.borderColor='#e9ecef'">
//                             ${displayContent}
//                             <button onclick="window.ham_22_20_xoa_file('${idDanhMuc}', '${idMucCon}', '${tp.idThanhPhan}', ${fIdx})" style="position:absolute; top:-8px; right:-8px; background:#dc3545; color:#fff; border:none; border-radius:50%; width:28px; height:28px; display:flex; align-items:center; justify-content:center; font-size:13px; font-weight:bold; cursor:pointer; box-shadow:0 2px 6px rgba(0,0,0,0.3); z-index:2;" title="Xóa tệp này">✖</button>
//                         </div>
//                     `;
//                 });
//                 htmlFiles += `</div>`;
//             }

//             tpUI = `
//                 <div style="margin-top:5px; background:#f8f9fa; padding:15px; border-radius:8px; border:1px dashed #ced4da;">
//                     ${htmlFiles}
//                     <div style="margin-top:20px; border-top:1px dashed #ccc; padding-top:15px;">
//                         <button onclick="this.nextElementSibling.click()" style="padding:8px 16px; background:#007bff; color:#fff; border:none; border-radius:6px; font-size:13px; font-weight:bold; cursor:pointer; box-shadow:0 2px 4px rgba(0,123,255,0.2);">☁️ Tải Tệp Lên</button>
//                         <input type="file" accept="image/*, application/pdf, .doc, .docx, .xls, .xlsx, .rar, .zip" multiple style="display:none;" onchange="window.ham_22_19_upload_file_vao_thanh_phan(this, '${idDanhMuc}', '${idMucCon}', '${tp.idThanhPhan}')">
//                     </div>
//                 </div>
//             `;
//         }
//         else if (tp.kieuThanhPhan === 'WORD') {
//             let noiDung = tp.duLieu.htmlContent || '<i>Bấm vào đây để bắt đầu soạn thảo văn bản...</i>';
//             tpUI = `
//                 <div style="margin-top:5px;">
//                     <div id="word-editor-${tp.idThanhPhan}" contenteditable="true" style="min-height:100px; padding:15px; border:1px solid #ced4da; border-radius:6px; background:#fff; outline:none; font-family:inherit; line-height:1.6;" onfocus="if(this.innerHTML.includes('Bấm vào đây')) this.innerHTML='';">${noiDung}</div>
//                     <div style="margin-top:8px; text-align:right;">
//                         <button onclick="window.ham_22_21_luu_noi_dung_thanh_phan('${idDanhMuc}', '${idMucCon}', '${tp.idThanhPhan}', 'WORD')" style="padding:6px 15px; background:#28a745; color:#fff; border:none; border-radius:4px; font-size:12px; font-weight:bold; cursor:pointer;">💾 Lưu Văn Bản</button>
//                     </div>
//                 </div>
//             `;
//         }
//         else if (tp.kieuThanhPhan === 'EXCEL') {
//             let noiDung = tp.duLieu.htmlTable || `
//                 <table style="width:100%; border-collapse:collapse; min-width:400px;">
//                     <thead><tr style="background:#e9ecef;"><th style="border:1px solid #ccc; padding:8px;">Cột 1</th><th style="border:1px solid #ccc; padding:8px;">Cột 2</th><th style="border:1px solid #ccc; padding:8px;">Cột 3</th></tr></thead>
//                     <tbody><tr><td style="border:1px solid #ccc; padding:8px;">Dữ liệu</td><td style="border:1px solid #ccc; padding:8px;">Dữ liệu</td><td style="border:1px solid #ccc; padding:8px;">Dữ liệu</td></tr></tbody>
//                 </table>`;

//             tpUI = `
//                 <div style="margin-top:5px;">
//                     <div style="font-size:11px; color:#6c757d; margin-bottom:5px; font-style:italic;">*Mẹo: Có thể copy bảng từ Word/Excel và Paste thẳng vào khung này.</div>
//                     <div id="excel-editor-${tp.idThanhPhan}" contenteditable="true" style="width:100%; overflow-x:auto; padding:10px; border:1px solid #28a745; border-radius:6px; background:#fdfdfd; outline:none;">
//                         ${noiDung}
//                     </div>
//                     <div style="margin-top:8px; text-align:right;">
//                         <button onclick="window.ham_22_21_luu_noi_dung_thanh_phan('${idDanhMuc}', '${idMucCon}', '${tp.idThanhPhan}', 'EXCEL')" style="padding:6px 15px; background:#28a745; color:#fff; border:none; border-radius:4px; font-size:12px; font-weight:bold; cursor:pointer;">💾 Lưu Bảng Excel</button>
//                     </div>
//                 </div>
//             `;
//         }

//         tableHtml += `
//             <tr style="border-bottom: 1px solid #e9ecef; transition: 0.2s; cursor: pointer; background: ${rowBg};" 
//                 onmouseover="this.style.background='#f1f8ff'" onmouseout="this.style.background='${rowBg}'" 
//                 onclick="let c = document.getElementById('body-tp-${tp.idThanhPhan}'); let i = document.getElementById('icon-toggle-${tp.idThanhPhan}'); if(c.style.display==='none'){c.style.display='table-row'; i.innerText='🔽';}else{c.style.display='none'; i.innerText='▶️';}">
                
//                 <td style="padding: 12px; text-align: center; font-weight: bold; color: #28a745;">${stt}</td>
                
//                 <td style="padding: 12px;">
//                     <div style="display: flex; align-items: center; gap: 10px;">
//                         <span id="icon-toggle-${tp.idThanhPhan}" style="font-size: 12px; color: #007bff;">🔽</span>
//                         <span style="font-weight: bold; color: #333; font-size: 15px;">${tp.tenThanhPhan}</span>
//                     </div>
//                 </td>
                
//                 <td style="padding: 12px; font-weight: bold; color: ${mainColor};">${typeLabel}</td>
                
//                 <!-- 🌟 SELECT CHỌN MỨC ĐỘ ƯU TIÊN -->
//                 <td style="padding: 12px; text-align: center;" onclick="event.stopPropagation();">
//                     <select onchange="window.ham_22_cap_nhat_uu_tien_thanh_phan('${idDanhMuc}', '${idMucCon}', '${tp.idThanhPhan}', this.value)" 
//                         style="padding: 4px; border-radius: 4px; border: 1px solid ${cTextColor}; background: ${cBgColor}; color: ${cTextColor}; font-size: 12px; font-weight: bold; outline: none; cursor: pointer;">
//                         <option value="1" ${uuTien === 1 ? 'selected' : ''}>🔴 Cao</option>
//                         <option value="2" ${uuTien === 2 ? 'selected' : ''}>🟡 Vừa</option>
//                         <option value="3" ${uuTien === 3 ? 'selected' : ''}>🟢 Thấp</option>
//                     </select>
//                 </td>
                
//                 <td style="padding: 12px; font-size: 12px; color: #6c757d; font-style: italic;">${tgTaoTP}</td>
                
//                 <td style="padding: 12px; text-align: center;" onclick="event.stopPropagation();">
//                     <label style="cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px; padding: 6px; border-radius: 6px; border: 1px solid ${tp.hoanThanh ? '#c3e6cb' : '#f5c6cb'}; background: ${tp.hoanThanh ? '#d4edda' : '#f8d7da'}; transition: 0.2s;">
//                         <input type="checkbox" onchange="window.ham_22_cap_nhat_trang_thai_thanh_phan('${idDanhMuc}', '${idMucCon}', '${tp.idThanhPhan}', this.checked)" ${tp.hoanThanh ? 'checked' : ''} style="width: 15px; height: 15px; cursor: pointer; accent-color: #28a745; margin: 0;">
//                         <span style="font-size: 11px; font-weight: bold; color: ${tp.hoanThanh ? '#155724' : '#721c24'};">${tp.hoanThanh ? 'Hoàn thành' : 'Chưa xong'}</span>
//                     </label>
//                 </td>
                
//                 <td style="padding: 12px; text-align: center;" onclick="event.stopPropagation();">
//                     <button onclick="window.ham_22_27_sua_ten_thanh_phan('${idDanhMuc}', '${idMucCon}', '${tp.idThanhPhan}')" style="background:none; border:none; cursor:pointer; font-size:14px; margin-right: 5px;" title="Sửa tên">✏️</button>
//                     <button onclick="if(confirm('⚠️ Xóa Chuyên mục con này? Toàn bộ file đính kèm trên Google Drive sẽ bị xóa theo!')) window.ham_22_22_xoa_thanh_phan('${idDanhMuc}', '${idMucCon}', '${tp.idThanhPhan}')" style="background:none; border:none; cursor:pointer; font-size:14px; color:#dc3545;" title="Xóa">🗑️</button>
//                 </td>
//             </tr>
            
//             <tr id="body-tp-${tp.idThanhPhan}" style="display: table-row; background: #fafbfc; border-bottom: 2px solid #28a745;">
//                 <td colspan="7" style="padding: 20px;">
//                     ${tpUI}
//                 </td>
//             </tr>
//         `;
//     });

//     tableHtml += `</tbody></table></div>`;
//     vungChiTiet.innerHTML = tableHtml;
// };


// =====================================================================
// HÀM 22.16: CHI TIẾT "CHUYÊN MỤC CON" (Cấp độ 3 - MỞ RỘNG 5 MỨC ĐỘ ƯU TIÊN)
// =====================================================================
window.ham_22_16_mo_muc_con = function (idDanhMuc, idMucCon, kieuSortTP = 'STATUS_TIME') {
    window.qlhs_KieuSortTPHienTai = kieuSortTP;

    const tabData = window.qlhs_DanhSachDanhMuc.find(t => t.id === idDanhMuc);
    let mangMucCon = typeof tabData.du_lieu_json === 'string' ? JSON.parse(tabData.du_lieu_json || '[]') : tabData.du_lieu_json;
    const mucCon = mangMucCon.find(m => m.idMucCon === idMucCon);
    if (!mucCon) return;

    const vungNoiDung = document.getElementById('qlhs-vung-noi-dung-tab');

    let htmlHeader = `
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #28a745; padding-bottom:15px; margin-bottom:20px; flex-wrap:wrap; gap:10px;">
            <div style="display:flex; align-items:center; gap:8px;">
                <button onclick="window.ham_22_6_chon_tab('${idDanhMuc}')" style="background:#e9ecef; border:none; border-radius:50%; width:30px; height:30px; cursor:pointer; font-weight:bold; display:flex; align-items:center; justify-content:center;" title="Trở lại">🔙</button>
                <h3 style="margin:0; color:#28a745; display:flex; align-items:center; gap:8px;">
                    <span style="color:#6c757d; font-weight:normal; font-size:18px;">${tabData.ten_danh_muc} /</span> 
                    ${mucCon.tenMucCon}
                    <button onclick="window.ham_22_25_sua_ten_muc_con('${idDanhMuc}', '${idMucCon}', true)" style="background:none; border:none; cursor:pointer; font-size:14px; margin-left:5px;" title="Sửa tên chuyên mục">✏️</button>
                </h3>
            </div>
            <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
                <button onclick="window.ham_22_toggle_all_muc_con(this)" data-expanded="true" style="padding:8px 15px; background:#ffc107; color:#000; border:none; border-radius:4px; font-size:13px; font-weight:bold; cursor:pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition:0.2s;">
                    🙈 Thu Gọn Tất Cả
                </button>
                <button onclick="window.ham_22_17_mo_modal_them_thanh_phan('${idDanhMuc}', '${idMucCon}')" style="padding:8px 15px; background:#28a745; color:#fff; border:none; border-radius:4px; font-size:13px; font-weight:bold; cursor:pointer; box-shadow: 0 2px 4px rgba(40,167,69,0.3);">
                    ➕ Thêm Chuyên Mục Con
                </button>
            </div>
        </div>
        <div style="font-size:13px; color:#6c757d; margin-bottom:15px; font-style:italic;">Bấm vào tiêu đề cột để sắp xếp. Bấm vào một dòng bên dưới để Thu gọn/Mở rộng nội dung đính kèm.</div>
        <div id="qlhs-vung-render-thanh-phan" style="display:flex; flex-direction:column; gap:25px;"></div>
    `;
    vungNoiDung.innerHTML = htmlHeader;

    const vungChiTiet = document.getElementById('qlhs-vung-render-thanh-phan');
    let mangThanhPhan = mucCon.mangThanhPhan || [];

    if (mangThanhPhan.length === 0) {
        vungChiTiet.innerHTML = `
            <div style="text-align:center; padding:50px;">
                <div style="font-size:40px; margin-bottom:15px;">🧩</div>
                <div style="font-size:16px; color:#6c757d; font-weight:bold;">Chuyên mục này chưa có Chuyên mục con nào.</div>
                <div style="font-size:13px; color:#adb5bd; margin-top:5px;">Bấm "Thêm Chuyên Mục Con" ở góc trên để chèn Ảnh, File, Word hoặc Bảng Excel.</div>
            </div>`;
        return;
    }

    // 🌟 SẮP XẾP KẾT HỢP 5 MỨC ĐỘ ƯU TIÊN
    let sortedThanhPhan = [...mangThanhPhan];
    sortedThanhPhan.sort((a, b) => {
        let timeA = a.thoiGianTao ? new Date(a.thoiGianTao).getTime() : 0;
        let timeB = b.thoiGianTao ? new Date(b.thoiGianTao).getTime() : 0;
        let nameA = (a.tenThanhPhan || '').toLowerCase();
        let nameB = (b.tenThanhPhan || '').toLowerCase();
        let typeA = (a.kieuThanhPhan || '').toLowerCase();
        let typeB = (b.kieuThanhPhan || '').toLowerCase();
        let statusA = a.hoanThanh ? 1 : 0;
        let statusB = b.hoanThanh ? 1 : 0;
        let uuTienA = a.uuTien ? parseInt(a.uuTien) : 3; // 1: Rất Cao -> 5: Rất Thấp (Mặc định 3: Vừa)
        let uuTienB = b.uuTien ? parseInt(b.uuTien) : 3;

        if (kieuSortTP === 'STATUS_TIME') {
            if (statusA !== statusB) return statusA - statusB;
            if (uuTienA !== uuTienB) return uuTienA - uuTienB;
            return timeA - timeB;
        }
        if (kieuSortTP === 'STATUS_TIME_REV') {
            if (statusA !== statusB) return statusB - statusA;
            if (uuTienA !== uuTienB) return uuTienA - uuTienB;
            return timeA - timeB;
        }
        if (kieuSortTP === 'PRIORITY_ASC') return uuTienA - uuTienB;
        if (kieuSortTP === 'PRIORITY_DESC') return uuTienB - uuTienA;
        if (kieuSortTP === 'TIME_DESC') return timeB - timeA;
        if (kieuSortTP === 'TIME_ASC') return timeA - timeB;
        if (kieuSortTP === 'NAME_ASC') return nameA.localeCompare(nameB, 'vi');
        if (kieuSortTP === 'NAME_DESC') return nameB.localeCompare(nameA, 'vi');
        if (kieuSortTP === 'TYPE_ASC') return typeA.localeCompare(typeB, 'vi');
        if (kieuSortTP === 'TYPE_DESC') return typeB.localeCompare(typeA, 'vi');
        return 0;
    });

    let iconThoiGian = kieuSortTP === 'TIME_DESC' ? '🔽' : (kieuSortTP === 'TIME_ASC' ? '🔼' : '↕️');
    let iconTen = kieuSortTP === 'NAME_ASC' ? '🔽' : (kieuSortTP === 'NAME_DESC' ? '🔼' : '↕️');
    let iconType = kieuSortTP === 'TYPE_ASC' ? '🔽' : (kieuSortTP === 'TYPE_DESC' ? '🔼' : '↕️');
    let iconTrangThai = kieuSortTP === 'STATUS_TIME' ? '🔽' : (kieuSortTP === 'STATUS_TIME_REV' ? '🔼' : '↕️');
    let iconUuTien = kieuSortTP === 'PRIORITY_ASC' ? '🔽' : (kieuSortTP === 'PRIORITY_DESC' ? '🔼' : '↕️');

    let tableHtml = `
        <div style="overflow-x: auto; border-radius: 8px; border: 1px solid #dee2e6; box-shadow: 0 4px 10px rgba(0,0,0,0.03);">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; text-align: left; background: #fff;">
                <thead>
                    <tr style="background: #e9f5e9; color: #155724; border-bottom: 2px solid #c3e6cb;">
                        <th style="padding: 12px; width: 50px; text-align: center;">STT</th>
                        
                        <th onclick="window.ham_22_16_mo_muc_con('${idDanhMuc}', '${idMucCon}', '${kieuSortTP === 'NAME_ASC' ? 'NAME_DESC' : 'NAME_ASC'}')" 
                            style="padding: 12px; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#d4edda'" onmouseout="this.style.background='transparent'" title="Bấm để sắp xếp theo tên">
                            Tên Chuyên Mục Con <span style="font-size:12px;">${iconTen}</span>
                        </th>
                        
                        <th onclick="window.ham_22_16_mo_muc_con('${idDanhMuc}', '${idMucCon}', '${kieuSortTP === 'TYPE_ASC' ? 'TYPE_DESC' : 'TYPE_ASC'}')" 
                            style="padding: 12px; width: 140px; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#d4edda'" onmouseout="this.style.background='transparent'" title="Bấm để sắp xếp theo định dạng">
                            Định Dạng <span style="font-size:12px;">${iconType}</span>
                        </th>
                        
                        <th onclick="window.ham_22_16_mo_muc_con('${idDanhMuc}', '${idMucCon}', '${kieuSortTP === 'PRIORITY_ASC' ? 'PRIORITY_DESC' : 'PRIORITY_ASC'}')" 
                            style="padding: 12px; width: 130px; text-align: center; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#d4edda'" onmouseout="this.style.background='transparent'" title="Sắp xếp theo mức độ ưu tiên">
                            Ưu Tiên <span style="font-size:12px;">${iconUuTien}</span>
                        </th>
                        
                        <th onclick="window.ham_22_16_mo_muc_con('${idDanhMuc}', '${idMucCon}', '${kieuSortTP === 'TIME_DESC' ? 'TIME_ASC' : 'TIME_DESC'}')" 
                            style="padding: 12px; width: 140px; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#d4edda'" onmouseout="this.style.background='transparent'">
                            Thời Gian Tạo <span style="font-size:12px;">${iconThoiGian}</span>
                        </th>

                        <th onclick="window.ham_22_16_mo_muc_con('${idDanhMuc}', '${idMucCon}', '${kieuSortTP === 'STATUS_TIME' ? 'STATUS_TIME_REV' : 'STATUS_TIME'}')" 
                            style="padding: 12px; width: 120px; text-align: center; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#d4edda'" onmouseout="this.style.background='transparent'" title="Sắp xếp trạng thái">
                            Trạng Thái <span style="font-size:12px;">${iconTrangThai}</span>
                        </th>
                        
                        <th style="padding: 12px; width: 90px; text-align: center;">Thao Tác</th>
                    </tr>
                </thead>
                <tbody>
    `;

    sortedThanhPhan.forEach((tp, idx) => {
        let stt = idx + 1;
        let tgTaoTP = tp.thoiGianTao ? new Date(tp.thoiGianTao).toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' }) : '---';
        let typeLabel = tp.kieuThanhPhan === 'IMAGE' ? '🖼️ Cụm Ảnh' : (tp.kieuThanhPhan === 'FILE' ? '📎 Cụm File' : (tp.kieuThanhPhan === 'WORD' ? '📝 Văn bản' : '📊 Bảng Excel'));
        let mainColor = tp.kieuThanhPhan === 'EXCEL' ? '#28a745' : '#007bff';
        let rowBg = tp.hoanThanh ? '#f8fff9' : '#fff';

        // 🌟 CẤU HÌNH MÀU SẮC CHO 5 MỨC ƯU TIÊN
        let uuTien = tp.uuTien ? parseInt(tp.uuTien) : 3;
        let cTextColor, cBgColor;
        switch (uuTien) {
            case 1: cTextColor = '#dc3545'; cBgColor = '#f8d7da'; break; // Rất Cao (Đỏ)
            case 2: cTextColor = '#d35400'; cBgColor = '#ffe8d6'; break; // Cao (Cam)
            case 3: cTextColor = '#856404'; cBgColor = '#fff3cd'; break; // Vừa (Vàng)
            case 4: cTextColor = '#0056b3'; cBgColor = '#cce5ff'; break; // Thấp (Xanh dương)
            case 5: cTextColor = '#155724'; cBgColor = '#d4edda'; break; // Rất Thấp (Xanh lá)
            default: cTextColor = '#856404'; cBgColor = '#fff3cd';
        }

        let tpUI = '';
        if (tp.kieuThanhPhan === 'IMAGE' || tp.kieuThanhPhan === 'FILE') {
            let dsFile = tp.duLieu.danhSachFile || [];
            let htmlFiles = '';

            if (dsFile.length === 0) {
                htmlFiles = `<div style="font-style:italic; color:#adb5bd; font-size:13px; padding:10px;">Chưa có tệp nào được tải lên.</div>`;
            } else {
                htmlFiles += `<div style="display:flex; gap:20px; flex-wrap:wrap; align-items:flex-start; width:100%;">`;
                dsFile.forEach((f, fIdx) => {
                    let isImg = f.name.toLowerCase().match(/\.(jpg|jpeg|png|gif|webp)$/i);
                    let preview = isImg ? f.url : '📄';
                    if (isImg && f.url.includes('drive.google.com')) {
                        const mD = f.url.match(/\/d\/([a-zA-Z0-9_-]+)/);
                        if (mD) preview = `https://drive.google.com/thumbnail?id=${mD[1]}&sz=w2500`;
                    }
                    let numSize = parseFloat(f.size);
                    let fileSizeText = isNaN(numSize) ? 'Chưa rõ dung lượng' : (numSize >= 1024 ? (numSize / 1024).toFixed(1) + ' MB' : numSize + ' KB');
                    let cardWidth = isImg ? 'width: 100%;' : 'width: auto;';
                    let displayContent = '';

                    if (isImg) {
                        displayContent = `
                            <div style="display:flex; flex-direction:column; align-items:center; width:100%;">
                                <img src="${preview}" onclick="window.ham_22_xem_anh_full_screen('${preview}')" style="width:100%; max-height:85vh; object-fit:contain; border-radius:8px; border:1px solid #dee2e6; background:#181818; display:block; cursor:zoom-in; box-shadow:0 4px 10px rgba(0,0,0,0.1);">
                                <div style="margin-top:12px; text-align:center; background:#f1f3f4; padding:8px 20px; border-radius:20px; width:fit-content; max-width:90%;">
                                    <div style="font-size:14px; font-weight:bold; color:#0056b3; word-break:break-word; line-height:1.4;">${f.name}</div>
                                    <div style="font-size:12px; color:#6c757d; margin-top:4px;">📏 ${fileSizeText} (Bấm vào ảnh để xem toàn màn hình)</div>
                                </div>
                            </div>`;
                    } else {
                        displayContent = `
                            <a href="${f.url}" target="_blank" style="text-decoration:none; display:flex; flex-direction:column; align-items:center; width: 140px;">
                                <div style="width:100%; height:110px; display:flex; align-items:center; justify-content:center; background:#f1f3f4; border-radius:8px; border:1px solid #dee2e6; box-shadow:inset 0 0 10px rgba(0,0,0,0.02);">
                                    <span style="font-size:50px;">📄</span>
                                </div>
                                <div style="margin-top:10px; text-align:center; width:100%;">
                                    <div style="font-size:12px; font-weight:bold; color:#0056b3; word-break:break-word; line-height:1.4; overflow:hidden; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical;" title="${f.name}">${f.name}</div>
                                    <div style="font-size:11px; color:#6c757d; margin-top:5px;">📏 ${fileSizeText}</div>
                                </div>
                            </a>`;
                    }

                    htmlFiles += `
                        <div style="position:relative; animation:fadeIn 0.3s; ${cardWidth} background:#fff; padding:15px; border-radius:12px; border:1px solid #e9ecef; box-shadow:0 2px 5px rgba(0,0,0,0.04); transition:0.2s;" onmouseover="this.style.boxShadow='0 6px 15px rgba(0,123,255,0.15)'; this.style.borderColor='#b8daff'" onmouseout="this.style.boxShadow='0 2px 5px rgba(0,0,0,0.04)'; this.style.borderColor='#e9ecef'">
                            ${displayContent}
                            <button onclick="window.ham_22_20_xoa_file('${idDanhMuc}', '${idMucCon}', '${tp.idThanhPhan}', ${fIdx})" style="position:absolute; top:-8px; right:-8px; background:#dc3545; color:#fff; border:none; border-radius:50%; width:28px; height:28px; display:flex; align-items:center; justify-content:center; font-size:13px; font-weight:bold; cursor:pointer; box-shadow:0 2px 6px rgba(0,0,0,0.3); z-index:2;" title="Xóa tệp này">✖</button>
                        </div>
                    `;
                });
                htmlFiles += `</div>`;
            }

            tpUI = `
                <div style="margin-top:5px; background:#f8f9fa; padding:15px; border-radius:8px; border:1px dashed #ced4da;">
                    ${htmlFiles}
                    <div style="margin-top:20px; border-top:1px dashed #ccc; padding-top:15px;">
                        <button onclick="this.nextElementSibling.click()" style="padding:8px 16px; background:#007bff; color:#fff; border:none; border-radius:6px; font-size:13px; font-weight:bold; cursor:pointer; box-shadow:0 2px 4px rgba(0,123,255,0.2);">☁️ Tải Tệp Lên</button>
                        <input type="file" accept="image/*, application/pdf, .doc, .docx, .xls, .xlsx, .rar, .zip" multiple style="display:none;" onchange="window.ham_22_19_upload_file_vao_thanh_phan(this, '${idDanhMuc}', '${idMucCon}', '${tp.idThanhPhan}')">
                    </div>
                </div>
            `;
        }
        else if (tp.kieuThanhPhan === 'WORD') {
            let noiDung = tp.duLieu.htmlContent || '<i>Bấm vào đây để bắt đầu soạn thảo văn bản...</i>';
            tpUI = `
                <div style="margin-top:5px;">
                    <div id="word-editor-${tp.idThanhPhan}" contenteditable="true" style="min-height:100px; padding:15px; border:1px solid #ced4da; border-radius:6px; background:#fff; outline:none; font-family:inherit; line-height:1.6;" onfocus="if(this.innerHTML.includes('Bấm vào đây')) this.innerHTML='';">${noiDung}</div>
                    <div style="margin-top:8px; text-align:right;">
                        <button onclick="window.ham_22_21_luu_noi_dung_thanh_phan('${idDanhMuc}', '${idMucCon}', '${tp.idThanhPhan}', 'WORD')" style="padding:6px 15px; background:#28a745; color:#fff; border:none; border-radius:4px; font-size:12px; font-weight:bold; cursor:pointer;">💾 Lưu Văn Bản</button>
                    </div>
                </div>
            `;
        }
        else if (tp.kieuThanhPhan === 'EXCEL') {
            let noiDung = tp.duLieu.htmlTable || `
                <table style="width:100%; border-collapse:collapse; min-width:400px;">
                    <thead><tr style="background:#e9ecef;"><th style="border:1px solid #ccc; padding:8px;">Cột 1</th><th style="border:1px solid #ccc; padding:8px;">Cột 2</th><th style="border:1px solid #ccc; padding:8px;">Cột 3</th></tr></thead>
                    <tbody><tr><td style="border:1px solid #ccc; padding:8px;">Dữ liệu</td><td style="border:1px solid #ccc; padding:8px;">Dữ liệu</td><td style="border:1px solid #ccc; padding:8px;">Dữ liệu</td></tr></tbody>
                </table>`;

            tpUI = `
                <div style="margin-top:5px;">
                    <div style="font-size:11px; color:#6c757d; margin-bottom:5px; font-style:italic;">*Mẹo: Có thể copy bảng từ Word/Excel và Paste thẳng vào khung này.</div>
                    <div id="excel-editor-${tp.idThanhPhan}" contenteditable="true" style="width:100%; overflow-x:auto; padding:10px; border:1px solid #28a745; border-radius:6px; background:#fdfdfd; outline:none;">
                        ${noiDung}
                    </div>
                    <div style="margin-top:8px; text-align:right;">
                        <button onclick="window.ham_22_21_luu_noi_dung_thanh_phan('${idDanhMuc}', '${idMucCon}', '${tp.idThanhPhan}', 'EXCEL')" style="padding:6px 15px; background:#28a745; color:#fff; border:none; border-radius:4px; font-size:12px; font-weight:bold; cursor:pointer;">💾 Lưu Bảng Excel</button>
                    </div>
                </div>
            `;
        }

        tableHtml += `
            <tr style="border-bottom: 1px solid #e9ecef; transition: 0.2s; cursor: pointer; background: ${rowBg};" 
                onmouseover="this.style.background='#f1f8ff'" onmouseout="this.style.background='${rowBg}'" 
                onclick="let c = document.getElementById('body-tp-${tp.idThanhPhan}'); let i = document.getElementById('icon-toggle-${tp.idThanhPhan}'); if(c.style.display==='none'){c.style.display='table-row'; i.innerText='🔽';}else{c.style.display='none'; i.innerText='▶️';}">
                
                <td style="padding: 12px; text-align: center; font-weight: bold; color: #28a745;">${stt}</td>
                
                <td style="padding: 12px;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span id="icon-toggle-${tp.idThanhPhan}" style="font-size: 12px; color: #007bff;">🔽</span>
                        <span style="font-weight: bold; color: #333; font-size: 15px;">${tp.tenThanhPhan}</span>
                    </div>
                </td>
                
                <td style="padding: 12px; font-weight: bold; color: ${mainColor};">${typeLabel}</td>
                
                <!-- 🌟 SELECT 5 MỨC ĐỘ ƯU TIÊN -->
                <td style="padding: 12px; text-align: center;" onclick="event.stopPropagation();">
                    <select onchange="window.ham_22_cap_nhat_uu_tien_thanh_phan('${idDanhMuc}', '${idMucCon}', '${tp.idThanhPhan}', this.value)" 
                        style="padding: 4px; border-radius: 4px; border: 1px solid ${cTextColor}; background: ${cBgColor}; color: ${cTextColor}; font-size: 12px; font-weight: bold; outline: none; cursor: pointer; width: 100px;">
                        <option value="1" ${uuTien === 1 ? 'selected' : ''}>🔴 Rất Cao</option>
                        <option value="2" ${uuTien === 2 ? 'selected' : ''}>🟠 Cao</option>
                        <option value="3" ${uuTien === 3 ? 'selected' : ''}>🟡 Vừa</option>
                        <option value="4" ${uuTien === 4 ? 'selected' : ''}>🔵 Thấp</option>
                        <option value="5" ${uuTien === 5 ? 'selected' : ''}>🟢 Rất Thấp</option>
                    </select>
                </td>
                
                <td style="padding: 12px; font-size: 12px; color: #6c757d; font-style: italic;">${tgTaoTP}</td>
                
                <td style="padding: 12px; text-align: center;" onclick="event.stopPropagation();">
                    <label style="cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px; padding: 6px; border-radius: 6px; border: 1px solid ${tp.hoanThanh ? '#c3e6cb' : '#f5c6cb'}; background: ${tp.hoanThanh ? '#d4edda' : '#f8d7da'}; transition: 0.2s;">
                        <input type="checkbox" onchange="window.ham_22_cap_nhat_trang_thai_thanh_phan('${idDanhMuc}', '${idMucCon}', '${tp.idThanhPhan}', this.checked)" ${tp.hoanThanh ? 'checked' : ''} style="width: 15px; height: 15px; cursor: pointer; accent-color: #28a745; margin: 0;">
                        <span style="font-size: 11px; font-weight: bold; color: ${tp.hoanThanh ? '#155724' : '#721c24'};">${tp.hoanThanh ? 'Hoàn thành' : 'Chưa xong'}</span>
                    </label>
                </td>
                
                <td style="padding: 12px; text-align: center;" onclick="event.stopPropagation();">
                    <button onclick="window.ham_22_27_sua_ten_thanh_phan('${idDanhMuc}', '${idMucCon}', '${tp.idThanhPhan}')" style="background:none; border:none; cursor:pointer; font-size:14px; margin-right: 5px;" title="Sửa tên">✏️</button>
                    <button onclick="if(confirm('⚠️ Xóa Chuyên mục con này? Toàn bộ file đính kèm trên Google Drive sẽ bị xóa theo!')) window.ham_22_22_xoa_thanh_phan('${idDanhMuc}', '${idMucCon}', '${tp.idThanhPhan}')" style="background:none; border:none; cursor:pointer; font-size:14px; color:#dc3545;" title="Xóa">🗑️</button>
                </td>
            </tr>
            
            <tr id="body-tp-${tp.idThanhPhan}" style="display: table-row; background: #fafbfc; border-bottom: 2px solid #28a745;">
                <td colspan="7" style="padding: 20px;">
                    ${tpUI}
                </td>
            </tr>
        `;
    });

    tableHtml += `</tbody></table></div>`;
    vungChiTiet.innerHTML = tableHtml;
};


// =====================================================================
// HÀM 22.18: LƯU THÀNH PHẦN (CHỈNH MẶC ĐỊNH LÀ MỨC 3 - VỪA)
// =====================================================================
window.ham_22_18_luu_thanh_phan = async function (idDanhMuc, idMucCon, idThanhPhanMoi) {
    const tenTP = document.getElementById('qlhs-tp-ten').value.trim();
    const kieuTP = document.getElementById('qlhs-tp-kieu').value;

    if (!tenTP) return alert("⚠️ Vui lòng nhập Tên thành phần!");

    try {
        const tabData = window.qlhs_DanhSachDanhMuc.find(t => t.id === idDanhMuc);
        let mangMucCon = typeof tabData.du_lieu_json === 'string' ? JSON.parse(tabData.du_lieu_json || '[]') : tabData.du_lieu_json;
        let mucCon = mangMucCon.find(m => m.idMucCon === idMucCon);

        mucCon.mangThanhPhan = mucCon.mangThanhPhan || [];

        let duLieuMacDinh = {};
        if (kieuTP === 'IMAGE' || kieuTP === 'FILE') duLieuMacDinh = { danhSachFile: [] };
        if (kieuTP === 'WORD') duLieuMacDinh = { htmlContent: '' };
        if (kieuTP === 'EXCEL') duLieuMacDinh = { htmlTable: '' };

        // 🌟 BỔ SUNG TRƯỜNG uuTien MẶC ĐỊNH LÀ 3 (Vừa) CHO ĐỒNG BỘ BẢN 5 MỨC
        let thoiGianHienTai = new Date().toISOString();
        mucCon.mangThanhPhan.push({
            idThanhPhan: idThanhPhanMoi,
            tenThanhPhan: tenTP,
            kieuThanhPhan: kieuTP,
            duLieu: duLieuMacDinh,
            thoiGianTao: thoiGianHienTai,
            uuTien: 3,
            hoanThanh: false
        });

        const { error } = await _supabase.from('ho_so_danh_muc_lop').update({ du_lieu_json: mangMucCon }).eq('id', idDanhMuc);
        if (error) throw error;

        document.getElementById('qlhs-modal-them-tp').remove();
        tabData.du_lieu_json = mangMucCon;
        window.ham_22_16_mo_muc_con(idDanhMuc, idMucCon);

    } catch (e) { alert("❌ Lỗi: " + e.message); }
};




// =====================================================================
// HÀM MỚI: CẬP NHẬT MỨC ĐỘ ƯU TIÊN VÀ LƯU VÀO DB
// =====================================================================
window.ham_22_cap_nhat_uu_tien_thanh_phan = async function (idDanhMuc, idMucCon, idThanhPhan, giaTriUuTien) {
    const tabData = window.qlhs_DanhSachDanhMuc.find(t => t.id === idDanhMuc);
    if (!tabData) return;

    let mangMucCon = typeof tabData.du_lieu_json === 'string' ? JSON.parse(tabData.du_lieu_json || '[]') : tabData.du_lieu_json;
    let mucCon = mangMucCon.find(m => m.idMucCon === idMucCon);
    if (!mucCon) return;

    let thanhPhan = mucCon.mangThanhPhan.find(tp => tp.idThanhPhan === idThanhPhan);
    if (!thanhPhan) return;

    // Cập nhật giá trị ưu tiên vào Object
    thanhPhan.uuTien = parseInt(giaTriUuTien);

    try {
        const { error } = await _supabase.from('ho_so_danh_muc_lop').update({ du_lieu_json: mangMucCon }).eq('id', idDanhMuc);
        if (error) throw error;

        tabData.du_lieu_json = mangMucCon;

        // Render lại để áp dụng sắp xếp và màu nền mới nhất
        let kieuSortHienTai = window.qlhs_KieuSortTPHienTai || 'STATUS_TIME';
        window.ham_22_16_mo_muc_con(idDanhMuc, idMucCon, kieuSortHienTai);

    } catch (e) {
        alert("❌ Lỗi cập nhật mức độ ưu tiên: " + e.message);
    }
};




// =====================================================================
// HÀM MỚI: TỰ ĐỘNG THU GỌN HOẶC MỞ RỘNG TẤT CẢ CHUYÊN MỤC CON ĐỒNG LOẠT
// =====================================================================
window.ham_22_toggle_all_muc_con = function (btnElem) {
    let isExpanded = btnElem.dataset.expanded === 'true';
    let danhSachNoiDung = document.querySelectorAll('[id^="body-tp-"]');
    let danhSachIcon = document.querySelectorAll('[id^="icon-toggle-"]');

    if (isExpanded) {
        // Thu gọn tất cả
        danhSachNoiDung.forEach(el => el.style.display = 'none');
        danhSachIcon.forEach(el => el.innerText = '▶️');
        btnElem.dataset.expanded = 'false';
        btnElem.innerHTML = '👁️ Hiện Tất Cả';
        btnElem.style.background = '#17a2b8';
        btnElem.style.color = '#fff';
    } else {
        // Mở rộng tất cả
        danhSachNoiDung.forEach(el => el.style.display = 'table-row');
        danhSachIcon.forEach(el => el.innerText = '🔽');
        btnElem.dataset.expanded = 'true';
        btnElem.innerHTML = '🙈 Thu Gọn Tất Cả';
        btnElem.style.background = '#ffc107';
        btnElem.style.color = '#000';
    }
};

// =====================================================================
// HÀM MỚI: CẬP NHẬT TRẠNG THÁI HOÀN THÀNH CỦA TỪNG CHUYÊN MỤC CON
// =====================================================================
window.ham_22_cap_nhat_trang_thai_thanh_phan = async function (idDanhMuc, idMucCon, idThanhPhan, isHoanThanh) {
    const tabData = window.qlhs_DanhSachDanhMuc.find(t => t.id === idDanhMuc);
    if (!tabData) return;

    let mangMucCon = typeof tabData.du_lieu_json === 'string' ? JSON.parse(tabData.du_lieu_json || '[]') : tabData.du_lieu_json;
    let mucCon = mangMucCon.find(m => m.idMucCon === idMucCon);
    if (!mucCon) return;

    let thanhPhan = mucCon.mangThanhPhan.find(tp => tp.idThanhPhan === idThanhPhan);
    if (!thanhPhan) return;

    thanhPhan.hoanThanh = isHoanThanh;

    try {
        const { error } = await _supabase.from('ho_so_danh_muc_lop').update({ du_lieu_json: mangMucCon }).eq('id', idDanhMuc);
        if (error) throw error;

        tabData.du_lieu_json = mangMucCon;

        // Render lại để áp dụng sắp xếp và màu nền mới nhất
        let kieuSortHienTai = window.qlhs_KieuSortTPHienTai || 'STATUS_TIME';
        window.ham_22_16_mo_muc_con(idDanhMuc, idMucCon, kieuSortHienTai);

    } catch (e) {
        alert("❌ Lỗi cập nhật trạng thái: " + e.message);
    }
};






// // =====================================================================
// // HÀM 22.17 & 22.18: TẠO THÀNH PHẦN MỚI
// // =====================================================================
// window.ham_22_17_mo_modal_them_thanh_phan = function (idDanhMuc, idMucCon) {
//     let modal = document.getElementById('qlhs-modal-them-tp'); if (modal) modal.remove();
//     let idMoi = 'TP_' + new Date().getTime();

//     modal = document.createElement('div'); modal.id = 'qlhs-modal-them-tp';
//     modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); display:flex; align-items:center; justify-content:center; z-index:999999; backdrop-filter: blur(2px); animation: fadeIn 0.2s;';
//     modal.innerHTML = `
//         <div style="background:#fff; width:450px; padding:25px; border-radius:12px; box-shadow:0 10px 30px rgba(0,0,0,0.4);">
//             <h3 style="margin-top:0; color:#28a745; border-bottom:2px solid #c3e6cb; padding-bottom:10px;">➕ TẠO THÀNH PHẦN CHỨA</h3>
//             <div style="margin-bottom:15px;">
//                 <label style="font-weight:bold; font-size:13px; color:#495057;">Tên thành phần:</label>
//                 <input type="text" id="qlhs-tp-ten" placeholder="VD: Hình ảnh sự kiện, Danh sách đóng quỹ..." style="width:100%; padding:10px; border:1px solid #ced4da; border-radius:6px; margin-top:5px; box-sizing:border-box; font-weight:bold; outline:none;">
//             </div>
//             <div style="margin-bottom:20px;">
//                 <label style="font-weight:bold; font-size:13px; color:#495057;">Định dạng (Kiểu dữ liệu):</label>
//                 <select id="qlhs-tp-kieu" style="width:100%; padding:10px; border:1px solid #ced4da; border-radius:6px; margin-top:5px; box-sizing:border-box; font-size:14px; outline:none; cursor:pointer;">
//                     <option value="IMAGE">🖼️ Cụm Ảnh đính kèm</option>
//                     <option value="FILE">📎 Cụm File đính kèm (PDF, ZIP...)</option>
//                     <option value="WORD">📝 Bảng Văn bản (Word / Ghi chú)</option>
//                     <option value="EXCEL">📊 Bảng Kẻ ô (Excel / Danh sách)</option>
//                 </select>
//             </div>
//             <div style="display:flex; justify-content:flex-end; gap:10px; border-top:1px solid #eee; padding-top:15px;">
//                 <button onclick="document.getElementById('qlhs-modal-them-tp').remove()" style="padding:10px 20px; background:#6c757d; color:white; border:none; border-radius:6px; cursor:pointer; font-weight:bold;">Hủy</button>
//                 <button onclick="window.ham_22_18_luu_thanh_phan('${idDanhMuc}', '${idMucCon}', '${idMoi}')" style="padding:10px 25px; background:#28a745; color:white; border:none; border-radius:6px; cursor:pointer; font-weight:bold;">💾 Tạo Thành Phần</button>
//             </div>
//         </div>
//     `;
//     document.body.appendChild(modal); document.getElementById('qlhs-tp-ten').focus();
// };



window.ham_22_17_mo_modal_them_thanh_phan = function (idDanhMuc, idMucCon) {
    let modal = document.getElementById('qlhs-modal-them-tp'); if (modal) modal.remove();
    let idMoi = 'TP_' + new Date().getTime();

    modal = document.createElement('div'); modal.id = 'qlhs-modal-them-tp';
    modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); display:flex; align-items:center; justify-content:center; z-index:999999; backdrop-filter: blur(2px); animation: fadeIn 0.2s;';
    modal.innerHTML = `
        <div style="background:#fff; width:450px; padding:25px; border-radius:12px; box-shadow:0 10px 30px rgba(0,0,0,0.4);">
            <h3 style="margin-top:0; color:#28a745; border-bottom:2px solid #c3e6cb; padding-bottom:10px;">➕ TẠO CHUYÊN MỤC CON</h3>
            <div style="margin-bottom:15px;">
                <label style="font-weight:bold; font-size:13px; color:#495057;">Tên chuyên mục con:</label>
                <input type="text" id="qlhs-tp-ten" placeholder="VD: Hình ảnh sự kiện, Danh sách đóng quỹ..." style="width:100%; padding:10px; border:1px solid #ced4da; border-radius:6px; margin-top:5px; box-sizing:border-box; font-weight:bold; outline:none;">
            </div>
            <div style="margin-bottom:20px;">
                <label style="font-weight:bold; font-size:13px; color:#495057;">Định dạng (Kiểu dữ liệu):</label>
                <select id="qlhs-tp-kieu" style="width:100%; padding:10px; border:1px solid #ced4da; border-radius:6px; margin-top:5px; box-sizing:border-box; font-size:14px; outline:none; cursor:pointer;">
                    <option value="IMAGE">🖼️ Cụm Ảnh đính kèm</option>
                    <option value="FILE">📎 Cụm File đính kèm (PDF, ZIP...)</option>
                    <option value="WORD">📝 Bảng Văn bản (Word / Ghi chú)</option>
                    <option value="EXCEL">📊 Bảng Kẻ ô (Excel / Danh sách)</option>
                </select>
            </div>
            <div style="display:flex; justify-content:flex-end; gap:10px; border-top:1px solid #eee; padding-top:15px;">
                <button onclick="document.getElementById('qlhs-modal-them-tp').remove()" style="padding:10px 20px; background:#6c757d; color:white; border:none; border-radius:6px; cursor:pointer; font-weight:bold;">Hủy</button>
                <button onclick="window.ham_22_18_luu_thanh_phan('${idDanhMuc}', '${idMucCon}', '${idMoi}')" style="padding:10px 25px; background:#28a745; color:white; border:none; border-radius:6px; cursor:pointer; font-weight:bold;">💾 Tạo Chuyên Mục Con</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal); document.getElementById('qlhs-tp-ten').focus();
};




// // =====================================================================
// // HÀM 22.18: LƯU THÀNH PHẦN (CÓ GHI NHẬN THỜI GIAN)
// // =====================================================================
// window.ham_22_18_luu_thanh_phan = async function (idDanhMuc, idMucCon, idThanhPhanMoi) {
//     const tenTP = document.getElementById('qlhs-tp-ten').value.trim();
//     const kieuTP = document.getElementById('qlhs-tp-kieu').value;

//     if (!tenTP) return alert("⚠️ Vui lòng nhập Tên thành phần!");

//     try {
//         const tabData = window.qlhs_DanhSachDanhMuc.find(t => t.id === idDanhMuc);
//         let mangMucCon = typeof tabData.du_lieu_json === 'string' ? JSON.parse(tabData.du_lieu_json || '[]') : tabData.du_lieu_json;
//         let mucCon = mangMucCon.find(m => m.idMucCon === idMucCon);

//         mucCon.mangThanhPhan = mucCon.mangThanhPhan || [];

//         let duLieuMacDinh = {};
//         if (kieuTP === 'IMAGE' || kieuTP === 'FILE') duLieuMacDinh = { danhSachFile: [] };
//         if (kieuTP === 'WORD') duLieuMacDinh = { htmlContent: '' };
//         if (kieuTP === 'EXCEL') duLieuMacDinh = { htmlTable: '' };

//         // 🌟 THÊM TRƯỜNG thoiGianTao
//         let thoiGianHienTai = new Date().toISOString();
//         mucCon.mangThanhPhan.push({
//             idThanhPhan: idThanhPhanMoi,
//             tenThanhPhan: tenTP,
//             kieuThanhPhan: kieuTP,
//             duLieu: duLieuMacDinh,
//             thoiGianTao: thoiGianHienTai
//         });

//         const { error } = await _supabase.from('ho_so_danh_muc_lop').update({ du_lieu_json: mangMucCon }).eq('id', idDanhMuc);
//         if (error) throw error;

//         document.getElementById('qlhs-modal-them-tp').remove();
//         tabData.du_lieu_json = mangMucCon;
//         window.ham_22_16_mo_muc_con(idDanhMuc, idMucCon);

//     } catch (e) { alert("❌ Lỗi: " + e.message); }
// };


// // =====================================================================
// // HÀM 22.18: LƯU THÀNH PHẦN (ĐÃ BỔ SUNG TRƯỜNG ƯU TIÊN MẶC ĐỊNH)
// // =====================================================================
// window.ham_22_18_luu_thanh_phan = async function (idDanhMuc, idMucCon, idThanhPhanMoi) {
//     const tenTP = document.getElementById('qlhs-tp-ten').value.trim();
//     const kieuTP = document.getElementById('qlhs-tp-kieu').value;

//     if (!tenTP) return alert("⚠️ Vui lòng nhập Tên thành phần!");

//     try {
//         const tabData = window.qlhs_DanhSachDanhMuc.find(t => t.id === idDanhMuc);
//         let mangMucCon = typeof tabData.du_lieu_json === 'string' ? JSON.parse(tabData.du_lieu_json || '[]') : tabData.du_lieu_json;
//         let mucCon = mangMucCon.find(m => m.idMucCon === idMucCon);

//         mucCon.mangThanhPhan = mucCon.mangThanhPhan || [];

//         let duLieuMacDinh = {};
//         if (kieuTP === 'IMAGE' || kieuTP === 'FILE') duLieuMacDinh = { danhSachFile: [] };
//         if (kieuTP === 'WORD') duLieuMacDinh = { htmlContent: '' };
//         if (kieuTP === 'EXCEL') duLieuMacDinh = { htmlTable: '' };

//         // 🌟 BỔ SUNG TRƯỜNG uuTien MẶC ĐỊNH LÀ 2 (Vừa)
//         let thoiGianHienTai = new Date().toISOString();
//         mucCon.mangThanhPhan.push({
//             idThanhPhan: idThanhPhanMoi,
//             tenThanhPhan: tenTP,
//             kieuThanhPhan: kieuTP,
//             duLieu: duLieuMacDinh,
//             thoiGianTao: thoiGianHienTai,
//             uuTien: 2,
//             hoanThanh: false
//         });

//         const { error } = await _supabase.from('ho_so_danh_muc_lop').update({ du_lieu_json: mangMucCon }).eq('id', idDanhMuc);
//         if (error) throw error;

//         document.getElementById('qlhs-modal-them-tp').remove();
//         tabData.du_lieu_json = mangMucCon;
//         window.ham_22_16_mo_muc_con(idDanhMuc, idMucCon);

//     } catch (e) { alert("❌ Lỗi: " + e.message); }
// };

// // =====================================================================
// // HÀM 22.19: UPLOAD FILE VÀO THÀNH PHẦN TƯƠNG ỨNG (CÓ TIẾN TRÌNH CHI TIẾT)
// // =====================================================================
// window.ham_22_19_upload_file_vao_thanh_phan = async function (inputElem, idDanhMuc, idMucCon, idThanhPhan) {
//     const files = Array.from(inputElem.files);
//     if (files.length === 0) return;

//     const btn = inputElem.previousElementSibling;
//     const oldText = btn.innerHTML;
//     btn.innerHTML = "⏳ Đang xử lý..."; btn.disabled = true;

//     try {
//         let imgFiles = files.filter(f => f.type.startsWith('image/'));
//         let docFiles = files.filter(f => !f.type.startsWith('image/'));
//         let processedImages = [];

//         if (imgFiles.length > 0 && typeof window.ham_ho_tro_xu_ly_mang_anh_dau_vao === 'function') {
//             processedImages = await window.ham_ho_tro_xu_ly_mang_anh_dau_vao(imgFiles);
//         } else if (imgFiles.length > 0 && typeof window.ham_20_25_xu_ly_mang_anh_dau_vao === 'function') {
//             processedImages = await window.ham_20_25_xu_ly_mang_anh_dau_vao(imgFiles);
//         } else {
//             processedImages = imgFiles;
//         }

//         let allFinalFiles = [...processedImages, ...docFiles];
//         if (allFinalFiles.length === 0) throw new Error("Thao tác bị hủy.");

//         const tabData = window.qlhs_DanhSachDanhMuc.find(t => t.id === idDanhMuc);
//         let mangMucCon = typeof tabData.du_lieu_json === 'string' ? JSON.parse(tabData.du_lieu_json || '[]') : tabData.du_lieu_json;
//         let mucCon = mangMucCon.find(m => m.idMucCon === idMucCon);
//         let thanhPhan = mucCon.mangThanhPhan.find(tp => tp.idThanhPhan === idThanhPhan);

//         if (!thanhPhan.duLieu.danhSachFile) thanhPhan.duLieu.danhSachFile = [];

//         // Tên Thư Mục Drive Cấu Trúc Đẹp Nhất: TabLớn_MụcCon
//         let tenDanhMucChuan = window.taoTenAnToan ? window.taoTenAnToan(tabData.ten_danh_muc, 40) : tabData.ten_danh_muc.replace(/[\\/:*?"<>| ]/g, "_");
//         let tenMucConChuan = window.taoTenAnToan ? window.taoTenAnToan(mucCon.tenMucCon, 40) : mucCon.tenMucCon.replace(/[\\/:*?"<>| ]/g, "_");

//         for (let k = 0; k < allFinalFiles.length; k++) {
//             let f = allFinalFiles[k];
//             let b64 = await new Promise((resolve, reject) => {
//                 let reader = new FileReader();
//                 reader.onload = () => { let res = reader.result; resolve(res.includes(',') ? res.split(',')[1] : res); };
//                 reader.onerror = err => reject(err); reader.readAsDataURL(f);
//             });

//             if (!b64) throw new Error("Lỗi đọc file.");

//             let duoiFile = f.name.includes('.') ? f.name.substring(f.name.lastIndexOf('.')) : '';
//             let tenGoc = f.name.replace(duoiFile, '').replace(/[\\/:*?"<>| ]/g, "_");
//             let tenFileMoi = `HoSo_${window.qlhs_MaLopHienTai}_${tenGoc}${duoiFile}`;

//             btn.innerHTML = `🚀 Đang tải (${k + 1}/${allFinalFiles.length})...`;

//             let payload = {
//                 action: "upload_file_ho_so_lop",
//                 base64: b64, base64Data: b64, mimeType: f.type, fileName: tenFileMoi,
//                 maLop: window.qlhs_MaLopHienTai,
//                 tenDanhMuc: tenDanhMucChuan,
//                 tenMucCon: tenMucConChuan
//             };

//             let uploadResult;
//             if (typeof window.ham_ho_tro_upload_anh_co_tien_trinh === 'function') {
//                 uploadResult = await window.ham_ho_tro_upload_anh_co_tien_trinh(
//                     CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP,
//                     payload,
//                     (phanTram, daTai, tongSo) => {
//                         // 🌟 TÍNH TOÁN DUNG LƯỢNG VÀ HIỂN THỊ CHI TIẾT
//                         let strDaTai = (daTai / 1024).toFixed(1) + ' KB';
//                         let strTongSo = (tongSo / 1024).toFixed(1) + ' KB';

//                         if (typeof window.ham_dinh_dang_dung_luong === 'function') {
//                             strDaTai = window.ham_dinh_dang_dung_luong(daTai);
//                             strTongSo = window.ham_dinh_dang_dung_luong(tongSo);
//                         }

//                         // Chạy màu nền dần dần từ trái sang phải
//                         btn.style.background = `linear-gradient(90deg, #28a745 ${phanTram}%, #007bff ${phanTram}%)`;

//                         // Hiển thị nội dung File đang tải + KB + %
//                         btn.innerHTML = `🚀 Đang tải (${k + 1}/${allFinalFiles.length})<br><span style="font-size: 11px; font-weight: normal;">${strDaTai} / ${strTongSo} (${phanTram}%)</span>`;
//                     }
//                 );
//             } else {
//                 const res = await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, { method: "POST", body: JSON.stringify(payload) });
//                 uploadResult = await res.json();
//             }

//             if (uploadResult && uploadResult.status === 'success') {
//                 thanhPhan.duLieu.danhSachFile.push({ name: f.name, url: uploadResult.url, size: (f.size / 1024).toFixed(1), type: f.type });
//             } else { throw new Error(uploadResult.message || "Lỗi tải lên từ máy chủ."); }
//         }

//         btn.style.background = ''; // Xóa màu nền gradient tiến trình
//         btn.innerHTML = "⏳ Lưu Database...";
//         const { error: errUp } = await _supabase.from('ho_so_danh_muc_lop').update({ du_lieu_json: mangMucCon }).eq('id', idDanhMuc);
//         if (errUp) throw errUp;

//         tabData.du_lieu_json = mangMucCon;
//         window.ham_22_16_mo_muc_con(idDanhMuc, idMucCon);

//     } catch (e) {
//         if (e.message !== "Thao tác bị hủy.") alert("❌ Lỗi: " + e.message);
//     } finally {
//         inputElem.value = '';
//         btn.style.background = '';
//         btn.innerHTML = oldText;
//         btn.disabled = false;
//     }
// };


// =====================================================================
// HÀM 22.19: CHO PHÉP CHỌN FILE, CHỤP CAMERA, CẮT NÉN TRỰC TIẾP & UPLOAD
// =====================================================================
window.ham_22_19_upload_file_vao_thanh_phan = async function (inputElem, idDanhMuc, idMucCon, idThanhPhan) {
    const files = Array.from(inputElem.files);
    if (files.length === 0) return;

    const btn = inputElem.previousElementSibling;
    const oldText = btn ? btn.innerHTML : "☁️ Tải Tệp Lên";
    if (btn) { btn.innerHTML = "⏳ Đang chuẩn bị ảnh..."; btn.disabled = true; }

    try {
        let finalFilesToUpload = [];

        // Duyệt qua từng file được chọn/chụp
        for (let i = 0; i < files.length; i++) {
            let file = filesi = files[i];

            // Nếu là file ảnh, ta mở công cụ Cắt & Nén trực tiếp trước khi upload
            if (file.type.startsWith('image/')) {
                let processedBlob = await window.ham_22_mo_modal_cat_nen_anh_cuc_nhanh(file);
                if (processedBlob) {
                    let newFile = new File([processedBlob], file.name.replace(/\.[^/.]+$/, "") + "_edit.jpg", {
                        type: 'image/jpeg',
                        lastModified: Date.now()
                    });
                    finalFilesToUpload.push(newFile);
                }
            } else {
                // Nếu là file tài liệu (PDF, Word, Excel...) thì giữ nguyên không cần cắt nén
                finalFilesToUpload.push(file);
            }
        }

        if (finalFilesToUpload.length === 0) {
            if (btn) { btn.style.background = ''; btn.innerHTML = oldText; btn.disabled = false; }
            inputElem.value = '';
            return;
        }

        const tabData = window.qlhs_DanhSachDanhMuc.find(t => t.id === idDanhMuc);
        let mangMucCon = typeof tabData.du_lieu_json === 'string' ? JSON.parse(tabData.du_lieu_json || '[]') : tabData.du_lieu_json;
        let mucCon = mangMucCon.find(m => m.idMucCon === idMucCon);
        let thanhPhan = mucCon.mangThanhPhan.find(tp => tp.idThanhPhan === idThanhPhan);

        if (!thanhPhan.duLieu.danhSachFile) thanhPhan.duLieu.danhSachFile = [];

        let tenDanhMucChuan = window.taoTenAnToan ? window.taoTenAnToan(tabData.ten_danh_muc, 40) : tabData.ten_danh_muc.replace(/[\\/:*?"<>| ]/g, "_");
        let tenMucConChuan = window.taoTenAnToan ? window.taoTenAnToan(mucCon.tenMucCon, 40) : mucCon.tenMucCon.replace(/[\\/:*?"<>| ]/g, "_");

        for (let k = 0; k < finalFilesToUpload.length; k++) {
            let f = finalFilesToUpload[k];
            let b64 = await new Promise((resolve, reject) => {
                let reader = new FileReader();
                reader.onload = () => { let res = reader.result; resolve(res.includes(',') ? res.split(',')[1] : res); };
                reader.onerror = err => reject(err); reader.readAsDataURL(f);
            });

            if (!b64) throw new Error("Lỗi đọc file.");

            let duoiFile = f.name.includes('.') ? f.name.substring(f.name.lastIndexOf('.')) : '';
            let tenGoc = f.name.replace(duoiFile, '').replace(/[\\/:*?"<>| ]/g, "_");
            let tenFileMoi = `HoSo_${window.qlhs_MaLopHienTai}_${tenGoc}${duoiFile}`;

            if (btn) btn.innerHTML = `🚀 Đang tải (${k + 1}/${finalFilesToUpload.length})...`;

            let payload = {
                action: "upload_file_ho_so_lop",
                base64: b64, base64Data: b64, mimeType: f.type, fileName: tenFileMoi,
                maLop: window.qlhs_MaLopHienTai,
                tenDanhMuc: tenDanhMucChuan,
                tenMucCon: tenMucConChuan
            };

            let uploadResult;
            if (typeof window.ham_ho_tro_upload_anh_co_tien_trinh === 'function') {
                uploadResult = await window.ham_ho_tro_upload_anh_co_tien_trinh(
                    CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP,
                    payload,
                    (phanTram, daTai, tongSo) => {
                        let strDaTai = (daTai / 1024).toFixed(1) + ' KB';
                        let strTongSo = (tongSo / 1024).toFixed(1) + ' KB';
                        if (typeof window.ham_dinh_dang_dung_luong === 'function') {
                            strDaTai = window.ham_dinh_dang_dung_luong(daTai);
                            strTongSo = window.ham_dinh_dang_dung_luong(tongSo);
                        }
                        if (btn) {
                            btn.style.background = `linear-gradient(90deg, #28a745 ${phanTram}%, #007bff ${phanTram}%)`;
                            btn.innerHTML = `🚀 Đang tải (${k + 1}/${finalFilesToUpload.length})<br><span style="font-size: 11px; font-weight: normal;">${strDaTai} / ${strTongSo} (${phanTram}%)</span>`;
                        }
                    }
                );
            } else {
                const res = await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, { method: "POST", body: JSON.stringify(payload) });
                uploadResult = await res.json();
            }

            if (uploadResult && uploadResult.status === 'success') {
                thanhPhan.duLieu.danhSachFile.push({ name: f.name, url: uploadResult.url, size: (f.size / 1024).toFixed(1), type: f.type });
            } else { throw new Error(uploadResult.message || "Lỗi tải lên từ máy chủ."); }
        }

        if (btn) { btn.style.background = ''; btn.innerHTML = "⏳ Lưu Database..."; }
        const { error: errUp } = await _supabase.from('ho_so_danh_muc_lop').update({ du_lieu_json: mangMucCon }).eq('id', idDanhMuc);
        if (errUp) throw errUp;

        tabData.du_lieu_json = mangMucCon;
        window.ham_22_16_mo_muc_con(idDanhMuc, idMucCon);

    } catch (e) {
        if (e.message !== "Thao tác bị hủy.") alert("❌ Lỗi: " + e.message);
    } finally {
        inputElem.value = '';
        if (btn) { btn.style.background = ''; btn.innerHTML = oldText; btn.disabled = false; }
    }
};

// // =====================================================================
// // HÀM HỖ TRỢ: BẬT MODAL CẮT & NÉN ẢNH (CHO PHÉP ZOOM OUT THU NHỎ THẢ GA)
// // =====================================================================
// window.ham_22_mo_modal_cat_nen_anh_cuc_nhanh = async function (fileImage) {
//     // 1. Tải thư viện CropperJS nếu chưa có
//     if (typeof window.Cropper === 'undefined') {
//         Swal.fire({ title: 'Đang tải bộ công cụ cắt ảnh...', didOpen: () => Swal.showLoading() });
//         await new Promise((resolve) => {
//             const link = document.createElement('link'); link.rel = 'stylesheet'; link.href = 'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.css'; document.head.appendChild(link);
//             const script = document.createElement('script'); script.src = 'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.js'; script.onload = resolve; document.head.appendChild(script);
//         });
//         Swal.close();
//     }

//     return new Promise(async (resolve) => {
//         let objectURL = URL.createObjectURL(fileImage);

//         let modalBox = document.createElement('div');
//         modalBox.style.cssText = 'position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.9); display:flex; flex-direction:column; z-index:9999999; overflow:hidden;';

//         modalBox.innerHTML = `
//             <div style="flex: 0 0 60px; background:#222; padding:0 20px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #444; z-index:10;">
//                 <span style="color:#ffc107; font-weight:bold; font-size:15px;">✂️ CẮT & TỐI ƯU HÓA ẢNH (CHO PHÉP ZOOM OUT)</span>
//                 <div style="display:flex; gap:10px;">
//                     <button id="btn_cropper_luu" style="background:#28a745; color:white; border:none; padding:8px 18px; border-radius:6px; font-weight:bold; cursor:pointer; box-shadow:0 2px 4px rgba(0,0,0,0.2);">💾 Lưu ảnh này</button>
//                     <button id="btn_cropper_huy" style="background:#6c757d; color:white; border:none; padding:8px 18px; border-radius:6px; font-weight:bold; cursor:pointer; box-shadow:0 2px 4px rgba(0,0,0,0.2);">✖ Bỏ qua file này</button>
//                 </div>
//             </div>
//             <div style="flex: 1; position:relative; width:100%; height:calc(100vh - 60px); background:#111; display:flex; align-items:center; justify-content:center; overflow:hidden;">
//                 <img id="img_cropper_target_popup" src="${objectURL}" style="max-width:100%; max-height:100%; display:block;">
//             </div>
//         `;
//         document.body.appendChild(modalBox);

//         const targetImg = document.getElementById('img_cropper_target_popup');

//         // 🌟 CẤU HÌNH MỞ RỘNG GIỚI HẠN ZOOM OUT
//         let cropperInstance = new window.Cropper(targetImg, {
//             viewMode: 0,             // Cho phép khung ảnh dịch chuyển thoải mái ra ngoài vùng canvas
//             dragMode: 'crop',        // Chế độ kéo tạo khung hoặc 'move' để dịch chuyển ảnh
//             autoCropArea: 0.9,       // Khung cắt mặc định chiếm 90% diện tích ảnh
//             restore: false,
//             guides: true,
//             center: true,
//             highlight: false,
//             cropBoxMovable: true,
//             cropBoxResizable: true,
//             toggleDragModeOnDblclick: false,
//             zoomOnWheel: true,       // Cho phép lăn chuột giữa để phóng to / thu nhỏ (zoom in/out) thoải mái
//             zoomOnTouch: true,       // Cho phép chụm 2 ngón tay để zoom trên điện thoại
//             wheelZoomRatio: 0.1,     // Tốc độ zoom mượt mà
//             minContainerWidth: 200,
//             minContainerHeight: 200,
//             responsive: true
//         });

//         document.getElementById('btn_cropper_huy').onclick = function () {
//             cropperInstance.destroy();
//             modalBox.remove();
//             URL.revokeObjectURL(objectURL);
//             resolve(null);
//         };

//         document.getElementById('btn_cropper_luu').onclick = function () {
//             const canvas = cropperInstance.getCroppedCanvas({
//                 maxWidth: 1920,
//                 maxHeight: 1920,
//                 imageSmoothingEnabled: true,
//                 imageSmoothingQuality: 'high'
//             });

//             canvas.toBlob((blob) => {
//                 cropperInstance.destroy();
//                 modalBox.remove();
//                 URL.revokeObjectURL(objectURL);
//                 resolve(blob);
//             }, 'image/jpeg', 0.8);
//         };
//     });
// };

// // =====================================================================
// // HÀM HỖ TRỢ: BẬT MODAL CẮT & NÉN ẢNH (CÓ NÚT ZOOM TRỰC TIẾP & KHUNG CẮT THU GỌN)
// // =====================================================================
// window.ham_22_mo_modal_cat_nen_anh_cuc_nhanh = async function (fileImage) {
//     // 1. Tải thư viện CropperJS nếu chưa có
//     if (typeof window.Cropper === 'undefined') {
//         Swal.fire({ title: 'Đang tải bộ công cụ cắt ảnh...', didOpen: () => Swal.showLoading() });
//         await new Promise((resolve) => {
//             const link = document.createElement('link'); link.rel = 'stylesheet'; link.href = 'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.css'; document.head.appendChild(link);
//             const script = document.createElement('script'); script.src = 'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.js'; script.onload = resolve; document.head.appendChild(script);
//         });
//         Swal.close();
//     }

//     return new Promise(async (resolve) => {
//         let objectURL = URL.createObjectURL(fileImage);

//         let modalBox = document.createElement('div');
//         modalBox.style.cssText = 'position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.92); display:flex; flex-direction:column; z-index:9999999; overflow:hidden;';

//         modalBox.innerHTML = `
//             <!-- THANH CÔNG CỤ PHÍA TRÊN (GỒM NÚT ZOOM, CHỌN ĐỘ PHÂN GIẢI VÀ NÚT LƯU/HỦY) -->
//             <div style="flex: 0 0 65px; background:#222; padding:0 12px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #444; z-index:10; flex-wrap:wrap; gap:8px;">
//                 <div style="display:flex; align-items:center; gap:6px;">
//                     <span style="color:#ffc107; font-weight:bold; font-size:12px;">📐 Cỡ:</span>
//                     <select id="select_chat_luong_anh_popup" style="padding:5px 6px; border-radius:4px; background:#fff; color:#333; font-weight:bold; font-size:11px; border:1px solid #ccc; outline:none; cursor:pointer;">
//                         <option value="ORIGINAL">✨ Gốc</option>
//                         <option value="2K">🖥️ 2K</option>
//                         <option value="FULLHD" selected>💻 Full HD</option>
//                         <option value="HD">📱 HD</option>
//                     </select>

//                     <!-- 🌟 CỤM NÚT ZOOM NHANH TRỰC TIẾP TRÊN GIAO DIỆN -->
//                     <div style="display:flex; gap:3px; margin-left:5px;">
//                         <button id="btn_zoom_out" style="background:#444; color:white; border:none; padding:5px 8px; border-radius:4px; font-weight:bold; cursor:pointer; font-size:12px;" title="Thu nhỏ ảnh (Zoom Out)">🔍-</button>
//                         <button id="btn_zoom_in" style="background:#444; color:white; border:none; padding:5px 8px; border-radius:4px; font-weight:bold; cursor:pointer; font-size:12px;" title="Phóng to ảnh (Zoom In)">🔍+</button>
//                         <button id="btn_zoom_reset" style="background:#444; color:white; border:none; padding:5px 8px; border-radius:4px; font-weight:bold; cursor:pointer; font-size:11px;" title="Đặt lại kích thước">🔄</button>
//                     </div>
//                 </div>

//                 <div style="display:flex; gap:6px;">
//                     <button id="btn_cropper_luu" style="background:#28a745; color:white; border:none; padding:6px 14px; border-radius:6px; font-weight:bold; cursor:pointer; font-size:12px; box-shadow:0 2px 4px rgba(0,0,0,0.2);">💾 Lưu</button>
//                     <button id="btn_cropper_huy" style="background:#6c757d; color:white; border:none; padding:6px 14px; border-radius:6px; font-weight:bold; cursor:pointer; font-size:12px; box-shadow:0 2px 4px rgba(0,0,0,0.2);">✖ Hủy</button>
//                 </div>
//             </div>

//             <!-- VÙNG CHỨA ẢNH CẮT -->
//             <div style="flex: 1; position:relative; width:100%; height:calc(100vh - 65px); background:#111; display:flex; align-items:center; justify-content:center; overflow:hidden;">
//                 <img id="img_cropper_target_popup" src="${objectURL}" style="max-width:100%; max-height:100%; display:block;">
//             </div>
//         `;
//         document.body.appendChild(modalBox);

//         const targetImg = document.getElementById('img_cropper_target_popup');

//         let cropperInstance = new window.Cropper(targetImg, {
//             viewMode: 0,             // Cho phép dịch chuyển ảnh ra ngoài khung thoải mái
//             dragMode: 'move',        // Mặc định là chế độ kéo di chuyển ảnh
//             autoCropArea: 0.7,       // 🌟 Đặt 0.7 giúp khung cắt ban đầu gọn gàng ở giữa, không bị che kín màn hình
//             restore: false,
//             guides: true,
//             center: true,
//             highlight: false,
//             cropBoxMovable: true,    // Cho phép di chuyển khung cắt
//             cropBoxResizable: true,  // Cho phép kéo co giãn các góc của khung cắt
//             toggleDragModeOnDblclick: true, // Nhấp đúp để đổi qua lại giữa vẽ khung và kéo ảnh
//             zoomOnWheel: true,       // Lăn chuột zoom
//             zoomOnTouch: true,       // Chụm ngón tay zoom trên điện thoại
//             wheelZoomRatio: 0.1,
//             minContainerWidth: 200,
//             minContainerHeight: 200,
//             responsive: true
//         });

//         // 🌟 GẮN SỰ KIỆN CHO CÁC NÚT ZOOM TRÊN THANH CÔNG CỤ
//         document.getElementById('btn_zoom_out').onclick = function () {
//             cropperInstance.zoom(-0.1); // Thu nhỏ ảnh 10% mỗi lần bấm
//         };
//         document.getElementById('btn_zoom_in').onclick = function () {
//             cropperInstance.zoom(0.1);  // Phóng to ảnh 10% mỗi lần bấm
//         };
//         document.getElementById('btn_zoom_reset').onclick = function () {
//             cropperInstance.reset();    // Đặt lại trạng thái ban đầu
//         };

//         document.getElementById('btn_cropper_huy').onclick = function () {
//             cropperInstance.destroy();
//             modalBox.remove();
//             URL.revokeObjectURL(objectURL);
//             resolve(null);
//         };

//         document.getElementById('btn_cropper_luu').onclick = function () {
//             const kieuChon = document.getElementById('select_chat_luong_anh_popup').value;
//             let maxW = 1920, maxH = 1920, chatLuongJpeg = 0.8;

//             if (kieuChon === 'ORIGINAL') {
//                 maxW = 10000; maxH = 10000; chatLuongJpeg = 0.92;
//             } else if (kieuChon === '2K') {
//                 maxW = 2560; maxH = 2560; chatLuongJpeg = 0.85;
//             } else if (kieuChon === 'FULLHD') {
//                 maxW = 1920; maxH = 1920; chatLuongJpeg = 0.8;
//             } else if (kieuChon === 'HD') {
//                 maxW = 1280; maxH = 1280; chatLuongJpeg = 0.7;
//             }

//             const canvas = cropperInstance.getCroppedCanvas({
//                 maxWidth: maxW,
//                 maxHeight: maxH,
//                 imageSmoothingEnabled: true,
//                 imageSmoothingQuality: 'high'
//             });

//             canvas.toBlob((blob) => {
//                 cropperInstance.destroy();
//                 modalBox.remove();
//                 URL.revokeObjectURL(objectURL);
//                 resolve(blob);
//             }, 'image/jpeg', chatLuongJpeg);
//         };
//     });
// };


// =====================================================================
// HÀM HỖ TRỢ: BẬT MODAL XEM TRƯỚC - NÉN ẢNH (CHỈ BẬT CẮT KHI CẦN THIẾT)
// =====================================================================
window.ham_22_mo_modal_cat_nen_anh_cuc_nhanh = async function (fileImage) {
    // 1. Tải thư viện CropperJS sẵn sàng dưới nền
    if (typeof window.Cropper === 'undefined') {
        Swal.fire({ title: 'Đang tải bộ công cụ ảnh...', didOpen: () => Swal.showLoading() });
        await new Promise((resolve) => {
            const link = document.createElement('link'); link.rel = 'stylesheet'; link.href = 'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.css'; document.head.appendChild(link);
            const script = document.createElement('script'); script.src = 'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.js'; script.onload = resolve; document.head.appendChild(script);
        });
        Swal.close();
    }

    return new Promise(async (resolve) => {
        let objectURL = URL.createObjectURL(fileImage);

        let modalBox = document.createElement('div');
        modalBox.style.cssText = 'position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.92); display:flex; flex-direction:column; z-index:9999999; overflow:hidden;';

        modalBox.innerHTML = `
            <!-- THANH CÔNG CỤ PHÍA TRÊN -->
            <div style="flex: 0 0 65px; background:#222; padding:0 12px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #444; z-index:10; flex-wrap:wrap; gap:8px;">
                <div style="display:flex; align-items:center; gap:6px;">
                    <span style="color:#ffc107; font-weight:bold; font-size:12px;">📐 Cỡ:</span>
                    <select id="select_chat_luong_anh_popup" style="padding:5px 6px; border-radius:4px; background:#fff; color:#333; font-weight:bold; font-size:11px; border:1px solid #ccc; outline:none; cursor:pointer;">
                        <!-- 🌟 Đã chuyển thuộc tính 'selected' lên mức độ Gốc -->
                        <option value="ORIGINAL" selected>✨ Gốc</option>
                        <option value="2K">🖥️ 2K</option>
                        <option value="FULLHD">💻 Full HD</option>
                        <option value="HD">📱 HD</option>
                    </select>

                    <!-- CỤM NÚT ZOOM (Sẽ chỉ hiện khi bật chế độ cắt) -->
                    <div id="vung_nut_zoom" style="display:none; gap:3px; margin-left:5px;">
                        <button id="btn_zoom_out" style="background:#444; color:white; border:none; padding:5px 8px; border-radius:4px; font-weight:bold; cursor:pointer; font-size:12px;" title="Thu nhỏ ảnh">🔍-</button>
                        <button id="btn_zoom_in" style="background:#444; color:white; border:none; padding:5px 8px; border-radius:4px; font-weight:bold; cursor:pointer; font-size:12px;" title="Phóng to ảnh">🔍+</button>
                        <button id="btn_zoom_reset" style="background:#444; color:white; border:none; padding:5px 8px; border-radius:4px; font-weight:bold; cursor:pointer; font-size:11px;" title="Đặt lại kích thước">🔄</button>
                    </div>
                </div>

                <div style="display:flex; gap:6px;">
                    <button id="btn_bat_cat_anh" style="background:#17a2b8; color:white; border:none; padding:6px 14px; border-radius:6px; font-weight:bold; cursor:pointer; font-size:12px; box-shadow:0 2px 4px rgba(0,0,0,0.2);">✂️ Bật chế độ cắt</button>
                    <button id="btn_cropper_luu" style="background:#28a745; color:white; border:none; padding:6px 14px; border-radius:6px; font-weight:bold; cursor:pointer; font-size:12px; box-shadow:0 2px 4px rgba(0,0,0,0.2);">🚀 Tải lên luôn</button>
                    <button id="btn_cropper_huy" style="background:#6c757d; color:white; border:none; padding:6px 14px; border-radius:6px; font-weight:bold; cursor:pointer; font-size:12px; box-shadow:0 2px 4px rgba(0,0,0,0.2);">✖ Hủy</button>
                </div>
            </div>

            <!-- VÙNG CHỨA ẢNH (MẶC ĐỊNH CHỈ LÀ XEM TRƯỚC) -->
            <div style="flex: 1; position:relative; width:100%; height:calc(100vh - 65px); background:#111; display:flex; align-items:center; justify-content:center; overflow:hidden;">
                <img id="img_cropper_target_popup" src="${objectURL}" style="max-width:100%; max-height:100%; display:block; object-fit:contain;">
            </div>
        `;
        document.body.appendChild(modalBox);

        const targetImg = document.getElementById('img_cropper_target_popup');
        let cropperInstance = null; // Biến kiểm tra xem đã bật công cụ cắt chưa

        // 🌟 BẬT CHẾ ĐỘ CẮT KHI NGƯỜI DÙNG CHỦ ĐỘNG BẤM
        document.getElementById('btn_bat_cat_anh').onclick = function () {
            if (cropperInstance) return;

            // Ẩn nút bật cắt, hiện bộ công cụ zoom
            this.style.display = 'none';
            document.getElementById('vung_nut_zoom').style.display = 'flex';
            document.getElementById('btn_cropper_luu').innerHTML = "💾 Lưu & Tải lên";

            cropperInstance = new window.Cropper(targetImg, {
                viewMode: 0,
                dragMode: 'move',
                autoCropArea: 0.7,
                restore: false,
                guides: true,
                center: true,
                highlight: false,
                cropBoxMovable: true,
                cropBoxResizable: true,
                toggleDragModeOnDblclick: true,
                zoomOnWheel: true,
                zoomOnTouch: true,
                wheelZoomRatio: 0.1,
                minContainerWidth: 200,
                minContainerHeight: 200,
                responsive: true
            });

            // Gắn sự kiện zoom
            document.getElementById('btn_zoom_out').onclick = () => cropperInstance.zoom(-0.1);
            document.getElementById('btn_zoom_in').onclick = () => cropperInstance.zoom(0.1);
            document.getElementById('btn_zoom_reset').onclick = () => cropperInstance.reset();
        };

        // 🌟 NÚT HỦY BỎ
        document.getElementById('btn_cropper_huy').onclick = function () {
            if (cropperInstance) cropperInstance.destroy();
            modalBox.remove();
            URL.revokeObjectURL(objectURL);
            resolve(null);
        };

        // 🌟 NÚT XỬ LÝ LƯU (TỰ NHẬN DIỆN CÓ CẮT HAY CHỈ NÉN)
        document.getElementById('btn_cropper_luu').onclick = function () {
            this.innerHTML = "⏳ Đang xử lý...";
            this.disabled = true;

            const kieuChon = document.getElementById('select_chat_luong_anh_popup').value;
            let maxW = 1920, maxH = 1920, chatLuongJpeg = 0.8;

            if (kieuChon === 'ORIGINAL') { maxW = 10000; maxH = 10000; chatLuongJpeg = 1.0; } // Đặt chất lượng 1.0 (100%) nếu có cắt
            else if (kieuChon === '2K') { maxW = 2560; maxH = 2560; chatLuongJpeg = 0.85; }
            else if (kieuChon === 'FULLHD') { maxW = 1920; maxH = 1920; chatLuongJpeg = 0.8; }
            else if (kieuChon === 'HD') { maxW = 1280; maxH = 1280; chatLuongJpeg = 0.7; }

            // TRƯỜNG HỢP 1: NẾU ĐÃ BẬT CÔNG CỤ CẮT (Buộc phải qua Canvas để lấy phần ảnh đã cắt)
            if (cropperInstance) {
                const canvas = cropperInstance.getCroppedCanvas({
                    maxWidth: maxW,
                    maxHeight: maxH,
                    imageSmoothingEnabled: true,
                    imageSmoothingQuality: 'high'
                });

                canvas.toBlob((blob) => {
                    cropperInstance.destroy();
                    modalBox.remove();
                    URL.revokeObjectURL(objectURL);
                    resolve(blob);
                }, 'image/jpeg', chatLuongJpeg);
            }

            // TRƯỜNG HỢP 2: KHÔNG CẮT, CHỈ MUỐN TẢI LÊN LUÔN
            else {
                // 🌟 NẾU CHỌN GỐC VÀ KHÔNG CẮT: Bỏ qua hoàn toàn Canvas, trả thẳng file nguyên bản 100%
                if (kieuChon === 'ORIGINAL') {
                    modalBox.remove();
                    URL.revokeObjectURL(objectURL);
                    resolve(fileImage); // Trả về tệp tin gốc không qua nén
                    return;
                }

                // 🌟 NẾU CHỌN FULL HD, 2K, HD: Mới bắt đầu đưa vào Canvas để nén giảm dung lượng
                let imgTemp = new Image();
                imgTemp.onload = function () {
                    let w = imgTemp.width;
                    let h = imgTemp.height;

                    if (w > maxW || h > maxH) {
                        let ratio = Math.min(maxW / w, maxH / h);
                        w = Math.round(w * ratio);
                        h = Math.round(h * ratio);
                    }

                    let canvas = document.createElement('canvas');
                    canvas.width = w;
                    canvas.height = h;
                    let ctx = canvas.getContext('2d');
                    ctx.imageSmoothingEnabled = true;
                    ctx.imageSmoothingQuality = 'high';

                    ctx.drawImage(imgTemp, 0, 0, w, h);

                    canvas.toBlob((blob) => {
                        modalBox.remove();
                        URL.revokeObjectURL(objectURL);
                        resolve(blob);
                    }, 'image/jpeg', chatLuongJpeg);
                };
                imgTemp.src = objectURL;
            }
        };
    });
};




// =====================================================================
// 1. XÓA FILE LẺ BÊN TRONG THÀNH PHẦN (CÓ XÓA DRIVE)
// =====================================================================
window.ham_22_20_xoa_file = async function (idDanhMuc, idMucCon, idThanhPhan, fileIndex) {
    if (!confirm("⚠️ Chắc chắn muốn xóa tệp này?\nTệp sẽ bị xóa khỏi hệ thống và đưa vào Thùng rác Drive!")) return;
    try {
        const tabData = window.qlhs_DanhSachDanhMuc.find(t => t.id === idDanhMuc);
        let mangMucCon = typeof tabData.du_lieu_json === 'string' ? JSON.parse(tabData.du_lieu_json || '[]') : tabData.du_lieu_json;
        let mucCon = mangMucCon.find(m => m.idMucCon === idMucCon);
        let thanhPhan = mucCon.mangThanhPhan.find(tp => tp.idThanhPhan === idThanhPhan);

        let fileCanXoa = thanhPhan.duLieu.danhSachFile[fileIndex];

        // 🌟 BẮN TÍN HIỆU XÓA FILE TRÊN DRIVE
        let fileId = window.ham_22_extract_drive_id(fileCanXoa.url);
        if (fileId) {
            fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
                method: "POST",
                body: JSON.stringify({ action: "delete_ho_so_lop", typeDelete: "DELETE_FILE", fileId: fileId })
            }).catch(e => console.log("Lỗi xóa file trên Drive"));
        }

        thanhPhan.duLieu.danhSachFile.splice(fileIndex, 1);
        await _supabase.from('ho_so_danh_muc_lop').update({ du_lieu_json: mangMucCon }).eq('id', idDanhMuc);
        tabData.du_lieu_json = mangMucCon; window.ham_22_16_mo_muc_con(idDanhMuc, idMucCon);
    } catch (e) { alert("❌ Lỗi: " + e.message); }
};



// =====================================================================
// 2. XÓA NGUYÊN KHUNG THÀNH PHẦN (QUÉT VÀ XÓA TOÀN BỘ FILE DRIVE BÊN TRONG)
// =====================================================================
window.ham_22_22_xoa_thanh_phan = async function (idDanhMuc, idMucCon, idThanhPhan) {
    try {
        const tabData = window.qlhs_DanhSachDanhMuc.find(t => t.id === idDanhMuc);
        let mangMucCon = typeof tabData.du_lieu_json === 'string' ? JSON.parse(tabData.du_lieu_json || '[]') : tabData.du_lieu_json;
        let mucCon = mangMucCon.find(m => m.idMucCon === idMucCon);
        let thanhPhan = mucCon.mangThanhPhan.find(tp => tp.idThanhPhan === idThanhPhan);

        // 🌟 QUÉT QUA TẤT CẢ FILE ĐANG CÓ VÀ XÓA SẠCH TRÊN DRIVE
        if (thanhPhan.duLieu && thanhPhan.duLieu.danhSachFile && thanhPhan.duLieu.danhSachFile.length > 0) {
            thanhPhan.duLieu.danhSachFile.forEach(f => {
                let fileId = window.ham_22_extract_drive_id(f.url);
                if (fileId) {
                    fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
                        method: "POST", body: JSON.stringify({ action: "delete_ho_so_lop", typeDelete: "DELETE_FILE", fileId: fileId })
                    });
                }
            });
        }

        mucCon.mangThanhPhan = mucCon.mangThanhPhan.filter(tp => tp.idThanhPhan !== idThanhPhan);
        await _supabase.from('ho_so_danh_muc_lop').update({ du_lieu_json: mangMucCon }).eq('id', idDanhMuc);
        tabData.du_lieu_json = mangMucCon; window.ham_22_16_mo_muc_con(idDanhMuc, idMucCon);
    } catch (e) { alert("❌ Lỗi: " + e.message); }
};




// =====================================================================
// HÀM 22.21: LƯU NỘI DUNG WORD / EXCEL
// =====================================================================
window.ham_22_21_luu_noi_dung_thanh_phan = async function (idDanhMuc, idMucCon, idThanhPhan, kieu) {
    let editorId = (kieu === 'WORD') ? `word-editor-${idThanhPhan}` : `excel-editor-${idThanhPhan}`;
    let editorElem = document.getElementById(editorId);
    if (!editorElem) return;

    let htmlData = editorElem.innerHTML;

    try {
        const tabData = window.qlhs_DanhSachDanhMuc.find(t => t.id === idDanhMuc);
        let mangMucCon = typeof tabData.du_lieu_json === 'string' ? JSON.parse(tabData.du_lieu_json || '[]') : tabData.du_lieu_json;
        let mucCon = mangMucCon.find(m => m.idMucCon === idMucCon);
        let thanhPhan = mucCon.mangThanhPhan.find(tp => tp.idThanhPhan === idThanhPhan);

        if (kieu === 'WORD') thanhPhan.duLieu.htmlContent = htmlData;
        if (kieu === 'EXCEL') thanhPhan.duLieu.htmlTable = htmlData;

        const { error } = await _supabase.from('ho_so_danh_muc_lop').update({ du_lieu_json: mangMucCon }).eq('id', idDanhMuc);
        if (error) throw error;

        tabData.du_lieu_json = mangMucCon;
        alert("✅ Đã lưu dữ liệu thành công!");
    } catch (e) { alert("❌ Lỗi: " + e.message); }
};

// =====================================================================
// BỘ 5 HÀM MỚI: QUẢN LÝ SỬA TÊN & XÓA CÁC CẤP ĐỘ
// =====================================================================

// =====================================================================
// HÀM 22.23: SỬA TÊN MỤC LỚN (ĐỒNG BỘ ĐỔI TÊN FOLDER TRÊN DRIVE)
// =====================================================================
window.ham_22_23_sua_ten_danh_muc = async function (idDanhMuc) {
    const tabData = window.qlhs_DanhSachDanhMuc.find(t => t.id === idDanhMuc);
    let tenCu = tabData.ten_danh_muc;
    let tenMoi = prompt("✏️ Nhập tên mới cho Hồ sơ:", tenCu);
    if (!tenMoi || tenMoi.trim() === '' || tenMoi === tenCu) return;
    tenMoi = tenMoi.trim();

    try {
        const { error } = await _supabase.from('ho_so_danh_muc_lop').update({ ten_danh_muc: tenMoi }).eq('id', idDanhMuc);
        if (error) throw error;

        tabData.ten_danh_muc = tenMoi;
        window.ham_22_3_ve_thanh_tabs();
        window.ham_22_6_chon_tab(idDanhMuc);

        // 🌟 Đồng bộ tên Mục lớn trên Drive
        let tenCuChuan = window.taoTenAnToan ? window.taoTenAnToan(tenCu, 40) : tenCu.replace(/[\\/:*?"<>| ]/g, "_");
        let tenMoiChuan = window.taoTenAnToan ? window.taoTenAnToan(tenMoi, 40) : tenMoi.replace(/[\\/:*?"<>| ]/g, "_");

        fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
            method: "POST",
            body: JSON.stringify({ action: "rename_folder_ho_so_lop", maLop: window.qlhs_MaLopHienTai, loaiDoiTen: "DANH_MUC", tenDanhMucCu: tenCuChuan, tenDanhMucMoi: tenMoiChuan })
        }).catch(e => console.log("Lỗi đồng bộ Drive."));

    } catch (e) { alert("❌ Lỗi đổi tên: " + e.message); }
};

// =====================================================================
// 4. XÓA TAB HỒ SƠ LỚN (ĐÁNH SẬP CẢ CÂY THƯ MỤC TRÊN DRIVE)
// =====================================================================
window.ham_22_24_xoa_danh_muc = async function (idDanhMuc) {
    const tabData = window.qlhs_DanhSachDanhMuc.find(t => t.id === idDanhMuc);
    if (!confirm(`⛔ CẢNH BÁO TỐI CAO:\nThầy/Cô đang yêu cầu xóa toàn bộ Hồ sơ [ ${tabData.ten_danh_muc} ].\nTất cả Chuyên mục con, Thành phần và MỌI FILE TRÊN DRIVE sẽ bị dọn sạch!\n\nTiếp tục xóa?`)) return;

    try {
        // 🌟 ĐỒNG BỘ ĐƯA THƯ MỤC LỚN NÀY TRÊN DRIVE VÀO THÙNG RÁC
        let tenDanhMucChuan = window.taoTenAnToan ? window.taoTenAnToan(tabData.ten_danh_muc, 40) : tabData.ten_danh_muc.replace(/[\\/:*?"<>| ]/g, "_");

        fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
            method: "POST",
            body: JSON.stringify({ action: "delete_ho_so_lop", typeDelete: "DELETE_DANH_MUC", maLop: window.qlhs_MaLopHienTai, tenDanhMuc: tenDanhMucChuan })
        }).catch(e => console.log("Lỗi xóa thư mục lớn Drive."));

        const { error } = await _supabase.from('ho_so_danh_muc_lop').delete().eq('id', idDanhMuc);
        if (error) throw error;

        window.qlhs_DanhSachDanhMuc = window.qlhs_DanhSachDanhMuc.filter(t => t.id !== idDanhMuc);
        window.qlhs_TabDangChon = null;
        window.ham_22_3_ve_thanh_tabs();
    } catch (e) { alert("❌ Lỗi xóa hồ sơ: " + e.message); }
};
// =====================================================================
// HÀM 22.25: SỬA TÊN CHUYÊN MỤC CON (ĐỒNG BỘ ĐỔI TÊN FOLDER TRÊN DRIVE)
// =====================================================================
window.ham_22_25_sua_ten_muc_con = async function (idDanhMuc, idMucCon, isTrongChiTiet = false) {
    const tabData = window.qlhs_DanhSachDanhMuc.find(t => t.id === idDanhMuc);
    let mangMucCon = typeof tabData.du_lieu_json === 'string' ? JSON.parse(tabData.du_lieu_json || '[]') : tabData.du_lieu_json;
    let mucCon = mangMucCon.find(m => m.idMucCon === idMucCon);

    let tenCu = mucCon.tenMucCon;
    let tenMoi = prompt("✏️ Nhập tên mới cho Chuyên mục con:", tenCu);
    if (!tenMoi || tenMoi.trim() === '' || tenMoi === tenCu) return;
    tenMoi = tenMoi.trim();

    try {
        mucCon.tenMucCon = tenMoi;
        const { error } = await _supabase.from('ho_so_danh_muc_lop').update({ du_lieu_json: mangMucCon }).eq('id', idDanhMuc);
        if (error) throw error;
        tabData.du_lieu_json = mangMucCon;

        if (isTrongChiTiet) window.ham_22_16_mo_muc_con(idDanhMuc, idMucCon);
        else window.ham_22_6_chon_tab(idDanhMuc);

        // 🌟 Đồng bộ tên Mục con trên Drive
        let tenDanhMucChuan = window.taoTenAnToan ? window.taoTenAnToan(tabData.ten_danh_muc, 40) : tabData.ten_danh_muc.replace(/[\\/:*?"<>| ]/g, "_");
        let tenCuChuan = window.taoTenAnToan ? window.taoTenAnToan(tenCu, 40) : tenCu.replace(/[\\/:*?"<>| ]/g, "_");
        let tenMoiChuan = window.taoTenAnToan ? window.taoTenAnToan(tenMoi, 40) : tenMoi.replace(/[\\/:*?"<>| ]/g, "_");

        fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
            method: "POST",
            body: JSON.stringify({ action: "rename_folder_ho_so_lop", maLop: window.qlhs_MaLopHienTai, loaiDoiTen: "MUC_CON", tenDanhMucMoi: tenDanhMucChuan, tenMucConCu: tenCuChuan, tenMucConMoi: tenMoiChuan })
        }).catch(e => console.log("Lỗi đồng bộ Drive."));

    } catch (e) { alert("❌ Lỗi đổi tên chuyên mục: " + e.message); }
};
// =====================================================================
// 3. XÓA CHUYÊN MỤC CON (XÓA CẢ THƯ MỤC CHỨA NÓ TRÊN DRIVE)
// =====================================================================
window.ham_22_26_xoa_muc_con = async function (idDanhMuc, idMucCon) {
    const tabData = window.qlhs_DanhSachDanhMuc.find(t => t.id === idDanhMuc);
    let mangMucCon = typeof tabData.du_lieu_json === 'string' ? JSON.parse(tabData.du_lieu_json || '[]') : tabData.du_lieu_json;
    let mucCon = mangMucCon.find(m => m.idMucCon === idMucCon);

    if (!confirm(`⚠️ Xóa vĩnh viễn chuyên mục [ ${mucCon.tenMucCon || 'Lỗi'} ]?\nToàn bộ Thành phần và FILE TRÊN DRIVE chứa bên trong sẽ bị đưa vào Thùng rác!`)) return;

    try {
        if (idMucCon !== 'undefined') {
            // 🌟 ĐỒNG BỘ ĐƯA THƯ MỤC NÀY TRÊN DRIVE VÀO THÙNG RÁC
            let tenDanhMucChuan = window.taoTenAnToan ? window.taoTenAnToan(tabData.ten_danh_muc, 40) : tabData.ten_danh_muc.replace(/[\\/:*?"<>| ]/g, "_");
            let tenMucConChuan = window.taoTenAnToan ? window.taoTenAnToan(mucCon.tenMucCon, 40) : mucCon.tenMucCon.replace(/[\\/:*?"<>| ]/g, "_");

            fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
                method: "POST",
                body: JSON.stringify({ action: "delete_ho_so_lop", typeDelete: "DELETE_MUC_CON", maLop: window.qlhs_MaLopHienTai, tenDanhMuc: tenDanhMucChuan, tenMucCon: tenMucConChuan })
            }).catch(e => console.log("Lỗi xóa thư mục con Drive."));

            mangMucCon = mangMucCon.filter(m => m.idMucCon !== idMucCon);
        } else {
            mangMucCon = mangMucCon.filter(m => m.idMucCon && m.idMucCon !== 'undefined');
        }

        const { error } = await _supabase.from('ho_so_danh_muc_lop').update({ du_lieu_json: mangMucCon }).eq('id', idDanhMuc);
        if (error) throw error;
        tabData.du_lieu_json = mangMucCon;
        window.ham_22_6_chon_tab(idDanhMuc);
    } catch (e) { alert("❌ Lỗi xóa chuyên mục: " + e.message); }
};

// 5. Sửa Tên Thành phần nhỏ
window.ham_22_27_sua_ten_thanh_phan = async function (idDanhMuc, idMucCon, idThanhPhan) {
    const tabData = window.qlhs_DanhSachDanhMuc.find(t => t.id === idDanhMuc);
    let mangMucCon = typeof tabData.du_lieu_json === 'string' ? JSON.parse(tabData.du_lieu_json || '[]') : tabData.du_lieu_json;
    let mucCon = mangMucCon.find(m => m.idMucCon === idMucCon);
    let tp = mucCon.mangThanhPhan.find(t => t.idThanhPhan === idThanhPhan);

    let tenMoi = prompt("✏️ Nhập tên mới cho Thành phần:", tp.tenThanhPhan);
    if (!tenMoi || tenMoi.trim() === '' || tenMoi === tp.tenThanhPhan) return;

    try {
        tp.tenThanhPhan = tenMoi.trim();
        const { error } = await _supabase.from('ho_so_danh_muc_lop').update({ du_lieu_json: mangMucCon }).eq('id', idDanhMuc);
        if (error) throw error;
        tabData.du_lieu_json = mangMucCon;
        window.ham_22_16_mo_muc_con(idDanhMuc, idMucCon);
    } catch (e) { alert("❌ Lỗi đổi tên thành phần: " + e.message); }
};


// =====================================================================
// HÀM HỖ TRỢ: BÓC TÁCH ID DRIVE TỪ ĐƯỜNG LINK
// =====================================================================
window.ham_22_extract_drive_id = function (url) {
    if (!url) return null;
    let m = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/) || url.match(/\/open\?id=([a-zA-Z0-9_-]+)/) || url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    return m ? m[1] : null;
};


// =====================================================================
// HÀM HỖ TRỢ: BẬT MODAL XEM ẢNH TOÀN MÀN HÌNH (LIGHTBOX)
// =====================================================================
window.ham_22_xem_anh_full_screen = function (url) {
    let modalBox = document.createElement('div');
    modalBox.style.cssText = 'position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.95); display:flex; flex-direction:column; z-index:9999999; animation:fadeIn 0.2s;';

    // Nút đóng ở góc trên bên phải
    modalBox.innerHTML = `
        <div style="position:absolute; top:20px; right:20px; z-index:10;">
            <button onclick="this.parentElement.parentElement.remove()" style="background:#dc3545; color:white; border:none; border-radius:50%; width:40px; height:40px; font-size:20px; font-weight:bold; cursor:pointer; box-shadow:0 2px 10px rgba(0,0,0,0.5);" title="Đóng">✖</button>
        </div>
        <!-- Vùng hiển thị ảnh gốc -->
        <div style="flex:1; width:100%; height:100%; display:flex; align-items:center; justify-content:center; padding:20px; box-sizing:border-box;" onclick="this.parentElement.remove()">
            <img src="${url}" onclick="event.stopPropagation()" style="max-width:100%; max-height:100%; object-fit:contain; border-radius:8px; box-shadow:0 10px 30px rgba(0,0,0,0.5);">
        </div>
    `;
    document.body.appendChild(modalBox);
};


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


// =====================================================================
// HÀM 22.6: CHỌN TAB LỚN -> HIỂN THỊ DANH SÁCH MỤC CON (CÓ ĐÁNH SỐ THỨ TỰ)
// =====================================================================
window.ham_22_6_chon_tab = function (idDanhMuc) {
    window.qlhs_TabDangChon = idDanhMuc; window.ham_22_3_ve_thanh_tabs();
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
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px dashed #ccc; padding-bottom:15px; margin-bottom:20px;">
            <div>
                <h3 style="margin:0; color:#0056b3; display:flex; align-items:center; gap:10px;">
                    📁 ${tabData.ten_danh_muc} ${htmlThoiGianTab}
                    <button onclick="window.ham_22_23_sua_ten_danh_muc('${tabData.id}')" style="background:none; border:none; cursor:pointer; font-size:14px; margin-left:10px;" title="Sửa tên hồ sơ lớn">✏️</button>
                    <button onclick="window.ham_22_24_xoa_danh_muc('${tabData.id}')" style="background:none; border:none; cursor:pointer; font-size:14px; color:#dc3545;" title="Xóa toàn bộ hồ sơ này">🗑️</button>
                </h3>
                <div style="font-size:12px; color:#6c757d; margin-top:5px;">Vui lòng chọn hoặc tạo các Chuyên mục con bên dưới.</div>
            </div>
            <button onclick="window.ham_22_14_mo_modal_them_muc_con('${tabData.id}')" style="padding:8px 15px; background:#17a2b8; color:#fff; border:none; border-radius:4px; font-size:13px; font-weight:bold; cursor:pointer; box-shadow: 0 2px 4px rgba(23,162,184,0.3);">
                ➕ Thêm Chuyên Mục Con
            </button>
        </div>
    `;

    if (mangMucCon.length === 0) {
        vungNoiDung.innerHTML = htmlHeader + `<div style="text-align:center; padding:50px;"><div style="font-size:40px; margin-bottom:15px;">📂</div><div style="font-size:16px; color:#6c757d; font-weight:bold;">Chưa có Chuyên mục con nào!</div></div>`;
        return;
    }

    let gridHtml = `<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 15px;">`;
    mangMucCon.forEach((mc, idx) => {
        let stt = idx + 1; // 🌟 Tạo Số thứ tự
        let soThanhPhan = mc.mangThanhPhan ? mc.mangThanhPhan.length : 0;
        let safeId = mc.idMucCon || 'undefined';
        let safeName = mc.tenMucCon || mc.tenGiaiDoan || 'Dữ liệu cũ (Bị lỗi)';
        let isLoi = !mc.idMucCon;

        let tgTao = mc.thoiGianTao ? new Date(mc.thoiGianTao).toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' }) : '';
        let htmlTgTao = tgTao ? `<div style="font-size:11px; color:#adb5bd; margin-top:5px; font-style:italic;">🕒 Tạo lúc: ${tgTao}</div>` : '';

        gridHtml += `
            <div onclick="${isLoi ? '' : `window.ham_22_16_mo_muc_con('${tabData.id}', '${safeId}')`}" style="background:#fff; border:1px solid ${isLoi ? '#f5c6cb' : '#ced4da'}; border-radius:8px; padding:20px; cursor:${isLoi ? 'default' : 'pointer'}; position:relative; box-shadow:0 2px 4px rgba(0,0,0,0.05); transition:0.2s; display:flex; align-items:flex-start; gap:15px;" ${!isLoi ? `onmouseover="this.style.boxShadow='0 6px 12px rgba(0,0,0,0.1)'; this.style.borderColor='#007bff';" onmouseout="this.style.boxShadow='0 2px 4px rgba(0,0,0,0.05)'; this.style.borderColor='#ced4da';"` : ''}>
                <div style="font-size:35px;">${isLoi ? '⚠️' : '📂'}</div>
                <div style="flex:1;">
                    <h4 style="margin:0 0 5px 0; color:${isLoi ? '#dc3545' : '#333'}; font-size:16px; padding-right: 40px;">
                        <span style="color:#007bff; margin-right:5px; font-weight:900;">${stt}.</span>${safeName}
                    </h4>
                    <div style="font-size:12px; color:#6c757d; background:#e9ecef; display:inline-block; padding:3px 8px; border-radius:12px;">Chứa: ${soThanhPhan} Thành phần</div>
                    ${htmlTgTao}
                </div>
                
                <div style="position:absolute; top:10px; right:10px; display:flex; gap:5px;">
                    ${!isLoi ? `<button onclick="event.stopPropagation(); window.ham_22_25_sua_ten_muc_con('${tabData.id}', '${safeId}')" style="background:none; border:none; cursor:pointer; font-size:13px;" title="Sửa tên chuyên mục">✏️</button>` : ''}
                    <button onclick="event.stopPropagation(); window.ham_22_26_xoa_muc_con('${tabData.id}', '${safeId}')" style="background:none; border:none; cursor:pointer; font-size:13px; color:#dc3545;" title="Xóa chuyên mục này">🗑️</button>
                </div>
            </div>
        `;
    });
    gridHtml += `</div>`;
    vungNoiDung.innerHTML = htmlHeader + gridHtml;
};

// =====================================================================
// HÀM 22.14 & 22.15: TẠO MỤC CON MỚI
// =====================================================================
window.ham_22_14_mo_modal_them_muc_con = function (idDanhMuc) {
    let modal = document.getElementById('qlhs-modal-them-mc'); if (modal) modal.remove();
    let idMoi = 'MC_' + new Date().getTime() + '_' + Math.floor(Math.random() * 1000);

    modal = document.createElement('div'); modal.id = 'qlhs-modal-them-mc';
    modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); display:flex; align-items:center; justify-content:center; z-index:999999; backdrop-filter: blur(2px); animation: fadeIn 0.2s;';
    modal.innerHTML = `
        <div style="background:#fff; width:450px; padding:25px; border-radius:12px; box-shadow:0 10px 30px rgba(0,0,0,0.4);">
            <h3 style="margin-top:0; color:#17a2b8; border-bottom:2px solid #b8daff; padding-bottom:10px;">➕ TẠO CHUYÊN MỤC CON</h3>
            <div style="margin-bottom:20px;">
                <label style="font-weight:bold; font-size:13px; color:#495057;">Tên chuyên mục con:</label>
                <input type="text" id="qlhs-mc-ten" placeholder="VD: Sơ đồ lớp, Bảng điểm HK1, Hình ảnh sự kiện..." style="width:100%; padding:10px; border:2px solid #17a2b8; border-radius:6px; margin-top:5px; box-sizing:border-box; font-weight:bold; outline:none;">
            </div>
            <div style="display:flex; justify-content:flex-end; gap:10px; border-top:1px solid #eee; padding-top:15px;">
                <button onclick="document.getElementById('qlhs-modal-them-mc').remove()" style="padding:10px 20px; background:#6c757d; color:white; border:none; border-radius:6px; cursor:pointer; font-weight:bold;">Hủy bỏ</button>
                <button onclick="window.ham_22_15_luu_muc_con('${idDanhMuc}', '${idMoi}')" style="padding:10px 25px; background:#17a2b8; color:white; border:none; border-radius:6px; cursor:pointer; font-weight:bold;">💾 Lưu Mục Con</button>
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
// =====================================================================
// HÀM 22.16: MỞ CHI TIẾT MỘC MỤC CON VÀ RENDER CÁC THÀNH PHẦN (CÓ SẮP XẾP & ĐÁNH SỐ)
// =====================================================================
window.ham_22_16_mo_muc_con = function (idDanhMuc, idMucCon, kieuSort = 'TIME_ASC') {
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
                <select onchange="window.ham_22_16_mo_muc_con('${idDanhMuc}', '${idMucCon}', this.value)" style="padding:7px; border:1px solid #ced4da; border-radius:4px; outline:none; font-size:12px; color:#495057; background:#f8f9fa; cursor:pointer; font-weight:bold; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
                    <option value="TIME_ASC" ${kieuSort === 'TIME_ASC' ? 'selected' : ''}>🔽 Thời gian: Cũ nhất ➔ Mới nhất</option>
                    <option value="TIME_DESC" ${kieuSort === 'TIME_DESC' ? 'selected' : ''}>🔼 Thời gian: Mới nhất ➔ Cũ nhất</option>
                    <option value="TYPE_ASC" ${kieuSort === 'TYPE_ASC' ? 'selected' : ''}>🗂️ Phân loại: Tăng (A ➔ Z)</option>
                    <option value="TYPE_DESC" ${kieuSort === 'TYPE_DESC' ? 'selected' : ''}>🗂️ Phân loại: Giảm (Z ➔ A)</option>
                </select>
                <button onclick="window.ham_22_17_mo_modal_them_thanh_phan('${idDanhMuc}', '${idMucCon}')" style="padding:8px 15px; background:#28a745; color:#fff; border:none; border-radius:4px; font-size:13px; font-weight:bold; cursor:pointer; box-shadow: 0 2px 4px rgba(40,167,69,0.3);">
                    ➕ Thêm Thành Phần
                </button>
            </div>
        </div>
        <div id="qlhs-vung-render-thanh-phan" style="display:flex; flex-direction:column; gap:25px;"></div>
    `;
    vungNoiDung.innerHTML = htmlHeader;

    const vungChiTiet = document.getElementById('qlhs-vung-render-thanh-phan');
    let mangThanhPhan = mucCon.mangThanhPhan || [];

    if (mangThanhPhan.length === 0) {
        vungChiTiet.innerHTML = `
            <div style="text-align:center; padding:50px;">
                <div style="font-size:40px; margin-bottom:15px;">🧩</div>
                <div style="font-size:16px; color:#6c757d; font-weight:bold;">Chuyên mục này chưa có Thành phần nào.</div>
                <div style="font-size:13px; color:#adb5bd; margin-top:5px;">Bấm "Thêm Thành Phần" ở góc trên để chèn Ảnh, File, Word hoặc Bảng Excel.</div>
            </div>`;
        return;
    }

    let sortedThanhPhan = [...mangThanhPhan];
    sortedThanhPhan.sort((a, b) => {
        let timeA = a.thoiGianTao ? new Date(a.thoiGianTao).getTime() : 0;
        let timeB = b.thoiGianTao ? new Date(b.thoiGianTao).getTime() : 0;
        let typeA = a.kieuThanhPhan || '';
        let typeB = b.kieuThanhPhan || '';

        if (kieuSort === 'TIME_DESC') return timeB - timeA;
        if (kieuSort === 'TIME_ASC') return timeA - timeB;
        if (kieuSort === 'TYPE_ASC') return typeA.localeCompare(typeB);
        if (kieuSort === 'TYPE_DESC') return typeB.localeCompare(typeA);
        return 0;
    });

    let htmlContent = '';
    sortedThanhPhan.forEach((tp, idx) => {
        let stt = idx + 1; // 🌟 Tạo Số thứ tự
        let tpUI = '';

        // --- 1. THÀNH PHẦN: ẢNH HOẶC FILE ---
        if (tp.kieuThanhPhan === 'IMAGE' || tp.kieuThanhPhan === 'FILE') {
            let dsFile = tp.duLieu.danhSachFile || [];
            let htmlFiles = '';

            if (dsFile.length === 0) {
                htmlFiles = `<div style="font-style:italic; color:#adb5bd; font-size:13px; padding:10px;">Chưa có tệp nào được tải lên.</div>`;
            } else {
                htmlFiles += `<div style="display:flex; gap:15px; flex-wrap:wrap;">`;
                dsFile.forEach((f, fIdx) => {
                    let isImg = f.name.toLowerCase().match(/\.(jpg|jpeg|png|gif|webp)$/i);
                    let preview = isImg ? f.url : '📄';
                    if (isImg && f.url.includes('drive.google.com')) {
                        const mD = f.url.match(/\/d\/([a-zA-Z0-9_-]+)/);
                        if (mD) preview = `https://drive.google.com/thumbnail?id=${mD[1]}&sz=w1000`;
                    }

                    let displayThumb = isImg
                        ? `<img src="${preview}" style="width:100%; height:auto; max-height:200px; object-fit:cover; border-radius:6px; border:1px solid #dee2e6;">`
                        : `<div style="width:150px; height:100px; display:flex; flex-direction:column; align-items:center; justify-content:center; background:#f1f3f4; border-radius:6px; border:1px solid #dee2e6;"><div style="font-size:30px; margin-bottom:5px;">${preview}</div><div style="font-size:11px; font-weight:bold; color:#495057; width:130px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="${f.name}">${f.name}</div></div>`;

                    htmlFiles += `
                        <div style="position:relative; animation:fadeIn 0.3s;">
                            <a href="${f.url}" target="_blank" style="text-decoration:none; display:block;">${displayThumb}</a>
                            <button onclick="window.ham_22_20_xoa_file('${idDanhMuc}', '${idMucCon}', '${tp.idThanhPhan}', ${fIdx})" style="position:absolute; top:-5px; right:-5px; background:#dc3545; color:#fff; border:none; border-radius:50%; width:22px; height:22px; font-size:11px; cursor:pointer; box-shadow:0 2px 4px rgba(0,0,0,0.3);">✖</button>
                        </div>
                    `;
                });
                htmlFiles += `</div>`;
            }

            tpUI = `
                <div style="margin-top:10px; background:#f8f9fa; padding:15px; border-radius:8px; border:1px dashed #ced4da;">
                    ${htmlFiles}
                    <div style="margin-top:15px; border-top:1px dashed #ccc; padding-top:10px;">
                        <button onclick="this.nextElementSibling.click()" style="padding:6px 12px; background:#007bff; color:#fff; border:none; border-radius:4px; font-size:12px; font-weight:bold; cursor:pointer;">☁️ Tải Tệp Lên</button>
                        <input type="file" multiple style="display:none;" onchange="window.ham_22_19_upload_file_vao_thanh_phan(this, '${idDanhMuc}', '${idMucCon}', '${tp.idThanhPhan}')">
                    </div>
                </div>
            `;
        }

        // --- 2. THÀNH PHẦN: VĂN BẢN WORD ---
        else if (tp.kieuThanhPhan === 'WORD') {
            let noiDung = tp.duLieu.htmlContent || '<i>Bấm vào đây để bắt đầu soạn thảo văn bản...</i>';
            tpUI = `
                <div style="margin-top:10px;">
                    <div id="word-editor-${tp.idThanhPhan}" contenteditable="true" style="min-height:100px; padding:15px; border:1px solid #ced4da; border-radius:6px; background:#fff; outline:none; font-family:inherit; line-height:1.6;" onfocus="if(this.innerHTML.includes('Bấm vào đây')) this.innerHTML='';">${noiDung}</div>
                    <div style="margin-top:8px; text-align:right;">
                        <button onclick="window.ham_22_21_luu_noi_dung_thanh_phan('${idDanhMuc}', '${idMucCon}', '${tp.idThanhPhan}', 'WORD')" style="padding:6px 15px; background:#28a745; color:#fff; border:none; border-radius:4px; font-size:12px; font-weight:bold; cursor:pointer;">💾 Lưu Văn Bản</button>
                    </div>
                </div>
            `;
        }

        // --- 3. THÀNH PHẦN: BẢNG EXCEL ---
        else if (tp.kieuThanhPhan === 'EXCEL') {
            let noiDung = tp.duLieu.htmlTable || `
                <table style="width:100%; border-collapse:collapse; min-width:400px;">
                    <thead><tr style="background:#e9ecef;"><th style="border:1px solid #ccc; padding:8px;">Cột 1</th><th style="border:1px solid #ccc; padding:8px;">Cột 2</th><th style="border:1px solid #ccc; padding:8px;">Cột 3</th></tr></thead>
                    <tbody><tr><td style="border:1px solid #ccc; padding:8px;">Dữ liệu</td><td style="border:1px solid #ccc; padding:8px;">Dữ liệu</td><td style="border:1px solid #ccc; padding:8px;">Dữ liệu</td></tr></tbody>
                </table>`;

            tpUI = `
                <div style="margin-top:10px;">
                    <div style="font-size:11px; color:#6c757d; margin-bottom:5px; font-style:italic;">*Mẹo: Thầy/Cô có thể copy bảng từ Word/Excel và Paste thẳng vào khung này.</div>
                    <div id="excel-editor-${tp.idThanhPhan}" contenteditable="true" style="width:100%; overflow-x:auto; padding:10px; border:1px solid #28a745; border-radius:6px; background:#fdfdfd; outline:none;">
                        ${noiDung}
                    </div>
                    <div style="margin-top:8px; text-align:right;">
                        <button onclick="window.ham_22_21_luu_noi_dung_thanh_phan('${idDanhMuc}', '${idMucCon}', '${tp.idThanhPhan}', 'EXCEL')" style="padding:6px 15px; background:#28a745; color:#fff; border:none; border-radius:4px; font-size:12px; font-weight:bold; cursor:pointer;">💾 Lưu Bảng Excel</button>
                    </div>
                </div>
            `;
        }

        let tgTaoTP = tp.thoiGianTao ? new Date(tp.thoiGianTao).toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' }) : '';
        let htmlTgTaoTP = tgTaoTP ? `<span style="font-size:12px; font-weight:normal; color:#adb5bd; margin-left:15px; font-style:italic;">🕒 ${tgTaoTP}</span>` : '';
        let iconTitle = tp.kieuThanhPhan === 'IMAGE' ? '🖼️' : (tp.kieuThanhPhan === 'FILE' ? '📎' : (tp.kieuThanhPhan === 'WORD' ? '📝' : '📊'));
        let mainColor = tp.kieuThanhPhan === 'EXCEL' ? '#28a745' : '#007bff'; // Đổi màu viền theo loại dữ liệu

        htmlContent += `
            <div style="background:#fff; border:1px solid #dee2e6; border-radius:8px; box-shadow:0 2px 5px rgba(0,0,0,0.02); padding:20px; position:relative;">
                <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid ${mainColor}; padding-bottom:8px; flex-wrap:wrap; gap:10px;">
                    <div style="display:flex; align-items:center; gap:10px;">
                        <h4 style="margin:0; font-size:15px; color:#333; display:flex; align-items:center; flex-wrap:wrap;">
                            <!-- 🌟 Vòng tròn chứa STT -->
                            <span style="background:${mainColor}; color:#fff; border-radius:50%; width:24px; height:24px; display:inline-flex; align-items:center; justify-content:center; font-size:13px; margin-right:8px; font-weight:bold; box-shadow: 0 1px 2px rgba(0,0,0,0.15);">${stt}</span>
                            ${iconTitle} ${tp.tenThanhPhan}
                            ${htmlTgTaoTP}
                        </h4>
                        <button onclick="window.ham_22_27_sua_ten_thanh_phan('${idDanhMuc}', '${idMucCon}', '${tp.idThanhPhan}')" style="background:none; border:none; cursor:pointer; font-size:13px; margin-left:5px;" title="Sửa tên thành phần">✏️</button>
                    </div>
                    <div style="display:flex; align-items:center; gap:8px;">
                        <button type="button" onclick="let c = document.getElementById('body-tp-${tp.idThanhPhan}'); if(c.style.display==='none'){c.style.display='block'; this.innerHTML='🔽 Thu gọn';}else{c.style.display='none'; this.innerHTML='👁️ Mở rộng';}" style="background: #f8f9fa; border: 1px solid #ccc; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: bold; color: #495057; transition: 0.2s;" onmouseover="this.style.background='#e9ecef'" onmouseout="this.style.background='#f8f9fa'">🔽 Thu gọn</button>
                        <button onclick="if(confirm('⚠️ Xóa thành phần này?')) window.ham_22_22_xoa_thanh_phan('${idDanhMuc}', '${idMucCon}', '${tp.idThanhPhan}')" style="background:none; border:none; color:#dc3545; cursor:pointer; font-size:14px; font-weight:bold;" title="Xóa thành phần">🗑️ Xóa</button>
                    </div>
                </div>
                <div id="body-tp-${tp.idThanhPhan}" style="display:block; animation: fadeIn 0.3s;">
                    ${tpUI}
                </div>
            </div>
        `;
    });

    vungChiTiet.innerHTML = htmlContent;
};
// =====================================================================
// HÀM 22.17 & 22.18: TẠO THÀNH PHẦN MỚI
// =====================================================================
window.ham_22_17_mo_modal_them_thanh_phan = function (idDanhMuc, idMucCon) {
    let modal = document.getElementById('qlhs-modal-them-tp'); if (modal) modal.remove();
    let idMoi = 'TP_' + new Date().getTime();

    modal = document.createElement('div'); modal.id = 'qlhs-modal-them-tp';
    modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); display:flex; align-items:center; justify-content:center; z-index:999999; backdrop-filter: blur(2px); animation: fadeIn 0.2s;';
    modal.innerHTML = `
        <div style="background:#fff; width:450px; padding:25px; border-radius:12px; box-shadow:0 10px 30px rgba(0,0,0,0.4);">
            <h3 style="margin-top:0; color:#28a745; border-bottom:2px solid #c3e6cb; padding-bottom:10px;">➕ TẠO THÀNH PHẦN CHỨA</h3>
            <div style="margin-bottom:15px;">
                <label style="font-weight:bold; font-size:13px; color:#495057;">Tên thành phần:</label>
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
                <button onclick="window.ham_22_18_luu_thanh_phan('${idDanhMuc}', '${idMucCon}', '${idMoi}')" style="padding:10px 25px; background:#28a745; color:white; border:none; border-radius:6px; cursor:pointer; font-weight:bold;">💾 Tạo Thành Phần</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal); document.getElementById('qlhs-tp-ten').focus();
};

// =====================================================================
// HÀM 22.18: LƯU THÀNH PHẦN (CÓ GHI NHẬN THỜI GIAN)
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

        // 🌟 THÊM TRƯỜNG thoiGianTao
        let thoiGianHienTai = new Date().toISOString();
        mucCon.mangThanhPhan.push({
            idThanhPhan: idThanhPhanMoi,
            tenThanhPhan: tenTP,
            kieuThanhPhan: kieuTP,
            duLieu: duLieuMacDinh,
            thoiGianTao: thoiGianHienTai
        });

        const { error } = await _supabase.from('ho_so_danh_muc_lop').update({ du_lieu_json: mangMucCon }).eq('id', idDanhMuc);
        if (error) throw error;

        document.getElementById('qlhs-modal-them-tp').remove();
        tabData.du_lieu_json = mangMucCon;
        window.ham_22_16_mo_muc_con(idDanhMuc, idMucCon);

    } catch (e) { alert("❌ Lỗi: " + e.message); }
};

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




// =====================================================================
// HÀM HỖ TRỢ: BẬT MODAL CẮT & NÉN ẢNH (CÓ CHỌN ĐỘ PHÂN GIẢI & ZOOM OUT THẢ GA)
// =====================================================================
window.ham_22_mo_modal_cat_nen_anh_cuc_nhanh = async function (fileImage) {
    // 1. Tải thư viện CropperJS nếu chưa có
    if (typeof window.Cropper === 'undefined') {
        Swal.fire({ title: 'Đang tải bộ công cụ cắt ảnh...', didOpen: () => Swal.showLoading() });
        await new Promise((resolve) => {
            const link = document.createElement('link'); link.rel = 'stylesheet'; link.href = 'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.css'; document.head.appendChild(link);
            const script = document.createElement('script'); script.src = 'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.js'; script.onload = resolve; document.head.appendChild(script);
        });
        Swal.close();
    }

    return new Promise(async (resolve) => {
        let objectURL = URL.createObjectURL(fileImage);

        let modalBox = document.createElement('div');
        modalBox.style.cssText = 'position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.9); display:flex; flex-direction:column; z-index:9999999; overflow:hidden;';

        modalBox.innerHTML = `
            <!-- THANH CÔNG CỤ CỐ ĐỊNH PHÍA TRÊN (GỒM CHỌN ĐỘ PHÂN GIẢI VÀ NÚT LƯU/HỦY) -->
            <div style="flex: 0 0 60px; background:#222; padding:0 15px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #444; z-index:10; flex-wrap:wrap; gap:10px;">
                <div style="display:flex; align-items:center; gap:8px;">
                    <span style="color:#ffc107; font-weight:bold; font-size:13px;">📐 Độ phân giải:</span>
                    <select id="select_chat_luong_anh_popup" style="padding:6px 10px; border-radius:4px; background:#fff; color:#333; font-weight:bold; font-size:12px; border:1px solid #ccc; outline:none; cursor:pointer;">
                        <option value="ORIGINAL">✨ Giữ nguyên bản (Gốc)</option>
                        <option value="2K">🖥️ Chuẩn 2K (Max 2560px)</option>
                        <option value="FULLHD" selected>💻 Chuẩn Full HD (Max 1920px)</option>
                        <option value="HD">📱 Chuẩn HD (Max 1280px)</option>
                    </select>
                </div>

                <div style="display:flex; gap:8px;">
                    <button id="btn_cropper_luu" style="background:#28a745; color:white; border:none; padding:7px 15px; border-radius:6px; font-weight:bold; cursor:pointer; box-shadow:0 2px 4px rgba(0,0,0,0.2);">💾 Lưu ảnh này</button>
                    <button id="btn_cropper_huy" style="background:#6c757d; color:white; border:none; padding:7px 15px; border-radius:6px; font-weight:bold; cursor:pointer; box-shadow:0 2px 4px rgba(0,0,0,0.2);">✖ Bỏ qua</button>
                </div>
            </div>

            <!-- VÙNG CHỨA ẢNH CẮT (CHO PHÉP ZOOM OUT THU NHỎ THẢ GA) -->
            <div style="flex: 1; position:relative; width:100%; height:calc(100vh - 60px); background:#111; display:flex; align-items:center; justify-content:center; overflow:hidden;">
                <img id="img_cropper_target_popup" src="${objectURL}" style="max-width:100%; max-height:100%; display:block;">
            </div>
        `;
        document.body.appendChild(modalBox);

        const targetImg = document.getElementById('img_cropper_target_popup');

        let cropperInstance = new window.Cropper(targetImg, {
            viewMode: 0,             // Cho phép dịch chuyển và thu nhỏ ảnh thoải mái ra ngoài khung
            dragMode: 'crop',
            autoCropArea: 0.9,
            restore: false,
            guides: true,
            center: true,
            highlight: false,
            cropBoxMovable: true,
            cropBoxResizable: true,
            toggleDragModeOnDblclick: false,
            zoomOnWheel: true,       // Lăn chuột phóng to / thu nhỏ linh hoạt
            zoomOnTouch: true,       // Chụm ngón tay zoom trên điện thoại
            wheelZoomRatio: 0.1,
            minContainerWidth: 200,
            minContainerHeight: 200,
            responsive: true
        });

        document.getElementById('btn_cropper_huy').onclick = function () {
            cropperInstance.destroy();
            modalBox.remove();
            URL.revokeObjectURL(objectURL);
            resolve(null);
        };

        document.getElementById('btn_cropper_luu').onclick = function () {
            // Đọc mức độ phân giải mà thầy/cô vừa chọn từ thẻ select
            const kieuChon = document.getElementById('select_chat_luong_anh_popup').value;
            let maxW = 1920, maxH = 1920, chatLuongJpeg = 0.8;

            if (kieuChon === 'ORIGINAL') {
                maxW = 10000; maxH = 10000; chatLuongJpeg = 0.92;
            } else if (kieuChon === '2K') {
                maxW = 2560; maxH = 2560; chatLuongJpeg = 0.85;
            } else if (kieuChon === 'FULLHD') {
                maxW = 1920; maxH = 1920; chatLuongJpeg = 0.8;
            } else if (kieuChon === 'HD') {
                maxW = 1280; maxH = 1280; chatLuongJpeg = 0.7;
            }

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
                resolve(blob); // Trả về file blob đã cắt nén theo đúng độ phân giải mong muốn[cite: 4]
            }, 'image/jpeg', chatLuongJpeg);
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

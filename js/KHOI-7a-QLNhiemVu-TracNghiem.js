
// ==============================================================================
// KHỐI 7a: QUẢN LÝ NHIỆM VỤ - TRẮC NGHIỆM
// ==============================================================================

const BangNhiemVuTNState = {
    duLieu: [],
    cotDangSort: 'ngay_tao',
    tangDan: false
};



// Từ điển hằng số (Chỉ giữ lại của Trắc nghiệm)
const CFG_NV_TN = {
    DAO_DE: { KHONG: "KHONG_DAO", CO_BAN: "DAO_CAU_ABCD", TOAN_DIEN: "DAO_CAU_ABCD_DS" },
    THOI_DIEM: { KHOA: "KHOA_HOAN_TOAN", SAU_NOP: "SAU_KHI_NOP", SAU_HET_HAN: "SAU_KHI_HET_HAN", HEN_GIO: "HEN_GIO" },
    MUC_DO: { KHONG: "NONE", DAPAN_DIEM: "CHI_DAPAN", FULL_LOIGIAI: "FULL_LOIGIAI" },
    FILE_GIAI: { CHUA_LENH: "CHUA_CO_LENH", DANG_CHO: "DANG_CHO_RAP_FILE", DANG_XU_LY: "DANG_XU_LY", HOAN_THANH: "DA_HOAN_THANH", LOI: "LOI_DONG_GOI" }
};




// =====================================================================
// Hàm 7.1: Vẽ bộ khung giao diện Quản lý Nhiệm Vụ (BỔ SUNG BỘ LỌC LỚP)
// =====================================================================
function ham_7a_1_ve_quan_ly_nhiem_vu_trac_nghiem() {
    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');

    vungLamViec.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
            <h3 style="margin: 0; color: #6f42c1;">🎯 Quản lý Nhiệm Vụ (Giao Bài)</h3>
            
            <div style="display: flex; gap: 15px; align-items: center;">
                <div style="position: relative;">
                    <span style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%); opacity: 0.5;">🔍</span>
                    <input type="text" id="input-tim-kiem-qlnv" 
                           placeholder="Tìm tên nhiệm vụ, mã lớp, trạng thái..." 
                           oninput="ham_7a_16_tim_kiem_live_nhiem_vu_trac_nghiem_trac_nghiem(this.value)"
                           style="padding: 10px 10px 10px 35px; border: 1px solid #ccc; border-radius: 6px; width: 280px; font-size: 14px; outline: none; box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);">
                </div>

                <button onclick="ham_7a_2_tai_danh_sach_nhiem_vu_trac_nghiem()" style="padding: 10px 15px; background: #f1f3f4; color: #333; border: 1px solid #ccc; border-radius: 6px; cursor: pointer; font-weight: bold; white-space: nowrap;">
                    🔄 Làm mới
                </button>
                <button onclick="ham_7a_3_hien_form_them_nhiem_vu_trac_nghiem()" style="padding: 10px 15px; background: #6f42c1; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(111,66,193,0.2); white-space: nowrap;">
                    + Tạo Nhiệm Vụ Mới
                </button>
            </div>
        </div>

        <div id="khung-nut-loc-lop-nv" style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px; padding: 12px; background: #f8f9fa; border-radius: 8px; border: 1px solid #e9ecef; align-items: center;">

            <span style="font-weight: 900; color: #2c3e50; display: flex; align-items: center; margin-right: 10px; font-size: 13px; text-transform: uppercase;">
                🏷️ Phân loại nhiệm vụ:
            </span>

            <button class="btn-loc-lop active" onclick="ham_7a_5_loc_nhiem_vu_theo_lop_trac_nghiem('TAT_CA', this)" style="padding: 6px 16px; background: #1a73e8; color: white; border: 1px solid #1a73e8; border-radius: 20px; font-weight: bold; cursor: pointer; font-size: 13px; transition: 0.2s;">
                📚 Tất cả các lớp
            </button>

            <button class="btn-loc-lop" onclick="ham_7a_5_loc_nhiem_vu_theo_lop_trac_nghiem('TU_DO', this)" style="padding: 6px 16px; background: white; color: #495057; border: 1px solid #ced4da; border-radius: 20px; font-weight: bold; cursor: pointer; font-size: 13px; transition: 0.2s;">
                🌍 Nhiệm vụ tự do
            </button>

            <button class="btn-loc-lop" onclick="ham_7a_5_loc_nhiem_vu_theo_lop_trac_nghiem('LIVE', this)" style="padding: 6px 16px; background: white; color: #495057; border: 1px solid #ced4da; border-radius: 20px; font-weight: bold; cursor: pointer; font-size: 13px; transition: 0.2s;">
                🔴 Các phòng LIVE
            </button>

            <div style="height: 24px; width: 2px; background: #dee2e6; margin: 0 5px;"></div>

            <span id="cac-nut-lop-dong" style="display: flex; gap: 8px; flex-wrap: wrap;"></span>

        </div>
        <div id="danh-sach-nv-render">
            <p style="text-align: center; color: #666;">Đang tải danh sách nhiệm vụ...</p>
        </div>
    `;

    ham_7a_2_tai_danh_sach_nhiem_vu_trac_nghiem();
}




// // =====================================================================
// // Hàm 7.2: Tải dữ liệu từ bảng nhiem_vu (Bổ sung sinh nút lọc lớp 🏫)
// // =====================================================================
// async function ham_7a_2_tai_danh_sach_nhiem_vu_trac_nghiem() {
//     const renderArea = document.getElementById('danh-sach-nv-render');
//     try {
//         const { data: dsNhiemVu, error } = await _supabase.from('nhiem_vu_trac_nghiem').select('*').order('ngay_tao', { ascending: false });
//         if (error) throw error;

//         // 1. Lấy tên GV
//         const danhSachUidGv = [...new Set((dsNhiemVu || []).map(nv => nv.uid_gv_tao).filter(id => id))];
//         let tuDienTenGv = {};
//         if (danhSachUidGv.length > 0) {
//             const { data: dsGv } = await _supabase.from('hoc_sinh').select('uid, ten').in('uid', danhSachUidGv);
//             if (dsGv) dsGv.forEach(gv => tuDienTenGv[gv.uid] = gv.ten);
//         }

//         // 2. Lấy Tên Lớp làm từ điển (Nếu chưa có)
//         if (!window.tempDsLop) {
//             const { data: dsLop } = await _supabase.from('lop_hoc').select('*');
//             window.tempDsLop = dsLop || [];
//         }

//         // 🌟 VỊ TRÍ CẤY GHÉP: TỰ ĐỘNG SINH CÁC NÚT BẤM LỌC LỚP DỰA TRÊN TỪ ĐIỂN LỚP THỰC TẾ
//         const khungNutLop = document.getElementById('cac-nut-lop-dong');
//         if (khungNutLop && window.tempDsLop) {
//             let htmlNutLop = '';
//             window.tempDsLop.forEach(l => {
//                 const maLop = l.ma_lop || l.ma || l.id;
//                 const tenLop = l.ten_lop || l.ten || l.name || maLop;
//                 htmlNutLop += `
//                     <button class="btn-loc-lop" onclick="ham_7a_5_loc_nhiem_vu_theo_lop_trac_nghiem('${maLop}', this)" style="padding: 6px 14px; background: white; color: #495057; border: 1px solid #ced4da; border-radius: 20px; font-weight: bold; cursor: pointer; font-size: 13px; transition: 0.2s;" onmouseover="this.style.background='#f1f3f4'" onmouseout="if(!this.classList.contains('active')) this.style.background='white'">
//                         🏫 ${tenLop}
//                     </button>
//                 `;
//             });
//             khungNutLop.innerHTML = htmlNutLop;
//         }

//         BangNhiemVuState.duLieu = (dsNhiemVu || []).map(nv => ({
//             ...nv,
//             ten_gv_tao: tuDienTenGv[nv.uid_gv_tao] || 'Không xác định'
//         }));

//         ham_7a_10_ve_bang_nhiem_vu_trac_nghiem();
//     } catch (error) {
//         renderArea.innerHTML = `<p style="color: red;">Lỗi tải dữ liệu: ${error.message}</p>`;
//     }
// }


async function ham_7a_2_tai_danh_sach_nhiem_vu_trac_nghiem() {
    const renderArea = document.getElementById('danh-sach-nv-render');
    try {
        // 🌟 JOIN CỰC GỌN (Vì đã xóa bớt FK thừa)
        const { data: dsNhiemVu, error } = await _supabase
            .from('nhiem_vu_trac_nghiem')
            .select(`
                *,
                hoc_lieu_trac_nghiem ( metadata )
            `)
            .order('ngay_tao', { ascending: false });
            
        if (error) throw error;

        // 1. Lấy tên GV
        const danhSachUidGv = [...new Set((dsNhiemVu || []).map(nv => nv.uid_gv_tao).filter(id => id))];
        let tuDienTenGv = {};
        if (danhSachUidGv.length > 0) {
            const { data: dsGv } = await _supabase.from('hoc_sinh').select('uid, ten').in('uid', danhSachUidGv);
            if (dsGv) dsGv.forEach(gv => tuDienTenGv[gv.uid] = gv.ten);
        }

        // 2. Lấy Tên Lớp
        if (!window.tempDsLop) {
            const { data: dsLop } = await _supabase.from('lop_hoc').select('*');
            window.tempDsLop = dsLop || [];
        }

        // 3. Render nút lớp (giữ nguyên logic cũ của thầy)
        const khungNutLop = document.getElementById('cac-nut-lop-dong');
        if (khungNutLop && window.tempDsLop) {
            let htmlNutLop = '';
            window.tempDsLop.forEach(l => {
                const maLop = l.ma_lop || l.ma || l.id;
                const tenLop = l.ten_lop || l.ten || l.name || maLop;
                htmlNutLop += `<button class="btn-loc-lop" onclick="ham_7a_5_loc_nhiem_vu_theo_lop_trac_nghiem('${maLop}', this)" style="padding: 6px 14px; background: white; color: #495057; border: 1px solid #ced4da; border-radius: 20px; font-weight: bold; cursor: pointer; font-size: 13px;">🏫 ${tenLop}</button>`;
            });
            khungNutLop.innerHTML = htmlNutLop;
        }

        // 🌟 GỘP DỮ LIỆU VÀ METADATA VÀO STATE
        BangNhiemVuState.duLieu = (dsNhiemVu || []).map(nv => ({
            ...nv,
            ten_gv_tao: tuDienTenGv[nv.uid_gv_tao] || 'Không xác định',
            // Vì dùng join, hoc_lieu_trac_nghiem giờ là 1 object, không phải mảng
            metadata_hoc_lieu: nv.hoc_lieu_trac_nghiem ? nv.hoc_lieu_trac_nghiem.metadata : null
        }));

        ham_7a_10_ve_bang_nhiem_vu_trac_nghiem();
        
    } catch (error) {
        renderArea.innerHTML = `<p style="color: red;">Lỗi tải dữ liệu: ${error.message}</p>`;
    }
}


// // =====================================================================
// // Hàm 7.2: Tải dữ liệu từ bảng nhiem_vu (Bổ sung sinh nút lọc lớp 🏫)
// // =====================================================================
// async function ham_7a_2_tai_danh_sach_nhiem_vu_trac_nghiem() {
//     const renderArea = document.getElementById('danh-sach-nv-render');

    
//     try {
//         // Thay thế đoạn gọi Supabase cũ bằng khối này:
// let dsNhiemVu = []; // Khai báo trước với giá trị rỗng

// try {
//     // 1. Dùng cú pháp chỉ định rõ cầu nối để tránh lỗi "more than one relationship"
//     const response = await _supabase
//         .from('nhiem_vu_trac_nghiem')
//         .select(`
//             *,
//             hoc_lieu_trac_nghiem!fk_nhiem_vu_tn_hoc_lieu ( metadata )
//         `)
//         .order('ngay_tao', { ascending: false });

//     if (response.error) {
//         console.error("Lỗi Supabase:", response.error);
//         // Nếu vẫn lỗi "more than one", hãy thử thay fk_nhiem_vu_tn_hoc_lieu bằng tên cái kia
//         throw new Error(response.error.message);
//     }
    
//     dsNhiemVu = response.data || [];
//     console.log("Tải thành công", dsNhiemVu.length, "nhiệm vụ.");

// } catch (err) {
//     console.error("Không thể lấy dữ liệu:", err);
//     renderArea.innerHTML = `<p style="color: red;">Lỗi tải dữ liệu: ${err.message}</p>`;
//     return; // Dừng hàm tại đây nếu không có dữ liệu
// }
//         // 1. Lấy tên GV
//         const danhSachUidGv = [...new Set((dsNhiemVu || []).map(nv => nv.uid_gv_tao).filter(id => id))];
//         let tuDienTenGv = {};
//         if (danhSachUidGv.length > 0) {
//             const { data: dsGv } = await _supabase.from('hoc_sinh').select('uid, ten').in('uid', danhSachUidGv);
//             if (dsGv) dsGv.forEach(gv => tuDienTenGv[gv.uid] = gv.ten);
//         }

//         // 2. Lấy Tên Lớp làm từ điển (Nếu chưa có)
//         if (!window.tempDsLop) {
//             const { data: dsLop } = await _supabase.from('lop_hoc').select('*');
//             window.tempDsLop = dsLop || [];
//         }

//         // TỰ ĐỘNG SINH CÁC NÚT BẤM LỌC LỚP DỰA TRÊN TỪ ĐIỂN LỚP THỰC TẾ
//         const khungNutLop = document.getElementById('cac-nut-lop-dong');
//         if (khungNutLop && window.tempDsLop) {
//             let htmlNutLop = '';
//             window.tempDsLop.forEach(l => {
//                 const maLop = l.ma_lop || l.ma || l.id;
//                 const tenLop = l.ten_lop || l.ten || l.name || maLop;
//                 htmlNutLop += `
//                     <button class="btn-loc-lop" onclick="ham_7a_5_loc_nhiem_vu_theo_lop_trac_nghiem('${maLop}', this)" style="padding: 6px 14px; background: white; color: #495057; border: 1px solid #ced4da; border-radius: 20px; font-weight: bold; cursor: pointer; font-size: 13px; transition: 0.2s;" onmouseover="this.style.background='#f1f3f4'" onmouseout="if(!this.classList.contains('active')) this.style.background='white'">
//                         🏫 ${tenLop}
//                     </button>
//                 `;
//             });
//             khungNutLop.innerHTML = htmlNutLop;
//         }

//         // 🌟 SỬA TẠI ĐÂY: Gắn luôn metadata vào state để hàm vẽ (7a_10) lấy xài cho tiện
//         BangNhiemVuState.duLieu = (dsNhiemVu || []).map(nv => ({
//             ...nv,
//             ten_gv_tao: tuDienTenGv[nv.uid_gv_tao] || 'Không xác định',
//             metadata_hoc_lieu: nv.hoc_lieu_trac_nghiem ? nv.hoc_lieu_trac_nghiem.metadata : null
//         }));

//         // Chuyển sang hàm vẽ HTML
//         ham_7a_10_ve_bang_nhiem_vu_trac_nghiem();
//     } catch (error) {
//         renderArea.innerHTML = `<p style="color: red;">Lỗi tải dữ liệu: ${error.message}</p>`;
//     }
// }



// =====================================================================
// Hàm 7.3: Vẽ Form Tạo Nhiệm Vụ (BẢN TÍCH HỢP LIÊN THÔNG KHỐI 15 - TỰ LUẬN)
// =====================================================================
async function ham_7a_3_hien_form_them_nhiem_vu_trac_nghiem() {
    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
    vungLamViec.innerHTML = `<div style="text-align: center; padding: 40px;"><p>⏳ Đang tải dữ liệu hệ thống (Học liệu, Danh sách lớp)...</p></div>`;

    try {
        const tapKyTu = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let chuoiNgauNhien = '';
        for (let i = 0; i < 6; i++) {
            chuoiNgauNhien += tapKyTu.charAt(Math.floor(Math.random() * tapKyTu.length));
        }
        const maNV_MacDinh = "NV_TN_" + chuoiNgauNhien;

        const { data: dsHocLieu } = await _supabase.from('hoc_lieu_trac_nghiem').select('*').order('ngay_tao', { ascending: false });
        window.tempDsHocLieu = dsHocLieu || [];

        let htmlOptionsHL = `<option value="KHONG_DUNG" style="font-weight: bold; color: red;">[ --- Không sử dụng học liệu --- ]</option>`;
        window.tempDsHocLieu.forEach(hl => {
            htmlOptionsHL += `<option value="${hl.ma_hoc_lieu}">[${hl.ma_hoc_lieu}] - ${hl.ten_hoc_lieu}</option>`;
        });

        let dsLop = [];
        if (typeof BangLopState !== 'undefined' && BangLopState.duLieu && BangLopState.duLieu.length > 0) dsLop = BangLopState.duLieu;
        else {
            const { data, error } = await _supabase.from('lop_hoc').select('*');
            if (!error && data) dsLop = data;
        }

        let htmlLop = '';
        if (dsLop.length > 0) {
            dsLop.forEach(l => {
                const maLop = l.ma_lop || l.ma || l.id;
                const tenLop = l.ten_lop || l.ten || l.name || maLop;
                htmlLop += `
                    <label style="display: inline-flex; align-items: center; width: 140px; margin-bottom: 10px; cursor: pointer;">
                        <input type="checkbox" class="chk-lop" value="${maLop}" style="transform: scale(1.3); margin-right: 8px;"> 
                        <span style="font-weight: bold; color: #1a73e8; font-size: 14px;">${tenLop}</span>
                    </label>
                `;
            });
        } else {
            htmlLop = `<div style="padding: 10px; background: #fff3cd; border: 1px solid #ffeeba; border-radius: 6px;"><span style="color: #856404; font-weight: bold;">⚠️ Không tìm thấy danh sách lớp!</span></div>`;
        }

        vungLamViec.innerHTML = `
            <div style="max-width: 950px; background: white; padding: 25px; border-radius: 12px; margin: 0 auto; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
                <h3 style="color: #6f42c1; margin-top: 0; border-bottom: 2px solid #f1f3f4; padding-bottom: 10px;">🎯 TẠO NHIỆM VỤ MỚI</h3>
                
                <div style="background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
                    <h4 style="margin-top: 0; color: #495057;">1. Thông tin chung</h4>
                    <div style="display: grid; grid-template-columns: 1fr 2fr 1fr; gap: 15px;">
                        <div>
                            <label style="font-weight:bold; font-size: 13px;">Mã NV (Tự động):</label>
                            <input type="text" id="add_nv_ma" value="${maNV_MacDinh}" data-random="${chuoiNgauNhien}" readonly style="width: 100%; padding: 8px; background: #e9ecef; border: 1px solid #ccc; border-radius: 4px; font-weight:bold; color: #dc3545; cursor: not-allowed;">
                        </div>
                        <div>
                            <label style="font-weight:bold; font-size: 13px;">Tên Nhiệm Vụ (*):</label>
                            <input type="text" id="add_nv_ten" placeholder="Nhập tên nhiệm vụ..." style="width: 100%; padding: 8px; border: 1px solid #1a73e8; border-radius: 4px;">
                        </div>
                        <div>
                            <label style="font-weight:bold; font-size: 13px;">Loại nhiệm vụ:</label>
                            <select id="add_nv_loai" onchange="ham_7a_3_d_cap_nhat_ma_nv_trac_nghiem(); 
                            if(typeof ham_15_4_doi_loai_nhiem_vu === 'function') ham_15_4_doi_loai_nhiem_vu();" 
                            style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                                <option value="Làm đề (Online)">📝 Làm đề (Online)</option>
                                
                            </select>
                        </div>
                    </div>
                </div>

                <div style="background: #e6f2ff; border: 1px solid #b8daff; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
                    <h4 style="margin-top: 0; color: #0056b3;">2. Dữ liệu Học Liệu (Đề thi)</h4>
                    
                    <div style="margin-bottom: 15px; display: flex; gap: 10px; align-items: center;">
                        <select id="add_nv_maHL" onchange="ham_7a_3_a_xu_ly_chon_hoc_lieu_trac_nghiem()" style="flex: 1; padding: 10px; border: 2px solid #d35400; border-radius: 4px; font-weight:bold;">
                            <option value="">-- Vui lòng chọn một đề thi --</option>
                            ${htmlOptionsHL}
                        </select>
                        <button onclick="ham_7a_12_copy_text_combobox_trac_nghiem('add_nv_maHL', this)" title="Copy tên Học Liệu" style="padding: 10px 15px; background: #e9ecef; color: #495057; border: 1px solid #ced4da; border-radius: 4px; font-weight: bold; cursor: pointer; white-space: nowrap; transition: 0.2s;" onmouseover="this.style.background='#dde2e6'" onmouseout="this.style.background='#e9ecef'">
                            📋 Copy Text
                        </button>
                    </div>

                    ${typeof ham_15_3_html_khu_vuc_tao_tu_luan === 'function' ? ham_15_3_html_khu_vuc_tao_tu_luan() : ''}
                    
                    <div id="khu_vuc_thong_tin_hl" style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; opacity: 0.5; pointer-events: none;">
                        <div><label style="font-size: 12px; font-weight:bold;">Khối Lớp:</label><select id="add_nv_khoi" style="width: 100%; padding: 6px; border: 1px solid #ccc; border-radius: 4px;"><option value="12">Khối 12</option><option value="11">Khối 11</option><option value="10">Khối 10</option><option value="Khác">Khác</option></select></div>
                        <div><label style="font-size: 12px; font-weight:bold;">Loại kiểm tra:</label><input type="text" id="add_nv_loaiKT" style="width: 100%; padding: 6px; border: 1px solid #ccc; border-radius: 4px;"></div>
                        <div><label style="font-size: 12px; font-weight:bold; color: #6f42c1;">Quy mô:</label><input type="text" id="add_nv_quymo" readonly style="width: 100%; padding: 6px; background:#f4f4f4; border: 1px dotted #6f42c1; border-radius: 4px; color:#6f42c1; font-weight:bold;"></div>
                    </div>
                </div>

                <div style="background: #fff8e6; border: 1px solid #ffe8a1; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
                    <h4 style="margin-top: 0; color: #d35400;">3. Phân công & Cấu hình Đăng ký</h4>

                    <div style="margin-bottom: 15px; padding: 10px; background: #e8f4fd; border: 1px solid #b8daff; border-radius: 6px;">
                        <label style="font-size: 12px; font-weight:bold; color: #0056b3;">Tính chất bài tập:</label>
                        <div style="display: flex; gap: 20px; margin-top: 5px;">
                            <label style="cursor: pointer; font-weight: bold; font-size: 13px;">
                                <input type="radio" name="add_nv_tinhchat" value="BAT_BUOC" checked onchange="document.getElementById('khung_chon_lop').style.display='block'">
                                🎯 Bắt buộc (Giao cho Lớp)
                            </label>
                            <label style="cursor: pointer; font-weight: bold; font-size: 13px; color: #d35400;">
                                <input type="radio" name="add_nv_tinhchat" value="TU_DO" onchange="document.getElementById('khung_chon_lop').style.display='none'">
                                🌍 Luyện tập tự do (Mở cho tất cả)
                            </label>
                        </div>
                    </div>

                    <div id="khung_chon_lop" style="margin-bottom: 20px; border-bottom: 1px dashed #ccc; padding-bottom: 15px;">
                        <label style="font-weight:bold; font-size: 13px; display:block; margin-bottom: 5px;">Giao cho Lớp (*):</label>
                        <div style="margin-bottom: 10px;">
                            <button onclick="ham_7a_3_b_chon_tat_ca_lop_trac_nghiem(true)" style="padding: 3px 8px; font-size: 11px;">Chọn tất cả</button>
                            <button onclick="ham_7a_3_b_chon_tat_ca_lop_trac_nghiem(false)" style="padding: 3px 8px; font-size: 11px;">Bỏ chọn</button>
                        </div>
                        <div style="background: white; padding: 10px; border: 1px solid #ddd; border-radius: 4px; max-height: 120px; overflow-y: auto;">
                            ${htmlLop}
                        </div>
                    </div>

                    <div style="display: flex; flex-direction: column; gap: 12px;">
                        
                        <div style="display: flex; align-items: center; background: white; padding: 8px 12px; border-radius: 6px; border: 1px solid #eee;">
                            <label style="width: 160px; font-size: 13px; font-weight:bold;">🟢 Trạng thái NV:</label>
                            <select id="add_nv_trangthai" style="flex: 1; padding: 8px; border: 1px solid #28a745; border-radius: 4px; font-weight: bold;">
                                <option value="1" selected>🟢 Mở (Kích hoạt)</option>
                                <option value="0">🔴 Khóa (Tạm dừng)</option>
                            </select>
                        </div>

                        <div style="display: flex; align-items: center; background: white; padding: 8px 12px; border-radius: 6px; border: 1px solid #eee;">
                            <label style="width: 160px; font-size: 13px; font-weight:bold; color: #d35400;">⏱️ Thời gian làm (phút):</label>
                            <input type="number" id="add_nv_thoigian" placeholder="Ví dụ: 45, 90..." min="0" style="flex: 1; padding: 8px; border: 1px solid #d35400; border-radius: 4px; font-weight: bold;">
                        </div>

                        <div style="display: flex; align-items: center; background: white; padding: 8px 12px; border-radius: 6px; border: 1px solid #eee;">
                            <label style="width: 160px; font-size: 13px; font-weight:bold;">🔄 Số lượt làm bài:</label>
                            <input type="number" id="add_nv_soluot" value="0" min="0" style="flex: 1; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                        </div>

                        <div style="display: flex; align-items: center; background: white; padding: 8px 12px; border-radius: 6px; border: 1px solid #eee;">
                            <label style="width: 160px; font-size: 13px; font-weight:bold;">📅 Mở Lúc:</label>
                            <input type="datetime-local" id="add_nv_mo" style="flex: 1; padding: 8px; border: 1px solid #ccc; border-radius: 4px; font-family: 'Roboto', sans-serif;">
                        </div>

                        <div style="display: flex; align-items: center; background: white; padding: 8px 12px; border-radius: 6px; border: 1px solid #eee;">
                            <label style="width: 160px; font-size: 13px; font-weight:bold;">⛔ Đóng Lúc:</label>
                            <input type="datetime-local" id="add_nv_dong" style="flex: 1; padding: 8px; border: 1px solid #ccc; border-radius: 4px; font-family: 'Roboto', sans-serif;">
                        </div>

                    </div>

                    <div style="margin-top: 15px; border-top: 1px dashed #e5c381; padding-top: 15px;">
                        <label style="font-weight:bold; font-size: 13px; color: #d35400;">🔀 Chế độ Đảo đề (Dùng JSON):</label>
                        <select id="add_nv_che_do_dao" style="width: 100%; padding: 10px; border: 2px solid #d35400; border-radius: 6px; font-weight: bold; font-size: 14px;">
                            <option value="${CFG_NV.DAO_DE.KHONG}">❌ Không đảo gì cả</option>
                            <option value="${CFG_NV.DAO_DE.CO_BAN}" selected>🔀 Đảo Câu hỏi + Đảo ABCD (Nhóm TN)</option>
                            <option value="${CFG_NV.DAO_DE.TOAN_DIEN}">🌪️ Đảo Câu hỏi + Đảo ABCD + Đảo ý a,b,c,d (Nhóm ĐS)</option>
                        </select>
                    </div>
                </div>

                <div style="background: #e6ffed; border: 1px solid #c3e6cb; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
                    <h4 style="margin-top: 0; color: #28a745;">4. Cấu hình Công bố & Bảo mật</h4>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        <div>
                            <label style="font-weight:bold; font-size: 13px;">Thời điểm công bố:</label>
                            <select id="add_nv_thoigiano" onchange="ham_7a_3_c_xu_ly_cong_bo_trac_nghiem()" style="width: 100%; padding: 10px; border: 1px solid #28a745; border-radius: 4px; font-weight: bold;">
                                <option value="${CFG_NV.THOI_DIEM.KHOA}">🔒 Khóa hoàn toàn (Không bao giờ xem)</option>
                                <option value="${CFG_NV.THOI_DIEM.SAU_NOP}">✅ Ngay sau khi nộp bài</option>
                                <option value="${CFG_NV.THOI_DIEM.SAU_HET_HAN}">⏳ Sau khi hết hạn Đóng đề</option>
                                <option value="${CFG_NV.THOI_DIEM.HEN_GIO}">⏰ Hẹn một giờ cụ thể...</option>
                            </select>
                            <div id="khu_vuc_hen_gio" style="display: none; margin-top: 10px;">
                                <label style="font-size: 12px; color: #d35400; font-weight:bold;">Giờ kích hoạt:</label>
                                <input type="datetime-local" id="add_nv_giocongbo" style="width: 100%; padding: 8px; border: 1px solid #d35400; border-radius: 4px;">
                            </div>
                        </div>
                        <div id="khu_vuc_muc_do" style="opacity: 0.3; pointer-events: none;">
                            <label style="font-weight:bold; font-size: 13px;">Mức độ công bố:</label>
                            <select id="add_nv_mucdo" style="width: 100%; padding: 10px; border: 1px solid #1a73e8; border-radius: 4px; font-weight: bold; color: #1a73e8;">
                                <option value="${CFG_NV.MUC_DO.DAPAN_DIEM}">📊 Chỉ xem Bảng Đáp án (A,B,C,D) & Điểm</option>
                                <option value="${CFG_NV.MUC_DO.FULL_LOIGIAI}" selected>📚 Xem Đáp án VÀ Tải File Lời giải chi tiết</option>
                            </select>
                            <p style="font-size: 11px; color: #666; margin-top: 8px; font-style: italic;">
                                🛡️ <strong style="color:#d35400;">Bảo mật:</strong> File Lời giải đang được mã hóa ẩn. Hệ thống chỉ bắt đầu tiến hành dịch và ráp file khi có Lệnh hoặc khi đến Thời điểm công bố.
                            </p>
                        </div>
                    </div>

                    <div style="margin-top: 15px; border-top: 1px dashed #c3e6cb; padding-top: 15px;">
                        <h4 style="margin: 0 0 10px 0; color: #6f42c1; font-size: 14px;">🛠️ TẠO FILE LỜI GIẢI GỘP (JSON)</h4>
                        <label style="display: flex; align-items: center; cursor: pointer; padding: 10px; background: #f8f9fa; border: 1px solid #ddd; border-radius: 6px;">
                            <input type="checkbox" id="add_nv_tu_dong_gom_file" style="transform: scale(1.3); margin-right: 10px;">
                            <span style="font-size: 14px; font-weight: bold; color: #333;">
                                🚀 Tự động ra lệnh gom File Lời giải ngay sau khi tạo Nhiệm vụ (nếu đã có file giải thì sử dụng lại)
                            </span>
                        </label>
                        <p style="font-size: 11px; color: #666; margin-top: 5px; font-style: italic; margin-left: 28px;">
                            * Hệ thống sẽ ngầm tải các file lời giải lẻ của từng câu và ghép thành 1 file duy nhất đẩy lên Github ngay khi thầy nhấn Xác Nhận Giao Bài.
                        </p>
                    </div>
                </div>

                <div style="display: flex; gap: 15px;">
                    <button onclick="ham_7a_4_luu_nhiem_vu_moi_trac_nghiem(this)" style="flex: 2; padding: 15px; background: #28a745; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 16px;">
                        💾 XÁC NHẬN GIAO BÀI
                    </button>

                    <button onclick="ham_7a_1_ve_quan_ly_nhiem_vu_trac_nghiem()" style="flex: 1; padding: 15px; background: #6c757d; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">
                        HỦY
                    </button>
                </div>
            </div>
        `;
    } catch (error) {
        vungLamViec.innerHTML = `<p style="color:red; text-align:center;">Lỗi khởi tạo form: ${error.message}</p>`;
    }
}



// Hàm 7.3: Vẽ Form Tạo Nhiệm Vụ (Áp dụng Hằng số & Giao diện mới)
function ham_7a_3_a_xu_ly_chon_hoc_lieu_trac_nghiem() {
    const maHL = document.getElementById('add_nv_maHL').value;
    const khuVucInfo = document.getElementById('khu_vuc_thong_tin_hl');

    if (maHL === "KHONG_DUNG" || maHL === "") {
        khuVucInfo.style.opacity = "0.3";
        khuVucInfo.style.pointerEvents = "none";
        document.getElementById('add_nv_khoi').value = "Khác";
        document.getElementById('add_nv_loaiKT').value = "";
        document.getElementById('add_nv_quymo').value = "";
    } else {
        khuVucInfo.style.opacity = "1";
        khuVucInfo.style.pointerEvents = "auto";
        const hlData = window.tempDsHocLieu.find(hl => hl.ma_hoc_lieu === maHL);
        if (hlData) {
            document.getElementById('add_nv_khoi').value = hlData.khoi_lop || "Khác";
            document.getElementById('add_nv_loaiKT').value = hlData.loai_kiem_tra || "";
            let chuoiQuyMo = `${hlData.quy_mo_cau_hoi} câu`;
            if (hlData.metadata && hlData.metadata.cau_truc) {
                chuoiQuyMo = `${hlData.metadata.cau_truc} (${chuoiQuyMo})`;
            }
            document.getElementById('add_nv_quymo').value = chuoiQuyMo;
        }
    }
}

function ham_7a_3_b_chon_tat_ca_lop_trac_nghiem(isCheck) {
    const checkboxes = document.querySelectorAll('.chk-lop');
    checkboxes.forEach(chk => chk.checked = isCheck);
}

// Hàm 7.3.c: Ẩn hiện logic Cấu hình Công bố (Sử dụng Hằng số)
function ham_7a_3_c_xu_ly_cong_bo_trac_nghiem() {
    const thoiDiem = document.getElementById('add_nv_thoigiano').value;

    document.getElementById('khu_vuc_hen_gio').style.display = (thoiDiem === CFG_NV.THOI_DIEM.HEN_GIO) ? "block" : "none";
    if (thoiDiem !== CFG_NV.THOI_DIEM.HEN_GIO) document.getElementById('add_nv_giocongbo').value = "";

    const khuVucMucDo = document.getElementById('khu_vuc_muc_do');
    if (thoiDiem === CFG_NV.THOI_DIEM.KHOA) {
        khuVucMucDo.style.opacity = "0.3";
        khuVucMucDo.style.pointerEvents = "none";
    } else {
        khuVucMucDo.style.opacity = "1";
        khuVucMucDo.style.pointerEvents = "auto";
    }
}

// Hàm 7.3.d: Tự động cập nhật Mã NV khi đổi Loại Nhiệm Vụ
function ham_7a_3_d_cap_nhat_ma_nv_trac_nghiem() {
    const loaiNV = document.getElementById('add_nv_loai').value;
    const inputMa = document.getElementById('add_nv_ma');

    // Lấy chuỗi 6 số ngẫu nhiên đã được cất giấu trong thuộc tính data-random
    const randomStr = inputMa.getAttribute('data-random');

    // Tra từ điển lấy Tiền tố (DE, TL, BG...), nếu không có thì mặc định là KH (Khác)
    const prefix = CFG_NV.PREFIX_LOAI[loaiNV] || "KH";

    // Ghép lại và hiển thị ra ô Input
    inputMa.value = `NV_${prefix}_${randomStr}`;
}


// ==============================================================
// Hàm 7.4: Thu thập dữ liệu, Kiểm tra File Giải và Tách Nhiệm Vụ 
// (BẢN TÁCH RÕ LUỒNG TRẮC NGHIỆM VÀ TỰ LUẬN)
// ==============================================================
window.ham_7a_4_luu_nhiem_vu_moi_trac_nghiem = async function(btnNode) {
    // --- 1. LẤY DỮ LIỆU CƠ BẢN TỪ FORM ---
    const maNVTrenForm = document.getElementById('add_nv_ma').value;
    const tenNV = document.getElementById('add_nv_ten').value.trim();
    const loaiNV = document.getElementById('add_nv_loai').value;
    const trangThai = document.getElementById('add_nv_trangthai').value;
    const maHL = document.getElementById('add_nv_maHL').value;

    const tinhChatElement = document.querySelector('input[name="add_nv_tinhchat"]:checked');
    const tinhChat = tinhChatElement ? tinhChatElement.value : "BAT_BUOC";

    let tgLamBai = parseInt(document.getElementById('add_nv_thoigian').value) || 0;
    let soLuot = parseInt(document.getElementById('add_nv_soluot').value) || 0;
    let mo = document.getElementById('add_nv_mo').value;
    let dong = document.getElementById('add_nv_dong').value;

    if (!tenNV) return alert("❌ Thầy vui lòng nhập Tên nhiệm vụ!");

    // --- 2. XÁC ĐỊNH DANH SÁCH LỚP VÀ LẤY TÊN LỚP ĐỂ ĐẶT TÊN THƯ MỤC DRIVE ---
    let dsLopChon = [];
    let mapTenLop = {}; // Bản đồ lưu Tên lớp tương ứng với Mã lớp
    
    if (tinhChat === "TU_DO") {
        dsLopChon = ["#LUYEN_TAP_TU_DO#"];
        mapTenLop["#LUYEN_TAP_TU_DO#"] = "Tu Luyen Tu Do";
        soLuot = 0;
        dong = null;
    } else {
        const classCheckboxes = document.querySelectorAll('.chk-lop:checked');
        Array.from(classCheckboxes).forEach(chk => {
            dsLopChon.push(chk.value);
            // Lấy tên lớp từ nhãn kế bên checkbox để đặt tên cho thư mục Drive đẹp hơn
            let tenLop = chk.nextElementSibling ? chk.nextElementSibling.innerText.trim() : chk.value;
            mapTenLop[chk.value] = tenLop;
        });
        
        if (dsLopChon.length === 0) return alert("❌ Thầy phải tick chọn ít nhất 1 Lớp để giao bài chứ!");
        if (mo && dong && new Date(mo) >= new Date(dong)) {
            return alert("❌ Lỗi thời gian: Kết thúc phải SAU bắt đầu!");
        }
    }

    btnNode.disabled = true;
    btnNode.innerText = "⏳ ĐANG XỬ LÝ DỮ LIỆU...";

    try {
        
            // =========================================================================
            // 🌟 NHÁNH B: LOGIC CHO NHIỆM VỤ TRẮC NGHIỆM (GIỮ NGUYÊN GỐC 100%)
            // =========================================================================
            if (!maHL || maHL === "KHONG_DUNG") throw new Error("❌ Thầy chưa chọn Học liệu (Đề thi) kìa!");

            let quyMo = 0, cauTruc = '';
            if (maHL && maHL !== "KHONG_DUNG") {
                const hlData = window.tempDsHocLieu.find(hl => hl.ma_hoc_lieu === maHL);
                if (hlData) {
                    quyMo = hlData.quy_mo_cau_hoi || 0;
                    cauTruc = (hlData.metadata && hlData.metadata.cau_truc) ? hlData.metadata.cau_truc : '';
                }
            }

            const cheDoDao = document.getElementById('add_nv_che_do_dao').value;
            let configDaoDe = { cau: cheDoDao !== CFG_NV.DAO_DE.KHONG, abcd: cheDoDao !== CFG_NV.DAO_DE.KHONG, ds: cheDoDao === CFG_NV.DAO_DE.TOAN_DIEN };

            const thoiDiem = document.getElementById('add_nv_thoigiano').value;
            const mucDo = document.getElementById('add_nv_mucdo').value;
            let configCongBo = { thoi_diem: thoiDiem, muc_do: (thoiDiem === CFG_NV.THOI_DIEM.KHOA) ? CFG_NV.MUC_DO.KHONG : mucDo };

            if (thoiDiem === CFG_NV.THOI_DIEM.HEN_GIO) {
                const gioCongBo = document.getElementById('add_nv_giocongbo').value;
                if (!gioCongBo) throw new Error("❌ Thầy chọn Hẹn giờ thì phải nhập Giờ vào nhé!");
                configCongBo.thoi_diem = `${CFG_NV.THOI_DIEM.HEN_GIO}|${new Date(gioCongBo).toISOString()}`;
            }

            const chkTuyenLenhGom = document.getElementById('add_nv_tu_dong_gom_file');
            const isYeuCauGomFile = chkTuyenLenhGom && chkTuyenLenhGom.checked;

            let finalTrangThaiLoiGiai = CFG_NV.FILE_GIAI.CHUA_LENH;
            let finalUrlFileGiai = null;
            let canGoiBotCSharp = false;

            if (isYeuCauGomFile && maHL && maHL !== "KHONG_DUNG") {
            // SỬA: Truy vấn vào bảng HỌC LIỆU thay vì bảng NHIỆM VỤ
            const { data: hlCu } = await _supabase
                .from('hoc_lieu_trac_nghiem') 
                .select('url_file_giai')
                .eq('ma_hoc_lieu', maHL)
                .single();

            if (hlCu && hlCu.url_file_giai) {
                console.log("♻️ Tái sử dụng file giải đã có:", hlCu.url_file_giai);
                // Lưu ý: Nếu thầy dùng tên hằng số khác thì sửa lại CFG_NV_TN thành CFG_NV nhé
                finalTrangThaiLoiGiai = CFG_NV_TN.FILE_GIAI.HOAN_THANH; 
                finalUrlFileGiai = hlCu.url_file_giai;
                canGoiBotCSharp = false;
            } else {
                console.log("🚀 Chưa có file giải, chuẩn bị gọi C#.");
                finalTrangThaiLoiGiai = CFG_NV_TN.FILE_GIAI.DANG_XU_LY;
                canGoiBotCSharp = true;
            }
        }

            const tapKyTu = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
            const prefix = "NV_" + (CFG_NV.PREFIX_LOAI ? (CFG_NV.PREFIX_LOAI[loaiNV] || "KH") : "KH") + "_";

            const insertPayloads = dsLopChon.map((maLop) => {
                let maNV_ChinhThuc = (dsLopChon.length === 1) ? maNVTrenForm : prefix + Array(6).fill(0).map(() => tapKyTu.charAt(Math.floor(Math.random() * tapKyTu.length))).join('');

                return {
                    ma_nhiem_vu: maNV_ChinhThuc,
                    ten_nhiem_vu: tenNV,
                    loai_nhiem_vu: loaiNV,
                    ma_hoc_lieu: maHL === "KHONG_DUNG" ? null : maHL,
                    metadata: {}, 
                    khoi_lop: document.getElementById('add_nv_khoi').value,
                    loai_kiem_tra: document.getElementById('add_nv_loaiKT').value,
                    quy_mo_cau_hoi: quyMo,
                    cau_truc_de: cauTruc,
                    danh_sach_lop: [maLop],
                    thoi_gian_mo: mo ? new Date(mo).toISOString() : null,
                    thoi_gian_dong: dong ? new Date(dong).toISOString() : null,
                    thoi_gian_lam_bai: tgLamBai,
                    so_luot_lam_bai: soLuot,
                    cau_hinh_dap_an: configCongBo,
                    dao_cau_hoi: configDaoDe,
                    trang_thai_loi_giai: finalTrangThaiLoiGiai,
                    trang_thai: trangThai,
                    uid_gv_tao: (typeof AppState !== 'undefined' && AppState.user && AppState.user.uid) ? AppState.user.uid : null,
                    ngay_tao: new Date().toISOString()
                };
            });

            const { data: insertedRecords, error } = await _supabase.from('nhiem_vu_trac_nghiem').insert(insertPayloads).select();
            if (error) throw error;

            if (canGoiBotCSharp && insertedRecords && insertedRecords.length > 0) {
                const idDaiDienDeGom = insertedRecords[0].id;
                console.log(`📡 Đang đánh thức C# Bot qua Nhiệm vụ ID: ${idDaiDienDeGom}`);
                if (typeof ham_7a_13_ra_lenh_tao_file_giai_trac_nghiem === 'function') {
                    ham_7a_13_ra_lenh_tao_file_giai_trac_nghiem(idDaiDienDeGom, maHL, true);
                }
            }

            const kieuGiao = (dsLopChon.length === 1 && tinhChat === "TU_DO") ? "phòng LUYỆN TẬP TỰ DO" : "giao bài";
            const thongBaoFile = finalUrlFileGiai ? "\n♻️ Đã tự động kế thừa File Giải cũ." : (canGoiBotCSharp ? "\n🚀 Đang tạo File Giải gộp dưới nền..." : "");

            alert(`✅ Đã ${kieuGiao} thành công cho ${dsLopChon.length} lớp!${thongBaoFile}`);
            ham_7a_1_ve_quan_ly_nhiem_vu_trac_nghiem();
        

    } catch (error) {
        alert(error.message.startsWith("❌") ? error.message : "Lỗi: " + error.message);
    } finally {
        btnNode.disabled = false;
        btnNode.innerText = "💾 XÁC NHẬN GIAO BÀI";
    }
}


//// =====================================================================
//// Hàm mới: Thực hiện lọc nhanh danh sách nhiệm vụ theo lớp chọn
//// =====================================================================


// [Nhãn thời gian: 16:25 - Ngày 28/05/2026] - Cập nhật đổi màu thông minh cho 3 thẻ phân loại Nhiệm vụ
window.ham_7a_5_loc_nhiem_vu_theo_lop_trac_nghiem = function (maLopChon, nutBam) {
    // 1. Reset màu toàn bộ các nút về xám/trắng
    document.querySelectorAll('.btn-loc-lop').forEach(btn => {
        btn.classList.remove('active');
        btn.style.background = 'white';
        btn.style.color = '#495057';
        btn.style.borderColor = '#ced4da';
    });

    // 2. Kích hoạt màu riêng cho từng Thẻ khi được chọn
    if (nutBam) {
        nutBam.classList.add('active');
        if (maLopChon === 'TAT_CA') {
            nutBam.style.background = '#1a73e8'; // Xanh dương
            nutBam.style.borderColor = '#1a73e8';
        } else if (maLopChon === 'TU_DO') {
            nutBam.style.background = '#17a2b8'; // Xanh ngọc
            nutBam.style.borderColor = '#17a2b8';
        } else if (maLopChon === 'LIVE') {
            nutBam.style.background = '#e74c3c'; // Đỏ Live
            nutBam.style.borderColor = '#e74c3c';
        } else {
            nutBam.style.background = '#6f42c1'; // Tím (Dành cho các lớp cụ thể 12A1, 10B...)
            nutBam.style.borderColor = '#6f42c1';
        }
        nutBam.style.color = 'white';
    }

    // 3. Gọi hàm vẽ lại bảng
    if (typeof window.ham_7a_10_ve_bang_nhiem_vu_trac_nghiem === 'function') {
        window.ham_7a_10_ve_bang_nhiem_vu_trac_nghiem();
    }
};


// ==============================================================
// Hàm 7.6: Mở form Xem / Sửa Nhiệm Vụ (CÓ BẢNG ĐIỀU KHIỂN GOM FILE JSON)
// ==============================================================
async function ham_7a_6_mo_form_nhiem_vu_trac_nghiem(maNhiemVu) {
    const data = BangNhiemVuState.duLieu.find(nv => nv.ma_nhiem_vu === maNhiemVu);
    if (!data) return alert("❌ Dữ liệu nhiệm vụ không tồn tại!");

    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
    vungLamViec.innerHTML = `<div style="text-align: center; padding: 40px;"><p>⏳ Đang nạp toàn bộ dữ liệu nhiệm vụ...</p></div>`;

    const formatToLocal = (isoStr) => {
        if (!isoStr) return "";
        const d = new Date(isoStr);
        return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    };

    let lopDaGiao = [];
    try { lopDaGiao = typeof data.danh_sach_lop === 'string' ? JSON.parse(data.danh_sach_lop) : (data.danh_sach_lop || []); } catch (e) { }
    const laTuDo = lopDaGiao.includes("#LUYEN_TAP_TU_DO#");

    if (!laTuDo && (!window.tempDsLop || window.tempDsLop.length === 0)) {
        const { data: dsLop } = await _supabase.from('lop_hoc').select('*');
        if (dsLop) window.tempDsLop = dsLop;
    }

    let htmlLop = '';
    if (!laTuDo && window.tempDsLop) {
        window.tempDsLop.forEach(l => {
            const maLop = l.ma_lop || l.ma || l.id;
            const tenLop = l.ten_lop || l.ten || maLop;
            const isChecked = lopDaGiao.includes(maLop) ? "checked" : "";
            htmlLop += `
                <label style="display: inline-flex; align-items: center; width: 140px; margin-bottom: 10px; cursor: pointer;">
                    <input type="checkbox" class="chk-lop-edit" value="${maLop}" ${isChecked} style="transform: scale(1.3); margin-right: 8px;"> 
                    <span style="font-weight: bold; color: #1a73e8; font-size: 14px;">${tenLop}</span>
                </label>
            `;
        });
    }

    let dsHocLieu = window.tempDsHocLieu;
    if (!dsHocLieu || dsHocLieu.length === 0) {
        const { data: fetchedHL } = await _supabase.from('hoc_lieu_trac_nghiem').select('*').order('ngay_tao', { ascending: false });
        dsHocLieu = fetchedHL || [];
        window.tempDsHocLieu = dsHocLieu;
    }

    let htmlOptionsHL = `<option value="KHONG_DUNG" style="font-weight: bold; color: red;">[ --- Không sử dụng học liệu --- ]</option>`;
    dsHocLieu.forEach(hl => {
        const isSelected = (hl.ma_hoc_lieu === data.ma_hoc_lieu) ? "selected" : "";
        htmlOptionsHL += `<option value="${hl.ma_hoc_lieu}" ${isSelected}>[${hl.ma_hoc_lieu}] - ${hl.ten_hoc_lieu}</option>`;
    });

    let dao = { cau: false, abcd: false, ds: false };
    try { dao = typeof data.dao_cau_hoi === 'string' ? JSON.parse(data.dao_cau_hoi) : (data.dao_cau_hoi || dao); } catch (e) { }
    let modeDao = CFG_NV.DAO_DE.KHONG;
    if (dao.cau && dao.abcd && dao.ds) modeDao = CFG_NV.DAO_DE.TOAN_DIEN;
    else if (dao.cau && dao.abcd) modeDao = CFG_NV.DAO_DE.CO_BAN;

    let congBo = { thoi_diem: CFG_NV.THOI_DIEM.KHOA, muc_do: CFG_NV.MUC_DO.KHONG };
    try { congBo = typeof data.cau_hinh_dap_an === 'string' ? JSON.parse(data.cau_hinh_dap_an) : (data.cau_hinh_dap_an || congBo); } catch (e) { }

    let thoiDiemVal = congBo.thoi_diem || CFG_NV.THOI_DIEM.KHOA;
    let thoiDiemSelect = thoiDiemVal;
    let gioHen = "";
    if (thoiDiemVal.startsWith("HEN_GIO|")) {
        thoiDiemSelect = CFG_NV.THOI_DIEM.HEN_GIO;
        gioHen = formatToLocal(thoiDiemVal.split("|")[1]);
    }

    // =========================================================
    // 🌟 KHỞI TẠO BẢNG ĐIỀU KHIỂN GOM FILE GIẢI (JSON)
    // =========================================================
    const ttFile = data.trang_thai_loi_giai || CFG_NV.FILE_GIAI.CHUA_LENH;
    const urlFile = data.url_file_giai || "";

    let btnFileHtml = "";
    if (ttFile === CFG_NV.FILE_GIAI.HOAN_THANH && urlFile) {
        btnFileHtml = `
            <button onclick="window.open('${urlFile}', '_blank')" style="padding:8px 15px; background:#28a745; color:white; border:none; border-radius:4px; font-weight:bold; cursor:pointer;">👁️ XEM FILE GỘP (JSON)</button>
            <button onclick="ham_7_10_ra_lenh_tao_file_giai('${data.id}', '${data.ma_hoc_lieu}')" style="padding:8px 15px; background:#f8f9fa; color:#6c757d; border:1px solid #ccc; border-radius:4px; font-weight:bold; cursor:pointer;">🔄 GOM LẠI FILE MỚI</button>
        `;
    } else if (ttFile === CFG_NV.FILE_GIAI.DANG_CHO || ttFile === CFG_NV.FILE_GIAI.DANG_XU_LY) {
        btnFileHtml = `<button disabled style="padding:8px 15px; background:#ffc107; color:#333; border:none; border-radius:4px; font-weight:bold; cursor:wait;">⏳ HỆ THỐNG ĐANG GOM DỮ LIỆU...</button>`;
    } else {
        // Nút ra lệnh lần đầu hoặc khi bị lỗi
        btnFileHtml = `<button onclick="ham_7_10_ra_lenh_tao_file_giai('${data.id}', '${data.ma_hoc_lieu}')" style="padding:8px 15px; background:#6f42c1; color:white; border:none; border-radius:4px; font-weight:bold; cursor:pointer;">🚀 RA LỆNH GOM FILE LỜI GIẢI</button>`;
    }

    vungLamViec.innerHTML = `
        <div style="max-width: 950px; background: white; padding: 25px; border-radius: 12px; margin: 0 auto; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
            <h3 style="color: #6f42c1; margin-top: 0; border-bottom: 2px solid #f1f3f4; padding-bottom: 10px; display: flex; justify-content: space-between;">
                <span>✏️ CHỈNH SỬA NHIỆM VỤ</span>
                <span style="color: #d35400; font-size: 16px;">[ Mã: ${data.ma_nhiem_vu} ]</span>
            </h3>

            <div style="background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
                <h4 style="margin-top: 0; color: #495057;">1. Thông tin chung</h4>
                <div style="display: grid; grid-template-columns: 1fr 2fr 1fr; gap: 15px;">
                    <div>
                        <label style="font-weight:bold; font-size: 13px;">Mã NV (Cố định):</label>
                        <input type="text" id="edit_nv_ma" value="${data.ma_nhiem_vu}" readonly style="width: 100%; padding: 8px; background: #e9ecef; border: 1px solid #ccc; border-radius: 4px; font-weight:bold; color: #dc3545; cursor: not-allowed;">
                    </div>
                    <div>
                        <label style="font-weight:bold; font-size: 13px;">Tên Nhiệm Vụ (*):</label>
                        <input type="text" id="edit_nv_ten" value="${data.ten_nhiem_vu}" style="width: 100%; padding: 8px; border: 1px solid #1a73e8; border-radius: 4px; box-sizing: border-box; font-weight: bold;">
                    </div>
                    <div>
                        <label style="font-weight:bold; font-size: 13px;">Loại nhiệm vụ:</label>
                        <select id="edit_nv_loai" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                            <option value="Làm đề (Online)" ${data.loai_nhiem_vu === 'Làm đề (Online)' ? 'selected' : ''}>📝 Làm đề (Online)</option>
                            
                        </select>
                    </div>
                </div>
            </div>

            <div style="background: #e6f2ff; border: 1px solid #b8daff; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
                <h4 style="margin-top: 0; color: #0056b3;">2. Dữ liệu Học Liệu (Đề thi)</h4>
                <div style="margin-bottom: 15px;">
                    <label style="font-size: 12px; font-weight:bold; color: #d35400;">🔄 Thầy/Cô có thể chọn lại Học liệu khác cho nhiệm vụ này:</label>
                    <div style="display: flex; gap: 10px; align-items: center; margin-top: 5px;">
                        <select id="edit_nv_maHL" style="flex: 1; padding: 10px; border: 2px solid #d35400; border-radius: 4px; font-weight:bold;">
                            ${htmlOptionsHL}
                        </select>
                        <button onclick="ham_7a_12_copy_text_combobox_trac_nghiem('edit_nv_maHL', this)" title="Copy tên Học Liệu" style="padding: 10px 15px; background: #e9ecef; color: #495057; border: 1px solid #ced4da; border-radius: 4px; font-weight: bold; cursor: pointer; white-space: nowrap; transition: 0.2s;" onmouseover="this.style.background='#dde2e6'" onmouseout="this.style.background='#e9ecef'">
                            📋 Copy Text
                        </button>
                    </div>
                </div>
            </div>

            <div style="background: #fff8e6; border: 1px solid #ffe8a1; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
                <h4 style="margin-top: 0; color: #d35400;">3. Phân công & Quy định</h4>
                
                <div style="margin-bottom: 15px; padding: 10px; background: ${laTuDo ? '#fff3e0' : '#e3f2fd'}; border-radius: 6px; border: 1px solid #ccc;">
                    <span style="font-weight: bold;">Tính chất: </span> 
                    ${laTuDo ? '<b style="color: #d35400;">🌍 LUYỆN TẬP TỰ DO</b>' : '<b style="color: #0056b3;">🎯 NHIỆM VỤ BẮT BUỘC</b>'}
                    <input type="hidden" id="edit_nv_tinhchat" value="${laTuDo ? 'TU_DO' : 'BAT_BUOC'}">
                </div>

                <div id="khung_chon_lop_edit" style="margin-bottom: 20px; display: ${laTuDo ? 'none' : 'block'};">
                    <label style="font-weight:bold; font-size: 13px; display:block; margin-bottom: 8px;">Giao cho các Lớp:</label>
                    <div style="background: white; padding: 15px; border: 1px solid #ddd; border-radius: 6px; max-height: 120px; overflow-y: auto;">
                        ${htmlLop}
                    </div>
                </div>

                <div style="display: flex; flex-direction: column; gap: 12px;">
                    <div style="display: flex; align-items: center; background: white; padding: 10px; border-radius: 6px; border: 1px solid #eee;">
                        <label style="width: 180px; font-size: 13px; font-weight:bold;">🟢 Trạng thái NV:</label>
                        <select id="edit_nv_trangthai" style="flex: 1; padding: 8px; border: 1px solid #28a745; border-radius: 4px; font-weight: bold;">
                            <option value="1" ${String(data.trang_thai) !== '0' ? 'selected' : ''}>🟢 Mở (Kích hoạt)</option>
                            <option value="0" ${String(data.trang_thai) === '0' ? 'selected' : ''}>🔴 Khóa (Tạm dừng)</option>
                        </select>
                    </div>

                    <div style="display: flex; align-items: center; background: white; padding: 10px; border-radius: 6px; border: 1px solid #eee;">
                        <label style="width: 180px; font-size: 13px; font-weight:bold; color: #d35400;">⏱️ Thời gian làm (phút):</label>
                        <input type="number" id="edit_nv_thoigian" value="${data.thoi_gian_lam_bai || ''}" placeholder="VD: 45, 90..." style="flex: 1; padding: 8px; border: 1px solid #d35400; border-radius: 4px; font-weight: bold;">
                    </div>

                    <div style="display: flex; align-items: center; background: white; padding: 10px; border-radius: 6px; border: 1px solid #eee;">
                        <label style="width: 180px; font-size: 13px; font-weight:bold;">🔄 Số lượt tối đa:</label>
                        <input type="number" id="edit_nv_soluot" value="${data.so_luot_lam_bai || 0}" ${laTuDo ? 'disabled' : ''} style="flex: 1; padding: 8px; border: 1px solid #ccc; border-radius: 4px; background: ${laTuDo ? '#f5f5f5' : 'white'};">
                    </div>

                    <div style="display: flex; align-items: center; background: white; padding: 10px; border-radius: 6px; border: 1px solid #eee;">
                        <label style="width: 180px; font-size: 13px; font-weight:bold;">📅 Mở Lúc:</label>
                        <input type="datetime-local" id="edit_nv_mo" value="${formatToLocal(data.thoi_gian_mo)}" style="flex: 1; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                    </div>

                    <div style="display: flex; align-items: center; background: white; padding: 10px; border-radius: 6px; border: 1px solid #eee;">
                        <label style="width: 180px; font-size: 13px; font-weight:bold;">⛔ Đóng Lúc:</label>
                        <input type="datetime-local" id="edit_nv_dong" value="${formatToLocal(data.thoi_gian_dong)}" ${laTuDo ? 'disabled' : ''} style="flex: 1; padding: 8px; border: 1px solid #ccc; border-radius: 4px; background: ${laTuDo ? '#f5f5f5' : 'white'};">
                    </div>
                </div>

                <div style="margin-top: 15px; border-top: 1px dashed #e5c381; padding-top: 15px;">
                    <label style="font-weight:bold; font-size: 13px; color: #d35400;">🔀 Chế độ Đảo đề:</label>
                    <select id="edit_nv_che_do_dao" style="width: 100%; padding: 10px; border: 2px solid #d35400; border-radius: 6px; font-weight: bold;">
                        <option value="${CFG_NV.DAO_DE.KHONG}" ${modeDao === CFG_NV.DAO_DE.KHONG ? 'selected' : ''}>❌ Không đảo gì cả</option>
                        <option value="${CFG_NV.DAO_DE.CO_BAN}" ${modeDao === CFG_NV.DAO_DE.CO_BAN ? 'selected' : ''}>🔀 Đảo Câu hỏi + Đảo đáp án ABCD</option>
                        <option value="${CFG_NV.DAO_DE.TOAN_DIEN}" ${modeDao === CFG_NV.DAO_DE.TOAN_DIEN ? 'selected' : ''}>🌪️ Đảo Toàn Diện (Câu + ABCD + Đ/S)</option>
                    </select>
                </div>
            </div>

            <div style="background: #e6ffed; border: 1px solid #c3e6cb; border-radius: 8px; padding: 15px; margin-bottom: 25px;">
                <h4 style="margin-top: 0; color: #28a745;">4. Cấu hình Công bố & Bảo mật</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div>
                        <label style="font-weight:bold; font-size: 13px;">Thời điểm công bố:</label>
                        <select id="edit_nv_thoigiano" onchange="document.getElementById('khu_vuc_hen_gio_edit').style.display = (this.value === 'HEN_GIO') ? 'block' : 'none'" style="width: 100%; padding: 10px; border: 1px solid #28a745; border-radius: 4px; font-weight: bold;">
                           <option value="${CFG_NV.THOI_DIEM.KHOA}" ${thoiDiemSelect === CFG_NV.THOI_DIEM.KHOA ? 'selected' : ''}>🔒 Khóa hoàn toàn (Không bao giờ xem)</option>
                            <option value="${CFG_NV.THOI_DIEM.SAU_NOP}" ${thoiDiemSelect === CFG_NV.THOI_DIEM.SAU_NOP ? 'selected' : ''}>✅ Ngay sau khi nộp bài</option>
                            <option value="${CFG_NV.THOI_DIEM.SAU_HET_HAN}" ${thoiDiemSelect === CFG_NV.THOI_DIEM.SAU_HET_HAN ? 'selected' : ''}>⏳ Sau khi hết hạn Đóng đề</option>
                            <option value="${CFG_NV.THOI_DIEM.HEN_GIO}" ${thoiDiemSelect === CFG_NV.THOI_DIEM.HEN_GIO ? 'selected' : ''}>⏰ Hẹn một giờ cụ thể...</option>
                        </select>
                        <div id="khu_vuc_hen_gio_edit" style="display: ${thoiDiemSelect === CFG_NV.THOI_DIEM.HEN_GIO ? 'block' : 'none'}; margin-top: 10px;">
                            <label style="font-size: 12px; color: #d35400; font-weight:bold;">Giờ kích hoạt:</label>
                            <input type="datetime-local" id="edit_nv_giocongbo" value="${gioHen}" style="width: 100%; padding: 8px; border: 1px solid #d35400; border-radius: 4px;">
                        </div>
                    </div>
                    <div>
                        <label style="font-weight:bold; font-size: 13px;">Mức độ công bố:</label>
                        <select id="edit_nv_mucdo" style="width: 100%; padding: 10px; border: 1px solid #1a73e8; border-radius: 4px; font-weight: bold; color: #1a73e8;">
                            <option value="${CFG_NV.MUC_DO.DAPAN_DIEM}" ${congBo.muc_do === CFG_NV.MUC_DO.DAPAN_DIEM ? 'selected' : ''}>📊 Chỉ xem Bảng Đáp án (A,B,C,D) & Điểm</option>
                            <option value="${CFG_NV.MUC_DO.FULL_LOIGIAI}" ${congBo.muc_do === CFG_NV.MUC_DO.FULL_LOIGIAI ? 'selected' : ''}>📚 Xem Đáp án VÀ Tải File Lời giải chi tiết</option>
                        </select>
                    </div>
                </div>

                <div style="margin-top: 15px; border-top: 1px dashed #c3e6cb; padding-top: 15px;">
                    <h4 style="margin: 0 0 10px 0; color: #6f42c1; font-size: 14px;">🛠️ TẠO FILE LỜI GIẢI (JSON GỘP)</h4>
                    <div style="display: flex; gap: 15px; align-items: center; flex-wrap: wrap;">
                        <div>
                            <select id="edit_nv_trang_thai_file" disabled style="padding: 8px; border-radius: 4px; border: 1px solid #ccc; background: #e9ecef; font-weight:bold; color:#495057;">
                                <option value="${CFG_NV.FILE_GIAI.CHUA_LENH}" ${ttFile === CFG_NV.FILE_GIAI.CHUA_LENH ? 'selected' : ''}>⚪ Chưa có lệnh</option>
                                <option value="${CFG_NV.FILE_GIAI.DANG_XU_LY}" ${ttFile === CFG_NV.FILE_GIAI.DANG_XU_LY ? 'selected' : ''}>⚙️ Đang xử lý (Gom data)</option>
                                <option value="${CFG_NV.FILE_GIAI.HOAN_THANH}" ${ttFile === CFG_NV.FILE_GIAI.HOAN_THANH ? 'selected' : ''}>✅ Đã hoàn thành</option>
                                <option value="${CFG_NV.FILE_GIAI.LOI}" ${ttFile === CFG_NV.FILE_GIAI.LOI ? 'selected' : ''}>❌ Lỗi gom file</option>
                            </select>
                        </div>
                        <div id="khu-vuc-nut-file" style="display:flex; gap:10px;">${btnFileHtml}</div>
                    </div>
                    ${urlFile ? `<div style="margin-top:10px; font-size:11px; color:#1a73e8; word-break:break-all;">🔗 Link File Gộp: <a href="${urlFile}" target="_blank">${urlFile}</a></div>` : ''}
                    <p style="font-size: 11px; color: #666; margin-top: 5px; font-style: italic;">* Hệ thống sẽ tự động tải các file lời giải lẻ của từng câu và ghép thành 1 file duy nhất đẩy lên Github.</p>
                </div>
            </div>

            <div style="display: flex; gap: 15px;">
                <button onclick="ham_7a_7_luu_cap_nhat_nhiem_vu_trac_nghiem('${data.ma_nhiem_vu}', this)" style="flex: 2; padding: 15px; background: #ffc107; color: #333; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    💾 LƯU CẬP NHẬT
                </button>
                <button onclick="ham_7a_1_ve_quan_ly_nhiem_vu_trac_nghiem()" style="flex: 1; padding: 15px; background: #6c757d; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">
                    HỦY QUAY LẠI
                </button>
            </div>
        </div>



    `;
    // Thả dòng này vào cuối hàm mở form xem/sửa nhiệm vụ, truyền vào mã học liệu của nhiệm vụ đó
    ham_7a_14_ve_nut_loi_giai_dong_trac_nghiem(data.ma_hoc_lieu);
}



// ==============================================================
// Hàm 7.7: Thu thập và Gửi Cập nhật Nhiệm vụ (FULL JSON & THỜI GIAN LÀM BÀI)
// ==============================================================



// ==============================================================
// Hàm 7.7: Thu thập và Gửi Cập nhật Nhiệm vụ (FIX LỖI NULL VALUE)
// ==============================================================
async function ham_7a_7_luu_cap_nhat_nhiem_vu_trac_nghiem(maNhiemVu, btnNode) {
    // 1. Lấy các thông tin cơ bản (Luôn tồn tại)
    const elTen = document.getElementById('edit_nv_ten');
    const elKhoi = document.getElementById('edit_nv_khoi');
    const elLoaiKT = document.getElementById('edit_nv_loaiKT');
    const elTrangThai = document.getElementById('edit_nv_trangthai');
    const elTG = document.getElementById('edit_nv_thoigian');
    const elSoLuot = document.getElementById('edit_nv_soluot');
    const elMo = document.getElementById('edit_nv_mo');
    const elDong = document.getElementById('edit_nv_dong');
    const elTinhChat = document.getElementById('edit_nv_tinhchat');

    const tenNV = elTen ? elTen.value.trim() : "";
    const khoi = elKhoi ? elKhoi.value : "";
    const loaiKT = elLoaiKT ? elLoaiKT.value : "";
    const trangThai = elTrangThai ? elTrangThai.value : "1";
    const tgLamBai = elTG ? (parseInt(elTG.value) || 0) : 0;
    const tinhChat = elTinhChat ? elTinhChat.value : "BAT_BUOC";
    const maHocLieuMoi = document.getElementById('edit_nv_maHL').value;


    let soLuot = elSoLuot ? (parseInt(elSoLuot.value) || 0) : 0;
    let mo = elMo ? elMo.value : null;
    let dong = elDong ? elDong.value : null;

    // 2. Xử lý danh sách lớp (Chỉ lấy nếu không phải bài tự do)
    let dsLopChon = [];
    if (tinhChat === "TU_DO") {
        dsLopChon = ["#LUYEN_TAP_TU_DO#"];
        soLuot = 0;
        dong = null;
    } else {
        const chkLop = document.querySelectorAll('.chk-lop-edit:checked');
        dsLopChon = Array.from(chkLop).map(chk => chk.value);
    }

    if (!tenNV || dsLopChon.length === 0) return alert("❌ Tên nhiệm vụ và Lớp giao không được để trống!");

    // 3. Cấu hình Đảo Đề (Kiểm tra an toàn)
    const elDao = document.getElementById('edit_nv_che_do_dao');
    let configDaoDe = { cau: false, abcd: false, ds: false };
    if (elDao) {
        if (elDao.value === CFG_NV.DAO_DE.CO_BAN) configDaoDe = { cau: true, abcd: true, ds: false };
        else if (elDao.value === CFG_NV.DAO_DE.TOAN_DIEN) configDaoDe = { cau: true, abcd: true, ds: true };
    }

    // 4. Cấu hình Công Bố (Kiểm tra an toàn cho các ô có thể bị ẩn)
    const elThoiDiem = document.getElementById('edit_nv_thoigiano');
    const elMucDo = document.getElementById('edit_nv_mucdo');
    const elGioHen = document.getElementById('edit_nv_giocongbo');

    let thoiDiem = elThoiDiem ? elThoiDiem.value : CFG_NV.THOI_DIEM.KHOA;
    let mucDo = elMucDo ? elMucDo.value : CFG_NV.MUC_DO.KHONG;

    if (thoiDiem === CFG_NV.THOI_DIEM.HEN_GIO && elGioHen) {
        const gioHen = elGioHen.value;
        if (!gioHen) return alert("❌ Thầy phải nhập Giờ công bộ!");
        thoiDiem = `${CFG_NV.THOI_DIEM.HEN_GIO}|${new Date(gioHen).toISOString()}`;
    }
    let configCongBo = { thoi_diem: thoiDiem, muc_do: (thoiDiem === CFG_NV.THOI_DIEM.KHOA) ? CFG_NV.MUC_DO.KHONG : mucDo };

    // 5. Gửi cập nhật
    btnNode.disabled = true;
    btnNode.innerText = "⏳ ĐANG LƯU...";

    try {
        const { error } = await _supabase
            .from('nhiem_vu_trac_nghiem')
            .update({
                ten_nhiem_vu: tenNV,
                khoi_lop: khoi,
                loai_kiem_tra: loaiKT,
                //danh_sach_lop: JSON.stringify(dsLopChon),
                ma_hoc_lieu: maHocLieuMoi,
                danh_sach_lop: dsLopChon,
                thoi_gian_lam_bai: tgLamBai,
                thoi_gian_mo: mo ? new Date(mo).toISOString() : null,
                thoi_gian_dong: dong ? new Date(dong).toISOString() : null,
                so_luot_lam_bai: soLuot,
                trang_thai: trangThai,
                dao_cau_hoi: configDaoDe,
                cau_hinh_dap_an: configCongBo
            })
            .eq('ma_nhiem_vu', maNhiemVu);

        if (error) throw error;

        alert("✅ Đã cập nhật Nhiệm Vụ thành công!");
        ham_7a_1_ve_quan_ly_nhiem_vu_trac_nghiem();

    } catch (error) {
        alert("Lỗi: " + error.message);
        btnNode.disabled = false;
        btnNode.innerText = "💾 LƯU CẬP NHẬT";
    }
}


// ==============================================================
// Hàm 7.8: Xóa Nhiệm Vụ (Có cảnh báo an toàn)
// ==============================================================
async function ham_7a_8_xoa_nhiem_vu_trac_nghiem(maNhiemVu) {
    // 1. Cảnh báo nguy hiểm trước khi thực thi
    const loiCanhBao = `⚠️ CẢNH BÁO NGUY HIỂM:\n\nThầy có chắc chắn muốn xóa vĩnh viễn nhiệm vụ [ ${maNhiemVu} ] không?\n\nLưu ý: Hành động này KHÔNG THỂ HOÀN TÁC. Toàn bộ kết quả thi, lịch sử làm bài của học sinh thuộc nhiệm vụ này cũng có thể bị xóa sạch!`;

    if (!confirm(loiCanhBao)) {
        return; // Nếu thầy bấm "Hủy / Cancel" thì dừng lại, không làm gì cả
    }

    try {
        // 2. Gửi lệnh Delete lên Supabase
        const { error } = await _supabase
            .from('nhiem_vu_trac_nghiem')
            .delete()
            .eq('ma_nhiem_vu', maNhiemVu);

        if (error) throw error;

        // 3. Thông báo thành công và tải lại bảng
        alert('🗑️ Đã xóa nhiệm vụ thành công!');
        ham_7a_2_tai_danh_sach_nhiem_vu_trac_nghiem();

    } catch (error) {
        alert('❌ Lỗi hệ thống khi xóa nhiệm vụ: ' + error.message);
    }
}


// ==============================================================
// Hàm 7.9: Kích hoạt lệnh ráp file lời giải (Issue Command)
// ==============================================================
async function ham_7a_9_kich_hoat_tao_file_giai_trac_nghiem(maNhiemVu) {
    if (!confirm("❓ Thầy muốn phát lệnh ráp file lời giải ngay bây giờ?\n\nHệ thống sẽ thu thập các câu hỏi từ Github và đóng gói thành file PDF/HTML bảo mật.")) return;

    try {
        const { error } = await _supabase
            .from('nhiem_vu_trac_nghiem')
            .update({
                trang_thai_loi_giai: CFG_NV.FILE_GIAI.DANG_CHO
            })
            .eq('ma_nhiem_vu', maNhiemVu);

        if (error) throw error;

        alert("✅ Đã phát lệnh thành công! Thầy vui lòng đợi vài phút để hệ thống đóng gói file.");

        // Tải lại dữ liệu và mở lại form để thấy trạng thái mới
        await ham_7a_2_tai_danh_sach_nhiem_vu_trac_nghiem();
        ham_7a_6_mo_form_nhiem_vu_trac_nghiem(maNhiemVu);

    } catch (error) {
        alert("❌ Lỗi khi phát lệnh: " + error.message);
    }
}



// [Nhãn thời gian: 19:35 - Ngày 28/05/2026] - Bản cập nhật Hàm 7.10: Hiển thị tự động cột Đã làm / Chưa làm
window.ham_7a_10_ve_bang_nhiem_vu_trac_nghiem = async function () {
    const renderArea = document.getElementById('danh-sach-nv-render');
    let dsNV = [...BangNhiemVuState.duLieu];

    if (dsNV.length === 0) {
        renderArea.innerHTML = `<div style="text-align: center; padding: 30px;"><h4>Chưa có nhiệm vụ nào.</h4></div>`;
        return;
    }

    // Bật hiệu ứng Loading nhẹ vì hệ thống cần vài mili-giây để tính toán chéo dữ liệu
    renderArea.innerHTML = `<div style="text-align: center; padding: 50px; color: #1a73e8;"><h3 style="margin:0;">⏳ Đang tính toán dữ liệu tiến độ lớp học...</h3></div>`;

    const nutLopActive = document.querySelector('.btn-loc-lop.active');
    const maLopDangChon = nutLopActive ? nutLopActive.getAttribute('onclick').match(/'([^']+)'/)[1] : 'TAT_CA';
    const oTimKiem = document.getElementById('input-tim-kiem-qlnv');
    const tuKhoa = oTimKiem ? oTimKiem.value.toLowerCase().trim() : '';

    // 🌟 1. LỌC DANH SÁCH TRƯỚC KHI FETCH (Tối ưu tốc độ)
    let dsHienThi = [];
    dsNV.forEach(nv => {
        const tenNvLower = (nv.ten_nhiem_vu || '').toLowerCase();
        const loaiNvLower = (nv.loai_nhiem_vu || '').toLowerCase();
        const maNvLower = (nv.ma_nhiem_vu || '').toLowerCase();

        let arrLop = [];
        let chuoiLopGoc = "";
        try {
            chuoiLopGoc = typeof nv.danh_sach_lop === 'string' ? nv.danh_sach_lop : JSON.stringify(nv.danh_sach_lop || []);
            arrLop = typeof nv.danh_sach_lop === 'string' ? JSON.parse(nv.danh_sach_lop) : (nv.danh_sach_lop || []);
        } catch (e) { }

        const isLuyenTapTuDo = (nv.tinh_chat_bai_tap === 'TU_DO' || chuoiLopGoc.includes("LUYEN_TAP_TU_DO"));
        const isLiveTask = maNvLower.startsWith('live_');

        let hopLeLop = false;
        if (maLopDangChon === 'TAT_CA') { hopLeLop = !isLiveTask && !isLuyenTapTuDo; }
        else if (maLopDangChon === 'TU_DO') { hopLeLop = isLuyenTapTuDo && !isLiveTask; }
        else if (maLopDangChon === 'LIVE') { hopLeLop = isLiveTask; }
        else { if (arrLop.includes(maLopDangChon)) hopLeLop = true; }

        const hopLeTimKiem = (tuKhoa === '' || tenNvLower.includes(tuKhoa) || loaiNvLower.includes(tuKhoa) || maNvLower.includes(tuKhoa) || chuoiLopGoc.toLowerCase().includes(tuKhoa));

        if (hopLeLop && hopLeTimKiem) {
            nv._arrLop = arrLop;
            nv._isLuyenTapTuDo = isLuyenTapTuDo;
            nv._isLiveTask = isLiveTask;
            dsHienThi.push(nv);
        }
    });

    if (dsHienThi.length === 0) {
        renderArea.innerHTML = `<div style="text-align: center; padding: 30px;"><h4>Không tìm thấy nhiệm vụ nào phù hợp với bộ lọc.</h4></div>`;
        return;
    }

    // 🌟 2. FETCH VÀ ĐẾM SỐ LƯỢNG HỌC SINH (Siêu tốc độ)
    let tuDienKQ = {};
    const mangMaNVHienThi = dsHienThi.map(nv => nv.ma_nhiem_vu);

    try {
        if (mangMaNVHienThi.length > 0) {
            // Lấy danh sách điểm số nộp bài chính thức
            const { data: dsKQ } = await _supabase.from('ket_qua_trac_nghiem').select('ma_nhiem_vu, uid_hoc_sinh').in('ma_nhiem_vu', mangMaNVHienThi);
            if (dsKQ) {
                dsKQ.forEach(kq => {
                    if (!tuDienKQ[kq.ma_nhiem_vu]) tuDienKQ[kq.ma_nhiem_vu] = new Set();
                    tuDienKQ[kq.ma_nhiem_vu].add(kq.uid_hoc_sinh); // Set() giúp tự động lọc trùng
                });
            }
        }

        // Tải danh sách toàn bộ học sinh để đếm "Chưa làm"
        const { data: dsHS } = await _supabase.from('hoc_sinh').select('uid, danh_sach_ma_lop');
        window._tempDsHsThongKe = dsHS || [];

        // Nếu là tab Đấu trường Live, vớt thêm những em đang thi trên sóng
        const mangLive = dsHienThi.filter(nv => nv._isLiveTask).map(nv => nv.ma_nhiem_vu.replace('LIVE_', '').replace('live_', ''));
        if (mangLive.length > 0) {
            const { data: dsLive } = await _supabase.from('tien_do_live_quiz').select('ma_phong, uid_hoc_sinh').in('ma_phong', mangLive);
            if (dsLive) {
                dsLive.forEach(td => {
                    const maNVAo = 'LIVE_' + td.ma_phong;
                    if (!tuDienKQ[maNVAo]) tuDienKQ[maNVAo] = new Set();
                    tuDienKQ[maNVAo].add(td.uid_hoc_sinh);
                });
            }
        }
    } catch (e) { console.warn("Lỗi tính toán thống kê:", e); }

    // 🌟 3. VẼ GIAO DIỆN BẢNG
    const taoThSort = (cotDB, tenHienThi, width = '') => {
        let icon = "<span style='color:#ccc; font-size:10px; margin-left:5px;'>↕️</span>";
        let bgStyle = "";
        if (BangNhiemVuState.cotDangSort === cotDB) {
            icon = BangNhiemVuState.tangDan ? "<span style='color:#d35400; font-size:12px; margin-left:5px;'>🔼</span>" : "<span style='color:#d35400; font-size:12px; margin-left:5px;'>🔽</span>";
            bgStyle = "background-color: #e6f2ff;";
        }
        return `<th onclick="ham_7_11_sort_nhiem_vu('${cotDB}')" style="padding: 12px 10px; border: 1px solid #eee; width: ${width}; cursor: pointer; user-select: none; transition: 0.2s; ${bgStyle}" onmouseover="this.style.backgroundColor='#e2e6ea'" onmouseout="this.style.backgroundColor='${bgStyle ? '#e6f2ff' : 'transparent'}'">${tenHienThi} ${icon}</th>`;
    };

    let htmlTable = `
        <div style="overflow-x: auto; border: 1px solid #dee2e6; border-radius: 8px;">
            <table style="width: 100%; min-width: 1500px; border-collapse: collapse; background: white; font-size: 13px;">
                <thead style="background: #f8f9fa; border-bottom: 2px solid #dee2e6;">
                    <tr>
                        <th style="padding: 12px 10px; border: 1px solid #eee; width: 40px;">STT</th>
                        <th style="padding: 12px 10px; border: 1px solid #eee; width: 160px; text-align: center;">Thao tác</th>
                        ${taoThSort('ma_nhiem_vu', 'Mã NV', '110px')}
                        ${taoThSort('ten_nhiem_vu', 'Tên Nhiệm Vụ', '150px')}
                        ${taoThSort('danh_sach_lop', 'Giao Cho', '120px')}
                        <th style="padding: 12px 10px; border: 1px solid #eee; width: 100px; text-align: center;">Tiến Độ HS</th>
                        ${taoThSort('loai_nhiem_vu', 'Loại NV', '90px')}
                        ${taoThSort('thoi_gian_mo', 'Mở Lúc')}
                        ${taoThSort('thoi_gian_dong', 'Đóng Lúc')}
                        ${taoThSort('dao_cau_hoi', 'Đảo Đề', '120px')}
                        ${taoThSort('trang_thai', 'Tình Trạng')}
                    </tr>
                </thead>
                <tbody>
    `;

    const now = new Date();
    const tinhKhoangThoiGian = (targetDate, isPast) => {
        if (!targetDate) return "";
        const diff = isPast ? (now - targetDate) : (targetDate - now);
        if (diff <= 0) return isPast ? "vừa xong" : "hết hạn";
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diff / (1000 * 60)) % 60);
        let result = [];
        if (d > 0) result.push(`${d}n`);
        if (h > 0) result.push(`${h}g`);
        if (m > 0 && d === 0) result.push(`${m}p`);
        return isPast ? `(đã mở ${result.join(' ')})` : `(còn ${result.join(' ')})`;
    };

    let sttChayHienTai = 1;

    dsHienThi.forEach((nv) => {
        const timeMo = nv.thoi_gian_mo ? new Date(nv.thoi_gian_mo) : null;
        const timeDong = nv.thoi_gian_dong ? new Date(nv.thoi_gian_dong) : null;

        
        let loaiHienThi = "❓ Khác"; let badgeColor = "#6c757d";
        if (nv._isLiveTask) { loaiHienThi = "🔥 Live Quiz"; badgeColor = "#e74c3c"; }
        else if (nv.loai_nhiem_vu === "Làm đề (Online)") { loaiHienThi = "📝 Làm đề"; badgeColor = "#17a2b8"; }
        else if (nv.loai_nhiem_vu) { loaiHienThi = nv.loai_nhiem_vu; }

        const htmlLoaiNV = `<span style="display:inline-block; padding:5px 8px; background:${badgeColor}15; color:${badgeColor}; border: 1px solid ${badgeColor}40; border-radius:6px; font-weight:bold; font-size:11px; white-space:nowrap;">${loaiHienThi}</span>`;

        let hienThiLop = nv._arrLop.map(ma => {
            if (ma === "#LUYEN_TAP_TU_DO#") {
                if (nv._isLiveTask) return `<div style="margin-top: 5px;"><span style="background:#e74c3c; color:white; padding:4px 10px; border-radius:12px; font-weight:bold; font-size:11px;">🔴 ĐẤU TRƯỜNG</span></div>`;
                return `<div style="margin-top: 5px;"><span style="background:#17a2b8; color:white; padding:4px 10px; border-radius:12px; font-weight:bold; font-size:11px;">🌍 TỰ DO</span></div>`;
            }
            const lopObj = window.tempDsLop?.find(l => (l.ma_lop || l.ma || l.id) === ma);
            return `<div style="margin-bottom:2px;"><b>${lopObj ? (lopObj.ten_lop || lopObj.ten) : "Lớp ẩn"}</b> <small style="color:#666;">(${ma})</small></div>`;
        }).join('');

        // 🌟 TÍNH TOÁN HIỂN THỊ TIẾN ĐỘ (ĐÃ LÀM / CHƯA LÀM)
        let soDaLam = tuDienKQ[nv.ma_nhiem_vu] ? tuDienKQ[nv.ma_nhiem_vu].size : 0;
        let tongGiao = 0;

        if (!nv._isLiveTask && !nv._isLuyenTapTuDo && window._tempDsHsThongKe) {
            let setHS = new Set();
            window._tempDsHsThongKe.forEach(hs => {
                let lopCuaEm = [];
                try { lopCuaEm = typeof hs.danh_sach_ma_lop === 'string' ? JSON.parse(hs.danh_sach_ma_lop) : (hs.danh_sach_ma_lop || []); } catch (e) { }
                if (lopCuaEm.some(m => nv._arrLop.includes(m))) setHS.add(hs.uid);
            });
            tongGiao = setHS.size;
        }

        let htmlTienDo = '';
        if (nv._isLiveTask || nv._isLuyenTapTuDo) {
            htmlTienDo = `
                <div style="font-size: 12px; background: #f8f9fa; padding: 6px; border-radius: 6px; border: 1px solid #e9ecef; box-shadow: inset 0 1px 2px rgba(0,0,0,0.05);">
                    <div style="color:#28a745; font-weight:bold; margin-bottom: 3px;">✅ Đã làm: ${soDaLam}</div>
                    <div style="color:#6c757d; font-style:italic;">⏳ Chưa làm: -</div>
                </div>`;
        } else {
            let soChuaLam = Math.max(0, tongGiao - soDaLam);
            htmlTienDo = `
                <div style="font-size: 12px; background: #f8f9fa; padding: 6px; border-radius: 6px; border: 1px solid #e9ecef; box-shadow: inset 0 1px 2px rgba(0,0,0,0.05);">
                    <div style="color:#28a745; font-weight:900; margin-bottom: 3px;">✅ Đã làm: ${soDaLam}</div>
                    <div style="color:#dc3545; font-weight:bold;">⏳ Chưa làm: ${soChuaLam}</div>
                </div>`;
        }

        let txtDaoDe = "<span style='color:#999; font-size: 12px;'>❌ Không đảo</span>";
        if (nv.dao_cau_hoi) {
            try {
                const d = typeof nv.dao_cau_hoi === 'string' ? JSON.parse(nv.dao_cau_hoi) : nv.dao_cau_hoi;
                if (d.cau && d.abcd && d.ds) txtDaoDe = "<div style='color:#d35400; font-weight:bold; font-size:11px; line-height:1.5;'>🌪️ Đảo Câu+ABCD<br>+Ý Đúng/Sai</div>";
                else if (d.cau && d.abcd) txtDaoDe = "<div style='color:#28a745; font-weight:bold; font-size:11px;'>🔀 Đảo Câu+ABCD</div>";
            } catch (e) { }
        }

        const fTime = (d) => d ? d.toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }) : "-";

        // ====================================================================
        // 🌟 MỚI: PHÂN NHÁNH NÚT "CHẤM" THEO TỪNG LOẠI NHIỆM VỤ
        // ====================================================================
        let htmlNutCham = "";
        
        if (nv.loai_nhiem_vu === "Làm đề (Online)" || nv._isLiveTask) {
            // Chấm trắc nghiệm: Gọi hàm tính điểm tự động, hiển thị icon vòng lặp
            htmlNutCham = `<button onclick="ham_7a_18_gv_cham_lai_ca_lop_trac_nghiem('${nv.ma_nhiem_vu}')" title="Chấm lại toàn bộ điểm trắc nghiệm cho nhiệm vụ này" style="padding: 6px; background: #e67e22; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; font-size: 11px; width: 100%; box-shadow: 0 1px 2px rgba(0,0,0,0.1);">🔄 Chấm lại TN</button>`;
        }

        htmlTable += `
            <tr style="border-bottom: 1px solid #eee; transition: 0.2s; ${nv._isLiveTask ? 'background: #fdf2f2;' : (nv._isLuyenTapTuDo ? 'background: #f0fbfd;' : '')}" onmouseover="this.style.background='${nv._isLiveTask ? '#fadbd8' : (nv._isLuyenTapTuDo ? '#e0f7fa' : '#f4f8ff')}'" onmouseout="this.style.background='${nv._isLiveTask ? '#fdf2f2' : (nv._isLuyenTapTuDo ? '#f0fbfd' : 'white')}'">
                <td style="padding: 10px; text-align: center; font-weight: bold; color: #666;">${sttChayHienTai++}</td>
                
                <td style="padding: 10px; text-align: center;">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; width: 150px; margin: 0 auto;">
                        <button onclick="ham_7a_6_mo_form_nhiem_vu_trac_nghiem('${nv.ma_nhiem_vu}')" style="padding: 6px; background: #ffc107; color: #333; border:none; border-radius:4px; font-weight:bold; cursor:pointer; font-size: 11px; width: 100%; box-shadow: 0 1px 2px rgba(0,0,0,0.1);">✏️ Sửa</button>
                        <button onclick="ham_7a_8_xoa_nhiem_vu_trac_nghiem('${nv.ma_nhiem_vu}')" style="padding: 6px; background: #dc3545; color: white; border:none; border-radius:4px; font-weight:bold; cursor:pointer; font-size: 11px; width: 100%; box-shadow: 0 1px 2px rgba(0,0,0,0.1);">❌ Xóa</button>
                        <button onclick="ham_7a_15_thong_ke_nhiem_vu_trac_nghiem('${nv.ma_nhiem_vu}', '${nv.ten_nhiem_vu.replace(/'/g, "\\'")}')" style="padding: 6px; background: #6f42c1; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; font-size: 11px; width: 100%; box-shadow: 0 1px 2px rgba(0,0,0,0.1);">📊 K.Quả</button>
                        ${htmlNutCham}

                    </div>
                </td>

                <td style="padding: 10px; font-weight: bold; color: ${nv._isLiveTask ? '#e74c3c' : (nv._isLuyenTapTuDo ? '#17a2b8' : '#6f42c1')};">${nv.ma_nhiem_vu}</td>
                
                
                <td style="padding: 10px;">
                    <div style="font-weight: bold; margin-bottom: 2px;">${nv.ten_nhiem_vu}</div>
                    ${window.ham_7a_24_tao_nhan_cau_truc_tu_metadata(nv.metadata_hoc_lieu)}
                    <div style="margin-top: 4px;">
                        <small style="color:#888;">HL: ${nv.ma_hoc_lieu || 'Không'}</small>
                    </div>
                </td>
                
                
                <td style="padding: 10px; color: #1a73e8;">${hienThiLop}</td>
                
                <td style="padding: 10px; text-align: center;">${htmlTienDo}</td>
                <td style="padding: 10px; text-align: center;">${htmlLoaiNV}</td>
                
                <td style="padding: 10px; text-align: center;">${fTime(timeMo)}<br><small style="color:#28a745;">${nv.trang_thai != 0 && timeMo && now > timeMo ? tinhKhoangThoiGian(timeMo, true) : ""}</small></td>
                <td style="padding: 10px; text-align: center;">${fTime(timeDong)}<br><small style="color:#d35400;">${nv.trang_thai != 0 && timeDong && timeDong > now ? tinhKhoangThoiGian(timeDong, false) : ""}</small></td>
                <td style="padding: 10px; text-align: center;">${txtDaoDe}</td>
                <td style="padding: 10px; text-align: center;">
                    ${nv.trang_thai == 0 ? '<span style="color:#999; font-weight:bold;">⏸️ ĐÃ KHÓA</span>' : (timeDong && now > timeDong ? '<span style="color:#dc3545; font-weight:bold;">🛑 ĐÃ ĐÓNG</span>' : '<span style="color:#28a745; font-weight:bold;">▶️ ĐANG MỞ</span>')}
                </td>
            </tr>
        `;
    });

    htmlTable += `</tbody></table></div>`;
    renderArea.innerHTML = htmlTable;
};


// window.ham_7a_10_ve_bang_nhiem_vu_trac_nghiem = async function () {
//     const renderArea = document.getElementById('danh-sach-nv-render');
//     let dsNV = [...BangNhiemVuState.duLieu];

//     if (dsNV.length === 0) {
//         renderArea.innerHTML = `<div style="text-align: center; padding: 30px;"><h4>Chưa có nhiệm vụ nào.</h4></div>`;
//         return;
//     }

//     renderArea.innerHTML = `<div style="text-align: center; padding: 50px; color: #1a73e8;"><h3 style="margin:0;">⏳ Đang tính toán dữ liệu tiến độ lớp học...</h3></div>`;

//     const nutLopActive = document.querySelector('.btn-loc-lop.active');
//     const maLopDangChon = nutLopActive ? nutLopActive.getAttribute('onclick').match(/'([^']+)'/)[1] : 'TAT_CA';
//     const oTimKiem = document.getElementById('input-tim-kiem-qlnv');
//     const tuKhoa = oTimKiem ? oTimKiem.value.toLowerCase().trim() : '';

//     let dsHienThi = [];
//     dsNV.forEach(nv => {
//         const tenNvLower = (nv.ten_nhiem_vu || '').toLowerCase();
//         const loaiNvLower = (nv.loai_nhiem_vu || '').toLowerCase();
//         const maNvLower = (nv.ma_nhiem_vu || '').toLowerCase();

//         let arrLop = [];
//         let chuoiLopGoc = "";
//         try {
//             chuoiLopGoc = typeof nv.danh_sach_lop === 'string' ? nv.danh_sach_lop : JSON.stringify(nv.danh_sach_lop || []);
//             arrLop = typeof nv.danh_sach_lop === 'string' ? JSON.parse(nv.danh_sach_lop) : (nv.danh_sach_lop || []);
//         } catch (e) { }

//         const isLuyenTapTuDo = (nv.tinh_chat_bai_tap === 'TU_DO' || chuoiLopGoc.includes("LUYEN_TAP_TU_DO"));
//         const isLiveTask = maNvLower.startsWith('live_');

//         let hopLeLop = false;
//         if (maLopDangChon === 'TAT_CA') { hopLeLop = !isLiveTask && !isLuyenTapTuDo; }
//         else if (maLopDangChon === 'TU_DO') { hopLeLop = isLuyenTapTuDo && !isLiveTask; }
//         else if (maLopDangChon === 'LIVE') { hopLeLop = isLiveTask; }
//         else { if (arrLop.includes(maLopDangChon)) hopLeLop = true; }

//         const hopLeTimKiem = (tuKhoa === '' || tenNvLower.includes(tuKhoa) || loaiNvLower.includes(tuKhoa) || maNvLower.includes(tuKhoa) || chuoiLopGoc.toLowerCase().includes(tuKhoa));

//         if (hopLeLop && hopLeTimKiem) {
//             nv._arrLop = arrLop;
//             nv._isLuyenTapTuDo = isLuyenTapTuDo;
//             nv._isLiveTask = isLiveTask;
//             dsHienThi.push(nv);
//         }
//     });

//     if (dsHienThi.length === 0) {
//         renderArea.innerHTML = `<div style="text-align: center; padding: 30px;"><h4>Không tìm thấy nhiệm vụ nào phù hợp với bộ lọc.</h4></div>`;
//         return;
//     }

//     let tuDienKQ = {};
//     const mangMaNVHienThi = dsHienThi.map(nv => nv.ma_nhiem_vu);

//     try {
//         if (mangMaNVHienThi.length > 0) {
//             const { data: dsKQ } = await _supabase.from('ket_qua_trac_nghiem').select('ma_nhiem_vu, uid_hoc_sinh').in('ma_nhiem_vu', mangMaNVHienThi);
//             if (dsKQ) {
//                 dsKQ.forEach(kq => {
//                     if (!tuDienKQ[kq.ma_nhiem_vu]) tuDienKQ[kq.ma_nhiem_vu] = new Set();
//                     tuDienKQ[kq.ma_nhiem_vu].add(kq.uid_hoc_sinh);
//                 });
//             }
//         }
//         const { data: dsHS } = await _supabase.from('hoc_sinh').select('uid, danh_sach_ma_lop');
//         window._tempDsHsThongKe = dsHS || [];
//     } catch (e) { console.warn("Lỗi tính toán thống kê:", e); }

//     const taoThSort = (cotDB, tenHienThi, width = '') => {
//         let icon = "<span style='color:#ccc; font-size:10px; margin-left:5px;'>↕️</span>";
//         let bgStyle = "";
//         if (BangNhiemVuState.cotDangSort === cotDB) {
//             icon = BangNhiemVuState.tangDan ? "<span style='color:#d35400; font-size:12px; margin-left:5px;'>🔼</span>" : "<span style='color:#d35400; font-size:12px; margin-left:5px;'>🔽</span>";
//             bgStyle = "background-color: #e6f2ff;";
//         }
//         return `<th onclick="ham_7_11_sort_nhiem_vu('${cotDB}')" style="padding: 12px 10px; border: 1px solid #eee; width: ${width}; cursor: pointer; user-select: none; transition: 0.2s; ${bgStyle}">${tenHienThi} ${icon}</th>`;
//     };

//     let htmlTable = `
//         <div style="overflow-x: auto; border: 1px solid #dee2e6; border-radius: 8px;">
//             <table style="width: 100%; min-width: 1500px; border-collapse: collapse; background: white; font-size: 13px;">
//                 <thead style="background: #f8f9fa; border-bottom: 2px solid #dee2e6;">
//                     <tr>
//                         <th style="padding: 12px 10px; border: 1px solid #eee; width: 40px;">STT</th>
//                         <th style="padding: 12px 10px; border: 1px solid #eee; width: 160px; text-align: center;">Thao tác</th>
//                         ${taoThSort('ma_nhiem_vu', 'Mã NV', '110px')}
//                         ${taoThSort('ten_nhiem_vu', 'Tên Nhiệm Vụ', '150px')}
//                         ${taoThSort('danh_sach_lop', 'Giao Cho', '120px')}
//                         <th style="padding: 12px 10px; border: 1px solid #eee; width: 100px; text-align: center;">Tiến Độ HS</th>
//                         ${taoThSort('loai_nhiem_vu', 'Loại NV', '90px')}
//                         ${taoThSort('thoi_gian_mo', 'Mở Lúc')}
//                         ${taoThSort('thoi_gian_dong', 'Đóng Lúc')}
//                         ${taoThSort('dao_cau_hoi', 'Đảo Đề', '120px')}
//                         ${taoThSort('trang_thai', 'Tình Trạng')}
//                     </tr>
//                 </thead>
//                 <tbody>`;

//     const now = new Date();
//     const tinhKhoangThoiGian = (targetDate, isPast) => {
//         if (!targetDate) return "";
//         const diff = isPast ? (now - targetDate) : (targetDate - now);
//         if (diff <= 0) return isPast ? "vừa xong" : "hết hạn";
//         const d = Math.floor(diff / (1000 * 60 * 60 * 24));
//         const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
//         const m = Math.floor((diff / (1000 * 60)) % 60);
//         let result = [];
//         if (d > 0) result.push(`${d}n`);
//         if (h > 0) result.push(`${h}g`);
//         if (m > 0 && d === 0) result.push(`${m}p`);
//         return isPast ? `(đã mở ${result.join(' ')})` : `(còn ${result.join(' ')})`;
//     };

//     let sttChayHienTai = 1;
//     dsHienThi.forEach((nv) => {
//         const timeMo = nv.thoi_gian_mo ? new Date(nv.thoi_gian_mo) : null;
//         const timeDong = nv.thoi_gian_dong ? new Date(nv.thoi_gian_dong) : null;
        
//         // 🌟 LẤY CẤU TRÚC HỌC LIỆU
//         const htmlCauTruc = window.ham_7a_24_tao_nhan_cau_truc_tu_metadata(nv.metadata_hoc_lieu);

//         let loaiHienThi = "❓ Khác"; let badgeColor = "#6c757d";
//         if (nv._isLiveTask) { loaiHienThi = "🔥 Live Quiz"; badgeColor = "#e74c3c"; }
//         else if (nv.loai_nhiem_vu === "Làm đề (Online)") { loaiHienThi = "📝 Làm đề"; badgeColor = "#17a2b8"; }
//         else if (nv.loai_nhiem_vu) { loaiHienThi = nv.loai_nhiem_vu; }

//         let htmlLoaiNV = `<span style="display:inline-block; padding:5px 8px; background:${badgeColor}15; color:${badgeColor}; border: 1px solid ${badgeColor}40; border-radius:6px; font-weight:bold; font-size:11px; white-space:nowrap;">${loaiHienThi}</span>`;

//         let hienThiLop = nv._arrLop.map(ma => {
//             const lopObj = window.tempDsLop?.find(l => (l.ma_lop || l.ma || l.id) === ma);
//             return `<div style="margin-bottom:2px;"><b>${lopObj ? (lopObj.ten_lop || lopObj.ten) : "Lớp ẩn"}</b></div>`;
//         }).join('');

//         let soDaLam = tuDienKQ[nv.ma_nhiem_vu] ? tuDienKQ[nv.ma_nhiem_vu].size : 0;
//         let tongGiao = 0;
//         if (!nv._isLiveTask && !nv._isLuyenTapTuDo && window._tempDsHsThongKe) {
//             let setHS = new Set();
//             window._tempDsHsThongKe.forEach(hs => {
//                 let lopCuaEm = [];
//                 try { lopCuaEm = typeof hs.danh_sach_ma_lop === 'string' ? JSON.parse(hs.danh_sach_ma_lop) : (hs.danh_sach_ma_lop || []); } catch (e) { }
//                 if (lopCuaEm.some(m => nv._arrLop.includes(m))) setHS.add(hs.uid);
//             });
//             tongGiao = setHS.size;
//         }

//         let htmlTienDo = nv._isLiveTask || nv._isLuyenTapTuDo ? `<div style="color:#28a745; font-weight:bold;">✅ Đã làm: ${soDaLam}</div>` : `<div style="color:#28a745; font-weight:bold;">✅ ${soDaLam}</div><div style="color:#dc3545; font-weight:bold;">⏳ ${Math.max(0, tongGiao - soDaLam)}</div>`;

//         let txtDaoDe = nv.dao_cau_hoi ? "🌪️ Có đảo" : "❌ Không";
//         const fTime = (d) => d ? d.toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }) : "-";

//         htmlTable += `
//             <tr style="border-bottom: 1px solid #eee;">
//                 <td style="padding: 10px; text-align: center;">${sttChayHienTai++}</td>
//                 <td style="padding: 10px;">
//                     <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px;">
//                         <button onclick="ham_7a_6_mo_form_nhiem_vu_trac_nghiem('${nv.ma_nhiem_vu}')" class="btn btn-sm btn-warning">✏️</button>
//                         <button onclick="ham_7a_8_xoa_nhiem_vu_trac_nghiem('${nv.ma_nhiem_vu}')" class="btn btn-sm btn-danger">❌</button>
//                     </div>
//                 </td>
//                 <td style="padding: 10px;">${nv.ma_nhiem_vu}</td>
//                 <td style="padding: 10px;"><b>${nv.ten_nhiem_vu}</b> ${htmlCauTruc}</td>
//                 <td style="padding: 10px;">${hienThiLop}</td>
//                 <td style="padding: 10px; text-align: center;">${htmlTienDo}</td>
//                 <td style="padding: 10px;">${htmlLoaiNV}</td>
//                 <td style="padding: 10px;">${fTime(timeMo)}</td>
//                 <td style="padding: 10px;">${fTime(timeDong)}</td>
//                 <td style="padding: 10px;">${txtDaoDe}</td>
//                 <td style="padding: 10px;">${nv.trang_thai == 1 ? "✅ Mở" : "⏸️ Khóa"}</td>
//             </tr>`;
//     });

//     htmlTable += `</tbody></table></div>`;
//     renderArea.innerHTML = htmlTable;
// };



// ==============================================================
// CÁC HÀM BỔ TRỢ XỬ LÝ GIAO DIỆN (UI LOGIC)
// ==============================================================

// ==============================================================
// Hàm 7.11: Xử lý Logic Sắp xếp (Sort) cho Bảng Nhiệm Vụ
// ==============================================================





function ham_7a_11_sort_nhiem_vu_trac_nghiem(cotSort) {
    // 1. Đảo chiều nếu bấm lại cột cũ, hoặc mặc định Tăng dần nếu bấm cột mới
    if (BangNhiemVuState.cotDangSort === cotSort) {
        BangNhiemVuState.tangDan = !BangNhiemVuState.tangDan;
    } else {
        BangNhiemVuState.cotDangSort = cotSort;
        BangNhiemVuState.tangDan = true;
    }

    const isAsc = BangNhiemVuState.tangDan;

    // 2. Chạy thuật toán sắp xếp mảng
    BangNhiemVuState.duLieu.sort((a, b) => {
        let valA = a[cotSort];
        let valB = b[cotSort];

        // Xử lý giá trị rỗng (đẩy xuống cuối hoặc lên đầu tùy chiều)
        if (valA === null || valA === undefined) valA = '';
        if (valB === null || valB === undefined) valB = '';

        // Ép kiểu dữ liệu đặc thù để sort chính xác
        if (cotSort === 'thoi_gian_mo' || cotSort === 'thoi_gian_dong') {
            valA = valA ? new Date(valA).getTime() : (isAsc ? Infinity : -Infinity);
            valB = valB ? new Date(valB).getTime() : (isAsc ? Infinity : -Infinity);
        } else if (cotSort === 'so_luot_lam_bai') {
            valA = Number(valA) || 0;
            valB = Number(valB) || 0;
        } else if (typeof valA === 'object' || typeof valB === 'object') {
            // Dành cho cột jsonb như danh_sach_lop, dao_cau_hoi
            valA = JSON.stringify(valA);
            valB = JSON.stringify(valB);
        }

        // So sánh chuỗi
        if (typeof valA === 'string' && typeof valB === 'string') {
            return isAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }

        // So sánh số
        return isAsc ? (valA > valB ? 1 : -1) : (valA < valB ? 1 : -1);
    });

    // 3. Gọi vẽ lại bảng
    ham_7a_10_ve_bang_nhiem_vu_trac_nghiem();
}



// =====================================================================
// Hàm Bổ trợ: Tự động bóc tách Text từ Combobox và Copy vào Clipboard
// =====================================================================
window.ham_7a_12_copy_text_combobox_trac_nghiem = function(idSelect, btnNode) {
    const selectEl = document.getElementById(idSelect);
    if (!selectEl) return;

    // Kiểm tra nếu chưa chọn học liệu
    if (selectEl.value === "" || selectEl.value === "KHONG_DUNG") {
        if (typeof Swal !== 'undefined') {
            Swal.fire('Chú ý', 'Thầy vui lòng chọn một học liệu trước khi copy!', 'info');
        } else {
            alert('Vui lòng chọn học liệu trước khi copy!');
        }
        return;
    }

    // Lấy nội dung hiển thị của mục đang được chọn
    const textToCopy = selectEl.options[selectEl.selectedIndex].text;

    // Ghi vào bộ nhớ tạm (Clipboard)
    navigator.clipboard.writeText(textToCopy).then(() => {
        // Hiệu ứng UX: Đổi màu nút để báo hiệu thành công
        const mauGoc = btnNode.style.background;
        const chuGoc = btnNode.innerHTML;
        
        btnNode.style.background = "#28a745";
        btnNode.style.color = "white";
        btnNode.innerHTML = "✅ Đã Copy!";
        
        // Trả lại trạng thái cũ sau 1.5 giây
        setTimeout(() => {
            btnNode.style.background = mauGoc;
            btnNode.style.color = "#495057";
            btnNode.innerHTML = chuGoc;
        }, 1500);
    }).catch(err => {
        console.error('Lỗi copy:', err);
        alert('Trình duyệt của thầy chặn quyền Copy. Vui lòng kiểm tra lại cài đặt.');
    });
};




// BẪY LỖI SỐ 2: BẮT CÁC LỖI NGẦM TRONG HÀM TẢI DỮ LIỆU (ASYNC/AWAIT)
window.onunhandledrejection = function (event) {
    alert(`🚨 LỖI TẢI DỮ LIỆU NGẦM (PROMISE):\n\nChi tiết: ${event.reason}\n\nHãy chụp màn hình này lại!`);
};


// ==============================================================
// [Nhãn thời gian: 11:10 - Ngày 29/05/2026] - Hàm 7.10: Ráp File Lời Giải Gộp (Không cần Nhiệm vụ ảo)
// ==============================================================
window.ham_7a_13_ra_lenh_tao_file_giai_trac_nghiem = async function (idHocLieuThamChieu, maHocLieu) {
    if (!confirm("🚀 Bắt đầu quá trình gom file lời giải cho học liệu này?")) return;

    if (typeof CFG_HE_THONG === 'undefined') {
        alert("❌ Lỗi: Chưa tìm thấy file cấu hình CFG_HE_THONG.");
        return;
    }

    const GITHUB_TOKEN = CFG_HE_THONG.GITHUB_TOKEN;
    const GITHUB_REPO = CFG_HE_THONG.GITHUB_REPO;
    const BASE_URL_KHO_GIAI_LE = CFG_HE_THONG.KHO_GIAI_LE_URL;

    const divNut = document.getElementById('khu-vuc-nut-file');
    if (divNut) divNut.innerHTML = `<button disabled style="padding:8px 15px; background:#ffc107; color:#333; border:none; border-radius:4px; font-weight:bold; cursor:wait;">⏳ ĐANG GỘP FILE GIẢI...</button>`;

    try {
        // 1. Tải dữ liệu Học liệu
        const { data: dataHL, error: errHL } = await _supabase
            .from('hoc_lieu_trac_nghiem')
            .select('danh_sach_cau_hoi')
            .eq('ma_hoc_lieu', maHocLieu)
            .single();

        if (errHL || !dataHL) throw new Error("Không tải được dữ liệu Học liệu!");

        let dsCauHoi = dataHL.danh_sach_cau_hoi;
        if (typeof dsCauHoi === 'string') { try { dsCauHoi = JSON.parse(dsCauHoi); } catch (e) { dsCauHoi = []; } }
        if (!Array.isArray(dsCauHoi)) dsCauHoi = [];

        let danhSachLoiGiaiDaGhep = [];

        // 2. Vòng lặp tải từng file giải lẻ
        for (let item of dsCauHoi) {
            let maLoiGiai = item.ma_loi_giai || item.maBaoMat || "";
            let dapAnDB = item.dap_an || item.dapAn || "";

            if (!maLoiGiai) continue;

            let tenFileGiai = maLoiGiai.endsWith('.json') ? maLoiGiai : maLoiGiai + '.json';

            try {
                let res = await fetch(`${BASE_URL_KHO_GIAI_LE}/${tenFileGiai}`);
                if (res.ok) {
                    let dataCau = await res.json();
                    danhSachLoiGiaiDaGhep.push({
                        maBaoMat: maLoiGiai,
                        dapAn: dataCau.dapAn || dataCau.dap_an || dapAnDB,
                        loiGiaiHtml: dataCau.loiGiai || dataCau.loiGiaiHtml || ""
                    });
                } else {
                    danhSachLoiGiaiDaGhep.push({ maBaoMat: maLoiGiai, dapAn: dapAnDB, loiGiaiHtml: "Chưa có lời giải chi tiết." });
                }
            } catch (e) {
                danhSachLoiGiaiDaGhep.push({ maBaoMat: maLoiGiai, dapAn: dapAnDB, loiGiaiHtml: "Lỗi tải giải." });
            }
        }

        // 3. Đóng gói JSON
        const fileContent = JSON.stringify({
            thoiGianGhep: new Date().toISOString(),
            danhSachLoiGiai: danhSachLoiGiaiDaGhep
        }, null, 2);

        const utf8ToBase64 = (str) => btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (m, p1) => String.fromCharCode('0x' + p1)));
        const encodedContent = utf8ToBase64(fileContent);

        // 4. Đẩy lên GitHub
        const randomHash = Math.random().toString(36).substring(2, 8) + '_' + Date.now().toString(36);
        const tenFileGithub = `Ngan_Hang_Giai_Gop/GiaiGop_${maHocLieu}_${randomHash}.json`;
        const githubApiUrl = `https://api.github.com/repos/${GITHUB_REPO}/contents/${tenFileGithub}`;

        const putRes = await fetch(githubApiUrl, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${GITHUB_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: `Gom file giải gộp cho học liệu ${maHocLieu}`,
                content: encodedContent
            })
        });

        if (!putRes.ok) throw new Error("Github từ chối lưu file.");

        const putData = await putRes.json();
        const linkFileGiai = putData.content?.download_url || `https://raw.githubusercontent.com/${GITHUB_REPO}/main/${tenFileGithub}`;

        // 5. Cập nhật link trực tiếp vào bảng hoc_lieu
        const { error: errUpdate } = await _supabase
            .from('hoc_lieu_trac_nghiem')
            .update({ url_file_giai: linkFileGiai })
            .eq('ma_hoc_lieu', maHocLieu);

        if (errUpdate) throw errUpdate;

        alert("✅ TẠO FILE GIẢI THÀNH CÔNG!");

        // 6. Tự động vẽ lại nút bấm
        if (typeof ham_7a_14_ve_nut_loi_giai_dong_trac_nghiem === 'function') {
            await ham_7a_14_ve_nut_loi_giai_dong_trac_nghiem(maHocLieu);
        }

    } catch (error) {
        console.error("Lỗi ráp file giải:", error);
        alert("❌ Lỗi: " + error.message);
        if (divNut) divNut.innerHTML = `<button onclick="ham_7_10_ra_lenh_tao_file_giai('${idHocLieuThamChieu}', '${maHocLieu}')" style="padding:8px 15px; background:#dc3545; color:white; border:none; border-radius:4px; font-weight:bold; cursor:pointer;">❌ THỬ LẠI</button>`;
    }
};


// ==============================================================
// [Nhãn thời gian: 11:15 - Ngày 29/05/2026] - Hàm 7.11: Vẽ nút Lời giải thông minh (Che/Hiện theo trạng thái)
// ==============================================================
window.ham_7a_14_ve_nut_loi_giai_dong_trac_nghiem = async function (maHocLieu) {
    const divNut = document.getElementById('khu-vuc-nut-file');
    if (!divNut) return;

    divNut.innerHTML = `<span style="color: #666; font-size: 13px;">⏳ Đang kiểm tra trạng thái file giải...</span>`;

    try {
        const { data: hl, error } = await _supabase
            .from('hoc_lieu_trac_nghiem')
            .select('id, url_file_giai')
            .eq('ma_hoc_lieu', maHocLieu)
            .single();

        if (error || !hl) {
            divNut.innerHTML = `<span style="color:#dc3545; font-weight:bold;">⚠️ Lỗi truy vấn Học liệu!</span>`;
            return;
        }

        const idHocLieu = hl.id;
        const urlFileGiai = hl.url_file_giai;

        // KIỂM TRA ĐÃ CÓ FILE GIẢI HAY CHƯA
        const daCoFile = urlFileGiai && urlFileGiai.trim() !== '';

        if (!daCoFile) {
            // NẾU CHƯA CÓ: Hiện nút gom file duy nhất
            divNut.innerHTML = `
                <button onclick="ham_7a_13_ra_lenh_tao_file_giai_trac_nghiem('${idHocLieu}', '${maHocLieu}')" 
                        style="padding: 10px 20px; background: #28a745; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">
                    🚀 Ra lệnh gom file lời giải ngay
                </button>
            `;
        } else {
            // NẾU ĐÃ CÓ: Ẩn nút "Gom file" lớn, hiện nút "Xem" và nút "Gom lại" nhỏ bên cạnh
            divNut.innerHTML = `
                <div style="display: flex; align-items: center; gap: 10px; background: #e8f5e9; padding: 10px; border-radius: 8px; border: 1px solid #c8e6c9;">
                    <span style="color: #2e7d32; font-weight: bold; font-size: 14px;">✅ Đã có File giải gộp</span>
                    <a href="${urlFileGiai}" target="_blank" 
                       style="padding: 6px 12px; background: #2e7d32; color: white; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 13px;">
                        📥 Xem/Tải File
                    </a>
                    <button onclick="ham_7a_13_ra_lenh_tao_file_giai_trac_nghiem('${idHocLieu}', '${maHocLieu}')" 
                            style="padding: 6px 12px; background: #6c757d; color: white; border: none; border-radius: 4px; font-size: 12px; cursor: pointer;">
                        🔄 Gom lại (Cập nhật)
                    </button>
                </div>
            `;
        }
    } catch (err) {
        divNut.innerHTML = `<span style="color:#dc3545;">Lỗi kiểm tra trạng thái file.</span>`;
    }
};



//// =====================================================================
//// HÀM 7.15: KÍCH HOẠT BẢNG THỐNG KÊ CHI TIẾT CỦA MỘT NHIỆM VỤ THI
//// =====================================================================
window.ham_7a_15_thong_ke_nhiem_vu_trac_nghiem = async function (maNhiemVu, tenNhiemVu) {
    // 1. Hiện popup loading để quét dữ liệu đa bảng từ Supabase
    Swal.fire({
        title: '📊 Đang tổng hợp dữ liệu...',
        text: 'Hệ thống đang đồng bộ danh sách lớp và két sắt điểm số...',
        allowOutsideClick: false,
        didOpen: () => { Swal.showLoading(); }
    });

    try {
        // BƯỚC A: Lấy thông tin lớp học được giao của Nhiệm vụ này
        const { data: nv, error: errNV } = await _supabase
            .from('nhiem_vu_trac_nghiem')
            .select('danh_sach_lop')
            .eq('ma_nhiem_vu', maNhiemVu)
            .single();

        if (errNV || !nv) throw new Error("Không tìm thấy thông tin cấu trúc nhiệm vụ.");

        let mangMaLop = [];
        try {
            mangMaLop = typeof nv.danh_sach_lop === 'string' ? JSON.parse(nv.danh_sach_lop) : (nv.danh_sach_lop || []);
        } catch (e) { mangMaLop = []; }

        // BƯỚC B: Tải toàn bộ danh sách học sinh thuộc các lớp được giao bài tập này
        let dsHocSinhLop = [];
        if (mangMaLop.length > 0) {
            const { data: dataHS, error: errHS } = await _supabase
                .from('hoc_sinh') // Ghi chú: Thầy kiểm tra lại nếu tên bảng của thầy là 'hoc_sinh' nhé
                .select('uid, ten, sdt, danh_sach_ma_lop');

            if (!errHS && dataHS) {
                dsHocSinhLop = dataHS.filter(hs => {
                    let lopCuaEm = [];
                    try {
                        lopCuaEm = typeof hs.danh_sach_ma_lop === 'string' ? JSON.parse(hs.danh_sach_ma_lop) : (hs.danh_sach_ma_lop || []);
                    } catch (e) { }
                    return lopCuaEm.some(m => mangMaLop.includes(m));
                });
            } else if (errHS) {
                // Dự phòng nếu tên bảng là 'hoc_sinh' (có h)
                const { data: dataHS2, error: errHS2 } = await _supabase
                    .from('hoc_sinh')
                    .select('uid, ten, sdt, danh_sach_ma_lop');
                if (errHS2) throw errHS2;
                dsHocSinhLop = (dataHS2 || []).filter(hs => {
                    let lopCuaEm = [];
                    try {
                        lopCuaEm = typeof hs.danh_sach_ma_lop === 'string' ? JSON.parse(hs.danh_sach_ma_lop) : (hs.danh_sach_ma_lop || []);
                    } catch (e) { }
                    return lopCuaEm.some(m => mangMaLop.includes(m));
                });
            }
        }

        // =====================================================================
        // 🌟 BƯỚC C: TRUY VẤN CHUẨN CỘT chi_tiet_lam_bai THEO ĐÚNG ẢNH SUPABASE
        // =====================================================================
        const { data: dsKQ, error: errKQ } = await _supabase
            .from('ket_qua_trac_nghiem')
            .select('id, uid_hoc_sinh, tong_diem, thoi_gian_nop, chi_tiet_lam_bai') // <-- Đã đổi thành chi_tiet_lam_bai
            .eq('ma_nhiem_vu', maNhiemVu)
            .order('thoi_gian_nop', { ascending: false });

        if (errKQ) throw errKQ;

        // Lọc trùng: Một học sinh làm nhiều lần thì chỉ giữ lại kết quả mới nhất
        let tuDienKQCuoi = {};
        if (dsKQ) {
            dsKQ.forEach(kq => {
                if (!tuDienKQCuoi[kq.uid_hoc_sinh]) {
                    tuDienKQCuoi[kq.uid_hoc_sinh] = kq;
                }
            });
        }

        // BƯỚC D: PHÂN LOẠI HỌC SINH (ĐÃ LÀM VÀ CHƯA LÀM)
        let mangDaLam = [];
        let mangChưaLam = [];
        let tongDiemLop = 0;

        dsHocSinhLop.forEach(hs => {
            const baiLamCuoi = tuDienKQCuoi[hs.uid];
            if (baiLamCuoi) {
                mangDaLam.push({
                    idKQ: baiLamCuoi.id,
                    uid: hs.uid,
                    ten: hs.ten || 'Học sinh',
                    sdt: hs.sdt || 'N/A',
                    diem: baiLamCuoi.tong_diem,
                    ngayNop: baiLamCuoi.thoi_gian_nop,
                    chiTietCau: baiLamCuoi.chi_tiet_lam_bai // Mảng lưu đáp án từ Supabase
                });
                tongDiemLop += Number(baiLamCuoi.tong_diem) || 0;
            } else {
                mangChưaLam.push({
                    uid: hs.uid,
                    ten: hs.ten,
                    sdt: hs.sdt || 'N/A'
                });
            }
        });

        const tongSoHS = dsHocSinhLop.length;
        const soLgDaLam = mangDaLam.length;
        const soLgChuaLam = mangChưaLam.length;
        const diemTrungBinh = soLgDaLam > 0 ? (tongDiemLop / soLgDaLam).toFixed(2) : "0.00";

        // Ghi dữ liệu vào bộ nhớ RAM tạm thời
        window.DataThongKeHienTai = { mangDaLam, mangChưaLam, maNhiemVu, tenNhiemVu };

        // BƯỚC E: HIỂN THỊ POPUP TỔNG QUAN (TẦNG 1)
        Swal.fire({
            title: `📊 THỐNG KÊ: ${tenNhiemVu}`,
            html: `
                <div style="text-align: left; background: #fff; border-radius: 8px; font-size: 14px; color: #2c3e50; line-height: 1.6;">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px;">
                        <div style="background: #e3f2fd; padding: 12px; border-radius: 8px; border-left: 4px solid #1e88e5; text-align: center;">
                            <span style="font-size: 11px; color: #546e7a; font-weight: bold; text-transform: uppercase;">Sĩ số giao bài</span>
                            <div style="font-size: 24px; font-weight: 900; color: #1565c0;">${tongSoHS} <span style="font-size: 12px; font-weight: normal; color: #666;">em</span></div>
                        </div>
                        <div style="background: #e8f5e9; padding: 12px; border-radius: 8px; border-left: 4px solid #43a047; text-align: center;">
                            <span style="font-size: 11px; color: #546e7a; font-weight: bold; text-transform: uppercase;">Điểm trung bình</span>
                            <div style="font-size: 24px; font-weight: 900; color: #2e7d32;">${diemTrungBinh} <span style="font-size: 12px; font-weight: normal; color: #666;">đ</span></div>
                        </div>
                    </div>

                    <div style="display: flex; flex-direction: column; gap: 10px;">
                        <button onclick="ham_7a_19_sub_danh_sach_da_lam_trac_nghiem()" style="width: 100%; padding: 14px; background: #28a745; color: white; border: none; border-radius: 8px; font-weight: bold; font-size: 14px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 4px rgba(40,167,69,0.2);">
                            <span>🟢 Danh sách Học sinh ĐV NỘP BÀI</span>
                            <b style="background: rgba(255,255,255,0.2); padding: 2px 10px; border-radius: 12px;">${soLgDaLam} em</b>
                        </button>

                        <button onclick="ham_7a_21_sub_danh_sach_chua_lam_trac_nghiem()" style="width: 100%; padding: 14px; background: #dc3545; color: white; border: none; border-radius: 8px; font-weight: bold; font-size: 14px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 4px rgba(220,53,69,0.2);">
                            <span>🔴 Danh sách Học sinh CHƯA LÀM BÀI</span>
                            <b style="background: rgba(255,255,255,0.2); padding: 2px 10px; border-radius: 12px;">${soLgChuaLam} em</b>
                        </button>
                    </div>
                </div>
            `,
            showConfirmButton: true,
            confirmButtonText: 'Đóng thống kê',
            confirmButtonColor: '#6c757d',
            width: '450px'
        });

    } catch (err) {
        console.error("LỖI THỐNG KÊ:", err);
        Swal.fire({ icon: 'error', title: 'Không thể xuất thống kê', text: err.message });
    }
};



//// =====================================================================
//// Hàm 7.16: Tìm kiếm trực tiếp (Live Search) nhiệm vụ trên bảng
//// =====================================================================


// [Nhãn thời gian: 12:48 - Ngày 28/05/2026] - Đồng bộ Tìm kiếm trực tiếp NV với Hàm vẽ bảng để STT chạy từ 1
window.ham_7a_16_tim_kiem_live_nhiem_vu_trac_nghiem = function (tuKhoa) {
    if (typeof window.ham_7a_10_ve_bang_nhiem_vu_trac_nghiem === 'function') {
        window.ham_7a_10_ve_bang_nhiem_vu_trac_nghiem();
    }
};



// [Nhãn thời gian: 14:02 - Ngày 28/05/2026] - Hàm 7.17: Xem chi tiết câu trả lời của Học sinh (Đối chiếu Github)
window.ham_7a_17_xem_chi_tiet_bai_lam_trac_nghiem = async function (maNhiemVu, uidHocSinh, isLiveSync, tenHocSinh) {
    if (isLiveSync === true) {
        return Swal.fire({
            title: 'Chỉ có điểm tổng kết',
            html: `Học sinh <b>${tenHocSinh}</b> chưa bấm nộp bài chính thức. Điểm số được hệ thống vớt tự động từ Sóng Live nên không có lịch sử chi tiết (ABCD) từng câu!`,
            icon: 'info'
        });
    }

    Swal.fire({ title: '⏳ Đang trích xuất bài làm...', didOpen: () => Swal.showLoading() });

    try {
        // 1. Lấy dữ liệu bài làm của học sinh
        const { data: dsKQ } = await _supabase.from('ket_qua_trac_nghiem').select('*').eq('ma_nhiem_vu', maNhiemVu).eq('uid_hoc_sinh', uidHocSinh).order('thoi_gian_nop', { ascending: false });
        if (!dsKQ || dsKQ.length === 0) throw new Error("Không tìm thấy dữ liệu bài làm chi tiết trong hệ thống.");

        const kq = dsKQ[0];
        let chiTiet = {};
        try {
            const chuoiJSON = kq.chi_tiet || kq.chi_tiet_bai_lam || kq.ket_qua_chi_tiet || '{}';
            chiTiet = typeof chuoiJSON === 'string' ? JSON.parse(chuoiJSON) : chuoiJSON;
        } catch (e) { console.warn("Lỗi parse JSON chi tiết bài làm"); }

        let mangDapAnChon = chiTiet.mang_dap_an_chon || chiTiet.dapAnChon || chiTiet.danh_sach_chon || [];

        // 2. Lấy Học liệu gốc (Đề thi) từ Github để đối chiếu
        let dsCauHoiGoc = [];
        try {
            const { data: nv } = await _supabase.from('nhiem_vu_trac_nghiem').select('ma_hoc_lieu').eq('ma_nhiem_vu', maNhiemVu).single();
            const { data: hl } = await _supabase.from('hoc_lieu_trac_nghiem').select('url_github').eq('ma_hoc_lieu', nv.ma_hoc_lieu).single();

            let urlGit = hl.url_github;
            if (urlGit) {
                if (urlGit.includes('github.com') && urlGit.includes('/blob/')) urlGit = urlGit.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
                const res = await fetch(urlGit);
                if (res.ok) {
                    const dataHL = await res.json();
                    dsCauHoiGoc = dataHL.danhSachCauHoi || dataHL.danh_sach_cau_hoi || [];
                }
            }
        } catch (e) { console.warn("Không tải được đề gốc để đối chiếu."); }

        // 3. Vẽ bảng HTML đối chiếu
        let htmlTable = `
            <div style="text-align:left; margin-bottom: 15px; border-bottom: 2px solid #eee; padding-bottom: 10px;">
                <div style="font-size: 18px; font-weight: 900; color: #1a73e8; margin-bottom: 5px;">👤 ${tenHocSinh}</div>
                <div style="font-size: 14px; color: #666;">
                    Điểm số đạt được: <b style="color:#e74c3c; font-size:18px;">${Number(kq.tong_diem).toFixed(2)}</b> | 
                    Đúng: <b style="color:#28a745;">${kq.so_cau_dung || chiTiet.so_cau_dung || '?'} câu</b>
                </div>
            </div>
            <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 14px;">
                <thead style="position: sticky; top: 0; background: white; z-index: 1;">
                    <tr style="background: #f1f3f4; border-bottom: 2px solid #dee2e6;">
                        <th style="padding: 10px; border: 1px solid #ccc; text-align: center;">Câu</th>
                        <th style="padding: 10px; border: 1px solid #ccc; text-align: center;">HS Chọn</th>
                        <th style="padding: 10px; border: 1px solid #ccc; text-align: center;">Đáp án gốc</th>
                        <th style="padding: 10px; border: 1px solid #ccc; text-align: center;">Kết quả</th>
                    </tr>
                </thead>
                <tbody>
        `;

        const soLuongCanVe = Math.max(mangDapAnChon.length || 0, dsCauHoiGoc.length || 0, chiTiet.tong_so_cau || 0);

        if (soLuongCanVe === 0) {
            htmlTable += `<tr><td colspan="4" style="padding: 30px; text-align:center; color:#666;">Không có dữ liệu lịch sử chọn chi tiết (Có thể học sinh làm bài trên giấy hoặc chỉ gửi điểm tổng).</td></tr>`;
        } else {
            for (let i = 0; i < soLuongCanVe; i++) {
                let hsChon = mangDapAnChon[i] || '-';
                let dapAnGoc = dsCauHoiGoc[i] ? (dsCauHoiGoc[i].dap_an || dsCauHoiGoc[i].dapAn || '?') : '?';

                // Thuật toán đối chiếu khắt khe
                let isDung = false;
                if (hsChon !== '-' && dapAnGoc !== '?') {
                    if (hsChon === dapAnGoc) isDung = true;
                }

                // Trường hợp chi tiết lưu kiểu mảng Object nâng cao
                if (chiTiet.danh_sach_chi_tiet && chiTiet.danh_sach_chi_tiet[i]) {
                    const ct = chiTiet.danh_sach_chi_tiet[i];
                    hsChon = ct.chon || ct.hs_chon || hsChon;
                    dapAnGoc = ct.dap_an || ct.dap_an_goc || dapAnGoc;
                    isDung = ct.dung_sai === true || ct.is_correct === true || hsChon === dapAnGoc;
                }

                let bgChon = hsChon === '-' ? '#f8f9fa' : (isDung ? '#d4edda' : '#f8d7da');
                let textChon = hsChon === '-' ? '<span style="color:#999; font-style:italic;">Bỏ trống</span>' : `<b>${hsChon}</b>`;
                let iconKetQua = isDung ? '✅' : '❌';
                if (hsChon === '-') iconKetQua = '➖';

                htmlTable += `
                    <tr>
                        <td style="padding: 8px; border: 1px solid #ccc; text-align: center; font-weight: bold; color: #555;">${i + 1}</td>
                        <td style="padding: 8px; border: 1px solid #ccc; text-align: center; background: ${bgChon}; font-size: 15px;">${textChon}</td>
                        <td style="padding: 8px; border: 1px solid #ccc; text-align: center; font-weight: bold; color: #1a73e8; font-size: 15px;">${dapAnGoc}</td>
                        <td style="padding: 8px; border: 1px solid #ccc; text-align: center;">${iconKetQua}</td>
                    </tr>
                `;
            }
        }

        htmlTable += `</tbody></table>`;

        Swal.fire({
            title: '',
            html: `<div style="max-height: 450px; overflow-y: auto;">${htmlTable}</div>`,
            width: '600px',
            showConfirmButton: true,
            confirmButtonText: 'Đóng lại',
            confirmButtonColor: '#6c757d'
        });

    } catch (e) {
        Swal.fire('Lỗi', e.message, 'error');
    }
};

// hàm gv chấm lại cả lớp
async function ham_7a_18_gv_cham_lai_ca_lop_trac_nghiem(maNhiemVu) {
    const { isConfirmed } = await Swal.fire({
        title: 'Chấm lại cả lớp?',
        text: 'Hành động này sẽ cập nhật điểm mới cho toàn bộ học sinh dựa trên đáp án hiện tại!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Chấm lại ngay'
    });

    if (isConfirmed) {
        Swal.fire({ title: 'Đang chấm lại...', didOpen: () => Swal.showLoading() });

        const { error } = await _supabase.rpc('cham_lai_ca_lop_trac_nghiem', { p_ma_nhiem_vu: maNhiemVu });

        if (error) {
            Swal.fire('Lỗi', error.message, 'error');
        } else {
            // SỬA Ở ĐÂY: KHÔNG DÙNG location.reload()
            Swal.fire('Thành công!', 'Điểm số đã được cập nhật!', 'success');


        }
    }
}




// =====================================================================
// HÀM SUB 1: HIỂN THỊ DANH SÁCH CHI TIẾT HỌC SINH ĐV LÀM BÀI (TẦNG 2)
// =====================================================================
window.ham_7a_19_sub_danh_sach_da_lam_trac_nghiem = function (loaiSort = null) {
    const { mangDaLam, maNhiemVu, tenNhiemVu } = window.DataThongKeHienTai;
    const opts = { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' };

    // ==========================================
    // 1. QUẢN LÝ TRẠNG THÁI SẮP XẾP & TÌM KIẾM
    // ==========================================
    if (!window.DataThongKeHienTai.sortState) {
        window.DataThongKeHienTai.sortState = { cot: 'diem', tangDan: false, tuKhoa: '' };
    }

    if (loaiSort) {
        if (window.DataThongKeHienTai.sortState.cot === loaiSort) {
            window.DataThongKeHienTai.sortState.tangDan = !window.DataThongKeHienTai.sortState.tangDan;
        } else {
            window.DataThongKeHienTai.sortState.cot = loaiSort;
            window.DataThongKeHienTai.sortState.tangDan = (loaiSort === 'ten') ? true : false;
        }
    }
    const sortState = window.DataThongKeHienTai.sortState;

    // ==========================================
    // 2. TẠO BẢN SAO VÀ TIẾN HÀNH SẮP XẾP
    // ==========================================
    let mangHienThi = [...mangDaLam];

    mangHienThi.sort((a, b) => {
        if (sortState.cot === 'ten') {
            const tenA = (a.ten || "").trim().split(" ").pop();
            const tenB = (b.ten || "").trim().split(" ").pop();
            return sortState.tangDan ? tenA.localeCompare(tenB, 'vi') : tenB.localeCompare(tenA, 'vi');
        } else if (sortState.cot === 'diem') {
            const diemA = parseFloat(a.diem) || 0;
            const diemB = parseFloat(b.diem) || 0;
            return sortState.tangDan ? (diemA - diemB) : (diemB - diemA);
        }
        return 0;
    });

    const iconTen = sortState.cot === 'ten' ? (sortState.tangDan ? '🔼' : '🔽') : '<span style="color:#cbd5e0">↕️</span>';
    const iconDiem = sortState.cot === 'diem' ? (sortState.tangDan ? '🔼' : '🔽') : '<span style="color:#cbd5e0">↕️</span>';

    // ==========================================
    // 3. SINH HTML BẢNG DỮ LIỆU
    // ==========================================
    let htmlBaoCaoTable = '';
    if (mangHienThi.length === 0) {
        htmlBaoCaoTable = `<tr><td colspan="4" style="text-align:center; color:#999; padding: 20px;">Chưa có học sinh nào nộp bài.</td></tr>`;
    } else {
        mangHienThi.forEach((hs, index) => {
            const gioNop = hs.ngayNop ? new Date(hs.ngayNop).toLocaleString('vi-VN', opts) : 'N/A';
            const indexGoc = mangDaLam.indexOf(hs);

            // Xử lý giữ trạng thái ẩn/hiện nếu đang có từ khóa tìm kiếm
            const tuKhoaHienTai = (sortState.tuKhoa || "").toLowerCase();
            const tenHS = (hs.ten || "").toLowerCase();
            const hienThiDong = tenHS.includes(tuKhoaHienTai) ? "" : "display: none;";

            htmlBaoCaoTable += `
                <tr class="dong-hoc-sinh" data-ten="${tenHS}" style="border-bottom: 1px solid #e2e8f0; transition: background 0.2s; ${hienThiDong}" onmouseover="this.style.background='#f7fafc'" onmouseout="this.style.background='transparent'">
                    <td style="padding: 10px 6px; text-align: center; font-weight: bold; color: #718096;">${index + 1}</td>
                    <td style="padding: 10px 6px; text-align: left;">
                        <b style="color:#2b6cb0; font-size:14px;">${hs.ten}</b>
                        <div style="font-size:11px; color:#718096; margin-top:2px;">SĐT: ${hs.sdt}</div>
                    </td>
                    <td style="padding: 10px 6px; text-align: center;">
                        <span style="font-size: 16px; font-weight: 900; color: #e53e3e;">${hs.diem}</span>
                        <div style="font-size:10px; color:#a0aec0; margin-top:2px;">${gioNop}</div>
                    </td>
                    <td style="padding: 10px 6px; text-align: center;">
                        <button onclick="ham_7a_22_sub_soi_bai_lam_trac_nghiem(${indexGoc})" style="padding: 6px 10px; background: #3182ce; color: white; border: none; border-radius: 4px; font-weight: bold; font-size: 11px; cursor: pointer; transition: 0.2s;">
                            👁️ SOI BÀI
                        </button>
                    </td>
                </tr>
            `;
        });
    }

    // ==========================================
    // 4. VẼ GIAO DIỆN (Thêm Ô Tìm Kiếm)
    // ==========================================
    Swal.fire({
        title: `🟢 DANH SÁCH ĐV NỘP BÀI`,
        html: `
            <div style="padding: 10px; background: #edf2f7; border-bottom: 1px solid #cbd5e0; border-radius: 6px 6px 0 0;">
                <input type="text" id="input-tim-kiem-hs" placeholder="🔍 Nhập tên học sinh để tìm nhanh..." 
                       value="${sortState.tuKhoa}"
                       oninput="ham_7a_20_sub_tim_kiem_live_trac_nghiem(this.value)"
                       style="width: 100%; padding: 10px 15px; border: 1px solid #cbd5e0; border-radius: 6px; font-size: 14px; outline: none; box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);">
            </div>

            <div style="height: 350px; overflow-y: auto; background: white; text-align: left;">
                <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                    <thead style="background: #f7fafc; position: sticky; top: 0; border-bottom: 2px solid #cbd5e0; z-index: 2;">
                        <tr>
                            <th style="padding: 10px 6px; text-align: center; color: #4a5568; width: 35px;">STT</th>
                            <th onclick="ham_7a_19_sub_danh_sach_da_lam_trac_nghiem('ten')" 
                                style="padding: 10px 6px; color: #4a5568; text-align: left; cursor: pointer; user-select: none;" title="Bấm để sắp xếp">
                                Học sinh ${iconTen}
                            </th>
                            <th onclick="ham_7a_19_sub_danh_sach_da_lam_trac_nghiem('diem')" 
                                style="padding: 10px 6px; text-align: center; color: #4a5568; width: 100px; cursor: pointer; user-select: none;" title="Bấm để sắp xếp">
                                Điểm Số ${iconDiem}
                            </th>
                            <th style="padding: 10px 6px; text-align: center; color: #4a5568; width: 75px;">Bài làm</th>
                        </tr>
                    </thead>
                    <tbody id="tbody-danh-sach-da-lam">
                        ${htmlBaoCaoTable}
                    </tbody>
                </table>
            </div>
        `,
        showCancelButton: true,
        confirmButtonText: '⬅️ Quay lại tổng quan',
        cancelButtonText: 'Đóng hẳn',
        confirmButtonColor: '#3182ce',
        cancelButtonColor: '#718096',
        width: '500px',
        didOpen: () => {
            // Tự động focus vào ô tìm kiếm nếu đang gõ dở
            if (sortState.tuKhoa) {
                const input = document.getElementById('input-tim-kiem-hs');
                input.focus();
                input.setSelectionRange(input.value.length, input.value.length);
            }
        }
    }).then((result) => {
        if (result.isConfirmed) ham_7a_15_thong_ke_nhiem_vu_trac_nghiem(maNhiemVu, tenNhiemVu);
    });
};

// =====================================================================
// HÀM TRỢ THỦ: XỬ LÝ TÌM KIẾM LIVE TRÊN DOM
// =====================================================================
window.ham_7a_20_sub_tim_kiem_live_trac_nghiem = function (tuKhoa) {
    // 1. Lưu lại từ khóa vào State để không bị mất khi bấm nút Sắp xếp
    if (window.DataThongKeHienTai && window.DataThongKeHienTai.sortState) {
        window.DataThongKeHienTai.sortState.tuKhoa = tuKhoa;
    }

    // 2. Chuyển từ khóa về chữ thường để so sánh
    const filter = tuKhoa.toLowerCase().trim();
    const rows = document.querySelectorAll('#tbody-danh-sach-da-lam .dong-hoc-sinh');

    // 3. Quét và bật/tắt từng dòng
    rows.forEach(row => {
        const tenHS = row.getAttribute('data-ten') || "";
        if (tenHS.includes(filter)) {
            row.style.display = ""; // Hiện
        } else {
            row.style.display = "none"; // Ẩn
        }
    });
};



// =====================================================================
// HÀM SUB 2: HIỂN THỊ DANH SÁCH HỌC SINH CHƯA NỘP BÀI (TẦNG 2)
// =====================================================================
window.ham_7a_21_sub_danh_sach_chua_lam_trac_nghiem = function () {
    const { mangChưaLam, maNhiemVu, tenNhiemVu } = window.DataThongKeHienTai;

    let htmlChuaLamTable = '';
    if (mangChưaLam.length === 0) {
        htmlChuaLamTable = `<tr><td colspan="3" style="text-align:center; color:#2d3748; padding: 20px; font-weight:bold; background:#f0fff4;">🎉 100% học sinh đã hoàn thành bài!</td></tr>`;
    } else {
        mangChưaLam.forEach((hs, index) => {
            htmlChuaLamTable += `
                <tr style="border-bottom: 1px solid #edf2f7;">
                    <td style="padding: 10px 8px; text-align: center; font-weight: bold; color: #718096;">${index + 1}</td>
                    <td style="padding: 10px 8px; font-weight: bold; color: #4a5568;">${hs.ten}</td>
                    <td style="padding: 10px 8px; text-align: center; color: #e53e3e; font-weight: bold;">${hs.sdt}</td>
                </tr>
            `;
        });
    }

    Swal.fire({
        title: `🔴 DANH SÁCH CHƯA NỘP BÀI`,
        html: `
            <div style="max-height: 400px; overflow-y: auto; background: white;">
                <table style="width: 100%; border-collapse: collapse; font-size: 13px; text-align: left;">
                    <thead style="background: #fff5f5; position: sticky; top: 0; border-bottom: 2px solid #fed7d7;">
                        <tr>
                            <th style="padding: 8px 8px; text-align: center; color: #9b2c2c; width: 40px;">STT</th>
                            <th style="padding: 8px 8px; color: #9b2c2c;">Tên học sinh</th>
                            <th style="padding: 8px 8px; text-align: center; color: #9b2c2c; width: 130px;">Số điện thoại</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${htmlChuaLamTable}
                    </tbody>
                </table>
            </div>
        `,
        showCancelButton: true,
        confirmButtonText: '⬅️ Quay lại tổng quan',
        cancelButtonText: 'Đóng hẳn',
        confirmButtonColor: '#e53e3e',
        cancelButtonColor: '#718096',
        width: '450px'
    }).then((result) => {
        if (result.isConfirmed) ham_7a_15_thong_ke_nhiem_vu_trac_nghiem(maNhiemVu, tenNhiemVu);
    });
};

// =====================================================================
// 🌟 HÀM SUB 3: SOI CHI TIẾT BÀI LÀM ĐÃ ĐƯỢC MAP THEO KHỐI DỮ LIỆU THỰC TẾ
// =====================================================================
window.ham_7a_22_sub_soi_bai_lam_trac_nghiem = function (indexHocSinh) {
    const { mangDaLam } = window.DataThongKeHienTai;
    const hs = mangDaLam[indexHocSinh];

    let mangCauTraLoi = [];
    try {
        mangCauTraLoi = typeof hs.chiTietCau === 'string' ? JSON.parse(hs.chiTietCau) : (hs.chiTietCau || []);
    } catch (e) { }

    let htmlMaTranGrid = '';
    let soCauDung = 0;

    if (mangCauTraLoi.length === 0) {
        htmlMaTranGrid = `<p style="grid-column: span 5; text-align:center; color:#718096; padding:15px;">Hệ thống không tìm thấy lịch sử tích đáp án.</p>`;
    } else {
        mangCauTraLoi.forEach((cau, idx) => {
            const trangThai = (cau.ketQua || "").trim();

            let bgHop = "#fff5f5";
            let borderHop = "#feb2b2";
            let chuHop = "#c53030";
            let iconKq = "❌";

            if (trangThai === "Đúng") {
                soCauDung++;
                bgHop = "#f0fff4";
                borderHop = "#9ae6b4";
                chuHop = "#22543d";
                iconKq = "🟢";
            } else if (trangThai === "Bỏ trống") {
                bgHop = "#f7fafc";
                borderHop = "#cbd5e0";
                chuHop = "#4a5568";
                iconKq = "⚪";
            }

            // 🌟 ĐÃ SỬA: Biến mỗi ô thành một nút bấm
            htmlMaTranGrid += `
                <div onclick="ham_7a_23_gv_mo_giao_dien_xem_lai_chi_tiet_trac_nghiem(${indexHocSinh}, '${cau.maCau}')" 
                     title="Bấm để xem chi tiết câu này"
                     style="background: ${bgHop}; border: 1px solid ${borderHop}; border-radius: 6px; padding: 10px 5px; text-align: center; color: ${chuHop}; font-family: sans-serif; cursor: pointer; transition: 0.2s; box-shadow: 0 1px 2px rgba(0,0,0,0.05);"
                     onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 4px 8px rgba(0,0,0,0.1)';" 
                     onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 1px 2px rgba(0,0,0,0.05)';">
                    <div style="font-size: 11px; font-weight: bold; text-transform: uppercase; color:#718096;">Câu ${idx + 1}</div>
                    <div style="font-size: 16px; font-weight: 900; margin: 4px 0;">${iconKq}</div>
                    <div style="font-size: 10px; color: #4a5568; font-weight:bold;">ĐA: <span style="background:white; padding:1px 4px; border-radius:2px; border:1px solid #cbd5e0;">${cau.luaChonHS || '-'}</span></div>
                </div>
            `;
        });
    }

    const tongSoCau = mangCauTraLoi.length;
    const tyLeDung = tongSoCau > 0 ? ((soCauDung / tongSoCau) * 100).toFixed(0) : 0;

    Swal.fire({
        title: `👀 BÀI LÀM: ${hs.ten.toUpperCase()}`,
        html: `
            <div style="text-align: left; background: white;">
                <div style="background: #ebf8ff; border: 1px solid #bee3f8; padding: 10px 15px; border-radius: 8px; font-size: 13px; color: #2b6cb0; margin-bottom: 15px; display:flex; justify-content:space-between; align-items: center; font-weight:bold;">
                    <div>
                        <div style="margin-bottom: 4px;">🎯 Đúng: ${soCauDung} / ${tongSoCau} câu</div>
                        <div>📈 Tỷ lệ chính xác: ${tyLeDung}%</div>
                    </div>
                    <button onclick="ham_7a_23_gv_mo_giao_dien_xem_lai_chi_tiet_trac_nghiem(${indexHocSinh}, null)" style="padding: 8px 12px; background: #2b6cb0; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; font-size: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        MỞ FULL ĐỀ
                    </button>
                </div>

                <div style="font-size: 12px; color: #4a5568; font-weight: bold; margin-bottom: 8px; text-transform: uppercase;">🧩 Chi tiết từng câu hỏi (Bấm vào ô để xem):</div>
                
                <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; max-height: 280px; overflow-y: auto; padding: 4px;">
                    ${htmlMaTranGrid}
                </div>
            </div>
        `,
        showCancelButton: false,
        confirmButtonText: '⬅️ Quay lại danh sách lớp',
        confirmButtonColor: '#4a5568',
        width: '450px'
    }).then((result) => {
        if (result.isConfirmed) ham_7a_19_sub_danh_sach_da_lam_trac_nghiem();
    });
};

// =====================================================================
// 🌟 HÀM CẦU NỐI: TẢI ĐỀ GỐC (Bản Clone hoàn chỉnh từ form Học Sinh)
// =====================================================================
window.ham_7a_23_gv_mo_giao_dien_xem_lai_chi_tiet_trac_nghiem = async function (indexHocSinh, maCauScroll) {
    Swal.fire({
        title: 'Đang tải dữ liệu bài làm...',
        html: 'Hệ thống đang đồng bộ câu hỏi và đáp án từ kho lưu trữ...',
        didOpen: () => Swal.showLoading()
    });

    try {
        const { maNhiemVu, mangDaLam } = window.DataThongKeHienTai;
        const hs = mangDaLam[indexHocSinh];

        // 1. Kéo nhiệm vụ và mã học liệu
        const { data: nvData, error: errNV } = await _supabase.from('nhiem_vu_trac_nghiem').select('*').eq('ma_nhiem_vu', maNhiemVu).single();
        if (errNV) throw errNV;

        const { data: hlData, error: errHL } = await _supabase.from('hoc_lieu_trac_nghiem').select('*').eq('ma_hoc_lieu', nvData.ma_hoc_lieu).single();
        if (errHL) throw errHL;

        // ==============================================================
        // 2. TẢI FILE ĐỀ THI TỪ GITHUB (Sao chép logic 1:1 từ Học Sinh)
        // ==============================================================
        let urlFileGitHub = hlData.url_github;
        if (!urlFileGitHub) {
            let maDeGoc = nvData.ma_hoc_lieu;
            if (maDeGoc.startsWith("HL_DE_")) maDeGoc = maDeGoc.replace("HL_DE_", "");
            urlFileGitHub = `https://ducchinh2308.github.io/LuyenToan2308/Kho_De_Thi/${maDeGoc}/DeThi_${maDeGoc}.json`;
        }

        const resDe = await fetch(urlFileGitHub);
        if (!resDe.ok) throw new Error("Không tải được đề gốc từ Github!");
        const dataGitHub = await resDe.json();

        // ==============================================================
        // 3. TẢI FILE GIẢI BÓNG MA (Luôn tải đối với Quyền Giáo Viên)
        // ==============================================================
        let dataGiaiGop = null;
        if (hlData.url_file_giai) {
            try {
                const resGiai = await fetch(hlData.url_file_giai);
                if (resGiai.ok) dataGiaiGop = await resGiai.json();
            } catch (e) { console.error("Không tải được file bóng ma", e); }
        }

        // ==============================================================
        // 4. RÁP BẢN ĐỒ VÀ BƠM NỘI DUNG VÀO KHUNG XƯƠNG SUPABASE
        // ==============================================================
        let dsKhungXuong = hlData.danh_sach_cau_hoi;
        if (typeof dsKhungXuong === 'string') dsKhungXuong = JSON.parse(dsKhungXuong);

        const deThiHoanChinh = (dsKhungXuong || []).map(mapItem => {
            const noiDung = (dataGitHub.danhSachCauHoi || dataGitHub.danh_sach_cau_hoi || []).find(c => c.maCau === mapItem.ma_cau_hoi) || {};

            let htmlLoiGiaiChiTiet = null;
            if (dataGiaiGop) {
                const matchGiai = (dataGiaiGop.danhSachLoiGiai || []).find(g => g.maBaoMat === mapItem.ma_loi_giai);
                if (matchGiai) htmlLoiGiaiChiTiet = matchGiai.loiGiaiHtml;
            }

            return {
                ...mapItem,
                ...noiDung,
                // Quyền Giáo viên: Không cần tẩy trắng dap_an
                dap_an: mapItem.dap_an,
                loiGiaiHtml: htmlLoiGiaiChiTiet
            };
        });

        const baseUrlHinhAnh = urlFileGitHub.substring(0, urlFileGitHub.lastIndexOf('/')) + "/HinhAnh";

        // ==============================================================
        // 5. MÔ PHỎNG DỮ LIỆU BÀI LÀM VÀ MỞ FULL-SCREEN
        // ==============================================================
        let chiTiet = typeof hs.chiTietCau === 'string' ? JSON.parse(hs.chiTietCau) : (hs.chiTietCau || []);

        let ketQuaMock = {
            tong_diem: hs.diem,
            chi_tiet_lam_bai: chiTiet
        };

        Swal.close();

        // Ép cờ choPhepXemDapAn = true và choPhepXemLoiGiai = true đối với GV
        ham_8_14_ve_giao_dien_xem_lai_trac_nghiem(ketQuaMock, deThiHoanChinh, nvData, baseUrlHinhAnh, true, true);

        // ==============================================================
        // 6. TÍNH NĂNG AUTO-SCROLL THÔNG MINH
        // ==============================================================
        if (maCauScroll) {
            setTimeout(() => {
                const theCauHoi = document.getElementById('review-cau-' + maCauScroll);
                if (theCauHoi) {
                    theCauHoi.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    theCauHoi.style.transition = "all 0.5s ease-in-out";
                    theCauHoi.style.boxShadow = "0 0 15px 3px rgba(220, 53, 69, 0.6)";
                    theCauHoi.style.transform = "scale(1.02)";

                    setTimeout(() => {
                        theCauHoi.style.boxShadow = "0 4px 8px rgba(0,0,0,0.05)";
                        theCauHoi.style.transform = "scale(1)";
                    }, 2500);
                }
            }, 600);
        }

    } catch (error) {
        Swal.fire('Lỗi', 'Không thể mở bài thi: ' + error.message, 'error');
    }
};

window.ham_7a_24_tao_nhan_cau_truc_tu_metadata = function(metadataGoc) {
    //console.log("Giá trị metadata truyền vào:", metadataGoc); // <--- Dòng này để debug
    if (!metadataGoc) return `<span style="color:#999; font-size:11px; font-style:italic;">Chưa có cấu trúc</span>`;
    try {
        const meta = typeof metadataGoc === 'string' ? JSON.parse(metadataGoc) : metadataGoc;
        if (meta.cau_truc) {
            return `<span style="font-size: 11px; background: #e8f4f8; color: #0056b3; padding: 2px 6px; border-radius: 4px; border: 1px solid #b8daff; display: inline-block;">
                        📝 <b>${meta.cau_truc.replace(/-/g, ' | ')}</b>
                    </span>`;
        }
        return '';
    } catch (e) { return ''; }
};
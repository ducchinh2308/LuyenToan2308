
// ==============================================================================
// KHỐI 6: QUẢN LÝ KHO HỌC LIỆU VÀ ĐỀ THI (BẢNG hoc_lieu)
// ==============================================================================

const BangHocLieuState = {
    duLieu: [],
    cotDangSort: 'ngay_tao',
    tangDan: false
};

//// [Nhãn thời gian: 02:10 - Ngày 29/06/2026] - Hàm 6a_1: Vẽ bộ khung giao diện
function ham_6a_1_ve_quan_ly_hoc_lieu_trac_nghiem() {
    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
    vungLamViec.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <h3 style="margin: 0; color: #353c36;">📚 Quản lý Kho Học Liệu: TRẮC NGHIỆM</h3>
            <div style="display: flex; gap: 15px; align-items: center;">
                <input type="text" id="input-tim-kiem-qlhl" placeholder="Tìm tên, mã đề..." oninput="ham_6a_11_tim_kiem_live(this.value)" style="padding: 10px; border: 1px solid #ccc; border-radius: 6px; width: 250px;">
                <button onclick="ham_6a_2_tai_danh_sach_hoc_lieu_trac_nghiem()" style="padding: 10px 15px;">🔄</button>
                <button onclick="ham_6a_3_hien_form_them_hoc_lieu_trac_nghiem()" style="padding: 10px 15px; background: #28a745; color: white; border: none; border-radius: 6px; font-weight: bold;">+ Tạo mới</button>
            </div>
        </div>
        <div id="danh-sach-hl-render"><p>Đang tải dữ liệu...</p></div>
    `;
    ham_6a_2_tai_danh_sach_hoc_lieu_trac_nghiem();
}



// Hàm 6a.2: Tải dữ liệu từ bảng hoc_lieu và lấy thêm tên Giáo viên tạo
async function ham_6a_2_tai_danh_sach_hoc_lieu_trac_nghiem() {
    const renderArea = document.getElementById('danh-sach-hl-render');
    try {
        const { data: dsHocLieu, error } = await _supabase.from('hoc_lieu_trac_nghiem').select('*');
        if (error) throw error;

        // Bổ sung: Lấy tên giáo viên tạo (giống phần Lớp học)
        const danhSachUidGv = [...new Set((dsHocLieu || []).map(hl => hl.uid_gv_tao).filter(id => id))];
        let tuDienTenGv = {};

        if (danhSachUidGv.length > 0) {
            const { data: dsGv } = await _supabase.from('hoc_sinh').select('uid, ten').in('uid', danhSachUidGv);
            if (dsGv) {
                dsGv.forEach(gv => tuDienTenGv[gv.uid] = gv.ten);
            }
        }

        // Gắn tên giáo viên vào dữ liệu
        BangHocLieuState.duLieu = (dsHocLieu || []).map(hl => ({
            ...hl,
            ten_gv_tao: tuDienTenGv[hl.uid_gv_tao] || 'Không xác định'
        }));

        ham_6a_10_ve_bang_hoc_lieu_trac_nghiem();

    } catch (error) {
        renderArea.innerHTML = `<p style="color: red;">Lỗi tải dữ liệu: ${error.message}</p>`;
    }
}

// Hàm 6.10: Vẽ Bảng Học Liệu (Cập nhật hiển thị Quy mô & Cấu trúc)
function ham_6a_10_ve_bang_hoc_lieu_trac_nghiem() {
    const renderArea = document.getElementById('danh-sach-hl-render');
    let dsHL = [...BangHocLieuState.duLieu];

    if (dsHL.length === 0) {
        renderArea.innerHTML = `<p style="text-align: center; color: #666; padding: 20px; background: white; border-radius: 8px;">Chưa có học liệu hoặc đề thi nào.</p>`;
        return;
    }

    // Thuật toán Sort
    const cot = BangHocLieuState.cotDangSort;
    const heSo = BangHocLieuState.tangDan ? 1 : -1;
    dsHL.sort((a, b) => {
        let valA = a[cot] === null || a[cot] === undefined ? '' : a[cot];
        let valB = b[cot] === null || b[cot] === undefined ? '' : b[cot];
        if (typeof valA === 'string') valA = valA.toLowerCase();
        if (typeof valB === 'string') valB = valB.toLowerCase();
        if (valA < valB) return -1 * heSo;
        if (valA > valB) return 1 * heSo;
        return 0;
    });

    const iconSort = BangHocLieuState.tangDan ? ' ▲' : ' ▼';
    const getIcon = (tenCot) => (cot === tenCot ? iconSort : ' ↕');

    let htmlTable = `
        <div style="overflow-x: auto; border: 1px solid #dee2e6; border-radius: 8px;">
            <table style="width: 100%; min-width: 1600px; border-collapse: collapse; background: white; font-size: 13px;">
                <thead>
                    <tr style="background: #f8f9fa; text-align: left; border-bottom: 2px solid #dee2e6; white-space: nowrap; cursor: pointer;">
                        <th style="padding: 10px; border: 1px solid #eee; text-align: center; width: 40px;">STT</th>
                        <th style="padding: 10px; border: 1px solid #eee; text-align: center;">Thao tác</th>
                        <th style="padding: 10px; border: 1px solid #eee;" onclick="ham_6a_11_thay_doi_sort('ma_hoc_lieu')">Mã HL ${getIcon('ma_hoc_lieu')}</th>
                        <th style="padding: 10px; border: 1px solid #eee;" onclick="ham_6a_11_thay_doi_sort('ten_hoc_lieu')">Tên Học Liệu / Đề Thi ${getIcon('ten_hoc_lieu')}</th>
                        <th style="padding: 10px; border: 1px solid #eee;" onclick="ham_6a_11_thay_doi_sort('loai_kiem_tra')">Phân loại ${getIcon('loai_kiem_tra')}</th>
                        <th style="padding: 10px; border: 1px solid #eee; text-align: center;" onclick="ham_6a_11_thay_doi_sort('khoi_lop')">Khối ${getIcon('khoi_lop')}</th>
                        
                        <th style="padding: 10px; border: 1px solid #eee; text-align: center;" onclick="ham_6a_11_thay_doi_sort('quy_mo_cau_hoi')">Quy mô / Cấu trúc ${getIcon('quy_mo_cau_hoi')}</th>
                        
                        <th style="padding: 10px; border: 1px solid #eee; text-align: center;" onclick="ham_6a_11_thay_doi_sort('thoi_gian_lam_bai')">Thời gian ${getIcon('thoi_gian_lam_bai')}</th>
                        <th style="padding: 10px; border: 1px solid #eee; text-align: center;" onclick="ham_6a_11_thay_doi_sort('trang_thai')">Trạng thái ${getIcon('trang_thai')}</th>
                        <th style="padding: 10px; border: 1px solid #eee;">Giáo viên</th>
                        <th style="padding: 10px; border: 1px solid #eee;">Ngày tạo</th>
                        <th style="padding: 10px; border: 1px solid #eee;">Mã câu hỏi</th>
                    </tr>
                </thead>
                <tbody>
    `;

    dsHL.forEach((hl, index) => {
        const ngayTao = hl.ngay_tao ? new Date(hl.ngay_tao).toLocaleString('vi-VN') : '-';

        // 1. Xử lý quy mô câu hỏi kết hợp cấu trúc từ metadata
        const chuoiCauTruc = (hl.metadata && hl.metadata.cau_truc) ? hl.metadata.cau_truc : '';
        const hienThiQuyMo = chuoiCauTruc
            ? `<div style="font-weight: bold; color: #6f42c1;">${chuoiCauTruc}</div><div style="font-size: 11px; color: #666;">(${hl.quy_mo_cau_hoi} câu)</div>`
            : `<span style="font-weight: bold;">${hl.quy_mo_cau_hoi} câu</span>`;

        // 2. Xử lý thời gian
        const thoiGian = (hl.thoi_gian_lam_bai > 0)
            ? `<span style="color: #dc3545; font-weight: bold;">⏳ ${hl.thoi_gian_lam_bai}p</span>`
            : `<span style="color: #6c757d; font-style: italic;">Tự luyện</span>`;

        // 3. Trạng thái
        const trangThaiText = hl.trang_thai === 'cong_khai'
            ? `<span style="background: #e6ffed; color: #28a745; padding: 4px 8px; border-radius: 12px; font-weight: bold; font-size: 11px;">Công khai</span>`
            : `<span style="background: #f1f3f4; color: #666; padding: 4px 8px; border-radius: 12px; font-weight: bold; font-size: 11px;">Nội bộ</span>`;

        htmlTable += `
            <tr onclick="ham_6a_6_mo_form_sua_hoc_lieu_trac_nghiem('${hl.ma_hoc_lieu}', false)" 
                style="border-bottom: 1px solid #eee; transition: 0.2s; cursor: pointer;" 
                onmouseover="this.style.background='#f1f8ff'" 
                onmouseout="this.style.background='white'">
                
                <td style="padding: 10px; border: 1px solid #eee; text-align: center; font-weight: bold;">${index + 1}</td>
                
                <td style="padding: 10px; border: 1px solid #eee; text-align: center; white-space: nowrap;">
                    <button onclick="event.stopPropagation(); ham_6a_6_mo_form_sua_hoc_lieu_trac_nghiem('${hl.ma_hoc_lieu}', true)" style="padding: 5px 10px; background: #f39c12; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; margin-right: 5px;">Sửa</button>
                    <button onclick="event.stopPropagation(); window.ham_6a_20_xoa_sach_github_va_supabase('${hl.ma_hoc_lieu}', this)" style="padding: 5px 10px; background: #dc3545; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer;">Xóa</button>
                </td>
                
                <td style="padding: 10px; border: 1px solid #eee; font-weight: bold; color: #d35400;">${hl.ma_hoc_lieu}</td>
                <td style="padding: 10px; border: 1px solid #eee; font-weight: bold; color: #1a73e8;">${hl.ten_hoc_lieu}</td>
                <td style="padding: 10px; border: 1px solid #eee;">${hl.loai_kiem_tra}</td>
                <td style="padding: 10px; border: 1px solid #eee; text-align: center; font-weight: bold;">${hl.khoi_lop}</td>
                <td style="padding: 10px; border: 1px solid #eee; text-align: center; line-height: 1.2;">${hienThiQuyMo}</td>
                <td style="padding: 10px; border: 1px solid #eee; text-align: center;">${thoiGian}</td>
                <td style="padding: 10px; border: 1px solid #eee; text-align: center;">${trangThaiText}</td>
                <td style="padding: 10px; border: 1px solid #eee; font-size: 12px;">${hl.ten_gv_tao}</td>
                <td style="padding: 10px; border: 1px solid #eee; font-size: 11px; color: #666;">${ngayTao}</td>
                <td style="padding: 10px; border: 1px solid #eee; color: #999; font-size: 11px; max-width: 100px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                    ${hl.danh_sach_cau_hoi ? hl.danh_sach_cau_hoi.join(', ') : '[]'}
                </td>
            </tr>
        `;
    });

    htmlTable += `</tbody></table></div>`;
    renderArea.innerHTML = htmlTable;
}

// Hàm 6.11: Xử lý thay đổi cột Sắp xếp
function ham_6a_11_thay_doi_sort(cotMoi) {
    if (BangHocLieuState.cotDangSort === cotMoi) {
        BangHocLieuState.tangDan = !BangHocLieuState.tangDan;
    } else {
        BangHocLieuState.cotDangSort = cotMoi;
        BangHocLieuState.tangDan = true;
    }
    ham_6a_10_ve_bang_hoc_lieu_trac_nghiem();
}

// =====================================================================
// Hàm 6.11: Tìm kiếm trực tiếp (Live Search) học liệu trên bảng
// =====================================================================
window.ham_6a_11_tim_kiem_live_hoc_lieu_trac_nghiem = function (tuKhoa) {
    const filter = tuKhoa.toLowerCase().trim();

    // Tìm tất cả các dòng <tr> nằm trong phần <tbody> của bảng học liệu
    const rows = document.querySelectorAll('#danh-sach-hl-render tbody tr');

    rows.forEach(row => {
        // Đọc toàn bộ nội dung chữ (Tên đề, Mã đề, Trạng thái...) đang hiển thị
        const textContent = row.innerText.toLowerCase();

        // Nếu nội dung dòng chứa từ khóa -> Hiện, ngược lại -> Ẩn
        if (textContent.includes(filter)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
};




// Hàm 6.0: Sinh mã định danh ngẫu nhiên theo loại
function ham_6a_0_sinh_ma_hoc_lieu_trac_nghiem(loaiPrefix) {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ123456789';
    let randomPart = '';
    for (let i = 0; i < 6; i++) {
        randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `HL_${loaiPrefix}_${randomPart}`;
}





// ==============================================================
// Hàm 6.3: Vẽ Form thêm mới Học Liệu / Đề Thi (Phiên bản đồng bộ Khối 15)
// ==============================================================
// window.ham_6a_3_hien_form_them_hoc_lieu_trac_nghiem = function () {
//     const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
//     const maHLBanDau = ham_6a_0_sinh_ma_hoc_lieu_trac_nghiem('TN_GK1');

//     vungLamViec.innerHTML = `
//         <div style="max-width: 950px; background: #ffffff; padding: 25px; border-radius: 12px; border: 1px solid #e0e0e0; margin: 0 auto; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
//             <h3 style="color: #28a745; border-bottom: 2px solid #f1f3f4; padding-bottom: 10px; margin-top: 0;">TẠO HỌC LIỆU MỚI</h3>
            
//             <div style="display: grid; grid-template-columns: 1fr 1.5fr 1fr; gap: 15px; margin-bottom: 20px;">
//                 <div>
//                     <label style="font-weight: bold; font-size: 13px; color: #d35400;">Mã định danh:</label>
//                     <input type="text" id="txtMaHocLieu" value="${maHLBanDau}" readonly style="width: 100%; padding: 8px; background: #f1f3f4; border: 1px solid #ddd; border-radius: 6px; font-weight: bold; color: #d35400; cursor: not-allowed;">
//                 </div>
//                 <div>
//                     <label style="font-weight: bold; font-size: 13px; color: #1a73e8;">Phân loại Học Liệu:</label>
//                     <select id="selPhanLoaiHL" onchange="ham_6a_3_b_cap_nhat_ma_theo_loai()" style="width: 100%; padding: 8px; border: 2px solid #1a73e8; border-radius: 6px; cursor: pointer; font-weight: bold;">
//                             <option value="TN_GK1" selected>Trắc nghiệm - Giữa kỳ 1</option>
//                             <option value="TN_CK1">Trắc nghiệm - Cuối kỳ 1</option>
//                             <option value="TN_GK2">Trắc nghiệm - Giữa kỳ 2</option>
//                             <option value="TN_CK2">Trắc nghiệm - Cuối kỳ 2</option>
//                             <option value="TN_KS">Trắc nghiệm - Khảo sát / Thi thử</option>
//                             <option value="TN_LT">Trắc nghiệm - Ôn chương / Luyện tập</option>
//                     </select>
//                 </div>
//                 <div>
//                     <label style="font-weight: bold; font-size: 13px;">Khối lớp:</label>
//                     <select id="selKhoiLopHL" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 6px;">
//                         <option value="12">Khối 12</option>
//                         <option value="11">Khối 11</option>
//                         <option value="10">Khối 10</option>
//                         <option value="Khác">Khác / Luyện thi</option>
//                     </select>
//                 </div>

//                 <div style="grid-column: span 3;">
//                     <label style="font-weight: bold; font-size: 13px;">Tên Học liệu / Đề thi (*):</label>
//                     <input type="text" id="txtTenHocLieu" placeholder="Nhập tên mô tả cho học liệu..." style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 6px; box-sizing: border-box;">
//                 </div>

//                 <div>
//                     <label style="font-weight: bold; font-size: 13px;">Thời gian (Phút):</label>
//                     <input type="number" id="numThoiGian" value="0" min="0" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 6px;">
//                 </div>
//                 <div>
//                     <label style="font-weight: bold; font-size: 13px;">Trạng thái:</label>
//                     <select id="selTrangThaiHL" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 6px;">
//                         <option value="noi_bo" selected>Nội bộ (Đóng)</option>
//                         <option value="cong_khai">Công khai (Mở)</option>
//                     </select>
//                 </div>
//                 <div>
//                     <label style="font-weight: bold; font-size: 13px; color: #6f42c1;">Cấu trúc (Tự động):</label>
//                     <input type="text" id="txtCauTruc" readonly placeholder="Hệ thống tự nhận diện..." style="width: 100%; padding: 8px; background: #f8fbff; border: 1px dotted #6f42c1; border-radius: 6px; font-weight: bold; color: #6f42c1;">
//                 </div>
//             </div>

//             <div id="vung_cau_hinh_chi_tiet">
//                 <div id="khu_vuc_nhap_trac_nghiem" style="display: block;">
//                     <div style="margin-bottom: 20px; text-align: center; background: #f8f9fa; padding: 15px; border-radius: 8px; border: 1px solid #dee2e6;">
//                         <label style="font-weight: bold; font-size: 15px; margin-right: 30px; cursor: pointer; color: #17a2b8;">
//                             <input type="radio" name="radCachNhap" value="1" checked onchange="ham_6a_3_c_chuyen_doi_cach_nhap(1)" style="transform: scale(1.3); margin-right: 8px;">
//                             📤 CÁCH 1: UPLOAD TỪ FILE (.TEX)
//                         </label>
//                         <label style="font-weight: bold; font-size: 15px; cursor: pointer; color: #d35400;">
//                             <input type="radio" name="radCachNhap" value="2" onchange="ham_6a_3_c_chuyen_doi_cach_nhap(2)" style="transform: scale(1.3); margin-right: 8px;">
//                             ✍️ CÁCH 2: NHẬP MÃ CÂU THỦ CÔNG
//                         </label>
//                     </div>

//                     <div id="khu_vuc_cach_1" style="display: block; margin-bottom: 20px; padding: 15px; border: 1px solid #17a2b8; border-radius: 8px; background: #e8f4fd;">
//                         <div style="display: flex; gap: 15px; align-items: center; flex-wrap: wrap;">
//                             <button onclick="ham_6a_15_tai_file_mau()" style="padding: 10px 15px; background: #6c757d; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">📄 Tải File Mẫu</button>
//                             <div style="flex: 1; min-width: 250px;">
//                                 <input type="file" id="upload_file_input" accept=".tex,.txt" onchange="ham_6a_16_xu_ly_thay_doi_file(this)" style="display: block; width: 100%; padding: 8px; border: 2px dashed #17a2b8; border-radius: 6px; background: #fff; cursor: pointer;">
//                             </div>
//                             <button id="btn_check_file" onclick="ham_6a_13_kiem_tra_file_upload()" style="padding: 10px 15px; background: #ffc107; color: #333; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; display: none;">🔍 Kiểm tra</button>
//                         </div>
//                         <div id="khu_vuc_bao_loi_file" style="margin-top: 10px; display: none; padding: 10px; background: #fff3cd; border-left: 4px solid #ffc107; font-size: 13px;"></div>
//                     </div>

//                     <div id="khu_vuc_cach_2" style="display: none; margin-bottom: 20px; padding: 15px; border: 1px dashed #e67e22; border-radius: 8px; background: #fffaf0;">
//                         <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
//                             <span style="font-weight: bold; font-size: 13px; color: #666;">Dán mã ID6 vào các ô bên dưới:</span>
//                             <span id="lblTongCauHoi" style="background: #d35400; color: white; padding: 5px 12px; border-radius: 20px; font-weight: bold; font-size: 12px;">Tổng: 0 câu</span>
//                         </div>
//                         <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px;">
//                             <div>
//                                 <label style="font-size: 11px; font-weight: bold; color: #1a73e8; display: block;">PHẦN 1: TRẮC NGHIỆM (<span id="demTN">0</span>)</label>
//                                 <textarea id="txtID_TN" oninput="ham_6a_5_tinh_toan_cau_truc()" rows="7" style="width: 100%; padding: 8px; border: 1px solid #1a73e8; border-radius: 4px;"></textarea>
//                             </div>
//                             <div>
//                                 <label style="font-size: 11px; font-weight: bold; color: #d35400; display: block;">PHẦN 2: ĐÚNG / SAI (<span id="demDS">0</span>)</label>
//                                 <textarea id="txtID_DS" oninput="ham_6a_5_tinh_toan_cau_truc()" rows="7" style="width: 100%; padding: 8px; border: 1px solid #d35400; border-radius: 4px;"></textarea>
//                             </div>
//                             <div>
//                                 <label style="font-size: 11px; font-weight: bold; color: #28a745; display: block;">PHẦN 3: TRẢ LỜI NGẮN (<span id="demTLN">0</span>)</label>
//                                 <textarea id="txtID_TLN" oninput="ham_6a_5_tinh_toan_cau_truc()" rows="7" style="width: 100%; padding: 8px; border: 1px solid #28a745; border-radius: 4px;"></textarea>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 <div id="vung_nhung_khoi_15" style="display: none;"></div>
//             </div>

//             <div style="display: flex; gap: 12px; margin-top: 20px;">
//                 <button id="btnLuuHocLieu" onclick="ham_6a_4_luu_hoc_lieu_trac_nghiem_moi(this)" style="flex: 2; padding: 12px; background: #28a745; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; font-size: 15px;">
//                     💾 LƯU HỌC LIỆU
//                 </button>
//                 <button onclick="ham_6a_1_ve_quan_ly_hoc_lieu_trac_nghiem()" style="flex: 1; padding: 12px; background: #6c757d; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 15px;">
//                     ❌ HỦY
//                 </button>
//             </div>
//         </div>
//     `;
    
//     // Gọi định tuyến ban đầu
//     setTimeout(() => ham_6a_3_b_cap_nhat_ma_theo_loai(), 50);
// };
window.ham_6a_3_hien_form_them_hoc_lieu_trac_nghiem = function () {
    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
    const maHLBanDau = ham_6a_0_sinh_ma_hoc_lieu_trac_nghiem('TN_GK1');

    vungLamViec.innerHTML = `
        <div style="max-width: 950px; background: #ffffff; padding: 25px; border-radius: 12px; border: 1px solid #e0e0e0; margin: 0 auto; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
            <h3 style="color: #28a745; border-bottom: 2px solid #f1f3f4; padding-bottom: 10px; margin-top: 0;">TẠO HỌC LIỆU MỚI</h3>
            
            <div style="display: grid; grid-template-columns: 1fr 1.5fr 1fr; gap: 15px; margin-bottom: 20px;">
                <div>
                    <label style="font-weight: bold; font-size: 13px; color: #d35400;">Mã định danh:</label>
                    <input type="text" id="txtMaHocLieu" value="${maHLBanDau}" readonly style="width: 100%; padding: 8px; background: #f1f3f4; border: 1px solid #ddd; border-radius: 6px; font-weight: bold; color: #d35400; cursor: not-allowed;">
                </div>
                <div>
                    <label style="font-weight: bold; font-size: 13px; color: #1a73e8;">Phân loại Học Liệu:</label>
                    <select id="selPhanLoaiHL" onchange="ham_6a_3_b_cap_nhat_ma_theo_loai()" style="width: 100%; padding: 8px; border: 2px solid #1a73e8; border-radius: 6px; cursor: pointer; font-weight: bold;">
                            <option value="TN_GK1" selected>Trắc nghiệm - Giữa kỳ 1</option>
                            <option value="TN_CK1">Trắc nghiệm - Cuối kỳ 1</option>
                            <option value="TN_GK2">Trắc nghiệm - Giữa kỳ 2</option>
                            <option value="TN_CK2">Trắc nghiệm - Cuối kỳ 2</option>
                            <option value="TN_KS">Trắc nghiệm - Khảo sát / Thi thử</option>
                            <option value="TN_LT">Trắc nghiệm - Ôn chương / Luyện tập</option>
                    </select>
                </div>
                <div>
                    <label style="font-weight: bold; font-size: 13px;">Khối lớp:</label>
                    <select id="selKhoiLopHL" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 6px;">
                        <option value="12">Khối 12</option>
                        <option value="11">Khối 11</option>
                        <option value="10">Khối 10</option>
                        <option value="Khác">Khác / Luyện thi</option>
                    </select>
                </div>

                <div style="grid-column: span 3;">
                    <label style="font-weight: bold; font-size: 13px;">Tên Học liệu / Đề thi (*):</label>
                    <input type="text" id="txtTenHocLieu" placeholder="Nhập tên mô tả cho học liệu..." style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 6px; box-sizing: border-box;">
                </div>

                <div>
                    <label style="font-weight: bold; font-size: 13px;">Thời gian (Phút):</label>
                    <input type="number" id="numThoiGian" value="0" min="0" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 6px;">
                </div>
                <div>
                    <label style="font-weight: bold; font-size: 13px;">Trạng thái:</label>
                    <select id="selTrangThaiHL" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 6px;">
                        <option value="noi_bo" selected>Nội bộ (Đóng)</option>
                        <option value="cong_khai">Công khai (Mở)</option>
                    </select>
                </div>
                <div>
                    <label style="font-weight: bold; font-size: 13px; color: #6f42c1;">Cấu trúc (Tự động):</label>
                    <input type="text" id="txtCauTruc" readonly placeholder="Hệ thống tự nhận diện..." style="width: 100%; padding: 8px; background: #f8fbff; border: 1px dotted #6f42c1; border-radius: 6px; font-weight: bold; color: #6f42c1;">
                </div>
            </div>

            <div id="vung_cau_hinh_chi_tiet">
                <div id="khu_vuc_nhap_trac_nghiem" style="display: block;">
                    
                    <div style="margin-bottom: 20px; text-align: center; background: #f8f9fa; padding: 15px; border-radius: 8px; border: 1px solid #dee2e6;">
                        <label style="font-weight: bold; font-size: 15px; margin-right: 30px; cursor: pointer; color: #17a2b8;">
                            <input type="radio" name="radCachNhap" value="1" checked onchange="ham_6a_3_c_chuyen_doi_cach_nhap(1)" style="transform: scale(1.3); margin-right: 8px;">
                            📤 CÁCH 1: UPLOAD TỪ FILE MÁY TÍNH (.TEX)
                        </label>
                        <label style="font-weight: bold; font-size: 15px; cursor: pointer; color: #d35400;">
                            <input type="radio" name="radCachNhap" value="2" onchange="ham_6a_3_c_chuyen_doi_cach_nhap(2)" style="transform: scale(1.3); margin-right: 8px;">
                            ☁️ CÁCH 2: CHỌN TỪ NGÂN HÀNG (DRIVE)
                        </label>
                    </div>

                    <div id="khu_vuc_cach_1" style="display: block; margin-bottom: 20px; padding: 15px; border: 1px solid #17a2b8; border-radius: 8px; background: #e8f4fd;">
                        <div style="display: flex; gap: 15px; align-items: center; flex-wrap: wrap;">
                            <button onclick="ham_6a_15_tai_file_mau()" style="padding: 10px 15px; background: #6c757d; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">📄 Tải File Mẫu</button>
                            <div style="flex: 1; min-width: 250px;">
                                <input type="file" id="upload_file_input" accept=".tex,.txt" onchange="ham_6a_16_xu_ly_thay_doi_file(this)" style="display: block; width: 100%; padding: 8px; border: 2px dashed #17a2b8; border-radius: 6px; background: #fff; cursor: pointer;">
                            </div>
                            <button id="btn_check_file" onclick="ham_6a_13_kiem_tra_file_upload()" style="padding: 10px 15px; background: #ffc107; color: #333; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; display: none;">🔍 Kiểm tra</button>
                        </div>
                        <div id="khu_vuc_bao_loi_file" style="margin-top: 10px; display: none; padding: 10px; background: #fff3cd; border-left: 4px solid #ffc107; font-size: 13px;"></div>
                    </div>

                    <div id="khu_vuc_cach_2" style="display: none; margin-bottom: 20px; padding: 15px; border: 1px dashed #e67e22; border-radius: 8px; background: #fffaf0;">
                        <div style="display: flex; gap: 15px; height: 450px;">
                            
                            <div style="flex: 1.2; border: 1px solid #dee2e6; border-radius: 6px; background: white; display: flex; flex-direction: column;">
                                <div style="background: #f1f3f4; padding: 10px; border-bottom: 1px solid #dee2e6; font-weight: bold; color: #333; display: flex; justify-content: space-between; align-items: center;">
                                    <span>📁 Cấu trúc Ngân hàng</span>
                                    <button onclick="ham_6a_fetch_cay_thu_muc_drive()" style="padding: 4px 8px; font-size: 11px; cursor: pointer;">🔄 Tải lại</button>
                                </div>
                                <div id="tree-ngan-hang-drive" style="flex: 1; overflow-y: auto; padding: 10px;">
                                    <span style="color: #666; font-style: italic;">Đang đợi kết nối...</span>
                                </div>
                            </div>

                            <div style="flex: 1; border: 1px solid #dee2e6; border-radius: 6px; background: white; display: flex; flex-direction: column;">
                                <div style="background: #e8f0fe; padding: 10px; border-bottom: 1px solid #dee2e6; font-weight: bold; color: #1a73e8; display: flex; justify-content: space-between;">
                                    <span>🛒 Các câu đã chọn</span>
                                    <span id="lblTongCauChonDrive" style="background: #1a73e8; color: white; padding: 2px 8px; border-radius: 12px; font-size: 12px;">0 câu</span>
                                </div>
                                <div id="list-cau-da-chon" style="flex: 1; overflow-y: auto; padding: 10px;">
                                    </div>
                            </div>
                            
                        </div>
                    </div>
                </div>

                <div id="vung_nhung_khoi_15" style="display: none;"></div>
            </div>

            <div style="display: flex; gap: 12px; margin-top: 20px;">
                <button id="btnLuuHocLieu" onclick="ham_6a_4_luu_hoc_lieu_trac_nghiem_moi(this)" style="flex: 2; padding: 12px; background: #28a745; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; font-size: 15px;">
                    💾 LƯU HỌC LIỆU
                </button>
                <button onclick="ham_6a_1_ve_quan_ly_hoc_lieu_trac_nghiem()" style="flex: 1; padding: 12px; background: #6c757d; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 15px;">
                    ❌ HỦY
                </button>
            </div>
        </div>
    `;

    // Gọi định tuyến ban đầu
    setTimeout(() => ham_6a_3_b_cap_nhat_ma_theo_loai(), 50);
};


window.ham_6a_3_b_cap_nhat_ma_theo_loai = function () {
    const selPhanLoai = document.getElementById('selPhanLoaiHL');
    const loaiChon = selPhanLoai.value; 
    const txtMa = document.getElementById('txtMaHocLieu');
    const vungNhungK15 = document.getElementById('vung_nhung_khoi_15');
    const kvTracNghiem = document.getElementById('khu_vuc_nhap_trac_nghiem');

    // 1. Cập nhật mã
    txtMa.value = ham_6a_0_sinh_ma_hoc_lieu_trac_nghiem(loaiChon);
      // --- LUỒNG TRẮC NGHIỆM ---
        kvTracNghiem.style.display = 'block';
        vungNhungK15.style.display = 'none';
        vungNhungK15.innerHTML = "";
    
};

// ==============================================================
// Hàm 6.3.c: Xử lý hiệu ứng khi chuyển đổi Cách 1 (File) và Cách 2 (Tay)
// ==============================================================
// window.ham_6a_3_c_chuyen_doi_cach_nhap = function (cach) {
//     const kv1 = document.getElementById('khu_vuc_cach_1');
//     const kv2 = document.getElementById('khu_vuc_cach_2');
//     const btnLuu = document.getElementById('btnLuuHocLieu');
//     const txtCauTruc = document.getElementById('txtCauTruc');

//     if (cach === 1) {
//         // BẬT CÁCH 1: UPLOAD FILE
//         kv1.style.display = 'block';
//         kv2.style.display = 'none';

//         // Trả lại trạng thái nút Lưu của Cách 1
//         const file = document.getElementById('upload_file_input').files[0];
//         const daCheckFileXong = document.getElementById('btn_check_file').innerText.includes("🔍"); // Nếu chữ là kính lúp tức là đã chạy hàm xong

//         if (!file) {
//             btnLuu.disabled = true;
//             btnLuu.style.background = "#ccc";
//             btnLuu.style.cursor = "not-allowed";
//             btnLuu.innerText = "⚠️ HÃY CHỌN VÀ KIỂM TRA FILE TRƯỚC KHI LƯU";
//             txtCauTruc.value = "";
//         } else if (!daCheckFileXong || btnLuu.innerText.includes("HÃY KIỂM TRA")) {
//             btnLuu.disabled = true;
//             btnLuu.style.background = "#ccc";
//             btnLuu.style.cursor = "not-allowed";
//             btnLuu.innerText = "⚠️ HÃY KIỂM TRA FILE TRƯỚC KHI LƯU";
//         } else {
//             btnLuu.disabled = false;
//             btnLuu.style.background = "#28a745";
//             btnLuu.style.cursor = "pointer";
//             btnLuu.innerText = "💾 LƯU HỌC LIỆU VÀ ĐẨY LÊN GITHUB";
//         }
//     } else {
//         // BẬT CÁCH 2: NHẬP TAY ID6
//         kv1.style.display = 'none';
//         kv2.style.display = 'block';

//         // Cách 2 luôn mở khóa nút Lưu (sẽ check validation khi bấm)
//         btnLuu.disabled = false;
//         btnLuu.style.background = "#28a745";
//         btnLuu.style.cursor = "pointer";
//         btnLuu.innerText = "💾 LƯU HỌC LIỆU (NHẬP TAY)";

//         // Kích hoạt tính toán lại cấu trúc cho các ô nhập tay
//         if (typeof ham_6a_5_tinh_toan_cau_truc === 'function') {
//             ham_6a_5_tinh_toan_cau_truc();
//         }
//     }
// };


window.ham_6a_3_c_chuyen_doi_cach_nhap = function (cach) {
    const kv1 = document.getElementById('khu_vuc_cach_1');
    const kv2 = document.getElementById('khu_vuc_cach_2');
    const btnLuu = document.getElementById('btnLuuHocLieu');

    if (cach === 1) {
        kv1.style.display = 'block';
        kv2.style.display = 'none';

        // Phục hồi trạng thái nút Lưu của Cách 1
        const file = document.getElementById('upload_file_input').files[0];
        const daCheck = document.getElementById('btn_check_file').innerText.includes("🔍");
        if (!file || !daCheck || btnLuu.innerText.includes("HÃY")) {
            btnLuu.disabled = true;
            btnLuu.style.background = "#ccc";
            btnLuu.innerText = "⚠️ HÃY KIỂM TRA FILE TRƯỚC KHI LƯU";
        } else {
            btnLuu.disabled = false;
            btnLuu.style.background = "#28a745";
            btnLuu.innerText = "💾 LƯU HỌC LIỆU VÀ ĐẨY LÊN GITHUB";
        }
    } else {
        kv1.style.display = 'none';
        kv2.style.display = 'block';

        btnLuu.disabled = false;
        btnLuu.style.background = "#28a745";
        btnLuu.innerText = "💾 LƯU HỌC LIỆU (TỪ DRIVE)";

        // 🌟 TỰ ĐỘNG TẢI CÂY THƯ MỤC NẾU CHƯA CÓ
        const treeDiv = document.getElementById('tree-ngan-hang-drive');
        if (treeDiv && treeDiv.innerHTML.includes('Đang đợi')) {
            ham_6a_fetch_cay_thu_muc_drive();
        }
        ham_6a_cap_nhat_giao_dien_cau_da_chon();
    }
};





// Hàm 6.5: Tính toán cấu trúc 2025 và đếm số lượng câu hỏi thời gian thực
function ham_6a_5_tinh_toan_cau_truc() {
    const bocTach = (chuoi) => [...new Set(chuoi.split(/[\s,;]+/).filter(id => id.trim() !== ''))];

    const arrTN = bocTach(document.getElementById('txtID_TN').value);
    const arrDS = bocTach(document.getElementById('txtID_DS').value);
    const arrTLN = bocTach(document.getElementById('txtID_TLN').value);

    // Cập nhật số lượng hiển thị trên từng ô
    document.getElementById('demTN').innerText = arrTN.length;
    document.getElementById('demDS').innerText = arrDS.length;
    document.getElementById('demTLN').innerText = arrTLN.length;

    const tong = arrTN.length + arrDS.length + arrTLN.length;
    document.getElementById('lblTongCauHoi').innerText = `Tổng: ${tong} câu`;

    // Tự động tạo chuỗi cấu trúc ví dụ: 12TN-4DS-6TLN
    let mangMôTả = [];
    if (arrTN.length > 0) mangMôTả.push(`${arrTN.length}TN`);
    if (arrDS.length > 0) mangMôTả.push(`${arrDS.length}DS`);
    if (arrTLN.length > 0) mangMôTả.push(`${arrTLN.length}TLN`);

    document.getElementById('txtCauTruc').value = mangMôTả.join(' - ');
}




window.ham_6a_4_luu_hoc_lieu_trac_nghiem_moi = async function (btn) {
    const maHL = document.getElementById('txtMaHocLieu').value;
    const tenHL = document.getElementById('txtTenHocLieu').value.trim();
    
    const selPhanLoai = document.getElementById('selPhanLoaiHL');
    
    const phanLoai = selPhanLoai.value;
    const loaiKiemTra = selPhanLoai.options[selPhanLoai.selectedIndex].text;
    const khoiLop = document.getElementById('selKhoiLopHL').value;
    const thoiGian = parseInt(document.getElementById('numThoiGian').value) || 0;
    const trangThai = document.getElementById('selTrangThaiHL').value;
    const cauTruc = document.getElementById('txtCauTruc').value;

    if (!tenHL) return Swal.fire('Lỗi', 'Vui lòng nhập tên học liệu!', 'error');

        // --- LUỒNG 1: TRẮC NGHIỆM (Code cũ của thầy) ---
        const randomHex = (len) => Array.from({ length: len }, () => Math.floor(Math.random() * 16).toString(16)).join('');
        const taoMaGoc = () => {
            const xxxx = Math.floor(1000 + Math.random() * 9000);
            const xxx = Math.floor(100 + Math.random() * 900);
            return `${xxxx}-${xxx}`;
        };
        const taoMaCauHoi = () => "q_" + randomHex(10);
        const taoMaLoiGiai = () => "sol_" + randomHex(10);

        let danhSachKhoBau = [];
        let quyMo = 0;
        let so_tn = 0, so_ds = 0, so_tln = 0;




        // Kiểm tra sự tồn tại của radio button trước khi lấy value
        const radCachNhap = document.querySelector('input[name="radCachNhap"]:checked');
        const dangChonCach1 = radCachNhap ? radCachNhap.value === "1" : false;

        if (dangChonCach1) {
            let dsFile = window.DuLieuFileDeUpload || [];
            if (dsFile.length === 0) return Swal.fire('Lỗi', 'Chưa có dữ liệu từ file upload!', 'error');

            dsFile.forEach(cau => {
                let dapAn = window.ham_6_18_trich_xuat_dap_an(cau.noi_dung, cau.loai);
                if (cau.loai === "TN") so_tn++;
                else if (cau.loai === "DS") so_ds++;
                else if (cau.loai === "TLN" || cau.loai === "NGAN") so_tln++;

                danhSachKhoBau.push({ dap_an: dapAn, ma_goc: taoMaGoc(), ma_cau_hoi: taoMaCauHoi(), ma_loi_giai: taoMaLoiGiai() });
            });
            quyMo = dsFile.length;
        } else {
            // 🌟 LOGIC MỚI: CÁCH 2 - CHỌN TỪ DRIVE
            let dsDrive = window.DanhSachCauHoiDrive || [];
            if (dsDrive.length === 0) return Swal.fire('Lỗi', 'Thầy chưa nhặt câu hỏi nào từ Kho Drive vào giỏ!', 'error');

            dsDrive.forEach(cau => {
                if (cau.kieuCau === "TN") so_tn++;
                else if (cau.kieuCau === "DS") so_ds++;
                else so_tln++;

                // Tạm thời tạo ma_cau_hoi ngẫu nhiên, phần nội dung thực tế Web sẽ gọi Drive tải file JSON về để xử lý ở bước Đẩy Git sau.
                danhSachKhoBau.push({ dap_an: "", ma_goc: taoMaGoc(), ma_cau_hoi: taoMaCauHoi(), ma_loi_giai: taoMaLoiGiai(), drive_file_id: cau.fileId });
            });

            quyMo = danhSachKhoBau.length;
        }

        btn.disabled = true;
        btn.style.cursor = "wait";
        btn.innerText = "⏳ ĐANG LƯU DỮ LIỆU ĐỀ THI...";

        try {
            let urlDeGithub = null;
            if (dangChonCach1) {
                btn.innerText = "⏳ ĐANG CHUẨN HÓA VÀ ĐẨY FILE ĐỀ LÊN GITHUB...";
                urlDeGithub = await window.ham_6a_4_b_day_file_de_trac_nghiem_len_github(maHL, tenHL, danhSachKhoBau);
            }

            const metadataObj = {
                so_ds: so_ds, so_tn: so_tn, so_tln: so_tln,
                cau_truc: cauTruc || `${so_tn}TN | ${so_ds}DS | ${so_tln}TLN`,
                nguon_tao: dangChonCach1 ? "Web_Upload_File" : "Web_Nhap_Tay",
                phan_loai_goc: phanLoai
            };

            const uidGiaoVien = (typeof AppState !== 'undefined' && AppState.user && AppState.user.uid) ? AppState.user.uid : null;

            const payload = {
                ma_hoc_lieu: maHL, ten_hoc_lieu: tenHL, loai_kiem_tra: loaiKiemTra, khoi_lop: khoiLop,
                thoi_gian_lam_bai: thoiGian, trang_thai: trangThai, quy_mo_cau_hoi: quyMo,
                metadata: metadataObj, danh_sach_cau_hoi: danhSachKhoBau, url_github: urlDeGithub,
                uid_gv_tao: uidGiaoVien, ngay_tao: new Date().toISOString()
            };

            const { error } = await _supabase.from('hoc_lieu_trac_nghiem').insert([payload]);
            if (error) throw error;

            Swal.fire('Thành công', 'Đã lưu cấu trúc đề và đồng bộ GitHub hoàn tất!', 'success');
            btn.style.cursor = "pointer";
            ham_6a_1_ve_quan_ly_hoc_lieu_trac_nghiem();

        } catch (err) {
            Swal.fire('Lỗi', 'Giao dịch thất bại: ' + err.message, 'error');
            btn.disabled = false; btn.style.cursor = "pointer";
            btn.innerText = "💾 LƯU HỌC LIỆU VÀ ĐẨY LÊN GITHUB";
        }

    
};



// ==============================================================
// Hàm 6.4.b: Đẩy TOÀN BỘ Đề + Giải bằng Tree Commit (Bản chuẩn hóa cấu trúc C#)
// ==============================================================
window.ham_6a_4_b_day_file_de_trac_nghiem_len_github = async function (maHL, tenHL, dsKhoBau) {
    if (typeof CFG_HE_THONG === 'undefined') {
        throw new Error("Lỗi: Không tìm thấy cấu hình CFG_HE_THONG chứa Token Github.");
    }

    const GITHUB_TOKEN = CFG_HE_THONG.GITHUB_TOKEN;
    const GITHUB_REPO = CFG_HE_THONG.GITHUB_REPO;
    const BRANCH = "main";

    // Lấy thời gian làm bài trực tiếp từ giao diện để nạp vào vỏ file Đề y hệt C#
    const thoiGianLamDe = parseInt(document.getElementById('numThoiGian').value) || 0;

    // =====================================================================
    // 1. CHUẨN BỊ "KIỆN HÀNG" TRONG RAM (Đã nắn theo chuẩn cấu trúc C#)
    // =====================================================================
    const dsFileRAM = window.DuLieuFileDeUpload || [];
    let dsCauHoiTinhKhiet = [];
    let filesToCommit = [];

    dsFileRAM.forEach((cau, index) => {
        let khoBau = dsKhoBau[index];
        if (!khoBau) return;

        // Băm file TeX
        let phanTich = window.ham_6_17_phan_tich_cau_hoi_tex(cau.noi_dung);

        // Lọc dọn rác toán học (Hàm 6.19)
        let cauDanXuly = window.ham_6_19_xu_ly_du_lieu_truoc_khi_push(phanTich.cauDan);
        let paAXuly = window.ham_6_19_xu_ly_du_lieu_truoc_khi_push(phanTich.paA);
        let paBXuly = window.ham_6_19_xu_ly_du_lieu_truoc_khi_push(phanTich.paB);
        let paCXuly = window.ham_6_19_xu_ly_du_lieu_truoc_khi_push(phanTich.paC);
        let paDXuly = window.ham_6_19_xu_ly_du_lieu_truoc_khi_push(phanTich.paD);
        let loiGiaiXuly = window.ham_6_19_xu_ly_du_lieu_truoc_khi_push(phanTich.loiGiai);

        // Khớp kiểu câu tương thích C#
        let kieuNhanDien = "TN";
        if (cau.loai === "DS") kieuNhanDien = "DS";
        else if (cau.loai === "TLN" || cau.loai === "NGAN") kieuNhanDien = "TLN";

        // A. Đóng gói cho File Đề (Nắn chuẩn CamelCase và gọt bảo mật y hệt C#)
        let objCauHoi = {
            maCau: khoBau.ma_cau_hoi,   // Đổi ma_cau_hoi -> maCau
            ma_goc: khoBau.ma_goc,     // Giữ nguyên ma_goc
            kieuCau: kieuNhanDien,     // Đổi kieu_cau -> kieuCau
            cauDan: cauDanXuly         // Đổi cau_dan -> cauDan
        };

        // C# gọt bỏ phương án đối với câu tự luận ngắn
        if (kieuNhanDien !== "TLN") {
            objCauHoi.paA = paAXuly;
            objCauHoi.paB = paBXuly;
            objCauHoi.paC = paCXuly;
            objCauHoi.paD = paDXuly;
        }
        dsCauHoiTinhKhiet.push(objCauHoi);

        // B. Đóng gói cho File Lời Giải Băm Nhỏ (Nội dung không đổi)
        let objLoiGiai = {
            maBaoMat: khoBau.ma_loi_giai,
            dapAn: khoBau.dap_an,
            loiGiai: loiGiaiXuly
        };
        filesToCommit.push({
            path: `Ngan_Hang_Loi_Giai/${khoBau.ma_loi_giai}.json`,
            mode: "100644",
            type: "blob",
            content: JSON.stringify(objLoiGiai, null, 4)
        });
    });

    // C. Đóng gói File Đề (Nắn chuẩn 3 key: maDe, tenDe, thoiGian, danhSachCauHoi)
    let objDeThi = {
        maDe: maHL,
        tenDe: tenHL,
        thoiGian: thoiGianLamDe,
        danhSachCauHoi: dsCauHoiTinhKhiet
    };

    const tenFileDeGithub = `Kho_De_Thi/${maHL}/DeThi_${maHL}.json`;
    filesToCommit.push({
        path: tenFileDeGithub,
        mode: "100644",
        type: "blob",
        content: JSON.stringify(objDeThi, null, 4)
    });

    // =====================================================================
    // 2. GỌI API TREE COMMIT (Giữ nguyên phần push lên Github phía dưới)
    // =====================================================================
    const baseURL = `https://api.github.com/repos/${GITHUB_REPO}`;
    const headers = {
        "Authorization": `token ${GITHUB_TOKEN}`,
        "Accept": "application/vnd.github.v3+json",
        "Content-Type": "application/json"
    };

    try {
        let res = await fetch(`${baseURL}/git/refs/heads/${BRANCH}`, { headers });
        if (!res.ok) throw new Error("Không truy cập được nhánh Github.");
        let data = await res.json();
        let baseCommitSha = data.object.sha;

        res = await fetch(`${baseURL}/git/commits/${baseCommitSha}`, { headers });
        data = await res.json();
        let baseTreeSha = data.tree.sha;

        res = await fetch(`${baseURL}/git/trees`, {
            method: "POST", headers,
            body: JSON.stringify({ base_tree: baseTreeSha, tree: filesToCommit })
        });
        if (!res.ok) throw new Error("Không tạo được cấu trúc file trên Github.");
        data = await res.json();
        let newTreeSha = data.sha;

        res = await fetch(`${baseURL}/git/commits`, {
            method: "POST", headers,
            body: JSON.stringify({
                message: `Web System: Tạo đề ${maHL} và băm ${filesToCommit.length - 1} lời giải chuẩn cấu trúc`,
                tree: newTreeSha,
                parents: [baseCommitSha]
            })
        });
        if (!res.ok) throw new Error("Ghi nhận lịch sử lên Github thất bại.");
        data = await res.json();
        let newCommitSha = data.sha;

        res = await fetch(`${baseURL}/git/refs/heads/${BRANCH}`, {
            method: "PATCH", headers,
            body: JSON.stringify({ sha: newCommitSha })
        });
        if (!res.ok) throw new Error("Đẩy dữ liệu chốt sổ thất bại.");

        const repoParts = GITHUB_REPO.split('/');
        const owner = repoParts[0];
        const repoName = repoParts[1];
        const linkFileDe = `https://${owner}.github.io/${repoName}/${tenFileDeGithub}`;

        return linkFileDe;

    } catch (err) {
        console.error("Lỗi Tree Commit Github:", err);
        throw err;
    }
};

// Hàm 6.5: Lấy ID từ 3 ô, đếm và tự động tạo chuỗi cấu trúc
function ham_6a_5_tinh_toan_cau_truc() {
    const bocTach = (chuoi) => [...new Set(chuoi.split(/[\s,;]+/).filter(id => id.trim() !== ''))];

    const arrTN = bocTach(document.getElementById('txtID_TN').value);
    const arrDS = bocTach(document.getElementById('txtID_DS').value);
    const arrTLN = bocTach(document.getElementById('txtID_TLN').value);

    // Cập nhật nhãn đếm từng phần
    document.getElementById('demTN').innerText = arrTN.length;
    document.getElementById('demDS').innerText = arrDS.length;
    document.getElementById('demTLN').innerText = arrTLN.length;

    const tongCau = arrTN.length + arrDS.length + arrTLN.length;
    document.getElementById('lblTongCauHoi').innerText = `Tổng: ${tongCau} câu`;

    // Tự động sinh chuỗi cấu trúc
    let mangCauTruc = [];
    if (arrTN.length > 0) mangCauTruc.push(`${arrTN.length}TN`);
    if (arrDS.length > 0) mangCauTruc.push(`${arrDS.length}DS`);
    if (arrTLN.length > 0) mangCauTruc.push(`${arrTLN.length}TLN`);

    const txtCauTruc = document.getElementById('txtCauTruc');
    txtCauTruc.value = mangCauTruc.join(' - ');
}


// ==============================================================
// Hàm 6.15: Tự động sinh và tải File Mẫu cấu trúc LaTeX (ex_test)
// ==============================================================
window.ham_6a_15_tai_file_mau = function () {
    // 1. Soạn sẵn nội dung chuẩn của file mẫu
    const noiDungMau = `% ==============================================
% FILE MẪU UPLOAD HỌC LIỆU (ĐỀ THI / CÂU HỎI)
% Dành cho hệ thống quản lý học liệu
% ==============================================
% LƯU Ý: 
% - Mỗi câu hỏi phải nằm gọn trong cấu trúc 
% - Mã câu phải nằm trong dấu ngoặc vuông ngay dòng đầu tiên. (có thể không có)
% - Hệ thống sẽ tự bóc tách lời giải 
% ==============================================

% ----------------------------------------------
% 1. MẪU CÂU TRẮC NGHIỆM (1 ĐÁP ÁN ĐÚNG)
% ----------------------------------------------
\\begin{ex}%[1D1N2-1]
Nội dung câu hỏi trắc nghiệm (Chọn 1 đáp án đúng) nằm ở đây.
\\choice
{Đáp án A sai}
{\\True Đáp án B đúng}
{Đáp án C sai}
{Đáp án D sai}
\\loigiai{
Đây là lời giải chi tiết của câu trắc nghiệm.
}
\\end{ex}

% ----------------------------------------------
% 2. MẪU CÂU ĐÚNG / SAI (Gói \\choiceTF)
% ----------------------------------------------
\\begin{ex}%[1D1H2-2]
Nội dung câu hỏi Đúng/Sai nằm ở đây.
\\choiceTF
{\\True Ý A đúng}
{Ý B sai}
{\\True Ý C đúng}
{Ý D sai}
\\loigiai{
        \\begin{itemchoice}
			\\itemch Đây là lời giải cho ý 1.\\
            \\itemch Đây là lời giải cho ý 2.\\
            \\itemch Đây là lời giải cho ý 3.\\
            \\itemch Đây là lời giải cho ý 4.\\
		\\end{itemchoice}
}
\\end{ex}

% ----------------------------------------------
% 3. MẪU CÂU TRẢ LỜI NGẮN (Gói \\shortans)
% ----------------------------------------------
\\begin{ex}%[1D1V2-3]
Nội dung câu hỏi trả lời ngắn nằm ở đây.
\\shortans[oly]{12.4}
\\loigiai{
Đây là lời giải chi tiết cho câu trả lời ngắn.
}
\\end{ex}
`;

    // 2. Chuyển đổi nội dung thành Blob (Gói dữ liệu nhị phân)
    const blob = new Blob([noiDungMau], { type: "text/plain;charset=utf-8" });

    // 3. Tạo một đường link ảo trong RAM trình duyệt
    const url = URL.createObjectURL(blob);

    // 4. Tạo thẻ <a> ẩn, gán link ảo và ép click để tải xuống
    const a = document.createElement("a");
    a.href = url;
    a.download = "Mau_Upload_De_Thi.tex"; // Tên file khi lưu về máy
    document.body.appendChild(a);
    a.click();

    // 5. Dọn dẹp RAM ngay sau khi tải xong
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};


// ==============================================================
// Hàm 6.6: Vẽ Form Sửa Học Liệu (Dò điều kiện KHẲNG ĐỊNH theo loại học liệu)
// ==============================================================
window.ham_6a_6_mo_form_sua_hoc_lieu_trac_nghiem = async function (maHocLieu, choPhepSua = true) {
    const data = BangHocLieuState.duLieu.find(hl => hl.ma_hoc_lieu === maHocLieu);
    if (!data) return alert("Dữ liệu không tồn tại!");

    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');

    
    vungLamViec.innerHTML = `<div style="text-align: center; padding: 40px;"><div style="border: 4px solid #f3f3f3; border-top: 4px solid #3498db; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 0 auto;"></div><h3 style="color:#1a73e8; margin-top:15px;">⏳ Đang tải nội dung gốc từ kho GitHub...</h3></div>`;

    let dsCauHoiGithub = [];
    let urlFileGiai = data.url_file_giai || "";

         try {
            if (data.url_github) {
                let fetchUrl = data.url_github + "?t=" + Date.now();
                if (typeof CFG_HE_THONG !== 'undefined' && data.url_github.includes('.io/')) {
                    try {
                        const urlParts = data.url_github.split('.io/');
                        let pathParts = urlParts[1].split('/'); pathParts.shift();
                        const pathFileDe = pathParts.join('/');
                        fetchUrl = `https://raw.githubusercontent.com/${CFG_HE_THONG.GITHUB_REPO}/main/${pathFileDe}?t=${Date.now()}`;
                    } catch (e) { }
                }
                const res = await fetch(fetchUrl);
                if (res.ok) {
                    const dataGH = await res.json();
                    dsCauHoiGithub = dataGH.danhSachCauHoi || [];
                }
            }
        } catch (e) {
            console.error("Lỗi mạng khi nạp file:", e);
        }
    

    const tieuDe = choPhepSua ? "✏️ CHỈNH SỬA THÔNG TIN" : "👁️ XEM CHI TIẾT";
    
    // Tùy biến màu tiêu đề theo tính chất công việc để giao diện trực quan
    let mauTieuDe = "#1a73e8";
    if (choPhepSua) {
        mauTieuDe = "#f39c12";
    }

    const disabledAttr = choPhepSua ? "" : "disabled";
    const bgInput = choPhepSua ? "#fff" : "#f1f3f4";

    let htmlCards = '';
    let htmlTaoFileGiai = '';

    
        // Trả lại luồng xử lý trắc nghiệm nguyên bản
        const dsCauHoiDB = data.danh_sach_cau_hoi || [];
        dsCauHoiDB.forEach((itemDB, index) => {
            let maGoc = typeof itemDB === 'object' ? (itemDB.ma_goc || "") : (itemDB.split('|')[0] || "");
            let maCau = typeof itemDB === 'object' ? (itemDB.ma_cau_hoi || "") : (itemDB.split('|')[1] || "");
            let maGiai = typeof itemDB === 'object' ? (itemDB.ma_loi_giai || "") : (itemDB.split('|')[2] || "");
            let dapAnDB = typeof itemDB === 'object' ? (itemDB.dap_an || "") : (itemDB.split('|')[3] || "");

            let itemGH = dsCauHoiGithub.find(c => c.maCau === maCau) || {};
            let kieuCau = itemGH.kieuCau || "TN";
            let cauDan = itemGH.cauDan || "";
            let htmlNoiDung = '';

            if (kieuCau === 'TN') {
                htmlNoiDung = `
                    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin-top:10px;">
                        <div><b style="color:#1a73e8">A.</b> <input type="text" class="edit-paA" value="${(itemGH.paA || "").replace(/"/g, '&quot;')}" ${disabledAttr} style="width:90%; padding:5px; background:${bgInput}; border:1px solid #ccc; border-radius:4px;"></div>
                        <div><b style="color:#1a73e8">B.</b> <input type="text" class="edit-paB" value="${(itemGH.paB || "").replace(/"/g, '&quot;')}" ${disabledAttr} style="width:90%; padding:5px; background:${bgInput}; border:1px solid #ccc; border-radius:4px;"></div>
                        <div><b style="color:#1a73e8">C.</b> <input type="text" class="edit-paC" value="${(itemGH.paC || "").replace(/"/g, '&quot;')}" ${disabledAttr} style="width:90%; padding:5px; background:${bgInput}; border:1px solid #ccc; border-radius:4px;"></div>
                        <div><b style="color:#1a73e8">D.</b> <input type="text" class="edit-paD" value="${(itemGH.paD || "").replace(/"/g, '&quot;')}" ${disabledAttr} style="width:90%; padding:5px; background:${bgInput}; border:1px solid #ccc; border-radius:4px;"></div>
                    </div>`;
            } else if (kieuCau === 'DS') {
                htmlNoiDung = `
                    <div style="display:grid; grid-template-columns: 1fr; gap:8px; margin-top:10px;">
                        <div><b style="color:#d35400">Ý 1:</b> <input type="text" class="edit-paA" value="${(itemGH.paA || "").replace(/"/g, '&quot;')}" ${disabledAttr} style="width:95%; padding:5px; background:${bgInput}; border:1px solid #ccc; border-radius:4px;"></div>
                        <div><b style="color:#d35400">Ý 2:</b> <input type="text" class="edit-paB" value="${(itemGH.paB || "").replace(/"/g, '&quot;')}" ${disabledAttr} style="width:95%; padding:5px; background:${bgInput}; border:1px solid #ccc; border-radius:4px;"></div>
                        <div><b style="color:#d35400">Ý 3:</b> <input type="text" class="edit-paC" value="${(itemGH.paC || "").replace(/"/g, '&quot;')}" ${disabledAttr} style="width:95%; padding:5px; background:${bgInput}; border:1px solid #ccc; border-radius:4px;"></div>
                        <div><b style="color:#d35400">Ý 4:</b> <input type="text" class="edit-paD" value="${(itemGH.paD || "").replace(/"/g, '&quot;')}" ${disabledAttr} style="width:95%; padding:5px; background:${bgInput}; border:1px solid #ccc; border-radius:4px;"></div>
                    </div>`;
            }

            htmlCards += `
                <div class="card-cau-hoi" data-macau="${maCau}" data-magoc="${maGoc}" data-magiai="${maGiai}" data-kieucau="${kieuCau}" style="background: #fdfdfd; border: 1px solid #e0e0e0; border-radius: 8px; padding: 15px; margin-bottom: 15px; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
                    <div style="display:flex; justify-content:space-between; margin-bottom:10px; border-bottom:1px dashed #ccc; padding-bottom:5px;">
                        <span style="font-weight:bold; color:#333;">Câu ${index + 1} (${kieuCau}) - Mã gốc: <span style="color:#28a745">${maGoc}</span></span>
                        <div>
                            <span style="font-weight:bold; color:#d32f2f; margin-right:10px;">ĐÁP ÁN:</span>
                            <input type="text" class="edit-dapan" value="${dapAnDB}" ${disabledAttr} placeholder="${kieuCau === 'DS' ? 'TFTF' : 'A'}" style="width:80px; padding:4px; text-align:center; font-weight:bold; border:2px solid #d32f2f; border-radius:4px; text-transform:uppercase;">
                            ${choPhepSua ? `<button onclick="ham_6a_xoa_cau_truc_tiep(this)" style="margin-left:10px; padding:4px 8px; background:#dc3545; color:white; border:none; border-radius:4px; cursor:pointer;" title="Xóa câu này">🗑️</button>` : ''}
                        </div>
                    </div>
                    <div>
                        <textarea class="edit-caudan" ${disabledAttr} rows="3" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:4px; background:${bgInput}; font-family:inherit; resize:vertical;">${cauDan}</textarea>
                    </div>
                    ${htmlNoiDung}
                </div>`;
        });

        htmlTaoFileGiai = choPhepSua ? `
            <div style="background: #fff8e6; border: 1px solid #ffe8a1; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
                <h4 style="margin:0 0 10px 0; color:#d35400; font-size:14px;">🛠️ TÁC VỤ ĐỒNG BỘ SAU KHI LƯU</h4>
                <label style="cursor:pointer; display:flex; align-items: center; margin-bottom:8px;">
                    <input type="checkbox" id="sua_hl_tu_dong_gom_file" checked style="transform:scale(1.2); margin-right:10px;"> 
                    <span style="font-weight:bold; font-size:14px; color:#333;">🚀 Tự động ${urlFileGiai ? 'cập nhật (ghi đè)' : 'tạo mới'} file giải gộp trên GitHub</span>
                </label>
            </div>` : '';
    

    vungLamViec.innerHTML = `
        <div style="max-width: 1000px; background: white; padding: 25px; border-radius: 12px; border: 1px solid #e0e0e0; margin: 0 auto;">
            <h3 style="color:${mauTieuDe}; margin-top:0;">${tieuDe}: ${maHocLieu}</h3>

            <div style="display:flex; gap:10px; margin-bottom:20px; padding:15px; background:#f8f9fa; border-radius:8px;">
                <div style="flex:2">
                    <label style="font-weight:bold; font-size:12px; color:#666;">Tên Học Liệu</label>
                    <input type="text" id="sua_tenHocLieu" value="${data.ten_hoc_lieu}" ${disabledAttr} style="width:100%; padding:8px; border:1px solid #ccc; border-radius:4px;">
                </div>
                <div style="flex:1">
                    <label style="font-weight:bold; font-size:12px; color:#666;">Trạng thái</label>
                    <select id="sua_trangThai" ${disabledAttr} style="width:100%; padding:8px; border:1px solid #ccc; border-radius:4px;">
                        <option value="noi_bo" ${data.trang_thai === 'noi_bo' ? 'selected' : ''}>🔴 Nội bộ</option>
                        <option value="cong_khai" ${data.trang_thai === 'cong_khai' ? 'selected' : ''}>🟢 Công khai</option>
                    </select>
                </div>
                <div style="flex:1">
                    <label style="font-weight:bold; font-size:12px; color:#666;">Thời gian (Phút)</label>
                    <input type="number" id="sua_thoiGian" value="${data.thoi_gian_lam_bai}" ${disabledAttr} style="width:100%; padding:8px; border:1px solid #ccc; border-radius:4px;">
                </div>
            </div>

            <div id="vung-chua-cau-hoi" style="max-height: 500px; overflow-y: auto; margin-bottom:20px; padding-right:10px;">
                ${htmlCards}
            </div>

            ${htmlTaoFileGiai}

            <div style="display: flex; gap: 10px;">
                ${choPhepSua ? `<button onclick="ham_6a_7_luu_cap_nhat_hoc_lieu_trac_nghiem('${maHocLieu}', this)" 
                style="padding:15px; background:#28a745; color:white; border:none; border-radius:6px; font-weight:bold; cursor:pointer; flex:2;">
                💾 LƯU THAY ĐỔI VÀ ĐỒNG BỘ GITHUB</button>` : ''}
                <button onclick="ham_6a_1_ve_quan_ly_hoc_lieu_trac_nghiem()" style="padding:15px; background:#6c757d; color:white; border:none; border-radius:6px; cursor:pointer; flex:1;">⬅️ QUAY LẠI</button>
            </div>
        </div>
    `;
};





// Cờ đánh dấu câu bị xóa tạm thời trên giao diện
function ham_6a_xoa_cau_hoi_tam_thoi(index) {
    const row = document.getElementById(`row_cau_${index}`);
    const input = document.getElementById(`dapan_${index}`);

    if (row.style.opacity === '0.3') {
        row.style.opacity = '1';
        input.disabled = false;
        row.dataset.deleted = "false";
    } else {
        row.style.opacity = '0.3';
        input.disabled = true;
        row.dataset.deleted = "true"; // Đánh dấu đã xóa
    }
}

// Hàm 6.6.b: Xóa dòng và cập nhật lại toàn bộ STT + Tổng số câu
function ham_6a_xoa_cau_truc_tiep(btn) {
    if (!confirm("Thầy có chắc chắn muốn loại bỏ câu hỏi này khỏi đề không?")) return;

    // 1. Tìm dòng tr chứa nút bấm và xóa nó đi
    const row = btn.closest('tr');
    row.remove();

    // 2. Đánh lại số thứ tự (STT) cho các dòng còn lại
    const rows = document.querySelectorAll('#tbodySuaCauHoi .row-cau-hoi');
    rows.forEach((r, index) => {
        r.querySelector('.stt-cau').innerText = index + 1;
    });

    // 3. Cập nhật lại nhãn "Tổng: X câu" trên tiêu đề
    document.getElementById('lblSoCauHienTai').innerText = `Tổng: ${rows.length} câu`;
}


// ==============================================================
// Hàm 6.7: Lưu Cập Nhật Học Liệu (Định tuyến phân nhánh & Cập nhật nội dung Text)
// ==============================================================
window.ham_6a_7_luu_cap_nhat_hoc_lieu_trac_nghiem = async function (maHocLieu, btnNode) {
    // 1. Lấy thông tin cơ bản
    const elTen = document.getElementById('sua_tenHocLieu');
    const elThoiGian = document.getElementById('sua_thoiGian');
    const elTrangThai = document.getElementById('sua_trangThai');
    
    if (!elTen) return alert("Lỗi giao diện: Không tìm thấy ô Tên Học Liệu!");

    const tenMoi = elTen.value.trim();
    const thoiGianMoi = parseInt(elThoiGian.value) || 0;
    const trangThaiMoi = elTrangThai.value;

    if (!tenMoi) return Swal.fire('Lỗi', 'Tên học liệu không được để trống!', 'error');

    
    // Khóa nút bấm để tránh click nhiều lần
    btnNode.disabled = true;
    btnNode.style.background = "#f39c12";

    try {
        
            const cards = document.querySelectorAll('.card-cau-hoi');
            let banDoSupabase = [];
            let dsCauHoiGithubMoi = [];
            let danhSachGiaiCapNhat = [];

            cards.forEach(card => {
                const maCau = card.getAttribute('data-macau');
                const maGoc = card.getAttribute('data-magoc');
                const maGiai = card.getAttribute('data-magiai');
                const kieuCau = card.getAttribute('data-kieucau');

                const dapAn = card.querySelector('.edit-dapan').value.trim().toUpperCase();
                const cauDan = card.querySelector('.edit-caudan').value;

                banDoSupabase.push({ dap_an: dapAn, ma_goc: maGoc, ma_cau_hoi: maCau, ma_loi_giai: maGiai });

                let cauHoiGH = { maCau: maCau, ma_goc: maGoc, kieuCau: kieuCau, cauDan: cauDan };

                if (kieuCau !== 'TLN') {
                    cauHoiGH.paA = card.querySelector('.edit-paA') ? card.querySelector('.edit-paA').value : "";
                    cauHoiGH.paB = card.querySelector('.edit-paB') ? card.querySelector('.edit-paB').value : "";
                    cauHoiGH.paC = card.querySelector('.edit-paC') ? card.querySelector('.edit-paC').value : "";
                    cauHoiGH.paD = card.querySelector('.edit-paD') ? card.querySelector('.edit-paD').value : "";
                }
                dsCauHoiGithubMoi.push(cauHoiGH);
                danhSachGiaiCapNhat.push({ maGiai: maGiai, dapAn: dapAn });
            });

            if (banDoSupabase.length === 0) throw new Error("Không thể lưu học liệu trắc nghiệm rỗng! (Cần ít nhất 1 câu hỏi)");

            btnNode.innerText = "⏳ ĐANG ĐỒNG BỘ GITHUB...";
            
            // Lấy URL GitHub cũ từ DB
            const { data: oldData } = await _supabase.from('hoc_lieu_trac_nghiem').select('url_github').eq('ma_hoc_lieu', maHocLieu).single();
            const urlDeCu = oldData ? oldData.url_github : "";
            
            // Đồng bộ file lên GitHub nếu người dùng chọn
            const chkGopFile = document.getElementById('sua_hl_tu_dong_gom_file');
            if (chkGopFile && chkGopFile.checked) {
                await window.ham_6a_7_b_cap_nhat_file_github(maHocLieu, tenMoi, thoiGianMoi, dsCauHoiGithubMoi, danhSachGiaiCapNhat, urlDeCu);
            }

            // Cập nhật cấu trúc bảng đồ vào Supabase
            btnNode.innerText = "⏳ ĐANG LƯU VÀO DATABASE...";
            await _supabase.from('hoc_lieu_trac_nghiem').update({
                ten_hoc_lieu: tenMoi, 
                thoi_gian_lam_bai: thoiGianMoi, 
                trang_thai: trangThaiMoi,
                danh_sach_cau_hoi: banDoSupabase, 
                quy_mo_cau_hoi: banDoSupabase.length
            }).eq('ma_hoc_lieu', maHocLieu);

            // Gom file giải JSON
            if (chkGopFile && chkGopFile.checked && typeof window.ham_7a_13_ra_lenh_tao_file_giai_trac_nghiem === 'function') {
                btnNode.innerText = "⏳ ĐANG GOM FILE GIẢI (JSON)...";
                await window.ham_7a_13_ra_lenh_tao_file_giai_trac_nghiem(null, maHocLieu);
            }

        

        // =================================================================
        // HOÀN TẤT VÀ LÀM MỚI GIAO DIỆN
        // =================================================================
        Swal.fire('Thành công!', 'Đã cập nhật thông tin học liệu thành công!', 'success');
        
        // Vẽ lại bảng danh sách học liệu
        if (typeof window.ham_6a_1_ve_quan_ly_hoc_lieu_trac_nghiem === 'function') {
            window.ham_6a_1_ve_quan_ly_hoc_lieu_trac_nghiem();
        }

    } catch (error) {
        console.error("❌ Lỗi Cập nhật:", error);
        Swal.fire('Lỗi', error.message, 'error');
        
        // Trả lại trạng thái nút bấm ban đầu tùy theo luồng
        btnNode.disabled = false;
        btnNode.innerText = `💾 LƯU THAY ĐỔI ${loaiHL === "TRAC_NGHIEM" ? 'VÀ ĐỒNG BỘ GITHUB' : ''}`;
        btnNode.style.background = "#28a745";
    }
};



// ==============================================================
// [ĐÃ GỘP VÀ TỐI ƯU] - Hàm 6.7.b: Cập nhật File Đề lên GitHub (Tree Commit)
// ==============================================================
window.ham_6a_7_b_cap_nhat_file_github = async function (maHL, tenHL, thoiGian, dsCauHoiGithubMoi, dsGiai, urlDeCu) {
    if (typeof CFG_HE_THONG === 'undefined') throw new Error("Lỗi cấu hình GITHUB.");

    const GITHUB_TOKEN = CFG_HE_THONG.GITHUB_TOKEN;
    const GITHUB_REPO = CFG_HE_THONG.GITHUB_REPO;
    const BRANCH = "main";
    const baseURL = `https://api.github.com/repos/${GITHUB_REPO}`;
    const headers = {
        "Authorization": `token ${GITHUB_TOKEN}`,
        "Accept": "application/vnd.github.v3+json",
        "Content-Type": "application/json"
    };

    // 🌟 ĐỊNH VỊ TỌA ĐỘ FILE GHI ĐÈ (Tổng hợp bộ cắt tọa độ siêu chuẩn)
    let tenFileDe = `Kho_De_Thi/${maHL}/DeThi_${maHL}.json`; // Dự phòng
    if (urlDeCu) {
        try {
            if (urlDeCu.includes('.io/')) {
                const urlParts = urlDeCu.split('.io/');
                let pathParts = urlParts[1].split('/');
                pathParts.shift(); // Cắt bỏ tên Repo
                tenFileDe = pathParts.join('/');
            } else if (urlDeCu.includes('/main/')) {
                tenFileDe = urlDeCu.split('/main/')[1];
            } else if (urlDeCu.includes('Kho_De_Thi')) {
                tenFileDe = urlDeCu.substring(urlDeCu.indexOf('Kho_De_Thi'));
            }
        } catch (e) {
            console.warn("Lỗi bóc tách path:", e);
        }
    }

    console.log("🔗 [DEBUG] Tọa độ đè file chính xác trên GitHub:", tenFileDe);

    let filesToCommit = [{
        path: tenFileDe,
        mode: "100644",
        type: "blob",
        content: JSON.stringify({
            maDe: maHL, tenDe: tenHL, thoiGian: thoiGian, danhSachCauHoi: dsCauHoiGithubMoi
        }, null, 4)
    }];

    try {
        let res = await fetch(`${baseURL}/git/refs/heads/${BRANCH}`, { headers });
        if (!res.ok) throw new Error("Không truy cập được nhánh Github.");
        let data = await res.json();
        let baseCommitSha = data.object.sha;

        res = await fetch(`${baseURL}/git/commits/${baseCommitSha}`, { headers });
        data = await res.json();
        let baseTreeSha = data.tree.sha;

        res = await fetch(`${baseURL}/git/trees`, {
            method: "POST", headers,
            body: JSON.stringify({ base_tree: baseTreeSha, tree: filesToCommit })
        });
        if (!res.ok) throw new Error("Lỗi cập nhật cấu trúc file Github.");
        data = await res.json();
        let newTreeSha = data.sha;
        console.log("🛠️ [RADAR 5] Đã tạo Tree thành công:", newTreeSha);

        res = await fetch(`${baseURL}/git/commits`, {
            method: "POST", headers,
            body: JSON.stringify({ message: `Web Update: Chỉnh sửa trực tiếp nội dung đề ${maHL}`, tree: newTreeSha, parents: [baseCommitSha] })
        });
        data = await res.json();
        let newCommitSha = data.sha;

        res = await fetch(`${baseURL}/git/refs/heads/${BRANCH}`, {
            method: "PATCH", headers,
            body: JSON.stringify({ sha: newCommitSha })
        });
        if (!res.ok) throw new Error("Đẩy dữ liệu chốt sổ thất bại.");

        console.log("🛠️ [RADAR 6] Đã xác nhận Commit. SHA:", newCommitSha);

        const repoParts = GITHUB_REPO.split('/');
        return `https://${repoParts[0]}.github.io/${repoParts[1]}/${tenFileDe}`;

    } catch (err) {
        console.error("❌ Lỗi Tree Commit:", err);
        throw err;
    }
};


// ==============================================================
// Hàm 6.13: Kiểm tra file upload (Đã fix lỗi chặn nhầm dòng comment %)
// ==============================================================
window.ham_6a_13_kiem_tra_file_upload = function () {
    const fileInput = document.getElementById('upload_file_input');
    const file = fileInput.files[0];
    const btnLuu = document.getElementById('btnLuuHocLieu');
    const khuVucLoi = document.getElementById('khu_vuc_bao_loi_file');
    const btnCheck = document.getElementById('btn_check_file');

    if (!file) {
        khuVucLoi.innerHTML = "❌ Vui lòng chọn file trước khi kiểm tra!";
        khuVucLoi.style.display = 'block';
        return;
    }

    btnCheck.innerText = "⏳ Đang quét dữ liệu...";
    btnCheck.disabled = true;

    const reader = new FileReader();
    reader.onload = function (e) {
        const content = e.target.result;

        // 🌟 1. CHỐT CHẶN: KIỂM TRA HÌNH ẢNH VẬT LÝ (BỎ QUA DÒNG COMMENT)
        // Regex giải thích: 
        // ^             : Bắt đầu mỗi dòng (nhờ cờ m)
        // (?:[^%\r\n]|\\%)* : Đi qua các ký tự không phải dấu % (hoặc là ký tự \% hợp lệ của LaTeX)
        // \\includegraphics   : Đụng phải lệnh chèn ảnh
        const coHinhAnhVatLy = /^(?:[^%\r\n]|\\%)*\\includegraphics/im.test(content);

        if (coHinhAnhVatLy) {
            khuVucLoi.innerHTML = `❌ <b>PHÁT HIỆN LỖI TƯƠNG THÍCH:</b> File của thầy chứa lệnh <code>\\includegraphics</code> đang hoạt động.<br>
            <i>Hệ thống Web hiện tại yêu cầu 100% Text và Code TikZ thuần. Thầy vui lòng xóa (hoặc thêm dấu % để comment) các lệnh chèn ảnh vật lý, sau đó lưu file và Upload lại nhé!</i>`;
            khuVucLoi.style.background = "#f8d7da";
            khuVucLoi.style.borderLeft = "4px solid #dc3545";
            khuVucLoi.style.color = "#721c24";
            khuVucLoi.style.display = 'block';

            btnLuu.disabled = true;
            btnLuu.style.background = "#ccc";
            btnLuu.style.cursor = "not-allowed";
            btnLuu.innerText = "⚠️ HÃY SỬA FILE VÀ UPLOAD LẠI";

            btnCheck.innerText = "🔍 Kiểm tra File";
            btnCheck.disabled = false;
            return;
        }

        // 🌟 2. BÓC TÁCH VÀ PHÂN LOẠI CÂU HỎI
        const regexCauHoi = /\\begin\{ex\}([\s\S]*?)\\end\{ex\}/g;
        let match;
        let count = 0;
        let dsTN = [], dsDS = [], dsTLN = [];

        window.DuLieuFileDeUpload = [];

        while ((match = regexCauHoi.exec(content)) !== null) {
            count++;
            let rawCau = "\\begin{ex}" + match[1] + "\\end{ex}";

            let phanDau = match[1].split('\n')[0];
            let idMatch = phanDau.match(/\[(.*?)\]/);
            let id6 = idMatch ? idMatch[1].trim() : "";

            let loaiCau = "TN";
            if (rawCau.includes('\\choiceTF')) {
                loaiCau = "DS";
                dsDS.push(count);
            } else if (rawCau.includes('\\shortans')) {
                loaiCau = "TLN";
                dsTLN.push(count);
            } else {
                dsTN.push(count);
            }

            window.DuLieuFileDeUpload.push({
                id6: id6,
                loai: loaiCau,
                noi_dung: rawCau
            });
        }

        btnCheck.innerText = "🔍 Kiểm tra File";
        btnCheck.disabled = false;

        if (count === 0) {
            khuVucLoi.innerHTML = "❌ Không tìm thấy câu hỏi nào! Thầy hãy kiểm tra xem file có chứa cấu trúc <b>\\begin{ex} ... \\end{ex}</b> không nhé.";
            khuVucLoi.style.background = "#fff3cd";
            khuVucLoi.style.borderLeft = "4px solid #dc3545";
            khuVucLoi.style.color = "#856404";
            khuVucLoi.style.display = 'block';
            return;
        }

        khuVucLoi.innerHTML = `✅ <b>File hợp lệ!</b> Đã bóc tách thành công <b>${count}</b> câu hỏi. File đảm bảo an toàn, không chứa ảnh vật lý.`;
        khuVucLoi.style.background = "#d4edda";
        khuVucLoi.style.borderLeft = "4px solid #28a745";
        khuVucLoi.style.color = "#155724";
        khuVucLoi.style.display = 'block';

        let cauTrucStr = [];
        if (dsTN.length > 0) cauTrucStr.push(`TN:${dsTN.length}`);
        if (dsDS.length > 0) cauTrucStr.push(`DS:${dsDS.length}`);
        if (dsTLN.length > 0) cauTrucStr.push(`TLN:${dsTLN.length}`);

        document.getElementById('txtCauTruc').value = cauTrucStr.length > 0 ? cauTrucStr.join(" | ") : "Chưa rõ cấu trúc";

        btnLuu.disabled = false;
        btnLuu.style.background = "#28a745";
        btnLuu.style.cursor = "pointer";
        btnLuu.innerText = "💾 LƯU HỌC LIỆU VÀ ĐẨY LÊN GITHUB";
    };

    reader.onerror = function () {
        khuVucLoi.innerHTML = "❌ Lỗi trình duyệt không thể đọc được file này!";
        khuVucLoi.style.display = 'block';
        btnCheck.innerText = "🔍 Kiểm tra File";
        btnCheck.disabled = false;
        btnCheck.style.cursor = "pointer";
    };

    reader.readAsText(file);
};


window.ham_6a_16_xu_ly_thay_doi_file = function(input) {
    const file = input.files[0];
    const btnCheck = document.getElementById('btn_check_file');
    const btnLuu = document.getElementById('btnLuuHocLieu');
    document.getElementById('khu_vuc_bao_loi_file').style.display = 'none';

    const dangChonCach1 = document.querySelector('input[name="radCachNhap"]:checked').value === "1";

    if (file) {
        btnCheck.style.display = 'block';
        if (dangChonCach1) {
            btnLuu.disabled = true;
            btnLuu.style.background = "#ccc";
            btnLuu.style.cursor = "not-allowed";
            btnLuu.innerText = "⚠️ HÃY KIỂM TRA FILE TRƯỚC KHI LƯU";
        }
    } else {
        btnCheck.style.display = 'none';
        if (dangChonCach1) {
            btnLuu.disabled = true;
            btnLuu.style.background = "#ccc";
            btnLuu.innerText = "⚠️ HÃY CHỌN VÀ KIỂM TRA FILE TRƯỚC KHI LƯU";
        }
    }
};
// =====================================================================
// Hàm 6.20: Dọn sạch dấu vết Học Liệu (Tự động phân luồng GitHub / Khối 15)
// =====================================================================
window.ham_6a_20_xoa_sach_github_va_supabase = async function (maHL, btnNode) {
    if (!confirm(`🚀 Thầy chắc chắn muốn XOÁ HOÀN TOÀN học liệu [${maHL}]?\n\nHệ thống sẽ dọn sạch toàn bộ file gốc và dữ liệu liên quan trước khi hủy bản ghi.`)) return;

    if (typeof CFG_HE_THONG === 'undefined') {
        return alert("❌ Lỗi: Không tìm thấy cấu hình CFG_HE_THONG.");
    }

    const GITHUB_TOKEN = CFG_HE_THONG.GITHUB_TOKEN;
    const GITHUB_REPO = CFG_HE_THONG.GITHUB_REPO;
    const baseURL = `https://api.github.com/repos/${GITHUB_REPO}`;
    const headers = {
        "Authorization": `Bearer ${GITHUB_TOKEN}`,
        "Accept": "application/vnd.github.v3+json",
        "Content-Type": "application/json"
    };

    const textGoc = btnNode.innerText;
    btnNode.disabled = true;
    btnNode.style.cursor = "wait";

    try {
        // -----------------------------------------------------------------
        // 1. TRUY VẤN DỮ LIỆU GỐC TỪ SUPABASE
        // -----------------------------------------------------------------
        btnNode.innerText = "⏳ Đang đọc cấu trúc học liệu từ DB...";
        const { data: hocLieu, error: errFetch } = await _supabase
            .from('hoc_lieu_trac_nghiem')
            .select('*')
            .eq('ma_hoc_lieu', maHL)
            .maybeSingle();

        if (errFetch || !hocLieu) throw new Error("Không tìm thấy thông tin học liệu này trong Database.");

        // ĐỊNH TUYẾN LOẠI HỌC LIỆU
        const isTracNghiem = maHL.includes('_TN_') || maHL.includes('_DE_');

        if (isTracNghiem) {
            // =================================================================
            // LUỒNG A: XÓA TRẮC NGHIỆM TRÊN GITHUB (Áp dụng xóa tuần tự chống 409)
            // =================================================================
            let dsCauHoi = hocLieu.danh_sach_cau_hoi || [];
            if (typeof dsCauHoi === 'string') { try { dsCauHoi = JSON.parse(dsCauHoi); } catch (e) { dsCauHoi = []; } }

            btnNode.innerText = "⏳ Đang quét danh sách file đề và ảnh đề...";
            let danhSachFileXoa = [];

            // Quét thư mục Đề thi
            let resFolder = await fetch(`${baseURL}/contents/Kho_De_Thi/${maHL}`, { headers });
            if (resFolder.status === 200) {
                let files = await resFolder.json();
                for (let f of files) {
                    if (f.type === "file") {
                        danhSachFileXoa.push({ path: f.path, sha: f.sha });
                    } else if (f.type === "dir" && f.name === "HinhAnh") {
                        let resImg = await fetch(`${baseURL}/contents/Kho_De_Thi/${maHL}/HinhAnh`, { headers });
                        if (resImg.status === 200) {
                            let imgs = await resImg.json();
                            imgs.forEach(img => { if (img.type === "file") danhSachFileXoa.push({ path: img.path, sha: img.sha }); });
                        }
                    }
                }
            }

            // File giải gộp
            if (hocLieu.url_file_giai) {
                const urlParts = hocLieu.url_file_giai.split('.io/');
                if (urlParts.length > 1) {
                    let pathGiaiGop = urlParts[1].substring(urlParts[1].indexOf('/') + 1);
                    let resShaGop = await fetch(`${baseURL}/contents/${pathGiaiGop}`, { headers });
                    if (resShaGop.status === 200) {
                        let dataGop = await resShaGop.json();
                        danhSachFileXoa.push({ path: pathGiaiGop, sha: dataGop.sha });
                    }
                }
            }

            // Danh sách file giải lẻ
            let danhSachLoiGiaiLe = [];
            if (Array.isArray(dsCauHoi)) {
                dsCauHoi.forEach(item => {
                    let maLoiGiai = item.ma_loi_giai || item.maBaoMat;
                    if (maLoiGiai) danhSachLoiGiaiLe.push(`Ngan_Hang_Loi_Giai/${maLoiGiai.endsWith('.json') ? maLoiGiai : maLoiGiai + '.json'}`);
                });
            }

            if (danhSachLoiGiaiLe.length > 0) {
                btnNode.innerText = `⏳ Đang quét tìm mã bảo mật giải lẻ...`;
                const batchSize = 5; 
                for (let i = 0; i < danhSachLoiGiaiLe.length; i += batchSize) {
                    const batch = danhSachLoiGiaiLe.slice(i, i + batchSize);
                    await Promise.all(batch.map(async (pathFile) => {
                        let resSha = await fetch(`${baseURL}/contents/${pathFile}`, { headers });
                        if (resSha.status === 200) {
                            let dataSha = await resSha.json();
                            danhSachFileXoa.push({ path: pathFile, sha: dataSha.sha });
                        }
                    }));
                }
            }

            // THỰC THI XÓA TUẦN TỰ (CHỐNG LỖI 409 CONFLICT)
            if (danhSachFileXoa.length > 0) {
                for (let i = 0; i < danhSachFileXoa.length; i++) {
                    const fileObj = danhSachFileXoa[i];
                    btnNode.innerText = `🔥 Đang xóa tệp tin trên GitHub (${i + 1}/${danhSachFileXoa.length})...`;
                    
                    try {
                        await fetch(`${baseURL}/contents/${fileObj.path}`, {
                            method: 'DELETE',
                            headers: headers,
                            body: JSON.stringify({
                                message: `Web System: Hủy học liệu ${maHL} - Xóa tệp ${fileObj.path}`,
                                sha: fileObj.sha
                            })
                        });
                        // Nghỉ 300ms để GitHub xử lý cây thư mục nhánh main
                        await new Promise(r => setTimeout(r, 300)); 
                    } catch (e) {
                        console.warn("Bỏ qua lỗi xóa tệp:", fileObj.path);
                    }
                }
            }
        } 

        // -----------------------------------------------------------------
        // 2. TRIỆT TIÊU BẢN GHI TRONG DATABASE SUPABASE (Chốt sổ)
        // -----------------------------------------------------------------
        btnNode.innerText = "⏳ Đang khóa két xóa trên Database...";
        const { error: errDeleteDB } = await _supabase
            .from('hoc_lieu_trac_nghiem')
            .delete()
            .eq('ma_hoc_lieu', maHL);

        if (errDeleteDB) throw errDeleteDB;

        Swal.fire('Thành công', `Đã dọn dẹp sạch sẽ và xóa hoàn toàn học liệu [${maHL}].`, 'success');

        if (typeof ham_6a_1_ve_quan_ly_hoc_lieu_trac_nghiem === 'function') ham_6a_1_ve_quan_ly_hoc_lieu_trac_nghiem();

    } catch (error) {
        console.error("Lỗi khi chạy chu trình xóa:", error);
        Swal.fire('Lỗi hệ thống', 'Quá trình dọn rác thất bại: ' + error.message, 'error');
        btnNode.disabled = false;
        btnNode.style.cursor = "pointer";
        btnNode.innerText = textGoc;
    }
};


// =====================================================================
// BỘ HÀM XỬ LÝ CHỌN CÂU HỎI TỪ GOOGLE DRIVE
// =====================================================================
window.DanhSachCauHoiDrive = []; // Mảng RAM chứa giỏ hàng

window.ham_6a_fetch_cay_thu_muc_drive = async function () {
    const treeDiv = document.getElementById('tree-ngan-hang-drive');
    treeDiv.innerHTML = `<div style="text-align:center; color:#d35400; padding: 20px;">⏳ Đang đồng bộ từ Drive...</div>`;

    try {
        // ⚠️ Dùng chung API của hệ thống (Nhớ đảm bảo API này trả về cây thư mục KHO_CAU_HOI)
        const response = await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP);
        const result = await response.json();

        if (result.status === 'error') throw new Error(result.message);

        // Hàm đệ quy vẽ cây thư mục (CSS mượn từ Khối 3 SGK)
        function veCayCauHoi(node) {
            if (node.type === 'file' && node.name.endsWith('.json')) {
                // Phân tích tên file: [2D1H1-1]_TN_1234-567.json
                let parts = node.name.replace('.json', '').split('_');
                let maID = parts[0] || '';
                let kieu = parts[1] || 'TN';
                let maCau = parts[2] || '';

                let mauKieu = kieu === 'TN' ? '#1a73e8' : (kieu === 'DS' ? '#d35400' : '#28a745');

                return `
                    <div class="tree-file-item" style="display:flex; justify-content:space-between; align-items:center; border-bottom: 1px dashed #eee; padding: 5px 0;">
                        <div style="font-size: 13px; color: #333;">
                            <span style="color:${mauKieu}; font-weight:bold; font-size:11px;">[${kieu}]</span> 
                            ${node.name}
                        </div>
                        <button onclick="ham_6a_chon_cau_drive('${node.id}', '${node.name}', '${kieu}')" 
                                style="padding: 2px 8px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;">
                                ➕ Thêm
                        </button>
                    </div>`;
            }

            if (node.type === 'folder' && node.name !== "PICTURES") {
                let htmlChildren = node.children.map(child => veCayCauHoi(child)).join('');
                if (!htmlChildren.trim()) return ''; // Ẩn thư mục rỗng
                return `
                    <details style="margin-bottom: 5px;">
                        <summary style="font-weight:bold; cursor:pointer; padding:5px; background:#f8f9fa; border:1px solid #eee; border-radius:4px; font-size:14px; list-style:none;">
                            📂 ${node.name}
                        </summary>
                        <div style="padding-left:15px; margin-top:5px; border-left:2px solid #dee2e6;">
                            ${htmlChildren}
                        </div>
                    </details>`;
            }
            return '';
        }

        treeDiv.innerHTML = veCayCauHoi(result.data) || '<p style="color:red;text-align:center;">Kho trống!</p>';

    } catch (error) {
        treeDiv.innerHTML = `<div style="color:red; text-align:center;">❌ Lỗi tải Drive: ${error.message}</div>`;
    }
};

window.ham_6a_chon_cau_drive = function (fileId, fileName, kieuCau) {
    // Kiểm tra trùng
    let tonTai = window.DanhSachCauHoiDrive.find(c => c.fileId === fileId);
    if (tonTai) return alert("⚠️ Câu này đã có trong giỏ hàng rồi!");

    window.DanhSachCauHoiDrive.push({
        fileId: fileId,
        fileName: fileName,
        kieuCau: kieuCau
    });
    ham_6a_cap_nhat_giao_dien_cau_da_chon();
};

window.ham_6a_bo_chon_cau_drive = function (fileId) {
    window.DanhSachCauHoiDrive = window.DanhSachCauHoiDrive.filter(c => c.fileId !== fileId);
    ham_6a_cap_nhat_giao_dien_cau_da_chon();
};

window.ham_6a_cap_nhat_giao_dien_cau_da_chon = function () {
    const listDiv = document.getElementById('list-cau-da-chon');
    const lblTong = document.getElementById('lblTongCauChonDrive');
    const txtCauTruc = document.getElementById('txtCauTruc');

    if (!listDiv) return;

    if (window.DanhSachCauHoiDrive.length === 0) {
        listDiv.innerHTML = '<div style="text-align:center; color:#999; margin-top:20px;">Chưa chọn câu nào.</div>';
        lblTong.innerText = "0 câu";
        txtCauTruc.value = "";
        return;
    }

    let html = '';
    let demTN = 0, demDS = 0, demTLN = 0;

    window.DanhSachCauHoiDrive.forEach((cau, index) => {
        if (cau.kieuCau === 'TN') demTN++;
        else if (cau.kieuCau === 'DS') demDS++;
        else demTLN++;

        html += `
            <div style="display:flex; justify-content:space-between; align-items:center; background:#f8f9fa; border:1px solid #ddd; padding:8px; border-radius:4px; margin-bottom:6px;">
                <div style="font-size:12px; color:#333; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:85%;">
                    <b>${index + 1}.</b> [${cau.kieuCau}] ${cau.fileName}
                </div>
                <button onclick="ham_6a_bo_chon_cau_drive('${cau.fileId}')" style="background:#dc3545; color:white; border:none; border-radius:50%; width:20px; height:20px; cursor:pointer; font-weight:bold; line-height:10px;">×</button>
            </div>
        `;
    });

    listDiv.innerHTML = html;
    lblTong.innerText = `${window.DanhSachCauHoiDrive.length} câu`;

    // Cập nhật cấu trúc (Ví dụ: 5TN | 2DS | 1TLN)
    let cauTrucArr = [];
    if (demTN > 0) cauTrucArr.push(`${demTN}TN`);
    if (demDS > 0) cauTrucArr.push(`${demDS}DS`);
    if (demTLN > 0) cauTrucArr.push(`${demTLN}TLN`);
    txtCauTruc.value = cauTrucArr.join(' - ');
};



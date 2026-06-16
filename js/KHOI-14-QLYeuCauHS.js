// KHOI-14-QuanLyYeuCau.js

// 1. Khởi tạo trạng thái sort cho hòm thư yêu cầu
if (!window.DuyetDonSortState) {
    window.DuyetDonSortState = { key: 'trang_thai', asc: true };
}


// =====================================================================
// Hàm 14.1: Tab HÒM THƯ DUYỆT ĐƠN (ĐÃ HIỆN CẢ MÃ LỚP VÀ TÊN LỚP XIN VÀO)
// =====================================================================
window.ham_14_1_ve_tab_duyet_don = async function () {
    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
    vungLamViec.innerHTML = `<div style="text-align: center; padding: 40px;"><h3 style="color:#ffc107;">⏳ Đang mở hòm thư và trích xuất cấu trúc nhiệm vụ...</h3></div>`;

    try {
        // 1. Tải toàn bộ đơn yêu cầu từ Database
        const { data: dsDon, error } = await _supabase
            .from('yeu_cau_hoc_sinh')
            .select('*');

        if (error) throw error;

        if (!dsDon || dsDon.length === 0) {
            vungLamViec.innerHTML = `
                <div style="text-align: center; padding: 50px; background: #fff; border-radius: 10px; border: 1px dashed #ccc;">
                    <p style="font-size: 60px; margin:0;">📭</p>
                    <h3 style="color: #6c757d;">Hòm thư trống</h3>
                    <p style="color: #888;">Hiện tại chưa có học sinh nào gửi yêu cầu xin mở khóa bài tập.</p>
                </div>
            `;
            return;
        }

        // ĐẾM SỐ ĐƠN ĐANG CHỜ DUYỆT (Trạng thái = 0)
        const soDonChuaDuyet = dsDon.filter(d => d.trang_thai === 0).length;

        // Thay đoạn cũ bằng đoạn này (đã sửa dấu ngoặc và dấu chấm phẩy):
        const cssBadge = soDonChuaDuyet > 0
            ? "background: #dc3545; color: white; box-shadow: 0 2px 6px rgba(220,53,69,0.4);"
            : "background: rgba(0,0,0,0.1); color: #333;";



        // =====================================================================
        // 2. TRUY VẤN SONG SONG BỐC TÊN NHIỆM VỤ VÀ TÊN LỚP (TỐI ƯU 1 REQUEST BULK)
        // =====================================================================
        // Hướng A: Bốc dữ liệu bài tập
        const mangMaNV = [...new Set(dsDon.map(d => d.ma_nhiem_vu).filter(Boolean))];
        let tuDienNhiemVuGoc = {};

        if (mangMaNV.length > 0) {
            const { data: dsNVGoc } = await _supabase
                .from('nhiem_vu')
                .select('ma_nhiem_vu, thoi_gian_lam_bai, thoi_gian_mo, thoi_gian_dong, so_luot_lam_bai, cau_truc_de')
                .in('ma_nhiem_vu', mangMaNV);

            if (dsNVGoc) {
                dsNVGoc.forEach(nv => {
                    tuDienNhiemVuGoc[nv.ma_nhiem_vu] = nv;
                });
            }
        }

        // 🌟 Hướng B (MỚI): Gom tất cả mã lớp có trong đơn để bốc Tên lớp thực tế từ Database
        const mangMaLopYeuCau = [...new Set(dsDon.map(d => d.ma_lop).filter(Boolean))];
        let tuDienLopHoc = {};

        if (mangMaLopYeuCau.length > 0) {
            const { data: dsLopGoc } = await _supabase
                .from('lop_hoc')
                .select('ma_lop, ten_lop')
                .in('ma_lop', mangMaLopYeuCau);

            if (dsLopGoc) {
                dsLopGoc.forEach(l => {
                    tuDienLopHoc[l.ma_lop] = l.ten_lop; // Lưu vào RAM: tuDienLopHoc['MAT12'] = 'Toán nâng cao 12A1'
                });
            }
        }

        // =====================================================================
        // 3. LOGIC SẮP XẾP ĐA TẦNG (CẢI TIẾN: ƯU TIÊN CHỜ DUYỆT LÊN ĐẦU)
        // =====================================================================
        dsDon.sort((a, b) => {
            const sortKey = window.DuyetDonSortState.key;
            const isAsc = window.DuyetDonSortState.asc;

            // 🌟 LOGIC ĐẶC BIỆT CHO CỘT TRẠNG THÁI
            if (sortKey === 'trang_thai') {
                const ttA = Number(a.trang_thai);
                const ttB = Number(b.trang_thai);

                // Luôn ưu tiên 0 lên đầu
                if (ttA === 0 && ttB !== 0) return -1;
                if (ttA !== 0 && ttB === 0) return 1;

                // Nếu cùng trạng thái, ưu tiên thời gian mới nhất lên đầu
                if (ttA === ttB) {
                    return new Date(b.ngay_tao || 0) - new Date(a.ngay_tao || 0);
                }

                // Nếu khác trạng thái (và không có cái nào là 0), sort bình thường theo asc/desc
                return isAsc ? (ttA - ttB) : (ttB - ttA);
            }

            // 🌟 LOGIC CHO CÁC CỘT THÔNG TIN KHÁC
            let valA, valB;
            if (sortKey === 'hoc_sinh') {
                valA = (a.ten_hoc_sinh || '').toLowerCase();
                valB = (b.ten_hoc_sinh || '').toLowerCase();
            } else if (sortKey === 'nhiem_vu') {
                valA = (a.ten_nhiem_vu || '').toLowerCase();
                valB = (b.ten_nhiem_vu || '').toLowerCase();
            } else if (sortKey === 'ly_do') {
                valA = (a.ly_do || '').toLowerCase();
                valB = (b.ly_do || '').toLowerCase();
            } else if (sortKey === 'ngay_tao') {
                valA = new Date(a.ngay_tao || 0).getTime();
                valB = new Date(b.ngay_tao || 0).getTime();
            } else {
                valA = a[sortKey] || '';
                valB = b[sortKey] || '';
            }

            if (valA < valB) return isAsc ? -1 : 1;
            if (valA > valB) return isAsc ? 1 : -1;
            return 0;
        });

        const veMuiTenSort = (colKey) => {
            if (window.DuyetDonSortState.key !== colKey) return ' <span style="color:#ccc; font-size:10px;">⇅</span>';
            return window.DuyetDonSortState.asc ? ' <span style="color:#28a745;">🔼</span>' : ' <span style="color:#dc3545;">🔽</span>';
        };

        // 4. DUYỆT MẢNG VẼ HÀNG DỮ LIỆU HTML
        let htmlRows = '';
        const opts = { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' };

        dsDon.forEach((don, index) => {
            const ngayGui = don.ngay_tao ? new Date(don.ngay_tao).toLocaleString('vi-VN', opts) : '';

            let loaiBadge = '';
            if (don.loai_yeu_cau === 'QUA_HAN') {
                loaiBadge = `<span style="background: #fff3cd; color: #856404; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; border: 1px solid #ffeeba;">⏰ XIN NỘP MUỘN</span>`;
            } else if (don.loai_yeu_cau === 'XIN_VAO_LOP') {
                loaiBadge = `<span style="background: #e8f5e9; color: #2e7d32; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; border: 1px solid #c8e6c9;">🏫 XIN NHẬP HỌC</span>`;
            } else {
                loaiBadge = `<span style="background: #cce5ff; color: #004085; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; border: 1px solid #b8daff;">🔄 XIN THÊM LƯỢT</span>`;
            }

            const thamSoDinhDanh = don.loai_yeu_cau === 'XIN_VAO_LOP' ? don.ma_lop : don.ma_nhiem_vu;

            let hanhDongHtml = '';
            let trangThaiBadge = '';

            if (don.trang_thai === 0) {
                trangThaiBadge = `<span style="color: #fd7e14; font-weight: bold; font-size: 13px;">⏳ Chờ duyệt</span>`;
                hanhDongHtml = `
                <div style="display: flex; gap: 5px; justify-content: center; flex-wrap: wrap;">
                    <button onclick="ham_14_2_xu_ly_duyet_don('${don.id}', '${don.uid_hoc_sinh}', '${thamSoDinhDanh}', '${don.loai_yeu_cau}', 'DUYET')" style="padding: 6px 8px; background: #28a745; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; font-size: 11px;">✅ DUYỆT</button>
                    <button onclick="ham_14_2_xu_ly_duyet_don('${don.id}', '${don.uid_hoc_sinh}', '${thamSoDinhDanh}', '${don.loai_yeu_cau}', 'TU_CHOI')" style="padding: 6px 8px; background: #dc3545; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; font-size: 11px;">❌ TỪ CHỐI</button>
                    <button onclick="ham_14_4_xoa_yeu_cau('${don.id}')" style="padding: 6px 8px; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;" title="Xóa yêu cầu">🗑️</button>
                </div>
            `;
            } else {
                trangThaiBadge = (don.trang_thai === 1)
                    ? `<span style="color: #28a745; font-weight: bold; font-size: 13px;">✅ Đã duyệt</span>`
                    : `<span style="color: #dc3545; font-weight: bold; font-size: 13px;">❌ Từ chối</span>`;

                hanhDongHtml = `
                <div style="display: flex; gap: 5px; justify-content: center; align-items: center;">
                    <span style="color: #ccc; font-size: 11px; font-weight: bold;">Đã xử lý</span>
                    <button onclick="ham_14_4_xoa_yeu_cau('${don.id}')" style="padding: 6px 8px; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;" title="Xóa yêu cầu">🗑️</button>
                </div>
            `;
            }

            // =====================================================================
            // 🌟 ĐIỂM SỬA CHÍNH: HIỂN THỊ CẢ MÃ LỚP VÀ TÊN LỚP ĐƯỢC MAP TỪ DATABASE
            // =====================================================================
            let khungThongTinPhu = '';
            if (don.loai_yeu_cau === 'XIN_VAO_LOP') {
                // Dò tìm tên lớp thực tế từ cuốn từ điển vừa quét
                const tenLopThucTe = tuDienLopHoc[don.ma_lop] || 'Lớp học không xác định hoặc đã bị xóa';

                khungThongTinPhu = `
                    <div style="font-size: 12px; background: #f4fbf7; border: 1px solid #c8e6c9; border-radius: 6px; padding: 10px; color: #2e7d32; line-height: 1.6; max-width: 320px; box-shadow: inset 0 1px 2px rgba(0,0,0,0.02);">
                        <div style="margin-bottom: 4px;">🔑 <b>Mã lớp xin vào:</b> <span style="font-family: monospace; font-size: 13px; background: white; padding: 2px 6px; border:1px solid #a3cfbb; border-radius:3px; color:#c0392b; font-weight: bold;">${don.ma_lop || 'N/A'}</span></div>
                        <div>🏫 <b>Tên lớp học:</b> <span style="color: #1b5e20; font-weight: bold;">${tenLopThucTe}</span></div>
                    </div>
                `;
            } else {
                const nvGoc = tuDienNhiemVuGoc[don.ma_nhiem_vu] || {};
                const thoiGianLamTxt = nvGoc.thoi_gian_lam_bai > 0 ? `${nvGoc.thoi_gian_lam_bai} minutes` : 'Tự do';
                const gioHanLuotTxt = nvGoc.so_luot_lam_bai > 0 ? `${nvGoc.so_luot_lam_bai} lượt` : 'Vô hạn';
                const cauTrucTxt = nvGoc.cau_truc_de || 'Chưa cấu hình';

                const renderTimeFormat = (dStr) => dStr ? new Date(dStr).toLocaleString('vi-VN', opts) : "Không giới hạn";
                const hanMoTxt = renderTimeFormat(nvGoc.thoi_gian_mo);
                const hanDongTxt = renderTimeFormat(nvGoc.thoi_gian_dong);

                khungThongTinPhu = `
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 5px; font-size: 11px; background: #fdfefe; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px; color: #4a5568; line-height: 1.4; max-width: 320px; box-shadow: inset 0 1px 3px rgba(0,0,0,0.02);">
                        <div>⏱️ Thời gian: <b style="color:#2b6cb0;">${thoiGianLamTxt}</b></div>
                        <div>🔄 Giới hạn: <b style="color:#2b6cb0;">${gioHanLuotTxt}</b></div>
                        <div style="grid-column: span 2; border-bottom: 1px dashed #e2e8f0; padding-bottom: 3px; margin-bottom: 2px;">
                            📦 Cấu trúc: <span style="color:#2e7d32; font-weight:bold;">${cauTrucTxt}</span>
                        </div>
                        <div style="grid-column: span 2; font-size: 10px; color: #718096;">
                            <div style="display:flex; justify-content:space-between;"><span>🟢 Ngày mở:</span> <b>${hanMoTxt}</b></div>
                            <div style="display:flex; justify-content:space-between; margin-top:1px;"><span>🔴 Ngày đóng:</span> <b style="color:#c62828;">${hanDongTxt}</b></div>
                        </div>
                    </div>
                `;
            }

            htmlRows += `
                <tr style="border-bottom: 1px solid #eee; background: ${don.trang_thai === 0 ? '#fff' : '#f8f9fa'};">
                    <td style="padding: 15px 10px; text-align: center; color: #666; font-weight: bold;">${index + 1}</td>
                    <td style="padding: 15px 10px;">
                        <div style="font-weight: bold; color: #1a73e8; font-size: 15px;">${don.ten_hoc_sinh || 'Học sinh'}</div>
                        <div style="font-size: 11px; color: #666; margin-top: 3px;">Lớp: <b>${don.ma_lop || 'N/A'}</b></div>
                        <div style="font-size: 10px; color: #999; margin-top: 2px; font-family: monospace;">UID: ${don.uid_hoc_sinh}</div>
                    </td>
                    <td style="padding: 15px 10px;">
                        <div style="font-weight: bold; color: #2c3e50; font-size: 14px; margin-bottom: 6px;">${don.ten_nhiem_vu || 'Nhiệm vụ'}</div>
                        
                        ${khungThongTinPhu}

                        <div style="margin-top: 8px; display: flex; align-items: center; gap: 6px;">
                            ${loaiBadge} 
                            <span style="font-size: 11px; color: #7f8c8d; font-style: italic;">Gửi lúc: ${ngayGui}</span>
                        </div>
                    </td>
                    
                    <td style="padding: 15px 10px;">
                        <div style="background: #f1f3f4; padding: 10px 12px; border-radius: 6px; font-size: 13px; color: #2c3e50; font-style: italic; border-left: 4px solid #ff9800; line-height: 1.5; min-width: 180px;">
                            "${don.ly_do || 'Không có lý do giải trình.'}"
                        </div>
                    </td>
                    <td style="padding: 15px 10px; text-align: center;">${trangThaiBadge}</td>
                    <td style="padding: 15px 10px; text-align: center;">${hanhDongHtml}</td>
                </tr>
            `;
        });

        // 5. RENDER MAIN GIAO DIỆN
        vungLamViec.innerHTML = `
            <div style="background: white; border: 1px solid #e0e0e0; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); overflow: hidden;">
                <div style="background: linear-gradient(135deg, #ffc107, #ff9800); padding: 20px; color: #000; display: flex; justify-content: space-between; align-items: center;">
                    <h3 style="margin: 0; font-size: 18px; font-weight: 900; display:flex; align-items:center; gap:8px;">📭 HÒM THƯ XÉT DUYỆT YÊU CẦU CỦA HỌC SINH</h3>
                    
                    <span style="${cssBadge} padding: 6px 14px; border-radius: 20px; font-size: 14px; font-weight: bold; transition: 0.3s;">
                        🔔 Cần duyệt: ${soDonChuaDuyet} đơn
                    </span>
                </div>
                
                <div style="background: #fff9e6; padding: 10px 15px; font-size: 12px; color: #b7791f; border-bottom: 1px solid #fbd38d; font-weight: bold;">
                    💡 Mẹo quản lý: Thầy có thể click chuột trực tiếp vào tiêu đề các cột <span style="background:white; padding:2px 4px; border-radius:3px;">Học Sinh</span>, <span style="background:white; padding:2px 4px; border-radius:3px;">Nhiệm Vụ</span>, <span style="background:white; padding:2px 4px; border-radius:3px;">Lý Do</span>, <span style="background:white; padding:2px 4px; border-radius:3px;">Trạng Thái</span> để đảo chiều sắp xếp danh sách tăng/giảm.
                </div>

                <div style="overflow-x: auto; padding: 10px;">
                    <table style="width: 100%; border-collapse: collapse; min-width: 950px; text-align: left;">
                        <thead style="background: #f7fafc; border-bottom: 2px solid #e2e8f0; user-select: none;">
                            <tr>
                                <th style="padding: 12px 10px; text-align: center; color: #4a5568; width: 40px; font-weight: bold;">STT</th>
                                <th onclick="ham_14_3_thay_doi_sap_xep('hoc_sinh')" style="padding: 12px 10px; color: #4a5568; width: 190px; cursor: pointer; font-weight: bold;" onmouseover="this.style.background='#edf2f7'" onmouseout="this.style.background='transparent'">
                                    Học Sinh ${veMuiTenSort('hoc_sinh')}
                                </th>
                                <th onclick="ham_14_3_thay_doi_sap_xep('nhiem_vu')" style="padding: 12px 10px; color: #4a5568; width: 340px; cursor: pointer; font-weight: bold;" onmouseover="this.style.background='#edf2f7'" onmouseout="this.style.background='transparent'">
                                    Nhiệm Vụ Yêu Cầu ${veMuiTenSort('nhiem_vu')}
                                </th>
                                <th onclick="ham_14_3_thay_doi_sap_xep('ly_do')" style="padding: 12px 10px; color: #4a5568; cursor: pointer; font-weight: bold;" onmouseover="this.style.background='#edf2f7'" onmouseout="this.style.background='transparent'">
                                    Lý Do Gửi Thầy ${veMuiTenSort('ly_do')}
                                </th>
                                <th onclick="ham_14_3_thay_doi_sap_xep('trang_thai')" style="padding: 12px 10px; text-align: center; color: #4a5568; width: 110px; cursor: pointer; font-weight: bold;" onmouseover="this.style.background='#edf2f7'" onmouseout="this.style.background='transparent'">
                                    Trạng Thái ${veMuiTenSort('trang_thai')}
                                </th>
                                <th style="padding: 12px 10px; text-align: center; color: #4a5568; width: 150px; font-weight: bold;">Thao Tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${htmlRows}
                        </tbody>
                    </table>
                </div>
            </div>
        `;

    } catch (error) {
        vungLamViec.innerHTML = `<div style="color: #dc3545; text-align: center; padding: 20px; font-weight:bold;">❌ Lỗi truy xuất hòm thư: ${error.message}</div>`;
    }

}






// =====================================================================
// HÀM 14.2: XỬ LÝ LỆNH DUYỆT HOẶC TỪ CHỐI ĐƠN TỪ HỌC SINH 
// (BẢN FULL: ĐÃ LIÊN THÔNG DUYỆT XIN VÀO LỚP MỚI)
// =====================================================================
window.ham_14_2_xu_ly_duyet_don = async function (idDon, uidHocSinh, maNhiemVu, loaiYeuCau, hanhDong) {

    // 1. TRƯỜNG HỢP TỪ CHỐI ĐƠN (Chung cho tất cả các loại đơn)
    if (hanhDong === 'TU_CHOI') {
        Swal.fire({
            title: 'Từ chối đơn yêu cầu?',
            text: "Học sinh sẽ không được chấp thuận nguyện vọng này.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '❌ Xác nhận Từ Chối',
            cancelButtonText: 'Hủy',
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#6c757d',
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                try {
                    const { error } = await _supabase.from('yeu_cau_hoc_sinh')
                        .update({ trang_thai: -1, uid_gv_duyet: window.GocGiaoVienState?.uid || null })
                        .eq('id', idDon);
                    if (error) throw error;
                    return true;
                } catch (e) {
                    Swal.showValidationMessage(`Lỗi hệ thống: ${e.message}`);
                    return false;
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({ icon: 'success', title: 'Đã từ chối đơn!', timer: 1200, showConfirmButton: false });
                if (typeof ham_14_1_ve_tab_duyet_don === 'function') ham_14_1_ve_tab_duyet_don();
            }
        });
        return;
    }

    // 2. TRƯỜNG HỢP DUYỆT ĐƠN HẾT LƯỢT
    if (loaiYeuCau === 'HET_LUOT') {
        Swal.fire({
            title: 'Duyệt cấp thêm lượt?',
            text: "Hệ thống sẽ trừ đi 1 lượt đã làm trong hồ sơ của học sinh này (điểm và lịch sử cũ vẫn được giữ nguyên). Xác nhận cấp lượt?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: '✅ Duyệt & Cấp lượt',
            cancelButtonText: 'Hủy',
            confirmButtonColor: '#28a745',
            cancelButtonColor: '#6c757d',
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                try {
                    const tenCotLuotLam = 'tien_do_lam_bai';
                    const { data: hsInfo, error: errHS } = await _supabase.from('hoc_sinh').select(tenCotLuotLam).eq('uid', uidHocSinh).single();
                    if (errHS) throw errHS;

                    let jsonLuotLam = {};
                    try { jsonLuotLam = typeof hsInfo[tenCotLuotLam] === 'string' ? JSON.parse(hsInfo[tenCotLuotLam]) : (hsInfo[tenCotLuotLam] || {}); } catch (e) { }

                    if (jsonLuotLam[maNhiemVu] && jsonLuotLam[maNhiemVu] > 0) {
                        jsonLuotLam[maNhiemVu] = jsonLuotLam[maNhiemVu] - 1;
                    }

                    const { error: errUpdateHS } = await _supabase.from('hoc_sinh').update({ [tenCotLuotLam]: jsonLuotLam }).eq('uid', uidHocSinh);
                    if (errUpdateHS) throw errUpdateHS;

                    const { error: errUpdateDon } = await _supabase.from('yeu_cau_hoc_sinh').update({ trang_thai: 1, uid_gv_duyet: window.GocGiaoVienState?.uid || null }).eq('id', idDon);
                    if (errUpdateDon) throw errUpdateDon;
                    return true;
                } catch (e) {
                    Swal.showValidationMessage(`Lỗi xử lý cấp lượt: ${e.message}`);
                    return false;
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({ icon: 'success', title: 'Đã cấp thêm 1 lượt!', timer: 1200, showConfirmButton: false });
                if (typeof ham_14_1_ve_tab_duyet_don === 'function') ham_14_1_ve_tab_duyet_don();
            }
        });
    }

    // 3. TRƯỜNG HỢP DUYỆT ĐƠN QUÁ HẠN
    else if (loaiYeuCau === 'QUA_HAN') {
        Swal.fire({
            title: 'Duyệt dời hạn chót?',
            html: "Hệ thống sẽ dời thời gian đóng đề sang <b>23:59 ngày mai</b>. Xác nhận gia hạn?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: '✅ Duyệt & Gia hạn',
            cancelButtonText: 'Hủy',
            confirmButtonColor: '#28a745',
            cancelButtonColor: '#6c757d',
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                try {
                    let ngayMai = new Date(); ngayMai.setDate(ngayMai.getDate() + 1); ngayMai.setHours(23, 59, 59, 999);
                    let offset = ngayMai.getTimezoneOffset() * 60000;
                    let thoiGianMoiISO = (new Date(ngayMai - offset)).toISOString().slice(0, 19);

                    const { error: errNhiemVu } = await _supabase.from('nhiem_vu').update({ thoi_gian_dong: thoiGianMoiISO }).eq('ma_nhiem_vu', maNhiemVu);
                    if (errNhiemVu) throw errNhiemVu;

                    const { error: errUpdate } = await _supabase.from('yeu_cau_hoc_sinh').update({ trang_thai: 1, uid_gv_duyet: window.GocGiaoVienState?.uid || null }).eq('id', idDon);
                    if (errUpdate) throw errUpdate;
                    return true;
                } catch (e) {
                    Swal.showValidationMessage(`Lỗi gia hạn đề: ${e.message}`);
                    return false;
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({ icon: 'success', title: 'Đã gia hạn thành công!', timer: 1500, showConfirmButton: false });
                if (typeof ham_14_1_ve_tab_duyet_don === 'function') ham_14_1_ve_tab_duyet_don();
            }
        });
    }

    // =====================================================================
    // 🌟 4. TRƯỜNG HỢP DUYỆT ĐƠN XIN VÀO LỚP MỚI (ĐỒNG BỘ 2 CHIỀU LIÊN THÔNG)
    // =====================================================================
    else if (loaiYeuCau === 'XIN_VAO_LOP') {
        // Tận dụng mẹo: Bốc ma_lop thông qua tham số maNhiemVu được truyền từ HTML kích hoạt
        const maLopCanDuyet = maNhiemVu;

        Swal.fire({
            title: 'Phê duyệt nhập học?',
            html: `Xác nhận cho học sinh này tham gia vào mã lớp <b>${maLopCanDuyet}</b>? Hệ thống sẽ tự động cập nhật hồ sơ liên thông.`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: '✅ Duyệt Nhập Học',
            cancelButtonText: 'Hủy',
            confirmButtonColor: '#28a745',
            cancelButtonColor: '#6c757d',
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                try {
                    // Bước A: Cập nhật bảng hoc_sinh (Thêm mã lớp vào mảng danh_sach_ma_lop)
                    const { data: hsData, error: errFetchHS } = await _supabase
                        .from('hoc_sinh')
                        .select('danh_sach_ma_lop')
                        .eq('uid', uidHocSinh)
                        .single();

                    if (errFetchHS) throw errFetchHS;

                    let dsLopCuaEm = Array.isArray(hsData.danh_sach_ma_lop) ? hsData.danh_sach_ma_lop : [];
                    if (!dsLopCuaEm.includes(maLopCanDuyet)) {
                        dsLopCuaEm.push(maLopCanDuyet);
                        const { error: errUpHS } = await _supabase
                            .from('hoc_sinh')
                            .update({ danh_sach_ma_lop: dsLopCuaEm })
                            .eq('uid', uidHocSinh);
                        if (errUpHS) throw errUpHS;
                    }

                    // Bước B: Cập nhật bảng lop_hoc (Thêm UID học sinh vào mảng hoc_sing_ids)
                    const { data: lopData, error: errFetchLop } = await _supabase
                        .from('lop_hoc')
                        .select('hoc_sinh_ids')
                        .eq('ma_lop', maLopCanDuyet)
                        .single();

                    if (errFetchLop) throw errFetchLop;

                    let dsUidLopHoc = Array.isArray(lopData.hoc_sinh_ids) ? lopData.hoc_sinh_ids : [];
                    if (!dsUidLopHoc.includes(uidHocSinh)) {
                        dsUidLopHoc.push(uidHocSinh);
                        const { error: errUpLop } = await _supabase
                            .from('lop_hoc')
                            .update({ hoc_sinh_ids: dsUidLopHoc })
                            .eq('ma_lop', maLopCanDuyet);
                        if (errUpLop) throw errUpLop;
                    }

                    // Bước C: Chốt đơn hàng yêu cầu thành Đã duyệt (trang_thai = 1)
                    const { error: errUpDon } = await _supabase
                        .from('yeu_cau_hoc_sinh')
                        .update({
                            trang_thai: 1,
                            uid_gv_duyet: window.GocGiaoVienState?.uid || null
                        })
                        .eq('id', idDon);

                    if (errUpDon) throw errUpDon;
                    return true;

                } catch (e) {
                    Swal.showValidationMessage(`Lỗi liên thông lớp: ${e.message}`);
                    return false;
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({ icon: 'success', title: 'Đã phê duyệt nhập học thành công!', timer: 1500, showConfirmButton: false });
                if (typeof ham_14_1_ve_tab_duyet_don === 'function') ham_14_1_ve_tab_duyet_don();
            }
        });
    }
};



// =====================================================================
// HÀM BỔ TRỢ: ĐẢO CHIỀU HOẶC THAY ĐỔI CỘT SẮP XẾP KHI GIÁO VIÊN CLICK HEADER
// =====================================================================
window.ham_14_3_thay_doi_sap_xep = function (colKey) {
    if (window.DuyetDonSortState.key === colKey) {
        window.DuyetDonSortState.asc = !window.DuyetDonSortState.asc;
    } else {
        window.DuyetDonSortState.key = colKey;
        window.DuyetDonSortState.asc = true;
    }
    ham_14_1_ve_tab_duyet_don();
}

window.ham_14_4_xoa_yeu_cau = async function (idDon) {
    const result = await Swal.fire({
        title: 'Xóa yêu cầu?',
        text: "Bạn có chắc chắn muốn xóa vĩnh viễn yêu cầu này khỏi hòm thư không?",
        icon: 'error',
        showCancelButton: true,
        confirmButtonText: '🗑️ Xóa luôn',
        cancelButtonText: 'Hủy',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#6c757d'
    });

    if (result.isConfirmed) {
        try {
            const { error } = await _supabase.from('yeu_cau_hoc_sinh').delete().eq('id', idDon);
            if (error) throw error;

            Swal.fire({ icon: 'success', title: 'Đã xóa đơn!', timer: 1000, showConfirmButton: false });
            if (typeof ham_14_1_ve_tab_duyet_don === 'function') ham_14_1_ve_tab_duyet_don();
        } catch (e) {
            Swal.fire('Lỗi!', e.message, 'error');
        }
    }
};

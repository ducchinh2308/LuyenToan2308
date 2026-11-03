// ==============================================================================
// KHỐI 23: XUẤT ĐIỂM TỔNG HỢP TẤT CẢ HỌC SINH CỦA 1 LỚP RA EXCEL
// ==============================================================================

// =====================================================================
// HÀM 23.1: GIAO DIỆN TÙY CHỌN XUẤT ĐIỂM
// =====================================================================
window.ham_23_1_mo_giao_dien_xuat_diem_tong_hop = async function () {
    Swal.fire({ title: 'Đang tải danh sách lớp...', didOpen: () => Swal.showLoading() });

    try {
        const { data: dsLop, error } = await _supabase.from('lop_hoc').select('*');
        if (error) throw error;

        let htmlLop = '<option value="">-- Vui lòng chọn lớp --</option>';
        if (dsLop) {
            dsLop.forEach(l => {
                htmlLop += `<option value="${l.ma_lop || l.id}">${l.ten_lop || l.ten}</option>`;
            });
        }

        let dateObj = new Date();
        let firstDay = new Date(dateObj.getFullYear(), dateObj.getMonth(), 1).toISOString().split('T')[0];
        let today = dateObj.toISOString().split('T')[0];

        Swal.fire({
            title: '📥 XUẤT ĐIỂM TỔNG HỢP',
            html: `
                <div style="text-align: left; font-size: 14px;">
                    <div style="margin-bottom: 15px; background: #e8f4f8; padding: 10px; border-radius: 6px; border: 1px solid #b8daff;">
                        <label style="font-weight: bold; color: #0056b3;">🏫 1. Chọn Lớp cần xuất:</label>
                        <select id="xuat_diem_ma_lop" style="width: 100%; padding: 8px; border-radius: 4px; border: 1px solid #0056b3; margin-top: 5px; font-weight:bold;">
                            ${htmlLop}
                        </select>
                    </div>
                    
                    <div style="background: #fff8e1; padding: 10px; border-radius: 6px; border: 1px solid #ffeeba; margin-bottom: 15px;">
                        <label style="font-weight: bold; color: #d35400;">📅 2. Chọn khoảng thời gian tạo nhiệm vụ:</label>
                        <div style="display: flex; gap: 10px; margin-top: 8px;">
                            <div style="flex: 1;">
                                <div style="font-size:12px; font-weight:bold; color:#666;">Từ ngày:</div>
                                <input type="date" id="xuat_diem_tu_ngay" value="${firstDay}" style="width: 100%; padding: 6px; border-radius: 4px; border: 1px solid #ccc; box-sizing:border-box;">
                            </div>
                            <div style="flex: 1;">
                                <div style="font-size:12px; font-weight:bold; color:#666;">Đến ngày:</div>
                                <input type="date" id="xuat_diem_den_ngay" value="${today}" style="width: 100%; padding: 6px; border-radius: 4px; border: 1px solid #ccc; box-sizing:border-box;">
                            </div>
                        </div>
                    </div>

                    <button onclick="ham_23_2_quet_nhiem_vu_de_xuat_excel()" style="width: 100%; padding: 12px; background: #17a2b8; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.2); transition:0.2s;" onmouseover="this.style.background='#138496'" onmouseout="this.style.background='#17a2b8'">
                        🔍 3. TÌM QUÉT NHIỆM VỤ CỦA LỚP
                    </button>
                    
                    <div id="xuat_diem_khu_vuc_nhiem_vu" style="margin-top: 15px; max-height: 250px; overflow-y: auto; border: 1px solid #ced4da; padding: 12px; border-radius: 6px; display: none; background: #f8f9fa;">
                    </div>
                </div>
            `,
            showConfirmButton: true,
            confirmButtonText: '📥 XUẤT RA EXCEL',
            confirmButtonColor: '#28a745',
            showCancelButton: true,
            cancelButtonText: 'Đóng',
            width: '550px',
            preConfirm: () => {
                return ham_23_3_thuc_thi_xuat_excel();
            }
        });
    } catch (err) {
        Swal.fire('Lỗi', 'Không tải được danh sách lớp: ' + err.message, 'error');
    }
};

// =====================================================================
// HÀM 23.2: QUÉT DANH SÁCH NHIỆM VỤ (TN + TL) THEO NGÀY VÀ LỚP
// =====================================================================
window.ham_23_2_quet_nhiem_vu_de_xuat_excel = async function () {
    const maLop = document.getElementById('xuat_diem_ma_lop').value;
    const tuNgayRaw = document.getElementById('xuat_diem_tu_ngay').value;
    const denNgayRaw = document.getElementById('xuat_diem_den_ngay').value;
    const khuVuc = document.getElementById('xuat_diem_khu_vuc_nhiem_vu');

    if (!maLop) return alert('⚠️ Thầy/Cô vui lòng chọn một lớp học ở Bước 1!');
    if (!tuNgayRaw || !denNgayRaw) return alert('⚠️ Vui lòng nhập đầy đủ ngày tháng!');

    const tuNgay = tuNgayRaw + 'T00:00:00.000Z';
    const denNgay = denNgayRaw + 'T23:59:59.999Z';

    khuVuc.style.display = 'block';
    khuVuc.innerHTML = '<div style="text-align:center; color:#17a2b8; font-weight:bold; padding:20px;">⏳ Đang quét dữ liệu Trắc nghiệm & Tự luận...</div>';

    try {
        const { data: dsTN } = await _supabase.from('nhiem_vu_trac_nghiem')
            .select('ma_nhiem_vu, ten_nhiem_vu, danh_sach_lop')
            .gte('ngay_tao', tuNgay).lte('ngay_tao', denNgay);

        const { data: dsTL } = await _supabase.from('nhiem_vu_tu_luan')
            .select('ma_nhiem_vu, ten_nhiem_vu, danh_sach_lop')
            .gte('ngay_tao', tuNgay).lte('ngay_tao', denNgay);

        let dsHienThi = [];

        const locBaiTheoLop = (danhSachBanDau, loaiBai) => {
            (danhSachBanDau || []).forEach(nv => {
                let arrLop = [];
                try {
                    arrLop = typeof nv.danh_sach_lop === 'string' ? JSON.parse(nv.danh_sach_lop) : (nv.danh_sach_lop || []);
                } catch (e) { }

                if (arrLop.includes(maLop)) {
                    dsHienThi.push({ ...nv, loai: loaiBai });
                }
            });
        };

        locBaiTheoLop(dsTN, 'TN');
        locBaiTheoLop(dsTL, 'TL');

        if (dsHienThi.length === 0) {
            khuVuc.innerHTML = '<div style="color:#dc3545; font-weight:bold; text-align:center; padding:15px;">❌ Không tìm thấy nhiệm vụ nào được giao cho lớp này trong khoảng thời gian trên!</div>';
            return;
        }

        window.DataXuatDiem_NhiemVu = dsHienThi;
        window.DataXuatDiem_MaLop = maLop;

        let htmlCheckbox = `
            <div style="font-weight:bold; color:#0056b3; margin-bottom:12px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #ccc; padding-bottom:8px;">
                <span>📌 Đã tìm thấy ${dsHienThi.length} nhiệm vụ:</span>
                <div style="display:flex; gap:5px;">
                    <button onclick="document.querySelectorAll('.chk-xuat-diem').forEach(c => c.checked=true)" style="background:#28a745; color:white; border:none; border-radius:4px; font-size:11px; padding:4px 8px; cursor:pointer;">Tick Hết</button>
                    <button onclick="document.querySelectorAll('.chk-xuat-diem').forEach(c => c.checked=false)" style="background:#6c757d; color:white; border:none; border-radius:4px; font-size:11px; padding:4px 8px; cursor:pointer;">Bỏ Tick</button>
                </div>
            </div>
        `;

        dsHienThi.forEach(nv => {
            let badge = nv.loai === 'TN'
                ? '<span style="background:#17a2b8; color:white; padding:2px 6px; border-radius:4px; font-size:10px;">Trắc nghiệm</span>'
                : '<span style="background:#6f42c1; color:white; padding:2px 6px; border-radius:4px; font-size:10px;">Tự luận</span>';

            htmlCheckbox += `
                <label style="display: flex; align-items: flex-start; gap: 10px; margin-bottom: 8px; cursor: pointer; background: #fff; padding: 10px; border: 1px solid #dee2e6; border-radius: 6px; transition:0.2s;" onmouseover="this.style.background='#f1f8ff'" onmouseout="this.style.background='#fff'">
                    <input type="checkbox" class="chk-xuat-diem" value="${nv.ma_nhiem_vu}" data-loai="${nv.loai}" checked style="margin-top: 2px; transform: scale(1.3);">
                    <div style="flex:1;">
                        <div style="font-weight:bold; font-size:14px; color:#333; line-height:1.4;">${nv.ten_nhiem_vu}</div>
                        <div style="margin-top:6px; display:flex; align-items:center; gap:8px;">
                            ${badge} 
                            <span style="font-size:11px; color:#888;">Mã: ${nv.ma_nhiem_vu}</span>
                        </div>
                    </div>
                </label>
            `;
        });

        khuVuc.innerHTML = htmlCheckbox;

    } catch (error) {
        khuVuc.innerHTML = `<div style="color:red; text-align:center; padding:15px;">Lỗi quét dữ liệu: ${error.message}</div>`;
    }
};

// =====================================================================
// HÀM 23.3: KHỞI TẠO VÀ HIỂN THỊ BẢNG PREVIEW LẦN ĐẦU (MẶC ĐỊNH SORT THEO TÊN)
// =====================================================================
window.ham_23_3_thuc_thi_xuat_excel = async function () {
    const checkboxes = document.querySelectorAll('.chk-xuat-diem:checked');
    if (checkboxes.length === 0) {
        Swal.showValidationMessage('⚠️ Vui lòng Quét và Chọn ít nhất 1 nhiệm vụ để xem trước bảng điểm!');
        return false;
    }

    const maLop = window.DataXuatDiem_MaLop;

    let dsNhiemVuChon = [];
    checkboxes.forEach(chk => {
        const nvGoc = window.DataXuatDiem_NhiemVu.find(n => n.ma_nhiem_vu === chk.value);
        dsNhiemVuChon.push({
            ma_nhiem_vu: chk.value,
            loai: chk.getAttribute('data-loai'),
            ten: nvGoc.ten_nhiem_vu
        });
    });

    Swal.fire({ title: '⏳ Đang tổng hợp kết quả...', text: 'Việc này có thể mất vài giây...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

    try {
        const { data: dsHS } = await _supabase.from('hoc_sinh').select('uid, ten, sdt, danh_sach_ma_lop');
        let dsHocSinhLop = (dsHS || []).filter(hs => {
            let arrLop = [];
            try { arrLop = typeof hs.danh_sach_ma_lop === 'string' ? JSON.parse(hs.danh_sach_ma_lop) : (hs.danh_sach_ma_lop || []); } catch (e) { }
            return arrLop.includes(maLop);
        });

        const maNhiemVuTN = dsNhiemVuChon.filter(n => n.loai === 'TN').map(n => n.ma_nhiem_vu);
        const maNhiemVuTL = dsNhiemVuChon.filter(n => n.loai === 'TL').map(n => n.ma_nhiem_vu);

        let mapDiem = {};

        if (maNhiemVuTN.length > 0) {
            const { data: kqTN } = await _supabase.from('ket_qua_trac_nghiem')
                .select('id, uid_hoc_sinh, ma_nhiem_vu, tong_diem, thoi_gian_nop, trang_thai_cham')
                .in('ma_nhiem_vu', maNhiemVuTN)
                .order('thoi_gian_nop', { ascending: false });

            if (kqTN) {
                kqTN.forEach(kq => {
                    if (!mapDiem[kq.uid_hoc_sinh]) mapDiem[kq.uid_hoc_sinh] = {};
                    if (mapDiem[kq.uid_hoc_sinh][kq.ma_nhiem_vu] === undefined) {
                        mapDiem[kq.uid_hoc_sinh][kq.ma_nhiem_vu] = { id: kq.id, diem: kq.tong_diem, trang_thai_cham: kq.trang_thai_cham };
                    }
                });
            }
        }

        if (maNhiemVuTL.length > 0) {
            const { data: kqTL } = await _supabase.from('ket_qua_tu_luan')
                .select('id, uid_hoc_sinh, ma_nhiem_vu, tong_diem, thoi_gian_nop, trang_thai_cham')
                .in('ma_nhiem_vu', maNhiemVuTL)
                .order('thoi_gian_nop', { ascending: false });

            if (kqTL) {
                kqTL.forEach(kq => {
                    if (!mapDiem[kq.uid_hoc_sinh]) mapDiem[kq.uid_hoc_sinh] = {};
                    if (mapDiem[kq.uid_hoc_sinh][kq.ma_nhiem_vu] === undefined) {
                        mapDiem[kq.uid_hoc_sinh][kq.ma_nhiem_vu] = { id: kq.id, diem: kq.tong_diem, trang_thai_cham: kq.trang_thai_cham };
                    }
                });
            }
        }

        // Lưu vào RAM toàn cục
        window.DataXuatDiem_RawStudents = dsHocSinhLop;
        window.DataXuatDiem_MapDiem = mapDiem;
        window.DataXuatDiem_DsNhiemVu = dsNhiemVuChon;

        // 🌟 MẶC ĐỊNH SORT THEO TÊN (A-Z) KHI MỞ BẢNG PREVIEW
        window.DataXuatDiem_SortCol = 'ten';
        window.DataXuatDiem_SortAsc = true;

        // Mở Popup chính thức
        Swal.fire({
            title: `👀 BẢNG ĐIỂM: LỚP ${maLop}`,
            html: `<div id="vung-chua-bang-preview-diem">${ham_23_6_tao_html_bang_preview()}</div>`,
            width: '90vw',
            showCancelButton: true,
            cancelButtonText: 'Đóng lại',
            confirmButtonText: '📥 XÁC NHẬN XUẤT EXCEL (.xlsx)',
            confirmButtonColor: '#28a745',
            cancelButtonColor: '#6c757d',
            allowOutsideClick: false,
        }).then((result) => {
            if (result.isConfirmed) {
                ham_23_4_tao_file_xlsx_that(maLop, dsNhiemVuChon.length);
            }
        });

        return true;

    } catch (error) {
        Swal.fire('Lỗi xuất file', error.message, 'error');
        return false;
    }
};

// =====================================================================
// HÀM 23.6: TẠO MÃ HTML BẢNG PREVIEW (CẬP NHẬT SORT TIẾNG VIỆT CHUẨN)
// =====================================================================
window.ham_23_6_tao_html_bang_preview = function () {
    let dsHocSinhLop = [...window.DataXuatDiem_RawStudents];
    let mapDiem = window.DataXuatDiem_MapDiem;
    let dsNhiemVuChon = window.DataXuatDiem_DsNhiemVu;
    let sortCol = window.DataXuatDiem_SortCol;
    let sortAsc = window.DataXuatDiem_SortAsc;

    // Thuật toán Sắp xếp (Sorting)
    if (sortCol !== null) {
        dsHocSinhLop.sort((a, b) => {
            // 🌟 1. Xử lý riêng cho cột "Họ Tên" sử dụng localeCompare chuẩn tiếng Việt
            if (sortCol === 'ten') {
                let tenA = (a.ten || "").trim().split(" ").pop().toLowerCase();
                let tenB = (b.ten || "").trim().split(" ").pop().toLowerCase();
                let cmp = tenA.localeCompare(tenB, 'vi');
                // Nếu 2 em cùng tên, thì so sánh tiếp tới toàn bộ phần Họ chữ đệm
                if (cmp === 0) {
                    cmp = (a.ten || "").localeCompare(b.ten || "", 'vi');
                }
                return sortAsc ? cmp : -cmp;
            }

            // 🌟 2. Xử lý cho các cột khác (Điểm, STT, SĐT,...)
            let valA, valB;

            if (sortCol === 'stt') {
                return 0; // STT thì không cần sort, giữ theo mảng gốc
            } else if (sortCol === 'sdt') {
                valA = (a.sdt || "").toString();
                valB = (b.sdt || "").toString();
            } else if (sortCol === 'dtb') {
                valA = ham_tinh_dtb_hs(a.uid, dsNhiemVuChon, mapDiem);
                valB = ham_tinh_dtb_hs(b.uid, dsNhiemVuChon, mapDiem);
            } else {
                let kqA = mapDiem[a.uid] ? mapDiem[a.uid][sortCol] : null;
                let kqB = mapDiem[b.uid] ? mapDiem[b.uid][sortCol] : null;

                const getScoreWeight = (kq) => {
                    if (!kq) return -2; // Chưa nộp
                    if (kq.diem === null || kq.diem === undefined || (kq.trang_thai_cham !== 1 && kq.trang_thai_cham !== undefined)) {
                        return -1; // Chưa chấm
                    }
                    let d = parseFloat(kq.diem);
                    return isNaN(d) ? -1 : d;
                };

                valA = getScoreWeight(kqA);
                valB = getScoreWeight(kqB);
            }

            if (valA < valB) return sortAsc ? -1 : 1;
            if (valA > valB) return sortAsc ? 1 : -1;
            return 0;
        });
    }

    const getArrow = (colName) => {
        if (sortCol !== colName) return '<span style="color:rgba(255,255,255,0.4); font-size:10px; margin-left:4px;">▲▼</span>';
        return sortAsc ? '<span style="color:#ffc107; font-size:11px; margin-left:4px;">▲</span>' : '<span style="color:#ffc107; font-size:11px; margin-left:4px;">▼</span>';
    };

    let htmlTable = `
        <div style="max-height: 450px; overflow-y: auto; overflow-x: auto; border: 1px solid #ced4da; border-radius: 6px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); background:#fff;">
            <table style="width: 100%; border-collapse: collapse; min-width: ${500 + dsNhiemVuChon.length * 120}px; font-size: 13px;">
                <thead style="position: sticky; top: 0; z-index: 2;">
                    <tr style="background-color: #0070C0; color: white;">
                        <th onclick="ham_23_7_thuc_hien_sort('stt')" style="padding: 10px; border: 1px solid #dee2e6; width: 40px; text-align: center; white-space: nowrap; cursor:pointer;">STT ${getArrow('stt')}</th>
                        <th onclick="ham_23_7_thuc_hien_sort('ten')" style="padding: 10px; border: 1px solid #dee2e6; width: 180px; text-align: left; white-space: nowrap; cursor:pointer;">Họ và Tên Học Sinh ${getArrow('ten')}</th>
                        <th onclick="ham_23_7_thuc_hien_sort('sdt')" style="padding: 10px; border: 1px solid #dee2e6; width: 120px; text-align: center; white-space: nowrap; cursor:pointer;">Tên ĐN ${getArrow('sdt')}</th>
    `;

    dsNhiemVuChon.forEach(nv => {
        htmlTable += `<th onclick="ham_23_7_thuc_hien_sort('${nv.ma_nhiem_vu}')" style="padding: 10px; border: 1px solid #dee2e6; background-color: #28a745; min-width: 120px; text-align: center; cursor:pointer;" title="Bấm để sắp xếp theo cột này">${nv.ten} ${getArrow(nv.ma_nhiem_vu)}</th>`;
    });
    htmlTable += `<th onclick="ham_23_7_thuc_hien_sort('dtb')" style="padding: 10px; border: 1px solid #dee2e6; background-color: #dc3545; min-width: 80px; text-align: center; cursor:pointer;">ĐTB ${getArrow('dtb')}</th></tr></thead><tbody>`;

    dsHocSinhLop.forEach((hs, index) => {
        let tenHSafe = hs.ten.replace(/'/g, "\\'");

        htmlTable += `
            <tr style="border-bottom: 1px solid #eee;" onmouseover="this.style.background='#f1f8ff'" onmouseout="this.style.background='#fff'">
                <td style="padding: 8px; text-align: center; font-weight: bold; color: #555; border: 1px solid #dee2e6;">${index + 1}</td>
                <td style="padding: 8px; font-weight: bold; color: #333; border: 1px solid #dee2e6;">${hs.ten}</td>
                <td style="padding: 8px; text-align: center; color: #17a2b8; border: 1px solid #dee2e6;">${hs.sdt || ''}</td>
        `;

        let tongDiemHS = 0;
        let soCotCoDiem = 0;

        dsNhiemVuChon.forEach(nv => {
            let cellHtml = '';
            let kq = mapDiem[hs.uid] ? mapDiem[hs.uid][nv.ma_nhiem_vu] : null;

            if (!kq) {
                cellHtml = `<span onclick="ham_23_5_nhap_diem_nhanh_tu_preview('${hs.uid}', '${tenHSafe}', '${nv.ma_nhiem_vu}', '${nv.loai}', null, '')" title="Bấm để nhập điểm" style="color: #dc3545; font-size: 11px; font-weight: bold; background: #ffe3e6; padding: 4px 10px; border-radius: 4px; cursor: pointer; display: inline-block; border: 1px solid #f5c6cb; transition: 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">Chưa nộp ✏️</span>`;
            } else {
                let idKqStr = kq.id ? `'${kq.id}'` : 'null';

                if (nv.loai === 'TL') {
                    if (kq.trang_thai_cham === 1) {
                        let d = parseFloat(kq.diem);
                        if (!isNaN(d)) {
                            cellHtml = `<b onclick="ham_23_5_nhap_diem_nhanh_tu_preview('${hs.uid}', '${tenHSafe}', '${nv.ma_nhiem_vu}', '${nv.loai}', ${idKqStr}, ${d})" title="Bấm để sửa điểm" style="color: #28a745; font-size: 15px; cursor: pointer;">${d} ✏️</b>`;
                            tongDiemHS += d;
                            soCotCoDiem++;
                        } else {
                            cellHtml = `<span onclick="ham_23_5_nhap_diem_nhanh_tu_preview('${hs.uid}', '${tenHSafe}', '${nv.ma_nhiem_vu}', '${nv.loai}', ${idKqStr}, '')" title="Bấm để sửa" style="color: #17a2b8; font-size: 11px; font-weight: bold; cursor: pointer;">Đã chấm (Chữ) ✏️</span>`;
                        }
                    } else {
                        cellHtml = `<span onclick="ham_23_5_nhap_diem_nhanh_tu_preview('${hs.uid}', '${tenHSafe}', '${nv.ma_nhiem_vu}', '${nv.loai}', ${idKqStr}, '')" title="Bấm để chấm điểm" style="color: #0c5460; font-size: 11px; font-weight: bold; background: #d1ecf1; padding: 4px 10px; border-radius: 4px; cursor: pointer; display: inline-block; border: 1px solid #bee5eb; transition: 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">Chưa chấm ✏️</span>`;
                    }
                } else {
                    let d = parseFloat(kq.diem);
                    if (!isNaN(d)) {
                        cellHtml = `<b onclick="ham_23_5_nhap_diem_nhanh_tu_preview('${hs.uid}', '${tenHSafe}', '${nv.ma_nhiem_vu}', '${nv.loai}', ${idKqStr}, ${d})" title="Bấm để sửa điểm" style="color: #28a745; font-size: 15px; cursor: pointer;">${d} ✏️</b>`;
                        tongDiemHS += d;
                        soCotCoDiem++;
                    } else {
                        cellHtml = `<b onclick="ham_23_5_nhap_diem_nhanh_tu_preview('${hs.uid}', '${tenHSafe}', '${nv.ma_nhiem_vu}', '${nv.loai}', ${idKqStr}, 0)" title="Bấm để sửa" style="color: #28a745; font-size: 15px; cursor: pointer;">0 ✏️</b>`;
                        tongDiemHS += 0;
                        soCotCoDiem++;
                    }
                }
            }

            htmlTable += `<td style="padding: 8px; text-align: center; border: 1px solid #dee2e6;">${cellHtml}</td>`;
        });

        let dtb = soCotCoDiem > 0 ? parseFloat((tongDiemHS / soCotCoDiem).toFixed(2)) : null;
        htmlTable += `<td style="padding: 8px; text-align: center; font-weight: bold; color: #dc3545; border: 1px solid #dee2e6; background:#fff5f5;">${dtb !== null ? dtb : '-'}</td></tr>`;
    });

    htmlTable += `</tbody></table></div>`;
    return htmlTable;
};
// =====================================================================
// HÀM HỖ TRỢ: TÍNH ĐIỂM TRUNG BÌNH CỦA MỘT HỌC SINH ĐỂ SORT
// =====================================================================
window.ham_tinh_dtb_hs = function (uid, dsNhiemVuChon, mapDiem) {
    let tongDiemHS = 0;
    let soCotCoDiem = 0;
    dsNhiemVuChon.forEach(nv => {
        let kq = mapDiem[uid] ? mapDiem[uid][nv.ma_nhiem_vu] : null;
        if (kq && kq.diem !== null && !isNaN(parseFloat(kq.diem))) {
            tongDiemHS += parseFloat(kq.diem);
            soCotCoDiem++;
        }
    });
    return soCotCoDiem > 0 ? (tongDiemHS / soCotCoDiem) : -1;
};

// =====================================================================
// HÀM 23.7 (ĐÃ TỐI ƯU MƯỢT MÀ): CẬP NHẬT RIÊNG KHUNG HTML KHÔNG ĐÓNG MỞ POPUP (CHỐNG GIẬT)
// =====================================================================
window.ham_23_7_thuc_hien_sort = function (colName) {
    if (window.DataXuatDiem_SortCol === colName) {
        window.DataXuatDiem_SortAsc = !window.DataXuatDiem_SortAsc;
    } else {
        window.DataXuatDiem_SortCol = colName;
        window.DataXuatDiem_SortAsc = true;
    }

    // 🌟 Thay vì gọi Swal.fire() lại từ đầu gây giật màn hình, ta chỉ thay thế nội dung vùng chứa bảng
    const vungChuaBang = document.getElementById('vung-chua-bang-preview-diem');
    if (vungChuaBang) {
        vungChuaBang.innerHTML = ham_23_6_tao_html_bang_preview();
    }
};

// =====================================================================
// HÀM 23.5: HỖ TRỢ BẬT POPUP NHẬP ĐIỂM NGAY TỪ BẢNG XEM TRƯỚC (PREVIEW)
// =====================================================================
window.ham_23_5_nhap_diem_nhanh_tu_preview = function (uidHocSinh, tenHocSinh, maNhiemVu, loaiNhiemVu, idKetQua, diemCu) {
    Swal.fire({
        title: '📝 NHẬP ĐIỂM NHANH',
        html: `Học sinh: <b style="color:#0056b3;">${tenHocSinh}</b><br><br>Nhập điểm số đạt được:`,
        input: 'number',
        inputValue: diemCu !== undefined && diemCu !== null ? diemCu : '',
        inputAttributes: { step: 0.1, min: 0, max: 100 },
        showCancelButton: true,
        confirmButtonText: '💾 Lưu điểm',
        cancelButtonText: 'Hủy',
        confirmButtonColor: '#28a745',
        showLoaderOnConfirm: true,
        preConfirm: async (diemMoi) => {
            if (diemMoi === '') return Swal.showValidationMessage('Vui lòng nhập điểm!');
            const diemSo = parseFloat(diemMoi);

            try {
                let tableName = (loaiNhiemVu === 'TL') ? 'ket_qua_tu_luan' : 'ket_qua_trac_nghiem';

                if (idKetQua && idKetQua !== 'null') {
                    let payload = {
                        tong_diem: diemSo,
                        trang_thai_cham: 1
                    };
                    if (loaiNhiemVu === 'TN') {
                        payload.thoi_gian_lam_bai = 'Nhập tay (Giấy)';
                    }
                    const { error } = await _supabase.from(tableName).update(payload).eq('id', idKetQua);
                    if (error) throw error;
                } else {
                    let payload = {
                        uid_hoc_sinh: uidHocSinh,
                        ma_nhiem_vu: maNhiemVu,
                        tong_diem: diemSo,
                        trang_thai_cham: 1,
                        thoi_gian_nop: new Date().toISOString()
                    };
                    if (loaiNhiemVu === 'TN') {
                        payload.lan_thu = 1;
                        payload.trang_thai_lam_bai = 'da_nop';
                        payload.thoi_gian_lam_bai = 'Nhập tay (Giấy)';
                        payload.chi_tiet_lam_bai = [];
                    } else {
                        payload.chi_tiet_lam_bai = { luot_nop: 1, ghi_chu: "Nhập điểm trực tiếp từ bảng tổng hợp" };
                    }
                    const { error } = await _supabase.from(tableName).insert([payload]);
                    if (error) throw error;
                }
                return true;
            } catch (e) {
                Swal.showValidationMessage('Lỗi hệ thống: ' + e.message);
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Thành công',
                text: 'Đã cập nhật điểm vào hệ thống!',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false
            }).then(async () => {
                const dsNhiemVuChon = window.DataXuatDiem_DsNhiemVu;
                const maNhiemVuTN = dsNhiemVuChon.filter(n => n.loai === 'TN').map(n => n.ma_nhiem_vu);
                const maNhiemVuTL = dsNhiemVuChon.filter(n => n.loai === 'TL').map(n => n.ma_nhiem_vu);

                let mapDiem = {};
                if (maNhiemVuTN.length > 0) {
                    const { data: kqTN } = await _supabase.from('ket_qua_trac_nghiem').select('id, uid_hoc_sinh, ma_nhiem_vu, tong_diem, trang_thai_cham').in('ma_nhiem_vu', maNhiemVuTN);
                    if (kqTN) kqTN.forEach(kq => {
                        if (!mapDiem[kq.uid_hoc_sinh]) mapDiem[kq.uid_hoc_sinh] = {};
                        mapDiem[kq.uid_hoc_sinh][kq.ma_nhiem_vu] = { id: kq.id, diem: kq.tong_diem, trang_thai_cham: kq.trang_thai_cham };
                    });
                }
                if (maNhiemVuTL.length > 0) {
                    const { data: kqTL } = await _supabase.from('ket_qua_tu_luan').select('id, uid_hoc_sinh, ma_nhiem_vu, tong_diem, trang_thai_cham').in('ma_nhiem_vu', maNhiemVuTL);
                    if (kqTL) kqTL.forEach(kq => {
                        if (!mapDiem[kq.uid_hoc_sinh]) mapDiem[kq.uid_hoc_sinh] = {};
                        mapDiem[kq.uid_hoc_sinh][kq.ma_nhiem_vu] = { id: kq.id, diem: kq.tong_diem, trang_thai_cham: kq.trang_thai_cham };
                    });
                }
                window.DataXuatDiem_MapDiem = mapDiem;

                // Cập nhật lại HTML bảng mượt mà không chớp nháy
                const vungChuaBang = document.getElementById('vung-chua-bang-preview-diem');
                if (vungChuaBang) {
                    vungChuaBang.innerHTML = ham_23_6_tao_html_bang_preview();
                }
            });
        }
    });
};

// // =====================================================================
// // HÀM 23.4: XUẤT RA FILE .XLSX CHUẨN (SỬ DỤNG THƯ VIỆN SHEETJS)
// // =====================================================================
// window.ham_23_4_tao_file_xlsx_that = async function (maLop, soLuongNhiemVu) {
//     Swal.fire({ title: 'Đang tạo file Excel...', didOpen: () => Swal.showLoading() });

//     try {
//         if (typeof XLSX === 'undefined') {
//             await new Promise((resolve, reject) => {
//                 let script = document.createElement('script');
//                 script.src = "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js";
//                 script.onload = resolve;
//                 script.onerror = () => reject(new Error("Lỗi tải thư viện SheetJS"));
//                 document.head.appendChild(script);
//             });
//         }

//         const dataForExcel = window.DataXuatDiem_ExportArray;
//         if (!dataForExcel || dataForExcel.length === 0) throw new Error("Mất dữ liệu trong quá trình xử lý!");

//         const wb = XLSX.utils.book_new();
//         const ws = XLSX.utils.aoa_to_sheet(dataForExcel);

//         const range = XLSX.utils.decode_range(ws['!ref']);
//         for (let R = 1; R <= range.e.r; ++R) {
//             let cellAddress = { c: 2, r: R };
//             let cellRef = XLSX.utils.encode_cell(cellAddress);
//             if (ws[cellRef]) {
//                 ws[cellRef].t = 's';
//             }
//         }

//         let wscols = [
//             { wch: 5 },
//             { wch: 30 },
//             { wch: 15 }
//         ];
//         for (let i = 0; i < soLuongNhiemVu; i++) wscols.push({ wch: 25 });
//         wscols.push({ wch: 15 });
//         ws['!cols'] = wscols;

//         XLSX.utils.book_append_sheet(wb, ws, "BangDiem");

//         const fileName = `BangDiem_Lop_${maLop}_${new Date().toISOString().split('T')[0]}.xlsx`;
//         XLSX.writeFile(wb, fileName);

//         Swal.fire('Thành công!', '✅ File Excel (.xlsx) đã được tải xuống máy tính.', 'success');

//     } catch (e) {
//         console.error("Lỗi xuất XLSX:", e);
//         Swal.fire('Lỗi tạo file', e.message, 'error');
//     }
// };


// =====================================================================
// HÀM 23.4: XUẤT RA FILE .XLSX CHUẨN (ÉP BUỘC SORT THEO TÊN HỌC SINH MẶC ĐỊNH)
// =====================================================================
window.ham_23_4_tao_file_xlsx_that = async function (maLop) {
    Swal.fire({ title: 'Đang tạo file Excel...', didOpen: () => Swal.showLoading() });

    try {
        if (typeof XLSX === 'undefined') {
            await new Promise((resolve, reject) => {
                let script = document.createElement('script');
                script.src = "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js";
                script.onload = resolve;
                script.onerror = () => reject(new Error("Lỗi tải thư viện SheetJS"));
                document.head.appendChild(script);
            });
        }

        // Tạo một bản sao chép hoàn toàn độc lập (Deep Copy) để không bị ảnh hưởng bởi bảng Preview
        let dsHocSinhLop = JSON.parse(JSON.stringify(window.DataXuatDiem_RawStudents || []));
        const mapDiem = window.DataXuatDiem_MapDiem;
        const dsNhiemVuChon = window.DataXuatDiem_DsNhiemVu;

        if (dsHocSinhLop.length === 0 || !dsNhiemVuChon) throw new Error("Mất dữ liệu trong quá trình xử lý!");

        // 🌟 BƯỚC QUAN TRỌNG: ÉP BUỘC SẮP XẾP LẠI THEO TÊN (CHỮ CÁI CUỐI) TRƯỚC KHI XUẤT EXCEL
        const getTenCuoi = (fullName) => {
            if (!fullName) return "";
            let parts = fullName.trim().split(" ");
            return parts[parts.length - 1].toLowerCase();
        };

        dsHocSinhLop.sort((a, b) => {
            let tenA = getTenCuoi(a.ten);
            let tenB = getTenCuoi(b.ten);
            // Nếu chữ "Tên" giống nhau thì so sánh toàn bộ "Họ và Tên"
            if (tenA === tenB) return (a.ten || "").localeCompare(b.ten || "", 'vi');
            return tenA.localeCompare(tenB, 'vi');
        });

        // 1. Tự động dựng lại mảng dữ liệu 2 chiều chuẩn chỉnh
        let dataForExcel = [];
        let headerRow = ['STT', 'Họ và Tên Học Sinh', 'Tên đăng nhập'];
        dsNhiemVuChon.forEach(nv => headerRow.push(nv.ten));
        headerRow.push('Điểm Trung Bình');
        dataForExcel.push(headerRow);

        dsHocSinhLop.forEach((hs, index) => {
            let rowData = [index + 1, hs.ten, hs.sdt || ''];
            let tongDiemHS = 0;
            let soCotCoDiem = 0;

            dsNhiemVuChon.forEach(nv => {
                let cellDataExcel = '';
                let kq = mapDiem[hs.uid] ? mapDiem[hs.uid][nv.ma_nhiem_vu] : null;

                if (!kq) {
                    cellDataExcel = 'Chưa nộp';
                } else {
                    if (nv.loai === 'TL') {
                        if (kq.trang_thai_cham === 1) {
                            let d = parseFloat(kq.diem);
                            if (!isNaN(d)) {
                                cellDataExcel = d;
                                tongDiemHS += d;
                                soCotCoDiem++;
                            } else {
                                cellDataExcel = 'Đã chấm (Chữ)';
                            }
                        } else {
                            cellDataExcel = 'Chưa chấm';
                        }
                    } else {
                        let d = parseFloat(kq.diem);
                        if (!isNaN(d)) {
                            cellDataExcel = d;
                            tongDiemHS += d;
                            soCotCoDiem++;
                        } else {
                            cellDataExcel = 0;
                            tongDiemHS += 0;
                            soCotCoDiem++;
                        }
                    }
                }
                rowData.push(cellDataExcel);
            });

            let dtb = soCotCoDiem > 0 ? parseFloat((tongDiemHS / soCotCoDiem).toFixed(2)) : '';
            rowData.push(dtb);
            dataForExcel.push(rowData);
        });

        // 2. Tạo Workbook và Worksheet từ mảng chuẩn
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(dataForExcel);

        // 3. Định dạng ép kiểu Cột Tên Đăng Nhập thành chuỗi TEXT để giữ số 0
        const range = XLSX.utils.decode_range(ws['!ref']);
        for (let R = 1; R <= range.e.r; ++R) {
            let cellAddress = { c: 2, r: R };
            let cellRef = XLSX.utils.encode_cell(cellAddress);
            if (ws[cellRef]) {
                ws[cellRef].t = 's';
            }
        }

        // 4. Thiết lập độ rộng cột cho chuyên nghiệp
        let wscols = [
            { wch: 5 },
            { wch: 30 },
            { wch: 15 }
        ];
        for (let i = 0; i < dsNhiemVuChon.length; i++) wscols.push({ wch: 25 });
        wscols.push({ wch: 15 });
        ws['!cols'] = wscols;

        XLSX.utils.book_append_sheet(wb, ws, "BangDiem");

        // 5. Xuất ra file chuẩn XLSX
        const fileName = `BangDiem_Lop_${maLop}_${new Date().toISOString().split('T')[0]}.xlsx`;
        XLSX.writeFile(wb, fileName);

        Swal.fire('Thành công!', '✅ File Excel (.xlsx) đã được tải xuống máy tính.', 'success');

    } catch (e) {
        console.error("Lỗi xuất XLSX:", e);
        Swal.fire('Lỗi tạo file', e.message, 'error');
    }
};
// ==============================================================================
// KHỐI 23: XUẤT ĐIỂM TỔNG HỢP TẤT CẢ HỌC SINH CỦA 1 LỚP RA EXCEL
// ==============================================================================

// =====================================================================
// HÀM 23.1: GIAO DIỆN TÙY CHỌN XUẤT ĐIỂM
// Lệnh gọi từ menu/trang chủ: <button onclick="ham_23_1_mo_giao_dien_xuat_diem_tong_hop()">Xuất Điểm</button>
// =====================================================================
window.ham_23_1_mo_giao_dien_xuat_diem_tong_hop = async function () {
    Swal.fire({ title: 'Đang tải danh sách lớp...', didOpen: () => Swal.showLoading() });

    try {
        // Tải danh sách lớp
        const { data: dsLop, error } = await _supabase.from('lop_hoc').select('*');
        if (error) throw error;

        let htmlLop = '<option value="">-- Vui lòng chọn lớp --</option>';
        if (dsLop) {
            dsLop.forEach(l => {
                htmlLop += `<option value="${l.ma_lop || l.id}">${l.ten_lop || l.ten}</option>`;
            });
        }

        // Lấy ngày mặc định (Từ đầu tháng đến hôm nay)
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
                    
                    <!-- Khu vực chứa kết quả quét -->
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

    // Ép múi giờ chuẩn để quét Supabase chính xác
    const tuNgay = tuNgayRaw + 'T00:00:00.000Z';
    const denNgay = denNgayRaw + 'T23:59:59.999Z';

    khuVuc.style.display = 'block';
    khuVuc.innerHTML = '<div style="text-align:center; color:#17a2b8; font-weight:bold; padding:20px;">⏳ Đang quét dữ liệu Trắc nghiệm & Tự luận...</div>';

    try {
        // 1. Quét Nhiệm vụ Trắc nghiệm
        const { data: dsTN } = await _supabase.from('nhiem_vu_trac_nghiem')
            .select('ma_nhiem_vu, ten_nhiem_vu, danh_sach_lop')
            .gte('ngay_tao', tuNgay).lte('ngay_tao', denNgay);

        // 2. Quét Nhiệm vụ Tự luận
        const { data: dsTL } = await _supabase.from('nhiem_vu_tu_luan')
            .select('ma_nhiem_vu, ten_nhiem_vu, danh_sach_lop')
            .gte('ngay_tao', tuNgay).lte('ngay_tao', denNgay);

        let dsHienThi = [];

        // Hàm lọc nhặt những bài có giao cho lớp này
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

        // Lưu tạm vào bộ nhớ RAM để Hàm 23.3 dùng
        window.DataXuatDiem_NhiemVu = dsHienThi;
        window.DataXuatDiem_MaLop = maLop;

        // Vẽ danh sách Checkbox
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
// HÀM 23.3: THỰC THI GOM ĐIỂM VÀ TẠO FILE EXCEL TỰ ĐỘNG TẢI XUỐNG
// =====================================================================
window.ham_23_3_thuc_thi_xuat_excel = async function () {
    const checkboxes = document.querySelectorAll('.chk-xuat-diem:checked');
    if (checkboxes.length === 0) {
        Swal.showValidationMessage('⚠️ Vui lòng Quét và Chọn ít nhất 1 nhiệm vụ để xuất bảng điểm!');
        return false;
    }

    const maLop = window.DataXuatDiem_MaLop;

    // Thu thập các nhiệm vụ đã chọn
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
        // 1. Tải danh sách học sinh của lớp đó
        const { data: dsHS } = await _supabase.from('hoc_sinh').select('uid, ten, sdt, danh_sach_ma_lop');
        let dsHocSinhLop = (dsHS || []).filter(hs => {
            let arrLop = [];
            try { arrLop = typeof hs.danh_sach_ma_lop === 'string' ? JSON.parse(hs.danh_sach_ma_lop) : (hs.danh_sach_ma_lop || []); } catch (e) { }
            return arrLop.includes(maLop);
        });

        // Sắp xếp học sinh theo Tên (chữ cái cuối cùng)
        const getTenCuoi = (fullName) => {
            if (!fullName) return "";
            let parts = fullName.trim().split(" ");
            return parts[parts.length - 1].toLowerCase();
        };
        dsHocSinhLop.sort((a, b) => getTenCuoi(a.ten).localeCompare(getTenCuoi(b.ten), 'vi'));

        // 2. Tải toàn bộ Điểm số của các Nhiệm vụ được chọn
        const maNhiemVuTN = dsNhiemVuChon.filter(n => n.loai === 'TN').map(n => n.ma_nhiem_vu);
        const maNhiemVuTL = dsNhiemVuChon.filter(n => n.loai === 'TL').map(n => n.ma_nhiem_vu);

        // Cấu trúc Map lưu điểm: mapDiem[UID_HocSinh][Ma_Nhiem_Vu] = DiemSo
        let mapDiem = {};

        // Quét Điểm Trắc Nghiệm
        if (maNhiemVuTN.length > 0) {
            const { data: kqTN } = await _supabase.from('ket_qua_trac_nghiem')
                .select('uid_hoc_sinh, ma_nhiem_vu, tong_diem, thoi_gian_nop')
                .in('ma_nhiem_vu', maNhiemVuTN)
                .order('thoi_gian_nop', { ascending: false }); // Sắp xếp giảm dần để lấy bài nộp cuối

            if (kqTN) {
                kqTN.forEach(kq => {
                    if (!mapDiem[kq.uid_hoc_sinh]) mapDiem[kq.uid_hoc_sinh] = {};
                    if (mapDiem[kq.uid_hoc_sinh][kq.ma_nhiem_vu] === undefined) {
                        mapDiem[kq.uid_hoc_sinh][kq.ma_nhiem_vu] = kq.tong_diem;
                    }
                });
            }
        }

        // Quét Điểm Tự Luận
        if (maNhiemVuTL.length > 0) {
            const { data: kqTL } = await _supabase.from('ket_qua_tu_luan')
                .select('uid_hoc_sinh, ma_nhiem_vu, tong_diem, thoi_gian_nop')
                .in('ma_nhiem_vu', maNhiemVuTL)
                .order('thoi_gian_nop', { ascending: false });

            if (kqTL) {
                kqTL.forEach(kq => {
                    if (!mapDiem[kq.uid_hoc_sinh]) mapDiem[kq.uid_hoc_sinh] = {};
                    if (mapDiem[kq.uid_hoc_sinh][kq.ma_nhiem_vu] === undefined) {
                        mapDiem[kq.uid_hoc_sinh][kq.ma_nhiem_vu] = kq.tong_diem;
                    }
                });
            }
        }

        // 3. THUẬT TOÁN XÂY DỰNG BẢNG HTML ĐỂ EXPORT EXCEL
        // Mẹo nhỏ: dùng mso-number-format để ép Excel giữ số 0 ở tên đăng nhập/SĐT
        let htmlTable = `
            <table border="1">
                <thead>
                    <tr style="background-color: #0070C0; color: white; font-weight: bold;">
                        <th style="width: 50px; text-align: center;">STT</th>
                        <th style="width: 250px;">Họ và Tên Học Sinh</th>
                        <th style="width: 150px; text-align: center;">Tên đăng nhập</th>
        `;

        // Cột Header Điểm số cho từng nhiệm vụ
        dsNhiemVuChon.forEach(nv => {
            htmlTable += `<th style="background-color: #28a745; color: white;">${nv.ten}</th>`;
        });
        htmlTable += `<th style="background-color: #e74c3c; color: white;">Điểm Trung Bình</th></tr></thead><tbody>`;

        // Đổ dữ liệu từng học sinh
        dsHocSinhLop.forEach((hs, index) => {
            htmlTable += `
                <tr>
                    <td style="text-align: center;">${index + 1}</td>
                    <td>${hs.ten}</td>
                    <td style="text-align: center; mso-number-format:'\\@';">${hs.sdt || ''}</td>
            `;

            let tongDiemHS = 0;
            let soCotCoDiem = 0;

            dsNhiemVuChon.forEach(nv => {
                let diem = '';
                if (mapDiem[hs.uid] && mapDiem[hs.uid][nv.ma_nhiem_vu] !== undefined && mapDiem[hs.uid][nv.ma_nhiem_vu] !== null) {
                    diem = parseFloat(mapDiem[hs.uid][nv.ma_nhiem_vu]);
                    tongDiemHS += diem;
                    soCotCoDiem++;
                }
                // Nếu chưa làm/chưa chấm -> In rỗng
                htmlTable += `<td style="text-align: center; mso-number-format:'0.00';">${diem !== '' ? diem : ''}</td>`;
            });

            // Cột Điểm Trung Bình
            let dtb = soCotCoDiem > 0 ? (tongDiemHS / soCotCoDiem).toFixed(2) : '';
            htmlTable += `<td style="text-align: center; font-weight: bold; mso-number-format:'0.00';">${dtb}</td></tr>`;
        });

        htmlTable += `</tbody></table>`;

        // 4. GÓI THÀNH FILE EXCEL VÀ TẢI XUỐNG BẰNG URI BASE64 
        // Lõi Excel Template XML cực chuẩn để không bị lỗi font Tiếng Việt
        let templateXML = `
            <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
            <head>
                <meta charset="UTF-8">
                <!--[if gte mso 9]>
                <xml>
                    <x:ExcelWorkbook>
                        <x:ExcelWorksheets>
                            <x:ExcelWorksheet>
                                <x:Name>{worksheet}</x:Name>
                                <x:WorksheetOptions>
                                    <x:DisplayGridlines/>
                                </x:WorksheetOptions>
                            </x:ExcelWorksheet>
                        </x:ExcelWorksheets>
                    </x:ExcelWorkbook>
                </xml>
                <![endif]-->
            </head>
            <body>{table}</body>
            </html>
        `;

        let encodeBase64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) };
        let replaceVars = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) };

        let fileUri = 'data:application/vnd.ms-excel;base64,';
        let context = {
            worksheet: 'Bang Diem LOP ' + maLop,
            table: htmlTable
        };

        // Kích hoạt Download
        let theA = document.createElement("a");
        theA.download = `BangDiem_Lop_${maLop}_${new Date().toISOString().split('T')[0]}.xls`;
        theA.href = fileUri + encodeBase64(replaceVars(templateXML, context));
        document.body.appendChild(theA);
        theA.click();
        document.body.removeChild(theA);

        Swal.fire('Thành công', '✅ File Excel đã được tải xuống máy tính của Thầy/Cô!', 'success');
        return true;

    } catch (error) {
        Swal.fire('Lỗi xuất file', error.message, 'error');
        return false;
    }
};
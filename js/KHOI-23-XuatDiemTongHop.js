// // // // ==============================================================================




// // // // KHỐI 23: XUẤT ĐIỂM TỔNG HỢP TẤT CẢ HỌC SINH CỦA 1 LỚP RA EXCEL
// // // // ==============================================================================

// // // // // =====================================================================
// // // // // HÀM 23.1: GIAO DIỆN TÙY CHỌN XUẤT ĐIỂM
// // // // // =====================================================================
// // // // window.ham_23_1_mo_giao_dien_xuat_diem_tong_hop = async function () {
// // // //     Swal.fire({ title: 'Đang tải danh sách lớp...', didOpen: () => Swal.showLoading() });

// // // //     try {
// // // //         const { data: dsLop, error } = await _supabase.from('lop_hoc').select('*');
// // // //         if (error) throw error;

// // // //         let htmlLop = '<option value="">-- Vui lòng chọn lớp --</option>';
// // // //         if (dsLop) {
// // // //             dsLop.forEach(l => {
// // // //                 htmlLop += `<option value="${l.ma_lop || l.id}">${l.ten_lop || l.ten}</option>`;
// // // //             });
// // // //         }

// // // //         let dateObj = new Date();
// // // //         let firstDay = new Date(dateObj.getFullYear(), dateObj.getMonth(), 1).toISOString().split('T')[0];
// // // //         let today = dateObj.toISOString().split('T')[0];

// // // //         Swal.fire({
// // // //             title: '📥 XUẤT ĐIỂM TỔNG HỢP',
// // // //             html: `
// // // //                 <div style="text-align: left; font-size: 14px;">
// // // //                     <div style="margin-bottom: 15px; background: #e8f4f8; padding: 10px; border-radius: 6px; border: 1px solid #b8daff;">
// // // //                         <label style="font-weight: bold; color: #0056b3;">🏫 1. Chọn Lớp cần xuất:</label>
// // // //                         <select id="xuat_diem_ma_lop" style="width: 100%; padding: 8px; border-radius: 4px; border: 1px solid #0056b3; margin-top: 5px; font-weight:bold;">
// // // //                             ${htmlLop}
// // // //                         </select>
// // // //                     </div>
                    
// // // //                     <div style="background: #fff8e1; padding: 10px; border-radius: 6px; border: 1px solid #ffeeba; margin-bottom: 15px;">
// // // //                         <label style="font-weight: bold; color: #d35400;">📅 2. Chọn khoảng thời gian tạo nhiệm vụ:</label>
// // // //                         <div style="display: flex; gap: 10px; margin-top: 8px;">
// // // //                             <div style="flex: 1;">
// // // //                                 <div style="font-size:12px; font-weight:bold; color:#666;">Từ ngày:</div>
// // // //                                 <input type="date" id="xuat_diem_tu_ngay" value="${firstDay}" style="width: 100%; padding: 6px; border-radius: 4px; border: 1px solid #ccc; box-sizing:border-box;">
// // // //                             </div>
// // // //                             <div style="flex: 1;">
// // // //                                 <div style="font-size:12px; font-weight:bold; color:#666;">Đến ngày:</div>
// // // //                                 <input type="date" id="xuat_diem_den_ngay" value="${today}" style="width: 100%; padding: 6px; border-radius: 4px; border: 1px solid #ccc; box-sizing:border-box;">
// // // //                             </div>
// // // //                         </div>
// // // //                     </div>

// // // //                     <button onclick="ham_23_2_quet_nhiem_vu_de_xuat_excel()" style="width: 100%; padding: 12px; background: #17a2b8; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.2); transition:0.2s;" onmouseover="this.style.background='#138496'" onmouseout="this.style.background='#17a2b8'">
// // // //                         🔍 3. TÌM QUÉT NHIỆM VỤ CỦA LỚP
// // // //                     </button>
                    
// // // //                     <div id="xuat_diem_khu_vuc_nhiem_vu" style="margin-top: 15px; max-height: 250px; overflow-y: auto; border: 1px solid #ced4da; padding: 12px; border-radius: 6px; display: none; background: #f8f9fa;">
// // // //                     </div>
// // // //                 </div>
// // // //             `,
// // // //             showConfirmButton: true,
// // // //             confirmButtonText: '📥 XUẤT RA EXCEL',
// // // //             confirmButtonColor: '#28a745',
// // // //             showCancelButton: true,
// // // //             cancelButtonText: 'Đóng',
// // // //             width: '550px',
// // // //             preConfirm: () => {
// // // //                 return ham_23_3_thuc_thi_xuat_excel();
// // // //             }
// // // //         });
// // // //     } catch (err) {
// // // //         Swal.fire('Lỗi', 'Không tải được danh sách lớp: ' + err.message, 'error');
// // // //     }
// // // // };

// // // // // =====================================================================
// // // // // HÀM 23.2: QUÉT DANH SÁCH NHIỆM VỤ (TN + TL) THEO NGÀY VÀ LỚP
// // // // // =====================================================================
// // // // window.ham_23_2_quet_nhiem_vu_de_xuat_excel = async function () {
// // // //     const maLop = document.getElementById('xuat_diem_ma_lop').value;
// // // //     const tuNgayRaw = document.getElementById('xuat_diem_tu_ngay').value;
// // // //     const denNgayRaw = document.getElementById('xuat_diem_den_ngay').value;
// // // //     const khuVuc = document.getElementById('xuat_diem_khu_vuc_nhiem_vu');

// // // //     if (!maLop) return alert('⚠️ Thầy/Cô vui lòng chọn một lớp học ở Bước 1!');
// // // //     if (!tuNgayRaw || !denNgayRaw) return alert('⚠️ Vui lòng nhập đầy đủ ngày tháng!');

// // // //     const tuNgay = tuNgayRaw + 'T00:00:00.000Z';
// // // //     const denNgay = denNgayRaw + 'T23:59:59.999Z';

// // // //     khuVuc.style.display = 'block';
// // // //     khuVuc.innerHTML = '<div style="text-align:center; color:#17a2b8; font-weight:bold; padding:20px;">⏳ Đang quét dữ liệu Trắc nghiệm & Tự luận...</div>';

// // // //     try {
// // // //         const { data: dsTN } = await _supabase.from('nhiem_vu_trac_nghiem')
// // // //             .select('ma_nhiem_vu, ten_nhiem_vu, danh_sach_lop')
// // // //             .gte('ngay_tao', tuNgay).lte('ngay_tao', denNgay);

// // // //         const { data: dsTL } = await _supabase.from('nhiem_vu_tu_luan')
// // // //             .select('ma_nhiem_vu, ten_nhiem_vu, danh_sach_lop')
// // // //             .gte('ngay_tao', tuNgay).lte('ngay_tao', denNgay);

// // // //         let dsHienThi = [];

// // // //         const locBaiTheoLop = (danhSachBanDau, loaiBai) => {
// // // //             (danhSachBanDau || []).forEach(nv => {
// // // //                 let arrLop = [];
// // // //                 try {
// // // //                     arrLop = typeof nv.danh_sach_lop === 'string' ? JSON.parse(nv.danh_sach_lop) : (nv.danh_sach_lop || []);
// // // //                 } catch (e) { }

// // // //                 if (arrLop.includes(maLop)) {
// // // //                     dsHienThi.push({ ...nv, loai: loaiBai });
// // // //                 }
// // // //             });
// // // //         };

// // // //         locBaiTheoLop(dsTN, 'TN');
// // // //         locBaiTheoLop(dsTL, 'TL');

// // // //         if (dsHienThi.length === 0) {
// // // //             khuVuc.innerHTML = '<div style="color:#dc3545; font-weight:bold; text-align:center; padding:15px;">❌ Không tìm thấy nhiệm vụ nào được giao cho lớp này trong khoảng thời gian trên!</div>';
// // // //             return;
// // // //         }

// // // //         window.DataXuatDiem_NhiemVu = dsHienThi;
// // // //         window.DataXuatDiem_MaLop = maLop;

// // // //         let htmlCheckbox = `
// // // //             <div style="font-weight:bold; color:#0056b3; margin-bottom:12px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #ccc; padding-bottom:8px;">
// // // //                 <span>📌 Đã tìm thấy ${dsHienThi.length} nhiệm vụ:</span>
// // // //                 <div style="display:flex; gap:5px;">
// // // //                     <button onclick="document.querySelectorAll('.chk-xuat-diem').forEach(c => c.checked=true)" style="background:#28a745; color:white; border:none; border-radius:4px; font-size:11px; padding:4px 8px; cursor:pointer;">Tick Hết</button>
// // // //                     <button onclick="document.querySelectorAll('.chk-xuat-diem').forEach(c => c.checked=false)" style="background:#6c757d; color:white; border:none; border-radius:4px; font-size:11px; padding:4px 8px; cursor:pointer;">Bỏ Tick</button>
// // // //                 </div>
// // // //             </div>
// // // //         `;

// // // //         dsHienThi.forEach(nv => {
// // // //             let badge = nv.loai === 'TN'
// // // //                 ? '<span style="background:#17a2b8; color:white; padding:2px 6px; border-radius:4px; font-size:10px;">Trắc nghiệm</span>'
// // // //                 : '<span style="background:#6f42c1; color:white; padding:2px 6px; border-radius:4px; font-size:10px;">Tự luận</span>';

// // // //             htmlCheckbox += `
// // // //                 <label style="display: flex; align-items: flex-start; gap: 10px; margin-bottom: 8px; cursor: pointer; background: #fff; padding: 10px; border: 1px solid #dee2e6; border-radius: 6px; transition:0.2s;" onmouseover="this.style.background='#f1f8ff'" onmouseout="this.style.background='#fff'">
// // // //                     <input type="checkbox" class="chk-xuat-diem" value="${nv.ma_nhiem_vu}" data-loai="${nv.loai}" checked style="margin-top: 2px; transform: scale(1.3);">
// // // //                     <div style="flex:1;">
// // // //                         <div style="font-weight:bold; font-size:14px; color:#333; line-height:1.4;">${nv.ten_nhiem_vu}</div>
// // // //                         <div style="margin-top:6px; display:flex; align-items:center; gap:8px;">
// // // //                             ${badge} 
// // // //                             <span style="font-size:11px; color:#888;">Mã: ${nv.ma_nhiem_vu}</span>
// // // //                         </div>
// // // //                     </div>
// // // //                 </label>
// // // //             `;
// // // //         });

// // // //         khuVuc.innerHTML = htmlCheckbox;

// // // //     } catch (error) {
// // // //         khuVuc.innerHTML = `<div style="color:red; text-align:center; padding:15px;">Lỗi quét dữ liệu: ${error.message}</div>`;
// // // //     }
// // // // };

// // // // // =====================================================================
// // // // // HÀM 23.3: KHỞI TẠO VÀ HIỂN THỊ BẢNG PREVIEW LẦN ĐẦU (MẶC ĐỊNH SORT THEO TÊN)
// // // // // =====================================================================
// // // // window.ham_23_3_thuc_thi_xuat_excel = async function () {
// // // //     const checkboxes = document.querySelectorAll('.chk-xuat-diem:checked');
// // // //     if (checkboxes.length === 0) {
// // // //         Swal.showValidationMessage('⚠️ Vui lòng Quét và Chọn ít nhất 1 nhiệm vụ để xem trước bảng điểm!');
// // // //         return false;
// // // //     }

// // // //     const maLop = window.DataXuatDiem_MaLop;

// // // //     let dsNhiemVuChon = [];
// // // //     checkboxes.forEach(chk => {
// // // //         const nvGoc = window.DataXuatDiem_NhiemVu.find(n => n.ma_nhiem_vu === chk.value);
// // // //         dsNhiemVuChon.push({
// // // //             ma_nhiem_vu: chk.value,
// // // //             loai: chk.getAttribute('data-loai'),
// // // //             ten: nvGoc.ten_nhiem_vu
// // // //         });
// // // //     });

// // // //     Swal.fire({ title: '⏳ Đang tổng hợp kết quả...', text: 'Việc này có thể mất vài giây...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

// // // //     try {
// // // //         const { data: dsHS } = await _supabase.from('hoc_sinh').select('uid, ten, sdt, danh_sach_ma_lop');
// // // //         let dsHocSinhLop = (dsHS || []).filter(hs => {
// // // //             let arrLop = [];
// // // //             try { arrLop = typeof hs.danh_sach_ma_lop === 'string' ? JSON.parse(hs.danh_sach_ma_lop) : (hs.danh_sach_ma_lop || []); } catch (e) { }
// // // //             return arrLop.includes(maLop);
// // // //         });

// // // //         const maNhiemVuTN = dsNhiemVuChon.filter(n => n.loai === 'TN').map(n => n.ma_nhiem_vu);
// // // //         const maNhiemVuTL = dsNhiemVuChon.filter(n => n.loai === 'TL').map(n => n.ma_nhiem_vu);

// // // //         let mapDiem = {};

// // // //         if (maNhiemVuTN.length > 0) {
// // // //             const { data: kqTN } = await _supabase.from('ket_qua_trac_nghiem')
// // // //                 .select('id, uid_hoc_sinh, ma_nhiem_vu, tong_diem, thoi_gian_nop, trang_thai_cham')
// // // //                 .in('ma_nhiem_vu', maNhiemVuTN)
// // // //                 .order('thoi_gian_nop', { ascending: false });

// // // //             if (kqTN) {
// // // //                 kqTN.forEach(kq => {
// // // //                     if (!mapDiem[kq.uid_hoc_sinh]) mapDiem[kq.uid_hoc_sinh] = {};
// // // //                     if (mapDiem[kq.uid_hoc_sinh][kq.ma_nhiem_vu] === undefined) {
// // // //                         mapDiem[kq.uid_hoc_sinh][kq.ma_nhiem_vu] = { id: kq.id, diem: kq.tong_diem, trang_thai_cham: kq.trang_thai_cham };
// // // //                     }
// // // //                 });
// // // //             }
// // // //         }

// // // //         if (maNhiemVuTL.length > 0) {
// // // //             const { data: kqTL } = await _supabase.from('ket_qua_tu_luan')
// // // //                 .select('id, uid_hoc_sinh, ma_nhiem_vu, tong_diem, thoi_gian_nop, trang_thai_cham')
// // // //                 .in('ma_nhiem_vu', maNhiemVuTL)
// // // //                 .order('thoi_gian_nop', { ascending: false });

// // // //             if (kqTL) {
// // // //                 kqTL.forEach(kq => {
// // // //                     if (!mapDiem[kq.uid_hoc_sinh]) mapDiem[kq.uid_hoc_sinh] = {};
// // // //                     if (mapDiem[kq.uid_hoc_sinh][kq.ma_nhiem_vu] === undefined) {
// // // //                         mapDiem[kq.uid_hoc_sinh][kq.ma_nhiem_vu] = { id: kq.id, diem: kq.tong_diem, trang_thai_cham: kq.trang_thai_cham };
// // // //                     }
// // // //                 });
// // // //             }
// // // //         }

// // // //         // Lưu vào RAM toàn cục
// // // //         window.DataXuatDiem_RawStudents = dsHocSinhLop;
// // // //         window.DataXuatDiem_MapDiem = mapDiem;
// // // //         window.DataXuatDiem_DsNhiemVu = dsNhiemVuChon;

// // // //         // 🌟 MẶC ĐỊNH SORT THEO TÊN (A-Z) KHI MỞ BẢNG PREVIEW
// // // //         window.DataXuatDiem_SortCol = 'ten';
// // // //         window.DataXuatDiem_SortAsc = true;

// // // //         // Mở Popup chính thức
// // // //         Swal.fire({
// // // //             title: `👀 BẢNG ĐIỂM: LỚP ${maLop}`,
// // // //             html: `<div id="vung-chua-bang-preview-diem">${ham_23_6_tao_html_bang_preview()}</div>`,
// // // //             width: '90vw',
// // // //             showCancelButton: true,
// // // //             cancelButtonText: 'Đóng lại',
// // // //             confirmButtonText: '📥 XÁC NHẬN XUẤT EXCEL (.xlsx)',
// // // //             confirmButtonColor: '#28a745',
// // // //             cancelButtonColor: '#6c757d',
// // // //             allowOutsideClick: false,
// // // //         }).then((result) => {
// // // //             if (result.isConfirmed) {
// // // //                 ham_23_4_tao_file_xlsx_that(maLop, dsNhiemVuChon.length);
// // // //             }
// // // //         });

// // // //         return true;

// // // //     } catch (error) {
// // // //         Swal.fire('Lỗi xuất file', error.message, 'error');
// // // //         return false;
// // // //     }
// // // // };



// // // // ==============================================================================
// // // // KHỐI 23: XUẤT ĐIỂM TỔNG HỢP TẤT CẢ HỌC SINH CỦA 1 LỚP RA EXCEL
// // // // ==============================================================================

// // // // =====================================================================
// // // // HÀM 23.1: GIAO DIỆN TÙY CHỌN XUẤT ĐIỂM
// // // // =====================================================================
// // // window.ham_23_1_mo_giao_dien_xuat_diem_tong_hop = async function () {
// // //     Swal.fire({ title: 'Đang tải danh sách lớp...', didOpen: () => Swal.showLoading() });

// // //     try {
// // //         const { data: dsLop, error } = await _supabase.from('lop_hoc').select('*');
// // //         if (error) throw error;

// // //         let htmlLop = '<option value="">-- Vui lòng chọn lớp --</option>';
// // //         if (dsLop) {
// // //             dsLop.forEach(l => {
// // //                 htmlLop += `<option value="${l.ma_lop || l.id}">${l.ten_lop || l.ten}</option>`;
// // //             });
// // //         }

// // //         let dateObj = new Date();
// // //         let firstDay = new Date(dateObj.getFullYear(), dateObj.getMonth(), 1).toISOString().split('T')[0];
// // //         let today = dateObj.toISOString().split('T')[0];

// // //         Swal.fire({
// // //             title: '📥 XUẤT ĐIỂM TỔNG HỢP',
// // //             html: `
// // //                 <div style="text-align: left; font-size: 14px;">
// // //                     <div style="margin-bottom: 15px; background: #e8f4f8; padding: 10px; border-radius: 6px; border: 1px solid #b8daff;">
// // //                         <label style="font-weight: bold; color: #0056b3;">🏫 1. Chọn Lớp cần xuất:</label>
// // //                         <select id="xuat_diem_ma_lop" style="width: 100%; padding: 8px; border-radius: 4px; border: 1px solid #0056b3; margin-top: 5px; font-weight:bold;">
// // //                             ${htmlLop}
// // //                         </select>
// // //                     </div>
                    
// // //                     <div style="background: #fff8e1; padding: 10px; border-radius: 6px; border: 1px solid #ffeeba; margin-bottom: 15px;">
// // //                         <label style="font-weight: bold; color: #d35400;">📅 2. Chọn khoảng thời gian bài kiểm tra:</label>
// // //                         <div style="display: flex; gap: 10px; margin-top: 8px;">
// // //                             <div style="flex: 1;">
// // //                                 <div style="font-size:12px; font-weight:bold; color:#666;">Từ ngày:</div>
// // //                                 <input type="date" id="xuat_diem_tu_ngay" value="${firstDay}" style="width: 100%; padding: 6px; border-radius: 4px; border: 1px solid #ccc; box-sizing:border-box;">
// // //                             </div>
// // //                             <div style="flex: 1;">
// // //                                 <div style="font-size:12px; font-weight:bold; color:#666;">Đến ngày:</div>
// // //                                 <input type="date" id="xuat_diem_den_ngay" value="${today}" style="width: 100%; padding: 6px; border-radius: 4px; border: 1px solid #ccc; box-sizing:border-box;">
// // //                             </div>
// // //                         </div>
// // //                     </div>

// // //                     <button onclick="ham_23_2_quet_nhiem_vu_de_xuat_excel()" style="width: 100%; padding: 12px; background: #17a2b8; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.2); transition:0.2s;" onmouseover="this.style.background='#138496'" onmouseout="this.style.background='#17a2b8'">
// // //                         🔍 3. TÌM BÀI TRẮC NGHIỆM, TỰ LUẬN & ĐIỂM NHẬP TAY
// // //                     </button>
                    
// // //                     <div id="xuat_diem_khu_vuc_nhiem_vu" style="margin-top: 15px; max-height: 250px; overflow-y: auto; border: 1px solid #ced4da; padding: 12px; border-radius: 6px; display: none; background: #f8f9fa;">
// // //                     </div>
// // //                 </div>
// // //             `,
// // //             showConfirmButton: true,
// // //             confirmButtonText: '📥 XUẤT RA EXCEL',
// // //             confirmButtonColor: '#28a745',
// // //             showCancelButton: true,
// // //             cancelButtonText: 'Đóng',
// // //             width: '550px',
// // //             preConfirm: () => {
// // //                 return ham_23_3_thuc_thi_xuat_excel();
// // //             }
// // //         });
// // //     } catch (err) {
// // //         Swal.fire('Lỗi', 'Không tải được danh sách lớp: ' + err.message, 'error');
// // //     }
// // // };

// // // // =====================================================================
// // // // HÀM 23.2: QUÉT DANH SÁCH BÀI TỪ KHỐI ONINE VÀ KHỐI 20 (NHẬT KÝ)
// // // // =====================================================================
// // // window.ham_23_2_quet_nhiem_vu_de_xuat_excel = async function () {
// // //     const maLop = document.getElementById('xuat_diem_ma_lop').value;
// // //     const tuNgayRaw = document.getElementById('xuat_diem_tu_ngay').value;
// // //     const denNgayRaw = document.getElementById('xuat_diem_den_ngay').value;
// // //     const khuVuc = document.getElementById('xuat_diem_khu_vuc_nhiem_vu');

// // //     if (!maLop) return alert('⚠️ Thầy/Cô vui lòng chọn một lớp học ở Bước 1!');
// // //     if (!tuNgayRaw || !denNgayRaw) return alert('⚠️ Vui lòng nhập đầy đủ ngày tháng!');

// // //     const tuNgay = tuNgayRaw + 'T00:00:00.000Z';
// // //     const denNgay = denNgayRaw + 'T23:59:59.999Z';

// // //     khuVuc.style.display = 'block';
// // //     khuVuc.innerHTML = '<div style="text-align:center; color:#17a2b8; font-weight:bold; padding:20px;">⏳ Đang liên thông dữ liệu các hệ thống...</div>';

// // //     try {
// // //         // 1. Quét bài Online
// // //         const { data: dsTN } = await _supabase.from('nhiem_vu_trac_nghiem').select('ma_nhiem_vu, ten_nhiem_vu, danh_sach_lop').gte('ngay_tao', tuNgay).lte('ngay_tao', denNgay);
// // //         const { data: dsTL } = await _supabase.from('nhiem_vu_tu_luan').select('ma_nhiem_vu, ten_nhiem_vu, danh_sach_lop').gte('ngay_tao', tuNgay).lte('ngay_tao', denNgay);

// // //         let dsHienThi = [];
// // //         const locBaiTheoLop = (danhSachBanDau, loaiBai) => {
// // //             (danhSachBanDau || []).forEach(nv => {
// // //                 let arrLop = [];
// // //                 try { arrLop = typeof nv.danh_sach_lop === 'string' ? JSON.parse(nv.danh_sach_lop) : (nv.danh_sach_lop || []); } catch (e) { }
// // //                 if (arrLop.includes(maLop)) dsHienThi.push({ ...nv, loai: loaiBai });
// // //             });
// // //         };
// // //         locBaiTheoLop(dsTN, 'TN');
// // //         locBaiTheoLop(dsTL, 'TL');

// // //         // 2. Quét bài Nhập Tay Lớp (Từ Khối 20)
// // //         // Tìm ID Nhật ký của lớp trong khoảng thời gian này
// // //         const { data: dsNK } = await _supabase.from('nhat_ky_day_hoc').select('id').eq('ma_lop', maLop).gte('ngay_day', tuNgayRaw).lte('ngay_day', denNgayRaw);
// // //         if (dsNK && dsNK.length > 0) {
// // //             const nkIds = dsNK.map(nk => nk.id);
// // //             const { data: dsSK } = await _supabase.from('nhat_ky_su_kien_hs').select('ghi_chu, thong_tin_mo_rong').in('id_nhat_ky', nkIds).ilike('loai_the', 'Cho điểm%');

// // //             let cacBaiKT = new Set();
// // //             (dsSK || []).forEach(sk => {
// // //                 if (sk.thong_tin_mo_rong && sk.thong_tin_mo_rong.phan_loai === 'diem_ca_lop') {
// // //                     let tenBai = sk.ghi_chu.split(' - Ghi chú:')[0]; // Chuẩn hóa tên bài
// // //                     cacBaiKT.add(tenBai);
// // //                 }
// // //             });
// // //             cacBaiKT.forEach(baiKT => {
// // //                 dsHienThi.push({ ma_nhiem_vu: baiKT, ten_nhiem_vu: baiKT, danh_sach_lop: [maLop], loai: 'KT_LOP' });
// // //             });
// // //         }

// // //         if (dsHienThi.length === 0) {
// // //             khuVuc.innerHTML = '<div style="color:#dc3545; font-weight:bold; text-align:center; padding:15px;">❌ Không tìm thấy nhiệm vụ nào được giao cho lớp này!</div>';
// // //             return;
// // //         }

// // //         window.DataXuatDiem_NhiemVu = dsHienThi;
// // //         window.DataXuatDiem_MaLop = maLop;
// // //         window.DataXuatDiem_TuNgayRaw = tuNgayRaw;
// // //         window.DataXuatDiem_DenNgayRaw = denNgayRaw;

// // //         let htmlCheckbox = `
// // //             <div style="font-weight:bold; color:#0056b3; margin-bottom:12px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #ccc; padding-bottom:8px;">
// // //                 <span>📌 Tìm thấy ${dsHienThi.length} bài kiểm tra:</span>
// // //                 <div style="display:flex; gap:5px;">
// // //                     <button onclick="document.querySelectorAll('.chk-xuat-diem').forEach(c => c.checked=true)" style="background:#28a745; color:white; border:none; border-radius:4px; font-size:11px; padding:4px 8px; cursor:pointer;">Tick Hết</button>
// // //                     <button onclick="document.querySelectorAll('.chk-xuat-diem').forEach(c => c.checked=false)" style="background:#6c757d; color:white; border:none; border-radius:4px; font-size:11px; padding:4px 8px; cursor:pointer;">Bỏ Tick</button>
// // //                 </div>
// // //             </div>
// // //         `;

// // //         dsHienThi.forEach(nv => {
// // //             let badge = '';
// // //             if (nv.loai === 'TN') badge = '<span style="background:#17a2b8; color:white; padding:2px 6px; border-radius:4px; font-size:10px;">Trắc nghiệm</span>';
// // //             else if (nv.loai === 'TL') badge = '<span style="background:#6f42c1; color:white; padding:2px 6px; border-radius:4px; font-size:10px;">Tự luận</span>';
// // //             else badge = '<span style="background:#e83e8c; color:white; padding:2px 6px; border-radius:4px; font-size:10px;">Nhập tay (Lớp)</span>';

// // //             htmlCheckbox += `
// // //                 <label style="display: flex; align-items: flex-start; gap: 10px; margin-bottom: 8px; cursor: pointer; background: #fff; padding: 10px; border: 1px solid #dee2e6; border-radius: 6px; transition:0.2s;" onmouseover="this.style.background='#f1f8ff'" onmouseout="this.style.background='#fff'">
// // //                     <input type="checkbox" class="chk-xuat-diem" value="${nv.ma_nhiem_vu}" data-loai="${nv.loai}" checked style="margin-top: 2px; transform: scale(1.3);">
// // //                     <div style="flex:1;">
// // //                         <div style="font-weight:bold; font-size:14px; color:#333; line-height:1.4;">${nv.ten_nhiem_vu}</div>
// // //                         <div style="margin-top:6px; display:flex; align-items:center; gap:8px;">${badge} <span style="font-size:11px; color:#888;">Mã: ${nv.ma_nhiem_vu}</span></div>
// // //                     </div>
// // //                 </label>
// // //             `;
// // //         });

// // //         khuVuc.innerHTML = htmlCheckbox;

// // //     } catch (error) {
// // //         khuVuc.innerHTML = `<div style="color:red; text-align:center; padding:15px;">Lỗi quét dữ liệu: ${error.message}</div>`;
// // //     }
// // // };

// // // // =====================================================================
// // // // HÀM 23.3: LẤY ĐIỂM SỐ CHUẨN BỊ XUẤT EXCEL
// // // // =====================================================================
// // // window.ham_23_3_thuc_thi_xuat_excel = async function () {
// // //     const checkboxes = document.querySelectorAll('.chk-xuat-diem:checked');
// // //     if (checkboxes.length === 0) { Swal.showValidationMessage('⚠️ Vui lòng chọn ít nhất 1 nhiệm vụ!'); return false; }

// // //     const maLop = window.DataXuatDiem_MaLop;
// // //     let dsNhiemVuChon = [];
// // //     checkboxes.forEach(chk => {
// // //         const nvGoc = window.DataXuatDiem_NhiemVu.find(n => n.ma_nhiem_vu === chk.value);
// // //         dsNhiemVuChon.push({ ma_nhiem_vu: chk.value, loai: chk.getAttribute('data-loai'), ten: nvGoc.ten_nhiem_vu });
// // //     });

// // //     Swal.fire({ title: '⏳ Đang tổng hợp kết quả...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

// // //     try {
// // //         const { data: dsHS } = await _supabase.from('hoc_sinh').select('uid, ten, sdt, danh_sach_ma_lop');
// // //         let dsHocSinhLop = (dsHS || []).filter(hs => {
// // //             let arrLop = [];
// // //             try { arrLop = typeof hs.danh_sach_ma_lop === 'string' ? JSON.parse(hs.danh_sach_ma_lop) : (hs.danh_sach_ma_lop || []); } catch (e) { }
// // //             return arrLop.includes(maLop);
// // //         });

// // //         const maNhiemVuTN = dsNhiemVuChon.filter(n => n.loai === 'TN').map(n => n.ma_nhiem_vu);
// // //         const maNhiemVuTL = dsNhiemVuChon.filter(n => n.loai === 'TL').map(n => n.ma_nhiem_vu);
// // //         const maNhiemVuKT = dsNhiemVuChon.filter(n => n.loai === 'KT_LOP').map(n => n.ma_nhiem_vu);

// // //         let mapDiem = {};

// // //         if (maNhiemVuTN.length > 0) {
// // //             const { data: kqTN } = await _supabase.from('ket_qua_trac_nghiem').select('id, uid_hoc_sinh, ma_nhiem_vu, tong_diem, trang_thai_cham').in('ma_nhiem_vu', maNhiemVuTN);
// // //             if (kqTN) kqTN.forEach(kq => {
// // //                 if (!mapDiem[kq.uid_hoc_sinh]) mapDiem[kq.uid_hoc_sinh] = {};
// // //                 mapDiem[kq.uid_hoc_sinh][kq.ma_nhiem_vu] = { diem: kq.tong_diem, trang_thai_cham: kq.trang_thai_cham };
// // //             });
// // //         }

// // //         if (maNhiemVuTL.length > 0) {
// // //             const { data: kqTL } = await _supabase.from('ket_qua_tu_luan').select('id, uid_hoc_sinh, ma_nhiem_vu, tong_diem, trang_thai_cham').in('ma_nhiem_vu', maNhiemVuTL);
// // //             if (kqTL) kqTL.forEach(kq => {
// // //                 if (!mapDiem[kq.uid_hoc_sinh]) mapDiem[kq.uid_hoc_sinh] = {};
// // //                 mapDiem[kq.uid_hoc_sinh][kq.ma_nhiem_vu] = { diem: kq.tong_diem, trang_thai_cham: kq.trang_thai_cham };
// // //             });
// // //         }

// // //         // Móc điểm từ Khối 20
// // //         if (maNhiemVuKT.length > 0) {
// // //             const hsUids = dsHocSinhLop.map(h => h.uid);
// // //             const { data: kqKT } = await _supabase.from('nhat_ky_su_kien_hs')
// // //                 .select('uid_hoc_sinh, ghi_chu, thong_tin_mo_rong')
// // //                 .in('uid_hoc_sinh', hsUids)
// // //                 .ilike('loai_the', 'Cho điểm%');

// // //             if (kqKT) {
// // //                 kqKT.forEach(kq => {
// // //                     if (kq.thong_tin_mo_rong && kq.thong_tin_mo_rong.phan_loai === 'diem_ca_lop') {
// // //                         let tenBai = kq.ghi_chu.split(' - Ghi chú:')[0];
// // //                         if (maNhiemVuKT.includes(tenBai)) {
// // //                             if (!mapDiem[kq.uid_hoc_sinh]) mapDiem[kq.uid_hoc_sinh] = {};
// // //                             mapDiem[kq.uid_hoc_sinh][tenBai] = { diem: kq.thong_tin_mo_rong.diem_so, trang_thai_cham: 1 };
// // //                         }
// // //                     }
// // //                 });
// // //             }
// // //         }

// // //         window.DataXuatDiem_RawStudents = dsHocSinhLop;
// // //         window.DataXuatDiem_MapDiem = mapDiem;
// // //         window.DataXuatDiem_DsNhiemVu = dsNhiemVuChon;

// // //         Swal.fire({
// // //             title: `👀 XÁC NHẬN DỮ LIỆU: LỚP ${maLop}`,
// // //             text: `Đã gom điểm của ${dsNhiemVuChon.length} cột. Thầy/Cô có muốn xuất ra file Excel màu sắc chuẩn không?`,
// // //             icon: 'info',
// // //             showCancelButton: true,
// // //             cancelButtonText: 'Đóng lại',
// // //             confirmButtonText: '📥 XUẤT EXCEL (.xlsx)',
// // //             confirmButtonColor: '#28a745',
// // //             allowOutsideClick: false,
// // //         }).then((result) => {
// // //             if (result.isConfirmed) {
// // //                 ham_23_4_tao_file_xlsx_that(maLop);
// // //             }
// // //         });
// // //         return true;

// // //     } catch (error) {
// // //         Swal.fire('Lỗi xuất file', error.message, 'error');
// // //         return false;
// // //     }
// // // };



// // // // =====================================================================
// // // // HÀM 23.6: TẠO MÃ HTML BẢNG PREVIEW (CẬP NHẬT SORT TIẾNG VIỆT CHUẨN)
// // // // =====================================================================
// // // window.ham_23_6_tao_html_bang_preview = function () {
// // //     let dsHocSinhLop = [...window.DataXuatDiem_RawStudents];
// // //     let mapDiem = window.DataXuatDiem_MapDiem;
// // //     let dsNhiemVuChon = window.DataXuatDiem_DsNhiemVu;
// // //     let sortCol = window.DataXuatDiem_SortCol;
// // //     let sortAsc = window.DataXuatDiem_SortAsc;

// // //     // Thuật toán Sắp xếp (Sorting)
// // //     if (sortCol !== null) {
// // //         dsHocSinhLop.sort((a, b) => {
// // //             // 🌟 1. Xử lý riêng cho cột "Họ Tên" sử dụng localeCompare chuẩn tiếng Việt
// // //             if (sortCol === 'ten') {
// // //                 let tenA = (a.ten || "").trim().split(" ").pop().toLowerCase();
// // //                 let tenB = (b.ten || "").trim().split(" ").pop().toLowerCase();
// // //                 let cmp = tenA.localeCompare(tenB, 'vi');
// // //                 // Nếu 2 em cùng tên, thì so sánh tiếp tới toàn bộ phần Họ chữ đệm
// // //                 if (cmp === 0) {
// // //                     cmp = (a.ten || "").localeCompare(b.ten || "", 'vi');
// // //                 }
// // //                 return sortAsc ? cmp : -cmp;
// // //             }

// // //             // 🌟 2. Xử lý cho các cột khác (Điểm, STT, SĐT,...)
// // //             let valA, valB;

// // //             if (sortCol === 'stt') {
// // //                 return 0; // STT thì không cần sort, giữ theo mảng gốc
// // //             } else if (sortCol === 'sdt') {
// // //                 valA = (a.sdt || "").toString();
// // //                 valB = (b.sdt || "").toString();
// // //             } else if (sortCol === 'dtb') {
// // //                 valA = ham_tinh_dtb_hs(a.uid, dsNhiemVuChon, mapDiem);
// // //                 valB = ham_tinh_dtb_hs(b.uid, dsNhiemVuChon, mapDiem);
// // //             } else {
// // //                 let kqA = mapDiem[a.uid] ? mapDiem[a.uid][sortCol] : null;
// // //                 let kqB = mapDiem[b.uid] ? mapDiem[b.uid][sortCol] : null;

// // //                 const getScoreWeight = (kq) => {
// // //                     if (!kq) return -2; // Chưa nộp
// // //                     if (kq.diem === null || kq.diem === undefined || (kq.trang_thai_cham !== 1 && kq.trang_thai_cham !== undefined)) {
// // //                         return -1; // Chưa chấm
// // //                     }
// // //                     let d = parseFloat(kq.diem);
// // //                     return isNaN(d) ? -1 : d;
// // //                 };

// // //                 valA = getScoreWeight(kqA);
// // //                 valB = getScoreWeight(kqB);
// // //             }

// // //             if (valA < valB) return sortAsc ? -1 : 1;
// // //             if (valA > valB) return sortAsc ? 1 : -1;
// // //             return 0;
// // //         });
// // //     }

// // //     const getArrow = (colName) => {
// // //         if (sortCol !== colName) return '<span style="color:rgba(255,255,255,0.4); font-size:10px; margin-left:4px;">▲▼</span>';
// // //         return sortAsc ? '<span style="color:#ffc107; font-size:11px; margin-left:4px;">▲</span>' : '<span style="color:#ffc107; font-size:11px; margin-left:4px;">▼</span>';
// // //     };

// // //     let htmlTable = `
// // //         <div style="max-height: 450px; overflow-y: auto; overflow-x: auto; border: 1px solid #ced4da; border-radius: 6px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); background:#fff;">
// // //             <table style="width: 100%; border-collapse: collapse; min-width: ${500 + dsNhiemVuChon.length * 120}px; font-size: 13px;">
// // //                 <thead style="position: sticky; top: 0; z-index: 2;">
// // //                     <tr style="background-color: #0070C0; color: white;">
// // //                         <th onclick="ham_23_7_thuc_hien_sort('stt')" style="padding: 10px; border: 1px solid #dee2e6; width: 40px; text-align: center; white-space: nowrap; cursor:pointer;">STT ${getArrow('stt')}</th>
// // //                         <th onclick="ham_23_7_thuc_hien_sort('ten')" style="padding: 10px; border: 1px solid #dee2e6; width: 180px; text-align: left; white-space: nowrap; cursor:pointer;">Họ và Tên Học Sinh ${getArrow('ten')}</th>
// // //                         <th onclick="ham_23_7_thuc_hien_sort('sdt')" style="padding: 10px; border: 1px solid #dee2e6; width: 120px; text-align: center; white-space: nowrap; cursor:pointer;">Tên ĐN ${getArrow('sdt')}</th>
// // //     `;

// // //     dsNhiemVuChon.forEach(nv => {
// // //         htmlTable += `<th onclick="ham_23_7_thuc_hien_sort('${nv.ma_nhiem_vu}')" style="padding: 10px; border: 1px solid #dee2e6; background-color: #28a745; min-width: 120px; text-align: center; cursor:pointer;" title="Bấm để sắp xếp theo cột này">${nv.ten} ${getArrow(nv.ma_nhiem_vu)}</th>`;
// // //     });
// // //     htmlTable += `<th onclick="ham_23_7_thuc_hien_sort('dtb')" style="padding: 10px; border: 1px solid #dee2e6; background-color: #dc3545; min-width: 80px; text-align: center; cursor:pointer;">ĐTB ${getArrow('dtb')}</th></tr></thead><tbody>`;

// // //     dsHocSinhLop.forEach((hs, index) => {
// // //         let tenHSafe = hs.ten.replace(/'/g, "\\'");

// // //         htmlTable += `
// // //             <tr style="border-bottom: 1px solid #eee;" onmouseover="this.style.background='#f1f8ff'" onmouseout="this.style.background='#fff'">
// // //                 <td style="padding: 8px; text-align: center; font-weight: bold; color: #555; border: 1px solid #dee2e6;">${index + 1}</td>
// // //                 <td style="padding: 8px; font-weight: bold; color: #333; border: 1px solid #dee2e6;">${hs.ten}</td>
// // //                 <td style="padding: 8px; text-align: center; color: #17a2b8; border: 1px solid #dee2e6;">${hs.sdt || ''}</td>
// // //         `;

// // //         let tongDiemHS = 0;
// // //         let soCotCoDiem = 0;

// // //         dsNhiemVuChon.forEach(nv => {
// // //             let cellHtml = '';
// // //             let kq = mapDiem[hs.uid] ? mapDiem[hs.uid][nv.ma_nhiem_vu] : null;

// // //             if (!kq) {
// // //                 cellHtml = `<span onclick="ham_23_5_nhap_diem_nhanh_tu_preview('${hs.uid}', '${tenHSafe}', '${nv.ma_nhiem_vu}', '${nv.loai}', null, '')" title="Bấm để nhập điểm" style="color: #dc3545; font-size: 11px; font-weight: bold; background: #ffe3e6; padding: 4px 10px; border-radius: 4px; cursor: pointer; display: inline-block; border: 1px solid #f5c6cb; transition: 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">Chưa nộp ✏️</span>`;
// // //             } else {
// // //                 let idKqStr = kq.id ? `'${kq.id}'` : 'null';

// // //                 if (nv.loai === 'TL') {
// // //                     if (kq.trang_thai_cham === 1) {
// // //                         let d = parseFloat(kq.diem);
// // //                         if (!isNaN(d)) {
// // //                             cellHtml = `<b onclick="ham_23_5_nhap_diem_nhanh_tu_preview('${hs.uid}', '${tenHSafe}', '${nv.ma_nhiem_vu}', '${nv.loai}', ${idKqStr}, ${d})" title="Bấm để sửa điểm" style="color: #28a745; font-size: 15px; cursor: pointer;">${d} ✏️</b>`;
// // //                             tongDiemHS += d;
// // //                             soCotCoDiem++;
// // //                         } else {
// // //                             cellHtml = `<span onclick="ham_23_5_nhap_diem_nhanh_tu_preview('${hs.uid}', '${tenHSafe}', '${nv.ma_nhiem_vu}', '${nv.loai}', ${idKqStr}, '')" title="Bấm để sửa" style="color: #17a2b8; font-size: 11px; font-weight: bold; cursor: pointer;">Đã chấm (Chữ) ✏️</span>`;
// // //                         }
// // //                     } else {
// // //                         cellHtml = `<span onclick="ham_23_5_nhap_diem_nhanh_tu_preview('${hs.uid}', '${tenHSafe}', '${nv.ma_nhiem_vu}', '${nv.loai}', ${idKqStr}, '')" title="Bấm để chấm điểm" style="color: #0c5460; font-size: 11px; font-weight: bold; background: #d1ecf1; padding: 4px 10px; border-radius: 4px; cursor: pointer; display: inline-block; border: 1px solid #bee5eb; transition: 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">Chưa chấm ✏️</span>`;
// // //                     }
// // //                 } else {
// // //                     let d = parseFloat(kq.diem);
// // //                     if (!isNaN(d)) {
// // //                         cellHtml = `<b onclick="ham_23_5_nhap_diem_nhanh_tu_preview('${hs.uid}', '${tenHSafe}', '${nv.ma_nhiem_vu}', '${nv.loai}', ${idKqStr}, ${d})" title="Bấm để sửa điểm" style="color: #28a745; font-size: 15px; cursor: pointer;">${d} ✏️</b>`;
// // //                         tongDiemHS += d;
// // //                         soCotCoDiem++;
// // //                     } else {
// // //                         cellHtml = `<b onclick="ham_23_5_nhap_diem_nhanh_tu_preview('${hs.uid}', '${tenHSafe}', '${nv.ma_nhiem_vu}', '${nv.loai}', ${idKqStr}, 0)" title="Bấm để sửa" style="color: #28a745; font-size: 15px; cursor: pointer;">0 ✏️</b>`;
// // //                         tongDiemHS += 0;
// // //                         soCotCoDiem++;
// // //                     }
// // //                 }
// // //             }

// // //             htmlTable += `<td style="padding: 8px; text-align: center; border: 1px solid #dee2e6;">${cellHtml}</td>`;
// // //         });

// // //         let dtb = soCotCoDiem > 0 ? parseFloat((tongDiemHS / soCotCoDiem).toFixed(2)) : null;
// // //         htmlTable += `<td style="padding: 8px; text-align: center; font-weight: bold; color: #dc3545; border: 1px solid #dee2e6; background:#fff5f5;">${dtb !== null ? dtb : '-'}</td></tr>`;
// // //     });

// // //     htmlTable += `</tbody></table></div>`;
// // //     return htmlTable;
// // // };
// // // // =====================================================================
// // // // HÀM HỖ TRỢ: TÍNH ĐIỂM TRUNG BÌNH CỦA MỘT HỌC SINH ĐỂ SORT
// // // // =====================================================================
// // // window.ham_tinh_dtb_hs = function (uid, dsNhiemVuChon, mapDiem) {
// // //     let tongDiemHS = 0;
// // //     let soCotCoDiem = 0;
// // //     dsNhiemVuChon.forEach(nv => {
// // //         let kq = mapDiem[uid] ? mapDiem[uid][nv.ma_nhiem_vu] : null;
// // //         if (kq && kq.diem !== null && !isNaN(parseFloat(kq.diem))) {
// // //             tongDiemHS += parseFloat(kq.diem);
// // //             soCotCoDiem++;
// // //         }
// // //     });
// // //     return soCotCoDiem > 0 ? (tongDiemHS / soCotCoDiem) : -1;
// // // };

// // // // =====================================================================
// // // // HÀM 23.7 (ĐÃ TỐI ƯU MƯỢT MÀ): CẬP NHẬT RIÊNG KHUNG HTML KHÔNG ĐÓNG MỞ POPUP (CHỐNG GIẬT)
// // // // =====================================================================
// // // window.ham_23_7_thuc_hien_sort = function (colName) {
// // //     if (window.DataXuatDiem_SortCol === colName) {
// // //         window.DataXuatDiem_SortAsc = !window.DataXuatDiem_SortAsc;
// // //     } else {
// // //         window.DataXuatDiem_SortCol = colName;
// // //         window.DataXuatDiem_SortAsc = true;
// // //     }

// // //     // 🌟 Thay vì gọi Swal.fire() lại từ đầu gây giật màn hình, ta chỉ thay thế nội dung vùng chứa bảng
// // //     const vungChuaBang = document.getElementById('vung-chua-bang-preview-diem');
// // //     if (vungChuaBang) {
// // //         vungChuaBang.innerHTML = ham_23_6_tao_html_bang_preview();
// // //     }
// // // };

// // // // =====================================================================
// // // // HÀM 23.5: HỖ TRỢ BẬT POPUP NHẬP ĐIỂM NGAY TỪ BẢNG XEM TRƯỚC (PREVIEW)
// // // // =====================================================================
// // // window.ham_23_5_nhap_diem_nhanh_tu_preview = function (uidHocSinh, tenHocSinh, maNhiemVu, loaiNhiemVu, idKetQua, diemCu) {
// // //     Swal.fire({
// // //         title: '📝 NHẬP ĐIỂM NHANH',
// // //         html: `Học sinh: <b style="color:#0056b3;">${tenHocSinh}</b><br><br>Nhập điểm số đạt được:`,
// // //         input: 'number',
// // //         inputValue: diemCu !== undefined && diemCu !== null ? diemCu : '',
// // //         inputAttributes: { step: 0.1, min: 0, max: 100 },
// // //         showCancelButton: true,
// // //         confirmButtonText: '💾 Lưu điểm',
// // //         cancelButtonText: 'Hủy',
// // //         confirmButtonColor: '#28a745',
// // //         showLoaderOnConfirm: true,
// // //         preConfirm: async (diemMoi) => {
// // //             if (diemMoi === '') return Swal.showValidationMessage('Vui lòng nhập điểm!');
// // //             const diemSo = parseFloat(diemMoi);

// // //             try {
// // //                 let tableName = (loaiNhiemVu === 'TL') ? 'ket_qua_tu_luan' : 'ket_qua_trac_nghiem';

// // //                 if (idKetQua && idKetQua !== 'null') {
// // //                     let payload = {
// // //                         tong_diem: diemSo,
// // //                         trang_thai_cham: 1
// // //                     };
// // //                     if (loaiNhiemVu === 'TN') {
// // //                         payload.thoi_gian_lam_bai = 'Nhập tay (Giấy)';
// // //                     }
// // //                     const { error } = await _supabase.from(tableName).update(payload).eq('id', idKetQua);
// // //                     if (error) throw error;
// // //                 } else {
// // //                     let payload = {
// // //                         uid_hoc_sinh: uidHocSinh,
// // //                         ma_nhiem_vu: maNhiemVu,
// // //                         tong_diem: diemSo,
// // //                         trang_thai_cham: 1,
// // //                         thoi_gian_nop: new Date().toISOString()
// // //                     };
// // //                     if (loaiNhiemVu === 'TN') {
// // //                         payload.lan_thu = 1;
// // //                         payload.trang_thai_lam_bai = 'da_nop';
// // //                         payload.thoi_gian_lam_bai = 'Nhập tay (Giấy)';
// // //                         payload.chi_tiet_lam_bai = [];
// // //                     } else {
// // //                         payload.chi_tiet_lam_bai = { luot_nop: 1, ghi_chu: "Nhập điểm trực tiếp từ bảng tổng hợp" };
// // //                     }
// // //                     const { error } = await _supabase.from(tableName).insert([payload]);
// // //                     if (error) throw error;
// // //                 }
// // //                 return true;
// // //             } catch (e) {
// // //                 Swal.showValidationMessage('Lỗi hệ thống: ' + e.message);
// // //             }
// // //         }
// // //     }).then((result) => {
// // //         if (result.isConfirmed) {
// // //             Swal.fire({
// // //                 title: 'Thành công',
// // //                 text: 'Đã cập nhật điểm vào hệ thống!',
// // //                 icon: 'success',
// // //                 timer: 1500,
// // //                 showConfirmButton: false
// // //             }).then(async () => {
// // //                 const dsNhiemVuChon = window.DataXuatDiem_DsNhiemVu;
// // //                 const maNhiemVuTN = dsNhiemVuChon.filter(n => n.loai === 'TN').map(n => n.ma_nhiem_vu);
// // //                 const maNhiemVuTL = dsNhiemVuChon.filter(n => n.loai === 'TL').map(n => n.ma_nhiem_vu);

// // //                 let mapDiem = {};
// // //                 if (maNhiemVuTN.length > 0) {
// // //                     const { data: kqTN } = await _supabase.from('ket_qua_trac_nghiem').select('id, uid_hoc_sinh, ma_nhiem_vu, tong_diem, trang_thai_cham').in('ma_nhiem_vu', maNhiemVuTN);
// // //                     if (kqTN) kqTN.forEach(kq => {
// // //                         if (!mapDiem[kq.uid_hoc_sinh]) mapDiem[kq.uid_hoc_sinh] = {};
// // //                         mapDiem[kq.uid_hoc_sinh][kq.ma_nhiem_vu] = { id: kq.id, diem: kq.tong_diem, trang_thai_cham: kq.trang_thai_cham };
// // //                     });
// // //                 }
// // //                 if (maNhiemVuTL.length > 0) {
// // //                     const { data: kqTL } = await _supabase.from('ket_qua_tu_luan').select('id, uid_hoc_sinh, ma_nhiem_vu, tong_diem, trang_thai_cham').in('ma_nhiem_vu', maNhiemVuTL);
// // //                     if (kqTL) kqTL.forEach(kq => {
// // //                         if (!mapDiem[kq.uid_hoc_sinh]) mapDiem[kq.uid_hoc_sinh] = {};
// // //                         mapDiem[kq.uid_hoc_sinh][kq.ma_nhiem_vu] = { id: kq.id, diem: kq.tong_diem, trang_thai_cham: kq.trang_thai_cham };
// // //                     });
// // //                 }
// // //                 window.DataXuatDiem_MapDiem = mapDiem;

// // //                 // Cập nhật lại HTML bảng mượt mà không chớp nháy
// // //                 const vungChuaBang = document.getElementById('vung-chua-bang-preview-diem');
// // //                 if (vungChuaBang) {
// // //                     vungChuaBang.innerHTML = ham_23_6_tao_html_bang_preview();
// // //                 }
// // //             });
// // //         }
// // //     });
// // // };

// // // // // =====================================================================
// // // // // HÀM 23.4: XUẤT RA FILE .XLSX CHUẨN (SỬ DỤNG THƯ VIỆN SHEETJS)
// // // // // =====================================================================
// // // // window.ham_23_4_tao_file_xlsx_that = async function (maLop, soLuongNhiemVu) {
// // // //     Swal.fire({ title: 'Đang tạo file Excel...', didOpen: () => Swal.showLoading() });

// // // //     try {
// // // //         if (typeof XLSX === 'undefined') {
// // // //             await new Promise((resolve, reject) => {
// // // //                 let script = document.createElement('script');
// // // //                 script.src = "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js";
// // // //                 script.onload = resolve;
// // // //                 script.onerror = () => reject(new Error("Lỗi tải thư viện SheetJS"));
// // // //                 document.head.appendChild(script);
// // // //             });
// // // //         }

// // // //         const dataForExcel = window.DataXuatDiem_ExportArray;
// // // //         if (!dataForExcel || dataForExcel.length === 0) throw new Error("Mất dữ liệu trong quá trình xử lý!");

// // // //         const wb = XLSX.utils.book_new();
// // // //         const ws = XLSX.utils.aoa_to_sheet(dataForExcel);

// // // //         const range = XLSX.utils.decode_range(ws['!ref']);
// // // //         for (let R = 1; R <= range.e.r; ++R) {
// // // //             let cellAddress = { c: 2, r: R };
// // // //             let cellRef = XLSX.utils.encode_cell(cellAddress);
// // // //             if (ws[cellRef]) {
// // // //                 ws[cellRef].t = 's';
// // // //             }
// // // //         }

// // // //         let wscols = [
// // // //             { wch: 5 },
// // // //             { wch: 30 },
// // // //             { wch: 15 }
// // // //         ];
// // // //         for (let i = 0; i < soLuongNhiemVu; i++) wscols.push({ wch: 25 });
// // // //         wscols.push({ wch: 15 });
// // // //         ws['!cols'] = wscols;

// // // //         XLSX.utils.book_append_sheet(wb, ws, "BangDiem");

// // // //         const fileName = `BangDiem_Lop_${maLop}_${new Date().toISOString().split('T')[0]}.xlsx`;
// // // //         XLSX.writeFile(wb, fileName);

// // // //         Swal.fire('Thành công!', '✅ File Excel (.xlsx) đã được tải xuống máy tính.', 'success');

// // // //     } catch (e) {
// // // //         console.error("Lỗi xuất XLSX:", e);
// // // //         Swal.fire('Lỗi tạo file', e.message, 'error');
// // // //     }
// // // // };


// // // // // =====================================================================
// // // // // HÀM 23.4: XUẤT RA FILE .XLSX CHUẨN (ÉP BUỘC SORT THEO TÊN HỌC SINH MẶC ĐỊNH)
// // // // // =====================================================================
// // // // window.ham_23_4_tao_file_xlsx_that = async function (maLop) {
// // // //     Swal.fire({ title: 'Đang tạo file Excel...', didOpen: () => Swal.showLoading() });

// // // //     try {
// // // //         if (typeof XLSX === 'undefined') {
// // // //             await new Promise((resolve, reject) => {
// // // //                 let script = document.createElement('script');
// // // //                 script.src = "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js";
// // // //                 script.onload = resolve;
// // // //                 script.onerror = () => reject(new Error("Lỗi tải thư viện SheetJS"));
// // // //                 document.head.appendChild(script);
// // // //             });
// // // //         }

// // // //         // Tạo một bản sao chép hoàn toàn độc lập (Deep Copy) để không bị ảnh hưởng bởi bảng Preview
// // // //         let dsHocSinhLop = JSON.parse(JSON.stringify(window.DataXuatDiem_RawStudents || []));
// // // //         const mapDiem = window.DataXuatDiem_MapDiem;
// // // //         const dsNhiemVuChon = window.DataXuatDiem_DsNhiemVu;

// // // //         if (dsHocSinhLop.length === 0 || !dsNhiemVuChon) throw new Error("Mất dữ liệu trong quá trình xử lý!");

// // // //         // 🌟 BƯỚC QUAN TRỌNG: ÉP BUỘC SẮP XẾP LẠI THEO TÊN (CHỮ CÁI CUỐI) TRƯỚC KHI XUẤT EXCEL
// // // //         const getTenCuoi = (fullName) => {
// // // //             if (!fullName) return "";
// // // //             let parts = fullName.trim().split(" ");
// // // //             return parts[parts.length - 1].toLowerCase();
// // // //         };

// // // //         dsHocSinhLop.sort((a, b) => {
// // // //             let tenA = getTenCuoi(a.ten);
// // // //             let tenB = getTenCuoi(b.ten);
// // // //             // Nếu chữ "Tên" giống nhau thì so sánh toàn bộ "Họ và Tên"
// // // //             if (tenA === tenB) return (a.ten || "").localeCompare(b.ten || "", 'vi');
// // // //             return tenA.localeCompare(tenB, 'vi');
// // // //         });

// // // //         // 1. Tự động dựng lại mảng dữ liệu 2 chiều chuẩn chỉnh
// // // //         let dataForExcel = [];
// // // //         let headerRow = ['STT', 'Họ và Tên Học Sinh', 'Tên đăng nhập'];
// // // //         dsNhiemVuChon.forEach(nv => headerRow.push(nv.ten));
// // // //         headerRow.push('Điểm Trung Bình');
// // // //         dataForExcel.push(headerRow);

// // // //         dsHocSinhLop.forEach((hs, index) => {
// // // //             let rowData = [index + 1, hs.ten, hs.sdt || ''];
// // // //             let tongDiemHS = 0;
// // // //             let soCotCoDiem = 0;

// // // //             dsNhiemVuChon.forEach(nv => {
// // // //                 let cellDataExcel = '';
// // // //                 let kq = mapDiem[hs.uid] ? mapDiem[hs.uid][nv.ma_nhiem_vu] : null;

// // // //                 if (!kq) {
// // // //                     cellDataExcel = 'Chưa nộp';
// // // //                 } else {
// // // //                     if (nv.loai === 'TL') {
// // // //                         if (kq.trang_thai_cham === 1) {
// // // //                             let d = parseFloat(kq.diem);
// // // //                             if (!isNaN(d)) {
// // // //                                 cellDataExcel = d;
// // // //                                 tongDiemHS += d;
// // // //                                 soCotCoDiem++;
// // // //                             } else {
// // // //                                 cellDataExcel = 'Đã chấm (Chữ)';
// // // //                             }
// // // //                         } else {
// // // //                             cellDataExcel = 'Chưa chấm';
// // // //                         }
// // // //                     } else {
// // // //                         let d = parseFloat(kq.diem);
// // // //                         if (!isNaN(d)) {
// // // //                             cellDataExcel = d;
// // // //                             tongDiemHS += d;
// // // //                             soCotCoDiem++;
// // // //                         } else {
// // // //                             cellDataExcel = 0;
// // // //                             tongDiemHS += 0;
// // // //                             soCotCoDiem++;
// // // //                         }
// // // //                     }
// // // //                 }
// // // //                 rowData.push(cellDataExcel);
// // // //             });

// // // //             let dtb = soCotCoDiem > 0 ? parseFloat((tongDiemHS / soCotCoDiem).toFixed(2)) : '';
// // // //             rowData.push(dtb);
// // // //             dataForExcel.push(rowData);
// // // //         });

// // // //         // 2. Tạo Workbook và Worksheet từ mảng chuẩn
// // // //         const wb = XLSX.utils.book_new();
// // // //         const ws = XLSX.utils.aoa_to_sheet(dataForExcel);

// // // //         // 3. Định dạng ép kiểu Cột Tên Đăng Nhập thành chuỗi TEXT để giữ số 0
// // // //         const range = XLSX.utils.decode_range(ws['!ref']);
// // // //         for (let R = 1; R <= range.e.r; ++R) {
// // // //             let cellAddress = { c: 2, r: R };
// // // //             let cellRef = XLSX.utils.encode_cell(cellAddress);
// // // //             if (ws[cellRef]) {
// // // //                 ws[cellRef].t = 's';
// // // //             }
// // // //         }

// // // //         // 4. Thiết lập độ rộng cột cho chuyên nghiệp
// // // //         let wscols = [
// // // //             { wch: 5 },
// // // //             { wch: 30 },
// // // //             { wch: 15 }
// // // //         ];
// // // //         for (let i = 0; i < dsNhiemVuChon.length; i++) wscols.push({ wch: 25 });
// // // //         wscols.push({ wch: 15 });
// // // //         ws['!cols'] = wscols;

// // // //         XLSX.utils.book_append_sheet(wb, ws, "BangDiem");

// // // //         // 5. Xuất ra file chuẩn XLSX
// // // //         const fileName = `BangDiem_Lop_${maLop}_${new Date().toISOString().split('T')[0]}.xlsx`;
// // // //         XLSX.writeFile(wb, fileName);

// // // //         Swal.fire('Thành công!', '✅ File Excel (.xlsx) đã được tải xuống máy tính.', 'success');

// // // //     } catch (e) {
// // // //         console.error("Lỗi xuất XLSX:", e);
// // // //         Swal.fire('Lỗi tạo file', e.message, 'error');
// // // //     }
// // // // };



// // // // =====================================================================
// // // // HÀM 23.4: XUẤT RA FILE EXCEL CÓ MÀU SẮC ĐẸP BẰNG XLSX-JS-STYLE
// // // // =====================================================================
// // // window.ham_23_4_tao_file_xlsx_that = async function (maLop) {
// // //     Swal.fire({ title: 'Đang kết xuất Excel siêu đẹp...', didOpen: () => Swal.showLoading() });

// // //     try {
// // //         // Tải thư viện có hỗ trợ TÔ MÀU CELL
// // //         if (typeof XLSX === 'undefined' || !XLSX.utils.book_new().Workbook) {
// // //             await new Promise((resolve, reject) => {
// // //                 let script = document.createElement('script');
// // //                 script.src = "https://cdn.jsdelivr.net/npm/xlsx-js-style@1.2.0/dist/xlsx.bundle.js";
// // //                 script.onload = resolve;
// // //                 script.onerror = () => reject(new Error("Lỗi tải thư viện định dạng Excel"));
// // //                 document.head.appendChild(script);
// // //             });
// // //         }

// // //         let dsHocSinhLop = [...(window.DataXuatDiem_RawStudents || [])];
// // //         const mapDiem = window.DataXuatDiem_MapDiem;
// // //         const dsNhiemVuChon = window.DataXuatDiem_DsNhiemVu;

// // //         if (dsHocSinhLop.length === 0 || !dsNhiemVuChon) throw new Error("Mất dữ liệu trong quá trình xử lý!");

// // //         // Sắp xếp Alpha-B theo tên
// // //         const getTenCuoi = (fName) => fName ? fName.trim().split(" ").pop().toLowerCase() : "";
// // //         dsHocSinhLop.sort((a, b) => {
// // //             let tenA = getTenCuoi(a.ten), tenB = getTenCuoi(b.ten);
// // //             if (tenA === tenB) return (a.ten || "").localeCompare(b.ten || "", 'vi');
// // //             return tenA.localeCompare(tenB, 'vi');
// // //         });

// // //         // 1. CHUẨN BỊ MẢNG DỮ LIỆU
// // //         let dataForExcel = [];
// // //         let headerRow = ['STT', 'Họ và Tên Học Sinh', 'Tên Đăng Nhập'];
// // //         dsNhiemVuChon.forEach(nv => headerRow.push(nv.ten));
// // //         headerRow.push('ĐTB');
// // //         dataForExcel.push(headerRow);

// // //         dsHocSinhLop.forEach((hs, index) => {
// // //             let rowData = [index + 1, hs.ten, hs.sdt || ''];
// // //             let tongDiemHS = 0; let soCotCoDiem = 0;

// // //             dsNhiemVuChon.forEach(nv => {
// // //                 let kq = mapDiem[hs.uid] ? mapDiem[hs.uid][nv.ma_nhiem_vu] : null;
// // //                 if (!kq) {
// // //                     rowData.push(nv.loai === 'KT_LOP' ? 0 : 'Chưa nộp');
// // //                     if (nv.loai === 'KT_LOP') soCotCoDiem++; // Nhập tay mặc định tính 0 nếu trống
// // //                 } else {
// // //                     if (nv.loai === 'TL' && kq.trang_thai_cham !== 1) {
// // //                         rowData.push('Chưa chấm');
// // //                     } else {
// // //                         let d = parseFloat(kq.diem);
// // //                         if (!isNaN(d)) { rowData.push(d); tongDiemHS += d; soCotCoDiem++; }
// // //                         else { rowData.push('Đã chấm'); }
// // //                     }
// // //                 }
// // //             });

// // //             let dtb = soCotCoDiem > 0 ? parseFloat((tongDiemHS / soCotCoDiem).toFixed(2)) : '';
// // //             rowData.push(dtb);
// // //             dataForExcel.push(rowData);
// // //         });

// // //         // 2. KHỞI TẠO FILE EXCEL 
// // //         const wb = XLSX.utils.book_new();
// // //         const ws = XLSX.utils.aoa_to_sheet(dataForExcel);
// // //         const range = XLSX.utils.decode_range(ws['!ref']);

// // //         // 3. APPLY STYLE TỪNG Ô (CELL)
// // //         for (let R = 0; R <= range.e.r; ++R) {
// // //             for (let C = 0; C <= range.e.c; ++C) {
// // //                 let cellRef = XLSX.utils.encode_cell({ c: C, r: R });
// // //                 if (!ws[cellRef]) continue;

// // //                 let cell = ws[cellRef];
// // //                 if (!cell.s) cell.s = {};

// // //                 // Ép cột SĐT thành String để không mất số 0
// // //                 if (C === 2 && R > 0) cell.t = 's';

// // //                 // Viền chung và Căn giữa
// // //                 cell.s.border = {
// // //                     top: { style: "thin", color: { rgb: "CCCCCC" } },
// // //                     bottom: { style: "thin", color: { rgb: "CCCCCC" } },
// // //                     left: { style: "thin", color: { rgb: "CCCCCC" } },
// // //                     right: { style: "thin", color: { rgb: "CCCCCC" } }
// // //                 };
// // //                 if (C === 0 || C >= 2) cell.s.alignment = { horizontal: "center", vertical: "center" };
// // //                 else cell.s.alignment = { vertical: "center" };

// // //                 // HEADER (Dòng 0)
// // //                 if (R === 0) {
// // //                     cell.s.font = { bold: true, color: { rgb: "FFFFFF" } };
// // //                     if (C < 3) cell.s.fill = { fgColor: { rgb: "0070C0" } }; // Cột cố định: Xanh lơ biển
// // //                     else if (C === range.e.c) cell.s.fill = { fgColor: { rgb: "DC3545" } }; // ĐTB: Đỏ
// // //                     else {
// // //                         let nv = dsNhiemVuChon[C - 3];
// // //                         if (nv.loai === 'TN') cell.s.fill = { fgColor: { rgb: "28A745" } }; // Trắc nghiệm: Xanh lá
// // //                         else if (nv.loai === 'TL') cell.s.fill = { fgColor: { rgb: "6F42C1" } }; // Tự luận: Tím
// // //                         else cell.s.fill = { fgColor: { rgb: "E83E8C" } }; // Lớp (Khối 20): Hồng
// // //                     }
// // //                 }
// // //                 // BODY (Từ dòng 1)
// // //                 else {
// // //                     let val = cell.v;
// // //                     if (C > 2 && C < range.e.c) { // Các cột điểm
// // //                         if (val === 'Chưa nộp') {
// // //                             cell.s.fill = { fgColor: { rgb: "FFE3E6" } };
// // //                             cell.s.font = { color: { rgb: "DC3545" }, italic: true };
// // //                         } else if (val === 'Chưa chấm') {
// // //                             cell.s.fill = { fgColor: { rgb: "D1ECF1" } };
// // //                             cell.s.font = { color: { rgb: "0C5460" }, italic: true };
// // //                         } else if (typeof val === 'number') {
// // //                             cell.s.font = { bold: true };
// // //                             cell.s.font.color = val < 5 ? { rgb: "DC3545" } : { rgb: "155724" };
// // //                         }
// // //                     }
// // //                     if (C === range.e.c && typeof val === 'number') { // Cột ĐTB
// // //                         cell.s.font = { bold: true, color: val < 5 ? { rgb: "DC3545" } : { rgb: "28A745" } };
// // //                         cell.s.fill = { fgColor: { rgb: "FFF5F5" } };
// // //                     }
// // //                 }
// // //             }
// // //         }

// // //         // Căn chỉnh độ rộng cột
// // //         let wscols = [{ wch: 6 }, { wch: 30 }, { wch: 15 }];
// // //         for (let i = 0; i < dsNhiemVuChon.length; i++) wscols.push({ wch: 18 });
// // //         wscols.push({ wch: 12 });
// // //         ws['!cols'] = wscols;

// // //         XLSX.utils.book_append_sheet(wb, ws, "DiemTongHop");
// // //         const fileName = `BangDiem_Lop_${maLop}_${new Date().toISOString().split('T')[0]}.xlsx`;
// // //         XLSX.writeFile(wb, fileName);

// // //         Swal.fire('Hoàn tất!', '✅ Bảng điểm đã được xuất ra với màu sắc đầy đủ.', 'success');

// // //     } catch (e) {
// // //         console.error("Lỗi xuất XLSX:", e);
// // //         Swal.fire('Lỗi tạo file', e.message, 'error');
// // //     }
// // // };




// // // ==============================================================================
// // // KHỐI 23: XUẤT ĐIỂM TỔNG HỢP TẤT CẢ HỌC SINH CỦA 1 LỚP RA EXCEL
// // // ==============================================================================

// // // =====================================================================
// // // HÀM 23.1: GIAO DIỆN TÙY CHỌN XUẤT ĐIỂM
// // // =====================================================================
// // window.ham_23_1_mo_giao_dien_xuat_diem_tong_hop = async function () {
// //     Swal.fire({ title: 'Đang tải danh sách lớp...', didOpen: () => Swal.showLoading() });

// //     try {
// //         const { data: dsLop, error } = await _supabase.from('lop_hoc').select('*');
// //         if (error) throw error;

// //         let htmlLop = '<option value="">-- Vui lòng chọn lớp --</option>';
// //         if (dsLop) {
// //             dsLop.forEach(l => {
// //                 htmlLop += `<option value="${l.ma_lop || l.id}">${l.ten_lop || l.ten}</option>`;
// //             });
// //         }

// //         let dateObj = new Date();
// //         let firstDay = new Date(dateObj.getFullYear(), dateObj.getMonth(), 1).toISOString().split('T')[0];
// //         let today = dateObj.toISOString().split('T')[0];

// //         Swal.fire({
// //             title: '📥 XUẤT ĐIỂM TỔNG HỢP',
// //             html: `
// //                 <div style="text-align: left; font-size: 14px;">
// //                     <div style="margin-bottom: 15px; background: #e8f4f8; padding: 10px; border-radius: 6px; border: 1px solid #b8daff;">
// //                         <label style="font-weight: bold; color: #0056b3;">🏫 1. Chọn Lớp cần xuất:</label>
// //                         <select id="xuat_diem_ma_lop" style="width: 100%; padding: 8px; border-radius: 4px; border: 1px solid #0056b3; margin-top: 5px; font-weight:bold;">
// //                             ${htmlLop}
// //                         </select>
// //                     </div>
                    
// //                     <div style="background: #fff8e1; padding: 10px; border-radius: 6px; border: 1px solid #ffeeba; margin-bottom: 15px;">
// //                         <label style="font-weight: bold; color: #d35400;">📅 2. Chọn khoảng thời gian bài kiểm tra:</label>
// //                         <div style="display: flex; gap: 10px; margin-top: 8px;">
// //                             <div style="flex: 1;">
// //                                 <div style="font-size:12px; font-weight:bold; color:#666;">Từ ngày:</div>
// //                                 <input type="date" id="xuat_diem_tu_ngay" value="${firstDay}" style="width: 100%; padding: 6px; border-radius: 4px; border: 1px solid #ccc; box-sizing:border-box;">
// //                             </div>
// //                             <div style="flex: 1;">
// //                                 <div style="font-size:12px; font-weight:bold; color:#666;">Đến ngày:</div>
// //                                 <input type="date" id="xuat_diem_den_ngay" value="${today}" style="width: 100%; padding: 6px; border-radius: 4px; border: 1px solid #ccc; box-sizing:border-box;">
// //                             </div>
// //                         </div>
// //                     </div>

// //                     <button onclick="ham_23_2_quet_nhiem_vu_de_xuat_excel()" style="width: 100%; padding: 12px; background: #17a2b8; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.2); transition:0.2s;" onmouseover="this.style.background='#138496'" onmouseout="this.style.background='#17a2b8'">
// //                         🔍 3. TÌM BÀI TRẮC NGHIỆM, TỰ LUẬN & ĐIỂM NHẬP TAY
// //                     </button>
                    
// //                     <div id="xuat_diem_khu_vuc_nhiem_vu" style="margin-top: 15px; max-height: 250px; overflow-y: auto; border: 1px solid #ced4da; padding: 12px; border-radius: 6px; display: none; background: #f8f9fa;">
// //                     </div>
// //                 </div>
// //             `,
// //             showConfirmButton: true,
// //             confirmButtonText: '📥 XUẤT RA EXCEL',
// //             confirmButtonColor: '#28a745',
// //             showCancelButton: true,
// //             cancelButtonText: 'Đóng',
// //             width: '550px',
// //             preConfirm: () => {
// //                 return ham_23_3_thuc_thi_xuat_excel();
// //             }
// //         });
// //     } catch (err) {
// //         Swal.fire('Lỗi', 'Không tải được danh sách lớp: ' + err.message, 'error');
// //     }
// // };

// // // =====================================================================
// // // HÀM 23.2: QUÉT DANH SÁCH BÀI TỪ KHỐI ONINE VÀ KHỐI 20 (NHẬT KÝ)
// // // =====================================================================
// // window.ham_23_2_quet_nhiem_vu_de_xuat_excel = async function () {
// //     const maLop = document.getElementById('xuat_diem_ma_lop').value;
// //     const tuNgayRaw = document.getElementById('xuat_diem_tu_ngay').value;
// //     const denNgayRaw = document.getElementById('xuat_diem_den_ngay').value;
// //     const khuVuc = document.getElementById('xuat_diem_khu_vuc_nhiem_vu');

// //     if (!maLop) return alert('⚠️ Thầy/Cô vui lòng chọn một lớp học ở Bước 1!');
// //     if (!tuNgayRaw || !denNgayRaw) return alert('⚠️ Vui lòng nhập đầy đủ ngày tháng!');

// //     const tuNgay = tuNgayRaw + 'T00:00:00.000Z';
// //     const denNgay = denNgayRaw + 'T23:59:59.999Z';

// //     khuVuc.style.display = 'block';
// //     khuVuc.innerHTML = '<div style="text-align:center; color:#17a2b8; font-weight:bold; padding:20px;">⏳ Đang liên thông dữ liệu các hệ thống...</div>';

// //     try {
// //         // 1. Quét bài Online
// //         const { data: dsTN } = await _supabase.from('nhiem_vu_trac_nghiem').select('ma_nhiem_vu, ten_nhiem_vu, danh_sach_lop').gte('ngay_tao', tuNgay).lte('ngay_tao', denNgay);
// //         const { data: dsTL } = await _supabase.from('nhiem_vu_tu_luan').select('ma_nhiem_vu, ten_nhiem_vu, danh_sach_lop').gte('ngay_tao', tuNgay).lte('ngay_tao', denNgay);

// //         let dsHienThi = [];
// //         const locBaiTheoLop = (danhSachBanDau, loaiBai) => {
// //             (danhSachBanDau || []).forEach(nv => {
// //                 let arrLop = [];
// //                 try { arrLop = typeof nv.danh_sach_lop === 'string' ? JSON.parse(nv.danh_sach_lop) : (nv.danh_sach_lop || []); } catch (e) { }
// //                 if (arrLop.includes(maLop)) dsHienThi.push({ ...nv, loai: loaiBai });
// //             });
// //         };
// //         locBaiTheoLop(dsTN, 'TN');
// //         locBaiTheoLop(dsTL, 'TL');

// //         // 2. Quét bài Nhập Tay Lớp (Từ Khối 20)
// //         const { data: dsNK } = await _supabase.from('nhat_ky_day_hoc').select('id').eq('ma_lop', maLop).gte('ngay_day', tuNgayRaw).lte('ngay_day', denNgayRaw);
// //         if (dsNK && dsNK.length > 0) {
// //             const nkIds = dsNK.map(nk => nk.id);
// //             const { data: dsSK } = await _supabase.from('nhat_ky_su_kien_hs').select('ghi_chu, thong_tin_mo_rong').in('id_nhat_ky', nkIds).ilike('loai_the', 'Cho điểm%');

// //             let cacBaiKT = new Set();
// //             (dsSK || []).forEach(sk => {
// //                 if (sk.thong_tin_mo_rong && sk.thong_tin_mo_rong.phan_loai === 'diem_ca_lop') {
// //                     let tenBai = sk.ghi_chu.split(' - Ghi chú:')[0];
// //                     cacBaiKT.add(tenBai);
// //                 }
// //             });
// //             cacBaiKT.forEach(baiKT => {
// //                 dsHienThi.push({ ma_nhiem_vu: baiKT, ten_nhiem_vu: baiKT, danh_sach_lop: [maLop], loai: 'KT_LOP' });
// //             });
// //         }

// //         if (dsHienThi.length === 0) {
// //             khuVuc.innerHTML = '<div style="color:#dc3545; font-weight:bold; text-align:center; padding:15px;">❌ Không tìm thấy nhiệm vụ nào được giao cho lớp này!</div>';
// //             return;
// //         }

// //         window.DataXuatDiem_NhiemVu = dsHienThi;
// //         window.DataXuatDiem_MaLop = maLop;

// //         let htmlCheckbox = `
// //             <div style="font-weight:bold; color:#0056b3; margin-bottom:12px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #ccc; padding-bottom:8px;">
// //                 <span>📌 Tìm thấy ${dsHienThi.length} bài kiểm tra:</span>
// //                 <div style="display:flex; gap:5px;">
// //                     <button onclick="document.querySelectorAll('.chk-xuat-diem').forEach(c => c.checked=true)" style="background:#28a745; color:white; border:none; border-radius:4px; font-size:11px; padding:4px 8px; cursor:pointer;">Tick Hết</button>
// //                     <button onclick="document.querySelectorAll('.chk-xuat-diem').forEach(c => c.checked=false)" style="background:#6c757d; color:white; border:none; border-radius:4px; font-size:11px; padding:4px 8px; cursor:pointer;">Bỏ Tick</button>
// //                 </div>
// //             </div>
// //         `;

// //         dsHienThi.forEach(nv => {
// //             let badge = '';
// //             if (nv.loai === 'TN') badge = '<span style="background:#17a2b8; color:white; padding:2px 6px; border-radius:4px; font-size:10px;">Trắc nghiệm</span>';
// //             else if (nv.loai === 'TL') badge = '<span style="background:#6f42c1; color:white; padding:2px 6px; border-radius:4px; font-size:10px;">Tự luận</span>';
// //             else badge = '<span style="background:#e83e8c; color:white; padding:2px 6px; border-radius:4px; font-size:10px;">Nhập tay (Lớp)</span>';

// //             htmlCheckbox += `
// //                 <label style="display: flex; align-items: flex-start; gap: 10px; margin-bottom: 8px; cursor: pointer; background: #fff; padding: 10px; border: 1px solid #dee2e6; border-radius: 6px; transition:0.2s;" onmouseover="this.style.background='#f1f8ff'" onmouseout="this.style.background='#fff'">
// //                     <input type="checkbox" class="chk-xuat-diem" value="${nv.ma_nhiem_vu}" data-loai="${nv.loai}" checked style="margin-top: 2px; transform: scale(1.3);">
// //                     <div style="flex:1;">
// //                         <div style="font-weight:bold; font-size:14px; color:#333; line-height:1.4;">${nv.ten_nhiem_vu}</div>
// //                         <div style="margin-top:6px; display:flex; align-items:center; gap:8px;">${badge} <span style="font-size:11px; color:#888;">Mã: ${nv.ma_nhiem_vu}</span></div>
// //                     </div>
// //                 </label>
// //             `;
// //         });
// //         khuVuc.innerHTML = htmlCheckbox;

// //     } catch (error) {
// //         khuVuc.innerHTML = `<div style="color:red; text-align:center; padding:15px;">Lỗi quét dữ liệu: ${error.message}</div>`;
// //     }
// // };

// // // =====================================================================
// // // HÀM 23.3: LẤY ĐIỂM SỐ VÀ HIỂN THỊ BẢNG PREVIEW
// // // =====================================================================
// // window.ham_23_3_thuc_thi_xuat_excel = async function () {
// //     const checkboxes = document.querySelectorAll('.chk-xuat-diem:checked');
// //     if (checkboxes.length === 0) { Swal.showValidationMessage('⚠️ Vui lòng chọn ít nhất 1 nhiệm vụ!'); return false; }

// //     const maLop = window.DataXuatDiem_MaLop;
// //     let dsNhiemVuChon = [];
// //     checkboxes.forEach(chk => {
// //         const nvGoc = window.DataXuatDiem_NhiemVu.find(n => n.ma_nhiem_vu === chk.value);
// //         dsNhiemVuChon.push({ ma_nhiem_vu: chk.value, loai: chk.getAttribute('data-loai'), ten: nvGoc.ten_nhiem_vu });
// //     });

// //     Swal.fire({ title: '⏳ Đang tổng hợp kết quả...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

// //     try {
// //         const { data: dsHS } = await _supabase.from('hoc_sinh').select('uid, ten, sdt, danh_sach_ma_lop');
// //         let dsHocSinhLop = (dsHS || []).filter(hs => {
// //             let arrLop = [];
// //             try { arrLop = typeof hs.danh_sach_ma_lop === 'string' ? JSON.parse(hs.danh_sach_ma_lop) : (hs.danh_sach_ma_lop || []); } catch (e) { }
// //             return arrLop.includes(maLop);
// //         });

// //         const maNhiemVuTN = dsNhiemVuChon.filter(n => n.loai === 'TN').map(n => n.ma_nhiem_vu);
// //         const maNhiemVuTL = dsNhiemVuChon.filter(n => n.loai === 'TL').map(n => n.ma_nhiem_vu);
// //         const maNhiemVuKT = dsNhiemVuChon.filter(n => n.loai === 'KT_LOP').map(n => n.ma_nhiem_vu);

// //         let mapDiem = {};

// //         if (maNhiemVuTN.length > 0) {
// //             const { data: kqTN } = await _supabase.from('ket_qua_trac_nghiem').select('id, uid_hoc_sinh, ma_nhiem_vu, tong_diem, trang_thai_cham').in('ma_nhiem_vu', maNhiemVuTN);
// //             if (kqTN) kqTN.forEach(kq => {
// //                 if (!mapDiem[kq.uid_hoc_sinh]) mapDiem[kq.uid_hoc_sinh] = {};
// //                 mapDiem[kq.uid_hoc_sinh][kq.ma_nhiem_vu] = { id: kq.id, diem: kq.tong_diem, trang_thai_cham: kq.trang_thai_cham };
// //             });
// //         }

// //         if (maNhiemVuTL.length > 0) {
// //             const { data: kqTL } = await _supabase.from('ket_qua_tu_luan').select('id, uid_hoc_sinh, ma_nhiem_vu, tong_diem, trang_thai_cham').in('ma_nhiem_vu', maNhiemVuTL);
// //             if (kqTL) kqTL.forEach(kq => {
// //                 if (!mapDiem[kq.uid_hoc_sinh]) mapDiem[kq.uid_hoc_sinh] = {};
// //                 mapDiem[kq.uid_hoc_sinh][kq.ma_nhiem_vu] = { id: kq.id, diem: kq.tong_diem, trang_thai_cham: kq.trang_thai_cham };
// //             });
// //         }

// //         if (maNhiemVuKT.length > 0) {
// //             const hsUids = dsHocSinhLop.map(h => h.uid);
// //             const { data: kqKT } = await _supabase.from('nhat_ky_su_kien_hs').select('uid_hoc_sinh, ghi_chu, thong_tin_mo_rong').in('uid_hoc_sinh', hsUids).ilike('loai_the', 'Cho điểm%');
// //             if (kqKT) {
// //                 kqKT.forEach(kq => {
// //                     if (kq.thong_tin_mo_rong && kq.thong_tin_mo_rong.phan_loai === 'diem_ca_lop') {
// //                         let tenBai = kq.ghi_chu.split(' - Ghi chú:')[0];
// //                         if (maNhiemVuKT.includes(tenBai)) {
// //                             if (!mapDiem[kq.uid_hoc_sinh]) mapDiem[kq.uid_hoc_sinh] = {};
// //                             mapDiem[kq.uid_hoc_sinh][tenBai] = { diem: kq.thong_tin_mo_rong.diem_so, trang_thai_cham: 1 };
// //                         }
// //                     }
// //                 });
// //             }
// //         }

// //         window.DataXuatDiem_RawStudents = dsHocSinhLop;
// //         window.DataXuatDiem_MapDiem = mapDiem;
// //         window.DataXuatDiem_DsNhiemVu = dsNhiemVuChon;
// //         window.DataXuatDiem_SortCol = 'ten';
// //         window.DataXuatDiem_SortAsc = true;

// //         Swal.fire({
// //             title: `👀 BẢNG ĐIỂM: LỚP ${maLop}`,
// //             html: `<div id="vung-chua-bang-preview-diem">${ham_23_6_tao_html_bang_preview()}</div>`,
// //             width: '90vw',
// //             showCancelButton: true,
// //             cancelButtonText: 'Đóng lại',
// //             confirmButtonText: '📥 XÁC NHẬN XUẤT EXCEL (.xlsx)',
// //             confirmButtonColor: '#28a745',
// //             cancelButtonColor: '#6c757d',
// //             allowOutsideClick: false,
// //         }).then((result) => {
// //             if (result.isConfirmed) {
// //                 ham_23_4_tao_file_xlsx_that(maLop);
// //             }
// //         });
// //         return true;

// //     } catch (error) {
// //         Swal.fire('Lỗi xuất file', error.message, 'error');
// //         return false;
// //     }
// // };

// // // =====================================================================
// // // HÀM 23.6: TẠO MÃ HTML BẢNG PREVIEW (CÓ ĐỦ 23.6 NHÉ THẦY)
// // // =====================================================================
// // window.ham_23_6_tao_html_bang_preview = function () {
// //     let dsHocSinhLop = [...window.DataXuatDiem_RawStudents];
// //     let mapDiem = window.DataXuatDiem_MapDiem;
// //     let dsNhiemVuChon = window.DataXuatDiem_DsNhiemVu;
// //     let sortCol = window.DataXuatDiem_SortCol;
// //     let sortAsc = window.DataXuatDiem_SortAsc;

// //     // Sắp xếp
// //     if (sortCol !== null) {
// //         dsHocSinhLop.sort((a, b) => {
// //             if (sortCol === 'ten') {
// //                 let tenA = (a.ten || "").trim().split(" ").pop().toLowerCase();
// //                 let tenB = (b.ten || "").trim().split(" ").pop().toLowerCase();
// //                 let cmp = tenA.localeCompare(tenB, 'vi');
// //                 if (cmp === 0) cmp = (a.ten || "").localeCompare(b.ten || "", 'vi');
// //                 return sortAsc ? cmp : -cmp;
// //             }

// //             let valA, valB;
// //             if (sortCol === 'stt') { return 0; }
// //             else if (sortCol === 'sdt') { valA = (a.sdt || "").toString(); valB = (b.sdt || "").toString(); }
// //             else if (sortCol === 'dtb') {
// //                 valA = ham_tinh_dtb_hs(a.uid, dsNhiemVuChon, mapDiem);
// //                 valB = ham_tinh_dtb_hs(b.uid, dsNhiemVuChon, mapDiem);
// //             } else {
// //                 let kqA = mapDiem[a.uid] ? mapDiem[a.uid][sortCol] : null;
// //                 let kqB = mapDiem[b.uid] ? mapDiem[b.uid][sortCol] : null;

// //                 const getScoreWeight = (kq) => {
// //                     if (!kq) return -2; // Chưa nộp
// //                     if (kq.diem === null || kq.diem === undefined || (kq.trang_thai_cham !== 1 && kq.trang_thai_cham !== undefined)) return -1; // Chưa chấm
// //                     let d = parseFloat(kq.diem);
// //                     return isNaN(d) ? -1 : d;
// //                 };

// //                 valA = getScoreWeight(kqA); valB = getScoreWeight(kqB);
// //             }

// //             if (valA < valB) return sortAsc ? -1 : 1;
// //             if (valA > valB) return sortAsc ? 1 : -1;
// //             return 0;
// //         });
// //     }

// //     const getArrow = (colName) => {
// //         if (sortCol !== colName) return '<span style="color:rgba(255,255,255,0.4); font-size:10px; margin-left:4px;">▲▼</span>';
// //         return sortAsc ? '<span style="color:#ffc107; font-size:11px; margin-left:4px;">▲</span>' : '<span style="color:#ffc107; font-size:11px; margin-left:4px;">▼</span>';
// //     };

// //     let htmlTable = `
// //         <div style="max-height: 450px; overflow-y: auto; overflow-x: auto; border: 1px solid #ced4da; border-radius: 6px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); background:#fff;">
// //             <table style="width: 100%; border-collapse: collapse; min-width: ${500 + dsNhiemVuChon.length * 120}px; font-size: 13px;">
// //                 <thead style="position: sticky; top: 0; z-index: 2;">
// //                     <tr style="background-color: #0070C0; color: white;">
// //                         <th onclick="ham_23_7_thuc_hien_sort('stt')" style="padding: 10px; border: 1px solid #dee2e6; width: 40px; text-align: center; white-space: nowrap; cursor:pointer;">STT ${getArrow('stt')}</th>
// //                         <th onclick="ham_23_7_thuc_hien_sort('ten')" style="padding: 10px; border: 1px solid #dee2e6; width: 180px; text-align: left; white-space: nowrap; cursor:pointer;">Họ và Tên Học Sinh ${getArrow('ten')}</th>
// //                         <th onclick="ham_23_7_thuc_hien_sort('sdt')" style="padding: 10px; border: 1px solid #dee2e6; width: 120px; text-align: center; white-space: nowrap; cursor:pointer;">Tên ĐN ${getArrow('sdt')}</th>
// //     `;

// //     dsNhiemVuChon.forEach(nv => {
// //         let bgColor = '#28a745';
// //         if (nv.loai === 'TL') bgColor = '#6f42c1';
// //         if (nv.loai === 'KT_LOP') bgColor = '#e83e8c'; // Màu cột nhập tay
// //         htmlTable += `<th onclick="ham_23_7_thuc_hien_sort('${nv.ma_nhiem_vu}')" style="padding: 10px; border: 1px solid #dee2e6; background-color: ${bgColor}; min-width: 120px; text-align: center; cursor:pointer;" title="Bấm để sắp xếp theo cột này">${nv.ten} ${getArrow(nv.ma_nhiem_vu)}</th>`;
// //     });
// //     htmlTable += `<th onclick="ham_23_7_thuc_hien_sort('dtb')" style="padding: 10px; border: 1px solid #dee2e6; background-color: #dc3545; min-width: 80px; text-align: center; cursor:pointer;">ĐTB ${getArrow('dtb')}</th></tr></thead><tbody>`;

// //     dsHocSinhLop.forEach((hs, index) => {
// //         let tenHSafe = hs.ten.replace(/'/g, "\\'");
// //         htmlTable += `
// //             <tr style="border-bottom: 1px solid #eee;" onmouseover="this.style.background='#f1f8ff'" onmouseout="this.style.background='#fff'">
// //                 <td style="padding: 8px; text-align: center; font-weight: bold; color: #555; border: 1px solid #dee2e6;">${index + 1}</td>
// //                 <td style="padding: 8px; font-weight: bold; color: #333; border: 1px solid #dee2e6;">${hs.ten}</td>
// //                 <td style="padding: 8px; text-align: center; color: #17a2b8; border: 1px solid #dee2e6;">${hs.sdt || ''}</td>
// //         `;

// //         let tongDiemHS = 0; let soCotCoDiem = 0;

// //         dsNhiemVuChon.forEach(nv => {
// //             let cellHtml = '';
// //             let kq = mapDiem[hs.uid] ? mapDiem[hs.uid][nv.ma_nhiem_vu] : null;

// //             if (!kq) {
// //                 if (nv.loai === 'KT_LOP') {
// //                     cellHtml = `<span style="color: #dc3545; font-size: 11px; font-weight: bold; background: #ffe3e6; padding: 4px 10px; border-radius: 4px; display: inline-block; border: 1px solid #f5c6cb;">0</span>`;
// //                 } else {
// //                     cellHtml = `<span onclick="ham_23_5_nhap_diem_nhanh_tu_preview('${hs.uid}', '${tenHSafe}', '${nv.ma_nhiem_vu}', '${nv.loai}', null, '')" title="Bấm để nhập điểm" style="color: #dc3545; font-size: 11px; font-weight: bold; background: #ffe3e6; padding: 4px 10px; border-radius: 4px; cursor: pointer; display: inline-block; border: 1px solid #f5c6cb; transition: 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">Chưa nộp ✏️</span>`;
// //                 }
// //             } else {
// //                 let idKqStr = kq.id ? `'${kq.id}'` : 'null';

// //                 if (nv.loai === 'TL') {
// //                     if (kq.trang_thai_cham === 1) {
// //                         let d = parseFloat(kq.diem);
// //                         if (!isNaN(d)) {
// //                             cellHtml = `<b onclick="ham_23_5_nhap_diem_nhanh_tu_preview('${hs.uid}', '${tenHSafe}', '${nv.ma_nhiem_vu}', '${nv.loai}', ${idKqStr}, ${d})" title="Bấm để sửa điểm" style="color: #28a745; font-size: 15px; cursor: pointer;">${d} ✏️</b>`;
// //                             tongDiemHS += d; soCotCoDiem++;
// //                         } else { cellHtml = `<span style="color: #17a2b8; font-size: 11px; font-weight: bold;">Đã chấm (Chữ)</span>`; }
// //                     } else { cellHtml = `<span style="color: #0c5460; font-size: 11px; font-weight: bold; background: #d1ecf1; padding: 4px 10px; border-radius: 4px; display: inline-block; border: 1px solid #bee5eb;">Chưa chấm</span>`; }
// //                 } else if (nv.loai === 'KT_LOP') {
// //                     let d = parseFloat(kq.diem);
// //                     if (!isNaN(d)) {
// //                         cellHtml = `<b style="color: #28a745; font-size: 15px;">${d}</b>`;
// //                         tongDiemHS += d; soCotCoDiem++;
// //                     } else {
// //                         cellHtml = `<b style="color: #28a745; font-size: 15px;">0</b>`;
// //                         tongDiemHS += 0; soCotCoDiem++;
// //                     }
// //                 } else {
// //                     let d = parseFloat(kq.diem);
// //                     if (!isNaN(d)) {
// //                         cellHtml = `<b onclick="ham_23_5_nhap_diem_nhanh_tu_preview('${hs.uid}', '${tenHSafe}', '${nv.ma_nhiem_vu}', '${nv.loai}', ${idKqStr}, ${d})" title="Bấm để sửa điểm" style="color: #28a745; font-size: 15px; cursor: pointer;">${d} ✏️</b>`;
// //                         tongDiemHS += d; soCotCoDiem++;
// //                     } else {
// //                         cellHtml = `<b onclick="ham_23_5_nhap_diem_nhanh_tu_preview('${hs.uid}', '${tenHSafe}', '${nv.ma_nhiem_vu}', '${nv.loai}', ${idKqStr}, 0)" title="Bấm để sửa" style="color: #28a745; font-size: 15px; cursor: pointer;">0 ✏️</b>`;
// //                         tongDiemHS += 0; soCotCoDiem++;
// //                     }
// //                 }
// //             }
// //             htmlTable += `<td style="padding: 8px; text-align: center; border: 1px solid #dee2e6;">${cellHtml}</td>`;
// //         });

// //         let dtb = soCotCoDiem > 0 ? parseFloat((tongDiemHS / soCotCoDiem).toFixed(2)) : null;
// //         htmlTable += `<td style="padding: 8px; text-align: center; font-weight: bold; color: #dc3545; border: 1px solid #dee2e6; background:#fff5f5;">${dtb !== null ? dtb : '-'}</td></tr>`;
// //     });

// //     htmlTable += `</tbody></table></div>`;
// //     return htmlTable;
// // };

// // // =====================================================================
// // // HÀM HỖ TRỢ: TÍNH ĐTB 
// // // =====================================================================
// // window.ham_tinh_dtb_hs = function (uid, dsNhiemVuChon, mapDiem) {
// //     let tongDiemHS = 0; let soCotCoDiem = 0;
// //     dsNhiemVuChon.forEach(nv => {
// //         let kq = mapDiem[uid] ? mapDiem[uid][nv.ma_nhiem_vu] : null;
// //         if (!kq && nv.loai === 'KT_LOP') {
// //             tongDiemHS += 0; soCotCoDiem++; // Nhập tay lớp mặc định là 0
// //         } else if (kq && kq.diem !== null && !isNaN(parseFloat(kq.diem))) {
// //             tongDiemHS += parseFloat(kq.diem); soCotCoDiem++;
// //         }
// //     });
// //     return soCotCoDiem > 0 ? (tongDiemHS / soCotCoDiem) : -1;
// // };

// // // =====================================================================
// // // HÀM 23.7 (CÓ ĐỦ NHÉ THẦY): CẬP NHẬT RIÊNG KHUNG HTML KHI BẤM SORT
// // // =====================================================================
// // window.ham_23_7_thuc_hien_sort = function (colName) {
// //     if (window.DataXuatDiem_SortCol === colName) {
// //         window.DataXuatDiem_SortAsc = !window.DataXuatDiem_SortAsc;
// //     } else {
// //         window.DataXuatDiem_SortCol = colName;
// //         window.DataXuatDiem_SortAsc = true;
// //     }
// //     const vungChuaBang = document.getElementById('vung-chua-bang-preview-diem');
// //     if (vungChuaBang) vungChuaBang.innerHTML = ham_23_6_tao_html_bang_preview();
// // };

// // // =====================================================================
// // // HÀM 23.5 (CÓ ĐỦ LUÔN): HỖ TRỢ BẬT POPUP SỬA ĐIỂM BÀI TN/TL TỪ PREVIEW
// // // =====================================================================
// // window.ham_23_5_nhap_diem_nhanh_tu_preview = function (uidHocSinh, tenHocSinh, maNhiemVu, loaiNhiemVu, idKetQua, diemCu) {
// //     if (loaiNhiemVu === 'KT_LOP') return; // Không sửa điểm Nhật ký từ đây
// //     Swal.fire({
// //         title: '📝 SỬA ĐIỂM NHANH',
// //         html: `Học sinh: <b style="color:#0056b3;">${tenHocSinh}</b><br><br>Nhập điểm số đạt được:`,
// //         input: 'number',
// //         inputValue: diemCu !== undefined && diemCu !== null ? diemCu : '',
// //         inputAttributes: { step: 0.1, min: 0, max: 100 },
// //         showCancelButton: true,
// //         confirmButtonText: '💾 Lưu điểm',
// //         cancelButtonText: 'Hủy',
// //         confirmButtonColor: '#28a745',
// //         showLoaderOnConfirm: true,
// //         preConfirm: async (diemMoi) => {
// //             if (diemMoi === '') return Swal.showValidationMessage('Vui lòng nhập điểm!');
// //             const diemSo = parseFloat(diemMoi);
// //             try {
// //                 let tableName = (loaiNhiemVu === 'TL') ? 'ket_qua_tu_luan' : 'ket_qua_trac_nghiem';
// //                 if (idKetQua && idKetQua !== 'null') {
// //                     let payload = { tong_diem: diemSo, trang_thai_cham: 1 };
// //                     if (loaiNhiemVu === 'TN') payload.thoi_gian_lam_bai = 'Nhập tay (Giấy)';
// //                     const { error } = await _supabase.from(tableName).update(payload).eq('id', idKetQua);
// //                     if (error) throw error;
// //                 } else {
// //                     let payload = { uid_hoc_sinh: uidHocSinh, ma_nhiem_vu: maNhiemVu, tong_diem: diemSo, trang_thai_cham: 1, thoi_gian_nop: new Date().toISOString() };
// //                     if (loaiNhiemVu === 'TN') {
// //                         payload.lan_thu = 1; payload.trang_thai_lam_bai = 'da_nop'; payload.thoi_gian_lam_bai = 'Nhập tay (Giấy)'; payload.chi_tiet_lam_bai = [];
// //                     } else {
// //                         payload.chi_tiet_lam_bai = { luot_nop: 1, ghi_chu: "Nhập điểm từ bảng tổng hợp" };
// //                     }
// //                     const { error } = await _supabase.from(tableName).insert([payload]);
// //                     if (error) throw error;
// //                 }
// //                 return true;
// //             } catch (e) { Swal.showValidationMessage('Lỗi hệ thống: ' + e.message); }
// //         }
// //     }).then((result) => {
// //         if (result.isConfirmed) {
// //             Swal.fire({ title: 'Thành công', icon: 'success', timer: 1000, showConfirmButton: false }).then(async () => {
// //                 // Tải lại ngầm để cập nhật UI
// //                 ham_23_3_thuc_thi_xuat_excel();
// //             });
// //         }
// //     });
// // };

// // // =====================================================================
// // // HÀM 23.4: XUẤT RA FILE EXCEL CÓ MÀU SẮC ĐẸP BẰNG XLSX-JS-STYLE
// // // =====================================================================
// // window.ham_23_4_tao_file_xlsx_that = async function (maLop) {
// //     Swal.fire({ title: 'Đang kết xuất Excel siêu đẹp...', didOpen: () => Swal.showLoading() });

// //     try {
// //         if (typeof XLSX === 'undefined' || !XLSX.utils.book_new().Workbook) {
// //             await new Promise((resolve, reject) => {
// //                 let script = document.createElement('script');
// //                 script.src = "https://cdn.jsdelivr.net/npm/xlsx-js-style@1.2.0/dist/xlsx.bundle.js";
// //                 script.onload = resolve;
// //                 script.onerror = () => reject(new Error("Lỗi tải thư viện định dạng Excel"));
// //                 document.head.appendChild(script);
// //             });
// //         }

// //         let dsHocSinhLop = [...(window.DataXuatDiem_RawStudents || [])];
// //         const mapDiem = window.DataXuatDiem_MapDiem;
// //         const dsNhiemVuChon = window.DataXuatDiem_DsNhiemVu;

// //         if (dsHocSinhLop.length === 0 || !dsNhiemVuChon) throw new Error("Mất dữ liệu trong quá trình xử lý!");

// //         const getTenCuoi = (fName) => fName ? fName.trim().split(" ").pop().toLowerCase() : "";
// //         dsHocSinhLop.sort((a, b) => {
// //             let tenA = getTenCuoi(a.ten), tenB = getTenCuoi(b.ten);
// //             if (tenA === tenB) return (a.ten || "").localeCompare(b.ten || "", 'vi');
// //             return tenA.localeCompare(tenB, 'vi');
// //         });

// //         let dataForExcel = [];
// //         let headerRow = ['STT', 'Họ và Tên Học Sinh', 'Tên Đăng Nhập'];
// //         dsNhiemVuChon.forEach(nv => headerRow.push(nv.ten));
// //         headerRow.push('ĐTB');
// //         dataForExcel.push(headerRow);

// //         dsHocSinhLop.forEach((hs, index) => {
// //             let rowData = [index + 1, hs.ten, hs.sdt || ''];
// //             let tongDiemHS = 0; let soCotCoDiem = 0;

// //             dsNhiemVuChon.forEach(nv => {
// //                 let kq = mapDiem[hs.uid] ? mapDiem[hs.uid][nv.ma_nhiem_vu] : null;
// //                 if (!kq) {
// //                     rowData.push(nv.loai === 'KT_LOP' ? 0 : 'Chưa nộp');
// //                     if (nv.loai === 'KT_LOP') soCotCoDiem++;
// //                 } else {
// //                     if (nv.loai === 'TL' && kq.trang_thai_cham !== 1) {
// //                         rowData.push('Chưa chấm');
// //                     } else {
// //                         let d = parseFloat(kq.diem);
// //                         if (!isNaN(d)) { rowData.push(d); tongDiemHS += d; soCotCoDiem++; }
// //                         else { rowData.push('Đã chấm'); }
// //                     }
// //                 }
// //             });

// //             let dtb = soCotCoDiem > 0 ? parseFloat((tongDiemHS / soCotCoDiem).toFixed(2)) : '';
// //             rowData.push(dtb);
// //             dataForExcel.push(rowData);
// //         });

// //         const wb = XLSX.utils.book_new();
// //         const ws = XLSX.utils.aoa_to_sheet(dataForExcel);
// //         const range = XLSX.utils.decode_range(ws['!ref']);

// //         for (let R = 0; R <= range.e.r; ++R) {
// //             for (let C = 0; C <= range.e.c; ++C) {
// //                 let cellRef = XLSX.utils.encode_cell({ c: C, r: R });
// //                 if (!ws[cellRef]) continue;

// //                 let cell = ws[cellRef];
// //                 if (!cell.s) cell.s = {};

// //                 if (C === 2 && R > 0) cell.t = 's'; // SĐT thành text

// //                 cell.s.border = {
// //                     top: { style: "thin", color: { rgb: "CCCCCC" } },
// //                     bottom: { style: "thin", color: { rgb: "CCCCCC" } },
// //                     left: { style: "thin", color: { rgb: "CCCCCC" } },
// //                     right: { style: "thin", color: { rgb: "CCCCCC" } }
// //                 };
// //                 if (C === 0 || C >= 2) cell.s.alignment = { horizontal: "center", vertical: "center" };
// //                 else cell.s.alignment = { vertical: "center" };

// //                 if (R === 0) {
// //                     cell.s.font = { bold: true, color: { rgb: "FFFFFF" } };
// //                     if (C < 3) cell.s.fill = { fgColor: { rgb: "0070C0" } };
// //                     else if (C === range.e.c) cell.s.fill = { fgColor: { rgb: "DC3545" } };
// //                     else {
// //                         let nv = dsNhiemVuChon[C - 3];
// //                         if (nv.loai === 'TN') cell.s.fill = { fgColor: { rgb: "28A745" } };
// //                         else if (nv.loai === 'TL') cell.s.fill = { fgColor: { rgb: "6F42C1" } };
// //                         else cell.s.fill = { fgColor: { rgb: "E83E8C" } };
// //                     }
// //                 } else {
// //                     let val = cell.v;
// //                     if (C > 2 && C < range.e.c) {
// //                         if (val === 'Chưa nộp') {
// //                             cell.s.fill = { fgColor: { rgb: "FFE3E6" } };
// //                             cell.s.font = { color: { rgb: "DC3545" }, italic: true };
// //                         } else if (val === 'Chưa chấm') {
// //                             cell.s.fill = { fgColor: { rgb: "D1ECF1" } };
// //                             cell.s.font = { color: { rgb: "0C5460" }, italic: true };
// //                         } else if (typeof val === 'number') {
// //                             cell.s.font = { bold: true };
// //                             cell.s.font.color = val < 5 ? { rgb: "DC3545" } : { rgb: "155724" };
// //                         }
// //                     }
// //                     if (C === range.e.c && typeof val === 'number') {
// //                         cell.s.font = { bold: true, color: val < 5 ? { rgb: "DC3545" } : { rgb: "28A745" } };
// //                         cell.s.fill = { fgColor: { rgb: "FFF5F5" } };
// //                     }
// //                 }
// //             }
// //         }

// //         let wscols = [{ wch: 6 }, { wch: 30 }, { wch: 15 }];
// //         for (let i = 0; i < dsNhiemVuChon.length; i++) wscols.push({ wch: 18 });
// //         wscols.push({ wch: 12 });
// //         ws['!cols'] = wscols;

// //         XLSX.utils.book_append_sheet(wb, ws, "DiemTongHop");
// //         const fileName = `BangDiem_Lop_${maLop}_${new Date().toISOString().split('T')[0]}.xlsx`;
// //         XLSX.writeFile(wb, fileName);

// //         Swal.fire('Hoàn tất!', '✅ Bảng điểm đã được xuất ra với màu sắc đầy đủ.', 'success');

// //     } catch (e) {
// //         console.error("Lỗi xuất XLSX:", e);
// //         Swal.fire('Lỗi tạo file', e.message, 'error');
// //     }
// // };



// // ==============================================================================
// // KHỐI 23: XUẤT ĐIỂM TỔNG HỢP TẤT CẢ HỌC SINH CỦA 1 LỚP RA EXCEL (GIAO DIỆN CHÍNH)
// // ==============================================================================

// // =====================================================================
// // HÀM 23.1: VẼ GIAO DIỆN XUẤT ĐIỂM LÊN VÙNG LÀM VIỆC CHI TIẾT
// // =====================================================================
// window.ham_23_1_mo_giao_dien_xuat_diem_tong_hop = async function () {
//     const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
//     if (!vungLamViec) return;

//     vungLamViec.innerHTML = '<div style="padding:40px; text-align:center; font-weight:bold; color:#17a2b8;">⏳ Đang tải dữ liệu, vui lòng chờ...</div>';

//     try {
//         const { data: dsLop, error } = await _supabase.from('lop_hoc').select('*');
//         if (error) throw error;

//         let htmlLop = '<option value="">-- Vui lòng chọn lớp --</option>';
//         if (dsLop) {
//             dsLop.forEach(l => {
//                 htmlLop += `<option value="${l.ma_lop || l.id}">${l.ten_lop || l.ten}</option>`;
//             });
//         }

//         let dateObj = new Date();
//         let firstDay = new Date(dateObj.getFullYear(), dateObj.getMonth(), 1).toISOString().split('T')[0];
//         let today = dateObj.toISOString().split('T')[0];

//         vungLamViec.innerHTML = `
//             <div style="padding: 10px; animation: fadeIn 0.3s ease-in-out;">
                
//                 <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #17a2b8; padding-bottom: 10px; margin-bottom: 20px;">
//                     <h3 style="color: #17a2b8; margin: 0; text-transform: uppercase; display: flex; align-items: center; gap: 10px;">
//                         📥 XUẤT ĐIỂM TỔNG HỢP
//                     </h3>
//                     <button onclick="ham_3_1_ve_dashboard_admin()" style="padding: 6px 15px; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">⬅️ Quay lại</button>
//                 </div>

//                 <!-- BỘ LỌC TÌM KIẾM -->
//                 <div style="background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #ced4da; box-shadow: 0 2px 4px rgba(0,0,0,0.02); margin-bottom: 20px; display: flex; gap: 15px; align-items: flex-end; flex-wrap: wrap;">
//                     <div style="flex: 1.5; min-width: 200px;">
//                         <label style="font-weight: bold; color: #0056b3; font-size:13px; display:block; margin-bottom:5px;">🏫 1. Chọn Lớp cần xuất:</label>
//                         <select id="xuat_diem_ma_lop" style="width: 100%; padding: 10px; border-radius: 4px; border: 1px solid #0056b3; font-weight:bold; outline:none; color:#0056b3;">
//                             ${htmlLop}
//                         </select>
//                     </div>
//                     <div style="flex: 1; min-width: 150px;">
//                         <label style="font-weight: bold; color: #d35400; font-size:13px; display:block; margin-bottom:5px;">📅 2. Từ ngày:</label>
//                         <input type="date" id="xuat_diem_tu_ngay" value="${firstDay}" style="width: 100%; padding: 10px; border-radius: 4px; border: 1px solid #ccc; box-sizing:border-box; outline:none; font-weight:bold; color:#495057;">
//                     </div>
//                     <div style="flex: 1; min-width: 150px;">
//                         <label style="font-weight: bold; color: #d35400; font-size:13px; display:block; margin-bottom:5px;">📅 Đến ngày:</label>
//                         <input type="date" id="xuat_diem_den_ngay" value="${today}" style="width: 100%; padding: 10px; border-radius: 4px; border: 1px solid #ccc; box-sizing:border-box; outline:none; font-weight:bold; color:#495057;">
//                     </div>
//                     <div style="flex: 1.5; min-width: 250px;">
//                         <button onclick="ham_23_2_quet_nhiem_vu_de_xuat_excel()" style="width: 100%; padding: 10px; background: #17a2b8; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.2); transition:0.2s; font-size:14px;" onmouseover="this.style.background='#138496'" onmouseout="this.style.background='#17a2b8'">
//                             🔍 3. TÌM CÁC BÀI KIỂM TRA
//                         </button>
//                     </div>
//                 </div>

//                 <div style="display: flex; gap: 20px; flex-wrap: wrap;">
                    
//                     <!-- CỘT TRÁI: DANH SÁCH BÀI KIỂM TRA -->
//                     <div style="flex: 1; min-width: 350px; background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #dee2e6; box-shadow: 0 2px 4px rgba(0,0,0,0.05); display: flex; flex-direction: column;">
//                         <h4 style="margin: 0 0 15px 0; color: #d35400; border-bottom: 2px dashed #ffeeba; padding-bottom: 10px;">📌 4. Danh sách Cột điểm</h4>
//                         <div id="xuat_diem_khu_vuc_nhiem_vu" style="flex: 1; overflow-y: auto; padding-right: 5px;">
//                             <div style="text-align:center; color:#6c757d; font-style:italic; padding:40px;">Vui lòng Chọn lớp và Bấm tìm...</div>
//                         </div>
//                     </div>

//                     <!-- CỘT PHẢI: BẢNG PREVIEW ĐIỂM CHUẨN BỊ XUẤT -->
//                     <div style="flex: 2.5; min-width: 600px; display: flex; flex-direction: column; background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #dee2e6; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
//                         <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px dashed #d1ecf1; padding-bottom: 10px; margin-bottom: 15px;">
//                             <h4 style="margin: 0; color: #0056b3;">👀 5. Xem trước Bảng điểm</h4>
//                             <button id="btn_xuat_excel_chinh_thuc" onclick="window.ham_23_4_tao_file_xlsx_that(window.DataXuatDiem_MaLop)" style="display:none; padding: 10px 20px; background: #28a745; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.15); transition: 0.2s;" onmouseover="this.style.background='#218838'" onmouseout="this.style.background='#28a745'">
//                                 📥 XUẤT EXCEL TÔ MÀU TỰ ĐỘNG (.xlsx)
//                             </button>
//                         </div>
                        
//                         <div id="vung-chua-bang-preview-diem" style="flex: 1;">
//                             <div style="text-align:center; color:#6c757d; font-style:italic; padding:60px;">Bảng điểm sẽ hiển thị tại đây sau khi Thầy/Cô chọn các cột điểm ở Bước 4...</div>
//                         </div>
//                     </div>
//                 </div>

//             </div>
//         `;
//     } catch (err) {
//         Swal.fire('Lỗi', 'Không tải được giao diện: ' + err.message, 'error');
//     }
// };

// // =====================================================================
// // HÀM 23.2: QUÉT DANH SÁCH BÀI TỪ KHỐI ONINE VÀ KHỐI 20 (NHẬT KÝ)
// // =====================================================================
// window.ham_23_2_quet_nhiem_vu_de_xuat_excel = async function () {
//     const maLop = document.getElementById('xuat_diem_ma_lop').value;
//     const tuNgayRaw = document.getElementById('xuat_diem_tu_ngay').value;
//     const denNgayRaw = document.getElementById('xuat_diem_den_ngay').value;
//     const khuVuc = document.getElementById('xuat_diem_khu_vuc_nhiem_vu');

//     if (!maLop) return alert('⚠️ Thầy/Cô vui lòng chọn một lớp học ở Bước 1!');
//     if (!tuNgayRaw || !denNgayRaw) return alert('⚠️ Vui lòng nhập đầy đủ ngày tháng!');

//     const tuNgay = tuNgayRaw + 'T00:00:00.000Z';
//     const denNgay = denNgayRaw + 'T23:59:59.999Z';

//     khuVuc.innerHTML = '<div style="text-align:center; color:#17a2b8; font-weight:bold; padding:20px;">⏳ Đang liên thông dữ liệu các hệ thống...</div>';

//     try {
//         // 1. Quét bài Online
//         const { data: dsTN } = await _supabase.from('nhiem_vu_trac_nghiem').select('ma_nhiem_vu, ten_nhiem_vu, danh_sach_lop').gte('ngay_tao', tuNgay).lte('ngay_tao', denNgay);
//         const { data: dsTL } = await _supabase.from('nhiem_vu_tu_luan').select('ma_nhiem_vu, ten_nhiem_vu, danh_sach_lop').gte('ngay_tao', tuNgay).lte('ngay_tao', denNgay);

//         let dsHienThi = [];
//         const locBaiTheoLop = (danhSachBanDau, loaiBai) => {
//             (danhSachBanDau || []).forEach(nv => {
//                 let arrLop = [];
//                 try { arrLop = typeof nv.danh_sach_lop === 'string' ? JSON.parse(nv.danh_sach_lop) : (nv.danh_sach_lop || []); } catch (e) { }
//                 if (arrLop.includes(maLop)) dsHienThi.push({ ...nv, loai: loaiBai });
//             });
//         };
//         locBaiTheoLop(dsTN, 'TN');
//         locBaiTheoLop(dsTL, 'TL');

//         // 2. Quét bài Nhập Tay Lớp (Từ Khối 20)
//         const { data: dsNK } = await _supabase.from('nhat_ky_day_hoc').select('id').eq('ma_lop', maLop).gte('ngay_day', tuNgayRaw).lte('ngay_day', denNgayRaw);
//         if (dsNK && dsNK.length > 0) {
//             const nkIds = dsNK.map(nk => nk.id);
//             const { data: dsSK } = await _supabase.from('nhat_ky_su_kien_hs').select('ghi_chu, thong_tin_mo_rong').in('id_nhat_ky', nkIds).ilike('loai_the', 'Cho điểm%');

//             let cacBaiKT = new Set();
//             (dsSK || []).forEach(sk => {
//                 if (sk.thong_tin_mo_rong && sk.thong_tin_mo_rong.phan_loai === 'diem_ca_lop') {
//                     let tenBai = sk.ghi_chu.split(' - Ghi chú:')[0];
//                     cacBaiKT.add(tenBai);
//                 }
//             });
//             cacBaiKT.forEach(baiKT => {
//                 dsHienThi.push({ ma_nhiem_vu: baiKT, ten_nhiem_vu: baiKT, danh_sach_lop: [maLop], loai: 'KT_LOP' });
//             });
//         }

//         if (dsHienThi.length === 0) {
//             khuVuc.innerHTML = '<div style="color:#dc3545; font-weight:bold; text-align:center; padding:15px;">❌ Không tìm thấy nhiệm vụ nào được giao cho lớp này!</div>';
//             return;
//         }

//         window.DataXuatDiem_NhiemVu = dsHienThi;
//         window.DataXuatDiem_MaLop = maLop;

//         let htmlCheckbox = `
//             <div style="font-weight:bold; color:#0056b3; margin-bottom:12px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #ccc; padding-bottom:8px;">
//                 <span>Tìm thấy ${dsHienThi.length} cột điểm:</span>
//                 <div style="display:flex; gap:5px;">
//                     <button onclick="document.querySelectorAll('.chk-xuat-diem').forEach(c => c.checked=true)" style="background:#28a745; color:white; border:none; border-radius:4px; font-size:11px; padding:4px 8px; cursor:pointer;">Tick Hết</button>
//                     <button onclick="document.querySelectorAll('.chk-xuat-diem').forEach(c => c.checked=false)" style="background:#6c757d; color:white; border:none; border-radius:4px; font-size:11px; padding:4px 8px; cursor:pointer;">Bỏ Tick</button>
//                 </div>
//             </div>
//             <div style="max-height:350px; overflow-y:auto; padding-right:5px; margin-bottom:15px;">
//         `;

//         dsHienThi.forEach(nv => {
//             let badge = '';
//             if (nv.loai === 'TN') badge = '<span style="background:#17a2b8; color:white; padding:2px 6px; border-radius:4px; font-size:10px;">Trắc nghiệm</span>';
//             else if (nv.loai === 'TL') badge = '<span style="background:#6f42c1; color:white; padding:2px 6px; border-radius:4px; font-size:10px;">Tự luận</span>';
//             else badge = '<span style="background:#e83e8c; color:white; padding:2px 6px; border-radius:4px; font-size:10px;">Nhập tay (Lớp)</span>';

//             htmlCheckbox += `
//                 <label style="display: flex; align-items: flex-start; gap: 10px; margin-bottom: 8px; cursor: pointer; background: #fff; padding: 10px; border: 1px solid #dee2e6; border-radius: 6px; transition:0.2s;" onmouseover="this.style.background='#f1f8ff'" onmouseout="this.style.background='#fff'">
//                     <input type="checkbox" class="chk-xuat-diem" value="${nv.ma_nhiem_vu}" data-loai="${nv.loai}" checked style="margin-top: 2px; transform: scale(1.3);">
//                     <div style="flex:1;">
//                         <div style="font-weight:bold; font-size:14px; color:#333; line-height:1.4;">${nv.ten_nhiem_vu}</div>
//                         <div style="margin-top:6px; display:flex; align-items:center; gap:8px;">${badge}</div>
//                     </div>
//                 </label>
//             `;
//         });

//         htmlCheckbox += `</div>`;

//         htmlCheckbox += `
//             <button onclick="ham_23_3_thuc_thi_xuat_excel()" style="width: 100%; padding: 12px; background: #fd7e14; color: white; border: none; border-radius: 6px; font-weight: bold; font-size: 14px; cursor: pointer; box-shadow: 0 4px 6px rgba(0,0,0,0.15); transition: 0.2s;" onmouseover="this.style.background='#e86c00'" onmouseout="this.style.background='#fd7e14'">
//                 👀 TỔNG HỢP & XEM BẢNG ĐIỂM
//             </button>
//         `;

//         khuVuc.innerHTML = htmlCheckbox;

//     } catch (error) {
//         khuVuc.innerHTML = `<div style="color:red; text-align:center; padding:15px;">Lỗi quét dữ liệu: ${error.message}</div>`;
//     }
// };

// // =====================================================================
// // HÀM 23.3: LẤY ĐIỂM SỐ VÀ HIỂN THỊ TRỰC TIẾP LÊN BẢNG PREVIEW (KHÔNG POPUP)
// // =====================================================================
// window.ham_23_3_thuc_thi_xuat_excel = async function () {
//     const checkboxes = document.querySelectorAll('.chk-xuat-diem:checked');
//     if (checkboxes.length === 0) { Swal.fire('Cảnh báo', '⚠️ Vui lòng chọn ít nhất 1 bài kiểm tra ở cột bên trái!', 'warning'); return false; }

//     const maLop = window.DataXuatDiem_MaLop;
//     let dsNhiemVuChon = [];
//     checkboxes.forEach(chk => {
//         const nvGoc = window.DataXuatDiem_NhiemVu.find(n => n.ma_nhiem_vu === chk.value);
//         dsNhiemVuChon.push({ ma_nhiem_vu: chk.value, loai: chk.getAttribute('data-loai'), ten: nvGoc.ten_nhiem_vu });
//     });

//     const vungPreview = document.getElementById('vung-chua-bang-preview-diem');
//     vungPreview.innerHTML = '<div style="text-align:center; color:#28a745; font-weight:bold; padding:40px; font-size:16px;">⏳ Đang tính toán và kết xuất Bảng điểm...</div>';

//     try {
//         const { data: dsHS } = await _supabase.from('hoc_sinh').select('uid, ten, sdt, danh_sach_ma_lop');
//         let dsHocSinhLop = (dsHS || []).filter(hs => {
//             let arrLop = [];
//             try { arrLop = typeof hs.danh_sach_ma_lop === 'string' ? JSON.parse(hs.danh_sach_ma_lop) : (hs.danh_sach_ma_lop || []); } catch (e) { }
//             return arrLop.includes(maLop);
//         });

//         const maNhiemVuTN = dsNhiemVuChon.filter(n => n.loai === 'TN').map(n => n.ma_nhiem_vu);
//         const maNhiemVuTL = dsNhiemVuChon.filter(n => n.loai === 'TL').map(n => n.ma_nhiem_vu);
//         const maNhiemVuKT = dsNhiemVuChon.filter(n => n.loai === 'KT_LOP').map(n => n.ma_nhiem_vu);

//         let mapDiem = {};

//         if (maNhiemVuTN.length > 0) {
//             const { data: kqTN } = await _supabase.from('ket_qua_trac_nghiem').select('id, uid_hoc_sinh, ma_nhiem_vu, tong_diem, trang_thai_cham').in('ma_nhiem_vu', maNhiemVuTN);
//             if (kqTN) kqTN.forEach(kq => {
//                 if (!mapDiem[kq.uid_hoc_sinh]) mapDiem[kq.uid_hoc_sinh] = {};
//                 mapDiem[kq.uid_hoc_sinh][kq.ma_nhiem_vu] = { id: kq.id, diem: kq.tong_diem, trang_thai_cham: kq.trang_thai_cham };
//             });
//         }

//         if (maNhiemVuTL.length > 0) {
//             const { data: kqTL } = await _supabase.from('ket_qua_tu_luan').select('id, uid_hoc_sinh, ma_nhiem_vu, tong_diem, trang_thai_cham').in('ma_nhiem_vu', maNhiemVuTL);
//             if (kqTL) kqTL.forEach(kq => {
//                 if (!mapDiem[kq.uid_hoc_sinh]) mapDiem[kq.uid_hoc_sinh] = {};
//                 mapDiem[kq.uid_hoc_sinh][kq.ma_nhiem_vu] = { id: kq.id, diem: kq.tong_diem, trang_thai_cham: kq.trang_thai_cham };
//             });
//         }

//         if (maNhiemVuKT.length > 0) {
//             const hsUids = dsHocSinhLop.map(h => h.uid);
//             const { data: kqKT } = await _supabase.from('nhat_ky_su_kien_hs').select('uid_hoc_sinh, ghi_chu, thong_tin_mo_rong').in('uid_hoc_sinh', hsUids).ilike('loai_the', 'Cho điểm%');
//             if (kqKT) {
//                 kqKT.forEach(kq => {
//                     if (kq.thong_tin_mo_rong && kq.thong_tin_mo_rong.phan_loai === 'diem_ca_lop') {
//                         let tenBai = kq.ghi_chu.split(' - Ghi chú:')[0];
//                         if (maNhiemVuKT.includes(tenBai)) {
//                             if (!mapDiem[kq.uid_hoc_sinh]) mapDiem[kq.uid_hoc_sinh] = {};
//                             mapDiem[kq.uid_hoc_sinh][tenBai] = { diem: kq.thong_tin_mo_rong.diem_so, trang_thai_cham: 1 };
//                         }
//                     }
//                 });
//             }
//         }

//         window.DataXuatDiem_RawStudents = dsHocSinhLop;
//         window.DataXuatDiem_MapDiem = mapDiem;
//         window.DataXuatDiem_DsNhiemVu = dsNhiemVuChon;
//         window.DataXuatDiem_SortCol = 'ten';
//         window.DataXuatDiem_SortAsc = true;

//         // Cập nhật HTML bảng
//         vungPreview.innerHTML = ham_23_6_tao_html_bang_preview();

//         // Hiện nút Xuất Excel màu xanh lá
//         document.getElementById('btn_xuat_excel_chinh_thuc').style.display = 'block';

//     } catch (error) {
//         vungPreview.innerHTML = `<div style="color:red; text-align:center; padding:15px;">Lỗi tạo bảng: ${error.message}</div>`;
//     }
// };

// // =====================================================================
// // HÀM 23.6: TẠO MÃ HTML BẢNG PREVIEW
// // =====================================================================
// window.ham_23_6_tao_html_bang_preview = function () {
//     let dsHocSinhLop = [...window.DataXuatDiem_RawStudents];
//     let mapDiem = window.DataXuatDiem_MapDiem;
//     let dsNhiemVuChon = window.DataXuatDiem_DsNhiemVu;
//     let sortCol = window.DataXuatDiem_SortCol;
//     let sortAsc = window.DataXuatDiem_SortAsc;

//     // Sắp xếp
//     if (sortCol !== null) {
//         dsHocSinhLop.sort((a, b) => {
//             if (sortCol === 'ten') {
//                 let tenA = (a.ten || "").trim().split(" ").pop().toLowerCase();
//                 let tenB = (b.ten || "").trim().split(" ").pop().toLowerCase();
//                 let cmp = tenA.localeCompare(tenB, 'vi');
//                 if (cmp === 0) cmp = (a.ten || "").localeCompare(b.ten || "", 'vi');
//                 return sortAsc ? cmp : -cmp;
//             }

//             let valA, valB;
//             if (sortCol === 'stt') { return 0; }
//             else if (sortCol === 'sdt') { valA = (a.sdt || "").toString(); valB = (b.sdt || "").toString(); }
//             else if (sortCol === 'dtb') {
//                 valA = ham_tinh_dtb_hs(a.uid, dsNhiemVuChon, mapDiem);
//                 valB = ham_tinh_dtb_hs(b.uid, dsNhiemVuChon, mapDiem);
//             } else {
//                 let kqA = mapDiem[a.uid] ? mapDiem[a.uid][sortCol] : null;
//                 let kqB = mapDiem[b.uid] ? mapDiem[b.uid][sortCol] : null;

//                 const getScoreWeight = (kq) => {
//                     if (!kq) return -2; // Chưa nộp
//                     if (kq.diem === null || kq.diem === undefined || (kq.trang_thai_cham !== 1 && kq.trang_thai_cham !== undefined)) return -1; // Chưa chấm
//                     let d = parseFloat(kq.diem);
//                     return isNaN(d) ? -1 : d;
//                 };

//                 valA = getScoreWeight(kqA); valB = getScoreWeight(kqB);
//             }

//             if (valA < valB) return sortAsc ? -1 : 1;
//             if (valA > valB) return sortAsc ? 1 : -1;
//             return 0;
//         });
//     }

//     const getArrow = (colName) => {
//         if (sortCol !== colName) return '<span style="color:rgba(255,255,255,0.4); font-size:10px; margin-left:4px;">▲▼</span>';
//         return sortAsc ? '<span style="color:#ffc107; font-size:11px; margin-left:4px;">▲</span>' : '<span style="color:#ffc107; font-size:11px; margin-left:4px;">▼</span>';
//     };

//     let htmlTable = `
//         <div style="max-height: 500px; overflow-y: auto; overflow-x: auto; border: 1px solid #ced4da; border-radius: 6px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); background:#fff;">
//             <table style="width: 100%; border-collapse: collapse; min-width: ${400 + dsNhiemVuChon.length * 120}px; font-size: 13px;">
//                 <thead style="position: sticky; top: 0; z-index: 2;">
//                     <tr style="background-color: #0070C0; color: white;">
//                         <th onclick="ham_23_7_thuc_hien_sort('stt')" style="padding: 10px; border: 1px solid #dee2e6; width: 40px; text-align: center; white-space: nowrap; cursor:pointer;">STT ${getArrow('stt')}</th>
//                         <th onclick="ham_23_7_thuc_hien_sort('ten')" style="padding: 10px; border: 1px solid #dee2e6; width: 180px; text-align: left; white-space: nowrap; cursor:pointer;">Họ và Tên Học Sinh ${getArrow('ten')}</th>
//                         <th onclick="ham_23_7_thuc_hien_sort('sdt')" style="padding: 10px; border: 1px solid #dee2e6; width: 100px; text-align: center; white-space: nowrap; cursor:pointer;">Mã ĐN ${getArrow('sdt')}</th>
//     `;

//     dsNhiemVuChon.forEach(nv => {
//         let bgColor = '#28a745';
//         if (nv.loai === 'TL') bgColor = '#6f42c1';
//         if (nv.loai === 'KT_LOP') bgColor = '#e83e8c';
//         htmlTable += `<th onclick="ham_23_7_thuc_hien_sort('${nv.ma_nhiem_vu}')" style="padding: 10px; border: 1px solid #dee2e6; background-color: ${bgColor}; min-width: 120px; text-align: center; cursor:pointer;" title="Bấm để sắp xếp theo cột này">${nv.ten} ${getArrow(nv.ma_nhiem_vu)}</th>`;
//     });
//     htmlTable += `<th onclick="ham_23_7_thuc_hien_sort('dtb')" style="padding: 10px; border: 1px solid #dee2e6; background-color: #dc3545; min-width: 80px; text-align: center; cursor:pointer;">ĐTB ${getArrow('dtb')}</th></tr></thead><tbody>`;

//     dsHocSinhLop.forEach((hs, index) => {
//         let tenHSafe = hs.ten.replace(/'/g, "\\'");
//         htmlTable += `
//             <tr style="border-bottom: 1px solid #eee;" onmouseover="this.style.background='#f1f8ff'" onmouseout="this.style.background='#fff'">
//                 <td style="padding: 8px; text-align: center; font-weight: bold; color: #555; border: 1px solid #dee2e6;">${index + 1}</td>
//                 <td style="padding: 8px; font-weight: bold; color: #333; border: 1px solid #dee2e6;">${hs.ten}</td>
//                 <td style="padding: 8px; text-align: center; color: #17a2b8; border: 1px solid #dee2e6;">${hs.sdt || ''}</td>
//         `;

//         let tongDiemHS = 0; let soCotCoDiem = 0;

//         dsNhiemVuChon.forEach(nv => {
//             let cellHtml = '';
//             let kq = mapDiem[hs.uid] ? mapDiem[hs.uid][nv.ma_nhiem_vu] : null;

//             if (!kq) {
//                 if (nv.loai === 'KT_LOP') {
//                     cellHtml = `<span style="color: #dc3545; font-size: 11px; font-weight: bold; background: #ffe3e6; padding: 4px 10px; border-radius: 4px; display: inline-block; border: 1px solid #f5c6cb;">0</span>`;
//                 } else {
//                     cellHtml = `<span onclick="ham_23_5_nhap_diem_nhanh_tu_preview('${hs.uid}', '${tenHSafe}', '${nv.ma_nhiem_vu}', '${nv.loai}', null, '')" title="Bấm để nhập điểm" style="color: #dc3545; font-size: 11px; font-weight: bold; background: #ffe3e6; padding: 4px 10px; border-radius: 4px; cursor: pointer; display: inline-block; border: 1px solid #f5c6cb; transition: 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">Chưa nộp ✏️</span>`;
//                 }
//             } else {
//                 let idKqStr = kq.id ? `'${kq.id}'` : 'null';

//                 if (nv.loai === 'TL') {
//                     if (kq.trang_thai_cham === 1) {
//                         let d = parseFloat(kq.diem);
//                         if (!isNaN(d)) {
//                             cellHtml = `<b onclick="ham_23_5_nhap_diem_nhanh_tu_preview('${hs.uid}', '${tenHSafe}', '${nv.ma_nhiem_vu}', '${nv.loai}', ${idKqStr}, ${d})" title="Bấm để sửa điểm" style="color: #28a745; font-size: 15px; cursor: pointer;">${d} ✏️</b>`;
//                             tongDiemHS += d; soCotCoDiem++;
//                         } else {
//                             cellHtml = `<span onclick="ham_23_5_nhap_diem_nhanh_tu_preview('${hs.uid}', '${tenHSafe}', '${nv.ma_nhiem_vu}', '${nv.loai}', ${idKqStr}, '')" title="Bấm để sửa điểm" style="color: #17a2b8; font-size: 11px; font-weight: bold; cursor: pointer;">Đã chấm (Chữ) ✏️</span>`;
//                         }
//                     } else {
//                         cellHtml = `<span onclick="ham_23_5_nhap_diem_nhanh_tu_preview('${hs.uid}', '${tenHSafe}', '${nv.ma_nhiem_vu}', '${nv.loai}', ${idKqStr}, '')" title="Bấm để chấm điểm" style="color: #0c5460; font-size: 11px; font-weight: bold; background: #d1ecf1; padding: 4px 10px; border-radius: 4px; display: inline-block; border: 1px solid #bee5eb; cursor: pointer; transition: 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">Chưa chấm ✏️</span>`;
//                     }
//                 } else if (nv.loai === 'KT_LOP') {
//                     let d = parseFloat(kq.diem);
//                     if (!isNaN(d)) {
//                         cellHtml = `<b style="color: #28a745; font-size: 15px;">${d}</b>`;
//                         tongDiemHS += d; soCotCoDiem++;
//                     } else {
//                         cellHtml = `<b style="color: #28a745; font-size: 15px;">0</b>`;
//                         tongDiemHS += 0; soCotCoDiem++;
//                     }
//                 } else {
//                     let d = parseFloat(kq.diem);
//                     if (!isNaN(d)) {
//                         cellHtml = `<b onclick="ham_23_5_nhap_diem_nhanh_tu_preview('${hs.uid}', '${tenHSafe}', '${nv.ma_nhiem_vu}', '${nv.loai}', ${idKqStr}, ${d})" title="Bấm để sửa điểm" style="color: #28a745; font-size: 15px; cursor: pointer;">${d} ✏️</b>`;
//                         tongDiemHS += d; soCotCoDiem++;
//                     } else {
//                         cellHtml = `<b onclick="ham_23_5_nhap_diem_nhanh_tu_preview('${hs.uid}', '${tenHSafe}', '${nv.ma_nhiem_vu}', '${nv.loai}', ${idKqStr}, 0)" title="Bấm để sửa" style="color: #28a745; font-size: 15px; cursor: pointer;">0 ✏️</b>`;
//                         tongDiemHS += 0; soCotCoDiem++;
//                     }
//                 }
//             }
//             htmlTable += `<td style="padding: 8px; text-align: center; border: 1px solid #dee2e6;">${cellHtml}</td>`;
//         });

//         let dtb = soCotCoDiem > 0 ? parseFloat((tongDiemHS / soCotCoDiem).toFixed(2)) : null;
//         htmlTable += `<td style="padding: 8px; text-align: center; font-weight: bold; color: #dc3545; border: 1px solid #dee2e6; background:#fff5f5;">${dtb !== null ? dtb : '-'}</td></tr>`;
//     });

//     htmlTable += `</tbody></table></div>`;
//     return htmlTable;
// };

// // =====================================================================
// // HÀM HỖ TRỢ: TÍNH ĐTB 
// // =====================================================================
// window.ham_tinh_dtb_hs = function (uid, dsNhiemVuChon, mapDiem) {
//     let tongDiemHS = 0; let soCotCoDiem = 0;
//     dsNhiemVuChon.forEach(nv => {
//         let kq = mapDiem[uid] ? mapDiem[uid][nv.ma_nhiem_vu] : null;
//         if (!kq && nv.loai === 'KT_LOP') {
//             tongDiemHS += 0; soCotCoDiem++; // Nhập tay lớp mặc định là 0
//         } else if (kq && kq.diem !== null && !isNaN(parseFloat(kq.diem))) {
//             tongDiemHS += parseFloat(kq.diem); soCotCoDiem++;
//         }
//     });
//     return soCotCoDiem > 0 ? (tongDiemHS / soCotCoDiem) : -1;
// };

// // =====================================================================
// // HÀM 23.7: CẬP NHẬT RIÊNG KHUNG HTML KHI BẤM SORT
// // =====================================================================
// window.ham_23_7_thuc_hien_sort = function (colName) {
//     if (window.DataXuatDiem_SortCol === colName) {
//         window.DataXuatDiem_SortAsc = !window.DataXuatDiem_SortAsc;
//     } else {
//         window.DataXuatDiem_SortCol = colName;
//         window.DataXuatDiem_SortAsc = true;
//     }
//     const vungChuaBang = document.getElementById('vung-chua-bang-preview-diem');
//     if (vungChuaBang) vungChuaBang.innerHTML = ham_23_6_tao_html_bang_preview();
// };

// // =====================================================================
// // HÀM 23.5: HỖ TRỢ BẬT POPUP SỬA ĐIỂM BÀI TN/TL TỪ PREVIEW
// // =====================================================================
// window.ham_23_5_nhap_diem_nhanh_tu_preview = function (uidHocSinh, tenHocSinh, maNhiemVu, loaiNhiemVu, idKetQua, diemCu) {
//     if (loaiNhiemVu === 'KT_LOP') return;
//     Swal.fire({
//         title: '📝 NHẬP NHANH ĐIỂM SỐ',
//         html: `Học sinh: <b style="color:#0056b3;">${tenHocSinh}</b><br><br>Nhập điểm số đạt được (0-10):`,
//         input: 'number',
//         inputValue: diemCu !== undefined && diemCu !== null ? diemCu : '',
//         inputAttributes: { step: 0.1, min: 0, max: 100 },
//         showCancelButton: true,
//         confirmButtonText: '💾 Lưu điểm',
//         cancelButtonText: 'Hủy',
//         confirmButtonColor: '#28a745',
//         showLoaderOnConfirm: true,
//         preConfirm: async (diemMoi) => {
//             if (diemMoi === '') return Swal.showValidationMessage('Vui lòng nhập điểm!');
//             const diemSo = parseFloat(diemMoi);
//             try {
//                 let tableName = (loaiNhiemVu === 'TL') ? 'ket_qua_tu_luan' : 'ket_qua_trac_nghiem';
//                 if (idKetQua && idKetQua !== 'null') {
//                     let payload = { tong_diem: diemSo, trang_thai_cham: 1 };
//                     if (loaiNhiemVu === 'TN') payload.thoi_gian_lam_bai = 'Nhập tay (Giấy)';
//                     const { error } = await _supabase.from(tableName).update(payload).eq('id', idKetQua);
//                     if (error) throw error;
//                 } else {
//                     let payload = { uid_hoc_sinh: uidHocSinh, ma_nhiem_vu: maNhiemVu, tong_diem: diemSo, trang_thai_cham: 1, thoi_gian_nop: new Date().toISOString() };
//                     if (loaiNhiemVu === 'TN') {
//                         payload.lan_thu = 1; payload.trang_thai_lam_bai = 'da_nop'; payload.thoi_gian_lam_bai = 'Nhập tay (Giấy)'; payload.chi_tiet_lam_bai = [];
//                     } else {
//                         payload.chi_tiet_lam_bai = { luot_nop: 1, ghi_chu: "Nhập điểm từ bảng tổng hợp" };
//                     }
//                     const { error } = await _supabase.from(tableName).insert([payload]);
//                     if (error) throw error;
//                 }
//                 return true;
//             } catch (e) { Swal.showValidationMessage('Lỗi hệ thống: ' + e.message); }
//         }
//     }).then((result) => {
//         if (result.isConfirmed) {
//             Swal.fire({ title: 'Thành công', icon: 'success', timer: 1000, showConfirmButton: false }).then(async () => {
//                 // Tải lại ngầm để cập nhật UI mượt mà
//                 ham_23_3_thuc_thi_xuat_excel();
//             });
//         }
//     });
// };

// // =====================================================================
// // HÀM 23.4: XUẤT RA FILE EXCEL CÓ MÀU SẮC ĐẸP BẰNG XLSX-JS-STYLE
// // =====================================================================
// window.ham_23_4_tao_file_xlsx_that = async function (maLop) {
//     Swal.fire({ title: 'Đang kết xuất Excel siêu đẹp...', didOpen: () => Swal.showLoading() });

//     try {
//         if (typeof XLSX === 'undefined' || !XLSX.utils.book_new().Workbook) {
//             await new Promise((resolve, reject) => {
//                 let script = document.createElement('script');
//                 script.src = "https://cdn.jsdelivr.net/npm/xlsx-js-style@1.2.0/dist/xlsx.bundle.js";
//                 script.onload = resolve;
//                 script.onerror = () => reject(new Error("Lỗi tải thư viện định dạng Excel"));
//                 document.head.appendChild(script);
//             });
//         }

//         let dsHocSinhLop = [...(window.DataXuatDiem_RawStudents || [])];
//         const mapDiem = window.DataXuatDiem_MapDiem;
//         const dsNhiemVuChon = window.DataXuatDiem_DsNhiemVu;

//         if (dsHocSinhLop.length === 0 || !dsNhiemVuChon) throw new Error("Mất dữ liệu trong quá trình xử lý!");

//         const getTenCuoi = (fName) => fName ? fName.trim().split(" ").pop().toLowerCase() : "";
//         dsHocSinhLop.sort((a, b) => {
//             let tenA = getTenCuoi(a.ten), tenB = getTenCuoi(b.ten);
//             if (tenA === tenB) return (a.ten || "").localeCompare(b.ten || "", 'vi');
//             return tenA.localeCompare(tenB, 'vi');
//         });

//         let dataForExcel = [];
//         let headerRow = ['STT', 'Họ và Tên Học Sinh', 'Tên Đăng Nhập'];
//         dsNhiemVuChon.forEach(nv => headerRow.push(nv.ten));
//         headerRow.push('ĐTB');
//         dataForExcel.push(headerRow);

//         dsHocSinhLop.forEach((hs, index) => {
//             let rowData = [index + 1, hs.ten, hs.sdt || ''];
//             let tongDiemHS = 0; let soCotCoDiem = 0;

//             dsNhiemVuChon.forEach(nv => {
//                 let kq = mapDiem[hs.uid] ? mapDiem[hs.uid][nv.ma_nhiem_vu] : null;
//                 if (!kq) {
//                     rowData.push(nv.loai === 'KT_LOP' ? 0 : 'Chưa nộp');
//                     if (nv.loai === 'KT_LOP') soCotCoDiem++;
//                 } else {
//                     if (nv.loai === 'TL' && kq.trang_thai_cham !== 1) {
//                         rowData.push('Chưa chấm');
//                     } else {
//                         let d = parseFloat(kq.diem);
//                         if (!isNaN(d)) { rowData.push(d); tongDiemHS += d; soCotCoDiem++; }
//                         else { rowData.push('Đã chấm'); }
//                     }
//                 }
//             });

//             let dtb = soCotCoDiem > 0 ? parseFloat((tongDiemHS / soCotCoDiem).toFixed(2)) : '';
//             rowData.push(dtb);
//             dataForExcel.push(rowData);
//         });

//         const wb = XLSX.utils.book_new();
//         const ws = XLSX.utils.aoa_to_sheet(dataForExcel);
//         const range = XLSX.utils.decode_range(ws['!ref']);

//         for (let R = 0; R <= range.e.r; ++R) {
//             for (let C = 0; C <= range.e.c; ++C) {
//                 let cellRef = XLSX.utils.encode_cell({ c: C, r: R });
//                 if (!ws[cellRef]) continue;

//                 let cell = ws[cellRef];
//                 if (!cell.s) cell.s = {};

//                 if (C === 2 && R > 0) cell.t = 's'; // SĐT thành text

//                 cell.s.border = {
//                     top: { style: "thin", color: { rgb: "CCCCCC" } },
//                     bottom: { style: "thin", color: { rgb: "CCCCCC" } },
//                     left: { style: "thin", color: { rgb: "CCCCCC" } },
//                     right: { style: "thin", color: { rgb: "CCCCCC" } }
//                 };
//                 if (C === 0 || C >= 2) cell.s.alignment = { horizontal: "center", vertical: "center" };
//                 else cell.s.alignment = { vertical: "center" };

//                 if (R === 0) {
//                     cell.s.font = { bold: true, color: { rgb: "FFFFFF" } };
//                     if (C < 3) cell.s.fill = { fgColor: { rgb: "0070C0" } };
//                     else if (C === range.e.c) cell.s.fill = { fgColor: { rgb: "DC3545" } };
//                     else {
//                         let nv = dsNhiemVuChon[C - 3];
//                         if (nv.loai === 'TN') cell.s.fill = { fgColor: { rgb: "28A745" } };
//                         else if (nv.loai === 'TL') cell.s.fill = { fgColor: { rgb: "6F42C1" } };
//                         else cell.s.fill = { fgColor: { rgb: "E83E8C" } };
//                     }
//                 } else {
//                     let val = cell.v;
//                     if (C > 2 && C < range.e.c) {
//                         if (val === 'Chưa nộp') {
//                             cell.s.fill = { fgColor: { rgb: "FFE3E6" } };
//                             cell.s.font = { color: { rgb: "DC3545" }, italic: true };
//                         } else if (val === 'Chưa chấm') {
//                             cell.s.fill = { fgColor: { rgb: "D1ECF1" } };
//                             cell.s.font = { color: { rgb: "0C5460" }, italic: true };
//                         } else if (typeof val === 'number') {
//                             cell.s.font = { bold: true };
//                             cell.s.font.color = val < 5 ? { rgb: "DC3545" } : { rgb: "155724" };
//                         }
//                     }
//                     if (C === range.e.c && typeof val === 'number') {
//                         cell.s.font = { bold: true, color: val < 5 ? { rgb: "DC3545" } : { rgb: "28A745" } };
//                         cell.s.fill = { fgColor: { rgb: "FFF5F5" } };
//                     }
//                 }
//             }
//         }

//         let wscols = [{ wch: 6 }, { wch: 30 }, { wch: 15 }];
//         for (let i = 0; i < dsNhiemVuChon.length; i++) wscols.push({ wch: 18 });
//         wscols.push({ wch: 12 });
//         ws['!cols'] = wscols;

//         XLSX.utils.book_append_sheet(wb, ws, "DiemTongHop");
//         const fileName = `BangDiem_Lop_${maLop}_${new Date().toISOString().split('T')[0]}.xlsx`;
//         XLSX.writeFile(wb, fileName);

//         Swal.fire('Hoàn tất!', '✅ Bảng điểm đã được xuất ra với màu sắc đầy đủ.', 'success');

//     } catch (e) {
//         console.error("Lỗi xuất XLSX:", e);
//         Swal.fire('Lỗi tạo file', e.message, 'error');
//     }
// };


// ==============================================================================
// KHỐI 23: XUẤT ĐIỂM TỔNG HỢP TẤT CẢ HỌC SINH CỦA 1 LỚP RA EXCEL (GIAO DIỆN CHÍNH)
// ==============================================================================

// =====================================================================
// HÀM 23.1: VẼ GIAO DIỆN XUẤT ĐIỂM LÊN VÙNG LÀM VIỆC CHI TIẾT
// =====================================================================
window.ham_23_1_mo_giao_dien_xuat_diem_tong_hop = async function () {
    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
    if (!vungLamViec) return;

    vungLamViec.innerHTML = '<div style="padding:40px; text-align:center; font-weight:bold; color:#17a2b8; font-size:16px;">⏳ Đang tải dữ liệu, vui lòng chờ...</div>';

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

        vungLamViec.innerHTML = `
            <div style="padding: 10px; animation: fadeIn 0.3s ease-in-out;">
                
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #17a2b8; padding-bottom: 10px; margin-bottom: 20px;">
                    <h3 style="color: #17a2b8; margin: 0; text-transform: uppercase; display: flex; align-items: center; gap: 10px;">
                        📥 XUẤT ĐIỂM TỔNG HỢP
                    </h3>
                    <button onclick="ham_3_1_ve_dashboard_admin()" style="padding: 6px 15px; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">⬅️ Quay lại</button>
                </div>

                <!-- BỘ LỌC TÌM KIẾM -->
                <div style="background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #ced4da; box-shadow: 0 2px 4px rgba(0,0,0,0.02); margin-bottom: 20px; display: flex; gap: 15px; align-items: flex-end; flex-wrap: wrap;">
                    <div style="flex: 1.5; min-width: 200px;">
                        <label style="font-weight: bold; color: #0056b3; font-size:13px; display:block; margin-bottom:5px;">🏫 1. Chọn Lớp cần xuất:</label>
                        <select id="xuat_diem_ma_lop" style="width: 100%; padding: 10px; border-radius: 4px; border: 1px solid #0056b3; font-weight:bold; outline:none; color:#0056b3;">
                            ${htmlLop}
                        </select>
                    </div>
                    <div style="flex: 1; min-width: 150px;">
                        <label style="font-weight: bold; color: #d35400; font-size:13px; display:block; margin-bottom:5px;">📅 2. Từ ngày:</label>
                        <input type="date" id="xuat_diem_tu_ngay" value="${firstDay}" style="width: 100%; padding: 10px; border-radius: 4px; border: 1px solid #ccc; box-sizing:border-box; outline:none; font-weight:bold; color:#495057;">
                    </div>
                    <div style="flex: 1; min-width: 150px;">
                        <label style="font-weight: bold; color: #d35400; font-size:13px; display:block; margin-bottom:5px;">📅 Đến ngày:</label>
                        <input type="date" id="xuat_diem_den_ngay" value="${today}" style="width: 100%; padding: 10px; border-radius: 4px; border: 1px solid #ccc; box-sizing:border-box; outline:none; font-weight:bold; color:#495057;">
                    </div>
                    <div style="flex: 1.5; min-width: 250px;">
                        <button onclick="ham_23_2_quet_nhiem_vu_de_xuat_excel()" style="width: 100%; padding: 10px; background: #17a2b8; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.2); transition:0.2s; font-size:14px;" onmouseover="this.style.background='#138496'" onmouseout="this.style.background='#17a2b8'">
                            🔍 3. TÌM CÁC BÀI KIỂM TRA
                        </button>
                    </div>
                </div>

                <!-- BỐ CỤC DỌC (TRẢI RỘNG FULL MÀN HÌNH) -->
                <div style="display: flex; flex-direction: column; gap: 20px;">
                    
                    <!-- KHỐI 1: DANH SÁCH BÀI KIỂM TRA -->
                    <div style="width: 100%; background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #dee2e6; box-shadow: 0 2px 4px rgba(0,0,0,0.05); display: flex; flex-direction: column; box-sizing: border-box;">
                        <h4 style="margin: 0 0 15px 0; color: #d35400; border-bottom: 2px dashed #ffeeba; padding-bottom: 10px;">📌 4. Danh sách Cột điểm</h4>
                        <div id="xuat_diem_khu_vuc_nhiem_vu" style="flex: 1; max-height: 250px; overflow-y: auto; padding-right: 5px;">
                            <div style="text-align:center; color:#6c757d; font-style:italic; padding:40px;">Vui lòng Chọn lớp và Bấm tìm...</div>
                        </div>
                    </div>

                    <!-- KHỐI 2: BẢNG PREVIEW ĐIỂM CHUẨN BỊ XUẤT -->
                    <div style="width: 100%; display: flex; flex-direction: column; background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #dee2e6; box-shadow: 0 2px 4px rgba(0,0,0,0.05); box-sizing: border-box;">
                        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px dashed #d1ecf1; padding-bottom: 10px; margin-bottom: 15px;">
                            <h4 style="margin: 0; color: #0056b3;">👀 5. Xem trước Bảng điểm</h4>
                            <button id="btn_xuat_excel_chinh_thuc" onclick="window.ham_23_4_tao_file_xlsx_that(window.DataXuatDiem_MaLop)" style="display:none; padding: 10px 20px; background: #28a745; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.15); transition: 0.2s;" onmouseover="this.style.background='#218838'" onmouseout="this.style.background='#28a745'">
                                📥 XUẤT EXCEL TÔ MÀU TỰ ĐỘNG (.xlsx)
                            </button>
                        </div>
                        
                        <div id="vung-chua-bang-preview-diem" style="width: 100%;">
                            <div style="text-align:center; color:#6c757d; font-style:italic; padding:60px;">Bảng điểm sẽ hiển thị tại đây sau khi Thầy/Cô chọn các cột điểm ở Bước 4...</div>
                        </div>
                    </div>
                </div>

            </div>
        `;
    } catch (err) {
        Swal.fire('Lỗi', 'Không tải được giao diện: ' + err.message, 'error');
    }
};

// =====================================================================
// HÀM 23.2: QUÉT DANH SÁCH BÀI TỪ KHỐI ONINE VÀ KHỐI 20 (NHẬT KÝ)
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

    khuVuc.innerHTML = '<div style="text-align:center; color:#17a2b8; font-weight:bold; padding:20px;">⏳ Đang liên thông dữ liệu các hệ thống...</div>';

    try {
        // 1. Quét bài Online
        const { data: dsTN } = await _supabase.from('nhiem_vu_trac_nghiem').select('ma_nhiem_vu, ten_nhiem_vu, danh_sach_lop').gte('ngay_tao', tuNgay).lte('ngay_tao', denNgay);
        const { data: dsTL } = await _supabase.from('nhiem_vu_tu_luan').select('ma_nhiem_vu, ten_nhiem_vu, danh_sach_lop').gte('ngay_tao', tuNgay).lte('ngay_tao', denNgay);

        let dsHienThi = [];
        const locBaiTheoLop = (danhSachBanDau, loaiBai) => {
            (danhSachBanDau || []).forEach(nv => {
                let arrLop = [];
                try { arrLop = typeof nv.danh_sach_lop === 'string' ? JSON.parse(nv.danh_sach_lop) : (nv.danh_sach_lop || []); } catch (e) { }
                if (arrLop.includes(maLop)) dsHienThi.push({ ...nv, loai: loaiBai });
            });
        };
        locBaiTheoLop(dsTN, 'TN');
        locBaiTheoLop(dsTL, 'TL');

        // 2. Quét bài Nhập Tay Lớp (Từ Khối 20)
        const { data: dsNK } = await _supabase.from('nhat_ky_day_hoc').select('id').eq('ma_lop', maLop).gte('ngay_day', tuNgayRaw).lte('ngay_day', denNgayRaw);
        if (dsNK && dsNK.length > 0) {
            const nkIds = dsNK.map(nk => nk.id);
            const { data: dsSK } = await _supabase.from('nhat_ky_su_kien_hs').select('ghi_chu, thong_tin_mo_rong').in('id_nhat_ky', nkIds).ilike('loai_the', 'Cho điểm%');

            let cacBaiKT = new Set();
            (dsSK || []).forEach(sk => {
                if (sk.thong_tin_mo_rong && sk.thong_tin_mo_rong.phan_loai === 'diem_ca_lop') {
                    let tenBai = sk.ghi_chu.split(' - Ghi chú:')[0];
                    cacBaiKT.add(tenBai);
                }
            });
            cacBaiKT.forEach(baiKT => {
                dsHienThi.push({ ma_nhiem_vu: baiKT, ten_nhiem_vu: baiKT, danh_sach_lop: [maLop], loai: 'KT_LOP' });
            });
        }

        if (dsHienThi.length === 0) {
            khuVuc.innerHTML = '<div style="color:#dc3545; font-weight:bold; text-align:center; padding:15px;">❌ Không tìm thấy nhiệm vụ nào được giao cho lớp này!</div>';
            return;
        }

        window.DataXuatDiem_NhiemVu = dsHienThi;
        window.DataXuatDiem_MaLop = maLop;

        let htmlCheckbox = `
            <div style="font-weight:bold; color:#0056b3; margin-bottom:12px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #ccc; padding-bottom:8px;">
                <span>Tìm thấy ${dsHienThi.length} cột điểm:</span>
                <div style="display:flex; gap:5px;">
                    <button onclick="document.querySelectorAll('.chk-xuat-diem').forEach(c => c.checked=true)" style="background:#28a745; color:white; border:none; border-radius:4px; font-size:11px; padding:4px 8px; cursor:pointer;">Tick Hết</button>
                    <button onclick="document.querySelectorAll('.chk-xuat-diem').forEach(c => c.checked=false)" style="background:#6c757d; color:white; border:none; border-radius:4px; font-size:11px; padding:4px 8px; cursor:pointer;">Bỏ Tick</button>
                </div>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 10px; margin-bottom: 15px;">
        `;

        dsHienThi.forEach(nv => {
            let badge = '';
            if (nv.loai === 'TN') badge = '<span style="background:#17a2b8; color:white; padding:2px 6px; border-radius:4px; font-size:10px;">Trắc nghiệm</span>';
            else if (nv.loai === 'TL') badge = '<span style="background:#6f42c1; color:white; padding:2px 6px; border-radius:4px; font-size:10px;">Tự luận</span>';
            else badge = '<span style="background:#e83e8c; color:white; padding:2px 6px; border-radius:4px; font-size:10px;">Nhập tay (Lớp)</span>';

            htmlCheckbox += `
                <label style="display: flex; align-items: flex-start; gap: 10px; cursor: pointer; background: #f8f9fa; padding: 10px; border: 1px solid #dee2e6; border-radius: 6px; transition:0.2s;" onmouseover="this.style.background='#e9ecef'" onmouseout="this.style.background='#f8f9fa'">
                    <input type="checkbox" class="chk-xuat-diem" value="${nv.ma_nhiem_vu}" data-loai="${nv.loai}" checked style="margin-top: 2px; transform: scale(1.3);">
                    <div style="flex:1;">
                        <div style="font-weight:bold; font-size:13px; color:#333; line-height:1.4;">${nv.ten_nhiem_vu}</div>
                        <div style="margin-top:6px; display:flex; align-items:center; gap:8px;">${badge}</div>
                    </div>
                </label>
            `;
        });

        htmlCheckbox += `</div>`;

        htmlCheckbox += `
            <div style="text-align: right; border-top: 1px solid #ccc; padding-top: 15px;">
                <button onclick="ham_23_3_thuc_thi_xuat_excel()" style="padding: 12px 25px; background: #fd7e14; color: white; border: none; border-radius: 6px; font-weight: bold; font-size: 14px; cursor: pointer; box-shadow: 0 4px 6px rgba(0,0,0,0.15); transition: 0.2s;" onmouseover="this.style.background='#e86c00'" onmouseout="this.style.background='#fd7e14'">
                    👀 TỔNG HỢP & XEM BẢNG ĐIỂM
                </button>
            </div>
        `;

        khuVuc.innerHTML = htmlCheckbox;

    } catch (error) {
        khuVuc.innerHTML = `<div style="color:red; text-align:center; padding:15px;">Lỗi quét dữ liệu: ${error.message}</div>`;
    }
};

// =====================================================================
// HÀM 23.3: LẤY ĐIỂM SỐ VÀ HIỂN THỊ TRỰC TIẾP LÊN BẢNG PREVIEW (KHÔNG POPUP)
// =====================================================================
window.ham_23_3_thuc_thi_xuat_excel = async function () {
    const checkboxes = document.querySelectorAll('.chk-xuat-diem:checked');
    if (checkboxes.length === 0) { Swal.fire('Cảnh báo', '⚠️ Vui lòng chọn ít nhất 1 bài kiểm tra!', 'warning'); return false; }

    const maLop = window.DataXuatDiem_MaLop;
    let dsNhiemVuChon = [];
    checkboxes.forEach(chk => {
        const nvGoc = window.DataXuatDiem_NhiemVu.find(n => n.ma_nhiem_vu === chk.value);
        dsNhiemVuChon.push({ ma_nhiem_vu: chk.value, loai: chk.getAttribute('data-loai'), ten: nvGoc.ten_nhiem_vu });
    });

    const vungPreview = document.getElementById('vung-chua-bang-preview-diem');
    vungPreview.innerHTML = '<div style="text-align:center; color:#28a745; font-weight:bold; padding:40px; font-size:16px;">⏳ Đang tính toán và kết xuất Bảng điểm...</div>';

    try {
        const { data: dsHS } = await _supabase.from('hoc_sinh').select('uid, ten, sdt, danh_sach_ma_lop');
        let dsHocSinhLop = (dsHS || []).filter(hs => {
            let arrLop = [];
            try { arrLop = typeof hs.danh_sach_ma_lop === 'string' ? JSON.parse(hs.danh_sach_ma_lop) : (hs.danh_sach_ma_lop || []); } catch (e) { }
            return arrLop.includes(maLop);
        });

        const maNhiemVuTN = dsNhiemVuChon.filter(n => n.loai === 'TN').map(n => n.ma_nhiem_vu);
        const maNhiemVuTL = dsNhiemVuChon.filter(n => n.loai === 'TL').map(n => n.ma_nhiem_vu);
        const maNhiemVuKT = dsNhiemVuChon.filter(n => n.loai === 'KT_LOP').map(n => n.ma_nhiem_vu);

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

        if (maNhiemVuKT.length > 0) {
            const hsUids = dsHocSinhLop.map(h => h.uid);
            const { data: kqKT } = await _supabase.from('nhat_ky_su_kien_hs').select('uid_hoc_sinh, ghi_chu, thong_tin_mo_rong').in('uid_hoc_sinh', hsUids).ilike('loai_the', 'Cho điểm%');
            if (kqKT) {
                kqKT.forEach(kq => {
                    if (kq.thong_tin_mo_rong && kq.thong_tin_mo_rong.phan_loai === 'diem_ca_lop') {
                        let tenBai = kq.ghi_chu.split(' - Ghi chú:')[0];
                        if (maNhiemVuKT.includes(tenBai)) {
                            if (!mapDiem[kq.uid_hoc_sinh]) mapDiem[kq.uid_hoc_sinh] = {};
                            mapDiem[kq.uid_hoc_sinh][tenBai] = { diem: kq.thong_tin_mo_rong.diem_so, trang_thai_cham: 1 };
                        }
                    }
                });
            }
        }

        window.DataXuatDiem_RawStudents = dsHocSinhLop;
        window.DataXuatDiem_MapDiem = mapDiem;
        window.DataXuatDiem_DsNhiemVu = dsNhiemVuChon;
        window.DataXuatDiem_SortCol = 'ten';
        window.DataXuatDiem_SortAsc = true;

        // Render HTML
        vungPreview.innerHTML = ham_23_6_tao_html_bang_preview();

        // Hiện nút Xuất Excel
        document.getElementById('btn_xuat_excel_chinh_thuc').style.display = 'block';

    } catch (error) {
        vungPreview.innerHTML = `<div style="color:red; text-align:center; padding:15px;">Lỗi tạo bảng: ${error.message}</div>`;
    }
};

// =====================================================================
// HÀM 23.6: TẠO MÃ HTML BẢNG PREVIEW (CỐ ĐỊNH CỘT STT VÀ HỌ TÊN, BỀ RỘNG TRÀN NGANG)
// =====================================================================
window.ham_23_6_tao_html_bang_preview = function () {
    let dsHocSinhLop = [...window.DataXuatDiem_RawStudents];
    let mapDiem = window.DataXuatDiem_MapDiem;
    let dsNhiemVuChon = window.DataXuatDiem_DsNhiemVu;
    let sortCol = window.DataXuatDiem_SortCol;
    let sortAsc = window.DataXuatDiem_SortAsc;

    if (sortCol !== null) {
        dsHocSinhLop.sort((a, b) => {
            if (sortCol === 'ten') {
                let tenA = (a.ten || "").trim().split(" ").pop().toLowerCase();
                let tenB = (b.ten || "").trim().split(" ").pop().toLowerCase();
                let cmp = tenA.localeCompare(tenB, 'vi');
                if (cmp === 0) cmp = (a.ten || "").localeCompare(b.ten || "", 'vi');
                return sortAsc ? cmp : -cmp;
            }

            let valA, valB;
            if (sortCol === 'stt') { return 0; }
            else if (sortCol === 'sdt') { valA = (a.sdt || "").toString(); valB = (b.sdt || "").toString(); }
            else if (sortCol === 'dtb') {
                valA = ham_tinh_dtb_hs(a.uid, dsNhiemVuChon, mapDiem);
                valB = ham_tinh_dtb_hs(b.uid, dsNhiemVuChon, mapDiem);
            } else {
                let kqA = mapDiem[a.uid] ? mapDiem[a.uid][sortCol] : null;
                let kqB = mapDiem[b.uid] ? mapDiem[b.uid][sortCol] : null;

                const getScoreWeight = (kq) => {
                    if (!kq) return -2;
                    if (kq.diem === null || kq.diem === undefined || (kq.trang_thai_cham !== 1 && kq.trang_thai_cham !== undefined)) return -1;
                    let d = parseFloat(kq.diem);
                    return isNaN(d) ? -1 : d;
                };

                valA = getScoreWeight(kqA); valB = getScoreWeight(kqB);
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

    // Style Bảng có border-collapse: separate để làm sticky headers/columns mượt mà không mất viền
    let htmlTable = `
        <div style="max-height: 550px; overflow-y: auto; overflow-x: auto; border: 1px solid #ced4da; border-radius: 6px; box-shadow: inset 0 0 5px rgba(0,0,0,0.05); background:#fff; width: 100%;">
            <table style="width: 100%; border-collapse: separate; border-spacing: 0; min-width: ${370 + dsNhiemVuChon.length * 120}px; font-size: 13px;">
                <thead style="position: sticky; top: 0; z-index: 5;">
                    <tr style="background-color: #0070C0; color: white;">
                        <th onclick="ham_23_7_thuc_hien_sort('stt')" style="position: sticky; left: 0; z-index: 6; background-color: #0070C0; box-sizing: border-box; width: 50px; min-width: 50px; padding: 10px; border-right: 1px solid #dee2e6; border-bottom: 2px solid #dee2e6; text-align: center; white-space: nowrap; cursor:pointer;">STT ${getArrow('stt')}</th>
                        <th onclick="ham_23_7_thuc_hien_sort('ten')" style="position: sticky; left: 50px; z-index: 6; background-color: #0070C0; box-sizing: border-box; width: 220px; min-width: 220px; padding: 10px; border-right: 1px solid #dee2e6; border-bottom: 2px solid #dee2e6; text-align: left; white-space: nowrap; cursor:pointer;">Họ và Tên Học Sinh ${getArrow('ten')}</th>
                        <th onclick="ham_23_7_thuc_hien_sort('sdt')" style="padding: 10px; border-right: 1px solid #dee2e6; border-bottom: 2px solid #dee2e6; width: 100px; min-width: 100px; text-align: center; white-space: nowrap; cursor:pointer;">Mã ĐN ${getArrow('sdt')}</th>
    `;

    dsNhiemVuChon.forEach(nv => {
        let bgColor = '#28a745';
        if (nv.loai === 'TL') bgColor = '#6f42c1';
        if (nv.loai === 'KT_LOP') bgColor = '#e83e8c';
        htmlTable += `<th onclick="ham_23_7_thuc_hien_sort('${nv.ma_nhiem_vu}')" style="padding: 10px; border-right: 1px solid #dee2e6; border-bottom: 2px solid #dee2e6; background-color: ${bgColor}; min-width: 120px; text-align: center; cursor:pointer;" title="Bấm để sắp xếp theo cột này">${nv.ten} ${getArrow(nv.ma_nhiem_vu)}</th>`;
    });
    htmlTable += `<th onclick="ham_23_7_thuc_hien_sort('dtb')" style="padding: 10px; border-bottom: 2px solid #dee2e6; background-color: #dc3545; min-width: 80px; text-align: center; cursor:pointer;">ĐTB ${getArrow('dtb')}</th></tr></thead><tbody>`;

    dsHocSinhLop.forEach((hs, index) => {
        let tenHSafe = hs.ten.replace(/'/g, "\'");
        htmlTable += `
            <tr style="background-color: #fff; transition: background-color 0.2s;" onmouseover="this.style.backgroundColor='#f1f8ff'" onmouseout="this.style.backgroundColor='#fff'">
                <td style="position: sticky; left: 0; z-index: 2; background-color: inherit; box-sizing: border-box; width: 50px; min-width: 50px; padding: 8px; text-align: center; font-weight: bold; color: #555; border-right: 1px solid #dee2e6; border-bottom: 1px solid #dee2e6;">${index + 1}</td>
                <td style="position: sticky; left: 50px; z-index: 2; background-color: inherit; box-sizing: border-box; width: 220px; min-width: 220px; padding: 8px; font-weight: bold; color: #333; border-right: 1px solid #dee2e6; border-bottom: 1px solid #dee2e6;">${hs.ten}</td>
                <td style="padding: 8px; text-align: center; color: #17a2b8; border-right: 1px solid #dee2e6; border-bottom: 1px solid #dee2e6;">${hs.sdt || ''}</td>
        `;

        let tongDiemHS = 0; let soCotCoDiem = 0;

        dsNhiemVuChon.forEach(nv => {
            let cellHtml = '';
            let kq = mapDiem[hs.uid] ? mapDiem[hs.uid][nv.ma_nhiem_vu] : null;

            if (!kq) {
                if (nv.loai === 'KT_LOP') {
                    cellHtml = `<span style="color: #dc3545; font-size: 11px; font-weight: bold; background: #ffe3e6; padding: 4px 10px; border-radius: 4px; display: inline-block; border: 1px solid #f5c6cb;">0</span>`;
                } else {
                    cellHtml = `<span onclick="ham_23_5_nhap_diem_nhanh_tu_preview('${hs.uid}', '${tenHSafe}', '${nv.ma_nhiem_vu}', '${nv.loai}', null, '')" title="Bấm để nhập điểm" style="color: #dc3545; font-size: 11px; font-weight: bold; background: #ffe3e6; padding: 4px 10px; border-radius: 4px; cursor: pointer; display: inline-block; border: 1px solid #f5c6cb; transition: 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">Chưa nộp ✏️</span>`;
                }
            } else {
                let idKqStr = kq.id ? `'${kq.id}'` : 'null';

                if (nv.loai === 'TL') {
                    if (kq.trang_thai_cham === 1) {
                        let d = parseFloat(kq.diem);
                        if (!isNaN(d)) {
                            cellHtml = `<b onclick="ham_23_5_nhap_diem_nhanh_tu_preview('${hs.uid}', '${tenHSafe}', '${nv.ma_nhiem_vu}', '${nv.loai}', ${idKqStr}, ${d})" title="Bấm để sửa điểm" style="color: #28a745; font-size: 15px; cursor: pointer;">${d} ✏️</b>`;
                            tongDiemHS += d; soCotCoDiem++;
                        } else {
                            cellHtml = `<span onclick="ham_23_5_nhap_diem_nhanh_tu_preview('${hs.uid}', '${tenHSafe}', '${nv.ma_nhiem_vu}', '${nv.loai}', ${idKqStr}, '')" title="Bấm để sửa điểm" style="color: #17a2b8; font-size: 11px; font-weight: bold; cursor: pointer;">Đã chấm (Chữ) ✏️</span>`;
                        }
                    } else {
                        cellHtml = `<span onclick="ham_23_5_nhap_diem_nhanh_tu_preview('${hs.uid}', '${tenHSafe}', '${nv.ma_nhiem_vu}', '${nv.loai}', ${idKqStr}, '')" title="Bấm để chấm điểm" style="color: #0c5460; font-size: 11px; font-weight: bold; background: #d1ecf1; padding: 4px 10px; border-radius: 4px; display: inline-block; border: 1px solid #bee5eb; cursor: pointer; transition: 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">Chưa chấm ✏️</span>`;
                    }
                } else if (nv.loai === 'KT_LOP') {
                    let d = parseFloat(kq.diem);
                    if (!isNaN(d)) {
                        cellHtml = `<b style="color: #28a745; font-size: 15px;">${d}</b>`;
                        tongDiemHS += d; soCotCoDiem++;
                    } else {
                        cellHtml = `<b style="color: #28a745; font-size: 15px;">0</b>`;
                        tongDiemHS += 0; soCotCoDiem++;
                    }
                } else {
                    let d = parseFloat(kq.diem);
                    if (!isNaN(d)) {
                        cellHtml = `<b onclick="ham_23_5_nhap_diem_nhanh_tu_preview('${hs.uid}', '${tenHSafe}', '${nv.ma_nhiem_vu}', '${nv.loai}', ${idKqStr}, ${d})" title="Bấm để sửa điểm" style="color: #28a745; font-size: 15px; cursor: pointer;">${d} ✏️</b>`;
                        tongDiemHS += d; soCotCoDiem++;
                    } else {
                        cellHtml = `<b onclick="ham_23_5_nhap_diem_nhanh_tu_preview('${hs.uid}', '${tenHSafe}', '${nv.ma_nhiem_vu}', '${nv.loai}', ${idKqStr}, 0)" title="Bấm để sửa" style="color: #28a745; font-size: 15px; cursor: pointer;">0 ✏️</b>`;
                        tongDiemHS += 0; soCotCoDiem++;
                    }
                }
            }
            htmlTable += `<td style="padding: 8px; text-align: center; border-right: 1px solid #dee2e6; border-bottom: 1px solid #dee2e6;">${cellHtml}</td>`;
        });

        let dtb = soCotCoDiem > 0 ? parseFloat((tongDiemHS / soCotCoDiem).toFixed(2)) : null;
        htmlTable += `<td style="padding: 8px; text-align: center; font-weight: bold; color: #dc3545; border-bottom: 1px solid #dee2e6; background:#fff5f5;">${dtb !== null ? dtb : '-'}</td></tr>`;
    });

    htmlTable += `</tbody></table></div>`;
    return htmlTable;
};

// =====================================================================
// HÀM HỖ TRỢ: TÍNH ĐTB 
// =====================================================================
window.ham_tinh_dtb_hs = function (uid, dsNhiemVuChon, mapDiem) {
    let tongDiemHS = 0; let soCotCoDiem = 0;
    dsNhiemVuChon.forEach(nv => {
        let kq = mapDiem[uid] ? mapDiem[uid][nv.ma_nhiem_vu] : null;
        if (!kq && nv.loai === 'KT_LOP') {
            tongDiemHS += 0; soCotCoDiem++;
        } else if (kq && kq.diem !== null && !isNaN(parseFloat(kq.diem))) {
            tongDiemHS += parseFloat(kq.diem); soCotCoDiem++;
        }
    });
    return soCotCoDiem > 0 ? (tongDiemHS / soCotCoDiem) : -1;
};

// =====================================================================
// HÀM 23.7: CẬP NHẬT RIÊNG KHUNG HTML KHI BẤM SORT
// =====================================================================
window.ham_23_7_thuc_hien_sort = function (colName) {
    if (window.DataXuatDiem_SortCol === colName) {
        window.DataXuatDiem_SortAsc = !window.DataXuatDiem_SortAsc;
    } else {
        window.DataXuatDiem_SortCol = colName;
        window.DataXuatDiem_SortAsc = true;
    }
    const vungChuaBang = document.getElementById('vung-chua-bang-preview-diem');
    if (vungChuaBang) vungChuaBang.innerHTML = ham_23_6_tao_html_bang_preview();
};

// =====================================================================
// HÀM 23.5: HỖ TRỢ BẬT POPUP SỬA ĐIỂM BÀI TN/TL TỪ PREVIEW
// =====================================================================
window.ham_23_5_nhap_diem_nhanh_tu_preview = function (uidHocSinh, tenHocSinh, maNhiemVu, loaiNhiemVu, idKetQua, diemCu) {
    if (loaiNhiemVu === 'KT_LOP') return;
    Swal.fire({
        title: '📝 NHẬP NHANH ĐIỂM SỐ',
        html: `Học sinh: <b style="color:#0056b3;">${tenHocSinh}</b><br><br>Nhập điểm số đạt được (0-10):`,
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
                    let payload = { tong_diem: diemSo, trang_thai_cham: 1 };
                    if (loaiNhiemVu === 'TN') payload.thoi_gian_lam_bai = 'Nhập tay (Giấy)';
                    const { error } = await _supabase.from(tableName).update(payload).eq('id', idKetQua);
                    if (error) throw error;
                } else {
                    let payload = { uid_hoc_sinh: uidHocSinh, ma_nhiem_vu: maNhiemVu, tong_diem: diemSo, trang_thai_cham: 1, thoi_gian_nop: new Date().toISOString() };
                    if (loaiNhiemVu === 'TN') {
                        payload.lan_thu = 1; payload.trang_thai_lam_bai = 'da_nop'; payload.thoi_gian_lam_bai = 'Nhập tay (Giấy)'; payload.chi_tiet_lam_bai = [];
                    } else {
                        payload.chi_tiet_lam_bai = { luot_nop: 1, ghi_chu: "Nhập điểm từ bảng tổng hợp" };
                    }
                    const { error } = await _supabase.from(tableName).insert([payload]);
                    if (error) throw error;
                }
                return true;
            } catch (e) { Swal.showValidationMessage('Lỗi hệ thống: ' + e.message); }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({ title: 'Thành công', icon: 'success', timer: 1000, showConfirmButton: false }).then(async () => {
                ham_23_3_thuc_thi_xuat_excel();
            });
        }
    });
};

// =====================================================================
// HÀM 23.4: XUẤT RA FILE EXCEL CÓ MÀU SẮC ĐẸP BẰNG XLSX-JS-STYLE
// =====================================================================
window.ham_23_4_tao_file_xlsx_that = async function (maLop) {
    Swal.fire({ title: 'Đang kết xuất Excel siêu đẹp...', didOpen: () => Swal.showLoading() });

    try {
        if (typeof XLSX === 'undefined' || !XLSX.utils.book_new().Workbook) {
            await new Promise((resolve, reject) => {
                let script = document.createElement('script');
                script.src = "https://cdn.jsdelivr.net/npm/xlsx-js-style@1.2.0/dist/xlsx.bundle.js";
                script.onload = resolve;
                script.onerror = () => reject(new Error("Lỗi tải thư viện định dạng Excel"));
                document.head.appendChild(script);
            });
        }

        let dsHocSinhLop = [...(window.DataXuatDiem_RawStudents || [])];
        const mapDiem = window.DataXuatDiem_MapDiem;
        const dsNhiemVuChon = window.DataXuatDiem_DsNhiemVu;

        if (dsHocSinhLop.length === 0 || !dsNhiemVuChon) throw new Error("Mất dữ liệu trong quá trình xử lý!");

        const getTenCuoi = (fName) => fName ? fName.trim().split(" ").pop().toLowerCase() : "";
        dsHocSinhLop.sort((a, b) => {
            let tenA = getTenCuoi(a.ten), tenB = getTenCuoi(b.ten);
            if (tenA === tenB) return (a.ten || "").localeCompare(b.ten || "", 'vi');
            return tenA.localeCompare(tenB, 'vi');
        });

        let dataForExcel = [];
        let headerRow = ['STT', 'Họ và Tên Học Sinh', 'Tên Đăng Nhập'];
        dsNhiemVuChon.forEach(nv => headerRow.push(nv.ten));
        headerRow.push('ĐTB');
        dataForExcel.push(headerRow);

        dsHocSinhLop.forEach((hs, index) => {
            let rowData = [index + 1, hs.ten, hs.sdt || ''];
            let tongDiemHS = 0; let soCotCoDiem = 0;

            dsNhiemVuChon.forEach(nv => {
                let kq = mapDiem[hs.uid] ? mapDiem[hs.uid][nv.ma_nhiem_vu] : null;
                if (!kq) {
                    rowData.push(nv.loai === 'KT_LOP' ? 0 : 'Chưa nộp');
                    if (nv.loai === 'KT_LOP') soCotCoDiem++;
                } else {
                    if (nv.loai === 'TL' && kq.trang_thai_cham !== 1) {
                        rowData.push('Chưa chấm');
                    } else {
                        let d = parseFloat(kq.diem);
                        if (!isNaN(d)) { rowData.push(d); tongDiemHS += d; soCotCoDiem++; }
                        else { rowData.push('Đã chấm'); }
                    }
                }
            });

            let dtb = soCotCoDiem > 0 ? parseFloat((tongDiemHS / soCotCoDiem).toFixed(2)) : '';
            rowData.push(dtb);
            dataForExcel.push(rowData);
        });

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(dataForExcel);
        const range = XLSX.utils.decode_range(ws['!ref']);

        for (let R = 0; R <= range.e.r; ++R) {
            for (let C = 0; C <= range.e.c; ++C) {
                let cellRef = XLSX.utils.encode_cell({ c: C, r: R });
                if (!ws[cellRef]) continue;

                let cell = ws[cellRef];
                if (!cell.s) cell.s = {};

                if (C === 2 && R > 0) cell.t = 's'; // SĐT thành text

                cell.s.border = {
                    top: { style: "thin", color: { rgb: "CCCCCC" } },
                    bottom: { style: "thin", color: { rgb: "CCCCCC" } },
                    left: { style: "thin", color: { rgb: "CCCCCC" } },
                    right: { style: "thin", color: { rgb: "CCCCCC" } }
                };
                if (C === 0 || C >= 2) cell.s.alignment = { horizontal: "center", vertical: "center" };
                else cell.s.alignment = { vertical: "center" };

                if (R === 0) {
                    cell.s.font = { bold: true, color: { rgb: "FFFFFF" } };
                    if (C < 3) cell.s.fill = { fgColor: { rgb: "0070C0" } };
                    else if (C === range.e.c) cell.s.fill = { fgColor: { rgb: "DC3545" } };
                    else {
                        let nv = dsNhiemVuChon[C - 3];
                        if (nv.loai === 'TN') cell.s.fill = { fgColor: { rgb: "28A745" } };
                        else if (nv.loai === 'TL') cell.s.fill = { fgColor: { rgb: "6F42C1" } };
                        else cell.s.fill = { fgColor: { rgb: "E83E8C" } };
                    }
                } else {
                    let val = cell.v;
                    if (C > 2 && C < range.e.c) {
                        if (val === 'Chưa nộp') {
                            cell.s.fill = { fgColor: { rgb: "FFE3E6" } };
                            cell.s.font = { color: { rgb: "DC3545" }, italic: true };
                        } else if (val === 'Chưa chấm') {
                            cell.s.fill = { fgColor: { rgb: "D1ECF1" } };
                            cell.s.font = { color: { rgb: "0C5460" }, italic: true };
                        } else if (typeof val === 'number') {
                            cell.s.font = { bold: true };
                            cell.s.font.color = val < 5 ? { rgb: "DC3545" } : { rgb: "155724" };
                        }
                    }
                    if (C === range.e.c && typeof val === 'number') {
                        cell.s.font = { bold: true, color: val < 5 ? { rgb: "DC3545" } : { rgb: "28A745" } };
                        cell.s.fill = { fgColor: { rgb: "FFF5F5" } };
                    }
                }
            }
        }

        let wscols = [{ wch: 6 }, { wch: 30 }, { wch: 15 }];
        for (let i = 0; i < dsNhiemVuChon.length; i++) wscols.push({ wch: 18 });
        wscols.push({ wch: 12 });
        ws['!cols'] = wscols;

        XLSX.utils.book_append_sheet(wb, ws, "DiemTongHop");
        const fileName = `BangDiem_Lop_${maLop}_${new Date().toISOString().split('T')[0]}.xlsx`;
        XLSX.writeFile(wb, fileName);

        Swal.fire('Hoàn tất!', '✅ Bảng điểm đã được xuất ra với màu sắc đầy đủ.', 'success');

    } catch (e) {
        console.error("Lỗi xuất XLSX:", e);
        Swal.fire('Lỗi tạo file', e.message, 'error');
    }
};

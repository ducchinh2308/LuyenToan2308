
// =====================================================================
// Hàm 8.2: Load Nhiệm vụ Đa năng (Trắc Nghiệm / Tự Luận / Xem Bài / Khảo Sát)
// =====================================================================
// window.ham_8_2a_tab_nhiem_vu_bat_buoc_trac_nghiem() = async function(loaiTab = 'TRAC_NGHIEM') {
//     const vungLamViec = document.getElementById('vung-lam-viec-hoc-sinh');
//     vungLamViec.innerHTML = `<div style="text-align: center; padding: 40px;"><h3 style="color:#28a745;">⏳ Đang tải dữ liệu phân hệ ${loaiTab}...</h3></div>`;

//     try {
//         let dsLop = GocHocSinhState.danh_sach_ma_lop || [];
//         if (dsLop.length === 0) dsLop = ["#KHONG_CO_LOP#"];

//         const orQuery = dsLop.map(ma => {
//             const giaTriJson = JSON.stringify([ma]);
//             const giaTriSafe = giaTriJson.replace(/"/g, '\\"');
//             return `danh_sach_lop.cs."${giaTriSafe}"`;
//         }).join(',');

//         try {
//             const { data: dsNV, error: errNV } = await _supabase
//                 .from('nhiem_vu')
//                 .select('*')
//                 .eq('trang_thai', 1)
//                 .or(orQuery)
//                 .order('ngay_tao', { ascending: false });

//             if (errNV) throw errNV;
//             GocHocSinhState.danhSachNhiemVu = dsNV || [];
//         } catch (error) { console.error("Lỗi lấy NV:", error); }

//         let demSoLuotLam = {};
//         let ketQuaGanNhat = {};

//         try {
//             const { data: hsData } = await _supabase
//                 .from('hoc_sinh')
//                 .select('tien_do_lam_bai')
//                 .eq('uid', GocHocSinhState.uid)
//                 .single();

//             if (hsData && hsData.tien_do_lam_bai) {
//                 demSoLuotLam = typeof hsData.tien_do_lam_bai === 'string'
//                     ? JSON.parse(hsData.tien_do_lam_bai)
//                     : hsData.tien_do_lam_bai;
//             }

//             const { data: dsKQ } = await _supabase
//                 .from('ket_qua_thi')
//                 .select('id, ma_nhiem_vu, tong_diem, thoi_gian_nop, nhan_xet_gv')
//                 // HOẶC NẾU MUỐN NHANH, THẦY CÓ THỂ LẤY TẤT CẢ CÁC CỘT BẰNG DẤU *:
// //.select('*')
// .eq('uid_hoc_sinh', GocHocSinhState.uid)
//                 .order('thoi_gian_nop', { ascending: true });

//             if (dsKQ) {
//                 dsKQ.forEach(kq => {
//                     ketQuaGanNhat[kq.ma_nhiem_vu] = {
//                         id: kq.id, diem: kq.tong_diem, thoi_gian_nop: kq.thoi_gian_nop, nhan_xet_gv: kq.nhan_xet_gv
//                     };
//                 });
//             }
//         } catch (e) { console.error("Lỗi lấy điểm:", e); }

//         let tuDienLop = {};
//         let tuDienGv = {};
//         let tapUidGv = new Set();

//         const { data: dataLop } = await _supabase.from('lop_hoc').select('ma_lop, ten_lop, uid_gv_tao').in('ma_lop', dsLop);
//         if (dataLop) {
//             dataLop.forEach(l => {
//                 tuDienLop[l.ma_lop] = l.ten_lop;
//                 if (l.uid_gv_tao) tapUidGv.add(l.uid_gv_tao);
//             });
//         }

//         GocHocSinhState.danhSachNhiemVu.forEach(nv => {
//             if (nv.uid_gv_tao) tapUidGv.add(nv.uid_gv_tao);
//         });

//         if (tapUidGv.size > 0) {
//             const { data: dataGv } = await _supabase.from('hoc_sinh').select('uid, ten').in('uid', Array.from(tapUidGv));
//             if (dataGv) { dataGv.forEach(gv => tuDienGv[gv.uid] = gv.ten); }
//         }

//         // 🌟 LỌC NHIỆM VỤ THEO TAB ĐANG CHỌN 
//         const danhSachLocTheoTab = GocHocSinhState.danhSachNhiemVu.filter(nv => {
//             const tenLoai = (nv.loai_nhiem_vu || "").toLowerCase();
//             if (loaiTab === 'TRAC_NGHIEM') return tenLoai.includes('trắc nghiệm') || tenLoai.includes('làm đề');
//             if (loaiTab === 'TU_LUAN') return tenLoai.includes('tự luận');
//             if (loaiTab === 'DOC_BAI') return tenLoai.includes('bài giảng') || tenLoai.includes('đọc bài');
//             if (loaiTab === 'KHAO_SAT') return tenLoai.includes('khảo sát');
//             return true;
//         });

//         const now = new Date();
//         let dsCanLam = [], dsLamLai = [], dsChuaLamKhoa = [], dsDaLamKhoa = [];
//         const anToanThoiGian = (chuoiThoiGian) => chuoiThoiGian ? new Date(chuoiThoiGian) : null;

//         // 🌟 SỬ DỤNG MẢNG ĐÃ LỌC
//         danhSachLocTheoTab.forEach(nv => {
//             const tDong = anToanThoiGian(nv.thoi_gian_dong);
//             const soLuotDaLam = demSoLuotLam[nv.ma_nhiem_vu] || 0;
//             const gioiHanLuot = nv.so_luot_lam_bai || 0;

//             const daQuaHan = (tDong && now.getTime() > tDong.getTime());
//             const daHetLuot = (gioiHanLuot > 0 && soLuotDaLam >= gioiHanLuot);

//             // 🌟 1. ĐƯA KIỂM TRA ĐÃ CHẤM LÊN ĐÂY ĐỂ LÀM TIÊU CHÍ LỌC TAB
//             const kqLatest = ketQuaGanNhat[nv.ma_nhiem_vu];
//             const daBiKhoaCham = kqLatest && (kqLatest.trang_thai_cham === 1 || kqLatest.tong_diem !== null);

//             // // ====================================================================
//             // // 🌟 MỚI: TỰ LUẬN - LUÔN HIỆN NÚT XEM LẠI BÀI KHI ĐÃ CÓ BÀI NỘP
//             // // ====================================================================
//             // let htmlNutXemLaiBaiTuLuan = "";
//             // if (loaiTab === 'TU_LUAN' && soLuotDaLam > 0 && kqLatest) {
//             //     htmlNutXemLaiBaiTuLuan = `
//             //         <button onclick="ham_8b_10_hs_xem_lai_bai_nop('${nv.ma_nhiem_vu}', '${kqLatest.id}')" style="width: 100%; padding: 11px; background: #6f42c1; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; margin-bottom: 8px; font-size: 13px; display: flex; align-items: center; justify-content: center; gap: 5px; transition: 0.2s;" onmouseover="this.style.background='#5a32a3'" onmouseout="this.style.background='#6f42c1'">
//             //             👁️ XEM BÀI ĐÃ NỘP KHÁC
//             //         </button>
//             //     `;
//             // }


//             // 🌟 2. THÊM ĐIỀU KIỆN "daBiKhoaCham" VÀO CHỖ NÀY
//             if (daBiKhoaCham || daQuaHan || daHetLuot) {
//                 if (soLuotDaLam > 0) dsDaLamKhoa.push(nv); else dsChuaLamKhoa.push(nv);
//             } else {
//                 if (soLuotDaLam > 0) dsLamLai.push(nv); else dsCanLam.push(nv);
//             }
//         });

//         const tinhKhoangCachThoiGian = (targetDate) => {
//             if (!targetDate) return "";
//             const diff = targetDate.getTime() - now.getTime();
//             const absDiff = Math.abs(diff);
//             const d = Math.floor(absDiff / (1000 * 60 * 60 * 24));
//             const h = Math.floor((absDiff / (1000 * 60 * 60)) % 24);
//             const m = Math.floor((absDiff / (1000 * 60)) % 60);
//             let str = "";
//             if (d > 0) str += `${d} ngày `;
//             if (h > 0) str += `${h} giờ `;
//             if (m > 0 && d === 0) str += `${m} phút`;
//             if (str === "") str = "vài giây";
//             return diff > 0 ? `(Còn ${str})` : `(Đã đóng ${str} trước)`;
//         };

//         const renderCard = (nv, dinhDangTab) => {
//             const tMo = anToanThoiGian(nv.thoi_gian_mo);
//             const tDong = anToanThoiGian(nv.thoi_gian_dong);
//             const opts = { timeZone: 'Asia/Ho_Chi_Minh', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' };
//             const fTime = (d) => d ? d.toLocaleString('vi-VN', opts) : "Không quy định";

//             let tenLopHienThi = "Không xác định";
//             let chuoiMangLopGoc = "[]"; 
//             try {
//                 const mangLopCuaNV = typeof nv.danh_sach_lop === 'string' ? JSON.parse(nv.danh_sach_lop) : (nv.danh_sach_lop || []);
//                 chuoiMangLopGoc = JSON.stringify(mangLopCuaNV);
//                 const cacLopKhop = mangLopCuaNV.filter(m => dsLop.includes(m)).map(m => tuDienLop[m] || m);
//                 if (cacLopKhop.length > 0) tenLopHienThi = cacLopKhop.join(', ');
//             } catch (e) { }

//             const tenGV = tuDienGv[nv.uid_gv_tao] || "Thầy/Cô";
//             const soLuotDaLam = demSoLuotLam[nv.ma_nhiem_vu] || 0;
//             const gioiHanLuot = nv.so_luot_lam_bai || 0;
//             const textLuotChoPhep = gioiHanLuot === 0 ? "Vô hạn" : gioiHanLuot;

//             const daQuaHan = (tDong && now.getTime() > tDong.getTime());
//             const daHetLuot = (gioiHanLuot > 0 && soLuotDaLam >= gioiHanLuot);

//             let mauVien = "#28a745", textBadgeTrangThai = "";
//             if (dinhDangTab === 'CHUA_LAM_KHOA') { mauVien = "#7f8c8d"; textBadgeTrangThai = "⬛ CHƯA LÀM (QUÁ HẠN)"; }
//             else if (dinhDangTab === 'DA_LAM_KHOA') { mauVien = "#e74c3c"; textBadgeTrangThai = "🟥 ĐÃ LÀM (ĐÃ KHÓA)"; }
//             else if (dinhDangTab === 'LAM_LAI') { mauVien = "#00b4d8"; textBadgeTrangThai = "🟨 ĐÃ LÀM (CÒN LƯỢT)"; }
//             else { mauVien = "#28a745"; textBadgeTrangThai = "🟩 CHƯA LÀM (MỚI)"; }

//             const kqLatest = ketQuaGanNhat[nv.ma_nhiem_vu];

//             // 🌟 KIỂM TRA BÀI ĐÃ BỊ KHÓA CHẤM CHƯA
//             const daBiKhoaCham = kqLatest && (kqLatest.trang_thai_cham === 1 || kqLatest.tong_diem !== null);


//             // 🌟 ĐẶT Ở ĐÂY: Khai báo tường minh ở ngoài để các tab khác luôn đọc được chuỗi rỗng thay vì bị lỗi "not defined"
//             let htmlNutXemLaiBaiTuLuan = "";

//             // Nếu đúng là tab Tự luận và học sinh đã nộp bài ít nhất 1 lần thì mới dựng nút
//             if (loaiTab === 'TU_LUAN' && soLuotDaLam > 0 && kqLatest) {
//                 htmlNutXemLaiBaiTuLuan = `
//                     <button onclick="ham_8b_10_hs_xem_lai_bai_nop('${nv.ma_nhiem_vu}', '${kqLatest.id}')" style="width: 100%; padding: 11px; background: #6f42c1; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; margin-bottom: 8px; font-size: 13px; display: flex; align-items: center; justify-content: center; gap: 5px; transition: 0.2s;" onmouseover="this.style.background='#5a32a3'" onmouseout="this.style.background='#6f42c1'">
//                         👁️ XEM BÀI ĐÃ NỘP
//                     </button>
//                 `;
//             }


//             let htmlKetQua = "";
//             if (soLuotDaLam > 0 && kqLatest) {
                
//                 // 🌟 BỔ SUNG: XỬ LÝ LỜI PHÊ CỦA GIÁO VIÊN
//                 let htmlLoiPhe = "";
//                 if (kqLatest.nhan_xet_gv && kqLatest.nhan_xet_gv.trim() !== "") {
//                     htmlLoiPhe = `
//                         <div style="margin-top: 10px; padding-top: 10px; border-top: 1px dashed #fad7a1;">
//                             <div style="font-size: 11px; color: #856404; font-weight: bold; margin-bottom: 4px; display: flex; align-items: center; gap: 4px;">
//                                 📝 LỜI PHÊ CỦA GV:
//                             </div>
//                             <div style="color: #555; font-size: 13px; font-style: italic; line-height: 1.4;">
//                                 "${kqLatest.nhan_xet_gv.replace(/\n/g, '<br>')}"
//                             </div>
//                         </div>
//                     `;
//                 }

//                 htmlKetQua = `
//                     <div style="background: #fffdf5; border: 1px dashed #f39c12; border-radius: 8px; padding: 10px; margin-bottom: 12px;">
//                         <div style="display: flex; justify-content: space-between; align-items: center;">
//                             <div>
//                                 <div style="font-size: 10px; color: #d35400; font-weight: bold;">⭐ ĐIỂM SỐ ĐÃ ĐẠT:</div>
//                                 <div style="color: #c0392b; font-size: 20px; font-weight: 900;">${kqLatest.diem !== undefined ? kqLatest.diem : (kqLatest.tong_diem || '-')} <span style="font-size: 11px; font-weight: normal; color: #666;">điểm</span></div>
//                             </div>
//                             <button onclick="ham_8a_13_xem_lai_ket_qua_trac_nghiem('${nv.ma_nhiem_vu}', '${kqLatest.id}')" style="padding: 5px 10px; background: white; color: #d35400; border: 1px solid #d35400; border-radius: 4px; font-weight: bold; font-size: 11px; cursor: pointer;">👁️ XEM GIẢI</button>
//                         </div>
                        
//                         ${htmlLoiPhe}
                        
//                     </div>
//                 `;
//             }

//             // 🌟 NÚT BẤM LINH HOẠT THEO LOẠI TAB (THAY ĐỔI Ở ĐÂY)
//             let nutHanhDong = "";


//             // 🌟 KHÓA CỨNG NẾU ĐÃ CHẤM
//             if (daBiKhoaCham) {
//                 nutHanhDong = `<button disabled style="width: 100%; padding: 11px; background: #6c757d; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: not-allowed; opacity: 0.8;">
//                     🔒 ĐÃ CHẤM (KHÓA NỘP LẠI)
//                 </button>`;
//             }
//             else    if (dinhDangTab === 'CHUA_LAM_KHOA') {
//                 const tenNhiemVuAnToan = (nv.ten_nhiem_vu || "Nhiệm vụ").replace(/'/g, "\\'");
//                 nutHanhDong = `<button onclick="ham_8a_15_xin_luot_lam_bai_trac_nghiem('${nv.ma_nhiem_vu}', '${tenNhiemVuAnToan}', 'QUA_HAN')" style="width: 100%; padding: 11px; background: #7f8c8d; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">🙋 XIN NỘP QUÁ HẠN</button>`;
//             } else if (dinhDangTab === 'DA_LAM_KHOA') {
//                 const tenNhiemVuAnToan = (nv.ten_nhiem_vu || "Nhiệm vụ").replace(/'/g, "\\'");
//                 let textNutXin = daHetLuot && !daQuaHan ? "🙋 XIN THÊM LƯỢT LÀM" : "🙋 XIN GỠ ĐIỂM QUÁ HẠN";
//                 let maLoaiXin = daHetLuot && !daQuaHan ? "HET_LUOT" : "QUA_HAN";
//                 nutHanhDong = `<button onclick="ham_8a_15_xin_luot_lam_bai_trac_nghiem('${nv.ma_nhiem_vu}', '${tenNhiemVuAnToan}', '${maLoaiXin}')" style="width: 100%; padding: 11px; background: #e74c3c; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">${textNutXin}</button>`;
//             } else if (dinhDangTab === 'LAM_LAI') {
//                 let textBtn = "🔄 LÀM LẠI LẦN NỮA";
//                 if (loaiTab === 'TU_LUAN') textBtn = "🔄 NỘP LẠI ẢNH KHÁC";
//                 if (loaiTab === 'DOC_BAI') textBtn = "🔄 XEM LẠI BÀI";
//                 nutHanhDong = `<button onclick="ham_3b_18_router_vao_lam_bai('${nv.ma_nhiem_vu}', '${loaiTab}')" style="width: 100%; padding: 11px; background: #00b4d8; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">${textBtn}</button>`;
//             } else {
//                 let textBtn = "🚀 VÀO LÀM BÀI";
//                 if (loaiTab === 'TU_LUAN') textBtn = "📷 MỞ CHỤP ẢNH TỰ LUẬN";
//                 if (loaiTab === 'DOC_BAI') textBtn = "📺 VÀO XEM BÀI GIẢNG";
//                 if (loaiTab === 'KHAO_SAT') textBtn = "📊 LÀM KHẢO SÁT";
//                 nutHanhDong = `<button onclick="ham_3b_18_router_vao_lam_bai('${nv.ma_nhiem_vu}', '${loaiTab}')" style="width: 100%; padding: 11px; background: #28a745; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">${textBtn}</button>`;
//             }

//             return `
//                 <div class="card-nhiem-vu-hs" data-mangs-lop='${chuoiMangLopGoc}' style="background: white; border: 1px solid #e0e0e0; border-top: 4px solid ${mauVien}; border-radius: 10px; padding: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.02); display: flex; flex-direction: column; justify-content: space-between;">
//                     <div>
//                         <div style="font-size: 11px; font-weight: bold; color: ${mauVien}; margin-bottom: 6px; text-transform: uppercase;">${textBadgeTrangThai}</div>
//                         <h4 style="margin: 0 0 10px 0; color: #2c3e50; font-size: 15px; line-height: 1.4;">${nv.ten_nhiem_vu}</h4>
//                         <div style="background: #f8f9fa; border-radius: 6px; padding: 8px; margin-bottom: 10px; font-size: 12px; color: #666;">
//                             <div>🏫 <b>Lớp:</b> ${tenLopHienThi}</div>
//                             <div>👤 <b>Thầy/Cô:</b> ${tenGV}</div>
//                         </div>
//                         <div style="display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 10px;">
//                             <span style="font-size: 11px; background: #e9ecef; color: #495057; padding: 2px 6px; border-radius:4px;">⏱️ ${nv.thoi_gian_lam_bai > 0 ? nv.thoi_gian_lam_bai + ' ph' : 'Tự do'}</span>
//                             <span style="font-size: 11px; background: #e9ecef; color: #495057; padding: 2px 6px; border-radius:4px;">🔄 Lượt: ${soLuotDaLam}/${textLuotChoPhep}</span>
//                         </div>
//                         <div style="font-size: 11px; color: #7f8c8d; margin-bottom: 12px;">
//                             <span style="color:#7f8c8d; font-weight:bold;">Hạn chót:</span> ${fTime(tDong)} <br>
//                             <span style="color:#d35400; font-style:italic;">${tDong && !daQuaHan ? tinhKhoangCachThoiGian(tDong) : ""}</span>
//                         </div>
//                     </div>
//                     <div>
//                         ${htmlKetQua}
//                         ${htmlNutXemLaiBaiTuLuan}
//                         ${nutHanhDong}
//                     </div>
//                 </div>
//             `;
//         };

//         // Giữ nguyên giao diện Tab Cần Làm/Làm Lại... của thầy
//         vungLamViec.innerHTML = `
//             <div id="thanh-loc-lop-goc-hoc-sing" style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 15px; padding: 10px; background: #fff; border-radius: 8px; border: 1px dashed #ced4da; align-items: center;">
//                 <span style="font-weight: bold; color: #495057; font-size: 13px;">🏫 Lớp đang xem:</span>
//                 <button class="btn-loc-lop-cua-hs active" onclick="ham_8a_16_loc_card_theo_lop_trac_nghiem('TAT_CA', this)" style="padding: 5px 12px; background: #6f42c1; color: white; border: 1px solid #6f42c1; border-radius: 15px; font-weight: bold; cursor: pointer; font-size: 12px; transition: 0.2s;">🌍 Tất cả các lớp</button>
//                 <span id="cac-nut-lop-hs-loc" style="display: flex; gap: 8px; flex-wrap: wrap;"></span>
//             </div>

//             <div style="display: flex; border-bottom: 2px solid #dee2e6; margin-bottom: 20px; gap: 5px; background: #fff; padding: 5px 5px 0 5px; border-radius: 8px 8px 0 0; flex-wrap: wrap;">
//                 <button id="btn-tab-can-lam" onclick="ham_3b_17_switch_sub_tab('CAN_LAM')" style="padding: 10px 16px; border: none; background: #28a745; color: white; font-weight: bold; font-size: 13px; border-radius: 6px 6px 0 0; cursor: pointer; transition: 0.2s;">🎯 CẦN LÀM (${dsCanLam.length})</button>
//                 <button id="btn-tab-lam-lai" onclick="ham_3b_17_switch_sub_tab('LAM_LAI')" style="padding: 10px 16px; border: none; background: transparent; color: #495057; font-weight: bold; font-size: 13px; border-radius: 6px 6px 0 0; cursor: pointer; transition: 0.2s;">🔄 ĐÃ LÀM (CÒN LƯỢT) (${dsLamLai.length})</button>
//                 <button id="btn-tab-chua-lam-khoa" onclick="ham_3b_17_switch_sub_tab('CHUA_LAM_KHOA')" style="padding: 10px 16px; border: none; background: transparent; color: #495057; font-weight: bold; font-size: 13px; border-radius: 6px 6px 0 0; cursor: pointer; transition: 0.2s;">⬛ CHƯA LÀM (ĐÃ KHÓA) (${dsChuaLamKhoa.length})</button>
//                 <button id="btn-tab-da-lam-khoa" onclick="ham_3b_17_switch_sub_tab('DA_LAM_KHOA')" style="padding: 10px 16px; border: none; background: transparent; color: #495057; font-weight: bold; font-size: 13px; border-radius: 6px 6px 0 0; cursor: pointer; transition: 0.2s;">🟥 ĐÃ LÀM (ĐÃ KHÓA) (${dsDaLamKhoa.length})</button>
//             </div>

//             <div id="vung-chua-cards-nhiem-vu" style="min-height: 200px;"></div>
//         `;

//         const khungNutLopCuaHs = document.getElementById('cac-nut-lop-hs-loc');
//         if (khungNutLopCuaHs && dataLop) {
//             let htmlNutLop = '';
//             dataLop.forEach(l => {
//                 htmlNutLop += `<button class="btn-loc-lop-cua-hs" onclick="ham_8a_16_loc_card_theo_lop_trac_nghiem('${l.ma_lop}', this)" style="padding: 5px 12px; background: white; color: #495057; border: 1px solid #ced4da; border-radius: 15px; font-weight: bold; cursor: pointer; font-size: 12px; transition: 0.2s;" onmouseover="this.style.background='#f1f3f4'" onmouseout="if(!this.classList.contains('active')) this.style.background='white'">🏫 ${l.ten_lop}</button>`;
//             });
//             khungNutLopCuaHs.innerHTML = htmlNutLop;
//         }

//         window.MaLopDangLocHienTai = 'TAT_CA';

//         window.CachedCardsCanLamHtml = dsCanLam.length === 0 ? '<div style="text-align:center; color:#7f8c8d; padding: 40px; font-style:italic; background:white; border-radius:8px; border:1px dashed #ccc;">Tuyệt vời! Em đã hoàn thành sạch sẽ.</div>' : `<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 15px;">${dsCanLam.map(nv => renderCard(nv, 'CAN_LAM')).join('')}</div>`;
//         window.CachedCardsLamLaiHtml = dsLamLai.length === 0 ? '<div style="text-align:center; color:#7f8c8d; padding: 40px; font-style:italic; background:white; border-radius:8px; border:1px dashed #ccc;">Không có bài tập nào.</div>' : `<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 15px;">${dsLamLai.map(nv => renderCard(nv, 'LAM_LAI')).join('')}</div>`;
//         window.CachedCardsChuaLamKhoaHtml = dsChuaLamKhoa.length === 0 ? '<div style="text-align:center; color:#28a745; padding: 40px; font-style:italic; background:white; border-radius:8px; font-weight:bold;">✅ Rất tốt! Không bỏ sót bài nào!</div>' : `<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 15px;">${dsChuaLamKhoa.map(nv => renderCard(nv, 'CHUA_LAM_KHOA')).join('')}</div>`;
//         window.CachedCardsDaLamKhoaHtml = dsDaLamKhoa.length === 0 ? '<div style="text-align:center; color:#7f8c8d; padding: 40px; font-style:italic; background:white; border-radius:8px; border:1px dashed #ccc;">Trống.</div>' : `<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 15px;">${dsDaLamKhoa.map(nv => renderCard(nv, 'DA_LAM_KHOA')).join('')}</div>`;

//         window.ham_3b_17_switch_sub_tab('CAN_LAM');

//     } catch (error) {
//         vungLamViec.innerHTML = `<div style="color: red; text-align: center; padding: 20px;">❌ Lỗi hệ thống: ${error.message}</div>`;
//     }
// }

// // =====================================================================
// // Hàm 8.2 (A): Load Nhiệm vụ TRẮC NGHIỆM
// // =====================================================================
// window.ham_8a_2_tab_nhiem_vu_trac_nghiem = async function() {
//     const vungLamViec = document.getElementById('vung-lam-viec-hoc-sinh');
//     vungLamViec.innerHTML = `<div style="text-align: center; padding: 40px;"><h3 style="color:#1a73e8;">⏳ Đang tải dữ liệu phân hệ Trắc Nghiệm...</h3></div>`;

//     try {
//         let dsLop = GocHocSinhState.danh_sach_ma_lop || [];
//         if (dsLop.length === 0) dsLop = ["#KHONG_CO_LOP#"];

//         const orQuery = dsLop.map(ma => {
//             const giaTriJson = JSON.stringify([ma]);
//             return `danh_sach_lop.cs."${giaTriJson.replace(/"/g, '\\"')}"`;
//         }).join(',');

//         // 1. TẢI TỪ BẢNG NHIỆM VỤ TRẮC NGHIỆM
//         try {
//             const { data: dsNV, error: errNV } = await _supabase
//                 .from('nhiem_vu_trac_nghiem')
//                 .select('*')
//                 .eq('trang_thai', 1)
//                 .or(orQuery)
//                 .order('ngay_tao', { ascending: false });

//             if (errNV) throw errNV;
//             GocHocSinhState.danhSachNhiemVu = dsNV || [];
//         } catch (error) { console.error("Lỗi lấy NV Trắc Nghiệm:", error); }

//         let demSoLuotLam = {};
//         let ketQuaGanNhat = {};

//         // 2. TẢI TỪ BẢNG KẾT QUẢ TRẮC NGHIỆM
//         try {
//             const { data: hsData } = await _supabase.from('hoc_sinh').select('tien_do_lam_bai').eq('uid', GocHocSinhState.uid).single();
//             if (hsData && hsData.tien_do_lam_bai) {
//                 demSoLuotLam = typeof hsData.tien_do_lam_bai === 'string' ? JSON.parse(hsData.tien_do_lam_bai) : hsData.tien_do_lam_bai;
//             }

//             const { data: dsKQ } = await _supabase
//                 .from('ket_qua_trac_nghiem')
//                 .select('id, ma_nhiem_vu, tong_diem, thoi_gian_nop, nhan_xet_gv, trang_thai_cham')
//                 .eq('uid_hoc_sinh', GocHocSinhState.uid)
//                 .order('thoi_gian_nop', { ascending: true });

//             if (dsKQ) {
//                 dsKQ.forEach(kq => {
//                     ketQuaGanNhat[kq.ma_nhiem_vu] = { id: kq.id, diem: kq.tong_diem, thoi_gian_nop: kq.thoi_gian_nop, nhan_xet_gv: kq.nhan_xet_gv, trang_thai_cham: kq.trang_thai_cham };
//                 });
//             }
//         } catch (e) { console.error("Lỗi lấy điểm Trắc Nghiệm:", e); }

//         let tuDienLop = {}; let tuDienGv = {}; let tapUidGv = new Set();
//         const { data: dataLop } = await _supabase.from('lop_hoc').select('ma_lop, ten_lop, uid_gv_tao').in('ma_lop', dsLop);
//         if (dataLop) {
//             dataLop.forEach(l => { tuDienLop[l.ma_lop] = l.ten_lop; if (l.uid_gv_tao) tapUidGv.add(l.uid_gv_tao); });
//         }
//         GocHocSinhState.danhSachNhiemVu.forEach(nv => { if (nv.uid_gv_tao) tapUidGv.add(nv.uid_gv_tao); });
//         if (tapUidGv.size > 0) {
//             const { data: dataGv } = await _supabase.from('hoc_sinh').select('uid, ten').in('uid', Array.from(tapUidGv));
//             if (dataGv) { dataGv.forEach(gv => tuDienGv[gv.uid] = gv.ten); }
//         }

//         // =====================================================================
//         // 3. LOGIC PHÂN LOẠI CHÍNH XÁC (DỰA VÀO LƯỢT VÀ THỜI GIAN)
//         // =====================================================================
//         const now = new Date();
//         let dsCanLam = [], dsLamLai = [], dsChuaLamKhoa = [], dsDaLamKhoa = [];
//         const anToanThoiGian = (chuoiThoiGian) => chuoiThoiGian ? new Date(chuoiThoiGian) : null;

//         GocHocSinhState.danhSachNhiemVu.forEach(nv => {
//             const tDong = anToanThoiGian(nv.thoi_gian_dong);
//             const soLuotDaLam = demSoLuotLam[nv.ma_nhiem_vu] || 0;
//             const gioiHanLuot = parseInt(nv.so_luot_lam_bai) || 0; // 0 = Vô hạn
            
//             const daQuaHan = (tDong && now.getTime() > tDong.getTime());
            
//             // Logic: Đã hết lượt nếu (Giới hạn > 0) VÀ (Đã làm >= Giới hạn)
//             const daHetLuot = (gioiHanLuot > 0 && soLuotDaLam >= gioiHanLuot);

//             if (soLuotDaLam === 0) {
//                 // --- NHÓM CHƯA LÀM ---
//                 if (daQuaHan) {
//                     dsChuaLamKhoa.push(nv); // Chưa làm mà đã hết hạn
//                 } else {
//                     dsCanLam.push(nv); // Chưa làm, còn hạn
//                 }
//             } else {
//                 // --- NHÓM ĐÃ LÀM (N > 0) ---
//                 // Bài bị khóa nếu: Đã quá hạn HOẶC đã làm hết lượt cho phép
//                 if (daQuaHan || daHetLuot) {
//                     dsDaLamKhoa.push(nv);
//                 } else {
//                     dsLamLai.push(nv); // Còn hạn VÀ còn lượt làm
//                 }
//             }
//         });

//         const tinhKhoangCachThoiGian = (targetDate) => {
//             if (!targetDate) return "";
//             const diff = targetDate.getTime() - now.getTime();
//             const d = Math.floor(Math.abs(diff) / (1000 * 60 * 60 * 24));
//             const h = Math.floor((Math.abs(diff) / (1000 * 60 * 60)) % 24);
//             const m = Math.floor((Math.abs(diff) / (1000 * 60)) % 60);
//             let str = "";
//             if (d > 0) str += `${d} ngày `; if (h > 0) str += `${h} giờ `; if (m > 0 && d === 0) str += `${m} phút`;
//             return diff > 0 ? `(Còn ${str || "vài giây"})` : `(Đã đóng ${str || "vài giây"} trước)`;
//         };

//         const renderCard = (nv, dinhDangTab) => {
//             const tDong = anToanThoiGian(nv.thoi_gian_dong);
//             const fTime = (d) => d ? d.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }) : "Không quy định";
            
//             let tenLopHienThi = "Không xác định"; let chuoiMangLopGoc = "[]"; 
//             try {
//                 const mangLopCuaNV = typeof nv.danh_sach_lop === 'string' ? JSON.parse(nv.danh_sach_lop) : (nv.danh_sach_lop || []);
//                 chuoiMangLopGoc = JSON.stringify(mangLopCuaNV);
//                 const cacLopKhop = mangLopCuaNV.filter(m => dsLop.includes(m)).map(m => tuDienLop[m] || m);
//                 if (cacLopKhop.length > 0) tenLopHienThi = cacLopKhop.join(', ');
//             } catch (e) { }

//             const tenGV = tuDienGv[nv.uid_gv_tao] || "Thầy/Cô";
//             const soLuotDaLam = demSoLuotLam[nv.ma_nhiem_vu] || 0;
//             const gioiHanLuot = nv.so_luot_lam_bai || 0;
//             const daQuaHan = (tDong && now.getTime() > tDong.getTime());
//             const daHetLuot = (gioiHanLuot > 0 && soLuotDaLam >= gioiHanLuot);

//             let mauVien = "#28a745", textBadgeTrangThai = "";
//             if (dinhDangTab === 'CHUA_LAM_KHOA') { mauVien = "#7f8c8d"; textBadgeTrangThai = "⬛ CHƯA LÀM (QUÁ HẠN)"; }
//             else if (dinhDangTab === 'DA_LAM_KHOA') { mauVien = "#e74c3c"; textBadgeTrangThai = "🟥 ĐÃ LÀM (ĐÃ KHÓA)"; }
//             else if (dinhDangTab === 'LAM_LAI') { mauVien = "#00b4d8"; textBadgeTrangThai = "🟨 ĐÃ LÀM (CÒN LƯỢT)"; }
//             else { mauVien = "#28a745"; textBadgeTrangThai = "🟩 CHƯA LÀM (MỚI)"; }

//             const kqLatest = ketQuaGanNhat[nv.ma_nhiem_vu];
//             //const daBiKhoaGiaoVien = kqLatest && kqLatest.trang_thai_cham === 1;

//             let htmlKetQua = "";
//             if (soLuotDaLam > 0 && kqLatest) {
//                 htmlKetQua = `
//                     <div style="background: #fffdf5; border: 1px dashed #f39c12; border-radius: 8px; padding: 10px; margin-bottom: 12px;">
//                         <div style="display: flex; justify-content: space-between; align-items: center;">
//                             <div>
//                                 <div style="font-size: 10px; color: #d35400; font-weight: bold;">⭐ ĐIỂM SỐ ĐÃ ĐẠT:</div>
//                                 <div style="color: #c0392b; font-size: 20px; font-weight: 900;">${kqLatest.diem !== undefined ? kqLatest.diem : (kqLatest.tong_diem || '-')} <span style="font-size: 11px; font-weight: normal; color: #666;">điểm</span></div>
//                             </div>
//                             <button onclick="ham_8a_13_xem_lai_ket_qua_trac_nghiem('${nv.ma_nhiem_vu}', '${kqLatest.id}')" style="padding: 5px 10px; background: white; color: #d35400; border: 1px solid #d35400; border-radius: 4px; font-weight: bold; font-size: 11px; cursor: pointer;">👁️ XEM GIẢI</button>
//                         </div>
//                     </div>
//                 `;
//             }

//             let nutHanhDong = "";
//             // if (daBiKhoaGiaoVien) {
//             //     //nutHanhDong = `<button disabled style="width: 100%; padding: 11px; background: #6c757d; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: not-allowed; opacity: 0.8;">🔒 ĐÃ CHẤM (KHÓA NỘP LẠI)</button>`;
//             // } else 
//             if (dinhDangTab === 'CHUA_LAM_KHOA') {
//                 const safeName = (nv.ten_nhiem_vu || "Nhiệm vụ").replace(/'/g, "\\'");
//                 nutHanhDong = `<button onclick="ham_8a_15_xin_luot_lam_bai_trac_nghiem('${nv.ma_nhiem_vu}', '${safeName}', 'QUA_HAN')" style="width: 100%; padding: 11px; background: #7f8c8d; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">🙋 XIN NỘP QUÁ HẠN</button>`;
//             } else if (dinhDangTab === 'DA_LAM_KHOA') {
//                 const safeName = (nv.ten_nhiem_vu || "Nhiệm vụ").replace(/'/g, "\\'");
//                 const loaiXin = (daHetLuot && !daQuaHan) ? "HET_LUOT" : "QUA_HAN";
//                 const btnText = (daHetLuot && !daQuaHan) ? "🙋 XIN THÊM LƯỢT LÀM" : "🙋 XIN GỠ ĐIỂM QUÁ HẠN";
//                 nutHanhDong = `<button onclick="ham_8a_15_xin_luot_lam_bai_trac_nghiem('${nv.ma_nhiem_vu}', '${safeName}', '${loaiXin}')" style="width: 100%; padding: 11px; background: #e74c3c; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">${btnText}</button>`;
//             } else if (dinhDangTab === 'LAM_LAI') {
//                 nutHanhDong = `<button onclick="ham_8a_24_vao_lam_bai_trac_nghiem('${nv.ma_nhiem_vu}')" style="width: 100%; padding: 11px; background: #00b4d8; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">🔄 LÀM LẠI LẦN NỮA</button>`;
//             } else {
//                 nutHanhDong = `<button onclick="ham_8a_24_vao_lam_bai_trac_nghiem('${nv.ma_nhiem_vu}')" style="width: 100%; padding: 11px; background: #28a745; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">🚀 VÀO LÀM BÀI</button>`;
//             }

//             return `
//                 <div class="card-nhiem-vu-hs" data-mangs-lop='${chuoiMangLopGoc}' style="background: white; border: 1px solid #e0e0e0; border-top: 4px solid ${mauVien}; border-radius: 10px; padding: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.02); display: flex; flex-direction: column; justify-content: space-between;">
//                     <div>
//                         <div style="font-size: 11px; font-weight: bold; color: ${mauVien}; margin-bottom: 6px; text-transform: uppercase;">${textBadgeTrangThai}</div>
//                         <h4 style="margin: 0 0 10px 0; color: #2c3e50; font-size: 15px; line-height: 1.4;">${nv.ten_nhiem_vu}</h4>
//                         <div style="background: #f8f9fa; border-radius: 6px; padding: 8px; margin-bottom: 10px; font-size: 12px; color: #666;">
//                             <div>🏫 <b>Lớp:</b> ${tenLopHienThi}</div>
//                             <div>👤 <b>Thầy/Cô:</b> ${tenGV}</div>
//                         </div>
//                         <div style="display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 10px;">
//                             <span style="font-size: 11px; background: #e9ecef; color: #495057; padding: 2px 6px; border-radius:4px;">⏱️ ${nv.thoi_gian_lam_bai > 0 ? nv.thoi_gian_lam_bai + ' ph' : 'Tự do'}</span>
//                             <span style="font-size: 11px; background: #e9ecef; color: #495057; padding: 2px 6px; border-radius:4px;">🔄 Lượt: ${soLuotDaLam}/${gioiHanLuot===0?"Vô hạn":gioiHanLuot}</span>
//                         </div>
//                         <div style="font-size: 11px; color: #7f8c8d; margin-bottom: 12px;">
//                             <span style="color:#7f8c8d; font-weight:bold;">Hạn chót:</span> ${fTime(tDong)} <br>
//                             <span style="color:#d35400; font-style:italic;">${tDong && !daQuaHan ? tinhKhoangCachThoiGian(tDong) : ""}</span>
//                         </div>
//                     </div>
//                     <div>
//                         ${htmlKetQua}
//                         ${nutHanhDong}
//                     </div>
//                 </div>
//             `;
//         };

//         vungLamViec.innerHTML = `
//             <div id="thanh-loc-lop-goc-hoc-sing" style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 15px; padding: 10px; background: #fff; border-radius: 8px; border: 1px dashed #ced4da; align-items: center;">
//                 <span style="font-weight: bold; color: #495057; font-size: 13px;">🏫 Lớp đang xem:</span>
//                 <button class="btn-loc-lop-cua-hs active" onclick="ham_8a_16_loc_card_theo_lop_trac_nghiem('TAT_CA', this)" style="padding: 5px 12px; background: #1a73e8; color: white; border: 1px solid #1a73e8; border-radius: 15px; font-weight: bold; cursor: pointer; font-size: 12px; transition: 0.2s;">🌍 Tất cả các lớp</button>
//                 <span id="cac-nut-lop-hs-loc" style="display: flex; gap: 8px; flex-wrap: wrap;"></span>
//             </div>

//             <div style="display: flex; border-bottom: 2px solid #dee2e6; margin-bottom: 20px; gap: 5px; background: #fff; padding: 5px 5px 0 5px; border-radius: 8px 8px 0 0; flex-wrap: wrap;">
//                 <button id="btn-tab-can-lam" onclick="ham_3b_17_switch_sub_tab('CAN_LAM')" style="padding: 10px 16px; border: none; background: #28a745; color: white; font-weight: bold; font-size: 13px; border-radius: 6px 6px 0 0; cursor: pointer;">🎯 CẦN LÀM (${dsCanLam.length})</button>
//                 <button id="btn-tab-lam-lai" onclick="ham_3b_17_switch_sub_tab('LAM_LAI')" style="padding: 10px 16px; border: none; background: transparent; color: #495057; font-weight: bold; font-size: 13px; border-radius: 6px 6px 0 0; cursor: pointer;">🔄 ĐÃ LÀM (CÒN LƯỢT) (${dsLamLai.length})</button>
//                 <button id="btn-tab-chua-lam-khoa" onclick="ham_3b_17_switch_sub_tab('CHUA_LAM_KHOA')" style="padding: 10px 16px; border: none; background: transparent; color: #495057; font-weight: bold; font-size: 13px; border-radius: 6px 6px 0 0; cursor: pointer;">⬛ CHƯA LÀM (ĐÃ KHÓA) (${dsChuaLamKhoa.length})</button>
//                 <button id="btn-tab-da-lam-khoa" onclick="ham_3b_17_switch_sub_tab('DA_LAM_KHOA')" style="padding: 10px 16px; border: none; background: transparent; color: #495057; font-weight: bold; font-size: 13px; border-radius: 6px 6px 0 0; cursor: pointer;">🟥 ĐÃ LÀM (ĐÃ KHÓA) (${dsDaLamKhoa.length})</button>
//             </div>

//             <div id="vung-chua-cards-nhiem-vu" style="min-height: 200px;"></div>
//         `;

//         const khungNutLopCuaHs = document.getElementById('cac-nut-lop-hs-loc');
//         if (khungNutLopCuaHs && dataLop) {
//             khungNutLopCuaHs.innerHTML = dataLop.map(l => `<button class="btn-loc-lop-cua-hs" onclick="ham_8a_16_loc_card_theo_lop_trac_nghiem('${l.ma_lop}', this)" style="padding: 5px 12px; background: white; color: #495057; border: 1px solid #ced4da; border-radius: 15px; font-weight: bold; cursor: pointer; font-size: 12px;">🏫 ${l.ten_lop}</button>`).join('');
//         }

//         window.MaLopDangLocHienTai = 'TAT_CA';
//         window.CachedCardsCanLamHtml = dsCanLam.length === 0 ? '<div style="text-align:center; color:#7f8c8d; padding: 40px;">Hoàn thành sạch sẽ!</div>' : `<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 15px;">${dsCanLam.map(nv => renderCard(nv, 'CAN_LAM')).join('')}</div>`;
//         window.CachedCardsLamLaiHtml = dsLamLai.length === 0 ? '<div style="text-align:center; color:#7f8c8d; padding: 40px;">Không có bài tập.</div>' : `<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 15px;">${dsLamLai.map(nv => renderCard(nv, 'LAM_LAI')).join('')}</div>`;
//         window.CachedCardsChuaLamKhoaHtml = dsChuaLamKhoa.length === 0 ? '<div style="text-align:center; color:#28a745; padding: 40px;">✅ Không bỏ sót bài nào!</div>' : `<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 15px;">${dsChuaLamKhoa.map(nv => renderCard(nv, 'CHUA_LAM_KHOA')).join('')}</div>`;
//         window.CachedCardsDaLamKhoaHtml = dsDaLamKhoa.length === 0 ? '<div style="text-align:center; color:#7f8c8d; padding: 40px;">Trống.</div>' : `<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 15px;">${dsDaLamKhoa.map(nv => renderCard(nv, 'DA_LAM_KHOA')).join('')}</div>`;

//         window.ham_3b_17_switch_sub_tab('CAN_LAM');

//     } catch (error) { vungLamViec.innerHTML = `<div style="color: red; text-align: center; padding: 20px;">❌ Lỗi hệ thống: ${error.message}</div>`; }
// };


// =====================================================================
// Hàm 8.2 (A): Load Nhiệm vụ TRẮC NGHIỆM
// =====================================================================
window.ham_8a_2_tab_nhiem_vu_trac_nghiem = async function () {
    const vungLamViec = document.getElementById('vung-lam-viec-hoc-sinh');
    vungLamViec.innerHTML = `<div style="text-align: center; padding: 40px;"><h3 style="color:#1a73e8;">⏳ Đang tải dữ liệu phân hệ Trắc Nghiệm...</h3></div>`;

    try {
        let dsLop = GocHocSinhState.danh_sach_ma_lop || [];
        if (dsLop.length === 0) dsLop = ["#KHONG_CO_LOP#"];

        const orQuery = dsLop.map(ma => {
            const giaTriJson = JSON.stringify([ma]);
            return `danh_sach_lop.cs."${giaTriJson.replace(/"/g, '\\"')}"`;
        }).join(',');

        // 1. TẢI TỪ BẢNG NHIỆM VỤ TRẮC NGHIỆM
        try {
            const { data: dsNV, error: errNV } = await _supabase
                .from('nhiem_vu_trac_nghiem')
                .select('*')
                .eq('trang_thai', 1)
                .or(orQuery)
                .order('ngay_tao', { ascending: false });

            if (errNV) throw errNV;
            GocHocSinhState.danhSachNhiemVu = dsNV || [];
        } catch (error) { console.error("Lỗi lấy NV Trắc Nghiệm:", error); }

        let demSoLuotLam = {};
        let ketQuaGanNhat = {};

        // 2. TẢI TỪ BẢNG KẾT QUẢ TRẮC NGHIỆM
        try {
            const { data: hsData } = await _supabase.from('hoc_sinh').select('tien_do_lam_bai').eq('uid', GocHocSinhState.uid).single();
            if (hsData && hsData.tien_do_lam_bai) {
                demSoLuotLam = typeof hsData.tien_do_lam_bai === 'string' ? JSON.parse(hsData.tien_do_lam_bai) : hsData.tien_do_lam_bai;
            }

            const { data: dsKQ } = await _supabase
                .from('ket_qua_trac_nghiem')
                .select('id, ma_nhiem_vu, tong_diem, thoi_gian_nop, nhan_xet_gv, trang_thai_cham')
                .eq('uid_hoc_sinh', GocHocSinhState.uid)
                .order('thoi_gian_nop', { ascending: true });

            if (dsKQ) {
                dsKQ.forEach(kq => {
                    ketQuaGanNhat[kq.ma_nhiem_vu] = { id: kq.id, diem: kq.tong_diem, thoi_gian_nop: kq.thoi_gian_nop, nhan_xet_gv: kq.nhan_xet_gv, trang_thai_cham: kq.trang_thai_cham };
                });
            }
        } catch (e) { console.error("Lỗi lấy điểm Trắc Nghiệm:", e); }

        // Tải từ điển lớp học và danh sách UID giáo viên
        let tuDienLop = {}; let tuDienGv = {}; let tapUidGv = new Set();
        const { data: dataLop } = await _supabase.from('lop_hoc').select('ma_lop, ten_lop, uid_gv_tao').in('ma_lop', dsLop);
        if (dataLop) {
            dataLop.forEach(l => { tuDienLop[l.ma_lop] = l.ten_lop; if (l.uid_gv_tao) tapUidGv.add(l.uid_gv_tao); });
        }
        GocHocSinhState.danhSachNhiemVu.forEach(nv => { if (nv.uid_gv_tao) tapUidGv.add(nv.uid_gv_tao); });
        if (tapUidGv.size > 0) {
            const { data: dataGv } = await _supabase.from('hoc_sinh').select('uid, ten').in('uid', Array.from(tapUidGv));
            if (dataGv) { dataGv.forEach(gv => tuDienGv[gv.uid] = gv.ten); }
        }

        // =====================================================================
        // 🌟 TỰ ĐỘNG TẢI CẤU TRÚC ĐỀ TỪ BẢNG HỌC LIỆU TRẮC NGHIỆM (THÊM MỚI CHỖ NÀY)
        // =====================================================================
        let tuDienCauTruc = {};
        let tapMaHocLieu = new Set();
        GocHocSinhState.danhSachNhiemVu.forEach(nv => { if (nv.ma_hoc_lieu) tapMaHocLieu.add(nv.ma_hoc_lieu); });

        if (tapMaHocLieu.size > 0) {
            try {
                const { data: dataHL } = await _supabase
                    .from('hoc_lieu_trac_nghiem')
                    .select('ma_hoc_lieu, metadata')
                    .in('ma_hoc_lieu', Array.from(tapMaHocLieu));

                if (dataHL) {
                    dataHL.forEach(hl => {
                        if (hl.metadata) {
                            try {
                                const meta = typeof hl.metadata === 'string' ? JSON.parse(hl.metadata) : hl.metadata;
                                if (meta && meta.cau_truc) {
                                    tuDienCauTruc[hl.ma_hoc_lieu] = meta.cau_truc;
                                }
                            } catch (e) { console.error("Lỗi phân giải metadata của học liệu:", hl.ma_hoc_lieu, e); }
                        }
                    });
                }
            } catch (errHL) { console.error("Lỗi lấy thông tin học liệu cấu trúc:", errHL); }
        }

        // =====================================================================
        // 3. LOGIC PHÂN LOẠI CHÍNH XÁC (DỰA VÀO LƯỢT VÀ THỜI GIAN)
        // =====================================================================
        const now = new Date();
        let dsCanLam = [], dsLamLai = [], dsChuaLamKhoa = [], dsDaLamKhoa = [];
        const anToanThoiGian = (chuoiThoiGian) => chuoiThoiGian ? new Date(chuoiThoiGian) : null;

        GocHocSinhState.danhSachNhiemVu.forEach(nv => {
            const tDong = anToanThoiGian(nv.thoi_gian_dong);
            const soLuotDaLam = demSoLuotLam[nv.ma_nhiem_vu] || 0;
            const gioiHanLuot = parseInt(nv.so_luot_lam_bai) || 0; // 0 = Vô hạn

            const daQuaHan = (tDong && now.getTime() > tDong.getTime());
            const daHetLuot = (gioiHanLuot > 0 && soLuotDaLam >= gioiHanLuot);

            if (soLuotDaLam === 0) {
                if (daQuaHan) { dsChuaLamKhoa.push(nv); } else { dsCanLam.push(nv); }
            } else {
                if (daQuaHan || daHetLuot) { dsDaLamKhoa.push(nv); } else { dsLamLai.push(nv); }
            }
        });

        const tinhKhoangCachThoiGian = (targetDate) => {
            if (!targetDate) return "";
            const diff = targetDate.getTime() - now.getTime();
            const d = Math.floor(Math.abs(diff) / (1000 * 60 * 60 * 24));
            const h = Math.floor((Math.abs(diff) / (1000 * 60 * 60)) % 24);
            const m = Math.floor((Math.abs(diff) / (1000 * 60)) % 60);
            let str = "";
            if (d > 0) str += `${d} ngày `; if (h > 0) str += `${h} giờ `; if (m > 0 && d === 0) str += `${m} phút`;
            return diff > 0 ? `(Còn ${str || "vài giây"})` : `(Đã đóng ${str || "vài giây"} trước)`;
        };

        const renderCard = (nv, dinhDangTab) => {
            const tDong = anToanThoiGian(nv.thoi_gian_dong);
            const fTime = (d) => d ? d.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }) : "Không quy định";

            let tenLopHienThi = "Không xác định"; let chuoiMangLopGoc = "[]";
            try {
                const mangLopCuaNV = typeof nv.danh_sach_lop === 'string' ? JSON.parse(nv.danh_sach_lop) : (nv.danh_sach_lop || []);
                chuoiMangLopGoc = JSON.stringify(mangLopCuaNV);
                const cacLopKhop = mangLopCuaNV.filter(m => dsLop.includes(m)).map(m => tuDienLop[m] || m);
                if (cacLopKhop.length > 0) tenLopHienThi = cacLopKhop.join(', ');
            } catch (e) { }

            const tenGV = tuDienGv[nv.uid_gv_tao] || "Thầy/Cô";

            // 🌟 Lấy cấu trúc đề từ Từ điển vừa tạo (THÊM MỚI)
            const cauTrucHL = tuDienCauTruc[nv.ma_hoc_lieu] || "Chưa có cấu trúc";

            const soLuotDaLam = demSoLuotLam[nv.ma_nhiem_vu] || 0;
            const gioiHanLuot = nv.so_luot_lam_bai || 0;
            const daQuaHan = (tDong && now.getTime() > tDong.getTime());
            const daHetLuot = (gioiHanLuot > 0 && soLuotDaLam >= gioiHanLuot);

            let mauVien = "#28a745", textBadgeTrangThai = "";
            if (dinhDangTab === 'CHUA_LAM_KHOA') { mauVien = "#7f8c8d"; textBadgeTrangThai = "⬛ CHƯA LÀM (QUÁ HẠN)"; }
            else if (dinhDangTab === 'DA_LAM_KHOA') { mauVien = "#e74c3c"; textBadgeTrangThai = "🟥 ĐÃ LÀM (ĐÃ KHÓA)"; }
            else if (dinhDangTab === 'LAM_LAI') { mauVien = "#00b4d8"; textBadgeTrangThai = "🟨 ĐÃ LÀM (CÒN LƯỢT)"; }
            else { mauVien = "#28a745"; textBadgeTrangThai = "🟩 CHƯA LÀM (MỚI)"; }

            const kqLatest = ketQuaGanNhat[nv.ma_nhiem_vu];

            let htmlKetQua = "";
            if (soLuotDaLam > 0 && kqLatest) {
                htmlKetQua = `
                    <div style="background: #fffdf5; border: 1px dashed #f39c12; border-radius: 8px; padding: 10px; margin-bottom: 12px;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <div style="font-size: 10px; color: #d35400; font-weight: bold;">⭐ ĐIỂM SỐ ĐÃ ĐẠT:</div>
                                <div style="color: #c0392b; font-size: 20px; font-weight: 900;">${kqLatest.diem !== undefined ? kqLatest.diem : (kqLatest.tong_diem || '-')} <span style="font-size: 11px; font-weight: normal; color: #666;">điểm</span></div>
                            </div>
                            <button onclick="ham_8a_13_xem_lai_ket_qua_trac_nghiem('${nv.ma_nhiem_vu}', '${kqLatest.id}')" style="padding: 5px 10px; background: white; color: #d35400; border: 1px solid #d35400; border-radius: 4px; font-weight: bold; font-size: 11px; cursor: pointer;">👁️ XEM GIẢI</button>
                        </div>
                    </div>
                `;
            }

            let nutHanhDong = "";
            if (dinhDangTab === 'CHUA_LAM_KHOA') {
                const safeName = (nv.ten_nhiem_vu || "Nhiệm vụ").replace(/'/g, "\\'");
                nutHanhDong = `<button onclick="ham_8a_15_xin_luot_lam_bai_trac_nghiem('${nv.ma_nhiem_vu}', '${safeName}', 'QUA_HAN')" style="width: 100%; padding: 11px; background: #7f8c8d; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">🙋 XIN NỘP QUÁ HẠN</button>`;
            } else if (dinhDangTab === 'DA_LAM_KHOA') {
                const safeName = (nv.ten_nhiem_vu || "Nhiệm vụ").replace(/'/g, "\\'");
                const loaiXin = (daHetLuot && !daQuaHan) ? "HET_LUOT" : "QUA_HAN";
                const btnText = (daHetLuot && !daQuaHan) ? "🙋 XIN THÊM LƯỢT LÀM" : "🙋 XIN GỠ ĐIỂM QUÁ HẠN";
                nutHanhDong = `<button onclick="ham_8a_15_xin_luot_lam_bai_trac_nghiem('${nv.ma_nhiem_vu}', '${safeName}', '${loaiXin}')" style="width: 100%; padding: 11px; background: #e74c3c; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">${btnText}</button>`;
            } else if (dinhDangTab === 'LAM_LAI') {
                nutHanhDong = `<button onclick="ham_8a_24_vao_lam_bai_trac_nghiem('${nv.ma_nhiem_vu}')" style="width: 100%; padding: 11px; background: #00b4d8; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">🔄 LÀM LẠI LẦN NỮA</button>`;
            } else {
                nutHanhDong = `<button onclick="ham_8a_24_vao_lam_bai_trac_nghiem('${nv.ma_nhiem_vu}')" style="width: 100%; padding: 11px; background: #28a745; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">🚀 VÀO LÀM BÀI</button>`;
            }

            return `
                <div class="card-nhiem-vu-hs" data-mangs-lop='${chuoiMangLopGoc}' style="background: white; border: 1px solid #e0e0e0; border-top: 4px solid ${mauVien}; border-radius: 10px; padding: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.02); display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <div style="font-size: 11px; font-weight: bold; color: ${mauVien}; margin-bottom: 6px; text-transform: uppercase;">${textBadgeTrangThai}</div>
                        <h4 style="margin: 0 0 10px 0; color: #2c3e50; font-size: 15px; line-height: 1.4;">${nv.ten_nhiem_vu}</h4>
                        <div style="background: #f8f9fa; border-radius: 6px; padding: 8px; margin-bottom: 10px; font-size: 12px; color: #666;">
                            <div>🏫 <b>Lớp:</b> ${tenLopHienThi}</div>
                            <div>👤 <b>Thầy/Cô:</b> ${tenGV}</div>
                            <div style="color: #1a73e8; margin-top: 2px;">📊 <b>Cấu trúc:</b> ${cauTrucHL}</div>
                        </div>
                        <div style="display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 10px;">
                            <span style="font-size: 11px; background: #e9ecef; color: #495057; padding: 2px 6px; border-radius:4px;">⏱️ ${nv.thoi_gian_lam_bai > 0 ? nv.thoi_gian_lam_bai + ' ph' : 'Tự do'}</span>
                            <span style="font-size: 11px; background: #e9ecef; color: #495057; padding: 2px 6px; border-radius:4px;">🔄 Lượt: ${soLuotDaLam}/${gioiHanLuot === 0 ? "Vô hạn" : gioiHanLuot}</span>
                        </div>
                        <div style="font-size: 11px; color: #7f8c8d; margin-bottom: 12px;">
                            <span style="color:#7f8c8d; font-weight:bold;">Hạn chót:</span> ${fTime(tDong)} <br>
                            <span style="color:#d35400; font-style:italic;">${tDong && !daQuaHan ? tinhKhoangCachThoiGian(tDong) : ""}</span>
                        </div>
                    </div>
                    <div>
                        ${htmlKetQua}
                        ${nutHanhDong}
                    </div>
                </div>
            `;
        };

        vungLamViec.innerHTML = `
            <div id="thanh-loc-lop-goc-hoc-sing" style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 15px; padding: 10px; background: #fff; border-radius: 8px; border: 1px dashed #ced4da; align-items: center;">
                <span style="font-weight: bold; color: #495057; font-size: 13px;">🏫 Lớp đang xem:</span>
                <button class="btn-loc-lop-cua-hs active" onclick="ham_8a_16_loc_card_theo_lop_trac_nghiem('TAT_CA', this)" style="padding: 5px 12px; background: #1a73e8; color: white; border: 1px solid #1a73e8; border-radius: 15px; font-weight: bold; cursor: pointer; font-size: 12px; transition: 0.2s;">🌍 Tất cả các lớp</button>
                <span id="cac-nut-lop-hs-loc" style="display: flex; gap: 8px; flex-wrap: wrap;"></span>
            </div>

            <div style="display: flex; border-bottom: 2px solid #dee2e6; margin-bottom: 20px; gap: 5px; background: #fff; padding: 5px 5px 0 5px; border-radius: 8px 8px 0 0; flex-wrap: wrap;">
                <button id="btn-tab-can-lam" onclick="ham_3b_17_switch_sub_tab('CAN_LAM')" style="padding: 10px 16px; border: none; background: #28a745; color: white; font-weight: bold; font-size: 13px; border-radius: 6px 6px 0 0; cursor: pointer;">🎯 CẦN LÀM (${dsCanLam.length})</button>
                <button id="btn-tab-lam-lai" onclick="ham_3b_17_switch_sub_tab('LAM_LAI')" style="padding: 10px 16px; border: none; background: transparent; color: #495057; font-weight: bold; font-size: 13px; border-radius: 6px 6px 0 0; cursor: pointer;">🔄 ĐÃ LÀM (CÒN LƯỢT) (${dsLamLai.length})</button>
                <button id="btn-tab-chua-lam-khoa" onclick="ham_3b_17_switch_sub_tab('CHUA_LAM_KHOA')" style="padding: 10px 16px; border: none; background: transparent; color: #495057; font-weight: bold; font-size: 13px; border-radius: 6px 6px 0 0; cursor: pointer;">⬛ CHƯA LÀM (ĐÃ KHÓA) (${dsChuaLamKhoa.length})</button>
                <button id="btn-tab-da-lam-khoa" onclick="ham_3b_17_switch_sub_tab('DA_LAM_KHOA')" style="padding: 10px 16px; border: none; background: transparent; color: #495057; font-weight: bold; font-size: 13px; border-radius: 6px 6px 0 0; cursor: pointer;">🟥 ĐÃ LÀM (ĐÃ KHÓA) (${dsDaLamKhoa.length})</button>
            </div>

            <div id="vung-chua-cards-nhiem-vu" style="min-height: 200px;"></div>
        `;

        const khungNutLopCuaHs = document.getElementById('cac-nut-lop-hs-loc');
        if (khungNutLopCuaHs && dataLop) {
            khungNutLopCuaHs.innerHTML = dataLop.map(l => `<button class="btn-loc-lop-cua-hs" onclick="ham_8a_16_loc_card_theo_lop_trac_nghiem('${l.ma_lop}', this)" style="padding: 5px 12px; background: white; color: #495057; border: 1px solid #ced4da; border-radius: 15px; font-weight: bold; cursor: pointer; font-size: 12px;">🏫 ${l.ten_lop}</button>`).join('');
        }

        window.MaLopDangLocHienTai = 'TAT_CA';
        window.CachedCardsCanLamHtml = dsCanLam.length === 0 ? '<div style="text-align:center; color:#7f8c8d; padding: 40px;">Hoàn thành sạch sẽ!</div>' : `<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 15px;">${dsCanLam.map(nv => renderCard(nv, 'CAN_LAM')).join('')}</div>`;
        window.CachedCardsLamLaiHtml = dsLamLai.length === 0 ? '<div style="text-align:center; color:#7f8c8d; padding: 40px;">Không có bài tập.</div>' : `<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 15px;">${dsLamLai.map(nv => renderCard(nv, 'LAM_LAI')).join('')}</div>`;
        window.CachedCardsChuaLamKhoaHtml = dsChuaLamKhoa.length === 0 ? '<div style="text-align:center; color:#28a745; padding: 40px;">✅ Không bỏ sót bài nào!</div>' : `<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 15px;">${dsChuaLamKhoa.map(nv => renderCard(nv, 'CHUA_LAM_KHOA')).join('')}</div>`;
        window.CachedCardsDaLamKhoaHtml = dsDaLamKhoa.length === 0 ? '<div style="text-align:center; color:#7f8c8d; padding: 40px;">Trống.</div>' : `<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 15px;">${dsDaLamKhoa.map(nv => renderCard(nv, 'DA_LAM_KHOA')).join('')}</div>`;

        window.ham_3b_17_switch_sub_tab('CAN_LAM');

    } catch (error) { vungLamViec.innerHTML = `<div style="color: red; text-align: center; padding: 20px;">❌ Lỗi hệ thống: ${error.message}</div>`; }
};




// [Nhãn thời gian: 13:21 - Ngày 28/05/2026] - Hàm 8.3: Tab Luyện tập tự do (ĐÃ CHẶN NHIỆM VỤ ẢO CỦA PHÒNG LIVE)
window.ham_8a_3_tab_luyen_tap_tu_do_trac_nghiem = async function () {
    const vungLamViec = document.getElementById('vung-lam-viec-hoc-sinh');
    vungLamViec.innerHTML = `<div style="text-align: center; padding: 40px;"><h3 style="color:#17a2b8;">⏳ Đang tải danh sách bài tự luyện...</h3></div>`;

    try {
        // 1. Kéo toàn bộ nhiệm vụ mang nhãn TỰ DO từ server
        const { data: dsNV, error: errNV } = await _supabase
            .from('nhiem_vu_trac_nghiem')
            .select('*')
            .eq('trang_thai', 1)
            .contains('danh_sach_lop', '["#LUYEN_TAP_TU_DO#"]')
            .order('ngay_tao', { ascending: false });

        if (errNV) throw errNV;

        // 🌟 2. MÀNG LỌC BẢO MẬT: CHẶN CÁC NHIỆM VỤ CỦA ĐẤU TRƯỜNG LIVE LỌT VÀO ĐÂY
        // Chỉ giữ lại những nhiệm vụ mà mã KHÔNG bắt đầu bằng chữ "LIVE_"
        const dsTuLuyenThucSu = (dsNV || []).filter(nv => !nv.ma_nhiem_vu.startsWith('LIVE_'));

        if (dsTuLuyenThucSu.length === 0) {
            vungLamViec.innerHTML = `<div style="text-align: center; padding: 40px; color: #666; font-style: italic;">🍃 Hiện tại chưa có bài tập tự luyện nào đang mở.</div>`;
            return;
        }

        // 3. Kéo kết quả điểm số để xem tiến độ (Giống hệt logic hàm 8.2)
        let demSoLuotLam = {};
        const { data: hsData } = await _supabase.from('hoc_sinh').select('tien_do_lam_bai').eq('uid', GocHocSinhState.uid).single();
        if (hsData && hsData.tien_do_lam_bai) {
            demSoLuotLam = typeof hsData.tien_do_lam_bai === 'string' ? JSON.parse(hsData.tien_do_lam_bai) : hsData.tien_do_lam_bai;
        }

        // 4. Render giao diện các Card Tự luyện
        let htmlCards = `<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 15px; padding-top: 10px;">`;

        dsTuLuyenThucSu.forEach(nv => {
            const soLuotDaLam = demSoLuotLam[nv.ma_nhiem_vu] || 0;
            const textLuot = nv.so_luot_lam_bai > 0 ? `${soLuotDaLam}/${nv.so_luot_lam_bai}` : `${soLuotDaLam}/Vô hạn`;

            let btnAction = `<button onclick="ham_8a_7_cua_an_ninh('${nv.ma_nhiem_vu}')" style="width: 100%; padding: 10px; background: #17a2b8; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">🚀 VÀO LUYỆN TẬP</button>`;

            if (nv.so_luot_lam_bai > 0 && soLuotDaLam >= nv.so_luot_lam_bai) {
                btnAction = `<button disabled style="width: 100%; padding: 10px; background: #e9ecef; color: #dc3545; border: none; border-radius: 6px; font-weight: bold; cursor: not-allowed;">🛑 ĐÃ HẾT LƯỢT</button>`;
            } else if (soLuotDaLam > 0) {
                btnAction = `<button onclick="ham_8a_7_cua_an_ninh('${nv.ma_nhiem_vu}')" style="width: 100%; padding: 10px; background: #00b4d8; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">🔄 LUYỆN TẬP LẠI</button>`;
            }

            htmlCards += `
                <div style="background: white; border: 1px solid #e0e0e0; border-top: 4px solid #17a2b8; border-radius: 10px; padding: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.02); display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <div style="font-size: 11px; font-weight: bold; color: #17a2b8; margin-bottom: 6px;">🌍 KHU TỰ LUYỆN</div>
                        <h4 style="margin: 0 0 10px 0; color: #2c3e50; font-size: 15px; line-height: 1.4;">${nv.ten_nhiem_vu}</h4>
                        <div style="display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 15px;">
                            <span style="font-size: 11px; background: #e9ecef; color: #495057; padding: 2px 6px; border-radius:4px;">⏱️ ${nv.thoi_gian_lam_bai > 0 ? nv.thoi_gian_lam_bai + ' ph' : 'Tự do'}</span>
                            <span style="font-size: 11px; background: #e9ecef; color: #495057; padding: 2px 6px; border-radius:4px;">🔄 Lượt: ${textLuot}</span>
                        </div>
                    </div>
                    <div>${btnAction}</div>
                </div>
            `;
        });

        htmlCards += `</div>`;
        vungLamViec.innerHTML = htmlCards;

    } catch (error) {
        vungLamViec.innerHTML = `<div style="color: red; text-align: center; padding: 20px;">❌ Lỗi hệ thống: ${error.message}</div>`;
    }
};


// =====================================================================
// Hàm 8.7: Cửa An Ninh - Kiểm tra lượt làm và Xác nhận vào thi (ĐỒNG BỘ TIẾN ĐỘ)
// =====================================================================
async function ham_8a_7_cua_an_ninh(maNhiemVu) {
    // 1. Tìm thông tin nhiệm vụ trong danh sách đã tải về ở GocHocSinhState
    const nv = GocHocSinhState.danhSachNhiemVu.find(item => item.ma_nhiem_vu === maNhiemVu);
    if (!nv) return alert("Lỗi: Không tìm thấy dữ liệu bài tập!");

    // Hiện hiệu ứng chờ mạng nhẹ tránh việc học sinh click double spam
    Swal.fire({
        title: '⏳ Đang xác thực phòng thi...',
        allowOutsideClick: false,
        didOpen: () => { Swal.showLoading(); }
    });

    try {
        // =====================================================================
        // 🌟 SỬA ĐỔI CỐT LÕI: Đọc số lượt đã làm từ bộ đếm tiến độ của bảng hoc_sinh
        // =====================================================================
        const { data: hsData, error } = await _supabase
            .from('hoc_sinh')
            .select('tien_do_lam_bai')
            .eq('uid', GocHocSinhState.uid)
            .single();

        if (error) throw error;

        let demSoLuotLam = {};
        if (hsData && hsData.tien_do_lam_bai) {
            demSoLuotLam = typeof hsData.tien_do_lam_bai === 'string'
                ? JSON.parse(hsData.tien_do_lam_bai)
                : hsData.tien_do_lam_bai;
        }

        // Đọc số lượt đã làm thực tế từ object tiến độ JSON của thầy
        const soLuotHienTai = demSoLuotLam[maNhiemVu] || 0;
        const gioiHanLuot = nv.so_luot_lam_bai || 0; // 0 là vô hạn

        // Chặn lại nếu đã làm hết số lượt cho phép
        if (gioiHanLuot > 0 && soLuotHienTai >= gioiHanLuot) {
            return Swal.fire({
                icon: 'error',
                title: 'Hết lượt làm bài!',
                text: `Bài tập này giới hạn ${gioiHanLuot} lượt làm. Em đã hoàn thành đủ số lượt.`,
                confirmButtonColor: '#d33'
            });
        }

        // 🌟 LƯU LẠI LẦN THI ĐỂ DÙNG LÚC NỘP BÀI (Hàm 8.11)
        window.LanThuHienTai = soLuotHienTai + 1;

        // 3. Hiện bảng thông tin xác nhận tâm lý cho học sinh (GIỮ NGUYÊN HOÀN TOÀN CỦA THẦY)
        const thoiGianHienThi = nv.thoi_gian_lam_bai > 0 ? `${nv.thoi_gian_lam_bai} phút` : "Tự do";

        Swal.fire({
            title: 'XÁC NHẬN VÀO LÀM BÀI',
            html: `
                <div style="text-align: left; background: #f8f9fa; padding: 15px; border-radius: 8px; border: 1px solid #ddd; font-size: 14px;">
                    <p>📝 <b>Nhiệm vụ:</b> <span style="color:#1a73e8; font-weight: bold;">${nv.ten_nhiem_vu}</span></p>
                    <p>⏱️ <b>Thời gian:</b> ${thoiGianHienThi}</p>
                    <p>🔄 <b>Lượt làm:</b> Lần thứ ${window.LanThuHienTai} (Tối đa: ${gioiHanLuot == 0 ? "Vô hạn" : gioiHanLuot})</p>
                    <hr>
                    <p style="color: #d32f2f; font-weight: bold; font-style: italic; margin:0;">⚠️ Lưu ý: Kết quả các lần trước sẽ xóa, đồng hồ sẽ bắt đầu đếm ngược ngay khi em bấm nút BẮT ĐẦU.</p>
                </div>
            `,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#28a745',
            cancelButtonColor: '#6c757d',
            confirmButtonText: '🚀 BẮT ĐẦU LÀM BÀI',
            cancelButtonText: 'Để sau'
        }).then((result) => {
            if (result.isConfirmed) {
                // Chuyển sang Hàm 8.8 gốc của thầy: Khởi tạo phòng thi và bốc đề
                ham_8a_8_khoi_tao_phong_thi_trac_nghiem(nv);
            }
        });

    } catch (err) {
        Swal.fire({ icon: 'error', title: 'Lỗi kiểm tra an ninh', text: err.message });
    }
}


// // ==============================================================

// // Hàm 8.8: Khởi tạo Phòng thi (BẢO MẬT TUYỆT ĐỐI - KHÔNG ĐỤNG ĐẾN ĐÁP ÁN)
// // ==============================================================
// async function ham_8a_8_khoi_tao_phong_thi_trac_nghiem(nv) {
//     const vungLamViec = document.getElementById('dashboard-container');
//     vungLamViec.innerHTML = `
//         <div style="text-align: center; padding: 100px;">
//             <div style="border: 4px solid #f3f3f3; border-top: 4px solid #3498db; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 0 auto;"></div>
//             <h3 style="margin-top:20px; color:#1a73e8;">⚡ Đang nạp đề thi bảo mật...</h3>
//             <style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>
//         </div>
//     `;

//     try {
//         const maHocLieu = nv.ma_hoc_lieu;
//         if (!maHocLieu) throw new Error("Nhiệm vụ này chưa được gắn Học liệu!");

//         // =========================================================
//         // 1. CHỈ LẤY DUY NHẤT LINK GITHUB (CẤM GỌI danh_sach_cau_hoi)
//         // =========================================================
//         const { data: dataHocLieu, error: errHL } = await _supabase
//             .from('hoc_lieu_trac_nghiem')
//             .select('ma_hoc_lieu, url_github') // 🔒 KHOÁ CHẶT: Tuyệt đối không select cột chứa đáp án
//             .eq('ma_hoc_lieu', maHocLieu)
//             .single();

//         if (errHL) throw errHL;

//         // =========================================================
//         // 2. TÍNH TOÁN ĐƯỜNG LINK GITHUB CHUẨN XÁC
//         // =========================================================
//         let urlFileGitHub = dataHocLieu.url_github;

//         if (!urlFileGitHub) {
//             let maDeGoc = maHocLieu;
//             if (maHocLieu.startsWith("HL_DE_")) {
//                 maDeGoc = maHocLieu.replace("HL_DE_", "");
//             }
//             const LINK_GITHUB_GOC = "https://ducchinh2308.github.io/LuyenToan2308";
//             urlFileGitHub = `${LINK_GITHUB_GOC}/Kho_De_Thi/${maDeGoc}/DeThi_${maDeGoc}.json`;
//         }

//         //console.log("🔍 Đang tải nội dung đề thô từ:", urlFileGitHub);

//         // =========================================================
//         // 3. TẢI ĐỀ THI SẠCH (KHÔNG ĐÁP ÁN) TỪ GITHUB
//         // =========================================================
//         const response = await fetch(urlFileGitHub);
//         if (!response.ok) {
//             throw new Error("Không tải được đề! Thầy hãy kiểm tra xem Github đã đồng bộ chưa.\nLink: " + urlFileGitHub);
//         }

//         const dataGitHub = await response.json();
//         // Lấy danh sách câu hỏi trực tiếp từ file Github (Chỉ có nội dung, không có đáp án)
//         const dsNoiDungGH = dataGitHub.danhSachCauHoi || dataGitHub.danh_sach_cau_hoi || [];

//         if (dsNoiDungGH.length === 0) throw new Error("File đề trên Github đang bị trống!");

        

//         // =========================================================
//         // 4. TRỘN ĐỀ CÓ ĐIỀU KIỆN (CHỈ XÁO KHI KHÔNG PHẢI LIVE QUIZ)
//         // =========================================================
//         let deThiDaTron;
//         const isLive = (window.DangKhoiTaoLiveQuiz === true);

//         if (isLive) {
//             // NẾU LÀ THI LIVE: Giữ nguyên thứ tự tuyệt đối
//             deThiDaTron = dsNoiDungGH;
//         } else {
//             // NẾU LÀ NHIỆM VỤ THƯỜNG: Xáo trộn bình thường
//             deThiDaTron = ham_8a_9_tron_de_thi_trac_nghiem(dsNoiDungGH);
//         }



//         // Lấy đường dẫn thư mục chứa đề thi để xử lý Hình Ảnh
//         const baseUrlHinhAnh = urlFileGitHub.substring(0, urlFileGitHub.lastIndexOf('/')) + "/HinhAnh";

//         // =========================================================
//         // 5. TÍNH LƯỢT VÀ TẠO BẢN NHÁP (CHỐNG GIAN LẬN THOÁT ĐỀ)
//         // =========================================================
//         const maNhiemVuThuc = nv.ma_nhiem_vu || nv.maNhiemVu || maHocLieu;

//         const { count, error: countErr } = await _supabase
//             .from('ket_qua_trac_nghiem')
//             .select('*', { count: 'exact', head: true })
//             .eq('uid_hoc_sinh', GocHocSinhState.uid)
//             .eq('ma_nhiem_vu', maNhiemVuThuc);

//         const lanThuHienTai = (count || 0) + 1;

//         // Ghi nhận ngay 1 phiên làm bài trên Database
//         const { data: recordNhao, error: errNhao } = await _supabase
//             .from('ket_qua_trac_nghiem')
//             .insert([{
//                 uid_hoc_sinh: GocHocSinhState.uid,
//                 ma_nhiem_vu: maNhiemVuThuc,
//                 lan_thu: lanThuHienTai,
//                 tong_diem: 0,
//                 chi_tiet_lam_bai: [],
//                 thoi_gian_lam_bai: "0 phút 0 giây",
//                 thoi_gian_nop: new Date().toISOString()
//             }])
//             .select('id')
//             .single();

//         if (errNhao) throw errNhao;

        
//         //// =========================================================
//         //// 6. MỞ GIAO DIỆN THI
//         //// =========================================================
//         //ham_8a_10_ve_giao_dien_lam_bai_trac_nghiem();
//         // Lưu toàn bộ vào RAM trình duyệt
//         window.PhienLamBai = {
//             id_ket_qua_database: recordNhao.id,
//             ma_nhiem_vu: maNhiemVuThuc,
//             ten_nhiem_vu: nv.ten_nhiem_vu || nv.tenDe || nv.tenHocLieu || "Bài Luyện Tập",
//             thoi_gian_con_lai: (nv.thoi_gian_lam_bai || nv.thoi_gian || nv.thoiGian || 90) * 60,
//             tong_so_cau: deThiDaTron.length,
//             danh_sach_cau_hoi: deThiDaTron,
//             dap_an_hoc_sinh: {},
//             id_timer: null,
//             base_url_anh: baseUrlHinhAnh
//         };

//         // 🌟 [CẤY CHIP 1] CẤP THẺ VIP NẾU LÀ TRẬN LIVE QUIZ
//         window.PhienLamBai.isLiveQuiz = window.DangKhoiTaoLiveQuiz === true;
//         window.PhienLamBai.maPhongLive = window.DangKhoiTaoLiveQuiz ? window.ThongTinLiveHocSinh.maPhong : null;
//         window.DangKhoiTaoLiveQuiz = false; // Reset lại trạng thái

//         // =========================================================
//         // 6. MỞ GIAO DIỆN THI
//         // =========================================================
//         ham_8a_10_ve_giao_dien_lam_bai_trac_nghiem();


//     } catch (err) {
//         console.error("LỖI NẠP ĐỀ:", err);
//         alert("Lỗi nạp đề thi: " + err.message);
//         ham_3b_1_tai_nhiem_vu_cua_toi(GocHocSinhState.uid, GocHocSinhState.danh_sach_ma_lop, GocHocSinhState.ten);
//     }
// }

// // ==============================================================
// // Hàm 8.8: Khởi tạo Phòng thi (ĐÃ TÍCH HỢP KHÔI PHỤC AUTO-SAVE)
// // ==============================================================
// async function ham_8a_8_khoi_tao_phong_thi_trac_nghiem(nv) {
//     const vungLamViec = document.getElementById('dashboard-container');
//     vungLamViec.innerHTML = `
//         <div style="text-align: center; padding: 100px;">
//             <div style="border: 4px solid #f3f3f3; border-top: 4px solid #3498db; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 0 auto;"></div>
//             <h3 style="margin-top:20px; color:#1a73e8;">⚡ Đang nạp đề thi bảo mật...</h3>
//             <style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>
//         </div>
//     `;

//     try {
//         const maHocLieu = nv.ma_hoc_lieu;
//         if (!maHocLieu) throw new Error("Nhiệm vụ này chưa được gắn Học liệu!");

//         const { data: dataHocLieu, error: errHL } = await _supabase.from('hoc_lieu_trac_nghiem').select('ma_hoc_lieu, url_github').eq('ma_hoc_lieu', maHocLieu).single();
//         if (errHL) throw errHL;

//         let urlFileGitHub = dataHocLieu.url_github;
//         if (!urlFileGitHub) {
//             let maDeGoc = maHocLieu;
//             if (maHocLieu.startsWith("HL_DE_")) maDeGoc = maHocLieu.replace("HL_DE_", "");
//             const LINK_GITHUB_GOC = "https://ducchinh2308.github.io/LuyenToan2308";
//             urlFileGitHub = `${LINK_GITHUB_GOC}/Kho_De_Thi/${maDeGoc}/DeThi_${maDeGoc}.json`;
//         }

//         const response = await fetch(urlFileGitHub);
//         if (!response.ok) throw new Error("Không tải được đề! Thầy hãy kiểm tra xem Github đã đồng bộ chưa.\nLink: " + urlFileGitHub);

//         const dataGitHub = await response.json();
//         const dsNoiDungGH = dataGitHub.danhSachCauHoi || dataGitHub.danh_sach_cau_hoi || [];
//         if (dsNoiDungGH.length === 0) throw new Error("File đề trên Github đang bị trống!");

//         let deThiDaTron;
//         const isLive = (window.DangKhoiTaoLiveQuiz === true);
//         if (isLive) deThiDaTron = dsNoiDungGH;
//         else deThiDaTron = ham_8a_9_tron_de_thi_trac_nghiem(dsNoiDungGH);

//         const baseUrlHinhAnh = urlFileGitHub.substring(0, urlFileGitHub.lastIndexOf('/')) + "/HinhAnh";
//         const maNhiemVuThuc = nv.ma_nhiem_vu || nv.maNhiemVu || maHocLieu;

//         // =========================================================
//         // 🌟 [AUTO-SAVE BƯỚC 3] KIỂM TRA BÀI ĐANG LÀM DỞ VÀ TRỪ THỜI GIAN
//         // =========================================================
//         let recordIdHienTai = null;
//         let isRestore = false;
//         let thoiGianConLaiThucTe = (nv.thoi_gian_lam_bai || nv.thoi_gian || nv.thoiGian || 90) * 60; // Tính ra Giây

//         if (!isLive) {
//             // 1. Quét tìm bài thi 'dang_lam'
//             const { data: baiDangLam, error: errCheck } = await _supabase
//                 .from('ket_qua_trac_nghiem')
//                 .select('id, thoi_gian_bat_dau, chi_tiet_lam_bai')
//                 .eq('uid_hoc_sinh', GocHocSinhState.uid)
//                 .eq('ma_nhiem_vu', maNhiemVuThuc)
//                 .eq('trang_thai_lam_bai', 'dang_lam')
//                 .maybeSingle();

//             if (baiDangLam) {
//                 // Đang làm dở -> Khôi phục
//                 recordIdHienTai = baiDangLam.id;
//                 isRestore = true;

//                 // Tính toán số giây đã trôi qua kể từ lúc ấn bắt đầu lần đầu tiên
//                 if (baiDangLam.thoi_gian_bat_dau && thoiGianConLaiThucTe > 0) {
//                     const thoiGianDaQuaGiay = Math.floor((Date.now() - new Date(baiDangLam.thoi_gian_bat_dau).getTime()) / 1000);
//                     thoiGianConLaiThucTe = thoiGianConLaiThucTe - thoiGianDaQuaGiay;
//                     if (thoiGianConLaiThucTe <= 0) thoiGianConLaiThucTe = 1; // Cho 1 giây để nó tự động trigger nộp bài
//                 }

//                 // Kéo dữ liệu từ Supabase đắp xuống LocalStorage phòng khi hs đổi máy tính
//                 const keyLocal = `nhap_trac_nghiem_${GocHocSinhState.uid}_${maNhiemVuThuc}`;
//                 if (!localStorage.getItem(keyLocal) && Array.isArray(baiDangLam.chi_tiet_lam_bai)) {
//                     let dictTam = {};
//                     baiDangLam.chi_tiet_lam_bai.forEach(item => {
//                         if (item.maCau && item.luaChonHS) dictTam[item.maCau] = item.luaChonHS;
//                     });
//                     localStorage.setItem(keyLocal, JSON.stringify(dictTam));
//                 }

//             } else {
//                 // Không có bài dở -> TẠO MỚI (Logic cũ của thầy/cô)
//                 const { count } = await _supabase.from('ket_qua_trac_nghiem').select('*', { count: 'exact', head: true }).eq('uid_hoc_sinh', GocHocSinhState.uid).eq('ma_nhiem_vu', maNhiemVuThuc);
//                 const lanThuHienTai = (count || 0) + 1;

//                 const { data: recordNhao, error: errNhao } = await _supabase.from('ket_qua_trac_nghiem').insert([{
//                     uid_hoc_sinh: GocHocSinhState.uid,
//                     ma_nhiem_vu: maNhiemVuThuc,
//                     lan_thu: lanThuHienTai,
//                     tong_diem: 0,
//                     chi_tiet_lam_bai: [],
//                     thoi_gian_bat_dau: new Date().toISOString(), // Lưu mốc thời gian bắt đầu
//                     trang_thai_lam_bai: 'dang_lam',              // Bật cờ đang làm
//                     thoi_gian_nop: new Date().toISOString()
//                 }]).select('id').single();

//                 if (errNhao) throw errNhao;
//                 recordIdHienTai = recordNhao.id;
//             }
//         } else {
//             // Logic cho phòng Live
//             recordIdHienTai = "LIVE_" + Date.now();
//         }

//     //     // =========================================================
//     //     // LƯU RAM VÀ GỌI GIAO DIỆN
//     //     // =========================================================
//     //     window.PhienLamBai = {
//     //         id_ket_qua_database: recordIdHienTai,
//     //         ma_nhiem_vu: maNhiemVuThuc,
//     //         ten_nhiem_vu: nv.ten_nhiem_vu || nv.tenDe || nv.tenHocLieu || "Bài Luyện Tập",
//     //         thoi_gian_con_lai: thoiGianConLaiThucTe,
//     //         tong_so_cau: deThiDaTron.length,
//     //         danh_sach_cau_hoi: deThiDaTron,
//     //         dap_an_hoc_sinh: {},
//     //         id_timer: null,
//     //         base_url_anh: baseUrlHinhAnh
//     //     };

//     //     window.PhienLamBai.isLiveQuiz = isLive;
//     //     window.PhienLamBai.maPhongLive = isLive ? window.ThongTinLiveHocSinh.maPhong : null;
//     //     window.DangKhoiTaoLiveQuiz = false;

//     //     // Mở giao diện
//     //     ham_8a_10_ve_giao_dien_lam_bai_trac_nghiem();

//     //     // Hiện thông báo nếu đang khôi phục
//     //     if (isRestore) {
//     //         Swal.fire({
//     //             title: 'Khôi phục bài làm!',
//     //             text: 'Phát hiện bài làm đang dang dở. Các đáp án em đã chọn trước đó đang được khôi phục...',
//     //             icon: 'info',
//     //             timer: 3000,
//     //             showConfirmButton: false
//     //         });
//     //     }

//     // } catch (err) {
//     //     console.error("LỖI NẠP ĐỀ:", err);
//     //     alert("Lỗi nạp đề thi: " + err.message);
//     //     ham_3b_1_tai_nhiem_vu_cua_toi(GocHocSinhState.uid, GocHocSinhState.danh_sach_ma_lop, GocHocSinhState.ten);
//     // }
//         // =========================================================
//         // LƯU RAM VÀ GỌI GIAO DIỆN
//         // =========================================================
//         window.PhienLamBai = {
//             id_ket_qua_database: recordIdHienTai,
//             ma_nhiem_vu: maNhiemVuThuc,
//             ten_nhiem_vu: nv.ten_nhiem_vu || nv.tenDe || nv.tenHocLieu || "Bài Luyện Tập",
//             thoi_gian_con_lai: thoiGianConLaiThucTe,
//             tong_so_cau: deThiDaTron.length,
//             danh_sach_cau_hoi: deThiDaTron,
//             dap_an_hoc_sinh: {},
//             id_timer: null,
//             base_url_anh: baseUrlHinhAnh
//         };

//         window.PhienLamBai.isLiveQuiz = isLive;
//         window.PhienLamBai.maPhongLive = isLive ? window.ThongTinLiveHocSinh.maPhong : null;
//         window.DangKhoiTaoLiveQuiz = false;

//         // Mở giao diện
//         ham_8a_10_ve_giao_dien_lam_bai_trac_nghiem();

//         // 🌟 KÍCH HOẠT BỘ MÁY LƯU NHÁP (CHÍNH LÀ CHỖ CÒN THIẾU KHIẾN NÚT BỊ ĐƠ)
//         if (!isLive) {
//             // 1. Nạp mã nhiệm vụ vào bộ máy và khởi động đồng hồ 60s
//             if (typeof ham_16_3_khoi_dong_auto_save === 'function') ham_16_3_khoi_dong_auto_save(maNhiemVuThuc);

//             // 2. Khôi phục lại giao diện (Tick lại các đáp án) nếu là bài làm dở
//             setTimeout(() => {
//                 if (typeof ham_16_6_khoi_phuc_giao_dien === 'function') ham_16_6_khoi_phuc_giao_dien(maNhiemVuThuc);
//             }, 500);
//         }

//         // Hiện thông báo nếu đang khôi phục
//         if (isRestore) {
//             Swal.fire({
//                 title: 'Khôi phục bài làm!',
//                 text: 'Phát hiện bài làm đang dang dở. Các đáp án em đã chọn trước đó đang được khôi phục...',
//                 icon: 'info',
//                 timer: 4000,
//                 showConfirmButton: false
//             });
//         }

//     } catch (err) {
//         console.error("LỖI NẠP ĐỀ:", err);
//         alert("Lỗi nạp đề thi: " + err.message);
//         ham_3b_1_tai_nhiem_vu_cua_toi(GocHocSinhState.uid, GocHocSinhState.danh_sach_ma_lop, GocHocSinhState.ten);
//     }
// }



async function ham_8a_8_khoi_tao_phong_thi_trac_nghiem(nv) {
    const vungLamViec = document.getElementById('dashboard-container');
    vungLamViec.innerHTML = `
        <div style="text-align: center; padding: 100px;">
            <div style="border: 4px solid #f3f3f3; border-top: 4px solid #3498db; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 0 auto;"></div>
            <h3 style="margin-top:20px; color:#1a73e8;">⚡ Đang nạp đề thi bảo mật...</h3>
            <style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>
        </div>
    `;

    try {
        const maHocLieu = nv.ma_hoc_lieu;
        if (!maHocLieu) throw new Error("Nhiệm vụ này chưa được gắn Học liệu!");

        const { data: dataHocLieu, error: errHL } = await _supabase.from('hoc_lieu_trac_nghiem').select('ma_hoc_lieu, url_github').eq('ma_hoc_lieu', maHocLieu).single();
        if (errHL) throw errHL;

        let urlFileGitHub = dataHocLieu.url_github;
        if (!urlFileGitHub) {
            let maDeGoc = maHocLieu;
            if (maHocLieu.startsWith("HL_DE_")) maDeGoc = maHocLieu.replace("HL_DE_", "");
            const LINK_GITHUB_GOC = "https://ducchinh2308.github.io/LuyenToan2308";
            urlFileGitHub = `${LINK_GITHUB_GOC}/Kho_De_Thi/${maDeGoc}/DeThi_${maDeGoc}.json`;
        }

        const response = await fetch(urlFileGitHub);
        if (!response.ok) throw new Error("Không tải được đề! Thầy hãy kiểm tra xem Github đã đồng bộ chưa.\nLink: " + urlFileGitHub);

        const dataGitHub = await response.json();
        const dsNoiDungGH = dataGitHub.danhSachCauHoi || dataGitHub.danh_sach_cau_hoi || [];
        if (dsNoiDungGH.length === 0) throw new Error("File đề trên Github đang bị trống!");

        let deThiDaTron;
        const isLive = (window.DangKhoiTaoLiveQuiz === true);
        if (isLive) deThiDaTron = dsNoiDungGH;
        else deThiDaTron = ham_8a_9_tron_de_thi_trac_nghiem(dsNoiDungGH);

        const baseUrlHinhAnh = urlFileGitHub.substring(0, urlFileGitHub.lastIndexOf('/')) + "/HinhAnh";
        const maNhiemVuThuc = nv.ma_nhiem_vu || nv.maNhiemVu || maHocLieu;

        // =========================================================
        // 🌟 [AUTO-SAVE BƯỚC 3] KIỂM TRA BÀI ĐANG LÀM DỞ VÀ TRỪ THỜI GIAN
        // =========================================================
        let recordIdHienTai = null;
        let isRestore = false;
        let thoiGianConLaiThucTe = (nv.thoi_gian_lam_bai || nv.thoi_gian || nv.thoiGian || 90) * 60; // Tính ra Giây

        if (!isLive) {
            // 🐛 TRẠM DEBUG 1: KIỂM TRA THÔNG SỐ TRƯỚC KHI QUÉT
            console.log("%c[DEBUG AUTO-SAVE] 1. BẮT ĐẦU QUÉT BÀI DỞ DANG...", "color: blue; font-weight: bold;");
            console.log("- UID Học sinh:", GocHocSinhState.uid);
            console.log("- Mã Nhiệm vụ:", maNhiemVuThuc);

            // 1. Quét tìm bài thi 'dang_lam'
            const { data: baiDangLam, error: errCheck } = await _supabase
                .from('ket_qua_trac_nghiem')
                .select('id, thoi_gian_bat_dau, chi_tiet_lam_bai')
                .eq('uid_hoc_sinh', GocHocSinhState.uid)
                .eq('ma_nhiem_vu', maNhiemVuThuc)
                .eq('trang_thai_lam_bai', 'dang_lam')
                .maybeSingle();

            // 🐛 TRẠM DEBUG 2: XEM SUPABASE TRẢ VỀ CÁI GÌ
            console.log("%c[DEBUG AUTO-SAVE] 2. KẾT QUẢ TỪ SUPABASE:", "color: orange; font-weight: bold;", baiDangLam);
            if (errCheck) console.error("❌ LỖI TRUY VẤN DATABASE:", errCheck);

            if (baiDangLam) {
                // Đang làm dở -> Khôi phục
                console.log("%c[DEBUG AUTO-SAVE] 3. -> ĐÃ TÌM THẤY BÀI DỞ DANG! (Sẽ tiến hành khôi phục)", "color: green; font-weight: bold;");
                recordIdHienTai = baiDangLam.id;
                isRestore = true;

                // Tính toán số giây đã trôi qua kể từ lúc ấn bắt đầu lần đầu tiên
                if (baiDangLam.thoi_gian_bat_dau && thoiGianConLaiThucTe > 0) {
                    const thoiGianDaQuaGiay = Math.floor((Date.now() - new Date(baiDangLam.thoi_gian_bat_dau).getTime()) / 1000);
                    thoiGianConLaiThucTe = thoiGianConLaiThucTe - thoiGianDaQuaGiay;
                    if (thoiGianConLaiThucTe <= 0) thoiGianConLaiThucTe = 1; // Cho 1 giây để nó tự động trigger nộp bài
                }

                // Kéo dữ liệu từ Supabase đắp xuống LocalStorage phòng khi hs đổi máy tính
                const keyLocal = `nhap_trac_nghiem_${GocHocSinhState.uid}_${maNhiemVuThuc}`;
                if (!localStorage.getItem(keyLocal) && Array.isArray(baiDangLam.chi_tiet_lam_bai)) {
                    let dictTam = {};
                    baiDangLam.chi_tiet_lam_bai.forEach(item => {
                        if (item.maCau && item.luaChonHS) dictTam[item.maCau] = item.luaChonHS;
                    });
                    localStorage.setItem(keyLocal, JSON.stringify(dictTam));
                }

            } else {
                // Không có bài dở -> TẠO MỚI (Logic cũ của thầy/cô)
                console.log("%c[DEBUG AUTO-SAVE] 3. -> KHÔNG TÌM THẤY BÀI NÀO. SẼ TẠO MỚI!", "color: purple; font-weight: bold;");

                const { count } = await _supabase.from('ket_qua_trac_nghiem').select('*', { count: 'exact', head: true }).eq('uid_hoc_sinh', GocHocSinhState.uid).eq('ma_nhiem_vu', maNhiemVuThuc);
                const lanThuHienTai = (count || 0) + 1;

                const { data: recordNhao, error: errNhao } = await _supabase.from('ket_qua_trac_nghiem').insert([{
                    uid_hoc_sinh: GocHocSinhState.uid,
                    ma_nhiem_vu: maNhiemVuThuc,
                    lan_thu: lanThuHienTai,
                    tong_diem: 0,
                    chi_tiet_lam_bai: [],
                    thoi_gian_bat_dau: new Date().toISOString(), // Lưu mốc thời gian bắt đầu
                    trang_thai_lam_bai: 'dang_lam',              // Bật cờ đang làm
                    thoi_gian_nop: new Date().toISOString()
                }]).select('id').single();

                if (errNhao) {
                    console.error("❌ LỖI KHI TẠO MỚI DỮ LIỆU:", errNhao);
                    throw errNhao;
                }

                console.log("%c[DEBUG AUTO-SAVE] 4. ĐÃ TẠO MỚI THÀNH CÔNG VỚI ID:", "color: green; font-weight: bold;", recordNhao.id);
                recordIdHienTai = recordNhao.id;
            }
        } else {
            // Logic cho phòng Live
            recordIdHienTai = "LIVE_" + Date.now();
        }

        // =========================================================
        // LƯU RAM VÀ GỌI GIAO DIỆN
        // =========================================================
        window.PhienLamBai = {
            id_ket_qua_database: recordIdHienTai,
            ma_nhiem_vu: maNhiemVuThuc,
            ten_nhiem_vu: nv.ten_nhiem_vu || nv.tenDe || nv.tenHocLieu || "Bài Luyện Tập",
            thoi_gian_con_lai: thoiGianConLaiThucTe,
            tong_so_cau: deThiDaTron.length,
            danh_sach_cau_hoi: deThiDaTron,
            dap_an_hoc_sinh: {},
            id_timer: null,
            base_url_anh: baseUrlHinhAnh
        };

        window.PhienLamBai.isLiveQuiz = isLive;
        window.PhienLamBai.maPhongLive = isLive ? window.ThongTinLiveHocSinh.maPhong : null;
        window.DangKhoiTaoLiveQuiz = false;

        // Mở giao diện
        ham_8a_10_ve_giao_dien_lam_bai_trac_nghiem();

        // 🌟 KÍCH HOẠT BỘ MÁY LƯU NHÁP (CHÍNH LÀ CHỖ CÒN THIẾU KHIẾN NÚT BỊ ĐƠ)
        if (!isLive) {
            // 1. Nạp mã nhiệm vụ vào bộ máy và khởi động đồng hồ 60s
            if (typeof ham_16_3_khoi_dong_auto_save === 'function') ham_16_3_khoi_dong_auto_save(maNhiemVuThuc);

            // 2. Khôi phục lại giao diện (Tick lại các đáp án) nếu là bài làm dở
            setTimeout(() => {
                if (typeof ham_16_6_khoi_phuc_giao_dien === 'function') ham_16_6_khoi_phuc_giao_dien(maNhiemVuThuc);
            }, 500);
        }

        // Hiện thông báo nếu đang khôi phục
        if (isRestore) {
            Swal.fire({
                title: 'Khôi phục bài làm!',
                text: 'Phát hiện bài làm đang dang dở. Các đáp án em đã chọn trước đó đang được khôi phục...',
                icon: 'info',
                timer: 4000,
                showConfirmButton: false
            });
        }

    } catch (err) {
        console.error("LỖI NẠP ĐỀ:", err);
        alert("Lỗi nạp đề thi: " + err.message);
        ham_3b_1_tai_nhiem_vu_cua_toi(GocHocSinhState.uid, GocHocSinhState.danh_sach_ma_lop, GocHocSinhState.ten);
    }
}


// ==============================================================
// Hàm 8.9: Trộn thứ tự câu hỏi (Chống gian lận)
// ==============================================================
function ham_8a_9_tron_de_thi_trac_nghiem(mangCauHoi) {
    // 1. Trộn thứ tự các câu hỏi với nhau (Shuffle mảng)
    let dsTron = mangCauHoi.sort(() => Math.random() - 0.5);

    // 2. Định hình lại số thứ tự và chốt Kiểu câu
    return dsTron.map((item, index) => {

        // Cố gắng lấy kiểu câu từ Database (nếu C# có đẩy lên)
        let kieuNhanDien = item.kieuCau || item.kieu_cau || "";

        // LOGIC THÔNG MINH: Nếu Database thiếu kieuCau, ta "bắt mạch" từ đáp án
        if (!kieuNhanDien && item.dap_an) {
            if (item.dap_an.length === 4 && (item.dap_an.includes('T') || item.dap_an.includes('F'))) {
                kieuNhanDien = "DS"; // Đúng sai (TFTF)
            } else if (!['A', 'B', 'C', 'D'].includes(item.dap_an) && item.dap_an.length !== 4) {
                kieuNhanDien = "TLN"; // Trả lời ngắn (số)
            } else {
                kieuNhanDien = "TN"; // Trắc nghiệm mặc định
            }
        }

        return {
            ...item,
            index_stt: index + 1, // Đánh số thứ tự hiển thị (Câu 1, 2, 3...)
            kieuCau: kieuNhanDien // Gắn lại nhãn chuẩn để Hàm 8.10 vẽ giao diện cho đúng
        };
    });
}





// =====================================================================
// HÀM 8.10: GIAO DIỆN PHÒNG THI CUỘN TỪ TRÊN XUỐNG CÙNG (2 CỘT CHUẨN)
// [Nhãn thời gian: 08:45 - Ngày 29/05/2026] - Cố định Đồng hồ & Nút nộp, chỉ cuộn danh sách câu
// =====================================================================
window.ham_8a_10_ve_giao_dien_lam_bai_trac_nghiem = function () {
    const vungLamViec = document.getElementById('dashboard-container');
    if (vungLamViec) vungLamViec.style.display = 'none';

    const phien = window.PhienLamBai;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    phien.thoi_diem_bat_dau = Date.now();

    // 1. PHÂN LOẠI CÂU HỎI THEO NHÓM
    let dsTN = [], dsDS = [], dsTLN = [];
    phien.danh_sach_cau_hoi.forEach(cau => {
        const loai = (cau.kieuCau || cau.loaiCau || "TN").toUpperCase();
        if (loai === "TN") dsTN.push(cau);
        else if (loai === "DS") dsDS.push(cau);
        else if (loai === "TLN") dsTLN.push(cau);
    });

    let htmlContentRight = '';
    if (phien.isLiveQuiz) {
        htmlContentRight = `<div style="background:#e74c3c; color:white; padding:11px; border-radius:5px; margin-bottom:12px; box-shadow:0 2px 3px rgba(0,0,0,0.1);"><h2 style="margin:0; font-size:11px; text-transform: uppercase;">🔥 ĐẤU TRƯỜNG: ${phien.ten_nhiem_vu}</h2></div>`;
    } else {
        htmlContentRight = `<div style="background:#0056b3; color:white; padding:11px; border-radius:5px; margin-bottom:13px; box-shadow:0 4px 6px rgba(0,0,0,0.1);"><h2 style="margin:0; font-size:13px; text-transform: uppercase;">📝 ${phien.ten_nhiem_vu}</h2></div>`;
    }

    let htmlNavLeft = ``;

    const sinhGiaoDienNhom = (tieuDePhan, danhSach, loaiCau) => {
        if (danhSach.length === 0) return;

        htmlContentRight += `<h3 style="color: #c0392b; border-bottom: 2px solid #c0392b; padding-bottom: 5px; margin-top: 40px; margin-bottom: 20px; font-size: 20px; text-transform: uppercase;">${tieuDePhan}</h3>`;

        let tenNav = loaiCau === 'TN' ? 'TN' : (loaiCau === 'DS' ? 'ĐS' : 'TLN');
        htmlNavLeft += `<div style="margin-bottom: 10px; width: 100%;">
                            <h4 style="margin: 0 0 6px 0; color: #c0392b; font-size: 11px; border-bottom: 1px solid #ddd; padding-bottom: 3px; text-align: center;">📍${tenNav}</h4>
                            <div style="display: flex; flex-direction: column; align-items: center; gap: 6px;">`;

        let sttPhan = 1;
        danhSach.forEach(cau => {
            htmlContentRight += ham_8a_11_taoGiaoDienCauHoi_trac_nghiem(cau, sttPhan, loaiCau);
            const maCau = cau.ma_cau_hoi || cau.maCau;
            htmlNavLeft += `
                <div id="btn-nav-${maCau}" onclick="document.getElementById('cau-${maCau}').scrollIntoView({behavior: 'smooth', block: 'center'})" 
                     style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 42px; height: 42px; background: #fff; border: 1px solid #ced4da; border-radius: 6px; cursor: pointer; color: #495057; font-weight: bold; font-size: 14px; transition: 0.2s; box-shadow: 0 1px 2px rgba(0,0,0,0.05);" 
                     onmouseover="if(!this.classList.contains('da-lam')) this.style.background='#e9ecef'" onmouseout="if(!this.classList.contains('da-lam')) this.style.background='#fff'">
                    <span style="line-height: 1;">${sttPhan}</span>
                    <span id="nav-ans-${maCau}" style="font-size: 10px; font-weight: bold; color: #888; margin-top: 2px; min-height: 12px;"></span>
                </div>`;
            sttPhan++;
        });
        htmlNavLeft += `</div></div>`;
    };

    sinhGiaoDienNhom("PHẦN I. Câu trắc nghiệm nhiều phương án lựa chọn", dsTN, "TN");
    sinhGiaoDienNhom("PHẦN II. Câu trắc nghiệm đúng/sai", dsDS, "DS");
    sinhGiaoDienNhom("PHẦN III. Câu trắc nghiệm trả lời ngắn", dsTLN, "TLN");

    let htmlLiveDiem = '';
    if (phien.isLiveQuiz) {
        htmlLiveDiem = `
            <div style="background: linear-gradient(135deg, #1e1e2f, #2a2a3c); border: 1px solid #444; border-radius: 6px; padding: 6px 2px; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
                <div style="font-size: 9px; color: #a0a0b2; font-weight: bold; margin-bottom: 2px;">PIN</div>
                <div style="font-size: 11px; font-weight: 900; color: #e74c3c; font-family: monospace; margin-bottom: 8px; letter-spacing: 0.5px;">
                    ${window.ThongTinLiveHocSinh ? window.ThongTinLiveHocSinh.maPhong : '---'}
                </div>
                
                <div style="font-size: 9px; color: #a0a0b2; font-weight: bold; margin-bottom: 2px;">ĐIỂM</div>
                <div id="diem-hien-tai-hs" style="font-size: 12px; font-weight: 900; color: #f1c40f; font-family: monospace; transition: all 0.3s ease;">
                    0.00
                </div>
            </div>
        `;
    }

    // 🌟 CHÌA KHÓA Ở ĐÂY: Quyết định hàm Nộp Bài tùy theo loại nhiệm vụ
    const lenhNopBai = phien.isLiveQuiz ? "ham_8_6_8_chot_nop_bai_live_trac_nghiem()" : "ham_8a_12_nop_bai_va_cham_diem_trac_nghiem()";



    // 3. RÁP VÀO BỘ KHUNG
    const rootDiv = document.createElement('div');
    rootDiv.id = 'khong-gian-thi-toan-man-hinh';
    rootDiv.style.cssText = "position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; display: flex; background: #e9ecef; box-sizing: border-box; z-index: 99999;";

    rootDiv.innerHTML = `
        <style>
            /* Ẩn thanh cuộn xấu xí của vùng danh sách câu nhưng vẫn cho phép vuốt */
            #vung-cuon-cau-hoi::-webkit-scrollbar { width: 0px; background: transparent; }
            #vung-cuon-cau-hoi { scrollbar-width: none; -ms-overflow-style: none; }
        </style>

        <div id="cot-trai-nav" style="flex: 0 0 54px; background: #fff; height: 100vh; display: flex; flex-direction: column; border-right: 1px solid #ccc; box-shadow: 2px 0 10px rgba(0,0,0,0.05); z-index: 10;">
            
            <div style="flex-shrink: 0; padding: 6px 4px; display: flex; flex-direction: column; gap: 8px; border-bottom: 1px solid #eee; background: #fdfdfe; z-index: 2;">
                <div id="khung-dong-ho" style="background: #fff3cd; border: 1px solid #ffe69c; color: #856404; font-weight: bold; text-align: center; padding: 6px 0; border-radius: 4px; font-size: 11px;">
                    <span id="dong-ho-dem-nguoc">--:--</span>
                </div>
                
                <div style="background: #e8f4f8; border: 1px solid #b8daff; color: #0056b3; font-weight: bold; text-align: center; padding: 4px 0; border-radius: 4px; font-size: 10px;">
                    <span id="so-cau-da-lam" style="color: #28a745;">0</span>/${phien.tong_so_cau}
                </div>
                
               <div style="display: flex; gap: 5px; width: 100%;">
                    <button id="btn-luu-tam" onclick="ham_16_7_luu_tam_thu_cong(this)" style="flex: 1; padding: 10px 0; background: #ffc107; color: #856404; border: none; border-radius: 4px; font-weight: bold; font-size: 11px; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.2);" title="Cất tạm lên máy chủ">LƯU TẠM</button>
                    
                    <button id="btn-nop-bai" onclick="ham_8a_12_nop_bai_va_cham_diem_trac_nghiem()" style="flex: 1; padding: 10px 0; background: #28a745; color: white; border: none; border-radius: 4px; font-weight: bold; font-size: 11px; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.2);" title="Chấm dứt làm bài">NỘP</button>
                </div>
                 
            </div>

            <div id="vung-cuon-cau-hoi" style="flex: 1; overflow-y: auto; overflow-x: hidden; padding: 6px 4px; padding-top: 10px;">
            ${htmlLiveDiem}    
            <div style="display: flex; flex-direction: column; align-items: center; padding-bottom: 30px;">
                    ${htmlNavLeft}
                </div>
            </div>
        </div>

        <div id="khu-vuc-cuon-de" style="flex: 1; padding: 20px 15px; overflow-y: auto; scroll-behavior: smooth; position: relative;">
            <div style="max-width: 900px; margin: 0 auto; padding-bottom: 100px;">
                ${htmlContentRight}
            </div>
        </div>
    `;

    document.body.appendChild(rootDiv);

    // Kích hoạt toán học & Hình vẽ
    const vungCuon = document.getElementById('khu-vuc-cuon-de');
    if (window.renderMathInElement) {
        window.renderMathInElement(vungCuon, {
            delimiters: [
                { left: "$$", right: "$$", display: true },
                { left: "$", right: "$", display: false }
            ],
            throwOnError: false,
            macros: { "\\heva": "\\left\\{\\begin{array}{l}#1\\end{array}\\right.", "\\hoac": "\\left[\\begin{array}{l}#1\\end{array}\\right." }
        });
    } else if (window.MathJax) {
        MathJax.typesetPromise();
    }

    let oldTikz = document.getElementById('tikz-script-reload');
    if (oldTikz) oldTikz.remove();
    let newTikz = document.createElement('script');
    newTikz.id = 'tikz-script-reload';
    newTikz.src = 'https://tikzjax.com/v1/tikzjax.js';
    document.body.appendChild(newTikz);

    // Bắt đầu đồng hồ đếm ngược
    if (phien.id_timer) clearInterval(phien.id_timer);
    phien.id_timer = setInterval(() => {
        phien.thoi_gian_con_lai--;

        const tongGiayThucTe = Math.floor(phien.thoi_gian_con_lai);
        const mm = String(Math.floor(tongGiayThucTe / 60)).padStart(2, '0');
        const ss = String(tongGiayThucTe % 60).padStart(2, '0');

        document.getElementById('dong-ho-dem-nguoc').innerText = `${mm}:${ss}`;

        if (phien.thoi_gian_con_lai <= 300) {
            const dh = document.getElementById('khung-dong-ho');
            if (dh) { dh.style.background = '#f8d7da'; dh.style.color = '#721c24'; dh.style.borderColor = '#f5c6cb'; }
        }

        if (phien.thoi_gian_con_lai <= 0) {
            clearInterval(phien.id_timer);
            alert("⏳ ĐÃ HẾT THỜI GIAN LÀM BÀI! Hệ thống tự động thu bài.");
            ham_8a_12_nop_bai_va_cham_diem_trac_nghiem(true);
        }
    }, 1000);
}




// =====================================================================
// 8.11 HÀM BỔ TRỢ: VẼ TỪNG CÂU HỎI (Tích hợp Dịch LaTeX & Màng lọc ảnh)
// =====================================================================
function ham_8a_11_taoGiaoDienCauHoi_trac_nghiem(cau, stt, loaiCau) {

    // 🌟 Tách rạch ròi 2 mã: Logic (q_) để chấm điểm, và Hiển thị (2605-123) cho học sinh xem
    const maCauLogic = cau.ma_cau_hoi || cau.maCau;
    const maCauHienThi = cau.ma_goc || cau.maGoc || cau.maCauGoc || cau.idGoc || maCauLogic;


    const thuMucAnh = window.PhienLamBai.base_url_anh;

    // Bộ lọc Kép: Dịch LaTeX trước -> Vá đường dẫn ảnh sau
    const xuLyNoiDung = (noiDung) => {
        if (!noiDung) return "";
        let htmlDich = typeof dichLaTeX === 'function' ? dichLaTeX(noiDung) : noiDung;
        return htmlDich.replace(/src=['"]([^'"]+)['"]/g, (match, tenFile) => {
            if (tenFile.startsWith('http') || tenFile.startsWith('data:')) return match;
            const cleanFile = tenFile.split('/').pop();
            return `src="${thuMucAnh}/${cleanFile}"`;
        });
    };

    let cauDan = xuLyNoiDung(cau.cauDan || cau.noiDungHtml || "");

    let htmlBlock = `
        <div id="cau-${maCauLogic}" data-loaicau="${loaiCau}" class="cau-hoi" style="margin-bottom: 30px; padding: 25px; border: 1px solid #ccc; border-radius: 8px; background: #fff; box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
            <p style="color: #0056b3; margin-top: 0; font-size: 18px; display: flex; justify-content: space-between; border-bottom: 1px solid #eee; padding-bottom: 10px;">
                <span style="display: flex; align-items: baseline; gap: 8px;">
                    <strong style="font-weight: 900; color: #000080;">(${loaiCau}) Câu ${stt}:</strong>
                    <span style="font-size: 13px; color: #6c757d; font-weight: normal;">[Mã: ${maCauHienThi}]</span> 
                </span>
            </p>
            <div style="font-size: 17px; line-height: 1.6; margin-bottom: 20px; margin-top: 15px; overflow-x: auto;">${cauDan}</div>
    `;

    if (loaiCau === "TN") {
        htmlBlock += `<div style="display: flex; flex-direction: column; gap: 10px;">`;
        const mangPA = cau.dsTron || [{ idGoc: 'A', text: cau.paA }, { idGoc: 'B', text: cau.paB }, { idGoc: 'C', text: cau.paC }, { idGoc: 'D', text: cau.paD }];
        mangPA.forEach((pa, idx) => {
            const nhan = String.fromCharCode(65 + idx);
            htmlBlock += `
                <label style="display: flex; align-items: flex-start; padding: 12px; border: 1px solid #ddd; border-radius: 6px; cursor: pointer; background: #f8f9fa; transition: 0.2s;" onmouseover="this.style.background='#e8f0fe'" onmouseout="if(!this.querySelector('input').checked) this.style.background='#f8f9fa'">
                    <input type="radio" name="dapan_${maCauLogic}" value="${pa.idGoc}" onchange="ham_8_25_luuDapAn('${maCauLogic}', '${pa.idGoc}', this)" style="margin-top: 5px; margin-right: 15px; transform: scale(1.3);">
                    <div style="flex:1; font-size: 17px;"><b>${nhan}.</b> ${xuLyNoiDung(pa.text)}</div>
                </label>`;
        });
        htmlBlock += `</div>`;
    }
    else if (loaiCau === "DS") {
        htmlBlock += `<div style="font-weight: bold; color: #d35400; margin-bottom: 15px; background: #fff8e1; padding: 10px; border-left: 4px solid #ffc107; font-size: 14px;">✅ Yêu cầu: Chọn Đúng hoặc Sai.</div><div class="cau-ds">`;
        const mangY = [{ id: 'A', text: cau.paA }, { id: 'B', text: cau.paB }, { id: 'C', text: cau.paC }, { id: 'D', text: cau.paD }];
        mangY.forEach((y, idx) => {
            const nhanThuong = ['a', 'b', 'c', 'd'][idx];
            htmlBlock += `
                <div class="dong-ds" style="margin-bottom: 12px; padding: 12px 15px; background: #f8f9fa; border: 1px solid #eee; border-radius: 6px; display: flex; justify-content: space-between; align-items: center;">
                    <div style="flex: 1; padding-right: 20px; font-size: 16px;"><strong>${nhanThuong})</strong> ${xuLyNoiDung(y.text)}</div>
                    <div style="display: flex; gap: 20px; flex-shrink: 0; background: #fff; padding: 8px 15px; border-radius: 20px; border: 1px solid #ced4da;">
                        <label style="cursor: pointer; display: flex; align-items: center; gap: 5px; font-weight: bold; color: #28a745;">
                            <input type="radio" name="ds_${maCauLogic}_${y.id}" value="T" onchange="ham_8_26_luuDapAnDS('${maCauLogic}', '${y.id}', 'T', this)" style="transform: scale(1.3);"> Đúng
                        </label>
                        <label style="cursor: pointer; display: flex; align-items: center; gap: 5px; font-weight: bold; color: #dc3545;">
                            <input type="radio" name="ds_${maCauLogic}_${y.id}" value="F" onchange="ham_8_26_luuDapAnDS('${maCauLogic}', '${y.id}', 'F', this)" style="transform: scale(1.3);"> Sai
                        </label>
                    </div>
                </div>`;
        });
        htmlBlock += `</div>`;
    }
    else if (loaiCau === "TLN") {
        const inputStyle = "width: 55px; height: 60px; text-align: center; font-size: 26px; font-weight: bold; border: 2px solid #1a73e8; border-radius: 8px; color: #000080; outline: none; background: #fff; box-shadow: 0 2px 4px rgba(0,0,0,0.05); text-transform: uppercase;";
        const autoJumpScript = `oninput="if(this.value) this.nextElementSibling?.focus(); let ans=''; this.parentElement.querySelectorAll('input').forEach(i => ans+=i.value); ham_8_25_luuDapAn('${maCauLogic}', ans, this);" onkeydown="if(event.key === 'Backspace' && !this.value) this.previousElementSibling?.focus();"`;

        htmlBlock += `
            <div class="cau-tln-container" style="margin-top: 15px; padding: 25px; background: #e8f4f8; border-radius: 8px; border: 1px dashed #b8daff; text-align: center;">
                <label style="font-weight: bold; color: #0056b3; font-size: 16px; margin-bottom: 20px; display: block;">✏️ Điền đáp án của em vào 4 ô trống:</label>
                <div class="tln-inputs" style="display: flex; justify-content: center; gap: 12px;">
                    <input type="text" maxlength="1" style="${inputStyle}" ${autoJumpScript}>
                    <input type="text" maxlength="1" style="${inputStyle}" ${autoJumpScript}>
                    <input type="text" maxlength="1" style="${inputStyle}" ${autoJumpScript}>
                    <input type="text" maxlength="1" style="${inputStyle}" ${autoJumpScript}>
                </div>
                <div style="font-size: 13px; color: #6c757d; margin-top: 15px;">(Mỗi ô điền 1 ký tự, bao gồm cả dấu trừ "-" hoặc dấu phẩy ",")</div>
            </div>`;
    }


    // 🌟 KIỂM TRA: Nếu đang ở chế độ Live Quiz -> Cấy thêm nút NỘP TỪNG CÂU
    if (window.PhienLamBai && window.PhienLamBai.isLiveQuiz) {
        // Xử lý chuỗi đáp án đúng để truyền vào hàm chấm điểm
        let dapAnDungTruyen = (cau.dap_an || cau.dapAn || '');
        // Thay thế dấu nháy đơn để tránh lỗi cú pháp JS khi render HTML
        dapAnDungTruyen = dapAnDungTruyen.replace(/'/g, "\\'");

        htmlBlock += `
            <div style="margin-top: 18px; border-top: 1px dashed #e0e0e0; padding-top: 12px; text-align: right;">
                <button id="btn-live-${maCauLogic}" 
                        onclick="window.ham_8_6_4_nop_tung_cau('${maCauLogic}', '${loaiCau}', '${dapAnDungTruyen}')" 
                        style="padding: 10px 22px; background: #e74c3c; color: white; border: none; border-radius: 6px; font-weight: 900; font-size: 14px; cursor: pointer; box-shadow: 0 3px 6px rgba(231,76,60,0.2); transition: 0.2s;"
                        onmouseover="if(!this.disabled) this.style.background='#c0392b'" 
                        onmouseout="if(!this.disabled) this.style.background='#e74c3c'">
                    🚀 GỬI & KHÓA CÂU NÀY
                </button>
            </div>
        `;
    }


    return htmlBlock + `</div>`;
}

// =====================================================================
// HÀM 8.12: NỘP BÀI TỔNG VÀ GỌI SUPABASE CHẤM ĐIỂM BẢO MẬT (KÈM TÍNH KIM CƯƠNG)
// =====================================================================
async function ham_8a_12_nop_bai_va_cham_diem_trac_nghiem(isForce = false) {
    if (!isForce) {
        if (!confirm("Bạn có chắc chắn muốn nộp bài? Hãy chắc chắn rằng bạn đã soát lại toàn bộ đáp án.")) return;
    }

    const btnNop = document.getElementById('btn-nop-bai');
    if (btnNop) { btnNop.innerText = "⏳ HỆ THỐNG ĐANG CHẤM..."; btnNop.disabled = true; }

    const phien = window.PhienLamBai;
    if (phien.id_timer) clearInterval(phien.id_timer);

    if (phien.isLiveQuiz && window.HocSinhLiveChannel) {
        _supabase.removeChannel(window.HocSinhLiveChannel);
        window.HocSinhLiveChannel = null;
    }

    let payloadBaiLam = {};
    phien.danh_sach_cau_hoi.forEach(cau => {
        const maCauChuan = cau.ma_cau_hoi || cau.maCau;
        const dapanHS = phien.dap_an_hoc_sinh[maCauChuan];
        const kieu = (cau.kieuCau || cau.loaiCau || "TN").toUpperCase();

        if (kieu === 'DS' && typeof dapanHS === 'object') {
            let strDS = "";
            ['A', 'B', 'C', 'D'].forEach(k => { strDS += dapanHS[k] || dapanHS[k.toUpperCase()] || "_"; });
            payloadBaiLam[maCauChuan] = strDS;
        } else {
            payloadBaiLam[maCauChuan] = dapanHS || "";
        }
    });

    const tBatDau = phien.thoi_diem_bat_dau || Date.now();
    const soGiayThucTe = Math.floor((Date.now() - tBatDau) / 1000);
    const thoiGianLamBaiStr = `${Math.floor(soGiayThucTe / 60)} phút ${soGiayThucTe % 60} giây`;
    

    try {
        const { data: diemSoBiMat, error: errCham } = await _supabase.rpc('cham_diem_bai_thi_trac_nghiem', {
            p_id_ket_qua: phien.id_ket_qua_database,
            p_ma_nhiem_vu: phien.ma_nhiem_vu,
            p_dap_an_hoc_sinh: payloadBaiLam,
            p_thoi_gian_lam_bai: thoiGianLamBaiStr
        });

        if (errCham) throw errCham;


        // 🌟 [AUTO-SAVE BƯỚC 4] CHỐT TRẠNG THÁI VÀ DỌN RÁC BỘ NHỚ
        if (!phien.isLiveQuiz) {
            // Update trạng thái thành Đã Nộp để đóng sổ
            await _supabase.from('ket_qua_trac_nghiem')
                .update({ trang_thai_lam_bai: 'da_nop' })
                .eq('id', phien.id_ket_qua_database);

            // Xóa bộ nhớ tạm và dừng đồng hồ Auto-save
            if (typeof ham_16_4_don_dep_sau_khi_nop === 'function') {
                ham_16_4_don_dep_sau_khi_nop(phien.ma_nhiem_vu);
            }
        }




        const diemTongKet = Number(diemSoBiMat || 0);

        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';
        const khongGianThi = document.getElementById('khong-gian-thi-toan-man-hinh');
        if (khongGianThi) khongGianThi.remove();

        // ==============================================================
        // 4. THUẬT TOÁN KIM CƯƠNG (SỔ CÁI VÀ ĐỘ CHÊNH LỆCH)
        // ==============================================================
        let kcTheoDiem = 1;
        if (diemTongKet === 10) kcTheoDiem = 4;
        else if (diemTongKet >= 8) kcTheoDiem = 3;
        else if (diemTongKet >= 5) kcTheoDiem = 2;

        let soCaiKC = GocHocSinhState.chi_tiet_kim_cuong || {};
        let tongKC = GocHocSinhState.kim_cuong || 0;
        let maNV = phien.ma_nhiem_vu;

        let kcCu = soCaiKC[maNV] || 0;
        let chenhLechKC = kcTheoDiem - kcCu;

        tongKC += chenhLechKC;
        if (tongKC < 0) tongKC = 0;
        soCaiKC[maNV] = kcTheoDiem;

        GocHocSinhState.kim_cuong = tongKC;
        GocHocSinhState.chi_tiet_kim_cuong = soCaiKC;

        let textThongBaoKC = "";
        if (chenhLechKC > 0) {
            textThongBaoKC = `<span style="font-size: 20px; color: #00bcd4; font-weight: bold;">+${chenhLechKC} 💎 Kim Cương</span>`;
        } else if (chenhLechKC < 0) {
            textThongBaoKC = `<span style="font-size: 18px; color: #e74c3c; font-weight: bold;">${chenhLechKC} 💎 Kim Cương (Do điểm thấp hơn)</span>`;
        } else {
            textThongBaoKC = `<span style="font-size: 16px; color: #f39c12; font-weight: bold;">Không thay đổi 💎 Kim Cương</span>`;
        }

        // ==============================================================
        // 5. RẼ NHÁNH GIAO DIỆN SAU KHI TÍNH KIM CƯƠNG
        // ==============================================================
        if (phien.isLiveQuiz) {
            if (window.ThongTinLiveHocSinh && window.ThongTinLiveHocSinh.maPhong) {
                await _supabase.from('tien_do_live_quiz')
                    .update({ da_nop: true, diem_so: diemTongKet })
                    .eq('ma_phong', window.ThongTinLiveHocSinh.maPhong)
                    .eq('uid_hoc_sinh', GocHocSinhState.uid);
            }

            // Lưu Kim Cương lên Server
            await _supabase.from('hoc_sinh')
                .update({ kim_cuong: tongKC, chi_tiet_kim_cuong: soCaiKC })
                .eq('uid', GocHocSinhState.uid);

            const khuVucDashboard = document.getElementById('dashboard-container');
            if (khuVucDashboard) khuVucDashboard.style.display = 'block';

            if (typeof window.ham_8_6_6_man_hinh_ket_qua_cho === 'function') {
                window.ham_8_6_6_man_hinh_ket_qua_cho(diemTongKet);
            }

            Swal.fire({
                title: isForce ? '⏳ HẾT GIỜ LÀM BÀI!' : '📤 NỘP BÀI THÀNH CÔNG!',
                html: `Thành tích đấu trường của em: <b>${diemTongKet.toFixed(2)} điểm</b><br><br>${textThongBaoKC}`,
                icon: 'success',
                timer: 4000,
                showConfirmButton: true
            });

        } else {
            let tienDoHienTai = GocHocSinhState.tien_do_lam_bai || {};
            tienDoHienTai[phien.ma_nhiem_vu] = (tienDoHienTai[phien.ma_nhiem_vu] || 0) + 1;

            // Lưu Tiến độ và Kim Cương lên Server cùng 1 nhịp
            await _supabase.from('hoc_sinh')
                .update({
                    tien_do_lam_bai: tienDoHienTai,
                    kim_cuong: tongKC,
                    chi_tiet_kim_cuong: soCaiKC
                })
                .eq('uid', GocHocSinhState.uid);

            GocHocSinhState.tien_do_lam_bai = tienDoHienTai;

            Swal.fire({
                title: '🏆 NỘP BÀI THÀNH CÔNG!',
                html: `Điểm số của em là: <b>${diemTongKet.toFixed(2)} điểm</b><br><br>${textThongBaoKC}`,
                icon: 'success',
                confirmButtonText: 'Tuyệt vời',
                confirmButtonColor: '#28a745'
            }).then(() => {
                document.getElementById('dashboard-container').style.display = 'block';
                ham_3b_1_tai_nhiem_vu_cua_toi(GocHocSinhState.uid, GocHocSinhState.danh_sach_ma_lop, GocHocSinhState.ten);
            });
        }

    } catch (err) {
        alert("❌ Máy chủ quá tải hoặc lỗi khi chấm: " + err.message);
        if (btnNop) { btnNop.innerText = "NỘP LẠI"; btnNop.disabled = false; }
    }
}
// ==============================================================
// Hàm 8.13: Tải dữ liệu Xem lại bài (Tích hợp chốt chặn File Bóng Ma)
// ==============================================================
window.ham_8a_13_xem_lai_ket_qua_trac_nghiem = async function (maNhiemVu, idKetQua) {
    const vungLamViec = document.getElementById('dashboard-container');
    vungLamViec.style.display = 'none';

    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'khong-gian-loading-xem-lai';
    loadingDiv.style.cssText = "position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: #f0f2f5; z-index: 99999; display: flex; flex-direction: column; justify-content: center; align-items: center;";
    loadingDiv.innerHTML = `
        <div style="border: 4px solid #ccc; border-top: 4px solid #d35400; border-radius: 50%; width: 50px; height: 50px; animation: spin 1s linear infinite;"></div>
        <h3 style="margin-top:20px; color:#d35400;">🔍 Đang trích xuất bài làm và đối chiếu bảo mật...</h3>
        <style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>
    `;
    document.body.appendChild(loadingDiv);

    try {
        // 1. TẢI DỮ LIỆU TỪ SUPABASE
        const { data: ketQua, error: errKQ } = await _supabase.from('ket_qua_trac_nghiem').select('*').eq('id', idKetQua).single();
        if (errKQ || !ketQua) throw new Error("Không tìm thấy dữ liệu bài làm!");

        const { data: nv, error: errNV } = await _supabase.from('nhiem_vu_trac_nghiem').select('*').eq('ma_nhiem_vu', maNhiemVu).single();
        if (errNV || !nv) throw new Error("Không tìm thấy thông tin nhiệm vụ!");

        // Lấy Học liệu (Gồm: Bản đồ cấu trúc, Link Đề, Link Giải Bóng Ma)
        const { data: dataHocLieu, error: errHL } = await _supabase.from('hoc_lieu_trac_nghiem').select('danh_sach_cau_hoi, url_github, url_file_giai').eq('ma_hoc_lieu', nv.ma_hoc_lieu).single();
        if (errHL) throw errHL;

        // ==============================================================
        // 🔒 CHỐT CHẶN BẢO MẬT: KIỂM TRA QUYỀN TRUY CẬP TRƯỚC KHI TẢI DỮ LIỆU
        // ==============================================================
        let congBo = { thoi_diem: CFG_NV_TN.THOI_DIEM.KHOA, muc_do: CFG_NV_TN.MUC_DO.KHONG };
        try { congBo = typeof nv.cau_hinh_dap_an === 'string' ? JSON.parse(nv.cau_hinh_dap_an) : (nv.cau_hinh_dap_an || congBo); } catch (e) { }

        const now = new Date();
        const tDongDe = nv.thoi_gian_dong ? new Date(nv.thoi_gian_dong) : null;
        let hopLeThoiDiem = false;

        const td = congBo.thoi_diem;
        if (td === CFG_NV_TN.THOI_DIEM.SAU_NOP) { hopLeThoiDiem = true; }
        else if (td === CFG_NV_TN.THOI_DIEM.SAU_HET_HAN) { if (tDongDe && now > tDongDe) hopLeThoiDiem = true; }
        else if (td && td.startsWith("HEN_GIO|")) { if (now > new Date(td.split("|")[1])) hopLeThoiDiem = true; }

        const choPhepXemDapAn = hopLeThoiDiem && (congBo.muc_do === CFG_NV_TN.MUC_DO.DAPAN_DIEM || congBo.muc_do === CFG_NV_TN.MUC_DO.FULL_LOIGIAI);
        const choPhepXemLoiGiai = hopLeThoiDiem && (congBo.muc_do === CFG_NV_TN.MUC_DO.FULL_LOIGIAI);

        // ==============================================================
        // 2. TẢI FILE ĐỀ THI TỪ GITHUB (Luôn được tải để hiện nội dung câu hỏi)
        // ==============================================================
        let urlFileGitHub = dataHocLieu.url_github;
        if (!urlFileGitHub) {
            let maDeGoc = nv.ma_hoc_lieu;
            if (maDeGoc.startsWith("HL_DE_")) maDeGoc = maDeGoc.replace("HL_DE_", "");
            urlFileGitHub = `https://ducchinh2308.github.io/LuyenToan2308/Kho_De_Thi/${maDeGoc}/DeThi_${maDeGoc}.json`;
        }

        const resDe = await fetch(urlFileGitHub);
        if (!resDe.ok) throw new Error("Không tải được đề gốc từ Github!");
        const dataGitHub = await resDe.json();

        // ==============================================================
        // 3. TẢI FILE GIẢI BÓNG MA (CHỈ TẢI KHI ĐƯỢC PHÉP XEM LỜI GIẢI)
        // ==============================================================
        let dataGiaiGop = null;
        if (choPhepXemLoiGiai && dataHocLieu.url_file_giai) {
            try {
                const resGiai = await fetch(dataHocLieu.url_file_giai);
                if (resGiai.ok) dataGiaiGop = await resGiai.json();
            } catch (e) { console.error("Không tải được file bóng ma", e); }
        }

        // ==============================================================
        // 4. RÁP BẢN ĐỒ VÀ TẨY TRẮNG RAM NẾU KHÔNG CÓ QUYỀN
        // ==============================================================
        const deThiHoanChinh = (dataHocLieu.danh_sach_cau_hoi || []).map(mapItem => {
            const noiDung = (dataGitHub.danhSachCauHoi || dataGitHub.danh_sach_cau_hoi || []).find(c => c.maCau === mapItem.ma_cau_hoi) || {};

            // Tìm lời giải từ File bóng ma thông qua mã bảo mật sol_
            let htmlLoiGiaiChiTiet = null;
            if (choPhepXemLoiGiai && dataGiaiGop) {
                const matchGiai = (dataGiaiGop.danhSachLoiGiai || []).find(g => g.maBaoMat === mapItem.ma_loi_giai);
                if (matchGiai) htmlLoiGiaiChiTiet = matchGiai.loiGiaiHtml;
            }

            return {
                ...mapItem,
                ...noiDung,
                // 🔒 TẨY TRẮNG: Học sinh F12 cũng chỉ thấy giá trị null nếu không được phép xem
                dap_an: choPhepXemDapAn ? mapItem.dap_an : null,
                loiGiaiHtml: htmlLoiGiaiChiTiet
            };
        });

        const baseUrlHinhAnh = urlFileGitHub.substring(0, urlFileGitHub.lastIndexOf('/')) + "/HinhAnh";

        document.getElementById('khong-gian-loading-xem-lai').remove();

        // Truyền thẳng quyền hạn đã chốt xuống Hàm vẽ giao diện
        ham_8a_14_ve_giao_dien_xem_lai_trac_nghiem(ketQua, deThiHoanChinh, nv, baseUrlHinhAnh, choPhepXemDapAn, choPhepXemLoiGiai);

    } catch (err) {
        document.getElementById('khong-gian-loading-xem-lai')?.remove();
        document.getElementById('dashboard-container').style.display = 'block';
        alert("❌ Lỗi mở bài thi: " + err.message);
    }
};

// ==============================================================
// Hàm 8.14: Vẽ Giao diện Xem Lại (Chỉ làm nhiệm vụ hiển thị đơn thuần)
// ==============================================================
function ham_8a_14_ve_giao_dien_xem_lai_trac_nghiem(ketQua, deThi, nv, baseUrlHinhAnh, choPhepXemDapAn, choPhepXemLoiGiai) {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const chiTietHS = {};
    if (ketQua.chi_tiet_lam_bai) {
        ketQua.chi_tiet_lam_bai.forEach(item => { chiTietHS[item.maCau] = item; });
    }

    let dsTN = [], dsDS = [], dsTLN = [];
    deThi.forEach(cau => {
        const loai = (cau.kieuCau || cau.loaiCau || "TN").toUpperCase();
        if (loai === "TN") dsTN.push(cau);
        else if (loai === "DS") dsDS.push(cau);
        else if (loai === "TLN") dsTLN.push(cau);
    });

    let htmlContentRight = `<div style="background:#d35400; color:white; padding:15px; border-radius:8px; margin-bottom:20px; box-shadow:0 4px 6px rgba(0,0,0,0.1);"><h2 style="margin:0; font-size:18px; text-transform: uppercase;">🔍 XEM LẠI BÀI: ${nv.ten_nhiem_vu}</h2></div>`;

    if (!choPhepXemDapAn) {
        htmlContentRight += `
            <div style="background: #fff3cd; border: 1px solid #ffe69c; color: #856404; padding: 12px; border-radius: 6px; margin-bottom: 20px; font-weight: bold; font-size: 14px;">
                🔒 Hệ thống đang khóa đáp án và lời giải chi tiết theo quy định của Thầy/Cô. Em hiện tại chỉ được xem điểm số và lựa chọn của mình.
            </div>`;
    }

    let htmlNavLeft = ``;

    const sinhGiaoDienNhom = (tieuDePhan, danhSach, loaiCau) => {
        if (danhSach.length === 0) return;

        htmlContentRight += `<h3 style="color: #c0392b; border-bottom: 2px solid #c0392b; padding-bottom: 5px; margin-top: 40px; margin-bottom: 20px; font-size: 20px; text-transform: uppercase;">${tieuDePhan}</h3>`;
        let tenNav = loaiCau === 'TN' ? 'TN' : (loaiCau === 'DS' ? 'ĐS' : 'TLN');
        htmlNavLeft += `<div style="margin-bottom: 15px;"><h4 style="margin: 0 0 10px 0; color: #c0392b; font-size: 13px; border-bottom: 1px solid #ddd; padding-bottom: 5px;">📍 PHẦN ${tenNav}</h4><div style="display: flex; flex-wrap: wrap; gap: 8px;">`;

        let sttPhan = 1;

        // Tìm đoạn code duyệt danh sách
        //console.log("DEBUG-LIST:", danhSach); // Thay danh_sach_cau_hoi_goc bằng tên biến thực tế thầy dùng


        danhSach.forEach(cau => {
            const maCauLogic = cau.ma_cau_hoi || cau.maCau;
            //const baiLamCuaHS = chiTietHS[maCauLogic] || { luaChonHS: null, ketQua: "Bỏ trống", diem: 0 };
            const baiLamCuaHS = chiTietHS[maCauLogic] || { luaChonHS: {}, ketQua: "Bỏ trống", diem: 0 };

            htmlContentRight += ham_8a_20_taoGiaoDienCauHoiDaCham_trac_nghiem(cau, baiLamCuaHS, sttPhan, loaiCau, baseUrlHinhAnh, choPhepXemDapAn, choPhepXemLoiGiai);

            let mauNut = "#e9ecef", vienNut = "#ced4da", mauChu = "#495057";
            if (choPhepXemDapAn) {
                if (baiLamCuaHS.ketQua === "Đúng") { mauNut = "#d4edda"; vienNut = "#c3e6cb"; mauChu = "#155724"; }
                else if (baiLamCuaHS.ketQua === "Sai" || (baiLamCuaHS.diem > 0 && baiLamCuaHS.diem < 1 && loaiCau === 'DS')) { mauNut = "#f8d7da"; vienNut = "#f5c6cb"; mauChu = "#721c24"; }
            } else {
                if (baiLamCuaHS.luaChonHS || (loaiCau === 'DS' && Object.keys(baiLamCuaHS.luaChonHS || {}).length > 0)) {
                    mauNut = "#e8f4f8"; vienNut = "#b8daff"; mauChu = "#0056b3";
                }
            }

            htmlNavLeft += `
                <div onclick="document.getElementById('review-cau-${maCauLogic}').scrollIntoView({behavior: 'smooth', block: 'center'})" 
                     style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 42px; height: 42px; background: ${mauNut}; border: 1px solid ${vienNut}; border-radius: 6px; cursor: pointer; color: ${mauChu}; font-weight: bold; font-size: 14px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                    <span style="line-height: 1;">${sttPhan}</span>
                </div>`;
            sttPhan++;
        });
        htmlNavLeft += `</div></div>`;
    };

    sinhGiaoDienNhom("PHẦN I. Câu trắc nghiệm nhiều phương án lựa chọn", dsTN, "TN");
    sinhGiaoDienNhom("PHẦN II. Câu trắc nghiệm đúng/sai", dsDS, "DS");
    sinhGiaoDienNhom("PHẦN III. Câu trắc nghiệm trả lời ngắn", dsTLN, "TLN");

    const rootDiv = document.createElement('div');
    rootDiv.id = 'khong-gian-xem-lai-toan-man-hinh';
    rootDiv.style.cssText = "position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; display: flex; background: #e9ecef; box-sizing: border-box; z-index: 99999;";

    rootDiv.innerHTML = `
        <div style="flex: 0 0 70px; background: #fff; display: flex; flex-direction: column; border-right: 1px solid #ccc; box-shadow: 2px 0 10px rgba(0,0,0,0.05); z-index: 10;">
            <div style="padding: 15px; background: #fffdf5; border-bottom: 1px solid #eee; text-align:center;">
                <div style="font-size: 12px; color: #d35400; font-weight: bold; text-transform: uppercase;">Điểm số</div>
                <div style="color: #c0392b; font-size: 32px; font-weight: 900; line-height: 1.2;">${ketQua.tong_diem}</div>
            </div>
            <div style="flex: 1; overflow-y: auto; padding: 15px; background: #fcfcfc;">${htmlNavLeft}</div>
            <div style="padding: 15px; border-top: 1px solid #eee; background: #fff;">
                <button onclick="ham_8a_22_dongGiaoDienXemLai_trac_nghiem()" style="width: 100%; padding: 15px; background: #6c757d; color: white; border: none; border-radius: 6px; font-weight: bold; font-size: 16px; cursor: pointer; box-shadow: 0 4px 6px rgba(0,0,0,0.2);">⬅️ QUAY LẠI</button>
            </div>
        </div>
        <div id="khu-vuc-cuon-review" style="flex: 1; padding: 30px; overflow-y: auto; scroll-behavior: smooth; position: relative;">
            <div style="max-width: 900px; margin: 0 auto; padding-bottom: 100px;">${htmlContentRight}</div>
        </div>
    `;
    document.body.appendChild(rootDiv);

    if (window.renderMathInElement) {
        window.renderMathInElement(document.getElementById('khu-vuc-cuon-review'), { delimiters: [{ left: "$$", right: "$$", display: true }, { left: "$", right: "$", display: false }], throwOnError: false, macros: { "\\heva": "\\left\\{\\begin{array}{l}#1\\end{array}\\right.", "\\hoac": "\\left[\\begin{array}{l}#1\\end{array}\\right." } });
    } else if (window.MathJax) MathJax.typesetPromise();

    let oldTikz = document.getElementById('tikz-script-reload');
    if (oldTikz) oldTikz.remove();
    let newTikz = document.createElement('script');
    newTikz.id = 'tikz-script-reload';
    newTikz.src = 'https://tikzjax.com/v1/tikzjax.js';
    document.body.appendChild(newTikz);
}




// =====================================================================
// Hàm 8.15: Sự kiện Học sinh nộp lý do xin giải cứu (XỬ LÝ ĐA LUỒNG)
// =====================================================================
window.ham_8a_15_xin_luot_lam_bai_trac_nghiem = function (maNhiemVu, tenNhiemVu, loaiXin) {
    let tieuDePrompt = 'XIN THÊM LƯỢT LÀM BÀI';
    let placeholderPrompt = 'Ví dụ: Em muốn làm lại để cải thiện điểm số, mong Thầy cấp thêm lượt...';

    if (loaiXin === 'QUA_HAN') {
        tieuDePrompt = 'XIN NỘP BÀI QUÁ HẠN';
        placeholderPrompt = 'Ví dụ: Hôm qua nhà em bị cúp điện, Thầy duyệt cho em xin nộp bù bài này ạ...';
    }

    Swal.fire({
        title: tieuDePrompt,
        text: `Nhiệm vụ "${tenNhiemVu}" đã khóa. Em hãy nhập lý do gửi Thầy để xin xét duyệt:`,
        input: 'textarea',
        inputPlaceholder: placeholderPrompt,
        inputAttributes: { 'aria-label': 'Nhập lý do của em' },
        showCancelButton: true,
        confirmButtonText: '🚀 GỬI YÊU CẦU ĐẾN THẦY',
        cancelButtonText: 'Hủy',
        confirmButtonColor: '#fd7e14',
        cancelButtonColor: '#6c757d',
        showLoaderOnConfirm: true,
        inputValidator: (value) => {
            if (!value.trim()) return 'Em bắt buộc phải nhập lý do rõ ràng thì Thầy mới duyệt được nhé!';
        },
        preConfirm: async (lyDoHS) => {
            try {
                // =========================================================
                // 🌟 BƯỚC A: KIỂM TRA ĐƠN ĐANG CHỜ DUYỆT
                // =========================================================
                const { data: donDangCho, error: errCheck } = await _supabase
                    .from('yeu_cau_hoc_sinh')
                    .select('id')
                    .eq('uid_hoc_sinh', GocHocSinhState.uid)
                    .eq('ma_nhiem_vu', maNhiemVu)
                    .eq('loai_yeu_cau', loaiXin)
                    .eq('trang_thai', 0); // Chỉ quét các đơn đang chờ (Trạng thái = 0)

                if (errCheck) throw errCheck;

                // Nếu có đơn đang chờ -> Dừng lại và báo lỗi ngay trên popup
                if (donDangCho && donDangCho.length > 0) {
                    Swal.showValidationMessage('⏳ Em đã gửi đơn này rồi! Đơn đang nằm trên bàn làm việc của Thầy, em kiên nhẫn đợi Thầy duyệt nhé!');
                    return false;
                }

                // =========================================================
                // 🌟 BƯỚC B: TẠO ĐƠN MỚI (LƯU LẠI LỊCH SỬ)
                // =========================================================
                const chuoiMaLop = (GocHocSinhState.danh_sach_ma_lop || []).join(', ');

                const payload = {
                    uid_hoc_sinh: GocHocSinhState.uid,
                    ten_hoc_sinh: GocHocSinhState.ten,
                    loai_yeu_cau: loaiXin,
                    ma_nhiem_vu: maNhiemVu,
                    ma_lop: chuoiMaLop,
                    ten_nhiem_vu: tenNhiemVu,
                    ly_do: lyDoHS,
                    trang_thai: 0
                };

                const { error: errInsert } = await _supabase.from('yeu_cau_hoc_sinh').insert([payload]);
                if (errInsert) throw errInsert;

                return true;
            } catch (error) {
                console.error("LỖI GỬI ĐƠN:", error);
                Swal.showValidationMessage(`Lỗi hệ thống: ${error.message}`);
                return false;
            }
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                icon: 'success',
                title: 'Đã gửi đơn thành công!',
                text: 'Yêu cầu của em đã được ném vào Hòm thư của Giáo viên. Hãy đợi Thầy duyệt nha!',
                confirmButtonColor: '#28a745'
            });
        }
    });
};



// =====================================================================
// Hàm bổ trợ: Thực hiện bóc tách mảng JSON để lọc lớp chính xác 100%
// =====================================================================
window.ham_8a_16_loc_card_theo_lop_trac_nghiem = function (maLopChon, nutBam, isGoiNoiBo = false) {
    window.MaLopDangLocHienTai = maLopChon;

    // Chỉ đổi màu nút khi click trực tiếp, không đổi màu nếu là hàm switch_tab gọi ngầm
    if (!isGoiNoiBo) {
        document.querySelectorAll('.btn-loc-lop-cua-hs').forEach(btn => {
            btn.classList.remove('active');
            btn.style.background = 'white'; btn.style.color = '#495057'; btn.style.borderColor = '#ced4da';
        });
        nutBam.classList.add('active');
        nutBam.style.background = '#6f42c1'; nutBam.style.color = 'white'; nutBam.style.borderColor = '#6f42c1';
    }

    // Quét qua toàn bộ thẻ card có class chuẩn 'card-nhiem-vu-hs'
    const cards = document.querySelectorAll('#vung-chua-cards-nhiem-vu .card-nhiem-vu-hs');

    cards.forEach(card => {
        if (maLopChon === 'TAT_CA') {
            card.style.display = ""; // Hiện hết
        } else {
            try {
                // Bốc chuỗi JSON chứa danh sách lớp được gán ở data-attribute ra phân tích
                const mangLopJsonStr = card.getAttribute('data-mangs-lop') || "[]";
                const mangLopCuaCard = JSON.parse(mangLopJsonStr);

                // Kiểm tra xem mã lớp thầy chọn có nằm trong mảng lớp được giao của bài này không
                if (mangLopCuaCard.includes(maLopChon)) {
                    card.style.display = ""; // Khớp mã -> Hiện
                } else {
                    card.style.display = "none"; // Lệch mã -> Ẩn ngầm
                }
            } catch (err) {
                card.style.display = ""; // Bọc lót nếu lỗi chuỗi JSON
            }
        }
    });
    // 2. 🌟 TÍNH NĂNG NÂNG CẤP: ĐẾM ĐỘNG SỐ LƯỢNG THEO LỚP CHO TOÀN BỘ 4 NHÃN TAB
    window.ham_8a_17_cap_nhat_so_luong_nhan_tab_trac_nghiem(maLopChon);

};



// =====================================================================
// Hàm phụ mới: Tính toán và cập nhật con số hiển thị trên 4 nhãn Tab
// =====================================================================
window.ham_8a_17_cap_nhat_so_luong_nhan_tab_trac_nghiem = function (maLopChon) {
    // Tạo một trình giả lập kiểm tra điều kiện lớp nhanh
    const checkHopLeLop = (htmlCardStr) => {
        if (maLopChon === 'TAT_CA') return true;
        // Tìm chuỗi chứa mã lớp trong thuộc tính data-mangs-lop của HTML cache
        return htmlCardStr.includes(`"${maLopChon}"`);
    };

    // Tạo parser tạm thời để đếm số lượng phần tử card thỏa mãn từ bộ nhớ đệm (Cache)
    const demCardThoalMan = (htmlGoc) => {
        if (!htmlGoc || htmlGoc.includes("text-align:center")) return 0;

        // Tạo một Div ảo trên RAM để ép HTML vào đếm cho chính xác
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlGoc;
        const cacCards = tempDiv.querySelectorAll('.card-nhiem-vu-hs');

        let bieuDem = 0;
        cacCards.forEach(c => {
            try {
                const mangLop = JSON.parse(c.getAttribute('data-mangs-lop') || "[]");
                if (maLopChon === 'TAT_CA' || mangLop.includes(maLopChon)) {
                    bieuDem++;
                }
            } catch (e) { }
        });
        return bieuDem;
    };

    // Đếm số lượng thực tế theo bộ lọc lớp hiện tại
    const countCanLam = demCardThoalMan(window.CachedCardsCanLamHtml);
    const countLamLai = demCardThoalMan(window.CachedCardsLamLaiHtml);
    const countChuaKhoa = demCardThoalMan(window.CachedCardsChuaLamKhoaHtml);
    const countDaKhoa = demCardThoalMan(window.CachedCardsDaLamKhoaHtml);

    // Ghi đè con số mới lên giao diện nhãn text của 4 nút Tab
    const btnCanLam = document.getElementById('btn-tab-can-lam');
    const btnLamLai = document.getElementById('btn-tab-lam-lai');
    const btnChuaKhoa = document.getElementById('btn-tab-chua-lam-khoa');
    const btnDaKhoa = document.getElementById('btn-tab-da-lam-khoa');

    if (btnCanLam) btnCanLam.innerText = `🎯 CẦN LÀM (${countCanLam})`;
    if (btnLamLai) btnLamLai.innerText = `🔄 ĐÃ LÀM (CÒN LƯỢT) (${countLamLai})`;
    if (btnChuaKhoa) btnChuaKhoa.innerText = `⬛ CHƯA LÀM (ĐÃ KHÓA) (${countChuaKhoa})`;
    if (btnDaKhoa) btnDaKhoa.innerText = `🟥 ĐÃ LÀM (ĐÃ KHÓA) (${countDaKhoa})`;
};




function ham_8a_18_capNhatMauNutLuoi_trac_nghiem(maCauHoi, textHienThi) {
    const nut = document.getElementById(`btn-nav-${maCauHoi}`);
    const ansSpan = document.getElementById(`nav-ans-${maCauHoi}`);

    if (nut && !nut.classList.contains('da-lam')) {
        nut.classList.add('da-lam');
        nut.style.background = '#d4edda';
        nut.style.borderColor = '#c3e6cb';
        nut.style.color = '#155724';

        // Cập nhật số câu đã làm
        document.getElementById('so-cau-da-lam').innerText = Object.keys(window.PhienLamBai.dap_an_hoc_sinh).length;
    }
    if (ansSpan) ansSpan.innerText = textHienThi.substring(0, 4); // Rút gọn chuỗi ĐS
}

window.ham_8a_19_thoat_phong_thi_trac_nghiem = async () => {
    const daLam = Object.keys(window.PhienLamBai.dap_an_hoc_sinh).length;
    if (daLam > 0) {
        if (!confirm("⚠️ CẢNH BÁO!\nNếu thoát bây giờ, bài của bạn SẼ BỊ HỦY KHÔNG GHI NHẬN ĐIỂM. Bạn có chắc chắn muốn thoát?")) return;
    }
    clearInterval(window.PhienLamBai.id_timer);
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';

    const root = document.getElementById('khong-gian-thi-toan-man-hinh');
    if (root) root.remove();
    document.getElementById('dashboard-container').style.display = 'block';
};



// ==============================================================
// Hàm Bổ trợ: Vẽ từng câu hỏi (Sửa lỗi 404 tách biệt 2 kho Ảnh)
// ==============================================================

function ham_8a_20_taoGiaoDienCauHoiDaCham_trac_nghiem(cau, baiLamHS, stt, loaiCau, thuMucAnh, choPhepXemDapAn, choPhepXemLoiGiai) {
    const maCauLogic = cau.ma_cau_hoi || cau.maCau;
    const maCauHienThi = cau.ma_goc || cau.maCauGoc || maCauLogic;

    // 🌟 KHU VỰC CẢI TIẾN: Điều hướng ảnh thông minh
    const thuMucAnhGiai = "https://ducchinh2308.github.io/LuyenToan2308/Ngan_Hang_Loi_Giai/HinhAnh_Chung";

    // Nếu vẫn không tìm thấy ID thì dừng lại để tránh lỗi tiếp theo
    if (!maCauLogic) {
        console.error("LỖI: Không tìm thấy ID cho câu hỏi:", cau);
        return `<div style="color:red">Lỗi tải câu hỏi (Thiếu ID)</div>`;
    }



    const xuLyNoiDung = (noiDung, isLoiGiai = false) => {
        if (!noiDung) return "";
        let htmlDich = typeof dichLaTeX === 'function' ? dichLaTeX(noiDung) : noiDung;
        return htmlDich.replace(/src=['"]([^'"]+)['"]/g, (match, tenFile) => {
            if (tenFile.startsWith('http') || tenFile.startsWith('data:')) return match;
            const cleanFile = tenFile.split('/').pop();

            // Nếu là ảnh của Lời giải -> Trỏ về kho Giải Chung
            if (isLoiGiai) {
                return `src="${thuMucAnhGiai}/${cleanFile}"`;
            }
            // Nếu là ảnh của Đề thi -> Trỏ về kho Đề riêng
            return `src="${thuMucAnh}/${cleanFile}"`;
        });
    };

    let diemBadge = `<span style="background:#e9ecef; color:#495057; padding:2px 8px; border-radius:12px; font-size:12px; font-weight:bold;">Đã ghi nhận</span>`;
    if (choPhepXemDapAn) {
        diemBadge = baiLamHS.diem > 0
            ? `<span style="background:#d4edda; color:#155724; padding:2px 8px; border-radius:12px; font-size:12px; font-weight:bold;">+${baiLamHS.diem} đ</span>`
            : `<span style="background:#f8d7da; color:#721c24; padding:2px 8px; border-radius:12px; font-size:12px; font-weight:bold;">0 đ</span>`;
    }

    let htmlBlock = `
        <div id="review-cau-${maCauLogic}" class="cau-hoi" style="margin-bottom: 30px; padding: 25px; border: 1px solid #ccc; border-radius: 8px; background: #fff; box-shadow: 0 4px 8px rgba(0,0,0,0.05); pointer-events: none;">
            <p style="color: #0056b3; margin-top: 0; font-size: 18px; display: flex; justify-content: space-between; border-bottom: 1px solid #eee; padding-bottom: 10px;">
                <span style="display: flex; align-items: baseline; gap: 8px;">
                    <strong style="font-weight: 900; color: #000080;">(${loaiCau}) Câu ${stt}:</strong>
                    <span style="font-size: 13px; color: #6c757d; font-weight: bold; background: #f8f9fa; padding: 2px 6px; border: 1px solid #ddd; border-radius: 4px;">[ID: ${maCauHienThi}]</span> 
                </span>
                ${diemBadge}
            </p>
            <div style="font-size: 17px; line-height: 1.6; margin-bottom: 20px; margin-top: 15px; overflow-x: auto;">${xuLyNoiDung(cau.cauDan || cau.noiDungHtml)}</div>
    `;

    // 1. DẠNG TRẮC NGHIỆM MULTIPLE CHOICE (TN)
    if (loaiCau === "TN") {
        htmlBlock += `<div style="display: flex; flex-direction: column; gap: 10px;">`;
        const mangPA = cau.dsTron || [{ idGoc: 'A', text: cau.paA }, { idGoc: 'B', text: cau.paB }, { idGoc: 'C', text: cau.paC }, { idGoc: 'D', text: cau.paD }];

       
        mangPA.forEach((pa, idx) => {
            const nhan = String.fromCharCode(65 + idx);
            const isStudentPicked = (pa.idGoc === baiLamHS.luaChonHS);
            const isCorrect = (pa.idGoc === cau.dap_an);

            // Logic CSS
            let bgLabel = "#f8f9fa", borderLabel = "#ddd", colorLabel = "#495057";

            if (choPhepXemDapAn) {
                if (isStudentPicked) {
                    if (isCorrect) {
                        // ĐÚNG: Xanh dương toàn bộ
                        bgLabel = "#007bff"; borderLabel = "#0056b3"; colorLabel = "#ffffff";
                        // Lưu mô tả ĐÚNG vào biến tạm để ném xuống footer
                        window.tempMoTaTN = `<div style="padding: 8px 16px; background: #d4edda; border: 1px solid #c3e6cb; border-radius: 6px; font-weight: bold; color: #155724; font-size: 13px; flex-grow: 1; margin-right: 10px;">✅ Đúng, em chọn ${nhan}</div>`;
                    } else {
                        // SAI: Đỏ nhạt
                        bgLabel = "#f8d7da"; borderLabel = "#f5c6cb"; colorLabel = "#721c24";
                        // Lưu mô tả SAI vào biến tạm để ném xuống footer
                        window.tempMoTaTN = `<div style="padding: 8px 16px; background: #f8d7da; border: 1px solid #f5c6cb; border-radius: 6px; font-weight: bold; color: #721c24; font-size: 13px; flex-grow: 1; margin-right: 10px;">❌ Sai, em chọn ${nhan}, đáp án là ${cau.dap_an || "chưa rõ"}</div>`;
                    }
                } else if (isCorrect) {
                    // ĐÁP ÁN ĐÚNG (Khi HS không chọn): Viền xanh lá
                    borderLabel = "#28a745"; bgLabel = "#d4edda"; colorLabel = "#155724";

                    // Trường hợp học sinh bỏ trống không chọn gì cả
                    if (!baiLamHS.luaChonHS && window.tempMoTaTN === "") {
                        window.tempMoTaTN = `<div style="padding: 8px 16px; background: #fff3cd; border: 1px solid #ffeeba; border-radius: 6px; font-weight: bold; color: #856404; font-size: 13px; flex-grow: 1; margin-right: 10px;">⚠️ Em bỏ trống, đáp án là ${nhan}</div>`;
                    }
                }
            }
            else if (isStudentPicked) {
                bgLabel = "#e8f4f8"; borderLabel = "#b8daff"; colorLabel = "#0056b3";
                window.tempMoTaTN = `<div style="padding: 8px 16px; background: #e8f4f8; border: 1px solid #b8daff; border-radius: 6px; font-weight: bold; color: #0056b3; font-size: 13px; flex-grow: 1; margin-right: 10px;">🔷 Em đã chọn ${nhan}</div>`;
            }

            // Giao diện thẻ Label (Đã xóa textMota bên trong)
            htmlBlock += `
                <label style="display: flex; align-items: flex-start; padding: 12px; margin-bottom:8px; border: 2px solid ${borderLabel}; border-radius: 6px; background: ${bgLabel}; color: ${colorLabel}; transition: 0.2s;">
                    <input type="radio" ${isStudentPicked ? 'checked' : ''} disabled style="margin-top: 5px; margin-right: 15px; transform: scale(1.3);">
                    <div style="flex:1; font-size: 17px;">
                        <b>${nhan}.</b> ${xuLyNoiDung(pa.text)}
                    </div>
                </label>`;
        });
        htmlBlock += `</div>`;
    }


    // 2. DẠNG ĐÚNG SAI (DS)
    else if (loaiCau === "DS") {
        htmlBlock += `<div class="cau-ds">`;
        const mangY = [{ id: 'a', text: cau.paA }, { id: 'b', text: cau.paB }, { id: 'c', text: cau.paC }, { id: 'd', text: cau.paD }];
        const dapAnChuan = cau.dap_an || ""; // Ví dụ: "TTFT"
        const chuoiBaiLam = baiLamHS.luaChonHS || ""; // Ví dụ: "TFTT" (Lấy từ dữ liệu thầy gửi)

        let soYDung = 0;
        mangY.forEach((y, idx) => {
            if (chuoiBaiLam[idx] === dapAnChuan[idx]) soYDung++;
        });

        mangY.forEach((y, idx) => {
            const nhan = ['a', 'b', 'c', 'd'][idx];
            const hsChon = chuoiBaiLam[idx];
            const correctVal = dapAnChuan[idx];

            const hsT = (hsChon === 'T');
            const hsF = (hsChon === 'F');

            let bgT = "#f8f9fa", borderT = "#ccc", colorT = "#495057";
            let bgF = "#f8f9fa", borderF = "#ccc", colorF = "#495057";

            if (choPhepXemDapAn) {
                // Tô màu cho nút ĐÚNG
                if (hsT) {
                    if (correctVal === 'T') { bgT = "#007bff"; borderT = "#0056b3"; colorT = "#ffffff"; }
                    else { bgT = "#f8d7da"; borderT = "#f5c6cb"; colorT = "#721c24"; }
                } else if (correctVal === 'T') { borderT = "#28a745"; bgT = "#d4edda"; colorT = "#155724"; }

                // Tô màu cho nút SAI
                if (hsF) {
                    if (correctVal === 'F') { bgF = "#007bff"; borderF = "#0056b3"; colorF = "#ffffff"; }
                    else { bgF = "#f8d7da"; borderF = "#f5c6cb"; colorF = "#721c24"; }
                } else if (correctVal === 'F') { borderF = "#28a745"; bgF = "#d4edda"; colorF = "#155724"; }
            } else {
                // 🌟 CHỈ HIỂN THỊ LỰA CHỌN CỦA HS KHI KHÓA ĐÁP ÁN
                if (hsT) { bgT = "#e8f4f8"; borderT = "#b8daff"; colorT = "#0056b3"; }
                if (hsF) { bgF = "#e8f4f8"; borderF = "#b8daff"; colorF = "#0056b3"; }
            }

            htmlBlock += `
            <div style="margin-bottom: 8px; padding: 10px; background: #fff; border: 1px solid #eee; border-radius: 6px; display: flex; justify-content: space-between; align-items: center;">
                <div style="flex: 1; font-size: 16px;"><strong>${nhan})</strong> ${xuLyNoiDung(y.text)}</div>
                <div style="display: flex; gap: 10px;">
                    <span style="padding: 4px 12px; border-radius: 4px; border: 2px solid ${borderT}; background: ${bgT}; color: ${colorT}; font-weight: bold;">Đúng</span>
                    <span style="padding: 4px 12px; border-radius: 4px; border: 2px solid ${borderF}; background: ${bgF}; color: ${colorF}; font-weight: bold;">Sai</span>
                </div>
            </div>`;
        });

        // 🌟 CHUYỂN DÒNG MÔ TẢ XUỐNG DƯỚI VÀ KIỂM TRA ĐIỀU KIỆN
        // Xử lý chuỗi hiển thị: Nếu hs chưa chọn thì hiện "_" thay vì lỗi
        const chuoiDichHS = Array.from(chuoiBaiLam).map(k => k === 'T' ? 'Đ' : (k === 'F' ? 'S' : '_')).join('-');

        if (choPhepXemDapAn) {
            // Khi cho phép xem: Hiện đầy đủ số câu đúng, lựa chọn và đáp án
            const chuoiDichDA = Array.from(dapAnChuan).map(k => k === 'T' ? 'Đ' : 'S').join('-');
            window.tempMoTaDS = `
                <div style="padding: 8px 16px; background: #fff3cd; border: 1px solid #ffeeba; border-radius: 6px; font-weight: bold; color: #856404; font-size: 13px; flex-grow: 1; margin-right: 10px;">
                    🎯 Đúng ${soYDung}/4 ý | 👤 Em: ${chuoiDichHS} | ✅ ĐA: ${chuoiDichDA}
                </div>`;
        } else {
            // Khi khóa đáp án: Chỉ hiện dòng thông báo lựa chọn của học sinh (Màu xanh lam nhẹ nhàng)
            window.tempMoTaDS = `
                <div style="padding: 8px 16px; background: #e8f4f8; border: 1px solid #b8daff; border-radius: 6px; font-weight: bold; color: #0056b3; font-size: 13px; flex-grow: 1; margin-right: 10px;">
                    🔷 Em đã chọn: ${chuoiDichHS}
                </div>`;
        }

        htmlBlock += `</div>`;
        
    }
    // 3. DẠNG TRẢ LỜI NGẮN (TLN)
    else if (loaiCau === "TLN") {
        // 🌟 BƯỚC SỬA LỖI: Xử lý an toàn mọi kiểu dữ liệu (Số, Mảng, Object rỗng, Chuỗi)
        let rawAns = baiLamHS.luaChonHS;
        let hsAns = "";

        if (rawAns !== null && rawAns !== undefined) {
            if (typeof rawAns === 'object' && !Array.isArray(rawAns)) {
                hsAns = ""; // Trường hợp mặc định object rỗng {}
            } else if (Array.isArray(rawAns)) {
                hsAns = rawAns.join(""); // Nếu Database lưu dạng mảng
            } else {
                hsAns = String(rawAns).trim(); // Ép số (VD: 12.5) thành chuỗi "12.5"
            }
        }

        const isCorrect = (baiLamHS.ketQua === "Đúng");
        const dapAnChuan = cau.dap_an || "Chưa cập nhật";

        let borderColor = "#1a73e8", bgInput = "#fff", colorText = "#1a73e8";

        if (choPhepXemDapAn) {
            if (isCorrect) {
                // ĐÚNG: Xanh lá
                borderColor = "#28a745"; bgInput = "#d4edda"; colorText = "#155724";
                window.tempMoTaTLN = `
                    <div style="padding: 8px 16px; background: #d4edda; border: 1px solid #c3e6cb; border-radius: 6px; font-weight: bold; color: #155724; font-size: 13px; flex-grow: 1; margin-right: 10px;">
                        ✅ Chính xác, em đã điền: ${hsAns}
                    </div>`;
            } else {
                // SAI: Đỏ nhạt
                borderColor = "#dc3545"; bgInput = "#f8d7da"; colorText = "#721c24";
                const hsHienThi = hsAns ? hsAns : "Bỏ trống";
                window.tempMoTaTLN = `
                    <div style="padding: 8px 16px; background: #f8d7da; border: 1px solid #f5c6cb; border-radius: 6px; font-weight: bold; color: #721c24; font-size: 13px; flex-grow: 1; margin-right: 10px;">
                        ❌ Sai, em điền: ${hsHienThi} | ✅ ĐA chuẩn: ${dapAnChuan}
                    </div>`;
            }
        } else {
            // KHÓA ĐÁP ÁN: Xanh lam nhạt
            const hsHienThi = hsAns ? hsAns : "Chưa điền";
            window.tempMoTaTLN = `
                <div style="padding: 8px 16px; background: #e8f4f8; border: 1px solid #b8daff; border-radius: 6px; font-weight: bold; color: #0056b3; font-size: 13px; flex-grow: 1; margin-right: 10px;">
                    🔷 Em đã điền: ${hsHienThi}
                </div>`;
        }

        let inputHtml = "";
        // Rải đều chuỗi hsAns vào 4 ô vuông
        for (let i = 0; i < 4; i++) {
            let char = hsAns[i] || "";
            inputHtml += `<input type="text" value="${char}" readonly style="width: 55px; height: 60px; text-align: center; font-size: 26px; font-weight: bold; border: 2px solid ${borderColor}; border-radius: 8px; color: ${colorText}; outline: none; background: ${bgInput}; text-transform: uppercase;">`;
        }

        htmlBlock += `
            <div style="margin-top: 15px; padding: 25px; background: #f8f9fa; border-radius: 8px; border: 1px dashed #ccc; text-align: center;">
                <div style="display: flex; justify-content: center; gap: 12px;">${inputHtml}</div>
            </div>`;
    }

    const idVungLoiGiai = `loigiai-${maCauLogic}`;

    let textDapAnChuan = "";
    if (loaiCau === "TN") textDapAnChuan = `Đáp án đúng: ${cau.dap_an || "A"}`;
    else if (loaiCau === "DS") {
        let chuoiGợiY = [];
        (cau.dap_an || "TTTT").split("").forEach((k, i) => {
            chuoiGợiY.push(`${['a', 'b', 'c', 'd'][i]}: ${k === 'T' ? 'Đ' : 'S'}`);
        });
        textDapAnChuan = `Đáp án đúng: ${chuoiGợiY.join(" | ")}`;
    } else if (loaiCau === "TLN") {
        textDapAnChuan = `Đáp án đúng: ${cau.dap_an}`;
    }

    let cssNutLoiGiai = "padding: 8px 16px; background: #fff; color: #6f42c1; border: 1.5px solid #6f42c1; border-radius: 6px; font-weight: bold; font-size: 13px; cursor: pointer; transition: 0.2s;";
    let attrNutLoiGiai = `onclick="let v=document.getElementById('${idVungLoiGiai}'); if(v.style.display==='none'){v.style.display='block'; this.innerText='📖 THU GỌN LỜI GIẢI';}else{v.style.display='none'; this.innerText='📖 XEM LỜI GIẢI CHI TIẾT';}"`;

    if (!choPhepXemLoiGiai) {
        cssNutLoiGiai = "padding: 8px 16px; background: #e9ecef; color: #6c757d; border: 1.5px solid #ccc; border-radius: 6px; font-weight: bold; font-size: 13px; cursor: not-allowed; opacity: 0.5;";
        attrNutLoiGiai = `onclick="alert('🔒 Chức năng xem Lời giải chi tiết của câu hỏi này đang khóa!')"`;
    }

    htmlBlock += `
        <div style="margin-top: 20px; border-top: 1px dotted #ccc; padding-top: 15px; display: flex; gap: 12px; flex-wrap: wrap; pointer-events: auto;">
            ${(loaiCau === 'DS' ? (window.tempMoTaDS || '') : (loaiCau === 'TLN' ? (window.tempMoTaTLN || '') : (window.tempMoTaTN || '')))}

            
            ${choPhepXemDapAn ? `
                <button style="padding: 8px 16px; background: #e8f4f8; color: #1a73e8; border: 1.5px solid #1a73e8; border-radius: 6px; font-weight: bold; font-size: 13px; cursor: default;">
                    🎯 ${textDapAnChuan}
                </button>
            ` : `
                <button onclick="alert('🔒 Đáp án chuẩn đang được bảo mật!')" style="padding: 8px 16px; background: #f8d7da; color: #721c24; border: 1.5px solid #f5c6cb; border-radius: 6px; font-weight: bold; font-size: 13px; cursor: not-allowed; opacity: 0.6;">
                    🔒 ĐÁP ÁN ĐANG KHÓA
                </button>
            `}

            <button ${attrNutLoiGiai} style="${cssNutLoiGiai}" 
                    onmouseover="if(${choPhepXemLoiGiai}){this.style.background='#6f42c1'; this.style.color='white';}" 
                    onmouseout="if(${choPhepXemLoiGiai}){this.style.background='white'; this.style.color='#6f42c1';}">
                📖 XEM LỜI GIẢI CHI TIẾT
            </button>
        </div>

        <div id="${idVungLoiGiai}" style="display: none; margin-top: 15px; padding: 20px; background: #faf8ff; border-left: 4px solid #6f42c1; border-radius: 4px; font-size: 16px; line-height: 1.6; overflow-x: auto; color: #2c3e50; pointer-events: auto;">
            <div style="font-weight: bold; color: #6f42c1; margin-bottom: 8px; font-size:14px; text-transform:uppercase;">💡 Hướng dẫn giải chi tiết:</div>
            ${xuLyNoiDung(cau.loiGiaiHtml || "<p style='color:#999; font-style:italic;'>Hệ thống chưa cập nhật lời giải văn bản cho câu hỏi này.</p>", true)}
        </div>
    `;

    // 🌟 RESET TẤT CẢ BIẾN TẠM SAU KHI VẼ XONG CÂU
    window.tempMoTaDS = "";
    window.tempMoTaTN = "";
    window.tempMoTaTLN = "";

    return htmlBlock + `</div>`;
}


window.ham_8a_22_dongGiaoDienXemLai_trac_nghiem = function () {
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    document.getElementById('khong-gian-xem-lai-toan-man-hinh')?.remove();
    document.getElementById('dashboard-container').style.display = 'block';
};

window.ham_8a_24_vao_lam_bai_trac_nghiem = function(maNhiemVu) {
    // Gọi thẳng đến hàm an ninh của Trắc nghiệm
    if (typeof ham_8a_7_cua_an_ninh === 'function') {
        ham_8a_7_cua_an_ninh(maNhiemVu);
    } else {
        alert("⚠️ Lỗi: Không tìm thấy hàm an ninh Trắc nghiệm!");
    }
};




// // =====================================================================
// // HÀM BỔ TRỢ: XỬ LÝ LƯU ĐÁP ÁN & CẬP NHẬT GIAO DIỆN NAV
// // =====================================================================
// window.ham_8_25_luuDapAn = function (maCauHoi, luaChon, element) {
//     if (!luaChon) return; // Nếu TLN xóa trắng thì bỏ qua
//     window.PhienLamBai.dap_an_hoc_sinh[maCauHoi] = luaChon;

//     // Xử lý đổi màu radio box TN
//     if (element && element.type === 'radio') {
//         const khoiTN = element.closest('.cau-hoi');
//         khoiTN.querySelectorAll('label').forEach(lbl => {
//             lbl.style.background = '#f8f9fa'; lbl.style.borderColor = '#ddd';
//         });
//         const labelChon = element.closest('label');
//         labelChon.style.background = '#e8f0fe'; labelChon.style.borderColor = '#b8daff';
//     }

//     ham_8a_18_capNhatMauNutLuoi_trac_nghiem(maCauHoi, luaChon);

//     // 🌟 [CẤY CHIP 3] VỪA BẤM VỪA BẮN SÓNG NẾU ĐANG THI LIVE
//     //if (window.PhienLamBai && window.PhienLamBai.isLiveQuiz) ham_8_6_4_ban_song_realtime();


// };

// window.ham_8_26_luuDapAnDS = function (maCauHoi, y, giaTri, element) {
//     if (!window.PhienLamBai.dap_an_hoc_sinh[maCauHoi]) window.PhienLamBai.dap_an_hoc_sinh[maCauHoi] = {};
//     window.PhienLamBai.dap_an_hoc_sinh[maCauHoi][y] = giaTri;

//     let chuoiDS = "";
//     ['A', 'B', 'C', 'D'].forEach(key => {
//         const val = window.PhienLamBai.dap_an_hoc_sinh[maCauHoi][key];
//         chuoiDS += val ? (val === 'T' ? 'Đ' : 'S') : '_';
//     });
//     ham_8a_18_capNhatMauNutLuoi_trac_nghiem(maCauHoi, chuoiDS);

//     // 🌟 [CẤY CHIP 3] VỪA BẤM VỪA BẮN SÓNG NẾU ĐANG THI LIVE
//     //if (window.PhienLamBai && window.PhienLamBai.isLiveQuiz) ham_8_6_4_ban_song_realtime();

// };



// =====================================================================
// HÀM BỔ TRỢ: XỬ LÝ LƯU ĐÁP ÁN & CẬP NHẬT GIAO DIỆN NAV
// =====================================================================
window.ham_8_25_luuDapAn = function (maCauHoi, luaChon, element) {
    if (!luaChon) return; // Nếu TLN xóa trắng thì bỏ qua
    window.PhienLamBai.dap_an_hoc_sinh[maCauHoi] = luaChon;

    // Xử lý đổi màu radio box TN
    if (element && element.type === 'radio') {
        const khoiTN = element.closest('.cau-hoi');
        khoiTN.querySelectorAll('label').forEach(lbl => {
            lbl.style.background = '#f8f9fa'; lbl.style.borderColor = '#ddd';
        });
        const labelChon = element.closest('label');
        labelChon.style.background = '#e8f0fe'; labelChon.style.borderColor = '#b8daff';
    }

    ham_8a_18_capNhatMauNutLuoi_trac_nghiem(maCauHoi, luaChon);

    // 🌟 [AUTO-SAVE BƯỚC 2] LƯU XUỐNG LOCAL-STORAGE KHI CHỌN ĐÁP ÁN
    if (!window.PhienLamBai.isLiveQuiz && typeof ham_16_1_luu_local_storage === 'function') {
        ham_16_1_luu_local_storage(window.PhienLamBai.ma_nhiem_vu, maCauHoi, luaChon);
    }
};

window.ham_8_26_luuDapAnDS = function (maCauHoi, y, giaTri, element) {
    if (!window.PhienLamBai.dap_an_hoc_sinh[maCauHoi]) window.PhienLamBai.dap_an_hoc_sinh[maCauHoi] = {};
    window.PhienLamBai.dap_an_hoc_sinh[maCauHoi][y] = giaTri;

    let chuoiDS = "";
    ['A', 'B', 'C', 'D'].forEach(key => {
        const val = window.PhienLamBai.dap_an_hoc_sinh[maCauHoi][key];
        chuoiDS += val ? (val === 'T' ? 'Đ' : 'S') : '_';
    });
    ham_8a_18_capNhatMauNutLuoi_trac_nghiem(maCauHoi, chuoiDS);

    // 🌟 [AUTO-SAVE BƯỚC 2] LƯU XUỐNG LOCAL-STORAGE KHI CHỌN ĐÁP ÁN (Lưu cả Object Đúng/Sai)
    if (!window.PhienLamBai.isLiveQuiz && typeof ham_16_1_luu_local_storage === 'function') {
        ham_16_1_luu_local_storage(window.PhienLamBai.ma_nhiem_vu, maCauHoi, window.PhienLamBai.dap_an_hoc_sinh[maCauHoi]);
    }
};



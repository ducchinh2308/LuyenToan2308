// =====================================================================
// KHỐI 9: TỔ CHỨC THI ĐẤU TRỰC TIẾP (LIVE QUIZ)
// =====================================================================


// [Nhãn thời gian: 19:10 - Ngày 28/05/2026] - Hàm 9.1: Vẽ Tab Quản lý Live Quiz (Thêm cột Số HS tham gia)
// window.ham_9_1_tab_live_quiz = async function () {
//     const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
//     vungLamViec.innerHTML = `<div style="text-align: center; padding: 40px;"><h3 style="color:#e74c3c;">⏳ Đang tải dữ liệu Đấu trường Live...</h3></div>`;

//     try {
//         // 1. Tải danh sách phòng
//         const { data: dsPhong, error } = await _supabase
//             .from('phong_live_quiz')
//             .select('*')
//             .order('ngay_tao', { ascending: false });

//         if (error) throw error;

//         // 2. Tải từ điển Tên Nhiệm Vụ 
//         let tuDienNV = {};
//         const { data: dsNV } = await _supabase.from('nhiem_vu').select('ma_nhiem_vu, ten_nhiem_vu');
//         if (dsNV) {
//             dsNV.forEach(nv => tuDienNV[nv.ma_nhiem_vu] = nv.ten_nhiem_vu);
//         }

//         // 🌟 3. THUẬT TOÁN ĐẾM SỐ HỌC SINH THAM GIA TỪ BẢNG TIẾN ĐỘ LIVE
//         let tuDienSoHS = {};
//         if (dsPhong && dsPhong.length > 0) {
//             const mangMaPhong = dsPhong.map(p => p.ma_phong);
//             const { data: dsTienDo } = await _supabase
//                 .from('tien_do_live_quiz')
//                 .select('ma_phong, uid_hoc_sinh')
//                 .in('ma_phong', mangMaPhong); // Chỉ tải những phòng đang hiển thị

//             if (dsTienDo) {
//                 dsTienDo.forEach(td => {
//                     if (!tuDienSoHS[td.ma_phong]) tuDienSoHS[td.ma_phong] = new Set();
//                     tuDienSoHS[td.ma_phong].add(td.uid_hoc_sinh); // Dùng Set để tự động lọc trùng lặp học sinh
//                 });
//             }
//         }

//         let htmlRows = '';
//         if (!dsPhong || dsPhong.length === 0) {
//             htmlRows = `<tr><td colspan="7" style="text-align:center; padding: 30px; color:#6c757d;">Chưa có phòng thi Live nào được tạo. Hãy bấm "Tạo Phòng Mới" để bắt đầu!</td></tr>`;
//         } else {
//             dsPhong.forEach((phong, index) => {
//                 const tenNhiemVu = tuDienNV[phong.ma_nhiem_vu] || 'Nhiệm vụ ảo đã bị xóa';
//                 const thoiGianTao = new Date(phong.ngay_tao).toLocaleString('vi-VN');

//                 // 🌟 Lấy số lượng học sinh thực tế của phòng này
//                 const soHocSinh = tuDienSoHS[phong.ma_phong] ? tuDienSoHS[phong.ma_phong].size : 0;
//                 const htmlSoHS = `<span style="background: #e3f2fd; color: #1565c0; padding: 4px 10px; border-radius: 12px; font-weight: 900; font-size: 13px; box-shadow: 0 1px 2px rgba(0,0,0,0.1);">👤 ${soHocSinh}</span>`;

//                 let badgeTrangThai = '';
//                 let htmlThaoTac = '';

//                 // CHUẨN BỊ CÁC NÚT BẤM (Grid 2x2)
//                 const btnThongKe = `<button onclick="ham_9_5_thong_ke_live_quiz('${phong.ma_phong}', '${phong.ma_nhiem_vu}', '${tenNhiemVu.replace(/'/g, "\\'")}')" style="padding: 6px; background: #6f42c1; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; font-size: 11px; width: 100%; box-shadow: 0 1px 2px rgba(0,0,0,0.1);" title="Xem kết quả bài làm">📊 K.Quả</button>`;
//                 const btnXoa = `<button onclick="ham_9_4_xoa_phong_live('${phong.ma_phong}', '${phong.ma_nhiem_vu}')" style="padding: 6px; background: #dc3545; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; font-size: 11px; width: 100%; box-shadow: 0 1px 2px rgba(0,0,0,0.1);" title="Xóa phòng">❌ Xóa</button>`;
//                 const btnDuPhong = `<button onclick="Swal.fire('Tính năng dự phòng', 'Nút này sẽ dùng cho các tính năng nâng cấp sau này!', 'info')" style="padding: 6px; background: #6c757d; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; font-size: 11px; width: 100%; box-shadow: 0 1px 2px rgba(0,0,0,0.1);" title="Dự phòng">⚙️ C.Đặt</button>`;

//                 let btnDieuKhien = '';

//                 if (phong.trang_thai === 0) {
//                     badgeTrangThai = `<span style="background:#e8f5e9; color:#2e7d32; padding:4px 8px; border-radius:4px; font-size:12px; font-weight:bold; border:1px solid #c8e6c9; white-space:nowrap;">ĐANG CHỜ HS</span>`;
//                     btnDieuKhien = `<button onclick="ham_9_3_vao_dieu_khien_phong('${phong.ma_phong}')" style="padding: 6px; background: #28a745; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; font-size: 11px; width: 100%; box-shadow: 0 1px 2px rgba(0,0,0,0.1);" title="Vào phòng điều khiển">🚀 V.Phòng</button>`;
//                 } else if (phong.trang_thai === 1) {
//                     badgeTrangThai = `<span style="background:#ffebee; color:#c62828; padding:4px 8px; border-radius:4px; font-size:12px; font-weight:bold; border:1px solid #ffcdd2; white-space:nowrap;">🔥 ĐANG THI</span>`;
//                     btnDieuKhien = `<button onclick="ham_9_3_vao_dieu_khien_phong('${phong.ma_phong}')" style="padding: 6px; background: #e74c3c; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; font-size: 11px; width: 100%; box-shadow: 0 1px 2px rgba(0,0,0,0.1);" title="Xem thi đấu trực tiếp">👀 Live</button>`;
//                 } else {
//                     badgeTrangThai = `<span style="background:#f1f3f4; color:#5f6368; padding:4px 8px; border-radius:4px; font-size:12px; font-weight:bold; border:1px solid #dadce0; white-space:nowrap;">ĐÃ KẾT THÚC</span>`;
//                     btnDieuKhien = `<button onclick="ham_9_3_vao_dieu_khien_phong('${phong.ma_phong}')" style="padding: 6px; background: #17a2b8; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; font-size: 11px; width: 100%; box-shadow: 0 1px 2px rgba(0,0,0,0.1);" title="Xem bảng xếp hạng">🏆 X.Hạng</button>`;
//                 }

//                 htmlThaoTac = `
//                     <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; width: 160px; margin: 0 auto;">
//                         ${btnDieuKhien}
//                         ${btnThongKe}
//                         ${btnXoa}
//                         ${btnDuPhong}
//                     </div>
//                 `;

//                 htmlRows += `
//                     <tr style="border-bottom: 1px solid #eee; background: #fff; transition: 0.2s;" onmouseover="this.style.background='#fdf2f2'" onmouseout="this.style.background='#fff'">
//                         <td style="padding: 12px 10px; text-align: center; color: #666; font-weight: bold;">${index + 1}</td>
//                         <td style="padding: 12px 10px; text-align: center;">
//                             <b style="font-size: 20px; color: #e74c3c; font-family: monospace; letter-spacing: 2px;">${phong.ma_phong}</b>
//                         </td>
//                         <td style="padding: 12px 10px;">
//                             <div style="font-weight: bold; color: #1a73e8; font-size: 14px; line-height: 1.4;">${tenNhiemVu}</div>
//                             <div style="font-size: 11px; color: #888; margin-top: 4px;">Mã NV Ảo: ${phong.ma_nhiem_vu}</div>
//                         </td>
//                         <td style="padding: 12px 10px; font-size: 12px; color: #555;">${thoiGianTao}</td>
//                         <td style="padding: 12px 10px; text-align: center;">${htmlSoHS}</td>
//                         <td style="padding: 12px 10px; text-align: center;">${badgeTrangThai}</td>
//                         <td style="padding: 12px 10px; text-align: center;">${htmlThaoTac}</td>
//                     </tr>
//                 `;
//             });
//         }

//         vungLamViec.innerHTML = `
//             <div style="background: white; border: 1px solid #e0e0e0; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); overflow: hidden;">
//                 <div style="background: linear-gradient(135deg, #e74c3c, #c0392b); padding: 20px; color: white; display: flex; justify-content: space-between; align-items: center;">
//                     <h3 style="margin: 0; font-size: 18px; font-weight: 900; display:flex; align-items:center; gap:8px;">🔴 TRUNG TÂM ĐIỀU KHIỂN LIVE QUIZ</h3>
//                     <button onclick="ham_9_2_tao_phong_live()" style="background: white; color: #c0392b; border: none; padding: 8px 16px; border-radius: 6px; font-weight: bold; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#f8f9fa'" onmouseout="this.style.background='white'">
//                         🚀 TẠO PHÒNG MỚI
//                     </button>
//                 </div>
                
//                 <div style="overflow-x: auto; padding: 10px;">
//                     <table style="width: 100%; border-collapse: collapse; min-width: 950px; text-align: left;">
//                         <thead style="background: #f8f9fa; border-bottom: 2px solid #dee2e6;">
//                             <tr>
//                                 <th style="padding: 12px 10px; text-align: center; color: #495057; width: 50px;">STT</th>
//                                 <th style="padding: 12px 10px; text-align: center; color: #495057; width: 120px;">Mã PIN</th>
//                                 <th style="padding: 12px 10px; color: #495057;">Sử dụng Đề thi / Học liệu</th>
//                                 <th style="padding: 12px 10px; color: #495057; width: 100px;">Thời gian tạo</th>
//                                 <th style="padding: 12px 10px; text-align: center; color: #495057; width: 60px;">Số HS</th>
//                                 <th style="padding: 12px 10px; text-align: center; color: #495057; width: 150px;">Trạng Thái</th>
//                                 <th style="padding: 12px 10px; text-align: center; color: #495057; width: 180px;">Thao Tác</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             ${htmlRows}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         `;

//     } catch (error) {
//         vungLamViec.innerHTML = `<div style="color: #dc3545; text-align: center; padding: 20px; font-weight:bold;">❌ Lỗi truy xuất danh sách phòng: ${error.message}</div>`;
//     }
// }

// [Nhãn thời gian: BẢN NÂNG CẤP MỚI] - Hàm 9.1: Vẽ Tab Quản lý Live Quiz (TỰ ĐỘNG CHỐT PHÒNG HẾT GIỜ)
window.ham_9_1_tab_live_quiz = async function () {
    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
    vungLamViec.innerHTML = `<div style="text-align: center; padding: 40px;"><h3 style="color:#e74c3c;">⏳ Đang tải dữ liệu Đấu trường Live...</h3></div>`;

    try {
        // 1. Tải danh sách phòng
        const { data: dsPhong, error } = await _supabase
            .from('phong_live_quiz')
            .select('*')
            .order('ngay_tao', { ascending: false });

        if (error) throw error;

        // 2. Tải từ điển Nhiệm Vụ (Lấy thêm cột thoi_gian_lam_bai để tính toán hết giờ)
        let tuDienNV = {};
        let tuDienTGNV = {};
        const { data: dsNV } = await _supabase.from('nhiem_vu').select('ma_nhiem_vu, ten_nhiem_vu, thoi_gian_lam_bai');
        if (dsNV) {
            dsNV.forEach(nv => {
                tuDienNV[nv.ma_nhiem_vu] = nv.ten_nhiem_vu;
                tuDienTGNV[nv.ma_nhiem_vu] = nv.thoi_gian_lam_bai || 45; // Mặc định 45 phút nếu rỗng
            });
        }

        // 🌟 3. THUẬT TOÁN KIỂM DUYỆT NGẦM: TỰ ĐỘNG ĐÓNG PHÒNG HẾT GIỜ MÀ KHÔNG CẦN VÀO PHÒNG
        const now = Date.now();
        if (dsPhong && dsPhong.length > 0) {
            dsPhong.forEach(phong => {
                // Chỉ xét những phòng đang trong trạng thái THI (1) và đã có thời điểm bắt đầu
                if (phong.trang_thai === 1 && phong.thoi_gian_bat_dau) {
                    const thoiGianLamBai = tuDienTGNV[phong.ma_nhiem_vu] || 45;
                    const tStart = new Date(phong.thoi_gian_bat_dau).getTime();
                    const tEnd = tStart + (thoiGianLamBai * 60000); // Đổi phút ra mili-giây

                    // Nếu thời gian hiện tại đã vượt quá thời gian kết thúc
                    if (now >= tEnd) {
                        phong.trang_thai = 2; // Ép hiển thị trên Giao diện thành KẾT THÚC
                        
                        // Âm thầm gửi lệnh bắn lên Supabase để chốt sổ Database
                        _supabase.from('phong_live_quiz')
                            .update({ trang_thai: 2 })
                            .eq('ma_phong', phong.ma_phong)
                            .then(({error}) => {
                                if(!error) console.log(`[Auto-Close] Đã tự động đóng phòng lố giờ: ${phong.ma_phong}`);
                            });
                    }
                }
            });
        }

        // 4. THUẬT TOÁN ĐẾM SỐ HỌC SINH THAM GIA TỪ BẢNG TIẾN ĐỘ LIVE
        let tuDienSoHS = {};
        if (dsPhong && dsPhong.length > 0) {
            const mangMaPhong = dsPhong.map(p => p.ma_phong);
            const { data: dsTienDo } = await _supabase
                .from('tien_do_live_quiz')
                .select('ma_phong, uid_hoc_sinh')
                .in('ma_phong', mangMaPhong);

            if (dsTienDo) {
                dsTienDo.forEach(td => {
                    if (!tuDienSoHS[td.ma_phong]) tuDienSoHS[td.ma_phong] = new Set();
                    tuDienSoHS[td.ma_phong].add(td.uid_hoc_sinh); 
                });
            }
        }

        // 5. VẼ BẢNG DANH SÁCH
        let htmlRows = '';
        if (!dsPhong || dsPhong.length === 0) {
            htmlRows = `<tr><td colspan="7" style="text-align:center; padding: 30px; color:#6c757d;">Chưa có phòng thi Live nào được tạo. Hãy bấm "Tạo Phòng Mới" để bắt đầu!</td></tr>`;
        } else {
            dsPhong.forEach((phong, index) => {
                const tenNhiemVu = tuDienNV[phong.ma_nhiem_vu] || 'Nhiệm vụ ảo đã bị xóa';
                const thoiGianTao = new Date(phong.ngay_tao).toLocaleString('vi-VN');

                const soHocSinh = tuDienSoHS[phong.ma_phong] ? tuDienSoHS[phong.ma_phong].size : 0;
                const htmlSoHS = `<span style="background: #e3f2fd; color: #1565c0; padding: 4px 10px; border-radius: 12px; font-weight: 900; font-size: 13px; box-shadow: 0 1px 2px rgba(0,0,0,0.1);">👤 ${soHocSinh}</span>`;

                let badgeTrangThai = '';
                let htmlThaoTac = '';

                // CHUẨN BỊ CÁC NÚT BẤM (Grid 2x2)
                const btnThongKe = `<button onclick="ham_9_5_thong_ke_live_quiz('${phong.ma_phong}', '${phong.ma_nhiem_vu}', '${tenNhiemVu.replace(/'/g, "\\'")}')" style="padding: 6px; background: #6f42c1; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; font-size: 11px; width: 100%; box-shadow: 0 1px 2px rgba(0,0,0,0.1);" title="Xem kết quả bài làm">📊 K.Quả</button>`;
                const btnXoa = `<button onclick="ham_9_4_xoa_phong_live('${phong.ma_phong}', '${phong.ma_nhiem_vu}')" style="padding: 6px; background: #dc3545; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; font-size: 11px; width: 100%; box-shadow: 0 1px 2px rgba(0,0,0,0.1);" title="Xóa phòng">❌ Xóa</button>`;
                const btnDuPhong = `<button onclick="Swal.fire('Tính năng dự phòng', 'Nút này sẽ dùng cho các tính năng nâng cấp sau này!', 'info')" style="padding: 6px; background: #6c757d; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; font-size: 11px; width: 100%; box-shadow: 0 1px 2px rgba(0,0,0,0.1);" title="Dự phòng">⚙️ C.Đặt</button>`;

                let btnDieuKhien = '';

                if (phong.trang_thai === 0) {
                    badgeTrangThai = `<span style="background:#e8f5e9; color:#2e7d32; padding:4px 8px; border-radius:4px; font-size:12px; font-weight:bold; border:1px solid #c8e6c9; white-space:nowrap;">ĐANG CHỜ HS</span>`;
                    btnDieuKhien = `<button onclick="ham_9_3_vao_dieu_khien_phong('${phong.ma_phong}')" style="padding: 6px; background: #28a745; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; font-size: 11px; width: 100%; box-shadow: 0 1px 2px rgba(0,0,0,0.1);" title="Vào phòng điều khiển">🚀 V.Phòng</button>`;
                } else if (phong.trang_thai === 1) {
                    badgeTrangThai = `<span style="background:#ffebee; color:#c62828; padding:4px 8px; border-radius:4px; font-size:12px; font-weight:bold; border:1px solid #ffcdd2; white-space:nowrap;">🔥 ĐANG THI</span>`;
                    btnDieuKhien = `<button onclick="ham_9_3_vao_dieu_khien_phong('${phong.ma_phong}')" style="padding: 6px; background: #e74c3c; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; font-size: 11px; width: 100%; box-shadow: 0 1px 2px rgba(0,0,0,0.1);" title="Xem thi đấu trực tiếp">👀 Live</button>`;
                } else {
                    badgeTrangThai = `<span style="background:#f1f3f4; color:#5f6368; padding:4px 8px; border-radius:4px; font-size:12px; font-weight:bold; border:1px solid #dadce0; white-space:nowrap;">ĐÃ KẾT THÚC</span>`;
                    btnDieuKhien = `<button onclick="ham_9_3_vao_dieu_khien_phong('${phong.ma_phong}')" style="padding: 6px; background: #17a2b8; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; font-size: 11px; width: 100%; box-shadow: 0 1px 2px rgba(0,0,0,0.1);" title="Xem bảng xếp hạng">🏆 X.Hạng</button>`;
                }

                htmlThaoTac = `
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; width: 160px; margin: 0 auto;">
                        ${btnDieuKhien}
                        ${btnThongKe}
                        ${btnXoa}
                        ${btnDuPhong}
                    </div>
                `;

                htmlRows += `
                    <tr style="border-bottom: 1px solid #eee; background: #fff; transition: 0.2s;" onmouseover="this.style.background='#fdf2f2'" onmouseout="this.style.background='#fff'">
                        <td style="padding: 12px 10px; text-align: center; color: #666; font-weight: bold;">${index + 1}</td>
                        <td style="padding: 12px 10px; text-align: center;">
                            <b style="font-size: 20px; color: #e74c3c; font-family: monospace; letter-spacing: 2px;">${phong.ma_phong}</b>
                        </td>
                        <td style="padding: 12px 10px;">
                            <div style="font-weight: bold; color: #1a73e8; font-size: 14px; line-height: 1.4;">${tenNhiemVu}</div>
                            <div style="font-size: 11px; color: #888; margin-top: 4px;">Mã NV Ảo: ${phong.ma_nhiem_vu}</div>
                        </td>
                        <td style="padding: 12px 10px; font-size: 12px; color: #555;">${thoiGianTao}</td>
                        <td style="padding: 12px 10px; text-align: center;">${htmlSoHS}</td>
                        <td style="padding: 12px 10px; text-align: center;">${badgeTrangThai}</td>
                        <td style="padding: 12px 10px; text-align: center;">${htmlThaoTac}</td>
                    </tr>
                `;
            });
        }

        vungLamViec.innerHTML = `
            <div style="background: white; border: 1px solid #e0e0e0; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); overflow: hidden;">
                <div style="background: linear-gradient(135deg, #e74c3c, #c0392b); padding: 20px; color: white; display: flex; justify-content: space-between; align-items: center;">
                    <h3 style="margin: 0; font-size: 18px; font-weight: 900; display:flex; align-items:center; gap:8px;">🔴 TRUNG TÂM ĐIỀU KHIỂN LIVE QUIZ</h3>
                    <button onclick="ham_9_2_tao_phong_live()" style="background: white; color: #c0392b; border: none; padding: 8px 16px; border-radius: 6px; font-weight: bold; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#f8f9fa'" onmouseout="this.style.background='white'">
                        🚀 TẠO PHÒNG MỚI
                    </button>
                </div>
                
                <div style="overflow-x: auto; padding: 10px;">
                    <table style="width: 100%; border-collapse: collapse; min-width: 950px; text-align: left;">
                        <thead style="background: #f8f9fa; border-bottom: 2px solid #dee2e6;">
                            <tr>
                                <th style="padding: 12px 10px; text-align: center; color: #495057; width: 50px;">STT</th>
                                <th style="padding: 12px 10px; text-align: center; color: #495057; width: 120px;">Mã PIN</th>
                                <th style="padding: 12px 10px; color: #495057;">Sử dụng Đề thi / Học liệu</th>
                                <th style="padding: 12px 10px; color: #495057; width: 100px;">Thời gian tạo</th>
                                <th style="padding: 12px 10px; text-align: center; color: #495057; width: 60px;">Số HS</th>
                                <th style="padding: 12px 10px; text-align: center; color: #495057; width: 150px;">Trạng Thái</th>
                                <th style="padding: 12px 10px; text-align: center; color: #495057; width: 180px;">Thao Tác</th>
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
        vungLamViec.innerHTML = `<div style="color: #dc3545; text-align: center; padding: 20px; font-weight:bold;">❌ Lỗi truy xuất danh sách phòng: ${error.message}</div>`;
    }
}

// =====================================================================
// [Nhãn thời gian: 10:15 - Ngày 29/05/2026] - Hàm 9.2: Tạo Phòng Live (Bổ sung ô nhập tên phòng)
// =====================================================================
window.ham_9_2_tao_phong_live = async function () {
    window.Swal.fire({ title: '⏳ Đang tải kho học liệu...', allowOutsideClick: false, didOpen: () => { window.Swal.showLoading(); } });

    try {
        // Tải danh sách Học Liệu
        const { data: dsHL, error } = await _supabase.from('hoc_lieu_trac_nghiem').select('ma_hoc_lieu, ten_hoc_lieu').order('ngay_tao', { ascending: false });

        if (error) throw error;
        if (!dsHL || dsHL.length === 0) return Swal.fire('Thông báo', 'Kho học liệu trống. Thầy hãy tải lên File JSON đề thi trước nhé!', 'warning');

        let optionsHtml = '<option value="">-- Chọn File Đề thi (Học liệu) --</option>';
        dsHL.forEach(hl => { optionsHtml += `<option value="${hl.ma_hoc_lieu}">[${hl.ma_hoc_lieu}] - ${hl.ten_hoc_lieu}</option>`; });

        Swal.fire({
            title: '🚀 KHỞI TẠO PHÒNG LIVE',
            html: `
                <div style="text-align: left; margin-top: 10px;">
                    <label style="font-weight: bold; font-size: 13px; color: #1a73e8;">1. Chọn Đề thi sử dụng cho trận đấu:</label>
                    <select id="swal-select-hoc-lieu" style="width: 100%; padding: 10px; margin-top: 5px; margin-bottom: 15px; border: 1px solid #1a73e8; border-radius: 6px; font-size: 14px; font-weight: bold;">
                        ${optionsHtml}
                    </select>

                    <label style="font-weight: bold; font-size: 13px; color: #d35400;">2. Cài đặt thời gian làm bài (Phút):</label>
                    <input type="number" id="swal-input-thoi-gian" value="45" min="1" style="width: 100%; padding: 10px; margin-top: 5px; margin-bottom: 15px; border: 1px solid #d35400; border-radius: 6px; font-size: 14px; font-weight: bold;">
                    
                    <label style="font-weight: bold; font-size: 13px; color: #28a745;">3. Tên phòng thi (Tùy chọn):</label>
                    <input type="text" id="swal-input-ten-phong" placeholder="VD: Kiem tra 15p" style="width: 100%; padding: 10px; margin-top: 5px; border: 1px solid #28a745; border-radius: 6px; font-size: 14px; font-weight: bold;">
                </div>
            `,
            showCancelButton: true, confirmButtonText: 'Tạo Phòng Đấu Cấp Tốc', cancelButtonText: 'Hủy', confirmButtonColor: '#e74c3c',
            preConfirm: () => {
                const maHL = document.getElementById('swal-select-hoc-lieu').value;
                const thoiGian = document.getElementById('swal-input-thoi-gian').value;
                const tenPhong = document.getElementById('swal-input-ten-phong').value.trim();

                if (!maHL) { Swal.showValidationMessage('Vui lòng chọn 1 đề thi!'); return false; }
                if (!thoiGian || thoiGian <= 0) { Swal.showValidationMessage('Thời gian phải lớn hơn 0!'); return false; }

                const tenHL = document.getElementById('swal-select-hoc-lieu').options[document.getElementById('swal-select-hoc-lieu').selectedIndex].text;
                return { maHL, thoiGian, tenHL, tenPhong };
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { maHL, thoiGian, tenHL, tenPhong } = result.value;

                // Sinh Mã PIN
                const maPinLive = Math.floor(100000 + Math.random() * 900000).toString();

                // Cấu hình Mã Nhiệm Vụ Ảo & Tên Nhiệm Vụ Ảo dựa trên input của thầy
                let maNhiemVuAo = "LIVE_" + maPinLive;
                let tenNhiemVuAo = "🔥 Đấu trường PIN: " + maPinLive;

                if (tenPhong) {
                    // Lọc bỏ dấu tiếng Việt và dấu cách để làm Mã ID an toàn cho Database
                    const safeSuffix = tenPhong.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '').toUpperCase();
                    maNhiemVuAo = "LIVE_" + maPinLive + "_" + safeSuffix;
                    // Tên hiển thị giữ nguyên đúng như thầy gõ
                    tenNhiemVuAo = "LIVE_" + maPinLive + "_" + tenPhong;
                }

                Swal.fire({ title: 'Đang trích xuất đề thi và thiết lập Đấu trường...', allowOutsideClick: false, didOpen: () => { Swal.showLoading(); } });

                // 🌟 THUẬT TOÁN ĐẾM SỐ CÂU CHUẨN XÁC ĐỂ LÕI CHẤM ĐIỂM KHÔNG BỊ "NGÁO"
                let tongSoCau = 20; // Mặc định dự phòng
                try {
                    const { data: hl } = await _supabase.from('hoc_lieu_trac_nghiem').select('url_github').eq('ma_hoc_lieu', maHL).single();
                    let urlFileGitHub = hl.url_github;
                    if (!urlFileGitHub) {
                        let maDeGoc = maHL;
                        if (maDeGoc.startsWith("HL_TN_")) maDeGoc = maDeGoc.replace("HL_TN_", "");
                        urlFileGitHub = `https://ducchinh2308.github.io/LuyenToan2308/Kho_De_Thi/${maDeGoc}/DeThi_${maDeGoc}.json`;
                    } else if (urlFileGitHub.includes('github.com') && urlFileGitHub.includes('/blob/')) {
                        urlFileGitHub = urlFileGitHub.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
                    }

                    const res = await fetch(urlFileGitHub);
                    if (res.ok) {
                        const dataHL = await res.json();
                        const dsCauHoi = dataHL.danhSachCauHoi || dataHL.danh_sach_cau_hoi || [];
                        if (dsCauHoi.length > 0) tongSoCau = dsCauHoi.length;
                    }
                } catch (e) {
                    console.warn("Lấy số câu gốc thất bại, dùng mặc định:", e);
                }

                // 🌟 ÉP CHUẨN ĐỊNH DẠNG "X câu" CHO LÕI CHẤM ĐIỂM
                const cauTrucDeChuan = `${tongSoCau} câu`;

                // BƯỚC 1: TẠO NHIỆM VỤ ẢO NGẦM
                const { error: errNV } = await _supabase.from('nhiem_vu_trac_nghiem').insert([{
                    ma_nhiem_vu: maNhiemVuAo,
                    ten_nhiem_vu: tenNhiemVuAo,
                    loai_nhiem_vu: "Làm đề (Online)",
                    ma_hoc_lieu: maHL,
                    uid_gv_tao: AppState.user?.uid || '',
                    trang_thai: 1,
                    danh_sach_lop: JSON.stringify(["#LUYEN_TAP_TU_DO#"]),
                    so_luot_lam_bai: 1,
                    thoi_gian_lam_bai: parseInt(thoiGian),
                    dao_cau_hoi: JSON.stringify({ cau: false, abcd: false, ds: false }), // 🌟 TẮT ĐẢO ĐỀ Ở LIVE QUIZ
                    cau_truc_de: cauTrucDeChuan
                }]);

                if (errNV) return Swal.fire('Lỗi tạo nhiệm vụ ngầm', errNV.message, 'error');

                // BƯỚC 2: TẠO PHÒNG LIVE
                const { error: errPhong } = await _supabase.from('phong_live_quiz').insert([{
                    ma_phong: maPinLive,
                    ma_nhiem_vu: maNhiemVuAo,
                    uid_gv_tao: AppState.user?.uid || '',
                    trang_thai: 0
                }]);

                if (errPhong) return Swal.fire('Lỗi tạo phòng', errPhong.message, 'error');

                Swal.fire({
                    icon: 'success', title: 'Tạo phòng thành công!',
                    html: `Hệ thống đã đúc Đề thi ${cauTrucDeChuan} thành công.<br><br>Mã PIN của phòng là: <b style="font-size: 32px; color: #e74c3c; letter-spacing: 2px;">${maPinLive}</b>`,
                    confirmButtonText: 'Vào Điều Khiển', confirmButtonColor: '#28a745'
                }).then(() => { ham_9_1_tab_live_quiz(); });
            }
        });

    } catch (e) { Swal.fire('Lỗi', e.message, 'error'); }
};



// =====================================================================
// KHỞI TẠO BIẾN TOÀN CỤC ĐỂ QUẢN LÝ SÓNG REALTIME
// =====================================================================
window.LiveQuizChannel = null;
window.DanhSachLive = [];
window.ThongTinPhongLive = { tongSoCau: 0, maPhong: '', maNhiemVu: '', thoiGianLamBai: 45 };

//// =====================================================================
//// HÀM 9.3: VÀO PHÒNG ĐIỀU KHIỂN (GIAO DIỆN TỔNG HỢP)
//// =====================================================================



// [Nhãn thời gian: 13:35 - Ngày 28/05/2026] - Hàm 9.3: Vào phòng điều khiển (VÁ LỖI HIỂN THỊ SAI TỔNG SỐ CÂU TRÊN TIMELINE)
window.ham_9_3_vao_dieu_khien_phong = async function (maPhong) {
    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
    vungLamViec.innerHTML = `<div style="text-align: center; padding: 40px;"><h3 style="color:#e74c3c;">⏳ Đang kết nối tín hiệu phòng ${maPhong}...</h3></div>`;

    try {
        const { data: phong, error: errPhong } = await _supabase.from('phong_live_quiz').select('*').eq('ma_phong', maPhong).single();
        if (errPhong) throw errPhong;

        // 1. LẤY THÔNG TIN NHIỆM VỤ ĐỂ TRUY VẾT HỌC LIỆU GỐC
        const { data: nv } = await _supabase.from('nhiem_vu_trac_nghiem').select('ten_nhiem_vu, cau_truc_de, thoi_gian_lam_bai, ma_hoc_lieu').eq('ma_nhiem_vu', phong.ma_nhiem_vu).single();

        // 🌟 2. THUẬT TOÁN ĐẾM SỐ CÂU CHUẨN XÁC 100% (TRỰC TIẾP TỪ FILE ĐỀ)
        let tongSoCau = 20; // Mặc định nếu file lỗi
        try {
            const { data: hl } = await _supabase.from('hoc_lieu_trac_nghiem').select('url_github').eq('ma_hoc_lieu', nv.ma_hoc_lieu).single();

            let urlFileGitHub = hl.url_github;
            if (!urlFileGitHub) {
                let maDeGoc = nv.ma_hoc_lieu;
                if (maDeGoc.startsWith("HL_TN_")) maDeGoc = maDeGoc.replace("HL_TN_", "");
                urlFileGitHub = `https://ducchinh2308.github.io/LuyenToan2308/Kho_De_Thi/${maDeGoc}/DeThi_${maDeGoc}.json`;
            } else if (urlFileGitHub.includes('github.com') && urlFileGitHub.includes('/blob/')) {
                urlFileGitHub = urlFileGitHub.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
            }

            // Fetch nhanh File JSON về RAM để đếm chính xác số phần tử câu hỏi
            const res = await fetch(urlFileGitHub);
            if (res.ok) {
                const dataHL = await res.json();
                const dsCauHoi = dataHL.danhSachCauHoi || dataHL.danh_sach_cau_hoi || [];
                if (dsCauHoi.length > 0) {
                    tongSoCau = dsCauHoi.length; // 🎯 Lấy đúng số lượng thực tế (VD: 50 câu)
                }
            }
        } catch (e) {
            console.warn("Dùng phương án đếm dự phòng do đường truyền...");
        }

        // 3. LƯU SỐ CÂU CHUẨN VÀO BỘ NHỚ ĐỂ THANH TIẾN ĐỘ SỬ DỤNG
        window.ThongTinPhongLive = {
            tongSoCau: tongSoCau,
            maPhong: maPhong,
            maNhiemVu: phong.ma_nhiem_vu,
            thoiGianLamBai: nv.thoi_gian_lam_bai || 45
        };
        window.ThongTinLiveGiaoVien = { maNhiemVu: phong.ma_nhiem_vu, maPhong: maPhong };

        const { data: dsTienDo } = await _supabase.from('tien_do_live_quiz').select('*').eq('ma_phong', maPhong);
        window.DanhSachLive = dsTienDo || [];

        let nutTrangThaiHtml = '';
        if (phong.trang_thai === 0) {
            nutTrangThaiHtml = `<button onclick="ham_9_3_2_doi_trang_thai('${maPhong}', 1)" style="padding: 12px 24px; background: #28a745; color: white; border: none; border-radius: 8px; font-weight: 900; cursor: pointer;">🚀 BẮT ĐẦU THI ĐẤU</button>`;
        } else if (phong.trang_thai === 1) {
            nutTrangThaiHtml = `<button onclick="ham_9_3_2_doi_trang_thai('${maPhong}', 2)" style="padding: 12px 24px; background: #e74c3c; color: white; border: none; border-radius: 8px; font-weight: 900; cursor: pointer;">🛑 KẾT THÚC TRẬN ĐẤU</button>`;
        } else {
            nutTrangThaiHtml = `<span style="padding: 12px 24px; background: #6c757d; color: white; border-radius: 8px; font-weight: 900;">🏁 ĐÃ KẾT THÚC</span>`;
        }

        vungLamViec.innerHTML = `
            <div style="background: #1e1e2f; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); color: white; font-family: sans-serif;">
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 20px 30px; border-bottom: 1px solid #2a2a3c;">
                    <div style="display: flex; gap: 30px; align-items: center;">
                        <div>
                            <div style="font-size: 12px; color: #a0a0b2; text-transform: uppercase;">Mã PIN</div>
                            <div style="font-size: 40px; font-weight: 900; color: #f1c40f; letter-spacing: 2px;">${maPhong}</div>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 12px; color: #a0a0b2; text-transform: uppercase;">Thời gian còn lại</div>
                            <div id="dong-ho-giao-vien" style="font-size: 40px; font-weight: 900; color: #ffeb3b; font-family: monospace;">--:--</div>
                        </div>
                    </div>
                    <div style="display: flex; gap: 10px;">
                        <button onclick="ham_gv_xem_de_thi_truc_tiep()" style="padding: 12px 20px; background: #2980b9; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">📖 XEM ĐỀ THI</button>
                        ${nutTrangThaiHtml}
                        <button onclick="ham_9_3_3_thoat_phong()" style="padding: 12px 20px; background: transparent; color: #a0a0b2; border: 2px solid #a0a0b2; border-radius: 8px; cursor: pointer;">Thoát</button>
                    </div>
                </div>
                <div style="padding: 20px 30px; background: #252538;"><div id="vung-ve-leaderboard"></div></div>
            </div>
        `;

        // Nếu phòng đang chạy, truyền thời gian bắt đầu vào đồng hồ
        if (phong.trang_thai === 1 && phong.thoi_gian_bat_dau) {
            window.ham_gv_kich_hoat_dong_ho_chu(phong.thoi_gian_bat_dau);
        }
        ham_9_3_1_ve_leaderboard();

        // 🌟 KHỞI TẠO SÓNG REALTIME
        if (window.LiveQuizChannel) _supabase.removeChannel(window.LiveQuizChannel);

        window.LiveQuizChannel = _supabase.channel('kenh_phong_' + maPhong)
            .on('postgres_changes', {
                event: '*', schema: 'public', table: 'tien_do_live_quiz', filter: `ma_phong=eq.${maPhong}`,
                config: { broadcast: { self: true } }
            }, payload => {
                if (payload.eventType === 'INSERT') {
                    window.DanhSachLive.push(payload.new);
                } else if (payload.eventType === 'UPDATE') {
                    const idx = window.DanhSachLive.findIndex(item => item.uid_hoc_sinh === payload.new.uid_hoc_sinh);
                    if (idx > -1) window.DanhSachLive[idx] = { ...window.DanhSachLive[idx], ...payload.new };
                    else window.DanhSachLive.push(payload.new);
                }

                // Gọi vẽ lại bảng ngay lập tức khi có biến động
                if (typeof ham_9_3_1_ve_leaderboard === 'function') ham_9_3_1_ve_leaderboard();

            }).subscribe((status, err) => {
                if (status === 'CHANNEL_ERROR') console.error("Lỗi kết nối Sóng Realtime. Thầy kiểm tra lại cấu hình nhé!");
            });

    } catch (e) {
        vungLamViec.innerHTML = `<div style="color: #dc3545; text-align: center; padding: 20px;">❌ Lỗi: ${e.message}</div>`;
    }
};



// [Nhãn thời gian: 17:35 - Ngày 28/05/2026] - Hàm 9.3.1: Vẽ Leaderboard Live (Nâng cấp 2 thanh Tiến độ & Điểm, Thêm nút Soi)
window.ham_9_3_1_ve_leaderboard = function () {
    const vungVe = document.getElementById('vung-ve-leaderboard');
    if (!vungVe) return;

    if (window.DanhSachLive.length === 0) {
        vungVe.innerHTML = `<div style="text-align:center; color:#a0a0b2; padding: 40px; font-style:italic;">Đang đợi học sinh nhập mã PIN tham gia...</div>`;
        return;
    }

    // THUẬT TOÁN XẾP HẠNG: 1. Điểm số (giảm dần) -> 2. Số câu đúng (giảm dần) -> 3. Tgian nộp (tăng dần)
    window.DanhSachLive.sort((a, b) => {
        if (b.diem_so !== a.diem_so) return b.diem_so - a.diem_so;
        if (b.so_cau_dung !== a.so_cau_dung) return b.so_cau_dung - a.so_cau_dung;
        return new Date(a.thoi_gian_cap_nhat) - new Date(b.thoi_gian_cap_nhat);
    });

    let htmlDong = '';
    const tongCau = window.ThongTinPhongLive.tongSoCau || 20;

    window.DanhSachLive.forEach((hs, index) => {
        // --- TÍNH TOÁN THANH SỐ 1: ĐIỂM SỐ ---
        const diemSoHienTai = Number(hs.diem_so || 0);
        let phanTramDiem = (diemSoHienTai / 10.0) * 100;
        if (phanTramDiem > 100) phanTramDiem = 100;
        const mauThanhDiem = diemSoHienTai >= 10 ? 'linear-gradient(90deg, #f1c40f, #e67e22)' : '#3498db';

        // --- TÍNH TOÁN THANH SỐ 2: TIẾN ĐỘ CÂU HỎI ---
        const soCauDaLam = hs.so_cau_da_lam || 0;
        const soCauDung = hs.so_cau_dung || 0;
        let phanTramTienDo = (soCauDaLam / tongCau) * 100;
        if (phanTramTienDo > 100) phanTramTienDo = 100;
        // Đổi màu xanh lá nếu đã làm xong toàn bộ
        const mauThanhTienDo = soCauDaLam >= tongCau ? '#2ecc71' : '#9b59b6';

        // --- THIẾT KẾ ICON THỨ HẠNG ---
        let rankIcon = `<div style="width: 32px; height: 32px; background: #474761; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">${index + 1}</div>`;
        if (index === 0) rankIcon = `<div style="font-size: 28px;" title="Top 1">🥇</div>`;
        if (index === 1) rankIcon = `<div style="font-size: 26px;" title="Top 2">🥈</div>`;
        if (index === 2) rankIcon = `<div style="font-size: 24px;" title="Top 3">🥉</div>`;

        htmlDong += `
            <div style="display: flex; justify-content: space-between; align-items: center; background: #2f2f45; padding: 12px 15px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.15); margin-bottom: 12px; transition: all 0.3s ease;">
                
                <div style="width: 45px; display: flex; justify-content: center;">${rankIcon}</div>
                <div style="width: 160px; font-weight: bold; font-size: 15px; color: #fff; padding-right: 15px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                    ${hs.ten_hoc_sinh}
                    <div style="font-size: 11px; color: #a0a0b2; font-weight: normal; margin-top: 5px;">
                        🎯 Đúng: <b style="color: #2ecc71;">${soCauDung}</b> | Xong: <b style="color: #9b59b6;">${soCauDaLam}/${tongCau}</b>
                    </div>
                </div>
                
                <div style="flex: 1; display: flex; flex-direction: column; gap: 8px; padding-right: 20px;">
                    
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <div style="font-size: 10px; color: #f1c40f; width: 45px; font-weight: 900; letter-spacing: 1px;">ĐIỂM</div>
                        <div style="flex: 1; background: #1e1e2f; height: 12px; border-radius: 6px; overflow: hidden; box-shadow: inset 0 1px 3px rgba(0,0,0,0.4);">
                            <div style="width: ${phanTramDiem}%; height: 100%; background: ${mauThanhDiem}; border-radius: 6px; transition: width 0.4s ease-out;"></div>
                        </div>
                    </div>

                    <div style="display: flex; align-items: center; gap: 10px;">
                        <div style="font-size: 10px; color: #9b59b6; width: 45px; font-weight: 900; letter-spacing: 1px;">T.ĐỘ</div>
                        <div style="flex: 1; background: #1e1e2f; height: 3px; border-radius: 3px; overflow: hidden; box-shadow: inset 0 1px 3px rgba(0,0,0,0.4);">
                            <div style="width: ${phanTramTienDo}%; height: 100%; background: ${mauThanhTienDo}; border-radius: 3px; transition: width 0.4s ease-out;"></div>
                        </div>
                    </div>

                </div>
                
                <div style="display: flex; align-items: center; gap: 15px; width: 140px; justify-content: flex-end;">
                    <div style="text-align: right; font-size: 24px; font-weight: 900; color: #f1c40f; font-family: monospace; text-shadow: 0 0 8px rgba(241,196,15,0.3);">
                        ${diemSoHienTai.toFixed(2)}
                    </div>
                    <button onclick="ham_9_3_4_soi_bai_live('${hs.uid_hoc_sinh}')" style="padding: 8px; background: rgba(255,255,255,0.08); color: #fff; border: 1px solid rgba(255,255,255,0.2); border-radius: 6px; font-size: 12px; font-weight: bold; cursor: pointer; transition: 0.2s; display: flex; align-items: center; justify-content: center;" onmouseover="this.style.background='rgba(255,255,255,0.2)'" onmouseout="this.style.background='rgba(255,255,255,0.08)'" title="Soi các đáp án em này đã chọn">
                        👁️ Soi
                    </button>
                </div>
            </div>
        `;
    });

    vungVe.innerHTML = `<div style="display: flex; flex-direction: column;">${htmlDong}</div>`;
};


// =====================================================================
// HÀM ĐỔI TRẠNG THÁI & ĐIỀU KHIỂN (ĐÃ VÁ LỖI 400 BẰNG SQL)
// =====================================================================
window.ham_9_3_2_doi_trang_thai = async function (maPhong, trangThaiMoi) {
    try {
        const updateObj = { trang_thai: trangThaiMoi };

        // Khi bắt đầu (1), gán thời gian bắt đầu bằng thời điểm hiện tại của Server
        if (trangThaiMoi === 1) {
            updateObj.thoi_gian_bat_dau = new Date().toISOString();
        }

        const { error } = await _supabase.from('phong_live_quiz').update(updateObj).eq('ma_phong', maPhong);
        if (error) throw error;

        // Load lại giao diện phòng
        window.ham_9_3_vao_dieu_khien_phong(maPhong);
    } catch (e) { Swal.fire('Lỗi', e.message, 'error'); }
};

// =====================================================================
// CÁC HÀM TIỆN ÍCH (ĐỒNG HỒ ĐẾM NGƯỢC CHUẨN XÁC)
// =====================================================================
window.ham_gv_kich_hoat_dong_ho_chu = function (thoiGianBatDauStr) {
    if (window.GvTimerId) clearInterval(window.GvTimerId);

    // Tính toán mốc kết thúc từ thời điểm bắt đầu + thời gian làm bài của nhiệm vụ
    const tStart = new Date(thoiGianBatDauStr).getTime();
    const tEnd = tStart + (window.ThongTinPhongLive.thoiGianLamBai * 60000);

    window.GvTimerId = setInterval(() => {
        const giayConLai = Math.floor((tEnd - Date.now()) / 1000);
        const el = document.getElementById('dong-ho-giao-vien');

        if (el) {
            if (giayConLai >= 0) {
                el.innerText = `${String(Math.floor(giayConLai / 60)).padStart(2, '0')}:${String(giayConLai % 60).padStart(2, '0')}`;
                if (giayConLai <= 60) el.style.color = '#ff3333'; // Đỏ lên khi còn dưới 1 phút
            } else {
                clearInterval(window.GvTimerId);
                // Hết giờ -> Tự động chuyển phòng về trạng thái 2 (Kết thúc)
                window.ham_9_3_2_doi_trang_thai(window.ThongTinPhongLive.maPhong, 2);
            }
        }
    }, 1000);
};

// =====================================================================
// HÀM XEM ĐỀ TRỰC TIẾP TRÊN GIAO DIỆN GIÁO VIÊN (ĐÃ FIX LỖI LINK & LATEX)
// =====================================================================
window.ham_gv_xem_de_thi_truc_tiep = async function () {
    try {
        // Bật loading để thầy khỏi sốt ruột nếu mạng chậm
        Swal.fire({ title: '⏳ Đang tải nội dung đề...', didOpen: () => Swal.showLoading() });

        const maNV = window.ThongTinPhongLive.maNhiemVu || window.ThongTinLiveGiaoVien.maNhiemVu;
        const { data: nv } = await _supabase.from('nhiem_vu_trac_nghiem').select('ma_hoc_lieu').eq('ma_nhiem_vu', maNV).single();
        const { data: hl } = await _supabase.from('hoc_lieu_trac_nghiem').select('url_github').eq('ma_hoc_lieu', nv.ma_hoc_lieu).single();

        // 1. THUẬT TOÁN VÁ LINK GITHUB (Chống lỗi null)
        let urlFileGitHub = hl.url_github;
        if (!urlFileGitHub) {
            let maDeGoc = nv.ma_hoc_lieu;
            if (maDeGoc.startsWith("HL_TN_")) maDeGoc = maDeGoc.replace("HL_TN_", "");
            urlFileGitHub = `https://ducchinh2308.github.io/LuyenToan2308/Kho_De_Thi/${maDeGoc}/DeThi_${maDeGoc}.json`;
        } else if (urlFileGitHub.includes('github.com') && urlFileGitHub.includes('/blob/')) {
            urlFileGitHub = urlFileGitHub.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
        }

        const res = await fetch(urlFileGitHub);
        if (!res.ok) throw new Error("Không tìm thấy file đề trên Github!");
        const data = await res.json();
        const dsCauHoi = data.danhSachCauHoi || data.danh_sach_cau_hoi || [];

        const baseUrlHinhAnh = urlFileGitHub.substring(0, urlFileGitHub.lastIndexOf('/')) + "/HinhAnh";

        // 2. VẼ GIAO DIỆN
        let html = `<div id="swal-xem-de-gv" style="text-align:left; max-height: 60vh; overflow-y:auto; padding: 10px;">`;

        dsCauHoi.forEach((c, i) => {
            // Quét đa dạng các biến chứa nội dung câu hỏi
            const noiDung = c.cauDan || c.noiDungHtml || c.noiDung || c.noi_dung || c.cauHoi || c.cau_hoi || c.text || '<span style="color:red">Lỗi rỗng nội dung</span>';

            // Vá lỗi đường dẫn hình ảnh bị thiếu
            let noiDungFixAnh = noiDung.replace(/src=['"]([^'"]+)['"]/g, (match, tenFile) => {
                if (tenFile.startsWith('http') || tenFile.startsWith('data:')) return match;
                return `src="${baseUrlHinhAnh}/${tenFile.split('/').pop()}"`;
            });

            // Làm đẹp phần hiển thị đáp án Đúng/Sai
            let dapAnHienThi = c.dap_an || c.dapAn || 'Chưa cập nhật';
            if (dapAnHienThi.length === 4 && (dapAnHienThi.includes('T') || dapAnHienThi.includes('F'))) {
                dapAnHienThi = dapAnHienThi.split('').map(k => k === 'T' ? 'Đúng' : 'Sai').join(' | ');
            }

            html += `
            <div style="margin-bottom:20px; border-bottom:1px dashed #ccc; padding-bottom:15px;">
                <div style="font-weight:900; color:#1a73e8; margin-bottom: 8px; font-size: 16px;">Câu ${i + 1}:</div>
                <div style="font-size: 16px; margin-bottom: 12px; overflow-x: auto; line-height: 1.5;">${noiDungFixAnh}</div>
                <div style="background: #fff3cd; padding: 6px 12px; border-radius: 6px; display: inline-block; font-size: 14px; font-weight: bold; color: #856404; border: 1px solid #ffe69c;">
                    🎯 Đáp án: ${dapAnHienThi}
                </div>
            </div>`;
        });
        html += `</div>`;

        // 3. HIỂN THỊ VÀ DỊCH LATEX
        Swal.fire({
            title: '📖 NỘI DUNG ĐỀ THI',
            html: html,
            width: '850px',
            confirmButtonText: 'Đóng',
            didOpen: () => {
                // Ép trình duyệt dịch công thức Toán học sau khi mở bảng
                const vungRender = document.getElementById('swal-xem-de-gv');
                if (window.renderMathInElement) {
                    window.renderMathInElement(vungRender, { delimiters: [{ left: "$$", right: "$$", display: true }, { left: "$", right: "$", display: false }], throwOnError: false, macros: { "\\heva": "\\left\\{\\begin{array}{l}#1\\end{array}\\right.", "\\hoac": "\\left[\\begin{array}{l}#1\\end{array}\\right." } });
                } else if (window.MathJax) {
                    MathJax.typesetPromise([vungRender]);
                }
            }
        });

    } catch (e) {
        Swal.fire('Lỗi', 'Không load được đề: ' + e.message, 'error');
    }
};
window.ham_9_3_3_thoat_phong = function () {
    if (window.LiveQuizChannel) _supabase.removeChannel(window.LiveQuizChannel);
    if (window.GvTimerId) clearInterval(window.GvTimerId);
    window.ham_9_1_tab_live_quiz();
};




// [Nhãn thời gian: 18:05 - Ngày 28/05/2026] - Hàm 9.3.4: Popup Soi bài nhanh (BỔ SUNG NÚT MỞ FULL ĐỀ VÀ AUTO-SCROLL)
window.ham_9_3_4_soi_bai_live = async function (uidHocSinh) {
    const hsLive = window.DanhSachLive.find(h => h.uid_hoc_sinh === uidHocSinh);
    if (!hsLive) return Swal.fire('Lỗi', 'Không tìm thấy dữ liệu học sinh này trên sóng.', 'error');

    Swal.fire({ title: '⏳ Đang đồng bộ ma trận bài làm...', didOpen: () => Swal.showLoading() });

    let mangCauTraLoi = [];
    let diemSo = hsLive.diem_so || 0;
    let soCauDung = hsLive.so_cau_dung || 0;
    let soCauDaLam = hsLive.so_cau_da_lam || 0;

    try {
        const maNV = window.ThongTinPhongLive.maNhiemVu;
        const { data: dsKQ } = await _supabase.from('ket_qua_trac_nghiem').select('*').eq('ma_nhiem_vu', maNV).eq('uid_hoc_sinh', uidHocSinh).order('thoi_gian_nop', { ascending: false });

        if (dsKQ && dsKQ.length > 0) {
            const kq = dsKQ[0];
            let rawData = kq.chi_tiet_lam_bai || kq.chi_tiet || kq.ket_qua_chi_tiet || '[]';
            mangCauTraLoi = typeof rawData === 'string' ? JSON.parse(rawData) : rawData;
            diemSo = kq.tong_diem || diemSo;
            soCauDung = kq.so_cau_dung || soCauDung;
        } else {
            let rawLive = hsLive.chi_tiet_lam_bai || hsLive.chi_tiet || hsLive.danh_sach_chon || '[]';
            mangCauTraLoi = typeof rawLive === 'string' ? JSON.parse(rawLive) : rawLive;
        }
    } catch (e) { console.warn("Lỗi trích xuất ma trận:", e); }

    const tongCau = window.ThongTinPhongLive.tongSoCau || 20;
    let htmlMaTranGrid = '';

    if (!mangCauTraLoi || mangCauTraLoi.length === 0) {
        htmlMaTranGrid = `<div style="grid-column: span 5; padding: 20px; color: #e74c3c; font-style: italic; text-align:center; font-weight:bold;">Học sinh chưa tích đáp án hoặc chưa nộp dữ liệu!</div>`;
    } else {
        if (typeof mangCauTraLoi[0] === 'string') {
            mangCauTraLoi.forEach((chon, idx) => {
                let bgHop = chon === '-' ? '#f7fafc' : '#ebf8ff';
                let borderHop = chon === '-' ? '#cbd5e0' : '#90cdf4';
                let chuHop = chon === '-' ? '#4a5568' : '#2b6cb0';
                let iconKq = chon === '-' ? '⚪' : '🔵';

                // 🌟 Gắn sự kiện click mở full đề nhưng không cuộn (do mảng string không có mã câu)
                htmlMaTranGrid += `
                    <div onclick="ham_9_3_5_mo_full_de_live('${uidHocSinh}', null)" style="background: ${bgHop}; border: 1px solid ${borderHop}; border-radius: 6px; padding: 10px 5px; text-align: center; color: ${chuHop}; font-family: sans-serif; cursor: pointer; box-shadow: 0 1px 2px rgba(0,0,0,0.05); transition: 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                        <div style="font-size: 11px; font-weight: bold; text-transform: uppercase; color:#718096;">Câu ${idx + 1}</div>
                        <div style="font-size: 16px; font-weight: 900; margin: 4px 0;">${iconKq}</div>
                        <div style="font-size: 10px; font-weight:bold;">ĐA: <span style="background:white; padding:1px 4px; border-radius:2px; border:1px solid #cbd5e0;">${chon}</span></div>
                    </div>
                `;
            });
        } else {
            mangCauTraLoi.forEach((cau, idx) => {
                const trangThai = (cau.ketQua || "").trim();
                let bgHop = "#fff5f5"; let borderHop = "#feb2b2"; let chuHop = "#c53030"; let iconKq = "❌";

                if (trangThai === "Đúng" || cau.is_correct === true || cau.dung_sai === true) {
                    bgHop = "#f0fff4"; borderHop = "#9ae6b4"; chuHop = "#22543d"; iconKq = "🟢";
                } else if (trangThai === "Bỏ trống" || cau.luaChonHS === "-" || !cau.luaChonHS) {
                    bgHop = "#f7fafc"; borderHop = "#cbd5e0"; chuHop = "#4a5568"; iconKq = "⚪";
                }

                let luaChon = cau.luaChonHS || cau.chon || cau.dapAnChon || '-';

                // 🌟 Gắn sự kiện click mở full đề VÀ cuộn tự động đến câu tương ứng
                htmlMaTranGrid += `
                    <div onclick="ham_9_3_5_mo_full_de_live('${uidHocSinh}', '${cau.maCau || cau.ma_cau_hoi || ''}')" style="background: ${bgHop}; border: 1px solid ${borderHop}; border-radius: 6px; padding: 10px 5px; text-align: center; color: ${chuHop}; font-family: sans-serif; cursor: pointer; box-shadow: 0 1px 2px rgba(0,0,0,0.05); transition: 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'" title="Bấm để xem chi tiết câu này trên Đề gốc">
                        <div style="font-size: 11px; font-weight: bold; text-transform: uppercase; color:#718096;">Câu ${idx + 1}</div>
                        <div style="font-size: 16px; font-weight: 900; margin: 4px 0;">${iconKq}</div>
                        <div style="font-size: 10px; font-weight:bold;">ĐA: <span style="background:white; padding:1px 4px; border-radius:2px; border:1px solid #cbd5e0;">${luaChon}</span></div>
                    </div>
                `;
            });
        }
    }

    Swal.fire({
        title: `👁️ BÀI LÀM: ${hsLive.ten_hoc_sinh.toUpperCase()}`,
        html: `
            <div style="text-align: left; background: white;">
                <div style="background: #ebf8ff; border: 1px solid #bee3f8; padding: 10px 15px; border-radius: 8px; font-size: 13px; color: #2b6cb0; margin-bottom: 15px; display:flex; justify-content:space-between; align-items: center; font-weight:bold;">
                    <div>
                        <div style="margin-bottom: 4px;">⏳ Đã làm: <b style="color:#9b59b6;">${soCauDaLam}/${tongCau}</b></div>
                        <div>🎯 Đúng: <b style="color:#2ecc71;">${soCauDung} câu</b></div>
                    </div>
                    
                    <div style="display: flex; align-items: center; gap: 15px;">
                        <div style="font-size: 24px; color:#e74c3c; font-weight:900; text-shadow: 1px 1px 2px rgba(0,0,0,0.1);">
                            ${Number(diemSo).toFixed(2)} đ
                        </div>
                        <button onclick="ham_9_3_5_mo_full_de_live('${uidHocSinh}', null)" style="padding: 8px 12px; background: #2b6cb0; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; font-size: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: 0.2s;" onmouseover="this.style.background='#2c5282'" onmouseout="this.style.background='#2b6cb0'">
                            MỞ FULL ĐỀ
                        </button>
                    </div>
                </div>
                
                <div style="font-size: 12px; color: #4a5568; font-weight: bold; margin-bottom: 8px; text-transform: uppercase;">🧩 Ma trận đáp án (Bấm ô để xem câu):</div>
                <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; max-height: 300px; overflow-y: auto; padding: 4px;">
                    ${htmlMaTranGrid}
                </div>
            </div>
        `,
        showConfirmButton: false, // Tắt nút OK mặc định để gọn gàng
        showCancelButton: true,
        cancelButtonText: '⬅️ Đóng lại',
        cancelButtonColor: '#6c757d',
        width: '480px'
    });
};

// [Nhãn thời gian: 18:05 - Ngày 28/05/2026] - Hàm 9.3.5: Cầu nối mở Full Đề trực tiếp từ môi trường Sóng Live Realtime
window.ham_9_3_5_mo_full_de_live = async function (uidHocSinh, maCauScroll) {
    Swal.fire({ title: 'Đang trích xuất bản vẽ...', html: 'Hệ thống đang đồng bộ đề gốc từ Github và ráp nối đáp án học sinh...', didOpen: () => Swal.showLoading() });

    try {
        const maNV = window.ThongTinPhongLive.maNhiemVu;
        const hsLive = window.DanhSachLive.find(h => h.uid_hoc_sinh === uidHocSinh);
        if (!hsLive) throw new Error("Mất kết nối với học sinh này.");

        // 1. Tải khung nhiệm vụ và mã học liệu
        const { data: nvData, error: errNV } = await _supabase.from('nhiem_vu_trac_nghiem').select('*').eq('ma_nhiem_vu', maNV).single();
        if (errNV) throw errNV;

        const { data: hlData, error: errHL } = await _supabase.from('hoc_lieu_trac_nghiem').select('*').eq('ma_hoc_lieu', nvData.ma_hoc_lieu).single();
        if (errHL) throw errHL;

        // 2. Tải File Đề gốc từ Github
        let urlFileGitHub = hlData.url_github;
        if (!urlFileGitHub) {
            let maDeGoc = nvData.ma_hoc_lieu;
            if (maDeGoc.startsWith("HL_TN_")) maDeGoc = maDeGoc.replace("HL_TN_", "");
            urlFileGitHub = `https://ducchinh2308.github.io/LuyenToan2308/Kho_De_Thi/${maDeGoc}/DeThi_${maDeGoc}.json`;
        } else if (urlFileGitHub.includes('github.com') && urlFileGitHub.includes('/blob/')) {
            urlFileGitHub = urlFileGitHub.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
        }

        const resDe = await fetch(urlFileGitHub);
        if (!resDe.ok) throw new Error("Không tải được đề gốc từ Github!");
        const dataGitHub = await resDe.json();

        // 3. Tải bóng ma Lời giải chi tiết (Luôn ưu tiên vì là quyền Giáo viên)
        let dataGiaiGop = null;
        if (hlData.url_file_giai) {
            try {
                let urlGiai = hlData.url_file_giai;
                if (urlGiai.includes('github.com') && urlGiai.includes('/blob/')) urlGiai = urlGiai.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
                const resGiai = await fetch(urlGiai);
                if (resGiai.ok) dataGiaiGop = await resGiai.json();
            } catch (e) { console.warn("Lỗi tải bóng ma", e); }
        }

        // 4. Ráp khung xương và nội dung
        let dsKhungXuong = hlData.danh_sach_cau_hoi;
        if (typeof dsKhungXuong === 'string') dsKhungXuong = JSON.parse(dsKhungXuong);

        const deThiHoanChinh = (dsKhungXuong || []).map(mapItem => {
            const noiDung = (dataGitHub.danhSachCauHoi || dataGitHub.danh_sach_cau_hoi || []).find(c => c.maCau === mapItem.ma_cau_hoi) || {};
            let htmlLoiGiaiChiTiet = null;
            if (dataGiaiGop) {
                const matchGiai = (dataGiaiGop.danhSachLoiGiai || []).find(g => g.maBaoMat === mapItem.ma_loi_giai);
                if (matchGiai) htmlLoiGiaiChiTiet = matchGiai.loiGiaiHtml;
            }
            return { ...mapItem, ...noiDung, dap_an: mapItem.dap_an, loiGiaiHtml: htmlLoiGiaiChiTiet };
        });

        const baseUrlHinhAnh = urlFileGitHub.substring(0, urlFileGitHub.lastIndexOf('/')) + "/HinhAnh";

        // 5. Cố gắng lấy kết quả chi tiết chuẩn từ DB để Mock
        let chiTietMock = [];
        let diemMock = hsLive.diem_so || 0;

        const { data: dsKQ } = await _supabase.from('ket_qua_trac_nghiem').select('*').eq('ma_nhiem_vu', maNV).eq('uid_hoc_sinh', uidHocSinh).order('thoi_gian_nop', { ascending: false });
        if (dsKQ && dsKQ.length > 0) {
            const kq = dsKQ[0];
            let rawData = kq.chi_tiet_lam_bai || kq.chi_tiet || kq.ket_qua_chi_tiet || '[]';
            chiTietMock = typeof rawData === 'string' ? JSON.parse(rawData) : rawData;
            diemMock = kq.tong_diem || diemMock;
        } else {
            let rawLive = hsLive.chi_tiet_lam_bai || hsLive.chi_tiet || hsLive.danh_sach_chon || '[]';
            chiTietMock = typeof rawLive === 'string' ? JSON.parse(rawLive) : rawLive;
        }

        let ketQuaMockObj = { tong_diem: diemMock, chi_tiet_lam_bai: chiTietMock };

        Swal.close();

        // 🌟 GỌI LÕI RENDER GIAO DIỆN XEM LẠI (Tương đương bên Thống Kê)
        if (typeof ham_8_14_ve_giao_dien_xem_lai_trac_nghiem === 'function') {
            // Cho phép xem đáp án = true, Cho phép xem lời giải = true
            ham_8_14_ve_giao_dien_xem_lai_trac_nghiem(ketQuaMockObj, deThiHoanChinh, nvData, baseUrlHinhAnh, true, true);
        } else {
            return Swal.fire('Lỗi Module', 'Trình duyệt chưa tải kịp file giao diện xem lại. Vui lòng thử lại!', 'error');
        }

        // 6. AUTO SCROLL Thông minh đến thẳng vị trí câu hỏi vừa click
        if (maCauScroll) {
            setTimeout(() => {
                const theCauHoi = document.getElementById('review-cau-' + maCauScroll);
                if (theCauHoi) {
                    theCauHoi.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    theCauHoi.style.transition = "all 0.5s ease-in-out";
                    theCauHoi.style.boxShadow = "0 0 15px 3px rgba(43, 108, 176, 0.6)"; // Sáng đèn viền xanh dương
                    theCauHoi.style.transform = "scale(1.02)";

                    setTimeout(() => {
                        theCauHoi.style.boxShadow = "0 4px 8px rgba(0,0,0,0.05)";
                        theCauHoi.style.transform = "scale(1)";
                    }, 2500);
                }
            }, 600); // Đợi giao diện render xong
        }

    } catch (error) {
        Swal.fire('Lỗi', 'Không thể mở bài thi: ' + error.message, 'error');
    }
};







// [Nhãn thời gian: 13:04 - Ngày 28/05/2026] - Xóa phòng Live Quiz và dọn dẹp Nhiệm vụ ảo, Kết quả thi liên đới
window.ham_9_4_xoa_phong_live = async function (maPhong, maNhiemVuAo) {
    Swal.fire({
        title: 'CẢNH BÁO XÓA PHÒNG!',
        html: `Thầy có chắc chắn muốn xóa phòng thi đấu <b>${maPhong}</b> không?<br><br><i>Hành động này sẽ xóa toàn bộ tiến độ, <b>kết quả bài làm</b> và <b>Nhiệm vụ ảo</b> của phòng này. Không thể khôi phục!</i>`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Đồng ý, Xóa sạch!',
        cancelButtonText: 'Hủy'
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                Swal.fire({ title: '⏳ Đang xóa dữ liệu phòng và nhiệm vụ...', allowOutsideClick: false, didOpen: () => { Swal.showLoading(); } });

                // 1. Xóa tiến độ Sóng Live
                await _supabase.from('tien_do_live_quiz').delete().eq('ma_phong', maPhong);

                // 2. Xóa bảng xếp hạng / Cấu hình phòng Live
                await _supabase.from('phong_live_quiz').delete().eq('ma_phong', maPhong);

                if (maNhiemVuAo) {
                    // 3. Xóa Dữ liệu bài làm (Chi tiết và điểm) trong bảng Hệ thống gốc
                    await _supabase.from('ket_qua_trac_nghiem').delete().eq('ma_nhiem_vu', maNhiemVuAo);

                    // 4. Tiêu hủy Nhiệm vụ Ảo
                    await _supabase.from('nhiem_vu_trac_nghiem').delete().eq('ma_nhiem_vu', maNhiemVuAo);
                }

                Swal.fire('Thành công!', 'Đã dọn dẹp sạch sẽ Phòng Đấu Trường và mọi kết quả liên quan.', 'success');
                ham_9_1_tab_live_quiz();

            } catch (error) {
                console.error("Lỗi xóa phòng:", error);
                Swal.fire('Lỗi', 'Không thể xóa hoàn toàn: ' + error.message, 'error');
            }
        }
    });
};


// =====================================================================
// KHỐI 9.5: HỆ THỐNG THỐNG KÊ VÀ SOI BÀI CHUYÊN BIỆT CHO LIVE QUIZ
// =====================================================================

window.ham_9_5_thong_ke_live_quiz = async function (maPhong, maNhiemVuAo, tenNhiemVu) {
    Swal.fire({
        title: '📊 Đang tổng hợp dữ liệu Đấu trường...',
        text: 'Hệ thống đang đồng bộ kết quả chính thức và tín hiệu Live...',
        allowOutsideClick: false,
        didOpen: () => { Swal.showLoading(); }
    });

    try {
        // 1. Kéo danh sách học sinh để lấy Tên và SĐT
        const { data: dataHS } = await _supabase.from('hoc_sinh').select('uid, ten, sdt');
        const tuDienHS = {};
        if (dataHS) {
            dataHS.forEach(hs => tuDienHS[hs.uid] = hs);
        }

        // 2. Kéo dữ liệu nộp bài chính thức
        const { data: dsKQ, error: errKQ } = await _supabase.from('ket_qua_trac_nghiem').select('*').eq('ma_nhiem_vu', maNhiemVuAo).order('thoi_gian_nop', { ascending: false });
        if (errKQ) throw errKQ;

        let tuDienKQCuoi = {};
        if (dsKQ) {
            dsKQ.forEach(kq => { if (!tuDienKQCuoi[kq.uid_hoc_sinh]) tuDienKQCuoi[kq.uid_hoc_sinh] = kq; });
        }

        // 3. Kéo dữ liệu Sóng Live để vớt những em chưa kịp nộp
        const { data: dsLive } = await _supabase.from('tien_do_live_quiz').select('*').eq('ma_phong', maPhong);
        if (dsLive) {
            dsLive.forEach(liveItem => {
                if (!tuDienKQCuoi[liveItem.uid_hoc_sinh]) {
                    tuDienKQCuoi[liveItem.uid_hoc_sinh] = {
                        id: 'LIVE_AUTO',
                        uid_hoc_sinh: liveItem.uid_hoc_sinh,
                        tong_diem: liveItem.diem_so || 0,
                        thoi_gian_nop: liveItem.thoi_gian_cap_nhat || new Date().toISOString(),
                        chi_tiet_lam_bai: [], // Không có chi tiết nếu chỉ vớt từ Live
                        so_cau_dung: liveItem.so_cau_dung || 0,
                        is_live_sync: true
                    };
                }
            });
        }

        // 4. Tổng hợp mảng hiển thị
        let mangDaThamGia = [];
        let tongDiemPhong = 0;

        Object.values(tuDienKQCuoi).forEach(kq => {
            const hsInfor = tuDienHS[kq.uid_hoc_sinh] || { ten: kq.ten_hoc_sinh || 'Học sinh ẩn', sdt: 'N/A' };

            // Xử lý móc số câu đúng an toàn
            let soCauDungChuan = kq.so_cau_dung;
            if (soCauDungChuan == null && !kq.is_live_sync) {
                try {
                    const chuoiJSON = kq.chi_tiet || kq.chi_tiet_lam_bai || '{}';
                    const chiTietObj = typeof chuoiJSON === 'string' ? JSON.parse(chuoiJSON) : chuoiJSON;
                    soCauDungChuan = chiTietObj.so_cau_dung || chiTietObj.soCauDung || 0;
                } catch (e) { soCauDungChuan = 0; }
            }

            mangDaThamGia.push({
                idKQ: kq.id,
                uid: kq.uid_hoc_sinh,
                ten: hsInfor.ten,
                sdt: hsInfor.sdt,
                diem: kq.tong_diem,
                ngayNop: kq.thoi_gian_nop,
                chiTietCau: kq.chi_tiet_lam_bai || kq.chi_tiet, // Tương thích cả 2 chuẩn lưu trữ
                soCauDung: soCauDungChuan || 0,
                is_live_sync: kq.is_live_sync || false
            });
            tongDiemPhong += Number(kq.tong_diem) || 0;
        });

        const tongSoThamGia = mangDaThamGia.length;
        const diemTrungBinh = tongSoThamGia > 0 ? (tongDiemPhong / tongSoThamGia).toFixed(2) : "0.00";

        // Lưu vào RAM chuyên biệt của Live
        window.DataThongKeLiveHienTai = { mangDaThamGia, maNhiemVuAo, maPhong, tenNhiemVu };

        // 5. Hiển thị Popup Layer 1
        Swal.fire({
            title: `🏆 TỔNG KẾT ĐẤU TRƯỜNG`,
            html: `
                <div style="text-align: left; background: #fff; border-radius: 8px; font-size: 14px; color: #2c3e50; line-height: 1.6;">
                    <div style="text-align:center; font-weight:bold; color:#e74c3c; font-size: 18px; margin-bottom: 15px;">PIN: ${maPhong}</div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px;">
                        <div style="background: #fff3cd; padding: 12px; border-radius: 8px; border-left: 4px solid #ffc107; text-align: center;">
                            <span style="font-size: 11px; color: #856404; font-weight: bold; text-transform: uppercase;">Số lượng tham chiến</span>
                            <div style="font-size: 24px; font-weight: 900; color: #d39e00;">${tongSoThamGia} <span style="font-size: 12px; font-weight: normal;">em</span></div>
                        </div>
                        <div style="background: #e8f5e9; padding: 12px; border-radius: 8px; border-left: 4px solid #43a047; text-align: center;">
                            <span style="font-size: 11px; color: #546e7a; font-weight: bold; text-transform: uppercase;">Điểm trung bình</span>
                            <div style="font-size: 24px; font-weight: 900; color: #2e7d32;">${diemTrungBinh} <span style="font-size: 12px; font-weight: normal;">đ</span></div>
                        </div>
                    </div>
                    <button onclick="ham_9_5_sub_danh_sach_tham_gia()" style="width: 100%; padding: 14px; background: #e74c3c; color: white; border: none; border-radius: 8px; font-weight: bold; font-size: 14px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 4px 6px rgba(231,76,60,0.3); transition: 0.2s;" onmouseover="this.style.background='#c0392b'" onmouseout="this.style.background='#e74c3c'">
                        <span>🔥 BẢNG XẾP HẠNG CHI TIẾT</span>
                        <b style="background: rgba(255,255,255,0.3); padding: 2px 10px; border-radius: 12px;">Mở xem</b>
                    </button>
                </div>
            `,
            showConfirmButton: true, confirmButtonText: 'Đóng lại', confirmButtonColor: '#6c757d', width: '400px'
        });

    } catch (err) {
        Swal.fire({ icon: 'error', title: 'Không thể xuất thống kê', text: err.message });
    }
};

// Layer 2: Bảng Xếp Hạng Đấu Trường Live
window.ham_9_5_sub_danh_sach_tham_gia = function (loaiSort = null) {
    const { mangDaThamGia } = window.DataThongKeLiveHienTai;
    const opts = { hour: '2-digit', minute: '2-digit', second: '2-digit' };

    if (!window.DataThongKeLiveHienTai.sortState) window.DataThongKeLiveHienTai.sortState = { cot: 'diem', tangDan: false, tuKhoa: '' };
    if (loaiSort) {
        if (window.DataThongKeLiveHienTai.sortState.cot === loaiSort) window.DataThongKeLiveHienTai.sortState.tangDan = !window.DataThongKeLiveHienTai.sortState.tangDan;
        else { window.DataThongKeLiveHienTai.sortState.cot = loaiSort; window.DataThongKeLiveHienTai.sortState.tangDan = (loaiSort === 'ten') ? true : false; }
    }
    const sortState = window.DataThongKeLiveHienTai.sortState;

    let mangHienThi = [...mangDaThamGia];
    mangHienThi.sort((a, b) => {
        if (sortState.cot === 'ten') {
            const tenA = (a.ten || "").trim().split(" ").pop();
            const tenB = (b.ten || "").trim().split(" ").pop();
            return sortState.tangDan ? tenA.localeCompare(tenB, 'vi') : tenB.localeCompare(tenA, 'vi');
        } else if (sortState.cot === 'diem') {
            const diemA = parseFloat(a.diem) || 0;
            const diemB = parseFloat(b.diem) || 0;
            if (diemA === diemB) return (b.soCauDung || 0) - (a.soCauDung || 0);
            return sortState.tangDan ? (diemA - diemB) : (diemB - diemA);
        }
        return 0;
    });

    const iconTen = sortState.cot === 'ten' ? (sortState.tangDan ? '🔼' : '🔽') : '<span style="color:#cbd5e0">↕️</span>';
    const iconDiem = sortState.cot === 'diem' ? (sortState.tangDan ? '🔼' : '🔽') : '<span style="color:#cbd5e0">↕️</span>';

    let htmlBaoCaoTable = '';
    if (mangHienThi.length === 0) {
        htmlBaoCaoTable = `<tr><td colspan="5" style="text-align:center; color:#999; padding: 20px;">Đấu trường chưa ghi nhận kết quả nào.</td></tr>`;
    } else {
        mangHienThi.forEach((hs, index) => {
            const gioNop = hs.ngayNop ? new Date(hs.ngayNop).toLocaleString('vi-VN', opts) : 'N/A';
            const indexGoc = mangDaThamGia.indexOf(hs);
            const hienThiDong = (hs.ten || "").toLowerCase().includes((sortState.tuKhoa || "").toLowerCase()) ? "" : "display: none;";

            const nutSoiBai = hs.is_live_sync
                ? `<span style="font-size:10px; color:#d35400; font-weight:bold; background:#fff3cd; padding:4px 6px; border-radius:4px;">Chốt tự động</span>`
                : `<button onclick="ham_9_5_sub_soi_bai_lam(${indexGoc})" style="padding: 6px 12px; background: #e74c3c; color: white; border: none; border-radius: 4px; font-weight: bold; font-size: 11px; cursor: pointer; transition: 0.2s;">👁️ SOI BÀI</button>`;

            htmlBaoCaoTable += `
                <tr class="dong-hoc-sinh-live" data-ten="${(hs.ten || "").toLowerCase()}" style="border-bottom: 1px solid #e2e8f0; transition: background 0.2s; ${hienThiDong}" onmouseover="this.style.background='#fdf2f2'" onmouseout="this.style.background='transparent'">
                    <td style="padding: 10px 6px; text-align: center; font-weight: 900; color: #c0392b;">${index + 1}</td>
                    <td style="padding: 10px 6px; text-align: left;">
                        <b style="color:#2c3e50; font-size:14px;">${hs.ten}</b>
                        <div style="font-size:11px; color:#7f8c8d; margin-top:2px;">Nộp: ${gioNop}</div>
                    </td>
                    <td style="padding: 10px 6px; text-align: center; color: #27ae60; font-weight: bold;">${hs.soCauDung}</td>
                    <td style="padding: 10px 6px; text-align: center; font-size: 16px; font-weight: 900; color: #e74c3c;">${Number(hs.diem).toFixed(2)}</td>
                    <td style="padding: 10px 6px; text-align: center;">${nutSoiBai}</td>
                </tr>
            `;
        });
    }

    Swal.fire({
        title: `🔥 BẢNG XẾP HẠNG ĐẤU TRƯỜNG`,
        html: `
            <div style="padding: 10px; background: #fdf2f2; border-bottom: 1px solid #f5b7b1; border-radius: 6px 6px 0 0;">
                <input type="text" id="input-tim-kiem-live" placeholder="🔍 Tìm kiếm đấu thủ..." 
                       value="${sortState.tuKhoa}" oninput="ham_9_5_sub_tim_kiem_live(this.value)"
                       style="width: 100%; padding: 10px 15px; border: 1px solid #f1948a; border-radius: 6px; font-size: 14px; outline: none;">
            </div>
            <div style="height: 350px; overflow-y: auto; background: white; text-align: left;">
                <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                    <thead style="background: #fadbd8; position: sticky; top: 0; border-bottom: 2px solid #e74c3c; z-index: 2;">
                        <tr>
                            <th style="padding: 10px 6px; text-align: center; color: #922b21; width: 35px;">TOP</th>
                            <th onclick="ham_9_5_sub_danh_sach_tham_gia('ten')" style="padding: 10px 6px; color: #922b21; text-align: left; cursor: pointer; user-select: none;">Đấu thủ ${iconTen}</th>
                            <th style="padding: 10px 6px; text-align: center; color: #922b21; width: 60px;">Đúng</th>
                            <th onclick="ham_9_5_sub_danh_sach_tham_gia('diem')" style="padding: 10px 6px; text-align: center; color: #922b21; width: 90px; cursor: pointer; user-select: none;">Điểm ${iconDiem}</th>
                            <th style="padding: 10px 6px; text-align: center; color: #922b21; width: 80px;">Bài làm</th>
                        </tr>
                    </thead>
                    <tbody>${htmlBaoCaoTable}</tbody>
                </table>
            </div>
        `,
        showCancelButton: true, confirmButtonText: '⬅️ Quay lại', cancelButtonText: 'Đóng hẳn', confirmButtonColor: '#e74c3c', cancelButtonColor: '#7f8c8d', width: '550px',
        didOpen: () => {
            if (sortState.tuKhoa) { const inp = document.getElementById('input-tim-kiem-live'); inp.focus(); inp.setSelectionRange(inp.value.length, inp.value.length); }
        }
    }).then((result) => {
        if (result.isConfirmed) ham_9_5_thong_ke_live_quiz(window.DataThongKeLiveHienTai.maPhong, window.DataThongKeLiveHienTai.maNhiemVuAo, window.DataThongKeLiveHienTai.tenNhiemVu);
    });
};

window.ham_9_5_sub_tim_kiem_live = function (tuKhoa) {
    window.DataThongKeLiveHienTai.sortState.tuKhoa = tuKhoa;
    const keyLower = tuKhoa.toLowerCase();
    document.querySelectorAll('.dong-hoc-sinh-live').forEach(dong => {
        dong.style.display = dong.getAttribute('data-ten').includes(keyLower) ? '' : 'none';
    });
};

// Layer 3: Ma trận soi bài Live Quiz
window.ham_9_5_sub_soi_bai_lam = function (indexHocSinh) {
    const { mangDaThamGia } = window.DataThongKeLiveHienTai;
    const hs = mangDaThamGia[indexHocSinh];

    let mangCauTraLoi = [];
    try { mangCauTraLoi = typeof hs.chiTietCau === 'string' ? JSON.parse(hs.chiTietCau) : (hs.chiTietCau || []); } catch (e) { }

    let htmlMaTranGrid = '';
    if (mangCauTraLoi.length === 0) {
        htmlMaTranGrid = `<p style="grid-column: span 5; text-align:center; color:#e74c3c; padding:15px; font-weight:bold;">Không có lịch sử đáp án chi tiết.</p>`;
    } else {
        mangCauTraLoi.forEach((cau, idx) => {
            const trangThai = (cau.ketQua || "").trim();
            let bgHop = "#fff5f5"; let borderHop = "#feb2b2"; let chuHop = "#c53030"; let iconKq = "❌";

            if (trangThai === "Đúng") { bgHop = "#f0fff4"; borderHop = "#9ae6b4"; chuHop = "#22543d"; iconKq = "🟢"; }
            else if (trangThai === "Bỏ trống") { bgHop = "#f7fafc"; borderHop = "#cbd5e0"; chuHop = "#4a5568"; iconKq = "⚪"; }

            htmlMaTranGrid += `
                <div onclick="ham_9_5_mo_giao_dien_xem_lai_chi_tiet(${indexHocSinh}, '${cau.maCau}')" 
                     title="Bấm xem chi tiết"
                     style="background: ${bgHop}; border: 1px solid ${borderHop}; border-radius: 6px; padding: 10px 5px; text-align: center; color: ${chuHop}; font-family: sans-serif; cursor: pointer; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
                    <div style="font-size: 11px; font-weight: bold; color:#7f8c8d;">Câu ${idx + 1}</div>
                    <div style="font-size: 16px; font-weight: 900; margin: 4px 0;">${iconKq}</div>
                    <div style="font-size: 10px; font-weight:bold;">ĐA: <span style="background:white; padding:1px 4px; border-radius:2px; border:1px solid #cbd5e0;">${cau.luaChonHS || '-'}</span></div>
                </div>
            `;
        });
    }

    Swal.fire({
        title: `👀 BÀI LÀM: ${hs.ten.toUpperCase()}`,
        html: `
            <div style="text-align: left; background: white;">
                <div style="background: #fdf2f2; border: 1px solid #f5b7b1; padding: 10px 15px; border-radius: 8px; font-size: 13px; color: #c0392b; margin-bottom: 15px; display:flex; justify-content:space-between; align-items: center; font-weight:bold;">
                    <div>🎯 Đúng: ${hs.soCauDung} / ${mangCauTraLoi.length} câu<br>🌟 Tổng điểm: ${Number(hs.diem).toFixed(2)}</div>
                    <button onclick="ham_9_5_mo_giao_dien_xem_lai_chi_tiet(${indexHocSinh}, null)" style="padding: 8px 12px; background: #e74c3c; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; font-size: 12px;">MỞ FULL ĐỀ</button>
                </div>
                <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; max-height: 280px; overflow-y: auto; padding: 4px;">
                    ${htmlMaTranGrid}
                </div>
            </div>
        `,
        showCancelButton: false, confirmButtonText: '⬅️ Quay lại bảng xếp hạng', confirmButtonColor: '#e74c3c', width: '450px'
    }).then((result) => {
        if (result.isConfirmed) ham_9_5_sub_danh_sach_tham_gia();
    });
};

// Layer 4: Xem Full Đề của Live Quiz
window.ham_9_5_mo_giao_dien_xem_lai_chi_tiet = async function (indexHocSinh, maCauScroll) {
    Swal.fire({ title: 'Đang tải đề gốc...', didOpen: () => Swal.showLoading() });

    try {
        const { maNhiemVuAo, mangDaThamGia } = window.DataThongKeLiveHienTai;
        const hs = mangDaThamGia[indexHocSinh];

        const { data: nvData } = await _supabase.from('nhiem_vu_trac_nghiem').select('*').eq('ma_nhiem_vu', maNhiemVuAo).single();
        const { data: hlData } = await _supabase.from('hoc_lieu').select('*').eq('ma_hoc_lieu', nvData.ma_hoc_lieu).single();

        let urlFileGitHub = hlData.url_github;
        if (!urlFileGitHub) {
            let maDeGoc = nvData.ma_hoc_lieu;
            if (maDeGoc.startsWith("HL_TN_")) maDeGoc = maDeGoc.replace("HL_TN_", "");
            urlFileGitHub = `https://ducchinh2308.github.io/LuyenToan2308/Kho_De_Thi/${maDeGoc}/DeThi_${maDeGoc}.json`;
        } else if (urlFileGitHub.includes('github.com') && urlFileGitHub.includes('/blob/')) {
            urlFileGitHub = urlFileGitHub.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
        }

        const resDe = await fetch(urlFileGitHub);
        const dataGitHub = await resDe.json();

        let dataGiaiGop = null;
        if (hlData.url_file_giai) {
            try {
                let urlGiai = hlData.url_file_giai;
                if (urlGiai.includes('github.com') && urlGiai.includes('/blob/')) urlGiai = urlGiai.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
                const resGiai = await fetch(urlGiai);
                if (resGiai.ok) dataGiaiGop = await resGiai.json();
            } catch (e) { }
        }

        let dsKhungXuong = hlData.danh_sach_cau_hoi;
        if (typeof dsKhungXuong === 'string') dsKhungXuong = JSON.parse(dsKhungXuong);

        const deThiHoanChinh = (dsKhungXuong || []).map(mapItem => {
            const noiDung = (dataGitHub.danhSachCauHoi || dataGitHub.danh_sach_cau_hoi || []).find(c => c.maCau === mapItem.ma_cau_hoi) || {};
            let htmlLoiGiaiChiTiet = null;
            if (dataGiaiGop) {
                const matchGiai = (dataGiaiGop.danhSachLoiGiai || []).find(g => g.maBaoMat === mapItem.ma_loi_giai);
                if (matchGiai) htmlLoiGiaiChiTiet = matchGiai.loiGiaiHtml;
            }
            return { ...mapItem, ...noiDung, dap_an: mapItem.dap_an, loiGiaiHtml: htmlLoiGiaiChiTiet };
        });

        const baseUrlHinhAnh = urlFileGitHub.substring(0, urlFileGitHub.lastIndexOf('/')) + "/HinhAnh";
        let chiTiet = typeof hs.chiTietCau === 'string' ? JSON.parse(hs.chiTietCau) : (hs.chiTietCau || []);
        let ketQuaMock = { tong_diem: hs.diem, chi_tiet_lam_bai: chiTiet };

        Swal.close();
        if (typeof ham_8_14_ve_giao_dien_xem_lai_trac_nghiem === 'function') {
            ham_8_14_ve_giao_dien_xem_lai_trac_nghiem(ketQuaMock, deThiHoanChinh, nvData, baseUrlHinhAnh, true, true);
        } else {
            return Swal.fire('Tính năng đang xây dựng', 'Vui lòng quay lại sau!', 'info');
        }

        if (maCauScroll) {
            setTimeout(() => {
                const theCauHoi = document.getElementById('review-cau-' + maCauScroll);
                if (theCauHoi) {
                    theCauHoi.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    theCauHoi.style.transition = "all 0.5s";
                    theCauHoi.style.boxShadow = "0 0 15px 3px rgba(231, 76, 60, 0.6)";
                    setTimeout(() => { theCauHoi.style.boxShadow = "none"; }, 2500);
                }
            }, 600);
        }
    } catch (error) {
        Swal.fire('Lỗi', 'Không thể mở bài thi: ' + error.message, 'error');
    }
};
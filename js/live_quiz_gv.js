// =====================================================================
// KHỐI 9: TỔ CHỨC THI ĐẤU TRỰC TIẾP (LIVE QUIZ)
// =====================================================================

// =====================================================================
// Hàm 9.1: Vẽ Tab Quản lý danh sách các phòng Live Quiz
// =====================================================================
window.ham_9_1_tab_live_quiz = async function () {
    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
    vungLamViec.innerHTML = `<div style="text-align: center; padding: 40px;"><h3 style="color:#e74c3c;">⏳ Đang tải dữ liệu Đấu trường Live...</h3></div>`;

    try {
        // Lấy danh sách các phòng thi Live đã tạo
        const { data: dsPhong, error } = await _supabase
            .from('phong_live_quiz')
            .select('*')
            .order('ngay_tao', { ascending: false });

        if (error) throw error;

        // Lấy thêm tên nhiệm vụ để hiển thị cho đẹp
        let tuDienNV = {};
        const { data: dsNV } = await _supabase.from('nhiem_vu').select('ma_nhiem_vu, ten_nhiem_vu');
        if (dsNV) {
            dsNV.forEach(nv => tuDienNV[nv.ma_nhiem_vu] = nv.ten_nhiem_vu);
        }

        let htmlRows = '';
        if (!dsPhong || dsPhong.length === 0) {
            htmlRows = `<tr><td colspan="6" style="text-align:center; padding: 30px; color:#6c757d;">Chưa có phòng thi Live nào được tạo. Hãy bấm "Tạo Phòng Mới" để bắt đầu!</td></tr>`;
        } else {
            dsPhong.forEach((phong, index) => {
                const tenNhiemVu = tuDienNV[phong.ma_nhiem_vu] || 'Nhiệm vụ ẩn/đã xóa';
                const thoiGianTao = new Date(phong.ngay_tao).toLocaleString('vi-VN');

                let badgeTrangThai = '';
                let htmlThaoTac = '';

                // Trạng thái: 0 (Đang đợi), 1 (Đang thi), 2 (Kết thúc)
                if (phong.trang_thai === 0) {
                    badgeTrangThai = `<span style="background:#e8f5e9; color:#2e7d32; padding:4px 8px; border-radius:4px; font-size:12px; font-weight:bold; border:1px solid #c8e6c9;">ĐANG CHỜ HỌC SINH</span>`;
                    htmlThaoTac = `<button onclick="ham_9_3_vao_dieu_khien_phong('${phong.ma_phong}')" style="padding: 6px 12px; background: #28a745; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; font-size: 12px;">VÀO ĐIỀU KHIỂN</button>`;
                } else if (phong.trang_thai === 1) {
                    badgeTrangThai = `<span style="background:#ffebee; color:#c62828; padding:4px 8px; border-radius:4px; font-size:12px; font-weight:bold; border:1px solid #ffcdd2;">🔥 ĐANG THI ĐẤU</span>`;
                    htmlThaoTac = `<button onclick="ham_9_3_vao_dieu_khien_phong('${phong.ma_phong}')" style="padding: 6px 12px; background: #e74c3c; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; font-size: 12px;">XEM TRỰC TIẾP</button>`;
                } else {
                    badgeTrangThai = `<span style="background:#f1f3f4; color:#5f6368; padding:4px 8px; border-radius:4px; font-size:12px; font-weight:bold; border:1px solid #dadce0;">ĐÃ KẾT THÚC</span>`;
                    htmlThaoTac = `<button onclick="ham_9_3_vao_dieu_khien_phong('${phong.ma_phong}')" style="padding: 6px 12px; background: #6c757d; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; font-size: 12px;">XEM LẠI KẾT QUẢ</button>`;
                }

                htmlRows += `
                    <tr style="border-bottom: 1px solid #eee; background: #fff;">
                        <td style="padding: 12px 10px; text-align: center; color: #666; font-weight: bold;">${index + 1}</td>
                        <td style="padding: 12px 10px; text-align: center;">
                            <b style="font-size: 20px; color: #e74c3c; font-family: monospace; letter-spacing: 2px;">${phong.ma_phong}</b>
                        </td>
                        <td style="padding: 12px 10px;">
                            <div style="font-weight: bold; color: #1a73e8; font-size: 14px;">${tenNhiemVu}</div>
                            <div style="font-size: 11px; color: #888;">Mã NV: ${phong.ma_nhiem_vu}</div>
                        </td>
                        <td style="padding: 12px 10px; font-size: 12px; color: #555;">${thoiGianTao}</td>
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
                    <table style="width: 100%; border-collapse: collapse; min-width: 800px; text-align: left;">
                        <thead style="background: #f8f9fa; border-bottom: 2px solid #dee2e6;">
                            <tr>
                                <th style="padding: 12px 10px; text-align: center; color: #495057; width: 50px;">STT</th>
                                <th style="padding: 12px 10px; text-align: center; color: #495057; width: 120px;">Mã PIN</th>
                                <th style="padding: 12px 10px; color: #495057;">Sử dụng Đề thi / Nhiệm vụ</th>
                                <th style="padding: 12px 10px; color: #495057; width: 150px;">Thời gian tạo</th>
                                <th style="padding: 12px 10px; text-align: center; color: #495057; width: 160px;">Trạng Thái</th>
                                <th style="padding: 12px 10px; text-align: center; color: #495057; width: 150px;">Thao Tác</th>
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
// Hàm 9.2: Xử lý Tạo phòng thi Live (Chọn đề & Sinh mã PIN)
// =====================================================================
window.ham_9_2_tao_phong_live = async function () {
    window.Swal.fire({
        title: '⏳ Đang tải dữ liệu...',
        allowOutsideClick: false,
        didOpen: () => { window.Swal.showLoading(); }
    });

    try {
        // Lấy danh sách nhiệm vụ của giáo viên này để làm đề thi
        const { data: dsNV, error } = await _supabase
            .from('nhiem_vu')
            .select('ma_nhiem_vu, ten_nhiem_vu')
            .order('ngay_tao', { ascending: false });

        if (error) throw error;
        if (!dsNV || dsNV.length === 0) {
            return Swal.fire('Thông báo', 'Thầy chưa có Nhiệm vụ (Đề thi) nào. Hãy tạo nhiệm vụ trước khi mở phòng Live nhé!', 'warning');
        }

        // Tạo mảng lựa chọn cho Dropdown
        let optionsHtml = '<option value="">-- Chọn đề thi / Nhiệm vụ --</option>';
        dsNV.forEach(nv => {
            optionsHtml += `<option value="${nv.ma_nhiem_vu}">[${nv.ma_nhiem_vu}] - ${nv.ten_nhiem_vu}</option>`;
        });

        Swal.fire({
            title: '🚀 KHỞI TẠO PHÒNG LIVE',
            html: `
                <div style="text-align: left; margin-top: 10px;">
                    <label style="font-weight: bold; font-size: 14px; color: #333;">Chọn đề thi sử dụng cho trận đấu này:</label>
                    <select id="swal-select-nhiem-vu" style="width: 100%; padding: 10px; margin-top: 8px; border: 1px solid #ccc; border-radius: 6px; font-size: 14px;">
                        ${optionsHtml}
                    </select>
                </div>
            `,
            showCancelButton: true,
            confirmButtonText: 'Tạo Mã PIN Phòng',
            cancelButtonText: 'Hủy',
            confirmButtonColor: '#e74c3c',
            preConfirm: () => {
                const maNV = document.getElementById('swal-select-nhiem-vu').value;
                if (!maNV) {
                    Swal.showValidationMessage('Vui lòng chọn 1 đề thi để bắt đầu!');
                    return false;
                }
                return maNV;
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                const maNhiemVuChon = result.value;

                // Thuật toán sinh mã PIN 6 số ngẫu nhiên
                const maPinLive = Math.floor(100000 + Math.random() * 900000).toString();

                Swal.fire({ title: 'Đang khởi tạo phòng...', didOpen: () => { Swal.showLoading(); } });

                const { error: errInsert } = await _supabase
                    .from('phong_live_quiz')
                    .insert([{
                        ma_phong: maPinLive,
                        ma_nhiem_vu: maNhiemVuChon,
                        uid_gv_tao: AppState.user?.uid || '',
                        trang_thai: 0 // 0: Đang đợi học sinh vào
                    }]);

                if (errInsert) {
                    Swal.fire('Lỗi tạo phòng', errInsert.message, 'error');
                } else {
                    Swal.fire({
                        icon: 'success',
                        title: 'Tạo phòng thành công!',
                        html: `Mã PIN của phòng là: <b style="font-size: 24px; color: #e74c3c; letter-spacing: 2px;">${maPinLive}</b>`,
                        confirmButtonText: 'Vào Phòng Điều Khiển',
                        confirmButtonColor: '#28a745'
                    }).then(() => {
                        // Tạm thời reload lại bảng, bước sau mình sẽ viết hàm chuyển thẳng vào phòng
                        ham_9_1_tab_live_quiz();
                    });
                }
            }
        });

    } catch (e) {
        Swal.fire('Lỗi', e.message, 'error');
    }
}

// =====================================================================
// KHỞI TẠO BIẾN TOÀN CỤC ĐỂ QUẢN LÝ SÓNG REALTIME
// =====================================================================
window.LiveQuizChannel = null;
window.DanhSachLive = [];
window.ThongTinPhongLive = { tongSoCau: 0, maPhong: '' };

// =====================================================================
// Hàm 9.3: Vào phòng điều khiển (Hiển thị Mã PIN & Bảng Xếp Hạng Realtime)
// =====================================================================
window.ham_9_3_vao_dieu_khien_phong = async function (maPhong) {
    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
    vungLamViec.innerHTML = `<div style="text-align: center; padding: 40px;"><h3 style="color:#e74c3c;">⏳ Đang kết nối tín hiệu phòng ${maPhong}...</h3></div>`;

    try {
        // 1. Bốc thông tin phòng và Nhiệm vụ (Để tính tổng số câu hỏi)
        const { data: phong, error: errPhong } = await _supabase
            .from('phong_live_quiz')
            .select('*')
            .eq('ma_phong', maPhong)
            .single();

        if (errPhong) throw errPhong;

        const { data: nv } = await _supabase
            .from('nhiem_vu')
            .select('ten_nhiem_vu, cau_truc_de')
            .eq('ma_nhiem_vu', phong.ma_nhiem_vu)
            .single();

        let tongSoCau = 0;
        try {
            // Lấy tổng số câu từ cấu trúc đề (VD: "TN: 10, TLN: 5")
            // Hoặc có thể mặc định là 50 nếu cấu trúc rỗng
            const matchCau = (nv.cau_truc_de || '').match(/\d+/g);
            if (matchCau) tongSoCau = matchCau.reduce((a, b) => Number(a) + Number(b), 0);
            if (tongSoCau === 0) tongSoCau = 20; // Mặc định an toàn
        } catch (e) { tongSoCau = 20; }

        window.ThongTinPhongLive = { tongSoCau: tongSoCau, maPhong: maPhong };

        // 2. Bốc tiến độ hiện tại của tất cả học sinh trong phòng
        const { data: dsTienDo, error: errTienDo } = await _supabase
            .from('tien_do_live_quiz')
            .select('*')
            .eq('ma_phong', maPhong);

        if (errTienDo) throw errTienDo;
        window.DanhSachLive = dsTienDo || [];

        // 3. VẼ KHUNG GIAO DIỆN CHÍNH
        let nutTrangThaiHtml = '';
        if (phong.trang_thai === 0) {
            nutTrangThaiHtml = `<button onclick="ham_9_3_2_doi_trang_thai('${maPhong}', 1)" style="padding: 12px 24px; background: #28a745; color: white; border: none; border-radius: 8px; font-weight: 900; font-size: 16px; cursor: pointer; box-shadow: 0 4px 6px rgba(40,167,69,0.3); transition: 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">🚀 BẮT ĐẦU THI ĐẤU</button>`;
        } else if (phong.trang_thai === 1) {
            nutTrangThaiHtml = `<button onclick="ham_9_3_2_doi_trang_thai('${maPhong}', 2)" style="padding: 12px 24px; background: #e74c3c; color: white; border: none; border-radius: 8px; font-weight: 900; font-size: 16px; cursor: pointer; box-shadow: 0 4px 6px rgba(231,76,60,0.3); transition: 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">🛑 KẾT THÚC TRẬN ĐẤU</button>`;
        } else {
            nutTrangThaiHtml = `<span style="padding: 12px 24px; background: #6c757d; color: white; border-radius: 8px; font-weight: 900; font-size: 16px;">🏁 ĐÃ KẾT THÚC</span>`;
        }

        vungLamViec.innerHTML = `
            <div style="background: #1e1e2f; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); overflow: hidden; color: white; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 20px 30px; border-bottom: 1px solid #2a2a3c;">
                    <div>
                        <div style="color: #a0a0b2; font-size: 14px; font-weight: bold; text-transform: uppercase;">MÃ PHÒNG (PIN)</div>
                        <div style="font-size: 48px; font-weight: 900; color: #f1c40f; letter-spacing: 5px; line-height: 1;">${maPhong}</div>
                        <div style="color: #3498db; font-size: 13px; margin-top: 5px; font-weight: bold;">Đề: ${nv.ten_nhiem_vu} (${tongSoCau} câu)</div>
                    </div>
                    <div style="display: flex; gap: 15px; align-items: center;">
                        ${nutTrangThaiHtml}
                        <button onclick="ham_9_3_3_thoat_phong()" style="padding: 12px 20px; background: transparent; color: #a0a0b2; border: 2px solid #a0a0b2; border-radius: 8px; font-weight: bold; cursor: pointer; transition: 0.2s;" onmouseover="this.style.color='white'; this.style.borderColor='white'" onmouseout="this.style.color='#a0a0b2'; this.style.borderColor='#a0a0b2'">
                            Thoát ra ngoài
                        </button>
                    </div>
                </div>

                <div style="padding: 20px 30px; min-height: 400px; background: #252538;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 15px; color: #a0a0b2; font-size: 12px; font-weight: bold; text-transform: uppercase; padding: 0 15px;">
                        <div style="width: 50px;">Rank</div>
                        <div style="flex: 1;">Chiến binh</div>
                        <div style="width: 40%; text-align: center;">Tiến độ làm bài</div>
                        <div style="width: 80px; text-align: right;">Điểm số</div>
                    </div>
                    
                    <div id="vung-ve-leaderboard" style="display: flex; flex-direction: column; gap: 10px;">
                        </div>
                </div>
            </div>
        `;

        // Lần vẽ đầu tiên
        ham_9_3_1_ve_leaderboard();

        // =====================================================================
        // 🌟 4. KÍCH HOẠT SÓNG REALTIME: BẮT SỰ KIỆN TỪ DATABASE
        // =====================================================================
        if (window.LiveQuizChannel) { _supabase.removeChannel(window.LiveQuizChannel); } // Xóa kênh cũ nếu còn vướng

        window.LiveQuizChannel = _supabase.channel('kenh_phong_' + maPhong)
            .on('postgres_changes', {
                event: '*',
                table: 'tien_do_live_quiz',
                filter: `ma_phong=eq.${maPhong}`
            }, payload => {
                const { eventType, new: dataMoi } = payload;

                if (eventType === 'INSERT') {
                    window.DanhSachLive.push(dataMoi);
                } else if (eventType === 'UPDATE') {
                    const idx = window.DanhSachLive.findIndex(item => item.uid_hoc_sinh === dataMoi.uid_hoc_sinh);
                    if (idx > -1) {
                        window.DanhSachLive[idx] = dataMoi; // Cập nhật đè dữ liệu mới
                    }
                }

                // Sau khi RAM thay đổi, lập tức ra lệnh vẽ lại bảng
                ham_9_3_1_ve_leaderboard();
            })
            .subscribe();

    } catch (e) {
        vungLamViec.innerHTML = `<div style="color: #dc3545; text-align: center; padding: 20px; font-weight:bold;">❌ Lỗi truy xuất phòng: ${e.message}</div>`;
    }
}

// =====================================================================
// Hàm 9.3.1: Vẽ/Cập nhật Khối Leaderboard (Chạy liên tục mỗi khi có tín hiệu)
// =====================================================================
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
    const tongCau = window.ThongTinPhongLive.tongSoCau;

    window.DanhSachLive.forEach((hs, index) => {
        const phanTram = tongCau > 0 ? (hs.so_cau_da_lam / tongCau) * 100 : 0;

        let rankIcon = `<div style="width: 30px; height: 30px; background: #343a40; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">${index + 1}</div>`;
        if (index === 0) rankIcon = `<div style="font-size: 24px;">🥇</div>`;
        if (index === 1) rankIcon = `<div style="font-size: 24px;">🥈</div>`;
        if (index === 2) rankIcon = `<div style="font-size: 24px;">🥉</div>`;

        // Tự đổi màu thanh khi xong bài
        const mauThanh = phanTram >= 100 ? '#2ecc71' : '#3498db';

        htmlDong += `
            <div style="display: flex; justify-content: space-between; align-items: center; background: #2f2f45; padding: 12px 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.3s ease;">
                <div style="width: 50px; display: flex; justify-content: center;">${rankIcon}</div>
                
                <div style="flex: 1; font-weight: bold; font-size: 16px; color: #fff;">
                    ${hs.ten_hoc_sinh}
                    <div style="font-size: 11px; color: #a0a0b2; font-weight: normal;">Đúng: ${hs.so_cau_dung} câu</div>
                </div>
                
                <div style="width: 40%; display: flex; align-items: center; gap: 10px;">
                    <div style="flex: 1; background: #1e1e2f; height: 12px; border-radius: 6px; overflow: hidden; box-shadow: inset 0 1px 3px rgba(0,0,0,0.2);">
                        <div style="width: ${phanTram}%; height: 100%; background: ${mauThanh}; border-radius: 6px; transition: width 0.5s ease-out;"></div>
                    </div>
                    <div style="font-size: 12px; font-weight: bold; color: #a0a0b2; width: 40px; text-align: right;">${hs.so_cau_da_lam}/${tongCau}</div>
                </div>
                
                <div style="width: 80px; text-align: right; font-size: 20px; font-weight: 900; color: #f1c40f;">
                    ${Number(hs.diem_so).toFixed(1)}
                </div>
            </div>
        `;
    });

    vungVe.innerHTML = htmlDong;
}

// =====================================================================
// Hàm 9.3.2: Đổi trạng thái phòng (Bắt đầu / Kết thúc)
// =====================================================================
window.ham_9_3_2_doi_trang_thai = async function (maPhong, trangThaiMoi) {
    try {
        const { error } = await _supabase
            .from('phong_live_quiz')
            .update({ trang_thai: trangThaiMoi })
            .eq('ma_phong', maPhong);

        if (error) throw error;

        // Cập nhật lại giao diện phòng
        ham_9_3_vao_dieu_khien_phong(maPhong);
    } catch (e) {
        Swal.fire('Lỗi', e.message, 'error');
    }
}

// =====================================================================
// Hàm 9.3.3: Nút Thoát Phòng (Gỡ bỏ kết nối Realtime cho nhẹ máy)
// =====================================================================
window.ham_9_3_3_thoat_phong = function () {
    if (window.LiveQuizChannel) {
        _supabase.removeChannel(window.LiveQuizChannel);
        window.LiveQuizChannel = null;
    }
    ham_9_1_tab_live_quiz();
}
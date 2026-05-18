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
    Swal.fire({
        title: '⏳ Đang tải dữ liệu...',
        allowOutsideClick: false,
        didOpen: () => { Swal.showLoading(); }
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

// Hàm giữ chỗ để tí nữa viết Giao diện trong phòng (Sẽ viết ở Nhịp 2)
window.ham_9_3_vao_dieu_khien_phong = function (maPhong) {
    alert(`Chuẩn bị xây dựng Bảng điều khiển Realtime cho phòng: ${maPhong}`);
}
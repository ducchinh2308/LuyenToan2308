// =====================================================================
// KHỐI 25: GIAO DIỆN QUẢN LÝ BÀI THI & BAREM OMR
// =====================================================================

// =====================================================================
// HÀM 25.1: MỞ DANH SÁCH CÁC KỲ THI OMR ĐÃ TẠO
// =====================================================================
window.ham_25_1_quan_ly_omr = async function () {
    Swal.fire({ title: '⏳ Đang tải danh sách bài thi...', didOpen: () => Swal.showLoading(), allowOutsideClick: false });

    try {
        const { data: dsOMR, error } = await _supabase.from('nhiem_vu_omr')
            .select('*')
            .order('created_at', { ascending: false });d
        if (error) throw error;

        let tbodyHTML = '';
        if (dsOMR && dsOMR.length > 0) {
            dsOMR.forEach((nv, index) => {
                let soMaDe = nv.danh_sach_key ? Object.keys(nv.danh_sach_key).length : 0;
                let mauPhieuTen = nv.mau_phieu === 'bgd2025_toan' ? 'Mẫu BGD Toán/Lý/Hóa' :
                    (nv.mau_phieu === 'bgd2025_van' ? 'Mẫu BGD Sử/Địa/GDCD' : 'Mẫu 50 TN');

                tbodyHTML += `
                    <tr style="border-bottom: 1px solid #eee; text-align: center;">
                        <td style="padding: 10px;">${index + 1}</td>
                        <td style="padding: 10px; font-weight: bold; color: #0056b3; text-align: left;">
                            ${nv.ten_bai_thi} <br>
                            <span style="font-size: 11px; color: #6c757d; font-weight: normal;">Mã: ${nv.ma_nhiem_vu}</span>
                        </td>
                        <td style="padding: 10px; font-size: 12px;">${mauPhieuTen}</td>
                        <td style="padding: 10px; font-weight: bold; color: #28a745;">${soMaDe} mã đề</td>
                        <td style="padding: 10px;">
                            <button onclick="ham_25_3_quan_ly_barem('${nv.ma_nhiem_vu}', '${nv.ten_bai_thi}')" style="padding: 5px 10px; background: #17a2b8; color: white; border: none; border-radius: 4px; font-size: 12px; cursor: pointer;">
                                🔑 Sửa Barem
                            </button>
                            <button onclick="ham_25_4_xoa_nhiem_vu('${nv.ma_nhiem_vu}')" style="padding: 5px 10px; background: #dc3545; color: white; border: none; border-radius: 4px; font-size: 12px; cursor: pointer; margin-left: 5px;">
                                🗑️ Xóa
                            </button>
                        </td>
                    </tr>
                `;
            });
        } else {
            tbodyHTML = `<tr><td colspan="5" style="padding: 20px; text-align: center; color: #dc3545;">Chưa có bài thi nào được tạo!</td></tr>`;
        }

        Swal.fire({
            title: '📁 QUẢN LÝ BÀI THI OMR',
            html: `
                <div style="text-align: left;">
                    <button onclick="ham_25_2_tao_nhiem_vu_moi()" style="margin-bottom: 15px; padding: 10px 15px; background: #28a745; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; display: flex; align-items: center; gap: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        ➕ TẠO BÀI KIỂM TRA MỚI
                    </button>
                    
                    <div style="max-height: 400px; overflow-y: auto; border: 1px solid #ccc; border-radius: 6px;">
                        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                            <thead style="background: #e9ecef; position: sticky; top: 0; z-index: 1;">
                                <tr>
                                    <th style="padding: 10px; border-bottom: 2px solid #ccc;">STT</th>
                                    <th style="padding: 10px; border-bottom: 2px solid #ccc; text-align: left;">Tên bài thi</th>
                                    <th style="padding: 10px; border-bottom: 2px solid #ccc;">Loại phiếu</th>
                                    <th style="padding: 10px; border-bottom: 2px solid #ccc;">Đã lên Key</th>
                                    <th style="padding: 10px; border-bottom: 2px solid #ccc;">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${tbodyHTML}
                            </tbody>
                        </table>
                    </div>
                </div>
            `,
            width: '800px',
            showConfirmButton: false,
            showCancelButton: true,
            cancelButtonText: 'Đóng'
        });

    } catch (err) {
        Swal.fire('Lỗi', 'Không tải được danh sách: ' + err.message, 'error');
    }
};

// =====================================================================
// HÀM 25.2: TẠO NHIỆM VỤ THI OMR MỚI
// =====================================================================
window.ham_25_2_tao_nhiem_vu_moi = function () {
    Swal.fire({
        title: '➕ TẠO BÀI THI OMR MỚI',
        html: `
            <div style="text-align: left; font-size: 14px;">
                <label style="font-weight: bold; color: #0056b3;">Mã bài thi (Ví dụ: TOAN12_GK1):</label>
                <input type="text" id="omr_tao_ma" class="swal2-input" placeholder="Viết liền không dấu..." style="margin-top: 5px; margin-bottom: 15px; width: 90%;">

                <label style="font-weight: bold; color: #0056b3;">Tên hiển thị (Ví dụ: Giữa kỳ 1 Toán 12):</label>
                <input type="text" id="omr_tao_ten" class="swal2-input" style="margin-top: 5px; margin-bottom: 15px; width: 90%;">

                <label style="font-weight: bold; color: #0056b3;">Mẫu phiếu sử dụng:</label>
                <select id="omr_tao_mau" class="swal2-select" style="margin-top: 5px; width: 90%;">
                    <option value="bgd2025_toan">Mẫu BGD 2025 (Toán/Lý/Hóa) - 12 TN, 4 ĐS, 6 TLN</option>
                    <option value="bgd2025_van">Mẫu BGD 2025 (Sử/Địa/GDCD) - 24 TN, 4 ĐS</option>
                    <option value="truyenthong_50">Mẫu Truyền thống - 50 Câu TN</option>
                </select>
            </div>
        `,
        width: '500px',
        showCancelButton: true,
        confirmButtonText: '💾 TẠO MỚI',
        cancelButtonText: 'Hủy',
        preConfirm: async () => {
            const ma = document.getElementById('omr_tao_ma').value.trim().toUpperCase();
            const ten = document.getElementById('omr_tao_ten').value.trim();
            const mau = document.getElementById('omr_tao_mau').value;

            if (!ma || !ten) return Swal.showValidationMessage('Vui lòng nhập đủ Mã và Tên bài thi!');

            // Regex kiểm tra mã không chứa khoảng trắng và ký tự đặc biệt
            if (!/^[A-Z0-9_-]+$/.test(ma)) return Swal.showValidationMessage('Mã bài thi chỉ được chứa chữ cái, số, gạch ngang và gạch dưới!');

            Swal.showLoading();
            try {
                // Tạo rỗng, JSON sẽ được cấu hình sau
                const { error } = await _supabase.from('nhiem_vu_omr').insert([{
                    ma_nhiem_vu: ma,
                    ten_bai_thi: ten,
                    mau_phieu: mau,
                    danh_sach_key: {},
                    trang_thai: 'khoi_tao'
                }]);

                if (error) {
                    if (error.code === '23505') throw new Error("Mã bài thi này đã tồn tại!");
                    throw error;
                }
                return true;
            } catch (err) {
                Swal.showValidationMessage('Lỗi: ' + err.message);
                return false;
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire('Thành công', 'Đã tạo bài thi mới!', 'success').then(() => ham_25_1_quan_ly_omr());
        }
    });
};

// =====================================================================
// HÀM 25.3: QUẢN LÝ & NHẬP BAREM CHO TỪNG MÃ ĐỀ (CẮM KEY JSON)
// =====================================================================
window.ham_25_3_quan_ly_barem = async function (maNhiemVu, tenBaiThi) {
    Swal.fire({ title: 'Đang tải dữ liệu Barem...', didOpen: () => Swal.showLoading() });

    try {
        const { data, error } = await _supabase.from('nhiem_vu_omr').select('danh_sach_key, mau_phieu').eq('ma_nhiem_vu', maNhiemVu).single();
        if (error) throw error;

        let keys = data.danh_sach_key || {};
        let mauPhieu = data.mau_phieu;

        // Render HTML các mã đề đã có
        let htmlMaDe = '';
        for (let maDe in keys) {
            htmlMaDe += `
                <div style="background: #f8f9fa; border: 1px solid #ccc; padding: 10px; margin-bottom: 10px; border-radius: 6px; display: flex; justify-content: space-between; align-items: center;">
                    <div style="text-align: left;">
                        <b style="color: #d35400; font-size: 16px;">Mã đề: ${maDe}</b><br>
                        <span style="font-size: 12px; color: #555;">Đã cấu hình Key</span>
                    </div>
                    <div>
                        <button onclick="Swal.fire('Tính năng đang hoàn thiện', 'Sửa chi tiết key mã đề này', 'info')" style="padding: 5px 10px; background: #ffc107; border: none; border-radius: 4px; font-weight:bold; cursor:pointer;">✏️ Sửa</button>
                        <button onclick="delete keys['${maDe}']; Swal.fire('Tạm ẩn', 'Lưu để xóa thật', 'success')" style="padding: 5px 10px; background: #dc3545; color: white; border: none; border-radius: 4px; font-weight:bold; cursor:pointer;">🗑️ Xóa</button>
                    </div>
                </div>
            `;
        }
        if (htmlMaDe === '') htmlMaDe = `<p style="color:red; font-style:italic;">Chưa có mã đề nào được thiết lập Barem.</p>`;

        Swal.fire({
            title: '🔑 QUẢN LÝ BAREM (KEY)',
            html: `
                <div style="text-align: left; font-size: 14px;">
                    <p style="color: #0056b3; font-weight: bold; text-align: center; border-bottom: 1px solid #ccc; padding-bottom: 10px;">${tenBaiThi}</p>
                    
                    <div style="background: #e6f2ff; padding: 15px; border-radius: 6px; border: 1px dashed #0056b3; margin-bottom: 15px;">
                        <h4 style="margin: 0 0 10px 0; color: #0056b3;">Thêm Mã đề mới:</h4>
                        <input type="text" id="omr_nhap_ma_de" placeholder="Nhập số mã đề (VD: 101)..." style="width: 100%; padding: 8px; margin-bottom: 10px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; font-weight:bold;">
                        
                        <textarea id="omr_nhap_chuoi_key" rows="4" placeholder="Nhập nhanh chuỗi đáp án phần TN (VD: 1A 2B 3C...)" style="width: 100%; padding: 8px; margin-bottom: 10px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; font-family: monospace;"></textarea>
                        
                        <button onclick="Swal.fire('Thông báo', 'Hệ thống sẽ bóc tách chuỗi chữ này thành JSON lưu vào database', 'info')" style="width: 100%; padding: 8px; background: #28a745; color: white; border: none; border-radius: 4px; font-weight:bold; cursor:pointer;">
                            ➕ LƯU MÃ ĐỀ NÀY
                        </button>
                    </div>

                    <h4 style="margin: 0 0 10px 0; color: #333;">Các mã đề đã thiết lập:</h4>
                    <div style="max-height: 250px; overflow-y: auto; padding-right: 5px;">
                        ${htmlMaDe}
                    </div>
                </div>
            `,
            width: '600px',
            showConfirmButton: true,
            confirmButtonText: 'Xong / Quay lại',
            confirmButtonColor: '#6c757d'
        }).then(() => {
            ham_25_1_quan_ly_omr(); // Bấm xong thì quay lại list
        });

    } catch (err) {
        Swal.fire('Lỗi', 'Không lấy được dữ liệu Barem: ' + err.message, 'error');
    }
};

// =====================================================================
// HÀM 25.4: XÓA NHIỆM VỤ OMR
// =====================================================================
window.ham_25_4_xoa_nhiem_vu = function (maNhiemVu) {
    Swal.fire({
        title: 'Cảnh báo nguy hiểm!',
        text: `Bạn có chắc chắn muốn xóa bài thi ${maNhiemVu}? Toàn bộ lịch sử chấm và điểm của học sinh sẽ bị mất (Minh chứng trên Drive vẫn còn).`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d',
        confirmButtonText: '🗑️ Xóa vĩnh viễn!'
    }).then(async (result) => {
        if (result.isConfirmed) {
            Swal.fire({ title: 'Đang xóa...', didOpen: () => Swal.showLoading() });
            try {
                const { error } = await _supabase.from('nhiem_vu_omr').delete().eq('ma_nhiem_vu', maNhiemVu);
                if (error) throw error;
                Swal.fire('Đã xóa', 'Nhiệm vụ đã bị xóa.', 'success').then(() => ham_25_1_quan_ly_omr());
            } catch (err) {
                Swal.fire('Lỗi', 'Không thể xóa: ' + err.message, 'error');
            }
        }
    });
};
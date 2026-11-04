// =====================================================================
// KHỐI 24: MODULE TIỆN ÍCH MÁY QUÉT TRẮC NGHIỆM BẰNG CAMERA (OPENCV.JS)
// =====================================================================

// 🌟 BIẾN TOÀN CỤC: LƯU TRỮ CẤU HÌNH ĐIỂM SỐ & TRỌNG SỐ
window.DataOMR_CauHinh = window.DataOMR_CauHinh || {
    cheDo: 'mac_dinh', // 'mac_dinh' hoặc 'chinh_sua'
    thangDiem: 10,
    soCauTN: 12, tsTN: 1,
    soCauDS: 4, tsDS: 4,
    soCauTLN: 6, tsTLN: 2,
    diemDS_1y: 0.1,
    diemDS_2y: 0.25,
    diemDS_3y: 0.5
};

// =====================================================================
// HÀM 24.1: KHỞI CHẠY TỪ MENU TIỆN ÍCH
// =====================================================================
window.ham_24_1_mo_tien_ich_cham_omr = async function () {
    Swal.fire({ title: '⏳ Đang tải danh sách nhiệm vụ...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

    try {
        const { data: dsTN, error } = await _supabase.from('nhiem_vu_trac_nghiem')
            .select('ma_nhiem_vu, ten_nhiem_vu, ngay_tao')
            .order('ngay_tao', { ascending: false })
            .limit(20);

        if (error) throw error;

        let optionsHTML = '<option value="">-- Vui lòng chọn bài cần quét --</option>';
        if (dsTN && dsTN.length > 0) {
            dsTN.forEach(nv => {
                optionsHTML += `<option value="${nv.ma_nhiem_vu}">${nv.ten_nhiem_vu} (Mã: ${nv.ma_nhiem_vu})</option>`;
            });
        } else {
            optionsHTML = '<option value="">Chưa có nhiệm vụ trắc nghiệm nào</option>';
        }

        Swal.fire({
            title: '📷 TIỆN ÍCH QUÉT PHIẾU OMR',
            html: `
                <div style="text-align: left; padding: 10px;">
                    <div style="background: #fff8e1; padding: 15px; border-radius: 8px; border: 1px solid #ffeeba; margin-bottom: 20px;">
                        <label style="font-weight: bold; color: #d35400; display: block; margin-bottom: 8px;">1. Chọn bài kiểm tra cần chấm:</label>
                        <select id="omr_chon_nhiem_vu" style="width: 100%; padding: 10px; border-radius: 6px; border: 2px solid #fd7e14; font-weight: bold; font-size: 14px; cursor: pointer;">
                            ${optionsHTML}
                        </select>
                    </div>

                    <div style="text-align: center; padding: 30px; background: #f8f9fa; border: 2px dashed #ccc; border-radius: 8px;">
                        <div style="font-size: 45px; margin-bottom: 10px;">🎥</div>
                        <h4 style="color: #495057; margin: 0; font-size: 18px;">Hệ thống Camera OMR</h4>
                        <p style="color: #6c757d; font-size: 13px; margin-top: 8px; line-height: 1.5;">
                            Thư viện nhận diện ảnh đang ở trạng thái chờ.<br>Vui lòng chọn bài kiểm tra ở trên để khởi động ống kính.
                        </p>
                    </div>
                </div>
            `,
            width: '600px',
            showCancelButton: true,
            cancelButtonText: 'Đóng lại',
            confirmButtonText: '🚀 BẬT CAMERA QUÉT',
            confirmButtonColor: '#28a745',
            preConfirm: () => {
                const maNV = document.getElementById('omr_chon_nhiem_vu').value;
                if (!maNV) {
                    Swal.showValidationMessage('Vui lòng chọn một nhiệm vụ để chấm!');
                    return false;
                }
                const tenNV = document.getElementById('omr_chon_nhiem_vu').options[document.getElementById('omr_chon_nhiem_vu').selectedIndex].text;
                return { maNV, tenNV };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                ham_24_2_khoi_tao_giao_dien_camera(result.value.maNV, result.value.tenNV);
            }
        });

    } catch (err) {
        Swal.fire('Lỗi', 'Không tải được danh sách nhiệm vụ: ' + err.message, 'error');
    }
};

// =====================================================================
// HÀM 24.2: GIAO DIỆN CAMERA & ĐIỀU KHIỂN QUÉT
// =====================================================================
window.ham_24_2_khoi_tao_giao_dien_camera = function (maNhiemVu, tenNhiemVu) {
    Swal.fire({
        title: '🔴 ĐANG TRUY CẬP CAMERA...',
        html: `
            <div style="text-align: left;">
                <div style="margin-bottom: 10px; font-weight: bold; color: #0056b3; font-size: 14px; text-align: center;">
                    Đang chấm: ${tenNhiemVu}
                </div>
                
                <!-- Khung chứa Video Camera -->
                <div style="width: 100%; height: 400px; background: #000; border-radius: 8px; position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; box-shadow: inset 0 0 20px rgba(0,0,0,0.8);">
                    <span style="color: white; font-weight: bold; z-index: 2; opacity: 0.7;">[ LUỒNG CAMERA SẼ HIỂN THỊ TẠI ĐÂY ]</span>
                    
                    <!-- Khung viền ngắm (Viewfinder) -->
                    <div style="position: absolute; top: 10%; left: 10%; right: 10%; bottom: 10%; border: 2px dashed rgba(40, 167, 69, 0.8); z-index: 1;">
                        <div style="position:absolute; top:-2px; left:-2px; width:20px; height:20px; border-top: 4px solid #28a745; border-left: 4px solid #28a745;"></div>
                        <div style="position:absolute; top:-2px; right:-2px; width:20px; height:20px; border-top: 4px solid #28a745; border-right: 4px solid #28a745;"></div>
                        <div style="position:absolute; bottom:-2px; left:-2px; width:20px; height:20px; border-bottom: 4px solid #28a745; border-left: 4px solid #28a745;"></div>
                        <div style="position:absolute; bottom:-2px; right:-2px; width:20px; height:20px; border-bottom: 4px solid #28a745; border-right: 4px solid #28a745;"></div>
                    </div>
                </div>
                
                <div style="display: flex; gap: 10px; margin-top: 15px;">
                    <button style="flex: 2; padding: 12px; background: #dc3545; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; font-size:16px;">
                        📸 CHỤP & CHẤM NGAY
                    </button>
                    <button onclick="ham_24_3_mo_cai_dat_diem()" style="flex: 1; padding: 12px; background: #17a2b8; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">
                        ⚙️ Cài đặt Điểm
                    </button>
                    <button style="flex: 1; padding: 12px; background: #6c757d; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">
                        📐 Tọa độ OMR
                    </button>
                </div>
            </div>
        `,
        width: '700px',
        showConfirmButton: false,
        showCancelButton: true,
        cancelButtonText: 'Dừng quét & Đóng',
        allowOutsideClick: false
    });
};

// =====================================================================
// HÀM 24.3: POPUP THIẾT LẬP CÀI ĐẶT ĐIỂM VÀ TRỌNG SỐ (TỰ ĐỘNG TÍNH TOÁN)
// =====================================================================
window.ham_24_3_mo_cai_dat_diem = function () {
    let conf = window.DataOMR_CauHinh;

    Swal.fire({
        title: '⚙️ THIẾT LẬP ĐIỂM & TRỌNG SỐ',
        html: `
            <div style="text-align: left; font-size: 14px;">
                <div style="display: flex; gap: 20px; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid #ccc;">
                    <label style="cursor: pointer; font-weight: bold; color: #28a745;">
                        <input type="radio" name="omr_chedo" value="mac_dinh" style="transform: scale(1.2);"> 🔒 Mặc định (Chuẩn BGD)
                    </label>
                    <label style="cursor: pointer; font-weight: bold; color: #d35400;">
                        <input type="radio" name="omr_chedo" value="chinh_sua" style="transform: scale(1.2);"> ✏️ Tùy chỉnh (Chỉnh sửa)
                    </label>
                </div>

                <div style="background: #f8f9fa; padding: 15px; border-radius: 6px; border: 1px solid #dee2e6; margin-bottom: 15px;">
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 15px;">
                        <b style="font-size: 16px;">💯 Thang điểm tối đa:</b>
                        <input type="number" id="omr_thangdiem" value="${conf.thangDiem}" step="1" style="width: 80px; padding: 5px; font-weight: bold; text-align: center; border: 2px solid #0056b3; border-radius: 4px;">
                    </div>

                    <table style="width: 100%; border-collapse: collapse;">
                        <tr style="background: #e9ecef; text-align: center;">
                            <th style="padding: 8px; border: 1px solid #ccc;">Loại câu</th>
                            <th style="padding: 8px; border: 1px solid #ccc;">Số lượng câu</th>
                            <th style="padding: 8px; border: 1px solid #ccc;">Trọng số</th>
                            <th style="padding: 8px; border: 1px solid #ccc; color: #dc3545;">Điểm / 1 câu</th>
                        </tr>
                        <tr>
                            <td style="padding: 8px; border: 1px solid #ccc; font-weight: bold;">TN (Nhiều lựa chọn)</td>
                            <td style="padding: 8px; border: 1px solid #ccc; text-align: center;"><input type="number" id="omr_cau_tn" value="${conf.soCauTN}" style="width: 50px; text-align: center;"></td>
                            <td style="padding: 8px; border: 1px solid #ccc; text-align: center;"><input type="number" id="omr_ts_tn" value="${conf.tsTN}" step="0.1" style="width: 50px; text-align: center;"></td>
                            <td style="padding: 8px; border: 1px solid #ccc; text-align: center; font-weight: bold; color: #dc3545;" id="omr_out_tn">-- đ</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; border: 1px solid #ccc; font-weight: bold;">ĐS (Đúng/Sai)</td>
                            <td style="padding: 8px; border: 1px solid #ccc; text-align: center;"><input type="number" id="omr_cau_ds" value="${conf.soCauDS}" style="width: 50px; text-align: center;"></td>
                            <td style="padding: 8px; border: 1px solid #ccc; text-align: center;"><input type="number" id="omr_ts_ds" value="${conf.tsDS}" step="0.1" style="width: 50px; text-align: center;"></td>
                            <td style="padding: 8px; border: 1px solid #ccc; text-align: center; font-weight: bold; color: #dc3545;" id="omr_out_ds">-- đ</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; border: 1px solid #ccc; font-weight: bold;">TLN (Trả lời ngắn)</td>
                            <td style="padding: 8px; border: 1px solid #ccc; text-align: center;"><input type="number" id="omr_cau_tln" value="${conf.soCauTLN}" style="width: 50px; text-align: center;"></td>
                            <td style="padding: 8px; border: 1px solid #ccc; text-align: center;"><input type="number" id="omr_ts_tln" value="${conf.tsTLN}" step="0.1" style="width: 50px; text-align: center;"></td>
                            <td style="padding: 8px; border: 1px solid #ccc; text-align: center; font-weight: bold; color: #dc3545;" id="omr_out_tln">-- đ</td>
                        </tr>
                    </table>
                </div>

                <div style="background: #e6f2ff; padding: 15px; border-radius: 6px; border: 1px solid #b8daff;">
                    <b style="color: #0056b3;">Chi tiết tính điểm câu Đúng/Sai (Tối đa <span id="omr_out_ds_max" style="color:red;">--</span> đ/câu):</b>
                    <ul style="margin-top: 8px; margin-bottom: 0; padding-left: 20px; line-height: 1.8;">
                        <li>Đúng 1 ý (sai 3): <input type="number" id="omr_ds_1y" value="${conf.diemDS_1y}" step="0.05" style="width: 60px; text-align: center;"> điểm</li>
                        <li>Đúng 2 ý (sai 2): <input type="number" id="omr_ds_2y" value="${conf.diemDS_2y}" step="0.05" style="width: 60px; text-align: center;"> điểm</li>
                        <li>Đúng 3 ý (sai 1): <input type="number" id="omr_ds_3y" value="${conf.diemDS_3y}" step="0.05" style="width: 60px; text-align: center;"> điểm</li>
                        <li>Đúng 4 ý (tuyệt đối): <b style="color:red;" id="omr_out_ds_full">-- đ</b> (Auto tính theo trọng số)</li>
                    </ul>
                </div>
            </div>
        `,
        width: '600px',
        showCancelButton: true,
        confirmButtonText: '💾 OK - LƯU THIẾT LẬP',
        cancelButtonText: 'Hủy',
        confirmButtonColor: '#28a745',
        didOpen: () => {
            const getVal = id => parseFloat(document.getElementById(id).value) || 0;

            // Hàm tự động tính toán lại Điểm/câu mỗi khi gõ
            const calcScores = () => {
                let td = getVal('omr_thangdiem');
                let tongTrongSo = (getVal('omr_cau_tn') * getVal('omr_ts_tn')) +
                    (getVal('omr_cau_ds') * getVal('omr_ts_ds')) +
                    (getVal('omr_cau_tln') * getVal('omr_ts_tln'));

                let diem1Phan = tongTrongSo > 0 ? (td / tongTrongSo) : 0;

                let diemTN = getVal('omr_ts_tn') * diem1Phan;
                let diemDS = getVal('omr_ts_ds') * diem1Phan;
                let diemTLN = getVal('omr_ts_tln') * diem1Phan;

                document.getElementById('omr_out_tn').innerText = diemTN.toFixed(2);
                document.getElementById('omr_out_ds').innerText = diemDS.toFixed(2);
                document.getElementById('omr_out_tln').innerText = diemTLN.toFixed(2);

                document.getElementById('omr_out_ds_max').innerText = diemDS.toFixed(2);
                document.getElementById('omr_out_ds_full').innerText = diemDS.toFixed(2) + ' điểm';
            };

            // Hàm bật/tắt khả năng chỉnh sửa dựa trên Radio Button
            const toggleMode = (isDefault) => {
                if (isDefault) {
                    document.getElementById('omr_thangdiem').value = 10;
                    document.getElementById('omr_cau_tn').value = 12; document.getElementById('omr_ts_tn').value = 1;
                    document.getElementById('omr_cau_ds').value = 4; document.getElementById('omr_ts_ds').value = 4;
                    document.getElementById('omr_cau_tln').value = 6; document.getElementById('omr_ts_tln').value = 2;
                    document.getElementById('omr_ds_1y').value = 0.1;
                    document.getElementById('omr_ds_2y').value = 0.25;
                    document.getElementById('omr_ds_3y').value = 0.5;
                }

                const ids = ['omr_thangdiem', 'omr_cau_tn', 'omr_ts_tn', 'omr_cau_ds', 'omr_ts_ds', 'omr_cau_tln', 'omr_ts_tln', 'omr_ds_1y', 'omr_ds_2y', 'omr_ds_3y'];
                ids.forEach(id => {
                    document.getElementById(id).disabled = isDefault;
                    document.getElementById(id).style.background = isDefault ? '#e9ecef' : '#fff';
                });
                calcScores();
            };

            // Gắn sự kiện lắng nghe
            document.querySelectorAll('input[name="omr_chedo"]').forEach(radio => {
                radio.addEventListener('change', (e) => toggleMode(e.target.value === 'mac_dinh'));
            });

            const idsListen = ['omr_thangdiem', 'omr_cau_tn', 'omr_ts_tn', 'omr_cau_ds', 'omr_ts_ds', 'omr_cau_tln', 'omr_ts_tln'];
            idsListen.forEach(id => document.getElementById(id).addEventListener('input', calcScores));

            // Khởi tạo trạng thái ban đầu khi mở popup
            document.querySelector(`input[name="omr_chedo"][value="${conf.cheDo}"]`).checked = true;
            toggleMode(conf.cheDo === 'mac_dinh');
        },
        preConfirm: () => {
            // Lấy dữ liệu lưu vào biến toàn cục khi bấm OK
            window.DataOMR_CauHinh = {
                cheDo: document.querySelector('input[name="omr_chedo"]:checked').value,
                thangDiem: parseFloat(document.getElementById('omr_thangdiem').value),
                soCauTN: parseFloat(document.getElementById('omr_cau_tn').value),
                tsTN: parseFloat(document.getElementById('omr_ts_tn').value),
                soCauDS: parseFloat(document.getElementById('omr_cau_ds').value),
                tsDS: parseFloat(document.getElementById('omr_ts_ds').value),
                soCauTLN: parseFloat(document.getElementById('omr_cau_tln').value),
                tsTLN: parseFloat(document.getElementById('omr_ts_tln').value),
                diemDS_1y: parseFloat(document.getElementById('omr_ds_1y').value),
                diemDS_2y: parseFloat(document.getElementById('omr_ds_2y').value),
                diemDS_3y: parseFloat(document.getElementById('omr_ds_3y').value)
            };
            return true;
        }
    }).then((res) => {
        if (res.isConfirmed) {
            Swal.fire({
                title: 'Đã lưu cài đặt!',
                text: 'Hệ thống sẽ dùng cấu hình này để tính điểm.',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false
            });
        }
    });
};
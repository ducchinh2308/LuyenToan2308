// =====================================================================
// KHỐI 24: GIAO DIỆN CHÍNH MÁY QUÉT TRẮC NGHIỆM (OPENCV.JS OMR)
// =====================================================================

// 🌟 BIẾN TOÀN CỤC: LƯU TRỮ CẤU HÌNH OMR
window.DataOMR_CauHinh = window.DataOMR_CauHinh || {
    mauPhieu: 'bgd2025_toan',
    cheDo: 'mac_dinh',
    thangDiem: 10,
    soCauTN: 12, tsTN: 1,
    soCauDS: 4, tsDS: 4,
    soCauTLN: 6, tsTLN: 2,
    diemDS_1y: 0.1, diemDS_2y: 0.25, diemDS_3y: 0.5,
    nguonDapAn: 'nhap_tay',
    chuoiDapAn: ''
};

// =====================================================================
// HÀM 24.1: TẢI DỮ LIỆU & GỌI GIAO DIỆN CHÍNH
// =====================================================================
window.ham_24_1_mo_tien_ich_cham_omr = async function () {
    Swal.fire({ title: '⏳ Đang khởi động Máy quét OMR...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

    try {
        const { data: dsTN, error } = await _supabase.from('nhiem_vu_trac_nghiem')
            .select('ma_nhiem_vu, ten_nhiem_vu, ngay_tao')
            .order('ngay_tao', { ascending: false })
            .limit(20);

        if (error) throw error;

        Swal.close(); // Đóng popup loading
        ham_24_2_render_giao_dien_toan_man_hinh(dsTN || []);

    } catch (err) {
        Swal.fire('Lỗi', 'Không tải được danh sách nhiệm vụ: ' + err.message, 'error');
    }
};

// =====================================================================
// HÀM 24.2: VẼ GIAO DIỆN TOÀN MÀN HÌNH (2 CỘT: CÀI ĐẶT & CAMERA)
// =====================================================================
window.ham_24_2_render_giao_dien_toan_man_hinh = function (dsTN) {
    let conf = window.DataOMR_CauHinh;

    // 1. Tạo Options cho danh sách bài kiểm tra
    let optionsHTML = '<option value="BAI_NGOAI" style="font-weight:bold; color:red;">📝 [ CHẤM BÀI NGOÀI - KHÔNG LƯU ĐIỂM ]</option>';
    dsTN.forEach(nv => {
        optionsHTML += `<option value="${nv.ma_nhiem_vu}">Lớp: ${nv.ten_nhiem_vu} (Mã: ${nv.ma_nhiem_vu})</option>`;
    });

    // 2. Tạo hoặc làm sạch Container toàn màn hình
    let omrContainer = document.getElementById('giao_dien_omr_toan_man_hinh');
    if (!omrContainer) {
        omrContainer = document.createElement('div');
        omrContainer.id = 'giao_dien_omr_toan_man_hinh';
        // Ép CSS tràn viền, đè lên mọi thứ (như một trang web mới)
        omrContainer.style.cssText = "position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: #f0f2f5; z-index: 9999; display: flex; flex-direction: column; overflow: hidden;";
        document.body.appendChild(omrContainer);
    }
    omrContainer.style.display = 'flex';

    // 3. Đổ mã HTML cấu trúc 2 cột
    omrContainer.innerHTML = `
        <!-- HEADER -->
        <div style="background: #0070C0; color: white; padding: 12px 20px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1); z-index: 10;">
            <div style="font-size: 18px; font-weight: bold; display: flex; align-items: center; gap: 10px;">
                <span style="font-size: 24px;">📷</span> HỆ THỐNG MÁY QUÉT TRẮC NGHIỆM OMR
            </div>
            <button onclick="ham_24_4_dong_giao_dien()" style="background: #dc3545; color: white; border: none; padding: 6px 15px; border-radius: 4px; font-weight: bold; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#c82333'" onmouseout="this.style.background='#dc3545'">
                ❌ THOÁT MÁY QUÉT
            </button>
        </div>

        <!-- BODY (2 CỘT) -->
        <div style="flex: 1; display: flex; overflow: hidden;">
            
            <!-- CỘT TRÁI: CÀI ĐẶT CẤU HÌNH -->
            <div style="width: 450px; background: white; border-right: 1px solid #ccc; padding: 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 15px; box-shadow: 2px 0 5px rgba(0,0,0,0.05);">
                
                <!-- BƯỚC 1 & 2 -->
                <div style="background: #fff8e1; padding: 15px; border-radius: 8px; border: 1px solid #ffeeba;">
                    <label style="font-weight: bold; color: #d35400; display: block; margin-bottom: 5px;">1. Chọn bài kiểm tra:</label>
                    <select id="omr_chon_nhiem_vu" style="width: 100%; padding: 8px; border-radius: 4px; border: 1px solid #fd7e14; font-weight: bold; margin-bottom: 12px; color:#d35400; font-size:14px;">
                        ${optionsHTML}
                    </select>

                    <label style="font-weight: bold; color: #0056b3; display: block; margin-bottom: 5px;">2. Mẫu phiếu sử dụng:</label>
                    <select id="omr_mau_phieu" style="width: 100%; padding: 8px; border-radius: 4px; border: 1px solid #0056b3; font-weight: bold; font-size:14px;">
                        <option value="bgd2025_toan" ${conf.mauPhieu === 'bgd2025_toan' ? 'selected' : ''}>Mẫu BGD 2025 (Toán/Lý/Hóa)</option>
                        <option value="bgd2025_van" ${conf.mauPhieu === 'bgd2025_van' ? 'selected' : ''}>Mẫu BGD 2025 (Sử/Địa/GDCD)</option>
                        <option value="truyenthong_50" ${conf.mauPhieu === 'truyenthong_50' ? 'selected' : ''}>Mẫu Truyền thống - 50 Câu TN</option>
                    </select>
                </div>

                <!-- BƯỚC 3: ĐÁP ÁN -->
                <div style="background: #e6f2ff; padding: 15px; border-radius: 8px; border: 1px solid #b8daff;">
                    <label style="font-weight: bold; color: #0056b3; display: block; margin-bottom: 10px;">3. Nguồn Đáp Án (Key):</label>
                    <div style="display: flex; gap: 20px; margin-bottom: 10px;">
                        <label style="cursor: pointer; font-weight: bold; color: #0056b3;">
                            <input type="radio" name="omr_nguon_dapan" value="nhap_tay" ${conf.nguonDapAn === 'nhap_tay' ? 'checked' : ''}> ⌨️ Nhập tay
                        </label>
                        <label style="cursor: pointer; font-weight: bold; color: #28a745;">
                            <input type="radio" name="omr_nguon_dapan" value="quet_phieu" ${conf.nguonDapAn === 'quet_phieu' ? 'checked' : ''}> 📸 Quét Phiếu Key
                        </label>
                    </div>
                    
                    <div id="khu_vuc_nhap_tay_dapan" style="display: ${conf.nguonDapAn === 'nhap_tay' ? 'block' : 'none'};">
                        <textarea id="omr_dapan_text" rows="3" placeholder="Nhập chuỗi đáp án. VD: 1A 2B 3C..." style="width: 100%; padding: 8px; border: 1px solid #0056b3; border-radius: 4px; box-sizing: border-box; font-family: monospace;">${conf.chuoiDapAn}</textarea>
                        <button style="margin-top: 6px; padding: 6px 12px; font-size: 12px; background: #17a2b8; color: white; border: none; border-radius: 4px; font-weight:bold; cursor:pointer; width:100%;">
                            📊 Mở bảng nhập liệu ĐS & TLN chi tiết
                        </button>
                    </div>
                </div>

                <!-- BƯỚC 4: THANG ĐIỂM & TRỌNG SỐ -->
                <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border: 1px solid #dee2e6;">
                    <label style="font-weight: bold; color: #28a745; display: block; margin-bottom: 10px;">4. Thiết lập Điểm & Trọng số:</label>
                    
                    <div style="display: flex; gap: 15px; margin-bottom: 12px; padding-bottom: 10px; border-bottom: 1px solid #ccc;">
                        <label style="cursor: pointer; font-weight: bold; color: #28a745; font-size:13px;">
                            <input type="radio" name="omr_chedo" value="mac_dinh" ${conf.cheDo === 'mac_dinh' ? 'checked' : ''}> 🔒 Mặc định
                        </label>
                        <label style="cursor: pointer; font-weight: bold; color: #d35400; font-size:13px;">
                            <input type="radio" name="omr_chedo" value="chinh_sua" ${conf.cheDo === 'chinh_sua' ? 'checked' : ''}> ✏️ Tùy chỉnh
                        </label>
                        <div style="margin-left: auto; display:flex; align-items:center; gap:5px;">
                            <b style="font-size: 12px;">Tổng:</b>
                            <input type="number" id="omr_thangdiem" value="${conf.thangDiem}" style="width: 50px; padding: 2px; font-weight: bold; text-align: center; border: 1px solid #0056b3;">
                        </div>
                    </div>

                    <table style="width: 100%; border-collapse: collapse; margin-bottom: 10px; font-size: 12px;">
                        <tr style="background: #e9ecef; text-align: center;">
                            <th style="padding: 4px; border: 1px solid #ccc;">Loại</th>
                            <th style="padding: 4px; border: 1px solid #ccc;">Số câu</th>
                            <th style="padding: 4px; border: 1px solid #ccc;">Hệ số</th>
                            <th style="padding: 4px; border: 1px solid #ccc; color: #dc3545;">Điểm/câu</th>
                        </tr>
                        <tr>
                            <td style="padding: 4px; border: 1px solid #ccc; font-weight: bold;">TN</td>
                            <td style="padding: 4px; border: 1px solid #ccc; text-align: center;"><input type="number" id="omr_cau_tn" value="${conf.soCauTN}" style="width: 40px; text-align: center;"></td>
                            <td style="padding: 4px; border: 1px solid #ccc; text-align: center;"><input type="number" id="omr_ts_tn" value="${conf.tsTN}" step="0.1" style="width: 40px; text-align: center;"></td>
                            <td style="padding: 4px; border: 1px solid #ccc; text-align: center; font-weight: bold; color: #dc3545;" id="omr_out_tn">--</td>
                        </tr>
                        <tr>
                            <td style="padding: 4px; border: 1px solid #ccc; font-weight: bold;">ĐS</td>
                            <td style="padding: 4px; border: 1px solid #ccc; text-align: center;"><input type="number" id="omr_cau_ds" value="${conf.soCauDS}" style="width: 40px; text-align: center;"></td>
                            <td style="padding: 4px; border: 1px solid #ccc; text-align: center;"><input type="number" id="omr_ts_ds" value="${conf.tsDS}" step="0.1" style="width: 40px; text-align: center;"></td>
                            <td style="padding: 4px; border: 1px solid #ccc; text-align: center; font-weight: bold; color: #dc3545;" id="omr_out_ds">--</td>
                        </tr>
                        <tr>
                            <td style="padding: 4px; border: 1px solid #ccc; font-weight: bold;">TLN</td>
                            <td style="padding: 4px; border: 1px solid #ccc; text-align: center;"><input type="number" id="omr_cau_tln" value="${conf.soCauTLN}" style="width: 40px; text-align: center;"></td>
                            <td style="padding: 4px; border: 1px solid #ccc; text-align: center;"><input type="number" id="omr_ts_tln" value="${conf.tsTLN}" step="0.1" style="width: 40px; text-align: center;"></td>
                            <td style="padding: 4px; border: 1px solid #ccc; text-align: center; font-weight: bold; color: #dc3545;" id="omr_out_tln">--</td>
                        </tr>
                    </table>

                    <div style="background: #e6f2ff; padding: 8px; border-radius: 6px; border: 1px solid #b8daff; font-size: 12px;">
                        <b style="color: #0056b3;">Luật chấm câu Đúng/Sai (Max <span id="omr_out_ds_max" style="color:red;">--</span>):</b>
                        <ul style="margin-top: 5px; margin-bottom: 0; padding-left: 20px;">
                            <li>Đúng 1 ý (sai 3): <input type="number" id="omr_ds_1y" value="${conf.diemDS_1y}" step="0.05" style="width: 40px; text-align: center;"> đ</li>
                            <li>Đúng 2 ý (sai 2): <input type="number" id="omr_ds_2y" value="${conf.diemDS_2y}" step="0.05" style="width: 40px; text-align: center;"> đ</li>
                            <li>Đúng 3 ý (sai 1): <input type="number" id="omr_ds_3y" value="${conf.diemDS_3y}" step="0.05" style="width: 40px; text-align: center;"> đ</li>
                        </ul>
                    </div>
                </div>
                
                <div style="margin-top: auto; padding-top: 10px;">
                    <button onclick="ham_24_5_luu_cau_hinh()" style="width:100%; padding: 10px; background: #28a745; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
                        💾 LƯU CẤU HÌNH BÀI
                    </button>
                </div>
            </div>

            <!-- CỘT PHẢI: GIAO DIỆN MÁY ẢNH (CAMERA) -->
            <div style="flex: 1; padding: 20px; display: flex; flex-direction: column; background: #343a40; position: relative;">
                
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                    <h3 style="color: white; margin: 0; font-size: 18px;">🔴 KÍNH NGẮM CAMERA</h3>
                    <div id="omr_camera_status" style="background: #ffc107; color: #333; padding: 4px 12px; border-radius: 20px; font-size: 13px; font-weight: bold;">
                        Đang chờ bật ống kính...
                    </div>
                </div>

                <!-- Khu vực Video -->
                <div style="flex: 1; background: #000; border-radius: 12px; position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; box-shadow: inset 0 0 30px rgba(0,0,0,0.8); border: 2px solid #555;">
                    <span style="color: white; font-weight: bold; z-index: 2; opacity: 0.5;">[ LUỒNG VIDEO CAMERA SẼ HIỂN THỊ TẠI ĐÂY ]</span>
                    
                    <!-- Khung viền ngắm (Viewfinder) -->
                    <div style="position: absolute; top: 8%; left: 15%; right: 15%; bottom: 8%; border: 2px dashed rgba(40, 167, 69, 0.8); z-index: 3;">
                        <div style="position:absolute; top:-2px; left:-2px; width:30px; height:30px; border-top: 5px solid #28a745; border-left: 5px solid #28a745;"></div>
                        <div style="position:absolute; top:-2px; right:-2px; width:30px; height:30px; border-top: 5px solid #28a745; border-right: 5px solid #28a745;"></div>
                        <div style="position:absolute; bottom:-2px; left:-2px; width:30px; height:30px; border-bottom: 5px solid #28a745; border-left: 5px solid #28a745;"></div>
                        <div style="position:absolute; bottom:-2px; right:-2px; width:30px; height:30px; border-bottom: 5px solid #28a745; border-right: 5px solid #28a745;"></div>
                    </div>
                </div>

                <!-- Action Bar -->
                <div style="margin-top: 20px; display: flex; gap: 15px;">
                    <button id="btn_quet_omr_chinh" style="flex: 1; padding: 15px; background: #dc3545; color: white; border: none; border-radius: 8px; font-weight: bold; font-size: 18px; cursor: pointer; box-shadow: 0 4px 6px rgba(0,0,0,0.3); transition: 0.2s;" onmouseover="this.style.background='#c82333'" onmouseout="this.style.background='#dc3545'">
                        📸 CHỤP QUÉT BÀI NGAY
                    </button>
                    <button style="padding: 15px 25px; background: #6c757d; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">
                        🔄 Bật / Tắt Flash
                    </button>
                </div>
            </div>

        </div>
    `;

    // 4. Kích hoạt toàn bộ sự kiện tính toán sau khi vẽ DOM
    ham_24_3_gan_su_kien_cai_dat();
};

// =====================================================================
// HÀM 24.3: GẮN SỰ KIỆN LẮNG NGHE CHO PANEL CÀI ĐẶT BÊN TRÁI
// =====================================================================
window.ham_24_3_gan_su_kien_cai_dat = function () {
    const getVal = id => parseFloat(document.getElementById(id).value) || 0;

    // 1. Chuyển đổi Nguồn Đáp Án
    document.querySelectorAll('input[name="omr_nguon_dapan"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            let isQuet = (e.target.value === 'quet_phieu');
            document.getElementById('khu_vuc_nhap_tay_dapan').style.display = isQuet ? 'none' : 'block';

            // Đổi màu và text nút bấm bên phải
            let btnChinh = document.getElementById('btn_quet_omr_chinh');
            if (isQuet) {
                btnChinh.innerHTML = '🔑 QUÉT LẤY ĐÁP ÁN (KEY)';
                btnChinh.style.background = '#fd7e14';
            } else {
                btnChinh.innerHTML = '📸 CHỤP QUÉT BÀI NGAY';
                btnChinh.style.background = '#dc3545';
            }
        });
    });

    // 2. Thuật toán tự động tính điểm từ Trọng số
    const calcScores = () => {
        let td = getVal('omr_thangdiem');
        let tongTrongSo = (getVal('omr_cau_tn') * getVal('omr_ts_tn')) +
            (getVal('omr_cau_ds') * getVal('omr_ts_ds')) +
            (getVal('omr_cau_tln') * getVal('omr_ts_tln'));

        let diem1Phan = tongTrongSo > 0 ? (td / tongTrongSo) : 0;

        document.getElementById('omr_out_tn').innerText = (getVal('omr_ts_tn') * diem1Phan).toFixed(2);
        document.getElementById('omr_out_ds').innerText = (getVal('omr_ts_ds') * diem1Phan).toFixed(2);
        document.getElementById('omr_out_tln').innerText = (getVal('omr_ts_tln') * diem1Phan).toFixed(2);
        document.getElementById('omr_out_ds_max').innerText = (getVal('omr_ts_ds') * diem1Phan).toFixed(2);
    };

    // 3. Khóa/Mở ô nhập tùy theo Mode
    const toggleMode = (isDefault) => {
        if (isDefault) {
            let mau = document.getElementById('omr_mau_phieu').value;
            document.getElementById('omr_thangdiem').value = 10;
            document.getElementById('omr_ts_tn').value = 1; document.getElementById('omr_ts_ds').value = 4; document.getElementById('omr_ts_tln').value = 2;
            document.getElementById('omr_ds_1y').value = 0.1; document.getElementById('omr_ds_2y').value = 0.25; document.getElementById('omr_ds_3y').value = 0.5;

            if (mau === 'bgd2025_toan') {
                document.getElementById('omr_cau_tn').value = 12; document.getElementById('omr_cau_ds').value = 4; document.getElementById('omr_cau_tln').value = 6;
            } else if (mau === 'bgd2025_van') {
                document.getElementById('omr_cau_tn').value = 24; document.getElementById('omr_cau_ds').value = 4; document.getElementById('omr_cau_tln').value = 0;
            } else {
                document.getElementById('omr_cau_tn').value = 50; document.getElementById('omr_cau_ds').value = 0; document.getElementById('omr_cau_tln').value = 0;
            }
        }

        const ids = ['omr_thangdiem', 'omr_cau_tn', 'omr_ts_tn', 'omr_cau_ds', 'omr_ts_ds', 'omr_cau_tln', 'omr_ts_tln', 'omr_ds_1y', 'omr_ds_2y', 'omr_ds_3y'];
        ids.forEach(id => {
            document.getElementById(id).disabled = isDefault;
            document.getElementById(id).style.background = isDefault ? '#e9ecef' : '#fff';
        });
        calcScores();
    };

    // Lắng nghe đổi Mẫu phiếu -> Reset tự động
    document.getElementById('omr_mau_phieu').addEventListener('change', () => {
        if (document.querySelector('input[name="omr_chedo"]:checked').value === 'mac_dinh') toggleMode(true);
    });

    // Lắng nghe đổi Mode (Mặc định / Chỉnh sửa)
    document.querySelectorAll('input[name="omr_chedo"]').forEach(radio => {
        radio.addEventListener('change', (e) => toggleMode(e.target.value === 'mac_dinh'));
    });

    // Lắng nghe gõ phím -> Tính điểm real-time
    const idsListen = ['omr_thangdiem', 'omr_cau_tn', 'omr_ts_tn', 'omr_cau_ds', 'omr_ts_ds', 'omr_cau_tln', 'omr_ts_tln'];
    idsListen.forEach(id => document.getElementById(id).addEventListener('input', calcScores));

    // Kích hoạt khởi tạo mặc định
    toggleMode(window.DataOMR_CauHinh.cheDo === 'mac_dinh');

    // Nếu nguồn đáp án cũ là Quét Phiếu, set lại nút
    if (window.DataOMR_CauHinh.nguonDapAn === 'quet_phieu') {
        let btnChinh = document.getElementById('btn_quet_omr_chinh');
        btnChinh.innerHTML = '🔑 QUÉT LẤY ĐÁP ÁN (KEY)';
        btnChinh.style.background = '#fd7e14';
    }
};

// =====================================================================
// HÀM 24.4: ĐÓNG GIAO DIỆN VÀ TẮT CAMERA
// =====================================================================
window.ham_24_4_dong_giao_dien = function () {
    let omrContainer = document.getElementById('giao_dien_omr_toan_man_hinh');
    if (omrContainer) {
        omrContainer.style.display = 'none';
        // (Sau này sẽ bổ sung lệnh tắt stream Camera ở đây)
    }
};

// =====================================================================
// HÀM 24.5: NÚT LƯU CẤU HÌNH THỦ CÔNG VÀO BIẾN TOÀN CỤC
// =====================================================================
window.ham_24_5_luu_cau_hinh = function () {
    window.DataOMR_CauHinh = {
        mauPhieu: document.getElementById('omr_mau_phieu').value,
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
        diemDS_3y: parseFloat(document.getElementById('omr_ds_3y').value),
        nguonDapAn: document.querySelector('input[name="omr_nguon_dapan"]:checked').value,
        chuoiDapAn: document.getElementById('omr_dapan_text').value
    };
    Swal.fire({ title: 'Đã lưu cấu hình!', icon: 'success', timer: 1200, showConfirmButton: false, toast: true, position: 'top-end' });
};
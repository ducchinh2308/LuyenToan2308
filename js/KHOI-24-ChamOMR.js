// KHỐI 24.1: GIAO DIỆN TẠO NHIỆM VỤ CHẤM OMR & BAREM ĐIỂM
// ==============================================================================

window.ham_24_1_mo_giao_dien_tao_nhiem_vu_omr = async function () {
    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
    if (!vungLamViec) return;

    vungLamViec.innerHTML = '<div style="padding:40px; text-align:center; font-weight:bold; color:#17a2b8; font-size:16px;">⏳ Đang tải danh sách lớp...</div>';

    try {
        // Lấy danh sách lớp để chọn
        const { data: dsLop, error } = await _supabase.from('lop_hoc').select('*');
        if (error) throw error;

        // Xây dựng danh sách checkbox lớp học đẹp mắt
        let htmlLop = `
            <label style="display: flex; align-items: center; gap: 10px; padding: 10px; border-radius: 6px; cursor: pointer; transition: 0.2s; background: #e8f5e9; border: 1px solid #c8e6c9; margin-bottom: 5px;" onmouseover="this.style.filter='brightness(0.95)'" onmouseout="this.style.filter='brightness(1)'">
                <input type="checkbox" class="omr-chk-lop" value="VANG_LAI" checked style="width: 18px; height: 18px; cursor: pointer; accent-color: #28a745;">
                <span style="font-weight: bold; color: #155724; font-size: 14px;">🌟 Khách / Chấm Vãng Lai (Tự do)</span>
            </label>
        `;
        if (dsLop) {
            dsLop.forEach(l => {
                htmlLop += `
                    <label style="display: flex; align-items: center; gap: 10px; padding: 8px 10px; border-radius: 6px; cursor: pointer; transition: 0.2s; border: 1px solid transparent;" onmouseover="this.style.background='#f1f8ff'; this.style.borderColor='#b8daff';" onmouseout="this.style.background='transparent'; this.style.borderColor='transparent';">
                        <input type="checkbox" class="omr-chk-lop" value="${l.ma_lop || l.id}" style="width: 16px; height: 16px; cursor: pointer; accent-color: #0056b3;">
                        <span style="color: #495057; font-weight: bold; font-size: 13px;">Lớp: ${l.ten_lop || l.ten}</span>
                    </label>
                `;
            });
        }

        vungLamViec.innerHTML = `
            <div style="padding: 10px; animation: fadeIn 0.3s ease-in-out;">
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #17a2b8; padding-bottom: 12px; margin-bottom: 20px;">
                    <h3 style="color: #0056b3; margin: 0; text-transform: uppercase; display: flex; align-items: center; gap: 10px; font-size: 22px;">
                        📝 BƯỚC 1: TẠO BÀI THI & CẤU HÌNH ĐIỂM
                    </h3>
                    <button onclick="ham_3_1_ve_dashboard_admin()" style="padding: 8px 18px; background: #6c757d; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: 0.2s;" onmouseover="this.style.background='#5a6268'" onmouseout="this.style.background='#6c757d'">⬅️ Quay lại</button>
                </div>

                <div style="display: flex; gap: 25px; flex-wrap: wrap;">
                    
                    <!-- CỘT 1: THÔNG TIN CƠ BẢN (TONE XANH DƯƠNG) -->
                    <div style="flex: 1; min-width: 350px; background: #f8fbff; padding: 25px; border-radius: 12px; border: 1px solid #b8daff; box-shadow: 0 4px 10px rgba(0,86,179,0.05);">
                        <h4 style="margin: 0 0 20px 0; color: #0056b3; font-size: 18px; border-bottom: 1px dashed #b8daff; padding-bottom: 10px;">📋 1. Thông tin chung</h4>
                        
                        <label style="font-weight: bold; font-size: 13px; color: #004085; display: block; margin-bottom: 6px;">Tên bài thi:</label>
                        <input type="text" id="omr_ten_nhiem_vu" placeholder="VD: Thi thử THPT QG Lần 1 - Môn Toán" style="width: 100%; padding: 12px; border: 1px solid #80bdff; border-radius: 6px; box-sizing: border-box; margin-bottom: 20px; font-weight: bold; color: #0056b3; outline: none; background: #fff; box-shadow: inset 0 1px 3px rgba(0,0,0,0.02);">

                        <label style="font-weight: bold; font-size: 13px; color: #004085; display: block; margin-bottom: 6px;">Lớp áp dụng (Tích chọn một hoặc nhiều):</label>
                        <div style="width: 100%; height: 180px; overflow-y: auto; padding: 10px; border: 1px solid #80bdff; border-radius: 6px; box-sizing: border-box; margin-bottom: 20px; background: #fff; box-shadow: inset 0 1px 3px rgba(0,0,0,0.02);">
                            ${htmlLop}
                        </div>

                        <!-- KHU VỰC CHỌN MẪU PHIẾU (TONE MÀU TEAL/LỤC LAM) -->
                        <div style="background: #e0f2f1; padding: 18px; border-radius: 8px; border: 1px solid #80cbc4; margin-bottom: 20px;">
                            <label style="font-weight: bold; font-size: 13px; color: #00695c; display: block; margin-bottom: 8px;">📄 Mẫu phiếu OMR (Quy định lưới quét):</label>
                            <select id="omr_mau_phieu" style="width: 100%; padding: 12px; border: 1px solid #4db6ac; border-radius: 6px; font-weight: bold; color: #00796b; outline: none; background: #fff;" onchange="window.ham_24_1a_update_mau_phieu(this.value)">
                                <option value="bgd2025" data-img="/assets/phieu-chinh.png" data-pdf="/assets/phieu-chinh.pdf">✅ Mẫu chuẩn BGD 2025 (40-8-6)</option>
                                <option value="tnmaker40" data-img="/assets/tnmaker-40.png" data-pdf="/assets/tnmaker-40.pdf">✅ Mẫu ngang TNMaker (40 câu)</option>
                                <option value="phutho" data-img="/assets/phu-tho.jpg" data-pdf="/assets/phu-tho.pdf">✅ Mẫu thi HSG Phú Thọ (50-10-12)</option>
                            </select>
                            
                            <div style="display: flex; gap: 10px; margin-top: 15px;">
                                <button type="button" onclick="window.ham_24_1c_xem_mau_phieu()" style="flex: 1; padding: 10px; background: #ffffff; color: #00796b; border: 1px solid #00796b; border-radius: 6px; font-weight: bold; font-size: 13px; cursor: pointer; transition: 0.2s; display: flex; align-items: center; justify-content: center; gap: 5px;" onmouseover="this.style.background='#b2dfdb'" onmouseout="this.style.background='#ffffff'">
                                    👀 Xem phôi
                                </button>
                                <button type="button" onclick="window.ham_24_1d_tai_mau_phieu()" style="flex: 1; padding: 10px; background: #00897b; color: white; border: none; border-radius: 6px; font-weight: bold; font-size: 13px; cursor: pointer; transition: 0.2s; display: flex; align-items: center; justify-content: center; gap: 5px; box-shadow: 0 2px 4px rgba(0,105,92,0.2);" onmouseover="this.style.background='#00695c'" onmouseout="this.style.background='#00897b'">
                                    ⬇️ Tải file In
                                </button>
                            </div>
                            
                            <div style="text-align: center; margin-top: 10px;">
                                <span onclick="window.ham_24_1e_them_mau_phieu_moi()" style="color: #d35400; font-size: 12px; font-weight: bold; text-decoration: underline; cursor: pointer;">➕ Thêm/Cấu hình mẫu phiếu khác?</span>
                            </div>
                        </div>

                        <label style="font-weight: bold; font-size: 13px; color: #004085; display: block; margin-bottom: 6px;">Danh sách Mã đề (Cách nhau bởi dấu phẩy):</label>
                        <input type="text" id="omr_ma_de" value="101, 102, 103, 104" placeholder="VD: 101, 102, 103, 104" style="width: 100%; padding: 12px; border: 1px solid #80bdff; border-radius: 6px; box-sizing: border-box; font-weight: bold; color: #d35400; outline: none; background: #fff;">
                    </div>

                    <!-- CỘT 2: CẤU TRÚC ĐIỂM (TONE MÀU NÓNG + PHONG PHÚ) -->
                    <div style="flex: 1; min-width: 350px; background: #fffdf5; padding: 25px; border-radius: 12px; border: 1px solid #ffeeba; box-shadow: 0 4px 10px rgba(133,100,4,0.05);">
                        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px dashed #ffeeba; padding-bottom: 10px; margin-bottom: 20px;">
                            <h4 style="margin: 0; color: #d35400; font-size: 18px;">🎯 2. Cấu trúc & Barem điểm</h4>
                            <button type="button" onclick="window.ham_24_1b_tu_dong_chia_diem()" style="padding: 6px 12px; background: #ffc107; color: #856404; border: 1px solid #ffeeba; border-radius: 6px; font-weight: bold; font-size: 12px; cursor: pointer; transition: 0.2s; box-shadow: 0 2px 4px rgba(0,0,0,0.05);" onmouseover="this.style.background='#ffb300'" onmouseout="this.style.background='#ffc107'">
                                ⚖️ Tự động chia hệ 10
                            </button>
                        </div>
                        
                        <!-- PHẦN I (MÀU XANH LÁ) -->
                        <fieldset style="border: 2px solid #c3e6cb; border-radius: 8px; padding: 18px; margin-bottom: 18px; background: #f1fbf4;">
                            <legend style="font-weight: bold; color: #155724; padding: 0 10px; background: #c3e6cb; border-radius: 4px; font-size: 13px;">Phần I (Trắc nghiệm 4 lựa chọn)</legend>
                            <div style="display: flex; gap: 15px;">
                                <div style="flex: 1;">
                                    <label style="font-size: 12px; color: #155724; font-weight: bold; margin-bottom: 5px; display: block;">Số câu:</label>
                                    <input type="number" id="omr_p1_so_cau" value="12" style="width: 100%; padding: 10px; border: 1px solid #28a745; border-radius: 6px; outline: none; color: #155724; font-weight: bold; background:#fff;" oninput="window.ham_24_1b_tu_dong_chia_diem()">
                                </div>
                                <div style="flex: 1;">
                                    <label style="font-size: 12px; color: #155724; font-weight: bold; margin-bottom: 5px; display: block;">Điểm/câu:</label>
                                    <input type="number" id="omr_p1_diem" value="0.25" step="0.01" style="width: 100%; padding: 10px; border: 1px solid #28a745; border-radius: 6px; outline: none; color: #155724; font-weight: bold; background:#fff;">
                                </div>
                            </div>
                        </fieldset>

                        <!-- PHẦN II (MÀU TÍM) -->
                        <fieldset id="fs_p2" style="border: 2px solid #d8b6ff; border-radius: 8px; padding: 18px; margin-bottom: 18px; background: #faf5ff;">
                            <legend style="font-weight: bold; color: #4a148c; padding: 0 10px; background: #e1c4ff; border-radius: 4px; font-size: 13px;">Phần II (Câu hỏi Đúng / Sai)</legend>
                            <div style="margin-bottom: 15px;">
                                <label style="font-size: 12px; color: #4a148c; font-weight: bold; margin-bottom: 5px; display: block;">Số câu (Mỗi câu có 4 ý a,b,c,d):</label>
                                <input type="number" id="omr_p2_so_cau" value="4" style="width: 100%; padding: 10px; border: 1px solid #9c27b0; border-radius: 6px; outline: none; color: #4a148c; font-weight: bold; background:#fff;" oninput="window.ham_24_1b_tu_dong_chia_diem()">
                            </div>
                            <label style="font-size: 11px; color: #7b1fa2; font-style: italic; display: block; margin-bottom: 8px;">Điểm số tích lũy cho từng ý đúng:</label>
                            <div style="display: flex; gap: 8px;">
                                <div style="flex: 1; text-align: center;"><label style="font-size: 11px; color: #4a148c; font-weight: bold; display: block; margin-bottom:4px;">1 ý</label><input type="number" id="omr_p2_d1" value="0.1" step="0.01" style="width: 100%; padding: 8px; border: 1px solid #ce93d8; border-radius: 4px; outline: none; font-size:13px; font-weight:bold; color:#6a1b9a; text-align:center; box-sizing:border-box;"></div>
                                <div style="flex: 1; text-align: center;"><label style="font-size: 11px; color: #4a148c; font-weight: bold; display: block; margin-bottom:4px;">2 ý</label><input type="number" id="omr_p2_d2" value="0.25" step="0.01" style="width: 100%; padding: 8px; border: 1px solid #ce93d8; border-radius: 4px; outline: none; font-size:13px; font-weight:bold; color:#6a1b9a; text-align:center; box-sizing:border-box;"></div>
                                <div style="flex: 1; text-align: center;"><label style="font-size: 11px; color: #4a148c; font-weight: bold; display: block; margin-bottom:4px;">3 ý</label><input type="number" id="omr_p2_d3" value="0.5" step="0.01" style="width: 100%; padding: 8px; border: 1px solid #ce93d8; border-radius: 4px; outline: none; font-size:13px; font-weight:bold; color:#6a1b9a; text-align:center; box-sizing:border-box;"></div>
                                <div style="flex: 1; text-align: center;"><label style="font-size: 11px; color: #4a148c; font-weight: bold; display: block; margin-bottom:4px;">4 ý (Max)</label><input type="number" id="omr_p2_d4" value="1.0" step="0.01" style="width: 100%; padding: 8px; border: 1px solid #9c27b0; border-radius: 4px; outline: none; font-size:13px; font-weight:bold; color:#4a148c; text-align:center; box-sizing:border-box; background:#f3e5f5;"></div>
                            </div>
                        </fieldset>

                        <!-- PHẦN III (MÀU HỒNG ĐỎ) -->
                        <fieldset id="fs_p3" style="border: 2px solid #ffb3ba; border-radius: 8px; padding: 18px; margin-bottom: 10px; background: #fff0f1;">
                            <legend style="font-weight: bold; color: #b30000; padding: 0 10px; background: #ffb3ba; border-radius: 4px; font-size: 13px;">Phần III (Trả lời ngắn / Điền khuyết)</legend>
                            <div style="display: flex; gap: 15px;">
                                <div style="flex: 1;">
                                    <label style="font-size: 12px; color: #b30000; font-weight: bold; margin-bottom: 5px; display: block;">Số câu:</label>
                                    <input type="number" id="omr_p3_so_cau" value="6" style="width: 100%; padding: 10px; border: 1px solid #dc3545; border-radius: 6px; outline: none; color: #b30000; font-weight: bold; background:#fff;" oninput="window.ham_24_1b_tu_dong_chia_diem()">
                                </div>
                                <div style="flex: 1;">
                                    <label style="font-size: 12px; color: #b30000; font-weight: bold; margin-bottom: 5px; display: block;">Điểm/câu:</label>
                                    <input type="number" id="omr_p3_diem" value="0.5" step="0.01" style="width: 100%; padding: 10px; border: 1px solid #dc3545; border-radius: 6px; outline: none; color: #b30000; font-weight: bold; background:#fff;">
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </div>

                <div style="text-align: right; margin-top: 25px; border-top: 2px solid #e9ecef; padding-top: 20px;">
                    <button type="button" onclick="window.ham_24_2_luu_nhiem_vu_omr(this)" style="padding: 16px 40px; background: linear-gradient(135deg, #28a745, #218838); color: white; border: none; border-radius: 8px; font-weight: 900; font-size: 16px; cursor: pointer; box-shadow: 0 6px 12px rgba(40,167,69,0.25); transition: 0.2s;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 15px rgba(40,167,69,0.3)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 6px 12px rgba(40,167,69,0.25)';">
                        🚀 LƯU BÀI THI & TIẾP TỤC NHẬP ĐÁP ÁN ➡️
                    </button>
                </div>
            </div>
        `;
    } catch (err) {
        vungLamViec.innerHTML = `<div style="color:red; text-align:center; padding:20px;">Lỗi tải dữ liệu lớp: ${err.message}</div>`;
    }
};

// Ẩn hiện cấu trúc theo mẫu phiếu và đổi mặc định 12-4-6
window.ham_24_1a_update_mau_phieu = function (mau) {
    let p2 = document.getElementById('fs_p2');
    let p3 = document.getElementById('fs_p3');

    if (mau === 'tnmaker40') {
        p2.style.display = 'none'; document.getElementById('omr_p2_so_cau').value = 0;
        p3.style.display = 'none'; document.getElementById('omr_p3_so_cau').value = 0;
        document.getElementById('omr_p1_so_cau').value = 40;
    } else if (mau === 'phutho') {
        p2.style.display = 'block'; document.getElementById('omr_p2_so_cau').value = 10;
        p3.style.display = 'block'; document.getElementById('omr_p3_so_cau').value = 12;
        document.getElementById('omr_p1_so_cau').value = 50;
    } else {
        // Mặc định BGD2025 (Chuẩn 12 TN, 4 ĐS, 6 TLN)
        p2.style.display = 'block'; document.getElementById('omr_p2_so_cau').value = 4;
        p3.style.display = 'block'; document.getElementById('omr_p3_so_cau').value = 6;
        document.getElementById('omr_p1_so_cau').value = 12;
    }

    // Gọi tính lại ngay khi đổi mẫu phiếu
    window.ham_24_1b_tu_dong_chia_diem();
};

// Hàm tự động tính điểm theo trọng số chuẩn về hệ 10
window.ham_24_1b_tu_dong_chia_diem = function () {
    let n1 = parseInt(document.getElementById('omr_p1_so_cau').value) || 0;
    let n2 = document.getElementById('fs_p2').style.display !== 'none' ? parseInt(document.getElementById('omr_p2_so_cau').value) || 0 : 0;
    let n3 = document.getElementById('fs_p3').style.display !== 'none' ? parseInt(document.getElementById('omr_p3_so_cau').value) || 0 : 0;

    // Trọng số chuẩn của Bộ GD cho từng loại câu (Tỉ lệ 0.25 : 1.0 : 0.5)
    const w1 = 0.25, w2 = 1.0, w3 = 0.5;

    let tongTrongSo = (n1 * w1) + (n2 * w2) + (n3 * w3);
    if (tongTrongSo === 0) return;

    // Hệ số quy đổi về thang điểm 10.0
    let heSo = 10.0 / tongTrongSo;

    // Tính điểm và làm tròn 2 chữ số thập phân
    document.getElementById('omr_p1_diem').value = +(w1 * heSo).toFixed(2);

    if (n2 > 0) {
        let max_p2 = +(w2 * heSo).toFixed(2);
        document.getElementById('omr_p2_d4').value = max_p2; // Đúng 4 ý
        document.getElementById('omr_p2_d3').value = +(max_p2 * 0.5).toFixed(2);  // Đúng 3 ý (50%)
        document.getElementById('omr_p2_d2').value = +(max_p2 * 0.25).toFixed(2); // Đúng 2 ý (25%)
        document.getElementById('omr_p2_d1').value = +(max_p2 * 0.1).toFixed(2);  // Đúng 1 ý (10%)
    }

    if (n3 > 0) {
        document.getElementById('omr_p3_diem').value = +(w3 * heSo).toFixed(2);
    }
};

// Xem mẫu phiếu
window.ham_24_1c_xem_mau_phieu = function () {
    let select = document.getElementById('omr_mau_phieu');
    let selectedOption = select.options[select.selectedIndex];
    let imgUrl = selectedOption.getAttribute('data-img');

    if (!imgUrl) {
        Swal.fire('Chưa có ảnh', 'Mẫu phiếu này chưa đính kèm ảnh phôi xem trước.', 'info');
        return;
    }

    Swal.fire({
        title: `👀 BẢN XEM TRƯỚC: ${selectedOption.text}`,
        imageUrl: imgUrl,
        imageAlt: 'Mẫu phiếu OMR',
        width: '90%',
        imageWidth: '100%',
        padding: '1em',
        confirmButtonText: 'Đóng',
        confirmButtonColor: '#6c757d'
    });
};

// Tải mẫu phiếu in
window.ham_24_1d_tai_mau_phieu = function () {
    let select = document.getElementById('omr_mau_phieu');
    let selectedOption = select.options[select.selectedIndex];
    let pdfUrl = selectedOption.getAttribute('data-pdf');

    if (!pdfUrl) {
        Swal.fire('Chưa có file PDF', 'Mẫu phiếu này chưa đính kèm tệp PDF để in. Hãy kiểm tra lại thư mục /assets/', 'warning');
        return;
    }

    window.open(pdfUrl, '_blank');
};

// Tính năng Thêm mẫu mới
window.ham_24_1e_them_mau_phieu_moi = function () {
    Swal.fire({
        title: '➕ Thêm mẫu phiếu mới',
        html: `
            <div style="font-size: 14px; text-align: justify; line-height: 1.5; color: #333;">
                Để thêm một mẫu phiếu OMR mới (định dạng lưới, toạ độ góc, vùng chứa câu hỏi) đòi hỏi việc trích xuất và quy chuẩn toạ độ <b>Markers (Mốc đen)</b> qua thuật toán Homography rất phức tạp.
                <br><br>
                Hiện tại, hệ thống hỗ trợ khai báo file JS tọa độ như <i>bgd-original-sheet.js</i> hoặc <i>tnmaker-sheet.js</i>. 
                Vui lòng liên hệ quản trị viên hoặc tích hợp thêm tệp cấu trúc lưới (Geometry Array) để tự động ánh xạ nhé!
            </div>
        `,
        icon: 'info',
        confirmButtonText: 'Đã hiểu',
        confirmButtonColor: '#00796b'
    });
};

// ==============================================================================
// KHỐI 24.2: XỬ LÝ LƯU NHIỆM VỤ VÀ TẠO MÃ ĐỀ TRỐNG
// ==============================================================================

window.ham_24_2_luu_nhiem_vu_omr = async function (btn) {
    let ten = document.getElementById('omr_ten_nhiem_vu').value.trim();
    let ma_mau_phieu = document.getElementById('omr_mau_phieu').value;
    let p1_so = parseInt(document.getElementById('omr_p1_so_cau').value) || 0;
    let p1_diem = parseFloat(document.getElementById('omr_p1_diem').value) || 0;
    let p2_so = parseInt(document.getElementById('omr_p2_so_cau').value) || 0;
    let p3_so = parseInt(document.getElementById('omr_p3_so_cau').value) || 0;
    let p3_diem = parseFloat(document.getElementById('omr_p3_diem').value) || 0;

    let d1 = parseFloat(document.getElementById('omr_p2_d1').value) || 0;
    let d2 = parseFloat(document.getElementById('omr_p2_d2').value) || 0;
    let d3 = parseFloat(document.getElementById('omr_p2_d3').value) || 0;
    let d4 = parseFloat(document.getElementById('omr_p2_d4').value) || 0;

    let checkboxes = document.querySelectorAll('.omr-chk-lop:checked');
    let arrLop = Array.from(checkboxes).map(chk => chk.value);

    let rawMaDe = document.getElementById('omr_ma_de').value.trim();

    if (!ten) { Swal.fire('Cảnh báo', 'Vui lòng nhập tên bài thi!', 'warning'); return; }
    if (!rawMaDe) { Swal.fire('Cảnh báo', 'Vui lòng nhập ít nhất 1 mã đề!', 'warning'); return; }
    if (arrLop.length === 0) { Swal.fire('Cảnh báo', 'Vui lòng chọn ít nhất 1 lớp hoặc Vãng lai!', 'warning'); return; }

    let arrMaDe = rawMaDe.split(',').map(m => m.trim()).filter(m => m);

    let cau_truc = {
        p1_so_cau: p1_so, p1_diem_moi_cau: p1_diem,
        p2_so_cau: p2_so, p2_diem_muc_do: [d1, d2, d3, d4],
        p3_so_cau: p3_so, p3_diem_moi_cau: p3_diem
    };

    const oldText = btn.innerHTML;
    btn.innerHTML = "⏳ ĐANG KHỞI TẠO BÀI THI...";
    btn.disabled = true;

    try {
        const { data: nvData, error: nvError } = await _supabase.from('omr_nhiem_vu').insert([{
            ten_nhiem_vu: ten,
            ma_mau_phieu: ma_mau_phieu,
            danh_sach_lop: arrLop,
            cau_truc_diem: cau_truc
        }]).select();

        if (nvError) throw nvError;
        let idNhiemVu = nvData[0].ma_nhiem_vu;

        let arrDapAn = arrMaDe.map(ma => ({
            ma_nhiem_vu: idNhiemVu,
            ma_de: ma,
            dap_an_p1: '-'.repeat(p1_so),
            dap_an_p2: Array(p2_so).fill('----'),
            dap_an_p3: Array(p3_so).fill('')
        }));

        const { error: daError } = await _supabase.from('omr_dap_an').insert(arrDapAn);
        if (daError) throw daError;

        Swal.fire({
            title: 'Khởi tạo thành công!',
            text: 'Đã tạo xong thông số khung. Tiếp theo chúng ta sẽ cấu hình đáp án chi tiết.',
            icon: 'success',
            confirmButtonText: 'NHẬP ĐÁP ÁN NGAY',
            confirmButtonColor: '#17a2b8'
        }).then(() => {
            window.ham_24_3_mo_giao_dien_nhap_dap_an(idNhiemVu);
        });

    } catch (error) {
        Swal.fire('Lỗi', error.message, 'error');
    } finally {
        btn.innerHTML = oldText;
        btn.disabled = false;
    }
};

// window.ham_24_3_mo_giao_dien_nhap_dap_an = async function (idNhiemVu) {

//     // 1. CHÈN CSS SIÊU GỌN (COMPACT)
//     if (!document.getElementById('omr-bubble-styles')) {
//         const style = document.createElement('style');
//         style.id = 'omr-bubble-styles';
//         style.innerHTML = `
//             .omr-card { background: #fff; border: 1px solid #17a2b8; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); overflow: hidden; }
//             .omr-card-header { background: #e0f7fa; padding: 10px 15px; border-bottom: 1px solid #b2ebf2; display: flex; justify-content: space-between; align-items: center; }
//             .omr-card-body { padding: 15px; display: flex; flex-direction: column; gap: 15px; }
            
//             /* Lưới P1: Dàn ngang siêu gọn (cứ 5-6 câu 1 hàng) */
//             .omr-p1-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(135px, 1fr)); gap: 6px; }
//             .omr-q-row { display: flex; align-items: center; gap: 4px; padding: 4px; border: 1px solid #f1f3f5; background: #fafbfc; border-radius: 4px; }
//             .omr-q-num { font-weight: bold; color: #495057; width: 22px; font-size: 13px; text-align: right; }
            
//             /* Lưới P2: Dàn ngang 4 ý a,b,c,d */
//             .omr-p2-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 10px; }
//             .omr-p2-item { border: 1px solid #e9ecef; border-radius: 6px; padding: 8px; background: #fff; }
//             .omr-p2-row { display: flex; justify-content: space-between; margin-top: 5px; }
//             .omr-p2-col { display: flex; flex-direction: column; align-items: center; gap: 4px; }
            
//             /* Lưới P3 */
//             .omr-p3-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(110px, 1fr)); gap: 10px; }
            
//             /* Bubble Thu Nhỏ (Tiết kiệm diện tích) */
//             .omr-dot-sm { width: 22px; height: 22px; border-radius: 50%; border: 1px solid #adb5bd; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: bold; color: #6c757d; cursor: pointer; user-select: none; background: #fff; }
//             .omr-dot-sm:hover { background: #e2e6ea; }
//             .omr-dot-sm.selected-p1 { background: #28a745; border-color: #28a745; color: #fff; }
//             .omr-dot-sm.selected-p2 { background: #6f42c1; border-color: #6f42c1; color: #fff; }
            
//             /* Nút Toggle Chế độ xem */
//             .omr-toggle { display: flex; border: 1px solid #17a2b8; border-radius: 4px; overflow: hidden; }
//             .omr-btn-tog { padding: 6px 12px; font-size: 13px; font-weight: bold; cursor: pointer; border: none; background: #fff; color: #17a2b8; }
//             .omr-btn-tog.active { background: #17a2b8; color: #fff; }
//         `;
//         document.head.appendChild(style);
//     }

//     const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
//     if (!vungLamViec) return;
//     vungLamViec.innerHTML = '<div style="padding:40px; text-align:center; color:#17a2b8;">⏳ Đang tải dữ liệu bài thi...</div>';

//     try {
//         const { data: nvData, error: nvErr } = await _supabase.from('omr_nhiem_vu').select('*').eq('ma_nhiem_vu', idNhiemVu).single();
//         if (nvErr) throw nvErr;
//         const { data: daData, error: daErr } = await _supabase.from('omr_dap_an').select('*').eq('ma_nhiem_vu', idNhiemVu).order('ma_de', { ascending: true });
//         if (daErr) throw daErr;

//         window.OMR_CurrentTask = nvData;
//         window.OMR_CurrentKeys = daData;
//         window.OMR_ViewMode = 'single'; // Mặc định chế độ List (Từng mã đề)
//         window.OMR_SelectedMaDe = daData.length > 0 ? daData[0].ma_de : '';

//         let htmlMaDeOptions = daData.map(da => `<option value="${da.ma_de}">Mã đề: ${da.ma_de}</option>`).join('');

//         vungLamViec.innerHTML = `
//             <div style="padding: 10px; animation: fadeIn 0.3s;">
//                 <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #17a2b8; padding-bottom: 12px; margin-bottom: 20px;">
//                     <h3 style="color: #0056b3; margin: 0;">🔑 BƯỚC 2: CẤU HÌNH ĐÁP ÁN CHI TIẾT</h3>
//                     <button onclick="ham_24_1_mo_giao_dien_tao_nhiem_vu_omr()" style="padding: 6px 15px; background: #6c757d; color: white; border: none; border-radius: 4px;">⬅️ Trở về</button>
//                 </div>

//                 <!-- THANH CÔNG CỤ TỔNG HỢP -->
//                 <div style="background: #e9ecef; padding: 15px; border-radius: 8px; margin-bottom: 20px; display: flex; gap: 20px; align-items: center; flex-wrap: wrap;">
//                     <div style="flex: 1; min-width: 250px;">
//                         <span style="font-size: 12px; color: #495057; font-weight:bold;">Chế độ hiển thị:</span>
//                         <div class="omr-toggle" style="margin-top: 4px;">
//                             <button id="btn_view_single" class="omr-btn-tog active" onclick="window.ham_24_3f_doi_che_do_xem('single')">📜 Xem 1 Mã Đề</button>
//                             <button id="btn_view_all" class="omr-btn-tog" onclick="window.ham_24_3f_doi_che_do_xem('all')">📚 Xem TẤT CẢ Mã Đề</button>
//                         </div>
//                     </div>
                    
//                     <div style="flex: 1; min-width: 200px;" id="box_chon_ma_de">
//                         <span style="font-size: 12px; color: #495057; font-weight:bold;">Chọn mã đề để sửa:</span>
//                         <select id="omr_da_chon_ma_de" style="width: 100%; padding: 6px; border: 2px solid #28a745; border-radius: 4px; font-weight: bold; color: #28a745; margin-top:4px;" onchange="window.ham_24_3g_chuyen_ma_de_single(this.value)">
//                             ${htmlMaDeOptions}
//                         </select>
//                     </div>

//                     <div style="flex: 1.5; display: flex; flex-direction: column; gap: 8px; min-width: 320px; align-items: flex-end;">
//                         <div style="display: flex; gap: 8px;">
//                             <button onclick="window.ham_24_3d_tai_excel_mau()" style="padding: 6px 12px; background: #17a2b8; color: white; border: none; border-radius: 4px; font-size:12px; font-weight:bold;">📥 Tải Excel Mẫu</button>
//                             <label style="padding: 6px 12px; background: #6f42c1; color: white; border: none; border-radius: 4px; font-size:12px; font-weight:bold; cursor: pointer; margin:0;">
//                                 📤 Nhập Excel
//                                 <input type="file" accept=".xlsx, .xls" style="display:none;" onchange="window.ham_24_3e_doc_excel_dap_an(this)">
//                             </label>
//                         </div>
//                         <div style="display: flex; gap: 8px;">
//                             <button id="btn_save_single" onclick="window.ham_24_5_luu_dap_an_vao_db(window.OMR_SelectedMaDe)" style="padding: 6px 12px; background: #28a745; color: white; border: none; border-radius: 4px; font-size:12px; font-weight:bold;">💾 Lưu Mã Đề Này</button>
//                             <button onclick="window.ham_24_5b_luu_tat_ca_dap_an()" style="padding: 6px 12px; background: #dc3545; color: white; border: none; border-radius: 4px; font-size:12px; font-weight:bold;">💾 LƯU TẤT CẢ</button>
//                         </div>
//                     </div>
//                 </div>

//                 <!-- VÙNG CHỨA CARD MÃ ĐỀ (Xếp dọc) -->
//                 <div id="omr_vung_chua_ma_de" style="min-height: 200px;"></div>
                
//             </div>
//         `;
//         window.ham_24_3h_render_toan_bo_ui();

//     } catch (err) {
//         vungLamViec.innerHTML = `<div style="color:red; text-align:center; padding:20px;">Lỗi: ${err.message}</div>`;
//     }
// };



window.ham_24_3_mo_giao_dien_nhap_dap_an = async function (idNhiemVu) {
    // 1. CHÈN CSS SIÊU GỌN VÀ CHỐNG TRÀN MÀN HÌNH MOBILE
    if (!document.getElementById('omr-bubble-styles')) {
        const style = document.createElement('style');
        style.id = 'omr-bubble-styles';
        style.innerHTML = `
            .omr-card { background: #fff; border: 1px solid #17a2b8; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); overflow: hidden; box-sizing: border-box; }
            .omr-card-header { background: #e0f7fa; padding: 10px 15px; border-bottom: 1px solid #b2ebf2; display: flex; justify-content: space-between; align-items: center; }
            .omr-card-body { padding: 15px; display: flex; flex-direction: column; gap: 15px; box-sizing: border-box; }
            
            /* Lưới P1: Dàn ngang siêu gọn */
            .omr-p1-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 6px; }
            .omr-q-row { display: flex; align-items: center; gap: 4px; padding: 4px; border: 1px solid #f1f3f5; background: #fafbfc; border-radius: 4px; }
            .omr-q-num { font-weight: bold; color: #495057; width: 22px; font-size: 13px; text-align: right; flex-shrink: 0; }
            
            /* Lưới P2: Dàn ngang 4 ý a,b,c,d trên PC */
            .omr-p2-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 10px; }
            .omr-p2-item { border: 1px solid #e9ecef; border-radius: 6px; padding: 8px; background: #fff; box-sizing: border-box; }
            .omr-p2-row { display: flex; justify-content: space-between; margin-top: 5px; flex-wrap: wrap; gap: 8px; }
            .omr-p2-col { display: flex; flex-direction: column; align-items: center; gap: 4px; }
            
            /* Lưới P3 */
            .omr-p3-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 10px; }
            
            /* Bubble Thu Nhỏ */
            .omr-dot-sm { width: 22px; height: 22px; border-radius: 50%; border: 1px solid #adb5bd; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: bold; color: #6c757d; cursor: pointer; user-select: none; background: #fff; flex-shrink: 0; }
            .omr-dot-sm:hover { background: #e2e6ea; }
            .omr-dot-sm.selected-p1 { background: #28a745; border-color: #28a745; color: #fff; }
            .omr-dot-sm.selected-p2 { background: #6f42c1; border-color: #6f42c1; color: #fff; }
            
            .omr-toggle { display: flex; border: 1px solid #17a2b8; border-radius: 4px; overflow: hidden; flex-wrap: wrap; }
            .omr-btn-tog { padding: 6px 12px; font-size: 13px; font-weight: bold; cursor: pointer; border: none; background: #fff; color: #17a2b8; flex: 1; text-align: center; }
            .omr-btn-tog.active { background: #17a2b8; color: #fff; }

            /* MEDIA QUERY: CHỐNG TRÀN VÀ CĂN LỀ TRÊN ĐIỆN THOẠI */
            @media (max-width: 600px) {
                .omr-p2-grid { grid-template-columns: 1fr; }
                .omr-p2-row { flex-direction: column; gap: 6px; }
                .omr-p2-col { 
                    flex-direction: row; 
                    justify-content: flex-start; /* Nút dính sát vào chữ, không bị đẩy ra ngoài */
                    gap: 20px; 
                    width: 100%; 
                    border-bottom: 1px dotted #ccc; 
                    padding-bottom: 8px; 
                    align-items: center; 
                }
                .omr-p2-col:last-child { border-bottom: none; padding-bottom: 0; }
                .omr-p2-col > span { width: 25px; display: inline-block; } /* Ráp chiều ngang chuẩn cho a,b,c,d */
                
                /* Tối ưu các nút công cụ để không tràn ngang */
                .omr-btn-group-mobile { flex-direction: column; width: 100%; align-items: stretch !important; }
                .omr-btn-group-mobile > div { justify-content: space-between !important; }
            }
        `;
        document.head.appendChild(style);
    }

    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
    if (!vungLamViec) return;
    vungLamViec.innerHTML = '<div style="padding:40px; text-align:center; color:#17a2b8;">⏳ Đang tải dữ liệu bài thi...</div>';

    try {
        const { data: nvData, error: nvErr } = await _supabase.from('omr_nhiem_vu').select('*').eq('ma_nhiem_vu', idNhiemVu).single();
        if (nvErr) throw nvErr;
        const { data: daData, error: daErr } = await _supabase.from('omr_dap_an').select('*').eq('ma_nhiem_vu', idNhiemVu).order('ma_de', { ascending: true });
        if (daErr) throw daErr;

        window.OMR_CurrentTask = nvData;
        window.OMR_CurrentKeys = daData;
        window.OMR_ViewMode = 'single';
        window.OMR_SelectedMaDe = daData.length > 0 ? daData[0].ma_de : '';

        let htmlMaDeOptions = daData.map(da => `<option value="${da.ma_de}">Mã đề: ${da.ma_de}</option>`).join('');

        vungLamViec.innerHTML = `
            <div style="padding: 10px; animation: fadeIn 0.3s; max-width: 100%; overflow-x: hidden;">
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #17a2b8; padding-bottom: 12px; margin-bottom: 15px;">
                    <h3 style="color: #0056b3; margin: 0; font-size: 16px;">🔑 BƯỚC 2: CẤU HÌNH ĐÁP ÁN</h3>
                    <button onclick="ham_24_1_mo_giao_dien_tao_nhiem_vu_omr()" style="padding: 6px 10px; background: #6c757d; color: white; border: none; border-radius: 4px; font-size: 12px;">⬅️ Quay lại</button>
                </div>

                <!-- THANH CÔNG CỤ (LOẠI BỎ MIN-WIDTH CỨNG ĐỂ TƯƠNG THÍCH MOBILE) -->
                <div style="background: #e9ecef; padding: 15px; border-radius: 8px; margin-bottom: 15px; display: flex; gap: 15px; flex-wrap: wrap; width: 100%; box-sizing: border-box;">
                    
                    <div style="flex: 1; min-width: 100%;">
                        <span style="font-size: 12px; color: #495057; font-weight:bold;">Chế độ hiển thị:</span>
                        <div class="omr-toggle" style="margin-top: 4px;">
                            <button id="btn_view_single" class="omr-btn-tog active" onclick="window.ham_24_3f_doi_che_do_xem('single')">📜 Xem 1 Mã Đề</button>
                            <button id="btn_view_all" class="omr-btn-tog" onclick="window.ham_24_3f_doi_che_do_xem('all')">📚 Xem TẤT CẢ</button>
                        </div>
                    </div>
                    
                    <div style="flex: 1; min-width: 100%;" id="box_chon_ma_de">
                        <span style="font-size: 12px; color: #495057; font-weight:bold;">Chọn mã đề để sửa:</span>
                        <select id="omr_da_chon_ma_de" style="width: 100%; padding: 8px; border: 2px solid #28a745; border-radius: 4px; font-weight: bold; color: #28a745; margin-top:4px;" onchange="window.ham_24_3g_chuyen_ma_de_single(this.value)">
                            ${htmlMaDeOptions}
                        </select>
                    </div>

                    <div class="omr-btn-group-mobile" style="flex: 1; display: flex; flex-direction: column; gap: 10px; min-width: 100%;">
                        <div style="display: flex; gap: 8px; width: 100%;">
                            <button onclick="window.ham_24_3d_tai_excel_mau()" style="flex: 1; padding: 8px 5px; background: #17a2b8; color: white; border: none; border-radius: 4px; font-size:12px; font-weight:bold; white-space:nowrap;">📥 Tải Mẫu</button>
                            <label style="flex: 1; padding: 8px 5px; background: #6f42c1; color: white; border: none; border-radius: 4px; font-size:12px; font-weight:bold; cursor: pointer; margin:0; text-align:center; white-space:nowrap;">
                                📤 Nhập Excel
                                <input type="file" accept=".xlsx, .xls" style="display:none;" onchange="window.ham_24_3e_doc_excel_dap_an(this)">
                            </label>
                        </div>
                        <div style="display: flex; gap: 8px; width: 100%;">
                            <button id="btn_save_single" onclick="window.ham_24_5_luu_dap_an_vao_db(window.OMR_SelectedMaDe)" style="flex: 1; padding: 8px 5px; background: #28a745; color: white; border: none; border-radius: 4px; font-size:12px; font-weight:bold; white-space:nowrap;">💾 Lưu Mã Này</button>
                            <button onclick="window.ham_24_5b_luu_tat_ca_dap_an()" style="flex: 1; padding: 8px 5px; background: #dc3545; color: white; border: none; border-radius: 4px; font-size:12px; font-weight:bold; white-space:nowrap;">💾 LƯU TẤT CẢ</button>
                        </div>
                    </div>
                </div>

                <!-- VÙNG CHỨA CARD MÃ ĐỀ (Xếp dọc) -->
                <div id="omr_vung_chua_ma_de" style="min-height: 200px; width: 100%;"></div>
                
                <div style="text-align: center; margin-top: 25px; padding-top: 20px; border-top: 2px dashed #ccc;">
                    <button onclick="console.log('Chuyển sang Giao diện Camera...')" style="width: 100%; padding: 15px 10px; background: #fd7e14; color: white; border: none; border-radius: 8px; font-weight: 900; font-size: 15px; cursor: pointer; box-shadow: 0 4px 6px rgba(253,126,20,0.3); text-transform: uppercase;">
                        📸 VÀO MÀN HÌNH CHẤM
                    </button>
                </div>
            </div>
        `;
        window.ham_24_3h_render_toan_bo_ui();

    } catch (err) {
        vungLamViec.innerHTML = `<div style="color:red; text-align:center; padding:20px;">Lỗi: ${err.message}</div>`;
    }
};




window.ham_24_3a_render_khung_bubble = function (p1_so, p2_so, p3_so) {
    let htmlP1 = '';
    for (let i = 1; i <= p1_so; i++) {
        htmlP1 += `
            <div class="omr-q-row" id="p1_row_${i}">
                <div class="omr-q-num">${i}.</div>
                <div class="omr-dot p1-dot" data-q="${i}" data-val="A">A</div>
                <div class="omr-dot p1-dot" data-q="${i}" data-val="B">B</div>
                <div class="omr-dot p1-dot" data-q="${i}" data-val="C">C</div>
                <div class="omr-dot p1-dot" data-q="${i}" data-val="D">D</div>
            </div>
        `;
    }
    document.getElementById('omr_da_vung_p1').innerHTML = htmlP1;

    let htmlP2 = '';
    for (let i = 1; i <= p2_so; i++) {
        htmlP2 += `
            <div style="background: #fff; padding: 10px; border-radius: 6px; border: 1px solid #d8b6ff;">
                <div style="font-weight: bold; color: #4a148c; border-bottom: 1px solid #f3e5f5; padding-bottom: 5px; margin-bottom: 5px;">Câu ${i}</div>
                ${['a', 'b', 'c', 'd'].map((char, index) => `
                    <div class="omr-p2-group">
                        <b style="color: #6c757d; font-size: 13px; width:20px;">${char})</b>
                        <div style="display:flex; gap:10px;">
                            <div class="omr-dot p2-dot" data-q="${i}" data-sub="${index}" data-val="Đ">Đ</div>
                            <div class="omr-dot p2-dot" data-q="${i}" data-sub="${index}" data-val="S">S</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
    document.getElementById('omr_da_vung_p2').innerHTML = htmlP2;

    let htmlP3 = '';
    for (let i = 1; i <= p3_so; i++) {
        htmlP3 += `
            <label style="display:flex; flex-direction:column; gap:4px; font-weight:bold; font-size:12px; color:#b30000;">
                Câu ${i}:
                <input type="text" id="p3_input_${i}" placeholder="VD: -1,2" style="padding:8px; border:1px solid #ffb3ba; border-radius:4px; outline:none; text-align:center; font-weight:bold; color:#dc3545;">
            </label>
        `;
    }
    document.getElementById('omr_da_vung_p3').innerHTML = htmlP3;

    document.querySelectorAll('.p1-dot').forEach(dot => {
        dot.addEventListener('click', function () {
            let q = this.getAttribute('data-q');
            document.querySelectorAll(`.p1-dot[data-q="${q}"]`).forEach(d => d.classList.remove('selected-p1'));
            this.classList.add('selected-p1');
            window.ham_24_3c_dong_bo_nguoc_tu_bubble_ve_input();
        });
    });

    document.querySelectorAll('.p2-dot').forEach(dot => {
        dot.addEventListener('click', function () {
            let q = this.getAttribute('data-q');
            let sub = this.getAttribute('data-sub');
            document.querySelectorAll(`.p2-dot[data-q="${q}"][data-sub="${sub}"]`).forEach(d => d.classList.remove('selected-p2'));
            this.classList.add('selected-p2');
        });
    });
};

window.ham_24_3b_xu_ly_nhap_nhanh_p1 = function (chuoi, tongSoCau) {
    let cleanStr = chuoi.toUpperCase().replace(/[^ABCD]/g, '');
    for (let i = 1; i <= tongSoCau; i++) {
        let char = cleanStr[i - 1];
        document.querySelectorAll(`.p1-dot[data-q="${i}"]`).forEach(d => d.classList.remove('selected-p1'));
        if (char) {
            let targetDot = document.querySelector(`.p1-dot[data-q="${i}"][data-val="${char}"]`);
            if (targetDot) targetDot.classList.add('selected-p1');
        }
    }
};

window.ham_24_3c_dong_bo_nguoc_tu_bubble_ve_input = function () {
    let tongSoCau = window.OMR_CurrentTask.cau_truc_diem.p1_so_cau;
    let str = "";
    for (let i = 1; i <= tongSoCau; i++) {
        let selected = document.querySelector(`.p1-dot[data-q="${i}"].selected-p1`);
        str += selected ? selected.getAttribute('data-val') : "-";
    }
    document.getElementById('omr_da_nhap_nhanh').value = str.replace(/-+$/, '');
};

// ==============================================================================
// KHỐI 24.4: XỬ LÝ LOAD / LƯU DATA ĐÁP ÁN
// ==============================================================================

window.ham_24_4_load_dap_an_len_ui = function (maDe) {
    let daData = window.OMR_CurrentKeys.find(k => k.ma_de === maDe);
    if (!daData) return;

    let cauTruc = window.OMR_CurrentTask.cau_truc_diem;

    document.getElementById('omr_da_nhap_nhanh').value = daData.dap_an_p1.replace(/-/g, '');
    window.ham_24_3b_xu_ly_nhap_nhanh_p1(daData.dap_an_p1, cauTruc.p1_so_cau);

    document.querySelectorAll('.p2-dot').forEach(d => d.classList.remove('selected-p2'));
    let arrP2 = daData.dap_an_p2 || [];
    for (let i = 1; i <= cauTruc.p2_so_cau; i++) {
        let chuoi4Y = arrP2[i - 1] || "----";
        for (let sub = 0; sub < 4; sub++) {
            let char = chuoi4Y[sub];
            if (char === 'Đ' || char === 'S') {
                document.querySelector(`.p2-dot[data-q="${i}"][data-sub="${sub}"][data-val="${char}"]`)?.classList.add('selected-p2');
            }
        }
    }

    let arrP3 = daData.dap_an_p3 || [];
    for (let i = 1; i <= cauTruc.p3_so_cau; i++) {
        let input = document.getElementById(`p3_input_${i}`);
        if (input) input.value = arrP3[i - 1] || '';
    }
};

window.ham_24_5_luu_dap_an_vao_db = async function () {
    let maDe = document.getElementById('omr_da_chon_ma_de').value;
    let cauTruc = window.OMR_CurrentTask.cau_truc_diem;

    let strP1 = "";
    for (let i = 1; i <= cauTruc.p1_so_cau; i++) {
        let sel = document.querySelector(`.p1-dot[data-q="${i}"].selected-p1`);
        strP1 += sel ? sel.getAttribute('data-val') : "-";
    }

    let arrP2 = [];
    for (let i = 1; i <= cauTruc.p2_so_cau; i++) {
        let chuoi4Y = "";
        for (let sub = 0; sub < 4; sub++) {
            let sel = document.querySelector(`.p2-dot[data-q="${i}"][data-sub="${sub}"].selected-p2`);
            chuoi4Y += sel ? sel.getAttribute('data-val') : "-";
        }
        arrP2.push(chuoi4Y);
    }

    let arrP3 = [];
    for (let i = 1; i <= cauTruc.p3_so_cau; i++) {
        let val = document.getElementById(`p3_input_${i}`).value.trim();
        arrP3.push(val);
    }

    try {
        Swal.fire({ title: 'Đang lưu...', didOpen: () => Swal.showLoading() });
        const { error } = await _supabase.from('omr_dap_an')
            .update({ dap_an_p1: strP1, dap_an_p2: arrP2, dap_an_p3: arrP3 })
            .eq('ma_nhiem_vu', window.OMR_CurrentTask.ma_nhiem_vu)
            .eq('ma_de', maDe);

        if (error) throw error;

        let idx = window.OMR_CurrentKeys.findIndex(k => k.ma_de === maDe);
        if (idx !== -1) {
            window.OMR_CurrentKeys[idx].dap_an_p1 = strP1;
            window.OMR_CurrentKeys[idx].dap_an_p2 = arrP2;
            window.OMR_CurrentKeys[idx].dap_an_p3 = arrP3;
        }

        Swal.fire('Thành công!', `Đã lưu đáp án cho Mã đề ${maDe}`, 'success');
    } catch (err) {
        Swal.fire('Lỗi', err.message, 'error');
    }
};


// ==============================================================================
// KHỐI EXCEL: TẢI TEMPLATE, NHẬP ĐÁP ÁN TỰ ĐỘNG VÀ BULK SAVE
// Tải file mẫu dựa trên cấu trúc vừa tạo (Đã tích hợp Style Màu sắc & Khung viền)
window.ham_24_3d_tai_excel_mau = function () {
    if (typeof XLSX === 'undefined') {
        Swal.fire('Lỗi thư viện', 'Vui lòng chèn thẻ script của xlsx-js-style vào file HTML.', 'error');
        return;
    }

    let cauTruc = window.OMR_CurrentTask.cau_truc_diem;
    let maDeList = window.OMR_CurrentKeys.map(k => k.ma_de);

    // Cấu hình Style giống hệt file DAP-AN-NEW.xlsx của Thầy
    const border = {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } }
    };

    const headerStyle = { font: { bold: true }, alignment: { horizontal: "center", vertical: "center" }, border: border };
    const redBoldStyle = { font: { bold: true, color: { rgb: "FF0000" } }, alignment: { horizontal: "center", vertical: "center" }, border: border };
    const normalStyle = { font: { bold: false, color: { rgb: "000000" } }, alignment: { horizontal: "center", vertical: "center" }, border: border };

    let data = [];

    // Tạo Hàng Tiêu Đề
    data.push([
        { v: "Mã đề", s: headerStyle },
        { v: "Câu hỏi", s: headerStyle },
        { v: "Đáp án", s: headerStyle },
        { v: "Điểm", s: headerStyle }
    ]);

    maDeList.forEach(maDe => {
        // Gen Phần 1 (A/B/C/D)
        for (let i = 1; i <= cauTruc.p1_so_cau; i++) {
            data.push([
                { v: maDe, s: redBoldStyle },
                { v: i, t: 'n', s: redBoldStyle },
                { v: "A", s: redBoldStyle },
                { v: cauTruc.p1_diem_moi_cau, t: 'n', s: normalStyle }
            ]);
        }
        // Gen Phần 2 (Đúng/Sai)
        for (let i = 1; i <= cauTruc.p2_so_cau; i++) {
            data.push([
                { v: maDe, s: redBoldStyle },
                { v: i, t: 'n', s: redBoldStyle },
                { v: "ĐSĐS", s: redBoldStyle },
                { v: cauTruc.p2_diem_muc_do.join(" "), s: normalStyle }
            ]);
        }
        // Gen Phần 3 (Trả lời ngắn)
        for (let i = 1; i <= cauTruc.p3_so_cau; i++) {
            data.push([
                { v: maDe, s: redBoldStyle },
                { v: i, t: 'n', s: redBoldStyle },
                { v: "1,5", s: redBoldStyle },
                { v: cauTruc.p3_diem_moi_cau, t: 'n', s: normalStyle }
            ]);
        }
    });

    const ws = XLSX.utils.aoa_to_sheet(data);

    // Căn chỉnh độ rộng cột giống y hệt file Excel Thầy gửi
    ws['!cols'] = [{ wch: 10 }, { wch: 14 }, { wch: 14 }, { wch: 18 }];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "DapAn");

    // Lưu file tên chuẩn
    XLSX.writeFile(wb, `DAP-AN-MAU-${window.OMR_CurrentTask.ma_nhiem_vu.substring(0, 6).toUpperCase()}.xlsx`);
};


// Đọc file Excel người dùng tải lên, phân tích và vẽ lên UI ngay lập tức
// Đọc file Excel người dùng tải lên, phân tích và tự động chuyển sang chế độ "Xem Tất Cả"
window.ham_24_3e_doc_excel_dap_an = function (input) {
    let file = input.files[0];
    if (!file) return;

    if (typeof XLSX === 'undefined') {
        Swal.fire({ title: 'Lỗi thư viện', text: 'Vui lòng cài đặt thư viện xlsx-js-style.', icon: 'error', width: '90%' });
        return;
    }

    let reader = new FileReader();
    reader.onload = function (e) {
        try {
            let data = new Uint8Array(e.target.result);
            let wb = XLSX.read(data, { type: 'array' });
            let ws = wb.Sheets[wb.SheetNames[0]];
            let jsonData = XLSX.utils.sheet_to_json(ws);

            let cauTruc = window.OMR_CurrentTask.cau_truc_diem;
            let keysByMaDe = {};

            let currentMaDe = null;
            let p1Idx = 0, p2Idx = 0, p3Idx = 0;

            jsonData.forEach(row => {
                let maDe = String(row['Mã đề']).trim();
                let dapAn = String(row['Đáp án']).trim().toUpperCase();

                if (maDe !== currentMaDe) {
                    currentMaDe = maDe;
                    p1Idx = 0; p2Idx = 0; p3Idx = 0;
                    if (!keysByMaDe[maDe]) keysByMaDe[maDe] = { p1: "", p2: [], p3: [] };
                }

                if (p1Idx < cauTruc.p1_so_cau) {
                    keysByMaDe[maDe].p1 += (dapAn.charAt(0) || "-");
                    p1Idx++;
                } else if (p2Idx < cauTruc.p2_so_cau) {
                    let d = dapAn.replace(/D/g, 'Đ').replace(/[^ĐS]/g, '');
                    d = (d + "----").substring(0, 4);
                    keysByMaDe[maDe].p2.push(d);
                    p2Idx++;
                } else if (p3Idx < cauTruc.p3_so_cau) {
                    keysByMaDe[maDe].p3.push(dapAn);
                    p3Idx++;
                }
            });

            // Ghi đè vào bộ nhớ tạm RAM
            let numUpdated = 0;
            for (let maDe in keysByMaDe) {
                let idx = window.OMR_CurrentKeys.findIndex(k => k.ma_de === maDe);
                if (idx !== -1) {
                    window.OMR_CurrentKeys[idx].dap_an_p1 = keysByMaDe[maDe].p1;
                    window.OMR_CurrentKeys[idx].dap_an_p2 = keysByMaDe[maDe].p2;
                    window.OMR_CurrentKeys[idx].dap_an_p3 = keysByMaDe[maDe].p3;
                    numUpdated++;
                }
            }

            // TỰ ĐỘNG CHUYỂN CHẾ ĐỘ XEM SANG "TẤT CẢ" (Tránh dùng hàm đổi chế độ vì sẽ bị ghi đè nháp)
            window.OMR_ViewMode = 'all';
            document.getElementById('btn_view_single').classList.remove('active');
            document.getElementById('btn_view_all').classList.add('active');
            document.getElementById('box_chon_ma_de').style.visibility = 'hidden';
            document.getElementById('btn_save_single').style.display = 'none';

            // ÉP VẼ LẠI TOÀN BỘ GIAO DIỆN NGAY LẬP TỨC
            window.ham_24_3h_render_toan_bo_ui();

            Swal.fire({
                title: '<span style="font-size: 18px;">Tải đáp án thành công!</span>',
                html: `<div style="font-size: 13px; line-height: 1.5;">Đã nạp đáp án cho <b>${numUpdated} mã đề</b> và hiển thị <b>TẤT CẢ</b> lên màn hình.<br><br><span style="color:#dc3545; font-weight:bold;">Hãy bấm "LƯU TẤT CẢ" (Nút màu đỏ) để lưu chính thức!</span></div>`,
                icon: 'success',
                width: '90%',
                padding: '1em'
            });

        } catch (error) {
            Swal.fire({ title: 'Lỗi định dạng', text: 'Không thể đọc file: ' + error.message, icon: 'error', width: '90%' });
        }

        input.value = "";
    };
    reader.readAsArrayBuffer(file);
};






window.ham_24_3f_doi_che_do_xem = function (mode) {
    window.ham_24_3i_thu_thap_data_tu_ui_vao_ram(); // Lưu nháp UI đang sửa
    window.OMR_ViewMode = mode;
    document.getElementById('btn_view_single').classList.toggle('active', mode === 'single');
    document.getElementById('btn_view_all').classList.toggle('active', mode === 'all');
    document.getElementById('box_chon_ma_de').style.visibility = mode === 'single' ? 'visible' : 'hidden';
    document.getElementById('btn_save_single').style.display = mode === 'single' ? 'block' : 'none';
    window.ham_24_3h_render_toan_bo_ui();
};

window.ham_24_3g_chuyen_ma_de_single = function (maDe) {
    window.ham_24_3i_thu_thap_data_tu_ui_vao_ram();
    window.OMR_SelectedMaDe = maDe;
    window.ham_24_3h_render_toan_bo_ui();
};


window.ham_24_3h_render_toan_bo_ui = function () {
    let container = document.getElementById('omr_vung_chua_ma_de');
    let cauTruc = window.OMR_CurrentTask.cau_truc_diem;
    let keysToRender = window.OMR_ViewMode === 'single'
        ? window.OMR_CurrentKeys.filter(x => x.ma_de === window.OMR_SelectedMaDe)
        : window.OMR_CurrentKeys;

    let htmlAll = '';
    keysToRender.forEach(kData => {
        let maDe = kData.ma_de;

        // --- 1. PHẦN I (TRÊN CÙNG) ---
        let htmlP1 = '';
        if (cauTruc.p1_so_cau > 0) {
            let p1Dots = "";
            for (let i = 1; i <= cauTruc.p1_so_cau; i++) {
                let char = (kData.dap_an_p1 || "").charAt(i - 1) || "-";
                p1Dots += `
                    <div class="omr-q-row">
                        <div class="omr-q-num">${i}.</div>
                        <div class="omr-dot-sm p1-dot-${maDe} ${char === 'A' ? 'selected-p1' : ''}" data-made="${maDe}" data-q="${i}" data-val="A">A</div>
                        <div class="omr-dot-sm p1-dot-${maDe} ${char === 'B' ? 'selected-p1' : ''}" data-made="${maDe}" data-q="${i}" data-val="B">B</div>
                        <div class="omr-dot-sm p1-dot-${maDe} ${char === 'C' ? 'selected-p1' : ''}" data-made="${maDe}" data-q="${i}" data-val="C">C</div>
                        <div class="omr-dot-sm p1-dot-${maDe} ${char === 'D' ? 'selected-p1' : ''}" data-made="${maDe}" data-q="${i}" data-val="D">D</div>
                    </div>`;
            }
            htmlP1 = `
                <div style="background: #f8fbff; border: 1px dashed #b8daff; border-radius: 6px; padding: 10px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                        <span style="font-weight:bold; font-size:13px; color:#0056b3;">Phần I: Trắc nghiệm 4 lựa chọn</span>
                        <input type="text" id="omr_nhap_nhanh_${maDe}" value="${(kData.dap_an_p1 || '').replace(/-/g, '')}" placeholder="Nhập nhanh ABCD..." style="width: 140px; padding: 2px 6px; font-size:12px; font-weight:bold; border:1px solid #0056b3; border-radius:4px; outline:none;" oninput="window.ham_24_3b_xu_ly_nhap_nhanh_p1('${maDe}', this.value, ${cauTruc.p1_so_cau})">
                    </div>
                    <div class="omr-p1-grid">${p1Dots}</div>
                </div>`;
        }

        // --- 2. PHẦN II (Ở GIỮA) ---
        let htmlP2 = '';
        if (cauTruc.p2_so_cau > 0) {
            let p2Items = "";
            for (let i = 1; i <= cauTruc.p2_so_cau; i++) {
                let chuoi4Y = (kData.dap_an_p2 || [])[i - 1] || "----";
                let p2Rows = ['a', 'b', 'c', 'd'].map((c, idx) => {
                    let val = chuoi4Y.charAt(idx) || "-";
                    return `
                        <div class="omr-p2-col">
                            <span style="font-size:11px; font-weight:bold; color:#6c757d;">${c})</span>
                            <div style="display:flex; gap:2px;">
                                <div class="omr-dot-sm p2-dot-${maDe} ${val === 'Đ' ? 'selected-p2' : ''}" data-made="${maDe}" data-q="${i}" data-sub="${idx}" data-val="Đ">Đ</div>
                                <div class="omr-dot-sm p2-dot-${maDe} ${val === 'S' ? 'selected-p2' : ''}" data-made="${maDe}" data-q="${i}" data-sub="${idx}" data-val="S">S</div>
                            </div>
                        </div>`;
                }).join('');
                p2Items += `<div class="omr-p2-item"><div style="font-weight:bold; font-size:12px; color:#6f42c1; border-bottom:1px solid #f3e5f5; padding-bottom:4px;">Câu ${i}</div><div class="omr-p2-row">${p2Rows}</div></div>`;
            }
            htmlP2 = `
                <div style="background: #faf5ff; border: 1px dashed #d8b6ff; border-radius: 6px; padding: 10px;">
                    <div style="font-weight:bold; font-size:13px; color:#6f42c1; margin-bottom:8px;">Phần II: Đúng / Sai</div>
                    <div class="omr-p2-grid">${p2Items}</div>
                </div>`;
        }

        // --- 3. PHẦN III (DƯỚI CÙNG) ---
        let htmlP3 = '';
        if (cauTruc.p3_so_cau > 0) {
            let p3Items = "";
            for (let i = 1; i <= cauTruc.p3_so_cau; i++) {
                let val = (kData.dap_an_p3 || [])[i - 1] || "";
                p3Items += `
                    <div style="display:flex; flex-direction:column; gap:3px;">
                        <span style="font-size:11px; font-weight:bold; color:#b30000;">Câu ${i}</span>
                        <input type="text" id="p3_input_${maDe}_${i}" value="${val}" maxlength="4" oninput="window.ham_24_3k_kiem_tra_nhap_tln(this)" style="padding:4px; font-size:12px; font-weight:bold; text-align:center; color:#dc3545; border:1px solid #ffb3ba; border-radius:4px; outline:none; width:100%; box-sizing:border-box;">
                    </div>`;
            }
            htmlP3 = `
                <div style="background: #fff0f1; border: 1px dashed #ffb3ba; border-radius: 6px; padding: 10px;">
                    <div style="margin-bottom:10px;">
                        <div style="font-weight:bold; font-size:13px; color:#dc3545;">Phần III: Điền khuyết / Trả lời ngắn</div>
                        <div style="font-size:11px; font-style:italic; color:#c82333; margin-top:4px;">
                            * <b>Lưu ý:</b> Dùng dấu phẩy (,) cho số thập phân. Chỉ được nhập số, phẩy và trừ. Tối đa 4 ký tự (VD: -1,5 hoặc 0,25)
                        </div>
                    </div>
                    <div class="omr-p3-grid">${p3Items}</div>
                </div>`;
        }

        // GOM LẠI THÀNH CARD CHO MỖI MÃ ĐỀ
        htmlAll += `
            <div class="omr-card">
                <div class="omr-card-header">
                    <span style="font-weight: 900; font-size: 16px; color:#0056b3;">🔑 MÃ ĐỀ: <span style="color:#d35400;">${maDe}</span></span>
                </div>
                <div class="omr-card-body">
                    ${htmlP1}
                    ${htmlP2}
                    ${htmlP3}
                </div>
            </div>`;
    });

    container.innerHTML = htmlAll;

    // Kích hoạt sự kiện bấm chọn Bubble
    keysToRender.forEach(k => {
        let maDe = k.ma_de;
        document.querySelectorAll(`.p1-dot-${maDe}`).forEach(dot => {
            dot.addEventListener('click', function () {
                let q = this.getAttribute('data-q');
                document.querySelectorAll(`.p1-dot-${maDe}[data-q="${q}"]`).forEach(d => d.classList.remove('selected-p1'));
                this.classList.add('selected-p1');
                window.ham_24_3c_dong_bo_nguoc_tu_bubble_ve_input(maDe);
            });
        });
        document.querySelectorAll(`.p2-dot-${maDe}`).forEach(dot => {
            dot.addEventListener('click', function () {
                let q = this.getAttribute('data-q');
                let sub = this.getAttribute('data-sub');
                document.querySelectorAll(`.p2-dot-${maDe}[data-q="${q}"][data-sub="${sub}"]`).forEach(d => d.classList.remove('selected-p2'));
                this.classList.add('selected-p2');
            });
        });
    });
};



window.ham_24_3i_thu_thap_data_tu_ui_vao_ram = function () {
    let cauTruc = window.OMR_CurrentTask.cau_truc_diem;
    let keysToCollect = window.OMR_ViewMode === 'single' ? [window.OMR_SelectedMaDe] : window.OMR_CurrentKeys.map(k => k.ma_de);

    keysToCollect.forEach(maDe => {
        let idx = window.OMR_CurrentKeys.findIndex(k => k.ma_de === maDe);
        if (idx === -1) return;

        let strP1 = "";
        for (let i = 1; i <= cauTruc.p1_so_cau; i++) {
            let sel = document.querySelector(`.p1-dot-${maDe}[data-q="${i}"].selected-p1`);
            strP1 += sel ? sel.getAttribute('data-val') : "-";
        }

        let arrP2 = [];
        for (let i = 1; i <= cauTruc.p2_so_cau; i++) {
            let chuoi4Y = "";
            for (let sub = 0; sub < 4; sub++) {
                let sel = document.querySelector(`.p2-dot-${maDe}[data-q="${i}"][data-sub="${sub}"].selected-p2`);
                chuoi4Y += sel ? sel.getAttribute('data-val') : "-";
            }
            arrP2.push(chuoi4Y);
        }

        let arrP3 = [];
        for (let i = 1; i <= cauTruc.p3_so_cau; i++) {
            let inp = document.getElementById(`p3_input_${maDe}_${i}`);
            arrP3.push(inp ? inp.value.trim() : "");
        }

        window.OMR_CurrentKeys[idx].dap_an_p1 = strP1;
        window.OMR_CurrentKeys[idx].dap_an_p2 = arrP2;
        window.OMR_CurrentKeys[idx].dap_an_p3 = arrP3;
    });
};

// ==============================================================================
// KHỐI XỬ LÝ RÀNG BUỘC NHẬP LIỆU
// ==============================================================================

// Hàm kiểm tra nhập liệu Phần 3 Thời gian thực
window.ham_24_3k_kiem_tra_nhap_tln = function (inputElement) {
    let originalValue = inputElement.value;

    // 1. Tiện ích: Tự động chuyển dấu chấm (.) thành dấu phẩy (,)
    let formattedValue = originalValue.replace(/\./g, ',');

    // 2. Chỉ giữ lại số, dấu phẩy và dấu trừ
    let cleanedValue = formattedValue.replace(/[^0-9,\-]/g, '');

    // 3. Cảnh báo nếu có ký tự lạ (Chữ cái, ký hiệu đặc biệt)
    if (originalValue !== cleanedValue && originalValue.replace(/\./g, ',') !== cleanedValue) {
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'warning',
            title: 'Chỉ được nhập số, dấu trừ (-) và phẩy (,)',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true
        });
    }

    // 4. Ràng buộc logic OMR: 
    // - Dấu trừ (-) chỉ được đứng ở vị trí ĐẦU TIÊN
    if (cleanedValue.lastIndexOf('-') > 0) {
        cleanedValue = cleanedValue.replace(/-/g, function (match, offset) {
            return offset === 0 ? '-' : ''; // Nếu không phải vị trí 0 thì xóa luôn
        });
    }

    // - Dấu phẩy (,) chỉ được xuất hiện TỐI ĐA 1 LẦN
    let firstCommaIdx = cleanedValue.indexOf(',');
    if (firstCommaIdx !== -1) {
        let beforeComma = cleanedValue.substring(0, firstCommaIdx + 1);
        let afterComma = cleanedValue.substring(firstCommaIdx + 1).replace(/,/g, ''); // Xóa hết dấu phẩy ở phần đuôi
        cleanedValue = beforeComma + afterComma;
    }

    // Gán lại kết quả siêu sạch cho ô Input
    inputElement.value = cleanedValue;
};


// Hàm lưu thẳng 1 cục (Bulk Update) toàn bộ mảng OMR_CurrentKeys xuống DB
window.ham_24_5b_luu_tat_ca_dap_an = async function () {
    try {
        Swal.fire({ title: 'Đang lưu đồng loạt...', didOpen: () => Swal.showLoading() });

        // Chuẩn bị mảng data để Upsert (Bắt buộc phải có cột 'id' để Supabase biết đang Update)
        let dataToSave = window.OMR_CurrentKeys.map(k => ({
            id: k.id,
            ma_nhiem_vu: k.ma_nhiem_vu,
            ma_de: k.ma_de,
            dap_an_p1: k.dap_an_p1,
            dap_an_p2: k.dap_an_p2,
            dap_an_p3: k.dap_an_p3
        }));

        // Dùng lệnh Upsert của Supabase để Bulk Update
        const { error } = await _supabase.from('omr_dap_an').upsert(dataToSave);

        if (error) throw error;

        Swal.fire('Hoàn tất!', `Đã lưu toàn bộ đáp án của bài thi vào hệ thống thành công.`, 'success');
    } catch (err) {
        Swal.fire('Lỗi lưu Database', err.message, 'error');
    }
};



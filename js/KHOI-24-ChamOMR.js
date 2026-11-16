// ==============================================================================
// KHỐI 0: CHỈ KIỂM TRA TRẠNG THÁI OPENCV (KHÔNG TẢI LẠI ĐỂ TRÁNH LỖI INTVECTOR TWICE)
// ==============================================================================
(function kiemTraThuVienOpenCV() {
    console.log("Đang kiểm tra thư viện OpenCV từ HTML...");

    // Nếu chưa có, lập trình vòng lặp chờ 0.5s kiểm tra 1 lần
    let boDem = setInterval(function () {
        // Kiểm tra cv có tồn tại và đã khởi tạo xong Mat chưa
        if (typeof cv !== 'undefined' && typeof cv.Mat !== 'undefined') {
            clearInterval(boDem);
            console.log("✅ OpenCV đã sẵn sàng!");

            // Hiện thông báo góc phải
            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    toast: true, position: 'top-end', icon: 'success',
                    title: '✅ OpenCV nội bộ đã sẵn sàng!', showConfirmButton: false, timer: 3000
                });
            }

            // Đổi màu status trên camera (nếu đang mở)
            let status = document.getElementById('omr_camera_status');
            if (status) {
                status.innerText = "🟢 OpenCV sẵn sàng! Hãy tải ảnh lên.";
                status.style.background = "#28a745";
            }
        }
    }, 500);
})();

// KHỐI 24.1: GIAO DIỆN TẠO NHIỆM VỤ CHẤM OMR & BAREM ĐIỂM
// ==============================================================================

// ==============================================================================
// KHỐI 24.1: GIAO DIỆN TẠO NHIỆM VỤ CHẤM OMR & BAREM ĐIỂM (CÓ TÙY CHỌN MỞ BÀI CŨ)
// ==============================================================================
window.ham_24_1_mo_giao_dien_tao_nhiem_vu_omr = async function () {
    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
    if (!vungLamViec) return;

    vungLamViec.innerHTML = '<div style="padding:40px; text-align:center; font-weight:bold; color:#17a2b8; font-size:16px;">⏳ Đang tải dữ liệu...</div>';
    window.OMR_DangSuaNhiemVuId = null;

    try {
        const { data: dsLop, error: errLop } = await _supabase.from('lop_hoc').select('*');
        if (errLop) throw errLop;

        const { data: dsNhiemVu, error: errNV } = await _supabase.from('omr_nhiem_vu')
            .select('ma_nhiem_vu, ten_nhiem_vu, created_at')
            .order('created_at', { ascending: false });
        if (errNV) throw errNV;

        let htmlNhiemVuCu = '<option value="">-- Chọn một bài thi từ dữ liệu đã lưu --</option>';
        if (dsNhiemVu && dsNhiemVu.length > 0) {
            dsNhiemVu.forEach(nv => {
                let dateStr = new Date(nv.created_at).toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
                htmlNhiemVuCu += `<option value="${nv.ma_nhiem_vu}">[${dateStr}] ${nv.ten_nhiem_vu}</option>`;
            });
        }

        let htmlLop = `
            <label style="display: flex; align-items: center; gap: 10px; padding: 10px; border-radius: 6px; cursor: pointer; transition: 0.2s; background: #e8f5e9; border: 1px solid #c8e6c9; margin-bottom: 5px;">
                <input type="checkbox" class="omr-chk-lop" value="VANG_LAI" checked style="width: 18px; height: 18px; cursor: pointer; accent-color: #28a745;">
                <span style="font-weight: bold; color: #155724; font-size: 14px;">🌟 Khách / Chấm Vãng Lai (Tự do)</span>
            </label>
        `;
        if (dsLop) {
            dsLop.forEach(l => {
                htmlLop += `
                    <label style="display: flex; align-items: center; gap: 10px; padding: 8px 10px; border-radius: 6px; cursor: pointer; transition: 0.2s; border: 1px solid transparent;">
                        <input type="checkbox" class="omr-chk-lop" value="${l.ma_lop || l.id}" style="width: 16px; height: 16px; cursor: pointer; accent-color: #0056b3;">
                        <span style="color: #495057; font-weight: bold; font-size: 13px;">Lớp: ${l.ten_lop || l.ten}</span>
                    </label>
                `;
            });
        }

        vungLamViec.innerHTML = `
            <div style="padding: 10px; animation: fadeIn 0.3s ease-in-out;">
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #17a2b8; padding-bottom: 12px; margin-bottom: 20px;">
                    <h3 style="color: #0056b3; margin: 0; text-transform: uppercase; font-size: 20px;">
                        📝 QUẢN LÝ BÀI THI OMR
                    </h3>
                    <button onclick="ham_3_1_ve_dashboard_admin()" style="padding: 8px 18px; background: #6c757d; color: white; border: none; border-radius: 6px; font-weight: bold;">⬅️ Quay lại</button>
                </div>

                <!-- MENU LỰA CHỌN BAN ĐẦU (CĂN GIỮA MÀN HÌNH) -->
                <div id="omr_menu_ban_dau" style="max-width: 600px; margin: 0 auto 30px auto; background: #fff; padding: 25px; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.08); border: 1px solid #dee2e6;">
                    
                    <div style="background: #e2e3e5; padding: 20px; border-radius: 8px; border: 1px solid #d6d8db; margin-bottom: 20px;">
                        <!-- ĐƯA NÚT XÓA LÊN ĐÂY (NGANG HÀNG VỚI TIÊU ĐỀ) -->
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                            <h4 style="margin: 0; color: #343a40; font-size: 16px;">📂 MỞ BÀI THI ĐÃ LƯU:</h4>
                            <button id="omr_btn_xoa_cu" class="btn btn-danger" style="display: none; background-color: #dc3545; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 12px; padding: 6px 12px; box-shadow: 0 2px 4px rgba(220,53,69,0.3);" onclick="window.ham_xoa_bai_thi(document.getElementById('omr_chon_nhiem_vu_cu').value)">
                                🗑️ Xóa bài thi
                            </button>
                        </div>

                        <select id="omr_chon_nhiem_vu_cu" onchange="window.ham_24_1h_hien_thi_nut_chuc_nang(this.value)" style="width: 100%; padding: 12px; border-radius: 6px; border: 1px solid #adb5bd; font-weight: bold; color: #495057; outline: none; font-size: 14px; box-sizing: border-box;">
                            ${htmlNhiemVuCu}
                        </select>
                        
                        <!-- CỤM 3 NÚT CHÍNH (Đã bỏ nút xóa) -->
                        <div id="omr_hanh_dong_bai_cu" style="display: none; margin-top: 15px; gap: 10px; flex-wrap: wrap; border-top: 1px dashed #adb5bd; padding-top: 15px;">
                            <button onclick="window.ham_24_1g_load_nhiem_vu_len_form()" style="padding: 10px; background: #007bff; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; flex: 1; font-size: 13px;">📝 Sửa B.1 (Cấu hình)</button>
                            <button onclick="window.ham_24_1f_mo_nhiem_vu_cu('b2')" style="padding: 10px; background: #6f42c1; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; flex: 1; font-size: 13px;">🔑 Sửa B.2 (Đáp án)</button>
                            <button onclick="window.ham_24_1f_mo_nhiem_vu_cu('b3')" style="padding: 10px; background: #fd7e14; color: white; border: none; border-radius: 6px; font-weight: 900; cursor: pointer; flex: 1; font-size: 13px;">📸 Tới B.3 (Chấm)</button>
                        </div>
                    </div>

                    <div style="text-align: center; margin-bottom: 20px; position: relative;">
                        <hr style="border: 0; border-top: 2px dashed #adb5bd;">
                        <span style="position: absolute; top: -10px; left: 50%; transform: translateX(-50%); background: #fff; padding: 0 15px; color: #6c757d; font-weight: 900; font-size: 13px;">HOẶC</span>
                    </div>

                    <button onclick="window.ham_24_1i_hien_form_tao_moi()" style="width: 100%; padding: 15px; background: #28a745; color: white; border: none; border-radius: 8px; font-weight: 900; font-size: 16px; cursor: pointer; box-shadow: 0 4px 6px rgba(40,167,69,0.2);">
                        ➕ TẠO MỚI BÀI THI
                    </button>
                </div>

                <!-- KHU VỰC FORM BƯỚC 1 (MẶC ĐỊNH BỊ ẨN, CHỈ HIỆN KHI BẤM NÚT) -->
                <div id="khu_vuc_form_b1_container" style="display: none; flex-direction: column; gap: 20px;">
                    <div style="text-align: center; position: relative; margin-bottom: 10px;">
                        <hr style="border: 0; border-top: 2px dashed #adb5bd;">
                        <span id="txt_trang_thai_form" style="position: absolute; top: -10px; left: 50%; transform: translateX(-50%); background: #f6f5f9; padding: 0 15px; color: #28a745; font-weight: 900; font-size: 13px;">ĐANG TẠO MỚI BÀI THI (BƯỚC 1)</span>
                    </div>

                    <div style="display: flex; gap: 25px; flex-wrap: wrap;">
                        <!-- CỘT 1: THÔNG TIN CƠ BẢN -->
                        <div style="flex: 1; min-width: 350px; background: #f8fbff; padding: 25px; border-radius: 12px; border: 1px solid #b8daff; box-shadow: 0 4px 10px rgba(0,86,179,0.05);">
                            <h4 style="margin: 0 0 20px 0; color: #0056b3; font-size: 18px; border-bottom: 1px dashed #b8daff; padding-bottom: 10px;">📋 1. Thông tin chung</h4>
                            
                            <label style="font-weight: bold; font-size: 13px; color: #004085; display: block; margin-bottom: 6px;">Tên bài thi:</label>
                            <input type="text" id="omr_ten_nhiem_vu" placeholder="VD: Thi thử THPT QG Lần 1" style="width: 100%; padding: 12px; border: 1px solid #80bdff; border-radius: 6px; box-sizing: border-box; margin-bottom: 20px; font-weight: bold; color: #0056b3; outline: none; background: #fff;">

                            <label style="font-weight: bold; font-size: 13px; color: #004085; display: block; margin-bottom: 6px;">Lớp áp dụng (Tích chọn một hoặc nhiều):</label>
                            <div style="width: 100%; height: 180px; overflow-y: auto; padding: 10px; border: 1px solid #80bdff; border-radius: 6px; box-sizing: border-box; margin-bottom: 20px; background: #fff;">
                                ${htmlLop}
                            </div>

                            <div style="background: #e0f2f1; padding: 18px; border-radius: 8px; border: 1px solid #80cbc4; margin-bottom: 20px;">
                                <label style="font-weight: bold; font-size: 13px; color: #00695c; display: block; margin-bottom: 8px;">📄 Mẫu phiếu OMR (Quy định lưới quét):</label>
                                <select id="omr_mau_phieu" style="width: 100%; padding: 12px; border: 1px solid #4db6ac; border-radius: 6px; font-weight: bold; color: #00796b; outline: none; background: #fff;" onchange="window.ham_24_1a_update_mau_phieu(this.value)">
                                    <option value="bgd2025" data-img="/assets/phieu-chinh.png" data-pdf="/assets/phieu-chinh.pdf">✅ Mẫu chuẩn BGD 2025 (40-8-6)</option>
                                    <option value="tnmaker40" data-img="/assets/tnmaker-40.png" data-pdf="/assets/tnmaker-40.pdf">✅ Mẫu ngang TNMaker (40 câu)</option>
                                    <option value="phutho" data-img="/assets/phu-tho.jpg" data-pdf="/assets/phu-tho.pdf">✅ Mẫu thi HSG Phú Thọ (50-10-12)</option>
                                </select>
                            </div>

                            <label style="font-weight: bold; font-size: 13px; color: #004085; display: block; margin-bottom: 6px;">Danh sách Mã đề (Cách nhau bởi dấu phẩy):</label>
                            <input type="text" id="omr_ma_de" value="101, 102, 103, 104" placeholder="VD: 101, 102, 103, 104" style="width: 100%; padding: 12px; border: 1px solid #80bdff; border-radius: 6px; box-sizing: border-box; font-weight: bold; color: #d35400; outline: none; background: #fff;">
                        </div>

                        <!-- CỘT 2: CẤU TRÚC ĐIỂM -->
                        <div style="flex: 1; min-width: 350px; background: #fffdf5; padding: 25px; border-radius: 12px; border: 1px solid #ffeeba; box-shadow: 0 4px 10px rgba(133,100,4,0.05);">
                            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px dashed #ffeeba; padding-bottom: 10px; margin-bottom: 20px;">
                                <h4 style="margin: 0; color: #d35400; font-size: 18px;">🎯 2. Cấu trúc & Barem điểm</h4>
                                <button type="button" onclick="window.ham_24_1b_tu_dong_chia_diem()" style="padding: 6px 12px; background: #ffc107; color: #856404; border: 1px solid #ffeeba; border-radius: 6px; font-weight: bold; font-size: 12px; cursor: pointer;">
                                    ⚖️ Tự động chia hệ 10
                                </button>
                            </div>
                            
                            <fieldset style="border: 2px solid #c3e6cb; border-radius: 8px; padding: 18px; margin-bottom: 18px; background: #f1fbf4;">
                                <legend style="font-weight: bold; color: #155724; padding: 0 10px; background: #c3e6cb; border-radius: 4px; font-size: 13px;">Phần I (Trắc nghiệm 4 lựa chọn)</legend>
                                <div style="display: flex; gap: 15px;">
                                    <div style="flex: 1;"><label style="font-size: 12px; color: #155724; font-weight: bold;">Số câu:</label><input type="number" id="omr_p1_so_cau" value="12" style="width: 100%; padding: 10px; border: 1px solid #28a745; border-radius: 6px; outline: none;" oninput="window.ham_24_1b_tu_dong_chia_diem()"></div>
                                    <div style="flex: 1;"><label style="font-size: 12px; color: #155724; font-weight: bold;">Điểm/câu:</label><input type="number" id="omr_p1_diem" value="0.25" step="0.01" style="width: 100%; padding: 10px; border: 1px solid #28a745; border-radius: 6px; outline: none;"></div>
                                </div>
                            </fieldset>

                            <fieldset id="fs_p2" style="border: 2px solid #d8b6ff; border-radius: 8px; padding: 18px; margin-bottom: 18px; background: #faf5ff;">
                                <legend style="font-weight: bold; color: #4a148c; padding: 0 10px; background: #e1c4ff; border-radius: 4px; font-size: 13px;">Phần II (Câu hỏi Đúng / Sai)</legend>
                                <div style="margin-bottom: 15px;"><label style="font-size: 12px; color: #4a148c; font-weight: bold;">Số câu (Mỗi câu có 4 ý a,b,c,d):</label><input type="number" id="omr_p2_so_cau" value="4" style="width: 100%; padding: 10px; border: 1px solid #9c27b0; border-radius: 6px; outline: none;" oninput="window.ham_24_1b_tu_dong_chia_diem()"></div>
                                <div style="display: flex; gap: 8px;">
                                    <div style="flex: 1; text-align: center;"><label style="font-size: 11px; font-weight: bold;">1 ý</label><input type="number" id="omr_p2_d1" value="0.1" step="0.01" style="width: 100%; padding: 8px; border: 1px solid #ce93d8; border-radius: 4px; outline: none; text-align:center;"></div>
                                    <div style="flex: 1; text-align: center;"><label style="font-size: 11px; font-weight: bold;">2 ý</label><input type="number" id="omr_p2_d2" value="0.25" step="0.01" style="width: 100%; padding: 8px; border: 1px solid #ce93d8; border-radius: 4px; outline: none; text-align:center;"></div>
                                    <div style="flex: 1; text-align: center;"><label style="font-size: 11px; font-weight: bold;">3 ý</label><input type="number" id="omr_p2_d3" value="0.5" step="0.01" style="width: 100%; padding: 8px; border: 1px solid #ce93d8; border-radius: 4px; outline: none; text-align:center;"></div>
                                    <div style="flex: 1; text-align: center;"><label style="font-size: 11px; font-weight: bold;">4 ý (Max)</label><input type="number" id="omr_p2_d4" value="1.0" step="0.01" style="width: 100%; padding: 8px; border: 1px solid #9c27b0; border-radius: 4px; outline: none; text-align:center; background:#f3e5f5;"></div>
                                </div>
                            </fieldset>

                            <fieldset id="fs_p3" style="border: 2px solid #ffb3ba; border-radius: 8px; padding: 18px; margin-bottom: 10px; background: #fff0f1;">
                                <legend style="font-weight: bold; color: #b30000; padding: 0 10px; background: #ffb3ba; border-radius: 4px; font-size: 13px;">Phần III (Trả lời ngắn / Điền khuyết)</legend>
                                <div style="display: flex; gap: 15px;">
                                    <div style="flex: 1;"><label style="font-size: 12px; color: #b30000; font-weight: bold;">Số câu:</label><input type="number" id="omr_p3_so_cau" value="6" style="width: 100%; padding: 10px; border: 1px solid #dc3545; border-radius: 6px; outline: none;" oninput="window.ham_24_1b_tu_dong_chia_diem()"></div>
                                    <div style="flex: 1;"><label style="font-size: 12px; color: #b30000; font-weight: bold;">Điểm/câu:</label><input type="number" id="omr_p3_diem" value="0.5" step="0.01" style="width: 100%; padding: 10px; border: 1px solid #dc3545; border-radius: 6px; outline: none;"></div>
                                </div>
                            </fieldset>
                        </div>
                    </div>

                    <div style="text-align: right; margin-top: 15px; border-top: 2px solid #e9ecef; padding-top: 20px;">
                        <button id="btn_luu_nhiem_vu_omr" type="button" onclick="window.ham_24_2_luu_nhiem_vu_omr(this)" style="padding: 16px 40px; background: linear-gradient(135deg, #28a745, #218838); color: white; border: none; border-radius: 8px; font-weight: 900; font-size: 16px; cursor: pointer; box-shadow: 0 6px 12px rgba(40,167,69,0.25);">
                            🚀 TẠO BÀI THI & TIẾP TỤC ĐẾN BƯỚC 2 ➡️
                        </button>
                    </div>
                </div>
            </div>
        `;

        setTimeout(() => { window.ham_24_1a_update_mau_phieu(document.getElementById('omr_mau_phieu').value); }, 100);
    } catch (err) {
        vungLamViec.innerHTML = `<div style="color:red; text-align:center; padding:20px;">Lỗi: ${err.message}</div>`;
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



// Hiện/Ẩn 3 nút hành động khi giáo viên chọn 1 bài thi cũ
// Hiện/Ẩn 3 nút hành động và nút Xóa khi giáo viên chọn 1 bài thi cũ
window.ham_24_1h_hien_thi_nut_chuc_nang = function (val) {
    let box = document.getElementById('omr_hanh_dong_bai_cu');
    let btnXoa = document.getElementById('omr_btn_xoa_cu');

    if (val) {
        box.style.display = 'flex';
        box.style.animation = 'fadeIn 0.3s';
        if (btnXoa) btnXoa.style.display = 'block';
    } else {
        box.style.display = 'none';
        if (btnXoa) btnXoa.style.display = 'none';
    }
};

// Đổ dữ liệu từ bài thi cũ lên Form B1 để Sửa
window.ham_24_1g_load_nhiem_vu_len_form = async function () {
    let idNhiemVu = document.getElementById('omr_chon_nhiem_vu_cu').value;
    if (!idNhiemVu) return;

    Swal.fire({ title: 'Đang tải cấu hình...', didOpen: () => Swal.showLoading() });
    try {
        const { data: nvData, error: nvErr } = await _supabase.from('omr_nhiem_vu').select('*').eq('ma_nhiem_vu', idNhiemVu).single();
        if (nvErr) throw nvErr;

        // Hiện form bị ẩn lên
        document.getElementById('khu_vuc_form_b1_container').style.display = 'flex';

        document.getElementById('omr_ten_nhiem_vu').value = nvData.ten_nhiem_vu;
        document.getElementById('omr_mau_phieu').value = nvData.ma_mau_phieu;

        let arrLop = nvData.danh_sach_lop || [];
        document.querySelectorAll('.omr-chk-lop').forEach(chk => {
            chk.checked = arrLop.includes(chk.value);
        });

        let cauTruc = nvData.cau_truc_diem;
        window.ham_24_1a_update_mau_phieu(nvData.ma_mau_phieu);

        setTimeout(async () => {
            document.getElementById('omr_p1_so_cau').value = cauTruc.p1_so_cau;
            document.getElementById('omr_p1_diem').value = cauTruc.p1_diem_moi_cau;
            if (cauTruc.p2_so_cau !== undefined) document.getElementById('omr_p2_so_cau').value = cauTruc.p2_so_cau;
            if (cauTruc.p2_diem_muc_do) {
                document.getElementById('omr_p2_d1').value = cauTruc.p2_diem_muc_do[0];
                document.getElementById('omr_p2_d2').value = cauTruc.p2_diem_muc_do[1];
                document.getElementById('omr_p2_d3').value = cauTruc.p2_diem_muc_do[2];
                document.getElementById('omr_p2_d4').value = cauTruc.p2_diem_muc_do[3];
            }
            if (cauTruc.p3_so_cau !== undefined) document.getElementById('omr_p3_so_cau').value = cauTruc.p3_so_cau;
            if (cauTruc.p3_diem_moi_cau !== undefined) document.getElementById('omr_p3_diem').value = cauTruc.p3_diem_moi_cau;

            const { data: daData } = await _supabase.from('omr_dap_an').select('ma_de').eq('ma_nhiem_vu', idNhiemVu).order('ma_de', { ascending: true });
            if (daData) { document.getElementById('omr_ma_de').value = daData.map(d => d.ma_de).join(', '); }

            window.OMR_DangSuaNhiemVuId = idNhiemVu;

            // Cập nhật UI báo hiệu đang sửa
            let txtTrangThai = document.getElementById('txt_trang_thai_form');
            txtTrangThai.innerText = 'ĐANG SỬA BÀI THI CŨ (BƯỚC 1)';
            txtTrangThai.style.color = '#007bff';

            let btnLuu = document.getElementById('btn_luu_nhiem_vu_omr');
            if (btnLuu) {
                btnLuu.innerHTML = '🔄 CẬP NHẬT BÀI THI NÀY ➡️';
                btnLuu.style.background = 'linear-gradient(135deg, #007bff, #0056b3)';
            }

            Swal.close();
            document.getElementById('khu_vuc_form_b1_container').scrollIntoView({ behavior: 'smooth' });
        }, 50);

    } catch (err) { Swal.fire('Lỗi', err.message, 'error'); }
};

// Chuyển hướng nhanh sang B2 hoặc B3
window.ham_24_1f_mo_nhiem_vu_cu = async function (buoc) {
    let idNhiemVu = document.getElementById('omr_chon_nhiem_vu_cu').value;
    if (!idNhiemVu) return;

    if (buoc === 'b2') {
        window.ham_24_3_mo_giao_dien_nhap_dap_an(idNhiemVu);
    } else if (buoc === 'b3') {
        Swal.fire({ title: 'Đang tải dữ liệu chấm...', didOpen: () => Swal.showLoading() });
        try {
            // Tải ngầm Data Task & Đáp án vào RAM trước khi mở Camera
            const { data: nvData, error: nvErr } = await _supabase.from('omr_nhiem_vu').select('*').eq('ma_nhiem_vu', idNhiemVu).single();
            if (nvErr) throw nvErr;
            const { data: daData, error: daErr } = await _supabase.from('omr_dap_an').select('*').eq('ma_nhiem_vu', idNhiemVu).order('ma_de', { ascending: true });
            if (daErr) throw daErr;

            window.OMR_CurrentTask = nvData;
            window.OMR_CurrentKeys = daData;
            Swal.close();
            window.ham_26_1_mo_giao_dien_cham_camera(); // Mở thẳng màn hình chấm
        } catch (err) {
            Swal.fire('Lỗi', err.message, 'error');
        }
    }
};

window.ham_24_1i_hien_form_tao_moi = function () {
    // 1. Hiển thị form B1 lên
    document.getElementById('khu_vuc_form_b1_container').style.display = 'flex';

    // 2. Trả lại trạng thái UI cho việc Tạo mới
    let txtTrangThai = document.getElementById('txt_trang_thai_form');
    txtTrangThai.innerText = 'ĐANG TẠO MỚI BÀI THI (BƯỚC 1)';
    txtTrangThai.style.color = '#28a745';

    let btnLuu = document.getElementById('btn_luu_nhiem_vu_omr');
    if (btnLuu) {
        btnLuu.innerHTML = '🚀 TẠO BÀI THI & TIẾP TỤC ĐẾN BƯỚC 2 ➡️';
        btnLuu.style.background = 'linear-gradient(135deg, #28a745, #218838)';
    }

    // 3. Xóa rỗng các trường để tạo mới
    window.OMR_DangSuaNhiemVuId = null;
    document.getElementById('omr_chon_nhiem_vu_cu').value = "";
    window.ham_24_1h_hien_thi_nut_chuc_nang(""); // Ẩn các nút thao tác bài cũ
    document.getElementById('omr_ten_nhiem_vu').value = "";
    document.getElementById('omr_ma_de').value = "101, 102, 103, 104";

    // Cuộn xuống
    document.getElementById('khu_vuc_form_b1_container').scrollIntoView({ behavior: 'smooth' });
};


// ==============================================================================
// HÀM XÓA BÀI THI KHỎI DATABASE
// ==============================================================================
window.ham_xoa_bai_thi = async function (idBaiThi) {
    if (!idBaiThi) {
        Swal.fire('Lỗi', 'Không tìm thấy mã nhiệm vụ để xóa!', 'error');
        return;
    }

    let xacNhan = await Swal.fire({
        title: 'Thầy có chắc chắn muốn xóa?',
        text: "Bài thi này và toàn bộ đáp án của nó sẽ bị xóa vĩnh viễn khỏi hệ thống!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d',
        confirmButtonText: '🗑️ Có, xóa ngay!',
        cancelButtonText: 'Hủy bỏ'
    });

    if (xacNhan.isConfirmed) {
        try {
            Swal.fire({
                title: 'Đang xóa dữ liệu...',
                allowOutsideClick: false,
                didOpen: () => { Swal.showLoading(); }
            });

            // Lệnh xóa từ bảng omr_nhiem_vu (Supabase Cascade sẽ tự động xóa đáp án liên quan nếu CSDL cấu hình đúng)
            const { error } = await _supabase
                .from('omr_nhiem_vu')
                .delete()
                .eq('ma_nhiem_vu', idBaiThi);

            if (error) throw error;

            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Đã xóa bài thi thành công!',
                showConfirmButton: false,
                timer: 2000
            });

            // Tải lại giao diện tạo bài thi để cập nhật danh sách Dropdown
            setTimeout(() => {
                window.ham_24_1_mo_giao_dien_tao_nhiem_vu_omr();
            }, 1000);

        } catch (err) {
            Swal.fire('Lỗi xóa bài thi', err.message, 'error');
            console.error("Lỗi Supabase khi xóa:", err);
        }
    }
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
    btn.innerHTML = "⏳ ĐANG LƯU BÀI THI...";
    btn.disabled = true;

    try {
        let idNhiemVu = window.OMR_DangSuaNhiemVuId;

        if (idNhiemVu) {
            // NẾU LÀ SỬA (UPDATE)
            const { error: nvError } = await _supabase.from('omr_nhiem_vu')
                .update({ ten_nhiem_vu: ten, ma_mau_phieu: ma_mau_phieu, danh_sach_lop: arrLop, cau_truc_diem: cau_truc })
                .eq('ma_nhiem_vu', idNhiemVu);
            if (nvError) throw nvError;

            // Xử lý chèn thêm mã đề nếu Giáo viên gõ thêm mã mới
            const { data: existDa } = await _supabase.from('omr_dap_an').select('ma_de').eq('ma_nhiem_vu', idNhiemVu);
            let existMaDe = existDa ? existDa.map(d => d.ma_de) : [];
            let newMaDe = arrMaDe.filter(m => !existMaDe.includes(m));

            if (newMaDe.length > 0) {
                let arrDapAnNew = newMaDe.map(ma => ({
                    ma_nhiem_vu: idNhiemVu, ma_de: ma, dap_an_p1: '-'.repeat(p1_so), dap_an_p2: Array(p2_so).fill('----'), dap_an_p3: Array(p3_so).fill('')
                }));
                await _supabase.from('omr_dap_an').insert(arrDapAnNew);
            }

            Swal.fire('Thành công', 'Đã cập nhật xong cấu hình. Chuyển sang xem Đáp án!', 'success').then(() => {
                window.ham_24_3_mo_giao_dien_nhap_dap_an(idNhiemVu);
            });

        } else {
            // NẾU LÀ TẠO MỚI (INSERT)
            const { data: nvData, error: nvError } = await _supabase.from('omr_nhiem_vu').insert([{
                ten_nhiem_vu: ten, ma_mau_phieu: ma_mau_phieu, danh_sach_lop: arrLop, cau_truc_diem: cau_truc
            }]).select();
            if (nvError) throw nvError;

            idNhiemVu = nvData[0].ma_nhiem_vu;

            let arrDapAn = arrMaDe.map(ma => ({
                ma_nhiem_vu: idNhiemVu, ma_de: ma, dap_an_p1: '-'.repeat(p1_so), dap_an_p2: Array(p2_so).fill('----'), dap_an_p3: Array(p3_so).fill('')
            }));
            const { error: daError } = await _supabase.from('omr_dap_an').insert(arrDapAn);
            if (daError) throw daError;

            Swal.fire('Khởi tạo thành công!', 'Chuyển sang Bước 2: Nhập Đáp Án.', 'success').then(() => {
                window.ham_24_3_mo_giao_dien_nhap_dap_an(idNhiemVu);
            });
        }
    } catch (error) {
        Swal.fire('Lỗi', error.message, 'error');
    } finally {
        btn.innerHTML = oldText;
        btn.disabled = false;
    }
};




window.ham_24_3_mo_giao_dien_nhap_dap_an = async function (idNhiemVu) {
    if (!document.getElementById('omr-bubble-styles')) {
        const style = document.createElement('style');
        style.id = 'omr-bubble-styles';
        style.innerHTML = `
            .omr-card { background: #fff; border: 1px solid #17a2b8; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); overflow: hidden; box-sizing: border-box; }
            .omr-card-header { background: #e0f7fa; padding: 10px 15px; border-bottom: 1px solid #b2ebf2; display: flex; justify-content: space-between; align-items: center; }
            .omr-card-body { padding: 15px; display: flex; flex-direction: column; gap: 15px; box-sizing: border-box; }
            
            .omr-p1-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 6px; }
            .omr-q-row { display: flex; align-items: center; gap: 4px; padding: 4px; border: 1px solid #f1f3f5; background: #fafbfc; border-radius: 4px; }
            .omr-q-num { font-weight: bold; color: #495057; width: 22px; font-size: 13px; text-align: right; flex-shrink: 0; }
            
            .omr-p2-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 10px; }
            .omr-p2-item { border: 1px solid #e9ecef; border-radius: 6px; padding: 8px; background: #fff; box-sizing: border-box; }
            .omr-p2-row { display: flex; justify-content: space-between; margin-top: 5px; flex-wrap: wrap; gap: 8px; }
            .omr-p2-col { display: flex; flex-direction: column; align-items: center; gap: 4px; }
            
            .omr-p3-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 10px; }
            
            .omr-dot-sm { width: 22px; height: 22px; border-radius: 50%; border: 1px solid #adb5bd; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: bold; color: #6c757d; cursor: pointer; user-select: none; background: #fff; flex-shrink: 0; }
            .omr-dot-sm:hover { background: #e2e6ea; }
            .omr-dot-sm.selected-p1 { background: #28a745; border-color: #28a745; color: #fff; }
            .omr-dot-sm.selected-p2 { background: #6f42c1; border-color: #6f42c1; color: #fff; }

            @media (max-width: 600px) {
                .omr-p2-grid { grid-template-columns: 1fr; }
                .omr-p2-row { flex-direction: column; gap: 6px; }
                .omr-p2-col { flex-direction: row; justify-content: flex-start; gap: 20px; width: 100%; border-bottom: 1px dotted #ccc; padding-bottom: 8px; align-items: center; }
                .omr-p2-col:last-child { border-bottom: none; padding-bottom: 0; }
                .omr-p2-col > span { width: 25px; display: inline-block; }
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

        vungLamViec.innerHTML = `
            <div style="padding: 10px; animation: fadeIn 0.3s; max-width: 100%; overflow-x: hidden;">
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #17a2b8; padding-bottom: 12px; margin-bottom: 15px;">
                    <h3 style="color: #0056b3; margin: 0; font-size: 16px;">🔑 BƯỚC 2: CẤU HÌNH ĐÁP ÁN CHI TIẾT</h3>
                    <button onclick="ham_24_1_mo_giao_dien_tao_nhiem_vu_omr()" style="padding: 6px 10px; background: #6c757d; color: white; border: none; border-radius: 4px; font-size: 12px;">⬅️ Quay lại</button>
                </div>

                <!-- THANH CÔNG CỤ SIÊU GỌN -->
                <div style="background: #e9ecef; padding: 15px; border-radius: 8px; margin-bottom: 15px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 15px; width: 100%; box-sizing: border-box;">
                    <div style="font-weight: bold; color: #495057; font-size: 14px;">
                        📚 ĐANG HIỂN THỊ TẤT CẢ ${daData.length} MÃ ĐỀ
                    </div>
                    <div style="display: flex; gap: 10px; flex-wrap: wrap; width: 100%; justify-content: flex-end;">
                        <button onclick="window.ham_24_3d_tai_excel_mau()" style="padding: 8px 15px; background: #17a2b8; color: white; border: none; border-radius: 4px; font-size:12px; font-weight:bold;">📥 Tải Excel Mẫu</button>
                        <label style="padding: 8px 15px; background: #6f42c1; color: white; border: none; border-radius: 4px; font-size:12px; font-weight:bold; cursor: pointer; margin:0;">
                            📤 Nhập Excel
                            <input type="file" accept=".xlsx, .xls" style="display:none;" onchange="window.ham_24_3e_doc_excel_dap_an(this)">
                        </label>
                        <button onclick="window.ham_24_5b_luu_tat_ca_dap_an()" style="padding: 8px 15px; background: #dc3545; color: white; border: none; border-radius: 4px; font-size:12px; font-weight:bold;">💾 LƯU TẤT CẢ</button>
                    </div>
                </div>

                <!-- VÙNG CHỨA CARD MÃ ĐỀ (Xếp dọc liên tục) -->
                <div id="omr_vung_chua_ma_de" style="min-height: 200px; width: 100%;"></div>
                
                <!-- BỔ SUNG CÁC NÚT DƯỚI CÙNG (LƯU VÀ CHẤM) ĐỂ TIỆN THAO TÁC -->
                <div style="display: flex; flex-direction: column; gap: 15px; text-align: center; margin-top: 25px; padding-top: 20px; border-top: 2px dashed #ccc;">
                    <button onclick="window.ham_24_5b_luu_tat_ca_dap_an()" style="width: 100%; padding: 15px 10px; background: #dc3545; color: white; border: none; border-radius: 8px; font-weight: 900; font-size: 15px; cursor: pointer; box-shadow: 0 4px 6px rgba(220,53,69,0.3); text-transform: uppercase;">
                        💾 LƯU ĐÁP ÁN TẤT CẢ CÁC MÃ ĐỀ
                    </button>
                    
                    <button onclick="window.ham_26_1_mo_giao_dien_cham_camera()" style="width: 100%; padding: 15px 10px; background: #fd7e14; color: white; border: none; border-radius: 8px; font-weight: 900; font-size: 15px; cursor: pointer; box-shadow: 0 4px 6px rgba(253,126,20,0.3); text-transform: uppercase;">
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

            // XÓA PHẦN ĐỔI CHẾ ĐỘ Ở ĐÂY VÌ MẶC ĐỊNH LUÔN LÀ "TẤT CẢ" RỒI
            window.ham_24_3h_render_toan_bo_ui();

            Swal.fire({
                title: '<span style="font-size: 18px;">Tải đáp án thành công!</span>',
                html: `<div style="font-size: 13px; line-height: 1.5;">Đã nạp đáp án cho <b>${numUpdated} mã đề</b>.<br><br><span style="color:#dc3545; font-weight:bold;">Hãy bấm "LƯU TẤT CẢ" (Nút màu đỏ) để lưu chính thức!</span></div>`,
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





window.ham_24_3h_render_toan_bo_ui = function () {
    let container = document.getElementById('omr_vung_chua_ma_de');
    let cauTruc = window.OMR_CurrentTask.cau_truc_diem;
    let keysToRender = window.OMR_CurrentKeys;

    if (keysToRender.length === 0) {
        container.innerHTML = '<div style="text-align:center; padding: 40px; background:#f8f9fa; border-radius:8px; color:#6c757d; font-style:italic;">Chưa có mã đề nào. Hãy nhập tên mã đề ở phía trên để bắt đầu!</div>';
        return;
    }

    let htmlAll = '';
    keysToRender.forEach(kData => {
        let maDe = kData.ma_de;

        // --- PHẦN I (BÊN TRÁI) ---
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
                <div style="flex: 1.5; min-width: 300px; background: #f8fbff; padding: 20px; border-radius: 8px; border: 1px solid #b8daff;">
                    <h4 style="margin: 0 0 15px 0; color: #0056b3;">Phần I (${cauTruc.p1_so_cau} câu) - A/B/C/D</h4>
                    <div style="margin-bottom: 15px;">
                        <label style="font-size: 12px; font-weight: bold; color: #dc3545;">⚡ Nhập nhanh (Paste chuỗi ABCD):</label>
                        <input type="text" id="omr_nhap_nhanh_${maDe}" value="${(kData.dap_an_p1 || '').replace(/-/g, '')}" placeholder="Nhập nhanh ABCD..." style="width: 100%; padding: 10px; border: 1px dashed #dc3545; border-radius: 6px; font-weight: bold; text-transform: uppercase; outline: none; box-sizing: border-box;" oninput="window.ham_24_3b_xu_ly_nhap_nhanh_p1('${maDe}', this.value, ${cauTruc.p1_so_cau})">
                    </div>
                    <div class="omr-p1-grid">${p1Dots}</div>
                </div>`;
        }

        // --- PHẦN II & III (BÊN PHẢI) ---
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
                <div style="background: #faf5ff; padding: 20px; border-radius: 8px; border: 1px solid #d8b6ff;">
                    <h4 style="margin: 0 0 15px 0; color: #6f42c1;">Phần II (${cauTruc.p2_so_cau} câu) - Đúng/Sai</h4>
                    <div class="omr-p2-grid">${p2Items}</div>
                </div>`;
        }

        let htmlP3 = '';
        if (cauTruc.p3_so_cau > 0) {
            let p3Items = "";
            for (let i = 1; i <= cauTruc.p3_so_cau; i++) {
                let val = (kData.dap_an_p3 || [])[i - 1] || "";
                p3Items += `
                    <label style="display:flex; flex-direction:column; gap:4px; font-weight:bold; font-size:12px; color:#b30000;">Câu ${i}:
                        <input type="text" id="p3_input_${maDe}_${i}" value="${val}" maxlength="4" oninput="window.ham_24_3k_kiem_tra_nhap_tln(this)" placeholder="VD: -1,2" style="padding:8px; border:1px solid #ffb3ba; border-radius:4px; outline:none; text-align:center; font-weight:bold; color:#dc3545; box-sizing: border-box;">
                    </label>`;
            }
            htmlP3 = `
                <div style="background: #fff0f1; padding: 20px; border-radius: 8px; border: 1px solid #ffb3ba;">
                    <h4 style="margin: 0 0 5px 0; color: #dc3545;">Phần III (${cauTruc.p3_so_cau} câu) - Điền khuyết</h4>
                    <div style="font-size:11px; font-style:italic; color:#c82333; margin-bottom: 15px;">* Dùng phẩy (,) cho thập phân.</div>
                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 10px;">${p3Items}</div>
                </div>`;
        }

        // BỔ SUNG NÚT XÓA Ở HEADER CỦA MỖI MÃ ĐỀ
        htmlAll += `
            <div class="omr-card-made" id="card_made_${maDe}">
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px dashed #17a2b8; padding-bottom: 10px; margin-bottom: 20px;">
                    <h3 style="color: #d35400; margin: 0; font-size: 20px;">🔑 MÃ ĐỀ: ${maDe}</h3>
                    <button onclick="window.ham_24_3l_xoa_ma_de('${maDe}')" style="background: #fff; color: #dc3545; border: 1px solid #dc3545; padding: 6px 12px; border-radius: 4px; font-weight: bold; font-size: 12px; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#dc3545'; this.style.color='#fff';" onmouseout="this.style.background='#fff'; this.style.color='#dc3545';">
                        🗑️ XÓA MÃ NÀY
                    </button>
                </div>
                <div class="omr-layout-2col" style="display: flex; gap: 25px; flex-wrap: wrap;">
                    ${htmlP1}
                    <div style="flex: 1; min-width: 300px; display: flex; flex-direction: column; gap: 20px;">
                        ${htmlP2}
                        ${htmlP3}
                    </div>
                </div>
            </div>`;
    });

    container.innerHTML = htmlAll;

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
    let keysToCollect = window.OMR_CurrentKeys.map(k => k.ma_de); // Luôn quét qua mọi mã đề

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

// ==============================================================================
// HÀM XÓA MÃ ĐỀ (XÓA KHỎI UI & XÓA KHỎI DB NẾU ĐÃ LƯU)
// ==============================================================================
window.ham_24_3l_xoa_ma_de = function (maDe) {
    Swal.fire({
        title: `Xóa mã đề ${maDe}?`,
        text: "Mã này sẽ bị xóa khỏi màn hình. (Nếu đã lưu, hệ thống cũng sẽ xóa nó khỏi Cơ sở dữ liệu!)",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d',
        confirmButtonText: '🗑️ Có, xóa luôn!',
        cancelButtonText: 'Hủy'
    }).then(async (result) => {
        if (result.isConfirmed) {
            // 1. Lưu nháp các mã đề khác trước khi render lại (tránh mất dữ liệu đang gõ dở)
            if (typeof window.ham_24_3i_thu_thap_data_tu_ui_vao_ram === 'function') {
                window.ham_24_3i_thu_thap_data_tu_ui_vao_ram();
            }

            let idx = window.OMR_CurrentKeys.findIndex(k => String(k.ma_de) === String(maDe));
            if (idx !== -1) {
                Swal.fire({ title: 'Đang xử lý...', didOpen: () => Swal.showLoading() });

                try {
                    // 2. Xóa khỏi DB (Lệnh này sẽ âm thầm hủy bản ghi nếu nó đã tồn tại trong DB)
                    await _supabase.from('omr_dap_an')
                        .delete()
                        .eq('ma_nhiem_vu', window.OMR_CurrentTask.ma_nhiem_vu)
                        .eq('ma_de', maDe);

                    // 3. Xóa khỏi bộ nhớ RAM
                    window.OMR_CurrentKeys.splice(idx, 1);

                    // 4. Vẽ lại giao diện
                    window.ham_24_3h_render_toan_bo_ui();

                    // Cập nhật lại số đếm ở thanh công cụ
                    let demEl = document.getElementById('txt_dem_ma_de');
                    if (demEl) demEl.innerText = window.OMR_CurrentKeys.length;

                    Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: `Đã xóa mã đề ${maDe}`, showConfirmButton: false, timer: 2000 });
                } catch (err) {
                    Swal.fire('Lỗi xóa CSDL', err.message, 'error');
                }
            }
        }
    });
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


// // ==============================================================================
// // KHỐI 24.6: GIAO DIỆN CAMERA VÀ BẢNG CHẤM ĐIỂM
// // ==============================================================================

// window.OMR_CameraFacing = 'environment'; // Mặc định dùng camera sau
// window.OMR_CameraStream = null;



// window.ham_24_6_mo_giao_dien_cham_camera = function () {
//     const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
//     if (!vungLamViec) return;

//     if (typeof window.ham_24_3i_thu_thap_data_tu_ui_vao_ram === 'function') {
//         window.ham_24_3i_thu_thap_data_tu_ui_vao_ram();
//     }

//     let task = window.OMR_CurrentTask;

//     vungLamViec.innerHTML = `
//         <div style="padding: 10px; animation: fadeIn 0.3s; max-width: 100%; overflow-x: hidden;">
//             <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #fd7e14; padding-bottom: 12px; margin-bottom: 15px;">
//                 <h3 style="color: #d35400; margin: 0; font-size: 18px;">📸 CHẤM OMR: ${task.ten_nhiem_vu}</h3>
//                 <button onclick="window.ham_24_6b_dong_camera(); window.ham_24_3_mo_giao_dien_nhap_dap_an('${task.ma_nhiem_vu}')" style="padding: 6px 12px; background: #6c757d; color: white; border: none; border-radius: 4px; font-weight:bold; font-size:12px;">⬅️ Quay lại Cấu hình</button>
//             </div>

//             <div style="display: flex; gap: 20px; flex-wrap: wrap;">
                
//                 <div style="flex: 1.5; min-width: 300px; background: #212529; border-radius: 8px; overflow: hidden; position: relative; display: flex; flex-direction: column; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
//                     <div style="position: relative; width: 100%; aspect-ratio: 3/4; background: #000; display: flex; justify-content: center; align-items: center; overflow: hidden;" id="omr_camera_container">
//                         <video id="omr_video_stream" autoplay playsinline style="position: absolute; width: 100%; height: 100%; object-fit: cover; z-index: 1;"></video>
//                         <canvas id="omr_canvas_overlay" style="position: absolute; width: 100%; height: 100%; object-fit: cover; z-index: 2; pointer-events: none;"></canvas>
//                         <canvas id="omr_canvas_hidden" style="display:none;"></canvas>
//                         <div id="omr_camera_status" style="position: absolute; top: 15px; left: 50%; transform: translateX(-50%); background: rgba(0,0,0,0.6); color: white; padding: 6px 15px; border-radius: 20px; z-index: 3; font-weight: bold; font-size: 13px; backdrop-filter: blur(4px); white-space: nowrap;">⏳ Đang khởi động Camera...</div>
//                     </div>
                    
//                     <!-- THANH ĐIỀU KHIỂN GỘP: CHUYỂN ẢNH (TRÁI) & ZOOM (PHẢI) -->
//                     <div style="display: flex; justify-content: space-between; align-items: center; background: #343a40; padding: 8px 10px; border-radius: 0;">
//                         <!-- Cụm chuyển ảnh (Mặc định ẩn) -->
//                         <div id="omr_batch_nav" style="display: none; gap: 8px; align-items: center;">
//                             <button id="btn_batch_prev" onclick="window.OMR_PrevImage()" style="padding: 4px 10px; background: #6c757d; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; transition: 0.2s;" title="Ảnh trước">⬅️</button>
//                             <span id="lbl_batch_status" style="color: #ffc107; font-weight: bold; font-size: 13px; white-space: nowrap;">Ảnh 1/1</span>
//                             <button id="btn_batch_next" onclick="window.OMR_NextImage()" style="padding: 4px 10px; background: #007bff; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; transition: 0.2s;" title="Ảnh tiếp theo">➡️</button>
                            
//                             <!-- NÚT MỚI: LẤY ĐIỂM NEO THỦ CÔNG -->
//                             <button id="btn_manual_anchor" onclick="window.OMR_StartManualPicking()" style="margin-left: 5px; padding: 4px 10px; background: #fd7e14; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; transition: 0.2s;" title="Chấm thủ công 4 góc">🎯 Lấy neo</button>
//                         </div>

//                         <!-- Cụm Zoom (Luôn dạt sang phải) -->
//                         <div style="display: flex; gap: 8px; align-items: center; margin-left: auto;">
//                             <!-- ... (Các nút zoom giữ nguyên) ... -->
//                             <button onclick="window.OMR_ZoomOut()" style="background: #495057; color: white; border: none; padding: 4px 12px; border-radius: 4px; font-weight: bold; cursor: pointer;" title="Thu nhỏ">-</button>
//                             <button onclick="window.OMR_ZoomReset()" style="background: #495057; color: white; border: none; padding: 4px 10px; border-radius: 4px; font-weight: bold; cursor: pointer;" title="Về mặc định">1:1</button>
//                             <button onclick="window.OMR_ZoomIn()" style="background: #495057; color: white; border: none; padding: 4px 12px; border-radius: 4px; font-weight: bold; cursor: pointer;" title="Phóng to">+</button>
//                             <span id="omr_zoom_label" style="color: #fff; font-size: 12px; font-family: monospace; margin-left: 5px; min-width: 35px; display: inline-block; text-align: right;">100%</span>
//                         </div>
//                     </div>
                    
//                     <!-- THANH CÔNG CỤ TẢI ẢNH -->
//                     <div style="background: #343a40; padding: 10px; display: flex; gap: 10px; justify-content: space-between; border-top: 1px solid #495057;">
//                         <button onclick="window.ham_24_6c_doi_camera()" style="flex: 1; padding: 8px; background: #495057; color: white; border: none; border-radius: 4px; font-weight: bold; font-size:12px;"><i class="fas fa-sync"></i> Đổi Camera</button>
//                         <label style="flex: 1; padding: 8px; background: #17a2b8; color: white; border: none; border-radius: 4px; font-weight: bold; font-size:12px; text-align:center; margin:0; cursor:pointer;">
//                             <i class="fas fa-images"></i> Tải nhiều ảnh
//                             <input type="file" accept="image/*" multiple style="display:none;" onchange="window.ham_24_6d_xu_ly_anh_upload(this)">
//                         </label>
//                     </div>
//                 </div>

//                 <!-- BẢNG KẾT QUẢ ĐỌC VÀ CHẤM ĐIỂM BÊN PHẢI -->
//                 <div style="flex: 1; min-width: 300px; display: flex; flex-direction: column; gap: 15px;">
//                     <div style="background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #17a2b8; box-shadow: 0 4px 6px rgba(23,162,184,0.1);">
//                         <h4 style="margin: 0 0 15px 0; color: #17a2b8; border-bottom: 1px dashed #17a2b8; padding-bottom: 8px;">📊 KẾT QUẢ NHẬN DẠNG</h4>
                        
//                         <div style="display: flex; gap: 10px; margin-bottom: 15px;">
//                             <div style="flex: 1;">
//                                 <span style="font-size: 11px; font-weight:bold; color: #6c757d;">SỐ BÁO DANH:</span>
//                                 <input type="text" id="kq_sbd" onblur="window.ham_24_9c_cap_nhat_tu_giao_dien()" style="width: 100%; padding: 8px; font-size: 18px; font-weight: 900; color: #dc3545; border: 2px solid #ffb3ba; border-radius: 6px; text-align: center; outline:none; background:#fff0f1; cursor:text;" placeholder="---">
//                             </div>
//                             <div style="flex: 1;">
//                                 <span style="font-size: 11px; font-weight:bold; color: #6c757d;">MÃ ĐỀ:</span>
//                                 <input type="text" id="kq_made" onblur="window.ham_24_9c_cap_nhat_tu_giao_dien()" style="width: 100%; padding: 8px; font-size: 18px; font-weight: 900; color: #0056b3; border: 2px solid #b8daff; border-radius: 6px; text-align: center; outline:none; background:#f8fbff; cursor:text;" placeholder="---">
//                             </div>
//                         </div>

//                         <div style="margin-bottom: 15px;">
//                             <span style="font-size: 11px; font-weight:bold; color: #6c757d;">TỔNG ĐIỂM:</span>
//                             <div id="kq_tong_diem" style="font-size: 45px; font-weight: 900; color: #28a745; text-align: center; line-height: 1; padding: 10px; background: #e8f5e9; border-radius: 8px; border: 2px solid #c8e6c9; transition: 0.3s;">
//                                 -.-
//                             </div>
//                         </div>

//                         <div style="display: flex; gap: 5px; font-size: 12px; font-weight: bold; justify-content: space-between; margin-bottom: 15px; color:#495057;">
//                             <div style="background: #f8f9fa; padding: 5px 10px; border-radius: 4px; border: 1px solid #dee2e6;">P.I: <span id="kq_diem_p1" style="color:#28a745">-</span></div>
//                             <div style="background: #f8f9fa; padding: 5px 10px; border-radius: 4px; border: 1px solid #dee2e6;">P.II: <span id="kq_diem_p2" style="color:#6f42c1">-</span></div>
//                             <div style="background: #f8f9fa; padding: 5px 10px; border-radius: 4px; border: 1px solid #dee2e6;">P.III: <span id="kq_diem_p3" style="color:#dc3545">-</span></div>
//                         </div>

//                         <div style="background: #fdfdfe; border: 1px solid #dee2e6; border-radius: 6px; padding: 10px; margin-bottom: 15px;">
//                             <div style="font-size: 11px; font-weight: bold; color: #6c757d; margin-bottom: 8px; border-bottom: 1px dashed #dee2e6; padding-bottom: 4px;">
//                                 🔍 BÀI LÀM (SỬA TRỰC TIẾP & BẤM RA NGOÀI ĐỂ TÍNH LẠI):
//                             </div>
                            
//                             <div id="kq_chitiet_p1" style="display: none; margin-bottom: 6px;">
//                                 <span style="font-size: 12px; font-weight: bold; color: #0056b3;">P.I (ABCD):</span>
//                                 <textarea id="txt_chitiet_p1" onblur="window.ham_24_9c_cap_nhat_tu_giao_dien()" rows="2" style="width: 100%; font-size: 13px; font-family: monospace; color: #0056b3; border: 1px solid #b8daff; border-radius: 4px; padding: 4px; outline: none; resize: none; box-sizing:border-box;"></textarea>
//                             </div>
                            
//                             <div id="kq_chitiet_p2" style="display: none; margin-bottom: 6px;">
//                                 <span style="font-size: 12px; font-weight: bold; color: #4a148c;">P.II (ĐSĐS):</span>
//                                 <textarea id="txt_chitiet_p2" onblur="window.ham_24_9c_cap_nhat_tu_giao_dien()" rows="2" style="width: 100%; font-size: 13px; font-family: monospace; color: #4a148c; border: 1px solid #d8b6ff; border-radius: 4px; padding: 4px; outline: none; resize: none; box-sizing:border-box;"></textarea>
//                             </div>
                            
//                             <div id="kq_chitiet_p3" style="display: none;">
//                                 <span style="font-size: 12px; font-weight: bold; color: #b30000;">P.III (Sửa trong ngoặc []):</span>
//                                 <textarea id="txt_chitiet_p3" onblur="window.ham_24_9c_cap_nhat_tu_giao_dien()" rows="2" style="width: 100%; font-size: 13px; font-family: monospace; color: #b30000; border: 1px solid #ffb3ba; border-radius: 4px; padding: 4px; outline: none; resize: none; box-sizing:border-box;"></textarea>
//                             </div>
//                         </div>

//                         <div id="kq_canh_bao" style="background: #fff3cd; color: #856404; padding: 10px; border-radius: 6px; border: 1px solid #ffeeba; font-size: 12px; font-weight: bold; display: none;">
//                             ⚠️ Cảnh báo: ...
//                         </div>
//                     </div>

//                     <button id="btn_luu_ket_qua" disabled style="padding: 15px; background: #28a745; color: white; border: none; border-radius: 8px; font-weight: 900; font-size: 16px; cursor: pointer; box-shadow: 0 4px 6px rgba(40,167,69,0.2); opacity: 0.5;">
//                         💾 LƯU BÀI NÀY
//                     </button>
//                 </div>
//             </div>
//         </div>
//     `;

//     window.ham_24_6a_khoi_dong_camera();

//     setTimeout(() => {
//         if (typeof window.ham_24_init_zoom_pan_events === 'function') {
//             window.ham_24_init_zoom_pan_events();
//         }
//     }, 200);
// };





// // ==============================================================================
// // TÍNH NĂNG ZOOM & PAN (PHÓNG TO, THU NHỎ, KÉO THẢ ẢNH PHIẾU)
// // ==============================================================================
// window.OMR_Scale = 1;
// window.OMR_PanX = 0;
// window.OMR_PanY = 0;
// window.OMR_IsDragging = false;
// window.OMR_StartX = 0;
// window.OMR_StartY = 0;

// // Khởi tạo sự kiện tương tác cho khung chứa ảnh/canvas
// window.ham_24_init_zoom_pan_events = function () {
//     let container = document.getElementById('omr_camera_container');
//     if (!container) return;

//     // Reset trạng thái
//     window.OMR_Scale = 1;
//     window.OMR_PanX = 0;
//     window.OMR_PanY = 0;
//     window.ham_24_apply_transform();

//     // 1. Sự kiện Ctrl + Lăn chuột để Zoom
//     container.onwheel = function (e) {
//         if (e.ctrlKey) {
//             e.preventDefault(); // Chặn cuộn trang web mặc định
//             let zoomFactor = 1.15;
//             if (e.deltaY < 0) {
//                 window.OMR_Scale *= zoomFactor; // Lăn lên -> Phóng to
//             } else {
//                 window.OMR_Scale /= zoomFactor; // Lăn xuống -> Thu nhỏ
//             }
//             // Giới hạn mức zoom từ 50% đến 500%
//             window.OMR_Scale = Math.max(0.5, Math.min(window.OMR_Scale, 5.0));
//             window.ham_24_apply_transform();
//         }
//     };

//     // 2. Sự kiện Kéo thả chuột để di chuyển ảnh (Pan) khi đang phóng to
//     container.onmousedown = function (e) {
//         if (window.OMR_Scale > 1) {
//             window.OMR_IsDragging = true;
//             window.OMR_StartX = e.clientX - window.OMR_PanX;
//             window.OMR_StartY = e.clientY - window.OMR_PanY;
//             container.style.cursor = 'grabbing';
//         }
//     };

//     window.addEventListener('mousemove', function (e) {
//         if (!window.OMR_IsDragging) return;
//         window.OMR_PanX = e.clientX - window.OMR_StartX;
//         window.OMR_PanY = e.clientY - window.OMR_StartY;
//         window.ham_24_apply_transform();
//     });

//     window.addEventListener('mouseup', function () {
//         window.OMR_IsDragging = false;
//         if (container) container.style.cursor = 'default';
//     });
// };

// // Hàm áp dụng ma trận dịch chuyển và phóng to lên các thành phần bên trong khung
// window.ham_24_apply_transform = function () {
//     let elements = ['omr_video_stream', 'omr_canvas_overlay', 'omr_static_image'];
//     elements.forEach(id => {
//         let el = document.getElementById(id);
//         if (el) {
//             el.style.transform = `translate(${window.OMR_PanX}px, ${window.OMR_PanY}px) scale(${window.OMR_Scale})`;
//             el.style.transformOrigin = 'center center';
//             el.style.transition = window.OMR_IsDragging ? 'none' : 'transform 0.1s ease-out';
//         }
//     });

//     // Cập nhật nhãn hiển thị %
//     let label = document.getElementById('omr_zoom_label');
//     if (label) {
//         label.innerText = `${Math.round(window.OMR_Scale * 100)}%`;
//     }
// };

// // Các hàm bấm nút +/-
// window.OMR_ZoomIn = function () {
//     window.OMR_Scale = Math.min(window.OMR_Scale * 1.25, 5.0);
//     window.ham_24_apply_transform();
// };

// window.OMR_ZoomOut = function () {
//     window.OMR_Scale = Math.max(window.OMR_Scale / 1.25, 0.5);
//     if (window.OMR_Scale === 0.5) { window.OMR_PanX = 0; window.OMR_PanY = 0; }
//     window.ham_24_apply_transform();
// };

// window.OMR_ZoomReset = function () {
//     window.OMR_Scale = 1;
//     window.OMR_PanX = 0;
//     window.OMR_PanY = 0;
//     window.ham_24_apply_transform();
// };

// // ==============================================================================
// // KHỐI XỬ LÝ CHỌN ĐIỂM NEO THỦ CÔNG BẰNG CHUỘT
// // ==============================================================================
// window.OMR_PickingMode = false;
// window.OMR_ManualPoints = [];

// window.OMR_StartManualPicking = function () {
//     window.OMR_PickingMode = true;
//     window.OMR_ManualPoints = [];
//     Swal.fire({
//         toast: true, position: 'top', icon: 'info',
//         title: 'Hãy click chuột vào 4 góc vuông đen của tờ phiếu (Click thứ tự bất kỳ)',
//         showConfirmButton: false, timer: 5000
//     });

//     let canvas = document.getElementById('omr_canvas_overlay');
//     if (canvas) {
//         canvas.style.cursor = 'crosshair';
//         canvas.style.pointerEvents = 'auto'; // Mở khóa để click xuyên qua layer
//         canvas.removeEventListener('click', window.OMR_CanvasClickHandler);
//         canvas.addEventListener('click', window.OMR_CanvasClickHandler);
//     }
// };

// window.OMR_CanvasClickHandler = function (e) {
//     if (!window.OMR_PickingMode) return;

//     let canvas = document.getElementById('omr_canvas_overlay');
//     let rect = canvas.getBoundingClientRect();

//     // Tính toán tọa độ bù trừ (Do object-fit: contain và CSS Transform)
//     let imgW = canvas.width; let imgH = canvas.height;
//     let scale = Math.min(rect.width / imgW, rect.height / imgH);
//     let renderW = imgW * scale; let renderH = imgH * scale;
//     let offsetX = (rect.width - renderW) / 2;
//     let offsetY = (rect.height - renderH) / 2;

//     let xOnCanvas = e.clientX - rect.left;
//     let yOnCanvas = e.clientY - rect.top;

//     let realX = Math.round((xOnCanvas - offsetX) / scale);
//     let realY = Math.round((yOnCanvas - offsetY) / scale);

//     if (realX < 0 || realX > imgW || realY < 0 || realY > imgH) return;

//     // Lưu tọa độ thật
//     window.OMR_ManualPoints.push({ x: realX, y: realY });

//     // Vẽ chấm đỏ để báo hiệu đã click trúng
//     let ctx = canvas.getContext('2d');
//     ctx.beginPath();
//     ctx.arc(realX, realY, 8, 0, 2 * Math.PI);
//     ctx.fillStyle = '#ff0000'; ctx.fill();
//     ctx.lineWidth = 2; ctx.strokeStyle = '#ffffff'; ctx.stroke();

//     if (window.OMR_ManualPoints.length === 4) {
//         window.OMR_PickingMode = false;
//         canvas.style.cursor = 'default';
//         canvas.style.pointerEvents = 'none'; // Khóa layer lại

//         Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Đã lấy 4 điểm! Đang xử lý...', showConfirmButton: false, timer: 1500 });

//         // Nạp lại ảnh và gọi Lõi OpenCV với tham số mảng điểm thủ công
//         let imgEl = document.getElementById('omr_static_image');
//         if (imgEl && imgEl.src) {
//             let srcMat = cv.imread(imgEl);
//             let dataQuet = window.ham_24_8b_loi_opencv_doc_phieu(srcMat, window.OMR_ManualPoints);
//             srcMat.delete();

//             if (dataQuet) window.ham_24_9_doi_chieu_va_tinh_diem(dataQuet);
//         }
//     }
// };




// window.ham_24_6a_khoi_dong_camera = async function () {
//     const video = document.getElementById('omr_video_stream');
//     const status = document.getElementById('omr_camera_status');
//     if (!video) return;

//     window.ham_24_6b_dong_camera(); // Tắt stream cũ nếu có

//     try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//             video: {
//                 facingMode: window.OMR_CameraFacing,
//                 width: { ideal: 1920 },
//                 height: { ideal: 1080 }
//             },
//             audio: false
//         });

//         window.OMR_CameraStream = stream;
//         video.srcObject = stream;

//         video.onloadedmetadata = () => {
//             video.play();
//             status.innerText = "🟢 Camera sẵn sàng! Đưa phiếu vào khung";
//             status.style.background = "#28a745";

//             // BẬT CỜ QUÉT VÀ KÍCH HOẠT VÒNG LẶP 24.7
//             window.OMR_QuetLienTuc = true;
//             if (typeof window.ham_24_7_bat_dau_quet_lien_tuc === 'function') {
//                 setTimeout(window.ham_24_7_bat_dau_quet_lien_tuc, 500);
//             }
//         };
//     } catch (err) {
//         status.innerText = "🔴 Lỗi Camera: " + err.message;
//         status.style.background = "#dc3545";
//     }
// };



// // ==============================================================================
// // KHỐI 24.6b: HÀM ĐÓNG CAMERA (Cập nhật để dọn dẹp sạch sẽ bộ nhớ)
// // ==============================================================================
// window.ham_24_6b_dong_camera = function () {
//     window.OMR_QuetLienTuc = false; // Tắt cờ vòng lặp
    
//     // Tắt đèn camera
//     if (window.OMR_CameraStream) {
//         window.OMR_CameraStream.getTracks().forEach(track => track.stop());
//         window.OMR_CameraStream = null;
//     }
    
//     let video = document.getElementById('omr_video_stream');
//     if (video) video.srcObject = null;

//     // Giải phóng bộ nhớ RAM của OpenCV
//     if (window.OMR_FrameMat && !window.OMR_FrameMat.isDeleted()) {
//         window.OMR_FrameMat.delete();
//         window.OMR_FrameMat = null;
//     }
    
//     // Reset kích thước để lần sau mở lại nó khởi tạo mới
//     window.OMR_LastVideoWidth = 0;
//     window.OMR_LastVideoHeight = 0;
//     window.OMR_CameraErrorCount = 0;
// };



// window.ham_24_6c_doi_camera = function () {
//     // Ẩn ảnh tĩnh nếu đang có
//     let imgEl = document.getElementById('omr_static_image');
//     if (imgEl) imgEl.style.display = 'none';

//     // Hiện lại khung video
//     let video = document.getElementById('omr_video_stream');
//     if (video) video.style.display = 'block';

//     // Đảo chiều camera trước/sau và bật lại
//     window.OMR_CameraFacing = window.OMR_CameraFacing === 'environment' ? 'user' : 'environment';
//     window.ham_24_6a_khoi_dong_camera();
// };


// // ==============================================================================
// // KHỐI QUẢN LÝ TẢI LÊN NHIỀU ẢNH (BATCH PROCESSING)
// // ==============================================================================
// window.OMR_FileList = []; // Mảng chứa các file ảnh được chọn
// window.OMR_CurrentFileIndex = 0; // Vị trí ảnh đang xem

// window.ham_24_6d_xu_ly_anh_upload = function (input) {
//     if (!input.files || input.files.length === 0) return;
    
//     // Lưu toàn bộ danh sách file vào mảng toàn cục
//     window.OMR_FileList = Array.from(input.files);
//     window.OMR_CurrentFileIndex = 0;
    
//     // Hiện thanh điều hướng nếu có chọn file
//     let nav = document.getElementById('omr_batch_nav');
//     if (nav) nav.style.display = 'flex';
    
//     // Bắt đầu load tấm ảnh đầu tiên
//     window.ham_24_load_current_image();
    
//     // Reset input để có thể chọn lại đúng file đó nếu cần
//     input.value = ""; 
// };




// // ==============================================================================
// // KHỐI 24.6E: TỰ ĐỘNG SINH CÁC Ô BONG BÓNG ĐỂ SỬA TRỰC QUAN
// // ==============================================================================
// // ==============================================================================
// // KHỐI 24.6E: TỰ ĐỘNG SINH CÁC Ô BONG BÓNG (BẢN SIÊU NÉN CHO MOBILE)
// // ==============================================================================
// window.ham_24_6e_render_khung_sua_chua = function () {
//     let container = document.getElementById('omr_vung_sua_truc_quan');
//     let cauTruc = window.OMR_CurrentTask.cau_truc_diem;
//     let html = "";

//     // Sinh HTML Phần I (Dàn hàng ngang 2-3 câu / dòng)
//     if (cauTruc.p1_so_cau > 0) {
//         let items = "";
//         for (let i = 0; i < cauTruc.p1_so_cau; i++) {
//             items += `
//                 <div class="p1-item">
//                     <b>${i + 1}</b>
//                     <div class="review-choices">
//                         ${['A', 'B', 'C', 'D'].map(char => `<button type="button" class="answer-dot res-p1" data-q="${i}" data-val="${char}">${char}</button>`).join('')}
//                     </div>
//                 </div>
//             `;
//         }
//         html += `<details open><summary>P.I: Trắc nghiệm</summary><div class="p1-grid">${items}</div></details>`;
//     }

//     // Sinh HTML Phần II (Khối vuông nén 2x2 cho a,b,c,d)
//     if (cauTruc.p2_so_cau > 0) {
//         let cards = "";
//         for (let i = 0; i < cauTruc.p2_so_cau; i++) {
//             let rows = "";
//             for (let r = 0; r < 4; r++) {
//                 let char = ['a', 'b', 'c', 'd'][r];
//                 rows += `
//                     <div class="p2-item">
//                         <b>${char}</b>
//                         <div class="review-choices">
//                             <button type="button" class="answer-dot res-p2" data-q="${i}" data-sub="${r}" data-val="Đ">Đ</button>
//                             <button type="button" class="answer-dot res-p2" data-q="${i}" data-sub="${r}" data-val="S">S</button>
//                         </div>
//                     </div>
//                 `;
//             }
//             cards += `
//                 <div class="p2-card">
//                     <div class="p2-title">CÂU ${i + 1}</div>
//                     <div class="p2-rows">${rows}</div>
//                 </div>
//             `;
//         }
//         html += `<details open><summary>P.II: Đúng / Sai</summary><div class="p2-grid">${cards}</div></details>`;
//     }

//     // Sinh HTML Phần III (Input xếp khít)
//     if (cauTruc.p3_so_cau > 0) {
//         let inputs = "";
//         for (let i = 0; i < cauTruc.p3_so_cau; i++) {
//             inputs += `
//                 <label class="p3-item">Câu ${i + 1}
//                     <input type="text" class="res-p3" data-q="${i}" maxlength="4" placeholder="..." oninput="window.ham_24_9c_cap_nhat_tu_giao_dien()">
//                 </label>
//             `;
//         }
//         html += `<details open><summary>P.III: Trả lời ngắn</summary><div class="p3-grid">${inputs}</div></details>`;
//     }

//     if (container) {
//         container.innerHTML = html;
//         // Gắn lại sự kiện click
//         window.ham_24_6f_bind_events_sua_chua();
//     }
// };
// // ==============================================================================
// // KHỐI 24.6F: GẮN SỰ KIỆN CLICK CHO CÁC BONG BÓNG ĐỂ HOẠT ĐỘNG NHƯ NÚT CHỌN
// // ==============================================================================
// window.ham_24_6f_bind_events_sua_chua = function () {
//     // Sự kiện cho bong bóng Phần 1 (Chọn 1 đáp án, click lại để bỏ chọn)
//     document.querySelectorAll('.res-p1').forEach(btn => {
//         btn.onclick = function () {
//             let q = this.getAttribute('data-q');
//             let isSelected = this.classList.contains('selected');

//             // Xóa tất cả các lựa chọn khác trong cùng 1 câu
//             document.querySelectorAll(`.res-p1[data-q="${q}"]`).forEach(d => {
//                 d.classList.remove('selected');
//                 d.classList.remove('doubt'); // Bỏ trạng thái lỗi/mờ nếu có
//             });

//             // Nếu trước đó chưa chọn, thì chọn. Nếu chọn rồi thì thành rỗng (tẩy)
//             if (!isSelected) this.classList.add('selected');

//             window.ham_24_9c_cap_nhat_tu_giao_dien();
//         };
//     });

//     // Sự kiện cho bong bóng Phần 2 (Đúng/Sai)
//     document.querySelectorAll('.res-p2').forEach(btn => {
//         btn.onclick = function () {
//             let q = this.getAttribute('data-q');
//             let sub = this.getAttribute('data-sub');
//             let isSelected = this.classList.contains('selected');

//             document.querySelectorAll(`.res-p2[data-q="${q}"][data-sub="${sub}"]`).forEach(d => {
//                 d.classList.remove('selected');
//                 d.classList.remove('doubt');
//             });

//             if (!isSelected) this.classList.add('selected');

//             window.ham_24_9c_cap_nhat_tu_giao_dien();
//         };
//     });
// };














// window.ham_24_load_current_image = function () {
//     if (window.OMR_FileList.length === 0) return;
    
//     let file = window.OMR_FileList[window.OMR_CurrentFileIndex];
    
//     // Cập nhật nhãn hiển thị số thứ tự ảnh
//     let lbl = document.getElementById('lbl_batch_status');
//     if (lbl) lbl.innerText = `Ảnh ${window.OMR_CurrentFileIndex + 1} / ${window.OMR_FileList.length}`;
    
//     // Bật/tắt nút Trước
//     let btnPrev = document.getElementById('btn_batch_prev');
//     if (btnPrev) {
//         btnPrev.disabled = (window.OMR_CurrentFileIndex === 0);
//         btnPrev.style.opacity = btnPrev.disabled ? '0.4' : '1';
//     }
    
//     // Bật/tắt nút Tiếp
//     let btnNext = document.getElementById('btn_batch_next');
//     if (btnNext) {
//         btnNext.disabled = (window.OMR_CurrentFileIndex === window.OMR_FileList.length - 1);
//         btnNext.style.opacity = btnNext.disabled ? '0.4' : '1';
//     }

//     // Reset Zoom về 100% trước khi nạp ảnh mới (nếu có hàm Zoom)
//     if(typeof window.OMR_ZoomReset === 'function') window.OMR_ZoomReset();

//     // Xóa rỗng kết quả cũ trên bảng điểm để tránh nhầm lẫn với ảnh trước
//     document.getElementById('kq_tong_diem').innerText = "-.-";
//     document.getElementById('kq_diem_p1').innerText = "-";
//     document.getElementById('kq_diem_p2').innerText = "-";
//     document.getElementById('kq_diem_p3').innerText = "-";
//     document.getElementById('btn_luu_ket_qua').disabled = true;
//     document.getElementById('btn_luu_ket_qua').style.opacity = '0.5';

//     // Hàm gọi OpenCV
//     function xulyKhiOpenCVSanSang(readerResult) {
//         if (typeof cv === 'undefined' || typeof cv.imread === 'undefined') {
//             Swal.fire({ title: 'Đang tải thư viện ảnh...', icon: 'info', showConfirmButton: false, allowOutsideClick: false });
//             setTimeout(() => xulyKhiOpenCVSanSang(readerResult), 1000);
//             return;
//         }
//         Swal.close();
        
//         window.ham_24_6b_dong_camera();
//         let container = document.getElementById('omr_camera_container');
//         let video = document.getElementById('omr_video_stream');
//         let imgEl = document.getElementById('omr_static_image');

//         if (!imgEl) {
//             imgEl = document.createElement('img');
//             imgEl.id = 'omr_static_image';
//             imgEl.style.position = 'absolute';
//             imgEl.style.width = '100%';
//             imgEl.style.height = '100%';
//             imgEl.style.objectFit = 'contain';
//             imgEl.style.zIndex = '2';
//             container.appendChild(imgEl);
//         }

//         imgEl.src = readerResult;
//         imgEl.style.display = 'block';
//         if (video) video.style.display = 'none';

//         // Đợi ảnh lên khung rồi bắn sang lõi nhận diện OpenCV
//         imgEl.onload = () => {
//             setTimeout(() => {
//                 window.ham_24_8_xu_ly_anh_tinh(imgEl);
//             }, 100); 
//         };
//     }

//     let reader = new FileReader();
//     reader.onload = function (e) {
//         xulyKhiOpenCVSanSang(e.target.result);
//     };
//     reader.readAsDataURL(file);
// };

// // ==============================================================================
// // HÀM CHUYỂN ẢNH TRƯỚC / SAU
// // ==============================================================================
// window.OMR_PrevImage = function() {
//     if (window.OMR_CurrentFileIndex > 0) {
//         window.OMR_CurrentFileIndex--;
//         window.ham_24_load_current_image();
//     }
// };

// window.OMR_NextImage = function() {
//     if (window.OMR_CurrentFileIndex < window.OMR_FileList.length - 1) {
//         window.OMR_CurrentFileIndex++;
//         window.ham_24_load_current_image();
//     }
// };





// // ==============================================================================
// // KHỐI 24.7 & 24.8: PIPELINE XỬ LÝ ẢNH QUA OPENCV (LIVE CAMERA & ẢNH TĨNH)
// // ==============================================================================

// window.OMR_QuetLienTuc = false; // Cờ kiểm soát vòng lặp camera


// // ==============================================================================
// // KHỐI 24.7: QUÉT LIVE CAMERA AN TOÀN (CHỐNG TRÀN BỘ NHỚ VÀ SPAM LỖI)
// // ==============================================================================
// window.OMR_LastVideoWidth = 0;
// window.OMR_LastVideoHeight = 0;
// window.OMR_CameraErrorCount = 0; // Bộ đếm lỗi khẩn cấp

// window.ham_24_7_bat_dau_quet_lien_tuc = function () {
//     if (!window.OMR_QuetLienTuc) return;

//     let video = document.getElementById('omr_video_stream');
//     // Chờ cho video thực sự có hình ảnh và kích thước
//     if (!video || video.readyState < 2 || video.videoWidth === 0 || video.videoHeight === 0) {
//         requestAnimationFrame(window.ham_24_7_bat_dau_quet_lien_tuc);
//         return;
//     }

//     try {
//         // 1. KIỂM TRA SỰ THAY ĐỔI KÍCH THƯỚC (QUAN TRỌNG ĐỂ KHÔNG BỊ LỖI MAT SIZE)
//         if (video.videoWidth !== window.OMR_LastVideoWidth || video.videoHeight !== window.OMR_LastVideoHeight) {
//             console.log(`[Camera] Đã cập nhật kích thước luồng quét: ${video.videoWidth} x ${video.videoHeight}`);
//             window.OMR_LastVideoWidth = video.videoWidth;
//             window.OMR_LastVideoHeight = video.videoHeight;
            
//             // Dọn dẹp bộ nhớ cũ nếu có
//             if (window.OMR_FrameMat && !window.OMR_FrameMat.isDeleted()) {
//                 window.OMR_FrameMat.delete();
//             }
            
//             // Khởi tạo lại Cap và Mat với kích thước mới nhất
//             window.OMR_VideoCap = new cv.VideoCapture(video);
//             window.OMR_FrameMat = new cv.Mat(video.videoHeight, video.videoWidth, cv.CV_8UC4);
//         }

//         // 2. ĐỌC KHUNG HÌNH (Dùng chung 1 biến OMR_FrameMat để tiết kiệm RAM)
//         window.OMR_VideoCap.read(window.OMR_FrameMat);

//         if (!window.OMR_FrameMat.empty()) {
//             // Đẩy vào Lõi phân tích
//             let dataQuet = window.ham_24_8b_loi_opencv_doc_phieu(window.OMR_FrameMat);

//             if (dataQuet && dataQuet.so_bao_danh !== "") {
//                 // ĐÃ TÌM THẤY PHIẾU VÀ ĐỌC XONG -> TẮT CAMERA
//                 window.OMR_QuetLienTuc = false;
                
//                 let status = document.getElementById('omr_camera_status');
//                 if (status) {
//                     status.innerText = "✅ Bắt được phiếu! Đang tính điểm...";
//                     status.style.background = "#28a745";
//                 }
                
//                 window.ham_24_9_doi_chieu_va_tinh_diem(dataQuet);
//                 return; // Thoát hẳn khỏi vòng lặp
//             }
//         }
        
//         // Nếu chạy mượt qua được bước trên, reset bộ đếm lỗi về 0
//         window.OMR_CameraErrorCount = 0;

//     } catch (err) {
//         window.OMR_CameraErrorCount++;
//         console.error("Lỗi Live Camera OpenCV:", err);
        
//         // 3. PHANH KHẨN CẤP: Nếu lỗi liên tục quá 10 lần (1/6 giây), dừng ngay để cứu trình duyệt
//         if (window.OMR_CameraErrorCount > 10) {
//             window.OMR_QuetLienTuc = false;
//             console.error("🛑 Đã ngắt khẩn cấp Camera vì OpenCV báo lỗi liên tục!");
//             let status = document.getElementById('omr_camera_status');
//             if (status) {
//                 status.innerText = "🔴 Lỗi luồng Camera. Hãy tải ảnh có sẵn!";
//                 status.style.background = "#dc3545";
//             }
//             return;
//         }
//     }

//     // 4. TIẾP TỤC QUÉT Ở KHUNG HÌNH TIẾP THEO
//     if (window.OMR_QuetLienTuc) {
//         requestAnimationFrame(window.ham_24_7_bat_dau_quet_lien_tuc);
//     }
// };




// // ==============================================================================
// // KHỐI 24.8: LÕI OPENCV XỬ LÝ ẢNH (CHẾ ĐỘ DEBUG - VẼ KHUNG MÀU)
// // ==============================================================================

// // 1. Hàm phụ trợ: Sắp xếp 4 góc
// window.ham_24_8x_sap_xep_4_goc = function (pts) {
//     let sum = [], diff = [];
//     for (let i = 0; i < 4; i++) {
//         sum.push({ id: i, val: pts[i].x + pts[i].y });
//         diff.push({ id: i, val: pts[i].y - pts[i].x });
//     }
//     sum.sort((a, b) => a.val - b.val);
//     let tl = pts[sum[0].id];
//     let br = pts[sum[3].id];

//     diff.sort((a, b) => a.val - b.val);
//     let tr = pts[diff[0].id];
//     let bl = pts[diff[3].id];

//     return cv.matFromArray(4, 1, cv.CV_32FC2, [tl.x, tl.y, tr.x, tr.y, br.x, br.y, bl.x, bl.y]);
// };


// // ==============================================================================
// // KHỐI 24.8Y: ĐỌC VÙNG LƯỚI THÔNG MINH (ADAPTIVE SCORING & DYNAMIC THRESHOLD)
// // Lấy cảm hứng từ hệ thống chuẩn: Tính độ đậm dựa trên nền giấy cục bộ
// // ==============================================================================
// window.ham_24_8y_doc_vung_luoi_thong_minh = function (roiGray, soHang, soCot, chieuQuet, nhanList) {
//     let w = roiGray.cols;
//     let h = roiGray.rows;
//     let cellW = w / soCot;
//     let cellH = h / soHang;

//     let danhSachDiem = [];
//     let maTranDiem = [];

//     // BƯỚC 1: ĐO ĐỘ ĐẬM CỤC BỘ CỦA TỪNG Ô
//     for (let r = 0; r < soHang; r++) {
//         let rowScores = [];
//         for (let c = 0; c < soCot; c++) {
//             let radius = Math.min(cellW, cellH) * 0.35; // Bán kính vòng tròn tâm

//             // Cắt ảnh của 1 ô duy nhất
//             let cellRect = new cv.Rect(Math.floor(c * cellW), Math.floor(r * cellH), Math.floor(cellW), Math.floor(cellH));
//             let cellMat = roiGray.roi(cellRect);

//             // Tạo mặt nạ vùng TÂM (Chứa mực tô)
//             let maskCenter = new cv.Mat.zeros(cellMat.rows, cellMat.cols, cv.CV_8UC1);
//             cv.circle(maskCenter, new cv.Point(Math.floor(cellW / 2), Math.floor(cellH / 2)), radius, new cv.Scalar(255), -1);

//             // Tạo mặt nạ vùng VIỀN (Nền giấy trắng xung quanh)
//             let maskBorder = new cv.Mat();
//             cv.bitwise_not(maskCenter, maskBorder);

//             // Đo độ sáng trung bình (0 = Đen, 255 = Trắng)
//             let meanInk = cv.mean(cellMat, maskCenter)[0];
//             let meanPaper = cv.mean(cellMat, maskBorder)[0];

//             // Tính tỷ lệ độ đậm: (Giấy - Mực) / Giấy
//             let doDam = 0;
//             if (meanPaper > meanInk) {
//                 doDam = (meanPaper - meanInk) / Math.max(1, meanPaper);
//             }

//             rowScores.push(doDam);
//             danhSachDiem.push(doDam);

//             cellMat.delete(); maskCenter.delete(); maskBorder.delete();
//         }
//         maTranDiem.push(rowScores);
//     }

//     // BƯỚC 2: TÍNH NGƯỠNG ĐỘNG (Dựa trên thói quen tô của chính tờ phiếu này)
//     let diemSort = [...danhSachDiem].sort((a, b) => a - b);
//     let nen = diemSort[Math.floor(diemSort.length * 0.3)]; // Lấy mức 30% làm nền ô trống
//     if (nen > 0.2) nen = 0.2;

//     let to = diemSort.filter(v => (v - nen) > 0.22).map(v => v - nen);
//     let F = to.length >= 4 ? to[Math.floor(to.length / 2)] : 0.6; // Độ đậm điển hình

//     let thap = Math.min(0.3, Math.max(0.17, 0.4 * F));
//     let cao = Math.min(0.5, Math.max(0.24, 0.6 * F));

//     // BƯỚC 3: QUYẾT ĐỊNH ĐÁP ÁN (Khử nhiễu & Bắt lỗi tẩy xóa)
//     let ketQua = [];
//     let soNhom = chieuQuet === 'COL_MAJOR' ? soCot : soHang;
//     let soOption = chieuQuet === 'COL_MAJOR' ? soHang : soCot;

//     for (let i = 0; i < soNhom; i++) {
//         let diemNhom = [];
//         for (let j = 0; j < soOption; j++) {
//             let diem = chieuQuet === 'COL_MAJOR' ? maTranDiem[j][i] : maTranDiem[i][j];
//             diemNhom.push({ idx: j, val: diem - nen });
//         }

//         // Xếp hạng các ô theo độ đậm
//         diemNhom.sort((a, b) => b.val - a.val);
//         let d1 = diemNhom[0].val; // Đậm nhất
//         let d2 = diemNhom[1].val; // Đậm nhì

//         if (d1 < Math.max(0.08, 0.35 * thap, 0.2 * F)) {
//             // Không có ô nào đủ đậm
//             ketQua.push('-');
//         } else {
//             // Xét các ô vượt ngưỡng
//             let cacODam = diemNhom.filter(o => o.val >= cao || (o.val >= 0.6 * d1 && o.val >= thap));

//             if (cacODam.length > 1) {
//                 ketQua.push('*'); // Lỗi tô đúp (2 ô đậm ngang nhau)
//             } else if (d1 < 0.6 * thap || d2 >= 0.45 * d1) {
//                 ketQua.push('?'); // Lỗi chưa rõ (Tẩy xóa nham nhở)
//             } else {
//                 ketQua.push(nhanList[diemNhom[0].idx]); // Hợp lệ
//             }
//         }
//     }

//     return ketQua;
// };







// // ==============================================================================
// // 3. LÕI CHÍNH OPENCV (BẢN HOÀN CHỈNH: NỘI SUY ĐƯỜNG THẲNG + ĐIỂM NEO THỦ CÔNG)
// // ==============================================================================
// window.ham_24_8b_loi_opencv_doc_phieu = function (srcMat, manualPoints = null) {
//     const DANH_SACH_PHOI = {
//         "bgd2": {
//             diem_neo: [
//                 { id: '1. Trai-Tren', col: 0, row: 0, x: 35, y: 30 },
//                 { id: '2. Phai-Tren', col: 1, row: 0, x: 765, y: 30 },
//                 { id: '3. Trai-P1', col: 0, row: 1, x: 35, y: 365 },
//                 { id: '4. Phai-P1', col: 1, row: 1, x: 765, y: 365 },
//                 { id: '5. Trai-P2', col: 0, row: 2, x: 35, y: 605 },
//                 { id: '6. Phai-P2', col: 1, row: 2, x: 765, y: 605 },
//                 { id: '7. Trai-P3', col: 0, row: 3, x: 35, y: 770 },
//                 { id: '8. Phai-P3', col: 1, row: 3, x: 765, y: 770 },
//                 { id: '9. Trai-Duoi', col: 0, row: 4, x: 35, y: 1100 },
//                 { id: '10. Phai-Duoi', col: 1, row: 4, x: 765, y: 1100 }
//             ]
//         }
//     };

//     let maPhoi = window.OMR_CurrentTask?.sheet_template || "bgd2";
//     let toaDo = DANH_SACH_PHOI[maPhoi] || DANH_SACH_PHOI["bgd2"];

//     let container = document.getElementById('omr_camera_container');
//     let parentCol = container ? container.parentElement : null;
//     let logBox = document.getElementById('omr_scan_logs');
//     if (parentCol && !logBox) {
//         logBox = document.createElement('div');
//         logBox.id = 'omr_scan_logs';
//         logBox.style.cssText = "width: 100%; height: 160px; background: #0c0c0c; border-top: 2px solid #17a2b8; color: #0f0; font-family: monospace; font-size: 12px; padding: 10px; overflow-y: auto; box-sizing: border-box; text-align: left; line-height: 1.5; box-shadow: inset 0 2px 5px rgba(0,0,0,0.5); margin-top:10px; border-radius:4px;";
//         parentCol.appendChild(logBox);
//     }
//     if (logBox) logBox.innerHTML = "";

//     function inLog(msg, color = "#0f0") {
//         if (!logBox) return;
//         let time = new Date().toLocaleTimeString('vi-VN', { hour12: false });
//         logBox.innerHTML += `<div><span style="color:#6c757d">[${time}]</span> <span style="color:${color}">${msg}</span></div>`;
//         logBox.scrollTop = logBox.scrollHeight;
//     }

//     let gray = new cv.Mat(), blurred = new cv.Mat(), thresh = new cv.Mat(), debugImg = new cv.Mat();
//     let contours = new cv.MatVector(), hierarchy = new cv.Mat();
//     let STD_W = 800, STD_H = 1131;

//     try {
//         inLog("Khởi động Lõi quét OpenCV...", "#fff");

//         // ===================================================================
//         // 1. TIỀN XỬ LÝ (GIỮ NGUYÊN MÀU SẮC & NÉN ẢNH NÉT CĂNG)
//         // ===================================================================
//         cv.resize(srcMat, debugImg, new cv.Size(STD_W, STD_H), 0, 0, cv.INTER_AREA);
//         cv.cvtColor(debugImg, gray, cv.COLOR_RGBA2GRAY, 0);
//         cv.GaussianBlur(gray, blurred, new cv.Size(5, 5), 0, 0, cv.BORDER_DEFAULT);
//         cv.threshold(blurred, thresh, 0, 255, cv.THRESH_BINARY_INV | cv.THRESH_OTSU);

//         let idealPoints = toaDo.diem_neo;
//         let mapPoints = {};
//         let foundCount = 0;

//         // ===================================================================
//         // 2. KIỂM TRA CHẾ ĐỘ: THỦ CÔNG HAY TỰ ĐỘNG?
//         // ===================================================================
//         if (manualPoints && manualPoints.length === 4) {
//             inLog("CHẾ ĐỘ THỦ CÔNG: Sử dụng 4 góc do giáo viên chỉ định.", "#ff0000");

//             // Tự động sắp xếp 4 điểm click lộn xộn thành Trái/Phải/Trên/Dưới
//             let sortedY = [...manualPoints].sort((a, b) => a.y - b.y);
//             let topPts = [sortedY[0], sortedY[1]].sort((a, b) => a.x - b.x);
//             let botPts = [sortedY[2], sortedY[3]].sort((a, b) => a.x - b.x);

//             let TL = topPts[0], TR = topPts[1], BL = botPts[0], BR = botPts[1];

//             // Ép cứng 4 góc này làm điểm THẬT
//             mapPoints[`0_0`] = { isDeduced: false, cx: TL.x, cy: TL.y, rect: { x: TL.x - 10, y: TL.y - 10, width: 20, height: 20 }, ideal: idealPoints.find(p => p.col === 0 && p.row === 0) };
//             mapPoints[`1_0`] = { isDeduced: false, cx: TR.x, cy: TR.y, rect: { x: TR.x - 10, y: TR.y - 10, width: 20, height: 20 }, ideal: idealPoints.find(p => p.col === 1 && p.row === 0) };
//             mapPoints[`0_4`] = { isDeduced: false, cx: BL.x, cy: BL.y, rect: { x: BL.x - 10, y: BL.y - 10, width: 20, height: 20 }, ideal: idealPoints.find(p => p.col === 0 && p.row === 4) };
//             mapPoints[`1_4`] = { isDeduced: false, cx: BR.x, cy: BR.y, rect: { x: BR.x - 10, y: BR.y - 10, width: 20, height: 20 }, ideal: idealPoints.find(p => p.col === 1 && p.row === 4) };

//             foundCount = 4;
//         } else {
//             inLog("CHẾ ĐỘ TỰ ĐỘNG: Quét tìm 10 điểm neo...", "#fff");

//             // TÌM KHỐI ĐEN ĐẶC RUỘT
//             cv.findContours(thresh, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);
//             let blocks = [];
//             for (let i = 0; i < contours.size(); i++) {
//                 let cnt = contours.get(i);
//                 let area = cv.contourArea(cnt);
//                 if (area > 100 && area < 8000) {
//                     let rect = cv.boundingRect(cnt);
//                     let aspect = rect.width / rect.height;
//                     let extent = area / (rect.width * rect.height);
//                     if (aspect > 0.6 && aspect < 1.4 && extent > 0.6) {
//                         blocks.push({
//                             rect: rect,
//                             cx: Math.round(rect.x + rect.width / 2),
//                             cy: Math.round(rect.y + rect.height / 2)
//                         });
//                     }
//                 }
//             }

//             // KHỚP VỚI 10 TOẠ ĐỘ LÝ TƯỞNG
//             for (let i = 0; i < idealPoints.length; i++) {
//                 let ideal = idealPoints[i];
//                 let closestBlock = null;
//                 let minDist = 80;
//                 let closestIdx = -1;

//                 for (let j = 0; j < blocks.length; j++) {
//                     let b = blocks[j];
//                     let dist = Math.hypot(b.cx - ideal.x, b.cy - ideal.y);
//                     if (dist < minDist) {
//                         minDist = dist;
//                         closestBlock = b;
//                         closestIdx = j;
//                     }
//                 }

//                 if (closestBlock) {
//                     mapPoints[`${ideal.col}_${ideal.row}`] = {
//                         isDeduced: false, cx: closestBlock.cx, cy: closestBlock.cy,
//                         rect: closestBlock.rect, ideal: ideal
//                     };
//                     blocks.splice(closestIdx, 1);
//                 }
//             }
//             foundCount = Object.keys(mapPoints).length;
//         }

//         // ===================================================================
//         // 3. NỘI SUY BẰNG PHƯƠNG TRÌNH ĐƯỜNG THẲNG (Hồi quy tuyến tính)
//         // ===================================================================
//         if (foundCount < 10) {
//             let calcLine = (pts) => {
//                 if (pts.length < 2) return null;
//                 let sumX = 0, sumY = 0;
//                 pts.forEach(p => { sumX += p.cx; sumY += p.cy; });
//                 let avgX = sumX / pts.length, avgY = sumY / pts.length;
//                 let num = 0, den = 0;
//                 pts.forEach(p => {
//                     num += (p.cy - avgY) * (p.cx - avgX);
//                     den += (p.cy - avgY) * (p.cy - avgY);
//                 });
//                 let m = (den === 0) ? 0 : (num / den);
//                 let c = avgX - m * avgY;
//                 return { m, c };
//             };

//             let ptsCol0 = [], ptsCol1 = [];
//             for (let key in mapPoints) {
//                 if (!mapPoints[key].isDeduced) {
//                     if (key.startsWith("0_")) ptsCol0.push(mapPoints[key]);
//                     if (key.startsWith("1_")) ptsCol1.push(mapPoints[key]);
//                 }
//             }

//             let line0 = calcLine(ptsCol0);
//             let line1 = calcLine(ptsCol1);

//             if (line0) inLog(`> PT Cột Trái: X = ${line0.m.toFixed(3)}*Y + ${Math.round(line0.c)}`, "#ffc107");
//             if (line1) inLog(`> PT Cột Phải: X = ${line1.m.toFixed(3)}*Y + ${Math.round(line1.c)}`, "#ffc107");

//             let deduceY = (col, r) => {
//                 let pts = (col === 0) ? ptsCol0 : ptsCol1;
//                 if (pts.length >= 2) {
//                     pts.sort((a, b) => a.ideal.row - b.ideal.row);
//                     let pTop = pts[0], pBot = pts[pts.length - 1];
//                     let idealTarget = idealPoints.find(p => p.col === col && p.row === r);
//                     let ratio = (idealTarget.y - pTop.ideal.y) / (pBot.ideal.y - pTop.ideal.y);
//                     return Math.round(pTop.cy + (pBot.cy - pTop.cy) * ratio);
//                 }
//                 return null;
//             };

//             for (let col = 0; col <= 1; col++) {
//                 let currentLine = (col === 0) ? line0 : line1;
//                 for (let r = 0; r <= 4; r++) {
//                     if (!mapPoints[`${col}_${r}`]) {
//                         let idealTarget = idealPoints.find(p => p.col === col && p.row === r);
//                         let deducedY = deduceY(col, r);
//                         let deducedX = 0;

//                         if (deducedY !== null && currentLine !== null) {
//                             deducedX = Math.round(currentLine.m * deducedY + currentLine.c);
//                         } else {
//                             let otherCol = (col === 0) ? 1 : 0;
//                             let ptOther = mapPoints[`${otherCol}_${r}`];
//                             deducedY = ptOther ? ptOther.cy : (deduceY(otherCol, r) || idealTarget.y);

//                             let otherLine = (col === 0) ? line1 : line0;
//                             let pts = (col === 0) ? ptsCol0 : ptsCol1;

//                             if (otherLine && pts.length === 1) {
//                                 deducedX = Math.round(otherLine.m * (deducedY - pts[0].cy) + pts[0].cx);
//                             } else {
//                                 let idealOther = idealPoints.find(p => p.col === otherCol && p.row === r);
//                                 let deltaX = idealTarget.x - idealOther.x;
//                                 let otherX = otherLine ? Math.round(otherLine.m * deducedY + otherLine.c) : idealOther.x;
//                                 deducedX = otherX + deltaX;
//                             }
//                         }

//                         mapPoints[`${col}_${r}`] = {
//                             isDeduced: true, cx: deducedX, cy: deducedY,
//                             rect: { x: deducedX - 10, y: deducedY - 10, width: 20, height: 20 },
//                             ideal: idealTarget
//                         };
//                     }
//                 }
//             }
//         }

//         // ===================================================================
//         // 4. VẼ KẾT QUẢ RA ẢNH VÀ IN LOG
//         // ===================================================================
//         inLog("--- DANH SÁCH TỌA ĐỘ ĐIỂM NEO ---", "#17a2b8");
//         for (let key in mapPoints) {
//             let pt = mapPoints[key];
//             let color = pt.isDeduced ? new cv.Scalar(0, 165, 255, 255) : new cv.Scalar(255, 0, 0, 255);

//             let loaiDiem = pt.isDeduced ? '<span style="color:#ffa500">[NỘI SUY]</span>' : '<span style="color:#00ff00">[THẬT]</span>';
//             inLog(`${loaiDiem} ${pt.ideal.id} -> X: ${pt.cx}, Y: ${pt.cy}`, pt.isDeduced ? "#ffaa00" : "#00ff00");

//             cv.rectangle(debugImg,
//                 new cv.Point(pt.rect.x, pt.rect.y),
//                 new cv.Point(pt.rect.x + pt.rect.width, pt.rect.y + pt.rect.height),
//                 color, -1
//             );
//             let label = pt.isDeduced ? `${pt.ideal.id} (Ao)` : pt.ideal.id;
//             cv.putText(debugImg, label, new cv.Point(pt.cx + 15, pt.cy + 5), cv.FONT_HERSHEY_SIMPLEX, 0.6, new cv.Scalar(0, 255, 255, 255), 2);
//         }

//         cv.imshow('omr_canvas_overlay', debugImg);
//         let canvasOverlay = document.getElementById('omr_canvas_overlay');
//         if (canvasOverlay) {
//             canvasOverlay.style.display = 'block'; canvasOverlay.style.zIndex = '10';
//             canvasOverlay.style.width = '100%'; canvasOverlay.style.height = '100%';
//             canvasOverlay.style.objectFit = 'contain';
//         }
//         let imgEl = document.getElementById('omr_static_image');
//         if (imgEl) imgEl.style.display = 'none';

//         // ===================================================================
//         // 5. NẮN PHẲNG VÀ VẼ KHUNG TRỰC QUAN TRÊN KHÔNG GIAN PHẲNG (560x801)
//         // ===================================================================
//         let ketQua = { so_bao_danh: "", ma_de: "", bai_lam_p1: "", bai_lam_p2: [], bai_lam_p3: [] };

//         let tl = mapPoints["0_0"]; // Trái - Trên
//         let tr = mapPoints["1_0"]; // Phải - Trên
//         let br = mapPoints["1_4"]; // Phải - Dưới cùng
//         let bl = mapPoints["0_4"]; // Trái - Dưới cùng

//         if (tl && tr && br && bl) {
//             let srcTri = cv.matFromArray(4, 1, cv.CV_32FC2, [
//                 tl.cx, tl.cy,
//                 tr.cx, tr.cy,
//                 br.cx, br.cy,
//                 bl.cx, bl.cy
//             ]);

//             let dstTri = cv.matFromArray(4, 1, cv.CV_32FC2, [
//                 0, 1,
//                 555, 1,
//                 555, 799,
//                 0, 799
//             ]);

//             let M = cv.getPerspectiveTransform(srcTri, dstTri);
//             let flatGray = new cv.Mat();
//             let dsize = new cv.Size(560, 801);

//             cv.warpPerspective(gray, flatGray, M, dsize, cv.INTER_LINEAR, cv.BORDER_CONSTANT, new cv.Scalar(255, 255, 255, 255));

//             // ===============================================================
//             // TẠO ẢNH MÀU DEBUG RIÊNG CHO KHÔNG GIAN PHẲNG (560x801)
//             // ===============================================================
//             let debugFlat = new cv.Mat();
//             cv.cvtColor(flatGray, debugFlat, cv.COLOR_GRAY2RGBA);

//             // Khai báo tọa độ chuẩn Photoshop
//             let rectSBD = new cv.Rect(387, 78, 92, 163);
//             let rectMaDe = new cv.Rect(489, 78, 47, 163);

//             if (typeof inLog === 'function') {
//                 inLog(`[INFO] Đã warp phẳng về chuẩn 560x801`, "#ff9900");
//                 inLog(`[FRAME SBD] X: ${rectSBD.x} | Y: ${rectSBD.y} | W: ${rectSBD.width} | H: ${rectSBD.height}`, "#00ffcc");
//                 inLog(`[FRAME MÃ ĐỀ] X: ${rectMaDe.x} | Y: ${rectMaDe.y} | W: ${rectMaDe.width} | H: ${rectMaDe.height}`, "#00ffcc");
//             }

//             // VẼ TRỰC TIẾP LÊN debugFlat (Vì cùng hệ quy chiếu 560x801)
//             cv.rectangle(debugFlat, new cv.Point(rectSBD.x, rectSBD.y), new cv.Point(rectSBD.x + rectSBD.width, rectSBD.y + rectSBD.height), new cv.Scalar(255, 0, 0, 255), 2);
//             cv.rectangle(debugFlat, new cv.Point(rectMaDe.x, rectMaDe.y), new cv.Point(rectMaDe.x + rectMaDe.width, rectMaDe.y + rectMaDe.height), new cv.Scalar(0, 255, 0, 255), 2);

//             // Nếu muốn gán ảnh debug phẳng này đè lên debugImg để hiển thị ra màn hình UI chung của Thầy:
//             // (Ta resize debugFlat cho khớp kích thước debugImg hoặc gán thẳng nếu khung nhìn hỗ trợ)
//             // cv.resize(debugFlat, debugImg, debugImg.size(), 0, 0, cv.INTER_LINEAR);

//             // A. Đọc Số Báo Danh từ flatGray
//             let roiSBD = flatGray.roi(rectSBD);
//             if (typeof window.ham_24_8y_doc_vung_luoi_thong_minh === 'function') {
//                 ketQua.so_bao_danh = window.ham_24_8y_doc_vung_luoi_thong_minh(roiSBD, 10, 8, 'COL_MAJOR', ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']).join('');
//                 inLog(`[KẾT QUẢ] SBD: ${ketQua.so_bao_danh}`, "#00ffff");
//             }
//             roiSBD.delete();

//             // B. Đọc Mã Đề từ flatGray
//             let roiMaDe = flatGray.roi(rectMaDe);
//             if (typeof window.ham_24_8y_doc_vung_luoi_thong_minh === 'function') {
//                 ketQua.ma_de = window.ham_24_8y_doc_vung_luoi_thong_minh(roiMaDe, 10, 4, 'COL_MAJOR', ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']).join('');
//                 inLog(`[KẾT QUẢ] Mã đề: ${ketQua.ma_de}`, "#00ffff");
//             }
//             roiMaDe.delete();

//             // Dọn dẹp RAM
//             srcTri.delete();
//             dstTri.delete();
//             M.delete();
//             flatGray.delete();
//             debugFlat.delete();

//         } else {
//             if (typeof inLog === 'function') inLog("[LỖI] Không tìm đủ 4 mốc góc để nắn phẳng!", "#ff0000");
//         }


//         // Tạm thời giữ Mock Data cho các phần P1, P2, P3 chưa code
//         ketQua.bai_lam_p1 = "ABCDABCDABCD";
//         ketQua.bai_lam_p2 = ["ĐSĐS", "ĐĐĐS", "SSSS", "ĐS--"];
//         ketQua.bai_lam_p3 = ["1,5", "-12", "", "3", "0,25", "5"];
//         // ===================================================================
//         // 6. XUẤT ẢNH RA MÀN HÌNH (Dùng biến mới để không trùng lặp)
//         // ===================================================================
//         cv.imshow('omr_canvas_overlay', debugImg);

//         let myCanvas = document.getElementById('omr_canvas_overlay');
//         if (myCanvas) {
//             myCanvas.style.display = 'block'; myCanvas.style.zIndex = '10';
//             myCanvas.style.width = '100%'; myCanvas.style.height = '100%';
//             myCanvas.style.objectFit = 'contain';
//         }

//         let myImg = document.getElementById('omr_static_image');
//         if (myImg) {
//             myImg.style.display = 'none';
//         }

//         return ketQua;

//     } catch (err) {
//         inLog(`LỖI NGHIÊM TRỌNG: ${err.message}`, "#dc3545");
//         return null;
//     } finally {
//         if (gray && !gray.isDeleted()) gray.delete();
//         if (blurred && !blurred.isDeleted()) blurred.delete();
//         if (thresh && !thresh.isDeleted()) thresh.delete();
//         if (debugImg && !debugImg.isDeleted()) debugImg.delete();
//         if (contours && !contours.isDeleted()) contours.delete();
//         if (hierarchy && !hierarchy.isDeleted()) hierarchy.delete();
//     }
// };




// // 4. Luồng xử lý Ảnh Tĩnh
// window.ham_24_8_xu_ly_anh_tinh = async function (imgElement) {
//     let status = document.getElementById('omr_camera_status');
//     if (status) {
//         status.innerText = "⚙️ Đang phân tích ảnh tĩnh...";
//         status.style.background = "#fd7e14";
//     }

//     try {
//         if (typeof cv === 'undefined') {
//             Swal.fire('Thiếu thư viện', 'Chưa tải được OpenCV.js', 'error');
//             return;
//         }

//         let src = cv.imread(imgElement);
//         let dataQuet = window.ham_24_8b_loi_opencv_doc_phieu(src);
//         src.delete();

//         if (dataQuet) {
//             window.ham_24_9_doi_chieu_va_tinh_diem(dataQuet);
//         } else {
//             throw new Error("Xử lý thất bại! Hãy xem thông báo lỗi bật lên.");
//         }
//     } catch (err) {
//         if (status) {
//             status.innerText = "🔴 Lỗi phân tích: " + err.message;
//             status.style.background = "#dc3545";
//         }
//     }
// };


// // ==============================================================================
// // KHỐI 24.9: ĐỐI CHIẾU ĐÁP ÁN, TÍNH ĐIỂM VÀ CẬP NHẬT UI KẾT QUẢ
// // ==============================================================================


// // window.ham_24_9_doi_chieu_va_tinh_diem = function (dataQuet) {
// //     let status = document.getElementById('omr_camera_status');
// //     let canhBao = document.getElementById('kq_canh_bao');
// //     let btnLuu = document.getElementById('btn_luu_ket_qua');

// //     // Lưu lại Data đang chấm vào RAM để hàm sửa tay có thể truy cập
// //     window.OMR_CurrentScannedData = dataQuet;

// //     document.getElementById('kq_sbd').value = dataQuet.so_bao_danh || "";
// //     document.getElementById('kq_made').value = dataQuet.ma_de || "";
// //     canhBao.style.display = 'none';
// //     btnLuu.disabled = true;
// //     btnLuu.style.opacity = '0.5';

// //     document.getElementById('kq_chitiet_p1').style.display = 'none';
// //     document.getElementById('kq_chitiet_p2').style.display = 'none';
// //     document.getElementById('kq_chitiet_p3').style.display = 'none';

// //     // let maDeQuet = dataQuet.ma_de;
// //     // if (!maDeQuet || maDeQuet.includes('-') || maDeQuet === "") {
// //     //     window.ham_24_9a_hien_canh_bao("⚠️ Không đọc được Mã Đề hoặc Mã Đề sai.");
// //     //     return;
// //     // }

// //     let maDeQuet = dataQuet.ma_de;
// //     let sbdQuet = dataQuet.so_bao_danh;

// //     if (!sbdQuet || sbdQuet.includes('-') || sbdQuet.includes('?')) {
// //         window.ham_24_9a_hien_canh_bao(`⚠️ SBD LỖI (${sbdQuet}): Phát hiện ô trống (-) hoặc tẩy dở/tô đúp (?). Vui lòng tự sửa lại ô Số báo danh!`);
// //         document.getElementById('kq_sbd').style.background = "#fff3cd";
// //         document.getElementById('kq_sbd').style.border = "2px dashed #ffc107";
// //         return; // Dừng lại, bắt Giáo viên tự gõ số đúng vào SBD
// //     } else {
// //         document.getElementById('kq_sbd').style.background = "#fff0f1";
// //         document.getElementById('kq_sbd').style.border = "2px solid #ffb3ba";
// //     }

// //     if (!maDeQuet || maDeQuet.includes('-') || maDeQuet.includes('?') || maDeQuet === "") {
// //         window.ham_24_9a_hien_canh_bao(`⚠️ MÃ ĐỀ LỖI (${maDeQuet}): Phát hiện ô trống (-) hoặc tẩy dở/tô đúp (?). Vui lòng tự sửa lại!`);
// //         document.getElementById('kq_made').style.background = "#fff3cd";
// //         document.getElementById('kq_made').style.border = "2px dashed #ffc107";
// //         return;
// //     } else {
// //         document.getElementById('kq_made').style.background = "#f8fbff";
// //         document.getElementById('kq_made').style.border = "2px solid #b8daff";
// //     }



// //     let dapAnGoc = window.OMR_CurrentKeys.find(k => String(k.ma_de) === String(maDeQuet));
// //     if (!dapAnGoc) {
// //         window.ham_24_9a_hien_canh_bao(`⚠️ Mã đề ${maDeQuet} chưa được cấu hình đáp án trong hệ thống!`);
// //         return;
// //     }

// //     let cauTruc = window.OMR_CurrentTask.cau_truc_diem;
// //     let diemP1 = 0, diemP2 = 0, diemP3 = 0;
// //     let strLogP1 = "", strLogP2 = "", strLogP3 = "";

// //     // ----- CHẤM PHẦN 1 -----
// //     if (cauTruc.p1_so_cau > 0) {
// //         let bl_p1 = dataQuet.bai_lam_p1 || "";
// //         let da_p1 = dapAnGoc.dap_an_p1 || "";
// //         for (let i = 0; i < cauTruc.p1_so_cau; i++) {
// //             let chon = bl_p1.charAt(i) || "-";
// //             let dung = da_p1.charAt(i);
// //             if (chon !== '-' && chon === dung) diemP1 += cauTruc.p1_diem_moi_cau;
// //             strLogP1 += `${i + 1})${chon} `;
// //         }
// //         document.getElementById('txt_chitiet_p1').value = strLogP1.trim();
// //         document.getElementById('kq_chitiet_p1').style.display = 'block';
// //     }

// //     // ----- CHẤM PHẦN 2 -----
// //     if (cauTruc.p2_so_cau > 0) {
// //         let bl_p2 = dataQuet.bai_lam_p2 || [];
// //         let da_p2 = dapAnGoc.dap_an_p2 || [];
// //         let baremP2 = cauTruc.p2_diem_muc_do;
// //         for (let i = 0; i < cauTruc.p2_so_cau; i++) {
// //             let chon4Y = bl_p2[i] || "----";
// //             let dung4Y = da_p2[i] || "----";
// //             let soYRight = 0;
// //             for (let sub = 0; sub < 4; sub++) {
// //                 let c = chon4Y.charAt(sub);
// //                 let d = dung4Y.charAt(sub);
// //                 if (c && d && c === d && d !== '-') soYRight++;
// //             }
// //             if (soYRight > 0 && soYRight <= 4) diemP2 += baremP2[soYRight - 1];
// //             strLogP2 += `${i + 1})${chon4Y} `;
// //         }
// //         document.getElementById('txt_chitiet_p2').value = strLogP2.trim();
// //         document.getElementById('kq_chitiet_p2').style.display = 'block';
// //     }

// //     // ----- CHẤM PHẦN 3 -----
// //     if (cauTruc.p3_so_cau > 0) {
// //         let bl_p3 = dataQuet.bai_lam_p3 || [];
// //         let da_p3 = dapAnGoc.dap_an_p3 || [];
// //         for (let i = 0; i < cauTruc.p3_so_cau; i++) {
// //             let rawChon = bl_p3[i] || "";
// //             let chon = String(rawChon).replace(/\s/g, '').replace(/\./g, ',');
// //             let dung = String(da_p3[i] || "").replace(/\s/g, '').replace(/\./g, ',');
// //             if (chon !== "" && dung !== "" && chon === dung) diemP3 += cauTruc.p3_diem_moi_cau;

// //             strLogP3 += `${i + 1})[${rawChon === "" ? "-" : rawChon}] `;
// //         }
// //         document.getElementById('txt_chitiet_p3').value = strLogP3.trim();
// //         document.getElementById('kq_chitiet_p3').style.display = 'block';
// //     }

// //     // TỔNG HỢP UI
// //     diemP1 = Math.round(diemP1 * 100) / 100;
// //     diemP2 = Math.round(diemP2 * 100) / 100;
// //     diemP3 = Math.round(diemP3 * 100) / 100;
// //     let tongDiem = Math.round((diemP1 + diemP2 + diemP3) * 100) / 100;

// //     document.getElementById('kq_diem_p1').innerText = diemP1;
// //     document.getElementById('kq_diem_p2').innerText = diemP2;
// //     document.getElementById('kq_diem_p3').innerText = diemP3;

// //     // Hiệu ứng giật điểm cho sinh động
// //     let diemEl = document.getElementById('kq_tong_diem');
// //     diemEl.style.transform = 'scale(1.2)';
// //     diemEl.innerText = tongDiem.toFixed(2);
// //     setTimeout(() => { diemEl.style.transform = 'scale(1)'; }, 200);

// //     if (status) {
// //         status.innerText = "✅ Đã chấm xong (Có thể sửa điểm thủ công)!";
// //         status.style.background = "#28a745";
// //     }

// //     btnLuu.disabled = false;
// //     btnLuu.style.opacity = '1';
// //     btnLuu.onclick = function () {
// //         // LƯU ĐÚNG CÁI DATA ĐÃ ĐƯỢC CHỈNH SỬA VÀO CSDL
// //         window.ham_24_9b_luu_ket_qua_vao_db(dataQuet.so_bao_danh, maDeQuet, tongDiem, diemP1, diemP2, diemP3, dataQuet);
// //     };
// // };



// // ==============================================================================
// // KHỐI 24.9: HIỂN THỊ KẾT QUẢ ĐỌC LÊN GIAO DIỆN (UI)
// // ==============================================================================
// window.ham_24_9_doi_chieu_va_tinh_diem = function (dataQuet) {
//     if (!dataQuet) return;

//     // 1. Điền Số báo danh
//     let txtSBD = document.getElementById('kq_sbd');
//     if (txtSBD) {
//         txtSBD.value = dataQuet.so_bao_danh;

//         // Đổi màu cảnh báo nếu có lỗi tô mờ/nháy đúp (?) hoặc để trống (-)
//         if (dataQuet.so_bao_danh.includes('?') || dataQuet.so_bao_danh.includes('-')) {
//             txtSBD.style.background = "#fff3cd"; // Màu vàng
//             txtSBD.style.border = "2px solid #ffeeba";
//             txtSBD.style.color = "#856404";
//         } else {
//             txtSBD.style.background = "#fff0f1"; // Màu hường mặc định
//             txtSBD.style.border = "2px solid #ffb3ba";
//             txtSBD.style.color = "#dc3545";
//         }
//     }

//     // 2. Mở khóa nút Lưu Bài
//     let btnLuu = document.getElementById('btn_luu_ket_qua');
//     if (btnLuu) {
//         btnLuu.disabled = false;
//         btnLuu.style.opacity = '1';
//     }

//     // (Các phần điền Mã Đề và tính điểm sẽ được code tiếp ở bước sau)
// };










// window.ham_24_9a_hien_canh_bao = function (msg) {
//     let canhBao = document.getElementById('kq_canh_bao');
//     canhBao.innerText = msg;
//     canhBao.style.display = 'block';
//     document.getElementById('kq_tong_diem').innerText = "LỖI";

//     let status = document.getElementById('omr_camera_status');
//     if (status) {
//         status.innerText = "⚠️ Có lỗi khi nhận dạng!";
//         status.style.background = "#ffc107";
//         status.style.color = "#000";
//     }
// };

// window.ham_24_9b_luu_ket_qua_vao_db = async function (sbd, maDe, tongDiem, p1, p2, p3, rawData) {
//     try {
//         Swal.fire({ title: 'Đang lưu...', didOpen: () => Swal.showLoading() });
//         // (Bước tiếp theo ta sẽ kết nối bảng `omr_ket_qua` ở đây)
//         setTimeout(() => {
//             Swal.fire({
//                 toast: true,
//                 position: 'top-end',
//                 icon: 'success',
//                 title: `Đã lưu điểm ${tongDiem} cho SBD ${sbd}`,
//                 showConfirmButton: false,
//                 timer: 2000
//             });
//             document.getElementById('btn_luu_ket_qua').disabled = true;
//             document.getElementById('btn_luu_ket_qua').style.opacity = '0.5';
//         }, 800);
//     } catch (err) {
//         Swal.fire('Lỗi', err.message, 'error');
//     }
// };



// // ==============================================================================
// // KHỐI PARSER: PHÂN TÍCH CHUỖI DO GIÁO VIÊN SỬA BẰNG TAY VÀ TÍNH LẠI ĐIỂM
// // ==============================================================================
// window.ham_24_9c_cap_nhat_tu_giao_dien = function () {
//     if (!window.OMR_CurrentScannedData) return;

//     let cauTruc = window.OMR_CurrentTask.cau_truc_diem;
//     let sbd = document.getElementById('kq_sbd').value.trim();
//     let maDe = document.getElementById('kq_made').value.trim();

//     let strP1 = document.getElementById('txt_chitiet_p1') ? document.getElementById('txt_chitiet_p1').value : "";
//     let strP2 = document.getElementById('txt_chitiet_p2') ? document.getElementById('txt_chitiet_p2').value : "";
//     let strP3 = document.getElementById('txt_chitiet_p3') ? document.getElementById('txt_chitiet_p3').value : "";

//     // 1. Phân tích Phần 1 (Tìm cụm: 1)A, 2)B...)
//     let bl_p1 = "";
//     if (cauTruc.p1_so_cau > 0) {
//         for (let i = 1; i <= cauTruc.p1_so_cau; i++) {
//             let match = strP1.match(new RegExp(i + "\\)\\s*([A-D\\-])", "i"));
//             bl_p1 += match ? match[1].toUpperCase() : "-";
//         }
//     }

//     // 2. Phân tích Phần 2 (Tìm cụm: 1)ĐSĐS, 2)ĐĐ-S... Chấp nhận chữ D không dấu)
//     let bl_p2 = [];
//     if (cauTruc.p2_so_cau > 0) {
//         for (let i = 1; i <= cauTruc.p2_so_cau; i++) {
//             let match = strP2.match(new RegExp(i + "\\)\\s*([ĐS\\-D]{1,4})", "i"));
//             let val = match ? match[1].toUpperCase().replace(/D/g, 'Đ') : "";
//             val = (val + "----").substring(0, 4); // Bù thiếu dấu -
//             bl_p2.push(val);
//         }
//     }

//     // 3. Phân tích Phần 3 (Tìm cụm nằm trong ngoặc vuông: 1)[23], 2)[-1,5]...)
//     let bl_p3 = [];
//     if (cauTruc.p3_so_cau > 0) {
//         for (let i = 1; i <= cauTruc.p3_so_cau; i++) {
//             let match = strP3.match(new RegExp(i + "\\)\\[([^\\]]*)\\]"));
//             let val = match ? match[1].trim() : "";
//             if (val === "-") val = ""; // Trả về rỗng nếu Thầy gõ dấu trừ trống
//             bl_p3.push(val);
//         }
//     }

//     // Cập nhật ngược lại vào Object Data
//     window.OMR_CurrentScannedData.so_bao_danh = sbd;
//     window.OMR_CurrentScannedData.ma_de = maDe;
//     window.OMR_CurrentScannedData.bai_lam_p1 = bl_p1;
//     window.OMR_CurrentScannedData.bai_lam_p2 = bl_p2;
//     window.OMR_CurrentScannedData.bai_lam_p3 = bl_p3;

//     // Gọi hàm Tính Điểm quét lại toàn bộ dữ liệu vừa sửa
//     window.ham_24_9_doi_chieu_va_tinh_diem(window.OMR_CurrentScannedData);
// };



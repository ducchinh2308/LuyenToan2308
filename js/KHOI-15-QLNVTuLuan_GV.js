// ==============================================================================
// KHỐI 15: GIÁO VIÊN CHẤM BÀI TỰ LUẬN (SOAT ẢNH & VÀO ĐIỂM)
// ==============================================================================

// Hàm 15.1: Mở Popup chấm bài chi tiết cho 1 học sinh
// Dữ liệu truyền vào: ID dòng ket_qua_thi, Tên học sinh, và Object chi_tiet_lam_bai
window.ham_15_1_mo_giao_dien_cham_tu_luan = function (idKetQuaThi, tenHocSinh, chiTietLamBai, diemCu = '') {
    // Trích xuất mảng link ảnh
    let danhSachAnh = [];
    if (chiTietLamBai && chiTietLamBai.danh_sach_link_anh) {
        danhSachAnh = chiTietLamBai.danh_sach_link_anh;
    }

    if (danhSachAnh.length === 0) {
        alert("Học sinh này không có ảnh đính kèm bài làm!");
        return;
    }

    // Tạo HTML thư viện ảnh cuộn ngang
    let htmlGallery = '';
    danhSachAnh.forEach((link, idx) => {
        htmlGallery += `
            <div style="min-width: 100%; height: 500px; display: flex; align-items: center; justify-content: center; background: #333; scroll-snap-align: start;">
                <img src="${link}" style="max-width: 100%; max-height: 100%; object-fit: contain; cursor: pointer;" title="Bấm vào để phóng to/mở tab mới" onclick="window.open('${link}', '_blank')">
            </div>
            <div style="position:absolute; top: 10px; right: 20px; background: rgba(0,0,0,0.6); color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">Ảnh ${idx + 1}/${danhSachAnh.length}</div>
        `;
    });

    // Tạo Popup Giao diện
    const overlay = document.createElement('div');
    overlay.id = "popup_cham_tu_luan";
    overlay.style = "position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.8); z-index: 9999; display: flex; align-items: center; justify-content: center;";
    
    overlay.innerHTML = `
        <div style="background: #fff; width: 95%; max-width: 1000px; height: 90vh; border-radius: 8px; display: flex; flex-direction: column; overflow: hidden; font-family: Arial, sans-serif;">
            
            <div style="background: #6f42c1; color: white; padding: 15px 20px; display: flex; justify-content: space-between; align-items: center;">
                <h3 style="margin: 0; font-size: 16px;">📝 Đang chấm bài của: <span style="color: #ffc107; font-weight: 900;">${tenHocSinh}</span></h3>
                <button onclick="document.getElementById('popup_cham_tu_luan').remove()" style="background: transparent; border: none; color: white; font-size: 20px; cursor: pointer;">✖</button>
            </div>

            <div style="display: flex; flex: 1; overflow: hidden;">
                
                <div style="flex: 2; border-right: 1px solid #ccc; position: relative; display: flex; overflow-x: auto; scroll-snap-type: x mandatory; background: #222;" id="gallery_anh_hs">
                    ${htmlGallery}
                </div>

                <div style="flex: 1; padding: 20px; background: #f8f9fa; display: flex; flex-direction: column; gap: 15px; overflow-y: auto;">
                    <div>
                        <label style="font-weight: bold; color: #333; font-size: 14px; display: block; margin-bottom: 5px;">🎯 Điểm số (Hệ 10):</label>
                        <input type="number" id="diem_tu_luan" value="${diemCu}" step="0.25" min="0" max="10" placeholder="VD: 8.5" style="width: 100%; padding: 12px; font-size: 20px; font-weight: bold; color: #dc3545; border: 2px solid #ced4da; border-radius: 6px; text-align: center;">
                    </div>
                    
                    <div style="flex: 1; display: flex; flex-direction: column;">
                        <label style="font-weight: bold; color: #333; font-size: 14px; display: block; margin-bottom: 5px;">✍️ Lời nhận xét (Không bắt buộc):</label>
                        <textarea id="nhan_xet_tu_luan" placeholder="Ghi chú lỗi sai hoặc lời khen cho học sinh..." style="width: 100%; flex: 1; min-height: 150px; padding: 10px; border: 1px solid #ced4da; border-radius: 6px; resize: none; font-family: inherit; font-size: 14px;"></textarea>
                    </div>

                    <button onclick="ham_15_2_luu_ket_qua_cham('${idKetQuaThi}')" style="padding: 15px; background: #28a745; color: white; border: none; border-radius: 6px; font-weight: bold; font-size: 16px; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#218838'" onmouseout="this.style.background='#28a745'">
                        💾 LƯU ĐIỂM & CHỐT BÀI
                    </button>
                    <p style="font-size: 11px; color: #777; text-align: center; margin: 0;">Lưu ý: Bạn có thể cuộn ngang khung ảnh bên trái để xem các trang tiếp theo.</p>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);
};

// Hàm 15.2: Lưu điểm vào Database Supabase
window.ham_15_2_luu_ket_qua_cham = async function (idKetQuaThi) {
    const diemInput = document.getElementById('diem_tu_luan').value.trim();
    const nhanXet = document.getElementById('nhan_xet_tu_luan').value.trim();

    if (diemInput === "") {
        alert("⚠️ Vui lòng nhập điểm cho học sinh trước khi lưu!");
        document.getElementById('diem_tu_luan').focus();
        return;
    }

    try {
        // Lấy lại chi tiết bài làm cũ để ghép thêm phần nhận xét vào
        const { data: currentData, error: errFetch } = await _supabase.from('ket_qua_thi').select('chi_tiet_lam_bai').eq('id', idKetQuaThi).single();
        if (errFetch) throw errFetch;

        let metadataMoi = currentData.chi_tiet_lam_bai || {};
        metadataMoi.nhan_xet_cua_gv = nhanXet;
        metadataMoi.thoi_gian_cham = new Date().toISOString();

        // Cập nhật lại dòng điểm
        const { error: errUpdate } = await _supabase.from('ket_qua_thi').update({
            tong_diem: parseFloat(diemInput),
            trang_thai_cham: 1, // Đổi cờ thành "Đã chấm"
            chi_tiet_lam_bai: metadataMoi
        }).eq('id', idKetQuaThi);

        if (errUpdate) throw errUpdate;

        // Báo thành công và đóng Popup
        alert("✅ Đã lưu điểm thành công!");
        document.getElementById('popup_cham_tu_luan').remove();
        
        // Cập nhật lại giao diện Thống kê (Nạp lại dữ liệu) nếu cần
        if(typeof ham_7_8_xem_thong_ke === 'function') {
            // Giả lập click nạp lại danh sách (Tuỳ thuộc vào tên hàm Thống kê thực tế của thầy)
            console.log("Cần làm mới lại bảng thống kê...");
        }

    } catch (error) {
        alert("❌ Lỗi khi lưu điểm: " + error.message);
    }
};

// =====================================================================
// KHU VỰC 2: CẤU HÌNH GIAO ĐỀ TỰ LUẬN (Nhúng vào Khối 7)
// =====================================================================

// Hàm 15.3: Trả về chuỗi HTML Giao diện cấu hình tự luận (Đã thêm lựa chọn Ảnh)
window.ham_15_3_html_khu_vuc_tao_tu_luan = function() {
    return `
        <div id="khu_vuc_tu_luan" style="display: none; background: #f8f9fa; padding: 15px; border-radius: 8px; border: 1px dashed #17a2b8; margin-bottom: 15px;">
            <label style="font-weight: bold; color: #17a2b8; font-size: 13px;">📝 NGUỒN ĐỀ BÀI TỰ LUẬN:</label>
            <div style="margin-top: 10px; display: flex; gap: 20px; font-size: 14px; font-weight: bold; color: #495057; flex-wrap: wrap;">
                <label style="cursor: pointer;">
                    <input type="radio" name="loai_de_tu_luan" value="hoc_lieu" checked onchange="ham_15_5_doi_nguon_tu_luan()"> 
                    📄 Dùng file PDF
                </label>
                <label style="cursor: pointer;">
                    <input type="radio" name="loai_de_tu_luan" value="van_ban" onchange="ham_15_5_doi_nguon_tu_luan()"> 
                    ✍️ Gõ đề trực tiếp
                </label>
                <label style="cursor: pointer;">
                    <input type="radio" name="loai_de_tu_luan" value="hinh_anh" onchange="ham_15_5_doi_nguon_tu_luan()"> 
                    📸 Giao bằng Ảnh
                </label>
            </div>
            
            <div id="khung_nhap_text_tu_luan" style="display: none; margin-top: 15px;">
                <textarea id="text_de_tu_luan" placeholder="Ví dụ: Các em làm bài 1, 2, 3 trang 45 SGK..." style="width: 100%; height: 100px; padding: 10px; border: 1px solid #ced4da; border-radius: 6px; font-family: inherit; font-size: 14px; resize: vertical;"></textarea>
            </div>

            <div id="khung_upload_anh_de" style="display: none; margin-top: 15px;">
                <input type="file" id="input_anh_de_tu_luan" accept="image/*" onchange="ham_15_7_upload_anh_de_len_drive(this)" style="padding: 10px; border: 1px dashed #6f42c1; width: 100%; border-radius: 6px; background: #fff;">
                <div id="preview_anh_de" style="margin-top: 10px;"></div>
            </div>
        </div>
    `;
};
// Hàm 15.4: Bật/Tắt khu vực tự luận khi thay đổi Combobox Loại nhiệm vụ
window.ham_15_4_doi_loai_nhiem_vu = function() {
    const loaiNhiemVu = document.getElementById('add_nv_loai');
    const khuVucTuLuan = document.getElementById('khu_vuc_tu_luan');
    const cbHocLieu = document.getElementById('add_nv_maHL'); 
    
    if (!loaiNhiemVu || !khuVucTuLuan) return;

    if (loaiNhiemVu.value === 'Tự luận (Nộp ảnh)') {
        khuVucTuLuan.style.display = 'block'; 
        ham_15_5_doi_nguon_tu_luan(); // Chạy lại check nguồn
    } else {
        khuVucTuLuan.style.display = 'none'; 
        if(cbHocLieu) cbHocLieu.parentElement.style.display = 'flex'; // Khôi phục lại ô chọn Học liệu
    }
};

// Cập nhật hàm đổi nguồn để hiện khung Upload
window.ham_15_5_doi_nguon_tu_luan = function() {
    const nguonChon = document.querySelector('input[name="loai_de_tu_luan"]:checked').value;
    document.getElementById('khung_nhap_text_tu_luan').style.display = (nguonChon === 'van_ban' ? 'block' : 'none');
    document.getElementById('khung_upload_anh_de').style.display = (nguonChon === 'hinh_anh' ? 'block' : 'none');
    
    const cbHocLieu = document.getElementById('add_nv_maHL');
    if(cbHocLieu) cbHocLieu.parentElement.style.display = (nguonChon === 'hoc_lieu' ? 'flex' : 'none');
};



// Hàm 15.6: Lấy dữ liệu và bắt lỗi khi nhấn nút "Lưu Nhiệm Vụ" (Đã bổ sung xử lý Ảnh)
window.ham_15_6_lay_du_lieu_tu_luan_de_luu = function(maHocLieuHienTai) {
    const nguonDe = document.querySelector('input[name="loai_de_tu_luan"]:checked');
    if (!nguonDe) return { error: "Không tìm thấy cấu hình tự luận" };

    // 1. Trường hợp Gõ văn bản
    if (nguonDe.value === 'van_ban') {
        const noiDungText = document.getElementById('text_de_tu_luan').value.trim();
        if (!noiDungText) return { error: "Thầy chưa nhập nội dung đề bài tự luận!" };
        return { maHocLieu: null, metadata: { kieu_de_tu_luan: "van_ban", noi_dung_de: noiDungText } };
    } 
    
    // 2. Trường hợp Giao bằng Ảnh
    else if (nguonDe.value === 'hinh_anh') {
        const previewImg = document.getElementById('preview_anh_de').querySelector('img');
        const urlAnhDe = previewImg ? previewImg.getAttribute('data-url-de') : null;
        
        if (!urlAnhDe) return { error: "Thầy chưa tải ảnh đề bài lên hệ thống!" };
        return { maHocLieu: null, metadata: { kieu_de_tu_luan: "hinh_anh", url_de: urlAnhDe } };
    } 
    
    // 3. Trường hợp Dùng file PDF (Học liệu)
    else {
        if (!maHocLieuHienTai || maHocLieuHienTai === "KHONG_DUNG") {
            return { error: "Thầy vui lòng chọn 1 Học liệu (PDF) để làm đề tự luận!" };
        }
        return { maHocLieu: maHocLieuHienTai, metadata: { kieu_de_tu_luan: "hoc_lieu" } };
    }
};


// Hàm xử lý upload ảnh đề lên Drive (Tận dụng ngay cái Cổng Web App thầy đã làm)
window.ham_15_7_upload_anh_de_len_drive = async function(input) {
    const file = input.files[0];
    const preview = document.getElementById('preview_anh_de');
    preview.innerHTML = "⏳ Đang tải đề lên...";
    
    // Tận dụng lại hàm nén ảnh từ Khối 16
    const { base64Data, mimeType } = await ham_16_3_nen_anh_thanh_base64(file);
    
    const response = await fetch(URL_GOOGLE_SCRIPT_NHAN_ANH, {
        method: "POST",
        body: JSON.stringify({ name: "DeBai_" + Date.now() + ".jpg", mimeType: mimeType, data: base64Data })
    });
    const result = await response.json();
    
    if (result.status === "success") {
        //preview.innerHTML = `<img src="${result.url}" style="max-width:200px; border:1px solid #ccc; border-radius:4px;" data-url-de="${result.url}">`;
        // Đảm bảo trong hàm upload ảnh đề (Bước 2 của phần trước), thầy set attribute như thế này:
        preview.innerHTML = `<img src="${result.url}" style="max-width:200px; border:1px solid #ccc; border-radius:4px;" data-url-de="${result.url}">`;
    }
};



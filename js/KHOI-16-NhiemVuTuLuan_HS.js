// ==============================================================================
// KHỐI 16: HỌC SINH LÀM BÀI VÀ NỘP BÀI TỰ LUẬN (CHỤP ẢNH)
// ==============================================================================

const URL_GOOGLE_SCRIPT_NHAN_ANH = "https://script.google.com/macros/s/AKfycbyy0lO1_GyuDiPjPylb9lEIFVH3hGgtfZeH3NpX5usk5h7zjTbY4iEjto8ld-OwhpY9fQ/exec";

const TuLuanHS_State = {
    maNhiemVu: null,
    uidHocSinh: null,
    linkAnhDaUpload: [],
    batDauLuc: null
};

// Hàm 16.1: Giao diện chính Phòng thi Tự luận
window.ham_16_1_mo_phong_thi_tu_luan = async function (nhiemVuData, uidHocSinh) {
    TuLuanHS_State.maNhiemVu = nhiemVuData.ma_nhiem_vu;
    TuLuanHS_State.uidHocSinh = uidHocSinh;
    TuLuanHS_State.linkAnhDaUpload = [];
    TuLuanHS_State.batDauLuc = new Date().toISOString();

    const app = document.getElementById('app'); 
    let htmlDeBai = `<div style="padding: 20px; background: #fff3cd; border: 1px solid #ffeeba; border-radius: 6px; color: #856404; font-weight: bold; text-align: center;">Đang tải cấu trúc đề...</div>`;
    
    if (nhiemVuData.ma_hoc_lieu) {
        htmlDeBai = `
            <div style="padding: 15px; background: #e8f4fd; border: 1px solid #b8daff; border-radius: 6px; text-align: center;">
                <p style="margin: 0 0 10px 0; color: #0056b3; font-weight: bold;">Đề bài được đính kèm bằng File Học Liệu</p>
                <button onclick="alert('Mở file PDF: ${nhiemVuData.ma_hoc_lieu}')" style="padding: 8px 20px; background: #1a73e8; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer;">
                    📄 MỞ XEM ĐỀ BÀI (PDF)
                </button>
            </div>`;
    } else if (nhiemVuData.metadata && nhiemVuData.metadata.kieu_de_tu_luan === 'van_ban') {
        htmlDeBai = `
            <div style="padding: 15px; background: white; border: 1px solid #dee2e6; border-radius: 6px; font-size: 15px; line-height: 1.6;">
                <h4 style="margin-top: 0; color: #d35400;">📝 NỘI DUNG ĐỀ BÀI:</h4>
                <div style="white-space: pre-wrap;">${nhiemVuData.metadata.noi_dung_de}</div>
            </div>`;
    }
    else if (nhiemVuData.metadata && nhiemVuData.metadata.kieu_de_tu_luan === 'hinh_anh') {
        htmlDeBai = `
            <div style="text-align: center;">
                <p style="font-weight:bold; color: #6f42c1;">🖼️ ĐỀ BÀI (Dạng ảnh):</p>
                <img src="${nhiemVuData.metadata.url_de}" style="max-width: 100%; border-radius: 8px; border: 1px solid #ccc;">
            </div>`;
    }
    app.innerHTML = `
        <div style="max-width: 800px; margin: 0 auto; padding: 20px; background: #f0f2f5; min-height: 100vh;">
            <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); margin-bottom: 20px;">
                <h2 style="color: #6f42c1; margin-top: 0; text-align: center;">${nhiemVuData.ten_nhiem_vu}</h2>
                <div style="margin-bottom: 25px;">${htmlDeBai}</div>
            </div>

            <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border: 2px dashed #0056b3; text-align: center;">
                <h3 style="color: #0056b3; margin-top: 0;">📷 NỘP BÀI LÀM TỰ LUẬN</h3>
                <p style="font-size: 13px; color: #666; margin-bottom: 20px;">
                    Em hãy viết bài ra giấy, chụp lại thật rõ nét rồi tải lên nhé.
                </p>
                <input type="file" id="input_anh_tu_luan" accept="image/*" capture="environment" style="display: none;" onchange="ham_16_2_xu_ly_chon_anh(this)">
                <button onclick="document.getElementById('input_anh_tu_luan').click()" style="padding: 12px 25px; background: #28a745; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; font-size: 15px;">
                    📸 MỞ CAMERA / CHỌN ẢNH
                </button>
                <div id="luoi_anh_da_nop" style="display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; margin-top: 20px;"></div>
            </div>

            <div style="margin-top: 20px; text-align: center;">
                <button id="btn_nop_bai_chinh_thuc" onclick="ham_16_4_nop_bai_ve_supabase()" style="padding: 15px 40px; background: #dc3545; color: white; border: none; border-radius: 8px; font-weight: 900; cursor: pointer; font-size: 16px; width: 100%; max-width: 400px;">
                    🚀 HOÀN THÀNH & GỬI BÀI CHO THẦY
                </button>
            </div>
        </div>
    `;
};

// Hàm 16.2: Xử lý và Nén ảnh Siêu tốc
window.ham_16_2_xu_ly_chon_anh = async function (inputElement) {
    if (!inputElement.files || inputElement.files.length === 0) return;
    const file = inputElement.files[0];
    const luoiAnh = document.getElementById('luoi_anh_da_nop');
    const btnNop = document.getElementById('btn_nop_bai_chinh_thuc');

    const theAnhTam = document.createElement('div');
    theAnhTam.style = "width: 120px; height: 160px; border: 1px solid #ccc; border-radius: 6px; background: #f8f9fa; display: flex; align-items: center; justify-content: center;";
    theAnhTam.innerHTML = `<span style="font-size: 11px; color: #666; font-weight: bold; text-align:center;">⏳ Đang tải...</span>`;
    luoiAnh.appendChild(theAnhTam);

    btnNop.disabled = true;
    btnNop.innerText = "⏳ ĐANG TẢI ẢNH, VUI LÒNG ĐỢI...";

    try {
        const { base64Data, mimeType } = await ham_16_3_nen_anh_thanh_base64(file);
        const randomName = "TuLuan_" + TuLuanHS_State.uidHocSinh.substring(0, 5) + "_" + Math.random().toString(36).substring(2, 6) + ".jpg";

        const response = await fetch(URL_GOOGLE_SCRIPT_NHAN_ANH, {
            method: "POST",
            body: JSON.stringify({ name: randomName, mimeType: mimeType, data: base64Data })
        });
        const result = await response.json();

        if (result.status === "success") {
            TuLuanHS_State.linkAnhDaUpload.push(result.url);
            theAnhTam.innerHTML = `<img src="${result.url}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 6px;">`;
        } else { throw new Error(result.message); }
    } catch (error) {
        theAnhTam.innerHTML = `<span style="font-size: 11px; color: #dc3545;">❌ Lỗi tải lên</span>`;
    } finally {
        btnNop.disabled = false;
        btnNop.innerText = "🚀 HOÀN THÀNH & GỬI BÀI CHO THẦY";
        inputElement.value = ""; 
    }
};

window.ham_16_3_nen_anh_thanh_base64 = function (file, maxWidth = 1200, maxHeight = 1600, quality = 0.7) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (event) {
            const img = new Image();
            img.src = event.target.result;
            img.onload = function () {
                let width = img.width; let height = img.height;
                if (width > height) { if (width > maxWidth) { height = Math.round((height *= maxWidth / width)); width = maxWidth; } } 
                else { if (height > maxHeight) { width = Math.round((width *= maxHeight / height)); height = maxHeight; } }

                const canvas = document.createElement('canvas');
                canvas.width = width; canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                const base64Data = canvas.toDataURL('image/jpeg', quality).split(',')[1];
                resolve({ base64Data: base64Data, mimeType: 'image/jpeg' });
            };
        };
    });
};

// Hàm 16.4: Ghi Link ảnh nộp về Database
window.ham_16_4_nop_bai_ve_supabase = async function () {
    if (TuLuanHS_State.linkAnhDaUpload.length === 0) return alert("⚠️ Em chưa tải ảnh nào lên!");
    if (!confirm(`Xác nhận nộp ${TuLuanHS_State.linkAnhDaUpload.length} bức ảnh?`)) return;

    document.getElementById('btn_nop_bai_chinh_thuc').innerText = "⏳ ĐANG GHI NHẬN LÊN HỆ THỐNG...";
    try {
        const payloadKQT = {
            ma_nhiem_vu: TuLuanHS_State.maNhiemVu,
            uid_hoc_sinh: TuLuanHS_State.uidHocSinh,
            tong_diem: null, // Chờ chấm
            thoi_gian_nop: new Date().toISOString(),
            trang_thai_cham: 0, 
            chi_tiet_lam_bai: { kieu_bai: "TU_LUAN_ANH", danh_sach_link_anh: TuLuanHS_State.linkAnhDaUpload, thoi_gian_bat_dau: TuLuanHS_State.batDauLuc }
        };

        const { error } = await _supabase.from('ket_qua_thi').insert([payloadKQT]);
        if (error) throw error;

        document.getElementById('app').innerHTML = `<div style="text-align:center; padding: 50px;"><h2 style="color:#28a745;">🎉 NỘP BÀI THÀNH CÔNG!</h2><p>Hệ thống đã lưu ảnh bài làm. Em có thể thoát trang.</p></div>`;
    } catch (error) { alert("Lỗi ghi nhận: " + error.message); }
};
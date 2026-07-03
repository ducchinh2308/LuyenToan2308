// =====================================================================
// 🌟 KHỞI TẠO BIẾN STATE TOÀN CỤC CHO BẢNG TỰ LUẬN
// =====================================================================
window.BangHocLieuTuLuanState = {
    duLieu: [],
    cotDangSort: 'ngay_tao',
    tangDan: false
};

// Hàm bổ trợ: Tạo mã ngẫu nhiên 6 ký tự (Chữ in hoa và số, giống mã đề trắc nghiệm)
function ham_6b_tao_ma_6_ky_tu() {
    const tapKyTu = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let chuoiNgauNhien = '';
    for (let i = 0; i < 6; i++) {
        chuoiNgauNhien += tapKyTu.charAt(Math.floor(Math.random() * tapKyTu.length));
    }
    return chuoiNgauNhien;
}



// =====================================================================
// Hàm 6b.1: Vẽ bộ khung giao diện (Tương tự 6a.1)
// =====================================================================
window.ham_6b_1_ve_quan_ly_hoc_lieu_tu_luan = function () {
    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
    vungLamViec.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <h3 style="margin: 0; color: #28a745;">📚 Quản lý Kho Học Liệu: TỰ LUẬN</h3>
            <div style="display: flex; gap: 15px; align-items: center;">
                <input type="text" id="input-tim-kiem-qlhl-tl" placeholder="Tìm tên, mã đề..." oninput="ham_6b_12_tim_kiem_live(this.value)" style="padding: 10px; border: 1px solid #ccc; border-radius: 6px; width: 250px;">
                <button onclick="ham_6b_2_tai_danh_sach_hoc_lieu_tu_luan()" style="padding: 10px 15px; cursor: pointer;">🔄 Tải lại</button>
                <button onclick="ham_6b_3_toggle_form_them_moi()" style="padding: 10px 15px; background: #28a745; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; box-shadow: 0 2px 4px rgba(40,167,69,0.3);">
                    + Tạo mới
                </button>
            </div>
        </div>
        
        <div id="khu-vuc-tao-moi-tl" style="display:none; margin-bottom: 20px; border: 2px dashed #28a745; padding: 15px; border-radius: 8px; background: #f8fff9;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 10px; border-bottom: 1px solid #c3e6cb; padding-bottom: 10px;">
                <h4 style="margin:0; color: #28a745;">✨ TẠO HỌC LIỆU TỰ LUẬN MỚI</h4>
                <button onclick="document.getElementById('khu-vuc-tao-moi-tl').style.display='none'" style="background:none; border:none; color:#dc3545; cursor:pointer; font-weight:bold; font-size: 14px;">✖ Đóng form</button>
            </div>
            <div id="form-render-tu-luan">Đang tải form...</div>
        </div>

        <div id="danh-sach-hl-tl-render"><p style="text-align: center; padding: 30px; font-weight: bold; color: #28a745;">⏳ Đang tải dữ liệu Tự luận...</p></div>
    `;
    ham_6b_2_tai_danh_sach_hoc_lieu_tu_luan();
};


// =====================================================================
// Hàm 6b.3: Bật/Tắt Form tạo mới (Gọi trực tiếp hàm 15.3 có sẵn)
// =====================================================================
window.ham_6b_3_toggle_form_them_moi = async function () {
    const khuVuc = document.getElementById('khu-vuc-tao-moi-tl');
    if (khuVuc.style.display === 'none') {
        khuVuc.style.display = 'block';
        // Nhúng cái form thầy/cô hay tạo đề bài vào đây
        const htmlForm = await window.ham_6b_3_html_khu_vuc_tao_hoc_lieu_tu_luan();
        document.getElementById('form-render-tu-luan').innerHTML = htmlForm;
    } else {
        khuVuc.style.display = 'none';
    }
};


// =====================================================================
// Hàm 6b.2: Tải dữ liệu từ bảng mới và ghép tên Giáo viên tạo
// =====================================================================
window.ham_6b_2_tai_danh_sach_hoc_lieu_tu_luan = async function () {
    const renderArea = document.getElementById('danh-sach-hl-tl-render');
    try {
        const { data: dsHocLieu, error } = await _supabase.from('hoc_lieu_tu_luan').select('*');
        if (error) throw error;

        // Bổ sung: Lấy tên giáo viên tạo
        const danhSachUidGv = [...new Set((dsHocLieu || []).map(hl => hl.uid_gv_tao).filter(id => id))];
        let tuDienTenGv = {};

        if (danhSachUidGv.length > 0) {
            const { data: dsGv } = await _supabase.from('hoc_sinh').select('uid, ten').in('uid', danhSachUidGv);
            if (dsGv) {
                dsGv.forEach(gv => tuDienTenGv[gv.uid] = gv.ten);
            }
        }

        // Gắn tên giáo viên vào dữ liệu
        window.BangHocLieuTuLuanState.duLieu = (dsHocLieu || []).map(hl => ({
            ...hl,
            ten_gv_tao: tuDienTenGv[hl.uid_gv_tao] || 'Không xác định'
        }));

        ham_6b_10_ve_bang_hoc_lieu_tu_luan();

    } catch (error) {
        // 🌟 CHẶN LỖI: Chỉ chèn HTML báo lỗi nếu đang ở màn hình Quản lý học liệu
        if (renderArea) {
            renderArea.innerHTML = `<p style="color: red; text-align: center;">❌ Lỗi tải dữ liệu: ${error.message}</p>`;
        } else {
            console.error("Lỗi tải dữ liệu:", error.message);
        }
    }
};


// --- [BẢN SẠCH SẼ - HẾT LỒNG KHUNG] Hàm 6b.3: Giao diện Tạo Học Liệu Tự luận ---
window.ham_6b_3_html_khu_vuc_tao_hoc_lieu_tu_luan = async function () {
    let htmlOptionsHL = `<option value="KHONG_DUNG">[ --- Chọn Học liệu tự luận (File/Văn bản) --- ]</option>`;

    try {
        const { data: dataHL } = await _supabase
            .from('hoc_lieu_tu_luan')
            .select('ma_hoc_lieu, ten_hoc_lieu, metadata')
            .order('ngay_tao', { ascending: false });

        if (dataHL) {
            window.tempDsHocLieuTuLuan = dataHL;
            dataHL.forEach(hl => {
                const meta = typeof hl.metadata === 'string' ? JSON.parse(hl.metadata || '{}') : (hl.metadata || {});
                const isText = meta.loai_tu_luan === 'text' || meta.kieu_de_tu_luan === 'van_ban';
                htmlOptionsHL += `<option value="${hl.ma_hoc_lieu}">${isText ? '✍️' : '📁'} [${hl.ma_hoc_lieu}] - ${hl.ten_hoc_lieu}</option>`;
            });
        }
    } catch (err) { }

    const maHL_MacDinh = "HL_TL_" + ham_6b_tao_ma_6_ky_tu();

    // 🌟 CHỈ TRẢ VỀ CÁC Ô NHẬP LIỆU - KHÔNG CÓ TIÊU ĐỀ NÀO NỮA
    return `
        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 15px; margin-bottom: 15px;">
            <div>
                <label style="font-size: 13px; font-weight:bold; color: #333;">Tên học liệu (*):</label>
                <input type="text" id="tao_hl_ten" placeholder="Ví dụ: Đề thi khảo sát chất lượng..." style="width: 100%; padding: 10px; border: 1px solid #ced4da; border-radius: 4px; margin-top: 5px; box-sizing: border-box;">
            </div>
            <div>
                <label style="font-size: 13px; font-weight:bold; color: #333;">Mã học liệu:</label>
                <input type="text" id="tao_hl_ma" value="${maHL_MacDinh}" disabled style="width: 100%; padding: 10px; border: 1px solid #ced4da; border-radius: 4px; background: #e9ecef; margin-top: 5px; color: #495057; font-weight:bold; box-sizing: border-box;">
            </div>
        </div>

        <div style="background: #f8f9fa; border: 1px solid #ced4da; border-radius: 6px; padding: 15px; margin-bottom: 20px;">
            <label style="font-weight: bold; color: #17a2b8; font-size: 14px; margin-bottom: 10px; display: block;">📝 PHẦN 1: ĐỀ BÀI (*)</label>
            <div style="margin-bottom: 15px; display: flex; gap: 20px; font-weight: bold; color: #495057;">
                <label style="cursor: pointer;"><input type="radio" name="loai_de_tu_luan" value="file" checked onchange="ham_6b_5_doi_nguon_tu_luan()"> 📂 Tải File lên</label>
                <label style="cursor: pointer;"><input type="radio" name="loai_de_tu_luan" value="text" onchange="ham_6b_5_doi_nguon_tu_luan()"> ✍️ Soạn nội dung mới</label>
            </div>
            
            <div id="khung_de_file" style="display: block; margin-top: 5px;">
                <label style="display: flex; align-items: center; width: 100%; border: 1px dashed #17a2b8; border-radius: 6px; background: #f8f9fa; padding: 10px; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#e9ecef'" onmouseout="this.style.background='#f8f9fa'">
                    
                    <span style="background: #17a2b8; color: white; padding: 6px 12px; border-radius: 4px; font-weight: bold; font-size: 13px; margin-right: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        📁 Chọn tệp Đề bài
                    </span>
                    
                    <span id="text_hien_thi_de" style="color: #6c757d; font-size: 13px; font-style: italic;">
                        Chưa chọn tệp (Loại file: pdf/word/ảnh. Có thể chọn nhiều ảnh để gộp PDF)
                    </span>
                    
                    <input type="file" id="tao_hl_file_de" accept=".pdf, .doc, .docx, image/*" multiple style="display: none;" onchange="ham_6b_cap_nhat_text_file(this, 'text_hien_thi_de')">
                </label>
            </div>
            <div id="khung_de_text" style="display: none;">
                <textarea id="tao_hl_text_de" placeholder="Gõ nội dung đề bài tại đây..." style="width: 100%; height: 120px; padding: 10px; border: 1px solid #ced4da; border-radius: 4px; resize: vertical; box-sizing: border-box;"></textarea>
            </div>
        </div>

        <div style="background: #fff8e6; border: 1px solid #ffe8a1; border-radius: 6px; padding: 15px; margin-bottom: 20px;">
            <label style="font-weight: bold; color: #d35400; font-size: 14px; margin-bottom: 10px; display: block;">💡 PHẦN 2: BÀI GIẢI (Tùy chọn)</label>
            <div style="margin-bottom: 15px; display: flex; gap: 20px; font-weight: bold; color: #495057;">
                <label style="cursor: pointer;"><input type="radio" name="loai_giai_tu_luan" value="none" checked onchange="ham_6b_5_doi_nguon_tu_luan()"> ❌ Không kèm giải</label>
                <label style="cursor: pointer;"><input type="radio" name="loai_giai_tu_luan" value="file" onchange="ham_6b_5_doi_nguon_tu_luan()"> 📎 Tải File Giải</label>
                <label style="cursor: pointer;"><input type="radio" name="loai_giai_tu_luan" value="text" onchange="ham_6b_5_doi_nguon_tu_luan()"> 📝 Soạn lời giải</label>
            </div>
            
            <div id="khung_giai_file" style="display: none; margin-top: 5px;">
                <label style="display: flex; align-items: center; width: 100%; border: 1px dashed #28a745; border-radius: 6px; background: #f8f9fa; padding: 10px; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#e9ecef'" onmouseout="this.style.background='#f8f9fa'">
                    
                    <span style="background: #28a745; color: white; padding: 6px 12px; border-radius: 4px; font-weight: bold; font-size: 13px; margin-right: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        📎 Chọn tệp Bài giải
                    </span>
                    
                    <span id="text_hien_thi_giai" style="color: #6c757d; font-size: 13px; font-style: italic;">
                        Chưa chọn tệp (Loại file: pdf/word/ảnh. Có thể chọn nhiều ảnh để gộp PDF)
                    </span>
                    
                    <input type="file" id="tao_hl_file_giai" accept=".pdf, .doc, .docx, image/*" multiple style="display: none;" onchange="ham_6b_cap_nhat_text_file(this, 'text_hien_thi_giai')">
                </label>
            </div>
            <div id="khung_giai_text" style="display: none;">
                <textarea id="tao_hl_text_giai" placeholder="Gõ nội dung bài giải tại đây..." style="width: 100%; height: 120px; padding: 10px; border: 1px solid #ffe8a1; border-radius: 4px; resize: vertical; box-sizing: border-box;"></textarea>
            </div>
        </div>

        <button type="button" onclick="ham_6b_9_thuc_thi_upload_drive(this)" style="width: 100%; padding: 14px; background: #fd7e14; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; font-size: 15px; box-shadow: 0 4px 6px rgba(253,126,20,0.3); transition: 0.2s;">🚀 TẢI LÊN HỆ THỐNG</button>
    `;
};


// --- [ĐÃ NÂNG CẤP] Hàm 6b.5: Điều khiển ẩn/hiện 2 khối Đề và Giải ---
window.ham_6b_5_doi_nguon_tu_luan = function () {
    // 1. Lấy trạng thái của Phần Đề
    const kieuDe = document.querySelector('input[name="loai_de_tu_luan"]:checked').value;
    document.getElementById('khung_de_file').style.display = (kieuDe === 'file') ? 'block' : 'none';
    document.getElementById('khung_de_text').style.display = (kieuDe === 'text') ? 'block' : 'none';

    // 2. Lấy trạng thái của Phần Giải
    const kieuGiai = document.querySelector('input[name="loai_giai_tu_luan"]:checked').value;
    document.getElementById('khung_giai_file').style.display = (kieuGiai === 'file') ? 'block' : 'none';
    document.getElementById('khung_giai_text').style.display = (kieuGiai === 'text') ? 'block' : 'none';
};



// // --- [ĐÃ BỔ SUNG THÔNG TIN READONLY] Hàm 6b.6: Mở Form Sửa Học Liệu Tự Luận ---
// window.ham_6b_6_mo_form_sua_hoc_lieu_tu_luan = async function (maHL) {
//     if (!maHL) return alert("❌ Lỗi: Không nhận được mã học liệu!");

//     if (!window.BangHocLieuTuLuanState.duLieu || window.BangHocLieuTuLuanState.duLieu.length === 0) {
//         await window.ham_6b_2_tai_danh_sach_hoc_lieu_tu_luan();
//     }

//     const hl = window.BangHocLieuTuLuanState.duLieu.find(item => String(item.ma_hoc_lieu || '').trim() === String(maHL).trim());
//     if (!hl) return alert("❌ Không tìm thấy thông tin học liệu này!");

//     let meta = {};
//     try { meta = typeof hl.metadata === 'string' ? JSON.parse(hl.metadata || '{}') : (hl.metadata || {}); } catch (e) { }

//     // Đọc trạng thái hiện tại
//     const kieuDe = (meta.loai_tu_luan === 'text' || meta.kieu_de_tu_luan === 'van_ban') ? 'text' : 'file';
//     const kieuGiai = meta.kieu_giai || 'none';

//     // Xử lý các thông tin Readonly (Chỉ đọc)
//     const dangDeText = kieuDe === 'text' ? '✍️ Văn bản' : '📁 File đính kèm';
//     const ngayTao = hl.ngay_tao ? new Date(hl.ngay_tao).toLocaleString('vi-VN') : 'Không rõ';
//     const styleReadOnly = "width:100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; background: #e9ecef; color: #6c757d; cursor: not-allowed; font-weight: bold; margin-top: 5px; box-sizing: border-box;";

//     // UI Phần 1: ĐỀ BÀI
//     const uiPhanDe = `
//         <div style="background: #f8f9fa; border: 1px solid #ced4da; border-radius: 6px; padding: 15px; margin-bottom: 20px;">
//             <label style="font-weight: bold; color: #17a2b8; font-size: 14px; margin-bottom: 10px; display: block;">📝 PHẦN 1: CẬP NHẬT ĐỀ BÀI</label>
            
//             <div style="margin-bottom: 15px; display: flex; gap: 20px; font-weight: bold; color: #495057;">
//                 <label style="cursor: pointer;"><input type="radio" name="sua_kieu_de_tl" value="file" ${kieuDe === 'file' ? 'checked' : ''} onchange="ham_6b_6_doi_nguon_de()"> 📂 Đính kèm File Đề</label>
//                 <label style="cursor: pointer;"><input type="radio" name="sua_kieu_de_tl" value="text" ${kieuDe === 'text' ? 'checked' : ''} onchange="ham_6b_6_doi_nguon_de()"> ✍️ Soạn nội dung Văn bản</label>
//             </div>
            
//             <div id="sua_khung_de_file" style="display: ${kieuDe === 'file' ? 'block' : 'none'}; margin-top: 10px;">
    
//                 ${kieuDe === 'file' && meta.ten_file_goc ? `<div style="font-size: 13px; color: #0056b3; margin-bottom: 8px; padding: 8px 12px; background: #e8f4fd; border-radius: 4px; border-left: 3px solid #17a2b8;">🔄 File Đề hiện tại: <b>${meta.ten_file_goc}</b></div>` : ''}
                
//                 <label style="font-size: 13px; font-weight:bold; color: #495057; display: block; margin-bottom: 6px;">Chọn file ĐỀ mới (Bỏ trống nếu giữ nguyên file cũ):</label>
                
//                 <label style="display: flex; align-items: center; width: 100%; border: 1px dashed #17a2b8; border-radius: 6px; background: #f8f9fa; padding: 10px; cursor: pointer; transition: 0.2s; box-sizing: border-box;" onmouseover="this.style.background='#e9ecef'" onmouseout="this.style.background='#f8f9fa'">
                    
//                     <span style="background: #17a2b8; color: white; padding: 6px 12px; border-radius: 4px; font-weight: bold; font-size: 13px; margin-right: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); white-space: nowrap;">
//                         📁 Chọn tệp Đề mới
//                     </span>
                    
//                     <span id="sua_text_hien_thi_de" style="color: #6c757d; font-size: 13px; font-style: italic;">
//                         Chưa chọn tệp (Loại file: pdf/word/ảnh. Có thể chọn nhiều ảnh để gộp PDF)
//                     </span>
                    
//                     <input type="file" id="sua_file_de_input_tl" accept=".pdf, .doc, .docx, image/*" multiple style="display: none;" onchange="ham_6b_cap_nhat_text_file(this, 'sua_text_hien_thi_de')">
//                 </label>
//             </div>
            
//             <div id="sua_khung_de_text" style="display: ${kieuDe === 'text' ? 'block' : 'none'};">
//                 <label style="font-size: 12px; font-weight:bold;">Nội dung đề bài:</label>
//                 <textarea id="sua_text_de_tl" style="width: 100%; height: 150px; padding: 10px; border: 1px solid #ced4da; border-radius: 4px; resize: vertical; margin-top:3px;">${meta.noi_dung_chinh || ''}</textarea>
//             </div>
//         </div>
//     `;

//     // UI Phần 2: BÀI GIẢI
//     const uiPhanGiai = `
//         <div style="background: #fff8e6; border: 1px solid #ffe8a1; border-radius: 6px; padding: 15px; margin-bottom: 20px;">
//             <label style="font-weight: bold; color: #d35400; font-size: 14px; margin-bottom: 10px; display: block;">💡 PHẦN 2: CẬP NHẬT BÀI GIẢI</label>
            
//             <div style="margin-bottom: 15px; display: flex; gap: 20px; font-weight: bold; color: #495057;">
//                 <label style="cursor: pointer;"><input type="radio" name="sua_kieu_giai_tl" value="none" ${kieuGiai === 'none' ? 'checked' : ''} onchange="ham_6b_6_doi_nguon_giai()"> ❌ Không kèm giải</label>
//                 <label style="cursor: pointer;"><input type="radio" name="sua_kieu_giai_tl" value="file" ${kieuGiai === 'file' ? 'checked' : ''} onchange="ham_6b_6_doi_nguon_giai()"> 📎 Kèm File Giải</label>
//                 <label style="cursor: pointer;"><input type="radio" name="sua_kieu_giai_tl" value="text" ${kieuGiai === 'text' ? 'checked' : ''} onchange="ham_6b_6_doi_nguon_giai()"> 📝 Soạn lời giải</label>
//             </div>
            
//             <div id="sua_khung_giai_file" style="display: ${kieuGiai === 'file' ? 'block' : 'none'}; margin-top: 10px;">
    
//                 ${kieuGiai === 'file' && meta.ten_file_giai ? `<div style="font-size: 13px; color: #155724; margin-bottom: 8px; padding: 8px 12px; background: #d4edda; border-radius: 4px; border-left: 3px solid #28a745;">🔄 File Giải hiện tại: <b>${meta.ten_file_giai}</b></div>` : ''}
                
//                 <label style="font-size: 13px; font-weight:bold; color: #495057; display: block; margin-bottom: 6px;">Chọn file GIẢI mới (Bỏ trống nếu giữ nguyên file cũ):</label>
                
//                 <label style="display: flex; align-items: center; width: 100%; border: 1px dashed #28a745; border-radius: 6px; background: #f8f9fa; padding: 10px; cursor: pointer; transition: 0.2s; box-sizing: border-box;" onmouseover="this.style.background='#e9ecef'" onmouseout="this.style.background='#f8f9fa'">
                    
//                     <span style="background: #28a745; color: white; padding: 6px 12px; border-radius: 4px; font-weight: bold; font-size: 13px; margin-right: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); white-space: nowrap;">
//                         📎 Chọn tệp Giải mới
//                     </span>
                    
//                     <span id="sua_text_hien_thi_giai" style="color: #6c757d; font-size: 13px; font-style: italic;">
//                         Chưa chọn tệp (Loại file: pdf/word/ảnh. Có thể chọn nhiều ảnh để gộp PDF)
//                     </span>
                    
//                     <input type="file" id="sua_file_giai_input_tl" accept=".pdf, .doc, .docx, image/*" multiple style="display: none;" onchange="ham_6b_cap_nhat_text_file(this, 'sua_text_hien_thi_giai')">
//                 </label>
//             </div>
            
//             <div id="sua_khung_giai_text" style="display: ${kieuGiai === 'text' ? 'block' : 'none'};">
//                 <label style="font-size: 12px; font-weight:bold;">Nội dung bài giải:</label>
//                 <textarea id="sua_text_giai_tl" style="width: 100%; height: 100px; padding: 10px; border: 1px solid #ffe8a1; border-radius: 4px; resize: vertical; margin-top:3px;">${meta.noi_dung_giai || ''}</textarea>
//             </div>
//         </div>
//     `;

//     const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
//     vungLamViec.innerHTML = `
//         <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); max-width: 800px; margin: auto; position: relative;">
//             <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #eee; padding-bottom: 10px; margin-bottom: 15px;">
//                 <h3 style="color: #007bff; margin:0;">✏️ Sửa Học Liệu: [${hl.ma_hoc_lieu}]</h3>
//             </div>
            
//             <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px; background: #f8f9fa; padding: 15px; border-radius: 6px; border: 1px solid #e9ecef;">
//                 <div><label style="font-weight:bold; font-size: 12px; color: #495057;">Mã học liệu:</label><input type="text" value="${hl.ma_hoc_lieu}" readonly style="${styleReadOnly}"></div>
//                 <div><label style="font-weight:bold; font-size: 12px; color: #495057;">Dạng đề hiện tại:</label><input type="text" value="${dangDeText}" readonly style="${styleReadOnly}"></div>
//                 <div><label style="font-weight:bold; font-size: 12px; color: #495057;">Giáo viên tạo:</label><input type="text" value="${hl.ten_gv_tao || 'Không xác định'}" readonly style="${styleReadOnly}"></div>
//                 <div><label style="font-weight:bold; font-size: 12px; color: #495057;">Ngày tạo:</label><input type="text" value="${ngayTao}" readonly style="${styleReadOnly}"></div>
//             </div>

//             <div style="margin-bottom: 20px;">
//                 <label style="font-weight:bold; color: #333;">Tên học liệu (*):</label>
//                 <input type="text" id="sua_ten_hl_tl" value="${hl.ten_hoc_lieu || ''}" style="width:100%; padding: 10px; border: 1px solid #ced4da; border-radius: 4px; font-weight:bold; margin-top: 5px; box-sizing: border-box;">
//             </div>
            
//             ${uiPhanDe}
//             ${uiPhanGiai}

//             <div style="text-align: right; border-top: 1px solid #eee; padding-top: 15px; display: flex; justify-content: flex-end; gap: 10px;">
//                 <button onclick="ham_6b_1_ve_quan_ly_hoc_lieu_tu_luan()" style="background:#6c757d; color:white; padding:12px 20px; border:none; border-radius:6px; font-weight:bold; cursor:pointer;">Quay lại</button>
//                 <button onclick="ham_6b_7_luu_sua_hoc_lieu_tu_luan('${maHL}', this)" style="background:#ffc107; color:#333; padding:12px 25px; border:none; border-radius:6px; font-weight:bold; cursor:pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">💾 LƯU CẬP NHẬT</button>
//             </div>
//         </div>
//     `;
// };

// --- [ĐÃ BỔ SUNG THÔNG TIN READONLY + NÚT XEM FILE] Hàm 6b.6: Mở Form Sửa Học Liệu Tự Luận ---
window.ham_6b_6_mo_form_sua_hoc_lieu_tu_luan = async function (maHL) {
    if (!maHL) return alert("❌ Lỗi: Không nhận được mã học liệu!");

    if (!window.BangHocLieuTuLuanState.duLieu || window.BangHocLieuTuLuanState.duLieu.length === 0) {
        await window.ham_6b_2_tai_danh_sach_hoc_lieu_tu_luan();
    }

    const hl = window.BangHocLieuTuLuanState.duLieu.find(item => String(item.ma_hoc_lieu || '').trim() === String(maHL).trim());
    if (!hl) return alert("❌ Không tìm thấy thông tin học liệu này!");

    let meta = {};
    try { meta = typeof hl.metadata === 'string' ? JSON.parse(hl.metadata || '{}') : (hl.metadata || {}); } catch (e) { }

    // Đọc trạng thái hiện tại
    const kieuDe = (meta.loai_tu_luan === 'text' || meta.kieu_de_tu_luan === 'van_ban') ? 'text' : 'file';
    const kieuGiai = meta.kieu_giai || 'none';

    // Xử lý các thông tin Readonly (Chỉ đọc)
    const dangDeText = kieuDe === 'text' ? '✍️ Văn bản' : '📁 File đính kèm';
    const ngayTao = hl.ngay_tao ? new Date(hl.ngay_tao).toLocaleString('vi-VN') : 'Không rõ';
    const styleReadOnly = "width:100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; background: #e9ecef; color: #6c757d; cursor: not-allowed; font-weight: bold; margin-top: 5px; box-sizing: border-box;";

    // ==========================================
    // UI Phần 1: ĐỀ BÀI
    // ==========================================
    let htmlFileDeHienTai = '';
    if (kieuDe === 'file' && meta.ten_file_goc) {
        // TẠO NÚT XEM FILE ĐỀ NẾU CÓ URL
        const nutXemDe = hl.url_github
            ? `<button type="button" onclick="window.open('${hl.url_github}', '_blank')" style="margin-left: 10px; padding: 4px 10px; background: #17a2b8; color: white; border: none; border-radius: 4px; font-size: 12px; font-weight: bold; cursor: pointer; float: right;">👁️ Xem File</button>`
            : `<span style="float: right; color: red; font-size: 11px;">⚠️ Mất link file</span>`;

        htmlFileDeHienTai = `
            <div style="font-size: 13px; color: #0056b3; margin-bottom: 8px; padding: 8px 12px; background: #e8f4fd; border-radius: 4px; border-left: 3px solid #17a2b8; overflow: hidden; display: flex; justify-content: space-between; align-items: center;">
                <span>🔄 File Đề hiện tại: <b>${meta.ten_file_goc}</b></span>
                ${nutXemDe}
            </div>
        `;
    }

    const uiPhanDe = `
        <div style="background: #f8f9fa; border: 1px solid #ced4da; border-radius: 6px; padding: 15px; margin-bottom: 20px;">
            <label style="font-weight: bold; color: #17a2b8; font-size: 14px; margin-bottom: 10px; display: block;">📝 PHẦN 1: CẬP NHẬT ĐỀ BÀI</label>
            
            <div style="margin-bottom: 15px; display: flex; gap: 20px; font-weight: bold; color: #495057;">
                <label style="cursor: pointer;"><input type="radio" name="sua_kieu_de_tl" value="file" ${kieuDe === 'file' ? 'checked' : ''} onchange="ham_6b_6_doi_nguon_de()"> 📂 Đính kèm File Đề</label>
                <label style="cursor: pointer;"><input type="radio" name="sua_kieu_de_tl" value="text" ${kieuDe === 'text' ? 'checked' : ''} onchange="ham_6b_6_doi_nguon_de()"> ✍️ Soạn nội dung Văn bản</label>
            </div>
            
            <div id="sua_khung_de_file" style="display: ${kieuDe === 'file' ? 'block' : 'none'}; margin-top: 10px;">
                ${htmlFileDeHienTai}
                
                <label style="font-size: 13px; font-weight:bold; color: #495057; display: block; margin-bottom: 6px;">Chọn file ĐỀ mới (Bỏ trống nếu giữ nguyên file cũ):</label>
                
                <label style="display: flex; align-items: center; width: 100%; border: 1px dashed #17a2b8; border-radius: 6px; background: #f8f9fa; padding: 10px; cursor: pointer; transition: 0.2s; box-sizing: border-box;" onmouseover="this.style.background='#e9ecef'" onmouseout="this.style.background='#f8f9fa'">
                    <span style="background: #17a2b8; color: white; padding: 6px 12px; border-radius: 4px; font-weight: bold; font-size: 13px; margin-right: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); white-space: nowrap;">
                        📁 Chọn tệp Đề mới
                    </span>
                    <span id="sua_text_hien_thi_de" style="color: #6c757d; font-size: 13px; font-style: italic;">
                        Chưa chọn tệp (Loại file: pdf/word/ảnh. Có thể chọn nhiều ảnh để gộp PDF)
                    </span>
                    <input type="file" id="sua_file_de_input_tl" accept=".pdf, .doc, .docx, image/*" multiple style="display: none;" onchange="ham_6b_cap_nhat_text_file(this, 'sua_text_hien_thi_de')">
                </label>
            </div>
            
            <div id="sua_khung_de_text" style="display: ${kieuDe === 'text' ? 'block' : 'none'};">
                <label style="font-size: 12px; font-weight:bold;">Nội dung đề bài:</label>
                <textarea id="sua_text_de_tl" style="width: 100%; height: 150px; padding: 10px; border: 1px solid #ced4da; border-radius: 4px; resize: vertical; margin-top:3px;">${meta.noi_dung_chinh || ''}</textarea>
            </div>
        </div>
    `;

    // ==========================================
    // UI Phần 2: BÀI GIẢI
    // ==========================================
    let htmlFileGiaiHienTai = '';
    if (kieuGiai === 'file' && meta.ten_file_giai) {
        // TẠO NÚT XEM FILE GIẢI NẾU CÓ URL
        const nutXemGiai = hl.url_file_giai
            ? `<button type="button" onclick="window.open('${hl.url_file_giai}', '_blank')" style="margin-left: 10px; padding: 4px 10px; background: #28a745; color: white; border: none; border-radius: 4px; font-size: 12px; font-weight: bold; cursor: pointer; float: right;">👁️ Xem File</button>`
            : `<span style="float: right; color: red; font-size: 11px;">⚠️ Mất link file</span>`;

        htmlFileGiaiHienTai = `
            <div style="font-size: 13px; color: #155724; margin-bottom: 8px; padding: 8px 12px; background: #d4edda; border-radius: 4px; border-left: 3px solid #28a745; overflow: hidden; display: flex; justify-content: space-between; align-items: center;">
                <span>🔄 File Giải hiện tại: <b>${meta.ten_file_giai}</b></span>
                ${nutXemGiai}
            </div>
        `;
    }

    const uiPhanGiai = `
        <div style="background: #fff8e6; border: 1px solid #ffe8a1; border-radius: 6px; padding: 15px; margin-bottom: 20px;">
            <label style="font-weight: bold; color: #d35400; font-size: 14px; margin-bottom: 10px; display: block;">💡 PHẦN 2: CẬP NHẬT BÀI GIẢI</label>
            
            <div style="margin-bottom: 15px; display: flex; gap: 20px; font-weight: bold; color: #495057;">
                <label style="cursor: pointer;"><input type="radio" name="sua_kieu_giai_tl" value="none" ${kieuGiai === 'none' ? 'checked' : ''} onchange="ham_6b_6_doi_nguon_giai()"> ❌ Không kèm giải</label>
                <label style="cursor: pointer;"><input type="radio" name="sua_kieu_giai_tl" value="file" ${kieuGiai === 'file' ? 'checked' : ''} onchange="ham_6b_6_doi_nguon_giai()"> 📎 Kèm File Giải</label>
                <label style="cursor: pointer;"><input type="radio" name="sua_kieu_giai_tl" value="text" ${kieuGiai === 'text' ? 'checked' : ''} onchange="ham_6b_6_doi_nguon_giai()"> 📝 Soạn lời giải</label>
            </div>
            
            <div id="sua_khung_giai_file" style="display: ${kieuGiai === 'file' ? 'block' : 'none'}; margin-top: 10px;">
                ${htmlFileGiaiHienTai}
                
                <label style="font-size: 13px; font-weight:bold; color: #495057; display: block; margin-bottom: 6px;">Chọn file GIẢI mới (Bỏ trống nếu giữ nguyên file cũ):</label>
                
                <label style="display: flex; align-items: center; width: 100%; border: 1px dashed #28a745; border-radius: 6px; background: #f8f9fa; padding: 10px; cursor: pointer; transition: 0.2s; box-sizing: border-box;" onmouseover="this.style.background='#e9ecef'" onmouseout="this.style.background='#f8f9fa'">
                    <span style="background: #28a745; color: white; padding: 6px 12px; border-radius: 4px; font-weight: bold; font-size: 13px; margin-right: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); white-space: nowrap;">
                        📎 Chọn tệp Giải mới
                    </span>
                    <span id="sua_text_hien_thi_giai" style="color: #6c757d; font-size: 13px; font-style: italic;">
                        Chưa chọn tệp (Loại file: pdf/word/ảnh. Có thể chọn nhiều ảnh để gộp PDF)
                    </span>
                    <input type="file" id="sua_file_giai_input_tl" accept=".pdf, .doc, .docx, image/*" multiple style="display: none;" onchange="ham_6b_cap_nhat_text_file(this, 'sua_text_hien_thi_giai')">
                </label>
            </div>
            
            <div id="sua_khung_giai_text" style="display: ${kieuGiai === 'text' ? 'block' : 'none'};">
                <label style="font-size: 12px; font-weight:bold;">Nội dung bài giải:</label>
                <textarea id="sua_text_giai_tl" style="width: 100%; height: 100px; padding: 10px; border: 1px solid #ffe8a1; border-radius: 4px; resize: vertical; margin-top:3px;">${meta.noi_dung_giai || ''}</textarea>
            </div>
        </div>
    `;

    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
    vungLamViec.innerHTML = `
        <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); max-width: 800px; margin: auto; position: relative;">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #eee; padding-bottom: 10px; margin-bottom: 15px;">
                <h3 style="color: #007bff; margin:0;">✏️ Sửa Học Liệu: [${hl.ma_hoc_lieu}]</h3>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px; background: #f8f9fa; padding: 15px; border-radius: 6px; border: 1px solid #e9ecef;">
                <div><label style="font-weight:bold; font-size: 12px; color: #495057;">Mã học liệu:</label><input type="text" value="${hl.ma_hoc_lieu}" readonly style="${styleReadOnly}"></div>
                <div><label style="font-weight:bold; font-size: 12px; color: #495057;">Dạng đề hiện tại:</label><input type="text" value="${dangDeText}" readonly style="${styleReadOnly}"></div>
                <div><label style="font-weight:bold; font-size: 12px; color: #495057;">Giáo viên tạo:</label><input type="text" value="${hl.ten_gv_tao || 'Không xác định'}" readonly style="${styleReadOnly}"></div>
                <div><label style="font-weight:bold; font-size: 12px; color: #495057;">Ngày tạo:</label><input type="text" value="${ngayTao}" readonly style="${styleReadOnly}"></div>
            </div>

            <div style="margin-bottom: 20px;">
                <label style="font-weight:bold; color: #333;">Tên học liệu (*):</label>
                <input type="text" id="sua_ten_hl_tl" value="${hl.ten_hoc_lieu || ''}" style="width:100%; padding: 10px; border: 1px solid #ced4da; border-radius: 4px; font-weight:bold; margin-top: 5px; box-sizing: border-box;">
            </div>
            
            ${uiPhanDe}
            ${uiPhanGiai}

            <div style="text-align: right; border-top: 1px solid #eee; padding-top: 15px; display: flex; justify-content: flex-end; gap: 10px;">
                <button onclick="ham_6b_1_ve_quan_ly_hoc_lieu_tu_luan()" style="background:#6c757d; color:white; padding:12px 20px; border:none; border-radius:6px; font-weight:bold; cursor:pointer;">Quay lại</button>
                <button onclick="ham_6b_7_luu_sua_hoc_lieu_tu_luan('${maHL}', this)" style="background:#ffc107; color:#333; padding:12px 25px; border:none; border-radius:6px; font-weight:bold; cursor:pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">💾 LƯU CẬP NHẬT</button>
            </div>
        </div>
    `;
};

// --- Các hàm Bổ trợ Form Sửa: Đổi nguồn hiển thị ---
window.ham_6b_6_doi_nguon_de = function () {
    const kieu = document.querySelector('input[name="sua_kieu_de_tl"]:checked').value;
    document.getElementById('sua_khung_de_file').style.display = (kieu === 'file') ? 'block' : 'none';
    document.getElementById('sua_khung_de_text').style.display = (kieu === 'text') ? 'block' : 'none';
};

window.ham_6b_6_doi_nguon_giai = function () {
    const kieu = document.querySelector('input[name="sua_kieu_giai_tl"]:checked').value;
    document.getElementById('sua_khung_giai_file').style.display = (kieu === 'file') ? 'block' : 'none';
    document.getElementById('sua_khung_giai_text').style.display = (kieu === 'text') ? 'block' : 'none';
};



// --- [BẢN MỞ RỘNG] Hàm 6b.7: Thực thi Lưu Sửa Học Liệu (Tự dọn dẹp Drive thông minh) ---
window.ham_6b_7_luu_sua_hoc_lieu_tu_luan = async function (maHL, btn) {
    const tenMoi = document.getElementById('sua_ten_hl_tl').value.trim();
    if (!tenMoi) return alert("❌ Tên học liệu không được để trống!");

    const originalText = btn.innerText;
    btn.disabled = true;
    btn.innerText = "⏳ Đang xử lý dữ liệu...";

    const hlCu = window.BangHocLieuTuLuanState.duLieu.find(item => item.ma_hoc_lieu === maHL);
    let meta = typeof hlCu.metadata === 'string' ? JSON.parse(hlCu.metadata || '{}') : (hlCu.metadata || {});

    let updateData = { ten_hoc_lieu: tenMoi };

    try {
        const tenHLSach = tenMoi.replace(/[\\/:*?"<>|]/g, "");

        // --- HÀM HELPER: XÓA FILE TRÊN DRIVE ---
        const deleteFromDrive = async (url) => {
            if (!url) return;
            const match = url.match(/\/d\/(.*?)\//);
            if (match && match[1]) {
                await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_TU_LUAN, {
                    method: "POST",
                    body: JSON.stringify({ action: "delete_file", fileId: match[1] })
                }).catch(e => console.log("Lỗi xóa file ẩn:", e));
            }
        };

        // --- HÀM HELPER: UPLOAD FILE LÊN DRIVE VỚI TÊN CHUẨN (KHÔNG KHOẢNG TRẮNG) ---
        const uploadToDrive = async (fileObj, suffixTag) => {
            const dotIndex = fileObj.name.lastIndexOf('.');
            const tenGocKhongDuoi = dotIndex !== -1 ? fileObj.name.substring(0, dotIndex) : fileObj.name;
            const ext = dotIndex !== -1 ? fileObj.name.substring(dotIndex + 1) : '';

            const tenFileMoi = ext ? `${maHL}-${tenHLSach}-${tenGocKhongDuoi}-${suffixTag}.${ext}` : `${maHL}-${tenHLSach}-${tenGocKhongDuoi}-${suffixTag}`;

            const base64Data = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target.result.split(',')[1]);
                reader.readAsDataURL(fileObj);
            });
            const res = await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_TU_LUAN, {
                method: "POST",
                body: JSON.stringify({ action: "upload_hoc_lieu", fileName: tenFileMoi, mimeType: fileObj.type, base64Data: base64Data })
            });
            const result = await res.json();
            if (result.status !== "success") throw new Error(result.message);
            return result.url;
        };

        // ==========================================
        // 1. XỬ LÝ PHẦN ĐỀ BÀI
        // ==========================================
        btn.innerText = "⏳ 1/3: Đang xử lý Đề bài...";
        const kieuDeMoi = document.querySelector('input[name="sua_kieu_de_tl"]:checked').value;
        meta.loai_tu_luan = kieuDeMoi;

        if (kieuDeMoi === 'text') {
            await deleteFromDrive(hlCu.url_github);
            updateData.url_github = ""; // Xóa link file cũ nếu chuyển sang gõ Text
            delete meta.ten_file_goc;
            delete meta.dinh_dang;
            delete meta.kieu_mimetype;
            meta.noi_dung_chinh = document.getElementById('sua_text_de_tl').value.trim();
        }
        else if (kieuDeMoi === 'file') {
            const fileDeInput = document.getElementById('sua_file_de_input_tl');
            if (fileDeInput && fileDeInput.files.length > 0) {
                btn.innerText = "⏳ Đang đẩy File Đề mới lên Drive...";
                const fileDe = fileDeInput.files[0];

                await deleteFromDrive(hlCu.url_github); // Xóa file cũ dọn rác

                updateData.url_github = await uploadToDrive(fileDe, 'DE');
                const extDe = fileDe.name.split('.').pop();
                meta.ten_file_goc = fileDe.name;
                meta.dinh_dang = extDe.toUpperCase();
                meta.kieu_mimetype = fileDe.type;
                delete meta.noi_dung_chinh;
            } else {
                if (!hlCu.url_github) { // Tránh trường hợp chuyển sang 'file' mà ko up file
                    throw new Error("Thầy/Cô đổi Đề bài sang dạng 'File' nhưng chưa tải file nào lên!");
                }
                delete meta.noi_dung_chinh;
            }
        }

        // ==========================================
        // 2. XỬ LÝ PHẦN BÀI GIẢI
        // ==========================================
        btn.innerText = "⏳ 2/3: Đang xử lý Bài Giải...";
        const kieuGiaiMoi = document.querySelector('input[name="sua_kieu_giai_tl"]:checked').value;
        meta.kieu_giai = kieuGiaiMoi;

        if (kieuGiaiMoi === 'none') {
            await deleteFromDrive(hlCu.url_file_giai);
            updateData.url_file_giai = null;
            delete meta.ten_file_giai;
            delete meta.noi_dung_giai;
        }
        else if (kieuGiaiMoi === 'text') {
            await deleteFromDrive(hlCu.url_file_giai);
            updateData.url_file_giai = null;
            delete meta.ten_file_giai;
            meta.noi_dung_giai = document.getElementById('sua_text_giai_tl').value.trim();
        }
        else if (kieuGiaiMoi === 'file') {
            const fileGiaiInput = document.getElementById('sua_file_giai_input_tl');
            if (fileGiaiInput && fileGiaiInput.files.length > 0) {
                btn.innerText = "⏳ Đang đẩy File Giải mới lên Drive...";
                const fileGiai = fileGiaiInput.files[0];

                await deleteFromDrive(hlCu.url_file_giai);

                updateData.url_file_giai = await uploadToDrive(fileGiai, 'GIAI');
                meta.ten_file_giai = fileGiai.name;
                delete meta.noi_dung_giai;
            } else {
                if (!hlCu.url_file_giai) {
                    throw new Error("Thầy/Cô đổi Bài Giải sang 'Kèm File' nhưng chưa tải file nào lên!");
                }
                delete meta.noi_dung_giai;
            }
        }

        // ==========================================
        // 3. LƯU VÀO DATABASE SUPABASE
        // ==========================================
        btn.innerText = "⏳ 3/3: Đang lưu vào hệ thống...";
        updateData.metadata = meta;

        const { error } = await _supabase.from('hoc_lieu_tu_luan').update(updateData).eq('ma_hoc_lieu', maHL);
        if (error) throw error;

        alert("✅ Đã cập nhật học liệu thành công!");
        ham_6b_1_ve_quan_ly_hoc_lieu_tu_luan();

    } catch (error) {
        alert("❌ Lỗi: " + error.message);
        console.error(error);
    } finally {
        btn.disabled = false;
        btn.innerText = originalText;
    }
};



// --- Hàm 6b.8: Cửa sổ mở Popup tải file mới lên ---
window.ham_6b_8_mo_popup_upload_tu_luan = function () {
    const oldPopup = document.getElementById('popup_upload_hl_tu_luan');
    if (oldPopup) oldPopup.remove();

    const overlay = document.createElement('div');
    overlay.id = "popup_upload_hl_tu_luan";
    overlay.style = "position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.6); z-index: 10000; display: flex; align-items: center; justify-content: center;";

    overlay.innerHTML = `
        <div style="background: white; width: 400px; padding: 25px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); font-family: Arial, sans-serif;">
            <div style="display: flex; justify-content: space-between; border-bottom: 2px solid #f1f3f4; padding-bottom: 10px; margin-bottom: 15px;">
                <h3 style="margin: 0; color: #fd7e14; font-size: 16px;">📁 Tải học liệu tự luận mới (Dạng File)</h3>
                <button onclick="document.getElementById('popup_upload_hl_tu_luan').remove()" style="background: none; border: none; font-size: 20px; cursor: pointer; color: #999;">✖</button>
            </div>
            
            <div style="margin-bottom: 15px;">
                <label style="font-weight: bold; font-size: 13px; display: block; margin-bottom: 5px;">Tên Học Liệu (*):</label>
                <input type="text" id="ten_hl_moi_popup" placeholder="Ví dụ: Phiếu bài tập hình học số 2..." style="width: 100%; padding: 10px; border: 1px solid #ced4da; border-radius: 6px;">
            </div>

            <div style="margin-bottom: 20px;">
                <label style="font-weight: bold; font-size: 13px; display: block; margin-bottom: 5px;">Chọn File (PDF, Word, Ảnh...):</label>
                <input type="file" id="file_hl_moi_popup" accept=".pdf, .doc, .docx, image/*" style="width: 100%; padding: 8px; border: 1px dashed #6f42c1; border-radius: 6px; background: #f8f9fa;">
            </div>

            <button id="btn_thuc_thi_upload" onclick="ham_6b_9_thuc_thi_upload_drive()" style="width: 100%; padding: 12px; background: #28a745; color: white; border: none; border-radius: 6px; font-weight: bold; font-size: 15px; cursor: pointer;">
                🚀 TẢI LÊN GOOGLE DRIVE
            </button>
        </div>
    `;
    document.body.appendChild(overlay);
};


// // --- [ĐÃ SỬA LỖI ĐÓNG FORM] Hàm 6b.9: Thực thi Đẩy Drive & Lưu DB ---
// window.ham_6b_9_thuc_thi_upload_drive = async function (btnNode) {
//     // 1. LẤY DỮ LIỆU TỪ FORM
//     const tenHL = document.getElementById('tao_hl_ten').value.trim();
//     const maHL = document.getElementById('tao_hl_ma').value;

//     const kieuDe = document.querySelector('input[name="loai_de_tu_luan"]:checked').value;
//     const kieuGiai = document.querySelector('input[name="loai_giai_tu_luan"]:checked').value;

//     const fileDeInput = document.getElementById('tao_hl_file_de');
//     const textDeInput = document.getElementById('tao_hl_text_de');
//     const fileGiaiInput = document.getElementById('tao_hl_file_giai');
//     const textGiaiInput = document.getElementById('tao_hl_text_giai');

//     // 2. KIỂM TRA AN TOÀN
//     if (!tenHL) return alert("❌ Thầy/Cô chưa nhập Tên Học Liệu!");
//     if (kieuDe === 'file' && (!fileDeInput.files || fileDeInput.files.length === 0)) return alert("❌ Chưa chọn File Đề bài!");
//     if (kieuDe === 'text' && !textDeInput.value.trim()) return alert("❌ Chưa nhập nội dung Đề bài!");
//     if (kieuGiai === 'file' && (!fileGiaiInput.files || fileGiaiInput.files.length === 0)) return alert("❌ Chưa chọn File Bài giải!");
//     if (kieuGiai === 'text' && !textGiaiInput.value.trim()) return alert("❌ Chưa nhập nội dung Bài giải!");

//     // Khóa nút bấm
//     btnNode.disabled = true;
//     btnNode.style.background = "#ccc";

//     try {
//         const tenHLSach = tenHL.replace(/[\\/:*?"<>|]/g, "");

//         // Hàm helper giúp up file lên Drive
//         const uploadToDrive = async (fileToUp, customName) => {
//             const base64Data = await new Promise((resolve, reject) => {
//                 const reader = new FileReader();
//                 reader.onload = (e) => resolve(e.target.result.split(',')[1]);
//                 reader.onerror = () => reject("Lỗi đọc file");
//                 reader.readAsDataURL(fileToUp);
//             });
//             const response = await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_TU_LUAN, {
//                 method: "POST",
//                 body: JSON.stringify({ action: "upload_hoc_lieu", fileName: customName, mimeType: fileToUp.type, base64Data: base64Data })
//             });
//             const result = await response.json();
//             if (result.status !== "success") throw new Error(result.message);
//             return result.url;
//         };

//         let urlDriveDe = null;
//         let urlDriveGiai = null;
//         let metadata = {
//             loai_tu_luan: kieuDe,
//             kieu_giai: kieuGiai
//         };

//         // 3. XỬ LÝ PHẦN ĐỀ BÀI
//         if (kieuDe === 'file') {
//             btnNode.innerText = "⏳ 1/3: Đang đẩy File Đề lên Drive...";
//             const fileDe = fileDeInput.files[0];
//             const dotIndexDe = fileDe.name.lastIndexOf('.');
//             const tenGocKhongDuoiDe = dotIndexDe !== -1 ? fileDe.name.substring(0, dotIndexDe) : fileDe.name;
//             const extDe = dotIndexDe !== -1 ? fileDe.name.substring(dotIndexDe + 1) : '';

//             const tenFileDeMoi = extDe ? `${maHL}-${tenHLSach}-${tenGocKhongDuoiDe}-DE.${extDe}` : `${maHL}-${tenHLSach}-${tenGocKhongDuoiDe}-DE`;
//             urlDriveDe = await uploadToDrive(fileDe, tenFileDeMoi);

//             metadata.dinh_dang = extDe.toUpperCase();
//             metadata.ten_file_goc = fileDe.name;
//             metadata.kieu_mimetype = fileDe.type;
//         } else {
//             metadata.dinh_dang = "TXT";
//             metadata.noi_dung_chinh = textDeInput.value.trim();
//         }

//         // 4. XỬ LÝ PHẦN BÀI GIẢI
//         if (kieuGiai === 'file') {
//             btnNode.innerText = "⏳ 2/3: Đang đẩy File Giải lên Drive...";
//             const fileGiai = fileGiaiInput.files[0];
//             const dotIndexGiai = fileGiai.name.lastIndexOf('.');
//             const tenGocKhongDuoiGiai = dotIndexGiai !== -1 ? fileGiai.name.substring(0, dotIndexGiai) : fileGiai.name;
//             const extGiai = dotIndexGiai !== -1 ? fileGiai.name.substring(dotIndexGiai + 1) : '';

//             const tenFileGiaiMoi = extGiai ? `${maHL}-${tenHLSach}-${tenGocKhongDuoiGiai}-GIAI.${extGiai}` : `${maHL}-${tenHLSach}-${tenGocKhongDuoiGiai}-GIAI`;
//             urlDriveGiai = await uploadToDrive(fileGiai, tenFileGiaiMoi);

//             metadata.ten_file_giai = fileGiai.name;
//         } else if (kieuGiai === 'text') {
//             metadata.noi_dung_giai = textGiaiInput.value.trim();
//         }

//         // 5. LƯU VÀO DATABASE SUPABASE
//         btnNode.innerText = "⏳ 3/3: Đang nạp vào hệ thống...";
//         const hocLieuMoi = {
//             ma_hoc_lieu: maHL,
//             ten_hoc_lieu: tenHL,
//             url_github: urlDriveDe,
//             url_file_giai: urlDriveGiai,
//             metadata: metadata,
//             ngay_tao: new Date().toISOString(),
//             uid_gv_tao: (typeof AppState !== 'undefined' && AppState.user) ? AppState.user.uid : null
//         };

//         const { error } = await _supabase.from('hoc_lieu_tu_luan').insert([hocLieuMoi]);
//         if (error) throw error;

//         // ==========================================
//         // 6. HOÀN TẤT & LÀM MỚI
//         // ==========================================
//         alert(`✅ Đã tạo thành công Học liệu: ${tenHL}`);

//         // Đóng form tạo mới
//         const khungForm = document.getElementById('khu-vuc-tao-moi-tl');
//         if (khungForm) khungForm.style.display = 'none';

//         // Tải lại bảng nếu đang ở màn hình Quản lý học liệu
//         if (typeof ham_6b_2_tai_danh_sach_hoc_lieu_tu_luan === 'function') {
//             ham_6b_2_tai_danh_sach_hoc_lieu_tu_luan();
//         }

//         // 🌟 CẬP NHẬT COMBOBOX CHO KHỐI 7B (Cả Form Tạo Mới & Form Sửa)
//         const cbTaoMoi = document.getElementById('add_nv_maHL_tl');
//         const cbSua = document.getElementById('sua_nv_maHL_tl');

//         if (cbTaoMoi || cbSua) {
//             // Nạp thêm vào biến tạm của 7b
//             if (!window.tempDsHocLieuTL) window.tempDsHocLieuTL = [];
//             window.tempDsHocLieuTL.unshift(hocLieuMoi);

//             // Dựng text cho Option mới
//             const icon = metadata.loai_tu_luan === 'text' ? '✍️' : '📁';
//             const coGiai = metadata.kieu_giai !== 'none' ? ' (Có bài giải)' : '';
//             const textHienThi = `${icon} [${maHL}] - ${tenHL}${coGiai}`;

//             // Xử lý nếu đang mở Form Tạo Mới Nhiệm Vụ
//             if (cbTaoMoi) {
//                 const optionMoi = document.createElement('option');
//                 optionMoi.value = maHL;
//                 optionMoi.innerHTML = textHienThi;
//                 cbTaoMoi.insertBefore(optionMoi, cbTaoMoi.options[1]); // Chèn dưới option Không Dùng
//                 cbTaoMoi.value = maHL; // Tự động chọn

//                 if (typeof ham_7b_4_xu_ly_chon_hoc_lieu_tu_luan === 'function') {
//                     ham_7b_4_xu_ly_chon_hoc_lieu_tu_luan(); // Cập nhật preview
//                 }
//             }

//             // Xử lý nếu đang mở Form Sửa Nhiệm Vụ
//             if (cbSua) {
//                 const optionMoiSua = document.createElement('option');
//                 optionMoiSua.value = maHL;
//                 optionMoiSua.innerHTML = textHienThi;
//                 cbSua.insertBefore(optionMoiSua, cbSua.options[1]);
//                 cbSua.value = maHL; // Tự động chọn

//                 if (typeof ham_7b_8_xu_ly_chon_hoc_lieu_sua === 'function') {
//                     ham_7b_8_xu_ly_chon_hoc_lieu_sua(); // Cập nhật preview
//                 }
//             }
//         }

//     } catch (error) {
//         alert("❌ Lỗi: " + error.message);
//     } finally {
//         // Mở khóa nút
//         btnNode.disabled = false;
//         btnNode.style.background = "#fd7e14";
//         btnNode.innerText = "🚀 TẢI LÊN HỆ THỐNG";
//     }
// };

// --- [ĐÃ SỬA LỖI ĐÓNG FORM + TÍCH HỢP GHÉP PDF] Hàm 6b.9: Thực thi Đẩy Drive & Lưu DB ---
window.ham_6b_9_thuc_thi_upload_drive = async function (btnNode) {
    // 1. LẤY DỮ LIỆU TỪ FORM
    const tenHL = document.getElementById('tao_hl_ten').value.trim();
    const maHL = document.getElementById('tao_hl_ma').value;

    const kieuDe = document.querySelector('input[name="loai_de_tu_luan"]:checked').value;
    const kieuGiai = document.querySelector('input[name="loai_giai_tu_luan"]:checked').value;

    const fileDeInput = document.getElementById('tao_hl_file_de');
    const textDeInput = document.getElementById('tao_hl_text_de');
    const fileGiaiInput = document.getElementById('tao_hl_file_giai');
    const textGiaiInput = document.getElementById('tao_hl_text_giai');

    // 2. KIỂM TRA AN TOÀN
    if (!tenHL) return alert("❌ Thầy/Cô chưa nhập Tên Học Liệu!");
    if (kieuDe === 'file' && (!fileDeInput.files || fileDeInput.files.length === 0)) return alert("❌ Chưa chọn File Đề bài!");
    if (kieuDe === 'text' && !textDeInput.value.trim()) return alert("❌ Chưa nhập nội dung Đề bài!");
    if (kieuGiai === 'file' && (!fileGiaiInput.files || fileGiaiInput.files.length === 0)) return alert("❌ Chưa chọn File Bài giải!");
    if (kieuGiai === 'text' && !textGiaiInput.value.trim()) return alert("❌ Chưa nhập nội dung Bài giải!");

    // Khóa nút bấm
    btnNode.disabled = true;
    btnNode.style.background = "#ccc";

    try {
        const tenHLSach = tenHL.replace(/[\\/:*?"<>|]/g, "");

        // Hàm helper giúp up file lên Drive
        const uploadToDrive = async (fileToUp, customName) => {
            const base64Data = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target.result.split(',')[1]);
                reader.onerror = () => reject("Lỗi đọc file");
                reader.readAsDataURL(fileToUp);
            });
            const response = await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_TU_LUAN, {
                method: "POST",
                body: JSON.stringify({ action: "upload_hoc_lieu", fileName: customName, mimeType: fileToUp.type, base64Data: base64Data })
            });
            const result = await response.json();
            if (result.status !== "success") throw new Error(result.message);
            return result.url;
        };

        let urlDriveDe = null;
        let urlDriveGiai = null;
        let metadata = {
            loai_tu_luan: kieuDe,
            kieu_giai: kieuGiai
        };

        // ==========================================
        // 3. XỬ LÝ PHẦN ĐỀ BÀI (Có ghép PDF)
        // ==========================================
        if (kieuDe === 'file') {
            let fileDe = fileDeInput.files[0];

            // 🌟 NẾU CHỌN TỪ 2 FILE TRỞ LÊN -> GỌI HÀM GHÉP PDF
            if (fileDeInput.files.length > 1) {
                btnNode.innerText = "⏳ Đang ghép các ảnh Đề bài thành file PDF...";
                fileDe = await window.ham_15_15_ghep_anh_thanh_pdf_k15(fileDeInput.files);
                if (!fileDe) throw new Error("Lỗi khi ghép ảnh Đề bài thành PDF!");
            }

            btnNode.innerText = "⏳ 1/3: Đang đẩy File Đề lên Drive...";
            const dotIndexDe = fileDe.name.lastIndexOf('.');
            const tenGocKhongDuoiDe = dotIndexDe !== -1 ? fileDe.name.substring(0, dotIndexDe) : fileDe.name;
            const extDe = dotIndexDe !== -1 ? fileDe.name.substring(dotIndexDe + 1) : '';

            const tenFileDeMoi = extDe ? `${maHL}-${tenHLSach}-${tenGocKhongDuoiDe}-DE.${extDe}` : `${maHL}-${tenHLSach}-${tenGocKhongDuoiDe}-DE`;
            urlDriveDe = await uploadToDrive(fileDe, tenFileDeMoi);

            metadata.dinh_dang = extDe.toUpperCase() || 'PDF'; // Nếu ghép file thì mặc định PDF
            metadata.ten_file_goc = fileDe.name;
            metadata.kieu_mimetype = fileDe.type;
        } else {
            metadata.dinh_dang = "TXT";
            metadata.noi_dung_chinh = textDeInput.value.trim();
        }

        // ==========================================
        // 4. XỬ LÝ PHẦN BÀI GIẢI (Có ghép PDF)
        // ==========================================
        if (kieuGiai === 'file') {
            let fileGiai = fileGiaiInput.files[0];

            // 🌟 NẾU CHỌN TỪ 2 FILE TRỞ LÊN -> GỌI HÀM GHÉP PDF
            if (fileGiaiInput.files.length > 1) {
                btnNode.innerText = "⏳ Đang ghép các ảnh Bài giải thành file PDF...";
                fileGiai = await window.ham_15_15_ghep_anh_thanh_pdf_k15(fileGiaiInput.files);
                if (!fileGiai) throw new Error("Lỗi khi ghép ảnh Bài giải thành PDF!");
            }

            btnNode.innerText = "⏳ 2/3: Đang đẩy File Giải lên Drive...";
            const dotIndexGiai = fileGiai.name.lastIndexOf('.');
            const tenGocKhongDuoiGiai = dotIndexGiai !== -1 ? fileGiai.name.substring(0, dotIndexGiai) : fileGiai.name;
            const extGiai = dotIndexGiai !== -1 ? fileGiai.name.substring(dotIndexGiai + 1) : '';

            const tenFileGiaiMoi = extGiai ? `${maHL}-${tenHLSach}-${tenGocKhongDuoiGiai}-GIAI.${extGiai}` : `${maHL}-${tenHLSach}-${tenGocKhongDuoiGiai}-GIAI`;
            urlDriveGiai = await uploadToDrive(fileGiai, tenFileGiaiMoi);

            metadata.ten_file_giai = fileGiai.name;
        } else if (kieuGiai === 'text') {
            metadata.noi_dung_giai = textGiaiInput.value.trim();
        }

        // ==========================================
        // 5. LƯU VÀO DATABASE SUPABASE
        // ==========================================
        btnNode.innerText = "⏳ 3/3: Đang nạp vào hệ thống...";
        const hocLieuMoi = {
            ma_hoc_lieu: maHL,
            ten_hoc_lieu: tenHL,
            url_github: urlDriveDe,
            url_file_giai: urlDriveGiai,
            metadata: metadata,
            ngay_tao: new Date().toISOString(),
            uid_gv_tao: (typeof AppState !== 'undefined' && AppState.user) ? AppState.user.uid : null
        };

        const { error } = await _supabase.from('hoc_lieu_tu_luan').insert([hocLieuMoi]);
        if (error) throw error;

        // ==========================================
        // 6. HOÀN TẤT & LÀM MỚI
        // ==========================================
        alert(`✅ Đã tạo thành công Học liệu: ${tenHL}`);

        // Đóng form tạo mới
        const khungForm = document.getElementById('khu-vuc-tao-moi-tl');
        if (khungForm) khungForm.style.display = 'none';

        // Tải lại bảng nếu đang ở màn hình Quản lý học liệu
        if (typeof ham_6b_2_tai_danh_sach_hoc_lieu_tu_luan === 'function') {
            ham_6b_2_tai_danh_sach_hoc_lieu_tu_luan();
        }

        // CẬP NHẬT COMBOBOX CHO KHỐI 7B
        const cbTaoMoi = document.getElementById('add_nv_maHL_tl');
        const cbSua = document.getElementById('sua_nv_maHL_tl');

        if (cbTaoMoi || cbSua) {
            if (!window.tempDsHocLieuTL) window.tempDsHocLieuTL = [];
            window.tempDsHocLieuTL.unshift(hocLieuMoi);

            const icon = metadata.loai_tu_luan === 'text' ? '✍️' : '📁';
            const coGiai = metadata.kieu_giai !== 'none' ? ' (Có bài giải)' : '';
            const textHienThi = `${icon} [${maHL}] - ${tenHL}${coGiai}`;

            if (cbTaoMoi) {
                const optionMoi = document.createElement('option');
                optionMoi.value = maHL;
                optionMoi.innerHTML = textHienThi;
                cbTaoMoi.insertBefore(optionMoi, cbTaoMoi.options[1]);
                cbTaoMoi.value = maHL;

                if (typeof ham_7b_4_xu_ly_chon_hoc_lieu_tu_luan === 'function') {
                    ham_7b_4_xu_ly_chon_hoc_lieu_tu_luan();
                }
            }

            if (cbSua) {
                const optionMoiSua = document.createElement('option');
                optionMoiSua.value = maHL;
                optionMoiSua.innerHTML = textHienThi;
                cbSua.insertBefore(optionMoiSua, cbSua.options[1]);
                cbSua.value = maHL;

                if (typeof ham_7b_8_xu_ly_chon_hoc_lieu_sua === 'function') {
                    ham_7b_8_xu_ly_chon_hoc_lieu_sua();
                }
            }
        }

    } catch (error) {
        alert("❌ Lỗi: " + error.message);
    } finally {
        // Mở khóa nút
        btnNode.disabled = false;
        btnNode.style.background = "#fd7e14";
        btnNode.innerText = "🚀 TẢI LÊN HỆ THỐNG";
    }
};




// --- Hàm 15.10: Xử lý tạo Học liệu Text trực tiếp (Chỉ nạp Database, Không tạo file) ---
window.ham_6b_10_tao_hoc_lieu_text = async function () {
    const tenHL = document.getElementById('text_ten_hl_tu_luan').value.trim();
    const noiDungText = document.getElementById('text_de_tu_luan').value.trim();
    const btnTao = document.getElementById('btn_tao_hl_text');

    if (!tenHL) return alert("❌ Thầy chưa nhập Tên Học Liệu Văn Bản kìa!");
    if (!noiDungText) return alert("❌ Thầy chưa nhập Nội dung chi tiết đề bài!");

    btnTao.disabled = true;
    btnTao.innerText = "⏳ Đang nạp thẳng vào Cơ sở dữ liệu...";

    try {
        // 1. Khởi tạo mã
        const maHLText = "HL_TL_TXT_" + ham_6b_tao_ma_6_ky_tu();

        // 2. Không gọi API Google Drive nữa, nạp trực tiếp vào Supabase
        const hocLieuTextMoi = {
            ma_hoc_lieu: maHLText,
            ten_hoc_lieu: tenHL,
            url_github: "", // 🌟 Để trống URL
            metadata: {
                loai_tu_luan: "text",
                noi_dung_chinh: noiDungText,
                định_dạng: "TXT"
            },
            uid_gv_tao: (typeof AppState !== 'undefined' && AppState.user) ? AppState.user.uid : null,
            ngay_tao: new Date().toISOString()
        };

        const { error } = await _supabase.from('hoc_lieu_tu_luan').insert([hocLieuTextMoi]);
        if (error) throw error;

        


        // 3. Cập nhật lại giao diện ngay tức thì
        if (window.tempDsHocLieu) window.tempDsHocLieu.unshift(hocLieuTextMoi);

        const cbTuLuan = document.getElementById('add_nv_maHL_tl');
        if (cbTuLuan) {
            const optionMoi = document.createElement('option');
            optionMoi.value = maHLText;
            optionMoi.innerHTML = `✍️ [${maHLText}] - ${tenHL}`;
            cbTuLuan.insertBefore(optionMoi, cbTuLuan.options[1]);
            cbTuLuan.value = maHLText;
        }

        alert(`🎉 Đã tạo học liệu văn bản và nạp kho thành công!`);

        // 🌟 THÊM DÒNG NÀY ĐỂ BẢNG DANH SÁCH TỰ ĐỘNG CẬP NHẬT
        if (typeof ham_6b_2_tai_danh_sach_hoc_lieu_tu_luan === 'function') {
            ham_6b_2_tai_danh_sach_hoc_lieu_tu_luan();
        }

        // Dọn dẹp form
        document.getElementById('text_ten_hl_tu_luan').value = "";
        document.getElementById('text_de_tu_luan').value = "";

        // Tự động chuyển qua tab "Chọn từ Kho"
        const radioFile = document.querySelector('input[name="loai_de_tu_luan"][value="file"]');
        if (radioFile) {
            radioFile.checked = true;
            ham_6b_5_doi_nguon_tu_luan();
        }



    } catch (error) {
        alert("❌ Thao tác thất bại: " + error.message);
    } finally {
        btnTao.disabled = false;
        btnTao.innerText = "💾 TẠO HỌC LIỆU VĂN BẢN";
    }
};


// =====================================================================
// Hàm 6b.10: Vẽ Bảng Học Liệu Tự Luận (Có Sắp xếp Sort)
// =====================================================================
window.ham_6b_10_ve_bang_hoc_lieu_tu_luan = function () {
    const renderArea = document.getElementById('danh-sach-hl-tl-render');

    // 🌟 CHẶN LỖI TẠI ĐÂY: Nếu không tìm thấy vùng vẽ bảng thì dừng lại ngay
    if (!renderArea) return;


    let dsHL = [...window.BangHocLieuTuLuanState.duLieu];

    if (dsHL.length === 0) {
        renderArea.innerHTML = `<p style="text-align: center; color: #666; padding: 20px; background: white; border-radius: 8px; border: 1px solid #dee2e6;">Kho tự luận hiện đang trống. Thầy/cô bấm <b>+ Tạo mới</b> để thêm nhé!</p>`;
        return;
    }

    // Thuật toán Sort
    const cot = window.BangHocLieuTuLuanState.cotDangSort;
    const heSo = window.BangHocLieuTuLuanState.tangDan ? 1 : -1;
    dsHL.sort((a, b) => {
        let valA = a[cot] === null || a[cot] === undefined ? '' : a[cot];
        let valB = b[cot] === null || b[cot] === undefined ? '' : b[cot];
        if (typeof valA === 'string') valA = valA.toLowerCase();
        if (typeof valB === 'string') valB = valB.toLowerCase();
        if (valA < valB) return -1 * heSo;
        if (valA > valB) return 1 * heSo;
        return 0;
    });

    const iconSort = window.BangHocLieuTuLuanState.tangDan ? ' ▲' : ' ▼';
    const getIcon = (tenCot) => (cot === tenCot ? iconSort : ' ↕');

    let htmlTable = `
        <div style="overflow-x: auto; border: 1px solid #dee2e6; border-radius: 8px;">
            <table style="width: 100%; min-width: 1000px; border-collapse: collapse; background: white; font-size: 13px;">
                <thead>
                    <tr style="background: #f8f9fa; text-align: left; border-bottom: 2px solid #dee2e6; white-space: nowrap;">
                        <th style="padding: 10px; border: 1px solid #eee; text-align: center; width: 40px;">STT</th>
                        <th style="padding: 10px; border: 1px solid #eee; text-align: center;">Thao tác</th>
                        <th style="padding: 10px; border: 1px solid #eee; cursor: pointer; color:#0056b3;" onclick="ham_6b_11_thay_doi_sort('ma_hoc_lieu')">Mã HL ${getIcon('ma_hoc_lieu')}</th>
                        <th style="padding: 10px; border: 1px solid #eee; cursor: pointer; color:#0056b3;" onclick="ham_6b_11_thay_doi_sort('ten_hoc_lieu')">Tên Học Liệu Tự Luận ${getIcon('ten_hoc_lieu')}</th>
                        <th style="padding: 10px; border: 1px solid #eee; text-align: center;">Dạng Đề</th>
                        <th style="padding: 10px; border: 1px solid #eee; cursor: pointer; color:#0056b3;" onclick="ham_6b_11_thay_doi_sort('ten_gv_tao')">Giáo viên ${getIcon('ten_gv_tao')}</th>
                        <th style="padding: 10px; border: 1px solid #eee; cursor: pointer; color:#0056b3;" onclick="ham_6b_11_thay_doi_sort('ngay_tao')">Ngày tạo ${getIcon('ngay_tao')}</th>
                    </tr>
                </thead>
                <tbody>
    `;

    dsHL.forEach((hl, index) => {
        const ngayTao = hl.ngay_tao ? new Date(hl.ngay_tao).toLocaleString('vi-VN') : '-';

        // Phân tích metadata để lấy định dạng
        const meta = typeof hl.metadata === 'string' ? JSON.parse(hl.metadata || '{}') : (hl.metadata || {});
        const isText = meta.loai_tu_luan === 'text' || meta.kieu_de_tu_luan === 'van_ban';


        let dangDeUI = "";
        if (isText) {
            dangDeUI = `<span style="background: #e0f2fe; color: #e88308c1; padding: 4px 8px; border-radius: 4px; font-weight: bold; font-size: 11px;">✍️ Soạn Văn bản</span>`;
        } else {
            // BẢNG CẤU HÌNH MÀU SẮC (Dễ dàng tùy chỉnh thêm)
            const ext = (meta.dinh_dang || '').toUpperCase();
            const fileConfigs = {
                'PDF': { label: 'PDF', bg: '#dbeafe', color: '#1e40af' }, // Xanh dương
                'DOC': { label: 'Word', bg: '#e0e7ff', color: '#3730a3' }, // Tím xanh
                'DOCX': { label: 'Word', bg: '#e0e7ff', color: '#3730a3' },
                'PNG': { label: 'Ảnh', bg: '#dcfce7', color: '#166534' }, // Xanh lá
                'JPG': { label: 'Ảnh', bg: '#dcfce7', color: '#166534' },
                'JPEG': { label: 'Ảnh', bg: '#dcfce7', color: '#166534' },
                'PPTX': { label: 'PPT', bg: '#ffedd5', color: '#9a3412' }, // Cam
                'XLSX': { label: 'Excel', bg: '#f0fdf4', color: '#15803d' }  // Xanh ngọc
            };

            // Lấy config dựa trên đuôi file, nếu không tìm thấy thì dùng style mặc định (xám)
            const config = fileConfigs[ext] || { label: ext || 'File', bg: '#f1f5f9', color: '#475569' };

            dangDeUI = `<span style="background: ${config.bg}; color: ${config.color}; padding: 4px 8px; border-radius: 4px; font-weight: bold; font-size: 11px;">📁 Đính kèm ${config.label}</span>`;
        }



        // const dangDeUI = isText
        //     ? `<span style="background: #e0f2fe; color: #0284c7; padding: 4px 8px; border-radius: 4px; font-weight: bold; font-size: 11px;">✍️ Soạn Văn bản</span>`
        //     : `<span style="background: #fef08a; color: #b45309; padding: 4px 8px; border-radius: 4px; font-weight: bold; font-size: 11px;">📁 Đính kèm File</span>`;

        htmlTable += `
            <tr style="border-bottom: 1px solid #eee; transition: 0.2s;" onmouseover="this.style.background='#f1f8ff'" onmouseout="this.style.background='white'">
                <td style="padding: 10px; border: 1px solid #eee; text-align: center; font-weight: bold;">${index + 1}</td>
                
                <td style="padding: 10px; border: 1px solid #eee; text-align: center; white-space: nowrap;">
                    
                    <button onclick="ham_6b_6_mo_form_sua_hoc_lieu_tu_luan(&quot;${hl.ma_hoc_lieu}&quot;)" style="padding: 5px 10px; background: #f39c12; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; margin-right: 5px;">Sửa</button>
                    <button onclick="ham_6b_20_xoa_hoc_lieu_tu_luan('${hl.ma_hoc_lieu}', this)" style="padding: 5px 10px; background: #dc3545; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer;">Xóa</button>
                </td>
                
                <td style="padding: 10px; border: 1px solid #eee; font-weight: bold; color: #28a745;">${hl.ma_hoc_lieu}</td>
                <td style="padding: 10px; border: 1px solid #eee; font-weight: bold; color: #1a73e8; font-size: 14px;">${hl.ten_hoc_lieu}</td>
                <td style="padding: 10px; border: 1px solid #eee; text-align: center;">${dangDeUI}</td>
                <td style="padding: 10px; border: 1px solid #eee; font-size: 12px; color: #555; font-weight: bold;">${hl.ten_gv_tao}</td>
                <td style="padding: 10px; border: 1px solid #eee; font-size: 11px; color: #666;">${ngayTao}</td>
            </tr>
        `;
    });

    htmlTable += `</tbody></table></div>`;
    renderArea.innerHTML = htmlTable;
};


// =====================================================================
// Hàm 6b.11: Xử lý thay đổi cột Sắp xếp
// =====================================================================
window.ham_6b_11_thay_doi_sort = function (cotMoi) {
    if (window.BangHocLieuTuLuanState.cotDangSort === cotMoi) {
        window.BangHocLieuTuLuanState.tangDan = !window.BangHocLieuTuLuanState.tangDan;
    } else {
        window.BangHocLieuTuLuanState.cotDangSort = cotMoi;
        window.BangHocLieuTuLuanState.tangDan = true;
    }
    ham_6b_10_ve_bang_hoc_lieu_tu_luan();
};


// =====================================================================
// Hàm 6b.12: Tìm kiếm trực tiếp (Live Search) trên bảng Tự luận
// =====================================================================
window.ham_6b_12_tim_kiem_live = function (tuKhoa) {
    const filter = tuKhoa.toLowerCase().trim();
    const rows = document.querySelectorAll('#danh-sach-hl-tl-render tbody tr');

    rows.forEach(row => {
        const textContent = row.innerText.toLowerCase();
        if (textContent.includes(filter)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
};

// =====================================================================
// [ĐÃ NÂNG CẤP] Hàm 6b.20: Chức năng Xóa Học Liệu (Dọn sạch cả Drive)
// =====================================================================
window.ham_6b_20_xoa_hoc_lieu_tu_luan = async function (maHL, btnNode) {
    if (!confirm(`⚠️ XÁC NHẬN: Thầy/cô có chắc chắn muốn xóa học liệu Tự luận [${maHL}] không?\nThao tác này KHÔNG THỂ HOÀN TÁC và sẽ xóa vĩnh viễn cả File Đề & File Giải trên Google Drive (nếu có)!`)) {
        return;
    }

    const btnOldText = btnNode.innerText;
    btnNode.innerText = "⏳...";
    btnNode.disabled = true;

    try {
        // 1. Lấy thông tin học liệu hiện tại từ State
        const hlCu = window.BangHocLieuTuLuanState.duLieu.find(item => item.ma_hoc_lieu === maHL);

        if (hlCu) {
            // Hàm Helper: Xóa file trên Google Drive
            const deleteFromDrive = async (url) => {
                if (!url) return;
                const match = url.match(/\/d\/(.*?)\//);
                if (match && match[1]) {
                    await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_TU_LUAN, {
                        method: "POST",
                        body: JSON.stringify({ action: "delete_file", fileId: match[1] })
                    }).catch(e => console.log("Lỗi xóa file ẩn:", e));
                }
            };

            // 2. Tiến hành xóa File Đề và File Giải (Chạy ngầm không ảnh hưởng UI)
            btnNode.innerText = "⏳ Dọn dẹp...";
            await deleteFromDrive(hlCu.url_github);      // Xóa file Đề
            await deleteFromDrive(hlCu.url_file_giai);   // Xóa file Giải
        }

        // 3. Xóa dữ liệu trong cơ sở dữ liệu Supabase
        btnNode.innerText = "⏳ Đang xóa...";
        const { error } = await _supabase.from('hoc_lieu_tu_luan').delete().eq('ma_hoc_lieu', maHL);
        if (error) throw error;

        alert("✅ Đã xóa hoàn toàn Học liệu và dọn dẹp sạch sẽ File trên Drive!");

        // Refresh lại bảng ngay lập tức
        if (typeof ham_6b_2_tai_danh_sach_hoc_lieu_tu_luan === 'function') {
            ham_6b_2_tai_danh_sach_hoc_lieu_tu_luan();
        }

    } catch (error) {
        alert("❌ Lỗi khi xóa: " + error.message);
        btnNode.innerText = btnOldText;
        btnNode.disabled = false;
    }
};
// =====================================================================
// KHỐI 18: TIỆN ÍCH - TẠO SƠ ĐỒ LỚP HỌC (3 KIỂU NẠP & AUTO STT)
// =====================================================================

// Tự động tải thư viện SheetJS (Excel) và Mammoth (Word)
if (typeof XLSX === 'undefined') {
    let scriptXLSX = document.createElement('script');
    scriptXLSX.src = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';
    document.head.appendChild(scriptXLSX);
}
if (typeof mammoth === 'undefined') {
    let scriptMammoth = document.createElement('script');
    scriptMammoth.src = 'https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.4.21/mammoth.browser.min.js';
    document.head.appendChild(scriptMammoth);
}

// Biến toàn cục lưu danh sách tạm thời
window.DanhSachHSSoDoTam = [];

// 18.1. HÀM MỞ GIAO DIỆN
window.ham_18_1_mo_giao_dien_so_do_lop = async function () {
    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
    if (!vungLamViec) return;

    window.DanhSachHSSoDoTam = []; // Reset dữ liệu

    vungLamViec.innerHTML = `
        <div style="padding: 10px; animation: fadeIn 0.3s ease-in-out;">
            <h3 style="color: #0056b3; border-bottom: 2px solid #0056b3; padding-bottom: 10px; margin-top: 0; text-transform: uppercase;">
                📍 Tiện ích: Tạo sơ đồ lớp học
            </h3>

            <!-- Bước 1: Nạp dữ liệu (3 Kiểu) -->
            <div style="margin-top: 20px; padding: 20px; background: #fff; border-radius: 8px; border: 1px solid #ddd; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                <h4 style="margin-top: 0; color: #d35400;">BƯỚC 1: NẠP DANH SÁCH LỚP</h4>
                <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                    
                    <!-- Kiểu 1: File Excel -->
                    <div style="flex: 1; min-width: 250px; padding: 15px; background: #f8f9fa; border-radius: 6px; border: 1px dashed #28a745;">
                        <label style="font-weight: bold; color: #28a745; display: block; margin-bottom: 10px;">📊 Tải File Excel (.xlsx)</label>
                        <input type="file" id="file-excel-danh-sach" accept=".xlsx, .xls" style="margin-bottom: 10px; width: 100%; font-size: 13px;">
                        <button onclick="ham_18_3_doc_file_excel()" style="padding: 6px 15px; background: #28a745; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; width: 100%;">
                            📥 Đọc Excel
                        </button>
                    </div>

                    <!-- Kiểu 2: File Word -->
                    <div style="flex: 1; min-width: 250px; padding: 15px; background: #f8f9fa; border-radius: 6px; border: 1px dashed #0056b3;">
                        <label style="font-weight: bold; color: #0056b3; display: block; margin-bottom: 10px;">📝 Tải File Word (.docx)</label>
                        <input type="file" id="file-word-danh-sach" accept=".docx" style="margin-bottom: 10px; width: 100%; font-size: 13px;">
                        <button onclick="ham_18_8_doc_file_word()" style="padding: 6px 15px; background: #007bff; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; width: 100%;">
                            📥 Đọc Word
                        </button>
                    </div>

                    <!-- Kiểu 3: Copy/Paste -->
                    <div style="flex: 1; min-width: 250px; padding: 15px; background: #f8f9fa; border-radius: 6px; border: 1px dashed #17a2b8;">
                        <label style="font-weight: bold; color: #17a2b8; display: block; margin-bottom: 10px;">✂️ Copy & Dán Nội Dung</label>
                        <textarea id="text-paste-danh-sach" rows="2" placeholder="Dán bảng/danh sách vào đây..." style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; margin-bottom: 10px; font-family: inherit; font-size: 13px;"></textarea>
                        <button onclick="ham_18_4_doc_text_paste()" style="padding: 6px 15px; background: #17a2b8; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; width: 100%;">
                            ⚡ Xử Lý Dữ Liệu
                        </button>
                    </div>
                </div>
            </div>

            <!-- Bước 2: Chỉnh sửa tên & Số thứ tự tự động -->
            <div id="khu-vuc-chinh-sua" style="display: none; margin-top: 20px; padding: 20px; background: #fffdf5; border-radius: 8px; border: 1px solid #ffeeba; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; flex-wrap: wrap; gap: 10px;">
                    <h4 style="margin: 0; color: #856404;">BƯỚC 2: CHỈNH SỬA & CHỐT SƠ ĐỒ</h4>
                    <div style="display: flex; gap: 10px; align-items: center;">
                        
                        <!-- Nút xuất Excel (File chuẩn) -->
                        <button onclick="ham_18_9_xuat_excel_sau_sua()" style="padding: 8px 15px; background: #28a745; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                            💾 Tải file chuẩn (Excel)
                        </button>

                        <label style="font-weight: bold; color: #495057; margin-left: 10px;">Số dãy bàn (Cột):</label>
                        <input type="number" id="input-so-cot" value="4" min="2" max="10" style="padding: 6px; width: 60px; border-radius: 4px; border: 1px solid #ccc; text-align: center;">
                        <button onclick="ham_18_6_ve_so_do_tu_bang()" style="padding: 8px 20px; background: #dc3545; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
                            🎨 TẠO SƠ ĐỒ
                        </button>
                    </div>
                </div>
                
                <div style="max-height: 400px; overflow-y: auto; border: 1px solid #ddd; border-radius: 6px;">
                    <table style="width: 100%; border-collapse: collapse; text-align: left; background: white;">
                        <thead style="background: #f4f6f9; position: sticky; top: 0; z-index: 10; box-shadow: 0 1px 2px rgba(0,0,0,0.1);">
                            <tr>
                                <th style="padding: 10px; border-bottom: 2px solid #ccc; width: 60px; text-align: center;">STT</th>
                                <th style="padding: 10px; border-bottom: 2px solid #ccc;">Họ và Tên (Có thể sửa trực tiếp)</th>
                                <th style="padding: 10px; border-bottom: 2px solid #ccc; width: 80px; text-align: center;">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody id="tbody-danh-sach-edit">
                            <!-- Dữ liệu render vào đây -->
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Bước 3: Khung Sơ đồ -->
            <div id="khu-vuc-hien-thi-so-do" style="display: none; margin-top: 30px;">
                <div style="text-align: right; margin-bottom: 15px;">
                    <button onclick="window.print()" style="padding: 8px 20px; background: #6c757d; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">
                        🖨️ In sơ đồ
                    </button>
                </div>
                <div style="text-align: center; margin-bottom: 40px;">
                    <div style="display: inline-block; padding: 12px 80px; background: #343a40; color: white; font-weight: bold; border-radius: 6px; letter-spacing: 3px; box-shadow: 0 4px 6px rgba(0,0,0,0.2); border-bottom: 4px solid #23272b;">
                        BẢNG GIÁO VIÊN
                    </div>
                </div>
                <div id="khung-so-do-grid" style="display: grid; gap: 20px; justify-content: center; padding-bottom: 40px;"></div>
            </div>
        </div>
    `;
};

// 18.2. ĐỌC FILE EXCEL BẰNG SHEETJS
window.ham_18_3_doc_file_excel = function () {
    if (typeof XLSX === 'undefined') return alert("Đang tải thư viện Excel, vui lòng thử lại sau 1 giây!");
    const fileInput = document.getElementById('file-excel-danh-sach');
    if (!fileInput.files || fileInput.files.length === 0) return alert("Thầy vui lòng chọn 1 file Excel!");

    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

            window.DanhSachHSSoDoTam = [];
            let sttCount = 1;

            for (let i = 0; i < jsonData.length; i++) {
                const row = jsonData[i];
                if (!row || row.length === 0) continue;
                const textCells = row.filter(cell => typeof cell === 'string' && cell.trim().length > 3);
                if (textCells.length > 0) {
                    const hoTen = textCells.reduce((a, b) => a.length > b.length ? a : b).trim();
                    if (hoTen.toLowerCase() !== "họ và tên" && hoTen.toLowerCase() !== "họ tên" && isNaN(hoTen)) {
                        window.DanhSachHSSoDoTam.push({ stt: sttCount++, ten: hoTen });
                    }
                }
            }
            ham_18_5_render_bang_chinh_sua();
        } catch (err) { alert("Lỗi đọc file Excel: " + err.message); }
    };
    reader.readAsArrayBuffer(fileInput.files[0]);
};

// 18.3. ĐỌC DỮ LIỆU TỪ WORD/EXCEL (PASTE)
window.ham_18_4_doc_text_paste = function () {
    const textData = document.getElementById('text-paste-danh-sach').value;
    if (!textData.trim()) return alert("Khung dán dữ liệu đang trống!");

    const lines = textData.split('\n');
    window.DanhSachHSSoDoTam = [];
    let sttCount = 1;

    lines.forEach(line => {
        const parts = line.split('\t').map(p => p.trim()).filter(p => p.length > 0);
        if (parts.length > 0) {
            const hoTen = parts.reduce((a, b) => a.length > b.length ? a : b);
            if (hoTen.toLowerCase() !== "họ và tên" && hoTen.length > 3 && isNaN(hoTen)) {
                window.DanhSachHSSoDoTam.push({ stt: sttCount++, ten: hoTen });
            }
        }
    });
    ham_18_5_render_bang_chinh_sua();
};

// 18.8 (MỚI). ĐỌC TRỰC TIẾP FILE WORD (.DOCX)
window.ham_18_8_doc_file_word = function () {
    if (typeof mammoth === 'undefined') return alert("Đang tải thư viện Word, vui lòng thử lại sau 1 giây!");
    const fileInput = document.getElementById('file-word-danh-sach');
    if (!fileInput.files || fileInput.files.length === 0) return alert("Thầy vui lòng chọn 1 file Word (.docx)!");

    const reader = new FileReader();
    reader.onload = function (e) {
        mammoth.extractRawText({ arrayBuffer: e.target.result })
            .then(function (result) {
                const textData = result.value;
                window.DanhSachHSSoDoTam = [];
                let sttCount = 1;

                // Thuật toán tách dòng tương tự như khi paste
                textData.split('\n').forEach(line => {
                    const parts = line.split('\t').map(p => p.trim()).filter(p => p.length > 0);
                    if (parts.length > 0) {
                        const hoTen = parts.reduce((a, b) => a.length > b.length ? a : b);
                        if (hoTen.toLowerCase() !== "họ và tên" && hoTen.length > 3 && isNaN(hoTen)) {
                            window.DanhSachHSSoDoTam.push({ stt: sttCount++, ten: hoTen });
                        }
                    }
                });

                if (window.DanhSachHSSoDoTam.length > 0) {
                    ham_18_5_render_bang_chinh_sua();
                } else {
                    alert("Không tìm thấy danh sách học sinh hợp lệ trong file Word!");
                }
            })
            .catch(function (err) { alert("Lỗi đọc file Word: " + err.message); });
    };
    reader.readAsArrayBuffer(fileInput.files[0]);
};

// 18.4. ĐỔ DỮ LIỆU LÊN BẢNG VÀ GẮN HÀM XÓA AUTO-STT
window.ham_18_5_render_bang_chinh_sua = function () {
    const tbody = document.getElementById('tbody-danh-sach-edit');
    if (window.DanhSachHSSoDoTam.length === 0) return alert("Không tìm thấy Tên hợp lệ trong dữ liệu cung cấp!");

    document.getElementById('khu-vuc-chinh-sua').style.display = 'block';

    let html = "";
    window.DanhSachHSSoDoTam.forEach((hs, index) => {
        html += `
            <tr style="border-bottom: 1px solid #eee;">
                <td class="col-stt" style="padding: 10px; text-align: center; font-weight: bold; color: #6c757d;">${index + 1}</td>
                <td style="padding: 8px;">
                    <input type="text" value="${hs.ten}" style="width: 100%; padding: 8px; border: 1px solid #17a2b8; border-radius: 4px; outline: none; font-weight: bold; color: #0056b3;">
                </td>
                <td style="padding: 10px; text-align: center;">
                    <button onclick="ham_18_7_xoa_dong_va_cap_nhat_stt(this)" style="padding: 4px 8px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">🗑️ Xóa</button>
                </td>
            </tr>
        `;
    });
    tbody.innerHTML = html;
};

// 18.7 (MỚI). HÀM XÓA DÒNG & CẬP NHẬT STT (KHÔNG LÀM MẤT CHỮ ĐANG GÕ DỞ)
window.ham_18_7_xoa_dong_va_cap_nhat_stt = function (btnElement) {
    // 1. Xóa DOM của dòng (tr) chứa nút Xóa vừa bấm
    const row = btnElement.closest('tr');
    row.remove();

    // 2. Quét lại tất cả các dòng còn lại và đánh số lại cột STT
    const tbody = document.getElementById('tbody-danh-sach-edit');
    const allRows = tbody.querySelectorAll('tr');

    allRows.forEach((tr, index) => {
        const tdSTT = tr.querySelector('.col-stt');
        if (tdSTT) tdSTT.innerText = index + 1;
    });
};

// 18.5. CHỐT TÊN VÀ VẼ SƠ ĐỒ LƯỚI (Giữ nguyên logic quét input DOM)
window.ham_18_6_ve_so_do_tu_bang = function () {
    const soCot = document.getElementById('input-so-cot').value || 4;
    const khungSoDo = document.getElementById('khung-so-do-grid');

    let danhSachChot = [];
    const rows = document.getElementById('tbody-danh-sach-edit').querySelectorAll('tr');

    rows.forEach(row => {
        const inputElem = row.querySelector('input[type="text"]');
        if (inputElem && inputElem.value.trim() !== "") {
            danhSachChot.push({ ten: inputElem.value.trim() });
        }
    });

    if (danhSachChot.length === 0) return alert("Danh sách đang trống!");

    document.getElementById('khu-vuc-hien-thi-so-do').style.display = 'block';
    khungSoDo.style.gridTemplateColumns = `repeat(${soCot}, 1fr)`;

    let htmlGrid = "";
    danhSachChot.forEach((hs, index) => {
        const urlAnh = `https://ui-avatars.com/api/?name=${encodeURIComponent(hs.ten)}&background=random&color=fff&size=128&bold=true`;
        htmlGrid += `
            <div style="background: #fff; border: 2px solid #e9ecef; border-radius: 12px; padding: 20px 10px; text-align: center; box-shadow: 0 4px 8px rgba(0,0,0,0.06); display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; overflow: hidden; page-break-inside: avoid;">
                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 5px; background: #007bff;"></div>
                <div style="font-size: 11px; color: #6c757d; margin-bottom: 12px; font-weight: 900; background: #f8f9fa; padding: 3px 10px; border-radius: 12px; border: 1px solid #ddd;">
                    BÀN ${index + 1}
                </div>
                <img src="${urlAnh}" alt="Avatar" style="width: 85px; height: 85px; border-radius: 50%; object-fit: cover; border: 3px solid #e9ecef; margin-bottom: 15px;">
                <div style="font-weight: bold; color: #2c3e50; font-size: 16px; width: 100%; text-align: center; line-height: 1.3;" title="${hs.ten}">
                    ${hs.ten}
                </div>
            </div>
        `;
    });
    khungSoDo.innerHTML = htmlGrid;
    document.getElementById('khu-vuc-hien-thi-so-do').scrollIntoView({ behavior: 'smooth' });
};
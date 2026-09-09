// =====================================================================
// KHỐI 18: TIỆN ÍCH - TẠO SƠ ĐỒ LỚP HỌC (BẢN TẢI FILE & CHỈNH SỬA)
// =====================================================================

// Tự động tải thư viện SheetJS để đọc file Excel nếu chưa có
if (typeof XLSX === 'undefined') {
    let scriptXLSX = document.createElement('script');
    scriptXLSX.src = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';
    document.head.appendChild(scriptXLSX);
}

// Biến toàn cục lưu danh sách tạm thời để chỉnh sửa
window.DanhSachHSSoDoTam = [];

// 18.1. HÀM MỞ GIAO DIỆN
window.ham_18_1_mo_giao_dien_so_do_lop = async function () {
    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
    if (!vungLamViec) return;

    window.DanhSachHSSoDoTam = []; // Reset dữ liệu

    vungLamViec.innerHTML = `
        <div style="padding: 10px; animation: fadeIn 0.3s ease-in-out;">
            <h3 style="color: #0056b3; border-bottom: 2px solid #0056b3; padding-bottom: 10px; margin-top: 0; text-transform: uppercase;">
                📍 Tiện ích: Tạo sơ đồ lớp học từ danh sách
            </h3>

            <!-- Bước 1: Nạp dữ liệu -->
            <div style="margin-top: 20px; padding: 20px; background: #fff; border-radius: 8px; border: 1px solid #ddd; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                <h4 style="margin-top: 0; color: #d35400;">BƯỚC 1: NẠP DANH SÁCH LỚP</h4>
                <div style="display: flex; gap: 20px; flex-wrap: wrap;">
                    
                    <!-- Option 1: Tải file Excel -->
                    <div style="flex: 1; min-width: 300px; padding: 15px; background: #f8f9fa; border-radius: 6px; border: 1px dashed #adb5bd;">
                        <label style="font-weight: bold; color: #495057; display: block; margin-bottom: 10px;">📄 Tải lên file Excel (.xlsx, .xls)</label>
                        <input type="file" id="file-excel-danh-sach" accept=".xlsx, .xls" style="margin-bottom: 10px; width: 100%;">
                        <button onclick="ham_18_3_doc_file_excel()" style="padding: 6px 15px; background: #28a745; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer;">
                            📥 Đọc File Excel
                        </button>
                        <div style="font-size: 12px; color: #6c757d; margin-top: 10px;">* Lưu ý: File Excel cần có cột "STT" và "Họ Tên" (hoặc tên tương đương).</div>
                    </div>

                    <!-- Option 2: Copy/Paste từ Word -->
                    <div style="flex: 1; min-width: 300px; padding: 15px; background: #f8f9fa; border-radius: 6px; border: 1px dashed #adb5bd;">
                        <label style="font-weight: bold; color: #495057; display: block; margin-bottom: 10px;">📝 Hoặc Copy/Paste từ Word/Excel</label>
                        <textarea id="text-paste-danh-sach" rows="3" placeholder="Dán nội dung bảng danh sách vào đây (Mỗi dòng 1 học sinh)..." style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; margin-bottom: 10px; font-family: inherit;"></textarea>
                        <button onclick="ham_18_4_doc_text_paste()" style="padding: 6px 15px; background: #17a2b8; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer;">
                            ✂️ Xử lý Dữ liệu Dán
                        </button>
                    </div>
                </div>
            </div>

            <!-- Bước 2: Chỉnh sửa tên -->
            <div id="khu-vuc-chinh-sua" style="display: none; margin-top: 20px; padding: 20px; background: #fffdf5; border-radius: 8px; border: 1px solid #ffeeba; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                    <h4 style="margin: 0; color: #856404;">BƯỚC 2: KIỂM TRA & CHỈNH SỬA TÊN HIỂN THỊ</h4>
                    <div style="display: flex; gap: 10px; align-items: center;">
                        <label style="font-weight: bold; color: #495057;">Số dãy bàn (Cột):</label>
                        <input type="number" id="input-so-cot" value="4" min="2" max="10" style="padding: 6px; width: 60px; border-radius: 4px; border: 1px solid #ccc; text-align: center;">
                        <button onclick="ham_18_6_ve_so_do_tu_bang()" style="padding: 8px 20px; background: #007bff; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
                            🎨 CHỐT & VẼ SƠ ĐỒ
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
                            <!-- Dữ liệu nạp vào đây -->
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Bước 3: Sơ đồ hiển thị -->
            <div id="khu-vuc-hien-thi-so-do" style="display: none; margin-top: 30px;">
                <div style="text-align: right; margin-bottom: 15px;">
                    <button onclick="window.print()" style="padding: 8px 20px; background: #6c757d; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">
                        🖨️ In sơ đồ
                    </button>
                </div>
                <!-- Bảng giáo viên -->
                <div style="text-align: center; margin-bottom: 40px;">
                    <div style="display: inline-block; padding: 12px 80px; background: #343a40; color: white; font-weight: bold; border-radius: 6px; letter-spacing: 3px; box-shadow: 0 4px 6px rgba(0,0,0,0.2); border-bottom: 4px solid #23272b;">
                        BẢNG GIÁO VIÊN
                    </div>
                </div>
                <!-- Khung lưới CSS Grid -->
                <div id="khung-so-do-grid" style="display: grid; gap: 20px; justify-content: center; padding-bottom: 40px;"></div>
            </div>
        </div>
    `;
};

// 18.2. ĐỌC FILE EXCEL BẰNG SHEETJS
window.ham_18_3_doc_file_excel = function () {
    if (typeof XLSX === 'undefined') return alert("Thư viện đọc Excel chưa tải xong. Vui lòng đợi 2 giây và thử lại!");

    const fileInput = document.getElementById('file-excel-danh-sach');
    if (!fileInput.files || fileInput.files.length === 0) return alert("Thầy vui lòng chọn 1 file Excel trước nhé!");

    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];

            // Ép dữ liệu thành mảng mảng (Array of Arrays) để dễ lấy theo cột
            const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

            window.DanhSachHSSoDoTam = [];
            let sttCount = 1;

            // Bỏ qua dòng tiêu đề, dò tìm các dòng có chứa Text
            for (let i = 0; i < jsonData.length; i++) {
                const row = jsonData[i];
                if (!row || row.length === 0) continue;

                // Lấy các ô có dữ liệu dạng chuỗi dài (Khả năng cao là Họ Tên)
                const textCells = row.filter(cell => typeof cell === 'string' && cell.trim().length > 3);

                if (textCells.length > 0) {
                    // Ưu tiên ô chứa họ tên (thường là ô chữ dài nhất trong dòng)
                    const hoTen = textCells.reduce((a, b) => a.length > b.length ? a : b).trim();
                    if (hoTen.toLowerCase() !== "họ và tên" && hoTen.toLowerCase() !== "họ tên") {
                        window.DanhSachHSSoDoTam.push({ stt: sttCount++, ten: hoTen });
                    }
                }
            }
            ham_18_5_render_bang_chinh_sua();
        } catch (err) {
            alert("Lỗi đọc file: Đảm bảo file Excel đúng định dạng. " + err.message);
        }
    };
    reader.readAsArrayBuffer(fileInput.files[0]);
};

// 18.3. ĐỌC DỮ LIỆU PASTE TỪ WORD/EXCEL
window.ham_18_4_doc_text_paste = function () {
    const textData = document.getElementById('text-paste-danh-sach').value;
    if (!textData.trim()) return alert("Khung dán dữ liệu đang trống!");

    const lines = textData.split('\n');
    window.DanhSachHSSoDoTam = [];
    let sttCount = 1;

    lines.forEach(line => {
        // Lọc bỏ khoảng trắng thừa và các ký tự Tab (\t)
        const parts = line.split('\t').map(p => p.trim()).filter(p => p.length > 0);
        if (parts.length > 0) {
            // Lấy phần tử dài nhất làm Họ Tên
            const hoTen = parts.reduce((a, b) => a.length > b.length ? a : b);
            // Bỏ qua các dòng Header mồ côi
            if (hoTen.toLowerCase() !== "họ và tên" && hoTen.length > 3) {
                window.DanhSachHSSoDoTam.push({ stt: sttCount++, ten: hoTen });
            }
        }
    });

    ham_18_5_render_bang_chinh_sua();
};

// 18.4. ĐỔ DỮ LIỆU LÊN BẢNG ĐỂ GIÁO VIÊN CHỈNH SỬA
window.ham_18_5_render_bang_chinh_sua = function () {
    const tbody = document.getElementById('tbody-danh-sach-edit');
    if (window.DanhSachHSSoDoTam.length === 0) {
        return alert("Không trích xuất được danh sách! Hãy đảm bảo file hoặc nội dung dán có chứa Cột Họ Tên hợp lệ.");
    }

    document.getElementById('khu-vuc-chinh-sua').style.display = 'block';

    let html = "";
    window.DanhSachHSSoDoTam.forEach((hs, index) => {
        html += `
            <tr id="row-hs-${index}" style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px; text-align: center; font-weight: bold; color: #6c757d;">${index + 1}</td>
                <td style="padding: 8px;">
                    <input type="text" id="input-ten-${index}" value="${hs.ten}" style="width: 100%; padding: 8px; border: 1px solid #17a2b8; border-radius: 4px; outline: none; font-weight: bold; color: #0056b3;">
                </td>
                <td style="padding: 10px; text-align: center;">
                    <button onclick="document.getElementById('row-hs-${index}').remove()" style="padding: 4px 8px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">🗑️ Xóa</button>
                </td>
            </tr>
        `;
    });
    tbody.innerHTML = html;
};

// 18.5. CHỐT TÊN VÀ VẼ SƠ ĐỒ LƯỚI
window.ham_18_6_ve_so_do_tu_bang = function () {
    const soCot = document.getElementById('input-so-cot').value || 4;
    const khungSoDo = document.getElementById('khung-so-do-grid');

    // Thu thập lại danh sách tên đã được chỉnh sửa từ bảng
    let danhSachChot = [];
    const tbody = document.getElementById('tbody-danh-sach-edit');
    const rows = tbody.querySelectorAll('tr');

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
        // Render Ảnh giả lập bằng tên viết tắt
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

    // Tự động cuộn xuống xem sơ đồ
    document.getElementById('khu-vuc-hien-thi-so-do').scrollIntoView({ behavior: 'smooth' });
};
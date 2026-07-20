// ==============================================================================
// KHỐI 17: QUẢN LÝ KHO CÂU HỎI TRẮC NGHIỆM (MA TRẬN & TỒN KHO)
// ==============================================================================

// =====================================================================
// KHỞI TẠO BIẾN TOÀN CỤC CHO KHỐI 17
// =====================================================================
window.Kho17State = {
    cayMaTran: {},    // 🌟 Chứa Cây thư mục (Lớp -> Môn -> Chương -> Dạng) tải từ Drive
    soCaiTonKho: {},  // Chứa số lượng tồn kho thực tế của từng ID6 (từ Supabase)
    gioHang: {},      // Lịch sử giáo viên bốc câu (VD: {"0D1N1": 2})
    tongCau: 0
};

// Khai báo biến toàn cục ở phạm vi window
window.KhoCauHoiTamThoi = {};

// Nếu muốn an toàn hơn, thầy có thể thêm kiểm tra tồn tại
if (typeof window.KhoCauHoiTamThoi === 'undefined') {
    window.KhoCauHoiTamThoi = {};
}

// =====================================================================
// Hàm 17.1: Dựng bộ khung giao diện Ma trận (Đã tích hợp nhúng vào Form)
// =====================================================================
window.ham_17_1_ve_giao_dien_ma_tran = async function (idVungChua) {
    // Nếu có truyền idVungChua (từ Khối 6a) thì dùng, nếu không thì rớt về mặc định
    const containerId = idVungChua || 'vung-lam-viec-chi-tiet';
    const vungLamViec = document.getElementById(containerId);

    if (!vungLamViec) {
        console.error(`❌ Khối 17: Không tìm thấy vùng chứa có ID là [${containerId}]`);
        return;
    }

    vungLamViec.innerHTML = `
        <div style="background: white; border-radius: 8px; padding: 10px;">
            <h3 style="color: #6f42c1; margin-top: 0; border-bottom: 2px solid #f1f3f4; padding-bottom: 10px;">
                🎯 BỘ LỌC CẤU TRÚC MA TRẬN TỰ ĐỘNG
            </h3>
            
            <div id="khoi-17-loading" style="text-align: center; padding: 30px; color: #6f42c1; font-weight: bold;">
                <div style="border: 4px solid #f3f3f3; border-top: 4px solid #6f42c1; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 0 auto 10px auto;"></div>
                Đang đồng bộ Khung ma trận và Sổ cái tồn kho...
            </div>

            <div id="khoi-17-content" style="display: none;">
                <!-- Bộ lọc ngang -->
                <div style="display: flex; gap: 15px; margin-bottom: 20px; background: #f8f9fa; padding: 15px; border-radius: 8px; border: 1px dashed #dee2e6;">
                    <div style="flex: 1;">
                        <label style="font-weight: bold; font-size: 13px; color: #495057;">Khối Lớp:</label>
                        <select id="cb_17_lop" onchange="ham_17_3_render_combobox('lop')" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; font-weight: bold; color: #1a73e8;"></select>
                    </div>
                    <div style="flex: 1;">
                        <label style="font-weight: bold; font-size: 13px; color: #495057;">Môn Học:</label>
                        <select id="cb_17_mon" onchange="ham_17_3_render_combobox('mon')" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; font-weight: bold; color: #1a73e8;"></select>
                    </div>
                    <div style="flex: 2;">
                        <label style="font-weight: bold; font-size: 13px; color: #495057;">Chương:</label>
                        <select id="cb_17_chuong" onchange="ham_17_4_render_bang_ma_tran()" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; font-weight: bold; color: #d35400;"></select>
                    </div>
                </div>

                <!-- Bảng Ma Trận -->
                <div id="khung-bang-ma-tran" style="max-height: 500px; overflow-y: auto; border: 1px solid #dee2e6; border-radius: 8px; box-shadow: inset 0 2px 5px rgba(0,0,0,0.02);"></div>
            </div>
        </div>

        
    `;

    // Gọi hàm load dữ liệu ngay sau khi vẽ xong DOM
    await ham_17_3_tai_du_lieu_he_thong();
};


// =====================================================================
// Hàm bóc tách File Map ID (ID5/ID6) thành Cây JSON
// =====================================================================
window.ham_17_2_boc_tach_tex_ma_tran = function (noiDungTex) {
    let cayMaTran = [];
    let lopHienTai = null, monHienTai = null, chuongHienTai = null, baiHienTai = null;

    const lines = noiDungTex.split('\n');

    lines.forEach((line) => {
        let codeLine = line.trim();

        // Bỏ qua dòng trống hoặc dòng ghi chú (%)
        if (!codeLine || codeLine.startsWith('%')) return;

        // Dùng Regex bắt: Số lượng dấu gạch ngang -> Mã trong ngoặc vuông -> Tên
        // VD: -------------[1] Xác định mệnh đề...
        let match = codeLine.match(/^([-]+)\[([^\]]+)\]\s*(.*)$/);
        if (!match) return;

        let soGachNgang = match[1].length; // Đếm số gạch ngang: 1, 4, 7, 10, 13
        let maID = match[2].trim();        // VD: 0, D, 1, 1...
        let tenPhan = match[3].trim();     // VD: Lớp 10, Mệnh đề...

        if (soGachNgang === 1) {
            // CẤP 1: LỚP (1 dấu gạch)
            lopHienTai = { maID: maID, ten: tenPhan, mon: [] };
            cayMaTran.push(lopHienTai);
            monHienTai = chuongHienTai = baiHienTai = null; // Reset các cấp dưới
        }
        else if (soGachNgang === 4) {
            // CẤP 2: MÔN (4 dấu gạch)
            if (!lopHienTai) return;
            monHienTai = { maID: maID, ten: tenPhan, chuong: [] };
            lopHienTai.mon.push(monHienTai);
            chuongHienTai = baiHienTai = null;
        }
        else if (soGachNgang === 7) {
            // CẤP 3: CHƯƠNG (7 dấu gạch)
            if (!monHienTai) return;
            chuongHienTai = { maID: maID, ten: tenPhan, bai: [] };
            monHienTai.chuong.push(chuongHienTai);
            baiHienTai = null;
        }
        else if (soGachNgang === 10) {
            // CẤP 4: BÀI (10 dấu gạch)
            if (!chuongHienTai) return;
            baiHienTai = { maID: maID, ten: tenPhan, dang: [] };
            chuongHienTai.bai.push(baiHienTai);
        }
        else if (soGachNgang === 13) {
            // CẤP 5: DẠNG (13 dấu gạch)
            if (!baiHienTai) return;
            baiHienTai.dang.push({
                maID: maID,
                tenDang: tenPhan
            });
        }
    });

    return cayMaTran;
};


// =====================================================================
// BƯỚC 2 + 3 (CẬP NHẬT): Tải dữ liệu ID, Bóc tách và Ráp thẳng vào Combobox
// =====================================================================
window.ham_17_3_tai_du_lieu_he_thong = async function () {
    const loadingDiv = document.getElementById('khoi-17-loading');
    const contentDiv = document.getElementById('khoi-17-content');

    try {
        // Hiện vòng xoay loading
        if (loadingDiv) {
            loadingDiv.style.display = 'block';
            loadingDiv.innerHTML = `
                <div style="text-align: center; padding: 20px;">
                    <div style="border: 4px solid #f3f3f3; border-top: 4px solid #1a73e8; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 0 auto 10px auto;"></div>
                    <span style="color: #1a73e8; font-weight: bold;">Đang tải và bóc tách cấu trúc Ma trận...</span>
                </div>
            `;
        }
        if (contentDiv) contentDiv.style.display = 'none';

        // 1. Kéo file Map_ID_Moi.tex từ Github
        const githubUrl = "https://raw.githubusercontent.com/ducchinh2308/LuyenToan2308/main/Map_ID_Moi.tex";
        const res = await fetch(githubUrl + "?t=" + new Date().getTime());
        if (!res.ok) throw new Error("Không tìm thấy file Map_ID_Moi.tex trên Github!");
        const noiDungTex = await res.text();

        // 2. Chạy hàm bóc tách đếm dấu gạch ngang (tạo ra cây JSON)
        window.Kho17State = window.Kho17State || {};
        window.Kho17State.cayMaTran = window.ham_17_2_boc_tach_tex_ma_tran(noiDungTex);

        // 3. Tắt loading, chuẩn bị vẽ HTML
        if (loadingDiv) loadingDiv.style.display = 'none';
        if (contentDiv) {
            contentDiv.style.display = 'block';

            // TẠO SẴN 1 THẺ DIV TRỐNG LÀM "SÂN KHẤU" (id="khu_vuc_combobox")
            contentDiv.innerHTML = `
                <div style="background: #e8f5e9; border: 1px solid #c8e6c9; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                    <h4 style="color: #28a745; margin-top: 0;">✅ TẢI MA TRẬN THÀNH CÔNG</h4>
                    <p style="font-size: 13px; color: #333;">Hệ thống đã đọc phân cấp ID thành công. Thầy hãy thử chọn các cấp bậc bên dưới nhé!</p>
                </div>
                
                <!-- Sân khấu để vẽ 5 ô chọn lọc -->
                <div id="khu_vuc_combobox"></div> 
            `;

            // 🌟 LỆNH KÍCH HOẠT NẰM Ở ĐÂY:
            // Lấy cây JSON vừa bóc tách đút vào hàm vẽ giao diện Combobox
            window.ham_17_5_ve_giao_dien_chon_dang(window.Kho17State.cayMaTran, 'khu_vuc_combobox');
        }

    } catch (error) {
        if (loadingDiv) {
            loadingDiv.innerHTML = `
                <div style="color: #721c24; background: #f8d7da; padding: 15px; border-radius: 8px; border: 1px solid #f5c6cb; text-align: center;">
                    <b>❌ LỖI TẢI DỮ LIỆU:</b> ${error.message} <br><br>
                    <button onclick="window.ham_17_3_tai_du_lieu_he_thong()" style="padding: 6px 15px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer;">🔄 Thử lại</button>
                </div>
            `;
        }
    }
};


// =====================================================================
// BƯỚC 3: DỰNG GIAO DIỆN BẢNG MA TRẬN 3 PHẦN (TN, DS, TLN) & CẤP ĐỘ
// =====================================================================

// Biến toàn cục
window.DuLieuMaTranToanCuc = [];
window.MaTran_SoDongHienTai = 0;


function ham_17_4_taoBangMaTranHTML(loaiCau, tieuDe, mauSac) {
    return `
        <div style="margin-bottom: 25px; border: 1px solid ${mauSac}; border-radius: 8px; overflow: hidden; background: #fff; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
            <div style="background: ${mauSac}15; padding: 12px 15px; border-bottom: 2px solid ${mauSac}; font-weight: bold; color: ${mauSac}; font-size: 15px; text-transform: uppercase;">
                ${tieuDe}
            </div>
            <div style="overflow-x: auto; padding: 10px;">
                <table style="width: 100%; border-collapse: collapse; min-width: 800px; text-align: left;">
                    <thead style="background: #f8f9fa; border-bottom: 2px solid #dee2e6;">
                        <tr>
                            <th style="padding: 10px 4px; width: 40px; text-align: center; font-size: 12px;">STT</th>
                            <th style="padding: 10px 4px; width: 60px; font-size: 12px;">Lớp</th>
                            <th style="padding: 10px 4px; width: 60px; font-size: 12px;">Phân môn</th>
                            <th style="padding: 10px 4px; width: 60px; font-size: 12px;">Chương</th>
                            <th style="padding: 10px 4px; width: 120px; font-size: 12px;">Bài</th>
                            <th style="padding: 10px 4px; width: 150px; font-size: 12px;">Dạng bài</th>
                            <th style="padding: 10px 4px; width: 60px; text-align: center; font-size: 12px;">NB</th>
                            <th style="padding: 10px 4px; width: 60px; text-align: center; font-size: 12px;">TH</th>
                            <th style="padding: 10px 4px; width: 60px; text-align: center; font-size: 12px;">VD</th>
                            <th style="padding: 10px 4px; width: 60px; text-align: center; font-size: 12px;">VDC</th>
                            <th style="padding: 10px 4px; width: 50px; text-align: center; font-size: 12px;">Xóa</th>
                        </tr>
                    </thead>
                    <tbody id="tbody_matran_${loaiCau}"></tbody>
                    <tfoot style="background: #f1f3f4; font-weight: bold;">
                        <tr>
                            <td colspan="6" style="padding: 10px; text-align: right;">TỔNG CÂU ${loaiCau}:</td>
                            <td id="sum_nb_${loaiCau}" style="text-align: center; color: #28a745;">0</td>
                            <td id="sum_th_${loaiCau}" style="text-align: center; color: #17a2b8;">0</td>
                            <td id="sum_vd_${loaiCau}" style="text-align: center; color: #f39c12;">0</td>
                            <td id="sum_vdc_${loaiCau}" style="text-align: center; color: #e74c3c;">0</td>
                            <td id="sum_total_${loaiCau}" style="text-align: center; color: #000; text-decoration: underline;">0</td>
                        </tr>
                    </tfoot>
                </table>
                <div style="margin-top: 10px;">
                    <button type="button" onclick="ham_17_6_them_dong_ma_tran('${loaiCau}')" style="padding: 8px 15px; background: ${mauSac}; color: white; border: none; border-radius: 4px; cursor: pointer;">
                        ➕ THÊM DÒNG
                    </button>
                </div>
            </div>
        </div>
    `;
}


// Hàm 1: Vẽ giao diện HTML Bảng Ma Trận
window.ham_17_5_ve_giao_dien_chon_dang = function (cayMaTran, idVungChua) {
    window.DuLieuMaTranToanCuc = cayMaTran;
    window.MaTran_SoDongHienTai = 0;

    const vungRender = document.getElementById(idVungChua);
    if (!vungRender) return alert("Không tìm thấy vùng chứa HTML: " + idVungChua);

    vungRender.innerHTML = `
        <div style="background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
            <h3 style="color: #1a73e8; margin-top: 0; border-bottom: 2px solid #e9ecef; padding-bottom: 10px;">🎯 MA TRẬN ĐỀ THI CHI TIẾT</h3>
            ${ham_17_4_taoBangMaTranHTML('TN', 'PHẦN I. Câu trắc nghiệm nhiều phương án lựa chọn', '#1a73e8')}
            ${ham_17_4_taoBangMaTranHTML('DS', 'PHẦN II. Câu trắc nghiệm đúng sai', '#d35400')}
            ${ham_17_4_taoBangMaTranHTML('TLN', 'PHẦN III. Câu trắc nghiệm trả lời ngắn', '#28a745')}

            <!-- THANH GIỎ HÀNG NẰM CỐ ĐỊNH TRONG KHUNG -->
            <div id="thanh-gio-hang-17" style="display: none; background: #2c3e50; color: white; padding: 20px; border-radius: 8px; margin-top: 25px; box-shadow: 0 4px 10px rgba(0,0,0,0.15); justify-content: space-between; align-items: center; border-left: 5px solid #f1c40f;">
                <div style="font-size: 16px; display: flex; align-items: center; gap: 15px;">
                    <div style="background: rgba(255,255,255,0.1); padding: 10px 20px; border-radius: 6px;">
                        🛒 TỔNG CỘNG TOÀN MA TRẬN: <b id="lbl_17_tong_cau" style="font-size: 28px; color: #f1c40f; margin-left: 8px;">0</b> <span style="font-size:14px; color:#ccc;">câu</span>
                    </div>
                </div>
                <button onclick="ham_17_18_thuc_thi_tao_de()" id="btn_17_chot_de" disabled style="padding: 15px 35px; background: #6c757d; color: white; border: none; border-radius: 6px; font-weight: 900; font-size: 16px; cursor: not-allowed; transition: 0.2s; text-transform: uppercase; box-shadow: 0 4px 6px rgba(0,0,0,0.2);">
                    🚀 BỐC CÂU HỎI VÀ LƯU LỆNH
                </button>
            </div>

        </div>
    `;

    // Mồi sẵn mỗi phần 1 dòng
    ham_17_6_them_dong_ma_tran('TN');
    //ham_17_6_them_dong_ma_tran('DS');
    //ham_17_6_them_dong_ma_tran('TLN');
};

// =====================================================================
// CÁC HÀM XỬ LÝ THÊM/XÓA DÒNG BẢNG (ĐA PHÂN HỆ)
// =====================================================================

window.ham_17_6_them_dong_ma_tran = function (loaiCau) {
    window.MaTran_SoDongHienTai++;
    let rowId = window.MaTran_SoDongHienTai;
    const tbody = document.getElementById(`tbody_matran_${loaiCau}`);
    if (!tbody) return;

    let tr = document.createElement('tr');
    tr.id = `row_matran_${rowId}`;
    tr.className = `dong_matran_${loaiCau}`;
    tr.style.borderBottom = "1px dashed #dee2e6";
    tr.style.transition = "background 0.2s";
    tr.onmouseover = function () { this.style.background = '#f1f8ff'; };
    tr.onmouseout = function () { this.style.background = 'transparent'; };

    // CSS ô Select ép nhỏ padding và chữ để tiết kiệm không gian
    const selStyle = "width: 100%; padding: 6px 2px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; cursor: pointer; box-sizing: border-box;";

    // CSS ô Input nhập số (Rộng 32px, bỏ nút tăng giảm, chỉ cho nhập 2 số)
    const inpStyle = "width: 32px; padding: 4px 2px; border: 1px solid #ced4da; border-radius: 4px; font-size: 13px; text-align: center; font-weight: bold; outline: none;";

    // CSS ô Hiện số tối đa (Khóa, xám, chữ nhỏ hơn, rộng 28px)
    const maxStyle = "width: 28px; padding: 4px 2px; border: 1px solid #ddd; border-radius: 4px; font-size: 11px; text-align: center; font-weight: bold; background: #e9ecef; color: #6c757d; cursor: not-allowed; outline: none;";


    // Sửa hàm tạo khối input để gắn tự động Class và sự kiện oninput
    const taoKhoiNhapSo = (idInput, idMax, color, bgColor, borderColor, loaiCau) => {
        // 1. Xác định class dựa trên idInput để hàm thống kê tìm được
        let className = "";
        if (idInput.includes('sl_nb')) className = "input-nb";
        else if (idInput.includes('sl_th')) className = "input-th";
        else if (idInput.includes('sl_vdc')) className = "input-vdc"; // Chú ý: Đặt vdc trước vd để không bị nhận diện nhầm
        else if (idInput.includes('sl_vd')) className = "input-vd";

        // 2. Trả về giao diện đã nhúng class="${className}"
        return `
            <div style="display: flex; align-items: center; justify-content: center; gap: 3px;">
                <input type="text" id="${idInput}" class="${className}" maxlength="2" placeholder="0" 
                    style="${inpStyle} color: ${color}; background: ${bgColor}; border-color: ${borderColor};" 
                    onfocus="this.style.background='#fff'" 
                    onblur="this.style.background='${bgColor}'" 
                    oninput="this.value=this.value.replace(/[^0-9]/g,''); ham_17_16_cap_nhat_thong_ke('${loaiCau}')"> 
                
                <span style="color: #adb5bd; font-size: 14px; font-weight: bold;">/</span>
                
                <input type="text" id="${idMax}" value="-" readonly tabindex="-1" style="${maxStyle}">
            </div>
        `;
    };
    tr.innerHTML = `
        <td style="padding: 8px 4px; text-align: center; font-weight: bold; color: #6c757d;" class="stt_dong_${loaiCau}"></td>
        <td style="padding: 8px 4px;"><select id="sel_lop_${rowId}" onchange="ham_17_10_change_lop(${rowId})" style="${selStyle}"></select></td>
        <td style="padding: 8px 4px;"><select id="sel_mon_${rowId}" onchange="ham_17_11_change_mon(${rowId})" style="${selStyle}"></select></td>
        <td style="padding: 8px 4px;"><select id="sel_chuong_${rowId}" onchange="ham_17_12_change_chuong(${rowId})" style="${selStyle}"></select></td>
        <td style="padding: 8px 4px;"><select id="sel_bai_${rowId}" onchange="ham_17_13_change_bai(${rowId}, '${loaiCau}')" style="${selStyle}"></select></td>
        <td style="padding: 8px 4px;"><select id="sel_dang_${rowId}" onchange="ham_17_15_change_dang('${loaiCau}', ${rowId})" style="${selStyle} border: 1px solid #f39c12; background: #fffdf5; color: #d35400; font-weight: bold;"></select></td>
        
        <td style="padding: 8px 4px;">${taoKhoiNhapSo(`sl_nb_${rowId}`, `max_nb_${rowId}`, '#28a745', '#f0fff4', '#c3e6cb', loaiCau)}</td>
        <td style="padding: 8px 4px;">${taoKhoiNhapSo(`sl_th_${rowId}`, `max_th_${rowId}`, '#17a2b8', '#e0f7fa', '#b8daff', loaiCau)}</td>
        <td style="padding: 8px 4px;">${taoKhoiNhapSo(`sl_vd_${rowId}`, `max_vd_${rowId}`, '#f39c12', '#fff8e1', '#ffeeba', loaiCau)}</td>
        <td style="padding: 8px 4px;">${taoKhoiNhapSo(`sl_vdc_${rowId}`, `max_vdc_${rowId}`, '#e74c3c', '#ffebee', '#f5c6cb', loaiCau)}</td>
        
        <td style="padding: 8px 4px; text-align: center;">
            <button onclick="ham_17_7_xoa_dong_ma_tran('${loaiCau}', ${rowId})" ... >🗑️</button>
        </td>
    `;

    tbody.appendChild(tr);

    ham_17_9_load_lop(rowId);
    ham_17_8_cap_nhat_stt(loaiCau);
};


// window.ham_17_7_cap_nhat_max_cau = function (rowId, maxNB, maxTH, maxVD, maxVDC) {
//     // Gán placeholder dạng "/4", "/3", v.v.
//     document.getElementById(`sl_nb_${rowId}`).placeholder = `/${maxNB}`;
//     document.getElementById(`sl_th_${rowId}`).placeholder = `/${maxTH}`;
//     document.getElementById(`sl_vd_${rowId}`).placeholder = `/${maxVD}`;
//     document.getElementById(`sl_vdc_${rowId}`).placeholder = `/${maxVDC}`;
// };


// Thêm hàm này vào file JS của thầy
// window.ham_format_so_cau = function (input) {
//     const placeholder = input.getAttribute('placeholder'); // Lấy cái "/4"
//     let val = input.value.replace(/[^0-9]/g, ''); // Chỉ lấy số

//     if (val !== "") {
//         // Nếu giá trị nhập vào vượt quá max thì chặn lại
//         const max = parseInt(placeholder.replace('/', ''));
//         if (parseInt(val) > max) val = max;

//         input.value = val + placeholder;
//     }
// };

// Khi focus vào thì xóa sạch "/4" để thầy/cô gõ số bình thường
// window.ham_focus_so_cau = function (input) {
//     input.value = input.value.replace(input.getAttribute('placeholder'), '');
// };


window.ham_17_7_xoa_dong_ma_tran = function (loaiCau, rowId) {
    const tr = document.getElementById(`row_matran_${rowId}`);
    if (tr) {
        tr.remove();
        // 1. Cập nhật lại số thứ tự (STT) cho các dòng còn lại
        ham_17_8_cap_nhat_stt(loaiCau);

        // 2. Cập nhật lại thống kê tổng số câu
        ham_17_16_cap_nhat_thong_ke(loaiCau);
    }
};




window.ham_17_8_cap_nhat_stt = function (loaiCau) {
    // Tìm tất cả các thẻ td thuộc loại câu đó
    let danhSachSTT = document.querySelectorAll(`.dong_matran_${loaiCau} .stt_dong_${loaiCau}`);

    danhSachSTT.forEach((td, index) => {
        td.innerText = index + 1; // Gán số thứ tự bắt đầu từ 1
    });
};


// =====================================================================
// CÁC HÀM XỬ LÝ LỌC DỮ LIỆU ĐỔ RẠP (CASCADING) CHO TỪNG DÒNG
// =====================================================================

window.ham_17_9_load_lop = function (rowId) {
    const selLop = document.getElementById(`sel_lop_${rowId}`);
    if (!selLop) return;

    selLop.innerHTML = '<option value="">-- Lớp --</option>';
    window.DuLieuMaTranToanCuc.forEach((lop, index) => {
        selLop.innerHTML += `<option value="${index}">[${lop.maID}] ${lop.ten}</option>`;
    });

    //ham_17_10_change_lop(rowId);
};


window.ham_17_10_change_lop = function (rowId) {
    const selLop = document.getElementById(`sel_lop_${rowId}`);
    const selMon = document.getElementById(`sel_mon_${rowId}`);
    // Giả sử có thêm các ô này để reset
    const selChuong = document.getElementById(`sel_chuong_${rowId}`);
    const selBai = document.getElementById(`sel_bai_${rowId}`);
    const selDang = document.getElementById(`sel_dang_${rowId}`);

    if (!selLop || !selMon) return;

    // 1. Reset các ô chọn phía sau về trạng thái ban đầu
    selMon.innerHTML = '<option value="">-- Môn --</option>';
    if (selChuong) selChuong.innerHTML = '<option value="">-- Chương --</option>';
    if (selBai) selBai.innerHTML = '<option value="">-- Bài --</option>';
    if (selDang) selDang.innerHTML = '<option value="">-- Dạng --</option>';

    // Reset các ô nhập số nếu cần thiết
    document.getElementById(`max_nb_${rowId}`).value = "-";

    // 2. Nạp dữ liệu Môn dựa trên Lớp đã chọn
    let idxLop = selLop.value;
    if (idxLop !== "") {
        let dsMon = window.DuLieuMaTranToanCuc[idxLop].mon || [];
        dsMon.forEach((mon, index) => {
            selMon.innerHTML += `<option value="${index}">[${mon.maID}] ${mon.ten}</option>`;
        });
    }

    // 3. BỎ DÒNG GỌI HÀM NÀY ĐỂ KHÔNG TỰ ĐỘNG KÍCH HOẠT CHUỖI ĐẾM CÂU
    // ham_17_11_change_mon(rowId);
};


window.ham_17_11_change_mon = function (rowId) {
    const selLop = document.getElementById(`sel_lop_${rowId}`);
    const selMon = document.getElementById(`sel_mon_${rowId}`);
    const selChuong = document.getElementById(`sel_chuong_${rowId}`);
    // Bổ sung lấy thêm các ô cần reset
    const selBai = document.getElementById(`sel_bai_${rowId}`);
    const selDang = document.getElementById(`sel_dang_${rowId}`);

    if (!selLop || !selMon || !selChuong) return;

    // 1. Reset các ô chọn phía sau khi đổi Môn
    selChuong.innerHTML = '<option value="">-- Chương --</option>';
    if (selBai) selBai.innerHTML = '<option value="">-- Bài --</option>';
    if (selDang) selDang.innerHTML = '<option value="">-- Dạng --</option>';

    let idxLop = selLop.value;
    let idxMon = selMon.value;

    // 2. Nạp dữ liệu Chương dựa trên Lớp và Môn đã chọn
    if (idxLop !== "" && idxMon !== "") {
        let dsChuong = window.DuLieuMaTranToanCuc[idxLop].mon[idxMon].chuong || [];
        dsChuong.forEach((chuong, index) => {
            selChuong.innerHTML += `<option value="${index}">[${chuong.maID}] ${chuong.ten}</option>`;
        });
    }

    // 3. BỎ DÒNG NÀY ĐỂ KHÔNG TỰ ĐỘNG CHỌN CHƯƠNG/BÀI/ĐẾM CÂU
    // ham_17_12_change_chuong(rowId);
};





window.ham_17_12_change_chuong = function (rowId) {
    const selLop = document.getElementById(`sel_lop_${rowId}`);
    const selMon = document.getElementById(`sel_mon_${rowId}`);
    const selChuong = document.getElementById(`sel_chuong_${rowId}`);
    const selBai = document.getElementById(`sel_bai_${rowId}`);
    const selDang = document.getElementById(`sel_dang_${rowId}`); // Thêm ô Dạng nếu có

    if (!selLop || !selMon || !selChuong || !selBai) return;

    // 1. Reset các ô chọn phía sau khi đổi Chương
    selBai.innerHTML = '<option value="">-- Bài --</option>';
    if (selDang) selDang.innerHTML = '<option value="">-- Dạng --</option>';

    let idxLop = selLop.value;
    let idxMon = selMon.value;
    let idxChuong = selChuong.value;

    // 2. Nạp dữ liệu Bài dựa trên các lựa chọn hiện tại
    if (idxLop !== "" && idxMon !== "" && idxChuong !== "") {
        let dsBai = window.DuLieuMaTranToanCuc[idxLop].mon[idxMon].chuong[idxChuong].bai || [];
        dsBai.forEach((bai, index) => {
            selBai.innerHTML += `<option value="${index}">[${bai.maID}] ${bai.ten}</option>`;
        });
    }

    // 3. BỎ DÒNG NÀY ĐỂ KHÔNG TỰ ĐỘNG KÍCH HOẠT CHUỖI ĐẾM CÂU
    // ham_17_13_change_bai(rowId);
};





window.ham_17_13_change_bai = function (rowId, loaiCau) {
    const selLop = document.getElementById(`sel_lop_${rowId}`);
    const selMon = document.getElementById(`sel_mon_${rowId}`);
    const selChuong = document.getElementById(`sel_chuong_${rowId}`);
    const selBai = document.getElementById(`sel_bai_${rowId}`);
    const selDang = document.getElementById(`sel_dang_${rowId}`);

    if (!selLop || !selMon || !selChuong || !selBai || !selDang) return;

    // 1. Reset combo dạng bài
    selDang.innerHTML = '<option value="[0]">[0] Tất cả dạng</option>';
    let idxLop = selLop.value;
    let idxMon = selMon.value;
    let idxChuong = selChuong.value;
    let idxBai = selBai.value;

    // 2. Nạp dữ liệu các Dạng bài tương ứng với Bài đã chọn
    if (idxLop !== "" && idxMon !== "" && idxChuong !== "" && idxBai !== "") {
        let dsDang = window.DuLieuMaTranToanCuc[idxLop].mon[idxMon].chuong[idxChuong].bai[idxBai].dang || [];

        dsDang.forEach((dang, index) => {
            selDang.innerHTML += `<option value="${index}">[${dang.maID}] ${dang.tenDang}</option>`;
        });
        selDang.selectedIndex = 0;
    } else {
        selDang.selectedIndex = 0;
    }

    // 3. BỎ DÒNG GỌI HÀM NÀY ĐỂ NGẮT CHUỖI TỰ ĐỘNG ĐẾM CÂU
    ham_17_15_change_dang(loaiCau, rowId);
};




window.ham_17_14_lay_chuoi_trong_ngoac_vuong = function (chuoi) {
    if (!chuoi) return ""; // Bẫy lỗi nếu chuỗi bị undefined hoặc rỗng

    // Tìm dấu [ đầu tiên, lấy mọi thứ bên trong miễn không phải dấu ], và dừng ở dấu ] đầu tiên
    const match = chuoi.match(/\[([^\]]*)\]/);

    return match ? match[1] : "";
}




window.ham_17_15_change_dang = async function (loaiCau, rowId) {
    //console.log("--- Đang bắt đầu hàm ---");
    //console.log("URL API:", CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP);

    if (!CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP) {
        alert("Lỗi: Không tìm thấy URL API trong cấu hình!");
        return;
    }

    // Helper để lấy text từ một ID select
    const getText = (id) => {
        const el = document.getElementById(id);
        return el ? el.options[el.selectedIndex].text : "";
    };

    // Đọc nội dung hiển thị từ các combobox
    const textLop = getText(`sel_lop_${rowId}`);
    const textMon = getText(`sel_mon_${rowId}`);
    const textChuong = getText(`sel_chuong_${rowId}`);
    const textBai = getText(`sel_bai_${rowId}`);
    const textDang = getText(`sel_dang_${rowId}`);

    //console.log("Nội dung đã chọn:", { textLop, textMon, textChuong, textBai, textDang });

    // Sau đó thầy dùng hàm window.ham_17_14_lay_chuoi_trong_ngoac_vuong
    // để bóc tách ID từ cái text vừa lấy được (ví dụ: [2D1N1-1]...)

    const maLop = window.ham_17_14_lay_chuoi_trong_ngoac_vuong(textLop);
    const maMon = window.ham_17_14_lay_chuoi_trong_ngoac_vuong(textMon);
    const maChuong = window.ham_17_14_lay_chuoi_trong_ngoac_vuong(textChuong);
    const maBai = window.ham_17_14_lay_chuoi_trong_ngoac_vuong(textBai);
    const maDang = window.ham_17_14_lay_chuoi_trong_ngoac_vuong(textDang);

    const idCauchuaX = "[" + maLop + maMon + maChuong + "x" + maBai + "-" + maDang + "]";
    //console.log("Các mã ID đã bóc tách:", { maLop, maMon, maChuong, maBai, maDang, idCauchuaX });

    // 2. Kiểm tra và ghép chuỗi tạo thành mã ID hoàn chỉnh



    const cacMuc = ['nb', 'th', 'vd', 'vdc'];
    //console.log("Đang quét kho câu hỏi cho maDang:", maDang, "loaiCau:", loaiCau, "rowId:", rowId);
    // 1. Reset UI
    cacMuc.forEach(muc => {
        const lbl = document.getElementById(`max_${muc}_${rowId}`);
        const inp = document.getElementById(`sl_${muc}_${rowId}`);
        if (lbl) { lbl.innerText = 'Kho: ⏳'; lbl.style.color = '#f39c12'; }
        if (inp) { inp.disabled = true; inp.style.background = '#e9ecef'; }
    });

    // 1. Hiển thị thông báo chờ (Loading)
    // Swal.fire({
    //     title: 'Đang tải dữ liệu...',
    //     text: 'Hệ thống đang quét file trên Google Drive, vui lòng chờ trong giây lát...',
    //     allowOutsideClick: false,
    //     didOpen: () => { Swal.showLoading(); }
    // });

    try {
        const response = await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
            method: "POST",
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify({
                action: "dem_cau_hoi_ID_theo_4_muc_do",
                idChuaX: idCauchuaX,
                loaiCau: loaiCau
            })
        });

        const textResponse = await response.text();
        const result = JSON.parse(textResponse);

        if (result.status !== "success") throw new Error(result.message);

        const KhoCauHoiTraVe = result.data;

        // 🌟 LƯU DATA VÀO BIẾN TOÀN CỤC ĐỂ DÙNG KHI TẠO HỌC LIỆU
        // Dạng: { N: { "[2D1N2-7]": ... }, H: { ... } }
        //window.KhoCauHoiTamThoi = result.data;

        //console.log("🔍 [DEBUG] Loại dữ liệu (Type):", typeof window.KhoCauHoiTamThoi);
        //console.log("🔍 [DEBUG] Giá trị thực tế:", window.KhoCauHoiTamThoi);

        // // Nếu là Array, in ra độ dài. Nếu là Object, in ra danh sách các Key
        // if (Array.isArray(window.KhoCauHoiTamThoi)) {
        //     console.log("✅ Dữ liệu là Array, độ dài:", window.KhoCauHoiTamThoi.length);
        // } else if (typeof window.KhoCauHoiTamThoi === 'object') {
        //     console.log("✅ Dữ liệu là Object, các key hiện có:", Object.keys(window.KhoCauHoiTamThoi));
        // }

        
        const mapMuc = { 'nb': 'N', 'th': 'H', 'vd': 'V', 'vdc': 'C' };
        const cacMuc = ['nb', 'th', 'vd', 'vdc'];

        cacMuc.forEach(muc => {
            const oMax = document.getElementById(`max_${muc}_${rowId}`);
            const oNhap = document.getElementById(`sl_${muc}_${rowId}`);
            

            // 🌟 ĐẾM SỐ CÂU TỪ DATA
            //const dataMuc = window.KhoCauHoiTamThoi[mapMuc[muc]];
            const dataMuc = KhoCauHoiTraVe[mapMuc[muc]];

            let soLuong = 0;
            for (let dang in dataMuc) {
                if (dataMuc[dang][loaiCau]) {
                    soLuong += dataMuc[dang][loaiCau].length;
                }
            }

            if (oMax) {
                oMax.value = soLuong;
                oMax.style.color = soLuong > 0 ? '#495057' : '#dc3545';
            }

            if (oNhap) {
                oNhap.setAttribute('data-max', soLuong);
                oNhap.disabled = (soLuong === 0);
                oNhap.style.background = (soLuong === 0) ? '#e9ecef' : '#fff';
                if (soLuong === 0) oNhap.value = '';
            }
        });

    } catch (e) {
        Swal.fire({ icon: 'error', title: 'Lỗi', text: 'Có lỗi xảy ra: ' + e.message });
    }
};




window.ham_17_16_cap_nhat_thong_ke = function (loaiCau) {
    const tbody = document.getElementById(`tbody_matran_${loaiCau}`);
    //console.log("Đang quét bảng:", loaiCau, "Tbody tồn tại:", !!tbody);

    if (!tbody) return; // Kiểm tra an toàn: nếu không tìm thấy tbody thì thoát

    const rows = tbody.querySelectorAll('tr');
    let nB = 0, tH = 0, vD = 0, vDC = 0;

    rows.forEach((row,index) => {
        // Dùng parseInt và ép kiểu về 0 nếu giá trị trống hoặc không phải số
        const valNb = parseInt(row.querySelector('.input-nb')?.value) || 0;
        const valTh = parseInt(row.querySelector('.input-th')?.value) || 0;
        const valVd = parseInt(row.querySelector('.input-vd')?.value) || 0;
        const valVdc = parseInt(row.querySelector('.input-vdc')?.value) || 0;

        //console.log(`Dòng ${index} - Số NB:`, valNb); // Kiểm tra xem có lấy được giá trị không
        //console.log(`Dòng ${index} - Số TH:`, valTh);
        //console.log(`Dòng ${index} - Số VD:`, valVd);
        //console.log(`Dòng ${index} - Số VDC:`, valVdc);

        nB += valNb;
        tH += valTh;
        vD += valVd;
        vDC += valVdc;
    });

    // Cập nhật lên giao diện
    const sumNb = document.getElementById(`sum_nb_${loaiCau}`);
    const sumTh = document.getElementById(`sum_th_${loaiCau}`);
    const sumVd = document.getElementById(`sum_vd_${loaiCau}`);
    const sumVdc = document.getElementById(`sum_vdc_${loaiCau}`);
    const sumTotal = document.getElementById(`sum_total_${loaiCau}`);

    if (sumNb) sumNb.innerText = nB;
    if (sumTh) sumTh.innerText = tH;
    if (sumVd) sumVd.innerText = vD;
    if (sumVdc) sumVdc.innerText = vDC;
    if (sumTotal) sumTotal.innerText = (nB + tH + vD + vDC);

    console.log(`Cập nhật tổng cho loại câu ${loaiCau}: NB=${nB}, TH=${tH}, VD=${vD}, VDC=${vDC}, Total=${nB + tH + vD + vDC}`);
    // Cập nhật tổng toàn bộ ma trận (nếu hàm này tồn tại)
    if (typeof ham_17_17_cap_nhat_tong_toan_bo === 'function') {
        ham_17_17_cap_nhat_tong_toan_bo();
    }
};

window.ham_17_17_cap_nhat_tong_toan_bo = function () {
    // 1. Lấy dữ liệu tổng của từng phân hệ (Ép về 0 nếu bảng rỗng)
    const soCauTN = parseInt(document.getElementById('sum_total_TN')?.innerText || 0);
    const soCauDS = parseInt(document.getElementById('sum_total_DS')?.innerText || 0);
    const soCauTLN = parseInt(document.getElementById('sum_total_TLN')?.innerText || 0);

    // 2. Tính tổng toàn bộ ma trận
    const tongSoCau = soCauTN + soCauDS + soCauTLN;

    // 3. Hiển thị lên Thanh Giỏ Hàng (Thanh cố định dưới đáy màn hình)
    const thanhGioHang = document.getElementById('thanh-gio-hang-17');
    const lblTongCau = document.getElementById('lbl_17_tong_cau');
    const btnChotDe = document.getElementById('btn_17_chot_de');

    if (thanhGioHang) {
        thanhGioHang.style.display = 'flex'; // Ép hiện thanh giỏ hàng lên
    }

    if (lblTongCau) {
        lblTongCau.innerText = tongSoCau; // In số lượng lên màn hình
    }

    // 4. Mở khóa nút "BỐC CÂU HỎI VÀ LƯU LỆNH" nếu tổng số câu > 0
    if (btnChotDe) {
        if (tongSoCau > 0) {
            btnChotDe.disabled = false;
            btnChotDe.style.background = '#28a745'; // Nút chuyển xanh lá
            btnChotDe.style.cursor = 'pointer';
        } else {
            btnChotDe.disabled = true;
            btnChotDe.style.background = '#6c757d'; // Nút xám (Khóa)
            btnChotDe.style.cursor = 'not-allowed';
        }
    }
};


// =====================================================================
// Hàm hỗ trợ: Trích xuất ID chuẩn [2D1x1-1] từ một dòng ma trận
// =====================================================================
window.lay_id_cau_chua_x_tu_row = function (row) {
    if (!row) return null;

    // 1. Lấy ID của dòng (Ví dụ: từ 'row_matran_1' -> lấy '1')
    const rowId = row.getAttribute('data-row-id') || row.id.replace('row_matran_', '');
    if (!rowId) return null;

    // Helper nội bộ để lấy text từ thẻ select
    const getTextFromSelect = (selectId) => {
        const el = document.getElementById(selectId);
        return (el && el.selectedIndex >= 0) ? el.options[el.selectedIndex].text : "";
    };

    // 2. Đọc nội dung Text đang hiển thị trên 5 combobox
    const textLop = getTextFromSelect(`sel_lop_${rowId}`);
    const textMon = getTextFromSelect(`sel_mon_${rowId}`);
    const textChuong = getTextFromSelect(`sel_chuong_${rowId}`);
    const textBai = getTextFromSelect(`sel_bai_${rowId}`);
    const textDang = getTextFromSelect(`sel_dang_${rowId}`);

    // 3. Dùng hàm bóc tách mã trong ngoặc vuông (Hàm thầy đã có sẵn)
    const maLop = window.ham_17_14_lay_chuoi_trong_ngoac_vuong(textLop) || "";
    const maMon = window.ham_17_14_lay_chuoi_trong_ngoac_vuong(textMon) || "";
    const maChuong = window.ham_17_14_lay_chuoi_trong_ngoac_vuong(textChuong) || "";
    const maBai = window.ham_17_14_lay_chuoi_trong_ngoac_vuong(textBai) || "";
    const maDang = window.ham_17_14_lay_chuoi_trong_ngoac_vuong(textDang) || "";

    // 4. Kiểm tra xem giáo viên đã chọn đủ đến cột "Dạng" chưa
    // Nếu chưa chọn Dạng thì dòng này coi như chưa hợp lệ, bỏ qua không lấy ID
    if (!maLop || !maMon || !maChuong || !maBai || !maDang) {
        return null;
    }

    // 5. Ghép chuỗi tạo thành ID hoàn chỉnh
    const idCauchuaX = `[${maLop}${maMon}${maChuong}x${maBai}-${maDang}]`;

    return idCauchuaX;
};

window.ham_17_19_boc_cau_theo_dong = function (idDang, loaiCau, mucDo, soLuong) {
    // 1. Kiểm tra tầng 1 & 2
    if (!window.KhoCauHoiTamThoi[idDang] || !window.KhoCauHoiTamThoi[idDang][loaiCau]) {
        console.warn("Chưa tải kho cho dạng này:", idDang, loaiCau);
        return [];
    }

    // 2. Lấy danh sách câu và lọc theo tầng 3 (mucDo)
    let dsGoc = window.KhoCauHoiTamThoi[idDang][loaiCau];
    let dsLoc = dsGoc.filter(c => c.mucDo === mucDo); // Lọc mức độ NB, TH, VD, VDC

    // 3. Kiểm tra số lượng
    if (dsLoc.length < soLuong) {
        console.error("Không đủ câu! Cần:", soLuong, "Còn:", dsLoc.length);
        return []; // Báo lỗi cho hàm kiểm tra phía trên xử lý
    }

    // 4. Xáo trộn và lấy (Fisher-Yates)
    let dsTron = [...dsLoc].sort(() => Math.random() - 0.5);
    return dsTron.slice(0, soLuong);
};


window.ham_17_18_thuc_thi_tao_de = async function () {
    let gioHang = { 'TN': [], 'DS': [], 'TLN': [] };
    let dsYeuCau = [];
    const danhSachBang = ['TN', 'DS', 'TLN'];
    const mapMucDoUI = { 'nb': 'N', 'th': 'H', 'vd': 'V', 'vdc': 'C' };

    // --- PHA 1: ĐỌC MA TRẬN, LẬP DANH SÁCH YÊU CẦU ---
    // (Giữ nguyên chính xác code Pha 1 của thầy)
    danhSachBang.forEach(loaiCau => {
        const tbody = document.getElementById(`tbody_matran_${loaiCau}`);
        if (!tbody) return;

        tbody.querySelectorAll('tr').forEach(row => {
            const idCauChuaX = lay_id_cau_chua_x_tu_row(row);
            //console.log(`Row ${row.id} - idCauChuaX:`, idCauChuaX);
            if (!idCauChuaX) return;

            
            for (let keyUI in mapMucDoUI) {
                const mucDo = mapMucDoUI[keyUI];
                const idCau = idCauChuaX.replace("x", mucDo);
                const sl = parseInt(row.querySelector(`.input-${keyUI}`)?.value || 0);
                if (sl > 0) {
                    dsYeuCau.push({ idCau: idCau, loai: loaiCau, sl: sl });
                    //console.log(`Yêu cầu bốc: ${idCau} - Loại: ${loaiCau} - Số lượng: ${sl}`)
                }
            }
        });
    });

    if (dsYeuCau.length === 0) return alert("Thầy chưa cấu hình số lượng câu hỏi cần bốc!");

    // --- PHA 2: GỌI API NHỜ SERVER BỐC CÂU GIÚP ---
    Swal.fire({ title: 'Đang mở kho và bốc đề...', didOpen: () => Swal.showLoading() });
    console.log("Danh sách yêu cầu bốc:", dsYeuCau);
    try {
        const resVao = await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
            method: "POST",
            body: JSON.stringify({ action: "tai_cau_hoi_theo_danh_sach_ID", danhSachYeuCau: dsYeuCau })
        });

        const resultVao = await resVao.json();
        console.log("Kết quả từ API bốc câu hỏi:", resultVao);




        if (resultVao.status !== "success") throw new Error("Lỗi API: " + resultVao.message);

        const ketQuaTraVe = resultVao.data;
     
        Swal.close(); // Tắt popup "Đang bốc đề..."

        // 🌟 BẬT POP-UP GIAO DIỆN DUYỆT BÀI
        ham_17_20_hien_thi_popup_duyet_cau(ketQuaTraVe);

    } catch (e) {
        Swal.fire('Lỗi bốc đề', e.message, 'error');
    }
};

window.ham_17_20_hien_thi_popup_duyet_cau = function (ketQuaTraVe) {
    // Lưu tạm vào RAM để dùng cho các bước sau
    window.DanhSachHocLieuTam = ketQuaTraVe;

    // Dựng danh sách câu hỏi cột bên trái
    let htmlDanhSachLeft = '';
    ketQuaTraVe.forEach((nhom) => {
        if (nhom.danhsachfilelay && nhom.danhsachfilelay.length > 0) {
            htmlDanhSachLeft += `
                <div style="background: #e8f4fd; color: #0056b3; padding: 6px 10px; font-weight: bold; font-size: 13px; border-bottom: 1px solid #b8daff;">
                    Dạng: ${nhom.idCau} (${nhom.loai})
                </div>`;

            nhom.danhsachfilelay.forEach((cau, cauIdx) => {
                // Escape các ký tự đặc biệt trong tên file để tránh lỗi HTML
                const tenAnToan = (cau.fileName || 'Không tên').replace(/'/g, "\\'");

                htmlDanhSachLeft += `
                    <div onclick="ham_17_21_xem_noi_dung_cau_popup('${cau.fileId}', '${tenAnToan}', this)" 
                         class="item-cau-boc-duyet" 
                         style="padding: 10px; border-bottom: 1px dashed #ddd; cursor: pointer; font-size: 13px; transition: 0.2s; display: flex; align-items: flex-start; gap: 8px;">
                         <span style="color: #28a745;">${cauIdx + 1}.</span> 
                         <span style="flex:1; word-break: break-word;">${cau.fileName}</span>
                    </div>`;
            });
        }
    });

    // Bật Pop-up Swal
    Swal.fire({
        title: 'DUYỆT CÂU HỎI TRƯỚC KHI TẠO ĐỀ',
        html: `
            <div style="display: flex; height: 60vh; min-height: 450px; text-align: left; border: 1px solid #ccc; border-radius: 8px; overflow: hidden;">
                <!-- Cột trái: Danh sách File -->
                <div style="width: 320px; border-right: 1px solid #ccc; overflow-y: auto; background: #fff;">
                    ${htmlDanhSachLeft}
                </div>
                <!-- Cột phải: Xem nội dung File -->
                <div id="vung_xem_truoc_noi_dung_popup" style="flex: 1; padding: 20px; overflow-y: auto; background: #fdfdfe;">
                    <div style="height: 100%; display: flex; align-items: center; justify-content: center; color: #888; flex-direction: column;">
                        <span style="font-size: 30px; margin-bottom: 10px;">👈</span>
                        <h4 style="margin: 0;">Thầy vui lòng bấm vào một câu bên trái để duyệt nội dung.</h4>
                    </div>
                </div>
            </div>
        `,
        width: '950px',
        showCancelButton: true,
        confirmButtonText: '🚀 CHỐT & XUẤT HỌC LIỆU',
        cancelButtonText: 'Hủy / Chọn lại',
        confirmButtonColor: '#28a745',
        cancelButtonColor: '#dc3545',
        customClass: {
            container: 'swal-wide-container'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            // Khi thầy bấm Chốt, ta tiến hành Pha 4 (Tải ruột toàn bộ và xuất)
            ham_17_22_kich_hoat_xuat_hoc_lieu(ketQuaTraVe);
        }
    });
};



window.ham_17_21_xem_noi_dung_cau_popup = async function (fileId, fileName, elNode) {
    // Đổi màu phần tử trong danh sách
    document.querySelectorAll('.item-cau-boc-duyet').forEach(el => {
        el.style.background = 'white';
    });
    if (elNode) {
        elNode.style.background = '#d4edda';
    }

    const vungXem = document.getElementById('vung_xem_truoc_noi_dung_popup');
    vungXem.innerHTML = `<div style="text-align: center; padding: 50px; color: #1a73e8;">⏳ Đang tải nội dung chi tiết của câu hỏi...</div>`;

    // 🌟 LOG DEBUG GIAI ĐOẠN 1: Gửi Request
    console.log(`[DEBUG 17.21] Bắt đầu gọi API tải ruột cho File ID: ${fileId}`);

    try {
        const res = await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
            method: "POST",
            body: JSON.stringify({
                action: "tai_ruot_file_json_da_boc",
                danhSachFileId: [fileId]
            })
        });

        const result = await res.json();

        // 🌟 LOG DEBUG GIAI ĐOẠN 2: Nhận Response
        console.log(`[DEBUG 17.21] Server trả về:`, result);

        // Bẫy lỗi 1: Server trả về status error
        if (result.status !== "success") {
            throw new Error(`Máy chủ báo lỗi: ${result.message || 'Không rõ nguyên nhân'}`);
        }

        // Bẫy lỗi 2: Dữ liệu (data) không phải là một Object hợp lệ
        if (!result.data || typeof result.data !== 'object') {
            throw new Error(`Dữ liệu cấu trúc trả về bị hỏng. (data = ${typeof result.data})`);
        }

        // Bẫy lỗi 3: Không lấy được file (Lỗi undefined)
        const dataCauHoi = result.data[fileId];

        // 🌟 LOG DEBUG GIAI ĐOẠN 3: Bóc tách file
        console.log(`[DEBUG 17.21] Bóc tách File ID [${fileId}]:`, dataCauHoi);

        if (!dataCauHoi) {
            throw new Error(`Hệ thống không tìm thấy file này trên Google Drive, hoặc file đã bị khóa quyền truy cập.`);
        }

        // Bẫy lỗi 4: Lỗi từ chính quá trình đọc của Apps Script (do bạn cắm trong Code.gs)
        if (dataCauHoi.error) {
            throw new Error(`Lỗi đọc file từ máy chủ: ${dataCauHoi.error}`);
        }

        const htmlNoiDung = dataCauHoi.noiDungHtml || dataCauHoi.noi_dung || dataCauHoi.cauHoi || `<div style="color:red; font-style:italic;">Không tìm thấy dữ liệu HTML trong File JSON này.</div>`;

        vungXem.innerHTML = `
            <div style="border-bottom: 2px solid #eee; padding-bottom: 10px; margin-bottom: 15px;">
                <h4 style="color: #d35400; margin: 0;">${fileName}</h4>
                <div style="font-size: 12px; color: #666; margin-top: 5px;">Mã File (Drive): ${fileId}</div>
            </div>
            <div style="font-size: 15px; line-height: 1.6; color: #333; overflow-x: auto;">
                ${htmlNoiDung}
            </div>
        `;

        if (window.renderMathInElement) {
            window.renderMathInElement(vungXem, {
                delimiters: [{ left: "$$", right: "$$", display: true }, { left: "$", right: "$", display: false }],
                throwOnError: false
            });
        } else if (window.MathJax) {
            MathJax.typesetPromise([vungXem]);
        }

    } catch (err) {
        // 🌟 LOG DEBUG GIAI ĐOẠN 4: Ghi Lỗi
        console.error(`[DEBUG 17.21] THẤT BẠI:`, err);

        vungXem.innerHTML = `
            <div style="color: #721c24; background: #f8d7da; border: 1px solid #f5c6cb; padding: 20px; border-radius: 8px; text-align: center;">
                ❌ <b>Không tải được câu hỏi</b><br><br>
                ${err.message}<br><br>
                <i style="font-size:12px;">Mã Drive bị kẹt: ${fileId}</i>
            </div>
        `;
    }
};

// =====================================================================
// KHỐI 17: XUẤT HỌC LIỆU TRẮC NGHIỆM TỪ DANH SÁCH BỐC TỰ ĐỘNG
// =====================================================================

/**
 * Hàm kích hoạt Popup yêu cầu nhập tên Đề thi trước khi xuất
 * @param {Array} danhSachTrave - Mảng kết quả bốc từ Server [{idCau, loai, sl, danhsachfilelay: [...]}, ...]
 */
// window.ham_17_22_kich_hoat_xuat_hoc_lieu = function (danhSachTrave) {
//     if (!danhSachTrave || danhSachTrave.length === 0) {
//         return Swal.fire('Lỗi', 'Danh sách bốc câu hỏi trống!', 'error');
//     }

//     // Sinh mã Học Liệu tự động
//     const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ123456789';
//     let randomPart = '';
//     for (let i = 0; i < 6; i++) randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
//     const maHocLieuMoi = `HL_TN_AUTO_${randomPart}`;

//     Swal.fire({
//         title: '🚀 XUẤT HỌC LIỆU TRẮC NGHIỆM',
//         html: `
//             <div style="text-align: left; font-size: 14px;">
//                 <label style="font-weight: bold; color: #1a73e8; display: block; margin-bottom: 5px;">Mã Học Liệu:</label>
//                 <input type="text" id="swal_xuat_ma" value="${maHocLieuMoi}" readonly style="width: 100%; padding: 10px; margin-bottom: 15px; background: #e9ecef; border: 1px solid #ccc; border-radius: 6px; font-weight: bold;">
                
//                 <label style="font-weight: bold; color: #d35400; display: block; margin-bottom: 5px;">Tên Học Liệu / Đề Thi (*):</label>
//                 <input type="text" id="swal_xuat_ten" placeholder="VD: Đề Ôn Tập Chương 1..." style="width: 100%; padding: 10px; margin-bottom: 15px; border: 1px solid #d35400; border-radius: 6px; font-weight: bold;">
                
//                 <div style="display: flex; gap: 15px;">
//                     <div style="flex: 1;">
//                         <label style="font-weight: bold; color: #333; display: block; margin-bottom: 5px;">Thời gian (Phút):</label>
//                         <input type="number" id="swal_xuat_thoigian" value="45" min="1" style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 6px;">
//                     </div>
//                     <div style="flex: 1;">
//                         <label style="font-weight: bold; color: #333; display: block; margin-bottom: 5px;">Khối lớp:</label>
//                         <select id="swal_xuat_khoi" style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 6px;">
//                             <option value="12">Khối 12</option>
//                             <option value="11">Khối 11</option>
//                             <option value="10">Khối 10</option>
//                             <option value="Khác">Khác</option>
//                         </select>
//                     </div>
//                 </div>
//             </div>
//         `,
//         showCancelButton: true,
//         confirmButtonText: 'Tạo & Đẩy Lên Hệ Thống',
//         cancelButtonText: 'Hủy',
//         confirmButtonColor: '#28a745',
//         preConfirm: () => {
//             const tenHL = document.getElementById('swal_xuat_ten').value.trim();
//             if (!tenHL) {
//                 Swal.showValidationMessage('Vui lòng nhập Tên Học Liệu!');
//                 return false;
//             }
//             return {
//                 maHL: document.getElementById('swal_xuat_ma').value,
//                 tenHL: tenHL,
//                 thoiGian: parseInt(document.getElementById('swal_xuat_thoigian').value) || 45,
//                 khoiLop: document.getElementById('swal_xuat_khoi').value
//             };
//         }
//     }).then((result) => {
//         if (result.isConfirmed) {
//             ham_17_23_thuc_thi_day_hoc_lieu(result.value, danhSachTrave);
//         }
//     });
// };

// /**
//  * Hàm thực thi: Tải Ruột -> Ráp Đề -> Đẩy Github -> Lưu Supabase
//  */
// window.ham_17_23_thuc_thi_day_hoc_lieu = async function (thongTinForm, danhSachTrave) {
//     const { maHL, tenHL, thoiGian, khoiLop } = thongTinForm;

//     try {
//         // --- BƯỚC 1: GOM ID FILE ĐỂ TẢI RUỘT TỪ DRIVE ---
//         Swal.fire({ title: '⏳ Đang tải nội dung câu hỏi từ Drive...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

//         let dsFileIdCanTai = [];
//         danhSachTrave.forEach(nhom => {
//             if (nhom.danhsachfilelay) {
//                 nhom.danhsachfilelay.forEach(file => dsFileIdCanTai.push(file.fileId));
//             }
//         });

//         const resRuot = await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
//             method: "POST",
//             body: JSON.stringify({ action: "tai_ruot_file_json_da_boc", danhSachFileId: [...new Set(dsFileIdCanTai)] })
//         });

//         const resultRuot = await resRuot.json();
//         if (resultRuot.status !== "success") throw new Error("Lỗi đọc Drive: " + resultRuot.message);
//         const khoRuotJSON = resultRuot.data;

//         // --- BƯỚC 2: ĐÓNG GÓI CHUẨN CẤU TRÚC ĐỀ THI ---
//         Swal.fire({ title: '⚙️ Đang đóng gói dữ liệu và mã hóa...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

//         let dsCauHoiGithub = [];
//         let banDoSupabase = [];
//         let filesToCommit = [];
//         let so_tn = 0, so_ds = 0, so_tln = 0;

//         const randomHex = (len) => Array.from({ length: len }, () => Math.floor(Math.random() * 16).toString(16)).join('');

//         danhSachTrave.forEach(nhom => {
//             if (!nhom.danhsachfilelay) return;

//             nhom.danhsachfilelay.forEach(voFile => {
//                 const noiDung = khoRuotJSON[voFile.fileId];
//                 if (!noiDung || noiDung.error) return; // Bỏ qua file lỗi

//                 // Đếm cấu trúc
//                 if (nhom.loai === "TN") so_tn++;
//                 else if (nhom.loai === "DS") so_ds++;
//                 else so_tln++;

//                 // Sinh mã bảo mật độc lập
//                 const maCauHoi = "q_" + randomHex(10);
//                 const maLoiGiai = "sol_" + randomHex(10);
//                 const maGoc = noiDung.ma_goc || noiDung.maGoc || nhom.idCau;
//                 const dapAn = noiDung.dap_an || noiDung.dapAn || "";

//                 // 2.1: Ghi vào Bản đồ Kho Báu (Supabase)
//                 banDoSupabase.push({
//                     ma_goc: maGoc,
//                     ma_cau_hoi: maCauHoi,
//                     ma_loi_giai: maLoiGiai,
//                     dap_an: dapAn
//                 });

//                 // 2.2: Lọc rác và Ghi vào File Đề (GitHub)
//                 let cauHoiDeThi = {
//                     maCau: maCauHoi,
//                     ma_goc: maGoc,
//                     kieuCau: nhom.loai,
//                     cauDan: noiDung.cauDan || noiDung.noiDungHtml || noiDung.cauHoi || ""
//                 };

//                 if (nhom.loai !== 'TLN') {
//                     cauHoiDeThi.paA = noiDung.paA || "";
//                     cauHoiDeThi.paB = noiDung.paB || "";
//                     cauHoiDeThi.paC = noiDung.paC || "";
//                     cauHoiDeThi.paD = noiDung.paD || "";
//                 }
//                 dsCauHoiGithub.push(cauHoiDeThi);

//                 // 2.3: Băm nhỏ File Lời Giải (GitHub)
//                 let objLoiGiai = {
//                     maBaoMat: maLoiGiai,
//                     dapAn: dapAn,
//                     loiGiai: noiDung.loiGiai || noiDung.loiGiaiHtml || "Chưa cập nhật lời giải"
//                 };

//                 filesToCommit.push({
//                     path: `Ngan_Hang_Loi_Giai/${maLoiGiai}.json`,
//                     mode: "100644",
//                     type: "blob",
//                     content: JSON.stringify(objLoiGiai, null, 4)
//                 });
//             });
//         });

//         if (banDoSupabase.length === 0) throw new Error("Thất bại: Không có dữ liệu câu hỏi nào được tải thành công.");

//         // Đóng gói vỏ Đề thi (GitHub)
//         let objDeThiGoc = {
//             maDe: maHL,
//             tenDe: tenHL,
//             thoiGian: thoiGian,
//             danhSachCauHoi: dsCauHoiGithub
//         };

//         const pathFileDe = `Kho_De_Thi/${maHL}/DeThi_${maHL}.json`;
//         filesToCommit.push({
//             path: pathFileDe,
//             mode: "100644",
//             type: "blob",
//             content: JSON.stringify(objDeThiGoc, null, 4)
//         });

//         // --- BƯỚC 3: ĐẨY LÊN GITHUB BẰNG TREE COMMIT ---
//         Swal.fire({ title: '☁️ Đang đẩy dữ liệu lên GitHub...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

//         const GITHUB_TOKEN = CFG_HE_THONG.GITHUB_TOKEN;
//         const GITHUB_REPO = CFG_HE_THONG.GITHUB_REPO;
//         const BRANCH = "main";
//         const baseURL = `https://api.github.com/repos/${GITHUB_REPO}`;
//         const headers = { "Authorization": `token ${GITHUB_TOKEN}`, "Accept": "application/vnd.github.v3+json", "Content-Type": "application/json" };

//         let res = await fetch(`${baseURL}/git/refs/heads/${BRANCH}`, { headers });
//         let data = await res.json();
//         let baseCommitSha = data.object.sha;

//         res = await fetch(`${baseURL}/git/commits/${baseCommitSha}`, { headers });
//         data = await res.json();
//         let baseTreeSha = data.tree.sha;

//         res = await fetch(`${baseURL}/git/trees`, {
//             method: "POST", headers,
//             body: JSON.stringify({ base_tree: baseTreeSha, tree: filesToCommit })
//         });
//         if (!res.ok) throw new Error("Lỗi tạo cấu trúc thư mục trên GitHub.");
//         data = await res.json();
//         let newTreeSha = data.sha;

//         res = await fetch(`${baseURL}/git/commits`, {
//             method: "POST", headers,
//             body: JSON.stringify({
//                 message: `Tự động tạo Đề ${maHL} từ kho Drive với ${banDoSupabase.length} câu`,
//                 tree: newTreeSha,
//                 parents: [baseCommitSha]
//             })
//         });
//         data = await res.json();
//         let newCommitSha = data.sha;

//         res = await fetch(`${baseURL}/git/refs/heads/${BRANCH}`, {
//             method: "PATCH", headers,
//             body: JSON.stringify({ sha: newCommitSha })
//         });
//         if (!res.ok) throw new Error("Lỗi chốt nhánh GitHub.");

//         const repoParts = GITHUB_REPO.split('/');
//         const urlGithubFinal = `https://${repoParts[0]}.github.io/${repoParts[1]}/${pathFileDe}`;

//         // --- BƯỚC 4: LƯU BẢN ĐỒ VÀO SUPABASE ---
//         Swal.fire({ title: '💾 Đang khóa két sắt Supabase...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

//         const payloadSupabase = {
//             ma_hoc_lieu: maHL,
//             ten_hoc_lieu: tenHL,
//             loai_kiem_tra: "Tự Động Bốc",
//             khoi_lop: khoiLop,
//             thoi_gian_lam_bai: thoiGian,
//             trang_thai: "noi_bo",
//             quy_mo_cau_hoi: banDoSupabase.length,
//             metadata: {
//                 so_tn: so_tn, so_ds: so_ds, so_tln: so_tln,
//                 cau_truc: `${so_tn}TN | ${so_ds}DS | ${so_tln}TLN`,
//                 nguon_tao: "Web_Auto_Kho_Drive"
//             },
//             danh_sach_cau_hoi: banDoSupabase,
//             url_github: urlGithubFinal,
//             uid_gv_tao: AppState.user?.uid || null,
//             ngay_tao: new Date().toISOString()
//         };

//         const { error: errDB } = await _supabase.from('hoc_lieu_trac_nghiem').insert([payloadSupabase]);
//         if (errDB) throw errDB;

//         // --- HOÀN TẤT ---
//         Swal.fire({
//             icon: 'success',
//             title: 'TẠO HỌC LIỆU THÀNH CÔNG!',
//             html: `Đã tạo Đề thi <b>${maHL}</b> gồm ${banDoSupabase.length} câu hỏi.<br>Hệ thống đã lưu cấu trúc lên Supabase và đẩy đề lên GitHub.`,
//             confirmButtonText: 'Quay về Quản lý'
//         }).then(() => {
//             // Chuyển về màn hình Quản lý học liệu
//             if (typeof ham_6a_1_ve_quan_ly_hoc_lieu_trac_nghiem === 'function') {
//                 ham_6a_1_ve_quan_ly_hoc_lieu_trac_nghiem();
//             }
//         });

//     } catch (e) {
//         Swal.fire('Thất bại', e.message, 'error');
//         console.error("Lỗi quy trình xuất học liệu:", e);
//     }
// };



// =====================================================================
// KHỐI 17: XUẤT HỌC LIỆU TRẮC NGHIỆM TỪ DANH SÁCH BỐC TỰ ĐỘNG
// =====================================================================

/**
 * Hàm kích hoạt Popup yêu cầu nhập tên Đề thi trước khi xuất
 */
window.ham_17_22_kich_hoat_xuat_hoc_lieu = function (danhSachTrave) {
    if (!danhSachTrave || danhSachTrave.length === 0) {
        return Swal.fire('Lỗi', 'Danh sách bốc câu hỏi trống!', 'error');
    }

    // Sinh mã Học Liệu tự động
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ123456789';
    let randomPart = '';
    for (let i = 0; i < 6; i++) randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
    const maHocLieuMoi = `HL_TN_AUTO_${randomPart}`;

    Swal.fire({
        title: '🚀 XUẤT HỌC LIỆU TRẮC NGHIỆM',
        html: `
            <div style="text-align: left; font-size: 14px;">
                <label style="font-weight: bold; color: #1a73e8; display: block; margin-bottom: 5px;">Mã Học Liệu:</label>
                <input type="text" id="swal_xuat_ma" value="${maHocLieuMoi}" readonly style="width: 100%; padding: 10px; margin-bottom: 15px; background: #e9ecef; border: 1px solid #ccc; border-radius: 6px; font-weight: bold;">
                
                <label style="font-weight: bold; color: #d35400; display: block; margin-bottom: 5px;">Tên Học Liệu / Đề Thi (*):</label>
                <input type="text" id="swal_xuat_ten" placeholder="VD: Đề Ôn Tập Chương 1..." style="width: 100%; padding: 10px; margin-bottom: 15px; border: 1px solid #d35400; border-radius: 6px; font-weight: bold;">
                
                <div style="display: flex; gap: 15px; margin-bottom: 15px;">
                    <div style="flex: 1;">
                        <label style="font-weight: bold; color: #333; display: block; margin-bottom: 5px;">Thời gian (Phút):</label>
                        <input type="number" id="swal_xuat_thoigian" value="45" min="1" style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 6px;">
                    </div>
                    <div style="flex: 1;">
                        <label style="font-weight: bold; color: #333; display: block; margin-bottom: 5px;">Khối lớp:</label>
                        <select id="swal_xuat_khoi" style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 6px;">
                            <option value="12">Khối 12</option>
                            <option value="11">Khối 11</option>
                            <option value="10">Khối 10</option>
                            <option value="Khác">Khác</option>
                        </select>
                    </div>
                </div>

                <!-- 🌟 BỔ SUNG LOẠI KIỂM TRA ĐỂ KHỚP VỚI C# -->
                <label style="font-weight: bold; color: #333; display: block; margin-bottom: 5px;">Loại kiểm tra / Phân loại:</label>
                <select id="swal_xuat_loai_kt" style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 6px;">
                    <option value="TN">Trắc nghiệm chung (TN)</option>
                    <option value="GK1">Giữa kỳ 1 (GK1)</option>
                    <option value="CK1">Cuối kỳ 1 (CK1)</option>
                    <option value="GK2">Giữa kỳ 2 (GK2)</option>
                    <option value="CK2">Cuối kỳ 2 (CK2)</option>
                    <option value="KS">Khảo sát / Thi thử (KS)</option>
                </select>
            </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'Tạo & Đẩy Lên Hệ Thống',
        cancelButtonText: 'Hủy',
        confirmButtonColor: '#28a745',
        preConfirm: () => {
            const tenHL = document.getElementById('swal_xuat_ten').value.trim();
            if (!tenHL) {
                Swal.showValidationMessage('Vui lòng nhập Tên Học Liệu!');
                return false;
            }
            return {
                maHL: document.getElementById('swal_xuat_ma').value,
                tenHL: tenHL,
                thoiGian: parseInt(document.getElementById('swal_xuat_thoigian').value) || 45,
                khoiLop: document.getElementById('swal_xuat_khoi').value,
                loaiKiemTra: document.getElementById('swal_xuat_loai_kt').value // Lấy giá trị loại kiểm tra
            };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            ham_17_23_thuc_thi_day_hoc_lieu(result.value, danhSachTrave);
        }
    });
};

/**
 * Hàm thực thi: Tải Ruột -> Ráp Đề -> Đẩy Github -> Lưu Supabase (ĐỒNG BỘ CẤU TRÚC C#)
 */
// =====================================================================
// KHỐI 17: XUẤT HỌC LIỆU TRẮC NGHIỆM TỪ DANH SÁCH BỐC TỰ ĐỘNG
// =====================================================================

// window.ham_17_23_thuc_thi_day_hoc_lieu = async function (thongTinForm, danhSachTrave) {
//     const { maHL, tenHL, thoiGian, khoiLop, loaiKiemTra } = thongTinForm;

//     try {
//         // --- BƯỚC 1: GOM ID FILE ĐỂ TẢI RUỘT TỪ DRIVE ---
//         Swal.fire({ title: '⏳ Đang tải nội dung câu hỏi từ Drive...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

//         //console.log(`[DEBUG 17.23] Bắt đầu tải ruột cho ${danhSachTrave.length} nhóm câu hỏi...`);
//         let dsFileIdCanTai = [];
//         danhSachTrave.forEach(nhom => {
//             if (nhom.danhsachfilelay) {
//                 nhom.danhsachfilelay.forEach(file => dsFileIdCanTai.push(file.fileId));
//             }
//         });

//         const resRuot = await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
//             method: "POST",
//             body: JSON.stringify({ action: "tai_ruot_file_json_da_boc", danhSachFileId: [...new Set(dsFileIdCanTai)] })
//         });

//         const resultRuot = await resRuot.json();
        

//         console.log(`[DEBUG 17.23] Kết quả tải ruột:`, resultRuot);
//         if (resultRuot.status !== "success") throw new Error("Lỗi đọc Drive: " + resultRuot.message);
//         const khoRuotJSON = resultRuot.data;



//         // --- BƯỚC 2: ĐÓNG GÓI CHUẨN CẤU TRÚC ĐỀ THI ---
//         Swal.fire({ title: '⚙️ Đang đóng gói dữ liệu và mã hóa...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

//         let dsCauHoiGithub = [];
//         let banDoSupabase = [];
//         let filesToCommit = [];
//         let so_tn = 0, so_ds = 0, so_tln = 0;

//         const randomHex = (len) => Array.from({ length: len }, () => Math.floor(Math.random() * 16).toString(16)).join('');

//         danhSachTrave.forEach(nhom => {
//             if (!nhom.danhsachfilelay) return;

//             nhom.danhsachfilelay.forEach(voFile => {
//                 const noiDung = khoRuotJSON[voFile.fileId];
//                 if (!noiDung || noiDung.error) return;

//                 // 🌟 GỌI HÀM BÓC TÁCH THÔNG MINH
//                 const dapAnChuan = window.ham_17_24_trich_xuat_dap_an_chuan(noiDung, nhom.loai);
//                 console.log(`[DEBUG 17.23] Kết quả trích xuất đáp án chuẩn:`, dapAnChuan);

//                 // Đếm cấu trúc
//                 if (nhom.loai === "TN") so_tn++;
//                 else if (nhom.loai === "DS") so_ds++;
//                 else so_tln++;

//                 // 🌟 BÓC TÁCH CHÍNH XÁC id_Cau VÀ ma_goc TỪ TÊN FILE
//                 // Giả định tên file có dạng: "[2D1H3-1] Cau 1_TN_2605-76.json"
//                 let idCauChinhXac = nhom.idCau;
//                 let maGocChinhXac = nhom.idCau;

//                 if (voFile.fileName) {
//                     // 1. Cắt id_Cau (Lấy nội dung trong ngoặc vuông) -> [2D1H3-1]
//                     const matchId = voFile.fileName.match(/\[.*?\]/);
//                     if (matchId && matchId[0]) {
//                         idCauChinhXac = matchId[0];
//                     }

//                     // 2. Cắt ma_goc (Lấy cụm sau cùng phân cách bởi dấu _) -> 2605-76
//                     const parts = voFile.fileName.split('_');
//                     if (parts.length >= 3) {
//                         maGocChinhXac = parts[2].replace('.json', '').trim();
//                     }
//                 }

//                 // Sinh mã bảo mật
//                 const maCauHoi = "q_" + randomHex(10);
//                 const maLoiGiai = "sol_" + randomHex(10);

//                 // Ưu tiên lấy từ ruột JSON, nếu không có thì lấy chuỗi vừa cắt từ tên file
//                 const maGoc = noiDung.ma_goc || noiDung.maGoc || maGocChinhXac;
//                 //const dapAn = noiDung.dap_an || noiDung.dapAn || "";

//                 // Băm file TeX
//                 console.log(`[DEBUG 17.23] Băm TeX cho file [${voFile.fileId}]:`, noiDung);
//                 let phanTich = window.ham_99_2_phan_tich_cau_hoi_tex(noiDung.noi_dung);
//                 console.log(`[DEBUG 17.23] Phân tích TeX cho file [${voFile.fileId}]:`, noiDung + "phân tích: " + phanTich);
//                 // Lọc dọn rác toán học (Hàm 6.19)
//                 let cauDanXuly = window.ham_99_4_xu_ly_du_lieu_truoc_khi_push(phanTich.cauDan);
//                 let paAXuly = window.ham_99_4_xu_ly_du_lieu_truoc_khi_push(phanTich.paA);
//                 let paBXuly = window.ham_99_4_xu_ly_du_lieu_truoc_khi_push(phanTich.paB);
//                 let paCXuly = window.ham_99_4_xu_ly_du_lieu_truoc_khi_push(phanTich.paC);
//                 let paDXuly = window.ham_99_4_xu_ly_du_lieu_truoc_khi_push(phanTich.paD);
//                 let loiGiaiXuly = window.ham_99_4_xu_ly_du_lieu_truoc_khi_push(phanTich.loiGiai);

//                 console.log(`[DEBUG 17.23] Kết quả xử lý dữ liệu trước khi push cho file [${voFile.fileId}]:`, {
//                     cauDanXuly, paAXuly, paBXuly, paCXuly, paDXuly, loiGiaiXuly
//                 });


//                 // 🌟 2.1: Ghi vào Bản đồ Kho Báu (CHUẨN 100% CẤU TRÚC C#)
//                 banDoSupabase.push({
//                     dap_an: dapAnChuan, 
//                     id_Cau: idCauChinhXac, // VD: [2D1H3-1]
//                     ma_goc: maGoc,         // VD: 2605-76
//                     ma_cau_hoi: maCauHoi,
//                     ma_loi_giai: maLoiGiai
//                 });




//                 // 2.2: Đóng gói JSON Đề thi (GitHub)
//                 let cauHoiDeThi = {
//                     maCau: maCauHoi,
//                     ma_goc: maGoc,
//                     kieuCau: nhom.loai,
//                     cauDan: cauDanXuly
//                 };

//                 if (nhom.loai !== 'TLN') {
//                     cauHoiDeThi.paA = paAXuly || "";
//                     cauHoiDeThi.paB = paBXuly || "";
//                     cauHoiDeThi.paC = paCXuly || "";
//                     cauHoiDeThi.paD = paDXuly || "";
//                 }
//                 dsCauHoiGithub.push(cauHoiDeThi);

//                 // 2.3: Băm nhỏ File Lời Giải (GitHub)
//                 let objLoiGiai = {
//                     maBaoMat: maLoiGiai,
//                     dapAn: dapAnChuan,
//                     loiGiai: loiGiaiXuly || "Chưa cập nhật lời giải"
//                 };

//                 filesToCommit.push({
//                     path: `Ngan_Hang_Loi_Giai/${maLoiGiai}.json`,
//                     mode: "100644",
//                     type: "blob",
//                     content: JSON.stringify(objLoiGiai, null, 4)
//                 });
//             });
//         });

//         if (banDoSupabase.length === 0) throw new Error("Thất bại: Không có dữ liệu câu hỏi nào được tải thành công.");

//         let objDeThiGoc = {
//             maDe: maHL,
//             tenDe: tenHL,
//             thoiGian: thoiGian,
//             danhSachCauHoi: dsCauHoiGithub
//         };

//         const pathFileDe = `Kho_De_Thi/${maHL}/DeThi_${maHL}.json`;
//         filesToCommit.push({
//             path: pathFileDe,
//             mode: "100644",
//             type: "blob",
//             content: JSON.stringify(objDeThiGoc, null, 4)
//         });

//         // --- BƯỚC 3: ĐẨY LÊN GITHUB BẰNG TREE COMMIT ---
//         Swal.fire({ title: '☁️ Đang đẩy dữ liệu lên GitHub...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

//         const GITHUB_TOKEN = CFG_HE_THONG.GITHUB_TOKEN;
//         const GITHUB_REPO = CFG_HE_THONG.GITHUB_REPO;
//         const BRANCH = "main";
//         const baseURL = `https://api.github.com/repos/${GITHUB_REPO}`;
//         const headers = { "Authorization": `token ${GITHUB_TOKEN}`, "Accept": "application/vnd.github.v3+json", "Content-Type": "application/json" };

//         let res = await fetch(`${baseURL}/git/refs/heads/${BRANCH}`, { headers });
//         let data = await res.json();
//         let baseCommitSha = data.object.sha;

//         res = await fetch(`${baseURL}/git/commits/${baseCommitSha}`, { headers });
//         data = await res.json();
//         let baseTreeSha = data.tree.sha;

//         res = await fetch(`${baseURL}/git/trees`, {
//             method: "POST", headers,
//             body: JSON.stringify({ base_tree: baseTreeSha, tree: filesToCommit })
//         });
//         if (!res.ok) throw new Error("Lỗi tạo cấu trúc thư mục trên GitHub.");
//         data = await res.json();
//         let newTreeSha = data.sha;

//         res = await fetch(`${baseURL}/git/commits`, {
//             method: "POST", headers,
//             body: JSON.stringify({
//                 message: `Tự động bốc đề ${maHL} từ kho Drive với ${banDoSupabase.length} câu`,
//                 tree: newTreeSha,
//                 parents: [baseCommitSha]
//             })
//         });
//         data = await res.json();
//         let newCommitSha = data.sha;

//         res = await fetch(`${baseURL}/git/refs/heads/${BRANCH}`, {
//             method: "PATCH", headers,
//             body: JSON.stringify({ sha: newCommitSha })
//         });
//         if (!res.ok) throw new Error("Lỗi chốt nhánh GitHub.");

//         const repoParts = GITHUB_REPO.split('/');
//         const urlGithubFinal = `https://${repoParts[0]}.github.io/${repoParts[1]}/${pathFileDe}`;

//         // --- BƯỚC 4: LƯU VÀO SUPABASE (CHUẨN METADATA C#) ---
//         Swal.fire({ title: '💾 Đang khóa két sắt Supabase...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

//         const metadataObj = {
//             so_ds: so_ds,
//             so_tn: so_tn,
//             so_tln: so_tln,
//             cau_truc: `${so_tn}TN - ${so_ds}DS - ${so_tln}TLN`,
//             nguon_tao: "Web_Auto_Kho_Drive",
//             phan_loai_goc: loaiKiemTra
//         };

//         const payloadSupabase = {
//             ma_hoc_lieu: maHL,
//             ten_hoc_lieu: tenHL,
//             loai_kiem_tra: loaiKiemTra,
//             khoi_lop: khoiLop,
//             thoi_gian_lam_bai: thoiGian,
//             trang_thai: "noi_bo",
//             quy_mo_cau_hoi: banDoSupabase.length,
//             metadata: metadataObj,
//             danh_sach_cau_hoi: banDoSupabase,
//             url_github: urlGithubFinal,
//             uid_gv_tao: AppState.user?.uid || null,
//             ngay_tao: new Date().toISOString()
//         };

//         const { error: errDB } = await _supabase.from('hoc_lieu_trac_nghiem').insert([payloadSupabase]);
//         if (errDB) throw errDB;

//         // --- HOÀN TẤT ---
//         Swal.fire({
//             icon: 'success',
//             title: 'TẠO HỌC LIỆU THÀNH CÔNG!',
//             html: `Đã tạo Đề thi <b>${maHL}</b> gồm ${banDoSupabase.length} câu hỏi.<br>Hệ thống đã lưu cấu trúc lên Supabase và đẩy đề lên GitHub.`,
//             confirmButtonText: 'Quay về Quản lý'
//         }).then(() => {
//             if (typeof ham_6a_1_ve_quan_ly_hoc_lieu_trac_nghiem === 'function') {
//                 ham_6a_1_ve_quan_ly_hoc_lieu_trac_nghiem();
//             }
//         });

//     } catch (e) {
//         Swal.fire('Thất bại', e.message, 'error');
//         console.error("Lỗi quy trình xuất học liệu:", e);
//     }
// };



window.ham_17_23_thuc_thi_day_hoc_lieu = async function (thongTinForm, danhSachTrave) {
    const { maHL, tenHL, thoiGian, khoiLop, loaiKiemTra } = thongTinForm;

    try {
        // --- BƯỚC 1: GOM ID FILE ĐỂ TẢI RUỘT TỪ DRIVE ---
        Swal.fire({ title: '⏳ Đang tải nội dung câu hỏi từ Drive...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

        //console.log(`[DEBUG 17.23] Bắt đầu tải ruột cho ${danhSachTrave.length} nhóm câu hỏi...`);
        let dsFileIdCanTai = [];
        danhSachTrave.forEach(nhom => {
            if (nhom.danhsachfilelay) {
                nhom.danhsachfilelay.forEach(file => dsFileIdCanTai.push(file.fileId));
            }
        });

        const resRuot = await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
            method: "POST",
            body: JSON.stringify({ action: "tai_ruot_file_json_da_boc", danhSachFileId: [...new Set(dsFileIdCanTai)] })
        });

        const resultRuot = await resRuot.json();


        console.log(`[DEBUG 17.23] Kết quả tải ruột:`, resultRuot);
        if (resultRuot.status !== "success") throw new Error("Lỗi đọc Drive: " + resultRuot.message);
        const khoRuotJSON = resultRuot.data;



        // --- BƯỚC 2: ĐÓNG GÓI CHUẨN CẤU TRÚC ĐỀ THI ---
        Swal.fire({ title: '⚙️ Đang đóng gói dữ liệu và mã hóa...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

        let dsCauHoiGithub = [];
        let banDoSupabase = [];
        let filesToCommit = [];
        let so_tn = 0, so_ds = 0, so_tln = 0;

        const randomHex = (len) => Array.from({ length: len }, () => Math.floor(Math.random() * 16).toString(16)).join('');

        // Thay vì danhSachTrave.forEach(nhom => { ...
        for (let nhom of danhSachTrave) {
            if (!nhom.danhsachfilelay) return;

            // Thay vì nhom.danhsachfilelay.forEach(voFile => { ...
            for (let voFile of nhom.danhsachfilelay) {
                const noiDung = khoRuotJSON[voFile.fileId];
                if (!noiDung || noiDung.error) return;

                // 🌟 GỌI HÀM BÓC TÁCH THÔNG MINH
                const dapAnChuan = window.ham_17_24_trich_xuat_dap_an_chuan(noiDung, nhom.loai);
                console.log(`[DEBUG 17.23] Kết quả trích xuất đáp án chuẩn:`, dapAnChuan);

                // Đếm cấu trúc
                if (nhom.loai === "TN") so_tn++;
                else if (nhom.loai === "DS") so_ds++;
                else so_tln++;

                // 🌟 BÓC TÁCH CHÍNH XÁC id_Cau VÀ ma_goc TỪ TÊN FILE
                // Giả định tên file có dạng: "[2D1H3-1] Cau 1_TN_2605-76.json"
                let idCauChinhXac = nhom.idCau;
                let maGocChinhXac = nhom.idCau;

                if (voFile.fileName) {
                    // 1. Cắt id_Cau (Lấy nội dung trong ngoặc vuông) -> [2D1H3-1]
                    const matchId = voFile.fileName.match(/\[.*?\]/);
                    if (matchId && matchId[0]) {
                        idCauChinhXac = matchId[0];
                    }

                    // 2. Cắt ma_goc (Lấy cụm sau cùng phân cách bởi dấu _) -> 2605-76
                    const parts = voFile.fileName.split('_');
                    if (parts.length >= 3) {
                        maGocChinhXac = parts[2].replace('.json', '').trim();
                    }
                }

                // Sinh mã bảo mật
                const maCauHoi = "q_" + randomHex(10);
                const maLoiGiai = "sol_" + randomHex(10);

                // Ưu tiên lấy từ ruột JSON, nếu không có thì lấy chuỗi vừa cắt từ tên file
                const maGoc = noiDung.ma_goc || noiDung.maGoc || maGocChinhXac;
                //const dapAn = noiDung.dap_an || noiDung.dapAn || "";

                // Băm file TeX
                console.log(`[DEBUG 17.23] Băm TeX cho file [${voFile.fileId}]:`, noiDung);
                let phanTich = window.ham_99_2_phan_tich_cau_hoi_tex(noiDung.noi_dung);
                console.log(`[DEBUG 17.23] Phân tích TeX cho file [${voFile.fileId}]:`, noiDung + "phân tích: " + phanTich);
                // Lưu ý: maGoc hoặc idCauChinhXac là mã đề tương ứng để GitHub biết lưu vào thư mục nào
                let cauDanXuly = await window.ham_99_5_xu_ly_du_lieu_truoc_khi_push_nap_anh_tu_supabase_sang_github(maHL,idCauChinhXac,phanTich.cauDan);
                let paAXuly = await window.ham_99_5_xu_ly_du_lieu_truoc_khi_push_nap_anh_tu_supabase_sang_github(maHL, idCauChinhXac,phanTich.paA);
                let paBXuly = await window.ham_99_5_xu_ly_du_lieu_truoc_khi_push_nap_anh_tu_supabase_sang_github(maHL, idCauChinhXac,phanTich.paB);
                let paCXuly = await window.ham_99_5_xu_ly_du_lieu_truoc_khi_push_nap_anh_tu_supabase_sang_github(maHL, idCauChinhXac,phanTich.paC);
                let paDXuly = await window.ham_99_5_xu_ly_du_lieu_truoc_khi_push_nap_anh_tu_supabase_sang_github(maHL, idCauChinhXac,phanTich.paD);
                let loiGiaiXuly = await window.ham_99_5_xu_ly_du_lieu_truoc_khi_push_nap_anh_tu_supabase_sang_github(maHL, idCauChinhXac,phanTich.loiGiai);



                console.log(`[DEBUG 17.23] Kết quả xử lý dữ liệu trước khi push cho file [${voFile.fileId}]:`, {
                    cauDanXuly, paAXuly, paBXuly, paCXuly, paDXuly, loiGiaiXuly
                });


                // 🌟 2.1: Ghi vào Bản đồ Kho Báu (CHUẨN 100% CẤU TRÚC C#)
                banDoSupabase.push({
                    dap_an: dapAnChuan,
                    id_Cau: idCauChinhXac, // VD: [2D1H3-1]
                    ma_goc: maGoc,         // VD: 2605-76
                    ma_cau_hoi: maCauHoi,
                    ma_loi_giai: maLoiGiai
                });




                // 2.2: Đóng gói JSON Đề thi (GitHub)
                let cauHoiDeThi = {
                    maCau: maCauHoi,
                    ma_goc: maGoc,
                    kieuCau: nhom.loai,
                    cauDan: cauDanXuly
                };

                if (nhom.loai !== 'TLN') {
                    cauHoiDeThi.paA = paAXuly || "";
                    cauHoiDeThi.paB = paBXuly || "";
                    cauHoiDeThi.paC = paCXuly || "";
                    cauHoiDeThi.paD = paDXuly || "";
                }
                dsCauHoiGithub.push(cauHoiDeThi);

                // 2.3: Băm nhỏ File Lời Giải (GitHub)
                let objLoiGiai = {
                    maBaoMat: maLoiGiai,
                    dapAn: dapAnChuan,
                    loiGiai: loiGiaiXuly || "Chưa cập nhật lời giải"
                };

                filesToCommit.push({
                    path: `Ngan_Hang_Loi_Giai/${maLoiGiai}.json`,
                    mode: "100644",
                    type: "blob",
                    content: JSON.stringify(objLoiGiai, null, 4)
                });
            };
        };

        if (banDoSupabase.length === 0) throw new Error("Thất bại: Không có dữ liệu câu hỏi nào được tải thành công.");

        let objDeThiGoc = {
            maDe: maHL,
            tenDe: tenHL,
            thoiGian: thoiGian,
            danhSachCauHoi: dsCauHoiGithub
        };

        const pathFileDe = `Kho_De_Thi/${maHL}/DeThi_${maHL}.json`;
        filesToCommit.push({
            path: pathFileDe,
            mode: "100644",
            type: "blob",
            content: JSON.stringify(objDeThiGoc, null, 4)
        });

        // --- BƯỚC 3: ĐẨY LÊN GITHUB BẰNG TREE COMMIT ---
        Swal.fire({ title: '☁️ Đang đẩy dữ liệu lên GitHub...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

        const GITHUB_TOKEN = CFG_HE_THONG.GITHUB_TOKEN;
        const GITHUB_REPO = CFG_HE_THONG.GITHUB_REPO;
        const BRANCH = "main";
        const baseURL = `https://api.github.com/repos/${GITHUB_REPO}`;
        const headers = { "Authorization": `token ${GITHUB_TOKEN}`, "Accept": "application/vnd.github.v3+json", "Content-Type": "application/json" };

        let res = await fetch(`${baseURL}/git/refs/heads/${BRANCH}`, { headers });
        let data = await res.json();
        let baseCommitSha = data.object.sha;

        res = await fetch(`${baseURL}/git/commits/${baseCommitSha}`, { headers });
        data = await res.json();
        let baseTreeSha = data.tree.sha;

        res = await fetch(`${baseURL}/git/trees`, {
            method: "POST", headers,
            body: JSON.stringify({ base_tree: baseTreeSha, tree: filesToCommit })
        });
        if (!res.ok) throw new Error("Lỗi tạo cấu trúc thư mục trên GitHub.");
        data = await res.json();
        let newTreeSha = data.sha;

        res = await fetch(`${baseURL}/git/commits`, {
            method: "POST", headers,
            body: JSON.stringify({
                message: `Tự động bốc đề ${maHL} từ kho Drive với ${banDoSupabase.length} câu`,
                tree: newTreeSha,
                parents: [baseCommitSha]
            })
        });
        data = await res.json();
        let newCommitSha = data.sha;

        res = await fetch(`${baseURL}/git/refs/heads/${BRANCH}`, {
            method: "PATCH", headers,
            body: JSON.stringify({ sha: newCommitSha })
        });
        if (!res.ok) throw new Error("Lỗi chốt nhánh GitHub.");

        const repoParts = GITHUB_REPO.split('/');
        const urlGithubFinal = `https://${repoParts[0]}.github.io/${repoParts[1]}/${pathFileDe}`;

        // --- BƯỚC 4: LƯU VÀO SUPABASE (CHUẨN METADATA C#) ---
        Swal.fire({ title: '💾 Đang khóa két sắt Supabase...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

        const metadataObj = {
            so_ds: so_ds,
            so_tn: so_tn,
            so_tln: so_tln,
            cau_truc: `${so_tn}TN - ${so_ds}DS - ${so_tln}TLN`,
            nguon_tao: "Web_Auto_Kho_Drive",
            phan_loai_goc: loaiKiemTra
        };

        const payloadSupabase = {
            ma_hoc_lieu: maHL,
            ten_hoc_lieu: tenHL,
            loai_kiem_tra: loaiKiemTra,
            khoi_lop: khoiLop,
            thoi_gian_lam_bai: thoiGian,
            trang_thai: "noi_bo",
            quy_mo_cau_hoi: banDoSupabase.length,
            metadata: metadataObj,
            danh_sach_cau_hoi: banDoSupabase,
            url_github: urlGithubFinal,
            uid_gv_tao: AppState.user?.uid || null,
            ngay_tao: new Date().toISOString()
        };

        const { error: errDB } = await _supabase.from('hoc_lieu_trac_nghiem').insert([payloadSupabase]);
        if (errDB) throw errDB;

        // --- HOÀN TẤT ---
        Swal.fire({
            icon: 'success',
            title: 'TẠO HỌC LIỆU THÀNH CÔNG!',
            html: `Đã tạo Đề thi <b>${maHL}</b> gồm ${banDoSupabase.length} câu hỏi.<br>Hệ thống đã lưu cấu trúc lên Supabase và đẩy đề lên GitHub.`,
            confirmButtonText: 'Quay về Quản lý'
        }).then(() => {
            if (typeof ham_6a_1_ve_quan_ly_hoc_lieu_trac_nghiem === 'function') {
                ham_6a_1_ve_quan_ly_hoc_lieu_trac_nghiem();
            }
        });

    } catch (e) {
        Swal.fire('Thất bại', e.message, 'error');
        console.error("Lỗi quy trình xuất học liệu:", e);
    }
};


window.ham_17_24_trich_xuat_dap_an_chuan = function (noiDungObj, loaiCau) {
    // 1. Lấy nội dung gốc từ Object (Thầy cần xem biến trong JSON là noiDungHtml hay noi_dung)
    let tex = noiDungObj.noiDungHtml || noiDungObj.noi_dung || "";
    if (!tex) return "";

    // 2. Logic bóc tách đáp án (Mô phỏng lại logic C# của thầy)
    if (loaiCau === "TN") {
        // Tìm 4 khối choice
        const match = tex.match(/\\choice\s*\{([\s\S]*?)\}\s*\{([\s\S]*?)\}\s*\{([\s\S]*?)\}\s*\{([\s\S]*?)\}/);
        if (match) {
            for (let i = 1; i <= 4; i++) {
                if (match[i].includes("\\True")) return String.fromCharCode(64 + i);
            }
        }
        return "A"; // Mặc định
    }
    else if (loaiCau === "DS") {
        const match = tex.match(/\\choiceTF\s*\{([\s\S]*?)\}\s*\{([\s\S]*?)\}\s*\{([\s\S]*?)\}\s*\{([\s\S]*?)\}/);
        if (match) {
            let ans = "";
            for (let i = 1; i <= 4; i++) {
                ans += match[i].includes("\\True") ? "T" : "F";
            }
            return ans; // Trả về "TFFT"
        }
        return "TFFF";
    }
    else if (loaiCau === "TLN" || loaiCau === "NGAN") {
        // Regex lấy trong \shortans{...}
        const match = tex.match(/\\shortans(?:\[[^\]]*\])?\s*\{([^}]+)\}/);
        if (match) {
            let inner = match[1].replace(/\{,\}/g, ",");
            return inner.replace(/[^0-9\-\.,]/g, ""); // "Quét rác" giống C#
        }
        return "123";
    }

    return "";
};


window.ham_17_25_boc_tach_id_anh_tu_cau_hoi = function (cauHoi) {
    let noiDung = cauHoi.noi_dung || "";
    let maCau = cauHoi.maCau || cauHoi.ma_cau_hoi || cauHoi.id || "Unknown";

    // ==========================================
    // BƯỚC 1: PHÂN TÁCH PHẦN ĐỀ VÀ PHẦN GIẢI
    // ==========================================
    let phanDe = noiDung;
    let phanGiai = "";

    // Tìm vị trí bắt đầu của \loigiai{
    const chiMucLoiGiai = noiDung.indexOf("\\loigiai");

    if (chiMucLoiGiai !== -1) {
        // Phần đề là từ đầu cho đến trước chữ \loigiai
        phanDe = noiDung.substring(0, chiMucLoiGiai);
        // Phần giải là từ \loigiai cho đến hết
        phanGiai = noiDung.substring(chiMucLoiGiai);
    }

    // ==========================================
    // BƯỚC 2: HÀM PHỤ TRỢ QUÉT ẢNH (BẮT REGEX)
    // ==========================================
    const quetIdAnh = (text) => {
        if (!text) return [];
        let danhSachId = new Set(); // Dùng Set để tự động lọc các ảnh trùng lặp

        // 1. Quét cú pháp LaTeX: \includegraphics[...]{id_hoac_ten_file}
        const texRegex = /\\includegraphics(?:\[.*?\])?\{(.+?)\}/g;
        let matchTex;
        while ((matchTex = texRegex.exec(text)) !== null) {
            // Lấy nội dung trong ngoặc nhọn. Nếu là đường dẫn (VD: folder/hinh1.png), chỉ lấy hinh1.png
            let idAnh = matchTex[1].split('/').pop().trim();
            danhSachId.add(idAnh);
        }

        // 2. Quét cú pháp HTML: <img src="url_hoac_id"> (Đề phòng câu hỏi được soạn bằng Rich Text)
        const htmlRegex = /<img[^>]+src=['"]([^'"]+)['"]/g;
        let matchHtml;
        while ((matchHtml = htmlRegex.exec(text)) !== null) {
            let url = matchHtml[1];

            // Nếu là dạng Base64 thì bỏ qua
            if (url.startsWith('data:image')) continue;

            // Nếu là link Google Drive, bóc lấy ID (VD: drive.google.com/uc?id=1A2B...)
            let gdriveMatch = url.match(/(?:id=|\/d\/)([a-zA-Z0-9_-]+)/);
            if (gdriveMatch && gdriveMatch[1]) {
                danhSachId.add(gdriveMatch[1]);
            } else {
                // Nếu là link bình thường, lấy tên file cuối cùng
                let idAnh = url.split('/').pop().trim();
                danhSachId.add(idAnh);
            }
        }

        return Array.from(danhSachId); // Trả về mảng
    };

    // ==========================================
    // BƯỚC 3: THỰC THI VÀ TRẢ KẾT QUẢ
    // ==========================================
    return {
        id: cauHoi.id,
        maCau: maCau,
        anhDe: quetIdAnh(phanDe),    // Mảng chứa ID/Tên ảnh của phần Đề
        anhGiai: quetIdAnh(phanGiai) // Mảng chứa ID/Tên ảnh của phần Giải
    };
};

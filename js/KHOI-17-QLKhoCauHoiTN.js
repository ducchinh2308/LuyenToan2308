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

        <!-- Thanh Giỏ Hàng Trôi Nổi (Bottom Bar) -->
        <div id="thanh-gio-hang-17" style="display: none; position: fixed; bottom: 0; left: 0; width: 100%; background: #2c3e50; color: white; padding: 15px 20px; box-shadow: 0 -4px 15px rgba(0,0,0,0.3); z-index: 9999; justify-content: space-between; align-items: center; box-sizing: border-box; border-top: 2px solid #f1c40f;">
            <div style="font-size: 16px; display: flex; align-items: center; gap: 15px;">
                <div style="background: rgba(255,255,255,0.1); padding: 8px 15px; border-radius: 6px;">
                    🛒 Tổng số câu đã chọn: <b id="lbl_17_tong_cau" style="font-size: 24px; color: #f1c40f; margin-left: 5px;">0</b>
                </div>
            </div>
            <button onclick="ham_17_6_thuc_thi_tao_de()" id="btn_17_chot_de" disabled style="padding: 14px 35px; background: #6c757d; color: white; border: none; border-radius: 6px; font-weight: 900; font-size: 16px; cursor: not-allowed; transition: 0.2s; text-transform: uppercase;">
                🚀 BỐC CÂU HỎI VÀ LƯU LỆNH
            </button>
        </div>
    `;

    // Gọi hàm load dữ liệu ngay sau khi vẽ xong DOM
    await ham_17_2_tai_du_lieu_he_thong();
};

// // =====================================================================
// // Hàm 17.2: Tải dữ liệu Ma trận Github và Đếm Tồn kho từ Google Drive
// // =====================================================================
// window.ham_17_2_tai_du_lieu_he_thong = async function () {
//     try {
//         const loadingDiv = document.getElementById('khoi-17-loading');
//         loadingDiv.innerHTML = `
//             <div style="border: 4px solid #f3f3f3; border-top: 4px solid #d35400; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 0 auto 10px auto;"></div>
//             Đang kéo cấu trúc Ma trận và Đếm file tồn kho từ Drive...
//         `;

//         // 🌟 1. CHẠY SONG SONG 2 TÁC VỤ: Kéo Github & Gọi Apps Script Drive
//         const githubUrl = "https://raw.githubusercontent.com/ducchinh2308/LuyenToan2308/main/Map_ID_Moi.tex";

//         // Thầy nhớ đổi CFG_HE_THONG.URL_APPS_SCRIPT_NGAN_HANG thành biến chứa link Apps Script quản lý kho câu hỏi của thầy nhé
//         const apiDrivePromise = fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
//             method: "POST",
//             body: JSON.stringify({
//                 action: "dem_file_ton_kho",
//                 // Truyền ID thư mục gốc chứa các file JSON câu hỏi trên Drive
//                 folderId: "1ZPIxWjrzkrM99JcMg2dw6wsBi9D9Fz5y"
//             })
//         });

//         const githubPromise = fetch(githubUrl + "?t=" + new Date().getTime());

//         // Đợi cả 2 tiến trình hoàn thành
//         const [resDrive, resGithub] = await Promise.all([apiDrivePromise, githubPromise]);

//         if (!resGithub.ok) throw new Error("Không tìm thấy file Map_ID_Moi.tex trên Github.");

//         // 🌟 2. XỬ LÝ MA TRẬN TỪ GITHUB
//         const noiDungTex = await resGithub.text();
//         window.Kho17State.cayMaTran = ham_17_2_b_boc_tach_tex_ma_tran(noiDungTex);

//         // 🌟 3. XỬ LÝ ĐẾM SỐ LƯỢNG TỒN KHO TỪ KẾT QUẢ DRIVE
//         const resultDrive = await resDrive.json();
//         if (resultDrive.status !== "success") throw new Error("Lỗi đọc Google Drive: " + resultDrive.message);

//         let tonKho = {};
//         const mangTenFile = resultDrive.data || []; // Mảng chứa các tên file (VD: "1D1B2-1_Cau1.json")

//         mangTenFile.forEach(tenFile => {
//             // Dùng Regex bóc tách mã ID ở đầu tên file (Mẫu chuẩn: Ký tự chữ/số + Dấu gạch ngang + Số)
//             // VD: Nó sẽ bắt trúng "1D1B2-1" từ chuỗi "1D1B2-1_Cau1.json" hoặc "1D1B2-1 cau 5.json"
//             let match = tenFile.match(/^([A-Z0-9]+-[0-9]+)/i);

//             if (match && match[1]) {
//                 const idGoc = match[1].toUpperCase();
//                 tonKho[idGoc] = (tonKho[idGoc] || 0) + 1; // Cộng dồn số lượng
//             }
//         });

//         window.Kho17State.soCaiTonKho = tonKho;

//         // 🌟 4. HOÀN TẤT VÀ HIỂN THỊ
//         loadingDiv.style.display = 'none';
//         document.getElementById('khoi-17-content').style.display = 'block';

//         if (typeof ham_17_3_render_combobox === 'function') {
//             ham_17_3_render_combobox('khoi_tao');
//         }

//     } catch (error) {
//         console.error("Lỗi nạp Ma trận Khối 17:", error);
//         document.getElementById('khoi-17-loading').innerHTML = `
//             <div style="color: #dc3545; background: #f8d7da; padding: 15px; border-radius: 8px; border: 1px solid #f5c6cb;">
//                 ❌ Lỗi nạp dữ liệu: ${error.message} <br>
//                 <button onclick="ham_17_2_tai_du_lieu_he_thong()" style="margin-top: 10px; padding: 6px 15px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer;">🔄 Thử lại</button>
//             </div>
//         `;
//     }
// };

// // // =====================================================================
// // // Hàm 17.2.b: Trí tuệ bóc tách cấu trúc ID6 từ File LaTeX (.tex)
// // // =====================================================================
// // window.ham_17_2_b_boc_tach_tex_ma_tran = function (noiDungTex) {
// //     let cayMaTran = {};
// //     const lines = noiDungTex.split('\n');

// //     // Regex bắt mã ID6 (Ví dụ: 12D1N1, 11H2T3 hoặc 10S2-1)
// //     // - Nhóm 1: Khối lớp (10, 11, 12, 09)
// //     // - Nhóm 2: Môn (D, H, S, T, G)
// //     // - Nhóm 3: Chương (1, 2, 3...)
// //     // - Nhóm 4: Mức độ (N, T, V, C, Y, B, K, G) hoặc gạch nối (-)
// //     // - Nhóm 5: Thứ tự dạng (1, 2, 10...)
// //     const regexID6 = /([0-9]{2})([A-Z])([0-9]+)([-A-Z])([0-9]+)/;

// //     lines.forEach(line => {
// //         const txt = line.trim();
// //         // Bỏ qua dòng chú thích (%) hoặc dòng rỗng
// //         if (txt.startsWith('%') || txt.length === 0) return;

// //         const match = txt.match(regexID6);
// //         if (match) {
// //             const maID = match[0];
// //             const khoiLop = "Khối " + match[1];
// //             const maMon = match[2];
// //             const chuong = "Chương " + match[3];
// //             const maMucDo = match[4];

// //             // 1. Dịch Môn học
// //             let tenMon = "Môn chung";
// //             if (maMon === 'D' || maMon === 'G') tenMon = "Đại số & Giải tích";
// //             else if (maMon === 'H') tenMon = "Hình học";
// //             else if (maMon === 'S' || maMon === 'T') tenMon = "Xác suất & Thống kê";

// //             // 2. Dịch Mức độ
// //             let mucDo = "Nhận biết";
// //             if (['T', 'B'].includes(maMucDo)) mucDo = "Thông hiểu";
// //             else if (['V', 'K'].includes(maMucDo)) mucDo = "Vận dụng";
// //             else if (['C', 'G'].includes(maMucDo)) mucDo = "Vận dụng cao";
// //             else if (maMucDo === '-') mucDo = "Phân loại chung";

// //             // 3. Cắt gọt lấy "Tên Dạng"
// //             // Lấy toàn bộ chữ nằm phía sau mã ID6
// //             let tenDang = txt.substring(txt.indexOf(maID) + maID.length);

// //             // Dùng thủ thuật dọn sạch rác LaTeX (Xóa các lệnh như \id, \textbf, dấu ngoặc...)
// //             tenDang = tenDang.replace(/\\[a-zA-Z]+/g, '')      // Xóa lệnh tex
// //                 .replace(/[\{\}\[\]\:\-\.]/g, ' ') // Xóa ngoặc, dấu câu
// //                 .replace(/\s+/g, ' ')              // Dọn khoảng trắng thừa
// //                 .trim();

// //             // Nếu không có chữ nào, mặc định là "Dạng X"
// //             if (!tenDang) tenDang = "Dạng " + match[5];

// //             // 4. Bơm vào Cấu trúc Cây JSON
// //             if (!cayMaTran[khoiLop]) cayMaTran[khoiLop] = {};
// //             if (!cayMaTran[khoiLop][tenMon]) cayMaTran[khoiLop][tenMon] = {};
// //             if (!cayMaTran[khoiLop][tenMon][chuong]) cayMaTran[khoiLop][tenMon][chuong] = [];

// //             // Kiểm tra chống lưu trùng lặp nếu file TEX bị khai báo dư
// //             const daTonTai = cayMaTran[khoiLop][tenMon][chuong].find(d => d.ma_id6 === maID);
// //             if (!daTonTai) {
// //                 cayMaTran[khoiLop][tenMon][chuong].push({
// //                     ma_id6: maID,
// //                     ten_dang: tenDang,
// //                     muc_do: mucDo
// //                 });
// //             }
// //         }
// //     });

// //     return cayMaTran;
// // };

// // =====================================================================
// // BƯỚC 1 DEBUG: Kéo file chia dạng (Map_ID_Moi.tex) từ Github và hiển thị
// // =====================================================================
// window.ham_17_2_tai_du_lieu_he_thong = async function () {
//     const loadingDiv = document.getElementById('khoi-17-loading');
//     const contentDiv = document.getElementById('khoi-17-content');

//     try {
//         // 1. Bật loading
//         if (loadingDiv) {
//             loadingDiv.style.display = 'block';
//             loadingDiv.innerHTML = `
//                 <div style="text-align: center; padding: 20px;">
//                     <div style="border: 4px solid #f3f3f3; border-top: 4px solid #1a73e8; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 0 auto 10px auto;"></div>
//                     <span style="color: #1a73e8; font-weight: bold;">Đang kéo file cấu trúc từ Github...</span>
//                 </div>
//             `;
//         }
//         if (contentDiv) contentDiv.style.display = 'none';

//         // 2. Kéo dữ liệu từ Github (Dùng thêm tham số thời gian để chống trình duyệt lưu bộ nhớ đệm cache cũ)
//         const githubUrl = "https://raw.githubusercontent.com/ducchinh2308/LuyenToan2308/main/Map_ID_Moi.tex";
//         const res = await fetch(githubUrl + "?t=" + new Date().getTime());

//         if (!res.ok) throw new Error("Không tìm thấy file trên Github! (Mã lỗi: " + res.status + ")");

//         // Đọc dữ liệu Text thô
//         const noiDungTex = await res.text();

//         // 3. In ra Console (F12) để thầy debug hệ thống ngầm
//         console.log("✅ [DEBUG] DỮ LIỆU TỪ GITHUB ĐÃ VỀ:");
//         console.log(noiDungTex.substring(0, 300) + "\n... (Đã cắt bớt để dễ nhìn)");

//         // 4. In trực tiếp ra giao diện web để thầy xem tận mắt
//         if (loadingDiv) loadingDiv.style.display = 'none';
//         if (contentDiv) {
//             contentDiv.style.display = 'block';
//             contentDiv.innerHTML = `
//                 <div style="background: #e8f5e9; border: 1px solid #28a745; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
//                     <h4 style="color: #155724; margin-top: 0;">✅ THÀNH CÔNG: Tải dữ liệu từ Github (Bước 1)</h4>
//                     <p style="font-size: 13px; color: #333;">Nội dung file <b>Map_ID_Moi.tex</b> đọc được như sau:</p>
//                     <textarea readonly style="width: 100%; height: 350px; font-family: monospace; font-size: 13px; padding: 10px; border: 1px solid #ced4da; border-radius: 4px; background: #fff; box-sizing: border-box;">${noiDungTex}</textarea>
//                 </div>
                
//                 <div style="text-align: center;">
//                     <button onclick="alert('Bước 2 sẽ ráp hàm bóc tách Ma trận vào đây!')" style="padding: 10px 20px; background: #ffc107; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">⏭️ Chuyển sang Bước 2 (Chạy hàm bóc tách)</button>
//                 </div>
//             `;
//         }

//     } catch (error) {
//         console.error("❌ [DEBUG] Lỗi tải Github:", error);
//         if (loadingDiv) {
//             loadingDiv.innerHTML = `
//                 <div style="color: #721c24; background: #f8d7da; padding: 15px; border-radius: 8px; border: 1px solid #f5c6cb; text-align: center;">
//                     <b>❌ LỖI BƯỚC 1:</b> ${error.message} <br><br>
//                     <button onclick="ham_17_2_tai_du_lieu_he_thong()" style="padding: 6px 15px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer;">🔄 Thử lại</button>
//                 </div>
//             `;
//         }
//     }
// };

// =====================================================================
// Hàm bóc tách File Map ID (ID5/ID6) thành Cây JSON
// =====================================================================
window.ham_17_2_b_boc_tach_tex_ma_tran = function (noiDungTex) {
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
window.ham_17_2_tai_du_lieu_he_thong = async function () {
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
        window.Kho17State.cayMaTran = window.ham_17_2_b_boc_tach_tex_ma_tran(noiDungTex);

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
            window.ham_17_3_ve_giao_dien_chon_dang(window.Kho17State.cayMaTran, 'khu_vuc_combobox');
        }

    } catch (error) {
        if (loadingDiv) {
            loadingDiv.innerHTML = `
                <div style="color: #721c24; background: #f8d7da; padding: 15px; border-radius: 8px; border: 1px solid #f5c6cb; text-align: center;">
                    <b>❌ LỖI TẢI DỮ LIỆU:</b> ${error.message} <br><br>
                    <button onclick="window.ham_17_2_tai_du_lieu_he_thong()" style="padding: 6px 15px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer;">🔄 Thử lại</button>
                </div>
            `;
        }
    }
};


// // =====================================================================
// // BƯỚC 3: DỰNG GIAO DIỆN BẢNG MA TRẬN NHIỀU DÒNG (ĐỔ RẠP CASCADING)
// // =====================================================================

// // Biến toàn cục
// window.DuLieuMaTranToanCuc = [];
// window.MaTran_SoDongHienTai = 0;

// // Hàm 1: Vẽ giao diện HTML Bảng Ma Trận vào vùng chứa
// window.ham_17_3_ve_giao_dien_chon_dang = function (cayMaTran, idVungChua) {
//     window.DuLieuMaTranToanCuc = cayMaTran;
//     window.MaTran_SoDongHienTai = 0; // Reset số dòng

//     const vungRender = document.getElementById(idVungChua);
//     if (!vungRender) {
//         alert("Không tìm thấy vùng chứa HTML có ID là: " + idVungChua);
//         return;
//     }

//     let htmlUI = `
//         <div style="background: #fff; border: 1px solid #dee2e6; border-radius: 8px; padding: 20px; margin-bottom: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
//             <h4 style="color: #1a73e8; margin-top: 0; border-bottom: 2px solid #e9ecef; padding-bottom: 10px; display: flex; align-items: center; gap: 8px;">
//                 🎯 XÂY DỰNG MA TRẬN ĐỀ THI
//             </h4>
            
//             <div style="overflow-x: auto;">
//                 <table style="width: 100%; border-collapse: collapse; min-width: 1000px; text-align: left;" id="bang_ma_tran_cau_truc">
//                     <thead style="background: #f8f9fa; border-bottom: 2px solid #dee2e6;">
//                         <tr>
//                             <th style="padding: 12px 10px; width: 40px; text-align: center; color: #495057;">STT</th>
//                             <th style="padding: 12px 10px; width: 12%; color: #495057;">1. Lớp</th>
//                             <th style="padding: 12px 10px; width: 15%; color: #495057;">2. Phân môn</th>
//                             <th style="padding: 12px 10px; width: 18%; color: #495057;">3. Chương</th>
//                             <th style="padding: 12px 10px; width: 20%; color: #495057;">4. Bài</th>
//                             <th style="padding: 12px 10px; width: 30%; color: #d35400;">5. Dạng bài chi tiết</th>
//                             <th style="padding: 12px 10px; width: 50px; text-align: center; color: #495057;">Xóa</th>
//                         </tr>
//                     </thead>
//                     <tbody id="tbody_ma_tran_cau_truc">
//                         <!-- Các dòng ma trận sẽ được JS chèn tự động vào đây -->
//                     </tbody>
//                 </table>
//             </div>

//             <div style="margin-top: 20px; display: flex; justify-content: flex-start;">
//                 <button onclick="ham_17_3_them_dong_ma_tran()" style="padding: 12px 25px; background: #28a745; color: white; border: none; border-radius: 6px; font-weight: bold; font-size: 14px; cursor: pointer; display: flex; align-items: center; gap: 6px; box-shadow: 0 2px 5px rgba(40,167,69,0.3); transition: 0.2s;" onmouseover="this.style.background='#218838'" onmouseout="this.style.background='#28a745'">
//                     ➕ THÊM DÒNG MA TRẬN MỚI
//                 </button>
//             </div>
//         </div>
//     `;

//     vungRender.innerHTML = htmlUI;

//     // Vừa mở lên là tự động thêm sẵn 1 dòng cho GV xài
//     ham_17_3_them_dong_ma_tran();
// };

// // =====================================================================
// // CÁC HÀM XỬ LÝ THÊM/XÓA DÒNG BẢNG
// // =====================================================================

// window.ham_17_3_them_dong_ma_tran = function () {
//     window.MaTran_SoDongHienTai++;
//     let rowId = window.MaTran_SoDongHienTai;
//     const tbody = document.getElementById('tbody_ma_tran_cau_truc');

//     let tr = document.createElement('tr');
//     tr.id = `row_matran_${rowId}`;
//     tr.style.borderBottom = "1px dashed #dee2e6";
//     tr.style.transition = "background 0.2s";
//     tr.onmouseover = function () { this.style.background = '#f1f8ff'; };
//     tr.onmouseout = function () { this.style.background = 'transparent'; };

//     // CSS chung cho các ô Select
//     const selStyle = "width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 13px; outline: none; cursor: pointer;";

//     tr.innerHTML = `
//         <td style="padding: 10px; text-align: center; font-weight: bold; color: #6c757d;" class="stt_dong_matran">${rowId}</td>
//         <td style="padding: 10px;">
//             <select id="sel_lop_${rowId}" onchange="ham_17_3_change_lop(${rowId})" style="${selStyle}"></select>
//         </td>
//         <td style="padding: 10px;">
//             <select id="sel_mon_${rowId}" onchange="ham_17_3_change_mon(${rowId})" style="${selStyle}"></select>
//         </td>
//         <td style="padding: 10px;">
//             <select id="sel_chuong_${rowId}" onchange="ham_17_3_change_chuong(${rowId})" style="${selStyle}"></select>
//         </td>
//         <td style="padding: 10px;">
//             <select id="sel_bai_${rowId}" onchange="ham_17_3_change_bai(${rowId})" style="${selStyle}"></select>
//         </td>
//         <td style="padding: 10px;">
//             <select id="sel_dang_${rowId}" style="${selStyle} border: 1px solid #f39c12; background: #fffdf5; color: #d35400; font-weight: bold;"></select>
//         </td>
//         <td style="padding: 10px; text-align: center;">
//             <button onclick="ham_17_3_xoa_dong_ma_tran(${rowId})" style="background: none; border: none; cursor: pointer; color: #dc3545; font-size: 18px; transition: 0.2s;" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'" title="Xóa dòng này">🗑️</button>
//         </td>
//     `;

//     tbody.appendChild(tr);

//     // Vừa đẻ ra dòng mới -> Mồi ngay dữ liệu Lớp vào ô đầu tiên của dòng đó
//     ham_17_3_load_lop(rowId);
//     ham_17_3_cap_nhat_stt();
// };

// window.ham_17_3_xoa_dong_ma_tran = function (rowId) {
//     const tbody = document.getElementById('tbody_ma_tran_cau_truc');
//     if (tbody.children.length <= 1) {
//         alert("Thầy phải giữ lại ít nhất 1 dòng trong ma trận nhé!");
//         return;
//     }
//     const tr = document.getElementById(`row_matran_${rowId}`);
//     if (tr) {
//         tr.remove();
//         ham_17_3_cap_nhat_stt(); // Đánh lại số thứ tự
//     }
// };

// window.ham_17_3_cap_nhat_stt = function () {
//     const tbody = document.getElementById('tbody_ma_tran_cau_truc');
//     const rows = tbody.querySelectorAll('tr');
//     rows.forEach((row, index) => {
//         const sttTd = row.querySelector('.stt_dong_matran');
//         if (sttTd) sttTd.innerText = index + 1;
//     });
// };

// // =====================================================================
// // CÁC HÀM XỬ LÝ LỌC DỮ LIỆU ĐỔ RẠP (CASCADING) CHO TỪNG DÒNG
// // =====================================================================

// window.ham_17_3_load_lop = function (rowId) {
//     const selLop = document.getElementById(`sel_lop_${rowId}`);
//     if (!selLop) return;

//     selLop.innerHTML = '<option value="">- Chọn Lớp -</option>';

//     window.DuLieuMaTranToanCuc.forEach((lop, index) => {
//         selLop.innerHTML += `<option value="${index}">[${lop.maID}] ${lop.ten}</option>`;
//     });

//     ham_17_3_change_lop(rowId); // Ép dọn dẹp các ô phía sau của dòng này
// };

// window.ham_17_3_change_lop = function (rowId) {
//     const selLop = document.getElementById(`sel_lop_${rowId}`);
//     const selMon = document.getElementById(`sel_mon_${rowId}`);
//     if (!selLop || !selMon) return;

//     selMon.innerHTML = '<option value="">- Chọn Môn -</option>';

//     let idxLop = selLop.value;
//     if (idxLop !== "") {
//         let dsMon = window.DuLieuMaTranToanCuc[idxLop].mon || [];
//         dsMon.forEach((mon, index) => {
//             selMon.innerHTML += `<option value="${index}">[${mon.maID}] ${mon.ten}</option>`;
//         });
//     }
//     ham_17_3_change_mon(rowId);
// };

// window.ham_17_3_change_mon = function (rowId) {
//     const selLop = document.getElementById(`sel_lop_${rowId}`);
//     const selMon = document.getElementById(`sel_mon_${rowId}`);
//     const selChuong = document.getElementById(`sel_chuong_${rowId}`);
//     if (!selLop || !selMon || !selChuong) return;

//     selChuong.innerHTML = '<option value="">- Chọn Chương -</option>';

//     let idxLop = selLop.value;
//     let idxMon = selMon.value;

//     if (idxLop !== "" && idxMon !== "") {
//         let dsChuong = window.DuLieuMaTranToanCuc[idxLop].mon[idxMon].chuong || [];
//         dsChuong.forEach((chuong, index) => {
//             selChuong.innerHTML += `<option value="${index}">[${chuong.maID}] ${chuong.ten}</option>`;
//         });
//     }
//     ham_17_3_change_chuong(rowId);
// };

// window.ham_17_3_change_chuong = function (rowId) {
//     const selLop = document.getElementById(`sel_lop_${rowId}`);
//     const selMon = document.getElementById(`sel_mon_${rowId}`);
//     const selChuong = document.getElementById(`sel_chuong_${rowId}`);
//     const selBai = document.getElementById(`sel_bai_${rowId}`);
//     if (!selLop || !selMon || !selChuong || !selBai) return;

//     selBai.innerHTML = '<option value="">- Chọn Bài -</option>';

//     let idxLop = selLop.value;
//     let idxMon = selMon.value;
//     let idxChuong = selChuong.value;

//     if (idxLop !== "" && idxMon !== "" && idxChuong !== "") {
//         let dsBai = window.DuLieuMaTranToanCuc[idxLop].mon[idxMon].chuong[idxChuong].bai || [];
//         dsBai.forEach((bai, index) => {
//             selBai.innerHTML += `<option value="${index}">[${bai.maID}] ${bai.ten}</option>`;
//         });
//     }
//     ham_17_3_change_bai(rowId);
// };

// window.ham_17_3_change_bai = function (rowId) {
//     const selLop = document.getElementById(`sel_lop_${rowId}`);
//     const selMon = document.getElementById(`sel_mon_${rowId}`);
//     const selChuong = document.getElementById(`sel_chuong_${rowId}`);
//     const selBai = document.getElementById(`sel_bai_${rowId}`);
//     const selDang = document.getElementById(`sel_dang_${rowId}`);
//     if (!selLop || !selMon || !selChuong || !selBai || !selDang) return;

//     selDang.innerHTML = '<option value="">- Chọn Dạng chi tiết -</option>';

//     let idxLop = selLop.value;
//     let idxMon = selMon.value;
//     let idxChuong = selChuong.value;
//     let idxBai = selBai.value;

//     if (idxLop !== "" && idxMon !== "" && idxChuong !== "" && idxBai !== "") {
//         let dsDang = window.DuLieuMaTranToanCuc[idxLop].mon[idxMon].chuong[idxChuong].bai[idxBai].dang || [];
//         dsDang.forEach((dang, index) => {
//             selDang.innerHTML += `<option value="${index}">[ID: ${dang.maID}] ${dang.tenDang}</option>`;
//         });
//     }
// };

// =====================================================================
// BƯỚC 3: DỰNG GIAO DIỆN BẢNG MA TRẬN 3 PHẦN (TN, DS, TLN) & CẤP ĐỘ
// =====================================================================

// Biến toàn cục
window.DuLieuMaTranToanCuc = [];
window.MaTran_SoDongHienTai = 0;

// Hàm tạo bộ khung HTML cho từng loại (TN, DS, TLN)
function taoBangMaTranHTML(loaiCau, tieuDe, mauSac) {
    return `
        <div style="margin-bottom: 25px; border: 1px solid ${mauSac}; border-radius: 8px; overflow: hidden; background: #fff; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
            <div style="background: ${mauSac}15; padding: 12px 15px; border-bottom: 2px solid ${mauSac}; font-weight: bold; color: ${mauSac}; font-size: 15px; text-transform: uppercase;">
                ${tieuDe}
            </div>
            <div style="overflow-x: auto; padding: 10px;">
                <table style="width: 100%; border-collapse: collapse; min-width: 800px; text-align: left;">
                    <thead style="background: #f8f9fa; border-bottom: 2px solid #dee2e6;">
                        <tr>
                            <th style="padding: 10px 4px; width: 40px; text-align: center; color: #495057; font-size: 12px;">STT</th>
                            <th style="padding: 10px 4px; width: 60px; color: #495057; font-size: 12px;">Lớp</th>
                            <th style="padding: 10px 4px; width: 60px; color: #495057; font-size: 12px;">Phân môn</th>
                            <th style="padding: 10px 4px; width: 60px; color: #495057; font-size: 12px;">Chương</th>
                            <th style="padding: 10px 4px; width: 120px; color: #495057; font-size: 12px;">Bài</th>
                            <th style="padding: 10px 4px; width: 150px; color: #d35400; font-size: 12px;">Dạng bài chi tiết</th>
                            <th style="padding: 10px 4px; width: 60px; text-align: center; color: #28a745; font-size: 12px;" title="Nhận biết">NB</th>
                            <th style="padding: 10px 4px; width: 60px; text-align: center; color: #17a2b8; font-size: 12px;" title="Thông hiểu">TH</th>
                            <th style="padding: 10px 4px; width: 60px; text-align: center; color: #f39c12; font-size: 12px;" title="Vận dụng">VD</th>
                            <th style="padding: 10px 4px; width: 60px; text-align: center; color: #e74c3c; font-size: 12px;" title="Vận dụng cao">VDC</th>
                            <th style="padding: 10px 4px; width: 50px; text-align: center; color: #495057; font-size: 12px;">Xóa</th>
                        </tr>
                    </thead>
                    <tbody id="tbody_matran_${loaiCau}">
                        <!-- Dòng ma trận sẽ đẻ vào đây -->
                    </tbody>
                </table>
                <div style="margin-top: 10px; display: flex; justify-content: flex-start;">
                    <button type="button" onclick="ham_17_3_them_dong_ma_tran('${loaiCau}')" style="padding: 8px 15px; background: ${mauSac}; color: white; border: none; border-radius: 4px; font-weight: bold; font-size: 12px; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.2); transition: 0.2s;" onmouseover="this.style.opacity='0.8'" onmouseout="this.style.opacity='1'">
                        ➕ THÊM DÒNG (${loaiCau})
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Hàm 1: Vẽ giao diện HTML Bảng Ma Trận
window.ham_17_3_ve_giao_dien_chon_dang = function (cayMaTran, idVungChua) {
    window.DuLieuMaTranToanCuc = cayMaTran;
    window.MaTran_SoDongHienTai = 0;

    const vungRender = document.getElementById(idVungChua);
    if (!vungRender) return alert("Không tìm thấy vùng chứa HTML: " + idVungChua);

    vungRender.innerHTML = `
        <div style="background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
            <h3 style="color: #1a73e8; margin-top: 0; border-bottom: 2px solid #e9ecef; padding-bottom: 10px;">🎯 MA TRẬN ĐỀ THI CHI TIẾT</h3>
            ${taoBangMaTranHTML('TN', 'PHẦN I. Câu trắc nghiệm nhiều phương án lựa chọn', '#1a73e8')}
            ${taoBangMaTranHTML('DS', 'PHẦN II. Câu trắc nghiệm đúng sai', '#d35400')}
            ${taoBangMaTranHTML('TLN', 'PHẦN III. Câu trắc nghiệm trả lời ngắn', '#28a745')}
        </div>
    `;

    // Mồi sẵn mỗi phần 1 dòng
    ham_17_3_them_dong_ma_tran('TN');
    ham_17_3_them_dong_ma_tran('DS');
    ham_17_3_them_dong_ma_tran('TLN');
};

// =====================================================================
// CÁC HÀM XỬ LÝ THÊM/XÓA DÒNG BẢNG (ĐA PHÂN HỆ)
// =====================================================================

// window.ham_17_3_them_dong_ma_tran = function (loaiCau) {
//     window.MaTran_SoDongHienTai++;
//     let rowId = window.MaTran_SoDongHienTai;
//     const tbody = document.getElementById(`tbody_matran_${loaiCau}`);
//     if (!tbody) return;

//     let tr = document.createElement('tr');
//     tr.id = `row_matran_${rowId}`;
//     tr.className = `dong_matran_${loaiCau}`;
//     tr.style.borderBottom = "1px dashed #dee2e6";
//     tr.style.transition = "background 0.2s";
//     tr.onmouseover = function () { this.style.background = '#f1f8ff'; };
//     tr.onmouseout = function () { this.style.background = 'transparent'; };

//     // CSS ô Select ép nhỏ padding và chữ để tiết kiệm không gian
//     const selStyle = "width: 100%; padding: 6px 2px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; outline: none; cursor: pointer; box-sizing: border-box;";
//     // CSS ô Input số lượng
//     const inpStyle = "width: 100%; padding: 6px 0; border: 1px solid #ced4da; border-radius: 4px; font-size: 13px; text-align: center; font-weight: bold; box-sizing: border-box; outline: none;";

//     tr.innerHTML = `
//         <td style="padding: 8px 4px; text-align: center; font-weight: bold; color: #6c757d;" class="stt_dong_${loaiCau}"></td>
//         <td style="padding: 8px 4px;"><select id="sel_lop_${rowId}" onchange="ham_17_3_change_lop(${rowId})" style="${selStyle}"></select></td>
//         <td style="padding: 8px 4px;"><select id="sel_mon_${rowId}" onchange="ham_17_3_change_mon(${rowId})" style="${selStyle}"></select></td>
//         <td style="padding: 8px 4px;"><select id="sel_chuong_${rowId}" onchange="ham_17_3_change_chuong(${rowId})" style="${selStyle}"></select></td>
//         <td style="padding: 8px 4px;"><select id="sel_bai_${rowId}" onchange="ham_17_3_change_bai(${rowId})" style="${selStyle}"></select></td>
//         <td style="padding: 8px 4px;"><select id="sel_dang_${rowId}" onchange="ham_17_3_change_dang('${loaiCau}', ${rowId})" style="${selStyle} border: 1px solid #f39c12; background: #fffdf5; color: #d35400; font-weight: bold;"></select></td>
        
//         <td style="padding: 8px 4px;"><input type="number" id="sl_nb_${rowId}" min="0" placeholder="-" style="${inpStyle} color: #28a745; background: #f0fff4; border-color: #c3e6cb;" onfocus="this.style.background='#fff'" onblur="this.style.background='#f0fff4'"></td>
//         <td style="padding: 8px 4px;"><input type="number" id="sl_th_${rowId}" min="0" placeholder="-" style="${inpStyle} color: #17a2b8; background: #e0f7fa; border-color: #b8daff;" onfocus="this.style.background='#fff'" onblur="this.style.background='#e0f7fa'"></td>
//         <td style="padding: 8px 4px;"><input type="number" id="sl_vd_${rowId}" min="0" placeholder="-" style="${inpStyle} color: #f39c12; background: #fff8e1; border-color: #ffeeba;" onfocus="this.style.background='#fff'" onblur="this.style.background='#fff8e1'"></td>
//         <td style="padding: 8px 4px;"><input type="number" id="sl_vdc_${rowId}" min="0" placeholder="-" style="${inpStyle} color: #e74c3c; background: #ffebee; border-color: #f5c6cb;" onfocus="this.style.background='#fff'" onblur="this.style.background='#ffebee'"></td>
        
//         <td style="padding: 8px 4px; text-align: center;">
//             <button onclick="ham_17_3_xoa_dong_ma_tran('${loaiCau}', ${rowId})" style="background: none; border: none; cursor: pointer; color: #dc3545; font-size: 16px; transition: 0.2s;" onmouseover="this.style.transform='scale(1.3)'" onmouseout="this.style.transform='scale(1)'" title="Xóa">🗑️</button>
//         </td>
//     `;

//     tbody.appendChild(tr);

//     ham_17_3_load_lop(rowId);
//     ham_17_3_cap_nhat_stt(loaiCau);
// };

window.ham_17_3_them_dong_ma_tran = function (loaiCau) {
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

    // Hàm thu nhỏ code tạo khối [Ô Nhập] / [Ô Khóa]
    const taoKhoiNhapSo = (idInput, idMax, color, bgColor, borderColor) => `
        <div style="display: flex; align-items: center; justify-content: center; gap: 3px;">
            <input type="text" id="${idInput}" maxlength="2" placeholder="0" 
                style="${inpStyle} color: ${color}; background: ${bgColor}; border-color: ${borderColor};" 
                onfocus="this.style.background='#fff'" 
                onblur="this.style.background='${bgColor}'" 
                oninput="this.value=this.value.replace(/[^0-9]/g,'')"> 
            
            <span style="color: #adb5bd; font-size: 14px; font-weight: bold;">/</span>
            
            <input type="text" id="${idMax}" value="-" readonly tabindex="-1" style="${maxStyle}">
        </div>
    `;

    tr.innerHTML = `
        <td style="padding: 8px 4px; text-align: center; font-weight: bold; color: #6c757d;" class="stt_dong_${loaiCau}"></td>
        <td style="padding: 8px 4px;"><select id="sel_lop_${rowId}" onchange="ham_17_3_change_lop(${rowId})" style="${selStyle}"></select></td>
        <td style="padding: 8px 4px;"><select id="sel_mon_${rowId}" onchange="ham_17_3_change_mon(${rowId})" style="${selStyle}"></select></td>
        <td style="padding: 8px 4px;"><select id="sel_chuong_${rowId}" onchange="ham_17_3_change_chuong(${rowId})" style="${selStyle}"></select></td>
        <td style="padding: 8px 4px;"><select id="sel_bai_${rowId}" onchange="ham_17_3_change_bai(${rowId})" style="${selStyle}"></select></td>
        <td style="padding: 8px 4px;"><select id="sel_dang_${rowId}" onchange="ham_17_3_change_dang('${loaiCau}', ${rowId})" style="${selStyle} border: 1px solid #f39c12; background: #fffdf5; color: #d35400; font-weight: bold;"></select></td>
        
        <td style="padding: 8px 4px;">${taoKhoiNhapSo(`sl_nb_${rowId}`, `max_nb_${rowId}`, '#28a745', '#f0fff4', '#c3e6cb')}</td>
        <td style="padding: 8px 4px;">${taoKhoiNhapSo(`sl_th_${rowId}`, `max_th_${rowId}`, '#17a2b8', '#e0f7fa', '#b8daff')}</td>
        <td style="padding: 8px 4px;">${taoKhoiNhapSo(`sl_vd_${rowId}`, `max_vd_${rowId}`, '#f39c12', '#fff8e1', '#ffeeba')}</td>
        <td style="padding: 8px 4px;">${taoKhoiNhapSo(`sl_vdc_${rowId}`, `max_vdc_${rowId}`, '#e74c3c', '#ffebee', '#f5c6cb')}</td>
        
        <td style="padding: 8px 4px; text-align: center;">
            <button onclick="ham_17_3_xoa_dong_ma_tran('${loaiCau}', ${rowId})" style="background: none; border: none; cursor: pointer; color: #dc3545; font-size: 16px; transition: 0.2s;" onmouseover="this.style.transform='scale(1.3)'" onmouseout="this.style.transform='scale(1)'" title="Xóa">🗑️</button>
        </td>
    `;

    tbody.appendChild(tr);

    ham_17_3_load_lop(rowId);
    ham_17_3_cap_nhat_stt(loaiCau);
};


window.ham_17_3_cap_nhat_max_cau = function (rowId, maxNB, maxTH, maxVD, maxVDC) {
    // Gán placeholder dạng "/4", "/3", v.v.
    document.getElementById(`sl_nb_${rowId}`).placeholder = `/${maxNB}`;
    document.getElementById(`sl_th_${rowId}`).placeholder = `/${maxTH}`;
    document.getElementById(`sl_vd_${rowId}`).placeholder = `/${maxVD}`;
    document.getElementById(`sl_vdc_${rowId}`).placeholder = `/${maxVDC}`;
};


// Thêm hàm này vào file JS của thầy
window.ham_format_so_cau = function (input) {
    const placeholder = input.getAttribute('placeholder'); // Lấy cái "/4"
    let val = input.value.replace(/[^0-9]/g, ''); // Chỉ lấy số

    if (val !== "") {
        // Nếu giá trị nhập vào vượt quá max thì chặn lại
        const max = parseInt(placeholder.replace('/', ''));
        if (parseInt(val) > max) val = max;

        input.value = val + placeholder;
    }
};

// Khi focus vào thì xóa sạch "/4" để thầy/cô gõ số bình thường
window.ham_focus_so_cau = function (input) {
    input.value = input.value.replace(input.getAttribute('placeholder'), '');
};


window.ham_17_3_xoa_dong_ma_tran = function (loaiCau, rowId) {
    const tr = document.getElementById(`row_matran_${rowId}`);
    if (tr) {
        tr.remove();
        ham_17_3_cap_nhat_stt(loaiCau);
    }
};



window.ham_17_3_cap_nhat_stt = function (loaiCau) {
    const tbody = document.getElementById(`tbody_matran_${loaiCau}`);
    if (!tbody) return;
    const rows = tbody.querySelectorAll(`tr.dong_matran_${loaiCau}`);
    rows.forEach((row, index) => {
        const sttTd = row.querySelector(`.stt_dong_${loaiCau}`);
        if (sttTd) sttTd.innerText = index + 1;
    });
};

// =====================================================================
// CÁC HÀM XỬ LÝ LỌC DỮ LIỆU ĐỔ RẠP (CASCADING) CHO TỪNG DÒNG
// =====================================================================

window.ham_17_3_load_lop = function (rowId) {
    const selLop = document.getElementById(`sel_lop_${rowId}`);
    if (!selLop) return;

    selLop.innerHTML = '<option value="">-- Lớp --</option>';
    window.DuLieuMaTranToanCuc.forEach((lop, index) => {
        selLop.innerHTML += `<option value="${index}">[${lop.maID}] ${lop.ten}</option>`;
    });

    ham_17_3_change_lop(rowId);
};

window.ham_17_3_change_lop = function (rowId) {
    const selLop = document.getElementById(`sel_lop_${rowId}`);
    const selMon = document.getElementById(`sel_mon_${rowId}`);
    if (!selLop || !selMon) return;

    selMon.innerHTML = '<option value="">-- Môn --</option>';
    let idxLop = selLop.value;
    if (idxLop !== "") {
        let dsMon = window.DuLieuMaTranToanCuc[idxLop].mon || [];
        dsMon.forEach((mon, index) => {
            selMon.innerHTML += `<option value="${index}">[${mon.maID}] ${mon.ten}</option>`;
        });
    }

    ham_17_3_change_mon(rowId);
};

window.ham_17_3_change_mon = function (rowId) {
    const selLop = document.getElementById(`sel_lop_${rowId}`);
    const selMon = document.getElementById(`sel_mon_${rowId}`);
    const selChuong = document.getElementById(`sel_chuong_${rowId}`);
    if (!selLop || !selMon || !selChuong) return;

    selChuong.innerHTML = '<option value="">-- Chương --</option>';
    let idxLop = selLop.value;
    let idxMon = selMon.value;

    if (idxLop !== "" && idxMon !== "") {
        let dsChuong = window.DuLieuMaTranToanCuc[idxLop].mon[idxMon].chuong || [];
        dsChuong.forEach((chuong, index) => {
            selChuong.innerHTML += `<option value="${index}">[${chuong.maID}] ${chuong.ten}</option>`;
        });
    }
    ham_17_3_change_chuong(rowId);
};

window.ham_17_3_change_chuong = function (rowId) {
    const selLop = document.getElementById(`sel_lop_${rowId}`);
    const selMon = document.getElementById(`sel_mon_${rowId}`);
    const selChuong = document.getElementById(`sel_chuong_${rowId}`);
    const selBai = document.getElementById(`sel_bai_${rowId}`);
    if (!selLop || !selMon || !selChuong || !selBai) return;

    selBai.innerHTML = '<option value="">-- Bài --</option>';
    let idxLop = selLop.value;
    let idxMon = selMon.value;
    let idxChuong = selChuong.value;

    if (idxLop !== "" && idxMon !== "" && idxChuong !== "") {
        let dsBai = window.DuLieuMaTranToanCuc[idxLop].mon[idxMon].chuong[idxChuong].bai || [];
        dsBai.forEach((bai, index) => {
            selBai.innerHTML += `<option value="${index}">[${bai.maID}] ${bai.ten}</option>`;
        });
    }
    ham_17_3_change_bai(rowId);
};


window.ham_17_3_change_bai = function (rowId) {
    const selLop = document.getElementById(`sel_lop_${rowId}`);
    const selMon = document.getElementById(`sel_mon_${rowId}`);
    const selChuong = document.getElementById(`sel_chuong_${rowId}`);
    const selBai = document.getElementById(`sel_bai_${rowId}`);
    const selDang = document.getElementById(`sel_dang_${rowId}`);
    if (!selLop || !selMon || !selChuong || !selBai || !selDang) return;

    selDang.innerHTML = '<option value="">-- Chọn Dạng chi tiết --</option>';
    let idxLop = selLop.value;
    let idxMon = selMon.value;
    let idxChuong = selChuong.value;
    let idxBai = selBai.value;

    if (idxLop !== "" && idxMon !== "" && idxChuong !== "" && idxBai !== "") {
        let dsDang = window.DuLieuMaTranToanCuc[idxLop].mon[idxMon].chuong[idxChuong].bai[idxBai].dang || [];
        dsDang.forEach((dang, index) => {
            selDang.innerHTML += `<option value="${index}">[${dang.maID}] ${dang.tenDang}</option>`;
        });
    }
    // Khi chọn xong bài, code tự động kích hoạt tra cứu kho cho Dạng bài
    const tr = document.getElementById(`row_matran_${rowId}`);
    const loaiCau = tr ? tr.getAttribute('data-loaicau') : 'TN';
    ham_17_3_change_dang(loaiCau, rowId);

};


window.ham_17_17_lay_chuoi_trong_ngoac_vuong = function (chuoi) {
    if (!chuoi) return ""; // Bẫy lỗi nếu chuỗi bị undefined hoặc rỗng

    // Tìm dấu [ đầu tiên, lấy mọi thứ bên trong miễn không phải dấu ], và dừng ở dấu ] đầu tiên
    const match = chuoi.match(/\[([^\]]*)\]/);

    return match ? match[1] : "";
}




window.ham_17_3_change_dang = async function (loaiCau, rowId) {
    console.log("--- Đang bắt đầu hàm ---");
    console.log("URL API:", CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP);

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

    console.log("Nội dung đã chọn:", { textLop, textMon, textChuong, textBai, textDang });

    // Sau đó thầy dùng hàm window.ham_17_17_lay_chuoi_trong_ngoac_vuong
    // để bóc tách ID từ cái text vừa lấy được (ví dụ: [2D1N1-1]...)
    
    const maLop = window.ham_17_17_lay_chuoi_trong_ngoac_vuong(textLop);
    const maMon = window.ham_17_17_lay_chuoi_trong_ngoac_vuong(textMon);
    const maChuong = window.ham_17_17_lay_chuoi_trong_ngoac_vuong(textChuong);
    const maBai = window.ham_17_17_lay_chuoi_trong_ngoac_vuong(textBai);
    const maDang = window.ham_17_17_lay_chuoi_trong_ngoac_vuong(textDang);

    const idCauchuaX = "["+maLop+maMon+maChuong+"x"+maBai+"-"+maDang+"]";
    console.log("Các mã ID đã bóc tách:", { maLop, maMon, maChuong, maBai, maDang, idCauchuaX });

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

    try {
             const response = await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
            method: "POST",
            headers: {
                // Bắt buộc text/plain để không bị Google chặn preflight
                "Content-Type": "text/plain;charset=utf-8"
            },
            redirect: "follow",
            body: JSON.stringify({
                action: "dem_cau_hoi_ID_theo_4_muc_do",
                idChuaX: idCauchuaX,
                loaiCau: loaiCau
            })
        });
        // 1. ĐỌC DỮ LIỆU THÔ TRƯỚC THAY VÌ PARSE JSON NGAY
        const textResponse = await response.text();

        // 2. CỐ GẮNG PARSE JSON
        let result;
        try {
            result = JSON.parse(textResponse);
        } catch (parseError) {
            throw new Error("Apps Script bị lỗi nội bộ hoặc chưa Deploy đúng cách. Hãy xem Console (F12) để biết chi tiết.");
        }

        console.log("✅ Kết quả trả về từ API:", result);
        if (result.status !== "success") throw new Error(result.message);

        // --- PHẦN MAP UI CẬP NHẬT ---
        const dem = result.data; // Dữ liệu dạng {N: 5, H: 3, V: 0, C: 0}
        const cacMuc = ['nb', 'th', 'vd', 'vdc'];
        const mapMuc = { 'nb': 'N', 'th': 'H', 'vd': 'V', 'vdc': 'C' };

        cacMuc.forEach(muc => {
            const oMax = document.getElementById(`max_${muc}_${rowId}`);
            const oNhap = document.getElementById(`sl_${muc}_${rowId}`);
            const soLuong = dem[mapMuc[muc]] || 0;

            // Nạp số liệu vào ô Khóa (chỉ hiển thị con số)
            if (oMax) {
                oMax.value = soLuong; // Dùng .value vì đây là thẻ <input>
                oMax.style.color = soLuong > 0 ? '#495057' : '#dc3545'; // Đổi chữ đỏ nếu hết câu
            }

            // Xử lý logic cho ô Nhập
            if (oNhap) {
                oNhap.setAttribute('data-max', soLuong);
                if (soLuong > 0) {
                    oNhap.disabled = false;
                    oNhap.style.background = '#fff';
                } else {
                    oNhap.disabled = true; // Khóa luôn ô nhập nếu kho = 0
                    oNhap.style.background = '#e9ecef';
                    oNhap.value = '';
                }
            }
        });

    } catch (e) {
        console.error("❌ Lỗi đếm số lượng từ Drive:", e);
        // Báo lỗi lên UI
        Swal.fire('Lỗi Kết Nối API', e.message, 'error'); // Hoặc dùng alert(e.message)
    }
};

// Hàm gọi API đếm số câu và đổ dữ liệu vào đúng dòng trên Ma trận
window.ham_17_5_dem_so_cau_theo_ma_tran = async function (inputElement, loaiCau, sttDong) {
    const maIdMaTran = inputElement.value.trim(); // Lấy giá trị "[2D1x2-7]"

    // Nếu ô ID trống thì không làm gì cả
    if (!maIdMaTran) return;

    // Hiện trạng thái Loading (Tùy chọn: đổi màu chữ hoặc hiện icon xoay)
    inputElement.style.color = '#ffc107';

    try {
        const response = await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
            method: "POST",
            body: JSON.stringify({
                action: "dem_so_cau_toi_uu",
                idChuaX: maIdMaTran,
                loaiCau: loaiCau
            })
        });

        const data = await response.json();

        if (data.error) throw new Error(data.error);

        // Đổ dữ liệu vào 4 ô của đúng cái dòng (sttDong) đang thao tác
        document.getElementById(`sl_N_${sttDong}`).value = data.N;
        document.getElementById(`sl_H_${sttDong}`).value = data.H;
        document.getElementById(`sl_V_${sttDong}`).value = data.V;
        document.getElementById(`sl_C_${sttDong}`).value = data.C;

        // Trả lại màu chữ bình thường báo hiệu thành công
        inputElement.style.color = '#28a745';

    } catch (error) {
        console.error("Lỗi khi đếm câu hỏi:", error);
        inputElement.style.color = '#dc3545'; // Đỏ nếu lỗi
        alert("Lỗi đếm số lượng câu hỏi: " + error.message);
    }
};


//// =====================================================================
//// [Nhãn thời gian: 19:45 - Ngày 10/06/2026] - Xử lý Lưu thông báo (Phía Giáo viên)
//// =====================================================================
async function ham_them_moi_thong_bao(noiDung, guiToanTruong, mangMaLop) {
    try {
        const kieuGui = guiToanTruong ? 'CHUNG' : 'RIENG';
        const dsLop = guiToanTruong ? [] : mangMaLop;

        const bodyData = {
            noi_dung: noiDung,
            kieu_gui: kieuGui,
            danh_sach_lop: dsLop,
            trang_thai: 1
        };

        const response = await fetch(`${SUPABASE_URL}/rest/v1/thong_bao`, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify(bodyData)
        });

        if (!response.ok) throw new Error("Không thể lưu thông báo");
        alert("📢 Đã phát loa thông báo thành công!");

    } catch (error) {
        console.error("Lỗi:", error);
        alert("Lỗi khi gửi thông báo.");
    }
}


//// =====================================================================
//// MODULE 11: QUẢN LÝ THÔNG BÁO TỪ GIÁO VIÊN (DẠNG BẢNG & FORM THÊM MỚI)
//// =====================================================================

// Hàm hỗ trợ format thời gian cho bảng dễ nhìn
function formatTimeTB(isoString) {
    if (!isoString) return "<span style='color:#adb5bd;'>--</span>";
    let d = new Date(isoString);
    let gioPhut = `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
    let ngayThang = `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
    return `<b>${gioPhut}</b><br><span style='font-size:11px; color:#6c757d;'>${ngayThang}</span>`;
}

// ---------------------------------------------------------------------
// Hàm 11.1: Giao diện chính - Danh sách thông báo (Dạng Bảng)
// ---------------------------------------------------------------------
async function ham_11_1_ve_quan_ly_thong_bao() {
    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
    vungLamViec.innerHTML = `<div style="text-align:center; padding: 30px; color: #fd7e14; font-weight:bold;">⏳ Đang tải danh sách thông báo...</div>`;

    try {
        const headersAPI = { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` };

        // 1. Tải từ điển Lớp học để dịch mã lớp
        const resLop = await fetch(`${SUPABASE_URL}/rest/v1/lop_hoc?select=ma_lop,ten_lop`, { method: 'GET', headers: headersAPI });
        const dataLop = await resLop.json();
        const tuDienLop = {};
        if (dataLop) dataLop.forEach(lop => tuDienLop[lop.ma_lop] = lop.ten_lop);

        // 2. Tải toàn bộ thông báo
        const resTB = await fetch(`${SUPABASE_URL}/rest/v1/thong_bao?select=*&order=thoi_gian_tao.desc`, { method: 'GET', headers: headersAPI });
        const dataTB = await resTB.json();

        // 3. Ráp bảng
        let chuoiCacDong = "";
        if (!dataTB || dataTB.length === 0) {
            chuoiCacDong = `<tr><td colspan="8" style="text-align:center; padding: 20px; color:#6c757d;">Chưa có thông báo nào trong hệ thống.</td></tr>`;
        } else {
            chuoiCacDong = dataTB.map((tb, index) => {
                // Dịch danh sách lớp
                let dsLopHienThi = "<span style='color:#ef4444; font-weight:bold;'>🌍 Toàn trường</span>";
                if (tb.kieu_gui === 'RIENG' && Array.isArray(tb.danh_sach_lop)) {
                    dsLopHienThi = tb.danh_sach_lop.map(ma => tuDienLop[ma] || ma).join(", ");
                }

                // Trạng thái
                let badgeTrangThai = tb.trang_thai === 1
                    ? `<span style="background:#d1fae5; color:#059669; padding:4px 8px; border-radius:4px; font-size:12px; font-weight:bold;">Đang Bật</span>`
                    : `<span style="background:#fee2e2; color:#b91c1c; padding:4px 8px; border-radius:4px; font-size:12px; font-weight:bold;">Đã Tắt</span>`;

                return `
                    <tr style="border-bottom: 1px solid #e2e8f0; hover:background-color: #f8fafc;">
                        <td style="padding: 10px; text-align: center;">${index + 1}</td>
                        <td style="padding: 10px;">
                            <div style="display:flex; gap:5px; justify-content:center;">
                                <button onclick="ham_11_5_xoa_thong_bao('${tb.id}')" style="background:#ef4444; color:white; border:none; padding:5px 8px; border-radius:4px; cursor:pointer; font-size:12px;" title="Xóa">🗑️ Xóa</button>
                                <button onclick="ham_11_6_sua_nhanh_thong_bao('${tb.id}', '${tb.trang_thai}')" style="background:#3b82f6; color:white; border:none; padding:5px 8px; border-radius:4px; cursor:pointer; font-size:12px;" title="Bật/Tắt">🔄 Bật/Tắt</button>
                            </div>
                        </td>
                        <td style="padding: 10px; max-width: 500px; word-wrap: break-word; color:#1e293b; font-weight:500;">${tb.noi_dung}</td>
                        <td style="padding: 10px; font-size:13px; color:#475569;">${dsLopHienThi}</td>
                        <td style="padding: 10px; text-align: center;">${badgeTrangThai}</td>
                        <td style="padding: 10px; text-align: center; font-size:13px;">${formatTimeTB(tb.thoi_gian_tao)}</td>
                        <td style="padding: 10px; text-align: center; font-size:13px; color:#0284c7;">${formatTimeTB(tb.thoi_gian_mo)}</td>
                        <td style="padding: 10px; text-align: center; font-size:13px; color:#b91c1c;">${formatTimeTB(tb.thoi_gian_tat)}</td>
                    </tr>
                `;
            }).join("");
        }

        vungLamViec.innerHTML = `
            <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #f8f9fa; padding-bottom: 15px; margin-bottom: 15px;">
                    <h3 style="color: #fd7e14; margin: 0;">📢 DANH SÁCH THÔNG BÁO</h3>
                    <button onclick="ham_11_2_ve_form_them_thong_bao()" style="padding: 10px 20px; background: #22c55e; color: white; border: none; border-radius: 6px; font-weight: bold; font-size: 14px; cursor: pointer; box-shadow: 0 2px 5px rgba(34,197,94,0.3);">
                        ➕ TẠO THÔNG BÁO MỚI
                    </button>
                </div>
                
                <div style="overflow-x: auto;">
                    <table style="width: 100%; border-collapse: collapse; min-width: 900px;">
                        <thead>
                            <tr style="background-color: #f1f5f9; color: #334155; font-size: 13px; text-align: center;">
                                <th style="padding: 12px; width: 40px;">STT</th>
                                <th style="padding: 12px; width: 140px;">THAO TÁC</th>
                                <th style="padding: 12px; text-align: left; min-width: 350px;">NỘI DUNG</th>
                                <th style="padding: 12px; text-align: left; width: 150px;">ĐỐI TƯỢNG</th>
                                <th style="padding: 12px; width: 90px;">TRẠNG THÁI</th>
                                <th style="padding: 12px; width: 90px;">T.G TẠO</th>
                                <th style="padding: 12px; width: 90px;">T.G MỞ</th>
                                <th style="padding: 12px; width: 90px;">T.G TẮT</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${chuoiCacDong}
                        </tbody>
                    </table>
                </div>
            </div>
        `;

    } catch (error) {
        console.error("Lỗi:", error);
        vungLamViec.innerHTML = `<div style="text-align:center; padding: 30px; color: red;">❌ Lỗi tải danh sách.</div>`;
    }
}

// ---------------------------------------------------------------------
// Hàm 11.2: Mở Form Tạo Thông báo (Có nút Quay Lại)
// ---------------------------------------------------------------------
async function ham_11_2_ve_form_them_thong_bao() {
    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
    vungLamViec.innerHTML = `<div style="text-align:center; padding: 30px; color: #fd7e14; font-weight:bold;">⏳ Đang tải form...</div>`;

    let chuoiCheckboxLop = "";
    try {
        const headersAPI = { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` };
        const res = await fetch(`${SUPABASE_URL}/rest/v1/lop_hoc?select=ma_lop,ten_lop&order=ten_lop.asc`, { method: 'GET', headers: headersAPI });
        const dataLop = await res.json();

        if (dataLop && dataLop.length > 0) {
            chuoiCheckboxLop = dataLop.map(lop => `
                <label style="display: inline-flex; align-items: center; gap: 6px; background: white; padding: 6px 12px; border: 1px solid #ced4da; border-radius: 4px; cursor: pointer; font-size: 13px;">
                    <input type="checkbox" name="lop_thong_bao" value="${lop.ma_lop}" style="width: 16px; height: 16px; margin: 0;"> 
                    <span style="font-weight: bold; color: #334155;">${lop.ten_lop}</span>
                </label>
            `).join("");
        }
    } catch (error) { }

    vungLamViec.innerHTML = `
        <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); max-width: 800px; margin: 0 auto;">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #f8f9fa; padding-bottom: 10px; margin-bottom: 20px;">
                <h3 style="color: #fd7e14; margin: 0;">📝 TẠO THÔNG BÁO MỚI</h3>
                <button onclick="ham_11_1_ve_quan_ly_thong_bao()" style="padding: 8px 15px; background: #64748b; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight:bold;">
                    ⬅️ Quay Lại
                </button>
            </div>
            
            <textarea id="txt-noi-dung-tb" placeholder="Nhập nội dung thông báo..." style="width: 100%; height: 100px; padding: 12px; margin-bottom: 15px; border-radius: 6px; border: 1px solid #ced4da; font-family: inherit; font-size: 15px; box-sizing: border-box; resize: vertical;"></textarea>
            
            <div style="display: flex; gap: 15px; margin-bottom: 15px; background: #f8f9fa; padding: 15px; border-radius: 6px; border: 1px solid #e9ecef;">
                <div style="flex: 1;">
                    <label style="font-size: 13px; font-weight: bold; color: #495057;">⏰ Bắt đầu hiển thị:</label>
                    <input type="datetime-local" id="txt-thoi-gian-mo" style="width: 100%; padding: 8px; border-radius: 4px; border: 1px solid #ced4da; margin-top: 5px; box-sizing: border-box;">
                </div>
                <div style="flex: 1;">
                    <label style="font-size: 13px; font-weight: bold; color: #495057;">⏳ Kết thúc hiển thị (Bỏ trống = Mãi mãi):</label>
                    <input type="datetime-local" id="txt-thoi-gian-tat" style="width: 100%; padding: 8px; border-radius: 4px; border: 1px solid #ced4da; margin-top: 5px; box-sizing: border-box;">
                </div>
            </div>

            <div style="margin-bottom: 20px; background: #e9ecef; padding: 10px 15px; border-radius: 6px;">
                <label style="font-weight: bold; cursor: pointer; display: flex; align-items: center; gap: 8px;">
                    <input type="checkbox" id="chk-toan-truong" onchange="toggleChonLop()" checked style="width: 18px; height: 18px;"> 
                    🌍 Gửi Toàn Trường
                </label>
            </div>
            
            <div id="vung-chon-lop-tb" style="display: none; margin-bottom: 20px; background: #fff3cd; padding: 15px; border-radius: 6px; border: 1px solid #ffe69c;">
                <p style="margin: 0 0 8px 0; font-size: 14px; font-weight: bold; color: #856404;">🎯 Gửi Riêng Theo Lớp</p>
                <div style="display: flex; gap: 10px; flex-wrap: wrap; max-height: 200px; overflow-y: auto; padding: 5px 0;">
                    ${chuoiCheckboxLop}
                </div>
            </div>

            <div style="text-align: right;">
                <button onclick="xu_ly_gui_thong_bao_tu_ui(event)" style="padding: 12px 25px; background: #ef4444; color: white; border: none; border-radius: 6px; font-weight: bold; font-size: 16px; cursor: pointer; box-shadow: 0 4px 6px rgba(239,68,68,0.3); transition: 0.2s;">
                    🚀 LƯU VÀ PHÁT LOA
                </button>
            </div>
        </div>
    `;

    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    document.getElementById('txt-thoi-gian-mo').value = now.toISOString().slice(0, 16);
}

// ---------------------------------------------------------------------
// Các Hàm Xử Lý Logic (Giữ nguyên cấu trúc cũ, chỉ điều hướng về List)
// ---------------------------------------------------------------------
function toggleChonLop() {
    document.getElementById('vung-chon-lop-tb').style.display = document.getElementById('chk-toan-truong').checked ? 'none' : 'block';
}

async function xu_ly_gui_thong_bao_tu_ui(event) {
    const noiDung = document.getElementById('txt-noi-dung-tb').value.trim();
    const isToanTruong = document.getElementById('chk-toan-truong').checked;
    const tgMo = document.getElementById('txt-thoi-gian-mo').value;
    const tgTat = document.getElementById('txt-thoi-gian-tat').value;

    if (!noiDung) { alert("⚠️ Thầy chưa nhập nội dung!"); return; }
    if (!tgMo) { alert("⚠️ Vui lòng chọn thời gian mở!"); return; }

    let mangMaLop = [];
    if (!isToanTruong) {
        const checkboxesChecked = document.querySelectorAll('input[name="lop_thong_bao"]:checked');
        if (checkboxesChecked.length === 0) { alert("⚠️ Chưa chọn lớp nào!"); return; }
        mangMaLop = Array.from(checkboxesChecked).map(cb => cb.value);
    }

    const btn = event.target;
    btn.innerHTML = "⏳ Đang lưu...";
    btn.disabled = true;

    try {
        const bodyData = {
            noi_dung: noiDung,
            kieu_gui: isToanTruong ? 'CHUNG' : 'RIENG',
            danh_sach_lop: isToanTruong ? [] : mangMaLop,
            trang_thai: 1,
            thoi_gian_mo: new Date(tgMo).toISOString(),
            thoi_gian_tat: tgTat ? new Date(tgTat).toISOString() : null
        };
        const res = await fetch(`${SUPABASE_URL}/rest/v1/thong_bao`, {
            method: 'POST',
            headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyData)
        });
        if (!res.ok) throw new Error("Lỗi API");

        // Thành công thì tự quay về bảng danh sách
        ham_11_1_ve_quan_ly_thong_bao();
    } catch (error) {
        alert("❌ Lỗi khi lưu thông báo.");
        btn.innerHTML = "🚀 LƯU VÀ PHÁT LOA";
        btn.disabled = false;
    }
}

// ---------------------------------------------------------------------
// Hàm 11.5: Xóa Thông Báo Khỏi DB
// ---------------------------------------------------------------------
async function ham_11_5_xoa_thong_bao(idThongBao) {
    if (!confirm("⚠️ Thầy có chắc chắn muốn xóa vĩnh viễn thông báo này không?")) return;

    try {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/thong_bao?id=eq.${idThongBao}`, {
            method: 'DELETE',
            headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
        });
        if (!res.ok) throw new Error("Lỗi xóa");
        ham_11_1_ve_quan_ly_thong_bao(); // Tải lại bảng
    } catch (e) {
        alert("❌ Xóa thất bại!");
    }
}

// ---------------------------------------------------------------------
// Hàm 11.6: Đổi nhanh trạng thái Bật/Tắt
// ---------------------------------------------------------------------
async function ham_11_6_sua_nhanh_thong_bao(idThongBao, trangThaiHienTai) {
    const trangThaiMoi = (trangThaiHienTai == 1) ? 0 : 1; // Đảo ngược trạng thái
    try {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/thong_bao?id=eq.${idThongBao}`, {
            method: 'PATCH',
            headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ trang_thai: trangThaiMoi })
        });
        if (!res.ok) throw new Error("Lỗi sửa");
        ham_11_1_ve_quan_ly_thong_bao(); // Tải lại bảng
    } catch (e) {
        alert("❌ Chuyển đổi trạng thái thất bại!");
    }
}
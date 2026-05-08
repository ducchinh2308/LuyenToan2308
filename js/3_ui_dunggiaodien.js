// =====================================================================
// 🎨 KHỐI 3: GIAO DIỆN & CẤU TRÚC HTML (UI BUILDER)
// =====================================================================
// Khối này chuyên trị việc "vẽ" ra các thành phần hiển thị trên màn hình.

// ---------------------------------------------------------------------
// 3.1. TỰ ĐỘNG NẠP CSS CHO HIỆU ỨNG MENU & BỘ ĐẾM STT
// ---------------------------------------------------------------------
const menuStyle = document.createElement('style');
menuStyle.innerHTML = `
    /* Hiệu ứng nút bấm Menu trái */
    .btn-dash {
        padding: 14px 20px; margin-bottom: 10px; background: rgba(255, 255, 255, 0.1);
        color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 8px;
        cursor: pointer; text-align: left; font-weight: bold; font-size: 15px; 
        transition: all 0.2s ease; display: block; width: 100%;
    }
    .btn-dash:not(.active):hover {
        background: #28a745 !important; border-color: #28a745 !important; color: #ffffff !important;
        transform: translateX(5px); box-shadow: 0 4px 10px rgba(40, 167, 69, 0.4);
    }
    .btn-dash.active {
        background: #ffffff !important; border-color: #ffffff !important;
        box-shadow: 0 4px 10px rgba(0,0,0,0.2) !important; transform: translateX(5px);
    }
    .sidebar-admin .btn-dash.active { color: #c0392b !important; }
    .sidebar-gv .btn-dash.active { color: #0056b3 !important; }
    .sidebar-hs .btn-dash.active { color: #059669 !important; }

    /* Menu Nhóm đóng/mở (Accordion) */
    .menu-group { margin-bottom: 10px; }
    .menu-group summary {
        font-size: 13px; color: rgba(255, 255, 255, 0.9); font-weight: 900; text-transform: uppercase; 
        letter-spacing: 1px; padding: 12px 15px; background: rgba(0, 0, 0, 0.25); border-radius: 6px;
        border-left: 4px solid rgba(255, 255, 255, 0.6); cursor: pointer; display: flex; 
        justify-content: space-between; align-items: center; list-style: none; outline: none; transition: all 0.3s ease;
    }
    .menu-group summary::-webkit-details-marker { display: none; } 
    .menu-group summary:hover { background: rgba(0, 0, 0, 0.4); color: #fff; }
    .menu-group[open] summary { margin-bottom: 10px; border-left-color: #ffdd59; color: #ffdd59; background: rgba(0, 0, 0, 0.35); } 
    .menu-group[open] summary .icon-toggle { transform: rotate(180deg); } 
    .menu-group .icon-toggle { transition: transform 0.3s; font-size: 12px; }
    .menu-items { display: flex; flex-direction: column; gap: 5px; padding: 0 0 0 10px; }

    /* CSS Đếm Số Thứ Tự (STT) tự động cho các bảng dữ liệu */
    #admin-list-hocsinh table { counter-reset: hsCounter; }
    .row-hs:not([style*="display: none"]) { counter-increment: hsCounter; }
    .row-hs:not([style*="display: none"]) .stt-column::before {
        content: counter(hsCounter); display: flex; justify-content: center; align-items: center;
        width: 28px; height: 28px; background: #e9ecef; border-radius: 50%;
        font-weight: bold; color: #495057; font-size: 13px; border: 1px solid #ced4da; margin: 0 auto;
    }

    .table-cauhoi-admin { counter-reset: cauHoiCounter; }
    .row-cauhoi-admin:not([style*="display: none"]) { counter-increment: cauHoiCounter; }
    .row-cauhoi-admin:not([style*="display: none"]) .stt-cauhoi-column::before {
        content: counter(cauHoiCounter); display: flex; justify-content: center; align-items: center;
        width: 28px; height: 28px; background: #e9ecef; border-radius: 50%;
        font-weight: bold; color: #495057; font-size: 13px; border: 1px solid #ced4da; margin: 0 auto;
    }

    #khung-phe-duyet-gv table { counter-reset: gvCounter; }
    .row-gv:not([style*="display: none"]) { counter-increment: gvCounter; }
    .row-gv:not([style*="display: none"]) .stt-gv-column::before {
        content: counter(gvCounter); display: flex; justify-content: center; align-items: center;
        width: 28px; height: 28px; background: #e9ecef; border-radius: 50%;
        font-weight: bold; color: #495057; font-size: 13px; border: 1px solid #ced4da; margin: 0 auto;
    }

    /* CSS Chấm đỏ thông báo (Badge) */
    .badge-notify {
        position: absolute; top: 8px; right: 15px; background: #ff4757; color: white;
        border-radius: 50%; padding: 2px 6px; font-size: 11px; font-weight: 900;
        box-shadow: 0 2px 5px rgba(0,0,0,0.3); border: 2px solid white; line-height: 1;
        animation: pulse-red 2s infinite;
    }
    @keyframes pulse-red {
        0% { box-shadow: 0 0 0 0 rgba(255, 71, 87, 0.7); }
        70% { box-shadow: 0 0 0 6px rgba(255, 71, 87, 0); }
        100% { box-shadow: 0 0 0 0 rgba(255, 71, 87, 0); }
    }
`;
document.head.appendChild(menuStyle);

// ---------------------------------------------------------------------
// 3.2. WIDGET GÓC PHẢI TRÊN (TÀI KHOẢN & ĐĂNG XUẤT)
// ---------------------------------------------------------------------
if (statusText && btnLogout) {
    const wrapperGocPhai = document.createElement('div');
    wrapperGocPhai.style.cssText = "position: fixed; right: 20px; top: 15px; display: flex; align-items: center; gap: 12px; background: #ffffff; padding: 5px 15px; border-radius: 50px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border: 1px solid #e2e8f0; z-index: 9999999;";

    const btnDoiMatKhau = document.createElement('button');
    btnDoiMatKhau.innerHTML = "🔑 Đổi MK";
    btnDoiMatKhau.style.cssText = "background: #ffc107; color: #000; border: none; border-radius: 20px; padding: 5px 12px; font-size: 12px; font-weight: bold; cursor: pointer; display: none;";

    // Xử lý đổi mật khẩu (Sẽ kết nối Supabase ở File 4)
    btnDoiMatKhau.onclick = async () => {
        if (typeof window.xuLyDoiMatKhau === 'function') {
            window.xuLyDoiMatKhau(btnDoiMatKhau);
        } else {
            alert("Chức năng đổi mật khẩu đang được nạp, vui lòng thử lại sau!");
        }
    };

    wrapperGocPhai.appendChild(statusText);
    wrapperGocPhai.appendChild(btnDoiMatKhau);
    wrapperGocPhai.appendChild(btnLogout);
    document.body.appendChild(wrapperGocPhai);

    statusText.style.fontSize = "13px"; statusText.style.fontWeight = "bold";
    btnLogout.style.margin = "0"; btnLogout.style.borderRadius = "20px"; btnLogout.style.fontSize = "12px"; btnLogout.style.padding = "5px 12px";

    // Hàm gọi để hiển thị nút Đổi MK khi đăng nhập thành công
    window.hienThiNutDoiMatKhau = (hienThi) => {
        btnDoiMatKhau.style.display = hienThi ? "inline-block" : "none";
    };
}

// ---------------------------------------------------------------------
// 3.3. DỰNG KHUNG CHÍNH (LAYOUT CONTAINERS)
// ---------------------------------------------------------------------
// Container 3 cột khi Học sinh vào phòng thi
window.mainContainer = document.createElement('div');
window.mainContainer.style.cssText = "display: none; position: fixed; top: 90px; left: 0; width: 100vw; height: calc(100vh - 90px); gap: 20px; background: #e9ecef; z-index: 99999; padding: 20px; box-sizing: border-box; align-items: stretch;";

window.sidebarLeft = document.createElement('div');
window.sidebarLeft.id = 'sidebar-left';
window.sidebarLeft.className = 'thanh-ben-trai';
window.sidebarLeft.style.cssText = "flex: 0 0 260px; background: #fff; padding: 15px; border-radius: 8px; border: 1px solid #dee2e6; height: 100%; overflow-y: auto; box-shadow: 0 4px 10px rgba(0,0,0,0.05); box-sizing: border-box;";
window.sidebarLeft.innerHTML = `
    <div style="background: #0056b3; color: white; padding: 12px; border-radius: 6px; text-align: center; margin-bottom: 15px; margin-top: 10px;">
        <h3 style="margin: 0; font-size: 14px; text-transform: uppercase; font-weight: 900; letter-spacing: 1px;">ℹ️ THÔNG TIN NHIỆM VỤ</h3>
    </div>
    <div id="thong-tin-nhiem-vu-trai" style="font-size: 13px; color: #333; line-height: 1.6;">
        <div style="text-align: center; color: #6c757d; padding: 20px;">Đang trích xuất dữ liệu...</div>
    </div>
`;

if (khungDeThi) {
    khungDeThi.classList.add('phan-de-thi');
    khungDeThi.style.cssText = "flex: 1; background: transparent; height: 100%; overflow-y: auto; padding: 0 15px; box-sizing: border-box;";
}

window.sidebarRight = document.createElement('div');
window.sidebarRight.id = 'sidebar-right';
window.sidebarRight.className = 'thanh-ben-phai';
window.sidebarRight.style.cssText = "flex: 0 0 260px; background: #fff; padding: 15px; border-radius: 8px; border: 1px solid #ddd; height: 100%; overflow-y: auto; box-shadow: 0 4px 10px rgba(0,0,0,0.05); box-sizing: border-box;";

document.body.insertBefore(window.mainContainer, khungDeThi);
window.mainContainer.appendChild(window.sidebarLeft);
window.mainContainer.appendChild(khungDeThi);
window.mainContainer.appendChild(window.sidebarRight);

// Container tổng khi ở ngoài Menu Bảng Điều Khiển
window.dashboardContainer = document.createElement('div');
window.dashboardContainer.id = 'dashboard-container';
window.dashboardContainer.style.cssText = "display: none; width: 100%; max-width: 1400px; margin: 20px auto;";
document.body.insertBefore(window.dashboardContainer, window.mainContainer);

// ---------------------------------------------------------------------
// 3.4. KHAI BÁO 3 BỘ GIAO DIỆN THEO VAI TRÒ
// ---------------------------------------------------------------------
// --- ADMIN UI ---
const UI_ADMIN = {
    menu: `
        <details class="menu-group"><summary><span>👑 HỆ THỐNG ADMIN</span><span class="icon-toggle">▼</span></summary><div class="menu-items">
            <button class="btn-dash active" id="tab-quan-ly-gv" data-target="admin-duyet-gv" style="position: relative;">✅ Phê duyệt Giáo viên</button>
            <button class="btn-dash" data-target="admin-quan-ly-lop">🏫 Quản lý Lớp học</button>
            <button class="btn-dash" id="tab-quan-ly-hs" data-target="admin-quan-ly-hs" style="position: relative;">🎓 Quản lý Học sinh</button> 
            <button class="btn-dash" data-target="admin-quan-ly-cauhoi">❓ Quản lý Câu hỏi</button>
            <button class="btn-dash" data-target="admin-thong-ke">📊 Thống kê chung</button>
        </div></details>
        <details class="menu-group"><summary><span>📚 TÀI NGUYÊN & NHIỆM VỤ</span><span class="icon-toggle">▼</span></summary><div class="menu-items">
            <button class="btn-dash" data-target="admin-kho-hoc-lieu" style="color:#27ae60; font-weight:bold;">📦 KHO HỌC LIỆU</button>
            <button class="btn-dash" data-target="admin-quan-ly-nhiem-vu" style="color:#d35400; font-weight:bold;">🎯 TRẠM GIAO NHIỆM VỤ</button>
        </div></details>
        <details class="menu-group"><summary><span>👨‍🏫 TRẠM GIÁO VIÊN</span><span class="icon-toggle">▼</span></summary><div class="menu-items">
            <button class="btn-dash" data-target="gv-quan-ly-lop">👥 Lớp học của tôi</button>
            <button class="btn-dash" data-target="gv-thong-ke-diem">📊 Thống kê Điểm số</button>
            <button class="btn-dash" data-target="admin-cham-bai">📝 Chấm bài tự luận</button>
            <button class="btn-dash" id="tab-admin-lam-bu" data-target="admin-duyet-lam-bu" style="position: relative;">🔔 Yêu cầu làm bù</button>
            <button class="btn-dash" data-target="gv-to-chuc-thi">🏆 Tổ chức Thi Live</button>
        </div></details>`,
    tabs: `
        <div id="tab-admin-duyet-gv" class="tab-content-dash"><h2 style="color:#c0392b; border-bottom:2px solid #f5c6cb; padding-bottom:10px;">✅ Phê duyệt & Quản lý Giáo viên</h2><input type="text" id="search-gv" placeholder="🔍 Tìm giáo viên..." style="width:100%; padding:12px; margin-bottom:15px; border-radius:6px; border:1px solid #ccc;"><div id="khung-phe-duyet-gv" style="background:#fff; border:1px solid #ddd; border-radius:8px; overflow:hidden;"></div></div>
        <div id="tab-admin-quan-ly-hs" class="tab-content-dash" style="display:none;"><h2 style="color:#c0392b; border-bottom:2px solid #f5c6cb; padding-bottom:10px;">🎓 Quản lý Hồ sơ Học sinh</h2><div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px; background:#e8f4f8; padding:15px; border-radius:6px; border:1px solid #b8daff;"><div><strong style="color:#0056b3; font-size:15px;">⚙️ Chế độ duyệt Học sinh:</strong></div><label style="display:flex; align-items:center; cursor:pointer; background:#fff; padding:8px 15px; border-radius:20px; border:1px solid #ccc;"><input type="checkbox" id="chk-auto-duyet-hs" style="transform:scale(1.4); margin-right:10px;" onchange="window.capNhatAutoDuyetHS(this.checked)"><strong id="text-auto-duyet-hs" style="color:#666;">Đang tải...</strong></label></div><input type="text" id="search-hs" placeholder="🔍 Tìm học sinh..." style="width:100%; padding:11px; margin-bottom:15px; border-radius:6px; border:1px solid #ccc;"><div id="admin-list-hocsinh" style="background:#fff; border:1px solid #ddd; border-radius:8px; overflow:hidden;"></div></div>
        <div id="tab-admin-quan-ly-lop" class="tab-content-dash" style="display:none;"><h2 style="color:#c0392b; border-bottom:2px solid #f5c6cb; padding-bottom:10px;">🏫 Quản lý Lớp học</h2><button id="btn-them-lop-moi" style="padding:10px 20px; background:#c0392b; color:white; border:none; border-radius:6px; cursor:pointer; font-weight:bold; margin-bottom:15px; font-size:15px; box-shadow:0 2px 4px rgba(0,0,0,0.1);">➕ Tạo Lớp Mới</button><div style="display:flex; gap:20px;"><div style="flex:1; border:1px solid #ddd; border-radius:8px; background:#fff; height:500px; display:flex; flex-direction:column;"><div style="padding:15px; background:#f8f9fa; border-bottom:1px solid #ddd; font-weight:bold; color:#495057;">DANH SÁCH LỚP</div><div id="admin-list-lop" style="padding:10px; overflow-y:auto; flex:1;">⏳ Đang tải...</div></div><div style="flex:2; border:1px solid #ddd; border-radius:8px; background:#fff; height:500px; display:flex; flex-direction:column;"><div style="padding:15px; background:#fff5f5; border-bottom:1px solid #f5c6cb; display:flex; justify-content:space-between; align-items:center;"><strong id="title-chi-tiet-lop" style="color:#c0392b; font-size:16px;">Chi tiết lớp: Chưa chọn</strong><button id="btn-gan-hoc-sinh" style="display:none; padding:8px 15px; background:#28a745; color:white; border:none; border-radius:6px; cursor:pointer; font-weight:bold;">👤 Gán Học Sinh Vào Lớp</button></div><div id="admin-chitiet-lop" style="padding:15px; overflow-y:auto; flex:1;">👈 Vui lòng chọn một lớp bên trái để xem danh sách.</div></div></div></div>
        <div id="tab-admin-quan-ly-cauhoi" class="tab-content-dash" style="display:none;"><h2 style="color:#c0392b; border-bottom:2px solid #f5c6cb; padding-bottom:10px;">❓ Ngân hàng Câu hỏi</h2><div id="admin-list-cauhoi"></div></div>
        <div id="tab-admin-thong-ke" class="tab-content-dash" style="display:none;"></div>
        <div id="tab-admin-cham-bai" class="tab-content-dash" style="display:none;"><h2 style="color: #0056b3; border-bottom: 2px solid #b8daff; padding-bottom: 10px; margin-top: 0;">📝 Chấm bài & File nộp</h2><div id="vung-danh-sach-cham-bai">⏳ Tính năng đang phát triển...</div></div>
        <div id="tab-admin-duyet-lam-bu" class="tab-content-dash" style="display:none;"><h2 style="color: #d35400; border-bottom: 2px solid #f9cb9c; padding-bottom: 10px; margin-top: 0;">🔔 Duyệt yêu cầu xin làm bù</h2><div id="vung-danh-sach-xin-lam-bu">⏳ Tính năng đang phát triển...</div></div>
        <div id="tab-gv-quan-ly-lop" class="tab-content-dash" style="display:none;"><h2 style="color:#2c3e50; border-bottom:2px solid #3498db; padding-bottom:10px; margin-top:0;">👥 Lớp học của tôi</h2><div style="display:flex; gap:10px; margin-bottom:15px;"><select id="cbo-lop-gv" style="padding:10px; border-radius:6px; flex:1; font-size:15px;"><option value="">-- Chọn lớp để xem danh sách --</option></select><button style="padding:10px 20px; background:#3498db; color:white; border:none; border-radius:6px; cursor:pointer; font-weight:bold;">Tải lại</button></div><div id="gv-danh-sach-hoc-sinh" style="border:1px dashed #ccc; padding:30px; text-align:center; color:#999; font-size:16px;">Danh sách học sinh lớp sẽ hiện tại đây</div></div>
        <div id="tab-gv-thong-ke-diem" class="tab-content-dash" style="display:none;"><h2 style="color:#2c3e50; border-bottom:2px solid #3498db; padding-bottom:10px; margin-top:0;">📊 Phổ điểm Bài tập & Đề thi</h2><p style="color:#666; font-size:16px;">Tính năng đang phát triển...</p></div>
        <div id="tab-gv-to-chuc-thi" class="tab-content-dash" style="display:none;"><h2 style="color:#d35400; border-bottom:2px solid #f39c12; padding-bottom:10px; margin-top:0;">🏆 Quản lý Phòng Thi Trực Tiếp</h2><p style="color:#666; font-size:16px;">Tính năng đang phát triển...</p></div>
        
        <div id="tab-admin-kho-hoc-lieu" class="tab-content-dash" style="display:none;"><h2 style="color:#27ae60; border-bottom:2px solid #2ecc71; padding-bottom:10px;">📦 KHO HỌC LIỆU BẢN MẪU</h2><div id="admin-list-kho-hoc-lieu"></div></div>
        <div id="tab-admin-quan-ly-nhiem-vu" class="tab-content-dash" style="display:none;"><h2 style="color:#d35400; border-bottom:2px solid #f39c12; padding-bottom:10px;">🎯 TRẠM ĐIỀU PHỐI NHIỆM VỤ</h2><div id="admin-list-nhiem-vu"></div></div>
    `
};

// --- GIÁO VIÊN UI ---
const UI_GIAOVIEN = {
    menu: `
        <div style="font-size: 14px; color: #a2d2ff; text-transform: uppercase; font-weight: 900; margin-bottom: 15px; border-bottom: 2px solid rgba(255,255,255,0.2); padding-bottom: 10px; letter-spacing: 1px;">TRẠM GIÁO VIÊN</div>
        <button class="btn-dash active" data-target="admin-kho-hoc-lieu" style="color:#27ae60; font-weight:bold;">📦 KHO HỌC LIỆU</button>
        <button class="btn-dash" data-target="admin-quan-ly-nhiem-vu" style="color:#d35400; font-weight:bold;">🎯 TRẠM GIAO NHIỆM VỤ</button>
        <button class="btn-dash" data-target="gv-quan-ly-lop">👥 Quản lý Lớp học</button>
        <button class="btn-dash" data-target="gv-thong-ke-diem">📊 Thống kê Điểm số</button>
        <button class="btn-dash" data-target="admin-cham-bai">📝 Chấm bài tự luận</button>
        <button class="btn-dash" id="tab-gv-lam-bu" data-target="admin-duyet-lam-bu" style="position: relative; color: #e74c3c; font-weight: bold;">🔔 Duyệt Làm bù / Thêm lượt</button>
        <button class="btn-dash" data-target="gv-to-chuc-thi">🏆 Tổ chức Thi Live</button>`,
    tabs: UI_ADMIN.tabs
};

// --- HỌC SINH UI ---
const UI_HOCSINH = {
    menu: `
        <div style="font-size: 14px; color: #a8e6cf; text-transform: uppercase; font-weight: 900; margin-bottom: 15px; border-bottom: 2px solid rgba(255,255,255,0.2); padding-bottom: 10px; letter-spacing: 1px;">TRẠM HỌC SINH</div>
        <button class="btn-dash" data-target="hs-phong-thi-live" style="position: relative; overflow: hidden;"><span style="display:inline-block; width:8px; height:8px; background:#ff4757; border-radius:50%; margin-right:5px; box-shadow: 0 0 8px #ff4757;"></span>📡 Phòng Thi Live</button>
        <button class="btn-dash active" id="menu-nhiem-vu" data-target="hs-nhiem-vu" style="position: relative;">🎯 Nhiệm vụ cần làm</button>
        <button class="btn-dash" data-target="hs-vao-thi">📝 Luyện tập tự do</button>
        <button class="btn-dash" data-target="hs-lich-su">📈 Lịch sử làm bài</button>
        <button class="btn-dash" data-target="hs-xep-hang">🏆 Bảng xếp hạng</button>
        
        <button onclick="if(typeof window.thamGiaLopMoi === 'function') window.thamGiaLopMoi();" style="margin-top: 20px; width: 100%; padding: 12px; background: #f1c40f; color: #000; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; display: flex; justify-content: center; align-items: center; gap: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.2);">➕ Tham gia Lớp mới</button>
    `,
    tabs: `
        <div id="tab-hs-phong-thi-live" class="tab-content-dash" style="display:none;"><h2 style="color: #c0392b; border-bottom: 2px solid #f5c6cb; padding-bottom: 10px; margin-top: 0;">📡 Phòng Thi Live (Đồng bộ thời gian thực)</h2><div style="background: #fff3cd; color: #856404; padding: 20px; border-radius: 8px; border: 1px solid #ffe69c; text-align: center; margin-top: 20px;"><h3 style="margin-top: 0;">Hiện tại chưa có ca thi nào đang diễn ra.</h3><p>Vui lòng chờ giáo viên mở phòng thi.</p></div></div>
        <div id="tab-hs-nhiem-vu" class="tab-content-dash"><h2 style="color: #27ae60; border-bottom: 2px solid #2ecc71; padding-bottom: 10px; margin-top: 0;">🎯 Nhiệm vụ được giao</h2><div id="vung-danh-sach-nhiem-vu"><div style="background: #e8f4f8; border: 1px solid #b8daff; border-radius: 8px; padding: 20px; text-align: center; color: #0056b3;">⏳ Đang tải nhiệm vụ...</div></div></div>
        <div id="tab-hs-vao-thi" class="tab-content-dash" style="display:none;"><h2 style="color: #27ae60; border-bottom: 2px solid #2ecc71; padding-bottom: 10px; margin-top: 0;">📝 Luyện tập tự do</h2><div id="hs-khung-chua-the-de">⏳ Đang tải thư viện...</div></div>
        <div id="tab-hs-lich-su" class="tab-content-dash" style="display:none;"><h2 style="color: #27ae60; border-bottom: 2px solid #2ecc71; padding-bottom: 10px; margin-top: 0;">📈 Kết quả luyện tập cá nhân</h2><div id="hs-khung-lich-su">👈 Vui lòng bấm lại nút Lịch sử ở menu để tải dữ liệu.</div></div>
        <div id="tab-hs-xep-hang" class="tab-content-dash" style="display:none;"><h2 style="color: #27ae60; border-bottom: 2px solid #2ecc71; padding-bottom: 10px; margin-top: 0;">🏆 Bảng vàng thành tích</h2><p>Tính năng đang cập nhật...</p></div>`
};

// ---------------------------------------------------------------------
// 3.5. HÀM TỔNG BUILD GIAO DIỆN & GẮN SỰ KIỆN CHUYỂN TAB
// ---------------------------------------------------------------------
window.dungGiaoDienDashboard = (vaiTro, tenHienThi) => {
    let dataUI, bgSidebar, classSidebar, iconRole;
    if (vaiTro === 'admin') { dataUI = UI_ADMIN; bgSidebar = '#c0392b'; classSidebar = 'sidebar-admin'; iconRole = '👑'; }
    else if (vaiTro === 'giaovien') { dataUI = UI_GIAOVIEN; bgSidebar = '#0056b3'; classSidebar = 'sidebar-gv'; iconRole = '👨‍🏫'; }
    else { dataUI = UI_HOCSINH; bgSidebar = '#059669'; classSidebar = 'sidebar-hs'; iconRole = '🎓'; }

    window.dashboardContainer.innerHTML = `
        <div style="display: flex; gap: 20px; height: calc(100vh - 40px);">
            <div class="${classSidebar}" style="flex: 0 0 280px; background: ${bgSidebar}; color: white; border-radius: 8px; padding: 25px 20px; display: flex; flex-direction: column; gap: 5px; box-shadow: 2px 0 10px rgba(0,0,0,0.15);">
                <div style="text-align: center; margin-bottom: 20px;">
                    <div style="width: 60px; height: 60px; background: rgba(255,255,255,0.2); border-radius: 50%; margin: 0 auto 10px auto; display: flex; align-items: center; justify-content: center; font-size: 30px;">${iconRole}</div>
                    <div style="font-weight: 900; font-size: 18px; color: #fff;">${tenHienThi}</div>
                </div>
                ${dataUI.menu}
            </div>
            <div id="tabs-vung-chuc-nang" style="flex: 1; background: #fff; border-radius: 8px; border: 1px solid #dee2e6; padding: 30px; overflow-y: auto; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                ${dataUI.tabs}
            </div>
        </div>
    `;

    // Accordion Logic (Mở 1 menu đóng các menu khác)
    const cacNhomMenu = window.dashboardContainer.querySelectorAll('.menu-group');
    cacNhomMenu.forEach(nhom => {
        nhom.addEventListener('toggle', function () {
            if (this.open) cacNhomMenu.forEach(nk => { if (nk !== this) nk.removeAttribute('open'); });
        });
    });

    // Gọi hàm gắn sự kiện click cho các nút bên trái
    window.ganSuKienChuyenTab();

    // Bật các trình lắng nghe thông báo (Chấm đỏ) tùy theo Vai trò
    if (vaiTro === 'admin') {
        if (typeof window.taiDanhSachGiaoVien === 'function') window.taiDanhSachGiaoVien();
        if (typeof window.langNgheThongBaoChoDuyet === 'function') {
            window.langNgheThongBaoChoDuyet("HocSinh", "tab-quan-ly-gv", "chopheduyet", "giaovien");
            window.langNgheThongBaoChoDuyet("HocSinh", "tab-quan-ly-hs", "chopheduyet", "hocsinh");
        }
        if (typeof window.langNgheYeuCauGiaoVien === 'function') window.langNgheYeuCauGiaoVien();
    } else if (vaiTro === 'giaovien') {
        if (typeof window.langNgheYeuCauGiaoVien === 'function') window.langNgheYeuCauGiaoVien();
    } else if (vaiTro === 'hocsinh') {
        if (typeof window.langNgheNhiemVuHocSinh === 'function') window.langNgheNhiemVuHocSinh();
    }

    // Tự động Click tab mặc định
    setTimeout(() => {
        const nutMacDinh = window.dashboardContainer.querySelector('.btn-dash.active');
        if (nutMacDinh) nutMacDinh.click();
    }, 100);
};

// ---------------------------------------------------------------------
// 3.6. XỬ LÝ CLICK ĐỔI TAB & GỌI HÀM KÉO DATA TƯƠNG ỨNG
// ---------------------------------------------------------------------
window.ganSuKienChuyenTab = () => {
    window.dashboardContainer.querySelectorAll('.btn-dash').forEach(btn => {
        btn.onclick = function () {
            window.dashboardContainer.querySelectorAll('.btn-dash').forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const targetId = 'tab-' + this.getAttribute('data-target');
            window.dashboardContainer.querySelectorAll('.tab-content-dash').forEach(tab => { tab.style.display = 'none'; });
            const targetEl = document.getElementById(targetId);
            if (targetEl) targetEl.style.display = 'block';

            // KÍCH HOẠT HÀM KÉO DỮ LIỆU TỪ SUPABASE (Nằm ở File 4 và 5)
            if (targetId === 'tab-admin-duyet-gv') { if (typeof window.taiDanhSachGiaoVien === 'function') window.taiDanhSachGiaoVien(); }
            else if (targetId === 'tab-admin-quan-ly-hs') { if (typeof window.taiDanhSachHocSinh === 'function') window.taiDanhSachHocSinh(); }
            else if (targetId === 'tab-admin-thong-ke') { if (typeof window.taiThongKeAdmin === 'function') window.taiThongKeAdmin(); }
            else if (targetId === 'tab-admin-quan-ly-lop') { if (typeof window.taiDanhSachLopAdmin === 'function') window.taiDanhSachLopAdmin(); }
            else if (targetId === 'tab-admin-quan-ly-cauhoi') { if (typeof window.taiDanhSachCauHoiAdmin === 'function') window.taiDanhSachCauHoiAdmin(); }

            // CÁC TAB CỦA GIÁO VIÊN
            else if (targetId === 'tab-admin-kho-hoc-lieu') { if (typeof window.taiKhoHocLieu === 'function') window.taiKhoHocLieu(); }
            else if (targetId === 'tab-admin-quan-ly-nhiem-vu') { if (typeof window.taiQuanLyNhiemVu === 'function') window.taiQuanLyNhiemVu(); }
            else if (targetId === 'tab-admin-duyet-lam-bu') { if (typeof window.taiDanhSachYeuCau === 'function') window.taiDanhSachYeuCau(); }

            // CÁC TAB CỦA HỌC SINH
            else if (targetId === 'tab-hs-vao-thi') { if (typeof window.taiTheDeThiLuyenTap === 'function') window.taiTheDeThiLuyenTap(); }
            else if (targetId === 'tab-hs-nhiem-vu') { if (typeof window.hienThiDanhSachNhiemVu === 'function') window.hienThiDanhSachNhiemVu(); }
            else if (targetId === 'tab-hs-lich-su') { if (typeof window.hienThiLichSuCaNhan === 'function') window.hienThiLichSuCaNhan(); }
        };
    });
};

// ---------------------------------------------------------------------
// 3.7. CÁC HÀM VẼ GIAO DIỆN PHÒNG THI (TẠO CỤC HTML)
// ---------------------------------------------------------------------
// Tạo Khối Ô vuông bên mục lục bên phải
window.taoNhomNutSidebar = (tieuDe, danhSachCau, batDauStt) => {
    if (danhSachCau.length === 0) return "";
    let html = `<div style="margin-bottom: 15px;"><h4 style="margin-bottom: 8px; color: #c0392b; font-size: 15px; border-bottom: 1px solid #ddd; padding-bottom: 4px;">${tieuDe}</h4><div style="display: flex; flex-wrap: wrap; gap: 8px;">`;
    danhSachCau.forEach((cau, index) => {
        let stt = batDauStt + index;
        let idCau = cau.maCau || cau.id;
        html += `<a href="#cau-${idCau}" id="btn-nav-${idCau}" style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 48px; height: 48px; background: #fff; border: 1px solid #ced4da; border-radius: 6px; text-decoration: none; color: #495057; font-weight: bold; font-size: 15px; transition: 0.2s;" onmouseover="if(!this.classList.contains('da-lam')) this.style.background='#e9ecef'" onmouseout="if(!this.classList.contains('da-lam')) this.style.background='#fff'"><span style="line-height: 1.1;">${stt}</span><span id="nav-ans-${idCau}" style="font-size: 12px; font-weight: bold; color: #888; margin-top: 2px; min-height: 14px;"></span></a>`;
    });
    return html + `</div></div>`;
};

// Tạo Khối Trắc nghiệm/Tự luận của từng Câu Hỏi
window.taoGiaoDienCauHoi = (data, stt, loaiCau) => {
    const maCau = data.maCau || data.id; const idDang = data.idDang || "";
    let cauDan = typeof dichLaTeX === 'function' ? dichLaTeX(data.cauDan || "") : data.cauDan;
    let paA = typeof dichLaTeX === 'function' ? dichLaTeX(data.paA || "") : data.paA;
    let paB = typeof dichLaTeX === 'function' ? dichLaTeX(data.paB || "") : data.paB;
    let paC = typeof dichLaTeX === 'function' ? dichLaTeX(data.paC || "") : data.paC;
    let paD = typeof dichLaTeX === 'function' ? dichLaTeX(data.paD || "") : data.paD;
    const tenDe = data.tenDe || "Đề chung";

    let vungTraLoiHTML = "";

    if (loaiCau === "TN") {
        const labelStyle = "cursor: pointer; margin-bottom: 12px; padding: 12px 15px; background: #f8f9fa; border: 1px solid #ddd; border-radius: 6px; display: block; transition: 0.2s;";
        vungTraLoiHTML = `<div id="ds-${maCau}">`;
        const nhanHienThi = ['A', 'B', 'C', 'D'];
        const mangPhuongAn = data.dsTron || [{ idGoc: 'A', text: paA }, { idGoc: 'B', text: paB }, { idGoc: 'C', text: paC }, { idGoc: 'D', text: paD }];
        mangPhuongAn.forEach((pa, idx) => {
            vungTraLoiHTML += `<label class="lua-chon-tn" data-id="${maCau}" data-chon="${pa.idGoc}" style="${labelStyle}"><div style="display: flex; align-items: flex-start; gap: 10px;"><input type="radio" name="tn-${maCau}" value="${pa.idGoc}" style="transform: scale(1.3); margin-top: 4px; cursor: pointer;"> <div style="flex: 1; font-size: 17px;"><strong>${nhanHienThi[idx]}.</strong> ${pa.text}</div></div></label>`;
        });
        vungTraLoiHTML += `</div>`;
    }
    else if (loaiCau === "DS") {
        const itemStyle = "margin-bottom: 12px; padding: 12px 15px; background: #f8f9fa; border: 1px solid #eee; border-radius: 6px; display: flex; justify-content: space-between; align-items: center; transition: 0.3s;";
        const radioStyle = "cursor: pointer; display: flex; align-items: center; gap: 5px; font-weight: bold; font-size: 15px;";
        const taoDongDS = (y, noiDung) => `<div class="dong-ds" style="${itemStyle}"><div style="flex: 1; padding-right: 20px;"><strong>${y})</strong> ${noiDung}</div><div style="display: flex; gap: 20px; flex-shrink: 0; background: #fff; padding: 8px 15px; border-radius: 20px; border: 1px solid #ced4da; box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);"><label style="${radioStyle} color: #28a745;"><input type="radio" name="ds-${maCau}-${y}" value="T" style="transform: scale(1.3); cursor: pointer;"> Đúng</label><label style="${radioStyle} color: #dc3545;"><input type="radio" name="ds-${maCau}-${y}" value="F" style="transform: scale(1.3); cursor: pointer;"> Sai</label></div></div>`;
        vungTraLoiHTML = `<div style="font-weight: bold; color: #d35400; margin-bottom: 15px;">✅ Các phát biểu sau đây Đúng hay Sai?</div><div class="cau-ds" id="ds-${maCau}">${taoDongDS('a', paA)}${taoDongDS('b', paB)}${taoDongDS('c', paC)}${taoDongDS('d', paD)}</div>`;
    }
    else if (loaiCau === "TLN") {
        const inputStyle = "width: 55px; height: 60px; text-align: center; font-size: 26px; font-weight: bold; border: 2px solid #0056b3; border-radius: 8px; color: #000080; outline: none; background: #fff; box-shadow: 0 2px 4px rgba(0,0,0,0.05); text-transform: uppercase;";
        const autoJumpScript = "oninput=\"if(this.value) this.nextElementSibling?.focus()\" onkeydown=\"if(event.key === 'Backspace' && !this.value) this.previousElementSibling?.focus()\"";
        vungTraLoiHTML = `<div class="cau-tln-container" style="margin-top: 15px; padding: 25px; background: #e8f4f8; border-radius: 8px; border: 1px dashed #b8daff; text-align: center; transition: 0.3s;"><label style="font-weight: bold; color: #0056b3; font-size: 16px; margin-bottom: 15px; display: block;">✏️ Điền đáp án của bạn vào 4 ô trống:</label><div class="tln-inputs" style="display: flex; justify-content: center; gap: 12px;"><input type="text" maxlength="1" style="${inputStyle}" ${autoJumpScript}><input type="text" maxlength="1" style="${inputStyle}" ${autoJumpScript}><input type="text" maxlength="1" style="${inputStyle}" ${autoJumpScript}><input type="text" maxlength="1" style="${inputStyle}" ${autoJumpScript}></div><div style="font-size: 12px; color: #6c757d; margin-top: 15px;">(Mỗi ô điền 1 ký tự, bao gồm cả dấu "-" hoặc ",")</div></div>`;
    }
    else if (loaiCau === "TL") {
        vungTraLoiHTML = `<div style="margin-top: 15px; padding: 15px; background: #fff3cd; border-radius: 6px; border: 1px dashed #ffe69c;"><strong style="color: #856404;">📝 Câu Tự Luận:</strong> Học sinh trình bày bài giải ra giấy.</div>`;
    }

    return `
        <div id="cau-${maCau}" data-loaicau="${loaiCau}" class="cau-hoi" style="margin-bottom: 30px; padding: 25px; border: 1px solid #ccc; border-radius: 8px; background: #fff; box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
            <p style="color: #0056b3; margin-top: 0; font-size: 18px; display: flex; justify-content: space-between; border-bottom: 1px solid #eee; padding-bottom: 10px;">
                <span style="display: flex; align-items: baseline; gap: 8px;"><strong style="font-weight: 900; color: #000080;">(${loaiCau}) Câu ${stt}:</strong><span style="font-size: 14px; color: #6c757d; font-weight: normal;">[${maCau}]</span></span>
                <span style="font-size: 14px; color: #0056b3; text-align: right;"><strong>${tenDe}</strong><br><span style="font-size: 13px; color: #6c757d;">ID Dạng: ${idDang}</span></span>
            </p>
            <div style="font-size: 17px; line-height: 1.6; margin-bottom: 20px; margin-top: 15px; overflow-x: auto;">${cauDan}</div>
            ${vungTraLoiHTML}
            <div id="vung-loi-giai-${maCau}"></div> 
        </div>`;
};
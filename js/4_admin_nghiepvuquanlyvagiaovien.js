// =====================================================================
// 🧠 KHỐI 4: LÕI NGHIỆP VỤ - QUẢN LÝ TÀI KHOẢN, LỚP HỌC & NHIỆM VỤ
// =====================================================================

// ---------------------------------------------------------------------
// 4.1. TRẠM GÁC XÁC THỰC TÀI KHOẢN (SUPABASE AUTH STATE CHANGE)
// ---------------------------------------------------------------------
window.supabaseClient.auth.onAuthStateChange(async (event, session) => {
    // Khai báo rõ ràng các thành phần giao diện để không bị vấp lỗi
    const uiKhungDangNhap = document.getElementById('khung-dang-nhap');
    const uiBtnLogout = document.getElementById('btnLogout');
    const uiStatusText = document.getElementById('status');
    const uiKhungDeThi = document.getElementById('khung-de-thi');

    const user = session?.user;

    if (user) {
        // Đã đăng nhập
        if (uiKhungDangNhap) uiKhungDangNhap.style.display = 'none';
        if (uiBtnLogout) uiBtnLogout.style.display = 'inline-block';
        if (uiStatusText) {
            uiStatusText.style.display = 'inline-block';
            uiStatusText.innerText = "⏳ Đang xác thực phân quyền...";
        }
        if (typeof window.hienThiNutDoiMatKhau === 'function') window.hienThiNutDoiMatKhau(true);

        try {
            // Lấy hồ sơ tài khoản từ bảng HocSinh
            const { data: userData, error } = await window.supabaseClient
                .from("HocSinh")
                .select("*")
                .eq("uid", user.id)
                .single();

            // Nếu mất hồ sơ do Admin xóa
            if (error || !userData) {
                alert("🔄 Hồ sơ của bạn không tồn tại. Vui lòng đăng ký lại!");
                await window.supabaseClient.auth.signOut();
                return;
            }

            let vaiTro = userData.vaiTro || "hocsinh";
            let trangThai = userData.trangThai || "dapheduyet";
            let tenNguoiDung = (userData.ten && userData.sdt) ? `${userData.ten} (${userData.sdt})` : (userData.ten || user.email);

            // Kiểm duyệt trạng thái khóa/chờ duyệt
            if (trangThai === "chopheduyet") {
                await window.supabaseClient.auth.signOut();
                const msg = (vaiTro === "giaovien")
                    ? "⏳ Tài khoản Giáo viên của bạn đang chờ Admin phê duyệt."
                    : "🔒 Tài khoản của bạn hiện đang chờ duyệt hoặc bị khóa!";
                alert(msg);
                return;
            }

            // Vượt qua trạm gác -> Vẽ Dashboard
            if (window.mainContainer) window.mainContainer.style.display = 'none';
            if (uiKhungDeThi) uiKhungDeThi.style.display = 'none';
            if (window.dashboardContainer) window.dashboardContainer.style.display = 'block';

            if (vaiTro === "hocsinh") {
                if (uiStatusText) {
                    uiStatusText.innerHTML = `🎓 Học sinh: <strong>${tenNguoiDung}</strong>`;
                    uiStatusText.style.color = "#059669";
                }
                window.dungGiaoDienDashboard(vaiTro, tenNguoiDung);
            } else if (vaiTro === "giaovien" || vaiTro === "admin") {
                if (uiStatusText) {
                    uiStatusText.innerHTML = `👨‍🏫 ${vaiTro === "admin" ? "Admin" : "Giáo viên"}: <strong>${tenNguoiDung}</strong>`;
                    uiStatusText.style.color = (vaiTro === "admin") ? "#c0392b" : "#0056b3";
                }
                window.dungGiaoDienDashboard(vaiTro, tenNguoiDung);
            }

        } catch (error) {
            console.error("Lỗi phân quyền:", error);
            if (uiStatusText) uiStatusText.innerText = "❌ Lỗi xác thực quyền truy cập!";
        }
    } else {
        // Chưa đăng nhập
        if (uiKhungDangNhap) uiKhungDangNhap.style.display = 'block';
        if (window.mainContainer) window.mainContainer.style.display = 'none';
        if (uiKhungDeThi) uiKhungDeThi.style.display = 'none';
        if (window.dashboardContainer) window.dashboardContainer.style.display = 'none';
        if (uiBtnLogout) uiBtnLogout.style.display = 'none';
        if (uiStatusText) uiStatusText.style.display = 'none';
        if (typeof window.hienThiNutDoiMatKhau === 'function') window.hienThiNutDoiMatKhau(false);

        // Trả lại trạng thái nút Đăng nhập ở File 1 (Nếu nó bị kẹt)
        const btnSubmitAuth = document.getElementById('btnSubmitAuth');
        if (btnSubmitAuth) {
            btnSubmitAuth.innerText = "ĐĂNG NHẬP";
            btnSubmitAuth.disabled = false;
        }
    }
});

// Hàm hỗ trợ đổi mật khẩu bằng Supabase
window.xuLyDoiMatKhau = async (btnDoiMatKhau) => {
    const matKhauMoi = prompt("🔒 NHẬP MẬT KHẨU MỚI (Ít nhất 6 ký tự):");
    if (!matKhauMoi) return;
    if (matKhauMoi.length < 6) { alert("❌ Lỗi: Mật khẩu quá ngắn!"); return; }
    if (!confirm(`Bạn có chắc chắn đổi mật khẩu thành: [ ${matKhauMoi} ] không?`)) return;

    btnDoiMatKhau.innerText = "⏳...";
    btnDoiMatKhau.disabled = true;
    try {
        const { error: authErr } = await window.supabaseClient.auth.updateUser({ password: matKhauMoi });
        if (authErr) throw authErr;

        // Lấy ID user hiện tại
        const { data: { user } } = await window.supabaseClient.auth.getUser();

        // Cập nhật mk hiển thị trong bảng HocSinh (nếu thầy vẫn muốn lưu text thường để quản lý)
        await window.supabaseClient.from("HocSinh").update({ matKhau: matKhauMoi }).eq("uid", user.id);

        alert("✅ ĐỔI MẬT KHẨU THÀNH CÔNG!\nVui lòng đăng nhập lại.");
        await window.supabaseClient.auth.signOut();
    } catch (error) {
        alert("❌ Lỗi đổi mật khẩu: " + error.message);
        btnDoiMatKhau.innerHTML = "🔑 Đổi MK";
        btnDoiMatKhau.disabled = false;
    }
};

// ---------------------------------------------------------------------
// 4.2. QUẢN LÝ LỚP HỌC (THAY THẾ FIREBASE BẰNG SUPABASE)
// ---------------------------------------------------------------------
window.taiDanhSachLopAdmin = async () => {
    const khungList = document.getElementById('admin-list-lop');
    if (!khungList) return;

    const btnThem = document.getElementById('btn-them-lop-moi');
    if (btnThem) {
        btnThem.onclick = async () => {
            const ten = prompt("📝 Nhập tên lớp mới (VD: Toán 12A1 - Thầy Chính):");
            if (!ten || ten.trim() === "") return;

            const maLopMoi = taoMaNgauNhien(4);
            btnThem.innerText = "⏳ Đang tạo...";

            try {
                const { error } = await window.supabaseClient.from("LopHoc").insert([{
                    maLop: maLopMoi,
                    tenLop: ten.trim(),
                    hocSinhIds: [],
                    giaoVienIds: []
                }]);
                if (error) throw error;

                alert(`✅ Đã tạo lớp thành công!\n🏫 Tên lớp: ${ten.trim()}\n🔑 Mã lớp: ${maLopMoi}`);
                btnThem.innerText = "➕ Tạo Lớp Mới";
                taiDanhSachLopAdmin();
            } catch (err) {
                alert("Lỗi khi tạo lớp: " + err.message);
                btnThem.innerText = "➕ Tạo Lớp Mới";
            }
        };
    }

    khungList.innerHTML = `<div style="text-align:center; color:#999; padding:20px;">⏳ Đang tải...</div>`;

    try {
        const { data: dsLop, error } = await window.supabaseClient.from("LopHoc").select("*");
        if (error) throw error;

        if (!dsLop || dsLop.length === 0) {
            khungList.innerHTML = `<div style="text-align:center; color:#d35400; padding:20px; font-weight:bold;">Chưa có lớp nào.<br>Bấm "Tạo Lớp Mới" ở trên.</div>`;
            return;
        }

        dsLop.sort((a, b) => (a.tenLop || "").localeCompare(b.tenLop || ""));

        let html = `<div style="display:flex; flex-direction:column; gap:8px;">`;
        dsLop.forEach((l, index) => {
            const stt = index + 1;
            const soHS = l.hocSinhIds ? l.hocSinhIds.length : 0;
            const bg = (window.lopHocDangChon === l.maLop) ? '#fff5f5' : '#fff';
            const border = (window.lopHocDangChon === l.maLop) ? '#c0392b' : '#eee';

            html += `
                <div style="padding: 12px; background: ${bg}; border: 1px solid ${border}; border-radius: 6px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; transition: 0.2s;" onclick="xemChiTietLopAdmin('${l.maLop}', '${l.tenLop}')">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div style="width: 28px; height: 28px; background: #e9ecef; border-radius: 50%; display: flex; justify-content: center; align-items: center; font-weight: bold; color: #495057; font-size: 13px; border: 1px solid #ced4da; flex-shrink: 0;">${stt}</div>
                        <div>
                            <strong style="color: #c0392b; font-size: 15px;">${l.tenLop}</strong><br>
                            <div style="display: flex; gap: 8px; margin-top: 4px;">
                                <span style="font-size: 12px; color: #0056b3; background: #e8f4f8; padding: 2px 8px; border-radius: 10px; font-weight: bold; border: 1px solid #b8daff;">Mã: ${l.maLop}</span>
                                <span style="font-size: 12px; color: #666; background: #e9ecef; padding: 2px 8px; border-radius: 10px; border: 1px solid #ddd;">Sĩ số: ${soHS}</span>
                            </div>
                        </div>
                    </div>
                    <div><button onclick="xoaLopHoc(event, '${l.maLop}', '${l.tenLop}')" style="background:#dc3545; color:white; border:none; padding:6px 10px; border-radius:4px; font-size: 12px; cursor: pointer; font-weight:bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">Xóa</button></div>
                </div>`;
        });
        html += `</div>`;
        khungList.innerHTML = html;
    } catch (e) { khungList.innerHTML = "Lỗi: " + e.message; }
};

window.xemChiTietLopAdmin = async (idLop, tenLop) => {
    window.lopHocDangChon = idLop;
    taiDanhSachLopAdmin();

    document.getElementById('title-chi-tiet-lop').innerText = `🏫 Lớp: ${tenLop}`;
    document.getElementById('btn-gan-hoc-sinh').style.display = 'block';
    const khungChiTiet = document.getElementById('admin-chitiet-lop');
    khungChiTiet.innerHTML = `<div style="text-align:center; color:#999; padding:20px;">⏳ Đang lấy danh sách học sinh...</div>`;

    try {
        const { data: lopDoc } = await window.supabaseClient.from("LopHoc").select("*").eq("maLop", idLop).single();
        const hocSinhIds = (lopDoc && lopDoc.hocSinhIds) ? lopDoc.hocSinhIds : [];

        if (hocSinhIds.length === 0) {
            khungChiTiet.innerHTML = `<div style="text-align:center; color:#d35400; padding:20px; font-weight:bold;">Lớp này chưa có học sinh nào. <br>Bấm "Gán Học Sinh" để thêm.</div>`;
            return;
        }

        // Lấy thông tin các học sinh bằng toán tử "in" của Supabase
        const { data: dsHocSinhTrongLop, error } = await window.supabaseClient
            .from("HocSinh")
            .select("*")
            .in("uid", hocSinhIds);

        if (error) throw error;

        dsHocSinhTrongLop.sort((a, b) => (a.ten || "").localeCompare(b.ten || "", 'vi'));

        let html = `<table style="width:100%; border-collapse: collapse; font-size:13px; text-align:left; white-space: nowrap;">
            <tr style="background:#f8f9fa; border-bottom:2px solid #ddd;">
                <th style="padding:10px; text-align:center; width:50px;">STT</th>
                <th style="padding:10px;">Học sinh / SĐT</th>
                <th style="padding:10px;">Khối</th><th style="padding:10px;">Trường</th>
                <th style="padding:10px; text-align:center;">Hành động</th>
            </tr>`;

        dsHocSinhTrongLop.forEach((data, index) => {
            html += `<tr style="border-bottom:1px solid #eee;">
                <td style="padding:10px; text-align:center;"><div style="width: 28px; height: 28px; background: #e9ecef; border-radius: 50%; display: flex; justify-content: center; align-items: center; font-weight: bold; color: #495057; font-size: 13px; border: 1px solid #ced4da; margin: 0 auto;">${index + 1}</div></td>
                <td style="padding:10px;"><strong style="color:#0056b3; font-size:14px;">${data.ten || 'Chưa tên'}</strong><br><span style="color:#666; font-size:12px;">📞 ${data.sdt || '---'}</span></td>
                <td style="padding:10px; font-weight:bold; color:#2c3e50;">${data.khoiLop || '---'}</td>
                <td style="padding:10px; color:#00796b;">${data.truong || '---'}</td>
                <td style="padding:10px; text-align:center;"><button onclick="goHocSinhKhoiLop('${idLop}', '${data.uid}', '${data.ten}')" style="background:#f39c12; color:white; border:none; padding:6px 12px; border-radius:6px; cursor:pointer; font-weight:bold; font-size:12px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">Xóa khỏi lớp</button></td>
            </tr>`;
        });
        html += `</table>`;
        khungChiTiet.innerHTML = `<div style="overflow-x: auto;">${html}</div>`;

    } catch (e) { khungChiTiet.innerHTML = "Lỗi: " + e.message; }
};

window.xoaLopHoc = async (e, id, ten) => {
    e.stopPropagation();
    if (!confirm(`⚠️ XÓA LỚP: ${ten}?\nMọi dữ liệu gán học sinh của lớp này sẽ biến mất. Tài khoản học sinh KHÔNG bị xóa.`)) return;
    await window.supabaseClient.from("LopHoc").delete().eq("maLop", id);

    if (window.lopHocDangChon === id) {
        document.getElementById('admin-chitiet-lop').innerHTML = "👈 Vui lòng chọn một lớp bên trái để xem danh sách.";
        document.getElementById('title-chi-tiet-lop').innerText = "Chi tiết lớp: Chưa chọn";
        document.getElementById('btn-gan-hoc-sinh').style.display = 'none';
        window.lopHocDangChon = null;
    }
    taiDanhSachLopAdmin();
};

window.goHocSinhKhoiLop = async (idLop, idHocSinh, ten) => {
    if (!confirm(`Bạn muốn gỡ học sinh ${ten} khỏi lớp này?`)) return;

    // Thuật toán: Lấy mảng hiện tại -> Cắt ID -> Cập nhật lại mảng (thay cho arrayRemove của Firebase)
    const { data: lopDoc } = await window.supabaseClient.from("LopHoc").select("hocSinhIds").eq("maLop", idLop).single();
    const { data: hsDoc } = await window.supabaseClient.from("HocSinh").select("danhSachMaLop").eq("uid", idHocSinh).single();

    let idsLopMoi = (lopDoc.hocSinhIds || []).filter(i => i !== idHocSinh);
    let idsHocSinhMoi = (hsDoc.danhSachMaLop || []).filter(i => i !== idLop);

    // Cập nhật song song bằng Promise.all thay cho Batch
    await Promise.all([
        window.supabaseClient.from("LopHoc").update({ hocSinhIds: idsLopMoi }).eq("maLop", idLop),
        window.supabaseClient.from("HocSinh").update({ danhSachMaLop: idsHocSinhMoi }).eq("uid", idHocSinh)
    ]);

    const tenLop = document.getElementById('title-chi-tiet-lop').innerText.replace("🏫 Lớp: ", "");
    xemChiTietLopAdmin(idLop, tenLop);
};

// ---------------------------------------------------------------------
// 4.3. QUẢN LÝ TÀI KHOẢN (DUYỆT, KHÓA, XÓA)
// ---------------------------------------------------------------------
window.taiDanhSachGiaoVien = async () => {
    const khungDisplay = document.getElementById('khung-phe-duyet-gv');
    if (!khungDisplay) return;
    khungDisplay.innerHTML = `<div style="padding: 20px; text-align: center; color: #999;">⏳ Đang tải danh sách giáo viên...</div>`;

    try {
        const { data: dsGiaoVien, error } = await window.supabaseClient.from("HocSinh").select("*").eq("vaiTro", "giaovien");
        if (error) throw error;

        if (!dsGiaoVien || dsGiaoVien.length === 0) {
            khungDisplay.innerHTML = `<div style="padding: 40px; text-align: center; color: #28a745; font-weight: bold;">🎉 Không có dữ liệu giáo viên.</div>`; return;
        }

        dsGiaoVien.sort((a, b) => (a.ten || "").localeCompare(b.ten || "", 'vi'));

        let tableHtml = `<table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 14px;">
            <thead><tr style="background: #f8f9fa; border-bottom: 2px solid #dee2e6;"><th style="padding: 15px; text-align: center; width: 60px;">STT</th><th style="padding: 15px;">Họ tên / SĐT</th><th style="padding: 15px;">Tỉnh/TP</th><th style="padding: 15px;">Mật khẩu</th><th style="padding: 15px;">Trạng thái</th><th style="padding: 15px; text-align: center;">Hành động</th></tr></thead><tbody id="tbody-giao-vien">`;

        dsGiaoVien.forEach(data => {
            const trangThai = data.trangThai || "chopheduyet";
            const mauTrangThai = (trangThai === "dapheduyet") ? "#28a745" : "#f39c12";
            const tenTrangThai = (trangThai === "dapheduyet") ? "✅ Đã duyệt" : "⏳ Chờ duyệt";
            const searchTag = `${data.ten} ${data.sdt} ${data.tinh}`.toLowerCase();

            tableHtml += `
                <tr class="row-gv" data-search="${searchTag}" style="border-bottom: 1px solid #eee;">
                    <td class="stt-gv-column" style="padding: 15px; text-align: center; font-weight: bold; color: #666;"></td>
                    <td style="padding: 15px;"><strong style="color:#c0392b;">${data.ten || "Chưa tên"}</strong><br><span style="color: #666; font-size: 12px;">📞 ${data.sdt}</span></td>
                    <td style="padding: 15px; color: #0056b3; font-weight: bold;">${data.tinh || "Chưa cập nhật"}</td>
                    <td style="padding: 15px;"><code style="background:#fff5f5; padding:4px 8px; border-radius:4px; color:#c0392b; font-weight:bold; border: 1px solid #fed7d7;">${data.matKhau || '******'}</code></td>
                    <td style="padding: 15px; font-weight: bold; color: ${mauTrangThai}; font-size: 13px;">${tenTrangThai}</td>
                    <td style="padding: 15px; text-align: center;">
                        ${trangThai === "chopheduyet" ? `<button class="btn-duyet-gv" data-uid="${data.uid}" style="background: #28a745; color: white; border: none; padding: 8px 15px; border-radius: 6px; cursor: pointer; font-weight: bold; margin-right: 5px;">✅ Phê duyệt</button>` : `<button class="btn-khoa-gv" data-uid="${data.uid}" data-name="${data.ten}" style="background: #f39c12; color: white; border: none; padding: 8px 15px; border-radius: 6px; cursor: pointer; font-weight: bold; margin-right: 5px;">🔒 Khóa</button>`}
                        <button class="btn-xoa-gv" data-uid="${data.uid}" data-name="${data.ten}" style="background: #dc3545; color: white; border: none; padding: 8px 15px; border-radius: 6px; cursor: pointer; font-weight: bold;">❌ Xóa</button>
                    </td>
                </tr>`;
        });
        tableHtml += `</tbody></table>`;
        khungDisplay.innerHTML = tableHtml;

        const inputTimKiem = document.getElementById('search-gv');
        if (inputTimKiem) {
            inputTimKiem.oninput = function () {
                const tuKhoa = this.value.toLowerCase().trim();
                document.querySelectorAll('.row-gv').forEach(row => {
                    row.style.display = row.getAttribute('data-search').includes(tuKhoa) ? 'table-row' : 'none';
                });
            };
        }
        window.ganSuKienAdmin();
    } catch (err) { khungDisplay.innerHTML = `<div style="padding: 20px; color: red;">Lỗi: ${err.message}</div>`; }
};

window.taiDanhSachHocSinh = async () => {
    const khungDS = document.getElementById('admin-list-hocsinh');
    if (!khungDS) return;
    khungDS.innerHTML = `<div style="padding: 20px; text-align: center; color: #999;">⏳ Đang đồng bộ danh sách lớp và học sinh...</div>`;

    try {
        // Tải danh bạ Lớp để lấy Tên Lớp
        const { data: snapLop } = await window.supabaseClient.from("LopHoc").select("*");
        let tuDienLop = {};
        if (snapLop) snapLop.forEach(lop => { tuDienLop[lop.maLop] = lop.tenLop; });

        // Tải danh sách Học sinh
        const { data: dsHocSinh, error } = await window.supabaseClient.from("HocSinh").select("*").eq("vaiTro", "hocsinh");
        if (error) throw error;

        if (!dsHocSinh || dsHocSinh.length === 0) {
            khungDS.innerHTML = `<div style="padding: 40px; text-align: center; color: #d35400; font-weight: bold;">Chưa có học sinh nào đăng ký.</div>`; return;
        }

        dsHocSinh.sort((a, b) => (a.ten || "").localeCompare(b.ten || "", 'vi'));

        let tableHtml = `<table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 13px;">
            <thead><tr style="background: #f8f9fa; border-bottom: 2px solid #dee2e6;"><th style="padding: 12px; text-align: center; width: 5%;">STT</th><th style="padding: 12px; width: 23%;">Học sinh / SĐT</th> <th style="padding: 12px; width: 13%;">Khối - Trường</th><th style="padding: 12px; width: 8%;">Tỉnh/TP</th><th style="padding: 12px; width: 9%;">Mật khẩu</th><th style="padding: 12px; width: 8%;">Trạng thái</th><th style="padding: 12px; text-align: center; color: #0056b3; width: 20%;">Thuộc Lớp</th><th style="padding: 12px; text-align: center; width: 18%;">Hành động</th></tr></thead><tbody>`;

        dsHocSinh.forEach((data, index) => {
            const uid = data.uid;
            const stt = index + 1;
            const trangThai = data.trangThai || "dapheduyet";

            let dsMaLop = data.danhSachMaLop || [];

            let htmlLopHS = dsMaLop.length > 0
                ? dsMaLop.map(ma => {
                    const tenLop = tuDienLop[ma];
                    return `<span style="display:inline-block; background:${tenLop ? "#e3f2fd" : "#fff5f5"}; color:${tenLop ? "#1976d2" : "#c0392b"}; border:1px solid #bbdefb; padding:2px 8px; border-radius:4px; font-size:11px; font-weight:bold; margin:2px;">${ma} (${tenLop || 'Mã lạ'})</span>`;
                }).join("")
                : `<span style="color:#999; font-style:italic;">Trống mã lớp</span>`;

            let btnDuyetKhoa = (trangThai === "dapheduyet")
                ? `<button onclick="thayDoiTrangThaiHS('${uid}', 'khoa', '${data.ten || 'Học sinh'}')" style="background:#fd7e14; color:white; border:none; padding:6px 8px; border-radius:4px; cursor:pointer; font-size:11px; font-weight:bold;">🔒 Khóa</button>`
                : `<button onclick="thayDoiTrangThaiHS('${uid}', 'duyet', '${data.ten || 'Học sinh'}')" style="background:#28a745; color:white; border:none; padding:6px 8px; border-radius:4px; cursor:pointer; font-size:11px; font-weight:bold;">✅ Duyệt</button>`;

            tableHtml += `
                <tr class="row-hs" data-search="${(data.ten + ' ' + data.sdt + ' ' + dsMaLop.join(' ')).toLowerCase()}" style="border-bottom: 1px solid #eee;">
                    <td style="padding: 12px; text-align: center;"><span style="display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 50%; background: #e3f2fd; color: #1976d2; font-weight: bold; font-size: 12px; border: 1px solid #bbdefb;">${stt}</span></td>
                    <td style="padding: 12px;"><strong style="color:#0056b3; font-size: 14px;">${data.ten || "Chưa tên"}</strong><br><span style="color: #555; font-size: 12px;">📞 ${data.sdt}</span></td>
                    <td style="padding: 12px;"><span style="color:#2c3e50; font-weight:bold;">K.${data.khoiLop || ""}</span><br><small style="color:#666;">${data.truong || ""}</small></td>
                    <td style="padding: 12px; color: #6c757d;">${data.tinh || ""}</td>
                    <td style="padding: 12px;"><code style="background:#f3f0ff; padding:3px 6px; border-radius:4px; color:#6741d9;">${data.matKhau || '******'}</code></td>
                    <td style="padding: 12px; font-weight: bold; color: ${(trangThai === "dapheduyet") ? "#28a745" : "#dc3545"};">${(trangThai === "dapheduyet") ? "Đang mở" : "Chờ duyệt"}</td>
                    <td style="padding: 13px; text-align: center;">${htmlLopHS}</td>
                    <td style="padding: 12px; text-align: center;">
                        <div style="display:flex; gap:4px; justify-content:center;">
                            <button class="btn-lich-su-hs" data-uid="${uid}" style="background: #17a2b8; color: white; border: none; padding: 6px 8px; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: bold;">📊 Lịch sử</button>
                            ${btnDuyetKhoa} 
                            <button class="btn-xoa-hs" data-uid="${uid}" data-name="${data.ten}" style="background: #dc3545; color: white; border: none; padding: 6px 8px; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: bold;">❌ Xóa</button>
                        </div>
                    </td>
                </tr>`;
        });
        tableHtml += `</tbody></table>`;
        khungDS.innerHTML = tableHtml;

        const inputTimKiem = document.getElementById('search-hs');
        if (inputTimKiem) {
            inputTimKiem.oninput = function () {
                const tuKhoa = this.value.toLowerCase().trim();
                document.querySelectorAll('.row-hs').forEach(row => { row.style.display = row.getAttribute('data-search').includes(tuKhoa) ? 'table-row' : 'none'; });
            };
        }
        window.ganSuKienAdmin();
    } catch (err) { khungDS.innerHTML = `<div style="padding: 20px; color: red;">Lỗi tải dữ liệu: ${err.message}</div>`; }
};

window.ganSuKienAdmin = () => {
    // Giáo viên
    document.querySelectorAll('.btn-duyet-gv').forEach(btn => {
        btn.onclick = async () => {
            btn.innerText = "⏳...";
            await window.supabaseClient.from("HocSinh").update({ trangThai: "dapheduyet" }).eq("uid", btn.getAttribute('data-uid'));
            taiDanhSachGiaoVien();
        };
    });
    document.querySelectorAll('.btn-khoa-gv').forEach(btn => {
        btn.onclick = async () => {
            if (confirm(`Khóa tài khoản của giáo viên: ${btn.getAttribute('data-name')}?`)) {
                btn.innerText = "⏳...";
                await window.supabaseClient.from("HocSinh").update({ trangThai: "chopheduyet" }).eq("uid", btn.getAttribute('data-uid'));
                taiDanhSachGiaoVien();
            }
        };
    });
    document.querySelectorAll('.btn-xoa-gv').forEach(btn => {
        btn.onclick = async () => {
            if (confirm(`⚠️ CẢNH BÁO: XÓA VĨNH VIỄN hồ sơ giáo viên ${btn.getAttribute('data-name')}?`)) {
                btn.innerText = "Đang xóa...";
                await window.supabaseClient.from("HocSinh").delete().eq("uid", btn.getAttribute('data-uid'));
                taiDanhSachGiaoVien();
            }
        };
    });

    // Học sinh
    document.querySelectorAll('.btn-xoa-hs').forEach(btn => {
        btn.onclick = async () => {
            if (!confirm(`⚠️ CẢNH BÁO: XÓA VĨNH VIỄN học sinh ${btn.getAttribute('data-name')}?`)) return;
            btn.innerText = "Đang xóa...";
            await window.supabaseClient.from("HocSinh").delete().eq("uid", btn.getAttribute('data-uid'));
            taiDanhSachHocSinh();
        };
    });
};

window.thayDoiTrangThaiHS = async (uid, hanhDong, tenHS) => {
    const thaoTac = hanhDong === 'khoa' ? 'KHÓA' : 'PHÊ DUYỆT';
    if (!confirm(`Chắc chắn muốn ${thaoTac} tài khoản của học sinh: ${tenHS}?`)) return;
    try {
        await window.supabaseClient.from("HocSinh").update({ trangThai: (hanhDong === 'duyet') ? "dapheduyet" : "chopheduyet" }).eq("uid", uid);
        taiDanhSachHocSinh();
    } catch (error) { alert("❌ Lỗi: " + error.message); }
};

// ---------------------------------------------------------------------
// 4.4. KHO HỌC LIỆU & GIAO NHIỆM VỤ (BẢN MẪU & BÀI TẬP)
// ---------------------------------------------------------------------
// (Lưu ý: Các bảng Học Liệu và Nhiệm Vụ phải được tạo trên Supabase)
window.taiKhoHocLieu = async () => {
    const khungDe = document.getElementById('admin-list-kho-hoc-lieu');
    if (!khungDe) return;
    khungDe.innerHTML = `<div style="text-align:center; padding:40px;"><div style="font-size:24px;">⏳</div>Đang tải Kho Học liệu...</div>`;

    try {
        const { data: dsHocLieu, error } = await window.supabaseClient.from("HocLieu").select("*").order('ngayTao', { ascending: false });
        if (error) throw error;

        let html = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; background: #e8f4f8; padding: 15px; border-radius: 8px; border: 1px dashed #b8daff;">
                <div style="color: #0056b3; font-size: 14px;">📦 Kho chứa các bản mẫu Đề thi, Tài liệu gốc. Tồn tại vĩnh viễn và độc lập.</div>
                <button onclick="moPopupHocLieu()" style="background:#27ae60; color:white; border:none; padding:10px 20px; border-radius:6px; font-weight:bold; cursor:pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">➕ TẠO HỌC LIỆU MỚI</button>
            </div>
            <input type="text" id="txt-search-hoc-lieu" placeholder="🔍 Tìm kiếm theo Mã, Tên học liệu, hoặc Người tạo..." style="width: 100%; padding: 10px 15px; border-radius: 6px; border: 1px solid #ccc; font-size: 14px; margin-bottom: 15px; box-sizing: border-box; outline: none;">
        `;

        if (!dsHocLieu || dsHocLieu.length === 0) {
            khungDe.innerHTML = html + `<div style="text-align:center; color:#d35400; padding:40px; background: #fff; border-radius: 8px; border: 1px solid #eee;">Kho Học liệu trống! Hãy tạo Bản mẫu đầu tiên.</div>`; return;
        }

        html += `<table style="width: 100%; border-collapse: collapse; font-size: 13px; text-align: left; background: #fff; box-shadow: 0 2px 5px rgba(0,0,0,0.05); border-radius: 8px; overflow: hidden;">
            <tr style="background:#f1f3f5; border-bottom:2px solid #dee2e6;">
                <th style="padding:15px; width:5%; text-align:center;">STT</th><th style="padding:15px; width:12%;">Mã Bản mẫu</th><th style="padding:15px; width:28%;">Tên Học liệu & Quy mô</th><th style="padding:15px; width:20%;">Nguồn gốc</th><th style="padding:15px; width:15%; text-align:center;">Phân loại</th><th style="padding:15px; width:20%; text-align:center;">Hành động</th>
            </tr>`;

        dsHocLieu.forEach((hl, index) => {
            let badgeLoai = hl.trangThai === 1
                ? '<span style="background:#e6f4ea; color:#1e7e34; padding:4px 8px; border-radius:20px; font-weight:bold; border:1px solid #c3e6cb; font-size:11px;">🌍 Thư viện Public</span>'
                : '<span style="background:#fff5f5; color:#c0392b; padding:4px 8px; border-radius:20px; font-weight:bold; border:1px solid #f5c6cb; font-size:11px;">🔒 Kho Nội bộ</span>';

            const chuoiCauTruc = hl.cauTruc || (hl.danhSachCauHoi ? hl.danhSachCauHoi.length + " câu" : "0 câu");
            const quyMoHtml = chuoiCauTruc.includes("câu") ? chuoiCauTruc : `${chuoiCauTruc} (${hl.danhSachCauHoi?.length || 0} câu)`;
            const searchTag = `${hl.maDe || hl.id} ${hl.tenHocLieu || ''} ${hl.tenDe || ''} ${hl.nguoiTao || ''}`.toLowerCase();

            html += `
                <tr class="row-hoc-lieu" data-search="${searchTag}" style="border-bottom:1px solid #eee; background:#fff; transition: 0.2s;" onmouseover="this.style.background='#fdfdfe'" onmouseout="this.style.background='#fff'">
                    <td style="padding:15px; text-align:center;"><div style="width: 28px; height: 28px; background: #e9ecef; border-radius: 50%; display: flex; justify-content: center; align-items: center; font-weight: bold; color: #495057; border: 1px solid #ced4da; margin: 0 auto;">${index + 1}</div></td>
                    <td style="padding:15px;"><strong style="color:#0056b3; font-size:14px;">${hl.maDe || hl.id || "---"}</strong></td>
                    <td style="padding:15px;">
                        <strong style="color:#2c3e50; font-size:15px;">${hl.tenHocLieu || hl.tenDe || "Chưa có tên"}</strong>
                        <div style="margin-top:6px; font-size:12px; color:#6c757d; font-weight:bold;">⏳ ${hl.thoiGian || 90} phút | <span style="color:#d35400;">📋 ${quyMoHtml}</span></div>
                    </td>
                    <td style="padding:15px;">
                        <div style="font-weight:bold; color:#d35400; font-size:12px;">👤 ${hl.nguoiTao || "Hệ thống"}</div>
                        <div style="color:#6c757d; font-size:11px; margin-top:4px;">🕒 ${new Date(hl.ngayTao).toLocaleDateString('vi-VN')}</div>
                    </td>
                    <td style="padding:15px; text-align:center;">${badgeLoai}</td>
                    <td style="padding:15px; text-align:center;">
                        <div style="display:flex; justify-content:center; gap:6px;">
                            <button onclick="alert('Chức năng sửa Học Liệu đang hoàn thiện trên Supabase!')" style="background:#f8f9fa; color:#0056b3; border:1px solid #0056b3; padding:6px 10px; border-radius:4px; font-weight:bold; cursor:pointer; font-size:12px;">✏️ Sửa</button>
                            <button onclick="xoaHocLieu(event, '${hl.maDe || hl.id}', '${hl.tenHocLieu || "Học liệu"}')" style="background:#f8f9fa; color:#dc3545; border:1px solid #dc3545; padding:6px 10px; border-radius:4px; font-weight:bold; cursor:pointer; font-size:12px;">🗑️ Xóa</button>
                            <button onclick="moPopupGiaoNhiemVu('${hl.maDe || hl.id}')" style="background:#ff9ff3; color:#833471; border:1px solid #f368e0; padding:6px 10px; border-radius:4px; font-weight:bold; cursor:pointer; font-size:12px;">🚀 GIAO NV</button>
                        </div>
                    </td>
                </tr>`;
        });
        html += `</table>`;
        khungDe.innerHTML = html;

        document.getElementById('txt-search-hoc-lieu').oninput = function () {
            const tuKhoa = this.value.toLowerCase().trim();
            document.querySelectorAll('.row-hoc-lieu').forEach(row => {
                row.style.display = row.getAttribute('data-search').includes(tuKhoa) ? 'table-row' : 'none';
            });
        };
    } catch (error) { khungDe.innerHTML = `<div style="color:red;">❌ Lỗi: ${error.message}</div>`; }
};

window.xoaHocLieu = async (event, maDe, tenDe) => {
    if (!confirm(`⚠️ XÓA BẢN GỐC HỌC LIỆU [${tenDe}]?\nLưu ý: Hành động này KHÔNG làm mất các Nhiệm vụ đã giao cho học sinh.`)) return;
    event.target.innerText = "⏳...";
    try {
        await window.supabaseClient.from("HocLieu").delete().eq("maDe", maDe);
        taiKhoHocLieu();
    } catch (error) { alert("Lỗi xóa: " + error.message); }
};

window.moPopupGiaoNhiemVu = async (idHlGoc) => {
    const overlay = document.createElement('div');
    overlay.style.cssText = "position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.6); z-index:100000; display:flex; justify-content:center; align-items:center; backdrop-filter: blur(3px); padding: 20px; box-sizing: border-box;";
    overlay.innerHTML = `<div style="color:white; font-size:20px;">⏳ Đang nạp dữ liệu điều phối...</div>`;
    document.body.appendChild(overlay);

    let hlGoc = {};
    let optLopHTML = `<div style="max-height: 120px; overflow-y: auto; border: 1px solid #ccc; border-radius: 6px; padding: 8px; background: #fff;">`;
    let quyMoHtml = "0 câu";
    let chuoiCauTrucChuan = "";

    try {
        const { data: docHl } = await window.supabaseClient.from("HocLieu").select("*").eq("maDe", idHlGoc).single();
        const { data: snapLop } = await window.supabaseClient.from("LopHoc").select("*");

        if (!docHl) { alert("Bản mẫu Học liệu không tồn tại!"); overlay.remove(); return; }
        hlGoc = docHl;

        chuoiCauTrucChuan = hlGoc.cauTruc || (hlGoc.danhSachCauHoi ? hlGoc.danhSachCauHoi.length + " câu" : "0 câu");
        quyMoHtml = chuoiCauTrucChuan.includes("câu") ? chuoiCauTrucChuan : `${chuoiCauTrucChuan} (${hlGoc.danhSachCauHoi?.length || 0} câu)`;

        if (!snapLop || snapLop.length === 0) {
            optLopHTML += `<div style="color:#dc3545; font-size:12px; text-align:center;">Chưa có lớp nào! Hãy tạo lớp trước.</div>`;
        } else {
            snapLop.sort((a, b) => (a.tenLop || "").localeCompare(b.tenLop || "")).forEach(d => {
                optLopHTML += `<label style="display: flex; align-items: center; gap: 8px; cursor: pointer; margin-bottom: 5px; padding: 4px; border-bottom: 1px solid #f8f9fa; transition: 0.2s;" onmouseover="this.style.background='#eef2ff'" onmouseout="this.style.background='transparent'"><input type="checkbox" class="chk-lop-nhan" value="${d.maLop}" style="transform: scale(1.2);"> <span style="font-weight:bold; color:#0056b3;">${d.tenLop || d.maLop}</span></label>`;
            });
        }
        optLopHTML += `</div>`;
    } catch (error) { alert("Lỗi: " + error.message); overlay.remove(); return; }

    overlay.innerHTML = `
        <div style="background:#fff; width:100%; max-width:650px; max-height:100%; border-radius:12px; display:flex; flex-direction:column; box-shadow: 0 20px 50px rgba(0,0,0,0.5); overflow:hidden;">
            <div style="padding:15px 20px; background:#ff9ff3; color:#833471; display:flex; justify-content:space-between; align-items:center;">
                <h3 style="margin:0; font-size:18px; font-weight:bold;font-family: inherit;">🚀 ĐIỀU PHỐI NHIỆM VỤ</h3>
                <button onclick="this.closest('div').parentElement.parentElement.remove()" style="background:transparent; border:none; color:#833471; font-size:26px; cursor:pointer; line-height:1;">&times;</button>
            </div>
            <div style="padding: 20px; overflow-y: auto;">
                <div style="background:#f8f9fa; padding:15px; border-radius:8px; border:1px dashed #ccc; margin-bottom:15px;">
                    <div style="font-size:12px; color:#666; margin-bottom:5px;">Trích xuất từ Bản gốc:</div>
                    <strong style="color:#0056b3; font-size:16px;">${hlGoc.tenHocLieu || hlGoc.tenDe || "Chưa có tên"}</strong>
                    <div style="margin-top:5px; font-size:13px; color:#d35400;">Quy mô: <strong>${quyMoHtml}</strong> | ${hlGoc.thoiGian || 90} phút</div>
                </div>

                <div style="display:flex; gap:15px; margin-bottom:15px;">
                    <div style="flex:1;">
                        <label style="font-weight:bold; font-size:13px;">Giao cho Lớp <span style="color:red">*</span>:</label>
                        <div style="margin-top:5px;">${optLopHTML}</div>
                    </div>
                    <div style="flex:1;">
                        <label style="font-weight:bold; font-size:13px;">Loại Nhiệm vụ:</label>
                        <select id="nv-loai" style="width:100%; padding:10px; margin-top:5px; border-radius:6px; border:1px solid #ccc; background:#eef2ff;">
                            <option value="1">📝 Làm Trắc nghiệm Online</option>
                            <option value="2">📁 Nộp Bài Tự luận / Dự án</option>
                        </select>
                    </div>
                </div>

                <div style="display:flex; gap:15px; margin-bottom:15px;">
                    <div style="flex:1;"><label style="font-weight:bold; font-size:13px;">Bắt đầu mở lúc:</label><input type="datetime-local" id="nv-tggiao" style="width:100%; padding:10px; margin-top:5px; border-radius:6px; border:1px solid #ccc; box-sizing:border-box;"></div>
                    <div style="flex:1;"><label style="font-weight:bold; font-size:13px; color:#dc3545;">Hạn chót thu bài:</label><input type="datetime-local" id="nv-hanchot" style="width:100%; padding:10px; margin-top:5px; border-radius:6px; border:1px solid #dc3545; box-sizing:border-box;"></div>
                </div>

                <div style="display:flex; gap:15px; margin-bottom:15px; align-items: flex-start; background: #e8f4f8; padding: 15px; border-radius: 8px;">
                    <div style="flex:0 0 150px;"><label style="font-weight:bold; font-size:13px; color:#0056b3;">Số lần làm (0=Vô hạn):</label><input type="number" id="nv-solan" value="1" min="0" style="width:100%; padding:10px; margin-top:5px; border-radius:6px; border:1px solid #b8daff; box-sizing:border-box;"></div>
                    <div style="flex:1; padding-top: 5px;">
                        <label style="display:flex; align-items:center; gap:8px; cursor:pointer; margin-bottom:8px;"><input type="checkbox" id="nv-troncau" checked style="transform:scale(1.3);"> <span>🔀 Trộn thứ tự câu hỏi</span></label>
                        <label style="display:flex; align-items:center; gap:8px; cursor:pointer; margin-bottom:8px;"><input type="checkbox" id="nv-xemdapan" checked style="transform:scale(1.3);"> <span>✅ Hiện Đáp án đúng sau nộp</span></label>
                        <label style="display:flex; align-items:center; gap:8px; cursor:pointer;"><input type="checkbox" id="nv-xemloigiai" checked style="transform:scale(1.3);"> <span>📝 Hiện Lời giải chi tiết sau nộp</span></label>
                    </div>
                </div>

                <div style="margin-bottom:20px;">
                    <label style="font-weight:bold; font-size:13px;">Lời nhắn nhủ cho học sinh:</label>
                    <textarea id="nv-loinhan" placeholder="VD: Các em nhớ làm bài cẩn thận..." style="width:100%; padding:10px; margin-top:5px; border-radius:6px; border:1px solid #ccc; resize:vertical; min-height:60px; box-sizing:border-box;"></textarea>
                </div>
                <button id="btn-xac-nhan-giao" style="width:100%; padding:15px; background:#ff9ff3; color:#833471; border:none; border-radius:8px; font-weight:bold;font-family: inherit; font-size:16px; cursor:pointer; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: 0.2s;">🚀 XUẤT KÍCH NHIỆM VỤ</button>
            </div>
        </div>`;

    document.getElementById('btn-xac-nhan-giao').onclick = async function () {
        const dsLopChon = Array.from(document.querySelectorAll('.chk-lop-nhan:checked')).map(el => el.value);
        if (dsLopChon.length === 0) { alert("❌ Bắt buộc phải tick chọn ít nhất 1 Lớp học để giao nhiệm vụ!"); return; }

        this.innerText = `⏳ Đang nhân bản Nhiệm vụ cho ${dsLopChon.length} lớp...`;
        this.disabled = true;

        const rawTGiao = document.getElementById('nv-tggiao').value;
        const rawHanChot = document.getElementById('nv-hanchot').value;

        let dsNhiemVuMoi = [];
        dsLopChon.forEach(maLop => {
            dsNhiemVuMoi.push({
                maNhiemVu: "NV_" + taoMaNgauNhien(5),
                tenDe: "[NV] " + (hlGoc.tenHocLieu || hlGoc.tenDe || "Chưa có tên"),
                thoiGian: hlGoc.thoiGian || 90,
                danhSachCauHoi: hlGoc.danhSachCauHoi || [],
                cauTruc: chuoiCauTrucChuan,
                khoiLop: hlGoc.khoiLop || "",
                nguoiTao: hlGoc.nguoiTao || "Giáo viên",
                maLopChoPhep: maLop,
                loaiNhiemVu: parseInt(document.getElementById('nv-loai').value) || 1,
                thoiGianGiao: rawTGiao ? new Date(rawTGiao).toISOString() : new Date().toISOString(),
                hanChot: rawHanChot ? new Date(rawHanChot).toISOString() : null,
                soLanLamBai: parseInt(document.getElementById('nv-solan').value) || 0,
                coTronCauHoi: document.getElementById('nv-troncau').checked,
                choXemDapAn: document.getElementById('nv-xemdapan').checked,
                choXemLoiGiai: document.getElementById('nv-xemloigiai').checked,
                loiNhan: document.getElementById('nv-loinhan').value.trim(),
                ngayTao: new Date().toISOString(),
                idBanGoc: idHlGoc,
                trangThai: 2
            });
        });

        try {
            const { error } = await window.supabaseClient.from("NhiemVu").insert(dsNhiemVuMoi);
            if (error) throw error;

            alert(`🎉 GIAO NHIỆM VỤ THÀNH CÔNG CHO ${dsLopChon.length} LỚP!`);
            overlay.remove();

            const btnTabNV = document.querySelector('button[data-target="admin-quan-ly-nhiem-vu"]');
            if (btnTabNV) btnTabNV.click();
        } catch (e) {
            alert("❌ Lỗi: " + e.message);
            this.innerText = "🚀 XUẤT KÍCH NHIỆM VỤ"; this.disabled = false;
        }
    };
};
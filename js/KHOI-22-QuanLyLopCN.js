// =====================================================================
// KHỐI 22: QUẢN LÝ HỒ SƠ LỚP CHỦ NHIỆM (LÝ LỊCH, SƠ ĐỒ, GVBM, QUỸ LỚP)
// Thiết kế: Trải dọc (Vertical Stacking) có Thanh điều hướng Neo (Anchor Links)
// =====================================================================

// =====================================================================
// HÀM 22.1: MỞ GIAO DIỆN QUẢN LÝ LỚP CHỦ NHIỆM
// =====================================================================
window.ham_22_1_mo_giao_dien_quan_ly_lop = function () {
    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
    if (!vungLamViec) return;

    vungLamViec.innerHTML = `
        <div style="padding: 10px; animation: fadeIn 0.3s ease-in-out;">
            
            <!-- HEADER -->
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #007bff; padding-bottom: 12px; margin-bottom: 20px;">
                <h3 style="color: #007bff; margin: 0; text-transform: uppercase; display: flex; align-items: center; gap: 10px; font-size: 20px;">
                    👥 Quản lý Hồ sơ Lớp Chủ Nhiệm
                </h3>
                <div style="display: flex; gap: 10px;">
                    <button onclick="ham_3_1_ve_dashboard_admin()" style="padding: 8px 15px; background: #6c757d; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.15);">⬅️ Quay lại</button>
                </div>
            </div>

            <!-- CHỌN LỚP -->
            <div style="background: #e6f2ff; padding: 15px 25px; border-radius: 8px; border: 1px solid #b8daff; margin-bottom: 20px; display: flex; align-items: center; gap: 15px;">
                <label style="font-weight: bold; font-size: 15px; color: #0056b3; white-space: nowrap;">🏫 CHỌN LỚP CHỦ NHIỆM:</label>
                <input id="qlcn-input-lop" list="dl-lop" placeholder="Gõ tên hoặc chọn lớp..." onchange="if(typeof window.ham_22_2_tai_du_lieu_lop === 'function') window.ham_22_2_tai_du_lieu_lop()" style="flex: 1; max-width: 400px; padding: 10px; border: 2px solid #007bff; border-radius: 6px; font-weight: bold; font-size: 15px; outline: none; color: #0056b3;">
                <datalist id="dl-lop"></datalist>
            </div>

            <!-- THANH ĐIỀU HƯỚNG NHANH -->
            <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 25px; background: #f8f9fa; padding: 12px 15px; border-radius: 8px; border: 1px solid #dee2e6; align-items: center;">
                <span style="font-weight:bold; color:#495057; font-size:14px; margin-right:5px;">📍 Đi nhanh đến:</span>
                <button onclick="document.getElementById('phan-1-ly-lich').scrollIntoView({behavior: 'smooth', block: 'start'})" style="padding: 8px 15px; background: #fff; border: 1px solid #007bff; color: #007bff; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 13px; transition: 0.2s;" onmouseover="this.style.background='#007bff'; this.style.color='#fff'" onmouseout="this.style.background='#fff'; this.style.color='#007bff'">🧑‍🎓 1. Lý lịch</button>
                <button onclick="document.getElementById('phan-2-so-do').scrollIntoView({behavior: 'smooth', block: 'start'})" style="padding: 8px 15px; background: #fff; border: 1px solid #fd7e14; color: #fd7e14; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 13px; transition: 0.2s;" onmouseover="this.style.background='#fd7e14'; this.style.color='#fff'" onmouseout="this.style.background='#fff'; this.style.color='#fd7e14'">🗺️ 2. Sơ đồ</button>
                <button onclick="document.getElementById('phan-3-gvbm').scrollIntoView({behavior: 'smooth', block: 'start'})" style="padding: 8px 15px; background: #fff; border: 1px solid #17a2b8; color: #17a2b8; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 13px; transition: 0.2s;" onmouseover="this.style.background='#17a2b8'; this.style.color='#fff'" onmouseout="this.style.background='#fff'; this.style.color='#17a2b8'">👨‍🏫 3. GVBM</button>
                <button onclick="document.getElementById('phan-4-quy-lop').scrollIntoView({behavior: 'smooth', block: 'start'})" style="padding: 8px 15px; background: #fff; border: 1px solid #28a745; color: #28a745; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 13px; transition: 0.2s;" onmouseover="this.style.background='#28a745'; this.style.color='#fff'" onmouseout="this.style.background='#fff'; this.style.color='#28a745'">💰 4. Quỹ lớp</button>
            </div>

            <!-- CÁC PHẦN NỘI DUNG XẾP DỌC -->
            <div style="display: flex; flex-direction: column; gap: 25px;">
                
                <!-- PHẦN 1: LÝ LỊCH -->
                <div id="phan-1-ly-lich" style="background: #fff; border-radius: 10px; border: 1px solid #dee2e6; box-shadow: 0 4px 6px rgba(0,0,0,0.02); overflow: hidden; scroll-margin-top: 20px;">
                    <div style="background: #e6f2ff; padding: 15px 20px; border-bottom: 1px solid #b8daff; display: flex; justify-content: space-between; align-items: center;">
                        <h4 style="margin: 0; color: #0056b3; font-size: 16px;">🧑‍🎓 1. Danh sách học sinh & Lý lịch cơ bản</h4>
                        <div style="display: flex; gap: 10px;">
                            <button style="padding: 5px 15px; background: #007bff; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; font-size: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">➕ Thêm Học Sinh</button>
                            <button onclick="window.ham_22_3_toggle_muc('body-ly-lich', this)" style="padding: 5px 12px; background: #fff; color: #0056b3; border: 1px solid #0056b3; border-radius: 4px; font-weight: bold; cursor: pointer; font-size: 12px;">➖ Thu hẹp</button>
                        </div>
                    </div>
                    <div id="body-ly-lich" style="padding: 25px;">
                        <div id="qlcn-vung-ly-lich" style="text-align:center; color:#6c757d; padding:30px; font-style:italic; font-size: 14px;">
                            Vui lòng chọn Lớp học ở trên để tải danh sách.
                        </div>
                    </div>
                </div>

                <!-- PHẦN 2: SƠ ĐỒ -->
                <div id="phan-2-so-do" style="background: #fff; border-radius: 10px; border: 1px solid #dee2e6; box-shadow: 0 4px 6px rgba(0,0,0,0.02); overflow: hidden; scroll-margin-top: 20px;">
                    <div style="background: #fff8e6; padding: 15px 20px; border-bottom: 1px solid #ffeeba; display: flex; justify-content: space-between; align-items: center;">
                        <h4 style="margin: 0; color: #d39e00; font-size: 16px;">🗺️ 2. Thiết kế & Quản lý Sơ đồ chỗ ngồi</h4>
                        <div style="display: flex; gap: 10px;">
                            <button style="padding: 5px 15px; background: #ffc107; color: black; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; font-size: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">✏️ Chỉnh sửa sơ đồ</button>
                            <button onclick="window.ham_22_3_toggle_muc('body-so-do', this)" style="padding: 5px 12px; background: #fff; color: #d39e00; border: 1px solid #d39e00; border-radius: 4px; font-weight: bold; cursor: pointer; font-size: 12px;">➖ Thu hẹp</button>
                        </div>
                    </div>
                    <div id="body-so-do" style="padding: 25px;">
                        <div id="qlcn-vung-so-do" style="text-align:center; color:#6c757d; padding:30px; font-style:italic; font-size: 14px;">
                            Tính năng kéo thả sơ đồ lớp đang được cập nhật...
                        </div>
                    </div>
                </div>

                <!-- PHẦN 3: GVBM -->
                <div id="phan-3-gvbm" style="background: #fff; border-radius: 10px; border: 1px solid #dee2e6; box-shadow: 0 4px 6px rgba(0,0,0,0.02); overflow: hidden; scroll-margin-top: 20px;">
                    <div style="background: #e0f7fa; padding: 15px 20px; border-bottom: 1px solid #b8daff; display: flex; justify-content: space-between; align-items: center;">
                        <h4 style="margin: 0; color: #00838f; font-size: 16px;">👨‍🏫 3. Danh sách Giáo viên Bộ môn</h4>
                        <div style="display: flex; gap: 10px;">
                            <button style="padding: 5px 15px; background: #17a2b8; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; font-size: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">➕ Thêm Giáo viên</button>
                            <button onclick="window.ham_22_3_toggle_muc('body-gvbm', this)" style="padding: 5px 12px; background: #fff; color: #00838f; border: 1px solid #00838f; border-radius: 4px; font-weight: bold; cursor: pointer; font-size: 12px;">➖ Thu hẹp</button>
                        </div>
                    </div>
                    <div id="body-gvbm" style="padding: 25px;">
                        <div id="qlcn-vung-gvbm" style="text-align:center; color:#6c757d; padding:30px; font-style:italic; font-size: 14px;">
                            Vui lòng chọn Lớp học ở trên để xem danh sách.
                        </div>
                    </div>
                </div>

                <!-- PHẦN 4: QUỸ LỚP -->
                <div id="phan-4-quy-lop" style="background: #fff; border-radius: 10px; border: 1px solid #dee2e6; box-shadow: 0 4px 6px rgba(0,0,0,0.02); overflow: hidden; scroll-margin-top: 20px;">
                    <div style="background: #e8f5e9; padding: 15px 20px; border-bottom: 1px solid #c3e6cb; display: flex; justify-content: space-between; align-items: center;">
                        <h4 style="margin: 0; color: #155724; font-size: 16px;">💰 4. Nhật ký Thu chi Quỹ Lớp</h4>
                        <div style="display: flex; gap: 10px;">
                            <button style="padding: 5px 15px; background: #dc3545; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; font-size: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">➖ Ghi khoản Chi</button>
                            <button style="padding: 5px 15px; background: #28a745; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; font-size: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">➕ Ghi khoản Thu</button>
                            <button onclick="window.ham_22_3_toggle_muc('body-quy-lop', this)" style="padding: 5px 12px; background: #fff; color: #155724; border: 1px solid #155724; border-radius: 4px; font-weight: bold; cursor: pointer; font-size: 12px;">➖ Thu hẹp</button>
                        </div>
                    </div>
                    <div id="body-quy-lop" style="padding: 25px;">
                        <div id="qlcn-vung-quy-lop" style="text-align:center; color:#6c757d; padding:30px; font-style:italic; font-size: 14px;">
                            Vui lòng chọn Lớp học ở trên để quản lý quỹ.
                        </div>
                    </div>
                </div>

            </div>
        </div>
    `;

    // Tái sử dụng hàm tải danh sách lớp từ khối 20 (nếu có)
    if (typeof window.ham_20_7_tai_danh_sach_lop === 'function') {
        window.ham_20_7_tai_danh_sach_lop();
    }
};

// =====================================================================
// HÀM 22.2: TẢI DỮ LIỆU CỦA LỚP CHỦ NHIỆM (KHUNG CHỜ PHÁT TRIỂN)
// =====================================================================
window.ham_22_2_tai_du_lieu_lop = function () {
    const inputLop = document.getElementById('qlcn-input-lop');
    if (!inputLop || !inputLop.value) return;

    let rawLop = inputLop.value.trim();
    let maLop = rawLop.match(/\(([^)]+)\)$/) ? rawLop.match(/\(([^)]+)\)$/)[1].trim() : rawLop;

    console.log("Chuẩn bị nạp dữ liệu cho lớp Chủ nhiệm: " + maLop);

    // (Sau này chúng ta sẽ viết code tải Lý lịch, Sơ đồ, GVBM, Quỹ lớp tại đây...)
};

// =====================================================================
// HÀM 22.3: CHUYỂN ĐỔI ẨN / HIỆN MỤC (THU HẸP MỞ RỘNG)
// =====================================================================
window.ham_22_3_toggle_muc = function (idBody, btn) {
    let el = document.getElementById(idBody);
    if (!el) return;

    if (el.style.display === 'none') {
        el.style.display = 'block';
        btn.innerHTML = '➖ Thu hẹp';
    } else {
        el.style.display = 'none';
        btn.innerHTML = '👁️ Mở rộng';
    }
};
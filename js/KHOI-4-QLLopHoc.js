
// ==============================================================================
// KHỐI 4: QUẢN LÝ LỚP HỌC (TÍCH HỢP SORT, CHỌN HS, XEM CHI TIẾT)
// ==============================================================================

// Biến lưu trữ tạm thời dữ liệu bảng để phục vụ việc Sắp xếp (Sort) cực nhanh
const BangLopState = {
    duLieu: [],
    cotDangSort: 'ngay_tao',
    tangDan: false // false = Giảm dần (Mới nhất xếp trên)
};
let _dsHocSinhGoc = [];

// Hàm 4.0: Sinh mã lớp ngẫu nhiên 5 ký tự
function ham_4_0_sinh_ma_lop() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}




// Hàm 4.1: Vẽ giao diện chính
function ham_4_1_ve_quan_ly_lop() {
    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
    vungLamViec.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <h3 style="margin: 0; color: #0056b3;">Danh sách Lớp học & Nhóm ôn luyện</h3>
            
            <div style="display: flex; gap: 15px; align-items: center;">
                <div style="position: relative;">
                    <span style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%); opacity: 0.5;">🔍</span>
                    <input type="text" id="input-tim-kiem-qllop" 
                           placeholder="Tìm Tên lớp, Mã lớp..." 
                           oninput="ham_4_11_tim_kiem_live_lop(this.value)"
                           style="padding: 10px 10px 10px 35px; border: 1px solid #ccc; border-radius: 6px; width: 250px; font-size: 14px; outline: none; box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);">
                </div>

                <button onclick="ham_4_2_hien_form_them_lop()" style="padding: 10px 15px; background: #28a745; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; white-space: nowrap;">
                    + Khởi Tạo Lớp Mới
                </button>
            </div>
        </div>
        <div id="danh-sach-lop-render"><p style="text-align: center;">Đang tải dữ liệu...</p></div>
    `;
    ham_4_4_tai_danh_sach_lop();
}
// ------------------------------------------------------------------------------
// PHẦN A: TẠO LỚP & CHỌN HỌC SINH
// ------------------------------------------------------------------------------

// Hàm 4.2: Vẽ Form tạo lớp học mới
function ham_4_2_hien_form_them_lop() {
    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
    const maLopTuDong = ham_4_0_sinh_ma_lop();
    const thoiGianHienTai = new Date().toLocaleString('vi-VN');

    vungLamViec.innerHTML = `
        <div style="max-width: 750px; background: #ffffff; padding: 25px; border-radius: 12px; border: 1px solid #e0e0e0; margin: 0 auto;">
            <h3 style="color: #1a73e8; border-bottom: 2px solid #f1f3f4; padding-bottom: 10px;">TẠO LỚP HỌC MỚI</h3>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
                <div>
                    <label style="font-weight: bold; font-size: 14px;">Mã lớp:</label>
                    <input type="text" value="${maLopTuDong}" readonly style="width: 100%; padding: 10px; background: #f1f3f4; border-radius: 6px; color: #d93025; font-weight: bold; box-sizing: border-box; border: 1px solid #ddd;">
                </div>
                
                <div>
                    <label style="font-weight: bold; font-size: 14px;">Trạng thái ban đầu:</label>
                    <select id="selTrangThaiLopMoi" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; cursor: pointer;">
                        <option value="1">1 - Đang mở (Hoạt động ngay)</option>
                        <option value="0">0 - Đóng (Tạm khóa)</option>
                    </select>
                </div>

                <div style="grid-column: span 2;">
                    <label style="font-weight: bold; font-size: 14px; color: #1a73e8;">Tên lớp học (*):</label>
                    <input type="text" id="txtTenLop" placeholder="Ví dụ: TOÁN 12 - NHÓM CHIỀU THỨ 2" style="width: 100%; padding: 10px; border: 2px solid #1a73e8; border-radius: 6px; box-sizing: border-box;">
                </div>
            </div>

            <div style="margin-bottom: 20px; padding: 15px; border: 1px dashed #1a73e8; border-radius: 8px; background: #f8fbff;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <label style="font-weight: bold; font-size: 14px; color: #1a73e8;">Danh sách học sinh thêm vào lớp:</label>
                    <button onclick="ham_4_8_tai_danh_sach_hoc_sinh_de_chon()" style="padding: 6px 12px; background: #1a73e8; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">
                        Tải danh sách Học sinh
                    </button>
                </div>
                <input type="text" oninput="ham_4_16_loc_hs_luc_tao_lop(this.value)" placeholder="🔍 Tìm tên hoặc SĐT..." style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; margin-bottom: 10px; box-sizing: border-box;">
                
                <div id="khung-checkbox-hs" style="max-height: 200px; overflow-y: auto; display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                    <p style="color: #666; font-size: 13px; grid-column: span 2;">Bấm "Tải danh sách" để hiển thị học sinh...</p>
                </div>
            </div>

            <div style="display: flex; gap: 12px;">
                <button onclick="ham_4_3_luu_lop_moi(this, '${maLopTuDong}')" style="flex: 2; padding: 12px; background: #1a73e8; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">
                    XÁC NHẬN LƯU LỚP HỌC
                </button>
                <button onclick="ham_4_1_ve_quan_ly_lop()" style="flex: 1; padding: 12px; background: #f1f3f4; border: 1px solid #dadce0; border-radius: 6px; cursor: pointer;">
                    QUAY LẠI
                </button>
            </div>
        </div>
    `;
}

// Hàm 4.8: Truy vấn bảng 'hoc_sinh' để hiển thị Checkbox
async function ham_4_8_tai_danh_sach_hoc_sinh_de_chon() {
    const khungRender = document.getElementById('khung-checkbox-hs');
    khungRender.innerHTML = `<span style="color: blue;">Đang tải dữ liệu học sinh...</span>`;

    try {
        const { data: dsHocSinh, error } = await _supabase
            .from('hoc_sinh')
            .select('uid, ten, sdt, khoi_lop,kim_cuong')
            .eq('vai_tro', 'hocsinh')
            .eq('trang_thai', 1)
            .order('ten', { ascending: true });

        if (error) throw error;
        if (!dsHocSinh || dsHocSinh.length === 0) {
            khungRender.innerHTML = `<span style="color: red;">Chưa có học sinh nào trên hệ thống.</span>`;
            return;
        }

        let htmlCheckbox = '';
        dsHocSinh.forEach(hs => {
            const soKC = hs.kim_cuong || 0; // Lấy dữ liệu
            const badgeKC = `<span style="background: #e0f7fa; color: #00838f; padding: 2px 8px; border-radius: 12px; font-size: 12px; font-weight: 900; border: 1px solid #b2ebf2;">💎 ${soKC}</span>`;
            const thongTin = `<b>${hs.ten}</b> - Khối ${hs.khoi_lop || '?'} (${hs.sdt})`;

            // Thêm badgeKC vào thẻ label với justify-content: space-between để ép nó sang lề phải
            htmlCheckbox += `
                <label style="display: flex; align-items: center; justify-content: space-between; padding: 10px 12px; background: white; border: 1px solid #eee; border-radius: 4px; cursor: pointer;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <input type="checkbox" class="chk-hs-vao-lop" value="${hs.uid}"> 
                        <span style="font-size: 14px;">${thongTin}</span>
                    </div>
                    ${badgeKC}
                </label>
            `;
        });
        khungRender.innerHTML = htmlCheckbox;

    } catch (err) {
        khungRender.innerHTML = `<span style="color: red;">Lỗi tải HS: ${err.message}</span>`;
    }
}

// ==============================================================
// Hàm 4.3: Lưu lớp mới + Cập nhật hồ sơ Học sinh + Fix lỗi Load danh sách
// ==============================================================
async function ham_4_3_luu_lop_moi(btnElement, maLop) {
    const tenLop = document.getElementById('txtTenLop').value.trim();
    const trangThai = parseInt(document.getElementById('selTrangThaiLopMoi').value);

    if (!tenLop) return alert("Thầy chưa nhập Tên lớp học!");

    // Thu thập danh sách UID học sinh được check
    const dsCheckbox = document.querySelectorAll('.chk-hs-vao-lop:checked');
    const mangUidHocSinh = Array.from(dsCheckbox).map(chk => chk.value);

    btnElement.disabled = true;
    btnElement.innerText = "⏳ ĐANG LƯU...";

    try {
        // BƯỚC 1: LƯU VÀO BẢNG LỚP HỌC
        const { error: errLop } = await _supabase.from('lop_hoc').insert([{
            ma_lop: maLop,
            ten_lop: tenLop,
            uid_gv_tao: AppState.user.uid,
            trang_thai: trangThai,
            hoc_sinh_ids: mangUidHocSinh, // Lưu mảng trực tiếp, không stringify
            ngay_tao: new Date().toISOString()
        }]);

        if (errLop) {
            if (errLop.code === '23505') throw new Error("Mã lớp bị trùng, vui lòng thử lại.");
            throw errLop;
        }

        // BƯỚC 2: CẬP NHẬT 'danh_sach_ma_lop' CHO TỪNG HỌC SINH ĐƯỢC CHỌN
        if (mangUidHocSinh.length > 0) {
            btnElement.innerText = "⏳ ĐANG GHI DANH HS...";

            for (const uid of mangUidHocSinh) {
                // 2.1. Lấy mảng lớp hiện tại của học sinh
                const { data: hsData } = await _supabase
                    .from('hoc_sinh')
                    .select('danh_sach_ma_lop')
                    .eq('uid', uid)
                    .single();

                let dsLopCu = hsData?.danh_sach_ma_lop;
                if (!Array.isArray(dsLopCu)) dsLopCu = [];

                // 2.2. Thêm mã lớp mới nếu chưa có
                if (!dsLopCu.includes(maLop)) {
                    dsLopCu.push(maLop);

                    // 2.3. Cập nhật lại vào Database
                    await _supabase
                        .from('hoc_sinh')
                        .update({ danh_sach_ma_lop: dsLopCu })
                        .eq('uid', uid);
                }
            }
        }

        alert(`✅ Khởi tạo lớp ${maLop} và ghi danh học sinh thành công!`);

        // BƯỚC 3: FIX LỖI LOAD DANH SÁCH (Phải về trang chính trước để có khung render)
        // Thay vì gọi thẳng ham_4_4, ta gọi hàm vẽ khung giao diện chính trước
        ham_4_1_ve_quan_ly_lop();

    } catch (error) {
        alert("Lỗi: " + error.message);
        btnElement.disabled = false;
        btnElement.innerText = "XÁC NHẬN LƯU LỚP HỌC";
    }
}
// ------------------------------------------------------------------------------
// PHẦN B: BẢNG DANH SÁCH (SẮP XẾP) & XEM CHI TIẾT
// ------------------------------------------------------------------------------


// Hàm 4.4: Lấy dữ liệu và gọi hàm Vẽ bảng (Bản FIX lỗi Null)
async function ham_4_4_tai_danh_sach_lop() {
    try {
        const { data: dsLop, error } = await _supabase.from('lop_hoc').select('*');
        if (error) throw error;

        const danhSachUidGv = [...new Set((dsLop || []).map(l => l.uid_gv_tao).filter(id => id))];
        let tuDienTenGv = {};

        if (danhSachUidGv.length > 0) {
            const { data: dsGv } = await _supabase.from('hoc_sinh').select('uid, ten').in('uid', danhSachUidGv);
            if (dsGv) {
                dsGv.forEach(gv => tuDienTenGv[gv.uid] = gv.ten);
            }
        }

        BangLopState.duLieu = (dsLop || []).map(lop => ({
            ...lop,
            ten_gv_tao: tuDienTenGv[lop.uid_gv_tao] || 'Hệ thống'
        }));

        // Gọi hàm vẽ bảng
        ham_4_10_ve_bang_du_lieu();

    } catch (error) {
        console.error("Lỗi tải danh sách lớp:", error.message);

        // 🌟 KIỂM TRA AN TOÀN TRƯỚC KHI GÁN INNERHTML
        const khungRender = document.getElementById('danh-sach-lop-render');
        if (khungRender) {
            khungRender.innerHTML = `<p style="color: red;">Lỗi: ${error.message}</p>`;
        } else {
            // Nếu không tìm thấy khung render, có thể báo qua alert hoặc console
            alert("Lỗi tải danh sách lớp: " + error.message);
        }
    }
}

// =====================================================================
// Hàm 4.11: Tìm kiếm trực tiếp (Live Search) lớp học trên bảng
// =====================================================================
function ham_4_11_tim_kiem_live_lop(tuKhoa) {
    const filter = tuKhoa.toLowerCase().trim();

    // Tìm tất cả các dòng <tr> nằm trong phần <tbody> của bảng lớp học
    const rows = document.querySelectorAll('#danh-sach-lop-render tbody tr');

    rows.forEach(row => {
        // Đọc toàn bộ nội dung chữ (Tên lớp, Mã lớp, Giáo viên...) đang hiển thị trên dòng đó
        const textContent = row.innerText.toLowerCase();

        // Nếu nội dung dòng chứa từ khóa -> Hiện, ngược lại -> Ẩn
        if (textContent.includes(filter)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}


// Hàm 4.10: Vẽ bảng (Cho phép Sort tất cả các cột)
function ham_4_10_ve_bang_du_lieu() {
    const renderArea = document.getElementById('danh-sach-lop-render');
    let dsLop = [...BangLopState.duLieu];

    // Thuật toán Sắp xếp
    const cot = BangLopState.cotDangSort;
    const heSo = BangLopState.tangDan ? 1 : -1;

    dsLop.sort((a, b) => {
        let valA = a[cot] === null || a[cot] === undefined ? '' : a[cot];
        let valB = b[cot] === null || b[cot] === undefined ? '' : b[cot];

        // Nếu là chuỗi thì đưa về chữ thường để so sánh chuẩn
        if (typeof valA === 'string') valA = valA.toLowerCase();
        if (typeof valB === 'string') valB = valB.toLowerCase();

        if (valA < valB) return -1 * heSo;
        if (valA > valB) return 1 * heSo;
        return 0;
    });

    const iconSort = BangLopState.tangDan ? ' ▲' : ' ▼';
    const getIcon = (tenCot) => (cot === tenCot ? iconSort : ' ↕');

    let htmlTable = `
        <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05); font-size: 14px;">
            <thead>
                <tr style="background: #f8f9fa; text-align: left; border-bottom: 2px solid #dee2e6; cursor: pointer; white-space: nowrap;">
                    <th style="padding: 12px; border: 1px solid #eee; width: 50px; text-align: center;">STT</th>
                    <th style="padding: 12px; border: 1px solid #eee;" onclick="ham_4_11_thay_doi_sort('ma_lop')">Mã Lớp ${getIcon('ma_lop')}</th>
                    <th style="padding: 12px; border: 1px solid #eee;" onclick="ham_4_11_thay_doi_sort('ten_lop')">Tên Lớp ${getIcon('ten_lop')}</th>
                    <th style="padding: 12px; border: 1px solid #eee;" onclick="ham_4_11_thay_doi_sort('ten_gv_tao')">GV Tạo ${getIcon('ten_gv_tao')}</th>
                    <th style="padding: 12px; border: 1px solid #eee;" onclick="ham_4_11_thay_doi_sort('ngay_tao')">Ngày Tạo ${getIcon('ngay_tao')}</th>
                    <th style="padding: 12px; border: 1px solid #eee; text-align: center;" onclick="ham_4_11_thay_doi_sort('hoc_sinh_ids')">Sĩ số ${getIcon('hoc_sinh_ids')}</th>
                    <th style="padding: 12px; border: 1px solid #eee; text-align: center;" onclick="ham_4_11_thay_doi_sort('trang_thai')">Trạng thái ${getIcon('trang_thai')}</th>
                    <th style="padding: 12px; border: 1px solid #eee; text-align: center;">Thao tác</th>
                </tr>
            </thead>
            <tbody>
    `;

    dsLop.forEach((lop, index) => {
        const ngayGio = new Date(lop.ngay_tao).toLocaleString('vi-VN');
        const siSo = lop.hoc_sinh_ids ? lop.hoc_sinh_ids.length : 0;
        const nhãnTrạngThái = lop.trang_thai == 1
            ? `<span style="color: #28a745; font-weight: bold;">● Mở</span>`
            : `<span style="color: #dc3545; font-weight: bold;">● Đóng</span>`;

        htmlTable += `
            <tr style="border-bottom: 1px solid #eee; cursor: pointer;" onmouseover="this.style.background='#f1f8ff'" onmouseout="this.style.background='white'" onclick="ham_4_9_xem_chi_tiet_lop('${lop.ma_lop}')">
                <td style="padding: 10px; border: 1px solid #eee; text-align: center;">${index + 1}</td>
                <td style="padding: 10px; border: 1px solid #eee; font-weight: bold; color: #d35400;">${lop.ma_lop}</td>
                <td style="padding: 10px; border: 1px solid #eee;">${lop.ten_lop}</td>
                <td style="padding: 10px; border: 1px solid #eee;">${lop.ten_gv_tao}</td>
                <td style="padding: 10px; border: 1px solid #eee;">${ngayGio}</td>
                <td style="padding: 10px; border: 1px solid #eee; text-align: center;">${siSo}</td>
                <td style="padding: 10px; border: 1px solid #eee; text-align: center;">${nhãnTrạngThái}</td>
                <td style="padding: 10px; border: 1px solid #eee; text-align: center; white-space: nowrap;" onclick="event.stopPropagation()">
                    <button onclick="ham_4_12_hien_form_sua_lop('${lop.ma_lop}')" style="padding: 6px 12px; background: #f39c12; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; margin-right: 8px; box-shadow: 0 2px 4px rgba(243, 156, 18, 0.2);">
                        Sửa
                    </button>
                    <button onclick="ham_4_14_xoa_lop('${lop.ma_lop}')" style="padding: 6px 12px; background: #dc3545; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; box-shadow: 0 2px 4px rgba(220, 53, 69, 0.2);">
                        Xóa
                    </button>
                </td>
            </tr>
        `;
    });

    htmlTable += `</tbody></table>`;
    renderArea.innerHTML = htmlTable;
}

// Hàm 4.11: Xử lý thay đổi Cột Sort khi bấm vào tiêu đề
function ham_4_11_thay_doi_sort(cotMoi) {
    if (BangLopState.cotDangSort === cotMoi) {
        BangLopState.tangDan = !BangLopState.tangDan; // Đổi chiều
    } else {
        BangLopState.cotDangSort = cotMoi;
        BangLopState.tangDan = true; // Mặc định cột mới sẽ tăng dần
    }
    ham_4_10_ve_bang_du_lieu(); // Vẽ lại tức thì
}

// Hàm 4.9: Bấm vào dòng để xem chi tiết Lớp và Danh sách Học sinh
async function ham_4_9_xem_chi_tiet_lop(maLop) {
    const lop = BangLopState.duLieu.find(l => l.ma_lop === maLop);
    if (!lop) return;

    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
    vungLamViec.innerHTML = `<p style="text-align: center;">Đang tải danh sách học sinh của lớp ${maLop}...</p>`;

    try {
        let htmlHocSinh = `<p style="color: #666; font-style: italic;">Lớp chưa có học sinh nào.</p>`;

        // Truy vấn danh sách học sinh có UID nằm trong mảng hoc_sinh_ids của lớp
        if (lop.hoc_sinh_ids && lop.hoc_sinh_ids.length > 0) {
            const { data: dsHS, error } = await _supabase
                .from('hoc_sinh')
                .select('ten, sdt, truong')
                .in('uid', lop.hoc_sinh_ids);

            if (error) throw error;

            if (dsHS && dsHS.length > 0) {
                htmlHocSinh = `<ul style="line-height: 1.8;">`;
                dsHS.forEach((hs, idx) => {
                    htmlHocSinh += `<li><strong>${idx + 1}. ${hs.ten}</strong> - SĐT: ${hs.sdt} - Trường: ${hs.truong || 'Chưa cập nhật'}</li>`;
                });
                htmlHocSinh += `</ul>`;
            }
        }

        // Định dạng nhãn Trạng thái để hiển thị trong chi tiết
        const nhãnTrạngThái = lop.trang_thai == 1
            ? `<span style="color: #28a745; font-weight: bold;">✅ Đang mở (Hoạt động)</span>`
            : `<span style="color: #dc3545; font-weight: bold;">❌ Đang đóng (Tạm dừng)</span>`;

        vungLamViec.innerHTML = `
            <div style="background: white; padding: 25px; border-radius: 10px; border: 1px solid #1a73e8; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                <h3 style="color: #1a73e8; margin-top: 0; border-bottom: 2px solid #eee; padding-bottom: 10px;">
                    Thông tin chi tiết lớp: ${lop.ten_lop} (${lop.ma_lop})
                </h3>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 15px;">
                    <p style="margin: 5px 0;"><strong>Ngày giờ tạo:</strong> ${new Date(lop.ngay_tao).toLocaleString('vi-VN')}</p>
                    <p style="margin: 5px 0;"><strong>Giáo viên tạo:</strong> ${lop.ten_gv_tao}</p>
                    
                    <p style="margin: 5px 0;"><strong>Trạng thái lớp:</strong> ${nhãnTrạngThái}</p>
                    
                    <p style="margin: 5px 0;"><strong>Sĩ số hiện tại:</strong> ${lop.hoc_sinh_ids ? lop.hoc_sinh_ids.length : 0} học sinh</p>
                </div>

                <hr style="border: 0; border-top: 1px dashed #ccc; margin: 15px 0;">
                <h4 style="color: #d35400; margin-bottom: 10px;">👥 Danh sách Học sinh tham gia:</h4>
                <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; border: 1px solid #f0f0f0;">
                    ${htmlHocSinh}
                </div>

                <div style="margin-top: 25px; display: flex; gap: 10px;">
                    <button onclick="ham_4_1_ve_quan_ly_lop()" style="padding: 10px 20px; background: #6c757d; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;">
                        ⬅ Quay Lại
                    </button>
                    <button onclick="ham_4_12_hien_form_sua_lop('${lop.ma_lop}')" style="padding: 10px 20px; background: #f39c12; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;">
                        ✏️ Chỉnh sửa lớp này
                    </button>
                </div>
            </div>
        `;

    } catch (error) {
        vungLamViec.innerHTML = `<p style="color: red;">Lỗi tải chi tiết: ${error.message}</p>
                                 <button onclick="ham_4_1_ve_quan_ly_lop()" style="padding: 10px 20px; background: #6c757d; color: white; border: none; border-radius: 6px; cursor: pointer;">Quay lại</button>`;
    }
}
// ==============================================================================
// PHẦN C: CHỈNH SỬA VÀ XÓA LỚP HỌC
// ==============================================================================

// Hàm 4.14: Xóa lớp học
async function ham_4_14_xoa_lop(maLop) {
    if (!confirm(`⚠️ CẢNH BÁO: Thầy có chắc chắn muốn xóa toàn bộ lớp "${maLop}" không?\nDữ liệu đã xóa sẽ không thể khôi phục!`)) return;

    try {
        const { error } = await _supabase
            .from('lop_hoc')
            .delete()
            .eq('ma_lop', maLop);

        if (error) throw error;

        alert(`Đã xóa thành công lớp ${maLop}!`);
        ham_4_4_tai_danh_sach_lop(); // Cập nhật lại bảng

    } catch (error) {
        alert("Lỗi khi xóa lớp: " + error.message);
    }
}

// Hàm 4.12: Hiện Form Chỉnh sửa lớp học
async function ham_4_12_hien_form_sua_lop(maLop) {
    const lop = BangLopState.duLieu.find(l => l.ma_lop === maLop);
    if (!lop) return;

    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
    vungLamViec.innerHTML = `<p style="text-align: center;">Đang tải dữ liệu lớp và học sinh...</p>`;

    try {
        // Tải danh sách học sinh mới nhất đổ vào biến _dsHocSinhGoc
        const { data } = await _supabase
            .from('hoc_sinh')
            .select('uid, ten, sdt, truong')
            .eq('vai_tro', 'hocsinh')
            .order('ten', { ascending: true });

        _dsHocSinhGoc = data || []; // Gán vào biến toàn cục đã khai báo ở Bước 1

        // Chuẩn bị mảng ID học sinh cũ để nạp vào hàm Search
        const mảngIdCũ = JSON.stringify(lop.hoc_sinh_ids || []);

        vungLamViec.innerHTML = `
            <div style="max-width: 750px; background: #ffffff; padding: 25px; border-radius: 12px; border: 1px solid #e0e0e0; margin: 0 auto;">
                <h3 style="color: #f39c12; border-bottom: 2px solid #f1f3f4; padding-bottom: 10px;">CHỈNH SỬA LỚP HỌC: ${lop.ten_lop} (${maLop})</h3>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
                    <div>
                        <label style="font-weight: bold; font-size: 14px;">Mã lớp (Cố định):</label>
                        <input type="text" value="${maLop}" readonly style="width: 100%; padding: 10px; background: #f1f3f4; border-radius: 6px; color: #666; font-weight: bold; box-sizing: border-box; border: 1px solid #ddd;">
                    </div>
                    <div>
                        <label style="font-weight: bold; font-size: 14px;">Trạng thái lớp:</label>
                        <select id="selTrangThaiLopSua" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px;">
                            <option value="1" ${lop.trang_thai == 1 ? 'selected' : ''}>1 - Đang mở</option>
                            <option value="0" ${lop.trang_thai == 0 ? 'selected' : ''}>0 - Đóng lớp</option>
                        </select>
                    </div>
                    <div style="grid-column: span 2;">
                        <label style="font-weight: bold; font-size: 14px; color: #1a73e8;">Tên lớp học (*):</label>
                        <input type="text" id="txtTenLopSua" value="${lop.ten_lop}" style="width: 100%; padding: 10px; border: 2px solid #1a73e8; border-radius: 6px; box-sizing: border-box;">
                    </div>
                </div>

                <div style="margin-bottom: 20px; padding: 15px; border: 1px dashed #1a73e8; border-radius: 8px; background: #f8fbff;">
                    <label style="font-weight: bold; font-size: 14px; color: #1a73e8; display: block; margin-bottom: 10px;">Danh sách học sinh (Tích chọn để thay đổi):</label>
                    
                    <input type="text" oninput="ham_4_15_loc_hoc_sinh_sua_lop(this.value, '${mảngIdCũ}')" 
                           placeholder="🔍 Tìm tên hoặc SĐT..." 
                           style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; margin-bottom: 10px; box-sizing: border-box;">

                    <div id="vung-chon-hs-sua" style="max-height: 250px; overflow-y: auto; border: 1px solid #eee; padding: 10px; border-radius: 4px; background: white;">
                        ${ham_4_12_b_tao_list_hs_sua(_dsHocSinhGoc, lop.hoc_sinh_ids || [])}
                    </div>
                </div>

                <div style="display: flex; gap: 12px;">
                    <button onclick="ham_4_13_luu_cap_nhat_lop('${maLop}', this)" style="flex: 2; padding: 12px; background: #f39c12; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">
                        LƯU THAY ĐỔI
                    </button>
                    <button onclick="ham_4_1_ve_quan_ly_lop()" style="flex: 1; padding: 12px; background: #f1f3f4; border: 1px solid #dadce0; border-radius: 6px; cursor: pointer;">
                        HỦY BỎ
                    </button>
                </div>
            </div>
        `;
    } catch (error) {
        vungLamViec.innerHTML = `<p style="color: red;">Lỗi: ${error.message}</p>`;
    }
}

// Hàm 4.15: Lọc tìm kiếm học sinh ngay tại chỗ cho Form Sửa Lớp
function ham_4_15_loc_hoc_sinh_sua_lop(keyword, chuoiIdsDaCo) {
    const idsDaCo = JSON.parse(chuoiIdsDaCo || '[]');
    const key = keyword.toLowerCase().trim();
    const vungList = document.getElementById('vung-chon-hs-sua');

    // Lọc từ biến gốc
    const dsLoc = _dsHocSinhGoc.filter(hs =>
        hs.ten.toLowerCase().includes(key) ||
        (hs.sdt && hs.sdt.includes(key))
    );

    // Vẽ lại danh sách đã lọc (vẫn truyền idsDaCo để giữ dấu tick)
    vungList.innerHTML = ham_4_12_b_tao_list_hs_sua(dsLoc, idsDaCo);
}

// Hàm 4.12.b: Tạo HTML danh sách checkbox
function ham_4_12_b_tao_list_hs_sua(danhSach, idsDaCo) {
    if (danhSach.length === 0) return '<p style="font-size: 12px; color: #999;">Không có dữ liệu...</p>';

    return danhSach.map(hs => {
        // Kiểm tra xem ID của học sinh này có nằm trong mảng của lớp không
        const isChecked = idsDaCo.includes(hs.uid) ? 'checked' : '';
        return `
            <div style="padding: 6px 0; border-bottom: 1px solid #f0f0f0; display: flex; align-items: center;">
                <input type="checkbox" class="chk-hs-sua-lop" value="${hs.uid}" id="sua_hs_${hs.uid}" ${isChecked} style="margin-right: 10px; transform: scale(1.2);">
                <label for="sua_hs_${hs.uid}" style="cursor: pointer; font-size: 14px;">
                    <span style="font-weight: bold;">${hs.ten}</span> 
                    <span style="color: #666; font-size: 12px;"> - SĐT: ${hs.sdt}</span>
                </label>
            </div>
        `;
    }).join('');
}



// ==============================================================
// Hàm 4.13: Lưu cập nhật toàn diện lớp học (CÓ ĐỒNG BỘ HỌC SINH)
// ==============================================================
async function ham_4_13_luu_cap_nhat_lop(maLop, btn) {
    const tenMoi = document.getElementById('txtTenLopSua').value.trim();
    const trangThaiMoi = parseInt(document.getElementById('selTrangThaiLopSua').value);

    // Lấy danh sách UID học sinh mới sau khi thầy tích/bỏ tích
    const nodes = document.querySelectorAll('.chk-hs-sua-lop:checked');
    const mangUidMoi = Array.from(nodes).map(node => node.value);

    if (!tenMoi) return alert("Thầy vui lòng không để trống Tên lớp!");

    btn.disabled = true;
    btn.innerText = "⏳ ĐANG ĐỒNG BỘ...";

    try {
        // BƯỚC 1: LẤY DỮ LIỆU LỚP CŨ ĐỂ TÌM SỰ THAY ĐỔI (AI VÀO, AI RA)
        const { data: lopCu } = await _supabase
            .from('lop_hoc')
            .select('hoc_sinh_ids')
            .eq('ma_lop', maLop)
            .single();

        const mangUidCu = lopCu?.hoc_sinh_ids || [];

        // BƯỚC 2: CẬP NHẬT THÔNG TIN VÀO BẢNG 'lop_hoc'
        const { error: errLop } = await _supabase
            .from('lop_hoc')
            .update({
                ten_lop: tenMoi,
                trang_thai: trangThaiMoi,
                hoc_sinh_ids: mangUidMoi // Truyền mảng trực tiếp
            })
            .eq('ma_lop', maLop);

        if (errLop) throw errLop;

        // BƯỚC 3: ĐỒNG BỘ HỒ SƠ CHO TỪNG HỌC SINH (Tìm ai thêm, ai bị loại)
        const dsThem = mangUidMoi.filter(id => !mangUidCu.includes(id));
        const dsLoai = mangUidCu.filter(id => !mangUidMoi.includes(id));
        const tatCaHsAnhHuong = [...new Set([...dsThem, ...dsLoai])];

        if (tatCaHsAnhHuong.length > 0) {
            for (const uid of tatCaHsAnhHuong) {
                // Lấy mảng mã lớp hiện tại của học sinh
                const { data: hsData } = await _supabase
                    .from('hoc_sinh')
                    .select('danh_sach_ma_lop')
                    .eq('uid', uid)
                    .single();

                let dsLopCuaHS = hsData?.danh_sach_ma_lop || [];
                if (!Array.isArray(dsLopCuaHS)) dsLopCuaHS = [];

                if (dsThem.includes(uid)) {
                    // Nếu là học sinh mới được tích: Ghi danh
                    if (!dsLopCuaHS.includes(maLop)) dsLopCuaHS.push(maLop);
                } else if (dsLoai.includes(uid)) {
                    // Nếu là học sinh bị bỏ tích: Xóa mã lớp này đi
                    dsLopCuaHS = dsLopCuaHS.filter(m => m !== maLop);
                }

                // Cập nhật lại vào Database
                await _supabase
                    .from('hoc_sinh')
                    .update({ danh_sach_ma_lop: dsLopCuaHS })
                    .eq('uid', uid);
            }
        }

        alert(`✅ Đã cập nhật thành công lớp ${maLop} và đồng bộ học sinh!`);

        // BƯỚC 4: VỀ GIAO DIỆN CHÍNH RỒI MỚI TẢI LẠI (Fix dứt điểm lỗi null)
        ham_4_1_ve_quan_ly_lop(); // Dựng lại HTML chứa id 'danh-sach-lop-render'
        ham_4_4_tai_danh_sach_lop(); // Lúc này gọi load dữ liệu là an toàn 100%

    } catch (error) {
        alert("Lỗi cập nhật: " + error.message);
    } finally {
        btn.disabled = false;
        btn.innerText = "LƯU THAY ĐỔI";
    }
}


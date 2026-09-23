
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


// // Hàm 4.4: Lấy dữ liệu và gọi hàm Vẽ bảng (Bản FIX lỗi Null)
// async function ham_4_4_tai_danh_sach_lop() {
//     try {
//         const { data: dsLop, error } = await _supabase.from('lop_hoc').select('*');
//         if (error) throw error;

//         const danhSachUidGv = [...new Set((dsLop || []).map(l => l.uid_gv_tao).filter(id => id))];
//         let tuDienTenGv = {};

//         if (danhSachUidGv.length > 0) {
//             const { data: dsGv } = await _supabase.from('hoc_sinh').select('uid, ten').in('uid', danhSachUidGv);
//             if (dsGv) {
//                 dsGv.forEach(gv => tuDienTenGv[gv.uid] = gv.ten);
//             }
//         }

//         BangLopState.duLieu = (dsLop || []).map(lop => ({
//             ...lop,
//             ten_gv_tao: tuDienTenGv[lop.uid_gv_tao] || 'Hệ thống'
//         }));

//         // Gọi hàm vẽ bảng
//         ham_4_10_ve_bang_du_lieu();

//     } catch (error) {
//         console.error("Lỗi tải danh sách lớp:", error.message);

//         // 🌟 KIỂM TRA AN TOÀN TRƯỚC KHI GÁN INNERHTML
//         const khungRender = document.getElementById('danh-sach-lop-render');
//         if (khungRender) {
//             khungRender.innerHTML = `<p style="color: red;">Lỗi: ${error.message}</p>`;
//         } else {
//             // Nếu không tìm thấy khung render, có thể báo qua alert hoặc console
//             alert("Lỗi tải danh sách lớp: " + error.message);
//         }
//     }
// }


// Hàm 4.4: Lấy dữ liệu và gọi hàm Vẽ bảng (Sĩ số Real-time đếm từ bảng hoc_sinh)
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

        // 🌟 BƯỚC MỚI: Truy vấn một lượt toàn bộ học sinh để đếm sĩ số chuẩn
        const { data: dsTatCaHS, error: errHS } = await _supabase.from('hoc_sinh').select('uid, danh_sach_ma_lop').eq('vai_tro', 'hocsinh');
        if (errHS) throw errHS;

        BangLopState.duLieu = (dsLop || []).map(lop => {
            // ĐẾM SĨ SỐ THỰC TẾ: Lọc ra những HS mà danh_sach_ma_lop chứa mã lớp hiện tại
            let siSoThucTe = 0;
            if (dsTatCaHS) {
                siSoThucTe = dsTatCaHS.filter(hs => {
                    let dLop = hs.danh_sach_ma_lop;
                    if (Array.isArray(dLop)) return dLop.includes(lop.ma_lop);
                    if (typeof dLop === 'string') return dLop.includes(lop.ma_lop);
                    return false;
                }).length;
            }

            return {
                ...lop,
                ten_gv_tao: tuDienTenGv[lop.uid_gv_tao] || 'Hệ thống',
                si_so_realtime: siSoThucTe // Gắn thêm trường sĩ số thực tế để lát nữa Sort và In ra bảng
            };
        });

        // Gọi hàm vẽ bảng
        ham_4_10_ve_bang_du_lieu();

    } catch (error) {
        console.error("Lỗi tải danh sách lớp:", error.message);
        const khungRender = document.getElementById('danh-sach-lop-render');
        if (khungRender) {
            khungRender.innerHTML = `<p style="color: red;">Lỗi: ${error.message}</p>`;
        } else {
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


// // Hàm 4.10: Vẽ bảng (Cho phép Sort tất cả các cột)
// function ham_4_10_ve_bang_du_lieu() {
//     const renderArea = document.getElementById('danh-sach-lop-render');
//     let dsLop = [...BangLopState.duLieu];

//     // Thuật toán Sắp xếp
//     const cot = BangLopState.cotDangSort;
//     const heSo = BangLopState.tangDan ? 1 : -1;

//     dsLop.sort((a, b) => {
//         let valA = a[cot] === null || a[cot] === undefined ? '' : a[cot];
//         let valB = b[cot] === null || b[cot] === undefined ? '' : b[cot];

//         // Nếu là chuỗi thì đưa về chữ thường để so sánh chuẩn
//         if (typeof valA === 'string') valA = valA.toLowerCase();
//         if (typeof valB === 'string') valB = valB.toLowerCase();

//         if (valA < valB) return -1 * heSo;
//         if (valA > valB) return 1 * heSo;
//         return 0;
//     });

//     const iconSort = BangLopState.tangDan ? ' ▲' : ' ▼';
//     const getIcon = (tenCot) => (cot === tenCot ? iconSort : ' ↕');

//     let htmlTable = `
//         <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05); font-size: 14px;">
//             <thead>
//                 <tr style="background: #f8f9fa; text-align: left; border-bottom: 2px solid #dee2e6; cursor: pointer; white-space: nowrap;">
//                     <th style="padding: 12px; border: 1px solid #eee; width: 50px; text-align: center;">STT</th>
//                     <th style="padding: 12px; border: 1px solid #eee;" onclick="ham_4_11_thay_doi_sort('ma_lop')">Mã Lớp ${getIcon('ma_lop')}</th>
//                     <th style="padding: 12px; border: 1px solid #eee;" onclick="ham_4_11_thay_doi_sort('ten_lop')">Tên Lớp ${getIcon('ten_lop')}</th>
//                     <th style="padding: 12px; border: 1px solid #eee;" onclick="ham_4_11_thay_doi_sort('ten_gv_tao')">GV Tạo ${getIcon('ten_gv_tao')}</th>
//                     <th style="padding: 12px; border: 1px solid #eee;" onclick="ham_4_11_thay_doi_sort('ngay_tao')">Ngày Tạo ${getIcon('ngay_tao')}</th>
//                     <th style="padding: 12px; border: 1px solid #eee; text-align: center;" onclick="ham_4_11_thay_doi_sort('hoc_sinh_ids')">Sĩ số ${getIcon('hoc_sinh_ids')}</th>
//                     <th style="padding: 12px; border: 1px solid #eee; text-align: center;" onclick="ham_4_11_thay_doi_sort('trang_thai')">Trạng thái ${getIcon('trang_thai')}</th>
//                     <th style="padding: 12px; border: 1px solid #eee; text-align: center;">Thao tác</th>
//                 </tr>
//             </thead>
//             <tbody>
//     `;

//     dsLop.forEach((lop, index) => {
//         const ngayGio = new Date(lop.ngay_tao).toLocaleString('vi-VN');
//         const siSo = lop.hoc_sinh_ids ? lop.hoc_sinh_ids.length : 0;
//         const nhãnTrạngThái = lop.trang_thai == 1
//             ? `<span style="color: #28a745; font-weight: bold;">● Mở</span>`
//             : `<span style="color: #dc3545; font-weight: bold;">● Đóng</span>`;

//         htmlTable += `
//             <tr style="border-bottom: 1px solid #eee; cursor: pointer;" onmouseover="this.style.background='#f1f8ff'" onmouseout="this.style.background='white'" onclick="ham_4_9_xem_chi_tiet_lop('${lop.ma_lop}')">
//                 <td style="padding: 10px; border: 1px solid #eee; text-align: center;">${index + 1}</td>
//                 <td style="padding: 10px; border: 1px solid #eee; font-weight: bold; color: #d35400;">${lop.ma_lop}</td>
//                 <td style="padding: 10px; border: 1px solid #eee;">${lop.ten_lop}</td>
//                 <td style="padding: 10px; border: 1px solid #eee;">${lop.ten_gv_tao}</td>
//                 <td style="padding: 10px; border: 1px solid #eee;">${ngayGio}</td>
//                 <td style="padding: 10px; border: 1px solid #eee; text-align: center;">${siSo}</td>
//                 <td style="padding: 10px; border: 1px solid #eee; text-align: center;">${nhãnTrạngThái}</td>
//                 <td style="padding: 10px; border: 1px solid #eee; text-align: center; white-space: nowrap;" onclick="event.stopPropagation()">
//                     <button onclick="ham_4_12_hien_form_sua_lop('${lop.ma_lop}')" style="padding: 6px 12px; background: #f39c12; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; margin-right: 8px; box-shadow: 0 2px 4px rgba(243, 156, 18, 0.2);">
//                         Sửa
//                     </button>
//                     <button onclick="ham_4_14_xoa_lop('${lop.ma_lop}')" style="padding: 6px 12px; background: #dc3545; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; box-shadow: 0 2px 4px rgba(220, 53, 69, 0.2);">
//                         Xóa
//                     </button>
//                 </td>
//             </tr>
//         `;
//     });

//     htmlTable += `</tbody></table>`;
//     renderArea.innerHTML = htmlTable;
// }


// Hàm 4.10: Vẽ bảng (Cho phép Sort tất cả các cột - Bao gồm cột Sĩ số thực tế)
function ham_4_10_ve_bang_du_lieu() {
    const renderArea = document.getElementById('danh-sach-lop-render');
    let dsLop = [...BangLopState.duLieu];

    // Thuật toán Sắp xếp
    const cot = BangLopState.cotDangSort;
    const heSo = BangLopState.tangDan ? 1 : -1;

    dsLop.sort((a, b) => {
        let valA = a[cot] === null || a[cot] === undefined ? '' : a[cot];
        let valB = b[cot] === null || b[cot] === undefined ? '' : b[cot];

        // 🌟 Xử lý đặc biệt nếu đang Sort theo số (Sĩ số)
        if (typeof valA === 'number' && typeof valB === 'number') {
            return (valA - valB) * heSo;
        }

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
                    <!-- 🌟 Gắn Sort vào biến si_so_realtime thay vì mảng hoc_sinh_ids ảo -->
                    <th style="padding: 12px; border: 1px solid #eee; text-align: center;" onclick="ham_4_11_thay_doi_sort('si_so_realtime')">Sĩ số Thực tế ${getIcon('si_so_realtime')}</th>
                    <th style="padding: 12px; border: 1px solid #eee; text-align: center;" onclick="ham_4_11_thay_doi_sort('trang_thai')">Trạng thái ${getIcon('trang_thai')}</th>
                    <th style="padding: 12px; border: 1px solid #eee; text-align: center;">Thao tác</th>
                </tr>
            </thead>
            <tbody>
    `;

    dsLop.forEach((lop, index) => {
        const ngayGio = new Date(lop.ngay_tao).toLocaleString('vi-VN');
        const siSoThucTe = lop.si_so_realtime; // 🌟 Dùng sĩ số thực tế

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
                <td style="padding: 10px; border: 1px solid #eee; text-align: center; font-weight: bold; color: #0056b3;">${siSoThucTe}</td>
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

// // Hàm 4.9: Bấm vào dòng để xem chi tiết Lớp và Danh sách Học sinh
// async function ham_4_9_xem_chi_tiet_lop(maLop) {
//     const lop = BangLopState.duLieu.find(l => l.ma_lop === maLop);
//     if (!lop) return;

//     const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
//     vungLamViec.innerHTML = `<p style="text-align: center;">Đang tải danh sách học sinh của lớp ${maLop}...</p>`;

//     try {
//         let htmlHocSinh = `<p style="color: #666; font-style: italic;">Lớp chưa có học sinh nào.</p>`;

//         // Truy vấn danh sách học sinh có UID nằm trong mảng hoc_sinh_ids của lớp
//         if (lop.hoc_sinh_ids && lop.hoc_sinh_ids.length > 0) {
//             const { data: dsHS, error } = await _supabase
//                 .from('hoc_sinh')
//                 .select('ten, sdt, truong')
//                 .in('uid', lop.hoc_sinh_ids);

//             if (error) throw error;

//             if (dsHS && dsHS.length > 0) {
//                 htmlHocSinh = `<ul style="line-height: 1.8;">`;
//                 dsHS.forEach((hs, idx) => {
//                     htmlHocSinh += `<li><strong>${idx + 1}. ${hs.ten}</strong> - SĐT: ${hs.sdt} - Trường: ${hs.truong || 'Chưa cập nhật'}</li>`;
//                 });
//                 htmlHocSinh += `</ul>`;
//             }
//         }

//         // Định dạng nhãn Trạng thái để hiển thị trong chi tiết
//         const nhãnTrạngThái = lop.trang_thai == 1
//             ? `<span style="color: #28a745; font-weight: bold;">✅ Đang mở (Hoạt động)</span>`
//             : `<span style="color: #dc3545; font-weight: bold;">❌ Đang đóng (Tạm dừng)</span>`;

//         vungLamViec.innerHTML = `
//             <div style="background: white; padding: 25px; border-radius: 10px; border: 1px solid #1a73e8; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
//                 <h3 style="color: #1a73e8; margin-top: 0; border-bottom: 2px solid #eee; padding-bottom: 10px;">
//                     Thông tin chi tiết lớp: ${lop.ten_lop} (${lop.ma_lop})
//                 </h3>
                
//                 <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 15px;">
//                     <p style="margin: 5px 0;"><strong>Ngày giờ tạo:</strong> ${new Date(lop.ngay_tao).toLocaleString('vi-VN')}</p>
//                     <p style="margin: 5px 0;"><strong>Giáo viên tạo:</strong> ${lop.ten_gv_tao}</p>
                    
//                     <p style="margin: 5px 0;"><strong>Trạng thái lớp:</strong> ${nhãnTrạngThái}</p>
                    
//                     <p style="margin: 5px 0;"><strong>Sĩ số hiện tại:</strong> ${lop.hoc_sinh_ids ? lop.hoc_sinh_ids.length : 0} học sinh</p>
//                 </div>

//                 <hr style="border: 0; border-top: 1px dashed #ccc; margin: 15px 0;">
//                 <h4 style="color: #d35400; margin-bottom: 10px;">👥 Danh sách Học sinh tham gia:</h4>
//                 <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; border: 1px solid #f0f0f0;">
//                     ${htmlHocSinh}
//                 </div>

//                 <div style="margin-top: 25px; display: flex; gap: 10px;">
//                     <button onclick="ham_4_1_ve_quan_ly_lop()" style="padding: 10px 20px; background: #6c757d; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;">
//                         ⬅ Quay Lại
//                     </button>
//                     <button onclick="ham_4_12_hien_form_sua_lop('${lop.ma_lop}')" style="padding: 10px 20px; background: #f39c12; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;">
//                         ✏️ Chỉnh sửa lớp này
//                     </button>
//                 </div>
//             </div>
//         `;

//     } catch (error) {
//         vungLamViec.innerHTML = `<p style="color: red;">Lỗi tải chi tiết: ${error.message}</p>
//                                  <button onclick="ham_4_1_ve_quan_ly_lop()" style="padding: 10px 20px; background: #6c757d; color: white; border: none; border-radius: 6px; cursor: pointer;">Quay lại</button>`;
//     }
// }


// =====================================================================
// KHỞI TẠO BIẾN LƯU TRỮ TRẠNG THÁI CHO MÀN HÌNH CHI TIẾT LỚP
// =====================================================================
window.ChiTietLopState = {
    maLop: '',
    tenLop: '',
    dsTrong: [],
    dsNgoai: []
};

// // =====================================================================
// // HÀM 4.9: XEM CHI TIẾT LỚP VÀ ĐIỀU PHỐI HỌC SINH (GIAO DIỆN 2 CỘT)
// // =====================================================================
// window.ham_4_9_xem_chi_tiet_lop = async function (maLop) {
//     const lop = BangLopState.duLieu.find(l => l.ma_lop === maLop);
//     if (!lop) return;

//     const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
//     vungLamViec.innerHTML = `<div style="text-align: center; padding: 40px; color: #007bff; font-size: 16px;"><b>⏳ Đang tải toàn bộ dữ liệu học sinh để đối chiếu...</b></div>`;

//     try {
//         // 1. LẤY TẤT CẢ HỌC SINH TỪ DATABASE
//         const { data: dsHS, error } = await _supabase
//             .from('hoc_sinh')
//             .select('uid, ten, sdt, truong, danh_sach_ma_lop')
//             .eq('vai_tro', 'hocsinh')
//             .order('ten', { ascending: true });

//         if (error) throw error;

//         let dsTrong = [];
//         let dsNgoai = [];

//         // 2. PHÂN LOẠI HỌC SINH VÀO 2 NHÓM
//         if (dsHS) {
//             dsHS.forEach(hs => {
//                 let dLop = hs.danh_sach_ma_lop || [];
//                 let isTrongLop = false;

//                 if (Array.isArray(dLop)) {
//                     isTrongLop = dLop.includes(maLop);
//                 } else if (typeof dLop === 'string') {
//                     isTrongLop = dLop.includes(maLop);
//                 }

//                 if (isTrongLop) {
//                     dsTrong.push(hs);
//                 } else {
//                     dsNgoai.push(hs);
//                 }
//             });
//         }

//         // Lưu vào State để dùng cho Live Search
//         window.ChiTietLopState = { maLop: maLop, tenLop: lop.ten_lop, dsTrong, dsNgoai };

//         // 3. VẼ KHUNG GIAO DIỆN CHÍNH
//         vungLamViec.innerHTML = `
//             <div style="background: white; padding: 25px; border-radius: 10px; border: 1px solid #1a73e8; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
//                 <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #eee; padding-bottom: 10px; margin-bottom: 15px;">
//                     <h3 style="color: #1a73e8; margin: 0; display: flex; align-items: center; gap: 10px;">
//                         🏫 CHI TIẾT LỚP: ${lop.ten_lop} (${maLop})
//                     </h3>
//                     <button onclick="ham_4_4_tai_danh_sach_lop(); ham_4_1_ve_quan_ly_lop();" style="padding: 8px 15px; background: #6c757d; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
//                         ⬅ Quay Lại Bảng
//                     </button>
//                 </div>

//                 <div style="margin-bottom: 15px;">
//                     <input type="text" id="input-tim-hs-chi-tiet" oninput="ham_4_9_1_render_danh_sach(this.value)" placeholder="🔍 Nhập Tên hoặc SĐT để tìm nhanh học sinh..." style="width: 100%; padding: 12px; border: 2px solid #17a2b8; border-radius: 6px; font-size: 14px; outline: none; box-sizing: border-box; box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);">
//                 </div>

//                 <div style="display: flex; gap: 20px; flex-wrap: wrap;">
//                     <!-- CỘT TRÁI: ĐÃ TRONG LỚP -->
//                     <div style="flex: 1; min-width: 300px; background: #f0fdf4; border: 1px solid #28a745; border-radius: 8px; padding: 15px; display: flex; flex-direction: column;">
//                         <h4 style="color: #155724; margin-top: 0; margin-bottom: 15px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px dashed #28a745; padding-bottom: 8px;">
//                             <span>🎓 ĐÃ TRONG LỚP</span>
//                             <span id="count-trong" style="background: #28a745; color: white; padding: 2px 10px; border-radius: 12px; font-size: 13px;">0</span>
//                         </h4>
//                         <div id="vung-hs-trong-lop" style="overflow-y: auto; max-height: 450px; padding-right: 5px; flex: 1;"></div>
//                     </div>

//                     <!-- CỘT PHẢI: CHƯA VÀO LỚP -->
//                     <div style="flex: 1; min-width: 300px; background: #f8f9fa; border: 1px solid #ced4da; border-radius: 8px; padding: 15px; display: flex; flex-direction: column;">
//                         <h4 style="color: #495057; margin-top: 0; margin-bottom: 15px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px dashed #adb5bd; padding-bottom: 8px;">
//                             <span>🌍 HỌC SINH BÊN NGOÀI</span>
//                             <span id="count-ngoai" style="background: #6c757d; color: white; padding: 2px 10px; border-radius: 12px; font-size: 13px;">0</span>
//                         </h4>
//                         <div id="vung-hs-ngoai-lop" style="overflow-y: auto; max-height: 450px; padding-right: 5px; flex: 1;"></div>
//                     </div>
//                 </div>
//             </div>
//         `;

//         // 4. GỌI HÀM VẼ DANH SÁCH 2 CỘT
//         ham_4_9_1_render_danh_sach();

//     } catch (error) {
//         vungLamViec.innerHTML = `<p style="color: red; text-align: center;">Lỗi tải chi tiết: ${error.message}</p>
//                                  <div style="text-align: center;"><button onclick="ham_4_1_ve_quan_ly_lop()" style="padding: 10px 20px; background: #6c757d; color: white; border: none; border-radius: 6px; cursor: pointer;">Quay lại</button></div>`;
//     }
// };

// // =====================================================================
// // HÀM 4.9: XEM CHI TIẾT LỚP VÀ ĐIỀU PHỐI HỌC SINH (GIAO DIỆN 2 CỘT)
// // =====================================================================
// window.ham_4_9_xem_chi_tiet_lop = async function (maLop) {
//     const lop = BangLopState.duLieu.find(l => l.ma_lop === maLop);
//     if (!lop) return;

//     const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
//     vungLamViec.innerHTML = `<div style="text-align: center; padding: 40px; color: #007bff; font-size: 16px;"><b>⏳ Đang tải toàn bộ dữ liệu học sinh để đối chiếu...</b></div>`;

//     try {
//         const { data: dsHS, error } = await _supabase
//             .from('hoc_sinh')
//             .select('uid, ten, sdt, truong, danh_sach_ma_lop')
//             .eq('vai_tro', 'hocsinh')
//             .order('ten', { ascending: true });

//         if (error) throw error;

//         let dsTrong = [];
//         let dsNgoai = [];

//         if (dsHS) {
//             dsHS.forEach(hs => {
//                 let dLop = hs.danh_sach_ma_lop || [];
//                 let isTrongLop = false;
//                 if (Array.isArray(dLop)) isTrongLop = dLop.includes(maLop);
//                 else if (typeof dLop === 'string') isTrongLop = dLop.includes(maLop);

//                 if (isTrongLop) dsTrong.push(hs);
//                 else dsNgoai.push(hs);
//             });
//         }

//         window.ChiTietLopState = { maLop: maLop, tenLop: lop.ten_lop, dsTrong, dsNgoai };

//         vungLamViec.innerHTML = `
//             <div style="background: white; padding: 25px; border-radius: 10px; border: 1px solid #1a73e8; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
//                 <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #eee; padding-bottom: 10px; margin-bottom: 15px; flex-wrap: wrap; gap: 10px;">
//                     <h3 style="color: #1a73e8; margin: 0; display: flex; align-items: center; gap: 10px;">
//                         🏫 CHI TIẾT LỚP: ${lop.ten_lop} (${maLop})
//                     </h3>
//                     <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                        
//                         <!-- 🌟 NÚT CẬP NHẬT AVATAR ĐỒNG LOẠT -->
//                         <button onclick="window.ham_4_16_popup_cap_nhat_avatar_lop()" style="padding: 8px 15px; background: #6f42c1; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: 0.2s;" onmouseover="this.style.background='#5a32a3'" onmouseout="this.style.background='#6f42c1'">
//                             📸 Cập nhật Avatar cả lớp
//                         </button>
                        
//                         <button onclick="ham_4_4_tai_danh_sach_lop(); ham_4_1_ve_quan_ly_lop();" style="padding: 8px 15px; background: #6c757d; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
//                             ⬅ Quay Lại Bảng
//                         </button>
//                     </div>
//                 </div>

//                 <div style="margin-bottom: 15px;">
//                     <input type="text" id="input-tim-hs-chi-tiet" oninput="ham_4_9_1_render_danh_sach(this.value)" placeholder="🔍 Nhập Tên hoặc SĐT để tìm nhanh học sinh..." style="width: 100%; padding: 12px; border: 2px solid #17a2b8; border-radius: 6px; font-size: 14px; outline: none; box-sizing: border-box; box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);">
//                 </div>

//                 <div style="display: flex; gap: 20px; flex-wrap: wrap;">
//                     <div style="flex: 1; min-width: 300px; background: #f0fdf4; border: 1px solid #28a745; border-radius: 8px; padding: 15px; display: flex; flex-direction: column;">
//                         <h4 style="color: #155724; margin-top: 0; margin-bottom: 15px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px dashed #28a745; padding-bottom: 8px;">
//                             <span>🎓 ĐÃ TRONG LỚP</span>
//                             <span id="count-trong" style="background: #28a745; color: white; padding: 2px 10px; border-radius: 12px; font-size: 13px;">0</span>
//                         </h4>
//                         <div id="vung-hs-trong-lop" style="overflow-y: auto; max-height: 450px; padding-right: 5px; flex: 1;"></div>
//                     </div>
//                     <div style="flex: 1; min-width: 300px; background: #f8f9fa; border: 1px solid #ced4da; border-radius: 8px; padding: 15px; display: flex; flex-direction: column;">
//                         <h4 style="color: #495057; margin-top: 0; margin-bottom: 15px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px dashed #adb5bd; padding-bottom: 8px;">
//                             <span>🌍 HỌC SINH BÊN NGOÀI</span>
//                             <span id="count-ngoai" style="background: #6c757d; color: white; padding: 2px 10px; border-radius: 12px; font-size: 13px;">0</span>
//                         </h4>
//                         <div id="vung-hs-ngoai-lop" style="overflow-y: auto; max-height: 450px; padding-right: 5px; flex: 1;"></div>
//                     </div>
//                 </div>
//             </div>
//         `;

//         ham_4_9_1_render_danh_sach();
//     } catch (error) {
//         vungLamViec.innerHTML = `<p style="color: red; text-align: center;">Lỗi tải chi tiết: ${error.message}</p>
//                                  <div style="text-align: center;"><button onclick="ham_4_1_ve_quan_ly_lop()" style="padding: 10px 20px; background: #6c757d; color: white; border: none; border-radius: 6px; cursor: pointer;">Quay lại</button></div>`;
//     }
// };


// // =====================================================================
// // HÀM 4.9: XEM CHI TIẾT LỚP VÀ ĐIỀU PHỐI HỌC SINH (BỔ SUNG TRUY VẤN AVATAR)
// // =====================================================================
// window.ham_4_9_xem_chi_tiet_lop = async function (maLop) {
//     const lop = BangLopState.duLieu.find(l => l.ma_lop === maLop);
//     if (!lop) return;

//     const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
//     vungLamViec.innerHTML = `<div style="text-align: center; padding: 40px; color: #007bff; font-size: 16px;"><b>⏳ Đang tải toàn bộ dữ liệu học sinh để đối chiếu...</b></div>`;

//     try {
//         // 🌟 Đã bổ sung thêm trường 'anh_dai_dien' vào câu truy vấn
//         const { data: dsHS, error } = await _supabase
//             .from('hoc_sinh')
//             .select('uid, ten, sdt, truong, danh_sach_ma_lop, anh_dai_dien')
//             .eq('vai_tro', 'hocsinh')
//             .order('ten', { ascending: true });

//         if (error) throw error;

//         let dsTrong = [];
//         let dsNgoai = [];

//         if (dsHS) {
//             dsHS.forEach(hs => {
//                 let dLop = hs.danh_sach_ma_lop || [];
//                 let isTrongLop = false;
//                 if (Array.isArray(dLop)) isTrongLop = dLop.includes(maLop);
//                 else if (typeof dLop === 'string') isTrongLop = dLop.includes(maLop);

//                 if (isTrongLop) dsTrong.push(hs);
//                 else dsNgoai.push(hs);
//             });
//         }

//         window.ChiTietLopState = { maLop: maLop, tenLop: lop.ten_lop, dsTrong, dsNgoai };

//         vungLamViec.innerHTML = `
//             <div style="background: white; padding: 25px; border-radius: 10px; border: 1px solid #1a73e8; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
//                 <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #eee; padding-bottom: 10px; margin-bottom: 15px; flex-wrap: wrap; gap: 10px;">
//                     <h3 style="color: #1a73e8; margin: 0; display: flex; align-items: center; gap: 10px;">
//                         🏫 CHI TIẾT LỚP: ${lop.ten_lop} (${maLop})
//                     </h3>
//                     <div style="display: flex; gap: 10px; flex-wrap: wrap;">
//                         <button onclick="window.ham_4_16_popup_cap_nhat_avatar_lop()" style="padding: 8px 15px; background: #6f42c1; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: 0.2s;" onmouseover="this.style.background='#5a32a3'" onmouseout="this.style.background='#6f42c1'">
//                             📸 Cập nhật Avatar cả lớp
//                         </button>
//                         <button onclick="ham_4_4_tai_danh_sach_lop(); ham_4_1_ve_quan_ly_lop();" style="padding: 8px 15px; background: #6c757d; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
//                             ⬅ Quay Lại Bảng
//                         </button>
//                     </div>
//                 </div>

//                 <div style="margin-bottom: 15px;">
//                     <input type="text" id="input-tim-hs-chi-tiet" oninput="ham_4_9_1_render_danh_sach(this.value)" placeholder="🔍 Nhập Tên hoặc SĐT để tìm nhanh học sinh..." style="width: 100%; padding: 12px; border: 2px solid #17a2b8; border-radius: 6px; font-size: 14px; outline: none; box-sizing: border-box; box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);">
//                 </div>

//                 <div style="display: flex; gap: 20px; flex-wrap: wrap;">
//                     <div style="flex: 1; min-width: 300px; background: #f0fdf4; border: 1px solid #28a745; border-radius: 8px; padding: 15px; display: flex; flex-direction: column;">
//                         <h4 style="color: #155724; margin-top: 0; margin-bottom: 15px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px dashed #28a745; padding-bottom: 8px;">
//                             <span>🎓 ĐÃ TRONG LỚP</span>
//                             <span id="count-trong" style="background: #28a745; color: white; padding: 2px 10px; border-radius: 12px; font-size: 13px;">0</span>
//                         </h4>
//                         <div id="vung-hs-trong-lop" style="overflow-y: auto; max-height: 450px; padding-right: 5px; flex: 1;"></div>
//                     </div>
//                     <div style="flex: 1; min-width: 300px; background: #f8f9fa; border: 1px solid #ced4da; border-radius: 8px; padding: 15px; display: flex; flex-direction: column;">
//                         <h4 style="color: #495057; margin-top: 0; margin-bottom: 15px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px dashed #adb5bd; padding-bottom: 8px;">
//                             <span>🌍 HỌC SINH BÊN NGOÀI</span>
//                             <span id="count-ngoai" style="background: #6c757d; color: white; padding: 2px 10px; border-radius: 12px; font-size: 13px;">0</span>
//                         </h4>
//                         <div id="vung-hs-ngoai-lop" style="overflow-y: auto; max-height: 450px; padding-right: 5px; flex: 1;"></div>
//                     </div>
//                 </div>
//             </div>
//         `;

//         ham_4_9_1_render_danh_sach();
//     } catch (error) {
//         vungLamViec.innerHTML = `<p style="color: red; text-align: center;">Lỗi tải chi tiết: ${error.message}</p>
//                                  <div style="text-align: center;"><button onclick="ham_4_1_ve_quan_ly_lop()" style="padding: 10px 20px; background: #6c757d; color: white; border: none; border-radius: 6px; cursor: pointer;">Quay lại</button></div>`;
//     }
// };


// =====================================================================
// HÀM 4.9: XEM CHI TIẾT LỚP (TÍCH HỢP BIẾN TRẠNG THÁI SORT)
// =====================================================================
window.ham_4_9_xem_chi_tiet_lop = async function (maLop) {
    const lop = BangLopState.duLieu.find(l => l.ma_lop === maLop);
    if (!lop) return;

    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
    vungLamViec.innerHTML = `<div style="text-align: center; padding: 40px; color: #007bff; font-size: 16px;"><b>⏳ Đang tải toàn bộ dữ liệu học sinh để đối chiếu...</b></div>`;

    try {
        const { data: dsHS, error } = await _supabase
            .from('hoc_sinh')
            .select('uid, ten, sdt, truong, danh_sach_ma_lop, anh_dai_dien')
            .eq('vai_tro', 'hocsinh');

        if (error) throw error;

        let dsTrong = [];
        let dsNgoai = [];

        if (dsHS) {
            dsHS.forEach(hs => {
                let dLop = hs.danh_sach_ma_lop || [];
                let isTrongLop = false;
                if (Array.isArray(dLop)) isTrongLop = dLop.includes(maLop);
                else if (typeof dLop === 'string') isTrongLop = dLop.includes(maLop);

                if (isTrongLop) dsTrong.push(hs);
                else dsNgoai.push(hs);
            });
        }

        // 🌟 Nạp biến trạng thái Sắp xếp Mặc định là A-Z
        window.ChiTietLopState = {
            maLop: maLop,
            tenLop: lop.ten_lop,
            dsTrong,
            dsNgoai,
            sortTrong: 'asc',
            sortNgoai: 'asc'
        };

        vungLamViec.innerHTML = `
            <div style="background: white; padding: 25px; border-radius: 10px; border: 1px solid #1a73e8; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #eee; padding-bottom: 10px; margin-bottom: 15px; flex-wrap: wrap; gap: 10px;">
                    <h3 style="color: #1a73e8; margin: 0; display: flex; align-items: center; gap: 10px;">
                        🏫 CHI TIẾT LỚP: ${lop.ten_lop} (${maLop})
                    </h3>
                    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                        <button onclick="window.ham_4_16_popup_cap_nhat_avatar_lop()" style="padding: 8px 15px; background: #6f42c1; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: 0.2s;" onmouseover="this.style.background='#5a32a3'" onmouseout="this.style.background='#6f42c1'">
                            📸 Cập nhật Avatar cả lớp
                        </button>
                        <button onclick="ham_4_4_tai_danh_sach_lop(); ham_4_1_ve_quan_ly_lop();" style="padding: 8px 15px; background: #6c757d; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                            ⬅ Quay Lại Bảng
                        </button>
                    </div>
                </div>

                <div style="margin-bottom: 15px;">
                    <input type="text" id="input-tim-hs-chi-tiet" oninput="ham_4_9_1_render_danh_sach(this.value)" placeholder="🔍 Nhập Tên hoặc SĐT để tìm nhanh học sinh..." style="width: 100%; padding: 12px; border: 2px solid #17a2b8; border-radius: 6px; font-size: 14px; outline: none; box-sizing: border-box; box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);">
                </div>

                <div style="display: flex; gap: 20px; flex-wrap: wrap;">
                    <!-- CỘT TRÁI -->
                    <div style="flex: 1; min-width: 300px; background: #f0fdf4; border: 1px solid #28a745; border-radius: 8px; padding: 15px; display: flex; flex-direction: column;">
                        <h4 style="color: #155724; margin-top: 0; margin-bottom: 15px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px dashed #28a745; padding-bottom: 8px;">
                            <span style="display: flex; align-items: center; gap: 8px;">
                                🎓 ĐÃ TRONG LỚP
                                <button id="btn-sort-trong" onclick="window.ham_4_9_4_dao_chieu_sort('trong')" style="background: #e8f5e9; border: 1px solid #28a745; color: #155724; border-radius: 4px; padding: 2px 8px; font-size: 11px; cursor: pointer; font-weight: bold; transition: 0.2s;" onmouseover="this.style.background='#c3e6cb'" onmouseout="this.style.background='#e8f5e9'" title="Đảo chiều sắp xếp">⬇️ A-Z</button>
                            </span>
                            <span id="count-trong" style="background: #28a745; color: white; padding: 2px 10px; border-radius: 12px; font-size: 13px;">0</span>
                        </h4>
                        <div id="vung-hs-trong-lop" style="overflow-y: auto; max-height: 450px; padding-right: 5px; flex: 1;"></div>
                    </div>

                    <!-- CỘT PHẢI -->
                    <div style="flex: 1; min-width: 300px; background: #f8f9fa; border: 1px solid #ced4da; border-radius: 8px; padding: 15px; display: flex; flex-direction: column;">
                        <h4 style="color: #495057; margin-top: 0; margin-bottom: 15px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px dashed #adb5bd; padding-bottom: 8px;">
                            <span style="display: flex; align-items: center; gap: 8px;">
                                🌍 HS BÊN NGOÀI
                                <button id="btn-sort-ngoai" onclick="window.ham_4_9_4_dao_chieu_sort('ngoai')" style="background: #e9ecef; border: 1px solid #adb5bd; color: #495057; border-radius: 4px; padding: 2px 8px; font-size: 11px; cursor: pointer; font-weight: bold; transition: 0.2s;" onmouseover="this.style.background='#dee2e6'" onmouseout="this.style.background='#e9ecef'" title="Đảo chiều sắp xếp">⬇️ A-Z</button>
                            </span>
                            <span id="count-ngoai" style="background: #6c757d; color: white; padding: 2px 10px; border-radius: 12px; font-size: 13px;">0</span>
                        </h4>
                        <div id="vung-hs-ngoai-lop" style="overflow-y: auto; max-height: 450px; padding-right: 5px; flex: 1;"></div>
                    </div>
                </div>
            </div>
        `;

        ham_4_9_1_render_danh_sach();
    } catch (error) {
        vungLamViec.innerHTML = `<p style="color: red; text-align: center;">Lỗi tải chi tiết: ${error.message}</p>
                                 <div style="text-align: center;"><button onclick="ham_4_1_ve_quan_ly_lop()" style="padding: 10px 20px; background: #6c757d; color: white; border: none; border-radius: 6px; cursor: pointer;">Quay lại</button></div>`;
    }
};



// // =====================================================================
// // HÀM 4.9.1: RENDER DANH SÁCH 2 CỘT (CÓ HIỂN THỊ AVATAR MINI)
// // =====================================================================
// window.ham_4_9_1_render_danh_sach = function (keyword = '') {
//     let key = keyword.toLowerCase().trim();
//     const vungTrong = document.getElementById('vung-hs-trong-lop');
//     const vungNgoai = document.getElementById('vung-hs-ngoai-lop');

//     // Lọc danh sách theo từ khóa
//     let locTrong = window.ChiTietLopState.dsTrong.filter(hs => hs.ten.toLowerCase().includes(key) || (hs.sdt && hs.sdt.includes(key)));
//     let locNgoai = window.ChiTietLopState.dsNgoai.filter(hs => hs.ten.toLowerCase().includes(key) || (hs.sdt && hs.sdt.includes(key)));

//     // Cập nhật con số sĩ số
//     document.getElementById('count-trong').innerText = locTrong.length;
//     document.getElementById('count-ngoai').innerText = locNgoai.length;

//     // 🌟 RENDER CỘT TRONG LỚP
//     let htmlTrong = '';
//     if (locTrong.length === 0) {
//         htmlTrong = `<div style="text-align: center; color: #6c757d; font-size: 13px; font-style: italic; padding: 20px;">Không có học sinh nào khớp</div>`;
//     } else {
//         locTrong.forEach((hs, idx) => {
//             // Xác định Avatar hiện tại hoặc lấy ảnh Random chữa cháy
//             let avatarUrl = hs.anh_dai_dien || `https://ui-avatars.com/api/?name=${encodeURIComponent(hs.ten || 'HS')}&background=random&color=fff&size=100`;

//             htmlTrong += `
//                 <div style="background: white; border: 1px solid #c3e6cb; padding: 10px; border-radius: 6px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 1px 2px rgba(0,0,0,0.05); transition: 0.2s;" onmouseover="this.style.background='#f8fff9'" onmouseout="this.style.background='white'">
//                     <div style="display: flex; align-items: center; gap: 12px;">
//                         <img src="${avatarUrl}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 50%; border: 2px solid #28a745; flex-shrink: 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
//                         <div>
//                             <b style="color: #155724; font-size: 14px;">${idx + 1}. ${hs.ten}</b>
//                             <div style="font-size: 11px; color: #666; margin-top: 3px;">📞 ${hs.sdt || '---'} | 🏫 ${hs.truong || '---'}</div>
//                         </div>
//                     </div>
//                     <button onclick="ham_4_9_3_xoa_hs_khoi_lop('${hs.uid}', this)" style="padding: 6px 10px; background: #fff; color: #dc3545; border: 1px dashed #dc3545; border-radius: 4px; font-size: 12px; font-weight: bold; cursor: pointer; white-space: nowrap; transition: 0.2s;" onmouseover="this.style.background='#f8d7da'" onmouseout="this.style.background='#fff'" title="Rút học sinh này ra khỏi lớp">
//                         ✖ Rút tên
//                     </button>
//                 </div>
//             `;
//         });
//     }
//     vungTrong.innerHTML = htmlTrong;

//     // 🌟 RENDER CỘT NGOÀI LỚP
//     let htmlNgoai = '';
//     if (locNgoai.length === 0) {
//         htmlNgoai = `<div style="text-align: center; color: #6c757d; font-size: 13px; font-style: italic; padding: 20px;">Không có học sinh nào khớp</div>`;
//     } else {
//         locNgoai.forEach((hs, idx) => {
//             // Xác định Avatar hiện tại hoặc lấy ảnh Random chữa cháy
//             let avatarUrl = hs.anh_dai_dien || `https://ui-avatars.com/api/?name=${encodeURIComponent(hs.ten || 'HS')}&background=random&color=fff&size=100`;

//             htmlNgoai += `
//                 <div style="background: white; border: 1px solid #dee2e6; padding: 10px; border-radius: 6px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 1px 2px rgba(0,0,0,0.05); transition: 0.2s;" onmouseover="this.style.background='#f4f6f8'" onmouseout="this.style.background='white'">
//                     <div style="display: flex; align-items: center; gap: 12px;">
//                         <img src="${avatarUrl}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 50%; border: 2px solid #adb5bd; flex-shrink: 0; box-shadow: 0 2px 4px rgba(0,0,0,0.05); filter: grayscale(20%);">
//                         <div>
//                             <b style="color: #495057; font-size: 14px;">${idx + 1}. ${hs.ten}</b>
//                             <div style="font-size: 11px; color: #666; margin-top: 3px;">📞 ${hs.sdt || '---'} | 🏫 ${hs.truong || '---'}</div>
//                         </div>
//                     </div>
//                     <button onclick="ham_4_9_2_them_hs_vao_lop('${hs.uid}', this)" style="padding: 6px 12px; background: #007bff; color: white; border: none; border-radius: 4px; font-size: 12px; font-weight: bold; cursor: pointer; white-space: nowrap; transition: 0.2s; box-shadow: 0 2px 4px rgba(0,0,0,0.1);" onmouseover="this.style.background='#0056b3'" onmouseout="this.style.background='#007bff'" title="Thêm học sinh này vào lớp">
//                         ➕ Thêm
//                     </button>
//                 </div>
//             `;
//         });
//     }
//     vungNgoai.innerHTML = htmlNgoai;
// };






// // =====================================================================
// // HÀM 4.9.1: RENDER DANH SÁCH 2 CỘT (CÓ HỖ TRỢ LIVE SEARCH)
// // =====================================================================
// window.ham_4_9_1_render_danh_sach = function (keyword = '') {
//     let key = keyword.toLowerCase().trim();
//     const vungTrong = document.getElementById('vung-hs-trong-lop');
//     const vungNgoai = document.getElementById('vung-hs-ngoai-lop');

//     // Lọc danh sách theo từ khóa
//     let locTrong = window.ChiTietLopState.dsTrong.filter(hs => hs.ten.toLowerCase().includes(key) || (hs.sdt && hs.sdt.includes(key)));
//     let locNgoai = window.ChiTietLopState.dsNgoai.filter(hs => hs.ten.toLowerCase().includes(key) || (hs.sdt && hs.sdt.includes(key)));

//     // Cập nhật con số sĩ số
//     document.getElementById('count-trong').innerText = locTrong.length;
//     document.getElementById('count-ngoai').innerText = locNgoai.length;

//     // RENDER CỘT TRONG LỚP
//     let htmlTrong = '';
//     if (locTrong.length === 0) {
//         htmlTrong = `<div style="text-align: center; color: #6c757d; font-size: 13px; font-style: italic; padding: 20px;">Không có học sinh nào khớp</div>`;
//     } else {
//         locTrong.forEach((hs, idx) => {
//             htmlTrong += `
//                 <div style="background: white; border: 1px solid #c3e6cb; padding: 10px; border-radius: 6px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 1px 2px rgba(0,0,0,0.05); transition: 0.2s;" onmouseover="this.style.background='#f8fff9'" onmouseout="this.style.background='white'">
//                     <div>
//                         <b style="color: #155724; font-size: 14px;">${idx + 1}. ${hs.ten}</b>
//                         <div style="font-size: 11px; color: #666; margin-top: 3px;">📞 ${hs.sdt || '---'} | 🏫 ${hs.truong || '---'}</div>
//                     </div>
//                     <button onclick="ham_4_9_3_xoa_hs_khoi_lop('${hs.uid}', this)" style="padding: 6px 10px; background: #fff; color: #dc3545; border: 1px dashed #dc3545; border-radius: 4px; font-size: 12px; font-weight: bold; cursor: pointer; white-space: nowrap; transition: 0.2s;" onmouseover="this.style.background='#f8d7da'" onmouseout="this.style.background='#fff'" title="Rút học sinh này ra khỏi lớp">
//                         ✖ Rút tên
//                     </button>
//                 </div>
//             `;
//         });
//     }
//     vungTrong.innerHTML = htmlTrong;

//     // RENDER CỘT NGOÀI LỚP
//     let htmlNgoai = '';
//     if (locNgoai.length === 0) {
//         htmlNgoai = `<div style="text-align: center; color: #6c757d; font-size: 13px; font-style: italic; padding: 20px;">Không có học sinh nào khớp</div>`;
//     } else {
//         locNgoai.forEach((hs, idx) => {
//             htmlNgoai += `
//                 <div style="background: white; border: 1px solid #dee2e6; padding: 10px; border-radius: 6px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 1px 2px rgba(0,0,0,0.05); transition: 0.2s;" onmouseover="this.style.background='#f4f6f8'" onmouseout="this.style.background='white'">
//                     <div>
//                         <b style="color: #495057; font-size: 14px;">${idx + 1}. ${hs.ten}</b>
//                         <div style="font-size: 11px; color: #666; margin-top: 3px;">📞 ${hs.sdt || '---'} | 🏫 ${hs.truong || '---'}</div>
//                     </div>
//                     <button onclick="ham_4_9_2_them_hs_vao_lop('${hs.uid}', this)" style="padding: 6px 12px; background: #007bff; color: white; border: none; border-radius: 4px; font-size: 12px; font-weight: bold; cursor: pointer; white-space: nowrap; transition: 0.2s; box-shadow: 0 2px 4px rgba(0,0,0,0.1);" onmouseover="this.style.background='#0056b3'" onmouseout="this.style.background='#007bff'" title="Thêm học sinh này vào lớp">
//                         ➕ Thêm
//                     </button>
//                 </div>
//             `;
//         });
//     }
//     vungNgoai.innerHTML = htmlNgoai;
// };

// =====================================================================
// HÀM HỖ TRỢ: SẮP XẾP TÊN TIẾNG VIỆT CHUẨN (Tên trước, Họ chữ lót sau)
// =====================================================================
window.ham_ho_tro_so_sanh_ten_vn = function (tenA, tenB) {
    const bocTach = (chuoi) => {
        let mang = (chuoi || '').trim().split(/\s+/);
        let ten = mang.pop() || ''; // Lấy chữ cuối cùng làm Tên
        let hoLot = mang.join(' '); // Phần còn lại là Họ và Lót
        return { ten: ten.toLowerCase(), hoLot: hoLot.toLowerCase() };
    };

    let a = bocTach(tenA);
    let b = bocTach(tenB);

    // 1. So sánh Tên trước
    let ssTen = a.ten.localeCompare(b.ten, 'vi');
    if (ssTen !== 0) return ssTen;

    // 2. Nếu Tên giống nhau (VD: Hân), quay lại so sánh Họ Lót (Huỳnh Gia < Nguyễn An)
    return a.hoLot.localeCompare(b.hoLot, 'vi');
};


// // =====================================================================
// // HÀM 4.9.2: XỬ LÝ BẤM NÚT "THÊM VÀO LỚP"
// // =====================================================================
// window.ham_4_9_2_them_hs_vao_lop = async function (uid, btn) {
//     btn.disabled = true;
//     btn.innerHTML = "⏳...";
//     let maLop = window.ChiTietLopState.maLop;

//     try {
//         // 1. Lấy mảng lớp hiện tại trên Database của HS này
//         const { data: hsData, error: errGet } = await _supabase.from('hoc_sinh').select('danh_sach_ma_lop').eq('uid', uid).single();
//         if (errGet) throw errGet;

//         let dsLop = hsData.danh_sach_ma_lop || [];
//         if (typeof dsLop === 'string') {
//             try { dsLop = JSON.parse(dsLop); } catch (e) { dsLop = dsLop.split(',').filter(l => l.trim()); }
//         }
//         if (!Array.isArray(dsLop)) dsLop = [];

//         // 2. Thêm mã lớp mới vào và Update DB
//         if (!dsLop.includes(maLop)) {
//             dsLop.push(maLop);
//             const { error: errUpdate } = await _supabase.from('hoc_sinh').update({ danh_sach_ma_lop: dsLop }).eq('uid', uid);
//             if (errUpdate) throw errUpdate;
//         }

//         // 3. Di chuyển học sinh trong State (Bộ nhớ tạm của trình duyệt)
//         let hsIndex = window.ChiTietLopState.dsNgoai.findIndex(h => h.uid === uid);
//         if (hsIndex > -1) {
//             let hs = window.ChiTietLopState.dsNgoai.splice(hsIndex, 1)[0];
//             window.ChiTietLopState.dsTrong.push(hs);
//             // Sắp xếp lại Cột Trái theo ABC
//             window.ChiTietLopState.dsTrong.sort((a, b) => a.ten.localeCompare(b.ten, 'vi'));
//         }

//         // 4. Vẽ lại giao diện (Bao gồm giữ lại chữ đang Search nếu có)
//         let kw = document.getElementById('input-tim-hs-chi-tiet').value;
//         ham_4_9_1_render_danh_sach(kw);

//     } catch (e) {
//         console.error(e);
//         alert("Lỗi thêm: " + e.message);
//         btn.disabled = false;
//         btn.innerHTML = "➕ Thêm";
//     }
// };

// // =====================================================================
// // HÀM 4.9.3: XỬ LÝ BẤM NÚT "RÚT TÊN"
// // =====================================================================
// window.ham_4_9_3_xoa_hs_khoi_lop = async function (uid, btn) {
//     if (!confirm("⚠️ Chắc chắn muốn rút học sinh này ra khỏi lớp?")) return;

//     btn.disabled = true;
//     btn.innerHTML = "⏳...";
//     let maLop = window.ChiTietLopState.maLop;

//     try {
//         // 1. Lấy mảng lớp hiện tại trên Database của HS này
//         const { data: hsData, error: errGet } = await _supabase.from('hoc_sinh').select('danh_sach_ma_lop').eq('uid', uid).single();
//         if (errGet) throw errGet;

//         let dsLop = hsData.danh_sach_ma_lop || [];
//         if (typeof dsLop === 'string') {
//             try { dsLop = JSON.parse(dsLop); } catch (e) { dsLop = dsLop.split(',').filter(l => l.trim()); }
//         }
//         if (!Array.isArray(dsLop)) dsLop = [];

//         // 2. Lọc bỏ mã lớp này ra và Update DB
//         dsLop = dsLop.filter(l => l !== maLop);

//         const { error: errUpdate } = await _supabase.from('hoc_sinh').update({ danh_sach_ma_lop: dsLop }).eq('uid', uid);
//         if (errUpdate) throw errUpdate;

//         // 3. Di chuyển học sinh trong State
//         let hsIndex = window.ChiTietLopState.dsTrong.findIndex(h => h.uid === uid);
//         if (hsIndex > -1) {
//             let hs = window.ChiTietLopState.dsTrong.splice(hsIndex, 1)[0];
//             window.ChiTietLopState.dsNgoai.push(hs);
//             // Sắp xếp lại Cột Phải theo ABC
//             window.ChiTietLopState.dsNgoai.sort((a, b) => a.ten.localeCompare(b.ten, 'vi'));
//         }

//         // 4. Vẽ lại giao diện
//         let kw = document.getElementById('input-tim-hs-chi-tiet').value;
//         ham_4_9_1_render_danh_sach(kw);

//     } catch (e) {
//         console.error(e);
//         alert("Lỗi xóa: " + e.message);
//         btn.disabled = false;
//         btn.innerHTML = "✖ Rút tên";
//     }
// };

// =====================================================================
// HÀM 4.9.1: RENDER DANH SÁCH (TÍCH HỢP SẮP XẾP CHUẨN VIỆT NAM)
// =====================================================================
window.ham_4_9_1_render_danh_sach = function (keyword = '') {
    let key = keyword.toLowerCase().trim();
    const vungTrong = document.getElementById('vung-hs-trong-lop');
    const vungNgoai = document.getElementById('vung-hs-ngoai-lop');

    // 1. Lọc theo từ khóa tìm kiếm
    let locTrong = window.ChiTietLopState.dsTrong.filter(hs => hs.ten.toLowerCase().includes(key) || (hs.sdt && hs.sdt.includes(key)));
    let locNgoai = window.ChiTietLopState.dsNgoai.filter(hs => hs.ten.toLowerCase().includes(key) || (hs.sdt && hs.sdt.includes(key)));

    // 🌟 2. THỰC THI SẮP XẾP CHUẨN VIỆT NAM TRƯỚC KHI VẼ
    let heSoTrong = window.ChiTietLopState.sortTrong === 'asc' ? 1 : -1;
    locTrong.sort((a, b) => window.ham_ho_tro_so_sanh_ten_vn(a.ten, b.ten) * heSoTrong);

    let heSoNgoai = window.ChiTietLopState.sortNgoai === 'asc' ? 1 : -1;
    locNgoai.sort((a, b) => window.ham_ho_tro_so_sanh_ten_vn(a.ten, b.ten) * heSoNgoai);

    // Cập nhật nhãn nút hiển thị ⬇️ A-Z hoặc ⬆️ Z-A
    const btnSortTrong = document.getElementById('btn-sort-trong');
    if (btnSortTrong) btnSortTrong.innerHTML = window.ChiTietLopState.sortTrong === 'asc' ? '⬇️ A-Z' : '⬆️ Z-A';

    const btnSortNgoai = document.getElementById('btn-sort-ngoai');
    if (btnSortNgoai) btnSortNgoai.innerHTML = window.ChiTietLopState.sortNgoai === 'asc' ? '⬇️ A-Z' : '⬆️ Z-A';

    // Cập nhật con số sĩ số
    document.getElementById('count-trong').innerText = locTrong.length;
    document.getElementById('count-ngoai').innerText = locNgoai.length;

    // RENDER CỘT TRONG LỚP
    let htmlTrong = '';
    if (locTrong.length === 0) {
        htmlTrong = `<div style="text-align: center; color: #6c757d; font-size: 13px; font-style: italic; padding: 20px;">Không có học sinh nào khớp</div>`;
    } else {
        locTrong.forEach((hs, idx) => {
            let avatarUrl = hs.anh_dai_dien || `https://ui-avatars.com/api/?name=${encodeURIComponent(hs.ten || 'HS')}&background=random&color=fff&size=100`;
            htmlTrong += `
                <div style="background: white; border: 1px solid #c3e6cb; padding: 10px; border-radius: 6px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 1px 2px rgba(0,0,0,0.05); transition: 0.2s;" onmouseover="this.style.background='#f8fff9'" onmouseout="this.style.background='white'">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <img src="${avatarUrl}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 50%; border: 2px solid #28a745; flex-shrink: 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        <div>
                            <b style="color: #155724; font-size: 14px;">${idx + 1}. ${hs.ten}</b>
                            <div style="font-size: 11px; color: #666; margin-top: 3px;">📞 ${hs.sdt || '---'} | 🏫 ${hs.truong || '---'}</div>
                        </div>
                    </div>
                    <button onclick="ham_4_9_3_xoa_hs_khoi_lop('${hs.uid}', this)" style="padding: 6px 10px; background: #fff; color: #dc3545; border: 1px dashed #dc3545; border-radius: 4px; font-size: 12px; font-weight: bold; cursor: pointer; white-space: nowrap; transition: 0.2s;" onmouseover="this.style.background='#f8d7da'" onmouseout="this.style.background='#fff'" title="Rút học sinh này ra khỏi lớp">
                        ✖ Rút tên
                    </button>
                </div>
            `;
        });
    }
    vungTrong.innerHTML = htmlTrong;

    // RENDER CỘT NGOÀI LỚP
    let htmlNgoai = '';
    if (locNgoai.length === 0) {
        htmlNgoai = `<div style="text-align: center; color: #6c757d; font-size: 13px; font-style: italic; padding: 20px;">Không có học sinh nào khớp</div>`;
    } else {
        locNgoai.forEach((hs, idx) => {
            let avatarUrl = hs.anh_dai_dien || `https://ui-avatars.com/api/?name=${encodeURIComponent(hs.ten || 'HS')}&background=random&color=fff&size=100`;
            htmlNgoai += `
                <div style="background: white; border: 1px solid #dee2e6; padding: 10px; border-radius: 6px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 1px 2px rgba(0,0,0,0.05); transition: 0.2s;" onmouseover="this.style.background='#f4f6f8'" onmouseout="this.style.background='white'">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <img src="${avatarUrl}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 50%; border: 2px solid #adb5bd; flex-shrink: 0; box-shadow: 0 2px 4px rgba(0,0,0,0.05); filter: grayscale(20%);">
                        <div>
                            <b style="color: #495057; font-size: 14px;">${idx + 1}. ${hs.ten}</b>
                            <div style="font-size: 11px; color: #666; margin-top: 3px;">📞 ${hs.sdt || '---'} | 🏫 ${hs.truong || '---'}</div>
                        </div>
                    </div>
                    <button onclick="ham_4_9_2_them_hs_vao_lop('${hs.uid}', this)" style="padding: 6px 12px; background: #007bff; color: white; border: none; border-radius: 4px; font-size: 12px; font-weight: bold; cursor: pointer; white-space: nowrap; transition: 0.2s; box-shadow: 0 2px 4px rgba(0,0,0,0.1);" onmouseover="this.style.background='#0056b3'" onmouseout="this.style.background='#007bff'" title="Thêm học sinh này vào lớp">
                        ➕ Thêm
                    </button>
                </div>
            `;
        });
    }
    vungNgoai.innerHTML = htmlNgoai;
};

// =====================================================================
// Cập nhật HÀM 4.9.2 (Đồng bộ sort sau khi THÊM vào lớp)
// =====================================================================
window.ham_4_9_2_them_hs_vao_lop = async function (uid, btn) {
    btn.disabled = true; btn.innerHTML = "⏳...";
    let maLop = window.ChiTietLopState.maLop;
    try {
        const { data: hsData, error: errGet } = await _supabase.from('hoc_sinh').select('danh_sach_ma_lop').eq('uid', uid).single();
        if (errGet) throw errGet;
        let dsLop = hsData.danh_sach_ma_lop || [];
        if (typeof dsLop === 'string') { try { dsLop = JSON.parse(dsLop); } catch (e) { dsLop = dsLop.split(',').filter(l => l.trim()); } }
        if (!Array.isArray(dsLop)) dsLop = [];

        if (!dsLop.includes(maLop)) {
            dsLop.push(maLop);
            const { error: errUpdate } = await _supabase.from('hoc_sinh').update({ danh_sach_ma_lop: dsLop }).eq('uid', uid);
            if (errUpdate) throw errUpdate;
        }

        let hsIndex = window.ChiTietLopState.dsNgoai.findIndex(h => h.uid === uid);
        if (hsIndex > -1) {
            let hs = window.ChiTietLopState.dsNgoai.splice(hsIndex, 1)[0];
            window.ChiTietLopState.dsTrong.push(hs);
            // Sắp xếp lại Mảng Gốc
            window.ChiTietLopState.dsTrong.sort((a, b) => window.ham_ho_tro_so_sanh_ten_vn(a.ten, b.ten));
        }

        let kw = document.getElementById('input-tim-hs-chi-tiet').value;
        ham_4_9_1_render_danh_sach(kw);
    } catch (e) { console.error(e); alert("Lỗi thêm: " + e.message); btn.disabled = false; btn.innerHTML = "➕ Thêm"; }
};

// =====================================================================
// Cập nhật HÀM 4.9.3 (Đồng bộ sort sau khi RÚT khỏi lớp)
// =====================================================================
window.ham_4_9_3_xoa_hs_khoi_lop = async function (uid, btn) {
    if (!confirm("⚠️ Chắc chắn muốn rút học sinh này ra khỏi lớp?")) return;
    btn.disabled = true; btn.innerHTML = "⏳...";
    let maLop = window.ChiTietLopState.maLop;
    try {
        const { data: hsData, error: errGet } = await _supabase.from('hoc_sinh').select('danh_sach_ma_lop').eq('uid', uid).single();
        if (errGet) throw errGet;
        let dsLop = hsData.danh_sach_ma_lop || [];
        if (typeof dsLop === 'string') { try { dsLop = JSON.parse(dsLop); } catch (e) { dsLop = dsLop.split(',').filter(l => l.trim()); } }
        if (!Array.isArray(dsLop)) dsLop = [];

        dsLop = dsLop.filter(l => l !== maLop);
        const { error: errUpdate } = await _supabase.from('hoc_sinh').update({ danh_sach_ma_lop: dsLop }).eq('uid', uid);
        if (errUpdate) throw errUpdate;

        let hsIndex = window.ChiTietLopState.dsTrong.findIndex(h => h.uid === uid);
        if (hsIndex > -1) {
            let hs = window.ChiTietLopState.dsTrong.splice(hsIndex, 1)[0];
            window.ChiTietLopState.dsNgoai.push(hs);
            // Sắp xếp lại Mảng Gốc
            window.ChiTietLopState.dsNgoai.sort((a, b) => window.ham_ho_tro_so_sanh_ten_vn(a.ten, b.ten));
        }

        let kw = document.getElementById('input-tim-hs-chi-tiet').value;
        ham_4_9_1_render_danh_sach(kw);
    } catch (e) { console.error(e); alert("Lỗi xóa: " + e.message); btn.disabled = false; btn.innerHTML = "✖ Rút tên"; }
};

// =====================================================================
// HÀM 4.9.4: XỬ LÝ ĐẢO CHIỀU SẮP XẾP
// =====================================================================
window.ham_4_9_4_dao_chieu_sort = function (cot) {
    if (cot === 'trong') {
        window.ChiTietLopState.sortTrong = window.ChiTietLopState.sortTrong === 'asc' ? 'desc' : 'asc';
    } else {
        window.ChiTietLopState.sortNgoai = window.ChiTietLopState.sortNgoai === 'asc' ? 'desc' : 'asc';
    }

    // Giữ nguyên từ khóa tìm kiếm đang gõ nếu có
    let kw = document.getElementById('input-tim-hs-chi-tiet').value;
    window.ham_4_9_1_render_danh_sach(kw);
};


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

// // Hàm 4.12: Hiện Form Chỉnh sửa lớp học
// async function ham_4_12_hien_form_sua_lop(maLop) {
//     const lop = BangLopState.duLieu.find(l => l.ma_lop === maLop);
//     if (!lop) return;

//     const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
//     vungLamViec.innerHTML = `<p style="text-align: center;">Đang tải dữ liệu lớp và học sinh...</p>`;

//     try {
//         // Tải danh sách học sinh mới nhất đổ vào biến _dsHocSinhGoc
//         const { data } = await _supabase
//             .from('hoc_sinh')
//             .select('uid, ten, sdt, truong')
//             .eq('vai_tro', 'hocsinh')
//             .order('ten', { ascending: true });

//         _dsHocSinhGoc = data || []; // Gán vào biến toàn cục đã khai báo ở Bước 1

//         // Chuẩn bị mảng ID học sinh cũ để nạp vào hàm Search
//         const mảngIdCũ = JSON.stringify(lop.hoc_sinh_ids || []);

//         vungLamViec.innerHTML = `
//             <div style="max-width: 750px; background: #ffffff; padding: 25px; border-radius: 12px; border: 1px solid #e0e0e0; margin: 0 auto;">
//                 <h3 style="color: #f39c12; border-bottom: 2px solid #f1f3f4; padding-bottom: 10px;">CHỈNH SỬA LỚP HỌC: ${lop.ten_lop} (${maLop})</h3>
                
//                 <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
//                     <div>
//                         <label style="font-weight: bold; font-size: 14px;">Mã lớp (Cố định):</label>
//                         <input type="text" value="${maLop}" readonly style="width: 100%; padding: 10px; background: #f1f3f4; border-radius: 6px; color: #666; font-weight: bold; box-sizing: border-box; border: 1px solid #ddd;">
//                     </div>
//                     <div>
//                         <label style="font-weight: bold; font-size: 14px;">Trạng thái lớp:</label>
//                         <select id="selTrangThaiLopSua" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px;">
//                             <option value="1" ${lop.trang_thai == 1 ? 'selected' : ''}>1 - Đang mở</option>
//                             <option value="0" ${lop.trang_thai == 0 ? 'selected' : ''}>0 - Đóng lớp</option>
//                         </select>
//                     </div>
//                     <div style="grid-column: span 2;">
//                         <label style="font-weight: bold; font-size: 14px; color: #1a73e8;">Tên lớp học (*):</label>
//                         <input type="text" id="txtTenLopSua" value="${lop.ten_lop}" style="width: 100%; padding: 10px; border: 2px solid #1a73e8; border-radius: 6px; box-sizing: border-box;">
//                     </div>
//                 </div>

//                 <div style="margin-bottom: 20px; padding: 15px; border: 1px dashed #1a73e8; border-radius: 8px; background: #f8fbff;">
//                     <label style="font-weight: bold; font-size: 14px; color: #1a73e8; display: block; margin-bottom: 10px;">Danh sách học sinh (Tích chọn để thay đổi):</label>
                    
//                     <input type="text" oninput="ham_4_15_loc_hoc_sinh_sua_lop(this.value, '${mảngIdCũ}')" 
//                            placeholder="🔍 Tìm tên hoặc SĐT..." 
//                            style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; margin-bottom: 10px; box-sizing: border-box;">

//                     <div id="vung-chon-hs-sua" style="max-height: 250px; overflow-y: auto; border: 1px solid #eee; padding: 10px; border-radius: 4px; background: white;">
//                         ${ham_4_12_b_tao_list_hs_sua(_dsHocSinhGoc, lop.hoc_sinh_ids || [])}
//                     </div>
//                 </div>

//                 <div style="display: flex; gap: 12px;">
//                     <button onclick="ham_4_13_luu_cap_nhat_lop('${maLop}', this)" style="flex: 2; padding: 12px; background: #f39c12; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">
//                         LƯU THAY ĐỔI
//                     </button>
//                     <button onclick="ham_4_1_ve_quan_ly_lop()" style="flex: 1; padding: 12px; background: #f1f3f4; border: 1px solid #dadce0; border-radius: 6px; cursor: pointer;">
//                         HỦY BỎ
//                     </button>
//                 </div>
//             </div>
//         `;
//     } catch (error) {
//         vungLamViec.innerHTML = `<p style="color: red;">Lỗi: ${error.message}</p>`;
//     }
// }

// // Hàm 4.15: Lọc tìm kiếm học sinh ngay tại chỗ cho Form Sửa Lớp
// function ham_4_15_loc_hoc_sinh_sua_lop(keyword, chuoiIdsDaCo) {
//     const idsDaCo = JSON.parse(chuoiIdsDaCo || '[]');
//     const key = keyword.toLowerCase().trim();
//     const vungList = document.getElementById('vung-chon-hs-sua');

//     // Lọc từ biến gốc
//     const dsLoc = _dsHocSinhGoc.filter(hs =>
//         hs.ten.toLowerCase().includes(key) ||
//         (hs.sdt && hs.sdt.includes(key))
//     );

//     // Vẽ lại danh sách đã lọc (vẫn truyền idsDaCo để giữ dấu tick)
//     vungList.innerHTML = ham_4_12_b_tao_list_hs_sua(dsLoc, idsDaCo);
// }

// // Hàm 4.12.b: Tạo HTML danh sách checkbox
// function ham_4_12_b_tao_list_hs_sua(danhSach, idsDaCo) {
//     if (danhSach.length === 0) return '<p style="font-size: 12px; color: #999;">Không có dữ liệu...</p>';

//     return danhSach.map(hs => {
//         // Kiểm tra xem ID của học sinh này có nằm trong mảng của lớp không
//         const isChecked = idsDaCo.includes(hs.uid) ? 'checked' : '';
//         return `
//             <div style="padding: 6px 0; border-bottom: 1px solid #f0f0f0; display: flex; align-items: center;">
//                 <input type="checkbox" class="chk-hs-sua-lop" value="${hs.uid}" id="sua_hs_${hs.uid}" ${isChecked} style="margin-right: 10px; transform: scale(1.2);">
//                 <label for="sua_hs_${hs.uid}" style="cursor: pointer; font-size: 14px;">
//                     <span style="font-weight: bold;">${hs.ten}</span> 
//                     <span style="color: #666; font-size: 12px;"> - SĐT: ${hs.sdt}</span>
//                 </label>
//             </div>
//         `;
//     }).join('');
// }



// // ==============================================================
// // Hàm 4.13: Lưu cập nhật toàn diện lớp học (CÓ ĐỒNG BỘ HỌC SINH)
// // ==============================================================
// async function ham_4_13_luu_cap_nhat_lop(maLop, btn) {
//     const tenMoi = document.getElementById('txtTenLopSua').value.trim();
//     const trangThaiMoi = parseInt(document.getElementById('selTrangThaiLopSua').value);

//     // Lấy danh sách UID học sinh mới sau khi thầy tích/bỏ tích
//     const nodes = document.querySelectorAll('.chk-hs-sua-lop:checked');
//     const mangUidMoi = Array.from(nodes).map(node => node.value);

//     if (!tenMoi) return alert("Thầy vui lòng không để trống Tên lớp!");

//     btn.disabled = true;
//     btn.innerText = "⏳ ĐANG ĐỒNG BỘ...";

//     try {
//         // BƯỚC 1: LẤY DỮ LIỆU LỚP CŨ ĐỂ TÌM SỰ THAY ĐỔI (AI VÀO, AI RA)
//         const { data: lopCu } = await _supabase
//             .from('lop_hoc')
//             .select('hoc_sinh_ids')
//             .eq('ma_lop', maLop)
//             .single();

//         const mangUidCu = lopCu?.hoc_sinh_ids || [];

//         // BƯỚC 2: CẬP NHẬT THÔNG TIN VÀO BẢNG 'lop_hoc'
//         const { error: errLop } = await _supabase
//             .from('lop_hoc')
//             .update({
//                 ten_lop: tenMoi,
//                 trang_thai: trangThaiMoi,
//                 hoc_sinh_ids: mangUidMoi // Truyền mảng trực tiếp
//             })
//             .eq('ma_lop', maLop);

//         if (errLop) throw errLop;

//         // BƯỚC 3: ĐỒNG BỘ HỒ SƠ CHO TỪNG HỌC SINH (Tìm ai thêm, ai bị loại)
//         const dsThem = mangUidMoi.filter(id => !mangUidCu.includes(id));
//         const dsLoai = mangUidCu.filter(id => !mangUidMoi.includes(id));
//         const tatCaHsAnhHuong = [...new Set([...dsThem, ...dsLoai])];

//         if (tatCaHsAnhHuong.length > 0) {
//             for (const uid of tatCaHsAnhHuong) {
//                 // Lấy mảng mã lớp hiện tại của học sinh
//                 const { data: hsData } = await _supabase
//                     .from('hoc_sinh')
//                     .select('danh_sach_ma_lop')
//                     .eq('uid', uid)
//                     .single();

//                 let dsLopCuaHS = hsData?.danh_sach_ma_lop || [];
//                 if (!Array.isArray(dsLopCuaHS)) dsLopCuaHS = [];

//                 if (dsThem.includes(uid)) {
//                     // Nếu là học sinh mới được tích: Ghi danh
//                     if (!dsLopCuaHS.includes(maLop)) dsLopCuaHS.push(maLop);
//                 } else if (dsLoai.includes(uid)) {
//                     // Nếu là học sinh bị bỏ tích: Xóa mã lớp này đi
//                     dsLopCuaHS = dsLopCuaHS.filter(m => m !== maLop);
//                 }

//                 // Cập nhật lại vào Database
//                 await _supabase
//                     .from('hoc_sinh')
//                     .update({ danh_sach_ma_lop: dsLopCuaHS })
//                     .eq('uid', uid);
//             }
//         }

//         alert(`✅ Đã cập nhật thành công lớp ${maLop} và đồng bộ học sinh!`);

//         // BƯỚC 4: VỀ GIAO DIỆN CHÍNH RỒI MỚI TẢI LẠI (Fix dứt điểm lỗi null)
//         ham_4_1_ve_quan_ly_lop(); // Dựng lại HTML chứa id 'danh-sach-lop-render'
//         ham_4_4_tai_danh_sach_lop(); // Lúc này gọi load dữ liệu là an toàn 100%

//     } catch (error) {
//         alert("Lỗi cập nhật: " + error.message);
//     } finally {
//         btn.disabled = false;
//         btn.innerText = "LƯU THAY ĐỔI";
//     }
// }


// =====================================================================
// HÀM 4.12: HIỆN FORM CHỈNH SỬA LỚP HỌC (ĐỒNG BỘ GIAO DIỆN 2 CỘT)
// =====================================================================
window.ham_4_12_hien_form_sua_lop = async function (maLop) {
    const lop = BangLopState.duLieu.find(l => l.ma_lop === maLop);
    if (!lop) return;

    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
    vungLamViec.innerHTML = `<div style="text-align: center; padding: 40px; color: #f39c12; font-size: 16px;"><b>⏳ Đang tải thông tin lớp và toàn bộ học sinh...</b></div>`;

    try {
        // 1. TẢI TẤT CẢ HỌC SINH TỪ DATABASE
        const { data: dsHS, error } = await _supabase
            .from('hoc_sinh')
            .select('uid, ten, sdt, truong, danh_sach_ma_lop')
            .eq('vai_tro', 'hocsinh')
            .order('ten', { ascending: true });

        if (error) throw error;

        let dsTrong = [];
        let dsNgoai = [];

        // 2. PHÂN LOẠI HỌC SINH VÀO 2 NHÓM
        if (dsHS) {
            dsHS.forEach(hs => {
                let dLop = hs.danh_sach_ma_lop || [];
                let isTrongLop = false;
                if (Array.isArray(dLop)) isTrongLop = dLop.includes(maLop);
                else if (typeof dLop === 'string') isTrongLop = dLop.includes(maLop);

                if (isTrongLop) dsTrong.push(hs);
                else dsNgoai.push(hs);
            });
        }

        // Tái sử dụng State của Chi tiết lớp để kích hoạt tính năng Thêm/Rút Live
        window.ChiTietLopState = { maLop: maLop, tenLop: lop.ten_lop, dsTrong, dsNgoai };

        // 3. VẼ GIAO DIỆN SỬA LỚP
        vungLamViec.innerHTML = `
            <div style="background: #ffffff; padding: 25px; border-radius: 12px; border: 1px solid #e0e0e0; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #f1f3f4; padding-bottom: 10px; margin-bottom: 20px;">
                    <h3 style="color: #f39c12; margin: 0; display: flex; align-items: center; gap: 10px;">
                        ✏️ CHỈNH SỬA LỚP: ${lop.ten_lop} (${maLop})
                    </h3>
                    <button onclick="ham_4_4_tai_danh_sach_lop(); ham_4_1_ve_quan_ly_lop();" style="padding: 8px 15px; background: #6c757d; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        ⬅ Quay Lại Bảng
                    </button>
                </div>
                
                <!-- KHU VỰC 1: SỬA TÊN VÀ TRẠNG THÁI -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 25px; background: #fffaf0; padding: 20px; border-radius: 8px; border: 1px dashed #f39c12;">
                    <div style="grid-column: span 2;">
                        <label style="font-weight: bold; font-size: 14px; color: #d35400;">Tên lớp học (*):</label>
                        <input type="text" id="txtTenLopSua" value="${lop.ten_lop}" style="width: 100%; padding: 10px; border: 2px solid #f39c12; border-radius: 6px; box-sizing: border-box; outline: none; font-weight: bold; font-size: 15px; color: #333; margin-top: 5px;">
                    </div>
                    <div>
                        <label style="font-weight: bold; font-size: 14px; color: #d35400;">Trạng thái lớp:</label>
                        <select id="selTrangThaiLopSua" style="width: 100%; padding: 10px; border: 1px solid #f39c12; border-radius: 6px; outline: none; margin-top: 5px; background: white;">
                            <option value="1" ${lop.trang_thai == 1 ? 'selected' : ''}>1 - Đang mở (Hoạt động)</option>
                            <option value="0" ${lop.trang_thai == 0 ? 'selected' : ''}>0 - Đóng (Tạm dừng)</option>
                        </select>
                    </div>
                    <div style="display: flex; align-items: flex-end;">
                        <button onclick="ham_4_13_luu_cap_nhat_lop('${maLop}', this)" style="width: 100%; padding: 10px; background: #f39c12; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; box-shadow: 0 2px 4px rgba(243, 156, 18, 0.3); transition: 0.2s;" onmouseover="this.style.background='#e67e22'" onmouseout="this.style.background='#f39c12'">
                            💾 LƯU TÊN & TRẠNG THÁI LỚP
                        </button>
                    </div>
                </div>

                <!-- KHU VỰC 2: ĐIỀU PHỐI HỌC SINH -->
                <div style="margin-bottom: 15px;">
                    <label style="font-weight: bold; font-size: 14px; color: #1a73e8; display: block; margin-bottom: 8px;">👥 Điều phối học sinh (Hệ thống tự động lưu khi bấm nút Thêm/Rút tên):</label>
                    <input type="text" id="input-tim-hs-chi-tiet" oninput="ham_4_9_1_render_danh_sach(this.value)" placeholder="🔍 Nhập Tên hoặc SĐT để tìm nhanh học sinh..." style="width: 100%; padding: 12px; border: 2px solid #17a2b8; border-radius: 6px; font-size: 14px; outline: none; box-sizing: border-box; box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);">
                </div>

                <div style="display: flex; gap: 20px; flex-wrap: wrap;">
                    <!-- Cột Trái -->
                    <div style="flex: 1; min-width: 300px; background: #f0fdf4; border: 1px solid #28a745; border-radius: 8px; padding: 15px; display: flex; flex-direction: column;">
                        <h4 style="color: #155724; margin-top: 0; margin-bottom: 15px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px dashed #28a745; padding-bottom: 8px;">
                            <span>🎓 ĐÃ TRONG LỚP</span>
                            <span id="count-trong" style="background: #28a745; color: white; padding: 2px 10px; border-radius: 12px; font-size: 13px;">0</span>
                        </h4>
                        <div id="vung-hs-trong-lop" style="overflow-y: auto; max-height: 400px; padding-right: 5px; flex: 1;"></div>
                    </div>

                    <!-- Cột Phải -->
                    <div style="flex: 1; min-width: 300px; background: #f8f9fa; border: 1px solid #ced4da; border-radius: 8px; padding: 15px; display: flex; flex-direction: column;">
                        <h4 style="color: #495057; margin-top: 0; margin-bottom: 15px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px dashed #adb5bd; padding-bottom: 8px;">
                            <span>🌍 HỌC SINH BÊN NGOÀI</span>
                            <span id="count-ngoai" style="background: #6c757d; color: white; padding: 2px 10px; border-radius: 12px; font-size: 13px;">0</span>
                        </h4>
                        <div id="vung-hs-ngoai-lop" style="overflow-y: auto; max-height: 400px; padding-right: 5px; flex: 1;"></div>
                    </div>
                </div>
            </div>
        `;

        // 4. KÍCH HOẠT VẼ DANH SÁCH HỌC SINH 2 CỘT
        window.ham_4_9_1_render_danh_sach();

    } catch (error) {
        vungLamViec.innerHTML = `<p style="color: red; text-align: center;">Lỗi tải dữ liệu: ${error.message}</p>
                                 <div style="text-align: center;"><button onclick="ham_4_1_ve_quan_ly_lop()" style="padding: 10px 20px; background: #6c757d; color: white; border: none; border-radius: 6px; cursor: pointer;">Quay lại</button></div>`;
    }
};

// =====================================================================
// HÀM 4.13: LƯU TÊN VÀ TRẠNG THÁI LỚP (TỐI GIẢN VÌ HỌC SINH ĐÃ LƯU LIVE)
// =====================================================================
window.ham_4_13_luu_cap_nhat_lop = async function (maLop, btn) {
    const tenMoi = document.getElementById('txtTenLopSua').value.trim();
    const trangThaiMoi = parseInt(document.getElementById('selTrangThaiLopSua').value);

    if (!tenMoi) {
        alert("Thầy vui lòng không để trống Tên lớp!");
        return;
    }

    btn.disabled = true;
    const textGoc = btn.innerHTML;
    btn.innerHTML = "⏳ ĐANG LƯU...";

    try {
        const { error: errLop } = await _supabase
            .from('lop_hoc')
            .update({
                ten_lop: tenMoi,
                trang_thai: trangThaiMoi
            })
            .eq('ma_lop', maLop);

        if (error) throw errLop;

        // Báo hiệu lưu thành công trên nút
        btn.style.background = "#28a745";
        btn.innerHTML = "✅ ĐÃ LƯU THÀNH CÔNG";

        setTimeout(() => {
            btn.style.background = "#f39c12";
            btn.innerHTML = textGoc;
            btn.disabled = false;
        }, 2000);

    } catch (error) {
        alert("Lỗi cập nhật: " + error.message);
        btn.disabled = false;
        btn.innerHTML = textGoc;
    }
};


// =====================================================================
// KHỐI HÀM CẬP NHẬT AVATAR ĐỒNG LOẠT (TỪ 4.16 ĐẾN 4.23)
// =====================================================================
window.BatchAvatarState = {
    dsHocSinh: [], // Lưu trữ danh sách ghép nối: { uid, ten, sdt, file, previewBase64 }
};

// // HÀM 4.16: KHỞI TẠO POPUP
// window.ham_4_16_popup_cap_nhat_avatar_lop = function () {
//     if (!window.ChiTietLopState || !window.ChiTietLopState.dsTrong || window.ChiTietLopState.dsTrong.length === 0) {
//         alert("⚠️ Lớp này hiện chưa có học sinh nào. Thầy vui lòng thêm học sinh vào lớp trước!");
//         return;
//     }

//     // Lấy danh sách đang có trong lớp, SẮP XẾP CHUẨN ABC
//     let danhSachLop = [...window.ChiTietLopState.dsTrong].sort((a, b) => a.ten.localeCompare(b.ten, 'vi'));

//     // Nạp vào bộ nhớ tạm
//     window.BatchAvatarState.dsHocSinh = danhSachLop.map(hs => ({
//         uid: hs.uid,
//         ten: hs.ten,
//         sdt: hs.sdt,
//         file: null,
//         previewBase64: null
//     }));

//     // Tạo Popup
//     let modal = document.createElement('div');
//     modal.id = 'modal-batch-avatar';
//     modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); z-index:99999; display:flex; justify-content:center; align-items:center; padding:15px; box-sizing: border-box; animation: fadeIn 0.2s;';

//     modal.innerHTML = `
//         <div style="background:#fff; width:100%; max-width:800px; height:90vh; border-radius:12px; display:flex; flex-direction:column; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,0.5);">
            
//             <!-- HEADER -->
//             <div style="background:#1a73e8; color:white; padding:15px 20px; display:flex; justify-content:space-between; align-items:center; flex-shrink:0;">
//                 <h3 style="margin:0; font-size:18px; display:flex; align-items:center; gap:10px;">
//                     📸 GẮN ẢNH ĐẠI DIỆN HÀNG LOẠT: ${window.ChiTietLopState.tenLop}
//                 </h3>
//                 <button onclick="document.body.removeChild(document.getElementById('modal-batch-avatar'))" style="background:#dc3545; color:white; border:none; padding:5px 12px; border-radius:4px; font-weight:bold; cursor:pointer;">❌ Đóng</button>
//             </div>

//             <!-- TOOLBAR -->
//             <div style="background:#f8f9fa; padding:15px 20px; border-bottom:1px solid #dee2e6; display:flex; justify-content:space-between; align-items:center; flex-shrink:0;">
//                 <label style="padding:10px 20px; background:#ffc107; color:#000; border:1px solid #d39e00; border-radius:6px; cursor:pointer; font-weight:bold; display:flex; align-items:center; gap:8px; box-shadow:0 2px 4px rgba(0,0,0,0.1); transition:0.2s;" onmouseover="this.style.background='#e0a800'" onmouseout="this.style.background='#ffc107'">
//                     📂 Chọn khối ảnh từ máy tính (Tải 1 lúc nhiều ảnh)
//                     <!-- GỌI HÀM 4.17 -->
//                     <input type="file" multiple accept="image/*" style="display:none;" onchange="window.ham_4_17_xu_ly_chon_file(this)">
//                 </label>
                
//                 <!-- GỌI HÀM 4.23 -->
//                 <button id="btn-luu-batch-avatar" onclick="window.ham_4_23_luu_dong_loat_avatar(this)" style="padding:10px 25px; background:#28a745; color:white; border:none; border-radius:6px; cursor:pointer; font-weight:bold; font-size:15px; box-shadow:0 2px 4px rgba(0,0,0,0.2); transition:0.2s;" onmouseover="this.style.background='#218838'" onmouseout="this.style.background='#28a745'">
//                     💾 LƯU ĐỒNG LOẠT VÀO HỆ THỐNG
//                 </button>
//             </div>

//             <!-- BẢNG GHÉP ẢNH -->
//             <div style="flex:1; overflow-y:auto; padding:0 20px; background:#f4f6f8;">
//                 <table style="width:100%; border-collapse:collapse; background:white; margin:15px 0; border-radius:8px; overflow:hidden; box-shadow:0 1px 3px rgba(0,0,0,0.1);">
//                     <thead style="background:#e9ecef; position:sticky; top:0; z-index:10;">
//                         <tr>
//                             <th style="padding:12px; text-align:center; width:40px; border-bottom:2px solid #dee2e6;">STT</th>
//                             <th style="padding:12px; text-align:left; border-bottom:2px solid #dee2e6;">Danh sách Lớp chuẩn A-B-C</th>
//                             <th style="padding:12px; text-align:center; width:120px; border-bottom:2px solid #dee2e6;">Ảnh nạp vào</th>
//                             <th style="padding:12px; text-align:center; width:160px; border-bottom:2px solid #dee2e6;">Thao tác chỉnh sửa</th>
//                         </tr>
//                     </thead>
//                     <tbody id="tbody-batch-avatar">
//                         <!-- Render JS -->
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     `;

//     document.body.appendChild(modal);
//     window.ham_4_18_render_bang_avatar();
// };
// =====================================================================
// // HÀM 4.16: KHỞI TẠO POPUP (CÓ TRUY VẤN LẤY AVATAR HIỆN TẠI TỪ DB)
// // =====================================================================
// window.ham_4_16_popup_cap_nhat_avatar_lop = async function () {
//     if (!window.ChiTietLopState || !window.ChiTietLopState.dsTrong || window.ChiTietLopState.dsTrong.length === 0) {
//         alert("⚠️ Lớp này hiện chưa có học sinh nào. Thầy vui lòng thêm học sinh vào lớp trước!");
//         return;
//     }

//     // Mở ngay Popup Loading để thầy biết hệ thống đang xử lý
//     let modal = document.getElementById('modal-batch-avatar');
//     if (modal) document.body.removeChild(modal);

//     modal = document.createElement('div');
//     modal.id = 'modal-batch-avatar';
//     modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); z-index:99999; display:flex; justify-content:center; align-items:center; padding:15px; box-sizing: border-box; animation: fadeIn 0.2s;';
//     modal.innerHTML = `<div style="background:#fff; padding:30px; border-radius:8px; text-align:center; font-weight:bold; color:#6f42c1; box-shadow: 0 5px 15px rgba(0,0,0,0.3);">⏳ Đang truy xuất Avatar hiện tại của lớp...</div>`;
//     document.body.appendChild(modal);

//     // Lấy danh sách đang có trong lớp, SẮP XẾP CHUẨN ABC
//     let danhSachLop = [...window.ChiTietLopState.dsTrong].sort((a, b) => a.ten.localeCompare(b.ten, 'vi'));
//     let mangUid = danhSachLop.map(hs => hs.uid);
//     let tuDienAvatar = {};

//     try {
//         // 🌟 Nạp Avatar hiện tại trực tiếp từ Database
//         const { data: hsData, error } = await _supabase.from('hoc_sinh').select('uid, anh_dai_dien').in('uid', mangUid);
//         if (hsData) {
//             hsData.forEach(hs => tuDienAvatar[hs.uid] = hs.anh_dai_dien);
//         }
//     } catch (e) {
//         console.error("Lỗi lấy avatar hiện tại:", e);
//     }

//     // Nạp vào bộ nhớ tạm (Có thêm trường anhHienTai)
//     window.BatchAvatarState.dsHocSinh = danhSachLop.map(hs => ({
//         uid: hs.uid,
//         ten: hs.ten,
//         sdt: hs.sdt,
//         anhHienTai: tuDienAvatar[hs.uid] || null, // 🌟 Lưu lại ảnh đang có trên hệ thống
//         file: null,
//         previewBase64: null
//     }));

//     modal.innerHTML = `
//         <div style="background:#fff; width:100%; max-width:950px; height:90vh; border-radius:12px; display:flex; flex-direction:column; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,0.5);">
            
//             <!-- HEADER -->
//             <div style="background:#1a73e8; color:white; padding:15px 20px; display:flex; justify-content:space-between; align-items:center; flex-shrink:0;">
//                 <h3 style="margin:0; font-size:18px; display:flex; align-items:center; gap:10px;">
//                     📸 GẮN ẢNH ĐẠI DIỆN HÀNG LOẠT: ${window.ChiTietLopState.tenLop}
//                 </h3>
//                 <button onclick="document.body.removeChild(document.getElementById('modal-batch-avatar'))" style="background:#dc3545; color:white; border:none; padding:5px 12px; border-radius:4px; font-weight:bold; cursor:pointer;">❌ Đóng</button>
//             </div>

//             <!-- TOOLBAR -->
//             <div style="background:#f8f9fa; padding:15px 20px; border-bottom:1px solid #dee2e6; display:flex; justify-content:space-between; align-items:center; flex-shrink:0;">
//                 <label style="padding:10px 20px; background:#ffc107; color:#000; border:1px solid #d39e00; border-radius:6px; cursor:pointer; font-weight:bold; display:flex; align-items:center; gap:8px; box-shadow:0 2px 4px rgba(0,0,0,0.1); transition:0.2s;" onmouseover="this.style.background='#e0a800'" onmouseout="this.style.background='#ffc107'">
//                     📂 Chọn khối ảnh từ máy tính (Tải 1 lúc nhiều ảnh)
//                     <input type="file" multiple accept="image/*" style="display:none;" onchange="window.ham_4_17_xu_ly_chon_file(this)">
//                 </label>
                
//                 <button id="btn-luu-batch-avatar" onclick="window.ham_4_23_luu_dong_loat_avatar(this)" style="padding:10px 25px; background:#28a745; color:white; border:none; border-radius:6px; cursor:pointer; font-weight:bold; font-size:15px; box-shadow:0 2px 4px rgba(0,0,0,0.2); transition:0.2s;" onmouseover="this.style.background='#218838'" onmouseout="this.style.background='#28a745'">
//                     💾 LƯU ĐỒNG LOẠT VÀO HỆ THỐNG
//                 </button>
//             </div>

//             <!-- BẢNG GHÉP ẢNH -->
//             <div style="flex:1; overflow-y:auto; padding:0 20px; background:#f4f6f8;">
//                 <table style="width:100%; border-collapse:collapse; background:white; margin:15px 0; border-radius:8px; overflow:hidden; box-shadow:0 1px 3px rgba(0,0,0,0.1);">
//                     <thead style="background:#e9ecef; position:sticky; top:0; z-index:10;">
//                         <tr>
//                             <th style="padding:12px; text-align:center; width:40px; border-bottom:2px solid #dee2e6;">STT</th>
//                             <th style="padding:12px; text-align:left; border-bottom:2px solid #dee2e6;">Danh sách Lớp chuẩn A-B-C</th>
//                             <th style="padding:12px; text-align:center; width:120px; border-bottom:2px solid #dee2e6;">Avatar hiện tại</th>
//                             <th style="padding:12px; text-align:center; width:120px; border-bottom:2px solid #dee2e6; color:#28a745;">Ảnh mới nạp</th>
//                             <th style="padding:12px; text-align:center; width:160px; border-bottom:2px solid #dee2e6;">Thao tác chỉnh sửa</th>
//                         </tr>
//                     </thead>
//                     <tbody id="tbody-batch-avatar">
//                         <!-- Render JS -->
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     `;
//     window.ham_4_18_render_bang_avatar();
// };


// =====================================================================
// HÀM 4.16: KHỞI TẠO POPUP AVATAR (TÍCH HỢP SORT CHUẨN VIỆT NAM)
// =====================================================================
window.ham_4_16_popup_cap_nhat_avatar_lop = async function () {
    if (!window.ChiTietLopState || !window.ChiTietLopState.dsTrong || window.ChiTietLopState.dsTrong.length === 0) {
        alert("⚠️ Lớp này hiện chưa có học sinh nào. Thầy vui lòng thêm học sinh vào lớp trước!");
        return;
    }

    let modal = document.getElementById('modal-batch-avatar');
    if (modal) document.body.removeChild(modal);

    modal = document.createElement('div');
    modal.id = 'modal-batch-avatar';
    modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); z-index:99999; display:flex; justify-content:center; align-items:center; padding:15px; box-sizing: border-box; animation: fadeIn 0.2s;';
    modal.innerHTML = `<div style="background:#fff; padding:30px; border-radius:8px; text-align:center; font-weight:bold; color:#6f42c1; box-shadow: 0 5px 15px rgba(0,0,0,0.3);">⏳ Đang truy xuất Avatar hiện tại của lớp...</div>`;
    document.body.appendChild(modal);

    // 🌟 Lấy danh sách lớp và Khởi tạo trạng thái Sort (Mặc định A-Z)
    let danhSachLop = [...window.ChiTietLopState.dsTrong];
    window.BatchAvatarState.sortDirection = 'asc';
    danhSachLop.sort((a, b) => window.ham_ho_tro_so_sanh_ten_vn(a.ten, b.ten));

    let mangUid = danhSachLop.map(hs => hs.uid);
    let tuDienAvatar = {};

    try {
        const { data: hsData, error } = await _supabase.from('hoc_sinh').select('uid, anh_dai_dien').in('uid', mangUid);
        if (hsData) hsData.forEach(hs => tuDienAvatar[hs.uid] = hs.anh_dai_dien);
    } catch (e) {
        console.error("Lỗi lấy avatar hiện tại:", e);
    }

    // Nạp vào bộ nhớ tạm
    window.BatchAvatarState.dsHocSinh = danhSachLop.map(hs => ({
        uid: hs.uid,
        ten: hs.ten,
        sdt: hs.sdt,
        anhHienTai: tuDienAvatar[hs.uid] || null,
        file: null,
        previewBase64: null
    }));

    modal.innerHTML = `
        <div style="background:#fff; width:100%; max-width:950px; height:90vh; border-radius:12px; display:flex; flex-direction:column; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,0.5);">
            
            <div style="background:#1a73e8; color:white; padding:15px 20px; display:flex; justify-content:space-between; align-items:center; flex-shrink:0;">
                <h3 style="margin:0; font-size:18px; display:flex; align-items:center; gap:10px;">
                    📸 GẮN ẢNH ĐẠI DIỆN HÀNG LOẠT: ${window.ChiTietLopState.tenLop}
                </h3>
                <button onclick="document.body.removeChild(document.getElementById('modal-batch-avatar'))" style="background:#dc3545; color:white; border:none; padding:5px 12px; border-radius:4px; font-weight:bold; cursor:pointer;">❌ Đóng</button>
            </div>

            <div style="background:#f8f9fa; padding:15px 20px; border-bottom:1px solid #dee2e6; display:flex; justify-content:space-between; align-items:center; flex-shrink:0;">
                <label style="padding:10px 20px; background:#ffc107; color:#000; border:1px solid #d39e00; border-radius:6px; cursor:pointer; font-weight:bold; display:flex; align-items:center; gap:8px; box-shadow:0 2px 4px rgba(0,0,0,0.1); transition:0.2s;" onmouseover="this.style.background='#e0a800'" onmouseout="this.style.background='#ffc107'">
                    📂 Chọn khối ảnh từ máy tính (Tải 1 lúc nhiều ảnh)
                    <input type="file" multiple accept="image/*" style="display:none;" onchange="window.ham_4_17_xu_ly_chon_file(this)">
                </label>
                
                <button id="btn-luu-batch-avatar" onclick="window.ham_4_23_luu_dong_loat_avatar(this)" style="padding:10px 25px; background:#28a745; color:white; border:none; border-radius:6px; cursor:pointer; font-weight:bold; font-size:15px; box-shadow:0 2px 4px rgba(0,0,0,0.2); transition:0.2s;" onmouseover="this.style.background='#218838'" onmouseout="this.style.background='#28a745'">
                    💾 LƯU ĐỒNG LOẠT VÀO HỆ THỐNG
                </button>
            </div>

            <div style="flex:1; overflow-y:auto; padding:0 20px; background:#f4f6f8;">
                <table style="width:100%; border-collapse:collapse; background:white; margin:15px 0; border-radius:8px; overflow:hidden; box-shadow:0 1px 3px rgba(0,0,0,0.1);">
                    <thead style="background:#e9ecef; position:sticky; top:0; z-index:10;">
                        <tr>
                            <th style="padding:12px; text-align:center; width:40px; border-bottom:2px solid #dee2e6;">STT</th>
                            <!-- 🌟 BỔ SUNG NÚT ĐẢO CHIỀU A-Z VÀO TIÊU ĐỀ -->
                            <th style="padding:12px; text-align:left; border-bottom:2px solid #dee2e6;">
                                <span style="display: flex; align-items: center; gap: 8px;">
                                    Danh sách Lớp
                                    <button id="btn-sort-batch-avatar" onclick="window.ham_4_25_dao_chieu_sort_avatar()" style="background: #fff; border: 1px solid #ced4da; color: #495057; border-radius: 4px; padding: 2px 8px; font-size: 11px; cursor: pointer; font-weight: bold; transition: 0.2s;" onmouseover="this.style.background='#e9ecef'" onmouseout="this.style.background='#fff'" title="Đảo chiều sắp xếp">⬇️ A-Z</button>
                                </span>
                            </th>
                            <th style="padding:12px; text-align:center; width:120px; border-bottom:2px solid #dee2e6;">Avatar hiện tại</th>
                            <th style="padding:12px; text-align:center; width:120px; border-bottom:2px solid #dee2e6; color:#28a745;">Ảnh mới nạp</th>
                            <th style="padding:12px; text-align:center; width:160px; border-bottom:2px solid #dee2e6;">Thao tác chỉnh sửa</th>
                        </tr>
                    </thead>
                    <tbody id="tbody-batch-avatar">
                        <!-- Render JS -->
                    </tbody>
                </table>
            </div>
        </div>
    `;
    window.ham_4_18_render_bang_avatar();
};





// // =====================================================================
// // HÀM 4.18: VẼ BẢNG GHÉP ẢNH (BỔ SUNG CỘT AVATAR HIỆN TẠI)
// // =====================================================================
// window.ham_4_18_render_bang_avatar = function () {
//     const tbody = document.getElementById('tbody-batch-avatar');
//     if (!tbody) return;

//     let html = '';
//     window.BatchAvatarState.dsHocSinh.forEach((item, index) => {

//         // 1. Xử lý hiển thị Avatar Hiện tại
//         let currentAvatarHtml = item.anhHienTai
//             ? `<img src="${item.anhHienTai}" style="width:50px; height:50px; object-fit:cover; border-radius:50%; border:2px solid #ccc; display:block; margin:0 auto; filter: grayscale(10%);">`
//             : `<div style="width:50px; height:50px; border-radius:50%; border:2px dashed #ddd; background:#f8f9fa; display:flex; align-items:center; justify-content:center; margin:0 auto; color:#bbb; font-size:10px;">Chưa có</div>`;

//         // 2. Xử lý hiển thị Ảnh mới nạp vào
//         let isCoAnhMoi = item.previewBase64 !== null;
//         let newAvatarHtml = isCoAnhMoi
//             ? `<img src="${item.previewBase64}" style="width:60px; height:60px; object-fit:cover; border-radius:50%; border:3px solid #28a745; display:block; margin:0 auto; box-shadow:0 2px 5px rgba(0,0,0,0.2);">`
//             : `<div style="width:60px; height:60px; border-radius:50%; border:2px dashed #ccc; background:#fafafa; display:flex; align-items:center; justify-content:center; margin:0 auto; color:#aaa; font-size:10px;">Chờ nạp...</div>`;

//         // Tô màu nền xanh lá nhạt cho dòng nào đã có ảnh mới chuẩn bị Lưu
//         let mauNen = isCoAnhMoi ? '#f0fdf4' : '#fff';

//         html += `
//             <tr style="border-bottom: 1px solid #eee; background: ${mauNen};">
//                 <td style="padding:10px; text-align:center; font-weight:bold; color:#666;">${index + 1}</td>
//                 <td style="padding:10px;">
//                     <b style="color:#0056b3; font-size:15px;">${item.ten}</b><br>
//                     <span style="font-size:12px; color:#888;">SĐT: ${item.sdt || '---'}</span>
//                 </td>
                
//                 <!-- Cột Avatar Hiện Tại -->
//                 <td style="padding:10px; text-align:center; border-right: 1px dashed #ddd; background: #fafafa;">
//                     ${currentAvatarHtml}
//                 </td>

//                 <!-- Cột Ảnh Mới Nạp -->
//                 <td style="padding:10px; text-align:center; position:relative;">
//                     ${isCoAnhMoi ? `<span style="position:absolute; top:5px; right:15px; font-size:16px;">✨</span>` : ''}
//                     ${newAvatarHtml}
//                 </td>

//                 <td style="padding:10px; text-align:center;">
//                     <div style="display:flex; justify-content:center; gap:5px;">
//                         <button onclick="window.ham_4_20_rut_anh_len(${index})" style="padding:6px; background:#e0f3ff; border:1px solid #b8daff; border-radius:4px; cursor:pointer;" title="Đổi chỗ ảnh này với học sinh ở TRÊN">⬆️</button>
//                         <button onclick="window.ham_4_19_don_anh_xuong(${index})" style="padding:6px; background:#e0f3ff; border:1px solid #b8daff; border-radius:4px; cursor:pointer;" title="Đổi chỗ ảnh này với học sinh ở DƯỚI">⬇️</button>
//                         <button onclick="window.ham_4_21_go_anh(${index})" style="padding:6px; background:#f8d7da; border:1px solid #f5c6cb; border-radius:4px; cursor:pointer;" title="Gỡ bỏ ảnh mới nạp này">🗑️</button>
//                     </div>
//                 </td>
//             </tr>
//         `;
//     });
//     tbody.innerHTML = html;
// };
// HÀM 4.17: XỬ LÝ CHỌN FILE TỪ MÁY TÍNH
window.ham_4_17_xu_ly_chon_file = function (input) {
    const files = Array.from(input.files);
    if (files.length === 0) return;

    let fileIndex = 0;
    // Rải ảnh tự động vào các dòng đang bị "Trống" từ trên xuống dưới
    for (let i = 0; i < window.BatchAvatarState.dsHocSinh.length; i++) {
        if (fileIndex >= files.length) break;
        if (!window.BatchAvatarState.dsHocSinh[i].file) {
            let f = files[fileIndex];
            window.BatchAvatarState.dsHocSinh[i].file = f;
            window.BatchAvatarState.dsHocSinh[i].previewBase64 = URL.createObjectURL(f);
            fileIndex++;
        }
    }
    input.value = ''; // Reset input để có thể chọn lại
    window.ham_4_18_render_bang_avatar();
};
// // =====================================================================
// // HÀM 4.18: VẼ BẢNG GHÉP ẢNH (CẬP NHẬT TOOLTIP ĐỔI CHỖ)
// // =====================================================================
// window.ham_4_18_render_bang_avatar = function () {
//     const tbody = document.getElementById('tbody-batch-avatar');
//     if (!tbody) return;

//     let html = '';
//     window.BatchAvatarState.dsHocSinh.forEach((item, index) => {
//         let isCoAnh = item.previewBase64 !== null;
//         let imgHtml = isCoAnh
//             ? `<img src="${item.previewBase64}" style="width:60px; height:60px; object-fit:cover; border-radius:50%; border:2px solid #28a745; display:block; margin:0 auto;">`
//             : `<div style="width:60px; height:60px; border-radius:50%; border:2px dashed #ccc; background:#fafafa; display:flex; align-items:center; justify-content:center; margin:0 auto; color:#aaa; font-size:10px;">Trống</div>`;

//         let mauNen = isCoAnh ? '#fff' : '#fffcf8';

//         html += `
//             <tr style="border-bottom: 1px solid #eee; background: ${mauNen};">
//                 <td style="padding:10px; text-align:center; font-weight:bold; color:#666;">${index + 1}</td>
//                 <td style="padding:10px;">
//                     <b style="color:#0056b3; font-size:15px;">${item.ten}</b><br>
//                     <span style="font-size:12px; color:#888;">SĐT: ${item.sdt || '---'}</span>
//                 </td>
//                 <td style="padding:10px; text-align:center;">
//                     ${imgHtml}
//                 </td>
//                 <td style="padding:10px; text-align:center;">
//                     <div style="display:flex; justify-content:center; gap:5px;">
//                         <button onclick="window.ham_4_20_rut_anh_len(${index})" style="padding:6px; background:#e0f3ff; border:1px solid #b8daff; border-radius:4px; cursor:pointer;" title="Đổi chỗ ảnh này với học sinh ở TRÊN">⬆️</button>
//                         <button onclick="window.ham_4_19_don_anh_xuong(${index})" style="padding:6px; background:#e0f3ff; border:1px solid #b8daff; border-radius:4px; cursor:pointer;" title="Đổi chỗ ảnh này với học sinh ở DƯỚI">⬇️</button>
//                         <button onclick="window.ham_4_21_go_anh(${index})" style="padding:6px; background:#f8d7da; border:1px solid #f5c6cb; border-radius:4px; cursor:pointer;" title="Gỡ bỏ ảnh này">🗑️</button>
//                     </div>
//                 </td>
//             </tr>
//         `;
//     });
//     tbody.innerHTML = html;
// };

// // =====================================================================
// // HÀM 4.18: VẼ BẢNG GHÉP ẢNH (BỔ SUNG NÚT ẨN HỌC SINH)
// // =====================================================================
// window.ham_4_18_render_bang_avatar = function () {
//     const tbody = document.getElementById('tbody-batch-avatar');
//     if (!tbody) return;

//     let html = '';
//     window.BatchAvatarState.dsHocSinh.forEach((item, index) => {

//         // 1. Xử lý hiển thị Avatar Hiện tại
//         let currentAvatarHtml = item.anhHienTai
//             ? `<img src="${item.anhHienTai}" style="width:50px; height:50px; object-fit:cover; border-radius:50%; border:2px solid #ccc; display:block; margin:0 auto; filter: grayscale(10%);">`
//             : `<div style="width:50px; height:50px; border-radius:50%; border:2px dashed #ddd; background:#f8f9fa; display:flex; align-items:center; justify-content:center; margin:0 auto; color:#bbb; font-size:10px;">Chưa có</div>`;

//         // 2. Xử lý hiển thị Ảnh mới nạp vào
//         let isCoAnhMoi = item.previewBase64 !== null;
//         let newAvatarHtml = isCoAnhMoi
//             ? `<img src="${item.previewBase64}" style="width:60px; height:60px; object-fit:cover; border-radius:50%; border:3px solid #28a745; display:block; margin:0 auto; box-shadow:0 2px 5px rgba(0,0,0,0.2);">`
//             : `<div style="width:60px; height:60px; border-radius:50%; border:2px dashed #ccc; background:#fafafa; display:flex; align-items:center; justify-content:center; margin:0 auto; color:#aaa; font-size:10px;">Chờ nạp...</div>`;

//         let mauNen = isCoAnhMoi ? '#f0fdf4' : '#fff';

//         html += `
//             <tr style="border-bottom: 1px solid #eee; background: ${mauNen};">
//                 <td style="padding:10px; text-align:center; font-weight:bold; color:#666;">${index + 1}</td>
//                 <td style="padding:10px;">
//                     <b style="color:#0056b3; font-size:15px;">${item.ten}</b><br>
//                     <span style="font-size:12px; color:#888;">SĐT: ${item.sdt || '---'}</span>
//                 </td>
                
//                 <td style="padding:10px; text-align:center; border-right: 1px dashed #ddd; background: #fafafa;">
//                     ${currentAvatarHtml}
//                 </td>

//                 <td style="padding:10px; text-align:center; position:relative;">
//                     ${isCoAnhMoi ? `<span style="position:absolute; top:5px; right:15px; font-size:16px;">✨</span>` : ''}
//                     ${newAvatarHtml}
//                 </td>

//                 <td style="padding:10px; text-align:center;">
//                     <div style="display:flex; justify-content:center; gap:5px;">
//                         <button onclick="window.ham_4_20_rut_anh_len(${index})" style="padding:6px; background:#e0f3ff; border:1px solid #b8daff; border-radius:4px; cursor:pointer;" title="Đổi chỗ ảnh này với học sinh ở TRÊN">⬆️</button>
//                         <button onclick="window.ham_4_19_don_anh_xuong(${index})" style="padding:6px; background:#e0f3ff; border:1px solid #b8daff; border-radius:4px; cursor:pointer;" title="Đổi chỗ ảnh này với học sinh ở DƯỚI">⬇️</button>
//                         <button onclick="window.ham_4_21_go_anh(${index})" style="padding:6px; background:#f8d7da; border:1px solid #f5c6cb; border-radius:4px; cursor:pointer;" title="Gỡ bỏ ảnh mới nạp này">🗑️</button>
//                         <!-- 🌟 NÚT ẨN HỌC SINH -->
//                         <button onclick="window.ham_4_24_loai_hoc_sinh(${index})" style="padding:6px 10px; background:#6c757d; color:white; border:none; border-radius:4px; cursor:pointer; font-weight:bold; font-size:12px;" title="Loại học sinh này khỏi danh sách nạp ảnh đợt này">🚫 Ẩn HS</button>
//                     </div>
//                 </td>
//             </tr>
//         `;
//     });
//     tbody.innerHTML = html;
// };



// =====================================================================
// HÀM 4.18: VẼ BẢNG GHÉP ẢNH (TÍCH HỢP TỰ ĐỘNG SORT)
// =====================================================================
window.ham_4_18_render_bang_avatar = function () {
    const tbody = document.getElementById('tbody-batch-avatar');
    if (!tbody) return;

    // 🌟 THỰC THI SẮP XẾP CHUẨN VIỆT NAM TRƯỚC KHI VẼ
    let heSo = window.BatchAvatarState.sortDirection === 'asc' ? 1 : -1;
    window.BatchAvatarState.dsHocSinh.sort((a, b) => window.ham_ho_tro_so_sanh_ten_vn(a.ten, b.ten) * heSo);

    // Cập nhật nhãn nút hiển thị
    const btnSort = document.getElementById('btn-sort-batch-avatar');
    if (btnSort) btnSort.innerHTML = window.BatchAvatarState.sortDirection === 'asc' ? '⬇️ A-Z' : '⬆️ Z-A';

    let html = '';
    window.BatchAvatarState.dsHocSinh.forEach((item, index) => {
        let currentAvatarHtml = item.anhHienTai
            ? `<img src="${item.anhHienTai}" style="width:50px; height:50px; object-fit:cover; border-radius:50%; border:2px solid #ccc; display:block; margin:0 auto; filter: grayscale(10%);">`
            : `<div style="width:50px; height:50px; border-radius:50%; border:2px dashed #ddd; background:#f8f9fa; display:flex; align-items:center; justify-content:center; margin:0 auto; color:#bbb; font-size:10px;">Chưa có</div>`;

        let isCoAnhMoi = item.previewBase64 !== null;
        let newAvatarHtml = isCoAnhMoi
            ? `<img src="${item.previewBase64}" style="width:60px; height:60px; object-fit:cover; border-radius:50%; border:3px solid #28a745; display:block; margin:0 auto; box-shadow:0 2px 5px rgba(0,0,0,0.2);">`
            : `<div style="width:60px; height:60px; border-radius:50%; border:2px dashed #ccc; background:#fafafa; display:flex; align-items:center; justify-content:center; margin:0 auto; color:#aaa; font-size:10px;">Chờ nạp...</div>`;

        let mauNen = isCoAnhMoi ? '#f0fdf4' : '#fff';

        html += `
            <tr style="border-bottom: 1px solid #eee; background: ${mauNen};">
                <td style="padding:10px; text-align:center; font-weight:bold; color:#666;">${index + 1}</td>
                <td style="padding:10px;">
                    <b style="color:#0056b3; font-size:15px;">${item.ten}</b><br>
                    <span style="font-size:12px; color:#888;">SĐT: ${item.sdt || '---'}</span>
                </td>
                <td style="padding:10px; text-align:center; border-right: 1px dashed #ddd; background: #fafafa;">
                    ${currentAvatarHtml}
                </td>
                <td style="padding:10px; text-align:center; position:relative;">
                    ${isCoAnhMoi ? `<span style="position:absolute; top:5px; right:15px; font-size:16px;">✨</span>` : ''}
                    ${newAvatarHtml}
                </td>
                <td style="padding:10px; text-align:center;">
                    <div style="display:flex; justify-content:center; gap:5px;">
                        <button onclick="window.ham_4_20_rut_anh_len(${index})" style="padding:6px; background:#e0f3ff; border:1px solid #b8daff; border-radius:4px; cursor:pointer;" title="Đổi chỗ ảnh này với học sinh ở TRÊN">⬆️</button>
                        <button onclick="window.ham_4_19_don_anh_xuong(${index})" style="padding:6px; background:#e0f3ff; border:1px solid #b8daff; border-radius:4px; cursor:pointer;" title="Đổi chỗ ảnh này với học sinh ở DƯỚI">⬇️</button>
                        <button onclick="window.ham_4_21_go_anh(${index})" style="padding:6px; background:#f8d7da; border:1px solid #f5c6cb; border-radius:4px; cursor:pointer;" title="Gỡ bỏ ảnh mới nạp này">🗑️</button>
                        <button onclick="window.ham_4_24_loai_hoc_sinh(${index})" style="padding:6px 10px; background:#6c757d; color:white; border:none; border-radius:4px; cursor:pointer; font-weight:bold; font-size:12px;" title="Loại học sinh này khỏi danh sách nạp ảnh đợt này">🚫 Ẩn HS</button>
                    </div>
                </td>
            </tr>
        `;
    });
    tbody.innerHTML = html;
};




// =====================================================================
// HÀM 4.19: ĐẨY ẢNH XUỐNG (HOÁN ĐỔI VỚI ẢNH BÊN DƯỚI)
// =====================================================================
window.ham_4_19_don_anh_xuong = function (index) {
    let ds = window.BatchAvatarState.dsHocSinh;
    if (index >= ds.length - 1) return; // Đang ở dòng cuối thì không đẩy xuống được nữa

    // Lưu tạm ảnh hiện tại
    let tempFile = ds[index].file;
    let tempPreview = ds[index].previewBase64;

    // Kéo ảnh dưới lên thay thế chỗ hiện tại
    ds[index].file = ds[index + 1].file;
    ds[index].previewBase64 = ds[index + 1].previewBase64;

    // Đẩy ảnh hiện tại (từ biến tạm) xuống chỗ bên dưới
    ds[index + 1].file = tempFile;
    ds[index + 1].previewBase64 = tempPreview;

    window.ham_4_18_render_bang_avatar(); // Vẽ lại giao diện
};

// =====================================================================
// HÀM 4.20: RÚT ẢNH LÊN (HOÁN ĐỔI VỚI ẢNH BÊN TRÊN)
// =====================================================================
window.ham_4_20_rut_anh_len = function (index) {
    let ds = window.BatchAvatarState.dsHocSinh;
    if (index === 0) return; // Đang ở dòng đầu thì không rút lên được nữa

    // Lưu tạm ảnh hiện tại
    let tempFile = ds[index].file;
    let tempPreview = ds[index].previewBase64;

    // Kéo ảnh trên xuống thay thế chỗ hiện tại
    ds[index].file = ds[index - 1].file;
    ds[index].previewBase64 = ds[index - 1].previewBase64;

    // Đẩy ảnh hiện tại (từ biến tạm) lên chỗ bên trên
    ds[index - 1].file = tempFile;
    ds[index - 1].previewBase64 = tempPreview;

    window.ham_4_18_render_bang_avatar(); // Vẽ lại giao diện
};

// HÀM 4.21: GỠ BỎ 1 ẢNH 
window.ham_4_21_go_anh = function (index) {
    window.BatchAvatarState.dsHocSinh[index].file = null;
    window.BatchAvatarState.dsHocSinh[index].previewBase64 = null;
    window.ham_4_18_render_bang_avatar();
};

// HÀM 4.22: NÉN ẢNH CANVAS TỐC ĐỘ CAO
window.ham_4_22_nen_anh_base64 = function (file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            const img = new Image();
            img.src = e.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                // Thuật toán Crop thành hình vuông ngay tâm ảnh
                const size = Math.min(img.width, img.height);
                const sx = (img.width - size) / 2;
                const sy = (img.height - size) / 2;

                canvas.width = 300;
                canvas.height = 300;

                ctx.drawImage(img, sx, sy, size, size, 0, 0, 300, 300);

                // Trả ra Base64 định dạng JPEG chất lượng 80% (Dung lượng chỉ khoảng ~15KB/tấm)
                resolve(canvas.toDataURL('image/jpeg', 0.8));
            };
        };
    });
};

// HÀM 4.23: LƯU ĐỒNG LOẠT VÀO DATABASE
window.ham_4_23_luu_dong_loat_avatar = async function (btnLuu) {
    let dsCoAnh = window.BatchAvatarState.dsHocSinh.filter(item => item.file !== null);
    if (dsCoAnh.length === 0) {
        alert("⚠️ Bảng đang trống, thầy chưa nạp bức ảnh nào!");
        return;
    }

    if (!confirm(`Thầy chuẩn bị lưu ${dsCoAnh.length} bức ảnh đại diện. Bắt đầu ngay?`)) return;

    btnLuu.innerHTML = "⏳ ĐANG LƯU... (0%)";
    btnLuu.disabled = true;

    let thanhCong = 0;

    try {
        for (let i = 0; i < dsCoAnh.length; i++) {
            let item = dsCoAnh[i];

            // 1. Nén ảnh tức thì trên RAM
            let base64SieuNhe = await window.ham_4_22_nen_anh_base64(item.file);

            // 2. Bắn lên Supabase
            const { error } = await _supabase.from('hoc_sinh')
                .update({ anh_dai_dien: base64SieuNhe })
                .eq('uid', item.uid);

            if (!error) thanhCong++;

            // Cập nhật giao diện thanh tiến trình
            let phanTram = Math.round(((i + 1) / dsCoAnh.length) * 100);
            btnLuu.innerHTML = `⏳ ĐANG LƯU... (${phanTram}%)`;
            btnLuu.style.background = `linear-gradient(90deg, #28a745 ${phanTram}%, #6c757d ${phanTram}%)`;
        }

        alert(`✅ HOÀN TẤT! Đã cập nhật thành công Avatar cho ${thanhCong} học sinh.`);
        document.body.removeChild(document.getElementById('modal-batch-avatar'));

    } catch (e) {
        alert("❌ Có lỗi hệ thống trong quá trình lưu: " + e.message);
    } finally {
        btnLuu.innerHTML = "💾 LƯU ĐỒNG LOẠT VÀO HỆ THỐNG";
        btnLuu.style.background = "#28a745";
        btnLuu.disabled = false;
    }
};


// =====================================================================
// HÀM 4.24: RÚT HỌC SINH KHỎI DANH SÁCH CHỜ CẬP NHẬT
// =====================================================================
window.ham_4_24_loai_hoc_sinh = function (index) {
    let hs = window.BatchAvatarState.dsHocSinh[index];

    // Nếu học sinh đã có ảnh chuẩn bị lưu, nhắc nhở trước khi gỡ
    if (hs.file && !confirm(`Em "${hs.ten}" đang được gán ảnh mới. Thầy có chắc muốn loại em này khỏi đợt cập nhật không?`)) {
        return;
    }

    // Rút em này khỏi mảng RAM
    window.BatchAvatarState.dsHocSinh.splice(index, 1);

    // Cập nhật lại giao diện ngay lập tức
    window.ham_4_18_render_bang_avatar();
};


// =====================================================================
// HÀM 4.25: XỬ LÝ ĐẢO CHIỀU SẮP XẾP BẢNG GHÉP ẢNH
// =====================================================================
window.ham_4_25_dao_chieu_sort_avatar = function () {
    window.BatchAvatarState.sortDirection = window.BatchAvatarState.sortDirection === 'asc' ? 'desc' : 'asc';
    window.ham_4_18_render_bang_avatar();
};



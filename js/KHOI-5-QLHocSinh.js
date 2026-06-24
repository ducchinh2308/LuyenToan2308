
// ==============================================================================
// KHỐI 5: QUẢN LÝ HỌC SINH (TÍCH HỢP SORT, KHÓA/MỞ TÀI KHOẢN)
// ==============================================================================

// Biến lưu trữ trạng thái bảng Học sinh để Sắp xếp siêu tốc
const BangHocSinhState = {
    duLieu: [],
    cotDangSort: 'ngay_tham_gia',
    tangDan: false // false = Mới nhất xếp trên
};



// =====================================================================
// Hàm 5.1: Vẽ bộ khung giao diện Quản lý học sinh (BỔ SUNG BỘ LỌC LỚP 🏫)
// =====================================================================
function ham_5_1_ve_quan_ly_hoc_sinh() {
    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');

    vungLamViec.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
            <h3 style="margin: 0; color: #6f42c1;">Danh sách Học sinh trên hệ thống</h3>
            
            <div style="display: flex; gap: 15px; align-items: center;">
                <div style="position: relative;">
                    <span style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%); opacity: 0.5;">🔍</span>
                    <input type="text" id="input-tim-kiem-qlhs" 
                           placeholder="Tìm Tên hoặc Số điện thoại..." 
                           oninput="ham_5_3_tim_kiem_live_hoc_sinh(this.value)"
                           style="padding: 10px 10px 10px 35px; border: 1px solid #ccc; border-radius: 6px; width: 280px; font-size: 14px; outline: none; box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);">
                </div>

                <button onclick="ham_5_2_tai_danh_sach_hoc_sinh()" style="padding: 10px 15px; background: #f1f3f4; color: #333; border: 1px solid #ccc; border-radius: 6px; cursor: pointer; font-weight: bold; white-space: nowrap;">
                    🔄 Làm mới
                </button>
            </div>
        </div>
        
        <div id="khung-nut-loc-lop-qlhs" style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px; padding: 10px; background: #f8f9fa; border-radius: 8px; border: 1px solid #e9ecef;">
            <span style="font-weight: bold; color: #495057; display: flex; align-items: center; margin-right: 5px; font-size: 13px;">🏫 Lọc theo lớp:</span>
            <button class="btn-loc-lop-hs active" onclick="ham_5_x_loc_hoc_sinh_theo_lop('TAT_CA', this)" style="padding: 6px 14px; background: #6f42c1; color: white; border: 1px solid #6f42c1; border-radius: 20px; font-weight: bold; cursor: pointer; font-size: 13px; transition: 0.2s;">👥 Tất cả học sinh</button>
            <span id="cac-nut-lop-hs-dong" style="display: flex; gap: 8px; flex-wrap: wrap;"></span>
        </div>
        
        <div id="danh-sach-hs-render">
            <p style="text-align: center; color: #666;">Đang tải dữ liệu học sinh từ máy chủ...</p>
        </div>
    `;

    // Gọi hàm tải dữ liệu
    ham_5_2_tai_danh_sach_hoc_sinh();
}




// =====================================================================
// Hàm 5.2: Tải dữ liệu từ Supabase (Bổ sung tự động sinh nút chọn lớp)
// =====================================================================
async function ham_5_2_tai_danh_sach_hoc_sinh() {
    const renderArea = document.getElementById('danh-sach-hs-render');
    try {
        const { data: dsHocSinh, error } = await _supabase
            .from('hoc_sinh')
            .select('*')
            .eq('vai_tro', 'hocsinh');

        if (error) throw error;

        BangHocSinhState.duLieu = dsHocSinh || [];

        // 🌟 VỊ TRÍ CẤY GHÉP: Tải từ điển lớp (nếu chưa có) và vẽ nút bấm lớp ngầm
        if (!window.tempDsLop) {
            const { data: dsLop } = await _supabase.from('lop_hoc').select('*');
            window.tempDsLop = dsLop || [];
        }

        const khungNutLopHS = document.getElementById('cac-nut-lop-hs-dong');
        if (khungNutLopHS && window.tempDsLop) {
            let htmlNutLop = '';
            window.tempDsLop.forEach(l => {
                const maLop = l.ma_lop || l.ma || l.id;
                const tenLop = l.ten_lop || l.ten || l.name || maLop;
                htmlNutLop += `
                    <button class="btn-loc-lop-hs" onclick="ham_5_x_loc_hoc_sinh_theo_lop('${maLop}', this)" style="padding: 6px 14px; background: white; color: #495057; border: 1px solid #ced4da; border-radius: 20px; font-weight: bold; cursor: pointer; font-size: 13px; transition: 0.2s;" onmouseover="this.style.background='#f1f3f4'" onmouseout="if(!this.classList.contains('active')) this.style.background='white'">
                        ${tenLop}
                    </button>
                `;
            });
            khungNutLopHS.innerHTML = htmlNutLop;
        }

        // Sau đó gọi hàm vẽ bảng của thầy như bình thường
        ham_5_10_ve_bang_hoc_sinh();

    } catch (error) {
        renderArea.innerHTML = `<p style="color: red;">Lỗi tải dữ liệu: ${error.message}</p>`;
    }
}


//// =====================================================================
//// Hàm mới: Thực hiện lọc nhanh danh sách học sinh theo lớp chọn trên RAM
//// =====================================================================


// [Nhãn thời gian: 12:48 - Ngày 28/05/2026] - Đồng bộ Nút Lọc lớp HS với Hàm vẽ bảng để STT chạy từ 1
window.ham_5_x_loc_hoc_sinh_theo_lop = function (maLopChon, nutBam) {
    // 1. Reset màu các nút lọc học sinh
    document.querySelectorAll('.btn-loc-lop-hs').forEach(btn => {
        btn.classList.remove('active');
        btn.style.background = 'white';
        btn.style.color = '#495057';
        btn.style.borderColor = '#ced4da';
    });

    // 2. Highlight nút vừa click
    if (nutBam) {
        nutBam.classList.add('active');
        nutBam.style.background = '#6f42c1';
        nutBam.style.color = 'white';
        nutBam.style.borderColor = '#6f42c1';
    }

    // 3. Gọi hàm vẽ bảng tái tạo lại cấu trúc và STT
    if (typeof window.ham_5_10_ve_bang_hoc_sinh === 'function') {
        window.ham_5_10_ve_bang_hoc_sinh();
    }
};




// [Nhãn thời gian: 12:48 - Ngày 28/05/2026] - Đồng bộ Tìm kiếm trực tiếp HS với Hàm vẽ bảng để STT chạy từ 1
window.ham_5_3_tim_kiem_live_hoc_sinh = function (tuKhoa) {
    // Không cần dùng JS can thiệp CSS nữa. Hàm 5.10 đã tự động đọc ô Input và dựng lại STT.
    if (typeof window.ham_5_10_ve_bang_hoc_sinh === 'function') {
        window.ham_5_10_ve_bang_hoc_sinh();
    }
};




// [Nhãn thời gian: 21:05 - Ngày 11/06/2026] - Bản nâng cấp: Bóc tách JSON chi tiết Kim Cương theo Mã Nhiệm Vụ của Lớp
// window.ham_5_10_ve_bang_hoc_sinh = async function () {
//     const renderArea = document.getElementById('danh-sach-hs-render');
//     let dsHocSinh = [...BangHocSinhState.duLieu];

//     if (dsHocSinh.length === 0) {
//         renderArea.innerHTML = `<p style="text-align: center; color: #666; padding: 20px; background: white; border-radius: 8px;">Chưa có học sinh nào.</p>`;
//         return;
//     }

//     // 🌟 1. LẤY TRẠNG THÁI BỘ LỌC TỪ GIAO DIỆN
//     const nutLopActive = document.querySelector('.btn-loc-lop-hs.active');
//     const maLopDangChon = nutLopActive ? nutLopActive.getAttribute('onclick').match(/'([^']+)'/)[1] : 'TAT_CA';
//     const oTimKiem = document.getElementById('input-tim-kiem-qlhs');
//     const tuKhoa = oTimKiem ? oTimKiem.value.toLowerCase().trim() : '';

//     // 🌟 2. THUẬT TOÁN ĐỐI CHIẾU MÃ NHIỆM VỤ -> LỚP
//     // Nếu lọc theo lớp cụ thể, ta cần kéo bảng nhiem_vu về làm Từ Điển (Chỉ kéo 1 lần lưu vào RAM để chống lag)
//     if (maLopDangChon !== 'TAT_CA' && !window.TuDienNhiemVu_Lop) {
//         try {
//             const headersAPI = { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` };
//             const resNV = await fetch(`${SUPABASE_URL}/rest/v1/nhiem_vu?select=ma_nhiem_vu,danh_sach_lop`, { method: 'GET', headers: headersAPI });
//             const dataNV = await resNV.json();

//             window.TuDienNhiemVu_Lop = {}; // Khởi tạo bộ nhớ tạm
//             if (dataNV) {
//                 dataNV.forEach(nv => {
//                     let mangLop = [];
//                     // Đảm bảo parse chuẩn định dạng Array của Supabase (VD: ["C8P2B"])
//                     if (Array.isArray(nv.danh_sach_lop)) {
//                         mangLop = nv.danh_sach_lop;
//                     } else if (typeof nv.danh_sach_lop === 'string') {
//                         try { mangLop = JSON.parse(nv.danh_sach_lop); } catch (e) { mangLop = [nv.danh_sach_lop]; }
//                     }
//                     window.TuDienNhiemVu_Lop[nv.ma_nhiem_vu] = mangLop;
//                 });
//             }
//         } catch (error) {
//             console.warn("⚠️ Không thể tải từ điển nhiệm vụ:", error);
//         }
//     }

//     // 🌟 3. TÍNH TOÁN LẠI ĐIỂM KIM CƯƠNG CHO TỪNG HỌC SINH
//     dsHocSinh.forEach(hs => {
//         if (maLopDangChon === 'TAT_CA') {
//             // Xem toàn trường -> Lấy cột tổng
//             hs._kimCuongLoc = hs.kim_cuong || 0;
//         } else {
//             // Xem riêng 1 lớp -> Bóc tách JSON {"NV_A": 4, "NV_B": 1}
//             let sumKC = 0;
//             if (hs.chi_tiet_kim_cuong && typeof hs.chi_tiet_kim_cuong === 'object' && window.TuDienNhiemVu_Lop) {
//                 // Duyệt qua từng nhiệm vụ học sinh đã làm
//                 for (const [maNV, diem] of Object.entries(hs.chi_tiet_kim_cuong)) {
//                     // Tra từ điển xem nhiệm vụ này có thuộc lớp đang chọn không
//                     const dsLopCuaNV = window.TuDienNhiemVu_Lop[maNV] || [];
//                     if (dsLopCuaNV.includes(maLopDangChon)) {
//                         sumKC += Number(diem); // Nếu đúng thuộc lớp này thì cộng dồn điểm
//                     }
//                 }
//             }
//             hs._kimCuongLoc = sumKC;
//         }
//     });

//     // 🌟 4. THUẬT TOÁN SORT ĐỘNG (Dựa vào điểm vừa tính)
//     const cot = BangHocSinhState.cotDangSort;
//     const heSo = BangHocSinhState.tangDan ? 1 : -1;
//     dsHocSinh.sort((a, b) => {
//         if (cot === 'kim_cuong') {
//             return (Number(a._kimCuongLoc || 0) - Number(b._kimCuongLoc || 0)) * heSo;
//         }
//         if (cot === 'diem_tich_luy') {
//             return (Number(a.diem_tich_luy || 0) - Number(b.diem_tich_luy || 0)) * heSo;
//         }

//         let valA = a[cot] === null ? '' : a[cot];
//         let valB = b[cot] === null ? '' : b[cot];
//         if (valA < valB) return -1 * heSo;
//         if (valA > valB) return 1 * heSo;
//         return 0;
//     });

//     const iconSort = BangHocSinhState.tangDan ? '▲' : '▼';
//     let nhanCotKimCuong = maLopDangChon === 'TAT_CA' ? '💎 Tổng Kim Cương' : `💎 KC (Lớp ${maLopDangChon})`;

//     let htmlTable = `
//         <div style="overflow-x: auto; border: 1px solid #dee2e6; border-radius: 8px;">
//             <table style="width: 100%; min-width: 1800px; border-collapse: collapse; background: white; font-size: 13px;">
//                 <thead>
//                     <tr style="background: #f8f9fa; text-align: left; border-bottom: 2px solid #dee2e6; white-space: nowrap; cursor: pointer;">
//                         <th style="padding: 10px; border: 1px solid #eee; text-align: center;">STT</th>
//                         <th style="padding: 10px; border: 1px solid #eee; text-align: center;">Thao tác</th>
//                         <th style="padding: 10px; border: 1px solid #eee; text-align: center;">Trạng thái</th>
//                         <th style="padding: 10px; border: 1px solid #eee; text-align: center; color: #00838f; background: ${maLopDangChon !== 'TAT_CA' ? '#e0f7fa' : 'transparent'};" onclick="ham_5_11_thay_doi_sort('kim_cuong')" title="Nhấn để sắp xếp theo điểm Kim Cương">${nhanCotKimCuong} ${cot === 'kim_cuong' ? iconSort : '↕'}</th>
//                         <th style="padding: 10px; border: 1px solid #eee;" onclick="ham_5_11_thay_doi_sort('ten')">Họ và Tên ${cot === 'ten' ? iconSort : '↕'}</th>
//                         <th style="padding: 10px; border: 1px solid #eee;" onclick="ham_5_11_thay_doi_sort('sdt')">SĐT ${cot === 'sdt' ? iconSort : '↕'}</th>
//                         <th style="padding: 10px; border: 1px solid #eee;">Mật khẩu</th>
//                         <th style="padding: 10px; border: 1px solid #eee;">Trường</th>
//                         <th style="padding: 10px; border: 1px solid #eee;">Tỉnh</th>
//                         <th style="padding: 10px; border: 1px solid #eee;">Khối</th>
//                         <th style="padding: 10px; border: 1px solid #eee;">Mã lớp tham gia</th>
//                         <th style="padding: 10px; border: 1px solid #eee; text-align: center;" onclick="ham_5_11_thay_doi_sort('diem_tich_luy')">Điểm TL ${cot === 'diem_tich_luy' ? iconSort : '↕'}</th>
//                         <th style="padding: 10px; border: 1px solid #eee;" onclick="ham_5_11_thay_doi_sort('lan_dang_nhap_cuoi')">Đăng nhập cuối ${cot === 'lan_dang_nhap_cuoi' ? iconSort : '↕'}</th>
//                         <th style="padding: 10px; border: 1px solid #eee;">Ngày tham gia</th>
//                         <th style="padding: 10px; border: 1px solid #eee;">Metadata</th>
//                         <th style="padding: 10px; border: 1px solid #eee;">UID (Mã định danh)</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//     `;

//     let sttChayHienTai = 1;
//     let coHocSinhNaoKhong = false;

//     dsHocSinh.forEach((hs) => {
//         const arrMaLop = hs.danh_sach_ma_lop || [];
//         const maLop = arrMaLop.length > 0 ? arrMaLop.join(', ') : '-';
//         const tenHsLower = (hs.ten || '').toLowerCase();
//         const sdtLower = (hs.so_dien_thoai || hs.sdt || '').toLowerCase();

//         // Kiểm tra bộ lọc
//         const hopLeLop = (maLopDangChon === 'TAT_CA' || arrMaLop.includes(maLopDangChon));
//         const hopLeTimKiem = (tuKhoa === '' || tenHsLower.includes(tuKhoa) || sdtLower.includes(tuKhoa));

//         if (hopLeLop && hopLeTimKiem) {
//             coHocSinhNaoKhong = true;
//             const mauTrangThai = hs.trang_thai == 1 ? '#28a745' : '#6c757d';
//             const chuTrangThai = hs.trang_thai == 1 ? 'Mở' : 'Khóa';
//             const tenAnToan = hs.ten ? hs.ten.replace(/'/g, "\\'") : 'Học sinh';
//             const soKC = hs._kimCuongLoc; // XUẤT KIM CƯƠNG ĐÃ ĐƯỢC LỌC RA UI

//             htmlTable += `
//                 <tr style="border-bottom: 1px solid #eee; white-space: nowrap; transition: 0.2s;" onmouseover="this.style.background='#f1f3f4'" onmouseout="this.style.background='transparent'">
//                     <td style="padding: 10px; border: 1px solid #eee; text-align: center; color:#666; font-weight:bold;">${sttChayHienTai++}</td>
//                     <td style="padding: 10px; border: 1px solid #eee; text-align: center;">
//                         <div style="display: flex; gap: 6px; justify-content: center;">
//                             <button onclick="ham_5_3_khoa_mo_tai_khoan('${hs.uid}', ${hs.trang_thai == 1 ? 0 : 1}, '${tenAnToan}')"
//                                     style="padding: 4px 8px; border-radius: 4px; border: 1px solid #ccc; cursor: pointer; background: ${hs.trang_thai == 1 ? '#fff1f0' : '#e6ffed'}; color: ${hs.trang_thai == 1 ? '#dc3545' : '#28a745'}; font-weight: bold; font-size:12px;">
//                                 ${hs.trang_thai == 1 ? '🔒 Khóa' : '🔓 Mở'}
//                             </button>
//                             <button onclick="ham_5_12_xoa_hoc_sinh('${hs.uid}')"
//                                     style="padding: 4px 8px; border-radius: 4px; border: 1px solid #dc3545; cursor: pointer; background: #dc3545; color: white; font-weight: bold; font-size:12px; transition:0.2s;"
//                                     onmouseover="this.style.background='#c82333'" onmouseout="this.style.background='#dc3545'">
//                                 🗑️ Xóa
//                             </button>
//                         </div>
//                     </td>
//                     <td style="padding: 10px; border: 1px solid #eee; text-align: center; color: ${mauTrangThai}; font-weight: bold;">${chuTrangThai}</td>
//                     <td style="padding: 10px; border: 1px solid #eee; text-align: center; font-weight: 900; color: #00acc1; background: ${maLopDangChon !== 'TAT_CA' ? '#fff9c4' : 'transparent'}; font-size: 14px;">${soKC}</td>
//                     <td style="padding: 10px; border: 1px solid #eee; font-weight: bold; color: #1a73e8;">${hs.ten}</td>
//                     <td style="padding: 10px; border: 1px solid #eee; font-weight: bold;">${hs.sdt}</td>
//                     <td style="padding: 10px; border: 1px solid #eee; color: #666;">${hs.mat_khau}</td>
//                     <td style="padding: 10px; border: 1px solid #eee;">${hs.truong || '-'}</td>
//                     <td style="padding: 10px; border: 1px solid #eee;">${hs.tinh || '-'}</td>
//                     <td style="padding: 10px; border: 1px solid #eee; text-align: center;">${hs.khoi_lop || '-'}</td>
//                     <td style="padding: 10px; border: 1px solid #eee; color: #d35400; font-weight: bold;">${maLop}</td>
//                     <td style="padding: 10px; border: 1px solid #eee; text-align: center; font-weight: bold; color: #e67e22;">${hs.diem_tich_luy || 0}</td>
//                     <td style="padding: 10px; border: 1px solid #eee; color: #555;">${hs.lan_dang_nhap_cuoi ? new Date(hs.lan_dang_nhap_cuoi).toLocaleString('vi-VN') : 'Chưa vào'}</td>
//                     <td style="padding: 10px; border: 1px solid #eee; color: #555;">${hs.ngay_tham_gia ? new Date(hs.ngay_tham_gia).toLocaleString('vi-VN') : '-'}</td>
//                     <td style="padding: 10px; border: 1px solid #eee; font-size: 10px; color: #999; max-width: 150px; overflow: hidden; text-overflow: ellipsis;">${JSON.stringify(hs.metadata)}</td>
//                     <td style="padding: 10px; border: 1px solid #eee; font-family: monospace; color: #888; font-size: 11px;">${hs.uid}</td>
//                 </tr>
//             `;
//         }
//     });

//     htmlTable += `</tbody></table></div>`;

//     if (!coHocSinhNaoKhong) {
//         renderArea.innerHTML = `<p style="text-align: center; color: #999; padding: 20px; background: white; border-radius: 8px;">🔍 Không có học sinh nào phù hợp với bộ lọc.</p>`;
//     } else {
//         renderArea.innerHTML = htmlTable;
//     }
// }

// [Nhãn thời gian: 21:05 - Ngày 11/06/2026] - Bản nâng cấp: Bóc tách JSON chi tiết Kim Cương theo Mã Nhiệm Vụ của Lớp
// 

// [Nhãn thời gian: 21:05 - Ngày 11/06/2026] - Bản nâng cấp: Bóc tách JSON Kim Cương + Giới hạn chiều rộng MỌI CỘT
window.ham_5_10_ve_bang_hoc_sinh = async function () {
    const renderArea = document.getElementById('danh-sach-hs-render');
    let dsHocSinh = [...BangHocSinhState.duLieu];

    if (dsHocSinh.length === 0) {
        renderArea.innerHTML = `<p style="text-align: center; color: #666; padding: 20px; background: white; border-radius: 8px;">Chưa có học sinh nào.</p>`;
        return;
    }

    // 🌟 1. LẤY TRẠNG THÁI BỘ LỌC TỪ GIAO DIỆN
    const nutLopActive = document.querySelector('.btn-loc-lop-hs.active');
    const maLopDangChon = nutLopActive ? nutLopActive.getAttribute('onclick').match(/'([^']+)'/)[1] : 'TAT_CA';
    const oTimKiem = document.getElementById('input-tim-kiem-qlhs');
    const tuKhoa = oTimKiem ? oTimKiem.value.toLowerCase().trim() : '';

    // 🌟 2. THUẬT TOÁN ĐỐI CHIẾU MÃ NHIỆM VỤ -> LỚP
    if (maLopDangChon !== 'TAT_CA' && !window.TuDienNhiemVu_Lop) {
        try {
            const headersAPI = { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` };
            const resNV = await fetch(`${SUPABASE_URL}/rest/v1/nhiem_vu?select=ma_nhiem_vu,danh_sach_lop`, { method: 'GET', headers: headersAPI });
            const dataNV = await resNV.json();

            window.TuDienNhiemVu_Lop = {}; 
            if (dataNV) {
                dataNV.forEach(nv => {
                    let mangLop = [];
                    if (Array.isArray(nv.danh_sach_lop)) {
                        mangLop = nv.danh_sach_lop;
                    } else if (typeof nv.danh_sach_lop === 'string') {
                        try { mangLop = JSON.parse(nv.danh_sach_lop); } catch (e) { mangLop = [nv.danh_sach_lop]; }
                    }
                    window.TuDienNhiemVu_Lop[nv.ma_nhiem_vu] = mangLop;
                });
            }
        } catch (error) {
            console.warn("⚠️ Không thể tải từ điển nhiệm vụ:", error);
        }
    }

    // 🌟 3. TÍNH TOÁN LẠI ĐIỂM KIM CƯƠNG CHO TỪNG HỌC SINH
    dsHocSinh.forEach(hs => {
        if (maLopDangChon === 'TAT_CA') {
            hs._kimCuongLoc = hs.kim_cuong || 0;
        } else {
            let sumKC = 0;
            if (hs.chi_tiet_kim_cuong && typeof hs.chi_tiet_kim_cuong === 'object' && window.TuDienNhiemVu_Lop) {
                for (const [maNV, diem] of Object.entries(hs.chi_tiet_kim_cuong)) {
                    const dsLopCuaNV = window.TuDienNhiemVu_Lop[maNV] || [];
                    if (dsLopCuaNV.includes(maLopDangChon)) {
                        sumKC += Number(diem); 
                    }
                }
            }
            hs._kimCuongLoc = sumKC;
        }
    });

    // 🌟 4. THUẬT TOÁN SORT ĐỘNG
    const cot = BangHocSinhState.cotDangSort;
    const heSo = BangHocSinhState.tangDan ? 1 : -1;
    dsHocSinh.sort((a, b) => {
        if (cot === 'kim_cuong') return (Number(a._kimCuongLoc || 0) - Number(b._kimCuongLoc || 0)) * heSo;
        if (cot === 'diem_tich_luy') return (Number(a.diem_tich_luy || 0) - Number(b.diem_tich_luy || 0)) * heSo;

        let valA = a[cot];
        let valB = b[cot];

        if (valA === null || valA === undefined) valA = '';
        if (valB === null || valB === undefined) valB = '';

        if (typeof valA === 'object') valA = JSON.stringify(valA);
        if (typeof valB === 'object') valB = JSON.stringify(valB);

        valA = valA.toString().toLowerCase();
        valB = valB.toString().toLowerCase();

        if (valA < valB) return -1 * heSo;
        if (valA > valB) return 1 * heSo;
        return 0;
    });

    const iconSort = BangHocSinhState.tangDan ? '▲' : '▼';
    let nhanCotKimCuong = maLopDangChon === 'TAT_CA' ? '💎 Tổng Kim Cương' : `💎 KC (Lớp ${maLopDangChon})`;

    // 🌟 5. VẼ BẢNG KÈM CSS ÉP XUỐNG DÒNG (word-wrap) CHO TẤT CẢ CÁC CỘT
    let htmlTable = `
        <style>
            .th-wrap { padding: 10px; border: 1px solid #eee; cursor: pointer; white-space: normal; vertical-align: middle; }
            .td-wrap { padding: 10px; border: 1px solid #eee; white-space: normal; overflow-wrap: anywhere; vertical-align: middle; line-height: 1.4; }
        </style>
        <div style="overflow-x: auto; border: 1px solid #dee2e6; border-radius: 8px;">
            <table style="width: 100%; min-width: 1600px; border-collapse: collapse; background: white; font-size: 13px;">
                <thead>
                    <tr style="background: #f8f9fa; text-align: left; border-bottom: 2px solid #dee2e6;">
                        <th class="th-wrap" style="text-align: center; max-width: 40px;">STT</th>
                        <th class="th-wrap" style="text-align: center; max-width: 110px;">Thao tác</th>
                        <th class="th-wrap" style="text-align: center; max-width: 90px;" onclick="ham_5_11_thay_doi_sort('trang_thai')">Trạng thái ${cot === 'trang_thai' ? iconSort : '↕'}</th>
                        <th class="th-wrap" style="text-align: center; color: #00838f; max-width: 110px; background: ${maLopDangChon !== 'TAT_CA' ? '#e0f7fa' : 'transparent'};" onclick="ham_5_11_thay_doi_sort('kim_cuong')" title="Nhấn để sắp xếp theo điểm Kim Cương">${nhanCotKimCuong} ${cot === 'kim_cuong' ? iconSort : '↕'}</th>
                        <th class="th-wrap" style="max-width: 200px;" onclick="ham_5_11_thay_doi_sort('ten')">Họ và Tên ${cot === 'ten' ? iconSort : '↕'}</th>
                        <th class="th-wrap" style="max-width: 100px;" onclick="ham_5_11_thay_doi_sort('sdt')">SĐT ${cot === 'sdt' ? iconSort : '↕'}</th>
                        <th class="th-wrap" style="max-width: 100px;" onclick="ham_5_11_thay_doi_sort('mat_khau')">Mật khẩu ${cot === 'mat_khau' ? iconSort : '↕'}</th>
                        <th class="th-wrap" style="max-width: 130px;" onclick="ham_5_11_thay_doi_sort('truong')">Trường ${cot === 'truong' ? iconSort : '↕'}</th>
                        <th class="th-wrap" style="max-width: 90px;" onclick="ham_5_11_thay_doi_sort('tinh')">Tỉnh ${cot === 'tinh' ? iconSort : '↕'}</th>
                        <th class="th-wrap" style="max-width: 60px; text-align: center;" onclick="ham_5_11_thay_doi_sort('khoi_lop')">Khối ${cot === 'khoi_lop' ? iconSort : '↕'}</th>
                        <th class="th-wrap" style="max-width: 150px;" onclick="ham_5_11_thay_doi_sort('danh_sach_ma_lop')">Mã lớp tham gia ${cot === 'danh_sach_ma_lop' ? iconSort : '↕'}</th>
                        <th class="th-wrap" style="max-width: 80px; text-align: center;" onclick="ham_5_11_thay_doi_sort('diem_tich_luy')">Điểm TL ${cot === 'diem_tich_luy' ? iconSort : '↕'}</th>
                        <th class="th-wrap" style="max-width: 110px;" onclick="ham_5_11_thay_doi_sort('lan_dang_nhap_cuoi')">Đăng nhập cuối ${cot === 'lan_dang_nhap_cuoi' ? iconSort : '↕'}</th>
                        <th class="th-wrap" style="max-width: 110px;" onclick="ham_5_11_thay_doi_sort('ngay_tham_gia')">Ngày tham gia ${cot === 'ngay_tham_gia' ? iconSort : '↕'}</th>
                        <th class="th-wrap" style="max-width: 150px;" onclick="ham_5_11_thay_doi_sort('metadata')">Metadata ${cot === 'metadata' ? iconSort : '↕'}</th>
                        <th class="th-wrap" style="max-width: 120px;" onclick="ham_5_11_thay_doi_sort('uid')">UID ${cot === 'uid' ? iconSort : '↕'}</th>
                    </tr>
                </thead>
                <tbody>
    `;

    let sttChayHienTai = 1;
    let coHocSinhNaoKhong = false;

    dsHocSinh.forEach((hs) => {
        const arrMaLop = hs.danh_sach_ma_lop || [];
        const maLop = arrMaLop.length > 0 ? arrMaLop.join(', ') : '-';
        const tenHsLower = (hs.ten || '').toLowerCase();
        const sdtLower = (hs.so_dien_thoai || hs.sdt || '').toLowerCase();

        // Kiểm tra bộ lọc
        const hopLeLop = (maLopDangChon === 'TAT_CA' || arrMaLop.includes(maLopDangChon));
        const hopLeTimKiem = (tuKhoa === '' || tenHsLower.includes(tuKhoa) || sdtLower.includes(tuKhoa));

        if (hopLeLop && hopLeTimKiem) {
            coHocSinhNaoKhong = true;
            const mauTrangThai = hs.trang_thai == 1 ? '#28a745' : '#6c757d';
            const chuTrangThai = hs.trang_thai == 1 ? 'Mở' : 'Khóa';
            const tenAnToan = hs.ten ? hs.ten.replace(/'/g, "\\'") : 'Học sinh';
            const soKC = hs._kimCuongLoc; 

            htmlTable += `
                <tr style="border-bottom: 1px solid #eee; transition: 0.2s;" onmouseover="this.style.background='#f1f3f4'" onmouseout="this.style.background='transparent'">
                    <td class="td-wrap" style="text-align: center; color:#666; font-weight:bold; max-width: 40px;">${sttChayHienTai++}</td>
                    <td class="td-wrap" style="text-align: center; max-width: 110px;">
                        <div style="display: flex; gap: 6px; justify-content: center;">
                            <button onclick="ham_5_3_khoa_mo_tai_khoan('${hs.uid}', ${hs.trang_thai == 1 ? 0 : 1}, '${tenAnToan}')"
                                    style="padding: 4px 8px; border-radius: 4px; border: 1px solid #ccc; cursor: pointer; background: ${hs.trang_thai == 1 ? '#fff1f0' : '#e6ffed'}; color: ${hs.trang_thai == 1 ? '#dc3545' : '#28a745'}; font-weight: bold; font-size:12px;">
                                ${hs.trang_thai == 1 ? '🔒 Khóa' : '🔓 Mở'}
                            </button>
                            <button onclick="ham_5_12_xoa_hoc_sinh('${hs.uid}')"
                                    style="padding: 4px 8px; border-radius: 4px; border: 1px solid #dc3545; cursor: pointer; background: #dc3545; color: white; font-weight: bold; font-size:12px; transition:0.2s;"
                                    onmouseover="this.style.background='#c82333'" onmouseout="this.style.background='#dc3545'">
                                🗑️ Xóa
                            </button>
                        </div>
                    </td>
                    <td class="td-wrap" style="text-align: center; color: ${mauTrangThai}; font-weight: bold; max-width: 90px;">${chuTrangThai}</td>
                    <td class="td-wrap" style="text-align: center; font-weight: 900; color: #00acc1; background: ${maLopDangChon !== 'TAT_CA' ? '#fff9c4' : 'transparent'}; font-size: 14px; max-width: 110px;">${soKC}</td>
                    <td class="td-wrap" style="font-weight: bold; color: #1a73e8; max-width: 200px;">${hs.ten}</td>
                    <td class="td-wrap" style="font-weight: bold; max-width: 100px;">${hs.sdt}</td>
                    <td class="td-wrap" style="color: #666; max-width: 100px;">${hs.mat_khau}</td>
                    <td class="td-wrap" style="max-width: 130px;">${hs.truong || '-'}</td>
                    <td class="td-wrap" style="max-width: 90px;">${hs.tinh || '-'}</td>
                    <td class="td-wrap" style="text-align: center; max-width: 60px;">${hs.khoi_lop || '-'}</td>
                    <td class="td-wrap" style="color: #d35400; font-weight: bold; max-width: 150px;">${maLop}</td>
                    <td class="td-wrap" style="text-align: center; font-weight: bold; color: #e67e22; max-width: 80px;">${hs.diem_tich_luy || 0}</td>
                    <td class="td-wrap" style="color: #555; max-width: 110px;">${hs.lan_dang_nhap_cuoi ? new Date(hs.lan_dang_nhap_cuoi).toLocaleString('vi-VN') : 'Chưa vào'}</td>
                    <td class="td-wrap" style="color: #555; max-width: 110px;">${hs.ngay_tham_gia ? new Date(hs.ngay_tham_gia).toLocaleString('vi-VN') : '-'}</td>
                    <td class="td-wrap" style="font-size: 11px; color: #888; font-family: monospace; max-width: 150px;">${hs.metadata ? JSON.stringify(hs.metadata) : '{}'}</td>
                    <td class="td-wrap" style="font-family: monospace; color: #888; font-size: 11px; max-width: 120px;">${hs.uid}</td>
                </tr>
            `;
        }
    });

    htmlTable += `</tbody></table></div>`;

    if (!coHocSinhNaoKhong) {
        renderArea.innerHTML = `<p style="text-align: center; color: #999; padding: 20px; background: white; border-radius: 8px;">🔍 Không có học sinh nào phù hợp với bộ lọc.</p>`;
    } else {
        renderArea.innerHTML = htmlTable;
    }
}

// Hàm 5.11: Xử lý Click tiêu đề để sắp xếp
function ham_5_11_thay_doi_sort(cotMoi) {
    if (BangHocSinhState.cotDangSort === cotMoi) {
        BangHocSinhState.tangDan = !BangHocSinhState.tangDan;
    } else {
        BangHocSinhState.cotDangSort = cotMoi;
        BangHocSinhState.tangDan = true;
    }
    ham_5_10_ve_bang_hoc_sinh();
}

// =====================================================================
// HÀM 5.12: XÓA VINH VIỄN HỌC SINH KHỎI HỆ THỐNG (BẢN LIÊN THÔNG 4 TABLE)
// =====================================================================
window.ham_5_12_xoa_hoc_sinh = async function (uidHocSinh) {
    // A. Tìm vị trí và thông tin học sinh trong mảng dữ liệu gốc bằng UID
    const indexTrongRam = BangHocSinhState.duLieu.findIndex(item => item.uid === uidHocSinh);
    if (indexTrongRam === -1) return alert("Lỗi: Không tìm thấy học sinh trên RAM bộ nhớ!");

    const hs = BangHocSinhState.duLieu[indexTrongRam];

    // B. Hiện cảnh báo xác nhận tâm lý cho Giáo viên
    Swal.fire({
        title: `⚠️ CẢNH BÁO XÓA TOÀN DIỆN!`,
        html: `Thầy sắp xóa vĩnh viễn học sinh <b style="color:#dc3545;">${hs.ten.toUpperCase()}</b>.<br><br>` +
            `Hệ thống sẽ chạy tiến trình dọn dẹp sạch sẽ qua 4 bước:<br>` +
            `1. Xóa lịch sử điểm thi tại bảng <b>ket_qua_thi</b><br>` +
            `2. Xóa đơn từ xin cứu trợ tại bảng <b>yeu_cau_hoc_sinh</b><br>` +
            `3. Rút tên UID học sinh khỏi mảng <b>hoc_sinh_ids</b> ở bảng <b>lop_hoc</b><br>` +
            `4. Tiêu hủy tài khoản gốc tại bảng <b>hoc_sinh</b>.<br><br>` +
            `<span style="color:#e67e22; font-weight:bold;">Hành động này không thể hoàn tác. Xác nhận xóa?</span>`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d',
        confirmButtonText: '🗑️ Xác nhận Xóa sạch',
        cancelButtonText: 'Hủy',
        showLoaderOnConfirm: true,
        preConfirm: async () => {
            try {
                // 🌟 BƯỚC 1: Xóa bài làm trong bảng ket_qua_thi
                const { error: err1 } = await _supabase
                    .from('ket_qua_thi')
                    .delete()
                    .eq('uid_hoc_sinh', uidHocSinh);
                if (err1) throw new Error(`Lỗi két sắt điểm thi: ${err1.message}`);

                // 🌟 BƯỚC 2: Xóa hòm thư yêu cầu trong bảng yeu_cau_hoc_sinh
                const { error: err2 } = await _supabase
                    .from('yeu_cau_hoc_sinh')
                    .delete()
                    .eq('uid_hoc_sinh', uidHocSinh);
                if (err2) throw new Error(`Lỗi hòm thư xin lượt: ${err2.message}`);

                // 🌟 BƯỚC 3: Rút mã UID khỏi cột mảng hoc_sinh_ids của bảng lop_hoc
                let dsMaLopCuaEm = [];
                try {
                    dsMaLopCuaEm = Array.isArray(hs.danh_sach_ma_lop) ? hs.danh_sach_ma_lop : JSON.parse(hs.danh_sach_ma_lop || '[]');
                } catch (e) { }

                if (dsMaLopCuaEm && dsMaLopCuaEm.length > 0) {
                    for (const maLop of dsMaLopCuaEm) {
                        // Đọc mảng hoc_sinh_ids hiện tại của lớp đó về
                        const { data: dataLop } = await _supabase
                            .from('lop_hoc')
                            .select('hoc_sinh_ids')
                            .eq('ma_lop', maLop)
                            .single();

                        if (dataLop && Array.isArray(dataLop.hoc_sinh_ids)) {
                            // Lọc bỏ UID học sinh này ra khỏi mảng text[] của Postgres
                            const mangIdsMoi = dataLop.hoc_sinh_ids.filter(id => id !== uidHocSinh);

                            // Cập nhật ngược lại vào table lop_hoc
                            await _supabase
                                .from('lop_hoc')
                                .update({ hoc_sinh_ids: mangIdsMoi })
                                .eq('ma_lop', maLop);
                        }
                    }
                }

                // 🌟 BƯỚC 4: Xóa tài khoản gốc trong bảng hoc_sinh
                const { error: err4 } = await _supabase
                    .from('hoc_sinh')
                    .delete()
                    .eq('uid', uidHocSinh);
                if (err4) throw err4;

                return true;

            } catch (error) {
                Swal.showValidationMessage(`Lỗi hệ thống khi quét xóa: ${error.message}`);
                return false;
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({ icon: 'success', title: 'Đã xóa hoàn tất!', text: `Dữ liệu của học sinh ${hs.ten} đã bốc hơi hoàn toàn sạch sẽ.`, timer: 1800, showConfirmButton: false });

            // Xóa phần tử khỏi RAM để bảng tự động co dòng lại mà không cần tải lại trang
            BangHocSinhState.duLieu.splice(indexTrongRam, 1);
            ham_5_10_ve_bang_hoc_sinh();
        }
    });
};


// Hàm 5.3: Thực hiện Khóa hoặc Mở khóa tài khoản học sinh
async function ham_5_3_khoa_mo_tai_khoan(uid, trangThaiMoi, tenHS) {
    // Chỉ cần gán đúng chữ: Nếu trạng thái muốn đổi thành là 1 -> Hiện "MỞ KHÓA", ngược lại hiện "KHÓA"
    const hanhDong = parseInt(trangThaiMoi) === 1 ? "MỞ KHÓA" : "KHÓA";

    if (!confirm(`Thầy có chắc chắn muốn ${hanhDong} tài khoản của học sinh: ${tenHS}?`)) return;

    document.getElementById('danh-sach-hs-render').innerHTML = `<p style="text-align: center; color: #f39c12;">Đang xử lý...</p>`;

    try {
        const { error } = await _supabase
            .from('hoc_sinh')
            .update({ trang_thai: parseInt(trangThaiMoi) })
            .eq('uid', uid);

        if (error) throw error;

        // Tải lại bảng sau khi cập nhật thành công
        ham_5_2_tai_danh_sach_hoc_sinh();

    } catch (error) {
        alert(`Lỗi khi ${hanhDong}: ` + error.message);
        ham_5_10_ve_bang_hoc_sinh();
    }
}


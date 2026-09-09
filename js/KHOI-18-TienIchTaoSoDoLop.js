// =====================================================================
// KHỐI 18: TIỆN ÍCH - TẠO SƠ ĐỒ LỚP HỌC
// =====================================================================

// 18.1. HÀM MỞ GIAO DIỆN VÀ TẢI DANH SÁCH LỚP VÀO VÙNG LÀM VIỆC
window.ham_18_1_mo_giao_dien_so_do_lop = async function () {
    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
    if (!vungLamViec) return;

    // Đổ khung HTML của Sơ đồ vào vùng làm việc
    vungLamViec.innerHTML = `
        <div style="padding: 10px; animation: fadeIn 0.3s ease-in-out;">
            <h3 style="color: #0056b3; border-bottom: 2px solid #0056b3; padding-bottom: 10px; margin-top: 0; text-transform: uppercase;">
                📍 Tiện ích: Tạo sơ đồ lớp học
            </h3>

            <!-- Thanh công cụ -->
            <div style="margin-bottom: 20px; margin-top: 20px; padding: 15px; background: #fff; border-radius: 8px; border: 1px solid #ddd; display: flex; gap: 15px; align-items: center; flex-wrap: wrap; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                <label style="font-weight: bold; color: #495057;">Chọn lớp:</label>
                <select id="select-lop-so-do" style="padding: 8px 12px; border-radius: 6px; border: 1px solid #ccc; min-width: 200px; outline: none; font-weight: bold;">
                    <option value="">⏳ Đang tải danh sách lớp...</option>
                </select>

                <label style="font-weight: bold; color: #495057; margin-left: 10px;">Số dãy bàn (Cột):</label>
                <input type="number" id="input-so-cot" value="4" min="2" max="10" style="padding: 8px 12px; width: 70px; border-radius: 6px; border: 1px solid #ccc; outline: none; text-align: center; font-weight: bold;">

                <button onclick="ham_18_2_ve_so_do_lop()" style="padding: 8px 20px; background: #17a2b8; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; transition: 0.2s; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin-left: auto;">
                    🎨 Xếp sơ đồ
                </button>
                <button onclick="window.print()" style="padding: 8px 20px; background: #6c757d; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; transition: 0.2s; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    🖨️ In sơ đồ
                </button>
            </div>

            <!-- Bảng giáo viên -->
            <div style="text-align: center; margin-bottom: 40px; margin-top: 30px;">
                <div style="display: inline-block; padding: 12px 80px; background: #343a40; color: white; font-weight: bold; border-radius: 6px; letter-spacing: 3px; box-shadow: 0 4px 6px rgba(0,0,0,0.2); border-bottom: 4px solid #23272b;">
                    BẢNG GIÁO VIÊN
                </div>
            </div>

            <!-- Khung chứa sơ đồ lớp (CSS Grid) -->
            <div id="khung-so-do-grid" style="display: grid; gap: 20px; justify-content: center; margin-top: 20px; padding-bottom: 40px;">
                <div style="color: #6c757d; grid-column: 1 / -1; text-align: center; font-style: italic; font-size: 15px;">
                    Vui lòng chọn một lớp bên trên và bấm "Xếp sơ đồ" để hệ thống tải dữ liệu...
                </div>
            </div>
        </div>
    `;

    // Kết nối Supabase tải danh sách lớp vào thẻ Select
    const selectLop = document.getElementById('select-lop-so-do');
    try {
        const { data: dsLop, error } = await _supabase
            .from('lop_hoc')
            .select('ma_lop, ten_lop')
            .order('ten_lop', { ascending: true });

        if (error) throw error;

        if (dsLop && dsLop.length > 0) {
            selectLop.innerHTML = '<option value="">-- Chọn lớp cần xem --</option>';
            dsLop.forEach(lop => {
                selectLop.innerHTML += `<option value="${lop.ma_lop}">${lop.ten_lop}</option>`;
            });
        } else {
            selectLop.innerHTML = '<option value="">Chưa có dữ liệu lớp học</option>';
        }
    } catch (err) {
        selectLop.innerHTML = '<option value="">❌ Lỗi tải dữ liệu lớp</option>';
        console.error("Lỗi Khối 18:", err);
    }
};

// 18.2. HÀM TRÍCH XUẤT HỌC SINH VÀ VẼ SƠ ĐỒ LƯỚI
window.ham_18_2_ve_so_do_lop = async function () {
    const maLop = document.getElementById('select-lop-so-do').value;
    const soCot = document.getElementById('input-so-cot').value || 4;
    const khungSoDo = document.getElementById('khung-so-do-grid');

    if (!maLop) {
        Swal.fire('Chú ý', 'Thầy vui lòng chọn một lớp trong danh sách!', 'warning');
        return;
    }

    khungSoDo.innerHTML = "<div style='text-align:center; grid-column: 1 / -1; font-weight: bold; color: #17a2b8; font-size: 16px;'>⏳ Hệ thống đang xếp chỗ ngồi...</div>";

    try {
        // Quét toàn bộ học sinh có chứa mã lớp này (Sử dụng like để dò trong mảng JSON chuỗi)
        const { data: hsData, error } = await _supabase
            .from('hoc_sinh')
            .select('uid, ten, anh_dai_dien, danh_sach_ma_lop')
            .like('danh_sach_ma_lop', `%${maLop}%`)
            .order('ten', { ascending: true });

        if (error) throw error;

        // Lọc lại bằng JS một lần nữa để tránh nhiễu (Ví dụ mã LOP1 bị nhầm với LOP10)
        const hsLopNay = hsData.filter(hs => {
            try {
                const mangLop = Array.isArray(hs.danh_sach_ma_lop) ? hs.danh_sach_ma_lop : JSON.parse(hs.danh_sach_ma_lop || '[]');
                return mangLop.includes(maLop);
            } catch (e) { return false; }
        });

        if (!hsLopNay || hsLopNay.length === 0) {
            khungSoDo.innerHTML = "<div style='color:#dc3545; grid-column: 1 / -1; text-align: center; font-weight: bold; padding: 20px; background: #f8d7da; border-radius: 8px;'>Lớp này hiện chưa có học sinh nào đăng ký.</div>";
            return;
        }

        // Cập nhật số cột (số dãy bàn) cho Grid dựa theo input
        khungSoDo.style.gridTemplateColumns = `repeat(${soCot}, 1fr)`;

        let htmlGrid = "";
        hsLopNay.forEach((hs, index) => {
            // Tự động tạo ảnh thẻ mặc định đẹp mắt nếu học sinh chưa up ảnh
            const urlAnh = hs.anh_dai_dien || `https://ui-avatars.com/api/?name=${encodeURIComponent(hs.ten)}&background=random&color=fff&size=128&bold=true`;

            htmlGrid += `
                <div style="background: #fff; border: 2px solid #e9ecef; border-radius: 12px; padding: 20px 10px; text-align: center; box-shadow: 0 4px 8px rgba(0,0,0,0.06); display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; overflow: hidden;">
                    
                    <div style="position: absolute; top: 0; left: 0; width: 100%; height: 5px; background: #17a2b8;"></div>
                    
                    <div style="font-size: 11px; color: #6c757d; margin-bottom: 12px; font-weight: 900; background: #f8f9fa; padding: 3px 10px; border-radius: 12px; border: 1px solid #ddd; text-transform: uppercase;">
                        Bàn ${index + 1}
                    </div>
                    
                    <img src="${urlAnh}" onerror="this.src='https://ui-avatars.com/api/?name=HS&background=ccc'" alt="Avatar" style="width: 85px; height: 85px; border-radius: 50%; object-fit: cover; border: 3px solid #e9ecef; margin-bottom: 15px; background: #f8f9fa; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                    
                    <div style="font-weight: bold; color: #2c3e50; font-size: 15px; width: 100%; text-align: center; line-height: 1.4; padding: 0 5px;" title="${hs.ten}">
                        ${hs.ten}
                    </div>
                </div>
            `;
        });

        khungSoDo.innerHTML = htmlGrid;

    } catch (err) {
        Swal.fire('Lỗi', "Không thể tải sơ đồ: " + err.message, 'error');
        khungSoDo.innerHTML = "";
    }
};
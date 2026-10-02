// ==============================================================================
// KHỐI 7b: QUẢN LÝ NHIỆM VỤ - TỰ LUẬN
// ==============================================================================

if (!window.BangNhiemVuTLState) {
    window.BangNhiemVuTLState = {
        duLieu: [],
        cotDangSort: 'ngay_tao',
        tangDan: false
    };
}

// Từ điển hằng số Tự luận (Đã rút gọn các phần không cần thiết như Đảo đề)
const CFG_NV_TL = {
    THOI_DIEM: { KHOA: "KHOA_HOAN_TOAN", SAU_NOP: "SAU_KHI_NOP", SAU_HET_HAN: "SAU_KHI_HET_HAN", HEN_GIO: "HEN_GIO" },
    MUC_DO: { KHONG: "NONE", CO_BAN: "CHI_DIEM", FULL_LOIGIAI: "FULL_NHAN_XET_FILE" },
    PREFIX_LOAI: { "Bài tập về nhà": "BTVN", "Kiểm tra 15p": "KT15", "Kiểm tra 1 tiết": "KT45", "Khác": "KH" }
};

// =====================================================================
// Hàm 7b.1: Vẽ bộ khung giao diện Quản lý Nhiệm Vụ Tự Luận
// =====================================================================
window.ham_7b_1_ve_quan_ly_nhiem_vu_tu_luan = function () {
    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');

    vungLamViec.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
            <h3 style="margin: 0; color: #17a2b8;">✍️ Quản lý Nhiệm Vụ (Tự Luận)</h3>
            
            <div style="display: flex; gap: 15px; align-items: center;">
                <div style="position: relative;">
                    <span style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%); opacity: 0.5;">🔍</span>
                    <input type="text" id="input-tim-kiem-qlnv-tl" 
                           placeholder="Tìm tên nhiệm vụ, mã lớp..." 
                           oninput="ham_7b_14_tim_kiem_live_nhiem_vu_tu_luan(this.value)"
                           style="padding: 10px 10px 10px 35px; border: 1px solid #ccc; border-radius: 6px; width: 280px; font-size: 14px; outline: none; box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);">
                </div>

                <button onclick="ham_7b_2_tai_danh_sach_nhiem_vu_tu_luan()" style="padding: 10px 15px; background: #f1f3f4; color: #333; border: 1px solid #ccc; border-radius: 6px; cursor: pointer; font-weight: bold; white-space: nowrap;">
                    🔄 Làm mới
                </button>
                <button onclick="ham_7b_3_hien_form_them_nhiem_vu_tu_luan()" style="padding: 10px 15px; background: #17a2b8; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(23,162,184,0.2); white-space: nowrap;">
                    + Tạo Nhiệm Vụ Tự Luận
                </button>
            </div>
        </div>

        <div id="khung-nut-loc-lop-nv-tl" style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px; padding: 12px; background: #f8f9fa; border-radius: 8px; border: 1px solid #e9ecef; align-items: center;">
            <span style="font-weight: 900; color: #2c3e50; display: flex; align-items: center; margin-right: 10px; font-size: 13px; text-transform: uppercase;">🏷️ Phân loại:</span>
            <button class="btn-loc-lop-tl active" onclick="ham_7b_6_loc_nhiem_vu_theo_lop_tu_luan('TAT_CA', this)" style="padding: 6px 16px; background: #1a73e8; color: white; border: 1px solid #1a73e8; border-radius: 20px; font-weight: bold; cursor: pointer; font-size: 13px;">📚 Tất cả</button>
            <div style="height: 24px; width: 2px; background: #dee2e6; margin: 0 5px;"></div>
            <span id="cac-nut-lop-dong-tl" style="display: flex; gap: 8px; flex-wrap: wrap;"></span>
        </div>
        <div id="danh-sach-nv-tl-render">
            <p style="text-align: center; color: #666;">Đang tải danh sách nhiệm vụ tự luận...</p>
        </div>
    `;

    ham_7b_2_tai_danh_sach_nhiem_vu_tu_luan();
};

// =====================================================================
// Hàm 7b.2: Tải dữ liệu bảng nhiem_vu_tu_luan (Đã Fix lỗi 400)
// =====================================================================
window.ham_7b_2_tai_danh_sach_nhiem_vu_tu_luan = async function () {
    const renderArea = document.getElementById('danh-sach-nv-tl-render');
    if (!renderArea) return;

    try {
        // 1. SỬA LỖI Ở ĐÂY: Chỉ select 'metadata', loại bỏ 'dinh_dang' vì nó nằm trong metadata
        const { data: dsNhiemVu, error } = await _supabase
            .from('nhiem_vu_tu_luan')
            .select(`
                *, 
                hoc_lieu_tu_luan ( metadata )
            `)
            .order('ngay_tao', { ascending: false });

        if (error) {
            console.error("Lỗi Supabase:", error);
            throw new Error(error.message + " (Nếu lỗi relationship, hãy kiểm tra lại Khóa ngoại - Foreign Key)");
        }

        // Lấy tên GV
        const dsUidGv = [...new Set((dsNhiemVu || []).map(nv => nv.uid_gv_tao).filter(Boolean))];
        let tuDienTenGv = {};
        if (dsUidGv.length > 0) {
            const { data: dsGv } = await _supabase.from('hoc_sinh').select('uid, ten').in('uid', dsUidGv);
            if (dsGv) dsGv.forEach(gv => tuDienTenGv[gv.uid] = gv.ten);
        }

        // Lấy Tên Lớp
        if (!window.tempDsLop || window.tempDsLop.length === 0) {
            const { data: dsLop } = await _supabase.from('lop_hoc').select('*');
            window.tempDsLop = dsLop || [];
        }

        // Render nút lớp
        const khungNutLop = document.getElementById('cac-nut-lop-dong-tl');
        if (khungNutLop && window.tempDsLop.length > 0) {
            khungNutLop.innerHTML = window.tempDsLop.map(l => {
                const maLop = l.ma_lop || l.id;
                const tenLop = l.ten_lop || l.ten || maLop;
                return `<button class="btn-loc-lop-tl" onclick="ham_7b_6_loc_nhiem_vu_theo_lop_tu_luan('${maLop}', this)" style="padding: 6px 14px; background: white; color: #495057; border: 1px solid #ced4da; border-radius: 20px; font-weight: bold; cursor: pointer; font-size: 13px;">🏫 ${tenLop}</button>`;
            }).join('');
        }

        // Gộp dữ liệu
        window.BangNhiemVuTLState.duLieu = (dsNhiemVu || []).map(nv => {
            const hl = Array.isArray(nv.hoc_lieu_tu_luan) ? nv.hoc_lieu_tu_luan[0] : nv.hoc_lieu_tu_luan;

            // 2. SỬA LỖI Ở ĐÂY: Trích xuất an toàn dinh_dang từ chuỗi JSON metadata
            let meta = hl ? hl.metadata : null;
            if (typeof meta === 'string') {
                try { meta = JSON.parse(meta); } catch (e) { }
            }

            return {
                ...nv,
                ten_gv_tao: tuDienTenGv[nv.uid_gv_tao] || 'Không xác định',
                metadata_hoc_lieu: meta,
                dinh_dang_hoc_lieu: meta ? meta.dinh_dang : null
            };
        });

        ham_7b_12_ve_bang_nhiem_vu_tu_luan();

    } catch (error) {
        renderArea.innerHTML = `<p style="color: red; padding: 20px;">❌ Lỗi tải dữ liệu: ${error.message}</p>`;
    }
};

// =====================================================================
// Hàm 7b.3: Vẽ Form Tạo Nhiệm Vụ (TỰ LUẬN) - Đã link đúng khối 6b
// =====================================================================
window.ham_7b_3_hien_form_them_nhiem_vu_tu_luan = async function () {
    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
    vungLamViec.innerHTML = `<div style="text-align: center; padding: 40px;"><p>⏳ Đang tải dữ liệu hệ thống (Học liệu Tự luận, Danh sách lớp)...</p></div>`;

    try {
        const tapKyTu = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let chuoiNgauNhien = Array(6).fill(0).map(() => tapKyTu.charAt(Math.floor(Math.random() * tapKyTu.length))).join('');
        const maNV_MacDinh = "NV_TL_" + chuoiNgauNhien;

        // Kéo dữ liệu từ Bảng Tự luận
        const { data: dsHocLieu } = await _supabase.from('hoc_lieu_tu_luan').select('*').order('ngay_tao', { ascending: false });
        window.tempDsHocLieuTL = dsHocLieu || [];

        // Dựng danh sách Option
        let htmlOptionsHL = `<option value="KHONG_DUNG" style="font-weight: bold; color: red;">[ --- Không sử dụng học liệu đính kèm --- ]</option>`;
        window.tempDsHocLieuTL.forEach(hl => {
            let meta = typeof hl.metadata === 'string' ? JSON.parse(hl.metadata || '{}') : (hl.metadata || {});
            let icon = meta.loai_tu_luan === 'text' ? '✍️' : '📁';
            let coGiai = (hl.url_file_giai || meta.noi_dung_giai || meta.kieu_giai === 'text') ? ' (Có bài giải)' : '';
            htmlOptionsHL += `<option value="${hl.ma_hoc_lieu}">${icon} [${hl.ma_hoc_lieu}] - ${hl.ten_hoc_lieu}${coGiai}</option>`;
        });

        // Dựng danh sách Lớp
        let htmlLop = '';
        if (window.tempDsLop && window.tempDsLop.length > 0) {
            htmlLop = window.tempDsLop.map(l => `
                <label style="display: inline-flex; align-items: center; width: 140px; margin-bottom: 10px; cursor: pointer;">
                    <input type="checkbox" class="chk-lop-tl" value="${l.ma_lop || l.id}" style="transform: scale(1.3); margin-right: 8px;"> 
                    <span style="font-weight: bold; color: #17a2b8; font-size: 14px;">${l.ten_lop || l.ten || l.ma_lop}</span>
                </label>
            `).join('');
        } else {
            htmlLop = `<span style="color: #856404;">⚠️ Không tìm thấy danh sách lớp!</span>`;
        }

        vungLamViec.innerHTML = `
            <div style="max-width: 950px; background: white; padding: 25px; border-radius: 12px; margin: 0 auto; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
                <h3 style="color: #17a2b8; margin-top: 0; border-bottom: 2px solid #f1f3f4; padding-bottom: 10px;">✍️ TẠO NHIỆM VỤ TỰ LUẬN</h3>
                
                <div style="background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
                    <h4 style="margin-top: 0; color: #495057;">1. Thông tin chung</h4>
                    <div style="display: grid; grid-template-columns: 1fr 2fr 1fr; gap: 15px;">
                        <div>
                            <label style="font-weight:bold; font-size: 13px;">Mã NV (Tự động):</label>
                            <input type="text" id="add_nv_ma_tl" value="${maNV_MacDinh}" readonly style="width: 100%; padding: 8px; background: #e9ecef; border: 1px solid #ccc; border-radius: 4px; font-weight:bold; color: #17a2b8;">
                        </div>
                        <div>
                            <label style="font-weight:bold; font-size: 13px;">Tên Nhiệm Vụ (*):</label>
                            <input type="text" id="add_nv_ten_tl" placeholder="Ví dụ: Bài tập về nhà tuần 1..." style="width: 100%; padding: 8px; border: 1px solid #17a2b8; border-radius: 4px;">
                        </div>
                        <div>
                            <label style="font-weight:bold; font-size: 13px;">Loại nhiệm vụ:</label>
                            <select id="add_nv_loai_tl" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                                <option value="Bài tập về nhà">Bài tập về nhà</option>
                                <option value="Kiểm tra 15p">Kiểm tra 15p</option>
                                <option value="Khác">Khác</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div style="background: #e6f2ff; border: 1px solid #b8daff; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
                    <h4 style="margin-top: 0; color: #0056b3;">2. Đính kèm Học Liệu Tự Luận</h4>
                    <div style="display: flex; gap: 10px; align-items: center;">
                        <select id="add_nv_maHL_tl" onchange="ham_7b_4_xu_ly_chon_hoc_lieu_tu_luan()" style="flex: 1; padding: 10px; border: 2px solid #17a2b8; border-radius: 6px; font-weight:bold; cursor: pointer;">
                            ${htmlOptionsHL}
                        </select>
                        
                        <button type="button" onclick="ham_6b_3_toggle_form_them_moi()" style="padding: 10px 20px; background: #fd7e14; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; white-space: nowrap; box-shadow: 0 2px 4px rgba(253,126,20,0.3);">
                            ➕ Tạo Học Liệu Mới
                        </button>
                    </div>

                    <div id="khu-vuc-tao-moi-tl" style="display: none; margin-top: 15px; background: white; border-radius: 8px;">
                        <div id="form-render-tu-luan"></div>
                    </div>

                    <div id="khu_vuc_xem_truoc_hl_tl" style="display: none; margin-top: 15px; border-top: 1px dashed #b8daff; padding-top: 15px;"></div>
                </div>

                <div style="background: #fff8e6; border: 1px solid #ffe8a1; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
                    <h4 style="margin-top: 0; color: #d35400;">3. Giao việc & Cấu hình nộp bài</h4>
                    <div style="margin-bottom: 20px; border-bottom: 1px dashed #ccc; padding-bottom: 15px;">
                        <label style="font-weight:bold; font-size: 13px; display:block; margin-bottom: 5px;">Giao cho Lớp (*):</label>
                        <div style="margin-bottom: 10px;">
                            <button onclick="document.querySelectorAll('.chk-lop-tl').forEach(c => c.checked = true)" style="padding: 3px 8px; font-size: 11px;">Chọn tất cả</button>
                            <button onclick="document.querySelectorAll('.chk-lop-tl').forEach(c => c.checked = false)" style="padding: 3px 8px; font-size: 11px;">Bỏ chọn</button>
                        </div>
                        <div style="background: white; padding: 10px; border: 1px solid #ddd; border-radius: 4px; max-height: 120px; overflow-y: auto;">
                            ${htmlLop}
                        </div>
                    </div>

                    <div style="display: flex; flex-direction: column; gap: 12px;">
                        <div style="display: flex; align-items: center; background: white; padding: 8px 12px; border-radius: 6px; border: 1px solid #eee;">
                            <label style="width: 160px; font-size: 13px; font-weight:bold;">🟢 Trạng thái NV:</label>
                            <select id="add_nv_trangthai_tl" style="flex: 1; padding: 8px; border: 1px solid #28a745; border-radius: 4px; font-weight: bold;">
                                <option value="1" selected>🟢 Nhận bài (Kích hoạt)</option>
                                <option value="0">🔴 Khóa (Dừng nhận bài)</option>
                            </select>
                        </div>

                        <div style="display: flex; align-items: flex-start; background: white; padding: 8px 12px; border-radius: 6px; border: 1px solid #eee;">
                            <label style="width: 160px; font-size: 13px; font-weight:bold; margin-top: 8px;">🔄 Số lượt nộp bài:</label>
                            <div style="flex: 1;">
                                <input type="number" id="add_nv_soluot_tl" min="1" placeholder="Bỏ trống = Không giới hạn" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                                <div style="font-size: 11px; color: #6c757d; margin-top: 4px;"><i>* Để trống nếu muốn học sinh có thể nộp lại bài nhiều lần.</i></div>
                            </div>
                        </div>

                        <div style="display: flex; align-items: flex-start; background: white; padding: 8px 12px; border-radius: 6px; border: 1px solid #eee;">
                            <label style="width: 160px; font-size: 13px; font-weight:bold; margin-top: 8px;">📅 Bắt đầu nhận bài:</label>
                            <div style="flex: 1;">
                                <input type="datetime-local" id="add_nv_mo_tl" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                                <div style="font-size: 11px; color: #6c757d; margin-top: 4px;"><i>* Bỏ trống nếu muốn học sinh có thể làm bài ngay lập tức.</i></div>
                            </div>
                        </div>
                        
                        <div style="display: flex; align-items: flex-start; background: white; padding: 8px 12px; border-radius: 6px; border: 1px solid #eee;">
                            <label style="width: 160px; font-size: 13px; font-weight:bold; color:#dc3545; margin-top: 8px;">⛔ Hạn chót nộp bài:</label>
                            <div style="flex: 1;">
                                <input type="datetime-local" id="add_nv_dong_tl" style="width: 100%; padding: 8px; border: 1px solid #dc3545; border-radius: 4px;">
                                <div style="font-size: 11px; color: #6c757d; margin-top: 4px;"><i>* Bỏ trống nếu nhiệm vụ này không giới hạn thời gian nộp.</i></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style="display: flex; gap: 15px;">
                    <button onclick="ham_7b_5_luu_nhiem_vu_moi_tu_luan(this)" style="flex: 2; padding: 15px; background: #28a745; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 16px;">
                        💾 XÁC NHẬN GIAO BÀI
                    </button>
                    <button onclick="ham_7b_1_ve_quan_ly_nhiem_vu_tu_luan()" style="flex: 1; padding: 15px; background: #6c757d; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">
                        HỦY
                    </button>
                </div>
            </div>
        `;
    } catch (error) {
        vungLamViec.innerHTML = `<p style="color:red; text-align:center;">Lỗi khởi tạo form: ${error.message}</p>`;
    }
};

// =====================================================================
// [ĐÃ CẬP NHẬT] Hàm 7b.3.a: Xử lý khi chọn học liệu (Hiển thị tên + Ẩn form tạo)
// =====================================================================
window.ham_7b_4_xu_ly_chon_hoc_lieu_tu_luan = function () {
    const maHL = document.getElementById('add_nv_maHL_tl').value;
    const khuVucPreview = document.getElementById('khu_vuc_xem_truoc_hl_tl');

    // Tự động ẩn form tạo mới nếu đang mở
    const khuVucTaoMoi = document.getElementById('khu-vuc-tao-moi-tl');
    if (khuVucTaoMoi) {
        khuVucTaoMoi.style.display = 'none';
    }

    if (!maHL || maHL === "KHONG_DUNG") {
        khuVucPreview.style.display = 'none';
        khuVucPreview.innerHTML = '';
        return;
    }

    const hlData = window.tempDsHocLieuTL.find(hl => hl.ma_hoc_lieu === maHL);
    if (!hlData) return;

    let meta = typeof hlData.metadata === 'string' ? JSON.parse(hlData.metadata || '{}') : (hlData.metadata || {});

    const kieuDe = meta.loai_tu_luan || 'file';
    const kieuGiai = meta.kieu_giai || 'none';

    // 🌟 KHỐI HIỂN THỊ TÊN HỌC LIỆU (Mới thêm)
    const htmlHeader = `
        <div style="background: #eef2f7; padding: 10px; border-radius: 6px; margin-bottom: 15px; border-left: 4px solid #17a2b8;">
            <span style="font-weight:bold; color: #0056b3; font-size: 14px;">📌 Học liệu: ${hlData.ten_hoc_lieu}</span>
        </div>
    `;

    // 1. Dựng giao diện Đề bài
    let htmlDe = '';
    if (kieuDe === 'text') {
        htmlDe = `
            <div style="margin-bottom: 10px;">
                <span style="font-weight:bold; color: #17a2b8; font-size: 13px;">📝 ĐỀ BÀI (Văn bản):</span>
                <div style="background: white; padding: 10px; border: 1px solid #ced4da; border-radius: 4px; margin-top: 5px; font-size: 14px; max-height: 150px; overflow-y: auto; white-space: pre-wrap;">${meta.noi_dung_chinh || 'Chưa có nội dung'}</div>
            </div>
        `;
    } else {
        const tenFileDe = meta.ten_file_goc || 'Chưa đính kèm file';
        const linkDe = hlData.url_github ? `<a href="${hlData.url_github}" target="_blank" style="color: #17a2b8; font-size: 12px; font-weight: bold; text-decoration: none;">📥 Mở File Đề</a>` : '';
        htmlDe = `
            <div style="margin-bottom: 10px;">
                <span style="font-weight:bold; color: #17a2b8; font-size: 13px;">📂 ĐỀ BÀI (File):</span>
                <div style="background: white; padding: 8px 12px; border: 1px solid #ced4da; border-radius: 4px; margin-top: 5px; display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 13px; color: #495057;">📄 <b>${tenFileDe}</b></span>
                    ${linkDe}
                </div>
            </div>
        `;
    }

    // 2. Dựng giao diện Bài giải
    let htmlGiai = '';
    if (kieuGiai === 'none') {
        htmlGiai = `<div style="font-size: 13px; color: #d35400; font-style: italic; margin-top: 10px;">❌ Học liệu này không có Bài giải đính kèm.</div>`;
    } else if (kieuGiai === 'text') {
        htmlGiai = `
            <div style="margin-top: 10px;">
                <span style="font-weight:bold; color: #28a745; font-size: 13px;">💡 BÀI GIẢI (Văn bản):</span>
                <div style="background: #f8fff9; padding: 10px; border: 1px solid #c3e6cb; border-radius: 4px; margin-top: 5px; font-size: 14px; max-height: 150px; overflow-y: auto; white-space: pre-wrap;">${meta.noi_dung_giai || 'Chưa có nội dung giải'}</div>
            </div>
        `;
    } else if (kieuGiai === 'file') {
        const tenFileGiai = meta.ten_file_giai || 'Chưa đính kèm file giải';
        const linkGiai = hlData.url_file_giai ? `<a href="${hlData.url_file_giai}" target="_blank" style="color: #28a745; font-size: 12px; font-weight: bold; text-decoration: none;">📥 Mở File Giải</a>` : '';
        htmlGiai = `
            <div style="margin-top: 10px;">
                <span style="font-weight:bold; color: #28a745; font-size: 13px;">📎 BÀI GIẢI (File):</span>
                <div style="background: #f8fff9; padding: 8px 12px; border: 1px solid #c3e6cb; border-radius: 4px; margin-top: 5px; display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 13px; color: #495057;">📄 <b>${tenFileGiai}</b></span>
                    ${linkGiai}
                </div>
            </div>
        `;
    }

    // 3. Render (Ghép Header vào trước Đề và Giải)
    khuVucPreview.innerHTML = htmlHeader + htmlDe + htmlGiai;
    khuVucPreview.style.display = 'block';
};

// --- [ĐÃ CẬP NHẬT] Hàm 7b.4: Lưu Nhiệm Vụ Tự Luận (Cho phép không giới hạn thời gian) ---
// window.ham_7b_5_luu_nhiem_vu_moi_tu_luan = async function (btnNode) {
//     // 1. Lấy dữ liệu từ form
//     const maHL = document.getElementById('add_nv_maHL_tl').value;
//     const tenNV = document.getElementById('add_nv_ten_tl').value.trim();
//     const loaiNV = document.getElementById('add_nv_loai_tl').value;
//     const moRaw = document.getElementById('add_nv_mo_tl').value;
//     const dongRaw = document.getElementById('add_nv_dong_tl').value;
//     const trangThai = document.getElementById('add_nv_trangthai_tl').value;

//     // KIỂM TRA BẮT BUỘC CHỌN HỌC LIỆU VÀ TÊN
//     if (!maHL || maHL === "KHONG_DUNG") {
//         return alert("❌ Thầy/Cô ơi! Nhiệm vụ tự luận BẮT BUỘC phải gắn với 1 học liệu. Vui lòng chọn học liệu từ danh sách nhé.");
//     }
//     if (!tenNV) return alert("❌ Thầy/Cô chưa nhập tên nhiệm vụ!");

//     // Lấy danh sách lớp được chọn
//     const dsLopCheck = document.querySelectorAll('.chk-lop-tl:checked');
//     const dsMaLop = Array.from(dsLopCheck).map(c => c.value);

//     if (dsMaLop.length === 0) return alert("❌ Thầy/Cô chưa chọn lớp nào để giao bài!");

//     // 🌟 XỬ LÝ THỜI GIAN: Bỏ trống ("") thì chuyển thành null
//     const thoiGianMo = moRaw ? moRaw : null;
//     const thoiGianDong = dongRaw ? dongRaw : null;

//     // Chỉ kiểm tra logic (Mở < Đóng) nếu giáo viên có nhập CẢ HAI
//     if (thoiGianMo && thoiGianDong) {
//         if (new Date(thoiGianMo) >= new Date(thoiGianDong)) {
//             return alert("❌ Thời gian bắt đầu phải trước thời gian hạn chót!");
//         }
//     }

//     btnNode.disabled = true;
//     btnNode.innerText = "⏳ Đang xử lý...";

//     try {
//         const nhiemVuMoi = {
//             ma_nhiem_vu: document.getElementById('add_nv_ma_tl').value,
//             ten_nhiem_vu: tenNV,
//             ma_hoc_lieu: maHL,
//             loai_nhiem_vu: loaiNV,
//             danh_sach_lop: dsMaLop,
//             trang_thai: parseInt(trangThai),
//             thoi_gian_mo: thoiGianMo,   // Lưu null nếu không chọn
//             thoi_gian_dong: thoiGianDong, // Lưu null nếu không chọn
//             uid_gv_tao: (typeof AppState !== 'undefined' && AppState.user) ? AppState.user.uid : null,
//             ngay_tao: new Date().toISOString()
//         };

//         // Gửi lên Supabase
//         const { error } = await _supabase.from('nhiem_vu_tu_luan').insert([nhiemVuMoi]);
//         if (error) throw error;

//         alert("✅ Giao nhiệm vụ tự luận thành công!");
//         ham_7b_1_ve_quan_ly_nhiem_vu_tu_luan(); // Quay lại bảng danh sách

//     } catch (error) {
//         alert("❌ Lỗi: " + error.message);
//         console.error(error);
//     } finally {
//         btnNode.disabled = false;
//         btnNode.innerText = "💾 XÁC NHẬN GIAO BÀI";
//     }
// };

window.ham_7b_5_luu_nhiem_vu_moi_tu_luan = async function (btnNode) {
    // 1. Lấy dữ liệu form
    const maNVTrenForm = document.getElementById('add_nv_ma_tl').value;
    const maHL = document.getElementById('add_nv_maHL_tl').value;
    const tenNV = document.getElementById('add_nv_ten_tl').value.trim();
    const loaiNV = document.getElementById('add_nv_loai_tl').value;
    const moRaw = document.getElementById('add_nv_mo_tl').value;
    const dongRaw = document.getElementById('add_nv_dong_tl').value;
    const trangThai = document.getElementById('add_nv_trangthai_tl').value;

    const soLuotRaw = document.getElementById('add_nv_soluot_tl').value;
    const soLuotNop = soLuotRaw ? parseInt(soLuotRaw) : 0;

    if (!maHL || maHL === "KHONG_DUNG") return alert("❌ Phải chọn Học liệu!");
    if (!tenNV) return alert("❌ Chưa nhập tên nhiệm vụ!");

    // 2. Lấy danh sách lớp và Map tên lớp
    let dsLopCheck = document.querySelectorAll('.chk-lop-tl:checked');
    let mapTenLop = {};
    let dsMaLop = [];

    dsLopCheck.forEach(chk => {
        dsMaLop.push(chk.value);
        let tenLop = chk.nextElementSibling ? chk.nextElementSibling.innerText.trim() : chk.value;
        mapTenLop[chk.value] = tenLop;
    });

    if (dsMaLop.length === 0) return alert("❌ Chưa chọn lớp!");

    const thoiGianMo = moRaw ? new Date(moRaw).toISOString() : null;
    const thoiGianDong = dongRaw ? new Date(dongRaw).toISOString() : null;

    btnNode.disabled = true;
    btnNode.innerText = "⏳ Đang tạo thư mục trên Drive...";

    try {
        // 3. Chuẩn bị danh sách thư mục & Sinh mã riêng lẻ
        let mangTenThuMucCanTao = [];
        let mapLopVaTenThuMuc = {};
        let mapLopVaMaNV = {};
        const tapKyTu = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

        dsMaLop.forEach(maLop => {
            // Tách mã nhiệm vụ riêng rẽ cho từng lớp
            let maNV_ChinhThuc = (dsMaLop.length === 1) ? maNVTrenForm : "NV_TL_" + Array(6).fill(0).map(() => tapKyTu.charAt(Math.floor(Math.random() * tapKyTu.length))).join('');
            mapLopVaMaNV[maLop] = maNV_ChinhThuc;

            let tenLop = mapTenLop[maLop] || maLop;
            let tenThuMuc = `${maHL}-${maNV_ChinhThuc}-${tenNV}-${maLop}-${tenLop}`.replace(/[\\/:*?"<>|]/g, "");

            mangTenThuMucCanTao.push(tenThuMuc);
            mapLopVaTenThuMuc[maLop] = tenThuMuc;
        });

        // 4. Gọi Apps Script tạo folder
        const resDrive = await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
            method: "POST",
            body: JSON.stringify({ action: "create_class_folders", folders: mangTenThuMucCanTao })
        });
        const ketQuaDrive = await resDrive.json();

        if (ketQuaDrive.status !== "success") throw new Error("Lỗi tạo thư mục: " + ketQuaDrive.message);

        // 5. Chuẩn bị Payload lưu thành NHIỀU BẢN GHI RIÊNG LẺ
        let mangPayloadInsert = dsMaLop.map(maLop => {
            let tenThuMuc = mapLopVaTenThuMuc[maLop];
            let maNV_ChinhThuc = mapLopVaMaNV[maLop];
            let tenLop = mapTenLop[maLop] || maLop;

            // 🌟 THÔNG MINH: Nếu giao nhiều lớp thì gắn (Tên lớp) vào sau tên nhiệm vụ để dễ quản lý
            let tenNV_RiengLe = (dsMaLop.length === 1) ? tenNV : `${tenNV} (${tenLop})`;

            return {
                ma_nhiem_vu: maNV_ChinhThuc,
                ten_nhiem_vu: tenNV_RiengLe,
                ma_hoc_lieu: maHL,
                loai_nhiem_vu: loaiNV,

                // 🌟 CHỈ GÁN CHO 1 LỚP DUY NHẤT VÀO BẢN GHI NÀY
                danh_sach_lop: [maLop],

                trang_thai: parseInt(trangThai),
                thoi_gian_mo: thoiGianMo,
                thoi_gian_dong: thoiGianDong,
                so_luot_lam_bai: soLuotNop,
                metadata: { folder_id_drive: ketQuaDrive.folderIds[tenThuMuc] },
                uid_gv_tao: (typeof AppState !== 'undefined' && AppState.user) ? AppState.user.uid : null,
                ngay_tao: new Date().toISOString()
            };
        });

        // Đẩy 1 lượt toàn bộ các nhiệm vụ riêng lẻ này lên Supabase
        const { error } = await _supabase.from('nhiem_vu_tu_luan').insert(mangPayloadInsert);
        if (error) throw error;

        alert("✅ Giao bài thành công! Đã tự động tách thành " + dsMaLop.length + " nhiệm vụ riêng lẻ.");
        ham_7b_1_ve_quan_ly_nhiem_vu_tu_luan();

    } catch (error) {
        alert("❌ Lỗi: " + error.message);
        console.error(error);
    } finally {
        btnNode.disabled = false;
        btnNode.innerText = "💾 XÁC NHẬN GIAO BÀI";
    }
};

// =====================================================================
// Hàm 7b.5: Lọc nhanh danh sách
// =====================================================================
window.ham_7b_6_loc_nhiem_vu_theo_lop_tu_luan = function (maLopChon, nutBam) {
    document.querySelectorAll('.btn-loc-lop-tl').forEach(btn => {
        btn.classList.remove('active');
        btn.style.background = 'white';
        btn.style.color = '#495057';
    });

    if (nutBam) {
        nutBam.classList.add('active');
        nutBam.style.background = (maLopChon === 'TAT_CA') ? '#1a73e8' : '#17a2b8';
        nutBam.style.color = 'white';
    }

    if (typeof window.ham_7b_12_ve_bang_nhiem_vu_tu_luan === 'function') {
        window.ham_7b_12_ve_bang_nhiem_vu_tu_luan();
    }
};

// // =====================================================================
// // [ĐÃ NÂNG CẤP NÚT XÓA THỜI GIAN] Hàm 7b.5: Mở form Sửa Nhiệm Vụ Tự Luận 
// // =====================================================================
// window.ham_7b_7_mo_form_sua_nhiem_vu_tu_luan = async function (maNV) {
//     const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
//     vungLamViec.innerHTML = `<div style="text-align: center; padding: 40px;"><p>⏳ Đang tải dữ liệu nhiệm vụ từ hệ thống...</p></div>`;

//     try {
//         // 1. LẤY TRỰC TIẾP DỮ LIỆU TỪ SUPABASE
//         const { data: nv, error: errNV } = await _supabase
//             .from('nhiem_vu_tu_luan')
//             .select('*')
//             .eq('ma_nhiem_vu', maNV)
//             .single();

//         if (errNV || !nv) {
//             throw new Error("Không tìm thấy thông tin nhiệm vụ này trên hệ thống!");
//         }

//         // // 2. Tải danh sách Học Liệu
//         // if (!window.tempDsHocLieuTL || window.tempDsHocLieuTL.length === 0) {
//         //     const { data: dsHocLieu } = await _supabase.from('hoc_lieu_tu_luan').select('*').order('ngay_tao', { ascending: false });
//         //     window.tempDsHocLieuTL = dsHocLieu || [];
//         // }
//         // 2. LUÔN LUÔN TẢI LẠI DANH SÁCH HỌC LIỆU MỚI NHẤT (Ép cập nhật tức thời)
//         const { data: dsHocLieu } = await _supabase.from('hoc_lieu_tu_luan').select('*').order('ngay_tao', { ascending: false });
//         window.tempDsHocLieuTL = dsHocLieu || [];


//         let htmlOptionsHL = `<option value="KHONG_DUNG" style="font-weight: bold; color: red;">[ --- Không sử dụng học liệu đính kèm --- ]</option>`;
//         window.tempDsHocLieuTL.forEach(hl => {
//             let meta = typeof hl.metadata === 'string' ? JSON.parse(hl.metadata || '{}') : (hl.metadata || {});
//             let icon = meta.loai_tu_luan === 'text' ? '✍️' : '📁';
//             let coGiai = (hl.url_file_giai || meta.noi_dung_giai || meta.kieu_giai === 'text') ? ' (Có giải)' : '';
//             const selected = (nv.ma_hoc_lieu === hl.ma_hoc_lieu) ? 'selected' : '';
//             htmlOptionsHL += `<option value="${hl.ma_hoc_lieu}" ${selected}>${icon} [${hl.ma_hoc_lieu}] - ${hl.ten_hoc_lieu}${coGiai}</option>`;
//         });

//         // 3. Xử lý Danh sách Lớp
//         const dsLopDaChon = nv.danh_sach_lop || [];
//         let htmlLop = '';
//         if (window.tempDsLop && window.tempDsLop.length > 0) {
//             htmlLop = window.tempDsLop.map(l => {
//                 const maLop = l.ma_lop || l.id;
//                 const isChecked = dsLopDaChon.includes(maLop) ? 'checked' : '';
//                 return `
//                     <label style="display: inline-flex; align-items: center; width: 140px; margin-bottom: 10px; cursor: pointer;">
//                         <input type="checkbox" class="chk-lop-tl-sua" value="${maLop}" ${isChecked} style="transform: scale(1.3); margin-right: 8px;"> 
//                         <span style="font-weight: bold; color: #17a2b8; font-size: 14px;">${l.ten_lop || l.ten || l.ma_lop}</span>
//                     </label>
//                 `;
//             }).join('');
//         } else {
//             htmlLop = `<span style="color: #856404;">⚠️ Không tìm thấy danh sách lớp!</span>`;
//         }

//         // 4. Chuyển đổi định dạng Thời gian chuẩn cho thẻ datetime-local
//         const formatForInput = (isoDate) => {
//             if (!isoDate) return "";
//             const d = new Date(isoDate);
//             if (isNaN(d.getTime())) return "";
//             return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0') + 'T' + String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
//         };
//         const valMo = formatForInput(nv.thoi_gian_mo);
//         const valDong = formatForInput(nv.thoi_gian_dong);

//         // 5. Render Giao diện Sửa
//         vungLamViec.innerHTML = `
//             <div style="max-width: 950px; background: white; padding: 25px; border-radius: 12px; margin: 0 auto; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
//                 <h3 style="color: #ffc107; margin-top: 0; border-bottom: 2px solid #f1f3f4; padding-bottom: 10px;">✏️ SỬA NHIỆM VỤ TỰ LUẬN</h3>
                
//                 <div style="background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
//                     <h4 style="margin-top: 0; color: #495057;">1. Thông tin chung</h4>
//                     <div style="display: grid; grid-template-columns: 1fr 2fr 1fr; gap: 15px;">
//                         <div>
//                             <label style="font-weight:bold; font-size: 13px;">Mã NV:</label>
//                             <input type="text" value="${nv.ma_nhiem_vu}" readonly style="width: 100%; padding: 8px; background: #e9ecef; border: 1px solid #ccc; border-radius: 4px; font-weight:bold; color: #6c757d;">
//                         </div>
//                         <div>
//                             <label style="font-weight:bold; font-size: 13px;">Tên Nhiệm Vụ (*):</label>
//                             <input type="text" id="sua_nv_ten_tl" value="${nv.ten_nhiem_vu || ''}" style="width: 100%; padding: 8px; border: 1px solid #ffc107; border-radius: 4px; font-weight:bold;">
//                         </div>
//                         <div>
//                             <label style="font-weight:bold; font-size: 13px;">Loại nhiệm vụ:</label>
//                             <select id="sua_nv_loai_tl" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
//                                 <option value="Bài tập về nhà" ${nv.loai_nhiem_vu === 'Bài tập về nhà' ? 'selected' : ''}>Bài tập về nhà</option>
//                                 <option value="Kiểm tra 15p" ${nv.loai_nhiem_vu === 'Kiểm tra 15p' ? 'selected' : ''}>Kiểm tra 15p</option>
//                                 <option value="Khác" ${nv.loai_nhiem_vu === 'Khác' ? 'selected' : ''}>Khác</option>
//                             </select>
//                         </div>
//                     </div>
//                 </div>

//                 <div style="background: #e6f2ff; border: 1px solid #b8daff; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
//                     <h4 style="margin-top: 0; color: #0056b3;">2. Đính kèm Học Liệu Tự Luận</h4>
//                     <div style="display: flex; gap: 10px; align-items: center;">
//                         <select id="sua_nv_maHL_tl" onchange="ham_7b_8_xu_ly_chon_hoc_lieu_sua()" style="flex: 1; padding: 10px; border: 2px solid #17a2b8; border-radius: 6px; font-weight:bold; cursor: pointer;">
//                             ${htmlOptionsHL}
//                         </select>
                        
//                         <button type="button" onclick="ham_7b_10_goi_sua_hoc_lieu()" style="padding: 10px 15px; background: #0d6efd; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; transition: 0.2s;" title="Sửa học liệu đang chọn" onmouseover="this.style.background='#0b5ed7'" onmouseout="this.style.background='#0d6efd'">
//                             ✏️ Sửa HL
//                         </button>
                        
//                         <button type="button" onclick="ham_6b_3_toggle_form_them_moi()" style="padding: 10px 15px; background: #fd7e14; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#e86e04'" onmouseout="this.style.background='#fd7e14'">
//                             ➕ Tạo HL Mới
//                         </button>
//                     </div>

//                     <div id="khu-vuc-tao-moi-tl" style="display: none; margin-top: 15px; background: white; border-radius: 8px;">
//                         <div id="form-render-tu-luan"></div>
//                     </div>
                    
//                     <div id="khu_vuc_xem_truoc_hl_tl_sua" style="display: none; margin-top: 15px; border-top: 1px dashed #b8daff; padding-top: 15px;"></div>
//                 </div>

//                 <div style="background: #fff8e6; border: 1px solid #ffe8a1; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
//                     <h4 style="margin-top: 0; color: #d35400;">3. Giao việc & Cấu hình nộp bài</h4>
//                     <div style="margin-bottom: 20px; border-bottom: 1px dashed #ccc; padding-bottom: 15px;">
//                         <label style="font-weight:bold; font-size: 13px; display:block; margin-bottom: 5px;">Giao cho Lớp (*):</label>
//                         <div style="margin-bottom: 10px;">
//                             <button onclick="document.querySelectorAll('.chk-lop-tl-sua').forEach(c => c.checked = true)" style="padding: 3px 8px; font-size: 11px;">Chọn tất cả</button>
//                             <button onclick="document.querySelectorAll('.chk-lop-tl-sua').forEach(c => c.checked = false)" style="padding: 3px 8px; font-size: 11px;">Bỏ chọn</button>
//                         </div>
//                         <div style="background: white; padding: 10px; border: 1px solid #ddd; border-radius: 4px; max-height: 120px; overflow-y: auto;">
//                             ${htmlLop}
//                         </div>
//                     </div>

//                     <div style="display: flex; flex-direction: column; gap: 12px;">
//                         <div style="display: flex; align-items: center; background: white; padding: 8px 12px; border-radius: 6px; border: 1px solid #eee;">
//                             <label style="width: 160px; font-size: 13px; font-weight:bold;">🟢 Trạng thái NV:</label>
//                             <select id="sua_nv_trangthai_tl" style="flex: 1; padding: 8px; border: 1px solid #28a745; border-radius: 4px; font-weight: bold;">
//                                 <option value="1" ${nv.trang_thai === 1 ? 'selected' : ''}>🟢 Kích hoạt (Đang mở)</option>
//                                 <option value="0" ${nv.trang_thai === 0 ? 'selected' : ''}>🔴 Khóa (Dừng nhận bài)</option>
//                             </select>
//                         </div>
                        
//                         <div style="display: flex; align-items: flex-start; background: white; padding: 8px 12px; border-radius: 6px; border: 1px solid #eee;">
//                             <label style="width: 160px; font-size: 13px; font-weight:bold; margin-top: 8px;">📅 Bắt đầu nhận bài:</label>
//                             <div style="flex: 1;">
//                                 <div style="display: flex; gap: 8px; align-items: center;">
//                                     <input type="datetime-local" id="sua_nv_mo_tl" value="${valMo}" style="flex: 1; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
//                                     <button type="button" onclick="document.getElementById('sua_nv_mo_tl').value=''" style="padding: 8px 12px; background: #e9ecef; border: 1px solid #ccc; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: bold;" title="Xóa thời gian">✖️ Xóa</button>
//                                 </div>
//                                 <div style="font-size: 11px; color: #6c757d; margin-top: 4px;"><i>* Bấm nút [✖️ Xóa] để bỏ trống (học sinh có thể làm bài ngay).</i></div>
//                             </div>
//                         </div>
                        
//                         <div style="display: flex; align-items: flex-start; background: white; padding: 8px 12px; border-radius: 6px; border: 1px solid #eee;">
//                             <label style="width: 160px; font-size: 13px; font-weight:bold; color:#dc3545; margin-top: 8px;">⛔ Hạn chót nộp bài:</label>
//                             <div style="flex: 1;">
//                                 <div style="display: flex; gap: 8px; align-items: center;">
//                                     <input type="datetime-local" id="sua_nv_dong_tl" value="${valDong}" style="flex: 1; padding: 8px; border: 1px solid #dc3545; border-radius: 4px;">
//                                     <button type="button" onclick="document.getElementById('sua_nv_dong_tl').value=''" style="padding: 8px 12px; background: #ffeeba; border: 1px solid #ffc107; color: #856404; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: bold;" title="Xóa thời gian">✖️ Xóa</button>
//                                 </div>
//                                 <div style="font-size: 11px; color: #6c757d; margin-top: 4px;"><i>* Bấm nút [✖️ Xóa] để bỏ trống (không giới hạn thời gian nộp).</i></div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 <div style="display: flex; gap: 15px;">
//                     <button onclick="ham_7b_9_luu_cap_nhat_nhiem_vu_tu_luan('${nv.ma_nhiem_vu}', this)" style="flex: 2; padding: 15px; background: #ffc107; color: #333; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
//                         💾 LƯU THAY ĐỔI
//                     </button>
//                     <button onclick="ham_7b_1_ve_quan_ly_nhiem_vu_tu_luan()" style="flex: 1; padding: 15px; background: #6c757d; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">
//                         HỦY
//                     </button>
//                 </div>
//             </div>
//         `;

//         if (typeof ham_7b_8_xu_ly_chon_hoc_lieu_sua === 'function') {
//             ham_7b_8_xu_ly_chon_hoc_lieu_sua();
//         }

//     } catch (error) {
//         vungLamViec.innerHTML = `<p style="color:red; text-align:center;">❌ Lỗi mở form sửa: ${error.message}</p>`;
//     }
// };

// =====================================================================
// [ĐÃ NÂNG CẤP NÚT XÓA THỜI GIAN + SỐ LƯỢT] Hàm 7b.5: Mở form Sửa Nhiệm Vụ Tự Luận 
// =====================================================================
window.ham_7b_7_mo_form_sua_nhiem_vu_tu_luan = async function (maNV) {
    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
    vungLamViec.innerHTML = `<div style="text-align: center; padding: 40px;"><p>⏳ Đang tải dữ liệu nhiệm vụ từ hệ thống...</p></div>`;

    try {
        // 1. LẤY TRỰC TIẾP DỮ LIỆU TỪ SUPABASE
        const { data: nv, error: errNV } = await _supabase
            .from('nhiem_vu_tu_luan')
            .select('*')
            .eq('ma_nhiem_vu', maNV)
            .single();

        if (errNV || !nv) {
            throw new Error("Không tìm thấy thông tin nhiệm vụ này trên hệ thống!");
        }

        // 2. LUÔN LUÔN TẢI LẠI DANH SÁCH HỌC LIỆU MỚI NHẤT
        const { data: dsHocLieu } = await _supabase.from('hoc_lieu_tu_luan').select('*').order('ngay_tao', { ascending: false });
        window.tempDsHocLieuTL = dsHocLieu || [];

        let htmlOptionsHL = `<option value="KHONG_DUNG" style="font-weight: bold; color: red;">[ --- Không sử dụng học liệu đính kèm --- ]</option>`;
        window.tempDsHocLieuTL.forEach(hl => {
            let meta = typeof hl.metadata === 'string' ? JSON.parse(hl.metadata || '{}') : (hl.metadata || {});
            let icon = meta.loai_tu_luan === 'text' ? '✍️' : '📁';
            let coGiai = (hl.url_file_giai || meta.noi_dung_giai || meta.kieu_giai === 'text') ? ' (Có giải)' : '';
            const selected = (nv.ma_hoc_lieu === hl.ma_hoc_lieu) ? 'selected' : '';
            htmlOptionsHL += `<option value="${hl.ma_hoc_lieu}" ${selected}>${icon} [${hl.ma_hoc_lieu}] - ${hl.ten_hoc_lieu}${coGiai}</option>`;
        });

        // 3. Xử lý Danh sách Lớp
        const dsLopDaChon = nv.danh_sach_lop || [];
        let htmlLop = '';
        if (window.tempDsLop && window.tempDsLop.length > 0) {
            htmlLop = window.tempDsLop.map(l => {
                const maLop = l.ma_lop || l.id;
                const isChecked = dsLopDaChon.includes(maLop) ? 'checked' : '';
                return `
                    <label style="display: inline-flex; align-items: center; width: 140px; margin-bottom: 10px; cursor: pointer;">
                        <input type="checkbox" class="chk-lop-tl-sua" value="${maLop}" ${isChecked} style="transform: scale(1.3); margin-right: 8px;"> 
                        <span style="font-weight: bold; color: #17a2b8; font-size: 14px;">${l.ten_lop || l.ten || l.ma_lop}</span>
                    </label>
                `;
            }).join('');
        } else {
            htmlLop = `<span style="color: #856404;">⚠️ Không tìm thấy danh sách lớp!</span>`;
        }

        // 4. Chuyển đổi định dạng Thời gian chuẩn cho thẻ datetime-local
        const formatForInput = (isoDate) => {
            if (!isoDate) return "";
            const d = new Date(isoDate);
            if (isNaN(d.getTime())) return "";
            return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0') + 'T' + String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
        };
        const valMo = formatForInput(nv.thoi_gian_mo);
        const valDong = formatForInput(nv.thoi_gian_dong);

        // 🌟 Lấy số lượt làm bài cũ để hiển thị (nếu là 0 thì để rỗng)
        const valSoLuot = (nv.so_luot_lam_bai && nv.so_luot_lam_bai > 0) ? nv.so_luot_lam_bai : '';

        // 5. Render Giao diện Sửa
        vungLamViec.innerHTML = `
            <div style="max-width: 950px; background: white; padding: 25px; border-radius: 12px; margin: 0 auto; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
                <h3 style="color: #ffc107; margin-top: 0; border-bottom: 2px solid #f1f3f4; padding-bottom: 10px;">✏️ SỬA NHIỆM VỤ TỰ LUẬN</h3>
                
                <div style="background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
                    <h4 style="margin-top: 0; color: #495057;">1. Thông tin chung</h4>
                    <div style="display: grid; grid-template-columns: 1fr 2fr 1fr; gap: 15px;">
                        <div>
                            <label style="font-weight:bold; font-size: 13px;">Mã NV:</label>
                            <input type="text" value="${nv.ma_nhiem_vu}" readonly style="width: 100%; padding: 8px; background: #e9ecef; border: 1px solid #ccc; border-radius: 4px; font-weight:bold; color: #6c757d;">
                        </div>
                        <div>
                            <label style="font-weight:bold; font-size: 13px;">Tên Nhiệm Vụ (*):</label>
                            <input type="text" id="sua_nv_ten_tl" value="${nv.ten_nhiem_vu || ''}" style="width: 100%; padding: 8px; border: 1px solid #ffc107; border-radius: 4px; font-weight:bold;">
                        </div>
                        <div>
                            <label style="font-weight:bold; font-size: 13px;">Loại nhiệm vụ:</label>
                            <select id="sua_nv_loai_tl" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                                <option value="Bài tập về nhà" ${nv.loai_nhiem_vu === 'Bài tập về nhà' ? 'selected' : ''}>Bài tập về nhà</option>
                                <option value="Kiểm tra 15p" ${nv.loai_nhiem_vu === 'Kiểm tra 15p' ? 'selected' : ''}>Kiểm tra 15p</option>
                                <option value="Khác" ${nv.loai_nhiem_vu === 'Khác' ? 'selected' : ''}>Khác</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div style="background: #e6f2ff; border: 1px solid #b8daff; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
                    <h4 style="margin-top: 0; color: #0056b3;">2. Đính kèm Học Liệu Tự Luận</h4>
                    <div style="display: flex; gap: 10px; align-items: center;">
                        <select id="sua_nv_maHL_tl" onchange="ham_7b_8_xu_ly_chon_hoc_lieu_sua()" style="flex: 1; padding: 10px; border: 2px solid #17a2b8; border-radius: 6px; font-weight:bold; cursor: pointer;">
                            ${htmlOptionsHL}
                        </select>
                        
                        <button type="button" onclick="ham_7b_10_goi_sua_hoc_lieu()" style="padding: 10px 15px; background: #0d6efd; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; transition: 0.2s;" title="Sửa học liệu đang chọn" onmouseover="this.style.background='#0b5ed7'" onmouseout="this.style.background='#0d6efd'">
                            ✏️ Sửa HL
                        </button>
                        
                        <button type="button" onclick="ham_6b_3_toggle_form_them_moi()" style="padding: 10px 15px; background: #fd7e14; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#e86e04'" onmouseout="this.style.background='#fd7e14'">
                            ➕ Tạo HL Mới
                        </button>
                    </div>

                    <div id="khu-vuc-tao-moi-tl" style="display: none; margin-top: 15px; background: white; border-radius: 8px;">
                        <div id="form-render-tu-luan"></div>
                    </div>
                    
                    <div id="khu_vuc_xem_truoc_hl_tl_sua" style="display: none; margin-top: 15px; border-top: 1px dashed #b8daff; padding-top: 15px;"></div>
                </div>

                <div style="background: #fff8e6; border: 1px solid #ffe8a1; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
                    <h4 style="margin-top: 0; color: #d35400;">3. Giao việc & Cấu hình nộp bài</h4>
                    <div style="margin-bottom: 20px; border-bottom: 1px dashed #ccc; padding-bottom: 15px;">
                        <label style="font-weight:bold; font-size: 13px; display:block; margin-bottom: 5px;">Giao cho Lớp (*):</label>
                        <div style="margin-bottom: 10px;">
                            <button onclick="document.querySelectorAll('.chk-lop-tl-sua').forEach(c => c.checked = true)" style="padding: 3px 8px; font-size: 11px;">Chọn tất cả</button>
                            <button onclick="document.querySelectorAll('.chk-lop-tl-sua').forEach(c => c.checked = false)" style="padding: 3px 8px; font-size: 11px;">Bỏ chọn</button>
                        </div>
                        <div style="background: white; padding: 10px; border: 1px solid #ddd; border-radius: 4px; max-height: 120px; overflow-y: auto;">
                            ${htmlLop}
                        </div>
                    </div>

                    <div style="display: flex; flex-direction: column; gap: 12px;">
                        <div style="display: flex; align-items: center; background: white; padding: 8px 12px; border-radius: 6px; border: 1px solid #eee;">
                            <label style="width: 160px; font-size: 13px; font-weight:bold;">🟢 Trạng thái NV:</label>
                            <select id="sua_nv_trangthai_tl" style="flex: 1; padding: 8px; border: 1px solid #28a745; border-radius: 4px; font-weight: bold;">
                                <option value="1" ${nv.trang_thai === 1 ? 'selected' : ''}>🟢 Kích hoạt (Đang mở)</option>
                                <option value="0" ${nv.trang_thai === 0 ? 'selected' : ''}>🔴 Khóa (Dừng nhận bài)</option>
                            </select>
                        </div>
                        
                        <div style="display: flex; align-items: flex-start; background: white; padding: 8px 12px; border-radius: 6px; border: 1px solid #eee;">
                            <label style="width: 160px; font-size: 13px; font-weight:bold; margin-top: 8px;">🔄 Số lượt nộp bài:</label>
                            <div style="flex: 1;">
                                <input type="number" id="sua_nv_soluot_tl" value="${valSoLuot}" min="1" placeholder="Bỏ trống = Không giới hạn" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                                <div style="font-size: 11px; color: #6c757d; margin-top: 4px;"><i>* Để trống nếu muốn học sinh có thể nộp lại bài nhiều lần.</i></div>
                            </div>
                        </div>

                        <div style="display: flex; align-items: flex-start; background: white; padding: 8px 12px; border-radius: 6px; border: 1px solid #eee;">
                            <label style="width: 160px; font-size: 13px; font-weight:bold; margin-top: 8px;">📅 Bắt đầu nhận bài:</label>
                            <div style="flex: 1;">
                                <div style="display: flex; gap: 8px; align-items: center;">
                                    <input type="datetime-local" id="sua_nv_mo_tl" value="${valMo}" style="flex: 1; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                                    <button type="button" onclick="document.getElementById('sua_nv_mo_tl').value=''" style="padding: 8px 12px; background: #e9ecef; border: 1px solid #ccc; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: bold;" title="Xóa thời gian">✖️ Xóa</button>
                                </div>
                                <div style="font-size: 11px; color: #6c757d; margin-top: 4px;"><i>* Bấm nút [✖️ Xóa] để bỏ trống (học sinh có thể làm bài ngay).</i></div>
                            </div>
                        </div>
                        
                        <div style="display: flex; align-items: flex-start; background: white; padding: 8px 12px; border-radius: 6px; border: 1px solid #eee;">
                            <label style="width: 160px; font-size: 13px; font-weight:bold; color:#dc3545; margin-top: 8px;">⛔ Hạn chót nộp bài:</label>
                            <div style="flex: 1;">
                                <div style="display: flex; gap: 8px; align-items: center;">
                                    <input type="datetime-local" id="sua_nv_dong_tl" value="${valDong}" style="flex: 1; padding: 8px; border: 1px solid #dc3545; border-radius: 4px;">
                                    <button type="button" onclick="document.getElementById('sua_nv_dong_tl').value=''" style="padding: 8px 12px; background: #ffeeba; border: 1px solid #ffc107; color: #856404; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: bold;" title="Xóa thời gian">✖️ Xóa</button>
                                </div>
                                <div style="font-size: 11px; color: #6c757d; margin-top: 4px;"><i>* Bấm nút [✖️ Xóa] để bỏ trống (không giới hạn thời gian nộp).</i></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style="display: flex; gap: 15px;">
                    <button onclick="ham_7b_9_luu_cap_nhat_nhiem_vu_tu_luan('${nv.ma_nhiem_vu}', this)" style="flex: 2; padding: 15px; background: #ffc107; color: #333; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        💾 LƯU THAY ĐỔI
                    </button>
                    <button onclick="ham_7b_1_ve_quan_ly_nhiem_vu_tu_luan()" style="flex: 1; padding: 15px; background: #6c757d; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">
                        HỦY
                    </button>
                </div>
            </div>
        `;

        if (typeof ham_7b_8_xu_ly_chon_hoc_lieu_sua === 'function') {
            ham_7b_8_xu_ly_chon_hoc_lieu_sua();
        }

    } catch (error) {
        vungLamViec.innerHTML = `<p style="color:red; text-align:center;">❌ Lỗi mở form sửa: ${error.message}</p>`;
    }
};


// =====================================================================
// Hàm 7b.5.a: Xử lý hiển thị Xem trước Học liệu khi SỬA Nhiệm Vụ
// =====================================================================
window.ham_7b_8_xu_ly_chon_hoc_lieu_sua = function () {
    // 1. Lấy mã học liệu đang được chọn trong form Sửa
    const maHL = document.getElementById('sua_nv_maHL_tl').value;
    const khuVucPreview = document.getElementById('khu_vuc_xem_truoc_hl_tl_sua');

    // Tự động ẩn form "Tạo mới học liệu" nếu nó đang mở cho đỡ rối mắt
    const khuVucTaoMoi = document.getElementById('khu-vuc-tao-moi-tl');
    if (khuVucTaoMoi) {
        khuVucTaoMoi.style.display = 'none';
    }

    // 2. Nếu chọn "Không dùng" thì ẩn khung xem trước
    if (!maHL || maHL === "KHONG_DUNG") {
        khuVucPreview.style.display = 'none';
        khuVucPreview.innerHTML = '';
        return;
    }

    // 3. Tìm thông tin học liệu trong danh sách đã tải
    const hlData = window.tempDsHocLieuTL.find(hl => hl.ma_hoc_lieu === maHL);
    if (!hlData) return;

    let meta = typeof hlData.metadata === 'string' ? JSON.parse(hlData.metadata || '{}') : (hlData.metadata || {});

    const kieuDe = meta.loai_tu_luan || 'file';
    const kieuGiai = meta.kieu_giai || 'none';

    // 🌟 Dựng giao diện Header (Hiển thị tên học liệu)
    const htmlHeader = `
        <div style="background: #eef2f7; padding: 10px; border-radius: 6px; margin-bottom: 15px; border-left: 4px solid #17a2b8;">
            <span style="font-weight:bold; color: #0056b3; font-size: 14px;">📌 Học liệu đã chọn: ${hlData.ten_hoc_lieu}</span>
        </div>
    `;

    // 🌟 Dựng giao diện Đề bài
    let htmlDe = '';
    if (kieuDe === 'text') {
        htmlDe = `
            <div style="margin-bottom: 10px;">
                <span style="font-weight:bold; color: #17a2b8; font-size: 13px;">📝 ĐỀ BÀI (Văn bản):</span>
                <div style="background: white; padding: 10px; border: 1px solid #ced4da; border-radius: 4px; margin-top: 5px; font-size: 14px; max-height: 150px; overflow-y: auto; white-space: pre-wrap;">${meta.noi_dung_chinh || 'Chưa có nội dung'}</div>
            </div>
        `;
    } else {
        const tenFileDe = meta.ten_file_goc || 'Chưa đính kèm file';
        const linkDe = hlData.url_github ? `<a href="${hlData.url_github}" target="_blank" style="color: #17a2b8; font-size: 12px; font-weight: bold; text-decoration: none;">📥 Mở File Đề</a>` : '';
        htmlDe = `
            <div style="margin-bottom: 10px;">
                <span style="font-weight:bold; color: #17a2b8; font-size: 13px;">📂 ĐỀ BÀI (File):</span>
                <div style="background: white; padding: 8px 12px; border: 1px solid #ced4da; border-radius: 4px; margin-top: 5px; display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 13px; color: #495057;">📄 <b>${tenFileDe}</b></span>
                    ${linkDe}
                </div>
            </div>
        `;
    }

    // 🌟 Dựng giao diện Bài giải
    let htmlGiai = '';
    if (kieuGiai === 'none') {
        htmlGiai = `<div style="font-size: 13px; color: #d35400; font-style: italic; margin-top: 10px;">❌ Học liệu này không có Bài giải đính kèm.</div>`;
    } else if (kieuGiai === 'text') {
        htmlGiai = `
            <div style="margin-top: 10px;">
                <span style="font-weight:bold; color: #28a745; font-size: 13px;">💡 BÀI GIẢI (Văn bản):</span>
                <div style="background: #f8fff9; padding: 10px; border: 1px solid #c3e6cb; border-radius: 4px; margin-top: 5px; font-size: 14px; max-height: 150px; overflow-y: auto; white-space: pre-wrap;">${meta.noi_dung_giai || 'Chưa có nội dung giải'}</div>
            </div>
        `;
    } else if (kieuGiai === 'file') {
        const tenFileGiai = meta.ten_file_giai || 'Chưa đính kèm file giải';
        const linkGiai = hlData.url_file_giai ? `<a href="${hlData.url_file_giai}" target="_blank" style="color: #28a745; font-size: 12px; font-weight: bold; text-decoration: none;">📥 Mở File Giải</a>` : '';
        htmlGiai = `
            <div style="margin-top: 10px;">
                <span style="font-weight:bold; color: #28a745; font-size: 13px;">📎 BÀI GIẢI (File):</span>
                <div style="background: #f8fff9; padding: 8px 12px; border: 1px solid #c3e6cb; border-radius: 4px; margin-top: 5px; display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 13px; color: #495057;">📄 <b>${tenFileGiai}</b></span>
                    ${linkGiai}
                </div>
            </div>
        `;
    }

    // 4. Render nội dung và hiển thị
    khuVucPreview.innerHTML = htmlHeader + htmlDe + htmlGiai;
    khuVucPreview.style.display = 'block';
};


// // =====================================================================
// // Hàm 7b.6: Lưu Cập nhật Nhiệm vụ Tự Luận
// // =====================================================================
// window.ham_7b_9_luu_cap_nhat_nhiem_vu_tu_luan = async function (maNV, btnNode) {
//     const maHL = document.getElementById('sua_nv_maHL_tl').value;
//     const tenNV = document.getElementById('sua_nv_ten_tl').value.trim();
//     const loaiNV = document.getElementById('sua_nv_loai_tl').value;
//     const trangThai = document.getElementById('sua_nv_trangthai_tl').value;
//     const moRaw = document.getElementById('sua_nv_mo_tl').value;
//     const dongRaw = document.getElementById('sua_nv_dong_tl').value;

//     // VALIDATION
//     if (!maHL || maHL === "KHONG_DUNG") {
//         return alert("❌ Thầy/Cô ơi! Nhiệm vụ tự luận BẮT BUỘC phải gắn với 1 học liệu. Vui lòng chọn học liệu từ danh sách nhé.");
//     }
//     if (!tenNV) return alert("❌ Thầy/Cô chưa nhập tên nhiệm vụ!");

//     // Lấy lớp chọn
//     const dsLopCheck = document.querySelectorAll('.chk-lop-tl-sua:checked');
//     const dsMaLop = Array.from(dsLopCheck).map(c => c.value);

//     if (dsMaLop.length === 0) return alert("❌ Thầy/Cô chưa chọn lớp nào để giao bài!");

//     // XỬ LÝ THỜI GIAN NULL
//     const thoiGianMo = moRaw ? moRaw : null;
//     const thoiGianDong = dongRaw ? dongRaw : null;

//     if (thoiGianMo && thoiGianDong) {
//         if (new Date(thoiGianMo) >= new Date(thoiGianDong)) {
//             return alert("❌ Thời gian bắt đầu phải trước thời gian hạn chót!");
//         }
//     }

//     const btnOldText = btnNode.innerText;
//     btnNode.disabled = true;
//     btnNode.innerText = "⏳ Đang lưu cập nhật...";

//     try {
//         const duLieuSua = {
//             ten_nhiem_vu: tenNV,
//             ma_hoc_lieu: maHL,
//             loai_nhiem_vu: loaiNV,
//             danh_sach_lop: dsMaLop,
//             trang_thai: parseInt(trangThai),
//             thoi_gian_mo: thoiGianMo,
//             thoi_gian_dong: thoiGianDong
//         };

//         const { error } = await _supabase.from('nhiem_vu_tu_luan')
//             .update(duLieuSua)
//             .eq('ma_nhiem_vu', maNV);

//         if (error) throw error;

//         alert("✅ Đã cập nhật nhiệm vụ thành công!");
//         ham_7b_1_ve_quan_ly_nhiem_vu_tu_luan(); // Trở về bảng

//     } catch (error) {
//         alert("❌ Lỗi khi cập nhật: " + error.message);
//         console.error(error);
//         btnNode.disabled = false;
//         btnNode.innerText = btnOldText;
//     }
// };

// =====================================================================
// Hàm 7b.9: Lưu Cập nhật Nhiệm vụ Tự Luận (Đã sửa lỗi)
// =====================================================================
window.ham_7b_9_luu_cap_nhat_nhiem_vu_tu_luan = async function (maNV, btnNode) {
    const maHL = document.getElementById('sua_nv_maHL_tl').value;
    const tenNV = document.getElementById('sua_nv_ten_tl').value.trim();
    const loaiNV = document.getElementById('sua_nv_loai_tl').value;
    const trangThai = document.getElementById('sua_nv_trangthai_tl').value;
    const moRaw = document.getElementById('sua_nv_mo_tl').value;
    const dongRaw = document.getElementById('sua_nv_dong_tl').value;

    // 🌟 1. BẮT SỐ LƯỢT LÀM BÀI MỚI TỪ FORM SỬA
    const soLuotRaw = document.getElementById('sua_nv_soluot_tl').value;
    const soLuotNop = soLuotRaw ? parseInt(soLuotRaw) : 0;

    // VALIDATION
    if (!maHL || maHL === "KHONG_DUNG") {
        return alert("❌ Thầy/Cô ơi! Nhiệm vụ tự luận BẮT BUỘC phải gắn với 1 học liệu. Vui lòng chọn học liệu từ danh sách nhé.");
    }
    if (!tenNV) return alert("❌ Thầy/Cô chưa nhập tên nhiệm vụ!");

    // Lấy lớp chọn
    const dsLopCheck = document.querySelectorAll('.chk-lop-tl-sua:checked');
    const dsMaLop = Array.from(dsLopCheck).map(c => c.value);

    if (dsMaLop.length === 0) return alert("❌ Thầy/Cô chưa chọn lớp nào để giao bài!");

    // 🌟 2. XỬ LÝ THỜI GIAN NULL VÀ CHUYỂN SANG CHUẨN ISO CHO SUPABASE
    const thoiGianMo = moRaw ? new Date(moRaw).toISOString() : null;
    const thoiGianDong = dongRaw ? new Date(dongRaw).toISOString() : null;

    if (thoiGianMo && thoiGianDong) {
        if (new Date(thoiGianMo) >= new Date(thoiGianDong)) {
            return alert("❌ Thời gian bắt đầu phải trước thời gian hạn chót!");
        }
    }

    const btnOldText = btnNode.innerText;
    btnNode.disabled = true;
    btnNode.innerText = "⏳ Đang lưu cập nhật...";

    try {
        const duLieuSua = {
            ten_nhiem_vu: tenNV,
            ma_hoc_lieu: maHL,
            loai_nhiem_vu: loaiNV,
            danh_sach_lop: dsMaLop,
            trang_thai: parseInt(trangThai),
            thoi_gian_mo: thoiGianMo,
            thoi_gian_dong: thoiGianDong,

            // 🌟 3. TRUYỀN SỐ LƯỢT LÀM BÀI VÀO ĐỂ UPDATE LÊN DATABASE
            so_luot_lam_bai: soLuotNop
        };

        const { error } = await _supabase.from('nhiem_vu_tu_luan')
            .update(duLieuSua)
            .eq('ma_nhiem_vu', maNV);

        if (error) throw error;

        alert("✅ Đã cập nhật nhiệm vụ thành công!");
        ham_7b_1_ve_quan_ly_nhiem_vu_tu_luan(); // Trở về bảng

    } catch (error) {
        alert("❌ Lỗi khi cập nhật: " + error.message);
        console.error(error);
        btnNode.disabled = false;
        btnNode.innerText = btnOldText;
    }
};


// =====================================================================
// Hàm 7b.7: Gọi Form Sửa Học Liệu ngay từ màn hình Sửa Nhiệm Vụ
// =====================================================================
window.ham_7b_10_goi_sua_hoc_lieu = function () {
    const maHL = document.getElementById('sua_nv_maHL_tl').value;

    // 1. Kiểm tra xem có đang chọn học liệu không
    if (!maHL || maHL === "KHONG_DUNG") {
        return alert("❌ Vui lòng chọn một Học liệu cụ thể trong danh sách để sửa!");
    }

    // 2. Cảnh báo tránh mất dữ liệu đang nhập dở
    const xacNhan = confirm("⚠️ LƯU Ý: Bạn sẽ được chuyển sang giao diện Sửa Học Liệu.\nCác thay đổi của Nhiệm vụ này (nếu chưa lưu) sẽ bị mất.\n\nBạn có chắc chắn muốn chuyển đi không?");

    // 3. Gọi hàm sửa bên khối 6b
    if (xacNhan) {
        if (typeof window.ham_6b_6_mo_form_sua_hoc_lieu_tu_luan === 'function') {
            window.ham_6b_6_mo_form_sua_hoc_lieu_tu_luan(maHL);
        } else {
            alert("❌ Lỗi: Không tìm thấy chức năng sửa học liệu (hàm 6b.6)!");
        }
    }
};


// ==============================================================
// Hàm 7b.8: Xóa Nhiệm Vụ Tự Luận
// ==============================================================
window.ham_7b_11_xoa_nhiem_vu_tu_luan = async function (maNhiemVu) {
    if (!confirm(`⚠️ Xóa vĩnh viễn nhiệm vụ tự luận [ ${maNhiemVu} ]?\nToàn bộ kết quả và file bài tập của học sinh sẽ bị mất!`)) return;
    try {
        const { error } = await _supabase.from('nhiem_vu_tu_luan').delete().eq('ma_nhiem_vu', maNhiemVu);
        if (error) throw error;
        alert('🗑️ Đã xóa thành công!');
        ham_7b_2_tai_danh_sach_nhiem_vu_tu_luan();
    } catch (error) {
        alert('❌ Lỗi: ' + error.message);
    }
};

// ==============================================================
// Hàm 7b.10: Vẽ bảng (Tự Luận)
// ==============================================================
window.ham_7b_12_ve_bang_nhiem_vu_tu_luan = async function () {
    const renderArea = document.getElementById('danh-sach-nv-tl-render');
    let dsNV = [...window.BangNhiemVuTLState.duLieu];

    if (dsNV.length === 0) {
        renderArea.innerHTML = `<div style="text-align: center; padding: 30px;"><h4>Chưa có nhiệm vụ tự luận nào.</h4></div>`;
        return;
    }

    const nutLopActive = document.querySelector('.btn-loc-lop-tl.active');
    const maLopDangChon = nutLopActive ? nutLopActive.getAttribute('onclick').match(/'([^']+)'/)[1] : 'TAT_CA';
    const oTimKiem = document.getElementById('input-tim-kiem-qlnv-tl');
    const tuKhoa = oTimKiem ? oTimKiem.value.toLowerCase().trim() : '';

    let dsHienThi = [];
    dsNV.forEach(nv => {
        const tenNvLower = (nv.ten_nhiem_vu || '').toLowerCase();
        let arrLop = [];
        try { arrLop = typeof nv.danh_sach_lop === 'string' ? JSON.parse(nv.danh_sach_lop) : (nv.danh_sach_lop || []); } catch (e) { }

        let hopLeLop = (maLopDangChon === 'TAT_CA') || arrLop.includes(maLopDangChon);
        let hopLeTimKiem = (tuKhoa === '' || tenNvLower.includes(tuKhoa) || nv.ma_nhiem_vu.toLowerCase().includes(tuKhoa));

        if (hopLeLop && hopLeTimKiem) {
            nv._arrLop = arrLop;
            dsHienThi.push(nv);
        }
    });

    if (dsHienThi.length === 0) {
        renderArea.innerHTML = `<div style="text-align: center; padding: 30px;"><h4>Không tìm thấy kết quả phù hợp.</h4></div>`;
        return;
    }

    // Lấy thông tin đã nộp bài từ bảng ket_qua_tu_luan
    let tuDienKQ = {};
    const mangMaNVHienThi = dsHienThi.map(nv => nv.ma_nhiem_vu);
    try {
        if (mangMaNVHienThi.length > 0) {
            const { data: dsKQ } = await _supabase.from('ket_qua_tu_luan').select('ma_nhiem_vu, uid_hoc_sinh').in('ma_nhiem_vu', mangMaNVHienThi);
            if (dsKQ) {
                dsKQ.forEach(kq => {
                    if (!tuDienKQ[kq.ma_nhiem_vu]) tuDienKQ[kq.ma_nhiem_vu] = new Set();
                    tuDienKQ[kq.ma_nhiem_vu].add(kq.uid_hoc_sinh);
                });
            }
        }
        if (!window._tempDsHsThongKeTL) {
            const { data: dsHS } = await _supabase.from('hoc_sinh').select('uid, danh_sach_ma_lop');
            window._tempDsHsThongKeTL = dsHS || [];
        }
    } catch (e) { console.warn("Lỗi tính toán thống kê TL:", e); }

    let htmlTable = `
        <div style="overflow-x: auto; border: 1px solid #dee2e6; border-radius: 8px;">
            <table style="width: 100%; min-width: 1200px; border-collapse: collapse; background: white; font-size: 13px;">
                <thead style="background: #f8f9fa; border-bottom: 2px solid #dee2e6;">
                    <tr>
                        <th style="padding: 12px; border: 1px solid #eee; width: 40px;">STT</th>
                        <th style="padding: 12px; border: 1px solid #eee; width: 160px;">Thao tác</th>
                        <th style="padding: 12px; border: 1px solid #eee; width: 110px;">Mã NV</th>
                        <th style="padding: 12px; border: 1px solid #eee;">Tên Nhiệm Vụ</th>
                        <th style="padding: 12px; border: 1px solid #eee; width: 100px;">Giao Cho</th>
                        <th style="padding: 12px; border: 1px solid #eee; width: 70px; text-align: center;">Số lượt</th>
                        <th style="padding: 12px; border: 1px solid #eee; text-align: center;">Thời gian</th>
                        <th style="padding: 12px; border: 1px solid #eee; text-align: center;">Tình Trạng</th>
                    </tr>
                </thead>
                <tbody>
    `;

    const now = new Date();
    const fTime = (d) => d ? d.toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }) : "-";

    dsHienThi.forEach((nv, idx) => {
        const timeMo = nv.thoi_gian_mo ? new Date(nv.thoi_gian_mo) : null;
        const timeDong = nv.thoi_gian_dong ? new Date(nv.thoi_gian_dong) : null;

        let hienThiLop = nv._arrLop.map(ma => {
            const lopObj = window.tempDsLop?.find(l => (l.ma_lop || l.ma || l.id) === ma);
            return `<div style="margin-bottom:2px;"><b>${lopObj ? (lopObj.ten_lop || lopObj.ten) : "Lớp ẩn"}</b></div>`;
        }).join('');

        let soDaLam = tuDienKQ[nv.ma_nhiem_vu] ? tuDienKQ[nv.ma_nhiem_vu].size : 0;
        let tongGiao = 0;
        if (window._tempDsHsThongKeTL) {
            let setHS = new Set();
            window._tempDsHsThongKeTL.forEach(hs => {
                let lopCuaEm = [];
                try { lopCuaEm = typeof hs.danh_sach_ma_lop === 'string' ? JSON.parse(hs.danh_sach_ma_lop) : (hs.danh_sach_ma_lop || []); } catch (e) { }
                if (lopCuaEm.some(m => nv._arrLop.includes(m))) setHS.add(hs.uid);
            });
            tongGiao = setHS.size;
        }
        let soChuaLam = Math.max(0, tongGiao - soDaLam);


        // 🌟 XỬ LÝ CỘT SỐ LƯỢT CHO PHÉP LÀM BÀI
        let soLuotHienThi = (!nv.so_luot_lam_bai || nv.so_luot_lam_bai === 0)
            ? '<span style="font-size: 18px; font-weight: bold; color: #28a745;" title="Không giới hạn số lượt nộp">∞</span>'
            : `<span style="font-weight: bold; color: #d35400; font-size: 14px;">${nv.so_luot_lam_bai}</span>`;


        htmlTable += `
            <tr style="border-bottom: 1px solid #eee;" onmouseover="this.style.background='#f0fbfd'" onmouseout="this.style.background='white'">
                <td style="padding: 10px; text-align: center;">${idx + 1}</td>
                <td style="padding: 10px; text-align: center;">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px;">
                        <button onclick="ham_7b_7_mo_form_sua_nhiem_vu_tu_luan('${nv.ma_nhiem_vu}')" style="padding: 6px; background: #ffc107; color: #333; border:none; border-radius:4px; font-weight:bold; cursor:pointer; font-size: 11px;">✏️ Sửa</button>
                        <button onclick="ham_7b_11_xoa_nhiem_vu_tu_luan('${nv.ma_nhiem_vu}')" style="padding: 6px; background: #dc3545; color: white; border:none; border-radius:4px; font-weight:bold; cursor:pointer; font-size: 11px;">❌ Xóa</button>
                        <button onclick="ham_7b_13_thong_ke_nhiem_vu_tu_luan('${nv.ma_nhiem_vu}', '${nv.ten_nhiem_vu.replace(/'/g, "\\'")}')" style="padding: 6px; background: #17a2b8; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; font-size: 11px;">📊 Tiến độ</button>
                        <button onclick="ham_7b_17_mo_giao_dien_cham_bai('${nv.ma_nhiem_vu}')" style="padding: 6px; background: #28a745; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; font-size: 11px;">✍️ Chấm bài</button>
                    </div>
                </td>
                <td style="padding: 10px; font-weight: bold; color: #17a2b8;">${nv.ma_nhiem_vu}</td>
                <td style="padding: 10px;">
                    <div style="font-weight: bold; font-size: 14px;">${nv.ten_nhiem_vu}</div>
                    <small style="color:#888;">HL: ${nv.ma_hoc_lieu || 'Không đính kèm đề'}</small>
                </td>
                <td style="padding: 10px; color: #1a73e8;">${hienThiLop}</td>
                <td style="padding: 10px; text-align: center;">${soLuotHienThi}</td>
                <td style="padding: 10px; text-align: center;">
                    <div style="font-size: 12px; background: #f8f9fa; padding: 6px; border-radius: 6px; border: 1px solid #e9ecef;">
                        <div style="color:#28a745; font-weight:bold;">✅ Nộp bài: ${soDaLam}</div>
                        <div style="color:#dc3545; font-weight:bold;">⏳ Chưa nộp: ${soChuaLam}</div>
                    </div>
                </td>
                <td style="padding: 10px; text-align: center; font-size: 12px;">
                    <span style="color:#28a745">Mở: ${fTime(timeMo)}</span><br>
                    <span style="color:#dc3545">Đóng: ${fTime(timeDong)}</span>
                </td>
                <td style="padding: 10px; text-align: center;">
                    ${nv.trang_thai == 0 ? '<span style="color:#dc3545; font-weight:bold;">⏸️ ĐÃ KHÓA</span>' : (timeDong && now > timeDong ? '<span style="color:#dc3545; font-weight:bold;">🛑 HẾT HẠN</span>' : '<span style="color:#28a745; font-weight:bold;">▶️ NHẬN BÀI</span>')}
                </td>
            </tr>
        `;
    });

    htmlTable += `</tbody></table></div>`;
    renderArea.innerHTML = htmlTable;
};

// =====================================================================
// Hàm 7b.15: Bảng thống kê (Tầng 1)
// =====================================================================
window.ham_7b_13_thong_ke_nhiem_vu_tu_luan = async function (maNhiemVu, tenNhiemVu) {
    Swal.fire({ title: '📊 Đang tổng hợp dữ liệu...', didOpen: () => Swal.showLoading() });
    try {
        const { data: nv } = await _supabase.from('nhiem_vu_tu_luan').select('danh_sach_lop').eq('ma_nhiem_vu', maNhiemVu).single();
        let mangMaLop = [];
        try { mangMaLop = typeof nv.danh_sach_lop === 'string' ? JSON.parse(nv.danh_sach_lop) : (nv.danh_sach_lop || []); } catch (e) { }

        let dsHocSinhLop = [];
        if (mangMaLop.length > 0) {
            const { data: dataHS } = await _supabase.from('hoc_sinh').select('uid, ten, sdt, danh_sach_ma_lop');
            dsHocSinhLop = (dataHS || []).filter(hs => {
                let l = []; try { l = typeof hs.danh_sach_ma_lop === 'string' ? JSON.parse(hs.danh_sach_ma_lop) : (hs.danh_sach_ma_lop || []); } catch (e) { }
                return l.some(m => mangMaLop.includes(m));
            });
        }

        const { data: dsKQ } = await _supabase.from('ket_qua_tu_luan').select('id, uid_hoc_sinh, tong_diem, thoi_gian_nop').eq('ma_nhiem_vu', maNhiemVu).order('thoi_gian_nop', { ascending: false });
        let tuDienKQCuoi = {};
        if (dsKQ) dsKQ.forEach(kq => { if (!tuDienKQCuoi[kq.uid_hoc_sinh]) tuDienKQCuoi[kq.uid_hoc_sinh] = kq; });

        let mangDaLam = [], mangChưaLam = [], tongDiemLop = 0;
        dsHocSinhLop.forEach(hs => {
            const bai = tuDienKQCuoi[hs.uid];
            if (bai) {
                mangDaLam.push({ uid: hs.uid, ten: hs.ten, sdt: hs.sdt, diem: bai.tong_diem || 'Chưa chấm', ngayNop: bai.thoi_gian_nop });
                if (!isNaN(bai.tong_diem)) tongDiemLop += Number(bai.tong_diem);
            } else {
                mangChưaLam.push({ uid: hs.uid, ten: hs.ten, sdt: hs.sdt });
            }
        });

        window.DataThongKeHienTaiTL = { mangDaLam, mangChưaLam, maNhiemVu, tenNhiemVu };

        let soDaLamChamDiem = mangDaLam.filter(x => !isNaN(parseFloat(x.diem))).length;
        const diemTB = soDaLamChamDiem > 0 ? (tongDiemLop / soDaLamChamDiem).toFixed(2) : "0.00";

        Swal.fire({
            title: `📊 TIẾN ĐỘ: ${tenNhiemVu}`,
            html: `
                <div style="text-align: left;">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px;">
                        <div style="background: #e3f2fd; padding: 12px; border-radius: 8px; text-align: center;">
                            <span style="font-size: 11px; font-weight: bold;">Sĩ số giao bài</span>
                            <div style="font-size: 24px; font-weight: 900; color: #1565c0;">${dsHocSinhLop.length} <span style="font-size: 12px;">em</span></div>
                        </div>
                        <div style="background: #e8f5e9; padding: 12px; border-radius: 8px; text-align: center;">
                            <span style="font-size: 11px; font-weight: bold;">Điểm TB (những em đã chấm)</span>
                            <div style="font-size: 24px; font-weight: 900; color: #2e7d32;">${diemTB}</div>
                        </div>
                    </div>
                    <button onclick="ham_7b_15_sub_danh_sach_da_lam_tu_luan()" style="width: 100%; padding: 14px; background: #17a2b8; color: white; border: none; border-radius: 8px; font-weight: bold; margin-bottom: 10px; cursor:pointer;">
                        🟢 Danh sách ĐÃ NỘP BÀI (${mangDaLam.length} em)
                    </button>
                    <button onclick="ham_7b_16_sub_danh_sach_chua_lam_tu_luan()" style="width: 100%; padding: 14px; background: #dc3545; color: white; border: none; border-radius: 8px; font-weight: bold; cursor:pointer;">
                        🔴 Danh sách CHƯA NỘP (${mangChưaLam.length} em)
                    </button>
                </div>
            `,
            confirmButtonText: 'Đóng',
            width: '450px'
        });
    } catch (err) { Swal.fire('Lỗi', err.message, 'error'); }
};

// =====================================================================
// Hàm 7b.16: Tìm kiếm Live (Search Box)
// =====================================================================
window.ham_7b_14_tim_kiem_live_nhiem_vu_tu_luan = function (tuKhoa) {
    if (typeof window.ham_7b_12_ve_bang_nhiem_vu_tu_luan === 'function') {
        window.ham_7b_12_ve_bang_nhiem_vu_tu_luan();
    }
};

// =====================================================================
// Hàm Phụ: Danh sách Đã Nộp & Chưa Nộp
// =====================================================================
window.ham_7b_15_sub_danh_sach_da_lam_tu_luan = function () {
    const { mangDaLam, maNhiemVu, tenNhiemVu } = window.DataThongKeHienTaiTL;
    let html = mangDaLam.map((hs, i) => `
        <tr style="border-bottom: 1px solid #edf2f7;">
            <td style="padding: 10px; text-align: center;">${i + 1}</td>
            <td style="padding: 10px; font-weight: bold;">${hs.ten} <br><small>${hs.sdt}</small></td>
            <td style="padding: 10px; text-align: center; color: #d35400; font-weight: bold;">${hs.diem}</td>
            <td style="padding: 10px; text-align: center; font-size:11px;">${hs.ngayNop ? new Date(hs.ngayNop).toLocaleString('vi-VN') : ''}</td>
        </tr>
    `).join('');

    Swal.fire({
        title: `🟢 ĐÃ NỘP BÀI`,
        html: `<div style="max-height: 400px; overflow-y: auto;"><table style="width: 100%; font-size:13px; text-align:left;"><thead><tr style="background:#f1f3f4;"><th>STT</th><th>Học sinh</th><th>Điểm</th><th>Ngày nộp</th></tr></thead><tbody>${html || '<tr><td colspan="4" align="center">Chưa có ai</td></tr>'}</tbody></table></div>`,
        showCancelButton: true, confirmButtonText: 'Quay lại', cancelButtonText: 'Đóng', width: '550px'
    }).then(r => { if (r.isConfirmed) ham_7b_13_thong_ke_nhiem_vu_tu_luan(maNhiemVu, tenNhiemVu); });
};

window.ham_7b_16_sub_danh_sach_chua_lam_tu_luan = function () {
    const { mangChưaLam, maNhiemVu, tenNhiemVu } = window.DataThongKeHienTaiTL;
    let html = mangChưaLam.map((hs, i) => `
        <tr style="border-bottom: 1px solid #edf2f7;"><td style="padding: 8px; text-align: center;">${i + 1}</td><td style="padding: 8px; font-weight: bold;">${hs.ten}</td><td style="padding: 8px;">${hs.sdt}</td></tr>
    `).join('');

    Swal.fire({
        title: `🔴 CHƯA NỘP BÀI`,
        html: `<div style="max-height: 400px; overflow-y: auto;"><table style="width: 100%; font-size:13px; text-align:left;"><thead><tr style="background:#fff5f5; color:#9b2c2c;"><th>STT</th><th>Học sinh</th><th>Số điện thoại</th></tr></thead><tbody>${html || '<tr><td colspan="3" align="center">Tất cả đã nộp</td></tr>'}</tbody></table></div>`,
        showCancelButton: true, confirmButtonText: 'Quay lại', cancelButtonText: 'Đóng', width: '450px'
    }).then(r => { if (r.isConfirmed) ham_7b_13_thong_ke_nhiem_vu_tu_luan(maNhiemVu, tenNhiemVu); });
};



// =====================================================================
// BỘ STATE LƯU TRỮ TẠM THỜI CHO KHỐI CHẤM BÀI TỰ LUẬN
// =====================================================================
window.ChamBaiTL_State = {
    maNV: null,
    tenNV: '',
    dsKetQua: [],
    dsHocSinh: [],
    uidDangCham: null,
    gocXoay: {}, // Lưu góc xoay của từng ảnh
    mucZoom: {},  // Lưu độ phóng to của từng ảnh
    tieuChiSort: 'ten' // 🌟 THÊM DÒNG NÀY ĐỂ LƯU CHẾ ĐỘ SORT
};

// =====================================================================
// Hàm 7b.17: Mở giao diện và tải dữ liệu Chấm Bài
// =====================================================================
window.ham_7b_17_mo_giao_dien_cham_bai = async function (maNV) {
    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
    vungLamViec.innerHTML = `<div style="text-align: center; padding: 50px; font-size: 18px;">⏳ Đang tải dữ liệu bài làm... Vui lòng đợi...</div>`;

    try {
        // 1. Tải thông tin nhiệm vụ
        const { data: nv } = await _supabase.from('nhiem_vu_tu_luan').select('*').eq('ma_nhiem_vu', maNV).single();
        if (!nv) throw new Error("Không tìm thấy nhiệm vụ!");

        ChamBaiTL_State.maNV = maNV;
        ChamBaiTL_State.tenNV = nv.ten_nhiem_vu;
        const cacLopDuocGiao = nv.danh_sach_lop || [];

        // 2. Tải toàn bộ học sinh (để lọc ra HS thuộc lớp được giao)
        const { data: allHS } = await _supabase.from('hoc_sinh').select('uid, ten, danh_sach_ma_lop, anh_dai_dien');
        let dsHSHopLe = [];
        if (allHS) {
            allHS.forEach(hs => {
                let lopCuaHS = [];
                try { lopCuaHS = typeof hs.danh_sach_ma_lop === 'string' ? JSON.parse(hs.danh_sach_ma_lop) : (hs.danh_sach_ma_lop || []); } catch (e) { }
                if (lopCuaHS.some(maLop => cacLopDuocGiao.includes(maLop))) {
                    dsHSHopLe.push(hs);
                }
            });
        }
        // Sắp xếp HS theo tên ABC
        dsHSHopLe.sort((a, b) => (a.ten || '').localeCompare(b.ten || ''));
        ChamBaiTL_State.dsHocSinh = dsHSHopLe;

        // 3. Tải toàn bộ kết quả đã nộp của nhiệm vụ này
        const { data: dsKQ } = await _supabase.from('ket_qua_tu_luan').select('*').eq('ma_nhiem_vu', maNV);
        ChamBaiTL_State.dsKetQua = dsKQ || [];

        // 4. Render Layout Tổng thể
        ham_7b_18_render_layout_tong_cham_bai();

    } catch (error) {
        vungLamViec.innerHTML = `<div style="color:red; text-align:center; padding: 30px;">❌ Lỗi tải dữ liệu: ${error.message}</div>`;
    }
};

// //
//  =====================================================================
// // Hàm 7b.18: Render Khung Giao Diện (Đã bổ sung Sort theo Trạng thái & Điểm)
// // =====================================================================
// window.ham_7b_18_render_layout_tong_cham_bai = function () {
//     let htmlDanhSachHS = '';
//     let soDaCham = 0;
//     let soChoCham = 0;
//     let soChuaNop = 0;

//     // 1. LOGIC SẮP XẾP DANH SÁCH (SORTING)
//     let dsRender = [...ChamBaiTL_State.dsHocSinh];
//     const tieuChi = ChamBaiTL_State.tieuChiSort || 'stt';

//     // Hàm lấy chữ cuối cùng trong tên để sort ABC
//     const layTenCuoi = (fullName) => {
//         if (!fullName) return "";
//         const parts = fullName.trim().split(" ");
//         return parts[parts.length - 1].toLowerCase();
//     };

//     // Hàm xác định độ ưu tiên của Trạng thái (1: Đã chấm, 2: Chờ chấm, 3: Chưa nộp)
//     const layUuTienTrangThai = (hsUid) => {
//         const kq = ChamBaiTL_State.dsKetQua.find(k => k.uid_hoc_sinh === hsUid);
//         if (!kq) return 3; // Chưa nộp bài
//         if (kq.trang_thai_cham === 1) return 1; // Đã chấm
//         return 2; // Đã nộp, chờ chấm
//     };

//     // Áp dụng thuật toán sắp xếp
//     if (tieuChi === 'ten') {
//         // Sort 1: Theo Tên (A-Z)
//         dsRender.sort((a, b) => layTenCuoi(a.ten).localeCompare(layTenCuoi(b.ten)));

//     } else if (tieuChi === 'diem_desc') {
//         // Sort 2: Tuyệt đối theo Điểm (Cao -> Thấp)
//         dsRender.sort((a, b) => {
//             const kqA = ChamBaiTL_State.dsKetQua.find(k => k.uid_hoc_sinh === a.uid);
//             const kqB = ChamBaiTL_State.dsKetQua.find(k => k.uid_hoc_sinh === b.uid);
//             const diemA = (kqA && kqA.trang_thai_cham === 1) ? Number(kqA.tong_diem || 0) : -1;
//             const diemB = (kqB && kqB.trang_thai_cham === 1) ? Number(kqB.tong_diem || 0) : -1;
//             return diemB - diemA;
//         });

//     } else if (tieuChi === 'trang_thai') {
//         // 🌟 Sort 3: Đã chấm (Cao->Thấp) > Chờ chấm (A->Z) > Chưa nộp (A->Z)
//         dsRender.sort((a, b) => {
//             const uuTienA = layUuTienTrangThai(a.uid);
//             const uuTienB = layUuTienTrangThai(b.uid);

//             if (uuTienA !== uuTienB) {
//                 return uuTienA - uuTienB; // Xếp theo nhóm trạng thái trước
//             }

//             // Nếu cùng nằm trong nhóm ĐÃ CHẤM (uuTien == 1) -> Xếp theo điểm
//             if (uuTienA === 1) {
//                 const kqA = ChamBaiTL_State.dsKetQua.find(k => k.uid_hoc_sinh === a.uid);
//                 const kqB = ChamBaiTL_State.dsKetQua.find(k => k.uid_hoc_sinh === b.uid);
//                 const diemA = Number(kqA.tong_diem || 0);
//                 const diemB = Number(kqB.tong_diem || 0);
//                 if (diemA !== diemB) return diemB - diemA;
//             }

//             // Nếu cùng nhóm chờ chấm/chưa nộp (hoặc điểm bằng nhau) -> Xếp theo Tên ABC
//             return layTenCuoi(a.ten).localeCompare(layTenCuoi(b.ten));
//         });

//     } else {
//         // Mặc định (stt): Sort theo toàn bộ chuỗi Họ và Tên (A-Z)
//         dsRender.sort((a, b) => (a.ten || "").localeCompare(b.ten || ""));
//     }

//     // 2. RENDER GIAO DIỆN TỪNG HỌC SINH
//     dsRender.forEach((hs, index) => {
//         const baiNop = ChamBaiTL_State.dsKetQua.find(kq => kq.uid_hoc_sinh === hs.uid);

//         let phanHienThiPhai = '';

//         if (!baiNop) {
//             phanHienThiPhai = `<span style="font-size: 11px; font-weight: bold; color: #dc3545; background: #ffe3e6; padding: 4px 8px; border-radius: 4px;">Chưa nộp</span>`;
//             soChuaNop++;
//         } else if (baiNop.trang_thai_cham === 1) {
//             phanHienThiPhai = `<span style="font-size: 16px; font-weight: 900; color: #28a745;">${baiNop.tong_diem} <span style="font-size:11px; font-weight:bold;">đ</span></span>`;
//             soDaCham++;
//         } else {
//             phanHienThiPhai = `<span style="font-size: 11px; font-weight: bold; color: #d35400; background: #ffe8d6; padding: 4px 8px; border-radius: 4px;">Chờ chấm</span>`;
//             soChoCham++;
//         }

//         htmlDanhSachHS += `
//             <div onclick="ham_7b_19_xem_bai_hoc_sinh('${hs.uid}')" id="hs_card_${hs.uid}" class="cham-bai-hs-card ${ChamBaiTL_State.uidDangCham === hs.uid ? 'active' : ''}" style="padding: 10px 15px; border-bottom: 1px solid #eee; cursor: pointer; display: flex; justify-content: space-between; align-items: center; transition: 0.2s; gap: 10px;">
//                 <div style="font-weight: bold; font-size: 13px; color: #333; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; flex: 1;" title="${hs.ten}">
//                     ${index + 1}. ${hs.ten || 'Chưa cập nhật'}
//                 </div>
//                 <div style="white-space: nowrap; display: flex; align-items: center;">
//                     ${phanHienThiPhai}
//                 </div>
//             </div>
//         `;
//     });

//     // 3. RENDER KHUNG TỔNG THỂ
//     const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
//     vungLamViec.innerHTML = `
//         <style>
//             .cham-bai-hs-card:hover { background: #f8f9fa; }
//             .cham-bai-hs-card.active { background: #e8f4fd; border-left: 4px solid #0056b3; }
//         </style>
//         <div id="container-cham-bai-tong" style="max-width: 1300px; margin: 0 auto; background: white; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); display: flex; height: 85vh; overflow: hidden;">
            
//             <div id="cot-trai-cham-bai" style="width: 330px; min-width: 250px; max-width: 600px; border-right: 1px solid #dee2e6; display: flex; flex-direction: column; flex-shrink: 0;">
//                 <div style="padding: 15px; background: #f8f9fa; border-bottom: 1px solid #dee2e6; border-radius: 8px 0 0 0;">
//                     <button onclick="ham_7b_1_ve_quan_ly_nhiem_vu_tu_luan()" style="padding: 6px 12px; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight:bold; margin-bottom: 10px; width: 100%;">⬅️ Quay lại DS Nhiệm vụ</button>
//                     <h4 style="margin: 0 0 5px 0; color: #0056b3; font-size: 15px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${ChamBaiTL_State.tenNV}">📝 ${ChamBaiTL_State.tenNV}</h4>
                    
//                     <div style="font-size: 12px; color: #666; margin-bottom: 10px;">
//                         Tiến độ: 
//                         <span style="color:#28a745; font-weight:bold;">${soDaCham} đã chấm</span> / 
//                         <span style="color:#d35400; font-weight:bold;">${soChoCham} chờ</span> / 
//                         <span style="color:#dc3545; font-weight:bold;">${soChuaNop} chưa nộp</span>
//                     </div>
                    
//                     <div style="display: flex; align-items: center; gap: 8px; border-top: 1px dashed #ccc; padding-top: 10px;">
//                         <span style="font-size: 12px; font-weight: bold; color: #495057;">Sắp xếp:</span>
//                         <select onchange="ham_7b_23_doi_sort_cham_bai(this.value)" style="flex: 1; padding: 4px 8px; border-radius: 4px; border: 1px solid #ced4da; font-size: 12px; outline: none; cursor: pointer; background: white;">
//                             <option value="stt" ${tieuChi === 'stt' ? 'selected' : ''}>Mặc định (Họ và Tên)</option>
//                             <option value="ten" ${tieuChi === 'ten' ? 'selected' : ''}>Theo Tên (A - Z)</option>
//                             <option value="diem_desc" ${tieuChi === 'diem_desc' ? 'selected' : ''}>Theo Điểm (Cao -> Thấp)</option>
//                             <option value="trang_thai" ${tieuChi === 'trang_thai' ? 'selected' : ''}>Theo Trạng thái & Điểm</option>
//                         </select>
//                     </div>
//                 </div>

//                 <div style="flex: 1; overflow-y: auto; background: #fff;">
//                     ${htmlDanhSachHS}
//                 </div>
//             </div>

//             <div id="thanh-keo-gian-cham-bai" style="width: 8px; background: #e9ecef; cursor: col-resize; z-index: 50; display: flex; flex-direction: column; justify-content: center; align-items: center; transition: background 0.2s;" onmouseover="this.style.background='#17a2b8'" onmouseout="this.style.background='#e9ecef'">
//                 <div style="color: #6c757d; font-size: 14px; user-select: none;">⋮</div>
//                 <div style="color: #6c757d; font-size: 14px; user-select: none;">⋮</div>
//                 <div style="color: #6c757d; font-size: 14px; user-select: none;">⋮</div>
//             </div>

//             <div id="khung-cham-bai-phai" style="flex: 1; display: flex; flex-direction: column; background: #f4f6f9; border-radius: 0 8px 8px 0; overflow: hidden;">
//                 <div style="flex: 1; display: flex; justify-content: center; align-items: center; color: #888; flex-direction: column;">
//                     <div style="font-size: 40px; margin-bottom: 15px;">👈</div>
//                     <h3>Hãy chọn một học sinh bên danh sách để bắt đầu chấm bài</h3>
//                 </div>
//             </div>
//         </div>
//     `;

//     setTimeout(ham_7b_22_kich_hoat_thanh_keo, 100);

//     if (ChamBaiTL_State.uidDangCham) {
//         ham_7b_19_xem_bai_hoc_sinh(ChamBaiTL_State.uidDangCham);
//     }
// };


// // =====================================================================
// // Hàm 7b.18: Render Khung Giao Diện (Đã sửa lỗi "reading 'ten'")
// // =====================================================================
// window.ham_7b_18_render_layout_tong_cham_bai = function () {
//     let htmlDanhSachHS = '';
//     let soDaCham = 0;
//     let soChoCham = 0;
//     let soChuaNop = 0;

//     // 1. LOGIC SẮP XẾP DANH SÁCH (SORTING)
//     let dsRender = [...ChamBaiTL_State.dsHocSinh];
//     const tieuChi = ChamBaiTL_State.tieuChiSort || 'stt';

//     // Hàm lấy chữ cuối cùng trong tên để sort ABC (Đã bọc thép)
//     const layTenCuoi = (fullName) => {
//         if (!fullName) return "";
//         const parts = fullName.trim().split(" ");
//         return parts[parts.length - 1].toLowerCase();
//     };

//     // Hàm xác định độ ưu tiên của Trạng thái (1: Đã chấm, 2: Chờ chấm, 3: Chưa nộp)
//     const layUuTienTrangThai = (hsUid) => {
//         const kq = ChamBaiTL_State.dsKetQua.find(k => k.uid_hoc_sinh === hsUid);
//         if (!kq) return 3; // Chưa nộp bài
//         if (kq.trang_thai_cham === 1) return 1; // Đã chấm
//         return 2; // Đã nộp, chờ chấm
//     };

//     // Áp dụng thuật toán sắp xếp (Đã bọc thép an toàn)
//     if (tieuChi === 'ten') {
//         dsRender.sort((a, b) => layTenCuoi(a?.ten).localeCompare(layTenCuoi(b?.ten)));

//     } else if (tieuChi === 'diem_desc') {
//         dsRender.sort((a, b) => {
//             const kqA = ChamBaiTL_State.dsKetQua.find(k => k.uid_hoc_sinh === a?.uid);
//             const kqB = ChamBaiTL_State.dsKetQua.find(k => k.uid_hoc_sinh === b?.uid);
//             const diemA = (kqA && kqA.trang_thai_cham === 1) ? Number(kqA.tong_diem || 0) : -1;
//             const diemB = (kqB && kqB.trang_thai_cham === 1) ? Number(kqB.tong_diem || 0) : -1;
//             return diemB - diemA;
//         });

//     } else if (tieuChi === 'trang_thai') {
//         dsRender.sort((a, b) => {
//             const uuTienA = layUuTienTrangThai(a?.uid);
//             const uuTienB = layUuTienTrangThai(b?.uid);

//             if (uuTienA !== uuTienB) {
//                 return uuTienA - uuTienB;
//             }

//             if (uuTienA === 1) {
//                 const kqA = ChamBaiTL_State.dsKetQua.find(k => k.uid_hoc_sinh === a?.uid);
//                 const kqB = ChamBaiTL_State.dsKetQua.find(k => k.uid_hoc_sinh === b?.uid);
//                 const diemA = Number(kqA?.tong_diem || 0);
//                 const diemB = Number(kqB?.tong_diem || 0);
//                 if (diemA !== diemB) return diemB - diemA;
//             }

//             return layTenCuoi(a?.ten).localeCompare(layTenCuoi(b?.ten));
//         });

//     } else {
//         dsRender.sort((a, b) => (a?.ten || "").localeCompare(b?.ten || ""));
//     }

//     // 2. RENDER GIAO DIỆN TỪNG HỌC SINH (Đã bọc thép)
//     dsRender.forEach((hs, index) => {
//         if (!hs || !hs.uid) return; // Bỏ qua nếu dữ liệu HS lỗi

//         const baiNop = ChamBaiTL_State.dsKetQua.find(kq => kq.uid_hoc_sinh === hs.uid);
//         let phanHienThiPhai = '';

//         if (!baiNop) {
//             phanHienThiPhai = `<span style="font-size: 11px; font-weight: bold; color: #dc3545; background: #ffe3e6; padding: 4px 8px; border-radius: 4px;">Chưa nộp</span>`;
//             soChuaNop++;
//         } else if (baiNop.trang_thai_cham === 1) {
//             phanHienThiPhai = `<span style="font-size: 16px; font-weight: 900; color: #28a745;">${baiNop.tong_diem} <span style="font-size:11px; font-weight:bold;">đ</span></span>`;
//             soDaCham++;
//         } else {
//             phanHienThiPhai = `<span style="font-size: 11px; font-weight: bold; color: #d35400; background: #ffe8d6; padding: 4px 8px; border-radius: 4px;">Chờ chấm</span>`;
//             soChoCham++;
//         }

//         let tenHienThi = hs.ten || 'Chưa cập nhật';

//         htmlDanhSachHS += `
//             <div onclick="ham_7b_19_xem_bai_hoc_sinh('${hs.uid}')" id="hs_card_${hs.uid}" class="cham-bai-hs-card ${ChamBaiTL_State.uidDangCham === hs.uid ? 'active' : ''}" style="padding: 10px 15px; border-bottom: 1px solid #eee; cursor: pointer; display: flex; justify-content: space-between; align-items: center; transition: 0.2s; gap: 10px;">
//                 <div style="font-weight: bold; font-size: 13px; color: #333; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; flex: 1;" title="${tenHienThi}">
//                     ${index + 1}. ${tenHienThi}
//                 </div>
//                 <div style="white-space: nowrap; display: flex; align-items: center;">
//                     ${phanHienThiPhai}
//                 </div>
//             </div>
//         `;
//     });

//     // 3. RENDER KHUNG TỔNG THỂ
//     const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
//     vungLamViec.innerHTML = `
//         <style>
//             .cham-bai-hs-card:hover { background: #f8f9fa; }
//             .cham-bai-hs-card.active { background: #e8f4fd; border-left: 4px solid #0056b3; }
//         </style>
//         <div id="container-cham-bai-tong" style="max-width: 1300px; margin: 0 auto; background: white; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); display: flex; height: 85vh; overflow: hidden;">
            
//             <div id="cot-trai-cham-bai" style="width: 330px; min-width: 250px; max-width: 600px; border-right: 1px solid #dee2e6; display: flex; flex-direction: column; flex-shrink: 0;">
//                 <div style="padding: 15px; background: #f8f9fa; border-bottom: 1px solid #dee2e6; border-radius: 8px 0 0 0;">
//                     <button onclick="ham_7b_1_ve_quan_ly_nhiem_vu_tu_luan()" style="padding: 6px 12px; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight:bold; margin-bottom: 10px; width: 100%;">⬅️ Quay lại DS Nhiệm vụ</button>
//                     <h4 style="margin: 0 0 5px 0; color: #0056b3; font-size: 15px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${ChamBaiTL_State.tenNV}">📝 ${ChamBaiTL_State.tenNV}</h4>
                    
//                     <div style="font-size: 12px; color: #666; margin-bottom: 10px;">
//                         Tiến độ: 
//                         <span style="color:#28a745; font-weight:bold;">${soDaCham} đã chấm</span> / 
//                         <span style="color:#d35400; font-weight:bold;">${soChoCham} chờ</span> / 
//                         <span style="color:#dc3545; font-weight:bold;">${soChuaNop} chưa nộp</span>
//                     </div>
                    
//                     <div style="display: flex; align-items: center; gap: 8px; border-top: 1px dashed #ccc; padding-top: 10px;">
//                         <span style="font-size: 12px; font-weight: bold; color: #495057;">Sắp xếp:</span>
//                         <select onchange="ham_7b_23_doi_sort_cham_bai(this.value)" style="flex: 1; padding: 4px 8px; border-radius: 4px; border: 1px solid #ced4da; font-size: 12px; outline: none; cursor: pointer; background: white;">
//                             <option value="stt" ${tieuChi === 'stt' ? 'selected' : ''}>Mặc định (Họ và Tên)</option>
//                             <option value="ten" ${tieuChi === 'ten' ? 'selected' : ''}>Theo Tên (A - Z)</option>
//                             <option value="diem_desc" ${tieuChi === 'diem_desc' ? 'selected' : ''}>Theo Điểm (Cao -> Thấp)</option>
//                             <option value="trang_thai" ${tieuChi === 'trang_thai' ? 'selected' : ''}>Theo Trạng thái & Điểm</option>
//                         </select>
//                     </div>
//                 </div>

//                 <div style="flex: 1; overflow-y: auto; background: #fff;">
//                     ${htmlDanhSachHS}
//                 </div>
//             </div>

//             <div id="thanh-keo-gian-cham-bai" style="width: 8px; background: #e9ecef; cursor: col-resize; z-index: 50; display: flex; flex-direction: column; justify-content: center; align-items: center; transition: background 0.2s;" onmouseover="this.style.background='#17a2b8'" onmouseout="this.style.background='#e9ecef'">
//                 <div style="color: #6c757d; font-size: 14px; user-select: none;">⋮</div>
//                 <div style="color: #6c757d; font-size: 14px; user-select: none;">⋮</div>
//                 <div style="color: #6c757d; font-size: 14px; user-select: none;">⋮</div>
//             </div>

//             <div id="khung-cham-bai-phai" style="flex: 1; display: flex; flex-direction: column; background: #f4f6f9; border-radius: 0 8px 8px 0; overflow: hidden;">
//                 <div style="flex: 1; display: flex; justify-content: center; align-items: center; color: #888; flex-direction: column;">
//                     <div style="font-size: 40px; margin-bottom: 15px;">👈</div>
//                     <h3>Hãy chọn một học sinh bên danh sách để bắt đầu chấm bài</h3>
//                 </div>
//             </div>
//         </div>
//     `;

//     setTimeout(ham_7b_22_kich_hoat_thanh_keo, 100);

//     if (ChamBaiTL_State.uidDangCham) {
//         ham_7b_19_xem_bai_hoc_sinh(ChamBaiTL_State.uidDangCham);
//     }
// };

// // =====================================================================
// // Hàm 7b.18: Render Khung Giao Diện (Cập nhật mặc định Sort theo Tên)
// // =====================================================================
// window.ham_7b_18_render_layout_tong_cham_bai = function () {
//     let htmlDanhSachHS = '';
//     let soDaCham = 0;
//     let soChoCham = 0;
//     let soChuaNop = 0;

//     // 1. LOGIC SẮP XẾP DANH SÁCH (SORTING)
//     let dsRender = [...ChamBaiTL_State.dsHocSinh];

//     // 🌟 Đổi giá trị dự phòng sang 'ten'
//     const tieuChi = ChamBaiTL_State.tieuChiSort || 'ten';

//     // Hàm lấy chữ cuối cùng trong tên để sort ABC
//     const layTenCuoi = (fullName) => {
//         if (!fullName) return "";
//         const parts = fullName.trim().split(" ");
//         return parts[parts.length - 1].toLowerCase();
//     };

//     // Hàm xác định độ ưu tiên của Trạng thái (1: Đã chấm, 2: Chờ chấm, 3: Chưa nộp)
//     const layUuTienTrangThai = (hsUid) => {
//         const kq = ChamBaiTL_State.dsKetQua.find(k => k.uid_hoc_sinh === hsUid);
//         if (!kq) return 3; // Chưa nộp bài
//         if (kq.trang_thai_cham === 1) return 1; // Đã chấm
//         return 2; // Đã nộp, chờ chấm
//     };

//     // Áp dụng thuật toán sắp xếp
//     if (tieuChi === 'ten') {
//         dsRender.sort((a, b) => layTenCuoi(a?.ten).localeCompare(layTenCuoi(b?.ten)));

//     } else if (tieuChi === 'diem_desc') {
//         dsRender.sort((a, b) => {
//             const kqA = ChamBaiTL_State.dsKetQua.find(k => k.uid_hoc_sinh === a?.uid);
//             const kqB = ChamBaiTL_State.dsKetQua.find(k => k.uid_hoc_sinh === b?.uid);
//             const diemA = (kqA && kqA.trang_thai_cham === 1) ? Number(kqA.tong_diem || 0) : -1;
//             const diemB = (kqB && kqB.trang_thai_cham === 1) ? Number(kqB.tong_diem || 0) : -1;
//             return diemB - diemA;
//         });

//     } else if (tieuChi === 'trang_thai') {
//         dsRender.sort((a, b) => {
//             const uuTienA = layUuTienTrangThai(a?.uid);
//             const uuTienB = layUuTienTrangThai(b?.uid);

//             if (uuTienA !== uuTienB) {
//                 return uuTienA - uuTienB;
//             }

//             if (uuTienA === 1) {
//                 const kqA = ChamBaiTL_State.dsKetQua.find(k => k.uid_hoc_sinh === a?.uid);
//                 const kqB = ChamBaiTL_State.dsKetQua.find(k => k.uid_hoc_sinh === b?.uid);
//                 const diemA = Number(kqA?.tong_diem || 0);
//                 const diemB = Number(kqB?.tong_diem || 0);
//                 if (diemA !== diemB) return diemB - diemA;
//             }

//             return layTenCuoi(a?.ten).localeCompare(layTenCuoi(b?.ten));
//         });

//     } else {
//         dsRender.sort((a, b) => (a?.ten || "").localeCompare(b?.ten || ""));
//     }

//     // // 2. RENDER GIAO DIỆN TỪNG HỌC SINH
//     // dsRender.forEach((hs, index) => {
//     //     if (!hs || !hs.uid) return;

//     //     const baiNop = ChamBaiTL_State.dsKetQua.find(kq => kq.uid_hoc_sinh === hs.uid);
//     //     let phanHienThiPhai = '';

//     //     if (!baiNop) {
//     //         phanHienThiPhai = `<span style="font-size: 11px; font-weight: bold; color: #dc3545; background: #ffe3e6; padding: 4px 8px; border-radius: 4px;">Chưa nộp</span>`;
//     //         soChuaNop++;
//     //     } else if (baiNop.trang_thai_cham === 1) {
//     //         phanHienThiPhai = `<span style="font-size: 16px; font-weight: 900; color: #28a745;">${baiNop.tong_diem} <span style="font-size:11px; font-weight:bold;">đ</span></span>`;
//     //         soDaCham++;
//     //     } else {
//     //         phanHienThiPhai = `<span style="font-size: 11px; font-weight: bold; color: #d35400; background: #ffe8d6; padding: 4px 8px; border-radius: 4px;">Chờ chấm</span>`;
//     //         soChoCham++;
//     //     }

//     //     let tenHienThi = hs.ten || 'Chưa cập nhật';

//     //     htmlDanhSachHS += `
//     //         <div onclick="ham_7b_19_xem_bai_hoc_sinh('${hs.uid}')" id="hs_card_${hs.uid}" class="cham-bai-hs-card ${ChamBaiTL_State.uidDangCham === hs.uid ? 'active' : ''}" style="padding: 10px 15px; border-bottom: 1px solid #eee; cursor: pointer; display: flex; justify-content: space-between; align-items: center; transition: 0.2s; gap: 10px;">
//     //             <div style="font-weight: bold; font-size: 13px; color: #333; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; flex: 1;" title="${tenHienThi}">
//     //                 ${index + 1}. ${tenHienThi}
//     //             </div>
//     //             <div style="white-space: nowrap; display: flex; align-items: center;">
//     //                 ${phanHienThiPhai}
//     //             </div>
//     //         </div>
//     //     `;
//     // });

//     // TÌM ĐOẠN NÀY BÊN TRONG ham_7b_18_render_layout_tong_cham_bai (Khoảng dòng 2)
//     dsRender.forEach((hs, index) => {
//         if (!hs || !hs.uid) return;

//         const baiNop = ChamBaiTL_State.dsKetQua.find(kq => kq.uid_hoc_sinh === hs.uid);
//         let phanHienThiPhai = '';

//         if (!baiNop) {
//             phanHienThiPhai = `<span style="font-size: 11px; font-weight: bold; color: #dc3545; background: #ffe3e6; padding: 4px 8px; border-radius: 4px;">Chưa nộp</span>`;
//             soChuaNop++;
//         } else if (baiNop.trang_thai_cham === 1) {
//             // 🌟 ĐÃ CHẤM: PHÂN TÍCH ĐỂ HIỂN THỊ ĐIỂM + ĐÁNH GIÁ CHỮ
//             let chiTiet = typeof baiNop.chi_tiet_lam_bai === 'string' ? JSON.parse(baiNop.chi_tiet_lam_bai || '{}') : (baiNop.chi_tiet_lam_bai || {});

//             let htmlDanhGia = '';
//             if (chiTiet.danh_gia_chu === 'Tốt') htmlDanhGia = `<span style="font-size:11px; background:#17a2b8; color:white; padding:2px 6px; border-radius:12px; margin-left:4px;">🌟 Tốt</span>`;
//             else if (chiTiet.danh_gia_chu === 'Đạt') htmlDanhGia = `<span style="font-size:11px; background:#28a745; color:white; padding:2px 6px; border-radius:12px; margin-left:4px;">✅ Đạt</span>`;
//             else if (chiTiet.danh_gia_chu === 'Chưa Đạt') htmlDanhGia = `<span style="font-size:11px; background:#dc3545; color:white; padding:2px 6px; border-radius:12px; margin-left:4px;">❌ C/Đạt</span>`;

//             let htmlDiem = (baiNop.tong_diem !== null && baiNop.tong_diem !== undefined) ? `<span style="font-size: 16px; font-weight: 900; color: #28a745;">${baiNop.tong_diem} <span style="font-size:11px; font-weight:bold;">đ</span></span>` : '';

//             // Nếu chỉ chấm Chữ (Không có Điểm số)
//             if (!htmlDiem && htmlDanhGia) {
//                 phanHienThiPhai = `<div style="display: flex; align-items: center;">${htmlDanhGia}</div>`;
//             } else {
//                 // Hiển thị cả Điểm và Chữ (hoặc chỉ Điểm)
//                 phanHienThiPhai = `<div style="display: flex; align-items: center;">${htmlDiem} ${htmlDanhGia}</div>`;
//             }
//             soDaCham++;
//         } else {
//             phanHienThiPhai = `<span style="font-size: 11px; font-weight: bold; color: #d35400; background: #ffe8d6; padding: 4px 8px; border-radius: 4px;">Chờ chấm</span>`;
//             soChoCham++;
//         }

//         let tenHienThi = hs.ten || 'Chưa cập nhật';

//         htmlDanhSachHS += `
//             <div onclick="ham_7b_19_xem_bai_hoc_sinh('${hs.uid}')" id="hs_card_${hs.uid}" class="cham-bai-hs-card ${ChamBaiTL_State.uidDangCham === hs.uid ? 'active' : ''}" style="padding: 10px 15px; border-bottom: 1px solid #eee; cursor: pointer; display: flex; justify-content: space-between; align-items: center; transition: 0.2s; gap: 10px;">
//                 <div style="font-weight: bold; font-size: 13px; color: #333; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; flex: 1;" title="${tenHienThi}">
//                     ${index + 1}. ${tenHienThi}
//                 </div>
//                 <div style="white-space: nowrap; display: flex; align-items: center;">
//                     ${phanHienThiPhai}
//                 </div>
//             </div>
//         `;
//     });




//     // 3. RENDER KHUNG TỔNG THỂ
//     const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
//     vungLamViec.innerHTML = `
//         <style>
//             .cham-bai-hs-card:hover { background: #f8f9fa; }
//             .cham-bai-hs-card.active { background: #e8f4fd; border-left: 4px solid #0056b3; }
//         </style>
//         <div id="container-cham-bai-tong" style="max-width: 1300px; margin: 0 auto; background: white; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); display: flex; height: 85vh; overflow: hidden;">
            
//             <div id="cot-trai-cham-bai" style="width: 330px; min-width: 250px; max-width: 600px; border-right: 1px solid #dee2e6; display: flex; flex-direction: column; flex-shrink: 0;">
//                 <div style="padding: 15px; background: #f8f9fa; border-bottom: 1px solid #dee2e6; border-radius: 8px 0 0 0;">
//                     <button onclick="ham_7b_1_ve_quan_ly_nhiem_vu_tu_luan()" style="padding: 6px 12px; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight:bold; margin-bottom: 10px; width: 100%;">⬅️ Quay lại DS Nhiệm vụ</button>
//                     <h4 style="margin: 0 0 5px 0; color: #0056b3; font-size: 15px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${ChamBaiTL_State.tenNV}">📝 ${ChamBaiTL_State.tenNV}</h4>
                    
//                     <div style="font-size: 12px; color: #666; margin-bottom: 10px;">
//                         Tiến độ: 
//                         <span style="color:#28a745; font-weight:bold;">${soDaCham} đã chấm</span> / 
//                         <span style="color:#d35400; font-weight:bold;">${soChoCham} chờ</span> / 
//                         <span style="color:#dc3545; font-weight:bold;">${soChuaNop} chưa nộp</span>
//                     </div>
                    
//                     <div style="display: flex; align-items: center; gap: 8px; border-top: 1px dashed #ccc; padding-top: 10px;">
//                         <span style="font-size: 12px; font-weight: bold; color: #495057;">Sắp xếp:</span>
//                         <select onchange="ham_7b_23_doi_sort_cham_bai(this.value)" style="flex: 1; padding: 4px 8px; border-radius: 4px; border: 1px solid #ced4da; font-size: 12px; outline: none; cursor: pointer; background: white;">
//                             <!-- 🌟 Đổi vị trí thẻ Mặc định xuống cho kiểu Theo Tên -->
//                             <option value="ten" ${tieuChi === 'ten' ? 'selected' : ''}>Mặc định (Theo Tên A - Z)</option>
//                             <option value="stt" ${tieuChi === 'stt' ? 'selected' : ''}>Theo Họ và Tên</option>
//                             <option value="diem_desc" ${tieuChi === 'diem_desc' ? 'selected' : ''}>Theo Điểm (Cao -> Thấp)</option>
//                             <option value="trang_thai" ${tieuChi === 'trang_thai' ? 'selected' : ''}>Theo Trạng thái & Điểm</option>
//                         </select>
//                     </div>
//                 </div>

//                 <div style="flex: 1; overflow-y: auto; background: #fff;">
//                     ${htmlDanhSachHS}
//                 </div>
//             </div>

//             <div id="thanh-keo-gian-cham-bai" style="width: 8px; background: #e9ecef; cursor: col-resize; z-index: 50; display: flex; flex-direction: column; justify-content: center; align-items: center; transition: background 0.2s;" onmouseover="this.style.background='#17a2b8'" onmouseout="this.style.background='#e9ecef'">
//                 <div style="color: #6c757d; font-size: 14px; user-select: none;">⋮</div>
//                 <div style="color: #6c757d; font-size: 14px; user-select: none;">⋮</div>
//                 <div style="color: #6c757d; font-size: 14px; user-select: none;">⋮</div>
//             </div>

//             <div id="khung-cham-bai-phai" style="flex: 1; display: flex; flex-direction: column; background: #f4f6f9; border-radius: 0 8px 8px 0; overflow: hidden;">
//                 <div style="flex: 1; display: flex; justify-content: center; align-items: center; color: #888; flex-direction: column;">
//                     <div style="font-size: 40px; margin-bottom: 15px;">👈</div>
//                     <h3>Hãy chọn một học sinh bên danh sách để bắt đầu chấm bài</h3>
//                 </div>
//             </div>
//         </div>
//     `;

//     setTimeout(ham_7b_22_kich_hoat_thanh_keo, 100);

//     if (ChamBaiTL_State.uidDangCham) {
//         ham_7b_19_xem_bai_hoc_sinh(ChamBaiTL_State.uidDangCham);
//     }
// };

// =====================================================================
// Hàm 7b.18: Render Khung Giao Diện (Hiển thị nhãn đánh giá tùy chỉnh)
// =====================================================================
window.ham_7b_18_render_layout_tong_cham_bai = function () {
    let htmlDanhSachHS = '';
    let soDaCham = 0;
    let soChoCham = 0;
    let soChuaNop = 0;

    let dsRender = [...ChamBaiTL_State.dsHocSinh];
    const tieuChi = ChamBaiTL_State.tieuChiSort || 'ten';

    const layTenCuoi = (fullName) => {
        if (!fullName) return "";
        const parts = fullName.trim().split(" ");
        return parts[parts.length - 1].toLowerCase();
    };

    const layUuTienTrangThai = (hsUid) => {
        const kq = ChamBaiTL_State.dsKetQua.find(k => k.uid_hoc_sinh === hsUid);
        if (!kq) return 3;
        if (kq.trang_thai_cham === 1) return 1;
        return 2;
    };

    if (tieuChi === 'ten') {
        dsRender.sort((a, b) => layTenCuoi(a?.ten).localeCompare(layTenCuoi(b?.ten)));
    } else if (tieuChi === 'diem_desc') {
        dsRender.sort((a, b) => {
            const kqA = ChamBaiTL_State.dsKetQua.find(k => k.uid_hoc_sinh === a?.uid);
            const kqB = ChamBaiTL_State.dsKetQua.find(k => k.uid_hoc_sinh === b?.uid);
            const diemA = (kqA && kqA.trang_thai_cham === 1) ? Number(kqA.tong_diem || 0) : -1;
            const diemB = (kqB && kqB.trang_thai_cham === 1) ? Number(kqB.tong_diem || 0) : -1;
            return diemB - diemA;
        });
    } else if (tieuChi === 'trang_thai') {
        dsRender.sort((a, b) => {
            const uuTienA = layUuTienTrangThai(a?.uid);
            const uuTienB = layUuTienTrangThai(b?.uid);
            if (uuTienA !== uuTienB) return uuTienA - uuTienB;
            if (uuTienA === 1) {
                const kqA = ChamBaiTL_State.dsKetQua.find(k => k.uid_hoc_sinh === a?.uid);
                const kqB = ChamBaiTL_State.dsKetQua.find(k => k.uid_hoc_sinh === b?.uid);
                const diemA = Number(kqA?.tong_diem || 0);
                const diemB = Number(kqB?.tong_diem || 0);
                if (diemA !== diemB) return diemB - diemA;
            }
            return layTenCuoi(a?.ten).localeCompare(layTenCuoi(b?.ten));
        });
    } else {
        dsRender.sort((a, b) => (a?.ten || "").localeCompare(b?.ten || ""));
    }

    dsRender.forEach((hs, index) => {
        if (!hs || !hs.uid) return;

        const baiNop = ChamBaiTL_State.dsKetQua.find(kq => kq.uid_hoc_sinh === hs.uid);
        let phanHienThiPhai = '';

        if (!baiNop) {
            phanHienThiPhai = `<span style="font-size: 11px; font-weight: bold; color: #dc3545; background: #ffe3e6; padding: 4px 8px; border-radius: 4px;">Chưa nộp</span>`;
            soChuaNop++;
        } else if (baiNop.trang_thai_cham === 1) {

            // 🌟 XỬ LÝ HIỂN THỊ ĐÁNH GIÁ
            let chiTiet = typeof baiNop.chi_tiet_lam_bai === 'string' ? JSON.parse(baiNop.chi_tiet_lam_bai || '{}') : (baiNop.chi_tiet_lam_bai || {});
            let htmlDanhGia = '';

            if (chiTiet.danh_gia_chu === 'Tốt') htmlDanhGia = `<span style="font-size:11px; background:#17a2b8; color:white; padding:2px 6px; border-radius:12px; margin-left:4px; font-weight:bold;">Tốt</span>`;
            else if (chiTiet.danh_gia_chu === 'Đạt') htmlDanhGia = `<span style="font-size:11px; background:#28a745; color:white; padding:2px 6px; border-radius:12px; margin-left:4px; font-weight:bold;">Đạt</span>`;
            else if (chiTiet.danh_gia_chu === 'Chưa Đạt') htmlDanhGia = `<span style="font-size:11px; background:#dc3545; color:white; padding:2px 6px; border-radius:12px; margin-left:4px; font-weight:bold;">Chưa Đạt</span>`;
            else if (chiTiet.danh_gia_chu) htmlDanhGia = `<span style="font-size:11px; background:#6c757d; color:white; padding:2px 6px; border-radius:12px; margin-left:4px; font-weight:bold; max-width:60px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="${chiTiet.danh_gia_chu}">${chiTiet.danh_gia_chu}</span>`; // Hiển thị chữ tùy chỉnh

            let htmlDiem = (baiNop.tong_diem !== null && baiNop.tong_diem !== undefined) ? `<span style="font-size: 16px; font-weight: 900; color: #28a745;">${baiNop.tong_diem} <span style="font-size:11px; font-weight:bold;">đ</span></span>` : '';

            if (!htmlDiem && htmlDanhGia) {
                phanHienThiPhai = `<div style="display: flex; align-items: center;">${htmlDanhGia}</div>`;
            } else {
                phanHienThiPhai = `<div style="display: flex; align-items: center;">${htmlDiem} ${htmlDanhGia}</div>`;
            }
            soDaCham++;
        } else {
            phanHienThiPhai = `<span style="font-size: 11px; font-weight: bold; color: #d35400; background: #ffe8d6; padding: 4px 8px; border-radius: 4px;">Chờ chấm</span>`;
            soChoCham++;
        }

        let tenHienThi = hs.ten || 'Chưa cập nhật';

        htmlDanhSachHS += `
            <div onclick="ham_7b_19_xem_bai_hoc_sinh('${hs.uid}')" id="hs_card_${hs.uid}" class="cham-bai-hs-card ${ChamBaiTL_State.uidDangCham === hs.uid ? 'active' : ''}" style="padding: 10px 15px; border-bottom: 1px solid #eee; cursor: pointer; display: flex; justify-content: space-between; align-items: center; transition: 0.2s; gap: 10px;">
                <div style="font-weight: bold; font-size: 13px; color: #333; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; flex: 1;" title="${tenHienThi}">
                    ${index + 1}. ${tenHienThi}
                </div>
                <div style="white-space: nowrap; display: flex; align-items: center;">
                    ${phanHienThiPhai}
                </div>
            </div>
        `;
    });

    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
    vungLamViec.innerHTML = `
        <style>
            .cham-bai-hs-card:hover { background: #f8f9fa; }
            .cham-bai-hs-card.active { background: #e8f4fd; border-left: 4px solid #0056b3; }
        </style>
        <div id="container-cham-bai-tong" style="max-width: 1300px; margin: 0 auto; background: white; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); display: flex; height: 85vh; overflow: hidden;">
            
            <div id="cot-trai-cham-bai" style="width: 330px; min-width: 250px; max-width: 600px; border-right: 1px solid #dee2e6; display: flex; flex-direction: column; flex-shrink: 0;">
                <div style="padding: 15px; background: #f8f9fa; border-bottom: 1px solid #dee2e6; border-radius: 8px 0 0 0;">
                    <button onclick="ham_7b_1_ve_quan_ly_nhiem_vu_tu_luan()" style="padding: 6px 12px; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight:bold; margin-bottom: 10px; width: 100%;">⬅️ Quay lại DS Nhiệm vụ</button>
                    <h4 style="margin: 0 0 5px 0; color: #0056b3; font-size: 15px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${ChamBaiTL_State.tenNV}">📝 ${ChamBaiTL_State.tenNV}</h4>
                    
                    <div style="font-size: 12px; color: #666; margin-bottom: 10px;">
                        Tiến độ: 
                        <span style="color:#28a745; font-weight:bold;">${soDaCham} đã chấm</span> / 
                        <span style="color:#d35400; font-weight:bold;">${soChoCham} chờ</span> / 
                        <span style="color:#dc3545; font-weight:bold;">${soChuaNop} chưa nộp</span>
                    </div>
                    
                    <div style="display: flex; align-items: center; gap: 8px; border-top: 1px dashed #ccc; padding-top: 10px;">
                        <span style="font-size: 12px; font-weight: bold; color: #495057;">Sắp xếp:</span>
                        <select onchange="ham_7b_23_doi_sort_cham_bai(this.value)" style="flex: 1; padding: 4px 8px; border-radius: 4px; border: 1px solid #ced4da; font-size: 12px; outline: none; cursor: pointer; background: white;">
                            <option value="ten" ${tieuChi === 'ten' ? 'selected' : ''}>Mặc định (Theo Tên A - Z)</option>
                            <option value="stt" ${tieuChi === 'stt' ? 'selected' : ''}>Theo Họ và Tên</option>
                            <option value="diem_desc" ${tieuChi === 'diem_desc' ? 'selected' : ''}>Theo Điểm (Cao -> Thấp)</option>
                            <option value="trang_thai" ${tieuChi === 'trang_thai' ? 'selected' : ''}>Theo Trạng thái & Điểm</option>
                        </select>
                    </div>
                </div>

                <div style="flex: 1; overflow-y: auto; background: #fff;">
                    ${htmlDanhSachHS}
                </div>
            </div>

            <div id="thanh-keo-gian-cham-bai" style="width: 8px; background: #e9ecef; cursor: col-resize; z-index: 50; display: flex; flex-direction: column; justify-content: center; align-items: center; transition: background 0.2s;" onmouseover="this.style.background='#17a2b8'" onmouseout="this.style.background='#e9ecef'">
                <div style="color: #6c757d; font-size: 14px; user-select: none;">⋮</div>
                <div style="color: #6c757d; font-size: 14px; user-select: none;">⋮</div>
                <div style="color: #6c757d; font-size: 14px; user-select: none;">⋮</div>
            </div>

            <div id="khung-cham-bai-phai" style="flex: 1; display: flex; flex-direction: column; background: #f4f6f9; border-radius: 0 8px 8px 0; overflow: hidden;">
                <div style="flex: 1; display: flex; justify-content: center; align-items: center; color: #888; flex-direction: column;">
                    <div style="font-size: 40px; margin-bottom: 15px;">👈</div>
                    <h3>Hãy chọn một học sinh bên danh sách để bắt đầu chấm bài</h3>
                </div>
            </div>
        </div>
    `;

    setTimeout(ham_7b_22_kich_hoat_thanh_keo, 100);

    if (ChamBaiTL_State.uidDangCham) {
        ham_7b_19_xem_bai_hoc_sinh(ChamBaiTL_State.uidDangCham);
    }
};



// =====================================================================
// // Hàm 7b.19: Xem bài và hiện Form chấm của 1 học sinh (Đã tô màu tên học sinh đẹp hơn)
// // =====================================================================
// window.ham_7b_19_xem_bai_hoc_sinh = function (uidHocSinh) {
//     ChamBaiTL_State.uidDangCham = uidHocSinh;

//     // Highlight card đang chọn
//     document.querySelectorAll('.cham-bai-hs-card').forEach(el => el.classList.remove('active'));
//     const cardActive = document.getElementById('hs_card_' + uidHocSinh);
//     if (cardActive) cardActive.classList.add('active');

//     const hs = ChamBaiTL_State.dsHocSinh.find(h => h.uid === uidHocSinh);
//     const kq = ChamBaiTL_State.dsKetQua.find(k => k.uid_hoc_sinh === uidHocSinh);
//     const khungPhai = document.getElementById('khung-cham-bai-phai');

//     if (!kq) {
//         khungPhai.innerHTML = `
//             <div style="padding: 20px; background: white; border-bottom: 1px solid #ddd;">
//                 <h3 style="margin: 0; color: #1a73e8; font-size: 20px;">👤 ${hs.ten}</h3>
//             </div>
//             <div style="flex: 1; display: flex; justify-content: center; align-items: center; color: #dc3545; font-weight: bold; font-size: 18px;">
//                 ❌ Học sinh này chưa nộp bài!
//             </div>
//         `;
//         return;
//     }

//     // Phân tích bài làm
//     const chiTiet = typeof kq.chi_tiet_lam_bai === 'string' ? JSON.parse(kq.chi_tiet_lam_bai || '{}') : (kq.chi_tiet_lam_bai || {});
//     const dsAnh = chiTiet.danh_sach_link_anh || chiTiet.danh_sach_anh || [];

//     // Dùng Thumbnail API với kích thước lớn (w2000) để tránh bị Google chặn
//     const taoLinkAnhTrucTiep = (url) => {
//         if (!url) return '';
//         if (url.includes('drive.google.com')) {
//             const idMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/);
//             if (idMatch && idMatch[1]) {
//                 return `https://drive.google.com/thumbnail?id=${idMatch[1]}&sz=w2000`;
//             }
//         }
//         return url;
//     };

//     let htmlAnhBaiLam = '';
//     if (dsAnh.length === 0) {
//         htmlAnhBaiLam = `<div style="padding: 20px; text-align:center; color: #888;">Không có ảnh đính kèm.</div>`;
//     } else {
//         dsAnh.forEach((linkGoc, idx) => {
//             const imgId = `img_bai_lam_${idx}`;
//             const linkTrucTiep = taoLinkAnhTrucTiep(linkGoc);

//             if (ChamBaiTL_State.gocXoay[imgId] === undefined) ChamBaiTL_State.gocXoay[imgId] = 0;
//             if (ChamBaiTL_State.mucZoom[imgId] === undefined) ChamBaiTL_State.mucZoom[imgId] = 1;

//             htmlAnhBaiLam += `
//                 <div style="margin-bottom: 25px; border: 2px solid #ddd; background: white; box-shadow: 0 4px 8px rgba(0,0,0,0.2); border-radius: 8px; overflow: hidden;">
//                     <div style="background: #e9ecef; padding: 8px 15px; border-bottom: 1px solid #ddd; display: flex; justify-content: space-between; align-items: center;">
//                         <span style="font-weight: bold; color: #495057;">Trang ${idx + 1}</span>
//                         <div style="display: flex; gap: 8px;">
//                             <a href="${linkGoc}" target="_blank" style="padding: 4px 8px; cursor: pointer; border:1px solid #007bff; border-radius:4px; background:#e7f1ff; color:#007bff; text-decoration:none; font-size:12px; font-weight:bold; display:flex; align-items:center;">Mở Tab Mới</a>
//                             <button onclick="ham_7b_21_dieu_chinh_anh('${imgId}', 'xoay_trai')" title="Xoay Trái" style="padding: 4px 8px; cursor: pointer; border:1px solid #ccc; border-radius:4px; background:white;">↺ Xoay Trái</button>
//                             <button onclick="ham_7b_21_dieu_chinh_anh('${imgId}', 'xoay_phai')" title="Xoay Phải" style="padding: 4px 8px; cursor: pointer; border:1px solid #ccc; border-radius:4px; background:white;">↻ Xoay Phải</button>
//                             <button onclick="ham_7b_21_dieu_chinh_anh('${imgId}', 'zoom_in')" title="Phóng to" style="padding: 4px 8px; cursor: pointer; border:1px solid #ccc; border-radius:4px; background:white;">➕ To</button>
//                             <button onclick="ham_7b_21_dieu_chinh_anh('${imgId}', 'zoom_out')" title="Thu nhỏ" style="padding: 4px 8px; cursor: pointer; border:1px solid #ccc; border-radius:4px; background:white;">➖ Nhỏ</button>
//                             <button onclick="ham_7b_21_dieu_chinh_anh('${imgId}', 'reset')" title="Khôi phục" style="padding: 4px 8px; cursor: pointer; border:1px solid #ccc; border-radius:4px; background:#ffc107; font-weight:bold;">Khôi phục</button>
//                         </div>
//                     </div>
                    
//                     <div style="width: 100%; height: 550px; min-height: 200px; resize: vertical; overflow: auto; padding: 20px; box-sizing: border-box; background: #525659; border-bottom: 3px solid #ccc;">
//                         <img id="${imgId}" src="${linkTrucTiep}" alt="Bài làm trang ${idx + 1}" style="max-width: 100%; transition: transform 0.3s ease; transform-origin: top center; display: block; margin: 0 auto;" 
//                              onerror="this.onerror=null; this.parentElement.innerHTML='<div style=\\'color:white; padding:20px; text-align:center;\\'>⚠️ File không phải định dạng ảnh hoặc thư mục Drive chưa được bật quyền công khai. <br><br>Hãy bấm <b>[Mở Tab Mới]</b> để xem.</div>';">
//                     </div>
                    
//                     <div style="text-align:center; background:#e9ecef; font-size:11px; color:#6c757d; padding:3px;">
//                         ↕️ Có thể kéo rê viền xám bên trên để mở rộng khung ảnh
//                     </div>
//                 </div>
//             `;
//         });
//     }

//     // Render form chấm
//     const thoiGianNop = kq.thoi_gian_nop ? new Date(kq.thoi_gian_nop).toLocaleString('vi-VN') : 'Không rõ';
//     const luotNop = chiTiet.luot_nop || 1;

//     // Xử lý an toàn nếu kq.diem bị undefined
//     const diemHienThi = (kq.tong_diem !== null && kq.tong_diem !== undefined) ? kq.tong_diem : '';

//     khungPhai.innerHTML = `
//         <div style="padding: 15px 20px; background: white; border-bottom: 1px solid #ddd; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 4px rgba(0,0,0,0.02); z-index: 10;">
//             <div>
//                 <h3 style="margin: 0 0 5px 0; color: #1a73e8; font-size: 20px;">👤 ${hs.ten}</h3>
//                 <div style="font-size: 12px; color: #666;">Nộp lúc: <b>${thoiGianNop}</b> (Làm bài lần ${luotNop})</div>
//             </div>
//             ${kq.trang_thai_cham === 1 ? `<div style="background:#28a745; color:white; padding:5px 10px; border-radius:4px; font-weight:bold; font-size:12px;">✅ Đã chấm</div>` : ''}
//         </div>

//         <div style="flex: 1; overflow-y: auto; padding: 20px; background: #e9ecef;">
//             ${htmlAnhBaiLam}
//         </div>

//         <div style="padding: 15px 20px; background: white; border-top: 1px solid #ddd; box-shadow: 0 -2px 10px rgba(0,0,0,0.05); z-index: 10;">
//             <div style="display: flex; gap: 15px; align-items: flex-start;">
//                 <div style="width: 120px;">
//                     <label style="font-weight: bold; color: #dc3545; font-size: 13px; display: block; margin-bottom: 5px;">Điểm số:</label>
//                     <input type="number" id="diem_tu_luan_gv" value="${diemHienThi}" step="0.25" min="0" max="100" placeholder="VD: 8.5" style="width: 100%; padding: 10px; font-size: 18px; font-weight: bold; border: 2px solid #ffc107; border-radius: 6px; text-align: center; color: #dc3545; box-sizing: border-box;">
//                 </div>
                
//                 <div style="flex: 1;">
//                     <label style="font-weight: bold; color: #0056b3; font-size: 13px; display: block; margin-bottom: 5px;">Lời phê / Nhận xét:</label>
//                     <textarea id="nhan_xet_tu_luan_gv" placeholder="Nhập nhận xét cho học sinh..." style="width: 100%; padding: 10px; font-size: 14px; border: 1px solid #ced4da; border-radius: 6px; resize: none; height: 46px; box-sizing: border-box;">${kq.nhan_xet_gv || ''}</textarea>
//                 </div>
                
//                 <div style="padding-top: 24px;">
//                     <button onclick="ham_7b_20_luu_diem_tu_luan('${kq.id}')" style="padding: 10px 25px; height: 46px; background: #28a745; color: white; border: none; border-radius: 6px; font-size: 15px; font-weight: bold; cursor: pointer; box-shadow: 0 4px 6px rgba(40,167,69,0.3); transition: 0.2s;" onmouseover="this.style.background='#218838'" onmouseout="this.style.background='#28a745'">
//                         💾 LƯU ĐIỂM
//                     </button>
//                 </div>
//             </div>
//         </div>
//     `;
// };



// // =====================================================================
// // Hàm 7b.19: Xem bài và hiện Form chấm của 1 học sinh (Đã Fix Tâm Xoay)
// // =====================================================================
// window.ham_7b_19_xem_bai_hoc_sinh = function (uidHocSinh) {
//     ChamBaiTL_State.uidDangCham = uidHocSinh;

//     // Highlight card đang chọn
//     document.querySelectorAll('.cham-bai-hs-card').forEach(el => el.classList.remove('active'));
//     const cardActive = document.getElementById('hs_card_' + uidHocSinh);
//     if (cardActive) cardActive.classList.add('active');

//     const hs = ChamBaiTL_State.dsHocSinh.find(h => h.uid === uidHocSinh);
//     const kq = ChamBaiTL_State.dsKetQua.find(k => k.uid_hoc_sinh === uidHocSinh);
//     const khungPhai = document.getElementById('khung-cham-bai-phai');

//     if (!kq) {
//         khungPhai.innerHTML = `
//             <div style="padding: 20px; background: white; border-bottom: 1px solid #ddd;">
//                 <h3 style="margin: 0; color: #1a73e8; font-size: 20px;">👤 ${hs.ten}</h3>
//             </div>
//             <div style="flex: 1; display: flex; justify-content: center; align-items: center; color: #dc3545; font-weight: bold; font-size: 18px;">
//                 ❌ Học sinh này chưa nộp bài!
//             </div>
//         `;
//         return;
//     }

//     // Phân tích bài làm
//     const chiTiet = typeof kq.chi_tiet_lam_bai === 'string' ? JSON.parse(kq.chi_tiet_lam_bai || '{}') : (kq.chi_tiet_lam_bai || {});
//     const dsAnh = chiTiet.danh_sach_link_anh || chiTiet.danh_sach_anh || [];

//     // Dùng Thumbnail API với kích thước lớn (w2000) để tránh bị Google chặn
//     const taoLinkAnhTrucTiep = (url) => {
//         if (!url) return '';
//         if (url.includes('drive.google.com')) {
//             const idMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/);
//             if (idMatch && idMatch[1]) {
//                 return `https://drive.google.com/thumbnail?id=${idMatch[1]}&sz=w2000`;
//             }
//         }
//         return url;
//     };

//     let htmlAnhBaiLam = '';
//     if (dsAnh.length === 0) {
//         htmlAnhBaiLam = `<div style="padding: 20px; text-align:center; color: #888;">Không có ảnh đính kèm.</div>`;
//     } else {
//         dsAnh.forEach((linkGoc, idx) => {
//             const imgId = `img_bai_lam_${idx}`;
//             const linkTrucTiep = taoLinkAnhTrucTiep(linkGoc);

//             if (ChamBaiTL_State.gocXoay[imgId] === undefined) ChamBaiTL_State.gocXoay[imgId] = 0;
//             if (ChamBaiTL_State.mucZoom[imgId] === undefined) ChamBaiTL_State.mucZoom[imgId] = 1;

//             htmlAnhBaiLam += `
//                 <div style="margin-bottom: 25px; border: 2px solid #ddd; background: white; box-shadow: 0 4px 8px rgba(0,0,0,0.2); border-radius: 8px; overflow: hidden;">
//                     <div style="background: #e9ecef; padding: 8px 15px; border-bottom: 1px solid #ddd; display: flex; justify-content: space-between; align-items: center;">
//                         <span style="font-weight: bold; color: #495057;">Trang ${idx + 1}</span>
//                         <div style="display: flex; gap: 8px;">
//                             <a href="${linkGoc}" target="_blank" style="padding: 4px 8px; cursor: pointer; border:1px solid #007bff; border-radius:4px; background:#e7f1ff; color:#007bff; text-decoration:none; font-size:12px; font-weight:bold; display:flex; align-items:center;">Mở Tab Mới</a>
//                             <button onclick="ham_7b_21_dieu_chinh_anh('${imgId}', 'xoay_trai')" title="Xoay Trái" style="padding: 4px 8px; cursor: pointer; border:1px solid #ccc; border-radius:4px; background:white;">↺ Xoay Trái</button>
//                             <button onclick="ham_7b_21_dieu_chinh_anh('${imgId}', 'xoay_phai')" title="Xoay Phải" style="padding: 4px 8px; cursor: pointer; border:1px solid #ccc; border-radius:4px; background:white;">↻ Xoay Phải</button>
//                             <button onclick="ham_7b_21_dieu_chinh_anh('${imgId}', 'zoom_in')" title="Phóng to" style="padding: 4px 8px; cursor: pointer; border:1px solid #ccc; border-radius:4px; background:white;">➕ To</button>
//                             <button onclick="ham_7b_21_dieu_chinh_anh('${imgId}', 'zoom_out')" title="Thu nhỏ" style="padding: 4px 8px; cursor: pointer; border:1px solid #ccc; border-radius:4px; background:white;">➖ Nhỏ</button>
//                             <button onclick="ham_7b_21_dieu_chinh_anh('${imgId}', 'reset')" title="Khôi phục" style="padding: 4px 8px; cursor: pointer; border:1px solid #ccc; border-radius:4px; background:#ffc107; font-weight:bold;">Khôi phục</button>
//                         </div>
//                     </div>
                    
//                     <!-- 🌟 FIX: Thay đổi CSS để neo tâm ảnh vào giữa khung chứa (Flex Center) -->
//                     <div style="width: 100%; height: 550px; min-height: 200px; resize: vertical; overflow: auto; padding: 20px; box-sizing: border-box; background: #525659; border-bottom: 3px solid #ccc; display: flex; align-items: center; justify-content: center;">
//                         <!-- 🌟 FIX: Đổi transform-origin thành center, thêm max-height: 100% -->
//                         <img id="${imgId}" src="${linkTrucTiep}" alt="Bài làm trang ${idx + 1}" style="max-width: 100%; max-height: 100%; transition: transform 0.3s ease; transform-origin: center; display: block; margin: 0 auto;" 
//                              onerror="this.onerror=null; this.parentElement.innerHTML='<div style=\\'color:white; padding:20px; text-align:center;\\'>⚠️ File không phải định dạng ảnh hoặc thư mục Drive chưa được bật quyền công khai. <br><br>Hãy bấm <b>[Mở Tab Mới]</b> để xem.</div>';">
//                     </div>
                    
//                     <div style="text-align:center; background:#e9ecef; font-size:11px; color:#6c757d; padding:3px;">
//                         ↕️ Có thể kéo rê viền xám bên trên để mở rộng khung ảnh
//                     </div>
//                 </div>
//             `;
//         });
//     }

//     // Render form chấm
//     const thoiGianNop = kq.thoi_gian_nop ? new Date(kq.thoi_gian_nop).toLocaleString('vi-VN') : 'Không rõ';
//     const luotNop = chiTiet.luot_nop || 1;

//     // Xử lý an toàn nếu kq.diem bị undefined
//     const diemHienThi = (kq.tong_diem !== null && kq.tong_diem !== undefined) ? kq.tong_diem : '';

//     khungPhai.innerHTML = `
//         <div style="padding: 15px 20px; background: white; border-bottom: 1px solid #ddd; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 4px rgba(0,0,0,0.02); z-index: 10;">
//             <div>
//                 <h3 style="margin: 0 0 5px 0; color: #1a73e8; font-size: 20px;">👤 ${hs.ten}</h3>
//                 <div style="font-size: 12px; color: #666;">Nộp lúc: <b>${thoiGianNop}</b> (Làm bài lần ${luotNop})</div>
//             </div>
//             ${kq.trang_thai_cham === 1 ? `<div style="background:#28a745; color:white; padding:5px 10px; border-radius:4px; font-weight:bold; font-size:12px;">✅ Đã chấm</div>` : ''}
//         </div>

//         <div style="flex: 1; overflow-y: auto; padding: 20px; background: #e9ecef;">
//             ${htmlAnhBaiLam}
//         </div>

//         <div style="padding: 15px 20px; background: white; border-top: 1px solid #ddd; box-shadow: 0 -2px 10px rgba(0,0,0,0.05); z-index: 10;">
//             <div style="display: flex; gap: 15px; align-items: flex-start;">
//                 <div style="width: 120px;">
//                     <label style="font-weight: bold; color: #dc3545; font-size: 13px; display: block; margin-bottom: 5px;">Điểm số:</label>
//                     <input type="number" id="diem_tu_luan_gv" value="${diemHienThi}" step="0.25" min="0" max="100" placeholder="VD: 8.5" style="width: 100%; padding: 10px; font-size: 18px; font-weight: bold; border: 2px solid #ffc107; border-radius: 6px; text-align: center; color: #dc3545; box-sizing: border-box;">
//                 </div>
                
//                 <div style="flex: 1;">
//                     <label style="font-weight: bold; color: #0056b3; font-size: 13px; display: block; margin-bottom: 5px;">Lời phê / Nhận xét:</label>
//                     <textarea id="nhan_xet_tu_luan_gv" placeholder="Nhập nhận xét cho học sinh..." style="width: 100%; padding: 10px; font-size: 14px; border: 1px solid #ced4da; border-radius: 6px; resize: none; height: 46px; box-sizing: border-box;">${kq.nhan_xet_gv || ''}</textarea>
//                 </div>
                
//                 <div style="padding-top: 24px;">
//                     <button onclick="ham_7b_20_luu_diem_tu_luan('${kq.id}')" style="padding: 10px 25px; height: 46px; background: #28a745; color: white; border: none; border-radius: 6px; font-size: 15px; font-weight: bold; cursor: pointer; box-shadow: 0 4px 6px rgba(40,167,69,0.3); transition: 0.2s;" onmouseover="this.style.background='#218838'" onmouseout="this.style.background='#28a745'">
//                         💾 LƯU ĐIỂM
//                     </button>
//                 </div>
//             </div>
//         </div>
//     `;
// };

// // =====================================================================
// // Hàm 7b.19: Xem bài và hiện Form chấm của 1 học sinh (CÓ ĐỌC CẤU HÌNH LƯU HƯỚNG)
// // =====================================================================
// window.ham_7b_19_xem_bai_hoc_sinh = function (uidHocSinh) {
//     ChamBaiTL_State.uidDangCham = uidHocSinh;

//     // 🌟 RẤT QUAN TRỌNG: Xóa trắng bộ nhớ góc xoay của học sinh trước để không bị dính chéo
//     ChamBaiTL_State.gocXoay = {};
//     ChamBaiTL_State.mucZoom = {};

//     // Highlight card đang chọn
//     document.querySelectorAll('.cham-bai-hs-card').forEach(el => el.classList.remove('active'));
//     const cardActive = document.getElementById('hs_card_' + uidHocSinh);
//     if (cardActive) cardActive.classList.add('active');

//     const hs = ChamBaiTL_State.dsHocSinh.find(h => h.uid === uidHocSinh);
//     const kq = ChamBaiTL_State.dsKetQua.find(k => k.uid_hoc_sinh === uidHocSinh);
//     const khungPhai = document.getElementById('khung-cham-bai-phai');

//     if (!kq) {
//         khungPhai.innerHTML = `
//             <div style="padding: 20px; background: white; border-bottom: 1px solid #ddd;">
//                 <h3 style="margin: 0; color: #1a73e8; font-size: 20px;">👤 ${hs.ten}</h3>
//             </div>
//             <div style="flex: 1; display: flex; justify-content: center; align-items: center; color: #dc3545; font-weight: bold; font-size: 18px;">
//                 ❌ Học sinh này chưa nộp bài!
//             </div>
//         `;
//         return;
//     }

//     // Phân tích bài làm và Cấu hình đã lưu
//     const chiTiet = typeof kq.chi_tiet_lam_bai === 'string' ? JSON.parse(kq.chi_tiet_lam_bai || '{}') : (kq.chi_tiet_lam_bai || {});
//     const dsAnh = chiTiet.danh_sach_link_anh || chiTiet.danh_sach_anh || [];
//     const cauHinhAnhLuuTru = chiTiet.cau_hinh_anh || {}; // Đọc cấu hình xoay/zoom từ DB

//     const taoLinkAnhTrucTiep = (url) => {
//         if (!url) return '';
//         if (url.includes('drive.google.com')) {
//             const idMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/);
//             if (idMatch && idMatch[1]) {
//                 return `https://drive.google.com/thumbnail?id=${idMatch[1]}&sz=w2000`;
//             }
//         }
//         return url;
//     };

//     let htmlAnhBaiLam = '';
//     if (dsAnh.length === 0) {
//         htmlAnhBaiLam = `<div style="padding: 20px; text-align:center; color: #888;">Không có ảnh đính kèm.</div>`;
//     } else {
//         dsAnh.forEach((linkGoc, idx) => {
//             const imgId = `img_bai_lam_${idx}`;
//             const linkTrucTiep = taoLinkAnhTrucTiep(linkGoc);

//             // 🌟 Nạp cấu hình xoay/zoom cũ vào RAM (Nếu có)
//             ChamBaiTL_State.gocXoay[imgId] = cauHinhAnhLuuTru[imgId]?.gocXoay || 0;
//             ChamBaiTL_State.mucZoom[imgId] = cauHinhAnhLuuTru[imgId]?.mucZoom || 1;

//             // 🌟 Áp dụng CSS Transform ngay lập tức khi mở ảnh
//             const cssTransform = `transform: scale(${ChamBaiTL_State.mucZoom[imgId]}) rotate(${ChamBaiTL_State.gocXoay[imgId]}deg);`;

//             htmlAnhBaiLam += `
//                 <div style="margin-bottom: 25px; border: 2px solid #ddd; background: white; box-shadow: 0 4px 8px rgba(0,0,0,0.2); border-radius: 8px; overflow: hidden;">
//                     <div style="background: #e9ecef; padding: 8px 15px; border-bottom: 1px solid #ddd; display: flex; justify-content: space-between; align-items: center;">
//                         <span style="font-weight: bold; color: #495057;">Trang ${idx + 1}</span>
//                         <div style="display: flex; gap: 8px;">
//                             <a href="${linkGoc}" target="_blank" style="padding: 4px 8px; cursor: pointer; border:1px solid #007bff; border-radius:4px; background:#e7f1ff; color:#007bff; text-decoration:none; font-size:12px; font-weight:bold; display:flex; align-items:center;">Mở Tab Mới</a>
//                             <button onclick="ham_7b_21_dieu_chinh_anh('${imgId}', 'xoay_trai')" title="Xoay Trái" style="padding: 4px 8px; cursor: pointer; border:1px solid #ccc; border-radius:4px; background:white;">↺ Xoay Trái</button>
//                             <button onclick="ham_7b_21_dieu_chinh_anh('${imgId}', 'xoay_phai')" title="Xoay Phải" style="padding: 4px 8px; cursor: pointer; border:1px solid #ccc; border-radius:4px; background:white;">↻ Xoay Phải</button>
//                             <button onclick="ham_7b_21_dieu_chinh_anh('${imgId}', 'zoom_in')" title="Phóng to" style="padding: 4px 8px; cursor: pointer; border:1px solid #ccc; border-radius:4px; background:white;">➕ To</button>
//                             <button onclick="ham_7b_21_dieu_chinh_anh('${imgId}', 'zoom_out')" title="Thu nhỏ" style="padding: 4px 8px; cursor: pointer; border:1px solid #ccc; border-radius:4px; background:white;">➖ Nhỏ</button>
//                             <button onclick="ham_7b_21_dieu_chinh_anh('${imgId}', 'reset')" title="Khôi phục" style="padding: 4px 8px; cursor: pointer; border:1px solid #ccc; border-radius:4px; background:#ffc107; font-weight:bold;">Khôi phục</button>
//                             <!-- 🌟 NÚT LƯU HƯỚNG MỚI THÊM -->
//                             <button onclick="ham_7b_24_luu_cau_hinh_anh('${kq.id}', this)" title="Lưu góc xoay & độ phóng to cho lần mở sau" style="padding: 4px 8px; cursor: pointer; border:1px solid #28a745; border-radius:4px; background:#d4edda; color:#155724; font-weight:bold; margin-left:10px; box-shadow:0 1px 2px rgba(0,0,0,0.1);">💾 Lưu Hướng</button>
//                         </div>
//                     </div>
                    
//                     <div style="width: 100%; height: 550px; min-height: 200px; resize: vertical; overflow: auto; padding: 20px; box-sizing: border-box; background: #525659; border-bottom: 3px solid #ccc; display: flex; align-items: center; justify-content: center;">
//                         <img id="${imgId}" src="${linkTrucTiep}" alt="Bài làm trang ${idx + 1}" style="max-width: 100%; max-height: 100%; transition: transform 0.3s ease; transform-origin: center; display: block; margin: 0 auto; ${cssTransform}" 
//                              onerror="this.onerror=null; this.parentElement.innerHTML='<div style=\\'color:white; padding:20px; text-align:center;\\'>⚠️ File không phải định dạng ảnh hoặc thư mục Drive chưa được bật quyền công khai. <br><br>Hãy bấm <b>[Mở Tab Mới]</b> để xem.</div>';">
//                     </div>
                    
//                     <div style="text-align:center; background:#e9ecef; font-size:11px; color:#6c757d; padding:3px;">
//                         ↕️ Có thể kéo rê viền xám bên trên để mở rộng khung ảnh
//                     </div>
//                 </div>
//             `;
//         });
//     }

//     const thoiGianNop = kq.thoi_gian_nop ? new Date(kq.thoi_gian_nop).toLocaleString('vi-VN') : 'Không rõ';
//     const luotNop = chiTiet.luot_nop || 1;
//     const diemHienThi = (kq.tong_diem !== null && kq.tong_diem !== undefined) ? kq.tong_diem : '';

//     khungPhai.innerHTML = `
//         <div style="padding: 15px 20px; background: white; border-bottom: 1px solid #ddd; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 4px rgba(0,0,0,0.02); z-index: 10;">
//             <div>
//                 <h3 style="margin: 0 0 5px 0; color: #1a73e8; font-size: 20px;">👤 ${hs.ten}</h3>
//                 <div style="font-size: 12px; color: #666;">Nộp lúc: <b>${thoiGianNop}</b> (Làm bài lần ${luotNop})</div>
//             </div>
//             ${kq.trang_thai_cham === 1 ? `<div style="background:#28a745; color:white; padding:5px 10px; border-radius:4px; font-weight:bold; font-size:12px;">✅ Đã chấm</div>` : ''}
//         </div>

//         <div style="flex: 1; overflow-y: auto; padding: 20px; background: #e9ecef;">
//             ${htmlAnhBaiLam}
//         </div>

//         <div style="padding: 15px 20px; background: white; border-top: 1px solid #ddd; box-shadow: 0 -2px 10px rgba(0,0,0,0.05); z-index: 10;">
//             <div style="display: flex; gap: 15px; align-items: flex-start;">
//                 <div style="width: 120px;">
//                     <label style="font-weight: bold; color: #dc3545; font-size: 13px; display: block; margin-bottom: 5px;">Điểm số:</label>
//                     <input type="number" id="diem_tu_luan_gv" value="${diemHienThi}" step="0.25" min="0" max="100" placeholder="VD: 8.5" style="width: 100%; padding: 10px; font-size: 18px; font-weight: bold; border: 2px solid #ffc107; border-radius: 6px; text-align: center; color: #dc3545; box-sizing: border-box;">
//                 </div>
                
//                 <div style="flex: 1;">
//                     <label style="font-weight: bold; color: #0056b3; font-size: 13px; display: block; margin-bottom: 5px;">Lời phê / Nhận xét:</label>
//                     <textarea id="nhan_xet_tu_luan_gv" placeholder="Nhập nhận xét cho học sinh..." style="width: 100%; padding: 10px; font-size: 14px; border: 1px solid #ced4da; border-radius: 6px; resize: none; height: 46px; box-sizing: border-box;">${kq.nhan_xet_gv || ''}</textarea>
//                 </div>
                
//                 <div style="padding-top: 24px;">
//                     <button onclick="ham_7b_20_luu_diem_tu_luan('${kq.id}')" style="padding: 10px 25px; height: 46px; background: #28a745; color: white; border: none; border-radius: 6px; font-size: 15px; font-weight: bold; cursor: pointer; box-shadow: 0 4px 6px rgba(40,167,69,0.3); transition: 0.2s;" onmouseover="this.style.background='#218838'" onmouseout="this.style.background='#28a745'">
//                         💾 LƯU ĐIỂM
//                     </button>
//                 </div>
//             </div>
//         </div>
//     `;
// };

// // =====================================================================
// // Hàm 7b.19: Xem bài và hiện Form chấm của 1 học sinh (CÓ ĐÁNH GIÁ TỐT/ĐẠT/CHƯA ĐẠT)
// // =====================================================================
// window.ham_7b_19_xem_bai_hoc_sinh = function (uidHocSinh) {
//     ChamBaiTL_State.uidDangCham = uidHocSinh;

//     ChamBaiTL_State.gocXoay = {};
//     ChamBaiTL_State.mucZoom = {};

//     document.querySelectorAll('.cham-bai-hs-card').forEach(el => el.classList.remove('active'));
//     const cardActive = document.getElementById('hs_card_' + uidHocSinh);
//     if (cardActive) cardActive.classList.add('active');

//     const hs = ChamBaiTL_State.dsHocSinh.find(h => h.uid === uidHocSinh);
//     const kq = ChamBaiTL_State.dsKetQua.find(k => k.uid_hoc_sinh === uidHocSinh);
//     const khungPhai = document.getElementById('khung-cham-bai-phai');

//     if (!kq) {
//         khungPhai.innerHTML = `
//             <div style="padding: 20px; background: white; border-bottom: 1px solid #ddd;">
//                 <h3 style="margin: 0; color: #1a73e8; font-size: 20px;">👤 ${hs.ten}</h3>
//             </div>
//             <div style="flex: 1; display: flex; justify-content: center; align-items: center; color: #dc3545; font-weight: bold; font-size: 18px;">
//                 ❌ Học sinh này chưa nộp bài!
//             </div>
//         `;
//         return;
//     }

//     const chiTiet = typeof kq.chi_tiet_lam_bai === 'string' ? JSON.parse(kq.chi_tiet_lam_bai || '{}') : (kq.chi_tiet_lam_bai || {});
//     const dsAnh = chiTiet.danh_sach_link_anh || chiTiet.danh_sach_anh || [];
//     const cauHinhAnhLuuTru = chiTiet.cau_hinh_anh || {};
//     const danhGiaHienThi = chiTiet.danh_gia_chu || ''; // 🌟 Lấy đánh giá chữ đã lưu

//     const taoLinkAnhTrucTiep = (url) => {
//         if (!url) return '';
//         if (url.includes('drive.google.com')) {
//             const idMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/);
//             if (idMatch && idMatch[1]) {
//                 return `https://drive.google.com/thumbnail?id=${idMatch[1]}&sz=w2000`;
//             }
//         }
//         return url;
//     };

//     let htmlAnhBaiLam = '';
//     if (dsAnh.length === 0) {
//         htmlAnhBaiLam = `<div style="padding: 20px; text-align:center; color: #888;">Không có ảnh đính kèm.</div>`;
//     } else {
//         dsAnh.forEach((linkGoc, idx) => {
//             const imgId = `img_bai_lam_${idx}`;
//             const linkTrucTiep = taoLinkAnhTrucTiep(linkGoc);

//             ChamBaiTL_State.gocXoay[imgId] = cauHinhAnhLuuTru[imgId]?.gocXoay || 0;
//             ChamBaiTL_State.mucZoom[imgId] = cauHinhAnhLuuTru[imgId]?.mucZoom || 1;
//             const cssTransform = `transform: scale(${ChamBaiTL_State.mucZoom[imgId]}) rotate(${ChamBaiTL_State.gocXoay[imgId]}deg);`;

//             htmlAnhBaiLam += `
//                 <div style="margin-bottom: 25px; border: 2px solid #ddd; background: white; box-shadow: 0 4px 8px rgba(0,0,0,0.2); border-radius: 8px; overflow: hidden;">
//                     <div style="background: #e9ecef; padding: 8px 15px; border-bottom: 1px solid #ddd; display: flex; justify-content: space-between; align-items: center;">
//                         <span style="font-weight: bold; color: #495057;">Trang ${idx + 1}</span>
//                         <div style="display: flex; gap: 8px;">
//                             <a href="${linkGoc}" target="_blank" style="padding: 4px 8px; cursor: pointer; border:1px solid #007bff; border-radius:4px; background:#e7f1ff; color:#007bff; text-decoration:none; font-size:12px; font-weight:bold; display:flex; align-items:center;">Mở Tab Mới</a>
//                             <button onclick="ham_7b_21_dieu_chinh_anh('${imgId}', 'xoay_trai')" title="Xoay Trái" style="padding: 4px 8px; cursor: pointer; border:1px solid #ccc; border-radius:4px; background:white;">↺ Xoay Trái</button>
//                             <button onclick="ham_7b_21_dieu_chinh_anh('${imgId}', 'xoay_phai')" title="Xoay Phải" style="padding: 4px 8px; cursor: pointer; border:1px solid #ccc; border-radius:4px; background:white;">↻ Xoay Phải</button>
//                             <button onclick="ham_7b_21_dieu_chinh_anh('${imgId}', 'zoom_in')" title="Phóng to" style="padding: 4px 8px; cursor: pointer; border:1px solid #ccc; border-radius:4px; background:white;">➕ To</button>
//                             <button onclick="ham_7b_21_dieu_chinh_anh('${imgId}', 'zoom_out')" title="Thu nhỏ" style="padding: 4px 8px; cursor: pointer; border:1px solid #ccc; border-radius:4px; background:white;">➖ Nhỏ</button>
//                             <button onclick="ham_7b_21_dieu_chinh_anh('${imgId}', 'reset')" title="Khôi phục" style="padding: 4px 8px; cursor: pointer; border:1px solid #ccc; border-radius:4px; background:#ffc107; font-weight:bold;">Khôi phục</button>
//                             <button onclick="ham_7b_24_luu_cau_hinh_anh('${kq.id}', this)" title="Lưu góc xoay & độ phóng to" style="padding: 4px 8px; cursor: pointer; border:1px solid #28a745; border-radius:4px; background:#d4edda; color:#155724; font-weight:bold; margin-left:10px; box-shadow:0 1px 2px rgba(0,0,0,0.1);">💾 Lưu Hướng</button>
//                         </div>
//                     </div>
                    
//                     <div style="width: 100%; height: 550px; min-height: 200px; resize: vertical; overflow: auto; padding: 20px; box-sizing: border-box; background: #525659; border-bottom: 3px solid #ccc; display: flex; align-items: center; justify-content: center;">
//                         <img id="${imgId}" src="${linkTrucTiep}" alt="Bài làm trang ${idx + 1}" style="max-width: 100%; max-height: 100%; transition: transform 0.3s ease; transform-origin: center; display: block; margin: 0 auto; ${cssTransform}" 
//                              onerror="this.onerror=null; this.parentElement.innerHTML='<div style=\\'color:white; padding:20px; text-align:center;\\'>⚠️ File không phải định dạng ảnh hoặc chưa công khai. <br><br>Hãy bấm <b>[Mở Tab Mới]</b> để xem.</div>';">
//                     </div>
                    
//                     <div style="text-align:center; background:#e9ecef; font-size:11px; color:#6c757d; padding:3px;">
//                         ↕️ Có thể kéo rê viền xám bên trên để mở rộng khung ảnh
//                     </div>
//                 </div>
//             `;
//         });
//     }

//     const thoiGianNop = kq.thoi_gian_nop ? new Date(kq.thoi_gian_nop).toLocaleString('vi-VN') : 'Không rõ';
//     const luotNop = chiTiet.luot_nop || 1;
//     const diemHienThi = (kq.tong_diem !== null && kq.tong_diem !== undefined) ? kq.tong_diem : '';

//     // 🌟 RENDER FORM CHẤM (THÊM DROP-DOWN ĐÁNH GIÁ)
//     khungPhai.innerHTML = `
//         <div style="padding: 15px 20px; background: white; border-bottom: 1px solid #ddd; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 4px rgba(0,0,0,0.02); z-index: 10;">
//             <div>
//                 <h3 style="margin: 0 0 5px 0; color: #1a73e8; font-size: 20px;">👤 ${hs.ten}</h3>
//                 <div style="font-size: 12px; color: #666;">Nộp lúc: <b>${thoiGianNop}</b> (Làm bài lần ${luotNop})</div>
//             </div>
//             ${kq.trang_thai_cham === 1 ? `<div style="background:#28a745; color:white; padding:5px 10px; border-radius:4px; font-weight:bold; font-size:12px;">✅ Đã chấm</div>` : ''}
//         </div>

//         <div style="flex: 1; overflow-y: auto; padding: 20px; background: #e9ecef;">
//             ${htmlAnhBaiLam}
//         </div>

//         <div style="padding: 15px 20px; background: white; border-top: 1px solid #ddd; box-shadow: 0 -2px 10px rgba(0,0,0,0.05); z-index: 10;">
//             <div style="display: flex; gap: 15px; align-items: flex-start;">
                
//                 <div style="width: 100px;">
//                     <label style="font-weight: bold; color: #dc3545; font-size: 13px; display: block; margin-bottom: 5px;">Điểm số:</label>
//                     <input type="number" id="diem_tu_luan_gv" value="${diemHienThi}" step="0.25" min="0" max="100" placeholder="Trống" style="width: 100%; padding: 10px; font-size: 16px; font-weight: bold; border: 2px solid #ffc107; border-radius: 6px; text-align: center; color: #dc3545; box-sizing: border-box;">
//                 </div>

//                 <div style="width: 140px;">
//                     <label style="font-weight: bold; color: #17a2b8; font-size: 13px; display: block; margin-bottom: 5px;">Đánh giá:</label>
//                     <select id="danh_gia_tu_luan_gv" style="width: 100%; padding: 10px; font-size: 14px; font-weight: bold; border: 2px solid #17a2b8; border-radius: 6px; color: #0056b3; background: #f8f9fa; cursor: pointer; outline: none;">
//                         <option value="" ${danhGiaHienThi === '' ? 'selected' : ''}>-- Không --</option>
//                         <option value="Tốt" ${danhGiaHienThi === 'Tốt' ? 'selected' : ''}>🌟 Tốt</option>
//                         <option value="Đạt" ${danhGiaHienThi === 'Đạt' ? 'selected' : ''}>✅ Đạt</option>
//                         <option value="Chưa Đạt" ${danhGiaHienThi === 'Chưa Đạt' ? 'selected' : ''}>❌ Chưa Đạt</option>
//                     </select>
//                 </div>
                
//                 <div style="flex: 1;">
//                     <label style="font-weight: bold; color: #0056b3; font-size: 13px; display: block; margin-bottom: 5px;">Lời phê / Nhận xét:</label>
//                     <textarea id="nhan_xet_tu_luan_gv" placeholder="Nhập nhận xét cho học sinh..." style="width: 100%; padding: 10px; font-size: 14px; border: 1px solid #ced4da; border-radius: 6px; resize: none; height: 43px; box-sizing: border-box;">${kq.nhan_xet_gv || ''}</textarea>
//                 </div>
                
//                 <div style="padding-top: 23px;">
//                     <button onclick="ham_7b_20_luu_diem_tu_luan('${kq.id}')" style="padding: 10px 25px; height: 43px; background: #28a745; color: white; border: none; border-radius: 6px; font-size: 14px; font-weight: bold; cursor: pointer; box-shadow: 0 4px 6px rgba(40,167,69,0.3); transition: 0.2s;" onmouseover="this.style.background='#218838'" onmouseout="this.style.background='#28a745'">
//                         💾 LƯU CHẤM BÀI
//                     </button>
//                 </div>
//             </div>
//         </div>
//     `;
// };


// // =====================================================================
// // Hàm 7b.19: Xem bài và hiện Form chấm của 1 học sinh (RADIO BUTTON CHẤM NHANH)
// // =====================================================================
// window.ham_7b_19_xem_bai_hoc_sinh = function (uidHocSinh) {
//     ChamBaiTL_State.uidDangCham = uidHocSinh;

//     ChamBaiTL_State.gocXoay = {};
//     ChamBaiTL_State.mucZoom = {};

//     document.querySelectorAll('.cham-bai-hs-card').forEach(el => el.classList.remove('active'));
//     const cardActive = document.getElementById('hs_card_' + uidHocSinh);
//     if (cardActive) cardActive.classList.add('active');

//     const hs = ChamBaiTL_State.dsHocSinh.find(h => h.uid === uidHocSinh);
//     const kq = ChamBaiTL_State.dsKetQua.find(k => k.uid_hoc_sinh === uidHocSinh);
//     const khungPhai = document.getElementById('khung-cham-bai-phai');

//     if (!kq) {
//         khungPhai.innerHTML = `
//             <div style="padding: 20px; background: white; border-bottom: 1px solid #ddd;">
//                 <h3 style="margin: 0; color: #1a73e8; font-size: 20px;">👤 ${hs.ten}</h3>
//             </div>
//             <div style="flex: 1; display: flex; justify-content: center; align-items: center; color: #dc3545; font-weight: bold; font-size: 18px;">
//                 ❌ Học sinh này chưa nộp bài!
//             </div>
//         `;
//         return;
//     }

//     const chiTiet = typeof kq.chi_tiet_lam_bai === 'string' ? JSON.parse(kq.chi_tiet_lam_bai || '{}') : (kq.chi_tiet_lam_bai || {});
//     const dsAnh = chiTiet.danh_sach_link_anh || chiTiet.danh_sach_anh || [];
//     const cauHinhAnhLuuTru = chiTiet.cau_hinh_anh || {};
//     const danhGiaHienThi = chiTiet.danh_gia_chu || ''; // Lấy đánh giá đã lưu

//     const taoLinkAnhTrucTiep = (url) => {
//         if (!url) return '';
//         if (url.includes('drive.google.com')) {
//             const idMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/);
//             if (idMatch && idMatch[1]) {
//                 return `https://drive.google.com/thumbnail?id=${idMatch[1]}&sz=w2000`;
//             }
//         }
//         return url;
//     };

//     let htmlAnhBaiLam = '';
//     if (dsAnh.length === 0) {
//         htmlAnhBaiLam = `<div style="padding: 20px; text-align:center; color: #888;">Không có ảnh đính kèm.</div>`;
//     } else {
//         dsAnh.forEach((linkGoc, idx) => {
//             const imgId = `img_bai_lam_${idx}`;
//             const linkTrucTiep = taoLinkAnhTrucTiep(linkGoc);

//             ChamBaiTL_State.gocXoay[imgId] = cauHinhAnhLuuTru[imgId]?.gocXoay || 0;
//             ChamBaiTL_State.mucZoom[imgId] = cauHinhAnhLuuTru[imgId]?.mucZoom || 1;
//             const cssTransform = `transform: scale(${ChamBaiTL_State.mucZoom[imgId]}) rotate(${ChamBaiTL_State.gocXoay[imgId]}deg);`;

//             htmlAnhBaiLam += `
//                 <div style="margin-bottom: 25px; border: 2px solid #ddd; background: white; box-shadow: 0 4px 8px rgba(0,0,0,0.2); border-radius: 8px; overflow: hidden;">
//                     <div style="background: #e9ecef; padding: 8px 15px; border-bottom: 1px solid #ddd; display: flex; justify-content: space-between; align-items: center;">
//                         <span style="font-weight: bold; color: #495057;">Trang ${idx + 1}</span>
//                         <div style="display: flex; gap: 8px;">
//                             <a href="${linkGoc}" target="_blank" style="padding: 4px 8px; cursor: pointer; border:1px solid #007bff; border-radius:4px; background:#e7f1ff; color:#007bff; text-decoration:none; font-size:12px; font-weight:bold; display:flex; align-items:center;">Mở Tab Mới</a>
//                             <button onclick="ham_7b_21_dieu_chinh_anh('${imgId}', 'xoay_trai')" title="Xoay Trái" style="padding: 4px 8px; cursor: pointer; border:1px solid #ccc; border-radius:4px; background:white;">↺ Xoay Trái</button>
//                             <button onclick="ham_7b_21_dieu_chinh_anh('${imgId}', 'xoay_phai')" title="Xoay Phải" style="padding: 4px 8px; cursor: pointer; border:1px solid #ccc; border-radius:4px; background:white;">↻ Xoay Phải</button>
//                             <button onclick="ham_7b_21_dieu_chinh_anh('${imgId}', 'zoom_in')" title="Phóng to" style="padding: 4px 8px; cursor: pointer; border:1px solid #ccc; border-radius:4px; background:white;">➕ To</button>
//                             <button onclick="ham_7b_21_dieu_chinh_anh('${imgId}', 'zoom_out')" title="Thu nhỏ" style="padding: 4px 8px; cursor: pointer; border:1px solid #ccc; border-radius:4px; background:white;">➖ Nhỏ</button>
//                             <button onclick="ham_7b_21_dieu_chinh_anh('${imgId}', 'reset')" title="Khôi phục" style="padding: 4px 8px; cursor: pointer; border:1px solid #ccc; border-radius:4px; background:#ffc107; font-weight:bold;">Khôi phục</button>
//                             <button onclick="ham_7b_24_luu_cau_hinh_anh('${kq.id}', this)" title="Lưu góc xoay & độ phóng to" style="padding: 4px 8px; cursor: pointer; border:1px solid #28a745; border-radius:4px; background:#d4edda; color:#155724; font-weight:bold; margin-left:10px; box-shadow:0 1px 2px rgba(0,0,0,0.1);">💾 Lưu Hướng</button>
//                         </div>
//                     </div>
                    
//                     <div style="width: 100%; height: 550px; min-height: 200px; resize: vertical; overflow: auto; padding: 20px; box-sizing: border-box; background: #525659; border-bottom: 3px solid #ccc; display: flex; align-items: center; justify-content: center;">
//                         <img id="${imgId}" src="${linkTrucTiep}" alt="Bài làm trang ${idx + 1}" style="max-width: 100%; max-height: 100%; transition: transform 0.3s ease; transform-origin: center; display: block; margin: 0 auto; ${cssTransform}" 
//                              onerror="this.onerror=null; this.parentElement.innerHTML='<div style=\\'color:white; padding:20px; text-align:center;\\'>⚠️ File không phải định dạng ảnh hoặc chưa công khai. <br><br>Hãy bấm <b>[Mở Tab Mới]</b> để xem.</div>';">
//                     </div>
//                 </div>
//             `;
//         });
//     }

//     const thoiGianNop = kq.thoi_gian_nop ? new Date(kq.thoi_gian_nop).toLocaleString('vi-VN') : 'Không rõ';
//     const luotNop = chiTiet.luot_nop || 1;
//     const diemHienThi = (kq.tong_diem !== null && kq.tong_diem !== undefined) ? kq.tong_diem : '';

//     // 🌟 Ktra xem đánh giá hiện tại là mẫu chuẩn hay gõ tay
//     let isMauChuan = ['Tốt', 'Đạt', 'Chưa Đạt', ''].includes(danhGiaHienThi);

//     // 🌟 RENDER FORM CHẤM (THÊM RADIO BUTTONS)
//     khungPhai.innerHTML = `
//         <div style="padding: 15px 20px; background: white; border-bottom: 1px solid #ddd; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 4px rgba(0,0,0,0.02); z-index: 10;">
//             <div>
//                 <h3 style="margin: 0 0 5px 0; color: #1a73e8; font-size: 20px;">👤 ${hs.ten}</h3>
//                 <div style="font-size: 12px; color: #666;">Nộp lúc: <b>${thoiGianNop}</b> (Làm bài lần ${luotNop})</div>
//             </div>
//             ${kq.trang_thai_cham === 1 ? `<div style="background:#28a745; color:white; padding:5px 10px; border-radius:4px; font-weight:bold; font-size:12px;">✅ Đã chấm</div>` : ''}
//         </div>

//         <div style="flex: 1; overflow-y: auto; padding: 20px; background: #e9ecef;">
//             ${htmlAnhBaiLam}
//         </div>

//         <div style="padding: 15px 20px; background: white; border-top: 1px solid #ddd; box-shadow: 0 -2px 10px rgba(0,0,0,0.05); z-index: 10;">
//             <div style="display: flex; gap: 15px; align-items: flex-start;">
                
//                 <div style="width: 100px;">
//                     <label style="font-weight: bold; color: #dc3545; font-size: 13px; display: block; margin-bottom: 5px;">Điểm số:</label>
//                     <input type="number" id="diem_tu_luan_gv" value="${diemHienThi}" step="0.25" min="0" max="100" placeholder="Trống" style="width: 100%; padding: 10px; font-size: 16px; font-weight: bold; border: 2px solid #ffc107; border-radius: 6px; text-align: center; color: #dc3545; box-sizing: border-box;">
//                 </div>

//                 <!-- 🌟 THAY THẾ DROP DOWN BẰNG RADIO BUTTON CHỌN 1 CHẠM -->
//                 <div style="width: 320px;">
//                     <label style="font-weight: bold; color: #17a2b8; font-size: 13px; display: block; margin-bottom: 5px;">Đánh giá nhanh:</label>
//                     <div style="display: flex; gap: 10px; align-items: center; background: #f8f9fa; padding: 6px 10px; border: 1px solid #17a2b8; border-radius: 6px; height: 43px; box-sizing: border-box;">
//                         <label style="cursor: pointer; display: flex; align-items: center; gap: 4px; font-size: 13px; font-weight: bold; color: #17a2b8;">
//                             <input type="radio" name="danh_gia_radio" value="Tốt" ${danhGiaHienThi === 'Tốt' ? 'checked' : ''} style="cursor:pointer;"> Tốt
//                         </label>
//                         <label style="cursor: pointer; display: flex; align-items: center; gap: 4px; font-size: 13px; font-weight: bold; color: #28a745;">
//                             <input type="radio" name="danh_gia_radio" value="Đạt" ${danhGiaHienThi === 'Đạt' ? 'checked' : ''} style="cursor:pointer;"> Đạt
//                         </label>
//                         <label style="cursor: pointer; display: flex; align-items: center; gap: 4px; font-size: 13px; font-weight: bold; color: #dc3545;">
//                             <input type="radio" name="danh_gia_radio" value="Chưa Đạt" ${danhGiaHienThi === 'Chưa Đạt' ? 'checked' : ''} style="cursor:pointer;"> Chưa Đạt
//                         </label>
                        
//                         <div style="width: 1px; height: 20px; background: #ccc; margin: 0 2px;"></div>
                        
//                         <label style="cursor: pointer; display: flex; align-items: center; gap: 4px; font-size: 13px; font-weight: bold; color: #6c757d;">
//                             <input type="radio" name="danh_gia_radio" value="KHAC" id="radio_khac_tl" ${!isMauChuan ? 'checked' : ''} style="cursor:pointer;"> 
//                             <input type="text" id="danh_gia_khac_tl" value="${!isMauChuan ? danhGiaHienThi : ''}" placeholder="Trống / Chữ..." style="width: 80px; padding: 4px 6px; border: 1px solid #ccc; border-radius: 4px; font-size: 12px; outline: none; font-weight:normal;" onfocus="document.getElementById('radio_khac_tl').checked = true;">
//                         </label>
//                     </div>
//                 </div>
                
//                 <div style="flex: 1;">
//                     <label style="font-weight: bold; color: #0056b3; font-size: 13px; display: block; margin-bottom: 5px;">Lời phê / Nhận xét:</label>
//                     <textarea id="nhan_xet_tu_luan_gv" placeholder="Nhập nhận xét cho học sinh..." style="width: 100%; padding: 10px; font-size: 14px; border: 1px solid #ced4da; border-radius: 6px; resize: none; height: 43px; box-sizing: border-box;">${kq.nhan_xet_gv || ''}</textarea>
//                 </div>
                
//                 <div style="padding-top: 23px;">
//                     <button onclick="ham_7b_20_luu_diem_tu_luan('${kq.id}')" style="padding: 10px 25px; height: 43px; background: #28a745; color: white; border: none; border-radius: 6px; font-size: 14px; font-weight: bold; cursor: pointer; box-shadow: 0 4px 6px rgba(40,167,69,0.3); transition: 0.2s;" onmouseover="this.style.background='#218838'" onmouseout="this.style.background='#28a745'">
//                         💾 LƯU CHẤM BÀI
//                     </button>
//                 </div>
//             </div>
//         </div>
//     `;
// };

// // =====================================================================
// // Hàm 7b.19: Xem bài và hiện Form chấm của 1 học sinh (CÓ NÚT CẮT NÉN ẢNH)
// // =====================================================================
// window.ham_7b_19_xem_bai_hoc_sinh = function (uidHocSinh) {
//     ChamBaiTL_State.uidDangCham = uidHocSinh;

//     ChamBaiTL_State.gocXoay = {};
//     ChamBaiTL_State.mucZoom = {};

//     document.querySelectorAll('.cham-bai-hs-card').forEach(el => el.classList.remove('active'));
//     const cardActive = document.getElementById('hs_card_' + uidHocSinh);
//     if (cardActive) cardActive.classList.add('active');

//     const hs = ChamBaiTL_State.dsHocSinh.find(h => h.uid === uidHocSinh);
//     const kq = ChamBaiTL_State.dsKetQua.find(k => k.uid_hoc_sinh === uidHocSinh);
//     const khungPhai = document.getElementById('khung-cham-bai-phai');

//     if (!kq) {
//         khungPhai.innerHTML = `
//             <div style="padding: 20px; background: white; border-bottom: 1px solid #ddd;">
//                 <h3 style="margin: 0; color: #1a73e8; font-size: 20px;">👤 ${hs.ten}</h3>
//             </div>
//             <div style="flex: 1; display: flex; justify-content: center; align-items: center; color: #dc3545; font-weight: bold; font-size: 18px;">
//                 ❌ Học sinh này chưa nộp bài!
//             </div>
//         `;
//         return;
//     }

//     const chiTiet = typeof kq.chi_tiet_lam_bai === 'string' ? JSON.parse(kq.chi_tiet_lam_bai || '{}') : (kq.chi_tiet_lam_bai || {});
//     const dsAnh = chiTiet.danh_sach_link_anh || chiTiet.danh_sach_anh || [];
//     const cauHinhAnhLuuTru = chiTiet.cau_hinh_anh || {};
//     const danhGiaHienThi = chiTiet.danh_gia_chu || '';

//     const taoLinkAnhTrucTiep = (url) => {
//         if (!url) return '';
//         if (url.includes('drive.google.com')) {
//             const idMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/);
//             if (idMatch && idMatch[1]) {
//                 return `https://drive.google.com/thumbnail?id=${idMatch[1]}&sz=w2000`;
//             }
//         }
//         return url;
//     };

//     let htmlAnhBaiLam = '';
//     if (dsAnh.length === 0) {
//         htmlAnhBaiLam = `<div style="padding: 20px; text-align:center; color: #888;">Không có ảnh đính kèm.</div>`;
//     } else {
//         dsAnh.forEach((item, idx) => {
//             const imgId = `img_bai_lam_${idx}`;

//             let linkGoc = typeof item === 'string' ? item : (item.url || item.link);
//             if (!linkGoc) return;

//             let tenFile = item.name || item.ten_file || `Hinh_anh_bai_lam_${idx + 1}.jpg`;
//             let dungLuong = 'Không rõ';

//             if (item.size) {
//                 let sizeNum = parseFloat(item.size);
//                 if (!isNaN(sizeNum)) {
//                     dungLuong = sizeNum > 1024 ? (sizeNum / 1024).toFixed(2) + ' MB' : sizeNum.toFixed(1) + ' KB';
//                 } else {
//                     dungLuong = item.size + (item.size.toString().toLowerCase().includes('b') ? '' : ' KB');
//                 }
//             } else if (item.dung_luong) {
//                 dungLuong = item.dung_luong;
//             }

//             const linkTrucTiep = taoLinkAnhTrucTiep(linkGoc);

//             ChamBaiTL_State.gocXoay[imgId] = cauHinhAnhLuuTru[imgId]?.gocXoay || 0;
//             ChamBaiTL_State.mucZoom[imgId] = cauHinhAnhLuuTru[imgId]?.mucZoom || 1;
//             const cssTransform = `transform: scale(${ChamBaiTL_State.mucZoom[imgId]}) rotate(${ChamBaiTL_State.gocXoay[imgId]}deg);`;

//             htmlAnhBaiLam += `
//                 <div style="margin-bottom: 25px; border: 2px solid #ddd; background: white; box-shadow: 0 4px 8px rgba(0,0,0,0.2); border-radius: 8px; overflow: hidden; display: flex; flex-direction: column;">
                    
//                     <div style="background: #e9ecef; padding: 8px 15px; border-bottom: 1px solid #ddd; display: flex; justify-content: space-between; align-items: center;">
//                         <span style="font-weight: bold; color: #495057;">Trang ${idx + 1}</span>
//                         <div style="display: flex; gap: 8px;">
//                             <a href="${linkGoc}" target="_blank" style="padding: 4px 8px; cursor: pointer; border:1px solid #007bff; border-radius:4px; background:#e7f1ff; color:#007bff; text-decoration:none; font-size:12px; font-weight:bold; display:flex; align-items:center;">Mở Tab Mới</a>
                            
//                             <!-- 🌟 NÚT GỌI KHUNG CẮT NÉN ẢNH -->
//                             <button onclick="ham_7b_25_mo_khung_cat_nen_anh('${linkGoc}', '${kq.id}', ${idx})" title="Cắt và nén ảnh bị quá tải" style="padding: 4px 8px; cursor: pointer; border:1px solid #17a2b8; border-radius:4px; background:#e0f7fa; color:#006064; font-weight:bold; box-shadow:0 1px 2px rgba(0,0,0,0.1);">✂️ Cắt/Nén</button>
                            
//                             <button onclick="ham_7b_21_dieu_chinh_anh('${imgId}', 'xoay_trai')" title="Xoay Trái" style="padding: 4px 8px; cursor: pointer; border:1px solid #ccc; border-radius:4px; background:white;">↺ Xoay Trái</button>
//                             <button onclick="ham_7b_21_dieu_chinh_anh('${imgId}', 'xoay_phai')" title="Xoay Phải" style="padding: 4px 8px; cursor: pointer; border:1px solid #ccc; border-radius:4px; background:white;">↻ Xoay Phải</button>
//                             <button onclick="ham_7b_21_dieu_chinh_anh('${imgId}', 'zoom_in')" title="Phóng to" style="padding: 4px 8px; cursor: pointer; border:1px solid #ccc; border-radius:4px; background:white;">➕ To</button>
//                             <button onclick="ham_7b_21_dieu_chinh_anh('${imgId}', 'zoom_out')" title="Thu nhỏ" style="padding: 4px 8px; cursor: pointer; border:1px solid #ccc; border-radius:4px; background:white;">➖ Nhỏ</button>
//                             <button onclick="ham_7b_21_dieu_chinh_anh('${imgId}', 'reset')" title="Khôi phục" style="padding: 4px 8px; cursor: pointer; border:1px solid #ccc; border-radius:4px; background:#ffc107; font-weight:bold;">Khôi phục</button>
//                             <button onclick="ham_7b_24_luu_cau_hinh_anh('${kq.id}', this)" title="Lưu góc xoay & độ phóng to" style="padding: 4px 8px; cursor: pointer; border:1px solid #28a745; border-radius:4px; background:#d4edda; color:#155724; font-weight:bold; margin-left:5px; box-shadow:0 1px 2px rgba(0,0,0,0.1);">💾 Lưu Hướng</button>
//                         </div>
//                     </div>

//                     <div style="background:#f8f9fa; font-size:12px; color:#495057; padding:8px 15px; border-bottom: 3px solid #ccc; display: flex; justify-content: space-between; align-items: center;">
//                         <div style="display: flex; gap: 20px; align-items: center;">
//                             <span title="${tenFile}" style="max-width: 300px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">📄 <b>Tên file:</b> <span style="color:#0056b3;">${tenFile}</span></span>
//                             <span>💾 <b>Dung lượng:</b> <span style="color:#d35400; font-weight:bold;">${dungLuong}</span></span>
//                             <span>📐 <b>Độ phân giải:</b> <span id="info_dim_${imgId}" style="color:#28a745; font-weight:bold;">Đang quét...</span></span>
//                         </div>
//                     </div>
                    
//                     <div style="width: 100%; height: 500px; min-height: 200px; resize: vertical; overflow: auto; padding: 20px; box-sizing: border-box; background: #525659; display: flex; align-items: center; justify-content: center;">
//                         <!-- 🌟 CẬP NHẬT LỜI NHẮN LỖI -->
//                         <img id="${imgId}" src="${linkTrucTiep}" alt="Bài làm trang ${idx + 1}" style="max-width: 100%; max-height: 100%; transition: transform 0.3s ease; transform-origin: center; display: block; margin: 0 auto; ${cssTransform}" 
//                              onload="let d = document.getElementById('info_dim_${imgId}'); if(d) { d.innerHTML = this.naturalWidth + ' x ' + this.naturalHeight + ' px'; if(this.naturalWidth > 2000 || this.naturalHeight > 2000) d.innerHTML += ' <span style=\\'color:#ffc107; font-weight:bold; background:rgba(0,0,0,0.5); padding:2px 4px; border-radius:4px;\\'>⚠️ Khá Nặng</span>'; }"
//                              onerror="this.onerror=null; this.parentElement.innerHTML='<div style=\\'color:white; padding:20px; text-align:center;\\'>⚠️ File ảnh quá nặng, lỗi định dạng hoặc chưa bật công khai. <br><br>Hãy bấm <b>[Mở Tab Mới]</b> hoặc nút <b>[✂️ Cắt/Nén]</b> ở thanh công cụ phía trên để xử lý.</div>'; document.getElementById('info_dim_${imgId}').innerHTML = 'Lỗi hiển thị';">
//                     </div>
                    
//                     <div style="text-align:center; background:#e9ecef; font-size:11px; color:#6c757d; padding:4px; border-top: 1px solid #ccc;">
//                         ↕️ Kéo rê góc phải bên dưới khung ảnh để mở rộng vùng nhìn
//                     </div>
//                 </div>
//             `;
//         });
//     }

//     const thoiGianNop = kq.thoi_gian_nop ? new Date(kq.thoi_gian_nop).toLocaleString('vi-VN') : 'Không rõ';
//     const luotNop = chiTiet.luot_nop || 1;
//     const diemHienThi = (kq.tong_diem !== null && kq.tong_diem !== undefined) ? kq.tong_diem : '';

//     let isMauChuan = ['Tốt', 'Đạt', 'Chưa Đạt', ''].includes(danhGiaHienThi);

//     khungPhai.innerHTML = `
//         <div style="padding: 15px 20px; background: white; border-bottom: 1px solid #ddd; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 4px rgba(0,0,0,0.02); z-index: 10;">
//             <div>
//                 <h3 style="margin: 0 0 5px 0; color: #1a73e8; font-size: 20px;">👤 ${hs.ten}</h3>
//                 <div style="font-size: 12px; color: #666;">Nộp lúc: <b>${thoiGianNop}</b> (Làm bài lần ${luotNop})</div>
//             </div>
//             ${kq.trang_thai_cham === 1 ? `<div style="background:#28a745; color:white; padding:5px 10px; border-radius:4px; font-weight:bold; font-size:12px;">✅ Đã chấm</div>` : ''}
//         </div>

//         <div style="flex: 1; overflow-y: auto; padding: 20px; background: #e9ecef;">
//             ${htmlAnhBaiLam}
//         </div>

//         <div style="padding: 15px 20px; background: white; border-top: 1px solid #ddd; box-shadow: 0 -2px 10px rgba(0,0,0,0.05); z-index: 10;">
//             <div style="display: flex; gap: 15px; align-items: flex-start;">
                
//                 <div style="width: 100px;">
//                     <label style="font-weight: bold; color: #dc3545; font-size: 13px; display: block; margin-bottom: 5px;">Điểm số:</label>
//                     <input type="number" id="diem_tu_luan_gv" value="${diemHienThi}" step="0.25" min="0" max="100" placeholder="Trống" style="width: 100%; padding: 10px; font-size: 16px; font-weight: bold; border: 2px solid #ffc107; border-radius: 6px; text-align: center; color: #dc3545; box-sizing: border-box;">
//                 </div>

//                 <div style="width: 330px;">
//                     <label style="font-weight: bold; color: #17a2b8; font-size: 13px; display: block; margin-bottom: 5px;">Đánh giá nhanh:</label>
//                     <div style="display: flex; gap: 10px; align-items: center; background: #f8f9fa; padding: 6px 10px; border: 1px solid #17a2b8; border-radius: 6px; height: 43px; box-sizing: border-box;">
//                         <label style="cursor: pointer; display: flex; align-items: center; gap: 4px; font-size: 13px; font-weight: bold; color: #17a2b8;">
//                             <input type="radio" name="danh_gia_radio" value="Tốt" ${danhGiaHienThi === 'Tốt' ? 'checked' : ''} style="cursor:pointer;"> Tốt
//                         </label>
//                         <label style="cursor: pointer; display: flex; align-items: center; gap: 4px; font-size: 13px; font-weight: bold; color: #28a745;">
//                             <input type="radio" name="danh_gia_radio" value="Đạt" ${danhGiaHienThi === 'Đạt' ? 'checked' : ''} style="cursor:pointer;"> Đạt
//                         </label>
//                         <!-- 🌟 SỬA "C.ĐẠT" THÀNH "CHƯA ĐẠT" -->
//                         <label style="cursor: pointer; display: flex; align-items: center; gap: 4px; font-size: 13px; font-weight: bold; color: #dc3545;">
//                             <input type="radio" name="danh_gia_radio" value="Chưa Đạt" ${danhGiaHienThi === 'Chưa Đạt' ? 'checked' : ''} style="cursor:pointer;"> Chưa Đạt
//                         </label>
                        
//                         <div style="width: 1px; height: 20px; background: #ccc; margin: 0 2px;"></div>
                        
//                         <label style="cursor: pointer; display: flex; align-items: center; gap: 4px; font-size: 13px; font-weight: bold; color: #6c757d;">
//                             <input type="radio" name="danh_gia_radio" value="KHAC" id="radio_khac_tl" ${!isMauChuan ? 'checked' : ''} style="cursor:pointer;"> 
//                             <input type="text" id="danh_gia_khac_tl" value="${!isMauChuan ? danhGiaHienThi : ''}" placeholder="Nhập..." style="width: 70px; padding: 4px 6px; border: 1px solid #ccc; border-radius: 4px; font-size: 12px; outline: none; font-weight:normal;" onfocus="document.getElementById('radio_khac_tl').checked = true;">
//                         </label>
//                     </div>
//                 </div>
                
//                 <div style="flex: 1;">
//                     <label style="font-weight: bold; color: #0056b3; font-size: 13px; display: block; margin-bottom: 5px;">Lời phê / Nhận xét:</label>
//                     <textarea id="nhan_xet_tu_luan_gv" placeholder="Nhập nhận xét cho học sinh..." style="width: 100%; padding: 10px; font-size: 14px; border: 1px solid #ced4da; border-radius: 6px; resize: none; height: 43px; box-sizing: border-box;">${kq.nhan_xet_gv || ''}</textarea>
//                 </div>
                
//                 <div style="padding-top: 23px;">
//                     <button onclick="ham_7b_20_luu_diem_tu_luan('${kq.id}')" style="padding: 10px 25px; height: 43px; background: #28a745; color: white; border: none; border-radius: 6px; font-size: 14px; font-weight: bold; cursor: pointer; box-shadow: 0 4px 6px rgba(40,167,69,0.3); transition: 0.2s;" onmouseover="this.style.background='#218838'" onmouseout="this.style.background='#28a745'">
//                         💾 LƯU CHẤM BÀI
//                     </button>
//                 </div>
//             </div>
//         </div>
//     `;
// };


// =====================================================================
// HÀM HỖ TRỢ: QUÉT ĐỘ PHÂN GIẢI ẢNH SAU KHI LOAD XONG (CHỐNG LỖI CÚ PHÁP)
// =====================================================================
window.ham_7b_quet_thong_tin_anh = function (imgObj, imgId) {
    let d = document.getElementById('info_dim_' + imgId);
    if (d) {
        let w = imgObj.naturalWidth;
        let h = imgObj.naturalHeight;

        // Nếu ảnh không load được kích thước thực
        if (w === 0 || h === 0) {
            d.innerHTML = 'Không quét được';
            d.style.color = '#dc3545';
            return;
        }

        let text = w + ' x ' + h + ' px';
        // Cảnh báo ảnh quá to (Cạnh > 2000px)
        if (w >= 2000 || h >= 2000) {
            text += ' <span style="color:#fff; font-weight:bold; background:#dc3545; padding:3px 8px; border-radius:12px; margin-left:8px; box-shadow: 0 1px 2px rgba(0,0,0,0.2);">⚠️ Ảnh Nặng</span>';
        }
        d.innerHTML = text;
        d.style.color = '#0056b3';
    }
};

// =====================================================================
// Hàm 7b.19: Xem bài và hiện Form chấm (Đã fix triệt để lỗi undefined)
// =====================================================================
window.ham_7b_19_xem_bai_hoc_sinh = async function (uidHocSinh) {
    ChamBaiTL_State.uidDangCham = uidHocSinh;

    ChamBaiTL_State.gocXoay = {};
    ChamBaiTL_State.mucZoom = {};

    document.querySelectorAll('.cham-bai-hs-card').forEach(el => el.classList.remove('active'));
    const cardActive = document.getElementById('hs_card_' + uidHocSinh);
    if (cardActive) cardActive.classList.add('active');

    const hs = ChamBaiTL_State.dsHocSinh.find(h => h.uid === uidHocSinh);
    const kq = ChamBaiTL_State.dsKetQua.find(k => k.uid_hoc_sinh === uidHocSinh);
    const khungPhai = document.getElementById('khung-cham-bai-phai');

    if (!kq) {
        khungPhai.innerHTML = `
            <div style="padding: 20px; background: white; border-bottom: 1px solid #ddd;">
                <h3 style="margin: 0; color: #1a73e8; font-size: 20px;">👤 ${hs.ten}</h3>
            </div>
            <div style="flex: 1; display: flex; justify-content: center; align-items: center; color: #dc3545; font-weight: bold; font-size: 18px;">
                ❌ Học sinh này chưa nộp bài!
            </div>
        `;
        return;
    }

    const chiTiet = typeof kq.chi_tiet_lam_bai === 'string' ? JSON.parse(kq.chi_tiet_lam_bai || '{}') : (kq.chi_tiet_lam_bai || {});
    //const dsAnh = chiTiet.danh_sach_link_anh || chiTiet.danh_sach_anh || [];

    // 🌟 QUÉT LINH HOẠT TẤT CẢ CÁC TÊN TRƯỜNG DỮ LIỆU ĐỂ KHÔNG BỎ SÓT BẤT KỲ ĐỊNH DẠNG NÀO (.png, .jpg, .webp,...)
    const dsAnh = chiTiet.danh_sach_link_anh
        || chiTiet.danh_sach_anh
        || chiTiet.links
        || chiTiet.images
        || (Array.isArray(chiTiet) ? chiTiet : [])
        || [];



    const cauHinhAnhLuuTru = chiTiet.cau_hinh_anh || {};
    const danhGiaHienThi = chiTiet.danh_gia_chu || '';

    const taoLinkAnhTrucTiep = (url) => {
        if (!url) return '';
        if (url.includes('drive.google.com')) {
            const idMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/);
            if (idMatch && idMatch[1]) {
                return `https://drive.google.com/thumbnail?id=${idMatch[1]}&sz=w2000`;
            }
        }
        return url;
    };

    // 🌟 BẢO VỆ: Bóc tách File ID chuẩn xác với mọi định dạng link Drive
    const layDriveFileId = (url) => {
        if (!url) return null;
        let m = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/) || url.match(/\/thumbnail\?id=([a-zA-Z0-9_-]+)/);
        return m ? m[1] : null;
    };

    let htmlAnhBaiLam = '';
    if (dsAnh.length === 0) {
        htmlAnhBaiLam = `<div style="padding: 20px; text-align:center; color: #888;">Không có ảnh đính kèm.</div>`;
    } else {
        dsAnh.forEach((item, idx) => {
            const imgId = `img_bai_lam_${idx}`;
            const infoBoxId = `info_file_box_${idx}`;

            let linkGoc = '';
            let tenFileMacDinh = `Anh_Bai_Lam_Trang_${idx + 1}.jpg`;
            let dungLuongMacDinh = 'Đang đọc từ Drive...';

            if (typeof item === 'string') {
                linkGoc = item;
            } else if (item && typeof item === 'object') {
                linkGoc = item.url || item.link || '';
                if (item.name) tenFileMacDinh = item.name;
                if (item.size) {
                    let sizeNum = parseFloat(item.size);
                    dungLuongMacDinh = !isNaN(sizeNum) ? (sizeNum > 1024 ? (sizeNum / 1024).toFixed(2) + ' MB' : sizeNum.toFixed(1) + ' KB') : item.size;
                }
            }

            if (!linkGoc) return;

            const linkTrucTiep = taoLinkAnhTrucTiep(linkGoc);
            const fileId = layDriveFileId(linkGoc);

            ChamBaiTL_State.gocXoay[imgId] = cauHinhAnhLuuTru[imgId]?.gocXoay || 0;
            ChamBaiTL_State.mucZoom[imgId] = cauHinhAnhLuuTru[imgId]?.mucZoom || 1;
            const cssTransform = `transform: scale(${ChamBaiTL_State.mucZoom[imgId]}) rotate(${ChamBaiTL_State.gocXoay[imgId]}deg);`;

            htmlAnhBaiLam += `
                <div style="margin-bottom: 25px; border: 2px solid #ddd; background: white; box-shadow: 0 4px 8px rgba(0,0,0,0.2); border-radius: 8px; overflow: hidden; display: flex; flex-direction: column;">
                    
                    <div style="background: #e9ecef; padding: 8px 15px; border-bottom: 1px solid #ddd; display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-weight: bold; color: #495057;">Trang ${idx + 1}</span>
                        <div style="display: flex; gap: 8px;">
                            <a href="${linkGoc}" target="_blank" style="padding: 4px 8px; cursor: pointer; border:1px solid #007bff; border-radius:4px; background:#e7f1ff; color:#007bff; text-decoration:none; font-size:12px; font-weight:bold; display:flex; align-items:center;">Mở Tab Mới</a>
                            <button onclick="ham_7b_25_mo_khung_cat_nen_anh('${linkGoc}', '${kq.id}', ${idx})" title="Cắt và nén ảnh bị quá tải" style="padding: 4px 8px; cursor: pointer; border:1px solid #17a2b8; border-radius:4px; background:#e0f7fa; color:#006064; font-weight:bold;">✂️ Cắt/Nén</button>
                            <button onclick="ham_7b_21_dieu_chinh_anh('${imgId}', 'xoay_trai')" style="padding: 4px 8px; cursor: pointer; border:1px solid #ccc; border-radius:4px; background:white;">↺ Xoay Trái</button>
                            <button onclick="ham_7b_21_dieu_chinh_anh('${imgId}', 'xoay_phai')" style="padding: 4px 8px; cursor: pointer; border:1px solid #ccc; border-radius:4px; background:white;">↻ Xoay Phải</button>
                            <button onclick="ham_7b_21_dieu_chinh_anh('${imgId}', 'zoom_in')" style="padding: 4px 8px; cursor: pointer; border:1px solid #ccc; border-radius:4px; background:white;">➕ To</button>
                            <button onclick="ham_7b_21_dieu_chinh_anh('${imgId}', 'zoom_out')" style="padding: 4px 8px; cursor: pointer; border:1px solid #ccc; border-radius:4px; background:white;">➖ Nhỏ</button>
                            <button onclick="ham_7b_21_dieu_chinh_anh('${imgId}', 'reset')" style="padding: 4px 8px; cursor: pointer; border:1px solid #ccc; border-radius:4px; background:#ffc107; font-weight:bold;">Khôi phục</button>
                            <button onclick="ham_7b_24_luu_cau_hinh_anh('${kq.id}', this)" style="padding: 4px 8px; cursor: pointer; border:1px solid #28a745; border-radius:4px; background:#d4edda; color:#155724; font-weight:bold;">💾 Lưu Hướng</button>
                        </div>
                    </div>

                    <div id="${infoBoxId}" style="background:#f8f9fa; font-size:12px; color:#495057; padding:8px 15px; border-bottom: 3px solid #ccc; display: flex; justify-content: space-between; align-items: center;" data-fileid="${fileId || ''}">
                        <div style="display: flex; gap: 20px; align-items: center;">
                            <span style="max-width: 250px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${tenFileMacDinh}">📄 <b>File:</b> <span class="txt-ten-file" style="color:#0056b3;">${tenFileMacDinh}</span></span>
                            <span>💾 <b>Dung lượng:</b> <span class="txt-dung-luong" style="color:#d35400; font-weight:bold;">${dungLuongMacDinh}</span></span>
                            <span>📐 <b>Độ phân giải:</b> <span id="info_dim_${imgId}" style="color:#28a745; font-weight:bold;">⏳ Đang quét...</span></span>
                        </div>
                    </div>
                    
                    <div style="width: 100%; height: 500px; min-height: 200px; resize: vertical; overflow: auto; padding: 20px; box-sizing: border-box; background: #525659; display: flex; align-items: center; justify-content: center;">
                        <img id="${imgId}" src="${linkTrucTiep}" alt="Bài làm" style="max-width: 100%; max-height: 100%; transition: transform 0.3s ease; transform-origin: center; display: block; margin: 0 auto; ${cssTransform}" 
                             onload="window.ham_7b_quet_thong_tin_anh(this, '${imgId}')"
                             onerror="this.onerror=null; this.parentElement.innerHTML='<div style=\\'color:white; padding:20px; text-align:center;\\'>⚠️ File ảnh quá nặng hoặc chưa công khai. Bấm <b>[Mở Tab Mới]</b> hoặc <b>[✂️ Cắt/Nén]</b>.</div>'; document.getElementById('info_dim_${imgId}').innerHTML = '<span style=\\'color:#dc3545\\'>Lỗi hiển thị</span>';">
                    </div>
                </div>
            `;
        });
    }

    const thoiGianNop = kq.thoi_gian_nop ? new Date(kq.thoi_gian_nop).toLocaleString('vi-VN') : 'Không rõ';
    const luotNop = chiTiet.luot_nop || 1;
    const diemHienThi = (kq.tong_diem !== null && kq.tong_diem !== undefined) ? kq.tong_diem : '';
    let isMauChuan = ['Tốt', 'Đạt', 'Chưa Đạt', ''].includes(danhGiaHienThi);

    khungPhai.innerHTML = `
        <div style="padding: 15px 20px; background: white; border-bottom: 1px solid #ddd; display: flex; justify-content: space-between; align-items: center;">
            <div>
                <h3 style="margin: 0 0 5px 0; color: #1a73e8; font-size: 20px;">👤 ${hs.ten}</h3>
                <div style="font-size: 12px; color: #666;">Nộp lúc: <b>${thoiGianNop}</b> (Lần ${luotNop})</div>
            </div>
            ${kq.trang_thai_cham === 1 ? `<div style="background:#28a745; color:white; padding:5px 10px; border-radius:4px; font-weight:bold; font-size:12px;">✅ Đã chấm</div>` : ''}
        </div>

        <div style="flex: 1; overflow-y: auto; padding: 20px; background: #e9ecef;">
            ${htmlAnhBaiLam}
        </div>

        <div style="padding: 15px 20px; background: white; border-top: 1px solid #ddd; z-index: 10;">
            <div style="display: flex; gap: 15px; align-items: flex-start;">
                
                <div style="width: 100px;">
                    <label style="font-weight: bold; color: #dc3545; font-size: 13px; display: block; margin-bottom: 5px;">Điểm số:</label>
                    <input type="number" id="diem_tu_luan_gv" value="${diemHienThi}" step="0.25" min="0" max="100" placeholder="Trống" style="width: 100%; padding: 10px; font-size: 16px; font-weight: bold; border: 2px solid #ffc107; border-radius: 6px; text-align: center; color: #dc3545; box-sizing: border-box;">
                </div>

                <div style="width: 330px;">
                    <label style="font-weight: bold; color: #17a2b8; font-size: 13px; display: block; margin-bottom: 5px;">Đánh giá nhanh:</label>
                    <div style="display: flex; gap: 10px; align-items: center; background: #f8f9fa; padding: 6px 10px; border: 1px solid #17a2b8; border-radius: 6px; height: 43px; box-sizing: border-box;">
                        <label style="cursor: pointer; display: flex; align-items: center; gap: 4px; font-size: 13px; font-weight: bold; color: #17a2b8;">
                            <input type="radio" name="danh_gia_radio" value="Tốt" ${danhGiaHienThi === 'Tốt' ? 'checked' : ''} style="cursor:pointer;"> Tốt
                        </label>
                        <label style="cursor: pointer; display: flex; align-items: center; gap: 4px; font-size: 13px; font-weight: bold; color: #28a745;">
                            <input type="radio" name="danh_gia_radio" value="Đạt" ${danhGiaHienThi === 'Đạt' ? 'checked' : ''} style="cursor:pointer;"> Đạt
                        </label>
                        <label style="cursor: pointer; display: flex; align-items: center; gap: 4px; font-size: 13px; font-weight: bold; color: #dc3545;">
                            <input type="radio" name="danh_gia_radio" value="Chưa Đạt" ${danhGiaHienThi === 'Chưa Đạt' ? 'checked' : ''} style="cursor:pointer;"> Chưa Đạt
                        </label>
                        
                        <div style="width: 1px; height: 20px; background: #ccc; margin: 0 2px;"></div>
                        
                        <label style="cursor: pointer; display: flex; align-items: center; gap: 4px; font-size: 13px; font-weight: bold; color: #6c757d;">
                            <input type="radio" name="danh_gia_radio" value="KHAC" id="radio_khac_tl" ${!isMauChuan ? 'checked' : ''} style="cursor:pointer;"> 
                            <input type="text" id="danh_gia_khac_tl" value="${!isMauChuan ? danhGiaHienThi : ''}" placeholder="Nhập..." style="width: 70px; padding: 4px 6px; border: 1px solid #ccc; border-radius: 4px; font-size: 12px; outline: none; font-weight:normal;" onfocus="document.getElementById('radio_khac_tl').checked = true;">
                        </label>
                    </div>
                </div>
                
                <div style="flex: 1;">
                    <label style="font-weight: bold; color: #0056b3; font-size: 13px; display: block; margin-bottom: 5px;">Lời phê / Nhận xét:</label>
                    <textarea id="nhan_xet_tu_luan_gv" placeholder="Nhập nhận xét..." style="width: 100%; padding: 10px; font-size: 14px; border: 1px solid #ced4da; border-radius: 6px; resize: none; height: 43px; box-sizing: border-box;">${kq.nhan_xet_gv || ''}</textarea>
                </div>
                
                <div style="padding-top: 23px;">
                    <button onclick="ham_7b_20_luu_diem_tu_luan('${kq.id}')" style="padding: 10px 25px; height: 43px; background: #28a745; color: white; border: none; border-radius: 6px; font-size: 14px; font-weight: bold; cursor: pointer;">
                        💾 LƯU CHẤM BÀI
                    </button>
                </div>
            </div>
        </div>
    `;

    // // 🌟 GỌI NGẦM API DRIVE VÀ BẢO VỆ TUYỆT ĐỐI KHÔNG ĐỂ UNDEFINED
    // dsAnh.forEach((item, idx) => {
    //     let linkGoc = typeof item === 'string' ? item : (item && (item.url || item.link));
    //     let fileId = layDriveFileId(linkGoc);
    //     if (!fileId) return;

    //     fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
    //         method: "POST",
    //         body: JSON.stringify({ action: "get_drive_file_info", fileId: fileId })
    //     })
    //         .then(res => res.json())
    //         .then(resData => {
    //             let box = document.getElementById(`info_file_box_${idx}`);
    //             if (box && resData && resData.status === "success") {
    //                 let txtTen = box.querySelector('.txt-ten-file');
    //                 let txtSize = box.querySelector('.txt-dung-luong');
    //                 if (txtTen && resData.name) {
    //                     txtTen.innerText = resData.name;
    //                     box.querySelector('span[title]').title = resData.name;
    //                 }
    //                 if (txtSize && resData.sizeFormatted) {
    //                     let isHeavy = resData.sizeBytes > 5 * 1024 * 1024;
    //                     let color = isHeavy ? '#dc3545' : '#d35400';
    //                     let note = isHeavy ? ' (⚠️ Quá nặng)' : '';
    //                     txtSize.innerHTML = `<span style="color:${color};">${resData.sizeFormatted}${note}</span>`;
    //                 }
    //             } else if (box) {
    //                 // Nếu API trả về lỗi hoặc không đọc được, hiển thị thông báo thay vì để trống/undefined
    //                 let txtSize = box.querySelector('.txt-dung-luong');
    //                 if (txtSize) txtSize.innerHTML = `<span style="color:#6c757d; font-style:italic;">Không xác định</span>`;
    //             }
    //         })
    //         .catch(err => {
    //             console.log("Lỗi lấy info file từ Drive:", err);
    //             let box = document.getElementById(`info_file_box_${idx}`);
    //             if (box) {
    //                 let txtSize = box.querySelector('.txt-dung-luong');
    //                 if (txtSize) txtSize.innerHTML = `<span style="color:#6c757d; font-style:italic;">Không quét được</span>`;
    //             }
    //         });
    // });

    // 🌟 GỌI NGẦM API DRIVE VÀ CÓ IN LOG GỠ LỖI RA CONSOLE
    dsAnh.forEach((item, idx) => {
        let linkGoc = typeof item === 'string' ? item : (item && (item.url || item.link));
        let fileId = layDriveFileId(linkGoc);

        //console.log(`--- Đang xử lý ảnh ${idx} ---`, { linkGoc, fileId }); // 🔍 In ra để kiểm tra

        if (!fileId) {
            console.warn(`⚠️ Không bóc tách được File ID từ link:`, linkGoc);
            let box = document.getElementById(`info_file_box_${idx}`);
            if (box) {
                let txtSize = box.querySelector('.txt-dung-luong');
                if (txtSize) txtSize.innerHTML = `<span style="color:#6c757d; font-style:italic;">Link không hợp lệ</span>`;
            }
            return;
        }

        fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
            method: "POST",
            body: JSON.stringify({ action: "get_drive_file_info", fileId: fileId })
        })
            .then(res => res.json())
            .then(resData => {
                //console.log(`📦 Kết quả từ Apps Script cho file ${fileId}:`, resData);

                let box = document.getElementById(`info_file_box_${idx}`);
                if (box && resData && resData.status === "success") {
                    let txtTen = box.querySelector('.txt-ten-file');
                    let txtSize = box.querySelector('.txt-dung-luong');

                    if (txtTen && resData.name) {
                        txtTen.innerText = resData.name;
                        box.querySelector('span[title]').title = resData.name;
                    }

                    // 🌟 FIX QUAN TRỌNG: Đọc trực tiếp trường 'size' (bytes) từ Apps Script trả về
                    if (txtSize && resData.size !== undefined) {
                        let sizeBytes = Number(resData.size);
                        let sizeFormatted = sizeBytes > 1024 * 1024
                            ? (sizeBytes / (1024 * 1024)).toFixed(2) + " MB"
                            : (sizeBytes / 1024).toFixed(1) + " KB";

                        let isHeavy = sizeBytes > 5 * 1024 * 1024; // > 5MB cảnh báo
                        let color = isHeavy ? '#dc3545' : '#d35400';
                        let note = isHeavy ? ' (⚠️ Quá nặng)' : '';

                        txtSize.innerHTML = `<span style="color:${color};">${sizeFormatted}${note}</span>`;
                    }
                } else if (box) {
                    let txtSize = box.querySelector('.txt-dung-luong');
                    if (txtSize) txtSize.innerHTML = `<span style="color:#dc3545; font-style:italic;">Lỗi đọc thông tin</span>`;
                }
            })
            .catch(err => {
                console.error("❌ Lỗi fetch API get_drive_file_info:", err);
                let box = document.getElementById(`info_file_box_${idx}`);
                if (box) {
                    let txtSize = box.querySelector('.txt-dung-luong');
                    if (txtSize) txtSize.innerHTML = `<span style="color:#6c757d; font-style:italic;">Lỗi kết nối</span>`;
                }
            });
    });

    
};

// // =====================================================================
// // Hàm 7b.20: Lưu Điểm & Cập nhật Supabase
// // =====================================================================
// window.ham_7b_20_luu_diem_tu_luan = async function (idKetQua) {
//     const diemRaw = document.getElementById('diem_tu_luan_gv').value;
//     const nhanXet = document.getElementById('nhan_xet_tu_luan_gv').value.trim();

//     if (diemRaw === '') {
//         return alert("❌ Thầy/cô chưa nhập điểm!");
//     }

//     const diemSo = parseFloat(diemRaw);
//     if (diemSo < 0 || diemSo > 100) { // Max 100 tuỳ thang điểm của thầy cô
//         return alert("❌ Điểm số không hợp lệ!");
//     }

//     const btn = event.currentTarget;
//     const oldText = btn.innerText;
//     btn.disabled = true;
//     btn.innerText = "⏳ Đang lưu...";

//     try {
//         const payloadUpdate = {
//             tong_diem: diemSo,
//             nhan_xet_gv: nhanXet,
//             trang_thai_cham: 1 // 1: Đã chấm
//         };

//         const { error } = await _supabase.from('ket_qua_tu_luan')
//             .update(payloadUpdate)
//             .eq('id', idKetQua);

//         if (error) throw error;

//         // Cập nhật lại State ở máy (để đổi màu xanh bên danh sách)
//         const idx = ChamBaiTL_State.dsKetQua.findIndex(k => k.id === idKetQua);
//         if (idx !== -1) {
//             ChamBaiTL_State.dsKetQua[idx].tong_diem = diemSo;
//             ChamBaiTL_State.dsKetQua[idx].nhan_xet_gv = nhanXet;
//             ChamBaiTL_State.dsKetQua[idx].trang_thai_cham = 1;
//         }

//         // Render lại Layout Tổng để update màu danh sách bên trái
//         ham_7b_18_render_layout_tong_cham_bai();

//         // Mở lại bài học sinh đó
//         ham_7b_19_xem_bai_hoc_sinh(ChamBaiTL_State.uidDangCham);

//         // Báo hiệu bằng popup nháy nhỏ gọn
//         const thongBao = document.createElement('div');
//         thongBao.innerHTML = "✅ Đã lưu điểm!";
//         thongBao.style.cssText = "position:fixed; top:20px; right:20px; background:#28a745; color:white; padding:15px 25px; border-radius:8px; font-weight:bold; box-shadow:0 4px 10px rgba(0,0,0,0.2); z-index:9999; animation: fadein 0.5s;";
//         document.body.appendChild(thongBao);
//         setTimeout(() => document.body.removeChild(thongBao), 2000);

//     } catch (error) {
//         alert("❌ Lỗi khi lưu điểm: " + error.message);
//         btn.disabled = false;
//         btn.innerText = oldText;
//     }
// };

// =====================================================================
// Hàm 7b.20: Lưu Điểm / Đánh Giá (Lấy từ Radio Button)
// =====================================================================
window.ham_7b_20_luu_diem_tu_luan = async function (idKetQua) {
    const diemRaw = document.getElementById('diem_tu_luan_gv').value;
    const nhanXet = document.getElementById('nhan_xet_tu_luan_gv').value.trim();

    // 🌟 ĐỌC DỮ LIỆU TỪ RADIO BUTTON
    let selectedRadio = document.querySelector('input[name="danh_gia_radio"]:checked');
    let danhGia = '';
    if (selectedRadio) {
        if (selectedRadio.value === 'KHAC') {
            danhGia = document.getElementById('danh_gia_khac_tl').value.trim();
        } else {
            danhGia = selectedRadio.value;
        }
    }

    if (diemRaw === '' && danhGia === '') {
        return alert("❌ Thầy/cô cần nhập Điểm số HOẶC Chọn đánh giá / Nhập chữ ở mục Khác để hoàn tất chấm bài!");
    }

    let diemSo = null;
    if (diemRaw !== '') {
        diemSo = parseFloat(diemRaw);
        if (diemSo < 0 || diemSo > 100) {
            return alert("❌ Điểm số không hợp lệ!");
        }
    }

    const btn = event.currentTarget;
    const oldText = btn.innerText;
    btn.disabled = true;
    btn.innerText = "⏳ Đang lưu...";

    try {
        const kq = ChamBaiTL_State.dsKetQua.find(k => k.id === idKetQua);
        let chiTiet = typeof kq.chi_tiet_lam_bai === 'string' ? JSON.parse(kq.chi_tiet_lam_bai || '{}') : (kq.chi_tiet_lam_bai || {});

        chiTiet.danh_gia_chu = danhGia;

        const payloadUpdate = {
            tong_diem: diemSo,
            chi_tiet_lam_bai: chiTiet,
            nhan_xet_gv: nhanXet,
            trang_thai_cham: 1
        };

        const { error } = await _supabase.from('ket_qua_tu_luan')
            .update(payloadUpdate)
            .eq('id', idKetQua);

        if (error) throw error;

        const idx = ChamBaiTL_State.dsKetQua.findIndex(k => k.id === idKetQua);
        if (idx !== -1) {
            ChamBaiTL_State.dsKetQua[idx].tong_diem = diemSo;
            ChamBaiTL_State.dsKetQua[idx].chi_tiet_lam_bai = chiTiet;
            ChamBaiTL_State.dsKetQua[idx].nhan_xet_gv = nhanXet;
            ChamBaiTL_State.dsKetQua[idx].trang_thai_cham = 1;
        }

        ham_7b_18_render_layout_tong_cham_bai();
        ham_7b_19_xem_bai_hoc_sinh(ChamBaiTL_State.uidDangCham);

        const thongBao = document.createElement('div');
        thongBao.innerHTML = "✅ Đã lưu kết quả!";
        thongBao.style.cssText = "position:fixed; top:20px; right:20px; background:#28a745; color:white; padding:15px 25px; border-radius:8px; font-weight:bold; box-shadow:0 4px 10px rgba(0,0,0,0.2); z-index:9999; animation: fadein 0.5s;";
        document.body.appendChild(thongBao);
        setTimeout(() => document.body.removeChild(thongBao), 2000);

    } catch (error) {
        alert("❌ Lỗi khi lưu kết quả: " + error.message);
        btn.disabled = false;
        btn.innerText = oldText;
    }
};



// =====================================================================
// Hàm 7b.21: Helper Xoay và Phóng to/Thu nhỏ Ảnh bài làm
// =====================================================================
window.ham_7b_21_dieu_chinh_anh = function (imgId, hanhDong) {
    // Khởi tạo nếu mảng state bị miss
    if (ChamBaiTL_State.gocXoay[imgId] === undefined) ChamBaiTL_State.gocXoay[imgId] = 0;
    if (ChamBaiTL_State.mucZoom[imgId] === undefined) ChamBaiTL_State.mucZoom[imgId] = 1;

    if (hanhDong === 'xoay_trai') {
        ChamBaiTL_State.gocXoay[imgId] -= 90;
    } else if (hanhDong === 'xoay_phai') {
        ChamBaiTL_State.gocXoay[imgId] += 90;
    } else if (hanhDong === 'zoom_in') {
        ChamBaiTL_State.mucZoom[imgId] += 0.2;
    } else if (hanhDong === 'zoom_out') {
        ChamBaiTL_State.mucZoom[imgId] = Math.max(0.2, ChamBaiTL_State.mucZoom[imgId] - 0.2); // Không cho zoom nhỏ hơn 0.2
    } else if (hanhDong === 'reset') {
        ChamBaiTL_State.gocXoay[imgId] = 0;
        ChamBaiTL_State.mucZoom[imgId] = 1;
    }

    const img = document.getElementById(imgId);
    if (img) {
        // Áp dụng CSS Transform: Vừa scale vừa rotate
        img.style.transform = `scale(${ChamBaiTL_State.mucZoom[imgId]}) rotate(${ChamBaiTL_State.gocXoay[imgId]}deg)`;
    }
};




// =====================================================================
// Hàm 7b.22: Kích hoạt tính năng Kéo giãn cột (Resizable Splitter)
// =====================================================================
window.ham_7b_22_kich_hoat_thanh_keo = function () {
    const resizer = document.getElementById('thanh-keo-gian-cham-bai');
    const leftPanel = document.getElementById('cot-trai-cham-bai');

    if (!resizer || !leftPanel) return;

    let isResizing = false;

    // Khi người dùng bấm giữ chuột vào thanh kéo
    resizer.addEventListener('mousedown', function (e) {
        isResizing = true;
        // Đổi con trỏ chuột của toàn trang thành dạng mũi tên 2 chiều ngang
        document.body.style.cursor = 'col-resize';
        // Ngăn chặn việc bôi đen văn bản vô tình khi đang kéo chuột
        e.preventDefault();
    });

    // Khi người dùng di chuyển chuột (kéo)
    document.addEventListener('mousemove', function (e) {
        if (!isResizing) return;

        // Lấy tọa độ mép trái của toàn bộ khung to
        const container = document.getElementById('container-cham-bai-tong');
        const containerRect = container.getBoundingClientRect();

        // Tính toán chiều rộng mới cho cột trái dựa trên vị trí chuột
        let newWidth = e.clientX - containerRect.left;

        // Giới hạn không cho kéo quá nhỏ (min 200px) hoặc quá to (max 600px)
        if (newWidth < 200) newWidth = 200;
        if (newWidth > 600) newWidth = 600;

        // Áp dụng chiều rộng mới
        leftPanel.style.width = `${newWidth}px`;
    });

    // Khi người dùng nhả chuột ra (kết thúc kéo)
    document.addEventListener('mouseup', function () {
        if (isResizing) {
            isResizing = false;
            // Trả lại con trỏ chuột bình thường
            document.body.style.cursor = 'default';
        }
    });
};


// =====================================================================
// Hàm 7b.23: Lắng nghe sự kiện đổi chế độ Sắp Xếp
// =====================================================================
window.ham_7b_23_doi_sort_cham_bai = function (kieuSort) {
    // Lưu trạng thái sort mới
    ChamBaiTL_State.tieuChiSort = kieuSort;

    // Gọi lại hàm vẽ layout (nó sẽ tự động áp dụng logic sort mới)
    ham_7b_18_render_layout_tong_cham_bai();
};




// =====================================================================
// Hàm 15.15: Thuật toán ghép nhiều ảnh thành 1 file PDF giữ nét (Chạy ngầm)
// =====================================================================
window.ham_15_15_ghep_anh_thanh_pdf_k15 = async function (fileList) {
    try {

        // 🌟 BƯỚC BẢO VỆ: KIỂM TRA VÀ TỰ ĐỘNG TẢI THƯ VIỆN NẾU THIẾU
        if (typeof window.jspdf === 'undefined') {
            await new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
                script.onload = resolve;
                script.onerror = () => reject(new Error("Không thể kết nối Internet để tải thư viện jsPDF"));
                document.head.appendChild(script);
            });
        }


        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = doc.internal.pageSize.getHeight();

        const loadImg = (file) => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => resolve({ data: e.target.result, w: img.width, h: img.height, type: file.type });
                img.onerror = () => reject(new Error("Lỗi đọc ảnh"));
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        });

        for (let i = 0; i < fileList.length; i++) {
            const imgObj = await loadImg(fileList[i]);
            if (i > 0) doc.addPage();

            const ratio = Math.min(pdfWidth / imgObj.w, pdfHeight / imgObj.h);
            const finalWidth = imgObj.w * ratio;
            const finalHeight = imgObj.h * ratio;
            const imgX = (pdfWidth - finalWidth) / 2;
            const imgY = 10;

            const imgType = imgObj.type === 'image/png' ? 'PNG' : 'JPEG';
            doc.addImage(imgObj.data, imgType, imgX, imgY, finalWidth, finalHeight, undefined, 'FAST');
        }

        const tenFileGhep = `Ghep_Tu_Dong_${new Date().getTime()}.pdf`;
        const pdfBlob = doc.output('blob');

        return new File([pdfBlob], tenFileGhep, { type: 'application/pdf' });

    } catch (err) {
        throw new Error("Lỗi khi ghép ảnh thành PDF: " + err.message);
    }
};




// =====================================================================
// HÀM 7B.24 (MỚI): LƯU CẤU HÌNH GÓC XOAY & ZOOM VÀO DATABASE
// =====================================================================
window.ham_7b_24_luu_cau_hinh_anh = async function (idKetQua, btnNode) {
    const oldHTML = btnNode.innerHTML;
    btnNode.innerHTML = "⏳...";
    btnNode.disabled = true;

    try {
        // Tìm dòng kết quả nộp bài hiện tại
        const kq = ChamBaiTL_State.dsKetQua.find(k => k.id === idKetQua);
        if (!kq) throw new Error("Không tìm thấy kết quả nộp bài");

        // Parse chi_tiet_lam_bai
        let chiTiet = typeof kq.chi_tiet_lam_bai === 'string' ? JSON.parse(kq.chi_tiet_lam_bai || '{}') : (kq.chi_tiet_lam_bai || {});

        // Ghi đè cấu hình mới
        chiTiet.cau_hinh_anh = {};
        for (let key in ChamBaiTL_State.gocXoay) {
            chiTiet.cau_hinh_anh[key] = {
                gocXoay: ChamBaiTL_State.gocXoay[key],
                mucZoom: ChamBaiTL_State.mucZoom[key]
            };
        }

        // Cập nhật lên Supabase
        const { error } = await _supabase.from('ket_qua_tu_luan')
            .update({ chi_tiet_lam_bai: chiTiet })
            .eq('id', idKetQua);

        if (error) throw error;

        // Cập nhật vào RAM để khi click qua lại HS không bị mất
        kq.chi_tiet_lam_bai = chiTiet;

        // Báo hiệu bằng popup nháy góc màn hình
        const thongBao = document.createElement('div');
        thongBao.innerHTML = "✅ Đã lưu cố định góc xoay!";
        thongBao.style.cssText = "position:fixed; top:20px; right:20px; background:#28a745; color:white; padding:15px 25px; border-radius:8px; font-weight:bold; box-shadow:0 4px 10px rgba(0,0,0,0.2); z-index:9999; animation: fadein 0.5s;";
        document.body.appendChild(thongBao);
        setTimeout(() => document.body.removeChild(thongBao), 2000);

    } catch (e) {
        alert("❌ Lỗi lưu hướng ảnh: " + e.message);
    } finally {
        btnNode.innerHTML = "✅ Đã Lưu";
        setTimeout(() => {
            btnNode.innerHTML = oldHTML;
            btnNode.disabled = false;
        }, 2000);
    }
};






// // =====================================================================
// // Hàm 7b.25: CẮT & NÉN ẢNH TRỰC TIẾP NGAY TẠI KHUNG (ĐÃ FIX TƯỜNG LỬA CORS)
// // =====================================================================
// window.ham_7b_25_mo_khung_cat_nen_anh = async function (linkGoc, idKetQua, idxAnh) {
//     // 1. Tải thư viện CropperJS nếu chưa có
//     if (typeof window.Cropper === 'undefined') {
//         Swal.fire({ title: 'Đang tải bộ công cụ...', didOpen: () => Swal.showLoading() });
//         await new Promise((resolve) => {
//             const link = document.createElement('link'); link.rel = 'stylesheet'; link.href = 'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.css'; document.head.appendChild(link);
//             const script = document.createElement('script'); script.src = 'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.js'; script.onload = resolve; document.head.appendChild(script);
//         });
//         Swal.close();
//     }

//     // 2. Tìm đúng thẻ img đang hiển thị trên giao diện
//     const imgId = `img_bai_lam_${idxAnh}`;
//     const imgEl = document.getElementById(imgId);
//     if (!imgEl) return alert("❌ Không tìm thấy khung ảnh!");

//     const khungChuaAnh = imgEl.parentElement;
//     const chieuCaoCu = khungChuaAnh.style.height || '500px';
//     const noiDungCu = khungChuaAnh.innerHTML; // Lưu lại để bấm Hủy

//     // Biến đổi khung chứa thành giao diện Cắt/Nén trực tiếp ngay tại chỗ
//     khungChuaAnh.style.height = '600px';
//     khungChuaAnh.innerHTML = `
//         <div style="width:100%; height:100%; display:flex; flex-direction:column; background:#222; position:relative;">
//             <div style="flex:1; position:relative; overflow:hidden; display:flex; align-items:center; justify-content:center;">
//                 <img id="inline_cropper_target_${idxAnh}" style="max-width:100%; max-height:100%; display:none;">
//                 <div id="inline_loading_${idxAnh}" style="position:absolute; color:white; font-size:14px; font-weight:bold;">⏳ Đang tải dữ liệu ảnh an toàn...</div>
//             </div>
//             <div style="background:#333; padding:10px 15px; display:flex; justify-content:space-between; align-items:center; border-top:1px solid #444;">
//                 <span style="color:#ffc107; font-size:12px;">✂️ Kéo các góc để cắt, sau đó bấm Lưu đè lên Drive.</span>
//                 <div style="display:flex; gap:8px;">
//                     <button id="inline_btn_save_${idxAnh}" style="background:#28a745; color:white; border:none; padding:6px 12px; border-radius:4px; font-weight:bold; cursor:pointer; font-size:12px;" disabled>⏳ Đang tải...</button>
//                     <button id="inline_btn_cancel_${idxAnh}" style="background:#6c757d; color:white; border:none; padding:6px 12px; border-radius:4px; font-weight:bold; cursor:pointer; font-size:12px;">✖ Hủy</button>
//                 </div>
//             </div>
//         </div>
//     `;

//     const targetImg = document.getElementById(`inline_cropper_target_${idxAnh}`);
//     const loadingDiv = document.getElementById(`inline_loading_${idxAnh}`);
//     const btnSave = document.getElementById(`inline_btn_save_${idxAnh}`);
//     let cropperInstance;

//     // 3. Bóc tách File ID từ link Google Drive
//     let fileId = null;
//     let m = linkGoc.match(/\/d\/([a-zA-Z0-9_-]+)/) || linkGoc.match(/[?&]id=([a-zA-Z0-9_-]+)/);
//     if (m) fileId = m[1];

//     // 4. Lấy ảnh dạng Base64 thông qua Apps Script để vượt qua CORS hoàn toàn
//     if (fileId) {
//         try {
//             const res = await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
//                 method: "POST",
//                 body: JSON.stringify({ action: "get_image_base64", fileId: fileId })
//             });
//             const data = await res.json();

//             if (data.status === "success" && data.base64) {
//                 targetImg.src = data.base64;
//                 loadingDiv.style.display = 'none';
//                 targetImg.style.display = 'block';

//                 cropperInstance = new window.Cropper(targetImg, {
//                     viewMode: 2,
//                     autoCropArea: 0.95,
//                     background: false,
//                     responsive: true
//                 });

//                 btnSave.innerText = "💾 Lưu đè lên Drive";
//                 btnSave.disabled = false;
//             } else {
//                 throw new Error(data.message || "Không lấy được dữ liệu ảnh");
//             }
//         } catch (err) {
//             loadingDiv.innerHTML = `⚠️ Không tải được ảnh qua Server.<br><span style="color:#ffc107; font-size:11px;">Vui lòng bấm [Hủy] rồi dùng tính năng [Mở Tab Mới].</span>`;
//         }
//     } else {
//         loadingDiv.innerHTML = `⚠️ Không tìm thấy File ID hợp lệ.`;
//     }

//     // 5. Nút Hủy: Khôi phục lại khung ảnh ban đầu
//     document.getElementById(`inline_btn_cancel_${idxAnh}`).onclick = function () {
//         if (cropperInstance) cropperInstance.destroy();
//         khungChuaAnh.style.height = chieuCaoCu;
//         khungChuaAnh.innerHTML = noiDungCu;
//     };

//     // 6. Nút Lưu: Cắt, nén và upload thay thế lên Google Drive ngay tại chỗ
//     btnSave.onclick = async function () {
//         if (!cropperInstance) return alert("❌ Ảnh chưa sẵn sàng!");
//         this.innerHTML = "⏳ Đang nén & lưu...";
//         this.disabled = true;

//         try {
//             const canvas = cropperInstance.getCroppedCanvas({
//                 maxWidth: 1500,
//                 maxHeight: 2000,
//                 imageSmoothingEnabled: true,
//                 imageSmoothingQuality: 'high'
//             });

//             let b64Full = canvas.toDataURL('image/jpeg', 0.7);
//             let b64Data = b64Full.includes(',') ? b64Full.split(',')[1] : b64Full;

//             let folderId = "1XaPQXF5RJ-Qreh_VBPKwJC8BsGdOM8dm";
//             const { data: nv } = await _supabase.from('nhiem_vu_tu_luan').select('metadata').eq('ma_nhiem_vu', ChamBaiTL_State.maNV).single();
//             if (nv && nv.metadata && nv.metadata.folder_id_drive) {
//                 folderId = nv.metadata.folder_id_drive;
//             }

//             const payload = {
//                 action: "upload_bai_nop",
//                 folderId: folderId,
//                 base64Data: b64Data,
//                 mimeType: "image/jpeg",
//                 fileName: `Anh_Da_Cat_Nen_${new Date().getTime()}.jpg`
//             };

//             const res = await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
//                 method: "POST", body: JSON.stringify(payload)
//             });
//             const result = await res.json();

//             if (result.status !== 'success') throw new Error(result.message || "Lỗi máy chủ Drive");
//             let newUrl = result.url;

//             const kq = ChamBaiTL_State.dsKetQua.find(k => k.id === idKetQua);
//             let chiTiet = typeof kq.chi_tiet_lam_bai === 'string' ? JSON.parse(kq.chi_tiet_lam_bai) : kq.chi_tiet_lam_bai;

//             if (chiTiet.danh_sach_link_anh) chiTiet.danh_sach_link_anh[idxAnh] = newUrl;
//             else if (chiTiet.danh_sach_anh) chiTiet.danh_sach_anh[idxAnh] = newUrl;

//             const { error } = await _supabase.from('ket_qua_tu_luan').update({ chi_tiet_lam_bai: chiTiet }).eq('id', idKetQua);
//             if (error) throw error;

//             kq.chi_tiet_lam_bai = chiTiet;

//             alert("✅ Cắt nén & Lưu đè thành công!");

//             // Vẽ lại giao diện bài làm của học sinh
//             window.ham_7b_19_xem_bai_hoc_sinh(ChamBaiTL_State.uidDangCham);

//         } catch (e) {
//             alert("❌ Lỗi: " + e.message);
//             this.innerHTML = "💾 Lưu đè lên Drive";
//             this.disabled = false;
//         }
//     };
// };



// // =====================================================================
// // Hàm 7b.25: CẮT & NÉN ẢNH TRỰC TIẾP NGAY TẠI KHUNG (CÓ CHỌN ĐỘ PHÂN GIẢI)
// // =====================================================================
// window.ham_7b_25_mo_khung_cat_nen_anh = async function (linkGoc, idKetQua, idxAnh) {
//     // 1. Tải thư viện CropperJS nếu chưa có
//     if (typeof window.Cropper === 'undefined') {
//         Swal.fire({ title: 'Đang tải bộ công cụ...', didOpen: () => Swal.showLoading() });
//         await new Promise((resolve) => {
//             const link = document.createElement('link'); link.rel = 'stylesheet'; link.href = 'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.css'; document.head.appendChild(link);
//             const script = document.createElement('script'); script.src = 'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.js'; script.onload = resolve; document.head.appendChild(script);
//         });
//         Swal.close();
//     }

//     // 2. Tìm đúng thẻ img đang hiển thị trên giao diện
//     const imgId = `img_bai_lam_${idxAnh}`;
//     const imgEl = document.getElementById(imgId);
//     if (!imgEl) return alert("❌ Không tìm thấy khung ảnh!");

//     const khungChuaAnh = imgEl.parentElement;
//     const chieuCaoCu = khungChuaAnh.style.height || '500px';
//     const noiDungCu = khungChuaAnh.innerHTML; // Lưu lại để bấm Hủy

//     // Biến đổi khung chứa thành giao diện Cắt/Nén trực tiếp ngay tại chỗ (tăng chiều cao một chút để chứa menu chọn độ phân giải)
//     khungChuaAnh.style.height = '620px';
//     khungChuaAnh.innerHTML = `
//         <div style="width:100%; height:100%; display:flex; flex-direction:column; background:#222; position:relative;">
//             <div style="flex:1; position:relative; overflow:hidden; display:flex; align-items:center; justify-content:center;">
//                 <img id="inline_cropper_target_${idxAnh}" style="max-width:100%; max-height:100%; display:none;">
//                 <div id="inline_loading_${idxAnh}" style="position:absolute; color:white; font-size:14px; font-weight:bold;">⏳ Đang tải dữ liệu ảnh an toàn...</div>
//             </div>
            
//             <!-- THANH ĐIỀU KHIỂN & CHỌN ĐỘ PHÂN GIẢI -->
//             <div style="background:#333; padding:10px 15px; display:flex; justify-content:space-between; align-items:center; border-top:1px solid #444; flex-wrap:wrap; gap:10px;">
//                 <div style="display:flex; align-items:center; gap:8px;">
//                     <span style="color:#ffc107; font-size:12px; font-weight:bold;">📐 Chọn độ phân giải:</span>
//                     <select id="select_chat_luong_anh_${idxAnh}" style="padding:5px 8px; border-radius:4px; background:#fff; color:#333; font-weight:bold; font-size:12px; border:1px solid #ccc; outline:none; cursor:pointer;">
//                         <option value="ORIGINAL">✨ Giữ nguyên bản (Gốc)</option>
//                         <option value="2K">🖥️ Chuẩn 2K (Max 2560px)</option>
//                         <option value="FULLHD" selected>💻 Chuẩn Full HD (Max 1920px - Khuyên dùng)</option>
//                         <option value="HD">📱 Chuẩn HD (Max 1280px - Nhẹ nhất)</option>
//                     </select>
//                 </div>

//                 <div style="display:flex; gap:8px;">
//                     <button id="inline_btn_save_${idxAnh}" style="background:#28a745; color:white; border:none; padding:6px 14px; border-radius:4px; font-weight:bold; cursor:pointer; font-size:12px;" disabled>⏳ Đang tải...</button>
//                     <button id="inline_btn_cancel_${idxAnh}" style="background:#6c757d; color:white; border:none; padding:6px 14px; border-radius:4px; font-weight:bold; cursor:pointer; font-size:12px;">✖ Hủy</button>
//                 </div>
//             </div>
//         </div>
//     `;

//     const targetImg = document.getElementById(`inline_cropper_target_${idxAnh}`);
//     const loadingDiv = document.getElementById(`inline_loading_${idxAnh}`);
//     const btnSave = document.getElementById(`inline_btn_save_${idxAnh}`);
//     let cropperInstance;

//     // 3. Bóc tách File ID từ link Google Drive
//     let fileId = null;
//     let m = linkGoc.match(/\/d\/([a-zA-Z0-9_-]+)/) || linkGoc.match(/[?&]id=([a-zA-Z0-9_-]+)/);
//     if (m) fileId = m[1];

//     // 4. Lấy ảnh dạng Base64 thông qua Apps Script để vượt qua CORS hoàn toàn
//     if (fileId) {
//         try {
//             const res = await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
//                 method: "POST",
//                 body: JSON.stringify({ action: "get_image_base64", fileId: fileId })
//             });
//             const data = await res.json();

//             if (data.status === "success" && data.base64) {
//                 targetImg.src = data.base64;
//                 loadingDiv.style.display = 'none';
//                 targetImg.style.display = 'block';

//                 cropperInstance = new window.Cropper(targetImg, {
//                     viewMode: 2,
//                     autoCropArea: 0.95,
//                     background: false,
//                     responsive: true
//                 });

//                 btnSave.innerText = "💾 Lưu đè lên Drive";
//                 btnSave.disabled = false;
//             } else {
//                 throw new Error(data.message || "Không lấy được dữ liệu ảnh");
//             }
//         } catch (err) {
//             loadingDiv.innerHTML = `⚠️ Không tải được ảnh qua Server.<br><span style="color:#ffc107; font-size:11px;">Vui lòng bấm [Hủy] rồi dùng tính năng [Mở Tab Mới].</span>`;
//         }
//     } else {
//         loadingDiv.innerHTML = `⚠️ Không tìm thấy File ID hợp lệ.`;
//     }

//     // 5. Nút Hủy: Khôi phục lại khung ảnh ban đầu
//     document.getElementById(`inline_btn_cancel_${idxAnh}`).onclick = function () {
//         if (cropperInstance) cropperInstance.destroy();
//         khungChuaAnh.style.height = chieuCaoCu;
//         khungChuaAnh.innerHTML = noiDungCu;
//     };

//     // 6. Nút Lưu: Cắt, nén theo độ phân giải được chọn và upload thay thế lên Google Drive
//     btnSave.onclick = async function () {
//         if (!cropperInstance) return alert("❌ Ảnh chưa sẵn sàng!");

//         // Lấy cấu hình độ phân giải từ thẻ Select
//         const kieuChon = document.getElementById(`select_chat_luong_anh_${idxAnh}`).value;
//         let maxW = 1920;
//         let maxH = 1920;
//         let chatLuongJpeg = 0.8;

//         if (kieuChon === 'ORIGINAL') {
//             maxW = 10000;
//             maxH = 10000;
//             chatLuongJpeg = 0.92;
//         } else if (kieuChon === '2K') {
//             maxW = 2560; maxH = 2560;
//             chatLuongJpeg = 0.85;
//         } else if (kieuChon === 'FULLHD') {
//             maxW = 1920; maxH = 1920;
//             chatLuongJpeg = 0.8;
//         } else if (kieuChon === 'HD') {
//             maxW = 1280; maxH = 1280;
//             chatLuongJpeg = 0.7;
//         }

//         this.innerHTML = "⏳ Đang xử lý & Lưu...";
//         this.disabled = true;

//         try {
//             const canvas = cropperInstance.getCroppedCanvas({
//                 maxWidth: maxW,
//                 maxHeight: maxH,
//                 imageSmoothingEnabled: true,
//                 imageSmoothingQuality: 'high'
//             });

//             let b64Full = canvas.toDataURL('image/jpeg', chatLuongJpeg);
//             let b64Data = b64Full.includes(',') ? b64Full.split(',')[1] : b64Full;

//             let folderId = "1XaPQXF5RJ-Qreh_VBPKwJC8BsGdOM8dm";
//             const { data: nv } = await _supabase.from('nhiem_vu_tu_luan').select('metadata').eq('ma_nhiem_vu', ChamBaiTL_State.maNV).single();
//             if (nv && nv.metadata && nv.metadata.folder_id_drive) {
//                 folderId = nv.metadata.folder_id_drive;
//             }

//             const payload = {
//                 action: "upload_bai_nop",
//                 folderId: folderId,
//                 base64Data: b64Data,
//                 mimeType: "image/jpeg",
//                 fileName: `Anh_Cat_${kieuChon}_${new Date().getTime()}.jpg`
//             };

//             const res = await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
//                 method: "POST", body: JSON.stringify(payload)
//             });
//             const result = await res.json();

//             if (result.status !== 'success') throw new Error(result.message || "Lỗi máy chủ Drive");
//             let newUrl = result.url;

//             const kq = ChamBaiTL_State.dsKetQua.find(k => k.id === idKetQua);
//             let chiTiet = typeof kq.chi_tiet_lam_bai === 'string' ? JSON.parse(kq.chi_tiet_lam_bai) : kq.chi_tiet_lam_bai;

//             if (chiTiet.danh_sach_link_anh) chiTiet.danh_sach_link_anh[idxAnh] = newUrl;
//             else if (chiTiet.danh_sach_anh) chiTiet.danh_sach_anh[idxAnh] = newUrl;

//             const { error } = await _supabase.from('ket_qua_tu_luan').update({ chi_tiet_lam_bai: chiTiet }).eq('id', idKetQua);
//             if (error) throw error;

//             kq.chi_tiet_lam_bai = chiTiet;

//             alert("✅ Cắt nén thành công theo chuẩn [ " + kieuChon + " ] & Đã lưu đè lên Drive!");

//             // Vẽ lại giao diện bài làm của học sinh
//             window.ham_7b_19_xem_bai_hoc_sinh(ChamBaiTL_State.uidDangCham);

//         } catch (e) {
//             alert("❌ Lỗi: " + e.message);
//             this.innerHTML = "💾 Lưu đè lên Drive";
//             this.disabled = false;
//         }
//     };
// };


// =====================================================================
// Hàm 7b.25: CẮT & NÉN ẢNH GIỮ NGUYÊN TÊN GỐC ĐỂ ĐỒNG BỘ THÔNG TIN
// =====================================================================
window.ham_7b_25_mo_khung_cat_nen_anh = async function (linkGoc, idKetQua, idxAnh) {
    // 1. Tải thư viện CropperJS nếu chưa có
    if (typeof window.Cropper === 'undefined') {
        Swal.fire({ title: 'Đang tải bộ công cụ...', didOpen: () => Swal.showLoading() });
        await new Promise((resolve) => {
            const link = document.createElement('link'); link.rel = 'stylesheet'; link.href = 'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.css'; document.head.appendChild(link);
            const script = document.createElement('script'); script.src = 'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.js'; script.onload = resolve; document.head.appendChild(script);
        });
        Swal.close();
    }

    // 2. Tìm đúng thẻ img đang hiển thị trên giao diện
    const imgId = `img_bai_lam_${idxAnh}`;
    const imgEl = document.getElementById(imgId);
    if (!imgEl) return alert("❌ Không tìm thấy khung ảnh!");

    const khungChuaAnh = imgEl.parentElement;
    const chieuCaoCu = khungChuaAnh.style.height || '500px';
    const noiDungCu = khungChuaAnh.innerHTML; // Lưu lại để bấm Hủy

    // Biến đổi khung chứa thành giao diện Cắt/Nén trực tiếp ngay tại chỗ
    khungChuaAnh.style.height = '620px';
    khungChuaAnh.innerHTML = `
        <div style="width:100%; height:100%; display:flex; flex-direction:column; background:#222; position:relative;">
            <div style="flex:1; position:relative; overflow:hidden; display:flex; align-items:center; justify-content:center;">
                <img id="inline_cropper_target_${idxAnh}" src="${imgEl.src}" style="max-width:100%; max-height:100%; display:block;" crossorigin="anonymous">
            </div>
            
            <!-- THANH ĐIỀU KHIỂN & CHỌN ĐỘ PHÂN GIẢI -->
            <div style="background:#333; padding:10px 15px; display:flex; justify-content:space-between; align-items:center; border-top:1px solid #444; flex-wrap:wrap; gap:10px;">
                <div style="display:flex; align-items:center; gap:8px;">
                    <span style="color:#ffc107; font-size:12px; font-weight:bold;">📐 Chọn độ phân giải:</span>
                    <select id="select_chat_luong_anh_${idxAnh}" style="padding:5px 8px; border-radius:4px; background:#fff; color:#333; font-weight:bold; font-size:12px; border:1px solid #ccc; outline:none; cursor:pointer;">
                        <option value="ORIGINAL">✨ Giữ nguyên bản (Gốc)</option>
                        <option value="2K">🖥️ Chuẩn 2K (Max 2560px)</option>
                        <option value="FULLHD" selected>💻 Chuẩn Full HD (Max 1920px - Khuyên dùng)</option>
                        <option value="HD">📱 Chuẩn HD (Max 1280px - Nhẹ nhất)</option>
                    </select>
                </div>

                <div style="display:flex; gap:8px;">
                    <button id="inline_btn_save_${idxAnh}" style="background:#28a745; color:white; border:none; padding:6px 14px; border-radius:4px; font-weight:bold; cursor:pointer; font-size:12px;">💾 Lưu đè lên Drive</button>
                    <button id="inline_btn_cancel_${idxAnh}" style="background:#6c757d; color:white; border:none; padding:6px 14px; border-radius:4px; font-weight:bold; cursor:pointer; font-size:12px;">✖ Hủy</button>
                </div>
            </div>
        </div>
    `;

    const targetImg = document.getElementById(`inline_cropper_target_${idxAnh}`);
    let cropperInstance;

    // 3. Khởi tạo Cropper trực tiếp
    try {
        cropperInstance = new window.Cropper(targetImg, {
            viewMode: 2,
            autoCropArea: 0.95,
            background: false,
            responsive: true
        });
    } catch (err) {
        console.error("Lỗi khởi tạo Cropper trực tiếp:", err);
        alert("⚠️ Trình duyệt chặn quyền đọc ảnh này do bảo mật Google Drive. Thầy/Cô hãy dùng nút [Mở Tab Mới].");
    }

    // 4. Nút Hủy: Khôi phục lại khung ảnh ban đầu y nguyên
    document.getElementById(`inline_btn_cancel_${idxAnh}`).onclick = function () {
        if (cropperInstance) cropperInstance.destroy();
        khungChuaAnh.style.height = chieuCaoCu;
        khungChuaAnh.innerHTML = noiDungCu;
    };

    // 5. Nút Lưu: Xử lý xuất ảnh và giữ nguyên tên gốc kết hợp độ phân giải
    document.getElementById(`inline_btn_save_${idxAnh}`).onclick = async function () {
        if (!cropperInstance) return alert("❌ Ảnh chưa sẵn sàng!");

        // Lấy cấu hình độ phân giải từ thẻ Select
        const kieuChon = document.getElementById(`select_chat_luong_anh_${idxAnh}`).value;
        let maxW = 1920;
        let maxH = 1920;
        let chatLuongJpeg = 0.8;

        if (kieuChon === 'ORIGINAL') {
            maxW = 10000;
            maxH = 10000;
            chatLuongJpeg = 0.92;
        } else if (kieuChon === '2K') {
            maxW = 2560; maxH = 2560;
            chatLuongJpeg = 0.85;
        } else if (kieuChon === 'FULLHD') {
            maxW = 1920; maxH = 1920;
            chatLuongJpeg = 0.8;
        } else if (kieuChon === 'HD') {
            maxW = 1280; maxH = 1280;
            chatLuongJpeg = 0.7;
        }

        this.innerHTML = "⏳ Đang xử lý & Lưu...";
        this.disabled = true;

        try {
            // 🌟 TỰ ĐỘNG BÓC TÁCH TÊN FILE GỐC ĐANG HIỂN THỊ TRÊN GIAO DIỆN
            let tenFileGoc = `Anh_Da_Cat_${new Date().getTime()}.jpg`;
            const infoBox = document.getElementById(`info_file_box_${idxAnh}`);
            if (infoBox) {
                const txtTen = infoBox.querySelector('.txt-ten-file');
                if (txtTen && txtTen.innerText && txtTen.innerText !== 'Đang đọc từ Drive...' && txtTen.innerText !== 'Đang quét...') {
                    tenFileGoc = txtTen.innerText;
                }
            }
            // Tạo tên file mới dựa trên tên gốc (giữ nguyên mã NV, tên HS, đổi đuôi thành .jpg và thêm hậu tố _cat)
            let tenFileMoi = tenFileGoc.replace(/\.[^/.]+$/, "") + `_cat_${kieuChon}.jpg`;

            const canvas = cropperInstance.getCroppedCanvas({
                maxWidth: maxW,
                maxHeight: maxH,
                imageSmoothingEnabled: true,
                imageSmoothingQuality: 'high'
            });

            let b64Full = canvas.toDataURL('image/jpeg', chatLuongJpeg);
            let b64Data = b64Full.includes(',') ? b64Full.split(',')[1] : b64Full;

            let folderId = "1XaPQXF5RJ-Qreh_VBPKwJC8BsGdOM8dm";
            const { data: nv } = await _supabase.from('nhiem_vu_tu_luan').select('metadata').eq('ma_nhiem_vu', ChamBaiTL_State.maNV).single();
            if (nv && nv.metadata && nv.metadata.folder_id_drive) {
                folderId = nv.metadata.folder_id_drive;
            }

            const payload = {
                action: "upload_bai_nop",
                folderId: folderId,
                base64Data: b64Data,
                mimeType: "image/jpeg",
                fileName: tenFileMoi // 🌟 Sử dụng tên file thông minh giữ nguyên thông tin gốc
            };

            const res = await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
                method: "POST", body: JSON.stringify(payload)
            });
            const result = await res.json();

            if (result.status !== 'success') throw new Error(result.message || "Lỗi máy chủ Drive");
            let newUrl = result.url;

            const kq = ChamBaiTL_State.dsKetQua.find(k => k.id === idKetQua);
            let chiTiet = typeof kq.chi_tiet_lam_bai === 'string' ? JSON.parse(kq.chi_tiet_lam_bai) : kq.chi_tiet_lam_bai;

            if (chiTiet.danh_sach_link_anh) chiTiet.danh_sach_link_anh[idxAnh] = newUrl;
            else if (chiTiet.danh_sach_anh) chiTiet.danh_sach_anh[idxAnh] = newUrl;

            const { error } = await _supabase.from('ket_qua_tu_luan').update({ chi_tiet_lam_bai: chiTiet }).eq('id', idKetQua);
            if (error) throw error;

            kq.chi_tiet_lam_bai = chiTiet;

            alert("✅ Cắt nén thành công và lưu đè file với tên: " + tenFileMoi);

            // Vẽ lại giao diện bài làm của học sinh
            window.ham_7b_19_xem_bai_hoc_sinh(ChamBaiTL_State.uidDangCham);

        } catch (e) {
            alert("❌ Lỗi: " + e.message);
            this.innerHTML = "💾 Lưu đè lên Drive";
            this.disabled = false;
        }
    };
};

// =====================================================================
// HÀM CHUẨN: XỬ LÝ, GIỚI HẠN VÀ NÉN ẢNH TỐI ĐA FULL HD (1920px) KHI HỌC SINH CHỌN FILE
// =====================================================================
window.ham_xu_ly_va_nen_anh_hoc_sinh = async function (file) {
    return new Promise((resolve, reject) => {
        // Kiểm tra xem có phải file ảnh không
        if (!file || !file.type.startsWith('image/')) {
            return resolve(file); // Nếu không phải ảnh (như PDF, Word) thì giữ nguyên
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.onload = function () {
                let width = img.width;
                let height = img.height;

                // 🌟 GIỚI HẠN TỐI ĐA FULL HD (1920x1920 px)
                const MAX_WIDTH = 1920;
                const MAX_HEIGHT = 1920;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height = Math.round((height * MAX_WIDTH) / width);
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width = Math.round((width * MAX_HEIGHT) / height);
                        height = MAX_HEIGHT;
                    }
                }

                // Vẽ lại ảnh lên Canvas với kích thước đã giới hạn
                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                // Xuất ra định dạng JPEG với chất lượng 0.8 (Đảm bảo sắc nét để chấm bài nhưng dung lượng cực nhẹ)
                canvas.toBlob((blob) => {
                    if (!blob) {
                        return reject(new Error("Lỗi nén ảnh"));
                    }
                    // Tạo lại đối tượng File mới với tên cũ nhưng dung lượng đã được thu gọn
                    const compressedFile = new File([blob], file.name, {
                        type: 'image/jpeg',
                        lastModified: Date.now()
                    });
                    resolve(compressedFile);
                }, 'image/jpeg', 0.8);
            };
            img.onerror = () => reject(new Error("Không đọc được dữ liệu ảnh"));
            img.src = e.target.result;
        };
        reader.onerror = () => reject(new Error("Lỗi đọc file"));
        reader.readAsDataURL(file);
    });
};


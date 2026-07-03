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
        const resDrive = await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_TU_LUAN, {
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
                        <button onclick="alert('Tính năng chấm bài Tự luận sẽ được kết nối sau!')" style="padding: 6px; background: #28a745; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; font-size: 11px;">✍️ Chấm bài</button>
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




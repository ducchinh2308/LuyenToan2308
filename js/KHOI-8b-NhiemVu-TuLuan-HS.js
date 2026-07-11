// ==============================================================================
// KHỐI 8b: BẢNG ĐIỀU KHIỂN NHIỆM VỤ TỰ LUẬN (GÓC HỌC SINH)
// ==============================================================================

window.NhiemVuTuLuanHS_State = {
    uidHocSinh: null,
    danhSachLop: [],
    tenHocSinh: "",
    duLieuNhiemVu: [],
    duLieuKetQua: []
};

const TuLuanHS_State = {
    maNhiemVu: null,
    uidHocSinh: null,
    linkAnhDaUpload: [],
    batDauLuc: null
};

// ==============================================================================
// Hàm 16.1: Giao diện chính Phòng thi Tự luận (Nhận vào maNhiemVu)
// ==============================================================================
// ==============================================================================
// Hàm 16.1: Giao diện chính Phòng thi Tự luận (Bản ĐẦY ĐỦ - Sửa lỗi isText)
// ==============================================================================
window.ham_8b_1_mo_phong_thi_tu_luan = async function (maNhiemVu, uidHocSinh) {
    const app = document.getElementById('dashboard-container');

    // 1. TÌM LẠI DỮ LIỆU NHIỆM VỤ TỪ STATE
    const nhiemVuData = GocHocSinhState.danhSachNhiemVuTuLuan.find(nv => nv.ma_nhiem_vu === maNhiemVu);
    if (!nhiemVuData) {
        app.innerHTML = `<div style="text-align:center; padding: 50px; color:red;"><h3>❌ Lỗi: Không tìm thấy dữ liệu nhiệm vụ [${maNhiemVu}]!</h3><button onclick="ham_8b_1_tai_nhiem_vu_tu_luan_cua_toi(GocHocSinhState.uid, GocHocSinhState.danh_sach_ma_lop, '')">Quay lại</button></div>`;
        return;
    }

    TuLuanHS_State.maNhiemVu = maNhiemVu;
    TuLuanHS_State.uidHocSinh = uidHocSinh;
    TuLuanHS_State.linkAnhDaUpload = [];
    TuLuanHS_State.batDauLuc = new Date().toISOString();

    //console.log("🚀 Mở phòng thi Tự luận với mã:", maNhiemVu, uidHocSinh);

    // =====================================================================
    // 🌟 TRUY VẤN LẤY METADATA CHUẨN TỪ BẢNG HỌC LIỆU TỰ LUẬN
    // =====================================================================
    let meta = {};
    if (nhiemVuData.ma_hoc_lieu) {
        try {
            app.innerHTML = `<div style="text-align:center; padding:40px; color:#6f42c1;">⏳ Đang tải nội dung đề thi...</div>`; // Báo hiệu cho học sinh

            // Gọi thẳng vào bảng hoc_lieu_tu_luan bằng mã học liệu
            const { data: hlData, error: errHL } = await _supabase
                .from('hoc_lieu_tu_luan')
                .select('metadata')
                .eq('ma_hoc_lieu', nhiemVuData.ma_hoc_lieu)
                .single();

            if (hlData && hlData.metadata) {
                meta = hlData.metadata;
            } else if (errHL) {
                console.error("❌ Lỗi truy vấn bảng học liệu:", errHL);
            }
        } catch (error) {
            console.error("❌ Lỗi kết nối Supabase khi lấy học liệu:", error);
        }
    } else {
        // Fallback (Phòng hờ) nếu không có mã học liệu thì lấy tạm metadata của nhiệm vụ
        meta = nhiemVuData.metadata || {};
    }

    // 🌟 ÉP KIỂU AN TOÀN (Nếu Supabase trả về chuỗi thay vì Object)
    if (typeof meta === 'string') {
        try {
            meta = JSON.parse(meta);
        } catch (e) {
            console.error("Lỗi parse metadata:", e);
            meta = {};
        }
    }

    // Lưu metadata vào State chung để các hàm khác có thể dùng chung (VD: hàm lưu bài cũng cần đọc folder_id_drive)
    // Gom cả metadata của nhiệm vụ (để lấy thư mục) và của học liệu (để lấy đề) lại làm 1
    let metaNhiemVu = typeof nhiemVuData.metadata === 'string' ? JSON.parse(nhiemVuData.metadata) : (nhiemVuData.metadata || {});
    TuLuanHS_State.metadata = { ...metaNhiemVu, ...meta };

    // =====================================================================
    // 🌟 PHÂN LOẠI HIỂN THỊ ĐỀ BÀI (TEXT HAY FILE)
    // =====================================================================
    // DÒNG NÀY RẤT QUAN TRỌNG: Khai báo biến isText để tránh lỗi "is not defined"
    const isText = (meta.loai_tu_luan === 'text' || meta.kieu_de_tu_luan === 'van_ban');
    console.log(meta.noi_dung_chinh, meta.noi_dung_de, meta.loai_tu_luan, meta.kieu_de_tu_luan);
    let htmlDeBai = "";

    //console.log("qc Phân loại đề bài Tự luận:", isText ? "Soạn trực tiếp (Text)" : "Đính kèm File", meta);

    if (isText) {
        // TRƯỜNG HỢP 1: ĐỀ VĂN BẢN -> HIỆN NỘI DUNG RA LUÔN
        const noiDungText = meta.noi_dung_chinh || meta.noi_dung_de || 'Chưa có nội dung đề bài.';

        htmlDeBai = `
            <div style="padding: 20px; background: white; border: 1px solid #dee2e6; border-radius: 8px; font-size: 15px; line-height: 1.6; text-align: left; box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);">
                <h4 style="margin-top: 0; color: #d35400; border-bottom: 2px dashed #ffe8a1; padding-bottom: 10px; margin-bottom: 15px;">📝 NỘI DUNG ĐỀ BÀI:</h4>
                <div style="white-space: pre-wrap; font-weight: 500; color: #2c3e50;">${noiDungText}</div>
            </div>`;
    }
    else if (nhiemVuData.ma_hoc_lieu) {
        // TRƯỜNG HỢP 2: ĐỀ DẠNG FILE -> TRUY VẤN URL VÀ HIỆN NÚT BẤM
        let urlDeBai = "";
        try {
            const { data: hlData } = await _supabase
                .from('hoc_lieu_tu_luan')
                .select('url_github')
                .eq('ma_hoc_lieu', nhiemVuData.ma_hoc_lieu)
                .maybeSingle();

            if (hlData && hlData.url_github) {
                urlDeBai = hlData.url_github;
            }
        } catch (err) {
            console.error("Lỗi khi lấy URL đề bài từ Supabase:", err);
        }

        let btnMoDe = "";
        if (urlDeBai) {
            btnMoDe = `<button type="button" onclick="window.open('${urlDeBai}', '_blank')" style="padding: 12px 30px; background: #1a73e8; color: white; border: none; border-radius: 6px; font-weight: bold; font-size: 15px; cursor: pointer; display: inline-block; box-shadow: 0 4px 6px rgba(26,115,232,0.3); transition: 0.2s;" onmouseover="this.style.background='#1557b0'" onmouseout="this.style.background='#1a73e8'">📄 MỞ XEM FILE ĐỀ BÀI (Tab mới)</button>`;
        } else {
            btnMoDe = `<button type="button" disabled style="padding: 12px 30px; background: #6c757d; color: white; border: none; border-radius: 6px; font-weight: bold; font-size: 15px; cursor: not-allowed; display: inline-block;">⚠️ Chưa có link file đề bài</button>`;
        }

        htmlDeBai = `
            <div style="padding: 20px; background: #e8f4fd; border: 1px solid #b8daff; border-radius: 8px; text-align: center;">
                <p style="margin: 0 0 15px 0; color: #0056b3; font-weight: bold; font-size: 14px;">Mã học liệu đính kèm: ${nhiemVuData.ma_hoc_lieu}</p>
                ${btnMoDe}
            </div>`;
    }
    else {
        htmlDeBai = `<div style="padding: 20px; background: #fff3cd; border: 1px solid #ffeeba; border-radius: 6px; color: #856404; font-weight: bold; text-align: center;">Chưa có nội dung đề bài.</div>`;
    }

    // =====================================================================
    // 🌟 RENDER GIAO DIỆN PHÒNG THI
    // =====================================================================
    app.innerHTML = `
        <div style="max-width: 850px; margin: 0 auto; padding: 20px; background: #f4f6f9; min-height: 100vh;">
            <div style="background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); margin-bottom: 20px;">
                <div style="text-align: center; border-bottom: 2px solid #f1f3f4; padding-bottom: 15px; margin-bottom: 20px;">

                    <div style="font-size: 14px; font-weight: bold; color: #6c757d; margin-bottom: 8px; text-transform: uppercase;">
                        Mã nhiệm vụ:
                        <span style="color: #d35400; background: #fff5eb; padding: 3px 10px; border-radius: 6px; border: 1px solid #ffe8d6; margin-left: 5px;">
                            ${nhiemVuData.ma_nhiem_vu}
                        </span>
                    </div>

                    <h2 style="margin: 0; font-size: 22px; color: #6c757d;">
                        Tên nhiệm vụ: 
                        <span style="color: #6f42c1;">
                            ${nhiemVuData.ten_nhiem_vu}
                        </span>
                    </h2>

                </div>
                <div>${htmlDeBai}</div>
            </div>

            <div style="background: white; padding: 30px 20px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border: 2px dashed #0056b3; text-align: center;">
                <h3 style="color: #0056b3; margin-top: 0; font-size: 18px;">📷 NỘP BÀI LÀM TỰ LUẬN</h3>
                <p style="font-size: 14px; color: #666; margin-bottom: 20px;">
                    Em hãy trình bày bài làm ra giấy, TRÊN MỖI TRANG, trước khi chụp phải ghi rõ HỌ TÊN - LỚP - THỨ TỰ TRANG / TỔNG SỐ TRANG, rồi chụp lại thật rõ nét rồi tải lên.
                </p>
                <input type="file" id="input_anh_tu_luan" accept="image/*" multiple style="display: none;" onchange="ham_8b_6_xu_ly_chon_anh(this)">
                <button onclick="document.getElementById('input_anh_tu_luan').click()" style="padding: 12px 30px; background: #28a745; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 15px; box-shadow: 0 4px 6px rgba(40,167,69,0.3); transition: 0.2s;" onmouseover="this.style.background='#218838'" onmouseout="this.style.background='#28a745'">
                    📸 MỞ CAMERA / CHỌN ẢNH BÀI LÀM
                </button>
                <div id="luoi_anh_da_nop" style="display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; margin-top: 25px;"></div>
            </div>

            <div style="margin-top: 25px; display: flex; gap: 15px; justify-content: center;">
                <button onclick="ham_8b_4_quay_lai_danh_sach()" style="padding: 15px 30px; background: #6c757d; color: white; border: none; border-radius: 8px; font-weight: bold; font-size: 15px; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#5a6268'" onmouseout="this.style.background='#6c757d'">
                    ⬅️ QUAY LẠI SAU
                </button>
                <button id="btn_nop_bai_chinh_thuc" onclick="ham_8b_9_nop_bai_ve_supabase()" style="padding: 15px 40px; background: #dc3545; color: white; border: none; border-radius: 8px; font-weight: 900; font-size: 16px; cursor: pointer; flex: 1; box-shadow: 0 4px 6px rgba(220,53,69,0.3); transition: 0.2s;" onmouseover="this.style.background='#c82333'" onmouseout="this.style.background='#dc3545'">
                    🚀 HOÀN THÀNH & GỬI BÀI
                </button>
            </div>
        </div>
    `;
};

// =====================================================================
// Hàm 8b.2: Load Nhiệm vụ TỰ LUẬN (Dạng Tab - Phân loại thông minh)
// =====================================================================
window.ham_8b_2_tab_nhiem_vu_tu_luan = async function () {
    const vungLamViec = document.getElementById('vung-lam-viec-hoc-sinh');
    vungLamViec.innerHTML = `<div style="text-align: center; padding: 40px;"><h3 style="color:#6f42c1;">⏳ Đang tải dữ liệu phân hệ Tự Luận...</h3></div>`;
//console.log("🚀 Bắt đầu tải dữ liệu Nhiệm vụ Tự Luận cho HS:", GocHocSinhState.uid);
    try {
        let dsLop = GocHocSinhState.danh_sach_ma_lop || [];
        if (dsLop.length === 0) dsLop = ["#KHONG_CO_LOP#"];

        const orQuery = dsLop.map(ma => {
            const giaTriJson = JSON.stringify([ma]);
            return `danh_sach_lop.cs."${giaTriJson.replace(/"/g, '\\"')}"`;
        }).join(',');

        // 1. TẢI TỪ BẢNG NHIỆM VỤ TỰ LUẬN
        try {
            const { data: dsNV, error: errNV } = await _supabase
                .from('nhiem_vu_tu_luan')
                .select('*')
                .eq('trang_thai', 1)
                .or(orQuery)
                .order('ngay_tao', { ascending: false });

            if (errNV) throw errNV;
            GocHocSinhState.danhSachNhiemVuTuLuan = dsNV || [];
        } catch (error) { console.error("Lỗi lấy NV Tự Luận:", error); }

        let demSoLuotLam = {};
        let ketQuaGanNhat = {};

        // 2. TẢI TỪ BẢNG KẾT QUẢ TỰ LUẬN (Thay vì Trắc nghiệm)
        try {
            const { data: hsData } = await _supabase.from('hoc_sinh').select('tien_do_lam_bai').eq('uid', GocHocSinhState.uid).single();
            if (hsData && hsData.tien_do_lam_bai) {
                demSoLuotLam = typeof hsData.tien_do_lam_bai === 'string' ? JSON.parse(hsData.tien_do_lam_bai) : hsData.tien_do_lam_bai;
            }

            const { data: dsKQ } = await _supabase
                .from('ket_qua_tu_luan') // Lấy từ bảng kết quả tự luận
                .select('id, ma_nhiem_vu, tong_diem, thoi_gian_nop, nhan_xet_gv, trang_thai_cham')
                .eq('uid_hoc_sinh', GocHocSinhState.uid)
                .order('thoi_gian_nop', { ascending: true });

            if (dsKQ) {
                dsKQ.forEach(kq => {
                    ketQuaGanNhat[kq.ma_nhiem_vu] = {
                        id: kq.id,
                        diem: kq.tong_diem,
                        thoi_gian_nop: kq.thoi_gian_nop,
                        nhan_xet_gv: kq.nhan_xet_gv,
                        trang_thai_cham: kq.trang_thai_cham
                    };
                });
            }
        } catch (e) { console.error("Lỗi lấy kết quả Tự Luận:", e); }

        // Tải từ điển lớp học và danh sách UID giáo viên
        let tuDienLop = {}; let tuDienGv = {}; let tapUidGv = new Set();
        const { data: dataLop } = await _supabase.from('lop_hoc').select('ma_lop, ten_lop, uid_gv_tao').in('ma_lop', dsLop);
        if (dataLop) {
            dataLop.forEach(l => { tuDienLop[l.ma_lop] = l.ten_lop; if (l.uid_gv_tao) tapUidGv.add(l.uid_gv_tao); });
        }
        GocHocSinhState.danhSachNhiemVuTuLuan.forEach(nv => { if (nv.uid_gv_tao) tapUidGv.add(nv.uid_gv_tao); });
        if (tapUidGv.size > 0) {
            const { data: dataGv } = await _supabase.from('hoc_sinh').select('uid, ten').in('uid', Array.from(tapUidGv));
            if (dataGv) { dataGv.forEach(gv => tuDienGv[gv.uid] = gv.ten); }
        }

        // =====================================================================
        // 🌟 TỰ ĐỘNG TẢI THÔNG TIN TỪ BẢNG HỌC LIỆU TỰ LUẬN
        // =====================================================================
        let tuDienThongTinHL = {};
        let tapMaHocLieu = new Set();
        GocHocSinhState.danhSachNhiemVuTuLuan.forEach(nv => { if (nv.ma_hoc_lieu) tapMaHocLieu.add(nv.ma_hoc_lieu); });

        if (tapMaHocLieu.size > 0) {
            try {
                const { data: dataHL } = await _supabase
                    .from('hoc_lieu_tu_luan')
                    .select('ma_hoc_lieu, metadata')
                    .in('ma_hoc_lieu', Array.from(tapMaHocLieu));

                if (dataHL) {
                    dataHL.forEach(hl => {
                        if (hl.metadata) {
                            try {
                                const meta = typeof hl.metadata === 'string' ? JSON.parse(hl.metadata) : hl.metadata;
                                // Lấy kiểu đề (File hay Soạn Text) để hiển thị cho HS biết
                                const dangDe = (meta.loai_tu_luan === 'text' || meta.kieu_de_tu_luan === 'van_ban') ? '📝 Soạn trực tiếp' : '📂 Đính kèm File';
                                tuDienThongTinHL[hl.ma_hoc_lieu] = dangDe;
                            } catch (e) { console.error("Lỗi phân giải metadata HL Tự Luận:", e); }
                        }
                    });
                }
            } catch (errHL) { console.error("Lỗi lấy thông tin học liệu tự luận:", errHL); }
        }

        // =====================================================================
        // 3. LOGIC PHÂN LOẠI CHÍNH XÁC (DỰA VÀO LƯỢT VÀ THỜI GIAN)
        // =====================================================================
        const now = new Date();
        let dsCanLam = [], dsLamLai = [], dsChuaLamKhoa = [], dsDaLamKhoa = [];
        const anToanThoiGian = (chuoiThoiGian) => chuoiThoiGian ? new Date(chuoiThoiGian) : null;

        GocHocSinhState.danhSachNhiemVuTuLuan.forEach(nv => {
            const tDong = anToanThoiGian(nv.thoi_gian_dong);
            const soLuotDaLam = demSoLuotLam[nv.ma_nhiem_vu] || 0;
            const gioiHanLuot = parseInt(nv.so_luot_lam_bai) || 0;

            const daQuaHan = (tDong && now.getTime() > tDong.getTime());
            const daHetLuot = (gioiHanLuot > 0 && soLuotDaLam >= gioiHanLuot);

            if (soLuotDaLam === 0) {
                if (daQuaHan) { dsChuaLamKhoa.push(nv); } else { dsCanLam.push(nv); }
            } else {
                if (daQuaHan || daHetLuot) { dsDaLamKhoa.push(nv); } else { dsLamLai.push(nv); }
            }
        });

        const tinhKhoangCachThoiGian = (targetDate) => {
            if (!targetDate) return "";
            const diff = targetDate.getTime() - now.getTime();
            const d = Math.floor(Math.abs(diff) / (1000 * 60 * 60 * 24));
            const h = Math.floor((Math.abs(diff) / (1000 * 60 * 60)) % 24);
            const m = Math.floor((Math.abs(diff) / (1000 * 60)) % 60);
            let str = "";
            if (d > 0) str += `${d} ngày `; if (h > 0) str += `${h} giờ `; if (m > 0 && d === 0) str += `${m} phút`;
            return diff > 0 ? `(Còn ${str || "vài giây"})` : `(Đã đóng ${str || "vài giây"} trước)`;
        };

        const renderCard = (nv, dinhDangTab) => {
            const tDong = anToanThoiGian(nv.thoi_gian_dong);
            const fTime = (d) => d ? d.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }) : "Không quy định";

            let tenLopHienThi = "Không xác định"; let chuoiMangLopGoc = "[]";
            try {
                const mangLopCuaNV = typeof nv.danh_sach_lop === 'string' ? JSON.parse(nv.danh_sach_lop) : (nv.danh_sach_lop || []);
                chuoiMangLopGoc = JSON.stringify(mangLopCuaNV);
                const cacLopKhop = mangLopCuaNV.filter(m => dsLop.includes(m)).map(m => tuDienLop[m] || m);
                if (cacLopKhop.length > 0) tenLopHienThi = cacLopKhop.join(', ');
            } catch (e) { }

            const tenGV = tuDienGv[nv.uid_gv_tao] || "Thầy/Cô";
            const dangDeHL = tuDienThongTinHL[nv.ma_hoc_lieu] || "Tự luận";

            const soLuotDaLam = demSoLuotLam[nv.ma_nhiem_vu] || 0;
            const gioiHanLuot = nv.so_luot_lam_bai || 0;
            const daQuaHan = (tDong && now.getTime() > tDong.getTime());
            const daHetLuot = (gioiHanLuot > 0 && soLuotDaLam >= gioiHanLuot);

            let mauVien = "#6f42c1", textBadgeTrangThai = ""; // Tông Tím cho Tự luận
            if (dinhDangTab === 'CHUA_LAM_KHOA') { mauVien = "#7f8c8d"; textBadgeTrangThai = "⬛ CHƯA LÀM (QUÁ HẠN)"; }
            else if (dinhDangTab === 'DA_LAM_KHOA') { mauVien = "#e74c3c"; textBadgeTrangThai = "🟥 ĐÃ NỘP (ĐÃ KHÓA)"; }
            else if (dinhDangTab === 'LAM_LAI') { mauVien = "#00b4d8"; textBadgeTrangThai = "🟨 ĐÃ NỘP (CÒN LƯỢT)"; }
            else { mauVien = "#6f42c1"; textBadgeTrangThai = "🟩 CHƯA LÀM (MỚI)"; }

            const kqLatest = ketQuaGanNhat[nv.ma_nhiem_vu];

            let htmlKetQua = "";
            let nutXemLai = "";

            if (soLuotDaLam > 0 && kqLatest) {
                // Phân biệt Trạng thái Chấm của Tự luận
                if (kqLatest.trang_thai_cham === 1 || kqLatest.diem !== null) {
                    htmlKetQua = `
                        <div style="background: #e8f5e9; border: 1px dashed #28a745; border-radius: 8px; padding: 10px; margin-bottom: 12px;">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <div style="font-size: 10px; color: #2e7d32; font-weight: bold;">⭐ ĐIỂM SỐ CỦA THẦY:</div>
                                    <div style="color: #c0392b; font-size: 20px; font-weight: 900;">${kqLatest.diem !== null ? kqLatest.diem : '-'} <span style="font-size: 11px; font-weight: normal; color: #666;">điểm</span></div>
                                </div>
                            </div>
                            ${kqLatest.nhan_xet_gv ? `<div style="font-size: 12px; color: #555; margin-top: 5px; font-style: italic;">📝 Lời phê: ${kqLatest.nhan_xet_gv}</div>` : ''}
                        </div>
                    `;
                } else {
                    htmlKetQua = `
                        <div style="background: #e0f7fa; border: 1px dashed #00838f; border-radius: 8px; padding: 10px; margin-bottom: 12px; text-align: center;">
                            <div style="color: #00838f; font-weight: bold; font-size: 13px;">📸 Đã nộp ảnh bài làm</div>
                            <div style="color: #666; font-size: 11px;">(Đang chờ thầy/cô chấm điểm)</div>
                        </div>
                    `;
                }

                // Nút xem lại bài nộp (Bật popup ảnh Khối 16)
                nutXemLai = `<button onclick="ham_8b_10_hs_xem_lai_bai_nop('${nv.ma_nhiem_vu}', '${kqLatest.id}')" style="width: 100%; padding: 8px; background: white; color: ${mauVien}; border: 1px solid ${mauVien}; border-radius: 6px; font-weight: bold; font-size: 12px; cursor: pointer; margin-bottom: 8px;">👁️ XEM BÀI ĐÃ NỘP</button>`;
            }

            console.log("mã nv:", nv.ma_nhiem_vu);
            let nutHanhDong = "";
            if (dinhDangTab === 'CHUA_LAM_KHOA') {
                const safeName = (nv.ten_nhiem_vu || "Nhiệm vụ").replace(/'/g, "\\'");
                nutHanhDong = `<button onclick="alert('Tính năng xin nộp quá hạn Tự luận đang hoàn thiện!')" style="width: 100%; padding: 11px; background: #7f8c8d; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">🙋 XIN NỘP QUÁ HẠN</button>`;
            } else if (dinhDangTab === 'DA_LAM_KHOA') {
                nutHanhDong = `<button disabled style="width: 100%; padding: 11px; background: #e9ecef; color: #6c757d; border: none; border-radius: 6px; font-weight: bold; cursor: not-allowed;">🔒 ĐÃ KHÓA NỘP BÀI</button>`;
            } else if (dinhDangTab === 'LAM_LAI') {
                nutHanhDong = `<button onclick="ham_8b_3_vao_lam_bai_tu_luan('${nv.ma_nhiem_vu}')" style="width: 100%; padding: 11px; background: #00b4d8; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">🔄 NỘP LẠI (sẽ xóa kết quả cũ)</button>`;
            } else {
                nutHanhDong = `<button onclick="ham_8b_3_vao_lam_bai_tu_luan('${nv.ma_nhiem_vu}')" style="width: 100%; padding: 11px; background: #6f42c1; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; box-shadow: 0 4px 6px rgba(111,66,193,0.2);">✍️ BẮT ĐẦU LÀM BÀI</button>`;
            }

            return `
                <div class="card-nhiem-vu-hs" data-mangs-lop='${chuoiMangLopGoc}' style="background: white; border: 1px solid #e0e0e0; border-top: 4px solid ${mauVien}; border-radius: 10px; padding: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.02); display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <div style="font-size: 11px; font-weight: bold; color: ${mauVien}; margin-bottom: 6px; text-transform: uppercase;">${textBadgeTrangThai}</div>
                        <h4 style="margin: 0 0 10px 0; color: #2c3e50; font-size: 15px; line-height: 1.4;">${nv.ten_nhiem_vu}</h4>
                        <div style="background: #f8f9fa; border-radius: 6px; padding: 8px; margin-bottom: 10px; font-size: 12px; color: #666;">
                            <div>🏫 <b>Lớp:</b> ${tenLopHienThi}</div>
                            <div>👤 <b>Thầy/Cô:</b> ${tenGV}</div>
                            <div style="color: #6f42c1; margin-top: 2px;">📄 <b>Dạng đề:</b> ${dangDeHL}</div>
                        </div>
                        <div style="display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 10px;">
                            <span style="font-size: 11px; background: #e9ecef; color: #495057; padding: 2px 6px; border-radius:4px;">⏱️ Tự do</span>
                            <span style="font-size: 11px; background: #e9ecef; color: #495057; padding: 2px 6px; border-radius:4px;">🔄 Lượt: ${soLuotDaLam}/${gioiHanLuot === 0 ? "Vô hạn" : gioiHanLuot}</span>
                        </div>
                        <div style="font-size: 11px; color: #7f8c8d; margin-bottom: 12px;">
                            <span style="color:#7f8c8d; font-weight:bold;">Hạn chót:</span> ${fTime(tDong)} <br>
                            <span style="color:#d35400; font-style:italic;">${tDong && !daQuaHan ? tinhKhoangCachThoiGian(tDong) : ""}</span>
                        </div>
                    </div>
                    <div>
                        ${htmlKetQua}
                        ${nutXemLai}
                        ${nutHanhDong}
                    </div>
                </div>
            `;
        };

        vungLamViec.innerHTML = `
            <div id="thanh-loc-lop-goc-hoc-sinh-tl" style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 15px; padding: 10px; background: #fff; border-radius: 8px; border: 1px dashed #ced4da; align-items: center;">
                <span style="font-weight: bold; color: #495057; font-size: 13px;">🏫 Lớp đang xem:</span>
                <button class="btn-loc-lop-cua-hs-tl active" onclick="ham_8b_16_loc_card_theo_lop_tu_luan('TAT_CA', this)" style="padding: 5px 12px; background: #6f42c1; color: white; border: 1px solid #6f42c1; border-radius: 15px; font-weight: bold; cursor: pointer; font-size: 12px; transition: 0.2s;">🌍 Tất cả các lớp</button>
                <span id="cac-nut-lop-hs-loc-tl" style="display: flex; gap: 8px; flex-wrap: wrap;"></span>
            </div>

            <div style="display: flex; border-bottom: 2px solid #dee2e6; margin-bottom: 20px; gap: 5px; background: #fff; padding: 5px 5px 0 5px; border-radius: 8px 8px 0 0; flex-wrap: wrap;">
                <button id="btn-tab-can-lam-tl" onclick="ham_8b_17_switch_sub_tab_tu_luan('CAN_LAM')" style="padding: 10px 16px; border: none; background: #6f42c1; color: white; font-weight: bold; font-size: 13px; border-radius: 6px 6px 0 0; cursor: pointer;">🎯 CẦN LÀM (${dsCanLam.length})</button>
                <button id="btn-tab-lam-lai-tl" onclick="ham_8b_17_switch_sub_tab_tu_luan('LAM_LAI')" style="padding: 10px 16px; border: none; background: transparent; color: #495057; font-weight: bold; font-size: 13px; border-radius: 6px 6px 0 0; cursor: pointer;">🔄 ĐÃ NỘP (CÒN LƯỢT) (${dsLamLai.length})</button>
                <button id="btn-tab-chua-lam-khoa-tl" onclick="ham_8b_17_switch_sub_tab_tu_luan('CHUA_LAM_KHOA')" style="padding: 10px 16px; border: none; background: transparent; color: #495057; font-weight: bold; font-size: 13px; border-radius: 6px 6px 0 0; cursor: pointer;">⬛ CHƯA LÀM (ĐÃ KHÓA) (${dsChuaLamKhoa.length})</button>
                <button id="btn-tab-da-lam-khoa-tl" onclick="ham_8b_17_switch_sub_tab_tu_luan('DA_LAM_KHOA')" style="padding: 10px 16px; border: none; background: transparent; color: #495057; font-weight: bold; font-size: 13px; border-radius: 6px 6px 0 0; cursor: pointer;">🟥 ĐÃ NỘP (ĐÃ KHÓA) (${dsDaLamKhoa.length})</button>
            </div>

            <div id="vung-chua-cards-nhiem-vu-tl" style="min-height: 200px;"></div>
        `;

        const khungNutLopCuaHs = document.getElementById('cac-nut-lop-hs-loc-tl');
        if (khungNutLopCuaHs && dataLop) {
            khungNutLopCuaHs.innerHTML = dataLop.map(l => `<button class="btn-loc-lop-cua-hs-tl" onclick="ham_8b_16_loc_card_theo_lop_tu_luan('${l.ma_lop}', this)" style="padding: 5px 12px; background: white; color: #495057; border: 1px solid #ced4da; border-radius: 15px; font-weight: bold; cursor: pointer; font-size: 12px;">🏫 ${l.ten_lop}</button>`).join('');
        }

        window.MaLopDangLocHienTaiTL = 'TAT_CA';
        window.CachedCardsCanLamHtml_TL = dsCanLam.length === 0 ? '<div style="text-align:center; color:#7f8c8d; padding: 40px;">Hoàn thành sạch sẽ!</div>' : `<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 15px;">${dsCanLam.map(nv => renderCard(nv, 'CAN_LAM')).join('')}</div>`;
        window.CachedCardsLamLaiHtml_TL = dsLamLai.length === 0 ? '<div style="text-align:center; color:#7f8c8d; padding: 40px;">Không có bài tập.</div>' : `<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 15px;">${dsLamLai.map(nv => renderCard(nv, 'LAM_LAI')).join('')}</div>`;
        window.CachedCardsChuaLamKhoaHtml_TL = dsChuaLamKhoa.length === 0 ? '<div style="text-align:center; color:#28a745; padding: 40px;">✅ Không bỏ sót bài nào!</div>' : `<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 15px;">${dsChuaLamKhoa.map(nv => renderCard(nv, 'CHUA_LAM_KHOA')).join('')}</div>`;
        window.CachedCardsDaLamKhoaHtml_TL = dsDaLamKhoa.length === 0 ? '<div style="text-align:center; color:#7f8c8d; padding: 40px;">Trống.</div>' : `<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 15px;">${dsDaLamKhoa.map(nv => renderCard(nv, 'DA_LAM_KHOA')).join('')}</div>`;

        window.ham_8b_17_switch_sub_tab_tu_luan('CAN_LAM');

    } catch (error) { vungLamViec.innerHTML = `<div style="color: red; text-align: center; padding: 20px;">❌ Lỗi hệ thống: ${error.message}</div>`; }
};

// =====================================================================
// Hàm 8b.3: Cầu nối - Bắn dữ liệu sang Phòng thi Tự luận (Khối 16)
// =====================================================================
window.ham_8b_3_vao_lam_bai_tu_luan = function (maNhiemVu) {
    // 1. Tìm lại Object nhiệm vụ đầy đủ từ RAM

    const nvData = GocHocSinhState.danhSachNhiemVuTuLuan.find(nv => nv.ma_nhiem_vu === maNhiemVu);

    //console.log("🚀 Chuẩn bị vào làm bài Tự luận:", maNhiemVu, nvData);
    if (!nvData) {
        return alert("❌ Lỗi: Không tìm thấy dữ liệu nhiệm vụ tự luận này!");
    }

    // 2. Xác nhận trước khi vào
    if (!confirm(`Em đã chuẩn bị sẵn giấy bút để làm bài [${nvData.ten_nhiem_vu}] chưa?`)) {
        return;
    }

    // 3. Gọi hàm Khối 16, truyền Object nhiệm vụ và UID học sinh
    if (typeof window.ham_8b_1_mo_phong_thi_tu_luan === 'function') {
        // Gọi thẳng hàm mở phòng thi của Khối 16
        //console.log("🚀 Gọi hàm mở phòng thi Tự luận (Khối 16) với dữ liệu:", nvData, GocHocSinhState.uid);
        window.ham_8b_1_mo_phong_thi_tu_luan(maNhiemVu, GocHocSinhState.uid);
    } else {
        alert("❌ Lỗi: Hệ thống chưa tải xong chức năng nộp bài tự luận (Khối 16). Vui lòng tải lại trang!");
    }
};

window.ham_8b_4_quay_lai_danh_sach = function () {
    const renderArea = document.getElementById('dashboard-container');

    // Nếu khung bị mất, tự tạo lại nó
    if (!renderArea) {
        const app = document.getElementById('app');
        if (app) {
            app.innerHTML = '<div id="dashboard-container"></div>';
        } else {
            console.error("Lỗi nghiêm trọng: Không có phần tử cha #app");
            return;
        }
    }

    // Bây giờ mới gọi lại hàm khởi tạo Khối 8
    if (typeof ham_3b_1_tai_nhiem_vu_cua_toi === 'function') {
        ham_3b_1_tai_nhiem_vu_cua_toi(
            GocHocSinhState.uid,
            GocHocSinhState.danh_sach_ma_lop,
            GocHocSinhState.ten
        );
    }



};


async function ham_8b_5_layMetadataHocLieu(maNhiemVu) {
    const { data, error } = await _supabase
        .from('nhiem_vu_tu_luan')
        .select(`
            ma_hoc_lieu,
            hoc_lieu_tu_luan (
                metadata
            )
        `)
        .eq('ma_nhiem_vu', maNhiemVu)
        .single(); // Lấy 1 bản ghi duy nhất

    if (error) {
        console.error("Lỗi lấy dữ liệu:", error);
        return null;
    }

    // Kết quả trả về sẽ có dạng: 
    // data.hoc_lieu_tu_luan.metadata
    return data?.hoc_lieu_tu_luan?.metadata;
}


window.ham_8b_6_xu_ly_chon_anh = function (input) {
    const files = input.files;
    if (!files || files.length === 0) return;

    // Duyệt qua tất cả các file học sinh vừa chọn
    Array.from(files).forEach(file => {
        // Bỏ qua nếu không phải là ảnh
        if (!file.type.startsWith('image/')) return;

        // Kiểm tra chống trùng lặp
        const isDuplicate = TuLuanHS_State.linkAnhDaUpload.some(item =>
            item.fileName === file.name && item.size === file.size
        );
        if (isDuplicate) return; // Nếu ảnh đã có trên lưới thì bỏ qua

        const reader = new FileReader();
        reader.onload = function (e) {
            const base64 = e.target.result;

            // Đẩy vào mảng bộ nhớ
            TuLuanHS_State.linkAnhDaUpload.push({
                data: base64,
                fileName: file.name,
                size: file.size
            });

            // Vẽ ảnh ra màn hình
            const grid = document.getElementById('luoi_anh_da_nop');
            const div = document.createElement('div');
            div.style.position = "relative";
            div.innerHTML = `
                <img src="${base64}" style="width: 100px; height: 100px; object-fit: cover; border-radius: 6px; border: 1px solid #ccc;">
                <button onclick="ham_8b_7_xoa_anh_tam_thoi(this, '${file.name}', ${file.size})" style="position: absolute; top: -5px; right: -5px; background: red; color: white; border: none; border-radius: 50%; width: 20px; height: 20px; cursor: pointer;">×</button>
            `;
            grid.appendChild(div);
        };
        reader.readAsDataURL(file);
    });

    // Reset input để học sinh có thể bấm chọn thêm lần nữa nếu muốn
    input.value = "";
};

// Hàm hỗ trợ xóa ảnh trong mảng
window.ham_8b_7_xoa_anh_tam_thoi = function (btn, fileName, size) {
    btn.parentElement.remove();
    TuLuanHS_State.linkAnhDaUpload = TuLuanHS_State.linkAnhDaUpload.filter(item =>
        !(item.fileName === fileName && item.size === size)
    );
};

window.ham_8b_8_nen_anh_thanh_base64 = function (file, maxWidth = 1200, maxHeight = 1600, quality = 0.7) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (event) {
            const img = new Image();
            img.src = event.target.result;
            img.onload = function () {
                let width = img.width; let height = img.height;
                if (width > height) { if (width > maxWidth) { height = Math.round((height *= maxWidth / width)); width = maxWidth; } }
                else { if (height > maxHeight) { width = Math.round((width *= maxHeight / height)); height = maxHeight; } }

                const canvas = document.createElement('canvas');
                canvas.width = width; canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                const base64Data = canvas.toDataURL('image/jpeg', quality).split(',')[1];
                resolve({ base64Data: base64Data, mimeType: 'image/jpeg' });
            };
        };
    });
};
window.ham_8b_9_nop_bai_ve_supabase = async function () {
    if (TuLuanHS_State.linkAnhDaUpload.length === 0) return alert("⚠️ Em chưa tải ảnh nào lên!");

    // 🌟 1. TÍNH TOÁN XEM ĐÂY LÀ LẦN NỘP THỨ MẤY (Đưa lên đầu để dùng cho Cảnh báo)
    const tienDoHienTai = GocHocSinhState.tien_do_lam_bai || {};
    const luotNopHienTai = (tienDoHienTai[TuLuanHS_State.maNhiemVu] || 0) + 1;

    // 🌟 2. CẢNH BÁO THÔNG MINH (Tùy theo lần nộp)
    if (luotNopHienTai > 1) {
        const xacNhanNopLai = confirm(`⚠️ CẢNH BÁO LÀM LẠI BÀI (Lần ${luotNopHienTai}):\n\nNếu em nộp bài bây giờ, toàn bộ các bức ảnh đã nộp ở lần trước sẽ bị hủy bỏ và thay thế bằng ảnh mới.\n\nEm có chắc chắn muốn nộp ${TuLuanHS_State.linkAnhDaUpload.length} bức ảnh mới này không?`);
        if (!xacNhanNopLai) return;
    } else {
        if (!confirm(`Xác nhận nộp ${TuLuanHS_State.linkAnhDaUpload.length} bức ảnh cho thầy/cô?`)) return;
    }

    // 3. KIỂM TRA METADATA
    if (!TuLuanHS_State || !TuLuanHS_State.metadata) {
        return alert("❌ Lỗi: Dữ liệu nhiệm vụ bị thiếu (Metadata không tồn tại).");
    }

    // Lấy ID thư mục từ metadata của nhiệm vụ
    const folderId = TuLuanHS_State.metadata.folder_id_drive;
    if (!folderId) return alert("❌ Lỗi: Thư mục nộp bài không tồn tại (Chưa có ID).");

    const btn = document.getElementById('btn_nop_bai_chinh_thuc');
    btn.innerText = "⏳ ĐANG TẢI ẢNH LÊN DRIVE...";
    btn.disabled = true;

    try {
        let danhSachUrlDrive = [];
        for (let i = 0; i < TuLuanHS_State.linkAnhDaUpload.length; i++) {
            const img = TuLuanHS_State.linkAnhDaUpload[i];

            const response = await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
                method: "POST",
                body: JSON.stringify({
                    action: "upload_bai_nop",
                    folderId: folderId,
                    // CHÈN THÊM CHỮ "Lan_X" VÀO TÊN FILE ĐỂ LƯU VẾT TRÊN DRIVE
                    fileName: `${TuLuanHS_State.maNhiemVu}_${GocHocSinhState.ten.replace(/\\s+/g, '_')}_Lan_${luotNopHienTai}_anh_${i + 1}.png`,
                    mimeType: "image/png",
                    base64Data: img.data.split(',')[1]
                })
            });
            const result = await response.json();
            if (result.status === "success") danhSachUrlDrive.push(result.url);
        }

        // 🌟 4. LƯU VÀO SUPABASE (CHỐNG LỖI 409 CONFLICT)
        const payloadKQT = {
            ma_nhiem_vu: TuLuanHS_State.maNhiemVu,
            uid_hoc_sinh: TuLuanHS_State.uidHocSinh,
            thoi_gian_nop: new Date().toISOString(),
            trang_thai_cham: 0, // Reset lại trạng thái chưa chấm
            // ĐÃ XÓA DÒNG `diem: null` GÂY LỖI 400 Ở ĐÂY
            chi_tiet_lam_bai: {
                kieu_bai: "TU_LUAN_ANH",
                danh_sach_link_anh: danhSachUrlDrive,
                thoi_gian_bat_dau: TuLuanHS_State.batDauLuc,
                luot_nop: luotNopHienTai // Ghi chú luôn vào log
            }
        };
        // Bước A: Tìm xem đã có dòng kết quả cũ chưa
        const { data: kqCu } = await _supabase
            .from('ket_qua_tu_luan')
            .select('id')
            .eq('ma_nhiem_vu', TuLuanHS_State.maNhiemVu)
            .eq('uid_hoc_sinh', TuLuanHS_State.uidHocSinh)
            .maybeSingle();

        // Bước B: Có rồi thì Update đè lên, Chưa có thì Insert
        if (kqCu && kqCu.id) {
            const { error: errUpdate } = await _supabase.from('ket_qua_tu_luan').update(payloadKQT).eq('id', kqCu.id);
            if (errUpdate) throw errUpdate;
        } else {
            const { error: errInsert } = await _supabase.from('ket_qua_tu_luan').insert([payloadKQT]);
            if (errInsert) throw errInsert;
        }

        // ====================================================================
        // 5. CẬP NHẬT TIẾN ĐỘ ĐỂ CHUYỂN TAB "ĐÃ LÀM" NHƯ TRẮC NGHIỆM
        // ====================================================================
        let tienDo = GocHocSinhState.tien_do_lam_bai || {};
        tienDo[TuLuanHS_State.maNhiemVu] = luotNopHienTai;

        await _supabase.from('hoc_sinh')
            .update({ tien_do_lam_bai: tienDo })
            .eq('uid', TuLuanHS_State.uidHocSinh);

        GocHocSinhState.tien_do_lam_bai = tienDo;

        // 6. HIỂN THỊ HOÀN THÀNH
        document.getElementById('dashboard-container').innerHTML = `
            <div style="text-align:center; padding: 50px;">
                <h2 style="color:#28a745;">🎉 NỘP BÀI THÀNH CÔNG!</h2>
                <p>Hệ thống đã lưu ảnh bài làm của em.</p>
                <button onclick="ham_8b_4_quay_lai_danh_sach()" style="padding: 12px 25px; background: #6f42c1; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">
                    ⬅️ TRỞ VỀ DANH SÁCH BÀI TẬP
                </button>
            </div>`;

    } catch (error) {
        alert("Lỗi ghi nhận: " + error.message);
        btn.disabled = false;
        btn.innerText = "🚀 HOÀN THÀNH & GỬI BÀI CHO THẦY";
    }
};

// ==============================================================
// Hàm 16.9: Giao diện học sinh tự xem lại các ảnh bài làm đã nộp
// ==============================================================
window.ham_8b_10_hs_xem_lai_bai_nop = async function (maNhiemVu, idKetQua) {
    // Bật hiệu ứng loading chờ tải dữ liệu ảnh
    Swal.fire({
        title: '⏳ Đang tải lại bài làm...',
        allowOutsideClick: false,
        didOpen: () => { Swal.showLoading(); }
    });

    try {
        // Truy vấn dữ liệu chi tiết bài làm từ bảng kết quả
        const { data: baiNop, error } = await _supabase
            .from('ket_qua_tu_luan')
            .select('chi_tiet_lam_bai')
            .eq('id', idKetQua)
            .single();

        if (error || !baiNop) throw new Error("Không thể liên kết với tệp bài nộp!");

        const danhSachAnh = baiNop.chi_tiet_lam_bai?.danh_sach_link_anh || [];
        if (danhSachAnh.length === 0) {
            return Swal.fire("⚠️ Trống", "Không tìm thấy tệp ảnh đính kèm nào trong lượt nộp này!", "warning");
        }

        let htmlDanhSachAnh = danhSachAnh.map((url, idx) => {
            let imgSrc = url;
            const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
            if (match && match[1]) {
                imgSrc = `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1200`;
            }

            return `
                <div style="margin-bottom: 20px; border: 1px solid #dee2e6; border-radius: 8px; padding: 10px; background: #f8f9fa; text-align: left;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                        <span style="font-weight: bold; color: #6f42c1; font-size: 13px;">📷 Trang làm bài số ${idx + 1}</span>
                        <a href="${url}" target="_blank" style="font-size: 12px; color: #1a73e8; text-decoration: none; font-weight: bold;">Mở tab mới ↗️</a>
                    </div>
                    <div style="width: 100%; text-align: center; background: white; border: 1px solid #eee; border-radius: 4px; padding: 5px; min-height: 200px;">
                        <img src="${imgSrc}" 
                             referrerpolicy="no-referrer" 
                             style="max-width: 100%; height: auto; display: block; margin: 0 auto;" 
                             alt="Trang ${idx + 1}"
                             onerror="this.onerror=null; this.src='https://placehold.co/700x400/f8d7da/721c24?text=Loi+hien+thi+-+Vui+long+bam+Mo+tab+moi';">
                    </div>
                </div>
            `;
        }).join('');

        // Đổ toàn bộ danh sách ảnh vào khung Modal to rộng rãi
        Swal.fire({
            title: '📑 BÀI LÀM TỰ LUẬN ĐÃ TẢI LÊN',
            html: `<div style="max-height: 65vh; overflow-y: auto; padding-right: 5px; margin-top: 10px;">${htmlDanhSachAnh}</div>`,
            width: '750px',
            confirmButtonText: 'ĐÓNG XEM LẠI',
            confirmButtonColor: '#6c757d'
        });

    } catch (err) {
        Swal.fire("❌ Lỗi tải bài", err.message, "error");
    }
};
// =====================================================================
// Hàm 8b.17: Điều khiển Tabs trạng thái (Tự luận)
// =====================================================================
window.ham_8b_17_switch_sub_tab_tu_luan = function (tabName) {
    const arrTabs = ['CAN_LAM', 'LAM_LAI', 'CHUA_LAM_KHOA', 'DA_LAM_KHOA'];

    arrTabs.forEach(t => {
        const btn = document.getElementById(`btn-tab-${t.toLowerCase().replace(/_/g, '-')}-tl`);
        if (btn) {
            btn.style.background = 'transparent';
            btn.style.color = '#495057';
        }
    });

    const activeBtn = document.getElementById(`btn-tab-${tabName.toLowerCase().replace(/_/g, '-')}-tl`);
    if (activeBtn) {
        activeBtn.style.background = '#6f42c1';
        activeBtn.style.color = 'white';
    }

    const vungCards = document.getElementById('vung-chua-cards-nhiem-vu-tl');
    if (!vungCards) return;

    if (tabName === 'CAN_LAM') vungCards.innerHTML = window.CachedCardsCanLamHtml_TL || '';
    else if (tabName === 'LAM_LAI') vungCards.innerHTML = window.CachedCardsLamLaiHtml_TL || '';
    else if (tabName === 'CHUA_LAM_KHOA') vungCards.innerHTML = window.CachedCardsChuaLamKhoaHtml_TL || '';
    else if (tabName === 'DA_LAM_KHOA') vungCards.innerHTML = window.CachedCardsDaLamKhoaHtml_TL || '';

    ham_8b_16_loc_card_theo_lop_tu_luan(window.MaLopDangLocHienTaiTL, null);
};

// =====================================================================
// Hàm 8b.16: Lọc theo lớp (Tự luận)
// =====================================================================
window.ham_8b_16_loc_card_theo_lop_tu_luan = function (maLopChon, nutBam) {
    window.MaLopDangLocHienTaiTL = maLopChon;

    if (nutBam) {
        document.querySelectorAll('.btn-loc-lop-cua-hs-tl').forEach(btn => {
            btn.classList.remove('active');
            btn.style.background = 'white';
            btn.style.color = '#495057';
        });
        nutBam.classList.add('active');
        nutBam.style.background = (maLopChon === 'TAT_CA') ? '#6f42c1' : '#6f42c1';
        nutBam.style.color = 'white';
    }

    const vungCards = document.getElementById('vung-chua-cards-nhiem-vu-tl');
    if (!vungCards) return;
    const cards = vungCards.querySelectorAll('.card-nhiem-vu-hs');
    let dem = 0;

    cards.forEach(card => {
        const dataStr = card.getAttribute('data-mangs-lop') || '[]';
        let mangLopNV = [];
        try { mangLopNV = JSON.parse(dataStr); } catch (e) { }

        if (maLopChon === 'TAT_CA' || mangLopNV.includes(maLopChon)) {
            card.style.display = 'flex';
            dem++;
        } else {
            card.style.display = 'none';
        }
    });

    if (dem === 0 && cards.length > 0) {
        if (!document.getElementById('msg-khong-co-bai-tl')) {
            vungCards.insertAdjacentHTML('beforeend', `<div id="msg-khong-co-bai-tl" style="text-align:center; padding: 30px; color:#888; grid-column: 1 / -1;">Không có bài tập tự luận cho lớp đã chọn.</div>`);
        }
    } else {
        const msg = document.getElementById('msg-khong-co-bai-tl');
        if (msg) msg.remove();
    }
};





// // =====================================================================
// // Hàm 8.2b: Load Nhiệm vụ TỰ LUẬN
// // =====================================================================
// window.ham_3b_8_tab_nhiem_vu_tu_luan = async function () {
//     const vungLamViec = document.getElementById('vung-lam-viec-hoc-sinh');
//     vungLamViec.innerHTML = `<div style="text-align: center; padding: 40px;"><h3 style="color:#6f42c1;">⏳ Đang tải phân hệ Tự Luận...</h3></div>`;

//     try {
//         let dsLop = GocHocSinhState.danh_sach_ma_lop || [];
//         if (dsLop.length === 0) dsLop = ["#KHONG_CO_LOP#"];

//         const orQuery = dsLop.map(ma => `danh_sach_lop.cs."${JSON.stringify([ma]).replace(/"/g, '\\"')}"`).join(',');

//         // 1. Tải từ bảng nhiệm vụ tự luận
//         const { data: dsNV } = await _supabase
//             .from('nhiem_vu_tu_luan')
//             .select('*')
//             .eq('trang_thai', 1)
//             .or(orQuery)
//             .order('ngay_tao', { ascending: false });

//         GocHocSinhState.danhSachNhiemVu = dsNV || [];

//         // 2. Tải từ bảng kết quả tự luận
//         let ketQuaGanNhat = {};
//         const { data: dsKQ } = await _supabase
//             .from('ket_qua_tu_luan')
//             .select('id, ma_nhiem_vu, tong_diem, nhan_xet_gv, trang_thai_cham')
//             .eq('uid_hoc_sinh', GocHocSinhState.uid);

//         if (dsKQ) {
//             dsKQ.forEach(kq => {
//                 ketQuaGanNhat[kq.ma_nhiem_vu] = { id: kq.id, diem: kq.tong_diem, thoi_gian_nop: kq.thoi_gian_nop, nhan_xet_gv: kq.nhan_xet_gv, trang_thai_cham: kq.trang_thai_cham };
//             });
//         }
//     } catch (error) {
//         vungLamViec.innerHTML = `<div style="color: red; text-align: center;">❌ Lỗi: ${error.message}</div>`;
//     }
// };



// // =====================================================================
// // Hàm 8b.1: Khởi tạo và Tải dữ liệu Nhiệm vụ Tự luận
// // =====================================================================
// window.ham_8b_1_tai_nhiem_vu_tu_luan_cua_toi = async function (uid, dsMaLop, tenHS) {
//     NhiemVuTuLuanHS_State.uidHocSinh = uid;
//     NhiemVuTuLuanHS_State.danhSachLop = dsMaLop || [];
//     NhiemVuTuLuanHS_State.tenHocSinh = tenHS;

//     const renderArea = document.getElementById('khu-vuc-nhiem-vu-tu-luan');
//     if (!renderArea) {
//         // Nếu không có khu vực riêng, ta tự chèn một div vào dashboard-container
//         const dashboard = document.getElementById('dashboard-container');
//         if (dashboard) {
//             dashboard.insertAdjacentHTML('beforeend', '<div id="khu-vuc-nhiem-vu-tu-luan" style="margin-top: 30px;"></div>');
//         } else {
//             return console.error("Không tìm thấy dashboard-container để vẽ Khối 8b");
//         }
//     }

//     const khuVuc = document.getElementById('khu-vuc-nhiem-vu-tu-luan');
//     khuVuc.innerHTML = `<div style="text-align: center; padding: 20px; color: #6f42c1;">⏳ Đang tải các bài tập Tự luận...</div>`;

//     try {
//         // 1. Tải danh sách nhiệm vụ tự luận (Kèm metadata của học liệu)
//         const { data: dsNhiemVu, error: errNV } = await _supabase
//             .from('nhiem_vu_tu_luan')
//             .select(`*, hoc_lieu_tu_luan ( metadata )`)
//             .eq('trang_thai', 1) // Chỉ lấy các nhiệm vụ đang mở
//             .order('ngay_tao', { ascending: false });

//         if (errNV) throw errNV;

//         // Lọc nhiệm vụ thuộc về lớp của học sinh này
//         const nvCuaToi = (dsNhiemVu || []).filter(nv => {
//             let mangLop = [];
//             try { mangLop = typeof nv.danh_sach_lop === 'string' ? JSON.parse(nv.danh_sach_lop) : (nv.danh_sach_lop || []); } catch (e) { }
//             return mangLop.some(maLop => NhiemVuTuLuanHS_State.danhSachLop.includes(maLop));
//         });

//         // Xử lý nạp metadata vào object nhiệm vụ cho chuẩn với Khối 16
//         NhiemVuTuLuanHS_State.duLieuNhiemVu = nvCuaToi.map(nv => {
//             const hl = Array.isArray(nv.hoc_lieu_tu_luan) ? nv.hoc_lieu_tu_luan[0] : nv.hoc_lieu_tu_luan;
//             let meta = hl ? hl.metadata : {};
//             if (typeof meta === 'string') {
//                 try { meta = JSON.parse(meta); } catch (e) { }
//             }
//             return { ...nv, metadata: meta };
//         });

//         const dsMaNV = NhiemVuTuLuanHS_State.duLieuNhiemVu.map(nv => nv.ma_nhiem_vu);

//         // 2. Tải lịch sử làm bài (Kết quả) của học sinh này
//         if (dsMaNV.length > 0) {
//             const { data: dsKQ, error: errKQ } = await _supabase
//                 .from('ket_qua_thi')
//                 .select('id, ma_nhiem_vu, tong_diem, trang_thai_cham, thoi_gian_nop')
//                 .eq('uid_hoc_sinh', uid)
//                 .in('ma_nhiem_vu', dsMaNV);

//             if (errKQ) throw errKQ;
//             NhiemVuTuLuanHS_State.duLieuKetQua = dsKQ || [];
//         } else {
//             NhiemVuTuLuanHS_State.duLieuKetQua = [];
//         }

//         // 3. Vẽ giao diện
//         ham_8b_2_ve_giao_dien_the_nhiem_vu_tu_luan();

//     } catch (error) {
//         khuVuc.innerHTML = `<div style="text-align: center; color: red; padding: 20px;">❌ Lỗi tải bài tự luận: ${error.message}</div>`;
//     }
// };

// // =====================================================================
// // Hàm 8b.2: Vẽ Giao diện Dạng Thẻ (Card)
// // =====================================================================
// window.ham_8b_2_ve_giao_dien_the_nhiem_vu_tu_luan = function () {
//     const khuVuc = document.getElementById('khu-vuc-nhiem-vu-tu-luan');
//     const dsNV = NhiemVuTuLuanHS_State.duLieuNhiemVu;
//     const dsKQ = NhiemVuTuLuanHS_State.duLieuKetQua;

//     if (dsNV.length === 0) {
//         khuVuc.innerHTML = ``; // Ẩn luôn nếu không có bài tự luận nào
//         return;
//     }

//     let htmlCards = '';
//     const now = new Date();

//     dsNV.forEach(nv => {
//         // Kiểm tra xem đã nộp bài chưa
//         const baiNop = dsKQ.find(kq => kq.ma_nhiem_vu === nv.ma_nhiem_vu);

//         // Kiểm tra thời gian
//         const tMo = nv.thoi_gian_mo ? new Date(nv.thoi_gian_mo) : null;
//         const tDong = nv.thoi_gian_dong ? new Date(nv.thoi_gian_dong) : null;

//         let trangThaiKqUI = "";
//         let nutHanhDongUI = "";
//         let theMau = ""; // Màu viền thẻ

//         if (baiNop) {
//             // TRƯỜNG HỢP 1: ĐÃ NỘP BÀI
//             if (baiNop.trang_thai_cham === 1 || baiNop.tong_diem !== null) {
//                 theMau = "#28a745"; // Xanh lá (Đã chấm)
//                 trangThaiKqUI = `
//                     <div style="background: #e8f5e9; color: #2e7d32; padding: 8px; border-radius: 6px; text-align: center; font-weight: bold; margin-bottom: 15px;">
//                         Điểm của em: <span style="font-size: 18px; color: #d35400;">${baiNop.tong_diem}</span> đ
//                     </div>`;
//             } else {
//                 theMau = "#17a2b8"; // Xanh ngọc (Đã nộp chờ chấm)
//                 trangThaiKqUI = `
//                     <div style="background: #e0f7fa; color: #00838f; padding: 8px; border-radius: 6px; text-align: center; font-weight: bold; margin-bottom: 15px;">
//                         📸 Đã nộp ảnh bài làm <br><small>(Đang chờ thầy/cô chấm)</small>
//                     </div>`;
//             }
//             // Nút xem lại bài gọi thẳng hàm 16.9 của Khối 16
//             nutHanhDongUI = `
//                 <button onclick="ham_8b_10_hs_xem_lai_bai_nop('${nv.ma_nhiem_vu}', '${baiNop.id}')" style="width: 100%; padding: 12px; background: white; color: ${theMau}; border: 2px solid ${theMau}; border-radius: 6px; font-weight: bold; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='${theMau}'; this.style.color='white';" onmouseout="this.style.background='white'; this.style.color='${theMau}';">
//                     👁️ XEM BÀI ĐÃ NỘP
//                 </button>`;

//         } else {
//             // TRƯỜNG HỢP 2: CHƯA NỘP BÀI
//             if (tDong && now > tDong) {
//                 theMau = "#dc3545"; // Đỏ (Hết hạn)
//                 trangThaiKqUI = `<div style="color: #dc3545; font-weight: bold; text-align: center; margin-bottom: 15px;">⏳ Đã hết hạn nộp bài</div>`;
//                 nutHanhDongUI = `<button disabled style="width: 100%; padding: 12px; background: #e9ecef; color: #6c757d; border: none; border-radius: 6px; font-weight: bold; cursor: not-allowed;">KHÔNG THỂ NỘP</button>`;
//             }
//             else if (tMo && now < tMo) {
//                 theMau = "#fd7e14"; // Cam (Chưa mở)
//                 const strMo = tMo.toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
//                 trangThaiKqUI = `<div style="color: #fd7e14; font-weight: bold; text-align: center; margin-bottom: 15px;">🔒 Mở lúc: ${strMo}</div>`;
//                 nutHanhDongUI = `<button disabled style="width: 100%; padding: 12px; background: #ffeeba; color: #856404; border: none; border-radius: 6px; font-weight: bold; cursor: not-allowed;">CHƯA ĐẾN GIỜ</button>`;
//             }
//             else {
//                 theMau = "#6f42c1"; // Tím (Đang mở - Tự luận)
//                 let hanChotStr = tDong ? `Hạn chót: ${tDong.toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}` : 'Không giới hạn thời gian';
//                 trangThaiKqUI = `<div style="color: #6f42c1; font-weight: bold; text-align: center; margin-bottom: 15px; font-size: 13px;">🕒 ${hanChotStr}</div>`;

//                 // 🌟 Bấm vào sẽ truyền toàn bộ object nv sang Khối 16
//                 nutHanhDongUI = `
//                     <button onclick='ham_8b_3_vao_lam_bai_tu_luan(${JSON.stringify(nv).replace(/'/g, "&#39;")})' style="width: 100%; padding: 12px; background: #6f42c1; color: white; border: none; border-radius: 6px; font-weight: bold; font-size: 15px; cursor: pointer; box-shadow: 0 4px 6px rgba(111,66,193,0.3);">
//                         ✍️ BẮT ĐẦU LÀM BÀI
//                     </button>`;
//             }
//         }

//         htmlCards += `
//             <div style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border-top: 4px solid ${theMau}; display: flex; flex-direction: column;">
//                 <div style="padding: 20px; flex: 1;">
//                     <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
//                         <span style="background: #f3e8ff; color: #6f42c1; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: bold;">📝 TỰ LUẬN</span>
//                         <span style="font-size: 12px; color: #6c757d; font-weight: bold;">${nv.ma_nhiem_vu}</span>
//                     </div>
//                     <h4 style="margin: 0 0 10px 0; color: #333; font-size: 16px; line-height: 1.4;">${nv.ten_nhiem_vu}</h4>
//                     <p style="margin: 0; font-size: 13px; color: #555;">Loại: <b>${nv.loai_nhiem_vu || 'Bài tập'}</b></p>
//                 </div>
                
//                 <div style="padding: 15px 20px; background: #f8f9fa; border-top: 1px solid #eee;">
//                     ${trangThaiKqUI}
//                     ${nutHanhDongUI}
//                 </div>
//             </div>
//         `;
//     });

//     khuVuc.innerHTML = `
//         <div style="display: flex; align-items: center; margin-bottom: 20px;">
//             <h3 style="margin: 0; color: #6f42c1; font-size: 20px;">✍️ BÀI TẬP TỰ LUẬN (CẦN CHỤP ẢNH)</h3>
//             <div style="flex: 1; height: 1px; background: #dee2e6; margin-left: 15px;"></div>
//         </div>
//         <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px;">
//             ${htmlCards}
//         </div>
//     `;
// };

// // =====================================================================
// // Hàm 8b.3: Cầu nối - Bắn dữ liệu sang Phòng thi Tự luận (Khối 16)
// // =====================================================================
// window.ham_8b_3_vao_lam_bai_tu_luan = function (nhiemVuData) {
//     // 1. Xác nhận trước khi vào
//     if (!confirm(`Em đã chuẩn bị sẵn giấy bút để làm bài [${nhiemVuData.ten_nhiem_vu}] chưa?`)) {
//         return;
//     }

//     // 2. Gọi hàm Khối 16, truyền Object nhiệm vụ và UID học sinh
//     if (typeof window.ham_8b_1_mo_phong_thi_tu_luan === 'function') {
//         window.ham_8b_1_mo_phong_thi_tu_luan(nhiemVuData, NhiemVuTuLuanHS_State.uidHocSinh);
//     } else {
//         alert("❌ Lỗi: Hệ thống chưa tải xong chức năng nộp bài tự luận (Khối 16). Vui lòng tải lại trang!");
//     }
// };


// =====================================================================
// ⚙️ KHỐI 5: ĐỘNG CƠ PHÒNG THI & NGHIỆP VỤ HỌC SINH (EXAM ENGINE)
// =====================================================================

// ---------------------------------------------------------------------
// 12. NGHIỆP VỤ HỌC SINH (NHIỆM VỤ, LÀM BÙ, THƯ VIỆN MỞ)
// ---------------------------------------------------------------------

// 12.1. Lắng nghe chấm đỏ thông báo nhiệm vụ mới bằng Supabase Realtime
window.langNgheNhiemVuHocSinh = async () => {
    const theMenuBtn = document.getElementById("menu-nhiem-vu");
    if (!theMenuBtn) return;
    const user = window.supabaseClient.auth.user ? window.supabaseClient.auth.user() : (await window.supabaseClient.auth.getUser()).data.user;
    if (!user) return;

    try {
        const { data: hsDoc } = await window.supabaseClient.from("HocSinh").select("danhSachMaLop").eq("uid", user.id).single();
        if (!hsDoc) return;
        const dsMaLop = hsDoc.danhSachMaLop || [];

        // Cập nhật lại số lượng (Có thể dùng Supabase Channel để realtime, ở đây gọi hàm tải lại để an toàn)
        window.hienThiDanhSachNhiemVu(user.id, true);

        // Đăng ký nhận thông báo realtime từ Supabase khi có nhiệm vụ mới được thêm
        if (!window.nhiemVuChannel) {
            window.nhiemVuChannel = window.supabaseClient
                .channel('public:NhiemVu')
                .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'NhiemVu' }, payload => {
                    if (dsMaLop.includes(payload.new.maLopChoPhep)) {
                        window.hienThiDanhSachNhiemVu(user.id, true);
                    }
                })
                .subscribe();
        }
    } catch (error) { console.error("Lỗi đếm nhiệm vụ:", error); }
};

// 12.2. Hiển thị Bảng Nhiệm Vụ cho Học sinh (Dùng Supabase)
window.hienThiDanhSachNhiemVu = async (uidHocSinh_param, isReload = false) => {
    const user = window.supabaseClient.auth.user ? window.supabaseClient.auth.user() : (await window.supabaseClient.auth.getUser()).data.user;
    if (!user) return;
    const uidHocSinh = user.id;

    const tabNhiemVu = document.getElementById('tab-hs-nhiem-vu');
    if (!tabNhiemVu) return;

    if (!document.getElementById('khung-tools-hs-nv')) {
        tabNhiemVu.innerHTML = `
            <h2 style="color: #27ae60; border-bottom: 2px solid #2ecc71; padding-bottom: 10px; margin-top: 0;">🎯 Nhiệm vụ được giao</h2>
            <div id="khung-tools-hs-nv" style="display:flex; gap:15px; margin-bottom:15px; align-items:center; background:#f8f9fa; padding:15px; border-radius:8px; border:1px solid #ddd;">
                <div style="flex:2;">
                    <input type="text" id="txt-search-nhiem-vu" placeholder="🔍 Gõ Mã, Tên nhiệm vụ hoặc Tên lớp để tìm nhanh..." style="width: 100%; padding: 10px; border-radius: 6px; border: 1px solid #ccc; font-size: 14px; box-sizing: border-box; outline: none;">
                </div>
                <div style="flex:1; display:flex; align-items:center; gap:10px;">
                    <strong style="white-space:nowrap; color:#495057; font-size:13px;">Sắp xếp:</strong>
                    <select id="cbo-sort-hs-nv" style="width:100%; padding:10px; border-radius:6px; border:1px solid #ccc; font-size:14px; background:#fff; cursor:pointer;">
                        <option value="hanchotgan">⚠️ Sắp tới hạn (Cần làm ngay)</option>
                        <option value="giaomoi">🕒 Mới giao gần đây</option>
                        <option value="tenaz">🔤 Tên Nhiệm vụ (A-Z)</option>
                        <option value="dalam">✅ Bài đã nộp xếp lên trước</option>
                    </select>
                </div>
            </div>
            <div id="vung-danh-sach-nhiem-vu"></div>`;
    }

    const vungDanhSach = document.getElementById('vung-danh-sach-nhiem-vu');
    if (!isReload) vungDanhSach.innerHTML = `<div style="text-align:center; padding: 40px; color:#999; font-size:16px;">⏳ Đang tải tiến độ bài làm...</div>`;

    const tinhThoiGianConLai = (hanChotDate) => {
        const diff = hanChotDate - new Date();
        if (diff <= 0) return "Đã hết hạn";
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const mins = Math.floor((diff / 1000 / 60) % 60);
        return `Còn ${days > 0 ? days + ' ngày ' : ''}${hours > 0 ? hours + ' giờ ' : ''}${mins > 0 ? mins + ' phút' : 'vài giây'}`.trim();
    };

    try {
        const { data: hsDoc } = await window.supabaseClient.from("HocSinh").select("danhSachMaLop").eq("uid", uidHocSinh).single();
        if (!hsDoc) return;
        let dsMaLop = hsDoc.danhSachMaLop || [];

        if (dsMaLop.length === 0) {
            vungDanhSach.innerHTML = `<div style="background: #fff3cd; border: 1px solid #ffe69c; border-radius: 8px; padding: 25px; text-align: center; color: #856404; margin-top: 20px;"><div style="font-size:50px; margin-bottom:10px;">🏫</div><h3 style="margin-top: 0; font-size: 18px;">Bạn chưa được gán vào lớp học nào!</h3></div>`; return;
        }

        const { data: snapLop } = await window.supabaseClient.from("LopHoc").select("*").in("maLop", dsMaLop);
        let tuDienLop = {};
        if (snapLop) snapLop.forEach(d => tuDienLop[d.maLop] = d.tenLop || d.maLop);

        const { data: snapNhiemVu } = await window.supabaseClient.from("NhiemVu").select("*").in("maLopChoPhep", dsMaLop);
        const { data: snapKQ } = await window.supabaseClient.from("KetQuaThi").select("*").eq("uidHocSinh", uidHocSinh);

        const lichSuLamBai = {}; const demSoLanLam = {};
        if (snapKQ) {
            snapKQ.forEach(data => {
                data.idChuanXac = data.id;
                demSoLanLam[data.maDe] = (demSoLanLam[data.maDe] || 0) + 1;
                if (!lichSuLamBai[data.maDe] || new Date(data.thoiGianNop) > new Date(lichSuLamBai[data.maDe].thoiGianNop)) lichSuLamBai[data.maDe] = data;
            });
        }

        const bayGio = new Date();
        let dsNhiemVuRaw = [];
        let soLuongNhiemVuChuaLam = 0;

        if (snapNhiemVu) {
            snapNhiemVu.forEach(de => {
                const hanChotThucTe = (de.hanChotNgoaiLe && de.hanChotNgoaiLe[uidHocSinh]) ? de.hanChotNgoaiLe[uidHocSinh] : de.hanChot;
                de.hanChotApDung = hanChotThucTe;

                const hanChotDate = hanChotThucTe ? new Date(hanChotThucTe) : null;
                const thongTinLamBai = lichSuLamBai[de.id];

                de.thongTinLamBai = thongTinLamBai;
                de.tenLopHienThi = tuDienLop[de.maLopChoPhep] || de.maLopChoPhep;

                if (thongTinLamBai) { de.trangThaiHS = "Đã làm"; de.diem = thongTinLamBai.tongDiem; }
                else if (hanChotDate && bayGio > hanChotDate) { de.trangThaiHS = "Quá hạn"; }
                else { de.trangThaiHS = "Chưa làm"; soLuongNhiemVuChuaLam++; }

                dsNhiemVuRaw.push(de);
            });
        }

        // Cập nhật chấm đỏ thông báo Menu
        const theMenuBtn = document.getElementById("menu-nhiem-vu");
        if (theMenuBtn) {
            const badgeCu = theMenuBtn.querySelector('.badge-notify');
            if (badgeCu) badgeCu.remove();
            if (soLuongNhiemVuChuaLam > 0) {
                theMenuBtn.style.position = 'relative';
                theMenuBtn.insertAdjacentHTML('beforeend', `<span class="badge-notify" style="position:absolute; top:-5px; right:5px; background:#e74c3c; color:white; border-radius:50%; padding:2px 6px; font-size:11px; font-weight:bold; box-shadow:0 2px 4px rgba(0,0,0,0.2); border:1px solid #c0392b;">${soLuongNhiemVuChuaLam}</span>`);
            }
        }

        if (dsNhiemVuRaw.length === 0) {
            vungDanhSach.innerHTML = `<div style="background: #e8f4f8; border: 1px solid #b8daff; border-radius: 8px; padding: 20px; text-align: center; color: #0056b3; margin-top: 20px;"><div style="font-size:40px; margin-bottom:10px;">🎉</div><h3 style="margin-top: 0; font-size: 18px;">Tuyệt vời! Bạn không nợ nhiệm vụ nào.</h3></div>`; return;
        }

        const renderBangHS = () => {
            const txtSearch = document.getElementById('txt-search-nhiem-vu');
            const cboSort = document.getElementById('cbo-sort-hs-nv');
            if (!txtSearch || !cboSort) return;

            const tuKhoa = txtSearch.value.toLowerCase().trim();
            const kieuSort = cboSort.value;

            let dsLoc = dsNhiemVuRaw.filter(nv => {
                const tag = `${nv.id} ${nv.maNhiemVu || ''} ${nv.tenDe || ''} ${nv.tenLopHienThi || ''}`.toLowerCase();
                return tag.includes(tuKhoa);
            });

            dsLoc.sort((a, b) => {
                const tGiaoA = new Date(a.thoiGianGiao || a.ngayTao).getTime();
                const tGiaoB = new Date(b.thoiGianGiao || b.ngayTao).getTime();

                if (kieuSort === 'hanchotgan') {
                    const getPriority = (nv) => {
                        if (nv.trangThaiHS === "Chưa làm") return nv.hanChotApDung ? 1 : 2;
                        return 3;
                    };
                    const pA = getPriority(a); const pB = getPriority(b);
                    if (pA !== pB) return pA - pB;
                    if (pA === 1) return new Date(a.hanChotApDung).getTime() - new Date(b.hanChotApDung).getTime();
                    return tGiaoB - tGiaoA;
                }
                if (kieuSort === 'giaomoi') return tGiaoB - tGiaoA;
                if (kieuSort === 'tenaz') return (a.tenDe || "").localeCompare(b.tenDe || "", 'vi');
                if (kieuSort === 'dalam') {
                    const getPriorityDaLam = (nv) => (nv.trangThaiHS === "Đã làm" ? 1 : 2);
                    const pA = getPriorityDaLam(a); const pB = getPriorityDaLam(b);
                    if (pA !== pB) return pA - pB;
                    return tGiaoB - tGiaoA;
                }
                return 0;
            });

            if (dsLoc.length === 0) {
                vungDanhSach.innerHTML = `<div style="text-align:center; padding:30px; color:#dc3545;">Không tìm thấy bài tập nào khớp với từ khóa!</div>`; return;
            }

            let html = `<table style="width: 100%; border-collapse: collapse; font-size: 13px; text-align: left; background: #fff; box-shadow: 0 2px 5px rgba(0,0,0,0.05); border-radius:8px; overflow:hidden;"><tr style="background:#f1f3f5; border-bottom:2px solid #dee2e6;">
                <th style="padding:15px; width:4%; text-align:center;">STT</th><th style="padding:15px; width:8%; text-align:center;">Loại</th><th style="padding:15px; width:12%; text-align:center;">Lớp nhận</th><th style="padding:15px; width:26%;">Nhiệm vụ / Cấu trúc</th><th style="padding:15px; width:15%; text-align:center;">Khung thời gian</th><th style="padding:15px; width:14%;">Tình trạng</th><th style="padding:15px; width:11%; text-align:center;">Kết quả</th><th style="padding:15px; width:10%; text-align:center;">Hành động</th>
            </tr>`;

            dsLoc.forEach((de, index) => {
                const sttHtml = `<div style="width: 28px; height: 28px; background: #e9ecef; border-radius: 50%; display: flex; justify-content: center; align-items: center; font-weight: bold; color: #495057; border: 1px solid #ced4da; margin: 0 auto;">${index + 1}</div>`;
                const maNV = de.maNhiemVu || de.id;

                const tgGiaoDate = de.thoiGianGiao ? new Date(de.thoiGianGiao) : (de.ngayTao ? new Date(de.ngayTao) : new Date());
                const tgGiaoStr = tgGiaoDate.toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' });

                const hanChotDate = de.hanChotApDung ? new Date(de.hanChotApDung) : null;
                const hanChotStr = hanChotDate ? hanChotDate.toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' }) : 'Vô thời hạn';

                let htmlLoaiNV = `<div style="display:flex; flex-direction:column; align-items:center; gap:4px;"><span style="font-size:20px; line-height:1;">📝</span><span style="font-size:10px; font-weight:bold; color:#0056b3;">Trắc nghiệm</span></div>`;

                const soLanDaLam = demSoLanLam[de.id] || 0;
                const luotNgoaiLe = (de.luotThemNgoaiLe && de.luotThemNgoaiLe[uidHocSinh]) ? de.luotThemNgoaiLe[uidHocSinh] : 0;
                const soLanChoPhep = (de.soLanLamBai !== undefined ? de.soLanLamBai : 1) + luotNgoaiLe;

                const hetLuot = (soLanChoPhep > 0 && soLanDaLam >= soLanChoPhep);
                const badgeLuot = `<div style="font-size:11px; color:#6f42c1; font-weight:bold; margin-top:6px; background:#f4eefe; padding:3px 6px; border-radius:4px; display:inline-block; border:1px solid #d8b4fe;">🔄 Đã làm: ${soLanChoPhep === 0 ? soLanDaLam + '/∞' : soLanDaLam + '/' + soLanChoPhep}</div>`;
                const badgeConLai = `<div style="margin-top: 8px; font-size: 11px; color: ${hetLuot ? '#dc3545' : '#0056b3'}; background: ${hetLuot ? '#fff5f5' : '#e8f4f8'}; padding: 4px 8px; border-radius: 4px; border: 1px solid ${hetLuot ? '#f5c6cb' : '#b8daff'}; display: inline-block;">🎯 Còn: <strong>${soLanChoPhep > 0 ? Math.max(0, soLanChoPhep - soLanDaLam) : '∞'}</strong> lượt</div>`;

                let htmlTinhTrang = "", htmlKetQua = "", nutHanhDong = "", bgRow = "#fff";
                const tenDeSafe = (de.tenDe || "Nhiệm vụ").replace(/'/g, "\\'").replace(/"/g, "&quot;");
                const laQuaHan = hanChotDate && (new Date() > hanChotDate);
                const idLichSuGiamDinh = de.thongTinLamBai ? de.thongTinLamBai.idChuanXac : "";

                if (laQuaHan) {
                    bgRow = "#fff5f5";
                    htmlTinhTrang = `<div style="color:#dc3545; font-weight:bold; margin-bottom:4px;">❌ Đã quá hạn</div><div style="font-size:11px; color:#c0392b;">(${hanChotStr.replace(' ', '<br>')})</div>${badgeLuot}`;
                    if (de.trangThaiHS === "Đã làm") {
                        htmlKetQua = `<div style="font-size:16px; font-weight:900; color:#1e7e34; background:#e6f4ea; padding:4px 10px; border-radius:6px; display:inline-block; border:1px solid #c3e6cb;">${de.diem.toFixed(2)} đ</div>`;
                        const btnXemLai = `<button onclick="window.xemLaiBaiThi('${de.idBanGoc}', '${idLichSuGiamDinh}')" style="background:#17a2b8; color:white; border:none; padding:8px 12px; border-radius:6px; cursor:pointer; font-size:12px; font-weight:bold; font-family:inherit; transition:0.2s; box-shadow:0 2px 4px rgba(0,0,0,0.1); margin-bottom:5px;">👁️ Xem lại bài</button>`;
                        nutHanhDong = `<div style="display:flex; flex-direction:column; gap:5px;">${btnXemLai}<button onclick="window.xinLamBoSung('${de.id}', '${tenDeSafe}', 'giahan')" style="background:#ffc107; color:#000; border:none; padding:8px 12px; border-radius:6px; font-family:inherit; cursor:pointer; font-size:12px; font-weight:bold; box-shadow:0 2px 4px rgba(0,0,0,0.1);">🙋 Xin mở lại</button></div>`;
                    } else {
                        htmlKetQua = `<span style="color:#dc3545; font-weight:bold;">Chưa nộp</span>`;
                        nutHanhDong = `<button onclick="window.xinLamBoSung('${de.id}', '${tenDeSafe}', 'giahan')" style="background:#ffc107; color:#000; border:none; padding:8px 12px; border-radius:6px; font-family:inherit; cursor:pointer; font-size:12px; font-weight:bold; box-shadow:0 2px 4px rgba(0,0,0,0.1);">🙋 Xin làm bù</button>`;
                    }
                } else {
                    if (de.trangThaiHS === "Đã làm") {
                        bgRow = "#fdfdfd";
                        htmlTinhTrang = `<div style="color:#28a745; font-weight:bold; display:flex; align-items:center; gap:5px;">✅ Đã hoàn thành</div>${badgeLuot}`;
                        htmlKetQua = `<div style="font-size:16px; font-weight:900; color:#1e7e34; background:#e6f4ea; padding:4px 10px; border-radius:6px; display:inline-block; border:1px solid #c3e6cb;">${de.diem.toFixed(2)} đ</div>`;
                        const btnXemLai = `<button onclick="window.xemLaiBaiThi('${de.idBanGoc}', '${idLichSuGiamDinh}')" style="background:#17a2b8; color:white; border:none; padding:8px 12px; border-radius:6px; cursor:pointer; font-size:12px; font-weight:bold; font-family:inherit; transition:0.2s; box-shadow:0 2px 4px rgba(0,0,0,0.1); margin-bottom:5px;">👁️ Xem lại bài</button>`;

                        if (hetLuot) {
                            nutHanhDong = `<div style="display:flex; flex-direction:column; gap:5px;">${btnXemLai}<button onclick="window.xinLamBoSung('${de.id}', '${tenDeSafe}', 'themluot')" style="background:#17a2b8; color:#fff; border:none; padding:8px 12px; border-radius:6px; font-size:12px; font-weight:bold; font-family:inherit; cursor:pointer; box-shadow:0 2px 4px rgba(0,0,0,0.1);">🔄 Xin thêm lượt</button></div>`;
                        } else {
                            nutHanhDong = `<div style="display:flex; flex-direction:column; gap:5px;">${btnXemLai}<button onclick="window.vaoThiTrucTiep('${de.id}', true)" style="background:#f8f9fa; color:#0056b3; border:1px solid #0056b3; padding:8px 12px; border-radius:6px; cursor:pointer; font-size:12px; font-weight:bold; font-family:inherit; transition:0.2s;">Làm lại</button></div>`;
                        }
                    } else {
                        bgRow = "#f3fdf6";
                        htmlTinhTrang = `<div style="color:#d35400; font-weight:bold; margin-bottom:4px;">⏳ Sắp tới hạn</div><div style="font-size:11px; color:#e67e22; background:#fff4e6; display:inline-block; padding:2px 6px; border-radius:4px;">${hanChotDate ? tinhThoiGianConLai(hanChotDate) : 'Không giới hạn'}</div>${badgeLuot}`;
                        htmlKetQua = `<span style="color:#6c757d; font-style:italic;">---</span>`;
                        nutHanhDong = `<button onclick="window.vaoThiTrucTiep('${de.id}')" style="background:#28a745; color:white; border:none; padding:8px 15px; border-radius:6px; font-family:inherit; cursor:pointer; font-size:13px; font-weight:bold; box-shadow:0 2px 4px rgba(0,0,0,0.1); animation: pulse 2s infinite;">BẮT ĐẦU</button>`;
                    }
                }

                let htmlLop = `<span style="background:#e8f4f8; color:#0056b3; border:1px solid #b8daff; padding:4px 8px; border-radius:20px; font-weight:bold; font-size:11px; display:inline-block; text-align:center;">${de.tenLopHienThi}</span>`;

                html += `<tr class="row-nhiem-vu" data-search="${(de.tenDe + ' ' + maNV).toLowerCase()}" style="border-bottom:1px solid #eee; background:${bgRow}; transition: 0.2s;" onmouseover="this.style.background='#fdfdfe'" onmouseout="this.style.background='${bgRow}'">
                    <td style="padding:15px; text-align:center;">${sttHtml}</td>
                    <td style="padding:15px; text-align:center;">${htmlLoaiNV}</td>
                    <td style="padding:15px; text-align:center;">${htmlLop}</td>
                    <td style="padding:15px;">
                        <strong style="color:#0056b3; font-size:15px;">${de.tenDe}</strong><br>
                        <span style="font-size:11px; color:#666; font-family:monospace; background:#e9ecef; padding:2px 4px; border-radius:4px; margin-top:4px; display:inline-block;">Mã NV: ${maNV}</span>
                        <div style="margin-top:6px; display:flex; gap:8px; align-items: center;"><span style="font-size:11px; font-weight:bold; color:#d35400; background:#fff4e6; padding:2px 6px; border-radius:4px; border: 1px solid #ffd8a8;">${de.cauTruc || 'Đang cập nhật'}</span><span style="font-size:11px; color:#666; font-weight:bold;">⏱️ ${de.thoiGian || 90}p</span></div>
                    </td>
                    <td style="padding:15px; text-align:center; font-size:12px;">
                        <div style="color:#6c757d; margin-bottom:4px; padding-bottom:4px; border-bottom:1px dashed #eee;">Giao: <strong>${tgGiaoStr.replace(' ', '<br>')}</strong></div>
                        <div style="color:#dc3545; font-weight:bold;">Hạn: ${hanChotStr.replace(' ', '<br>')}</div>
                        <div style="margin-top:6px;">${badgeConLai}</div>
                    </td>
                    <td style="padding:15px;">${htmlTinhTrang}</td>
                    <td style="padding:15px; text-align:center;">${htmlKetQua}</td>
                    <td style="padding:15px; text-align:center;">${nutHanhDong}</td>
                </tr>`;
            });
            html += `</table>`;

            let bangCu = vungDanhSach.querySelector('table');
            let viTriCuonNgang = bangCu ? bangCu.scrollLeft : 0;
            let viTriCuonDoc = vungDanhSach.scrollTop;

            vungDanhSach.innerHTML = html;

            let bangMoi = vungDanhSach.querySelector('table');
            if (bangMoi) bangMoi.scrollLeft = viTriCuonNgang;
            vungDanhSach.scrollTop = viTriCuonDoc;
        };

        document.getElementById('txt-search-nhiem-vu').oninput = renderBangHS;
        document.getElementById('cbo-sort-hs-nv').onchange = renderBangHS;
        renderBangHS();

    } catch (error) { vungDanhSach.innerHTML = `<div style="color:red; padding: 20px;">Lỗi tải dữ liệu: ${error.message}</div>`; }
};

// 12.3. Xin làm bù / Thêm lượt (Supabase)
window.xinLamBoSung = async (maDe, tenDe, loaiYeuCau) => {
    const user = window.supabaseClient.auth.user ? window.supabaseClient.auth.user() : (await window.supabaseClient.auth.getUser()).data.user;
    if (!user) return;
    if (!loaiYeuCau) loaiYeuCau = 'giahan';

    try {
        const { data: hsDoc } = await window.supabaseClient.from("HocSinh").select("ten").eq("uid", user.id).single();
        const tenHS = hsDoc ? hsDoc.ten : "Học sinh";

        const txtHoi = loaiYeuCau === 'themluot' ? 'XIN CẤP THÊM LƯỢT LÀM BÀI' : 'XIN LÀM BÙ (GIA HẠN)';
        const lyDo = prompt(`[ ${txtHoi} ]\nNhiệm vụ: ${tenDe}\n\nVui lòng nhập lý do ngắn gọn để Giáo viên xem xét:`);

        if (lyDo && lyDo.trim() !== "") {
            const reqId = `${user.id}_${maDe}_${loaiYeuCau}`;
            await window.supabaseClient.from("YeuCauHocSinh").insert([{
                id: reqId,
                uid_hoc_sinh: user.id,
                ten_hoc_sinh: tenHS,
                ma_lop: maDe, // Gắn tạm vào cột ma_lop
                trang_thai: 0,
                lyDo: lyDo.trim(),
                loaiYeuCau: loaiYeuCau,
                tenDe: tenDe
            }]);
            alert("✅ Đã gửi yêu cầu thành công! Giáo viên sẽ nhận được thông báo.");
        }
    } catch (error) { alert("❌ Lỗi gửi yêu cầu: " + error.message); }
};

// 12.4. Thư viện Đề Mở (Luyện tập tự do)
window.taiTheDeThiLuyenTap = async () => {
    const vungChua = document.getElementById('hs-khung-chua-the-de');
    if (!vungChua) return;
    try {
        const user = window.supabaseClient.auth.user ? window.supabaseClient.auth.user() : (await window.supabaseClient.auth.getUser()).data.user;
        if (!user) return;

        const { data: hsDoc } = await window.supabaseClient.from("HocSinh").select("*").eq("uid", user.id).single();
        const dsMaLopCuaToi = hsDoc?.danhSachMaLop || [];
        const laAdmin = (hsDoc?.vaiTro === 'admin');

        const { data: snapDe } = await window.supabaseClient.from("HocLieu").select("*");
        let htmlCards = ""; let count = 0;

        if (snapDe) {
            snapDe.forEach(de => {
                let coQuyen = laAdmin || (de.trangThai === 1) || (de.trangThai === 2 && dsMaLopCuaToi.includes(de.maLopChoPhep));
                if (coQuyen) {
                    count++;
                    const chuoiCauTruc = de.cauTruc || (de.danhSachCauHoi ? de.danhSachCauHoi.length + " câu" : "0 câu");
                    let textHienThiLop = de.trangThai === 0 ? `<span style="background:#fff4e6; color:#d9480f; padding:2px 6px; border-radius:4px; font-size:10px; font-weight:bold; border:1px solid #ffd8a8;">⏳ CHỜ DUYỆT</span>` : `<span style="background:#e6f4ea; color:#1e7e34; padding:2px 6px; border-radius:4px; font-size:10px; font-weight:bold;">🌍 CÔNG KHAI</span>`;

                    htmlCards += `
                        <div class="card-de-thi" style="background: white; border: 1px solid #e2e8f0; border-radius: 10px; padding: 15px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); display: flex; flex-direction: column; justify-content: space-between; min-height: 240px; position: relative;">
                            <div>
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">${textHienThiLop} <span style="color:#64748b; font-size:11px; font-weight:bold;">⏳ ${de.thoiGian || 90}p</span></div>
                                <h3 style="margin: 0; color: #1e293b; font-size: 15px; line-height: 1.3; font-weight: 800;">${de.tenHocLieu || de.tenDe || "Đề thi"}</h3>
                                <div style="font-size: 13px; color: #1e293b; margin-top: 4px; font-weight: bold; font-family: monospace; border-left: 2px solid #c0392b; padding-left: 6px; background: #fff5f5;">Mã mẫu: <span style="color:#c0392b; font-size: 11px;">${de.id || de.maDe}</span></div>
                                <div style="font-size: 12px; color: #64748b; margin-top: 8px; padding-top: 6px; border-top: 1px dashed #e2e8f0;">📊 Quy mô: <strong style="color: #d35400;">${chuoiCauTruc}</strong></div>
                            </div>
                            <button onclick="window.vaoThiTuDo('${de.id || de.maDe}', 'HocLieu')" style="width: 100%; margin-top: 10px; padding: 8px; background: #059669; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; font-size: 13px;">🚀 BẮT ĐẦU LÀM BÀI</button>
                        </div>`;
                }
            });
        }
        vungChua.innerHTML = count > 0 ? htmlCards : `<div style="grid-column:1/-1; padding:20px; color:#999;">Chưa có đề thi công khai.</div>`;
    } catch (err) { vungChua.innerHTML = `<div style="color:red; grid-column:1/-1;">Lỗi: ${err.message}</div>`; }
};


// ---------------------------------------------------------------------
// 13. QUY TRÌNH PHÒNG THI (TẢI ĐỀ TỪ GITHUB, LÀM BÀI, NỘP BÀI)
// ---------------------------------------------------------------------

// 13.1. Kéo Menu Đề thi & Khởi tạo (UI Builder)
window.hienThiThongTinNhiemVuTrai = () => {
    const khungTrai = document.getElementById('thong-tin-nhiem-vu-trai');
    if (!khungTrai || !window.thongTinDeHienTai) return;
    khungTrai.innerHTML = `
        <div style="background: #f8f9fa; border: 1px solid #e2e8f0; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
            <div style="color: #c0392b; font-size: 15px; font-weight: 900;">${window.thongTinDeHienTai.tenDe || window.thongTinDeHienTai.tenHocLieu || "Bài thi"}</div>
            <div style="margin-top: 8px; font-family: monospace; font-size: 11px; color: #64748b;">Mã: ${window.thongTinDeHienTai.id}</div>
        </div>
        <div style="border-bottom: 1px dashed #ccc; padding-bottom: 8px;">
            <div style="color: #64748b; font-size: 11px;">Thời lượng:</div>
            <div style="font-weight: bold; color: #d35400; font-size: 14px;">⏱️ ${window.thongTinDeHienTai.thoiGian || 90} phút</div>
        </div>
    `;
};

// 🌟 13.2. TẢI ĐỀ THI TỪ KHO GITHUB (Tính năng Đột phá mới)
window.taiVaHienThiDeThi = async (maDeMoi, tenBang = "NhiemVu") => {
    const khungDeThi = document.getElementById('khung-de-thi');
    khungDeThi.innerHTML = `<div style="text-align:center; padding: 50px; color: #0056b3; font-size: 18px; font-weight:bold;">Đang tải gói dữ liệu từ máy chủ Github... Vui lòng đợi!</div>`;

    try {
        // Lấy thông tin Metadata từ Supabase
        const { data: docDeThi, error: errDb } = await window.supabaseClient.from(tenBang).select("*").eq("id", maDeMoi).single();
        if (errDb || !docDeThi) throw new Error("Không tìm thấy thông tin cấu hình của đề thi trên hệ thống.");

        window.thongTinDeHienTai = docDeThi;

        // Xác định ID Gốc của tài liệu để kéo file JSON trên GitHub
        const idBanGoc = docDeThi.idBanGoc || docDeThi.id || maDeMoi;

        // FETCH FILE JSON TỪ GITHUB (Kho public)
        const response = await fetch(`./Export_GitHub/DeThi/${idBanGoc}/DeThi_${idBanGoc}.json`);
        if (!response.ok) throw new Error("Không tìm thấy tệp tin nội dung câu hỏi trên kho lưu trữ.");

        const dataDeThiGitHub = await response.json();

        // Map dữ liệu câu hỏi từ JSON vào hệ thống RAM
        window.duLieuDeHienTai = [];
        dataDeThiGitHub.danhSachCauHoi.forEach(cauJson => {
            window.duLieuDeHienTai.push({
                id: cauJson.maCau,
                maCau: cauJson.maCau,
                loaiCau: "TN", // Cố định Trắc Nghiệm theo chuẩn cấu trúc cũ
                cauDan: cauJson.cauDan,
                paA: cauJson.paA, paB: cauJson.paB, paC: cauJson.paC, paD: cauJson.paD,
                thoiGian: docDeThi.thoiGian
            });
        });

        // Kích hoạt vẽ UI phòng thi
        window.veLaiGiaoDien();
        window.hienThiThongTinNhiemVuTrai();

    } catch (err) {
        khungDeThi.innerHTML = `<div style="color:red; text-align:center; font-weight:bold; margin-top:30px;">❌ Lỗi khởi tạo đề: ${err.message}</div>`;
    }
};

window.vaoThiTrucTiep = async (idDe, laLamLai = false) => {
    let loiCanhBao = laLamLai
        ? "🔄 XÁC NHẬN LÀM LẠI\n⚠️ Lượt làm bài sẽ bị trừ ngay sau khi bạn bấm OK."
        : "🚀 BẠN ĐÃ SẴN SÀNG?\nThời gian sẽ đếm ngược ngay sau khi bạn bấm OK.\n⚠️ Lượt làm bài sẽ bị trừ.";
    if (!confirm(loiCanhBao)) return;

    const user = window.supabaseClient.auth.user ? window.supabaseClient.auth.user() : (await window.supabaseClient.auth.getUser()).data.user;
    if (user) {
        try {
            // Tạo trước record KetQuaThi rỗng để giữ chỗ ID
            const { data: docRef } = await window.supabaseClient.from("KetQuaThi").insert([{
                uidHocSinh: user.id, maDe: idDe, tongDiem: 0, thoiGianNop: new Date().toISOString(), trangThai: "Đang làm"
            }]).select().single();
            window.idKetQuaDangLam = docRef.id;
        } catch (error) { console.error("Lỗi tạo lượt:", error); }
    }

    window.chuyenManHinh('exam');
    window.taoNutQuayLai();
    await window.taiVaHienThiDeThi(idDe, "NhiemVu");
};

window.vaoThiTuDo = async (idDe, tenBang) => {
    if (!confirm("🚀 BẠN ĐÃ SẴN SÀNG VÀO LUYỆN TẬP TỰ DO?\nThời gian sẽ tính ngay sau khi bạn bấm OK.")) return;
    window.chuyenManHinh('exam');
    window.taoNutQuayLai();
    await window.taiVaHienThiDeThi(idDe, tenBang);
};

// 13.5. Vẽ Giao diện Đề thi và Chạy Đồng Hồ (Giữ nguyên thuật toán render UI cũ)
window.veLaiGiaoDien = () => {
    const khungDeThi = document.getElementById('khung-de-thi');
    const sidebarRight = document.getElementById('sidebar-right');

    if (!window.duLieuDeHienTai || window.duLieuDeHienTai.length === 0) {
        khungDeThi.innerHTML = `<div style="text-align:center; padding: 50px; color: #dc3545; font-size: 18px; font-weight:bold;">⚠️ Không thể tải dữ liệu. Các câu hỏi có thể đã bị lỗi định dạng!</div>`;
        return;
    }

    window.duLieuDeHienTai.forEach((data, index) => {
        if (data.thuTuGoc === undefined) data.thuTuGoc = index;
        if (data.loaiCau === "TN" && !data.dsTron) {
            data.dsTron = shuffleArray([{ idGoc: 'A', text: data.paA }, { idGoc: 'B', text: data.paB }, { idGoc: 'C', text: data.paC }, { idGoc: 'D', text: data.paD }]);
        }
    });

    window.tongSoCauDeHienTai = window.duLieuDeHienTai.length;
    window.soCauDaLam = 0; window.baiDaNop = false;

    let htmlContent = `<div style="background:#0056b3; color:white; padding:15px; border-radius:8px; margin-bottom:20px; box-shadow:0 4px 6px rgba(0,0,0,0.1);"><h2 style="margin:0; font-size:18px;">📝 ${window.thongTinDeHienTai.tenDe || window.thongTinDeHienTai.tenHocLieu || "Bài thi"}</h2></div>`;
    let rightNavContent = `
        <h3 style="margin-top: 0; font-size: 16px; text-align: center; color: #495057; border-bottom: 2px solid #ced4da; padding-bottom: 10px;">📌 MỤC LỤC</h3>
        <div id="khung-dong-ho" style="background: #fff3cd; border: 1px solid #ffe69c; color: #856404; font-weight: bold; text-align: center; padding: 12px; margin-bottom: 15px; border-radius: 6px; font-size: 26px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); position: sticky; top: 0; z-index: 1000;">⏱️ <span id="dong-ho-dem-nguoc">--:--</span></div>
        <div id="thong-ke-tien-do" style="background: #e8f4f8; border: 1px solid #b8daff; color: #0056b3; font-weight: bold; text-align: center; padding: 10px; margin-bottom: 15px; border-radius: 6px;">Đã làm: 0/${window.tongSoCauDeHienTai}</div>
        <div id="khung-ket-qua" style="display: none; background: #d4edda; border: 1px solid #c3e6cb; color: #155724; text-align: center; padding: 15px; margin-bottom: 15px; border-radius: 6px;"></div>
        <button id="btn-nop-bai" style="width: 100%; padding: 12px; background: #28a745; color: white; border: none; border-radius: 6px; font-weight: bold; font-size: 16px; cursor: pointer; margin-bottom: 20px;" onclick="window.xuLyNopBaiThi(this)">📤 NỘP BÀI THI</button>
    `;

    rightNavContent += window.taoNhomNutSidebar("Trắc nghiệm", window.duLieuDeHienTai, 1);
    window.duLieuDeHienTai.forEach((cau, index) => { htmlContent += window.taoGiaoDienCauHoi(cau, index + 1, "TN"); });

    khungDeThi.innerHTML = htmlContent;
    sidebarRight.innerHTML = rightNavContent;

    // Kích hoạt MathJax
    if (window.renderMathInElement) window.renderMathInElement(khungDeThi, { delimiters: [{ left: "$$", right: "$$", display: true }, { left: "$", right: "$", display: false }], throwOnError: false });

    if (window.timerInterval) clearInterval(window.timerInterval);
    window.thoiGianConLai = (window.duLieuDeHienTai[0].thoiGian || window.thongTinDeHienTai.thoiGian || 90) * 60;
    window.thoiDiemBatDauLamBai = Date.now();

    window.timerInterval = setInterval(() => {
        if (window.baiDaNop) { clearInterval(window.timerInterval); return; }
        window.thoiGianConLai--;
        const dongHoSpan = document.getElementById('dong-ho-dem-nguoc');
        if (dongHoSpan) {
            dongHoSpan.innerText = `${Math.floor(window.thoiGianConLai / 60).toString().padStart(2, '0')}:${(window.thoiGianConLai % 60).toString().padStart(2, '0')}`;
        }
        if (window.thoiGianConLai <= 0) {
            clearInterval(window.timerInterval); alert("⏳ ĐÃ HẾT THỜI GIAN LÀM BÀI!"); document.getElementById('btn-nop-bai').click();
        }
    }, 1000);
};

window.capNhatTienDo = (maCau, dapAnChon = "") => {
    if (window.baiDaNop) return;
    const nutBanDo = document.getElementById(`btn-nav-${maCau}`);
    if (nutBanDo) {
        if (!nutBanDo.classList.contains('da-lam')) {
            nutBanDo.classList.add('da-lam'); window.soCauDaLam++;
            const thongKeE = document.getElementById('thong-ke-tien-do');
            if (thongKeE) thongKeE.innerText = `Đã làm: ${window.soCauDaLam}/${window.tongSoCauDeHienTai}`;
        }
        nutBanDo.style.background = '#d4edda'; nutBanDo.style.borderColor = '#c3e6cb'; nutBanDo.style.color = '#155724';
    }
};

// 🌟 13.7. TRÁI TIM PHÒNG THI: CHẤM ĐIỂM BẰNG SUPABASE & TẢI LỜI GIẢI TỪ GITHUB
window.xuLyNopBaiThi = async (btnNop, isForceLeave = false) => {
    if (!isForceLeave && window.thoiGianConLai > 0) {
        if (!confirm("Bạn có chắc chắn muốn nộp bài?")) return;
    }

    window.baiDaNop = true;
    if (window.timerInterval) clearInterval(window.timerInterval);

    if (btnNop) { btnNop.innerText = "⏳ ĐANG CHẤM ĐIỂM..."; btnNop.disabled = true; }

    const maDeHienTai = window.thongTinDeHienTai.id;
    const idBanGoc = window.thongTinDeHienTai.idBanGoc || maDeHienTai;
    const danhSachCau = document.querySelectorAll('.cau-hoi');

    // Thu thập đáp án của học sinh
    let answers = {};
    danhSachCau.forEach(cauHoiDiv => {
        const idCau = cauHoiDiv.id.replace('cau-', '');
        const selected = cauHoiDiv.querySelector('.lua-chon-tn input[type="radio"]:checked');
        answers[idCau] = selected ? selected.getAttribute('data-chon') : "";
    });

    try {
        // 1. Tải Chìa khóa bảo mật giải mã từ Supabase
        const { data: keyData, error: errKey } = await window.supabaseClient
            .from('KhoaBaoMat')
            .select('link_loi_giai, chuoi_dap_an')
            .eq('ma_de', idBanGoc)
            .single();

        if (errKey || !keyData) throw new Error("Chưa có cấu hình đáp án cho đề thi này!");

        // 2. Chấm điểm siêu tốc ngay trên RAM bằng "Bản đồ giải mã"
        const dictGiaiMa = {};
        const mangDapAn = keyData.chuoi_dap_an.split(',');
        let soCauDung = 0; let diemTN = 0; let chiTietBaiLam = [];

        mangDapAn.forEach(item => {
            const parts = item.split('|');
            if (parts.length === 3) {
                const maCauHoi = parts[0]; const maBaoMat = parts[1]; const dapAnDung = parts[2];
                dictGiaiMa[maBaoMat] = { maCau: maCauHoi, dapAnDung: dapAnDung };

                let isDung = false;
                if (answers[maCauHoi] === dapAnDung) {
                    soCauDung++; diemTN += 0.25; isDung = true; // Giả định mỗi câu 0.25 điểm
                }

                chiTietBaiLam.push({
                    maCau: maCauHoi,
                    diem: isDung ? 0.25 : 0,
                    ketQua: isDung ? "Đúng" : (answers[maCauHoi] ? "Sai" : "Bỏ trống"),
                    luaChonHS: answers[maCauHoi] || ""
                });
            }
        });

        // 3. Tải file Lời giải bí mật dạng JSON từ GitHub
        let listLG = [];
        try {
            const resLg = await fetch(`./Export_GitHub/LoiGiai_BaoMat/${keyData.link_loi_giai}`);
            if (resLg.ok) listLG = await resLg.json();
        } catch (e) { console.warn("Không tải được lời giải chi tiết từ GitHub."); }

        // 4. Lưu Điểm số lên Supabase
        const user = window.supabaseClient.auth.user ? window.supabaseClient.auth.user() : (await window.supabaseClient.auth.getUser()).data.user;
        if (user) {
            const duLieuKetQua = {
                uidHocSinh: user.id,
                maDe: maDeHienTai,
                tenDe: window.thongTinDeHienTai.tenDe || window.thongTinDeHienTai.tenHocLieu,
                tongDiem: Number(diemTN.toFixed(2)),
                thoiGianNop: new Date().toISOString(),
                chiTiet: chiTietBaiLam,
                trangThai: "Đã nộp"
            };

            if (window.idKetQuaDangLam) {
                await window.supabaseClient.from("KetQuaThi").update(duLieuKetQua).eq("id", window.idKetQuaDangLam);
                window.idKetQuaDangLam = null;
            } else {
                await window.supabaseClient.from("KetQuaThi").insert([duLieuKetQua]);
            }
        }

        // 5. Hiển thị UI kết quả cực đẹp
        const qDapAnLucNop = window.thongTinDeHienTai.choXemDapAn !== false;
        const qLoiGiaiLucNop = window.thongTinDeHienTai.choXemLoiGiai !== false;

        if (!isForceLeave) {
            danhSachCau.forEach(cauHoiDiv => {
                const idCau = cauHoiDiv.id.replace('cau-', '');
                const hsChon = answers[idCau];

                let dapAnDungStr = ""; let loiGiaiHtml = "";

                // Dùng dictGiaiMa để dò lại đáp án và lời giải tương ứng
                listLG.forEach(itemLG => {
                    if (dictGiaiMa[itemLG.maBaoMat] && dictGiaiMa[itemLG.maBaoMat].maCau === idCau) {
                        dapAnDungStr = itemLG.dapAn;
                        loiGiaiHtml = itemLG.loiGiai ? `<img src="${itemLG.loiGiai}" style="max-width:100%; border-radius:4px; margin-top:10px;">` : '<em>(Không có lời giải chi tiết)</em>';
                    }
                });

                // Tô màu phương án UI
                cauHoiDiv.querySelectorAll('.lua-chon-tn').forEach(item => {
                    item.querySelector('input').disabled = true;
                    const val = item.getAttribute('data-chon');

                    if (qDapAnLucNop) {
                        if (val === dapAnDungStr) { item.style.background = '#d4edda'; item.style.borderColor = '#c3e6cb'; item.style.color = '#155724'; }
                        else if (val === hsChon && hsChon !== dapAnDungStr) { item.style.background = '#f8d7da'; item.style.borderColor = '#f5c6cb'; item.style.color = '#721c24'; }
                        else { item.style.opacity = '0.5'; }
                    } else {
                        if (val === hsChon) { item.style.background = '#e2e8f0'; item.style.borderColor = '#cbd5e1'; }
                        else { item.style.opacity = '0.5'; }
                    }
                });

                // Gắn khung lời giải
                const divLG = document.getElementById(`vung-loi-giai-${idCau}`);
                if (divLG) {
                    let htmlPhanLG = `<div class="phan-loi-giai" style="margin-top: 15px;">`;
                    htmlPhanLG += qDapAnLucNop ? `<div style="padding: 10px; background: #fff3cd; color: #856404; font-weight: bold; border-radius: 6px; border: 1px solid #ffe69c; margin-bottom:10px;">🎯 Đáp án đúng: ${dapAnDungStr}</div>` : `<div style="padding: 10px; background: #f8f9fa; color: #6c757d; font-style: italic; border-radius: 6px; margin-bottom: 10px; border: 1px dashed #ccc;">🔒 Đáp án đã bị ẩn do cài đặt của Giáo viên.</div>`;
                    htmlPhanLG += qLoiGiaiLucNop ? `<div style="padding: 15px; background: #e8f4f8; border-left: 4px solid #0056b3; border-radius: 6px;">📝 <strong>Lời giải chi tiết:</strong><br>${loiGiaiHtml}</div>` : ``;
                    htmlPhanLG += `</div>`;
                    divLG.innerHTML = htmlPhanLG;
                }

                // Tô màu bảng Mục lục bên phải
                const nutNav = document.getElementById(`btn-nav-${idCau}`);
                if (nutNav) {
                    nutNav.style.color = 'white';
                    if (qDapAnLucNop) {
                        if (hsChon === dapAnDungStr) { nutNav.style.background = '#28a745'; nutNav.style.borderColor = '#218838'; }
                        else if (hsChon !== "") { nutNav.style.background = '#dc3545'; nutNav.style.borderColor = '#c82333'; }
                        else { nutNav.style.background = '#6c757d'; nutNav.style.borderColor = '#5a6268'; }
                    } else {
                        nutNav.style.background = hsChon !== "" ? '#0056b3' : '#6c757d';
                    }
                }
            });
        }

        // Hiện Box Điểm Tổng
        if (btnNop) btnNop.style.display = 'none';
        const khungKetQua = document.getElementById('khung-ket-qua');
        if (khungKetQua) {
            khungKetQua.style.display = 'block';
            khungKetQua.innerHTML = `
                <div style="font-size:20px; font-weight: bold; margin-bottom: 10px; color: #d35400;">🏆 KẾT QUẢ BÀI THI</div>
                <div style="font-size:36px; font-weight: 900; color: #dc3545; margin-bottom: 5px;">${diemTN.toFixed(2)} ĐIỂM</div>
                <div style="font-size: 14px; color: #0056b3; font-weight:bold;">Tỉ lệ đúng: ${soCauDung}/${mangDapAn.length} câu</div>
            `;
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (err) {
        alert(err.message);
        if (btnNop) { btnNop.innerText = "NỘP BÀI LẠI"; btnNop.disabled = false; }
    }
};

// 🌟 13.8. HÀM MỚI: XEM LẠI BÀI THI CŨ
window.xemLaiBaiThi = async (maDeBanGoc, idKetQuaLichSu) => {
    // Để giữ file gọn gàng, tính năng xem lại bài sẽ gọi lại hàm taiVaHienThiDeThi
    // và áp dụng kết quả của KetQuaThi y hệt cách UI Nộp bài làm ở trên.
    alert("Tính năng tái tạo không gian phòng thi đang được bảo trì cho bản cập nhật tới!");
};

// ---------------------------------------------------------------------
// 14. BẮT SỰ KIỆN GIAO DIỆN (EVENT LISTENERS)
// ---------------------------------------------------------------------
const khungDeThiDOM = document.getElementById('khung-de-thi');
if (khungDeThiDOM) {
    khungDeThiDOM.addEventListener('click', function (e) {
        if (window.baiDaNop) return;
        const label = e.target.closest('.lua-chon-tn');
        if (!label) return;

        const idCauHoi = label.getAttribute('data-id');
        window.capNhatTienDo(idCauHoi, label.getAttribute('data-chon'));

        const vungChua = document.getElementById('ds-' + idCauHoi);
        vungChua.querySelectorAll('.lua-chon-tn').forEach(l => { l.style.background = '#f8f9fa'; l.style.borderColor = '#ddd'; });
        label.style.background = '#e9ecef'; label.style.borderColor = '#b8daff';
        const radioBtn = label.querySelector('input[type="radio"]');
        if (radioBtn) radioBtn.checked = true;
    });
}


if (btnLogout) {
    btnLogout.addEventListener('click', () => window.supabaseClient.auth.signOut().catch(e => console.error("Lỗi Đăng xuất", e)));
}
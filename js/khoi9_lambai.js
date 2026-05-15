

// =====================================================================
// 🛠️ KHỐI 2: CÁC HÀM TIỆN ÍCH DÙNG CHUNG (UTILITIES)
// =====================================================================
// Các hàm này độc lập hoàn toàn, gọi ở đâu cũng chạy, không phụ thuộc Firebase.

// ---------------------------------------------------------------------
// 2.1. Hàm sinh mã ngẫu nhiên (Dùng tạo Mã Đề, Mã Lớp, Mã Truy Cập)
// ---------------------------------------------------------------------
// Cố tình loại bỏ các ký tự dễ nhầm lẫn như O, 0, I, 1
function taoMaNgauNhien(doDai) {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let result = '';
    for (let i = 0; i < doDai; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// ---------------------------------------------------------------------
// 2.2. Hàm trộn mảng ngẫu nhiên (Fisher-Yates Shuffle)
// ---------------------------------------------------------------------
// Dùng để đảo vị trí câu hỏi hoặc đảo 4 phương án A B C D
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// ---------------------------------------------------------------------
// 2.3. Hàm chuyển đổi giờ chuẩn ISO sang giờ địa phương (Local Time)
// ---------------------------------------------------------------------
// Dùng để đổ dữ liệu Hạn chót từ Database vào ô <input type="datetime-local">
function formatDateTimeLocal(isoString) {
    if (!isoString) return "";
    const d = new Date(isoString);
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
}

// ---------------------------------------------------------------------
// 2.4. Hàm cắt gọt Text HTML siêu dài thành chuỗi ngắn (Làm trích dẫn)
// ---------------------------------------------------------------------
// Dùng trong bảng Admin để hiển thị nội dung câu hỏi gọn gàng
function rutGonTextHtml(html) {
    if (!html) return "";
    let tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    let text = tmp.textContent || tmp.innerText || "";
    return text.substring(0, 120) + "...";
}

// ---------------------------------------------------------------------
// 2.5. BỘ DỊCH CÔNG THỨC LATEX VÀ XỬ LÝ HTML TỪ TOOL C# LÊN WEB
// ---------------------------------------------------------------------
// Đây là hàm cực kỳ quan trọng để xử lý lỗi hiển thị toán học, TikZ, Bảng biến thiên
function dichLaTeX(tex) {
    if (!tex) return "";

    // BƯỚC 1: MÃ HÓA HTML VÀ BẢO VỆ ẢNH (Bảo vệ thẻ <img> không bị cắt hỏng)
    let imgTags = [];
    tex = tex.replace(/<img[^>]*>/gi, function (match) {
        imgTags.push(match);
        return '___IMG_TAG_' + (imgTags.length - 1) + '___';
    });

    // Chuyển đổi các dấu lớn/bé để không bị trình duyệt nhận nhầm thành thẻ HTML
    tex = tex.replace(/</g, ' &lt; ').replace(/>/g, ' &gt; ');

    // Trả lại thẻ ảnh
    imgTags.forEach((img, index) => {
        tex = tex.replace('___IMG_TAG_' + index + '___', img);
    });

    // BƯỚC 2: CHUẨN HÓA KÝ HIỆU VECTOR ĐỂ MATHJAX KHÔNG BỊ SẬP
    tex = tex.replace(/\|\\overrightarrow\{([^}]+)\}\|/g, '\\left|\\overrightarrow{$1}\\right|');
    tex = tex.replace(/\|\\vec\{([^}]+)\}\|/g, '\\left|\\vec{$1}\\right|');
    tex = tex.replace(/\|([^|]+?)\\overrightarrow\{([^}]+)\}([^|]+?)\|/g, '\\left|$1\\overrightarrow{$2}$3\\right|');

    // BƯỚC 3: THUẬT TOÁN "BỌC LÕI" - GIẤU BẢO VỆ TOÀN BỘ CÔNG THỨC TOÁN
    let hiddenBlocks = [];
    const hideBlock = (match) => {
        hiddenBlocks.push(match);
        return `___MATH_BLOCK_${hiddenBlocks.length - 1}___`;
    };

    tex = tex.replace(/\\begin\{(array|tabular|tikzpicture|aligned|eqnarray\*?|cases|[bpvB]matrix)\}[\s\S]*?\\end\{\1\}/g, hideBlock);
    tex = tex.replace(/\$\$[\s\S]*?\$\$/g, hideBlock);
    tex = tex.replace(/\\\[[\s\S]*?\\\]/g, hideBlock);
    tex = tex.replace(/\$[^$]+\$/g, hideBlock);

    // BƯỚC 4: XỬ LÝ XUỐNG DÒNG VÀ DỌN RÁC (Sau khi lõi toán đã an toàn)
    tex = tex.replace(/(?:\r?\n){2,}/g, '<br><br>');
    tex = tex.replace(/\\\\/g, '<br>');
    tex = tex.replace(/\\(noindent|centering|hfill|vfill|vspace\{[^}]+\}|hspace\{[^}]+\})\s*/g, '');

    tex = tex.replace(/\\shortans\[[^\]]*\]\{([\s\S]*?)\}/g, '<br><strong style="color:#d35400;">🎯 Đáp số:</strong> $1');
    tex = tex.replace(/\\textbf\{([\s\S]*?)\}/g, '<strong>$1</strong>');

    // BƯỚC 5: TRẢ LẠI RUỘT TOÁN VÀO ĐÚNG VỊ TRÍ 
    // Dùng split().join() thay cho replace() để 100% chống cắt xén chuỗi có ký tự đặc biệt
    for (let i = hiddenBlocks.length - 1; i >= 0; i--) {
        tex = tex.split(`___MATH_BLOCK_${i}___`).join(hiddenBlocks[i]);
    }

    // BƯỚC 6: XỬ LÝ SÂU BÊN TRONG CÁC KHỐI TOÁN ĐẶC THÙ (Bảng biến thiên, đồ thị)
    tex = tex.replace(/\\renewcommand\s*\{\s*\\arraystretch\s*\}\s*\{[^}]+\}/g, '');
    tex = tex.replace(/\\allowdisplaybreaks/g, '');

    tex = tex.replace(/\$\$\s*(\\begin{eqnarray\*?}[\s\S]*?\\end{eqnarray\*?})\s*\$\$/g, '$1');
    tex = tex.replace(/\\begin{eqnarray\*?}/g, '$$\\begin{aligned}');
    tex = tex.replace(/\\end{eqnarray\*?}/g, '\\end{aligned}$$');
    tex = tex.replace(/\\begin{center}([\s\S]*?)\\end{center}/g, '<div style="text-align: center; overflow-x: auto; margin: 10px 0;">$1</div>');

    // Nhúng Script cho TikzJax
    tex = tex.replace(/\\begin{tikzpicture}([\s\S]*?)\\end{tikzpicture}/g, function (match) {
        return '<script type="text/tikz">' + match + '</script>';
    });

    tex = tex.replace(/\$\$\s*(\\begin{(tabular|array)}[\s\S]*?\\end{\2})\s*\$\$/g, '$1');
    tex = tex.replace(/\\begin{(tabular|array)}([\s\S]*?)\\end{\1}/g, function (match, type, inner) {
        if (type === 'tabular' || inner.includes('\\hline') || match.includes('|')) {
            let cleanInner = inner.replace(/\$\$/g, '').replace(/(?<!\\)\$/g, '');

            cleanInner = cleanInner.replace(/&gt;\{\\centering\\arraybackslash\}p\{[^}]+\}/g, 'c');
            cleanInner = cleanInner.replace(/p\{[^}]+\}/g, 'c');
            cleanInner = cleanInner.replace(/m\{[^}]+\}/g, 'c');

            cleanInner = cleanInner.replace(/\\multicolumn\{([^}]+)\}\{([^}]+)\}/g, function (m, p1, p2) {
                let newAlign = p2.includes('|') ? '|c|' : 'c';
                return `\\multicolumn{${p1}}{${newAlign}}`;
            });

            cleanInner = cleanInner.replace(/\\multirow\{[^}]+\}\{[^}]+\}\{([\s\S]*?)\}/g, '$1');

            // Xử lý các đoạn text tiếng Việt xen kẽ trong công thức
            const viChars = "A-ZĐa-zđ0-9áàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵ";
            const regexText = new RegExp(`([${viChars}]+(?:\\s+[${viChars}]+)+)`, 'g');
            cleanInner = cleanInner.replace(regexText, '\\text{$1}');

            return '<div style="overflow-x: auto; margin: 10px 0; padding-bottom: 5px;">$$\\begin{array}' + cleanInner + '\\end{array}$$</div>';
        }
        return match;
    });

    // BƯỚC 7: XỬ LÝ DANH SÁCH (LISTS CỦA BỘ EXAM)
    tex = tex.split('\\begin{itemchoice}').join('<ul style="margin: 10px 0 10px 20px; list-style-type: lower-alpha;">');
    tex = tex.split('\\end{itemchoice}').join('</ul>');
    tex = tex.split('\\itemch').join('<li style="margin-bottom: 8px;">');
    tex = tex.split('\\begin{itemize}').join('<ul style="margin: 10px 0 10px 20px; list-style-type: disc;">');
    tex = tex.split('\\end{itemize}').join('</ul>');
    tex = tex.split('\\item').join('<li style="margin-bottom: 8px;">');

    return tex;
}
// ========================= KẾT THÚC KHỐI 2 =========================



// =====================================================================
// 13. QUY TRÌNH LÀM BÀI (VÀO THI, CHỌN ĐỀ, CHẤM ĐIỂM)
// =====================================================================

// 🌟 13.0. CƠ CHẾ CHUYỂN TRANG ĐỘC LẬP (KHÓA CHẶT THANH CUỘN GỐC)
window.chuyenManHinh = (manHinh) => {
    const elDash = document.getElementById('dashboard-container');

    // Khi vào phòng thi
    if (manHinh === 'exam') {
        if (elDash) elDash.style.display = 'none';
        mainContainer.style.display = 'flex';
        khungDeThi.style.display = 'block';

        // 🌟 KHÓA CHẶT THANH CUỘN CỦA TRANG WEB GỐC
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
    }
    // Khi trở về màn hình quản lý
    else {
        mainContainer.style.display = 'none';
        khungDeThi.style.display = 'none';
        if (elDash) elDash.style.display = 'block';

        // 🌟 TRẢ LẠI THANH CUỘN KHI THOÁT PHÒNG THI
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
    }
    window.scrollTo(0, 0); // Ép cuộn lên trên cùng
};

// 🌟 13.0.1. TẠO NÚT QUAY LẠI CÓ GẮN "LÍNH GÁC" (AUTO SUBMIT)
window.taoNutQuayLai = () => {
    let btnBack = document.getElementById('btn-ve-dashboard');
    if (btnBack) btnBack.remove();

    btnBack = document.createElement('button');
    btnBack.id = 'btn-ve-dashboard';
    btnBack.innerHTML = '🔙 Quay lại Bảng điều khiển';
    btnBack.style.cssText = 'width: 100%; padding: 12px; background: #6c757d; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; margin-bottom: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: 0.2s;';
    btnBack.onmouseover = () => btnBack.style.background = '#5a6268';
    btnBack.onmouseout = () => btnBack.style.background = '#6c757d';

    btnBack.onclick = async () => {
        // KIỂM TRA: Đang thi dở mà dám thoát?
        if (!baiDaNop && duLieuDeHienTai && duLieuDeHienTai.length > 0) {
            const xacNhan = confirm("⚠️ BẠN ĐANG TRONG PHÒNG THI!\nNếu thoát ra bây giờ, hệ thống sẽ TỰ ĐỘNG NỘP BÀI và chốt điểm hiện tại của bạn.\nBạn có chắc chắn muốn nộp bài và thoát?");
            if (!xacNhan) return; // Hủy lệnh thoát

            // Xử lý nộp bài ép buộc ngầm (tham số isForceLeave = true)
            const btnNop = document.getElementById('btn-nop-bai');
            if (btnNop) await window.xuLyNopBaiThi(btnNop, true);
        }

        // Trở về dashboard an toàn
        window.chuyenManHinh('dashboard');
        duLieuDeHienTai = []; // Dọn dẹp RAM

        // Tải lại bảng để cập nhật điểm mới nhất
        if (auth.currentUser && typeof window.hienThiDanhSachNhiemVu === "function") {
            window.hienThiDanhSachNhiemVu(auth.currentUser.uid, true);
        }
    };

    // Gắn nút lên đầu cột trái
    document.getElementById('sidebar-left').insertBefore(btnBack, document.getElementById('sidebar-left').firstChild);
};

// 🌟 13.1. HIỂN THỊ HỒ SƠ NHIỆM VỤ CHI TIẾT (Cột trái)
window.hienThiThongTinNhiemVuTrai = async () => {
    const khungTrai = document.getElementById('thong-tin-nhiem-vu-trai');
    if (!khungTrai || !thongTinDeHienTai) return;
    const user = auth.currentUser; if (!user) return;

    try {
        const snapKQ = await getDocs(query(collection(db, "KetQuaThi"), where("uidHocSinh", "==", user.uid), where("maDe", "==", thongTinDeHienTai.id)));
        const soLanDaLam = snapKQ.size;

        const formatTime = (iso) => iso ? new Date(iso).toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' }) : 'Không giới hạn';

        const luotGoc = thongTinDeHienTai.soLanLamBai !== undefined ? thongTinDeHienTai.soLanLamBai : 1;
        const luotThem = (thongTinDeHienTai.luotThemNgoaiLe && thongTinDeHienTai.luotThemNgoaiLe[user.uid]) ? thongTinDeHienTai.luotThemNgoaiLe[user.uid] : 0;
        const tongLuotChoPhep = luotGoc === 0 ? "Vô hạn" : (luotGoc + luotThem);
        const luotConLai = tongLuotChoPhep === "Vô hạn" ? "∞" : Math.max(0, tongLuotChoPhep - soLanDaLam);

        const tgGiao = formatTime(thongTinDeHienTai.thoiGianGiao || thongTinDeHienTai.ngayTao);
        const hanChotGoc = thongTinDeHienTai.hanChot;
        const hanChotNgoaiLe = (thongTinDeHienTai.hanChotNgoaiLe && thongTinDeHienTai.hanChotNgoaiLe[user.uid]) ? thongTinDeHienTai.hanChotNgoaiLe[user.uid] : null;
        const hanChotHienThi = hanChotNgoaiLe ? formatTime(hanChotNgoaiLe) : formatTime(hanChotGoc);

        const badgeHanChot = hanChotNgoaiLe ? `<div style="color:#856404; font-size:11px; font-weight:bold; margin-top:4px;">(Đã gia hạn riêng)</div>` : ``;
        const badgeLuot = luotThem > 0 ? `<div style="color:#856404; font-size:11px; font-weight:bold; margin-bottom:4px;">(Được cấp thêm +${luotThem} lượt)</div>` : ``;

        const chuoiCauTruc = thongTinDeHienTai.cauTruc || (thongTinDeHienTai.danhSachCauHoi ? thongTinDeHienTai.danhSachCauHoi.length + " câu" : "0 câu");

        khungTrai.innerHTML = `
            <div style="background: #f8f9fa; border: 1px solid #e2e8f0; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                <div style="font-size: 11px; color: #64748b; font-weight: bold; margin-bottom: 5px; text-transform: uppercase;">Tên Nhiệm vụ:</div>
                <div style="color: #c0392b; font-size: 15px; font-weight: 900; line-height: 1.4;">${thongTinDeHienTai.tenDe || thongTinDeHienTai.tenHocLieu || "Bài thi"}</div>
                <div style="margin-top: 8px; font-family: monospace; font-size: 11px; color: #64748b; background: #e2e8f0; display: inline-block; padding: 2px 6px; border-radius: 4px;">Mã: ${thongTinDeHienTai.maNhiemVu || thongTinDeHienTai.id.slice(-5)}</div>
            </div>

            <div style="display: flex; flex-direction: column; gap: 10px;">
                <div style="border-bottom: 1px dashed #ccc; padding-bottom: 8px;">
                    <div style="color: #64748b; font-size: 11px;">Giáo viên giao:</div>
                    <div style="font-weight: bold; color: #0056b3; font-size: 14px;">👨‍🏫 ${thongTinDeHienTai.nguoiTao || "Hệ thống"}</div>
                </div>
                <div style="border-bottom: 1px dashed #ccc; padding-bottom: 8px;">
                    <div style="color: #64748b; font-size: 11px;">Thời lượng / Quy mô:</div>
                    <div style="font-weight: bold; color: #d35400; font-size: 14px;">⏱️ ${thongTinDeHienTai.thoiGian || 90} phút</div>
                    <div style="font-weight: bold; color: #27ae60; font-size: 13px; margin-top: 4px;">📊 ${chuoiCauTruc}</div>
                </div>
                <div style="border-bottom: 1px dashed #ccc; padding-bottom: 8px;">
                    <div style="color: #64748b; font-size: 11px;">Bắt đầu mở lúc:</div>
                    <div style="font-weight: bold; color: #333; font-size: 13px;">▶ ${tgGiao}</div>
                </div>
                <div style="border-bottom: 1px dashed #ccc; padding-bottom: 8px; background: #fff5f5; padding: 8px; border-radius: 6px;">
                    <div style="color: #c0392b; font-size: 11px; font-weight: bold; margin-bottom: 2px;">Hạn chót thu bài:</div>
                    <div style="font-weight: bold; color: #c0392b; font-size: 13px;">⏹ ${hanChotHienThi}</div>
                    ${badgeHanChot}
                </div>
                <div style="background: #f4eefe; padding: 10px; border-radius: 6px; border: 1px solid #d8b4fe;">
                    <div style="color: #6f42c1; font-size: 12px; font-weight: bold; margin-bottom: 8px;">Thống kê lượt làm:</div>
                    ${badgeLuot}
                    <div style="display: flex; justify-content: space-between; margin-bottom: 3px;">
                        <span style="color:#555;">Cho phép:</span> <strong>${tongLuotChoPhep}</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 3px;">
                        <span style="color:#555;">Đã dùng:</span> <strong style="color:#c0392b;">${soLanDaLam}</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-top: 5px; padding-top: 5px; border-top: 1px solid #e9ecef;">
                        <span style="color:#555; font-weight:bold;">Còn lại:</span> <strong style="color:#28a745; font-size:15px;">${luotConLai}</strong>
                    </div>
                </div>
                ${thongTinDeHienTai.loiNhan ? `
                <div style="background: #fff3cd; padding: 10px; border-radius: 6px; border: 1px solid #ffe69c; font-style: italic; margin-top: 5px;">
                    <span style="font-size:16px;">💬</span> "${thongTinDeHienTai.loiNhan}"
                </div>` : ''}
            </div>
        `;
    } catch (e) { khungTrai.innerHTML = `<div style="color:red;">Lỗi trích xuất: ${e.message}</div>`; }
};


// 13.2. Hàm LÕI: Tải và hiển thị bài thi
window.taiVaHienThiDeThi = async (maDeMoi, tenBang) => {
    khungDeThi.innerHTML = `<div style="text-align:center; padding: 50px; color: #d35400; font-size: 18px; font-weight:bold;">Đang trích xuất câu hỏi từ kho... Vui lòng đợi!</div>`;
    const tempTrai = document.getElementById('thong-tin-nhiem-vu-trai');
    if (tempTrai) tempTrai.innerHTML = "<div style='text-align:center; color:#666; padding: 20px;'>Đang lấy hồ sơ nhiệm vụ...</div>";

    try {
        const docDeThi = await getDoc(doc(db, tenBang, maDeMoi));
        if (!docDeThi.exists()) {
            khungDeThi.innerHTML = `<div style="color:red; text-align:center; font-weight:bold; font-size:18px; margin-top:30px;">❌ Lỗi: Bài thi không tồn tại.</div>`; return;
        }

        thongTinDeHienTai = docDeThi.data(); thongTinDeHienTai.id = docDeThi.id;
        const mangMaCau = thongTinDeHienTai.danhSachCauHoi || [];
        if (mangMaCau.length === 0) {
            khungDeThi.innerHTML = `<div style="text-align:center; margin-top:50px; font-weight:bold; color:#dc3545; font-size:18px;">⚠️ Cảnh báo: Đề thi này trống!</div>`; return;
        }

        const arrPromises = mangMaCau.map(idCau => getDoc(doc(db, "CauHoi", idCau)));
        const snapCauHoi = await Promise.all(arrPromises);

        duLieuDeHienTai = [];
        snapCauHoi.forEach(snap => {
            if (snap.exists()) {
                let dataCau = snap.data(); dataCau.id = snap.id;
                dataCau.loaiCau = dataCau.kieuCau ? dataCau.kieuCau.trim().toUpperCase() : "TN";
                dataCau.maDe = thongTinDeHienTai.id;
                dataCau.tenDe = thongTinDeHienTai.tenDe || thongTinDeHienTai.tenHocLieu;
                dataCau.thoiGian = thongTinDeHienTai.thoiGian;
                duLieuDeHienTai.push(dataCau);
            }
        });

        window.veLaiGiaoDien();
        window.hienThiThongTinNhiemVuTrai();

    } catch (err) { khungDeThi.innerHTML = `<div style="color:red; text-align:center; font-weight:bold; margin-top:30px;">❌ Lỗi tải đề: ${err.message}</div>`; }
};

// 13.3. Vào thi trực tiếp từ Bảng Nhiệm Vụ
window.vaoThiTrucTiep = async (idDe, laLamLai = false) => {
    let loiCanhBao = laLamLai
        ? "🔄 XÁC NHẬN LÀM LẠI\n⚠️ Lượt làm bài sẽ bị trừ ngay sau khi bạn bấm OK."
        : "🚀 BẠN ĐÃ SẴN SÀNG?\nThời gian sẽ đếm ngược ngay sau khi bạn bấm OK.\n⚠️ Lượt làm bài sẽ bị trừ. Cố ý thoát giữa chừng sẽ bị hệ thống tự động thu bài!";
    if (!confirm(loiCanhBao)) return;

    const user = auth.currentUser;
    if (user) {
        try {
            const docRef = await addDoc(collection(db, "KetQuaThi"), { uidHocSinh: user.uid, maDe: idDe, tongDiem: 0, thoiGianNop: new Date().toISOString(), trangThai: "Đang làm" });
            window.idKetQuaDangLam = docRef.id;
        } catch (error) { console.error("Lỗi ghi nhận lượt làm bài:", error); }
    }

    window.chuyenManHinh('exam');
    window.taoNutQuayLai();
    await window.taiVaHienThiDeThi(idDe, "NhiemVu");
};

// 13.4. Vào thi từ Thư viện tự do
window.vaoThiTuDo = async (idDe, tenBang) => {
    if (!confirm("🚀 BẠN ĐÃ SẴN SÀNG VÀO LUYỆN TẬP TỰ DO?\nThời gian sẽ tính ngay sau khi bạn bấm OK.")) return;
    window.chuyenManHinh('exam');
    window.taoNutQuayLai();
    await window.taiVaHienThiDeThi(idDe, tenBang);
};

// 13.5. Vẽ Giao diện Đề thi và Chạy Đồng Hồ
window.veLaiGiaoDien = () => {
    if (!duLieuDeHienTai || duLieuDeHienTai.length === 0) {
        khungDeThi.innerHTML = `<div style="text-align:center; padding: 50px; color: #dc3545; font-size: 18px; font-weight:bold;">⚠️ Không thể tải dữ liệu. Các câu hỏi của đề này có thể đã bị xóa khỏi Ngân hàng!</div>`;
        return;
    }

    duLieuDeHienTai.forEach((data, index) => {
        if (data.thuTuGoc === undefined) data.thuTuGoc = index;
        if (data.loaiCau === "TN" && !data.dsTron) {
            data.dsTron = shuffleArray([{ idGoc: 'A', text: dichLaTeX(data.paA || "") }, { idGoc: 'B', text: dichLaTeX(data.paB || "") }, { idGoc: 'C', text: dichLaTeX(data.paC || "") }, { idGoc: 'D', text: dichLaTeX(data.paD || "") }]);
        }
    });

    let dsTN = [], dsDS = [], dsTLN = [], dsTL = [];
    duLieuDeHienTai.forEach(data => {
        if (data.loaiCau === "TN") dsTN.push(data); else if (data.loaiCau === "DS") dsDS.push(data); else if (data.loaiCau === "TLN") dsTLN.push(data); else if (data.loaiCau === "TL") dsTL.push(data); else dsTN.push(data);
    });

    if (thongTinDeHienTai && thongTinDeHienTai.coTronCauHoi !== false) { shuffleArray(dsTN); shuffleArray(dsDS); shuffleArray(dsTLN); shuffleArray(dsTL); }
    duLieuDeHienTai = [...dsTN, ...dsDS, ...dsTLN, ...dsTL];

    tongSoCauDeHienTai = dsTN.length + dsDS.length + dsTLN.length;
    soCauDaLam = 0; baiDaNop = false;

    let htmlContent = `<div style="background:#0056b3; color:white; padding:15px; border-radius:8px; margin-bottom:20px; box-shadow:0 4px 6px rgba(0,0,0,0.1);"><h2 style="margin:0; font-size:18px;">📝 ${thongTinDeHienTai.tenDe || thongTinDeHienTai.tenHocLieu || "Bài thi"}</h2></div>`;
    let rightNavContent = `
        <h3 style="margin-top: 0; font-size: 16px; text-align: center; color: #495057; border-bottom: 2px solid #ced4da; padding-bottom: 10px;">📌 MỤC LỤC CÂU HỎI</h3>
        <div id="khung-dong-ho" style="background: #fff3cd; border: 1px solid #ffe69c; color: #856404; font-weight: bold; text-align: center; padding: 12px; margin-bottom: 15px; border-radius: 6px; font-size: 26px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); position: sticky; top: 0; z-index: 1000;">⏱️ <span id="dong-ho-dem-nguoc">--:--</span></div>
        <div id="thong-ke-tien-do" style="background: #e8f4f8; border: 1px solid #b8daff; color: #0056b3; font-weight: bold; text-align: center; padding: 10px; margin-bottom: 15px; border-radius: 6px; font-size: 15px;">Đã làm: 0/${tongSoCauDeHienTai}</div>
        <div id="khung-ket-qua" style="display: none; background: #d4edda; border: 1px solid #c3e6cb; color: #155724; text-align: center; padding: 15px; margin-bottom: 15px; border-radius: 6px;"></div>
        <button id="btn-nop-bai" style="width: 100%; padding: 12px; background: #28a745; color: white; border: none; border-radius: 6px; font-weight: bold; font-size: 16px; cursor: pointer; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: 0.2s;" onmouseover="this.style.background='#218838'" onmouseout="this.style.background='#28a745'" onclick="window.xuLyNopBaiThi(this)">📤 NỘP BÀI THI</button>
    `;

    const titleStyle = "color: #c0392b; border-bottom: 2px solid #c0392b; padding-bottom: 5px; margin-top: 40px; margin-bottom: 20px; font-size: 22px;";
    if (dsTN.length > 0) { htmlContent += `<h3 style="${titleStyle}">PHẦN I. Câu trắc nghiệm nhiều phương án lựa chọn</h3>`; rightNavContent += taoNhomNutSidebar("Phần I: TN", dsTN, 1); dsTN.forEach((cau, index) => { htmlContent += taoGiaoDienCauHoi(cau, index + 1, "TN"); }); }
    if (dsDS.length > 0) { htmlContent += `<h3 style="${titleStyle}">PHẦN II. Câu trắc nghiệm đúng sai</h3>`; rightNavContent += taoNhomNutSidebar("Phần II: ĐS", dsDS, 1); dsDS.forEach((cau, index) => { htmlContent += taoGiaoDienCauHoi(cau, index + 1, "DS"); }); }
    if (dsTLN.length > 0) { htmlContent += `<h3 style="${titleStyle}">PHẦN III. Câu trắc nghiệm trả lời ngắn</h3>`; rightNavContent += taoNhomNutSidebar("Phần III: TLN", dsTLN, 1); dsTLN.forEach((cau, index) => { htmlContent += taoGiaoDienCauHoi(cau, index + 1, "TLN"); }); }
    if (dsTL.length > 0) { htmlContent += `<h3 style="${titleStyle}">PHẦN IV. Câu hỏi tự luận</h3>`; rightNavContent += taoNhomNutSidebar("Phần IV: TL", dsTL, 1); dsTL.forEach((cau, index) => { htmlContent += taoGiaoDienCauHoi(cau, index + 1, "TL"); }); }

    khungDeThi.innerHTML = htmlContent; sidebarRight.innerHTML = rightNavContent;

    if (window.renderMathInElement) window.renderMathInElement(khungDeThi, { delimiters: [{ left: "$$", right: "$$", display: true }, { left: "$", right: "$", display: false }], throwOnError: false, macros: { "\\heva": "\\left\\{\\begin{array}{l}#1\\end{array}\\right.", "\\hoac": "\\left[\\begin{array}{l}#1\\end{array}\\right." } });
    let oldTikz = document.getElementById('tikz-script-reload'); if (oldTikz) oldTikz.remove();
    let newTikz = document.createElement('script'); newTikz.id = 'tikz-script-reload'; newTikz.src = 'https://tikzjax.com/v1/tikzjax.js'; document.body.appendChild(newTikz);

    if (timerInterval) clearInterval(timerInterval);
    thoiGianConLai = (duLieuDeHienTai[0].thoiGian || 90) * 60; thoiDiemBatDauLamBai = Date.now();

    let thoiDiemHanChot = null;
    if (thongTinDeHienTai && thongTinDeHienTai.hanChot) {
        let hanChotApDung = thongTinDeHienTai.hanChot;
        const user = auth.currentUser;
        if (user && thongTinDeHienTai.hanChotNgoaiLe && thongTinDeHienTai.hanChotNgoaiLe[user.uid]) {
            hanChotApDung = thongTinDeHienTai.hanChotNgoaiLe[user.uid];
        }
        thoiDiemHanChot = new Date(hanChotApDung).getTime();
    }

    timerInterval = setInterval(() => {
        if (baiDaNop) { clearInterval(timerInterval); return; }

        if (thoiDiemHanChot && Date.now() >= thoiDiemHanChot) {
            clearInterval(timerInterval);
            alert("⏰ ĐÃ TỚI HẠN CHÓT CỦA NHIỆM VỤ!\nHệ thống tự động thu bài.");
            document.getElementById('btn-nop-bai').click();
            return;
        }

        thoiGianConLai--;
        const dongHoSpan = document.getElementById('dong-ho-dem-nguoc');
        if (dongHoSpan) {
            dongHoSpan.innerText = `${Math.floor(thoiGianConLai / 60).toString().padStart(2, '0')}:${(thoiGianConLai % 60).toString().padStart(2, '0')}`;
            if (thoiGianConLai <= 300) {
                const khungDH = document.getElementById('khung-dong-ho');
                if (khungDH) {
                    khungDH.style.background = '#f8d7da'; khungDH.style.color = '#721c24'; khungDH.style.borderColor = '#f5c6cb'; khungDH.style.opacity = (thoiGianConLai % 2 === 0) ? '0.7' : '1';
                }
            }
        }
        if (thoiGianConLai <= 0) { clearInterval(timerInterval); alert("⏳ ĐÃ HẾT THỜI GIAN LÀM BÀI! Hệ thống sẽ tự động thu bài."); document.getElementById('btn-nop-bai').click(); }
    }, 1000);
};

// 13.6. Cập nhật tiến độ trên thanh Mục lục
window.capNhatTienDo = (maCau, dapAnChon = "") => {
    if (baiDaNop) return;
    const nutBanDo = document.getElementById(`btn-nav-${maCau}`);
    if (nutBanDo) {
        if (!nutBanDo.classList.contains('da-lam')) {
            nutBanDo.classList.add('da-lam'); soCauDaLam++;
            const thongKeE = document.getElementById('thong-ke-tien-do');
            if (thongKeE) thongKeE.innerText = `Đã làm: ${soCauDaLam}/${tongSoCauDeHienTai}`;
        }
        nutBanDo.style.background = '#d4edda'; nutBanDo.style.borderColor = '#c3e6cb'; nutBanDo.style.color = '#155724';
        const ansSpan = document.getElementById(`nav-ans-${maCau}`);
        if (ansSpan && dapAnChon !== "") { ansSpan.innerText = dapAnChon; ansSpan.style.color = '#0056b3'; }
    }
};

// 13.7. TRÁI TIM PHÒNG THI: CHẤM ĐIỂM & ĐỐI CHIẾU CẤU HÌNH NHIỆM VỤ
window.xuLyNopBaiThi = async (btnNop, isForceLeave = false) => {
    if (!isForceLeave && thoiGianConLai > 0) {
        if (!confirm("Bạn có chắc chắn muốn nộp bài? (Vui lòng kiểm tra lại các câu chưa làm ở Cột Mục lục)")) return;
    }

    baiDaNop = true;
    if (timerInterval) clearInterval(timerInterval);

    const dongHoSpan = document.getElementById('dong-ho-dem-nguoc');
    if (thoiGianConLai <= 0 && dongHoSpan) dongHoSpan.innerText = "00:00";

    if (btnNop) { btnNop.innerText = "⏳ ĐANG LƯU & TÍNH LƯỢT..."; btnNop.disabled = true; }

    let diemTN = 0, diemDS = 0, diemTLN = 0;
    let chiTietBaiLam = [];
    const danhSachCau = document.querySelectorAll('.cau-hoi');
    let maDeHienTai = (typeof thongTinDeHienTai !== 'undefined' && thongTinDeHienTai) ? thongTinDeHienTai.id : "";
    let soLanChoPhep = 1; let tenDeChuan = "Đề ôn tập"; let qDapAnLucNop = true; let qLoiGiaiLucNop = true;

    if (maDeHienTai) {
        try {
            let deSnap = await getDoc(doc(db, thongTinDeHienTai.tenBang || "NhiemVu", maDeHienTai));
            if (!deSnap.exists()) deSnap = await getDoc(doc(db, "HocLieu", maDeHienTai));
            if (deSnap.exists()) {
                const deData = deSnap.data();
                soLanChoPhep = deData.soLanLamBai !== undefined ? deData.soLanLamBai : 1;
                tenDeChuan = deData.tenDe || deData.tenHocLieu || "Đề ôn tập";
                qDapAnLucNop = deData.choXemDapAn !== false; qLoiGiaiLucNop = deData.choXemLoiGiai !== false;
            }
        } catch (err) { }
    }

    danhSachCau.forEach(cauHoiDiv => {
        const idCau = cauHoiDiv.id.replace('cau-', '');
        const loaiCau = cauHoiDiv.getAttribute('data-loaicau');
        if (loaiCau === 'TL') return;

        const cauGoc = duLieuDeHienTai.find(c => (c.maCau || c.id) === idCau);
        if (!cauGoc) return;

        const dapAnGocRaw = cauGoc.dapAn || "";
        let isDungToanBo = false; let daLam = false; let diemCuaCauNay = 0;
        let luuLuaChonHS = ""; // 🌟 BIẾN MỚI LƯU DẤU VẾT HỌC SINH

        if (loaiCau === "TN") {
            const dapAnGoc = dapAnGocRaw.trim().toUpperCase();
            const liDaChon = cauHoiDiv.querySelector('.lua-chon-tn input[type="radio"]:checked')?.closest('.lua-chon-tn');
            const chon = liDaChon ? liDaChon.getAttribute('data-chon') : "";
            if (chon !== "") daLam = true;
            luuLuaChonHS = chon;

            cauHoiDiv.querySelectorAll('.lua-chon-tn').forEach(item => {
                item.querySelector('input').disabled = true; item.onmouseover = null; item.onmouseout = null;
                const val = item.getAttribute('data-chon');
                if (!isForceLeave) {
                    if (qDapAnLucNop) {
                        if (val === dapAnGoc) { item.style.background = '#d4edda'; item.style.borderColor = '#c3e6cb'; item.style.color = '#155724'; }
                        else if (val === chon && chon !== dapAnGoc) { item.style.background = '#f8d7da'; item.style.borderColor = '#f5c6cb'; item.style.color = '#721c24'; }
                        else { item.style.opacity = '0.5'; }
                    } else {
                        if (val === chon) { item.style.background = '#e2e8f0'; item.style.borderColor = '#cbd5e1'; item.style.color = '#0f172a'; }
                        else { item.style.opacity = '0.5'; }
                    }
                }
            });
            if (chon !== "" && chon === dapAnGoc) { isDungToanBo = true; diemTN += 0.25; diemCuaCauNay = 0.25; }
        }
        else if (loaiCau === "DS") {
            const dapAnGocSach = dapAnGocRaw.replace(/[^a-zA-ZĐđ]/g, '').toUpperCase();
            const cacDong = cauHoiDiv.querySelectorAll('.dong-ds');
            let soYdung = 0, soYDaChon = 0; let chonDS = "";

            cacDong.forEach((dong, index) => {
                const radioChecked = dong.querySelector('input[type="radio"]:checked');
                const chon = radioChecked ? radioChecked.value : "";
                if (chon !== "") soYDaChon++;
                chonDS += chon ? (chon === 'T' ? 'Đ' : 'S') : '_';

                let dapAnY = dapAnGocSach[index] || "";
                if (dapAnY === 'Đ' || dapAnY === 'D') dapAnY = 'T'; if (dapAnY === 'S') dapAnY = 'F';
                dong.querySelectorAll('input[type="radio"]').forEach(r => r.disabled = true);

                if (!isForceLeave) {
                    if (qDapAnLucNop) {
                        if (chon !== "" && chon === dapAnY) { dong.style.background = '#d4edda'; dong.style.borderColor = '#c3e6cb'; dong.style.color = '#155724'; soYdung++; }
                        else if (chon !== "") { dong.style.background = '#f8d7da'; dong.style.borderColor = '#f5c6cb'; dong.style.color = '#721c24'; }
                    } else {
                        if (chon !== "") { dong.style.background = '#e2e8f0'; dong.style.borderColor = '#cbd5e1'; dong.style.color = '#0f172a'; }
                        if (chon === dapAnY) soYdung++;
                    }
                } else { if (chon === dapAnY) soYdung++; }
            });

            luuLuaChonHS = chonDS;
            if (soYDaChon > 0) daLam = true;
            if (soYdung === 1) diemCuaCauNay = 0.1; else if (soYdung === 2) diemCuaCauNay = 0.25; else if (soYdung === 3) diemCuaCauNay = 0.5; else if (soYdung === 4) { diemCuaCauNay = 1.0; isDungToanBo = true; }
            diemDS += diemCuaCauNay;
        }
        else if (loaiCau === "TLN") {
            const cacOInput = cauHoiDiv.querySelectorAll('input[type="text"]');
            let dapAnHocSinh = "";
            cacOInput.forEach(input => { dapAnHocSinh += input.value.trim(); input.disabled = true; });
            if (dapAnHocSinh !== "") daLam = true;
            luuLuaChonHS = dapAnHocSinh;

            const tlnContainer = cauHoiDiv.querySelector('.cau-tln-container');
            const chonDung = dapAnHocSinh !== "" && (dapAnHocSinh.toUpperCase() === dapAnGocRaw.toUpperCase() || dapAnHocSinh.replace(/,/g, '.') === dapAnGocRaw.replace(/,/g, '.'));

            if (!isForceLeave) {
                if (qDapAnLucNop) {
                    if (chonDung) { isDungToanBo = true; diemTLN += 0.5; diemCuaCauNay = 0.5; tlnContainer.style.background = '#d4edda'; tlnContainer.style.borderColor = '#c3e6cb'; }
                    else if (dapAnHocSinh !== "") { tlnContainer.style.background = '#f8d7da'; tlnContainer.style.borderColor = '#f5c6cb'; }
                } else {
                    if (chonDung) { isDungToanBo = true; diemTLN += 0.5; diemCuaCauNay = 0.5; }
                    if (dapAnHocSinh !== "") { tlnContainer.style.background = '#e2e8f0'; tlnContainer.style.borderColor = '#cbd5e1'; }
                }
            } else { if (chonDung) { isDungToanBo = true; diemTLN += 0.5; diemCuaCauNay = 0.5; } }
        }

        chiTietBaiLam.push({ maCau: idCau, loai: loaiCau, diem: diemCuaCauNay, ketQua: isDungToanBo ? "Đúng" : (daLam ? "Sai" : "Bỏ trống"), thuTuGoc: cauGoc.thuTuGoc, luaChonHS: luuLuaChonHS });

        if (isForceLeave) return;

        let dapAnHienThi = dapAnGocRaw;
        if (loaiCau === "DS" && dapAnGocRaw.length > 0) {
            let dapAnSach = dapAnGocRaw.replace(/[^a-zA-ZĐđ]/g, '').toUpperCase();
            dapAnHienThi = dapAnSach.split('').map(char => (char === 'T' || char === 'D' || char === 'Đ') ? 'Đ' : 'S').join('-');
        }

        let htmlLoiGiai = `<div class="phan-loi-giai" style="margin-top: 25px;">`;
        htmlLoiGiai += qDapAnLucNop ? `<details style="cursor: pointer; margin-bottom: 15px;" open><summary style="padding: 10px; background: #fff3cd; color: #856404; font-weight: bold; border-radius: 6px; border: 1px solid #ffe69c; list-style: none;">🎯 Đáp án: ${dapAnHienThi}</summary></details>` : `<div style="padding: 10px; background: #f8f9fa; color: #6c757d; font-style: italic; border-radius: 6px; margin-bottom: 15px; border: 1px dashed #ccc;">🔒 Đáp án đã bị ẩn theo thiết lập của Giáo viên.</div>`;
        htmlLoiGiai += qLoiGiaiLucNop ? `<details style="cursor: pointer;" open><summary style="padding: 10px; background: #e8f4f8; color: #0056b3; font-weight: bold; border-radius: 6px; border: 1px solid #b8daff; list-style: none;">📝 Lời giải chi tiết</summary><div style="margin-top: 10px; padding: 15px; background: #fdfdfe; border-left: 4px solid #0056b3;">${dichLaTeX(cauGoc.loiGiai || cauGoc.loigiai || "Chưa có lời giải.")}</div></details>` : `<div style="padding: 10px; background: #f8f9fa; color: #6c757d; font-style: italic; border-radius: 6px; border: 1px dashed #ccc;">🔒 Lời giải chi tiết đã bị ẩn theo thiết lập của Giáo viên.</div>`;
        htmlLoiGiai += `</div>`;
        document.getElementById(`vung-loi-giai-${idCau}`).innerHTML = htmlLoiGiai;

        const nutNav = document.getElementById(`btn-nav-${idCau}`);
        if (nutNav) {
            nutNav.style.color = 'white';
            if (qDapAnLucNop) {
                if (isDungToanBo) { nutNav.style.background = '#28a745'; nutNav.style.borderColor = '#218838'; } else if (daLam) { nutNav.style.background = '#dc3545'; nutNav.style.borderColor = '#c82333'; } else { nutNav.style.background = '#6c757d'; nutNav.style.borderColor = '#5a6268'; }
            } else {
                if (daLam) { nutNav.style.background = '#0056b3'; nutNav.style.borderColor = '#004085'; } else { nutNav.style.background = '#6c757d'; nutNav.style.borderColor = '#5a6268'; }
            }
        }
    });

    const tongDiem = diemTN + diemDS + diemTLN;
    const tongSoGiay = Math.floor((Date.now() - thoiDiemBatDauLamBai) / 1000);
    const chuoiThoiGianLam = `${Math.floor(tongSoGiay / 60)} phút ${tongSoGiay % 60} giây`;
    let luotConLaiText = "Đang tính..."; let daLamText = "1"; let colorConLai = "#0056b3";

    try {
        const user = auth.currentUser;
        if (user) {
            const duLieuKetQua = {
                tenDe: tenDeChuan, tongDiem: Number(tongDiem.toFixed(2)), thoiGianNop: new Date().toISOString(),
                thoiGianLamBai: chuoiThoiGianLam || "Không rõ", soGiayThucTe: tongSoGiay || 0,
                choXemDapAn: qDapAnLucNop, choXemLoiGiai: qLoiGiaiLucNop, chiTiet: chiTietBaiLam, trangThai: "Đã nộp"
            };

            if (window.idKetQuaDangLam) { await updateDoc(doc(db, "KetQuaThi", window.idKetQuaDangLam), duLieuKetQua); window.idKetQuaDangLam = null; }
            else { duLieuKetQua.uidHocSinh = user.uid; duLieuKetQua.maDe = maDeHienTai; await addDoc(collection(db, "KetQuaThi"), duLieuKetQua); }

            const snapKQ = await getDocs(query(collection(db, "KetQuaThi"), where("uidHocSinh", "==", user.uid), where("maDe", "==", maDeHienTai)));
            const tongSoLanDaLam = snapKQ.size;
            daLamText = soLanChoPhep === 0 ? `${tongSoLanDaLam}/∞` : `${tongSoLanDaLam}/${soLanChoPhep}`;

            if (soLanChoPhep > 0) {
                const conLai = Math.max(0, soLanChoPhep - tongSoLanDaLam);
                luotConLaiText = conLai; if (conLai === 0) colorConLai = "#dc3545";
            } else { luotConLaiText = "∞"; }
        }
    } catch (err) { }

    if (isForceLeave) return;

    if (btnNop) btnNop.style.display = 'none';
    const khungKetQua = document.getElementById('khung-ket-qua');
    khungKetQua.style.display = 'block';
    khungKetQua.innerHTML = `
        <div style="font-size:20px; font-weight: bold; margin-bottom: 10px; color: #d35400;">🏆 KẾT QUẢ BÀI THI</div>
        <div style="font-size:36px; font-weight: 900; color: #dc3545; margin-bottom: 5px;">${tongDiem.toFixed(2)} ĐIỂM</div>
        <div style="font-size: 13px; color: #6f42c1; font-weight: bold; margin-bottom: 15px; background: #f4eefe; padding: 6px 12px; border-radius: 6px; display: inline-block; border: 1px solid #d8b4fe;">
            🔄 Đã làm: <span style="color:#4338ca">${daLamText}</span> | 🎯 Còn lại: <span style="color: ${colorConLai}">${luotConLaiText} lượt</span>
        </div>
        <div style="display: flex; flex-direction: column; gap: 8px; font-size: 15px; color: #0056b3; background: #fff; padding: 15px; border-radius: 6px; text-align: left;">
            <div style="display: flex; justify-content: space-between;"><span>Phần I (TN):</span> <strong>${diemTN.toFixed(2)} đ</strong></div>
            <div style="display: flex; justify-content: space-between;"><span>Phần II (ĐS):</span> <strong>${diemDS.toFixed(2)} đ</strong></div>
            <div style="display: flex; justify-content: space-between;"><span>Phần III (TLN):</span> <strong>${diemTLN.toFixed(2)} đ</strong></div>
        </div>`;

    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.renderMathInElement) window.renderMathInElement(khungDeThi, { delimiters: [{ left: "$$", right: "$$", display: true }, { left: "$", right: "$", display: false }], throwOnError: false });
    let oldTikz2 = document.getElementById('tikz-script-reload'); if (oldTikz2) oldTikz2.remove();
    let newTikz2 = document.createElement('script'); newTikz2.id = 'tikz-script-reload'; newTikz2.src = 'https://tikzjax.com/v1/tikzjax.js'; document.body.appendChild(newTikz2);
};


// 🌟 13.8. HÀM MỚI: XEM LẠI BÀI THI (CÓ HỖ TRỢ QUYỀN ADMIN CHO GIÁO VIÊN SOI BÀI)
window.xemLaiBaiThi = async (maDe, idKetQua, laGiaoVien = false, tenHocSinh = "") => {
    maDe = maDe ? maDe.trim() : "";
    idKetQua = idKetQua ? idKetQua.trim() : "";

    if (!idKetQua || idKetQua === "undefined") {
        alert("❌ Lỗi: Bản nháp này từ quá khứ chưa lưu ID Kết quả nên không thể xem lại!");
        return;
    }

    window.chuyenManHinh('exam');
    window.taoNutQuayLai();
    khungDeThi.innerHTML = `<div style="text-align:center; padding: 50px; color: #0056b3; font-size: 18px; font-weight:bold;">Đang tái tạo lại bài làm... Vui lòng đợi!</div>`;
    const tempTrai = document.getElementById('thong-tin-nhiem-vu-trai');
    if (tempTrai) tempTrai.innerHTML = "<div style='text-align:center; color:#666; padding: 20px;'>Đang tải hồ sơ...</div>";

    try {
        const [docDeThi, docKetQua] = await Promise.all([
            getDoc(doc(db, "NhiemVu", maDe)),
            getDoc(doc(db, "KetQuaThi", idKetQua))
        ]);

        if (!docDeThi.exists() || !docKetQua.exists()) {
            khungDeThi.innerHTML = `
                <div style="background:#fff5f5; border:1px solid #dc3545; padding:30px; border-radius:10px; text-align:center; margin-top:30px;">
                    <div style="color:#dc3545; font-weight:900; font-size:20px; margin-bottom:15px;">❌ HỆ THỐNG BÁO LỖI CHẨN ĐOÁN:</div>
                    <div style="color:#333; font-size:15px; display:inline-block; text-align:left; line-height:1.8;">
                        🔹 ID Nhiệm vụ <b style="color:#0056b3">[${maDe}]</b>: ${docDeThi.exists() ? '<span style="color:#28a745;">✅ Tồn tại</span>' : '<span style="color:#dc3545;">❌ Không tìm thấy</span>'}<br>
                        🔹 ID Kết quả <b style="color:#0056b3">[${idKetQua}]</b>: ${docKetQua.exists() ? '<span style="color:#28a745;">✅ Tồn tại</span>' : '<span style="color:#dc3545;">❌ Không tìm thấy (Hồ sơ nháp)</span>'}
                    </div>
                </div>`;
            return;
        }

        thongTinDeHienTai = docDeThi.data(); thongTinDeHienTai.id = docDeThi.id;
        const ketQuaThi = docKetQua.data();

        const mangMaCau = thongTinDeHienTai.danhSachCauHoi || [];
        if (mangMaCau.length === 0) return;

        const arrPromises = mangMaCau.map(idCau => getDoc(doc(db, "CauHoi", idCau)));
        const snapCauHoi = await Promise.all(arrPromises);

        duLieuDeHienTai = [];
        snapCauHoi.forEach(snap => {
            if (snap.exists()) {
                let dataCau = snap.data(); dataCau.id = snap.id;
                dataCau.loaiCau = dataCau.kieuCau ? dataCau.kieuCau.trim().toUpperCase() : "TN";
                duLieuDeHienTai.push(dataCau);
            }
        });

        baiDaNop = true;
        window.veLaiGiaoDien();
        window.hienThiThongTinNhiemVuTrai();

        if (timerInterval) clearInterval(timerInterval);
        const khungDH = document.getElementById('khung-dong-ho');
        if (khungDH) {
            let bannerText = laGiaoVien ? `ĐANG SOI BÀI: ${tenHocSinh.toUpperCase()}` : `CHẾ ĐỘ XEM LẠI`;
            let bgColor = laGiaoVien ? '#fff3cd' : '#e2e8f0';
            let textColor = laGiaoVien ? '#856404' : '#475569';
            let borderColor = laGiaoVien ? '#ffe69c' : '#cbd5e1';

            khungDH.innerHTML = `👁️ <span style="font-size:16px;">${bannerText}</span>`;
            khungDH.style.background = bgColor; khungDH.style.borderColor = borderColor; khungDH.style.color = textColor;
        }

        const btnNop = document.getElementById('btn-nop-bai');
        if (btnNop) btnNop.style.display = 'none';

        const khungKetQua = document.getElementById('khung-ket-qua');
        if (khungKetQua) {
            khungKetQua.style.display = 'block';
            khungKetQua.innerHTML = `
                <div style="font-size:15px; font-weight: bold; margin-bottom: 5px; color: #0056b3;">ĐIỂM SỐ BÀI NỘP</div>
                <div style="font-size:36px; font-weight: 900; color: #dc3545; margin-bottom: 5px;">${(ketQuaThi.tongDiem || 0).toFixed(2)}</div>
                <div style="font-size: 11px; color: #64748b; font-weight: bold;">(Nộp lúc: ${new Date(ketQuaThi.thoiGianNop).toLocaleString('vi-VN')})</div>`;
        }

        // 🌟 MIỄN TỬ KIM BÀI: Admin luôn xem được Đáp án và Lời giải
        const qDapAn = laGiaoVien ? true : (thongTinDeHienTai.choXemDapAn !== false);
        const qLoiGiai = laGiaoVien ? true : (thongTinDeHienTai.choXemLoiGiai !== false);

        const chiTiet = ketQuaThi.chiTiet || [];
        chiTiet.forEach(cauLuu => {
            const idCau = cauLuu.maCau;
            const cauHoiDiv = document.getElementById(`cau-${idCau}`);
            if (!cauHoiDiv) return;

            const cauGoc = duLieuDeHienTai.find(c => (c.maCau || c.id) === idCau);
            if (!cauGoc) return;

            const loaiCau = cauGoc.loaiCau;
            const dapAnGocRaw = cauGoc.dapAn || "";
            const luuLuaChonHS = cauLuu.luaChonHS || "";

            let isDungToanBo = cauLuu.diem > 0;
            let daLam = luuLuaChonHS !== "" && luuLuaChonHS !== "____";

            if (loaiCau === "TN") {
                const dapAnGoc = dapAnGocRaw.trim().toUpperCase();
                cauHoiDiv.querySelectorAll('.lua-chon-tn').forEach(item => {
                    item.querySelector('input').disabled = true; item.onmouseover = null; item.onmouseout = null;
                    const val = item.getAttribute('data-chon');

                    if (val === luuLuaChonHS) item.querySelector('input').checked = true;

                    if (qDapAn) {
                        if (val === dapAnGoc) { item.style.background = '#d4edda'; item.style.borderColor = '#c3e6cb'; item.style.color = '#155724'; }
                        else if (val === luuLuaChonHS && luuLuaChonHS !== dapAnGoc) { item.style.background = '#f8d7da'; item.style.borderColor = '#f5c6cb'; item.style.color = '#721c24'; }
                        else { item.style.opacity = '0.5'; }
                    } else {
                        if (val === luuLuaChonHS) { item.style.background = '#e2e8f0'; item.style.borderColor = '#cbd5e1'; item.style.color = '#0f172a'; }
                        else { item.style.opacity = '0.5'; }
                    }
                });
            }
            else if (loaiCau === "DS") {
                const dapAnGocSach = dapAnGocRaw.replace(/[^a-zA-ZĐđ]/g, '').toUpperCase();
                const cacDong = cauHoiDiv.querySelectorAll('.dong-ds');
                cacDong.forEach((dong, index) => {
                    dong.querySelectorAll('input[type="radio"]').forEach(r => r.disabled = true);
                    const hsChonChar = luuLuaChonHS[index] || "_";
                    if (hsChonChar === 'Đ') {
                        const rd = dong.querySelector('input[value="T"]'); if (rd) rd.checked = true;
                    } else if (hsChonChar === 'S') {
                        const rd = dong.querySelector('input[value="F"]'); if (rd) rd.checked = true;
                    }

                    let dapAnY = dapAnGocSach[index] || "";
                    if (dapAnY === 'Đ' || dapAnY === 'D') dapAnY = 'T'; if (dapAnY === 'S') dapAnY = 'F';
                    const dapAnGocKieuMoi = dapAnY === 'T' ? 'Đ' : 'S';

                    if (qDapAn) {
                        if (hsChonChar !== "_" && hsChonChar === dapAnGocKieuMoi) { dong.style.background = '#d4edda'; dong.style.borderColor = '#c3e6cb'; dong.style.color = '#155724'; }
                        else if (hsChonChar !== "_") { dong.style.background = '#f8d7da'; dong.style.borderColor = '#f5c6cb'; dong.style.color = '#721c24'; }
                    } else {
                        if (hsChonChar !== "_") { dong.style.background = '#e2e8f0'; dong.style.borderColor = '#cbd5e1'; dong.style.color = '#0f172a'; }
                    }
                });
            }
            else if (loaiCau === "TLN") {
                const cacOInput = cauHoiDiv.querySelectorAll('input[type="text"]');
                let arrHS = luuLuaChonHS.split('');
                cacOInput.forEach((input, idx) => { input.value = arrHS[idx] || ""; input.disabled = true; });

                const tlnContainer = cauHoiDiv.querySelector('.cau-tln-container');
                const chonDung = luuLuaChonHS !== "" && (luuLuaChonHS.toUpperCase() === dapAnGocRaw.toUpperCase() || luuLuaChonHS.replace(/,/g, '.') === dapAnGocRaw.replace(/,/g, '.'));

                if (qDapAn) {
                    if (chonDung) { tlnContainer.style.background = '#d4edda'; tlnContainer.style.borderColor = '#c3e6cb'; }
                    else if (luuLuaChonHS !== "") { tlnContainer.style.background = '#f8d7da'; tlnContainer.style.borderColor = '#f5c6cb'; }
                } else {
                    if (luuLuaChonHS !== "") { tlnContainer.style.background = '#e2e8f0'; tlnContainer.style.borderColor = '#cbd5e1'; }
                }
            }

            const nutNav = document.getElementById(`btn-nav-${idCau}`);
            if (nutNav) {
                nutNav.style.color = 'white';
                if (qDapAn) {
                    if (isDungToanBo) { nutNav.style.background = '#28a745'; nutNav.style.borderColor = '#218838'; }
                    else if (daLam) { nutNav.style.background = '#dc3545'; nutNav.style.borderColor = '#c82333'; }
                    else { nutNav.style.background = '#6c757d'; nutNav.style.borderColor = '#5a6268'; }
                } else {
                    if (daLam) { nutNav.style.background = '#0056b3'; nutNav.style.borderColor = '#004085'; }
                    else { nutNav.style.background = '#6c757d'; nutNav.style.borderColor = '#5a6268'; }
                }
            }

            let dapAnHienThi = dapAnGocRaw;
            if (loaiCau === "DS" && dapAnGocRaw.length > 0) {
                let dapAnSach = dapAnGocRaw.replace(/[^a-zA-ZĐđ]/g, '').toUpperCase();
                dapAnHienThi = dapAnSach.split('').map(char => (char === 'T' || char === 'D' || char === 'Đ') ? 'Đ' : 'S').join('-');
            }

            let htmlLoiGiai = `<div class="phan-loi-giai" style="margin-top: 25px;">`;
            htmlLoiGiai += qDapAn ? `<details style="cursor: pointer; margin-bottom: 15px;" open><summary style="padding: 10px; background: #fff3cd; color: #856404; font-weight: bold; border-radius: 6px; border: 1px solid #ffe69c; list-style: none;">🎯 Đáp án: ${dapAnHienThi}</summary></details>` : `<div style="padding: 10px; background: #f8f9fa; color: #6c757d; font-style: italic; border-radius: 6px; margin-bottom: 15px; border: 1px dashed #ccc;">🔒 Đáp án đã bị ẩn do cài đặt của Giáo viên.</div>`;
            htmlLoiGiai += qLoiGiai ? `<details style="cursor: pointer;" open><summary style="padding: 10px; background: #e8f4f8; color: #0056b3; font-weight: bold; border-radius: 6px; border: 1px solid #b8daff; list-style: none;">📝 Lời giải chi tiết</summary><div style="margin-top: 10px; padding: 15px; background: #fdfdfe; border-left: 4px solid #0056b3;">${dichLaTeX(cauGoc.loiGiai || cauGoc.loigiai || "Chưa có lời giải.")}</div></details>` : `<div style="padding: 10px; background: #f8f9fa; color: #6c757d; font-style: italic; border-radius: 6px; border: 1px dashed #ccc;">🔒 Lời giải chi tiết đã bị ẩn.</div>`;
            htmlLoiGiai += `</div>`;
            document.getElementById(`vung-loi-giai-${idCau}`).innerHTML = htmlLoiGiai;
        });

    } catch (err) { khungDeThi.innerHTML = `<div style="color:red; text-align:center; font-weight:bold; margin-top:30px;">❌ Lỗi: ${err.message}</div>`; }
};



// 🌟 13.8. HÀM MỚI: XEM LẠI BÀI THI (CÓ HỖ TRỢ QUYỀN ADMIN CHO GIÁO VIÊN SOI BÀI)
window.xemLaiBaiThi = async (maDe, idKetQua, laGiaoVien = false, tenHocSinh = "") => {
    maDe = maDe ? maDe.trim() : "";
    idKetQua = idKetQua ? idKetQua.trim() : "";

    if (!idKetQua || idKetQua === "undefined") {
        alert("❌ Lỗi: Bản nháp này từ quá khứ chưa lưu ID Kết quả nên không thể xem lại!");
        return;
    }

    window.chuyenManHinh('exam');
    window.taoNutQuayLai();
    khungDeThi.innerHTML = `<div style="text-align:center; padding: 50px; color: #0056b3; font-size: 18px; font-weight:bold;">Đang tái tạo lại bài làm... Vui lòng đợi!</div>`;
    const tempTrai = document.getElementById('thong-tin-nhiem-vu-trai');
    if (tempTrai) tempTrai.innerHTML = "<div style='text-align:center; color:#666; padding: 20px;'>Đang tải hồ sơ...</div>";

    try {
        const [docDeThi, docKetQua] = await Promise.all([
            getDoc(doc(db, "NhiemVu", maDe)),
            getDoc(doc(db, "KetQuaThi", idKetQua))
        ]);

        if (!docDeThi.exists() || !docKetQua.exists()) {
            khungDeThi.innerHTML = `
                <div style="background:#fff5f5; border:1px solid #dc3545; padding:30px; border-radius:10px; text-align:center; margin-top:30px;">
                    <div style="color:#dc3545; font-weight:900; font-size:20px; margin-bottom:15px;">❌ HỆ THỐNG BÁO LỖI CHẨN ĐOÁN:</div>
                    <div style="color:#333; font-size:15px; display:inline-block; text-align:left; line-height:1.8;">
                        🔹 ID Nhiệm vụ <b style="color:#0056b3">[${maDe}]</b>: ${docDeThi.exists() ? '<span style="color:#28a745;">✅ Tồn tại</span>' : '<span style="color:#dc3545;">❌ Không tìm thấy</span>'}<br>
                        🔹 ID Kết quả <b style="color:#0056b3">[${idKetQua}]</b>: ${docKetQua.exists() ? '<span style="color:#28a745;">✅ Tồn tại</span>' : '<span style="color:#dc3545;">❌ Không tìm thấy (Hồ sơ nháp)</span>'}
                    </div>
                </div>`;
            return;
        }

        thongTinDeHienTai = docDeThi.data(); thongTinDeHienTai.id = docDeThi.id;
        const ketQuaThi = docKetQua.data();

        const mangMaCau = thongTinDeHienTai.danhSachCauHoi || [];
        if (mangMaCau.length === 0) return;

        const arrPromises = mangMaCau.map(idCau => getDoc(doc(db, "CauHoi", idCau)));
        const snapCauHoi = await Promise.all(arrPromises);

        duLieuDeHienTai = [];
        snapCauHoi.forEach(snap => {
            if (snap.exists()) {
                let dataCau = snap.data(); dataCau.id = snap.id;
                dataCau.loaiCau = dataCau.kieuCau ? dataCau.kieuCau.trim().toUpperCase() : "TN";
                duLieuDeHienTai.push(dataCau);
            }
        });

        baiDaNop = true;
        window.veLaiGiaoDien();
        window.hienThiThongTinNhiemVuTrai();

        if (timerInterval) clearInterval(timerInterval);
        const khungDH = document.getElementById('khung-dong-ho');
        if (khungDH) {
            let bannerText = laGiaoVien ? `ĐANG SOI BÀI: ${tenHocSinh.toUpperCase()}` : `CHẾ ĐỘ XEM LẠI`;
            let bgColor = laGiaoVien ? '#fff3cd' : '#e2e8f0';
            let textColor = laGiaoVien ? '#856404' : '#475569';
            let borderColor = laGiaoVien ? '#ffe69c' : '#cbd5e1';

            khungDH.innerHTML = `👁️ <span style="font-size:16px;">${bannerText}</span>`;
            khungDH.style.background = bgColor; khungDH.style.borderColor = borderColor; khungDH.style.color = textColor;
        }

        const btnNop = document.getElementById('btn-nop-bai');
        if (btnNop) btnNop.style.display = 'none';

        const khungKetQua = document.getElementById('khung-ket-qua');
        if (khungKetQua) {
            khungKetQua.style.display = 'block';
            khungKetQua.innerHTML = `
                <div style="font-size:15px; font-weight: bold; margin-bottom: 5px; color: #0056b3;">ĐIỂM SỐ BÀI NỘP</div>
                <div style="font-size:36px; font-weight: 900; color: #dc3545; margin-bottom: 5px;">${(ketQuaThi.tongDiem || 0).toFixed(2)}</div>
                <div style="font-size: 11px; color: #64748b; font-weight: bold;">(Nộp lúc: ${new Date(ketQuaThi.thoiGianNop).toLocaleString('vi-VN')})</div>`;
        }

        // 🌟 MIỄN TỬ KIM BÀI: Admin luôn xem được Đáp án và Lời giải
        const qDapAn = laGiaoVien ? true : (thongTinDeHienTai.choXemDapAn !== false);
        const qLoiGiai = laGiaoVien ? true : (thongTinDeHienTai.choXemLoiGiai !== false);

        const chiTiet = ketQuaThi.chiTiet || [];
        chiTiet.forEach(cauLuu => {
            const idCau = cauLuu.maCau;
            const cauHoiDiv = document.getElementById(`cau-${idCau}`);
            if (!cauHoiDiv) return;

            const cauGoc = duLieuDeHienTai.find(c => (c.maCau || c.id) === idCau);
            if (!cauGoc) return;

            const loaiCau = cauGoc.loaiCau;
            const dapAnGocRaw = cauGoc.dapAn || "";
            const luuLuaChonHS = cauLuu.luaChonHS || "";

            let isDungToanBo = cauLuu.diem > 0;
            let daLam = luuLuaChonHS !== "" && luuLuaChonHS !== "____";

            if (loaiCau === "TN") {
                const dapAnGoc = dapAnGocRaw.trim().toUpperCase();
                cauHoiDiv.querySelectorAll('.lua-chon-tn').forEach(item => {
                    item.querySelector('input').disabled = true; item.onmouseover = null; item.onmouseout = null;
                    const val = item.getAttribute('data-chon');

                    if (val === luuLuaChonHS) item.querySelector('input').checked = true;

                    if (qDapAn) {
                        if (val === dapAnGoc) { item.style.background = '#d4edda'; item.style.borderColor = '#c3e6cb'; item.style.color = '#155724'; }
                        else if (val === luuLuaChonHS && luuLuaChonHS !== dapAnGoc) { item.style.background = '#f8d7da'; item.style.borderColor = '#f5c6cb'; item.style.color = '#721c24'; }
                        else { item.style.opacity = '0.5'; }
                    } else {
                        if (val === luuLuaChonHS) { item.style.background = '#e2e8f0'; item.style.borderColor = '#cbd5e1'; item.style.color = '#0f172a'; }
                        else { item.style.opacity = '0.5'; }
                    }
                });
            }
            else if (loaiCau === "DS") {
                const dapAnGocSach = dapAnGocRaw.replace(/[^a-zA-ZĐđ]/g, '').toUpperCase();
                const cacDong = cauHoiDiv.querySelectorAll('.dong-ds');
                cacDong.forEach((dong, index) => {
                    dong.querySelectorAll('input[type="radio"]').forEach(r => r.disabled = true);
                    const hsChonChar = luuLuaChonHS[index] || "_";
                    if (hsChonChar === 'Đ') {
                        const rd = dong.querySelector('input[value="T"]'); if (rd) rd.checked = true;
                    } else if (hsChonChar === 'S') {
                        const rd = dong.querySelector('input[value="F"]'); if (rd) rd.checked = true;
                    }

                    let dapAnY = dapAnGocSach[index] || "";
                    if (dapAnY === 'Đ' || dapAnY === 'D') dapAnY = 'T'; if (dapAnY === 'S') dapAnY = 'F';
                    const dapAnGocKieuMoi = dapAnY === 'T' ? 'Đ' : 'S';

                    if (qDapAn) {
                        if (hsChonChar !== "_" && hsChonChar === dapAnGocKieuMoi) { dong.style.background = '#d4edda'; dong.style.borderColor = '#c3e6cb'; dong.style.color = '#155724'; }
                        else if (hsChonChar !== "_") { dong.style.background = '#f8d7da'; dong.style.borderColor = '#f5c6cb'; dong.style.color = '#721c24'; }
                    } else {
                        if (hsChonChar !== "_") { dong.style.background = '#e2e8f0'; dong.style.borderColor = '#cbd5e1'; dong.style.color = '#0f172a'; }
                    }
                });
            }
            else if (loaiCau === "TLN") {
                const cacOInput = cauHoiDiv.querySelectorAll('input[type="text"]');
                let arrHS = luuLuaChonHS.split('');
                cacOInput.forEach((input, idx) => { input.value = arrHS[idx] || ""; input.disabled = true; });

                const tlnContainer = cauHoiDiv.querySelector('.cau-tln-container');
                const chonDung = luuLuaChonHS !== "" && (luuLuaChonHS.toUpperCase() === dapAnGocRaw.toUpperCase() || luuLuaChonHS.replace(/,/g, '.') === dapAnGocRaw.replace(/,/g, '.'));

                if (qDapAn) {
                    if (chonDung) { tlnContainer.style.background = '#d4edda'; tlnContainer.style.borderColor = '#c3e6cb'; }
                    else if (luuLuaChonHS !== "") { tlnContainer.style.background = '#f8d7da'; tlnContainer.style.borderColor = '#f5c6cb'; }
                } else {
                    if (luuLuaChonHS !== "") { tlnContainer.style.background = '#e2e8f0'; tlnContainer.style.borderColor = '#cbd5e1'; }
                }
            }

            const nutNav = document.getElementById(`btn-nav-${idCau}`);
            if (nutNav) {
                nutNav.style.color = 'white';
                if (qDapAn) {
                    if (isDungToanBo) { nutNav.style.background = '#28a745'; nutNav.style.borderColor = '#218838'; }
                    else if (daLam) { nutNav.style.background = '#dc3545'; nutNav.style.borderColor = '#c82333'; }
                    else { nutNav.style.background = '#6c757d'; nutNav.style.borderColor = '#5a6268'; }
                } else {
                    if (daLam) { nutNav.style.background = '#0056b3'; nutNav.style.borderColor = '#004085'; }
                    else { nutNav.style.background = '#6c757d'; nutNav.style.borderColor = '#5a6268'; }
                }
            }

            let dapAnHienThi = dapAnGocRaw;
            if (loaiCau === "DS" && dapAnGocRaw.length > 0) {
                let dapAnSach = dapAnGocRaw.replace(/[^a-zA-ZĐđ]/g, '').toUpperCase();
                dapAnHienThi = dapAnSach.split('').map(char => (char === 'T' || char === 'D' || char === 'Đ') ? 'Đ' : 'S').join('-');
            }

            let htmlLoiGiai = `<div class="phan-loi-giai" style="margin-top: 25px;">`;
            htmlLoiGiai += qDapAn ? `<details style="cursor: pointer; margin-bottom: 15px;" open><summary style="padding: 10px; background: #fff3cd; color: #856404; font-weight: bold; border-radius: 6px; border: 1px solid #ffe69c; list-style: none;">🎯 Đáp án: ${dapAnHienThi}</summary></details>` : `<div style="padding: 10px; background: #f8f9fa; color: #6c757d; font-style: italic; border-radius: 6px; margin-bottom: 15px; border: 1px dashed #ccc;">🔒 Đáp án đã bị ẩn do cài đặt của Giáo viên.</div>`;
            htmlLoiGiai += qLoiGiai ? `<details style="cursor: pointer;" open><summary style="padding: 10px; background: #e8f4f8; color: #0056b3; font-weight: bold; border-radius: 6px; border: 1px solid #b8daff; list-style: none;">📝 Lời giải chi tiết</summary><div style="margin-top: 10px; padding: 15px; background: #fdfdfe; border-left: 4px solid #0056b3;">${dichLaTeX(cauGoc.loiGiai || cauGoc.loigiai || "Chưa có lời giải.")}</div></details>` : `<div style="padding: 10px; background: #f8f9fa; color: #6c757d; font-style: italic; border-radius: 6px; border: 1px dashed #ccc;">🔒 Lời giải chi tiết đã bị ẩn.</div>`;
            htmlLoiGiai += `</div>`;
            document.getElementById(`vung-loi-giai-${idCau}`).innerHTML = htmlLoiGiai;

            // 🌟 THÊM 3 DÒNG NÀY ĐỂ KÍCH HOẠT LẠI BỘ DỊCH TOÁN HỌC CHO PHẦN LỜI GIẢI
            if (window.renderMathInElement) window.renderMathInElement(khungDeThi, { delimiters: [{ left: "$$", right: "$$", display: true }, { left: "$", right: "$", display: false }], throwOnError: false, macros: { "\\heva": "\\left\\{\\begin{array}{l}#1\\end{array}\\right.", "\\hoac": "\\left[\\begin{array}{l}#1\\end{array}\\right." } });
            let oldTikz2 = document.getElementById('tikz-script-reload'); if (oldTikz2) oldTikz2.remove();
            let newTikz2 = document.createElement('script'); newTikz2.id = 'tikz-script-reload'; newTikz2.src = 'https://tikzjax.com/v1/tikzjax.js'; document.body.appendChild(newTikz2);



        });

    } catch (err) { khungDeThi.innerHTML = `<div style="color:red; text-align:center; font-weight:bold; margin-top:30px;">❌ Lỗi: ${err.message}</div>`; }
};




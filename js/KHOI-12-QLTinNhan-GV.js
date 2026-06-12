//// =====================================================================
//// MODULE 12: QUẢN LÝ TIN NHẮN TƯƠNG TÁC (TÍCH HỢP BỘ SORT CAO CẤP)
//// =====================================================================

// 🌟 KHỞI TẠO BỘ NHỚ TẠM ĐỂ QUẢN LÝ SORT & FILTER
window.BangTinNhanState = {
    cotDangSort: 'thoi_gian_cap_nhat',
    tangDan: false, // Mặc định False (Giảm dần) để tin mới nhất luôn nằm trên cùng
    duLieuGoc: []
};


//// [Nhãn thời gian: 21:05 - Ngày 12/06/2026] - Hàm 12.1: Vẽ Khung Quản lý (Trỏ sự kiện về hàm Vẽ Bảng)
window.ham_12_1_ve_quan_ly_tin_nhan = function () {
    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
    vungLamViec.innerHTML = `
        <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #f8f9fa; padding-bottom: 15px; margin-bottom: 15px;">
                <h3 style="color: #0ea5e9; margin: 0;">💬 HỘP THƯ HỖ TRỢ HỌC SINH</h3>
            </div>
            
            <div style="display: flex; gap: 20px; align-items: center; margin-bottom: 20px; flex-wrap: wrap; background: #f8f9fa; padding: 12px 15px; border-radius: 8px; border: 1px solid #e2e8f0;">
                <input type="text" id="txt-tim-kiem-tn" onkeyup="ham_12_14_ve_bang_tin_nhan()" placeholder="🔍 Tìm tên HS, Lớp, Chủ đề..." style="flex: 1; min-width: 250px; padding: 8px 12px; border-radius: 6px; border: 1px solid #ced4da; font-family: inherit;">
                
                <div style="display: flex; gap: 15px; align-items: center; flex-wrap: wrap;">
                    <span style="font-weight: bold; color: #475569; font-size: 13px;">Trạng thái hiển thị:</span>
                    <label style="cursor: pointer; display: flex; align-items: center; gap: 6px; font-size: 13px; font-weight: bold; color: #b91c1c;">
                        <input type="checkbox" id="chk-tt-cho" onchange="ham_12_14_ve_bang_tin_nhan()" checked style="width: 16px; height: 16px; cursor: pointer;"> 🔴 Chờ xử lý
                    </label>
                    <label style="cursor: pointer; display: flex; align-items: center; gap: 6px; font-size: 13px; font-weight: bold; color: #15803d;">
                        <input type="checkbox" id="chk-tt-da-tl" onchange="ham_12_14_ve_bang_tin_nhan()" style="width: 16px; height: 16px; cursor: pointer;"> 🟢 Đã trả lời
                    </label>
                    <label style="cursor: pointer; display: flex; align-items: center; gap: 6px; font-size: 13px; font-weight: bold; color: #475569;">
                        <input type="checkbox" id="chk-tt-khoa" onchange="ham_12_14_ve_bang_tin_nhan()" style="width: 16px; height: 16px; cursor: pointer;"> 🔒 Đã khóa
                    </label>
                </div>
            </div>
            
            <div id="vung-danh-sach-tn" style="overflow-x: auto;"></div>
        </div>

        <div id="modal-chat-gv" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); z-index: 10000; justify-content: center; align-items: center;">
            <div id="modal-content-gv" style="background: white; width: 90%; max-width: 700px; border-radius: 10px; display: flex; flex-direction: column; height: 90vh; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.5); transition: 0.3s all;">
                <div style="background: #0ea5e9; color: white; padding: 15px; display: flex; justify-content: space-between; align-items: center;">
                    <h3 style="margin: 0; font-size: 16px;" id="tieude-chat-gv">Cuộc trò chuyện</h3>
                    <div>
                        <button onclick="ham_12_13_toggle_maximize_gv()" style="background: none; border: none; color: white; font-size: 18px; cursor: pointer; margin-right: 15px;">🗖</button>
                        <button onclick="document.getElementById('modal-chat-gv').style.display='none'" style="background: none; border: none; color: white; font-size: 20px; cursor: pointer;">✖</button>
                    </div>
                </div>
                <div id="khung-hien-thi-chat" style="flex: 1; padding: 15px; overflow-y: auto; background: #f1f5f9; display: flex; flex-direction: column; gap: 15px;"></div>
                <div id="vung-preview-anh" style="display: none; padding: 10px; background: #e2e8f0; border-top: 1px solid #cbd5e1; position: relative;">
                    <span style="font-size: 12px; font-weight: bold; color: #475569;">Ảnh đính kèm:</span>
                    <img id="img-preview" src="" style="max-height: 80px; display: block; margin-top: 5px; border-radius: 4px; border: 1px solid #94a3b8;">
                    <button onclick="ham_12_5_xoa_anh_preview()" style="position: absolute; top: 8px; left: 100px; background: #64748b; color: white; border: none; border-radius: 4px; padding: 4px 8px; cursor: pointer; font-size: 11px; font-weight: bold;">🗑️ Hủy</button>
                </div>
                <div id="vung-nhap-lieu-gv" style="padding: 15px; background: white; border-top: 1px solid #e2e8f0; display: flex; gap: 10px; align-items: flex-end;">
                    <label style="cursor: pointer; padding: 10px; background: #f1f5f9; border-radius: 6px; border: 1px solid #cbd5e1;">
                        📷<input type="file" id="file-anh-chat" accept="image/*" style="display: none;" onchange="ham_12_6_chon_anh_tu_input(event)">
                    </label>
                    <textarea id="txt-noi-dung-chat" placeholder="Nhập câu trả lời..." style="flex: 1; resize: none; padding: 10px; border-radius: 6px; border: 1px solid #ced4da; font-family: inherit; max-height: 100px;" rows="2"></textarea>
                    <button id="btn-gui-chat" onclick="ham_12_7_gui_tin_nhan_tu_gv()" style="padding: 10px 20px; background: #0ea5e9; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; height: 100%;">GỬI 🚀</button>
                </div>
            </div>
        </div>
    `;
    ham_12_2_tai_danh_sach_tin_nhan(); // Tải Database lần đầu
    ham_12_8_khoi_tao_su_kien_anh();
}

//// [Nhãn thời gian: 21:05 - Ngày 12/06/2026] - Hàm 12.2: Lấy dữ liệu và nhét vào Bộ nhớ tạm (Không vẽ bảng)
window.ham_12_2_tai_danh_sach_tin_nhan = async function () {
    const vungDS = document.getElementById('vung-danh-sach-tn');
    if (!vungDS) return;
    vungDS.innerHTML = `<div style="text-align:center; padding: 20px; color:#0ea5e9; font-weight:bold;">⏳ Đang đồng bộ CSDL...</div>`;

    try {
        // Tải 1 lần toàn bộ tin nhắn
        const headersAPI = { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` };
        const resTN = await fetch(`${SUPABASE_URL}/rest/v1/tin_nhan?select=*,hoc_sinh!uid_hoc_sinh(ten,danh_sach_ma_lop)`, { headers: headersAPI });
        const dataTN = await resTN.json();

        if (resTN.ok) {
            BangTinNhanState.duLieuGoc = dataTN || [];
            ham_12_14_ve_bang_tin_nhan(); // Tải xong thì gọi hàm Xử lý & Vẽ Bảng
        } else {
            throw new Error("Lỗi API");
        }
    } catch (e) {
        console.error(e);
        vungDS.innerHTML = `<div style="text-align:center; padding:20px; color:red;">❌ Lỗi kết nối CSDL.</div>`;
    }
}


//// [Nhãn thời gian: 19:45 - Ngày 12/06/2026] - Hàm 12.3: Thêm Thời gian & Kiểm tra Khóa
window.ham_12_3_mo_khung_chat = async function (id_tin_nhan) {
    currentChatId = id_tin_nhan;
    ham_12_5_xoa_anh_preview();
    document.getElementById('txt-noi-dung-chat').value = '';
    document.getElementById('modal-chat-gv').style.display = 'flex';
    const khungChat = document.getElementById('khung-hien-thi-chat');
    khungChat.innerHTML = `<div style="text-align:center; color:#64748b;">⏳ Đang tải...</div>`;

    try {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/tin_nhan?id=eq.${id_tin_nhan}&select=*,hoc_sinh!uid_hoc_sinh(ten)`, { headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` } });
        const data = await res.json();
        if (!data || data.length === 0) return;
        const tn = data[0];

        let tenHS = tn.hoc_sinh ? tn.hoc_sinh.ten : "Học sinh";
        document.getElementById('tieude-chat-gv').innerText = `Trao đổi với: ${tenHS} - ${tn.chu_de}`;
        currentChatHistory = tn.lich_su_chat || [];

        // 🌟 KIỂM TRA TRẠNG THÁI KHÓA (Ẩn/Hiện khung chat)
        if (tn.trang_thai === 2) {
            document.getElementById('vung-nhap-lieu-gv').style.display = 'none';
        } else {
            document.getElementById('vung-nhap-lieu-gv').style.display = 'flex';
        }

        let htmlBongBong = "";
        currentChatHistory.forEach(msg => {
            let isGV = (msg.nguoi_gui === "GV");
            let imgTag = (msg.hinh_anh && msg.hinh_anh.length > 0) ? `<img src="${msg.hinh_anh[0]}" style="max-width: 250px; border-radius: 8px; margin-top: 8px; border: 1px solid rgba(0,0,0,0.1); display:block;">` : "";

            // 🌟 TẠO CHUỖI HIỂN THỊ THỜI GIAN NHƯ ZALO
            let tgChuoi = "";
            if (msg.time) {
                let d = new Date(msg.time);
                tgChuoi = `<div style="font-size: 10px; color: ${isGV ? '#bae6fd' : '#94a3b8'}; text-align: ${isGV ? 'right' : 'left'}; margin-top: 4px;">${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')} ${d.getDate()}/${d.getMonth() + 1}</div>`;
            }

            htmlBongBong += `
                <div style="display: flex; justify-content: ${isGV ? "flex-end" : "flex-start"}; width: 100%;">
                    <div style="max-width: 75%;">
                        <div style="font-size: 11px; color: #64748b; margin-bottom: 3px; text-align: ${isGV ? 'right' : 'left'};">${isGV ? "Thầy Chính" : tenHS}</div>
                        <div style="background: ${isGV ? "#0ea5e9" : "#e2e8f0"}; color: ${isGV ? "white" : "#1e293b"}; padding: 10px 15px; border-radius: 12px; font-size: 14px; box-shadow: 0 1px 2px rgba(0,0,0,0.1);">
                            ${msg.noidung.replace(/\n/g, '<br>')}
                            ${imgTag}
                            ${tgChuoi}
                        </div>
                    </div>
                </div>`;
        });

        if (tn.trang_thai === 2) {
            htmlBongBong += `<div style="text-align:center; color:#ef4444; font-weight:bold; font-size:13px; margin-top:10px;">🔒 Cuộc trò chuyện này đã được khóa.</div>`;
        }

        khungChat.innerHTML = htmlBongBong;
        khungChat.scrollTop = khungChat.scrollHeight;
    } catch (e) { console.error(e); }
}


//// [Nhãn thời gian: 16:45 - Ngày 12/06/2026] - Các hàm sự kiện ảnh (Preview, Xóa, Bắt Drag/Drop)
window.ham_12_5_xoa_anh_preview = function () {
    currentImageBase64 = null;
    document.getElementById('img-preview').src = "";
    document.getElementById('vung-preview-anh').style.display = 'none';
    document.getElementById('file-anh-chat').value = '';
}

window.ham_12_6_chon_anh_tu_input = function (event) {
    if (event.target.files[0]) ham_12_9_nen_va_preview_anh(event.target.files[0]);
}

window.ham_12_8_khoi_tao_su_kien_anh = function () {
    const txtArea = document.getElementById('txt-noi-dung-chat');
    txtArea.addEventListener('paste', (e) => {
        const items = (e.clipboardData || e.originalEvent.clipboardData).items;
        for (let item of items) {
            if (item.type.indexOf("image") === 0) {
                ham_12_9_nen_va_preview_anh(item.getAsFile());
                e.preventDefault();
            }
        }
    });
    txtArea.addEventListener('dragover', (e) => { e.preventDefault(); txtArea.style.background = '#e0f2fe'; });
    txtArea.addEventListener('dragleave', (e) => { e.preventDefault(); txtArea.style.background = 'white'; });
    txtArea.addEventListener('drop', (e) => {
        e.preventDefault(); txtArea.style.background = 'white';
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0 && e.dataTransfer.files[0].type.indexOf("image") === 0) {
            ham_12_9_nen_va_preview_anh(e.dataTransfer.files[0]);
        }
    });
}

//// [CẬP NHẬT] Hàm 12.9: Nén và Preview Ảnh cho Giáo Viên (Fix lỗi PNG)
window.ham_12_9_nen_va_preview_anh = function (fileBlob) {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    reader.onload = function (event) {
        const img = new Image();
        img.src = event.target.result;
        img.onload = function () {
            const MAX_WIDTH = 1200;
            let width = img.width;
            let height = img.height;

            if (width > MAX_WIDTH) {
                // 🌟 FIX LỖI 1: Ép làm tròn thành số nguyên để trình duyệt không bị lỗi
                height = Math.round((height * MAX_WIDTH) / width);
                width = MAX_WIDTH;
            }

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');

            // 🌟 FIX LỖI 2: Đổ nền trắng toàn bộ để cứu các ảnh PNG trong suốt
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(0, 0, width, height);

            // Vẽ ảnh thật lên trên nền trắng
            ctx.drawImage(img, 0, 0, width, height);

            currentImageBase64 = canvas.toDataURL('image/jpeg', 0.8);
            document.getElementById('img-preview').src = currentImageBase64;
            document.getElementById('vung-preview-anh').style.display = 'block';
        }
    }
}

//// [Nhãn thời gian: 16:45 - Ngày 12/06/2026] - Hàm 12.7: XỬ LÝ LÕI ĐẨY ẢNH LÊN STORAGE VÀ CẬP NHẬT JSONB
window.ham_12_7_gui_tin_nhan_tu_gv = async function () {
    const noiDungText = document.getElementById('txt-noi-dung-chat').value.trim();
    if (!noiDungText && !currentImageBase64) return; // Nếu trống hoàn toàn thì không gửi

    const btnGui = document.getElementById('btn-gui-chat');
    btnGui.innerText = "⏳..."; btnGui.disabled = true;

    try {
        let imageUrl = null;

        // NẾU CÓ ẢNH -> Upload lên Bucket "chat_images" trước
        if (currentImageBase64) {
            // Chuyển Base64 về Blob nhị phân chuẩn để Supabase nhận diện tốt nhất
            const byteCharacters = atob(currentImageBase64.split(',')[1]);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) byteNumbers[i] = byteCharacters.charCodeAt(i);
            const blobAnh = new Blob([new Uint8Array(byteNumbers)], { type: 'image/jpeg' });

            const tenFile = `gv_${Date.now()}_${Math.floor(Math.random() * 1000)}.jpg`;

            // Gọi API Storage của Supabase
            const resUpload = await fetch(`${SUPABASE_URL}/storage/v1/object/chat_images/${tenFile}`, {
                method: 'POST',
                headers: {
                    'apikey': SUPABASE_KEY,
                    'Authorization': `Bearer ${SUPABASE_KEY}`,
                    'Content-Type': 'image/jpeg'
                },
                body: blobAnh
            });

            if (!resUpload.ok) throw new Error("Lỗi upload ảnh");

            // Lấy link ảnh Public sau khi upload thành công
            imageUrl = `${SUPABASE_URL}/storage/v1/object/public/chat_images/${tenFile}`;
        }

        // TẠO OBJECT TIN NHẮN MỚI
        const tinNhanMoi = {
            nguoi_gui: "GV",
            noidung: noiDungText,
            hinh_anh: imageUrl ? [imageUrl] : [],
            time: new Date().toISOString()
        };

        // Đẩy vào mảng lịch sử đang mở trên RAM
        currentChatHistory.push(tinNhanMoi);

        // GỌI API CẬP NHẬT BẢNG TIN NHẮN
        const payload = {
            lich_su_chat: currentChatHistory,
            trang_thai: 1, // Chuyển thành 1 (Đã trả lời)
            thoi_gian_cap_nhat: new Date().toISOString()
        };

        const resUpdate = await fetch(`${SUPABASE_URL}/rest/v1/tin_nhan?id=eq.${currentChatId}`, {
            method: 'PATCH',
            headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!resUpdate.ok) throw new Error("Lỗi cập nhật tin nhắn");

        // GỬI XONG -> Refresh lại khung chat và dọn dẹp form
        ham_12_3_mo_khung_chat(currentChatId);
        ham_12_2_tai_danh_sach_tin_nhan(); // Cập nhật lại danh sách bên ngoài

    } catch (e) {
        console.error(e);
        alert("❌ Lỗi khi gửi tin nhắn, vui lòng thử lại!");
    } finally {
        btnGui.innerText = "GỬI 🚀"; btnGui.disabled = false;
    }
}

//// [Nhãn thời gian: 19:45 - Ngày 12/06/2026] - Hàm 12.11: Xử lý Khóa tin nhắn
window.ham_12_11_khoa_tin_nhan = async function (id) {
    if (!confirm("🔒 Thầy có chắc muốn KHÓA cuộc trò chuyện này? Học sinh sẽ không thể nhắn thêm.")) return;
    try {
        await fetch(`${SUPABASE_URL}/rest/v1/tin_nhan?id=eq.${id}`, {
            method: 'PATCH',
            headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ trang_thai: 2 })
        });
        ham_12_2_tai_danh_sach_tin_nhan();
    } catch (e) { alert("Lỗi khi khóa!"); }
}

//// [Nhãn thời gian: 19:45 - Ngày 12/06/2026] - Hàm 12.12: Xử lý Xóa tin nhắn
window.ham_12_12_xoa_tin_nhan = async function (id) {
    if (!confirm("🗑️ CẢNH BÁO: Thầy có chắc muốn XÓA VĨNH VIỄN toàn bộ tin nhắn này khỏi CSDL?")) return;
    try {
        await fetch(`${SUPABASE_URL}/rest/v1/tin_nhan?id=eq.${id}`, {
            method: 'DELETE',
            headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
        });
        ham_12_2_tai_danh_sach_tin_nhan();
    } catch (e) { alert("Lỗi khi xóa!"); }
}

//// [Nhãn thời gian: 19:45 - Ngày 12/06/2026] - Hàm 12.13: Thuật toán Phóng To / Thu Nhỏ Modal (GV)
window.ham_12_13_toggle_maximize_gv = function () {
    const modal = document.getElementById('modal-content-gv');
    if (modal.style.width === '100%') {
        // Thu nhỏ lại
        modal.style.width = '90%';
        modal.style.height = '90vh';
        modal.style.maxWidth = '700px';
        modal.style.borderRadius = '10px';
    } else {
        // Phóng to toàn màn hình
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.maxWidth = 'none';
        modal.style.borderRadius = '0';
    }
}


//// [Nhãn thời gian: 21:05 - Ngày 12/06/2026] - Hàm 12.14: Xử lý Lọc, Sắp xếp (Sort) và Dựng HTML
window.ham_12_14_ve_bang_tin_nhan = function () {
    const vungDS = document.getElementById('vung-danh-sach-tn');
    if (!vungDS) return;

    if (BangTinNhanState.duLieuGoc.length === 0) {
        vungDS.innerHTML = `<div style="text-align:center; padding:20px; color:#6c757d;">Hộp thư trống.</div>`;
        return;
    }

    // 🌟 BƯỚC 1: LẤY BỘ LỌC TỪ GIAO DIỆN
    const tuKhoa = document.getElementById('txt-tim-kiem-tn').value.toLowerCase().trim();
    const mangTrangThaiCanXem = [];
    if (document.getElementById('chk-tt-cho') && document.getElementById('chk-tt-cho').checked) mangTrangThaiCanXem.push(0);
    if (document.getElementById('chk-tt-da-tl') && document.getElementById('chk-tt-da-tl').checked) mangTrangThaiCanXem.push(1);
    if (document.getElementById('chk-tt-khoa') && document.getElementById('chk-tt-khoa').checked) mangTrangThaiCanXem.push(2);

    // 🌟 BƯỚC 2: LỌC DỮ LIỆU
    let dataLoc = BangTinNhanState.duLieuGoc.filter(tn => {
        let hopLeTrangThai = mangTrangThaiCanXem.includes(Number(tn.trang_thai));
        let tenHS = (tn.hoc_sinh && tn.hoc_sinh.ten) ? tn.hoc_sinh.ten.toLowerCase() : "";
        let dsLop = (tn.hoc_sinh && tn.hoc_sinh.danh_sach_ma_lop) ? tn.hoc_sinh.danh_sach_ma_lop.join(" ").toLowerCase() : "";
        let hopLeTuKhoa = (tuKhoa === "" || tenHS.includes(tuKhoa) || dsLop.includes(tuKhoa) || tn.chu_de.toLowerCase().includes(tuKhoa));
        return hopLeTrangThai && hopLeTuKhoa;
    });

    if (dataLoc.length === 0) {
        vungDS.innerHTML = `<div style="text-align:center; padding:20px; color:#6c757d;">🔍 Không có tin nhắn nào phù hợp với bộ lọc đang chọn.</div>`;
        return;
    }

    // 🌟 BƯỚC 3: THUẬT TOÁN SORT ĐỘNG THEO TỪNG CỘT
    const cot = BangTinNhanState.cotDangSort;
    const heSo = BangTinNhanState.tangDan ? 1 : -1;

    dataLoc.sort((a, b) => {
        let valA, valB;
        if (cot === 'hoc_sinh') {
            valA = (a.hoc_sinh && a.hoc_sinh.ten) ? a.hoc_sinh.ten.toLowerCase() : "";
            valB = (b.hoc_sinh && b.hoc_sinh.ten) ? b.hoc_sinh.ten.toLowerCase() : "";
        } else if (cot === 'chu_de') {
            valA = a.chu_de.toLowerCase();
            valB = b.chu_de.toLowerCase();
        } else if (cot === 'so_luot') {
            valA = a.lich_su_chat ? a.lich_su_chat.length : 0;
            valB = b.lich_su_chat ? b.lich_su_chat.length : 0;
        } else if (cot === 'trang_thai') {
            valA = Number(a.trang_thai);
            valB = Number(b.trang_thai);
        } else {
            // Cột thời gian
            valA = new Date(a.thoi_gian_cap_nhat).getTime();
            valB = new Date(b.thoi_gian_cap_nhat).getTime();
        }

        if (valA < valB) return -1 * heSo;
        if (valA > valB) return 1 * heSo;
        return 0;
    });

    // 🌟 BƯỚC 4: RÁP GIAO DIỆN BẢNG
    const iconSort = BangTinNhanState.tangDan ? '▲' : '▼';

    let htmlBang = `
        <table style="width: 100%; border-collapse: collapse; min-width: 900px; font-size:13px;">
            <thead>
                <tr style="background-color: #f1f5f9; color: #334155; text-align: left; user-select: none;">
                    <th style="padding: 10px; text-align: center; width: 40px; border-bottom: 2px solid #cbd5e1;">STT</th>
                    
                    <th style="padding: 10px; width: 170px; border-bottom: 2px solid #cbd5e1; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#e2e8f0'" onmouseout="this.style.background='transparent'" onclick="ham_12_15_thay_doi_sort('hoc_sinh')">
                        HỌC SINH ${cot === 'hoc_sinh' ? `<span style="color:#0ea5e9;">${iconSort}</span>` : '↕'}
                    </th>
                    
                    <th style="padding: 10px; width: 130px; border-bottom: 2px solid #cbd5e1; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#e2e8f0'" onmouseout="this.style.background='transparent'" onclick="ham_12_15_thay_doi_sort('chu_de')">
                        CHỦ ĐỀ ${cot === 'chu_de' ? `<span style="color:#0ea5e9;">${iconSort}</span>` : '↕'}
                    </th>
                    
                    <th style="padding: 10px; border-bottom: 2px solid #cbd5e1; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#e2e8f0'" onmouseout="this.style.background='transparent'" onclick="ham_12_15_thay_doi_sort('so_luot')">
                        NỘI DUNG / LƯỢT CHAT ${cot === 'so_luot' ? `<span style="color:#0ea5e9;">${iconSort}</span>` : '↕'}
                    </th>
                    
                    <th style="padding: 10px; width: 100px; border-bottom: 2px solid #cbd5e1; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#e2e8f0'" onmouseout="this.style.background='transparent'" onclick="ham_12_15_thay_doi_sort('thoi_gian_cap_nhat')">
                        CẬP NHẬT ${cot === 'thoi_gian_cap_nhat' ? `<span style="color:#0ea5e9;">${iconSort}</span>` : '↕'}
                    </th>
                    
                    <th style="padding: 10px; text-align: center; width: 110px; border-bottom: 2px solid #cbd5e1; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#e2e8f0'" onmouseout="this.style.background='transparent'" onclick="ham_12_15_thay_doi_sort('trang_thai')">
                        TRẠNG THÁI ${cot === 'trang_thai' ? `<span style="color:#0ea5e9;">${iconSort}</span>` : '↕'}
                    </th>
                    
                    <th style="padding: 10px; text-align: center; width: 130px; border-bottom: 2px solid #cbd5e1;">THAO TÁC</th>
                </tr>
            </thead><tbody>
    `;

    dataLoc.forEach((tn, i) => {
        let tenHS = (tn.hoc_sinh && tn.hoc_sinh.ten) ? tn.hoc_sinh.ten : "Ẩn danh";
        let dsLop = (tn.hoc_sinh && tn.hoc_sinh.danh_sach_ma_lop) ? tn.hoc_sinh.danh_sach_ma_lop.join(", ") : "--";
        let soLuot = tn.lich_su_chat ? tn.lich_su_chat.length : 0;

        let tinCuoi = "Chưa có nội dung";
        if (soLuot > 0) {
            let msgObj = tn.lich_su_chat[soLuot - 1];
            tinCuoi = msgObj.noidung || "[Có hình ảnh]";
            if (tinCuoi.length > 40) tinCuoi = tinCuoi.substring(0, 40) + "...";
        }

        let dCapNhat = new Date(tn.thoi_gian_cap_nhat);
        let tgCapNhat = `${dCapNhat.getHours().toString().padStart(2, '0')}:${dCapNhat.getMinutes().toString().padStart(2, '0')} <br><span style="font-size:11px; color:#6c757d;">${dCapNhat.getDate()}/${dCapNhat.getMonth() + 1}</span>`;

        let badgeTT = tn.trang_thai === 0 ? `<span style="background:#fee2e2; color:#b91c1c; padding:4px 8px; border-radius:4px; font-weight:bold;">🔴 Chờ Thầy</span>` : (tn.trang_thai === 1 ? `<span style="background:#dcfce7; color:#15803d; padding:4px 8px; border-radius:4px; font-weight:bold;">🟢 Đã trả lời</span>` : `<span style="background:#f1f5f9; color:#475569; padding:4px 8px; border-radius:4px; font-weight:bold;">🔒 Đã Khóa</span>`);
        let dongDam = tn.trang_thai === 0 ? "font-weight: bold; background: #fff8f8;" : "";
        let btnKhoa = tn.trang_thai === 2 ? "" : `<button onclick="ham_12_11_khoa_tin_nhan('${tn.id}')" style="background:#f59e0b; color:white; border:none; padding:5px 8px; border-radius:4px; cursor:pointer;" title="Khóa cuộc chat">🔒</button>`;

        htmlBang += `
            <tr style="border-bottom: 1px solid #e2e8f0; transition: 0.2s; ${dongDam}" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='transparent'">
                <td style="padding: 10px; text-align: center;">${i + 1}</td>
                <td style="padding: 10px;"><b style="color: #0ea5e9;">${tenHS}</b><br><span style="font-size:11px; color:#64748b;">Lớp: ${dsLop}</span></td>
                <td style="padding: 10px; font-weight: bold; color: #d97706;">${tn.chu_de}</td>
                <td style="padding: 10px;">
                    <span style="color:#0ea5e9; font-weight:bold; font-size:11px;">(${soLuot} lượt liên lạc)</span><br>
                    <i style="color: #334155;">"${tinCuoi}"</i>
                </td>
                <td style="padding: 10px; font-size: 12px;">${tgCapNhat}</td>
                <td style="padding: 10px; text-align: center; font-size:11px;">${badgeTT}</td>
                <td style="padding: 10px; text-align: center;">
                    <div style="display:flex; gap:5px; justify-content:center;">
                        <button onclick="ham_12_3_mo_khung_chat('${tn.id}')" style="background:#0ea5e9; color:white; border:none; padding:5px 8px; border-radius:4px; cursor:pointer;" title="Mở Khung Chat">💬</button>
                        ${btnKhoa}
                        <button onclick="ham_12_12_xoa_tin_nhan('${tn.id}')" style="background:#ef4444; color:white; border:none; padding:5px 8px; border-radius:4px; cursor:pointer;" title="Xóa vĩnh viễn">🗑️</button>
                    </div>
                </td>
            </tr>`;
    });
    vungDS.innerHTML = htmlBang + `</tbody></table>`;
}

//// [Nhãn thời gian: 21:05 - Ngày 12/06/2026] - Hàm 12.15: Cập nhật Trạng thái Sắp xếp (Sort)
window.ham_12_15_thay_doi_sort = function (cotDuocChon) {
    if (BangTinNhanState.cotDangSort === cotDuocChon) {
        // Nếu bấm lại cột đang sort -> Đảo chiều
        BangTinNhanState.tangDan = !BangTinNhanState.tangDan;
    } else {
        // Nếu bấm cột mới -> Đổi sang cột đó và mặc định sắp xếp giảm dần (hoặc tăng)
        BangTinNhanState.cotDangSort = cotDuocChon;
        BangTinNhanState.tangDan = true;
    }

    // Gọi hàm vẽ lại bảng siêu nhanh từ bộ nhớ RAM
    ham_12_14_ve_bang_tin_nhan();
}



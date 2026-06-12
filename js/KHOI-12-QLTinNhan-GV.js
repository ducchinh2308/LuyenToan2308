//// =====================================================================
//// MODULE 12: QUẢN LÝ TIN NHẮN TƯƠNG TÁC (TICKETING & CHAT)
//// =====================================================================

// Các biến toàn cục xử lý Chat
let currentChatId = null;
let currentChatHistory = [];
let currentImageBase64 = null;

//// [Nhãn thời gian: 16:45 - Ngày 12/06/2026] - Hàm 12.1: Vẽ Khung Quản lý và Bộ lọc
window.ham_12_1_ve_quan_ly_tin_nhan = function () {
    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
    vungLamViec.innerHTML = `
        <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #f8f9fa; padding-bottom: 15px; margin-bottom: 15px;">
                <h3 style="color: #0ea5e9; margin: 0;">💬 HỘP THƯ HỖ TRỢ HỌC SINH</h3>
            </div>
            
            <div style="display: flex; gap: 15px; margin-bottom: 20px; flex-wrap: wrap;">
                <input type="text" id="txt-tim-kiem-tn" onkeyup="ham_12_2_tai_danh_sach_tin_nhan()" placeholder="🔍 Tìm tên HS, Lớp, Chủ đề, Nội dung chat..." style="flex: 1; min-width: 250px; padding: 10px; border-radius: 6px; border: 1px solid #ced4da;">
                <select id="sel-loc-trang-thai-tn" onchange="ham_12_2_tai_danh_sach_tin_nhan()" style="padding: 10px; border-radius: 6px; border: 1px solid #ced4da; cursor: pointer;">
                    <option value="TAT_CA">Tất cả tin nhắn</option>
                    <option value="0" selected>🔴 Chờ Thầy xử lý (Mới)</option>
                    <option value="1">🟢 Đã trả lời (Chờ HS)</option>
                    <option value="2">⚫ Đã đóng</option>
                </select>
            </div>
            <div id="vung-danh-sach-tn" style="overflow-x: auto;"></div>
        </div>

        <div id="modal-chat-gv" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); z-index: 10000; justify-content: center; align-items: center;">
            <div style="background: white; width: 90%; max-width: 700px; border-radius: 10px; display: flex; flex-direction: column; max-height: 90vh; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
                <div style="background: #0ea5e9; color: white; padding: 15px; display: flex; justify-content: space-between; align-items: center;">
                    <h3 style="margin: 0; font-size: 16px;" id="tieude-chat-gv">Cuộc trò chuyện</h3>
                    <button onclick="document.getElementById('modal-chat-gv').style.display='none'" style="background: none; border: none; color: white; font-size: 20px; cursor: pointer;">✖</button>
                </div>
                
                <div id="khung-hien-thi-chat" style="flex: 1; padding: 15px; overflow-y: auto; background: #f1f5f9; display: flex; flex-direction: column; gap: 15px; min-height: 400px;"></div>

                <div id="vung-preview-anh" style="display: none; padding: 10px; background: #e2e8f0; border-top: 1px solid #cbd5e1; position: relative;">
                    <span style="font-size: 12px; font-weight: bold; color: #475569;">Ảnh đính kèm:</span>
                    <img id="img-preview" src="" style="max-height: 80px; max-width: 100px; display: block; margin-top: 5px; border-radius: 4px; border: 1px solid #94a3b8;">
                    <button onclick="ham_12_5_xoa_anh_preview()" style="position: absolute; top: 10px; left: 90px; background: red; color: white; border: none; border-radius: 50%; width: 20px; height: 20px; cursor: pointer; font-size: 10px;">✖</button>
                </div>

                <div style="padding: 15px; background: white; border-top: 1px solid #e2e8f0; display: flex; gap: 10px; align-items: flex-end;">
                    <label style="cursor: pointer; padding: 10px; background: #f1f5f9; border-radius: 6px; border: 1px solid #cbd5e1; transition: 0.2s;" title="Đính kèm ảnh">
                        📷<input type="file" id="file-anh-chat" accept="image/*" style="display: none;" onchange="ham_12_6_chon_anh_tu_input(event)">
                    </label>
                    <textarea id="txt-noi-dung-chat" placeholder="Nhập câu trả lời... (Hỗ trợ Ctrl+V hoặc kéo thả ảnh)" style="flex: 1; resize: none; padding: 10px; border-radius: 6px; border: 1px solid #ced4da; font-family: inherit; max-height: 100px;" rows="2"></textarea>
                    <button id="btn-gui-chat" onclick="ham_12_7_gui_tin_nhan_tu_gv()" style="padding: 10px 20px; background: #0ea5e9; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; height: 100%;">GỬI 🚀</button>
                </div>
            </div>
        </div>
    `;
    ham_12_2_tai_danh_sach_tin_nhan();
    ham_12_8_khoi_tao_su_kien_anh();
}

//// [Nhãn thời gian: 16:45 - Ngày 12/06/2026] - Hàm 12.2: Tải và Lọc danh sách tin nhắn
window.ham_12_2_tai_danh_sach_tin_nhan = async function () {
    const vungDS = document.getElementById('vung-danh-sach-tn');
    vungDS.innerHTML = `<div style="text-align:center; padding: 20px; color:#0ea5e9; font-weight:bold;">⏳ Đang đồng bộ hộp thư...</div>`;
    const tuKhoa = document.getElementById('txt-tim-kiem-tn').value.toLowerCase().trim();
    const locTrangThai = document.getElementById('sel-loc-trang-thai-tn').value;

    try {
        const headersAPI = { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` };
        const resTN = await fetch(`${SUPABASE_URL}/rest/v1/tin_nhan?select=*,hoc_sinh!uid_hoc_sinh(ten,danh_sach_ma_lop)&order=thoi_gian_cap_nhat.desc`, { headers: headersAPI });
        const dataTN = await resTN.json();

        // 🌟 THÊM RÀO CHẮN NÀY ĐỂ BẮT LỖI
        if (!resTN.ok) {
            console.error("Lỗi từ Supabase:", dataTN);
            vungDS.innerHTML = `<div style="text-align:center; padding:20px; color:red;">❌ Lỗi kết nối CSDL: ${dataTN.message || "Bad Request"}</div>`;
            return;
        }


        if (!dataTN || dataTN.length === 0) {
            vungDS.innerHTML = `<div style="text-align:center; padding:20px; color:#6c757d;">Hộp thư trống. Chưa có học sinh nào nhắn tin.</div>`; return;
        }

        const dataLoc = dataTN.filter(tn => {
            let hopLeTrangThai = (locTrangThai === "TAT_CA" || tn.trang_thai == locTrangThai);
            let tenHS = (tn.hoc_sinh && tn.hoc_sinh.ten) ? tn.hoc_sinh.ten.toLowerCase() : "";
            let dsLop = (tn.hoc_sinh && tn.hoc_sinh.danh_sach_ma_lop) ? tn.hoc_sinh.danh_sach_ma_lop.join(" ").toLowerCase() : "";
            let lichSuText = JSON.stringify(tn.lich_su_chat || []).toLowerCase();
            let hopLeTuKhoa = (tuKhoa === "" || tenHS.includes(tuKhoa) || dsLop.includes(tuKhoa) || lichSuText.includes(tuKhoa));
            return hopLeTrangThai && hopLeTuKhoa;
        });

        if (dataLoc.length === 0) {
            vungDS.innerHTML = `<div style="text-align:center; padding:20px; color:#6c757d;">🔍 Không tìm thấy tin nhắn nào khớp với bộ lọc.</div>`; return;
        }

        let htmlBang = `
            <table style="width: 100%; border-collapse: collapse; min-width: 900px;">
                <thead>
                    <tr style="background-color: #f1f5f9; color: #334155; font-size: 13px; text-align: left;">
                        <th style="padding: 12px; width: 40px; text-align: center;">STT</th>
                        <th style="padding: 12px; width: 180px;">HỌC SINH</th>
                        <th style="padding: 12px; width: 150px;">CHỦ ĐỀ</th>
                        <th style="padding: 12px;">TRÍCH LƯỢC</th>
                        <th style="padding: 12px; width: 110px;">CẬP NHẬT</th>
                        <th style="padding: 12px; width: 130px; text-align: center;">TRẠNG THÁI</th>
                        <th style="padding: 12px; width: 100px; text-align: center;">THAO TÁC</th>
                    </tr>
                </thead><tbody>
        `;

        dataLoc.forEach((tn, i) => {
            let tenHS = (tn.hoc_sinh && tn.hoc_sinh.ten) ? tn.hoc_sinh.ten : "Ẩn danh";
            let dsLop = (tn.hoc_sinh && tn.hoc_sinh.danh_sach_ma_lop) ? tn.hoc_sinh.danh_sach_ma_lop.join(", ") : "--";
            let tinCuoi = "Chưa có nội dung";
            if (Array.isArray(tn.lich_su_chat) && tn.lich_su_chat.length > 0) {
                let msgObj = tn.lich_su_chat[tn.lich_su_chat.length - 1];
                tinCuoi = msgObj.noidung || "[Có hình ảnh]";
                if (tinCuoi.length > 50) tinCuoi = tinCuoi.substring(0, 50) + "...";
            }
            let dCapNhat = new Date(tn.thoi_gian_cap_nhat);
            let tgCapNhat = `${dCapNhat.getHours().toString().padStart(2, '0')}:${dCapNhat.getMinutes().toString().padStart(2, '0')} <span style="font-size:11px; color:#6c757d;">${dCapNhat.getDate()}/${dCapNhat.getMonth() + 1}</span>`;

            let badgeTT = tn.trang_thai === 0 ? `<span style="background:#fee2e2; color:#b91c1c; padding:4px 8px; border-radius:4px; font-size:11px; font-weight:bold;">🔴 Chờ Thầy</span>` : (tn.trang_thai === 1 ? `<span style="background:#dcfce7; color:#15803d; padding:4px 8px; border-radius:4px; font-size:11px; font-weight:bold;">🟢 Chờ Trò</span>` : `<span style="background:#f1f5f9; color:#475569; padding:4px 8px; border-radius:4px; font-size:11px; font-weight:bold;">⚫ Đã Đóng</span>`);
            let dongDam = tn.trang_thai === 0 ? "font-weight: bold; background: #fff8f8;" : "";

            htmlBang += `
                <tr style="border-bottom: 1px solid #e2e8f0; ${dongDam}">
                    <td style="padding: 12px; text-align: center;">${i + 1}</td>
                    <td style="padding: 12px;"><b style="color: #0ea5e9;">${tenHS}</b><br><span style="font-size:11px; color:#64748b; background:#f1f5f9; padding:2px 4px; border-radius:3px;">Lớp: ${dsLop}</span></td>
                    <td style="padding: 12px; font-weight: bold; color: #d97706;">${tn.chu_de}</td>
                    <td style="padding: 12px; color: #334155; font-style: italic;">"${tinCuoi}"</td>
                    <td style="padding: 12px; font-size: 13px;">${tgCapNhat}</td>
                    <td style="padding: 12px; text-align: center;">${badgeTT}</td>
                    <td style="padding: 12px; text-align: center;">
                        <button onclick="ham_12_3_mo_khung_chat('${tn.id}')" style="background:#0ea5e9; color:white; border:none; padding:6px 12px; border-radius:4px; cursor:pointer; font-weight:bold; font-size:12px;">Mở Chat 💬</button>
                    </td>
                </tr>`;
        });
        vungDS.innerHTML = htmlBang + `</tbody></table>`;
    } catch (e) { console.error(e); }
}

//// [Nhãn thời gian: 16:45 - Ngày 12/06/2026] - Hàm 12.3: Mở khung Chat
window.ham_12_3_mo_khung_chat = async function (id_tin_nhan) {
    currentChatId = id_tin_nhan;
    ham_12_5_xoa_anh_preview();
    document.getElementById('txt-noi-dung-chat').value = '';
    document.getElementById('modal-chat-gv').style.display = 'flex';
    const khungChat = document.getElementById('khung-hien-thi-chat');
    khungChat.innerHTML = `<div style="text-align:center; color:#64748b;">⏳ Đang tải tin nhắn...</div>`;

    try {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/tin_nhan?id=eq.${id_tin_nhan}&select=*,hoc_sinh!uid_hoc_sinh(ten)`, {
            headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
        });
        const data = await res.json();
        if (!data || data.length === 0) return;
        const tn = data[0];

        let tenHS = tn.hoc_sinh ? tn.hoc_sinh.ten : "Học sinh";
        document.getElementById('tieude-chat-gv').innerText = `Trao đổi với: ${tenHS} - ${tn.chu_de}`;
        currentChatHistory = tn.lich_su_chat || [];

        let htmlBongBong = "";
        currentChatHistory.forEach(msg => {
            let isGV = (msg.nguoi_gui === "GV");
            let imgTag = (msg.hinh_anh && msg.hinh_anh.length > 0) ? `<img src="${msg.hinh_anh[0]}" style="max-width: 250px; border-radius: 8px; margin-top: 8px; border: 1px solid rgba(0,0,0,0.1); display:block;">` : "";
            htmlBongBong += `
                <div style="display: flex; justify-content: ${isGV ? "flex-end" : "flex-start"}; width: 100%;">
                    <div style="max-width: 75%;">
                        <div style="font-size: 11px; color: #64748b; margin-bottom: 3px; text-align: ${isGV ? 'right' : 'left'};">${isGV ? "Thầy Chính" : tenHS}</div>
                        <div style="background: ${isGV ? "#0ea5e9" : "#e2e8f0"}; color: ${isGV ? "white" : "#1e293b"}; padding: 10px 15px; border-radius: 12px; font-size: 14px; box-shadow: 0 1px 2px rgba(0,0,0,0.1);">
                            ${msg.noidung.replace(/\n/g, '<br>')}
                            ${imgTag}
                        </div>
                    </div>
                </div>`;
        });
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
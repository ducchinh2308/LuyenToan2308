//// =====================================================================
//// MODULE 13: GÓC HỌC SINH - HỘP THƯ HỖ TRỢ (TICKETING & CHAT)
//// =====================================================================

let hsCurrentChatId = null;
let hsCurrentChatHistory = [];
let hsCurrentImageBase64 = null;

//// [Nhãn thời gian: 17:15 - Ngày 12/06/2026] - Hàm 13.1: Vẽ giao diện chính Hộp thư Học sinh
window.ham_13_1_ve_hop_thu_hoc_sinh = function () {
    // Lưu ý: Đổi 'vung-lam-viec-hs' thành id vùng hiển thị thực tế trên web của thầy
    const vungLamViec = document.getElementById('vung-lam-viec-hs') || document.getElementById('vung-lam-viec-chi-tiet');

    vungLamViec.innerHTML = `
        <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); max-width: 900px; margin: 0 auto;">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #f8f9fa; padding-bottom: 15px; margin-bottom: 15px;">
                <h3 style="color: #0ea5e9; margin: 0;">💬 HỘP THƯ HỎI ĐÁP VỚI THẦY CHÍNH</h3>
                <button onclick="ham_13_4_mo_form_tao_moi()" style="padding: 10px 15px; background: #22c55e; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; box-shadow: 0 2px 5px rgba(34,197,94,0.3);">
                    ➕ GỬI CÂU HỎI MỚI
                </button>
            </div>
            
            <div id="vung-danh-sach-tn-hs" style="overflow-x: auto;"></div>
        </div>

        <div id="modal-chat-hs" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); z-index: 10000; justify-content: center; align-items: center;">
            <div style="background: white; width: 95%; max-width: 600px; border-radius: 10px; display: flex; flex-direction: column; max-height: 90vh; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
                <div style="background: #0ea5e9; color: white; padding: 15px; display: flex; justify-content: space-between; align-items: center;">
                    <h3 style="margin: 0; font-size: 16px;" id="tieude-chat-hs">Trò chuyện</h3>
                    <button onclick="document.getElementById('modal-chat-hs').style.display='none'" style="background: none; border: none; color: white; font-size: 20px; cursor: pointer;">✖</button>
                </div>
                
                <div id="khung-hien-thi-chat-hs" style="flex: 1; padding: 15px; overflow-y: auto; background: #f1f5f9; display: flex; flex-direction: column; gap: 15px; min-height: 350px;"></div>

                <div id="vung-preview-anh-hs" style="display: none; padding: 10px; background: #e2e8f0; border-top: 1px solid #cbd5e1; position: relative;">
                    <span style="font-size: 12px; font-weight: bold; color: #475569;">Ảnh đính kèm:</span>
                    <img id="img-preview-hs" src="" style="max-height: 80px; display: block; margin-top: 5px; border-radius: 4px; border: 1px solid #94a3b8;">
                    <button onclick="ham_13_5_xoa_anh_preview_hs()" style="position: absolute; top: 10px; left: 90px; background: red; color: white; border: none; border-radius: 50%; width: 20px; height: 20px; cursor: pointer; font-size: 10px;">✖</button>
                </div>

                <div style="padding: 15px; background: white; border-top: 1px solid #e2e8f0; display: flex; gap: 10px; align-items: flex-end;">
                    <label style="cursor: pointer; padding: 10px; background: #f1f5f9; border-radius: 6px; border: 1px solid #cbd5e1;" title="Đính kèm ảnh">
                        📷<input type="file" id="file-anh-chat-hs" accept="image/*" style="display: none;" onchange="ham_13_6_chon_anh_hs(event)">
                    </label>
                    <textarea id="txt-noi-dung-chat-hs" placeholder="Nhập tin nhắn... (Hỗ trợ dán ảnh)" style="flex: 1; resize: none; padding: 10px; border-radius: 6px; border: 1px solid #ced4da; font-family: inherit; max-height: 100px;" rows="2"></textarea>
                    <button id="btn-gui-chat-hs" onclick="ham_13_7_gui_tin_nhan_tu_hs()" style="padding: 10px 20px; background: #0ea5e9; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; height: 100%;">GỬI</button>
                </div>
            </div>
        </div>
    `;
    ham_13_2_tai_danh_sach_tin_nhan_hs();
    ham_13_8_khoi_tao_su_kien_anh_hs();
}

//// [Nhãn thời gian: 17:15 - Ngày 12/06/2026] - Hàm 13.2: Tải danh sách của riêng Học Sinh đó
window.ham_13_2_tai_danh_sach_tin_nhan_hs = async function () {
    const vungDS = document.getElementById('vung-danh-sach-tn-hs');
    vungDS.innerHTML = `<div style="text-align:center; padding: 20px; color:#0ea5e9; font-weight:bold;">⏳ Đang tải hộp thư...</div>`;

    // GIẢ ĐỊNH: Biến lưu trữ UID học sinh hiện tại của hệ thống thầy là AppState.user.uid
    // Nếu hệ thống dùng biến khác (như GocHocSinhState.uid), thầy sửa dòng dưới nhé!
    const uidHocSinhHienTai = AppState.user.uid;

    try {
        const headersAPI = { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` };
        const resTN = await fetch(`${SUPABASE_URL}/rest/v1/tin_nhan?uid_hoc_sinh=eq.${uidHocSinhHienTai}&order=thoi_gian_cap_nhat.desc`, { headers: headersAPI });
        const dataTN = await resTN.json();

        // 🌟 THÊM RÀO CHẮN NÀY ĐỂ BẮT LỖI
        if (!resTN.ok) {
            console.error("Lỗi từ Supabase:", dataTN);
            vungDS.innerHTML = `<div style="text-align:center; padding:20px; color:red;">❌ Lỗi kết nối CSDL: ${dataTN.message || "Bad Request"}</div>`;
            return;
        }

        if (!dataTN || dataTN.length === 0) {
            vungDS.innerHTML = `<div style="text-align:center; padding:30px; color:#6c757d; border: 1px dashed #ccc; border-radius: 8px;">Em chưa gửi câu hỏi nào cho thầy.<br>Bấm "Gửi câu hỏi mới" nếu em cần hỗ trợ nhé!</div>`; return;
        }

        let htmlBang = `
            <table style="width: 100%; border-collapse: collapse; min-width: 600px;">
                <thead>
                    <tr style="background-color: #f1f5f9; color: #334155; font-size: 13px; text-align: left;">
                        <th style="padding: 12px; width: 130px;">CHỦ ĐỀ</th>
                        <th style="padding: 12px;">TRÍCH LƯỢC</th>
                        <th style="padding: 12px; width: 110px;">CẬP NHẬT</th>
                        <th style="padding: 12px; width: 130px; text-align: center;">TRẠNG THÁI</th>
                        <th style="padding: 12px; width: 100px; text-align: center;">THAO TÁC</th>
                    </tr>
                </thead><tbody>
        `;

        dataTN.forEach(tn => {
            let tinCuoi = "Chưa có nội dung";
            if (Array.isArray(tn.lich_su_chat) && tn.lich_su_chat.length > 0) {
                let msgObj = tn.lich_su_chat[tn.lich_su_chat.length - 1];
                tinCuoi = msgObj.noidung || "[Có hình ảnh]";
                if (tinCuoi.length > 40) tinCuoi = tinCuoi.substring(0, 40) + "...";
            }

            let dCapNhat = new Date(tn.thoi_gian_cap_nhat);
            let tgCapNhat = `${dCapNhat.getHours().toString().padStart(2, '0')}:${dCapNhat.getMinutes().toString().padStart(2, '0')} <br><span style="font-size:11px; color:#6c757d;">${dCapNhat.getDate()}/${dCapNhat.getMonth() + 1}</span>`;

            // HS nhìn trạng thái sẽ khác GV một chút
            let badgeTT = tn.trang_thai === 0 ? `<span style="background:#f1f5f9; color:#475569; padding:4px 8px; border-radius:4px; font-size:11px; font-weight:bold;">Đang chờ Thầy đọc</span>`
                : (tn.trang_thai === 1 ? `<span style="background:#fee2e2; color:#b91c1c; padding:4px 8px; border-radius:4px; font-size:11px; font-weight:bold;">🔔 Thầy đã trả lời</span>`
                    : `<span style="background:#f1f5f9; color:#94a3b8; padding:4px 8px; border-radius:4px; font-size:11px; font-weight:bold;">Đã Đóng</span>`);

            let dongDam = tn.trang_thai === 1 ? "font-weight: bold; background: #fffcf0;" : "";

            htmlBang += `
                <tr style="border-bottom: 1px solid #e2e8f0; ${dongDam}">
                    <td style="padding: 12px; font-weight: bold; color: #0ea5e9;">${tn.chu_de}</td>
                    <td style="padding: 12px; color: #334155;">"${tinCuoi}"</td>
                    <td style="padding: 12px; font-size: 13px;">${tgCapNhat}</td>
                    <td style="padding: 12px; text-align: center;">${badgeTT}</td>
                    <td style="padding: 12px; text-align: center;">
                        <button onclick="ham_13_3_mo_khung_chat_hs('${tn.id}', '${tn.chu_de}')" style="background:#f59e0b; color:white; border:none; padding:6px 12px; border-radius:4px; cursor:pointer; font-weight:bold; font-size:12px;">Xem 💬</button>
                    </td>
                </tr>`;
        });
        vungDS.innerHTML = htmlBang + `</tbody></table>`;
    } catch (e) { console.error(e); }
}

//// [Nhãn thời gian: 17:15 - Ngày 12/06/2026] - Hàm 13.3: Mở khung Chat (Học sinh)
window.ham_13_3_mo_khung_chat_hs = async function (id_tin_nhan, chu_de) {
    hsCurrentChatId = id_tin_nhan;
    ham_13_5_xoa_anh_preview_hs();
    document.getElementById('txt-noi-dung-chat-hs').value = '';
    document.getElementById('modal-chat-hs').style.display = 'flex';
    document.getElementById('tieude-chat-hs').innerText = `Chủ đề: ${chu_de}`;

    const khungChat = document.getElementById('khung-hien-thi-chat-hs');
    khungChat.innerHTML = `<div style="text-align:center; color:#64748b;">⏳ Đang tải...</div>`;

    try {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/tin_nhan?id=eq.${id_tin_nhan}&select=*`, {
            headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
        });
        const data = await res.json();
        if (!data || data.length === 0) return;

        hsCurrentChatHistory = data[0].lich_su_chat || [];
        let htmlBongBong = "";

        hsCurrentChatHistory.forEach(msg => {
            let isHS = (msg.nguoi_gui === "HS");
            let imgTag = (msg.hinh_anh && msg.hinh_anh.length > 0) ? `<img src="${msg.hinh_anh[0]}" style="max-width: 100%; border-radius: 8px; margin-top: 8px; border: 1px solid rgba(0,0,0,0.1); display:block;">` : "";

            // Đảo ngược màu: HS là xanh (bên phải), Thầy là xám (bên trái)
            htmlBongBong += `
                <div style="display: flex; justify-content: ${isHS ? "flex-end" : "flex-start"}; width: 100%;">
                    <div style="max-width: 80%;">
                        <div style="font-size: 11px; color: #64748b; margin-bottom: 3px; text-align: ${isHS ? 'right' : 'left'};">${isHS ? "Em" : "Thầy Chính"}</div>
                        <div style="background: ${isHS ? "#0ea5e9" : "#e2e8f0"}; color: ${isHS ? "white" : "#1e293b"}; padding: 10px 15px; border-radius: 12px; font-size: 14px; box-shadow: 0 1px 2px rgba(0,0,0,0.1);">
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

//// [Nhãn thời gian: 17:15 - Ngày 12/06/2026] - Hàm 13.4: Tạo câu hỏi mới tinh
window.ham_13_4_mo_form_tao_moi = async function () {
    let chuDe = prompt("Em muốn hỏi về chủ đề gì? (VD: Lỗi đề, Hỏi bài, Lỗi nộp bài...)");
    if (!chuDe || chuDe.trim() === "") return;

    // Tự tạo một dòng mới trong CSDL, sau đó mở khung chat lên
    try {
        const uidHocSinhHienTai = AppState.user.uid;
        const payload = {
            uid_hoc_sinh: uidHocSinhHienTai,
            chu_de: `[${chuDe.trim()}]`,
            lich_su_chat: [],
            trang_thai: 0
        };

        const res = await fetch(`${SUPABASE_URL}/rest/v1/tin_nhan`, {
            method: 'POST',
            headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json', 'Prefer': 'return=representation' },
            body: JSON.stringify(payload)
        });

        const data = await res.json();
        if (data && data.length > 0) {
            ham_13_2_tai_danh_sach_tin_nhan_hs(); // Làm mới danh sách
            ham_13_3_mo_khung_chat_hs(data[0].id, data[0].chu_de); // Mở chat
        }
    } catch (e) {
        alert("Lỗi tạo câu hỏi mới. Em thử lại nhé!");
    }
}

//// [Nhãn thời gian: 17:15 - Ngày 12/06/2026] - Các hàm sự kiện ảnh cho Học Sinh
window.ham_13_5_xoa_anh_preview_hs = function () {
    hsCurrentImageBase64 = null;
    document.getElementById('img-preview-hs').src = "";
    document.getElementById('vung-preview-anh-hs').style.display = 'none';
    document.getElementById('file-anh-chat-hs').value = '';
}

window.ham_13_6_chon_anh_hs = function (event) {
    if (event.target.files[0]) ham_13_9_nen_anh_hs(event.target.files[0]);
}

window.ham_13_8_khoi_tao_su_kien_anh_hs = function () {
    const txtArea = document.getElementById('txt-noi-dung-chat-hs');
    txtArea.addEventListener('paste', (e) => {
        const items = (e.clipboardData || e.originalEvent.clipboardData).items;
        for (let item of items) {
            if (item.type.indexOf("image") === 0) {
                ham_13_9_nen_anh_hs(item.getAsFile());
                e.preventDefault();
            }
        }
    });
}

window.ham_13_9_nen_anh_hs = function (fileBlob) {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    reader.onload = function (event) {
        const img = new Image();
        img.src = event.target.result;
        img.onload = function () {
            const MAX_WIDTH = 1000; // Giảm một chút cho HS để tối ưu băng thông
            let width = img.width, height = img.height;
            if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; }
            const canvas = document.createElement('canvas');
            canvas.width = width; canvas.height = height;
            canvas.getContext('2d').drawImage(img, 0, 0, width, height);
            hsCurrentImageBase64 = canvas.toDataURL('image/jpeg', 0.7); // Nén mạnh hơn xíu
            document.getElementById('img-preview-hs').src = hsCurrentImageBase64;
            document.getElementById('vung-preview-anh-hs').style.display = 'block';
        }
    }
}

//// [Nhãn thời gian: 17:15 - Ngày 12/06/2026] - Hàm 13.7: ĐẨY TIN NHẮN (VÀ ẢNH) TỪ HỌC SINH
window.ham_13_7_gui_tin_nhan_tu_hs = async function () {
    const noiDungText = document.getElementById('txt-noi-dung-chat-hs').value.trim();
    if (!noiDungText && !hsCurrentImageBase64) return;

    const btnGui = document.getElementById('btn-gui-chat-hs');
    btnGui.innerText = "⏳..."; btnGui.disabled = true;

    try {
        let imageUrl = null;
        if (hsCurrentImageBase64) {
            const byteCharacters = atob(hsCurrentImageBase64.split(',')[1]);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) byteNumbers[i] = byteCharacters.charCodeAt(i);
            const blobAnh = new Blob([new Uint8Array(byteNumbers)], { type: 'image/jpeg' });

            // Đặt tên file theo uid để dễ quản lý rác sau này
            const uidHocSinhHienTai = AppState.user.uid;
            const tenFile = `hs_${uidHocSinhHienTai}_${Date.now()}.jpg`;

            const resUpload = await fetch(`${SUPABASE_URL}/storage/v1/object/chat_images/${tenFile}`, {
                method: 'POST',
                headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'image/jpeg' },
                body: blobAnh
            });
            if (!resUpload.ok) throw new Error("Lỗi upload");
            imageUrl = `${SUPABASE_URL}/storage/v1/object/public/chat_images/${tenFile}`;
        }

        const tinNhanMoi = {
            nguoi_gui: "HS",
            noidung: noiDungText,
            hinh_anh: imageUrl ? [imageUrl] : [],
            time: new Date().toISOString()
        };
        hsCurrentChatHistory.push(tinNhanMoi);

        const payload = {
            lich_su_chat: hsCurrentChatHistory,
            trang_thai: 0, // Trả về 0 để báo cho Thầy biết có tin nhắn mới
            thoi_gian_cap_nhat: new Date().toISOString()
        };

        const resUpdate = await fetch(`${SUPABASE_URL}/rest/v1/tin_nhan?id=eq.${hsCurrentChatId}`, {
            method: 'PATCH',
            headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (!resUpdate.ok) throw new Error("Lỗi cập nhật");

        ham_13_3_mo_khung_chat_hs(hsCurrentChatId, document.getElementById('tieude-chat-hs').innerText.replace('Chủ đề: ', ''));
        ham_13_2_tai_danh_sach_tin_nhan_hs();
    } catch (e) {
        console.error(e);
        alert("Lỗi khi gửi, em kiểm tra lại mạng nhé!");
    } finally {
        btnGui.innerText = "GỬI"; btnGui.disabled = false;
    }
}
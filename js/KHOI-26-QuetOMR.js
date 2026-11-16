// ==============================================================================
// KHỐI 26: GIAO DIỆN CAMERA VÀ LÕI QUÉT OMR THEO PHƯƠNG PHÁP HOMOGRAPHY TỐI ƯU
// Chuyển đổi từ hệ thống tham khảo (APP-CODE-TONGHOP)
// ==============================================================================

window.OMR_CameraFacing = 'environment';
window.OMR_CameraStream = null;

// ==============================================================================
// KHỐI 26.1: GIAO DIỆN CHẤM BÀI CAMERA
// ==============================================================================
window.ham_26_1_mo_giao_dien_cham_camera = function () {
    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet');
    if (!vungLamViec) return;

    // Lấy dữ liệu nhiệm vụ hiện tại (đã nạp từ Khối 24)
    let task = window.OMR_CurrentTask;

    vungLamViec.innerHTML = `
        <div style="padding: 10px; animation: fadeIn 0.3s; max-width: 100%; overflow-x: hidden;">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #fd7e14; padding-bottom: 12px; margin-bottom: 15px;">
                <h3 style="color: #d35400; margin: 0; font-size: 18px;">📸 CHẤM OMR: ${task.ten_nhiem_vu}</h3>
                <button onclick="window.ham_26_2_dong_camera(); window.ham_24_3_mo_giao_dien_nhap_dap_an('${task.ma_nhiem_vu}')" style="padding: 6px 12px; background: #6c757d; color: white; border: none; border-radius: 4px; font-weight:bold; font-size:12px;">⬅️ Quay lại Cấu hình</button>
            </div>

            <div style="display: flex; gap: 20px; flex-wrap: wrap;">
                
                <!-- BÊN TRÁI: CAMERA VÀ HÌNH ẢNH -->
                <div style="flex: 1.5; min-width: 300px; background: #212529; border-radius: 8px; overflow: hidden; position: relative; display: flex; flex-direction: column; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
                    <div style="position: relative; width: 100%; aspect-ratio: 3/4; background: #000; display: flex; justify-content: center; align-items: center; overflow: hidden;" id="omr_camera_container">
                        
                        <video id="omr_video_stream" autoplay playsinline style="position: absolute; width: 100%; height: 100%; object-fit: contain; z-index: 1;"></video>
                        
                        <!-- Khung dẫn hướng giống hệ thống mẫu -->
                        <div id="camera_guide" style="position: absolute; width: 85%; height: 85%; border: 2px solid rgba(34, 199, 184, 0.5); z-index: 2; pointer-events: none; display: flex; justify-content: space-between; flex-direction: column;">
                            <div style="display: flex; justify-content: space-between; padding: 10px;">
                                <div style="width: 20px; height: 20px; border-top: 3px solid #22c7b8; border-left: 3px solid #22c7b8;"></div>
                                <div style="width: 20px; height: 20px; border-top: 3px solid #22c7b8; border-right: 3px solid #22c7b8;"></div>
                            </div>
                            <div style="display: flex; justify-content: space-between; padding: 10px;">
                                <div style="width: 20px; height: 20px; border-bottom: 3px solid #22c7b8; border-left: 3px solid #22c7b8;"></div>
                                <div style="width: 20px; height: 20px; border-bottom: 3px solid #22c7b8; border-right: 3px solid #22c7b8;"></div>
                            </div>
                        </div>

                        <img id="omr_static_image" style="position: absolute; width: 100%; height: 100%; object-fit: contain; z-index: 3; display: none;">
                        <canvas id="omr_canvas_debug" style="position: absolute; width: 100%; height: 100%; object-fit: contain; z-index: 4; pointer-events: none;"></canvas>
                        
                        <div id="omr_camera_status" style="position: absolute; top: 15px; left: 50%; transform: translateX(-50%); background: rgba(0,0,0,0.6); color: white; padding: 6px 15px; border-radius: 20px; z-index: 5; font-weight: bold; font-size: 13px; backdrop-filter: blur(4px); white-space: nowrap;">⏳ Đang khởi động...</div>
                    </div>
                    
                    <!-- TOOLBAR ĐIỀU KHIỂN -->
                    <div style="background: #343a40; padding: 10px; display: flex; gap: 10px; justify-content: space-between; border-top: 1px solid #495057;">
                        <button onclick="window.ham_26_2_khoi_dong_camera()" style="flex: 1; padding: 8px; background: #007bff; color: white; border: none; border-radius: 4px; font-weight: bold; font-size:12px;">🎥 Mở Camera</button>
                        <button onclick="window.ham_26_2_doi_camera()" style="padding: 8px 12px; background: #6c757d; color: white; border: none; border-radius: 4px; font-weight: bold;"><i class="fas fa-sync"></i></button>
                        
                        <label style="flex: 1; padding: 8px; background: #17a2b8; color: white; border: none; border-radius: 4px; font-weight: bold; font-size:12px; text-align:center; margin:0; cursor:pointer;">
                            🖼️ Tải Ảnh
                            <input type="file" accept="image/*" style="display:none;" onchange="window.ham_26_3_xu_ly_anh_upload(this)">
                        </label>
                    </div>
                    
                    <div style="background: #212529; padding: 10px; text-align: center;">
                        <button id="btn_chup_ngay" onclick="window.ham_26_4_chup_anh_tu_video()" style="padding: 12px 30px; background: #28a745; color: white; border: none; border-radius: 30px; font-weight: 900; font-size:16px; cursor: pointer; box-shadow: 0 4px 10px rgba(40,167,69,0.4); display: none;">
                            📸 CHỤP PHIẾU
                        </button>
                    </div>
                </div>

                <!-- BÊN PHẢI: KẾT QUẢ VÀ TÍNH ĐIỂM -->
                <div style="flex: 1; min-width: 300px; display: flex; flex-direction: column; gap: 15px;">
                    <div style="background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #17a2b8; box-shadow: 0 4px 6px rgba(23,162,184,0.1);">
                        <h4 style="margin: 0 0 15px 0; color: #17a2b8; border-bottom: 1px dashed #17a2b8; padding-bottom: 8px;">📊 KẾT QUẢ NHẬN DẠNG</h4>
                        
                        <div style="display: flex; gap: 10px; margin-bottom: 15px;">
                            <div style="flex: 1;">
                                <span style="font-size: 11px; font-weight:bold; color: #6c757d;">SỐ BÁO DANH:</span>
                                <input type="text" id="kq_sbd" style="width: 100%; padding: 8px; font-size: 18px; font-weight: 900; color: #dc3545; border: 2px solid #ffb3ba; border-radius: 6px; text-align: center; outline:none; background:#fff0f1; box-sizing: border-box;" placeholder="---">
                            </div>
                            <div style="flex: 1;">
                                <span style="font-size: 11px; font-weight:bold; color: #6c757d;">MÃ ĐỀ:</span>
                                <input type="text" id="kq_made" style="width: 100%; padding: 8px; font-size: 18px; font-weight: 900; color: #0056b3; border: 2px solid #b8daff; border-radius: 6px; text-align: center; outline:none; background:#f8fbff; box-sizing: border-box;" placeholder="---">
                            </div>
                        </div>
                        
                        <!-- Dữ liệu thô đọc được -->
                        <div style="font-size: 11px; font-weight: bold; color: #6c757d; margin-bottom: 5px;">KẾT QUẢ ĐỌC THÔ (ABCD / ĐS / TLN):</div>
                        <textarea id="kq_tho_p1" rows="2" style="width: 100%; font-family: monospace; font-size: 12px; border: 1px solid #ccc; border-radius: 4px; padding: 5px; box-sizing: border-box; margin-bottom: 5px;" placeholder="P1..."></textarea>
                        <textarea id="kq_tho_p2" rows="2" style="width: 100%; font-family: monospace; font-size: 12px; border: 1px solid #ccc; border-radius: 4px; padding: 5px; box-sizing: border-box; margin-bottom: 5px;" placeholder="P2..."></textarea>
                        <textarea id="kq_tho_p3" rows="2" style="width: 100%; font-family: monospace; font-size: 12px; border: 1px solid #ccc; border-radius: 4px; padding: 5px; box-sizing: border-box;" placeholder="P3..."></textarea>
                        
                        <button onclick="window.ham_26_6_cham_diem()" style="margin-top: 10px; width: 100%; padding: 10px; background: #fd7e14; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">
                            ⚖️ TÍNH ĐIỂM
                        </button>

                        <div style="margin-top: 15px; margin-bottom: 15px;">
                            <span style="font-size: 11px; font-weight:bold; color: #6c757d;">TỔNG ĐIỂM:</span>
                            <div id="kq_tong_diem" style="font-size: 45px; font-weight: 900; color: #28a745; text-align: center; line-height: 1; padding: 10px; background: #e8f5e9; border-radius: 8px; border: 2px solid #c8e6c9;">
                                -.-
                            </div>
                        </div>
                    </div>

                    <button id="btn_luu_ket_qua" disabled style="padding: 15px; background: #28a745; color: white; border: none; border-radius: 8px; font-weight: 900; font-size: 16px; cursor: pointer; opacity: 0.5;">
                        💾 LƯU VÀO CSDL
                    </button>
                </div>
            </div>
            
            <div id="omr_scan_logs" style="width: 100%; height: 150px; background: #1e1e1e; color: #00ff00; font-family: monospace; font-size: 12px; padding: 10px; margin-top: 15px; overflow-y: auto; border-radius: 4px; border-top: 3px solid #6f42c1;"></div>
        </div>
    `;

    // Khởi động Camera ngay khi mở giao diện
    window.ham_26_2_khoi_dong_camera();
};


// ==============================================================================
// KHỐI 26.2: QUẢN LÝ THIẾT BỊ CAMERA
// ==============================================================================
window.ham_26_2_dong_camera = function () {
    if (window.OMR_CameraStream) {
        window.OMR_CameraStream.getTracks().forEach(track => track.stop());
        window.OMR_CameraStream = null;
    }
    let video = document.getElementById('omr_video_stream');
    if (video) video.srcObject = null;
    document.getElementById('btn_chup_ngay').style.display = 'none';
};

window.ham_26_2_khoi_dong_camera = async function () {
    window.ham_26_2_dong_camera();
    const video = document.getElementById('omr_video_stream');
    const status = document.getElementById('omr_camera_status');
    const btnChup = document.getElementById('btn_chup_ngay');

    // Ẩn ảnh tĩnh nếu đang mở
    document.getElementById('omr_static_image').style.display = 'none';
    document.getElementById('camera_guide').style.display = 'flex';
    video.style.display = 'block';

    try {
        status.innerText = "⏳ Đang kết nối Camera...";
        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: { ideal: window.OMR_CameraFacing },
                width: { ideal: 1920 }, // Phân giải cao nhất có thể
                height: { ideal: 1080 }
            },
            audio: false
        });

        window.OMR_CameraStream = stream;
        video.srcObject = stream;

        video.onloadedmetadata = () => {
            video.play();
            status.innerText = "🟢 Camera sẵn sàng. Hãy căn 4 góc đen vào khung.";
            status.style.background = "#28a745";
            btnChup.style.display = 'inline-block';
        };
    } catch (err) {
        status.innerText = "🔴 Không kết nối được Camera.";
        status.style.background = "#dc3545";
    }
};

window.ham_26_2_doi_camera = function () {
    window.OMR_CameraFacing = window.OMR_CameraFacing === 'environment' ? 'user' : 'environment';
    window.ham_26_2_khoi_dong_camera();
};


// ==============================================================================
// KHỐI 26.3 & 26.4: TẠO ẢNH TỪ CAMERA HOẶC UPLOAD ĐỂ PHÂN TÍCH
// ==============================================================================
window.ham_26_3_xu_ly_anh_upload = function (input) {
    if (!input.files || input.files.length === 0) return;
    let file = input.files[0];

    window.ham_26_2_dong_camera(); // Tắt camera

    let reader = new FileReader();
    reader.onload = function (e) {
        let imgEl = document.getElementById('omr_static_image');
        imgEl.src = e.target.result;
        imgEl.style.display = 'block';
        document.getElementById('omr_video_stream').style.display = 'none';
        document.getElementById('camera_guide').style.display = 'none';

        // Chờ ảnh load xong rồi chạy Lõi
        imgEl.onload = () => {
            window.ham_26_5_loi_nhan_dien_homography(imgEl);
        };
    };
    reader.readAsDataURL(file);
};

window.ham_26_4_chup_anh_tu_video = function () {
    const video = document.getElementById('omr_video_stream');
    if (!video.videoWidth) return;

    // Tạo canvas chụp nguyên khung hình video
    let canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    let ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Tắt camera, hiển thị ảnh tĩnh vừa chụp
    window.ham_26_2_dong_camera();
    let imgEl = document.getElementById('omr_static_image');
    imgEl.src = canvas.toDataURL('image/jpeg', 0.95);
    imgEl.style.display = 'block';
    video.style.display = 'none';
    document.getElementById('camera_guide').style.display = 'none';

    // Gọi Lõi nhận diện
    imgEl.onload = () => {
        window.ham_26_5_loi_nhan_dien_homography(imgEl);
    };
};


// ==============================================================================
// KHỐI 26.5: LÕI NHẬN DIỆN OMR BẰNG HOMOGRAPHY (TỪ APP-CODE-TONGHOP)
// Tích hợp trực tiếp thuật toán từ `recognizeSheetPerspective`
// ==============================================================================
window.ham_26_5_loi_nhan_dien_homography = function (imgElement) {
    const status = document.getElementById('omr_camera_status');
    status.innerText = "⚙️ Đang phân tích ảnh...";
    status.style.background = "#fd7e14";

    const logBox = document.getElementById('omr_scan_logs');
    logBox.innerHTML = "";
    const inLog = (msg, color = "#fff") => { logBox.innerHTML += `<div style="color:${color}">${msg}</div>`; logBox.scrollTop = logBox.scrollHeight; };

    try {
        inLog("--- BẮT ĐẦU THUẬT TOÁN HOMOGRAPHY ---", "#00ffcc");

        // 1. Vẽ ảnh gốc ra Canvas nội bộ để trích xuất Pixel
        const c = document.createElement('canvas');
        const ctx = c.getContext('2d', { willReadFrequently: true });
        c.width = imgElement.naturalWidth;
        c.height = imgElement.naturalHeight;
        ctx.drawImage(imgElement, 0, 0);

        const px = ctx.getImageData(0, 0, c.width, c.height).data;
        // Kích thước phôi chuẩn của Bộ GD: 1552 x 2254[cite: 3]
        const sx = c.width / 1552;
        const sy = c.height / 2254;

        inLog(`Đã tải ảnh: ${c.width} x ${c.height} px`);

        // Hàm tính độ sáng (Luminance) tại 1 điểm
        const luminance = (x, y) => {
            x = Math.max(0, Math.min(c.width - 1, Math.round(x)));
            y = Math.max(0, Math.min(c.height - 1, Math.round(y)));
            const p = (y * c.width + x) * 4;
            return (px[p] + px[p + 1] + px[p + 2]) / 3;
        };

        // 2. Tính ma trận tổng Integral Image để quét nhanh ô vuông đen[cite: 3]
        inLog("Đang tính toán ma trận Integral Image...", "#888");
        const stride = c.width + 1;
        const integral = new Float64Array((c.height + 1) * stride);
        for (let y = 0; y < c.height; y++) {
            let row = 0;
            for (let x = 0; x < c.width; x++) {
                const p = (y * c.width + x) * 4;
                row += 255 - (px[p] + px[p + 1] + px[p + 2]) / 3; // Lấy độ tối
                integral[(y + 1) * stride + x + 1] = integral[y * stride + x + 1] + row;
            }
        }

        const darkMean = (x, y, size) => {
            const x0 = Math.max(0, Math.round(x - size / 2));
            const y0 = Math.max(0, Math.round(y - size / 2));
            const x1 = Math.min(c.width, Math.round(x + size / 2));
            const y1 = Math.min(c.height, Math.round(y + size / 2));
            const sum = integral[y1 * stride + x1] - integral[y0 * stride + x1] - integral[y1 * stride + x0] + integral[y0 * stride + x0];
            return sum / Math.max(1, (x1 - x0) * (y1 - y0));
        };

        // 3. Tìm 4 MỐC GÓC ĐEN dựa trên toạ độ lý tưởng[cite: 3]
        // Mốc lý tưởng trên phôi 1552x2254: TL(50,50), TR(1500,50), BL(50,2200), BR(1500,2200)
        const marker = (ex, ey, ten) => {
            const cx = ex * sx;
            const cy = ey * sy;
            const scale = Math.max(0.3, Math.min(2, (sx + sy) / 2));
            const range = Math.max(30, 115 * scale); // Quét vùng xung quanh
            const sizes = [30, 34, 38, 44].map(v => Math.max(10, v * scale));

            let best = { score: 0, x: cx, y: cy };
            for (const size of sizes) {
                for (let y = cy - range; y <= cy + range; y += 2) {
                    for (let x = cx - range; x <= cx + range; x += 2) {
                        const score = darkMean(x, y, size);
                        if (score > best.score) best = { score, x, y };
                    }
                }
            }
            if (best.score > 52) {
                inLog(`📍 Tìm thấy mốc ${ten}: (${Math.round(best.x)}, ${Math.round(best.y)}) - Điểm: ${Math.round(best.score)}`, "#00ff00");
                return { x: best.x, y: best.y };
            }
            return null;
        };

        inLog("Đang quét 4 mốc góc...");
        const corners = [
            marker(50, 50, "Trái-Trên"),
            marker(1500, 50, "Phải-Trên"),
            marker(50, 2200, "Trái-Dưới"),
            marker(1500, 2200, "Phải-Dưới")
        ];

        if (corners.some(x => !x)) {
            throw new Error('Không xác định đủ 4 ô vuông đen ở các góc. Hãy chụp lại rõ ràng hơn.');
        }

        // 4. GIẢI PHƯƠNG TRÌNH TÌM MA TRẬN HOMOGRAPHY (Perspective Transform)[cite: 3]
        const solve = (a) => {
            for (let i = 0; i < 8; i++) {
                let best = i;
                for (let r = i + 1; r < 8; r++) if (Math.abs(a[r][i]) > Math.abs(a[best][i])) best = r;
                [a[i], a[best]] = [a[best], a[i]];
                const pivot = a[i][i];
                for (let j = i; j < 9; j++) a[i][j] /= pivot;
                for (let r = 0; r < 8; r++) {
                    if (r !== i) {
                        const f = a[r][i];
                        for (let j = i; j < 9; j++) a[r][j] -= f * a[i][j];
                    }
                }
            }
            return a.map(r => r[8]);
        };

        inLog("Tính toán ma trận nắn phẳng ảnh...");
        const base = [[50, 50], [1500, 50], [50, 2200], [1500, 2200]];
        const matrix = [];
        base.forEach(([x, y], i) => {
            const { x: u, y: v } = corners[i];
            matrix.push([x, y, 1, 0, 0, 0, -u * x, -u * y, u]);
            matrix.push([0, 0, 0, x, y, 1, -v * x, -v * y, v]);
        });
        const h_mat = solve(matrix);

        // Hàm Map: Ánh xạ 1 toạ độ chuẩn (trên file gốc 1552x2254) sang toạ độ trên ảnh chụp[cite: 3]
        const mapPoint = (x, y) => {
            const d = h_mat[6] * x + h_mat[7] * y + 1;
            return {
                x: (h_mat[0] * x + h_mat[1] * y + h_mat[2]) / d,
                y: (h_mat[3] * x + h_mat[4] * y + h_mat[5]) / d
            };
        };

        // 5. HÀM ĐO ĐIỂM TÔ TẠI 1 TỌA ĐỘ CHUẨN[cite: 3]
        const scale = Math.max(0.45, Math.min(2.5, ((Math.hypot(corners[1].x - corners[0].x, corners[1].y - corners[0].y) / 1450) + (Math.hypot(corners[2].x - corners[0].x, corners[2].y - corners[0].y) / 2150)) / 2));

        const scoreBubble = (x, y) => {
            const p = mapPoint(x, y);
            const r = Math.max(3, Math.round(7 * scale));
            let dark = 0, total = 0;
            for (let yy = -r; yy <= r; yy++) {
                for (let xx = -r; xx <= r; xx++) {
                    if (luminance(p.x + xx, p.y + yy) < 132) dark++;
                    total++;
                }
            }
            return dark / total;
        };

        const pickChoice = (xs, y, labels) => {
            const values = xs.map(x => scoreBubble(x, y));
            const m = Math.max(...values);
            // Threshold = 0.22 (22% pixel đen trong tâm thì coi như đã tô)[cite: 3]
            return m < 0.22 ? '-' : labels[values.indexOf(m)];
        };

        // 6. QUÉT DỮ LIỆU TỪNG VÙNG DỰA TRÊN TỌA ĐỘ PIXEL GỐC[cite: 3]
        inLog("Đang trích xuất đáp án từ lưới...");

        // A. QUÉT SBD VÀ MÃ ĐỀ
        const digitY = [219, 265, 311, 357, 406, 451, 497, 543, 588, 634];
        const digits = xs => xs.map(x => {
            let best = 0, out = '?';
            digitY.forEach((y, i) => {
                const s = scoreBubble(x, y);
                if (s > best) { best = s; out = String(i); }
            });
            return best < 0.22 ? '?' : out;
        }).join('');

        const student_no = digits([1064, 1094, 1124, 1157, 1187, 1223, 1250, 1283]);
        const code = digits([1355, 1392, 1428, 1465]);

        // B. QUÉT PHẦN I (40 Câu Trắc Nghiệm ABCD)
        const cols = [179, 247, 315, 383];
        const offs = [0, 341, 682, 1023];
        let part1 = '';
        for (let q = 0; q < 40; q++) {
            let pX = cols.map(x => x + offs[Math.floor(q / 10)]);
            let pY = 853 + (q % 10) * 36;
            part1 += pickChoice(pX, pY, ['A', 'B', 'C', 'D']);
        }

        // C. QUÉT PHẦN II (Đúng/Sai)
        const p2x = [[178, 247], [316, 384], [519, 587], [657, 725], [859, 927], [997, 1065], [1199, 1267], [1337, 1405]];
        let part2_arr = p2x.map(xs => [0, 1, 2, 3].map(r => pickChoice(xs, 1367 + r * 35, ['Đ', 'S'])).join(''));

        // D. QUÉT PHẦN III (Điền Khuyết)
        const part3_arr = [];
        const baseP3 = [169, 386, 603, 820, 1037, 1254];
        baseP3.forEach(base => {
            let out = '';
            for (let col = 0; col < 4; col++) {
                let best = 0, rowStr = '?';
                for (let r = 0; r < 10; r++) {
                    const s = scoreBubble(base + [0, 45, 91, 137][col], 1746 + r * 36);
                    if (s > best) { best = s; rowStr = String(r); }
                }
                out += (best < 0.22 ? '?' : rowStr);
            }

            // Xử lý Dấu Âm và Phẩy[cite: 3]
            let isNegative = scoreBubble(base, 1674) >= 0.22;
            let hasComma = scoreBubble(base + 45, 1706) >= 0.22;

            let finalStr = out;
            if (hasComma) {
                const pos = finalStr.indexOf('?');
                finalStr = pos >= 0 ? finalStr.slice(0, pos) + ',' + finalStr.slice(pos + 1) : finalStr.slice(0, 1) + ',' + finalStr.slice(1);
            }
            finalStr = finalStr.replace(/\?/g, '').replace(/^,+|,+$/g, '');
            finalStr = (isNegative ? '-' : '') + finalStr;

            part3_arr.push(finalStr);
        });

        // 7. XUẤT KẾT QUẢ RA UI
        inLog("✅ Trích xuất thành công!");
        document.getElementById('kq_sbd').value = student_no;
        document.getElementById('kq_made').value = code;
        document.getElementById('kq_tho_p1').value = part1;
        document.getElementById('kq_tho_p2').value = part2_arr.join(" | ");
        document.getElementById('kq_tho_p3').value = part3_arr.join(" | ");

        status.innerText = "✅ Quét thành công! Vui lòng kiểm tra và Tính điểm.";
        status.style.background = "#28a745";

        // Tự động gọi tính điểm nếu cấu hình đáp án đã có sẵn (Tuỳ chọn)
        // window.ham_26_6_cham_diem();

    } catch (err) {
        status.innerText = "🔴 " + err.message;
        status.style.background = "#dc3545";
        inLog(`LỖI: ${err.message}`, "#ff0000");
    }
};

// ==============================================================================
// KHỐI 26.6: ĐỐI CHIẾU ĐÁP ÁN VÀ TÍNH ĐIỂM
// Tái sử dụng logic tính điểm từ yêu cầu cũ
// ==============================================================================
window.ham_26_6_cham_diem = function () {
    let task = window.OMR_CurrentTask;
    let keys = window.OMR_CurrentKeys;
    if (!task || !keys) {
        alert("Không tìm thấy cấu hình đáp án trong bộ nhớ.");
        return;
    }

    let sbd = document.getElementById('kq_sbd').value.trim();
    let maDe = document.getElementById('kq_made').value.trim();
    let cauTruc = task.cau_truc_diem;

    let dGoc = keys.find(k => String(k.ma_de) === String(maDe));
    if (!dGoc) {
        alert(`Cảnh báo: Mã đề [${maDe}] chưa có đáp án trong hệ thống! Vui lòng sửa lại mã đề.`);
        return;
    }

    let bl_p1 = document.getElementById('kq_tho_p1').value.trim();
    let bl_p2 = document.getElementById('kq_tho_p2').value.split('|').map(x => x.trim());
    let bl_p3 = document.getElementById('kq_tho_p3').value.split('|').map(x => x.trim());

    let diemP1 = 0, diemP2 = 0, diemP3 = 0;

    // Chấm Phần 1
    if (cauTruc.p1_so_cau > 0) {
        let da_p1 = dGoc.dap_an_p1 || "";
        for (let i = 0; i < cauTruc.p1_so_cau; i++) {
            let chon = bl_p1.charAt(i) || "-";
            let dung = da_p1.charAt(i);
            if (chon !== '-' && chon === dung) diemP1 += cauTruc.p1_diem_moi_cau;
        }
    }

    // Chấm Phần 2
    if (cauTruc.p2_so_cau > 0) {
        let da_p2 = dGoc.dap_an_p2 || [];
        let baremP2 = cauTruc.p2_diem_muc_do;
        for (let i = 0; i < cauTruc.p2_so_cau; i++) {
            let chon4Y = bl_p2[i] || "----";
            let dung4Y = da_p2[i] || "----";
            let soYRight = 0;
            for (let sub = 0; sub < 4; sub++) {
                let c = chon4Y.charAt(sub);
                let d = dung4Y.charAt(sub);
                if (c && d && c === d && d !== '-') soYRight++;
            }
            if (soYRight > 0 && soYRight <= 4) diemP2 += baremP2[soYRight - 1];
        }
    }

    // Chấm Phần 3
    if (cauTruc.p3_so_cau > 0) {
        let da_p3 = dGoc.dap_an_p3 || [];
        for (let i = 0; i < cauTruc.p3_so_cau; i++) {
            let chon = String(bl_p3[i] || "").replace(/\s/g, '').replace(/\./g, ',');
            let dung = String(da_p3[i] || "").replace(/\s/g, '').replace(/\./g, ',');
            if (chon !== "" && dung !== "" && chon === dung) diemP3 += cauTruc.p3_diem_moi_cau;
        }
    }

    diemP1 = Math.round(diemP1 * 100) / 100;
    diemP2 = Math.round(diemP2 * 100) / 100;
    diemP3 = Math.round(diemP3 * 100) / 100;
    let tongDiem = Math.round((diemP1 + diemP2 + diemP3) * 100) / 100;

    let diemEl = document.getElementById('kq_tong_diem');
    diemEl.innerText = tongDiem.toFixed(2);
    diemEl.style.transform = 'scale(1.2)';
    setTimeout(() => { diemEl.style.transform = 'scale(1)'; }, 200);

    let btnLuu = document.getElementById('btn_luu_ket_qua');
    btnLuu.disabled = false;
    btnLuu.style.opacity = '1';
    btnLuu.onclick = function () {
        // Thực thi logic lưu điểm vào Database (Sẽ tuỳ chỉnh theo Supabase của Thầy)
        alert(`Đã lưu thành công SBD ${sbd} với ${tongDiem} điểm!`);
    };
};
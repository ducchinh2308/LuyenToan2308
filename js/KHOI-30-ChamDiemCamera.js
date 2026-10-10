// =====================================================================
// KHỐI 30: MODULE CHẤM THI TRẮC NGHIỆM BẰNG CAMERA (OPENCV.JS)
// Tích hợp cho hệ thống của thầy Chính
// =====================================================================

window.CameraOMR = {
    video: null,
    canvasOut: null,
    ctxOut: null,
    stream: null,
    isScanning: false,
    scanInterval: null
};

// =====================================================================
// HÀM 30.1: MỞ GIAO DIỆN QUÉT CAMERA (Dùng cho cả HS tự nộp hoặc GV chấm)
// =====================================================================
window.ham_30_1_mo_giao_dien_camera = function () {
    const vungLamViec = document.getElementById('vung-lam-viec-chi-tiet') || document.getElementById('vung-lam-viec-hoc-sinh');
    if (!vungLamViec) return;

    // Load OpenCV.js nếu chưa có
    if (typeof cv === 'undefined') {
        Swal.fire({ title: 'Đang tải lõi xử lý ảnh OpenCV...', didOpen: () => Swal.showLoading() });
        let script = document.createElement('script');
        script.src = 'https://docs.opencv.org/4.8.0/opencv.js';
        script.onload = () => { Swal.close(); ham_30_1_mo_giao_dien_camera(); };
        document.head.appendChild(script);
        return;
    }

    vungLamViec.innerHTML = `
        <div style="max-width: 600px; margin: 20px auto; background: #fff; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); overflow: hidden;">
            <div style="background: #2c3e50; padding: 15px; text-align: center; color: white;">
                <h3 style="margin: 0;">📸 MÁY CHẤM TRẮC NGHIỆM</h3>
                <div style="font-size: 12px; color: #bdc3c7; margin-top: 5px;">Đưa phiếu trả lời vào ô vuông để hệ thống tự động nhận diện</div>
            </div>
            
            <div style="position: relative; width: 100%; aspect-ratio: 3/4; background: #000; overflow: hidden;">
                <!-- Video ẩn để lấy luồng Camera -->
                <video id="omr-video" autoplay playsinline style="display: none;"></video>
                <!-- Canvas hiển thị luồng Camera + Khung ngắm -->
                <canvas id="omr-canvas-out" style="width: 100%; height: 100%; object-fit: cover;"></canvas>
                
                <!-- Overlay Khung ngắm ảo -->
                <div style="position: absolute; top: 10%; left: 10%; width: 80%; height: 80%; border: 2px dashed #27ae60; border-radius: 8px; box-sizing: border-box; pointer-events: none;">
                    <div style="position: absolute; top: -10px; left: 50%; transform: translateX(-50%); background: #27ae60; color: #fff; padding: 2px 10px; border-radius: 10px; font-size: 11px; font-weight: bold;">Căn lề giấy vào đây</div>
                </div>
            </div>

            <div style="padding: 20px; display: flex; justify-content: space-between; gap: 15px;">
                <button onclick="window.ham_30_2_khoi_dong_camera()" style="flex: 1; padding: 12px; background: #2980b9; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">MỞ CAMERA</button>
                <button onclick="window.ham_30_dung_camera()" style="flex: 1; padding: 12px; background: #e74c3c; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">TẮT CAMERA</button>
            </div>

            <!-- Vùng hiển thị kết quả sau khi cắt phẳng giấy -->
            <div id="vung-ket-qua-omr" style="padding: 20px; background: #f8f9fa; border-top: 1px solid #eee; text-align: center; display: none;">
                <h4 style="color: #27ae60; margin-top: 0;">✅ Đã nhận diện được phiếu!</h4>
                <canvas id="omr-canvas-ketqua" style="max-width: 100%; border: 1px solid #ccc; border-radius: 6px;"></canvas>
                <button onclick="window.ham_30_6_bat_dau_doc_dap_an()" style="margin-top: 15px; width: 100%; padding: 12px; background: #f39c12; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">TÁCH ĐÁP ÁN & CHẤM ĐIỂM</button>
            </div>
        </div>
    `;
};

// =====================================================================
// HÀM 30.2: KHỞI ĐỘNG CAMERA VÀ BẮT ĐẦU VÒNG LẶP QUÉT
// =====================================================================
window.ham_30_2_khoi_dong_camera = async function () {
    window.CameraOMR.video = document.getElementById('omr-video');
    window.CameraOMR.canvasOut = document.getElementById('omr-canvas-out');
    window.CameraOMR.ctxOut = window.CameraOMR.canvasOut.getContext('2d', { willReadFrequently: true });

    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } },
            audio: false
        });
        window.CameraOMR.stream = stream;
        window.CameraOMR.video.srcObject = stream;
        window.CameraOMR.video.play();

        window.CameraOMR.video.onloadedmetadata = () => {
            window.CameraOMR.canvasOut.width = window.CameraOMR.video.videoWidth;
            window.CameraOMR.canvasOut.height = window.CameraOMR.video.videoHeight;
            window.CameraOMR.isScanning = true;
            requestAnimationFrame(window.ham_30_3_vong_lap_xu_ly);
        };
    } catch (err) {
        Swal.fire('Lỗi Camera', 'Không thể truy cập Camera. Vui lòng cấp quyền!', 'error');
    }
};

window.ham_30_dung_camera = function () {
    window.CameraOMR.isScanning = false;
    if (window.CameraOMR.stream) {
        window.CameraOMR.stream.getTracks().forEach(track => track.stop());
    }
};

// =====================================================================
// HÀM 30.3: VÒNG LẶP XỬ LÝ ẢNH REAL-TIME (TÌM TỜ GIẤY)
// =====================================================================
window.ham_30_3_vong_lap_xu_ly = function () {
    if (!window.CameraOMR.isScanning) return;

    let video = window.CameraOMR.video;
    let canvas = window.CameraOMR.canvasOut;
    let ctx = window.CameraOMR.ctxOut;

    // Vẽ frame video lên canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Chuyển ảnh từ Canvas vào định dạng Mat của OpenCV
    let matGoc = cv.imread(canvas);
    let matXam = new cv.Mat();
    let matMờ = new cv.Mat();
    let matCạnh = new cv.Mat();

    // Tiền xử lý: Ảnh xám -> Làm mờ (khử nhiễu) -> Tìm cạnh (Canny)
    cv.cvtColor(matGoc, matXam, cv.COLOR_RGBA2GRAY, 0);
    cv.GaussianBlur(matXam, matMờ, new cv.Size(5, 5), 0, 0, cv.BORDER_DEFAULT);
    cv.Canny(matMờ, matCạnh, 75, 200);

    // Tìm Contours (Đường viền)
    let contours = new cv.MatVector();
    let hierarchy = new cv.Mat();
    cv.findContours(matCạnh, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

    // Thuật toán tìm tờ giấy (Khối đa giác lớn nhất có 4 góc)
    let docContour = null;
    let maxArea = 0;

    for (let i = 0; i < contours.size(); ++i) {
        let cnt = contours.get(i);
        let area = cv.contourArea(cnt);

        if (area > 50000) { // Lọc các vật thể quá nhỏ
            let perimeter = cv.arcLength(cnt, true);
            let approx = new cv.Mat();
            cv.approxPolyDP(cnt, approx, 0.02 * perimeter, true);

            if (approx.rows === 4 && area > maxArea) {
                docContour = approx;
                maxArea = area;
            } else {
                approx.delete();
            }
        }
    }

    // Nếu tìm thấy tờ giấy, vẽ viền đỏ bao quanh để báo hiệu cho người dùng
    if (docContour) {
        let pts = [];
        for (let i = 0; i < 4; i++) {
            pts.push({ x: docContour.data32S[i * 2], y: docContour.data32S[i * 2 + 1] });
        }

        ctx.strokeStyle = "#e74c3c";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        ctx.lineTo(pts[1].x, pts[1].y);
        ctx.lineTo(pts[2].x, pts[2].y);
        ctx.lineTo(pts[3].x, pts[3].y);
        ctx.closePath();
        ctx.stroke();

        // Tự động chớp lấy tờ giấy (Auto-capture) nếu diện tích đủ lớn
        if (maxArea > (canvas.width * canvas.height * 0.4)) {
            window.CameraOMR.isScanning = false; // Dừng quét
            window.ham_30_4_nan_phang_giay(matGoc, pts);
        }
        // Lưu ý: Không delete docContour ở đây vì nó chỉ tham chiếu đến 'approx' đã xử lý
    }

    // Giải phóng bộ nhớ OpenCV (Rất quan trọng để không sập trình duyệt)
    matGoc.delete(); matXam.delete(); matMờ.delete(); matCạnh.delete();
    contours.delete(); hierarchy.delete();

    if (window.CameraOMR.isScanning) {
        requestAnimationFrame(window.ham_30_3_vong_lap_xu_ly);
    }
};

// =====================================================================
// HÀM 30.4: PERSPECTIVE TRANSFORM (NẮN PHẲNG TỜ GIẤY)
// =====================================================================
window.ham_30_4_nan_phang_giay = function (matGoc, pts) {
    // 1. Sắp xếp 4 điểm theo đúng trật tự: Top-Left, Top-Right, Bottom-Right, Bottom-Left
    pts.sort((a, b) => a.y - b.y);
    let top = pts.slice(0, 2).sort((a, b) => a.x - b.x);
    let bottom = pts.slice(2, 4).sort((a, b) => a.x - b.x);
    let orderedPts = [top[0], top[1], bottom[1], bottom[0]];

    // 2. Tính toán kích thước tờ giấy mới (Chuẩn A4 dọc)
    let width = 800;
    let height = 1131; // Tỷ lệ A4 (800 x 1131)

    let srcCoords = cv.matFromArray(4, 1, cv.CV_32FC2, [
        orderedPts[0].x, orderedPts[0].y,
        orderedPts[1].x, orderedPts[1].y,
        orderedPts[2].x, orderedPts[2].y,
        orderedPts[3].x, orderedPts[3].y
    ]);

    let dstCoords = cv.matFromArray(4, 1, cv.CV_32FC2, [
        0, 0,
        width, 0,
        width, height,
        0, height
    ]);

    // 3. Thực hiện ma trận biến đổi (Warp)
    let dsize = new cv.Size(width, height);
    let matPhang = new cv.Mat();
    let M = cv.getPerspectiveTransform(srcCoords, dstCoords);
    cv.warpPerspective(matGoc, matPhang, M, dsize, cv.INTER_LINEAR, cv.BORDER_CONSTANT, new cv.Scalar());

    // 4. Xuất ảnh đã nắn phẳng ra Canvas Kết quả
    let canvasKetQua = document.getElementById('omr-canvas-ketqua');
    cv.imshow(canvasKetQua, matPhang);

    // Hiển thị giao diện kết quả và tắt luồng Video
    document.getElementById('vung-ket-qua-omr').style.display = 'block';
    window.ham_30_dung_camera();

    // Lưu ảnh vào biến toàn cục chuẩn bị cho Hàm 30.6 chấm điểm
    window.CameraOMR.matGiayDaPhang = matPhang.clone();

    // Dọn dẹp
    srcCoords.delete(); dstCoords.delete(); M.delete(); matPhang.delete();
};
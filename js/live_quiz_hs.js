// =====================================================================
// KHU VỰC ĐẤU TRƯỜNG LIVE QUIZ (NỘP TỪNG CÂU, PHỤC HỒI STATE)
// =====================================================================
window.ThongTinLiveHocSinh = { maPhong: '', maNhiemVu: '', thoiGianDong: null };
window.DangKhoiTaoLiveQuiz = false;






// 1. Hàm vẽ giao diện nhập mã PIN
window.ham_8_6_tab_live_quiz = function () {
    const vungLamViec = document.getElementById('vung-lam-viec-hoc-sinh');
    if (!vungLamViec) return console.error("Lỗi: Không tìm thấy vùng render!");

    if (window.HocSinhLiveChannel) { _supabase.removeChannel(window.HocSinhLiveChannel); window.HocSinhLiveChannel = null; }

    vungLamViec.innerHTML = `
        <div style="max-width: 450px; margin: 40px auto; background: white; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); overflow: hidden;">
            <div style="background: #1e1e2f; padding: 40px 20px; text-align: center; color: white;">
                <div style="font-size: 50px; margin-bottom: 10px;">🎮</div>
                <h2 style="margin: 0; font-size: 24px; font-weight: 900;">ĐẤU TRƯỜNG TRỰC TIẾP</h2>
            </div>
            <div style="padding: 30px;">
                <input type="text" id="txtPinLive" placeholder="MÃ PIN (6 SỐ)" style="width: 100%; padding: 18px; text-align: center; font-size: 24px; font-weight: 900; border: 2px solid #ddd; border-radius: 12px; margin-bottom: 20px;" maxlength="6" oninput="this.value = this.value.replace(/[^0-9]/g, '')">
                <button onclick="ham_8_6_1_vao_phong()" style="width: 100%; padding: 16px; background: #e74c3c; color: white; border: none; border-radius: 12px; font-weight: 900; font-size: 18px; cursor: pointer;">🚀 VÀO PHÒNG</button>
            </div>
        </div>
    `;
};

// =====================================================================
// KHU VỰC ĐẤU TRƯỜNG LIVE QUIZ (NỘP TỪNG CÂU, PHỤC HỒI STATE)
// =====================================================================
window.ThongTinLiveHocSinh = { maPhong: '', maNhiemVu: '', thoiGianDong: null };
window.DangKhoiTaoLiveQuiz = false;

// 1. Vào phòng (Đồng bộ Master Time của GV)
window.ham_8_6_1_vao_phong = async function () {
    const maPin = document.getElementById('txtPinLive').value.trim();
    if (!maPin) return Swal.fire('Nhắc', 'Nhập mã PIN!', 'warning');
    Swal.fire({ title: 'Đang kết nối...', didOpen: () => Swal.showLoading() });

    try {
        const { data: phong } = await _supabase.from('phong_live_quiz').select('*').eq('ma_phong', maPin).maybeSingle();
        if (!phong) throw new Error("Mã PIN không đúng!");
        if (phong.trang_thai === 2) throw new Error("Đấu trường đã đóng!");

        // Tính thời điểm đóng phòng thực tế dựa vào lúc GV bấm Bắt đầu (nếu đã bắt đầu)
        let thoiGianDong = null;
        if (phong.thoi_gian_bat_dau && phong.thoi_gian_lam_bai) {
            const tStart = new Date(phong.thoi_gian_bat_dau);
            thoiGianDong = new Date(tStart.getTime() + phong.thoi_gian_lam_bai * 60000);
        }

        window.ThongTinLiveHocSinh = { maPhong: maPin, maNhiemVu: phong.ma_nhiem_vu, thoiGianDong: thoiGianDong };

        await _supabase.from('tien_do_live_quiz').upsert({ ma_phong: maPin, uid_hoc_sinh: GocHocSinhState.uid, ten_hoc_sinh: GocHocSinhState.ten }, { onConflict: 'ma_phong,uid_hoc_sinh' });

        Swal.close();
        if (phong.trang_thai === 0) ham_8_6_2_phong_cho_live();
        else if (phong.trang_thai === 1) ham_8_6_3_bat_dau_lam_bai_live();

    } catch (e) { Swal.fire('Lỗi', e.message, 'error'); }
};

// =====================================================================
// HÀM 8.6.2: GIAO DIỆN PHÒNG CHỜ (ĐÃ FIX LỖI ĐỨNG GIAO DIỆN)
// =====================================================================
window.ham_8_6_2_phong_cho_live = function () {
    const vungLamViec = document.getElementById('vung-lam-viec-hoc-sinh');
    const maPin = window.ThongTinLiveHocSinh.maPhong;

    vungLamViec.innerHTML = `
        <div style="max-width: 500px; margin: 40px auto; background: white; border-radius: 20px; box-shadow: 0 10px 40px rgba(0,0,0,0.1); padding: 40px; text-align: center;">
            <div style="font-size: 60px; margin-bottom: 20px;">⏳</div>
            <h2 style="color: #2c3e50; margin-bottom: 10px;">ĐANG ĐỢI CHỦ PHÒNG...</h2>
            <p style="color: #7f8c8d; margin-bottom: 30px;">Mã phòng: <b style="color: #e74c3c;">${maPin}</b></p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 12px; border: 2px dashed #ddd;">
                <p style="margin: 0; font-weight: bold; color: #555;">Thầy đang chuẩn bị trận đấu. Em hãy giữ nguyên màn hình này, hệ thống sẽ tự động bắt đầu ngay khi Thầy nhấn nút!</p>
            </div>

            <div style="margin-top: 30px;">
                <div style="width: 50px; height: 5px; background: #e74c3c; margin: 0 auto; border-radius: 5px; animation: pulse 1.5s infinite;"></div>
            </div>
        </div>
        <style>
            @keyframes pulse { 0% { opacity: 0.3; } 50% { opacity: 1; } 100% { opacity: 0.3; } }
        </style>
    `;

    // Lắng nghe tín hiệu bắt đầu từ Thầy
    if (window.HocSinhLiveChannel) _supabase.removeChannel(window.HocSinhLiveChannel);

    window.HocSinhLiveChannel = _supabase.channel('hocsinh_nghe_phong_' + maPin)
        .on('postgres_changes', {
            event: 'UPDATE',
            table: 'phong_live_quiz',
            filter: `ma_phong=eq.${maPin}`
        }, payload => {
            // Khi trạng thái đổi từ 0 (chờ) sang 1 (bắt đầu)
            if (payload.new.trang_thai === 1) {
                // Đồng bộ thời gian bắt đầu từ Server
                const tStart = new Date(payload.new.thoi_gian_bat_dau);
                window.ThongTinLiveHocSinh.thoiGianDong = new Date(tStart.getTime() + (payload.new.thoi_gian_lam_bai || 45) * 60000);

                Swal.fire({
                    icon: 'success',
                    title: '🚀 TRẬN ĐẤU BẮT ĐẦU!',
                    text: 'Chúc em làm bài tốt!',
                    timer: 2000,
                    showConfirmButton: false
                }).then(() => {
                    ham_8_6_3_bat_dau_lam_bai_live();
                });
            } else if (payload.new.trang_thai === 2) {
                Swal.fire('Kết thúc', 'Đấu trường đã kết thúc.', 'info').then(() => {
                    ham_8_6_tab_live_quiz(); // Trở về màn nhập mã
                });
            }
        }).subscribe();
};
// 3. Khởi tạo bài thi & Đồng bộ thời gian
window.ham_8_6_3_bat_dau_lam_bai_live = async function () {
    try {
        Swal.fire({ title: '⏳ Đang nạp đề thi Live...', didOpen: () => Swal.showLoading() });
        const { data: nv } = await _supabase.from('nhiem_vu').select('*').eq('ma_nhiem_vu', window.ThongTinLiveHocSinh.maNhiemVu).single();

        window.DangKhoiTaoLiveQuiz = true;

        // Ghi đè thời gian đếm ngược bằng Master Time
        if (window.ThongTinLiveHocSinh.thoiGianDong) {
            const giayConLai = Math.floor((window.ThongTinLiveHocSinh.thoiGianDong.getTime() - Date.now()) / 1000);
            nv.thoi_gian_lam_bai = giayConLai > 0 ? (giayConLai / 60) : 0;
        }

        await ham_8_8_khoi_tao_phong_thi(nv); // Gọi hàm gốc

        // Sau khi vẽ đề xong, MỞ CƠ CHẾ PHỤC HỒI
        await ham_8_6_5_khoi_phuc_dap_an_da_nop();

    } catch (e) { Swal.fire('Lỗi nạp đề', e.message, 'error'); }
};

// 4. Xử lý logic NỘP TỪNG CÂU & CẬP NHẬT ĐIỂM
window.ham_8_6_4_nop_tung_cau = async function (maCau, kieuCau, dapAnDungChuoi) {
    const phien = window.PhienLamBai;
    const dapanHS = phien.dap_an_hoc_sinh[maCau];

    if (!dapanHS || (kieuCau === 'DS' && Object.keys(dapanHS).length === 0)) {
        return Swal.fire('Nhắc nhở', 'Em chưa chọn đáp án cho câu hỏi này!', 'warning');
    }

    // Đóng gói chuỗi
    let chuoiDapAnGoi = "";
    if (kieuCau === 'DS') ['A', 'B', 'C', 'D'].forEach(k => chuoiDapAnGoi += dapanHS[k] || "_");
    else chuoiDapAnGoi = String(dapanHS).trim();

    // TÍNH ĐIỂM CỤC BỘ
    let diemCauNay = 0;
    const tongTrongSo = phien.danh_sach_cau_hoi.reduce((acc, c) => acc + ((c.kieuCau || 'TN') === 'TN' ? 1 : ((c.kieuCau || 'TN') === 'TLN' ? 2 : 4)), 0) || 1;
    const chuoiDapAnDung = String(dapAnDungChuoi).toUpperCase();
    const chuoiHs = chuoiDapAnGoi.toUpperCase();

    if (kieuCau === 'TN' && chuoiHs === chuoiDapAnDung) diemCauNay = 10.0 / tongTrongSo;
    else if (kieuCau === 'TLN' && (chuoiHs === chuoiDapAnDung || chuoiHs.replace(',', '.') === chuoiDapAnDung.replace(',', '.'))) diemCauNay = 20.0 / tongTrongSo;
    else if (kieuCau === 'DS') {
        let yDung = 0;
        for (let i = 0; i < 4; i++) { if (chuoiHs[i] !== '_' && chuoiHs[i] === chuoiDapAnDung[i]) yDung++; }
        const diemMaxDS = 40.0 / tongTrongSo;
        if (yDung === 1) diemCauNay = diemMaxDS * 0.1;
        else if (yDung === 2) diemCauNay = diemMaxDS * 0.25;
        else if (yDung === 3) diemCauNay = diemMaxDS * 0.5;
        else if (yDung === 4) diemCauNay = diemMaxDS * 1.0;
    }

    // KHÓA GIAO DIỆN (UI Lockdown)
    const btn = document.getElementById(`btn-live-${maCau}`);
    if (btn) { btn.disabled = true; btn.innerText = "⏳ ĐANG LƯU..."; btn.style.background = "#7f8c8d"; }

    // Khóa input
    const khoiCau = document.getElementById(`cau-${maCau}`);
    if (khoiCau) khoiCau.querySelectorAll('input').forEach(i => i.disabled = true);

    try {
        // GỌI RPC SERVER
        const { data: diemMoiNhat, error } = await _supabase.rpc('cham_diem_mot_cau', {
            p_ma_phong: window.ThongTinLiveHocSinh.maPhong,
            p_uid: GocHocSinhState.uid,
            p_ma_cau: maCau,
            p_dap_an_chon: chuoiDapAnGoi,
            p_diem_cau: Number(diemCauNay.toFixed(2))
        });
        if (error) throw error;

        // CẬP NHẬT ĐIỂM LÊN MÀN HÌNH HỌC SINH
        const hudDiem = document.getElementById('diem-hien-tai-hs');
        if (hudDiem) hudDiem.innerText = Number(diemMoiNhat).toFixed(2);

        // Chốt nút ĐÃ KHÓA
        if (btn) { btn.innerText = "✅ ĐÃ KHÓA"; btn.style.background = "#95a5a6"; }

    } catch (e) {
        if (btn) { btn.disabled = false; btn.innerText = "🚀 THỬ LẠI"; btn.style.background = "#e74c3c"; }
        if (khoiCau) khoiCau.querySelectorAll('input').forEach(i => i.disabled = false);
        Swal.fire('Lỗi kết nối', 'Mạng chập chờn, em hãy bấm gửi lại nhé!', 'error');
    }
};

// 5. Hàm Phục hồi khi Rớt mạng
window.ham_8_6_5_khoi_phuc_dap_an_da_nop = async function () {
    try {
        const { data: dsDaNop } = await _supabase.from('live_quiz_chi_tiet').select('ma_cau, dap_an_chon, diem_cau')
            .eq('ma_phong', window.ThongTinLiveHocSinh.maPhong).eq('uid_hoc_sinh', GocHocSinhState.uid);

        if (!dsDaNop || dsDaNop.length === 0) { Swal.close(); return; }

        let tongDiemPhucHoi = 0;

        dsDaNop.forEach(item => {
            tongDiemPhucHoi += Number(item.diem_cau);
            const maCau = item.ma_cau;
            const chuoiAns = item.dap_an_chon || "";
            const khoiCau = document.getElementById(`cau-${maCau}`);
            if (!khoiCau) return;

            const kieuCau = (khoiCau.getAttribute('data-loaicau') || 'TN').toUpperCase();

            // 5.1 Đổ lại đáp án lên UI
            if (kieuCau === 'TN') {
                const rad = khoiCau.querySelector(`input[value="${chuoiAns}"]`);
                if (rad) { rad.checked = true; rad.closest('label').style.background = '#e8f0fe'; }
            } else if (kieuCau === 'DS') {
                ['A', 'B', 'C', 'D'].forEach((k, idx) => {
                    if (chuoiAns[idx] && chuoiAns[idx] !== '_') {
                        const radDS = khoiCau.querySelector(`input[name="ds_${maCau}_${k}"][value="${chuoiAns[idx]}"]`);
                        if (radDS) radDS.checked = true;
                    }
                });
            } else if (kieuCau === 'TLN') {
                const inputs = khoiCau.querySelectorAll('input[type="text"]');
                for (let i = 0; i < 4; i++) { if (inputs[i] && chuoiAns[i]) inputs[i].value = chuoiAns[i]; }
            }

            // 5.2 Khóa UI và nút bấm
            khoiCau.querySelectorAll('input').forEach(i => i.disabled = true);
            const btnLive = document.getElementById(`btn-live-${maCau}`);
            if (btnLive) { btnLive.disabled = true; btnLive.innerText = "✅ ĐÃ KHÓA (KHÔI PHỤC)"; btnLive.style.background = "#95a5a6"; }

            // 5.3 Phục hồi màu nút điều hướng bên trái
            const nutNav = document.getElementById(`btn-nav-${maCau}`);
            if (nutNav) { nutNav.classList.add('da-lam'); nutNav.style.background = '#d4edda'; }
        });

        // Cập nhật lại Bảng điểm HUD
        const hudDiem = document.getElementById('diem-hien-tai-hs');
        if (hudDiem) hudDiem.innerText = Number(tongDiemPhucHoi).toFixed(2);

        Swal.close();
    } catch (e) { console.error(e); Swal.close(); }
};
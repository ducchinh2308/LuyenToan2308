// =====================================================================
// MODULE LIVE QUIZ HỌC SINH (Độc lập hoàn toàn)
// =====================================================================
window.HocSinhLiveChannel = null;
window.ThongTinLiveHocSinh = { maPhong: '', maNhiemVu: '' };

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

// 2. Hàm xử lý vào phòng
window.ham_8_6_1_vao_phong = async function () {
    const maPin = document.getElementById('txtPinLive').value.trim();
    if (!maPin) return Swal.fire('Thiếu thông tin', 'Vui lòng nhập mã PIN!', 'warning');
    Swal.fire({ title: 'Đang kết nối...', didOpen: () => { Swal.showLoading(); } });

    try {
        const { data: phong, error: errPhong } = await _supabase.from('phong_live_quiz').select('*').eq('ma_phong', maPin).maybeSingle();
        if (errPhong || !phong) throw new Error("Mã PIN không đúng!");
        if (phong.trang_thai === 2) throw new Error("Phòng thi đã kết thúc!");

        window.ThongTinLiveHocSinh = { maPhong: maPin, maNhiemVu: phong.ma_nhiem_vu };
        const { error: errUpsert } = await _supabase.from('tien_do_live_quiz').upsert({ ma_phong: maPin, uid_hoc_sinh: GocHocSinhState.uid, ten_hoc_sinh: GocHocSinhState.ten }, { onConflict: 'ma_phong,uid_hoc_sinh' });
        if (errUpsert) throw errUpsert;

        Swal.close();
        if (phong.trang_thai === 0) ham_8_6_2_phong_cho_live();
        else if (phong.trang_thai === 1) ham_8_6_3_bat_dau_lam_bai_live();
    } catch (e) { Swal.fire('Lỗi', e.message, 'error'); }
};

// 3. Phòng chờ Realtime
window.ham_8_6_2_phong_cho_live = function () {
    const vungLamViec = document.getElementById('vung-lam-viec-hoc-sinh');
    vungLamViec.innerHTML = `<div style="text-align: center; padding: 40px;"><h2>✅ ĐÃ VÀO PHÒNG</h2><div class="spinner"></div><h3>Đợi hiệu lệnh bắt đầu...</h3></div>`;

    if (window.HocSinhLiveChannel) _supabase.removeChannel(window.HocSinhLiveChannel);
    window.HocSinhLiveChannel = _supabase.channel('hocsinh_nghe_phong_' + window.ThongTinLiveHocSinh.maPhong)
        .on('postgres_changes', { event: 'UPDATE', table: 'phong_live_quiz', filter: `ma_phong=eq.${window.ThongTinLiveHocSinh.maPhong}` }, payload => {
            if (payload.new.trang_thai === 1) ham_8_6_3_bat_dau_lam_bai_live();
            else if (payload.new.trang_thai === 2) { Swal.fire('Kết thúc', 'Đấu trường đã đóng.', 'info'); ham_8_6_tab_live_quiz(); }
        }).subscribe();
};

// 4. Hàm nạp đề riêng cho Live Quiz
window.ham_8_6_3_bat_dau_lam_bai_live = async function () {
    try {
        Swal.fire({ title: '⏳ Đang nạp đề...', didOpen: () => { Swal.showLoading(); } });
        const { data: nv, error } = await _supabase.from('nhiem_vu').select('*').eq('ma_nhiem_vu', window.ThongTinLiveHocSinh.maNhiemVu).single();
        if (error) throw error;

        window.DangKhoiTaoLiveQuiz = true; // Gắn cờ để hàm nạp đề nhận diện
        await ham_8_8_khoi_tao_phong_thi(nv);
    } catch (e) { Swal.fire('Lỗi', e.message, 'error'); }
};

// 5. Hàm bắn sóng điểm số (Được gọi từ hàm luuDapAn gốc)
window.ham_8_6_4_ban_song_realtime = function () {
    const phien = window.PhienLamBai;
    if (!phien || !phien.isLiveQuiz) return;

    let soCauDaLam = 0, soCauDung = 0, tongDiemLive = 0, tongTrongSo = 0;
    // ... (Thầy giữ lại logic chấm điểm như cũ) ...
    // ... (Logic bắn update Supabase y hệt cũ) ...
    _supabase.from('tien_do_live_quiz').update({ so_cau_da_lam: soCauDaLam, so_cau_dung: soCauDung, diem_so: Number(tongDiemLive.toFixed(2)) })
        .eq('ma_phong', phien.maPhongLive).eq('uid_hoc_sinh', GocHocSinhState.uid).then(() => { });
};
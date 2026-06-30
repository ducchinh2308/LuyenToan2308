// =====================================================================
// KHU VỰC KHỞI TẠO BIẾN TOÀN CỤC
// =====================================================================
window.ThongTinLiveHocSinh = { maPhong: '', maNhiemVu: '', thoiGianDong: null };
window.DangKhoiTaoLiveQuiz = false;
window.IntervalKiemTraPhong = null;
window.HocSinhLiveChannel = null;

// =====================================================================
// 1. Hàm vẽ giao diện nhập mã PIN
// =====================================================================
window.ham_8_6_tab_live_quiz = function () {
    const vungLamViec = document.getElementById('vung-lam-viec-hoc-sinh');
    if (!vungLamViec) return;

    if (window.HocSinhLiveChannel) { _supabase.removeChannel(window.HocSinhLiveChannel); window.HocSinhLiveChannel = null; }

    vungLamViec.innerHTML = `
        <div style="max-width: 450px; margin: 40px auto; background: white; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); overflow: hidden;">
            
            <div style="padding: 30px;">
                <input type="text" id="txtPinLive" placeholder="MÃ PIN (6 SỐ)" style="width: 100%; padding: 18px; text-align: center; font-size: 24px; font-weight: 900; border: 2px solid #ddd; border-radius: 12px; margin-bottom: 20px;" maxlength="6" oninput="this.value = this.value.replace(/[^0-9]/g, '')">
                <button onclick="ham_8_6_1_vao_phong()" style="width: 100%; padding: 16px; background: #e74c3c; color: white; border: none; border-radius: 12px; font-weight: 900; font-size: 18px; cursor: pointer;">🚀 VÀO PHÒNG</button>
            </div>
        </div>
    `;
    //<div style="background: #1e1e2f; padding: 40px 20px; text-align: center; color: white;">
    //    <div style="font-size: 50px; margin-bottom: 10px;">🎮</div>
    //    <h2 style="margin: 0; font-size: 24px; font-weight: 900;">ĐẤU TRƯỜNG TRỰC TIẾP</h2>
    //</div>
};




// =====================================================================
// [Nhãn thời gian: 16:20 - Ngày 19/06/2026] - Hàm 8.6.1: Vào phòng & Phục hồi trạng thái
// =====================================================================
window.ham_8_6_1_vao_phong = async function () {
    const maPin = document.getElementById('txtPinLive').value.trim();
    if (!maPin) return Swal.fire('Nhắc nhở', 'Vui lòng nhập mã PIN của phòng thi!', 'warning');

    Swal.fire({ title: 'Đang xác thực và kết nối...', didOpen: () => Swal.showLoading() });

    try {
        // 1. Kiểm tra phòng thi tồn tại và trạng thái
        const { data: phong, error: errPhong } = await _supabase
            .from('phong_live_quiz')
            .select('*')
            .eq('ma_phong', maPin)
            .maybeSingle();

        if (errPhong || !phong) throw new Error("Mã PIN không tồn tại!");
        if (phong.trang_thai === 2) throw new Error("Đấu trường này đã đóng!");

        // 2. Truy vấn tiến độ hiện tại của học sinh (Cơ chế kiểm tra xem đã từng vào hay chưa)
        const { data: tienDoCu } = await _supabase.from('tien_do_live_quiz')
            .select('*')
            .eq('ma_phong', maPin)
            .eq('uid_hoc_sinh', GocHocSinhState.uid)
            .maybeSingle();

        // 🌟 TÌNH HUỐNG 1: Học sinh đã nộp bài thành công trước đó -> Đẩy ra màn hình kết quả
        if (tienDoCu && tienDoCu.da_nop === true) {
            window.ThongTinLiveHocSinh.maPhong = maPin;
            Swal.close();
            ham_8_6_6_man_hinh_ket_qua_cho(tienDoCu.diem_so || 0);
            return;
        }

        // 3. THIẾT LẬP THÔNG TIN PHIÊN THI
        window.ThongTinLiveHocSinh.maPhong = maPin;
        window.ThongTinLiveHocSinh.maNhiemVu = phong.ma_nhiem_vu;

        // 4. Upsert danh tính (Ghi danh vào phòng)
        const { error: errUpsert } = await _supabase.from('tien_do_live_quiz').upsert({
            ma_phong: maPin,
            uid_hoc_sinh: GocHocSinhState.uid,
            ten_hoc_sinh: GocHocSinhState.ten,
            thoi_gian_cap_nhat: new Date().toISOString()
        }, { onConflict: 'ma_phong,uid_hoc_sinh' });

        if (errUpsert) throw new Error("Không thể ghi danh vào phòng thi.");

        // 5. ĐIỀU HƯỚNG THEO TRẠNG THÁI PHÒNG
        Swal.close();

        if (phong.trang_thai === 0) {
            // Phòng đang chờ
            ham_8_6_2_phong_cho_live();
        } else if (phong.trang_thai === 1) {
            // Phòng đang thi: Hệ thống sẽ tự động gọi nạp đề và phục hồi đáp án cũ
            ham_8_6_bat_dau_thi_ngay(phong);
        }

    } catch (e) {
        Swal.fire('Lỗi kết nối', e.message, 'error');
    }
};
// =====================================================================
// 3. Hàm Phòng chờ & Kiểm tra thủ công
// =====================================================================
window.ham_8_6_2_phong_cho_live = function () {
    const vungLamViec = document.getElementById('vung-lam-viec-hoc-sinh');
    vungLamViec.innerHTML = `
        <div style="max-width: 500px; margin: 40px auto; background: white; border-radius: 20px; padding: 40px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
            <div style="font-size: 50px; margin-bottom: 20px;">⏳</div>
            <h2>ĐANG ĐỢI CHỦ PHÒNG...</h2>
            <p>Mã PIN: <b>${window.ThongTinLiveHocSinh.maPhong}</b></p>
            <div style="margin: 20px auto; width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #3498db; border-radius: 50%; animation: spin 1s linear infinite;"></div>
            <button onclick="ham_8_6_kiem_tra_phong_ngay_lap_tuc()" style="padding: 12px 25px; background: #f39c12; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">🔄 CẬP NHẬT TÍN HIỆU NGAY</button>
        </div>
        <style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>
    `;

    // Realtime
    if (window.HocSinhLiveChannel) _supabase.removeChannel(window.HocSinhLiveChannel);
    window.HocSinhLiveChannel = _supabase.channel('kenh_' + window.ThongTinLiveHocSinh.maPhong)
        .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'phong_live_quiz', filter: `ma_phong=eq.${window.ThongTinLiveHocSinh.maPhong}` }, payload => {
            if (payload.new.trang_thai === 1) ham_8_6_bat_dau_thi_ngay(payload.new);
        }).subscribe();

    // Tự quét
    if (window.IntervalKiemTraPhong) clearInterval(window.IntervalKiemTraPhong);
    window.IntervalKiemTraPhong = setInterval(async () => {
        const { data: p } = await _supabase.from('phong_live_quiz').select('trang_thai, thoi_gian_bat_dau, thoi_gian_lam_bai').eq('ma_phong', window.ThongTinLiveHocSinh.maPhong).single();
        if (p && p.trang_thai === 1) ham_8_6_bat_dau_thi_ngay(p);
    }, 3000);
};

window.ham_8_6_kiem_tra_phong_ngay_lap_tuc = async function () {
    const { data: p } = await _supabase.from('phong_live_quiz').select('trang_thai, thoi_gian_bat_dau, thoi_gian_lam_bai').eq('ma_phong', window.ThongTinLiveHocSinh.maPhong).single();
    if (p && p.trang_thai === 1) ham_8_6_bat_dau_thi_ngay(p);
    else Swal.fire('Thông báo', 'Thầy chưa bắt đầu thi!', 'info');
};

// =====================================================================
// 4. Hàm Bắt đầu thi (dùng chung)
// =====================================================================
window.ham_8_6_bat_dau_thi_ngay = function (phong) {
    if (window.IntervalKiemTraPhong) clearInterval(window.IntervalKiemTraPhong);
    if (window.HocSinhLiveChannel) _supabase.removeChannel(window.HocSinhLiveChannel);

    const tStart = new Date(phong.thoi_gian_bat_dau);
    window.ThongTinLiveHocSinh.thoiGianDong = new Date(tStart.getTime() + (phong.thoi_gian_lam_bai || 45) * 60000);

    Swal.fire({ title: '🚀 TRẬN ĐẤU BẮT ĐẦU!', timer: 1500, showConfirmButton: false }).then(() => {
        ham_8_6_3_bat_dau_lam_bai_live();
    });
};




window.ham_8_6_3_bat_dau_lam_bai_live = async function () {
    try {
        Swal.fire({ title: '⏳ Đang nạp đề...', didOpen: () => Swal.showLoading() });
        const { data: nv } = await _supabase.from('nhiem_vu_trac_nghiem').select('*').eq('ma_nhiem_vu', window.ThongTinLiveHocSinh.maNhiemVu).single();

        window.DangKhoiTaoLiveQuiz = true;

        if (window.ThongTinLiveHocSinh.thoiGianDong) {
            const giayConLai = Math.floor((window.ThongTinLiveHocSinh.thoiGianDong.getTime() - Date.now()) / 1000);
            nv.thoi_gian_lam_bai = giayConLai > 0 ? Number((giayConLai / 60).toFixed(2)) : 0;
        }

        // QUAN TRỌNG: Phải chờ hàm này chạy xong (vẽ xong giao diện) rồi mới gọi phục hồi
        await ham_8_8a_khoi_tao_phong_thi_trac_nghiem(nv);

        // Đợi 200ms để DOM cập nhật hoàn toàn các ID câu hỏi
        setTimeout(async () => {
            await ham_8_6_5_khoi_phuc_dap_an_da_nop();
            Swal.close();
        }, 200);

    } catch (e) { Swal.fire('Lỗi nạp đề', e.message, 'error'); }
};

// =====================================================================
// Hàm chạy ngầm: Bắn tín hiệu cập nhật thanh tiến độ Live Quiz
// =====================================================================
window.ham_8_x_ban_tien_do_live_tung_cau = async function (tongDiemHienTai, soCauDungMoiThem) {
    if (!window.PhienLamBai || !window.PhienLamBai.isLiveQuiz || !window.ThongTinLiveHocSinh) return;

    try {
        const phien = window.PhienLamBai;
        // Đếm số lượng câu đã nộp thành công
        const soCauDaLam = phien.danh_sach_cau_da_nop ? phien.danh_sach_cau_da_nop.size : 0;

        // Tích lũy số câu đúng (nếu điểm > 0 thì cộng vào)
        phien.tong_so_cau_dung = (phien.tong_so_cau_dung || 0) + soCauDungMoiThem;

        await _supabase.from('tien_do_live_quiz')
            .update({
                diem_so: tongDiemHienTai, // Bắn điểm thật lên cho GV xem
                so_cau_da_lam: soCauDaLam,
                so_cau_dung: phien.tong_so_cau_dung, // Bắn tổng số câu đúng
                thoi_gian_cap_nhat: new Date().toISOString()
            })
            .eq('ma_phong', window.ThongTinLiveHocSinh.maPhong)
            .eq('uid_hoc_sinh', GocHocSinhState.uid);

    } catch (err) {
        console.warn("Bỏ qua đồng bộ tiến độ do mạng lag.");
    }
};

// =====================================================================
// 4. Hàm Nộp từng câu lên Server để chấm điểm (BẢN CHUẨN - KÈM BẮN TIẾN ĐỘ)
// =====================================================================
window.ham_8_6_4_nop_tung_cau = async function (maCau, kieuCau) {
    const phien = window.PhienLamBai;

    const cauHoiGoc = phien.danh_sach_cau_hoi.find(c => (c.ma_cau_hoi === maCau || c.maCau === maCau));
    if (!cauHoiGoc) return Swal.fire('Lỗi', 'Không tìm thấy dữ liệu gốc của câu hỏi này!', 'error');

    const dapAnChuan = (cauHoiGoc.dap_an || cauHoiGoc.dapAn || cauHoiGoc.dap_an_dung || "").trim();

    let soCauTN = 0, soCauDS = 0, soCauTLN = 0;
    phien.danh_sach_cau_hoi.forEach(c => {
        let loai = (c.kieuCau || c.loaiCau || "TN").toUpperCase();
        if (loai === 'TN') soCauTN++;
        else if (loai === 'DS') soCauDS++;
        else if (loai === 'TLN') soCauTLN++;
    });

    let tongTrongSo = (soCauTN * 1.0) + (soCauTLN * 2.0) + (soCauDS * 4.0);
    if (tongTrongSo === 0) tongTrongSo = 1;

    let diemToiDa = 0;
    if (kieuCau === 'TN') diemToiDa = (10.0 * 1.0) / tongTrongSo;
    else if (kieuCau === 'DS') diemToiDa = (10.0 * 4.0) / tongTrongSo;
    else if (kieuCau === 'TLN') diemToiDa = (10.0 * 2.0) / tongTrongSo;

    const dapanHS = phien.dap_an_hoc_sinh[maCau];
    if (!dapanHS || (kieuCau === 'DS' && Object.keys(dapanHS).length === 0)) {
        return Swal.fire('Nhắc nhở', 'Em chưa chọn đủ đáp án cho câu hỏi này!', 'warning');
    }

    let chuoiDapAnGoi = "";
    if (kieuCau === 'DS') {
        chuoiDapAnGoi = ['a', 'b', 'c', 'd'].map(k => dapanHS[k] || dapanHS[k.toUpperCase()] || "_").join('');
    } else {
        chuoiDapAnGoi = String(dapanHS).trim().toUpperCase();
    }

    const btn = document.getElementById(`btn-live-${maCau}`);
    if (btn) { btn.disabled = true; btn.innerText = "⏳ ĐANG LƯU..."; btn.style.background = "#7f8c8d"; }
    const khoiCau = document.getElementById(`cau-${maCau}`);
    if (khoiCau) khoiCau.querySelectorAll('input').forEach(i => i.disabled = true);

    try {
        const { data: ketQuaTraVe, error } = await _supabase.rpc('cham_diem_mot_cau_trac_nghiem', {
            p_ma_phong: window.ThongTinLiveHocSinh.maPhong,
            p_uid: GocHocSinhState.uid,
            p_ma_cau: maCau,
            p_dap_an_chon: chuoiDapAnGoi,
            p_dap_an_dung: dapAnChuan,
            //p_kieu_cau: kieuCau,
            p_diem_toi_da: diemToiDa
        });

        if (error) throw error;

        // Quản lý số lượng câu đã nộp thành công
        if (!phien.danh_sach_cau_da_nop) phien.danh_sach_cau_da_nop = new Set();
        phien.danh_sach_cau_da_nop.add(maCau);

        const diemCauNay = Number(ketQuaTraVe.diem_cau_nay);
        const soYDung = Number(ketQuaTraVe.so_y_dung || 0);
        let laCauDungHoanToan = 0; // Cờ hiệu để cộng vào tổng câu đúng

        if (btn) {
            if (kieuCau === 'DS') {
                if (diemCauNay > 0) {
                    btn.innerText = `✅ ĐÚNG ${soYDung}/4 Ý (+${diemCauNay.toFixed(2)})`;
                    btn.style.background = "#27ae60";
                    if (soYDung === 4) laCauDungHoanToan = 1;
                } else {
                    btn.innerText = `❌ ĐÚNG ${soYDung}/4 Ý (0 ĐIỂM)`;
                    btn.style.background = "#c0392b";
                }
            } else {
                if (diemCauNay > 0) {
                    btn.innerText = `✅ ĐÚNG (+${diemCauNay.toFixed(2)})`;
                    btn.style.background = "#27ae60";
                    laCauDungHoanToan = 1;
                } else {
                    btn.innerText = `❌ SAI (0 ĐIỂM)`;
                    btn.style.background = "#c0392b";
                }
            }
        }

        const tongDiemCapNhat = Number(ketQuaTraVe.tong_diem);
        const hudDiem = document.getElementById('diem-hien-tai-hs');
        if (hudDiem) {
            hudDiem.innerText = tongDiemCapNhat.toFixed(2);
            hudDiem.style.color = "#f1c40f";
            setTimeout(() => { hudDiem.style.color = "white"; }, 500);
        }

        // 🌟 BẮN TIẾN ĐỘ NGẦM LÊN SERVER
        window.ham_8_x_ban_tien_do_live_tung_cau(tongDiemCapNhat, laCauDungHoanToan);

        // Chốt hạ khi đủ số câu
        if (phien.danh_sach_cau_da_nop.size === phien.tong_so_cau) {
            if (window.ThongTinLiveHocSinh.maPhong) {
                await _supabase.from('tien_do_live_quiz')
                    .update({ da_nop: true })
                    .eq('ma_phong', window.ThongTinLiveHocSinh.maPhong)
                    .eq('uid_hoc_sinh', GocHocSinhState.uid);
            }
            if (phien.id_timer) clearInterval(phien.id_timer);

            Swal.fire({
                title: '🎉 Hoàn thành bài làm!',
                html: `Em đã trả lời đủ <b>${phien.tong_so_cau}/${phien.tong_so_cau}</b> câu hỏi.<br>🎯 Tổng điểm tích lũy: <b>${tongDiemCapNhat.toFixed(2)} điểm</b>.<br>Màn hình đã đóng chỉnh sửa, em có thể cuộn để xem lại bài làm của mình.`,
                icon: 'success'
            });
        }

    } catch (e) {
        // if (btn) { btn.disabled = false; btn.innerText = "🚀 THỬ LẠI"; btn.style.background = "#e74c3c"; }
        // if (khoiCau) khoiCau.querySelectorAll('input').forEach(i => i.disabled = false);
        // Swal.fire('Lỗi', 'Không kết nối được server! Vui lòng thử lại.', 'error');
        console.error("❌ Lỗi chi tiết từ Supabase:", e); // In thẳng lỗi ra F12 để bắt bệnh
        if (btn) { btn.disabled = false; btn.innerText = "🚀 THỬ LẠI"; btn.style.background = "#e74c3c"; }
        if (khoiCau) khoiCau.querySelectorAll('input').forEach(i => i.disabled = false);
        Swal.fire('Lỗi nộp bài', e.message || 'Không kết nối được server! Vui lòng thử lại.', 'error');
    }
};




// =====================================================================
// [Nhãn thời gian: BẢN NÂNG CẤP V2] - Hàm 8.6.5: Phục hồi bài thi chuẩn 100% Giao Diện
// =====================================================================
window.ham_8_6_5_khoi_phuc_dap_an_da_nop = async function () {
    //console.log("🔍 [DEBUG] Bắt đầu phục hồi trạng thái bài làm...");

    if (!GocHocSinhState || !GocHocSinhState.uid) {
        setTimeout(ham_8_6_5_khoi_phuc_dap_an_da_nop, 1000);
        return;
    }

    try {
        // 🌟 1. LẤY DỮ LIỆU ĐÁP ÁN GỐC TỪ DATABASE (Theo mã nhiệm vụ)
        // Vì Nhiệm vụ Live có maNhiemVu, ta truy vấn bảng nhiem_vu_trac_nghiem -> hoc_lieu
        const { data: nv } = await _supabase
            .from('nhiem_vu_trac_nghiem')
            .select('hoc_lieu_trac_nghiem(danh_sach_cau_hoi)')
            .eq('ma_nhiem_vu', window.ThongTinLiveHocSinh.maNhiemVu)
            .single();

        // Tạo Từ điển đáp án: { ma_cau: "TFTF" }
        const tuDienDapAn = {};
        if (nv && nv.hoc_lieu_trac_nghiem && nv.hoc_lieu_trac_nghiem.danh_sach_cau_hoi) {
            nv.hoc_lieu_trac_nghiem.danh_sach_cau_hoi.forEach(c => {
                // Làm sạch đáp án: lấy đúng chuỗi ký tự chỉ gồm T/F hoặc A/B/C/D
                let da = String(c.dap_an || "").replace(/[^A-Za-z]/g, '').toUpperCase();
                tuDienDapAn[c.ma_cau_hoi] = da;
            });
        }
        //console.log("📚 Từ điển đáp án từ DB:", tuDienDapAn);


        // 🌟 2. LẤY DỮ LIỆU BÀI LÀM CỦA HỌC SINH
        const { data: dsDaNopTheoPhong, error: err } = await _supabase.from('live_quiz_chi_tiet')
            .select('*')
            .eq('ma_phong', String(window.ThongTinLiveHocSinh.maPhong).trim());

        if (err || !dsDaNopTheoPhong) return;

        const dsDaNop = dsDaNopTheoPhong.filter(item =>
            String(item.uid_hoc_sinh).trim() === String(GocHocSinhState.uid).trim()
        );

        if (dsDaNop.length === 0) return;

        // ==========================================
        // BẮT ĐẦU QUÁ TRÌNH KHÔI PHỤC CHI TIẾT
        // ==========================================
        let tongDiemPhucHoi = 0;
        let tongSoCauDungPhucHoi = 0;

        if (!window.PhienLamBai.danh_sach_cau_da_nop) window.PhienLamBai.danh_sach_cau_da_nop = new Set();
        if (!window.PhienLamBai.dap_an_hoc_sinh) window.PhienLamBai.dap_an_hoc_sinh = {};

        dsDaNop.forEach(item => {
            const diemCauNay = Number(item.diem_cau || 0);
            tongDiemPhucHoi += diemCauNay;
            window.PhienLamBai.danh_sach_cau_da_nop.add(item.ma_cau);

            const khoiCau = document.getElementById(`cau-${item.ma_cau}`);
            if (!khoiCau) return;

            const kieuCau = (khoiCau.getAttribute('data-loaicau') || 'TN').toUpperCase();
            const chuoiAns = (item.dap_an_chon || "").trim().toUpperCase();

            // 🌟 3. LẤY ĐÁP ÁN CHUẨN TỪ TỪ ĐIỂN VỪA TẠO
            const dapAnChuan = tuDienDapAn[item.ma_cau] || "";


            


            // 1. ĐỔ LẠI ĐÁP ÁN LÊN GIAO DIỆN & RAM
            if (kieuCau === 'TN') {
                window.PhienLamBai.dap_an_hoc_sinh[item.ma_cau] = chuoiAns;
                const rad = khoiCau.querySelector(`input[value="${chuoiAns}"]`);
                if (rad) {
                    rad.checked = true;
                    if (rad.closest('label')) {
                        rad.closest('label').style.background = '#e8f0fe';
                        rad.closest('label').style.borderColor = '#b8daff';
                    }
                }
            } else if (kieuCau === 'DS') {
                window.PhienLamBai.dap_an_hoc_sinh[item.ma_cau] = {};
                [...chuoiAns].forEach((ans, idx) => {
                    const k = ['A', 'B', 'C', 'D'][idx];

                    // 🌟 2. CHỈ TÔ MÀU VÀ GHI NHẬN NẾU LÀ T HOẶC F (Bỏ qua ký tự '_')
                    if (ans === 'T' || ans === 'F') {
                        window.PhienLamBai.dap_an_hoc_sinh[item.ma_cau][k] = ans;

                        const radDS = khoiCau.querySelector(`input[name="ds_${item.ma_cau}_${k}"][value="${ans}"]`);
                        if (radDS) {
                            radDS.checked = true;

                            // Tô màu nếu giao diện bọc bằng thẻ <label>
                            const labelWrap = radDS.closest('label');
                            if (labelWrap) {
                                labelWrap.style.background = '#e8f0fe';
                                labelWrap.style.borderColor = '#b8daff';
                            }

                            // Tô màu nếu giao diện bọc bằng thẻ <td> (Bảng)
                            const tdWrap = radDS.closest('td');
                            if (tdWrap) {
                                tdWrap.style.background = '#e8f0fe';
                            }
                        }
                    }
                });
            } else if (kieuCau === 'TLN') {
                window.PhienLamBai.dap_an_hoc_sinh[item.ma_cau] = chuoiAns;
                const inputs = khoiCau.querySelectorAll('input[type="text"]');
                const arr = chuoiAns.split('');
                inputs.forEach((inp, idx) => { if (arr[idx]) inp.value = arr[idx]; });
            }

            // Khóa Input không cho sửa nữa
            khoiCau.querySelectorAll('input').forEach(i => i.disabled = true);

            // 2. PHỤC HỒI NÚT NỘP BÀI (HIỂN THỊ CHÍNH XÁC NHƯ LÚC LÀM)
            const btn = document.getElementById(`btn-live-${item.ma_cau}`);
            if (btn) {
                btn.disabled = true;

                if (kieuCau === 'DS') {
                    let soYDung = 0;

                    //console.log(`📌 Phục hồi câu ${item.ma_cau}: Đáp án chuẩn: ${dapAnChuan}, Đáp án HS: ${chuoiAns}`);
                    // 🌟 3. ĐẾM Ý ĐÚNG: Đối chiếu chuỗi _F_F với chuỗi chuẩn TFTF
                    if (dapAnChuan.length === 4) {
                        for (let i = 0; i < 4; i++) {
                            if ((chuoiAns[i] === 'T' || chuoiAns[i] === 'F') && chuoiAns[i] === dapAnChuan[i]) {
                                soYDung++;
                            }
                        }
                    } else {
                        console.warn(`⚠️ Đáp án chuẩn câu ${item.ma_cau} không đủ 4 ký tự TF:`, dapAnChuan);
                    }

                    if (soYDung === 4) tongSoCauDungPhucHoi++; // Cộng câu đúng toàn thời gian

                    if (diemCauNay > 0) {
                        btn.innerText = `✅ ĐÚNG ${soYDung}/4 Ý (+${diemCauNay.toFixed(2)})`;
                        btn.style.background = "#27ae60";
                    } else {
                        btn.innerText = `❌ ĐÚNG ${soYDung}/4 Ý (0 ĐIỂM)`;
                        btn.style.background = "#c0392b";
                    }
                } else { // Trắc nghiệm hoặc Tự luận ngắn
                    if (diemCauNay > 0) {
                        btn.innerText = `✅ ĐÚNG (+${diemCauNay.toFixed(2)})`;
                        btn.style.background = "#27ae60";
                        tongSoCauDungPhucHoi++;
                    } else {
                        btn.innerText = `❌ SAI (0 ĐIỂM)`;
                        btn.style.background = "#c0392b";
                    }
                }
            }

            


            // 4. Đánh dấu và Tô màu nút điều hướng (GIỮ NGUYÊN KÍCH THƯỚC)
            const nutNav = document.getElementById(`btn-nav-${item.ma_cau}`);
            if (nutNav) {
                // Giữ lại nội dung cũ (số thứ tự)
                const soTT = nutNav.innerText;

                // Hiển thị đáp án bên dưới số thứ tự với font siêu nhỏ, dùng flex để không chiếm diện tích
                nutNav.innerHTML = `
                    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%;">
                        <span>${soTT}</span>
                        <span style="font-size: 8px; transform: scale(0.9); font-weight: bold; background: rgba(0,0,0,0.1); padding: 0 2px; border-radius: 2px; margin-top: 2px;">${chuoiAns}</span>
                    </div>
                `;

                // // Định dạng màu sắc dựa trên điểm số
                // const diem = Number(item.diem_cau || 0);
                // const mauChinh = (diem > 0) ? '#27ae60' : '#c0392b';
                // const mauHover = (diem > 0) ? '#219150' : '#a93226';

                const diem = Number(item.diem_cau || 0);
                let mauChinh = '#c0392b'; // Mặc định là đỏ (Sai)
                let mauHover = '#a93226';
                if (kieuCau === 'DS') {
                    // Đếm số ý đúng bằng cách so sánh chuỗi đáp án học sinh với dapAnChuan
                    let soYDung = 0;
                    for (let i = 0; i < 4; i++) {
                        if ((chuoiAns[i] === 'T' || chuoiAns[i] === 'F') && chuoiAns[i] === dapAnChuan[i]) {
                            soYDung++;
                        }
                    }

                    if (soYDung === 4) {
                        mauChinh = '#27ae60'; // Xanh lá: Đúng hoàn hảo 4/4
                        mauHover = '#219150';
                    } else if (diem > 0) {
                        mauChinh = '#f39c12'; // Vàng cam: Làm đúng một phần (vẫn có điểm)
                        mauHover = '#d68910';
                    }
                } else {
                    // Logic cho câu Trắc nghiệm (TN) hoặc Tự luận (TLN) giữ nguyên
                    if (diem > 0) {
                        mauChinh = '#27ae60';
                        mauHover = '#219150';
                    }
                }



                nutNav.style.background = mauChinh;
                nutNav.style.color = 'white';

                // Đảm bảo nút không bị thay đổi kích thước do nội dung mới
                nutNav.style.padding = '2px';
                nutNav.style.boxSizing = 'border-box';

                // Ghi đè sự kiện hover
                nutNav.onmouseover = function () { this.style.background = mauHover; };
                nutNav.onmouseout = function () { this.style.background = mauChinh; };
            }


        });

        // 3. Cập nhật Điểm và Biến hệ thống RAM
        window.PhienLamBai.tong_so_cau_dung = tongSoCauDungPhucHoi;


       


        const hudDiem = document.getElementById('diem-hien-tai-hs');
        if (hudDiem) hudDiem.innerText = Number(tongDiemPhucHoi).toFixed(2);

        //console.log("✅ Phục hồi thành công! Điểm:", tongDiemPhucHoi, "- Số câu đúng:", tongSoCauDungPhucHoi);

    } catch (e) {
        console.error("❌ Lỗi phục hồi hệ thống:", e);
    }
};



// =====================================================================
// [Nhãn thời gian: 10:05 - Ngày 29/05/2026] - Hàm 8.6.6: Màn hình báo kết quả đã thi
// =====================================================================
window.ham_8_6_6_man_hinh_ket_qua_cho = function (diemSo) {
    // 1. Gỡ bỏ không gian thi full màn hình
    const khongGianThi = document.getElementById('khong-gian-thi-toan-man-hinh');
    if (khongGianThi) khongGianThi.remove();

    // 2. Mở lại thanh cuộn
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';

    // 3. BẬT LẠI KHUNG GIAO DIỆN CHÍNH (Rất quan trọng để không bị lỗi Null)
    const dashboard = document.getElementById('dashboard-container');
    if (dashboard) dashboard.style.display = 'block';

    const vungLamViec = document.getElementById('vung-lam-viec-hoc-sinh') || dashboard;
    if (!vungLamViec) return;

    vungLamViec.innerHTML = `
        <div style="max-width: 550px; margin: 60px auto; background: white; border-radius: 20px; box-shadow: 0 15px 35px rgba(0,0,0,0.1); overflow: hidden; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
            <div style="background: #27ae60; padding: 40px 20px; text-align: center; color: white;">
                <div style="font-size: 60px; margin-bottom: 10px; animation: pulse 2s infinite;">🏆</div>
                <h2 style="margin: 0; font-size: 24px; font-weight: 800; letter-spacing: 1px;">HOÀN THÀNH THI ĐẤU</h2>
                <p style="margin: 5px 0 0 0; opacity: 0.85; font-size: 14px;">Mã phòng đấu: ${window.ThongTinLiveHocSinh.maPhong || '---'}</p>
            </div>
            <div style="padding: 40px 30px; text-align: center;">
                <div style="font-size: 14px; color: #7f8c8d; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Điểm số chính thức của em</div>
                <div style="font-size: 64px; font-weight: 900; color: #2c3e50; margin: 10px 0; font-family: monospace;">${Number(diemSo).toFixed(2)}</div>
                
                <div style="background: #f8f9fa; border-left: 4px solid #2980b9; padding: 15px; border-radius: 8px; text-align: left; margin-top: 30px;">
                    <p style="margin: 0; color: #2c3e50; font-weight: bold; font-size: 15px;">⏳ Đang đợi các bạn khác nộp bài...</p>
                    <p style="margin: 5px 0 0 0; color: #7f8c8d; font-size: 13px;">Bảng xếp hạng tổng sắp toàn lớp sẽ được Thầy giáo công bố trên màn hình máy chiếu sau khi kết thúc phòng đấu.</p>
                </div>
                
                <button onclick="ham_8_6_7_thoat_ve_trang_chu()" style="margin-top: 30px; width: 100%; padding: 14px; background: #34495e; color: white; border: none; border-radius: 10px; font-weight: bold; font-size: 16px; cursor: pointer; transition: 0.2s; box-shadow: 0 4px 6px rgba(0,0,0,0.1);" onmouseover="this.style.background='#2c3e50'" onmouseout="this.style.background='#34495e'">
                    🏠 TRỞ VỀ MÀN HÌNH CHÍNH
                </button>
            </div>
        </div>
    `;
};

// =====================================================================
// [Nhãn thời gian: 10:05 - Ngày 29/05/2026] - Hàm 8.6.7: Dọn dẹp Live Quiz và Reset lại Khung Giao Diện
// =====================================================================
window.ham_8_6_7_thoat_ve_trang_chu = function () {
    // 1. Dọn dẹp rác bộ nhớ của phiên Đấu trường
    window.ThongTinLiveHocSinh = { maPhong: '', maNhiemVu: '', thoiGianDong: null };
    window.DangKhoiTaoLiveQuiz = false;

    if (window.HocSinhLiveChannel) {
        _supabase.removeChannel(window.HocSinhLiveChannel);
        window.HocSinhLiveChannel = null;
    }

    if (window.IntervalKiemTraPhong) {
        clearInterval(window.IntervalKiemTraPhong);
        window.IntervalKiemTraPhong = null;
    }

    // 2. GỌI LẠI HÀM "DỰNG BỘ KHUNG GIAO DIỆN (Hàm 8.1)" CỦA THẦY
    // Việc này đảm bảo thẻ "vung-lam-viec-hoc-sinh" được sinh ra lại mới tinh 100%, khắc phục dứt điểm lỗi Null.
    if (typeof window.ham_8_1_tai_nhiem_vu_cua_toi === 'function') {
        window.ham_8_1_tai_nhiem_vu_cua_toi(
            GocHocSinhState.uid,
            GocHocSinhState.danh_sach_ma_lop,
            GocHocSinhState.ten
        );
    } else {
        // Đường cùng dự phòng
        location.reload();
    }
};




// =====================================================================
// [Nhãn thời gian: 09:19 - Ngày 29/05/2026] - Hàm 8.6.8: Chốt nộp bài Đấu trường Live (Độc lập hoàn toàn, không reload)
// =====================================================================
window.ham_8_6_8_chot_nop_bai_live_trac_nghiem = function () {
    Swal.fire({
        title: 'Xác nhận nộp bài?',
        text: "Em có chắc chắn muốn chốt điểm và nộp bài lúc này không?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: '🚀 NỘP LUÔN',
        cancelButtonText: 'Làm tiếp'
    }).then(async (result) => {
        if (result.isConfirmed) {
            Swal.fire({ title: 'Đang chốt hạ...', didOpen: () => Swal.showLoading() });
            try {
                // 1. Lấy điểm số hiện tại trên màn hình
                let diemSo = 0;
                const hud = document.getElementById('diem-hien-tai-hs');
                if (hud) diemSo = parseFloat(hud.innerText) || 0;

                // 2. Chốt cờ "da_nop" trên Supabase
                if (window.ThongTinLiveHocSinh && window.ThongTinLiveHocSinh.maPhong) {
                    await _supabase.from('tien_do_live_quiz')
                        .update({ da_nop: true })
                        .eq('ma_phong', window.ThongTinLiveHocSinh.maPhong)
                        .eq('uid_hoc_sinh', GocHocSinhState.uid);
                }

                // 3. Dừng đồng hồ Đấu trường
                if (window.PhienLamBai && window.PhienLamBai.id_timer) {
                    clearInterval(window.PhienLamBai.id_timer);
                }

                Swal.close();

                // 4. Gọi mượt mà sang Màn hình chờ (Hàm 8.6.6)
                ham_8_6_6_man_hinh_ket_qua_cho(diemSo);

            } catch (e) {
                Swal.fire('Lỗi', 'Lỗi đường truyền: ' + e.message, 'error');
            }
        }
    });
};
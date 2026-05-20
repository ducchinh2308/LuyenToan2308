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
// 2. Hàm Vào phòng & Đồng bộ Master Time
// =====================================================================
window.ham_8_6_1_vao_phong = async function () {
    const maPin = document.getElementById('txtPinLive').value.trim();
    if (!maPin) return Swal.fire('Nhắc', 'Nhập mã PIN!', 'warning');
    Swal.fire({ title: 'Đang kết nối...', didOpen: () => Swal.showLoading() });

    try {
        const { data: phong } = await _supabase.from('phong_live_quiz').select('*').eq('ma_phong', maPin).maybeSingle();
        if (!phong) throw new Error("Mã PIN không đúng!");
        if (phong.trang_thai === 2) throw new Error("Đấu trường đã đóng!");

        window.ThongTinLiveHocSinh.maPhong = maPin;
        window.ThongTinLiveHocSinh.maNhiemVu = phong.ma_nhiem_vu;

        await _supabase.from('tien_do_live_quiz').upsert({ ma_phong: maPin, uid_hoc_sinh: GocHocSinhState.uid, ten_hoc_sinh: GocHocSinhState.ten }, { onConflict: 'ma_phong,uid_hoc_sinh' });

        Swal.close();
        if (phong.trang_thai === 0) ham_8_6_2_phong_cho_live();
        else if (phong.trang_thai === 1) ham_8_6_bat_dau_thi_ngay(phong);
    } catch (e) { Swal.fire('Lỗi', e.message, 'error'); }
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










// 3. Khởi tạo bài thi & Đồng bộ thời gian
window.ham_8_6_3_bat_dau_lam_bai_live = async function () {
    try {
        Swal.fire({ title: '⏳ Đang nạp đề thi Live...', didOpen: () => Swal.showLoading() });
        const { data: nv } = await _supabase.from('nhiem_vu').select('*').eq('ma_nhiem_vu', window.ThongTinLiveHocSinh.maNhiemVu).single();

        window.DangKhoiTaoLiveQuiz = true;

        // Ghi đè thời gian đếm ngược bằng Master Time
        if (window.ThongTinLiveHocSinh.thoiGianDong) {
            const giayConLai = Math.floor((window.ThongTinLiveHocSinh.thoiGianDong.getTime() - Date.now()) / 1000);

            // 🌟 Sửa tại đây: Giữ lại 2 chữ số thập phân (Ví dụ: 45.33)
            nv.thoi_gian_lam_bai = giayConLai > 0 ? Number((giayConLai / 60).toFixed(2)) : 0;
        }

        await ham_8_8_khoi_tao_phong_thi(nv); // Gọi hàm gốc

        // Sau khi vẽ đề xong, MỞ CƠ CHẾ PHỤC HỒI
        await ham_8_6_5_khoi_phuc_dap_an_da_nop();

    } catch (e) { Swal.fire('Lỗi nạp đề', e.message, 'error'); }
};

//window.ham_8_6_4_nop_tung_cau = async function (maCau, kieuCau, dapAnDungChuoi) {
//    const phien = window.PhienLamBai;
//    const dapanHS = phien.dap_an_hoc_sinh[maCau];

//    if (!dapanHS || (kieuCau === 'DS' && Object.keys(dapanHS).length === 0)) {
//        return Swal.fire('Nhắc nhở', 'Em chưa chọn đáp án cho câu hỏi này!', 'warning');
//    }

//    // Đóng gói chuỗi
//    let chuoiDapAnGoi = (kieuCau === 'DS') ? ['A', 'B', 'C', 'D'].map(k => dapanHS[k] || "_").join('') : String(dapanHS).trim();

//    // KHÓA GIAO DIỆN NGAY LẬP TỨC
//    const btn = document.getElementById(`btn-live-${maCau}`);
//    if (btn) { btn.disabled = true; btn.innerText = "⏳ ĐANG LƯU..."; btn.style.background = "#7f8c8d"; }
//    const khoiCau = document.getElementById(`cau-${maCau}`);
//    if (khoiCau) khoiCau.querySelectorAll('input').forEach(i => i.disabled = true);

//    try {
//        // GỌI RPC SERVER
//        const { data: diemMoiNhat, error } = await _supabase.rpc('cham_diem_mot_cau', {
//            p_ma_phong: window.ThongTinLiveHocSinh.maPhong,
//            p_uid: GocHocSinhState.uid,
//            p_ma_cau: maCau,
//            p_dap_an_chon: chuoiDapAnGoi,
//            p_diem_cau: 1 // Thầy sửa logic điểm ở đây nếu cần
//        });
//        if (error) throw error;

//        // CẬP NHẬT ĐIỂM LÊN HUD (KÈM HIỆU ỨNG NHẢY SỐ)
//        const hudDiem = document.getElementById('diem-hien-tai-hs');
//        if (hudDiem) {
//            hudDiem.innerText = Number(diemMoiNhat).toFixed(2);
//            hudDiem.style.color = "#f1c40f"; // Đổi màu vàng khi điểm tăng
//            setTimeout(() => { hudDiem.style.color = "white"; }, 500);
//        }

//        // Chốt nút ĐÃ KHÓA
//        if (btn) { btn.innerText = "✅ ĐÃ GỬI"; btn.style.background = "#95a5a6"; }

//    } catch (e) {
//        if (btn) { btn.disabled = false; btn.innerText = "🚀 THỬ LẠI"; btn.style.background = "#e74c3c"; }
//        if (khoiCau) khoiCau.querySelectorAll('input').forEach(i => i.disabled = false);
//        Swal.fire('Lỗi', 'Không kết nối được server!', 'error');
//    }
//};



// =====================================================================
// 4. Hàm Nộp từng câu lên Server để chấm điểm (BẢN TÍNH ĐIỂM ĐỘNG THEO TRỌNG SỐ)
// =====================================================================
window.ham_8_6_4_nop_tung_cau = async function (maCau, kieuCau) {
    const phien = window.PhienLamBai;

    // 1. TRÍCH XUẤT DỮ LIỆU CÂU HỎI
    const cauHoiGoc = phien.danh_sach_cau_hoi.find(c => (c.ma_cau_hoi === maCau || c.maCau === maCau));
    if (!cauHoiGoc) return Swal.fire('Lỗi', 'Không tìm thấy dữ liệu gốc của câu hỏi này!', 'error');

    const dapAnChuan = (cauHoiGoc.dap_an || cauHoiGoc.dapAn || cauHoiGoc.dap_an_dung || "").trim();

    // =================================================================
    // 🌟 BƯỚC 2: TÍNH TOÁN ĐIỂM TỐI ĐA ĐỘNG DỰA TRÊN TRỌNG SỐ ĐỀ THỰC TẾ
    // =================================================================
    let soCauTN = 0, soCauDS = 0, soCauTLN = 0;

    // Quét một vòng toàn bộ đề thi để đếm số lượng mỗi loại câu
    phien.danh_sach_cau_hoi.forEach(c => {
        let loai = (c.kieuCau || c.loaiCau || "TN").toUpperCase();
        if (loai === 'TN') soCauTN++;
        else if (loai === 'DS') soCauDS++;
        else if (loai === 'TLN') soCauTLN++;
    });

    // Áp dụng công thức trọng số (TN: 1, TLN: 2, DS: 4) chuẩn Toán 2025
    let tongTrongSo = (soCauTN * 1.0) + (soCauTLN * 2.0) + (soCauDS * 4.0);
    if (tongTrongSo === 0) tongTrongSo = 1; // Đề phòng lỗi chia cho 0

    // Tính điểm tối đa cho câu hỏi hiện tại đang nộp
    let diemToiDa = 0;
    if (kieuCau === 'TN') {
        diemToiDa = (10.0 * 1.0) / tongTrongSo;
    } else if (kieuCau === 'DS') {
        diemToiDa = (10.0 * 4.0) / tongTrongSo;
    } else if (kieuCau === 'TLN') {
        diemToiDa = (10.0 * 2.0) / tongTrongSo;
    }

    // 3. ĐÓNG GÓI ĐÁP ÁN HỌC SINH (VÁ LỖI KEY ĐÚNG/SAI)
    const dapanHS = phien.dap_an_hoc_sinh[maCau];
    if (!dapanHS || (kieuCau === 'DS' && Object.keys(dapanHS).length === 0)) {
        return Swal.fire('Nhắc nhở', 'Em chưa chọn đủ đáp án cho câu hỏi này!', 'warning');
    }

    let chuoiDapAnGoi = "";
    if (kieuCau === 'DS') {
        chuoiDapAnGoi = ['a', 'b', 'c', 'd'].map(k => {
            return dapanHS[k] || dapanHS[k.toUpperCase()] || "_";
        }).join('');
    } else {
        chuoiDapAnGoi = String(dapanHS).trim().toUpperCase();
    }

    console.log(`🚀 [NỘP CÂU ${maCau}] Kiểu: ${kieuCau} | Điểm tối đa: ${diemToiDa}`);
    console.log(`👉 Lựa chọn: "${chuoiDapAnGoi}" | Đáp án tham khảo: "${dapAnChuan}"`);

    // KHÓA GIAO DIỆN CHỜ XỬ LÝ
    const btn = document.getElementById(`btn-live-${maCau}`);
    if (btn) { btn.disabled = true; btn.innerText = "⏳ ĐANG LƯU..."; btn.style.background = "#7f8c8d"; }
    const khoiCau = document.getElementById(`cau-${maCau}`);
    if (khoiCau) khoiCau.querySelectorAll('input').forEach(i => i.disabled = true);

    try {
        // GỌI RPC SERVER
        const { data: ketQuaTraVe, error } = await _supabase.rpc('cham_diem_mot_cau', {
            p_ma_phong: window.ThongTinLiveHocSinh.maPhong,
            p_uid: GocHocSinhState.uid,
            p_ma_cau: maCau,
            p_dap_an_chon: chuoiDapAnGoi,
            p_dap_an_dung: dapAnChuan,
            p_kieu_cau: kieuCau,
            p_diem_toi_da: diemToiDa
        });

        if (error) throw error;

        // 1. XỬ LÝ ĐIỂM VÀ ĐỔI MÀU NÚT BẤM TÙY THEO LOẠI CÂU
        const diemCauNay = Number(ketQuaTraVe.diem_cau_nay);
        const soYDung = Number(ketQuaTraVe.so_y_dung || 0);

        if (btn) {
            // 🌟 NẾU LÀ CÂU ĐÚNG/SAI: Báo chi tiết số ý
            if (kieuCau === 'DS') {
                if (diemCauNay > 0) {
                    btn.innerText = `✅ ĐÚNG ${soYDung}/4 Ý (+${diemCauNay.toFixed(2)})`;
                    btn.style.background = "#27ae60"; // Màu xanh lá
                } else {
                    btn.innerText = `❌ ĐÚNG ${soYDung}/4 Ý (0 ĐIỂM)`;
                    btn.style.background = "#c0392b"; // Màu đỏ
                }
            }
            // 🌟 NẾU LÀ CÂU TN HOẶC TLN: Chỉ báo Đúng/Sai thông thường
            else {
                if (diemCauNay > 0) {
                    btn.innerText = `✅ ĐÚNG (+${diemCauNay.toFixed(2)})`;
                    btn.style.background = "#27ae60";
                } else {
                    btn.innerText = `❌ SAI (0 ĐIỂM)`;
                    btn.style.background = "#c0392b";
                }
            }
        }

        // 2. CẬP NHẬT TỔNG ĐIỂM LÊN HUD
        const tongDiemCapNhat = Number(ketQuaTraVe.tong_diem);
        const hudDiem = document.getElementById('diem-hien-tai-hs');
        if (hudDiem) {
            hudDiem.innerText = tongDiemCapNhat.toFixed(2);
            hudDiem.style.color = "#f1c40f";
            setTimeout(() => { hudDiem.style.color = "white"; }, 500);
        }
    } catch (e) {
        if (btn) { btn.disabled = false; btn.innerText = "🚀 THỬ LẠI"; btn.style.background = "#e74c3c"; }
        if (khoiCau) khoiCau.querySelectorAll('input').forEach(i => i.disabled = false);
        Swal.fire('Lỗi', 'Không kết nối được server! Vui lòng thử lại.', 'error');
        console.error("LỖI CHẤM ĐIỂM:", e);
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
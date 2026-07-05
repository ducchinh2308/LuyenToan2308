

// ==============================================================================
// KHỐI 16: BỘ MÁY LƯU NHÁP & AUTO-SAVE TRẮC NGHIỆM (3 TẦNG) - BẢN FINAL
// ==============================================================================

window.AutoSaveState = {
    maNhiemVuDangThi: null,
    chuKyDongBo: null,
    duLieuDaDongBo: '{}'
};

// ---------------------------------------------------------------------
// Hàm 16.1: Lưu đáp án vào Trình duyệt (Tầng 1) 
// ---------------------------------------------------------------------
window.ham_16_1_luu_local_storage = function (maNhiemVu, maCauHoi, dapAnHocSinh) {
    // 🌟 Đã sửa AppState thành GocHocSinhState
    const key = `nhap_trac_nghiem_${GocHocSinhState.uid}_${maNhiemVu}`;

    let dataNhap = localStorage.getItem(key);
    let dictNhap = dataNhap ? JSON.parse(dataNhap) : {};

    dictNhap[maCauHoi] = dapAnHocSinh;
    localStorage.setItem(key, JSON.stringify(dictNhap));

    const lblSync = document.getElementById('trang-thai-dong-bo');
    if (lblSync) lblSync.innerHTML = "☁️ Đã lưu tạm vào máy";
};

// ---------------------------------------------------------------------
// Hàm 16.2: Đồng bộ ngầm lên Supabase (Tầng 2)
// ---------------------------------------------------------------------
window.ham_16_2_dong_bo_supabase = async function () {
    const maNV = window.AutoSaveState.maNhiemVuDangThi;
    if (!maNV) return;

    // 🌟 Đã sửa AppState thành GocHocSinhState
    const key = `nhap_trac_nghiem_${GocHocSinhState.uid}_${maNV}`;
    const dataLocal = localStorage.getItem(key);

    if (!dataLocal || dataLocal === window.AutoSaveState.duLieuDaDongBo) return;

    try {
        const dictLocal = JSON.parse(dataLocal);
        let mangChiTiet = Object.keys(dictLocal).map(maCau => ({
            maCau: maCau,
            luaChonHS: dictLocal[maCau],
            ketQua: "Đang làm",
            diem: 0
        }));

        const { error } = await _supabase.from('ket_qua_trac_nghiem')
            .update({ chi_tiet_lam_bai: mangChiTiet })
            .eq('uid_hoc_sinh', GocHocSinhState.uid)
            .eq('ma_nhiem_vu', maNV)
            .eq('trang_thai_lam_bai', 'dang_lam');

        if (!error) {
            window.AutoSaveState.duLieuDaDongBo = dataLocal;
            const lblSync = document.getElementById('trang-thai-dong-bo');
            if (lblSync) lblSync.innerHTML = `✅ Đã lưu mạng lúc ${new Date().toLocaleTimeString('vi-VN')}`;
        }
    } catch (e) {
        console.warn("Lỗi đồng bộ ngầm: ", e);
    }
};

// ---------------------------------------------------------------------
// Hàm 16.3: Khởi động bộ máy khi Bắt đầu làm bài
// ---------------------------------------------------------------------
window.ham_16_3_khoi_dong_auto_save = function (maNhiemVu) {
    window.AutoSaveState.maNhiemVuDangThi = maNhiemVu;
    window.AutoSaveState.duLieuDaDongBo = '{}';

    const chuKyGiay = (window.AppConfig && window.AppConfig.AUTO_SAVE_INTERVAL) ? parseInt(window.AppConfig.AUTO_SAVE_INTERVAL) : 60;

    if (window.AutoSaveState.chuKyDongBo) clearInterval(window.AutoSaveState.chuKyDongBo);
    window.AutoSaveState.chuKyDongBo = setInterval(ham_16_2_dong_bo_supabase, chuKyGiay * 1000);
};

// ---------------------------------------------------------------------
// Hàm 16.4: Dừng bộ máy & Dọn dẹp rác khi Nộp bài thành công
// ---------------------------------------------------------------------
window.ham_16_4_don_dep_sau_khi_nop = function (maNhiemVu) {
    if (window.AutoSaveState.chuKyDongBo) clearInterval(window.AutoSaveState.chuKyDongBo);

    // 🌟 Đã sửa AppState thành GocHocSinhState
    const key = `nhap_trac_nghiem_${GocHocSinhState.uid}_${maNhiemVu}`;
    localStorage.removeItem(key);

    window.AutoSaveState.maNhiemVuDangThi = null;
};

// ---------------------------------------------------------------------
// Hàm 16.6: Quét và tự động Tick lại đáp án lên màn hình (Khôi phục)
// ---------------------------------------------------------------------
window.ham_16_6_khoi_phuc_giao_dien = function (maNhiemVu) {
    // 🌟 Đã sửa AppState thành GocHocSinhState
    const key = `nhap_trac_nghiem_${GocHocSinhState.uid}_${maNhiemVu}`;
    const dataLocal = localStorage.getItem(key);

    if (!dataLocal) {
        console.log("[RESTORE] Trình duyệt chưa có dữ liệu tạm.");
        return;
    }

    try {
        const dict = JSON.parse(dataLocal);
        let soCauDaKhoiPhuc = 0;

        for (let maCau in dict) {
            let dapAn = dict[maCau];

            if (typeof dapAn === 'object') {
                // 1. Phục hồi Câu ĐÚNG/SAI
                for (let pa in dapAn) {
                    let val = dapAn[pa];
                    let radios = document.querySelectorAll(`input[name="ds_${maCau}_${pa}"][value="${val}"]`);
                    if (radios.length > 0) {
                        radios[0].checked = true;
                        if (typeof ham_8_26_luuDapAnDS === 'function') {
                            ham_8_26_luuDapAnDS(maCau, pa, val, radios[0]);
                        }
                    }
                }
                soCauDaKhoiPhuc++;
            } else {
                // 2. Phục hồi Câu TRẮC NGHIỆM THƯỜNG
                let radios = document.querySelectorAll(`input[name="dapan_${maCau}"][value="${dapAn}"]`);
                if (radios.length > 0) {
                    radios[0].checked = true;
                    if (typeof ham_8_25_luuDapAn === 'function') {
                        ham_8_25_luuDapAn(maCau, dapAn, radios[0]);
                    }
                    soCauDaKhoiPhuc++;
                } else {
                    // 3. Phục hồi Câu TRẢ LỜI NGẮN (Điền ô vuông)
                    let tlnInputs = document.querySelectorAll(`#cau-${maCau} .tln-inputs input`);
                    if (tlnInputs.length > 0) {
                        for (let i = 0; i < 4; i++) {
                            if (dapAn[i] !== undefined) tlnInputs[i].value = dapAn[i];
                        }
                        // Gửi tín hiệu để tô màu menu bên trái
                        if (typeof ham_8_25_luuDapAn === 'function') {
                            ham_8_25_luuDapAn(maCau, dapAn, tlnInputs[0]);
                        }
                        soCauDaKhoiPhuc++;
                    }
                }
            }
        }

        if (soCauDaKhoiPhuc > 0) {
            const lblSync = document.getElementById('trang-thai-dong-bo');
            if (lblSync) lblSync.innerHTML = `🔄 Đã khôi phục ${soCauDaKhoiPhuc} câu`;
        }
    } catch (e) { console.warn("Lỗi khôi phục UI:", e); }
};

// ---------------------------------------------------------------------
// Hàm 16.7: Lưu tạm thủ công (Tầng 3)
// ---------------------------------------------------------------------
window.ham_16_7_luu_tam_thu_cong = async function (btnElement) {
    const maNV = window.AutoSaveState.maNhiemVuDangThi;
    if (!maNV) {
        alert("⚠️ Lỗi: Hệ thống lưu nháp chưa nhận diện được mã nhiệm vụ!");
        return;
    }

    const oldText = btnElement.innerHTML;
    btnElement.innerHTML = "⏳ Đang lưu...";
    btnElement.disabled = true;

    // 🌟 Đã sửa AppState thành GocHocSinhState
    const key = `nhap_trac_nghiem_${GocHocSinhState.uid}_${maNV}`;
    const dataLocal = localStorage.getItem(key);

    try {
        let mangChiTiet = [];
        if (dataLocal) {
            const dictLocal = JSON.parse(dataLocal);
            mangChiTiet = Object.keys(dictLocal).map(maCau => ({
                maCau: maCau,
                luaChonHS: dictLocal[maCau],
                ketQua: "Đang làm",
                diem: 0
            }));
        }

        const { error } = await _supabase.from('ket_qua_trac_nghiem')
            .update({ chi_tiet_lam_bai: mangChiTiet })
            .eq('uid_hoc_sinh', GocHocSinhState.uid) // 🌟
            .eq('ma_nhiem_vu', maNV)
            .eq('trang_thai_lam_bai', 'dang_lam');

        if (error) throw error;

        if (dataLocal) window.AutoSaveState.duLieuDaDongBo = dataLocal;

        const lblSync = document.getElementById('trang-thai-dong-bo');
        if (lblSync) lblSync.innerHTML = `✅ Đã lưu bằng tay lúc ${new Date().toLocaleTimeString('vi-VN')}`;

        const thongBao = document.createElement('div');
        thongBao.innerHTML = `✅ Đã lưu bài an toàn lên máy chủ!`;
        thongBao.style.cssText = "position:fixed; top:20px; left:50%; transform:translateX(-50%); background:#28a745; color:white; padding:10px 20px; border-radius:50px; font-weight:bold; box-shadow:0 4px 15px rgba(0,0,0,0.2); z-index:999999; animation: fadeup 0.3s;";
        document.body.appendChild(thongBao);
        setTimeout(() => document.body.removeChild(thongBao), 2500);

    } catch (e) {
        console.warn("Lỗi lưu thủ công: ", e);
        alert("⚠️ Lỗi mạng: Không thể kết nối với máy chủ lúc này. Em hãy chờ có mạng rồi bấm lại nhé!");
    } finally {
        btnElement.innerHTML = oldText;
        btnElement.disabled = false;
    }
};
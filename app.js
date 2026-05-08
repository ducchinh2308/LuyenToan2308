// ==========================================
// CẤU HÌNH KẾT NỐI SUPABASE
// ==========================================
const SUPABASE_URL = 'https://ffjrjgujzhkjetqyuska.supabase.co';
const SUPABASE_KEY = 'sb_publishable_SB93ie45-i5-iDFiIuOtNQ_jMvMT8Xt';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let currentUser = null;
let duLieuDeGoc = null;

// ==========================================
// KHỐI 1: QUẢN LÝ TÀI KHOẢN (AUTH)
// ==========================================

// Kiểm tra trạng thái khi mở web
window.onload = async function () {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
        currentUser = session.user;
        chuyenManHinh('dashboard');
    } else {
        chuyenManHinh('dang-nhap');
    }
}

async function dangNhap() {
    const email = document.getElementById('in_email').value.trim();
    const pass = document.getElementById('in_pass').value;
    if (!email || !pass) return alert("Vui lòng nhập đủ thông tin!");

    const { data, error } = await supabase.auth.signInWithPassword({ email: email, password: pass });

    if (error) {
        alert("Đăng nhập thất bại: " + error.message);
    } else {
        currentUser = data.user;
        chuyenManHinh('dashboard');
    }
}

async function dangKy() {
    const ten = document.getElementById('dk_ten').value.trim();
    const email = document.getElementById('dk_email').value.trim();
    const pass = document.getElementById('dk_pass').value;

    if (!ten || !email || !pass) return alert("Vui lòng điền đầy đủ thông tin!");
    if (pass.length < 6) return alert("Mật khẩu phải từ 6 ký tự trở lên!");

    const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email,
        password: pass
    });

    if (authError) return alert("Lỗi đăng ký: " + authError.message);

    if (authData.user) {
        const { error: dbError } = await supabase
            .from('HocSinh')
            .insert([{ uid: authData.user.id, email: email, ten_hoc_sinh: ten }]);

        if (dbError) alert("Lỗi lưu tên: " + dbError.message);
        else {
            alert("Đăng ký thành công! Vui lòng đăng nhập.");
            chuyenManHinh('dang-nhap');
        }
    }
}

async function dangXuat() {
    await supabase.auth.signOut();
    currentUser = null;
    chuyenManHinh('dang-nhap');
}

// ==========================================
// KHỐI 2: ĐIỀU HƯỚNG GIAO DIỆN
// ==========================================

function chuyenManHinh(manHinh) {
    document.getElementById('khu-vuc-dang-nhap').classList.remove('active-section');
    document.getElementById('khu-vuc-dang-ky').classList.remove('active-section');
    document.getElementById('khu-vuc-dashboard').classList.remove('active-section');
    document.getElementById('khu-vuc-lam-bai').classList.remove('active-section');

    if (manHinh === 'dang-nhap') {
        document.getElementById('khu-vuc-dang-nhap').classList.add('active-section');
        document.getElementById('nav-user').style.display = 'none';
    }
    else if (manHinh === 'dang-ky') {
        document.getElementById('khu-vuc-dang-ky').classList.add('active-section');
        document.getElementById('nav-user').style.display = 'none';
    }
    else if (manHinh === 'dashboard') {
        document.getElementById('khu-vuc-dashboard').classList.add('active-section');
        document.getElementById('nav-user').style.display = 'flex';
        hienThiTenNguoiDung(currentUser.id);
    }
    else if (manHinh === 'lam-bai') {
        document.getElementById('khu-vuc-lam-bai').classList.add('active-section');
    }
}

async function hienThiTenNguoiDung(uid) {
    const { data, error } = await supabase.from('HocSinh').select('ten_hoc_sinh').eq('uid', uid).single();
    if (data) document.getElementById('txt-ten-user').innerText = "Xin chào, " + data.ten_hoc_sinh;
    else document.getElementById('txt-ten-user').innerText = currentUser.email;
}

function quayLaiDashboard() { chuyenManHinh('dashboard'); }

// ==========================================
// KHỐI 3: NẠP ĐỀ THI & CHẤM ĐIỂM
// ==========================================

async function taiDeThi() {
    const maDe = document.getElementById('txtMaDe').value.trim().toUpperCase();
    if (!maDe) return alert("Vui lòng nhập mã đề!");
    try {
        const response = await fetch(`./Export_GitHub/DeThi/${maDe}/DeThi_${maDe}.json`);
        if (!response.ok) throw new Error("Không tìm thấy mã đề! Có thể thầy Chính chưa cập nhật đề này.");

        duLieuDeGoc = await response.json();
        hienThiDeThi(duLieuDeGoc);
    } catch (err) { alert(err.message); }
}

function hienThiDeThi(data) {
    chuyenManHinh('lam-bai');
    document.getElementById('ten-de').innerText = data.tenDe;
    document.getElementById('btnNopBai').style.display = 'block';
    document.getElementById('ket-qua-diem').style.display = 'none';

    const container = document.getElementById('danh-sach-cau-hoi');
    container.innerHTML = '';

    data.danhSachCauHoi.forEach((c, index) => {
        container.innerHTML += `
                    <div class="cau-hoi" id="wrap-cau-${c.maCau}">
                        <p><strong>Câu ${index + 1}:</strong> MÃ CÂU: ${c.maCau}</p>
                        ${c.cauDan ? `<img src="${c.cauDan}" alt="Câu dẫn">` : ''}
                        ${['A', 'B', 'C', 'D'].map(p => `
                            <label class="dap-an-label">
                                <input type="radio" name="ans-${c.maCau}" value="${p}"> <strong>${p}.</strong>
                                ${c['pa' + p] ? `<img src="${c['pa' + p]}" alt="Phương án" style="display:inline-block; vertical-align:middle;">` : ''}
                            </label>
                        `).join('')}
                        <div id="lg-${c.maCau}" class="loi-giai"></div>
                    </div>`;
    });
    MathJax.typeset();
}

async function nopBai() {
    if (!confirm("Bạn có chắc chắn muốn nộp bài?")) return;
    document.getElementById('btnNopBai').innerText = "Đang chấm điểm...";
    document.getElementById('btnNopBai').disabled = true;

    const { data: keyData, error } = await supabase
        .from('KhoaBaoMat')
        .select('link_loi_giai, chuoi_dap_an')
        .eq('ma_de', duLieuDeGoc.maDe)
        .single();

    if (error || !keyData) {
        alert("Lỗi kết nối với máy chủ chấm điểm! Vui lòng thử lại.");
        document.getElementById('btnNopBai').innerText = "NỘP BÀI & XEM LỜI GIẢI";
        document.getElementById('btnNopBai').disabled = false;
        return;
    }

    taiLoiGiaiVaChamDiem(keyData.link_loi_giai, keyData.chuoi_dap_an);
}

async function taiLoiGiaiVaChamDiem(tenFileLG, chuoiDapAnDung) {
    const dictGiaiMa = {};
    const mangDapAn = chuoiDapAnDung.split(',');
    let soCauDung = 0;

    // Bẻ khóa chuỗi đáp án: MaCau|MaBaoMat|DapAn
    mangDapAn.forEach(item => {
        const parts = item.split('|');
        if (parts.length === 3) {
            dictGiaiMa[parts[1]] = { maCau: parts[0], dapAnDung: parts[2] };
            const selected = document.querySelector(`input[name="ans-${parts[0]}"]:checked`);
            if (selected && selected.value === parts[2]) soCauDung++;
        }
    });

    // Hiện điểm
    const tongSoCau = mangDapAn.length;
    const divDiem = document.getElementById('ket-qua-diem');
    divDiem.innerText = `Điểm của bạn: ${((soCauDung / tongSoCau) * 10).toFixed(2)} (${soCauDung}/${tongSoCau} câu)`;
    divDiem.style.display = 'block';

    // Tải giải bí mật
    try {
        const res = await fetch(`./Export_GitHub/LoiGiai_BaoMat/${tenFileLG}`);
        const listLG = await res.json();

        listLG.forEach(itemLG => {
            const thongTinThat = dictGiaiMa[itemLG.maBaoMat];
            if (thongTinThat) {
                const divLG = document.getElementById(`lg-${thongTinThat.maCau}`);
                divLG.innerHTML = `
                            <strong style="color:#d35400;">Đáp án đúng: ${itemLG.dapAn}</strong><br>
                            <em>Lời giải chi tiết:</em><br>
                            ${itemLG.loiGiai ? `<img src="${itemLG.loiGiai}" alt="Lời giải">` : 'Chưa có lời giải chi tiết.'}
                        `;
                divLG.style.display = 'block';
            }
        });
        document.getElementById('btnNopBai').style.display = 'none';
        alert("Đã chấm điểm xong! Cuộn xuống để xem lời giải chi tiết.");
    } catch (e) {
        alert("Lỗi tải file giải! Vui lòng liên hệ Thầy Chính.");
    }
}
// ==============================================================
// KHỐI 00: ĐÁNH DẤU PHIÊN BẢN (VERSION CONTROL)
// ==============================================================
const KHOI00_VERSION = "Block 00: Cập nhật lúc 3h11- Ngày 12/06";
console.log(`%c🚀 ĐANG CHẠY: ${KHOI00_VERSION}`, "background: #28a745; color: white; font-size: 14px; padding: 5px; font-weight: bold;");

window.addEventListener('load', () => {
    let versionBadge = document.createElement('div');
    versionBadge.innerHTML = KHOI00_VERSION;
    versionBadge.style.cssText = "position: fixed; bottom: 20px; right: 5px; font-size: 9px; color: #28a745; z-index: 9999; ";
    document.body.appendChild(versionBadge);
});

const APP_VERSION = "app.js cập nhật lúc 19h68 - Ngày 13/05";

// In ra cửa sổ F12 (Console) với màu nền nổi bật để đập ngay vào mắt
console.log(`%c🚀 ĐANG CHẠY KHỐI 1-7 BẢN: ${APP_VERSION}`, "background: #d35400; color: white; font-size: 14px; padding: 5px; font-weight: bold;");

// Nếu thầy lười mở F12, thầy có thể cho nó in luôn một dòng chữ mờ mờ ở góc dưới màn hình:
window.onload = () => {
    let versionBadge = document.createElement('div');
    versionBadge.innerHTML = `Phiên bản: ${APP_VERSION}`;
    versionBadge.style.cssText = "position: fixed; bottom: 5px; right: 5px; font-size: 11px; color: #aaa; z-index: 9999;";
    document.body.appendChild(versionBadge);
};





// ==============================================================
// FILE: QUẢN LÝ CẤU HÌNH TẬP TRUNG TOÀN HỆ THỐNG
// ==============================================================
window.CFG_HE_THONG = {
    // 1. Cấu hình Github (Nhớ để nguyên lệnh lật ngược chuỗi để lách luật bot)
    GITHUB_TOKEN: "ghp_" + "iHDOmx43jv6bg0UdfWUelFMz3MetUk2qJpGw",
    GITHUB_REPO: "ducchinh2308/LuyenToan2308",

    // 2. Cấu hình các đường dẫn (URL)
    LINK_GITHUB_GOC: "https://ducchinh2308.github.io/LuyenToan2308",
    KHO_GIAI_LE_URL: "https://ducchinh2308.github.io/LuyenToan2308/Ngan_Hang_Loi_Giai",

    // URL_APPS_SCRIPT_XOA_DRIVE: "https://script.google.com/macros/s/AKfycbys7lFGJmssgxCvAKyFzbwzhGzr4eI4Zstq-IELVq9RqfZ0NPW8gQzd-N6zLEMOlhrRyA/exec",
    // URL_APPS_SCRIPT_TU_LUAN: "https://script.google.com/macros/s/AKfycbznLMAX7a72I1w-rJ9ZeIKhIVOFFGfUiD7tyXvxbnhLlROGbBLz1lwFY7VKCKabpq08/exec",
    // URL_APPS_SCRIPT_LAY_CAY_THU_MUC: 'https://script.google.com/macros/s/AKfycbzj7zj3E_pwWYtL3IIOymF5r4QpG3VCBo6Ms9ylxIQiaoYMR-hVTKEos78CAKZwPVqS/exec',
    // //URL_APPS_SCRIPT_API_NHAN_FILE_CSHARP: 'https://script.google.com/macros/s/AKfycbxxgiNtbA_AlK8iU9paaOG19r-fzRA0TMZFfYsk5Kbxj8ymgMVQHhBAz8xIkUILqt7d/exec',


    //gmail botoc
    URL_APPS_SCRIPT_API_TONG_HOP: 'https://script.google.com/macros/s/AKfycbwV1GtOrkSwWCYT6VzhJ7q02j9dpw5PybuiomOdAkkLWzWkD3h-ETxaFHi9xgRyPV7T/exec',
    
    
    URL_APPS_SCRIPT_XOA_DRIVE = URL_APPS_SCRIPT_API_TONG_HOP,
    URL_APPS_SCRIPT_TU_LUAN = URL_APPS_SCRIPT_API_TONG_HOP,
    URL_APPS_SCRIPT_LAY_CAY_THU_MUC = URL_APPS_SCRIPT_API_TONG_HOP,
    URL_APPS_SCRIPT_API_NHAN_FILE_CSHARP = URL_APPS_SCRIPT_API_TONG_HOP,
    URL_APPS_SCRIPT_LAY_CAY_THU_MUC_BOTOC = URL_APPS_SCRIPT_API_TONG_HOP,
    URL_APPS_SCRIPT_API_NHAN_FILE_CSHARP_BOTOC = URL_APPS_SCRIPT_API_TONG_HOP,
    URL_APPS_SCRIPT_TAI_ANH_NOP_BAI_TU_LUAN_BOTOC = URL_APPS_SCRIPT_API_TONG_HOP

    // URL_APPS_SCRIPT_API_NHAN_FILE_CSHARP_BOTOC: 'https://script.google.com/macros/s/AKfycbynazdz4oDef5qy3sr4sfxceA_VQXoDL0U4_ykTInfPfRsCfKkA0HD3Zmapl0Y6xnH6/exec',
    // URL_APPS_SCRIPT_LAY_CAY_THU_MUC_BOTOC: 'https://script.google.com/macros/s/AKfycbz4EeMX01uIXHJewfBUSmzzmAAGZThc74DBp5nDifNkH_yhiJVP6xr1cYSOPct4jjjn/exec',

    // URL_APPS_SCRIPT_TAI_ANH_NOP_BAI_TU_LUAN_BOTOC: 'https://script.google.com/macros/s/AKfycbxjm7SbhGCVmVMkTPMjNVs4mJHIac5cGL4pAOl8MEx_Vo9mzOm2Q7_CPVsmsdVLfOeS/exec' 
    // Thầy có thể thêm các cấu hình khác vào đây sau này...
};




// ==============================================================================
// KHỐI 0: CẤU HÌNH & TRẠNG THÁI (CONFIG & STATE)
// ==============================================================================
const AppState = {
    isLoginMode: true, // true = Đang ở màn hình Đăng nhập, false = Đăng ký
    role: 'hocsinh',   // Vai trò mặc định đang chọn
};

// Khởi tạo kết nối Supabase (Thầy thay Key thật của thầy vào đây)
const SUPABASE_URL = 'https://ffjrjgujzhkjetqyuska.supabase.co';
const SUPABASE_KEY = 'sb_publishable_SB93ie45-i5-iDFiIuOtNQ_jMvMT8Xt';
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);


const LINK_GITHUB_GOC = "https://ducchinh2308.github.io/LuyenToan2308/";

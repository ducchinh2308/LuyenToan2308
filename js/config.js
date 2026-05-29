// ==============================================================
// KHỐI 10: ĐÁNH DẤU PHIÊN BẢN (VERSION CONTROL)
// ==============================================================
const KHOI10_VERSION = "Khối 10: Cập nhật lúc 3h- Ngày 18/05";
console.log(`%c🚀 ĐANG CHẠY: ${KHOI10_VERSION}`, "background: #28a745; color: white; font-size: 14px; padding: 5px; font-weight: bold;");

window.addEventListener('load', () => {
    let versionBadge = document.createElement('div');
    versionBadge.innerHTML = KHOI10_VERSION;
    versionBadge.style.cssText = "position: fixed; bottom: 20px; right: 5px; font-size: 9px; color: #28a745; z-index: 9999; ";
    document.body.appendChild(versionBadge);
});




// ==============================================================
// FILE: config.js - QUẢN LÝ CẤU HÌNH TẬP TRUNG TOÀN HỆ THỐNG
// ==============================================================
window.CFG_HE_THONG = {
    // 1. Cấu hình Github (Nhớ để nguyên lệnh lật ngược chuỗi để lách luật bot)
    GITHUB_TOKEN: "ghp_" + "iHDOmx43jv6bg0UdfWUelFMz3MetUk2qJpGw",
    GITHUB_REPO: "ducchinh2308/LuyenToan2308",

    // 2. Cấu hình các đường dẫn (URL)
    LINK_GITHUB_GOC: "https://ducchinh2308.github.io/LuyenToan2308",
    KHO_GIAI_LE_URL: "https://ducchinh2308.github.io/LuyenToan2308/Ngan_Hang_Loi_Giai",

    // Thầy có thể thêm các cấu hình khác vào đây sau này...
};



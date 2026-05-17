// ==============================================================
// KHỐI 0: ĐÁNH DẤU PHIÊN BẢN (VERSION CONTROL)
// ==============================================================
const KHOI10_VERSION = "Khối 10: Cập nhật lúc 10h33 - Ngày 17/05";
console.log(`%c🚀 ĐANG CHẠY: ${KHOI10_VERSION}`, "background: #28a745; color: white; font-size: 14px; padding: 5px; font-weight: bold;");

window.addEventListener('load', () => {
    let versionBadge = document.createElement('div');
    versionBadge.innerHTML = KHOI10_VERSION;
    versionBadge.style.cssText = "position: fixed; bottom: 20px; right: 5px; font-size: 9px; color: #28a745; z-index: 9999; ";
    document.body.appendChild(versionBadge);
});



// ---------------------------------------------------------------------
// 2.5. BỘ DỊCH CÔNG THỨC LATEX VÀ XỬ LÝ HTML TỪ TOOL C# LÊN WEB
// ---------------------------------------------------------------------
// Đây là hàm cực kỳ quan trọng để xử lý lỗi hiển thị toán học, TikZ, Bảng biến thiên
function dichLaTeX(tex) {
    if (!tex) return "";

    // BƯỚC 1: MÃ HÓA HTML VÀ BẢO VỆ ẢNH (Bảo vệ thẻ <img> không bị cắt hỏng)
    let imgTags = [];
    tex = tex.replace(/<img[^>]*>/gi, function (match) {
        imgTags.push(match);
        return '___IMG_TAG_' + (imgTags.length - 1) + '___';
    });

    // Chuyển đổi các dấu lớn/bé để không bị trình duyệt nhận nhầm thành thẻ HTML
    tex = tex.replace(/</g, ' &lt; ').replace(/>/g, ' &gt; ');

    // Trả lại thẻ ảnh
    imgTags.forEach((img, index) => {
        tex = tex.replace('___IMG_TAG_' + index + '___', img);
    });

    // BƯỚC 2: CHUẨN HÓA KÝ HIỆU VECTOR ĐỂ MATHJAX KHÔNG BỊ SẬP
    tex = tex.replace(/\|\\overrightarrow\{([^}]+)\}\|/g, '\\left|\\overrightarrow{$1}\\right|');
    tex = tex.replace(/\|\\vec\{([^}]+)\}\|/g, '\\left|\\vec{$1}\\right|');
    tex = tex.replace(/\|([^|]+?)\\overrightarrow\{([^}]+)\}([^|]+?)\|/g, '\\left|$1\\overrightarrow{$2}$3\\right|');

    // BƯỚC 3: THUẬT TOÁN "BỌC LÕI" - GIẤU BẢO VỆ TOÀN BỘ CÔNG THỨC TOÁN
    let hiddenBlocks = [];
    const hideBlock = (match) => {
        hiddenBlocks.push(match);
        return `___MATH_BLOCK_${hiddenBlocks.length - 1}___`;
    };

    tex = tex.replace(/\\begin\{(array|tabular|tikzpicture|aligned|eqnarray\*?|cases|[bpvB]matrix)\}[\s\S]*?\\end\{\1\}/g, hideBlock);
    tex = tex.replace(/\$\$[\s\S]*?\$\$/g, hideBlock);
    tex = tex.replace(/\\\[[\s\S]*?\\\]/g, hideBlock);
    tex = tex.replace(/\$[^$]+\$/g, hideBlock);

    // BƯỚC 4: XỬ LÝ XUỐNG DÒNG VÀ DỌN RÁC (Sau khi lõi toán đã an toàn)
    tex = tex.replace(/(?:\r?\n){2,}/g, '<br><br>');
    tex = tex.replace(/\\\\/g, '<br>');
    tex = tex.replace(/\\(noindent|centering|hfill|vfill|vspace\{[^}]+\}|hspace\{[^}]+\})\s*/g, '');

    tex = tex.replace(/\\shortans\[[^\]]*\]\{([\s\S]*?)\}/g, '<br><strong style="color:#d35400;">🎯 Đáp số:</strong> $1');
    tex = tex.replace(/\\textbf\{([\s\S]*?)\}/g, '<strong>$1</strong>');

    // BƯỚC 5: TRẢ LẠI RUỘT TOÁN VÀO ĐÚNG VỊ TRÍ 
    // Dùng split().join() thay cho replace() để 100% chống cắt xén chuỗi có ký tự đặc biệt
    for (let i = hiddenBlocks.length - 1; i >= 0; i--) {
        tex = tex.split(`___MATH_BLOCK_${i}___`).join(hiddenBlocks[i]);
    }

    // BƯỚC 6: XỬ LÝ SÂU BÊN TRONG CÁC KHỐI TOÁN ĐẶC THÙ (Bảng biến thiên, đồ thị)
    tex = tex.replace(/\\renewcommand\s*\{\s*\\arraystretch\s*\}\s*\{[^}]+\}/g, '');
    tex = tex.replace(/\\allowdisplaybreaks/g, '');

    tex = tex.replace(/\$\$\s*(\\begin{eqnarray\*?}[\s\S]*?\\end{eqnarray\*?})\s*\$\$/g, '$1');
    tex = tex.replace(/\\begin{eqnarray\*?}/g, '$$\\begin{aligned}');
    tex = tex.replace(/\\end{eqnarray\*?}/g, '\\end{aligned}$$');
    tex = tex.replace(/\\begin{center}([\s\S]*?)\\end{center}/g, '<div style="text-align: center; overflow-x: auto; margin: 10px 0;">$1</div>');

    // Nhúng Script cho TikzJax
    tex = tex.replace(/\\begin{tikzpicture}([\s\S]*?)\\end{tikzpicture}/g, function (match) {
        return '<script type="text/tikz">' + match + '</script>';
    });

    tex = tex.replace(/\$\$\s*(\\begin{(tabular|array)}[\s\S]*?\\end{\2})\s*\$\$/g, '$1');
    tex = tex.replace(/\\begin{(tabular|array)}([\s\S]*?)\\end{\1}/g, function (match, type, inner) {
        if (type === 'tabular' || inner.includes('\\hline') || match.includes('|')) {
            let cleanInner = inner.replace(/\$\$/g, '').replace(/(?<!\\)\$/g, '');

            cleanInner = cleanInner.replace(/&gt;\{\\centering\\arraybackslash\}p\{[^}]+\}/g, 'c');
            cleanInner = cleanInner.replace(/p\{[^}]+\}/g, 'c');
            cleanInner = cleanInner.replace(/m\{[^}]+\}/g, 'c');

            cleanInner = cleanInner.replace(/\\multicolumn\{([^}]+)\}\{([^}]+)\}/g, function (m, p1, p2) {
                let newAlign = p2.includes('|') ? '|c|' : 'c';
                return `\\multicolumn{${p1}}{${newAlign}}`;
            });

            cleanInner = cleanInner.replace(/\\multirow\{[^}]+\}\{[^}]+\}\{([\s\S]*?)\}/g, '$1');

            // Xử lý các đoạn text tiếng Việt xen kẽ trong công thức
            const viChars = "A-ZĐa-zđ0-9áàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵ";
            const regexText = new RegExp(`([${viChars}]+(?:\\s+[${viChars}]+)+)`, 'g');
            cleanInner = cleanInner.replace(regexText, '\\text{$1}');

            return '<div style="overflow-x: auto; margin: 10px 0; padding-bottom: 5px;">$$\\begin{array}' + cleanInner + '\\end{array}$$</div>';
        }
        return match;
    });

    // BƯỚC 7: XỬ LÝ DANH SÁCH (LISTS CỦA BỘ EXAM)
    tex = tex.split('\\begin{itemchoice}').join('<ul style="margin: 10px 0 10px 20px; list-style-type: lower-alpha;">');
    tex = tex.split('\\end{itemchoice}').join('</ul>');
    tex = tex.split('\\itemch').join('<li style="margin-bottom: 8px;">');
    tex = tex.split('\\begin{itemize}').join('<ul style="margin: 10px 0 10px 20px; list-style-type: disc;">');
    tex = tex.split('\\end{itemize}').join('</ul>');
    tex = tex.split('\\item').join('<li style="margin-bottom: 8px;">');

    return tex;
}
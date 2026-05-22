


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





// =========================================================================
// HỆ THỐNG BĂM LATEX (Dịch từ C# của Thầy Chính sang JS)
// =========================================================================

// 1. Hàm tìm và bóc tách 4 khối ngoặc nhọn {...} an toàn tuyệt đối
window.ham_6_16_lay_4_khoi_ngoac_nhon = function (tex, macroName) {
    const regex = new RegExp('\\\\' + macroName + '\\b');
    const match = tex.match(regex);
    if (!match) return null;

    let pos = match.index + match[0].length;
    let blocks = ["", "", "", ""];

    for (let i = 0; i < 4; i++) {
        while (pos < tex.length && /\s/.test(tex[pos])) pos++;
        if (pos >= tex.length || tex[pos] !== '{') return null;

        let start = pos;
        let depth = 0;
        for (; pos < tex.length; pos++) {
            if (tex[pos] === '{') depth++;
            else if (tex[pos] === '}') {
                depth--;
                if (depth === 0) {
                    blocks[i] = tex.substring(start + 1, pos);
                    pos++;
                    break;
                }
            }
        }
        if (depth > 0) return null; // Lỗi thiếu ngoặc đóng
    }
    return blocks;
};

// 2. Hàm chiết xuất Câu Dẫn, Phương Án và Lời Giải
window.ham_6_17_phan_tich_cau_hoi_tex = function (texContent) {
    let ketQua = { cauDan: "", paA: "", paB: "", paC: "", paD: "", loiGiai: "" };
    if (!texContent || texContent.trim() === "") return ketQua;

    // A. Tách Lời Giải
    let idxLoiGiai = texContent.indexOf('\\loigiai');
    let idxEndEx = texContent.indexOf('\\end{ex}');
    if (idxLoiGiai !== -1) {
        let startLoiGiai = texContent.indexOf('{', idxLoiGiai) + 1;
        let endLoiGiai = (idxEndEx !== -1) ? texContent.lastIndexOf('}', idxEndEx) : texContent.lastIndexOf('}');

        if (endLoiGiai > startLoiGiai) {
            ketQua.loiGiai = texContent.substring(startLoiGiai, endLoiGiai).trim();
        }
        texContent = texContent.substring(0, idxLoiGiai);
    }

    // B. Dọn rác lớp vỏ
    texContent = texContent.replace(/\\begin\{(ex|bt|vd|cau)\}[^\r\n]*/g, "");
    texContent = texContent.replace(/^\s*%.*?(?:\r?\n)/gm, "");
    texContent = texContent.replace(/\\end\{(ex|bt|vd|cau)\}[^\r\n]*/g, "");
    texContent = texContent.replace(/\\noindent\{\\footnotesize.*?\}/g, "");

    // C. Tách Phương án & Câu dẫn
    let blocksTN = ham_6_16_lay_4_khoi_ngoac_nhon(texContent, "choice");
    let blocksDS = ham_6_16_lay_4_khoi_ngoac_nhon(texContent, "choiceTF");

    if (blocksTN && blocksTN.length === 4) {
        ketQua.paA = blocksTN[0].replace(/\\True/g, "").trim();
        ketQua.paB = blocksTN[1].replace(/\\True/g, "").trim();
        ketQua.paC = blocksTN[2].replace(/\\True/g, "").trim();
        ketQua.paD = blocksTN[3].replace(/\\True/g, "").trim();
        let idxChoice = texContent.indexOf('\\choice');
        if (idxChoice !== -1) ketQua.cauDan = texContent.substring(0, idxChoice).trim();
    }
    else if (blocksDS && blocksDS.length === 4) {
        ketQua.paA = blocksDS[0].replace(/\\True/g, "").replace(/\\False/g, "").trim();
        ketQua.paB = blocksDS[1].replace(/\\True/g, "").replace(/\\False/g, "").trim();
        ketQua.paC = blocksDS[2].replace(/\\True/g, "").replace(/\\False/g, "").trim();
        ketQua.paD = blocksDS[3].replace(/\\True/g, "").replace(/\\False/g, "").trim();
        let idxCTF = texContent.indexOf('\\choiceTF');
        if (idxCTF !== -1) ketQua.cauDan = texContent.substring(0, idxCTF).trim();
    }
    else {
        let idxSA = texContent.indexOf('\\shortans');
        if (idxSA !== -1) {
            ketQua.cauDan = texContent.substring(0, idxSA).trim();
        } else {
            ketQua.cauDan = texContent.trim();
        }
    }

    return ketQua;
};

// 3. Hệ thống quét Đáp Án chuyên biệt
window.ham_6_18_trich_xuat_dap_an = function (texContent, kieuCau) {
    if (!texContent || texContent.trim() === "") return "";
    kieuCau = (kieuCau || "").trim().toUpperCase();

    if (kieuCau.includes("TN")) {
        let blocks = ham_6_16_lay_4_khoi_ngoac_nhon(texContent, "choice");
        if (!blocks) return "";
        for (let i = 0; i < 4; i++) {
            if (blocks[i].includes("\\True")) return String.fromCharCode(65 + i); // 65 là mã ASCII của 'A'
        }
    }
    else if (kieuCau.includes("DS")) {
        let blocks = ham_6_16_lay_4_khoi_ngoac_nhon(texContent, "choiceTF");
        if (!blocks) return "";
        let ans = "";
        for (let i = 0; i < 4; i++) {
            ans += blocks[i].includes("\\True") ? "T" : "F";
        }
        return ans;
    }
    else if (kieuCau.includes("TLN") || kieuCau.includes("NGAN")) {
        const match = texContent.match(/\\shortans(?:\[[^\]]*\])?\s*\{/);
        if (!match) return "";

        let pos = match.index + match[0].length - 1;
        let depth = 0, start = pos;

        for (; pos < texContent.length; pos++) {
            if (texContent[pos] === '{') depth++;
            else if (texContent[pos] === '}') {
                depth--;
                if (depth === 0) {
                    let inner = texContent.substring(start + 1, pos);
                    inner = inner.replace(/\{,\}/g, ",");
                    inner = inner.replace(/[^0-9\-\.,]/g, ""); // Quét rác siêu mạnh
                    return inner;
                }
            }
        }
    }
    return "";
};



// =====================================================================
// Hàm 6.19: Dọn rác và Chuẩn hóa cấu trúc TeX (Dịch từ C# sang JS)
// =====================================================================
window.ham_6_19_xu_ly_du_lieu_truoc_khi_push = function (text) {
    if (!text || typeof text !== 'string' || text.trim() === "") return text;

    // 🌟 0. DỌN RÁC CƠ BẢN
    text = text.replace(/\\renewcommand\s*\{\s*\\arraystretch\s*\}\s*\{[^}]+\}/g, "");
    text = text.replace(/\\noindent\s*/g, "");
    text = text.replace(/\\centering\s*/g, "");
    text = text.replace(/\\hfill\s*/g, "");

    // 🌟 1. CHUẨN HÓA VECTOR VÀ TRỊ TUYỆT ĐỐI
    text = text.replace(/\|\s*\\overrightarrow\s*\{([^}]+)\}\s*\|/g, "\\left|\\overrightarrow{$1}\\right|");
    text = text.replace(/\|\s*\\vec\s*\{([^}]+)\}\s*\|/g, "\\left|\\vec{$1}\\right|");

    // 🌟 2. THUẬT TOÁN XỬ LÝ \heva, \hoac (Chuyển đổi sang format Web)
    const tuKhoas = [/\\heva/g, /\\hoac/g];
    const mos = ["\\left\\{\\begin{aligned}", "\\left[\\begin{aligned}"];
    const dongs = ["\\end{aligned}\\right.", "\\end{aligned}\\right."];

    for (let k = 0; k < tuKhoas.length; k++) {
        let keyword = tuKhoas[k].source.replace(/\\/g, ""); // Lấy chuỗi heva hoặc hoac
        let startIdx;

        while ((startIdx = text.indexOf("\\" + keyword)) !== -1) {
            let contentStart = startIdx + keyword.length + 1;
            let contentEnd = -1;
            let ruot = "";
            let coNgoacNhon = false;

            let firstCharIdx = contentStart;
            while (firstCharIdx < text.length && /\s/.test(text[firstCharIdx])) firstCharIdx++;

            if (firstCharIdx < text.length && text[firstCharIdx] === '{') {
                coNgoacNhon = true;
                let count = 0;
                for (let i = firstCharIdx; i < text.length; i++) {
                    if (text[i] === '{') count++;
                    else if (text[i] === '}') {
                        count--;
                        if (count === 0) { contentEnd = i; break; }
                    }
                }
                if (contentEnd !== -1) ruot = text.substring(firstCharIdx + 1, contentEnd);
            } else {
                for (let i = firstCharIdx; i < text.length; i++) {
                    let check = text.substring(i);
                    if (check.startsWith("\\Rightarrow") || check.startsWith("\\\\") || text[i] === '}') {
                        contentEnd = i;
                        break;
                    }
                }
                if (contentEnd !== -1) ruot = text.substring(firstCharIdx, contentEnd);
            }

            if (contentEnd !== -1) {
                text = text.substring(0, startIdx) + mos[k] + ruot + dongs[k] + text.substring(coNgoacNhon ? contentEnd + 1 : contentEnd);
            } else {
                break;
            }
        }
    }

    // 🌟 3. THUẬT TOÁN "BỌC LÕI" BẢO VỆ TOÁN HỌC (CHỐNG LỖI XUỐNG DÒNG)
    let hiddenMath = [];

    // Lưu tạm các khối toán học lớn
    text = text.replace(/\\begin\{(array|tabular|tikzpicture|aligned|eqnarray\*?|cases|[bpvB]matrix|matrix)\}[\s\S]*?\\end\{\1\}/g, (match) => {
        hiddenMath.push(match);
        return `___MATH_BLOCK_${hiddenMath.length - 1}___`;
    });

    // Lưu tạm khối $$...$$ và \[...\]
    text = text.replace

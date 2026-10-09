


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





// // =========================================================================
// // HỆ THỐNG BĂM LATEX (Dịch từ C# của Thầy Chính sang JS)
// // =========================================================================

// // 1. Hàm tìm và bóc tách 4 khối ngoặc nhọn {...} an toàn tuyệt đối
// window.ham_99_1_lay_4_khoi_ngoac_nhon = function (tex, macroName) {
//     const regex = new RegExp('\\\\' + macroName + '\\b');
//     const match = tex.match(regex);
//     if (!match) return null;

//     let pos = match.index + match[0].length;
//     let blocks = ["", "", "", ""];

//     for (let i = 0; i < 4; i++) {
//         while (pos < tex.length && /\s/.test(tex[pos])) pos++;
//         if (pos >= tex.length || tex[pos] !== '{') return null;

//         let start = pos;
//         let depth = 0;
//         for (; pos < tex.length; pos++) {
//             if (tex[pos] === '{') depth++;
//             else if (tex[pos] === '}') {
//                 depth--;
//                 if (depth === 0) {
//                     blocks[i] = tex.substring(start + 1, pos);
//                     pos++;
//                     break;
//                 }
//             }
//         }
//         if (depth > 0) return null; // Lỗi thiếu ngoặc đóng
//     }
//     return blocks;
// };

// // 2. Hàm chiết xuất Câu Dẫn, Phương Án và Lời Giải
// window.ham_99_2_phan_tich_cau_hoi_tex = function (texContent) {
//     let ketQua = { cauDan: "", paA: "", paB: "", paC: "", paD: "", loiGiai: "" };
//     console.log(`[DEBUG 99.2] Phân tích TeX:`, texContent);

//     if (!texContent || texContent.trim() === "") return ketQua;

//     // A. Tách Lời Giải
//     let idxLoiGiai = texContent.indexOf('\\loigiai');
//     let idxEndEx = texContent.indexOf('\\end{ex}');
//     if (idxLoiGiai !== -1) {
//         let startLoiGiai = texContent.indexOf('{', idxLoiGiai) + 1;
//         let endLoiGiai = (idxEndEx !== -1) ? texContent.lastIndexOf('}', idxEndEx) : texContent.lastIndexOf('}');

//         if (endLoiGiai > startLoiGiai) {
//             ketQua.loiGiai = texContent.substring(startLoiGiai, endLoiGiai).trim();
//         }
//         texContent = texContent.substring(0, idxLoiGiai);
//     }

//     // B. Dọn rác lớp vỏ
//     texContent = texContent.replace(/\\begin\{(ex|bt|vd|cau)\}[^\r\n]*/g, "");
//     texContent = texContent.replace(/^\s*%.*?(?:\r?\n)/gm, "");
//     texContent = texContent.replace(/\\end\{(ex|bt|vd|cau)\}[^\r\n]*/g, "");
//     texContent = texContent.replace(/\\noindent\{\\footnotesize.*?\}/g, "");

//     // C. Tách Phương án & Câu dẫn

//     console.log(`[DEBUG 99.2] Chuẩn bị tách phương án từ TeX:`, texContent);
//     let blocksTN = ham_99_1_lay_4_khoi_ngoac_nhon(texContent, "choice");
//     let blocksDS = ham_99_1_lay_4_khoi_ngoac_nhon(texContent, "choiceTF");


//     console.log(`[DEBUG 99.2] Tách phương án:`, { blocksTN, blocksDS });

//     if (blocksTN && blocksTN.length === 4) {
//         ketQua.paA = blocksTN[0].replace(/\\True/g, "").trim();
//         ketQua.paB = blocksTN[1].replace(/\\True/g, "").trim();
//         ketQua.paC = blocksTN[2].replace(/\\True/g, "").trim();
//         ketQua.paD = blocksTN[3].replace(/\\True/g, "").trim();
//         let idxChoice = texContent.indexOf('\\choice');
//         if (idxChoice !== -1) ketQua.cauDan = texContent.substring(0, idxChoice).trim();
//     }
//     else if (blocksDS && blocksDS.length === 4) {
//         ketQua.paA = blocksDS[0].replace(/\\True/g, "").replace(/\\False/g, "").trim();
//         ketQua.paB = blocksDS[1].replace(/\\True/g, "").replace(/\\False/g, "").trim();
//         ketQua.paC = blocksDS[2].replace(/\\True/g, "").replace(/\\False/g, "").trim();
//         ketQua.paD = blocksDS[3].replace(/\\True/g, "").replace(/\\False/g, "").trim();
//         let idxCTF = texContent.indexOf('\\choiceTF');
//         if (idxCTF !== -1) ketQua.cauDan = texContent.substring(0, idxCTF).trim();
//     }
//     else {
//         let idxSA = texContent.indexOf('\\shortans');
//         console.log(`[DEBUG 99.2] Không tìm thấy phương án, chỉ có câu dẫn. Vị trí \\shortans: ${idxSA}`);
//         if (idxSA !== -1) {
//             ketQua.cauDan = texContent.substring(0, idxSA).trim();
//         } else {
//             ketQua.cauDan = texContent.trim();
//         }
//     }
//     console.log(`[DEBUG 99.2] Kết quả phân tích TeX:`, ketQua);
//     return ketQua;
// };

// // 3. Hệ thống quét Đáp Án chuyên biệt
// window.ham_99_3_trich_xuat_dap_an = function (texContent, kieuCau) {
//     if (!texContent || texContent.trim() === "") return "";
//     kieuCau = (kieuCau || "").trim().toUpperCase();

//     if (kieuCau.includes("TN")) {
//         let blocks = ham_99_1_lay_4_khoi_ngoac_nhon(texContent, "choice");
//         if (!blocks) return "";
//         for (let i = 0; i < 4; i++) {
//             if (blocks[i].includes("\\True")) return String.fromCharCode(65 + i); // 65 là mã ASCII của 'A'
//         }
//     }
//     else if (kieuCau.includes("DS")) {
//         let blocks = ham_99_1_lay_4_khoi_ngoac_nhon(texContent, "choiceTF");
//         if (!blocks) return "";
//         let ans = "";
//         for (let i = 0; i < 4; i++) {
//             ans += blocks[i].includes("\\True") ? "T" : "F";
//         }
//         return ans;
//     }
//     else if (kieuCau.includes("TLN") || kieuCau.includes("NGAN")) {
//         const match = texContent.match(/\\shortans(?:\[[^\]]*\])?\s*\{/);
//         if (!match) return "";

//         let pos = match.index + match[0].length - 1;
//         let depth = 0, start = pos;

//         for (; pos < texContent.length; pos++) {
//             if (texContent[pos] === '{') depth++;
//             else if (texContent[pos] === '}') {
//                 depth--;
//                 if (depth === 0) {
//                     let inner = texContent.substring(start + 1, pos);
//                     inner = inner.replace(/\{,\}/g, ",");
//                     inner = inner.replace(/[^0-9\-\.,]/g, ""); // Quét rác siêu mạnh
//                     return inner;
//                 }
//             }
//         }
//     }
//     return "";
// };



// =========================================================================
// HỆ THỐNG BĂM LATEX (TÍCH HỢP LÕI AST CỦA V3 VÀO KHỐI 99)
// =========================================================================

// 1. Hàm đọc ngoặc nhọn an toàn của V3 (Thay thế Regex cũ)
// Giải quyết triệt để lỗi khi bên trong đáp án có ngoặc lồng nhau (VD: \frac{\sqrt{2}}{2})
window.ham_99_1_doc_ngoac_an_toan_v3 = function (src, openIndex, open = '{', close = '}') {
    if (src[openIndex] !== open) return null;
    let depth = 0;
    for (let i = openIndex; i < src.length; i++) {
        const ch = src[i];
        const escaped = i > 0 && src[i - 1] === '\\'; // Bỏ qua \{ hoặc \}
        if (!escaped && ch === open) depth++;
        else if (!escaped && ch === close) {
            depth--;
            if (depth === 0) return { content: src.substring(openIndex + 1, i), end: i + 1 };
        }
    }
    return null;
};

// Hàm phụ trợ trích xuất lệnh của V3
window.ham_99_1b_lay_tham_so_lenh_v3 = function (src, tenLenh, soThamSo = 1) {
    let regex = new RegExp('\\\\' + tenLenh + '(?=\\s|\\[|\\{)');
    let match = regex.exec(src);
    if (!match) return null;

    let index = match.index;
    let i = index + tenLenh.length + 1;

    // Bỏ qua khoảng trắng
    while (i < src.length && /\s/.test(src[i])) i++;

    // Bỏ qua option [ ] nếu có
    if (src[i] === '[') {
        const o = window.ham_99_1_doc_ngoac_an_toan_v3(src, i, '[', ']');
        if (o) { i = o.end; while (i < src.length && /\s/.test(src[i])) i++; }
    }

    const args = [];
    for (let k = 0; k < soThamSo; k++) {
        while (i < src.length && /\s/.test(src[i])) i++;
        if (src[i] !== '{') return null;
        const b = window.ham_99_1_doc_ngoac_an_toan_v3(src, i);
        if (!b) return null;
        args.push(b.content);
        i = b.end;
    }
    return { tenLenh, args, start: index, end: i };
};

// 2. Phân tích câu hỏi (Kế thừa thuật toán bóc tách của V3)
window.ham_99_2_phan_tich_cau_hoi_tex = function (texContent) {
    let ketQua = { cauDan: "", paA: "", paB: "", paC: "", paD: "", loiGiai: "", kieuCau: "UNKNOWN", dapAnKey: "" };

    // A. Tiền xử lý (Giữ lại đặc sản của KHOI-99: \heva, \hoac)
    if (typeof window.ham_99_4_xu_ly_du_lieu_truoc_khi_push === 'function') {
        texContent = window.ham_99_4_xu_ly_du_lieu_truoc_khi_push(texContent);
    }

    // B. Tách Lời Giải (V3 Style)
    let m_loigiai = /\\loigiai\s*\{/.exec(texContent);
    if (m_loigiai) {
        let braceIdx = texContent.indexOf('{', m_loigiai.index);
        let b = window.ham_99_1_doc_ngoac_an_toan_v3(texContent, braceIdx);
        if (b) {
            ketQua.loiGiai = b.content.trim();
            texContent = texContent.substring(0, m_loigiai.index) + texContent.substring(b.end);
        }
    }

    // C. Nhận diện cấu trúc và Phương án
    let body = texContent.replace(/\\begin\{(ex|bt|vd|cau)\}[^\r\n]*/g, "").replace(/\\end\{(ex|bt|vd|cau)\}[^\r\n]*/g, "").trim();

    let cmd_choice = window.ham_99_1b_lay_tham_so_lenh_v3(body, 'choice', 4);
    let cmd_choiceTF = window.ham_99_1b_lay_tham_so_lenh_v3(body, 'choiceTF', 4) || window.ham_99_1b_lay_tham_so_lenh_v3(body, 'choiceTFt', 4);
    let cmd_short = window.ham_99_1b_lay_tham_so_lenh_v3(body, 'shortans', 1);

    if (cmd_choice) {
        ketQua.kieuCau = "TN";
        ketQua.cauDan = body.substring(0, cmd_choice.start).trim();
        ketQua.paA = cmd_choice.args[0].replace(/\\True\b/g, "").trim();
        ketQua.paB = cmd_choice.args[1].replace(/\\True\b/g, "").trim();
        ketQua.paC = cmd_choice.args[2].replace(/\\True\b/g, "").trim();
        ketQua.paD = cmd_choice.args[3].replace(/\\True\b/g, "").trim();
        ketQua.dapAnKey = cmd_choice.args.findIndex(a => /\\True\b/.test(a));
        if (ketQua.dapAnKey >= 0) ketQua.dapAnKey = String.fromCharCode(65 + ketQua.dapAnKey);
    }
    else if (cmd_choiceTF) {
        ketQua.kieuCau = "DS";
        ketQua.cauDan = body.substring(0, cmd_choiceTF.start).trim();
        ketQua.paA = cmd_choiceTF.args[0].replace(/\\True\b/g, "").replace(/\\False\b/g, "").trim();
        ketQua.paB = cmd_choiceTF.args[1].replace(/\\True\b/g, "").replace(/\\False\b/g, "").trim();
        ketQua.paC = cmd_choiceTF.args[2].replace(/\\True\b/g, "").replace(/\\False\b/g, "").trim();
        ketQua.paD = cmd_choiceTF.args[3].replace(/\\True\b/g, "").replace(/\\False\b/g, "").trim();

        let ans = "";
        cmd_choiceTF.args.forEach(a => { ans += /\\True\b/.test(a) ? "T" : "F"; });
        ketQua.dapAnKey = ans;
    }
    else if (cmd_short) {
        ketQua.kieuCau = "TLN";
        ketQua.cauDan = body.substring(0, cmd_short.start).trim();

    
        let s = cmd_short.args[0].replace(/\{,\}/g, ",").replace(/[^0-9\-\.,]/g, "");
        ketQua.dapAnKey = s;
    }
    else {
        ketQua.kieuCau = "TL";
        ketQua.cauDan = body;
    }

    return ketQua;
};

// 3. Hệ thống quét Đáp Án chuyên biệt (Đã được tích hợp thẳng vào 99.2 nên hàm này chỉ cần bọc lại để tương thích mã cũ)
window.ham_99_3_trich_xuat_dap_an = function (texContent, kieuCau) {
    let kq = window.ham_99_2_phan_tich_cau_hoi_tex(texContent);
    return kq.dapAnKey || "";
};



// // =====================================================================
// // Hàm 6.19: Dọn rác và Chuẩn hóa cấu trúc TeX (Dịch từ C# sang JS)
// // =====================================================================
// window.ham_99_4_xu_ly_du_lieu_truoc_khi_push = function (text) {
//     if (!text || typeof text !== 'string' || text.trim() === "") return text;

//     // 🌟 0. DỌN RÁC CƠ BẢN
//     text = text.replace(/\\renewcommand\s*\{\s*\\arraystretch\s*\}\s*\{[^}]+\}/g, "");
//     text = text.replace(/\\noindent\s*/g, "");
//     text = text.replace(/\\centering\s*/g, "");
//     text = text.replace(/\\hfill\s*/g, "");

//     // 🌟 1. CHUẨN HÓA VECTOR VÀ TRỊ TUYỆT ĐỐI
//     text = text.replace(/\|\s*\\overrightarrow\s*\{([^}]+)\}\s*\|/g, "\\left|\\overrightarrow{$1}\\right|");
//     text = text.replace(/\|\s*\\vec\s*\{([^}]+)\}\s*\|/g, "\\left|\\vec{$1}\\right|");

//     // 🌟 2. THUẬT TOÁN XỬ LÝ \heva, \hoac (Chuyển đổi sang format Web)
//     const tuKhoas = ["\\heva", "\\hoac"];
//     const mos = ["\\left\\{\\begin{aligned}", "\\left[\\begin{aligned}"];
//     const dongs = ["\\end{aligned}\\right.", "\\end{aligned}\\right."];

//     for (let k = 0; k < tuKhoas.length; k++) {
//         let keyword = tuKhoas[k];
//         let startIdx;

//         while ((startIdx = text.indexOf(keyword)) !== -1) {
//             let contentStart = startIdx + keyword.length;
//             let contentEnd = -1;
//             let ruot = "";
//             let coNgoacNhon = false;

//             let firstCharIdx = contentStart;
//             // Bỏ qua các khoảng trắng
//             while (firstCharIdx < text.length && /\s/.test(text[firstCharIdx])) firstCharIdx++;

//             if (firstCharIdx < text.length && text[firstCharIdx] === '{') {
//                 coNgoacNhon = true;
//                 let count = 0;
//                 for (let i = firstCharIdx; i < text.length; i++) {
//                     if (text[i] === '{') count++;
//                     else if (text[i] === '}') {
//                         count--;
//                         if (count === 0) { contentEnd = i; break; }
//                     }
//                 }
//                 if (contentEnd !== -1) ruot = text.substring(firstCharIdx + 1, contentEnd);
//             } else {
//                 for (let i = firstCharIdx; i < text.length; i++) {
//                     let check = text.substring(i);
//                     if (check.startsWith("\\Rightarrow") || check.startsWith("\\\\") || text[i] === '}') {
//                         contentEnd = i;
//                         break;
//                     }
//                 }
//                 if (contentEnd !== -1) ruot = text.substring(firstCharIdx, contentEnd);
//             }

//             if (contentEnd !== -1) {
//                 let phanDau = text.substring(0, startIdx);
//                 let phanDuoi = text.substring(coNgoacNhon ? contentEnd + 1 : contentEnd);
//                 text = phanDau + mos[k] + ruot + dongs[k] + phanDuoi;
//             } else {
//                 break; // Thoát vòng lặp nếu không tìm thấy điểm kết thúc để tránh treo trình duyệt
//             }
//         }
//     }

//     // =====================================================================
//     // 🌟 3. THUẬT TOÁN "BỌC LÕI" BẢO VỆ TOÁN HỌC (CHỐNG LỖI XUỐNG DÒNG)
//     // =====================================================================
//     let hiddenMath = [];

//     // Bảo vệ các môi trường toán học / bảng biểu / hình vẽ (begin...end)
//     text = text.replace(/\\begin\{(array|tabular|tikzpicture|aligned|eqnarray\*?|cases|[bpvB]matrix|matrix)\}[\s\S]*?\\end\{\1\}/g, (match) => {
//         hiddenMath.push(match);
//         return `___MATH_BLOCK_${hiddenMath.length - 1}___`;
//     });

//     // Bảo vệ khối $$ ... $$ (Toán độc lập)
//     text = text.replace(/(?<!\\)\$\$[\s\S]*?(?<!\\)\$\$/g, (match) => {
//         hiddenMath.push(match);
//         return `___MATH_BLOCK_${hiddenMath.length - 1}___`;
//     });

//     // Bảo vệ khối \[ ... \] (Toán độc lập)
//     text = text.replace(/(?<!\\)\\\[[\s\S]*?(?<!\\)\\\]/g, (match) => {
//         hiddenMath.push(match);
//         return `___MATH_BLOCK_${hiddenMath.length - 1}___`;
//     });

//     // Bảo vệ khối $ ... $ (Toán trong dòng)
//     text = text.replace(/(?<!\\)\$(?!\$)([\s\S]*?)(?<!\\)\$/g, (match) => {
//         hiddenMath.push(match);
//         return `___MATH_BLOCK_${hiddenMath.length - 1}___`;
//     });

//     // Xử lý thay thế khoảng trắng/xuống dòng dư thừa ở phần văn bản thường
//     text = text.replace(/(?:\r?\n[ \t]*){2,}/g, "\\\\");
//     text = text.replace(/\\\$/g, "$\\$$");
//     text = text.replace(/\\\\\\\\/g, "\\\\"); // Thu gọn 2 lệnh xuống dòng liên tiếp

//     // Khôi phục lại lõi toán học nguyên bản (Chạy ngược mảng để đảm bảo độ chính xác)
//     for (let i = hiddenMath.length - 1; i >= 0; i--) {
//         text = text.replace(`___MATH_BLOCK_${i}___`, hiddenMath[i]);
//     }

//     return text.trim();
// };



// window.ham_99_5_xu_ly_du_lieu_truoc_khi_push_nap_anh_tu_supabase_sang_github = async function (maDe = "CHUNG", idCauChinhXac = "", text) {
//     console.log(`[DEBUG 99.5] Bắt đầu xử lý nội dung. Mã đề: ${maDe}, ID câu: ${idCauChinhXac}`);


//     if (!text || typeof text !== 'string' || text.trim() === "") return text;

//     // 🌟 0. DỌN RÁC VÀ CHUẨN HÓA CƠ BẢN (Giữ nguyên)
//     text = text.replace(/\\renewcommand\s*\{\s*\\arraystretch\s*\}\s*\{[^}]+\}/g, "");
//     text = text.replace(/\\noindent\s*/g, "");
//     text = text.replace(/\\centering\s*/g, "");
//     text = text.replace(/\\hfill\s*/g, "");
//     text = text.replace(/\|\s*\\overrightarrow\s*\{([^}]+)\}\s*\|/g, "\\left|\\overrightarrow{$1}\\right|");
//     text = text.replace(/\|\s*\\vec\s*\{([^}]+)\}\s*\|/g, "\\left|\\vec{$1}\\right|");

//     // 🌟 1. THUẬT TOÁN XỬ LÝ \heva, \hoac (Giữ nguyên)
//     const tuKhoas = ["\\heva", "\\hoac"];
//     const mos = ["\\left\\{\\begin{aligned}", "\\left[\\begin{aligned}"];
//     const dongs = ["\\end{aligned}\\right.", "\\end{aligned}\\right."];

//     for (let k = 0; k < tuKhoas.length; k++) {
//         let keyword = tuKhoas[k];
//         let startIdx;
//         while ((startIdx = text.indexOf(keyword)) !== -1) {
//             let contentStart = startIdx + keyword.length;
//             let contentEnd = -1;
//             let ruot = "";
//             let coNgoacNhon = false;

//             let firstCharIdx = contentStart;
//             while (firstCharIdx < text.length && /\s/.test(text[firstCharIdx])) firstCharIdx++;

//             if (firstCharIdx < text.length && text[firstCharIdx] === '{') {
//                 coNgoacNhon = true;
//                 let count = 0;
//                 for (let i = firstCharIdx; i < text.length; i++) {
//                     if (text[i] === '{') count++;
//                     else if (text[i] === '}') { count--; if (count === 0) { contentEnd = i; break; } }
//                 }
//                 if (contentEnd !== -1) ruot = text.substring(firstCharIdx + 1, contentEnd);
//             } else {
//                 for (let i = firstCharIdx; i < text.length; i++) {
//                     let check = text.substring(i);
//                     if (check.startsWith("\\Rightarrow") || check.startsWith("\\\\") || text[i] === '}') {
//                         contentEnd = i; break;
//                     }
//                 }
//                 if (contentEnd !== -1) ruot = text.substring(firstCharIdx, contentEnd);
//             }

//             if (contentEnd !== -1) {
//                 let phanDau = text.substring(0, startIdx);
//                 let phanDuoi = text.substring(coNgoacNhon ? contentEnd + 1 : contentEnd);
//                 text = phanDau + mos[k] + ruot + dongs[k] + phanDuoi;
//             } else { break; }
//         }
//     }

//     // =====================================================================
//     // 🌟 2. PHÂN TÁCH ĐỀ / GIẢI VÀ ĐỒNG BỘ ẢNH LÊN GITHUB
//     // =====================================================================
//     let phanDe = text;
//     let phanGiai = "";
//     const chiMucLoiGiai = text.indexOf("\\loigiai");

//     console.log(`[DEBUG 99.5] Text: ${text}`);
//     if (chiMucLoiGiai !== -1) {
//         phanDe = text.substring(0, chiMucLoiGiai);
//         phanGiai = text.substring(chiMucLoiGiai);
//     }

//     console.log(`[DEBUG 99.5] Phân tách nội dung thành Đề và Giải. Đề: ${phanDe}, Giải: ${phanGiai}`);
//     // Hàm nội bộ xử lý quét và thay thế
//     const xuLyAnhTungPhan = async (noiDung, isPhanGiai) => {
//         console.log(`[DEBUG 99.5] Bắt đầu xử lý ảnh cho ${isPhanGiai ? 'Giải' : 'Đề'}. Nội dung: ${noiDung}`);
//         // Regex tìm [IMG:...] hoặc \includegraphics
//         const regexImg = /\[IMG:(.*?)\]|\\includegraphics(?:\[.*?\])?\{(.*?)\}/g;
//         let match;
//         let tempNoiDung = noiDung;

//         // // Lưu danh sách ảnh cần xử lý
//         // let danhSachAnh = [];
//         // while ((match = regexImg.exec(noiDung)) !== null) {
//         //     let tenFile = match[1] || match[2];
//         //     console.log(`[DEBUG 99.5] Tìm thấyảnh: ${tenFile}}`);
//         //     danhSachAnh.push({ fullMatch: match[0], ten: tenFile.trim() });
//         // }

//         // Lưu danh sách ảnh cần xử lý
//         let danhSachAnh = [];
//         // Regex này tìm: [IMG:ID|TênFile] hoặc \includegraphics{ID|TênFile}
//         // Thầy điều chỉnh Regex để khớp với định dạng: [IMG:ID_của_ảnh]
//         // Nếu thầy muốn lấy "tên file" (ví dụ: ảnh này là hinh_cau_1.png),
//         // Thầy phải đảm bảo trong đề thầy viết: [IMG:ID_file_anh|hinh_cau_1.png]
//         // Hoặc nếu chỉ có ID, thầy lấy ID làm tên file tạm.

//         while ((match = regexImg.exec(noiDung)) !== null) {
//             let fullTag = match[1] || match[2]; // Đây là chuỗi ID hoặc ID|TênFile

//             let idFile = "";
//             let tenFile = "";

//             if (fullTag.includes('|')) {
//                 let parts = fullTag.split('|');
//                 idFile = parts[0].trim();
//                 tenFile = parts[1].trim();
//             } else {
//                 idFile = fullTag.trim();
//                 tenFile = idFile + ".png"; // Mặc định nếu không có tên thì lấy ID làm tên
//             }

//             console.log(`[DEBUG 99.5] Tìm thấy ID: ${idFile}, Tên file: ${tenFile}`);

//             danhSachAnh.push({
//                 fullMatch: match[0],
//                 id: idFile,
//                 ten: tenFile
//             });
//         }





//         console.log(`[DEBUG 99.5] Tìm thấy danh sách ảnh: ${danhSachAnh.map(a => a.ten).join(', ')}`);
//         for (let anh of danhSachAnh) {
//             // Gọi hàm đẩy lên GitHub (hàm này thầy đã có/sửa theo ý đồ)
//             console.log(`[DEBUG 99.5] Đang xử lý ảnh: ${anh.ten} (Phân giải: ${isPhanGiai})`);
//             let linkMoi = await window.ham_99_6_tai_anh_drive_va_push_github_tu_dong(maDe, idCauChinhXac, anh.ten, isPhanGiai);
//             if (linkMoi) {
//                 tempNoiDung = tempNoiDung.replace(anh.fullMatch, `<img src="${linkMoi}" style="max-width:100%"/>`);
//             }
//         }
//         return tempNoiDung;
//     };

//     // Chạy xử lý tuần tự cho Đề rồi tới Giải
//     phanDe = await xuLyAnhTungPhan(phanDe, false);
//     phanGiai = await xuLyAnhTungPhan(phanGiai, true);

//     console.log(`[DEBUG 99.5] Hoàn tất xử lý ảnh. Đề: ${phanDe}, Giải: ${phanGiai}`);
//     // Ghép lại thành một khối hoàn chỉnh
//     text = phanDe + phanGiai;

//     // =====================================================================
//     // 🌟 3. THUẬT TOÁN "BỌC LÕI" BẢO VỆ TOÁN HỌC
//     // =====================================================================
//     let hiddenMath = [];

//     text = text.replace(/\\begin\{(array|tabular|tikzpicture|aligned|eqnarray\*?|cases|[bpvB]matrix|matrix)\}[\s\S]*?\\end\{\1\}/g, (match) => {
//         hiddenMath.push(match); return `___MATH_BLOCK_${hiddenMath.length - 1}___`;
//     });
//     text = text.replace(/(?<!\\)\$\$[\s\S]*?(?<!\\)\$\$/g, (match) => {
//         hiddenMath.push(match); return `___MATH_BLOCK_${hiddenMath.length - 1}___`;
//     });
//     text = text.replace(/(?<!\\)\\\[[\s\S]*?(?<!\\)\\\]/g, (match) => {
//         hiddenMath.push(match); return `___MATH_BLOCK_${hiddenMath.length - 1}___`;
//     });
//     text = text.replace(/(?<!\\)\$(?!\$)([\s\S]*?)(?<!\\)\$/g, (match) => {
//         hiddenMath.push(match); return `___MATH_BLOCK_${hiddenMath.length - 1}___`;
//     });

//     text = text.replace(/(?:\r?\n[ \t]*){2,}/g, "\\\\");
//     text = text.replace(/\\\$/g, "$\\$$");
//     text = text.replace(/\\\\\\\\/g, "\\\\");

//     for (let i = hiddenMath.length - 1; i >= 0; i--) {
//         text = text.replace(`___MATH_BLOCK_${i}___`, hiddenMath[i]);
//     }

//     return text.trim();
// };



// =====================================================================
// Hàm 6.19 (99.4): Dọn rác và Chuẩn hóa cấu trúc TeX (ĐÃ FIX LỖI DƯ DẤU XUYỆT)
// =====================================================================
window.ham_99_4_xu_ly_du_lieu_truoc_khi_push = function (text) {
    if (!text || typeof text !== 'string' || text.trim() === "") return text;

    // 🌟 0. DỌN RÁC CƠ BẢN VÀ XÓA BỌC HÌNH ẢNH
    text = text.replace(/\\renewcommand\s*\{\s*\\arraystretch\s*\}\s*\{[^}]+\}/g, "");
    text = text.replace(/\\noindent\s*/g, "");
    text = text.replace(/\\centering\s*/g, "");
    text = text.replace(/\\hfill\s*/g, "");
    text = text.replace(/\\begin\{center\}/g, "");
    text = text.replace(/\\end\{center\}/g, "");
    text = text.replace(/\\begin\{figure\}\[.*?\]/g, "");
    text = text.replace(/\\begin\{figure\}/g, "");
    text = text.replace(/\\end\{figure\}/g, "");

    // 🌟 1. CHUẨN HÓA VECTOR VÀ TRỊ TUYỆT ĐỐI
    text = text.replace(/\|\s*\\overrightarrow\s*\{([^}]+)\}\s*\|/g, "\\left|\\overrightarrow{$1}\\right|");
    text = text.replace(/\|\s*\\vec\s*\{([^}]+)\}\s*\|/g, "\\left|\\vec{$1}\\right|");

    // 🌟 2. THUẬT TOÁN XỬ LÝ \heva, \hoac
    const tuKhoas = ["\\heva", "\\hoac"];
    const mos = ["\\left\\{\\begin{aligned}", "\\left[\\begin{aligned}"];
    const dongs = ["\\end{aligned}\\right.", "\\end{aligned}\\right."];

    for (let k = 0; k < tuKhoas.length; k++) {
        let keyword = tuKhoas[k];
        let startIdx;
        while ((startIdx = text.indexOf(keyword)) !== -1) {
            let contentStart = startIdx + keyword.length;
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
                    else if (text[i] === '}') { count--; if (count === 0) { contentEnd = i; break; } }
                }
                if (contentEnd !== -1) ruot = text.substring(firstCharIdx + 1, contentEnd);
            } else {
                for (let i = firstCharIdx; i < text.length; i++) {
                    let check = text.substring(i);
                    if (check.startsWith("\\Rightarrow") || check.startsWith("\\\\") || text[i] === '}') {
                        contentEnd = i; break;
                    }
                }
                if (contentEnd !== -1) ruot = text.substring(firstCharIdx, contentEnd);
            }

            if (contentEnd !== -1) {
                let phanDau = text.substring(0, startIdx);
                let phanDuoi = text.substring(coNgoacNhon ? contentEnd + 1 : contentEnd);
                text = phanDau + mos[k] + ruot + dongs[k] + phanDuoi;
            } else { break; }
        }
    }

    // 🌟 3. THUẬT TOÁN "BỌC LÕI" BẢO VỆ TOÁN HỌC
    let hiddenMath = [];

    text = text.replace(/\\begin\{(array|tabular|tikzpicture|aligned|eqnarray\*?|cases|[bpvB]matrix|matrix)\}[\s\S]*?\\end\{\1\}/g, (match) => {
        hiddenMath.push(match); return `___MATH_BLOCK_${hiddenMath.length - 1}___`;
    });
    text = text.replace(/(?<!\\)\$\$[\s\S]*?(?<!\\)\$\$/g, (match) => {
        hiddenMath.push(match); return `___MATH_BLOCK_${hiddenMath.length - 1}___`;
    });
    text = text.replace(/(?<!\\)\\\[[\s\S]*?(?<!\\)\\\]/g, (match) => {
        hiddenMath.push(match); return `___MATH_BLOCK_${hiddenMath.length - 1}___`;
    });
    text = text.replace(/(?<!\\)\$(?!\$)([\s\S]*?)(?<!\\)\$/g, (match) => {
        hiddenMath.push(match); return `___MATH_BLOCK_${hiddenMath.length - 1}___`;
    });

    // 🌟 4. DỌN DẸP VĂN BẢN VÀ LỌC DẤU XUYỆT THỪA (ĐÃ BỌC TOÁN NÊN RẤT AN TOÀN)
    text = text.replace(/(?:\r?\n[ \t]*){2,}/g, "\\\\");
    text = text.replace(/\\\$/g, "$\\$$");
    text = text.replace(/\\\\\\\\/g, "\\\\");

    // --> Chuyển đổi các ký tự escape để web hiển thị đúng
    text = text.replace(/\\%/g, "%"); // \% -> %
    text = text.replace(/\\&/g, "&"); // \& -> &
    text = text.replace(/\\#/g, "#"); // \# -> #
    text = text.replace(/\\_/g, "_"); // \_ -> _
    text = text.replace(/\\ /g, " "); // Dấu cách ép buộc \ -> khoảng trắng
    text = text.replace(/\\,/g, " "); // Khoảng cách nhỏ \, -> khoảng trắng

    // --> BẮT VÀ XÓA CÁC DẤU \ BỊ LẺ LOI NẰM CUỐI TỪ (Ví dụ x\, a\, 175\)
    text = text.replace(/(\S)\\(?=\s|[.,:;!?]|$)/g, "$1");

    // Khôi phục lại lõi toán học nguyên bản
    for (let i = hiddenMath.length - 1; i >= 0; i--) {
        text = text.replace(`___MATH_BLOCK_${i}___`, hiddenMath[i]);
    }

    return text.trim();
};


// =====================================================================
// HÀM 99.5: NẠP ẢNH TỪ DRIVE SANG GITHUB (ĐỒNG BỘ FIX LỖI DẤU XUYỆT)
// =====================================================================
window.ham_99_5_xu_ly_du_lieu_truoc_khi_push_nap_anh_tu_supabase_sang_github = async function (maDe = "CHUNG", idCauChinhXac = "", text) {
    if (!text || typeof text !== 'string' || text.trim() === "") return text;

    // 🌟 0. DỌN RÁC CƠ BẢN VÀ XÓA BỌC HÌNH ẢNH
    text = text.replace(/\\renewcommand\s*\{\s*\\arraystretch\s*\}\s*\{[^}]+\}/g, "");
    text = text.replace(/\\noindent\s*/g, "");
    text = text.replace(/\\centering\s*/g, "");
    text = text.replace(/\\hfill\s*/g, "");
    text = text.replace(/\\begin\{center\}/g, "");
    text = text.replace(/\\end\{center\}/g, "");
    text = text.replace(/\\begin\{figure\}\[.*?\]/g, "");
    text = text.replace(/\\begin\{figure\}/g, "");
    text = text.replace(/\\end\{figure\}/g, "");

    text = text.replace(/\|\s*\\overrightarrow\s*\{([^}]+)\}\s*\|/g, "\\left|\\overrightarrow{$1}\\right|");
    text = text.replace(/\|\s*\\vec\s*\{([^}]+)\}\s*\|/g, "\\left|\\vec{$1}\\right|");

    // 🌟 1. THUẬT TOÁN XỬ LÝ \heva, \hoac
    const tuKhoas = ["\\heva", "\\hoac"];
    const mos = ["\\left\\{\\begin{aligned}", "\\left[\\begin{aligned}"];
    const dongs = ["\\end{aligned}\\right.", "\\end{aligned}\\right."];

    for (let k = 0; k < tuKhoas.length; k++) {
        let keyword = tuKhoas[k];
        let startIdx;
        while ((startIdx = text.indexOf(keyword)) !== -1) {
            let contentStart = startIdx + keyword.length;
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
                    else if (text[i] === '}') { count--; if (count === 0) { contentEnd = i; break; } }
                }
                if (contentEnd !== -1) ruot = text.substring(firstCharIdx + 1, contentEnd);
            } else {
                for (let i = firstCharIdx; i < text.length; i++) {
                    let check = text.substring(i);
                    if (check.startsWith("\\Rightarrow") || check.startsWith("\\\\") || text[i] === '}') {
                        contentEnd = i; break;
                    }
                }
                if (contentEnd !== -1) ruot = text.substring(firstCharIdx, contentEnd);
            }

            if (contentEnd !== -1) {
                let phanDau = text.substring(0, startIdx);
                let phanDuoi = text.substring(coNgoacNhon ? contentEnd + 1 : contentEnd);
                text = phanDau + mos[k] + ruot + dongs[k] + phanDuoi;
            } else { break; }
        }
    }

    // 🌟 2. PHÂN TÁCH ĐỀ / GIẢI VÀ ĐỒNG BỘ ẢNH LÊN GITHUB
    let phanDe = text;
    let phanGiai = "";
    const chiMucLoiGiai = text.indexOf("\\loigiai");

    if (chiMucLoiGiai !== -1) {
        phanDe = text.substring(0, chiMucLoiGiai);
        phanGiai = text.substring(chiMucLoiGiai);
    }

    const xuLyAnhTungPhan = async (noiDung, isPhanGiai) => {
        const regexImg = /\[IMG:(.*?)\]|\\includegraphics(?:\[.*?\])?\{(.*?)\}/g;
        let match;
        let tempNoiDung = noiDung;
        let danhSachAnh = [];

        while ((match = regexImg.exec(noiDung)) !== null) {
            let fullTag = match[1] || match[2];
            let idFile = "";
            let tenFile = "";

            if (fullTag.includes('|')) {
                let parts = fullTag.split('|');
                idFile = parts[0].trim();
                tenFile = parts[1].trim();
            } else {
                idFile = fullTag.trim();
                tenFile = idFile + ".png";
            }

            danhSachAnh.push({
                fullMatch: match[0],
                id: idFile,
                ten: tenFile
            });
        }

        for (let anh of danhSachAnh) {
            let linkMoi = await window.ham_99_6_tai_anh_drive_va_push_github_tu_dong(maDe, idCauChinhXac, anh.ten, isPhanGiai);
            if (linkMoi) {
                tempNoiDung = tempNoiDung.replace(anh.fullMatch, `<br><img src="${linkMoi}" style="max-width:100%"/><br>`);
            }
        }
        return tempNoiDung;
    };

    phanDe = await xuLyAnhTungPhan(phanDe, false);
    phanGiai = await xuLyAnhTungPhan(phanGiai, true);
    text = phanDe + phanGiai;

    // 🌟 3. THUẬT TOÁN "BỌC LÕI" BẢO VỆ TOÁN HỌC
    let hiddenMath = [];

    text = text.replace(/\\begin\{(array|tabular|tikzpicture|aligned|eqnarray\*?|cases|[bpvB]matrix|matrix)\}[\s\S]*?\\end\{\1\}/g, (match) => {
        hiddenMath.push(match); return `___MATH_BLOCK_${hiddenMath.length - 1}___`;
    });
    text = text.replace(/(?<!\\)\$\$[\s\S]*?(?<!\\)\$\$/g, (match) => {
        hiddenMath.push(match); return `___MATH_BLOCK_${hiddenMath.length - 1}___`;
    });
    text = text.replace(/(?<!\\)\\\[[\s\S]*?(?<!\\)\\\]/g, (match) => {
        hiddenMath.push(match); return `___MATH_BLOCK_${hiddenMath.length - 1}___`;
    });
    text = text.replace(/(?<!\\)\$(?!\$)([\s\S]*?)(?<!\\)\$/g, (match) => {
        hiddenMath.push(match); return `___MATH_BLOCK_${hiddenMath.length - 1}___`;
    });

    // 🌟 4. DỌN DẸP VĂN BẢN (ĐỒNG BỘ NHƯ 99.4)
    text = text.replace(/(?:\r?\n[ \t]*){2,}/g, "\\\\");
    text = text.replace(/\\\$/g, "$\\$$");
    text = text.replace(/\\\\\\\\/g, "\\\\");

    text = text.replace(/\\%/g, "%");
    text = text.replace(/\\&/g, "&");
    text = text.replace(/\\#/g, "#");
    text = text.replace(/\\_/g, "_");
    text = text.replace(/\\ /g, " ");
    text = text.replace(/\\,/g, " ");

    // Bắt dấu backslash rác ở cuối từ
    text = text.replace(/(\S)\\(?=\s|[.,:;!?]|$)/g, "$1");

    for (let i = hiddenMath.length - 1; i >= 0; i--) {
        text = text.replace(`___MATH_BLOCK_${i}___`, hiddenMath[i]);
    }

    return text.trim();
};

/**
 * HÀM PHỤ TRỢ: Lấy từ Drive -> Nạp GitHub -> Trả về đường dẫn tương đối
 */
window.ham_99_6_tai_anh_drive_va_push_github_tu_dong = async function (maDe, idCauChinhXac, tenFileAnh, isPhanGiai) {
    console.log(`[DEBUG UPLOAD 99_6] Bắt đầu lấy ảnh từ Drive: ${tenFileAnh}`);
    
    if (typeof CFG_HE_THONG === 'undefined') return null;

    try {
        // [GỠ LỖI BƯỚC 3]: Kiểm tra payload gửi lên Apps Script
        console.log(`[DEBUG UPLOAD 99_6] Đang tải từ Drive] File: ${tenFileAnh}`);
        const resDrive = await fetch(CFG_HE_THONG.URL_APPS_SCRIPT_API_TONG_HOP, {
            method: "POST",
            body: JSON.stringify({ action: "get_image_base64", fileName: tenFileAnh, idCau: idCauChinhXac }),
        });
        
        const dataDrive = await resDrive.json();
        console.log(`[DEBUG UPLOAD 99_6] Dữ liệu từ Apps Script:`, dataDrive);
        
        
        if (dataDrive.status !== "success" || !dataDrive.base64Data) {
            console.error(`[DEBUG UPLOAD 99_6] Apps Script lỗi: ${dataDrive.message || 'Không rõ'}`);

            throw new Error("Apps Script không tìm thấy file trên Drive");
        }

        console.log(`[DEBUG UPLOAD 99_6] Đã lấy Base64 thành công cho: ${tenFileAnh}`);

        // Định tuyến thư mục theo cấu trúc của C#
        let duongDanTrenGithub = "";
        let duongDanRelativeWeb = "";

        if (isPhanGiai) {
            duongDanTrenGithub = `Ngan_Hang_Loi_Giai/HinhAnh_Chung/${tenFileAnh}`;
            duongDanRelativeWeb = `HinhAnh_Chung/${tenFileAnh}`;
        } else {
            duongDanTrenGithub = `Kho_De_Thi/${maDe}/HinhAnh/${tenFileAnh}`;
            duongDanRelativeWeb = `HinhAnh/${tenFileAnh}`;
        }

        console.log(`[DEBUG UPLOAD 99_6] Đang đẩy lên path: ${duongDanTrenGithub}`);
        
        const GITHUB_TOKEN = CFG_HE_THONG.GITHUB_TOKEN;
        const GITHUB_REPO = CFG_HE_THONG.GITHUB_REPO;
        const githubApiUrl = `https://api.github.com/repos/${GITHUB_REPO}/contents/${duongDanTrenGithub}`;
        const headers = { "Authorization": `Bearer ${GITHUB_TOKEN}`, "Content-Type": "application/json" };

        let shaCu = undefined;
        try {
            const checkRes = await fetch(githubApiUrl, { headers });
            if (checkRes.ok) shaCu = (await checkRes.json()).sha;
        } catch (e) { }

        // [GỠ LỖI BƯỚC 4]: Kiểm tra Response từ GitHub API
        const putRes = await fetch(githubApiUrl, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify({
                message: `Auto-sync: Nạp ảnh ${isPhanGiai ? 'Giải' : 'Đề'} ${tenFileAnh}`,
                content: dataDrive.base64Data,
                sha: shaCu
            })
        });

        if (!putRes.ok) throw new Error("GitHub từ chối lưu file (Lỗi Token hoặc Quota)");
        console.log(`[DEBUG UPLOAD 99_6] Đẩy thành công! Trả về link: HinhAnh/${tenFileAnh}`);
        return duongDanRelativeWeb;

    } catch (error) {
        console.error(`[DEBUG UPLOAD 99_6] Lỗi nạp ảnh ${tenFileAnh}]:`, error.message);
        return null; // Trả về null để chuỗi gốc không bị lỗi thay thế sai
    }
};
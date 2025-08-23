// src/utils/toneLocal.js
// 서버 없이 동작하는 로컬 어체 변환기

export async function rewriteTone(text, style) {
    return heuristicTransform(text, style);
  }
  
  export function heuristicTransform(input, style) {
    if (!input || style === "original") return input;
  
    let out = input;
  
    const endFix = (s) =>
      s
        .replace(/다\?(\s|$)/g, "합니까?$1")
        .replace(/다!(\s|$)/g, "합니다!$1")
        .replace(/다\.(\s|$)/g, "합니다.$1")
        .replace(/다(\s|$)/g, "합니다$1");
  
    if (style === "haeyo") {        // 존댓말(해요체)
      out = out
        .replace(/했습니다/g, "했어요")
        .replace(/합니다/g, "해요")
        .replace(/합니까\?/g, "해요?")
        .replace(/입니다/g, "예요")
        .replace(/이에요/g, "예요")
        .replace(/이야/g, "예요")
        .replace(/야(\s|$)/g, "예요$1")
        .replace(/했어/g, "했어요")
        .replace(/해(\s|$)/g, "해요$1");
      out = endFix(out);
    }
  
    if (style === "hamnida") {      // 존댓말(합니다체)
      out = out
        .replace(/했어요/g, "했습니다")
        .replace(/해요/g, "합니다")
        .replace(/합니까\?/g, "합니까?")
        .replace(/예요/g, "입니다")
        .replace(/이에요/g, "입니다")
        .replace(/이야/g, "입니다")
        .replace(/야(\s|$)/g, "입니다$1")
        .replace(/했어/g, "했습니다")
        .replace(/해(\s|$)/g, "합니다$1");
      out = endFix(out);
    }
  
    if (style === "banmal") {       // 반말
      out = out
        .replace(/했습니다/g, "했어")
        .replace(/했어요/g, "했어")
        .replace(/합니다/g, "해")
        .replace(/합니까\?/g, "해?")
        .replace(/입니다/g, "이야")
        .replace(/이에요/g, "이야")
        .replace(/예요/g, "이야")
        .replace(/합니다\.(\s|$)/g, "해.$1")
        .replace(/합니다(\s|$)/g, "해$1")
        .replace(/해요\.(\s|$)/g, "해.$1")
        .replace(/해요(\s|$)/g, "해$1")
        .replace(/다\?(\s|$)/g, "해?$1")
        .replace(/다!(\s|$)/g, "해!$1")
        .replace(/다\.(\s|$)/g, "해.$1")
        .replace(/다(\s|$)/g, "해$1");
    }
  
    return out;
  }
  
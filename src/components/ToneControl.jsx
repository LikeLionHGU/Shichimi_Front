// src/components/ToneControls.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { themeColors } from "../assets/styles/StyledComponents";
import { rewriteTone } from "../utils/toneLocal";

const ToneRow = styled.div`
  display: flex; align-items: center; gap: 8px; flex-wrap: wrap;
`;
const ToneChip = styled.button`
  border-radius: 9999px; padding: 8px 12px; font-weight: 600;
  border: 1px solid ${themeColors.gray.color};
  background: ${(p)=> p["data-active"] ? (themeColors.black?.color || "#111") : themeColors.white.color};
  color: ${(p)=> p["data-active"] ? themeColors.white.color : (themeColors.black?.color || "#111")};
  cursor: pointer;
`;
const SmallButton = styled.button`
  height: 36px; padding: 0 12px; border-radius: 8px; border: 1.5px solid #2C2C2C;
  background: #FFFFFF; color: #2C2C2C; font-weight: 700; font-size: 14px; cursor: pointer;
  &:hover:not(:disabled){ background: #588B49; color: #FFFDF5; border-color: #3D5F33; transform: translateY(-1px); }
  &:disabled{ opacity: .6; cursor: not-allowed; transform: none; }
`;
const Note = styled.p`
  margin: 6px 0 0 0; color: #2C2C2C; font-size: 14px; line-height: 1.5;
`;

export default function ToneControls({ body, setBody, maxLength = 400 }) {
  const [tone, setTone] = useState("original"); // "original" | "haeyo" | "hamnida" | "banmal"
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [snapshot, setSnapshot] = useState("");

  async function onApply() {
    if (!body.trim() || tone === "original") return;
    setBusy(true);
    setMsg("");
    try {
      if (!snapshot) setSnapshot(body);
      let out = await rewriteTone(body, tone);
      if (typeof out !== "string" || !out.trim()) out = body;

      if (out.length > maxLength) {
        out = out.slice(0, maxLength);
        setMsg(`최대 ${maxLength}자 제한으로 일부가 잘렸어요.`);
      } else {
        setMsg("어체 변환이 적용됐어요.");
      }
      setBody(out);
    } catch (e) {
      console.error("[ToneControls] apply error:", e);
      setMsg("변환 중 문제가 발생했어요. 잠시 후 다시 시도해주세요.");
    } finally {
      setBusy(false);
    }
  }

  function onRevert() {
    if (!snapshot) return;
    setBody(snapshot);
    setSnapshot("");
    setTone("original");
    setMsg("원문으로 되돌렸어요.");
  }

  return (
    <>
      <ToneRow>
        <ToneChip type="button" data-active={tone === "original"} onClick={()=> setTone("original")}>원문 그대로</ToneChip>
        <ToneChip type="button" data-active={tone === "haeyo"} onClick={()=> setTone("haeyo")}>존댓말(해요체)</ToneChip>
        <ToneChip type="button" data-active={tone === "hamnida"} onClick={()=> setTone("hamnida")}>존댓말(합니다체)</ToneChip>
        <ToneChip type="button" data-active={tone === "banmal"} onClick={()=> setTone("banmal")}>반말</ToneChip>

        <SmallButton
          type="button"
          onClick={onApply}
          disabled={!body.trim() || tone === "original" || busy}
          aria-live="polite"
        >
          {busy ? "변환 중…" : "변환 적용"}
        </SmallButton>

        <SmallButton type="button" onClick={onRevert} disabled={!snapshot || busy}>
          되돌리기
        </SmallButton>
      </ToneRow>

      {msg && <Note aria-live="polite">{msg}</Note>}
    </>
  );
}

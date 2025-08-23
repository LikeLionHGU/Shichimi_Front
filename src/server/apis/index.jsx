import express from "express";
import OpenAI from "openai";

const app = express();
app.use(express.json());

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * 어체 변환 엔드포인트 (Responses API 사용)
 * 요청: { text: string, style: "haeyo" | "hamnida" | "banmal" }
 * 응답: { result: string }
 */
app.post("/api/rewrite-style", async (req, res) => {
  const { text, style } = req.body ?? {};
  if (!text || !style) return res.status(400).json({ error: "text, style are required" });

  // 간단한 프롬프트 (필요시 시스템/지침을 더 정교화)
  const prompt = `다음 문장을 한국어 ${style} 말투로 자연스럽게 고쳐줘. 존중/안전 가이드라인을 지켜줘.\n\n원문:\n${text}`;

  const r = await client.responses.create({
    model: "gpt-4o-mini",
    input: prompt,
    // store: false, // 상태 저장이 필요 없으면 기본(생략)
  });

  // SDK 편의 필드: 모든 텍스트를 합친 문자열
  // (공식 문서의 output_text 참고)
  const out = r.output_text ?? "";
  res.json({ result: out });
});

app.listen(3001, () => console.log("API server on http://localhost:3001"));

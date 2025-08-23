// netlify/functions/classify-category.js
import OpenAI from "openai";

const CATEGORY_LABELS = ["썰", "팁", "사건/사고", "기념", "자랑", "리뷰", "질문", "인사이트"];
const SERVER_LABEL_MAP = { "사건/사고": "사건사고" };

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  try {
    if (!process.env.OPENAI_API_KEY) {
      return { statusCode: 500, body: JSON.stringify({ error: "missing-openai-key" }) };
    }

    const { text } = JSON.parse(event.body || "{}");
    if (!text || text.trim().length < 10) {
      return { statusCode: 400, body: JSON.stringify({ error: "text-too-short" }) };
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const prompt = [
      { role: "system", content: "너는 한국어 글을 아래 카테고리 중 하나로 분류하는 분류기야." },
      { role: "user", content:
`카테고리 후보: ${CATEGORY_LABELS.join(", ")}
본문을 읽고 label을 하나만 골라줘. 반드시 후보 중 하나여야 해.

본문:
${text}` }
    ];

    const schema = {
      type: "object",
      properties: {
        label: { type: "string", enum: CATEGORY_LABELS },
        confidence: { type: "number", minimum: 0, maximum: 1 }
      },
      required: ["label", "confidence"], // ← 여기!
      additionalProperties: false
    };

    const r = await client.responses.create({
      model: "gpt-4o-mini",
      input: prompt,
      // 새 스펙: text.format 안에 name/schema/strict
      text: { format: { type: "json_schema", name: "CategoryPrediction", schema, strict: true } }
      // (선택) temperature: 0.2
    });

    // 구조화 출력 파싱
    let parsed = r?.output_parsed;
    if (!parsed) {
      const outText =
        r?.output_text ??
        (Array.isArray(r?.output)
          ? r.output.map(o =>
              Array.isArray(o?.content) ? o.content.map(c => c?.text?.value || "").join("") : ""
            ).join("")
          : "");
      if (outText) { try { parsed = JSON.parse(outText); } catch {} }
    }
    if (!parsed?.label) throw new Error("no-structured-output");

    let { label, confidence = 0.7 } = parsed;
    if (!CATEGORY_LABELS.includes(label)) label = "썰";
    const serverLabel = SERVER_LABEL_MAP[label] ?? label;

    return { statusCode: 200, body: JSON.stringify({ label, serverLabel, confidence }) };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: "openai-error", detail: e?.message || String(e) }) };
  }
}

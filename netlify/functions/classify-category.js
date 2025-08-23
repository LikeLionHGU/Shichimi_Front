const OpenAI = require("openai");

const CATEGORY_LABELS = ["썰","팁","사건/사고","기념","자랑","리뷰","질문","인사이트"];
const SERVER_LABEL_MAP = { "사건/사고": "사건사고" };

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  try {
    // 1) 키 존재 여부 먼저
    if (!process.env.OPENAI_API_KEY) {
      return { statusCode: 500, body: JSON.stringify({ error: "missing-openai-key" }) };
    }

    const { text } = JSON.parse(event.body || "{}");
    if (!text || text.trim().length < 10) {
      return { statusCode: 400, body: JSON.stringify({ error: "text-too-short" }) };
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    // 2) Responses API 호출
    const jsonSchema = {
      name: "CategoryPrediction",
      schema: {
        type: "object",
        properties: {
          label: { type: "string", enum: CATEGORY_LABELS },
          confidence: { type: "number", minimum: 0, maximum: 1 }
        },
        required: ["label"],
        additionalProperties: false
      },
      strict: true
    };

    const prompt = [
      { role: "system", content: "너는 한국어 글을 아래 카테고리 중 하나로 분류하는 분류기야." },
      { role: "user", content:
`카테고리 후보: ${CATEGORY_LABELS.join(", ")}
본문을 읽고 label을 하나만 골라줘. 반드시 후보 중 하나여야 해.

본문:
${text}` }
    ];

    const r = await client.responses.create({
      model: "gpt-4o-mini",
      input: prompt,
      response_format: { type: "json_schema", json_schema: jsonSchema }
    });

    // 3) SDK 버전별 파싱 안전장치
    let parsed = null;

    // a) 최신 SDK: output_parsed 기대
    if (r && r.output_parsed) parsed = r.output_parsed;

    // b) 텍스트가 있다면 JSON 파싱 시도
    if (!parsed) {
      const tryText =
        r?.output_text ||
        (Array.isArray(r?.output) ? r.output.map(
          o => Array.isArray(o?.content) ? o.content.map(c => c?.text?.value || "").join("")
                                        : ""
        ).join("") : "");
      if (tryText) {
        try { parsed = JSON.parse(tryText); } catch {}
      }
    }

    if (!parsed || !parsed.label) {
      throw new Error("no-structured-output");
    }

    let { label, confidence = 0.7 } = parsed;
    if (!CATEGORY_LABELS.includes(label)) label = "썰";
    const serverLabel = SERVER_LABEL_MAP[label] ?? label;

    return { statusCode: 200, body: JSON.stringify({ label, serverLabel, confidence }) };
  } catch (e) {
    // 🔎 디버깅용으로 상세 메시지 노출 (문제 해결 후 이 부분은 다시 간략화 권장)
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "openai-error",
        detail: e?.message || String(e)
      })
    };
  }
};

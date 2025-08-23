// netlify/functions/classify-category.js
const OpenAI = require("openai");

const CATEGORY_LABELS = ["썰","팁","사건/사고","기념","자랑","리뷰","질문","인사이트"];
const SERVER_LABEL_MAP = { "사건/사고": "사건사고" };

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  try {
    const { text } = JSON.parse(event.body || "{}");
    if (!text || text.trim().length < 10) {
      return { statusCode: 400, body: JSON.stringify({ error: "text-too-short" }) };
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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
${text}`
      }
    ];

    const r = await client.responses.create({
      model: "gpt-4o-mini",
      input: prompt,
      response_format: { type: "json_schema", json_schema: jsonSchema }
    });
    // Responses API: SDK가 구조화된 결과를 output_parsed에 제공합니다.
    // (참고: Responses API / Structured Outputs) 
    // https://platform.openai.com/docs/api-reference/responses
    // https://platform.openai.com/docs/guides/structured-outputs
    const parsed = r.output_parsed ?? JSON.parse(r.output_text || "{}");

    let { label, confidence = 0.7 } = parsed || {};
    if (!CATEGORY_LABELS.includes(label)) label = "썰";
    const serverLabel = SERVER_LABEL_MAP[label] ?? label;

    return { statusCode: 200, body: JSON.stringify({ label, serverLabel, confidence }) };
  } catch (e) {
    console.error(e);
    return { statusCode: 500, body: JSON.stringify({ error: "openai-error" }) };
  }
};

exports.handler = async (event, context) => {
  // ms 쿼리 파라미터: 기본 5000, 0~30000 사이로 제한
  const rawMs = (event.queryStringParameters && event.queryStringParameters.ms) || "5000";
  const msNum = Number(rawMs);
  const ms = Math.min(Math.max(Number.isFinite(msNum) ? msNum : 5000, 0), 30000);

  // (선택) 추적용 태그/식별자
  const tag = (event.queryStringParameters && event.queryStringParameters.tag) || "";
  const ts = (event.queryStringParameters && event.queryStringParameters.ts) || "";

  // 서버측 로그 (Netlify logs에서 확인 가능)
  console.log(JSON.stringify({ path: event.path, ms, tag, ts, ua: event.headers["user-agent"] || "" }));

  // sleep
  await new Promise((r) => setTimeout(r, ms));

  // 1x1 transparent GIF (base64)
  const b64 = "R0lGODlhAQABAPAAAP///wAAACwAAAAAAQABAAACAkQBADs=";

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "image/gif",
      "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      "Pragma": "no-cache",
      "Expires": "0",
      "Access-Control-Allow-Origin": "*"
    },
    body: b64,
    isBase64Encoded: true
  };
};

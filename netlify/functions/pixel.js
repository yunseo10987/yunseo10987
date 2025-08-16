exports.handler = async (event, context) => {
  // 무조건 5초 대기
  await new Promise((r) => setTimeout(r, 3000));

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

export function createResponse(code, data, meta, success, message) {
  const jsonResponse = {
    data: data,
    meta: meta,
    success: success,
    message: message,
  };
  return new Response(jsonResponse, {
    headers: { "Content-Type": "application/json", status: code },
  });
}

export function createResponseFromResultSet(resultset) {
  const jsonResponse = {
    data: resultset["data"],
    meta: resultset["meta"],
    success: resultset["success"],
    message: resultset["message"],
  };

  if (resultset["success"]) {
    return new Response(JSON.stringify(jsonResponse), {
      headers: { "Content-Type": "application/json", status: 200 },
    });
  } else {
    return new Response(JSON.stringify(jsonResponse), {
      headers: { "Content-Type": "application/json", status: 502 },
    });
  }
}

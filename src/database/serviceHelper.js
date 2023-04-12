export function createResultSet(data, meta, success, message) {

  const set = { "data": data, "meta": meta, "success": success, "message": message };
  console.log("serviceHelper Resultset...")
  console.log(set)
  return set;
}

export function createError(message) {
    return {"data": [], "meta": {}, "success": false, "message": message}
}
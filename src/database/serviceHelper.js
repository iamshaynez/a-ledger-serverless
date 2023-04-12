export function createResultSet(data, meta, success, message) {

  const set = { "data": data, "meta": meta, "success": success, "message": message };
  console.log("serviceHelper Resultset...")
  console.log(set)
  return set;
}

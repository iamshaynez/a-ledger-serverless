import { parsePath } from '../utils';
import { handleAccount } from "./account";

export function getAPIHandler(request, env) {
  const path = parsePath(request);
  const { method } = request;

  if (path.startsWith("/api/accounts")) {
    return handleAccount(request, env);
  }

  return null;
}

import { handleAccount } from "./account";

export function getHandler(path) {
  switch (path) {
    case '/account':
      return handleAccount;
    default:
      return null;
  }
}
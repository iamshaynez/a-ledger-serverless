import { accountService } from "../database/account";
import { createResponseFromResultSet } from "./apiHelper";

// handles with URI start with /api/accounts
export async function handleAccount(request, env) {
  const { method } = request;

  switch (method) {
    case "GET":
      return getAccounts(env);
    case "POST":
      return createAccount(request, env);
    case "PUT":
      return updateAccount(request, env);
    case "DELETE":
      return deleteAccount(request, env);
    default:
      return new Response("Method not allowed", { status: 405 });
  }
}

async function getAccounts(env) {
  const service = new accountService(env);

  const resultset = await service.listAccounts();
  
  return createResponseFromResultSet(resultset);
}

async function createAccount(request, env) {
  const service = new accountService(env);
  const requestBody = await request.json();
  const info = await service.createAccount(requestBody)
  
  return new Response('Account created', { status: 201 });
}

async function updateAccount(request, env) {
  // 更新账户
}

async function deleteAccount(request, env) {
  // 删除账户
}

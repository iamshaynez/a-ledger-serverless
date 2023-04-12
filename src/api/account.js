import { accountService } from "../database/account";
import { createResponseFromResultSet, createErrorResponse } from "./apiHelper";

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
      return createErrorResponse(405, "Method not supported.");
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
  const resultset = await service.createAccount(requestBody);

  return createResponseFromResultSet(resultset);
}

async function updateAccount(request, env) {
  // 更新账户
  const service = new accountService(env);
  const requestBody = await request.json();
  const resultset = await service.updateAccount(requestBody);
  return createResponseFromResultSet(resultset);
}

async function deleteAccount(request, env) {
  // 删除账户
  const service = new accountService(env);
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  console.log("Find the id for delete: " + id)
  const resultset = await service.deleteAccount(id)

  return createResponseFromResultSet(resultset);
}

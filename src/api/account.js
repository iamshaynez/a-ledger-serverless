import { accountService } from "../database/account";

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

  const res = await service.listAccounts();

  return new Response(res, {
    headers: { "Content-Type": "application/json" },
  });
}

async function createAccount(request, env) {
  // const requestBody = await request.json();
  // const { username, email, password } = requestBody;
  // if (!username || !email || !password) {
  //   return new Response('Missing required fields', { status: 400 });
  // }
  // const created_at = new Date().toISOString();
  // try {
  //   await db.run(
  //     'INSERT INTO account (username, email, password, created_at) VALUES (?, ?, ?, ?)',
  //     [username, email, password, created_at]
  //   );
  // } catch (error) {
  //   return new Response('Error creating account', { status: 500 });
  // }
  // return new Response('Account created', { status: 201 });
}

async function updateAccount(request, env) {
  // 更新账户
}

async function deleteAccount(request, env) {
  // 删除账户
}

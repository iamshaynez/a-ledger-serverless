

export async function handleAccount(request, db) {
    const { method } = request;
  
    switch (method) {
      case 'GET':
        return getAccounts(db);
      case 'POST':
        return createAccount(request, db);
      case 'PUT':
        return updateAccount(request, db);
      case 'DELETE':
        return deleteAccount(request, db);
      default:
        return new Response('Method not allowed', { status: 405 });
    }
}


async function getAccounts(db) {
    const accounts = await db.all('SELECT * FROM account');
    return new Response(JSON.stringify(accounts), {
      headers: { 'Content-Type': 'application/json' },
    });
}
  
async function createAccount(request, db) {
    const requestBody = await request.json();
    const { username, email, password } = requestBody;
  
    if (!username || !email || !password) {
      return new Response('Missing required fields', { status: 400 });
    }
  
    const created_at = new Date().toISOString();
  
    try {
      await db.run(
        'INSERT INTO account (username, email, password, created_at) VALUES (?, ?, ?, ?)',
        [username, email, password, created_at]
      );
    } catch (error) {
      return new Response('Error creating account', { status: 500 });
    }
  
    return new Response('Account created', { status: 201 });
}


async function updateAccount(request, db) {
    // 更新账户
}
  
async function deleteAccount(request, db) {
    // 删除账户
}
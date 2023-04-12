import { getDB } from "../utils";
import { createResultSet } from "./serviceHelper";

export class accountService {
  constructor(env) {
    this.db = getDB(env);
  }

  async listAccounts() {
    try {
      const result = await this.db.prepare("SELECT * FROM account").all();
      return createResultSet(result["results"], result["meta"], result["success"], "Read database success.");
    } catch (error) {
      return createResultSet([], [], false, "Error querying database. " + error);
    }
  }

  async createAccount(requestBody) {
    const { account_name, account_type, account_status, start_balance } =
      requestBody;

    if (!account_name || !account_type || !account_status || !start_balance) {
      return new Response("Missing required fields", { status: 400 });
    }

    const created_date = new Date().toISOString();
    const recon_date = new Date().toISOString();

    try {
      const info = await this.db
        .prepare(
          "INSERT INTO account (account_name, account_type, account_status, start_balance, created_date, recon_date) VALUES (?1, ?2, ?3, ?4, ?5, ?6)"
        )
        .bind(
          account_name,
          account_type,
          account_status,
          start_balance,
          created_date,
          recon_date
        )
        .run();

      return JSON.stringify(info);
    } catch (error) {
      return new Response("Error creating account", { status: 500 });
    }
  }
}

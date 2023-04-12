import { getDB } from "../utils";
import { createResultSet, createError } from "./serviceHelper";

export class accountService {
  constructor(env) {
    this.db = getDB(env);
  }

  async listAccounts() {
    try {
      const result = await this.db.prepare("SELECT * FROM account").all();
      return createResultSet(
        result["results"],
        result["meta"],
        result["success"],
        "Read database success."
      );
    } catch (error) {
      return createError("Error querying database. " + error);
    }
  }

  async getAccount(id) {
    try {
      const result = await this.db
        .prepare("SELECT * FROM account WHERE id = ?1")
        .bind(id)
        .all();

      if (result["results"].length != 1) {
        return createError("Invalid ID to get Account.");
      }

      return createResultSet(
        result["results"],
        result["meta"],
        result["success"],
        "Read database success."
      );
    } catch (error) {
      return createError("Error querying database. " + error);
    }
  }

  async updateAccount(requestBody) {
    const {
      id,
      account_name,
      account_type,
      account_status,
      start_balance,
      recon_date,
    } = requestBody;
    if (!id) {
      return createError("Cannot update without ID.");
    }

    const resultset = await this.getAccount(id);
    if (!resultset.success) {
      return createError("Cannot update with invalid ID.");
    }

    const existingAccount = resultset.data[0];

    const updated_account_name = account_name || existingAccount.account_name;
    const updated_account_type = account_type || existingAccount.account_type;
    const updated_account_status =
      account_status || existingAccount.account_status;
    const updated_start_balance =
      start_balance || existingAccount.start_balance;
    const updated_recon_date = recon_date || existingAccount.recon_date;

    try {
      const info = await this.db
        .prepare(
          "UPDATE account SET account_name=?1, account_type=?2, account_status=?3, start_balance=?4, recon_date=?5 WHERE id = ?6"
        )
        .bind(
          updated_account_name,
          updated_account_type,
          updated_account_status,
          updated_start_balance,
          updated_recon_date,
          id
        )
        .run();
      return createResultSet([], info["meta"], true, "Account Updated.");
    } catch (error) {
      return createError("Update account failed. " + error);
    }
  }

  async deleteAccount(id) {
    if (!id) {
      return createError("Cannot delete without account ID.");
    }

    try {
      const info = await this.db
        .prepare("DELETE FROM account WHERE id = ?1")
        .bind(id)
        .run();
      console.log(info);
      if (info["meta"]["changes"] != 1) {
        return createResultSet(
          [],
          info["meta"],
          false,
          "Unexpected deletion changes: " + info["meta"]["changes"]
        );
      } else {
        return createResultSet([], info["meta"], true, "Account deleted.");
      }
    } catch (error) {
      return createError("Error when deleting account. " + error);
    }
  }

  async createAccount(requestBody) {
    const { account_name, account_type, account_status, start_balance } =
      requestBody;

    if (!account_name || !account_type || !account_status || !start_balance) {
      return createError("Missing required fields...");
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

      return createResultSet([], info["meta"], true, "New Account Created.");
    } catch (error) {
      return createError("Error when creating account. " + error);
    }
  }
}

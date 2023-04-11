import { getDB } from "../utils";

export class accountService {
    constructor(env){
        this.db = getDB(env)
    }

    async listAccounts() {
        const result = await this.db.prepare('SELECT * FROM account').all();
        const res = JSON.stringify(result)
        //console.log(res)
        return JSON.stringify(result)
    }
}
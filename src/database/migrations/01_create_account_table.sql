-- /src/database/migrations/01_create_account_table.sql
CREATE TABLE IF NOT EXISTS account (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    account_type TEXT NOT NULL,
    account_status INTEGER NOT NULL,
    start_balance REAL NOT NULL,
    created_date DATE NOT NULL,
    recon_date DATE
);
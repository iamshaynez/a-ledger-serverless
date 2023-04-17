-- /src/database/migrations/01_create_account_table.sql
DROP TABLE IF EXISTS account;
CREATE TABLE IF NOT EXISTS account (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    account_name TEXT NOT NULL,
    account_desc TEXT,
    account_type TEXT NOT NULL,
    account_status INTEGER NOT NULL,
    account_currency TEXT NOT NULL,
    start_balance REAL NOT NULL,
    created_date DATE NOT NULL,
    recon_date DATE
);
DROP TABLE IF EXISTS account_type;
CREATE TABLE IF NOT EXISTS account_type (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    account_type TEXT NOT NULL,
    balance_type TEXT NOT NULL,
    balance_multiplier INTEGER NOT NULL,
    liquidity_type TEXT NOT NULL
);

INSERT INTO account_type (account_type, balance_type, balance_multiplier, liquidity_type) VALUES ('现金','A', 1,'L');
INSERT INTO account_type (account_type, balance_type, balance_multiplier, liquidity_type) VALUES ('短期投资','A', 1,'L');
INSERT INTO account_type (account_type, balance_type, balance_multiplier, liquidity_type) VALUES ('长期投资','A', 1,'N');
INSERT INTO account_type (account_type, balance_type, balance_multiplier, liquidity_type) VALUES ('固定资产','A', 1,'N');
INSERT INTO account_type (account_type, balance_type, balance_multiplier, liquidity_type) VALUES ('长期负债','L', -1,'N');
INSERT INTO account_type (account_type, balance_type, balance_multiplier, liquidity_type) VALUES ('短期负债','L', -1,'L');

DROP VIEW IF EXISTS v_account;
CREATE VIEW IF NOT EXISTS v_account AS select a.id, a.account_name, a.account_desc, a.account_type, a.account_currency, t.balance_type, t.balance_multiplier, 
t.liquidity_type, a.account_status, a.start_balance, a.created_date, a.recon_date FROM account a LEFT JOIN account_type t ON a.account_type = t.account_type;

DROP VIEW IF EXISTS v_account_total;
CREATE VIEW IF NOT EXISTS v_account_total AS SELECT a.id, a.account_name, a.account_desc, a.account_type, a.balance_type, a.account_currency, a.balance_multiplier, 
a.liquidity_type, a.account_status, a.start_balance as balance, a.created_date, a.recon_date FROM v_account a;
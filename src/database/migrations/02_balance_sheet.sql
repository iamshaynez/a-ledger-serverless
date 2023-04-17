DROP VIEW IF EXISTS v_asset;
CREATE VIEW IF NOT EXISTS v_asset AS SELECT * FROM v_account WHERE balance_type='A';

DROP VIEW IF EXISTS v_liability;
CREATE VIEW IF NOT EXISTS v_liability AS SELECT * FROM v_account WHERE balance_type='L';

DROP VIEW IF EXISTS v_equity_l;
CREATE VIEW IF NOT EXISTS v_equity_l AS SELECT -1 as id, '权益-流动性' as account_name, '权益-流动性' as account_desc, 
'权益' as account_type, 'E' as balance_type, 1 as balance_multiplier, 'L' as liquidity_type, 1 as account_status, SUM(balance * balance_multiplier) as balance, account_currency
FROM v_account_total WHERE liquidity_type = 'L' GROUP BY account_currency;

DROP VIEW IF EXISTS v_equity_n;
CREATE VIEW IF NOT EXISTS v_equity_n AS SELECT -1 as id, '权益-流动性' as account_name, '权益-流动性' as account_desc, 
'权益' as account_type, 'E' as balance_type, 1 as balance_multiplier, 'L' as liquidity_type, 1 as account_status, SUM(balance * balance_multiplier) as balance, account_currency
FROM v_account_total WHERE liquidity_type = 'N' GROUP BY account_currency;
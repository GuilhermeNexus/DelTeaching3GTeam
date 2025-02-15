DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'Balances') THEN
        CREATE TYPE account_type AS ENUM ('PAYMENT', 'CURRENT');
        CREATE TYPE holder_type AS ENUM ('NATURAL', 'LEGAL');
        CREATE TYPE account_status AS ENUM ('ACTIVE', 'BLOCKED', 'FINISHED');
        CREATE TYPE transaction_type AS ENUM ('CREDIT', 'DEBIT', 'AMOUNT_HOLD', 'AMOUNT_RELEASE');
        CREATE TYPE account_holder_type AS ENUM ('LEGAL', 'NATURAL');
        CREATE TYPE counterparty_account_type AS ENUM ('PAYMENT', 'CURRENT');
        CREATE TYPE counterparty_holder_type AS ENUM ('LEGAL', 'NATURAL');
       
        CREATE SCHEMA IF NOT EXISTS BankAccounts;
 
        CREATE TABLE IF NOT EXISTS BankAccounts.BankAccounts (
            Id SERIAL PRIMARY KEY,
            Branch VARCHAR(5),
            Number VARCHAR(10) UNIQUE,
            Type account_type,
            HolderName VARCHAR(200),
            HolderEmail VARCHAR(200),
            HolderDocument VARCHAR(100),
            HolderType holder_type,
            Status account_status,
            CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
 
        CREATE TABLE IF NOT EXISTS BankAccounts.Balances (
            BankAccountId INT PRIMARY KEY,
            AvailableAmount DECIMAL,
            BlockedAmount DECIMAL,
            CONSTRAINT fk_bankaccount FOREIGN KEY (BankAccountId)
            REFERENCES BankAccounts.BankAccounts(Id)
        );
 
        CREATE SCHEMA IF NOT EXISTS Transactions;
       
        CREATE TABLE IF NOT EXISTS Transactions.Transactions (
            Id SERIAL PRIMARY KEY,
            Type transaction_type,
            Amount DECIMAL,
            BankAccountId INT,
            CounterpartyBankCode VARCHAR(3),
            CounterpartyBankName VARCHAR(100),
            CounterpartyBranch VARCHAR(5),
            CounterpartyAccountNumber VARCHAR(10),
            CounterpartyAccountType counterparty_account_type,
            CounterpartyHolderName VARCHAR(200),
            CounterpartyHolderType counterparty_holder_type,
            CounterpartyHolderDocument VARCHAR(100),
            CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT fk_bankaccount FOREIGN KEY (BankAccountId) REFERENCES BankAccounts.BankAccounts(Id)
        );
    END IF;
END $$;
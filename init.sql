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
            id SERIAL PRIMARY KEY,
            branch VARCHAR(5),
            number VARCHAR(10) UNIQUE,
            type account_type,
            holderName VARCHAR(200),
            holderEmail VARCHAR(200),
            holderDocument VARCHAR(100),
            holderType holder_type,
            status account_status,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS BankAccounts.Balances (
            bankAccountId INT PRIMARY KEY,
            availableAmount DECIMAL,
            blockedAmount DECIMAL,
            CONSTRAINT fk_bankaccount FOREIGN KEY (bankAccountId)
            REFERENCES BankAccounts.BankAccounts(id)
        );

        CREATE SCHEMA IF NOT EXISTS Transactions;
        
        CREATE TABLE IF NOT EXISTS Transactions.Transactions (
            id SERIAL PRIMARY KEY,
            type transaction_type,
            amount DECIMAL,
            bankAccountId INT,
            counterpartyBankCode VARCHAR(3),
            counterpartyBankName VARCHAR(100),
            counterpartyBranch VARCHAR(5),
            counterpartyAccountNumber VARCHAR(10),
            counterpartyAccountType counterparty_account_type,
            counterpartyHolderName VARCHAR(200),
            counterpartyHolderType counterparty_holder_type,
            counterpartyHolderDocument VARCHAR(100),
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT fk_bankaccount FOREIGN KEY (bankAccountId) REFERENCES BankAccounts.BankAccounts(id)
        );
    END IF;
END $$;
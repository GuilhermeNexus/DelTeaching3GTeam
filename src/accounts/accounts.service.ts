// src/accounts/accounts.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import { CreateAccountDto } from './dto/create-account.dto';
import { TransactionsService } from '../transactions/transactions.service';
import { TransferDto } from '../transactions/dto/transfer.dto';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    private readonly transactionsService: TransactionsService,
  ) {}

  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    const account = this.accountRepository.create({
      ...createAccountDto,
      account_number: this.generateAccountNumber(),
      status: 'ACTIVE',
    });
    return this.accountRepository.save(account);
  }

  async findOne(accountNumber: string): Promise<Account> {
    const account = await this.accountRepository.findOne({ where: { account_number: accountNumber } });
    if (!account) {
      throw new Error('Account not found');
    }
    return account;
  }
  
  async updateEmail(accountNumber: string, email: string): Promise<Account> {
    const account = await this.findOne(accountNumber);
    account.holder_email = email;
    return this.accountRepository.save(account);
  }

  async updateStatus(accountNumber: string, status: string): Promise<Account> {
    const account = await this.findOne(accountNumber);
    account.status = status;
    return this.accountRepository.save(account);
  }

  async closeAccount(accountNumber: string): Promise<Account> {
    return this.updateStatus(accountNumber, 'FINISHED');
  }

  async initiateTransfer(transferDto: TransferDto): Promise<string> {
    const account = await this.findOne(transferDto.accountNumber);
    if (account.status !== 'ACTIVE') {
      throw new Error('Account is not active');
    }

    return this.transactionsService.initiateTransfer(transferDto);
  }

  private generateAccountNumber(): string {
    return Math.random().toString().slice(2, 12);
  }
}
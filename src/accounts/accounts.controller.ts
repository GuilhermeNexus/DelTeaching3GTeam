import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { TransferDto } from '../transactions/dto/transfer.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('accounts')
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post(':create')
  @ApiOperation({ summary: 'Cria uma nova conta bancária' })
  @ApiResponse({ status: 201, description: 'Conta criada com sucesso.' })
  @ApiBody({ type: CreateAccountDto })
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountsService.create(createAccountDto);
  }

  @Get(':accountNumber')
  @ApiOperation({ summary: 'Busca uma conta bancária pelo número da conta' })
  @ApiResponse({ status: 200, description: 'Conta encontrada.' })
  @ApiResponse({ status: 404, description: 'Conta não encontrada.' })
  @ApiParam({ name: 'accountNumber', type: String, description: 'Número da conta' })
  findOne(@Param('accountNumber') accountNumber: string) {
    return this.accountsService.findOne(accountNumber);
  }

  @Put(':accountNumber/email')
  @ApiOperation({ summary: 'Atualiza o e-mail do titular da conta' })
  @ApiResponse({ status: 200, description: 'E-mail atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Conta não encontrada.' })
  @ApiParam({ name: 'accountNumber', type: String, description: 'Número da conta' })
  @ApiBody({ type: UpdateAccountDto })
  updateEmail(@Param('accountNumber') accountNumber: string, @Body('email') email: string) {
    return this.accountsService.updateEmail(accountNumber, email);
  }

  @Put(':accountNumber/status')
  @ApiOperation({ summary: 'Atualiza o status da conta bancária' })
  @ApiResponse({ status: 200, description: 'Status atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Conta não encontrada.' })
  @ApiParam({ name: 'accountNumber', type: String, description: 'Número da conta' })
  @ApiBody({ type: UpdateAccountDto })
  updateStatus(@Param('accountNumber') accountNumber: string, @Body('status') status: string) {
    return this.accountsService.updateStatus(accountNumber, status);
  }

  @Delete(':accountNumber')
  @ApiOperation({ summary: 'Encerra uma conta bancária' })
  @ApiResponse({ status: 200, description: 'Conta encerrada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Conta não encontrada.' })
  @ApiParam({ name: 'accountNumber', type: String, description: 'Número da conta' })
  closeAccount(@Param('accountNumber') accountNumber: string) {
    return this.accountsService.closeAccount(accountNumber);
  }

  @Post('transfer')
  @ApiOperation({ summary: 'Inicia uma transferência entre contas' })
  @ApiResponse({ status: 200, description: 'Transferência em processamento.' })
  @ApiResponse({ status: 404, description: 'Conta não encontrada.' })
  @ApiBody({ type: TransferDto })
  initiateTransfer(@Body() transferDto: TransferDto) {
    return this.accountsService.initiateTransfer(transferDto);
  }
}
import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountDto {
  @ApiProperty({ example: '001', description: 'Número da agência' })
  agency: string;

  @ApiProperty({ example: 'CURRENT', description: 'Tipo da conta (CURRENT ou PAYMENT)' })
  type: string;

  @ApiProperty({ example: 'João Silva', description: 'Nome do titular da conta' })
  holder_name: string;

  @ApiProperty({ example: 'joao@example.com', description: 'E-mail do titular da conta' })
  holder_email: string;

  @ApiProperty({ example: '12345678901', description: 'Documento do titular da conta' })
  holder_document: string;

  @ApiProperty({ example: 'NATURAL', description: 'Tipo do titular (NATURAL ou LEGAL)' })
  holder_type: string;
}
import { ApiProperty } from '@nestjs/swagger';

export class TransferDto {
  @ApiProperty({ example: '1234567890', description: 'Número da conta de origem' })
  accountNumber: string;

  @ApiProperty({ example: 100, description: 'Valor da transferência' })
  amount: number;

  @ApiProperty({ example: '98765432109', description: 'Documento do titular da conta de destino' })
  counterpartDocument: string;
}
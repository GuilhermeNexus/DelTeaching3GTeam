import { ApiProperty } from '@nestjs/swagger';

export class UpdateAccountDto {
  @ApiProperty({ example: 'novoemail@example.com', description: 'Novo e-mail do titular da conta', required: false })
  email?: string;

  @ApiProperty({ example: 'ACTIVE', description: 'Novo status da conta (ACTIVE, BLOCKED ou FINISHED)', required: false })
  status?: string;
}
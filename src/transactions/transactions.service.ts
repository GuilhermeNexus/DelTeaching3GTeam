import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport, ClientOptions } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { TransferDto } from './dto/transfer.dto';

@Injectable()
export class TransactionsService {
  private client: ClientProxy;

  constructor(private configService: ConfigService) { 
    const rabbitMqUrl = this.configService.get<string>('RABBITMQ_URL')

    if (!rabbitMqUrl) {
      throw new Error('RABBITMQ_URL is not defined in environment variables');
    }

    const clientOptions: ClientOptions = {
      transport: Transport.RMQ,
      options: {
        urls: [rabbitMqUrl],
        queue: 'core-transactions.in',
        queueOptions: {
          durable: true,
        },
      },
    };

    this.client = ClientProxyFactory.create(clientOptions);
  }

  async initiateTransfer(transferDto: TransferDto): Promise<string> {
    await this.client.emit('transaction', transferDto).toPromise();
    return 'Transfer is being processed';
  }
}
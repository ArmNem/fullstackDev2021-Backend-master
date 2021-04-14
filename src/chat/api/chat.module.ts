import { Module, Post } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from '../core/services/chat.service';
import { IChatServiceProvider } from '../core/primary-ports/chat.service.interface';
import { TypeOrmModule } from '@nestjs/typeorm';
import Client from '../infrastructure/entities/client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  providers: [
    ChatGateway,
    { provide: IChatServiceProvider, useClass: ChatService },
  ],
})
export class ChatModule {}

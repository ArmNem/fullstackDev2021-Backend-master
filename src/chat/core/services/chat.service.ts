import { Injectable, Post } from '@nestjs/common';
import { ChatClientModule } from '../models/chat.client.module';
import { ChatMessage } from '../models/chat-message.model';
import { IChatService } from '../primary-ports/chat.service.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Client from '../../infrastructure/entities/client.entity';

@Injectable()
export class ChatService implements IChatService {
  allMessages: ChatMessage[] = [];
  clients: ChatClientModule[] = [];

  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  newMessage(message: string, clientID: string): ChatMessage {
    const client = this.clients.find((c) => c.id === clientID);
    const chatMessage: ChatMessage = { message: message, sender: client };
    this.allMessages.push(chatMessage);
    return chatMessage;
  }

  getMessages(): ChatMessage[] {
    return this.allMessages;
  }

  async getClients(): Promise<ChatClientModule[]> {
    const clients = await this.clientRepository.find();
    const chatClients: ChatClientModule[] = JSON.parse(JSON.stringify(clients));
    return chatClients;
  }

  async newClient(chatClient: ChatClientModule): Promise<ChatClientModule> {
    const chatClientFoundById = await this.clientRepository.findOne({
      id: chatClient.id,
    });
    if (chatClientFoundById) {
      return JSON.parse(JSON.stringify(chatClientFoundById));
    }
    const chatClientFoundByName = await this.clientRepository.findOne({
      name: chatClient.name,
    });
    if (chatClientFoundByName) {
      throw new Error('Nickname is already used');
    }
    let client = this.clientRepository.create();
    client.name = chatClient.name;
    client = await this.clientRepository.save(client);
    const newChatClient = JSON.parse(JSON.stringify(client));
    this.clients.push(newChatClient);
    return newChatClient;
  }

  async delete(id: string): Promise<void> {
    await this.clientRepository.delete({ id });
  }

  updateTyping(typing: boolean, id: string): ChatClientModule {
    const chatClient = this.clients.find((c) => c.id === id);
    if (chatClient && chatClient.typing !== typing) {
      chatClient.typing = typing;
      return chatClient;
    }
  }
}

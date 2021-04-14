import { ChatMessage } from '../models/chat-message.model';
import { ChatClientModule } from '../models/chat.client.module';
import exp from 'constants';

export const IChatServiceProvider = 'IChatServiceProvider';

export interface IChatService {
  newMessage(message: string, clientID: string): ChatMessage;

  getMessages(): ChatMessage[];

  getClients(): Promise<ChatClientModule[]>;

  newClient(chatClient: ChatClientModule): Promise<ChatClientModule>;

  delete(id: string): Promise<void>;

  updateTyping(typing: boolean, id: string): ChatClientModule;
}

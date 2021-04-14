import { ChatClientModule } from '../../core/models/chat.client.module';
import { ChatMessage } from '../../core/models/chat-message.model';
export interface WelcomeDto {
  clients: ChatClientModule[];
  client: ChatClientModule;
  messages: ChatMessage[];
}

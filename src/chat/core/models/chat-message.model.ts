import { ChatClientModule } from './chat.client.module';

export interface ChatMessage {
  message: string;
  sender: ChatClientModule;
}

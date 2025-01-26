import { ScrollArea } from "@/components/ui/scroll-area"
import { ChatMessage } from "../ChatMessage"
import { type Message } from "../types"

type ChatMessageListProps = {
  messages: Message[]
  selectedSeller: string | null
  onSelectSeller: (sellerId: string) => void
  onMarkAsRead: (messageId: string) => void
}

export const ChatMessageList = ({ 
  messages, 
  selectedSeller, 
  onSelectSeller, 
  onMarkAsRead 
}: ChatMessageListProps) => {
  return (
    <ScrollArea className="flex-grow p-4">
      <div className="space-y-4">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            selectedSeller={selectedSeller}
            onSelectSeller={onSelectSeller}
            onMarkAsRead={() => onMarkAsRead(message.id)}
          />
        ))}
      </div>
    </ScrollArea>
  )
}
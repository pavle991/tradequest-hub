import { ScrollArea } from "@/components/ui/scroll-area"
import { ChatMessage } from "../ChatMessage"
import { type Message } from "../types"
import { useEffect, useRef } from "react"

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
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  return (
    <ScrollArea className="flex-grow p-4">
      <div className="space-y-4">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={{
              id: message.id,
              sender: message.sender_id,
              content: message.content,
              timestamp: message.created_at,
              status: message.status
            }}
            selectedSeller={selectedSeller}
            onSelectSeller={onSelectSeller}
            onMarkAsRead={() => onMarkAsRead(message.id)}
          />
        ))}
        <div ref={scrollRef} />
      </div>
    </ScrollArea>
  )
}
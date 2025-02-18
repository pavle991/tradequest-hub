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
  }, [messages]) // Scroll whenever messages change

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
        <div ref={scrollRef} /> {/* Invisible element at the bottom for scrolling */}
      </div>
    </ScrollArea>
  )
}
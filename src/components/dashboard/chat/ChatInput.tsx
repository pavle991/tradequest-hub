import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type ChatInputProps = {
  newMessage: string
  onMessageChange: (message: string) => void
  onSendMessage: () => void
}

export const ChatInput = ({ newMessage, onMessageChange, onSendMessage }: ChatInputProps) => {
  return (
    <div className="p-4 border-t">
      <div className="flex gap-2">
        <Input
          value={newMessage}
          onChange={(e) => onMessageChange(e.target.value)}
          placeholder="Unesite poruku..."
          onKeyPress={(e) => e.key === "Enter" && onSendMessage()}
        />
        <Button onClick={onSendMessage}>Pošalji</Button>
      </div>
    </div>
  )
}
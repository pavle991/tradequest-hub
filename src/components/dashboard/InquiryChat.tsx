import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type Message = {
  id: number
  sender: string
  content: string
  timestamp: string
}

type InquiryChatProps = {
  inquiryId: number
  inquiryTitle: string
  onClose: () => void
}

export const InquiryChat = ({ inquiryId, inquiryTitle, onClose }: InquiryChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "Prodavac",
      content: "Pozdrav, kako vam mogu pomoći oko upita?",
      timestamp: "10:00"
    },
    {
      id: 2,
      sender: "Kupac",
      content: "Zdravo, interesuju me detaljnije specifikacije",
      timestamp: "10:05"
    }
  ])
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (!newMessage.trim()) return
    
    const message: Message = {
      id: Date.now(),
      sender: "Kupac",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString('sr-RS', { hour: '2-digit', minute: '2-digit' })
    }
    
    setMessages([...messages, message])
    setNewMessage("")
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Otvori chat
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{inquiryTitle}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col h-[500px]">
          <ScrollArea className="flex-grow p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-2 ${
                    message.sender === "Kupac" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex gap-2 max-w-[80%] ${
                      message.sender === "Kupac" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <Avatar />
                    <Card className="p-3">
                      <p className="text-sm font-semibold">{message.sender}</p>
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs text-gray-500 mt-1">{message.timestamp}</p>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Unesite poruku..."
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button onClick={handleSendMessage}>Pošalji</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
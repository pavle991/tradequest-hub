import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
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
      sender: "Kupac",
      content: "Potrebno mi je 100 kutija A4 papira, 80g/m2. Da li možete da mi dostavite ponudu sa cenom po kutiji i rokovima isporuke?",
      timestamp: "10:00"
    },
    {
      id: 2,
      sender: "Prodavac",
      content: "Poštovani, cena po kutiji je 1200 dinara sa PDV-om. Isporuka je moguća u roku od 2 radna dana na teritoriji Beograda. Minimalna količina za besplatnu dostavu je 50 kutija.",
      timestamp: "10:05"
    }
  ])
  const [newMessage, setNewMessage] = useState("")

  // Simulirani podaci o prodavcu
  const sellerRating = 4.5
  const totalSales = 1250000
  const numberOfRatings = 28

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

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? "text-yellow-400 fill-yellow-400"
                : star - rating <= 0.5
                ? "text-yellow-400 fill-yellow-400 opacity-50"
                : "text-gray-300"
            }`}
          />
        ))}
        <span className="text-sm text-gray-600 ml-2">
          ({numberOfRatings} ocena)
        </span>
      </div>
    )
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
          <DialogDescription>
            <div className="flex flex-col gap-1 mt-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Ocena prodavca:</span>
                {renderStars(sellerRating)}
              </div>
              <div className="text-sm text-gray-600">
                Ukupna vrednost prodaje: {totalSales.toLocaleString('sr-RS')} RSD
              </div>
            </div>
          </DialogDescription>
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
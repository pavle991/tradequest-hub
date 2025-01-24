import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog"
import { ChatMessage } from "./ChatMessage"
import { SellerRating } from "./SellerRating"

type Message = {
  id: number
  sender: string
  content: string
  timestamp: string
  sellerId?: number
  sellerRating?: number
  totalSales?: number
  numberOfRatings?: number
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
      sender: "Prodavac 1",
      content: "Poštovani, cena po kutiji je 1200 dinara sa PDV-om. Isporuka je moguća u roku od 2 radna dana na teritoriji Beograda. Minimalna količina za besplatnu dostavu je 50 kutija.",
      timestamp: "10:05",
      sellerId: 1,
      sellerRating: 4.5,
      totalSales: 1250000,
      numberOfRatings: 28
    },
    {
      id: 3,
      sender: "Prodavac 2",
      content: "Poštovani, možemo ponuditi kutiju po ceni od 1180 dinara sa PDV-om. Isporuka 3-4 radna dana, besplatna dostava za porudžbine preko 100.000 dinara.",
      timestamp: "10:07",
      sellerId: 2,
      sellerRating: 4.8,
      totalSales: 2100000,
      numberOfRatings: 45
    },
    {
      id: 4,
      sender: "Prodavac 3",
      content: "Zdravo, naša ponuda je 1250 dinara po kutiji sa PDV-om. Isporuka je garantovana sledećeg radnog dana. Besplatna dostava za sve porudžbine.",
      timestamp: "10:10",
      sellerId: 3,
      sellerRating: 4.2,
      totalSales: 980000,
      numberOfRatings: 19
    }
  ])
  const [selectedSeller, setSelectedSeller] = useState<number | null>(null)
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

  const filteredMessages = selectedSeller 
    ? messages.filter(m => !m.sellerId || m.sellerId === selectedSeller)
    : messages

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
          {selectedSeller && (
            <DialogDescription>
              {messages
                .find(m => m.sellerId === selectedSeller)
                ?.sender && (
                <SellerRating
                  rating={messages.find(m => m.sellerId === selectedSeller)?.sellerRating || 0}
                  numberOfRatings={messages.find(m => m.sellerId === selectedSeller)?.numberOfRatings || 0}
                  totalSales={messages.find(m => m.sellerId === selectedSeller)?.totalSales || 0}
                />
              )}
            </DialogDescription>
          )}
        </DialogHeader>
        <div className="flex flex-col h-[500px]">
          <ScrollArea className="flex-grow p-4">
            <div className="space-y-4">
              {filteredMessages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  selectedSeller={selectedSeller}
                  onSelectSeller={setSelectedSeller}
                />
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
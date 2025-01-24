import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { MessageCircle } from "lucide-react"
import { SellerRating } from "./SellerRating"

type ChatMessageProps = {
  message: {
    id: number
    sender: string
    content: string
    timestamp: string
    sellerId?: number
    sellerRating?: number
    totalSales?: number
    numberOfRatings?: number
  }
  selectedSeller: number | null
  onSelectSeller: (sellerId: number) => void
}

export const ChatMessage = ({ message, selectedSeller, onSelectSeller }: ChatMessageProps) => {
  const isBuyer = message.sender === "Kupac"

  return (
    <div className={`flex gap-2 ${isBuyer ? "justify-end" : "justify-start"}`}>
      <div className={`flex gap-2 max-w-[80%] ${isBuyer ? "flex-row-reverse" : "flex-row"}`}>
        <Avatar />
        <Card className="p-3">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold">{message.sender}</p>
            {message.sellerRating && (
              <SellerRating
                rating={message.sellerRating}
                numberOfRatings={message.numberOfRatings || 0}
                totalSales={message.totalSales || 0}
              />
            )}
            <p className="text-sm">{message.content}</p>
            <p className="text-xs text-gray-500">{message.timestamp}</p>
            {message.sellerId && !selectedSeller && (
              <Button 
                variant="secondary" 
                size="sm"
                className="mt-2"
                onClick={() => onSelectSeller(message.sellerId!)}
              >
                <MessageCircle className="mr-2" />
                Nastavi razgovor
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
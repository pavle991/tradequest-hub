import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { MessageCircle, Check } from "lucide-react"
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
    status?: 'delivered' | 'read'
  }
  selectedSeller: number | null
  onSelectSeller: (sellerId: number) => void
  onMarkAsRead: () => void
}

export const ChatMessage = ({ 
  message, 
  selectedSeller, 
  onSelectSeller,
  onMarkAsRead 
}: ChatMessageProps) => {
  const isBuyer = message.sender === "Kupac"

  return (
    <div className={`flex gap-2 ${isBuyer ? "justify-end" : "justify-start"}`}>
      <div className={`flex gap-2 max-w-[80%] ${isBuyer ? "flex-row-reverse" : "flex-row"}`}>
        <Avatar />
        <Card className="p-3">
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">{message.sender}</p>
              {message.status && (
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  {message.status === 'read' ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Check className="w-4 h-4" />
                  )}
                </div>
              )}
            </div>
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
                onClick={() => {
                  onSelectSeller(message.sellerId!)
                  onMarkAsRead()
                }}
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
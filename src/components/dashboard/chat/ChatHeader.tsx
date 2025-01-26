import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { SellerRating } from "../SellerRating"

type ChatHeaderProps = {
  title: string
  selectedSeller: string | null
  messages: Array<{
    sellerId?: string
    sellerRating?: number
    numberOfRatings?: number
    totalSales?: number
  }>
}

export const ChatHeader = ({ title, selectedSeller, messages }: ChatHeaderProps) => {
  const selectedSellerMessage = messages.find(m => m.sellerId === selectedSeller)

  return (
    <DialogHeader>
      <DialogTitle>{title}</DialogTitle>
      {selectedSeller && selectedSellerMessage?.sellerRating && (
        <DialogDescription>
          <SellerRating
            rating={selectedSellerMessage.sellerRating}
            numberOfRatings={selectedSellerMessage.numberOfRatings || 0}
            totalSales={selectedSellerMessage.totalSales || 0}
          />
        </DialogDescription>
      )}
    </DialogHeader>
  )
}
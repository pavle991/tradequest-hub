export type Message = {
  id: string
  sender: string
  content: string
  timestamp: string
  sellerId?: string
  sellerRating?: number
  totalSales?: number
  numberOfRatings?: number
  status?: 'delivered' | 'read'
}
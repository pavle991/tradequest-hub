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

export type Deal = {
  id: string
  seller: string
  title: string
  date: string
  messages: Message[]
}

export type Inquiry = {
  id: string
  title: string
  description: string
  status: string
  date: string
  type: "buying" | "selling"
}
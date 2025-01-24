export type Message = {
  id: number
  sender: string
  content: string
  timestamp: string
  sellerId?: number
  sellerRating?: number
  totalSales?: number
  numberOfRatings?: number
}

export type Deal = {
  id: number
  seller: string
  title: string
  date: string
  messages: Message[]
}

export type Inquiry = {
  id: number
  title: string
  description: string
  status: string
  date: string
  type: "buying" | "selling"
}
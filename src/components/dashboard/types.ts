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
  type: "buying" | "selling"
  tags: string[]
  user_id: string
  created_at: string
  updated_at: string
}

export type CompanyData = {
  company_name: string
  address: string | null
  phone: string | null
  description: string | null
  tags: string[]
}

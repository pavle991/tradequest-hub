export type Inquiry = {
  id: string
  title: string
  description: string
  status: "aktivan" | "završen"
  type: "buying" | "selling"
  tags: string[]
  user_id: string
  created_at: string
  updated_at: string
}

export type Offer = {
  id: string
  seller_id: string
  price: number
  currency: string
  description: string
  seller_rating: number
  total_sales: number
  number_of_ratings: number
  status: string
  profiles: {
    company_name: string
  }
}

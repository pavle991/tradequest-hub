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
  company_name?: string
  seller_rating?: number | null
  total_sales?: number | null
}
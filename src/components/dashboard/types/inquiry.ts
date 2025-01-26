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
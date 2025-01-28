export type Message = {
  id: string
  content: string
  created_at: string
  sender_id: string
  status: 'delivered' | 'read'
  offer_id?: string | null
  sender?: {
    company_name: string
  } | null
}
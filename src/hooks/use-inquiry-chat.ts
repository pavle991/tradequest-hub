import { useEffect, useState } from "react"
import { supabase } from "@/integrations/supabase/client"

export const useInquiryChat = (inquiryId: string, offerId?: string) => {
  const [messages, setMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMessages()
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `inquiry_id=eq.${inquiryId}`
        },
        () => {
          fetchMessages()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [inquiryId])

  const fetchMessages = async () => {
    try {
      const { data: messages, error } = await supabase
        .from('messages')
        .select(`
          id,
          content,
          created_at,
          sender_id,
          status,
          profiles(company_name)
        `)
        .eq('inquiry_id', inquiryId)
        .order('created_at', { ascending: true })

      if (error) throw error

      return messages.map(message => ({
        ...message,
        company_name: message.profiles?.company_name
      }))
    } catch (error) {
      console.error('Error fetching messages:', error)
      return []
    }
  }

  return { messages, loading }
}

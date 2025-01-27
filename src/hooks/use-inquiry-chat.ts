import { useState, useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"

export const useInquiryChat = (inquiryId: string, offerId?: string) => {
  const [messages, setMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMessages()
    const channel = supabase
      .channel('messages-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
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
      channel.unsubscribe()
    }
  }, [inquiryId])

  const fetchMessages = async () => {
    try {
      const { data: messages, error } = await supabase
        .from('messages')
        .select(`
          *,
          sender:sender_id (
            company_name
          )
        `)
        .eq('inquiry_id', inquiryId)
        .order('created_at', { ascending: true })

      if (error) throw error

      const formattedMessages = messages.map(message => ({
        ...message,
        company_name: message.sender?.company_name
      }))

      setMessages(formattedMessages)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching messages:', error)
      setLoading(false)
    }
  }

  const sendMessage = async (content: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('No user found')

      const { error } = await supabase
        .from('messages')
        .insert({
          inquiry_id: inquiryId,
          offer_id: offerId,
          sender_id: user.id,
          content
        })

      if (error) throw error
    } catch (error) {
      console.error('Error sending message:', error)
      throw error
    }
  }

  return {
    messages,
    loading,
    sendMessage
  }
}
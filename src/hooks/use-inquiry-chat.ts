import { useState, useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"
import { Message } from "@/components/dashboard/types"

export const useInquiryChat = (inquiryId: string, offerId?: string | null) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMessages()
    subscribeToMessages()
  }, [inquiryId, offerId])

  const fetchMessages = async () => {
    try {
      const query = supabase
        .from('messages')
        .select(`
          id,
          content,
          created_at,
          status,
          sender_id,
          profiles:sender_id (
            company_name
          )
        `)
        .eq('inquiry_id', inquiryId)
        .order('created_at', { ascending: true })

      if (offerId) {
        query.eq('offer_id', offerId)
      }

      const { data, error } = await query

      if (error) throw error

      if (data) {
        const formattedMessages = data.map(msg => ({
          id: msg.id,
          content: msg.content,
          sender: msg.profiles?.company_name || 'Unknown',
          timestamp: msg.created_at,
          status: msg.status as 'delivered' | 'read'
        }))
        setMessages(formattedMessages)
      }
    } catch (error) {
      console.error('Error fetching messages:', error)
    } finally {
      setLoading(false)
    }
  }

  const subscribeToMessages = () => {
    const channel = supabase
      .channel('messages-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'messages',
          filter: `inquiry_id=eq.${inquiryId}${offerId ? ` AND offer_id=eq.${offerId}` : ''}`
        },
        () => {
          fetchMessages()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }

  const sendMessage = async (content: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        throw new Error('User not authenticated')
      }

      const messageData = {
        inquiry_id: inquiryId,
        offer_id: offerId,
        sender_id: user.id,
        content,
        status: 'delivered'
      }

      const { error } = await supabase
        .from('messages')
        .insert(messageData)

      if (error) throw error

      return true
    } catch (error) {
      console.error('Error sending message:', error)
      return false
    }
  }

  return {
    messages,
    loading,
    sendMessage
  }
}
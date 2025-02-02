import { useState, useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"
import { Message } from "@/components/dashboard/types"

export const useInquiryChat = (inquiryId: string, offerId?: string | null) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [newMessage, setNewMessage] = useState("")
  const [selectedSeller, setSelectedSeller] = useState<string | null>(null)

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
          profiles (
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

  const handleMarkAsRead = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const query = supabase
        .from('messages')
        .update({ status: 'read' })
        .eq('inquiry_id', inquiryId)
        .eq('status', 'delivered')
        .neq('sender_id', user.id)

      if (offerId) {
        query.eq('offer_id', offerId)
      }

      await query
    } catch (error) {
      console.error('Error marking messages as read:', error)
    }
  }

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return
    const success = await sendMessage(newMessage)
    if (success) {
      setNewMessage("")
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

  return {
    messages,
    loading,
    newMessage,
    selectedSeller,
    setNewMessage,
    setSelectedSeller,
    handleSendMessage,
    handleMarkAsRead,
    sendMessage
  }
}
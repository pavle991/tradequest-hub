import { useState, useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"

export const useInquiryChat = (inquiryId: string, offerId?: string | null) => {
  const [messages, setMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [newMessage, setNewMessage] = useState("")
  const [selectedSeller, setSelectedSeller] = useState<string | null>(null)

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
          sender:profiles!messages_sender_id_fkey (
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

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { error } = await supabase
        .from('messages')
        .insert({
          inquiry_id: inquiryId,
          offer_id: offerId,
          sender_id: user.id,
          content: newMessage
        })

      if (error) throw error
      setNewMessage("")
      await fetchMessages()
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  const handleMarkAsRead = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { error } = await supabase
        .from('messages')
        .update({ status: 'read' })
        .eq('inquiry_id', inquiryId)
        .eq('status', 'delivered')
        .neq('sender_id', user.id)

      if (error) throw error
    } catch (error) {
      console.error('Error marking messages as read:', error)
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
    handleMarkAsRead
  }
}
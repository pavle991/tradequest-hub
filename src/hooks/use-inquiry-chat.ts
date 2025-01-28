import { useState, useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"
import { type Message } from "@/components/dashboard/types"

type MessageWithSender = {
  id: string
  inquiry_id: string
  sender_id: string
  content: string
  created_at: string
  status: 'delivered' | 'read'
  offer_id: string | null
  sender_profile: {
    company_name: string | null
  } | null
}

export const useInquiryChat = (inquiryId: string, offerId?: string | null) => {
  const [messages, setMessages] = useState<MessageWithSender[]>([])
  const [loading, setLoading] = useState(true)
  const [newMessage, setNewMessage] = useState("")
  const [selectedSeller, setSelectedSeller] = useState<string | null>(null)

  const fetchMessages = async () => {
    try {
      const { data: messagesData, error } = await supabase
        .from('messages')
        .select(`
          id,
          inquiry_id,
          sender_id,
          content,
          created_at,
          status,
          offer_id,
          sender_profile:profiles(company_name)
        `)
        .eq('inquiry_id', inquiryId)
        .order('created_at', { ascending: true })

      if (error) throw error

      // Ensure the status is either 'delivered' or 'read'
      const typedMessages = (messagesData || []).map(message => ({
        ...message,
        status: message.status === 'read' ? 'read' : 'delivered'
      })) as MessageWithSender[]

      setMessages(typedMessages)
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
          content: newMessage,
          status: 'delivered' as const
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
        .update({ status: 'read' as const })
        .eq('inquiry_id', inquiryId)
        .eq('status', 'delivered')
        .neq('sender_id', user.id)

      if (error) throw error
    } catch (error) {
      console.error('Error marking messages as read:', error)
    }
  }

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

  // Convert MessageWithSender[] to Message[] for the component
  const formattedMessages: Message[] = messages.map(msg => ({
    id: msg.id,
    sender: msg.sender_id,
    content: msg.content,
    timestamp: msg.created_at,
    status: msg.status,
    sellerId: msg.sender_id
  }))

  return {
    messages: formattedMessages,
    loading,
    newMessage,
    selectedSeller,
    setNewMessage,
    setSelectedSeller,
    handleSendMessage,
    handleMarkAsRead
  }
}
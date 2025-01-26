import { useState, useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { type Message } from "@/components/dashboard/types"

export const useInquiryChat = (inquiryId: string, offerId?: string | null) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [selectedSeller, setSelectedSeller] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [userId, setUserId] = useState<string | null>(null)
  const [isBuyer, setIsBuyer] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          setUserId(user.id)
          
          const { data: inquiry, error } = await supabase
            .from('inquiries')
            .select('user_id')
            .eq('id', inquiryId)
            .maybeSingle()
          
          if (error) {
            console.error('Error fetching inquiry:', error)
            return
          }

          setIsBuyer(inquiry?.user_id === user.id)
        }
      } catch (error) {
        console.error('Error getting current user:', error)
      }
    }
    getCurrentUser()

    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'messages',
          filter: offerId 
            ? `inquiry_id=eq.${inquiryId} AND offer_id=eq.${offerId}`
            : `inquiry_id=eq.${inquiryId}`
        },
        async (payload) => {
          if (payload.eventType === 'INSERT') {
            const newMessage = payload.new
            const { data: senderProfile } = await supabase
              .from('profiles')
              .select('company_name')
              .eq('id', newMessage.sender_id)
              .single()

            setMessages(prev => [...(prev || []), {
              id: newMessage.id,
              sender: newMessage.sender_id === userId ? 'Kupac' : senderProfile?.company_name || 'Prodavac',
              content: newMessage.content,
              timestamp: new Date(newMessage.created_at).toLocaleTimeString('sr-RS', { 
                hour: '2-digit', 
                minute: '2-digit' 
              }),
              status: newMessage.status as 'delivered' | 'read'
            }])
          } else if (payload.eventType === 'UPDATE') {
            setMessages(prev => (prev || []).map(msg => 
              msg.id === payload.new.id 
                ? { ...msg, status: payload.new.status as 'delivered' | 'read' }
                : msg
            ))
          }
        }
      )
      .subscribe()

    loadExistingMessages()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [inquiryId, userId, offerId])

  const loadExistingMessages = async () => {
    try {
      const query = supabase
        .from('messages')
        .select(`
          *,
          sender:profiles!messages_sender_id_fkey(company_name)
        `)
        .eq('inquiry_id', inquiryId)
        .order('created_at', { ascending: true })

      if (offerId) {
        query.eq('offer_id', offerId)
      }

      const { data: existingMessages, error } = await query

      if (error) {
        console.error('Error loading messages:', error)
        return
      }

      if (existingMessages) {
        const formattedMessages = existingMessages.map(msg => ({
          id: msg.id,
          sender: msg.sender_id === userId ? 'Kupac' : msg.sender.company_name || 'Prodavac',
          content: msg.content,
          timestamp: new Date(msg.created_at).toLocaleTimeString('sr-RS', {
            hour: '2-digit',
            minute: '2-digit'
          }),
          status: msg.status as 'delivered' | 'read'
        }))
        setMessages(formattedMessages)
      }
    } catch (error) {
      console.error('Error loading messages:', error)
    }
  }

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !userId) return
    
    try {
      const messageData = {
        inquiry_id: inquiryId,
        sender_id: userId,
        content: newMessage,
        status: 'delivered',
        ...(offerId && { offer_id: offerId })
      }

      const { error } = await supabase
        .from('messages')
        .insert(messageData)

      if (error) {
        toast({
          title: "Greška",
          description: "Nije moguće poslati poruku. Pokušajte ponovo.",
          variant: "destructive"
        })
        return
      }

      setNewMessage("")
    } catch (error) {
      toast({
        title: "Greška",
        description: "Nije moguće poslati poruku. Pokušajte ponovo.",
        variant: "destructive"
      })
    }
  }

  const handleMarkAsRead = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ status: 'read' })
        .eq('id', messageId)

      if (error) {
        console.error('Error marking message as read:', error)
      }
    } catch (error) {
      console.error('Error marking message as read:', error)
    }
  }

  return {
    messages,
    newMessage,
    selectedSeller,
    setNewMessage,
    setSelectedSeller,
    handleSendMessage,
    handleMarkAsRead
  }
}
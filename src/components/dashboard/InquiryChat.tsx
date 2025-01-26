import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { supabase } from "@/integrations/supabase/client"
import { ChatHeader } from "./chat/ChatHeader"
import { ChatMessageList } from "./chat/ChatMessageList"
import { ChatInput } from "./chat/ChatInput"
import { type Message } from "./types"

type InquiryChatProps = {
  inquiryId: string
  inquiryTitle: string
  offerId?: string
  onClose: () => void
}

export const InquiryChat = ({ inquiryId, inquiryTitle, offerId, onClose }: InquiryChatProps) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [selectedSeller, setSelectedSeller] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [userId, setUserId] = useState<string | null>(null)
  const [offer, setOffer] = useState<any>(null)
  const [isBuyer, setIsBuyer] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          setUserId(user.id)
          
          // Check if current user is the buyer
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

    // Load offer if offerId exists
    if (offerId) {
      fetchOffer()
    }

    // Subscribe to messages for this inquiry
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'messages',
          filter: `inquiry_id=eq.${inquiryId}`
        },
        async (payload) => {
          if (payload.eventType === 'INSERT') {
            const newMessage = payload.new
            // Fetch sender profile to get proper display name
            const { data: senderProfile } = await supabase
              .from('profiles')
              .select('company_name')
              .eq('id', newMessage.sender_id)
              .single()

            setMessages(prev => [...prev, {
              id: newMessage.id,
              sender: newMessage.sender_id === userId ? 'Kupac' : senderProfile?.company_name || 'Prodavac',
              content: newMessage.content,
              timestamp: new Date(newMessage.created_at).toLocaleTimeString('sr-RS', { 
                hour: '2-digit', 
                minute: '2-digit' 
              }),
              status: newMessage.status
            }])
          } else if (payload.eventType === 'UPDATE') {
            setMessages(prev => prev.map(msg => 
              msg.id === payload.new.id 
                ? { ...msg, status: payload.new.status }
                : msg
            ))
          }
        }
      )
      .subscribe()

    // Load existing messages
    const loadExistingMessages = async () => {
      try {
        const { data: existingMessages, error } = await supabase
          .from('messages')
          .select(`
            *,
            sender:profiles!messages_sender_id_fkey(company_name)
          `)
          .eq('inquiry_id', inquiryId)
          .order('created_at', { ascending: true })

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
            status: msg.status
          }))
          setMessages(formattedMessages)
        }
      } catch (error) {
        console.error('Error loading messages:', error)
      }
    }

    loadExistingMessages()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [inquiryId, userId, offerId])

  const fetchOffer = async () => {
    if (!offerId) return
    
    try {
      const { data, error } = await supabase
        .from('offers')
        .select('*')
        .eq('id', offerId)
        .maybeSingle()

      if (error) {
        console.error('Error fetching offer:', error)
        return
      }

      if (data) {
        setOffer(data)
      }
    } catch (error) {
      console.error('Error fetching offer:', error)
    }
  }

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !userId) return
    
    try {
      const { error } = await supabase
        .from('messages')
        .insert({
          inquiry_id: inquiryId,
          sender_id: userId,
          content: newMessage,
          status: 'delivered'
        })

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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Otvori chat
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <ChatHeader 
          title={inquiryTitle}
          offer={offer}
        />
        <div className="flex flex-col h-[500px]">
          <ChatMessageList
            messages={messages}
            selectedSeller={selectedSeller}
            onSelectSeller={setSelectedSeller}
            onMarkAsRead={handleMarkAsRead}
          />
          <ChatInput
            newMessage={newMessage}
            onMessageChange={setNewMessage}
            onSendMessage={handleSendMessage}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog"
import { ChatMessage } from "./ChatMessage"
import { SellerRating } from "./SellerRating"
import { supabase } from "@/integrations/supabase/client"

type Message = {
  id: number
  sender: string
  content: string
  timestamp: string
  sellerId?: number
  sellerRating?: number
  totalSales?: number
  numberOfRatings?: number
  status?: 'delivered' | 'read'
}

type InquiryChatProps = {
  inquiryId: number
  inquiryTitle: string
  onClose: () => void
}

export const InquiryChat = ({ inquiryId, inquiryTitle, onClose }: InquiryChatProps) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [selectedSeller, setSelectedSeller] = useState<number | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    // Subscribe to real-time updates
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
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newMessage = payload.new
            setMessages(prev => [...prev, {
              id: newMessage.id,
              sender: newMessage.sender_id === supabase.auth.user()?.id ? 'Kupac' : 'Prodavac',
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

    return () => {
      supabase.removeChannel(channel)
    }
  }, [inquiryId])

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return
    
    try {
      const { data, error } = await supabase
        .from('messages')
        .insert({
          inquiry_id: inquiryId,
          sender_id: supabase.auth.user()?.id,
          content: newMessage,
          status: 'delivered'
        })

      if (error) throw error

      setNewMessage("")
    } catch (error) {
      toast({
        title: "Greška",
        description: "Nije moguće poslati poruku. Pokušajte ponovo.",
        variant: "destructive"
      })
    }
  }

  const handleMarkAsRead = async (messageId: number) => {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ status: 'read' })
        .eq('id', messageId)

      if (error) throw error
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
        <DialogHeader>
          <DialogTitle>{inquiryTitle}</DialogTitle>
          {selectedSeller && (
            <DialogDescription>
              {messages
                .find(m => m.sellerId === selectedSeller)
                ?.sender && (
                <SellerRating
                  rating={messages.find(m => m.sellerId === selectedSeller)?.sellerRating || 0}
                  numberOfRatings={messages.find(m => m.sellerId === selectedSeller)?.numberOfRatings || 0}
                  totalSales={messages.find(m => m.sellerId === selectedSeller)?.totalSales || 0}
                />
              )}
            </DialogDescription>
          )}
        </DialogHeader>
        <div className="flex flex-col h-[500px]">
          <ScrollArea className="flex-grow p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  selectedSeller={selectedSeller}
                  onSelectSeller={setSelectedSeller}
                  onMarkAsRead={() => handleMarkAsRead(message.id)}
                />
              ))}
            </div>
          </ScrollArea>
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Unesite poruku..."
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button onClick={handleSendMessage}>Pošalji</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
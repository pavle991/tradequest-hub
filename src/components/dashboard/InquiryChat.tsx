import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ChatHeader } from "./chat/ChatHeader"
import { ChatMessageList } from "./chat/ChatMessageList"
import { ChatInput } from "./chat/ChatInput"
import { useInquiryChat } from "@/hooks/use-inquiry-chat"
import { useOfferData } from "@/hooks/use-offer-data"
import { supabase } from "@/integrations/supabase/client"
import { useEffect } from "react"

type InquiryChatProps = {
  inquiryId: string
  inquiryTitle: string
  offerId?: string | null
  onClose: () => void
}

export const InquiryChat = ({ 
  inquiryId, 
  inquiryTitle, 
  offerId, 
  onClose 
}: InquiryChatProps) => {
  const { 
    messages, 
    newMessage, 
    selectedSeller,
    setNewMessage,
    setSelectedSeller,
    handleSendMessage,
    handleMarkAsRead
  } = useInquiryChat(inquiryId, offerId)
  
  const { offer } = useOfferData(offerId)

  const markMessagesAsRead = async () => {
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

  return (
    <Dialog onOpenChange={(open) => {
      if (open) {
        markMessagesAsRead()
      }
    }}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Otvori chat
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogTitle className="text-lg font-semibold">
          Chat za ponudu
        </DialogTitle>
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
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

type InquiryChatProps = {
  inquiryId: string
  inquiryTitle: string
  offerId?: string
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

  return (
    <Dialog>
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
            messages={messages || []}
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
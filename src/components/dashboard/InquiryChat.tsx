import { ChatHeader } from "./chat/ChatHeader";
import { ChatMessageList } from "./chat/ChatMessageList";
import { ChatInput } from "./chat/ChatInput";
import { useInquiryChat } from "@/hooks/use-inquiry-chat";

interface InquiryChatProps {
  inquiryId: string;
  title?: string;
  offerId?: string;
  onClose: () => void;
}

export const InquiryChat = ({ 
  inquiryId,
  title = "Chat",
  offerId,
  onClose 
}: InquiryChatProps) => {
  const {
    messages,
    loading,
    messageInput,
    setMessageInput,
    sendMessage,
  } = useInquiryChat(inquiryId);

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg shadow-lg">
      <ChatHeader title={title} onClose={onClose} />
      <ChatMessageList 
        messages={messages} 
        selectedSeller={null}
        onSelectSeller={() => {}}
        onMarkAsRead={() => {}}
      />
      <ChatInput 
        messageInput={messageInput}
        setMessageInput={setMessageInput}
        onSend={sendMessage}
      />
    </div>
  );
};
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useInquiryChat = (inquiryId: string) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    fetchMessages();
    subscribeToMessages();
  }, [inquiryId]);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select(`
          *,
          sender:sender_id(
            id,
            email,
            profiles:profiles(company_name)
          )
        `)
        .eq('inquiry_id', inquiryId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching messages:', error);
        toast.error("Došlo je do greške prilikom učitavanja poruka");
        return;
      }

      const formattedMessages = data.map(message => ({
        ...message,
        senderName: message.sender?.profiles?.[0]?.company_name || message.sender?.email,
      }));

      setMessages(formattedMessages);
    } catch (error) {
      console.error('Error:', error);
      toast.error("Došlo je do greške prilikom učitavanja poruka");
    } finally {
      setLoading(false);
    }
  };

  const subscribeToMessages = () => {
    const subscription = supabase
      .channel('messages')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `inquiry_id=eq.${inquiryId}`,
      }, 
      (payload) => {
        const newMessage = payload.new;
        setMessages(prev => [...prev, newMessage]);
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  };

  const sendMessage = async () => {
    if (!messageInput.trim()) return;

    try {
      const { error } = await supabase
        .from('messages')
        .insert({
          inquiry_id: inquiryId,
          content: messageInput,
        });

      if (error) {
        console.error('Error sending message:', error);
        toast.error("Došlo je do greške prilikom slanja poruke");
        return;
      }

      setMessageInput("");
    } catch (error) {
      console.error('Error:', error);
      toast.error("Došlo je do greške prilikom slanja poruke");
    }
  };

  return {
    messages,
    loading,
    messageInput,
    setMessageInput,
    sendMessage,
  };
};
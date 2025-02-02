import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function useInquiryChat(inquiryId: string) {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
          sender:sender_id (
            id,
            email
          ),
          profile:sender_id (
            company_name
          )
        `)
        .eq('inquiry_id', inquiryId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching messages:', error);
        toast.error('Greška pri učitavanju poruka');
        return;
      }

      if (data) {
        const formattedMessages = data.map(message => ({
          ...message,
          sender_name: message.profile?.company_name || message.sender?.email?.split('@')[0] || 'Nepoznat korisnik'
        }));
        setMessages(formattedMessages);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Greška pri učitavanju poruka');
    } finally {
      setLoading(false);
    }
  };

  const subscribeToMessages = () => {
    const subscription = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `inquiry_id=eq.${inquiryId}`
        },
        (payload) => {
          const newMessage = payload.new;
          setMessages(prev => [...prev, newMessage]);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  };

  const sendMessage = async (content: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error('Niste prijavljeni');
        return;
      }

      const { error } = await supabase
        .from('messages')
        .insert([
          {
            inquiry_id: inquiryId,
            sender_id: user.id,
            content
          }
        ]);

      if (error) {
        console.error('Error sending message:', error);
        toast.error('Greška pri slanju poruke');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Greška pri slanju poruke');
    }
  };

  return {
    messages,
    loading,
    sendMessage
  };
}
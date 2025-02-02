import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { OfferList } from "./OfferList"
import { type Inquiry } from "./types"
import { useState, useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"
import { SellerActions } from "./SellerActions"
import { BuyerActions } from "./BuyerActions"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Plus } from "lucide-react"

type InquiryCardProps = {
  inquiry: Inquiry
  type: "buying" | "selling"
  offersCount?: number
  selectedInquiryId: string | null
  onToggleOffers: (inquiryId: string) => void
  onOpenOfferForm: (inquiryId: string) => void
}

export const InquiryCard = ({ 
  inquiry, 
  type, 
  offersCount, 
  selectedInquiryId,
  onToggleOffers,
  onOpenOfferForm
}: InquiryCardProps) => {
  const [hasExistingOffer, setHasExistingOffer] = useState(false)
  const [offerId, setOfferId] = useState<string | null>(null)
  const [unreadCount, setUnreadCount] = useState(0)
  const [lastCheckedAt, setLastCheckedAt] = useState<Date>(new Date())

  const checkExistingOffer = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: offers } = await supabase
        .from('offers')
        .select('id')
        .eq('inquiry_id', inquiry.id)
        .eq('seller_id', user.id)

      if (offers && offers.length > 0) {
        setHasExistingOffer(true)
        setOfferId(offers[0].id)
      }
    } catch (error) {
      console.error('Error checking existing offer:', error)
    }
  }

  const checkUnreadMessages = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const query = supabase
        .from('messages')
        .select('*')
        .eq('inquiry_id', inquiry.id)
        .eq('status', 'delivered')
        .neq('sender_id', user.id)
        .gt('created_at', lastCheckedAt.toISOString())

      if (type === 'selling' && offerId) {
        query.eq('offer_id', offerId)
      }

      const { data: messages } = await query
      setUnreadCount(messages?.length || 0)
    } catch (error) {
      console.error('Error checking unread messages:', error)
    }
  }

  const handleClearUnread = () => {
    setLastCheckedAt(new Date())
    setUnreadCount(0)
  }

  useEffect(() => {
    if (type === "selling") {
      checkExistingOffer()
    }
    checkUnreadMessages()

    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'messages',
          filter: `inquiry_id=eq.${inquiry.id}`
        },
        () => {
          checkUnreadMessages()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [inquiry.id, type, offerId, lastCheckedAt])

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={inquiry.id} className="border bg-background px-4 py-1 rounded-lg">
        <div className="flex justify-between items-start">
          <AccordionTrigger className="flex flex-1 items-center gap-3 py-4 text-left">
            <div>
              <h4 className="text-xl font-semibold mb-2">{inquiry.title}</h4>
              <p className="text-gray-600 mb-4">{inquiry.description}</p>
              <div className="flex flex-wrap gap-2">
                {inquiry.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <Plus
              size={16}
              strokeWidth={2}
              className="shrink-0 opacity-60 transition-transform duration-200"
              aria-hidden="true"
            />
          </AccordionTrigger>
          <div className="pt-4">
            {type === "selling" ? (
              <SellerActions
                inquiryId={inquiry.id}
                inquiryTitle={inquiry.title}
                hasExistingOffer={hasExistingOffer}
                offerId={offerId}
                unreadCount={unreadCount}
                onOpenOfferForm={onOpenOfferForm}
                onClearUnread={handleClearUnread}
              />
            ) : (
              <BuyerActions
                inquiryId={inquiry.id}
                offersCount={offersCount}
                unreadCount={unreadCount}
                selectedInquiryId={selectedInquiryId}
                onToggleOffers={onToggleOffers}
                onClearUnread={handleClearUnread}
              />
            )}
          </div>
        </div>
        <AccordionContent className="pb-2">
          <OfferList
            inquiryId={inquiry.id}
            inquiryTitle={inquiry.title}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
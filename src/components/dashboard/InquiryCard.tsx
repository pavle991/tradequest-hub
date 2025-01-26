import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { OfferList } from "./OfferList"
import { InquiryChat } from "./InquiryChat"
import { type Inquiry } from "./types"
import { useState, useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"

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
  const [showChat, setShowChat] = useState(false)
  const [hasExistingOffer, setHasExistingOffer] = useState(false)
  const [offerId, setOfferId] = useState<string | null>(null)

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

  useEffect(() => {
    if (type === "selling") {
      checkExistingOffer()
    }
  }, [inquiry.id, type])

  return (
    <Card key={inquiry.id} className="p-6">
      <div className="flex justify-between items-start">
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
        {type === "selling" ? (
          <div className="flex flex-col gap-2">
            {!hasExistingOffer ? (
              <Button onClick={() => onOpenOfferForm(inquiry.id)}>
                Pošalji ponudu
              </Button>
            ) : (
              <InquiryChat
                inquiryId={inquiry.id}
                inquiryTitle={inquiry.title}
                offerId={offerId}
                onClose={() => setShowChat(false)}
              />
            )}
          </div>
        ) : (
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2">
              {offersCount && offersCount > 0 && (
                <Badge variant="secondary">
                  {offersCount} {offersCount === 1 ? 'ponuda' : 'ponuda'}
                </Badge>
              )}
              <Button
                variant="outline"
                onClick={() => onToggleOffers(inquiry.id)}
              >
                {selectedInquiryId === inquiry.id ? 'Zatvori ponude' : 'Pogledaj ponude'}
              </Button>
            </div>
          </div>
        )}
      </div>

      {selectedInquiryId === inquiry.id && (
        <div className="mt-4">
          <OfferList
            inquiryId={inquiry.id}
            inquiryTitle={inquiry.title}
          />
        </div>
      )}
    </Card>
  )
}
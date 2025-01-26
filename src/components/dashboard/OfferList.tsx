import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SellerRating } from "./SellerRating"
import { InquiryChat } from "./InquiryChat"
import { supabase } from "@/integrations/supabase/client"

type Offer = {
  id: string
  seller_id: string
  price: number
  currency: string
  description: string
  seller_rating: number
  total_sales: number
  number_of_ratings: number
  profiles: {
    company_name: string
  }
}

type OfferListProps = {
  inquiryId: string
  inquiryTitle: string
}

export const OfferList = ({ inquiryId, inquiryTitle }: OfferListProps) => {
  const [offers, setOffers] = useState<Offer[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null)
  const [isBuyer, setIsBuyer] = useState(false)
  const [hasMessages, setHasMessages] = useState<Record<string, boolean>>({})

  useEffect(() => {
    fetchOffers()
    checkIfUserIsBuyer()
    checkForMessages()
  }, [inquiryId])

  const fetchOffers = async () => {
    try {
      const { data, error } = await supabase
        .from('offers')
        .select(`
          *,
          profiles:seller_id (
            company_name
          )
        `)
        .eq('inquiry_id', inquiryId)
        .order('created_at', { ascending: false })

      if (error) throw error

      setOffers(data as Offer[])
    } catch (error) {
      console.error('Error fetching offers:', error)
    } finally {
      setLoading(false)
    }
  }

  const checkIfUserIsBuyer = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: inquiry } = await supabase
        .from('inquiries')
        .select('user_id')
        .eq('id', inquiryId)
        .single()

      setIsBuyer(inquiry?.user_id === user.id)
    } catch (error) {
      console.error('Error checking user role:', error)
    }
  }

  const checkForMessages = async () => {
    try {
      const { data: messages } = await supabase
        .from('messages')
        .select('inquiry_id')
        .eq('inquiry_id', inquiryId)

      if (messages && messages.length > 0) {
        setHasMessages({ [inquiryId]: true })
      }
    } catch (error) {
      console.error('Error checking messages:', error)
    }
  }

  if (loading) {
    return <div>Učitavanje ponuda...</div>
  }

  if (offers.length === 0) {
    return <div>Još uvek nema ponuda.</div>
  }

  return (
    <div className="space-y-4">
      {offers.map((offer) => (
        <Card key={offer.id} className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{offer.profiles.company_name}</h3>
              <SellerRating
                rating={offer.seller_rating}
                numberOfRatings={offer.number_of_ratings}
                totalSales={offer.total_sales}
              />
              <p className="mt-2">{offer.description}</p>
              <p className="mt-2 font-semibold">
                Cena: {offer.price.toLocaleString('sr-RS')} {offer.currency}
              </p>
            </div>
            <div>
              {isBuyer && (
                selectedOfferId === offer.id ? (
                  <InquiryChat
                    inquiryId={inquiryId}
                    inquiryTitle={inquiryTitle}
                    onClose={() => setSelectedOfferId(null)}
                  />
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => setSelectedOfferId(offer.id)}
                  >
                    Započni razgovor
                  </Button>
                )
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
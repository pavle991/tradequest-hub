import { useState, useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"
import { OfferCard } from "./offer/OfferCard"
import { OfferListLoading } from "./offer/OfferListLoading"
import { EmptyOfferList } from "./offer/EmptyOfferList"

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

  useEffect(() => {
    fetchOffers()
    checkIfUserIsBuyer()
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

  if (loading) {
    return <OfferListLoading />
  }

  if (offers.length === 0) {
    return <EmptyOfferList />
  }

  return (
    <div className="space-y-4">
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          inquiryId={inquiryId}
          inquiryTitle={inquiryTitle}
          isBuyer={isBuyer}
          selectedOfferId={selectedOfferId}
          onSelectOffer={setSelectedOfferId}
        />
      ))}
    </div>
  )
}
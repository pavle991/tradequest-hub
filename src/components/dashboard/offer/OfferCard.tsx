import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SellerRating } from "../SellerRating"
import { InquiryChat } from "../InquiryChat"
import { Badge } from "@/components/ui/badge"

type OfferCardProps = {
  offer: {
    id: string
    seller_id: string
    price: number
    currency: string
    description: string
    seller_rating: number
    total_sales: number
    number_of_ratings: number
    status: string
    profiles: {
      company_name: string
    }
  }
  inquiryId: string
  inquiryTitle: string
  isBuyer: boolean
  selectedOfferId: string | null
  onSelectOffer: (offerId: string) => void
}

export const OfferCard = ({
  offer,
  inquiryId,
  inquiryTitle,
  isBuyer,
  selectedOfferId,
  onSelectOffer,
}: OfferCardProps) => {
  return (
    <Card className="p-4">
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
          <div className="mt-2">
            <Badge variant={offer.status === 'pending' ? 'secondary' : 'outline'}>
              {offer.status === 'pending' ? 'Ponuda poslata' : 'U razgovoru'}
            </Badge>
          </div>
        </div>
        <div>
          {(isBuyer || offer.status !== 'pending') && (
            selectedOfferId === offer.id ? (
              <InquiryChat
                inquiryId={inquiryId}
                inquiryTitle={inquiryTitle}
                offerId={offer.id}
                onClose={() => onSelectOffer("")}
              />
            ) : (
              <Button
                variant="outline"
                onClick={() => onSelectOffer(offer.id)}
              >
                {isBuyer ? 'Započni razgovor' : 'Pogledaj razgovor'}
              </Button>
            )
          )}
        </div>
      </div>
    </Card>
  )
}
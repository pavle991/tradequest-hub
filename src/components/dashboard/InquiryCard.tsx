import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { OfferList } from "./OfferList"
import { type Inquiry } from "./types"

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
          <Button onClick={() => onOpenOfferForm(inquiry.id)}>
            Pošalji ponudu
          </Button>
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
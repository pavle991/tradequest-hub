import { Card } from "@/components/ui/card"
import { InvoiceGenerator } from "./InvoiceGenerator"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import { InquiryChat } from "./InquiryChat"
import { type Deal } from "./types"

type SuccessfulDealsProps = {
  deals: Deal[]
}

export const SuccessfulDeals = ({ deals }: SuccessfulDealsProps) => {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Istorija Uspešnih Prodaja</h2>
      <div className="space-y-4">
        {deals.map((deal) => (
          <Card key={deal.id} className="p-4">
            <div className="flex justify-between items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg">
              <div>
                <h3 className="font-semibold">{deal.title}</h3>
                <div className="flex flex-col gap-1">
                  <p className="text-sm text-gray-600">Dogovoreno sa: {deal.seller}</p>
                  <p className="text-sm text-gray-500">Datum: {deal.date}</p>
                </div>
              </div>
              <InquiryChat
                inquiryId={deal.id}
                inquiryTitle={deal.title}
                onClose={() => {}}
              />
            </div>
          </Card>
        ))}
      </div>
    </Card>
  )
}
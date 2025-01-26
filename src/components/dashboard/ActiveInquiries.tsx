import { Card } from "@/components/ui/card"
import { type Inquiry } from "./types"
import { InquiryChat } from "./InquiryChat"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

type ActiveInquiriesProps = {
  inquiries: Inquiry[]
  type: "buying" | "selling"
  loading?: boolean
}

export const ActiveInquiries = ({ inquiries, type, loading = false }: ActiveInquiriesProps) => {
  if (loading) {
    return (
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">
          {type === "buying" ? "Aktivne Nabavke" : "Potencijalne Prodaje"}
        </h2>
        <div className="space-y-4">
          <div className="animate-pulse">
            <div className="h-20 bg-gray-200 rounded-lg mb-4"></div>
            <div className="h-20 bg-gray-200 rounded-lg mb-4"></div>
            <div className="h-20 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </Card>
    )
  }

  if (!inquiries.length) {
    return (
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">
          {type === "buying" ? "Aktivne Nabavke" : "Potencijalne Prodaje"}
        </h2>
        <p className="text-gray-500 text-center py-8">
          {type === "buying" 
            ? "Nemate aktivnih upita za nabavku" 
            : "Trenutno nema upita koji odgovaraju vašim kategorijama proizvoda"}
        </p>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        {type === "buying" ? "Aktivne Nabavke" : "Potencijalne Prodaje"}
      </h2>
      <div className="space-y-4">
        {inquiries.map((inquiry) => (
          <Card key={inquiry.id} className="p-4">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <h3 className="font-semibold">{inquiry.title}</h3>
                <p className="text-sm text-gray-600">{inquiry.description}</p>
                <div className="flex flex-wrap gap-2">
                  {inquiry.tags?.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-gray-500">
                  {format(new Date(inquiry.created_at), "dd.MM.yyyy.")}
                </p>
              </div>
              <InquiryChat
                inquiryId={inquiry.id}
                inquiryTitle={inquiry.title}
                onClose={() => {}}
              />
            </div>
          </Card>
        ))}
      </div>
    </Card>
  )
}
import { Card } from "@/components/ui/card"
import { InquiryChat } from "./InquiryChat"
import { InvoiceGenerator } from "./InvoiceGenerator"
import { type Inquiry } from "./types"

type ActiveInquiriesProps = {
  inquiries: Inquiry[]
  type: "buying" | "selling"
}

export const ActiveInquiries = ({ inquiries, type }: ActiveInquiriesProps) => {
  const filteredInquiries = inquiries.filter(inquiry => inquiry.type === type)

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        {type === "buying" ? "Aktivni Upiti za Nabavku" : "Aktivni upiti za robu"}
      </h2>
      <div className="space-y-4">
        {filteredInquiries.map((inquiry) => (
          <Card key={inquiry.id} className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{inquiry.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{inquiry.description}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Datum: {new Date(inquiry.created_at).toLocaleDateString('sr-RS', {
                    day: 'numeric',
                    month: 'numeric',
                    year: 'numeric'
                  })}
                </p>
                {inquiry.tags && inquiry.tags.length > 0 && (
                  <div className="flex gap-2 mt-2">
                    {inquiry.tags.map((tag, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                type === "buying" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
              }`}>
                {inquiry.status}
              </span>
            </div>
            <div className="mt-4 flex gap-2">
              <InquiryChat
                inquiryId={inquiry.id}
                inquiryTitle={inquiry.title}
                onClose={() => {}}
              />
              {type === "selling" && (
                <InvoiceGenerator
                  inquiryId={inquiry.id}
                  inquiryTitle={inquiry.title}
                  onClose={() => {}}
                />
              )}
            </div>
          </Card>
        ))}
      </div>
    </Card>
  )
}
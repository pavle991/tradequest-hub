import { Card } from "@/components/ui/card"
import { InquiryChat } from "./InquiryChat"
import { InvoiceGenerator } from "./InvoiceGenerator"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

type Inquiry = {
  id: number
  title: string
  description: string
  status: string
  date: string
  type: "buying" | "selling"
}

type InquiryListProps = {
  inquiries: Inquiry[]
  type: "buying" | "selling"
}

export const InquiryList = ({ inquiries, type }: InquiryListProps) => {
  const filteredInquiries = inquiries.filter(inquiry => inquiry.type === type)
  
  const agreedDeals = [
    {
      id: 1,
      seller: "Prodavac 2",
      title: "Dogovorena isporuka papira",
      messages: [
        {
          id: 1,
          sender: "Kupac",
          content: "Prihvatam vašu ponudu od 1180 dinara po kutiji. Kada možete da isporučite?",
          timestamp: "11:30"
        },
        {
          id: 2,
          sender: "Prodavac 2",
          content: "Odlično! Možemo da isporučimo već u ponedeljak. Da li vam odgovara isporuka u prepodnevnim časovima?",
          timestamp: "11:35",
          sellerId: 2,
          sellerRating: 4.8,
          totalSales: 2100000,
          numberOfRatings: 45
        },
        {
          id: 3,
          sender: "Kupac",
          content: "Da, to bi bilo super. Molim vas da pripremite i predračun.",
          timestamp: "11:40"
        }
      ]
    }
  ]
  
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">
          {type === "buying" ? "Aktivni Upiti za Kupovinu" : "Aktivni upiti za robu"}
        </h2>
        <div className="space-y-4">
          {filteredInquiries.map((inquiry) => (
            <Card key={inquiry.id} className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{inquiry.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{inquiry.description}</p>
                  <p className="text-sm text-gray-500 mt-2">Datum: {inquiry.date}</p>
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

      {type === "selling" && agreedDeals.length > 0 && (
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Dogovorene Ponude</h2>
          <div className="space-y-4">
            {agreedDeals.map((deal) => (
              <Card key={deal.id} className="p-4">
                <Collapsible>
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{deal.title}</h3>
                      <p className="text-sm text-gray-600">Dogovoreno sa: {deal.seller}</p>
                    </div>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                  
                  <CollapsibleContent>
                    <div className="mt-4 bg-gray-50 rounded-lg p-4 space-y-3">
                      {deal.messages.map((message) => (
                        <div key={message.id} className={`flex ${message.sender === "Kupac" ? "justify-end" : "justify-start"}`}>
                          <div className={`max-w-[80%] bg-white rounded-lg p-3 shadow-sm ${message.sender === "Kupac" ? "bg-blue-50" : ""}`}>
                            <p className="text-sm font-semibold">{message.sender}</p>
                            <p className="text-sm">{message.content}</p>
                            <p className="text-xs text-gray-500">{message.timestamp}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex justify-end">
                      <InvoiceGenerator
                        inquiryId={deal.id}
                        inquiryTitle={deal.title}
                        onClose={() => {}}
                      />
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
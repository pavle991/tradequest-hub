import { Card } from "@/components/ui/card"
import { InquiryChat } from "./InquiryChat"
import { InvoiceGenerator } from "./InvoiceGenerator"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { ChevronDown, MessageCircle } from "lucide-react"

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
      date: "23.01.2024",
      messages: [
        {
          id: 1,
          sender: "Kupac",
          content: "Potrebno mi je 100 kutija A4 papira, 80g/m2. Da li možete da mi dostavite ponudu sa cenom po kutiji i rokovima isporuke?",
          timestamp: "11:30"
        },
        {
          id: 2,
          sender: "Prodavac 2",
          content: "Poštovani, možemo ponuditi kutiju po ceni od 1180 dinara sa PDV-om. Isporuka 3-4 radna dana, besplatna dostava za porudžbine preko 100.000 dinara.",
          timestamp: "11:35",
          sellerId: 2,
          sellerRating: 4.8,
          totalSales: 2100000,
          numberOfRatings: 45
        },
        {
          id: 3,
          sender: "Kupac",
          content: "Prihvatam vašu ponudu. Kada možete da isporučite?",
          timestamp: "11:40"
        },
        {
          id: 4,
          sender: "Prodavac 2",
          content: "Odlično! Možemo da isporučimo već u ponedeljak. Da li vam odgovara isporuka u prepodnevnim časovima?",
          timestamp: "11:45"
        }
      ]
    },
    {
      id: 2,
      seller: "Prodavac 1",
      title: "Nabavka tonera za štampače",
      date: "20.01.2024",
      messages: [
        {
          id: 1,
          sender: "Kupac",
          content: "Potrebni su nam toneri za HP LaserJet Pro MFP M428fdw - 10 komada. Molim vas za ponudu.",
          timestamp: "09:15"
        },
        {
          id: 2,
          sender: "Prodavac 1",
          content: "Poštovani, cena po toneru je 8.900 dinara sa PDV-om. Originalni HP toneri sa rokom trajanja 2 godine. Isporuka 2 radna dana.",
          timestamp: "09:30",
          sellerId: 1,
          sellerRating: 4.5,
          totalSales: 1250000,
          numberOfRatings: 28
        },
        {
          id: 3,
          sender: "Kupac",
          content: "Odlično, prihvatam ponudu. Molim vas da pripremite predračun.",
          timestamp: "09:45"
        }
      ]
    },
    {
      id: 3,
      seller: "Prodavac 3",
      title: "Nabavka kancelarijskog nameštaja",
      date: "15.01.2024",
      messages: [
        {
          id: 1,
          sender: "Kupac",
          content: "Potrebno nam je 5 kancelarijskih stolica i 3 radna stola. Molim vas za ponudu sa specifikacijama.",
          timestamp: "14:20"
        },
        {
          id: 2,
          sender: "Prodavac 3",
          content: "Poštovani, za stolice model XYZ cena je 15.000 din/kom, a za stolove model ABC 25.000 din/kom. Sve sa PDV-om i montažom. Garancija 24 meseca.",
          timestamp: "14:35",
          sellerId: 3,
          sellerRating: 4.2,
          totalSales: 980000,
          numberOfRatings: 19
        },
        {
          id: 3,
          sender: "Kupac",
          content: "Prihvatam ponudu. Kada možete da organizujete isporuku i montažu?",
          timestamp: "14:50"
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
          <h2 className="text-2xl font-bold mb-4">Istorija Uspešnih Prodaja</h2>
          <div className="space-y-4">
            {agreedDeals.map((deal) => (
              <Card key={deal.id} className="p-4">
                <Collapsible>
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{deal.title}</h3>
                      <div className="flex flex-col gap-1">
                        <p className="text-sm text-gray-600">Dogovoreno sa: {deal.seller}</p>
                        <p className="text-sm text-gray-500">Datum: {deal.date}</p>
                      </div>
                    </div>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm" className="flex items-center gap-2">
                        <MessageCircle className="h-4 w-4" />
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
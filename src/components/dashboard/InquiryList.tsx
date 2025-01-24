import { ActiveInquiries } from "./ActiveInquiries"
import { SuccessfulDeals } from "./SuccessfulDeals"
import { type Inquiry, type Deal } from "./types"

type InquiryListProps = {
  inquiries: Inquiry[]
  type: "buying" | "selling"
}

export const InquiryList = ({ inquiries, type }: InquiryListProps) => {
  const agreedDeals: Deal[] = [
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
      <ActiveInquiries inquiries={inquiries} type={type} />
      {type === "selling" && <SuccessfulDeals deals={agreedDeals} />}
    </div>
  )
}

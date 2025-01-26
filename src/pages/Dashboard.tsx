import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Analytics } from "@/components/dashboard/Analytics"
import { NewInquiryForm } from "@/components/dashboard/NewInquiryForm"
import { InquiryList } from "@/components/dashboard/InquiryList"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { CompanyProfileButton } from "@/components/layout/CompanyProfileButton"

type Inquiry = {
  id: number
  title: string
  description: string
  status: string
  date: string
  type: "buying" | "selling"
}

const Dashboard = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([
    {
      id: 1,
      title: "Potrebni kancelarijski materijali",
      description: "Tražimo ponudu za kopir papir A4, 80g, 500 listova - 100 kutija",
      status: "aktivan",
      date: "2024-01-23",
      type: "buying"
    },
    {
      id: 2,
      title: "Potrebna računarska oprema",
      description: "Tražimo ponude za nabavku 5 laptopova za poslovnu upotrebu. Minimalne specifikacije: i5 procesor, 16GB RAM, 512GB SSD",
      status: "aktivan",
      date: "2024-01-22",
      type: "selling"
    }
  ])
  const { toast } = useToast()

  const handleSubmitInquiry = (title: string, description: string, type: "buying" | "selling") => {
    const newInquiry: Inquiry = {
      id: Date.now(),
      title,
      description,
      status: "aktivan",
      date: new Date().toISOString().split('T')[0],
      type
    }
    
    setInquiries(prev => [newInquiry, ...prev])
    
    toast({
      title: "Uspešno",
      description: type === "buying" ? "Vaš upit za kupovinu je uspešno poslat" : "Vaš prodajni oglas je uspešno objavljen",
    })
  }

  // Analytics data
  const analyticsData = {
    totalInquiries: inquiries.length,
    activeInquiries: inquiries.filter(i => i.status === "aktivan").length,
    completedInquiries: inquiries.filter(i => i.status === "završen").length,
    averageResponseTime: "24h",
    successRate: 85
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto py-6 space-y-8 flex-grow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <CompanyProfileButton />
        </div>
        
        <Tabs defaultValue="buying" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="buying">Nabavka</TabsTrigger>
            <TabsTrigger value="selling">Prodaja</TabsTrigger>
          </TabsList>
          
          <TabsContent value="buying" className="space-y-6">
            <NewInquiryForm onSubmit={handleSubmitInquiry} type="buying" />
            <InquiryList inquiries={inquiries} type="buying" />
          </TabsContent>

          <TabsContent value="selling" className="space-y-6">
            <InquiryList inquiries={inquiries} type="selling" />
          </TabsContent>
        </Tabs>

        <Analytics {...analyticsData} />
      </div>
      <Footer />
    </div>
  )
}

export default Dashboard
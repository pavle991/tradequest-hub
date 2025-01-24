import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InquiryChat } from "@/components/dashboard/InquiryChat"
import { InvoiceGenerator } from "@/components/dashboard/InvoiceGenerator"
import { Analytics } from "@/components/dashboard/Analytics"

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
      title: "Prodaja računarske opreme",
      description: "Na prodaju 5 polovnih laptopova u odličnom stanju",
      status: "aktivan",
      date: "2024-01-22",
      type: "selling"
    }
  ])
  const [newInquiryTitle, setNewInquiryTitle] = useState("")
  const [newInquiryDescription, setNewInquiryDescription] = useState("")
  const { toast } = useToast()

  const handleSubmitInquiry = (type: "buying" | "selling") => (e: React.FormEvent) => {
    e.preventDefault()
    if (!newInquiryTitle || !newInquiryDescription) {
      toast({
        title: "Greška",
        description: "Molimo popunite sva polja",
        variant: "destructive",
      })
      return
    }
    
    const newInquiry: Inquiry = {
      id: Date.now(),
      title: newInquiryTitle,
      description: newInquiryDescription,
      status: "aktivan",
      date: new Date().toISOString().split('T')[0],
      type
    }
    
    setInquiries(prev => [newInquiry, ...prev])
    
    toast({
      title: "Uspešno",
      description: type === "buying" ? "Vaš upit za kupovinu je uspešno poslat" : "Vaš prodajni oglas je uspešno objavljen",
    })
    
    setNewInquiryTitle("")
    setNewInquiryDescription("")
  }

  // Mock data for Analytics
  const analyticsData = {
    totalInquiries: inquiries.length,
    activeInquiries: inquiries.filter(i => i.status === "aktivan").length,
    completedInquiries: inquiries.filter(i => i.status === "završen").length,
    averageResponseTime: "24h",
    successRate: 85
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      <Tabs defaultValue="buying" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="buying">Kupovina</TabsTrigger>
          <TabsTrigger value="selling">Prodaja</TabsTrigger>
        </TabsList>
        
        <TabsContent value="buying" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">Novi Upit za Kupovinu</h2>
            <form onSubmit={handleSubmitInquiry("buying")} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Naslov</label>
                <Input
                  value={newInquiryTitle}
                  onChange={(e) => setNewInquiryTitle(e.target.value)}
                  placeholder="Unesite naslov upita"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Opis</label>
                <Textarea
                  value={newInquiryDescription}
                  onChange={(e) => setNewInquiryDescription(e.target.value)}
                  placeholder="Detaljno opišite šta vam je potrebno"
                  rows={4}
                />
              </div>
              <Button type="submit" className="w-full">
                Pošalji Upit za Kupovinu
              </Button>
            </form>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">Aktivni Upiti za Kupovinu</h2>
            <div className="space-y-4">
              {inquiries
                .filter(inquiry => inquiry.type === "buying")
                .map((inquiry) => (
                  <Card key={inquiry.id} className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{inquiry.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{inquiry.description}</p>
                        <p className="text-sm text-gray-500 mt-2">Datum: {inquiry.date}</p>
                      </div>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {inquiry.status}
                      </span>
                    </div>
                    <div className="mt-4">
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
        </TabsContent>

        <TabsContent value="selling" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">Novi Prodajni Oglas</h2>
            <form onSubmit={handleSubmitInquiry("selling")} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Naslov</label>
                <Input
                  value={newInquiryTitle}
                  onChange={(e) => setNewInquiryTitle(e.target.value)}
                  placeholder="Unesite naslov oglasa"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Opis</label>
                <Textarea
                  value={newInquiryDescription}
                  onChange={(e) => setNewInquiryDescription(e.target.value)}
                  placeholder="Detaljno opišite šta prodajete"
                  rows={4}
                />
              </div>
              <Button type="submit" className="w-full">
                Objavi Prodajni Oglas
              </Button>
            </form>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">Aktivni Prodajni Oglasi</h2>
            <div className="space-y-4">
              {inquiries
                .filter(inquiry => inquiry.type === "selling")
                .map((inquiry) => (
                  <Card key={inquiry.id} className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{inquiry.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{inquiry.description}</p>
                        <p className="text-sm text-gray-500 mt-2">Datum: {inquiry.date}</p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        {inquiry.status}
                      </span>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <InquiryChat
                        inquiryId={inquiry.id}
                        inquiryTitle={inquiry.title}
                        onClose={() => {}}
                      />
                      <InvoiceGenerator
                        inquiryId={inquiry.id}
                        inquiryTitle={inquiry.title}
                        onClose={() => {}}
                      />
                    </div>
                  </Card>
                ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <Analytics {...analyticsData} />
    </div>
  )
}

export default Dashboard

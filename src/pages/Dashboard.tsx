import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis } from "recharts"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

const mockData = [
  { mesec: "Jan", upiti: 4 },
  { mesec: "Feb", upiti: 6 },
  { mesec: "Mar", upiti: 8 },
  { mesec: "Apr", upiti: 5 },
  { mesec: "Maj", upiti: 7 },
]

const mockInquiries = [
  {
    id: 1,
    title: "Potrebni kancelarijski materijali",
    description: "Tražimo ponudu za kopir papir A4, 80g, 500 listova - 100 kutija",
    status: "aktivan",
    date: "2024-01-23",
  },
  {
    id: 2,
    title: "Računarska oprema",
    description: "Potrebno 10 laptopova za firmu",
    status: "aktivan",
    date: "2024-01-22",
  },
]

const Dashboard = () => {
  const [newInquiryTitle, setNewInquiryTitle] = useState("")
  const [newInquiryDescription, setNewInquiryDescription] = useState("")
  const { toast } = useToast()

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newInquiryTitle || !newInquiryDescription) {
      toast({
        title: "Greška",
        description: "Molimo popunite sva polja",
        variant: "destructive",
      })
      return
    }
    
    toast({
      title: "Uspešno",
      description: "Vaš upit je uspešno poslat",
    })
    
    setNewInquiryTitle("")
    setNewInquiryDescription("")
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Statistika */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Statistika Upita</h2>
          <ChartContainer className="h-[300px]" config={{}}>
            <BarChart data={mockData}>
              <XAxis dataKey="mesec" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="upiti" fill="#3b82f6" />
            </BarChart>
          </ChartContainer>
        </Card>

        {/* Novi upit */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Novi Upit</h2>
          <form onSubmit={handleSubmitInquiry} className="space-y-4">
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
              Pošalji Upit
            </Button>
          </form>
        </Card>
      </div>

      {/* Lista aktivnih upita */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Aktivni Upiti</h2>
        <div className="space-y-4">
          {mockInquiries.map((inquiry) => (
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
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm">
                  Pregledaj ponude
                </Button>
                <Button variant="outline" size="sm">
                  Zatvori upit
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  )
}

export default Dashboard
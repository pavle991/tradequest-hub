import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Analytics } from "@/components/dashboard/Analytics"
import { NewInquiryForm } from "@/components/dashboard/NewInquiryForm"
import { InquiryList } from "@/components/dashboard/InquiryList"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { CompanyProfileButton } from "@/components/layout/CompanyProfileButton"
import { type Inquiry } from "@/components/dashboard/types"
import { supabase } from "@/integrations/supabase/client"

const Dashboard = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const { toast } = useToast()

  useEffect(() => {
    fetchInquiries()
  }, [])

  const fetchInquiries = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        toast({
          title: "Greška",
          description: "Niste prijavljeni",
          variant: "destructive",
        })
        return
      }

      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching inquiries:', error)
        toast({
          title: "Greška",
          description: "Došlo je do greške prilikom učitavanja upita",
          variant: "destructive",
        })
        return
      }

      setInquiries(data as Inquiry[])
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: "Greška",
        description: "Došlo je do greške prilikom učitavanja upita",
        variant: "destructive",
      })
    }
  }

  const handleSubmitInquiry = (title: string, description: string, type: "buying" | "selling", tags: string[]) => {
    const newInquiry: Inquiry = {
      id: crypto.randomUUID(),
      title,
      description,
      status: "aktivan",
      type,
      tags,
      user_id: "", // This will be set by the backend
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    
    setInquiries(prev => [newInquiry, ...prev])
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
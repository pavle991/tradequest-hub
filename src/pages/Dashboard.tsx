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
import { Banner } from "@/components/ui/banner"

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
      user_id: "",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    
    setInquiries(prev => [newInquiry, ...prev])
  }

  const analyticsData = {
    totalInquiries: inquiries.length,
    activeInquiries: inquiries.filter(i => i.status === "aktivan").length,
    completedInquiries: inquiries.filter(i => i.status === "završen").length,
    averageResponseTime: "24h",
    successRate: 85
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Banner
        id="welcome"
        message="🎉 Dobrodošli na novu verziju platforme! Istražite nove funkcionalnosti."
        variant="rainbow"
        height="2.5rem"
      />
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-foreground">Dashboard</h1>
          <CompanyProfileButton />
        </div>
        
        <Tabs defaultValue="buying" className="w-full space-y-8">
          <TabsList className="w-full max-w-md mx-auto bg-muted p-1 rounded-xl">
            <TabsTrigger 
              value="buying" 
              className="w-1/2 py-2 text-base font-medium transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm rounded-lg"
            >
              Nabavka
            </TabsTrigger>
            <TabsTrigger 
              value="selling"
              className="w-1/2 py-2 text-base font-medium transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm rounded-lg"
            >
              Prodaja
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="buying" className="space-y-6 animate-fade-in">
            <NewInquiryForm onSubmit={handleSubmitInquiry} type="buying" />
            <InquiryList inquiries={inquiries} type="buying" />
          </TabsContent>

          <TabsContent value="selling" className="space-y-6 animate-fade-in">
            <InquiryList inquiries={inquiries} type="selling" />
          </TabsContent>
        </Tabs>

        <div className="mt-12">
          <Analytics {...analyticsData} />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Dashboard
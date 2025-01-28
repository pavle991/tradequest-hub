import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Analytics } from "@/components/dashboard/Analytics"
import { NewInquiryForm } from "@/components/dashboard/NewInquiryForm"
import { InquiryList } from "@/components/dashboard/InquiryList"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { CompanyProfileButton } from "@/components/layout/CompanyProfileButton"
import { type Inquiry } from "@/components/dashboard/types"

const Dashboard = () => {
  const { toast } = useToast()

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
  }

  // Analytics data
  const analyticsData = {
    totalInquiries: 0,
    activeInquiries: 0,
    completedInquiries: 0,
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
            <InquiryList type="buying" />
          </TabsContent>

          <TabsContent value="selling" className="space-y-6">
            <InquiryList type="selling" />
          </TabsContent>
        </Tabs>

        <Analytics {...analyticsData} />
      </div>
      <Footer />
    </div>
  )
}

export default Dashboard
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Analytics } from "@/components/dashboard/Analytics"
import { NewInquiryForm } from "@/components/dashboard/NewInquiryForm"
import { InquiryList } from "@/components/dashboard/InquiryList"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { CompanyProfileButton } from "@/components/layout/CompanyProfileButton"
import { type Inquiry } from "@/components/dashboard/types"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

const BuyingDashboard = () => {
  const { toast } = useToast()
  const navigate = useNavigate()

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
  }

  // Analytics data for buying
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
          <h1 className="text-2xl font-bold">Nabavka</h1>
          <div className="flex gap-4 items-center">
            <Button 
              variant="outline"
              onClick={() => navigate("/selling")}
            >
              Prebaci na prodaju
            </Button>
            <CompanyProfileButton />
          </div>
        </div>
        
        <div className="space-y-6">
          <NewInquiryForm onSubmit={handleSubmitInquiry} type="buying" />
          <InquiryList type="buying" />
        </div>

        <Analytics {...analyticsData} />
      </div>
      <Footer />
    </div>
  )
}

export default BuyingDashboard
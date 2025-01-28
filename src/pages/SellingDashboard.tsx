import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Analytics } from "@/components/dashboard/Analytics"
import { InquiryList } from "@/components/dashboard/InquiryList"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { CompanyProfileButton } from "@/components/layout/CompanyProfileButton"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

const SellingDashboard = () => {
  const { toast } = useToast()
  const navigate = useNavigate()

  // Analytics data for selling
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
          <h1 className="text-2xl font-bold">Prodaja</h1>
          <div className="flex gap-4 items-center">
            <Button 
              variant="outline"
              onClick={() => navigate("/buying")}
            >
              Prebaci na nabavku
            </Button>
            <CompanyProfileButton />
          </div>
        </div>
        
        <div className="space-y-6">
          <InquiryList type="selling" />
        </div>

        <Analytics {...analyticsData} />
      </div>
      <Footer />
    </div>
  )
}

export default SellingDashboard
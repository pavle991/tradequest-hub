import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { OfferForm } from "./OfferForm"
import { EmptyInquiryState } from "./EmptyInquiryState"
import { InquiryCard } from "./InquiryCard"
import { type Inquiry } from "./types"
import { supabase } from "@/integrations/supabase/client"

type ActiveInquiriesProps = {
  inquiries: Inquiry[]
  type: "buying" | "selling"
  loading: boolean
}

export const ActiveInquiries = ({ inquiries, type, loading }: ActiveInquiriesProps) => {
  const [selectedInquiryId, setSelectedInquiryId] = useState<string | null>(null)
  const [showOfferForm, setShowOfferForm] = useState(false)
  const [offersCount, setOffersCount] = useState<Record<string, number>>({})

  useEffect(() => {
    if (type === "buying") {
      fetchOffersCount()
    }
  }, [inquiries, type])

  const fetchOffersCount = async () => {
    for (const inquiry of inquiries) {
      const { count } = await supabase
        .from('offers')
        .select('*', { count: 'exact', head: true })
        .eq('inquiry_id', inquiry.id)

      setOffersCount(prev => ({
        ...prev,
        [inquiry.id]: count || 0
      }))
    }
  }

  const handleOpenOfferForm = (inquiryId: string) => {
    setSelectedInquiryId(inquiryId)
    setShowOfferForm(true)
  }

  if (loading) {
    return <div>Učitavanje upita...</div>
  }

  if (inquiries.length === 0) {
    return <EmptyInquiryState type={type} />
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">
        {type === "buying" ? "Vaši upiti" : "Upiti koji odgovaraju vašim tagovima"}
      </h3>
      
      {inquiries.map((inquiry) => (
        <InquiryCard
          key={inquiry.id}
          inquiry={inquiry}
          type={type}
          offersCount={offersCount[inquiry.id]}
          selectedInquiryId={selectedInquiryId}
          onToggleOffers={setSelectedInquiryId}
          onOpenOfferForm={handleOpenOfferForm}
        />
      ))}

      <Dialog 
        open={showOfferForm} 
        onOpenChange={(open) => {
          setShowOfferForm(open)
          if (!open) setSelectedInquiryId(null)
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nova ponuda</DialogTitle>
          </DialogHeader>
          {selectedInquiryId && (
            <OfferForm
              inquiryId={selectedInquiryId}
              onOfferSubmitted={() => {
                setShowOfferForm(false)
                setSelectedInquiryId(null)
              }}
              onCancel={() => {
                setShowOfferForm(false)
                setSelectedInquiryId(null)
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
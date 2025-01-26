import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { OfferForm } from "./OfferForm"
import { OfferList } from "./OfferList"
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

  const toggleOffers = (inquiryId: string) => {
    setSelectedInquiryId(selectedInquiryId === inquiryId ? null : inquiryId)
  }

  if (loading) {
    return <div>Učitavanje upita...</div>
  }

  if (inquiries.length === 0) {
    return (
      <Card className="p-6">
        <p className="text-center text-gray-500">
          {type === "buying" 
            ? "Još uvek nemate aktivnih upita za nabavku." 
            : "Trenutno nema upita koji odgovaraju vašim tagovima."}
        </p>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">
        {type === "buying" ? "Vaši upiti" : "Upiti koji odgovaraju vašim tagovima"}
      </h3>
      
      {inquiries.map((inquiry) => (
        <Card key={inquiry.id} className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="text-xl font-semibold mb-2">{inquiry.title}</h4>
              <p className="text-gray-600 mb-4">{inquiry.description}</p>
              <div className="flex flex-wrap gap-2">
                {inquiry.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            {type === "selling" ? (
              <Button
                onClick={() => {
                  setSelectedInquiryId(inquiry.id)
                  setShowOfferForm(true)
                }}
              >
                Pošalji ponudu
              </Button>
            ) : (
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-2">
                  {offersCount[inquiry.id] > 0 && (
                    <Badge variant="secondary">
                      {offersCount[inquiry.id]} {offersCount[inquiry.id] === 1 ? 'ponuda' : 'ponuda'}
                    </Badge>
                  )}
                  <Button
                    variant="outline"
                    onClick={() => toggleOffers(inquiry.id)}
                  >
                    {selectedInquiryId === inquiry.id ? 'Zatvori ponude' : 'Pogledaj ponude'}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {selectedInquiryId === inquiry.id && !showOfferForm && (
            <div className="mt-4">
              <OfferList
                inquiryId={inquiry.id}
                inquiryTitle={inquiry.title}
              />
            </div>
          )}
        </Card>
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
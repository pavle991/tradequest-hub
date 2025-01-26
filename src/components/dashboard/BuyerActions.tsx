import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { UnreadMessagesBadge } from "./UnreadMessagesBadge"
import { FileCheck, Star } from "lucide-react"
import { useState, useEffect } from "react"
import { InvoiceVerificationDialog } from "./invoice/InvoiceVerificationDialog"
import { RatingDialog } from "./ratings/RatingDialog"
import { supabase } from "@/integrations/supabase/client"

type BuyerActionsProps = {
  inquiryId: string
  offersCount?: number
  unreadCount: number
  selectedInquiryId: string | null
  onToggleOffers: (inquiryId: string) => void
  onClearUnread: () => void
}

export const BuyerActions = ({
  inquiryId,
  offersCount,
  unreadCount,
  selectedInquiryId,
  onToggleOffers,
  onClearUnread
}: BuyerActionsProps) => {
  const [isVerificationOpen, setIsVerificationOpen] = useState(false)
  const [isRatingOpen, setIsRatingOpen] = useState(false)
  const [invoice, setInvoice] = useState<any>(null)

  useEffect(() => {
    fetchInvoice()
  }, [inquiryId])

  const fetchInvoice = async () => {
    try {
      const { data, error } = await supabase
        .from('invoices')
        .select('*')
        .eq('inquiry_id', inquiryId)
        .maybeSingle()

      if (error) throw error
      setInvoice(data)
    } catch (error) {
      console.error('Error fetching invoice:', error)
    }
  }

  return (
    <div className="flex items-center gap-2">
      {offersCount && offersCount > 0 && (
        <Badge variant="secondary">
          {offersCount} {offersCount === 1 ? 'ponuda' : 'ponuda'}
        </Badge>
      )}
      <UnreadMessagesBadge 
        unreadCount={unreadCount} 
        onClear={onClearUnread} 
      />
      <Button
        variant="outline"
        onClick={() => onToggleOffers(inquiryId)}
      >
        {selectedInquiryId === inquiryId ? 'Zatvori ponude' : 'Pogledaj ponude'}
      </Button>

      {invoice?.status === 'verified' ? (
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            className="gap-2"
            onClick={() => setIsVerificationOpen(true)}
          >
            <FileCheck className="w-4 h-4" />
            Pregledaj fakturu
          </Button>
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => setIsRatingOpen(true)}
          >
            <Star className="w-4 h-4" />
            Oceni prodavca
          </Button>
        </div>
      ) : (
        <Button 
          variant="outline" 
          className="gap-2"
          onClick={() => setIsVerificationOpen(true)}
        >
          <FileCheck className="w-4 h-4" />
          Verifikuj fakturu
        </Button>
      )}
      
      <InvoiceVerificationDialog
        open={isVerificationOpen}
        onOpenChange={setIsVerificationOpen}
        inquiryId={inquiryId}
        onVerified={() => {
          fetchInvoice()
          setIsRatingOpen(true)
        }}
      />

      {invoice && (
        <RatingDialog
          open={isRatingOpen}
          onOpenChange={setIsRatingOpen}
          invoiceId={invoice.id}
          sellerId={invoice.seller_id}
          buyerId={invoice.buyer_id}
        />
      )}
    </div>
  )
}
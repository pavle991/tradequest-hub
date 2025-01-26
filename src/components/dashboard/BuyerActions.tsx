import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { UnreadMessagesBadge } from "./UnreadMessagesBadge"
import { FileCheck } from "lucide-react"
import { useState } from "react"
import { InvoiceVerificationDialog } from "./invoice/InvoiceVerificationDialog"

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
      <Button 
        variant="outline" 
        className="gap-2"
        onClick={() => setIsVerificationOpen(true)}
      >
        <FileCheck className="w-4 h-4" />
        Verifikuj fakturu
      </Button>
      
      <InvoiceVerificationDialog
        open={isVerificationOpen}
        onOpenChange={setIsVerificationOpen}
        inquiryId={inquiryId}
      />
    </div>
  )
}
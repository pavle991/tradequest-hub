import { Button } from "@/components/ui/button"
import { InquiryChat } from "./InquiryChat"
import { UnreadMessagesBadge } from "./UnreadMessagesBadge"

type SellerActionsProps = {
  inquiryId: string
  inquiryTitle: string
  hasExistingOffer: boolean
  offerId: string | null
  unreadCount: number
  onOpenOfferForm: (inquiryId: string) => void
  onClearUnread: () => void
}

export const SellerActions = ({ 
  inquiryId, 
  inquiryTitle,
  hasExistingOffer, 
  offerId,
  unreadCount,
  onOpenOfferForm,
  onClearUnread
}: SellerActionsProps) => {
  if (!hasExistingOffer) {
    return (
      <Button onClick={() => onOpenOfferForm(inquiryId)}>
        Pošalji ponudu
      </Button>
    )
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <UnreadMessagesBadge 
        unreadCount={unreadCount} 
        onClear={onClearUnread} 
      />
      <InquiryChat
        inquiryId={inquiryId}
        inquiryTitle={inquiryTitle}
        offerId={offerId}
        onClose={onClearUnread}
      />
    </div>
  )
}
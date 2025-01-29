import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { UnreadMessagesBadge } from "./UnreadMessagesBadge"

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
    </div>
  )
}
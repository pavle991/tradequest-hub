import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type UnreadMessagesBadgeProps = {
  unreadCount: number
  onClear: () => void
}

export const UnreadMessagesBadge = ({ unreadCount, onClear }: UnreadMessagesBadgeProps) => {
  if (unreadCount === 0) return null

  return (
    <Button 
      variant="outline" 
      size="sm"
      onClick={onClear}
      className="flex gap-2 items-center"
    >
      <Badge variant="destructive">
        {unreadCount} {unreadCount === 1 ? 'nepročitana poruka' : 'nepročitanih poruka'}
      </Badge>
    </Button>
  )
}
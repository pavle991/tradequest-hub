import { Card } from "@/components/ui/card"

type ChatHeaderProps = {
  title: string
  offer?: {
    price: number
    currency: string
    description: string
  }
}

export const ChatHeader = ({ title, offer }: ChatHeaderProps) => {
  return (
    <div className="border-b p-4">
      <h3 className="font-semibold mb-2">{title}</h3>
      {offer && (
        <Card className="p-3 bg-muted">
          <p className="font-medium">Ponuda: {offer.price.toLocaleString('sr-RS')} {offer.currency}</p>
          <p className="text-sm text-muted-foreground">{offer.description}</p>
        </Card>
      )}
    </div>
  )
}
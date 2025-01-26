import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { InvoiceItem } from "./InvoiceItem"

export type InvoiceItemData = {
  description: string
  quantity: number
  unitPrice: number
  unit: string
  discount: number
  vatRate: number
}

type ItemsListProps = {
  items: InvoiceItemData[]
  onAddItem: () => void
  onUpdateItem: (index: number, field: keyof InvoiceItemData, value: string | number) => void
  onRemoveItem: (index: number) => void
}

export const ItemsList = ({ 
  items, 
  onAddItem, 
  onUpdateItem, 
  onRemoveItem 
}: ItemsListProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Stavke fakture</h3>
        <Button onClick={onAddItem} size="sm" variant="outline">
          <Plus className="w-4 h-4 mr-2" />
          Dodaj stavku
        </Button>
      </div>

      {items.map((item, index) => (
        <InvoiceItem
          key={index}
          item={item}
          index={index}
          onUpdate={onUpdateItem}
          onRemove={onRemoveItem}
          showRemove={items.length > 1}
        />
      ))}
    </div>
  )
}
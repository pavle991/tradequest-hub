import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2 } from "lucide-react"

type InvoiceItem = {
  description: string
  quantity: number
  unitPrice: number
  unit: string
  discount: number
  vatRate: number
}

type InvoiceItemProps = {
  item: InvoiceItem
  index: number
  onUpdate: (index: number, field: keyof InvoiceItem, value: string | number) => void
  onRemove: (index: number) => void
  showRemove: boolean
}

export const InvoiceItem = ({ 
  item, 
  index, 
  onUpdate, 
  onRemove,
  showRemove 
}: InvoiceItemProps) => {
  const calculateItemAmount = () => {
    const baseAmount = item.quantity * item.unitPrice
    const discountAmount = baseAmount * (item.discount / 100)
    return baseAmount - discountAmount
  }

  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Opis</Label>
          <Input
            value={item.description}
            onChange={(e) => onUpdate(index, 'description', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Jedinica mere</Label>
          <Input
            value={item.unit}
            onChange={(e) => onUpdate(index, 'unit', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Količina</Label>
          <Input
            type="number"
            value={item.quantity}
            onChange={(e) => onUpdate(index, 'quantity', parseFloat(e.target.value))}
          />
        </div>
        <div className="space-y-2">
          <Label>Cena po jedinici (RSD)</Label>
          <Input
            type="number"
            value={item.unitPrice}
            onChange={(e) => onUpdate(index, 'unitPrice', parseFloat(e.target.value))}
          />
        </div>
        <div className="space-y-2">
          <Label>Popust (%)</Label>
          <Input
            type="number"
            value={item.discount}
            onChange={(e) => onUpdate(index, 'discount', parseFloat(e.target.value))}
          />
        </div>
        <div className="space-y-2">
          <Label>PDV (%)</Label>
          <Input
            type="number"
            value={item.vatRate}
            onChange={(e) => onUpdate(index, 'vatRate', parseFloat(e.target.value))}
          />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Iznos: {calculateItemAmount().toLocaleString('sr-RS')} RSD
          <br />
          PDV: {(calculateItemAmount() * (item.vatRate / 100)).toLocaleString('sr-RS')} RSD
        </div>
        {showRemove && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(index)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
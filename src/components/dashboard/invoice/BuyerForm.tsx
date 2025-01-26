import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type BuyerFormData = {
  buyerName: string
  buyerAddress: string
  dueDate: string
}

type BuyerFormProps = {
  data: BuyerFormData
  onChange: (data: BuyerFormData) => void
}

export const BuyerForm = ({ data, onChange }: BuyerFormProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label>Ime kupca</Label>
        <Input
          value={data.buyerName}
          onChange={(e) =>
            onChange({ ...data, buyerName: e.target.value })
          }
        />
      </div>
      <div className="space-y-2">
        <Label>Adresa kupca</Label>
        <Input
          value={data.buyerAddress}
          onChange={(e) =>
            onChange({ ...data, buyerAddress: e.target.value })
          }
        />
      </div>
      <div className="space-y-2">
        <Label>Rok plaćanja</Label>
        <Input
          type="date"
          value={data.dueDate}
          onChange={(e) =>
            onChange({ ...data, dueDate: e.target.value })
          }
        />
      </div>
    </div>
  )
}
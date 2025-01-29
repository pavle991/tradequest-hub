import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { Plus, Trash2 } from "lucide-react"

type InvoiceItem = {
  description: string
  quantity: number
  unitPrice: number
  unit: string
  discount: number
  vatRate: number
}

type InvoiceGeneratorProps = {
  inquiryId: string
  inquiryTitle: string
  offerId: string
  onClose: () => void
}

export const InvoiceGenerator = ({ 
  inquiryId, 
  inquiryTitle,
  offerId,
  onClose 
}: InvoiceGeneratorProps) => {
  const [invoiceData, setInvoiceData] = useState({
    buyerName: "",
    buyerAddress: "",
    dueDate: "",
  })

  const [items, setItems] = useState<InvoiceItem[]>([{
    description: "",
    quantity: 1,
    unitPrice: 0,
    unit: "kom",
    discount: 0,
    vatRate: 20
  }])

  const { toast } = useToast()

  const calculateItemAmount = (item: InvoiceItem) => {
    const baseAmount = item.quantity * item.unitPrice
    const discountAmount = baseAmount * (item.discount / 100)
    return baseAmount - discountAmount
  }

  const calculateTotalAmount = () => {
    return items.reduce((sum, item) => sum + calculateItemAmount(item), 0)
  }

  const calculateVatAmount = () => {
    return items.reduce((sum, item) => {
      const amount = calculateItemAmount(item)
      return sum + (amount * (item.vatRate / 100))
    }, 0)
  }

  const addItem = () => {
    setItems([...items, {
      description: "",
      quantity: 1,
      unitPrice: 0,
      unit: "kom",
      discount: 0,
      vatRate: 20
    }])
  }

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const updateItem = (index: number, field: keyof InvoiceItem, value: string | number) => {
    const newItems = [...items]
    newItems[index] = {
      ...newItems[index],
      [field]: value
    }
    setItems(newItems)
  }

  const handleGenerateInvoice = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        toast({
          title: "Greška",
          description: "Niste prijavljeni",
          variant: "destructive",
        })
        return
      }

      // Kreiranje fakture
      const { data: invoice, error: invoiceError } = await supabase
        .from('invoices')
        .insert({
          inquiry_id: inquiryId,
          offer_id: offerId,
          seller_id: user.id,
          invoice_number: `INV-${Date.now()}`,
          due_date: invoiceData.dueDate, // Now passing the string directly
          total_amount: calculateTotalAmount(),
          vat_amount: calculateVatAmount(),
          total_with_vat: calculateTotalAmount() + calculateVatAmount(),
        })
        .select()
        .single()

      if (invoiceError) throw invoiceError

      // Kreiranje stavki fakture
      const invoiceItems = items.map(item => ({
        invoice_id: invoice.id,
        description: item.description,
        quantity: item.quantity,
        unit_price: item.unitPrice,
        unit: item.unit,
        discount: item.discount,
        amount: calculateItemAmount(item),
        vat_rate: item.vatRate,
      }))

      const { error: itemsError } = await supabase
        .from('invoice_items')
        .insert(invoiceItems)

      if (itemsError) throw itemsError

      toast({
        title: "Uspešno",
        description: "Faktura je uspešno generisana",
      })
      onClose()
    } catch (error) {
      console.error('Error generating invoice:', error)
      toast({
        title: "Greška",
        description: "Došlo je do greške prilikom generisanja fakture",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Generiši fakturu
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Generisanje fakture za: {inquiryTitle}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Ime kupca</Label>
              <Input
                value={invoiceData.buyerName}
                onChange={(e) =>
                  setInvoiceData({ ...invoiceData, buyerName: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Adresa kupca</Label>
              <Input
                value={invoiceData.buyerAddress}
                onChange={(e) =>
                  setInvoiceData({ ...invoiceData, buyerAddress: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Rok plaćanja</Label>
              <Input
                type="date"
                value={invoiceData.dueDate}
                onChange={(e) =>
                  setInvoiceData({ ...invoiceData, dueDate: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Stavke fakture</h3>
              <Button onClick={addItem} size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Dodaj stavku
              </Button>
            </div>

            {items.map((item, index) => (
              <div key={index} className="space-y-4 p-4 border rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Opis</Label>
                    <Input
                      value={item.description}
                      onChange={(e) => updateItem(index, 'description', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Jedinica mere</Label>
                    <Input
                      value={item.unit}
                      onChange={(e) => updateItem(index, 'unit', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Količina</Label>
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Cena po jedinici (RSD)</Label>
                    <Input
                      type="number"
                      value={item.unitPrice}
                      onChange={(e) => updateItem(index, 'unitPrice', parseFloat(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Popust (%)</Label>
                    <Input
                      type="number"
                      value={item.discount}
                      onChange={(e) => updateItem(index, 'discount', parseFloat(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>PDV (%)</Label>
                    <Input
                      type="number"
                      value={item.vatRate}
                      onChange={(e) => updateItem(index, 'vatRate', parseFloat(e.target.value))}
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    Iznos: {calculateItemAmount(item).toLocaleString('sr-RS')} RSD
                    <br />
                    PDV: {(calculateItemAmount(item) * (item.vatRate / 100)).toLocaleString('sr-RS')} RSD
                  </div>
                  {items.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}

            <div className="flex justify-end space-x-4 text-right">
              <div>
                <div className="text-sm text-gray-600">Ukupno bez PDV-a:</div>
                <div className="font-semibold">{calculateTotalAmount().toLocaleString('sr-RS')} RSD</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">PDV:</div>
                <div className="font-semibold">{calculateVatAmount().toLocaleString('sr-RS')} RSD</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Ukupno sa PDV-om:</div>
                <div className="font-semibold">{(calculateTotalAmount() + calculateVatAmount()).toLocaleString('sr-RS')} RSD</div>
              </div>
            </div>
          </div>

          <Button onClick={handleGenerateInvoice} className="w-full">
            Generiši fakturu
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
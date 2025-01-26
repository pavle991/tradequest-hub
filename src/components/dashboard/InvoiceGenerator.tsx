import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { BuyerForm } from "./invoice/BuyerForm"
import { ItemsList, type InvoiceItemData } from "./invoice/ItemsList"
import { InvoiceSummary } from "./invoice/InvoiceSummary"

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
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [invoiceData, setInvoiceData] = useState({
    buyerName: "",
    buyerAddress: "",
    dueDate: "",
  })

  const [items, setItems] = useState<InvoiceItemData[]>([{
    description: "",
    quantity: 1,
    unitPrice: 0,
    unit: "kom",
    discount: 0,
    vatRate: 20
  }])

  const { toast } = useToast()

  const calculateItemAmount = (item: InvoiceItemData) => {
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

  const updateItem = (index: number, field: keyof InvoiceItemData, value: string | number) => {
    const newItems = [...items]
    newItems[index] = {
      ...newItems[index],
      [field]: value
    }
    setItems(newItems)
  }

  const validateForm = () => {
    if (!invoiceData.buyerName.trim()) {
      toast({
        title: "Greška",
        description: "Unesite ime kupca",
        variant: "destructive",
      })
      return false
    }

    if (!invoiceData.buyerAddress.trim()) {
      toast({
        title: "Greška",
        description: "Unesite adresu kupca",
        variant: "destructive",
      })
      return false
    }

    if (!invoiceData.dueDate) {
      toast({
        title: "Greška",
        description: "Unesite rok plaćanja",
        variant: "destructive",
      })
      return false
    }

    const invalidItems = items.some(item => 
      !item.description.trim() || 
      item.quantity <= 0 || 
      item.unitPrice <= 0
    )

    if (invalidItems) {
      toast({
        title: "Greška",
        description: "Proverite unete stavke fakture",
        variant: "destructive",
      })
      return false
    }

    return true
  }

  const handleGenerateInvoice = async () => {
    if (!validateForm()) return

    try {
      setLoading(true)
      
      // Get the current user
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        toast({
          title: "Greška",
          description: "Niste prijavljeni",
          variant: "destructive",
        })
        return
      }

      // Get the inquiry details to find the buyer
      const { data: inquiry } = await supabase
        .from('inquiries')
        .select('user_id')
        .eq('id', inquiryId)
        .single()

      if (!inquiry) {
        toast({
          title: "Greška",
          description: "Upit nije pronađen",
          variant: "destructive",
        })
        return
      }

      // Create the invoice with buyer_id from inquiry
      const { data: invoice, error: invoiceError } = await supabase
        .from('invoices')
        .insert({
          inquiry_id: inquiryId,
          offer_id: offerId,
          seller_id: user.id,
          buyer_id: inquiry.user_id, // Set the buyer_id from inquiry
          invoice_number: `INV-${Date.now()}`,
          due_date: invoiceData.dueDate,
          total_amount: calculateTotalAmount(),
          vat_amount: calculateVatAmount(),
          total_with_vat: calculateTotalAmount() + calculateVatAmount(),
          status: 'pending'
        })
        .select()
        .single()

      if (invoiceError) {
        console.error('Error creating invoice:', invoiceError)
        toast({
          title: "Greška",
          description: "Došlo je do greške prilikom kreiranja fakture",
          variant: "destructive",
        })
        return
      }

      if (!invoice) {
        toast({
          title: "Greška",
          description: "Faktura nije kreirana",
          variant: "destructive",
        })
        return
      }

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

      if (itemsError) {
        console.error('Error creating invoice items:', itemsError)
        toast({
          title: "Greška",
          description: "Došlo je do greške prilikom čuvanja stavki fakture",
          variant: "destructive",
        })
        return
      }
      
      toast({
        title: "Uspešno",
        description: "Faktura je uspešno generisana",
      })
      
      setInvoiceData({
        buyerName: "",
        buyerAddress: "",
        dueDate: "",
      })
      setItems([{
        description: "",
        quantity: 1,
        unitPrice: 0,
        unit: "kom",
        discount: 0,
        vatRate: 20
      }])
      setOpen(false)
      onClose()
    } catch (error) {
      console.error('Error generating invoice:', error)
      toast({
        title: "Greška",
        description: "Došlo je do greške prilikom generisanja fakture",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Generiši fakturu
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Generisanje fakture za: {inquiryTitle}</DialogTitle>
          <DialogDescription>
            Popunite podatke o kupcu i dodajte stavke fakture
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <BuyerForm 
            data={invoiceData}
            onChange={setInvoiceData}
          />

          <ItemsList
            items={items}
            onAddItem={addItem}
            onUpdateItem={updateItem}
            onRemoveItem={removeItem}
          />

          <InvoiceSummary
            totalAmount={calculateTotalAmount()}
            vatAmount={calculateVatAmount()}
          />

          <Button 
            onClick={handleGenerateInvoice} 
            className="w-full"
            disabled={loading}
          >
            {loading ? "Generisanje..." : "Generiši fakturu"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
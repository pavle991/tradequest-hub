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
import { BuyerForm } from "./invoice/BuyerForm"
import { ItemsList } from "./invoice/ItemsList"
import { InvoiceSummary } from "./invoice/InvoiceSummary"
import { useInvoiceItems } from "./invoice/useInvoiceItems"
import { useInvoiceGeneration } from "./invoice/useInvoiceGeneration"

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
  const [invoiceData, setInvoiceData] = useState({
    buyerName: "",
    buyerAddress: "",
    dueDate: "",
  })

  const {
    items,
    addItem,
    removeItem,
    updateItem,
    calculateTotalAmount,
    calculateVatAmount
  } = useInvoiceItems()

  const { loading, generateInvoice } = useInvoiceGeneration(inquiryId, offerId, () => {
    setOpen(false)
    onClose()
  })

  const handleGenerateInvoice = () => {
    generateInvoice(invoiceData, items, calculateTotalAmount, calculateVatAmount)
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
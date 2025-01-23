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

type InvoiceGeneratorProps = {
  inquiryId: number
  inquiryTitle: string
  onClose: () => void
}

export const InvoiceGenerator = ({ inquiryId, inquiryTitle, onClose }: InvoiceGeneratorProps) => {
  const [invoiceData, setInvoiceData] = useState({
    buyerName: "",
    buyerAddress: "",
    amount: "",
    tax: "20",
  })
  const { toast } = useToast()

  const handleGenerateInvoice = () => {
    // Here you would typically generate and save the invoice
    toast({
      title: "Uspešno",
      description: "Faktura je uspešno generisana",
    })
    onClose()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Zatvori upit i generiši fakturu
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generisanje fakture za: {inquiryTitle}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
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
            <Label>Iznos (RSD)</Label>
            <Input
              type="number"
              value={invoiceData.amount}
              onChange={(e) =>
                setInvoiceData({ ...invoiceData, amount: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>PDV (%)</Label>
            <Input
              type="number"
              value={invoiceData.tax}
              onChange={(e) =>
                setInvoiceData({ ...invoiceData, tax: e.target.value })
              }
            />
          </div>
          <Button onClick={handleGenerateInvoice} className="w-full">
            Generiši fakturu
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
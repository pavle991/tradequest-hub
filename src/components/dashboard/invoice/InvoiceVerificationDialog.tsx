import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { InvoiceDetails } from "./InvoiceDetails"

type InvoiceVerificationDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  inquiryId: string
}

export const InvoiceVerificationDialog = ({
  open,
  onOpenChange,
  inquiryId
}: InvoiceVerificationDialogProps) => {
  const [invoice, setInvoice] = useState<any>(null)
  const [invoiceItems, setInvoiceItems] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    if (open) {
      fetchInvoice()
    }
  }, [open, inquiryId])

  const fetchInvoice = async () => {
    try {
      setIsLoading(true)
      
      const { data: invoiceData, error: invoiceError } = await supabase
        .from('invoices')
        .select('*')
        .eq('inquiry_id', inquiryId)
        .maybeSingle()

      if (invoiceError) throw invoiceError

      if (!invoiceData) {
        setInvoice(null)
        setInvoiceItems([])
        setIsLoading(false)
        return
      }

      setInvoice(invoiceData)

      const { data: itemsData, error: itemsError } = await supabase
        .from('invoice_items')
        .select('*')
        .eq('invoice_id', invoiceData.id)

      if (itemsError) throw itemsError

      setInvoiceItems(itemsData || [])
    } catch (error) {
      console.error('Error fetching invoice:', error)
      toast({
        title: "Greška",
        description: "Došlo je do greške prilikom učitavanja fakture",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {invoice?.status === 'verified' ? 'Pregled fakture' : 'Verifikacija fakture'}
          </DialogTitle>
          <DialogDescription>
            {invoice?.status === 'verified' 
              ? 'Pregled verifikovane fakture'
              : 'Pregledajte i verifikujte fakturu'}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {isLoading ? (
            <p>Učitavanje...</p>
          ) : !invoice ? (
            <p>Faktura nije pronađena za ovaj upit.</p>
          ) : (
            <InvoiceDetails 
              invoice={invoice} 
              invoiceItems={invoiceItems}
              onVerify={() => {
                onOpenChange(false)
              }}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
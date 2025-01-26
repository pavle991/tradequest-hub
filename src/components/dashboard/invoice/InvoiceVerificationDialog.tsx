import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
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
  const { toast } = useToast()

  const fetchInvoiceData = async () => {
    try {
      const { data: invoiceData, error: invoiceError } = await supabase
        .from('invoices')
        .select('*')
        .eq('inquiry_id', inquiryId)
        .single()

      if (invoiceError) throw invoiceError

      if (invoiceData) {
        setInvoice(invoiceData)
        
        const { data: items, error: itemsError } = await supabase
          .from('invoice_items')
          .select('*')
          .eq('invoice_id', invoiceData.id)

        if (itemsError) throw itemsError
        setInvoiceItems(items || [])
      }
    } catch (error) {
      console.error('Error fetching invoice:', error)
      toast({
        title: "Greška",
        description: "Došlo je do greške prilikom učitavanja fakture",
        variant: "destructive",
      })
    }
  }

  const handleVerifyInvoice = async () => {
    if (!invoice) return

    try {
      const { error } = await supabase
        .from('invoices')
        .update({ status: 'verified' })
        .eq('id', invoice.id)

      if (error) throw error

      toast({
        title: "Uspešno",
        description: "Faktura je uspešno verifikovana",
      })
      onOpenChange(false)
    } catch (error) {
      console.error('Error verifying invoice:', error)
      toast({
        title: "Greška",
        description: "Došlo je do greške prilikom verifikacije fakture",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    if (open) {
      fetchInvoiceData()
    }
  }, [open, inquiryId])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Verifikacija fakture</DialogTitle>
        </DialogHeader>
        <InvoiceDetails 
          invoice={invoice}
          invoiceItems={invoiceItems}
          onVerify={handleVerifyInvoice}
        />
      </DialogContent>
    </Dialog>
  )
}
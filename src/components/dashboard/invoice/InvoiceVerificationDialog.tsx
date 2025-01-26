import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"

type InvoiceVerificationDialogProps = {
  inquiryId: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const InvoiceVerificationDialog = ({
  inquiryId,
  open,
  onOpenChange,
}: InvoiceVerificationDialogProps) => {
  const [invoice, setInvoice] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const fetchInvoiceData = async () => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('invoices')
        .select('*, invoice_items(*)')
        .eq('inquiry_id', inquiryId)
        .maybeSingle()

      if (error) throw error
      setInvoice(data)
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

  useEffect(() => {
    if (open) {
      fetchInvoiceData()
    }
  }, [open, inquiryId])

  const handleVerifyInvoice = async () => {
    try {
      setIsLoading(true)
      const { error } = await supabase
        .from('invoices')
        .update({ status: 'verified' })
        .eq('id', invoice.id)

      if (error) throw error

      toast({
        title: "Uspešno",
        description: "Faktura je verifikovana",
      })
      onOpenChange(false)
    } catch (error) {
      console.error('Error verifying invoice:', error)
      toast({
        title: "Greška",
        description: "Došlo je do greške prilikom verifikacije fakture",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Verifikacija fakture</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
          </div>
        ) : !invoice ? (
          <div className="text-center p-8">
            <p>Faktura nije pronađena za ovaj upit.</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Detalji fakture</h3>
              <div className="space-y-2">
                <p>Broj fakture: {invoice.invoice_number}</p>
                <p>Datum: {new Date(invoice.invoice_date).toLocaleDateString()}</p>
                <p>Rok plaćanja: {new Date(invoice.due_date).toLocaleDateString()}</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Stavke</h3>
              <div className="space-y-2">
                {invoice.invoice_items?.map((item: any) => (
                  <div key={item.id} className="border p-2 rounded">
                    <p>{item.description}</p>
                    <p>Količina: {item.quantity} {item.unit}</p>
                    <p>Cena: {item.unit_price}</p>
                    <p>Iznos: {item.amount}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <p>Ukupan iznos: {invoice.total_amount}</p>
              <p>PDV: {invoice.vat_amount}</p>
              <p className="font-semibold">
                Ukupno sa PDV: {invoice.total_with_vat}
              </p>
            </div>

            <Button 
              onClick={handleVerifyInvoice} 
              className="w-full"
              disabled={isLoading || invoice.status === 'verified'}
            >
              {invoice.status === 'verified' ? 'Faktura je verifikovana' : 'Verifikuj fakturu'}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
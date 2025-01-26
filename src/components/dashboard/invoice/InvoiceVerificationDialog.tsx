import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"

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
        {invoice ? (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Detalji fakture</h3>
              <p>Broj fakture: {invoice.invoice_number}</p>
              <p>Datum: {new Date(invoice.invoice_date).toLocaleDateString()}</p>
              <p>Rok plaćanja: {new Date(invoice.due_date).toLocaleDateString()}</p>
            </div>
            
            <div>
              <h3 className="font-semibold">Stavke</h3>
              <div className="space-y-2">
                {invoiceItems.map((item) => (
                  <div key={item.id} className="border p-2 rounded">
                    <p>{item.description}</p>
                    <p>Količina: {item.quantity} {item.unit}</p>
                    <p>Cena: {item.unit_price} RSD</p>
                    <p>Popust: {item.discount}%</p>
                    <p>PDV: {item.vat_rate}%</p>
                    <p>Ukupno: {item.amount} RSD</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-right">
              <p>Ukupno bez PDV-a: {invoice.total_amount} RSD</p>
              <p>PDV: {invoice.vat_amount} RSD</p>
              <p className="font-semibold">Ukupno sa PDV-om: {invoice.total_with_vat} RSD</p>
            </div>

            {invoice.status === 'pending' && (
              <Button 
                className="w-full" 
                onClick={handleVerifyInvoice}
              >
                Verifikuj fakturu
              </Button>
            )}
            {invoice.status === 'verified' && (
              <Badge>Faktura je verifikovana</Badge>
            )}
          </div>
        ) : (
          <p>Nema dostupne fakture za ovaj upit.</p>
        )}
      </DialogContent>
    </Dialog>
  )
}
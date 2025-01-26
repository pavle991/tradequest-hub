import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { UnreadMessagesBadge } from "./UnreadMessagesBadge"
import { FileCheck } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useState } from "react"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"

type BuyerActionsProps = {
  inquiryId: string
  offersCount?: number
  unreadCount: number
  selectedInquiryId: string | null
  onToggleOffers: (inquiryId: string) => void
  onClearUnread: () => void
}

export const BuyerActions = ({
  inquiryId,
  offersCount,
  unreadCount,
  selectedInquiryId,
  onToggleOffers,
  onClearUnread
}: BuyerActionsProps) => {
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
    } catch (error) {
      console.error('Error verifying invoice:', error)
      toast({
        title: "Greška",
        description: "Došlo je do greške prilikom verifikacije fakture",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex items-center gap-2">
      {offersCount && offersCount > 0 && (
        <Badge variant="secondary">
          {offersCount} {offersCount === 1 ? 'ponuda' : 'ponuda'}
        </Badge>
      )}
      <UnreadMessagesBadge 
        unreadCount={unreadCount} 
        onClear={onClearUnread} 
      />
      <Button
        variant="outline"
        onClick={() => onToggleOffers(inquiryId)}
      >
        {selectedInquiryId === inquiryId ? 'Zatvori ponude' : 'Pogledaj ponude'}
      </Button>
      <Dialog onOpenChange={(open) => {
        if (open) {
          fetchInvoiceData()
        }
      }}>
        <DialogTrigger asChild>
          <Button variant="outline" className="gap-2">
            <FileCheck className="w-4 h-4" />
            Verifikuj fakturu
          </Button>
        </DialogTrigger>
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
    </div>
  )
}
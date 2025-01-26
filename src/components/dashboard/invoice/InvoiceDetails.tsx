import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

type InvoiceDetailsProps = {
  invoice: any
  invoiceItems: any[]
  onVerify: () => void
}

export const InvoiceDetails = ({ 
  invoice, 
  invoiceItems,
  onVerify 
}: InvoiceDetailsProps) => {
  if (!invoice) {
    return <p>Nema dostupne fakture za ovaj upit.</p>
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold">Detalji fakture</h3>
        <p>Broj fakture: {invoice.invoice_number}</p>
        <p>Datum: {new Date(invoice.invoice_date).toLocaleDateString()}</p>
        <p>Rok plaćanja: {new Date(invoice.due_date).toLocaleDateString()}</p>
      </div>
      
      <div>
        <h3 className="font-semibold mb-2">Stavke</h3>
        <div className="space-y-2">
          {invoiceItems.map((item) => (
            <Card key={item.id} className="p-3">
              <p className="font-medium">{item.description}</p>
              <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                <p>Količina: {item.quantity} {item.unit}</p>
                <p>Cena: {item.unit_price} RSD</p>
                <p>Popust: {item.discount}%</p>
                <p>PDV: {item.vat_rate}%</p>
                <p className="col-span-2 font-medium">Ukupno: {item.amount} RSD</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="text-right space-y-1">
        <p>Ukupno bez PDV-a: {invoice.total_amount} RSD</p>
        <p>PDV: {invoice.vat_amount} RSD</p>
        <p className="font-semibold">Ukupno sa PDV-om: {invoice.total_with_vat} RSD</p>
      </div>

      {invoice.status === 'pending' && (
        <Button 
          className="w-full" 
          onClick={onVerify}
        >
          Verifikuj fakturu
        </Button>
      )}
      {invoice.status === 'verified' && (
        <Badge className="w-full flex justify-center py-2">
          Faktura je verifikovana
        </Badge>
      )}
    </div>
  )
}
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

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
          onClick={onVerify}
        >
          Verifikuj fakturu
        </Button>
      )}
      {invoice.status === 'verified' && (
        <Badge>Faktura je verifikovana</Badge>
      )}
    </div>
  )
}
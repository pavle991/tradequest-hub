type InvoiceSummaryProps = {
  totalAmount: number
  vatAmount: number
}

export const InvoiceSummary = ({ totalAmount, vatAmount }: InvoiceSummaryProps) => {
  return (
    <div className="flex justify-end space-x-4 text-right">
      <div>
        <div className="text-sm text-gray-600">Ukupno bez PDV-a:</div>
        <div className="font-semibold">{totalAmount.toLocaleString('sr-RS')} RSD</div>
      </div>
      <div>
        <div className="text-sm text-gray-600">PDV:</div>
        <div className="font-semibold">{vatAmount.toLocaleString('sr-RS')} RSD</div>
      </div>
      <div>
        <div className="text-sm text-gray-600">Ukupno sa PDV-om:</div>
        <div className="font-semibold">{(totalAmount + vatAmount).toLocaleString('sr-RS')} RSD</div>
      </div>
    </div>
  )
}
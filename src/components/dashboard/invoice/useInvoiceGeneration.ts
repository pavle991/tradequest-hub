import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { InvoiceItemData } from "./ItemsList"

export const useInvoiceGeneration = (
  inquiryId: string,
  offerId: string,
  onClose: () => void
) => {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const generateInvoice = async (
    invoiceData: {
      buyerName: string
      buyerAddress: string
      dueDate: string
    },
    items: InvoiceItemData[],
    calculateTotalAmount: () => number,
    calculateVatAmount: () => number
  ) => {
    if (!validateForm(invoiceData, items, toast)) return

    try {
      setLoading(true)
      
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        toast({
          title: "Greška",
          description: "Niste prijavljeni",
          variant: "destructive",
        })
        return
      }

      const { data: inquiry } = await supabase
        .from('inquiries')
        .select('user_id')
        .eq('id', inquiryId)
        .single()

      if (!inquiry) {
        toast({
          title: "Greška",
          description: "Upit nije pronađen",
          variant: "destructive",
        })
        return
      }

      const { data: invoice, error: invoiceError } = await supabase
        .from('invoices')
        .insert({
          inquiry_id: inquiryId,
          offer_id: offerId,
          seller_id: user.id,
          buyer_id: inquiry.user_id,
          invoice_number: `INV-${Date.now()}`,
          due_date: invoiceData.dueDate,
          total_amount: calculateTotalAmount(),
          vat_amount: calculateVatAmount(),
          total_with_vat: calculateTotalAmount() + calculateVatAmount(),
          status: 'pending'
        })
        .select()
        .single()

      if (invoiceError) {
        console.error('Error creating invoice:', invoiceError)
        toast({
          title: "Greška",
          description: "Došlo je do greške prilikom kreiranja fakture",
          variant: "destructive",
        })
        return
      }

      if (!invoice) {
        toast({
          title: "Greška",
          description: "Faktura nije kreirana",
          variant: "destructive",
        })
        return
      }

      const invoiceItems = items.map(item => ({
        invoice_id: invoice.id,
        description: item.description,
        quantity: item.quantity,
        unit_price: item.unitPrice,
        unit: item.unit,
        discount: item.discount,
        amount: calculateItemAmount(item),
        vat_rate: item.vatRate,
      }))

      const { error: itemsError } = await supabase
        .from('invoice_items')
        .insert(invoiceItems)

      if (itemsError) {
        console.error('Error creating invoice items:', itemsError)
        toast({
          title: "Greška",
          description: "Došlo je do greške prilikom čuvanja stavki fakture",
          variant: "destructive",
        })
        return
      }
      
      toast({
        title: "Uspešno",
        description: "Faktura je uspešno generisana",
      })
      
      onClose()
    } catch (error) {
      console.error('Error generating invoice:', error)
      toast({
        title: "Greška",
        description: "Došlo je do greške prilikom generisanja fakture",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    generateInvoice
  }
}

const calculateItemAmount = (item: InvoiceItemData) => {
  const baseAmount = item.quantity * item.unitPrice
  const discountAmount = baseAmount * (item.discount / 100)
  return baseAmount - discountAmount
}

const validateForm = (
  invoiceData: { buyerName: string; buyerAddress: string; dueDate: string },
  items: InvoiceItemData[],
  toast: any
) => {
  if (!invoiceData.buyerName.trim()) {
    toast({
      title: "Greška",
      description: "Unesite ime kupca",
      variant: "destructive",
    })
    return false
  }

  if (!invoiceData.buyerAddress.trim()) {
    toast({
      title: "Greška",
      description: "Unesite adresu kupca",
      variant: "destructive",
    })
    return false
  }

  if (!invoiceData.dueDate) {
    toast({
      title: "Greška",
      description: "Unesite rok plaćanja",
      variant: "destructive",
    })
    return false
  }

  const invalidItems = items.some(item => 
    !item.description.trim() || 
    item.quantity <= 0 || 
    item.unitPrice <= 0
  )

  if (invalidItems) {
    toast({
      title: "Greška",
      description: "Proverite unete stavke fakture",
      variant: "destructive",
    })
    return false
  }

  return true
}
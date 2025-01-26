import { useState } from "react"
import { InvoiceItemData } from "./ItemsList"

export const useInvoiceItems = () => {
  const [items, setItems] = useState<InvoiceItemData[]>([{
    description: "",
    quantity: 1,
    unitPrice: 0,
    unit: "kom",
    discount: 0,
    vatRate: 20
  }])

  const addItem = () => {
    setItems([...items, {
      description: "",
      quantity: 1,
      unitPrice: 0,
      unit: "kom",
      discount: 0,
      vatRate: 20
    }])
  }

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const updateItem = (index: number, field: keyof InvoiceItemData, value: string | number) => {
    const newItems = [...items]
    newItems[index] = {
      ...newItems[index],
      [field]: value
    }
    setItems(newItems)
  }

  const calculateItemAmount = (item: InvoiceItemData) => {
    const baseAmount = item.quantity * item.unitPrice
    const discountAmount = baseAmount * (item.discount / 100)
    return baseAmount - discountAmount
  }

  const calculateTotalAmount = () => {
    return items.reduce((sum, item) => sum + calculateItemAmount(item), 0)
  }

  const calculateVatAmount = () => {
    return items.reduce((sum, item) => {
      const amount = calculateItemAmount(item)
      return sum + (amount * (item.vatRate / 100))
    }, 0)
  }

  return {
    items,
    setItems,
    addItem,
    removeItem,
    updateItem,
    calculateTotalAmount,
    calculateVatAmount
  }
}
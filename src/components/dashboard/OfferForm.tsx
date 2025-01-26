import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"

type OfferFormProps = {
  inquiryId: string
  onOfferSubmitted: () => void
  onCancel: () => void
}

export const OfferForm = ({ inquiryId, onOfferSubmitted, onCancel }: OfferFormProps) => {
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!price || !description) {
      toast.error("Molimo vas da popunite sva polja")
      return
    }

    const numericPrice = parseFloat(price)
    if (isNaN(numericPrice) || numericPrice <= 0) {
      toast.error("Molimo vas unesite validnu cenu")
      return
    }

    setIsSubmitting(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        toast.error("Niste prijavljeni")
        return
      }

      const { error } = await supabase
        .from('offers')
        .insert([{
          inquiry_id: inquiryId,
          seller_id: user.id,
          price: numericPrice,
          currency: "RSD",
          description,
          status: "pending"
        }])

      if (error) {
        console.error('Offer submission error:', error)
        throw error
      }

      toast.success("Ponuda je uspešno poslata")
      onOfferSubmitted()
    } catch (error) {
      console.error('Error submitting offer:', error)
      toast.error("Došlo je do greške prilikom slanja ponude. Molimo pokušajte ponovo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          type="number"
          placeholder="Cena (RSD)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          min="0"
          step="0.01"
        />
      </div>
      <div>
        <Textarea
          placeholder="Opis ponude i uslovi prodaje"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Odustani
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Slanje..." : "Pošalji ponudu"}
        </Button>
      </div>
    </form>
  )
}
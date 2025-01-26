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

    setIsSubmitting(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        toast.error("Niste prijavljeni")
        return
      }

      const { error } = await supabase
        .from('offers')
        .insert({
          inquiry_id: inquiryId,
          seller_id: user.id,
          price: parseFloat(price),
          currency: "RSD",
          description,
        })

      if (error) throw error

      toast.success("Ponuda je uspešno poslata")
      onOfferSubmitted()
    } catch (error) {
      console.error('Error submitting offer:', error)
      toast.error("Došlo je do greške prilikom slanja ponude")
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
          Pošalji ponudu
        </Button>
      </div>
    </form>
  )
}
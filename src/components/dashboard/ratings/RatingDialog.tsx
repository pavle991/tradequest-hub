import { useState } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"

type RatingDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  invoiceId: string
  sellerId: string
  buyerId: string
  onRatingSubmitted: () => void
}

export const RatingDialog = ({
  open,
  onOpenChange,
  invoiceId,
  sellerId,
  buyerId,
  onRatingSubmitted
}: RatingDialogProps) => {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async () => {
    if (rating === 0) {
      toast({
        title: "Greška",
        description: "Molimo vas da dodelite ocenu",
        variant: "destructive",
      })
      return
    }

    try {
      setLoading(true)
      
      // Submit buyer's rating for seller
      const { error: sellerRatingError } = await supabase
        .from('ratings')
        .insert({
          rater_id: buyerId,
          rated_id: sellerId,
          invoice_id: invoiceId,
          rating,
          comment
        })

      if (sellerRatingError) throw sellerRatingError

      toast({
        title: "Uspešno",
        description: "Ocena je uspešno dodata",
      })
      
      onRatingSubmitted()
      onOpenChange(false)
    } catch (error) {
      console.error('Error submitting rating:', error)
      toast({
        title: "Greška",
        description: "Došlo je do greške prilikom dodavanja ocene",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Ocenite prodavca</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                onClick={() => setRating(value)}
                className="focus:outline-none"
              >
                <Star
                  className={`w-8 h-8 ${
                    value <= rating
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
          <Textarea
            placeholder="Dodajte komentar (opciono)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button 
            onClick={handleSubmit} 
            className="w-full"
            disabled={loading}
          >
            {loading ? "Slanje..." : "Pošalji ocenu"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
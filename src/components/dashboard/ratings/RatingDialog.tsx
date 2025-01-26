import { useState } from "react"
import { Star } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"

type RatingParameter = {
  id: string
  label: string
  value: number
}

type RatingDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  invoiceId: string
  sellerId: string
  buyerId: string
}

export const RatingDialog = ({
  open,
  onOpenChange,
  invoiceId,
  sellerId,
  buyerId
}: RatingDialogProps) => {
  const [parameters, setParameters] = useState<RatingParameter[]>([
    { id: 'quality', label: 'Kvalitet usluge', value: 0 },
    { id: 'communication', label: 'Komunikacija', value: 0 },
    { id: 'professionalism', label: 'Profesionalnost', value: 0 },
    { id: 'timeliness', label: 'Poštovanje rokova', value: 0 },
    { id: 'expertise', label: 'Stručnost', value: 0 },
    { id: 'value', label: 'Vrednost za novac', value: 0 }
  ])
  const [comment, setComment] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleRatingChange = (parameterId: string, value: number) => {
    setParameters(prev => 
      prev.map(param => 
        param.id === parameterId ? { ...param, value } : param
      )
    )
  }

  const calculateAverageRating = () => {
    const sum = parameters.reduce((acc, param) => acc + param.value, 0)
    return Number((sum / parameters.length).toFixed(2))
  }

  const handleSubmit = async () => {
    if (parameters.some(param => param.value === 0)) {
      toast({
        title: "Greška",
        description: "Molimo vas da ocenite sve parametre",
        variant: "destructive",
      })
      return
    }

    try {
      setLoading(true)
      
      const averageRating = calculateAverageRating()
      
      // First verify that the invoice exists and is verified
      const { data: invoice, error: invoiceError } = await supabase
        .from('invoices')
        .select('status')
        .eq('id', invoiceId)
        .eq('buyer_id', buyerId)
        .single()

      if (invoiceError) {
        throw new Error('Nije moguće pronaći fakturu')
      }

      if (invoice.status !== 'verified') {
        throw new Error('Faktura mora biti verifikovana pre ocenjivanja')
      }

      const { error: ratingError } = await supabase
        .from('ratings')
        .insert({
          rater_id: buyerId,
          rated_id: sellerId,
          invoice_id: invoiceId,
          rating: averageRating,
          comment: comment,
          parameters: parameters
        })

      if (ratingError) throw ratingError

      toast({
        title: "Uspešno",
        description: "Uspešno ste ocenili prodavca. Hvala vam na oceni!",
      })
      
      onOpenChange(false)
    } catch (error) {
      console.error('Error submitting rating:', error)
      toast({
        title: "Greška",
        description: error instanceof Error ? error.message : "Došlo je do greške prilikom dodavanja ocene",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const renderStars = (parameterId: string, currentValue: number) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((value) => (
        <button
          key={value}
          onClick={() => handleRatingChange(parameterId, value)}
          className="focus:outline-none"
        >
          <Star
            className={`w-6 h-6 ${
              value <= currentValue
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }`}
          />
        </button>
      ))}
    </div>
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Ocenite prodavca</DialogTitle>
          <DialogDescription>
            Vaše mišljenje nam je važno. Molimo vas da ocenite sledeće parametre.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          {parameters.map((param) => (
            <div key={param.id} className="space-y-2">
              <label className="text-sm font-medium">{param.label}</label>
              {renderStars(param.id, param.value)}
            </div>
          ))}
          <div className="space-y-2">
            <label className="text-sm font-medium">Komentar (opciono)</label>
            <Textarea
              placeholder="Dodajte komentar..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
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
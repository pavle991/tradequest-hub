import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

type NewInquiryFormProps = {
  onSubmit: (title: string, description: string, type: "buying" | "selling") => void
  type: "buying" | "selling"
}

export const NewInquiryForm = ({ onSubmit, type }: NewInquiryFormProps) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !description) {
      toast({
        title: "Greška",
        description: "Molimo popunite sva polja",
        variant: "destructive",
      })
      return
    }
    
    onSubmit(title, description, type)
    setTitle("")
    setDescription("")
  }

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        {type === "buying" ? "Novi Upit za Nabavku" : "Novi Prodajni Oglas"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Naslov</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={type === "buying" ? "Unesite naslov upita" : "Unesite naslov oglasa"}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Opis</label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={type === "buying" ? "Detaljno opišite šta vam je potrebno" : "Detaljno opišite šta prodajete"}
            rows={4}
          />
        </div>
        <Button type="submit" className="w-full">
          {type === "buying" ? "Pošalji Upit za Nabavku" : "Objavi Prodajni Oglas"}
        </Button>
      </form>
    </Card>
  )
}
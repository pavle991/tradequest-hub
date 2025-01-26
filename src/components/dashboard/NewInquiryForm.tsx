import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"

type NewInquiryFormProps = {
  onSubmit: (title: string, description: string, type: "buying" | "selling", tags: string[]) => void
  type: "buying" | "selling"
}

export const NewInquiryForm = ({ onSubmit, type }: NewInquiryFormProps) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const { toast } = useToast()

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag])
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !description) {
      toast({
        title: "Greška",
        description: "Molimo popunite sva polja",
        variant: "destructive",
      })
      return
    }

    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        toast({
          title: "Greška",
          description: "Niste prijavljeni",
          variant: "destructive",
        })
        return
      }

      const { data, error } = await supabase
        .from('inquiries')
        .insert({
          title,
          description,
          type,
          tags,
          user_id: user.id,
          status: 'active' // Changed from 'aktivan' to 'active' to match database constraint
        })
        .select()
        .single()

      if (error) {
        console.error('Error creating inquiry:', error)
        toast({
          title: "Greška",
          description: "Došlo je do greške prilikom kreiranja upita",
          variant: "destructive",
        })
        return
      }

      onSubmit(title, description, type, tags)
      setTitle("")
      setDescription("")
      setTags([])
      
      toast({
        title: "Uspešno",
        description: type === "buying" ? "Vaš upit za nabavku je uspešno poslat" : "Vaš prodajni oglas je uspešno objavljen",
      })
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: "Greška",
        description: "Došlo je do greške prilikom kreiranja upita",
        variant: "destructive",
      })
    }
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
        <div>
          <label className="block text-sm font-medium mb-1">Tagovi</label>
          <div className="flex gap-2 mb-2">
            <Input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Dodaj novi tag"
              onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
            />
            <Button type="button" onClick={handleAddTag}>Dodaj</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                {tag}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => handleRemoveTag(tag)}
                />
              </Badge>
            ))}
          </div>
        </div>
        <Button type="submit" className="w-full">
          {type === "buying" ? "Pošalji Upit za Nabavku" : "Objavi Prodajni Oglas"}
        </Button>
      </form>
    </Card>
  )
}
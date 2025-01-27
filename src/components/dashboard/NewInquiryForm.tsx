import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { FormFields } from "./inquiry-form/FormFields"
import { TagInput } from "./inquiry-form/TagInput"

type NewInquiryFormProps = {
  onSubmit: (title: string, description: string, type: "buying" | "selling", tags: string[]) => void
  type: "buying" | "selling"
}

export const NewInquiryForm = ({ onSubmit, type }: NewInquiryFormProps) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const { toast } = useToast()

  const handleAddTag = (newTag: string) => {
    setTags([...tags, newTag])
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
          status: 'active'  // Changed from 'aktivan' to 'active'
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
        <FormFields
          title={title}
          description={description}
          onTitleChange={setTitle}
          onDescriptionChange={setDescription}
          type={type}
        />
        <TagInput
          tags={tags}
          onAddTag={handleAddTag}
          onRemoveTag={handleRemoveTag}
        />
        <Button type="submit" className="w-full">
          {type === "buying" ? "Pošalji Upit za Nabavku" : "Objavi Prodajni Oglas"}
        </Button>
      </form>
    </Card>
  )
}
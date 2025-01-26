import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { X } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"

type CompanyData = {
  company_name: string
  address: string | null
  phone: string | null
  description: string | null
  tags: string[]
}

export const CompanyProfile = () => {
  const [loading, setLoading] = useState(true)
  const [companyData, setCompanyData] = useState<CompanyData>({
    company_name: "",
    address: "",
    phone: "",
    description: "",
    tags: []
  })
  const [newTag, setNewTag] = useState("")

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        toast.error("Niste prijavljeni")
        return
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error) {
        console.error('Error fetching profile:', error)
        toast.error("Došlo je do greške prilikom učitavanja profila")
        return
      }

      if (data) {
        setCompanyData({
          company_name: data.company_name || "",
          address: data.address || "",
          phone: data.phone || "",
          description: data.description || "",
          tags: data.tags || []
        })
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error("Došlo je do greške prilikom učitavanja profila")
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        toast.error("Niste prijavljeni")
        return
      }

      const { error } = await supabase
        .from('profiles')
        .update({
          company_name: companyData.company_name,
          address: companyData.address,
          phone: companyData.phone,
          description: companyData.description,
          tags: companyData.tags
        })
        .eq('id', user.id)

      if (error) {
        console.error('Error updating profile:', error)
        toast.error("Došlo je do greške prilikom čuvanja profila")
        return
      }

      toast.success("Podaci firme su ažurirani")
    } catch (error) {
      console.error('Error:', error)
      toast.error("Došlo je do greške prilikom čuvanja profila")
    }
  }

  const addTag = () => {
    if (newTag && !companyData.tags.includes(newTag)) {
      setCompanyData({
        ...companyData,
        tags: [...companyData.tags, newTag]
      })
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setCompanyData({
      ...companyData,
      tags: companyData.tags.filter(tag => tag !== tagToRemove)
    })
  }

  if (loading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-8 bg-gray-200 rounded"></div>
          <div className="h-8 bg-gray-200 rounded"></div>
          <div className="h-8 bg-gray-200 rounded"></div>
          <div className="h-24 bg-gray-200 rounded"></div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Profil Firme</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Naziv firme</label>
          <Input
            value={companyData.company_name}
            onChange={(e) => setCompanyData({ ...companyData, company_name: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Adresa</label>
          <Input
            value={companyData.address || ""}
            onChange={(e) => setCompanyData({ ...companyData, address: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Telefon</label>
          <Input
            value={companyData.phone || ""}
            onChange={(e) => setCompanyData({ ...companyData, phone: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Opis delatnosti</label>
          <Textarea
            value={companyData.description || ""}
            onChange={(e) => setCompanyData({ ...companyData, description: e.target.value })}
            rows={4}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tagovi proizvoda</label>
          <div className="flex gap-2 mb-2">
            <Input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Dodaj novi tag"
              onKeyPress={(e) => e.key === "Enter" && addTag()}
            />
            <Button onClick={addTag}>Dodaj</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {companyData.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                {tag}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => removeTag(tag)}
                />
              </Badge>
            ))}
          </div>
        </div>
        <Button onClick={handleSave} className="w-full">Sačuvaj promene</Button>
      </div>
    </Card>
  )
}
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { X } from "lucide-react"

type CompanyData = {
  name: string
  address: string
  phone: string
  email: string
  description: string
  tags: string[]
}

export const CompanyProfile = () => {
  const { toast } = useToast()
  const [companyData, setCompanyData] = useState<CompanyData>({
    name: "Moja Firma DOO",
    address: "Glavna ulica 123",
    phone: "+381111234567",
    email: "kontakt@mojafirma.rs",
    description: "Prodaja kancelarijskog materijala",
    tags: ["Kancelarijski materijal", "Papir", "Toneri"]
  })
  const [newTag, setNewTag] = useState("")

  const handleSave = () => {
    toast({
      title: "Uspešno",
      description: "Podaci firme su ažurirani",
    })
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

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Profil Firme</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Naziv firme</label>
          <Input
            value={companyData.name}
            onChange={(e) => setCompanyData({ ...companyData, name: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Adresa</label>
          <Input
            value={companyData.address}
            onChange={(e) => setCompanyData({ ...companyData, address: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Telefon</label>
          <Input
            value={companyData.phone}
            onChange={(e) => setCompanyData({ ...companyData, phone: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <Input
            type="email"
            value={companyData.email}
            onChange={(e) => setCompanyData({ ...companyData, email: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Opis delatnosti</label>
          <Textarea
            value={companyData.description}
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
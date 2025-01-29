import { type CompanyData } from "../types"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type ProfileFormProps = {
  companyData: CompanyData
  onChange: (data: CompanyData) => void
}

export const ProfileForm = ({ companyData, onChange }: ProfileFormProps) => {
  const handleChange = (field: keyof CompanyData, value: string) => {
    onChange({ ...companyData, [field]: value })
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Naziv firme</label>
        <Input
          value={companyData.company_name}
          onChange={(e) => handleChange("company_name", e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Adresa</label>
        <Input
          value={companyData.address || ""}
          onChange={(e) => handleChange("address", e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Telefon</label>
        <Input
          value={companyData.phone || ""}
          onChange={(e) => handleChange("phone", e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Opis delatnosti</label>
        <Textarea
          value={companyData.description || ""}
          onChange={(e) => handleChange("description", e.target.value)}
          rows={4}
        />
      </div>
    </div>
  )
}
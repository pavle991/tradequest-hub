import { type CompanyData } from "../types"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type ProfileFormProps = {
  companyData: CompanyData
  onChange: (data: CompanyData) => void
}

export const ProfileForm = ({ companyData, onChange }: ProfileFormProps) => {
  const handleChange = (field: keyof CompanyData, value: string) => {
    onChange({ ...companyData, [field]: value })
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Naziv firme</label>
          <Input
            value={companyData.company_name}
            onChange={(e) => handleChange("company_name", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Matični broj</label>
          <Input
            value={companyData.company_number}
            onChange={(e) => handleChange("company_number", e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">PIB</label>
          <Input
            value={companyData.pib}
            onChange={(e) => handleChange("pib", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Godina osnivanja</label>
          <Input
            type="number"
            value={companyData.founding_year}
            onChange={(e) => handleChange("founding_year", e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Website</label>
        <Input
          value={companyData.website}
          onChange={(e) => handleChange("website", e.target.value)}
          placeholder="https://"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Opis delatnosti</label>
        <Textarea
          value={companyData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          rows={4}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Kontakt osoba</label>
          <Input
            value={companyData.contact_name}
            onChange={(e) => handleChange("contact_name", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Pozicija</label>
          <Input
            value={companyData.contact_position}
            onChange={(e) => handleChange("contact_position", e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Telefon</label>
          <Input
            value={companyData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Radno vreme</label>
          <Input
            value={companyData.working_hours}
            onChange={(e) => handleChange("working_hours", e.target.value)}
            placeholder="npr. Pon-Pet 09-17h"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Adresa</label>
          <Input
            value={companyData.address}
            onChange={(e) => handleChange("address", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Grad</label>
          <Input
            value={companyData.city}
            onChange={(e) => handleChange("city", e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Poštanski broj</label>
          <Input
            value={companyData.postal_code}
            onChange={(e) => handleChange("postal_code", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Region</label>
          <Input
            value={companyData.region}
            onChange={(e) => handleChange("region", e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">LinkedIn</label>
          <Input
            value={companyData.linkedin}
            onChange={(e) => handleChange("linkedin", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Facebook</label>
          <Input
            value={companyData.facebook}
            onChange={(e) => handleChange("facebook", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Instagram</label>
          <Input
            value={companyData.instagram}
            onChange={(e) => handleChange("instagram", e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Preferirani način komunikacije</label>
          <Select 
            value={companyData.preferred_communication} 
            onValueChange={(value) => handleChange("preferred_communication", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="phone">Telefon</SelectItem>
              <SelectItem value="chat">Chat</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Jezik komunikacije</label>
          <Select 
            value={companyData.communication_language} 
            onValueChange={(value) => handleChange("communication_language", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sr">Srpski</SelectItem>
              <SelectItem value="en">Engleski</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Preferirana valuta</label>
          <Select 
            value={companyData.currency} 
            onValueChange={(value) => handleChange("currency", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="RSD">RSD</SelectItem>
              <SelectItem value="EUR">EUR</SelectItem>
              <SelectItem value="USD">USD</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
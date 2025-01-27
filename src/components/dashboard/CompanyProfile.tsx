import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"
import { ProfileForm } from "./company-profile/ProfileForm"
import { TagManager } from "./company-profile/TagManager"
import { LoadingState } from "./company-profile/LoadingState"
import { type CompanyData } from "./types"
import { Upload } from "lucide-react"

export const CompanyProfile = () => {
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [companyData, setCompanyData] = useState<CompanyData>({
    company_name: "",
    company_number: "",
    pib: "",
    founding_year: "",
    website: "",
    description: "",
    contact_name: "",
    contact_position: "",
    phone: "",
    working_hours: "",
    address: "",
    city: "",
    postal_code: "",
    region: "",
    linkedin: "",
    facebook: "",
    instagram: "",
    preferred_communication: "email",
    communication_language: "sr",
    currency: "RSD",
    tags: [],
    logo_url: null
  })

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
          company_number: data.company_number || "",
          pib: data.pib || "",
          founding_year: data.founding_year?.toString() || "",
          website: data.website || "",
          description: data.description || "",
          contact_name: data.contact_name || "",
          contact_position: data.contact_position || "",
          phone: data.phone || "",
          working_hours: data.working_hours || "",
          address: data.address || "",
          city: data.city || "",
          postal_code: data.postal_code || "",
          region: data.region || "",
          linkedin: data.linkedin || "",
          facebook: data.facebook || "",
          instagram: data.instagram || "",
          preferred_communication: data.preferred_communication || "email",
          communication_language: data.communication_language || "sr",
          currency: data.currency || "RSD",
          tags: data.tags || [],
          logo_url: data.logo_url
        })
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error("Došlo je do greške prilikom učitavanja profila")
    } finally {
      setLoading(false)
    }
  }

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        toast.error("Niste prijavljeni")
        return
      }

      const file = event.target.files?.[0]
      if (!file) return

      const fileExt = file.name.split('.').pop()
      const filePath = `${user.id}-${Math.random()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('company_logos')
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      const { data: { publicUrl } } = supabase.storage
        .from('company_logos')
        .getPublicUrl(filePath)

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ logo_url: publicUrl })
        .eq('id', user.id)

      if (updateError) {
        throw updateError
      }

      setCompanyData(prev => ({ ...prev, logo_url: publicUrl }))
      toast.success("Logo je uspešno otpremljen")
    } catch (error) {
      console.error('Error uploading logo:', error)
      toast.error("Došlo je do greške prilikom otpremanja logo-a")
    } finally {
      setUploading(false)
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
          company_number: companyData.company_number,
          pib: companyData.pib,
          founding_year: companyData.founding_year ? parseInt(companyData.founding_year) : null,
          website: companyData.website,
          description: companyData.description,
          contact_name: companyData.contact_name,
          contact_position: companyData.contact_position,
          phone: companyData.phone,
          working_hours: companyData.working_hours,
          address: companyData.address,
          city: companyData.city,
          postal_code: companyData.postal_code,
          region: companyData.region,
          linkedin: companyData.linkedin,
          facebook: companyData.facebook,
          instagram: companyData.instagram,
          preferred_communication: companyData.preferred_communication,
          communication_language: companyData.communication_language,
          currency: companyData.currency,
          tags: companyData.tags
        })
        .eq('id', user.id)

      if (error) {
        throw error
      }

      toast.success("Podaci firme su ažurirani")
    } catch (error) {
      console.error('Error:', error)
      toast.error("Došlo je do greške prilikom čuvanja profila")
    }
  }

  if (loading) {
    return <LoadingState />
  }

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Profil Firme</h2>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          {companyData.logo_url && (
            <img 
              src={companyData.logo_url} 
              alt="Company Logo" 
              className="w-24 h-24 object-cover rounded-lg"
            />
          )}
          <div>
            <Button 
              variant="outline" 
              className="relative"
              disabled={uploading}
            >
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept="image/*"
                onChange={handleLogoUpload}
                disabled={uploading}
              />
              <Upload className="w-4 h-4 mr-2" />
              {uploading ? "Otpremanje..." : "Otpremi logo"}
            </Button>
          </div>
        </div>
        <ProfileForm 
          companyData={companyData}
          onChange={setCompanyData}
        />
        <TagManager
          tags={companyData.tags}
          onChange={(tags) => setCompanyData({ ...companyData, tags })}
        />
        <Button onClick={handleSave} className="w-full">Sačuvaj promene</Button>
      </div>
    </Card>
  )
}
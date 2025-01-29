import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"
import { ProfileForm } from "./company-profile/ProfileForm"
import { TagManager } from "./company-profile/TagManager"
import { LoadingState } from "./company-profile/LoadingState"
import { type CompanyData } from "./types"

export const CompanyProfile = () => {
  const [loading, setLoading] = useState(true)
  const [companyData, setCompanyData] = useState<CompanyData>({
    company_name: "",
    address: "",
    phone: "",
    description: "",
    tags: []
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

  if (loading) {
    return <LoadingState />
  }

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Profil Firme</h2>
      <div className="space-y-6">
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
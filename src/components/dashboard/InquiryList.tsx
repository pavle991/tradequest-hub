import { useState, useEffect } from "react"
import { InquiryCard } from "./InquiryCard"
import { type Inquiry } from "./types"
import { supabase } from "@/integrations/supabase/client"
import { EmptyInquiryState } from "./EmptyInquiryState"
import { Card } from "@/components/ui/card"

type InquiryListProps = {
  type: "buying" | "selling"
}

export const InquiryList = ({ type }: InquiryListProps) => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [selectedInquiryId, setSelectedInquiryId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [userTags, setUserTags] = useState<string[]>([])

  useEffect(() => {
    const init = async () => {
      if (type === "selling") {
        await fetchUserProfile()
      }
      await fetchInquiries()
    }
    init()
  }, [type])

  const fetchUserProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: profile } = await supabase
        .from('profiles')
        .select('tags')
        .eq('id', user.id)
        .single()

      console.log('User profile tags:', profile?.tags)
      if (profile?.tags) {
        setUserTags(profile.tags)
      }
    } catch (error) {
      console.error('Error fetching user profile:', error)
    }
  }

  const fetchInquiries = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      let query = supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false })

      if (type === "buying") {
        query = query.eq('user_id', user.id)
      } else {
        // Za prodajni tab, isključujemo upite koje je kreirao trenutni korisnik
        query = query.neq('user_id', user.id)
      }

      const { data: inquiriesData, error } = await query

      if (error) throw error

      console.log('All inquiries:', inquiriesData)
      console.log('User tags for filtering:', userTags)

      if (type === "selling" && inquiriesData) {
        // Filtriramo upite da prikažemo samo one koji imaju bar jedan zajednički tag sa korisnikovim tagovima
        const filteredInquiries = inquiriesData.filter(inquiry => {
          if (!inquiry.tags || !userTags || userTags.length === 0) return false
          
          // Konvertujemo sve tagove u mala slova za poređenje
          const inquiryTagsLower = inquiry.tags.map(tag => tag.toLowerCase().trim())
          const userTagsLower = userTags.map(tag => tag.toLowerCase().trim())
          
          // Proveravamo da li postoji bar jedan zajednički tag
          const hasMatchingTag = inquiryTagsLower.some(tag => userTagsLower.includes(tag))
          
          console.log('Inquiry:', inquiry.title, 
            'inquiry tags:', inquiryTagsLower, 
            'user tags:', userTagsLower, 
            'has matching tag:', hasMatchingTag)
          
          return hasMatchingTag
        })
        
        setInquiries(filteredInquiries)
      } else {
        setInquiries(inquiriesData || [])
      }
    } catch (error) {
      console.error('Error fetching inquiries:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleToggleOffers = (inquiryId: string) => {
    setSelectedInquiryId(selectedInquiryId === inquiryId ? null : inquiryId)
  }

  if (loading) {
    return <div>Učitavanje...</div>
  }

  if (inquiries.length === 0) {
    return <EmptyInquiryState type={type} />
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Upiti</h2>
        {inquiries.length === 0 ? (
          <Card className="p-4">
            <p className="text-center text-gray-500">Trenutno nemate upita</p>
          </Card>
        ) : (
          inquiries.map((inquiry) => (
            <InquiryCard
              key={inquiry.id}
              inquiry={inquiry}
              type={type}
              selectedInquiryId={selectedInquiryId}
              onToggleOffers={handleToggleOffers}
              onOpenOfferForm={() => {}}
            />
          ))
        )}
      </div>
    </div>
  )
}
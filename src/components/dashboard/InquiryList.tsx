import { useState, useEffect } from "react"
import { InquiryCard } from "./InquiryCard"
import { type Inquiry } from "./types"
import { supabase } from "@/integrations/supabase/client"
import { EmptyInquiryState } from "./EmptyInquiryState"

type InquiryListProps = {
  type: "buying" | "selling"
}

const parseTags = (tags: unknown): string[] => {
  try {
    if (!tags) return []
    if (Array.isArray(tags)) return tags.map(tag => tag.toLowerCase().trim())
    if (typeof tags === 'string') {
      try {
        const parsed = JSON.parse(tags)
        if (Array.isArray(parsed)) {
          return parsed.map(tag => tag.toLowerCase().trim())
        }
      } catch (e) {
        // If JSON parsing fails, split the string
        return tags.split(',').map(tag => tag.toLowerCase().trim())
      }
    }
    return []
  } catch (error) {
    console.error("Error parsing tags:", tags, error)
    return []
  }
}

export const InquiryList = ({ type }: InquiryListProps) => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [selectedInquiryId, setSelectedInquiryId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [profileTags, setProfileTags] = useState<string[]>([])

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

      console.log('Raw profile tags:', profile?.tags)
      
      if (profile?.tags) {
        const parsedProfileTags = parseTags(profile.tags)
        console.log('Parsed profile tags:', parsedProfileTags)
        setProfileTags(parsedProfileTags)
      } else {
        console.log('No tags found in profile')
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
        .eq('status', 'active')
        .order('created_at', { ascending: false })

      if (type === "buying") {
        query = query
          .eq('user_id', user.id)
          .eq('type', 'buying')
      } else {
        query = query
          .neq('user_id', user.id)
          .eq('type', 'buying')
      }

      const { data: inquiriesData, error } = await query

      if (error) throw error

      if (type === "selling" && inquiriesData) {
        const filteredInquiries = inquiriesData.filter((inquiry) => {
          const inquiryTags = parseTags(inquiry.tags)
          
          console.log('Inquiry:', inquiry.title)
          console.log('Raw inquiry tags:', inquiry.tags)
          console.log('Parsed inquiry tags:', inquiryTags)
          console.log('Profile tags:', profileTags)
          
          if (inquiryTags.length === 0 || profileTags.length === 0) {
            console.log('No tags to compare, hiding inquiry')
            return false
          }

          const hasMatch = inquiryTags.some(tag => profileTags.includes(tag))
          console.log('Has matching tag:', hasMatch)
          return hasMatch
        })

        setInquiries(filteredInquiries.map(inquiry => ({
          ...inquiry,
          type: inquiry.type as "buying" | "selling"
        })))
      } else if (inquiriesData) {
        setInquiries(inquiriesData.map(inquiry => ({
          ...inquiry,
          type: inquiry.type as "buying" | "selling"
        })))
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
        <h2 className="text-xl font-semibold">
          {type === "buying" ? "Vaši upiti" : "Upiti koji odgovaraju vašim tagovima"}
        </h2>
        {inquiries.map((inquiry) => (
          <InquiryCard
            key={inquiry.id}
            inquiry={inquiry}
            type={type}
            selectedInquiryId={selectedInquiryId}
            onToggleOffers={handleToggleOffers}
            onOpenOfferForm={() => {}}
          />
        ))}
      </div>
    </div>
  )
}
import { useState, useEffect } from "react"
import { InquiryCard } from "./InquiryCard"
import { type Inquiry } from "./types"
import { supabase } from "@/integrations/supabase/client"
import { EmptyInquiryState } from "./EmptyInquiryState"

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
        // For selling tab, exclude inquiries created by current user
        query = query.neq('user_id', user.id)
      }

      const { data: inquiriesData, error } = await query

      if (error) throw error

      console.log('All inquiries:', inquiriesData)
      console.log('User tags for filtering:', userTags)

      if (type === "selling" && inquiriesData) {
        // Filter inquiries to show only those with matching tags
        const filteredInquiries = inquiriesData.filter(inquiry => {
          const inquiryTags = inquiry.tags || []
          const profileTags = userTags || []
          
          if (inquiryTags.length === 0 || profileTags.length === 0) {
            console.log('No tags to compare for inquiry:', inquiry.title)
            return false
          }
          
          // Convert tags to lowercase for case-insensitive comparison
          const inquiryTagsLower = inquiryTags.map(tag => tag.toLowerCase().trim())
          const profileTagsLower = profileTags.map(tag => tag.toLowerCase().trim())
          
          // Check for any matching tags
          const hasMatchingTag = inquiryTagsLower.some(tag => profileTagsLower.includes(tag))
          
          console.log('Inquiry:', inquiry.title, 
            '\nInquiry tags:', inquiryTagsLower, 
            '\nProfile tags:', profileTagsLower, 
            '\nHas matching tag:', hasMatchingTag)
          
          return hasMatchingTag
        })
        
        setInquiries(filteredInquiries as Inquiry[])
      } else {
        setInquiries(inquiriesData as Inquiry[] || [])
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
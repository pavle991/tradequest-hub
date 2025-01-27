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

      console.log('Profile tags from database:', profile?.tags)
      if (profile?.tags && Array.isArray(profile.tags)) {
        setProfileTags(profile.tags)
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
        // Za buying tab, prikaži samo upite trenutnog korisnika
        query = query.eq('user_id', user.id)
      } else {
        // Za selling tab, prikaži sve upite OSIM onih od trenutnog korisnika
        query = query.neq('user_id', user.id)
      }

      const { data: inquiriesData, error } = await query

      if (error) throw error

      console.log('Fetched inquiries:', inquiriesData)
      console.log('Current profile tags:', profileTags)

      if (type === "selling" && inquiriesData) {
        // Filter inquiries based on matching tags
        const filteredInquiries = inquiriesData.filter(inquiry => {
          const inquiryTags = Array.isArray(inquiry.tags) ? inquiry.tags : []
          
          console.log(`Comparing tags for inquiry "${inquiry.title}":`)
          console.log('Inquiry tags:', inquiryTags)
          console.log('Profile tags:', profileTags)
          
          // Only filter if both arrays have tags
          if (inquiryTags.length === 0 || profileTags.length === 0) {
            console.log('No tags available for comparison')
            return false
          }

          // Convert all tags to lowercase for comparison
          const normalizedInquiryTags = inquiryTags.map(tag => 
            typeof tag === 'string' ? tag.toLowerCase().trim() : ''
          ).filter(tag => tag !== '')

          const normalizedProfileTags = profileTags.map(tag => 
            typeof tag === 'string' ? tag.toLowerCase().trim() : ''
          ).filter(tag => tag !== '')

          // Check if any tags match
          const hasMatchingTag = normalizedInquiryTags.some(tag => 
            normalizedProfileTags.includes(tag)
          )

          console.log('Has matching tag:', hasMatchingTag)
          return hasMatchingTag
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
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
  const [activeInquiries, setActiveInquiries] = useState<Inquiry[]>([])
  const [completedInquiries, setCompletedInquiries] = useState<Inquiry[]>([])
  const [selectedInquiryId, setSelectedInquiryId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [userTags, setUserTags] = useState<string[]>([])
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setCurrentUserId(user.id)
        if (type === "selling") {
          await fetchUserProfile(user.id)
        }
      }
      await fetchInquiries()
    }
    init()
  }, [type])

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('tags')
        .eq('id', userId)
        .single()

      console.log('User profile tags:', profile?.tags)
      if (profile?.tags) {
        setUserTags(profile.tags)
      }
      if (error) throw error
    } catch (error) {
      console.error('Error fetching user profile:', error)
    }
  }

  const fetchInquiries = async () => {
    try {
      let activeQuery = supabase
        .from('inquiries')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false })

      let completedQuery = supabase
        .from('inquiries')
        .select('*')
        .eq('status', 'completed')
        .order('created_at', { ascending: false })

      if (type === "buying") {
        // For buying tab, show only user's own inquiries
        activeQuery = activeQuery.eq('user_id', currentUserId)
        completedQuery = completedQuery.eq('user_id', currentUserId)
      } else {
        // For selling tab, show inquiries from other users that match tags
        activeQuery = activeQuery.neq('user_id', currentUserId)
        completedQuery = completedQuery.neq('user_id', currentUserId)
      }

      const [activeResult, completedResult] = await Promise.all([
        activeQuery,
        completedQuery
      ])

      if (activeResult.error) throw activeResult.error
      if (completedResult.error) throw completedResult.error

      console.log('All active inquiries:', activeResult.data)
      console.log('User tags for filtering:', userTags)

      if (type === "selling") {
        // Filter inquiries to only show those that have at least one matching tag with user's tags
        const filteredActive = (activeResult.data || []).filter(inquiry => {
          if (!inquiry.tags || !userTags || userTags.length === 0) return false
          
          // Convert all tags to lowercase for comparison
          const inquiryTagsLower = inquiry.tags.map(tag => tag.toLowerCase().trim())
          const userTagsLower = userTags.map(tag => tag.toLowerCase().trim())
          
          // Check if there's any matching tag
          const hasMatchingTag = inquiryTagsLower.some(tag => userTagsLower.includes(tag))
          
          console.log('Inquiry:', inquiry.title, 
            'inquiry tags:', inquiryTagsLower, 
            'user tags:', userTagsLower, 
            'has matching tag:', hasMatchingTag)
          
          return hasMatchingTag
        })
        
        setActiveInquiries(filteredActive as Inquiry[])

        const filteredCompleted = (completedResult.data || []).filter(inquiry => {
          if (!inquiry.tags || !userTags || userTags.length === 0) return false
          
          const inquiryTagsLower = inquiry.tags.map(tag => tag.toLowerCase().trim())
          const userTagsLower = userTags.map(tag => tag.toLowerCase().trim())
          
          return inquiryTagsLower.some(tag => userTagsLower.includes(tag))
        })
        
        setCompletedInquiries(filteredCompleted as Inquiry[])
      } else {
        setActiveInquiries(activeResult.data as Inquiry[] || [])
        setCompletedInquiries(completedResult.data as Inquiry[] || [])
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

  if (activeInquiries.length === 0 && completedInquiries.length === 0) {
    return <EmptyInquiryState type={type} />
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Aktivni upiti</h2>
        {activeInquiries.length === 0 ? (
          <Card className="p-4">
            <p className="text-center text-gray-500">Trenutno nemate aktivnih upita</p>
          </Card>
        ) : (
          activeInquiries.map((inquiry) => (
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

      {type === "buying" && completedInquiries.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Završeni upiti</h2>
          {completedInquiries.map((inquiry) => (
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
      )}
    </div>
  )
}
import { useState, useEffect } from "react"
import { InquiryCard } from "./InquiryCard"
import { type Inquiry } from "./types"
import { supabase } from "@/integrations/supabase/client"
import { EmptyInquiryState } from "./EmptyInquiryState"

type InquiryListProps = {
  inquiries: Inquiry[]
  type: "buying" | "selling"
}

export const InquiryList = ({ type }: InquiryListProps) => {
  const [filteredInquiries, setFilteredInquiries] = useState<Inquiry[]>([])
  const [selectedInquiryId, setSelectedInquiryId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [userTags, setUserTags] = useState<string[]>([])

  useEffect(() => {
    fetchInquiries()
    fetchUserProfile()
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
        .eq('status', 'aktivan')
        .order('created_at', { ascending: false })

      if (type === "buying") {
        query = query.eq('user_id', user.id)
      } else {
        // For selling tab, only show active inquiries that match user's tags
        query = query.neq('user_id', user.id)
      }

      const { data: inquiries, error } = await query

      if (error) throw error

      if (inquiries) {
        if (type === "selling" && userTags.length > 0) {
          // Filter inquiries that have at least one matching tag with user's tags
          const filtered = inquiries.filter(inquiry => 
            inquiry.tags?.some(tag => userTags.includes(tag))
          )
          setFilteredInquiries(filtered)
        } else {
          setFilteredInquiries(inquiries)
        }
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

  if (filteredInquiries.length === 0) {
    return <EmptyInquiryState type={type} />
  }

  return (
    <div className="space-y-4">
      {filteredInquiries.map((inquiry) => (
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
  )
}
import { useState, useEffect } from "react"
import { InquiryCard } from "./InquiryCard"
import { type Inquiry } from "./types"
import { supabase } from "@/integrations/supabase/client"
import { EmptyInquiryState } from "./EmptyInquiryState"

type InquiryListProps = {
  type: "buying" | "selling"
}

type InquiryWithProfile = Inquiry & {
  profiles?: {
    company_name: string
  } | null
  seller_metrics?: {
    seller_rating: number | null
    total_sales: number | null
  } | null
}

const parseTags = (tags: any): string[] => {
  try {
    if (!tags) return []
    if (Array.isArray(tags)) return tags.map(tag => tag.toLowerCase().trim())
    return JSON.parse(tags).map((tag: string) => tag.toLowerCase().trim())
  } catch (error) {
    console.error("Error parsing tags:", tags, error)
    return []
  }
}

export const InquiryList = ({ type }: InquiryListProps) => {
  const [inquiries, setInquiries] = useState<InquiryWithProfile[]>([])
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

      if (profile?.tags) {
        const parsedProfileTags = parseTags(profile.tags)
        console.log('Parsed profile tags:', parsedProfileTags)
        setProfileTags(parsedProfileTags)
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
        .select(`
          *,
          profiles!inquiries_user_id_fkey (
            company_name
          ),
          seller_metrics:offers (
            seller_rating,
            total_sales
          )
        `)
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
        const filteredInquiries = inquiriesData.filter(inquiry => {
          const inquiryTags = parseTags(inquiry.tags)
          
          console.log('Inquiry:', inquiry.title)
          console.log('Parsed inquiry tags:', inquiryTags)
          console.log('Profile tags:', profileTags)
          
          if (inquiryTags.length === 0 || profileTags.length === 0) {
            console.log('No tags to compare, showing inquiry')
            return true
          }

          const hasMatch = inquiryTags.some(tag => profileTags.includes(tag))
          console.log('Has matching tag:', hasMatch)
          return hasMatch
        })

        setInquiries(filteredInquiries as InquiryWithProfile[])
      } else if (inquiriesData) {
        setInquiries(inquiriesData as InquiryWithProfile[])
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
            inquiry={{
              ...inquiry,
              company_name: inquiry.profiles?.company_name,
              seller_rating: inquiry.seller_metrics?.seller_rating,
              total_sales: inquiry.seller_metrics?.total_sales
            }}
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

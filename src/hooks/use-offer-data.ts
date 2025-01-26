import { useState, useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"

export const useOfferData = (offerId: string | null | undefined) => {
  const [offer, setOffer] = useState<any>(null)

  useEffect(() => {
    if (!offerId) return
    
    const fetchOffer = async () => {
      try {
        const { data, error } = await supabase
          .from('offers')
          .select('*')
          .eq('id', offerId)
          .maybeSingle()

        if (error) {
          console.error('Error fetching offer:', error)
          return
        }

        if (data) {
          setOffer(data)
        }
      } catch (error) {
        console.error('Error fetching offer:', error)
      }
    }

    fetchOffer()
  }, [offerId])

  return { offer }
}
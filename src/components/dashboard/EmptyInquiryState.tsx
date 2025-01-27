import { Card } from "@/components/ui/card"

type EmptyInquiryStateProps = {
  type: "buying" | "selling"
}

export const EmptyInquiryState = ({ type }: EmptyInquiryStateProps) => {
  return (
    <Card className="p-6">
      <p className="text-center text-gray-500">
        {type === "buying" 
          ? "Još uvek nemate upita za nabavku." 
          : "Trenutno nema upita koji odgovaraju vašim tagovima."}
      </p>
    </Card>
  )
}
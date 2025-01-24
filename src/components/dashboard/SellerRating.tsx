import { Star } from "lucide-react"

type SellerRatingProps = {
  rating: number
  numberOfRatings: number
  totalSales: number
}

export const SellerRating = ({ rating, numberOfRatings, totalSales }: SellerRatingProps) => {
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? "text-yellow-400 fill-yellow-400"
                : star - rating <= 0.5
                ? "text-yellow-400 fill-yellow-400 opacity-50"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        {renderStars(rating)}
        <span className="text-xs text-gray-600">
          ({numberOfRatings})
        </span>
      </div>
      <div className="text-sm text-gray-600">
        Ukupna vrednost prodaje: {totalSales.toLocaleString('sr-RS')} RSD
      </div>
    </div>
  )
}
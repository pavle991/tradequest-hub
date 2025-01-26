import { Card } from "@/components/ui/card"

export const LoadingState = () => {
  return (
    <Card className="p-6">
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="h-8 bg-gray-200 rounded"></div>
        <div className="h-8 bg-gray-200 rounded"></div>
        <div className="h-8 bg-gray-200 rounded"></div>
        <div className="h-24 bg-gray-200 rounded"></div>
      </div>
    </Card>
  )
}
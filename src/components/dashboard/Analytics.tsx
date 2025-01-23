import { Card } from "@/components/ui/card"

type AnalyticsProps = {
  totalInquiries: number
  activeInquiries: number
  completedInquiries: number
  averageResponseTime: string
  successRate: number
}

export const Analytics = ({
  totalInquiries,
  activeInquiries,
  completedInquiries,
  averageResponseTime,
  successRate,
}: AnalyticsProps) => {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Analitika</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-700">Ukupno upita</h3>
          <p className="text-2xl font-bold text-blue-900">{totalInquiries}</p>
        </div>
        <div className="p-4 bg-green-50 rounded-lg">
          <h3 className="font-semibold text-green-700">Aktivni upiti</h3>
          <p className="text-2xl font-bold text-green-900">{activeInquiries}</p>
        </div>
        <div className="p-4 bg-purple-50 rounded-lg">
          <h3 className="font-semibold text-purple-700">Završeni upiti</h3>
          <p className="text-2xl font-bold text-purple-900">{completedInquiries}</p>
        </div>
        <div className="p-4 bg-yellow-50 rounded-lg">
          <h3 className="font-semibold text-yellow-700">Prosečno vreme odgovora</h3>
          <p className="text-2xl font-bold text-yellow-900">{averageResponseTime}</p>
        </div>
        <div className="p-4 bg-indigo-50 rounded-lg">
          <h3 className="font-semibold text-indigo-700">Stopa uspešnosti</h3>
          <p className="text-2xl font-bold text-indigo-900">{successRate}%</p>
        </div>
      </div>
    </Card>
  )
}
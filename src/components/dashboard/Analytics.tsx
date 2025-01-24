import { Card } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts"

type AnalyticsProps = {
  totalInquiries: number
  activeInquiries: number
  completedInquiries: number
  averageResponseTime: string
  successRate: number
}

const priceData = [
  { name: "Eva pena", price: 850 },
  { name: "Kopir papir", price: 1200 },
  { name: "Toneri", price: 8900 },
  { name: "Kancelarijski nameštaj", price: 25000 }
]

const locationData = [
  { city: "Beograd", orders: 450 },
  { city: "Novi Sad", orders: 280 },
  { city: "Niš", orders: 180 },
  { city: "Kragujevac", orders: 150 }
]

export const Analytics = ({
  totalInquiries,
  activeInquiries,
  completedInquiries,
  averageResponseTime,
  successRate,
}: AnalyticsProps) => {
  return (
    <div className="space-y-8">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Prosečne cene po kategorijama</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={priceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="price" fill="#4f46e5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Geografska distribucija porudžbina</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={locationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="city" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="orders" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 col-span-1 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Promocije i popusti</h2>
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800">Aktuelna promocija</h3>
              <p className="text-green-700">2 meseca bez mesečne pretplate za nove korisnike</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800">Stalna ponuda</h3>
              <p className="text-blue-700">1% provizije na sve uspešno realizovane transakcije</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
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

const Statistics = () => {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <h1 className="text-3xl font-bold mb-8">Statistika</h1>
      
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

export default Statistics
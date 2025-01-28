import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

const HeroSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6">
          Nabavka i prodaja na jednom mestu
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Pojednostavite proces nabavke i prodaje. Povežite se sa pouzdanim dobavljačima i kupcima.
        </p>
        <div className="space-x-4">
          <Button asChild size="lg">
            <Link to="/register">Započnite odmah</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/buying">Istražite platformu</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
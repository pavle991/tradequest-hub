import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

const CTASection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">
          Spremni ste da započnete?
        </h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Pridružite se rastućoj zajednici kompanija koje koriste našu platformu za efikasnije poslovanje.
        </p>
        <div className="space-x-4">
          <Button asChild size="lg">
            <Link to="/register">Registrujte se</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/buying">Pogledajte kako radi</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default CTASection
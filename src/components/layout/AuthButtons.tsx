import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export const AuthButtons = () => {
  return (
    <div className="flex items-center gap-4">
      <Button asChild variant="outline">
        <Link to="/login">Prijava</Link>
      </Button>
      <Button asChild>
        <Link to="/register">Registracija</Link>
      </Button>
    </div>
  )
}
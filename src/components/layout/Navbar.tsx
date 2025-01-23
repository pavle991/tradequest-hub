import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Building2, LogIn, UserPlus } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl text-gray-900">B2B Platforma</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost" className="flex items-center space-x-2">
                <LogIn className="h-5 w-5" />
                <span>Prijava</span>
              </Button>
            </Link>
            <Link to="/register">
              <Button className="flex items-center space-x-2">
                <UserPlus className="h-5 w-5" />
                <span>Registracija</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
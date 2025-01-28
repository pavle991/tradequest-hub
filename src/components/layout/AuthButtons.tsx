import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus } from "lucide-react";

export const AuthButtons = () => {
  return (
    <>
      <Button variant="ghost" asChild>
        <Link to="/register" className="flex items-center">
          <UserPlus className="mr-2 h-4 w-4" />
          Registruj se
        </Link>
      </Button>
      <Button variant="default" asChild>
        <Link to="/login" className="flex items-center">
          <LogIn className="mr-2 h-4 w-4" />
          Prijavi se
        </Link>
      </Button>
    </>
  );
};
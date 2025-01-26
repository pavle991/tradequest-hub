import { Link } from "react-router-dom";
import { Building2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { AuthButtons } from "./AuthButtons";
import { UserMenu } from "./UserMenu";

export const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Building2 className="h-8 w-8" />
              <span className="font-bold text-xl text-gray-900">B2B Platforma</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {!user ? <AuthButtons /> : <UserMenu />}
          </div>
        </div>
      </div>
    </nav>
  );
};
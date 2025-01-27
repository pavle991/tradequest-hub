import { Link } from "react-router-dom";
import { Building2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { AuthButtons } from "./AuthButtons";
import { UserMenu } from "./UserMenu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const [companyName, setCompanyName] = useState<string>("");
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchCompanyProfile(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchCompanyProfile(session.user.id);
      } else {
        setCompanyName("");
        setLogoUrl(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchCompanyProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('company_name, logo_url')
      .eq('id', userId)
      .maybeSingle();

    if (!error && data) {
      setCompanyName(data.company_name);
      setLogoUrl(data.logo_url);
    }
  };

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
            {user && companyName && (
              <div className="flex items-center space-x-3">
                {logoUrl && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={logoUrl} alt={companyName} />
                    <AvatarFallback>{companyName.charAt(0)}</AvatarFallback>
                  </Avatar>
                )}
                <span className="text-gray-700 font-medium">{companyName}</span>
              </div>
            )}
            {!user ? <AuthButtons /> : <UserMenu />}
          </div>
        </div>
      </div>
    </nav>
  );
};
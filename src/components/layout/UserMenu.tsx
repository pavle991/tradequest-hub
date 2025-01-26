import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Building2, Settings, BarChart3, LogOut } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CompanyProfile } from "@/components/dashboard/CompanyProfile";

export const UserMenu = () => {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast.success("Uspešno ste se odjavili");
      navigate("/login");
    } catch (error: any) {
      toast.error(error.message || "Došlo je do greške prilikom odjave");
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg" alt="Company Logo" />
              <AvatarFallback>
                <Building2 className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem onSelect={() => setIsProfileOpen(true)}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Podešavanja profila</span>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/dashboard" className="flex items-center">
              <BarChart3 className="mr-2 h-4 w-4" />
              <span>Statistika</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout} className="text-red-600">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Odjavi se</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <CompanyProfile />
        </DialogContent>
      </Dialog>
    </>
  );
};
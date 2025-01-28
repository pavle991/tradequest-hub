import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Register from "@/pages/Register";
import Login from "@/pages/Login";
import BuyingDashboard from "@/pages/BuyingDashboard";
import SellingDashboard from "@/pages/SellingDashboard";
import Index from "@/pages/Index";
import { useEffect, useState } from "react";
import { supabase } from "./integrations/supabase/client";
import { User } from "@supabase/supabase-js";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route 
          path="/login" 
          element={user ? <Navigate to="/buying" /> : <Login />} 
        />
        <Route 
          path="/register" 
          element={user ? <Navigate to="/buying" /> : <Register />} 
        />
        <Route 
          path="/buying" 
          element={user ? <BuyingDashboard /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/selling" 
          element={user ? <SellingDashboard /> : <Navigate to="/login" />} 
        />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
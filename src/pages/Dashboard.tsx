import { Navbar } from "@/components/layout/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { toast } from "sonner";

const Dashboard = () => {
  const [companyInfo, setCompanyInfo] = useState({
    name: "Moja Firma DOO",
    address: "Bulevar Oslobođenja 123",
    city: "Novi Sad",
    pib: "123456789",
    phone: "+381 21 123 456",
  });

  const handleUpdateCompany = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Podaci o firmi su uspešno ažurirani");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <Tabs defaultValue="company" className="space-y-4">
          <TabsList>
            <TabsTrigger value="company">Podaci o firmi</TabsTrigger>
            <TabsTrigger value="orders">Porudžbine</TabsTrigger>
            <TabsTrigger value="products">Proizvodi</TabsTrigger>
          </TabsList>

          <TabsContent value="company">
            <Card className="p-6">
              <form onSubmit={handleUpdateCompany} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Naziv firme</Label>
                  <Input
                    id="companyName"
                    value={companyInfo.name}
                    onChange={(e) =>
                      setCompanyInfo({ ...companyInfo, name: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Adresa</Label>
                  <Input
                    id="address"
                    value={companyInfo.address}
                    onChange={(e) =>
                      setCompanyInfo({ ...companyInfo, address: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">Grad</Label>
                  <Input
                    id="city"
                    value={companyInfo.city}
                    onChange={(e) =>
                      setCompanyInfo({ ...companyInfo, city: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pib">PIB</Label>
                  <Input
                    id="pib"
                    value={companyInfo.pib}
                    onChange={(e) =>
                      setCompanyInfo({ ...companyInfo, pib: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon</Label>
                  <Input
                    id="phone"
                    value={companyInfo.phone}
                    onChange={(e) =>
                      setCompanyInfo({ ...companyInfo, phone: e.target.value })
                    }
                  />
                </div>

                <Button type="submit">Sačuvaj izmene</Button>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Porudžbine</h2>
              <p>Trenutno nema aktivnih porudžbina.</p>
            </Card>
          </TabsContent>

          <TabsContent value="products">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Proizvodi</h2>
              <p>Trenutno nema dodatih proizvoda.</p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
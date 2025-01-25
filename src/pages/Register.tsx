import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  companyName: z.string().min(2, "Naziv firme mora imati najmanje 2 karaktera"),
  email: z.string().email("Unesite validnu email adresu"),
  password: z.string().min(6, "Lozinka mora imati najmanje 6 karaktera"),
  confirmPassword: z.string(),
  pib: z.string().optional(),
  phone: z.string().optional(),
  description: z.string().min(10, "Opis mora imati najmanje 10 karaktera"),
  // Nove informacije
  companyNumber: z.string().optional(),
  foundingYear: z.string().optional(),
  website: z.string().url("Unesite validnu web adresu").optional(),
  // Adresni podaci
  address: z.string().optional(),
  city: z.string().optional(),
  postalCode: z.string().optional(),
  region: z.string().optional(),
  // Kontakt osoba
  contactName: z.string().optional(),
  contactPosition: z.string().optional(),
  alternativeEmail: z.string().email("Unesite validnu email adresu").optional(),
  workingHours: z.string().optional(),
  // Društvene mreže
  linkedin: z.string().url("Unesite validnu LinkedIn adresu").optional(),
  facebook: z.string().url("Unesite validnu Facebook adresu").optional(),
  instagram: z.string().url("Unesite validnu Instagram adresu").optional(),
  // Preference
  preferredCommunication: z.enum(["email", "phone", "chat"]).optional(),
  communicationLanguage: z.enum(["sr", "en"]).optional(),
  currency: z.enum(["RSD", "EUR", "USD"]).optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Lozinke se ne poklapaju",
  path: ["confirmPassword"],
});

const Register = () => {
  const navigate = useNavigate();
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      email: "",
      password: "",
      confirmPassword: "",
      pib: "",
      phone: "",
      description: "",
      companyNumber: "",
      foundingYear: "",
      website: "",
      address: "",
      city: "",
      postalCode: "",
      region: "",
      contactName: "",
      contactPosition: "",
      alternativeEmail: "",
      workingHours: "",
      linkedin: "",
      facebook: "",
      instagram: "",
      preferredCommunication: "email",
      communicationLanguage: "sr",
      currency: "RSD",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log({ ...values, tags });
    toast.success("Uspešno ste se registrovali!");
    navigate("/dashboard");
  };

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const products = JSON.parse(content);
          const productTags = products.map((p: any) => p.category).filter((c: string) => c);
          const uniqueTags = [...new Set([...tags, ...productTags])];
          setTags(uniqueTags);
          toast.success("Proizvodi su uspešno importovani!");
        } catch (error) {
          toast.error("Greška pri učitavanju fajla. Proverite format.");
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Registracija</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Osnovne informacije */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Osnovne informacije</h3>
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Naziv firme</FormLabel>
                      <FormControl>
                        <Input placeholder="Unesite naziv firme" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="companyNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Matični broj</FormLabel>
                        <FormControl>
                          <Input placeholder="Unesite matični broj" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="pib"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>PIB</FormLabel>
                        <FormControl>
                          <Input placeholder="Unesite PIB" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="foundingYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Godina osnivanja</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="npr. 2020" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <Input placeholder="https://..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Adresni podaci */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Adresni podaci</h3>
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Adresa</FormLabel>
                      <FormControl>
                        <Input placeholder="Unesite adresu" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Grad</FormLabel>
                        <FormControl>
                          <Input placeholder="Unesite grad" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Poštanski broj</FormLabel>
                        <FormControl>
                          <Input placeholder="npr. 11000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="region"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Region</FormLabel>
                        <FormControl>
                          <Input placeholder="npr. Vojvodina" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Kontakt informacije */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Kontakt informacije</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="email@kompanija.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefon</FormLabel>
                        <FormControl>
                          <Input placeholder="Unesite broj telefona" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="contactName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ime i prezime kontakt osobe</FormLabel>
                        <FormControl>
                          <Input placeholder="npr. Petar Petrović" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contactPosition"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pozicija</FormLabel>
                        <FormControl>
                          <Input placeholder="npr. Menadžer prodaje" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="workingHours"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Radno vreme</FormLabel>
                      <FormControl>
                        <Input placeholder="npr. Pon-Pet 09-17h" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Društvene mreže */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Društvene mreže (opciono)</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="linkedin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>LinkedIn</FormLabel>
                        <FormControl>
                          <Input placeholder="LinkedIn profil" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="facebook"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Facebook</FormLabel>
                        <FormControl>
                          <Input placeholder="Facebook stranica" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="instagram"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Instagram</FormLabel>
                        <FormControl>
                          <Input placeholder="Instagram profil" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Preference */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Preference</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="preferredCommunication"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferirani način komunikacije</FormLabel>
                        <FormControl>
                          <select
                            {...field}
                            className="w-full h-10 px-3 py-2 border rounded-md"
                          >
                            <option value="email">Email</option>
                            <option value="phone">Telefon</option>
                            <option value="chat">Chat</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="communicationLanguage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Jezik komunikacije</FormLabel>
                        <FormControl>
                          <select
                            {...field}
                            className="w-full h-10 px-3 py-2 border rounded-md"
                          >
                            <option value="sr">Srpski</option>
                            <option value="en">Engleski</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="currency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferirana valuta</FormLabel>
                        <FormControl>
                          <select
                            {...field}
                            className="w-full h-10 px-3 py-2 border rounded-md"
                          >
                            <option value="RSD">RSD</option>
                            <option value="EUR">EUR</option>
                            <option value="USD">USD</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Opis i tagovi */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Opis i kategorije</h3>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Opis delatnosti</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Opišite čime se vaša firma bavi i koje proizvode prodajete" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div>
                  <FormLabel>Kategorije proizvoda</FormLabel>
                  <div className="flex gap-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Dodajte kategoriju"
                      onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                    />
                    <Button type="button" onClick={handleAddTag}>
                      Dodaj
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => handleRemoveTag(tag)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <FormLabel>Import proizvoda</FormLabel>
                  <div className="flex items-center gap-2">
                    <Input
                      type="file"
                      accept=".json"
                      onChange={handleFileImport}
                      className="flex-1"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Podržani format: JSON fajl sa listom proizvoda
                  </p>
                </div>
              </div>

              {/* Lozinka */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Lozinka</h3>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lozinka</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="******" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Potvrdite lozinku</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="******" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full">Registruj se</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
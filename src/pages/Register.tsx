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
          // Extract tags from products and add them
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
              <FormField
                control={form.control}
                name="pib"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PIB (opciono)</FormLabel>
                    <FormControl>
                      <Input placeholder="Unesite PIB" {...field} />
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
                    <FormLabel>Broj telefona (opciono)</FormLabel>
                    <FormControl>
                      <Input placeholder="Unesite broj telefona" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="space-y-2">
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

              <div className="space-y-2">
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

              <Button type="submit" className="w-full">Registruj se</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";
import { BasicInfoForm } from "@/components/register/BasicInfoForm";
import { AddressForm } from "@/components/register/AddressForm";
import { ContactForm } from "@/components/register/ContactForm";
import { SocialMediaForm } from "@/components/register/SocialMediaForm";
import { PreferencesForm } from "@/components/register/PreferencesForm";
import { DescriptionForm } from "@/components/register/DescriptionForm";
import { PasswordForm } from "@/components/register/PasswordForm";

const formSchema = z.object({
  companyName: z.string().min(2, "Naziv firme mora imati najmanje 2 karaktera"),
  email: z.string().email("Unesite validnu email adresu"),
  password: z.string().min(6, "Lozinka mora imati najmanje 6 karaktera"),
  confirmPassword: z.string(),
  pib: z.string().optional(),
  phone: z.string().optional(),
  description: z.string().min(10, "Opis mora imati najmanje 10 karaktera"),
  companyNumber: z.string().optional(),
  foundingYear: z.string().optional(),
  website: z.string().url("Unesite validnu web adresu").optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  postalCode: z.string().optional(),
  region: z.string().optional(),
  contactName: z.string().optional(),
  contactPosition: z.string().optional(),
  alternativeEmail: z.string().email("Unesite validnu email adresu").optional(),
  workingHours: z.string().optional(),
  linkedin: z.string().url("Unesite validnu LinkedIn adresu").optional(),
  facebook: z.string().url("Unesite validnu Facebook adresu").optional(),
  instagram: z.string().url("Unesite validnu Instagram adresu").optional(),
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
              <BasicInfoForm form={form} />
              <AddressForm form={form} />
              <ContactForm form={form} />
              <SocialMediaForm form={form} />
              <PreferencesForm form={form} />
              <DescriptionForm 
                form={form}
                tags={tags}
                setTags={setTags}
                handleFileImport={handleFileImport}
              />
              <PasswordForm form={form} />
              <Button type="submit" className="w-full">Registruj se</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
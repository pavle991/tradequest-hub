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
import { supabase } from "@/integrations/supabase/client";

const urlRegex = /^(https?:\/\/|www\.)[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+([\/\w-]*)*\/?$/;

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
  website: z.string()
    .regex(urlRegex, "Unesite validnu web adresu (može početi sa www. ili http://)")
    .optional()
    .or(z.literal("")),
  address: z.string().optional(),
  city: z.string().optional(),
  postalCode: z.string().optional(),
  region: z.string().optional(),
  contactName: z.string().optional(),
  contactPosition: z.string().optional(),
  workingHours: z.string().optional(),
  linkedin: z.string().optional(),
  facebook: z.string().optional(),
  instagram: z.string().optional(),
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
  const [isLoading, setIsLoading] = useState(false);
  
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
      workingHours: "",
      linkedin: "",
      facebook: "",
      instagram: "",
      preferredCommunication: "email",
      communicationLanguage: "sr",
      currency: "RSD",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      
      // Register user with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });

      if (authError) {
        console.error("Auth error:", authError);
        toast.error(authError.message);
        return;
      }

      if (!authData.user) {
        console.error("No user data returned");
        toast.error("Registracija nije uspela");
        return;
      }

      // Create profile with all form data
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: authData.user.id,
          company_name: values.companyName,
          company_number: values.companyNumber || null,
          pib: values.pib || null,
          founding_year: values.foundingYear ? parseInt(values.foundingYear) : null,
          website: values.website || null,
          description: values.description || null,
          contact_name: values.contactName || null,
          contact_position: values.contactPosition || null,
          phone: values.phone || null,
          working_hours: values.workingHours || null,
          address: values.address || null,
          city: values.city || null,
          postal_code: values.postalCode || null,
          region: values.region || null,
          linkedin: values.linkedin || null,
          facebook: values.facebook || null,
          instagram: values.instagram || null,
          preferred_communication: values.preferredCommunication || null,
          communication_language: values.communicationLanguage || null,
          currency: values.currency || null,
          tags: tags,
        });

      if (profileError) {
        console.error('Profile update error:', profileError);
        toast.error("Greška pri ažuriranju profila");
        return;
      }

      toast.success("Uspešno ste se registrovali! Možete se prijaviti.");
      navigate("/login");
    } catch (error: any) {
      console.error('Registration error:', error);
      toast.error(error.message || "Došlo je do greške prilikom registracije");
    } finally {
      setIsLoading(false);
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
                handleFileImport={() => {}}
              />
              <PasswordForm form={form} />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Registracija u toku..." : "Registruj se"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
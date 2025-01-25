import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

type ContactFormProps = {
  form: UseFormReturn<any>;
};

export const ContactForm = ({ form }: ContactFormProps) => {
  return (
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
  );
};
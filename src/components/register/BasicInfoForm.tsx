import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";

type BasicInfoFormProps = {
  form: UseFormReturn<any>;
};

export const BasicInfoForm = ({ form }: BasicInfoFormProps) => {
  return (
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
  );
};
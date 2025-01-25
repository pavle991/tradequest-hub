import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";

type PreferencesFormProps = {
  form: UseFormReturn<any>;
};

export const PreferencesForm = ({ form }: PreferencesFormProps) => {
  return (
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
  );
};
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { useState } from "react";

type DescriptionFormProps = {
  form: UseFormReturn<any>;
  tags: string[];
  setTags: (tags: string[]) => void;
  handleFileImport: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const DescriptionForm = ({ form, tags, setTags, handleFileImport }: DescriptionFormProps) => {
  const [newTag, setNewTag] = useState("");

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
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
  );
};
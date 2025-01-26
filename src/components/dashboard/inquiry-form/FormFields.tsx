import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type FormFieldsProps = {
  title: string
  description: string
  onTitleChange: (value: string) => void
  onDescriptionChange: (value: string) => void
  type: "buying" | "selling"
}

export const FormFields = ({ 
  title, 
  description, 
  onTitleChange, 
  onDescriptionChange,
  type 
}: FormFieldsProps) => {
  return (
    <>
      <div>
        <label className="block text-sm font-medium mb-1">Naslov</label>
        <Input
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder={type === "buying" ? "Unesite naslov upita" : "Unesite naslov oglasa"}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Opis</label>
        <Textarea
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder={type === "buying" ? "Detaljno opišite šta vam je potrebno" : "Detaljno opišite šta prodajete"}
          rows={4}
        />
      </div>
    </>
  )
}
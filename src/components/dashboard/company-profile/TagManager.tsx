import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { useState } from "react"

type TagManagerProps = {
  tags: string[]
  onChange: (tags: string[]) => void
}

export const TagManager = ({ tags, onChange }: TagManagerProps) => {
  const [newTag, setNewTag] = useState("")

  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      onChange([...tags, newTag])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    onChange(tags.filter(tag => tag !== tagToRemove))
  }

  return (
    <div>
      <label className="block text-sm font-medium mb-1">Tagovi proizvoda</label>
      <div className="flex gap-2 mb-2">
        <Input
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="Dodaj novi tag"
          onKeyPress={(e) => e.key === "Enter" && addTag()}
        />
        <Button onClick={addTag}>Dodaj</Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="flex items-center gap-1">
            {tag}
            <X
              className="h-3 w-3 cursor-pointer"
              onClick={() => removeTag(tag)}
            />
          </Badge>
        ))}
      </div>
    </div>
  )
}
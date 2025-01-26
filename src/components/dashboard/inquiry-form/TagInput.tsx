import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

type TagInputProps = {
  tags: string[]
  onAddTag: (tag: string) => void
  onRemoveTag: (tag: string) => void
}

export const TagInput = ({ tags, onAddTag, onRemoveTag }: TagInputProps) => {
  const [newTag, setNewTag] = useState("")

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      onAddTag(newTag)
      setNewTag("")
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium mb-1">Tagovi</label>
      <div className="flex gap-2 mb-2">
        <Input
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="Dodaj novi tag"
          onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
        />
        <Button type="button" onClick={handleAddTag}>Dodaj</Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="flex items-center gap-1">
            {tag}
            <X
              className="h-3 w-3 cursor-pointer"
              onClick={() => onRemoveTag(tag)}
            />
          </Badge>
        ))}
      </div>
    </div>
  )
}
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Textarea } from "~/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { Label } from "~/components/ui/label"

export function CreateBuildModal() {
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Handle form submission logic here
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Create Build</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Weapon Build</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" required />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" />
          </div>
          <div>
            <Label htmlFor="images">Images</Label>
            <Input id="images" type="file" multiple required />
          </div>
          <div>
            <Label htmlFor="weaponName">Weapon Name</Label>
            <Input id="weaponName" required />
          </div>
          <div>
            <Label htmlFor="weaponType">Weapon Type</Label>
            <Select required>
              <SelectTrigger>
                <SelectValue placeholder="Select weapon type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AR">AR</SelectItem>
                <SelectItem value="SMG">SMG</SelectItem>
                <SelectItem value="Sniper">Sniper</SelectItem>
                <SelectItem value="Shotgun">Shotgun</SelectItem>
                <SelectItem value="LMG">LMG</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="buildCode">Build Code</Label>
            <Input id="buildCode" required />
          </div>
          <div>
            <Label htmlFor="authorName">Author Name</Label>
            <Input id="authorName" required />
          </div>
          <div>
            <Label htmlFor="discordName">Discord Name</Label>
            <Input id="discordName" />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}



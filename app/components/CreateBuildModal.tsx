/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog"
import { Button } from "~/components/ui/button"
import { CardContent } from "~/components/ui/card"
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group"
import { Input } from "~/components/ui/input"
import { Textarea } from "~/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { Label } from "~/components/ui/label"
import { pb } from '~/lib/pb'
import { WeaponType } from '~/lib/build'
import { Check, Fingerprint, Globe, Globe2, GlobeLock, Hand, LucideMousePointerClick, MousePointer2, MousePointerClick, Pointer, Shapes, Share, Share2 } from 'lucide-react'

const weapons: Record<WeaponType, string[]> = {
  AR: ["AKS-74", "M16A4", "CAR-15", "PTR-32", "QBZ95-1", "G3", "AKM", "CI-19", "SCAR-H", "AK-12", "M14", "AUG", "M4A1", "SG552", "AS Val", "K416", "M7", "ASh-12"],
  SMG: ["UZI", "Bizon", "MP5", "Vityaz", "SR-3M", "P90", "SMG-45", "MP7", "Vector"],
  Shotgun: ["M870", "M1014", "S12K"],
  LMG: ["PKM", "M249", "M250"],
  MR: ["Mini-14", "VSS", "SKS", "SVD", "PSG-1"],
  SR: ["R93", "M700", "SV-98", "AWM"],
  Pistol: ["G17", "QSZ-92G", ".357", "93R", "M1911", "Desert Eagle", "G18"],
}

export function CreateBuildModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [weaponType, setWeaponType] = useState("")
  const [weaponName, setWeaponName] = useState("")
  const [server, setServer] = useState("global")

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const tag = await pb.collection("tags").getFirstListItem(`name = "${weaponType}"`)

    const authorName: string = event.target.authorName.value
    if (authorName[0] === '@') {
      authorName.replace('@', '')
    }

    pb.collection("builds").create({
      title: event.target.title.value,
      description: event.target.description.value,
      image: Array.from(event.target.images.files),
      type: tag.id,
      weapon: weaponName,
      code: event.target.buildCode.value,
      author: authorName,
      server
    })

    setIsOpen(false)
    setWeaponType("")
    setWeaponName("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className='plausible-event-name=Build+create flex justify-start items-center'>Share your build <MousePointerClick className='pl-1' /> </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share your weapon build</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <RadioGroup onValueChange={setServer} defaultValue="global" className="grid grid-cols-2 gap-4">
              <div>
                <RadioGroupItem
                  value="global"
                  id="global"
                  className="peer sr-only"
                  aria-label="Global"
                />
                <Label
                  htmlFor="global"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Globe className="mb-4 h-6 w-6" />
                  Global
                </Label>
              </div>
              <div>
                <RadioGroupItem
                  value="garena"
                  id="garena"
                  className="peer sr-only"
                  aria-label="Garena"
                />
                <Label
                  htmlFor="garena"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary "
                >
                  <GlobeLock className="mb-3 h-6 w-6" />
                  Garena/China
                </Label>
              </div>
            </RadioGroup>

          </div>
          <div>
            <Label htmlFor="title">Title*</Label>
            <Input id="title" required placeholder='Low recoil, Beast, ..' maxLength={24} />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder='It just shreds, but really bad in hipfire..' />
          </div>
          <div >
            <Label htmlFor="images">Images*</Label>
            <p className='text-xs text-gray-600'>minimum one </p>
            <Input id="images" type="file" multiple required />
          </div>
          <div>
            <Label htmlFor="weaponType">Weapon Type*</Label>
            <Select onValueChange={setWeaponType} required>
              <SelectTrigger>
                <SelectValue placeholder="Select weapon type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AR">AR</SelectItem>
                <SelectItem value="SMG">SMG</SelectItem>
                <SelectItem value="Pistol">Pistol</SelectItem>
                <SelectItem value="Sniper">Sniper</SelectItem>
                <SelectItem value="Shotgun">Shotgun</SelectItem>
                <SelectItem value="LMG">LMG</SelectItem>
                <SelectItem value="Rifle">Rifle</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="weaponName">Weapon Name*</Label>
            <Select onValueChange={setWeaponName} required disabled={weaponType === ""}>
              <SelectTrigger>
                <SelectValue placeholder="Select weapon name" />
              </SelectTrigger>
              <SelectContent>
                {weaponType && weapons[weaponType].map((name) => {
                  { return (<SelectItem value={name} > {name}</SelectItem>) }
                })}

              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="buildCode">Build Code*</Label>
            <Input id="buildCode" required placeholder='AKS-74 Assault Rifle-Warfare-6EKL3QO06GGSVELMFER1R' />
          </div>
          <div>
            <Label htmlFor="authorName">Author Name*</Label>
            <Input id="authorName" required placeholder='sniperbeast69' />
          </div>
          <div className="flex justify-center">
            <Button type="submit" className='w-2/4 plausible-event-name=Build+create+submited'> Submit</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog >
  )
}



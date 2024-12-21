/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Textarea } from "~/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { Label } from "~/components/ui/label"
import { pb } from '~/lib/pb'
import { Build } from '~/lib/build'

const weapons = {
  AR: ["AK-12", "AKM", "AKS-74", "CAR-15", "SCAR-H", "G3", "AS Val", "K416", "M16A4", "M4A1", "PTR-32", "QBZ95-1", "Type-191", "ASh-12", "M7", "SG 552", "SR-3M", "AUG"],
  SMG: ["P90", "MP5", "Uzi", "Vector", "SMG-45", "Bizon"],
  Pistol: ["92FS", "Desert Eagle", "G17", "G18", "M1911", "QSZ-92G", ".357 Revolver"],
  Sniper: ["AWM", "R93", "PSG-1", "SR-25", "M700", "SV-98", "SVD", "VSS"],
  Shotgun: ["M1014", "M870", "S12K"],
  LMG: ["M249", "PKM", "M250"],
  Rifle: ["G3", "M14", "Mini 14", "SKS"],
}

export function CreateBuildModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [weaponType, setWeaponType] = useState("")
  const [weaponName, setWeaponName] = useState("")

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const tag = await pb.collection("tags").getFirstListItem(`name = "${weaponType}"`)

    pb.collection("builds").create({
      title: event.target.title.value,
      description: event.target.description.value,
      image: Array.from(event.target.images.files),
      type: tag.id,
      weapon: weaponName,
      code: event.target.buildCode.value,
      author: event.target.authorName.value,
      discordName: event.target.discordName.value,
    })

    setIsOpen(false)
    setWeaponType("")
    setWeaponName("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className='plausible-event-name=Build+create' variant='secondary'>Create Build</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Weapon Build</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <Label htmlFor="weaponType">Weapon Type</Label>
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
            <Label htmlFor="weaponName">Weapon Name</Label>
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
          <div>
            <Label htmlFor="discordName">Discord Name</Label>
            <Input id="discordName" placeholder='@sniperbeast69' />
          </div>
          <div className="flex justify-center">
            <Button type="submit" className='w-2/4 plausible-event-name=Build+create+submited'> Submit</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog >
  )
}



import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog"
import { Button } from "~/components/ui/button"
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group"
import { Input } from "~/components/ui/input"
import { Textarea } from "~/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { Label } from "~/components/ui/label"
import { pb } from '~/lib/pb'
import { Build, WeaponType, weaponTypes } from '~/lib/build'
import { Globe, GlobeLock, Loader2, MousePointerClick } from 'lucide-react'
import { ClientResponseError, RecordModel } from 'pocketbase'

interface ModalProps {
  updateBuilds: (build: Build) => void
}

const weapons: Record<WeaponType, string[]> = {
  AR: ["AKS-74", "M16A4", "CAR-15", "PTR-32", "QBZ95-1", "G3", "AKM", "CI-19", "SCAR-H", "AK-12", "M14", "AUG", "M4A1", "SG552", "AS Val", "K416", "M7", "ASh-12"],
  SMG: ["UZI", "Bizon", "MP5", "Vityaz", "SR-3M", "P90", "SMG-45", "MP7", "Vector"],
  Shotgun: ["M870", "M1014", "S12K"],
  LMG: ["PKM", "M249", "M250"],
  MR: ["Mini-14", "VSS", "SKS", "SVD", "PSG-1"],
  SR: ["R93", "M700", "SV-98", "AWM"],
  Pistol: ["G17", "QSZ-92G", ".357", "93R", "M1911", "Desert Eagle", "G18"],
}

enum CREATE_STATUS {
  NONE,
  CREATING,
  SUCCESS,
  FAILED
}

export function CreateBuildModal({ updateBuilds }: ModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [weaponType, setWeaponType] = useState("")
  const [weaponName, setWeaponName] = useState("")
  const [server, setServer] = useState("global")
  const [warfareMode, setWarfareMode] = useState(false)
  const [operationMode, setOperationMode] = useState(false)
  const [createStatus, setCreationStatus] = useState<CREATE_STATUS>(CREATE_STATUS.NONE)
  const [creationError, setCreationError] = useState("")

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    let tag: RecordModel

    try {
      tag = await pb.collection("tags").getFirstListItem(`name = "${weaponType}"`)
    } catch (e) {
      return
    }

    const authorName: string = event.target.authorName.value
    if (authorName[0] === '@') {
      authorName.replace('@', '')
    }

    const modes = []
    if (warfareMode) {
      modes.push("warfare")
    }
    if (operationMode) {
      modes.push("operation")
    }

    if (modes.length === 0) {
      document.getElementById("mode-label").scrollIntoView()
      document.getElementById("mode-label").focus()
      document.getElementById("mode-label").classList.add("text-red-400")
      return
    }

    setCreationStatus(CREATE_STATUS.CREATING)
    try {
      const newBuild: Build = await pb.collection("builds").create({
        type: tag.id,
        title: event.target.title.value,
        description: event.target.description.value,
        image: Array.from(event.target.images.files),
        weapon: weaponName,
        code: event.target.buildCode.value,
        author: authorName,
        server,
        mode: JSON.stringify(modes),
      })

      updateBuilds(newBuild)

    } catch (error) {
      setCreationStatus(CREATE_STATUS.FAILED)
      if (error instanceof ClientResponseError) {
        if (error.status === 400) {
          if (error.response.data?.code?.code === "validation_not_unique") {
            document.getElementById("buildLabel").scrollIntoView()
            document.getElementById("buildLabel").focus()
            document.getElementById("buildLabel").classList.add("text-red-400")
            setCreationError("Build with this code already exists")
          }
        }

        setTimeout(() => { setCreationStatus(CREATE_STATUS.NONE) }, 3000)

        return
      }
    }

    // @ts-expect-error "plausible exists"
    window.plausible("Build create submited")

    setCreationStatus(CREATE_STATUS.SUCCESS)
    setTimeout(() => {
      setIsOpen(false)
      setCreationStatus(CREATE_STATUS.NONE)
      setWeaponType("")
      setWeaponName("")
      setWarfareMode(false)
      setOperationMode(false)
      setServer("global")
    }, 2000)
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
            <Label>Server*</Label>
            <p className='text-xs text-gray-600 mb-1'> not sure? keep 'Global' </p>
            <RadioGroup onValueChange={setServer} defaultValue="global" className="grid grid-cols-2 gap-2">
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
            <Label id="mode-label">Mode*</Label>
            <p className='text-xs text-gray-600 mb-1'> select one or more </p>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Button
                  type='button'
                  className={`flex flex-col w-full h-full items-center justify-between p-4 border ${warfareMode && "border-primary"} transition duration-0 border-2 focus-visible:ring-0 focus-visible:ring-offset-0`}
                  aria-label="Warfare"
                  onClick={() => { setWarfareMode(!warfareMode) }}
                  variant={"outline"}
                >
                  Warfare
                </Button>
              </div>
              <div>
                <Button
                  type='button'
                  className={`flex flex-col w-full h-full items-center justify-between p-4 border ${operationMode && "border-primary"} transition duration-0 border-2 focus-visible:ring-0 focus-visible:ring-offset-0`}
                  aria-label="Operation"
                  onClick={() => { setOperationMode(!operationMode) }}
                  variant={"outline"}
                >
                  Operation
                </Button>
              </div>
            </div>
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
                {
                  weaponTypes.map((type) => {
                    return (<SelectItem key={type} value={type} > {type}</SelectItem>)
                  })
                }
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
            <Label id="buildLabel" htmlFor="buildCode">Build Code*</Label>
            <Input id="buildCode" required placeholder='AKS-74 Assault Rifle-Warfare-6EKL3QO06GGSVELMFER1R' />
          </div>
          <div>
            <Label htmlFor="authorName">Author Name*</Label>
            <Input id="authorName" required placeholder='sniperbeast69' />
          </div>
          <div className="flex justify-center">

            {createStatus == CREATE_STATUS.NONE && <Button type="submit" className='w-2/4 plausible-event-name=Build+create+submited'> Submit</Button>}
            {createStatus == CREATE_STATUS.CREATING &&
              <Button disabled>
                <Loader2 className="animate-spin" />
                Submiting...
              </Button>
            }
            {createStatus == CREATE_STATUS.SUCCESS &&
              <div className='flex flex-col items-center justify-center'>
                <p className='text-md text-green-500'> Submited! 🎉</p>
                <p className='text-xs text-gray-500'> (will be reviewed before)</p>
              </div>
            }

            {createStatus == CREATE_STATUS.FAILED &&
              <div className='flex flex-col items-center justify-center'>
                <p className='text-md text-red-500'> Oh no! 😢</p>
                <p className='text-xs text-gray-500'> {creationError || "Something went wrong"}</p>
              </div>
            }

          </div>
        </form>
      </DialogContent>
    </Dialog >
  )
}



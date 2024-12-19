import { Button } from "~/components/ui/button"
import { PlusIcon } from "lucide-react"

export function SiteHeader() {
  return (
    <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-wrapper">
        <div className="flex h-14 w-full items-center">
          <p className="text-lg font-bold ml-6">Delta Force - Loadouts</p>
          <div className="flex flex-grow justify-end mr-6">
            <Button variant="secondary" className="items-center">
              <PlusIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

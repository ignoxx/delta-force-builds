import { Globe, GlobeLock } from "lucide-react"
import { ReactNode } from "react"
import { Button } from "~/components/ui/button"
import { ServerType } from "~/lib/build"

const quickFilters: { filter: ServerType, icon: ReactNode }[] = [
  {
    filter: "global", icon: <Globe />
  },
  {
    filter: "garena", icon: <GlobeLock />
  },

]

interface FilterButtonsProps {
  className?: string
  setFilter: (filter: string) => void
  selected?: string
}

export function ServerFilterButtons({ className, setFilter, selected }: FilterButtonsProps) {
  return (
    <div className={`flex flex-wrap justify-center gap-2 ${className}`}>
      {quickFilters.map(({ filter, icon }) => (
        <Button key={filter} variant={selected == filter ? "secondary" : "outline"} size="sm" onClick={() => filter == selected ? setFilter("") : setFilter(filter)}>
          {icon}{filter} {selected && selected == filter && <span className="text-xs font-thin text-gray-400 flex justify-center">X</span>}
        </Button>
      ))
      }
    </div >
  )
}

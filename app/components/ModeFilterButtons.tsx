import { Button } from "~/components/ui/button"
import { ModeType } from "~/lib/build"

const quickFilters: ModeType[] = [
  "operation",
  "warfare",
]

interface FilterButtonsProps {
  className?: string
  setFilter: (filter: string) => void
  selected?: string
}

export function ModeFilterButtons({ className, setFilter, selected }: FilterButtonsProps) {
  return (
    <div className={`flex flex-wrap justify-center gap-2 ${className}`}>
      {quickFilters.map((filter) => (
        <Button key={filter} variant={selected == filter ? "secondary" : "outline"} size="sm" onClick={() => filter == selected ? setFilter("") : setFilter(filter)}>
          {filter} {selected && selected == filter && <span className="text-xs font-thin text-gray-400 flex justify-center">X</span>}
        </Button>
      ))
      }
    </div >
  )
}

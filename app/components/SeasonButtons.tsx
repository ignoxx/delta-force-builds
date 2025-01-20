import { Button } from "~/components/ui/button"

export type SeasonQuickFilter = {
  label: string
  filter: string
}

const quickFilters: SeasonQuickFilter[] = [
  { label: "Season 3", filter: "created >= '2025-01-19'" },
  { label: "Season 1", filter: "created <= '2025-01-19'" },
]

interface FilterButtonsProps {
  className?: string
  setFilter: (filter: SeasonQuickFilter) => void
  selected?: SeasonQuickFilter
}

export function SeasonButtons({ className, setFilter, selected }: FilterButtonsProps) {
  return (
    <div className={`flex flex-wrap justify-center gap-2 ${className}`}>
      {quickFilters.map((f) => (
        <Button key={f.label} variant={selected == f ? "secondary" : "outline"} size="sm" onClick={() => {
          if (f !== selected) {
            setFilter(f)
          } else {
            setFilter(null)
          }
        }}>

          Created in {f.label} {selected && selected == f && <span className="text-xs font-thin text-gray-400 flex justify-center">X</span>}

        </Button>
      ))
      }
    </div >
  )
}

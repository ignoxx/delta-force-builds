import { X } from "lucide-react"
import { Button } from "~/components/ui/button"

export type SortOption = "-created" | "-copies"

const quickSort: { key: SortOption, value: string }[] = [
  { key: "-copies", value: "Most copied" },
  { key: "-created", value: "Most recent" },
]

interface SortButtonsProps {
  className?: string
  setSort: (sort: SortOption) => void
  selected?: string
}


export function SortButtons({ className, setSort, selected }: SortButtonsProps) {
  return (
    <div className={`flex flex-wrap justify-center gap-2 ${className}`}>
      {quickSort.map(({ key, value }) => (
        <Button key={value} variant={selected == key ? "secondary" : "outline"} size="sm" onClick={() => setSort(key)}>
          {value}
        </Button>
      ))
      }
    </div >
  )
}

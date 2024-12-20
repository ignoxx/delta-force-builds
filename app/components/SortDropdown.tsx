import { Button } from "~/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { ArrowUpDown } from 'lucide-react'

export type SortOption = "-created" | "-likes" | "-copies"

interface SortDropdownProps {
  onSort: (option: SortOption) => void
  currentSort: SortOption
}

export function SortDropdown({ onSort, currentSort }: SortDropdownProps) {
  const sortOptions: { value: SortOption; label: string }[] = [
    { value: "-created", label: "Newest" },
    { value: "-likes", label: "Most Liked" },
    { value: "-copies", label: "Most Copied" },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <ArrowUpDown className="mr-2 h-4 w-4" />
          Sort by: {sortOptions.find(option => option.value === currentSort)?.label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {sortOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onSort(option.value)}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


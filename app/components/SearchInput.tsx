import { useEffect, useRef } from "react"
import { Input } from "~/components/ui/input"
import { Search } from 'lucide-react'

interface SearchInputProps {
  onSearch: (query: string) => void
}

export function SearchInput({ onSearch }: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "/" && document.activeElement !== inputRef.current) {
        event.preventDefault()
        inputRef.current?.focus()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        ref={inputRef}
        type="search"
        placeholder="Search weapon builds..."
        className="pl-8"
        onChange={(e) => onSearch(e.target.value)}
      />
      <div className="bg-gray-900 absolute right-2 top-1/2 h-6 w-6 -translate-y-1/2 text-xs flex items-center justify-center rounded-md">
        /
      </div>
    </div>
  )
}

import { useEffect, useRef } from "react"
import { Input } from "~/components/ui/input"
import { Search } from 'lucide-react'

interface SearchInputProps {
  onSearch: (query: string) => void
  createBuildModalOpen?: boolean
}

export function SearchInput({ onSearch, createBuildModalOpen }: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const debouncedSearch = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!createBuildModalOpen && event.key === "/" && document.activeElement !== inputRef.current) {
        event.preventDefault()
        inputRef.current?.focus()
      }

      if (["Escape", "Enter"].includes(event.key)
        && document.activeElement === inputRef.current) {
        inputRef.current?.blur()
      }
    }

    const handleMouseWheel = (event: WheelEvent) => {
      if (event.deltaY > 0 && document.activeElement === inputRef.current) {
        inputRef.current?.blur()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("wheel", handleMouseWheel)

    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [createBuildModalOpen])

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        ref={inputRef}
        placeholder="Type to search.. `low recoil`, `budget g3`"
        className="pl-8 h-12"
        onChange={(e) => {
          let input = e.target.value.trim()

          if (input[0] === '@') {
            input = input.slice(1)
          }

          clearTimeout(debouncedSearch.current)
          debouncedSearch.current = setTimeout(() => {
            onSearch(input)
          }, 250)
        }}
      />
      <div className="absolute right-2 top-1/2 text-xs flex items-center justify-center -translate-y-1/2">
        <div className="bg-gray-900 text-gray-500 rounded-md h-6 w-6 flex items-center justify-center"> / </div>
        <p className="pl-1 text-gray-600 hidden md:block">to focus</p>
      </div>

    </div>
  )
}

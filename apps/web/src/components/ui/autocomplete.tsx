import * as React from "react"
import { Check, ChevronsUpDown, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { Input } from "./input"

type AutocompleteProps<T> = {
  options: T[]
  onSelect: (value: T) => void
  initialValue?: T | null
  placeholder?: string
  emptyMessage?: string
  displayKey: keyof T
  className?: string
  onInputChange?: (value: string) => void // New prop
  searchTerm?: string // New prop
  isLoading?: boolean // New prop
}

export function Autocomplete<T extends { [key: string]: any }>({
  options,
  initialValue,
  onSelect,
  placeholder = "Search...",
  emptyMessage = "No results found.",
  displayKey,
  className,
  onInputChange, // New prop
  searchTerm: externalSearchTerm, // New prop
  isLoading = false, // New prop with default value
}: AutocompleteProps<T>) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState<T | null>(initialValue ?? null)
  const [internalSearchTerm, setInternalSearchTerm] = React.useState("")

  // Use external searchTerm if provided, otherwise use internal state
  const searchTerm = externalSearchTerm !== undefined ? externalSearchTerm : internalSearchTerm

  const getOptionLabel = React.useCallback((option: T): string => {
    return String(option[displayKey] || "")
  }, [displayKey])

  const filteredOptions = React.useMemo(() => 
    options.filter(option => 
      getOptionLabel(option)
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    ),
    [options, searchTerm, getOptionLabel]
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInternalSearchTerm(newValue)
    if (onInputChange) {
      onInputChange(newValue)
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
        >
          {value ? getOptionLabel(value) : placeholder}
          {isLoading ? (
            <Loader2 className="ml-2 h-4 w-4 animate-spin" />
          ) : (
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleInputChange}
          className="w-full p-2 border-b"
        />
        <div className="max-h-[300px] overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-center py-3 px-2 text-lg rounded-md cursor-pointer", // Added hover effect
                  value === option ? "text-primary" : "" // Changed selected style
                )}
                onClick={() => {
                  setValue(option)
                  setOpen(false)
                  onSelect(option)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === option ? "opacity-100" : "opacity-0"
                  )}
                />
                {getOptionLabel(option)}
              </div>
            ))
          ) : (
            <div className="p-2">{emptyMessage}</div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}

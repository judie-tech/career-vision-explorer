
import { Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  return (
    <Button
      variant="ghost"
      size="sm"
      disabled
      className="h-9 w-9 px-0 opacity-50 cursor-not-allowed"
    >
      <Sun className="h-4 w-4" />
      <span className="sr-only">Light mode only</span>
    </Button>
  )
}

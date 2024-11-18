// components/ui/rating.tsx
"use client"
 
import * as React from "react"
import { Star } from "lucide-react"
 
interface RatingProps {
  value?: number
  max?: number
  onChange?: (value: number) => void
  readonly?: boolean
}
 
export function Rating({
  value = 0,
  max = 5,
  onChange,
  readonly = false,
}: RatingProps) {
  const [hoveredIndex, setHoveredIndex] = React.useState<number>(-1)
 
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, index) => {
        const filled = hoveredIndex >= index || (hoveredIndex === -1 && value > index)
        
        return (
          <button
            key={index}
            type="button"
            className={`
              ${readonly ? 'cursor-default' : 'cursor-pointer'}
              ${filled ? 'text-yellow-400' : 'text-gray-300'}
              hover:scale-110 transition-transform
            `}
            onClick={() => !readonly && onChange?.(index + 1)}
            onMouseEnter={() => !readonly && setHoveredIndex(index)}
            onMouseLeave={() => !readonly && setHoveredIndex(-1)}
            disabled={readonly}
          >
            <Star className="h-6 w-6 fill-current" />
          </button>
        )
      })}
    </div>
  )
}
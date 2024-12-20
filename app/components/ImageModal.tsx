import { Dialog, DialogContent } from "~/components/ui/dialog"
import { Button } from "~/components/ui/button"
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

interface ImageModalProps {
  images: string[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

export function ImageModal({ images, currentIndex, isOpen, onClose, onNext, onPrev }: ImageModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <div className="relative">
          <img
            src={images[currentIndex]}
            alt={`img-${currentIndex + 1}`}
            className="w-full h-auto"
          />
          {images.length > 1 && (
            <>
              <Button
                size="icon"
                variant="ghost"
                className="absolute left-2 top-1/2 transform -translate-y-1/2 focus:hidden"
                onClick={onPrev}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 focus:hidden"
                onClick={onNext}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}



import { Dialog, DialogContent } from "~/components/ui/dialog"
import { Button } from "~/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Skeleton } from "./ui/skeleton"
import { useEffect, useState } from "react"

interface ImageModalProps {
  images: string[]
  index: number
  isOpen: boolean
  onClose: () => void
}

export function ImageModal({ images, index, isOpen, onClose }: ImageModalProps) {
  const [imageLoading, setImageLoading] = useState<boolean[]>(() =>
    images.map(() => true)
  );

  useEffect(() => {
    setCurrentIndex(index)
  }, [index, isOpen])

  const [currentIndex, setCurrentIndex] = useState<number>(index)

  const handleImageLoad = (index: number) => {
    setImageLoading((prev) => {
      const newState = [...prev];
      newState[index] = false;
      return newState;
    });
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl">
        <div className="relative">
          {imageLoading[currentIndex] && (
            <Skeleton className='w-full h-[600px]' />
          )}
          <img
            src={images[currentIndex]}
            alt={`img-${currentIndex + 1}`}
            className="w-full h-[600px] object-contain"
            hidden={imageLoading[currentIndex]}
            onLoad={() => { handleImageLoad(currentIndex) }}
          />
          {!imageLoading[currentIndex] && images.length > 1 && (
            <>
              <Button
                size="icon"
                variant="ghost"
                className="absolute left-2 top-1/2 transform -translate-y-1/2 focus:hidden"
                onClick={prevImage}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 focus:hidden"
                onClick={nextImage}
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



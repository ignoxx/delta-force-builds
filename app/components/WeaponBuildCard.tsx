import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Skeleton } from './ui/skeleton'
import { Button } from "~/components/ui/button"
import { Copy, Check, ArrowUp, ThumbsUp, ChevronLeft, ChevronRight, ArrowDown, Download, MousePointerClick, CopyX, CopyIcon, CopyCheck } from 'lucide-react'
import { Badge } from "~/components/ui/badge"
import { ImageModal } from "./ImageModal"
import { Build } from "~/lib/build";
import { pb } from '~/lib/pb'

interface WeaponBuildCardProps {
  build: Build
}


export function WeaponBuildCard({ build }: WeaponBuildCardProps) {
  const [copied, setCopied] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [imageLoading, setImageLoading] = useState<boolean[]>(() =>
    build.image.map(() => true)
  );

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === build.image.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? build.image.length - 1 : prevIndex - 1
    )
  }

  const handleImageLoad = (index: number) => {
    setImageLoading((prev) => {
      const newState = [...prev];
      newState[index] = false;
      return newState;
    });
  };

  const copyBuildId = async () => {
    if (copied === true) return;

    navigator.clipboard.writeText(build.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
    build.copies++
    await pb.send(`/api/copied/${build.id}`, { method: "post" })
  }

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-sm">{build.title}</CardTitle>
            <p className="text-sm text-muted-foreground">
              @{build.author}
            </p>
          </div>
          <div className="flex flex-col">
            <Badge variant="secondary">{build.weapon.toUpperCase()}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="relative">

          {imageLoading[currentImageIndex] && (
            <Skeleton className='w-full h-48 object-cover mb-2 rounded-md cursor-pointer' />
          )}

          <img
            src={pb.files.getURL(build, build.image[currentImageIndex], { thumb: "0x200" })}
            alt={`${build.title} - img ${currentImageIndex + 1}`}
            className={`w-full h-48 object-cover mb-2 rounded-md cursor-pointer`}
            hidden={imageLoading[currentImageIndex]}
            onClick={() => setIsModalOpen(true)}
            onLoad={() => handleImageLoad(currentImageIndex)}
          />

          {!imageLoading[currentImageIndex] && (build.image.length > 1 && (
            <>
              <Button
                size="icon"
                variant="ghost"
                className="absolute left-1 top-1/2 transform -translate-y-1/2"
                onClick={prevImage}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-1 top-1/2 transform -translate-y-1/2"
                onClick={nextImage}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          ))}
        </div>
        <p className="text-xs text-muted-foreground h-12 overflow-y-clip">
          {build.description || "No description available."}
        </p>
      </CardContent>
      <CardFooter>
        <Button className="relative w-full plausible-event-name=Build+copied" variant="outline" onClick={copyBuildId}>
          {copied ? (
            <>
              <Check /> Copied!
            </>
          ) : (
            <>
              <Copy /> Copy Build ID
            </>
          )}

          <div className="absolute inset-0 right-2 top-1/2 -translate-y-1/2 text-gray-700 flex items-center justify-end text-xs text-muted-foreground">
            (<CopyCheck className='pr-1' /> {build.copies})
          </div>
        </Button>
      </CardFooter>
      <ImageModal
        images={build.image.map((img) => { return pb.files.getURL(build, img, { thumb: "0x600" }) })}
        currentIndex={currentImageIndex}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </Card>
  )
}


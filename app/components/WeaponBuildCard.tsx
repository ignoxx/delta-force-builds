import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Skeleton } from './ui/skeleton'
import { Button } from "~/components/ui/button"
import { Copy, Check, ArrowUp, ThumbsUp, ChevronLeft, ChevronRight } from 'lucide-react'
import { Badge } from "~/components/ui/badge"
import { ImageModal } from "./ImageModal"
import { Build } from "~/lib/build";
import { pb } from '~/lib/pb'

interface WeaponBuildCardProps {
  build: Build
}


export function WeaponBuildCard({ build }: WeaponBuildCardProps) {
  const [copied, setCopied] = useState(false)
  const [likes, setLikes] = useState(build.likes)
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

  const copyBuildId = () => {
    navigator.clipboard.writeText(build.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleVote = async () => {
    const e = document.getElementById(`like-${build.id}`)
    e?.setAttribute("disabled", "")
    setLikes(build.likes += 1);
    await pb.collection("builds").update<Build>(build.id, build)
  }

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-sm">{build.title}</CardTitle>
            <p className="text-sm text-muted-foreground">
              <Badge variant="secondary">{build.weapon}</Badge>
              @{build.author}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              id={`like-${build.id}`}
              size="sm"
              variant="ghost"
              className="px-2"
              onClick={handleVote}
            >
              <ThumbsUp className="h-4 w-4 mr-1" />
              {likes}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="relative">
          <img
            src={pb.files.getURL(build, build.image[currentImageIndex])}
            alt={`${build.title} - img ${currentImageIndex + 1}`}
            className="w-full h-48 object-cover mb-2 rounded-md cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          />
          {build.image.length > 1 && (
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
          )}
        </div>
        <p className="text-xs text-muted-foreground h-12 overflow-y-clip">
          {build.description || "No description available."}
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant="outline" onClick={copyBuildId}>
          {copied ? (
            <>
              <Check /> Copied
            </>
          ) : (
            <>
              <Copy /> Copy Build ID
            </>
          )}
        </Button>
      </CardFooter>
      <ImageModal
        images={build.image.map((img) => { return pb.files.getURL(build, img) })}
        currentIndex={currentImageIndex}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </Card>
  )
}


import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Skeleton } from './ui/skeleton'
import { Button } from "~/components/ui/button"
import { Copy, Check, ThumbsUp, ChevronLeft, ChevronRight, ThumbsDown, AlertTriangle } from 'lucide-react'
import { Badge } from "~/components/ui/badge"
import { ImageModal } from "./ImageModal"
import { Build } from "~/lib/build";
import { pb } from '~/lib/pb'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'

interface WeaponBuildCardProps {
  build: Build
}

enum CopyState {
  NONE,
  COPIED,
  POST
}

export function WeaponBuildCard({ build }: WeaponBuildCardProps) {
  const [copyState, setCopyState] = useState(CopyState.NONE)
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
    if (copyState !== CopyState.NONE) return;

    try {
      await navigator.clipboard.writeText(build.code);
      setCopyState(CopyState.COPIED);
      build.copies++;
      await pb.send(`/api/copied/${build.id}`, { method: "post" });

      // After 2.5 seconds, transition to POST state
      setTimeout(() => {
        setCopyState(CopyState.POST);
      }, 2500);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const renderButton = () => {
    switch (copyState) {
      case CopyState.NONE:
        return (
          <Button
            className="w-full"
            variant="outline"
            onClick={copyBuildId}
          >
            <Copy className='h-4 w-4' />
            <span className="text-xs">Copy build code</span>
          </Button>
        );

      case CopyState.COPIED:
        return (
          <Button
            className="w-full"
            variant="outline"
            disabled
          >
            <Check className="w-4 h-4" />
            <span className="text-xs">Copied!</span>
          </Button>
        );

      case CopyState.POST:
        return (
          <div className="w-full flex justify-evenly items-center gap-2">
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className="flex items-center w-full px-1"
                    variant="outline"
                    onClick={() => {/* Handle thumbs up */ }}
                  >
                    <ThumbsUp className="h-4 w-4" />
                    <span className="text-xs text-gray-600">{build.likes || 0}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Like</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className="flex items-center w-full  px-1"
                    variant="outline"
                    onClick={() => {/* Handle thumbs down */ }}
                  >
                    <ThumbsDown className="h-4 w-4" />
                    <span className="text-xs text-gray-600">{build.dislikes || 0}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Dislike</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => {/* Handle report */ }}
                    className="text-yellow-200 hover:text-yellow-300 w-full"
                  >
                    <AlertTriangle className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Report broken code</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className="flex items-center w-full px-1"
                    variant="outline"
                    onClick={copyBuildId}
                  >
                    <Copy className="h-4 w-4" />
                    <span className="text-xs text-gray-600">{build.copies}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Copy build code</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        );
    }
  };

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
        <p className="text-xs text-muted-foreground h-12 max-h-[100vh] overflow-auto">
          {build.description || "No description available."}
        </p>
      </CardContent>
      <CardFooter className="flex justify-center">
        {renderButton()}
      </CardFooter>
      <ImageModal
        images={build.image.map((img) => { return pb.files.getURL(build, img, { thumb: "0x600" }) })}
        index={currentImageIndex}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Card>
  )
}


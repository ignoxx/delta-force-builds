import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Skeleton } from './ui/skeleton'
import { Button } from "~/components/ui/button"
import { Copy, Check, ArrowUp } from 'lucide-react'
import { Badge } from "~/components/ui/badge"
import { ScrollArea } from "~/components/ui/scroll-area"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel"
import { Build } from "~/lib/build";
import { pb } from '~/lib/pb'

interface WeaponBuildCardProps {
  build: Build
}


export function WeaponBuildCard({ build }: WeaponBuildCardProps) {
  const [copied, setCopied] = useState(false)
  const [likes] = useState(build.likes)
  const [imageLoading, setImageLoading] = useState<boolean[]>(() =>
    build.image.map(() => true)
  );

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

  const handleVote = () => { }

  const pics = function(fullHeight: boolean): React.ReactNode {
    return (
      <Carousel>
        <CarouselContent>
          {build.image.map((imageSrc, index) => (
            <CarouselItem key={index}>
              {imageLoading[index] ? (
                <Skeleton className="w-full aspect-[16/9] rounded-md mb-2" />
              ) : null}
              <img
                src={`${pb.files.getURL(build, imageSrc, { thumb: "0x400" })}`}
                alt={`${build.title} i-${index}`}
                className={`w-full aspect-[16/9] object-contain rounded-md ${imageLoading[index] ? "hidden" : ""}`}
                onLoad={() => handleImageLoad(index)}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    )
  }
  return (
    <Card className="w-full">

      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{build.title}</CardTitle>
            <p className="text-sm text-muted-foreground"><Badge variant="secondary">{build.weapon.toUpperCase()}</Badge> by @{build.author} </p>
          </div>
          <Button
            size="sm"
            variant="ghost"
            className="px-0"
            onClick={() => handleVote()}
          >
            <ArrowUp className="h-4 w-4 mr-1" />
            {likes}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pb-2">
        <Drawer fixed={true}>
          <DrawerTrigger>
            {pics(false)} {/* Display smaller card images */}
          </DrawerTrigger>

          <DrawerContent className="h-full md:max-h-[90vh]">
            <DrawerHeader>
              <DrawerTitle>
                <div className="text-xs">
                  <Badge variant="secondary">{build.expand?.type.name.toUpperCase()}</Badge> {build.weapon.toUpperCase()}
                  <p className="text-xs text-gray-500"> by @{build.author}</p>
                </div>
              </DrawerTitle>
              <DrawerDescription className="text-sm">
                {build.description}
              </DrawerDescription>
            </DrawerHeader>

            {/* Fullscreen carousel */}
            <div className="flex justify-center items-center h-[80vh] md:h-[70vh]">
              <Carousel>
                <CarouselContent>
                  {build.image.map((imageSrc, index) => (
                    <CarouselItem key={index} className="h-full flex justify-center items-center">
                      {imageLoading[index] ? (
                        <Skeleton className="w-full h-full rounded-md" />
                      ) : (
                        <img
                          src={`${pb.files.getURL(build, imageSrc)}`}
                          alt={`${build.title} i-${index}`}
                          className="max-h-[70vh] w-auto object-contain rounded-md"
                          onLoad={() => handleImageLoad(index)}
                        />
                      )}
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
            <DrawerFooter className="mt-4">
              <div className="flex justify-center w-full">
                <Button variant="outline" onClick={copyBuildId}>
                  {copied ? (
                    <>
                      <Check className="mr-1" /> {build.code}
                    </>
                  ) : (
                    <>
                      <Copy className="mr-1" /> {build.code}
                    </>
                  )}
                </Button>
              </div>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <ScrollArea className="h-[50px] w-full rounded-md m-2 text-xs text-gray-300">
          {build.description}
        </ScrollArea>
      </CardContent>

      <CardFooter className="flex flex-col items-start">
        <Button className="w-full" variant="outline" onClick={copyBuildId}>
          {copied ? (
            <>
              <Check /> Copied!
            </>
          ) : (
            <>
              <Copy /> Copy Build ID
            </>
          )}
        </Button>
      </CardFooter>
    </Card >
  )
}


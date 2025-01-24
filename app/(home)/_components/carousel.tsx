'use client'

import { useEffect, useState } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useInterval } from "@/hooks/use-interval"

const words = ['САМЫЙ', 'ДЕШЕВЫЙ', 'ИЗ', 'БЫСТРЫХ', 'САМЫЙ', "БЫСТРЫЙ", "ИЗ", "ДЕШЕВЫХ"]

export function CarouselSize() {
  const [api, setApi] = useState<any>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  useInterval(() => {
    if (api) {
      api.scrollNext()
    }
  }, 700)

  return (
    <div className="relative w-full max-w-6xl mx-auto overflow-hidden mt-4 lg:mt-8 rounded-2xl lg:rounded-3xl mb-6 lg:mb-10">
      <Carousel
        setApi={setApi}
        opts={{
          align: "center",
          loop: true,
        }}
        className="w-full bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl lg:rounded-3xl py-4 lg:py-8"
      >
        <CarouselContent className="-ml-2">
          {words.map((word, index) => (
            <CarouselItem key={index} className="pl-2 basis-full sm:basis-1/2 md:basis-1/3 transition-opacity duration-500">
              <div className={`
                p-4 lg:p-8 flex items-center justify-center
                ${current === index ? 'opacity-100 scale-100' : 'opacity-40 scale-90'}
                transition-all duration-500
              `}>
                <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 text-transparent bg-clip-text">
                  {word}
                </span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-gray-900/80 via-transparent to-gray-900/80" />
    </div>
  )
}
